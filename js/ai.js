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

/* ============ the doctrine prior: what the commander knows before it has
   learned anything ========================================================
   counterMix() below turns the observed picture into purchase weights, and
   every coefficient in it was chosen by hand. They are defensible numbers and
   they are the same numbers for every army in every decade, which is the one
   thing they cannot be. `add(inf, "at", 0.34 * armour ...)` says the infantry
   missile is worth a third of the anti-armour response - to the KPA, whose
   Chonma-ho makes 365 mm against a 738 mm era plate (ratio 0.49, NO
   PENETRATION, twelve per cent of 165 damage on a five-second reload), and
   equally to the British, who at e20 own no tank destroyer at all and answer
   armour with the tank and the NLAW.

   All of that is COMPUTABLE, off tables the player can read in the sidebar:
   CFG.DMG, CFG.PEN_PER_DMG, PEN_NONE/PEN_FULL, the weapon table and the unit
   costs. This is DOCTRINE, not intelligence - the same distinction gunProfile()
   above already makes. "HEAT defeats heavy armour" is a training manual every
   officer has; "twelve tanks are behind that ridge" is a sighting and stays in
   seenU. Nothing here reads a map, a unit, a sighting or another player: it is
   a function of (faction, era) and it is cached on that key.

   WHAT IS PRICED, per weapon, per target class:
     dmg x burst x acc / cycle   the sustained rate it actually puts out. Same
                                 derivation gunProfile() uses above, so the two
                                 readings in this file agree about the same gun.
     CFG.dmgMult(warhead, class) the warhead matrix, unmodified.
     the penetration model       pen against an era-typical plate, through the
                                 identical PEN_NONE 0.72 / PEN_FULL 1.00 linear
                                 ramp resolveArmor uses. VEHICLES ONLY:
                                 resolveArmor returns null for infantry,
                                 structures and aircraft, so those get the flat
                                 matrix, exactly as in the engine.
     w.tgt                       a flak mount is not in a tank's war and a
                                 cannon is not in an aeroplane's. Decisive, and
                                 invisible unless you read it.
     accMul / rangeMul / ammoQ / costMul   OUR OWN army's published modifiers.
                                 Value per CREDIT is the question, and NATO's
                                 costMul 1.06 is a real tax on every purchase.
   ...and what is deliberately NOT:
     aspect and ricochet   CFG.ASPECT_MUL front is 1.00 by construction, so
                           pricing the frontal arc prices the trade a PURCHASE
                           guarantees. A flank multiplier prices a manoeuvre,
                           and a queue cannot buy a manoeuvre.
     area of effect        an M270 pod is aoe 2.0 with burst 12, and what that is
                           worth depends on how the enemy is spaced - which is a
                           sighting. So the artillery terms below keep their
                           hand-argued reach basis and the prior never touches
                           them.
     suppression           the machine-gun term is argued from SUPPRESS_BREAK 86
                           against fourteen rounds at 30 suppression each, not
                           from damage. Damage is not what shifts a squad in
                           cover, so a damage table cannot price the mg and must
                           not pretend to. (It shows: the infantry modulators
                           come out 0.88-1.24 for all eight armies - the table
                           correctly finds nothing to say there.)
     survivability         which is why this MODULATES and never replaces. The
                           400-credit Javelin team is the best anti-armour value
                           per credit in EVERY army in EVERY era, and an army of
                           nothing but Javelin teams loses to a rifle company.
                           The clamp below and the guard() floor at the foot of
                           counterMix are what stop that, and both still run.

   THE OUTPUT is one number per role per target class: this army's SHARE of its
   own buyable answer to that class, over the share a typical army of the PERIOD
   puts there. A raw per-credit figure is not comparable across categories -
   normalised against a flat 1/N it saturates the clamp at 1.80 for `at` and
   0.55 for `mortar` for all eight armies, which differentiates nothing. Against
   the period mean, "every army's AT team is cheap" cancels out and what
   survives is exactly "THIS army's missile is unusually good, its gun unusually
   bad". An unremarkable army scores 1.00 everywhere and counterMix behaves as
   it always has. Measured off the tables as they stand:

     e20 KPA   mbt 0.57  heavy 0.55  ifv 1.80 - sixty-seven per cent of
         everything it owns against a tank rides on shaped charges where a
         typical army puts twenty-two, and its best anti-armour vehicle per
         credit is the VTT-323, whose Bulsae-3 is pen 850 where the infantry
         launcher is 700. counterMix cuts the IFV 35% against armour.
     e20 NATO  ifv 1.35  lighttank 1.69 - the Bradley scores 30.1 per 1,000
         credits against heavy where the Abrams scores 22.7, and brings a rifle
         section. At e60 the same army's ifv is 0.55 (M113 ACAV, 20 mm, 0.14).
         One constant cannot be right in both decades.
     e60 PACT  ifv 1.80 (raw 4.18) - the BMP-1's 73 mm and Malyutka against a
         161 mm period plate. Same 35% cut, equally wrong.
     e20 FRA   at 1.53  mbt 1.55, tankdestroyer NONE - France answers armour
         with the tank and the missile and owns no dedicated carrier.
     e20 ROC   mbt 0.55 - a 440 mm gun against a 738 mm plate is ratio 0.60.
     e20 GBR   aa 0.00  spaag 0.00 - NOT a share, a hard zero. Starstreak
         declares warhead "cannon" (three tungsten darts, which is right) and
         CFG.DMG.cannon.air is 0.00, so both British SHORAD mounts do literally
         nothing to an aircraft. That belongs in eras.js, not here; until it is
         fixed the commander should not spend on them.

   COST, measured: 0.44 ms to build one faction+era including the eight-army
   norm, once, on the first think() that needs it; 73 ns a lookup after that.
   doctPlate walks only the five armour role lists - 37 in-era hulls at e20,
   not 1,202 units - and doctValue touches at most eleven units.            */
const DOCT_CLASS = ["infantry", "light", "heavy", "air", "structure"];
/* the roles counterMix actually trades in, grouped by the question they answer.
   A role the prior has no opinion about - spg, mlrs, sniper, radarv - is
   deliberately absent: see the area-of-effect and reach notes above. */
const DOCT_SET = {
  heavy:    ["at", "tankdestroyer", "mbt", "heavy", "ifv", "lighttank"],
  infantry: ["mg", "mortar", "rifle"],
  air:      ["aa", "spaag"],
  light:    ["lighttank", "at"],
};
const DOCT_FAC = Object.keys(FACTIONS);

/* What a tank and a carrier of THIS GENERATION are protected by. Era-typical
   and deliberately not the plate we have looked at: heatEdge() already carries
   the observed-plate question, and keeping a sighting out of here is what lets
   the cache key be (faction, era) and lets this table be shared between
   commanders at module level. Measured: 161 mm at e60, 738 mm at e20 - which is
   the see-saw generations.js describes, and the reason an answer that is right
   in 1965 is wrong in 2020. */
const DOCT_PLATE = {};
function doctPlate(era) {
  if (DOCT_PLATE[era]) return DOCT_PLATE[era];
  const med = (a, dflt) => {
    if (!a.length) return dflt;
    a.sort((x, y) => x - y);
    return a[a.length >> 1];
  };
  /* the same derivation armorAt() uses when a hull declares no armorMM */
  const plate = (u) => {
    if (u.armorMM && u.armorMM.front) return u.armorMM.front;
    const base = CFG.ARMOR_MM[u.armor] || CFG.ARMOR_MM.light;
    const ref  = CFG.ARMOR_HP_REF[u.armor] || 500;
    return base.front * Math.sqrt(U.clamp((u.hp || ref) / ref, 0.3, 3.2));
  };
  const hv = [], lt = [];
  for (const role of ["mbt", "heavy", "ifv", "lighttank", "recon"])
    for (const k of (ROLES[role] || [])) {
      const u = UNITS[k];
      if (!u || !inEra(u, era)) continue;
      if (u.armor === "heavy") hv.push(plate(u));
      else if (u.armor === "light") lt.push(plate(u));
    }
  return (DOCT_PLATE[era] = { heavy: med(hv, 540), light: med(lt, 62) });
}

/* expected value per 1,000 credits, by role, by target class */
function doctValue(fac, era) {
  const f = FACTIONS[fac] || {}, aq = f.ammoQ || 1, ref = doctPlate(era);
  const out = {};
  for (const set in DOCT_SET) for (const role of DOCT_SET[set]) {
    if (out[role]) continue;                 // lighttank and at are in two sets
    const id = unitFor(fac, role, era), u = id && UNITS[id];
    if (!u) continue;                        // this army has no such unit: none
    const cost = Math.round((u.cost || 0) * (f.costMul || 1));
    if (cost <= 0) continue;
    const v = { infantry: 0, light: 0, heavy: 0, air: 0, structure: 0 };
    for (const wk of (u.weapons || [])) {
      const w = WEAPONS[wk];
      if (!w || !w.tgt) continue;
      const cyc = Math.max(0.5, (w.reload || 2) + (w.burst || 1) * (w.burstDelay || 0));
      const acc = U.clamp((w.acc === undefined ? 0.7 : w.acc) * (f.accMul || 1), 0.03, 0.98);
      const dps = (w.dmg || 0) * (w.burst || 1) * acc / cyc;
      /* anchored at 1.00 for a tank gun at eight tiles, the same way
         ASPECT_MUL anchors the frontal arc: a tiebreaker, not the argument */
      const rch = 0.75 + 0.25 * U.clamp((w.range || 0) * (f.rangeMul || 1) / 8, 0, 3);
      const decl = w.pen !== undefined;
      let pen = decl ? w.pen : (w.dmg || 0) * (CFG.PEN_PER_DMG[w.warhead] || 0.5);
      /* penOf() applies the ammunition-quality bonus only to a DERIVED figure,
         because a declared pen is already that army's real number */
      if (!decl && (w.warhead === "cannon" || w.warhead === "heat")) pen *= 1 + (aq - 1) * 0.6;
      const ke = w.warhead === "cannon" || w.warhead === "heat";
      for (const c of DOCT_CLASS) {
        if (c === "air" ? !w.tgt.air : !w.tgt.ground) continue;
        let x = dps * CFG.dmgMult(w.warhead, c) * rch;
        if (c === "heavy" || c === "light") {
          if (ke) x *= c === "heavy" ? aq : 1 + (aq - 1) * 0.5;
          /* resolveArmor returns null for anything that is not a vehicle, so
             infantry, structures and aircraft never reach this branch - which
             is why they are priced off the flat matrix, exactly as in combat */
          if (CFG.PEN_WARHEADS[w.warhead]) {
            const r = pen / ref[c];
            x *= r < CFG.PEN_NONE ? CFG.PEN_FAIL_MUL
               : r < CFG.PEN_FULL ? CFG.PEN_FAIL_MUL + (1 - CFG.PEN_FAIL_MUL) *
                                    (r - CFG.PEN_NONE) / (CFG.PEN_FULL - CFG.PEN_NONE)
               : 1;
          }
        }
        v[c] += x;
      }
    }
    for (const c of DOCT_CLASS) v[c] = v[c] / cost * 1000;
    out[role] = v;
  }
  return out;
}

/* What share a TYPICAL army of this period puts on each role. A mean over the
   eight published rosters, and nothing else - it says nothing about which
   armies are in this match or where anything is, and the same number comes out
   whether the commander faces one opponent or five. Comparing your own army
   against the period's armies is what a staff college teaches; it is the same
   class of static-table reading as GUNS and AAG above. */
const DOCT_NORM = {};
function doctNorm(era) {
  if (DOCT_NORM[era]) return DOCT_NORM[era];
  const acc = {}, n = {};
  for (const fac of DOCT_FAC) {
    const v = doctValue(fac, era);
    for (const c in DOCT_SET) {
      let tot = 0;
      for (const role of DOCT_SET[c]) if (v[role]) tot += v[role][c];
      if (tot <= 0) continue;
      acc[c] = acc[c] || {}; n[c] = n[c] || {};
      for (const role of DOCT_SET[c]) if (v[role]) {
        acc[c][role] = (acc[c][role] || 0) + v[role][c] / tot;
        n[c][role]   = (n[c][role] || 0) + 1;
      }
    }
  }
  for (const c in acc) for (const role in acc[c]) acc[c][role] /= n[c][role];
  return (DOCT_NORM[era] = acc);
}

/* the manual, cached on faction+era. 1.00 means unremarkable and counterMix is
   untouched. The clamp is the variety guard: a modulator between 0.55 and 1.80
   can shift emphasis but can never invent a role or delete one. The ONE value
   outside it is a hard 0 - not a preference but the tgt-mask-and-matrix answer
   "this weapon is not in that war at all", the same fact gunProfile() acts on
   when it throws a SAM site's weapon away. */
const DOCT = {};
function doctrine(fac, era) {
  const key = fac + "|" + era;
  if (DOCT[key]) return DOCT[key];
  const v = doctValue(fac, era), norm = doctNorm(era), out = {};
  for (const c in DOCT_SET) {
    out[c] = {};
    let tot = 0;
    for (const role of DOCT_SET[c]) if (v[role]) tot += v[role][c];
    for (const role of DOCT_SET[c]) {
      /* no unit for the role at all: stay neutral and let buildToward's
         twenty-second cool-down redistribute, which is what it is for */
      if (!v[role])        { out[c][role] = 1; continue; }
      if (v[role][c] <= 0) { out[c][role] = 0; continue; }
      const share = tot > 0 ? v[role][c] / tot : 0;
      const t = (norm[c] && norm[c][role]) || share || 1;
      out[c][role] = U.clamp(share / t, 0.55, 1.80);
    }
  }
  return (DOCT[key] = out);
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
  let seaCache = null, seaT = -1e9;     // ...and what of it is afloat
  let survey = null, surveyT = -1e9;    // the plot, priced
  const aimShy = new Map();      // objective id -> the time it may be tried again
  let aimRvT = -1;               // warAim's review is memoised on the game tick
  let waveBook = null;           // hit points the current wave was committed with
  /* ---- engagement discipline ----
     Closure state for the reason everything above is: two commanders sharing
     one of these would be sharing one decision. waveGate is what the current
     body was sent to turn in on and when it left, so the next launch can tell
     a fight to reinforce from one to re-plan. waveGateT and waveMassed are the
     staging hold. homeward is a broken wave walking to the pad - it is no
     longer in attackWave, so something else has to steer it. */
  let waveGate = null;           // { tx, ty, t }: the objective this body turns in on
  let waveGateT = 0;             // when the first of it reached its mark
  let waveMassed = false;        // ...and whether the body has been turned in
  let waveTurn0 = 0, waveTurn1 = 0;   // first and last turn-in of this body, for the census
  let flankClock = 0;            // driveFlankers' own 4 Hz clock
  let waveDefer = 0;             // launches deferred in a row on the force ratio
  let homeward = [];             // survivors of a broken wave still being walked home
  let homeUntil = 0;             // ...and until when
  let engStat = engBook();       // what all of the above has done, for intel()
  const GATE_HOLD = 22;          // seconds a staged body waits on its stragglers
  const GATE_R = 3.5;            // tiles from its own mark that count as "there"
  /* ---- when to go, what to go for, and when to come home ----
     Closure state for the reason everything above is: two commanders sharing
     one of these would be sharing one estimate of the enemy. launchGate(),
     foeField(), commitNow(), staggerWave() and defendBase() explain each. */
  let foeMemo = null, foeMemoT = -1;    // foeField(), memoised on the game tick
  let foePeak = 0, foePeakT = 0;        // the most enemy fighting weight shown us at once, fading
  const prodPeakOf = {};                // rival idx -> most of its production on the plot at once
  let fortMemo = 0, fortT = -1;         // fire on the war aim as fighting weight, per tick
  let lastLaunchT = 0;                  // when a body was last actually planned
  let launchWhy = "";                   // which launchGate() rule let the pending launch go
  let wasCommit = false;                // commitNow() on the previous think, for the census
  let defT = 0;                         // defendBase()'s own clock
  let baseW = 0, baseT = -1e9, baseX = 0, baseY = 0;   // enemy weight last seen at our works
  let baseHomeW = 0;                    // ...and what we had standing there to meet it
  let baseCoreW = 0;                    // ...of which within 16 tiles of production or at home
  let recallNext = 0;                   // the earliest the wave may be pulled home again
  let prodOneT = 0;                     // since when the rival has shown exactly one production building
  let waveEtaEnd = 0;                   // when the staggered body should all be at its gate
  let warLog = warBook();               // what all of this has done, for intel()
  let oreSites = null;           // where the ore is, surveyed once
  /* ---- ground the scouts could not get to ----
     Coarse cell -> the time it may be aimed at again. The same shape as
     aimShy above and kept for the same reason: a goal that has already failed
     must stop winning the next auction, or the commander re-issues it for the
     rest of the battle. */
  const scoutShy = new Map();
  /* ---- the reconnaissance plan's memory (see RECONNAISSANCE) ----
     Closure state for the reason the picture is: two commanders sharing a
     flood fill would be harmless, sharing a picket route or a job table would
     be sharing one staff. */
  let reconGrid = null;          // the search grid's representative tiles
  let rivalPath = null;          // the last ground route pickRival() planned, tiles
  let scoutLog = scoutLogNew();  // counters for intel(); nothing decides on them
  let firstFound = -1, firstProd = -1;  // when the rival, and its production, went on the plot
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
    /* Two bytes a tile for the whole theatre: 144x144 is 41 kB per
       commander, which is nothing, and it is what lets the commander tell
       ground it has cleared from ground it has simply never visited. It was
       one byte, and the stamp (game time / 4) saturated at t=1020: from
       there every staleness() read now-1020, forgetStale() never struck a
       structure off, and every freshness test in the file went dead in a
       match past seventeen minutes (the elite census runs 1,500 s).
       G.explored() and every other reader test only `!== 0` or subtract
       b * 4, so nothing else changes. */
    look = new Uint16Array(G.map.W * G.map.H);
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
    armsCache = null; armsT = -1e9; seaCache = null; seaT = -1e9;
    survey = null; surveyT = -1e9;
    aimShy.clear(); scoutShy.clear(); aimRvT = -1; waveBook = null; oreSites = null;
    waveGate = null; waveGateT = 0; waveMassed = false; waveTurn0 = waveTurn1 = 0;
    flankClock = 0; waveDefer = 0; homeward = []; homeUntil = 0; engStat = engBook();
    /* nor an estimate of the enemy, a production count or a recall clock */
    foeMemo = null; foeMemoT = -1; foePeak = 0; foePeakT = 0; fortMemo = 0; fortT = -1;
    for (const k in prodPeakOf) delete prodPeakOf[k];
    lastLaunchT = 0; launchWhy = ""; wasCommit = false; defT = 0;
    baseW = 0; baseT = -1e9; baseHomeW = 0; baseCoreW = 0; recallNext = 0; prodOneT = 0; waveEtaEnd = 0;
    warLog = warBook();
    /* A restarted match must not price its first tanker off the previous
       battle's sortie rate, buy its first workshop against the previous
       battle's casualty rate, or site a belt against a minefield that was on
       another map. */
    fuelBreak = 0; logiT = 0; logiOrbit = null;
    ledger = null; ledgerT = -1e9; arvHave = 0; arvLostT = -1e9;
    mineSigns = []; raidHeat = 0; raidT = 0; mineNext = 0;
    foeVeh = 0; foeVehT = 0;
    knownM = null; knownMT = -1e9;
    /* The force budget, the landing and the combined operation belong to one
       battle as well: no theatre reading, no fuel claim, no hold on a hull
       and no fleet marker carried across a restart. */
    theatreNow = { land: true, coast: false, sea: false, key: "", t: -1e9 };
    armShare = { gnd: 0.6, air: 0.3, sea: 0.1 };
    oilClaim = null; fbCache = null; fbT = -1; armFieldKey = ""; fieldArms = null;
    splitSince = -1;
    booked = []; bookDecT = -1;
    for (const k of ARM_KEYS) {
      demandT[k] = -1e9; wantOil[k] = 0; claimBar[k] = 0; armPaid[k] = 0; armBled[k] = 0;
    }
    for (const k in holdFrom) delete holdFrom[k];
    for (const k in holdBar) delete holdBar[k];
    forceStat = forceStatNew();
    navAim = null; opReady = false; opSt = null; opStId = null; opStT = -1e9; opHit.clear();
    /* The second front belongs to one battle as well: no detachment, no
       written-off ground and no counters carried across a restart - and no
       raid in the opening minute, when there is no surplus and nothing has
       been seen. */
    raidParty = []; raidTo = null; raidBook = 0; raidEnd = 0; raidNext = 60; raidTick = 0;
    raidShy.clear(); raidDead = []; raidLog = raidLogNew();
    /* the reconnaissance plan and the oil picture belong to one battle and
       one map */
    reconReset(); oilReset();
    for (const k in roleCool) delete roleCool[k];
    intelT = 0; lastDigest = 0; aim = null;
    /* the plan's income average, budget and survey belong to one battle */
    macro = macroBook();
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
    /* The start sites are on the published map from the first frame, so the
       car that comes with the deployment sets out once the first picture has
       been taken rather than twenty seconds into the battle. */
    scoutT = 3 + P.idx * 0.3;
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
      if (!at) { groundConnected = true; rivalPath = null; }
      else {
        const a = { x: (P.homeX / CFG.TILE) | 0, y: (P.homeY / CFG.TILE) | 0 };
        const b = { x: (at.x / CFG.TILE) | 0, y: (at.y / CFG.TILE) | 0 };
        const path = Path.find(G.map, a.x, a.y, b.x, b.y, "ground", null);
        rivalPath = path && path.length ? path : null;    // the picket's route
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
    /* ---- the second front ----
       On its own clock and not inside think(): think() returns early on
       every tick that queues a purchase, and the break-off in driveRaid() is
       the one rule a raid may never skip. Half a think interval and never
       under half a second, so a Veteran's party is not handled faster than a
       Veteran thinks by more than that. Driven before it is formed, so a
       party that broke off on this tick cannot be replaced on the same one. */
    raidTick -= dt;
    if (raidTick <= 0) {
      raidTick = Math.max(0.5, (D.think || 1.6) * 0.5);
      driveRaid();
      formRaid();
    }
    /* ---- the eyes ----
       Off think() for the reason the raid is: think() returns early on every
       tick that queues a purchase, and a scout under fire or running dry must
       not wait for a quiet factory. Every two seconds; scoutT is the clock. */
    if (scoutT <= 0) { scoutT = 2; driveScouts(); }
    /* ---- the production we cannot lose ----
       (victory rule) a side with no live production building is beaten.
       defendBase() used to run on the last line of think(), after fifteen
       early `return`s on purchase ticks, so on any tick that bought an
       aircraft, a SAM or a truck nobody looked at the base at all. It has
       its own clock now, one think interval, like the raid driver, and
       reads a fresh groundArmy() rather than a list made before the launch. */
    defT -= dt;
    if (defT <= 0) {
      defT = D.think || 1.6;
      defendBase(groundArmy());
    }
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

  /* Rigs we already own, wherever they are: driving in the field, sitting on
     the factory ramp, or still being cut. A yard that is half-built is a yard
     coming, and counting only the ones on the map buys a second rig for a job
     the first one is already on its way to do. */
  let yardSpot = null, yardSpotT = -99, yardBlocked = -99, rigHoard = false;
  /* ---- PEACE ----
     A commander that builds, watches and defends but sends nothing out: no
     ground wave, no landing, no bombardment group, no raid, no sortie, no
     launcher or silo shot. For a scripted sandbox - the mechanics suites run
     every section inside one match, and once this commander learned to build
     and attack properly it overran the idle scripted base by t~450 and ended
     the match under the production victory rule. Set by AI.setPeace(). */
  let atPeace = false;
  const badYard = new Map();     // rim tiles a rig could not reach -> time written off
  function rigsHeld() {
    let n = 0;
    for (const u of P.units) if (!u.dead && u.def.deployTo) n++;
    return n + queuedRole("vehicle", d => !!d.deployTo);
  }
  /* What a rig actually costs this faction. Three separate numbers used to be
     written down here by hand - a hoard target of cost+200, a "do I want one"
     threshold of 3600, and a purchase gate of 3600 - and they disagreed:
     measured, a commander hoarded to 3,380 and then needed 3,600 before it
     would admit to wanting the thing it had just finished saving for, so it
     sat on the money. They are all derived from the price now, and the hoard
     is deliberately the largest of them. */
  function rigCost() { return P.factionCost(UNITS.mcv || { cost: 3000 }); }
  /* how many barrels a rig costs, plus a little so the purchase is not refused
     by a rounding error the tick it becomes affordable */
  function rigOilNeed() { return ((UNITS.mcv && UNITS.mcv.oil) || 30) + 2; }
  /* Saving for a rig: only when one is actually wanted, the cash for it is
     already there, and the barrels are not. Every clause is a condition that
     lifts on its own, so the reserve cannot latch: it ends when the barrels
     arrive, when the cash goes, when a rig is already in hand or on the ramp,
     or when the commander stops wanting one. */
  /* Can a rig be ordered at all, short of money and fuel? The reserve and the
     hoard both used to hold back barrels and credits for a vehicle this
     commander was not yet allowed to build - most pointedly before Tech II,
     which the rig needs, so the reserve delayed the very upgrade that
     unlocks it. */
  function rigOrderable() {
    const id = unitFor(P.faction, "mcv", P.era);
    if (!id) return false;
    const why = P.lockReason(UNITS[id]);
    return !why || /^INSUFFICIENT/.test(why);
  }
  function rigSaving() {
    /* A rig on the ramp has not paid for its barrels yet - player.js charges
       fuel when a unit COMPLETES and refunds the whole purchase if the tank is
       dry by then. Lifting the floor at enqueue let the forty-second build eat
       the thirty barrels, the rig was refunded, and bought again. */
    if (queuedRole("vehicle", d => !!d.deployTo)) return true;
    /* Deliberately NOT `if (P.oil >= rigOilNeed()) return false`. That was the
       whole bug: the reserve lifted the instant the barrels arrived, and the
       barrels then went to whichever buyer asked first - which, with the
       expansion running last in think(), was never the rig. Measured: the
       reserve read `saving=true` at every sample and the commander still burned
       251 barrels in 500 seconds on ships, aircraft and upgrade kits while
       sitting on one construction yard and thirty-four thousand credits.
       What this leaves is a FLOOR rather than a gate - oilSpare() lets anything
       above the reserve be spent freely, so an army is never starved, it simply
       cannot take the last thirty-two barrels out from under the rig. */
    if (P.cash < rigCost() + 200) return false;
    if (rigsHeld()) return false;
    if (!rigOrderable()) return false;
    return wantsExpansion();
  }
  /* May this purchase have its barrels? Everything the commander buys with
     fuel asks here, so the reserve is one rule in one place rather than a
     guard bolted onto whichever spend site happened to be noticed. */
  function oilSpare(n) {
    if (!n) return true;
    if (!rigSaving()) return true;
    const cutting = queuedRole("vehicle", d => !!d.deployTo);
    return P.oil - n >= rigOilNeed() * Math.max(1, cutting);
  }

  /* ================= FORCE BUDGET: army, navy, air force =================
     (owner) "ai should scout and expand quickly and develop quickly with
     different army, navy, airforce mixed wisely."

     NOTHING DECIDED THE SPLIT BEFORE THIS. think() walks its blocks in a fixed
     order - army, AEW, logistics, ASW, EW, SAM, TEL, sensors, air force, navy -
     and each asks tryBuildUnit() for whatever its own ceiling allows. Barrels
     are charged when a unit COMPLETES and lockReason() only asks whether the
     reserve holds the price today, so the split between the three services was
     whatever happened to be cheapest on the tick the fuel arrived.

     MEASURED, taiwan at Warlord, both seats AI: from t=750 P0 held 28,140 to
     37,500 credits - the storage ceiling - and SIX to seventeen barrels. On a
     water theatre cash is not the constraint; fuel is, and it arrives at 0.18
     a second off the purchase line. A fighter is 30 barrels and a corvette 16.
     The air block runs first and is refused for fuel; the navy block then buys
     a corvette the moment the reserve passes 16, so the fighter is never
     reachable: P0 finished with ONE fighter, seven corvettes, five patrol boats
     and no destroyer, having put 143 barrels into ground vehicles for an army
     that could never leave its island - five of them supply trucks.

     THREE PIECES:
       1. THE THEATRE, off what the map allows. groundConnected (pickRival's
          clock) says whether there is a land route to where we believe the
          enemy lives; readTheatre() adds whether that place is on the water
          and whether a hull from our own water can reach it. A land theatre
          is ground-first; a water theatre is navy and air first, with a small
          ground share for home defence and the landing force. An arm this
          nation cannot field in this decade takes no share at all - a force
          may simply lack a system.
       2. THE STANDING FORCE IN BARRELS, per service, fielded plus on order.
          Barrels because that is the resource the mix goes wrong on; infantry
          costs none and is never held back by any of this.
       3. A CLAIM. The service furthest below its share that has asked for
          something in the last twelve seconds reserves the price of what it
          asked for, and the other two may not spend below it - the rig
          reserve's pattern (oilSpare) applied between services. Use it or
          lose it: a service sitting on a met reserve for CLAIM_TTL seconds
          without buying is barred from claiming for 45, so one held back for
          some other reason cannot starve the other two.

     COMMITTED FUEL. A queued unit's barrels are only deducted when it
     completes, and if they have gone by then the purchase is refunded and its
     build time is lost. Two services racing for one reserve did exactly that.
     A purchase must fit into the fuel not already promised to the queues,
     which is what a player does by reading the number before clicking.

     counterMix(), navalMix() and the air block's own ceilings still decide
     WHAT each service buys; this decides only which service gets the next
     barrel. Below D.read 0.35 there is no budget and nothing changes.

     FOG: our own units, queues, reserve and yard; published terrain; and
     intelHome(), which is our plot, the last contact or a published start
     position, in that order.

     COST: forceBook() is one pass over our own units and three short queues,
     memoised on the tick. readTheatre() runs every five seconds and is a
     string compare; its two ring scans and one sea A* run only when the key
     changes - rival, the believed home moving six tiles, a land route opening
     or closing, our yard - which is a handful of times a battle. */
  const CLAIM_TTL = 40;          // seconds a met reserve may sit unspent
  const ARM_KEYS = ["sea", "air", "gnd"];
  let theatreNow = { land: true, coast: false, sea: false, key: "", t: -1e9 };
  let armShare = { gnd: 0.6, air: 0.3, sea: 0.1 };
  let oilClaim = null;           // { arm, oil, full }: the service holding the next barrels
  const demandT = { gnd: -1e9, air: -1e9, sea: -1e9 };   // when each service last asked
  const wantOil = { gnd: 0, air: 0, sea: 0 };            // ...and for how many barrels
  const claimBar = { gnd: 0, air: 0, sea: 0 };           // may not claim again before
  const holdFrom = {};           // role -> { t0, seen }: a fuel hold on that role
  const holdBar = {};            // role -> no fuel hold before this time
  let fbCache = null, fbT = -1;  // forceBook(), memoised on the tick
  let armFieldKey = "", fieldArms = null;   // which services this army owns, per period
  let splitSince = -1;           // since when groundConnected has read false (runAmphib)
  let forceStat = forceStatNew();
  function forceStatNew() {
    return { held: { gnd: 0, air: 0, sea: 0 }, claims: { gnd: 0, air: 0, sea: 0 },
             lapsed: 0, holds: 0, holdOut: 0, seaA: 0, opAir: 0, swing: 0,
             trips: 0, boarded: 0, landed: 0, noBeach: 0, noHard: 0, dry: 0 };
  }

  /* Which service a purchase belongs to. The economy and the supply chain
     belong to none: a hauler, a rig, a truck, a workshop, a tender, an oiler
     and a tanker are bought on their own measured rules and are never held
     back here. A helicopter that hunts submarines is the fleet's, and so is
     anything built to live on a deck. */
  function armOf(def) {
    if (!def || def.harvester || def.deployTo || def.supply ||
        def.repairRate || def.refuelRate) return null;
    if (def.cat === "naval") return "sea";
    if (def.cat === "aircraft") {
      const r = def.role;
      return (r === "aswhelo" || r === "cfighter" || r === "cstealth" || r === "cstrike")
        ? "sea" : "air";
    }
    if (def.cat === "vehicle" || def.cat === "infantry") return "gnd";
    return null;
  }
  /* Does this army own the service at all, in this decade, in this battle?
     unitFor() answers null where a nation never fielded the role, and the
     pre-battle restrictions can take a whole service away. */
  function armFieldable() {
    const key = P.faction + ":" + (P.era || CUR_ERA);
    if (key === armFieldKey && fieldArms) return fieldArms;
    const any = (roles) => roles.some(r => !!unitFor(P.faction, r, P.era));
    const ban = P.banned || {};
    fieldArms = { air: !ban.aircraft && any(["fighter", "gunship", "cas"]),
                  sea: !ban.naval && any(["corvette", "patrol", "destroyer", "missileboat", "sub"]) };
    armFieldKey = key;
    return fieldArms;
  }
  function readTheatre() {
    const now = G.time, th = theatreNow, M = G.map, T2 = CFG.TILE;
    if (now - th.t < 5) return th;
    th.t = now;
    const at = rival ? intelHome(rival) : null;
    const yard = G.nearestBuilding(P, "navalyard", P.homeX, P.homeY);
    const key = (rival ? rival.idx : "-") + "|" +
                (at ? ((at.x / T2 / 6) | 0) + "," + ((at.y / T2 / 6) | 0) : "-") + "|" +
                (groundConnected ? 1 : 0) + "|" + (yard ? yard.id : "-");
    if (key !== th.key) {
      th.key = key;
      th.land = groundConnected;
      th.coast = false; th.sea = false;
      if (at) {
        /* is where they live on the water at all */
        const coast = Path.nearest(M, U.clamp((at.x / T2) | 0, 0, M.W - 1),
                                   U.clamp((at.y / T2) | 0, 0, M.H - 1), "sea", null, 12);
        th.coast = !!coast;
        /* and can a hull from OUR water get there. Without a yard, the water
           a yard could go on: findShoreSpot() looks forty tiles out. */
        const from = yard
          ? Path.nearest(M, (yard.x / T2) | 0, (yard.y / T2) | 0, "sea", null, 6)
          : Path.nearest(M, (P.homeX / T2) | 0, (P.homeY / T2) | 0, "sea", null, 40);
        if (coast && from) {
          forceStat.seaA++;
          const p = Path.find(M, from.x, from.y, coast.x, coast.y, "sea", null);
          const end = p && p.length ? p[p.length - 1] : null;
          th.sea = !!end && Math.abs(end.x - coast.x) + Math.abs(end.y - coast.y) <= 4;
        }
      }
    }
    readShares();
    return th;
  }
  /* The split, in barrels. Land theatre: the army is the main effort and the
     air force its cover, the fleet a token unless it can reach them. Water
     theatre: the fleet and the air force ARE the war, and the army is home
     defence plus whatever the landing craft can carry. The personality knobs
     lean on it by their square root, so Air Doctrine's 3.0 is a 1.7x lean and
     not a pure air force. */
  function readShares() {
    const th = theatreNow, fa = armFieldable();
    let g, a, s;
    if (th.land) { g = 0.58; a = 0.30; s = th.sea ? 0.12 : 0.04; }
    else         { g = 0.12; a = 0.38; s = th.sea ? 0.50 : 0.10; }
    a *= Math.sqrt(D.airBias || 1);
    s *= Math.sqrt(D.navalBias || 1);
    /* Attrition. A service losing most of what it fields is feeding a fight
       it is not winning, and the next barrel is worth more elsewhere - a
       fighter force being shot down is better answered by the fleet's area
       SAM than by the next fighter. Up to a 35% cut, from half the recent
       arrivals lost to nine tenths, and only once sixty barrels have arrived
       so one early loss decides nothing. Read D.read-scaled: a commander that
       analyses nothing does not notice. */
    const damp = (k) => {
      if (armPaid[k] < 60) return 1;
      const r = armBled[k] / armPaid[k];
      return 1 - 0.35 * (D.read || 0) * U.clamp((r - 0.5) / 0.4, 0, 1);
    };
    g *= damp("gnd"); a *= damp("air"); s *= damp("sea");
    if (!fa.air) a = 0;
    if (!fa.sea) s = 0;
    const t = g + a + s;
    armShare = t > 0 ? { gnd: g / t, air: a / t, sea: s / t } : { gnd: 1, air: 0, sea: 0 };
  }
  /* Barrels standing in each service, fielded plus on order.
     A deck's own air wing is left out: embarkComplement() puts it aboard with
     the hull and charges no fuel for it, so counting it would book barrels
     nobody spent - seven free Seahawks on taiwan would have read as 175. It is
     told apart at FIRST SIGHT, while it still sits on the ship it came with;
     an airframe bought at an airbase is on the strip then, and a helicopter
     that later lands on a frigate must not flicker in and out of the book.
     The same pass keeps the ATTRITION ledger: barrels that arrived (first
     sight) and barrels that were lost (booked last pass, gone now), both
     decayed with a five-minute half-life. readShares() reads it. */
  let booked = [];               // our fielded units the book counted last pass
  let bookStamp = 0, bookDecT = -1;
  const armPaid = { gnd: 0, air: 0, sea: 0 };
  const armBled = { gnd: 0, air: 0, sea: 0 };
  function forceBook() {
    if (fbCache && fbT === G.time) return fbCache;
    const now = G.time;
    const dec = bookDecT < 0 ? 1 : Math.pow(0.5, (now - bookDecT) / 300);
    bookDecT = now;
    for (const k of ARM_KEYS) { armPaid[k] *= dec; armBled[k] *= dec; }
    const stamp = ++bookStamp;
    const b = { gnd: 0, air: 0, sea: 0 };
    const next = [];
    for (const u of P.units) {
      if (u.dead || !u.def || !u.def.oil) continue;
      if (u._fbFree === undefined)
        u._fbFree = !!(u.layer === "air" && u.padOn && u.padOn.kind === "unit");
      if (u._fbFree) continue;
      const k = armOf(u.def);
      if (!k) continue;
      b[k] += u.def.oil;
      if (u._fbS === undefined) { armPaid[k] += u.def.oil; u._fbK = k; u._fbO = u.def.oil; }
      u._fbS = stamp;
      next.push(u);
    }
    for (const u of booked) if (u._fbS !== stamp) armBled[u._fbK] += u._fbO;
    booked = next;
    for (const kind of ["vehicle", "aircraft", "naval"]) {
      const qq = q(kind);
      if (!qq) continue;
      for (const it of qq.items) {
        const k = armOf(it.def);
        if (k && it.def.oil) b[k] += it.def.oil;
      }
    }
    fbCache = b; fbT = G.time;
    return b;
  }
  /* barrels already promised to the queues, upgrades included: an upgrade's
     fuel is taken at completion without a refund, so it empties the reserve
     under whatever unit is queued behind it */
  function committedOil() {
    let n = 0;
    for (const kind of ["vehicle", "aircraft", "naval", "upgrade"]) {
      const qq = q(kind);
      if (!qq) continue;
      for (const it of qq.items) n += (it.def && it.def.oil) || 0;
    }
    return n;
  }
  /* A service asked for barrels it could not have. The claim is the CHEAPEST
     thing it asked for this think: that is the purchase which will actually
     land first - the air block asks for the fighter (30) before the gunship
     (26) and takes whichever the reserve reaches - and a service behind its
     share only needs its next purchase protected, not its dearest. Measured
     in the first draft, the AEW block's 70-barrel AWACS named the price and
     the fleet sat behind a reserve no aeroplane ever used. */
  function noteDemand(arm, oil) {
    if (!arm) return;
    const now = G.time;
    if (demandT[arm] !== now || oil < wantOil[arm]) wantOil[arm] = oil;
    demandT[arm] = now;
  }
  /* A purchase refused for fuel is demand only if fuel is ALL that stops it.
     lockReason() tests the reserve before ramp space, and tryBuildUnit() tests
     cash and the hoard after it, so an airframe with no hangar, or anything
     the bank cannot pay for, would otherwise claim barrels it could never
     use. */
  /* A support airframe never names the claim: the AWACS (70-72 bbl), the
     stealth bomber (90), the EW aircraft (44) and the Weasel (34-36) are
     bought on their own rules, and as the cheapest ask of a think they held
     every other service's fuel back until the reserve reached them - up to
     500 s at the bought 0.18 a second. */
  const SUPPORT_ASK = { awacs: 1, stealthbomber: 1, ewair: 1, sead: 1 };
  function demandable(def, role) {
    if (SUPPORT_ASK[role]) return false;
    const cost = P.factionCost(def);
    if (P.cash < cost * 0.6) return false;
    const hoardFor = role === "mcv" && rigHoard ? 0 : saveTarget;
    if (hoardFor > 0 && P.cash < hoardFor + cost) return false;
    if (def.cat === "aircraft" && P.airSpaceLeft(def) <= q("aircraft").items.length) return false;
    return true;
  }
  /* once a think, before anything is bought */
  function oilBudget() {
    const now = G.time;
    if ((D.read || 0) < 0.35) { oilClaim = null; return; }
    const bk = forceBook();
    const tot = bk.gnd + bk.air + bk.sea;
    const inc = oilIncome(), free = P.oil - committedOil();
    let best = null, bg = 0.03;
    for (const k of ARM_KEYS) {
      if (!(armShare[k] > 0) || now - demandT[k] > 12 || claimBar[k] > now) continue;
      /* a price more than 240 s of income away is not a claim (fuelHold()
         draws its line at 300 for a single hull): at the bought 0.18 a
         second a destroyer from an empty tank is 189 s, an AWACS 389 */
      if (wantOil[k] > free && (inc <= 0 || (wantOil[k] - free) / inc > 240)) continue;
      /* the holder keeps it unless another service is clearly further behind */
      const gap = armShare[k] - (tot > 0 ? bk[k] / tot : 0) +
                  (oilClaim && oilClaim.arm === k ? 0.05 : 0);
      if (gap > bg) { bg = gap; best = k; }
    }
    if (!best) { oilClaim = null; return; }
    if (!oilClaim || oilClaim.arm !== best) {
      oilClaim = { arm: best, oil: wantOil[best], full: 0 };
      forceStat.claims[best]++;
    } else oilClaim.oil = wantOil[best];
    if (free >= oilClaim.oil) {
      if (!oilClaim.full) oilClaim.full = now;
      else if (now - oilClaim.full > CLAIM_TTL) {
        claimBar[best] = now + 45; oilClaim = null; forceStat.lapsed++;
      }
    } else oilClaim.full = 0;
  }
  /* may this service spend n barrels now */
  function armOilOk(arm, n) {
    if (!arm || !n || (D.read || 0) < 0.35) return true;
    const free = P.oil - committedOil();
    if (free < n) return false;
    if (!oilClaim || oilClaim.arm === arm) return true;
    return free - n >= oilClaim.oil;
  }
  /* ---- saving for the hull the mixture actually asked for ----
     buildToward() cooled a role for twenty seconds on ANY lockReason, and
     "INSUFFICIENT FUEL" is one. On a fuel-starved theatre that cools the
     destroyer (34 bbl), the submarine (40) and the missile boat (22) in turn
     until the reserve reaches the corvette's 16, which is then bought - and
     the next destroyer is refused the same way. That is the taiwan fleet:
     navalMix() asks for a quarter of it in destroyers from tech 2 and got
     none. So the role at the top of the shortfall is WAITED FOR, and the
     claim above reserves the barrels meanwhile. How long is priced off what
     is actually coming in: at the purchase line's 0.18 a second a destroyer
     from an empty reserve is 190 seconds away, so a flat two-minute wait
     would give up on it every time. The wait is 1.3 times the time to the
     price, 40 seconds at least and 90 + 150*read at most, and a price more
     than five minutes away is not waited for at all. Past the wait it cools
     as before, the cheaper hull gets its turn, and the same role may not be
     waited on again for a minute - a price the reserve cannot reach does not
     freeze a service. */
  /* Barrels coming in: our own wells, the lifeline and the bulk import
     (nativeOil), plus what the fuel market has been delivering lately
     (marketRate, FUEL MARKET). The holds and the claim ask this, so a
     destroyer is still waited for when money is buying its barrels. */
  function oilIncome() { return nativeOil() + marketRate(); }
  function nativeOil() {
    let r = (P.buysFuel() ? (CFG.FUEL_BUY_RATE || 0.18) : 0) +
            (P.bulkFuelRate ? P.bulkFuelRate() : 0);
    const mul = (FACTIONS[P.faction] || {}).supplyMul || 1;
    for (const b of P.buildings)
      if (!b.dead && b.buildProgress >= 1 && b.def.oilNode) r += (b.def.oilRate || 0) * mul;
    return r;
  }
  function fuelHold(role, def) {
    const now = G.time, read = D.read || 0;
    if (read < 0.55 || !def || !def.oil) return false;
    if (holdBar[role] > now) return false;
    if (!demandable(def, role)) return false;
    const h = holdFrom[role];
    if (!h || now - h.seen > 10) {
      const inc = oilIncome();
      const eta = inc > 0 ? Math.max(0, def.oil - (P.oil - committedOil())) / inc : 1e9;
      if (eta > 300) return false;                 // nothing, or too little, is coming
      holdFrom[role] = { t0: now, seen: now, lim: U.clamp(30 + eta * 1.3, 40, 90 + 150 * read) };
      noteDemand(armOf(def), def.oil);
      forceStat.holds++;
      return true;
    }
    noteDemand(armOf(def), def.oil);
    h.seen = now;
    if (now - h.t0 <= h.lim) return true;
    delete holdFrom[role];
    holdBar[role] = now + 60;
    forceStat.holdOut++;
    return false;
  }
  /* The growth clock the ground army has always had, for a service the budget
     says is behind - not only for a commander swimming in fuel. `P.oil > 120`
     is precisely false on the theatre where the fleet and the air force are
     the whole war (measured: 6 to 33 barrels for all of taiwan), so neither
     ceiling grew there once. The claim is what keeps the growth affordable. */
  function armSurge(arm) {
    const bk = forceBook(), tot = bk.gnd + bk.air + bk.sea;
    const behind = (D.read || 0) >= 0.35 && tot > 0 && bk[arm] / tot < armShare[arm];
    return (P.oil > 120 || behind) ? Math.floor(G.time / 240) : 0;
  }
  function forceIntel() {
    const bk = forceBook(), tot = bk.gnd + bk.air + bk.sea;
    const r2 = (v) => Math.round(v * 100) / 100;
    const fs = forceStat;
    return { land: theatreNow.land, coast: theatreNow.coast, sea: theatreNow.sea,
             share: { gnd: r2(armShare.gnd), air: r2(armShare.air), sea: r2(armShare.sea) },
             have: { gnd: tot ? r2(bk.gnd / tot) : 0, air: tot ? r2(bk.air / tot) : 0,
                     sea: tot ? r2(bk.sea / tot) : 0 },
             bbl: { gnd: bk.gnd, air: bk.air, sea: bk.sea },
             bled: { gnd: armPaid.gnd ? r2(armBled.gnd / armPaid.gnd) : 0,
                     air: armPaid.air ? r2(armBled.air / armPaid.air) : 0,
                     sea: armPaid.sea ? r2(armBled.sea / armPaid.sea) : 0 },
             claim: oilClaim ? { arm: oilClaim.arm, oil: oilClaim.oil } : null,
             free: Math.round(P.oil - committedOil()),
             held: Object.assign({}, fs.held), claims: Object.assign({}, fs.claims),
             lapsed: fs.lapsed, holds: fs.holds, holdOut: fs.holdOut, seaA: fs.seaA,
             op: { phase: opPhase(), toH: Math.round(waveT), wave: attackWave.length,
                   fleet: navalWave.length, navAim: navAim, air: fs.opAir, swing: fs.swing },
             amphib: { state: amphib.state, trips: fs.trips, boarded: fs.boarded,
                       landed: fs.landed, noBeach: fs.noBeach, noHard: fs.noHard, dry: fs.dry } };
  }

  function tryBuildUnit(role) {
    const id = unitFor(P.faction, role, P.era);
    if (!id) return false;
    const def = UNITS[id];
    const why = P.lockReason(def);
    /* refused for fuel alone is DEMAND, and the force budget needs to hear it
       - but only once the cash and the hoard below have had their say */
    const dry = !!why && def.oil > 0 && why.indexOf("INSUFFICIENT FUEL") === 0;
    if (why && !dry) return false;
    if (P.cash < P.factionCost(def) * 0.6) return false;
    /* respect the tech savings plan (harvesters & supply are always exempt) */
    /* ...except that the rig is exempt from a hoard that is FOR the rig: the
       hoard is cost+500 and this line asked for hoard+cost, about 6,500
       credits, before the thing being saved for could be bought. */
    const hoardFor = role === "mcv" && rigHoard ? 0 : saveTarget;
    if (hoardFor > 0 && role !== "harvester" && role !== "supply" &&
        P.cash < hoardFor + P.factionCost(def)) return false;
    if (dry) {
      if (demandable(def, role)) noteDemand(armOf(def), def.oil);
      return false;
    }
    /* once the cash for a step is banked the fuel is reserved too, or the
       reserve leaves a few barrels at a time in vehicles and the step is never
       legal. Only once the cash is there: an army held back for a step that
       cannot be paid for yet is worse than no step at all. */
    if (eraStep && def.oil && role !== "harvester" && role !== "supply" &&
        P.cash >= eraStep.cost && P.oil - def.oil < eraStep.oil) return false;
    /* ---- AND THE SAME RESERVE FOR A RIG ----
       A construction rig is oil:30, and a commander that spends every barrel
       the moment it arrives never holds thirty at once. Measured at Warlord:
       30,521 credits banked, EIGHT barrels, one construction yard, and it
       wanted three more - the purchase that would have unlocked the fuel was
       blocked by the fuel. Fuel is bought at 0.18 a second on cash alone, so
       the barrels do come; they were simply being spent on the next rifle
       squad first. This holds them back the way the line above holds them for
       a generational step, and for the same reason: the thing being saved for
       is worth more than what the money would otherwise buy this tick. */
    if (role !== "mcv" && role !== "harvester" && role !== "supply" &&
        !oilSpare(def.oil)) return false;
    /* ---- the force budget: which service gets the next barrel ---- */
    const arm = def.oil ? armOf(def) : null;
    /* Air defence at home answers the enemy's air force, not our ground
       share: booked as ground, a water theatre's 0.12 share never let it
       claim, and the SAM that the 38% air push makes the enemy's peakAir ask
       for could only be bought out of another service's leftovers. It keeps
       the committed-fuel test and skips the claim. */
    const homeAD = role === "sam" || role === "spaag";
    if (arm && !(homeAD ? P.oil - committedOil() >= def.oil : armOilOk(arm, def.oil))) {
      /* counted only when the CLAIM is what stopped it, not an empty tank */
      if (P.oil - committedOil() >= def.oil) forceStat.held[arm]++;
      if (demandable(def, role)) noteDemand(arm, def.oil);
      return false;
    }
    const ok = P.enqueue(def.cat, id);
    if (ok) {
      delete holdFrom[role];
      /* served: the promise now sits in the queue, where committedOil() keeps
         it safe, and the next think re-reads who is furthest behind */
      if (arm && oilClaim && oilClaim.arm === arm) oilClaim = null;
    }
    return ok;
  }

  /* ---- the factory door stays open ----
     G.spawnUnit starts its search for open ground at (tx + w/2, ty + h) of the
     war factory or barracks nearest home, and a refinery's free hauler is put
     down at row ty + h + 1. Nothing kept those tiles free, and the base
     sealed its own doors: in a jsc probe of taiwan P0's only factory at
     (22,49) was ringed by two power plants, the barracks and the yard by
     t~150, and 13-15 vehicles - seven haulers, four trucks, the only rig -
     sat in a two-tile pocket until t=600; on fulda two 3,000-credit rigs
     stood boxed in by the yard, both factories, the refinery and a nest from
     t=210 to past t=330. With the build plan now putting far more structures
     next to production, every siting helper asks this as well.
     Rejects a footprint over the two rows in front of a ground production
     building (one tile wider each side) or in front of a refinery, and a new
     ground production building whose own door does not open onto at least
     24 tiles of open ground (doorFlood, with the new footprint counted as
     built). The last is the korea fault in the integration smoke run: P0's
     factory door fell on impassable shore, the engine's Path.nearest put
     every vehicle on the one open tile beside it - walled by the yard, the
     factory and the water - and P0 landed 33k by t=600 against P1's 260k.
     Cost: O(our production buildings + refineries) per candidate, asked only
     after canPlace has said yes, plus a flood of at most 24 tiles for a
     production candidate. */
  function keepsLanes(defId, tx, ty) {
    const def = BUILDINGS[defId];
    if (!def || def.oilNode) return true;
    const x1 = tx + def.w - 1, y1 = ty + def.h - 1;
    for (const b of P.buildings) {
      if (b.dead) continue;
      const bd = b.def;
      let ax0, ax1;
      if (bd.produces === "infantry" || bd.produces === "vehicle") { ax0 = b.tx - 1; ax1 = b.tx + bd.w; }
      else if (bd.id === "refinery") { ax0 = b.tx; ax1 = b.tx + bd.w - 1; }
      else continue;
      const ay0 = b.ty + bd.h, ay1 = ay0 + 1;
      if (tx <= ax1 && x1 >= ax0 && ty <= ay1 && y1 >= ay0) return false;
    }
    if (def.produces === "infantry" || def.produces === "vehicle")
      return doorFlood(def, tx, ty, 24) >= 24;
    return true;
  }
  /* Open ground reachable from where the engine puts a new unit down
     (G.spawnUnit: the nearest unbuilt tile to (tx + w/2, ty + h) within 7),
     flooded four-way up to `limit` tiles. `def, tx, ty` may be a planned
     footprint, counted as built. */
  function doorFlood(def, tx, ty, limit) {
    const M = G.map, W = M.W, H = M.H;
    const inFoot = (x, y) => x >= tx && x < tx + def.w && y >= ty && y < ty + def.h;
    const open = (x, y) => x >= 0 && y >= 0 && x < W && y < H && !inFoot(x, y) &&
                           !G.occ[y * W + x] && GameMap.passable(M, x, y, "ground");
    let sx = tx + ((def.w / 2) | 0), sy = ty + def.h;
    if (!open(sx, sy)) {
      const n = Path.nearest(M, U.clamp(sx, 0, W - 1), U.clamp(sy, 0, H - 1), "ground",
                             (a, b) => inFoot(a, b) || !!G.occ[b * W + a], 7);
      if (!n) return 0;
      sx = n.x; sy = n.y;
    }
    const seen = new Set([sy * W + sx]), stack = [sy * W + sx];
    while (stack.length && seen.size < limit) {
      const i = stack.pop(), x = i % W, y = (i / W) | 0;
      for (let d = 0; d < 4 && seen.size < limit; d++) {
        const nx = x + (d === 0 ? 1 : d === 1 ? -1 : 0), ny = y + (d === 2 ? 1 : d === 3 ? -1 : 0);
        const j = ny * W + nx;
        if (seen.has(j) || !open(nx, ny)) continue;
        seen.add(j); stack.push(j);
      }
    }
    return seen.size;
  }
  /* every base-builder candidate: not on a free oil pad (padNo), not across
     a door (keepsLanes) */
  function siteOK(defId, tx, ty) {
    return !padNo(defId, tx, ty) && keepsLanes(defId, tx, ty);
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
        /* never on a free well's pad or across a door (siteOK) */
        if (G.canPlace(P, defId, tx, ty) && siteOK(defId, tx, ty)) return { tx, ty };
      }
    }
    return null;
  }
  /* naval yard needs shoreline: walk the coast near home */
  function findShoreSpot() {
    /* Same answer, a fraction of the work. This walked every other tile of
       the theatre through canPlace - ~5,000 calls, each a footprint of
       spatial-grid queries and a pass over our buildings - on every think the
       naval rung was reached, and then discarded anything past 40 tiles. Only
       that box is searched now, nearer-than-best first, and a footprint with
       no water or no land in it (which canPlace refuses on the shoreline test)
       is skipped before canPlace is asked. Same parity and order, so the same
       spot comes back. */
    const map = G.map, W = map.W;
    const bdef = BUILDINGS.navalyard, fw = bdef.w, fh = bdef.h;
    const WATER = (typeof T !== "undefined" && T.WATER !== undefined) ? T.WATER : 0;
    const hx = (P.homeX / CFG.TILE) | 0, hy = (P.homeY / CFG.TILE) | 0;
    let best = null, bd = 40 * 40;
    let y0 = Math.max(1, hy - 40); if (!(y0 & 1)) y0++;
    let x0 = Math.max(1, hx - 40); if (!(x0 & 1)) x0++;
    for (let y = y0; y < map.H - 3 && y <= hy + 40; y += 2)
      for (let x = x0; x < map.W - 3 && x <= hx + 40; x += 2) {
        const d = U.dist2(x, y, hx, hy);
        if (d >= bd) continue;
        let wet = false, dry = false;
        for (let yy = y; yy < y + fh && yy < map.H; yy++)
          for (let xx = x; xx < x + fw && xx < W; xx++) {
            if (map.terrain[yy * W + xx] === WATER) wet = true; else dry = true;
          }
        if (!wet || !dry) continue;
        /* never over a coastal well (taiwan P0's node is on the coast) or a door */
        if (!G.canPlace(P, "navalyard", x, y) || padClash("navalyard", x, y) ||
            !keepsLanes("navalyard", x, y)) continue;
        bd = d; best = { tx: x, ty: y };
      }
    return best;
  }
  function findOilSpot(peek) {
    /* Nearest free node, preferring our own half of the theatre but not
       confined to it. The old flat 30-tile cap meant a commander whose only
       near node was an unbuildable shoreline sliver - and there is one on
       Taiwan - never looked past it, and spent the whole match on the 150
       barrels it started with: no tech 3, no generational step, nothing.
       A commander with no well at all reaches across the map for one. */
    const hx = P.homeX / 32, hy = P.homeY / 32;
    /* ---- AND IT EXPANDS FOR THE OIL ----
       (owner) "The ai should expand and occupy the oil for its own
       development."
       It did not. Once a commander owned ONE derrick this dropped to a flat
       thirty tiles of home for the rest of the match, so it worked its own
       corner dry and then stopped - measured, a Warlord at t=1500 sitting on
       40,088 credits and TWENTY-NINE BARRELS with nothing it could spend them
       on, because findOilSpot() answered null and every force ceiling in the
       file is ultimately a fuel ceiling.
       A player does not stop at the edge of their own corner; they go and take
       the next field, and accept that a well out there is exposed. So the
       reach opens with the match - the commander pushes further out as it
       develops - and a commander that is genuinely fuel-starved with money in
       the bank reaches as far as it must, which is the state that should send
       an army out to take ground rather than sit on cash. */
    /* ---- THE REACH IS THE RULE, AND THE PICTURE IS OUR OWN ----
       The clock-driven reach that used to sit here (30 tiles, plus ten every
       three minutes, measured from HOME) is gone. G.canPlace already holds a
       derrick to CFG.OIL_RADIUS of a structure we own, which is the same limit
       the player has; the extra ring only ever threw away a node that a
       forward yard had legally brought inside the pipe.
       It also read `n.taken` on every node on the map and never asked whether
       anybody of ours had looked - a field forty tiles off changing hands
       through fog. oilSite() below reads the commander's own node memory
       instead (noteOil), and canPlace stays the final word, exactly as the
       player's red placement ghost is. */
    return oilSite(peek);
  }

  /* ======================================================================
     THE OIL PICTURE, AND WHY THE FIRST WELL NEVER WENT DOWN
     ======================================================================
     Measured, taiwan at Warlord, both seats AI: P0's construction yard stood
     SEVEN tiles from a free node for the whole match and it finished at
     t=1200 with ZERO derricks, 37,500 credits and seven barrels. expandNode()
     answered true and findOilSpot() answered false at every sample from t=150
     to t=450, and by t=600 even expandNode() had stopped seeing it - the node
     was still free (`n.taken` false) but no longer drillable.
     Two faults, both ours, neither the map's:
       - The node sits on the coast and only ONE of its four 2x2 footprints is
         dry land. canPlace refuses a footprint when ANY ground unit is in the
         spatial-grid cells around it (a 20-pixel query over 64-pixel cells, so
         up to three tiles out), and the commander parks its own infantry,
         supply trucks and rally points in its own base. One footprint, a base
         full of idle troops: never placeable. A player selects the squad and
         moves it; shoveOff() does exactly that, and moves the rally point that
         keeps refilling the spot.
       - findSpot() drops power plants and silos on random legal tiles within
         twenty-six of the yard, and nothing stopped it covering the node's
         pad. padClash() keeps our own structures - and a production
         building's rally point - off every free pad we know about, and
         sellOffPad() sells a cheap structure of ours that already sits on
         one, which is what a player does when the silo went down in the wrong
         place.
     And for the fog rule: node state is REMEMBERED from what our own sensors
     saw (noteOil), never read live off the map. Positions of nodes we have
     overlooked are map knowledge; whether somebody has drilled one since we
     last looked is not. */
  let nodeMem = null;            // per oil node: what we last saw there
  let oilMemT = -99;             // when the picture was last refreshed
  let oilSpotT = -1, oilSpotV = null;   // oilSite() memoised on the game tick
  let oilShoveT = -99;           // the last time we cleared a pad of our own pieces
  let stepPlan = null, stepNext = 0;    // the guard post going out toward a field
  const stepTries = new Map();   // node index -> posts already put down toward it
  const oilLog = { why: "", firstWell: -1, wells: 0, shoves: 0, rally: 0, pads: 0,
                   refused: 0, busy: 0, sold: 0, posts: 0, forward: 0, stalls: 0, stranded: 0,
                   prospects: 0 };
  /* Structures cheap enough to sell for the ground under them. Production,
     refineries, the radar and the lab are never on it. */
  const PAD_SELL = { silo: 1, power: 1, nest: 1, atpost: 1, wall: 1, flak: 1 };

  /* Refreshed on its own 1.5-second clock by whoever asks first, so it needs
     no hook in think(). peek never refreshes: the census reads through it and
     must not change what the commander knows or does. Cost: one grid query of
     twelve tiles per node (four to twelve nodes a theatre). */
  function oilMem(peek) {
    if (!peek && (!nodeMem || G.time - oilMemT >= 1.5 || G.time < oilMemT)) {
      oilMemT = G.time;
      noteOil();
    }
    return nodeMem;
  }
  function noteOil() {
    const N = G.map.oilNodes, TL = CFG.TILE, now = G.time, W = G.map.W;
    if (!nodeMem || nodeMem.length !== N.length)
      nodeMem = N.map(() => ({ seen: false, taken: false, open: true, mine: false,
                               own: false, t: -1, deny: 0 }));
    /* our own wells we know about without looking */
    for (let i = 0; i < N.length; i++) nodeMem[i].own = false;
    for (const b of P.buildings) {
      if (b.dead || !b.def.oilNode) continue;
      for (let i = 0; i < N.length; i++) {
        const n = N[i];
        if (n.x >= b.tx && n.x < b.tx + b.def.w && n.y >= b.ty && n.y < b.ty + b.def.h)
          nodeMem[i].own = true;
      }
    }
    for (let i = 0; i < N.length; i++) {
      const n = N[i], m = nodeMem[i];
      if (m.own) { m.seen = true; m.taken = true; m.mine = true; m.open = true; m.t = now; continue; }
      /* our well died - we were told; what stands there now we have not seen */
      if (m.mine) { m.mine = false; m.taken = false; }
      const idx = n.y * W + n.x;
      if (!look || !look[idx]) continue;
      /* Stamp 1 is the deployment survey (init) or the first eight seconds -
         before anybody could have finished a twelve-second derrick. */
      if (m.t < 0 && look[idx] === 1) {
        m.seen = true; m.taken = false; m.open = nodeGround(n); m.t = 0;
      }
      /* a sensor of ours on it right now: the grid is asked rather than the
         look stamp, which is four-second coarse and says nothing of who is
         still watching */
      const cx = (n.x + 0.5) * TL, cy = (n.y + 0.5) * TL;
      let eyes = false;
      G.grid.query(cx, cy, TL * 12, (e) => {
        if (eyes || e.dead || e.owner !== P || e.carried || !e.sightR) return;
        if (e.kind === "building" && e.buildProgress < 1) return;
        const r = e.sightR() * TL;
        if (U.dist2(e.x, e.y, cx, cy) <= r * r) eyes = true;
      });
      if (!eyes) continue;
      m.seen = true; m.t = now;
      m.taken = n.taken;
      m.open = nodeDrillable(n);
    }
  }
  function nodeKnownFree(i) {
    const m = nodeMem && nodeMem[i];
    return !!m && m.seen && !m.taken && !(m.deny > G.time);
  }
  /* terrain alone - what the map says, which is fair to know */
  function footGround(tx, ty) {
    const dw = BUILDINGS.derrick.w, dh = BUILDINGS.derrick.h;
    if (tx < 0 || ty < 0 || tx + dw > G.map.W || ty + dh > G.map.H) return false;
    for (let y = ty; y < ty + dh; y++) for (let x = tx; x < tx + dw; x++) {
      const t = G.map.terrain[y * G.map.W + x];
      if (!CFG.TERRAIN[t] || !CFG.TERRAIN[t].pass || t === T.TREE) return false;
    }
    return true;
  }
  function nodeGround(n) {
    for (let dy = -1; dy <= 0; dy++) for (let dx = -1; dx <= 0; dx++)
      if (footGround(n.x + dx, n.y + dy)) return true;
    return false;
  }
  /* Would a structure of ours at (tx,ty) sit on the 3x3 pad of a free node we
     know about, or park its production rally inside the blocking zone around
     one? The zone is 4.5 tiles: canPlace's unit query reaches three tiles out
     through the 64-pixel grid cells, and a squad is a tile across. Cost: a
     dozen rectangle tests, and callers ask it only after canPlace said yes. */
  function padClash(defId, tx, ty) {
    const def = BUILDINGS[defId], mem = oilMem(true);
    if (!def || def.oilNode || !mem) return false;
    const N = G.map.oilNodes;
    const rally = def.produces && def.produces !== "aircraft";
    const rx = tx + def.w / 2, ry = ty + def.h + 1.5;
    for (let i = 0; i < N.length && i < mem.length; i++) {
      const m = mem[i];
      if (!m.seen || m.taken) continue;
      const n = N[i];
      if (tx <= n.x + 1 && tx + def.w - 1 >= n.x - 1 &&
          ty <= n.y + 1 && ty + def.h - 1 >= n.y - 1) return true;
      if (rally && Math.abs(rx - (n.x + 0.5)) < 4.5 && Math.abs(ry - (n.y + 0.5)) < 4.5) return true;
    }
    return false;
  }
  /* the base builder's copy, counted for the census */
  function padNo(defId, tx, ty) {
    if (!padClash(defId, tx, ty)) return false;
    oilLog.pads++;
    return true;
  }
  /* within R tiles of an enemy structure we have SEEN (seenB is in pixels;
     civilian blocks, own < 0, are not a base) */
  function nearFoe(tx, ty, R) {
    for (const r of seenB.values())
      if (r && !r.gone && r.own >= 0 && U.dist(tx, ty, r.x / CFG.TILE, r.y / CFG.TILE) < R) return true;
    return false;
  }
  /* (No well cap: the build plan drills wherever canPlace allows - the map
     bounds a player the same way.) */
  /* Can shoveOff() actually move this piece? The same test it applies. */
  function shovable(u) {
    const t = u.order && u.order.type;
    if (u.def.deployTo || u === prospect || u.flankTo) return false;
    if (attackWave.indexOf(u) >= 0 || raidParty.indexOf(u) >= 0) return false;
    if (u.def.harvester) return t === "idle" || t === "harvest";
    return t === "idle" || t === "guard" || t === "move";
  }

  function oilSite(peek) {
    if (oilSpotT === G.time) return oilSpotV;
    const v = oilSiteNow(peek);
    if (!peek) { oilSpotT = G.time; oilSpotV = v; }
    return v;
  }
  /* Nearest remembered-free node inside the pipe, footprint by footprint.
     Cost: an inBaseRadius per node (fifty structures) to throw out the ones
     out of reach, then at most four canPlace calls per node that is left -
     usually one or two nodes - memoised on the tick. */
  function oilSiteNow(peek) {
    const mem = oilMem(peek);
    if (!mem) return null;
    const N = G.map.oilNodes, now = G.time;
    const dw = BUILDINGS.derrick.w, dh = BUILDINGS.derrick.h;
    const hx = P.homeX / CFG.TILE, hy = P.homeY / CFG.TILE;
    const cand = [];
    for (let i = 0; i < N.length; i++) {
      if (!nodeKnownFree(i)) continue;
      if (!P.inBaseRadius(N[i].x + 0.5, N[i].y + 0.5, CFG.OIL_RADIUS + 1.5)) continue;
      cand.push(i);
    }
    if (!cand.length) { if (!peek) oilLog.why = "none"; return null; }
    cand.sort((a, b) => U.dist2(N[a].x, N[a].y, hx, hy) - U.dist2(N[b].x, N[b].y, hx, hy));
    let why = "reach", crowdSpot = null;
    for (const i of cand) {
      const n = N[i];
      let crowd = null, cfoot = null, bfoot = null, inReach = false;
      for (let dy = -1; dy <= 0; dy++) for (let dx = -1; dx <= 0; dx++) {
        const tx = n.x + dx, ty = n.y + dy;
        if (!P.inBaseRadius(tx + dw / 2, ty + dh / 2, CFG.OIL_RADIUS)) continue;
        inReach = true;
        if (G.canPlace(P, "derrick", tx, ty)) {
          if (!peek) oilLog.why = "ok";
          return { tx, ty, node: i };
        }
        if (!crowd) {
          const c = liftedPlace(tx, ty);
          /* a crowd we can clear is moved (shoveOff); one we cannot - a
             hauler on a return, a unit on a job, a rig passing through - is
             only passing, and the ground under it is good */
          if (c && c.every(shovable)) { crowd = c; cfoot = { tx, ty }; }
          else if (c && !bfoot) bfoot = { tx, ty, lifted: c };
        }
      }
      if (!inReach) continue;
      if (crowd) {
        /* Legal but for our own pieces. Measured on taiwan with this code:
           the one dry footprint of P0's coastal well was covered by P0's own
           hauler, mining the ore field that touches the pad, at every
           four-second sample from t=90 to t=160. Idle troops are moved now;
           the hauler only once the derrick is built and waiting (placeReady),
           since a move order is all it takes - updateHarvester turns a
           finished move back into "harvest" by itself. The crowded site is
           still an answer, so the rung queues the well. */
        why = "crowded";
        if (!peek) shoveOff(i, crowd, false);
        if (!crowdSpot) crowdSpot = { tx: cfoot.tx, ty: cfoot.ty, node: i, crowded: true, lifted: crowd };
        continue;
      }
      if (bfoot && !crowd) {
        /* Our own traffic on the pad, not a refusal. Measured in a jsc probe
           of taiwan: P1's one dry footprint, six tiles from its yard, lies on
           its haulers' road to the field beside it and was blocked at half
           of all 10 s samples from t=70 to t=330. Each time, the node read
           "refused" and was written off for 60 s, the ready derrick was
           refunded into a 70 s cool-down, and the write-off read as
           `starved` and bought oil-expedition rigs: firstWell 300. Now the
           well is queued and placeReady waits twelve thinks for a gap
           (oilShoveT), nothing written off. */
        why = "busy";
        if (!peek) { oilShoveT = now; oilLog.busy++; }
        if (!crowdSpot) crowdSpot = { tx: bfoot.tx, ty: bfoot.ty, node: i, crowded: true, lifted: bfoot.lifted };
        continue;
      }
      if (peek) { why = "refused"; continue; }
      if (P.oil < 200 && sellOffPad(i)) { why = "sold"; mem[i].deny = now + 2; oilShoveT = now; continue; }
      /* The ground says no with our own pieces out of the way: drilled under
         fog, a wreck, a foreign vehicle. Believe it for a minute - a sensor
         passing will correct the picture sooner. */
      why = "refused";
      mem[i].deny = now + 60;
      oilLog.refused++;
    }
    if (!peek) oilLog.why = why;
    return crowdSpot;
  }
  /* Is the only thing wrong with this footprint our own units standing on it?
     Lifts them exactly the way the rig lifts itself (carried), asks the
     rule, and puts them back. Returns the pieces to move, or false. */
  function liftedPlace(tx, ty) {
    const lifted = [];
    const dw = BUILDINGS.derrick.w, dh = BUILDINGS.derrick.h;
    for (let y = ty; y < ty + dh; y++) for (let x = tx; x < tx + dw; x++)
      G.grid.query(x * CFG.TILE + 16, y * CFG.TILE + 16, 20, (e) => {
        if (e.dead || e.kind !== "unit" || e.layer !== "ground" || e.carried) return;
        if (e.owner !== P) return;
        e.carried = true;
        lifted.push(e);
      });
    if (!lifted.length) return false;
    const ok = G.canPlace(P, "derrick", tx, ty);
    for (const e of lifted) e.carried = false;
    return ok ? lifted : false;
  }
  /* Six tiles off the well, away from it, onto open ground - what a player
     does with a box-select and a right-click. Only pieces doing nothing more
     important than standing: an attacking unit is left alone, and a hauler
     only when `haul` says the derrick is waiting for the ground. Rally points
     inside the zone move with them, or the next squad off the ramp walks
     straight back onto the pad. */
  function shoveOff(i, lifted, haul) {
    const m = nodeMem[i], key = haul ? "shoveH" : "shoveT";
    if (m[key] !== undefined && G.time - m[key] < 4) return;
    m[key] = G.time;
    let moved = 0;
    const n = G.map.oilNodes[i], TL = CFG.TILE, M = G.map;
    const cx = (n.x + 0.5) * TL, cy = (n.y + 0.5) * TL;
    for (const u of lifted) {
      /* never a rig (moveRig re-issues its route), the prospector, or a wave
         or raid member staging on a move: those leave the pad on their own */
      if (!shovable(u)) continue;
      if (u.def.harvester && !haul) continue;
      let a = Math.atan2(u.y - cy, u.x - cx);
      if (Math.abs(u.x - cx) < 2 && Math.abs(u.y - cy) < 2) a = G.rng() * U.PI2;
      const gx = U.clamp(((cx + Math.cos(a) * TL * 6) / TL) | 0, 1, M.W - 2);
      const gy = U.clamp(((cy + Math.sin(a) * TL * 6) / TL) | 0, 1, M.H - 2);
      const s = GameMap.passable(M, gx, gy, "ground") && !G.tileBlocked(gx, gy, null)
        ? { x: gx, y: gy }
        : Path.nearest(M, gx, gy, "ground", (x, y) => G.tileBlocked(x, y, null), 4);
      if (!s) continue;
      u.give({ type: "move", x: (s.x + 0.5) * TL, y: (s.y + 0.5) * TL });
      oilLog.shoves++; moved++;
    }
    for (const b of P.buildings) {
      if (b.dead || !b.def.produces || b.def.produces === "aircraft" || !b.rally) continue;
      if (Math.abs(b.rally.x - cx) > TL * 4.5 || Math.abs(b.rally.y - cy) > TL * 4.5) continue;
      const off = (Math.max(b.def.w, b.def.h) / 2 + 1.5) * TL;
      let best = null, bd = -1;
      for (const [dx, dy] of [[0, -1], [-1, 0], [1, 0], [0, 1], [-1, -1], [1, -1], [-1, 1], [1, 1]]) {
        const rx = b.x + dx * off, ry = b.y + dy * off;
        const tx = (rx / TL) | 0, ty = (ry / TL) | 0;
        if (tx < 1 || ty < 1 || tx >= M.W - 1 || ty >= M.H - 1) continue;
        if (!GameMap.passable(M, tx, ty, "ground") || G.tileBlocked(tx, ty, null)) continue;
        const d = Math.max(Math.abs(rx - cx), Math.abs(ry - cy)) >= TL * 4.5 ? 1e9 : U.dist2(rx, ry, cx, cy);
        if (d > bd) { bd = d; best = { x: rx, y: ry }; }
      }
      if (best) { b.rally = best; oilLog.rally++; moved++; }
    }
    /* placeReady waits for a pad only while something is really being
       cleared */
    if (moved) oilShoveT = G.time;
  }
  /* A cheap structure of ours on a free pad that is otherwise drillable:
     sell it (half its price back) and drill. A well is 0.55 barrels a second
     for good; a silo is storage and a nest is 400 credits. Never a building
     whose loss browns the base out, and never storage the bank is using. */
  function sellOffPad(i) {
    if (!G.sellBuilding) return false;
    const n = G.map.oilNodes[i], W = G.map.W;
    const dw = BUILDINGS.derrick.w, dh = BUILDINGS.derrick.h;
    for (let dy = -1; dy <= 0; dy++) for (let dx = -1; dx <= 0; dx++) {
      const tx = n.x + dx, ty = n.y + dy;
      if (!footGround(tx, ty)) continue;
      if (!P.inBaseRadius(tx + dw / 2, ty + dh / 2, CFG.OIL_RADIUS)) continue;
      const ids = new Set();
      for (let y = ty; y < ty + dh; y++) for (let x = tx; x < tx + dw; x++) {
        const o = G.occ[y * W + x];
        if (o) ids.add(o);
      }
      if (!ids.size) continue;
      const mine = [];
      for (const b of P.buildings) if (!b.dead && ids.has(b.id)) mine.push(b);
      if (mine.length !== ids.size) continue;      // not all ours: not ours to clear
      let ok = true;
      for (const b of mine) {
        if (!PAD_SELL[b.def.id]) { ok = false; break; }
        if (b.def.power > 0 && P.powerOut() - b.def.power < P.powerUse() * 1.1) { ok = false; break; }
        if (b.def.storage && P.cash > P.storageCap() - b.def.storage - 500) { ok = false; break; }
      }
      if (!ok) continue;
      for (const b of mine) G.sellBuilding(b);
      oilLog.sold += mine.length;
      return true;
    }
    return false;
  }
  function oilPlaced(spot) {
    oilSpotT = -1;
    if (oilLog.firstWell < 0) oilLog.firstWell = Math.round(G.time);
    oilLog.wells++;
    const m = spot && spot.node !== undefined && nodeMem ? nodeMem[spot.node] : null;
    if (m) { m.seen = true; m.taken = true; m.mine = true; m.t = G.time; }
  }

  /* ---- A GUARD POST TOWARD THE NEXT FIELD ----
     (owner) "ai should scout and expand quickly."
     A derrick needs a structure of ours within CFG.OIL_RADIUS (22 tiles), so
     a field up to OIL_RADIUS + BUILD_RADIUS - 3 = 30 tiles from the edge of
     the base is ONE emplacement away: an anti-tank gun put down eleven tiles
     out on the line to it brings the well inside the pipe and then guards it.
     That is what a player does with a well just out of reach, and it costs
     800 credits where the only road this file had was a 3,000-credit,
     30-barrel, forty-second rig. Measured on kuwait: P0's nearest free node
     sat at 21-22 tiles for the whole match and no derrick ever went down.
     Bounded: once every ten seconds, at most two posts per field, never
     within twelve tiles of an enemy structure we have seen, and only when the
     defence queue is empty (so the threat-scaled builder is not starved).
     Cost: one pass over the nodes, one over our structures, and at most
     twenty-five canPlace calls. */
  function oilOutpost() {
    if (G.time < stepNext) return false;
    stepNext = G.time + 10;
    const mem = oilMem();
    if (!mem) return false;
    const id = P.hasBuilding("factory") ? "atpost" : (P.hasBuilding("barracks") ? "nest" : null);
    if (!id || failCool[id] > G.time) return false;
    const dq = q("defense");
    if (dq.items.length || dq.ready.length) return false;
    const def = BUILDINGS[id];
    if (P.cash < P.factionCost(def) + 700) return false;
    const N = G.map.oilNodes, hx = P.homeX / CFG.TILE, hy = P.homeY / CFG.TILE;
    const far = CFG.OIL_RADIUS + CFG.BUILD_RADIUS - 3;
    let bi = -1, bd = Infinity;
    for (let i = 0; i < N.length; i++) {
      const n = N[i];
      if (!nodeKnownFree(i) || !mem[i].open || (stepTries.get(i) || 0) >= 2) continue;
      if (expandDead.has(nodeKey(n))) continue;
      const nx = n.x + 0.5, ny = n.y + 0.5;
      if (P.inBaseRadius(nx, ny, CFG.OIL_RADIUS - 0.5)) continue;   // the derrick rung's
      if (!P.inBaseRadius(nx, ny, far)) continue;                   // a rig's
      if (nearFoe(n.x, n.y, 12)) continue;
      const d = U.dist2(n.x, n.y, hx, hy);
      if (d < bd) { bd = d; bi = i; }
    }
    if (bi < 0) return false;
    const n = N[bi], wx = n.x + 0.5, wy = n.y + 0.5;
    let src = null, sd = Infinity;
    for (const b of P.buildings) {
      if (b.dead || b.def.obstacle) continue;
      const d = U.dist2(b.tx + b.def.w / 2, b.ty + b.def.h / 2, wx, wy);
      if (d < sd) { sd = d; src = b; }
    }
    if (!src) return false;
    const sx = src.tx + src.def.w / 2, sy = src.ty + src.def.h / 2;
    const L = Math.sqrt(sd) || 1, ux = (wx - sx) / L, uy = (wy - sy) / L;
    let spot = null, part = null;
    for (let r = CFG.BUILD_RADIUS - 1; r >= 4 && !spot; r -= 1.5) {
      for (const s of [0, 1.5, -1.5, 3, -3]) {
        const cx = sx + ux * r - uy * s, cy = sy + uy * r + ux * s;
        const tx = Math.floor(cx - def.w / 2 + 0.5), ty = Math.floor(cy - def.h / 2 + 0.5);
        if (!G.canPlace(P, id, tx, ty) || padClash(id, tx, ty)) continue;
        const toWell = U.dist(tx + def.w / 2, ty + def.h / 2, wx, wy);
        if (toWell <= CFG.OIL_RADIUS - 1.5) { spot = { tx, ty }; break; }
        if (!part && toWell < L - 3) part = { tx, ty };
      }
    }
    spot = spot || part;
    if (!spot || !P.enqueue("defense", id)) return false;
    stepPlan = { id, tx: spot.tx, ty: spot.ty, t: G.time };
    stepTries.set(bi, (stepTries.get(bi) || 0) + 1);
    oilLog.posts++;
    return true;
  }

  /* Placing the post: the planned tile or one beside it. A unit crossing the
     tile at the moment the gun is ready (seen in testing) must not send it
     back to the perimeter, so a blocked plan waits up to three thinks before
     placeReady falls back to the ordinary siting (its refund needs four). */
  function stepReady(id) {
    return !!stepPlan && stepPlan.id === id && G.time - stepPlan.t < 90 &&
           (stepPlan.miss || 0) < 3;
  }
  function stepSpot(id) {
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const tx = stepPlan.tx + dx, ty = stepPlan.ty + dy;
      if (!G.canPlace(P, id, tx, ty) || padClash(id, tx, ty)) continue;
      stepPlan = null;
      return { tx, ty };
    }
    stepPlan.miss = (stepPlan.miss || 0) + 1;
    return null;
  }

  /* ---- THE STRANDED RIG ----
     Measured on taiwan at Warlord: P0's rig stood at (94,122) from t=600 to
     t=1200 - "move", "idle", "move", "move", "idle" - eighty-two tiles from
     home, and P1's at (24,23) from t=900 to t=1200. A rig in hand blocks the
     purchase of the next one (runExpansion buys only when none is held), so
     NEITHER commander put up another yard for the rest of the match, with
     28,000 to 37,500 credits banked and a yard target of four.
     A rig is a base that has not been put down yet. One that has not moved a
     tile and a half in forty-five seconds unfolds where it stands - or on
     the nearest legal ground within four tiles - unless that is within twelve
     tiles of an enemy structure we have seen. A yard eighty tiles out is
     still +50% on every structure (player.js prodSpeed), still a build radius
     of its own, and under the production rule still a reason the side is not
     beaten. Cost: nothing while rigs move; a stalled rig costs at most
     eighty canPlace calls every three seconds, and there are at most two. */
  function rigStrand(rigs) {
    for (const r of rigs) {
      if (r.dead) continue;
      const moved = r._wdT === undefined ||
                    U.dist(r.x, r.y, r._wdX, r._wdY) > CFG.TILE * 1.5;
      if (moved) { r._wdX = r.x; r._wdY = r.y; r._wdT = G.time; }
      if (!r._wdGo) {
        if (moved || G.time - r._wdT < 45) continue;
        r._wdGo = true; r._wdN = 0; oilLog.stalls++;
      }
      if (G.time - (r._wdTry || -99) < 3) continue;
      r._wdTry = G.time;
      const bdef = BUILDINGS[r.def.deployTo];
      /* not in front of a base we know about, and not for ever */
      if (nearFoe(r.tx, r.ty, 12) || ++r._wdN > 12) {
        r._wdGo = false; r._wdT = G.time; r._wdX = r.x; r._wdY = r.y;
        continue;
      }
      const ox = r.tx - ((bdef.w / 2) | 0), oy = r.ty - ((bdef.h / 2) | 0);
      if (!padClash(r.def.deployTo, ox, oy) && keepsLanes(r.def.deployTo, ox, oy) &&
          G.deployRig(r)) {
        oilLog.stranded++;
        yardSpot = null; yardSpotT = -99;
        continue;
      }
      let spot = null, sd = Infinity;
      for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
        const dd = dx * dx + dy * dy;
        if (!dd || dd >= sd) continue;
        const cx = r.tx + dx, cy = r.ty + dy;
        const tx = cx - ((bdef.w / 2) | 0), ty = cy - ((bdef.h / 2) | 0);
        if (padClash(r.def.deployTo, tx, ty) || !keepsLanes(r.def.deployTo, tx, ty)) continue;
        r.carried = true;
        const ok = G.canPlace(P, r.def.deployTo, tx, ty);
        r.carried = false;
        if (ok) { sd = dd; spot = { cx, cy }; }
      }
      if (spot) moveRig(r, spot.cx, spot.cy);
    }
  }
  /* Where a rig sent for a field unfolds, held for six seconds a search: the
     search is up to 169 canPlace calls and this used to run it every think. */
  function rigSpotFor(rig, node, reachD, box) {
    const bdef = BUILDINGS[rig.def.deployTo];
    const key = nodeKey(node) + ":" + reachD;
    const c = rig._spot;
    if (c && c.key === key && G.time - c.t < 6) return c.cx === null ? null : c;
    const rx = (rig.x / CFG.TILE) | 0, ry = (rig.y / CFG.TILE) | 0;
    let best = null, sd = Infinity;
    for (let dy = -box; dy <= box; dy++) for (let dx = -box; dx <= box; dx++) {
      const cx = rx + dx, cy = ry + dy;
      /* would the well be inside this yard's reach? */
      if (U.dist(cx, cy, node.x, node.y) > reachD) continue;
      const dd = U.dist2(cx, cy, rx, ry) + U.dist2(cx, cy, node.x, node.y) * 0.02;
      if (dd >= sd) continue;
      const tx = cx - ((bdef.w / 2) | 0), ty = cy - ((bdef.h / 2) | 0);
      if (padClash(rig.def.deployTo, tx, ty) || !keepsLanes(rig.def.deployTo, tx, ty)) continue;
      rig.carried = true;
      const ok = G.canPlace(P, rig.def.deployTo, tx, ty);
      rig.carried = false;
      if (ok) { sd = dd; best = { cx, cy }; }
    }
    rig._spot = { key, t: G.time, cx: best ? best.cx : null, cy: best ? best.cy : null };
    return best ? rig._spot : null;
  }

  /* ---- PROSPECTING FOR OIL ----
     (owner) "ai should scout and expand quickly."
     With node state read only from our own sensors, a commander whose nearest
     well lies outside its opening survey does not know it is there - and the
     player does not either: the explored zone round a human start is sixteen
     tiles. Measured off the theatre data at seed aiA, the nearest node is
     beyond the sixteen-tile survey for kuwait starts 0, 2 and 3 (22, 25, 21
     tiles), taiwan start 1 (32), normandy start 1 (35), ngp start 3 (26),
     suwalki start 3 (30) and baltic start 3 (23). The old findOilSpot read
     those nodes straight off the map; now somebody has to go and look.
     So while the commander knows of NO usable well, one idle line unit - not
     a scout car, which the scouting sweep owns, and never a hauler, rig,
     truck or gun that is doing a job - walks to the nearest unexplored ground
     on rings round home, ring by ring outward. It is a search pattern over
     our own `look` map and never reads a node position. It stops the moment
     a usable well is known, and walks home if it is far out.
     Cost: a pass over our units to pick the walker, and at most 288 ring
     points of array lookups, once every six seconds at Warlord - and nothing
     at all while a well is known. */
  let prospect = null, prospectGoal = null, prospectGoT = 0, prospectD = 0, prospectT = 0;
  const prospectShy = new Map();
  const PROSPECT_SKIP = { harvester: 1, mcv: 1, recon: 1, supply: 1, minelayer: 1,
                          mineclear: 1, repair: 1, radarv: 1, ewveh: 1, aa: 1, spaag: 1,
                          mortar: 1, spg: 1, mlrs: 1, tel: 1, sam: 1, engineer: 1,
                          medic: 1, sniper: 1 };
  const pKey = (x, y) => (((y / CFG.TILE / 4) | 0) << 10) | ((x / CFG.TILE / 4) | 0);
  function oilProspect() {
    if (G.time < prospectT) return;
    prospectT = G.time + Math.max(5, (D.scoutT || 30) / 3);
    const mem = oilMem();
    if (!mem) return;
    const N = G.map.oilNodes, TL = CFG.TILE;
    for (let i = 0; i < N.length; i++) {
      if (!nodeKnownFree(i) || !mem[i].open || expandDead.has(nodeKey(N[i]))) continue;
      if (nearFoe(N[i].x, N[i].y, 12)) continue;
      prospectEnd();
      return;
    }
    if (prospect && (prospect.dead || prospect.carried)) { prospect = null; prospectGoal = null; }
    if (prospect) {
      const o = prospect.order || {}, t = o.type;
      const mine = prospectGoal && t === "move" &&
                   Math.abs(o.x - prospectGoal.x) < TL * 2 && Math.abs(o.y - prospectGoal.y) < TL * 2;
      if (mine) {
        /* thirty seconds without closing two tiles: not reachable from here */
        if (G.time - prospectGoT < 30) return;
        const d = U.dist(prospect.x, prospect.y, prospectGoal.x, prospectGoal.y) / TL;
        if (d < prospectD - 2) { prospectGoT = G.time; prospectD = d; return; }
        prospectShy.set(pKey(prospectGoal.x, prospectGoal.y), G.time + 240);
      } else if (t !== "idle" && t !== "guard") {
        prospect = null;                       // somebody else has given it a job
      } else if (prospectGoal) {
        /* Back to idle with the goal still unseen: entities.js turns an AI
           move that cannot finish into idle (nowhere to go, or stalledOnMove
           after 10-20 s) before the thirty-second test above can run, and
           prospectSpot() would hand back the same shore-side tile every six
           seconds - a whole-landmass Path.find each time on taiwan. */
        const gx = (prospectGoal.x / TL) | 0, gy = (prospectGoal.y / TL) | 0;
        if (!look[gy * G.map.W + gx]) prospectShy.set(pKey(prospectGoal.x, prospectGoal.y), G.time + 240);
      }
      prospectGoal = null;
    }
    if (!prospect) prospect = pickProspector();
    if (!prospect) return;
    const g = prospectSpot(prospect);
    if (!g) { prospectEnd(); prospectT = G.time + 30; return; }
    prospect.give({ type: "move", x: g.x, y: g.y });
    prospectGoal = g; prospectGoT = G.time;
    prospectD = U.dist(prospect.x, prospect.y, g.x, g.y) / TL;
    oilLog.prospects++;
  }
  function prospectEnd() {
    const u = prospect;
    prospect = null; prospectGoal = null;
    if (!u || u.dead || u.carried) return;
    const t = u.order && u.order.type;
    if ((t === "idle" || t === "guard") &&
        U.dist(u.x, u.y, P.homeX, P.homeY) > CFG.TILE * 14)
      u.give({ type: "move", x: P.homeX + CFG.TILE * 3, y: P.homeY + CFG.TILE * 3 });
  }
  function pickProspector() {
    let best = null, bs = -Infinity;
    for (const u of P.units) {
      if (u.dead || u.carried || u.layer !== "ground" || u.flankTo) continue;
      const d = u.def;
      if (PROSPECT_SKIP[d.role] || d.deployTo || d.harvester || d.supply) continue;
      if (!d.weapons || !d.weapons.length) continue;
      const t = u.order && u.order.type;
      if (t !== "idle" && t !== "guard") continue;
      if (attackWave.indexOf(u) >= 0 || raidParty.indexOf(u) >= 0) continue;
      /* fast and cheap: the walk is the job, not the fight */
      const s = (d.speed || 1) + (d.cat === "vehicle" ? 0.5 : 0) - (d.cost || 0) / 4000;
      if (s > bs) { bs = s; best = u; }
    }
    return best;
  }
  function prospectSpot(u) {
    const M = G.map, W = M.W, TL = CFG.TILE;
    const hx = (P.homeX / TL) | 0, hy = (P.homeY / TL) | 0;
    const eh = rival ? intelHome(rival) : null;
    /* The first ring with unexplored ground and the two beyond it, scored by
       the walk plus two tiles a ring: nearest-in-the-innermost-ring zig-zagged
       across the base (a jsc trace walked ~150 tiles, 33 south then 52 north,
       before seeing a node 32 tiles out). */
    let best = null, bs = Infinity, rFirst = 0;
    for (let r = 12; r <= 56 && (!rFirst || r <= rFirst + 8); r += 4) {
      for (let a = 0; a < 24; a++) {
        const an = (a / 24) * U.PI2;
        const tx = (hx + Math.cos(an) * r) | 0, ty = (hy + Math.sin(an) * r) | 0;
        if (tx < 1 || ty < 1 || tx >= M.W - 1 || ty >= M.H - 1) continue;
        if (look[ty * W + tx] !== 0) continue;
        if (!GameMap.passable(M, tx, ty, "ground")) continue;
        const x = (tx + 0.5) * TL, y = (ty + 0.5) * TL;
        const s = U.dist(x, y, u.x, u.y) / TL + (rFirst ? 2 * (r - rFirst) : 0);
        if (s >= bs) continue;
        if ((prospectShy.get(pKey(x, y)) || 0) > G.time) continue;
        if (eh && U.dist(x, y, eh.x, eh.y) < TL * 20) continue;
        if (exposureAt(x, y, 0.3) > 2) continue;
        if (nearFoe(tx, ty, 14)) continue;
        bs = s; best = { x, y };
      }
      if (best && !rFirst) rFirst = r;
    }
    return best;
  }

  /* a new battle is a new map: no node picture, no posts, no walker */
  function oilReset() {
    nodeMem = null; oilMemT = -99; oilSpotT = -1; oilSpotV = null; oilShoveT = -99;
    stepPlan = null; stepNext = 0; stepTries.clear();
    for (const k in oilLog) oilLog[k] = k === "why" ? "" : k === "firstWell" ? -1 : 0;
    prospect = null; prospectGoal = null; prospectGoT = 0; prospectD = 0; prospectT = 0;
    prospectShy.clear();
  }

  /* the census view of all of the above - reads, never refreshes */
  function oilIntel() {
    const N = G.map.oilNodes;
    let seen = 0, free = 0, reach = 0, mine = 0;
    if (nodeMem) for (let i = 0; i < N.length && i < nodeMem.length; i++) {
      const m = nodeMem[i];
      if (!m.seen) continue;
      seen++;
      if (m.mine) mine++;
      else if (!m.taken) {
        free++;
        if (P.inBaseRadius(N[i].x + 0.5, N[i].y + 0.5, CFG.OIL_RADIUS)) reach++;
      }
    }
    const buy = (P.buysFuel && P.buysFuel() ? CFG.FUEL_BUY_RATE : 0) +
                (P.bulkFuelRate ? P.bulkFuelRate() : 0);
    const inn = P.oilIn || {};
    return { wells: P.countBuilding("derrick"), firstWell: oilLog.firstWell,
             placed: oilLog.wells, nodes: N.length, seen, free, reach, mine,
             why: oilLog.why, shoves: oilLog.shoves, rally: oilLog.rally,
             pads: oilLog.pads, refused: oilLog.refused, busy: oilLog.busy, sold: oilLog.sold,
             posts: oilLog.posts, forward: oilLog.forward,
             prospects: oilLog.prospects, prospecting: !!prospect,
             stalls: oilLog.stalls, stranded: oilLog.stranded,
             buyRate: Math.round(buy * 100) / 100,
             bought: Math.round(inn.buy || 0), bulk: Math.round(inn.bulk || 0),
             oil: Math.round(P.oil) };
  }

  /* ======================================================================
     EXPANSION: BUILDING TOWARD THE OIL
     ======================================================================
     (owner) "The ai should expand and occupy the oil for its own development"
     and "we need ai to expand agrresive to stop them limit to a small area".

     A derrick now obeys CFG.BUILD_RADIUS like every other structure, so the
     pipeline-to-anywhere shortcut is gone for the commander AND for the
     player. What is left is what a player actually does: put a cheap structure
     at the edge of what you own, which drags the radius eleven tiles further
     out, and keep going until the field is inside it.

     THE TRIGGER IS THE COMMANDER'S OWN STATE and nothing else - barrels low,
     credits available, and no legal derrick site left in reach. That last
     condition is what stops it wandering off while there is still oil at home.

     WHY READING G.map.oilNodes IS HONEST HERE: it is static map data, not
     another player's state - the same class of thing as knowing where the
     water is or where the hills are. findOilSpot() above has always read it,
     and a commander that could not see the ore on its own map would be blind
     in a way no player is. Nothing in this block reads an enemy unit, an
     enemy building, or an enemy's economy.

     BOUNDED IN THREE WAYS, because an unbounded version chains power plants
     across the map and parks an outpost in somebody's base:
       - it steps toward the NEAREST unclaimed node, so the chain is the
         shortest one that reaches oil;
       - it will not place a stepping stone closer to an enemy structure we
         have SEEN than to our own home, so it expands into open ground rather
         than into a base;
       - it stops the moment a derrick site comes into reach, because at that
         point the cheaper thing to build is the derrick. */
  /* Nodes that have swallowed a chain without ever yielding a derrick. On a
     water theatre the nearest unclaimed node is very often on ANOTHER
     LANDMASS: the chain marches to the shore, cannot cross, and goes on paying
     350 credits a step for ever. MEASURED on baltic at Warlord before this
     guard: TWENTY-THREE silos, ONE derrick, 58,001 credits banked and twenty
     barrels of fuel. A node that has taken four steps and produced nothing is
     one this commander cannot reach by building, whatever the reason, and it
     is written off so the next one gets a turn. */
  const expandDead = new Set();
  let expandFor = null, expandSteps = 0;
  const nodeKey = (n) => n.x + "," + n.y;

  /* Could a derrick stand there at all, radius aside? A node in the sea or
     under a wreck is not worth walking to. */
  function nodeDrillable(n) {
    const def = BUILDINGS.derrick;
    for (let dy = -1; dy <= 0; dy++) for (let dx = -1; dx <= 0; dx++) {
      const tx = n.x + dx, ty = n.y + dy;
      if (tx < 0 || ty < 0 || tx + def.w > G.map.W || ty + def.h > G.map.H) continue;
      let ok = true;
      for (let y = ty; y < ty + def.h && ok; y++)
        for (let x = tx; x < tx + def.w && ok; x++) {
          const t = G.map.terrain[y * G.map.W + x];
          if (!CFG.TERRAIN[t] || !CFG.TERRAIN[t].pass) ok = false;
          if (G.occ[y * G.map.W + x]) ok = false;
        }
      if (ok) return true;
    }
    return false;
  }

  /* ---- a well a rig can serve ----
     A rig is built at home and drives; a yard it unfolds pipes CFG.OIL_RADIUS.
     So a well is an expedition target only if some tile of our home landmass
     lies within OIL_RADIUS - 3 of it (the approach's own stand-off). The
     approach timer below wrote such a field off only after a rig had made
     the trip: in a jsc probe of taiwan P0 bought five rigs (150 barrels,
     15,000 credits) for wells on the far side of the strait, and each one
     stalled on its own south-west shore and unfolded there. Terrain only
     (compOf, the recon module's once-a-battle flood fill), cached per node.
     Cost: at most a 39x39 read per node, once a battle. */
  const pipeLand = new Map();
  let pipeLab = null;
  function nodeServable(n) {
    const lab = compOf("ground");
    if (!lab) return true;
    const home = compAt(lab, P.homeX, P.homeY);
    if (!home) return true;
    if (pipeLab !== lab) { pipeLab = lab; pipeLand.clear(); }
    const k = nodeKey(n) + ":" + home;
    let v = pipeLand.get(k);
    if (v !== undefined) return v;
    v = false;
    const R = CFG.OIL_RADIUS - 3, W = G.map.W, H = G.map.H;
    for (let dy = -R; dy <= R && !v; dy++) for (let dx = -R; dx <= R; dx++) {
      if (dx * dx + dy * dy > R * R) continue;
      const x = n.x + dx, y = n.y + dy;
      if (x < 0 || y < 0 || x >= W || y >= H) continue;
      if (lab[y * W + x] === home) { v = true; break; }
    }
    pipeLand.set(k, v);
    return v;
  }
  function expandNode(peek) {
    const hx = P.homeX / 32, hy = P.homeY / 32;
    let best = null, bd = Infinity;
    const N = G.map.oilNodes, mem = oilMem(peek);
    for (let i = 0; mem && i < N.length; i++) {
      const n = N[i];
      if (expandDead.has(nodeKey(n))) continue;
      /* ---- AND ONLY GROUND WE HAVE LOOKED AT ----
         `n.taken` is set the moment ANY player puts a derrick on a node and
         cleared when it dies, so reading it live is watching a field forty
         tiles away change hands through fog. This used to gate on `look`
         and then read the live flag anyway; it reads what our own sensors
         last saw there now (noteOil), the same rule the haulers obey. */
      if (!nodeKnownFree(i) || !mem[i].open) continue;
      /* Already inside the pipe: that well is the derrick rung's, and a
         3,000-credit rig driven to it is a yard where none was needed. */
      if (P.inBaseRadius(n.x + 0.5, n.y + 0.5, CFG.OIL_RADIUS - 1)) continue;
      /* ...and one a yard on our own ground could pipe to */
      if (!nodeServable(n)) continue;
      const d = U.dist2(n.x, n.y, hx, hy);
      if (d < bd) { bd = d; best = n; }
    }
    return best;
  }
  /* One step is one silo. Four of them is forty-four tiles of reach, which is
     most of a theatre; if the field is still not in hand by then it is not
     coming by this road. */
  function expandNoted(n) {
    const k = nodeKey(n);
    if (expandFor !== k) { expandFor = k; expandSteps = 0; }
    if (++expandSteps > 4) { expandDead.add(k); expandFor = null; expandSteps = 0; }
  }
  /* ---- HOW MANY CONSTRUCTION YARDS THIS COMMANDER WANTS ----
     (owner) "it should learn how to produce more MCV to speed up their
     construction and expand base. it is too vunlerable that only one base and
     stick to a very small area without expansion."
     A rig is not only an expansion, and that is the part the first version of
     this missed. player.js prodSpeed() is `1 + (n - 1) * 0.5` over the count
     of construction yards, so a SECOND yard builds every structure fifty per
     cent faster and a third doubles it - and losing the only one you have ends
     the game on the spot. Expansion, build speed and survival are the same
     3,000-credit purchase.
     So a rig is wanted whenever there is money spare and the commander is
     under its yard target, rather than only when the fuel has run out. The
     target rises with the tier - a Recruit runs one base, a Warlord runs
     three - and with a bank that is filling faster than it empties. */
  function yardWant() {
    const base = 1 + Math.round(1.4 * (D.rebuild || 1));   // 2 at Regular, 5 at Warlord
    /* No ceiling - (owner) "i don't want AI has any cap" - and under the
       victory rule a yard is a production building as well as fifty per cent
       on every build. Banked money buys more of them: one per 9,000 and one
       more once it has idled a minute (macro.idle). yardBlocked still stops
       the purchase when there is nowhere to unfold one, which is what bounds
       a player. Not while the plan reads fuel short (fuelOK): a rig is 30
       barrels, and a jsc probe of korea had P1 put 180 barrels into rigs and
       58 into combat vehicles by t=600 with 30k banked. */
    const rich = (macro.plan && !macro.plan.fuelOK) ? 0
      : Math.floor(P.cash / 9000) + (macro.idle > 60 ? 1 : 0);
    return Math.max(1, base + rich);
  }
  /* Worth putting a rig in the field at all? Two separate reasons, and either
     will do: we are short of fuel and the next field is out of reach, or we
     simply have fewer yards than we want and can afford another. */
  let wantsT = -1, wantsV = false;
  function wantsExpansion() {
    if (wantsT === G.time) return wantsV;
    wantsT = G.time;
    return (wantsV = wantsExpansionNow());
  }
  function wantsExpansionNow() {
    /* a rig in the field is a yard that has been paid for - count it, or the
       commander buys a fourth rig while three are still driving */
    const yards = P.countBuilding("conyard") + rigsHeld();
    /* A commander buying its fuel on the market is starved for this purpose
       whatever its tank reads: a bought barrel costs several times a pumped
       one, and the stock the market keeps (FUEL MARKET) sits above 110 for
       most of a rich battle, which would otherwise call off every oil
       expedition exactly when a well is worth most. */
    const starved = (P.oil <= 110 || marketBuying()) && !findOilSpot(true) && !!expandNode(true);
    /* One yard to two is fifty per cent off every building thereafter - the
       cheapest multiplier in the game and worth stretching for. The third and
       the fourth are a luxury and can wait for a fat bank. */
    const need = yards < 2 ? rigCost() + 200 : rigCost() + 2200;
    /* a yard we have nowhere to put is three thousand credits of statue */
    const room = G.time - yardBlocked > 45;
    /* the third yard and on wait for the fuel to feed them: wantsExpansion()
       also holds rigSaving()'s 32-barrel reserve out of every combat purchase
       for as long as it reads true (the starved oil expedition stays open) */
    const wantMore = yards < yardWant() && P.cash > need && P.tech >= 2 && room &&
                     (yards < 2 || !macro.plan || macro.plan.fuelOK);
    if (!starved && !wantMore) return false;
    return P.cash >= 1400;
  }

  /* Put a second yard at the edge of the base rather than inside it: far
     enough that its build radius covers new ground, close enough to be behind
     the defences. Walks outward from home and unfolds at the first legal spot
     that is not already inside another yard's footprint reach. */
  /* ---- WHERE A SECOND YARD GOES ----
     The first version of this swept a ring seven to sixteen tiles from the
     home marker and took the first legal tile. Measured, it found NOTHING: by
     the time a Warlord commander wants a second yard it has forty-odd
     buildings packed around that marker, every close tile is occupied, and
     everything past eleven is outside the build radius. The rig was bought,
     driven nowhere, and left standing idle thirteen tiles from home for the
     rest of the match.

     So search the RIM instead of the middle - tiles near the edge of what we
     already hold, around the buildings that are themselves farthest out. Two
     things fall out of that: there is free ground there, and a yard on the rim
     pushes eleven tiles of new buildable radius OUTWARD, which is the whole
     point of the exercise. A yard in the courtyard would only add a build
     rate; one on the rim adds somewhere to build. */
  function rimYardSpot(rig) {
    for (const [k, t] of badYard) if (G.time - t > 240) badYard.delete(k);
    const bd = BUILDINGS[rig.def.deployTo];
    const hx = P.homeX / 32, hy = P.homeY / 32;
    /* the outermost buildings we own, which is where the rim is */
    const rim = P.buildings
      /* The rim of the BASE: not the creep barriers (def.line), and not a
         refinery out at a far field - "behind the defences" is near home. A
         yard unfolded at the end of such a chain stood 93 tiles from home in
         a jsc smoke run of fulda. 24 tiles is two build radii. */
      .filter(b => !b.dead && !b.def.obstacle && !b.def.line && b.buildProgress >= 1 &&
                   U.dist2(b.tx, b.ty, hx, hy) <= 24 * 24)
      .map(b => ({ x: b.tx + b.def.w / 2, y: b.ty + b.def.h / 2,
                   d: U.dist2(b.tx, b.ty, hx, hy) }))
      .sort((a, b) => b.d - a.d)
      .slice(0, 6);
    if (!rim.length) rim.push({ x: hx, y: hy, d: 0 });
    /* What we know of the enemy, through the intel layer only: the structures
       we have seen, and where we believe they live. A "second place to rebuild
       from" put ten tiles in front of the defence line toward them is the
       first thing they reach. */
    const foeB = [];
    for (const r of seenB.values()) if (r && !r.gone) foeB.push({ x: r.x / 32, y: r.y / 32 });
    const eh = intelHome(rival);
    const ehx = eh ? eh.x / 32 : 0, ehy = eh ? eh.y / 32 : 0;
    const homeToFoe = eh ? U.dist(hx, hy, ehx, ehy) : 0;
    let best = null, bestD = -Infinity;
    for (const b of rim) {
      for (let r = CFG.BUILD_RADIUS - 1; r >= 4; r -= 3) {
        for (let a = 0; a < 16; a++) {
          const an = a / 16 * U.PI2;
          const cx = Math.round(b.x + Math.cos(an) * r);
          const cy = Math.round(b.y + Math.sin(an) * r);
          /* farther from home is better - that is what "outward" means - but
             never closer to the enemy than home itself is */
          let d = U.dist(cx, cy, hx, hy);
          if (eh && U.dist(cx, cy, ehx, ehy) < homeToFoe - 2) d -= 100;
          if (d <= bestD) continue;
          if (badYard.has(cx + "," + cy)) continue;
          let near = false;
          for (const f of foeB) if (U.dist2(cx, cy, f.x, f.y) < 144) { near = true; break; }
          if (near) continue;
          const tx = cx - ((bd.w / 2) | 0), ty = cy - ((bd.h / 2) | 0);
          rig.carried = true;
          const ok = G.canPlace(P, rig.def.deployTo, tx, ty);
          rig.carried = false;
          if (ok && !padClash(rig.def.deployTo, tx, ty) && keepsLanes(rig.def.deployTo, tx, ty)) {
            best = { cx, cy }; bestD = d;
          }
        }
      }
    }
    return best;
  }
  /* The search above is a few hundred canPlace calls, which is too much to
     repeat every think for a decision that changes slowly. Hold the answer and
     re-test only the one tile, which is cheap; re-search when it goes stale or
     somebody builds on it. */
  function yardSpotFor(rig) {
    const bd = BUILDINGS[rig.def.deployTo];
    /* a "nowhere" answer is cached too, or the search reruns every think */
    if (!yardSpot && G.time - yardSpotT < 6) return null;
    if (yardSpot && G.time - yardSpotT < 6) {
      const tx = yardSpot.cx - ((bd.w / 2) | 0), ty = yardSpot.cy - ((bd.h / 2) | 0);
      rig.carried = true;
      const ok = G.canPlace(P, rig.def.deployTo, tx, ty);
      rig.carried = false;
      if (ok) return yardSpot;
    }
    yardSpot = rimYardSpot(rig);
    yardSpotT = G.time;
    return yardSpot;
  }
  /* Unfold here if here is legal. G.deployRig re-tests canPlace at the rig's
     OWN tile, which is not always the tile it was sent to - a rig that stops
     eight tenths of a tile short rounds to the neighbour and the deploy is
     silently refused, for ever, with the rig sitting on top of the spot it was
     asked to build on. So offer it its own tile and the ring around it. */
  function unfoldNear(rig) {
    const bd = BUILDINGS[rig.def.deployTo];
    /* Never across a free oil pad or a factory door - its own tile included.
       A rig that stops within 1.2 tiles of a pad-free spot is on the
       neighbouring tile, and a 3x3 yard there can overlap a free pad by a
       row: the fault taiwan P0 had (its only node under its own structures). */
    const ox = rig.tx - ((bd.w / 2) | 0), oy = rig.ty - ((bd.h / 2) | 0);
    if (!padClash(rig.def.deployTo, ox, oy) && keepsLanes(rig.def.deployTo, ox, oy) &&
        G.deployRig(rig)) return true;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const cx = rig.tx + dx, cy = rig.ty + dy;
      const tx = cx - ((bd.w / 2) | 0), ty = cy - ((bd.h / 2) | 0);
      rig.carried = true;
      const ok = G.canPlace(P, rig.def.deployTo, tx, ty);
      rig.carried = false;
      if (ok && !padClash(rig.def.deployTo, tx, ty) && keepsLanes(rig.def.deployTo, tx, ty)) {
        moveRig(rig, cx, cy); rig._stepped = true; return false;
      }
    }
    rig._stepped = false;
    return false;
  }
  /* Give a move only if the rig is not already on its way there: give()
     discards the path, so re-issuing the same order every think made the rig
     re-plan every think. */
  function moveRig(rig, cx, cy) {
    const x = cx * 32 + 16, y = cy * 32 + 16, o = rig.order;
    if (o && o.type === "move" && Math.abs(o.x - x) < 2 && Math.abs(o.y - y) < 2) return;
    rig.give({ type: "move", x, y });
  }
  function deployAtHome(rig) {
    const spot = yardSpotFor(rig);
    /* Nowhere at all to put one. Say so rather than leaving the rig idle in a
       field: wantsExpansion() reads this and stops buying rigs it cannot
       unfold, which is what turned three thousand credits into a statue. */
    if (!spot) { yardBlocked = G.time; return false; }
    const at = U.dist(rig.x / 32, rig.y / 32, spot.cx + 0.5, spot.cy + 0.5);
    if (at < 1.2) {
      if (unfoldNear(rig)) { yardSpot = null; yardSpotT = -99; rig._homeGoal = null; return true; }
      /* standing on it, refused, and nothing legal alongside - pick again */
      if (!rig._stepped) { badYard.set(spot.cx + "," + spot.cy, G.time); yardSpot = null; yardSpotT = -99; }
      return false;
    }
    /* Progress timer, as the node path has: a rim tile across water or behind
       a wall of our own buildings is never reached, and without this the rig
       drove at it for the rest of the match. Thirty seconds without closing
       two tiles writes the tile off and the next search skips it. */
    const k = spot.cx + "," + spot.cy;
    if (rig._homeGoal !== k) { rig._homeGoal = k; rig._homeT = G.time; rig._homeD = at; }
    else if (G.time - rig._homeT > 30) {
      if (at > rig._homeD - 2) {
        badYard.set(k, G.time); yardSpot = null; yardSpotT = -99; rig._homeGoal = null;
        return false;
      }
      rig._homeT = G.time; rig._homeD = at;
    }
    moveRig(rig, spot.cx, spot.cy);
    return false;
  }


  /* ---- the rig: buy one, drive it out, unfold it ----
     Three states and no more: none in hand, one moving, one in place. It runs
     off the commander's own holdings and the static map, exactly like
     findOilSpot() above, and reads nothing of anybody else's. */
  function runExpansion() {
    /* nobody knows where the next well is: go and look (oilProspect) */
    oilProspect();
    let rigsAll = P.units.filter(u => !u.dead && u.def.deployTo);
    /* ---- no yard left: unfold where it stands ----
       Under the victory rule an undeployed rig keeps a beaten side alive only
       for CFG.RIG_GRACE, so a rig in hand with no yard standing does not
       drive to an oil node or round the rim - it unfolds on the spot when the
       spot is legal (a yard obeys no build radius), and only otherwise goes
       looking for ground. */
    if (!P.countBuilding("conyard") && rigsAll.length) {
      for (const r of rigsAll) {
        if (unfoldNear(r)) { macro.relief++; continue; }
        if (!r._stepped) deployAtHome(r);
      }
      return;
    }
    /* A rig that has stopped going anywhere unfolds where it is (rigStrand);
       while it does, nothing below may give it another order. The home rigs
       are watched too: on fulda two of them stood boxed in beside the yard
       for two minutes. */
    if (rigsAll.length) {
      rigStrand(rigsAll);
      rigsAll = rigsAll.filter(u => !u.dead && !u._wdGo);
    }
    /* ---- the second yard unfolds at home ----
       A rig bought while one yard stands and the tank is not dry (the same 110
       barrels wantsExpansionNow() calls starved) is the build rate and the
       second production site, not an oil expedition: in a jsc smoke run of
       fulda at Standard funds both rigs bought at t=240 drove 80-93 tiles west
       and the second yard stood at t=440, while the one yard put up 34
       structures in 480 s. Decided once per rig; handed back to the node logic
       below if there is no ground for it at home. */
    let homeRig = false;
    for (const r of rigsAll) {
      if (r._homeYard === undefined)
        r._homeYard = P.countBuilding("conyard") === 1 && P.oil > 110;
      if (!r._homeYard) continue;
      deployAtHome(r);
      if (G.time - yardBlocked < 1) r._homeYard = false;
      else homeRig = true;
    }
    /* a rig bound for a field is still driven while a home rig unfolds -
       left without orders it stood where it was built, and rigStrand
       unfolded it there 45 s later */
    if (homeRig) {
      rigsAll = rigsAll.filter(r => !r._homeYard);
      if (!rigsAll.length) return;
    }
    const node0 = expandNode();
    /* ---- A SECOND RIG WHILE THE FIRST IS STILL DRIVING ----
       The purchase below runs only when no rig is in hand, so a Warlord that
       wants four yards got them one forty-second build and one drive at a
       time - measured on taiwan, one yard all match with 37,500 banked. A
       bank that covers two rigs and a margin buys the second now; rigsHeld()
       counts the queue, so it is never a third. Not while the mining fleet is
       short (haulersOK): a rig at the head of the vehicle queue starves it. */
    if (rigsAll.length === 1 && rigsHeld() < 2 && P.cash >= 2 * rigCost() + 1500 &&
        P.oil >= rigOilNeed() + 10 && haulersOK() && wantsExpansion()) tryBuildUnit("mcv");
    /* Nowhere worth driving to, but three thousand credits are already standing
       in the field. A yard at home is still fifty per cent on every build and
       still a second place to rebuild from if the first one falls, so it goes
       down - just not on top of the yard we already have, or it adds no radius
       and shares the same shell. */
    /* A rig that has been paid for is always driven - wantsExpansion() counts
       it as a yard, so gating the drive on it closed the gate on the rig that
       had just been bought the moment the bank dipped. Only the purchase asks
       whether a yard is wanted. */
    if (!node0) { for (const r of rigsAll) deployAtHome(r); if (rigsAll.length) return; }
    /* Only the lead rig drives to the node; any others behind it are yards for
       the base itself and unfold on the rim. Without this a second rig bought
       while the first is still driving stands idle for the rest of the match -
       which is exactly what the telemetry caught: one rig, order "idle",
       thirteen tiles from home, tries=0, for five hundred seconds. */
    else for (let i = 1; i < rigsAll.length; i++) deployAtHome(rigsAll[i]);
    const rigs = rigsAll;
    if (!rigs.length) {
      if (!wantsExpansion()) return;
      /* none in hand: buy one, once. It is 3,000 credits and 30 barrels, so
         it is only worth it when the field it unlocks is worth more - which
         is what wantsExpansion() has already established. */
      /* The rig is oil:30 and lockReason refuses it below thirty barrels, so
         in the 0-29 band the vehicle that ends the fuel shortage is locked out
         BY the fuel shortage. buysFuel() tops a commander up to sixty on cash
         alone, so the answer is to wait for that rather than to ask every
         think and be refused - and the build order above is no longer switched
         off while we wait, which is what made the deadlock bite. */
      if (P.oil < rigOilNeed()) return;
      /* Not `queueLen("vehicle") < 2`. A Warlord commander with five factories
         never has a vehicle queue that short, so the rig was never enqueued at
         all - measured, a commander with 3,847 credits and 584 barrels reading
         wants=true saving=true and still building nothing. The queue is FIFO
         and the rig's turn comes; what actually needs bounding is how many
         rigs are in flight, and that is two. Three at once is nine thousand
         credits of vehicles that cannot shoot. */
      if (rigsHeld() < 2 && P.cash >= rigCost() + 100 && haulersOK()) tryBuildUnit("mcv");
      return;
    }
    /* From here a node is guaranteed: a rig in hand with nowhere to take it
       was unfolded at home on the first line of this function. What changed is
       the ORDER - `if (!node) return;` used to sit above the purchase, so a
       commander that wanted a second yard for the build speed alone, with no
       well anywhere it could see, fell out before it ever asked for a rig.
       Wanting the yard is reason enough; a field is a bonus. */
    const node = node0;
    const rig = rigs[0];
    /* Deploy where the node comes inside a fresh conyard's radius, standing
       off a little so the yard does not straddle the well itself. */
    /* ---- UNFOLD WHERE IT CAN ACTUALLY DRILL ----
       Deploying wherever the rig happened to stop put a forward yard 15 tiles
       from the field it was sent to take - measured, a yard at (94,133) with
       its nearest free node fifteen tiles off, which is four tiles outside
       CFG.BUILD_RADIUS and therefore worth nothing. The rig arrives in the
       AREA and then looks for the spot: a tile where the yard can legally
       stand AND from which the node falls inside the new radius, with a tile
       of margin so a rounding error does not cost the whole trip. */
    /* Not into somebody else's base. seenB records carry x/y in world PIXELS -
       the previous version of this test compared them against TILES, so it
       could only fire within fourteen pixels of the map origin and was dead
       everywhere else. Tiles on both sides now. */
    for (const r of seenB.values()) {
      if (!r || r.gone) continue;
      if (U.dist(node.x, node.y, r.x / 32, r.y / 32) < 12) {
        expandDead.add(nodeKey(node));
        return;
      }
    }
    /* ---- CLOSE ENOUGH TO DRILL, NOT CLOSE ENOUGH TO TOUCH ----
       A derrick needs a structure within CFG.OIL_RADIUS (22), not
       CFG.BUILD_RADIUS (11). This used to walk the rig to thirteen tiles and
       then insist on a yard within ten of the well, and on a water theatre
       the last ten tiles are very often a channel: measured on taiwan, P0's
       rig stood at (94,122), nine tiles short of the well at (94,131), for
       six hundred seconds. A yard within BUILD_RADIUS+1 is still the first
       choice - its own radius then covers the well and the post that
       guards it - but once the rig stalls (thirty seconds short of its spot,
       twenty searches with nothing legal, or the approach timer below) any
       legal ground within OIL_RADIUS-3 of the well will do. */
    const nk = nodeKey(node);
    const near = rig._rigNear === nk;
    const reachD = near ? CFG.OIL_RADIUS - 3 : CFG.BUILD_RADIUS + 1;
    const want = reachD + 2;                       // "close enough to look"
    const d = U.dist(rig.x / 32, rig.y / 32, node.x, node.y);
    if (d <= want) {
      const spot = rigSpotFor(rig, node, reachD, near ? 4 : 6);
      if (spot) {
        /* centre to centre: measuring to the tile CORNER meant a rig parked
           in the middle of the right tile, arriving from the south or east,
           read 0.9 away and was sent to the same tile again for ever */
        const at = U.dist(rig.x / 32, rig.y / 32, spot.cx + 0.5, spot.cy + 0.5);
        if (at < 1.2) {
          if (unfoldNear(rig)) { expandNoted(node); oilLog.forward++; return; }
          /* refused on the spot and nothing alongside: search again */
          if (!rig._stepped) rig._spot = null;
        } else {
          const sk = spot.cx + "," + spot.cy;
          if (rig._spotK !== sk) { rig._spotK = sk; rig._spotT = G.time; }
          else if (G.time - rig._spotT > 30) {
            rig._spotK = null; rig._spot = null;
            if (!near) rig._rigNear = nk;
            else rig._rigTries = (rig._rigTries || 0) + 5;
          }
          moveRig(rig, spot.cx, spot.cy);
          return;
        }
      }
      rig._rigTries = (rig._rigTries || 0) + 1;
      if (rig._rigTries > 20) {
        rig._rigTries = 0;
        if (!near) rig._rigNear = nk;
        else { expandNoted(node); expandDead.add(nk); rig._rigNear = null; }
      }
      return;
    }
    /* still out: drive it, and do not re-issue the same order every think */
    const tx = node.x * 32, ty = node.y * 32;
    const o = rig.order;
    if (!o || o.type !== "move" || U.dist(o.x, o.y, tx, ty) > CFG.TILE * 3)
      rig.give({ type: "move", x: tx, y: ty });
    /* ---- AND IT HAS TO BE GETTING CLOSER ----
       On a water theatre the nearest unclaimed node is very often on another
       landmass. The rig drives to the shore, cannot cross, and sits there for
       the rest of the match with three thousand credits inside it - measured,
       exactly that: mcv:1 alive at t=1500, one conyard, one derrick. So the
       approach is timed. Forty-five seconds without closing three tiles means
       this field cannot be reached by driving, whatever the reason, and it is
       written off so the next one gets a turn. */
    const k = nodeKey(node);
    if (rig._rigGoal !== k) { rig._rigGoal = k; rig._rigT = G.time; rig._rigD = d; }
    else if (G.time - rig._rigT > 45) {
      if (d > rig._rigD - 3) {
        /* not closing - but a yard that can pipe to it need not reach it */
        if (d <= CFG.OIL_RADIUS - 1 && rig._rigNear !== k) rig._rigNear = k;
        else { expandNoted(node); expandDead.add(k); }
      }
      rig._rigT = G.time; rig._rigD = d;
    }
  }

  function placeReady() {
    for (const kind of ["building", "defense"]) {
      const rq = q(kind);
      if (!rq.ready.length) continue;
      const id = rq.ready[0].id;
      let spot = null;
      if (id === "navalyard") spot = findShoreSpot();
      else if (id === "derrick") {
        spot = findOilSpot();
        /* legal but for our own pieces: clear them - haulers too, now that
           the well is built - and put it down on a later think */
        if (spot && spot.crowded) { shoveOff(spot.node, spot.lifted, true); spot = null; }
      }
      /* a creep barrier goes on the line to the plan's ore field */
      else if (id === "wall" && macro.creepTo) spot = creepSpot();
      /* the guard post oilOutpost() put on the line to a well */
      else if (BUILDINGS[id].cat === "defense" && stepReady(id)) spot = stepSpot(id);
      else if (BUILDINGS[id].cat === "defense") {
        /* Defences face the enemy - from the production building (or
           refinery) with the least cover nearest the trouble (defAnchor), not
           always from the first yard: under the victory rule a war factory on
           the far side of the base is a life. A superweapon and a barrier
           stay by the yard. */
        const dd = BUILDINGS[id];
        const guard = dd.weapons && dd.weapons.length && !dd.superweapon ? defAnchor() : null;
        const anchor = guard || P.buildings.find(b => !b.dead && b.def.id === "conyard");
        spot = anchor ? findSpotToward(id, anchor) : findSpot(id, null);
        if (spot && guard) macro.guarded++;
      } else spot = macroSpot(id) ||
                    findSpot(id, P.buildings.find(b => !b.dead && b.def.id === "conyard"));
      if (spot) {
        G.placeBuilding(P, id, spot.tx, spot.ty, false);
        if (id === "derrick") oilPlaced(spot);
        constructionStart(P, id, spot);
        P.consumeReady(kind, id); rq.failN = 0;
      } else {
        /* refund anything that can't find ground after a few tries — never jam the queue */
        rq.failN = (rq.failN || 0) + 1;
        /* a well whose pad is only crowded by our own pieces, or whose silo was
           just sold, is being cleared (shoveOff, sellOffPad): give it twelve
           thinks before the refund and the seventy-second cool-down. A creep
           barrier with no ground is refunded at once, like a naval yard. */
        const oilWait = G.time - oilShoveT < 8 ? 12 : 1;
        if (rq.failN >= (id === "navalyard" || id === "wall" ? 1 : id === "derrick" ? oilWait : 4)) {
          P.refund(P.factionCost(BUILDINGS[id])); P.consumeReady(kind, id); rq.failN = 0;
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
        if (G.canPlace(P, defId, tx, ty) && siteOK(defId, tx, ty)) return { tx, ty };
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
    const now = G.time, stamp = Math.max(1, Math.min(65535, (now / 4) | 0));
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
    /* ---- electronic support measures ----
       A radar that is transmitting announces its own position. You do not need
       to see the dish, or get an echo back off it: you only have to hear it,
       and two receivers on different bearings fix it. That is the entire basis
       of suppression of enemy air defences, and this file already said so at
       noteSighting - "an emitting radar announces itself, that is what
       electronic support measures are for" - while providing no way to do it.

       The measured consequence: a Wild Weasel launches only when pickEmitter
       hands it a target, pickEmitter can only offer what has been SEEN, and
       over a 25-minute battle between two Elite commanders that happened ONCE.
       367 of 368 launch decisions ended with the aircraft on the ramp. An
       anti-radiation squadron that never flies is a 1,900-credit ornament.

       Honest on both counts the owner cares about. It reads ONLY entities that
       G.emitting() says are actually radiating, so a set switched off is
       silent and safe - which is the real counter-play, and one the engine
       already models. And it is not free: the listener must itself carry a
       radar or be a dedicated collector, exactly as in life.

       Range is 1.9x the emitter's own reach because detection is one-way. A
       radar must pay for the round trip out and back off the target, so a
       passive receiver hears it from far outside the range at which that radar
       could ever see YOU - which is why the shooter gets to stand off. */
    (function esmSweep() {
      const listeners = [];
      for (const u of P.units) {
        if (u.dead || u.carried) continue;
        if (u.def.radar || u.def.radarQ || u.def.role === "ewair" ||
            u.def.role === "sead" || u.def.awacs) listeners.push(u);
      }
      for (const b of P.buildings) {
        if (b.dead || b.buildProgress < 1) continue;
        if (b.def.radar) listeners.push(b);
      }
      if (!listeners.length) return;
      for (const o of G.players) {
        if (o === P || G.allied(P, o) || o.defeated) continue;
        const heed = (e, isBld) => {
          if (e.dead || e.carried) return;
          if (isBld && e.buildProgress < 1) return;
          const def = e.def;
          if (!def || !(def.radar || def.jam)) return;
          if (!G.emitting || !G.emitting(e)) return;     // silent set, silent plot
          const loud = (def.radar || def.jam) * 1.9;
          for (const l of listeners) {
            if (U.dist(l.x, l.y, e.x, e.y) / CFG.TILE <= loud) { noteSighting(e, now); return; }
          }
        };
        for (const u of o.units) heed(u, false);
        for (const b of o.buildings) heed(b, true);
      }
    })();
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
                      plate: (e.def.armorMM && e.def.armorMM.front) || 0,
                      /* its published air-defence reach, as the plate is */
                      aa: G.airDefenceReach ? G.airDefenceReach(e.def) : 0, t: now });
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
      /* A hauler under fire runs for the refinery instead of standing there -
         as a RETURN, the hauler's own way to a dock. This was a move to
         rf.x/rf.y, the refinery's centre, inside the footprint: stepAlong()
         never reports arriving within 0.8 tiles of it and updateHarvester()
         leaves a move only on arrival, so every hauler ever shot at stood
         beside its refinery for the rest of the battle. Measured in a jsc
         smoke run of fulda at t=300: all four of one seat's haulers parked
         1-2 tiles off the refinery holding 700 each, 2,100 credits mined in
         five minutes. A return delivers what it carries and goes back to
         work by itself. */
      if (e.def.harvester && !e.dead && e.order.type !== "return" &&
          G.nearestBuilding(P, "refinery", e.x, e.y))
        e.give({ type: "return" });
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
      /* ---- how long a sighting is worth keeping ----
         This used to delete every ground contact at tau * 2.5 = 65 seconds
         flat, which quietly defeated the `memory` difficulty trait entirely:
         DIFF gives recruit 30s and warlord 600s, and every commander from
         regular upward actually remembered 65. A Warlord kept NINE TIMES less
         than its own row claimed.

         The consequence was the thing the owner kept reporting - an AI that
         never answers what it is fighting. foeArms() weighs sightings up to
         D.memory old and hands the result to counterMix(), but the records
         were already deleted, so the armour share read 0.00 in EVERY sample of
         a 61-sample live-battle measurement while the infantry share reached
         1.00. The commander genuinely saw the tanks, forgot them a minute
         later, and rebuilt its counter from an empty plot.

         This is memory of what it actually saw - not new information, and not
         a cheat. A human player who watched a tank company roll past five
         minutes ago also still knows it is out there.

         Air keeps the short window on purpose: an aeroplane has left by the
         time the track is a minute old, so an old air contact is worse than
         no contact. tau * 2.5 stays as the FLOOR so a Recruit is not made
         worse than it is today. */
      const tau = r.layer === "air" ? 9 : (r.harvester ? 60 : 26);
      const keep = Math.max(tau * 2.5,
                            (D.memory || 90) * (r.layer === "air" ? 0.25 : 1));
      if (now - r.t > keep) seenU.delete(id);
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

  /* ---- how much fighting weight is standing on a piece of ground ----
     The threat field cannot answer this. exposureAt() is stamped from seenB
     through gunProfile(), a BUILDING lookup, so every price this commander has
     put on an objective is a price for concrete; foeArms() reads the enemy's
     vehicles properly and its only consumer is the build queue. A wave could
     walk into twice its own weight of armour parked in the open and nothing
     here would notice, because the field had no pillbox in it.

     Same currency on both sides, and neither side is a peek. Ours is our own
     units, scaled by the bar we can read exactly. Theirs is seenU: the LAST
     SEEN position and the class written down at contact - never r.ref, never
     trackedEntity(). Not scaled by health, because a contact seen a minute ago
     may have been mended since; the error points toward caution.

     The window is 90 seconds, not D.memory. forgetStale never drops a record
     because the unit DIED - it cannot know - so at Commander and Warlord a
     600-second window sums ten minutes of vehicles around the enemy base, many
     of them wrecks by now. foeArms() survives that because it consumes shares;
     this consumes a magnitude. Nor is it 45, one approach march: the launch
     this reading most needs to inform is the one after a broken wave, and that
     launch first waits out the withdrawal (up to 60 s), so a 45-second memory
     would have forgotten the body that broke the last wave by the time the
     next one is weighed. At 90 it still counts for something at the relaunch
     and has faded out by the end of the two deferrals.

     NO_FIGHT is one roster applied to both sides. groundArmy() already drops
     the scout, SAM, launcher, clearer and truck from ours; air-defence hulls,
     MANPADS and support vehicles go from both here, because what is being asked
     is what happens to a tank company that walks into it.

     FORCE_W is doctrine, not intelligence - four numbers keyed on ROLE_ARM:
     a main battle tank 1.00, an IFV or light tank about half of one, a gun
     0.45 (below a tank on purpose: at four tiles an SPG is not what it is at
     twenty), a squad 0.30. */
  const FORCE_W = { armour: 1.00, light: 0.55, arty: 0.45, inf: 0.30 };
  const NO_FIGHT = { recon: 1, sam: 1, spaag: 1, aa: 1, tel: 1, supply: 1, repair: 1,
                     mineclear: 1, minelayer: 1, radarv: 1, ewveh: 1, mcv: 1,
                     engineer: 1, medic: 1 };
  function forceW(role, armor, cat) {
    const k = armor === "heavy" ? "armour"
            : ROLE_ARM[role] || (cat === "infantry" ? "inf" : "light");
    return FORCE_W[k] || 0.40;
  }
  function foeNear(x, y, R) {
    const now = G.time, mem = Math.min(90, Math.max(14, D.memory || 90)), R2 = R * R;
    let v = 0;
    for (const r of seenU.values()) {
      if (r.harvester || !r.armed || r.layer !== "ground" || NO_FIGHT[r.role]) continue;
      const age = now - r.t;
      if (age > mem || U.dist2(r.x, r.y, x, y) > R2) continue;
      v += forceW(r.role, r.armor, r.cat) * (1 - age / mem);
    }
    return v;
  }
  function ourForce(list) {
    let v = 0;
    for (const u of list) {
      if (!u || u.dead || NO_FIGHT[u.def.role]) continue;
      v += forceW(u.def.role, u.armor, u.cat) * (u.hp / Math.max(1, u.maxHp));
    }
    return v;
  }
  function engBook() {
    return { held: 0, staged: 0, massBody: 0, massClock: 0, spread: [], waits: 0,
             kept: 0, defers: 0, withdrawals: 0, withdrawn: 0, pad: 0,
             dropped: 0, handed: 0 };
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

  /* ---- what is on the water ----
     foeArms() above throws every hull away on the line `if (r.layer !==
     "ground") continue`, with the comment "hulls are the navy's problem". The
     navy never got a problem of its own: the fleet block in think() rolled
     G.rng() against six fixed thresholds and not one term in that expression
     came from the picture, which is the identical defect the ground queues
     were fixed for. This is the reading the sea side never had.

     Measured before this existed, on baltic at Commander with both seats on
     Blue Water doctrine: the fleet came out as 8 patrol boats and 20
     corvettes, with no destroyer, no submarine, no missile boat and no
     cruiser bought in twenty-five minutes - and 22,500 credits still in the
     bank at the end. The patrol boat is a 500-credit hull carrying an hmg: 13
     damage at 5.4 tiles, no sonar, no air weapon, no missile. So that was a
     28-hull fleet with no anti-air, no anti-submarine and no anti-ship
     capability in it at all.

     Same discipline as foeArms and nothing looser: seenU, seenB and the
     dossier. `role` is what a recognition manual gives you the moment a hull
     is in view, and digest() has written it down at contact since the picture
     was written, so calling a contact a missile boat is not a peek at
     anybody's object list. */
  function foeSea() {
    const now = G.time;
    if (seaCache && now - seaT < 1.9) return seaCache;
    const mem = Math.max(14, D.memory || 90);
    const s = { surf: 0, sub: 0, missile: 0, capital: 0, air: 0, coast: 0, seen: 0,
                sSub: 0, sMissile: 0, sCapital: 0, t: now };
    for (const r of seenU.values()) {
      const age = now - r.t;
      if (age > mem) continue;
      const w = 1 - age / mem;          // a sighting is worth less the older it is
      /* An aircraft is a naval contact too, and the most dangerous one: a
         hull's only answer to it is the area SAM the destroyer and the cruiser
         carry, and the corvette's gun. It is counted here as well as in
         foeArms because the two readings answer different questions - that one
         asks what the wave will meet, this one asks what the fleet will meet. */
      if (r.layer === "air") { s.air += w; continue; }
      if (r.layer !== "sea" && r.layer !== "sub") continue;
      if (r.harvester || !r.armed) continue;     // a landing craft is an objective
      if (r.layer === "sub") { s.sub += w; continue; }
      s.surf += w;
      if (r.role === "missileboat") s.missile += w;
      else if (r.role === "destroyer" || r.role === "cruiser" ||
               r.role === "carrier") s.capital += w;
    }
    /* The submerged boat is the one contact a sighting cannot be relied on to
       produce, because it is under water and our sonar may never have held it.
       A torpedo in one of our own hulls is the other way it reaches the plot,
       and digest() has recorded that as dossier.sawSub since the picture was
       written. The anti-submarine helicopter block already buys on exactly
       this flag; the fleet reads the same flag rather than inventing a second
       rule for the same fact, and it stays fog-honest for the same reason. */
    const dR = dossier[rival ? rival.idx : -1];
    if (dR && dR.sawSub) s.sub = Math.max(s.sub, 1);
    /* A coastal battery is a reason to bring reach rather than hulls: it is
       13.5 tiles and it is on the plot by key like every other structure. */
    for (const r of seenB.values()) if (!r.gone && r.key === "coastal") s.coast += 1;
    s.seen = s.surf + s.sub;
    const n = Math.max(1, s.seen), ns = Math.max(1, s.surf);
    s.sSub     = U.clamp(s.sub / n, 0, 1);
    s.sMissile = U.clamp(s.missile / ns, 0, 1);
    s.sCapital = U.clamp(s.capital / ns, 0, 1);
    seaCache = s; seaT = now;
    return s;
  }

  /* ---- what to put to sea against what we can see ----
     counterMix() answers a GROUND picture and cannot answer this one: armour,
     infantry, artillery and a gun line are not what a fleet meets. The sea
     asks four different questions, and every one of them has a different hull
     as its answer. Read off the tables, at the present day, for NATO:

       - a SUBMARINE is answered by sonar and a homing torpedo. The destroyer
         has asw_mk54 at 215 damage and sonar 9.5, the cruiser the same; our
         own boat carries torp_mk48 at 380. The corvette has sonar 6 and NO
         anti-submarine weapon at all, and the patrol boat has neither. Against
         a boat, three quarters of the old dice bought hulls that cannot shoot
         back at it.
       - an AIRCRAFT is answered by the area SAM. sam_sm2 is 185 damage at 14.5
         tiles and only the destroyer, the cruiser and the carrier carry one;
         the corvette brings navgun_76 at 8 tiles and a Phalanx at 3.2. The
         missile boat and the patrol boat carry nothing that can engage an
         aircraft whatever.
       - a MISSILE BOAT is answered by point defence and by getting there
         first: ssm_harpoon reaches 14 tiles, which outranges every gun afloat,
         so the exchange is decided before a gun bears. ciws_phalanx is the
         only thing that shoots a missile down, and the corvette, destroyer and
         cruiser carry it.
       - a CAPITAL SHIP - destroyer, cruiser, carrier - is answered by the
         anti-ship missile and the torpedo rather than by another gun: 2,100
         to 2,900 hit points do not fall to navgun_mk45 at 125 a round in any
         reasonable time, and torp_mk48 arrives at 380.

     The floor underneath the counter terms is deliberately NOT the old dice
     mixture. That mixture could not be built at all for the first ten minutes
     of a battle: the destroyer, the submarine and the missile boat each need a
     Radar Dome and the cruiser needs a Research Lab, while the naval yard goes
     up well before either on a split map. Measured on baltic, the losing seat
     spent 599 naval think ticks being refused "REQUIRES RADAR DOME" or
     "REQUIRES RESEARCH LAB" and bought not one ship in twenty-five minutes
     while owning a yard - because the cascade picks ONE branch per tick and a
     refused branch simply wastes the tick. buildToward() is what fixes that:
     a role it cannot field this era is cooled for twenty seconds and the
     shortfall redistributes to the next one, so the queue never stalls on a
     prereq it does not have yet.

     `grip` is D.read, exactly as on the ground side: a Recruit reads less and
     acts on none of it, and puts the standing mixture to sea. */
  function navalMix(s) {
    /* The standing mixture. The corvette is the general-purpose hull and the
       only real warship a navy can field before it owns a Radar Dome, so it
       carries the early fleet on its own. */
    const mix = { corvette: 0.40, patrol: P.tech >= 2 ? 0.06 : 0.28 };
    if (P.tech >= 2) { mix.destroyer = 0.26; mix.sub = 0.16; mix.missileboat = 0.12; }
    if (P.tech >= 3) mix.cruiser = 0.10;
    /* A SECOND submarine line, and only for the navy that actually ran two.
       unitFor() answers null for every faction with no `ssn` row, so this adds
       nothing whatever to anyone else's mixture - it does not even cost them a
       refused think tick, because the key is never written at all. The Soviet
       and Russian fleet is the one that kept a large diesel force and a
       nuclear attack force side by side, and here the two do different jobs:
       the Kilo is the cheap quiet ambusher and the nuclear boat is the one
       fast enough to chase. Part of the standing mixture rather than a counter
       term, so a Recruit puts them to sea as well. */
    if (P.tech >= 2 && unitFor(P.faction, "ssn", P.era)) mix.ssn = 0.10;
    const grip = D.read === undefined ? 1 : D.read;
    if (grip <= 0) return mix;                 // a Recruit sails the standing mixture

    const air = U.clamp(s.air / 3, 0, 1);
    const add = (k, v) => { mix[k] = (mix[k] || 0) + v; };

    if (s.sSub > 0.10) {
      /* Sonar and a torpedo, and nothing else in the roster has both. */
      if (P.tech >= 2) add("destroyer", 0.30 * s.sSub * grip);
      if (P.tech >= 2) add("sub", 0.18 * s.sSub * grip);
      if (P.tech >= 3) add("cruiser", 0.10 * s.sSub * grip);
      /* and stop buying hulls that cannot engage it: the patrol boat has no
         sonar at all and the missile boat's ssm cannot be fired at a boat */
      mix.patrol *= 1 - 0.80 * s.sSub * grip;
      if (mix.missileboat) mix.missileboat *= 1 - 0.50 * s.sSub * grip;
    }

    if (air > 0) {
      /* The area SAM rides on the destroyer and the cruiser, and on nothing
         else afloat. The corvette's gun is the cheap second answer. */
      if (P.tech >= 2) add("destroyer", 0.26 * air * grip);
      if (P.tech >= 3) add("cruiser", 0.12 * air * grip);
      add("corvette", 0.12 * air * grip);
      mix.patrol *= 1 - 0.70 * air * grip;
      if (mix.missileboat) mix.missileboat *= 1 - 0.40 * air * grip;
    }

    if (s.sMissile > 0.20) {
      /* Their missile outranges our guns, so the answer is point defence and
         our own missile - not more gun hulls. */
      add("corvette", 0.14 * s.sMissile * grip);
      if (P.tech >= 2) add("missileboat", 0.16 * s.sMissile * grip);
      if (P.tech >= 2) add("destroyer", 0.10 * s.sMissile * grip);
      mix.patrol *= 1 - 0.80 * s.sMissile * grip;
    }

    if (s.sCapital > 0.20) {
      /* Two thousand-odd hit points behind a gun duel is a bad trade; the
         missile and the torpedo are the answer. */
      if (P.tech >= 2) add("missileboat", 0.20 * s.sCapital * grip);
      if (P.tech >= 2) add("sub", 0.20 * s.sCapital * grip);
      if (P.tech >= 3) add("cruiser", 0.10 * s.sCapital * grip);
      mix.patrol *= 1 - 0.80 * s.sCapital * grip;
    }

    /* A coastal battery reaches 13.5 tiles and a naval gun reaches 11.5, so a
       gun line on the beach is taken apart from outside its envelope or not at
       all: the submarine's land-attack round reaches 19. */
    if (s.coast > 0 && P.tech >= 3) add("sub", 0.14 * U.clamp(s.coast / 3, 0, 1) * grip);

    /* The same guard the ground mixture carries, for the same reason: a fleet
       of nothing but missile boats has no sonar, no SAM and 900 hit points a
       hull, and loses to anything that closes with it. A third of the fleet
       stays general-purpose however many counter terms have stacked. */
    let tot = 0;
    for (const k in mix) tot += mix[k];
    const genKeys = P.tech >= 2 ? ["corvette", "destroyer"] : ["corvette", "patrol"];
    let base = 0;
    for (const k of genKeys) base += mix[k] || 0;
    if (tot > 0 && base < tot * 0.35) {
      const share = (tot * 0.35 - base) / genKeys.length;
      for (const k of genKeys) if (mix[k] !== undefined) mix[k] += share;
    }
    return mix;
  }

  /* ---- the unit of account for a fleet cap ----
     What one hull OF THE MIXTURE WE INTEND costs. The cap below used to count
     hulls, and a hull is not a unit of fighting power: a patrol boat is 500
     credits of machine gun and a cruiser is 3,400 credits of gun, area SAM and
     homing torpedo. Pricing the cap against the mixture keeps the numbers 6
     and 9 meaning exactly what they were written to mean - six warships, nine
     warships - while making it impossible to satisfy them with a crowd of
     gunboats, which is what the count let happen.

     A role this navy cannot field is left out of the average rather than
     priced at zero or at somebody else's price, so the yardstick is always the
     cost of a hull this particular navy would really build. Germany owns no
     cruiser and no carrier in any era, so neither appears in Germany's
     yardstick and neither is ever bought - the same answer the build path
     gives, arrived at the same way. */
  function hullYardstick(mix) {
    let sum = 0, w = 0;
    for (const role in mix) {
      if (!(mix[role] > 0)) continue;
      const id = unitFor(P.faction, role, P.era);
      /* The same test buildToward() makes, and it has to be the same one. A
         yardstick that prices a destroyer we are not allowed to build yet
         makes every corvette look cheap against it, and the cap then admits
         far more gunboats than it was ever meant to: measured on baltic, a
         yardstick that priced the intended mixture rather than the buildable
         one let the fleet run to 41 corvettes and 6 patrol boats - 31,500
         credits of gunboats - and the naval bill then delayed the very Radar
         Dome that would have unlocked the destroyer. Pricing what the yard can
         cut TODAY keeps the cap honest, and the yardstick rises of its own
         accord the moment the dome goes up, which re-opens the cap and lets
         the real warships in. */
      if (!id || !UNITS[id] || P.lockReason(UNITS[id])) continue;
      sum += mix[role] * P.factionCost(UNITS[id]); w += mix[role];
    }
    return w > 0 ? sum / w : 900;
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
  /* ======================================================================
     THE SECOND HALF: LEARNING WHICH FORCE ACTUALLY WORKS
     ======================================================================
     "can ai have some pre-trained knowledge to how mix the weapon more
      efficiently but don't let AI to use the pre-trained knowledge entirely.
      we should let AI to pick up their own strategy by itself with some
      flexibility in a reasonable way"

     doctrine() above is the first half and it is fixed: a training manual
     derived from CFG.DMG that never changes during a battle. This is the
     second half. It picks one of three FORCE POSTURES before each push, scores
     the push on what actually happened, and moves toward whatever has been
     paying. The prior says what a competent army of this nation and decade
     looks like; this says what is working against THIS opponent, on THIS map,
     today - and the two multiply.

     TWO DESIGNS WERE BUILT BEFORE THIS ONE AND BOTH WERE REJECTED. Both died
     the same way, so the reasons are worth stating where the code is:

       ATTEMPT 1: the reward was uncentred and the clamp bounded the VALUE, so
         measured over twenty waves every arm converged to the same number. A
         bandit that cannot separate its arms is a random choice wearing a
         bandit's clothes.
       ATTEMPT 2: rebuilt against that, and worse. Its update applied the SAME
         reward to EVERY arm, so an arm's estimate was a differently-smoothed
         copy of ONE reward stream rather than an estimate of that arm at all.
         And its baseline was a running mean over THE PUSHES THE POLICY TOOK -
         which, once the policy commits, becomes the incumbent's own mean, so
         the advantage collapses to noise and the incumbent decays to zero. Its
         own two arguments contradicted each other: the non-degeneracy proof
         needed the arms to keep being mixed, the exploitation proof showed
         they stop being mixed.

     WHY THIS ONE CANNOT DEGENERATE, which is the whole point:

       q[a] is the SAMPLE MEAN of the rewards from the pushes where arm a was
       ACTUALLY CHOSEN. Nothing else touches it. Two arms with different true
       means therefore converge to different numbers, by the law of large
       numbers and nothing cleverer.

       THERE IS NO BASELINE AND NOTHING IS CENTRED, and that is deliberate
       rather than an omission. Centring existed in both failed designs to
       remove `c` - the part of a battle's outcome that belongs to the era's
       price level, the opponent's skill, the map - and it is exactly the term
       that broke them. It does not need removing. c is common to all three
       arms within a match, so every q[a] converges to mu(a) + c, and argmax
       over a is unchanged by adding the same constant to every candidate. The
       hardest part of both previous designs was unnecessary.

       Every arm stays reachable. The UCB bonus is +Infinity at n=0 and decays
       as sqrt(ln N / n), so an arm that has not been tried is always tried,
       and an arm that has been tried and is losing is revisited at a rate that
       falls but never reaches zero. Attempt 1 shipped an arm no state could
       select; this cannot have one.

     WHAT IT IS ALLOWED TO KNOW - the owner's rule is "ai should have the same
     fog like us. don't assume and make ai know everything", so every input is
     something this commander could not fail to know:
       killValue  what OUR OWN units destroyed. We shot it; we saw it die.
                  Structures included, so razing a base scores.
       lossValue  our own dead, priced. Ours unconditionally.
       committed  what we put into the wave, from our own unit costs.
     No enemy composition, no enemy economy, no enemy production, nothing
     behind fog. The reward is an exchange ratio on our own ledger.

     It reads NO entity references, only numbers, so none of the liveness
     invariants in this file apply to it and it cannot hold a stale ref. */
  const ARMS = ["armour", "gunline", "swarm"];
  /* Each arm is a multiplier over the roles counterMix has already priced.
     Deliberately mild - 1.35 at the top - because this is a lean on a mixture
     the prior and the picture have already chosen, not a replacement for it.
     A posture that overrode them would throw away the adaptation that test
     [29] protects. */
  const ARM_BIAS = {
    armour:  { veh: { mbt: 1.35, heavy: 1.30, lighttank: 1.10 },
               inf: { rifle: 0.90, at: 0.95 } },
    gunline: { veh: { spg: 1.35, mlrs: 1.35, spaag: 1.10 },
               inf: { mortar: 1.25, rifle: 0.90 } },
    swarm:   { veh: { ifv: 1.20, lighttank: 1.25, mbt: 0.85 },
               inf: { rifle: 1.30, at: 1.20, mg: 1.20 } },
  };
  const LEARN = { q: {}, n: {}, N: 0, arm: null, open: null, opens: 0, settles: 0, tries: 0 };
  for (const a of ARMS) { LEARN.q[a] = 0; LEARN.n[a] = 0; }

  /* UCB1. C is the exploration weight: 0.7 of a reward unit, and a reward here
     is an exchange ratio, so a arm one whole exchange-ratio point behind is
     still revisited for a good while. */
  function chooseArm() {
    let best = null, bv = -Infinity;
    for (const a of ARMS) {
      const n = LEARN.n[a];
      const v = n === 0 ? Infinity
              : LEARN.q[a] + 0.7 * Math.sqrt(Math.log(Math.max(2, LEARN.N)) / n);
      if (v > bv) { bv = v; best = a; }
    }
    return best;
  }

  /* WHY THIS IS SCORED ON A CLOCK AND NOT ON A WAVE. This is the third
     distinct reason the feature has failed, and the only one that was found by
     MEASURING rather than by arguing.

     The obvious unit of account is the push: choose a posture, send the wave,
     score what it traded. Both earlier designs did that, and so did this one -
     until it was run. MEASURED, brains on both seats, fulda e80 at Commander
     with abundant ore: the match was DECIDED AT t=577 and the commander had
     scored exactly ONE push. A per-push learner needs at least one pull of
     each of three arms before it can compare anything at all; it never gets
     them. The estimator was never the binding constraint. The SAMPLE RATE
     was, and neither of the two adversarial reviews that killed the earlier
     designs ever looked at it.

     So the interval is the unit of account. That is also the more honest match
     to what a posture actually changes: it biases PURCHASING, which is
     continuous, not a discrete act performed once per wave.

     A QUIET INTERVAL IS NOT SCORED. If nothing died either way, the interval
     teaches nothing - and folding a stream of zeroes into every arm would drag
     all three estimates toward zero together, which is degeneracy by a third
     road after an uncentred reward and a shared baseline. Only intervals in
     which something was destroyed are folded in.

     THE REWARD IS SCALE-FREE: an exchange ratio against the value of our own
     standing army. Without that, an arm pulled late in a rich match would
     score better than one pulled early for no reason but the clock. */
  const LEARN_INT = 40;                     // seconds of game time per sample

  function learnTick() {
    const grip = D.read === undefined ? 1 : D.read;
    if (grip < 0.5) return;                 // a Recruit analyses nothing, so learns nothing
    const o = LEARN.open;
    if (!o) { learnStart(); return; }
    if (G.time - o.t < LEARN_INT) return;
    LEARN.tries++;
    const killed = (P.stats.killValue || 0) - o.k;
    const lost   = (P.stats.lossValue || 0) - o.l;
    if (killed > 0 || lost > 0) {
      const r = (killed - lost) / o.scale;
      const a = o.arm;
      if (a) {
        LEARN.n[a] += 1; LEARN.N += 1;
        LEARN.q[a] += (r - LEARN.q[a]) / LEARN.n[a];   // the mean of THIS arm alone
        LEARN.settles++;
      }
    }
    learnStart();
  }
  /* The open record carries the arm that was shaping purchases DURING the
     interval it covers, and only then does the next posture take over - score
     the posture that bought the army, not the one that happens to be current
     when the interval closes. `scale` is our own standing army, priced, which
     is ours to know unconditionally. */
  function learnStart() {
    let v = 0;
    for (const u of P.units) if (!u.dead && u.def && u.def.cat !== "building")
      v += u.def.cost || 200;
    LEARN.opens++;
    LEARN.open = { k: P.stats.killValue || 0, l: P.stats.lossValue || 0,
                   t: G.time, scale: Math.max(1200, v), arm: LEARN.arm };
    LEARN.arm = chooseArm();
  }

  /* How hard the posture leans, as a function of how much has been learned.
     At N=0 it is 0 and counterMix is exactly what it was before this existed;
     it reaches full weight after eight SCORED intervals. This is the "don't let
     AI use the pre-trained knowledge entirely" half made literal: early the
     manual decides, late the experience does, and the handover is gradual.
     Gated on D.read so a Recruit, which analyses nothing, also learns nothing
     and builds the standing mixture - the same gate counterMix already uses. */
  function armWeight() {
    const grip = D.read === undefined ? 1 : D.read;
    if (grip < 0.5 || !LEARN.arm) return 0;
    return Math.min(1, LEARN.N / 8) * grip;
  }
  /* Applied as coefficient x weight, so at weight 0 every multiplier is 1.00
     and nothing moves. Monotonic in each role's own weight, which is what
     keeps behaviour test [29] true: every term in counterMix is
     coefficient x observed_share x grip, and multiplying a role by a constant
     within a push cannot reverse the response to a changing share. */
  function applyArm(inf, veh) {
    const w = armWeight();
    if (w <= 0) return;
    const b = ARM_BIAS[LEARN.arm];
    if (!b) return;
    const lean = (tbl, m) => {
      if (!m) return;
      for (const k in m) if (tbl[k] !== undefined) tbl[k] *= 1 + (m[k] - 1) * w;
    };
    lean(inf, b.inf); lean(veh, b.veh);
  }

  function counterMix(a) {
    const inf = { rifle: 0.42, at: 0.20, mg: 0.14, aa: 0.12, mortar: 0.12 };
    const veh = { ifv: 0.16, lighttank: 0.12 };
    if (P.tech >= 2) { veh.mbt = 0.26; veh.spaag = 0.13; veh.spg = 0.11; }
    if (P.tech >= 3) { veh.heavy = 0.13; veh.mlrs = 0.12; }
    const grip = D.read === undefined ? 1 : D.read;
    if (grip <= 0) return { inf, veh };          // a Recruit builds the standing mixture
    /* The training manual for THIS army in THIS decade - see doctrine() above.
       It MODULATES the hand-chosen coefficients below rather than replacing
       them, for three reasons. Every term here is coefficient x observed share
       x grip, so a constant factor preserves the response to the picture
       exactly - the adaptation gets SHARPER for an unusual army, never weaker.
       The constants know things the manual structurally cannot see:
       suppression, reach against a prepared position, an active protection
       system against a missile, a thin hull dying inside a defended base. And
       an army that bought purely by value per credit would buy nothing but
       infantry missiles and lose to a rifle company. The manual knows the
       ammunition; these numbers know the war. */
    const dm = doctrine(P.faction, P.era || CUR_ERA);
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
      add(inf, "at", 0.34 * armour * grip * (0.6 + 0.4 * heat) * dm.heavy.at);
      /* The same warhead on a chassis that can keep up with the wave, and at
         9.6 tiles it outranges every tank gun in the game and the anti-tank
         emplacement with it - but it is a LIGHT hull, so it is bought against
         armour in the open rather than against a prepared position, where the
         exchange is with 750 hit points behind structure armour and a thin
         skin loses it. Discounted against the tech-3 heavy: combat.js rolls
         its aps 0.40-0.45 against every incoming missile and does nothing
         whatever to a long rod. */
      add(veh, "tankdestroyer", 0.30 * armour * grip * (1 - 0.45 * aps) *
                                (0.5 + 0.5 * heat) * dm.heavy.tankdestroyer);
      /* and back toward the gun exactly where the gun is the better answer */
      if (P.tech >= 2) add(veh, "mbt", (0.16 * armour * grip * (1 - heat) +
                                        0.10 * armour * grip * aps) * dm.heavy.mbt);
      if (P.tech >= 3) add(veh, "heavy", 0.14 * armour * grip * dm.heavy.heavy);
      /* And fewer of these. The light tank's 76mm makes 624 mm against a 705
         plate - ratio 0.885, PARTIAL PENETRATION, so a 60-damage gun arrives
         as about 36 against eighteen hundred hit points, standing in the open
         to do it. The IFV is less wrong than it looks WHERE IT CARRIES A
         MISSILE, and since generations.js stopped handing a TOW-2 to all 47
         of them that is 23 of 47: a Bradley or a BMP-2 duplicates the tank
         destroyer on a hull also carrying a rifle section, while a Warrior, a
         VBCI or anything at all in the 1950s brings only an autocannon to the
         exchange. Either way the credits belong on the dedicated carrier
         against a tank corps, so the discount stands - and is if anything too
         gentle for the armies with no missile at all. The old dice put a
         fifth of the vehicle queue into the pair of them unconditionally. */
      /* mod 1.00 is exactly the old 0.35 and 0.70. A Bradley at 1.35 (30.1 per
         thousand credits against heavy, where the Abrams makes 22.7, and it
         carries a rifle section) is cut 0.23; a Warrior at 0.55, whose only
         weapon is a 25 mm autocannon making 12 mm against an 82 mm glacis, is
         cut 0.51. The 1965 BMP-1 and the 2020 Bradley were both being cut 0.35
         by the same line, and so was the FV432 with a GPMG. */
      veh.ifv       *= 1 - 0.35 * armour * grip * U.clamp(2 - dm.heavy.ifv, 0.2, 1.45);
      /* The light tank keeps the FLAT 0.70 discount it has always had, and the
         doctrine manual is deliberately NOT consulted for it.

         Two reviewers measured the modulated version and it ran backwards:
         NATO e20 reads dm.heavy.lighttank 1.69 - which says "unusually good
         against armour" - while a Stryker MGS is worth 11.0 per thousand
         credits against a heavy plate, 0.17 of what NATO's best answer to a
         tank is worth. The share normalisation is the reason. Where a role is
         one of only two or three the army can field against a class, its
         SHARE of that army's answer is large even when its absolute value is
         derisory, and the light tank is exactly that case in every roster.
         Wired in, it nearly doubled the KPA's light-tank buy - 0.040 to
         0.079 - against a tank corps, which is the opposite of the trade the
         line exists to prevent.

         The hand constant knows the thing the table cannot see: a 76mm gun
         standing in the open against composite armour is a bad trade whatever
         share of the roster it represents. */
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
      add(inf, "mg", 0.22 * foot * grip * dm.infantry.mg);
      /* frag is 1.15 against infantry where bullet is 1.00, and it arrives
         over one and a half to two and a half tiles with suppression attached */
      add(inf, "mortar", 0.14 * foot * grip * dm.infantry.mortar);
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
      /* dm.air is a hard 0, not a share, where the mount cannot damage an
         aircraft at all: Starstreak declares warhead "cannon" - three tungsten
         darts, which is right - and CFG.DMG.cannon.air is 0.00, so both British
         SHORAD vehicles are worth nothing against aeroplanes. That belongs in
         the weapon table; until it is fixed, not buying them is correct. */
      add(inf, "aa", 0.16 * air * grip * dm.air.aa);
      add(veh, "spaag", 0.18 * air * grip * dm.air.spaag);
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
      add(veh, "lighttank", 0.10 * light * grip * dm.light.lighttank);
      add(inf, "at", 0.08 * light * grip * dm.light.at);
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
    /* the learned posture, last, so it leans on a mixture the manual and the
       picture have already agreed on - and before the guards, so a floor still
       cannot be leaned away */
    applyArm(inf, veh);
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
    let fuelSeen = false;
    for (let i = 0; i < gaps.length && i < 4; i++) {
      const id = unitFor(P.faction, gaps[i].role, P.era);
      const why = id && UNITS[id] ? P.lockReason(UNITS[id]) : "NONE";
      if (why) {
        /* the best role this service can build but for fuel is waited for,
           not cooled - see fuelHold() */
        if (!fuelSeen && why.indexOf("INSUFFICIENT FUEL") === 0) {
          fuelSeen = true;
          if (fuelHold(gaps[i].role, UNITS[id])) return false;
        }
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
    if (atPeace) return;
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
      if ((ot === "rtb" || ot === "tank") && !u.ordnanceDry()) cut++;
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

    /* ---- ground: the supply truck ----
       Not on a split theatre. The army at home stands inside inBaseRadius and
       is in supply already, and the only force that is ever out - a landing -
       is across water no truck can drive over: logisticsStation() would order
       it at the wave every think, and a route that does not exist is a failed
       whole-landmass Path.find each time. Measured on taiwan: five trucks,
       thirty barrels, and the army never left its island. */
    if (queueLen("vehicle") < 3 && groundConnected) {
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

    /* ---- the supply truck, with the wave and not in it ----
       Only where the wave can be driven to: on a split theatre the wave is a
       landing on the far shore (see buying reach, above). */
    if (attackWave.length && groundConnected) {
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
    /* a landed wave across water is out of a workshop's reach: it waits at
       the shed rather than failing a route to the far shore every think */
    if (w > 0 && groundConnected) {
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
                                    b.cat === "defense" && !b.def.line).length;
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

  /* ================= MACRO: the mine, the industry and the bank =================
     (owner) "ai should scout and expand quickly and develop quickly", "i don't
     want AI has any cap", "more aggresive to expand its economy and production
     units".

     MEASURED (census, Warlord, e20 NATO v PACT, both seats AI, $20,000 purse):
       - fulda, korea, kuwait: every seat still on ONE barracks and ONE war
         factory at t=450, and the bank under 1,000 credits in all eighteen
         land samples. The second factory sat behind `P.cash > 3000` and a
         dozen rungs above it, and a commander that spends every credit as it
         arrives never holds 3,000 - the rung was unreachable by construction.
         The only other source of industry was the `saturated` branch, which
         wanted the bank at 90% of its ceiling for 45 s.
       - korea P1 and kuwait P0 NEVER BUILT A FACTORY and were destroyed at
         t=462 and t=492. A hauler is a vehicle and is cut in the war factory,
         so with no factory the second hauler never came; `starving` (one
         hauler, under 2,200 banked) then shut the whole build order, the
         factory included. A deadlock with a 1,500-credit way out that the
         ladder never took.
       - haulers were bought only with an EMPTY vehicle queue. While the army is
         under strength buildToward keeps one or two vehicles queued, so on a
         land theatre that queue is never empty: fulda P0 ran two haulers and
         kuwait P0 ONE for the whole battle. On taiwan, where the army froze at
         full strength and the queue emptied, the same code bought eight.
       - silos were bought on `P.oil < 140`. A silo stores CREDITS (storage
         3000), not barrels, and the reserve is under 140 from the first
         purchase on: korea P0 had four silos at t=300 with 939 credits banked.
       - taiwan: 37,500 credits at t=1050 is exactly the vault (4,000 + five
         refineries + seven silos). Both seats sat at the ceiling with 6-33
         barrels, no derrick and fuel at 0.18 a second, and the only spend-down
         (`saturated`) built barracks for an army that could not cross.

     So the build order is a PLAN rather than a ladder of bank balances:
       INCOME is measured - credits actually landed, averaged over 45 s - and
         the industry is sized to it: at Warlord one more war factory for every
         38 cr/s past the first 40, barracks at a slower rate. From the e20
         NATO/PACT tables a factory at full speed drains ~70 cr/s and ~0.9 bbl/s,
         a barracks ~42 cr/s and no fuel, an airbase ~80 cr/s and ~1.6 bbl/s.
       A BUDGET, not the bank, pays for growth. The building queue has first
         call on every credit that arrives (updateQueues walks the queues in
         declaration order), so a bank-balance gate either never opens or,
         once open, lets the works queue starve the army. Growth draws on a
         bucket filled at 55% of income (40% below Veteran); the rest is the
         army's. The opening rungs do not draw on it.
       IDLE MONEY is the spend-down trigger: a bank above max(2,500, 35% of the
         vault) that would take more than 90 s to run down at the rate it is
         falling. While it idles the budget is bypassed and every target grows
         with the time it has idled: industry, yards (yardWant), guns at the
         production buildings, refineries (a refinery is a vault, a hauler and
         a fuel dock), and a larger army to buy.
       FUEL bounds the industry that burns it: past the second factory, and past
         the first airbase and naval yard, another line needs 0.35 bbl/s of
         fuel income per line, or 45 barrels in hand per line.
       THE MINE: a refinery ships with a hauler and costs 1,500 against a
         hauler's 1,100, and is sited AT a seen ore field rather than wherever a
         random spiral round the yard lands - init() records the nearest ore at
         19-26 tiles from an AI start, so a yard-side refinery doubles every
         trip. Three haulers a refinery from Commander up, two below, and no
         flat fleet cap; haulers standing idle with no ore stop both.
       HAULERS that are shot at RETURN (digest) instead of being moved onto the
         refinery's centre pixel, which they never reached: in a jsc smoke run
         of fulda all four of one seat's haulers stood beside the refinery with
         700 aboard at t=300. unstickHaulers() catches any other move that a
         hauler cannot finish, and spreadHaulers() moves haulers off a crowded
         field onto one beside another of our refineries. (Engine, every
         player: updateHarvester() now writes off an ore tile it has no route
         to, instead of parking beside it and re-flooding A* every tick.)
       CREEP: a field beyond building reach is brought into it by a chain of
         40-credit Concrete Barriers (macroPlan, creepSpot), then gets its
         refinery like any other.
       SPREAD (victory rule: no production building, no army): production is
         placed at the yard holding the least of it and not in front of home;
         guns go to the production building with the least cover.

     Cost: econTick and macroPlan are O(units + buildings) per think. The ore
     survey is one pass over the ore layer every 20 s (20,736 reads on a 144
     map); the field table is fields x (our structures + seen structures) every
     6 s; the shore and drill-site answers are cached 30 s and 4 s; the siting
     searches run once per placement, at most ~100 canPlace calls.          */
  let macro = macroBook();
  function macroBook() {
    return { inc: 0, t: -1, mined: 0, cash: 0, slope: 0, idle: 0, budget: 0,
             plan: null, fields: null, fieldsT: -1e9, anyOre: false,
             ftab: null, ftabT: -1e9, shore: null, shoreT: -1e9,
             oilSp: null, oilT: -1e9, creepTo: null, creepDead: new Map(),
             last: "", n: {}, sited: 0, crept: 0, creepN: 0, spread: 0, guarded: 0,
             headed: 0, restarted: 0, starved: 0, relief: 0, yards: 0, unstuck: 0,
             spreadT: 0, spreadN: 0, doorT: 0, unsealed: 0, sealed: 0, nominated: 0,
             mkt: mktBook() };
  }
  /* the fuel market's own book (FUEL MARKET below), reset with the plan */
  function mktBook() {
    return { next: 0, rate: 0, rateT: -1, fresh: 0, bought: 0, spent: 0, orders: 0,
             refused: 0, priced: 0, unit: 0, pMax: 0, eta: 30, why: "", note: "",
             lastBuy: -1e9, bar: 0, target: 0, burn: 0, reserve: 0, can: false,
             infN: 0, infMax: -1 };
  }
  /* (isProdDef / isProd - what the victory rule counts - are defined once,
     beside the war aim, off Player.isProduction) */
  /* A creep reaches for fields within this many tiles of home. Without it a
     chain hopped field to field across the map - barriers 90 tiles west of
     home by t=400 in a jsc smoke run of fulda - with a refinery at each end
     that nothing could defend. Sixty tiles is most of a 144 theatre's half. */
  const CREEP_HOME = 60;
  /* an ore block's own 8-tile cell: stable while its centroid drifts */
  function fieldKey(f) { return ((f.x / 8) | 0) + "," + ((f.y / 8) | 0); }

  function econTick() {
    const m = macro, now = G.time;
    /* What the haulers LANDED, not what the vault credited: stats.mined
       counts only the part under the ceiling, and a Heavy purse sits above a
       4,000 vault for the first minutes - a probe read mined 0 at t=120 with
       haulers working, and the plan sized industry to 5 cr/s. stats.hauled
       (entities.js, a statistic only) is the delivery itself. */
    const mined = (P.stats && P.stats.hauled) || 0;
    if (m.t < 0 || now < m.t) {
      m.t = now; m.mined = mined; m.cash = P.cash; m.inc = CFG.BASE_INCOME || 0;
      /* a Heavy purse is growth money from the first minute; a Light one is
         spent on the opening alone */
      m.budget = 500 + Math.max(0, P.cash - 5000) * 0.35;
      return;
    }
    const dt = now - m.t;
    if (dt < 0.25) return;
    const got = Math.max(0, mined - m.mined) / dt + (CFG.BASE_INCOME || 0);
    m.inc += (got - m.inc) * Math.min(1, dt / 45);
    m.slope += ((P.cash - m.cash) / dt - m.slope) * Math.min(1, dt / 20);
    const floor = Math.max(2500, P.storageCap() * 0.35);
    const runway = m.slope < -1 ? P.cash / -m.slope : 1e9;
    if (P.cash > floor && runway > 90) m.idle += dt;
    else m.idle = Math.max(0, m.idle - dt * 2);
    /* never more growth owed than the bank plus 2,500: a purse spent on the
       army must not leave a claim on the next ten thousand of income - but
       never less than a rig and a margin either, or the second yard (3,000)
       could never be paid from the budget by a commander that spends as it
       earns (probe: budget 1,199-2,830 with cash 0-1,122 from t=200 to 400,
       and no rig bought) */
    const share = (D.econ || 1) >= 1 ? 0.55 : 0.4;
    m.budget = Math.min(9000, Math.max(rigCost() + 500, P.cash + 2500), m.budget + dt * m.inc * share);
    m.t = now; m.mined = mined; m.cash = P.cash;
  }

  /* ---- the ore this commander has seen ----
     8x8-tile blocks of ore on ground in the look grid - the same rule the
     haulers obey. anyOre is the prospecting question ("is there ANY seen,
     unbuilt ore at all") and replaces a per-think walk of the whole layer. */
  function oreFields(maxAge) {
    const m = macro;
    if (m.fields && G.time - m.fieldsT < (maxAge || 20)) return m.fields;
    const M = G.map, W = M.W, H = M.H, B = 8;
    const bw = Math.ceil(W / B), bh = Math.ceil(H / B), nb = bw * bh;
    const amt = new Float32Array(nb), sx = new Float32Array(nb), sy = new Float32Array(nb);
    let any = false;
    for (let y = 0; y < H; y++) {
      const row = y * W, by = ((y / B) | 0) * bw;
      for (let x = 0; x < W; x++) {
        const i = row + x, o = M.ore[i];
        if (o < 20 || !look[i]) continue;
        if (!G.occ[i]) any = true;
        const k = by + ((x / B) | 0);
        amt[k] += o; sx[k] += x * o; sy[k] += y * o;
      }
    }
    const out = [];
    for (let k = 0; k < nb; k++)
      if (amt[k] >= 600) out.push({ x: sx[k] / amt[k] + 0.5, y: sy[k] / amt[k] + 0.5, amt: amt[k] });
    m.fields = out; m.fieldsT = G.time; m.anyOre = any;
    return out;
  }
  /* Which field wants a refinery: not already served by one of ours, not
     within 14 tiles of a HOSTILE structure we have SEEN (seenB, never the
     enemy's lists), and either inside building reach now (inReach) or up to
     44 tiles beyond it, within CREEP_HOME of home and on our own side of the
     believed front (outReach, the creep target). A field that a creep or a
     refinery could not get to is left alone for 150 s (creepDead). */
  function fieldTable() {
    const m = macro;
    if (m.ftab && G.time - m.ftabT < 6) return m.ftab;
    for (const [k, t] of m.creepDead) if (t < G.time) m.creepDead.delete(k);
    const fields = oreFields();
    /* "our side" only on evidence: with no enemy structure seen, intelHome()
       is an unexamined start position, and a guess must not wall a commander
       off from its only field (fulda smoke run: 30-tile hauls to t=540 and no
       creep, because the nearest hypothesis lay beyond the field) */
    const eh = rival && intelB(r => r.own === rival.idx && !r.gone).length ? intelHome(rival) : null;
    const ehx = eh ? eh.x / CFG.TILE : 0, ehy = eh ? eh.y / CFG.TILE : 0;
    const hx = P.homeX / CFG.TILE, hy = P.homeY / CFG.TILE;
    const refs = [], own = [], foe = [];
    for (const b of P.buildings) {
      if (b.dead || b.def.obstacle) continue;
      const cx = b.tx + b.def.w / 2, cy = b.ty + b.def.h / 2;
      own.push(cx, cy);
      if (b.def.id === "refinery") refs.push(cx, cy);
    }
    /* hostile structures only: seenB also remembers the civilian blocks
       (owner -1), and one town block beside a field vetoed both of a
       commander's fields in a fulda smoke run */
    for (const r of seenB.values()) {
      if (!r || r.gone) continue;
      const o = G.players[r.own];
      if (!o || o === P || G.allied(P, o)) continue;
      foe.push(r.x / CFG.TILE, r.y / CFG.TILE);
    }
    let inReach = null, outReach = null, served = 0, bi = Infinity, bo = Infinity;
    for (const f of fields) {
      let sv = false;
      for (let i = 0; i < refs.length && !sv; i += 2)
        if (U.dist2(refs[i], refs[i + 1], f.x, f.y) < 81) sv = true;
      if (sv) { served++; continue; }
      if (m.creepDead.has(fieldKey(f))) continue;
      let hot = false;
      for (let i = 0; i < foe.length && !hot; i += 2)
        if (U.dist2(foe[i], foe[i + 1], f.x, f.y) < 196) hot = true;
      if (hot) continue;
      let d2 = Infinity;
      for (let i = 0; i < own.length; i += 2) {
        const dd = U.dist2(own[i], own[i + 1], f.x, f.y);
        if (dd < d2) d2 = dd;
      }
      const d = Math.sqrt(d2), s = d - Math.min(4, f.amt / 5000);
      if (d <= CFG.BUILD_RADIUS + 4) { if (s < bi) { bi = s; inReach = f; } }
      else if (d <= CFG.BUILD_RADIUS + 44 && s < bo &&
               U.dist2(f.x, f.y, hx, hy) <= CREEP_HOME * CREEP_HOME &&
               !(eh && U.dist2(f.x, f.y, ehx, ehy) < U.dist2(f.x, f.y, hx, hy))) {
        bo = s; outReach = f;
      }
    }
    m.ftab = { inReach, outReach, served, n: fields.length };
    m.ftabT = G.time;
    return m.ftab;
  }
  function shoreOK() {
    const m = macro;
    if (G.time - m.shoreT > 30) { m.shore = findShoreSpot(); m.shoreT = G.time; }
    return !!m.shore;
  }
  function oilSpotOK() {
    const m = macro;
    if (G.time - m.oilT > 4) { m.oilSp = findOilSpot(); m.oilT = G.time; }
    return !!m.oilSp;
  }
  /* Power AHEAD of demand. powerRatio() counts finished buildings only, so a
     lab and an airbase finishing together browned the base out, and a brownout
     is production at as little as 35%. Plants and loads already standing,
     rising, queued or waiting for ground all count, plus the next draw. */
  function powerAhead(extra) {
    let out = 0, use = extra || 0;
    for (const b of P.buildings) {
      if (b.dead) continue;
      const p = b.def.power || 0;
      if (p > 0) out += p; else use -= p;
    }
    for (const kind of ["building", "defense"]) {
      const qq = q(kind);
      for (const list of [qq.items, qq.ready])
        for (const it of (list || [])) {
          const p = (it.def && it.def.power) || 0;
          if (p > 0) out += p; else use -= p;
        }
    }
    return use <= 0 ? 9 : out / use;
  }
  /* A hauler is cut in the war factory like a tank and the queue is FIFO.
     This moves the order just placed in front of everything that has not
     started. updateQueues pays only the head, so the player's way to the same
     queue - cancel the unstarted orders (a refund of the nothing they have
     paid) and order them again - costs exactly what this does. */
  /* In front of the head too, when the head is not a hauler and has had less
     than half its price: a probe caught `mcv:552|harvester:0` from t=360 to
     t=420 with the bank at 0 - the rig at items[0] was paid only from what the
     building queue left, and the hauler behind it never started. That is
     done exactly as the player does it: the head is cancelled - what it had
     paid comes back (Player.refund) and its progress is lost - and ordered
     again behind the new one. Keeping `paid` on a displaced item would be a
     production hold the player does not have. Only items[0] is ever paid, so
     everything behind it is unstarted. */
  function headOfLine(kind) {
    const qq = q(kind), it = qq.items;
    if (it.length < 2) return false;
    const mine = it.pop();
    const h = it[0];
    const at = h && !h.def.harvester && h.paid < P.factionCost(h.def) * 0.5 ? 0 : 1;
    if (at === 0 && h.paid > 0) {
      P.refund(h.paid);
      h.paid = 0; qq.prog = 0;
      macro.restarted++;
    }
    it.splice(at, 0, mine);
    macro.headed++;
    return true;
  }

  /* ---- a hauler holding a move it cannot finish earns nothing ----
     updateHarvester() leaves a move order only when stepAlong() reports
     arriving within 0.8 tiles of the point, and a point inside a footprint
     or behind a wall never arrives. Ten seconds without closing a tile and a
     half, and the hauler goes back to its own work: a return if it carries
     anything, the field if not. O(units) per think. */
  function unstickHaulers() {
    const now = G.time;
    for (const u of P.units) {
      if (u.dead || !u.def.harvester) continue;
      const o = u.order;
      if (!o || o.type !== "move") { u._mvK = null; continue; }
      const k = Math.round(o.x) + "," + Math.round(o.y);
      const d = U.dist(u.x, u.y, o.x, o.y);
      if (u._mvK !== k) { u._mvK = k; u._mvT = now; u._mvD = d; continue; }
      if (now - u._mvT < 10) continue;
      if (d < u._mvD - CFG.TILE * 1.5) { u._mvT = now; u._mvD = d; continue; }
      u._mvK = null;
      u._spreadNo = now + 120;          // and spreadHaulers leaves it alone
      u.give({ type: u.load > 40 ? "return" : "harvest" });
      macro.unstuck++;
    }
  }

  /* ---- haulers go where the ore is, not where the other haulers are ----
     nearestOre() is asked from the hauler's own position, so a fleet stays on
     the field it found first: in a jsc smoke run of fulda six of one seat's
     seven haulers worked a 10,000-credit field by its first refinery while a
     53,000-credit field lay beside its third, and income sat at 34-73 cr/s
     (part of that was the walled-in ore tile fixed in updateHarvester). Every
     8 s, count the haulers working each field that has a refinery of ours
     beside it, give each field one hauler per 5,000 credits it holds (two to
     seven), and send one lightly loaded hauler from the most over-subscribed
     field to the one with the most room. Cost: fields x refineries plus
     haulers x served fields, every 8 s. */
  function spreadHaulers() {
    const m = macro;
    if (G.time < m.spreadT) return;
    m.spreadT = G.time + 8;
    const fields = oreFields();
    if (fields.length < 2) return;
    const refs = [];
    for (const b of P.buildings)
      if (!b.dead && b.def.id === "refinery" && b.buildProgress >= 1) refs.push(b);
    if (refs.length < 2) return;
    const sv = [];
    for (const f of fields) {
      for (const r of refs) {
        if (U.dist2(r.tx + 1.5, r.ty + 1, f.x, f.y) >= 100) continue;
        sv.push({ f, n: 0, cap: U.clamp(Math.round(f.amt / 5000), 2, 7), who: [] });
        break;
      }
    }
    if (sv.length < 2) return;
    for (const u of P.units) {
      if (u.dead || !u.def.harvester || u.order.type !== "harvest") continue;
      const px = u.oreT ? u.oreT.x : u.tx, py = u.oreT ? u.oreT.y : u.ty;
      let best = null, bd = 64;
      for (const x of sv) {
        const d = U.dist2(px, py, x.f.x, x.f.y);
        if (d < bd) { bd = d; best = x; }
      }
      if (best) { best.n++; best.who.push(u); }
    }
    let hi = null, lo = null;
    for (const x of sv) {
      if (x.n > x.cap && (!hi || x.n - x.cap > hi.n - hi.cap)) hi = x;
      if (x.n < x.cap && (!lo || x.cap - x.n > lo.cap - lo.n)) lo = x;
    }
    if (!hi || !lo) return;
    /* never the same hauler twice in a minute, and never one whose last
       move could not be finished - a hauler boxed in by buildings was being
       sent and reverted forty times in five minutes */
    let pick = null;
    for (const u of hi.who) {
      if (u._spreadNo > G.time) continue;
      if (!pick || u.load < pick.load) pick = u;
    }
    if (!pick || pick.load > 350) return;     // a nearly full hauler finishes its run
    pick._spreadNo = G.time + 60;
    pick.oreT = null;                          // or it walks back to the old field's tile
    pick.give({ type: "move", x: lo.f.x * CFG.TILE, y: lo.f.y * CFG.TILE });
    m.spreadN++;
  }

  /* ================= THE FUEL MARKET: idle money into barrels =================
     (owner) "i don't want AI has any cap and make it harder", and the army,
     the fleet and the air force "mixed wisely".

     MEASURED (jsc census, both seats AI, Warlord, $20,000 purse, ore 1.6):
     the side that wins banks 16,000-26,000 credits on 25-90 barrels. Fulda P0
     at t=600 held 22,395 credits and 53 barrels on ~610 cr/s of income and
     2.19 bbl/s of fuel (three wells, the lifeline, the bulk import). A
     fighting unit is 47-72 credits a barrel (fighter 1,350/29, gunship
     1,600/26, MBT 1,400/20, SPG 1,450/20, destroyer 2,200/34), so 2.2 barrels
     a second can turn about 130 of those 613 credits into anything that burns
     fuel. The rest went where fuel is not needed: thirteen barracks at t=600
     and sixteen at t=900, an army of 61 infantry to 14 vehicles (five of
     them tanks, guns or carriers), and money past the vault thrown away.

     A player with that bank buys fuel. Player.fuelQuote()/buyFuel() sell
     barrels for credits, delivered to a refinery after a delay, at a price
     above the 9-credit lifeline that rises with this player's recent
     purchases - the same market and the same rule for the human. The
     commander buys:
       HOW MUCH: a stock of what the production lines would burn over the
         delivery time plus MKT_HORIZON, net of our own wells and purchase
         lines. A line counts only while its service has asked for fuel in
         the last 30 s or has something on order (lineBurn), so a fleet or
         an army at strength buys nothing. Never less than the price of what
         is being saved for: Tech III (90), a generational step, a rig.
       WITH WHAT: money above a reserve - 2,500, the tech/rig/era hoard plus
         800, or a fifth of the vault, whichever is most, and never under
         CFG.FUEL_BULK_BANK + 500 while the bulk import could run (a second
         refinery, tanks under its ceiling): at 25 a barrel that import is
         the cheapest fuel money buys, and it stops the moment the bank dips
         under 5,000 - which a 2,500 reserve let the market do (fulda P0 held
         2,900-3,900 on five refineries at t=360-420 with a test market). And
         only while the bank idles or holds 3,000 past it. An order is at most
         spare / (price + MKT_WORTH) barrels, so the barrels take
         price / (price + 60) of the spare and the units they are for can
         still be paid: a third at 30 cr/bbl, half at 60.
       AT WHAT PRICE: MKT_WORTH scaled by how much money is spare and how
         long it has idled - 0.45x on a bare reserve, +1.2x as the spare
         reaches MKT_FULL, +0.75x as the idle clock reaches three minutes
         (27 to 144 cr/bbl at Warlord, 0.7x of that at Regular) - and half as
         much again while income is being thrown away past the vault. Money
         that cannot be spent is worth nothing, so an idle bank pays what it
         must. The spare is measured against a fixed 15,000 and not the
         vault: refineries raise the vault, and a ceiling read off it fell as
         the bank grew (fulda P0, jsc census with a test market: 12,215 and
         then 18,886 banked with the ceiling at 51-55 and the price at 60-86).
         Market pressure is the brake. The quote is the order's average and
         climbs with its size (player.js fuelQuote: 30 * (1 + (L + n/2)/100)),
         so a lot over the ceiling is halved, at most three times, before
         buying stops for twelve seconds: on taiwan a 120-barrel lot at 57.7
         against a 57.1 ceiling was refused where 115 barrels passed, and ten
         of 48 such refusals had a lot of 15 or more under the ceiling.
     One order every four seconds at most, never more than MKT_PENDING in
     the post; a refusal (no refinery, no market) waits twenty seconds.
     Below D.read 0.35 (Recruit) the market is not used, and nobody buys
     before t=180, without a war factory, or while the mining fleet is short.

     FOG: our own bank, tank, queues and lines, and the quote we are given.
     Nothing of anybody else's. COST: every four seconds, one pass over our
     buildings (prodSpeed, storageCap, the refinery count) and three queues,
     and at most five quotes. */
  const MKT_WORTH = 60;          // credits of fighting unit one barrel fuels
  const MKT_HORIZON = 30;        // seconds of net burn held past the delivery time
  const MKT_MIN = 15;            // the smallest order worth placing
  const MKT_CHUNK = 120;         // the largest single order
  const MKT_PENDING = 3;         // orders in the post at once
  const MKT_FULL = 15000;        // a spare this large is a full bank for the price ceiling
  const LINE_DUTY = 0.5;         // share of the time a line is really cutting (macroPlan)
  const INF_SHARE = 0.55;        // infantry's part of the army ceiling while fuel can be had
  function marketOn() {
    return typeof P.fuelQuote === "function" && typeof P.buyFuel === "function";
  }
  function fuelPending() {
    if (typeof P.fuelOrders !== "function") return 0;
    let n = 0;
    for (const o of (P.fuelOrders() || [])) n += o.bbl || 0;
    return n;
  }
  /* barrels a second ordered lately (a two-minute average), and whether we
     have been buying at all */
  function marketRate() { return macro.mkt.rate; }
  function marketBuying() { return G.time - macro.mkt.lastBuy < 90; }
  /* What the production lines would burn at full speed, counting only a
     service that wants fuel now. From the e20 tables at speed 1: a war
     factory ~1.0 bbl/s (MBT 20 in 20 s, heavy 36/30, SPG 20/21), an airbase
     ~1.4 (fighter 30/19, gunship 26/22, CAS 40/28), a naval yard ~1.2
     (destroyer 34/28, submarine 40/30, cruiser 60/42). prodSpeed() is the
     queue's speed with every building of the kind and the brownout. */
  function lineBurn(nFac, nAir, nYard) {
    const now = G.time, asked = (arm) => now - demandT[arm] < 30;
    let b = 0;
    if (nFac && (asked("gnd") || queueLen("vehicle"))) b += 1.0 * P.prodSpeed("vehicle");
    if (nAir && (asked("air") || queueLen("aircraft"))) b += 1.4 * P.prodSpeed("aircraft");
    if (nYard && (asked("sea") || queueLen("naval"))) b += 1.2 * P.prodSpeed("naval");
    return b;
  }
  /* once a think, from think(), before anything is bought */
  function fuelMarket(nFac, nAir, nYard, nLab, opening) {
    const k = macro.mkt, now = G.time;
    /* the rate on its own clock, so it decays while nothing is bought */
    if (k.rateT < 0) k.rateT = now;
    const rdt = now - k.rateT;
    if (rdt >= 4) {
      k.rate += (k.fresh / rdt - k.rate) * Math.min(1, rdt / 120);
      k.fresh = 0; k.rateT = now;
    }
    if (now < k.next) return;
    k.next = now + 4;
    k.can = false;
    if (!marketOn()) { k.why = "none"; return; }
    if ((D.read || 0) < 0.35) { k.why = "tier"; return; }
    if (now < k.bar) return;
    /* the mining fleet first, as everywhere in this file: a hauler is what
       every later barrel is paid from, and the opening's works are paid from
       the same bank */
    if (opening || !nFac || G.time < 180) { k.why = "mine"; return; }
    const pend = fuelPending();
    const burn = lineBurn(nFac, nAir, nYard);
    k.burn = burn;
    /* what is being saved for has to be buyable */
    let floorOil = 40;
    if (eraStep) floorOil = Math.max(floorOil, eraStep.oil + 20);
    if (nLab && P.tech < 3 && (P.techCap === undefined || P.techCap >= 3))
      floorOil = Math.max(floorOil, 100);
    if (rigSaving()) floorOil = Math.max(floorOil, rigOilNeed() + 20);
    const net = Math.max(0, burn - nativeOil());
    const target = Math.max(floorOil, Math.round(net * (k.eta + MKT_HORIZON)) + (burn > 0 ? 40 : 0));
    k.target = target;
    const want = target - (P.oil - committedOil() + pend);
    const cap = P.storageCap();
    const bulkOn = (CFG.FUEL_BULK_RATE || 0) > 0 && P.oil < (CFG.FUEL_BULK_CEIL || 0) &&
                   P.countBuilding("refinery") >= 2;
    const hoard = Math.max(2500, saveTarget + 800, cap * 0.2);
    const reserve = bulkOn ? Math.max(hoard, (CFG.FUEL_BULK_BANK || 0) + 500) : hoard;
    k.reserve = reserve;
    const spare = P.cash - reserve;
    const rich = !!(macro.plan && macro.plan.rich) || spare > 3000;
    if (want < MKT_MIN) { k.why = "stocked"; k.can = rich && spare > 0; return; }
    if (spare < 500 || !rich) { k.why = "reserve"; return; }
    if (typeof P.fuelOrders === "function" && (P.fuelOrders() || []).length >= MKT_PENDING) {
      k.why = "post"; k.can = true; return;
    }
    /* (how rich we are is the money above the hoard, not above the bulk
       import's floor: measured from the floor, the ceiling fell by 14 a
       barrel whenever a second refinery stood, and taiwan P0 banked 10,248
       on average against 8,731 measured from the hoard) */
    const fill = U.clamp((P.cash - hoard) / MKT_FULL, 0, 1), idleF = U.clamp(macro.idle / 180, 0, 1);
    let pMax = MKT_WORTH * (0.45 + 1.2 * fill + 0.75 * idleF) * (0.7 + 0.3 * (D.read || 0));
    if (P.cash >= cap * 0.92) pMax *= 1.5;       // income past the vault is being thrown away
    k.pMax = pMax;
    const unitOf = (x) => (x && x.bbl > 0 && x.cost > 0 ? x.cost / x.bbl : 0);
    let n = Math.min(MKT_CHUNK, Math.ceil(want));
    let qt = P.fuelQuote(n);
    let unit = unitOf(qt);
    if (!(unit > 0)) {
      k.why = "refused"; k.note = (qt && qt.why) || ""; k.refused++; k.bar = now + 20;
      return;
    }
    while (unit > pMax && n >= 2 * MKT_MIN) {
      n = Math.floor(n / 2);
      qt = P.fuelQuote(n);
      unit = unitOf(qt);
    }
    if (!(unit > 0)) {
      k.why = "refused"; k.note = (qt && qt.why) || ""; k.refused++; k.bar = now + 20;
      return;
    }
    k.unit = unit;
    if (unit > pMax) { k.why = "price"; k.priced++; k.bar = now + 12; return; }
    /* the barrels' part of the spare, and the rest for what they fuel */
    n = Math.min(n, qt.bbl, Math.floor(spare / (unit + MKT_WORTH)));
    if (n < MKT_MIN) { k.why = "reserve"; return; }
    if (n !== qt.bbl) {
      qt = P.fuelQuote(n);
      unit = unitOf(qt);
      if (!(unit > 0) || unit > pMax) {
        k.why = unit > 0 ? "price" : "refused"; k.bar = now + 12;
        return;
      }
      k.unit = unit;
      n = qt.bbl;
    }
    if (!qt.ok) { k.why = "refused"; k.note = qt.why || ""; k.refused++; k.bar = now + 20; return; }
    const c0 = P.cash, p0 = fuelPending(), o0 = P.oil;
    if (!P.buyFuel(n)) { k.why = "refused"; k.note = "order"; k.refused++; k.bar = now + 20; return; }
    /* what actually left the bank, and what is actually coming */
    const got = Math.max(0, fuelPending() - p0 + (P.oil - o0)) || qt.bbl;
    k.bought += got; k.fresh += got; k.spent += Math.max(0, c0 - P.cash);
    k.orders++; k.lastBuy = now; k.eta = qt.eta > 0 ? qt.eta : 0;
    k.why = "ok"; k.can = true;
  }
  /* ---- MONEY THE MARKET WILL NOT TAKE BUYS GUNS ----
     With the stock full or the price past the ceiling - or no market at
     all - a bank that has idled has nothing left to buy that burns fuel, and
     under the victory rule the useful oil-free place for it is a gun at a
     production building (defAnchor sites it there). One more wanted per
     4,000 above the reserve and a 3,000 float: fulda P0 idled on 22,000-
     26,000 from t=600 to t=900 in the baseline census, which is four. */
  function spareGuns(plan) {
    const k = macro.mkt;
    if (!plan.rich || !(k.why === "stocked" || k.why === "price" || k.why === "none")) return 0;
    return Math.floor(Math.max(0, P.cash - Math.max(2500, k.reserve) - 3000) / 4000);
  }
  /* How many of the army ceiling may be infantry (ARMY COMPOSITION).
     Only while money idles: the market is feeding us (k.can is set only for
     a rich bank), or the bank has idled and the plan reads fuel fine. fuelOK
     alone is income against lines, not money or a full tank - capped on it,
     the losing seat on fulda (jsc probe, t=330-420) held 16 infantry to a
     cap of 15 with an empty vehicle queue, 23-48 barrels and 2,000-4,800
     credits it could not spend: 190 such samples in 720 s, none with this
     test. */
  function infantryCap(size, nFac, plan) {
    if ((D.read || 0) < 0.35 || nFac < 1 || !groundConnected) return Infinity;
    return (macro.mkt.can || (plan.rich && plan.fuelOK)) ? Math.ceil(size * INF_SHARE) : Infinity;
  }
  function fuelIntel() {
    const k = macro.mkt, p = macro.plan || {};
    const bk = forceBook(), tot = bk.gnd + bk.air + bk.sea;
    const r2 = (v) => Math.round((v || 0) * 100) / 100;
    let planes = 0;
    for (const u of P.units) if (!u.dead && u.def.cat === "aircraft") planes++;
    return { market: marketOn(), why: k.why, note: k.note,
             bought: Math.round(k.bought), spent: Math.round(k.spent), orders: k.orders,
             refused: k.refused, priced: k.priced,
             unit: r2(k.unit), pMax: r2(k.pMax), rate: r2(k.rate),
             pending: Math.round(fuelPending()), target: Math.round(k.target),
             burn: r2(k.burn), native: r2(nativeOil()), reserve: Math.round(k.reserve),
             cash: Math.round(P.cash), oil: Math.round(P.oil),
             bar: { have: P.countBuilding("barracks"), plan: p.bar || 0 },
             inf: { have: k.infN, max: k.infMax },
             air: { share: r2(armShare.air), have: tot ? r2(bk.air / tot) : 0,
                    planes, bases: P.countBuilding("airbase"), plan: p.air || 0,
                    lines: p.airFuel || 0 },
             lines: { fac: p.facFuel || 0, nav: p.navFuel || 0 } };
  }

  function macroPlan(nRef, nFac, nBar, nAir, nYard, nRadar) {
    const m = macro;
    const e = (D.econ || 1) * (D.econBias || 1);
    let harvIdle = 0, harvN = 0, planes = 0;
    for (const u of P.units) {
      if (u.dead) continue;
      if (u.def.harvester) {
        harvN++;
        /* No ore reachable: updateHarvester drops to idle, or holds a harvest
           order with no ore target, and in either case carries nothing - for
           fifteen seconds running, and not while it is resting after a miss
           (oreWait). A probe counted one hauler walled into a two-tile pocket
           as "no ore" for 70% of samples, and that one hauler stopped every
           hauler purchase and every refinery the plan wanted. */
        const lost = !u.load && !(u.oreWait > 0) &&
                     (u.order.type === "idle" || (u.order.type === "harvest" && !u.oreT));
        if (!lost) u._noOreT = 0;
        else if (!u._noOreT) u._noOreT = G.time;
        else if (G.time - u._noOreT > 15) harvIdle++;
      } else if (u.def.cat === "aircraft") planes++;
    }
    let wells = 0, docks = 0, prod = 0;
    for (const b of P.buildings) {
      if (b.dead) continue;
      if (isProdDef(b.def)) prod++;
      if (b.buildProgress < 1) continue;
      if (b.def.oilNode) wells++;
      else if (b.def.id === "refinery") docks++;
    }
    /* the lifeline purchase plus the bulk import (player.js bulkFuelRate,
       every player alike: +0.12 bbl/s a refinery past the first, three at
       most, while the bank holds 5,000) - the rate right now */
    const buying = P.buysFuel ? P.buysFuel() : false;
    const buyRate = (buying ? (CFG.FUEL_BUY_RATE || 0) : 0) + (P.bulkFuelRate ? P.bulkFuelRate() : 0);
    /* no ore to be had: none seen and unbuilt at all, or half the fleet
       standing with nothing it can reach */
    const noOre = (m.fields !== null && !m.anyOre) || (harvN > 0 && harvIdle * 2 >= harvN);
    /* ...and what the fuel market has been delivering (FUEL MARKET): a
       bought barrel feeds a line exactly as a pumped one does */
    const fuelInc = wells * ((BUILDINGS.derrick && BUILDINGS.derrick.oilRate) || 0.55) + buyRate +
                    marketRate();
    /* A reserve is a reason for one more line only if it is deep for the
       lines already standing: in a jsc smoke run of fulda a flat 90-barrel
       test let a fifth factory go up on one derrick, and the tank was at 29
       a minute later. */
    const lines = nFac + nAir + nYard;
    const fuelOK = P.oil > 45 * Math.max(2, lines) || fuelInc >= 0.35 * Math.max(1, lines);
    /* ---- EACH SERVICE GETS THE LINES ITS SHARE OF THE FUEL CAN FEED ----
       fuelOK is one answer for all three services, and while it reads true
       nothing but income bounds a factory: 1 + (inc - 40) / 38 + richN is
       twenty-five war factories on fulda P0's 613 cr/s, and a market that
       keeps fuel reading true would build them. So each service is held to
       the lines its share of the fuel income (armShare, FORCE BUDGET) can run
       at LINE_DUTY - a queue runs at 1 + 0.5 per extra building and burns
       ~1.0 (factory), 1.4 (airbase) or 1.2 (naval yard) barrels a second at
       speed 1. A line is a building that stays and a market rate is what
       was paid for lately, under a price that rises with it, so bought fuel
       counts at half weight here: with it at full weight taiwan P0 put up
       seven naval yards in a jsc census, the rate fell back with the price,
       and five stood idle. Shares 0.67 / 0.28 / 0.05: on fulda P0's own 2.19
       bbl/s that is four factories, one airbase, one yard; with 2.5 more
       bought, eight, one, one. */
    const fuelPlan = fuelInc - 0.5 * marketRate();
    /* ...and whether fuel is fine WITHOUT the market: our wells and the two
       purchase lines against the lines standing, or a deep tank that nothing
       has been bought into lately. A bought barrel is held back by its price,
       so it is no reason for a bigger vault, a bigger mining fleet or fewer
       fuel docks: in the same census fulda P0 put up ten refineries and 33
       haulers once market fuel read fine, and banked the income. It is not
       fuelOK after the buying stops either - fuelOK carries marketRate(),
       which takes minutes to fade. */
    const fuelOwn = fuelInc - marketRate() >= 0.35 * Math.max(1, lines) ||
                    (!marketBuying() && P.oil > 45 * Math.max(2, lines));
    const lineFor = (share, burn) =>
      Math.floor(1 + 2 * Math.max(0, fuelPlan * (share || 0) / (burn * LINE_DUTY) - 1));
    const facFuel = lineFor(armShare.gnd, 1.0), airFuel = lineFor(armShare.air, 1.4),
          navFuel = lineFor(armShare.sea, 1.2);
    const rich = m.idle > 15;
    const richN = rich ? 1 + Math.floor((m.idle - 15) / 45) : 0;
    const step = 55 / Math.max(0.5, D.econ || 1);      // 38 cr/s at Warlord, 79 at Recruit
    const inc = m.inc;
    const ft = fieldTable();
    let fac, bar;
    if (groundConnected) {
      fac = 1 + Math.floor(Math.max(0, inc - 40) / step) + richN;
      bar = 1 + Math.floor(Math.max(0, inc - 60) / (step * 1.6)) + (rich ? 1 : 0);
    } else {
      /* across water the factory still cuts haulers, rigs, air defence and the
         landing force, and the barracks the troops for it - but the industry
         that fights is afloat and airborne */
      fac = 1 + (rich ? 1 : 0);
      bar = 1 + (rich ? 1 : 0);
    }
    if (!fuelOK) fac = Math.min(fac, Math.max(nFac, 2));
    fac = Math.min(fac, Math.max(2, facFuel));
    /* ---- AND THE BARRACKS ARE PROPORTIONATE TO THE INDUSTRY ----
       bar grew with income alone - one per 61 cr/s past the first 60 - and
       income is exactly what a fuel-starved commander has too much of: fulda
       P0 wanted thirteen at 731 cr/s (t=450) and stood on sixteen at t=900
       beside six war factories. A squad is cut two to three times faster than a
       vehicle at the same queue speed (4.5-13 s against 11-30 s), so a
       barracks count at 0.6 of the factories keeps the two arriving at a
       like pace - five barracks to five factories with the money idling -
       and the army ceiling still decides how many are bought. */
    bar = Math.min(bar, 1 + Math.ceil(0.6 * Math.max(1, nFac)) + (rich ? 1 : 0));
    const ab = D.airBias || 1, nb = D.navalBias || 1;
    const pads = (BUILDINGS.airbase && BUILDINGS.airbase.pads) || 4;
    /* ramp space is the ceiling on the air force: four pads a base */
    const rampFull = nAir >= 1 && planes >= nAir * pads - 1;
    let air = 0;
    if (P.tech >= 2 && nRadar >= 1) {
      air = 1;
      if (!groundConnected || ab > 1)
        air += Math.floor(Math.max(0, inc - 70) * ab / (step * 2));
      if (fuelOK) air += richN;
      else air = Math.min(air, Math.max(nAir, 1));
      /* THE AIR SHARE OF THE FUEL BUYS BASES, ON ANY THEATRE. On land this
         was one base, plus richN only while fuel read fine, so the air
         force's 28-33% of the barrels (FORCE BUDGET) had the one or two bases
         ramp space forced. Held to what that share of the fuel income can
         run (airFuel), and built up to it once the fuel is there. */
      air = Math.min(air, Math.max(1, airFuel));
      if (fuelOK && armShare.air > 0) air = Math.max(air, airFuel);
      /* a full ramp always asks for one more base, fuel or not - the
         airframes already exist and need somewhere to land */
      if (rampFull) air = Math.max(air, nAir + 1);
    }
    let nav = 0;
    /* On a land theatre a yard is worth building only where a hull from our
       water can reach their coast (theatreNow.sea, FORCE BUDGET's one sea
       A*): a probe of fulda built a naval yard on inland water at t~300 -
       1,800 credits for ships that reach nothing. */
    if ((!groundConnected || ((nb > 1 || inc > 150 || rich) && theatreNow.sea)) && shoreOK()) {
      if (!groundConnected)
        nav = 1 + Math.floor(Math.max(0, inc - 60) * nb / (step * 2)) + (fuelOK ? richN : 0);
      else nav = 1 + (nb > 1 && fuelOK ? richN : 0);
      if (!fuelOK) nav = Math.min(nav, Math.max(nYard, 1));
      nav = Math.min(nav, Math.max(1, navFuel));
    }
    /* A refinery for every seen field in reach that nobody of ours works, paced
       by the clock (Warlord: a third at ~100 s, a fourth at ~200 s) unless no
       refinery of ours stands at ore at all; one more while the money idles.
       Haulers standing idle do NOT hold this back: a refinery at a different,
       reachable field is the cure for unreachable ore. */
    const perRef = e >= 1.3 ? 3 : 2;
    const refClock = 2 + Math.floor(G.time * e / 150);
    let ref = 2;
    if (ft.inReach)
      ref = Math.max(2, ft.served === 0 ? nRef + 1 : Math.min(nRef + 1, refClock));
    /* While money idles a refinery is also a vault and - up to the bulk
       import's four - a fuel dock, but only while fuel is actually short or
       the vault actually full, and never faster than the clock plus the idle
       time allows: unbounded, an idle seat in a jsc smoke run of taiwan put
       up eighteen refineries by t=540. */
    const dockShort = !fuelOwn && !!P.bulkFuelRate && nRef < 1 + (CFG.FUEL_BULK_MAX || 0);
    /* (the vault reason only while fuel is fine: with fuel short a bigger
       vault banks money the army cannot spend - the trap the plan already
       refuses for silos.) "Fine" here is a deep tank of our own and not the
       income test alone: facFuel/airFuel/navFuel hold the lines at what the
       fuel income can run, so income covers the lines almost by
       construction, and the vault reason then fired on every full bank. A
       jsc census of fulda without a market had P0 on 15 refineries and
       39,910 credits at t=600 and on 21 and 56,322 (33 haulers) at t=900,
       against 7 and 9 before the line caps; with the tank test, 7 and
       20,594 at t=600. */
    if (rich && !noOre && (dockShort || (fuelOwn && P.oil > 45 * Math.max(2, lines) &&
                                         P.cash > P.storageCap() * 0.8)))
      ref = Math.max(ref, Math.min(nRef + 1, refClock + richN));
    /* ---- and when the ore is out of reach, reach for it ----
       Measured in a jsc smoke run of fulda: one seat's nearest seen field was
       38 tiles from its yard, both refineries went up at home, and its haulers
       had landed 700 credits by t=180 against 7,000 for the seat whose
       refinery stood at its field. A Concrete Barrier is 40 credits, half a
       second, no power, and - not being an obstacle - obeys the build radius
       and extends it, which player.js calls "the legitimate version of the
       same idea". A chain of them toward the field (spotToward, up to ten
       tiles a step) brings it into reach, and the refinery rung then puts a
       refinery on it. Only toward a field on our side of the believed front
       and clear of anything seen. */
    const creep = nRef >= 1 && !ft.inReach && !!ft.outReach &&
                  (ft.served === 0 || nRef < refClock);
    m.creepTo = creep ? ft.outReach : null;
    /* Across water the surplus would be vehicles that cannot cross burning the
       fuel the fleet and the air arm need: in a jsc smoke run of taiwan an
       idle seat spent 244 barrels on vehicles and flew nothing from its
       airbase. */
    const surplus = rich && groundConnected ? 4 + 2 * richN : 0;
    /* Haulers for the docks that stand at ore, not for every dock: a refinery
       bought as a vault or a fuel dock ships its own hauler and needs no more
       (thirty-eight haulers on the same fields in that run, eating fuel).
       Never fewer than two docks' worth. */
    const harv = perRef * Math.max(2, Math.min(nRef, ft.served + 1));
    return (m.plan = { fac, bar, air, nav, ref, perRef, harv, harvN, noOre, prod, rich, richN, surplus,
                       fuelInc: Math.round(fuelInc * 100) / 100, fuelOK, harvIdle,
                       field: !!ft.inReach, far: !!ft.outReach, served: ft.served,
                       creep, rampFull, facFuel, airFuel, navFuel, fuelOwn });
  }

  /* ---- siting ---- */
  /* the legal spot nearest a point, in rings outward from it */
  function spotNear(id, fx, fy, R) {
    const def = BUILDINGS[id];
    const ox = Math.round(fx - def.w / 2), oy = Math.round(fy - def.h / 2);
    if (G.canPlace(P, id, ox, oy) && siteOK(id, ox, oy)) return { tx: ox, ty: oy };
    for (let r = 1; r <= R; r++) {
      const n = 6 + r * 2, a0 = G.rng() * U.PI2;
      for (let a = 0; a < n; a++) {
        const an = a0 + a / n * U.PI2;
        const tx = Math.round(ox + Math.cos(an) * r), ty = Math.round(oy + Math.sin(an) * r);
        if (G.canPlace(P, id, tx, ty) && siteOK(id, tx, ty)) return { tx, ty };
      }
    }
    return null;
  }
  /* the legal spot furthest out along the line from our nearest structure to a
     point: where a new structure drags the build radius toward it */
  function spotToward(id, fx, fy) {
    let src = null, sd = Infinity;
    for (const b of P.buildings) {
      if (b.dead || b.def.obstacle) continue;
      const d = U.dist2(b.tx + b.def.w / 2, b.ty + b.def.h / 2, fx, fy);
      if (d < sd) { sd = d; src = b; }
    }
    if (!src) return null;
    const def = BUILDINGS[id];
    const sx = src.tx + src.def.w / 2, sy = src.ty + src.def.h / 2;
    const L = Math.sqrt(sd) || 1, ux = (fx - sx) / L, uy = (fy - sy) / L;
    for (let s = Math.min(L, CFG.BUILD_RADIUS - 1); s >= 2; s -= 1.5) {
      for (const off of [0, 1.5, -1.5, 3, -3]) {
        const cx = sx + ux * s - uy * off, cy = sy + uy * s + ux * off;
        const tx = Math.round(cx - def.w / 2), ty = Math.round(cy - def.h / 2);
        if (G.canPlace(P, id, tx, ty) && siteOK(id, tx, ty)) return { tx, ty };
      }
    }
    return null;
  }
  /* Which yard a structure goes beside. Production goes to the yard holding
     the least production, so one lost yard is not the whole war; everything
     else to the least crowded yard, which is where findSpot still finds
     ground. A yard nearer the trouble than home is last choice. */
  function yardAnchor(prod) {
    const yards = [];
    for (const b of P.buildings)
      if (!b.dead && b.def.id === "conyard" && b.buildProgress >= 1) yards.push(b);
    if (yards.length < 2) return yards[0] || null;
    const trouble = bearing();
    const homeT = trouble ? U.dist(P.homeX, P.homeY, trouble.x, trouble.y) : 0;
    let best = null, bestS = Infinity;
    for (const y of yards) {
      let s = 0;
      for (const b of P.buildings) {
        if (b.dead || b === y || b.def.obstacle) continue;
        if (U.dist2(b.tx, b.ty, y.tx, y.ty) > 169) continue;
        s += prod ? (isProdDef(b.def) ? 4 : 0.2) : 1;
      }
      if (trouble && U.dist(y.x, y.y, trouble.x, trouble.y) < homeT - CFG.TILE * 6)
        s += prod ? 9 : 3;
      if (s < bestS) { bestS = s; best = y; }
    }
    return best;
  }
  /* ---- which building gets the next gun ----
     One rule from two designs (this module's defAnchor and the war stream's
     prodAnchor): the production building - or refinery - nearest the trouble
     (bearing()), passed over while it already has guns beside it. Each gun
     within seven tiles counts as twelve tiles further away, scaled by what
     losing the building costs (a yard 1.5, other production 1, a refinery
     0.6), so the next gun covers the next building rather than thickening
     the same one, and a rush arrives at a factory that has one. With no
     trouble known the guns simply spread by cover. placeReady() hands the
     answer to findSpotToward(). COST: guns x (production + refineries), once
     per emplacement placed. */
  function defAnchor() {
    const guns = [];
    for (const b of P.buildings)
      if (!b.dead && b.def.cat === "defense" && b.def.weapons && b.def.weapons.length &&
          !b.def.superweapon) guns.push(b);
    const trouble = bearing(), T2 = CFG.TILE, R2 = 49 * T2 * T2;
    let best = null, bestS = Infinity;
    for (const b of P.buildings) {
      if (b.dead || b.buildProgress < 1) continue;
      const w = isProdDef(b.def) ? (b.def.base ? 1.5 : 1) : b.def.id === "refinery" ? 0.6 : 0;
      if (!w) continue;
      let n = 0;
      for (const g of guns) if (U.dist2(g.x, g.y, b.x, b.y) < R2) n++;
      const s = (trouble ? U.dist(b.x, b.y, trouble.x, trouble.y) / T2 : 0) + n * 12 / w;
      if (s < bestS) { bestS = s; best = b; }
    }
    return best;
  }
  function macroSpot(id) {
    const def = BUILDINGS[id];
    if (!def || def.shore || def.oilNode) return null;
    if (id === "refinery") {
      const f = fieldTable().inReach;
      if (f) {
        const s = spotNear(id, f.x, f.y, 7) || spotToward(id, f.x, f.y);
        macro.ftabT = -1e9;
        if (s) {
          /* too far off the field to serve it: take the spot, but stop
             buying refineries for that field for a while */
          if (U.dist(s.tx + 1.5, s.ty + 1, f.x, f.y) >= 9) macro.creepDead.set(fieldKey(f), G.time + 150);
          else macro.sited++;
          return s;
        }
        macro.creepDead.set(fieldKey(f), G.time + 150);
      }
    }
    const a = yardAnchor(isProdDef(def));
    if (!a) return null;
    const s = findSpot(id, a);
    if (s && isProdDef(def) && a !== P.buildings.find(b => !b.dead && b.def.id === "conyard"))
      macro.spread++;
    return s;
  }
  /* the next barrier of a creep, or nothing - and a creep with no ground left
     on its line writes that field off for a while */
  function creepSpot() {
    const f = macro.creepTo;
    if (!f) return null;
    const s = spotToward("wall", f.x, f.y);
    if (s) { macro.crept++; macro.ftabT = -1e9; }
    else { macro.creepDead.set(fieldKey(f), G.time + 150); macro.ftabT = -1e9; }
    return s;
  }
  /* The mining fleet stands at 60% of the plan or better (six at most is
     asked): until it does, a rig does not take the head of the vehicle
     queue. A probe had a 3,000-credit rig at items[0] with three haulers
     against a plan of six and the bank at 0 for two minutes. */
  function haulersOK() {
    const p = macro.plan;
    return !p || p.harvN >= Math.min(6, Math.ceil(p.harv * 0.6));
  }

  /* ---- a door that was built shut is opened ----
     keepsLanes() keeps new structures off the doors, but ground closed before
     it - a yard unfolded alongside, a derrick on its node, an older layout -
     can still hold the spawn tile in a pocket; HEAD trapped 11 vehicles on
     taiwan by t=600, and the integration smoke run caught korea P0 spawning
     every vehicle into a one-tile pocket (40 sealed checks by t=600). Every
     twelve seconds the war factory and the barracks the engine actually
     spawns from (the nominated primary, else the one nearest home -
     G.spawnUnit) are flood-filled over open ground for up to 120 tiles. A
     smaller pocket is answered the way a player answers it: first by
     nominating another building of the kind whose door is open (the
     primary-building order, ui.js), else by selling the cheapest structure
     of OURS that walls the pocket (G.sellBuilding, half back) - never
     production, a refinery, the radar or the lab, never a plant the grid
     needs, never storage the bank is using - at most one sale a minute.
     COST: one flood of at most 120 tiles per kind every twelve seconds, and
     one per other building of the kind only while the door is shut. */
  const DOOR_SELL = { silo: 1, power: 1, nest: 1, atpost: 1, wall: 1, flak: 1, depot: 1 };
  let doorSellT = 0;
  function unsealDoors() {
    const m = macro, now = G.time;
    if (now < m.doorT) return;
    m.doorT = now + 12;
    const M = G.map, W = M.W, H = M.H, LIMIT = 120;
    for (const kind of ["factory", "barracks"]) {
      const pr = P.primary && P.primary[kind];
      const src = pr && !pr.dead && pr.buildProgress >= 1 ? pr : G.nearestBuilding(P, kind, P.homeX, P.homeY);
      if (!src) continue;
      if (doorFlood(src.def, src.tx, src.ty, LIMIT) >= LIMIT) continue;
      m.sealed++;
      let alt = null;
      for (const b of P.buildings) {
        if (b.dead || b === src || b.def.id !== kind || b.buildProgress < 1) continue;
        if (doorFlood(b.def, b.tx, b.ty, LIMIT) >= LIMIT) { alt = b; break; }
      }
      if (alt) {
        if (!P.primary) P.primary = {};
        P.primary[kind] = alt;
        m.nominated++;
        continue;
      }
      if (now < doorSellT || !G.sellBuilding) continue;
      /* what walls the pocket: the same flood, collecting the buildings it
         runs into */
      const sx0 = src.tx + ((src.def.w / 2) | 0), sy0 = src.ty + src.def.h;
      const open = (x, y) => x >= 0 && y >= 0 && x < W && y < H && !G.occ[y * W + x] &&
                             GameMap.passable(M, x, y, "ground");
      let sx = sx0, sy = sy0;
      if (!open(sx, sy)) {
        const n = Path.nearest(M, U.clamp(sx, 0, W - 1), U.clamp(sy, 0, H - 1), "ground",
                               (a, b) => !!G.occ[b * W + a], 7);
        if (!n) continue;
        sx = n.x; sy = n.y;
      }
      const seen = new Set([sy * W + sx]), stack = [sy * W + sx], walls = new Set();
      while (stack.length) {
        const i = stack.pop(), x = i % W, y = (i / W) | 0;
        for (let d = 0; d < 4; d++) {
          const nx = x + (d === 0 ? 1 : d === 1 ? -1 : 0), ny = y + (d === 2 ? 1 : d === 3 ? -1 : 0);
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          const j = ny * W + nx;
          if (seen.has(j)) continue;
          if (open(nx, ny)) { seen.add(j); stack.push(j); }
          else if (G.occ[j]) walls.add(G.occ[j]);
        }
      }
      let pick = null;
      for (const b of P.buildings) {
        if (b.dead || !walls.has(b.id) || !DOOR_SELL[b.def.id]) continue;
        if (b.def.power > 0 && P.powerOut() - b.def.power < P.powerUse() * 1.1) continue;
        if (b.def.storage && P.cash > P.storageCap() - b.def.storage - 500) continue;
        if (!pick || (b.def.cost || 0) < (pick.def.cost || 0)) pick = b;
      }
      if (!pick) continue;
      G.sellBuilding(pick);
      doorSellT = now + 60;
      m.unsealed++;
    }
  }

  function macroState() {
    const m = macro, p = m.plan || {};
    return { inc: Math.round(m.inc * 10) / 10, slope: Math.round(m.slope),
             idle: Math.round(m.idle), budget: Math.round(m.budget), cap: P.storageCap(),
             want: { fac: p.fac, bar: p.bar, air: p.air, nav: p.nav, ref: p.ref,
                     harv: p.harv, perRef: p.perRef },
             have: { fac: P.countBuilding("factory"), bar: P.countBuilding("barracks"),
                     air: P.countBuilding("airbase"), nav: P.countBuilding("navalyard"),
                     ref: P.countBuilding("refinery"), yard: P.countBuilding("conyard"),
                     der: P.countBuilding("derrick"), prod: p.prod || 0,
                     harv: count(u => u.def.harvester) },
             rich: !!p.rich, richN: p.richN || 0, surplus: p.surplus || 0,
             fuelInc: p.fuelInc || 0, fuelOK: !!p.fuelOK, harvIdle: p.harvIdle || 0,
             field: !!p.field, far: !!p.far, served: p.served || 0, creep: !!p.creep,
             fields: m.fields ? m.fields.length : 0,
             inReach: m.ftab && m.ftab.inReach ? [Math.round(m.ftab.inReach.x), Math.round(m.ftab.inReach.y)] : null,
             outReach: m.ftab && m.ftab.outReach ? [Math.round(m.ftab.outReach.x), Math.round(m.ftab.outReach.y)] : null,
             creepTo: m.creepTo ? [Math.round(m.creepTo.x), Math.round(m.creepTo.y)] : null,
             noGo: m.creepDead.size,
             last: m.last, built: Object.assign({}, m.n),
             sited: m.sited, crept: m.crept, creepN: m.creepN, spread: m.spread,
             guarded: m.guarded,
             headed: m.headed, restarted: m.restarted, starved: m.starved, relief: m.relief,
             yardBuys: m.yards, unstuck: m.unstuck, hauled: m.spreadN,
             harvN: p.harvN || 0, noOre: !!p.noOre, sealed: m.sealed, unsealed: m.unsealed,
             nominated: m.nominated,
             landed: Math.round((P.stats && P.stats.hauled) || 0) };
  }

  /* ---------- the brain ---------- */
  function think() {
    placeReady();
    /* Several guns on one hull - see concentrate(). At the TOP of the think,
       not beside driveWave at the bottom: a think that buys, sells or calls
       something in returns half-way down (fifteen early `return`s, most of
       them `... && tryBuildUnit(..)) return;`), and the fight should not
       pause because the factory was busy. Running first changes nothing for
       the wave drivers: driveWave, driveFlankers and defendBase only touch
       idle, hover or guard hulls, runSiege only touches idle, guard or
       attackmove ones plus its tubes, which concentrate() skips - and
       concentrate() only ever touches automatic attack orders. */
    concentrate();

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
    /* the force budget is read before anything is bought - see FORCE BUDGET */
    readTheatre();
    oilBudget();

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
    /* -------- THE BUILD PLAN (see MACRO) --------
       One structure a tick, as before. What changed:
         - past the opening every rung asks macroPlan(), and growth is paid
           from macro.budget or from idle money - never "is the bank above N",
           which a commander that spends as it earns never is;
         - a purchase that FAILS falls through to the next rung (`cond &&
           tryB()`), where the old ladder ended on the condition alone;
         - the `saturated` branch is gone. It needed the bank at 90% of the
           vault for 45 s and then built factories only on a connected map -
           on taiwan it built six barracks for an army that could not cross.
           Idle money now grows every target instead, on any theatre. */
    econTick();
    const plan = macroPlan(nRef, nFac, nBar, nAir, nYard, nRadar);
    /* `starving` holds only once a war factory stands, because the factory is
       where a hauler is cut: korea P1 and kuwait P0 (one hauler, no factory,
       0-425 credits) shut their own build order - factory included - for the
       rest of the battle and were destroyed by t=492. And a refinery is still
       built while starving: it ships with a hauler and is paid through the
       building queue, which is funded before the vehicle queue.
       The floor is half the plan's fleet, not two: a probe held three
       haulers against a plan of six with the bank at 0 while the plan's
       ungated rungs (power ahead, lab, derrick) took every credit, so the
       hauler never started. Not when there is no ore to be had. */
    const starving = nRef >= 1 && nFac >= 1 && P.cash < 2200 && !plan.noOre &&
                     harv < Math.max(harvFloor, Math.ceil(plan.harv * 0.5));
    if (starving) macro.starved++;
    /* the fuel market (FUEL MARKET): before anything is bought, and above
       every early return in this think */
    fuelMarket(nFac, nAir, nYard, nLab, mineShort || starving);
    if (!bq.items.length && !bq.ready.length) {
      const can = (id) => !(failCool[id] > G.time);
      const tryB = (id, why) => {
        if (!can(id) || !P.enqueue("building", id)) return false;
        macro.last = id + ":" + why;
        macro.n[why] = (macro.n[why] || 0) + 1;
        if (id === "derrick") macro.oilT = -1e9;
        if (id === "navalyard") macro.shoreT = -1e9;
        return true;
      };
      /* growth: out of the budget, or free while the bank idles */
      const grow = (id, why, share) => {
        const cost = P.factionCost(BUILDINGS[id]) * (share || 1);
        if (!plan.rich && macro.budget < cost) return false;
        if (!tryB(id, why)) return false;
        macro.budget = Math.max(0, macro.budget - cost);
        return true;
      };
      /* The growth structures compete on SHORTFALL, not on rung order: as a
         fixed ladder the factory rung, whose target grows while money idles,
         took every slot - a jsc smoke run of fulda reached five war factories,
         one barracks, no lab and no airbase by t=480. Largest (want-have)/want
         first; a refinery at a field and the second factory get a lead. A
         purchase the budget refuses falls through to the next. */
      const growPick = () => {
        const c = [];
        const add = (id, why, have, want, share, lead) => {
          if (have < want) c.push({ id, why, share, gap: (want - have) / want + (lead || 0) });
        };
        add("factory", "industry", nFac, plan.fac, 1, nFac < 2 ? 0.3 : 0);
        add("refinery", plan.field ? "field" : "dock", nRef, plan.ref,
            plan.field ? 0.5 : 1, plan.field ? 0.7 : 0);
        add("airbase", plan.rampFull ? "ramp" : "air", nAir, plan.air, 1 / (D.airBias || 1));
        add("barracks", "industry", nBar, plan.bar, 1);
        if (nYard < plan.nav && shoreOK())
          add("navalyard", "sea", nYard, plan.nav, 1 / (D.navalBias || 1));
        c.sort((a, b) => b.gap - a.gap);
        for (const x of c) if (grow(x.id, x.why, x.share)) return true;
        return false;
      };
      /* Veteran and up open without bank gates. Recruit and Regular keep
         them, so the bottom of the table still opens like a beginner. */
      const hard = (D.econ || 1) >= 1;
      if (starving) {
        if (P.powerRatio() < 1.15) tryB("power", "brownout");
        else if (nRef < 3) tryB("refinery", "starving");
      }
      else if (
        (P.powerRatio() < 1.15 && tryB("power", "brownout")) ||
        (nRef < 1 && tryB("refinery", "open")) ||
        (nBar < 1 && tryB("barracks", "open")) ||
        (powerAhead(nFac < 1 ? 60 : 55) < 1.2 && tryB("power", "ahead")) ||
        (nFac < 1 && tryB("factory", "open")) ||
        /* ---- THE FIRST WELL, EARLY ----
           The derrick rung sat behind the second refinery and the radar dome
           and asked for 1,200 in the bank; on fulda, korea and kuwait the
           losing side read oreSpot=true at every sample to t=450 and never
           drilled (cash 0 at t=150, 300 and 450). A 700-credit well is 0.55
           barrels a second for good - three times the bought ration - so the
           first one goes down straight after the war factory. The building
           queue is paid first, so a thin bank only means the next 700
           credits go to the well. */
        (P.countBuilding("derrick") < 1 && P.cash > 300 && oilSpotOK() && tryB("derrick", "well1")) ||
        /* ---- AND THE NEXT TWO WELLS AHEAD OF THE REST OF THE OPENING ----
           The general derrick rung below waits behind the second refinery,
           the naval yard, the dome, the field refinery and the second
           factory - eighty seconds of works or more at one yard. A well is 700
           credits for 0.55 barrels a second for good; bought, those barrels
           are 33 cr/s at 60 a barrel, so a well pays for itself in about
           twenty seconds of the market's price. The second and the third go
           down as soon as a site is in reach. */
        (P.countBuilding("derrick") < 3 && (hard || P.cash > 700) && oilSpotOK() &&
         tryB("derrick", "well3")) ||
        (nRef < 2 && (hard || P.cash > 1200) && tryB("refinery", "open")) ||
        (!groundConnected && nYard < 1 && shoreOK() && tryB("navalyard", "sea")) ||
        (nRadar < 1 && (hard || P.cash > 1400) && tryB("radar", "open")) ||
        /* no refinery of ours stands at ore and one can now be put there: the
           whole mining fleet is driving the long way, so this outranks the
           budget (fulda smoke run: 30-tile hauls and 9,100 mined by t=390
           while the lab and the airbase went first) */
        (plan.field && plan.served === 0 && nRef < plan.ref && tryB("refinery", "field")) ||
        (nFac < 2 && plan.fac >= 2 && grow("factory", "industry")) ||
        /* ---- fuel is the other economy ----
           Derricks were capped at three, then at six plus the clock, and a
           commander with a full bank and an empty tank stopped buying anything
           that costs barrels. A drill site that exists is always worth 700:
           findOilSpot() answers only for legal ground, which is what bounds a
           player too. */
        ((hard || P.cash > 700) && oilSpotOK() && tryB("derrick", "oil")) ||
        /* ...and a well just out of reach gets a guard post on the line to it
           (oilOutpost: one 800-credit gun instead of a 3,000-credit rig; on
           its own ten-second clock, two posts a well at most) */
        (P.cash > 1500 && oilOutpost() && !!(macro.n.post = (macro.n.post || 0) + 1)) ||
        /* the lab: at once below Tech II (it is the road to it), otherwise once
           the second factory stands, the money idles or four minutes are up */
        (nLab < 1 && nRadar >= 1 &&
         (hard ? (P.tech < 2 || nFac >= 2 || plan.rich || G.time > 240) : P.cash > 1900) &&
         tryB("lab", "tech")) ||
        /* ---- RAMP SPACE IS THE CEILING ON THE WHOLE AIR FORCE ----
           (owner) "very few aircrafts." An airbase has four pads; plan.air
           adds one whenever the ramp it owns is nearly full, and grows with
           income across water and while the money idles, fuel permitting. */
        growPick() ||
        /* A silo stores CREDITS. It was bought on P.oil < 140, true from the
           first purchase on - korea P0 held four at t=300 with 939 banked.
           Now when the vault is too small for an era step, or nearly full
           while the money IS being spent (a lump sum is coming). Idle money
           gains nothing from a bigger vault: allowed then, an idle seat on
           taiwan built sixty-three silos and banked 186,000 by t=900. */
        ((eraNeedSilo || (!plan.rich && P.cash > P.storageCap() * 0.75)) &&
         tryB("silo", "vault")) ||
        (P.countBuilding("depot") < 1 && (nFac >= 2 || G.time > 300) &&
         (plan.rich || P.cash > 2000) && tryB("depot", "repair")) ||
        /* ---- the electronic order of battle ----
           Both families sit HERE, at the end of the plan, and both are capped
           at one. Not in the threat-scaled defence roll below: that builds a
           PROPORTION of each emplacement against a shortfall in an arm, has no
           concept of a cap, and the single most important fact about a jamming
           station is that a second one does nothing - G.jamAgainst and G.jamAt
           take the WORST bubble over a point and never the sum. These draw 45
           to 130 against a power plant's 120, which powerAhead() now answers
           before they are ordered.

           Gated on D.radar, the same doctrine knob the electronic-warfare block
           at the unit end already uses, so a Recruit and a Regular never buy
           one. structureFor() returns null where a nation has no such structure
           in this period - which is everybody before the 1980s, the PLA and the
           ROC before the 2000s, the KPA on the array axis for ever, and everyone
           but the KPA and PACT on the satellite axis. lockReason() then refuses
           it a second time through the fac gate, so the honest answer arrives
           twice over and neither path can leak. */
        (D.radar && P.tech >= 2 && nRadar >= 1 && P.cash > 2200 &&
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
             if (tryB(id, "ew")) return true;
           }
           return false;
         })()) ||
        (D.radar && P.tech >= 3 && nLab >= 1 && P.cash > 4200 &&
         (function () {
           const id = structureFor(P.faction, "lpar", P.era);
           if (!id) return false;
           if (P.countBuilding(id) + P.readyCount("building", id) > 0) return false;
           return tryB(id, "ew");
         })()) ||
        /* idle money and nothing else to build: a plant ahead of the next
           few loads (1.6 built eight spare plants on taiwan) */
        (plan.rich && powerAhead(0) < 1.35 && tryB("power", "surplus"))
      ) { /* enqueued above */ }
    }

    /* -------- DEFENSES (scale with threat) --------
       `wanted` used to read (2 + time/200) and nothing else: one more
       emplacement every two hundred seconds, for ever, whatever was actually
       happening on the map. Measured over twenty-five minutes on Fulda at
       Commander, that produced ten emplacements and the SEVEN power plants
       needed to run them - seventeen of twenty-six structures were concrete
       and generators - against one war factory, two refineries and a six-man
       army.

       It starves the army by construction rather than by accident.
       updateQueues() in player.js walks this.queues in declaration order and
       each queue takes min(payment, remaining, cash) - building and defense
       are declared before vehicle, so whatever they are still paying for has
       first call on every credit that arrives. A works queue that is never
       empty means the vehicle queue is never funded, which is why the first
       two MBTs of a thirty-minute match arrived at t=1800 and why every wave
       looked the same: it was the same handful of infantry each time.

       So the line answers the threat that has actually been SEEN - foeArms()
       is the fog-honest reading, not a peek at the enemy's roster - with a
       slow floor for the threat that has not, and a ceiling tied to
       production. Three plus two per war factory: a commander may not wall in
       ground it has no industry to hold, and the way to earn a bigger wall is
       to build the factory first. */
    const armyNow = groundArmy().length;
    const wantNow = (groundConnected ? D.waveSize : Math.max(6, (D.waveSize * 0.7) | 0)) +
                    Math.floor(G.time / 240) * 2;
    /* An army at half strength needs tanks, not a thicker wall - but the
       floor under that rule is the doctrine's, not a flat number. Fortress
       runs defenceBias 3.0 and a Fortress that builds two emplacements is not
       one, so the always-allowed minimum scales with the same knob: six for
       Fortress, three for a Gun Line, two for Shock and for everyone else.
       Past that floor an under-strength army stops the concrete. */
    /* ...unless the bank is idling: then money is not what the army lacks,
       and the wall is an oil-free place to put it */
    const armyShort = nFac >= 1 && armyNow < wantNow * 0.5 && !plan.rich;
    const defFloor = Math.max(2, Math.round(2 * (D.defenceBias || 1)));
    /* ---- the rush ----
       (measured) the land theatres were decided at ~460 s by an early wave
       arriving at a base with no emplacement, because this block waited for
       1,000 credits and a full mining fleet and then built nothing while the
       army was under half strength. The side being rushed held 0-114
       credits at the time (fulda P1 0/0/0 at t=150/300/450, korea P1
       0/0/114), so no bank floor at all while a real force has been at our
       works in the last 45 s (underThreat): the defence queue is paid before
       the unit queues, so a queued nest is funded from the next 400 credits
       that arrive. The mine rule and the half-strength rule are waived too,
       and the gun is sited at the production building nearest the trouble
       (defAnchor). */
    const hitHome = underThreat();
    let defShort = false;
    if (!dq.items.length && !dq.ready.length && (hitHome || P.cash > 1000) &&
        (!mineShort || hitHome)) {
      /* barriers (def.line) are not emplacements: a creep toward the ore
         must not stand in for a gun */
      const nDef = P.buildings.filter(b => !b.dead && b.cat === "defense" && !b.def.line).length;
      const fa0 = foeArms();
      const threat = fa0.seen + fa0.air * 0.6;
      /* ---- guns at every production building ----
         Under the victory rule a side with no production building left is
         beaten, so the ceiling counts what there is to lose - one more for
         every two production buildings past the first two - and placeReady
         puts each gun beside the production building with the least cover.
         While the bank idles the wall grows too, one more per 45 s idle
         (plan.richN) - taiwan sat on 37,500 credits and 6-33 barrels, and an
         emplacement costs no fuel. One per production building was too many
         once the plan builds barracks by income: 24 emplacements by t=480 in
         the integration smoke run of fulda (two per step had given nineteen
         in the macro stream's). */
      /* ...and money that is idling past what the fuel market will take
         (spareGuns, FUEL MARKET) raises both terms the same way */
      const spareN = spareGuns(plan);
      const wanted = (armyShort && nDef >= defFloor && !hitHome) ? 0 : Math.round(
        Math.min(2 + threat * 0.45 + G.time / 600 + plan.richN + spareN,
                 3 + nFac * 2 + (D.aggro >= 1.3 ? 1 : 0) +
                 Math.floor(Math.max(0, plan.prod - 2) / 2) + plan.richN + spareN) *
        (D.defenceBias || 1));
      defShort = nDef < wanted;
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
          /* an emplacement with no ground left is refunded by placeReady and
             written off for 70 s (failCool); asking for it again at once
             builds, fails and refunds into a vault that may be full, which is
             money thrown away - and an idle bank now asks often */
          if (!c.ok || tot <= 0 || failCool[c.id] > G.time) continue;
          const have = P.buildings.filter(b => !b.dead && b.def.id === c.id).length;
          const gap = c.w / tot - (nDef ? have / nDef : 0) +
                      (jit ? (G.rng() - 0.5) * jit : 0);
          if (gap > bestGap) { bestGap = gap; pickDef = c.id; }
        }
        if (pickDef) P.enqueue("defense", pickDef);
        else if (P.hasBuilding("factory") && !(failCool.atpost > G.time)) P.enqueue("defense", "atpost");
      }
    }
    /* -------- CREEPING TOWARD THE ORE (see macroPlan) --------
       One barrier at a time through the defence queue, and only after the
       defence roll has had its turn: enqueued ahead of it, the half-second
       wall was re-ordered on every think and the roll - which wants an empty
       queue - never ran while a creep was on. Not while the base is under
       attack. */
    if (plan.creep && !defShort && !hitHome && !dq.items.length && !dq.ready.length &&
        P.cash > 150 && P.enqueue("defense", "wall")) macro.creepN++;

    /* -------- TECH SAVINGS PLAN --------
       after the opening, hoard cash for the lab and the tech programmes
       instead of bleeding everything into tier-1 units                    */
    saveTarget = 0;
    if (!mineShort && G.time > 330 / ((D.techBias || 1) * (D.tech || 1))) {
      /* The LAB is a structure and the building queue is paid first, so from
         Veteran up the plan simply orders it: the 1,900 held here froze every
         unit purchase (taiwan P0, t=300: saveTarget 1900 with 1,570 banked)
         while the old rung waited for the same 1,900. Recruit and Regular keep
         the hoard, because their lab rung still asks the bank. The programmes
         are UPGRADES and the upgrade queue is walked last, so they keep their
         float; Tech III comes on the tier's clock, 720/D.tech (424 s at
         Warlord), rather than a flat 720. */
      if (nLab < 1 && nRadar >= 1 && (D.econ || 1) < 1) saveTarget = 1900;
      else if (nLab >= 1 && P.tech < 2 && !queueLen("upgrade")) saveTarget = 2100;
      else if (nLab >= 1 && P.tech < 3 && P.oil > 90 && !queueLen("upgrade") &&
               G.time > 720 / Math.max(0.5, D.tech || 1)) saveTarget = 3600;
    }
    /* a generational step is hoarded for exactly like a tech programme, with a
       margin so the production queues cannot shave the last few hundred
       credits off the price every time the bank creeps up to it */
    if (eraStep) saveTarget = Math.max(saveTarget, eraStep.cost + 400);

    /* -------- TECH -------- */
    if (nLab >= 1 && !queueLen("upgrade")) {
      /* never hoard toward a tier this commander is not allowed to reach */
      const cap = P.techCap === undefined ? 3 : P.techCap;
      /* Upgrades are bought in barrels too - ap 25, armour 30, optics 20,
         drive 20 - and this is where the fuel was going. Measured at Warlord:
         one construction yard, forty thousand credits, SEVEN barrels, and a
         steady drip of marginal kits each costing very nearly what the rig
         that would have doubled its build rate costs. A thermal sight on one
         tank troop does not outrank fifty per cent off every building the
         commander will ever put up, so the kits wait for the yard. */
      const upOil = (id) => (UPGRADES && UPGRADES[id] && UPGRADES[id].oil) || 0;
      if (P.tech < 2 && cap >= 2 && P.cash > 2100 && oilSpare(upOil("tech2")))
        P.enqueue("upgrade", "tech2");
      else if (P.tech < 3 && cap >= 3 && P.oil >= 90 && P.cash > 3600)
        P.enqueue("upgrade", "tech3");
      /* a marginal combat upgrade does not outrank a whole generation of
         equipment, and it is bought with fuel the step needs */
      else if (P.cash > 3800 && !eraStep) {
        for (const ug of ["ap", "armor", "optics", "drive"])
          /* The four kits are armour, gun, sight and engine for the ground
             force, and on a water theatre that force cannot reach the enemy.
             They queue behind a fleet or an air force that is short of its
             share - measured in the harness, a 25-barrel penetrator kit was
             bought while the fleet held a claim for a 12-barrel landing craft. */
          if (!P.upgrades[ug]) {
            if (oilSpare(upOil(ug)) && armOilOk("gnd", upOil(ug))) P.enqueue("upgrade", ug);
            break;
          }
      }
    }

    /* -------- EXPANSION --------
       This used to run at the very bottom of think(), after tech, army, air
       force and navy had each taken their barrels. A rig is a vehicle like any
       other and it was always last in the queue for a reserve that never had
       thirty-two in it. It is a construction decision, so it belongs up here
       with the other construction decisions, ahead of the shopping. */
    /* A commander too poor to ever bank three thousand at once never puts up a
       second yard - and P0, measured, sat on five hundred and fifty barrels
       with an empty bank for the whole match. Hoard for the rig exactly the way
       a tech step is hoarded, but only while the fuel for it is actually in
       hand, or a fuel-poor commander would stop buying an army for a vehicle it
       still could not order. */
    rigHoard = false;
    if (P.countBuilding("conyard") + rigsHeld() < 2 && P.tech >= 2 && nFac >= 1 &&
        UNITS.mcv && P.oil >= rigOilNeed() && rigOrderable() && G.time - yardBlocked > 45 &&
        rigCost() + 500 > saveTarget) {
      saveTarget = rigCost() + 500;
      rigHoard = true;
    }
    runExpansion();
    /* ---- no yard left: the rig IS the base ----
       With no yard the building queue stops outright (prodSpeed counts
       yards), and under the victory rule a side with no production building
       is beaten. The one structure still within reach is the one a rig
       unfolds into: first in line at the factory, unfolded where it stands. */
    /* ---- and the second yard as soon as the money is there ----
       A second yard is fifty per cent on every structure after it and a second
       place to build production (the victory rule). runExpansion() asks for
       one only through wantsExpansion() and at the BACK of the vehicle queue,
       and with a Heavy purse the money was gone into the army before the rig's
       turn came: in a jsc smoke run of fulda both seats still had one yard at
       t=480 after opening on 20,000. */
    const yardsNow = P.countBuilding("conyard") + rigsHeld();
    const byBudget = !plan.rich && macro.budget >= rigCost();
    /* ...but not ahead of the mining fleet (haulersOK), except as relief */
    if (nFac >= 1 &&
        (yardsNow === 0 ||
         (yardsNow < 2 && haulersOK() && (plan.rich || byBudget || P.cash > rigCost() + 1500) &&
          G.time - yardBlocked > 45)) &&
        tryBuildUnit("mcv")) {
      headOfLine("vehicle");
      if (yardsNow === 0) macro.relief++; else macro.yards++;
      if (byBudget) macro.budget -= rigCost();
    }

    /* -------- PROSPECTING --------
       A hauler may only be routed to ore this commander has actually seen, the
       same rule the player's haulers obey. That leaves one hole: a commander
       that can see no ore at all has nowhere to send anybody, earns nothing,
       and therefore never builds the scout that would have found some. So it
       prospects - it drives a hauler at the nearest ground nobody has looked
       at yet. That is searching, not seeing. */
    if (nRef >= 1) {
      /* Answered by the survey's own pass (oreFields: same test - seen, at
         least 20, not built over) instead of a walk of the ore layer every
         think. A "none" is re-asked after 4 s, so ore that has just come into
         view is not prospected past. */
      oreFields(macro.anyOre ? 20 : 4);
      const knowOre = macro.anyOre;
      const M = G.map;
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
    /* ...and a hauler already on order (ECONOMY UNITS orders the last one
       on any bank) is exactly what the sale is for, so it does not stop it */
    if (harv <= (nRef >= 2 ? 1 : 0) && P.cash < 1100 && nRef >= 1 &&
        queueLen("vehicle") <= queuedRole("vehicle", d => !!d.harvester)) {
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
    /* ---- sized to the docks, and first in line ----
       `!queueLen("vehicle")` let a hauler be ordered only into an EMPTY vehicle
       queue, and while the army is under strength buildToward keeps one or two
       vehicles in it: fulda P0 ran two haulers and kuwait P0 ONE for the whole
       battle, while taiwan - army frozen at strength, queue empty - bought
       eight. Now: one on order at a time, moved to the head of the queue,
       plan.harv (plan.perRef a dock that stands at ore - three from Commander
       up) and no flat fleet cap, none while there is no ore to be had
       (plan.noOre: none seen at all, or half the fleet standing with nothing
       it can reach - one walled-in hauler no longer stops the purchase). A
       factory has to exist, or the order sits in a queue that never moves. */
    unstickHaulers();
    spreadHaulers();
    unsealDoors();
    /* While money idles and fuel is short another hauler only adds credits
       that cannot be spent (above the vault they are discarded) and takes 8
       barrels from the army: a jsc probe of korea had P1 put 184 barrels into
       33 haulers, and 58 into combat vehicles, by t=600 with 30k banked. The
       fleet is held where it stands, never under two docks' worth. */
    /* (fuelOwn: fuel that is fine only because the market is selling it is
       still short for this purpose - see macroPlan) */
    const harvTarget = plan.rich && !plan.fuelOwn
      ? Math.min(plan.harv, Math.max(2 * plan.perRef, harv)) : plan.harv;
    /* past the first two, a hauler (8 barrels) leaves the rig reserve alone -
       on korea the second yard waited at 10 barrels while haulers took them */
    if (nRef >= 1 && nFac >= 1 && !plan.noOre && harv < harvTarget &&
        !queuedRole("vehicle", d => !!d.harvester) &&
        /* the last hauler is ordered on any bank: the queue pays as the
           money comes (kuwait smoke run: P1 held 0 haulers and 0 credits
           from t=450 to t=600 and never ordered one) */
        (harv < 2 || P.cash > 500) &&
        (harv < 2 || oilSpare((UNITS.harvester && UNITS.harvester.oil) || 8)) &&
        P.enqueue("vehicle", "harvester"))
      headOfLine("vehicle");

    /* -------- EYES --------
       "recon" appeared on no build list in this file once, so the commander
       never scouted at all; then it was bought only inside the army gate and
       counted without the queue. reconShort() counts the ramp and leaves the
       dry ones out. After the haulers, so a scout never takes a harvester's
       place at the head of the vehicle queue. */
    if (nFac >= 1 && queueLen("vehicle") < 2 && reconShort(mineShort)) tryBuildUnit("recon");

    /* -------- ARMY COMPOSITION -------- */
    /* Scouts are excluded: a reconnaissance vehicle that gets swept into the
       attack wave stops scouting and dies in the first exchange. */
    const army = groundArmy();
    const wantSize = (groundConnected ? D.waveSize : Math.max(6, (D.waveSize * 0.7) | 0)) +
      Math.floor(G.time / 240) * 2;

    /* plan.surplus: while the bank idles, buy past the launch size. The wave
       still launches on wantSize, so a richer commander does not wait longer. */
    /* ...and nothing new for the army while the mine is gone and the bank
       is empty: the infantry queue is paid before the vehicle queue, and a
       rifle squad ordered now is the hauler that never comes */
    const noMine = nRef >= 1 && nFac >= 1 && harv < 2 && P.cash < 1100 && !plan.noOre;
    if (army.length < wantSize + plan.surplus && !noMine) {
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
      /* ---- INFANTRY IS NOT WHERE UNSPENDABLE MONEY GOES ----
         Both queues fill one ceiling, and the vehicle queue is the one refused
         for fuel: at t=900 fulda P0's army was 61 infantry to 14 vehicles,
         cut at sixteen barracks. While money idles and fuel can be had - a
         rich plan that reads fuel fine, or the market feeding us (FUEL
         MARKET) - infantry keeps to INF_SHARE of the ceiling and the rest of
         it waits for the vehicles the barrels are being bought for. Short of
         money or dry, infantry is the army (infantryCap); across water it is
         home defence and the landing force. */
      const infMax = infantryCap(wantSize + plan.surplus, nFac, plan);
      let infN = 0;
      for (const u of army) if (u.def.cat === "infantry") infN++;
      macro.mkt.infN = infN; macro.mkt.infMax = infMax === Infinity ? -1 : infMax;
      if (queueLen("infantry") < 2 && infN < infMax) buildToward(mix.inf, army, "infantry");
      if (queueLen("vehicle") < 2 && nFac >= 1) buildToward(mix.veh, army, "vehicle");
      /* Eyes are bought above this gate now - see EYES. Inside it, none was
         bought while the army stood at strength. */
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
      if (!mineShort && groundConnected && wantRecovery(army) && tryBuildUnit("repair")) return;
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
        /* fuel a queued hull has been promised is not burned here either
           (committedOil, FORCE BUDGET): spent between enqueue and completion
           it refunds the hull and loses its build time */
        if (P.oil - committedOil() < m.oil) continue;
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
    /* No cash floor here. tryBuildUnit already refuses below 60% of the price
       and again below the tech savings plan, so `P.cash > 3600` on a 3,400
       airframe was a second, stricter test of the same thing - and a measured
       one: over 25 minutes of Elite play it passed 15% of the time while the
       real affordability floor of 2,040 passed far more often. Worse, cash and
       nAir are anti-correlated in time - early there are 12,000 credits and no
       aircraft, later there are aircraft and no spare cash - so the two gates
       were rarely open together and the commander fielded NO early warning at
       all in a full battle. Same flaw that once kept SAM and TEL unbuildable. */
    if (D.air && P.tech >= 3 && P.hasBuilding("airbase") && P.hasBuilding("lab") &&
        fielded("aircraft", d => d.awacs) < 1 && queueLen("aircraft") < 2) {
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
      /* Three independent attempts, not an else-if ladder. `else if` tests the
         CONDITION, not whether the purchase happened, so a commander that
         wanted a jamming vehicle and could not have one - wrong era for its
         army, or the savings plan holding the money - stopped the chain dead
         and never considered a Weasel or a Growler at all. Each now stands on
         its own and the first that actually SUCCEEDS ends the think, which
         keeps the one-purchase-a-tick discipline the rest of this file uses.
         The cash floors are gone for the reason given at the AEW block above:
         tryBuildUnit owns affordability. */
      if (foeRadar) {
        if (fielded("vehicle", d => d.jam) < 1 && queueLen("vehicle") < 3 &&
            tryBuildUnit("ewveh")) return;
        if (P.tech >= 2 && nAir >= 1 && fielded("aircraft", d => d.role === "sead") < 1 &&
            queueLen("aircraft") < 2 && tryBuildUnit("sead")) return;
        if (D.stealth && P.tech >= 3 && nAir >= 1 &&
            fielded("aircraft", d => d.role === "ewair") < 1 &&
            queueLen("aircraft") < 2 && tryBuildUnit("ewair")) return;
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
      /* ---- A FAILED PURCHASE MUST FALL THROUGH TO THE NEXT ONE ----
         (owner) "too simple even for the elite or warlord... very few
         aircrafts."
         This was an else-if ladder in which tryBuildUnit() was NOT part of the
         condition. So the moment the first branch's condition was true, the
         call was made and the ladder ENDED - whether or not anything was
         actually bought. And only NATO has a stealth bomber: pact, pla, roc,
         gbr, fra, deu and kpa all answer null for the role. Seven armies of
         eight therefore satisfied branch one, bought nothing, and never
         evaluated a single branch below it - no fighter, no gunship, no CAS,
         that tick and every tick for the rest of the match.
         It is gated on D.stealth, which is Elite and above, so the effect was
         INVERTED BY DIFFICULTY: a Regular skipped the dead branch and built an
         air force, an Elite and a Warlord did not. Measured on baltic at
         Warlord, t=1500: two airbases, 28,278 credits banked, tech 3, and an
         air force of three ASW helicopters and one AWACS.
         The `||` chain is the idiom this file already uses for the carrier
         deck a few hundred lines down, and it does the right thing: a role
         this army cannot field costs one failed lookup and the next is tried. */
      const canB = minedOut && D.stealth && P.tech >= 3 && P.cash > 4000 &&
                   fielded("aircraft", d => d.role === "stealthbomber") < 1;
      const canF = minedOut && D.stealth && P.tech >= 3 && P.cash > 2800 &&
                   fielded("aircraft", d => d.role === "stealthfighter") < 2;
      /* ---- AND A COMMANDER KEEPS A COMBAT AIR PATROL ----
         `humanAir` is the most enemy aircraft ever seen on the plot, and
         Math.min(3, 0) is 0, so `fighters < 0` is false: an army that has not
         yet been overflown never buys a fighter. Both sides start there, so
         neither ever flew and neither ever bought - a mutual deadlock in which
         the first aeroplane is never built by anybody. A floor of two is what
         an air force keeps up regardless; the ceiling still answers to what
         has actually been seen. */
      /* and the same clock on every air ceiling - see the naval note */
      const surgeA = armSurge("air");
      const wantFtr = Math.max(2, Math.min(4, humanAir)) + surgeA;
      const canA = fighters < wantFtr && P.tech >= 2;
      const canH = helos < 3 + surgeA && P.tech >= 2;
      const canC = P.tech >= 3 &&
                   fielded("aircraft", d => d.role === "cas") < 2 + surgeA;
      /* ---- the fighter is waited for, not undercut ----
         Under a fuel trickle the `||` chain buys whatever the reserve reaches
         first, and the gunship (26 bbl) is always reached before the fighter
         (30). Measured in the harness at 0.58 bbl/s: four gunships filled the
         only airbase's four pads and no fighter was ever bought, so the air
         force had nothing that could contest the sky. The fighter the ceiling
         asks for is held for, like the destroyer (fuelHold), and the cheaper
         airframes wait behind it for that bounded time. A hold is not a
         purchase: the chain answers false and the think goes on. */
      let airHold = false;
      const holdFighter = () => {
        const id = unitFor(P.faction, "fighter", P.era), def = id ? UNITS[id] : null;
        const why = def ? P.lockReason(def) : null;
        airHold = !!(why && why.indexOf("INSUFFICIENT FUEL") === 0 && fuelHold("fighter", def));
        return false;
      };
      if ((canB && tryBuildUnit("stealthbomber")) ||
          (canF && tryBuildUnit("stealthfighter")) ||
          (canA && (tryBuildUnit("fighter") || holdFighter())) ||
          (!airHold && canH && tryBuildUnit("gunship")) ||
          (!airHold && canC && tryBuildUnit("cas"))) return;
    }

    /* -------- STRATEGIC WEAPONS -------- */
    if (D.superweapon && P.tech >= 3 && nLab >= 1 && !dq.items.length && !dq.ready.length) {
      /* countBuilding for "none yet": hasBuilding sees finished structures
         only, so a silo still rising read as no silo and another was ordered
         each time the defence queue emptied - three missile silos inside two
         minutes on an idle bank in a jsc smoke run of taiwan. */
      if (!P.countBuilding("missilesilo") && P.cash > 3800) P.enqueue("defense", "missilesilo");
      else if (P.hasBuilding("missilesilo") && !P.countBuilding("nukesilo") &&
               P.cash > 6400 && P.oil > 160) P.enqueue("defense", "nukesilo");
    }
    for (const b of P.buildings) {
      if (atPeace || b.dead || !b.def.superweapon || b.swCharge < 1) continue;
      const t = pickStrikeTarget();
      if (t) G.launchSuperweapon(b, t.x, t.y);
    }

    /* -------- NAVY -------- */
    if (nYard >= 1 && queueLen("naval") < 2) {
      /* landing craft first on split maps */
      /* Lift for the landing force startAmphib() will actually embark: six a
         hull, up to three hulls. Two carried twelve of a twenty-six-man army. */
      const liftWant = Math.min(3, Math.max(2, Math.ceil(army.length / 6)));
      if (!groundConnected && fielded("naval", d => d.amphib) < liftWant && P.cash > 1200) tryBuildUnit("transport_sea");
      /* The tender is bought ahead of the fleet mixture, because a hull that
         does not sink is worth more than the next corvette, and it is bought
         on a measurement rather than on a roll. There is no roll left below it
         to be bought ahead of, but the ordering still matters: it is outside
         the cap, so a tender never costs the fleet a warship's slot. */
      if (wantTender() && tryBuildUnit("repair_sea")) return;
      /* The cap counted landing craft, the oiler, the minesweeper and the
         tender itself, so buying any one of them silently cost the fleet a
         warship's slot - which is the exact opposite of the intended effect on
         a split-map theatre where the transports already eat two of six. */
      const ships = P.units.filter(u => !u.dead && (u.layer === "sea" || u.layer === "sub") &&
        u.def.weapons.length && !u.def.amphib && !u.def.supply && !u.def.repairRate &&
        u.def.role !== "minesweeper" && u.def.role !== "navminelayer");
      /* The fleet we intend, and the cap measured against it. The cap used to
         be `ships.length`, a count of hulls, and a hull is not a unit of
         fighting power. Measured on baltic at Commander with Blue Water on
         both seats: 8 patrol boats and 20 corvettes filled a cap of 27 by
         about the sixteenth minute, after which this block never ran again for
         the rest of the match - so the destroyer, the submarine, the missile
         boat and the cruiser were never bought at all, and the commander
         finished the battle sitting on 22,500 credits with nothing left it was
         allowed to spend them on. Counting in hulls OF THE MIXTURE instead
         keeps "six warships" meaning six warships and stops a crowd of
         gunboats from standing in for a fleet. */
      const mix = navalMix(foeSea());
      const ref = hullYardstick(mix);
      let fleetValue = 0;
      for (const u of ships) fleetValue += P.factionCost(u.def) / ref;
      /* ---- NOTHING STOPS GROWING ----
         (owner) "i don't want AI has any cap and make it harder than current
         version."
         The ground army has always grown with the match - wantSize adds two
         every four minutes - and the fleet did not: it stopped dead at six
         hulls, nine on water, for the whole game however rich the commander
         got. So a Warlord with 28,000 credits banked sailed the same navy it
         had at minute five. The fleet is on the same clock as the army now,
         and the same is true of every air ceiling below. What still bounds it
         is what bounds a player: ore, ramp space and slipways. */
      /* FUEL-AWARE, and that qualification is the whole difference between a
         harder commander and a lopsided one. Measured with the ceilings simply
         removed: the fleet went from eleven hulls to twenty-two and the air
         force went from four fighters, three gunships and a Weasel to TWO
         GUNSHIPS - because at t=1500 that commander held 14,262 credits and
         TWENTY-THREE BARRELS, and an aeroplane costs between 34 and 90. The
         old cap was acting as a fuel budget without saying so. Growth past the
         base ceiling is allowed while there is fuel to spare and stops when
         there is not, so no one domain can drain the tank the others need. */
      const surge = armSurge("sea");
      let capN = Math.round((groundConnected ? 6 : 9) * (D.navalBias || 1)) + surge * 2;
      /* ---- the dome before the fleet ----
         The destroyer, the submarine and the missile boat all list `radar` in
         their prereq and the cruiser lists `lab`, while the naval yard goes up
         far earlier than either - on a split theatre it is bought before the
         Radar Dome in the build ladder outright. Until the dome is up this
         yard can cut nothing but corvettes and patrol boats, so every credit
         spent here buys a gunboat AND delays the 1,000-credit structure that
         would buy a warship: measured on baltic, the building queue took
         15,269 credits against the fleet's 34,243 and the dome did not appear
         until the twenty-fifth minute. A screening force is what a fleet
         should be at that point, so the cap is one until the dome is standing
         - four hulls, which is also exactly the strength the naval wave
         launcher needs before it will sail. */
      if (P.tech >= 2 && !P.hasBuilding("radar")) capN = Math.min(capN, 4);
      if (fleetValue < capN) {
        /* a carrier with an empty deck is a very expensive target: fill it */
        const decks = P.units.reduce((n, u) => n + (!u.dead && u.def.carrier ? u.def.carrier : 0), 0);
        if (decks > 0) {
          const embarked = count(u => u.layer === "air" && u.def.carrierCapable);
          if (embarked < decks && P.cash > 1800 && queueLen("aircraft") < 2) {
            /* cstrike last of the three on purpose: a deck wants fighters
               before it wants bombers, and where a navy has no strike
               aircraft this simply answers null and costs nothing. */
            if (tryBuildUnit("cstealth") || tryBuildUnit("cfighter") ||
                tryBuildUnit("cstrike")) return;
          }
        }
        /* A shortfall picker against a reading of the water, not a ladder of
           dice. buildToward() builds the role furthest below its intended
           share, which converges on the mixture from wherever the fleet
           actually is and recovers after losses - and, decisively here, it
           cools a role the era or the nation cannot field and redistributes
           the shortfall instead of wasting the tick on a prereq it does not
           own yet. Germany has no cruiser and no carrier in any era and grows
           neither: unitFor() answers null, the role is cooled, and the share
           goes to the hulls Germany does build. */
        buildToward(mix, ships, "naval");
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

    /* -------- SCOUTING --------
       Not here any more. It sat below fifteen purchase `return`s, so any think
       that bought something left the scouts unmanaged; driveScouts() runs from
       update() on its own clock. */

    /* expansion runs on think()'s clock like everything else here */

    /* -------- ATTACK WAVES -------- */
    /* This filter was the only line in the file that has ever seen a wave
       casualty, and it threw the information away. reapWave keeps it. */
    reapWave();
    /* a broken wave is out of attackWave and walks home on its own clock */
    steerHome();
    /* One clock, one call site. Both earlier designs fired the learner from a
       different clock than the one that reaped the wave and drifted between
       them; this runs in think(), reads G.time, and is called nowhere else. */
    learnTick();
    navalWave = navalWave.filter(u => !u.dead);

    /* WHEN TO GO is launchGate()'s question now: the old count is its
       `full` rule and no longer the only one. foeField() is read on every
       think so a contact we watch die is struck off while its sighting is
       still live. Finishing them (commitNow) shortens the cycle: a body
       leaves within seconds and reinforcements follow every twenty - but
       not straight back out after a recall (recallWave pushes waveT to 30
       and recallNext a minute out; the clamp used to cut that to 6 on the
       next think, so the recalled wave left again at once and was recalled
       again a minute later). */
    foeField();
    const wCommit = commitNow();
    if (wCommit && !wasCommit) warLog.commits++;
    wasCommit = wCommit;
    if (wCommit && G.time >= recallNext - 30 && waveT > (attackWave.length ? 20 : 6))
      waveT = attackWave.length ? 20 : 6;
    /* The gate is read from the combined operation's prep window on, so its
       H-hour (opReady) and the launch agree on what "a launch is due" means.
       COST: launchGate() is one pass over the army; foeField() and aimFort()
       are memoised on the tick. */
    const wGate = waveT <= Math.min(22, (D.waveTime || 150) * 0.3) ? launchGate(army) : null;
    opReady = !!(wGate && wGate.go);
    if (waveT <= 0 && wGate && wGate.go) {
      launchWhy = wGate.why;
      if (groundConnected) { waveT = wCommit ? 20 : D.waveTime; launchGroundWave(army); }
      else if (amphib.state === "idle") {
        waveT = D.waveTime;
        /* a landing that did not start - no beach, no loading hard, a lorry
           for an aim - is tried again shortly, as launchGroundWave() does
           when it has no target, not a whole cycle later */
        if (!startAmphib(army)) waveT = 12;
      }
    }
    /* a landing in progress is finished even if the reading of the ground
       changed under it; runAmphib() returns at once when there is none */
    runAmphib();
    /* naval bombardment group */
    /* A countermeasures vessel is not a member of a bombardment group, and
       neither is a tender or an oiler. navgun_57 makes the minesweeper pass
       the weapons test, so a 1,300-credit sweeper was being sent to shell a
       naval yard. */
    const fleet = P.units.filter(u => !u.dead && (u.layer === "sea" || u.layer === "sub") &&
      u.def.weapons.length && !u.def.supply && !u.def.repairRate &&
      u.def.role !== "minesweeper" && u.def.role !== "navminelayer" &&
      navalWave.indexOf(u) < 0 &&
      /* the hull detailed as eyes (seaScout) is not a bombardment hull */
      !u._scout);
    /* ---- when the bombardment group goes ----
       The thirty-percent roll is kept, and G.rng() is drawn on exactly the
       ticks it always was, so the seeded stream the replay depends on does
       not move. What is ADDED is the operation: the moment a supporting
       station appears that the group is not already pointed at, it goes -
       including a group that is already at sea, which `fleet` excludes, since
       only this call can re-point a hull that is not idle. navAim is a marker
       and not a clock, so this fires once per change of objective. */
    const nop = opFocus();
    const nst = nop ? opSeaStation(nop) : null;
    const roll = fleet.length >= 4 ? G.rng() < 0.3 : false;
    const swing = !!(nst && navAim !== nst.id && (navalWave.length || fleet.length >= 4));
    if (roll || swing) {
      if (swing) forceStat.swing++;
      launchNavalWave(fleet);
    }

    /* ---- air sorties ----
       This asked for order type "hover", and nothing ever puts an aircraft
       there: a new airframe is delivered shut down on its ramp, and one that
       comes home to rearm parks again. "hover" is only reached by finishing a
       move order the commander never issued. So every fighter, gunship, CAS
       aircraft and bomber the AI has ever bought sat on the apron for the
       whole match, and the air force existed only as a bill. */
    for (const a of P.units) {
      if (a.dead || a.layer !== "air") continue;
      /* the airframe detailed as eyes (airScout) is flown by driveScouts */
      if (a._scout) continue;
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
      /* `a.ammoMax &&` is not decoration. Three aircraft in the game declare
         weapons and no ammunition pool at all - nato_e00_gunshipair,
         nato_e60_gunshipair and nato_e80_gunshipair, the AC-130 - and for
         those ammoMax is 0, so this test asked 0 > 0, answered no, and
         `continue`d. Every gunship this commander ever bought was refused a
         sortie on the grounds that it was out of ammunition it does not carry.
         Measured over a 900 s battle: 10.4% of one side's entire fixed-wing
         airframe-second budget was an AC-130 sitting on the apron for that
         reason, second only to the frozen-hover bug. */
      if (a.ammoMax && !(a.ammo > a.ammoMax * 0.6)) continue;
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

    /* The defence reflex runs on its own clock in update() now (defendBase),
       so a tick that returned early on a purchase no longer leaves the base
       unwatched. */
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

  /* ---- the landing, made to work ----
     MEASURED, taiwan at Warlord: no ground contact in 1,200 seconds. One
     seat's attackWave read twelve from t=600 to the end while its landing
     craft never lost a man; the other seat's never left zero. Four defects,
     all in the two functions that used to stand here:
       - the craft were parked at (yard.x, yard.y + 2 tiles) and the troops
         walked at them. updateEnter() boards a passenger only within r + r +
         10 pixels of the craft's CENTRE - 34 for a rifle squad - and a hull
         two tiles off the beach is 48 from the nearest dry ground, so a load
         completed only when a craft happened to sit against the shore;
       - at the deadline everybody in the plan who was NOT aboard was handed an
         attackmove at the objective across the water and pushed into
         attackWave. Nothing on a split theatre replaces or withdraws that wave
         (launchGroundWave never runs; withdrawWave returns at once), so they
         stood on our own beach for the rest of the match - skipped by
         defendBase() for being wave members, and re-ordered by driveWave() on
         every think into a route that does not exist: a failed Path.find is a
         whole-landmass expansion plus a scan of every tile on the map, once
         per stranded unit per think;
       - a passenger that never boarded kept its `enter` order and followed its
         craft along the coast when it sailed;
       - the clock was `timer -= 1.6` per call and the call is once per think,
         so a Warlord's seventy-five-second loading window was forty-two
         seconds and a Recruit's two hundred and twenty.
     Now each craft berths on a HARD - a water tile touching our own dry
     ground, parked a third of a tile off its centre toward the land, so the
     hull ends within about twenty pixels of the beach whichever way it came
     in. Only a passenger SEEN aboard and now ashore joins the wave; everybody
     else is stood down where they are. The run-in is the engine's own
     `unloadAt` move - the order the player's landing uses - so the craft
     beaches as close as the water allows and puts its troops onto the nearest
     ground to the landing point. Every deadline is game time.
     FOG: our own craft, troops and yard, the published coastline, and the aim
     and beach that warAim() and findBeach() already chose off the plot. */
  function loadingHards(yard, n) {
    const M = G.map, T2 = CFG.TILE, W = M.W;
    const cx = (yard.x / T2) | 0, cy = (yard.y / T2) | 0;
    const out = [];
    const O4 = [[0, -1], [0, 1], [-1, 0], [1, 0]];
    for (let r = 1; r <= 9 && out.length < n; r++) {
      for (let dy = -r; dy <= r && out.length < n; dy++) {
        for (let dx = -r; dx <= r && out.length < n; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
          const wx = cx + dx, wy = cy + dy;
          if (wx < 1 || wy < 1 || wx >= W - 1 || wy >= M.H - 1) continue;
          if (M.terrain[wy * W + wx] !== T.WATER || G.occ[wy * W + wx]) continue;
          let land = null;
          for (const o of O4) {
            const lx = wx + o[0], ly = wy + o[1];
            if (!GameMap.passable(M, lx, ly, "ground") || G.occ[ly * W + lx]) continue;
            land = o; break;
          }
          if (!land) continue;
          let clash = false;
          for (const h of out)
            if (Math.abs(h.tx - wx) + Math.abs(h.ty - wy) < 3) { clash = true; break; }
          if (clash) continue;
          out.push({ tx: wx, ty: wy,
                     x: (wx + 0.5 + land[0] * 0.33) * T2,
                     y: (wy + 0.5 + land[1] * 0.33) * T2 });
        }
      }
    }
    return out;
  }
  /* a passenger that never got aboard stays home, rather than following a
     craft that has sailed */
  function standDown(plan) {
    for (const u of plan)
      if (!u.dead && !u.carried && u.order && u.order.type === "enter") u.give({ type: "idle" });
  }
  /* long enough to cross at the slowest craft's speed, with room for the
     engine re-planning a stalled hull */
  function sailTime() {
    const b = amphib.beach;
    let far = 0, spd = 9;
    for (const l of amphib.lsts) {
      far = Math.max(far, U.dist(l.x, l.y, b.seaX, b.seaY));
      spd = Math.min(spd, l.def.speed || 2.8);
    }
    return U.clamp(far / CFG.TILE / Math.max(0.5, spd) * 1.8 + 30, 45, 240);
  }
  /* Where the escort stands: four tiles to seaward of the landing water.
     Hulls are one movement layer with the craft and push them apart, and a
     craft only unloads within 4.5 tiles of its landing point - a fleet parked
     ON the landing water shoves the craft out of that ring. Four tiles off,
     a 76 mm or 5-inch gun still covers the beach. */
  function escortStation(b) {
    const M = G.map, T2 = CFG.TILE;
    const dx = b.seaX - b.landX, dy = b.seaY - b.landY;
    const dl = Math.hypot(dx, dy) || 1;
    const ex = U.clamp(((b.seaX + dx / dl * T2 * 4) / T2) | 0, 0, M.W - 1);
    const ey = U.clamp(((b.seaY + dy / dl * T2 * 4) / T2) | 0, 0, M.H - 1);
    const at = M.terrain[ey * M.W + ex] === T.WATER ? { x: ex, y: ey }
             : Path.nearest(M, ex, ey, "sea", null, 4);
    return at ? { x: (at.x + 0.5) * T2, y: (at.y + 0.5) * T2 } : { x: b.seaX, y: b.seaY };
  }

  function startAmphib(army) {
    if (atPeace) return false;
    const now = G.time;
    const lsts = P.units.filter(u => !u.dead && u.def.amphib);
    if (!lsts.length) return false;
    /* the beach is chosen against a KNOWN aim, so the landing keeps marching
       at the objective it was planned for even if the aim later moves - and
       never against a lorry, which will not be there when the craft are */
    const obj = warAim();
    if (!obj || obj.raid) return false;
    const beach = findBeach(obj);
    if (!beach) { forceStat.noBeach++; return false; }
    const yard = G.nearestBuilding(P, "navalyard", P.homeX, P.homeY);
    if (!yard) return false;
    const craft = lsts.slice(0, 3);
    const hards = loadingHards(yard, craft.length);
    if (!hards.length) { forceStat.noHard++; return false; }
    craft.length = Math.min(craft.length, hards.length);
    amphib.state = "loading";
    amphib.lsts = craft;
    amphib.beach = beach;
    amphib.obj = obj;
    amphib.station = escortStation(beach);
    amphib.aboard = new Set();
    amphib.until = now + 75;             // then go with what is aboard
    amphib.reT = now + 5;
    /* A craft can come home still loaded. Its passengers are part of this
       landing, and its hold has less room. */
    const plan = [];
    const left = [];
    for (const l of craft) {
      for (const u of l.cargo) { amphib.aboard.add(u.id); plan.push(u); }
      left.push(Math.max(0, (l.def.cargo || 6) - l.cargo.length));
    }
    let room = 0;
    for (const n of left) room += n;
    const h0 = hards[0];
    const fresh = army.filter(u => u.layer === "ground" && !u.def.supply && !u.carried &&
        !u.noWave && attackWave.indexOf(u) < 0 && homeward.indexOf(u) < 0)
      .sort((a, b) => U.dist2(a.x, a.y, h0.x, h0.y) - U.dist2(b.x, b.y, h0.x, h0.y))
      .slice(0, room);
    for (let i = 0; i < craft.length; i++) {
      craft[i]._hard = hards[i];
      craft[i].give({ type: "move", x: hards[i].x, y: hards[i].y });
    }
    /* round-robin into the holds that have room */
    let k = 0;
    for (const u of fresh) {
      let tries = 0;
      while (left[k] <= 0 && tries < craft.length) { k = (k + 1) % craft.length; tries++; }
      if (left[k] <= 0) break;
      u.give({ type: "enter", target: craft[k] });
      plan.push(u);
      left[k]--;
      k = (k + 1) % craft.length;
    }
    amphib.cargoPlan = plan;
    forceStat.trips++;
    return true;
  }

  function runAmphib() {
    /* ---- on a split theatre the only wave is a landed one ----
       groundConnected is read off where we BELIEVE the enemy lives, and that
       belief moves: a published start position at t=0, then the last contact,
       then the plot. A wave launched overland while the belief said "walk" is
       left on our own island when it flips, and nothing on a split theatre
       ever replaces or withdraws it - so it stood there for the match, kept
       out of the landing and out of defendBase(), re-routed every think at a
       shore it cannot cross. It is released to the reserve instead. The dead
       stay for reapWave(); a unit in a fight is left to finish it.
       Only once the split reading has held for thirty seconds: pickRival()
       re-derives it every 25 s off the believed home, and a last contact in a
       bay reads "no land route" for one period on a land theatre - which
       would idle a live overland assault on the spot. And the book goes with
       the prune, or waveSpent() reads the released hulls as casualties and
       reviewAim() writes the landing's objective off. */
    if (groundConnected) splitSince = -1;
    else if (splitSince < 0) splitSince = G.time;
    if (!groundConnected && attackWave.length && G.time - splitSince > 30) {
      let kept = 0, cut = 0;
      for (const u of attackWave) {
        if (!u || u.dead || u._landed) { attackWave[kept++] = u; continue; }
        u.flankTo = null; u._goAt = 0; cut++;
        const ot = u.order && u.order.type;
        if (ot === "attackmove" || ot === "move" || ot === "guard") u.give({ type: "idle" });
      }
      attackWave.length = kept;
      if (cut) {
        if (kept) bookWave(); else waveBook = null;
        waveGate = null; waveGateT = 0; waveMassed = false;
      }
    }
    if (amphib.state === "idle") return;
    const now = G.time, T2 = CFG.TILE, b = amphib.beach;
    amphib.lsts = amphib.lsts.filter(l => !l.dead);
    const plan = (amphib.cargoPlan || []).filter(u => !u.dead);
    amphib.cargoPlan = plan;
    if (!amphib.lsts.length || !b) { standDown(plan); amphib.state = "idle"; return; }
    const seen = amphib.aboard || (amphib.aboard = new Set());
    for (const u of plan) if (u.carried) seen.add(u.id);
    const loaded = amphib.lsts.reduce((n, l) => n + l.cargo.length, 0);

    if (amphib.state === "loading") {
      /* stalledOnMove() drops an AI move that makes no headway for ten
         seconds; a craft left short of its hard is sent on again */
      if (now > (amphib.reT || 0)) {
        amphib.reT = now + 5;
        for (const l of amphib.lsts)
          if (l._hard && l.order.type === "idle" &&
              U.dist(l.x, l.y, l._hard.x, l._hard.y) > T2 * 0.6)
            l.give({ type: "move", x: l._hard.x, y: l._hard.y });
      }
      let full = true;
      for (const l of amphib.lsts) if (l.cargo.length < (l.def.cargo || 6)) { full = false; break; }
      const waiting = plan.some(u => !u.carried && u.order && u.order.type === "enter");
      if (!full && waiting && now <= amphib.until) return;
      standDown(plan);
      if (loaded === 0) { amphib.state = "idle"; forceStat.dry++; return; }
      amphib.state = "sailing";
      forceStat.boarded += loaded;
      amphib.until = now + sailTime();
      amphib.reT = now + 5;
      for (const l of amphib.lsts) {
        if (l.cargo.length) l.give({ type: "move", x: b.landX, y: b.landY, unloadAt: true });
        else if (l._hard) l.give({ type: "move", x: l._hard.x, y: l._hard.y });
      }
      /* escort: any idle warships come along, to the escort station */
      const es = amphib.station || { x: b.seaX, y: b.seaY };
      for (const s2 of P.units) {
        if (s2.dead || s2.layer !== "sea" || s2.def.amphib || !s2.def.weapons.length || s2._scout) continue;
        if (s2.order.type === "idle")
          s2.give({ type: "attackmove", x: es.x, y: es.y });
      }
      return;
    }

    /* ---- sailing ---- */
    if (now > (amphib.reT || 0)) {
      amphib.reT = now + 5;
      for (const l of amphib.lsts) {
        if (!l.cargo.length || l.order.type !== "idle") continue;
        /* dropped short: within the old 4.5-tile test of the water we were
           aiming at is close enough to put them off; otherwise go on */
        if (U.dist(l.x, l.y, b.seaX, b.seaY) < T2 * 4.5) l.unload(b.landX, b.landY);
        else l.give({ type: "move", x: b.landX, y: b.landY, unloadAt: true });
      }
    }
    /* ashore: only a passenger that was actually aboard */
    const o = amphib.obj;
    const t = o && !(o.ref && o.ref.dead) ? o : groundTarget();
    let joined = false;
    for (const u of plan) {
      if (u.carried || !seen.has(u.id) || attackWave.indexOf(u) >= 0) continue;
      /* six units off a landing craft are the last force in the game that
         should be sent at a position the main body has decided to shell */
      if (t) {
        if (t.mode === "siege" && t.stand) u.give({ type: "guard", x: t.stand.x, y: t.stand.y });
        else u.give({ type: "attackmove", x: t.x, y: t.y });
      }
      u._landed = true;
      attackWave.push(u);
      joined = true;
      forceStat.landed++;
    }
    /* re-book, or a landing joining mid-assault raises the denominator after
       the fact and masks a wave that is in fact losing */
    if (joined) bookWave();
    if (amphib.lsts.every(l => !l.cargo.length) || now > amphib.until) {
      for (const l of amphib.lsts)
        if (l._hard) l.give({ type: "move", x: l._hard.x, y: l._hard.y });
      amphib.state = "idle";
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
        /* setOrder() writes the guard post (guardX/guardY) only for move and
           attackmove, so a guard order given to a hull on an attackmove at the
           OBJECTIVE kept that post, and the guard branch's drift-back rule
           walked the siege screen into the emplacements it was posted to stand
           off from - and, being re-ordered every think while more than four
           tiles out, dropped its path every think on the way. The post is
           written here, and a hull already posted there is left alone. */
        const posted = u.order.type === "guard" && u.guardX === t.stand.x && u.guardY === t.stand.y;
        if (!posted) {
          u.give({ type: "guard", x: t.stand.x, y: t.stand.y });
          u.guardX = t.stand.x; u.guardY = t.stand.y;
        }
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
    if (atPeace) return;
    /* Find the objective BEFORE committing anybody to it. The army used to be
       moved into attackWave first and the target looked up afterwards, so a
       tick with no target left every one of those units sitting in the wave
       list with no order at all - and because the list is only ever pruned of
       the dead, and defendBase skips anything already in it, they stayed inert
       for the rest of the match. */
    const t = groundTarget();
    if (!t) { waveT = 12; return; }                 // look again shortly

    /* ---- a broken wave is walked home before the next one leaves ----
       withdrawWave() pushes waveT past its own window, but the review that
       breaks a wave can run from the groundTarget() call just above - after
       the caller has already reset waveT - and would then sweep the survivors
       into a new wave halfway through their retreat. */
    if (homeward.length && G.time < homeUntil) {
      waveT = Math.max(3, homeUntil - G.time + 1);
      return;
    }

    /* ---- reinforce a fight, do not recall it ----
       This re-formed attackWave from the whole army every waveTime, so a wave
       that had just turned in on the objective was handed an attackmove back
       out to a fresh gate - quite possibly on the far side of the position,
       since pickApproach rotates its bearings - and a body still waiting at
       its mark lost its hold and was marched somewhere else. With a staging
       hold that is no longer a few seconds long, that is most relaunches at
       the top tiers: a seventy-five second cycle against a forty-to-sixty
       second march plus the hold.

       So, against the SAME objective: a body still holding is left to finish,
       which is seconds - the hold ends GATE_HOLD after the first arrival, and
       this wait is capped at two holds past a full cycle so a wave stuck short
       of its gate is re-planned rather than waited on. Once it has turned in,
       the units already in stay on the objective and only the rest are
       planned, as a new body with a new approach and a hold of its own. A
       different objective re-plans everybody as before, because then the
       forward units need the new gate as much as anyone. */
    const g = waveGate;
    const same = !!g && U.dist2(g.tx, g.ty, t.x, t.y) < CFG.TILE * CFG.TILE * 4;
    if (same && !waveMassed && G.time - g.t < (D.waveTime || 150) + GATE_HOLD * 2) {
      for (const u of attackWave)
        if (!u.dead && u.flankTo) { waveT = 6; engStat.waits++; return; }
    }
    const keep = [];
    if (same && waveMassed)
      for (const u of attackWave) if (!u.dead && !u.flankTo) keep.push(u);
    const body = [], room = D.waveSize + 6 - keep.length;
    for (const u of army) {
      if (body.length >= room) break;
      /* `noWave` is a seam, not a feature: a detachment on another task is
         tagged by whoever owns it and is never swept into a wave */
      if (u.noWave || keep.indexOf(u) >= 0) continue;
      body.push(u);
    }
    if (!body.length) return;

    /* ---- do not walk into a body that beats us ----
       Every gate on this path counts BODIES - the launch test is `army.length
       >= wantSize * 0.8` - and every price on the objective is concrete, so a
       full-strength wave was sent at twice its weight of armour exactly as
       readily as at an empty field. Twelve tiles is the ground a defending
       body can intervene from before the objective falls, the same order as
       pickApproach's gate ring.

       A DELAY and never a refusal, and the bound is the design: two deferrals
       of twenty seconds - forty seconds in which the factory buys the
       difference - and then the wave goes whatever the plot says. A commander
       that can talk itself out of attacking is the Fortress doctrine by
       accident, which is worse than trickling. waveT = 20 is right even for
       Fortress: the caller has just set its 999-second clock for a launch that
       did not happen, and a deferral is a retry, not a new cycle.

       Only a fresh commitment is weighed, and fresh means NO wave is out:
       the first launch, and the one after a withdrawal, which is the launch
       the ninety-second window above was sized for. With units already in on
       the objective, holding the rest back would starve a fight in progress.
       With the last wave still in the field and the aim moved on, it is
       worse: a deferral returns before attackWave is replaced, and think()
       then runs driveWave() over the OLD wave at the NEW objective - the one
       just judged too strong - so the old wave walks into it alone while the
       fresh units wait at home. A fight that is being lost is reviewAim's to
       break off, all at once.

       Below D.read 0.35 there is no reading, and a raid is exempt - standing
       off from a lorry to count tanks is how the lorry gets away. aggro sets
       the tolerance: Regular goes unless outweighed 1.04:1, Warlord presses
       on to 1.43:1. */
    if (!keep.length && !attackWave.length && (D.read || 0) >= 0.35 &&
        !t.raid && waveDefer < 2 && !commitNow() &&
        foeNear(t.x, t.y, CFG.TILE * 12) > ourForce(body) * (0.80 + 0.30 * (D.aggro || 1))) {
      waveDefer++; engStat.defers++;
      waveT = 20;
      return;
    }
    waveDefer = 0;

    /* a fresh plan: nobody carries the last body's second leg or its hold */
    for (const u of attackWave) u.flankTo = null;
    for (const u of body) u.flankTo = null;
    if (waveTurn1) {
      engStat.spread.push(Math.round((waveTurn1 - waveTurn0) * 10) / 10);
      if (engStat.spread.length > 12) engStat.spread.shift();
    }
    waveGate = null; waveGateT = 0; waveMassed = false; waveTurn0 = waveTurn1 = 0;
    planWave(body, t);
    warLog.go[launchWhy || "?"] = (warLog.go[launchWhy || "?"] || 0) + 1;
    /* Only the gated branch writes waveGate, because only it has a hold to
       protect. A reinforcement too small to gate, a siege or a fallback
       leaves no record, and the NEXT launch then reads "different objective"
       and marches the forward units back out to a fresh gate - the recall
       this block exists to stop, on every other cycle, since a top-up after
       a successful wave is routinely under six. It still reinforces THIS
       fight, so it is recorded as a body that has already turned in. */
    if (keep.length && !waveGate) {
      waveGate = { tx: t.x, ty: t.y, t: G.time };
      waveMassed = true;
    }
    if (keep.length) {
      for (const u of keep) if (attackWave.indexOf(u) < 0) attackWave.push(u);
      bookWave();
      engStat.kept += keep.length;
    }
  }

  /* the plan itself, for a body that has already been chosen */
  function planWave(body, t) {
    attackWave = body;
    lastLaunchT = G.time; warLog.plans++; waveEtaEnd = 0;
    for (const u of body) { u._goAt = 0; u._mark = null; }
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

    /* A lorry is not a position. It moves, reviewAim() re-reads it every
       think and gives it up after fifteen seconds, so a gate laid round where
       it stood at launch is a gate round nothing - and the staging hold would
       then stand the body off while the lorry drove away, and turn it in on
       the spot the lorry had left, because driveWave() leaves a holder alone.
       Straight in on the attackmove instead, and driveWave() re-aims anything
       idle at the live track. Not through the bare branch below, which clears
       the approach bearings the real objective still needs. */
    if (t.raid) {
      for (const u of attackWave) u.give({ type: "attackmove", x: t.x, y: t.y });
      return;
    }

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
    /* what this body turns in on, so the next launch can tell a fight to
       reinforce from one to re-plan. Only this branch sets flankTo, so only
       this branch has a hold to protect; launchGroundWave() writes the record
       itself for a gateless top-up of a fight already in progress. */
    waveGate = { tx: t.x, ty: t.y, t: G.time };
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
    staggerWave();
  }

  /* ---- time on target ----
     (measured) bodies were released by the clock and never by mass -
     massBody 0 against massClock 1 to 3 on every land theatre - and the
     first-to-last turn-in spread was 47 to 75 s. The hold in driveFlankers()
     waits GATE_HOLD = 22 s after the FIRST arrival, and a column that leaves
     home together does not arrive together: an IFV makes 1.73 tiles a second
     and a GPMG team 0.82, so over a fifty-tile approach the team is 32 s
     behind the carrier before the road bends once. 62% of the body can never
     be at the gate inside 22 s of the first vehicle, the clock always fires,
     and every straggler then turns in alone as it arrives: the trickle,
     re-created by the hold that was written to end it.
     A player sends the slow elements first, and so does this. Each hull's
     straight-line time to its OWN mark (the hook group's is further round)
     at its own road speed; the body is timed to arrive at the 80th
     percentile of those; every hull that would be more than three seconds
     early is held at home, idle, until its own departure time, and
     driveFlankers() sends it on. The slowest fifth leave at once and are
     late, which is what the hold is for. No hull waits more than
     STAGGER_MAX, so a fast body never idles at home a minute behind one slow
     team. An idle hull at home still acquires and still answers fire; it is
     in attackWave, so neither driveWave() (it carries flankTo) nor
     defendBase() gives it anything else to do.
     Why idle and not guard: setOrder() writes the guard post only for move
     and attackmove, so a guard given after the attackmove to the gate would
     walk the hull to the gate on its drift-back rule.
     COST: one pass over the body per launch and one sort of at most
     D.waveSize + 7 numbers. No path, no A*. */
  const STAGGER_MAX = 45;
  function staggerWave() {
    const now = G.time, T2 = CFG.TILE, eta = [];
    for (const u of attackWave) {
      if (u) u._goAt = 0;                        // the clearer joins after planWave's reset
      if (!u || u.dead || u.carried || !u.flankTo) continue;
      const o = u.order;
      if (o.type !== "attackmove") continue;
      u._mark = { x: o.x, y: o.y };
      /* a hull with a dry tank does not set the pace: its ETA held every
         other hull the full STAGGER_MAX */
      const sm = u.speedMul();
      if (!(sm > 0)) continue;
      const sp = Math.max(0.3, (u.def.speed || 1) * sm);
      /* only a hull standing at home is held: a survivor re-planned onto a
         new objective, or a raider just recalled, does not idle in the
         enemy's ground for up to 45 s */
      eta.push({ u, t: U.dist(u.x, u.y, o.x, o.y) / T2 / sp, home: P.inBaseRadius(u.tx, u.ty) });
    }
    if (eta.length < 4) return;
    const ts = eta.map(e => e.t).sort((a, b) => a - b);
    const arrive = ts[Math.min(ts.length - 1, Math.floor(ts.length * 0.8))];
    /* roads, bends and traffic stretch every leg, and by different amounts,
       so the hold stays open a third longer than the plan (holdEnd below) */
    waveEtaEnd = now + Math.min(90, arrive * 1.35 + 10);
    let n = 0, most = 0;
    for (const e of eta) {
      const wait = Math.min(STAGGER_MAX, arrive - e.t);
      if (wait < 3 || !e.home) continue;
      e.u._goAt = now + wait;
      e.u.give({ type: "idle" });
      n++;
      if (wait > most) most = wait;
    }
    warLog.staggered += n;
    warLog.lastWait = Math.round(most);
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
    /* ---- the wave turns in as one body ----
       Every unit here was handed the same gate and the same flankTo, so the
       gate has always been a rally point in everything but name; what was
       missing was the wait. This released each unit the instant IT arrived,
       so a column that left home together - an IFV at 1.73 tiles a second, an
       MBT at 1.53, the clearer at 1.25, over forty-odd tiles of road - crossed
       the start line in arrival order and met the defence in ones and twos.
       And driveWave() never looked at flankTo at all: it handed an attackmove
       at the OBJECTIVE to anything idle, which is exactly the state a unit is
       in once it has reached its gate, and update() runs think() before this.
       Any hold here was undone within one think. driveWave() now leaves a
       unit that carries flankTo alone, and this block owns it until it turns
       in.

       "At the mark" is idle or guard - an attackmove completes to idle - or
       still on the attackmove to its mark but inside GATE_R. The second half
       matters: stepAlong() finishes a trip only within 0.45 of a tile of the
       exact point, the first arrivals park on that point, and the separation
       push acts on the mover alone, so later arrivals can be left jostling a
       tile or two out on an order that never completes. Counted by order type
       alone, such a body can read as a handful of arrivals indefinitely. The
       mark is each unit's own order point, so the hook group, sent further
       round, is staged at its own waypoint.

       Released when 62% of the units still holding are at their marks, or
       GATE_HOLD seconds after the first got there - it must never be able to
       wait for ever on something that is not coming, and the clearer hold
       below now has a bound of its own for the same reason. waveMassed is
       sticky for the body: a straggler that arrives after the rest have gone
       in follows at once rather than standing at an empty gate. The next
       launch resets it, and so does an objective that moves during the
       hold.

       Cost: this ran every frame and scanned P.units in wavePoint() on every
       frame the wave was marching. It now runs at 4 Hz, counts at most
       D.waveSize + 7 units, and looks the clearer up - one indexOf on the
       wave - only once the body has been released. A quarter of a second on
       a release is nothing. */
    flankClock -= dt;
    if (flankClock > 0) return;
    flankClock = 0.25;
    const now = G.time, R = CFG.TILE * GATE_R, R2 = R * R;
    let held = 0, staged = 0;
    for (const u of attackWave) {
      if (!u || u.dead) continue;
      if (!u.flankTo) { u._goAt = 0; continue; }
      held++;
      /* Time on target (staggerWave): a hull still waiting at home is part
         of the body and is not at its mark. When its time comes it leaves for
         its own gate - or, if the body has already turned in, straight for
         the objective, since there is nobody left at the gate to wait with. */
      if (u._goAt) {
        if (now < u._goAt) continue;
        u._goAt = 0;
        if (waveMassed) {
          /* a late departure is not a turn-in: ENGAGE.spread is not stretched */
          u.give({ type: "attackmove", x: u.flankTo.x, y: u.flankTo.y });
          u.flankTo = null; held--;
        } else if (u._mark) u.give({ type: "attackmove", x: u._mark.x, y: u._mark.y });
        continue;
      }
      if (atMark(u, R2)) staged++;
    }
    engStat.held = held; engStat.staged = staged;
    if (!held) return;
    /* ---- the objective moved while the body stood at its gate ----
       flankTo was fixed at launch and driveWave() no longer re-aims a holder,
       so a body whose objective reviewAim() has since dropped - written off
       as defended, which it typically decides while this body stands at the
       gate looking at it, or taken, or overtaken by a better one - would
       stand out its hold and then walk into the position the commander had
       just decided not to fight for. A siege flip keeps x and y but hands the
       wave to runSiege(), whose guard post would otherwise read as "at the
       mark" here and release the screen onto the emplacements. Either way
       the hold is over: the holders go back to driveWave() or runSiege()
       from where they stand, and the next launch re-plans. With no aim at
       all they wait at the gate, in the wave, until there is one. */
    if (waveGate && (!aim || (aim.mode === "siege" && aim.stand) ||
        U.dist2(aim.x, aim.y, waveGate.tx, waveGate.ty) > CFG.TILE * CFG.TILE * 4)) {
      /* A hull still waiting at home for its departure (staggerWave) leaves
         the wave: with no gate - and perhaps no aim - it would stand idle
         there inside attackWave, where neither driveWave() nor defendBase()
         gives it anything to do. The book follows, or waveSpent() reads the
         released hulls as losses. */
      const before = attackWave.length;
      attackWave = attackWave.filter(u => {
        if (u && u._goAt) { u._goAt = 0; u.flankTo = null; return false; }
        return true;
      });
      if (attackWave.length !== before) bookWave();
      for (const u of attackWave) if (u && u.flankTo) u.flankTo = null;
      waveGate = null; waveGateT = 0; waveMassed = false;
      engStat.dropped++; engStat.held = engStat.staged = 0;
      return;
    }
    if (staged && !waveGateT) waveGateT = now;
    if (!waveMassed) {
      const full = staged >= Math.ceil(held * 0.62);
      /* The hold lasts at least GATE_HOLD past the first arrival and, for a
         staggered body, until a third past its planned arrival - never more
         than a minute past the first arrival, so it cannot wait for ever on
         something that is not coming. */
      const holdEnd = Math.min(waveGateT + 60, Math.max(waveGateT + GATE_HOLD, waveEtaEnd));
      if (!full && !(waveGateT && now > holdEnd)) return;
      waveMassed = true;
      if (full) engStat.massBody++; else engStat.massClock++;
    }
    /* The clearer paces only a body it is marching with, and for at most two
       holds. With driveWave() no longer turning a holder in, this test is
       final: wavePoint() answers with ANY clearer, and one bought after the
       body left - which at D.read 1.0 is exactly when mine signs run hot, in
       mid-march - sits at the factory or sweeps near home, every unit at the
       gate is nearer the objective than it is, and nothing would turn in
       until the next launch: a full waveTime, 999 s under Fortress. One with
       the body but stuck on its attackmove, which has no stall check, would
       do the same. waveGateT is always set here, because a release needs at
       least one unit at its mark. */
    let lead = wavePoint();
    if (lead && (attackWave.indexOf(lead) < 0 || now - waveGateT > GATE_HOLD * 2)) lead = null;
    for (const u of attackWave) {
      if (!u || u.dead || !u.flankTo || u._goAt || !atMark(u, R2)) continue;
      if (lead && lead !== u && !lead.dead &&
          U.dist2(lead.x, lead.y, u.flankTo.x, u.flankTo.y) >
          U.dist2(u.x, u.y, u.flankTo.x, u.flankTo.y)) continue;
      u.give({ type: "attackmove", x: u.flankTo.x, y: u.flankTo.y });
      u.flankTo = null;
      if (!waveTurn0) waveTurn0 = now;
      waveTurn1 = now;
    }
  }
  function atMark(u, R2) {
    const o = u.order;
    /* Fighting at the gate is being at the gate. An arrival that acquires
       something on its last few tiles holds an attack order, not an
       attackmove, and was never counted - so the body read short and went
       on the clock. Half as far again as GATE_R, from the mark it was given. */
    if (o.type === "attack" && o.auto && u._mark)
      return U.dist2(u.x, u.y, u._mark.x, u._mark.y) < R2 * 2.25;
    return o.type === "idle" || o.type === "guard" ||
           (o.type === "attackmove" && U.dist2(u.x, u.y, o.x, o.y) < R2);
  }
  /* ================= COMBINED OPERATIONS =================
     (owner) "make a lot of combination army, air force, navy together to
     attack."

     The three services were launched by three unrelated pieces of code.
     launchGroundWave() went at warAim(); launchNavalWave() went at
     navalTarget(), whose first rule is the first remembered naval yard in Map
     insertion order anywhere on the map; and each aircraft asked
     pickAirTarget(), whose gunship branch hands out the nearest heavy contact
     TO THE AIRCRAFT. Three answers, three places, and no timing.

     AN OPERATION is the objective warAim() has already chosen - off the plot,
     with the hysteresis it already carries - plus a WINDOW in which the fleet
     and the air force are pointed at it too. No new objective chooser, and
     the ground arm is not touched: it is already on the aim.

       form     nothing coordinated; the fleet hunts the enemy yard and the air
                force hunts for itself, as before.
       prep     the last min(22, 0.3 x waveTime) seconds before a launch that
                is actually due (opReady): the fleet swings onto a firing
                station off the objective and every strike airframe that
                launches is handed the gun covering it. Air and sea are
                released EARLY - the ground wave is never held LATE, because
                a hold is a stall waiting for an arm that may never come.
       assault  for min(45, 0.6 x waveTime) seconds after the wave is booked.
                A WINDOW and not a latch: attackWave is never emptied between
                launches, so "a wave exists" would be true all match and the
                prep phase would never be seen again.
       landing  on a water theatre, while the craft load and sail: the fleet
                takes station four tiles off the beach (escortStation) and the
                air force works over the guns covering the landing point as
                well as the objective.

     It pays off through machinery already here: objectives() prices an
     objective as its worth minus the fire covering it, and reviewAim() case 3
     walks a besieging wave in once that price falls under 35% of the prize,
     so a gun killed from the air during prep turns a siege into a storm.

     ABSENT SERVICES degrade to today's code: no water within reach of the
     objective answers null and navalTarget() runs its old rules; no air force
     means nothing asks opAir(); Recruit (read 0) coordinates nothing.

     FOG: warAim() and the beach off the plot; seenB filtered to the rival as
     objectives() filters it, with r.ref touched only for .dead and to ask OUR
     aircraft canTarget() - the convention pickEmitter() documents; seenU only
     through trackedEntity(); gunProfile() off the published tables; the
     coastline through Path.nearest. No enemy roster, cash or production.

     RELEASE AUTHORITY: opAir() refuses any airframe carrying a single held
     round, because the sortie loop issues a commanded attack and a commanded
     attack releases. HARM and ballistic rounds stay where the owner put them.

     COST: opPhase() is O(1). opAir() walks seenB and seenU once per idle
     strike airframe per think inside a window - the gunship branch below
     already walks seenU the same way. opSeaStation() is one ring scan,
     memoised on the objective. The limit, stated: only an airframe that is
     idle is re-tasked, so one mid-sortie keeps its target until it is home;
     a strike aircraft with nothing held on radar already sweeps to the aim. */
  const OP_R = 8;                // tiles: armour "standing on" the objective
  const OP_SEA = 9;              // tiles: navalTarget()'s own sea-reach figure
  let navAim = null;             // what the bombardment group was last pointed at
  let opReady = false;           // think(): a launch is actually due
  let opSt = null, opStId = null, opStT = -1e9;   // the firing station, memoised on the aim
  const opHit = new Map();       // structure id -> when an airframe was last sent at it

  function opPhase() {
    if ((D.read || 0) < 0.35) return "none";
    if (amphib.state === "loading" || amphib.state === "sailing") return "landing";
    const now = G.time, cyc = D.waveTime || 150;
    if (attackWave.length && waveBook && now - waveBook.t < Math.min(45, cyc * 0.6)) return "assault";
    if (opReady && waveT <= Math.min(22, cyc * 0.3)) return "prep";
    return "form";
  }
  /* The operation: the phase and the one objective. A raid is not an
     operation - a lorry held for fifteen seconds is not worth swinging a
     fleet onto. */
  function opFocus() {
    const p = opPhase();
    if (p === "none" || p === "form") return null;
    if (p === "landing") {
      const b = amphib.beach, o = amphib.obj;
      if (!b || !o) return null;
      const es = amphib.station || { x: b.seaX, y: b.seaY };
      return { t: o, phase: p, at: { x: b.landX, y: b.landY },
               sea: { id: "beach:" + o.id + ":" + b.tx + "," + b.ty, key: "beach",
                      x: es.x, y: es.y } };
    }
    const t = warAim();
    if (!t || t.raid) return null;
    return { t: t, phase: p, at: t, sea: null };
  }
  /* What an airframe is worth flying IN SUPPORT, and nothing else: the guns
     that cover the objective (or the beach) by objectives()' own garrison
     test - gunProfile() range, not a flat radius, since the envelopes run
     from a nest's 6.0 tiles to a howitzer bunker's 16.0 - and live armour
     standing on it. Null means nothing there is worth suppressing, and the
     caller carries on exactly as it did. */
  function opAir(a, op) {
    const ws = a.def.weapons || [];
    for (let i = 0; i < ws.length; i++)
      if (a.manualWeapon && a.manualWeapon(WEAPONS[ws[i]])) return null;
    const rid = rival ? rival.idx : -1;
    const pts = op.at === op.t ? [op.t] : [op.at, op.t];
    /* Every idle strike airframe launches from the same ramp, so a score
       that depends only on the building type sent all of them at the same
       emplacement. A gun another airframe was sent at in the last 20 s is
       taken only when nothing else covers the objective, and nearer guns
       rank a little higher. */
    const now = G.time;
    if (opHit.size > 64) for (const [k, t0] of opHit) if (now - t0 > 60) opHit.delete(k);
    let best = null, bv = 0, spare = null, sv = 0;
    for (const r of seenB.values()) {
      if (r.gone || !r.ref || r.ref.dead || (rid >= 0 && r.own !== rid)) continue;
      const g = gunProfile(r.key);
      if (!g) continue;                          // no ground weapon: not in this war
      const R2 = Math.pow(g.range * CFG.TILE, 2);
      let covers = false;
      for (const p of pts) if (U.dist2(r.x, r.y, p.x, p.y) < R2) { covers = true; break; }
      if (!covers || !a.canTarget(r.ref, true)) continue;
      const v = (g.hard + g.soft) / (1 + U.dist(a.x, a.y, r.x, r.y) / CFG.TILE * 0.05);
      if (now - (opHit.get(r.id) || -1e9) < 20) { if (v > sv) { sv = v; spare = r; } continue; }
      if (v > bv) { bv = v; best = r; }
    }
    const gun = best || spare;
    if (gun) { opHit.set(gun.id, now); return gun.ref; }
    const RA = Math.pow(OP_R * CFG.TILE, 2);
    let bd = Infinity;
    for (const r of seenU.values()) {
      if (r.layer !== "ground" || r.harvester || (rid >= 0 && r.own !== rid)) continue;
      let near = false;
      for (const p of pts) if (U.dist2(r.x, r.y, p.x, p.y) < RA) { near = true; break; }
      if (!near) continue;
      const e = trackedEntity(r);
      if (!e || !(e.armor === "heavy" || e.armor === "light")) continue;
      if (!a.canTarget(e, true)) continue;
      const d = U.dist2(a.x, a.y, e.x, e.y);
      if (d < bd) { bd = d; best = e; }
    }
    return best;
  }
  /* The fleet's firing station: the beach during a landing, otherwise the
     nearest water to the objective that (a) our hulls can shoot from - no
     further out than the longest ground-capable gun afloat, since OP_SEA's
     nine tiles is past navgun_57's 7.2 - and (b) our fleet can sail to from
     the yard, by one sea A* (readTheatre's test). Rivers are carved on
     taiwan, korea and fulda; without (b) driveWave() re-issued a failing
     route to every idle hull every think inside a window. No such water
     means an inland objective this service cannot support, and the answer is
     null: navalTarget() keeps its old rules. Memoised per objective for 60 s,
     so a fleet that grows re-asks. */
  function opSeaStation(op) {
    if (op.sea) return op.sea;
    const t = op.t;
    if (opStId === t.id && G.time - opStT < 60) return opSt;
    opStId = t.id; opStT = G.time; opSt = null;
    const M = G.map, T2 = CFG.TILE;
    let reach = 0;
    for (const u of P.units) {
      if (u.dead || u.cat !== "naval" || !u.def.weapons) continue;
      for (const wn of u.def.weapons) {
        const w = WEAPONS[wn];
        if (!w || (w.tgt && !w.tgt.ground) || (u.manualWeapon && u.manualWeapon(w))) continue;
        if (w.range > reach) reach = w.range;
      }
    }
    const R = Math.min(OP_SEA, Math.floor(reach) - 1);
    if (R < 2) return null;
    const tx = U.clamp((t.x / T2) | 0, 0, M.W - 1);
    const ty = U.clamp((t.y / T2) | 0, 0, M.H - 1);
    const sp = Path.nearest(M, tx, ty, "sea", null, R);
    if (!sp) return null;
    const yard = G.nearestBuilding(P, "navalyard", P.homeX, P.homeY);
    const from = yard ? Path.nearest(M, (yard.x / T2) | 0, (yard.y / T2) | 0, "sea", null, 6) : null;
    if (!from) return null;
    if (Math.abs(from.x - sp.x) + Math.abs(from.y - sp.y) > 4) {
      forceStat.seaA++;
      const p = Path.find(M, from.x, from.y, sp.x, sp.y, "sea", null);
      const end = p && p.length ? p[p.length - 1] : null;
      if (!end || Math.abs(end.x - sp.x) + Math.abs(end.y - sp.y) > 4) return null;
    }
    opSt = { id: "op:" + t.id, key: "opstation", x: (sp.x + 0.5) * T2, y: (sp.y + 0.5) * T2 };
    return opSt;
  }

  /* The bombardment group. Three fixes, two of them ones launchGroundWave has
     already had:
       - the objective is found BEFORE anybody is committed to it; this used to
         assign navalWave and then look the target up, so a tick with no
         target left the hulls in the list with no order at all;
       - it TOPS UP rather than re-slicing. `fleet` at the call site excludes
         everybody already in navalWave, so `navalWave = fleet.slice(0, 6)`
         with a group at sea raised a second group out of the leftovers and
         orphaned the first, which then had no driver at all;
       - no flat six. (owner) "i don't want AI has any cap": three quarters of
         the armed fleet sails, at least six, and the rest screens home.
     A hull already on an attackmove to this point is left alone, so a group
     on station is not re-pathed every time the roll comes up; so is one in an
     engagement, and one on a plain move, which is somebody else's order - the
     oiler rendezvous in logisticsStation(). Either comes back idle, and
     driveWave() points it at the station then. */
  function launchNavalWave(fleet) {
    if (atPeace) return;
    const t = navalTarget();
    if (!t) return;
    const cap = Math.max(6, Math.ceil((navalWave.length + fleet.length) * 0.75));
    if (navalWave.length < cap)
      navalWave = navalWave.concat(fleet.slice(0, cap - navalWave.length));
    navAim = t.id === undefined ? null : t.id;
    for (const u of navalWave) {
      if (u.dead) continue;
      const o = u.order;
      if (o.type === "attack" || o.type === "move") continue;
      if (o.type === "attackmove" && U.dist(o.x, o.y, t.x, t.y) < CFG.TILE * 3) continue;
      u.give({ type: "attackmove", x: t.x, y: t.y });
    }
  }

  /* ---- CONCENTRATION: several guns on one hull ----
     Unit.acquire() now prefers the wounded and the valuable, but it only runs
     while a hull is idle, on guard or on attackmove. Once a hull has an
     attack order, engage() holds that target until it dies - so six tanks
     meeting three at once split two-two-two and stay split, and the HP term
     never gets a say until something dies. That lock is the part only a
     commander can break, and this is the commander breaking it, for guns that
     can switch without taking a step.

     WHERE THE CANDIDATES COME FROM, and why it does not cheat. They are the
     targets the wave's own hulls are already engaging - but an engagement is
     NOT proof of sight: retaliate() answers a shooter it never looked at, a
     sonar platform keeps its submarine after the contact is lost, and any
     target keeps its order after it walks into fog. So every one is put
     through the commander's own picture first: seenU, and trackedEntity(),
     which answers only while liveTrack() holds - the same gate pickAirTarget
     and defendBase already use before handing a live entity to a gun - and,
     tighter than theirs, a sighting no older than PEEK seconds. liveTrack()
     accepts five, but intelSweep() re-stamps everything in view every 0.8,
     so five would let this read the hit points of a hull that walked into
     fog four seconds ago; PEEK = 1.5 is "seen on the last sweep", with room
     for a long frame. What fails is not counted, not scored and not
     remembered. Its class comes off the sighting record, which wrote role
     and harvester down at contact; hit points, position and armour are read
     off the entity only after the gate, i.e. while we are looking at it. A
     structure the wave is shooting is recognised from seenB (our own record
     of it, identity-checked) and simply skipped: it is not what this is for.
     Air targets are left out entirely: a ground wave's concentration is not
     for aircraft, whose tracks leave reach in seconds. Then each hull asked
     to switch applies acquire()'s own gate list for itself
     (Unit.retarget -> acqGate), so the call never reaches a gun that could
     not have picked it up unaided.

     WHAT IT DECIDES. Per target: the fire already landing on it from hulls
     in reach, as published expected damage a second (pickWeapon's own
     expression). A target that fire kills inside CALL_WIN seconds is COVERED
     and is not a candidate - picking it would be choosing overkill, and
     scoring the most nearly dead thing highest was how the first draft of
     this chose a corpse every think and moved nobody. The rest score on
     value per hit point still to be delivered, value being 1/roleWeight()
     from the same table the crews use.

     AND THEN - added after a census showed this whole block was inert - by
     whether anybody can actually shoot the thing. The counters said calls 148
     and moved 15 on fulda at Warlord; instrumenting every branch of the move
     loop for the same match said why, and it was not one of the economic
     tests. Of 1742 hulls that reached the loop as candidates, 929 were thrown
     out by ONE line - reachDps(u, call) came back zero - and of those 929,
     gNoWep was 0 and gTooNear was 0: not one was a gun that could not hurt
     the call, every single one was simply too far from it. Mean distance to
     the call 20.2 tiles against a mean weapon reach of 8.37; only 56 of the
     929 stood inside 1.5 times their own reach and 309 stood beyond three
     times it. After the tube rule (271) and the lockout (24), 961 guns were
     priced and 929 of them could not fire: 32 hulls in a whole match reached
     the named target, and the wave loop moved 10 of them (the other 5 of the
     reported 15 came from the older concrete pass at the bottom of this
     function, which is a different loop). The economics decided 22 cases in
     13 minutes. THE DECISION LOGIC WAS NEVER THE PROBLEM; the candidate pool
     was empty, because the call was chosen by value per hit point over the
     whole wave while the move test is local, so the commander kept naming a
     hull on the far side of a strung-out column.
     So the choice is now made on both: shortlist the four best-scoring
     targets, and for each ask what fire the wave could ADD to it right now -
     the same reachDps every candidate is priced with, over the same hulls the
     move loop would consider - then take the one with the best score times
     the share of its remaining need that added fire closes inside CALL_WIN.
     A target nobody can reach scores zero and is never named, so `calls` now
     counts calls somebody can answer rather than wishes. The shortlist is
     what keeps it cheap: four targets, one wave pass each.
     WHAT THAT BOUGHT, and split the way the two loops actually earned it:
     Same binary, same seeds, fulda at Warlord, three seeds x both seats, with
     the expected hit points each of the two move sites puts onto the call
     counted SEPARATELY, because they are different loops and they did not gain
     the same thing. Over the six commanders the WAVE LOOP - the one this whole
     diagnosis is about - moved 64 hulls before and 66 after, which is nothing;
     but it put 1738 expected hit points onto called targets before and 2489
     after (+43%), because the hulls it moves are now standing next to the
     thing they are sent at. The older concrete pass at the bottom of this
     function is the bigger winner by hull count, 13 moves to 25 and 478
     expected hit points to 1064, because addable() lets an armed contact be
     named only when somebody can reach it - and a gun shelling a shed counts
     as somebody. Calls fell 686 to 152 and dry calls 635 to 97: the commander
     stopped naming things it could not shoot. Time to kill a call somebody was
     actually switched onto fell from 13.9 s to 4.0 s, and the rate of fire
     onto one from 17.5 to 25.5 hit points a second.
     WHAT GOT WORSE, so that nobody has to find it later: the wave's own
     losses, 162 hulls to 180 over the six commanders. Two seats worse, one
     better, two bit-identical. The matches diverge at the first call that
     differs, so those are different battles rather than a controlled cost and
     this is not proof of harm - but it is not nothing either, and a gun moved
     onto the call does stop shooting whatever is shooting it. That is exactly
     what the 0.6-of-present-rate test below bounds, and it is the number to
     watch if this is ever loosened.
     CALL_WIN = 2 s and the bias is stated rather than hidden: the estimate
     leaves out fireCtrl, aspect and veterancy (delivered fire is HIGHER, so
     the call closes late and leans to overkill) and turret slew, cooldowns
     and flight time (delivered fire is LOWER inside the window). They are
     not guaranteed to cancel; the overkill-rate census is what tunes it.

     WHO MOVES. Only a hull on an automatic engagement, not routed, not a
     tube (the siege line is runSiege's), not switched in the last three
     seconds, and only off a target that - with this hull's fire taken away -
     is worth less than half the call. And only a gun that can HURT the call:
     groundArmy() includes infantry, and the published rates are an MG team at
     49 a second into a rifle squad and 2.9 into a tank, an AT team 12.9 into
     a tank and 4.8 into riflemen. Without a test, a wounded tank pulled every
     MG off the infantry it exists to kill, and each one took so little off
     the call's need that the loop went on moving the next. So a gun moves
     only if it would put at least 0.6 of its present rate into the call -
     0.25 when it is surplus on a target that dies without it anyway.
     Surplus guns go FIRST: pass one takes only guns whose present target
     stays covered once they leave it, which is the overkill control; pass
     two applies the ordinary rule to everyone left. A single pass in wave
     order let hulls on healthy targets fill the call before any surplus gun
     was reached.
     A siege screen on guard that has acquired something IS in here, and may
     switch between two things already in its reach; it never leaves its
     post for it, because retarget() refuses any target that would cost a
     step.

     COST, per commander per think at Veteran and above: one pass over
     attackWave (<= D.waveSize + 7, 37 under the turtle personality) with one
     or two Map lookups and one pickWeapon each; one pass over the at most
     that many targets; then at most two passes over the wave, each costing a
     hull it considers two pickWeapon calls and, if it gets that far, one
     acqGate and one pickWeapon in retarget(), stopping when the call is
     covered. Pass one only prices hulls whose target is already covered.
     Worst case about seven pickWeapon calls a wave hull, ~260 a think.
     One Map, allocated only when a wave hull is engaged. No grid query, no
     map walk, nothing quadratic, and no A*: retarget() never goes through
     setOrder and keeps `resume`, so no path is dropped by it and a kill
     returns the hull to its own attackmove leg rather than to idle.  */
  const CALL_WIN = 2, PEEK = 1.5;
  let lastCall = null;
  /* bldRuns/bldCalls/bldDry: thinks with ONE contact where only hulls on
     concrete could be moved - kept apart so `dry` still measures calls
     between contacts */
  const callLog = { runs: 0, calls: 0, kept: 0, moved: 0, dry: 0, covered: 0, fog: 0, bld: 0,
                   offBld: 0, bldRuns: 0, bldCalls: 0, bldDry: 0,
                   /* noReach: shortlisted targets passed over because the wave
                      could not add one round to them from where it stands.
                      noCall: runs where that was true of the whole shortlist.
                      allCov: runs where the shortlist was EMPTY instead,
                      because every contact in the picture was already dying -
                      a different silence, and one the old build kept too.
                      Counting the two apart is what lets `calls` be read at
                      all: noReach large against calls is the commander
                      declining to wish, allCov is a picture with nothing left
                      to decide. */
                   noReach: 0, noCall: 0, allCov: 0 };
  /* ---- how much better the call must be ----
     (measured) 226 calls moved two hulls in the elite census, and 190 of 194
     calls were dry on korea. A gun on a target that its move would leave
     uncovered was only moved when that target, without it, scored under HALF
     the call - i.e. the call had to be twice as attractive, which between two
     healthy hulls of the same class never happens (1.14 against 1.00 for a
     tank already taking two guns' fire). Focus fire is the case where the
     call is merely clearly better: 1.3 moves a gun off a fresh tank onto one
     at 60% (2.08 against 1.00) or onto any gun, and keeps two near-equal
     targets from trading guns every think. */
  const CALL_GAIN = 1.3;
  /* hit points the call still needs after CALL_WIN seconds of what is on it */
  function callNeed(t, c) { return t.hp - c.dps * CALL_WIN; }
  function callScore(t, c) {
    const need = callNeed(t, c);
    if (need <= 0) return -1;
    return t.maxHp / Math.max(need, t.maxHp * 0.04) / roleWeight(c.role, c.harvester);
  }
  /* published expected damage a second from this hull into this target, or 0
     when the weapon it would use is not in reach from where it stands */
  function reachDps(u, t, pad) {
    const wi = u.pickWeapon(t);
    if (wi < 0) return 0;
    const w = WEAPONS[u.def.weapons[wi]];
    if (!w) return 0;
    const d = U.dist(u.x, u.y, t.x, t.y);
    /* `pad` is retarget()'s margin: a gain priced at the full range was a
       gun retarget() then refused between 0.86 and 1.0 of it */
    if (d > u.weaponRange(w) * (pad || 1) ||
        d < (w.minRange || 0) * CFG.TILE * (pad ? 1.1 : 1)) return 0;
    return (w.dmg || 0) * (w.burst || 1) * (w.acc !== undefined ? w.acc : 0.8) *
           CFG.dmgMult(w.warhead, t.armorClass()) / Math.max(0.4, w.reload || 1);
  }
  /* A hull whose automatic engagement is actually being fought. A routed one
     keeps its attack order - runAway() never touches it - but update()
     returns before engage(), so its fire is not landing and must not make a
     target look covered. Carried hulls and aircraft are not this code's. */
  function autoFight(u) {
    const o = u && !u.dead && !u.carried && !(u.routT > 0) && u.layer !== "air" ? u.order : null;
    return !!(o && o.type === "attack" && o.auto && !o.release && o.target);
  }
  /* ---- an UPPER BOUND on the fire the wave could ADD to this target ----
     The number the call was chosen without. Every hull counted here is one the
     move loop below also prices - an automatic engagement, not already on this
     target, not a tube, not inside the three-second lockout, and shooting
     something that is itself in the gated picture - and it is priced with the
     very same reachDps(u, t, 0.86) the loop prices it with. Hulls on concrete
     are added by the caller, on the terms the onBld pass spends them.

     IT IS A BOUND, NOT AN EQUALITY, and the tests it leaves out are the loop's
     own: the pass-0 surplus rule, `left * CALL_GAIN > best`, the
     gain-against-0.6-of-my-present-rate ratio, and everything retarget() adds
     on top of reachDps - the sightR() acquisition bound, a stance of hold, and
     acqGate itself. So add > 0 is no promise of a move: measured, 15 of 28
     calls on fulda are still dry, and on the quiet seed all four are.
     What it DOES promise is the one direction the choice needs. Every hull
     this prices is priced identically in the loop and reachDps is never
     negative, so add == 0 proves the loop would collect nothing: a target with
     add == 0 is one the commander cannot put a single extra round into this
     think, which on fulda was 96.7% of the priced guns for the target it was
     naming. That one-way property is the whole gate.

     COST, bounded rather than measured: one pass over attackWave
     (<= D.waveSize + 7, 37 at the turtle) with one Map lookup and one
     pickWeapon each, for at most SHORT = 4 shortlisted targets - 148
     pickWeapon calls at the worst size - plus, for an ARMED shortlist entry
     only, two more per hull on concrete: 2 x SHORT x |onBld|, and this
     build's own census counts 803 hull-samples on concrete over 150 runs on
     fulda, 5.4 a run (|onBld| is a subset of that), so ~43. Against that, the
     shortlist bails out of the whole two-pass move loop on the runs where
     nothing is reachable, which is most of them. Net the two are inside
     run-to-run noise and NO saving is claimed. Bounded by the wave, never by
     the number of things on the map, and it walks nothing. */
  function addable(tally, t, now) {
    let s = 0;
    for (const u of attackWave) {
      if (!autoFight(u)) continue;
      const cur = u.order.target;
      if (cur === t || !tally.has(cur)) continue;
      if (u._callT && now - u._callT < 3) continue;
      if (u.isIndirect && u.isIndirect()) continue;
      s += reachDps(u, t, 0.86);
    }
    return s;
  }
  function concentrate() {
    /* Micro, on the ladder the flanking code in launchGroundWave already
       climbs: 0.6 is Veteran. Below it a commander fights the way it always
       has, for one compare. */
    if ((D.micro || 0) < 0.6 || attackWave.length < 4) return;
    const now = G.time;
    let tally = null, onBld = null;
    for (const u of attackWave) {
      if (!autoFight(u)) continue;
      const t = u.order.target;
      /* a structure: our own record of it, so this reads nothing new */
      const rb = seenB.get(t.id);
      if (rb && rb.ref === t) {
        callLog.bld++;
        /* a direct-fire hull on a structure that does not shoot back may be
           offered an armed contact below; a gun position is never left */
        if (!gunProfile(rb.key) && !(u.isIndirect && u.isIndirect()))
          (onBld || (onBld = [])).push(u);
        continue;
      }
      /* THE FOG GATE - before anything about the target is read */
      const rec = seenU.get(t.id);
      if (trackedEntity(rec) !== t || now - rec.t > PEEK) {
        /* telemetry only: a target our own gun has just killed is not a fog
           rejection, and nothing below decides on this */
        if (!t.dead) callLog.fog++;
        continue;
      }
      if (t.targetLayer() === "air") continue;
      if (!tally) tally = new Map();
      let c = tally.get(t);
      if (!c) { c = { role: rec.role, harvester: rec.harvester, armed: rec.armed, dps: 0 }; tally.set(t, c); }
      c.dps += reachDps(u, t);
    }
    /* The standing call is honoured only while it is in this think's gated
       picture; otherwise it is dropped here, without reading it. */
    if (lastCall && !(tally && tally.has(lastCall))) lastCall = null;
    /* nobody in contact, or already on one hull with nobody on concrete */
    if (!tally || (tally.size < 2 && !onBld)) return;
    const soloBld = tally.size < 2;
    if (soloBld) callLog.bldRuns++; else callLog.runs++;
    /* THE SHORTLIST. The four best by value per hit point still to be
       delivered - the old score, unchanged, and the old COVERED rule with it.
       Four because the census saw a mean of 3.4 targets in the picture per run
       (525 over 154 runs on fulda), so the shortlist is the whole picture in
       the ordinary case and a bounded pass in the worst one. Insertion into a
       four-long array: no sort, no allocation per target beyond the entry. */
    const SHORT = 4, shot = [];
    for (const [t, c] of tally) {
      const s = callScore(t, c);
      if (s < 0) { callLog.covered++; continue; }
      let i = shot.length;
      while (i > 0 && shot[i - 1].s < s) i--;
      if (i >= SHORT) continue;
      shot.splice(i, 0, { t, c, s });
      if (shot.length > SHORT) shot.pop();
    }
    /* THE CHOICE: score x the share of the target's remaining need that the
       fire we could actually add closes inside CALL_WIN. A target nothing can
       reach scores 0 and is passed over - that case was the whole failure: 148
       calls, 139 of them dry, because value alone kept naming a hull on the
       far side of the column. `armed` is what the onBld pass needs, so hulls
       on concrete count toward the reach of an armed contact only, on exactly
       the terms that pass spends them.
       THE SHARE COUNTS `need` A SECOND TIME, ON PURPOSE. callScore is already
       value per hit point still to be delivered, so for a target the wave
       cannot saturate the product falls off as 1/need^2: it leans harder on
       the nearly-dead than the score alone does, because closing one target is
       worth more than wounding two. The worry that raises is the one this
       block's own preamble records - scoring the most nearly dead thing
       highest is how the first draft chose a corpse every think - and it does
       NOT happen here, because reachability dominates the product: measured on
       fulda, the mean health of the named call RISES rather than falls - 0.460
       of maxHp to 0.772 on the seed where the two builds diverge most, and
       0.566 to 0.683 over six commanders on three seeds. The share also uses
       the score's
       own floor, maxHp * 0.04, rather than a bare hit point, so a target
       already inside a CALL_WIN of death cannot buy an unbounded share. */
    let call = null, best = 0, bestW = 0, keepW = 0, keepS = 0;
    for (const e of shot) {
      let add = addable(tally, e.t, now);
      if (onBld && e.c.armed) {
        for (const u of onBld) {
          if (!autoFight(u) || (u._callT && now - u._callT < 3)) continue;
          const g = reachDps(u, e.t, 0.86);
          if (g > 0 && g >= reachDps(u, u.order.target) * 0.6) add += g;
        }
      }
      if (add <= 0) { callLog.noReach++; continue; }
      const w = e.s * Math.min(1, add * CALL_WIN /
                              Math.max(callNeed(e.t, e.c), e.t.maxHp * 0.04));
      if (e.t === lastCall) { keepW = w; keepS = e.s; }
      if (w > bestW) { bestW = w; best = e.s; call = e.t; }
    }
    /* HYSTERESIS, on the same weighted number the choice is made with. The
       score moves every time the call loses hit points, and a turret that
       re-slews every think fires less than one that does not, so a standing
       call that is still engaged, still in the picture (it is in the tally, so
       it passed the gate this think), still reachable and within a quarter of
       the best is kept. A standing call that did not make the shortlist, or
       that nobody can reach any more, has keepW 0 and is dropped.
       IT NOW FIRES RARELY - kept fell from 1-9 a match to 0-3 - and that is
       the rule working rather than dying: once a call has absorbed every gun
       that can reach it its add is 0, so it is released instead of held, and
       the hulls already on it keep it anyway because engage() does. The band
       is left to decide between two targets that BOTH still need fire. */
    if (lastCall && call && lastCall !== call && keepW > 0 && keepW >= bestW * 0.75) {
      call = lastCall; best = keepS; callLog.kept++;
    }
    lastCall = call;
    /* Two silences, kept apart because they mean opposite things: allCov is a
       picture in which every contact is already dying, which the old build
       declined too and which has nothing to do with reach; noCall is a
       shortlist the wave cannot reach, which is the case this whole change
       exists to stop naming. */
    if (!call) { if (shot.length) callLog.noCall++; else callLog.allCov++; return; }
    if (soloBld) callLog.bldCalls++; else callLog.calls++;
    let need = callNeed(call, tally.get(call));
    let moved = 0;
    for (let pass = 0; pass < 2 && need > 0; pass++) {
      for (const u of attackWave) {
        if (need <= 0) break;
        if (!autoFight(u)) continue;
        const cur = u.order.target;
        if (cur === call) continue;
        const c = tally.get(cur);
        if (!c) continue;                        // not in the picture: leave that gun alone
        /* pass one prices only guns on a target that is already covered */
        if (pass === 0 && callNeed(cur, c) > 0) continue;
        if (u._callT && now - u._callT < 3) continue;
        if (u.isIndirect && u.isIndirect()) continue;
        /* what this gun would put into the call, from where it stands */
        const gain = reachDps(u, call, 0.86);
        if (gain <= 0) continue;
        /* what the hull's current target is worth once this gun is off it */
        const mine = reachDps(u, cur);
        c.dps -= mine;
        const left = callScore(cur, c);
        if ((pass === 0 && left >= 0) || left * CALL_GAIN > best ||
            gain < mine * (left < 0 ? 0.25 : 0.6) || !u.retarget(call)) {
          c.dps += mine;
          continue;
        }
        u._callT = now;
        need -= gain * CALL_WIN;
        moved++;
      }
    }
    /* Hulls putting rounds into concrete that does not shoot while an ARMED
       contact stands in their reach (measured: 845 hull-samples on
       structures against 194 runs in one korea census, and none of them was
       ever offered the call). Same terms as above - at least 0.6 of the
       gun's present rate must go into the call from where it stands, and
       retarget() applies acquire()'s own gates - so an MG team leaves a
       barracks for a rifle squad and a tank gun stays on the factory. */
    if (onBld && need > 0 && tally.get(call).armed) {
      for (const u of onBld) {
        if (need <= 0) break;
        if (!autoFight(u) || (u._callT && now - u._callT < 3)) continue;
        const gain = reachDps(u, call, 0.86);
        if (gain <= 0 || gain < reachDps(u, u.order.target) * 0.6 || !u.retarget(call)) continue;
        u._callT = now;
        need -= gain * CALL_WIN;
        moved++; callLog.offBld++;
      }
    }
    callLog.moved += moved;
    if (!moved) { if (soloBld) callLog.bldDry++; else callLog.dry++; }
  }
  function driveWave(wave, t) {
    if (!t) return;
    for (const u of wave) {
      /* a unit still carrying flankTo belongs to the staging hold: it is idle
         at its gate ON PURPOSE, and an attackmove at the objective from there
         is the trickle itself. driveFlankers() turns it in. */
      if (u.flankTo) continue;
      if (u.order.type === "idle" || u.order.type === "hover")
        u.give({ type: "attackmove", x: t.x, y: t.y });
    }
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
      u.def.weapons.length && u.layer === "ground" &&
      /* A raider is out on the second front (formRaid). It is left out HERE
         so that no caller - launchGroundWave, defendBase, startAmphib - can
         hand it a second order: every one of them reads this list and no
         other. raidParty is at most four long. */
      (!raidParty.length || raidParty.indexOf(u) < 0));
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
    /* THE VICTORY RULE. A production building is worth its WORTH row and
       then some, and more the fewer of them we know of: with five on the plot
       each is 1.3x plus PROD_BONUS, with two 1.75x, with the last one 2.5x -
       a construction yard is then 6,400 against a refinery's 2,600 and the
       wave goes for the win rather than the economy. Once commitNow() holds,
       everything that is not production is worth half, so nothing else
       outbids it. The count is the rival's, off our own plot. */
    const nProd = foeField().prod;
    const prodMul = 1 + 1.5 / Math.max(1, nProd);
    const endgame = commitNow();
    const read = D.read === undefined ? 1 : D.read;
    const out = [];
    for (const r of pool) {
      let worth = worthOf(r.key);
      if (r.key === "power") worth += Math.min(4, coldable) * 260;
      if (isProd(r.key)) worth = worth * prodMul + PROD_BONUS;
      else if (endgame) worth *= 0.5;
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
    /* A siege line is a ground manoeuvre from OUR side of the objective:
       siegePoint() stands it on the line home, and on a split theatre that
       line crosses the water, so the stand can snap to our own shore and
       runSiege() would guard the landed troops at a point they cannot reach -
       a failed route per unit per think. A landing has no tube line to bring;
       it storms. */
    if (!groundConnected) return "storm";
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

  /* ---- breaking off ----
     reviewAim's second test has always known when a wave is beaten - more
     than 55% of the hit points it was committed with are gone - and it ended
     the engagement ON PAPER ONLY: the position was written off and attackWave
     was left exactly as it stood, so on the next think driveWave() sent the
     damaged, strung-out survivors at whatever warAim() picked next, alone.
     That is the trickle with the sign reversed.

     Now they leave the wave and walk home. `move`, not `attackmove`:
     attackmove acquires every tick and turns into a fight at the first
     contact, so a column pulling back on it stops and dies where it stood; a
     unit on `move` steps along, and retaliate() refuses to act from any order
     but idle or guard. Out of attackWave at once, because driveWave() would
     re-aim anything left in it and defendBase() skips anything listed there.

     Where to: the service depot. Building.update mends any VEHICLE of ours
     within 2.4 tiles at 5% of its bar a second for 0.12 credits a hit point -
     no order, no queue - against about 0.90 a hit point to replace the hull;
     and with no wave out, driveRecovery() parks the workshop two tiles south
     of that same building, where its free 2.2-tile bubble covers most of the
     first overflow rows. So the most damaged vehicles take the ten berths
     inside the pad's reach and infantry, which neither mends, go last. With
     no depot the war factory is an assembly point and nothing more; with no
     factory, the start tile is. Each unit gets a berth of its own, because
     thirty hulls sent to one point jam, and stalledOnMove() drops a jammed AI
     unit to idle after ten seconds without progress.

     The window is the walk: the farthest survivor's straight-line distance at
     1.3 tiles a second plus ten, never under 20 or over 60 seconds, whatever
     the doctrine's own clock says. waveT is pushed past it so the next wave
     forms up with the survivors instead of leaving without them - at most a
     minute of tempo, and only after a wave has actually been beaten. On a
     sea-split theatre nobody can walk home and nothing changes. */
  const PAD_BERTH = [[0, 1.5], [-1, 1.5], [1, 1.5], [0, -1.5], [-1, -1.5], [1, -1.5],
                     [-2, 0.5], [2, 0.5], [-2, -0.5], [2, -0.5]];
  function padBerth(c, i, pad) {
    const T = CFG.TILE;
    if (pad && i < PAD_BERTH.length)
      return { x: c.x + PAD_BERTH[i][0] * T, y: c.y + PAD_BERTH[i][1] * T };
    const k = pad ? i - PAD_BERTH.length : i;
    return { x: c.x + ((k % 5) - 2) * T, y: c.y + ((pad ? 2.5 : 2) + ((k / 5) | 0)) * T };
  }
  function withdrawWave() {
    if (!groundConnected) return;
    /* The review that breaks a wave can run before think() reaps it -
       driveLaunchers() and the mine driver both ask warAim() first - and a
       member that died since the last reap is usually one of the losses that
       broke it. It still goes on the casualty return. */
    reapWave();                    // before the survivors are counted
    if (!attackWave.length) return;
    const depot = G.nearestBuilding(P, "depot", P.homeX, P.homeY);
    const shed = depot || G.nearestBuilding(P, "factory", P.homeX, P.homeY);
    const c = shed ? { x: shed.x, y: shed.y } : { x: P.homeX, y: P.homeY };
    const rank = u => u.cat === "infantry" ? 2 : u.hp / Math.max(1, u.maxHp);
    const live = attackWave.filter(u => !u.dead).sort((a, b) => rank(a) - rank(b));
    let far = 0;
    for (let i = 0; i < live.length; i++) {
      const u = live[i];
      u.flankTo = null; u._homeRe = 0; u._homeT = 0; u._goAt = 0;
      u.padTo = padBerth(c, i, !!depot);
      u.give({ type: "move", x: u.padTo.x, y: u.padTo.y });
      if (homeward.indexOf(u) < 0) homeward.push(u);
      far = Math.max(far, U.dist(u.x, u.y, c.x, c.y));
    }
    const secs = U.clamp(far / CFG.TILE / 1.3 + 10, 20, 60);
    homeUntil = G.time + secs;
    waveT = Math.max(waveT, secs + 2);
    attackWave = [];
    waveGate = null; waveGateT = 0; waveMassed = false;
    engStat.withdrawals++; engStat.withdrawn += live.length;
  }

  /* ---- ...and the walk home ----
     Once a think, and only while somebody is on it. A unit that has gone idle
     short of its berth is re-ordered, because stalledOnMove() gives up on an
     AI unit's move after ten seconds without progress. Inside twelve tiles of
     the berth it goes on attackmove instead: that is our own base, where not
     shooting back is no longer a virtue. Within two tiles of its berth, or
     when the window closes, it is released to the reserve, where defendBase()
     can call on it and the next launch can take it; anyone still on the road
     then is switched to attackmove, so the rest of the walk is not a silent
     one. A death on the way is a wave casualty like any other and goes on the
     casualty return, which reapWave() can no longer see.

     Two ways to go idle short of the berth are not stalls. An unreachable
     berth - a dense base can wall one in, since canPlace leaves no gap
     between buildings - "arrives" at once: Path.find finds no route,
     stepAlong() reports nowhere to go, and re-ordering that is a failed
     whole-region A* on every think until the window shuts. So an idle unit
     is re-ordered at most every five seconds, and inside twelve tiles only
     once: a unit that is in our own base and still cannot reach its berth
     is handed to the reserve. And a unit somebody else has re-tasked - the
     defence reflex, a raid - is theirs: every order this walk gives, and the
     attackmove an engagement resumes, carries the berth exactly, so a move
     or attackmove to any other point is another system's order. */
  function steerHome() {
    if (!homeward.length) return;
    const T = CFG.TILE, now = G.time, open = now < homeUntil;
    for (let i = homeward.length - 1; i >= 0; i--) {
      const u = homeward[i], s = u.padTo;
      if (u.dead) {
        if (!u._graved) { u._graved = 1; noteGrave(u); }
        homeward.splice(i, 1);
        continue;
      }
      const o = u.order.type;
      const lost = !s || attackWave.indexOf(u) >= 0 ||
                   ((o === "move" || o === "attackmove") &&
                    (u.order.x !== s.x || u.order.y !== s.y));
      const d2 = s ? U.dist2(u.x, u.y, s.x, s.y) : 0;
      if (lost || !open || d2 < T * T * 4) {
        if (lost) engStat.handed++;
        else if (d2 < T * T * 4) engStat.pad++;
        else if (o === "move") u.give({ type: "attackmove", x: s.x, y: s.y });
        u.padTo = null;
        homeward.splice(i, 1);
        continue;
      }
      const near = d2 < T * T * 144;
      if (o === "idle" || o === "guard") {
        if (near && u._homeRe) {
          engStat.handed++;
          u.padTo = null;
          homeward.splice(i, 1);
          continue;
        }
        if ((u._homeT || 0) > now) continue;
        u._homeT = now + 5;
        if (near) u._homeRe = 1;
        u.give({ type: near ? "attackmove" : "move", x: s.x, y: s.y });
      } else if (near && o === "move") {
        u.give({ type: "attackmove", x: s.x, y: s.y });
      }
    }
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
    /* a rig on the road is a production building not yet put down; a lorry
       is not worth breaking off the last building for */
    const hv = intelU(r => (r.harvester && !commitNow()) || r.role === "mcv", 6);
    if (!hv.length) return null;
    const hs = ourHardShare();
    const read = D.read === undefined ? 1 : D.read;
    let pick = null, ps = -Infinity;
    for (const r of hv) {
      const e = trackedEntity(r);
      if (!e) continue;
      const price = exposureAt(r.x, r.y, hs) * DWELL / HP_CR * read;
      const travel = U.dist(P.homeX, P.homeY, r.x, r.y) / CFG.TILE;
      const s = (raidWorth(r) - price) / (1 + travel * 0.045);
      if (s > ps) { ps = s; pick = { r, e }; }
    }
    if (!pick || ps <= 0) return null;
    if (best && best.score >= ps) return null;
    const rig = pick.r.role === "mcv";
    return { id: pick.r.id, x: pick.e.x, y: pick.e.y, ref: pick.e, key: rig ? "mcv" : "harvester",
             t: G.time, mode: "raid", raid: true, worth: raidWorth(pick.r), price: 0,
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
      return held > (aim.key === "mcv" ? 30 : 15);
    }
    /* 1. gone - taken, or looked at and not there. forgetStale has already
          decided this properly; there is nothing to add. */
    const rec = seenB.get(aim.id);
    if (!rec || rec.gone || (aim.ref && aim.ref.dead)) return true;
    /* Finishing them (commitNow). The last production building we know of
       is held on to - a heavier loss before breaking off, no write-off for
       being defended, no expiry - and any other aim is dropped at once so
       warAim() can take it. */
    const endgame = commitNow();
    const holdOn = endgame && isProd(aim.key);
    if (endgame && !holdOn) return true;

    /* 2. the wave is losing. Whatever is on that position, it is not coming
          down to what is left - and the NEXT wave must not be sent at it
          either, so it is written off for a wave cycle rather than merely
          dropped. This is the line that stops the commander feeding the same
          three tanks into the same three anti-tank guns for the rest of the
          battle. */
    if ((D.read || 0) > 0 && waveSpent() > (holdOn ? 0.8 : 0.55)) {
      shy(aim.id, D.waveTime || 150);
      /* Consume the book. Nothing else clears it until the next launch, so a
         wiped-out wave read as 100% spent on every later think and wrote off
         one fresh objective per think - most of the plot within a minute at
         Warlord - against a wave that no longer existed. */
      waveBook = null;
      /* ...and the survivors now actually leave. This used to end the
         engagement on paper while driveWave() sent them straight on to the
         next objective; withdrawWave() says why that was worse than staying. */
      withdrawWave();
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
        if (!holdOn) {
          shy(aim.id, (D.waveTime || 150) * 0.8);
          return true;
        }
      }
      /* the reverse: the guns have done their work and the emplacements that
         made this a siege are off the plot. Walk in and take it. */
      if (c && aim.mode === "siege" && c.price < c.worth * 0.35) {
        aim.mode = "storm"; aim.price = c.price; aim.stand = null; siegeAt = null;
        return false;
      }
    }

    /* 4. the hold expires. */
    if (held >= (D.waveTime || 150) * 0.6 && !holdOn) return true;

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
    /* finishing them: the best-scoring production building on the list,
       whatever its price - it is the win */
    if (commitNow()) for (const c of list) if (isProd(c.key)) { pick = c; break; }
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

  /* ================= THE VICTORY RULE, AND WHEN TO GO ====================
     A side is beaten when it has no live production building left - a
     construction yard, barracks, war factory, airbase or naval yard
     (Player.isProduction: def.base || def.produces; the lab is not one) -
     with CFG.RIG_GRACE for a rig that has not deployed. That makes those structures the war aim in a way no
     refinery is: everything else is attrition, these are the win.

     Everything below reads the plot (seenB, seenU), our own force and our
     own clock. Nothing reads an enemy list, bank or queue. "The enemy is down
     to its last production building" is a BELIEF - the one we have looked at
     is the only one we know of - which is exactly what a player acts on. */
  const PROD_BONUS = 400, FORT_DPS = 35, RIG_WORTH = 2600;
  /* The one definition every stream reads: the engine's own, so the aim,
     the commit, the defence and the siting cannot drift from the rule that
     decides the match. A lab counted here once kept commitNow() off while a
     rival stood on its last factory and a known lab. */
  function isProdDef(d) {
    if (!d) return false;
    return typeof Player !== "undefined" && Player.isProduction
      ? Player.isProduction(d) : !!(d.base || d.produces);
  }
  function isProd(key) { return isProdDef(BUILDINGS[key]); }
  /* ---- what we know of the other side's fighting weight ----
     foeNear() answers "what is standing HERE" on a 90-second window, which
     is right for a deferral at the gate. A launch asks a different question
     - is our army heavier than theirs - and theirs is wherever it is. So:
     every armed ground contact of the rival seen in the last 150 s, in the
     same FORCE_W currency, fading with age; and the most we have ever been
     shown at once, on a four-minute half-life, because an army we saw and
     cannot see now has not gone home. A record we were LOOKING at when it
     died - its sighting under five seconds old, the liveTrack() window every
     gun in this file uses - is struck off for good (foeDead), which is the
     only honest way to count our kills against their strength.
     The same pass counts the rival's production on the plot and how much of
     its works we have looked at lately (cover): a launch on the enemy's
     weight is only as good as the look it was counted on.
     COST: one pass over seenU and one over seenB (a look-grid read per
     structure), memoised on the tick. */
  function foeField(peek) {
    const now = G.time;
    /* peek (intel() only): the last think's memo, and nothing written */
    if (foeMemo && (foeMemoT === now || peek)) return foeMemo;
    if (peek) return null;
    const rid = rival ? rival.idx : -1;
    let w = 0;
    for (const r of seenU.values()) {
      if (r.own !== rid || r.harvester || !r.armed || r.layer !== "ground" || NO_FIGHT[r.role]) continue;
      if (r.foeDead) continue;
      const age = now - r.t;
      if (age <= 5 && r.ref && r.ref.dead) {
        /* we watched it die: it comes off the strongest army we remember as
           well, so a wave that broke itself on our base can be answered */
        r.foeDead = true;
        foePeak = Math.max(0, foePeak - forceW(r.role, r.armor, r.cat));
        continue;
      }
      if (age > 150) continue;
      w += forceW(r.role, r.armor, r.cat) * (1 - age / 300);
    }
    foePeak *= Math.pow(0.5, (now - (foePeakT || now)) / 240);
    foePeakT = now;
    if (w > foePeak) foePeak = w;
    /* cover: the share of their works we know of that a sensor of ours has
       had IN VIEW in the last 45 s (seenB's t is refreshed on every
       sighting). A structure we have not looked at lately is where an army we
       have not counted can be standing. The first draft asked the look grid
       for 150 s, and the opening scout pass alone then read cover 1 with the
       army 0.45-0.77 seen of a real 2.1-2.7 - a stale glance let an
       8-body wave leave at t~180. */
    let lastLook = -1e9, prod = 0, nB = 0, fresh = 0;
    for (const r of seenB.values()) {
      if (r.own !== rid || r.gone) continue;
      if (r.t > lastLook) lastLook = r.t;
      if (isProd(r.key)) prod++;
      nB++;
      if (now - r.t < 45) fresh++;
    }
    if (rid >= 0 && prod > (prodPeakOf[rid] || 0)) prodPeakOf[rid] = prod;
    if (prod !== 1) prodOneT = 0; else if (!prodOneT) prodOneT = now;
    const cover = nB ? fresh / nB : 0;
    foeMemo = { w, est: Math.max(w, foePeak), look: lastLook, prod, cover, nB,
                peak: rid >= 0 ? (prodPeakOf[rid] || 0) : 0 };
    foeMemoT = now;
    return foeMemo;
  }
  /* ---- have we got them? ----
     The rival's production on the plot is down to one, and we know that is
     not merely all we have ever seen of it: either the plot once held two
     or more at the same time, or every deployment site has been examined
     and we have looked at their works in the last two minutes. From here the
     commander stops attriting and finishes: that building is the aim, a
     body leaves as soon as there is one, the hold does not expire and the
     wave takes heavier losses before it breaks off (reviewAim). Ground
     theatres only: a landing is not a way to hurry. The count has to have
     read one for eight seconds: forgetStale() can strike a structure off for
     a sweep when its footprint is overlooked and its centre is not, and a
     one-sweep "last building" would send whatever is at home. */
  function commitNow(peek) {
    if ((D.read || 0) < 0.35 || !groundConnected || !rival) return false;
    const ff = foeField(peek);
    if (!ff || ff.prod !== 1 || !prodOneT || G.time - prodOneT < 8) return false;
    /* The second path - never two at once on the plot - wants a real look:
       after ten minutes, at least three of their structures known, most of
       them in view in the last 45 s, every start examined. A probe of
       kuwait read commit at t=300 on one seen yard (every start examined)
       while the rival stood on six production buildings, and a commit
       launches everything at minBody, lifts the home hold and halves every
       other objective. */
    return ff.peak >= 2 ||
           (G.time > 600 && ff.nB >= 3 && ff.cover >= 0.8 && !hypo.length &&
            G.time - ff.look < 120);
  }
  /* The fire on the war aim, as fighting weight. One emplacement puts out
     about what one tank does - a GPMG nest some 29 a second into infantry,
     an anti-tank gun some 23 into armour - so FORT_DPS of fire is one. */
  function aimFort(peek) {
    const now = G.time;
    if (fortT === now || peek) return fortMemo;
    fortT = now; fortMemo = 0;
    if (aim && !aim.raid) {
      const c = aimCand(aim.id);
      if (c) fortMemo = (c.dps || 0) / FORT_DPS;
    }
    return fortMemo;
  }
  /* ---- WHEN TO GO ----
     (measured) the launch test was `army.length >= wantSize * 0.8`, and
     wantSize = D.waveSize + 2 * floor(t / 240) grows with the CLOCK. A
     commander whose army shrank - two broken waves - faced a bar that rose
     while it fell, and one never launched again in 1,500 s. And a commander
     that could see its enemy had nothing waited for the same twenty bodies
     as one looking at a tank corps: every land theatre was decided at
     ~460 s by whichever side reached the count first.
     The bar is relative to what this commander can field and what it has
     SEEN now, with the old count kept:
       full   the old test, unchanged - a full wave always goes
       edge   our fighting weight beats theirs by a doctrine margin R -
              Warlord 1.37, Elite 1.58, Regular 1.76, Fortress 1.9 - plus the
              fire on the objective, after the first three minutes. THEIRS is
              everything we have seen (foeField().est), half a tank for each
              production building we know of, and - for the share of their
              works NOT in view in the last 45 s - an army 0.6 the size of
              our own, because an enemy we have not looked at is assumed to
              have done nearly as well as we have. Solved for our weight that
              is ours >= (R*seen + fort) / (1 - 0.6*R*(1-cover)): at Warlord
              about 1.5x what we saw on a full look and 2.3x on a half look;
              below half a look (or for a defensive doctrine) there is no
              edge at all. (In a smoke run one side had seen 1.8 of a real
              5.0 - what was seen alone is not an estimate.) It punishes a
              greedy opponent we have actually scouted, and it lets a
              beaten-down army go again once it is heavier than what beat it
       stall  none for 2.5 wave cycles (the first counted from t=300) and at
              least 0.9 of their seen weight: a stalemate is broken, not sat
              out, and an army that plateaued under `full` still goes
       end    commitNow(): their last production building, now
     with a floor of bodies (35% of a wave, 4 to 10) under all but `full`,
     so a three-tank "wave" is never sent. Held back (`home`) while a real
     enemy force is at our works and we do not outweigh it there three to
     one - the launch would take the hulls fighting it - unless we are
     finishing them. Below D.read 0.35 there is no reading and on a
     sea-split theatre a landing is not a probe: only `full` applies.
     COST: ourForce() over the list; foeField() and aimFort() are memoised. */
  function launchGate(army, peek) {
    const now = G.time, n = army.length;
    const base = groundConnected ? D.waveSize : Math.max(6, (D.waveSize * 0.7) | 0);
    const full = (base + Math.floor(now / 240) * 2) * 0.8;
    const minBody = U.clamp(Math.round(D.waveSize * 0.35), 4, 10);
    const ff = foeField(peek), fort = aimFort(peek);
    if (!ff) return null;
    const ours = ourForce(army);
    const R = U.clamp(2.0 - 0.3 * (D.aggro || 1), 1.2, 1.9);
    const est = ff.est + 0.5 * ff.prod;
    const den = 1 - 0.6 * R * (1 - ff.cover);
    const bar = den > 0.05 ? Math.max(minBody * 0.4, (est * R + fort) / den) : Infinity;
    let go = false, why = "";
    if (n >= full) { go = true; why = "full"; }
    else if ((D.read || 0) >= 0.35 && groundConnected && n >= minBody) {
      /* `edge` needs a real look: half their known works in view within 45 s.
         With nothing seen the prior term cancels and the bar is the body
         floor alone, so without this a commander that had looked at nothing
         went at 3.2. Not for a defensive doctrine (Fortress, aggro 0.35). */
      const looked = ff.cover >= 0.5 && (D.aggro || 1) >= 0.5;
      /* a commander that has never launched is stalled too, once the match
         is old enough: an army that plateaued under `full` (smoke run: 16-17
         bodies against 19.2-22.4, cash 0) otherwise never went at all */
      const since = lastLaunchT > 0 ? now - lastLaunchT : now - 300;
      if (commitNow(peek)) { go = true; why = "end"; }
      else if (now > 180 && looked && ours >= bar) { go = true; why = "edge"; }
      else if (since > (D.waveTime || 150) * 2.5 &&
               n >= minBody + 2 && ours >= est * 0.9 + fort * 0.5) { go = true; why = "stall"; }
    }
    /* A launch takes every hull at home, including the ones fighting there.
       Finishing them is exempt - but not inside a minute of a recall, or the
       recalled wave is turned straight round (recallWave). What "held at
       home" means is coreHeld() below - the raid gate asks the same function,
       so the two can never disagree about it. In the integration smoke run of
       korea it held a 42-body army at home in two samples of four. */
    if (go && (why !== "end" || now < recallNext) && coreHeld(now)) {
      go = false; why = "home";
    }
    return { go, why, n, full, minBody, ours, bar, est, fort, cover: ff.cover };
  }
  /* ---- IS A REAL FORCE HOLDING OUR CORE? ----
     The launch hold, lifted out so the raid gate can ask the same question
     with the same numbers rather than restate them. Only the CORE counts -
     within sixteen tiles of production, or at home - because with yards
     spread across the map some outlying refinery is nearly always being
     poked; and it counts only against what we have standing there, so one
     scout is not a siege. baseCoreW is written only while something IS at the
     core and is never cleared, so baseT's freshness is its guard.
     NOTE what this does NOT say. baseT and baseCoreW are stamped by
     defendBase() inside `if (foeW > 0)`, off SEEN contacts only, so "not
     held" here means "nothing we can SEE is holding it". Rounds landing on
     our works from guns nobody has laid eyes on leave this reading false
     while defendBase() is pushing the reserve at the alarm - which is why
     neither caller may use it to decide that a hull already walking under an
     order is free. Both only ever ask it about hulls that are standing. */
  function coreHeld(now) {
    const t = now === undefined ? G.time : now;
    return t - baseT < 15 && baseCoreW >= 1.2 && baseCoreW * 3 > baseHomeW;
  }
  /* a real force has been at our works in the last 45 s */
  function underThreat() {
    return G.time - baseT < 45 && baseW >= 0.5;
  }
  /* A lorry is 1,100 credits carrying 700. A rig is a production building
     that has not been put down yet - with the enemy's last known one it is
     very nearly the whole war. */
  function raidWorth(r) {
    if (r.role !== "mcv") return 1800;
    return foeField().prod <= 1 ? RIG_WORTH * 1.6 : RIG_WORTH;
  }
  /* (which production building gets the next emplacement is defAnchor(),
     in MACRO: one rule for the two designs that wanted it) */
  function warBook() {
    return { plans: 0, go: {}, commits: 0, staggered: 0, lastWait: 0,
             recalls: 0, recalled: 0, raidSurplus: 0, raidLull: 0 };
  }
  /* for intel(): read-only. foeField() writes the peaks, prodOneT and
     foeDead and aimFort() restarts the objectives survey, so the census
     reads the last think's memos (peek) and never computes them - four
     intelOf() calls a sample must not change what they measure. */
  function warState() {
    const ff = foeField(true), g = ff && launchGate(groundArmy(), true);
    const r2 = (v) => Math.round(v * 100) / 100;
    const logs = { plans: warLog.plans, go: Object.assign({}, warLog.go), commits: warLog.commits,
                   staggered: warLog.staggered, lastWait: warLog.lastWait,
                   recalls: warLog.recalls, recalled: warLog.recalled,
                   raidSurplus: warLog.raidSurplus, raidLull: warLog.raidLull,
                   offBld: callLog.offBld };
    if (!g) return Object.assign({ gate: "n/a" }, logs);
    return { gate: g.why || "shut", n: g.n, full: r2(g.full), minBody: g.minBody,
             ours: r2(g.ours), bar: g.bar < 1e9 ? r2(g.bar) : -1, est: r2(g.est),
             seen: r2(ff.w), cover: r2(ff.cover),
             fort: r2(g.fort), lookAge: ff.look > -1e8 ? Math.round(G.time - ff.look) : -1,
             prod: ff.prod, prodPeak: ff.peak, commit: commitNow(true),
             waveT: Math.round(waveT),
             sinceLaunch: lastLaunchT ? Math.round(G.time - lastLaunchT) : -1,
             base: { w: r2(baseW), core: r2(baseCoreW), home: r2(baseHomeW),
                     age: baseT > -1e8 ? Math.round(G.time - baseT) : -1 },
             plans: warLog.plans, go: Object.assign({}, warLog.go), commits: warLog.commits,
             staggered: warLog.staggered, lastWait: warLog.lastWait,
             recalls: warLog.recalls, recalled: warLog.recalled,
             raidSurplus: warLog.raidSurplus, raidLull: warLog.raidLull,
             offBld: callLog.offBld };
  }

  /* ====================== THE SECOND FRONT ==========================
     A raid: two to four fast hulls sent at the other side's ECONOMY, on an
     axis the main wave is not using, and brought home before they turn into
     a queue of wrecks.

     What was already here is not this. raidAim() above re-aims the WHOLE
     wave at a lorry it is looking at right now (a six-second track), for at
     most fifteen seconds, and only when that lorry outscores every building
     on the plot - a target of opportunity for a force that is already there.
     Nothing in this file was ever detached from attackWave.

     Why it pays in this game is one line in update(): "Every credit on both
     sides now comes off an ore field, through a hauler, into a refinery that
     has to survive." There is no subsidy. A hauler is 1,100 credits carrying
     700 a run, and a dead one is income the other side goes without until it
     has paid for another.

     The rules that keep it a raid and not a leak:
       1 NEVER SHORT A LAUNCH. A party goes when the army without it still
         passes launchGate() on its own merits (a surplus), or when no wave
         is out and no launch could use it now (a lull); driveRaid() recalls
         a lull party the moment it becomes the difference between launching
         and not.
         And at least as many hulls as it takes stay at home, outside any
         wave, for defendBase().
       2 NEVER IN TWO LISTS. groundArmy() leaves the party out, so the
         launcher, defendBase() and startAmphib() cannot see a raider at all.
         A unit handed two orders a think goes nowhere.
       3 ONLY WHAT WE HAVE SEEN. Targets are seenU hauler sightings no older
         than RAID_MEM and seenB refineries and derricks off the objectives()
         plot, looked at within RAID_SMEM. Never an enemy list, and never
         G.map.oilNodes[].taken, which flips when anybody drills anywhere.
       4 PRICED ON THE WAVE'S OWN FIELD: exposureAt() on the place and the
         road, both casualty returns, and the armed contacts seen standing
         over it in the last forty seconds.
       5 IT LEAVES. A third of its hit points gone, live contacts it cannot
         beat, a gun nobody had seen, or not enough fuel to get back - and the
         place is written off in raidShy, a map of its OWN: three vehicles
         bouncing must not tell a thirty-vehicle wave that a refinery is
         impossible. For the same reason a raider's death goes into raidDead
         and never into graves, which the wave's lane and siege sums read.

     COST. formRaid() is a few compares until raidNext expires, and every
     failed attempt pushes raidNext on, so the real work - one groundArmy()
     filter, one pass over seenU, the objectives() list warAim() has already
     cached, per-candidate exposureAt/graveWeight lookups and a P.buildings
     walk, then ONE A* on the winner - runs at most every ten seconds per
     commander (thirty after a failed road). driveRaid() is one pass over at
     most four hulls, one over P.buildings and one over seenU, every half
     second to second, and only while a party is out. Nothing is units x
     units, and nothing walks tiles except that single A*.                  */
  /* RAID_OUT caps the leg out; the real limit is fuel, worked out per party
     in formRaid(). A hull burns CFG.FUEL_BURN_LAND (1.5/s, times the
     faction's fuelMul) only while moving and refuels only within
     BUILD_RADIUS of a structure we own, so a full tank is sixty-six seconds
     of driving - there AND back. RAID_DWELL is time on the objective; the
     drive is added per raid, because a fixed life strands a slow party on
     the way in and leaves a fast one standing about. */
  const RAID_OUT = 45, RAID_DWELL = 25, RAID_GAP = 45, RAID_RETRY = 10;
  const RAID_FIRE = 6, RAID_CELL = 8, RAID_MEM = 120, RAID_SMEM = 360, RAID_WARN = 20;
  /* The hulls that raid - a whitelist, not a speed floor alone. The SPAAGs
     are among the fastest vehicles on the roster and groundArmy() admits
     them because they carry a weapon, but several carry only an air-only
     mount (manpad, hvm, sam_veh: tgt.ground 0); sorted fastest-first they
     would LEAD the party, arrive, find nothing canTarget() allows and idle
     for the whole raid. mlrs (1.30-1.35) clears a 1.30 floor as well. The
     weapon test in formRaid() is kept on top, for an era variant whose
     mount changes under the same role. */
  const RAID_ROLES = { lighttank: 1, ifv: 1, tankdestroyer: 1, mbt: 1, heavy: 1 };
  let raidParty = [];            // the detachment; never a member of attackWave
  let raidTo = null;             // { id, own, kind, x, y, home, worth } - where it went
  let raidBook = 0;              // hit points it set out with
  let raidEnd = 0, raidNext = 60, raidTick = 0;
  const raidShy = new Map();     // raid target id -> when it may be tried again
  let raidDead = [];             // where raiders died - read by raidTarget() only
  let raidLog = raidLogNew();    // counters for intel(); nothing decides on them

  function raidLogNew() {
    /* `reach` counts the attempts that got as far as the surplus/lull test.
       Without it a census cannot tell a surplus gate that PASSED from one that
       was never reached - both read `skip.army 0` - and that is exactly the
       reading that sent this stream after the wrong gate. */
    return { formed: 0, reach: 0, xp: 0, lost: 0,
             end: { spent: 0, outgunned: 0, home: 0, fire: 0, dry: 0, life: 0,
                    wave: 0, cut: 0, stuck: 0, done: 0, empty: 0, wiped: 0 },
             /* busy and army were ONE counter. They are two unrelated
                refusals - our own works under attack, and a wave that cannot
                spare the hulls - and the census blamed the second for a year
                of the first. */
             skip: { busy: 0, army: 0, home: 0, pool: 0, target: 0, road: 0 } };
  }

  /* raidFloor() lived here: the launch count restated. The raid gate asks
     launchGate() itself now, so the two cannot disagree. */

  /* Where a hull takes fuel: within BUILD_RADIUS of ANY structure we own, so
     the nearest one - fuelShort()'s reference point, for fuelShort()'s
     reason. Our own buildings only, and never a field obstacle: inBaseRadius()
     skips wire and dragon's teeth, so a tank trap is no filling station. */
  function raidFuelPoint(x, y) {
    let best = null, bd = Infinity;
    for (const b of P.buildings) {
      if (b.dead || b.buildProgress < 1 || b.def.obstacle) continue;
      const d = U.dist2(x, y, b.x, b.y);
      if (d < bd) { bd = d; best = b; }
    }
    return best ? { x: best.x, y: best.y, b: best } : { x: P.homeX, y: P.homeY, b: null };
  }

  /* Where a returning party is actually SENT: just outside that structure's
     footprint, on the side it is coming from. The centre is a tile the
     building stands on. Path.find spirals the goal out to open ground, but
     stepAlong() steers the last leg at the exact point and reports arrival
     only within 0.45-0.8 of a tile of it, so a move there never finishes:
     the hull presses on the wall under a move order - acquiring nothing,
     passed over by retaliate() and defendBase() - until stalledOnMove()
     drops it ten to twenty seconds later. That is the rally-point fault the
     scouting sweep already met. Half the footprint plus a tile and a half is
     still far inside BUILD_RADIUS, so the hull refuels where it stops. Our
     own ground beside our own building; once per break-off. */
  function raidStand(back, fx, fy) {
    const T2 = CFG.TILE, M = G.map;
    const half = back.b ? Math.max(back.b.def.w || 2, back.b.def.h || 2) / 2 : 1;
    const d = U.dist(fx, fy, back.x, back.y) || 1;
    const k = Math.min(1, (half + 1.5) * T2 / d);
    let x = back.x + (fx - back.x) * k, y = back.y + (fy - back.y) * k;
    const tx = U.clamp((x / T2) | 0, 0, M.W - 1), ty = U.clamp((y / T2) | 0, 0, M.H - 1);
    const blk = G.tileBlocked ? (a, b) => G.tileBlocked(a, b, null) : null;
    if (!GameMap.passable(M, tx, ty, "ground") || (blk && blk(tx, ty))) {
      /* the next building along, or the water's edge: nearest open tile */
      const s = Path.nearest(M, tx, ty, "ground", blk, 6);
      if (s) { x = s.x * T2 + T2 / 2; y = s.y * T2 + T2 / 2; }
    }
    return { x, y };
  }

  /* ---- where a raid is worth sending, from what we have earned ----
     `reach` is the straight-line budget (out plus back to fuel) the party's
     emptiest tank allows. Every input is a record this commander's own
     sensors wrote, our own dead, our own force, or published terrain. */
  function raidTarget(size, fx, fy, reach) {
    const now = G.time, T2 = CFG.TILE, M = G.map;
    for (const [k, v] of raidShy) if (v < now) raidShy.delete(k);
    for (let i = raidDead.length - 1; i >= 0; i--)
      if (now - raidDead[i].t > 300) raidDead.splice(i, 1);
    /* A SECOND axis: not where the wave is and not where it is going. The
       first draft measured this against intelHome(), but that is a
       cost-weighted centroid of remembered structures and a 2,600-credit
       refinery is one of the heaviest weights pulling it onto itself - it
       vetoed every refinery and every ore field beside one. "Somewhere the
       wave is not" means the wave. */
    const busy = [];
    let wx = 0, wy = 0, wn = 0;
    for (const u of attackWave) if (!u.dead) { wx += u.x; wy += u.y; wn++; }
    if (wn) {
      busy.push({ x: wx / wn, y: wy / wn });
      if (aim) busy.push({ x: aim.x, y: aim.y });
    }
    /* One pass over seenU for both halves: the rival's lorries, bucketed on
       an eight-tile cell, and every armed ground contact of the last forty
       seconds. seenU is never pruned on a death we did not see, so the count
       errs high - toward not going, the safe side for a raid. */
    const cells = new Map(), guns = [];
    for (const r of seenU.values()) {
      if (r.layer !== "ground") continue;
      const age = now - r.t;
      if (r.harvester) {
        if (r.own !== rival.idx || age > RAID_MEM) continue;
        const k = ((r.y / T2 / RAID_CELL) | 0) * 1024 + ((r.x / T2 / RAID_CELL) | 0);
        let c = cells.get(k);
        if (!c) cells.set(k, c = { n: 0, sx: 0, sy: 0, t: 0 });
        c.n++; c.sx += r.x; c.sy += r.y; if (r.t > c.t) c.t = r.t;
      } else if (r.armed && age <= 40) guns.push(r);
    }
    const need = Math.ceil(size / 2) + 1;       // contacts that make it a fight
    let best = null, bs = 0;
    const offer = (id, x, y, worth, kind) => {
      if (worth < 700) return;                   // not worth detaching for
      const tx = (x / T2) | 0, ty = (y / T2) | 0;
      if (tx < 1 || ty < 1 || tx >= M.W - 1 || ty >= M.H - 1) return;
      if (!GameMap.passable(M, tx, ty, "ground")) return;
      const until = raidShy.get(id);
      if (until && until > now) return;
      const out = U.dist(fx, fy, x, y) / T2;
      if (out > RAID_OUT) return;
      for (const b of busy) if (U.dist(x, y, b.x, b.y) < T2 * 12) return;
      const back = raidFuelPoint(x, y);
      const home = U.dist(x, y, back.x, back.y) / T2;
      if (out + home > reach) return;
      /* The place and the road, on the wave's own field. The party is hulls
         by construction, so the hard column is the one that applies. */
      let fire = exposureAt(x, y, 1);
      for (let s = 1; s <= 3; s++)
        fire += exposureAt(fx + (x - fx) * s / 4, fy + (y - fy) * s / 4, 1);
      if (fire > RAID_FIRE) return;
      /* the wave's casualty return is evidence for a raid too; the raid's own
         is read here and nowhere else */
      let dead = graveWeight(x, y, now) + graveWeight((fx + x) / 2, (fy + y) / 2, now);
      for (const g of raidDead) if (U.dist(x, y, g.x, g.y) < T2 * 8) dead += 1;
      if (dead > 2.5) return;
      let near = 0;
      for (const r of guns) if (U.dist(r.x, r.y, x, y) < T2 * 9) near++;
      if (near >= need) return;
      /* Worth per unit of RISK, not worth minus price. A wave can afford to
         pay for an objective; a detachment cannot pay for anything, so what
         it maximises is softness. */
      const s = worth / (1 + fire * 0.9 + dead * 3 + near * 2) / (1 + out * 0.02);
      if (s > bs) {
        bs = s;
        best = { id, own: rival.idx, kind, x, y, home, worth: Math.round(worth) };
      }
    };

    /* 1. Where the lorries work - a PLACE, not a lorry. objectives() already
       prices haulers off this memory at +500 a truck beside a structure; what
       is new is sending something at the CELL, which is still where the
       trucks are two minutes on because an ore field does not drive away. */
    for (const [k, c] of cells)
      offer("ore:" + k, c.sx / c.n, c.sy / c.n,
            Math.min(3, c.n) * 1100 * (1 - (now - c.t) / RAID_MEM), "ore");

    /* 2. The outlying economy, off the plot objectives() has already priced
       and cached - no second survey. Only a refinery or a derrick, only one
       with next to no guns on it (anything dearer is the wave's problem),
       only the rival's - objectives() falls back to every player's plot when
       it holds none of the rival's - and only one we have looked at lately,
       its worth fading with the age of the look. */
    for (const c of objectives()) {
      if ((c.key !== "refinery" && c.key !== "derrick") || c.price > 300) continue;
      const rec = seenB.get(c.id);
      if (!rec || rec.gone || rec.own !== rival.idx) continue;
      const age = now - rec.t;
      if (age > RAID_SMEM) continue;
      offer(c.id, c.x, c.y, c.worth * (1 - 0.5 * age / RAID_SMEM), c.key);
    }
    /* 3. A construction rig on the road. Under the victory rule an undeployed
       rig is a production building that has not been put down yet; it is
       unarmed and it is their expansion. Only a sighting under twenty
       seconds old - a rig moves - and at the place it was seen. */
    for (const r of seenU.values()) {
      if (r.role !== "mcv" || r.own !== rival.idx || r.layer !== "ground" || r.foeDead) continue;
      const age = now - r.t;
      if (age > 20) continue;
      offer("rig:" + r.id, r.x, r.y, raidWorth(r) * (1 - age / 40), "rig");
    }
    return best;
  }

  /* Break off. `shyFor` writes the place off in raidShy only - never aimShy.
     The party drives to `back`, beside the nearest structure we own
     (raidStand), where it refuels, and is back in groundArmy() from this
     call on. */
  function endRaid(shyFor, gap, back) {
    if (raidTo && shyFor > 0) raidShy.set(raidTo.id, G.time + shyFor);
    const to = back || { x: P.homeX, y: P.homeY };
    for (const u of raidParty)
      if (!u.dead) u.give({ type: "move", x: to.x, y: to.y });
    raidParty = []; raidTo = null; raidBook = 0;
    raidNext = G.time + gap;
  }

  function formRaid() {
    if (atPeace) return;
    /* Raiding is a taught skill, as the siege is at aimMode(): below Veteran
       a commander advances and does nothing else. */
    if ((D.read || 0) < 0.55 || !groundConnected || !rival) return;
    if (raidParty.length || G.time < raidNext) return;
    const now = G.time, T2 = CFG.TILE, log = raidLog;
    raidNext = now + RAID_RETRY;                  // every failure below waits
    const army = groundArmy();
    const want = U.clamp(Math.round(D.waveSize * 0.22), 2, 4);
    /* Not while finishing them - everything goes at the last building - and
       not while a real force is holding our CORE.
       (measured: river, Warlord, 900 s, a brain in both seats) `now - baseT <
       20` on its own was the whole reason no raid ever formed. defendBase()
       stamps baseT for ANY armed contact of theirs within fourteen tiles of
       ANY building we own, and by t=600 we own a hundred and twenty-eight of
       them spread across the map - so it read "under attack" on 52 of 54
       attempts. That was every refusal the census showed, and because both
       refusals shared skip.army, the surplus gate got the blame for it.
       Over those 52 the weight actually at PRODUCTION or at home - baseCoreW,
       which defendBase() writes in the same breath as baseT - peaked at 0.75
       and averaged 0.09, and launchGate()'s own home-hold would have fired on
       NONE of them: a scout poking an outlying derrick was stopping the
       second front for the whole match.
       So the test is coreHeld(), the launch hold itself, and the two cannot
       disagree because they are one function. On the same run this refuses P0
       on 0 of its 52 (nothing was ever at its core) and P1 on 22 of its 52
       (something was, repeatedly, and it lost the match). */
    if (commitNow() || coreHeld(now)) { log.skip.busy++; return; }
    /* ---- THE BASE IS NOT EMPTIED ----
       groundArmy() keeps attackWave members, and defendBase() skips every
       one of them, so the hulls actually at home are counted here and as many
       as the party takes stay behind, outside any wave and not riding in a
       landing craft. */
    const away = new Set(attackWave);
    let home = 0;
    for (const u of army) if (!away.has(u) && !u.carried) home++;
    /* Any hull at home, not only the tail past the wave cap: the party leaves
       groundArmy() the moment it forms, so no launcher can take it twice, and
       whether the wave can spare it is the gate below. Standing at home,
       nearly whole, nearly full, and able to hit something on the ground. */
    const pool = [];
    for (let i = 0; i < army.length; i++) {
      const u = army[i];
      /* Aboard an LST: give() returns at once for a carried hull, and runAmphib()
         stops once pickRival() finds a road, so it may never be put ashore. */
      if (u.carried) continue;
      if (!RAID_ROLES[u.def.role] || (u.def.speed || 0) < 1.3) continue;
      if (away.has(u)) continue;
      if (u.order.type !== "idle" && u.order.type !== "guard") continue;
      if (u.hp < (u.maxHp || u.hp) * 0.7) continue;
      if (u.fuelMax && u.fuel < u.fuelMax * 0.6) continue;
      if (u.roundsMax && u.rounds < u.roundsMax * 0.5) continue;
      /* STANDING AT HOME, as the rule says - inside the fuel umbrella, which
         is where the tank reading above is a full one. A wave survivor walking
         back to its berth (padTo, set by the withdrawal) is idle only between
         that loop's re-orders; taken here it would answer to two masters. */
      if (u.padTo || !P.inBaseRadius(u.tx, u.ty)) continue;
      let ground = false;
      for (const wn of u.def.weapons) {
        const w = WEAPONS[wn];
        if (w && (!w.tgt || w.tgt.ground) && !u.manualWeapon(w)) { ground = true; break; }
      }
      if (ground) pool.push(u);
    }
    /* A party of two or three when that is what is standing at home: the
       fast-hull whitelist is short, and (smoke run) a four-hull party was
       refused on the pool on almost every attempt. */
    const size = Math.min(want, pool.length);
    if (size < 2) { log.skip.pool++; return; }
    if (home - size < size) { log.skip.home++; return; }
    pool.sort((a, b) => (b.def.speed || 0) - (a.def.speed || 0));
    const party = pool.slice(0, size);
    /* ---- A SURPLUS, OR A LULL ----
       (measured) the gate was `army - size >= max(wantSize, D.waveSize + 6)`,
       thirty and more at Warlord, and no army ever got there: skip.army on
       every attempt, no raid formed in any census. What the rule is FOR is
       that a party never shorts a launching wave, and launchGate() answers
       that directly. A party may go when:
         surplus  the army without it still passes the gate on its own
                  merits (full or edge), or
         lull     no wave is out and no launch can use it now: the launch is
                  not due inside RAID_WARN + 25 s, or the gate is shut with
                  the party at home anyway.
       A lull party is recalled by driveRaid() the moment it becomes the
       difference between launching and not. */
    const inParty = new Set(party);
    const rest = [];
    for (const u of army) if (!inParty.has(u)) rest.push(u);
    const gRest = launchGate(rest);
    const surplus = gRest.go && (gRest.why === "full" || gRest.why === "edge");
    const lull = !surplus && !attackWave.length &&
                 (waveT > RAID_WARN + 25 || !launchGate(army).go);
    log.reach++;                 // this attempt got as far as the surplus test
    if (!surplus && !lull) { log.skip.army++; return; }
    let cx = 0, cy = 0, sp = 9, fuel = 100;
    for (const u of party) {
      cx += u.x; cy += u.y;
      sp = Math.min(sp, Math.max(0.4, u.def.speed));
      if (u.fuelMax) fuel = Math.min(fuel, u.fuel);
    }
    cx /= size; cy /= size;
    /* Tiles of driving in the emptiest tank, twelve units held back; the
       straight-line budget takes another 30% off for the road. The dry test
       in driveRaid() uses the same burn, faction multiplier included. */
    const burn = CFG.FUEL_BURN_LAND * ((FACTIONS[P.faction] || {}).fuelMul || 1);
    const drive = Math.max(0, fuel - 12) / burn * sp;
    const t = raidTarget(size, cx, cy, drive / 1.3);
    if (!t) { log.skip.target++; return; }
    /* One A* on the winner only: it is across the map and a straight line is
       not a road. Path.find string-pulls its answer - rebuild() drops every
       collinear step - so the number of points is the number of CORNERS:
       forty tiles of open ground come back as two points. Each kept leg is
       one straight run along a row, a column or a diagonal, so the road in
       tiles is the sum of the legs, measured from the tile we start on. */
    const sx = (cx / T2) | 0, sy = (cy / T2) | 0;
    const tx = (t.x / T2) | 0, ty = (t.y / T2) | 0;
    const p = Path.find(G.map, sx, sy, tx, ty, "ground", null);
    let road = 0;
    if (p && p.length) {
      let px = sx, py = sy;
      for (const s of p) { road += Math.hypot(s.x - px, s.y - py); px = s.x; py = s.y; }
    }
    if (!p || !p.length || U.dist(p[p.length - 1].x, p[p.length - 1].y, tx, ty) > 4 ||
        road + t.home * 1.3 > drive) {
      raidShy.set(t.id, now + 120);
      raidNext = now + 30;
      log.skip.road++;
      return;
    }
    raidParty = party; raidTo = t; raidBook = 0;
    raidEnd = now + Math.min(90, road / sp * 1.25 + RAID_DWELL);
    for (const u of party) {
      raidBook += u.hp;
      u.flankTo = null;            // an old wave's hook leg is not this order
      u._raidXp = u.xp || 0;
      u._raidOrd = now; u._raidTries = 0;
      u.give({ type: "attackmove", x: t.x, y: t.y });
    }
    log.formed++;
    if (surplus) warLog.raidSurplus++; else warLog.raidLull++;
  }

  function driveRaid() {
    if (!raidParty.length) return;
    const now = G.time, T2 = CFG.TILE, log = raidLog;
    const keep = [];
    let hp = 0, cx = 0, cy = 0, idle = 0;
    for (const u of raidParty) {
      if (u.dead) {
        raidDead.push({ x: u.x, y: u.y, t: now });
        log.lost += P.factionCost(u.def);
        continue;
      }
      keep.push(u); hp += u.hp; cx += u.x; cy += u.y;
      /* combat.js pays a shooter xp for damage done and for kills, so the
         delta is the work this party did - read off our own hulls */
      const xp = u.xp || 0;
      if (xp > (u._raidXp || 0)) { log.xp += xp - (u._raidXp || 0); u._raidXp = xp; }
      if (u.order.type === "idle" || u.order.type === "guard") idle++;
    }
    if (raidDead.length > 16) raidDead.splice(0, raidDead.length - 16);
    raidParty = keep;
    const blame = Math.min(300, (D.waveTime || 150) * 0.9);
    if (!keep.length) { log.end.wiped++; endRaid(blame, RAID_GAP * 1.5); return; }
    cx /= keep.length; cy /= keep.length;
    const back = raidFuelPoint(cx, cy);
    const stop = (why, shyFor, gap) => {
      log.end[why]++;
      endRaid(shyFor, gap, raidStand(back, cx, cy));
    };
    /* Hurt or crowded while still inside our own base radius is the BASE
       under attack, not the objective defended: the party is released to
       defendBase() all the same, but the place it never reached is not
       written off, and the census books it as "home", not as a failed raid. */
    const atHome = U.dist(cx, cy, back.x, back.y) <= CFG.BUILD_RADIUS * T2;
    const burn = CFG.FUEL_BURN_LAND * ((FACTIONS[P.faction] || {}).fuelMul || 1);
    let dry = false;
    for (const u of keep) {
      if (!u.fuelMax) continue;
      const sp = Math.max(0.4, u.def.speed);
      if (u.fuel < U.dist(u.x, u.y, back.x, back.y) / T2 * 1.3 / sp * burn + 6) { dry = true; break; }
    }
    /* ---- the rule that makes this a raid and not a queue ----
       waveSpent() with a far shorter fuse. A raid that is taking losses has
       already failed - its premise was that the place was not defended - so
       it leaves at a THIRD, where the wave holds on to 0.55. */
    const spent = raidBook > 0 ? 1 - hp / raidBook : 0;
    if (spent > 0.33) { stop(atHome ? "home" : "spent", atHome ? 0 : blame, RAID_GAP); return; }
    if (dry) { stop("dry", 0, RAID_GAP); return; }
    if (now > raidEnd) { stop("life", 0, RAID_GAP); return; }
    if (!groundConnected || !rival || rival.idx !== raidTo.own) { stop("cut", 0, RAID_GAP); return; }
    /* The main push is due. If the army at home cannot make up the wave
       without the party, the party is released NOW, so the launch reads it
       back into groundArmy(). Only when that changes something: a launch
       that stays blocked with the party home as well is not worth a recall. */
    if (waveT < RAID_WARN) {
      const ga = groundArmy();
      if (!launchGate(ga).go && launchGate(ga.concat(keep)).go) { stop("wave", 0, 20); return; }
    }
    /* a gun nobody had seen when the target was picked */
    if (exposureAt(cx, cy, 1) > RAID_FIRE * 1.5) { stop("fire", blame, RAID_GAP); return; }
    /* Outgunned: armed ground contacts in view NOW (seen within four
       seconds; the picture refreshes every 0.8) inside nine tiles, a heavy
       hull counted as one and a half and a foot soldier as a half. And the
       nearest of the rival's lorries in view, as a POSITION to drive at. */
    let foes = 0, prey = null, pd = T2 * 16;
    for (const r of seenU.values()) {
      if (r.layer !== "ground") continue;
      const age = now - r.t;
      if (age > 8) continue;
      const d = U.dist(r.x, r.y, cx, cy);
      if (r.harvester || r.role === "mcv") {
        if (r.own === raidTo.own && d < pd) { pd = d; prey = r; }
      } else if (r.armed && age <= 4 && d < T2 * 9) {
        foes += r.armor === "heavy" ? 1.5 : (r.cat === "infantry" ? 0.5 : 1);
      }
    }
    if (foes >= Math.max(2, keep.length)) {
      stop(atHome ? "home" : "outgunned", atHome ? 0 : blame, RAID_GAP);
      return;
    }
    /* On the objective with nothing left in reach to shoot: follow the
       nearest lorry in view, or finish. A structure target is finished when
       the picture strikes it off, which happens because we are looking. */
    if (idle === keep.length && U.dist(cx, cy, raidTo.x, raidTo.y) < T2 * 4) {
      if (prey) {
        raidTo.x = prey.x; raidTo.y = prey.y;
        for (const u of keep) u._raidTries = 0;
      } else if (raidTo.kind === "ore") { stop("empty", 60, RAID_GAP); return; }
      else {
        const rec = seenB.get(raidTo.id);
        if (!rec || rec.gone) { stop("done", 0, RAID_GAP); return; }
      }
    }
    /* Idle hulls short of the aim point are sent on - no more than every four
       seconds each, and no more than four times without reaching it: give()
       drops the path, and a hull that cannot get there would otherwise ask A*
       for a failing search twice a second for the rest of the raid. A hull
       that IS there clears its count. An idle hull acquires with no resume
       point, so every kill on the objective leaves it standing wherever the
       target died; that walk back is not a failure, and counting it ended
       working raids as "stuck". */
    for (const u of keep) {
      if (u.order.type !== "idle" && u.order.type !== "guard") continue;
      if (U.dist(u.x, u.y, raidTo.x, raidTo.y) < T2 * 3) { u._raidTries = 0; continue; }
      if (now - (u._raidOrd || 0) < 4) continue;
      if (++u._raidTries > 4) { stop("stuck", 120, RAID_GAP); return; }
      u._raidOrd = now;
      u.give({ type: "attackmove", x: raidTo.x, y: raidTo.y });
    }
  }

  /* for intel(): inWave must read 0 on every sample */
  function raidState() {
    let hp = 0, inWave = 0;
    for (const u of raidParty) {
      if (u.dead) continue;
      hp += u.hp;
      if (attackWave.indexOf(u) >= 0) inWave++;
    }
    return { party: raidParty.length, inWave,
             to: raidTo ? { kind: raidTo.kind, tx: (raidTo.x / CFG.TILE) | 0,
                            ty: (raidTo.y / CFG.TILE) | 0, worth: raidTo.worth } : null,
             spent: raidBook > 0 ? Math.round((1 - hp / raidBook) * 100) / 100 : 0,
             life: raidParty.length ? Math.round(raidEnd - G.time) : 0,
             next: raidParty.length ? 0 : Math.max(0, Math.round(raidNext - G.time)),
             shy: raidShy.size, dead: raidDead.length,
             formed: raidLog.formed, reach: raidLog.reach,
             xp: Math.round(raidLog.xp), lost: raidLog.lost,
             end: Object.assign({}, raidLog.end), skip: Object.assign({}, raidLog.skip) };
  }

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
       3 ABEAM a structure we have seen, not past it. One remembered
         outbuilding is nearly always the edge of a base whose middle we have
         never seen - but the middle is the one part of it we never have to
         drive into to find, because it is bracketed by what we already hold.
         What is genuinely unknown is what lies to either SIDE of it.
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
  /* ---- what a scout may look at, and from how far ----
     intelSweep() paints the look grid and runs noteContact() at the unit's own
     sightR(), so a Humvee standing eight tiles off a position writes down
     exactly what one parked on the construction yard would: the same tiles,
     the same structures, and the same prune of the hypothesis. The last eight
     tiles bought no information at all and cost the vehicle. recon_n sees 9.5
     tiles, so the standoff is sightR - 1.5 - margin for the pathfinder, which
     only reports arrival within 0.8 tiles of the aim POINT.

     SCOUT_DANGER is where the scout stops volunteering. The four emplacements
     that carry a ground weapon price out, against a soft-skinned truck at
     hardShare 0.15, at nest 24.5, coastal 23.1, atpost 11.4 and arty 5.8 hit
     points a second; recon_n has 340. Two a second is therefore "nothing is
     really shooting at this" - nearly three minutes of standing there - while
     one machine-gun nest is twelve times over the line and kills the vehicle
     in fourteen seconds. And the gate is honest in both directions:
     exposureAt() is stamped from seenB alone, so it reads zero over ground
     whose guns we have never seen and the FIRST approach to an unexamined
     position is exactly as bold as it ever was. What it refuses is the SECOND
     one - the drive back into a base we have already found and already been
     shot out of, which is the one the owner kept watching. */
  const SCOUT_HS = 0.15, SCOUT_DANGER = 2.0, SHY_CELL = 4;
  /* One key per four-tile cell, which is the same grain the threat field is
     stamped on: a refusal finer than that would be re-derived a tile away and
     the loop would simply shuffle sideways. */
  function shyKey(x, y) {
    return (((y / CFG.TILE / SHY_CELL) | 0) << 10) | ((x / CFG.TILE / SHY_CELL) | 0);
  }
  /* ========================== RECONNAISSANCE ===========================
     (owner) "ai should scout and expand quickly and develop quickly."
     (owner) "ai should have the same fog like us. don't assume and make ai
     know everything."

     What the scouts were doing, and why each piece below exists:

       - THEY RAN DRY AND STAYED THERE. A ground hull burns CFG.FUEL_BURN_LAND
         (1.5/s x fuelMul) whenever it moves and refuels only inside
         CFG.BUILD_RADIUS of a structure we own, so a Humvee's full tank is
         about sixty-seven seconds of driving - some 170 tiles on good going.
         Goals were priced on staleness and distance and never on fuel: a first
         leg of 40 to 70 tiles to the enemy start (kuwait 40, fulda 41, korea
         70) and then the ore-block tour ended with the car at zero wherever it
         happened to be. A dry scout is still alive, so it still counted
         against D.scouts and was never replaced. Every goal is now priced out
         AND back, a scout turns for refuelling ground while it can still reach
         it, and a dry one is written off as a fixed post so the purchase
         replaces it.
       - THEY WERE SKIPPED. The sweep sat at the foot of think(), below fifteen
         `... && tryBuildUnit(..)) return;` lines, so any think that bought an
         aircraft, a hull or a launcher left every scout unmanaged. It runs off
         update() on its own clock now, the way the raid driver does.
       - THEY WERE BOUGHT BEHIND THE ARMY GATE and counted without the queue,
         so none was bought while the army was at strength and two on the ramp
         read as none: korea P0 held four recon against a target of three at
         t=300.
       - THEY NEVER LOOKED FOR OIL. expandNode() takes only a node whose tile
         this commander has overlooked - the player's own fog rule - and the
         goal list was start sites, ore blocks, the flanks of seen structures
         and the lane to the objective. A node away from ore was found by
         accident or not at all: taiwan P1 read node=false for the whole
         1,200 s battle with a free node 32 tiles from its yard. The search
         grid below reaches ground none of those families does, weighted to
         the band a rig can drive to.
       - THEY NEVER WENT BACK. After the first look at the enemy start a
         remembered structure re-entered the auction at 1.3 x a ceiling of 300
         against 1.6 x 900 for any unvisited ore block, so the barracks and the
         factory put up after minute one were first seen when the wave got
         there (fulda: one or two objectives known at t=150 and t=300). Under
         the defeat rule a production building IS the war aim, so it is looked
         at again on a timer - D.scoutT x RELOOK_K, 72 s at Warlord and 280 s
         at Recruit - which is also what keeps seenU, and so counterMix(),
         supplied with what is standing around it.
       - THEY COULD NOT CROSS WATER AND NOTHING ELSE LOOKED. Taiwan: both seats
         held seenUnits=0 for 1,200 s. A ground goal is now filtered to the
         scout's own landmass (one terrain flood fill a battle), and where the
         rival cannot be walked to, one surface hull and - when the ramp can
         spare one - one aircraft are detailed as eyes.
       - THREE SCOUTS DID ONE JOB. All of them ran the same auction, so the
         first bid of the battle sent every scout at the same start site. Now
         one FINDS (start sites, then the enemy's production on the timer, then
         the ground around it), one PROSPECTS (the expansion band and the oil
         already seen), one PICKETS (the narrowest point of the route the enemy
         has to use, held for POST_HOLD seconds at a time), and a place another
         scout is already driving to is not bid.

     FOG. What is priced here is terrain (published), our own units and
     buildings, the look grid our own sensors painted, and the seenB / seenU
     plot - nothing else. An oil node exists for this code only once its tile
     has been overlooked, its occupant is known only from seenB, and the only
     footprints a goal is kept off are our OWN (G.occ is read for our own
     building ids and nothing else - the earlier test read today's enemy
     occupancy off a look up to four seconds old). The scout sees exactly what its own sightR() lets
     intelSweep() write down; nothing here writes the picture.

     COST. driveScouts() runs every two seconds: one pass over P.units and
     P.buildings, per-scout arithmetic, and scoutGoal() only for a scout that
     needs a task - a few times a minute each. scoutGoal() is at most ~324
     search cells x (five look reads and a few compares), with a cheap score
     cut-off before the dearer tests, plus the plot, the ore blocks and the
     oil nodes: tens of thousands of operations, not per frame and never
     units x units. The two flood fills (ground and sea, 20,736 tiles each)
     and the cell table are built once a battle. The pump field - a bucket
     Dijkstra over the same tiles, ~2e5 compares - is rebuilt when the pumps
     change, at most every fifteen seconds and at least every sixty, and for
     the sea only while a sea scout exists. The picket's route is the
     A* pickRival() already runs every 25 s, cached, and its choke is
     re-measured once a minute over at most ~40 route points x 14 tiles.   */
  const RECON_CELL = 8;          // tiles per search cell: 18 x 18 over a 144 map
  const POST_HOLD = 45;          // seconds a picket watches from its post
  const RELOOK_K = 4;            // production is re-examined every D.scoutT x this
  const CLAIM_R = 10;            // tiles: two scouts closer than a sight radius overlap
  const CELL_DX = [0, -3, 3, -3, 3], CELL_DY = [0, -3, -3, 3, 3];
  /* Air defence on a CONTACT is the catalogue reach written down at contact
     (noteSighting: G.airDefenceReach off the published table), drawn the way
     the engine draws its own threat ring - 1.25x plus a 2.5-tile margin. A
     class table here missed corvettes and carriers (10.6) and under-ringed
     SPAAG (10.8) and MANPADS (10.2) once generations.js rebuilt the ranges.
     Structures use aaProfile() off the same table. */
  /* ...and the surface gun and missile reach of a hull, by class: patrol hmg
     5.4, corvette 57 mm 7.2, destroyer 127 mm 11, missile boat SSM 13.5,
     cruiser 203 mm 17 */
  const SEA_R = { patrol: 7, corvette: 9, destroyer: 12, missileboat: 15, cruiser: 18 };
  /* how much each kind of look is worth to each job */
  const SCOUT_WT = {
    find:     { relook: 1.5, abeam: 1.3, ore: 1.0, oil: 0.6, cell: 1.0, lane: 1.1, post: 0 },
    prospect: { relook: 0.5, abeam: 0.6, ore: 1.4, oil: 1.6, cell: 1.3, lane: 0.3, post: 0 },
    picket:   { relook: 0.3, abeam: 0.3, ore: 0.3, oil: 0.5, cell: 0.3, lane: 0.3, post: 1 },
    sea:      { relook: 1.5, abeam: 1.2, ore: 0,   oil: 0.4, cell: 1.0, lane: 1.0, post: 0 },
    air:      { relook: 1.6, abeam: 1.3, ore: 0.5, oil: 0.8, cell: 1.0, lane: 1.0, post: 0 },
  };
  const FUEL_EDGE = { ground: 9, sea: 6, air: 0 };   // tiles inside which a hull tops up

  function scoutLogNew() {
    return { sweeps: 0, runs: 0, refuels: 0, stalls: 0, unreach: 0, none: 0,
             stranded: 0, posts: 0, seaTasked: 0, airTasked: 0, airFreed: 0, oneway: 0,
             jobs: {}, fam: {} };
  }
  /* (a structure whose loss takes a production queue away is isProd(),
     defined once beside the war aim) */
  /* The rival's production as the plot has it - for the targeting code as much
     as for the re-look timer. */
  function prodSeen() {
    const out = [], rid = rival ? rival.idx : -1;
    for (const r of seenB.values())
      if (!r.gone && r.own >= 0 && (rid < 0 || r.own === rid) && isProd(r.key)) out.push(r);
    return out;
  }
  /* ---- every oil node this commander has actually overlooked ----
     With what its own sensors say about it: `ours` off our own buildings,
     `foe` off a remembered derrick standing on it, `age` off the look grid.
     A node on ground nobody of ours has looked at is not in the list at all,
     and G.map.oilNodes[].taken - which flips when ANY player drills anywhere -
     is never read. This is the list the expansion code should plan from. */
  function oilKnown() {
    const out = [], M = G.map, W = M.W, now = G.time;
    if (!look) return out;
    const dd = BUILDINGS.derrick || { w: 2, h: 2 };
    for (const n of M.oilNodes) {
      const b = look[n.y * W + n.x];
      if (!b) continue;
      let ours = false, foe = false;
      for (const o of P.buildings) {
        if (o.dead || o.def.id !== "derrick") continue;
        if (n.x >= o.tx && n.x < o.tx + o.def.w && n.y >= o.ty && n.y < o.ty + o.def.h) { ours = true; break; }
      }
      if (!ours) for (const r of seenB.values()) {
        if (r.gone || r.key !== "derrick") continue;
        if (n.x >= r.tx && n.x < r.tx + dd.w && n.y >= r.ty && n.y < r.ty + dd.h) { foe = true; break; }
      }
      out.push({ x: n.x, y: n.y, age: now - b * 4, ours, foe });
    }
    return out;
  }

  /* ---- which ground joins which ----
     Terrain never changes at runtime, so the answer is computed once a battle
     per layer - and it is computed by Path, which needs exactly the same
     labels to refuse a goal it cannot reach. One flood fill, one array, and
     no way for the commander's picture of the map to drift from the routes it
     is actually given. 0 means impassable. */
  function compOf(layer) {
    if (layer === "air") return null;
    return Path.components(G.map, layer === "ground" ? "ground" : "sea");
  }
  /* the piece a unit is standing on; a unit on a bridge end or a shore tile
     reads its neighbour's. 0 = unknown, and unknown filters nothing. */
  function compAt(lab, x, y) {
    const W = G.map.W, H = G.map.H;
    const tx = (x / CFG.TILE) | 0, ty = (y / CFG.TILE) | 0;
    for (let r = 0; r <= 1; r++)
      for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
        const nx = tx + dx, ny = ty + dy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const c = lab[ny * W + nx];
        if (c) return c;
      }
    return 0;
  }
  /* ---- the search grid ----
     One representative tile per cell and layer - the passable tile nearest
     the cell's middle - found once. -1 where the layer has no tile at all. */
  function reconCells() {
    if (reconGrid) return reconGrid;
    const M = G.map, C = RECON_CELL, W = M.W;
    const pick = (x0, y0, x1, y1, mx, my, layer) => {
      let best = -1, bd = 1e9;
      for (let y = Math.max(1, y0); y < Math.min(M.H - 1, y1); y++)
        for (let x = Math.max(1, x0); x < Math.min(W - 1, x1); x++) {
          if (!GameMap.passable(M, x, y, layer)) continue;
          const d = (x - mx) * (x - mx) + (y - my) * (y - my);
          if (d < bd) { bd = d; best = y * W + x; }
        }
      return best;
    };
    reconGrid = [];
    for (let y0 = 0; y0 < M.H; y0 += C) for (let x0 = 0; x0 < W; x0 += C) {
      const x1 = Math.min(W, x0 + C), y1 = Math.min(M.H, y0 + C);
      const mx = (x0 + x1) >> 1, my = (y0 + y1) >> 1;
      reconGrid.push({ cx: mx, cy: my, g: pick(x0, y0, x1, y1, mx, my, "ground"),
                       s: pick(x0, y0, x1, y1, mx, my, "sea") });
    }
    return reconGrid;
  }
  /* What a look at a cell is worth, off five sample tiles: ground nobody has
     ever overlooked is worth 900, the same figure the old bid gave virgin
     ground, scaled a little by how much of the cell it is; a cell we have
     seen is worth its age, capped at 300, and nothing inside 45 s. */
  function cellNews(c, now) {
    const M = G.map, W = M.W;
    let unseen = 0, oldest = 0;
    for (let k = 0; k < 5; k++) {
      const x = U.clamp(c.cx + CELL_DX[k], 0, W - 1), y = U.clamp(c.cy + CELL_DY[k], 0, M.H - 1);
      const b = look[y * W + x];
      if (!b) unseen++;
      else { const a = now - b * 4; if (a > oldest) oldest = a; }
    }
    if (unseen) return 900 * (0.5 + 0.1 * unseen);
    return oldest < 45 ? 0 : Math.min(300, oldest);
  }

  /* ---- fuel: where a hull can top up, and what a leg costs ----
     The same rules the engine applies to everybody: a ground hull refuels
     inside CFG.BUILD_RADIUS of any structure of ours that is not a field
     obstacle, a ship within eight tiles of a naval yard, an aeroplane on its
     own ramp. The ground list is thinned to one structure per six-tile block. */
  let fuelAt = { ground: [], sea: [], air: [] };
  function refreshAnchors() {
    const g = [], s = [], a = [], seen = new Set();
    for (const b of P.buildings) {
      if (b.dead || b.buildProgress < 1 || !b.def || b.def.obstacle) continue;
      if (b.def.produces === "naval") s.push(b);
      if (b.def.produces === "aircraft") a.push(b);
      const k = ((b.ty / 6) | 0) * 1024 + ((b.tx / 6) | 0);
      if (seen.has(k)) continue;
      seen.add(k); g.push(b);
    }
    fuelAt = { ground: g, sea: s, air: a };
  }
  function fuelKey(s) { return s.layer === "air" ? "air" : s.cat === "naval" ? "sea" : "ground"; }
  function nearestFuel(key, x, y) {
    let best = null, bd = Infinity;
    for (const b of fuelAt[key]) {
      const d = U.dist2(x, y, b.x, b.y);
      if (d < bd) { bd = d; best = b; }
    }
    return best ? { b: best, d: Math.sqrt(bd) / CFG.TILE } : null;
  }
  /* ---- how far the pumps are, by the road the hull will actually take ----
     Priced first on the straight line, and measured on korea that was wrong
     by the whole margin: the outbound leg to the enemy start ran 1.1x the
     crow's distance, the leg home from the cell beyond it 1.6x, and the car
     that had turned for home at 45 fuel, 68 tiles out, ran dry 14 tiles short
     of the refuelling edge. The road between the two korean starts is 100
     tiles against 70 straight; this field puts the enemy start 90 seconds
     from our pumps at speed 1, which a Humvee (2.85 t/s, 1.5 fuel/s) cannot
     go out to and come back from on one tank - and now knows it cannot.
     So: a multi-source Dijkstra from every tile where the layer tops up,
     costed as Path.find costs a step - the step over the terrain speed, no
     corner cutting - which makes the value "seconds at speed 1", and a leg's
     fuel is value / speed x burn. Dial's bucket queue on integer tenths over a
     per-tile cost table built once a battle: typed arrays and int stacks, no
     heap, no per-node allocation. Measured under jsc on korea and fulda,
     2-9 ms a build once warm. Rebuilt when the set of pumps changes, at most
     every fifteen seconds, and every sixty regardless - a pump lost makes the
     old field optimistic, a pump gained only makes it cautious. */
  const FIELD_NB = 128, FIELD_INF = 65535;
  const homeField = { ground: null, sea: null }, fieldCost = { ground: null, sea: null };
  const fieldT = { ground: -1e9, sea: -1e9 }, fieldSig = { ground: -1, sea: -1 };
  let fieldBk = null;
  function fieldReset() {
    homeField.ground = homeField.sea = null;
    fieldCost.ground = fieldCost.sea = null;
    fieldT.ground = fieldT.sea = -1e9;
    fieldSig.ground = fieldSig.sea = -1;
  }
  function costOf(key) {
    if (fieldCost[key]) return fieldCost[key];
    const M = G.map, W = M.W, N = W * M.H, ly = key === "sea" ? "sea" : "ground";
    const c = new Uint8Array(N);
    for (let i = 0; i < N; i++) {
      const x = i % W, y = (i / W) | 0;
      if (!GameMap.passable(M, x, y, ly)) continue;
      c[i] = Math.max(1, Math.min(90, Math.round(10 / Math.max(0.15, GameMap.speedAt(M, x, y, ly)))));
    }
    return (fieldCost[key] = c);
  }
  function fieldOf(key) {
    if (key === "air") return null;
    const now = G.time, anchors = fuelAt[key];
    let sig = anchors.length * 7919;
    for (const b of anchors) sig = (sig * 31 + b.id) % 1000000007;
    const have = homeField[key], age = now - fieldT[key];
    if (have && age < 60 && (sig === fieldSig[key] || age < 15)) return have;
    fieldT[key] = now; fieldSig[key] = sig;
    const M = G.map, W = M.W, H = M.H, cost = costOf(key);
    const dist = have || (homeField[key] = new Uint16Array(W * H));
    dist.fill(FIELD_INF);
    if (!fieldBk) { fieldBk = []; for (let i = 0; i < FIELD_NB; i++) fieldBk.push([]); }
    for (const bk of fieldBk) bk.length = 0;
    const R = FUEL_EDGE[key], MASK = FIELD_NB - 1;
    let pending = 0;
    for (const b of anchors) {
      const cx = b.tx + b.def.w / 2, cy = b.ty + b.def.h / 2;
      const y0 = Math.max(0, Math.floor(cy - R)), y1 = Math.min(H - 1, Math.ceil(cy + R));
      const x0 = Math.max(0, Math.floor(cx - R)), x1 = Math.min(W - 1, Math.ceil(cx + R));
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
        const i = y * W + x;
        if (dist[i] === 0 || !cost[i] || (x - cx) * (x - cx) + (y - cy) * (y - cy) > R * R) continue;
        dist[i] = 0; fieldBk[0].push(i); pending++;
      }
    }
    const relax = (j, nd) => {
      if (nd >= dist[j]) return;
      dist[j] = nd; fieldBk[nd & MASK].push(j); pending++;
    };
    for (let cur = 0; pending > 0 && cur < FIELD_INF - FIELD_NB; cur++) {
      const bk = fieldBk[cur & MASK];
      while (bk.length) {
        const i = bk.pop(); pending--;
        if (dist[i] !== cur) continue;              // improved since it was queued
        const cx = i % W;
        const cL = cx > 0 ? cost[i - 1] : 0, cR = cx < W - 1 ? cost[i + 1] : 0;
        const cU = i >= W ? cost[i - W] : 0, cD = i < (H - 1) * W ? cost[i + W] : 0;
        let c;
        if (cL) relax(i - 1, cur + cL);
        if (cR) relax(i + 1, cur + cR);
        if (cU) relax(i - W, cur + cU);
        if (cD) relax(i + W, cur + cD);
        /* a diagonal only past two open orthogonals, as Path.find allows */
        if (cL && cU && (c = cost[i - W - 1])) relax(i - W - 1, cur + ((c * 1.414 + 0.5) | 0));
        if (cR && cU && (c = cost[i - W + 1])) relax(i - W + 1, cur + ((c * 1.414 + 0.5) | 0));
        if (cL && cD && (c = cost[i + W - 1])) relax(i + W - 1, cur + ((c * 1.414 + 0.5) | 0));
        if (cR && cD && (c = cost[i + W + 1])) relax(i + W + 1, cur + ((c * 1.414 + 0.5) | 0));
      }
    }
    return dist;
  }
  /* seconds-at-speed-1 from this point to the pumps; Infinity if none reach */
  function homeTime(key, x, y) {
    if (key === "air") {
      const nf = nearestFuel("air", x, y);
      return nf ? nf.d : U.dist(x, y, P.homeX, P.homeY) / CFG.TILE;
    }
    const f = fieldOf(key);
    const tx = U.clamp((x / CFG.TILE) | 0, 0, G.map.W - 1), ty = U.clamp((y / CFG.TILE) | 0, 0, G.map.H - 1);
    const v = f[ty * G.map.W + tx];
    return v === FIELD_INF ? Infinity : v / 10;
  }
  function burnOf(s) {
    const mul = (FACTIONS[P.faction] || {}).fuelMul || 1;
    if (s.layer === "air") return (s.airBurn ? s.airBurn() : CFG.FUEL_BURN_AIR) * mul;
    return (s.cat === "naval" ? CFG.FUEL_BURN_SEA : CFG.FUEL_BURN_LAND) * mul;
  }
  /* Fuel for `t` seconds-at-speed-1 of driving: the listed speed, never more
     than the hull is making right now (supply strain slows a car that has been
     out a while), a fifth on top and eight in hand. */
  function fuelFor(s, t) {
    const burn = burnOf(s);
    if (!burn || !s.fuelMax) return 0;
    const sm = s.speedMul ? s.speedMul() : 1;
    const sp = Math.max(0.3, s.def.speed * U.clamp(sm || 1, 0.6, 1));
    return Math.max(0, t) / sp * burn * 1.2 + 8;
  }
  function fuelOk(s, x, y, trip) {
    if (!s.fuelMax || !burnOf(s)) return true;
    const key = fuelKey(s);
    const back = homeTime(key, x, y);
    if (back === Infinity) return false;
    /* an aeroplane turns for home at forty per cent on its own, so the leg out
       has to come out of what is above that - or above the distance reserve,
       if the goal is further out than forty per cent will carry it back */
    if (key === "air")
      return s.fuel >= fuelFor(s, trip) + Math.max(s.fuelMax * 0.4, fuelFor(s, back));
    /* the leg out: at least the straight line with a margin, and at least the
       difference between the two ends' distances home, which the road cannot
       beat (triangle inequality on the field) */
    const here = homeTime(key, s.x, s.y);
    const out = Math.max(trip * 1.15, here === Infinity ? 0 : Math.abs(back - here));
    return s.fuel >= fuelFor(s, out + back);
  }
  /* Home by the field's own gradient, not the crow's line to the nearest
     building: from the car's tile, step to the cheapest neighbour until the
     pumps, and drive there. A few hundred compares. */
  function goRefuel(s, nf) {
    const T = CFG.TILE, key = fuelKey(s), M = G.map, W = M.W;
    let x, y;
    const f = fieldOf(key);
    let tx = U.clamp((s.x / T) | 0, 0, W - 1), ty = U.clamp((s.y / T) | 0, 0, M.H - 1);
    if (f && f[ty * W + tx] !== FIELD_INF) {
      for (let n = 0; n < 400 && f[ty * W + tx] > 0; n++) {
        let bx = tx, by = ty, bv = f[ty * W + tx];
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          const nx = tx + dx, ny = ty + dy;
          if (nx < 0 || ny < 0 || nx >= W || ny >= M.H) continue;
          const v = f[ny * W + nx];
          if (v < bv) { bv = v; bx = nx; by = ny; }
        }
        if (bx === tx && by === ty) break;
        tx = bx; ty = by;
      }
      x = (tx + 0.5) * T; y = (ty + 0.5) * T;
    } else {
      if (!nf) return;
      const b = nf.b, d = Math.max(1, U.dist(s.x, s.y, b.x, b.y));
      const k = Math.min(d, Math.max(1, FUEL_EDGE[key] - 3) * T) / d;
      x = b.x + (s.x - b.x) * k; y = b.y + (s.y - b.y) * k;
    }
    const o = s.order;
    /* give() drops the path, so the same order is not handed out twice */
    if (o && o.type === "move" && U.dist(o.x, o.y, x, y) < T * 3) return;
    s.give({ type: "move", x, y });
  }
  function clearGoal(s) { s._scoutEnd = 0; s._scoutGoal = null; s._postUntil = 0; }
  let oneWayT = 0;               // the next time a car may be spent on a one-way look
  function rivalOnPlot() {
    const rid = rival ? rival.idx : -1;
    for (const r of seenB.values())
      if (!r.gone && r.own >= 0 && (rid < 0 || r.own === rid)) return true;
    return false;
  }

  /* ---- the picket's posts ----
     The route pickRival() planned to where we believe the rival lives, walked
     in two-tile steps between a quarter and three-fifths of the way, measuring
     how much passable ground lies across it within seven tiles either side.
     The narrowest place is where anything coming has to pass, and the post is
     three tiles back from it on our side so the gap is watched rather than
     blocked. The second post is the route at 55%, further forward. Terrain and
     our own belief about their home; nothing else. */
  let postList = null, postT = -1e9;
  function picketPosts() {
    if (postList && G.time - postT < 60) return postList;
    postT = G.time; postList = [];
    const path = rivalPath, M = G.map, T2 = CFG.TILE;
    if (!path || path.length < 1) return postList;
    const hx = P.homeX / T2, hy = P.homeY / T2;
    const segs = [];
    let px = hx, py = hy, total = 0;
    for (const q of path) {
      const L = U.dist(px, py, q.x, q.y);
      if (L > 0.01) { segs.push({ x0: px, y0: py, x1: q.x, y1: q.y, L }); total += L; }
      px = q.x; py = q.y;
    }
    if (total < 16) return postList;
    let acc = 0, bestS = Infinity, choke = null, fwd = null;
    for (const sg of segs) {
      const ux = (sg.x1 - sg.x0) / sg.L, uy = (sg.y1 - sg.y0) / sg.L;
      for (let t = 0; t < sg.L; t += 2) {
        const frac = (acc + t) / total;
        if (frac < 0.25 || frac > 0.6) continue;
        const x = sg.x0 + ux * t, y = sg.y0 + uy * t;
        let wide = 1;
        for (let side = -1; side <= 1; side += 2)
          for (let k = 1; k <= 7; k++) {
            if (!GameMap.passable(M, Math.round(x - uy * k * side), Math.round(y + ux * k * side), "ground")) break;
            wide++;
          }
        const sc = wide + Math.abs(frac - 0.4) * 4;
        if (sc < bestS) { bestS = sc; choke = { x, y }; }
        if (!fwd && frac >= 0.55) fwd = { x, y };
      }
      acc += sg.L;
    }
    const place = (p, back) => {
      const dx = hx - p.x, dy = hy - p.y, L = Math.hypot(dx, dy) || 1;
      const tx = Math.round(p.x + dx / L * back), ty = Math.round(p.y + dy / L * back);
      const n = GameMap.passable(M, tx, ty, "ground") ? { x: tx, y: ty }
              : Path.nearest(M, tx, ty, "ground", null, 3);
      if (!n) return;
      const wx = (n.x + 0.5) * T2, wy = (n.y + 0.5) * T2;
      if (exposureAt(wx, wy, SCOUT_HS) > SCOUT_DANGER) return;
      postList.push({ x: wx, y: wy });
    };
    if (choke) place(choke, 3);
    if (fwd && (!choke || U.dist(fwd.x, fwd.y, choke.x, choke.y) > 8)) place(fwd, 0);
    return postList;
  }

  /* ---- who scouts, and at what ----
     Ground scouts by the order they were built, so a job does not hop from car
     to car. Where the rival cannot be walked to, the ground's work is the home
     landmass: its oil and its coast. */
  function jobFor(i, n) {
    if (!groundConnected) return i === 1 ? "picket" : "prospect";
    if (n <= 1 || i === 0) return "find";
    if (i === 1) return "prospect";
    if (i === 2) return "picket";
    return i % 2 ? "prospect" : "find";
  }
  /* One surface hull is detailed as eyes where the rival is across water, or
     where the fleet is big enough to spare one: the cheapest armed hull that
     is fast (a destroyer at 2.3 is not a scout) and not in a naval wave.
     Designated rather than bought - the fleet buys hulls anyway - and kept
     until it dies. The naval-wave filter in think() leaves it out. */
  /* Not a hull that is in a fight. Measured on taiwan with no such test:
     seven hulls detailed in 720 s, every one of them killed by enemy
     corvettes - one seven seconds after it was named, thirty tiles out in the
     wake of a naval wave it had been sailing with, and the next taken on the
     spot in waters the enemy was raiding. So: not on an attack order, not hit
     in the last thirty seconds, seven-tenths of its hull or better, and after
     a loss the job waits a minute. */
  let seaRef = null, seaLostT = -1e9, airRef = null, airLostT = -1e9;
  function seaScout() {
    let cur = null, best = null, bc = Infinity, armed = 0;
    const now = G.time;
    if (seaRef && (seaRef.dead || seaRef._scout !== "sea")) {
      if (seaRef.dead) seaLostT = now;
      seaRef = null;
    }
    for (const u of P.units) {
      if (u.dead || u.cat !== "naval" || u.layer !== "sea") continue;
      if (u._scout === "sea") { cur = u; continue; }
      const d = u.def;
      if (!d.weapons.length || d.amphib || d.supply || d.repairRate || d.carrier) continue;
      if (d.role === "minesweeper" || d.role === "navminelayer") continue;
      armed++;
      if (d.speed < 2.4 || d.role === "destroyer" || d.role === "cruiser" ||
          navalWave.indexOf(u) >= 0) continue;
      const o = u.order.type;
      if (o !== "idle" && o !== "guard" && o !== "move") continue;
      if ((u.lastHitAt && now - u.lastHitAt < 30) || u.hp < u.maxHp * 0.7) continue;
      const c = P.factionCost(d);
      if (c < bc) { bc = c; best = u; }
    }
    if (cur) return (seaRef = cur);
    if (!D.navy || (D.read || 0) < 0.35 || !best || now - seaLostT < 60) return null;
    if (groundConnected && armed < 4) return null;
    best._scout = "sea"; scoutLog.seaTasked++;
    return (seaRef = best);
  }
  /* An aircraft is detailed only when the ground cannot do the job: the rival
     is across water, or more than one start is still unexamined, or nothing
     of theirs is on the plot at all after the first minute and a half. The
     cheapest airframe the ramp can spare - a second gunship, a second ASW
     helicopter, a third fighter. Never the AEW aircraft, a tanker, a Weasel or
     a bomber, and never the only one of its kind. Released back to the sortie
     loop the moment it is not wanted. */
  function wantAirEyes() {
    if (!D.air || (D.read || 0) < 0.35) return false;
    if (!groundConnected || hypo.length > 1) return true;
    if (!rivalOnPlot()) return G.time > 90;
    /* The ground cannot keep the production picture fresh when the enemy
       base is beyond a car's round trip (korea): a look three timers old is
       an air job until it is fresh again. */
    const due = (D.scoutT || 32) * RELOOK_K * 3;
    for (const r of prodSeen()) if (G.time - r.t > due) return true;
    return false;
  }
  function airScout() {
    let cur = null;
    const pool = [], n = {};
    if (airRef && (airRef.dead || airRef._scout !== "air")) {
      if (airRef.dead) airLostT = G.time;
      airRef = null;
    }
    for (const u of P.units) {
      if (u.dead || u.layer !== "air") continue;
      if (u._scout === "air") { cur = u; continue; }
      n[u.def.role] = (n[u.def.role] || 0) + 1;
      pool.push(u);
    }
    const want = wantAirEyes();
    if (cur) {
      if (want || G.time - (cur._scoutSince || 0) < 60) return (airRef = cur);
      cur._scout = null; cur._scoutJob = null; clearGoal(cur);
      /* Home first, THEN weapons free. Handing the stance back where the
         airframe happened to be left a released scout gunship hovering over
         the enemy's base on "guard", and it opened a one-aircraft attack on
         whatever was nearest - measured, a Hind took a construction yard
         from eleven tiles on a commander held at peace. rtb carries it back
         to its own ramp, where guard is what it should be. */
      if (!cur.parked) cur.give({ type: "rtb" });
      if (cur.stance === "hold" && cur.def.weapons.length &&
          !(cur.allWeaponsHeld && cur.allWeaponsHeld())) cur.stance = "guard";
      scoutLog.airFreed++;
      return null;
    }
    if (!want || G.time - airLostT < 90) return null;
    let best = null, bv = Infinity;
    for (const u of pool) {
      const r = u.def.role;
      let v;
      if (r === "transport" && u.def.hover) v = 0;
      else if (r === "gunship" && u.def.hover && n.gunship >= 2) v = 1;
      else if (r === "aswhelo" && n.aswhelo >= 2) v = 2;
      else if (r === "fighter" && n.fighter >= 3) v = 3;
      else continue;
      const o = u.order.type;
      if (o !== "parked" && o !== "hover" && o !== "idle") continue;   // flying a sortie
      if (u.fuelMax && !u.def.hover && u.fuel < u.fuelMax - 1) continue;
      if (u.hp < u.maxHp * 0.6 || (u.lastHitAt && G.time - u.lastHitAt < 30)) continue;
      if (v < bv) { bv = v; best = u; }
    }
    if (!best) return null;
    best._scout = "air"; best._scoutSince = G.time; scoutLog.airTasked++;
    return (airRef = best);
  }

  /* A new battle is a new map: the flood fills, the grid, the pump field, the
     route, the posts and the detailed hulls all belong to the old one. */
  function reconReset() {
    reconGrid = null; rivalPath = null;
    postList = null; postT = -1e9; scoutLog = scoutLogNew();
    firstFound = -1; firstProd = -1; oneWayT = 0; fieldReset();
    seaRef = null; seaLostT = -1e9; airRef = null; airLostT = -1e9;
  }
  function driveScouts() {
    if (!look || !P || !G.map) return;
    const now = G.time;
    scoutLog.sweeps++;
    for (const [k, v] of scoutShy) if (v < now) scoutShy.delete(k);
    refreshAnchors();
    /* when the rival first went on the plot, and when its production did */
    if (firstProd < 0 && rival) {
      for (const r of seenB.values()) {
        if (r.gone || r.own !== rival.idx) continue;
        if (firstFound < 0) firstFound = Math.round(now);
        if (isProd(r.key)) { firstProd = Math.round(now); break; }
      }
    }
    const ground = [];
    for (const u of P.units)
      if (!u.dead && !u.carried && u.layer === "ground" && u.def.role === "recon") ground.push(u);
    const sea = seaScout(), air = airScout();
    const claimed = [];
    const held = (u) => {
      if (u && u._scoutGoal) claimed.push({ x: u._scoutGoal.x, y: u._scoutGoal.y, by: u });
    };
    for (const u of ground) held(u);
    held(sea); held(air);
    const live = ground.filter(u => !u._stranded);
    for (const u of ground)
      tendScout(u, u._stranded ? "post" : jobFor(live.indexOf(u), live.length), claimed, now);
    if (sea) tendScout(sea, "sea", claimed, now);
    if (air) tendScout(air, "air", claimed, now);
  }

  /* ---- one scout, one sweep ----
     The re-tasking rules are the ones the sweep in think() carried, and so is
     their history, measured on river at Commander over fifteen minutes: ONE
     scout used to be tasked a tick, so three Humvees logged 2,420
     unit-seconds idle against 21 of movement; a scout that finished its drive
     stood where it stopped, inside the enemy base; and a rally-point move onto
     an occupied tile never ends, which held 1,326 unit-seconds and left 18.1%
     of the theatre explored after fifteen minutes. Hence: every scout with
     nothing useful to do is re-tasked, a goal that has outlived its travel
     budget or shown no progress in ten seconds is dropped, and a goal that
     came back as an instant "arrival" without the vehicle moving is put out
     of bounds. */
  function tendScout(s, job, claimed, now) {
    const T = CFG.TILE, key = fuelKey(s);
    s._scoutJob = job;
    /* A scout that stops to shoot is not scouting, and a 340-hit-point truck
       with one machine gun loses that exchange anyway: 249 of the measured
       run's unit-seconds went on auto-acquired attacks. "hold" shuts both
       doors - acquire() from idle and retaliate() when hit - and on an
       aircraft it also keeps the ramp's own auto-launch off it. */
    if (s.stance !== "hold") s.stance = "hold";
    /* ---- shot at: report, withdraw, and do not come straight back ----
       digest() has already pushed the alarm and noteSighting has written down
       whatever was in view. The ground it was shot on is put out of bounds for
       ninety seconds and the goal for two minutes: exposureAt() only knows
       guns we have SEEN, so without this the next bid sent the car straight
       back to whatever unseen gun had just hit it. */
    if (s.lastHitAt && now - s.lastHitAt < 6) {
      if (!s._runT || now - s._runT > 6) {
        s._runT = now;
        if (s._scoutGoal) scoutShy.set(shyKey(s._scoutGoal.x, s._scoutGoal.y), now + 120);
        scoutShy.set(shyKey(s.x, s.y), now + 90);
        clearGoal(s);
        s._scoutEnd = now + 8;             // the withdrawal is not re-tasked at once
        scoutLog.runs++;
        /* Away from the shooter where the picture holds it - a live track, or
           a structure on the plot - and toward home; home alone otherwise.
           Measured on taiwan, straight for home ran two withdrawing boats back
           past the corvette that had just hit them. */
        let ax = P.homeX - s.x, ay = P.homeY - s.y;
        const hl = Math.hypot(ax, ay) || 1;
        ax /= hl; ay /= hl;
        const by = s.lastHitBy;
        let at = null;
        if (by && by.kind === "building") { const rb = seenB.get(by.id); if (rb && !rb.gone) at = rb; }
        else if (by) at = trackedEntity(seenU.get(by.id));
        if (at) {
          const bx = s.x - at.x, byy = s.y - at.y, bl = Math.hypot(bx, byy) || 1;
          ax = ax * 0.5 + bx / bl * 1.5; ay = ay * 0.5 + byy / bl * 1.5;
        }
        const a = Math.atan2(ay, ax);
        s.give({ type: "move", x: s.x + Math.cos(a) * T * 14, y: s.y + Math.sin(a) * T * 14 });
      }
      return;
    }
    /* ---- fuel ---- */
    if (key !== "air" && s.fuelMax && burnOf(s)) {
      const nf = nearestFuel(key, s.x, s.y);
      const inside = key === "ground" ? P.inBaseRadius(s.tx, s.ty) : !!(nf && nf.d < 8);
      if (s.fuel < 1 && !inside) {
        /* Dry and out of reach of a refill. It still sees, so it stays where it
           is as a post, and it no longer counts as a scout - reconShort()
           replaces it. A supply truck passing by brings it back. */
        if (!s._stranded) { s._stranded = true; scoutLog.stranded++; }
        clearGoal(s);
        return;
      }
      s._stranded = false;
      if (s._refuel) {
        if (inside && s.fuel >= s.fuelMax - 3) s._refuel = false;
        else { if (!inside && nf) goRefuel(s, nf); return; }
      } else if (!inside && nf && !(s._scoutGoal && s._scoutGoal.oneway) &&
                 s.fuel < fuelFor(s, Math.min(homeTime(key, s.x, s.y), 1e4)) + 6) {
        s._refuel = true; clearGoal(s); scoutLog.refuels++;
        goRefuel(s, nf);
        return;
      }
    }
    if (key === "air") {
      /* the airframe is flying itself home or taking fuel: leave it to it */
      const t = s.order.type;
      if (t === "rtb" || t === "land" || t === "tank") return;
      if (t === "parked" && s.fuelMax && !s.def.hover && s.fuel < s.fuelMax - 1) return;
    }
    const g = s._scoutGoal;
    if (g && g.oneway && (s.order.type !== "move" || U.dist(s.x, s.y, g.x, g.y) < T * 2)) g.oneway = false;
    /* ---- a picket on its post watches ---- */
    if (g && g.fam === "post" && s.order.type !== "move" &&
        U.dist(s.x, s.y, g.x, g.y) < T * 2.5) {
      if (!s._postUntil) { s._postUntil = now + POST_HOLD; scoutLog.posts++; }
      if (now < s._postUntil) return;
    }
    s._postUntil = 0;
    /* ---- ten seconds to show progress, or pick something else ----
       The travel budget is a ceiling on a trip that is going normally and the
       wrong instrument for one that is going nowhere: traffic, a wall, a path
       round something that has since closed, an aircraft held short of a SAM
       ring. Closing by a tenth of the leg re-arms the window. */
    if (s.order.type === "move" && now < (s._scoutEnd || 0)) {
      if (!g || now < (s._scoutCk || 0)) return;
      const d = U.dist(s.x, s.y, g.x, g.y);
      const gained = (s._scoutD0 || d) - d;
      if (gained > Math.max(T * 1.5, (s._scoutD0 || d) * 0.1)) {
        s._scoutD0 = d; s._scoutCk = now + 10;
        return;
      }
      scoutShy.set(shyKey(g.x, g.y), now + 60);
      scoutLog.stalls++;
      clearGoal(s);
    }
    /* ---- did the last goal work? ----
       stepAlong() reports "arrived" the instant Path.find has no route at all,
       so an unreachable goal came back as a finished trip in nought seconds
       and won the next sweep again - measured, two scouts re-ordered onto one
       tile twenty-four times in forty seconds. Not asked of an aircraft,
       which is never unreachable and whose "from" is the ramp it landed on. */
    const from = s._scoutFrom, was = s._scoutGoal;
    if (key !== "air" && was && from &&
        U.dist(s.x, s.y, from.x, from.y) < T * 3 &&
        U.dist(s.x, s.y, was.x, was.y) > T * 4) {
      scoutShy.set(shyKey(was.x, was.y), now + 120);
      scoutLog.unreach++;
    }
    for (let i = claimed.length - 1; i >= 0; i--) if (claimed[i].by === s) claimed.splice(i, 1);
    /* An empty auction is not re-run for six seconds: a sea scout whose yard
       is gone (every fuelOk fails, for good), a car topping up at home or a
       late game with hundreds of contacts made it 1e5-3e5 compares a scout
       every two seconds. */
    if (now < (s._noGoalT || 0)) return;
    const goal = scoutGoal(s, job, claimed);
    if (!goal) {
      scoutLog.none++;
      s._noGoalT = now + 6;
      clearGoal(s);
      /* nothing worth the fuel: an aircraft goes back to its ramp rather than
         hanging over wherever its last look was */
      if (key === "air" && s.order.type === "hover") s.give({ type: "rtb" });
      return;
    }
    /* The travel budget, which is also where D.scoutT keeps its meaning: the
       straight leg at the hull's own speed, doubled for terrain and traffic,
       and never shorter than the difficulty's own re-think interval. */
    const trip = U.dist(s.x, s.y, goal.x, goal.y) / T;
    s._scoutEnd = now + Math.max(D.scoutT || 32, 10 + trip / Math.max(0.6, s.def.speed) * 2);
    s._scoutFrom = { x: s.x, y: s.y };
    s._scoutGoal = goal;
    s._scoutD0 = trip * T;
    s._scoutCk = now + 10;
    if (goal.post !== undefined) s._lastPost = goal.post;
    claimed.push({ x: goal.x, y: goal.y, by: s });
    scoutLog.jobs[job] = (scoutLog.jobs[job] || 0) + 1;
    scoutLog.fam[goal.fam] = (scoutLog.fam[goal.fam] || 0) + 1;
    s.give({ type: "move", x: goal.x, y: goal.y });
  }

  /* ---- where a scout is worth sending ----
     The old goal was sixty random darts scored by staleness over the drive,
     and on 144x144 the stalest passable tile is reliably an empty corner. What
     reconnaissance is FOR is candidate objectives and the approaches to them,
     so the families are, in the order a finder meets them:
       hypo    unexamined deployment sites - LOOKED AT, not driven onto. The
               old line returned the start tile itself, which is where the
               enemy construction yard stands; the first order either side ever
               gave a scout was a drive onto it, and on river the Humvee closed
               to one tile of it and died. From a standoff the same paint()
               prunes the hypothesis and the vehicle lives.
       relook  the rival's production on the D.scoutT x RELOOK_K timer
       abeam   six tiles either side of a hostile structure, not past it: one
               remembered outbuilding is the edge of a base whose middle we
               never need to drive into - what is unknown is its flanks.
               Civilian blocks are not a base and no longer bid.
       ore     ore blocks away from our own patch (map.ore is published
               terrain; where there is ore there are haulers)
       oil     oil nodes already seen and not ours, gone stale: still free,
               or somebody's derrick
       cell    the search grid - ground none of the above reaches
       lane    the corridor the next wave has to walk down
       post    the picket's watch posts
     and only then the darts, which are also a Recruit's whole behaviour.
     SCOUT_DANGER is where a scout stops volunteering, read off the threat
     field (seen guns only), so the FIRST approach to an unexamined position is
     as bold as ever and what is refused is the drive back into a base we have
     already been shot out of. An aircraft reads remembered air defence
     instead, which the ground field deliberately leaves out. */
  function scoutGoal(s, job, claimed) {
    const now = G.time, T2 = CFG.TILE, M = G.map, W = M.W;
    const layer = s.layer === "air" ? "air" : s.cat === "naval" ? "sea" : "ground";
    const lab = compOf(layer);
    const myC = lab ? compAt(lab, s.x, s.y) : 0;
    const wt = SCOUT_WT[job] || SCOUT_WT.find;
    let aa = null;
    if (layer === "air") {
      aa = [];
      for (const r of seenB.values()) {
        if (r.gone) continue;
        const R = aaProfile(r.key);
        if (R) aa.push({ x: r.x, y: r.y, r2: Math.pow((R + 2) * T2, 2) });
      }
      for (const r of seenU.values()) {
        const R = r.aa ? r.aa * 1.25 + 2.5 : 0;
        if (R && now - r.t <= 120) aa.push({ x: r.x, y: r.y, r2: Math.pow(R * T2, 2) });
      }
    }
    /* ---- and guns that move ----
       exposureAt() is stamped from structures alone, so a scout used to drive
       its standoff straight into the garrison that had been standing beside
       the building it was looking at. Measured on taiwan: one seat detailed
       eleven surface hulls as eyes in 960 s and was hit fifteen times. An
       armed contact seen in the last 45 s vetoes the ground within its reach
       of where it was last seen - its own layer only, off the class written
       down at contact, never the live entity. The scout's sight (8.5-9.5) is
       about that reach, so it can still watch what it will not approach. */
    const hot = aa || [];
    if (!aa) for (const r of seenU.values()) {
      if (!r.armed || r.harvester || now - r.t > 45 || r.layer !== layer) continue;
      const R = layer === "sea" ? (SEA_R[r.role] || 10) : r.cat === "infantry" ? 6 : 8;
      hot.push({ x: r.x, y: r.y, r2: R * R * T2 * T2 });
    }
    const fireAt = (x, y) => {
      for (const a of hot) if (U.dist2(x, y, a.x, a.y) < a.r2) return 1e3;
      return aa ? 0 : exposureAt(x, y, SCOUT_HS);
    };
    const tripK = layer === "air" ? 4 : 6;
    const ownIds = new Set();
    for (const b of P.buildings) if (!b.dead) ownIds.add(b.id);
    const stand = Math.max(4, s.sightR() - 1.5);
    const reachable = (tx, ty) => {
      if (tx < 1 || ty < 1 || tx >= M.W - 1 || ty >= M.H - 1) return false;
      if (layer === "air") return true;
      if (!GameMap.passable(M, tx, ty, layer)) return false;
      return !myC || lab[ty * W + tx] === myC;
    };
    const taken = (x, y) => {
      const R2 = CLAIM_R * CLAIM_R * T2 * T2;
      for (const c of claimed) if (c.by !== s && U.dist2(c.x, c.y, x, y) < R2) return true;
      return false;
    };
    /* Look at it from OUTSIDE, and from somewhere that still sees it: five
       bearings about the line we would come in on, at the standoff and then
       closer. The old walk went back to stand + 14, which is outside sight -
       from there the target is never overlooked, the hypothesis is never
       struck off, and the same goal was handed back every sweep. Null is a
       real answer: every vantage on that place is covered, unreachable, or
       refused. */
    const standoff = (x, y, st) => {
      const a0 = Math.atan2(s.y - y, s.x - x);
      for (let k = 0; k < 5; k++) {
        const a = a0 + (k === 0 ? 0 : (k % 2 ? 1 : -1) * Math.ceil(k / 2) * 0.6);
        for (let d = st || stand; d >= 4; d -= 2) {
          const px = x + Math.cos(a) * d * T2, py = y + Math.sin(a) * d * T2;
          if (!reachable((px / T2) | 0, (py / T2) | 0)) continue;
          if (fireAt(px, py) > SCOUT_DANGER) continue;
          if ((scoutShy.get(shyKey(px, py)) || 0) > now) continue;
          return { x: px, y: py };
        }
      }
      return null;
    };
    if ((job === "find" || job === "sea" || job === "air") && hypo.length) {
      for (const h of hypo) {
        const g = standoff((h.x + 0.5) * T2, (h.y + 0.5) * T2);
        if (!g || taken(g.x, g.y)) continue;
        const trip = U.dist(s.x, s.y, g.x, g.y) / T2;
        if (!fuelOk(s, g.x, g.y, trip)) {
          /* ---- the one-way look ----
             Where the enemy start is beyond a round trip - korea, 90 s by
             road - and nothing of the rival is on the plot yet, the car
             still goes, once every four minutes, if the tank carries it
             THERE. What it sees is the base, the production and the first
             garrison; on the way back it runs dry wherever the road leaves
             it, which is on the enemy's own approach, and stays as a post
             while reconShort() buys the next car. 400 credits for the
             order of battle is the trade a player makes too. */
          /* Only the last unexamined site, and only from the pumps: there the
             road out IS the field value, where from mid-map the straight line
             is a poor bound on it - measured on kuwait, a car sent on from
             its first empty start ran dry short of the second. */
          if (job !== "find" || layer !== "ground" || hypo.length !== 1 ||
              now < oneWayT || rivalOnPlot()) continue;
          const back = homeTime("ground", g.x, g.y);
          if (back === Infinity || homeTime("ground", s.x, s.y) > 1) continue;
          if (s.fuel < fuelFor(s, back)) continue;
          oneWayT = now + 240;
          g.oneway = true;
          scoutLog.oneway++;
        }
        g.fam = "hypo";
        return g;
      }
    }
    const read = D.read === undefined ? 1 : D.read;
    if (read > 0.2) {
      let best = null, bs = -Infinity;
      const bid = (x, y, value, w, fam, post) => {
        if (!(value > 0) || !(w > 0)) return;
        const tx = (x / T2) | 0, ty = (y / T2) | 0;
        if (!reachable(tx, ty)) return;
        const trip = U.dist(s.x, s.y, x, y) / T2;
        if (trip < 5 && post === undefined) return;     // already inside our own eyes
        const sc0 = value * w - trip * tripK;
        if (sc0 <= bs) return;                          // cannot win: skip the dearer tests
        if ((scoutShy.get(shyKey(x, y)) || 0) > now) return;
        /* a goal on one of OUR footprints is never reached; anybody else's
           is found by the stall and unreachable tests, not by reading G.occ */
        if (layer !== "air" && ownIds.has(G.occ[ty * W + tx])) return;
        if (taken(x, y)) return;
        const f = fireAt(x, y);
        if (f > SCOUT_DANGER) return;
        if (!fuelOk(s, x, y, trip)) return;
        const sc = sc0 - f * 40;
        if (sc > bs) { bs = sc; best = { x, y, fam }; if (post !== undefined) best.post = post; }
      };
      const ageAt = (x, y) => {
        const raw = staleness((x / T2) | 0, (y / T2) | 0, now);
        return raw > 1e8 ? 900 : raw < 45 ? 0 : Math.min(300, raw);
      };
      /* Hostile works, coarse: a prospect is not sent to count wells inside
         somebody's base. Off seenB only, civilian blocks excluded. */
      const foeCell = new Set();
      const rid = rival ? rival.idx : -1;
      for (const r of seenB.values()) {
        if (r.gone || r.own < 0) continue;
        const cx = (r.tx / RECON_CELL) | 0, cy = (r.ty / RECON_CELL) | 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++)
          foeCell.add((cy + dy) * 256 + (cx + dx));
      }
      /* The expansion band: measured from the nearest yard we own, because a
         rig can set out from any of them. Full weight to 45 tiles, easing to
         three-tenths at 87. */
      const yards = [];
      for (const b of P.buildings) if (!b.dead && b.def.id === "conyard") yards.push(b);
      if (!yards.length) yards.push({ x: P.homeX, y: P.homeY });
      const band = (x, y) => {
        let d = Infinity;
        for (const b of yards) d = Math.min(d, U.dist(x, y, b.x, b.y));
        d /= T2;
        let w = d <= 45 ? 1 : Math.max(0.3, 1 - (d - 45) / 60);
        const k = (((y / T2) / RECON_CELL) | 0) * 256 + (((x / T2) / RECON_CELL) | 0);
        if (foeCell.has(k)) w *= 0.3;
        return w;
      };
      const home = intelHome(rival);
      const toward = (x, y) => home
        ? 1 + 0.5 * Math.max(0, 1 - U.dist(x, y, home.x, home.y) / (60 * T2)) : 1;

      if (wt.post > 0) {
        const posts = picketPosts();
        for (let i = 0; i < posts.length; i++)
          bid(posts[i].x, posts[i].y, s._lastPost === i && posts.length > 1 ? 450 : 1000,
              wt.post, "post", i);
      }
      if (wt.relook > 0) {
        const relookT = (D.scoutT || 32) * RELOOK_K;
        for (const r of seenB.values()) {
          if (r.gone || r.own < 0 || (rid >= 0 && r.own !== rid)) continue;
          const prod = isProd(r.key);
          if (!prod && r.key !== "refinery" && r.key !== "derrick") continue;
          const age = now - r.t;
          if (age < relookT) continue;
          /* Closer than the plain standoff: forgetStale() tests the
             footprint's TOP-LEFT tile, and from sightR-1.5 off the centre on
             the far diagonal of a 3x3 that corner is not painted - a
             production building destroyed out of view was never struck off
             and the finder came back to the ghost from that side. sightR-3
             paints the corner and still notes the centre. */
          const g = standoff(r.x, r.y, Math.max(4, s.sightR() - 3));
          /* Due is due: a production building past its timer outbids virgin
             ground (900 x at most 1.5 toward the rival), and the longer it
             waits the more it outbids it. Measured with 300 + 2 x age it lost
             to the cells around the enemy base until the look was five minutes
             old - prodAge read 187 to 314 s against a 72 s timer. */
          if (g) bid(g.x, g.y, (1000 + Math.min(600, (age - relookT) * 4)) * (prod ? 1 : 0.6),
                     wt.relook, "relook");
        }
      }
      if (wt.abeam > 0) {
        for (const r of seenB.values()) {
          if (r.gone || r.own < 0) continue;
          const dx = r.x - P.homeX, dy = r.y - P.homeY;
          const len = Math.hypot(dx, dy) || 1;
          const ax = -dy / len * T2 * 6, ay = dx / len * T2 * 6;
          bid(r.x + ax, r.y + ay, ageAt(r.x + ax, r.y + ay), wt.abeam, "abeam");
          bid(r.x - ax, r.y - ay, ageAt(r.x - ax, r.y - ay), wt.abeam, "abeam");
        }
      }
      if (wt.ore > 0 && layer !== "sea") {
        if (!oreSites) oreSites = surveyOre();
        for (const o of oreSites)
          bid(o.x, o.y, ageAt(o.x, o.y), wt.ore * (job === "prospect" ? band(o.x, o.y) : 1), "ore");
      }
      if (wt.oil > 0) {
        /* a node somebody has drilled is the relook family's business */
        for (const n of oilKnown()) {
          if (n.ours || n.foe || n.age < 90) continue;
          const nx = (n.x + 0.5) * T2, ny = (n.y + 0.5) * T2;
          const g = standoff(nx, ny);
          if (g) bid(g.x, g.y, Math.min(300, n.age),
                     wt.oil * (job === "prospect" ? band(nx, ny) : 1), "oil");
        }
      }
      if (wt.cell > 0) {
        const gl = layer === "air" ? compOf("ground") : null;
        const homeC = gl ? compAt(gl, P.homeX, P.homeY) : 0;
        for (const c of reconCells()) {
          let t;
          if (layer === "air") t = c.cy * W + c.cx;
          else t = layer === "sea" ? c.s : c.g;
          if (t < 0) continue;
          const v = cellNews(c, now);
          if (v <= 0) continue;
          const x = (t % W + 0.5) * T2, y = (((t / W) | 0) + 0.5) * T2;
          let w = wt.cell * (job === "prospect" ? band(x, y) : toward(x, y));
          /* the aircraft's ground is the ground no car of ours can reach */
          if (gl) {
            if (c.g < 0) w *= groundConnected ? 0.4 : 0.8;
            else if (homeC && gl[c.g] !== homeC) w *= 1.6;
          }
          bid(x, y, v, w, "cell");
        }
      }
      if (aim && wt.lane > 0)
        for (let f = 0.35; f <= 0.86; f += 0.25) {
          const x = P.homeX + (aim.x - P.homeX) * f, y = P.homeY + (aim.y - P.homeY) * f;
          bid(x, y, ageAt(x, y), wt.lane, "lane");
        }
      if (best) return best;
    }
    /* A Recruit's whole behaviour, and everybody's last resort: darts, through
       the same gates - reachable, not a footprint we can see, not under fire
       we have seen, worth the drive, and affordable in fuel. */
    let goal = null, bestS = -Infinity;
    for (let n = 0; n < 60; n++) {
      const tx = (G.rng() * M.W) | 0, ty = (G.rng() * M.H) | 0;
      if (!reachable(tx, ty)) continue;
      const x = (tx + 0.5) * T2, y = (ty + 0.5) * T2;
      if ((scoutShy.get(shyKey(x, y)) || 0) > now) continue;
      const raw = staleness(tx, ty, now);
      if (layer !== "air" && ownIds.has(G.occ[ty * W + tx])) continue;
      if (fireAt(x, y) > SCOUT_DANGER) continue;
      const trip = U.dist(s.x, s.y, x, y) / T2;
      if (trip < 5) continue;
      const sc = (raw > 1e8 ? 900 : Math.min(300, raw)) / (1 + trip * 0.05);
      if (sc <= bestS || taken(x, y) || !fuelOk(s, x, y, trip)) continue;
      bestS = sc; goal = { x, y, fam: "dart" };
    }
    return goal;
  }
  /* ---- how many cars ----
     D.scouts, counted with the ones on the ramp and without the dry ones, and
     never more than two over it however many have run dry. The third waits
     for the three-minute mark or a fat bank - the land theatres are decided
     by ~460-490 s and the opening money is the army's. Across water one car is
     enough: its ground is the home landmass, and the sea and the air carry
     the rest. Harvesters first, unless we have no eyes at all. */
  function reconShort(mineShort) {
    let live = 0, all = 0;
    for (const u of P.units) {
      if (u.dead || u.def.role !== "recon") continue;
      all++;
      if (!u._stranded) live++;
    }
    const held = live + queuedRole("vehicle", d => d.role === "recon");
    let want = D.scouts || 1;
    if (!groundConnected) want = 1;
    else if (want > 2 && G.time < 180 && P.cash < 2500) want = 2;
    if (held >= want || all >= want + 2) return false;
    return !mineShort || held === 0;
  }
  /* what the reconnaissance is doing, for intel(); nothing decides on it */
  function reconState() {
    const now = G.time;
    let seen = 0;
    const N = look ? look.length : 0;
    for (let i = 0; i < N; i++) if (look[i]) seen++;
    let oilSeen = 0, oilFree = 0, oilFoe = 0;
    for (const n of oilKnown()) {
      oilSeen++;
      if (n.foe) oilFoe++; else if (!n.ours) oilFree++;
    }
    const prod = prodSeen();
    let prodAge = 0;
    for (const r of prod) prodAge = Math.max(prodAge, now - r.t);
    const eyes = { ground: 0, dry: 0, refuel: 0, sea: 0, air: 0 }, jobsNow = {};
    for (const u of P.units) {
      if (u.dead) continue;
      const scout = u.def.role === "recon" && u.layer === "ground";
      if (scout) { eyes.ground++; if (u._stranded) eyes.dry++; if (u._refuel) eyes.refuel++; }
      if (u._scout === "sea") eyes.sea++;
      if (u._scout === "air") eyes.air++;
      if ((scout || u._scout) && u._scoutJob) jobsNow[u._scoutJob] = (jobsNow[u._scoutJob] || 0) + 1;
    }
    return { explored: N ? Math.round(seen / N * 1000) / 1000 : 0,
             hypo: hypo.length, found: firstFound, prodFound: firstProd,
             prod: prod.length, prodAge: Math.round(prodAge),
             oilSeen, oilFree, oilFoe, eyes, jobsNow,
             posts: postList ? postList.length : 0, shy: scoutShy.size,
             log: Object.assign({}, scoutLog, { jobs: Object.assign({}, scoutLog.jobs),
                                                fam: Object.assign({}, scoutLog.fam) }) };
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
        if (u.dead || !u.def.sonar || u._scout) continue;
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
    /* Naval gunfire support: the fleet's objective is the operation's
       whenever the water reaches it - see COMBINED OPERATIONS. Outside the
       window, or for an inland objective, the rules below are untouched and a
       remembered naval yard is still what the group hunts. */
    const op = opFocus();
    if (op) { const st = opSeaStation(op); if (st) return st; }
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
    /* Ask the DEF what radiates, rather than naming two structures. The hard
       list said "radar" or "sam" and nothing else, so a Weasel would not fly
       against a flak battery with its own set, and - once the strategic arrays
       and the fixed jamming sites were added - it ignored the lpar_* and
       ewsite_* buildings entirely. Those are the emitters an anti-radiation
       missile exists to kill, and they were the one target class it could not
       see. Reading def.radar || def.jam also means any emitter added later is
       covered without editing this list again. */
    for (const r of seenB.values()) {
      const bd2 = BUILDINGS[r.key];
      if (r.gone || !bd2 || !(bd2.radar || bd2.jam)) continue;
      if (!r.ref || r.ref.dead || !a.canTarget(r.ref)) continue;
      const d = U.dist2(a.x, a.y, r.x, r.y);
      if (d < bd) { bd = d; best = r.ref; }
    }
    return best;
  }
  function pickAirTarget(a) {
    if (atPeace) return null;
    /* TERMINAL, not a fall-through. Role "sead" is neither "fighter" nor "cas",
       so it fell into the gunship branch and could come back with an enemy MBT
       or a refinery - and ai.js then issues a COMMANDED attack order, which
       releases, so the AI would have put anti-radiation missiles into tanks at
       0.35x. Returning null instead drops it to the sweep branch, where AI-2
       holds it on the ramp. */
    if (a.def.role === "sead" || a.def.role === "ewair") return pickEmitter(a);
    /* TERMINAL for the same reason, one role along. A strategic bomber whose
       every round is HELD is carrying release authority the owner asked for by
       name, and the branch below hunts the nearest harvester or heavy-armour
       contact - so without this a commander would put a megaton Yellow Sun or
       an AN-22 into an ore truck, and the gate would be decorative. It may
       have the war aim and nothing else, and not a RAID: warAim() returns a
       hauler when one scores higher than any structure, which is the same
       wrong answer arriving by a different road. Null drops it to the sweep
       branch, where the allWeaponsHeld guard holds it on the ramp - the same
       treatment the Weasel already gets.
       Gated on allWeaponsHeld so it changes nothing for the B-52 or the H-6:
       no existing heavybomber carries a held round. */
    if (a.def.role === "heavybomber" && a.allWeaponsHeld && a.allWeaponsHeld()) {
      const st = warAim();
      if (!st || st.raid || !st.ref || st.ref.dead) return null;
      return st.ref.kind === "building" ? st.ref : null;
    }
    /* ROUTE BY WHAT THE AIRCRAFT CAN SHOOT, NOT BY THE NAME OF ITS ROLE.
       Role "cfighter" is not sead/ewair, not "fighter" and not "cas", so every
       deck fighter in the game fell past both branches into the gunship branch
       below and was handed the nearest enemy MBT or harvester as a COMMANDED
       attack order - the identical trap the note above records catching "sead".
       MEASURED: an F-14A given exactly that order flew at a T-90A for thirty
       seconds, fired nothing (canTarget is false - its only mount is air-only),
       still held all six missiles, and timed out into a hover 6.2 tiles past
       the target with the tank untouched at 1729 hp. Not one missile wasted -
       one whole sortie wasted, by the most expensive airframe class there is,
       every time the commander launched one.
       An aircraft with nothing that can reach the ground hunts aircraft
       instead, which for an F-14A, an F-8E(FN) or a Su-33 is exactly the job
       those three were built for and the only one they are given here. The
       test mirrors entities.js canTarget(): a weapon with NO tgt block at all
       engages anything, so absence counts as capability. */
    const airToGround = (def) => {
      const ws = def.weapons || [];
      for (let i = 0; i < ws.length; i++) {
        const w = WEAPONS[ws[i]];
        if (w && (!w.tgt || w.tgt.ground)) return true;
      }
      return false;
    };
    if (a.def.role === "fighter" || !airToGround(a.def)) {
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
    /* ---- the air half of a combined operation ----
       After the three terminal branches above, which are already right - the
       Weasel goes for an emitter, a bomber with held rounds needs a named
       structure, a fighter takes the air contact it holds - and before the
       gunship branch, which is the one that wanders: it hands out the
       nearest heavy contact TO THE AIRCRAFT, anywhere on the map. opAir()
       answers null when there is nothing on the objective worth suppressing,
       and then everything below runs as it always did. */
    const op = opFocus();
    if (op) {
      const s = opAir(a, op);
      if (s) { forceStat.opAir++; return s; }
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
    /* at peace nothing is swept: pickAirTarget() answers null there, and the
       sortie loop's fallback is an ARMED sweep over the objective - measured,
       a Hind sent that way took the scripted base's construction yard */
    if (atPeace) return null;
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
  /* THE VICTORY RULE changes what this defends. A side with no live
     production building is beaten, so:
       - every contact is scored by what it is and by how close it stands to
         a production building of ours (2.5x inside ten tiles, 1.6x inside
         sixteen), not taken in Map order - and an engineer counts, armed or
         not, because it takes a factory without firing a shot;
       - ground and air are chosen separately, so a hull that cannot touch an
         aircraft is handed the tank instead of nothing (the old single
         threat traded order for idle every think over an overflight);
       - the enemy's fighting weight at our CORE (within sixteen tiles of
         production, or at home) is summed against what stands there to meet
         it - reserve within thirty tiles plus our guns in reach, one
         FORT_DPS of fire counting as a tank - and when it is the heavier by
         a fifth (and is a real force, or we have only one or two production
         buildings left) the wave and the raid party come HOME (recallWave),
         unless the wave is within fourteen tiles of the enemy's own last
         production building, which is a race we are about to win. A force
         at an outlying well or refinery is the reserve's, not the wave's;
       - an alarm with nothing visible behind it pushes the reserve only if
         it is at our works. It used to answer the hottest alarm anywhere,
         which includes our own wave being shot at across the map, and fed
         the reserve to the front one hull at a time. The newest eighty are
         read, because a heavy fight writes hundreds.
     COST, per think: our buildings once; the live tracks in seenU, each
     against our production (a handful) and, only if not already near it,
     our buildings; the reserve once; our guns once while under attack. */
  function defendBase(army) {
    const now = G.time, T2 = CFG.TILE;
    const prods = [];
    for (const b of P.buildings)
      if (!b.dead && b.buildProgress >= 1 && isProd(b.def.id)) prods.push(b);
    const prodGap = (x, y) => {
      let d2 = Infinity;
      for (const b of prods) { const d = U.dist2(x, y, b.x, b.y); if (d < d2) d2 = d; }
      return d2 < Infinity ? Math.sqrt(d2) / T2 : 1e9;
    };
    const HOME2 = 484 * T2 * T2, WORK2 = 196 * T2 * T2;
    const atWorks = (x, y, dp) => {
      if (dp < 16 || U.dist2(x, y, P.homeX, P.homeY) < HOME2) return true;
      for (const b of P.buildings)
        if (!b.dead && U.dist2(x, y, b.x, b.y) < WORK2) return true;
      return false;
    };
    const inWave = new Set(attackWave);
    let gT = null, gS = 0, aT = null, aS = 0, foeW = 0, fx = 0, fy = 0;
    let coreW = 0, cx = 0, cy = 0;
    for (const r of seenU.values()) {
      if (!r.armed && r.role !== "engineer") continue;
      const e = trackedEntity(r);
      if (!e) continue;
      const dp = prodGap(e.x, e.y);
      if (!atWorks(e.x, e.y, dp)) continue;
      const near = (dp < 10 ? 2.5 : dp < 16 ? 1.6 : 1) / (1 + dp * 0.03);
      if (r.layer !== "ground") {
        if (near > aS) { aS = near; aT = e; }
        continue;
      }
      const fw = NO_FIGHT[r.role] ? 0 : forceW(r.role, r.armor, r.cat);
      foeW += fw; fx += e.x * fw; fy += e.y * fw;
      /* the CORE: within sixteen tiles of production, or at home - what
         the launch hold and the recall weigh (an outlying well or refinery
         being poked is the reserve's job, not the wave's) */
      if (dp < 16 || U.dist2(e.x, e.y, P.homeX, P.homeY) < HOME2) {
        coreW += fw; cx += e.x * fw; cy += e.y * fw;
      }
      const s = Math.max(fw, r.role === "engineer" ? 1.2 : 0.15) * near;
      if (s > gS) { gS = s; gT = e; }
    }
    if (foeW > 0) {
      baseT = now; baseW = foeW; baseCoreW = coreW;
      if (coreW > 0) { baseX = cx / coreW; baseY = cy / coreW; }
      else { baseX = fx / foeW; baseY = fy / foeW; }
      const R30 = 900 * T2 * T2, home = [];
      /* a wave hull still waiting at home for its departure (staggerWave)
         is standing here, and is counted and used as reserve */
      for (const u of army)
        if ((!inWave.has(u) || u._goAt) && !u.carried && U.dist2(u.x, u.y, baseX, baseY) < R30) home.push(u);
      let defW = 0;
      for (const b of P.buildings) {
        if (b.dead || b.buildProgress < 1 || b.def.cat !== "defense") continue;
        const g = gunProfile(b.def.id);
        if (g && U.dist2(b.x, b.y, baseX, baseY) < Math.pow((g.range + 4) * T2, 2))
          defW += (g.hard * 0.5 + g.soft * 0.5) / FORT_DPS;
      }
      baseHomeW = ourForce(home) + defW;
      if (groundConnected && (attackWave.length || raidParty.length) && now >= recallNext &&
          coreW >= Math.max(1.2, baseHomeW * 1.2) && (prods.length <= 2 || coreW >= 2.5)) {
        let race = false;
        if (aim && commitNow()) {
          const R14 = 196 * T2 * T2;
          for (const u of attackWave)
            if (!u.dead && U.dist2(u.x, u.y, aim.x, aim.y) < R14) { race = true; break; }
        }
        if (!race) recallWave();
      }
    }
    if (!gT && !aT) {
      /* nothing visible, but rounds are landing on our works: push the
         reserve at the place rather than standing in the open */
      let hot = null, hotK = 0;
      const n0 = Math.max(0, alarms.length - 80);
      for (let i = alarms.length - 1; i >= n0; i--) {
        const a = alarms[i];
        let k = (a.tier || 1) * (1 - (now - a.t) / 25);
        if (k <= 0 || k * 2 <= hotK) continue;
        const dp = prodGap(a.x, a.y);
        /* the same test the contacts get: a derrick or a refinery shelled
           from out of sight is our works too */
        if (!atWorks(a.x, a.y, dp)) continue;
        if (dp < 8) k *= 2;
        if (k > hotK) { hotK = k; hot = a; }
      }
      if (!hot) return;
      for (const u of army) {
        if (inWave.has(u) && !u._goAt) continue;
        if (u.order.type === "idle" || u.order.type === "guard")
          u.give({ type: "attackmove", x: hot.x, y: hot.y });
      }
      return;
    }
    for (const u of army) {
      if (inWave.has(u) && !u._goAt) continue;
      if (u.order.type !== "idle" && u.order.type !== "guard") continue;
      /* Marked auto, so it is a reflex and not a release, and the automatic
         question is asked first, or the order arrives, engage() finds no
         weapon it may use and the hull idles until it is handed the same
         order again. */
      let tg = (gT && u.canTarget(gT, true)) ? gT : null;
      if (!tg && aT && u.canTarget(aT, true)) {
        /* An aircraft only where this hull could have picked it up itself:
           entities.js acquire() asks G.airTrack for a radar set or a
           long-range air-defence round, and a commanded attack is never
           re-asked - so without this a radar SPAAG at home engaged what the
           player's identical vehicle could not. O(allied sensors), idle
           radar hulls at home only, once a think. */
        const w0 = WEAPONS[u.def.weapons[0]] || {};
        const needsTrack = u.def.radarQ || u.def.radar ||
          ((u.def.role === "aa" || u.def.role === "sam") && (w0.range || 0) > 11);
        if (!needsTrack || !G.airTrack || G.airTrack(u, aT)) tg = aT;
      }
      if (tg) u.give({ type: "attack", target: tg, auto: true });
    }
  }
  /* ---- come home ----
     The wave is walking away from the one thing we cannot afford to lose.
     Every member goes back on an ATTACKMOVE at the enemy's weight at our
     works - not a move: it is going to a fight - and leaves attackWave, so
     the reflex above hands it targets as it arrives and the next launch can
     take it again. The raid party comes too. The wave's book is consumed so
     reviewAim() does not read the recall as a beaten wave; waveT is pushed
     out so the launch does not turn them round, and launchGate() holds any
     launch while the base is outweighed. Once a minute at most. */
  function recallWave() {
    const now = G.time, x = baseX, y = baseY;
    reapWave();
    let n = 0;
    for (const u of attackWave) {
      if (!u || u.dead || u.carried) continue;
      u.flankTo = null; u._goAt = 0;
      u.give({ type: "attackmove", x, y });
      n++;
    }
    attackWave = [];
    waveGate = null; waveGateT = 0; waveMassed = false; waveBook = null;
    if (raidParty.length) {
      const rp = raidParty.slice();
      raidLog.end.home++;
      endRaid(0, RAID_GAP);
      for (const u of rp) if (!u.dead) { u.give({ type: "attackmove", x, y }); n++; }
    }
    waveT = Math.max(waveT, 30);
    recallNext = now + 60;
    warLog.recalls++; warLog.recalled += n;
  }

  return {
    init, update,
    get player() { return P; },
    setPeace(on) { atPeace = !!on; },
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
               doctrine: doctrine(P.faction, P.era || CUR_ERA),
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
               /* The fuel market and what it buys, so a census can see money
                  turning into barrels and barrels into the force plan: bought,
                  spent and orders are this commander's own ledger; why is the
                  last check (ok, stocked, reserve, price, post, mine, refused,
                  none, tier) and note the market's reason for a refusal; unit is the
                  last price against the ceiling pMax; target is the stock the
                  lines' burn asks for against native (wells and purchase
                  lines); bar is the barracks against the plan; inf the
                  infantry against its ceiling (-1: none); air the air force's
                  share of the barrels against the budget's, its airframes, and
                  its bases against the plan and the fuel allowance. */
               fuel: fuelIntel(),
               /* The build plan, exposed so a census can see it working:
                  measured income (inc, cr/s), the bank's trend (slope), how
                  long money has idled, the growth budget, what the plan wants
                  against what stands, fuel income and whether it can feed
                  another line, and counters - built{} by reason, sited
                  (refineries put at ore), crept (plants put toward the next
                  field), spread (production put beside a second yard),
                  guarded (guns put at a production building), headed (orders
                  moved to the head of the vehicle queue), starved (thinks the
                  hauler floor held the plan), relief (rigs bought or unfolded
                  with no yard standing). */
               macro: macroState(),
               /* The oil stream, exposed so a census can see WHICH gate kept a
                  well from going down (why: ok / none / reach / crowded / sold /
                  refused), whether the commander knows the nodes at all (seen,
                  free, reach - from its own memory), what it did about it
                  (shoves, rally, pads, sold, posts, forward) and whether rigs
                  stall (stalls) and unfold where they stood (stranded).
                  bought/bulk are barrels purchased on the lifeline and on
                  import, buyRate the rate right now. */
               oil: oilIntel(),
               /* The reconnaissance, exposed so a census can see whether the
                  eyes are out and what they found, not infer it: explored is
                  the share of the theatre ever overlooked; found / prodFound
                  are the seconds at which the rival and then its production
                  first went on the plot (-1 not yet); prod and prodAge are the
                  rival production held and the oldest look at it, which the
                  re-look timer should keep bounded; oilSeen / oilFree / oilFoe
                  are nodes overlooked, of those free, and seen drilled by
                  somebody else; eyes counts ground cars (dry, refuelling) and
                  the sea and air scouts; log.fam counts goals by family. */
               scout: reconState(),
               /* The force budget, the landing and the combined operation, so a
                  census can see the split converge on the theatre, which service
                  holds the fuel and how often it lapses, whether the craft ever
                  put anybody ashore, and whether the phases actually cycle. */
               forces: forceIntel(),
               /* WHEN AND WHAT TO ATTACK, for the census. gate is the launch rule
                  open now (full / edge / stall / end, "home" when held for the
                  base, "shut") with what it weighed: n bodies against full,
                  ours against bar (-1: no look, no edge), est = their seen
                  weight with its fading peak and the production garrison,
                  cover = share of their known works in view within 45 s,
                  fort = fire on the aim ("n/a": no think has read the
                  field yet - the key is read-only).
                  prod / prodPeak / commit are the victory rule (their
                  production on our plot, the most at once, and whether we are
                  finishing them); base is the enemy weight last seen at our
                  works and what met it. Counters: plans (bodies actually
                  sent), go (per rule), commits, staggered and lastWait (hulls
                  held at home for time on target), recalls / recalled (waves
                  pulled home), raidSurplus / raidLull (which gate each party
                  went on), offBld (hulls concentrate() moved off concrete). */
               war: warState(),
               /* The second front, exposed for the reason every field here is:
                  whether a party ever forms, which gate stops it when it does
                  not (skip), why each came home (end), the work it did (xp,
                  off our own hulls) and what it cost (lost, credits). inWave
                  must read 0 on every sample. */
               raid: raidState(),
               /* Exposed so a census can see target priority and concentration
                  working, not infer them. acq/flip are the engine's count for
                  this side's surface hulls: engagements begun, and how many of
                  those picked something other than the old nearest-target rule
                  would have. runs/calls/moved are concentrate(): thinks with
                  two or more targets in the picture, thinks that named a call,
                  hulls switched onto it. dry is calls that moved nobody (the
                  failure mode of the first draft - it should stay well under
                  calls), kept is hysteresis holding a standing call, covered is
                  targets passed over because fire already on them kills them
                  inside CALL_WIN. fog and bld are counted per HULL, not per
                  target: fog is hulls whose live target the picture could not
                  vouch for within PEEK (so it was not counted at all), bld is
                  hulls shooting a structure, which this never considers.
                  noReach is shortlisted targets the wave could not add a round
                  to from where it stands, noCall is runs where that was the
                  whole shortlist, and allCov is runs where there was no
                  shortlist because every contact was already dying. Together
                  they are the reason `calls` is now far smaller than `runs`
                  and `dry` small against `calls`: the old build named a call
                  on all but a handful of runs and 94% of them moved nobody,
                  because value per hit point chose a target the move loop's
                  own reach test then refused 96.7% of the time. */
               focus: Object.assign({ acq: (P.tgtStat && P.tgtStat.acq) || 0,
                                      flip: (P.tgtStat && P.tgtStat.flip) || 0 }, callLog),
               /* Exposed so a census can see the commander staging, deferring,
                  reinforcing and breaking off rather than infer it from waves
                  that quietly dissolve. spread is the seconds between the
                  first and last turn-in of each recent body - the trickle,
                  measured; massBody against massClock says whether bodies are
                  released by arriving or by the clock; pad against withdrawn
                  says how many broken-wave survivors actually reached a berth,
                  handed how many were given up to another task or to the
                  reserve short of it, and dropped how many holds were ended
                  because the objective moved while the body was staging. */
               engage: { wave: attackWave.length, held: engStat.held, staged: engStat.staged,
                         massed: waveMassed,
                         gateFor: waveGateT ? Math.round((G.time - waveGateT) * 10) / 10 : -1,
                         turning: waveTurn1 ? Math.round((waveTurn1 - waveTurn0) * 10) / 10 : -1,
                         spread: engStat.spread.slice(),
                         massBody: engStat.massBody, massClock: engStat.massClock,
                         waits: engStat.waits, kept: engStat.kept,
                         defers: engStat.defers, deferNow: waveDefer,
                         spent: Math.round(waveSpent() * 1000) / 1000,
                         withdrawals: engStat.withdrawals, withdrawn: engStat.withdrawn,
                         homeward: homeward.length,
                         homeIn: homeward.length ? Math.round((homeUntil - G.time) * 10) / 10 : -1,
                         pad: engStat.pad, handed: engStat.handed,
                         dropped: engStat.dropped,
                         force: Math.round(ourForce(attackWave) * 100) / 100,
                         foeAtAim: aim ? Math.round(foeNear(aim.x, aim.y, CFG.TILE * 12) * 100) / 100 : 0 },
               /* Exposed for the reason every field around it is: a commander
                  that never puts up a second construction yard gives no clue
                  from the outside WHICH of the four gates stopped it, and the
                  answer was a different gate for each of two players in the
                  same match. */
               expand: { yards: P.countBuilding("conyard"), rigs: rigsHeld(),
                         onMap: P.units.filter(u => !u.dead && u.def.deployTo)
                                 .map(u => ({ order: (u.order && u.order.type) || "idle",
                                              tx: u.tx, ty: u.ty,
                                              home: Math.round(U.dist(u.x / 32, u.y / 32,
                                                    P.homeX / 32, P.homeY / 32)),
                                              tries: u._rigTries || 0 })),
                         queued: queuedRole("vehicle", d => !!d.deployTo),
                         want: yardWant(), wants: wantsExpansion(),
                         saving: rigSaving(), need: rigOilNeed(),
                         node: !!expandNode(true), spot: !!findOilSpot(true),
                         save: Math.round(saveTarget),
                         cash: Math.round(P.cash), oil: Math.round(P.oil) },
               /* Exposed for exactly the reason the fields around it are: so a
                  test can see whether the learner is separating its arms, or
                  whether every estimate has collapsed to the same number -
                  which is how the two designs before this one were caught. */
               learn: { arm: LEARN.arm, pushes: LEARN.N, weight: armWeight(),
                        opens: LEARN.opens, settles: LEARN.settles, tries: LEARN.tries,
                        openAge: LEARN.open ? (G.time - LEARN.open.t) : -1,
                        wave: attackWave.length,
                        q: Object.assign({}, LEARN.q),
                        n: Object.assign({}, LEARN.n) },
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
  /* hold a commander at peace (see atPeace) - for scripted sandboxes */
  setPeace(player, on) {
    for (const c of commanders) if (c.player === player) c.setPeace(on);
  },
  /* the doctrine prior for any army in any decade, with no commander and no
     game needed - it is a function of two strings and static tables */
  doctrineOf(fac, era) { return doctrine(fac, era || CUR_ERA); },
  doctValueOf(fac, era) { return doctValue(fac, era || CUR_ERA); },
  personalities: PERSONALITY_LIST,
  personalityName(k) { return (PERSONALITY[k] || PERSONALITY.balanced).name; },
};
})();
