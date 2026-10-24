/* ============ entities.js — units & structures, orders, logistics ============
   FUEL MODEL: vehicles, ships and aircraft burn fuel while moving.  A dry tank
   means half speed for ground/sea ("running on fumes" reserve transfer) and a
   forced landing for aircraft.  Refuel sources: own base radius (pipeline),
   supply trucks, fleet oilers, airbase pads, carriers, service depots.
   AMMO MODEL: aircraft carry limited ordnance and must rearm at a pad/carrier.  */

var EID = 1;

/* An unclaimed civilian building belongs to nobody and threatens nobody, so
   nothing may pick it up by itself: not a column sweeping for a foe, not a
   pillbox watching a street, not a commander choosing an axis. Garrison it and
   the flag clears, which is what makes an occupied block fair game; the flag
   comes back when the last occupant is gone, so the tests that keep a target
   have to ask as well as the ones that choose it. A deliberate order from a
   player never comes through here - shelling a house is allowed, it just is
   never automatic. */
function autoTargetable(e) {
  return !(e && e.kind === "building" && e.neutral);
}

/* ---- what a ground or naval patrol will fight ----
   A patrol engages the way attack-move does (Unit.updateGeneric, "patrol"),
   and attack-move chases whatever it picked up with no limit, on the
   target's true position, into fog as readily as not. Measured under jsc on
   the first cut of the patrol: a tank on an 8-tile beat followed one fleeing
   scout 20.4 tiles off it and was still after it 60 s later, and with fog on
   it drove after the scout for 28.2 of the 55.9 s the scout was out of our
   sight. With this test it went 0.4 tiles off the beat and was back on the
   same beat 4-6 s after the scout ran (fog on and off). A beat is a line to
   hold, and a bait that leads a unit off it is exactly what a patrol must
   not take. So a patrol fights only what lies within its own acquisition
   radius of the line - what it could have seen from the beat - and only
   while its side can see it: within that radius of the unit it can, since
   the unit sees that far, and beyond it only if G.visibleTo says so (the
   same fog for the commander as for the player). One test both takes a
   fight up and lets it go, so a target on the edge cannot flip a unit
   between the two every tick. */
function patrolFights(u, o, e) {
  /* the crew's sight toward e: as on a clear day if our radar holds it
     (Unit.sightOn), so a patrol fights what acquire() handed it */
  const R = u.sightOn(e) * CFG.TILE * (u.stance === "aggressive" ? 1.25 : 1);
  /* A hull carrying a round fired on a cue looks as far as acquire() does
     (Unit.acqReach), and past its own eyes it fights only what its SIDE holds
     - the very test acqGate() let the contact through on - so a patrolling
     missile boat is not handed a target by its scan and then refused it here.
     Everything else is exactly as it was: Rq is R. */
  const Rq = u.acqReach ? u.acqReach(R) : R;
  const ax = o.x0, ay = o.y0, dx = o.x - ax, dy = o.y - ay, L2 = dx * dx + dy * dy;
  const k = L2 ? U.clamp(((e.x - ax) * dx + (e.y - ay) * dy) / L2, 0, 1) : 0;
  if (U.dist(e.x, e.y, ax + dx * k, ay + dy * k) > Rq) return false;
  if (U.dist2(u.x, u.y, e.x, e.y) <= R * R) return true;
  return Rq > R ? u.game.sideSees(u.owner, e, u) : u.game.visibleTo(u.owner, e);
}

/* An emptied civilian block goes back to being nobody's. Restoring the flag
   was not enough on its own: the structure stayed on the last occupier's
   books, so it kept their colours, the enemy commander still read it as one
   of their buildings worth a sortie, and a side with nothing else left was
   never counted as beaten while one vacant house stood. */
function releaseCivilian(b) {
  if (!b || b.dead || !b.def.neutral) return;
  if ((b.garrison || []).length) return;
  b.neutral = true;
  if (b.game.neutral && b.owner !== b.game.neutral)
    b.game.reassignBuilding(b, b.game.neutral);
}

/* ---- what a shooter would RATHER be looking at ----
   Unit.acquire() was a nearest-target scan with two priority hooks in it: a
   machine gun halved its squared distance to infantry, and a Wild Weasel
   divided an emitter's by about a hundred. Everything else in the game shot
   whatever was closest, so a tank platoon with a howitzer battery and a
   scout car both in its gun arc killed the scout car first, and an MLRS was
   the safest thing on the field for as long as a rifle squad stood nearer.
   Building.acquire() had no priority at all.

   The numbers multiply SQUARED distance, the only currency those scans have
   ever scored in: 0.40 reads as "pretend it is 0.63 as far away", 1.70 as
   "pretend it is 1.30 times further". roleWeight() === 1 is the old
   behaviour, which is what every role not listed here still gets, so a role
   added to eras.js later is safe and nothing here has to be revisited.
   Every key is a live role in rules.js / eras.js.

   This applies to the PLAYER's units too, deliberately. Which target a crew
   picks inside its own arc is what the crew does, not what the commander
   decides; making it a difficulty setting would be the kind of asymmetry the
   fog work removed.                                                        */
const TGT_PRIO = {
  /* thin-skinned, outranging what it shoots at, and artillery killed is
     damage that never arrives */
  spg: 0.40, mlrs: 0.40, mortar: 0.45, tel: 0.40,
  /* the sensors and the electronic fit: killing one turns off a side's fire
     control, and the SEAD airframe is what is about to turn off ours */
  radarv: 0.45, ewveh: 0.45, ewair: 0.45, awacs: 0.40, cawacs: 0.40, sead: 0.60,
  /* what the war runs on. `tanker` is the AERIAL tanker, the thing that keeps
     a strike package in the air, not a fleet oiler - that is `oiler` */
  harvester: 0.55, supply: 0.50, repair: 0.55, repair_sea: 0.55,
  oiler: 0.50, tanker: 0.45, mcv: 0.55, engineer: 0.60,
  /* air defence is soft, and it is what grounds an air force */
  sam: 0.70, aa: 0.80, spaag: 0.75,
  /* a scout is a few hundred credits, and shooting one is how a column gets
     led around the map; an empty lorry is not the fight either */
  recon: 1.70, transport: 1.35, transport_sea: 1.35, airlift: 1.35, stratlift: 1.35,
};
/* The table's answer for one class of vehicle, with the documented
   fall-through: a hauler that carries some other role is still a hauler.
   Shared with ai.js concentrate(), which reads it off the role and harvester
   flag its sighting record wrote down at contact, so the crew and the
   commander rank targets from ONE table and cannot drift apart. */
function roleWeight(role, harvester) {
  const v = TGT_PRIO[role];
  return typeof v === "number" ? v : (harvester ? 0.55 : 1);
}
/* The squared-distance multiplier for one candidate that has already passed
   every gate in acqGate() / Building.acquire(). Everything it reads is on the
   thing itself and in plain sight of that shooter: what class of vehicle it
   is, and whether it is burning. A recognition manual and a pair of eyes; no
   list belonging to another player is touched. `base` carries the caller's
   own preference (the machine-gun factor) so the clamp bounds it too.

   Clamped to [0.30, 1.90], which is 0.55 to 1.38 in real distance. A crew
   that walks past the tank killing it to reach a more interesting target is
   not micro, it is suicide; the clamp, and acquire() applying this only to
   candidates already in reach, are what stop that. */
function targetPrio(e, base) {
  const def = e.def;
  let p = base * (def ? roleWeight(def.role, def.harvester) : 1);
  /* FINISH WHAT IS ALREADY DYING - focus fire with no coordination in it:
     every shooter independently prefers the wounded one, the preference
     grows as the target weakens, and a section converges on one hull without
     a message passing between them. Killing a hull removes its gun from the
     fight; the same damage spread over four removes none. The 0.60 floor
     means this alone can never reach past a target 1.29 times as close.
     UNITS ONLY: finishing a 40-credit concrete barrier at a tenth of its hit
     points removes nothing, and without this test it outranked a healthy
     tank standing nearer - every structure would have become preferred
     simply for being damaged, which is a different mechanism with a
     different bound and does not ride in on this one. */
  if (e.kind === "unit" && e.maxHp > 0) p *= 0.60 + 0.40 * (e.hp / e.maxHp);
  return p < 0.30 ? 0.30 : (p > 1.90 ? 1.90 : p);
}

/* The lines a step back is tried along, in radians off "straight away from
   the enemy" (Unit.kiteDecide): straight, and 34 and 63 degrees either side;
   the one that opens the gap most is taken. At 63 degrees under half of the
   step still opens the gap, so nothing wider is worth the turn. */
const KITE_DEV = [0, 0.6, -0.6, 1.1, -1.1];

/* A SNIFF patrol's numbers (Unit, SNIFF): how far past its round's reach it
   turns in on a contact (tiles), and the bearings off "straight away from
   the site" its break may take, tried in turn for the first point clear of
   every ring the side knows. */
const SNIFF = { APPROACH: 8, BEARINGS: [0, 0.4, -0.4, 0.8, -0.8, 1.2, -1.2, 1.6, -1.6] };

/* A well deck's gate and the craft through it (Unit, WELL TRANSIT): how long
   the stern gate takes to swing open or shut (s), how long it stays open
   after the last craft has passed the sill (s), how fast a craft moves in
   the well (px a second: 0.375 tiles, about 5 knots on the scale that puts
   a 40-knot LCAC at 2.8), and how long a bow ramp stays down after a load
   has gone over it (s). Compressed for the game: a real gate is lowered and
   a craft driven out of the well in minutes, not seconds. */
const WELL_GO = { GATE: 2, HOLD: 3, V: 12, RAMP: 4 };

/* A transport set down to unload (Unit, AIRLIFT LANDING) keeps its load
   aboard this many seconds from the moment the rules put it on the ground:
   the 3D view draws it AIR_ALT metres up in flight and brings it down at
   AIR_SINK metres a second (config.js, render3d.js easeAlt), so by then it
   is on its wheels there too - 46 / 17, 2.7 s. The rules own the clock and
   read nothing back from the drawing, which a headless match does not
   have. A squad going out of the door in flight does not wait for it. */
const TOUCHDOWN = CFG.AIR_ALT / CFG.AIR_SINK;

/* =================================================================== UNIT */
class Unit {
  constructor(game, defId, owner, x, y) {
    const d = UNITS[defId];
    this.id = EID++;
    this.game = game; this.def = d; this.owner = owner;
    this.key = defId;                       // roster id, for threat and save
    this.kind = "unit"; this.cat = d.cat; this.layer = d.layer;
    this.x = x; this.y = y;
    this.ang = game.rng() * U.PI2; this.tang = this.ang;   // hull & turret facing
    this.r = d.r;
    this.armor = d.armor;

    const fac = FACTIONS[owner.faction] || {};
    const hpMul = (fac.hpMul && d.cat !== "infantry" ? fac.hpMul : 1) *
                  (owner.upgrades.armor && (d.cat === "vehicle" || d.cat === "naval") ? 1.2 : 1);
    this.maxHp = d.hp * hpMul; this.hp = this.maxHp;

    this.vet = 0; this.xp = 0;
    this.suppress = 0;
    this.moving = false; this.path = null; this.pathI = 0;
    this.order = { type: "idle" };
    /* A platform whose every round waits on an order has nothing it can do by
       itself, so it comes off the ramp held rather than on guard - which is the
       stance the player would set by hand anyway. Only a DEFAULT: F toggles it,
       and save.js restores whatever was saved over the top of it, which is why
       the IDLE UNITS nag is fixed at the nag rather than relying on this. */
    /* ---- holding FIRE is not the same as staying on the GROUND ----
       The reasoning above is sound for a ballistic launcher: a TEL should sit
       until somebody releases it, and "hold" is the stance a player would set
       by hand. It is wrong for an AIRCRAFT, and it grounded the whole SEAD
       force. generations.js:1118 stamps noAuto on roles sead and ewair, that
       makes manualWeapon() true, that makes allWeaponsHeld() true, and this
       line then spawned every Wild Weasel and every Growler on stance "hold".
       Stance hold is also the gate on strip alert (:2210) and on the patrol
       launch that exists so nothing serviceable sits on the apron (:2248), so
       a SEAD aircraft never left the ramp for the player OR the AI unless it
       was hand-ordered off it.

       Nothing about firing changes. An aircraft on "guard" still cannot shoot
       an anti-radiation round unasked, because acquire() asks canTarget(e,
       true) and that skips a manual mount (:288) - the release gate the owner
       asked for is a separate mechanism and is untouched. What changes is that
       the airframe is allowed to be in the air. A ground launcher keeps the
       old default, which is what it was written for. */
    this.stance = (this.allWeaponsHeld() && this.layer !== "air") ? "hold" : "guard";
    this.cooldowns = d.weapons.map(() => 0);
    this.burst = d.weapons.map(() => 0);
    this.dead = false;

    /* logistics */
    this.fuelMax = d.cat === "infantry" ? 0 : 100;
    this.fuel = this.fuelMax;
    /* ready rounds carried, for the weapons that model them */
    this.roundsMax = d.rounds || 0;
    this.rounds = this.roundsMax;
    this.unsupplied = 0;                 // seconds out of contact with supply
    this.ammoMax = d.ammo || 0; this.ammo = this.ammoMax;  // aircraft ordnance
    this.gunChase = null;                // gunFirst's time box: { t, since, last }
    this.minesMax = d.layMines || 0; this.mines = this.minesMax;
    /* Cargo rockets or cargo shells on an artillery piece. A launcher is not a
       minelayer and must not be offered a minelayer's orders: ui.js picks the
       LAY MINE / MINE AN AREA panel off minesMax, and an M270 given an autolay
       box would try to drive the belt. Same shape as layNet - a different
       payload on a different hull, with its own counter. */
    this.dispMax = d.dispenser || 0; this.disp = this.dispMax;
    /* Bottom acoustic nodes for a barrier. Nothing in the roster carries both
       these and mines, which is exactly what lets one set of laying orders
       serve both payloads instead of a parallel copy of itself. */
    this.netMax = d.layNet || 0; this.net = this.netMax;
    this.offloadMax = d.tanker || 0; this.offload = this.offloadMax;
    this.supplyLeft = d.supply || 0;                       // trucks / oilers

    this.cargo = [];                                        // transports
    this.well = [];                     // landing craft in a well deck (THE WELL DECK)
    this.carried = false;
    this.grounded = false;              // an airlifter stopped on open ground (AIRLIFT)
    this.load = 0;                                          // harvester ore
    this.repathT = 0; this.stuckT = 0;
    this.guardX = x; this.guardY = y;
    this.deployed = false;
    this.routT = 0;                                         // seconds left running
    this.pad = null;                                        // airbase slot
    /* crowdStop() / settle() bookkeeping - what the last step ran into, and
       where the last trip ended and for which point - laid down here so every
       unit carries the same fields in the same order. Added on first use
       they gave the hot grid callbacks more object shapes to tell apart: on
       the first cut of this, stepAlong() measured 3.20 us a call against
       HEAD's 2.56 that way, and 2.28-2.44 once they were declared here (133
       units, jsc, two runs each on a shared machine - read it as a
       direction, not a figure). */
    this._touch = null; this._touchT = -1; this._touchX = NaN; this._touchY = NaN;
    this._atGX = NaN; this._atGY = NaN; this._atX = 0; this._atY = 0; this._atT = -1;
    this._settleT = (this.id % 15) * CFG.DT; this._settling = false;
    /* kiteDecide() / kiteStep(): the step back under way, and the ground the
       giving of it is tied to - declared here for the same reason */
    this.kiteS = null; this.kiteX = NaN; this.kiteY = NaN; this.kiteT = -1e9;
  }

  get tx() { return U.clamp((this.x / CFG.TILE) | 0, 0, this.game.map.W - 1); }
  get ty() { return U.clamp((this.y / CFG.TILE) | 0, 0, this.game.map.H - 1); }

  /* ---- what this hull lays ----
     A minelayer carries mines; a submarine with a barrier fit carries acoustic
     nodes. No unit in the roster carries both, so one set of accessors answers
     for either payload and the laying orders below stay ONE set of orders. */
  payloadLeft() { return this.netMax ? this.net : this.mines; }
  payloadMax()  { return this.netMax ? this.netMax : this.minesMax; }
  payloadWord() { return this.netMax ? "SONAR NODES" : "MINES"; }
  /* Already covered by one of ours? A mine is asked by TILE, because it kills
     whatever stands on its tile and a radius test either misses a hand-laid
     one or rejects a legitimate neighbouring tile. A node is asked by RADIUS,
     because what it produces is a lens several tiles across and a second node
     inside the first's spacing buys no new overlap - and overlap is the only
     thing a barrier is actually paying for. */
  payloadCovered(x, y) {
    if (this.netMax)
      return typeof SonarNet !== "undefined" &&
             SonarNet.tooClose(this.game, this.owner, x, y);
    return typeof Mines !== "undefined" &&
           Mines.tileMined(this.game, this.owner, x, y, !!this.def.mineSea);
  }
  /* Put one down. False if it could not be paid for or the module is missing,
     in which case the round stays on the rack rather than evaporating. */
  layPayloadAt(x, y, field) {
    if (this.payloadLeft() <= 0) return false;
    if (this.netMax) {
      if (typeof SonarNet === "undefined") return false;
      if (!SonarNet.lay(this.game, this.owner, x, y, field)) return false;
      this.net--;
      return true;
    }
    if (typeof Mines === "undefined") return false;
    /* Mines.lay now refuses at the per-player ceiling. The round stays on the
       rack: a mine that cannot go in the ground has not been spent. */
    if (!Mines.lay(this.game, this.owner, x, y, !!this.def.mineSea)) return false;
    this.mines--;
    return true;
  }

  speedMul() {
    const d = this.def;
    let m = 1;
    if (this.owner.upgrades.drive && this.cat === "vehicle") m *= 1.15;
    if (this.owner.upgrades.drive && this.cat === "naval") m *= 1.10;
    /* Dry means dry. A vehicle or a ship with an empty tank does not crawl
       along at half speed - it stops where it is and waits for fuel to reach
       it, which is what makes supply lines worth defending. Aircraft are
       handled separately: they fall out of the sky. */
    if (this.fuelMax && this.fuel <= 0 && this.layer !== "air") return 0;
    if (this.supplyStrain) m *= 1 - 0.25 * this.supplyStrain();               // unserviced
    /* Silent running. Cavitation and machinery noise are dominated by speed
       through the water, so the only way a boat buys quiet is to go slowly. At
       35% it crosses the five-tile depth of a barrier in about eight seconds
       and is heard for a third of the distance while it does: the cost of the
       answer is time, which is the correct currency. */
    if (this.stance === "quiet" && this.layer === "sub") m *= 0.35;
    if (this.isBroken()) m *= 1.35;                          // running for cover
    else if (this.isPinned()) m *= this.cat === "infantry" ? 0.25 : 0.6;
    return m;
  }
  sightR() {
    /* height and windows: a squad in a building sees further than in the open */
    if (this.garrisonIn && !this.garrisonIn.dead)
      return Math.max(this.def.sight, this.garrisonIn.def.sight) * 1.15;
    let r = this.def.sight * (this.owner.upgrades.optics ? 1.25 : 1);
    /* night, sandstorm and rain shrink the picture — far less so if the crew
       has thermal sights, which is the whole coalition advantage in 1991 */
    if (this.game && this.game.visionMul) r *= this.game.visionMul(this);
    return r;
  }
  /* ---- the weather, given back under our own radar ----
     A contact this side's radar holds (game.js G.radarHolds - never a boat
     under the water; the rule and its sources are at RADAR GIVES THE WEATHER
     BACK) is a track with a position, and a crew it is passed to sees and
     lays on it as on a clear day.
     clearSightR() is sightR() without the weather term. radarCued() is who
     the rule reaches: not a dismounted squad, which no track helps to see down
     its sights, and not a garrison, whose sight never had a weather term.
     sightOn(t) is this crew's sight, in tiles, toward the contact t (or a
     point {x, y}): its clear-day sight where the rule applies, its sight on
     the day otherwise. On a clear day the two are equal and the radar is
     never asked. */
  clearSightR() { return this.def.sight * (this.owner.upgrades.optics ? 1.25 : 1); }
  radarCued() { return this.cat !== "infantry" && !(this.garrisonIn && !this.garrisonIn.dead); }
  sightOn(t) {
    const r = this.sightR();
    if (!this.game || !this.game.radarHolds || !this.radarCued()) return r;
    const c = this.clearSightR();
    return c > r && this.game.radarHolds(this.owner, t) ? c : r;
  }
  /* how much punishment this unit absorbs before it goes to ground. Vehicles
     and ships are far steadier than dismounted infantry. */
  moraleScale() {
    if (this.cat === "infantry") return 1;
    if (this.cat === "vehicle") return 2.6;
    return 4.0;                                   // ships and aircraft
  }
  pinThreshold() {
    return (CFG.SUPPRESS_PIN + CFG.VET_MORALE[this.vet]) * this.moraleScale();
  }
  breakThreshold() {
    return (CFG.SUPPRESS_BREAK + CFG.VET_MORALE[this.vet]) * this.moraleScale();
  }
  isPinned() { return this.suppress >= this.pinThreshold(); }
  isBroken() { return this.routT > 0; }
  weaponRange(w) {
    const fac = FACTIONS[this.owner.faction] || {};
    return w.range * (fac.rangeMul || 1) * (this.owner.upgrades.optics ? 1.15 : 1) * CFG.TILE;
  }

  /* ---------------- orders ---------------- */
  /* give(order) replaces the current task; give(order, true) appends it, so a
     player can plan a whole sortie: strike here, then here, then come home. */
  give(order, queue) {
    if (this.carried) return;
    if (!this.orders) this.orders = [];
    /* a landing craft driving through a well's gate takes its orders when
       it is clear (WELL TRANSIT): until then they wait, the last plain one
       in place of the ones before it. One still gliding up to her sill
       ("app") is on the water, and an order calls it off: held, it would
       be wiped when it docked (dockCraft) */
    if (this.wellT && this.wellT.ph === "app") { this.wellT = null; this.moving = false; }
    if (this.wellT) {
      if (!queue) this.orders.length = 0;
      if (this.orders.length < 12) this.orders.push(order);
      return;
    }
    if (queue && (this.order.type !== "idle" || this.orders.length)) {
      /* A fire mission's clock (until) is how long the gun is given to get
         its rounds away, and the caller stamps it at the click (ui.js
         forceFire: now + 90; a cargo stick from the MINEFIELD panel, now +
         25). Right for a mission begun at once, wrong for one that waits in
         the queue: with bombard() handing on and the clock left as clicked,
         a second mission clicked a tick after the first came up, when the
         first one's 90 s ran out, with 0.000 s left and fired nothing. So a
         queued mission keeps its window as a length, and nextOrder() starts
         it (missionClock). */
      if (order.type === "bombard" && order.until !== undefined) order.span = order.until - this.game.time;
      if (this.orders.length < 12) this.orders.push(order);
      return;
    }
    this.orders.length = 0;
    this.setOrder(order);
  }
  setOrder(order) {
    /* ---- weapon release ----
       Some rounds are fired only when a commander says so: an anti-radiation
       missile with a six-second reload that does triple damage to a radar fit
       and next to nothing to anything else, and a ballistic round of which a
       launcher owns one or two and waits between fifty-five and ninety-five
       seconds for the next. The token that says a shot was ORDERED is stamped
       here and nowhere else, and it is POSITIVE: an order carries release, or
       it does not.

       That direction is the whole design. give() -> setOrder() is the only way
       an order reaches a unit from a commander - the player through ui.js, the
       AI through ai.js - and every order this file raises for itself is
       assigned straight to this.order and never comes through here: the eight
       auto sites, retaliate(), the counter-battery plot, afterAttack().

       Only `attack`, `bombard` and `areastrike` release, because only those
       name what is to be shot - a thing, or a piece of ground (a bomber's
       AREA ATTACK names a box of it, see areaStrike). Attack-move in
       particular is a standing authority to engage whatever you meet, which
       is precisely what a held round must not have. `auto` is honoured even
       here, for the one commanded order that is explicitly a reflex: ai.js
       defendBase. */
    if (order && !order.auto &&
        (order.type === "attack" || order.type === "bombard" ||
         order.type === "areastrike")) order.release = true;
    /* any order other than the group move that set it releases the pace cap */
    if (!(order && order.type === "move")) this.groupSpeed = 0;
    this.order = order;
    this.path = null; this.pathI = 0; this.pathFail = null;
    /* an order from a commander ends a step back and lets go of the ground
       it was tied to (kiteDecide): wherever it is sent is the new ground */
    this.kiteS = null; this.kiteT = -1e9;
    if (order.type === "move" || order.type === "attackmove") {
      this.guardX = order.x; this.guardY = order.y;
    }
    if (order.type !== "attack") this.focus = null;
  }
  /* pull the next queued task when the current one finishes */
  nextOrder() {
    if (this.orders && this.orders.length) {
      const o = this.orders.shift();
      if (o.span !== undefined) this.missionClock(o);      // a queued fire mission (give)
      this.setOrder(o);
      return true;
    }
    return false;
  }
  retaliate(shooter) {
    if (this.stance === "hold") return;
    if (this.order.type !== "idle" && this.order.type !== "guard") return;
    /* Being shot at is not an order. A Weasel under small-arms fire does not
       answer with an anti-radiation missile and a launcher under counter-
       battery fire does not answer with a ballistic round it owns two of. The
       AUTOMATIC question rather than a blanket refusal, so a hull that also
       carries a gun still turns and uses the gun. */
    if (!this.canTarget(shooter, true)) return;
    this.order = { type: "attack", target: shooter, auto: true };
  }
  /* ---- the layer a unit PRESENTS to a weapon, which is not always the one
     it moves on. An aircraft shut down on a ramp, or lashed to a deck, is a
     static object standing on a surface: there is nothing for a SAM seeker to
     lock onto and everything for a bomb, a shell or a strafing pass to hit,
     so it presents "ground". .layer itself is never touched, because radar
     tracks, fog, findPad, the hangar and the renderer all key off it.
     Deliberately "ground" rather than whatever it is parked on, so that
     anti-ship missiles do not start preferring the helicopter on a frigate's
     deck to the frigate. */
  targetLayer() {
    if (this.layer !== "air") return this.layer;
    /* and a transport stopped on a strip of open ground to unload (AIRLIFT
       LANDING) is standing on its wheels in a field, exactly as exposed */
    return (this.parked || this.grounded || (this.order && this.order.type === "parked")) ? "ground" : "air";
  }
  /* The armour class the round actually meets. CFG.DMG scores "air" at zero
     against he, frag, cannon and nuclear - right for an aeroplane in flight,
     absurd for one sitting on its undercarriage - so a parked airframe
     resolves as "light", which CFG's own table already glosses as
     "helicopters on the deck". Without this it would be targetable and
     invulnerable at the same time. */
  armorClass() {
    return (this.layer === "air" && this.targetLayer() === "ground") ? "light" : this.armor;
  }
  /* Two different questions, and conflating them breaks this in one direction
     or the other.
       canTarget(t)       - "if I ORDER you, can you hit it?"  Held rounds count.
       canTarget(t, true) - "would you pick this up YOURSELF?" Held rounds do not.
     Every caller outside this file asks the first, and asks it BEFORE the order
     exists. Inside this file, acquire() and retaliate() ask the second - and
     that is what stops a hull acquiring a target it would then have no weapon
     it may use against, which is what makes engage()'s pickWeapon -1 branch
     unreachable in that state and is why no guard is added there. */
  canTarget(t, auto) {
    if (!t || t.dead) return false;
    const tl = t.targetLayer();
    for (let i = 0; i < this.def.weapons.length; i++) {
      const w = WEAPONS[this.def.weapons[i]];
      /* manualWeapon, not holdsFire: the caller has already said which question
         this is, and this.order is the wrong thing to read here because every
         command-path caller asks before the order exists. */
      if (auto && this.manualWeapon(w)) continue;
      /* ordered or not, a round its own set guides cannot be fired with the
         set off (game.js G.ownRadarMount) */
      if (this.radarOffMount(w)) continue;
      if (Combat && w.tgt) {
        if (tl === "air" && !w.tgt.air) continue;
        if (tl === "sub" && !w.tgt.sub) continue;
        if (tl === "sea" && !w.tgt.sea) continue;
        if (tl === "ground" && !w.tgt.ground) continue;
      }
      if (tl === "sub" && !this.game.canSeeSub(this.owner, t)) continue;
      return true;
    }
    return false;
  }

  /* ---------------- per-tick ---------------- */
  update(dt) {
    /* `carried` covers two different things: cargo riding inside a transport,
       which genuinely does nothing until it is put down, and infantry manning
       a building, which is supposed to be fighting. Both set the flag, and this
       one line returned on it - so updateGarrison() below has never executed in
       any game, and with it the whole occupancy feature: the per-warhead
       garrison damage table in combat.js, the collapse-survivor roll, the
       engineer exclusion, all written and all unreachable. Occupying a civilian
       block did precisely nothing except remove the squad from the battle. */
    if (this.dead || (this.carried && !this.garrisonIn)) return;
    /* a landing craft driving through a well's gate does only that, and
       the ship's gate and bow ramp work whatever else she is doing (WELL
       TRANSIT) */
    if (this.wellT) { this.updateWellT(dt); return; }
    if (this.gateT || this.gateHold || this.rampHold || (this.wellGo && this.wellGo.length)) this.workGate(dt);
    const d = this.def;

    for (let i = 0; i < this.cooldowns.length; i++)
      if (this.cooldowns[i] > 0) this.cooldowns[i] -= dt;
    if (this.suppress > 0) {
      /* troops in cover get their nerve back twice as fast */
      const inCover = this.layer === "ground" && GameMap.coverAt(this.game.map, this.tx, this.ty) > 0;
      this.suppress = Math.max(0, this.suppress -
        CFG.SUPPRESS_DECAY * (inCover ? 2 : 1) * dt);
    }
    /* --- rout: a broken unit stops taking orders and runs --- */
    if (this.routT > 0) {
      this.routT -= dt;
      if (this.routT <= 0) {
        this.suppress = Math.min(this.suppress, this.pinThreshold() * 0.8);
        this.order = { type: "idle" };
      } else if (this.layer !== "air") {
        this.runAway(dt);
        return;                                              // ignores everything else
      }
    } else if (this.suppress >= this.breakThreshold() && this.layer !== "air" && !this.def.harvester) {
      this.routT = CFG.ROUT_TIME;
      this.rallyX = null;
      if (this.owner === this.game.human)
        Combat.addEffect({ t: "text", x: this.x, y: this.y - 24, s: "BROKEN",
                           life: 1.2, max: 1.2, c: "#ff9a5c" });
    }

    /* medics & recovery vehicles */
    if (d.heal) this.healNearby(dt);
    if (d.repairRate) this.repairNearby(dt);
    if (d.supply) this.runSupply(dt);

    /* role-specific micro-brains */
    if (d.harvester) { this.updateHarvester(dt); }
    else if (this.garrisonIn) { this.updateGarrison(dt); return; }
    else if (this.layer === "air") { this.updateAir(dt); }
    else {
      this.updateGeneric(dt);
      /* ---- A SAM BATTERY SETS UP WHERE IT STOPS ----
         deploySec was only ever paid inside engage(), and only while the
         target was inside the envelope: an aircraft crossing a ten-tile ring
         at five tiles a second gives about four seconds of it a pass, so a
         battery that had stood on the same spot for a minute still met the
         first raid packed up. Measured under jsc on an S-75 (deploySec 11):
         one launch in sixty seconds, at t=40.5, on the third pass of four
         aircraft. And nothing ever took the set-up away again short of that
         chase, so a launcher that had set up once could drive anywhere and
         fire the moment it stopped. For a `sam` launcher - the role whose
         deploySec is its march-to-fire time, five minutes for an S-300 or a
         Buk and hours for an S-75 - standing still on idle or guard now sets
         it up, and moving loses the set-up, so every move is paid for again
         on arrival. Packing up is not timed: the cost of moving is that
         set-up plus the march speed. Deliberately not the gun and rocket
         artillery or the ballistic launchers, which carry the same flag and
         aim at the ground. The AI's launchers live by the same rule: they set
         up wherever they stand on guard, as the player's do. */
      /* ...and a coastal anti-ship launcher, which waits on its shore for
         the ships its side finds (coastssm/REPORT.md) */
      if (d.deploy && (d.role === "sam" || d.role === "coastssm")) {
        if (this.moving) { this.deployed = false; this.deployT = 0; }
        else if (!this.deployed && (this.order.type === "idle" || this.order.type === "guard")) {
          this.deployT = (this.deployT || 0) + dt;
          if (this.deployT > (d.deploySec || 1.6)) { this.deployed = true; this.deployT = 0; }
        }
      }
    }

    /* A carrier's deck is spelled `carrier`, not `helo`, and an era carrier has
       no `helo` at all - so the one ship built to operate aircraft was the one
       ship that could never replace a loss alongside its own yard. */
    if (this.cat === "naval" && (this.def.helo || this.def.carrier)) this.replenishDeck(dt);
    /* a landing craft on order for her well deck (THE WELL DECK) */
    if (this.wellQ && this.wellQ.length) this.workWell(dt);

    /* An empty tanker is just a large slow target, so it takes itself home,
       and it can only be replenished on a ramp. */
    if (this.offloadMax) {
      if (this.parked && this.offload < this.offloadMax)
        this.offload = Math.min(this.offloadMax, this.offload + 26 * dt);
      else if (!this.parked && this.offload <= 0 && this.order.type !== "rtb" &&
               this.order.type !== "land" && this.order.type !== "parked") {
        /* An empty boom sends the tanker home; it does not end its tour. This
           wrote a bare rtb, so the station was thrown away - the aircraft
           landed, filled up, found no `then` on the order and shut down on the
           ramp for good with 420 units it would never deliver. Measured: six
           fighters on a 42-tile patrol drained the boom at t=48s and the tanker
           then sat parked for 844 of the remaining 852s, full, while the wing
           flew 42 tiles home to refuel one at a time. Carry the station through
           the turnaround, exactly as the bingo-fuel rtb in updateAir() does. */
        const back = (this.order.type === "cap" || this.order.type === "attackmove")
          ? { type: this.order.type, x: this.order.x, y: this.order.y } : null;
        this.order = back ? { type: "rtb", then: back } : { type: "rtb" };
        if (this.owner === this.game.human)
          this.game.alert(this.def.name.toUpperCase() + " \u2014 OFFLOAD EMPTY, RETURNING", "bad");
      }
    }

    /* A minelayer parked inside its own base picks up a fresh load. It is
       deliberately slow: replenishing a belt should cost real time. */
    if (((this.minesMax && this.mines < this.minesMax) ||
         (this.netMax && this.net < this.netMax)) && !this.moving) {
      /* Ashore that means standing inside your own base. Afloat it cannot:
         a hull lying off a naval yard is outside the base radius by
         definition, so a sea minelayer could never take on a fresh load
         however long it waited alongside. */
      let canLoad;
      if (this.layer === "sea" || this.layer === "sub") {
        canLoad = false;
        for (const b of this.owner.buildings) {
          if (b.dead || b.def.produces !== "naval") continue;
          if (U.dist(this.x, this.y, b.x, b.y) < CFG.TILE * 5.0) { canLoad = true; break; }
        }
      } else {
        canLoad = this.owner.inBaseRadius && this.owner.inBaseRadius(this.tx, this.ty);
      }
      if (canLoad) {
        if (this.mines < this.minesMax) {
          this.mineLoad = (this.mineLoad || 0) + dt;
          if (this.mineLoad >= 4) { this.mineLoad = 0; this.mines++; }
        }
        /* Twelve seconds a node against four a mine, so refilling an empty
           rack is a seventy-second stop. The alongside test and the timer are
           written once for both payloads deliberately: a boat that reloaded
           under different rules from a minelayer would be a second mechanism
           to keep in step with this one. */
        if (this.net < this.netMax) {
          this.netLoad = (this.netLoad || 0) + dt;
          if (this.netLoad >= 12) { this.netLoad = 0; this.net++; }
        }
      }
    }

    /* fuel burn */
    if (this.fuelMax && this.moving) {
      const fac = FACTIONS[this.owner.faction] || {};
      const burnMul = fac.fuelMul || 1;
      let burn = this.cat === "naval" ? CFG.FUEL_BURN_SEA : CFG.FUEL_BURN_LAND;
      if (this.layer === "air") burn = this.airBurn();
      burn *= burnMul;
      this.fuel = Math.max(0, this.fuel - burn * dt);
    }
    /* An aircraft that runs the tanks dry does not glide home. Lose your
       airbases while the wing is airborne and you lose the wing with them. */
    if (this.layer === "air" && !this.def.hover && this.fuelMax && this.fuel <= 0 && !this.parked && !this.grounded) {
      this.fuelOut = (this.fuelOut || 0) + dt;
      if (this.fuelOut > 4) {
        /* This used to be an `he` round, and CFG.DMG.he.air is 0.00 - the air
           armour class is immune to blast by design - so applyDamage returned
           at its `dmg <= 0.5` guard and NOTHING happened. Meanwhile this block
           runs every tick, so the game announced the destruction of an aircraft
           the player could still see flying, once every four seconds, for ever
           (UI.alert only suppresses an identical string for 4000ms). Measured:
           an E-3G at fuel 0.00 flew on for another 46.7s, hp unchanged at 639,
           shouting that it was down. Kill it outright with a warhead the class
           actually takes, and say it once. */
        if (!this.fuelDead) {
          this.fuelDead = true;
          if (this.owner === this.game.human)
            this.game.alert(this.def.name.toUpperCase() + " DOWN — FUEL EXHAUSTION", "bad");
        }
        Combat.applyDamage(this.game, this, this.hp + 1,
          { warhead: "flak", dmg: this.hp + 1 }, null);
      }
    } else if (this.fuelOut) { this.fuelOut = 0; this.fuelDead = false; }
    /* passive refuel inside own base radius or near a depot/yard */
    if (this.fuelMax && this.fuel < this.fuelMax && this.layer !== "air") {
      if (this.cat === "naval") {
        /* A ship refuels alongside a naval yard or from a fleet oiler. It
           cannot top up merely by floating inside the base perimeter - the
           oiler exists precisely so a fleet can stay at sea. */
        const yard = this.game.nearestBuilding(this.owner, "navalyard", this.x, this.y);
        if (yard && U.dist(this.x, this.y, yard.x, yard.y) < CFG.TILE * 8)
          this.fuel = Math.min(this.fuelMax, this.fuel + 11 * dt);
      } else if (this.owner.inBaseRadius(this.tx, this.ty)) {
        this.fuel = Math.min(this.fuelMax, this.fuel + 9 * dt);
      }
    }
    if (this.roundsMax || this.cat === "vehicle" || this.cat === "infantry") this.updateSupply(dt);
    /* Reloading fixed deck launchers needs a crane and a magazine ashore, so
       a ship that has emptied its tubes sails back to the naval yard for
       them. This is what makes an alpha-strike ship a decision rather than a
       simple upgrade: firing everything means leaving the fight. */
    if (this.mag && this.cat === "naval" && !this.dead) this.reloadAtYard(dt);
  }

  /* ---- held rounds ----
     Two levels, and both are needed. `manual` on the WEAPON travels with the
     round onto every hull that mounts it, so a future hull carrying a gun and
     a HARM keeps the gun and holds the missile. `noAuto` on the UNIT holds the
     whole loadout of a platform that has no business choosing its own targets,
     and is derived by role at the tail of generations.js so that 39 hulls
     across six periods are covered without editing generated JSON by hand.

     A NUCLEAR round is a third case and is not merely `manual`: it needs an
     order that named a piece of GROUND and was confirmed. See holdsFire.

     Deliberately NOT keyed on `antiRadiation`: 29 weapons carry it and several
     in eras.js are jamming and SIGINT payloads with a damage number attached -
     one is literally named "none (jamming and SIGINT payloads)" - so that flag
     names a doctrine, not a trigger discipline. */
  manualWeapon(w) { return !!(w && (w.manual || w.nuke || this.def.noAuto)); }
  /* Has an order released it? Read off this.order rather than passed down as
     an argument, because this.order IS the order the shot is being taken under
     at every place a weapon is chosen - and an argument is exactly the thing
     the last attempt forgot to read. */
  released() { const o = this.order; return !!(o && o.release); }
  /* Leave this mount alone on this shot.
     A warhead needs more than release: a bombard order, released, and marked
     `nuke` - a token written in exactly two places, the two-stage confirmation
     in ui.js and driveNuclear() in ai.js. That is what stops a right-click on
     an enemy tank from putting a kilotonne into it, and it is enforced in the
     engine rather than in the interface. */
  holdsFire(w) {
    /* a round this hull's own set guides stays on the rail while the set is
       off, released or not (radarOffMount, below) */
    if (this.radarOffMount(w)) return true;
    if (w && w.nuke) {
      const o = this.order;
      return !(o && o.release === true && o.type === "bombard" && o.nuke === true);
    }
    return this.manualWeapon(w) && !this.released();
  }
  /* ---- EMCON: this mount is dead while the set that guides it is off ----
     game.js G.setEmcon and G.ownRadarMount. Asked by holdsFire, so every fire
     path in this file - engage, the secondary mounts, the garrison, both air
     branches and a structure's defensive fire - leaves it on the rail; and by
     canTarget, so no order and no reflex is taken on it either. */
  radarOffMount(w) {
    const g = this.game;
    return !!(this.emcon && g.radarDark && g.radarDark(this) && g.ownRadarMount(w));
  }
  /* Nothing aboard fires unprompted, so there is nothing this platform can do
     on its own. Drives the spawn stance, the idle nag and the UI refusals. An
     unarmed hull answers false: a lorry is not being held, it is a lorry. */
  allWeaponsHeld() {
    const ws = this.def.weapons;
    if (!ws || !ws.length) return false;
    for (let i = 0; i < ws.length; i++)
      if (!this.manualWeapon(WEAPONS[ws[i]])) return false;
    return true;
  }
  /* Indirect fire used to mean exactly one thing - a lobbed "arc" round - and
     that was fine while artillery was the only long-range ground weapon. A
     ballistic launcher fires proj:"missile" so that the air-defence layers in
     combat.js can engage it at all, and it is still artillery in every way
     that matters here: it shoots over the horizon, it needs a firing point,
     and it displaces afterwards. `indirect` says so explicitly. */
  /* isIndirect()     - is this an indirect shooter at all?  forceFire and the
                        AI siege filters ask this, and a launcher must answer
                        yes or Ctrl+RMB refuses the one gesture that fires it.
     isIndirect(true) - is it one it may use UNPROMPTED?  A launcher whose only
                        round is held answers no, which is what shuts the
                        counter-battery stance. */
  isIndirect(auto) {
    for (const k of this.def.weapons) {
      const w = WEAPONS[k];
      if (auto && this.manualWeapon(w)) continue;
      if (w && (w.proj === "arc" || w.indirect)) return true;
    }
    return false;
  }
  /* ---- the cargo mount, or -1 ----
     Read by the UI and by the AI, because nothing else can find it: pickWeapon
     skips a mount whose tgt clears every layer, so engage(), fireOtherMounts()
     and Building.canTarget are all blind to it, and bombard()'s fallback scan
     refuses w.scatter outright. The ONLY way this weapon fires is an order
     naming this index. */
  scatterIndex() {
    for (let i = 0; i < this.def.weapons.length; i++) {
      const w = WEAPONS[this.def.weapons[i]];
      if (w && w.scatter) return i;
    }
    return -1;
  }
  pickCounterBatteryPlot() {
    const list = this.game.cbTargets ? this.game.cbTargets(this.owner) : [];
    /* A REACHABLE plot. This took the nearest one unconditionally, and
       bombard() then drives toward anything out of range - so a plot the gun
       could never reach became an order to march at it in nine-second bursts.
       That was survivable while every plot was inside a radar dome's 22 tiles;
       it is not now that a strategic array plots launchers at 24 to 31, which
       is past the longest artillery in the game (mrl240 at 26.5) and well past
       a battery sited inside CFG.BUILD_RADIUS of its own conyard. If we cannot
       shoot it, we do not take it. */
    let range = 0;
    for (const k of this.def.weapons) {
      const w0 = WEAPONS[k];
      if (w0 && (w0.proj === "arc" || w0.indirect)) { range = this.weaponRange(w0); break; }
    }
    if (!range) return null;
    let best = null, bd = Infinity;
    for (const c of list) {
      /* serviced holds for the contact's own life, not a flat 8 s, or a
         28-second ballistic plot is re-taken three times over */
      if (c.serviced && this.game.time - c.serviced < Math.max(8, (c.life || 17) * 0.5)) continue;
      const d = U.dist2(this.x, this.y, c.px, c.py);
      if (d > range * range) continue;
      if (d < bd) { bd = d; best = c; }
    }
    if (best) best.serviced = this.game.time;
    return best;
  }
  /* ---- a queued fire mission's clock starts when it can be fired ----
     give() kept its window as a length. It runs from when the gun takes the
     mission up or, if the mount it will fire is still reloading, from when
     that reload is done. The reload is what a belt of cargo sticks needs:
     the MINEFIELD panel gives a stick 25 s, and a 9M55K4, AT2 or PHL-03
     mine rocket takes 26 to reload. With the clock started at take-up it ran
     out a second before the tube was ready: a BM-30 given a belt of four
     laid the 1st and the 3rd and skipped the 2nd and the 4th without a
     word (rack 6 to 4). With the reload counted in, it lays all four. The
     mount is the one bombard() will fire: the one the order names, or the
     first lobbed round that is not a cargo round. */
  missionClock(o) {
    let wi = o.wi;
    for (let i = 0; wi === undefined && i < this.def.weapons.length; i++) {
      const w = WEAPONS[this.def.weapons[i]];
      if (w && !w.scatter && (w.proj === "arc" || w.indirect)) wi = i;
    }
    const cd = wi !== undefined ? this.cooldowns[wi] || 0 : 0;
    o.until = this.game.time + Math.max(0, cd) + o.span;
    delete o.span;
  }
  /* fire on a map position: how artillery answers a counter-battery plot */
  bombard(o, dt) {
    /* ---- a finished mission hands on to what is queued ----
       as a move, an attack-move, a fight, a mine laid and a cargo round away
       already did. It dropped to idle, and an idle unit takes up nothing, so
       whatever the player queued behind a mission waited for ever. Measured
       at c1870b6: an M109 put 11 rounds on a first mission, one every 8.5 s,
       stood idle when its 90 s ran out and was still idle at 195 s with the
       second mission queued and not a round fired on it; a move queued
       behind a mission had not moved it a pixel at 97 s. (owner) "yes" to
       missions fired in sequence, as in C&C and WARNO. Every mission still
       gets its whole window before the next begins. ai.js never queues an
       order, so every mission the AI gives still ends idle, as before. */
    /* (an area ripple still leaving the launcher holds it here: areaVolley) */
    if (o.area && o.hold > this.game.time) return;
    if (this.game.time > o.until) { if (!this.nextOrder()) this.order = { type: "idle" }; return; }
    /* ---- an AREA mission is over when the ready rack is ----
       (owner) "until its ready rounds are spent". A point mission waits on
       its clock for the supply chain's next round (below); a mission walked
       across a box is the rack's worth of rounds the player asked for, so the
       gun hands on - or stands - as soon as the last of them is away, and
       tryFire() has already said OUT OF ROUNDS. */
    if (o.area && this.roundsMax && this.rounds <= 0) { if (!this.nextOrder()) this.order = { type: "idle" }; return; }
    /* ---- ...and a gun with nothing to fire does not hold the queue ----
       Dry, out of supply - updateSupply gives nothing back out of contact -
       and with something queued behind: no round is coming for this mission,
       so the next order is taken now, not at the clock. With the handover
       alone an M109 out of supply with one round aboard, given two missions
       and a move home, fired its round in the first second and did not start
       home until 180 s. In supply a dry gun waits, because a round comes back
       every 2 s (CFG.RESUPPLY_RATE); and a mission with nothing behind it
       waits on its clock, as it always has. */
    if (this.roundsMax && this.rounds <= 0 && this.unsupplied > 0 && this.orders && this.orders.length) {
      this.nextOrder();
      return;
    }
    /* ---- which mount answers this fire mission ----
       A launcher may carry two lobbed rounds - the high-explosive ripple it was
       built around, and a cargo round that puts an anti-tank minefield on the
       map - and nothing chooses between them on its own initiative. The ORDER
       names the mount through o.wi; the fallback scan refuses a dispenser
       outright and refuses anything currently held.

       The named mount is validated rather than trusted: a hand-edited or
       corrupted order must not be able to aim a direct-fire gun at a map point.

       The refusal of w.scatter in the fallback is what closes the counter-
       battery stance, runSiege, driveLaunchers and forceFire in one line - all
       four issue a bombard with no wi, so all four get the HE round and a
       launcher can never sow a belt across the road its own wave is using. */
    let wi = -1;
    if (o.wi !== undefined) {
      const wN = WEAPONS[this.def.weapons[o.wi]];
      if (wN && (wN.proj === "arc" || wN.indirect || wN.scatter) && !this.holdsFire(wN))
        wi = o.wi;
    }
    if (wi < 0) {
      for (let i = 0; i < this.def.weapons.length; i++) {
        const w0 = WEAPONS[this.def.weapons[i]];
        if (!w0 || w0.scatter) continue;          // never on the gun's own initiative
        if (this.holdsFire(w0)) continue;
        if (w0.proj === "arc" || w0.indirect) { wi = i; break; }
      }
    }
    /* Nothing aboard may fire on this order: a held round on an order that
       never released it (an automatic one, or one restored from a save older
       than release), or no lobbed mount at all. That ends this mission and
       not the ones behind it. It skips only what nobody authorised: a
       mission the player queued is released when it is taken up (setOrder)
       and fires its held round like one given at once. */
    if (wi < 0) { if (!this.nextOrder()) this.order = { type: "idle" }; return; }
    const w = WEAPONS[this.def.weapons[wi]];
    /* ---- an empty rack refuses the stick before the launcher moves ----
       It was asked only as the round was about to leave, so the launcher
       drove into range, laid the tube, waited out the reload and paid a
       ready round for a stick it did not have (14/14 to 13/14 at c1870b6),
       then stood idle with the rest of the belt stuck behind it. Nothing is
       spent by asking, so it is asked first, and the next order is taken. */
    if (w.scatter && this.dispMax && this.disp <= 0) {
      if (this.owner === this.game.human)
        this.game.alert(this.def.name.toUpperCase() + " \u2014 NO MINE ROUNDS ABOARD", "bad");
      if (!this.nextOrder()) this.order = { type: "idle" };
      return;
    }
    const range = this.weaponRange(w), minR = (w.minRange || 0) * CFG.TILE;
    const dist = U.dist(this.x, this.y, o.x, o.y);
    /* an area ripple lands as far as o.ext round (o.x, o.y), and all of it
       is to be in reach, not only its middle (areaVolley); 0 on a point
       mission and on a gun's walk, so far and near are range and minR. At
       most 0.4 of the band, so a fifth of it is left to stand in (the
       drive below stops inside it); a ripple wider than that has its
       outermost rockets pulled onto the band as they leave. */
    const ext = o.area && o.ext > 0 ? Math.max(0, Math.min(o.ext, (range - minR) * 0.4)) : 0;
    const far = range - ext, near = minR + ext;
    /* A launcher that has to drive to its firing point sets up again when it
       gets there, as engage() has it. Queued missions made that the ordinary
       case, and bombard() never struck the set-up: a HIMARS (deploySec 3)
       that had fired on one point and was sent on to one beyond its reach
       drove 17.5 s with its jacks down and fired the tick it came into
       range. It now sets up there, and fires 3.1 s after. */
    if ((dist > far || dist < near) && this.def.deploy && this.deployed) this.deployed = false;
    if (dist > far) { this.stepAlong(o.x, o.y, dt, ext > 0 ? Math.max(far * 0.85, (far + near) / 2) : far * 0.85); return; }
    if (dist < near) {
      const a = Math.atan2(this.y - o.y, this.x - o.x);
      this.stepAlong(this.x + Math.cos(a) * CFG.TILE * 3, this.y + Math.sin(a) * CFG.TILE * 3, dt);
      return;
    }
    if (this.def.deploy && !this.deployed) {
      this.deployT = (this.deployT || 0) + dt;
      /* Each vehicle's own setup time. Thirty-three of them declare deploySec -
         three seconds for a HIMARS, nine for a Patriot battery levelling its
         jacks - and both gates waited a flat 1.6, so the heaviest launcher in
         the game came into action as fast as the lightest. */
      if (this.deployT > (this.def.deploySec || 1.6)) { this.deployed = true; this.deployT = 0; }
      return;
    }
    const want = Math.atan2(o.y - this.y, o.x - this.x);
    if (this.def.turret) {
      this.tang = U.turnToward(this.tang, want, (this.def.tturn || 1.5) * dt);
      if (Math.abs(U.angDiff(this.tang, want)) > 0.12) return;
    }
    /* fire at the ground: a phantom target the shell falls on */
    if (this.cooldowns[wi] > 0) return;
    /* an area mission puts this round, and the rest of its ripple, on the
       next points of its walk (areaVolley) - everything above, the drive,
       the set-up, the minimum range and the laying, is the point mission's */
    if (o.area) { this.areaVolley(o, wi); return; }
    /* A bombard order used to ignore the ready-round magazine entirely, which
       tryFire has always respected: the gun that shot itself dry on a target
       could turn round and shell a map square for ever. It matters more now
       that a launcher with two rounds and a five-hundred-damage warhead can be
       given the same order. */
    /* A unit that declares a magazine consumes from it, whatever kind of round
       it fires. This tested the projectile type, which was fine while only tube
       and rocket artillery carried ready rounds - but a mobile SAM battery
       fires proj:"missile", so its magazine was never touched and it had
       infinite interceptors, which quietly defeated the point of giving air
       defence a magazine at all. */
    if (this.roundsMax) {
      if (this.rounds <= 0) return;
      this.rounds--;
    }
    /* ---- a cargo round is paid for before it leaves the tube ----
       Deliberately BELOW the ready-round test: a dry gun must return there,
       before anything else is spent. */
    if (w.scatter) {
      /* (an empty rack is refused further up, before anything moves) */
      /* Asked before the rocket flies as well as inside Mines.lay, so a
         commander whose field is already full keeps the round on the rack
         instead of watching a rocket land and do nothing. The ready round
         taken just above has not left the tube, so it goes back; and the
         next order is taken rather than the queue waiting behind an idle
         gun. */
      if (typeof Mines !== "undefined" && !Mines.roomFor(this.game, this.owner)) {
        if (this.owner === this.game.human)
          this.game.alert("MINEFIELD CEILING \u2014 " + Mines.CAP +
                          " MINES ALREADY IN THE GROUND", "bad");
        if (this.roundsMax) this.rounds++;
        if (!this.nextOrder()) this.order = { type: "idle" };
        return;
      }
      this.disp--;
      if (this.disp === 0 && this.owner === this.game.human)
        this.game.alert(this.def.name.toUpperCase() +
                        " \u2014 MINE RACK EMPTY, RETURN TO BASE", "bad");
    }
    Combat.fire(this.game, this, w, Unit.groundAim(o.x, o.y));
    /* rationing also slows the rate of fire: rounds are being husbanded */
    this.cooldowns[wi] = w.reload / CFG.VET_ROF[this.vet] *
      (1 + 0.55 * (this.supplyStrain ? this.supplyStrain() : 0));
    /* ---- one rocket, one field ----
       bombard() has no fire-once semantics: it re-enters every tick until
       o.until and fires again as soon as the cooldown clears. A 90-second
       window against a 26-second reload is FOUR rockets from one click, three
       of which land on ground tileMined has already refused. A minefield
       mission ends when the round is away; a queued belt is one click a stick,
       which is what the panel promises. */
    if (w.scatter) { if (!this.nextOrder()) this.order = { type: "idle" }; return; }
    /* A submarine that shoots announces itself. Stamp the moment of firing
       here rather than inferring it afterwards from the cooldown: the old
       inference tested the decaying cooldown against a hard-coded 11 seconds,
       so a boat whose reload was under 11 - which included the Los Angeles,
       the best boat in the game - was never flagged at all, while a boat with
       a long reload stayed flagged for however long it took to decay to 11.
       Keyed on layer, like every other submarine check in the codebase, so it
       cannot drift away from the roster the way def.submerged did. */
    if (this.layer === "sub") this.recentlyFired = this.game.time;
  }

  /* ================= AREA ATTACK =================
     (owner) "we would like to make long distance rocket, long gun (like
     paladin), bomber force to attack area." A fire mission named ONE point
     (ui.js forceFire, Ctrl+right-click), and a bomber could only be sent at a
     thing or on a sweep. This is the order to put a weapon on a piece of
     ground: the player drags a line or a box (ui.js areaFireCommit) and
     every unit selected that can take it is handed its own share of it.

     WHO TAKES IT, and the rest are refused with the reason (areaMount):
       - a gun, rocket launcher or mortar on the ground - the mount bombard()
         fires on a point mission with no mount named: the first lobbed round
         that is neither a mine cargo nor held. A TEL's ballistic round is
         held, so a TEL keeps its one-aimpoint mission and is told so;
       - a heavy or stealth bomber with a load it can spread: a bomb load (a
         stick) or stand-off missiles to ground targets, two rounds a sortie
         at the least. The V-force and the Mirage IV carry ONE weapon a
         sortie (heavyair.js: one Blue Danube, Yellow Sun, Blue Steel, AN-11
         or ASMP) - nothing to spread over an area - and are refused, as are
         strike aircraft, fighters, gunships and ships.

     HOW THE GROUND IS SHARED (areaPlan). The area is a rectangle in world
     pixels on any heading - {cx, cy, ux, uy, hl, hw}: its centre, a unit
     vector down its long side, half its length and half its width - which
     is what the drag looked like on the screen (ui.js areaFromDrag), so a
     road drawn across a rotated or isometric view is a strip along that
     road and not the square box round it. Guns cut it into strips along its
     LONG side, one each, as ui.js areaCommit cuts a minefield belt, handed
     out in the order the guns stand along it so that no two cross to get
     to theirs. Bombers cut it ACROSS: lanes side by side, each the whole
     length, so a cell flies parallel runs the way an Arc Light cell laid
     its box - and on a line target the lanes all but coincide, which is a
     cell bombing a road. Splitting the length instead would put each bomber
     on a shorter run of the same line, in trail.

     The rounds are walked over a lattice laid on each strip (areaLay,
     areaPoint) with about as many points as the unit has rounds to put
     there - the ready rack times the burst for a gun, the load for a
     bomber - from the corner nearest the shooter, across the short side and
     a step along the long one, back and forth: rounds walked across the
     ground, not piled on one point. Past the last point the walk goes round
     again half a cell over, so a gun resupplied mid-mission fills the gaps.
     The aimpoint is coordinates, so ground nobody can see is fired on as
     readily as ground in sight, and the rounds hit whatever is really
     there (Combat.fire), exactly as a point mission's do. */

  /* the phantom a round is fired at when it is aimed at ground, not a thing */
  static groundAim(x, y) {
    return { x: x, y: y, layer: "ground", dead: false, armor: "structure", def: {}, owner: null,
             r: 0, tx: (x / CFG.TILE) | 0, ty: (y / CFG.TILE) | 0 };
  }
  /* piece i of n: along the long side (a gun's strip) or across it (a lane) */
  static areaPart(a, n, i, along) {
    const f = (2 * i + 1) / n - 1;
    if (along) return { cx: a.cx + a.ux * a.hl * f, cy: a.cy + a.uy * a.hl * f,
                        ux: a.ux, uy: a.uy, hl: a.hl / n, hw: a.hw };
    return { cx: a.cx - a.uy * a.hw * f, cy: a.cy + a.ux * a.hw * f,
             ux: a.ux, uy: a.uy, hl: a.hl, hw: a.hw / n };
  }
  /* about n lattice points over a, in the proportions of a; a strip less
     than half a tile across is a line of them. The walk steps along the
     longer side and sweeps the shorter, from the corner nearest (fx, fy). */
  static areaLay(a, n, fx, fy) {
    const T = CFG.TILE, N = Math.max(1, Math.round(n)), Lu = 2 * a.hl, Lv = 2 * a.hw;
    if (Lv < T * 0.5) { a.nu = N; a.nv = 1; }
    else if (Lu < T * 0.5) { a.nu = 1; a.nv = N; }
    else {
      a.nu = Math.max(1, Math.min(N, Math.round(Math.sqrt(N * Lu / Lv))));
      a.nv = Math.max(1, Math.ceil(N / a.nu));
    }
    a.out = Lu >= Lv ? "u" : "v";
    const dx = fx - a.cx, dy = fy - a.cy;
    a.su = dx * a.ux + dy * a.uy < 0 ? 1 : -1;
    a.sv = dy * a.ux - dx * a.uy < 0 ? 1 : -1;
    a.k = 0;
    return a;
  }
  static areaPoint(a, idx) {
    const nu = a.nu || 1, nv = a.nv || 1, M = nu * nv;
    const pass = Math.floor(idx / M), j = idx - pass * M;
    const byU = a.out !== "v", nIn = byU ? nv : nu;
    const row = Math.floor(j / nIn);
    let col = j - row * nIn;
    if (row & 1) col = nIn - 1 - col;                 // back and forth
    const iu = byU ? row : col, iv = byU ? col : row;
    const off = (pass & 1) ? 0.5 : 0;                 // the next pass falls between this one's
    let fu = ((iu + 0.5 + off) % nu) / nu, fv = ((iv + 0.5 + off) % nv) / nv;
    if (a.su < 0) fu = 1 - fu;
    if (a.sv < 0) fv = 1 - fv;
    const du = (fu * 2 - 1) * a.hl, dv = (fv * 2 - 1) * a.hw;
    return { x: a.cx + a.ux * du - a.uy * dv, y: a.cy + a.uy * du + a.ux * dv };
  }
  /* Who takes which piece. Returns the pieces, and who sat it out and why:
     `dry` for a gun with an empty rack and a bomber not yet rearmed or
     refuelled - forceFire's "OUT OF ROUNDS", the hangar's REARMING - and
     `no` for anything that cannot take the order at all. */
  static areaPlan(units, a) {
    const guns = [], air = [], dry = [], no = [];
    for (const u of units) {
      if (!u || u.dead || u.kind !== "unit" || u.carried || u.garrisonIn) continue;
      const m = u.areaMount();
      if (m.why) { no.push({ u: u, why: m.why }); continue; }
      if (u.layer === "air") {
        if (u.ordnanceDry()) dry.push({ u: u, why: "REARMING" });
        else if (u.fuel < u.reserveFuel()) dry.push({ u: u, why: "REFUELLING" });
        else air.push(u);
      } else if (u.roundsMax && u.rounds <= 0) dry.push({ u: u, why: "OUT OF ROUNDS" });
      else guns.push(u);
    }
    const along = (u) => (u.x - a.cx) * a.ux + (u.y - a.cy) * a.uy;
    const across = (u) => (u.y - a.cy) * a.ux - (u.x - a.cx) * a.uy;
    guns.sort((p, q) => along(p) - along(q));
    air.sort((p, q) => across(p) - across(q));
    const parts = [];
    guns.forEach((u, i) => parts.push({ u: u, a: Unit.areaPart(a, guns.length, i, true) }));
    air.forEach((u, i) => parts.push({ u: u, a: Unit.areaPart(a, air.length, i, false) }));
    return { parts: parts, dry: dry, no: no, guns: guns.length, air: air.length };
  }
  /* What this unit would put on an area: { wi, kind } - "gun", "stick" or
     "standoff" - or { why } it cannot take the order at all. Asked of the
     airframe's full load, not what is aboard now: an aircraft rearming on
     the ramp can take it, and is told it is rearming (areaPlan). */
  areaMount() {
    const d = this.def, ws = d.weapons || [];
    if (this.layer === "ground") {
      for (let i = 0; i < ws.length; i++) {
        const w = WEAPONS[ws[i]];
        if (!w || w.scatter || this.manualWeapon(w)) continue;
        if (w.proj === "arc" || w.indirect) return { wi: i, kind: "gun" };
      }
      return { why: this.isIndirect()
        ? "A BALLISTIC MISSILE GOES ON ONE AIMPOINT — CTRL+RIGHT-CLICK IT"
        : "NOTHING ABOARD FIRES OVER THE HORIZON" };
    }
    if (this.layer !== "air")
      return { why: this.isIndirect() ? "A SHIP'S GUNS TAKE A POINT MISSION — CTRL+RIGHT-CLICK"
                                      : "NOTHING ABOARD FIRES OVER THE HORIZON" };
    if (d.role !== "heavybomber" && d.role !== "stealthbomber")
      return { why: "ONLY HEAVY BOMBERS BOMB AN AREA" };
    let best = -1, kind = null, one = null;
    for (let i = 0; i < ws.length; i++) {
      const w = WEAPONS[ws[i]];
      if (!w || !w.tgt || !w.tgt.ground || w.nuke || w.antiRadiation) continue;
      const so = Unit.standoffRound(w);
      if (w.proj !== "bomb" && !so) continue;
      const n = this.ammoMax ? Math.floor((this.ammoMax + 0.01) / (w.ammo || 1)) * (w.burst || 1) : 2;
      if (n < 2) { one = one || w; continue; }
      /* a stand-off round leads: it is why the airframe can stay outside */
      if (best < 0 || (so && kind !== "standoff")) { best = i; kind = so ? "standoff" : "stick"; }
    }
    if (best >= 0) return { wi: best, kind: kind };
    if (one) return { why: "ONE " + String(one.name).toUpperCase() + " A SORTIE — RIGHT-CLICK ITS TARGET" };
    return { why: "NOTHING ABOARD FOR GROUND TARGETS" };
  }
  /* the order this unit takes for its piece `a` of an area; `queued` sizes
     a gun's walk for the full rack it will have by then */
  areaOrder(a, queued) {
    const m = this.areaMount();
    if (m.why) return null;
    const w = WEAPONS[this.def.weapons[m.wi]], T = CFG.TILE, g = this.game, burst = w.burst || 1;
    if (m.kind === "gun") {
      const rounds = this.roundsMax ? Math.max(1, queued ? this.roundsMax : this.rounds) : 12;
      const s = Unit.areaLay(Object.assign({}, a), rounds * burst, this.x, this.y);
      const p = Unit.areaNext(s, burst);
      /* The window: the drive into range, the set-up, the rack fired at the
         gun's own rate and twenty seconds over - a point mission's flat 90 s
         is less than a Paladin's fourteen rounds take (8.5 s apart, 119 s).
         Out of supply contact the rate is the rationed one, up to 1.55 times
         the reload (bombard, tryFire): sized at the unrationed rate, a
         Paladin out of contact got 12 of its 14 rounds away before its
         window closed. It is a ceiling: the mission ends when the rack does. */
      const far = Math.max(0, U.dist(this.x, this.y, a.cx, a.cy) - this.weaponRange(w) * 0.85);
      const ration = this.inSupply && !this.inSupply() ? 1.55 : 1;
      const span = far / Math.max(0.2, (this.def.speed || 1) * T) * 1.4 + (this.def.deploySec || 1.6) +
                   rounds * w.reload / CFG.VET_ROF[this.vet] * ration + 20;
      const o = { type: "bombard", wi: m.wi, x: p.x, y: p.y, area: s, until: g.time + Math.min(300, span) };
      if (p.ext > 0) o.ext = p.ext;
      return o;
    }
    const n = this.ammoMax ? Math.floor((this.ammo + 0.01) / (w.ammo || 1)) * burst : burst;
    if (m.kind === "standoff")
      return { type: "areastrike", mode: "standoff", wi: m.wi, k: 0,
               area: Unit.areaLay(Object.assign({}, a), Math.max(1, n), this.x, this.y) };
    return { type: "areastrike", mode: "stick", wi: m.wi, k: 0, pass: 0,
             dir: this.areaEntry(a, w), area: Object.assign({}, a) };
  }
  /* One round of an area mission, and the rest of its burst, each on the
     next point of the walk. Fired through tryFire(), the gun's own fire
     control: its ready rack, its reload and supply strain, the counter-
     battery contact every lobbed round leaves (Combat.fire) - and its
     burst, which bombard() never fired: a point mission puts one rocket of
     an M270's twelve on the ground per ready round. Here a ready round is
     what it is everywhere else in the game, the whole ripple, laid down
     twelve points of the walk.
     ---- and the whole ripple inside the tube's reach ----
     bombard() tests its reach against (o.x, o.y), and with that the next
     point of the walk only a ripple's first rocket was sure to be in reach:
     the other eleven went where the walk said, however far that was. And
     (o.x, o.y) moved on as the ripple left, so a launcher whose next point
     was out of reach drove off with the rest of it still to go. Measured
     on a 20-tile line drawn straight away from an M270 out of supply, 35 of
     its 84 rockets landed beyond its 25.1-tile reach (by up to 0.3 tiles -
     a ripple is an eighth of its rack's walk) and 59 were fired on the
     move. (o.x, o.y) is now the middle of the coming ripple and o.ext the
     farthest of its points from it (areaNext), and bombard() keeps the
     middle within reach less that, so every point is in reach from where
     the launcher lays; a ripple too wide for the band between the minimum
     and the maximum range has the rockets that fall outside it pulled onto
     it, along their bearing. While the ripple leaves (o.hold) the launcher
     stays where it is. A gun fires one round a volley: ext is 0 and
     (o.x, o.y) is the point, as before. */
  areaVolley(o, wi) {
    const a = o.area, w = WEAPONS[this.def.weapons[wi]], k0 = a.k || 0, n = w.burst || 1;
    const range = this.weaponRange(w), minR = (w.minRange || 0) * CFG.TILE;
    const at = (j) => {
      const p = Unit.areaPoint(a, k0 + j);
      const dx = p.x - this.x, dy = p.y - this.y, d = Math.hypot(dx, dy), dd = U.clamp(d, minR, range);
      return dd === d || !(d > 0) ? Unit.groundAim(p.x, p.y)
                                  : Unit.groundAim(this.x + dx * dd / d, this.y + dy * dd / d);
    };
    this.tryFire(wi, at(0), n > 1 ? at : null);
    if (!(this.cooldowns[wi] > 0)) return;            // nothing left the tube
    a.k = k0 + n;
    const p = Unit.areaNext(a, n);
    o.x = p.x; o.y = p.y; o.ext = p.ext;
    if (n > 1) o.hold = this.game.time + (n - 1) * (w.burstDelay || 0.1) + 0.05;
  }
  /* the next n points of the walk from a.k: their middle, and how far the
     farthest of them lies from it (one point: the point, and 0) */
  static areaNext(a, n) {
    const k = a.k || 0;
    let sx = 0, sy = 0, e = 0;
    for (let j = 0; j < n; j++) { const p = Unit.areaPoint(a, k + j); sx += p.x; sy += p.y; }
    const cx = sx / n, cy = sy / n;
    for (let j = 0; n > 1 && j < n; j++) { const p = Unit.areaPoint(a, k + j); e = Math.max(e, Math.hypot(p.x - cx, p.y - cy)); }
    return { x: cx, y: cy, ext: e };
  }

  /* run for the nearest friendly structure, or straight away from the shooter */
  runAway(dt) {
    if (this.rallyX === null || this.rallyX === undefined) {
      let best = null, bd = Infinity;
      for (const b of this.owner.buildings) {
        if (b.dead) continue;
        const d = U.dist2(this.x, this.y, b.x, b.y);
        if (d < bd) { bd = d; best = b; }
      }
      if (best) { this.rallyX = best.x; this.rallyY = best.y; }
      else {
        const src = this.lastHitBy;
        const a = src ? Math.atan2(this.y - src.y, this.x - src.x) : this.ang + Math.PI;
        this.rallyX = this.x + Math.cos(a) * CFG.TILE * 10;
        this.rallyY = this.y + Math.sin(a) * CFG.TILE * 10;
      }
    }
    this.stepAlong(this.rallyX, this.rallyY, dt);
  }

  /* ---- generic ground / naval brain ---- */
  /* ---- a move order that is going nowhere ----
     Generalised from the scouting fix, because the fault was never specific
     to scouts: a unit whose route is blocked by traffic, or which oscillates
     against a wall, or whose path was valid when it was issued and is not any
     more, keeps grinding toward a goal it will not reach. stepAlong() only
     reports failure when Path.find cannot produce a route AT ALL; a route
     that exists and cannot be walked looks identical to one being walked.

     So: measure the range to the aim point, look again ten seconds later, and
     if it has not closed by a tenth of the leg, act. Closing re-arms the
     window, so a long march is checked repeatedly rather than punished for
     being long.

     What "act" means differs by owner, and this is the part worth being
     careful about. An AI unit drops the order - the commander re-tasks it on
     its next sweep, which is what the scouting change already relies on. A
     unit the PLAYER ordered does NOT get its order cancelled: being second-
     guessed by the pathfinder is infuriating and the player may be holding a
     unit against a wall deliberately. It gets its cached path thrown away and
     one forced re-plan, which fixes the stale-route case without overriding
     anybody. If it is still stuck after that it keeps trying, silently, as it
     always did. */
  stalledOnMove(px, py, dt) {
    const g = this.game, now = g.time;
    const d = U.dist(this.x, this.y, px, py);
    if (this._mvCk === undefined || this._mvGx !== px || this._mvGy !== py) {
      this._mvGx = px; this._mvGy = py; this._mvD0 = d; this._mvCk = now + 10;
      return false;
    }
    if (now < this._mvCk) return false;
    const gained = (this._mvD0 === undefined ? d : this._mvD0) - d;
    if (gained > Math.max(CFG.TILE * 1.2, (this._mvD0 || d) * 0.1)) {
      this._mvD0 = d; this._mvCk = now + 10;        // making way
      return false;
    }
    this._mvD0 = d; this._mvCk = now + 10;
    return true;
  }

  /* ---- SEAD: a Weasel shoots what is radiating, without being asked ----
     (owner) "the eltronic war aircraft should launch the missle to the rador
     or sam automatically."

     Why this needs its own path at all. acquire() asks canTarget(e, true), and
     canTarget skips any mount manualWeapon() calls held (entities.js:288). An
     anti-radiation round is held two ways over - `manual` on the round itself
     and `noAuto` stamped on roles sead and ewair by generations.js:1118 - so
     acquire() returns null for a Weasel in every state it can be in. It was
     never going to fire by the ordinary route, and nothing short of widening
     the gate would have changed that.

     THE GATE IS NOT WIDENED. manualWeapon(), released(), holdsFire() and the
     release token setOrder stamps are untouched. What happens instead is that
     the aircraft ISSUES ITSELF the order it would otherwise have waited for:
     an attack carrying release, which is exactly the order a player gives by
     clicking the battery. released() then reads true, holdsFire() false, and
     pickWeapon finds the HARM by the ordinary path. Nothing that is held today
     becomes un-held; one specific airframe gets standing permission to name
     one specific class of target.

     FOUR THINGS IT WILL NOT SHOOT, which is where the discipline lives:
       - anything it cannot SEE. G.visibleTo, so the fog rule is the same one
         everything else obeys;
       - anything that is not RADIATING. G.jamming() is false for an unpowered
         dome, a browned-out SAM and a jammer parked with its pods stowed - so
         switching a battery off is a real counter-play and this respects it;
       - anything that is not part of the air-defence system. A radar or a
         jammer that can also engage aircraft, or a pure sensor. Not an
         airbase, not a warship, not a tank with a rangefinder;
       - anything out of reach of the round it is actually carrying.
     A SNIFF patrol (below, SNIFF) asks the same question with two more
     words: `extra` pixels past the round's reach that it will fly in to
     close (its approach), and `skip`, a contact it leaves alone because a
     round of its side is already on the way to it. Left out, as by every
     other caller, the question is exactly what it always was. */
  seadTarget(fromRamp, extra, skip) {
    const d = this.def;
    if (d.role !== "sead" && d.role !== "ewair") return null;
    if (this.stance === "hold") return null;
    /* `fromRamp` asks the question a parked Weasel needs answered before it
       decides to start engines: is there a radiating battery within reach of
       the round I am carrying? Everything else about the test is identical -
       it still has to be transmitting, still has to be in the plot, still has
       to be inside the weapon. */
    if (this.parked && !fromRamp) return null;
    if (this.ammoMax && this.ammo < 1) return null;
    const g = this.game;
    if (!g.jamming || !g.visibleTo) return null;
    /* the anti-radiation mount this airframe actually has */
    let reach = 0;
    for (const k of (d.weapons || [])) {
      const w = WEAPONS[k];
      if (w && w.antiRadiation && w.tgt && w.tgt.ground)
        reach = Math.max(reach, this.weaponRange(w));
    }
    if (!reach) return null;
    let best = null, bs = -Infinity;
    for (const p of g.players) {
      if (p === this.owner || g.allied(this.owner, p)) continue;
      const look = (e) => {
        if (e.dead || !e.def) return;
        if (e.kind === "unit" && e.layer !== "ground") return;   // not ships, not aircraft
        const emits = (e.def.radar || 0) + (e.def.jam || 0);
        if (!emits) return;
        /* part of the air-defence system: it can shoot at aircraft, or its
           whole job is to transmit. An enemy AIRBASE carries def.radar and is
           deliberately excluded - shooting airfields is not SEAD. */
        const shoots = g.airDefenceReach ? g.airDefenceReach(e.def) > 0 : false;
        const sensor = !!e.def.jam || (e.def.radar && !e.def.pads && e.cat !== "aircraft");
        if (!shoots && !sensor) return;
        if (e.def.pads) return;                                  // an airbase is not a SAM
        if (!g.jamming(e)) return;                               // off the air, left alone
        /* SEEN or HEARD. A Weasel is cued by its own receiver, by an E-2 or
           E-3, or by an Aegis hull - one listener cues the whole force, which
           is what the network is for. Still fog-honest: nothing enters the
           plot that is not transmitting, and nothing transmits that is
           switched off or on a dead grid. */
        if (!(g.airPlotKnows ? g.airPlotKnows(this.owner, e)
                             : g.visibleTo(this.owner, e))) return;
        const dist = U.dist(this.x, this.y, e.x, e.y);
        /* `reach` is weaponRange(), which already ends in * CFG.TILE, so this
           multiplied by the tile size a second time: a 17.3-tile HARM was
           gated at 553 tiles, which on a 144-tile map refuses nothing at all -
           measured, seadTarget() still named a battery 200 tiles away. This is
           the ONE round the game lets an airframe loose without an order, and
           the narrowness of the gate is the whole reason that is allowed. */
        if (dist > reach + (extra || 0)) return;
        if (skip && skip(e)) return;
        /* prefer the one that can actually hurt us, then the closer */
        const sc = (shoots ? 1000 : 0) + emits * 10 - dist / CFG.TILE;
        if (sc > bs) { bs = sc; best = e; }
      };
      for (const u of p.units) look(u);
      for (const b of p.buildings) if (b.buildProgress >= 1) look(b);
    }
    return best;
  }

  updateGeneric(dt) {
    const o = this.order;
    this.moving = false;

    if (o.type === "move") {
      /* a loaded air-cushion craft sent to a beach picks the waterline it
         runs in to before it sets off (AIR-CUSHION LANDING, planBeach) */
      if (o.unloadAt && o.rampX === undefined && this.def.aircushion && this.cargo && this.cargo.length) this.planBeach(o);
      /* A scout is not handled here AT ALL. ai.js's scouting sweep owns recon
         units and does strictly more than this can: it writes the refused cell
         into scoutShy so the next bid cannot hand back the same goal. Two
         stall detectors on one unit is one too many and the specific one knows
         more - running both took test 34 from two distinct goals in thirty
         seconds back down to one, because this one cleared the order before
         the scouting sweep could record WHY it failed. */
      const scoutOwned = this.def.role === "recon" && this.owner && this.owner.isAI;
      if (!scoutOwned && this.stalledOnMove(o.x, o.y, dt)) {
        if (this.owner && this.owner.isAI) {
          /* the commander will give it something else to do */
          this.path = null;
          if (!this.nextOrder()) this.order = { type: "idle" };
          return;
        }
        this.path = null; this.repathT = 0;           // one forced re-plan
      }
      const arrived = this.legDone(o, dt);
      if (arrived) this.groupSpeed = 0;
      /* A loaded transport sent to a shore it cannot itself enter beaches as
         close as it can get and puts its cargo off there, which is plainly
         what the order meant. The test that matters is whether the CARGO can
         reach the aim point now, not whether the hull did.
         IT USED TO BE that the hull could never report "arrived" here: the
         goal tile is land its own layer cannot occupy, so the path was clamped
         to the water's edge and the final distance test never passed. That is
         no longer true. Path.find now REFUSES a goal on another piece of water
         once the hull is on the tile of its own water nearest to it, and
         stepAlong reads a refusal as "arrived" - which is exactly the tile a
         landing craft sits on while it unloads. So this branch runs BEFORE the
         no-route line below and RETURNS when the cargo goes ashore: a craft
         that has just landed its troops has done what it was told, and telling
         it in the same breath that it needs a transport is nonsense. Measured
         on hormuz with the line above this branch instead: a loaded craft at
         8,5 ordered onto the beach at 10,3 said "NO ROUTE - THAT GROUND NEEDS
         A TRANSPORT" and then "3 UNITS ASHORE", and 261 water tiles of that
         one map are the nearest water to a land aim 2-4.5 tiles inland, so it
         is the ordinary shape of a landing and not an edge case. */
      /* An air-cushion craft with a waterline chosen (planBeach) is not
         held to that: it goes on to the sand edge and puts its load off
         over its ramp there (beachRun, rampOff). 1: still gliding up. */
      const ramp = o.rampX >= 0 && this.cargo && this.cargo.length ? this.beachRun(o, arrived, dt) : 0;
      if (ramp === 1) return;
      if (o.unloadAt && this.cargo && this.cargo.length &&
          (ramp ? ramp === 2 : U.dist(this.x, this.y, o.x, o.y) < CFG.TILE * 4.5)) {
        const n = ramp ? this.rampOff(o) : this.unload(o.x, o.y);
        /* what a well-deck ship keeps aboard goes in her landing craft */
        const kept = this.vehiclesKept();
        if (n || (kept && kept === this.cargo.length)) {
          if (this.owner === this.game.human) {
            if (n) this.game.alert(n + (n === 1 ? " UNIT ASHORE" : " UNITS ASHORE"), "good");
            if (kept) this.game.alert(Unit.keptLine(kept), "warn");
          }
          if ((!this.cargo.length || kept === this.cargo.length) && !this.nextOrder()) this.order = { type: "idle" };
          return;
        }
      }
      /* ---- AN ORDER THAT ENDED BECAUSE THERE IS NO ROUTE ----
         stepAlong reports a refusal as "arrived", which is right - there is
         nothing further the unit can do - and is how the commander gets a unit
         back to re-task instead of grinding at a shoreline for the ten seconds
         stalledOnMove takes to notice. To the PLAYER that same silence reads
         as a bug: the tank walks to the beach, stops, and says nothing, so the
         order looks lost rather than impossible.
         `pathFail` is the exact discriminator. It is stamped only where
         Path.find produced no route at all and cleared by the next search that
         succeeds, so a goal spiralled onto the edge of a refinery - a real
         route, just not the tile that was clicked - stays quiet, and only a
         genuine refusal speaks. One line for a whole group: alert() drops a
         repeat of the same text inside four seconds, and the four-second gate
         here keeps the roster scan below off the tick as well. */
      if (arrived && this.pathFail && this.owner === this.game.human &&
          U.dist(this.x, this.y, o.x, o.y) > CFG.TILE * 2) {
        const g = this.game;
        if (g.time >= (g._noRouteT || 0)) {
          g._noRouteT = g.time + 4;
          /* and say what would fix it, when something would. Only something
             that walks or drives can be put aboard anything, so only a GROUND
             unit is offered the ride - a hull is already the transport, and
             advising a destroyer to find one is how this line first read. The
             carriers that count are the ones a right-click already accepts as
             a ride (ui.js): anything with a hold for a rifle squad, an
             amphibian for a vehicle. Nothing is ordered aboard - loading a
             unit into a transport the player did not ask for is exactly the
             second-guessing stalledOnMove refuses to do to them. */
          let lift = false;
          if (this.layer === "ground") {
            for (const u of g.human.units) {
              if (u.dead || !u.def.cargo) continue;
              /* an amphibious assault ship has a deck and a hold: it is a ride,
                 for a vehicle only where she has a well deck (holdRefusal) */
              if (this.cat === "infantry" ? (!u.def.carrier || u.def.amphib)
                                          : !!u.def.amphib && !u.holdRefusal(this)) { lift = true; break; }
            }
          }
          g.alert(lift ? "NO ROUTE \u2014 THAT GROUND NEEDS A TRANSPORT"
                       : "NO ROUTE \u2014 STOPPED AS CLOSE AS IT CAN GET", "bad", true);
        }
      }
      if (arrived && !this.nextOrder()) this.order = { type: "idle" };
    } else if (o.type === "autolay" || o.type === "autosweep") {
      /* ---- working an area on its own ----
         Both jobs are the same shape: walk a lattice across the rectangle the
         player drew and do something at each point. Laying spaces its points
         a belt apart; sweeping spaces them by the clearing radius so the
         ground is actually covered rather than sampled. The unit keeps its
         own place in the lattice, so it resumes where it left off after a
         trip home for more mines. */
      const laying = o.type === "autolay";
      /* Lay on a belt spacing; sweep on something narrower than the clearing
         radius so consecutive lanes OVERLAP. At 1.5x the radius the lanes left
         unswept strips between them and the vehicle merely sampled the box. */
      /* Mines are spaced a belt apart. Nodes are spaced by what makes a FIX:
         two of them have to hold the same boat at once, so the spacing must be
         under twice the reach they get against that boat. At 2.4 tiles a
         barrier fixes a Kilo under way (heard at 1.84 tiles) and merely cues
         on one creeping (0.77), which is the whole design in one number. */
      const step = CFG.TILE * (laying ? (this.netMax ? 2.4 : 1.6)
                   : Math.max(1.0, (this.def.mineClear || 1.5) * 0.9));
      if (!o.pts) {
        o.pts = [];
        const x0 = Math.min(o.x0, o.x1), x1 = Math.max(o.x0, o.x1);
        const y0 = Math.min(o.y0, o.y1), y1 = Math.max(o.y0, o.y1);
        /* Snap every point to a tile centre. stepAlong() navigates tile to
           tile and cannot move WITHIN a tile, so an arbitrary point left the
           vehicle parked in the right tile, a fraction of a tile short of its
           target, unable to close the gap and unable to give up - it simply
           stopped there for good. */
        const snap = (v) => (((v / CFG.TILE) | 0) + 0.5) * CFG.TILE;
        /* Reachability, not merely passability. Afloat the two are the same
           question - open water is reachable by definition - but ashore they
           are not: a box drawn over your own base, a walled compound or the
           far bank of a river is full of tiles the vehicle may stand on and
           can never drive to. Path.find() answers an unreachable goal with a
           path to the nearest tile it already reached, so the vehicle reported
           "not arrived" while standing still and burned the whole 14 second
           timeout on every one of them. One flood fill from where the vehicle
           stands settles the entire box for about the cost of one path query. */
        const map = this.game.map, MW = map.W, MH = map.H;
        const blocked = (a, b) => this.game.tileBlocked(a, b, this);
        let reach = null;
        if (this.layer !== "air") {
          let s = { x: this.tx, y: this.ty };
          if (!GameMap.passable(map, s.x, s.y, this.layer) || blocked(s.x, s.y))
            s = Path.nearest(map, s.x, s.y, this.layer, blocked, 10) || s;
          reach = new Uint8Array(MW * MH);
          const q = [s.y * MW + s.x];
          reach[q[0]] = 1;
          for (let qi = 0; qi < q.length; qi++) {
            const ci = q[qi], cx = ci % MW, cy = (ci / MW) | 0;
            for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
              const nx = cx + dx, ny = cy + dy;
              if ((!dx && !dy) || nx < 0 || ny < 0 || nx >= MW || ny >= MH) continue;
              const ni = ny * MW + nx;
              if (reach[ni] || !GameMap.passable(map, nx, ny, this.layer) ||
                  blocked(nx, ny)) continue;
              reach[ni] = 1; q.push(ni);
            }
          }
        }
        /* One dedupe for the whole lattice, not one per row: at a spacing near
           a single tile two consecutive ROWS snap onto the same tile row, and
           a map reset every row could not see it. */
        const seen = {};
        let row = 0;
        /* COUNTED rows and columns, not a stepped walk in from the edge. The
           walk began half a step inside the box and stopped at its far edge,
           so a box thinner than half a step in either axis produced no points
           at all and the order died with "CANNOT REACH THAT GROUND". A barrier
           drawn across a channel is exactly that box - a long thin drag is
           what drawing a line looks like - so the one shape this feature needs
           most was the one shape the lattice could not build. Counting
           guarantees at least one row and one column, spreads the points
           evenly at about the same spacing, and the tile dedupe below still
           collapses any two that land on the same tile. */
        const nRow = Math.max(1, Math.round((y1 - y0) / step));
        const nCol = Math.max(1, Math.round((x1 - x0) / step));
        for (let ri = 0; ri < nRow; ri++, row++) {
          const yy = y0 + (y1 - y0) * ((ri + 0.5) / nRow);
          const cols = [];
          for (let ci = 0; ci < nCol; ci++) {
            const xx = x0 + (x1 - x0) * ((ci + 0.5) / nCol);
            const sx2 = snap(xx), sy2 = snap(yy), key = sx2 + "," + sy2;
            if (seen[key]) continue;
            seen[key] = 1;
            const gx2 = (sx2 / CFG.TILE) | 0, gy2 = (sy2 / CFG.TILE) | 0;
            if (!GameMap.passable(map, gx2, gy2, this.layer)) continue;
            if (blocked(gx2, gy2)) continue;      // own structures and obstacles
            if (reach && !reach[gy2 * MW + gx2]) continue;
            cols.push({ x: sx2, y: sy2 });
          }
          /* boustrophedon: down one row and back along the next, so the
             vehicle does not drive the whole width empty between passes */
          if (row % 2) cols.reverse();
          for (const c of cols) o.pts.push(c);
        }
        o.i = 0;
        if (!o.pts.length) {
          /* A box with nothing workable in it is worth saying out loud: it is
             otherwise indistinguishable from the order being ignored. Silent
             when the box itself is missing, which is how a saved order comes
             back - liteOrder() keeps the type and drops the four corners. */
          if (this.owner === this.game.human && isFinite(x0) && isFinite(y0))
            this.game.alert(this.def.name.toUpperCase() +
                            " — CANNOT REACH THAT GROUND", "bad");
          this.order = { type: "idle" };
          return;
        }
      }

      /* Out of mines: go and fill up, then come back to the same place.
         Neither one steers at owner.homeX/homeY any more. That pair is the
         tile the battle started on, so it aimed a hull at the land conyard it
         can never reach, and aimed a vehicle at open ground the moment the
         base moved or was overrun - in both cases without a word. Each picks
         a building that exists instead: a naval yard for a hull, the nearest
         structure of any kind for a vehicle, since a vehicle takes its load
         anywhere inside the base radius. */
      if (laying && this.payloadLeft() <= 0 && o.i < o.pts.length) {
        /* Running dry with nothing left to lay is not a reason to drive home:
           the vehicle used to run the whole rearm trip after its final point
           and only then report the area complete. */
        const afloat = this.layer === "sea" || this.layer === "sub";
        let hx = 0, hy = 0, arrived;
        if (afloat) {
          let yard = null, bd = Infinity;
          for (const b of this.owner.buildings) {
            if (b.dead || !b.def.produces || b.def.produces !== "naval") continue;
            const dd = U.dist2(this.x, this.y, b.x, b.y);
            if (dd < bd) { bd = dd; yard = b; }
          }
          if (!yard) {                       /* nowhere to rearm: stop asking */
            if (this.owner === this.game.human)
              this.game.alert(this.def.name.toUpperCase() +
                              " \u2014 NO NAVAL YARD TO REARM AT", "bad");
            this.order = { type: "idle" };
            return;
          }
          hx = yard.x; hy = yard.y;
          arrived = U.dist(this.x, this.y, hx, hy) < CFG.TILE * 5.0;
        } else {
          /* Ashore the rule is the same as afloat: steer for a building that
             exists, not for owner.homeX/homeY. That pair is the tile the
             battle started on, so a layer whose base had moved - or been
             overrun - set course for open ground and waited there for a load
             that was never coming, and said nothing. Any building will do,
             because the load itself is taken anywhere inside the base radius. */
          let home = null, hd = Infinity;
          for (const b of this.owner.buildings) {
            if (b.dead) continue;
            const dd = U.dist2(this.x, this.y, b.x, b.y);
            if (dd < hd) { hd = dd; home = b; }
          }
          if (!home) {
            if (this.owner === this.game.human)
              this.game.alert(this.def.name.toUpperCase() +
                              " \u2014 NO BASE TO REARM AT", "bad");
            this.order = { type: "idle" };
            return;
          }
          hx = home.x; hy = home.y;
          arrived = this.owner.inBaseRadius(this.tx, this.ty);
        }
        if (!arrived) {
          /* Said once per trip. A vehicle that abandons the box and drives off
             on its own reads as a bug unless the player is told why. */
          if (!o.saidRearm) {
            o.saidRearm = true;
            if (this.owner === this.game.human)
              this.game.alert(this.def.name.toUpperCase() +
                              " \u2014 OUT OF " + this.payloadWord() +
                              ", RETURNING", "bad");
          }
          this.stepAlong(hx, hy, dt, CFG.TILE * 2.5);
          return;
        }
        this.moving = false;
        /* Take on only what the rest of the lattice can use. Standing through
           a whole belt at four seconds a mine to lay the last two points of a
           box is half a minute of nothing, and the land layer - the slower of
           the two, with the longer round trip - paid that toll far more often
           than the ship ever did. */
        if (this.payloadLeft() < Math.min(this.payloadMax(), o.pts.length - o.i)) return;
        o.saidRearm = false;
        o.tOn = 0;
      }

      if (o.i >= o.pts.length) {
        if (this.owner === this.game.human)
          this.game.alert(this.def.name.toUpperCase() + " \u2014 AREA COMPLETE", "good");
        this.order = { type: "idle" };
        return;
      }
      const p = o.pts[o.i];
      /* Arrival is judged a little over half the lattice spacing. At three
         quarters of a tile a friendly vehicle parked on the point could hold
         the layer out: on marsh, woods or built-up ground the layer makes
         18-25 px/s against a 30 px/s separation push, so it never closed and
         the point cost the full timeout. A ship, on flat-speed water at 83
         px/s, always shouldered through - which is why this only ever bit
         ashore. Where the mine goes is unchanged: it is laid at the lattice
         point, not under the vehicle. */
      const near = U.dist(this.x, this.y, p.x, p.y) < CFG.TILE * 1.05;
      if (!near) {
        this.stepAlong(p.x, p.y, dt);
        /* A per-point timeout, because the clever versions both failed. A
           point whose own tile cannot be reached makes the pathfinder clamp
           the goal to somewhere the vehicle has already reached, so it reports
           "not arrived" for ever while standing perfectly still. Judging
           "stuck" by movement punished a slow vehicle turning on the spot;
           judging it by progress towards the point failed against a vehicle
           ORBITING an unreachable one, whose every inward swing reset the
           timer. So the clock stops only for progress that STICKS: a ratchet
           on the closest this vehicle has ever been to THIS point, which an
           orbit never beats and a turn on the spot does not need to. A plain
           clock also ran through the long drive back from a rearm trip, so a
           layer with a distant base threw away a lattice point for every
           fourteen seconds of the return leg - points it never reached. */
        const dp = U.dist(this.x, this.y, p.x, p.y);
        if (o.bestI !== o.i) { o.bestI = o.i; o.bestD = Infinity; o.tOn = 0; }
        if (dp < o.bestD - CFG.TILE * 0.4) { o.bestD = dp; o.tOn = 0; }
        o.tOn = (o.tOn || 0) + dt;
        if (o.tOn > 14) { o.tOn = 0; o.i++; o.workT = 0; }
        return;
      }
      o.tOn = 0;
      this.moving = false;
      o.workT = (o.workT || 0) + dt;
      if (laying) {
        /* Never stack two on one point. Drawing a box over ground already
           seeded - the obvious way to thicken a belt - used to put a second
           mine on top of every one of the first, which buys nothing: a mine
           fires once and the tile is covered either way. On a load of eight
           that was the whole belt. A node is the same waste for a different
           reason: a second one inside the first's lens adds no overlap and
           costs eight barrels. Skip the point at once rather than standing
           over it for the full lay first. */
        if (this.payloadCovered(p.x, p.y)) { o.workT = 0; o.i++; return; }
        if (o.workT < 1.1) return;
        o.workT = 0;
        /* Every node from one order belongs to one barrier, so the battery
           warning and the contact report are per FIELD and not per node - a
           six-node line otherwise says the same thing six times. */
        if (this.netMax && !o.field && typeof SonarNet !== "undefined")
          o.field = SonarNet.newField();
        if (!this.layPayloadAt(p.x, p.y, o.field) && this.payloadLeft() > 0) {
          /* It could not be paid for: the round is still on the rack, so the
             boat is not out of nodes, it is out of fuel. Loitering over the
             point in water the enemy patrols until a refinery catches up is
             worse than stopping, so it stops and says which it was. */
          if (this.owner === this.game.human)
            this.game.alert(this.def.name.toUpperCase() +
                            " — NO FUEL FOR THE BARRIER", "bad");
          this.order = { type: "idle" };
          return;
        }
      } else {
        /* A sweeper does its work simply by being there: Mines.update() eats
           anything inside its radius every tick, including while it drives.
           The pause at each point only has to be long enough to finish a mine
           that came into range on arrival, so it is short. */
        if (o.workT < 1.2) return;
        o.workT = 0;
      }
      o.i++;
    } else if (o.type === "emplace") {
      /* Field engineering: walk to the spot, work for a few seconds, and put
         an obstacle in the ground. The engineer is not consumed - it moves on
         to the next one, so a belt is a queue of orders. */
      if (this.stepAlong(o.x, o.y, dt, CFG.TILE * 0.9)) {
        this.moving = false;
        o.workT = (o.workT || 0) + dt;
        const def = BUILDINGS[o.what];
        if (!def) { this.order = { type: "idle" }; return; }
        if (o.workT < (def.time || 4)) return;
        const tx = (o.x / CFG.TILE) | 0, ty = (o.y / CFG.TILE) | 0;
        this.game._placer = this;
        const ok = this.game.canPlace(this.owner, o.what, tx, ty);
        this.game._placer = null;
        if (ok &&
            this.owner.cash >= (def.cost || 0)) {
          this.owner.cash -= def.cost || 0;
          this.game.placeBuilding(this.owner, o.what, tx, ty, true);
          if (Combat.addEffect)
            Combat.addEffect({ t: "text", x: o.x, y: o.y - 10, s: def.name.toUpperCase(),
                               life: 0.9, max: 0.9, c: "#8fd05f" });
        } else if (this.owner === this.game.human) {
          /* a field engineer's obstacle is a structure put down by hand */
          Sfx.announce(this.owner.cash < (def.cost || 0) ? "insufficient_funds" : "cannot_build", this);
          this.game.alert(this.owner.cash < (def.cost || 0)
            ? "NOT ENOUGH FUNDS" : "CANNOT EMPLACE THERE", "bad");
        }
        if (!this.nextOrder()) this.order = { type: "idle" };
      }
    } else if (o.type === "clearobstacle") {
      /* Pulling out an obstacle - anybody's. This is what lets an assault get
         through a belt without shelling every tile of it. */
      const t = o.target;
      if (!t || t.dead) { if (!this.nextOrder()) this.order = { type: "idle" }; return; }
      const near = U.dist(this.x, this.y, t.x, t.y) < CFG.TILE * 1.4;
      if (!near) { this.stepAlong(t.x, t.y, dt, CFG.TILE * 1.1); return; }
      this.moving = false;
      o.workT = (o.workT || 0) + dt;
      if (o.workT >= 3.0) {
        if (Combat.addEffect)
          Combat.addEffect({ t: "text", x: t.x, y: t.y - 10, s: "CLEARED",
                             life: 0.8, max: 0.8, c: "#8fd05f" });
        this.game.removeBuilding(t);
        t.dead = true;
        if (!this.nextOrder()) this.order = { type: "idle" };
      }
    } else if (o.type === "laymine") {
      /* Drive to the spot and put one in the ground. The vehicle keeps going
         along the queue afterwards, so shift-clicking a line of points lays a
         belt rather than a single mine. */
      if (this.stepAlong(o.x, o.y, dt)) {
        /* Stop, lay, then move on. A vehicle that drops a mine without ever
           slowing down looks like it is leaking them. */
        this.moving = false;
        o.layT = (o.layT || 0) + dt;
        if (o.layT < 1.1) return;
        if (this.payloadLeft() > 0) {
          /* Shift-clicking a line of points is how a barrier is laid by hand,
             so the whole queue shares one field id the way one area order
             does. */
          if (this.netMax && !o.field && typeof SonarNet !== "undefined")
            o.field = SonarNet.newField();
          this.layPayloadAt(this.x, this.y, o.field);
          if (this.owner === this.game.human && this.payloadLeft() === 0)
            this.game.alert(this.def.name.toUpperCase() + " OUT OF " +
                            this.payloadWord(), "bad");
        }
        if (!this.nextOrder()) this.order = { type: "idle" };
      }
    } else if (o.type === "attackmove") {
      const foe = this.acquire();
      if (foe) { this.order = { type: "attack", target: foe, resume: { x: o.x, y: o.y }, auto: true }; }
      else if (this.legDone(o, dt) && !this.nextOrder()) this.order = { type: "idle" };
    } else if (o.type === "patrol") {
      /* ---- PATROL: walk a beat, and fight what is met on it ----
         (owner) "the bottom should have helper line like deploy, recall,
         petrol ..." Aircraft already fly a combat air patrol (CAP, Y), but
         nothing that drives or sails had a patrol of any kind: measured under
         jsc, a tank handed {type:"patrol"} stood still for ten seconds,
         because no branch here read it. This is Tiberian Sun's: from where
         the unit stood when the order began to the point it was given, and
         back, until it is told otherwise. It engages as an attack-move does -
         acquire(), then an automatic attack whose `resume` carries this very
         order, so the beat picks up where it broke off - but only what is on
         its beat and in its side's sight (patrolFights, top of this file),
         and a unit on HOLD walks the beat without opening fire, which is
         what hold means everywhere else. acquire() names one target; when
         that one is off the beat the unit walks on and asks again. */
      const g = this.game, T = CFG.TILE;
      if (o.x0 === undefined) { o.x0 = this.x; o.y0 = this.y; }
      const lx = o.back ? o.x0 : o.x, ly = o.back ? o.y0 : o.y;
      if (this.stance !== "hold") {
        const foe = this.acquire();
        if (foe && patrolFights(this, o, foe)) {
          this._mvCk = undefined;        // the fight is not a stall on the leg
          this.order = { type: "attack", target: foe, resume: { x: lx, y: ly, patrol: o }, auto: true };
          return;
        }
      }
      /* A leg ends a tile short of its mark - a beat is a line to walk, not
         a tile to stand on, and the tile may hold a friend - and it ends
         where the unit got to when it can get no further: the route refused,
         or ten seconds without closing. Two turns inside a second without
         moving is a beat with nowhere to go, and turning every tick would
         plan a route every tick, so that becomes a guard post instead. */
      const stuck = this.stalledOnMove(lx, ly, dt);
      if (this.stepAlong(lx, ly, dt, T) || stuck) {
        if (o.turnT !== undefined && g.time - o.turnT < 1 &&
            U.dist(this.x, this.y, o.turnX, o.turnY) < T * 0.5) {
          this.guardX = this.x; this.guardY = this.y;
          this.order = { type: "guard" };
          if (this.owner === g.human)
            g.alert("PATROL HAS NOWHERE TO GO \u2014 GUARDING HERE", "bad", true);
          return;
        }
        o.turnT = g.time; o.turnX = this.x; o.turnY = this.y;
        o.back = !o.back;
        this.path = null;
      }
    } else if (o.type === "attack") {
      const t = o.target;
      /* An engagement the unit chose for itself is dropped as soon as the target
         stops being something anyone may open up on unprompted. Only orders
         carrying the auto flag are tested: one the player gave by hand is left
         exactly as given. */
      if (!t || t.dead || (o.auto && !autoTargetable(t))) {
        if (o.resume) this.order = o.resume.patrol || { type: "attackmove", x: o.resume.x, y: o.resume.y };
        else if (!this.nextOrder()) this.order = { type: "idle" };
        return;
      }
      /* a patrol lets go of what has left its beat or its side's sight, and
         takes the beat up again (patrolFights, top of this file) */
      const beat = o.auto && o.resume && o.resume.patrol;
      if (beat && !patrolFights(this, beat, t)) { this.order = beat; this.path = null; return; }
      /* ---- prosecuting a submarine ----
         A sub outside sonar reach cannot be targeted, so pickWeapon returned
         nothing and the platform simply stopped: an MH-60R ordered onto a
         contact fourteen tiles away closed to ten, went to hover and sat
         there, never reaching the six and a half tiles its torpedo needs. A
         destroyer did the same and went idle. That is not how anyone hunts a
         submarine. Losing the contact is the normal condition of the job -
         you run down the last known position and search.

         So a platform with a sonar keeps going: it closes on where the boat
         was until either its own sonar picks the contact back up or it is
         sitting on top of the datum. Anything without a sonar has no business
         chasing a submarine and gives up as before. */
      if (t.layer === "sub" && this.def.sonar &&
          !this.game.canSeeSub(this.owner, t)) {
        const reach = Math.max(1.5, this.def.sonar * 0.55) * CFG.TILE;
        if (U.dist(this.x, this.y, t.x, t.y) > reach) {
          this.stepAlong(t.x, t.y, dt);
          return;
        }
      }
      this.engage(t, dt);
    } else if (o.type === "bombard") {
      this.bombard(o, dt);
    } else if (o.type === "enter") {
      this.updateEnter(dt);
    } else if (o.type === "idle" || o.type === "guard") {
      /* counter-battery gunners answer plotted enemy artillery on their own */
      /* Counter-battery is a standing authority to shell a plot nobody has
         looked at - it calls no acquire() at all - which is exactly what a held
         round may not have. It matters for the AI as much as the player:
         ai.js puts every isIndirect unit into this stance the moment it owns a
         radar. A gun that ALSO carries an ordinary arc round still answers
         plots with that round, because isIndirect(true) still finds it. */
      if (this.stance === "counterbattery" && this.isIndirect(true)) {
        const plot = this.pickCounterBatteryPlot();
        if (plot) {
          this.order = { type: "bombard", x: plot.px, y: plot.py, until: this.game.time + 9 };
          return;
        }
      }
      if (this.stance !== "hold") {
        const foe = this.acquire();
        if (foe) this.order = { type: "attack", target: foe, auto: true };
      }
      /* drift back to guard post if shoved too far */
      if (o.type === "guard" && U.dist(this.x, this.y, this.guardX, this.guardY) > CFG.TILE * 3)
        this.stepAlong(this.guardX, this.guardY, dt);
    }
    /* at rest - parked, on guard, or shooting from where it stands - it
       eases off anything it has been left overlapping. settle() says why. */
    if (!this.moving) {
      const t = this.order.type;
      if (t === "idle" || t === "guard" || t === "attack") this.settle(dt);
    }
  }

  /* fight: close to range of best weapon, face, fire */
  engage(t, dt) {
    const wi = this.pickWeapon(t);
    if (wi < 0) {                                  // nothing can hurt it — walk away or idle
      /* ...except a patrol's own fight, which goes back to the beat. The
         first cut of the patrol lost the beat here for good: a Stinger team
         whose helicopter set down, and so became a target it has nothing
         for, went idle and never walked the beat again. */
      const beat = this.order.auto && this.order.resume && this.order.resume.patrol;
      this.order = beat || { type: "idle" };
      if (beat) this.path = null;
      return;
    }
    const w = WEAPONS[this.def.weapons[wi]];
    const range = this.weaponRange(w);
    const minR = (w.minRange || 0) * CFG.TILE;
    const dist = U.dist(this.x, this.y, t.x, t.y);
    /* giving ground while the round reloads (kiteStep, below) */
    if (this.kiteS !== null && this.kiteStep(t, dist, dt, range, minR)) return;

    if (dist > range) {
      /* ---- A SET-UP LAUNCHER DOES NOT PACK UP TO RUN AFTER AN AEROPLANE ----
         Measured under jsc at b4a9943 - two launchers twelve seconds on
         their site, four strike aircraft of the period making three passes
         through the envelope, sixty seconds: an S-300PM fired none, an
         S-300PS three (the first 36 s in), a Krug two. An engagement the
         launcher chose for itself kept the aircraft as its target once it had
         flown out of reach, so the line below packed the launcher up and
         drove it after an aeroplane three times its speed - the S-75 was 6.4
         tiles off its site by t=25 - and it met the next pass packed up.
         So an AUTOMATIC engagement of a fixed-wing aircraft by a launcher that
         sets up is dropped here, still set up, and acquire() takes the next
         thing that comes into reach; acqGate() already refuses an aeroplane
         outside this hull's air reach, so the one that just left is not taken
         back. Kept that narrow on purpose:
           - a helicopter is exempt: one hovering just outside reach and
             shooting is worth the few tenths of a tile it takes to reach it;
           - a hull that does not set up (gun SPAAG, missile SHORAD, a
             MANPADS team) is exempt: stepping after a target costs it no
             set-up, so it keeps the old behaviour in full, including answering
             a gunship that shot it from just out of reach (retaliate());
           - an order given by hand still pursues. The AI's home-defence
             order is `auto` - ai.js calls it "a reflex and not a release" -
             so its set-up launchers get exactly the player's launchers' rule. */
      /* A coastal anti-ship launcher is held to the same rule for a ship: it
         was sited on its shore for the water it covers, and does not pack up
         to drive inland after a hull that has sailed out of its reach. */
      if (this.def.deploy && this.order.auto && this.layer === "ground" &&
          (this.def.role === "coastssm" ||
           (t.def && !t.def.hover && t.targetLayer && t.targetLayer() === "air"))) {
        const ro = this.order.resume;
        if (ro) this.order = ro.patrol || { type: "attackmove", x: ro.x, y: ro.y };
        else if (!this.nextOrder()) this.order = { type: "idle" };
        return;
      }
      if (this.def.deploy && this.deployed) { this.deployed = false; }
      this.stepAlong(t.x, t.y, dt, range * 0.86);
      return;
    }
    if (minR && dist < minR) {                     // inside minimum range: back off
      const ang = Math.atan2(this.y - t.y, this.x - t.x);
      this.stepAlong(this.x + Math.cos(ang) * CFG.TILE * 2.5, this.y + Math.sin(ang) * CFG.TILE * 2.5, dt);
      return;
    }
    /* mortars must set up before firing */
    if (this.def.deploy && !this.deployed) {
      this.deployT = (this.deployT || 0) + dt;
      /* Each vehicle's own setup time. Thirty-three of them declare deploySec -
         three seconds for a HIMARS, nine for a Patriot battery levelling its
         jacks - and both gates waited a flat 1.6, so the heaviest launcher in
         the game came into action as fast as the lightest. */
      if (this.deployT > (this.def.deploySec || 1.6)) { this.deployed = true; this.deployT = 0; }
      return;
    }

    const want = Math.atan2(t.y - this.y, t.x - this.x);
    if (this.def.turret) {
      this.tang = U.turnToward(this.tang, want, (this.def.tturn || 1.5) * dt);
      if (Math.abs(U.angDiff(this.tang, want)) > 0.12) return;
    } else {
      /* A launcher whose pack lies over its tail turns its tail to the target
         (def.fireAft): the Rubezh's two containers point aft on the march and
         train 110 degrees either side of the stern, never over the cab
         (ru.wikipedia), so its crews put the stern to the sea. */
      const face = this.def.fireAft ? want + Math.PI : want;
      this.ang = U.turnToward(this.ang, face, this.def.turn * dt);
      if (Math.abs(U.angDiff(this.ang, face)) > 0.1) return;
    }
    const cd0 = this.cooldowns[wi];
    this.tryFire(wi, t);
    /* the round is away: is this a fight to give ground in? (kiteDecide) */
    if (cd0 <= 0 && this.cooldowns[wi] > 0 && this.stance === "guard" && this.order.auto)
      this.kiteDecide(t, wi, w, range, dist);
    /* A warship is not a tank with one gun. The 127mm mount, the anti-ship
       missiles, the area SAM and the close-in system are separate installations
       with separate crews and separate magazines, and they engage at the same
       time. Picking a single "best" weapon meant a destroyer scored its gun
       highest at medium range and never launched the missiles it was built
       around. Anything with more than one mount now fires everything that is
       ready, in range, and able to engage this target. */
    if (this.def.weapons.length > 1 && this.cat === "naval") this.fireOtherMounts(wi, t);
    /* ...and a warship under the other ship's guns does not hold at
       missile range with its own gun silent: answerTheGun() below */
    if (this.cat === "naval") this.answerTheGun(w, t, dist, dt);
  }

  /* ---- KITE: FIRE, THEN GIVE GROUND ----
     A ground hull that outreaches what it is fighting stood still while that
     thing drove into its own reach, and then traded shots with it on equal
     terms - the band between the two reaches, the one stretch of ground where
     the fight is all ours, was crossed at the enemy's road speed and thrown
     away. Nothing stepped back on the ground: a helicopter holds off at 0.8
     of its reach, a missile ship at its missile's (answerTheGun), a bomber
     flies the stand-off, and engage() only ever backed out of a weapon's
     arming distance. This is the same idea for the crews on the ground: put
     the round away, give ground while the gun reloads, come back on aim as it
     loads, so the enemy spends longer in the open taking fire it cannot
     return before it can answer.

     WHO. A ground hull on stance guard, in an engagement it chose for itself
     (order.auto: what it picked up on guard, on an attack-move or a patrol,
     or answers when shot), firing a round that is aimed rather than lobbed,
     with a round left. Never on hold; never on a move, which never reaches
     engage(); never a platform that sets up (def.deploy) or artillery, which
     backs out of its arming distance instead. NOT on an attack the commander
     gave by name - the player's right-click on that hull, or the AI's: that
     order says "go and kill that one" (it carries `release`), and a hull
     that backs away from the very thing it was sent at reads as refusing the
     order. Aircraft and ships never come here; they have their stand-offs.
     AGAINST WHAT. A unit on the ground that our side can see - never a
     structure, which does not come on - that (a) can hurt us at all, by
     Unit.reachAt(): its PUBLISHED reach with the 1.15 margin, with a weapon
     that does half damage or more to our armour, so a rifle squad is no
     reason for a tank destroyer to move; (b) we outreach by three quarters
     of a tile at least, measured from 0.92 of our reach or 0.98 of our own
     sight, whichever is shorter - we never give so much ground that it ends
     up out of our reach, nor past our own eyes, where a round is laid blind
     (CFG.BLIND_FIRE_ACC 0.52);
     (c) is no faster than we are, ours as we stand (fuel, strain, the ground
     under us) against its card speed on its ground; (d) is coming: moving,
     heading within 60 degrees of us. On the cards, nato against pact in all
     six periods, 15 pairings pass all four, and only two of them are in the
     1980s and four today: ATGM teams against MG teams, and an ATGM carrier
     or a gun SPAAG against what is slower.
     WHEN. Decided once per round, as it leaves the barrel (engage), and only
     if the step costs no shot: the burst out, the hull turned away, the
     drive and the time to come back on aim (a turret tracks through the
     step; a hull gun or a squad must turn round, pi over its turn rate) all
     fit inside the reload, with half a second of driving at least. And the
     enemy, closing at its card speed, must stay outside its reach until our
     front is back towards it: a hull that turns away from something that can
     already shoot it shows it the plates CFG.ASPECT_MUL scores at 1.55 and
     2.10, and a turreted one swings its front back round as soon as each
     step ends. That rule is why a tank destroyer never gives ground to a
     tank: an M1 closes 2.2 tiles in the 1.4 s a Khrizantema takes to turn.
     WHERE. Straight away from it, or 34 or 63 degrees off that line
     (KITE_DEV), whichever opens the gap most; no further than the reload can
     drive, than keeps the enemy inside our reach when we are loaded, or than
     the ground runs unbroken - it stops half a tile short of the first
     water, rock, structure or map edge on the line (standable). It may not
     end deeper inside the reach of anything else of theirs our side can see
     (one grid query per step, never per tick; G.sideSees, so the commander
     reads its fog as the player reads theirs). And it is tied to ground:
     FIVE tiles from the unit's guard post when it stands within five tiles
     of it, else from where it gave its first step; the tie holds ten
     seconds past the last step and a new order drops it, so a run of
     engagements, or an enemy that keeps coming, cannot walk a unit back
     across the map - four Javelin teams sent in one after another moved a
     tank destroyer 4.7 tiles in all (tools/jsc/kite_check.js). Three, the
     guard order's own drift-back radius, was measured first and is too
     short to pay for a hull's two turns: over the same 40 paired fights a
     Khrizantema against a Javelin team won 18 with it against 19 standing
     still; with five it won 21 (exchange +0.09 against -0.06) as first
     built, and wins 20 (+0.06) since kiteStep() stopped turning the hull at
     twice its rate on the way back into reach. Once the ground is spent it
     stands and fights, front on; once the fight is over it walks back to
     where it stood when it gave the first step.
     THE RHYTHM is shot - step - shot, and nothing flips it from tick to
     tick: a step begins only with a round fired, and ends when the reload is
     down to the time it takes to come back on aim, at its end point, when
     the enemy is not closing as fast as we give ground, or early when the
     enemy reaches its own reach anyway, has stopped coming for 0.4 s (a hull
     between waypoints stands still for a tick), or the hull is wedged, dry
     or taken off guard. Measured over 40 paired fights each (kite_check
     "-- ab"): a Kornet team against an MG team wins 4 against 2, a 1990s
     Javelin team against a PK team 11 against 2, the Khrizantema as above.
     The same for every side: crew behaviour, like the target preference
     (TGT_PRIO) and the stand-offs, not a difficulty setting. P.aiOff "kite"
     switches it off for one player, for the A/B scorecard (tools/jsc). */
  kiteDecide(t, wi, w, range, dist) {
    const d = this.def, P = this.owner, g = this.game, T = CFG.TILE;
    if (this.layer !== "ground" || d.deploy || this.garrisonIn || this.order.release ||
        w.proj === "arc" || w.indirect || (this.roundsMax && this.rounds <= 0) ||
        (P.aiOff && P.aiOff.has("kite"))) return;
    if (t.kind !== "unit" || t.layer !== "ground" || t.garrisonIn || !(t.def.speed > 0)) return;
    /* and only on what our side can see: inside our own eyes, the way
       acquire() takes a contact (acqGate), or past them in our side's
       picture (G.sideSees). A round also goes out at a contact past our eyes
       that nobody of ours holds, laid blind (Combat.fire), and where that one
       is heading is nothing this crew knows. Found in review (kite_check
       [7]): with the fog on and a tank destroyer alone, its first round at a
       Javelin team 10.3 tiles off - past its ten tiles of sight - went out
       blind, and a step was taken on that team's true heading in each of 8
       fights; now in none, and with a squad of ours watching the team it
       steps in all 8. */
    const eyes = this.sightOn(t) * T;              // as on a clear day if our radar holds it
    if (dist > eyes && g.sideSees && !g.sideSees(P, t, this)) return;
    const re = Unit.reachAt(t, this.targetLayer(), this.armorClass());
    const stopR = Math.min(range * 0.92, eyes * 0.98);
    if (!re || stopR < re + T * 0.75) return;
    const map = g.map;
    const vMe = d.speed * this.speedMul() * GameMap.speedAt(map, this.tx, this.ty, this.layer) * T;
    const vThem = t.def.speed * GameMap.speedAt(map, t.tx, t.ty, t.layer) * T;
    if (!(vMe > 0) || vMe < vThem) return;
    const away = Math.atan2(this.y - t.y, this.x - t.x);
    if (!t.moving || Math.cos(U.angDiff(t.ang, away)) <= 0.5) return;
    /* the clock: the burst out, the hull turned away, the drive, and back on
       aim when it loads; `face` is the turn that puts the front back */
    const cd = this.cooldowns[wi], turn = Math.max(0.3, d.turn || 1), face = Math.PI / turn;
    const burstT = (w.burst || 1) > 1 ? (w.burst - 1) * (w.burstDelay || 0.1) : 0;
    const tAway = Math.abs(U.angDiff(this.ang, away)) / turn;
    const lead = d.turret ? 0.25 : face + 0.15;
    const run = cd - burstT - tAway - lead;
    if (run < 0.5 || dist - vThem * (burstT + tAway) <= re) return;
    /* the ground it is tied to */
    const now = g.time, LEASH = T * 5;
    let ax = this.kiteX, ay = this.kiteY;
    if (!(now - this.kiteT < 10)) {
      const post = U.dist(this.x, this.y, this.guardX, this.guardY) <= LEASH;
      ax = post ? this.guardX : this.x; ay = post ? this.guardY : this.y;
    }
    const px = this.x - ax, py = this.y - ay, pp = px * px + py * py - LEASH * LEASH;
    const Lrun = vMe * run, Lcap = stopR - dist + vThem * cd;
    let foes = null, gx = 0, gy = 0, best = 0;
    for (let i = 0; i < KITE_DEV.length; i++) {
      const dev = KITE_DEV[i], c = Math.cos(dev), a = away + dev;
      const ux = Math.cos(a), uy = Math.sin(a);
      /* no further than the far side of the leash circle along this line */
      const b = px * ux + py * uy, disc = b * b - pp;
      if (disc < 0) continue;
      let L = Math.min(Lrun, Lcap / c, Math.sqrt(disc) - b);
      /* and only as far as the ground runs unbroken: stop half a tile short
         of the first water, rock, structure or edge on the line */
      let s = T * 0.5;
      while (s < L && this.standable(this.x + ux * s, this.y + uy * s)) s += T * 0.5;
      if (s < L) L = s - T * 0.5;
      else if (!this.standable(this.x + ux * L, this.y + uy * L)) L -= T * 0.5;
      if (L < T * 0.5 || L * c <= best) continue;
      /* still outside its reach once we have driven it and turned back */
      if (dist + L * c - vThem * (burstT + tAway + L / vMe + face) <= re + T * 0.25) continue;
      const ex = this.x + ux * L, ey = this.y + uy * L;
      if (foes === null) foes = this.kiteFoes(t);
      let into = false;
      for (let j = 0; j < foes.length && !into; j += 3) {
        const dg = U.dist2(ex, ey, foes[j], foes[j + 1]);
        into = dg <= foes[j + 2] && dg < U.dist2(this.x, this.y, foes[j], foes[j + 1]);
      }
      if (into) continue;
      best = L * c; gx = ex; gy = ey;                   // the line that opens the gap most
    }
    if (!best) return;                                  // nowhere to go: it stands
    /* and the ground is taken back when the fight is over: the attack branch
       of updateGeneric() walks an order's `resume` as an attack-move, so the
       crew goes back to where it stood when it gave the first step and is
       idle there. Without it the ground was given for good - a tank
       destroyer that beat a Javelin team stood 4.5 tiles behind its post 30 s
       after the kill, idle, with a guard order handed or without one (the
       guard order's drift-back never runs again: the fight it picks up
       replaces it, and ends idle). Now it is 0.4 tiles off (kite_check [3]).
       An attack-move or a patrol carries its own leg already. */
    if (!this.order.resume) this.order.resume = { x: this.x, y: this.y };
    if (!(now - this.kiteT < 10)) { this.kiteX = ax; this.kiteY = ay; }
    this.kiteT = now;
    const k = (this.kiteS !== null && this.kiteS.t === t) ? this.kiteS
      : (this.kiteS = { t: t, step: false, wi: 0, gx: 0, gy: 0, re: 0, stopR: 0, vt: 0,
                        lead: 0, go: 0, ck: 0, cx: 0, cy: 0, nc: 0, eyes: 0 });
    k.step = true; k.wi = wi; k.gx = gx; k.gy = gy; k.re = re; k.stopR = stopR; k.vt = vThem; k.lead = lead;
    k.eyes = eyes;
    k.go = now + burstT; k.ck = k.go + tAway + 0.3; k.cx = this.x; k.cy = this.y; k.nc = 0;
    this.path = null; this.repathT = 0;
    /* counted per owner for the scorecard and a census; nothing decides on it */
    P.kiteN = (P.kiteN || 0) + 1;
  }
  /* What else of theirs our side can see near here, flat as [x, y, reach^2],
     for whatever carries a weapon that matters against us (Unit.reachAt). */
  kiteFoes(t) {
    const g = this.game, own = this.owner, me = this.targetLayer(), arm = this.armorClass();
    const out = [];
    g.grid.query(this.x, this.y, CFG.TILE * 14, (e) => {
      if (e === t || e === this || e.dead || !e.def || !e.def.weapons || !e.def.weapons.length) return;
      const o = e.owner;
      if (!o || o === own || o.isNeutral || g.allied(own, o)) return;
      if (e.kind === "building" && e.buildProgress < 1) return;
      const r = Unit.reachAt(e, me, arm);
      if (!r || (g.sideSees && !g.sideSees(own, e, this))) return;
      out.push(e.x, e.y, r * r);
    });
    return out;
  }
  /* One tick of a step under way; true when it moved, and engage() then has
     nothing more to do this tick. Between steps a turreted hull brings its
     front plate back round to the enemy while the turret works - but only
     while it stands to fight: a target out of reach (or inside the arming
     distance) is engage()'s to drive after (or back off from), stepAlong()
     steers the hull for that, and turning it here as well turned it at
     twice its rate or, where the way bends off the bearing, undid that turn
     tick for tick. Found in review: a tank destroyer with a finished step on
     record, its target gone round the end of a stretch of water, froze its
     hull on one heading (0 rad turned in 40 s), drove 5.5 tiles into the
     bank and never came back into reach; without the record it drove 14.7
     and did. */
  kiteStep(t, dist, dt, range, minR) {
    const k = this.kiteS;
    if (k.t !== t) { this.kiteS = null; return false; }
    const want = Math.atan2(t.y - this.y, t.x - this.x);
    if (!k.step) {
      if (this.def.turret && this.cat === "vehicle" && dist <= range && dist >= minR)
        this.ang = U.turnToward(this.ang, want, (this.def.turn || 1) * dt);
      return false;
    }
    const now = this.game.time, g = this.game;
    if (now < k.go) return false;                 // the burst is still going out: stand for it
    const cd = this.cooldowns[k.wi];
    /* done: back on aim as it loads, or it is not closing as fast as we
       give ground - more would leave it outside our reach when we are
       loaded, even coming on at its card speed. The three tests that read
       the enemy are asked only while our side can see it: opening the gap
       takes it past our own eyes (stopR is 0.98 of them when loaded, more
       during the step), and with the fog on a tank destroyer stepping back
       from a Javelin team had it past its eyes and out of its side's picture
       for 5.3 s of 15.1 s of stepping over ten fights. Out of the picture the
       crew keeps to the step it planned - its clock, its ground - and reads
       nothing of the enemy's. */
    const seen = dist <= k.eyes || !g.sideSees || g.sideSees(this.owner, t, this);
    let end = cd <= k.lead || this.stance !== "guard" || this.speedMul() <= 0 ||
              (seen && (dist - k.vt * cd >= k.stopR || dist <= k.re));
    if (!end) {
      if (seen) k.nc = (t.moving && Math.cos(U.angDiff(t.ang, want + Math.PI)) > 0.5) ? 0 : k.nc + dt;
      if (k.nc > 0.4) end = true;
      else if (now >= k.ck) {
        if (U.dist2(this.x, this.y, k.cx, k.cy) < 9) end = true;        // wedged
        k.ck = now + 0.5; k.cx = this.x; k.cy = this.y;
      }
    }
    if (!end) {
      if (this.def.turret) this.tang = U.turnToward(this.tang, want, (this.def.tturn || 1.5) * dt);
      if (!this.stepAlong(k.gx, k.gy, dt)) return true;
    }
    k.step = false;
    this.path = null; this.kiteT = now;
    return this.moving;
  }

  /* A garrisoned squad fights from the windows: it keeps its own weapon but
     shoots from the building's position and at the building's sight range. */
  updateGarrison(dt) {
    const b = this.garrisonIn;
    if (!b || b.dead) { this.garrisonIn = null; this.carried = false; return; }
    /* tx/ty are getters derived from x/y - assigning to them is a TypeError in
       a class body, which is always strict mode, so this function would have
       thrown on its first tick even if it had been reachable. Setting the
       position is enough; the tile follows from it. */
    this.x = b.x; this.y = b.y;
    for (let i = 0; i < this.cooldowns.length; i++)
      if (this.cooldowns[i] > 0) this.cooldowns[i] -= dt;
    if (this.stance === "hold") return;
    const foe = this.acquire();
    if (!foe) return;
    const wi = this.pickWeapon(foe);
    if (wi < 0) return;
    const w = WEAPONS[this.def.weapons[wi]];
    if (U.dist(this.x, this.y, foe.x, foe.y) > this.weaponRange(w) * 1.15) return;
    this.tryFire(wi, foe);
  }

  /* ---- garrison ----
     Infantry occupying a structure. The squad is removed from the field and
     held by the building, which then fights with the squad's own weapon at
     the building's sight range. Clearing it means destroying the structure or
     burning the occupants out. */
  canGarrison(b) {
    /* a wreck gives cover but has no windows left to fight from */
    if (b && b.def && b.def.rubble) return false;
    /* Engineers do engineering. They carry no weapon, so a building they
       occupy contributes nothing and the engineer is wasted - garrisoning is
       a job for soldiers. */
    if (this.def.engineer) return false;
    return this.cat === "infantry" && b && !b.dead && b.def.garrison &&
           (b.garrison || []).length < b.def.garrison &&
           (b.neutral || b.owner === this.owner || this.game.allied(this.owner, b.owner));
  }
  enterGarrison(b) {
    if (!this.canGarrison(b)) return false;
    if (!b.garrison) b.garrison = [];
    b.garrison.push(this);
    this.garrisonIn = b;
    this.carried = true;
    /* a neutral building becomes the occupier's the moment it is manned */
    if (b.neutral) { this.game.reassignBuilding(b, this.owner); b.neutral = false; }
    this.order = { type: "idle" };
    return true;
  }
  leaveGarrison() {
    const b = this.garrisonIn;
    if (!b) return;
    const i = (b.garrison || []).indexOf(this);
    if (i >= 0) b.garrison.splice(i, 1);
    this.garrisonIn = null;
    this.carried = false;
    /* step out beside the building rather than inside its footprint */
    this.x = b.x + (this.game.rng() - 0.5) * b.def.w * CFG.TILE;
    this.y = b.y + (b.def.h * 0.5 + 0.8) * CFG.TILE;
    releaseCivilian(b);
  }

  /* ---- supply contact ----
     A unit is in supply if it is inside its own base radius, or close to a
     service depot or a supply truck. Out of contact it first degrades - the
     crew is rationing, the vehicle is not being serviced - and an indirect
     weapon eventually has nothing left to fire. */
  inSupply() {
    if (this.owner.inBaseRadius(this.tx, this.ty)) return true;
    const R = CFG.SUPPLY_RANGE * CFG.TILE;
    for (const b of this.owner.buildings)
      if (!b.dead && b.def.resupply && b.buildProgress >= 1 && this.nearFootprint(b, CFG.SUPPLY_RANGE))
        return true;
    for (const u of this.owner.units)
      if (!u.dead && u.def.supply && u.supplyLeft > 0 && U.dist(u.x, u.y, this.x, this.y) < R)
        return true;
    return false;
  }
  updateSupply(dt) {
    if (this.inSupply()) {
      this.unsupplied = 0;
      if (this.roundsMax && this.rounds < this.roundsMax) {
        this._resT = (this._resT || 0) + dt;
        const per = 1 / CFG.RESUPPLY_RATE;
        while (this._resT >= per && this.rounds < this.roundsMax) { this._resT -= per; this.rounds++; }
      }
    } else {
      this.unsupplied += dt;
    }
  }
  /* 0 = fully supplied, 1 = as bad as it gets */
  supplyStrain() {
    if (!this.unsupplied) return 0;
    const a = CFG.UNSUPPLIED_GRACE, b = CFG.UNSUPPLIED_MAX;
    return U.clamp((this.unsupplied - a) / Math.max(1, b - a), 0, 1);
  }
  isOutOfSupply() { return this.supplyStrain() > 0.01; }

  /* Top the deck launchers back up while alongside a friendly naval yard:
     one count of the magazine every 3.5 s, or every def.yardReload seconds
     on a hull that declares its own. Only the Ohios do - their tubes are
     loaded three times as fast as a surface ship's deck tubes, a Trident in
     3.5 / 3 s and a pair of Tomahawks in twice that (generations.js, "the
     Ohio's real load") - and every other hull keeps exactly the 3.5 it had. */
  reloadAtYard(dt) {
    const full = this.def.magazine;
    if (!full) return;
    let needs = false;
    for (const wi in this.mag) {
      const key = this.def.weapons[wi];
      if (this.mag[wi] < (full[key] || 0)) { needs = true; break; }
    }
    if (!needs) { this.reloadT = 0; return; }
    const yard = this.game.nearestBuilding(this.owner, "navalyard", this.x, this.y);
    if (!yard || !this.nearFootprint(yard, 4.5)) { this.reloadT = 0; return; }
    /* a round every few seconds, so rearming a Slava is a real trip home */
    this.reloadT = (this.reloadT || 0) + dt;
    if (this.reloadT < (this.def.yardReload || 3.5)) return;
    this.reloadT = 0;
    for (const wi in this.mag) {
      const key = this.def.weapons[wi];
      const cap = full[key] || 0;
      if (this.mag[wi] < cap) {
        this.mag[wi]++;
        if (this.mag[wi] === cap && this.owner === this.game.human)
          this.game.alert(this.def.name.toUpperCase() + " — TUBES RELOADED", "good");
        return;
      }
    }
  }

  /* ---- ANSWER THE GUN ----
     engage() stands a hull off at the reach of the mount pickWeapon() chose,
     and with an anti-ship missile in reach that mount is the missile. That is
     the right place to stand while the stand-off is keeping the other ship's
     guns off - a missile ship's whole case is that it hits from where it
     cannot be hit back - and the wrong one once it is not. A hull already
     inside the enemy's gun reach, whose own gun could not reach back, held at
     missile range, launched a pair every twenty-odd seconds and was shelled
     to death with its gun silent. The Soviet anti-ship rows were cannon
     shells until eras.js made them missiles, so every Pact hull's "missile"
     had been its gun and this never showed.
     MEASURED at 83a2127 under jsc, one against one on an empty sea, each hull
     on its own army's modifiers, 13 tiles apart, three runs each: a 2000s
     Slava against an Arleigh Burke Flight IIA - which carries no anti-ship
     missile at all - held at 12.3 tiles, put twelve to fourteen P-1000s
     away, never fired its AK-130 and lost all three to 76-84 rounds of
     5-inch; a Kynda lost all three to the Long Beach from 11.8-11.9 tiles;
     ordered onto a Spruance, a 1980s Sovremenny held at 11.3 and lost all
     three. With this the Slava closes to 9.6-9.7 tiles and wins all three
     on its AK-130, the Kynda all three at 6.2 on its AK-726, the Sovremenny
     all three at 9.1-9.2.
     So a warship fighting a surface ship from INSIDE that ship's gun reach
     closes to its own gun's, firing as it goes, WHEN ITS GUNS WIN THE
     EXCHANGE THERE; the missile still leaves from fireOtherMounts() as it
     comes off its reload, and once the gun is in reach pickWeapon() hands it
     the fight on its own. Outside her gun reach nothing changes - the
     stand-off is doing its job, and two missile ships still trade at missile
     range - and a hull on HOLD stays where it was put. It is a ship's reflex,
     read off what its side can see and the published rows, for every navy
     and both commanders alike.
     THE EXCHANGE is time to sink: her hit points over what our guns put into
     her a second from where we would stand, against ours over what every
     gun of theirs that reaches that point - or whose hull could see it -
     puts into us; figures as pickWeapon() scores a mount (damage, burst,
     accuracy and reload against the armour met). The first cut had none of
     this - it closed whenever its gun did a quarter of hers - and in review
     it sailed a Sovremenny in to 9.2 tiles of an Iowa, whose 16-inch had
     never reached it at 12.3, and lost all three in 43-57 s where HEAD drew
     two; it took a 1990s Sovremenny out of its line into a Ticonderoga, a
     Burke and a Perry and lost the whole squadron all three times, where
     HEAD drew; and it ran an Osa, a Molniya, a Buyan-M and a Huangfeng in
     to 4.6-8.6 tiles of destroyers their guns could not beat. Over 24
     pairings and 8 squadron actions, three runs each, on guard and under
     attack orders, the missile ship's duels (won-lost-drawn) go from
     1-27-44 on guard and 13-42-17 ordered at HEAD to 10-20-42 and 24-33-15 -
     the Slava, the Kynda and both Sovremennys against American escorts;
     against an Iowa and in every missile boat nothing changes - and every
     squadron action ends ship for ship as at HEAD (sunk by the missile side
     0 and 3, lost 20 and 36). Counting our own squadron's guns as well was
     tried on paper and left out: the 1990s three against three then weighs
     27.6 s against 27.5, a coin the first cut lost three times in three.
     NEVER as a carrier - her weapon is her air wing, and the first cut sailed
     a Kiev in to 6.9 tiles of a Spruance to fight it with two 76 mm mounts -
     and never as a boat under the water, which has no gun to bring to bear. */
  answerTheGun(w, t, dist, dt) {
    if (!w || w.proj !== "missile" || this.stance === "hold") return;
    if (this.def.carrier || this.layer !== "sea") return;
    if (!t || t.cat !== "naval" || !t.def || t.targetLayer() !== "sea") return;
    /* asked twice a second, not every tick: it reads every hull of theirs
       this side can see, and a ship crosses a fraction of a tile in that */
    const now = this.game.time;
    let m = this.gunAns;
    if (!m || m.t !== t || now < m.at) m = this.gunAns = { t: t, at: -1, reach: 0, hp: 0, thp: 0 };
    if (now - m.at >= 0.5) {
      m.at = now;
      /* Once it has turned in, the exchange is judged on the hit points it
         turned in with: the salvo that lands on the way in is part of the
         price it already weighed. Re-weighed on what is left, the first cut
         of this turned back 11.4 tiles out after one Harpoon hit - inside
         the Burke's 5-inch and outside its own AK-130, the worst place of
         all - and sank in 69 s where HEAD took 225. A new gun coming into
         the reckoning still turns it back. */
      m.reach = this.gunAnswer(t, dist, m.reach ? m.hp : this.hp, m.reach ? m.thp : t.hp);
      if (!m.reach) m.hp = m.thp = 0;
      else if (!m.hp) { m.hp = this.hp; m.thp = t.hp; }
    }
    if (!m.reach || dist <= m.reach) return;
    this.stepAlong(t.x, t.y, dt, m.reach * 0.86);
  }
  /* The reach of the gun to close to, or 0 to stay where it is. hp and thp
     are our hull's and hers, as the exchange is judged on them. */
  gunAnswer(t, dist, hp, thp) {
    const g = this.game, T = CFG.TILE, me = this.targetLayer();
    const mine0 = this.armorClass(), theirs0 = t.armorClass();
    const gun = (w) => !!w && (w.proj === "shell" || w.proj === "bullet") && w.dmg > 0;
    const dps = (w, arm) => w.dmg * (w.burst || 1) * (w.acc !== undefined ? w.acc : 0.8) *
                            CFG.dmgMult(w.warhead, arm) / Math.max(0.4, w.reload || 1);
    /* 1. inside her gun reach: the PUBLISHED range with gunFirst()'s 1.15,
          never her weaponRange() - another army's multipliers and optics
          are not ours to know */
    let reach = 0;
    for (const k of (t.def.weapons || [])) {
      const w = WEAPONS[k];
      if (gun(w) && !(w.tgt && !w.tgt[me])) reach = Math.max(reach, (w.range || 0) * T * 1.15);
    }
    if (!reach || dist > reach) return 0;
    /* 2. a gun of ours that cannot reach her from here, and what our guns
          put into her from where it would stand */
    let mine = 0;
    const ours = [];
    for (const k of this.def.weapons) {
      const w = WEAPONS[k];
      if (!gun(w) || (w.tgt && !w.tgt.sea) || this.holdsFire(w)) continue;
      const r = this.weaponRange(w);
      ours.push({ w: w, r: r });
      if (r > mine) mine = r;
    }
    if (!mine || dist <= mine) return 0;
    const stand = mine * 0.86;
    let out = 0;
    for (const o of ours) if (o.r >= stand) out += dps(o.w, theirs0);
    if (!(out > 0)) return 0;
    /* 3. and what comes back there: every gun that reaches that point or
          could, on her and on every hull, battery and gun of theirs this
          side knows of (G.sideSees). A hull at sea that could SEE the point
          counts as if in reach - on guard it takes what it sees, and it
          would be there before the fight was - so a single hull is fought
          and a squadron is not. */
    const sx = t.x + (this.x - t.x) * stand / dist, sy = t.y + (this.y - t.y) * stand / dist;
    let inn = 0;
    for (const p of g.players) {
      if (p === this.owner || p.isNeutral || (g.allied && g.allied(this.owner, p))) continue;
      for (const list of [p.units, p.buildings]) for (const e of list) {
        if (e.dead || e.carried || !e.def || !e.def.weapons) continue;
        if (e.kind === "building" && e.buildProgress < 1) continue;
        if (e !== t && g.sideSees && !g.sideSees(this.owner, e)) continue;
        const d = U.dist(sx, sy, e.x, e.y);
        const join = e.layer === "sea" ? (e.def.sight || 0) * T : 0;
        for (const k of e.def.weapons) {
          const w = WEAPONS[k];
          if (gun(w) && !(w.tgt && !w.tgt[me]) && d <= (w.range || 0) * T * 1.15 + join) inn += dps(w, mine0);
        }
      }
    }
    /* 4. close only to win: her hull gone to our guns before ours to theirs */
    return thp / out < hp / Math.max(inn, 1e-6) ? mine : 0;
  }

  /* fire every mount other than the primary that can engage this target */
  fireOtherMounts(primary, t) {
    const tl = t.targetLayer();
    /* the gun that was chosen for a man in the open is not joined by the
       ship's anti-ship missiles: measured on HEAD, an Arleigh Burke put
       five Harpoon pairs into three rifle squads in 60 s beside its gun */
    const tArmor = t.armorClass(), spare = this.gunFirst(t, false, tArmor);
    for (let i = 0; i < this.def.weapons.length; i++) {
      if (i === primary) continue;
      const w = WEAPONS[this.def.weapons[i]];
      if (!w) continue;
      /* A secondary mount is fired with nobody choosing it - that is what this
         function is - so a held round needs the same release the primary
         needed. Without this a hull given an ordinary attack order would fire
         every held round it carried as a free extra alongside its gun. Under a
         RELEASED order holdsFire is false and it does fire, which is correct:
         the player named the target. */
      if (this.holdsFire(w)) continue;
      if ((spare && Unit.precious(w)) || (w.softOnly && tArmor !== "infantry")) continue;
      /* A land-attack round goes only when it LEADS (pickWeapon): never as a
         free extra beside a gun that already reaches, where it would spend a
         magazine that cannot be refilled at sea on work the gun is doing. */
      if (w.landAttack) continue;
      if (w.tgt) {
        if (tl === "air" && !w.tgt.air) continue;
        if (tl === "sub" && !w.tgt.sub) continue;
        if (tl === "sea" && !w.tgt.sea) continue;
        if (tl === "ground" && !w.tgt.ground) continue;
      }
      if (tl === "sub" && !this.game.canSeeSub(this.owner, t)) continue;
      const d = U.dist(this.x, this.y, t.x, t.y);
      if (d > this.weaponRange(w)) continue;
      if (w.minRange && d < w.minRange * CFG.TILE) continue;
      this.tryFire(i, t);
    }
  }

  /* ---- A GUN FOR A MAN IN THE OPEN, A MISSILE FOR A MACHINE ----
     (owner) "navy, helicopter, tank, a10 should have gun shot if the enemy is
     infantry only."
     pickWeapon() below scores expected damage a second and nothing else, and
     pays a missile 1.35 for opening from past 55% of its reach. Against a
     rifle squad that hands the choice to whatever reaches furthest, so every
     hull that carries a gun AND a guided round opened on men in the open with
     the guided round and never came in to the gun. Measured on HEAD under jsc
     (tools/jsc), three rifle squads held immortal, one attack order, 60 s:
       AH-64 (helo_n)     10 Hellfires, 0 bursts of 30 mm; dry in 23 s, home
       Mi-28 (helo_p)     10 missiles, 0 bursts
       A-10 (bomber_n)     8 Mavericks, 0 GAU-8 passes; dry, home
       Su-25 (e80)         8 Kh-29, 0 gun
       Arleigh Burke      17 gun salvos AND 5 Harpoon pairs at three squads
       Project 22160      41-50 gun salvos AND 4 Oniks
       Bradley (ifv_n)     8 TOW, 0 rounds of 25 mm - it stopped at 10.0
                           tiles, where the TOW reached, and never closed
     So against a SOFT target - armour class "infantry" - a precious round (a
     missile, a bomb, an MLRS rocket) is not a candidate while a gun this hull
     may fire can do the job: in reach now, or reachable by closing for no
     more than GUN_CLOSE seconds of the route it would actually drive. Each of
     these still frees the missile, so nothing that carries only missiles, or
     cannot close, is left unarmed:
       - no gun can engage it at all: a missile boat, an ATGM carrier, a
         Gazelle HOT, a Tiger UHT;
       - the target can hurt us from where the gun would have to stand: a
         Stinger team's 9.9 tiles against a chain gun that hovers at 4.0, a
         Javelin team's 7.2 against a 25 mm that stops at 5.9. That target
         warrants the standoff. A rifle squad against a Bradley does not -
         a 5.56 at 0.32 against light armour is not a threat, so only a
         weapon that does at least half damage to our armour class counts.
         Its PUBLISHED range with gunProfile's 1.15 margin, never
         weaponRange(): their faction multiplier and their optics upgrade
         are not things we can honestly know;
       - for an aircraft that would have to close, the squad stands under an
         air-defence ring its side can SEE - G.airThreatAt, the fog-honest
         plot the standoff logic already flies by (gunRunCovered below). A
         rifle squad with a Stinger team behind it is a Hellfire target, not
         a gun run;
       - the gun cannot get there: a structure, a garrison, a hull on hold,
         or no route at all (pathFail on the target's own tile - a destroyer
         already on the water nearest an inland squad);
       - the route is long. The first version timed the STRAIGHT LINE, and
         (review) a Bradley nine tiles from three squads with a 25-tile line
         of dragon's teeth between them drove 23.3 tiles round the end of it
         and fired its first round after 15.1 s, where HEAD fired a TOW at
         0.1 s from where it stood. gunApproach() walks the A* route the
         hull is following instead: now 0.0 tiles driven, TOW at 0.1 s;
       - it has been closing on this one target for 2 x GUN_CLOSE and the
         gun is still out of reach: traffic, a slow crossing, a squad that
         keeps backing off. The estimate was wrong, so it stops driving and
         shoots with what reaches (gunChaseSpent).
     Among the guns the scoring is exactly what it was, and against armour,
     ships, aircraft and structures this returns false and pickWeapon is the
     same function it was. holdsFire() still runs FIRST in both loops, so a
     HARM or a ballistic round needs its order exactly as before.
     An aircraft's gun still draws on its one ordnance pool (a chain-gun
     burst is 0.34 of a Hellfire), so a long strafe empties the magazine all
     the same, only later: an AH-64 on three immortal squads went dry at
     42 s, not 23 s. Keeping a missile back through a whole sortie would take
     a gun magazine of its own, and this does not pretend to.
     Read by Building through .call(), so it asks nothing a structure lacks:
     a structure has no speed, and never reaches the closing branch. */
  static precious(w) { return !!w && (w.proj === "missile" || w.proj === "bomb" || !!w.rocket); }
  /* Does this mount list hold a precious round AND a gun? Without both,
     gunFirst cannot change pickWeapon's answer, so it is not asked - a tank
     (main gun and coax), a rifle squad, a gunless missile boat: most of what
     acquire() puts through pickWeapon. Kept off the def, keyed by it, and
     re-read if the list is ever replaced. */
  static gunMix(def) {
    const ws = def.weapons || [];
    const memo = Unit.gunMixMemo || (Unit.gunMixMemo = new WeakMap());
    let m = memo.get(def);
    if (m && m.ws === ws) return m.mix;
    let p = false, g = false;
    for (let i = 0; i < ws.length; i++) {
      const w = WEAPONS[ws[i]];
      if (!w || !(w.dmg > 0)) continue;
      if (Unit.precious(w)) p = true; else g = true;
    }
    memo.set(def, m = { ws: ws, mix: p && g });
    return m.mix;
  }
  /* How far t reaches, in pixels, with a weapon that matters against a hull
     presenting `layer` and `armor`: the longest of its mounts that can engage
     that layer and does at least half damage to that armour class, at its
     PUBLISHED range with gunProfile's 1.15 margin - never its weaponRange(),
     because another army's range multiplier and its optics upgrade are not
     things we can honestly know. 0 when nothing aboard matters. One reading
     of the recognition manual for gunFirst() and kiteDecide() alike. */
  static reachAt(t, layer, armor) {
    const tw = (t && t.def && t.def.weapons) || [];
    let reach = 0;
    for (let i = 0; i < tw.length; i++) {
      const w = WEAPONS[tw[i]];
      if (!w || !(w.dmg > 0) || (w.tgt && !w.tgt[layer])) continue;
      if (CFG.dmgMult(w.warhead, armor) < 0.5) continue;
      const r = (w.range || 0) * CFG.TILE * 1.15;
      if (r > reach) reach = r;
    }
    return reach;
  }
  gunFirst(t, anyAmmo, tArmor) {
    if (!t || (tArmor || (t.armorClass && t.armorClass())) !== "infantry") return false;
    if (!Unit.gunMix(this.def)) return false;
    const GUN_CLOSE = 6;                     // seconds of closing a gun is worth
    const T = CFG.TILE, d = U.dist(this.x, this.y, t.x, t.y);
    const tl = t.targetLayer();
    /* how far this target reaches, with a weapon that matters, at the layer
       and the armour we present */
    const reach = Unit.reachAt(t, this.targetLayer(), this.armorClass());
    const pf = this.pathFail;
    const pace = (this.def.speed > 0 && !this.garrisonIn && this.stance !== "hold" &&
                  !(pf && pf.x === t.tx && pf.y === t.ty)) ? this.def.speed * T : 0;
    for (let i = 0; i < this.def.weapons.length; i++) {
      const w = WEAPONS[this.def.weapons[i]];
      if (!w || Unit.precious(w) || !(w.dmg > 0) || this.holdsFire(w)) continue;
      if (this.ammoMax && !anyAmmo && !this.canAfford(w)) continue;
      if (w.tgt && !w.tgt[tl]) continue;
      const rng = this.weaponRange(w);
      /* 0.8: where a helicopter hovers and a jet orbits to use this gun */
      if (reach >= rng * 0.8) continue;
      if (d <= rng && !(w.minRange && d < w.minRange * T)) {
        if (this.gunChase && this.gunChase.t === t) this.gunChase = null;
        return true;
      }
      if (!pace) continue;
      const budget = pace * GUN_CLOSE;
      if (this.gunApproach(t, rng * 0.86, budget) > budget) continue;
      if (this.gunChaseSpent(t, GUN_CLOSE * 2)) continue;
      return !this.gunRunCovered(t);
    }
    return false;
  }
  /* How far this hull has to travel before t is inside `stop` - the distance
     engage() stops at. Along the route it is following when that route leads
     to this target (the order's target, path ending within two tiles of it),
     else the straight line: an aircraft flies one, and a hull with no route
     yet takes one step on the straight-line answer before stepAlong() hands
     it the real route for the next call. The walk ends as soon as it passes
     `budget`, since past that the only answer wanted is "too far". */
  gunApproach(t, stop, budget) {
    const T = CFG.TILE, d = U.dist(this.x, this.y, t.x, t.y);
    if (d <= stop) return 0;
    const p = this.path, o = this.order;
    if (this.layer === "air" || !p || !p.length || !o || o.target !== t) return d - stop;
    const end = p[p.length - 1];
    if (Math.abs(end.x - t.tx) > 2 || Math.abs(end.y - t.ty) > 2) return d - stop;
    let run = 0, px = this.x, py = this.y;
    for (let i = this.pathI || 0; i < p.length; i++) {
      const nx = p[i].x * T + T / 2, ny = p[i].y * T + T / 2;
      run += U.dist(px, py, nx, ny); px = nx; py = ny;
      if (run > budget || U.dist(nx, ny, t.x, t.y) <= stop) return run;
    }
    return run + Math.max(0, U.dist(px, py, t.x, t.y) - stop);
  }
  /* The time box on the estimate above. Counts CONTINUOUS closing on the
     order's own target - a gap of half a second restarts it - and answers
     true once it has run past `limit` with the gun still out of reach.
     Only the engagement being driven is timed; acquire() asking about a
     candidate starts no clock. */
  gunChaseSpent(t, limit) {
    const o = this.order;
    if (!o || o.target !== t || !this.game) return false;
    const now = this.game.time;
    let c = this.gunChase;
    if (!c || c.t !== t || now - c.last > 0.5) c = this.gunChase = { t: t, since: now, last: now };
    c.last = now;
    return now - c.since > limit;
  }
  /* Asked only when the gun would have to CLOSE - a hull already in reach is
     where it is, and there the old scoring picks the gun anyway. The rings are
     gathered once per side per half second, not per call: G.airThreatRings is
     the walk its own comment measured at 385 us, and acquire() asks
     pickWeapon of every candidate in sight. An air-defence unit crosses a
     fraction of a tile in half a second. */
  gunRunCovered(t) {
    const g = this.game;
    if (this.layer !== "air" || !g || !g.airThreatRings || !g.airThreatAt) return false;
    const slot = Math.floor(g.time * 2);
    let memo = g.gunRingMemo;
    if (!memo || memo.slot !== slot) memo = g.gunRingMemo = { slot: slot, by: new Map() };
    let R = memo.by.get(this.owner);
    if (!R) { R = g.airThreatRings(this.owner); memo.by.set(this.owner, R); }
    return g.airThreatAt(this.owner, t.x, t.y, 0, R) > 0;
  }

  /* Choose the best weapon for this target, not merely the first that can
     engage it. A destroyer carries a gun, an area SAM, an anti-ship missile,
     a lightweight ASW torpedo and a CIWS; which one it reaches for depends
     on what it is shooting at and how far away that thing is. */
  pickWeapon(t, anyAmmo) {
    const subVisible = t.layer !== "sub" || this.game.canSeeSub(this.owner, t);
    if (!subVisible) return -1;
    /* gate on the layer the target presents and score against the armour the
       round will really meet, or every mount would score zero damage on a
       parked airframe and the choice between them would be arbitrary */
    const tl = t.targetLayer(), tArmor = t.armorClass();
    /* a man in the open is the gun's: see gunFirst() above */
    const spare = Unit.prototype.gunFirst.call(this, t, anyAmmo, tArmor);
    const dist = U.dist(this.x, this.y, t.x, t.y) / CFG.TILE;
    let best = -1, bestScore = -1;
    for (let i = 0; i < this.def.weapons.length; i++) {
      const w = WEAPONS[this.def.weapons[i]];
      /* ---- THE SKIP ----
         A held round is not a candidate unless an order released it. This is
         the statement the previous design omitted: it threaded an `auto`
         parameter through five call sites and never read it, so a Wild Weasel
         carrying a gun and a HARM still scored the HARM first - 210 damage at
         0.88 over a 6.0 reload is 30.8 expected damage a second, pickWeapon
         takes the highest - and launched at the first thing it drove past.
         Every fire path in this file reaches a weapon through this loop:
         engage(), updateGarrison(), both updateAir branches and Building
         defensive fire. One line closes all five.
         A Building reaches this through Unit.prototype.pickWeapon.call and has
         no order, so released() is a flat false and a structure never fires a
         held round. No BUILDINGS entry mounts one, so every existing
         emplacement is bit-for-bit what it was. */
      if (this.holdsFire(w)) continue;
      /* a pylon that is empty is not a choice - without this the best-scoring
         mount was picked every tick, tryFire refused it, and a cheaper mount
         that could still fire was never tried */
      if (!anyAmmo && this.ammoMax && !this.canAfford(w)) continue;
      /* ...and nor is a deck tube that is empty (rules.js FIXED_MAGAZINE).
         Without this the missile went on outscoring the gun after the last
         round had gone: tryFire refused it every tick, engage() held the
         hull at the missile's stand-off, and a gun that could not reach from
         there was never chosen. MEASURED at 5c8faba under jsc, a present-day
         Slava 12 tiles from an Arleigh Burke with both of her tubes marked
         empty: pickWeapon named the P-800 it could not fire, every tick, and
         the AK-130 never; passed over, the gun leads and engage() closes to
         its reach. That is what the Slava's own fact sheet says she becomes
         once the tubes are empty - a gun platform - until she is back
         alongside a yard. canTarget() and the commander's reachDps() ask
         this same loop, so a hull that is dry and carries nothing else now
         reads as unable to hit a ship, which it is. */
      if (!anyAmmo && this.mag && this.mag[i] !== undefined && this.mag[i] <= 0) continue;
      if (spare && Unit.precious(w)) continue;
      /* A coaxial machine gun is for men in the open and is not a candidate
         against anything else (generations.js FAULT 05c). Scored like any
         mount, the in-reach coax beat an out-of-reach main gun (x0.05), so
         (review) a PT-76 ordered onto an M48 ten tiles off stopped at the
         coax's reach and put 112 rounds of 7.62 into it for no damage at
         all, where HEAD fired seven 76 mm rounds and took 865 HP to 606. */
      if (w.softOnly && tArmor !== "infantry") continue;
      /* ---- a land-attack cruise missile ----
         It flies to the coordinates it was given, so it is for what stays
         where it was found: a structure, and nothing that moves. It gets this
         far only under a RELEASED order (holdsFire above) - a commander named
         that structure - and it is for what NOTHING ELSE ABOARD can reach.
         Beyond the gun and the Harpoon it is the only choice, so it leads and
         the hull stands off; scored like any other mount out there it lost to
         the gun on HEAD's reloads and the hull sailed in to the gun's reach
         (a Burke ordered onto a power station inland closed to 15.1 tiles, a
         Spruance to 11.3), which is the one thing the missile exists to
         spare it. Inside that reach it is not a candidate at all: a round the
         ship cannot replace at sea is not spent on work its gun is doing, so
         an Iowa shells a beach with its sixteen-inch and keeps the Tomahawks
         for what lies behind it. An empty cell is passed over. */
      if (w.landAttack) {
        if (t.kind !== "building") continue;
        if (this.mag && this.mag[i] !== undefined && this.mag[i] <= 0) continue;
        let other = 0;
        for (let j = 0; j < this.def.weapons.length; j++) {
          const wj = WEAPONS[this.def.weapons[j]];
          if (j === i || !wj || !wj.tgt || !wj.tgt.ground || wj.landAttack || this.holdsFire(wj)) continue;
          other = Math.max(other, this.weaponRange(wj) / CFG.TILE);
        }
        if (dist <= other) continue;
        return i;
      }
      if (w.tgt) {
        if (tl === "air" && !w.tgt.air) continue;
        if (tl === "sub" && !w.tgt.sub) continue;
        if (tl === "sea" && !w.tgt.sea) continue;
        if (tl === "ground" && !w.tgt.ground) continue;
      }
      const rng = this.weaponRange(w) / CFG.TILE;
      /* expected damage per second against this target's protection */
      const burst = w.burst || 1;
      const cycle = Math.max(0.4, w.reload || 1);
      const eff = CFG.dmgMult(w.warhead, tArmor);
      let score = (w.dmg || 0) * burst * (w.acc !== undefined ? w.acc : 0.8) * eff / cycle;
      if (dist > rng) {
        /* out of reach: still a candidate, but only if nothing else fits,
           and prefer the one that needs the shortest approach */
        score *= 0.05 * (rng / Math.max(rng, dist));
      } else if (w.minRange && dist < w.minRange) {
        score *= 0.02;                       // inside the arming distance
      } else if (dist > rng * 0.55 && w.proj === "missile") {
        score *= 1.35;                       // open the engagement with missiles
      } else if (dist < rng * 0.45 && w.proj !== "missile") {
        score *= 1.20;                       // close in, guns do the work
      }
      if (score > bestScore) { bestScore = score; best = i; }
    }
    return best;
  }

  /* ---- CAN IT STILL DROP ANYTHING? ----
     (owner) "the b2 has remaining 2 bombs and not strike."
     A 2000lb JDAM costs two points of magazine a pass and the magazine is
     refilled continuously on the ramp, so a sortie launched before the rearm
     finished carries a fraction - 5.6, say - and after two passes holds 1.6.
     tryFire refused that (1.6 is less than a pass), but "empty, go home" was
     `ammo <= 0.05`, so the bomber was neither able to bomb nor allowed to go
     and rearm, and orbited the target for the rest of the sortie while the
     panel rounded 1.6 up and showed two bombs. The 1990s B-2 carries 3 at 2 a
     pass and hit it on every sortie. "Dry" now means what it has to mean:
     not enough left for a single release of anything that actually uses the
     magazine. A gun costs nothing per burst and is ignored here, as it always
     was - an aeroplane whose bombs are gone goes home even if the cannon
     still works. */
  canAfford(w) { return !this.ammoMax || this.ammo >= (w.ammo || 1) - 0.01; }
  ordnanceDry() {
    if (!this.ammoMax) return false;
    let spends = false;
    for (const id of this.def.weapons) {
      const w = WEAPONS[id];
      if (!w || !(w.ammo > 0)) continue;
      spends = true;
      if (this.canAfford(w)) return false;
    }
    return spends ? true : this.ammo < 0.99;
  }

  /* `aim`, when given, is where the burst's later rounds go: aim(j) is the
     target of round j + 1 of the burst (an area mission's walk, areaVolley).
     Left out, every round of the burst goes at t, as it always has. */
  tryFire(wi, t, aim) {
    if (this.cooldowns[wi] > 0) return;
    const w = WEAPONS[this.def.weapons[wi]];
    /* ---- an anti-radiation seeker needs something to home on ----
       Refused, not wasted, while the target's set is off the air (game.js
       G.armLock): a Weasel ordered onto a dark battery holds its orbit with
       the round on the rail and fires the moment the set comes back up -
       which is the whole contest emission control sets up. A shot the
       aircraft took on its own initiative (seadTarget's self-issued order)
       is simply over, and it goes back to what it was doing. Only an emitter
       is asked: an ARM ordered onto a tank still flies as it always did.
       The AARGM, with its own terminal seeker, may be sent at a dark set.
       The player's Weasel waits for as long as the player leaves it there,
       and is told why. A commander's waits G.ARM_WAIT seconds and then takes
       its seeker's silence as the fact it is - the set is off - and goes
       back to be re-tasked, noting the set (armDark) so that it is not sent
       straight back at it unless the commander hears it again (ai.js
       pickEmitter). Without that, found in review, an AI Weasel ordered onto
       a dark dome orbited it to bingo fuel, landed, and was sent at the same
       dome again: one dark set pinned it for the whole battle. */
    const armT = w && w.antiRadiation && t && t.def && (t.def.radar || t.def.jam) && this.game.armLock;
    /* the set is on the air again: a later silence starts a new wait */
    if (armT && this.order && this.order.armWait !== undefined && this.game.armLock(t)) this.order.armWait = undefined;
    if (armT && !this.game.armLock(t) && this.game.armSeeker(w, this) !== "active") {
      const o = this.order, g = this.game;
      if (o && o.type === "attack" && o.target === t && o.auto && this.afterAttack) {
        this.order = this.afterAttack(o);
      } else if (this.owner === g.human) {
        if (this.noLockSaid !== t) {
          this.noLockSaid = t;
          g.alert(this.def.name.toUpperCase() + " — TARGET OFF THE AIR, HOLDING FOR IT", "warn");
        }
      } else if (o && o.type === "attack" && o.target === t && this.afterAttack) {
        if (o.armWait === undefined) o.armWait = g.time;
        else if (g.time - o.armWait >= (g.ARM_WAIT || 15)) {
          this.armDark = { id: t.id, t: g.time };
          /* given up, not carried: afterAttack() would otherwise fly a
             live target home and back with the aircraft (the rearm carry) */
          this.order = this.afterAttack({ type: "attack", target: null, resume: o.resume,
                                          cap: o.cap, then: o.then });
        }
      }
      return;
    }
    /* guarded on ammoMax: a Building borrows this method through
       Unit.prototype.tryFire.call and has no magazine and no canAfford */
    if (this.ammoMax && !this.canAfford(w)) return;          // aircraft out of ordnance
    /* Fixed deck launchers hold what they hold. A Slava carries sixteen
       enormous anti-ship missiles in tubes she cannot reload at sea, so once
       they are gone she is a gun platform for the rest of the battle - which
       is exactly what her own description says, and was not modelled. */
    /* ready rounds: an artillery piece that has shot itself dry waits for
       the supply chain rather than firing imaginary shells */
    /* A unit that declares a magazine consumes from it, whatever kind of round
       it fires. This tested the projectile type, which was fine while only tube
       and rocket artillery carried ready rounds - but a mobile SAM battery
       fires proj:"missile", so its magazine was never touched and it had
       infinite interceptors, which quietly defeated the point of giving air
       defence a magazine at all. */
    if (this.roundsMax) {
      if (this.rounds <= 0) return;
      this.rounds--;
      if (this.rounds === 0 && this.owner === this.game.human)
        this.game.alert(this.def.name.toUpperCase() + " \u2014 OUT OF ROUNDS", "bad");
    }
    const mag = this.def.magazine && this.def.magazine[this.def.weapons[wi]];
    if (mag !== undefined) {
      if (!this.mag) this.mag = {};
      if (this.mag[wi] === undefined) this.mag[wi] = mag;
      if (this.mag[wi] <= 0) return;
      this.mag[wi]--;
      if (this.mag[wi] === 0 && this.owner === this.game.human)
        this.game.alert(this.def.name.toUpperCase() + " — MISSILE TUBES EMPTY", "bad");
    }

    const burstN = w.burst || 1;
    this.burstLeft = this.burstLeft || {};
    Combat.fire(this.game, this, w, t);
    if (this.ammoMax) this.ammo = Math.max(0, this.ammo - (w.ammo || 0));

    if (burstN > 1) {
      /* schedule remaining rounds of the burst */
      let n = burstN - 1, j = 0;
      const delay = w.burstDelay || 0.1;
      const shooter = this, game = this.game;
      const tick = () => {
        if (shooter.dead || !t || t.dead || n-- <= 0) return;
        /* the burst's later rounds ask what the first one did: a set switched
           off between them keeps them on the rail (radarOffMount) - the AI's
           drill goes dark exactly then, as a Weasel shows */
        if (Unit.prototype.radarOffMount.call(shooter, w)) return;
        Combat.fire(game, shooter, w, aim ? aim(++j) : t);
        game.defer(delay, tick);
      };
      game.defer(delay, tick);
    }
    /* rationing also slows the rate of fire: rounds are being husbanded */
    this.cooldowns[wi] = w.reload / CFG.VET_ROF[this.vet] *
      (1 + 0.55 * (this.supplyStrain ? this.supplyStrain() : 0));
    /* A submarine that shoots announces itself. Stamp the moment of firing
       here rather than inferring it afterwards from the cooldown: the old
       inference tested the decaying cooldown against a hard-coded 11 seconds,
       so a boat whose reload was under 11 - which included the Los Angeles,
       the best boat in the game - was never flagged at all, while a boat with
       a long reload stayed flagged for however long it took to decay to 11.
       Keyed on layer, like every other submarine check in the codebase, so it
       cannot drift away from the roster the way def.submerged did. */
    if (this.layer === "sub") this.recentlyFired = this.game.time;
  }

  /* pick the closest enemy this unit can actually hurt, inside sight.
     A SEAD shooter weights emitters far above anything else.
     Among what the hull's own automatic rounds already REACH, "closest" is
     now "closest once targetPrio() has had its say" - see the note above
     class Unit. That preference never walks a crew toward something it
     cannot yet hit: see THE TWO TIERS at the bottom of this method. */
  acquire() {
    const k = this.stance === "aggressive" ? 1.25 : 1;
    const R = this.sightR() * CFG.TILE * k;
    /* A round fired on a cue reaches past the crew's own eyes (firesOnCue,
       rules.js), so the scan goes out as far as the longest of them and
       acqGate() lets a contact out there through only if the SIDE holds it.
       Everything else scans exactly R, as it always has (acqReach). */
    const Rq = this.acqReach(R);
    /* ---- and on a contact our own radar holds, as on a clear day ----
       (game.js RADAR GIVES THE WEATHER BACK.) When the weather has cut this
       crew's eyes, R0 is the clear-day radius and a candidate the side's radar
       holds is judged against it - acqGate's stealth band and its "past the
       crew's own eyes" test included - while every other candidate is judged
       against R exactly as before. The scan itself stays the grid query it
       always was, out to Rq; only a crew with a held contact further out than
       that pays for a second one, over the ring of cells between the two
       squares (SpatialGrid.queryRing), which hands back only what the first
       did not and is taken only where the radar holds it. Measured
       (tools/jsc/weather_radar_check.js [4]): a Pact T-90M at night, eyes 4.5
       tiles, never took a held tank 7 tiles off; now it does, as on a clear
       day, and with the dome dark it does not. On a clear day R0 is R, and
       nothing here asks the radar. */
    let R0 = R;
    if (this.game.radarHolds && this.radarCued()) {
      const c = this.clearSightR() * CFG.TILE * k;
      /* (and only if a set of ours is up: with none, nothing is held, and
         the wider sweep and its per-candidate test were pure cost) */
      if (c > R && this.game.radarUp(this.owner)) R0 = c;
    }
    const Rq0 = R0 > R ? this.acqReach(R0) : Rq;
    let ring = false;
    /* A Weasel weights an emitter a hundredfold below - 0.06 against 6 - but
       only for a round it may actually fire. acquire() is the automatic
       question by definition, so a held ARM contributes nothing to it;
       otherwise a mixed hull is dragged across the map toward a radar it is
       then going to shoot with its cannon. */
    /* That flag, and how far this hull's own automatic rounds reach, are
       sized up by the first candidate that survives every gate - not at the
       top of the call as the .some() that used to compute the flag did. This
       scan runs every frame for every idle, guarding and attack-moving hull,
       and nearly always finds nothing, so the common case now does LESS work
       than before, and a scan that does find something pays one weapon loop
       and at most four weaponRange() calls, never one per candidate.
       Held rounds are skipped for the reason just given: a HARM's reach is
       not a reach this scan may act on. The reach is kept per layer the
       target PRESENTS, with the same per-layer test canTarget() and
       pickWeapon() apply, because a longest-mount-wins "surface" reach was
       wrong for 36 hulls in the tables: a destroyer's 14-tile missile does
       not put a submarine inside the reach of its 6.5-tile torpedo, and a
       patrol boat's nine-tile torpedo does not put a lorry on the beach
       inside the reach of its 5.4-tile gun - a harvester at 6.5 tiles
       outscored a tank at 5.0 and walked the boat toward it. */
    let sead = false, rG2 = -1, rSe2 = 0, rSu2 = 0, rA2 = 0;
    /* best0 is what the scan would have picked before targetPrio() existed.
       It is needed twice: for THE TWO TIERS below, and for the flip count, which
       is how a census can see the preference changing anything at all. The
       in-reach and out-of-reach bests are kept apart for the same tiers. A
       few compares per candidate. */
    let bestIn = null, bdIn = Infinity, bestOut = null, bdOut = Infinity;
    let best0 = null, bd0 = Infinity;
    const scan = (e) => {
      /* the radius this candidate is judged by: R0 if our radar holds it */
      let Re = R;
      /* (our own hulls, which acqGate turns away first anyway, are not asked) */
      if (R0 > R && e.owner !== this.owner && this.game.radarHolds(this.owner, e)) Re = R0;
      else if (ring) return;               // past the first scan, and nothing of ours holds it
      /* every gate, in acqGate() below, so retarget() can ask the same ones */
      if (!this.acqGate(e, Re)) return;
      if (rG2 < 0) {
        let wG = null, wSe = null, wSu = null, wA = null;
        const ws = this.def.weapons;
        for (let i = 0; i < ws.length; i++) {
          const w = WEAPONS[ws[i]];
          if (!w || this.manualWeapon(w)) continue;
          if (w.antiRadiation) sead = true;
          /* weaponRange() is w.range times one per-owner factor, so the
             longest card range is the longest reach */
          const g = w.tgt;
          if ((!g || g.ground) && (!wG || w.range > wG.range)) wG = w;
          if ((!g || g.sea) && (!wSe || w.range > wSe.range)) wSe = w;
          if ((!g || g.sub) && (!wSu || w.range > wSu.range)) wSu = w;
          if ((!g || g.air) && (!wA || w.range > wA.range)) wA = w;
        }
        const rG = wG ? this.weaponRange(wG) : 0, rSe = wSe ? this.weaponRange(wSe) : 0;
        const rSu = wSu ? this.weaponRange(wSu) : 0, rA = wA ? this.weaponRange(wA) : 0;
        rG2 = rG * rG; rSe2 = rSe * rSe; rSu2 = rSu * rSu; rA2 = rA * rA;
      }
      const raw = U.dist2(this.x, this.y, e.x, e.y);
      const tl = e.targetLayer();
      const inReach = raw <= (tl === "air" ? rA2 : tl === "sub" ? rSu2 : tl === "sea" ? rSe2 : rG2);
      /* a machine gun is a weapon for men in the open - the one preference
         this scan always had, still applied at any distance */
      const mg = (e.cat === "infantry" && this.def.role === "mg") ? 0.5 : 1;
      let d0 = raw * mg;
      /* WHAT it is, not merely how far away it is, and only among what this
         hull can already hit. targetPrio() takes the machine-gun factor in and
         clamps the product, so ONE bound covers every preference applied to an
         in-reach candidate. The harvester preference that used to sit here as
         an empty block marked "juicy" is inside it too, and now does something. */
      let d = inReach ? raw * targetPrio(e, mg) : d0;
      /* radars and jammers are what a Weasel is here for */
      if (sead) {
        const k = (e.def && (e.def.radar || e.def.jam)) ? 0.06 : 6;
        d *= k; d0 *= k;
      }
      if (inReach) { if (d < bdIn) { bdIn = d; bestIn = e; } }
      else if (d < bdOut) { bdOut = d; bestOut = e; }
      if (d0 < bd0) { bd0 = d0; best0 = e; }
    };
    this.game.grid.query(this.x, this.y, Rq, scan);
    if (Rq0 > Rq && this.game.grid.queryRing) { ring = true; this.game.grid.queryRing(this.x, this.y, Rq, Rq0, scan); }
    /* THE TWO TIERS. targetPrio() can score an in-reach candidate up to 1.9
       times its squared distance - a scout, an empty lorry - and a single
       ranking would then let something 1.3 times as far, and OUT of reach,
       beat it: the hull stops shooting what it can hit and drives off, and a
       garrison, which cannot drive, never fires at all (updateGarrison()
       shoots only inside 1.15 of its reach). So the out-of-reach best is taken
       only where the OLD rule would have walked to it too - best0 is out of
       reach, which only the machine-gun and Weasel factors (both older than
       this) or a nearer contact on a layer this hull reaches less far can
       make happen - and even then only if no in-reach candidate now scores
       better than it. Everywhere else an in-reach candidate wins.
       The result is the old pick, except where targetPrio() re-ranks what
       is already in reach or pulls something in reach ahead of a walk. */
    const best = (bestOut && best0 === bestOut && bdOut < bdIn) ? bestOut : (bestIn || bestOut);
    /* Counted per owner, surface hulls only: those call acquire() once per
       engagement they start (idle, guard, attackmove), whereas a garrison
       window and an aircraft parked on strip alert call it every tick and
       would drown the number. Read by ai.js intel() for the commander's own
       side and by nothing that makes a decision. */
    if (best && this.layer !== "air" && !this.garrisonIn) {
      const st = this.owner.tgtStat || (this.owner.tgtStat = { acq: 0, flip: 0 });
      st.acq++;
      if (best !== best0) st.flip++;
    }
    return best;
  }

  /* The gates acquire() applies to one candidate, lifted out of its grid
     callback verbatim (each bare `return` is now `return false`) so that
     there is exactly one list of them. retarget() asks the same list; a gate
     added here later reaches both, and the two cannot drift apart. R is the
     acquisition radius the caller scanned with - the stealth band is cut
     from it. The radius itself is NOT tested here, because the grid query
     acquire() uses returns whole buckets and acquire() has always accepted
     what they hold; retarget() tests it for itself. */
  acqGate(e, R) {
    if (e.dead || e.owner === this.owner || this.game.allied(this.owner, e.owner)) return false;
    /* An unoccupied civilian building belongs to nobody and threatens nobody.
       It was being acquired automatically simply because its owner is the
       neutral player, so a column driving past a village would stop and
       level it unprompted. Once somebody garrisons it, it stops being
       neutral and becomes a legitimate target like any other. */
    if (!autoTargetable(e)) return false;
    /* struck off by the stand-off rule: nothing in reach of it lies outside
       the rings this bomber's side knows of (flyStandoff), for twenty s */
    if (this.soNo) {
      const until = this.soNo.get(e.id);
      if (until !== undefined) {
        if (until > this.game.time) return false;
        this.soNo.delete(e.id);
      }
    }
    /* The automatic question. This one call is the gate behind attackmove,
       idle/guard, the garrison windows, air attackmove, CAP, strip alert and
       hover - all seven reach a target only through here. Because a held
       round is invisible to it, a hull can never be handed an automatic
       order against something only a held round could reach.
       This matters far more than the designs assumed: a launcher's sight was
       21 to 31 tiles after generations.js rewrote it, not the 5.0 on the
       card, so idle/guard and attackmove were LIVE auto-fire paths for every
       TEL in the game. (It keeps its card's 5.0 now - rules.js firesOnCue -
       and this gate is still what holds its rounds.) */
    if (!this.canTarget(e, true)) return false;
    /* low-observable airframes cannot be acquired at full range */
    /* A surface mount cannot shoot at an aeroplane it cannot reach, so it
       has no business asking whether anybody holds a track on one. acquire()
       scans to sightR() * 1.25, and a naval hull's sight was widened to match
       its LONGEST weapon - an anti-ship missile - so an LCS whose 76mm
       reaches 8.0 tiles was interrogating airTrack about every airframe
       inside 20.5 tiles, every tick, for ever, and being silently refused.
       (That missile no longer widens the sight - rules.js firesOnCue - but
       acquire() now scans out to it instead, so the test is needed still.)
       120 surface shooters carry that phantom band; the missile boat has
       14.8 tiles of it around a 3.2-tile Phalanx. That artefact, not any
       missing radar, is the bulk of a measured 87.2% airTrack denial rate
       (879 of 1008 calls in a 20-minute e20 battle), and none of it was ever
       a real engagement. Aircraft are deliberately exempt: a fighter must
       still acquire a distant bogey and close on it. */
    if (this.layer !== "air" && e.targetLayer() === "air") {
      let airReach = 0;
      for (const k of (this.def.weapons || [])) {
        const w2 = WEAPONS[k];
        if (w2 && w2.tgt && w2.tgt.air) airReach = Math.max(airReach, this.weaponRange(w2));
      }
      if (U.dist(this.x, this.y, e.x, e.y) > airReach) return false;
    }
    /* an aircraft can only be engaged if somebody actually holds a track
       on it - your own radar, or a friendly sensor over the datalink */
    /* An engagement beyond visual range needs somebody to be holding a
       radar track on the target - your own set, or a friendly one over the
       datalink. Inside visual range it does not: a Stinger is an infrared
       missile aimed by a man looking at the aeroplane, and requiring it to
       wait for a radar picture meant a MANPADS section could never fire at
       all. Twelve of them killed nothing in a hundred seconds against six
       A-10s, which read as a balance problem and was really this. */
    /* PERF: `needsTrack` reads nothing but this.def and this.layer, and was
       being worked out for EVERY candidate - acqGate ran 12,422,628 times in
       the 350 game-seconds around t=850 - and then used only on the air
       branch. Same expression, same operands, same result; evaluated only
       when the candidate actually presents as an air target. */
    const airTgt = e.targetLayer() === "air" && !!this.game.airTrack;
    let needsTrack = false;
    if (airTgt) {
      const VISUAL = 11;
      /* a set switched off is no set (game.js G.setEmcon): its crew engages
         by eye, as a hull without one does, and only a long-range SAM round
         still needs somebody else's track */
      const setOn = (this.def.radarQ || this.def.radar) && !(this.emcon && this.game.radarDark(this));
      needsTrack = setOn || this.layer === "air" ||
            ((this.def.role === "aa" || this.def.role === "sam") &&
             ((WEAPONS[this.def.weapons[0]] || {}).range || 0) > VISUAL);
    }
    /* A parked airframe is not a radar track, it is a thing sitting in the
       open, so it goes down the ordinary visual branch instead. */
    if (airTgt && needsTrack) {
      if (!this.game.airTrack(this, e)) return false;
    } else if (e.def && e.def.stealth &&
        U.dist(this.x, this.y, e.x, e.y) > R * (1 - e.def.stealth * CFG.STEALTH_ACQ)) return false;
    /* ---- past the crew's own eyes: only on a cue ----
       R is what this crew sees. Only a hull carrying a round fired on a cue
       scans further (acquire, acqReach), and a contact out there is taken
       only if one of those rounds reaches the layer it presents and the SIDE
       holds it: a radar track for an aeroplane (the branch above has already
       asked), and G.sideSees for everything else - our eyes, our radar
       picture, an emitter we hear, and on the water our surface radar and our
       boats' sonar. So an Ohio no longer puts a Trident into a tank sixteen
       tiles inland that nobody on its side has seen (_behtest [76]). A hull
       with no cued round is untouched: it never scans past R, and what the
       grid's buckets hand it beyond R is accepted exactly as before. The
       distance is asked first, so a candidate inside R - nearly all of them -
       costs one subtraction more than it did and no lookup at all. */
    const d2 = U.dist2(this.x, this.y, e.x, e.y);
    if (d2 > R * R) {
      const cue = this.cueReach();
      if (cue) {
        const w = cue[e.targetLayer()];
        if (!w) return false;
        const rw = this.weaponRange(w);
        if (d2 > rw * rw) return false;
        if (!(airTgt && needsTrack) && !this.game.sideSees(this.owner, e, this)) return false;
      }
    }
    return true;
  }

  /* ---- the rounds this hull fires on a cue, by the layer they reach ----
     firesOnCue() in rules.js names them. A held round is left out, because
     acquire() is the automatic question and a held round never answers it.
     For each layer a target can present, the longest such round; `far` is the
     longest of all, which is how far acquire() looks. null for the great
     majority of the roster, which aims everything it fires through its own
     sight. Worked out once per def and kept in a Map beside it rather than
     on it: a def is read on every hot path in the game, and a property
     bolted onto 1,216 of them at run time is a new shape for each. */
  cueReach() {
    const d = this.def;
    const CUE = Unit.CUE || (Unit.CUE = new Map());
    const got = CUE.get(d);
    if (got !== undefined) return got;
    let c = null;
    for (const k of (d.weapons || [])) {
      const w = WEAPONS[k];
      if (!w || this.manualWeapon(w) || typeof firesOnCue !== "function" || !firesOnCue(d, w)) continue;
      if (!c) c = { ground: null, sea: null, sub: null, air: null, far: null };
      const g = w.tgt;
      for (const L of ["ground", "sea", "sub", "air"])
        if ((!g || g[L]) && (!c[L] || w.range > c[L].range)) c[L] = w;
      if (!c.far || w.range > c.far.range) c.far = w;
    }
    CUE.set(d, c);
    return c;
  }
  /* How far this hull's automatic scan looks: its crew's radius R, or out to
     the longest round it fires on a cue. acquire(), retarget() and
     patrolFights() all ask this one question, so a commander's concentrate()
     and a patrol are offered exactly what the scan itself would take. */
  acqReach(R) {
    const cue = this.cueReach();
    return cue ? Math.max(R, this.weaponRange(cue.far)) : R;
  }

  /* ---- swap the target of an engagement this hull chose for itself ----
     For a commander that wants several guns on one hull (ai.js
     concentrate()). Deliberately NOT give(): give() -> setOrder() nulls
     this.path, empties the queue and builds a new order that has lost
     `resume` - the attackmove leg the attack branch puts a hull back on when
     its target dies. Without it a retargeted hull fell idle on every kill and
     was re-sent at the objective through a fresh A*, which on the 144-tile
     theatre is 186 kB of typed arrays each time. Here the standing order is
     copied with only the target changed and assigned straight to this.order,
     exactly the way acquire()'s own callers assign one: resume, the queue,
     the path and the absent release all survive.

     Refused unless ALL of these hold:
       - the standing order is an automatic engagement - auto, and never
         released - so an attack a player or a commander gave by hand is left
         exactly as given, and no held round is ever freed by this;
       - the new target is inside this hull's own acquisition radius and
         passes acqGate(), the very list acquire() runs: autoTargetable, the
         automatic canTarget (which carries the sonar test), the air-reach
         test, the air-track rule and the stealth band. Nothing reaches a gun
         this way that the gun could not have picked up for itself this tick;
       - it is already inside the reach of the weapon pickWeapon() would use,
         with engage()'s own 0.86 stand-off as the margin and a tenth over the
         arming distance, so the hull fires from where it stands and engage()
         takes no step for it.                                               */
  retarget(t) {
    const o = this.order;
    if (!o || o.type !== "attack" || !o.auto || o.release) return false;
    if (!t || t === o.target || this.stance === "hold") return false;
    /* the crew's sight toward this one: as on a clear day if our radar holds it (sightOn) */
    const R = this.sightOn(t) * CFG.TILE * (this.stance === "aggressive" ? 1.25 : 1);
    const d = U.dist(this.x, this.y, t.x, t.y);
    if (d > this.acqReach(R) || !this.acqGate(t, R)) return false;
    const wi = this.pickWeapon(t);
    if (wi < 0) return false;
    const w = WEAPONS[this.def.weapons[wi]];
    if (!w || d > this.weaponRange(w) * 0.86 ||
        d < (w.minRange || 0) * CFG.TILE * 1.1) return false;
    this.order = Object.assign({}, o, { target: t });
    return true;
  }

  /* ---- arriving where somebody is already standing ----
     (owner) "the unit should have less overlapping or more space instead of
     crowding and cannot select units clearly."
     stepAlong() finishes a trip only within 0.45 of a tile of the exact
     point, and its separation push (30 px/s) is weaker than a tank's drive
     (50 px/s), so every unit sent to one point shoved into the first arrival
     until it was nearly on top of it. The commander sends every wave to one
     point (driveWave), and a factory sends every new unit to one rally
     point. Measured under jsc, 12 M1A2s each handed one attack-move point
     by give(), as ai.js does: 39 to 45 of 66 pairs overlapping, the worst by
     27 px of a 32 px footprint, and 5 of the 12 still shoving at the point
     45 s later - an order that never completes.
     So a trip that meets the crowd already standing at its point takes the
     free spot nearest that point instead (crowdStop, findSpot): the same
     spacing the player's formations get from groupSlots() in ui.js, on
     ground the unit can stand on and reach. Measured the same way: no pair
     over 2 px, all 12 arrive, the crowd's centre 0.2 of a tile off the
     point; sixteen tanks delivered to a rally point one at a time gather
     0.6-0.9 of a tile off it, where the first cut of this, stopping at the
     first touch, grew a tail 4.2 tiles back toward the factory.

     Who the crowd is matters as much. legDone() writes down where each trip
     ended, and only a unit standing where a trip to this same point ended
     (restsAt) counts: a front line that stopped short to shoot is not the
     crowd at the goal, and the first cut of this, which counted anything
     standing still that had been sent there, stopped a 16-tank wave behind
     its own firing line - 5 of 8 T-90As on hold fire outlived it, where the
     build before destroyed all 8 in 46 s. Counting only arrivals, all 8 go
     in 29 s. Nor is one of ours that is merely parked on the point: the
     trip drives up to it as it always did, and settle() below eases the
     two apart. The commander's depot berths are a tile apart, closer than
     any formation, and stopping short beside whoever was parked on one kept
     99 of 120 repair cases inside the depot's reach (the build before 106,
     with 52 pairs left overlapping); driving in and easing apart keeps 109,
     none overlapping. A landing craft putting troops ashore and a rig about
     to unfold need the exact point and never ask. Ten tiles out it stops
     asking. */
  legDone(o, dt) {
    const done = this.crowdStop(o) ||
      this.stepAlong(o.sx !== undefined ? o.sx : o.x, o.sx !== undefined ? o.sy : o.y, dt);
    if (!done) return false;
    /* a trip that found no route stopped where it stood: that is not the
       goal, and nobody should gather round it as if it were */
    if (!this.pathFail) {
      this._atGX = o.x; this._atGY = o.y; this._atX = this.x; this._atY = this.y;
      this._atT = this.game.time;
    }
    return true;
  }
  /* the gap a formation leaves round this unit: groupSlots() in ui.js spaces
     the player's spots by it and a crowd is spaced by it here, so the crowd
     a commander makes by sending a wave to one point stands as open as the
     formation a player makes with a right-click */
  clearance() { return this.r * 0.6 > 8 ? this.r * 0.6 : 8; }
  /* it ended a trip to (gx, gy) and still stands where that trip ended */
  restsAt(gx, gy) {
    const H = CFG.TILE * 0.5;
    return !this.moving && Math.abs(this._atGX - gx) < H && Math.abs(this._atGY - gy) < H &&
           Math.abs(this.x - this._atX) < H && Math.abs(this.y - this._atY) < H;
  }
  crowdStop(o) {
    if (o.unloadAt || this.def.deployTo) return false;
    const T = CFG.TILE, d = U.dist(this.x, this.y, o.x, o.y);
    if (d > T * 10) return false;
    /* Handed the same goal again where it already stopped for it: still
       there. The commander re-hands every idle wave member its attack-move
       each think (driveWave, 1.6 s), all on the same tick. Without this, in
       the first cut of this, each of them set off for the point again and
       the crowd never came to rest: 40 tanks under those re-orders had 39.8
       of 40 moving in every 0.4 s sample (the build before, still shoving at
       the one point, 3.8 moving and 61.5 pairs overlapping by more than
       2 px). Now none moves and none overlaps. Not if the point has come
       free since: then the one of the crowd nearest it walks in, and only
       that one - every member farther out than an arrival may stop short
       used to find the point free alike, and each took a spot afresh. And
       once it has set off it is not asked again: it asks before it steps,
       with `moving` still clear, so on the way in it found itself at rest
       where it had stood and stopped as soon as it was inside 0.8 of a
       tile, 25 px out - covering the point for none of the squads behind
       it, which is how a crowd of squads comes to rest with the point
       open: the nearest there by its own measure, not by theirs. Every
       re-hand then sent another in to stop short and a handful more off
       to spots farther out - 18 squads re-handed every 1.6 s moved 117 to
       153 px in 8 s, and with the squad on the point lost all 18 moved,
       where now nobody moves and one walks in (tools/jsc/crowd_check.js;
       [64] failed on it once, on another random stream). */
    if (!o.walkIn && this.restsAt(o.x, o.y)) {
      if (d < T * 0.8 || this.pointTaken(o.x, o.y) || this.nearerIn(o.x, o.y, d)) return true;
      o.walkIn = true;
    }
    /* stepAlong() leaves what it ran into on the last tick, read off the
       separation query it already pays for; a unit that did not step looks
       for itself, one small query */
    const spot = o.sx !== undefined, px = spot ? o.sx : o.x, py = spot ? o.sy : o.y;
    if (this._touchT < this.game.time - CFG.DT * 1.5 || this._touchX !== px || this._touchY !== py)
      this.touching(px, py);
    const e = this._touch;
    if (!e || e.dead || e.moving || !e.restsAt(o.x, o.y)) return false;
    if (spot && U.dist(e.x, e.y, px, py) >= this.r + e.r) return false;   // my spot is still free
    /* the crowd, or one of it on the spot I chose: find another. Four in a
       row gone before it got there and it stays where it is */
    if ((o.spotN = (o.spotN || 0) + 1) > 4) return true;
    const s = this.findSpot(o.x, o.y);
    if (!s) return true;                                 // nothing free within ten tiles
    o.sx = s.x; o.sy = s.y; this.path = null;
    return false;
  }
  /* one of ours stands nearer (gx, gy) than this unit, d out, with that
     point in hand now: held this tick where a trip to it had ended, as
     still there, or on a move to it not asked yet. And one already walking
     in counts wherever it stands: its first steps can take it farther out
     - it turns as it goes - and measured by where it stood then, the next
     of a ring the same distance out found nobody nearer and walked in too.
     Under jsc, a ring of six squads or six tanks round a lost point, laid
     facing ten ways each: two to six walked in for 6 of the 20, all six
     squads when they faced outward. Not one merely at rest there: what is
     asked is which of a crowd re-handed together walks in, and a unit
     handed the point on its own - a player's right-click with only it
     selected - is not held back by a crowd nobody asked. Counting every
     one at rest there held it where it stood, click after click: a squad
     52 px out and a tank 95 px out, each selected alone and right-clicked
     onto the open point with one of the crowd nearer it, did not move,
     where the build before walked each in. A tie goes to the older unit,
     so two standing the same distance out do not both walk in. The query
     reaches a tile past d, for a walker that has stepped back. */
  nearerIn(gx, gy, d) {
    let hit = false;
    const own = this.owner, L = this.layer, H = CFG.TILE * 0.5, me = U.dist2(this.x, this.y, gx, gy), id = this.id;
    const now = this.game.time;
    this.game.grid.query(gx, gy, d + CFG.TILE, (e) => {
      if (hit || e === this || e.dead || e.kind !== "unit" || e.layer !== L || e.carried || e.owner !== own) return;
      const eo = e.order, to = (eo.type === "move" || eo.type === "attackmove") &&
                               Math.abs(eo.x - gx) < H && Math.abs(eo.y - gy) < H;
      if (to && eo.walkIn) { hit = true; return; }
      const de = U.dist2(e.x, e.y, gx, gy);
      if (de > me || (de === me && e.id > id)) return;
      if (to || (e._atT === now && e.restsAt(gx, gy))) hit = true;
    });
    return hit;
  }
  /* one of ours stands at rest on (gx, gy) */
  pointTaken(gx, gy) {
    let hit = false;
    const own = this.owner, L = this.layer, cl = this.clearance();
    this.game.grid.query(gx, gy, this.r + 40, (e) => {
      if (hit || e === this || e.dead || e.kind !== "unit" || e.layer !== L || e.carried ||
          e.owner !== own || e.moving) return;
      const m = this.r + e.r + (cl + e.clearance()) * 0.5;
      if (U.dist2(e.x, e.y, gx, gy) < m * m) hit = true;
    });
    return hit;
  }
  /* The free spot nearest (gx, gy) that this unit can stand on and reach:
     rings round the point one formation pitch apart, six spots to the ring
     per ring out, the nearer ring first - but a spot on the near side may
     beat one on the far side of a closer ring (0.35 of the walk to it is
     added), so a unit does not cross the whole crowd for a hand's width.
     Free means no unit of ours standing within a formation's spacing of it,
     and none already on its way there: a spot is claimed when it is chosen,
     on the owner, until the unit reaches it or is given something else.
     Without the claims forty tanks arriving together kept choosing the same
     spots - 131 searches for 40 units, and one that lost a spot four times
     stopped where it was; with them, 50. Only our own units are looked at:
     where our own are standing is all a commander needs to know here. */
  findSpot(gx, gy) {
    const g = this.game, M = g.map, T = CFG.TILE, L = this.layer, own = this.owner;
    const cl = this.clearance(), pitch = 2 * this.r + cl, mob = this.cat === "infantry" ? 1 : 2;
    const cand = [{ x: gx, y: gy, c: 0.35 * U.dist(gx, gy, this.x, this.y) }];
    for (let k = 1; k <= 8 && k * pitch <= T * 10; k++) {
      const rho = k * pitch, n = 6 * k, a0 = (k & 1) ? Math.PI / n : 0;
      for (let i = 0; i < n; i++) {
        const a = a0 + i / n * Math.PI * 2, x = gx + Math.cos(a) * rho, y = gy + Math.sin(a) * rho;
        cand.push({ x, y, c: rho + 0.35 * U.dist(x, y, this.x, this.y) });
      }
    }
    cand.sort((a, b) => a.c - b.c);
    const tx0 = this.tx, ty0 = this.ty;
    const claims = own._spotClaims || (own._spotClaims = []);
    let w = 0;
    for (const c of claims) {
      const uo = c.u.order;
      if (c.u !== this && !c.u.dead && uo && uo.sx === c.x && uo.sy === c.y) claims[w++] = c;
    }
    claims.length = w;
    for (const p of cand) {
      if (p.x < 0 || p.y < 0) continue;
      const tx = (p.x / T) | 0, ty = (p.y / T) | 0;
      if (tx >= M.W || ty >= M.H || !GameMap.passable(M, tx, ty, L) || g.tileBlocked(tx, ty, this) ||
          !Path.reachable(M, tx0, ty0, tx, ty, L, true, mob)) continue;
      let free = true;
      g.grid.query(p.x, p.y, this.r + 40, (e) => {
        if (!free || e === this || e.dead || e.kind !== "unit" || e.layer !== L || e.carried ||
            e.owner !== own || e.moving) return;
        const m = this.r + e.r + (cl + e.clearance()) * 0.5 - 2;
        if (U.dist2(e.x, e.y, p.x, p.y) < m * m) free = false;
      });
      for (let i = 0; free && i < w; i++) {
        const c = claims[i], m = this.r + c.u.r + (cl + c.u.clearance()) * 0.5 - 2;
        if (U.dist2(c.x, c.y, p.x, p.y) < m * m) free = false;
      }
      if (free) { claims.push({ u: this, x: p.x, y: p.y }); return p; }
    }
    return null;
  }
  /* what stepAlong() records, for a unit that has not stepped since: the
     one of the crowd at its goal within a formation's spacing and a hand's
     width, nearest the point it is steering for (px, py) */
  touching(px, py) {
    let touch = null, touchD = Infinity;
    const r = this.r, own = this.owner, cl = this.clearance(), o = this.order;
    this.game.grid.query(this.x, this.y, r + 32, (e) => {
      if (e === this || e.dead || e.kind !== "unit" || e.layer !== this.layer || e.carried ||
          e.owner !== own || e.moving) return;
      const reach = r + e.r + (cl + e.clearance()) * 0.5 + 4;
      if (U.dist2(this.x, this.y, e.x, e.y) >= reach * reach) return;
      const de = U.dist2(e.x, e.y, px, py);
      if (de < touchD && e.restsAt(o.x, o.y)) { touchD = de; touch = e; }
    });
    this._touch = touch; this._touchT = this.game.time;
    this._touchX = px; this._touchY = py;
    return touch;
  }

  /* ---- at rest, ease apart ----
     Nothing used to separate a unit that was not moving: the push above
     lives in stepAlong(), so two hulls left overlapping stayed that way for
     the rest of the match, and a stack is exactly what cannot be clicked
     apart. At rest a unit now slides off whatever it overlaps - at 16 px/s
     or four tenths of its road speed if that is less, never more than half
     the overlap in a tick so two of them meeting halfway cannot overshoot,
     and only once the overlap is past 2 px and until it is under 0.5, so a
     settled crowd does not shiver: three tanks left exactly on top of each
     other are apart inside 3 s and then move 0.0 px. It does not turn the
     hull, set `moving` or burn fuel - this is shuffling a few feet, not
     driving - and a deployed gun and anything airborne stay put. Looked at
     twice a second (staggered by id) until an overlap is found, then every
     tick until it is gone, so a parked army pays one small grid query per
     unit per half second. Where a trip ended moves with it, so a shuffle
     does not make it forget it has arrived (restsAt). */
  settle(dt) {
    if (this.deployed || this.layer === "air") return;
    if (!this._settling) {
      if ((this._settleT -= dt) > 0) return;
      this._settleT = 0.5;
    }
    let px = 0, py = 0, worst = 0;
    const r = this.r;
    this.game.grid.query(this.x, this.y, r + 18, (e) => {
      if (e === this || e.dead || e.kind !== "unit" || e.layer !== this.layer || e.carried) return;
      const min = r + e.r, dx = this.x - e.x, dy = this.y - e.y, d2 = dx * dx + dy * dy;
      if (d2 >= min * min) return;
      const dd = Math.sqrt(d2), ov = min - dd;
      if (ov > worst) worst = ov;
      if (dd > 0.01) { px += dx / dd * ov; py += dy / dd * ov; }
      else {                          /* exactly stacked: split along a direction of its own */
        const a = this.id * 2.39996;
        px += Math.cos(a) * ov; py += Math.sin(a) * ov;
      }
    });
    if (worst < (this._settling ? 0.5 : 2)) { this._settling = false; return; }
    this._settling = true;
    const len = Math.sqrt(px * px + py * py);
    if (len < 0.01 || this.speedMul() <= 0) return;
    const step = Math.min(len * 0.5, Math.min(16, this.def.speed * CFG.TILE * 0.4) * dt);
    const x0 = this.x, y0 = this.y, nx = x0 + px / len * step, ny = y0 + py / len * step;
    if (this.standable(nx, ny)) { this.x = nx; this.y = ny; }
    else if (this.standable(nx, y0)) this.x = nx;
    else if (this.standable(x0, ny)) this.y = ny;
    else { this._settling = false; return; }  // wedged: back to looking twice a second
    this._atX += this.x - x0; this._atY += this.y - y0;
  }
  /* the same test stepAlong() applies to a step: on the board, passable for
     this layer, not inside a structure or an obstacle that stops this unit */
  standable(x, y) {
    const map = this.game.map, tx = (x / CFG.TILE) | 0, ty = (y / CFG.TILE) | 0;
    return x >= 0 && y >= 0 && tx < map.W && ty < map.H &&
           GameMap.passable(map, tx, ty, this.layer) && !this.game.tileBlocked(tx, ty, this);
  }

  /* ---- movement: follow A* path with hull rotation & local avoidance ---- */
  stepAlong(px, py, dt, stopDist) {
    const map = this.game.map;
    /* trapped inside a structure footprint: walk straight to the nearest open tile */
    if (this.layer !== "air" && this.game.tileBlocked(this.tx, this.ty, this)) {
      const out = Path.nearest(map, this.tx, this.ty, this.layer,
        (a, b) => this.game.tileBlocked(a, b, this), 8);
      if (out) {
        const ox = out.x * CFG.TILE + 16, oy = out.y * CFG.TILE + 16;
        const wantA = Math.atan2(oy - this.y, ox - this.x);
        this.ang = U.turnToward(this.ang, wantA, this.def.turn * 2 * dt);
        const sp2 = this.def.speed * this.speedMul() * CFG.TILE;
        this.x += Math.cos(this.ang) * sp2 * dt;
        this.y += Math.sin(this.ang) * sp2 * dt;
        this.moving = true; this.path = null;
      }
      return false;
    }
    const gtx = U.clamp((px / CFG.TILE) | 0, 0, map.W - 1);
    const gty = U.clamp((py / CFG.TILE) | 0, 0, map.H - 1);

    if (stopDist && U.dist(this.x, this.y, px, py) <= stopDist) return true;

    this.repathT -= dt;
    /* ---- a failed search is remembered until the next repath ----
       A goal with no route left path null, and `!this.path` then re-ran the
       whole A* on the very next tick - thirty map-wide floods a second for
       every unit chasing something it cannot reach. Measured in a profile of
       the behaviour suite: 83% of all CPU inside Path.find, called from
       engage() -> stepAlong(). The haulers had grown their own guard for this
       (updateHarvester); this is the general one. Same goal, same answer,
       until the ordinary repath interval says look again. */
    if (!this.path && this.pathFail && this.repathT > 0 &&
        this.pathFail.x === gtx && this.pathFail.y === gty) return true;
    if (!this.path || this.repathT <= 0) {
      const gm = this.game;
      this.path = Path.find(map, this.tx, this.ty, gtx, gty, this.layer,
        (tx, ty) => gm.tileBlocked(tx, ty, this),
        /* the only question tileBlocked asks of a unit, handed to the labels
           so they can hold field obstacles as well as structures: 1 infantry,
           2 everything else on the ground. Ground sealed by dragon's teeth
           then costs a tank two array reads instead of a landmass-wide
           expansion: on the 9x7 pocket the behaviour suite builds in [63],
           29,717 blockFn calls down to 18, while the rifle squad beside it
           still walks in between them for the same 77 calls it always took.
           GET THIS EXPRESSION WRONG AND A UNIT IS STRANDED, not merely slow:
           hand a squad class 2 and it is refused at any teeth and stops dead.
           [63] drives a real squad and a real tank at that pocket for exactly
           that reason - with `2` hardcoded here the suite reports 213/1. */
        this.cat === "infantry" ? 1 : 2);
      this.pathI = 0;
      this.repathT = 2.2 + this.game.rng() * 0.8;
      if (!this.path || !this.path.length) {             // nowhere to go
        this.path = null;
        this.pathFail = { x: gtx, y: gty };
        return true;
      }
      this.pathFail = null;
    }

    /* current waypoint */
    let wp = this.path[this.pathI];
    if (!wp) return true;
    let wx = wp.x * CFG.TILE + CFG.TILE / 2, wy = wp.y * CFG.TILE + CFG.TILE / 2;
    if (this.pathI === this.path.length - 1 && !stopDist) { wx = px; wy = py; }

    if (U.dist(this.x, this.y, wx, wy) < CFG.TILE * 0.45) {
      this.pathI++;
      if (this.pathI >= this.path.length) {
        this.path = null;
        return U.dist(this.x, this.y, px, py) < CFG.TILE * 0.8;
      }
      return false;
    }

    const want = Math.atan2(wy - this.y, wx - this.x);
    this.ang = U.turnToward(this.ang, want, this.def.turn * dt);
    /* vehicles slow in turns; infantry doesn't care */
    const misalign = Math.abs(U.angDiff(this.ang, want));
    /* Infantry used to be exempt from turn cost entirely, so a squad
       changed facing instantly - part of why the movement read as
       mechanical. They still turn far faster than a tracked vehicle, but
       not in zero time. */
    const turnMul = this.cat === "infantry" ? U.clamp(1.35 - misalign * 0.55, 0.55, 1)
                  : U.clamp(1.15 - misalign, 0.15, 1);

    /* A formation travels at the pace of its slowest member. groupSpeed is the
       cap set when the order was given; 0 means "not in a group", and a unit
       on its own is never throttled. */
    const base = this.groupSpeed ? Math.min(this.def.speed, this.groupSpeed / Math.max(0.05, this.speedMul()))
                                 : this.def.speed;
    /* Crossing an obstacle is slow, and that slowness is the point of laying
       one: wire does not stop a squad, it holds it in the open for several
       seconds while everything else shoots at it. */
    let obsMul = 1;
    const ob = this.game.obstacleAt ? this.game.obstacleAt(this.tx, this.ty) : null;
    if (ob && ob.def.crossSpeed !== undefined) {
      obsMul = ob.def.crossSpeed;
      /* a vehicle simply drives through wire, wrecking it and losing momentum */
      if (ob.def.crushable && this.cat !== "infantry" && this.def.crush !== false) {
        ob.crushT = (ob.crushT || 0) + dt;
        obsMul = 0.55;
        if (ob.crushT > 0.9) {
          Combat.applyDamage(this.game, ob, ob.hp + 1, { warhead: "he", dmg: ob.hp + 1 }, this);
          if (Combat.addEffect)
            Combat.addEffect({ t: "text", x: ob.x, y: ob.y - 10, s: "WIRE CRUSHED",
                               life: 0.8, max: 0.8, c: "#c8b06a" });
        }
      }
    }
    const sp = base * GameMap.speedAt(map, this.tx, this.ty, this.layer) *
               this.speedMul() * turnMul * obsMul * CFG.TILE;
    let nx = this.x + Math.cos(this.ang) * sp * dt;
    let ny = this.y + Math.sin(this.ang) * sp * dt;

    /* local separation from friendlies on the same layer */
    let pushX = 0, pushY = 0, touch = null, touchD = Infinity;
    /* A trip within ten tiles of its point also looks for the crowd there
       (crowdStop), a formation's spacing out from the hull, so the query
       reaches 14 px further for it: 18 px past the hull does not reach a
       tank's neighbour at 41.6. Measured on 133 units under jsc, Unit.update
       per call with and without the wider reach: 6.66-7.19 us against
       6.56-7.24 (orders every 20 s), 7.33-8.67 against 8.03-8.31 (re-orders
       every 1.6 s) - noise on a shared machine either way; HEAD 5.91-7.27
       and 8.29-10.04. */
    const od = this.order, ot = od.type, cl = this.clearance();
    const near = (ot === "move" || ot === "attackmove") && U.dist2(this.x, this.y, px, py) < 102400;
    this.game.grid.query(this.x, this.y, this.r + (near ? 32 : 18), (e) => {
      if (e === this || e.dead || e.kind !== "unit" || e.layer !== this.layer || e.carried) return;
      const dd = U.dist(this.x, this.y, e.x, e.y), min = this.r + e.r;
      if (dd < min && dd > 0.01) {
        const f = (min - dd) / min;
        pushX += (this.x - e.x) / dd * f * 30;
        pushY += (this.y - e.y) / dd * f * 30;
        /* crushing: heavy tracks vs infantry */
        if (this.def.crush && e.cat === "infantry" && e.owner !== this.owner &&
            this.def.mass >= CFG.CRUSH_MASS && dd < this.r) {
          Combat.applyDamage(this.game, e, 500, { warhead: "bullet", tgt: { ground: 1 } }, this);
        }
      }
      /* one of ours at rest, a formation's spacing and a hand's width off:
         the one nearest the point it belongs to is kept for crowdStop() to
         judge on the next tick - read off this query, no second search */
      if (near && e.owner === this.owner && !e.moving &&
          dd < min + (cl + e.clearance()) * 0.5 + 4) {
        const de = U.dist2(e.x, e.y, px, py);
        if (de < touchD && e.restsAt(od.x, od.y)) { touchD = de; touch = e; }
      }
    });
    this._touch = touch; this._touchT = this.game.time;
    this._touchX = px; this._touchY = py;
    nx += pushX * dt; ny += pushY * dt;

    /* Don't walk into impassable tiles - or off the map.

       The tile index used to be CLAMPED into range before the passability
       test, which meant a unit shoved past the edge by the separation push
       had its position checked against a tile it was not actually on: the
       clamp found a legal tile inside the map, the test passed, and the unit
       was left standing outside the terrain. On a coastal map like Korea that
       reads as a vehicle parked on the sea. Test the real tile, and refuse
       the move when it is off the board. */
    const ntx = (nx / CFG.TILE) | 0;
    const nty = (ny / CFG.TILE) | 0;
    const inside = nx >= 0 && ny >= 0 && ntx >= 0 && nty >= 0 &&
                   ntx < map.W && nty < map.H;
    if (inside && GameMap.passable(map, ntx, nty, this.layer) &&
        !this.game.tileBlocked(ntx, nty, this)) {
      this.x = nx; this.y = ny; this.moving = true; this.stuckT = 0;
    } else {
      this.stuckT += dt;
      if (this.stuckT > 0.8) { this.path = null; this.repathT = 0; this.stuckT = 0; }
    }
    return false;
  }

  /* ---- harvester loop: field -> refinery -> field ---- */
  updateHarvester(dt) {
    const o = this.order;
    this.moving = false;
    if (o.type === "move") {
      if (this.stepAlong(o.x, o.y, dt)) {
        this.order = { type: "harvest" };
        /* sent somewhere new: the ore-miss rest and write-offs belong to the
           old ground, and a player's right-click is not held for a minute */
        this.oreWait = 0; this.oreMiss = 0; this.oreRest = 0; this.oreNoGo = null; this.oreT = null;
      }
      return;
    }
    if (o.type !== "harvest" && o.type !== "return") this.order = { type: "harvest" };

    if (this.order.type === "harvest") {
      if (this.load >= CFG.HARVEST_LOAD) { this.order = { type: "return" }; return; }
      const map = this.game.map;
      /* on ore? scoop */
      const i = this.ty * map.W + this.tx;
      if (map.ore[i] > 1) {
        const take = Math.min(CFG.HARVEST_RATE * dt, map.ore[i], CFG.HARVEST_LOAD - this.load);
        map.ore[i] -= take; this.load += take;
        this.oreRest = 0;                  // scooping again: the next miss rests 8 s
        return;
      }
      /* find nearest ore tile */
      /* ---- ore no route reaches ----
         (engine fix, every player alike) nearestOre() never asked whether a
         tile can be REACHED, and the generator lays ore on passable tiles
         walled in by rock. stepAlong() then finds no path, reports "nowhere
         to go", and the hauler stood beside the pocket for the rest of the
         battle - and because its path stayed null it re-ran a full A* flood
         (up to 17,600 tiles on a 144 map) on EVERY tick. Measured in a jsc
         smoke run of fulda: four of one seat's six haulers parked on one tile
         next to such a pocket from t=240 to t=300 with their loads frozen,
         and that seat's income fell to 34-73 cr/s. The tile is now written
         off for THIS hauler for 90 s (a hauler boxed in by buildings must not
         blacklist a field the others can reach), and three misses in a row
         rest the search for 8 s instead of flooding the map 30 times a
         second. The miss writes off the pocket, not one tile (a field
         holds 60-120 tiles and one tile per round never exhausted it), and
         each run of misses doubles the rest - 8, 16, 32, 60 s - until the
         hauler scoops again. */
      if (this.oreWait > 0) {
        this.oreWait -= dt;
        /* resting with a load: deliver it rather than sit on it */
        if (this.load > 40) this.order = { type: "return" };
        return;
      }
      if (!this.oreT || map.ore[this.oreT.y * map.W + this.oreT.x] < 1 || (this.oreRetryT -= dt) < 0) {
        this.oreT = this.game.nearestOre(this.tx, this.ty, this.owner, this.oreNoGo);
        this.oreRetryT = 3;
        if (!this.oreT) { this.order = this.load > 40 ? { type: "return" } : { type: "idle" }; return; }
      }
      const orx = this.oreT.x * CFG.TILE + 16, ory = this.oreT.y * CFG.TILE + 16;
      if (this.stepAlong(orx, ory, dt) && !this.path &&
          U.dist(this.x, this.y, orx, ory) > CFG.TILE * 1.2) {
        const ng = this.oreNoGo || (this.oreNoGo = new Map());
        if (ng.size > 64) for (const [k, t] of ng) if (t <= this.game.time) ng.delete(k);
        if (ng.size > 400) ng.clear();
        const until = this.game.time + 90, ox = this.oreT.x, oy = this.oreT.y;
        for (let yy = Math.max(0, oy - 3); yy <= Math.min(map.H - 1, oy + 3); yy++)
          for (let xx = Math.max(0, ox - 3); xx <= Math.min(map.W - 1, ox + 3); xx++)
            if (map.ore[yy * map.W + xx] >= 20) ng.set(yy * map.W + xx, until);
        this.oreT = null;
        this.oreMiss = (this.oreMiss || 0) + 1;
        if (this.oreMiss >= 3) {
          this.oreMiss = 0;
          this.oreRest = Math.min(60, (this.oreRest || 4) * 2);
          this.oreWait = this.oreRest;
        }
      } else if (this.oreMiss) this.oreMiss = 0;
    } else { /* return */
      const rf = this.game.nearestBuilding(this.owner, "refinery", this.x, this.y);
      if (!rf) { this.order = { type: "idle" }; return; }
      const dock = this.dockFor(rf);
      const dockX = dock.x, dockY = dock.y;
      /* Unloading is judged against the refinery's FOOTPRINT, not against one
         dock tile. A hauler that has reached any face of the building has
         arrived; tying delivery to a single tile meant a base packed tight
         around its refinery could strand every hauler in the fleet, full,
         forever - which is exactly what was happening. */
      /* Arriving at the assigned dock IS arriving. dockFor may have to fall back
         to an outer ring when the tiles against the building are built over,
         and in that case the hauler is legitimately further from the footprint
         than a single fixed radius allows - so accept either condition.

         And if the hauler is jammed against something and has stopped making
         progress toward the dock, it delivers anyway once it is reasonably
         close. A full hauler frozen two tiles from its own refinery is the
         worst failure in the game - the economy simply stops - and no amount
         of dock-picking cleverness is worth risking that. */
      const dNow = U.dist(this.x, this.y, dockX, dockY);
      if (this._lastDock === undefined || dNow < this._lastDock - 2) {
        this._lastDock = dNow; this._dockStuck = 0;
      } else {
        this._dockStuck = (this._dockStuck || 0) + dt;
      }
      const jammed = this._dockStuck > 4 && this.nearFootprint(rf, 4.5);
      if (jammed) rf._dock = null;              // the cached dock is unreachable
      if (jammed || this.nearFootprint(rf, 1.6) || dNow < CFG.TILE * 0.9) {
        this._lastDock = undefined; this._dockStuck = 0;
        const cap = this.owner.storageCap();
        /* The pre-battle Economy handicap is applied HERE, to what the hauler
           actually lands, rather than as a trickle of invented credits paid to
           a commander with no harvester at all. It scales a real delivery, so
           "Starved" genuinely reduces income - which the old formula could not
           express, because it only ever added. */
        const carried = this.load * (this.owner.harvestMul || 1);
        const gain = Math.min(carried, Math.max(0, cap - this.owner.cash));
        if (gain < this.load && this.owner === this.game.human && !this.warnedSilo) {
          Sfx.announce("silos_needed", this); this.game.alert("ORE LOST — BUILD SILOS", "bad"); this.warnedSilo = true;
        }
        this.owner.earn(gain);
        this.owner.stats.mined += gain;
        /* what was DELIVERED, vault or no vault - a statistic only (the AI's
           income estimate reads it; mined stays what was credited) */
        this.owner.stats.hauled = (this.owner.stats.hauled || 0) + carried;
        this.load = 0;
        this.order = { type: "harvest" };
      } else this.stepAlong(dockX, dockY, dt);
    }
  }

  /* Distance from this unit to a building's footprint rectangle, in tiles,
     and whether that is close enough to interact. */
  nearFootprint(b, tiles) {
    const x0 = b.tx * CFG.TILE, y0 = b.ty * CFG.TILE;
    const x1 = (b.tx + b.def.w) * CFG.TILE, y1 = (b.ty + b.def.h) * CFG.TILE;
    const dx = Math.max(x0 - this.x, 0, this.x - x1);
    const dy = Math.max(y0 - this.y, 0, this.y - y1);
    return Math.sqrt(dx * dx + dy * dy) <= tiles * CFG.TILE;
  }

  /* Where a hauler actually unloads.
     The tile directly south of a refinery is the natural approach, but a
     commander who packs another structure against that face would otherwise
     brick the economy permanently: the hauler arrives full, cannot reach the
     one hard-coded dock, and never delivers again. So walk the refinery's
     perimeter and take the nearest tile that is genuinely free, preferring
     the south face. The answer is cached on the refinery and invalidated
     whenever the surrounding occupancy changes. */
  dockFor(rf) {
    const stamp = this.game.occStamp || 0;
    if (rf._dock && rf._dockStamp === stamp) return rf._dock;
    const w = rf.def.w, h = rf.def.h;
    const cands = [];
    /* south face first, then north, then the two sides - south is the
       conventional approach and keeps the look of the base consistent */
    for (let i = 0; i < w; i++) cands.push([rf.tx + i, rf.ty + h]);
    for (let i = 0; i < w; i++) cands.push([rf.tx + i, rf.ty - 1]);
    for (let i = 0; i < h; i++) cands.push([rf.tx - 1, rf.ty + i]);
    for (let i = 0; i < h; i++) cands.push([rf.tx + w, rf.ty + i]);
    /* then a ring one tile further out, for a really congested base */
    for (let i = -1; i <= w; i++) { cands.push([rf.tx + i, rf.ty + h + 1]); cands.push([rf.tx + i, rf.ty - 2]); }

    let best = null, bd = Infinity;
    for (const [tx, ty] of cands) {
      if (tx < 0 || ty < 0 || tx >= this.game.map.W || ty >= this.game.map.H) continue;
      if (!GameMap.passable(this.game.map, tx, ty, "ground")) continue;
      if (this.game.tileBlocked(tx, ty, this)) continue;
      const d = U.dist2(this.x, this.y, (tx + 0.5) * CFG.TILE, (ty + 0.5) * CFG.TILE);
      if (d < bd) { bd = d; best = [tx, ty]; }
    }
    /* nothing free at all: fall back to the classic point so the hauler at
       least presses against the building instead of stopping dead */
    const d2 = best
      ? { x: (best[0] + 0.5) * CFG.TILE, y: (best[1] + 0.5) * CFG.TILE }
      : { x: (rf.tx + w / 2) * CFG.TILE, y: (rf.ty + h + 0.5) * CFG.TILE };
    rf._dock = d2; rf._dockStamp = stamp;
    return d2;
  }

  /* ---- aircraft: fly, fight, RTB to rearm/refuel ---- */
  updateAir(dt) {
    /* A transport standing on a strip of open ground (AIRLIFT LANDING) is on
       its wheels: whatever it is told next starts with the take-off run, not
       with a jump to cruise speed off the grass. */
    if (this.grounded && !Unit.airGround(this.order)) this.order = this.airlandLeave(this.order);
    const o = this.order;
    this.moving = true;                     // airframes never idle their engines

    if (o.type !== "parked") this.parked = false;

    /* ---- ESCORT: where the station is, this tick ----
       (owner) "any idea that early warning aircraft, E2D, to company with
       other units to enhance other units to ability". An early-warning
       aircraft already feeds its side's one radar picture (G.radarPicture,
       G.sideSees), so what it is worth is WHERE it flies - and nothing kept
       it with a force that moves: a patrol holds a fixed point, and the
       column drove out from under it. The escort order names the unit, and
       its point is moved here, before anything reads it: the bingo test
       below carries it home and back, the ring hold walks it back out of
       what the side knows, the branch further down orbits it.
       Kept fresh on the way home as well (`then`), so a unit lost while its
       aircraft is on the ramp leaves the spot it was lost on, not the one
       the aircraft last saw it at. */
    const eo = o.type === "escort" ? o : (o.then && o.then.type === "escort" ? o.then : null);
    if (eo) this.escortFix(eo);
    if (o.type === "escort" && o.lost) {
      /* The unit is gone: hold over where it was, as an orbit order there
         would - it becomes that order, a patrol on the last point, flown
         by the cap branch below and saved and drawn as one. */
      if (this.owner === this.game.human && this.game.alert)
        this.game.alert(this.def.name.toUpperCase() + " — ESCORTED UNIT LOST, HOLDING OVER ITS LAST POSITION", "bad");
      this.order = { type: "cap", x: o.x, y: o.y };
      return;
    }

    /* Bingo fuel is a distance, not a fixed number: turn for home while there
       is still enough in the tanks to actually reach the ramp. */
    /* Bingo fuel is a distance, not a fixed number: turn for home while there
       is still enough in the tanks to reach the ramp. A helicopter is not on
       that clock - it operates from a pad with a fraction of the support and
       only goes back when the ordnance is gone. */
    /* Two reasons to turn for home, and the aircraft obeys whichever bites
       first: the distance reserve (enough left to actually reach the ramp,
       which matters most when it is a long way out) and a flat 40% of the
       tanks, so nothing on a quiet patrol ever loiters itself to death. */
    const bingo = Math.max(this.reserveFuel(), this.fuelMax * 0.40);
    const dry = !this.def.hover && this.fuel < bingo;
    const dryAmmo = this.ordnanceDry();
    /* A stick being laid is finished first. Its bombs come off a release at
       a time (areaStick), so with the last release only partly gone the
       magazine already reads dry - measured, a B-52D Big Belly turned for
       home on its run with 8 of its 108 bombs still aboard - and a run is a
       few seconds of the fuel. */
    const onRun = o.type === "areastrike" && o.phase === "run" && o.k < o.n;
    /* ...but for the fuel, only the run itself, and never past what it takes
       to get home. Joined from behind the run-in point the phase is "run"
       from the first tick (areaStick), so with the fuel let off on the whole
       of it the join had no bingo at all: measured, a B-52D Big Belly
       launched at 42% on a lane drawn away from its base, 155 tiles to the
       far end, flew 26.2 s below bingo before its first bomb and fell out of
       the sky on the way home. The first bomb (o.k > 0) is the start of the
       run; before it bingo is what it is on any leg, and the strike is
       carried home and back (areaResume): the same bomber now turns for
       home 2.2 s after launch, comes back on full tanks and lays the stick,
       never below 20% (tools/jsc/areafire_check.js [11]). */
    const finish = onRun && o.k > 0 && this.fuel >= this.reserveFuel();
    /* A SNIFF patrol's last round finishes its break before it goes home to
       rearm: the way home from the launch point need not be away from the
       site. Bingo fuel is not held for it. */
    const breaking = o.type === "sniff" && o.ph === "out";
    /* ...and a transport on the ground at the far end of a delivery takes
       off before it does anything about fuel: the run home starts with it */
    const needRTB = ((dryAmmo && !onRun && !breaking) || (dry && !finish)) && !this.grounded;
    /* "tank" must be in this list. Without it the check fired every tick while
       an aircraft was actually taking fuel - fuel is below the bingo figure by
       definition at that moment - and reissued the order from scratch, which
       threw away the standing mission it was meant to return to and restarted
       the join every frame. The receiver never finished topping up and flew
       itself dry next to a tanker with fuel to spare. */
    if (needRTB && o.type !== "rtb" && o.type !== "land" && o.type !== "parked" &&
        o.type !== "tank") {
      /* A patrol is a standing order. Going home for fuel and ordnance is part
         of flying it, not the end of it - so the mission is carried through
         the turnaround and resumed once the aircraft is serviceable again. */
      const standing = (o.type === "cap" || o.type === "attackmove")
        ? { type: o.type, x: o.x, y: o.y, commit: o.commit }   // a jammer sent in goes back in
        : (o.cap && o.resume) ? { type: "cap", x: o.resume.x, y: o.resume.y }
        /* a SNIFF patrol, or a turn-in it made on a contact: the beat is
           what is carried, and taken up again from the top (sniffResume) */
        : o.type === "sniff" ? this.sniffResume(o)
        /* an ESCORT is a standing order the same way: the unit it names is
           carried across the ramp or the boom, and the aircraft flies back
           to wherever that unit has got to by then (escortFix) */
        : o.type === "escort" ? { type: "escort", target: o.target, x: o.x, y: o.y }
        : o.type === "attack" && o.sniff ? this.sniffResume(o.sniff) : null;
      if (o.sniff) this.sniffRelease(o.target);
      if (standing && standing.type === "sniff" && dryAmmo && this.owner === this.game.human)
        this.game.alert(this.def.name.toUpperCase() + " \u2014 OUT OF MISSILES, REARMING, THEN BACK TO SNIFF", "good");
      /* A strike is an `attack` order carrying a `resume` point and NO `cap`
         flag - which is exactly what the airbase STRIKE panel and the STRIKE
         button issue - so `standing` above was null for every strike ever
         flown. The tank branch then completed with { type:"cap", x:this.x,
         y:this.y } and the aircraft orbited the boom for the rest of the match.
         Measured: a bomber_n sent at a target 62 tiles out hit it once at
         t=41s, tanked at t=63s, and then flew a 41-second tank/cap cycle over
         open ground for the remaining 240s - never back to the target, never
         home, draining the tanker the whole time. Carry the attack itself
         across the boom; afterAttack() already handles a target that died while
         the aircraft was taking fuel. */
      const resume = standing ||
        (o.type === "attack" && o.target && !o.target.dead
          /* `release` is carried across the boom with everything else, and it
             has to be: setOrder() (entities.js:244) is the ONLY place the token
             is stamped, and this literal is assigned straight to this.order on
             the hand-back, never through setOrder. Without it an aircraft whose
             rounds are all HELD - a Weasel, and now a Valiant, a Vulcan B.2 or
             a Mirage IV - breaks off for fuel with a released strike, tanks,
             flies all the way back, and then finds holdsFire() true on every
             mount and drops nothing. This does NOT widen the gate: the token is
             copied from the order that already had it, and an order that never
             carried release still does not. */
          ? { type: "attack", target: o.target, resume: o.resume, cap: o.cap,
              auto: o.auto, release: o.release }
          /* an area strike is carried the same way while there is something
             to fly it with: one broken off for fuel, or one that came up out
             of the queue on a dry aircraft (areaDone) */
          : o.type === "areastrike" && (!dryAmmo || !(o.k > 0)) ? this.areaResume(o)
          /* a delivery broken off for fuel is flown again once refuelled,
             the cargo still aboard (AIRLIFT LANDING) */
          : o.type === "airland" ? this.airlandResume(o)
          : null);
      const tanker = this.game.nearestTanker ? this.game.nearestTanker(this) : null;
      const pad2 = this.game.findPad ? this.game.findPad(this) : null;
      const padD = pad2 ? U.dist2(this.x, this.y, pad2.x, pad2.y) : Infinity;
      if (tanker && !dryAmmo && U.dist2(this.x, this.y, tanker.x, tanker.y) < padD) {
        /* fuel only - an aircraft out of ordnance has to go home regardless,
           because a tanker carries no bombs */
        this.order = resume ? { type: "tank", target: tanker, then: resume }
                            : { type: "tank", target: tanker };
      } else {
        /* ---- AN ORDER THE PLAYER GAVE SURVIVES THE TURNAROUND ----
           (owner) "b52 and ac130 attacking the same unit wiill hanger."
           They did, and it was deliberate: this line used `standing`, which is
           null for a strike, so breaking off for fuel or ammunition ENDED the
           attack. The reasoning was that a tanker should be what turns one
           sortie into a sustained one. The cost of it, measured: a B-52H and
           an AC-130J both ordered onto one target made a few passes each, went
           home, rearmed, and SAT ON THE RAMP FOR EVER - the Buff parked at
           t=100 with ammo 20 of 20 and fuel 100 of 100 while the thing it had
           been sent to kill stood there. The player's order simply evaporated,
           with no message and nothing to click.
           An order is a standing instruction. It is carried across the ramp
           the same way it is already carried across the boom, and the aircraft
           goes back until the target is dead or the player says otherwise.
           WHAT THIS COSTS, stated rather than discovered later: the tanker no
           longer makes the difference between one sortie and many. What it
           makes now is the difference between CONTINUOUS pressure and
           intermittent pressure - the boom removes a turnaround of forty-odd
           seconds each way, and an aircraft on the ground is an aircraft not
           shooting. That is a smaller edge than it had, and it is an honest
           one; the previous arrangement bought the tanker's value by throwing
           the player's order away. */
        this.order = resume ? { type: "rtb", then: resume } : { type: "rtb" };
      }
      /* ---- AND STOP, BECAUSE `o` IS NOW STALE ----
         (owner) "the fuel only being added when the aircraft back to base."
         It was. This block chose a tanker correctly - traced: tanker found at
         1.8 tiles, ammo full, no pad at all, every condition true - and set
         this.order to a `tank`. Then the function CARRIED ON with the local
         `o` captured at the top of updateAir, which still said "idle", fell
         into the hover/idle branch below, and that branch overwrote the tank
         order with a plain rtb on the very same tick. Measured: an F-16 at 30
         of 100 fuel, a full KC-46 two tiles away, no airbase anywhere - 0
         ticks on the boom, straight to rtb, and it flew itself to 0.0 fuel and
         died with 420 of offload sitting beside it.
         It only ever bit from `idle` and `hover`, which is why it survived
         this long: from `move` or `cap` the dispatch below does not reassign
         unless the aircraft arrives on that frame. Those are also exactly the
         states a patrolling aircraft is in.
         One frame of movement is skipped and that is the whole cost. */
      return;
    }

    /* ---- high-value airborne assets keep out of the rings ----
       An early-warning aircraft, a tanker or a transport carries nothing that
       can shoot back, and an electronic-attack aircraft holding its rounds is
       in the same position. Real planning gives these a station BEHIND the
       forward edge, outside every plotted missile engagement zone, because
       losing one costs more than the sortie it was supporting. Measured before
       this: an E-3 ordered to orbit over a Patriot flew to 0.4 tiles and died.

       The ring is drawn only from batteries this commander can SEE, so the
       aircraft is not being given a free plot of the enemy's air defence - it
       routes around what it knows and can still be caught by what it does not.
       Deliberately NOT applied to fighters and strike aircraft: penetrating a
       defended area is their job, and a player who orders it means it. */
    /* ---- the Weasel takes its own shot ----
       Ahead of the routing below on purpose: a SEAD aircraft that has found a
       radiating battery inside its own reach is not in the envelope by
       accident, and must not be routed away from the thing it exists to kill.
       It issues itself the attack a player would have clicked - release and
       all - and the ordinary attack path takes it from there.

       Only when it is not already prosecuting something: an order the player
       gave by hand outranks this, and a shot already in progress is left to
       finish. */
    /* "idle" is in this list ON PURPOSE and it is the ELECTRONIC WARFARE
       AIRCRAFT'S ALONE. (owner) "self launching is the EW aircraft previllage
       that they found the rador or sam and then launch the missle and flee."
       seadTarget() returns null for every role but "sead" and "ewair", so no
       bomber and no fighter can reach this - a B-2 and an F/A-18 sit on the
       ramp until they are sent, which is the rest of the same report. */
    if ((o.type === "move" || o.type === "cap" || o.type === "hover" ||
         o.type === "idle") && !o.release) {
      const em = this.seadTarget();
      if (em) {
        if (!this.warnedSead && this.owner === this.game.human) {
          this.warnedSead = true;
          this.game.alert(this.def.name.toUpperCase() +
                          " \u2014 ENGAGING RADAR", "good");
        }
        this.parked = false;
        /* AND FLEE. A shot the player asked for resumes the mission it broke
           off from; a shot the aircraft took on its own initiative ends with
           it coming home, because nobody sent it out there and it has no
           business loitering over a battery it has just fired at. That is the
           second half of the owner's sentence and it is also what stopped a
           Growler walking itself seventy-seven tiles across the map one
           engagement at a time. */
        this.order = { type: "attack", target: em, auto: true, release: true,
                       resume: (o.type === "move" || o.type === "cap")
                               ? { x: o.x, y: o.y } : null,
                       then: (o.type === "move" || o.type === "cap")
                               ? null : { type: "rtb" } };
        return;
      }
    }

    const defenceless = !this.def.weapons.length ||
                        (this.allWeaponsHeld && this.allWeaponsHeld());
    /* ---- and an ARMED aircraft that is merely passing through ----
       (owner) "when our aircraft units spot the dead threat like sam ... it
       should fleet the area."

       The paragraph above is right that penetrating a defended area is a
       strike aircraft's job and that a player who orders it means it. But it
       drew the line around the AIRFRAME, and the line belongs around the
       ORDER. A Hornet told to attack a battery is doing its job. The same
       Hornet told to fly from one side of the map to the other, whose
       shortest route happens to clip a SAM ring, is not doing anything at
       all - it is dying in transit for nothing.

       o.release is the token that separates them and it already exists:
       setOrder stamps it on a NON-AUTO attack or bombard (entities.js:226)
       and on nothing else. So a commanded attack presses on exactly as
       before, and a move or a combat air patrol - which name no target -
       routes around what it can see. Aggressive stance is the off switch a
       player already has on the F key.

       attackmove is deliberately NOT included for an armed aircraft: it means
       advance and engage, which is a fight the player asked for.
       EXCEPT FOR A STAND-OFF BOMBER (standoffAir, below). Its fight is fought
       from outside the rings - the attack branch below will not take it
       inside one - so an attack-move that carried it over the battery on the
       way would be the one road left into the envelope; and it is the
       commander's armed sweep for every strike airframe (ai.js). It goes
       round the rings as a transit does (soTransit), and while it holds it
       still looks for work: acquire() reaches as far as its missile does
       (rules.js firesOnCue). */
    const soAir = this.standoffAir();
    const transiting = (o.type === "move" || o.type === "cap" ||
                        (soAir && o.type === "attackmove")) &&
                       !o.release && this.stance !== "aggressive";
    /* ---- EXCEPT A JAMMER SENT IN BY NAME ----
       A jammer's bubble is shorter than every SAM ring here - 10.5 tiles at
       the widest against rings of 14.8 to 18.5 - so this hold kept every
       jammer out of reach of every battery its side could see: measured, 0.00
       on the battery's radar from each jamming airframe given a patrol over
       one. To jam a battery a jammer has to be inside its reach, and taking an
       aircraft in is the commander's call, as it is for anything else: a cap
       marked `commit` - the player's STRIKE on a hostile with a jammer
       selected (ui.js), or the AI's flyJammer() when one of its strikes is
       under a battery - flies to its point through the rings. A jammer only:
       an early-warning aircraft carries a derived jam figure too, and the flag
       does nothing for it, so an E-3 still cannot be ordered over a Patriot. */
    const committed = o.commit === true && o.type === "cap" &&
                      !!this.def.jam && !this.def.awacs;
    if ((defenceless || transiting) && !committed && this.game.standoffPoint &&
        (o.type === "move" || o.type === "attackmove" || o.type === "cap" ||
         o.type === "escort")) {
      const margin = 1.5 + (this.def.jam ? 0 : 1.0);   // a jammer may sit closer
      /* A stand-off bomber flies its transit by the rings its side knows -
         round them, not merely short of the last one, and held on a circle
         it can fly (soTransit). What it hands back is a leg already clear of
         them, flown by the order's own branch below. */
      const soT = soAir && !!this.game.soStation;
      if (soT && this.soTransit(o, margin, dt)) return;
      /* Anchor the walk-back at HOME, not at the aircraft. Computed from the
         current position the station moves every time the aircraft does: it
         backs out of the ring, the route then reads clear, it turns in again,
         and it oscillates across the threat edge - measured, that drove an E-3
         from a 12.3-tile hold to a 6.2-tile one, i.e. deeper in than doing
         nothing. Anchored at home the station is a fixed point on the corridor
         and the aircraft simply flies to it and stays. */
      const hx = this.owner.homeX, hy = this.owner.homeY;
      const sp = soT ? { held: false }
                     : this.game.standoffPoint(this.owner, hx, hy, o.x, o.y,
                         /* an ESCORT's station is the middle of an orbit, so
                            the ring is held off by the margin AND by how far
                            the orbit carries the airframe from its middle
                            (escortReach): held by the station's middle alone,
                            an orbit round it can swing a whole turning circle
                            back inside - for an E-2D 8.8 tiles, and a SAM
                            Site's ring drawn at 17.5 is a battery that
                            reaches 14 */
                         o.type === "escort" ? margin + this.escortReach() : margin,
                         /* ...and an ESCORT by every ring its side KNOWS: a
                            battery in sight now, a structure on ground the
                            side has explored, a launcher where the side last
                            saw it (G.standoffRings) - never one its fog hides,
                            and never one read off the enemy's roster: (owner)
                            "ai should have the same fog like us". The list a
                            patrol reads is the in-sight one, and an escort
                            cannot live on it: its point moves every tick, an
                            E-2D sees 14 tiles, and a SAM Site's ring is drawn
                            at 17.5 plus the margin - backed out to the edge,
                            the battery drops out of sight, the ring off the
                            list, and the aircraft turns straight back in, the
                            oscillation the stand-off bomber had (G.standoffRings,
                            the same reason). */
                         o.type === "escort" && this.game.standoffRings
                           ? this.game.standoffRings(this.owner) : undefined);
      if (sp.held) {
        if (!this.warnedRing && this.owner === this.game.human) {
          this.warnedRing = true;
          this.game.alert(this.def.name.toUpperCase() +
                          " \u2014 HOLDING SHORT OF AIR DEFENCE", "bad");
        }
        /* an ESCORT flies its own orbit on the station, which the margin
           above has put clear of the ring, orbit and all; flyTo on the point
           would fly the loop an aeroplane makes round one instead */
        if (o.type === "escort") { this.escortOrbit(o, sp.x, sp.y, dt); return; }
        if (this.flyTo(sp.x, sp.y, dt)) this.moving = false;
        return;
      }
      this.warnedRing = false;
    }

    if (o.type === "move") {
      if (this.flyTo(o.x, o.y, dt) && !this.nextOrder()) this.order = { type: "hover" };
    } else if (o.type === "attackmove") {
      const foe = this.acquire();
      if (foe) this.order = { type: "attack", target: foe, resume: { x: o.x, y: o.y }, auto: true };
      else if (this.flyTo(o.x, o.y, dt) && !this.nextOrder()) this.order = { type: "hover" };
    } else if (o.type === "attack") {
      const t = o.target;
      if (!t || t.dead || (o.auto && !autoTargetable(t))) { this.order = this.afterAttack(o); return; }
      const wi = this.pickWeapon(t);
      /* Losing the contact is not a reason to go home. A sonar or radar track
         that flickers should send the aircraft back to searching, not end the
         sortie - it still has fuel and ordnance. Being unable to PAY for the
         round that would hit it is: that is a trip to the ramp, and the target
         is carried so the aircraft comes back to it. */
      if (wi < 0) {
        const short = !!this.ammoMax && this.pickWeapon(t, true) >= 0;
        this.order = this.afterAttack(o, short);
        return;
      }
      const w = WEAPONS[this.def.weapons[wi]];
      const range = this.weaponRange(w);
      const dist = U.dist(this.x, this.y, t.x, t.y);
      /* a SNIFF patrol's turn-in: straight in, the round away at the edge of
         its reach, and the break (see SNIFF) */
      if (o.sniff && !this.def.hover) { this.sniffShot(o, t, wi, w, range, dist, dt); return; }
      /* ---- A FIXED-WING AIRCRAFT KEEPS FLYING WHILE IT SHOOTS ----
         (owner) "B52 and ac 130 should move during the attack."
         Two separate reasons they did not, and the second is the older
         mistake. FIRST: a standoff shooter stopped dead. The branch below
         held the nose on the target and fired without ever calling flyTo, so
         a B-52H with a 15-tile JASSM hung motionless in the air for the whole
         engagement - measured, forty seconds at 45.5,12.5 without moving a
         tile. SECOND: this test was `def.jet`, and it meant to ask whether the
         aircraft can HOVER. The AC-130 is a C-130: jet is false, so it fell
         into the helicopter branch and hover-fired. A Hercules cannot hover.
         It flies a PYLON TURN - a banked left orbit with the guns pointing
         out of the side at the middle of the circle - which is the single most
         recognisable thing about the aeroplane.
         So: helicopters hover, a bomb is still delivered over the target
         because that is what a bomb needs, and everything else orbits at the
         range it is shooting from. tryFire() has no facing test, so an orbiting
         aircraft shoots perfectly well - and an AC-130 firing out of its left
         side while it circles is not a compromise, it is the real thing. */
      /* ---- A STAND-OFF BOMBER SHOOTS FROM OUTSIDE THE RINGS ----
         (owner) "b52H should shoot missle far away instead of bomb under the
         sam range." A heavy or stealth bomber putting a stand-off round onto
         its target flies the launch orbit G.standoffLaunch plans - outside
         every ring its side knows of, reached round them - and holds short,
         and says so, when there is none (flyStandoff below). The orbit this
         branch flies is kept for everything else: an anti-radiation shooter
         closes on the edge of the very battery it is attacking, which is its
         job; a bomb or a gun overflies or orbits as before; a helicopter
         hovers. Aggressive stance is the off switch it has always been (F):
         the bomber presses in as it did. */
      if (!this.def.hover && this.stance !== "aggressive" && Unit.standoffRound(w) &&
          this.standoffAir() && this.game.standoffLaunch) {
        this.flyStandoff(o, t, wi, w, range, dist, dt);
        return;
      }
      if (!this.def.hover) {
        /* ---- a pass, or a shot from outside? ----
           A bomb has to be delivered over the target and a gun has to be
           pointed at it, so those aircraft fly the pass they always did. A
           MISSILE does not: an anti-radiation round is fired from as far out
           as it will reach and the aircraft turns away, which is the entire
           reason the weapon exists. Before this, every jet flew straight at
           whatever it was attacking and fired when it happened to be inside
           range - so an EA-18G with a 10.5-tile HARM closed to 6.7 tiles of a
           Patriot and was shot down, having thrown away the four tiles of
           standoff it was carrying. Helicopters already held at 0.8 of range;
           this is the same rule applied to the aircraft that ought to have had
           it first.

           0.88 rather than 0.8: an anti-radiation shot is taken at the edge,
           and the extra fraction is most of a tile of Patriot envelope. */
        const standoff = (w.proj === "missile" || w.antiRadiation) && !w.bomb;
        const overhead = w.proj === "bomb";
        if (overhead) {
          /* A BOMB IS DELIVERED OVER THE TARGET, AND THEN THE AEROPLANE IS
             PAST IT. Flying AT the target meant flyTo reached its destination
             and held there, so a CAS aircraft sat motionless on top of what it
             was bombing - measured, 1,028 of 1,800 frames stationary. Aim
             BEYOND it, along the run-in, so the pass carries through and out
             the far side; the range test below drops the load as it goes over,
             and once it is past, `dist` opens again and it comes round for
             another. That is a bombing run rather than a hover.

             ---- AND THE CARRY-THROUGH IS MEASURED IN PIXELS ----
             (agents) "the bomb run overshoots by a factor of 32." It did, as
             arithmetic: `Math.max(range, 4) * CFG.TILE` took `range`, which
             weaponRange() has ALREADY multiplied by CFG.TILE, and multiplied
             it by the tile size a second time. A 2.6-tile JDAM asks for 83
             pixels of carry-through and was handed 2,656 - 83 tiles past the
             target. The 4 is a tile figure standing inside a pixel
             expression, and it is unreachable: any real range in pixels is
             larger than 4.

             Note which arm wins once the units are right, because it is the
             opposite one. All 116 bomb mounts in the game carry between 1.8
             and 4.2 tiles, and only three clear the four-tile floor: the
             French AASM Hammer at 4.2, in its base entry and the two
             unit-specific variants the Rafale CAS and fighter fits carry. So
             for 113 of the 116 the carry-through is the flat four tiles and
             `range` is vestigial here. Tuning a bomb's reach will NOT move
             the pass geometry; this line is the place to change if that is
             ever wanted.

             It changed nothing on the screen, and that is worth writing down
             so nobody builds on a false premise. The aim point is
                 T + through * unit(T - P)
             and the vector from the aircraft to it is
                 (T - P) * (1 + through / |T - P|),
             a POSITIVE MULTIPLE of (T - P). So the heading flyTo takes is the
             heading to the target for every positive `through`, and flyTo's
             return value - the only other thing the magnitude could reach - is
             discarded on this line. Measured in jsc over six bomb-carrying
             airframes at eight run-in bearings each, 60 s on a durable target:
             the 32x value, the corrected value, and the aim point removed
             altogether (flyTo straight at the target) deliver 170.8 / 170.8 /
             171.0 rounds summed over the six, and fly the same tracks to
             floating-point noise.

             So this is a units fix and not a flight-model change - but it has
             to be made, because `through` is one refactor away from being
             live. Latch the run-in axis instead of recomputing it every frame
             and the aim point stops being collinear at once; 83 tiles of carry
             would then fly a bomber off the map. That latch WAS tried and
             measured in four sizes, and every size lost. Pure pursuit puts the
             aeroplane exactly over the target - median closest approach 0.05
             to 0.09 tiles - because it is aimed AT it; a latched leg has a
             lateral error at the target of roughly
                 2 * turnRadius * through / legLength,
             which is 1.5 to 2.4 tiles against bombs that reach 2.2 to 3.0.
             The totals: 170.8 rounds and 89% of passes inside the bomb's own
             reach for pursuit, against 100.3 / 79%, 99.4 / 80% and 79.0 / 76%
             for setup legs of two, three and four turn radii, and 38.5 / 14%
             with no setup leg at all. Pure pursuit is the better bomb run and
             it stays. [50] reads this number back off flyTo and pins it. */
          const bx = t.x - this.x, by = t.y - this.y;
          const bl = Math.max(1, Math.hypot(bx, by));
          const through = Math.max(range, 4 * CFG.TILE);
          this.flyTo(t.x + (bx / bl) * through, t.y + (by / bl) * through, dt);
          if (dist < range) this.tryFire(wi, t);
        } else {
          /* everything else works a circle at the range it shoots from - the
             standoff shooter sits at the edge of its reach, the gunship sits
             at the edge of its guns. */
          const hold = range * (standoff ? 0.88 : 0.80);
          if (dist > hold * 1.06) this.flyTo(t.x, t.y, dt);
          else this.orbitAround(t, hold, dt);
          if (dist <= hold * 1.10) {
            this.tryFire(wi, t);
            if (standoff && this.ordnanceDry())
              this.order = this.afterAttack(o);
          }
        }
      } else {
        /* helicopters hold at 80% range and hover-fire */
        if (dist > range * 0.8) this.flyTo(t.x, t.y, dt);
        else {
          this.ang = U.turnToward(this.ang, Math.atan2(t.y - this.y, t.x - this.x), this.def.turn * dt);
          this.tryFire(wi, t);
        }
      }
    } else if (o.type === "areastrike") {
      this.areaStrike(o, dt);
    } else if (o.type === "airland") {
      this.airland(o, dt);
    } else if (o.type === "sniff") {
      this.sniffFly(o, dt);
    } else if (o.type === "rtb" || o.type === "land") {
      /* The ramp this aircraft is based on. If every slot has gone it lands
         on its own anyway: an over-stacked revetment beats orbiting the field
         until the tanks run dry. */
      const own = this.padOn;
      const pad = this.game.findPad(this, true) ||
        (own && !own.dead && (own.kind !== "building" || own.buildProgress >= 1)
          ? { x: own.x, y: own.y, host: own } : null);
      if (!pad) {
        /* ---- NOWHERE TO LAND, AND SAY SO ----
           With every strip gone the aircraft orbits home until the tanks are
           dry and then falls out of the sky - measured, 107 seconds from full
           to dead - and nothing ever told the player why the bomber would not
           come home. It reads as the aircraft refusing the order. The orbit
           itself is right (there is no runway), but it must be explicable:
           one line per airframe, re-armed if a strip is ever rebuilt. */
        if (!this.noPadSaid && this.owner === this.game.human && this.game.alert) {
          this.noPadSaid = true;
          this.game.alert(this.def.name.toUpperCase() + " \u2014 NO RUNWAY TO RECOVER TO", "bad");
        }
        /* home round the rings, as to a ramp below */
        const dh = this.ringDetour(o, this.owner.homeX, this.owner.homeY);
        if (dh) { this.soFlyTo(dh.x, dh.y, dt); return; }
        this.flyTo(this.owner.homeX, this.owner.homeY, dt);
        return;
      }
      this.noPadSaid = false;
      /* on the runway base, down onto the revetment it will park in - and
         that revetment is its from now, so another one coming home or being
         delivered meanwhile is given another (Building.bayFor) */
      let bayQ = null;
      if (pad.host && pad.host.padPoint && pad.host.def.padPts) {
        this.bay = pad.host.bayFor(this); this.bayHost = pad.host;
        bayQ = pad.host.padPoint(this.bay);
      }
      const px = bayQ ? bayQ.x : pad.x, py = bayQ ? bayQ.y : pad.y;
      /* flyTo moves first and tests the capture radius afterwards, and this
         branch went on calling it after the aircraft had reported itself
         down - so it flew straight over the strip, took fuel for the two or
         three frames a lap it happened to be inside the ring, and orbited for
         the rest. A Blackjack burns more on that lap than the pad gives back
         and so could never land at all. Test the range BEFORE moving, then
         hold the aircraft on the ramp until it is serviceable. */
      const capture = CFG.TILE * (this.def.hover ? 0.7 : 2.2);
      const dp = U.dist(this.x, this.y, px, py);
      /* the hold is only released if the ramp goes out from under it - a deck
         that has sailed on, or a base destroyed while it was being serviced */
      if (o.down && dp > capture * 2) o.down = false;
      if (!o.down && dp > capture) {
        /* ---- THE CIRCUIT: an aeroplane cannot land from inside its own turn ----
           flyTo turns at def.turn rad/s while flying at def.speed, so no
           airframe can turn inside a circle of radius speed/turn. 205 of the
           219 fixed-wing types in this game have a turn radius LARGER than
           this 2.2-tile capture ring - an F-15E 3.5 tiles, a B-52H 8.6 - so an
           aircraft that reaches bingo while it is already over its own field
           spirals round the strip at its own turn radius and can never touch
           it. Nothing had caught it because nothing used to come home from
           close in: a straight-in recovery from twenty tiles flies THROUGH the
           ring on the way past. Swept offline over every fixed-wing type in
           the game at 1..16 tiles and twelve headings - 42,048 recoveries -
           2,478 of them, 5.9%, never land at all. In a match that is not a
           stall, it is a loss: the aircraft orbits its own runway until the
           tanks are dry and then falls out of the sky. Measured, a Weasel that
           hit bingo two tiles from the field orbited between 3.0 and 5.6 tiles
           from t=81.6 to t=112 and was destroyed four tiles from the runway.
           So fly the circuit an aeroplane actually flies: extend until there
           is room to turn in, then come down the approach. The same 42,048
           recoveries with this rule: 0 failures, worst case 23.4s for a B-52.
           A band with hysteresis rather than a waypoint, because a waypoint
           needs a capture test of its own and has exactly the same problem. */
        if (!this.def.hover) {
          const turnR = this.def.speed / Math.max(0.001, this.def.turn);  // tiles
          const dpT = dp / CFG.TILE;
          if (dpT < turnR * 1.05) o.extend = true;       // no room to turn in
          else if (dpT > turnR * 2.2) o.extend = false;  // established: come home
          if (o.extend) {
            /* WINGS LEVEL, on the current heading - NOT a radial out from the
               field. Steering away from the pad is still steering and it
               spirals just as happily as steering toward it; written that way
               first, it lost all eight airframes in the probe instead of four.
               Flying straight is what breaks the circle, because the distance
               then opens without a turn being needed at all. */
            this.flyTo(this.x + Math.cos(this.ang) * CFG.TILE * 40,
                       this.y + Math.sin(this.ang) * CFG.TILE * 40, dt);
            return;
          }
        }
        /* a stand-off bomber goes home round the rings it worked outside */
        const dv = this.ringDetour(o, px, py);
        if (dv) { this.soFlyTo(dv.x, dv.y, dt); return; }
        this.flyTo(px, py, dt); return;
      }
      o.down = true;
      this.x = px; this.y = py;                  // on the ramp, not over it
      this.moving = false;                       // engines off, so no fuel burn
      this.parked = true;                        // and no crash on dry tanks
      this.serviceOnPad(pad.host, dt);
      /* Readiness is fuel and ordnance. Repair carries on while it sits
         there, so a battered squadron is never grounded by an empty treasury. */
      /* Readiness for a tanker includes the thing it exists to give away. Its
         own tanks fill at 22/s and are full 2.9s after touchdown; the boom
         refills at 26/s and needs 16.2s for a full 420. Releasing it on fuel
         alone put it back on station with a quarter of a load - measured across
         one 900s run it left with 420, 420, 341, 268, 205, 190, 115 - so it
         decayed to one top-up per round trip and the wing flew home anyway. */
      if (this.fuel >= this.fuelMax - 1 && this.ammo >= this.ammoMax - 0.05 &&
          (!this.offloadMax || this.offload >= this.offloadMax - 1)) {
        if (o.then) { this.parked = false; this.order = o.then; }
        else {
          /* nothing to do: shut down on the ramp rather than orbit and
             burn the fuel we just took on */
          this.order = { type: "parked" };
        }
      }
    } else if (o.type === "tank") {
      /* Join on the tanker and take fuel. Both aircraft are committed while
         it happens - the receiver is not fighting, and the tanker is flying
         straight and level with something tucked under its wing. */
      const t = o.target;
      if (!t || t.dead || t.offload <= 0) {
        this.order = o.then ? o.then : { type: "rtb" };
        return;
      }
      const d = U.dist(this.x, this.y, t.x, t.y);
      if (d > CFG.TILE * 1.6) { this.flyTo(t.x, t.y, dt); return; }
      /* formate: sit just off the tanker and match its track */
      this.ang = t.ang;
      this.x += (t.x - Math.cos(t.ang) * CFG.TILE * 0.9 - this.x) * Math.min(1, dt * 2);
      this.y += (t.y - Math.sin(t.ang) * CFG.TILE * 0.9 - this.y) * Math.min(1, dt * 2);
      const rate = (t.def.refuelRate || 12) * dt;
      const want = Math.min(rate, this.fuelMax - this.fuel, t.offload);
      this.fuel += want;
      t.offload -= want;
      if (this.fuel >= this.fuelMax - 0.5) {
        if (this.owner === this.game.human)
          this.game.alert(this.def.name.toUpperCase() + " TOPPED UP", "good");
        this.order = o.then ? o.then : { type: "cap", x: this.x, y: this.y };
      } else if (t.offload <= 0) {
        /* The tanker ran dry before this one was full. Going back on station
           on whatever is left strands the aircraft where it cannot reach a
           runway - a dependence on a tanker that has run out ends the sortie,
           it does not continue it. */
        if (this.owner === this.game.human)
          this.game.alert(this.def.name.toUpperCase() + " \u2014 TANKER DRY, GOING HOME", "bad");
        /* Going home because the boom ran dry is a turnaround like any other:
           the standing order has to survive it, or one dry tanker permanently
           ends the patrol or the strike of every aircraft joined on it and they
           all park. This bare rtb, not the offload-empty one, is what made a
           tanker measurably WORSE than no tanker at all - 62.9% on station
           against 74.3% with none. */
        this.order = o.then ? { type: "rtb", then: o.then } : { type: "rtb" };
      }
    } else if (o.type === "cap") {
      /* Combat air patrol: hold over a point, engage what comes into reach,
         and go home when the tanks say so. A helicopter can sit here all day
         on its own fuel; a jet is on a clock. */
      const foe = this.acquire();
      if (foe) { this.order = { type: "attack", target: foe, resume: { x: o.x, y: o.y }, cap: true, auto: true }; return; }
      /* ---- THE PATROL ENVELOPE ----
         (owner) "my understanding is partol that fly this area and attack any
         units in this envelop".
         acquire() looks out from wherever the airframe HAPPENS to be, and a
         heavy aeroplane's orbit wanders: a B-2 turns at 1.2 rad/s at 5.2
         tiles a second, so it swings up to nine tiles off the point it was
         given and spends much of the circuit pointing away. Measured on a
         patrol with six riflemen three tiles from the mark, acquire() answered
         "nothing" on 48 of 90 samples; with the enemy fourteen tiles out it
         answered nothing at all and the aircraft orbited an untouched column.
         So the patrol sweeps the AREA it was given rather than the spot the
         aeroplane is at: the same gate every automatic engagement uses
         (acqGate - fog, held rounds, stealth band, air tracks all still
         apply), centred on the PATROL POINT, out to this airframe's own sight
         plus the orbit. Once a second, and only while nothing is already in
         reach, so it costs one grid query a second per patrolling aircraft. */
      this.capScanT = (this.capScanT || 0) - dt;
      /* "hold" means do not engage unless ordered, and acquire() honours it by
         answering null - so the sweep has to honour it too, or this would have
         quietly turned every held patrol into a firing one (measured: 22 bombs
         from a bomber set to hold, which should drop none). */
      if (this.stance === "hold") this.capScanT = 1;
      else if (this.capScanT <= 0) {
        this.capScanT = 1;
        const RR = (this.sightR() + CFG.CAP_RADIUS) * CFG.TILE;
        /* and on a contact our own radar holds, the clear-day sight
           (game.js RADAR GIVES THE WEATHER BACK): the sweep reaches out to
           it, and anything the radar does not hold is held to RR as before */
        const c = this.radarCued() ? (this.clearSightR() + CFG.CAP_RADIUS) * CFG.TILE : 0;
        const RR0 = c > RR && this.game.radarHolds ? c : RR;
        let best = null, bd = Infinity;
        this.game.grid.query(o.x, o.y, RR0, (e) => {
          if (e === this) return;
          let Re = RR;
          if (RR0 > RR && U.dist2(o.x, o.y, e.x, e.y) > RR * RR) {
            if (!this.game.radarHolds(this.owner, e)) return;
            Re = RR0;
          }
          if (!this.acqGate(e, Re)) return;
          if (U.dist2(o.x, o.y, e.x, e.y) > Re * Re) return;
          const d2 = U.dist2(this.x, this.y, e.x, e.y);
          if (d2 < bd) { bd = d2; best = e; }
        });
        if (best) {
          this.order = { type: "attack", target: best, resume: { x: o.x, y: o.y }, cap: true, auto: true };
          return;
        }
      }
      /* a stand-off bomber patrols on a circle clear of the rings its side
         knows (soLoiter) when they are near enough for this one to stray in */
      if (this.soLoiter(o, o.x, o.y, dt)) return;
      const d = U.dist(this.x, this.y, o.x, o.y);
      const R = CFG.CAP_RADIUS * CFG.TILE;
      if (d > R * 1.25) {
        this.flyTo(o.x, o.y, dt);
      } else {
        /* orbit rather than hover, so a jet keeps its airspeed */
        o.orbit = (o.orbit || 0) + dt * (this.def.jet ? 0.9 : 0.5);
        const ox = o.x + Math.cos(o.orbit) * R, oy = o.y + Math.sin(o.orbit) * R;
        this.flyTo(ox, oy, dt);
      }
    } else if (o.type === "escort") {
      /* ---- ESCORT: on station over the unit as it moves ----
         The orbit a patrol flies (cap, above) - the same radius, the same
         rate - drawn round the point escortFix moves every tick. Nothing
         here engages: what an early-warning aircraft adds is its radar in
         the side's picture, and a patrol's sweep would pull it off station
         to chase a contact it has nothing to shoot at. It is kept out of a
         known ring by the hold above, sent home and back by the bingo test,
         and left over the last place when the unit is lost (top of
         updateAir). */
      /* Round where the unit is about to be, not where it is: an orbit
         drawn round a destroyer at 2.1 tiles a second, flown on the spot,
         was a loop behind her - measured under jsc, an E-2D averaged 6.8
         tiles off her and fell 14.9 behind. Led by the time a turn of 1.6
         rad takes this airframe (1.6 s for an E-2D), 5.4 and 11.9. */
      const lead = this.def.hover ? 0 : 1.6 / Math.max(0.1, this.def.turn);
      this.escortOrbit(o, o.x + (o.vx || 0) * lead, o.y + (o.vy || 0) * lead, dt);
    } else if (o.type === "parked") {
      /* sitting on the ramp: no fuel burn, engines off, ready to scramble */
      this.moving = false;
      this.parked = true;
      let host = this.padOn;
      /* after a reload the pad link is gone: find the nearest ramp again
         rather than falling out of the sky */
      if (!host || host.dead) {
        const pad = this.game.findPad(this, true);
        host = pad ? pad.host : null;
        if (host) this.padOn = host;
      }
      if (host && !host.dead && host.padPoint && host.def.padPts) {
        /* a revetment of its own on the runway base, the one it had if it is
           still free (Building.bayFor), nose to the runway */
        this.bay = host.bayFor(this); this.bayHost = host;
        const q = host.padPoint(this.bay);
        this.x = q.x; this.y = q.y; this.ang = q.ang;
      } else if (host && !host.dead) {
        /* Park in a revetment of its own rather than stacking every airframe
           on the same point - four aircraft in one spot reads as one aircraft. */
        const wing = host.wing ? host.wing().filter(u => u.parked) : [this];
        let slot = wing.indexOf(this);
        if (slot < 0) slot = 0;
        /* Size the grid by what is actually standing here, not by the ramp.
           A field can hold more than it has revetments for - an airframe with
           nowhere else to go lands anyway rather than orbiting until it is dry
           - and laying those out on a grid built for the smaller number walked
           the last ones off the end of the airfield and parked them in the
           open ground beyond it. */
        const n = Math.max(wing.length, 1, host.ramp ? host.ramp() : 1);
        const w = (host.def.w || 3) * CFG.TILE, h = (host.def.h || 3) * CFG.TILE;
        const cols = Math.ceil(Math.sqrt(n));
        const rows = Math.max(1, Math.ceil(n / cols));
        const cx = slot % cols, cy = Math.min(rows - 1, (slot / cols) | 0);
        const spanX = w * 0.62, spanY = h * 0.62;
        this.x = host.x + (cols > 1 ? (cx / (cols - 1) - 0.5) * spanX : 0);
        this.y = host.y + (rows > 1 ? (cy / (rows - 1) - 0.4) * spanY : 0);
        this.ang = -Math.PI / 2;                 // lined up on the strip
      } else { this.parked = false; this.order = { type: "rtb" }; return; }
      this.serviceOnPad(host, dt);
      /* ---- strip alert ----
         An aircraft on the ramp launches on its own to INTERCEPT, and for
         nothing else. It used to scramble at whatever acquire() handed back,
         which is any target its weapons could engage - so the moment a scout
         car wandered within sight of the airfield, a four-thousand-credit
         stealth bomber took off and flew a strike nobody ordered. The player
         built it for a purpose and it left before being given one.

         Two rules. Anything may launch against an AIR target, which is what
         strip alert means and what a fighter is parked there for. Only a
         helicopter may launch against a GROUND target, because it is a local
         weapon defending the field it is standing on; a bomber with a
         thirty-tile reach flying off unbidden is not base defence, it is a
         sortie, and a sortie is the player's decision.

         Not before it can get home again, either: an aircraft that launched on
         half a tank hit bingo fuel seconds later and turned straight round,
         which reads as refusing the order to stay at base. */
      if (this.stance !== "hold" && this.ammo > this.ammoMax * 0.5 &&
          this.fuel >= this.reserveFuel()) {
        const foe = this.acquire();
        const airborne = foe && foe.targetLayer && foe.targetLayer() === "air";
        if (foe && (airborne || this.def.hover)) {
          this.parked = false;
          this.order = { type: "attack", target: foe, auto: true };
        }
      }
      /* ---- NOTHING SERVICEABLE STAYS ON THE APRON ----
         (owner) "we need to make sure all the fix wing aircraft cannot hanger.
         they must move or patrol."
         The rtb branch above ends a turnaround with { type: "parked" } and a
         note saying it shuts down rather than orbit and burn the fuel it just
         took on. For a commander with a brain that was survivable, because
         ai.js re-tasks anything parked on its next think; for the PLAYER it is
         terminal, and it is why an air force bought with four thousand credits
         an airframe reads as a bill. Measured on a seat with no AI - eight
         fixed-wing aircraft, one airbase, no orders given, 300 s: 2,400 of
         2,400 airframe-seconds on the apron and 0 tiles flown. Not most of it.
         All of it.
         A patrol is not a sortie, and the distinction is the whole reason this
         is safe to do automatically. patrolStation() is computed from our OWN
         buildings and knows nothing whatever about the enemy, so what launches
         here is a barrier patrol over ground we already hold. The strip-alert
         rule immediately above still governs shooting: a bomber does not go
         hunting because nobody told it to, and "a sortie is the player's
         decision" is untouched.
         THE OFF SWITCH IS THE ONE THAT ALREADY EXISTS. F sets stance "hold",
         which strip alert and engage() have always obeyed; a player who wants
         an airframe on the ramp presses it. And a helicopter is excluded
         outright - a pad is where a helicopter belongs, it burns no fuel
         sitting there, and the owner said so.
         Four things are asked before it goes: it is serviceable (full tanks,
         full pylons, and enough of the airframe left to be worth risking),
         it has a reason to be airborne at all (a weapon, a radar or a jammer -
         a transport and a tanker wait to be given a task, which is what
         ai.js's air loop has always said of them), and it is not held. */
      /* ---- AND IT IS THE COMMANDER'S APRON, NOT THE PLAYER'S ----
         (owner) "b2 f18 navy ef18 are attacking automatically and don't land
         the airbase."
         Measured on the player's seat, no orders given, 90 s each: a B-2 spent
         870 ticks airborne and never parked once, burning 100 fuel down to 70
         to fly a racetrack; an F-16 flew 1,351 ticks of `move` and never came
         down either; and a Growler launched itself, found a radiating battery,
         and was SEVENTY-SEVEN TILES from where it started with two rounds gone
         and a third of its fuel left. They were not failing to land - they were
         landing and taking straight off again, for ever.

         The requirement this block was written for is still met, and it is the
         one in the sentence: "all the fix wing aircraft cannot hanger. they
         must move or patrol" was about an aeroplane STOPPING IN MID-AIR at
         zero groundspeed, which is what the branch below fixes and which is
         untouched here. Launching an idle airframe off the ramp was an extra
         inference on top of it, and for the player it takes the aircraft out
         of their hands: a 4,200-credit strategic bomber flies an unasked
         barrier patrol and a Weasel prosecutes a target nobody sent it at.

         For a COMMANDER it stays, because a commander cannot click - though
         even there it is belt and braces: ai.js:4464 already re-tasks anything
         parked on its next think.

         The player keeps the two things that should be automatic and are not
         sorties: STRIP ALERT immediately above still scrambles against an
         aeroplane already in reach, which is air defence and not a mission;
         and an aircraft the player HAS sent somewhere still engages a
         radiating emitter on its own, which is what was asked for and is
         gated on the order the player gave. */
      /* THE EW AIRCRAFT'S PRIVILEGE, and it is the only self-launch a player's
         aircraft gets. Not a patrol - a target. It starts engines only when
         there is a battery transmitting inside the reach of the round it is
         carrying, and the attack it issues itself carries `then: rtb`, so the
         whole sortie is: find the radar, shoot it, come home. */
      if (this.parked && this.stance !== "hold" && !this.def.hover &&
          (this.def.role === "sead" || this.def.role === "ewair") &&
          this.fuel >= this.fuelMax - 1 &&
          (!this.ammoMax || this.ammo >= this.ammoMax - 0.05) &&
          this.hp >= this.maxHp * 0.5 && this.seadTarget(true)) {
        this.parked = false;
        this.order = { type: "hover" };
        return;
      }
      if (this.parked && this.owner && this.owner.isAI &&
          !this.def.hover && this.stance !== "hold" &&
          !this.def.tanker && !this.def.cargo &&
          (this.def.weapons.length || this.def.awacs || this.def.jam) &&
          this.fuel >= this.fuelMax - 1 &&
          (!this.ammoMax || this.ammo >= this.ammoMax - 0.05) &&
          this.hp >= this.maxHp * 0.5) {
        const st = this.patrolStation();
        this.parked = false;
        this.order = { type: "move", x: st.x, y: st.y };
      }
    } else { /* hover/idle */
      this.parked = false;
      if (this.def.hover && this.stance !== "hold") {
        const foe = this.acquire();
        if (foe) { this.order = { type: "attack", target: foe, auto: true }; return; }
      }
      /* head home once there is only enough fuel left to get there and land */
      if (this.fuel < Math.max(this.reserveFuel(), this.fuelMax * 0.40)) {
        this.order = { type: "rtb" };
      } else if (!this.def.hover) {
        /* ---- A FIXED-WING AIRCRAFT CANNOT HOLD STATION ----
           (owner) "all the fix wing aircraft cannot hanger. they must move or
           patrol." This branch was where that was being broken, and it was
           breaking it in the air rather than on the apron: "hover" and "idle"
           called no flyTo at all, so an aeroplane given one simply STOPPED,
           mid-air, at zero groundspeed, with this.moving left true at the top
           of updateAir so the tanks drained anyway. Measured on an F-15E put
           on {type:"hover"}: 0.0 tiles of path flown in 13 s and 20 of 100
           fuel gone; at the 40% floor it turned for home, landed, parked, and
           on a seat with no AI it was still sitting there 187 s later with
           full tanks and full pylons. That is the loop the owner is reporting,
           and it runs identically for the player's own aircraft and the
           machine's.
           A helicopter is the opposite case and is deliberately untouched: it
           CAN hold station, airBurn() returns 0 for def.hover so it costs
           nothing to do it, and the owner drew that distinction himself.
           So the jet flies a racetrack about the point where the hold began
           instead - the same CFG.CAP_RADIUS orbit the cap branch flies, and
           measured against it: 1,493 tiles of path for 9.4 tiles of net
           displacement over 180 s. The order type does NOT change, because
           "hover" is the re-taskable state three other places depend on:
           ai.js's sortie loop and driveWave() both test it, and afterAttack()
           returns it on purpose so a Weasel with held rounds stays somewhere
           the commander can find it. */
        if (o.hx === undefined) { o.hx = this.x; o.hy = this.y; }
        /* ...and a stand-off bomber holds on a circle clear of the rings its
           side knows, when they are near enough for this one to stray into
           (soLoiter): a Buff cannot fly this racetrack, 6.4 tiles across
           against its own 17-tile turning circle - measured at 94a0345, one
           sent to a point 25 tiles from a SAM Site strayed to 12.3 tiles of
           it */
        if (this.soLoiter(o, o.hx, o.hy, dt)) return;
        o.orbit = (o.orbit || 0) + dt * 0.9;
        const R = CFG.CAP_RADIUS * CFG.TILE;
        this.flyTo(o.hx + Math.cos(o.orbit) * R, o.hy + Math.sin(o.orbit) * R, dt);
      }
    }
  }

  /* Servicing on a ramp or a deck: fuel, ordnance and airframe repair in one
     place, so a building's revetment and a ship's flight deck do the same
     thing. Repair is charged exactly as the service depot charges for a
     vehicle - nothing else in the game could mend an aeroplane, so a damaged
     airframe stayed damaged for the rest of the match. */
  serviceOnPad(host, dt) {
    this.fuel = Math.min(this.fuelMax, this.fuel + 22 * dt);
    if (this.ammoMax) this.ammo = Math.min(this.ammoMax, this.ammo + 1.3 * dt);
    if (!host || host.dead || this.hp >= this.maxHp) return;
    const heal = this.maxHp * 0.05 * dt;
    if (this.owner.cash > 1 && this.owner.spend(heal * 0.12))
      this.hp = Math.min(this.maxHp, this.hp + heal);
  }

  /* ---- where a fixed-wing aircraft holds when nobody has given it a job ----
     Over our OWN ground, and chosen without one single fact about the enemy:
     the friendly structure standing furthest from the ramp this aircraft flew
     off, which is the forward edge of what we hold. A barrier patrol there
     covers the approach to everything behind it and cannot be mistaken for a
     strike, and because it reads no seenB, no seenU and no look grid it is
     fog-honest by construction rather than by inspection - there is nothing in
     it to be dishonest WITH. A commander whose only structure is the yard he
     started in orbits his own field, which is what base defence means. */
  patrolStation() {
    const pad = this.game.findPad ? this.game.findPad(this) : null;
    const hx = pad ? pad.x : this.owner.homeX, hy = pad ? pad.y : this.owner.homeY;
    let fx = hx, fy = hy, fd = 0;
    for (const b of this.owner.buildings) {
      if (b.dead || b.buildProgress < 1) continue;
      const d = U.dist2(b.x, b.y, hx, hy);
      if (d > fd) { fd = d; fx = b.x; fy = b.y; }
    }
    /* Seven tenths of the way out, not over it. This one is a judgement and
       not a measurement, and it is stated as such: the furthest structure a
       commander owns is very often a derrick standing in no-man's land, and
       an unordered patrol has no business orbiting the contested line. At 0.7
       the racetrack - CFG.CAP_RADIUS is another 3.2 tiles of it - still covers
       the approach to the forward edge while sitting in our own depth. */
    return { x: hx + (fx - hx) * 0.7, y: hy + (fy - hy) * 0.7 };
  }

  /* Fuel burn tuned so the airframe runs dry at ~1.18x a round trip to its
     stated combat radius. A MiG-21 therefore cannot reach where an F-22 can. */
  airBurn() {
    /* A helicopter is not endurance-limited here, so it burns nothing and
       stays on station until its ordnance is gone. Showing a fuel gauge
       creeping to zero on something that cannot run out would just be noise.

       Test the HOVER flag, not the jet flag. Turboprop fixed-wing aircraft -
       the AC-130 and the C-130 - are not helicopters and do have to land, but
       gating on `jet` exempted them too. Combined with gunship weapons that
       consume no ordnance, that left the AC-130 with nothing at all that could
       ever send it home: not fuel, not ammunition. It simply orbited forever. */
    if (this.def.hover) return 0;
    const R = this.def.radius;
    if (!R) return CFG.FUEL_BURN_AIR;
    /* enough for a round trip to the stated radius, plus real time on station */
    const sp = Math.max(0.5, this.def.speed);
    const trip = (2 * R / sp) * 1.15;
    return this.fuelMax / (trip + CFG.AIR_LOITER);
  }

  /* fuel needed to get back to the nearest ramp, plus a margin for the
     approach. This is what gives each airframe a real combat radius.
     `raw`: without the cap at nine tenths of the tanks - the true figure,
     for a transport deciding whether it can leave a strip at all (AIRLIFT
     LANDING, airlandCanGo), where "more than it holds" has to read as that -
     and to the ramp, never to a tanker: what a transport flies off a strip
     is a plain rtb, and an rtb goes to the ramp (stage-1b review, measured:
     a C-17 down 62 tiles out, let go on 10.5 by a tanker beside its strip,
     reached its ramp on 0.0, inside the four seconds the tanks may stand
     empty before it falls). */
  reserveFuel(raw) {
    const pad = this.game.findPad ? this.game.findPad(this) : null;
    let hx = pad ? pad.x : this.owner.homeX, hy = pad ? pad.y : this.owner.homeY;
    /* A tanker orbiting forward IS somewhere to get fuel, and a nearer one
       than the airfield. Measuring the reserve to it is what lets a fighter
       hold station instead of turning for home - the tanker does not add
       fuel to the aircraft so much as it moves the edge of the map. */
    const tk = !raw && this.game.nearestTanker ? this.game.nearestTanker(this) : null;
    if (tk && U.dist2(this.x, this.y, tk.x, tk.y) < U.dist2(this.x, this.y, hx, hy)) {
      hx = tk.x; hy = tk.y;
    }
    const d = U.dist(this.x, this.y, hx, hy) / CFG.TILE;          // tiles home
    const sp = Math.max(0.5, this.def.speed);                     // tiles/sec
    const burn = this.airBurn() * ((FACTIONS[this.owner.faction] || {}).fuelMul || 1);
    const need = d / sp * burn * 1.35 + 8;
    return raw ? Math.max(10, need) : U.clamp(need, 10, this.fuelMax * 0.9);
  }
  /* the same, as if it stood at (x, y): what a transport must still hold
     when it gets to a strip there (game.js G.airlandFuel) */
  reserveAt(x, y, raw) {
    const ox = this.x, oy = this.y;
    this.x = x; this.y = y;
    const r = this.reserveFuel(raw);
    this.x = ox; this.y = oy;
    return r;
  }
  /* the radius this airframe can strike to and still get home, in tiles */
  combatRadius() {
    const sp = Math.max(0.5, this.def.speed);
    const burn = this.airBurn() * ((FACTIONS[this.owner.faction] || {}).fuelMul || 1);
    return Math.max(1, (this.fuelMax / burn) * sp * 0.5 * 0.85);
  }

  /* what an aircraft does when its target dies or its track is lost */
  afterAttack(o, short) {
    /* a SNIFF patrol's turn-in that ended with no round away goes back to
       its beat (sniffBack); dry, the turnaround carries the beat home */
    if (o.sniff) return this.sniffBack(o);
    if (o.cap && o.resume) return { type: "cap", x: o.resume.x, y: o.resume.y };
    if (o.resume) return { type: "attackmove", x: o.resume.x, y: o.resume.y };
    /* AND FLEE. An order that says where to go when the shooting stops is
       obeyed - the `tank` branch has always carried `then` and this is the
       same field. It is what the self-launched SEAD shot sets, and without it
       a Weasel fell through to the allWeaponsHeld case below, hovered over the
       battery it had just fired at, and was immediately handed the next
       emitter by the same block that sent it - which is loitering, not
       fleeing, and it is how one aircraft walked itself across the map. */
    if (o.then) return o.then;
    if (this.nextOrder && this.orders && this.orders.length) {
      if (this.nextOrder()) return this.order;
    }
    /* ---- AND THE MISSION SURVIVES RUNNING DRY ----
       These two returned a BARE rtb, which loses the order the player gave at
       the exact moment it is most normal to lose it: the aircraft has just
       spent its ordnance on the target it was sent to. The bingo-fuel branch
       in updateAir carries the strike home and back; this path did not, so an
       aircraft that emptied its pylons mid-attack landed and stayed landed.
       Measured: a B-52H came back and an AC-130J did not, over a 170-second
       window, final orders "attack" and "parked" - the Buff hit bingo FUEL and
       kept its mission, the gunship ran out of AMMUNITION and lost it.
       Same rule for both now: if the target is still alive, come home, rearm,
       and go back to it. */
    const live = o.type === "attack" && o.target && !o.target.dead;
    const carry = live
      ? { type: "attack", target: o.target, resume: o.resume, cap: o.cap,
          auto: o.auto, release: o.release }
      : null;
    if (short || this.ordnanceDry())
      return carry ? { type: "rtb", then: carry } : { type: "rtb" };
    if (this.fuel < Math.max(this.reserveFuel(), this.fuelMax * 0.40))
      return carry ? { type: "rtb", then: carry } : { type: "rtb" };
    /* A station-keeping attackmove only works because acquire() finds the next
       contact. An airframe whose every round is held cannot acquire, so that
       order is inert and - worse - the AI air loop re-tasks only hover, parked
       and idle, so a Weasel that killed one emitter loitered with three
       missiles for the rest of the sortie. Hover instead: it is the same
       station, and it is a state both the AI and the player can act on. */
    if (this.allWeaponsHeld && this.allWeaponsHeld()) return { type: "hover" };
    return { type: "attackmove", x: this.x, y: this.y };
  }

  /* A banked turn around a point at a fixed radius. The aim point is set
     ahead of the aircraft's own bearing from the target, so it is always
     chasing a spot on the circle and never arrives - which is what keeps a
     fixed-wing aeroplane moving while it shoots. Left-hand, because an AC-130
     and every other side-firing gunship orbits left with the guns on the port
     side, and because a consistent direction stops two aircraft on the same
     target flying into each other. */
  orbitAround(t, radius, dt, dir) {
    const a = Math.atan2(this.y - t.y, this.x - t.x);
    const lead = 0.55 * (dir === -1 ? -1 : 1);   // radians ahead on the circle
    return this.flyTo(t.x + Math.cos(a + lead) * radius,
                      t.y + Math.sin(a + lead) * radius, dt);
  }
  /* A circle of radius r (pixels) round (cx, cy), FLOWN at r. Chasing a
     point `lead` ahead on its circle, orbitAround() settles where the line to
     that point is the tangent - at cos(0.55) = 0.85 of the radius it is
     handed (measured, a B-52H handed 14.3 tiles flies 12.2) - so it is handed
     r / cos(0.55). And it is JOINED on the tangent from outside: flown
     straight at, a circle is overshot by up to a turning radius, which for a
     Buff is 8.5 tiles. `dir` is which way round (G.soDir: the way it is
     already going, so it never reverses its turn); left out, orbitAround's
     own left-hand way. `guard`: the join is flown by soFlyTo. */
  flyOrbit(cx, cy, r, dt, dir, guard) {
    const dx = this.x - cx, dy = this.y - cy, D = Math.hypot(dx, dy);
    const s = dir === -1 ? -1 : 1;
    if (D > r + CFG.TILE * 1.5) {
      const a = Math.atan2(dy, dx), b = Math.acos(r / D);
      const jx = cx + Math.cos(a + s * b) * r, jy = cy + Math.sin(a + s * b) * r;
      return guard ? this.soFlyTo(jx, jy, dt) : this.flyTo(jx, jy, dt);
    }
    return this.orbitAround({ x: cx, y: cy }, r / Math.cos(0.55), dt, s);
  }
  turnRadius() { return this.def.speed / Math.max(0.05, this.def.turn) * CFG.TILE; }
  /* ---- AND IT TURNS AWAY FROM THEM ----
     flyTo turns the short way round, and a heavy aeroplane's turn is a
     circle of its own - seventeen tiles across for a Buff - so a route clear
     of every ring is no use if the turn onto it is not. MEASURED: a B-52H
     on an attack-move round a SAM Site took up a target as it passed, and
     its launch circle lay behind it; the short way round was toward the
     battery, and the turn carried it from 26.2 to 12.3 tiles of a battery
     that reaches 14.0. So a stand-off bomber flying by the rings lays the
     arc of any turn of more than half a radian against them first, and if
     the short way crosses one and the long way does not, it turns the long
     way - held until it is round, so it does not change its mind halfway. */
  soFlyTo(px, py, dt) {
    const g = this.game, now = g.time;
    let d = Math.atan2(py - this.y, px - this.x) - this.ang;
    d = Math.atan2(Math.sin(d), Math.cos(d));
    const gd = this.soGuard, TL = CFG.TILE;
    if (gd && gd.until > now && gd.o === this.order) {
      if ((d > 0 ? 1 : -1) !== gd.s && Math.abs(d) > 0.15) {
        const a = this.ang + gd.s * 1.2;
        this.flyTo(this.x + Math.cos(a) * TL * 20, this.y + Math.sin(a) * TL * 20, dt);
        return false;
      }
      this.soGuard = null;
    } else if (Math.abs(d) > 0.5 && g.standoffRings) {
      const R = g.standoffRings(this.owner), s = d > 0 ? 1 : -1;
      if (R.length && this.soSweepHits(R, s, Math.abs(d)) &&
          !this.soSweepHits(R, -s, U.PI2 - Math.abs(d))) {
        this.soGuard = { s: -s, o: this.order,
                         until: now + (U.PI2 - Math.abs(d)) / Math.max(0.05, this.def.turn) + 1 };
        const a = this.ang - s * 1.2;
        this.flyTo(this.x + Math.cos(a) * TL * 20, this.y + Math.sin(a) * TL * 20, dt);
        return false;
      }
    }
    return this.flyTo(px, py, dt);
  }
  /* does a turn of `span` radians, the way `s` says (1 angle increasing),
     from here and on this heading, pass inside a ring of R grown by the
     stand-off margin? */
  soSweepHits(R, s, span) {
    const TL = CFG.TILE, tr = this.turnRadius(), th = this.ang;
    const pad = (this.game.STANDOFF_MARGIN || 1) * TL;
    const cx = this.x - Math.sin(th) * tr * s, cy = this.y + Math.cos(th) * tr * s;
    const a0 = Math.atan2(this.y - cy, this.x - cx), n = Math.max(2, Math.ceil(span / 0.3));
    for (let k = 1; k <= n; k++) {
      const a = a0 + s * span * k / n, x = cx + Math.cos(a) * tr, y = cy + Math.sin(a) * tr;
      for (let i = 0; i < R.length; i += 3) {
        const rr = R[i + 2] * TL + pad;
        if (U.dist2(x, y, R[i], R[i + 1]) < rr * rr) return true;
      }
    }
    return false;
  }

  /* ================= THE STAND-OFF RULE =================
     (owner) "b52H should shoot missle far away instead of bomb under the sam
     range." The rule is about a WEAPON on a kind of aircraft, not about a
     flag: a guided round against the surface that is not an anti-radiation
     missile, carried by a heavy or stealth bomber. Every army's bomber that
     carries one flies by it - the B-52G and H, the H-6D, K and N, the
     Tu-160 and Tu-160M, the Vulcan B.2's Blue Steel and the Mirage IVP's
     ASMP - because a stand-off missile is launched from outside the
     defences whoever builds it; that is what the words mean. NOT by it:
       - an anti-radiation round, which is fired from the edge of the very
         battery it is attacking (the Weasel's job, its own branch);
       - a bomb, which has to be delivered over the target (the B-52D over
         Hanoi, the Valiant's Blue Danube, a B-2's JDAM);
       - a strike aircraft (role "cas"), a gunship and the AC-130, which
         press a commanded attack into a defended area because that is their
         job and a player who orders it means it (the transit rule's own
         line, above) - the Tornado's Taurus included;
       - a helicopter, which hovers.
     Memoised per def and re-read if the mount list is ever replaced, the
     way gunMix() is. */
  static standoffRound(w) {
    return !!w && w.proj === "missile" && !w.antiRadiation && !!w.tgt && !w.tgt.air &&
           !!(w.tgt.ground || w.tgt.sea);
  }
  static ringsDiffer(a, b) {
    if (a === b) return false;
    if (!a || !b || a.length !== b.length) return true;
    for (let i = 0; i < a.length; i++)
      if (Math.abs(a[i] - b[i]) > (i % 3 === 2 ? 0.1 : CFG.TILE * 0.5)) return true;
    return false;
  }
  standoffAir() {
    const d = this.def;
    if (this.layer !== "air" || d.hover || (d.role !== "heavybomber" && d.role !== "stealthbomber")) return false;
    const memo = Unit.soAirMemo || (Unit.soAirMemo = new WeakMap());
    const m = memo.get(d);
    if (m && m.ws === d.weapons) return m.v;
    let v = false;
    for (const k of (d.weapons || [])) if (Unit.standoffRound(WEAPONS[k])) { v = true; break; }
    memo.set(d, { ws: d.weapons, v: v });
    return v;
  }
  /* The reach to plan with: the longest stand-off round aboard that can be
     put onto this target now, and its arming distance. Longest, not the one
     pickWeapon would choose at this moment - a present-day B-52H shoots a
     ship with LRASM once it is close enough, but from where it has to stand
     outside a Type 055's rings only its JASSM-ER reaches. `ordered` counts a
     held round as the order will release it: ai.js asks before it orders. */
  standoffReachOf(t, ordered) {
    let reach = 0, minR = 0;
    const tl = t.targetLayer ? t.targetLayer() : "ground";
    for (let i = 0; i < this.def.weapons.length; i++) {
      const w = WEAPONS[this.def.weapons[i]];
      if (!Unit.standoffRound(w) || (!ordered && this.holdsFire(w))) continue;
      if (this.ammoMax && !this.canAfford(w)) continue;
      if (w.tgt && !w.tgt[tl]) continue;
      if (w.landAttack && t.kind !== "building") continue;
      const r = this.weaponRange(w);
      if (r > reach) { reach = r; minR = (w.minRange || 0) * CFG.TILE; }
    }
    return { reach: reach, minR: minR };
  }
  /* Can this bomber put a stand-off round onto t from outside every ring
     its side knows of? ai.js asks it of every target it would give one.
     The question is asked without the route (noRoute: a commander asks it
     of every candidate), so a target flyStandoff has since found no way to
     - and struck off (soNo) - is answered no until it is struck back on,
     or the commander would hand the same order straight back each think. */
  standoffReach(t) {
    if (!t || !this.standoffAir()) return true;
    if (this.soNo && this.soNo.get(t.id) > this.game.time) return false;
    const rr = this.standoffReachOf(t, true);
    if (!rr.reach || !this.game.standoffLaunch) return true;
    return !this.game.standoffLaunch(this.owner, this.x, this.y, t.x, t.y,
      { reach: rr.reach, minR: rr.minR, turnR: this.turnRadius(), noRoute: true }).held;
  }
  /* The attack, flown by the rule. The plan is kept on the order and made
     again when what the side knows changes, when the target moves, when the
     round in hand changes, and every three seconds from where the aircraft
     then is - never every frame: G.standoffLaunch walks the rings and, when
     the way is blocked, a small route search.
     `aim`, for an AREA ATTACK (areaStandoff): the circle is planned round
     t, the middle of the bomber's lane, with the reach cut by `aim.pad` so
     that the whole lane is in reach from it, and the round goes at aim.t,
     the point of the lane it is due on. Planned round each aimpoint in
     turn instead, the plan was remade whenever the next one lay more than
     1.5 tiles on, and a B-52H joining each new circle came to 15.1 tiles
     of a SAM Site whose ring it was planning round at 17.5; planned round
     the middle, it kept 18.8 tiles off it for all 21 rounds
     (tools/jsc/areafire_check.js). */
  flyStandoff(o, t, wi, w, range, dist, dt, aim) {
    const g = this.game, TL = CFG.TILE, now = g.time;
    const rr = this.standoffReachOf(t, false);
    const reach0 = rr.reach || range, minR = rr.reach ? rr.minR : (w.minRange || 0) * TL;
    const reach = aim ? Math.max(reach0 * 0.5, reach0 - aim.pad) : reach0;
    const rings = g.standoffRings(this.owner);
    let sp = o.so;
    const moved = !!sp && U.dist(sp.tx, sp.ty, t.x, t.y) > TL * 1.5;
    if (!sp || moved || sp.reach !== reach || now - sp.t >= 3 ||
        (now - sp.t >= 0.5 && Unit.ringsDiffer(sp.rings, rings))) {
      const prev = sp;
      sp = o.so = g.standoffLaunch(this.owner, this.x, this.y, t.x, t.y, {
        reach: reach, minR: minR, turnR: this.turnRadius(), rings: rings,
        home: { x: this.owner.homeX, y: this.owner.homeY }, ang: this.ang,
        keep: prev ? { cx: prev.cx, cy: prev.cy, dir: prev.dir } : null,
        prefer: prev && !prev.held && prev.kind === "offset" ? { x: prev.cx, y: prev.cy } : null });
      sp.t = now; sp.rings = rings; sp.reach = reach; sp.tx = t.x; sp.ty = t.y;
    }
    if (sp.held) {
      /* No point within the round's reach of the target lies outside the
         rings. An engagement nobody ordered, or a commander's order, is not
         worth the airframe: the target is struck off for twenty seconds so
         acquire() does not hand it straight back, and the aircraft returns
         to where its owner can re-task it - ai.js asks standoffReach() before
         it gives an order, so this is the commander learning of a battery
         after it gave one. The PLAYER'S order stands: the bomber holds short
         of the rings, says so once, and goes in the moment a launch point
         opens - a battery killed, a target that moves - or when the player
         sets it aggressive. */
      if (o.auto || this.owner !== g.human) {
        (this.soNo || (this.soNo = new Map())).set(t.id, now + 20);
        this.order = o.auto
          ? this.afterAttack({ type: "attack", target: null, resume: o.resume, cap: o.cap, then: o.then })
          : { type: "hover" };
        return;
      }
      if (this.warnedReach !== t) {
        this.warnedReach = t;
        g.alert(this.def.name.toUpperCase() +
                " — HOLDING SHORT OF AIR DEFENCE: TARGET BEYOND STAND-OFF REACH", "bad");
      }
    } else this.warnedReach = null;
    /* the route round the rings, then the circle */
    const via = sp.via;
    while (via.length && U.dist(this.x, this.y, via[0].x, via[0].y) < TL * 2.2) via.shift();
    if (via.length) this.soFlyTo(via[0].x, via[0].y, dt);
    else if (sp.kind === "around") this.flyOrbit(t.x, t.y, sp.r, dt, sp.dir, true);
    else this.flyOrbit(sp.cx, sp.cy, sp.r, dt, sp.dir, true);
    /* and the round goes whenever the target is inside its reach - the same
       0.968 of range the orbit below has always fired at (hold x 1.10) */
    const ft = aim ? aim.t : t, fd = aim ? U.dist(this.x, this.y, ft.x, ft.y) : dist;
    if (fd <= range * 0.968 && fd >= (w.minRange || 0) * TL) {
      this.tryFire(wi, ft);
      /* an area strike's last round hands on the way the strike does
         (areaDone): afterAttack() took the queue up with nothing aboard, and
         a move queued behind the strike was dropped at the next tick's
         bingo check (updateAir) instead of being flown after the rearm */
      if (this.ordnanceDry()) this.order = aim ? this.areaDone() : this.afterAttack(o);
    }
  }
  /* ---- AREA ATTACK, flown (see AREA ATTACK above bombard) ----
     One run per bomber down its lane, then home: what is aboard goes on
     that lane, and the turnaround is the ordinary rtb/rearm. A strike
     broken off for fuel before it is flown is carried across the
     turnaround (updateAir, areaResume) as a strike on a named target is. */
  areaStrike(o, dt) {
    const w = o.area ? WEAPONS[this.def.weapons[o.wi]] : null;
    /* setOrder stamped release on this order, so a held round aboard - the
       Tu-160M's Kh-101 - goes; a round that is still held is not this
       order's to fire */
    if (!w || this.holdsFire(w)) { this.order = this.areaDone(); return; }
    if (o.mode === "stick") this.areaStick(o, w, dt);
    else this.areaStandoff(o, w, dt);
  }
  /* how far out the bomb run begins: room for a heavy aeroplane to turn
     onto the line and settle on it (three of its own turning radii - 26
     tiles for a B-52, 11 for a B-2), and the bomb's forward throw */
  areaRunIn() {
    return Math.max(3 * this.turnRadius(), 8 * CFG.TILE) +
           this.def.speed * this.speedMul() * CFG.TILE * 0.7;
  }
  /* which way down the lane to run: from the end whose run-in point is
     nearer, unless that point is off the map and the other is not */
  areaEntry(a) {
    const T = CFG.TILE, M = this.game.map, D = a.hl + this.areaRunIn();
    let best = 1, bd = Infinity;
    for (const dir of [1, -1]) {
      const px = a.cx - a.ux * dir * D, py = a.cy - a.uy * dir * D;
      const off = px < 2 * T || py < 2 * T || px > M.W * T - 2 * T || py > M.H * T - 2 * T;
      const d = U.dist(this.x, this.y, px, py) + (off ? 1e7 : 0);
      if (d < bd) { bd = d; best = dir; }
    }
    return best;
  }
  /* ---- A STICK DOWN THE RUN ----
     A bomb load goes as a stick: the whole of it, spread evenly down the
     lane's length, bomb k of n landing (k + 0.5)/n of the way along. The
     intervalometer is the aircraft's own position, not the weapon's reload
     and burst figures - those time a strike's passes over one target (the
     B-52D's six bombs 0.22 s apart, then a second's reload), and at that
     rate a 48-bomb load would string out over 77 tiles. Each bomb is
     released lead = 0.7 s of flight short of its point, the 0.7 s a bomb
     falls in combat.js, so it is carried forward onto the point and not
     thrown at it; and only while the aircraft is within the bomb's own
     reach of the line - one that has wandered off it keeps the rest, and
     lines up again from the far end (at most twice). It is flown to a
     point a run-in short of the lane (areaRunIn), or from wherever it is
     if it is already farther back than that, and held on the line by
     steering for a point a turning radius ahead on it. Every bomb is the
     airframe's own weapon through Combat.fire, and costs its share of a
     release from the magazine (w.ammo over the burst). */
  areaStick(o, w, dt) {
    const T = CFG.TILE, a = o.area, dir = o.dir === -1 ? -1 : 1;
    const rx = a.ux * dir, ry = a.uy * dir, L = 2 * a.hl;
    const ax = a.cx - rx * a.hl, ay = a.cy - ry * a.hl;          // the run begins
    const tr = this.turnRadius(), lead = this.def.speed * this.speedMul() * T * 0.7;
    const per = (w.ammo || 1) / (w.burst || 1);
    const px = this.x - ax, py = this.y - ay;
    const s = px * rx + py * ry, lat = py * rx - px * ry;         // along the run, and off it
    if (o.phase !== "run") {
      /* already behind the start of the run-in, it is on the run from here:
         the line is joined over all the way still to go. Flown out to the
         point first, then turned onto the line there, a B-52D was still
         2.4 tiles off it at the first release, against a bomb's 2.6 tiles
         of reach; joined from where it was, 1.1. */
      const D = this.areaRunIn(), M = this.game.map;
      const ix = U.clamp(ax - rx * D, 2 * T, M.W * T - 2 * T), iy = U.clamp(ay - ry * D, 2 * T, M.H * T - 2 * T);
      if (s > -D && U.dist(this.x, this.y, ix, iy) > Math.max(2.2 * T, tr * 0.8)) { this.flyTo(ix, iy, dt); return; }
      o.phase = "run"; o.k = 0;
      o.n = this.ammoMax ? Math.floor((this.ammo + 0.01) / (w.ammo || 1)) * (w.burst || 1) : (w.burst || 1);
    }
    const look = Math.max(tr, 3 * T);
    this.flyTo(ax + rx * (s + look), ay + ry * (s + look), dt);
    const reach = this.weaponRange(w);
    while (o.k < o.n && this.ammo >= per - 0.01) {
      const sk = L * (o.k + 0.5) / o.n;
      if (s + lead < sk) break;
      if (Math.abs(lat) <= reach && s + lead <= sk + reach) {
        Combat.fire(this.game, this, w, Unit.groundAim(ax + rx * sk, ay + ry * sk));
        this.ammo = Math.max(0, this.ammo - per);
      }
      o.k++;
    }
    if (o.k < o.n && s <= L + lead + 2 * T) return;
    /* the run is over: the bay reloads as after any release */
    this.cooldowns[o.wi] = w.reload / CFG.VET_ROF[this.vet];
    if (this.canAfford(w) && (o.pass || 0) < 2) {
      o.pass = (o.pass || 0) + 1; o.dir = -dir; o.phase = "in";
      return;
    }
    this.order = this.areaDone();
  }
  /* ---- STAND-OFF ROUNDS ON SEPARATE AIMPOINTS ----
     A missile load goes one round to each point of a lattice over the lane,
     as many points as rounds aboard, and every one is released at
     coordinates exactly as a strike on a target is: the launch orbit
     flyStandoff() plans outside the rings the side knows of - round the
     lane's middle, near enough for the whole lane to be in reach - a
     phantom at the aimpoint as the target (the coordinates are the cue,
     Combat.fire), the airframe's own reload between rounds. A new phantom per aimpoint -
     a guided round re-aims at its target every tick, so moving one phantom
     on would drag the round already in the air after it. Aggressive stance
     presses in, as it does on a strike: the attack branch's circle at the
     edge of reach. */
  areaStandoff(o, w, dt) {
    const a = o.area, T = CFG.TILE;
    if (o.k >= (a.nu || 1) * (a.nv || 1) || !this.canAfford(w)) { this.order = this.areaDone(); return; }
    if (!o.ph) { const p = Unit.areaPoint(a, o.k); o.ph = Unit.groundAim(p.x, p.y); }
    if (!o.mid) o.mid = Unit.groundAim(a.cx, a.cy);
    const t = o.ph, range = this.weaponRange(w), dist = U.dist(this.x, this.y, t.x, t.y);
    const cd0 = this.cooldowns[o.wi];
    if (!this.def.hover && this.stance !== "aggressive" && this.standoffAir() && this.game.standoffLaunch) {
      /* the launch circle round the lane's middle, the round at its point */
      this.flyStandoff(o, o.mid, o.wi, w, range, U.dist(this.x, this.y, a.cx, a.cy), dt,
                       { t: t, pad: Math.hypot(a.hl, a.hw) });
    } else {
      const hold = range * 0.88;
      if (dist > hold * 1.06) this.flyTo(t.x, t.y, dt);
      else this.orbitAround(t, hold, dt);
      if (dist <= hold * 1.10 && dist >= (w.minRange || 0) * T) this.tryFire(o.wi, t);
    }
    if (cd0 <= 0 && this.cooldowns[o.wi] > 0) { o.k++; o.ph = null; }
    if (this.order === o && this.ordnanceDry()) this.order = this.areaDone();
  }
  /* the strike is flown: home to rearm, or on to what was queued behind it -
     taken through nextOrder(), so setOrder() releases it as it would any
     queued order, and carried home first when there is nothing aboard to
     fly it with */
  areaDone() {
    if (this.orders && this.orders.length && this.nextOrder()) {
      const nx = this.order;
      if (this.ordnanceDry() || this.fuel < Math.max(this.reserveFuel(), this.fuelMax * 0.40))
        return { type: "rtb", then: nx };
      return nx;
    }
    return { type: "rtb" };
  }
  /* The same strike, to be flown again after a turnaround: a stick from the
     top with what is aboard then, the stand-off lattice from the point it
     had reached. `release` travels with it, as it does with a strike's
     (updateAir): the hand-back assigns it straight to this.order. */
  areaResume(o) {
    return { type: "areastrike", mode: o.mode, wi: o.wi, area: o.area, dir: o.dir,
             k: o.mode === "stick" ? 0 : o.k, pass: 0, release: o.release };
  }

  /* ================= SNIFF =================
     (owner) "can you [make the] electronic war airplane have a sniff mode
     like patrol, but when it sniffs the radar or SAM, it will launch the
     missile and run away." A standing order for a SEAD or EW aircraft that
     carries an anti-radiation round (sniffMount): fly a beat, LISTEN, and
     when an enemy air-defence set that is transmitting comes within reach,
     turn in, put a round on it from as far out as the round goes, break
     away to outside that site's ring, and go back to the beat. Player only:
     ai.js flies its own SEAD drill and never gives this order.

     THE BEAT is a point (a click: a circle round it at the combat air
     patrol's radius, or the aeroplane's own turn if that is wider) or a
     line (a drag: flown end to end, joined at the nearer end). Like a held
     patrol it keeps out of the rings its side knows (sniffRings): an end, or
     the circle, inside one is pulled back toward home to the margin outside
     them by the transit hold's own rule (G.standoffPoint), and one that
     strays in on a turn goes straight out again, so it never loiters in an
     envelope. Aggressive stance flies the beat as drawn.

     THE CONTACT is what seadTarget() names for the Weasel's own shot, asked
     with an approach: an enemy radar, SAM or jammer that can engage
     aircraft, or whose whole job is to transmit; ON THE AIR (G.jamming - a
     set its crew switches off cannot be sniffed, which stays the counter);
     and on the side's air picture, SEEN or HEARD (G.airPlotKnows: our eyes,
     or a receiver of ours within 1.9 x the set's own reach). Nothing is read
     that seadTarget does not already read. It has to lie within the round's
     reach plus SNIFF.APPROACH, 8 tiles: the beat stops 2.5 tiles outside a
     ring the side knows (1.5 for a jammer), and a HARM (16 tiles, 17.3 with
     NATO's range) has 2.7 to close to a SAM Site from there (ring 17.5) -
     but a 1960s Shrike (8.6, 9.3) has 6.2 to an S-75 (ring 13.0) and a
     Kh-28 (8.2) 7.6 to an Improved HAWK (13.3). At 6.2 to 8.6 tiles a
     second that is about a second of flight.

     THE SHOT is the self-issued attack the Weasel already gives itself - auto,
     carrying release, so pickWeapon() finds the held round by the ordinary
     path and tryFire() fires it, seeker lock test (G.armLock) and all -
     marked `sniff`, which runs it in on the tangent of the round's reach
     and lets the round go the first tick the contact is inside it
     (sniffShot), not at the 0.968 of it the attack orbit fires at.
     Measured (tools/jsc/sniff_check.js [3]): an F-16CJ that HEARD a SAM
     Site 24.4 tiles off, and did not see it, put its HARM away at 17.27
     tiles of its 17.28-tile reach, 1.5 s after it turned in.

     ONE ROUND A PASS from each aircraft, and at most TWO in the air at a
     site that shoots aircraft (one at a pure sensor or jammer) from the
     whole side. Measured: a HARM hit is 630 on a SAM Site of 850 and 504 on
     an S-400 or a Patriot of 600-640, so a site takes two. A lone Weasel puts
     them in on two passes - shoot, look, shoot - rather than holding at the
     edge of the envelope through a six-second reload; a pair puts both in on
     one pass, and a third aircraft looks for other work. Nobody turns in on
     a contact again while its own round to it is still in the air, nor
     while two are (owner.sniffOn, sniffBusy).

     AND RUN (sniffEgress): the tick the round is away it breaks from the
     site, straight and at full speed, for a point outside that site's ring
     (G.airDefenceReach x 1.25, as G.airThreatRings draws every ring) plus
     the margin - straight away from the site when that point is clear of
     every other ring the side knows, else the nearest bearing that is -
     and then back to the beat. Not the stand-off launch orbit, which can
     overshoot into a ring. Measured ([4]): 0.2 s inside the ring after the
     shot, never nearer than 17.2 tiles to a SAM Site that reaches 14.0,
     the break over 1.5 s after the shot and 25.9 tiles out.

     OUT OF ROUNDS it finishes its break, then goes home, rearms and
     refuels by the ordinary turnaround with the order carried across it
     (updateAir, sniffResume) as a patrol and an area strike are, and takes
     the beat up again by itself. Bingo fuel turns it for home at once, from
     anywhere, and it comes back after refuelling. Any new order ends it. */

  /* What this airframe sniffs with: { wi, w } - its anti-radiation mount for
     ground targets, the longest-reaching if it has two - or { why } it
     cannot take the order. Asked of the airframe, not the magazine: one
     rearming on its ramp can take it, and is told it is rearming. */
  sniffMount() {
    const d = this.def, ws = d.weapons || [];
    if (this.layer !== "air" || (d.role !== "sead" && d.role !== "ewair"))
      return { why: "ONLY A SEAD OR EW AIRCRAFT WITH AN ANTI-RADIATION MISSILE SNIFFS" };
    let wi = -1;
    for (let i = 0; i < ws.length; i++) {
      const w = WEAPONS[ws[i]];
      if (!w || !w.antiRadiation || !w.tgt || !w.tgt.ground) continue;
      if (wi < 0 || w.range > WEAPONS[ws[wi]].range) wi = i;
    }
    if (wi >= 0) return { wi: wi, w: WEAPONS[ws[wi]] };
    return { why: "NO ANTI-RADIATION MISSILE ABOARD" +
                  (d.jam ? " \u2014 STRIKE (T) A BATTERY TO JAM IT" : " \u2014 ITS RECEIVERS CUE THE SHOOTERS") };
  }
  /* the order for a beat from (x, y) to (x1, y1), a point where they meet */
  sniffOrder(x, y, x1, y1) {
    if (this.sniffMount().why) return null;
    return { type: "sniff", x: x, y: y, x1: x1, y1: y1 };
  }
  /* the same beat, from the top, after a turnaround: joined at whichever end
     is nearer when it gets there */
  sniffResume(o) {
    return { type: "sniff", x: o.x, y: o.y, x1: o.x1, y1: o.y1 };
  }
  /* ---- ESCORT (updateAir) ----
     The point an escort holds over: the unit's own, or - while it is aboard -
     the hull, the hold or the building it rides in, so a battalion put aboard
     a ship is escorted as the ship. Marks the order `lost` when the unit is
     dead or no longer ours or an ally's, and leaves x, y on the last place it
     was; aboard something it cannot find, the last point is kept. */
  escortFix(o) {
    const t = o.target;
    if (!t || t.dead || (t.owner !== this.owner && !this.game.allied(this.owner, t.owner))) {
      o.lost = true; return;
    }
    let at = t;
    if (t.carried) {
      at = t.garrisonIn && !t.garrisonIn.dead ? t.garrisonIn : this.escortHost(o, t);
      if (!at) return;
    }
    /* and how fast it is going, smoothed over about a second: the orbit is
       flown round where it is about to be (escortOrbit, the branch) */
    const now = this.game.time, dtt = o.vt !== undefined ? now - o.vt : 0;
    if (dtt > 0 && o.x !== undefined) {
      const k = Math.min(1, dtt * 1.5);
      o.vx = (o.vx || 0) + ((at.x - o.x) / dtt - (o.vx || 0)) * k;
      o.vy = (o.vy || 0) + ((at.y - o.y) / dtt - (o.vy || 0)) * k;
    }
    o.vt = now;
    o.x = at.x; o.y = at.y;
  }
  /* what a carried unit rides in: a transport's hold or a well deck. Nothing
     points from a passenger to its ship, so the side's units are walked -
     once per embarkation: the answer is kept on the order and only checked
     after that. */
  /* The patrol's orbit (updateAir, cap) round (cx, cy): straight in from
     further out than 1.25 of the radius, then chasing a point that walks
     round the circle. One rule for the station over the unit and for a
     station held short of a ring. */
  escortOrbit(o, cx, cy, dt) {
    const R = this.escortRadius() * CFG.TILE;
    if (U.dist(this.x, this.y, cx, cy) > R * 1.25) { this.flyTo(cx, cy, dt); return; }
    o.orbit = (o.orbit || 0) + dt * (this.def.jet ? 0.9 : 0.5);
    this.flyTo(cx + Math.cos(o.orbit) * R, cy + Math.sin(o.orbit) * R, dt);
  }
  /* Its radius, in tiles: the patrol's CAP_RADIUS, or a little more than
     this airframe's turning radius (speed / turn) where that is wider. The
     patrol's 3.2-tile circle is tighter than an E-2D can turn (4.4 tiles),
     so on it the aircraft flies a string of overshoots and loops, each one
     a turning circle wide - harmless over a fixed point, and the reason an
     escort fell behind a moving one. */
  escortRadius() {
    const turnR = this.def.hover ? 0 : this.def.speed / Math.max(0.001, this.def.turn);
    return Math.max(CFG.CAP_RADIUS, turnR * 1.15);
  }
  /* How far, in tiles, that orbit can carry this airframe from its middle:
     the join radius, and a whole turning circle beyond it - past the join
     radius it flies straight for the middle, and the furthest it can be
     carried before it has turned round is that circle's width. It is the
     bound tools/jsc/escort_check.js holds a moving escort to (an E-2D: 15.1
     tiles; measured, 11.9 at worst behind a destroyer making 2.1 tiles a
     second, 5.4 on average), and what a known ring is held off by on top of
     the margin. A helicopter turns on the spot. */
  escortReach() {
    const turnR = this.def.hover ? 0 : this.def.speed / Math.max(0.001, this.def.turn);
    return this.escortRadius() * 1.25 + turnR * 2;
  }
  escortHost(o, t) {
    const aboard = (s) => !!s && !s.dead &&
      ((s.cargo && s.cargo.indexOf(t) >= 0) || (s.well && s.well.indexOf(t) >= 0));
    if (aboard(o.host)) return o.host;
    o.host = null;
    for (const s of t.owner.units) if (aboard(s)) { o.host = s; return s; }
    return null;
  }
  /* the margin it keeps outside a ring, the transit hold's: a jammer may sit
     a tile closer */
  sniffMargin() { return 1.5 + (this.def.jam ? 0 : 1.0); }
  /* The rings this side knows: what it sees and remembers (G.standoffRings,
     the list the stand-off bomber flies by) and every air-defence set on its
     electronic picture that it only HEARS - the plot has its place and its
     signal says what it is, so its ring is known. Remade twice a second,
     with the plot. */
  sniffRings(o) {
    const g = this.game, now = g.time;
    if (o.rg && now >= o.rg.t && now - o.rg.t < 0.5) return o.rg.R;
    let R = g.standoffRings ? g.standoffRings(this.owner) : [], mine = false;
    const heard = g.esmHeard ? g.esmHeard(this.owner) : [];
    for (const e of heard) {
      const reach = g.airDefenceReach ? g.airDefenceReach(e.def) : 0;
      if (!reach) continue;
      if (!mine) { R = R.slice(); mine = true; }          // the memo is shared: never write into it
      R.push(e.x, e.y, reach * 1.25);
    }
    o.rg = { t: now, R: R };
    return R;
  }
  /* Is this contact somebody else's for now, or this aircraft's own round
     still on its way to it? `list` is the side's turns-in and rounds on it
     (owner.sniffOn): a turn-in while that aircraft is still turning in on
     it (twenty seconds at most), a round until its projectile has gone and
     the time it needed to arrive has passed. */
  sniffBusy(e) {
    const on = this.owner.sniffOn, list = on ? on.get(e.id) : null;
    if (!list) return false;
    const now = this.game.time, P = Combat.projectiles;
    for (let i = list.length - 1; i >= 0; i--) {
      const r = list[i], ro = r.u.order;
      const live = r.away ? (!!r.p && !r.p.dead && P.indexOf(r.p) >= 0) || now < r.t
                          : !r.u.dead && now < r.t && !!ro && !!ro.sniff && ro.target === e;
      if (!live) list.splice(i, 1);
    }
    if (!list.length) { on.delete(e.id); return false; }
    for (const r of list) if (r.u === this) return true;
    const g = this.game;
    return list.length >= ((g.airDefenceReach ? g.airDefenceReach(e.def) : 0) > 0 ? 2 : 1);
  }
  /* this aircraft's turn-in on t is over without a round: let it go */
  sniffRelease(t) {
    const on = this.owner.sniffOn, list = on && t ? on.get(t.id) : null;
    if (!list) return;
    for (let i = list.length - 1; i >= 0; i--) if (list[i].u === this && !list[i].away) list.splice(i, 1);
    if (!list.length) on.delete(t.id);
  }
  /* Flying the order: the break, or the beat - listening on both the beat
     and the way out to it, twice a second. */
  sniffFly(o, dt) {
    const g = this.game, TL = CFG.TILE;
    if (o.ph === "out") {
      /* the break: straight for the point outside the ring, and only then
         back (its clock is a backstop for a point it cannot reach) */
      if (this.flyTo(o.ex, o.ey, dt) || !(g.time < o.until)) o.ph = "beat";
      return;
    }
    o.scan = (o.scan || 0) - dt;
    if (o.scan <= 0) {
      o.scan = 0.5;
      const m = this.sniffMount();
      /* a round aboard and off the rail by the time it is in reach: the
         approach is about a second, the reload six to eight */
      if (!m.why && this.canAfford(m.w) && !(this.cooldowns[m.wi] > 1)) {
        const em = this.seadTarget(false, SNIFF.APPROACH * TL, (e) => this.sniffBusy(e));
        if (em) {
          const on = this.owner.sniffOn || (this.owner.sniffOn = new Map());
          if (!on.has(em.id)) on.set(em.id, []);
          on.get(em.id).push({ u: this, p: null, t: g.time + 20, away: false });
          this.order = { type: "attack", target: em, auto: true, release: true, sniff: o,
                         until: g.time + 20, lx: em.x, ly: em.y };
          this.flyTo(em.x, em.y, dt);
          return;
        }
      }
    }
    /* ---- the beat, kept out of the rings the side knows ----
       An end, or the middle of the orbit, that lies inside a ring is
       pulled back toward home to the margin outside them (G.standoffPoint,
       the transit hold); the orbit is a circle flown at its radius
       (flyOrbit) and its middle is held that much further out, so no lap of
       it dips in. Strayed inside one all the same - the turn at an end of the
       line, the way back from a break across the ring, a ring that has just
       come onto the picture - it heads out of the deepest at once, slanted
       round it toward where it is going, so it slides round the ring rather
       than in and out of it. */
    const m2 = this.sniffMargin(), R = this.sniffRings(o);
    const safe = this.stance !== "aggressive" && !!g.standoffPoint;
    const hold = (x, y, pad) => !safe ? { x: x, y: y, held: false }
      : g.standoffPoint(this.owner, this.owner.homeX, this.owner.homeY, x, y, m2 + pad, R);
    const x1 = Number.isFinite(o.x1) ? o.x1 : o.x, y1 = Number.isFinite(o.y1) ? o.y1 : o.y;
    const point = U.dist(o.x, o.y, x1, y1) <= 2 * CFG.CAP_RADIUS * TL;
    /* a point: a circle round it, the combat air patrol's radius or the
       aeroplane's own turn if that is wider. A line: end to end, joined at
       the nearer end. */
    const r = point ? Math.max(CFG.CAP_RADIUS * TL, this.turnRadius() * 1.1) : 0;
    if (!point && o.leg !== 0 && o.leg !== 1)
      o.leg = U.dist2(this.x, this.y, x1, y1) < U.dist2(this.x, this.y, o.x, o.y) ? 1 : 0;
    const h = point ? hold((o.x + x1) / 2, (o.y + y1) / 2, r / TL)
                    : o.leg ? hold(x1, y1, 0) : hold(o.x, o.y, 0);
    if (h.held && !o.warned && this.owner === g.human) {
      o.warned = true;
      g.alert(this.def.name.toUpperCase() + " \u2014 SNIFFING SHORT OF AIR DEFENCE", "warn");
    }
    if (safe) {
      let deep = 0, bx = 0, by = 0, br = 0;
      for (let i = 0; i < R.length; i += 3) {
        const d = R[i + 2] - U.dist(this.x, this.y, R[i], R[i + 1]) / TL;
        if (d > deep) { deep = d; bx = R[i]; by = R[i + 1]; br = R[i + 2]; }
      }
      if (deep > 0) {
        const side = (this.x - bx) * (h.y - by) - (this.y - by) * (h.x - bx) >= 0 ? 1 : -1;
        const a = Math.atan2(this.y - by, this.x - bx) + side * 0.6, run = (br + m2 + 1) * TL;
        this.flyTo(bx + Math.cos(a) * run, by + Math.sin(a) * run, dt);
        return;
      }
    }
    if (point) this.flyOrbit(h.x, h.y, r, dt);
    else if (this.flyTo(h.x, h.y, dt)) o.leg = o.leg ? 0 : 1;
  }
  /* ---- the turn-in, flown from the attack branch (updateAir) ----
     In on the contact while it stays on the air and on our picture, and the
     round away the first tick it is inside the round's reach; then the
     break. Anything else ends the turn-in with nothing fired: the set
     went dark or out of hearing, the contact got out past the approach, or
     twenty seconds went by. */
  sniffShot(o, t, wi, w, range, dist, dt) {
    const g = this.game, TL = CFG.TILE;
    const known = g.airPlotKnows ? g.airPlotKnows(this.owner, t) : g.visibleTo(this.owner, t);
    if (!g.jamming(t) || !known || !(g.time < o.until) || dist > range + SNIFF.APPROACH * TL * 1.5) {
      this.order = this.afterAttack(o);
      return;
    }
    o.lx = t.x; o.ly = t.y;                                // where our picture has it
    if (dist <= range && dist >= (w.minRange || 0) * TL && !(this.cooldowns[wi] > 0)) {
      const P = Combat.projectiles, n0 = P.length;
      this.tryFire(wi, t);
      if (this.order !== o) return;                        // tryFire gave it up and went back
      if (this.cooldowns[wi] > 0) {
        /* away: the round goes on the side's list for this contact until it
           has arrived, in place of the turn-in */
        let p = null;
        for (let i = P.length - 1; i >= n0; i--) if (P[i].shooter === this) { p = P[i]; break; }
        const on = this.owner.sniffOn || (this.owner.sniffOn = new Map());
        if (!on.has(t.id)) on.set(t.id, []);
        let r = on.get(t.id).find(q => q.u === this && !q.away);
        if (!r) on.get(t.id).push(r = { u: this, p: null, t: 0 });
        r.away = true; r.p = p; r.t = g.time + dist / Math.max(60, w.speed || 400) + 1;
        if (this.owner === g.human)
          g.alert(this.def.name.toUpperCase() + " \u2014 MISSILE AWAY, BREAKING OFF", "good");
        this.order = this.sniffEgress(o.sniff, t.x, t.y, t.def);
        this.flyTo(this.order.ex, this.order.ey, dt);
        return;
      }
    }
    /* in reach with the round still reloading: round it at the edge */
    if (dist <= range && this.cooldowns[wi] > 0) { this.flyOrbit(t.x, t.y, range, dt); return; }
    /* ---- the run-in: on the tangent, not at the site ----
       Flown straight at it, the round left at the edge of its reach with
       the nose on the site, and the break - half a circle at the
       aeroplane's own turn - carried it most of a turning radius further
       in: measured, an F-16CJ that fired at 17.1 tiles came to 13.5 of a
       SAM Site that reaches 14.0. So it runs in on the tangent of a circle
       just inside the round's reach, on whichever side is less of a turn:
       it crosses the reach a few degrees off the tangent, the round goes,
       and the break turns it outward from there. */
    const rho = range * 0.97;
    if (dist > range) {
      const out = Math.atan2(this.y - t.y, this.x - t.x), off = Math.acos(rho / dist);
      let best = null, bt = Infinity;
      for (const s of [1, -1]) {
        const px = t.x + Math.cos(out + s * off) * rho, py = t.y + Math.sin(out + s * off) * rho;
        let turn = Math.atan2(py - this.y, px - this.x) - this.ang;
        turn = Math.abs(Math.atan2(Math.sin(turn), Math.cos(turn)));
        if (turn < bt) { bt = turn; best = { x: px, y: py }; }
      }
      this.flyTo(best.x, best.y, dt);
    } else this.flyOrbit(t.x, t.y, range, dt);
  }
  /* The turn-in ended without a round away (afterAttack): back to the beat,
     by way of a break when it has come inside the contact's ring, or any
     ring the side knows. The contact is where our picture last had it. */
  sniffBack(a) {
    const o = a.sniff, g = this.game, t = a.target;
    this.sniffRelease(t);
    o.ph = "beat";
    if (t && !t.dead && t.def) {
      const own = (g.airDefenceReach ? g.airDefenceReach(t.def) : 0) * 1.25, m = this.sniffMargin();
      const lx = Number.isFinite(a.lx) ? a.lx : t.x, ly = Number.isFinite(a.ly) ? a.ly : t.y;
      if (U.dist(this.x, this.y, lx, ly) < (own + m) * CFG.TILE ||
          (g.airThreatAt && g.airThreatAt(this.owner, this.x, this.y, m, this.sniffRings(o)) > 0))
        return this.sniffEgress(o, lx, ly, t.def);
    }
    return o;
  }
  /* The break from a site at (sx, sy): the first point, along the bearings
     in SNIFF.BEARINGS off straight away from it and out to 24 tiles past
     the first try, that is outside its ring and every ring the side knows,
     with the margin, and on the map - and out by the 2.2 tiles flyTo()
     calls arrived, so the break ends outside them. With none clear,
     straight away to that far from it. And never nearer the site than two
     of the aeroplane's turning radii and a tile past where it is now: it
     always opens the range, and a point any closer can lie inside its own
     turn - measured, an F-16CJ that fired off the tangent at 17.3 tiles,
     sent for a point 22.2 out, circled it for 8.2 s before it called the
     break over. */
  sniffEgress(o, sx, sy, def) {
    const g = this.game, TL = CFG.TILE, M = g.map, m = this.sniffMargin();
    const R = this.sniffRings(o);
    const own = (g.airDefenceReach ? g.airDefenceReach(def) : 0) * 1.25;
    const away = Math.atan2(this.y - sy, this.x - sx);
    const d0 = Math.max((own + m + 2.2) * TL, U.dist(this.x, this.y, sx, sy) + 2 * this.turnRadius() + TL);
    const edge = 3 * TL, W = M.W * TL, H = M.H * TL;
    let ex = NaN, ey = NaN;
    search: for (const da of SNIFF.BEARINGS) {
      for (let k = 0; k <= 12; k++) {
        const d = d0 + k * 2 * TL, x = sx + Math.cos(away + da) * d, y = sy + Math.sin(away + da) * d;
        if (x < edge || y < edge || x > W - edge || y > H - edge) break;
        if (g.airThreatAt && g.airThreatAt(this.owner, x, y, m, R) > 0) continue;
        ex = x; ey = y;
        break search;
      }
    }
    if (!(ex === ex)) {
      ex = U.clamp(sx + Math.cos(away) * d0, edge, W - edge);
      ey = U.clamp(sy + Math.sin(away) * d0, edge, H - edge);
    }
    o.ph = "out"; o.ex = ex; o.ey = ey;
    const sp = Math.max(0.5, this.def.speed * this.speedMul()) * TL;
    o.until = g.time + U.dist(this.x, this.y, ex, ey) / sp + Math.PI / Math.max(0.3, this.def.turn) + 6;
    return o;
  }

  /* The way home round the rings, for a stand-off bomber: having gone round
     them to its launch orbit, a straight line back to the ramp can run
     through the middle of them. Remade every two seconds, like the plan.
     It has to get home whatever the rings say, so when they leave no way
     round - a ramp under a battery, a belt with no gap - it takes the way
     that is least inside them (G.soRoute `soft`), never the straight line
     through the middle. */
  ringDetour(o, px, py) {
    if (!this.standoffAir() || this.stance === "aggressive" || !this.game.soRoute) return null;
    const now = this.game.time;
    if (!o.det || now - o.det.t > 2 || o.det.px !== px || o.det.py !== py)
      o.det = { t: now, px: px, py: py,
                via: this.game.soRoute(this.owner, this.x, this.y, px, py,
                                       undefined, undefined, true) || [] };
    const v = o.det.via;
    while (v.length && U.dist(this.x, this.y, v[0].x, v[0].y) < CFG.TILE * 2.2) v.shift();
    return v.length ? v[0] : null;
  }
  /* ---- THE TRANSIT, flown by the same rule ----
     (review) The first cut held a stand-off bomber short only when the END
     of a move lay inside a ring: G.standoffPoint looks at the destination
     and not the way to it, so a move or a sweep to a point beyond a
     remembered SAM Site was flown in a straight line over the battery.
     Measured on that cut under jsc, a present-day B-52H sent 36 tiles past
     a SAM Site its side had on its chart: on a move it passed 0.1 tiles
     from the battery, 6.0 s inside its reach, two rounds at it, 968 hp to
     462 - exactly what HEAD did - and on an attack-move 3.9 tiles, the
     same two rounds. And the hold had been grown by the whole circle the
     aeroplane flies, so every remembered SAM Site kept a move 33 tiles off
     a battery that reaches 14 ("HOLDING SHORT" for a point 25 tiles out).
     So a move, a sweep or a patrol:
       - goes ROUND the rings its side knows (G.soRoute, the route the attack
         and the way home already fly), the margin the transit hold has
         always used (2.5 tiles) on every leg;
       - with a ring near enough the point for the aeroplane to stray into,
         ends on a circle it can fly, clear of them (G.soStation, then
         soLoiter): round the point itself when that circle is clear,
         beside it when not, JOINED on the tangent - a Buff that flew to the
         point and only then turned would swing up to two turning radii, 17
         tiles, toward whatever lay on that side. Measured on the transit
         fix before this was added: a move to a point 25 tiles beside a
         remembered SAM Site, turned in at the point, came to 11.0 tiles of
         a battery that reaches 14.0. With no ring that near, the move ends
         as every aeroplane's does;
       - is HELD, and says so, when the point itself is inside a ring - on
         the line from home, short of them, as G.standoffPoint holds - or
         when no way round reaches it: then on that line on our side of
         them. A sweep or a patrol held there still takes what comes within
         its reach (the attack branch keeps it outside the rings while it
         shoots).
     Answers true when it has flown this frame; false hands back a last leg
     that is clear, for the order's own branch to fly. */
  soTransit(o, margin, dt) {
    const g = this.game, TL = CFG.TILE, now = g.time;
    const rings = g.standoffRings(this.owner);
    const rL = this.turnRadius() * 1.3, slack = TL * 1.75;
    let p = o.sot;
    if (!p || now - p.t >= 3 || (now - p.t >= 0.5 && Unit.ringsDiffer(p.rings, rings))) {
      const home = { x: this.owner.homeX, y: this.owner.homeY };
      const so = { r: rL, slack: slack, margin: margin, rings: rings, home: home };
      let st = g.soStation(this.owner, o.x, o.y, so);
      const near = Unit.ringNear(rings, o.x, o.y, margin, rL + slack);
      const same = (q) => !!p && U.dist(p.cx, p.cy, q.x, q.y) < TL * 1.5;
      let via = null, dir = same(st) ? p.dir : g.soDir(st.x, st.y, this.x, this.y, this.ang);
      if (!st.held) {
        /* to the point, or with a ring near it to its circle */
        const en = near ? g.soEntry(st.x, st.y, rL, this.x, this.y, dir) : { x: o.x, y: o.y };
        via = g.soRoute(this.owner, this.x, this.y, en.x, en.y, margin, rings);
        if (via.closed) {
          /* the point is clear and there is no way round to it */
          so.open = true;
          st = g.soStation(this.owner, o.x, o.y, so);
          st.held = true;
          dir = same(st) ? p.dir : g.soDir(st.x, st.y, this.x, this.y, this.ang);
        }
      }
      if (st.held) {
        const en = g.soEntry(st.x, st.y, rL, this.x, this.y, dir);
        via = g.soRoute(this.owner, this.x, this.y, en.x, en.y, margin, rings);
        if (via.closed) via = g.soRoute(this.owner, this.x, this.y, en.x, en.y, margin, rings, true);
      }
      p = o.sot = { t: now, rings: rings, held: st.held, near: near, cx: st.x, cy: st.y, dir: dir, via: via };
    }
    const via = p.via;
    while (via.length && U.dist(this.x, this.y, via[0].x, via[0].y) < TL * 2.2) via.shift();
    if (p.held) {
      if ((o.type === "attackmove" || o.type === "cap") && this.soAcquire(o)) return true;
      if (!this.warnedRing && this.owner === g.human) {
        this.warnedRing = true;
        g.alert(this.def.name.toUpperCase() + " — HOLDING SHORT OF AIR DEFENCE", "bad");
      }
      if (via.length) this.soFlyTo(via[0].x, via[0].y, dt);
      else this.flyOrbit(p.cx, p.cy, rL, dt, p.dir, true);
      return true;
    }
    this.warnedRing = false;
    if (!via.length && (!p.near || o.type === "cap")) return false;   // the last leg is clear
    if ((o.type === "attackmove" || o.type === "cap") && this.soAcquire(o)) return true;
    if (via.length) { this.soFlyTo(via[0].x, via[0].y, dt); return true; }
    /* on the circle: a move or a sweep has arrived, and holds there */
    this.flyOrbit(p.cx, p.cy, rL, dt, p.dir, true);
    if (U.dist(this.x, this.y, p.cx, p.cy) < rL + TL * 2 && !this.nextOrder())
      this.order = { type: "hover", hx: p.cx, hy: p.cy };
    return true;
  }
  /* a sweep or a patrol in transit takes what comes within its reach, as its
     own branch would */
  soAcquire(o) {
    const foe = this.acquire();
    if (!foe) return false;
    this.order = o.type === "cap"
      ? { type: "attack", target: foe, resume: { x: o.x, y: o.y }, cap: true, auto: true }
      : { type: "attack", target: foe, resume: { x: o.x, y: o.y }, auto: true };
    return true;
  }
  /* is a ring of `rings` near enough (sx, sy) for a circle of radius `circ`
     (pixels, wander in) round it to stray inside the ring and `margin`? */
  static ringNear(rings, sx, sy, margin, circ) {
    for (let i = 0; i < rings.length; i += 3)
      if (U.dist(sx, sy, rings[i], rings[i + 1]) < (rings[i + 2] + margin) * CFG.TILE + 2 * circ) return true;
    return false;
  }
  /* A stand-off bomber holding where it was sent - at the end of a move or
     a sweep (hover) or on a patrol (cap) - with a ring its side knows near
     enough for the hold to stray into: it holds on a circle it can fly,
     clear of them (G.soStation), reached round them. Further off than that
     the hold is the one every aeroplane flies. Answers true when it flew. */
  soLoiter(o, sx, sy, dt) {
    if (!this.standoffAir() || this.stance === "aggressive" || !this.game.soStation) return false;
    const g = this.game, TL = CFG.TILE, now = g.time;
    const rings = g.standoffRings(this.owner);
    const rL = this.turnRadius() * 1.3, slack = TL * 1.75, margin = 2.5;
    let p = o.sol;
    if (!p || p.sx !== sx || p.sy !== sy || now - p.t >= 3 ||
        (now - p.t >= 0.5 && Unit.ringsDiffer(p.rings, rings))) {
      /* near: the ring, its margin and twice the circle with its wander */
      const near = Unit.ringNear(rings, sx, sy, margin, rL + slack), was = p;
      p = o.sol = { t: now, rings: rings, sx: sx, sy: sy, near: near, cx: sx, cy: sy, via: [] };
      if (near) {
        const st = g.soStation(this.owner, sx, sy, { r: rL, slack: slack, margin: margin, rings: rings,
                                                     home: { x: this.owner.homeX, y: this.owner.homeY } });
        p.dir = was && was.near && U.dist(was.cx, was.cy, st.x, st.y) < TL * 1.5
          ? was.dir : g.soDir(st.x, st.y, this.x, this.y, this.ang);
        const en = g.soEntry(st.x, st.y, rL, this.x, this.y, p.dir);
        let via = g.soRoute(this.owner, this.x, this.y, en.x, en.y, margin, rings);
        if (via.closed) via = g.soRoute(this.owner, this.x, this.y, en.x, en.y, margin, rings, true);
        p.cx = st.x; p.cy = st.y; p.via = via;
      }
    }
    if (!p.near) return false;
    const via = p.via;
    while (via.length && U.dist(this.x, this.y, via[0].x, via[0].y) < TL * 2.2) via.shift();
    if (via.length) this.soFlyTo(via[0].x, via[0].y, dt);
    else this.flyOrbit(p.cx, p.cy, rL, dt, p.dir, true);
    return true;
  }
  flyTo(px, py, dt) {
    const want = Math.atan2(py - this.y, px - this.x);
    this.ang = U.turnToward(this.ang, want, this.def.turn * dt);
    const sp = this.def.speed * this.speedMul() * CFG.TILE;
    this.x += Math.cos(this.ang) * sp * dt;
    this.y += Math.sin(this.ang) * sp * dt;
    this.x = U.clamp(this.x, 8, this.game.map.W * CFG.TILE - 8);
    this.y = U.clamp(this.y, 8, this.game.map.H * CFG.TILE - 8);
    /* A hovering machine can put itself precisely on a pad; anything with a
       landing run needs a looser capture or it circles the field for ever. */
    return U.dist(this.x, this.y, px, py) < CFG.TILE * (this.def.hover ? 0.7 : 2.2);
  }

  /* A replacement for a deck that has lost one is BOUGHT now - from the
     ship's flight-deck panel, or by the commander (ai.js driveDecks) - and
     this works the order: G.workDeckOrders pays for it as it builds and then
     cranes it aboard alongside a naval yard or flies it out from an airbase
     in reach. It used to be free and automatic at the yard; see the block
     above G.deckTypesFor in game.js for what that cost and why it went.
     The point this comment always made still holds, and harder: a
     helicopter lost at sea is a hole in the ship's capability until one can
     be BROUGHT to her, and now it also costs what a helicopter costs. */
  replenishDeck(dt) {
    if (this.deckQ && this.deckQ.length && this.game.workDeckOrders)
      this.game.workDeckOrders(this, dt);
  }

  /* ---- a warship's flight deck ----
     An escort with a helicopter deck is, for the player, the same thing as an
     airbase: a place aircraft live between sorties. Giving a ship the three
     methods the airbase already has means the existing hangar panel - the list
     of what is aboard, its fuel and ordnance, and the strike/patrol/recall
     buttons - works on a destroyer with no second implementation. */
  deckSlots() {
    return (this.def.carrier || 0) || (this.def.helo || 0);
  }
  wing() {
    const out = [];
    if (!this.deckSlots()) return out;
    for (const u of this.owner.units)
      if (!u.dead && u.layer === "air" && u.padOn === this) out.push(u);
    return out;
  }
  onRamp() { return this.wing().filter(u => u.parked); }
  ramp() { return this.deckSlots(); }

  /* ---- what an amphibious assault ship's hold takes ----
     A flat-top with a hold (def.carrier and def.amphib: eras.js nato_e60_lph
     ... rules.js lha_n) puts its Marines ashore by helicopter, and its
     vehicles only by landing craft out of a WELL DECK (def.wellDeck). The Iwo
     Jima LPH and the America LHA-6 had none - everything went ashore by air -
     so they take troops and no vehicle. The Tarawa and the Wasp have one, so
     they take vehicles, and the vehicles go ashore in the landing craft out
     of it (THE WELL DECK, below): the ship herself puts only troops on a
     beach - the stand-in for her helicopters and boats - and keeps her
     vehicles aboard (craftOnly, unload). A landing ship (no deck) beaches and
     is not asked. The Soviet Ivan Rogov (eras.js pact_e80_lpd, navy piece 4)
     has a bow ramp as well as her well deck (def.bowRamp) - she was built to
     work as a tank landing ship or a dock landing ship - so she puts her
     vehicles on a beach herself as well as in her craft. "" when it may
     come aboard. */
  static troopsOnly(def) { return !!(def && def.amphib && def.carrier && !def.wellDeck); }
  static craftOnly(def) { return !!(def && def.amphib && def.carrier && def.wellDeck && !def.bowRamp); }
  /* the vehicles a well-deck ship is keeping aboard for her craft */
  vehiclesKept() {
    return Unit.craftOnly(this.def) ? this.cargo.filter(u => u.cat === "vehicle").length : 0;
  }
  static keptLine(n) {
    return n + (n === 1 ? " VEHICLE STAYS" : " VEHICLES STAY") +
      " ABOARD \u2014 VEHICLES GO ASHORE BY LANDING CRAFT: LAUNCH THEM FROM THE WELL DECK";
  }
  holdRefusal(v) {
    /* a landing craft comes into the well, not the hold */
    if (v && v.cat === "naval") return this.wellRefusal(v);
    if (!v || v.cat !== "vehicle" || !Unit.troopsOnly(this.def)) return "";
    return "NO WELL DECK — VEHICLES GO ASHORE BY LANDING CRAFT FROM A WELL-DECK SHIP";
  }

  /* ---- THE WELL DECK (navy piece 3) ----
     (owner) "...an amphibious assault ship which can carry F-35B,
     helicopters, and landing ships." A Tarawa or a Wasp carries her landing
     craft in a floodable dock in her stern (def.wellCraft, eras.js THE WELL
     DECK: how many of each type the well holds on its own; a mixed load fits
     where the fractions add up to one - a Wasp's three LCACs, two LCUs, or one
     of each).
     IN THE WELL a craft is carried the way a passenger is (carried, off the
     map, doing nothing), in ship.well rather than ship.cargo, so it takes no
     seat in the hold, and its own load stays aboard it. This is the hold's
     model, not the flight deck's: wing(), padOn and findPad are about
     aircraft that sit on a deck in the world and fly to it, and a craft in
     the well is inside the hull - and has a hold of its own to keep.
     LAUNCHED (launchCraft), it is floated out of the stern gate onto open
     water astern, with as much of the ship's hold as it has seats for,
     vehicles first - the vehicle decks feed the well by ramp - and is then
     the ordinary amphibious transport it always was: right-click a beach to
     land what it carries. A Wasp at sea launches over the horizon, as the
     LCAC was built to, so no coast is needed to launch.
     RECOVERED by being right-clicked back onto her (an enter order,
     updateEnter): it sails up astern and is carried again, with whatever it
     brought back aboard it.
     BOUGHT (orderWellCraft): the ship is delivered with an empty well, as
     with an empty deck (eras.js THE WELL DECK, THE PRICE), and a craft is
     bought for it from her panel at its own price, barrels and build time,
     paid as it builds at the naval yards' rate and floated in alongside a
     naval yard - the reach the deck's yard delivery uses (game.js
     DECK_YARD_R). */
  /* what a craft is called in a well: the LCAC's row is named "Landing
     Craft", which beside the LCU 1610 says nothing */
  static craftLabel(def) {
    return def && /LCAC/.test(def.full || "") && !/LCAC/.test(def.name) ? "LCAC" : (def ? def.name : "");
  }
  /* the types her well takes in her owner's period */
  wellTypes() {
    const w = this.def.wellCraft, out = [];
    if (!w) return out;
    const era = (this.owner && this.owner.era) || CUR_ERA;
    for (const id in w) if (UNITS[id] && inEra(UNITS[id], era)) out.push(id);
    return out;
  }
  /* how full the well is, 1 being full: the craft in it and on order for
     it, and `plus` (a type) counted in */
  wellFill(plus) {
    const w = this.def.wellCraft;
    if (!w) return Infinity;
    let f = 0;
    const add = (id) => { f += w[id] ? 1 / w[id] : Infinity; };
    for (const c of this.well || []) add(c.def.id);
    for (const it of this.wellQ || []) add(it.id);
    /* and those on their way in through her gate (WELL TRANSIT) */
    for (const c of this.wellGo || []) if (c.wellT && (c.wellT.ph === "app" || c.wellT.ph === "in")) add(c.def.id);
    if (plus) add(plus);
    return f;
  }
  /* "" when this landing craft may come into her well, else why not */
  wellRefusal(c) {
    if (!c || c.cat !== "naval") return "";
    if (!this.def.wellCraft)
      return Unit.troopsOnly(this.def)
        ? "NO WELL DECK \u2014 " + this.def.name.toUpperCase() + " PUTS HER MARINES ASHORE BY AIR"
        : "NO WELL DECK";
    if (c.owner !== this.owner) return "NOT OURS";
    if (this.wellTypes().indexOf(c.def.id) < 0)
      return Unit.craftLabel(c.def).toUpperCase() + " IS NOT CARRIED IN " + this.def.name.toUpperCase() + "'S WELL DECK";
    if (this.wellFill(c.def.id) > 1 + 1e-6) return "WELL DECK FULL";
    return "";
  }
  /* into the well */
  dockCraft(c) {
    (this.well || (this.well = [])).push(c);
    c.carried = true; c.selected = false;
    c.order = { type: "idle" }; c.orders = []; c.path = null; c.moving = false;
    c.x = this.x; c.y = this.y;
    /* and out of the player's selection: it is inside the hull, where
       give() takes no order, and the panel belongs to whatever is still
       afloat (the list is ui.js's own array, as game.js finishPack edits it) */
    if (typeof UI !== "undefined" && Array.isArray(UI.selection)) {
      const s = UI.selection, k = s.indexOf(c);
      if (k >= 0) s.splice(k, 1);
    }
    if (this.owner === this.game.human)
      this.game.alert(Unit.craftLabel(c.def).toUpperCase() + " RECOVERED INTO " + this.def.name.toUpperCase() + "'S WELL DECK" +
        (c.cargo.length ? " WITH " + c.cargo.length + " ABOARD" : ""), "good");
  }
  /* Out of the stern gate, loaded from the hold. `taken` collects the water
     tiles already given to craft launched in the same breath. Returns the
     number of the hold it took aboard, or a reason (a string). */
  launchCraft(c, taken, slot) {
    const g = this.game, T = CFG.TILE, W = g.map.W;
    const i = (this.well || []).indexOf(c);
    if (i < 0 || c.dead) return "NOT IN THE WELL";
    const used = taken || new Set();
    /* astern, beyond her own length's half and the craft's, spread abreast;
       where it drives out through her gate (WELL TRANSIT), beyond the sill */
    const wa = Unit.wellAxis(this.def), berth = slot !== undefined ? slot : this.wellSlot(i);
    const k = used.size, side = (k % 2 ? 1 : -1) * Math.ceil(k / 2);
    const back = (wa ? -wa.exit : (this.r || 30)) + (c.r || 16) + T * 0.5;
    const ax = this.x - Math.cos(this.ang) * back - Math.sin(this.ang) * side * T;
    const ay = this.y - Math.sin(this.ang) * back + Math.cos(this.ang) * side * T;
    /* only water the ship herself floats on: a lake or river within four
       tiles of the stern would otherwise take the craft and strand it there */
    const own = (a, b) => !Path.reachable(g.map, this.tx, this.ty, a, b, "sea");
    const spot = Path.nearest(g.map, (ax / T) | 0, (ay / T) | 0, "sea",
                              (a, b) => used.has(b * W + a) || g.tileBlocked(a, b, null) || own(a, b), 4) ||
                 Path.nearest(g.map, (ax / T) | 0, (ay / T) | 0, "sea", own, 4);
    if (!spot) return "NO OPEN WATER ASTERN";
    used.add(spot.y * W + spot.x);
    this.well.splice(i, 1);
    /* the hold feeds the craft: vehicles first, then troops, seat for seat */
    const seats = c.def.cargo || 0;
    const feed = this.cargo.filter(u => u.cat === "vehicle").concat(this.cargo.filter(u => u.cat !== "vehicle"));
    let n = 0;
    for (const u of feed) {
      if (c.cargo.length >= seats) break;
      this.cargo.splice(this.cargo.indexOf(u), 1);
      c.cargo.push(u); u.carried = true;
      n++;
    }
    c.carried = false;
    c.order = { type: "idle" }; c.orders = []; c.path = null;
    const sx = spot.x * T + T / 2, sy = spot.y * T + T / 2;
    c.ang = this.ang + Math.PI;
    if (wa) {
      /* from its berth in the well, out through the gate once she has it
         open, and on to that water (updateWellT) */
      c.wellT = { ship: this, ph: "out", s: berth, lat: 0, to: berth, sx: sx, sy: sy };
      (this.wellGo || (this.wellGo = [])).push(c);
      this.gateHold = WELL_GO.HOLD; this.gateOpen = true;
      c.placeInWell();
    } else { c.x = sx; c.y = sy; }
    return n;
  }
  /* every craft in the well out, each filled from the hold in turn */
  launchAll() {
    const taken = new Set(), list = (this.well || []).slice();
    /* each from the berth it lay in, read before the first one leaves */
    const slots = list.map((c, i) => this.wellSlot(i));
    let out = 0, aboard = 0, why = "";
    for (let j = 0; j < list.length; j++) {
      const c = list[j], r = this.launchCraft(c, taken, slots[j]);
      if (typeof r === "string") { why = why || r; continue; }
      out++; aboard += r;
    }
    if (this.owner === this.game.human) {
      if (out) this.game.alert(out + (out === 1 ? " LANDING CRAFT" : " LANDING CRAFT") + " LAUNCHED FROM " +
        this.def.name.toUpperCase() + (aboard ? " \u2014 " + aboard + " OF THE LANDING FORCE ABOARD" : ""), "good");
      else this.game.alert(why || "NO LANDING CRAFT IN THE WELL DECK", "bad");
    }
    return out;
  }
  /* ---- WELL TRANSIT ----
     (owner) "Can the gate open and see the craft in and out?" A craft no
     longer jumps between her well and the water: it drives through her stern
     gate, and the gate swings down for it.
     WHERE: def.wellPts (eras.js WHERE THE WELL LIES IN HER HULL), metres
     along her from amidships, read in proportion onto the length the ship is
     drawn at (wellAxis) - game data, never the 3D model, so 2D, 3D and a
     headless test all run the same match. Each craft has a berth in the
     well, the first at its middle and the next ones aft of it in turn
     (wellSlot), nose to tail.
     OUT (launchCraft): the craft is put at its berth, "out", and waits
     there until her gate is open (gateT 1); then it runs aft along her
     centreline at WELL_GO.V to the sill and on until its own length is
     clear of it, then, "off", in a straight line to the water picked for it
     astern, where it is free.
     IN (updateEnter): a craft sent into her steers for her sill, not her
     middle (wellDoor), and she opens the gate as it comes within four tiles.
     There it is taken into the transit, "app": it glides onto her
     centreline at the sill, waits for the gate, runs up the well, "in", to
     the berth behind the craft already there and is docked (dockCraft).
     HER MOTION: the craft in the well is placed in her own frame - how far
     along her and across - each tick, so it moves with her if she moves
     while it is inside, as a craft in a real well does; she need not stop.
     Only the "off" run to its water is in the world's frame.
     ORDERS given to a craft in the transit wait until it is clear (give);
     one inside her is off the board's grid (game.js), so nothing shoots it
     or is pushed by it through her side, and it cannot be clicked (ui.js).
     THE GATE (workGate): open while a craft is in the transit and
     WELL_GO.HOLD seconds after the last has passed the sill (gateOpen), and
     gateT runs to 1 or back to 0 over WELL_GO.GATE seconds; render3d.js
     swings a model's "wellgate" node by it. Lost with her, a craft inside
     goes down with her (game.js); one gliding up to her sill or out to its
     water stays afloat. Saved with its phase and place (save.js). */
  /* her well's sill and its middle (the first berth), px along her from
     her own middle */
  static wellAxis(def) {
    const wp = def && def.wellPts;
    if (!wp) return null;
    if (def._wellAx) return def._wellAx;
    /* the length render3d.js getModel draws a ship at, in px (her r, not
       her length, sets it) - from config, as the renderer reads it */
    const k = def.r * 2.1 * 1.9 * CFG.MODEL_SCALE / wp.len;
    return (def._wellAx = { exit: wp.exit * k, inner: wp.inner * k });
  }
  /* TRUE RATIO: how many times the size MODEL_SCALE gives it a naval unit
     is drawn - CFG.NAVAL_SCALE for a ship; 1 for a landing craft (a type
     some ship's well carries: it is already near its true size against a
     tank) and for anything else. Render only: render3d.js getModel draws a
     ship at it and puts a craft in her well at it (wellScale). wellAxis
     above does not read it - her well is as long in the game whatever she
     is drawn at, so a craft's run through it takes the same time. */
  static navalDraw(def) {
    const n = CFG.NAVAL_SCALE || 1;
    if (n === 1 || !def || def.cat !== "naval") return 1;
    if (!Unit._craftIds) {
      Unit._craftIds = new Set();
      for (const id in UNITS) { const w = UNITS[id].wellCraft; if (w) for (const c in w) Unit._craftIds.add(c); }
    }
    return Unit._craftIds.has(def.id) ? 1 : n;
  }
  /* the berth of the craft that has the first n of her well before it */
  wellSlot(n) {
    const ax = Unit.wellAxis(this.def), w = this.def.wellCraft || {};
    if (!ax) return 0;
    let f = 0;
    for (let j = 0; j < n && j < this.well.length; j++) f += 1 / (w[this.well[j].def.id] || 1);
    return this.wellBerth(f);
  }
  /* the berth `f` of her well (a fraction, as wellFill) aft of the first */
  wellBerth(f) {
    const ax = Unit.wellAxis(this.def);
    return ax.inner + (ax.exit - ax.inner) * Math.min(f, 0.95);
  }
  /* where a craft is clear of her sill, astern, in the world; null where
     that is not water it can float on and reach (a dock's tile, or a pool
     cut off from it: Path.find would bring it only to the nearest tile, and
     it would wait there for good) */
  wellDoor(c) {
    const ax = Unit.wellAxis(this.def);
    if (!ax) return null;
    const s = ax.exit - (c.r || 16) - 2, x = this.x + Math.cos(this.ang) * s, y = this.y + Math.sin(this.ang) * s;
    const map = this.game.map, tx = (x / CFG.TILE) | 0, ty = (y / CFG.TILE) | 0;
    if (tx < 0 || ty < 0 || tx >= map.W || ty >= map.H || !GameMap.passable(map, tx, ty, c.layer) ||
        this.game.tileBlocked(tx, ty, c) || !Path.reachable(map, c.tx, c.ty, tx, ty, c.layer)) return null;
    return { x: x, y: y };
  }
  /* a craft come up to her stern goes into the transit, bound for the
     berth behind those in the well and those already coming in */
  takeIntoWell(c) {
    const w = this.def.wellCraft || {};
    let f = 0;
    for (const o of this.well || []) f += 1 / (w[o.def.id] || 1);
    for (const o of this.wellGo || []) if (o.wellT && (o.wellT.ph === "app" || o.wellT.ph === "in")) f += 1 / (w[o.def.id] || 1);
    const dx = c.x - this.x, dy = c.y - this.y, co = Math.cos(this.ang), si = Math.sin(this.ang);
    c.wellT = { ship: this, ph: "app", s: dx * co + dy * si, lat: -dx * si + dy * co, to: this.wellBerth(f), sx: 0, sy: 0 };
    (this.wellGo || (this.wellGo = [])).push(c);
    c.order = { type: "idle" }; c.orders = []; c.path = null; c.moving = false;
    this.gateHold = WELL_GO.HOLD; this.gateOpen = true;
  }
  /* inside her hull: in the well or between it and the sill */
  inWell() { const w = this.wellT; return !!w && (w.ph === "out" || w.ph === "in"); }
  /* put a craft in the transit where it is in her frame (wellT.s, lat) */
  placeInWell() {
    const w = this.wellT, s = w.ship, co = Math.cos(s.ang), si = Math.sin(s.ang);
    this.x = s.x + co * w.s - si * w.lat;
    this.y = s.y + si * w.s + co * w.lat;
  }
  updateWellT(dt) {
    const w = this.wellT, s = w.ship;
    if (w.ph === "off") {
      /* clear of her: on to its own water, at half its speed */
      const dx = w.sx - this.x, dy = w.sy - this.y, d = Math.hypot(dx, dy);
      const v = Math.max(WELL_GO.V, this.def.speed * this.speedMul() * CFG.TILE * 0.5) * dt;
      if (d <= v) {
        this.x = w.sx; this.y = w.sy; this.wellT = null; this.moving = false;
        if (!this.nextOrder()) this.order = { type: "idle" };
        return;
      }
      this.x += dx / d * v; this.y += dy / d * v; this.moving = true;
      this.ang = U.turnToward(this.ang, Math.atan2(dy, dx), (this.def.turn || 1) * dt);
      return;
    }
    /* she is gone: one afloat outside her stays afloat where it is (one
       inside went down with her, game.js) */
    if (!s || s.dead) { this.wellT = null; this.moving = false; this.order = { type: "idle" }; return; }
    const ax = Unit.wellAxis(s.def), door = ax.exit - this.r, v = WELL_GO.V * dt, open = (s.gateT || 0) >= 1;
    if (w.ph === "out") {
      if (open) w.s = Math.max(door, w.s - v);
      this.moving = open;
      this.ang = s.ang + Math.PI;
      this.placeInWell();
      if (w.s <= door) w.ph = "off";
      return;
    }
    if (w.ph === "app") {
      /* onto her centreline at the sill */
      const ds = door - w.s, dl = -w.lat, d = Math.hypot(ds, dl);
      const st = Math.max(v, this.def.speed * this.speedMul() * CFG.TILE * 0.5 * dt);
      if (d <= st) {
        w.s = door; w.lat = 0; w.ph = "in";
        /* inside her now: out of the player's selection, as dockCraft does
           it, or an order to it would be held and then wiped at the dock */
        this.selected = false;
        if (typeof UI !== "undefined" && Array.isArray(UI.selection)) {
          const k = UI.selection.indexOf(this);
          if (k >= 0) UI.selection.splice(k, 1);
        }
      }
      else { w.s += ds / d * st; w.lat += dl / d * st; }
      this.moving = true;
    } else if (open) {
      /* "in": up the well to its berth */
      w.s = Math.min(w.to, w.s + v);
      this.moving = true;
    } else this.moving = false;
    this.ang = U.turnToward(this.ang, s.ang, (this.def.turn || 1) * dt);
    this.placeInWell();
    if (w.ph === "in" && w.s >= w.to - 1e-6) {
      this.wellT = null; this.moving = false;
      s.dockCraft(this);
    }
  }
  /* her gate (and a bow ramp's hold) */
  workGate(dt) {
    const go = this.wellGo;
    if (go) for (let i = go.length - 1; i >= 0; i--) {
      const c = go[i];
      if (c.dead || !c.wellT || c.wellT.ship !== this || c.wellT.ph === "off") go.splice(i, 1);
    }
    if (go && go.length) this.gateHold = WELL_GO.HOLD;
    else if (this.gateHold > 0) this.gateHold = Math.max(0, this.gateHold - dt);
    this.gateOpen = this.gateHold > 0;
    const g0 = this.gateT || 0, step = dt / WELL_GO.GATE;
    /* (a whole swing in whole ticks: 1/60 summed sixty times is short of 1) */
    this.gateT = this.gateOpen ? (g0 + step > 1 - 1e-9 ? 1 : g0 + step) : (g0 - step < 1e-9 ? 0 : g0 - step);
    if (this.rampHold > 0) this.rampHold = Math.max(0, this.rampHold - dt);
  }
  /* null if this craft may be ordered for her well now, else the reason */
  wellOrderReason(id) {
    const def = UNITS[id], p = this.owner, g = this.game;
    if (!this.def.wellCraft) return "NO WELL DECK";
    if (!def || this.wellTypes().indexOf(id) < 0)
      return (def ? Unit.craftLabel(def).toUpperCase() : "THAT") + " IS NOT CARRIED IN " + this.def.name.toUpperCase() + "'S WELL DECK";
    const lock = p.lockReason(def);
    if (lock) return lock;
    if (this.wellFill(id) > 1 + 1e-6) return "WELL DECK FULL";
    if (!this.wellYard()) return "NOT ALONGSIDE A NAVAL YARD";
    return null;
  }
  /* the naval yard she lies alongside, if she does (the deck's 7 tiles) */
  wellYard() {
    const y = this.game.nearestBuilding(this.owner, "navalyard", this.x, this.y);
    return y && U.dist(this.x, this.y, y.x, y.y) <= CFG.TILE * 7 ? y : null;
  }
  orderWellCraft(id) {
    const why = this.wellOrderReason(id);
    if (why) return why;
    (this.wellQ || (this.wellQ = [])).push({ id: id, paid: 0 });
    return null;
  }
  /* everything paid comes back */
  cancelWellOrder(i) {
    const q = this.wellQ;
    if (!q || !q[i]) return false;
    this.owner.refund(q.splice(i, 1)[0].paid);
    return true;
  }
  /* The head of her order is paid for as it builds, at the naval yards'
     rate (Player.prodSpeed: their number and the power), and when it is
     finished and she lies alongside a yard its barrels are drawn and it is
     floated into the well. Until then it waits, and says why once. */
  workWell(dt) {
    const q = this.wellQ;
    if (!q || !q.length) return;
    const p = this.owner, it = q[0], def = UNITS[it.id];
    if (!def) { q.shift(); return; }
    if (!it.done) {
      const speed = p.prodSpeed("naval");
      if (speed <= 0) return;
      const cost = p.factionCost(def);
      const pay = Math.min(cost * dt * speed / p.factionTime(def), cost - it.paid, p.cash);
      if (pay > 0) { p.cash -= pay; it.paid += pay; }
      if (it.paid < cost - 0.01) return;
      it.done = true; it.t = 0;
    }
    it.t = (it.t || 0) - dt;
    if (it.t > 0) return;
    it.t = 1;
    let why = null;
    if (def.oil && p.oil < def.oil) why = "AWAITING FUEL (" + def.oil + " bbl)";
    else if (!this.wellYard()) why = "BRING HER ALONGSIDE A NAVAL YARD";
    if (why) {
      if (!it.why && p === this.game.human)
        this.game.alert(Unit.craftLabel(def).toUpperCase() + " FOR " + this.def.name.toUpperCase() + " \u2014 " + why, "bad");
      it.why = why;
      return;
    }
    if (def.oil) p.spendOil(def.oil, "naval");
    q.shift();
    const c = this.game.spawnUnitAt(p, it.id, this.x, this.y);
    if (!c) return;
    p.stats.built++;
    (this.well || (this.well = [])).push(c);
    c.carried = true; c.order = { type: "idle" };
    if (p === this.game.human)
      this.game.alert(Unit.craftLabel(def).toUpperCase() + " FLOATED INTO " + this.def.name.toUpperCase() + "'S WELL DECK", "good");
  }

  /* ---- transports & structures entry (engineer/infantry into buildings) ---- */
  updateEnter(dt) {
    const o = this.order, t = o.target;
    if (!t || t.dead) { this.order = { type: "idle" }; return; }
    /* a hull that will not take this aboard at all is not driven to */
    const noHold = t.kind === "unit" && t.holdRefusal ? t.holdRefusal(this) : "";
    if (noHold) {
      if (this.owner === this.game.human) this.game.alert(noHold, "bad");
      this.order = { type: "idle" };
      return;
    }
    /* A landing craft bound for a well with a gate steers for her sill and
       goes in through it (WELL TRANSIT); she lowers the gate as it comes
       within four tiles. Where her sill is not water it can reach, it comes
       alongside as below and glides round to the sill from there. */
    const wellIn = this.cat === "naval" && t.kind === "unit" && t.def.wellPts && t.owner === this.owner;
    const door = wellIn ? t.wellDoor(this) : null;
    if (door) {
      const dd = U.dist(this.x, this.y, door.x, door.y);
      if (dd < CFG.TILE * 4) t.gateHold = Math.max(t.gateHold || 0, 1);
      if (dd < CFG.TILE * 0.6) t.takeIntoWell(this);
      else this.stepAlong(door.x, door.y, dt);
      return;
    }
    /* How close is alongside. A landing craft comes up to her stern (THE
       WELL DECK). A tank or a squad boarding a landing craft or a landing
       ship stops on the sand, and a craft lying one tile off the beach -
       it lands a load from up to 4.5 tiles off its mark - has its centre
       two tiles out, or 2.2 on the diagonal, which the 10 px every other
       boarding allows never reached: the tank sat on the beach with its
       order for good (measured, hormuz: a 2.00-tile gap against a reach of
       1.38). A tile and a half reaches the craft one tile out and not one
       further. */
    const reach = this.cat === "naval" ? CFG.TILE
                : this.layer === "ground" && t.kind === "unit" && t.layer === "sea" && t.def.amphib ? CFG.TILE * 1.5 : 10;
    const near = (t.kind === "building" && t.long && t.long() ? t.edge(this.x, this.y) < this.r + reach
                                                               : U.dist(this.x, this.y, t.x, t.y) < (t.r || 20) + this.r + reach) ||
                 (t.kind === "unit" && this.besideRamp(t));
    /* an aeroplane that has taken off is not waited for under its flight path */
    if (!near && this.cat === "vehicle" && t.kind === "unit" && t.layer === "air" && t.def.payload &&
        !t.def.hover && !t.grounded && !t.loadingNow()) { this.boardAirlifter(t, dt); return; }
    if (!near) {
      if (this.layer === "air") this.flyTo(t.x, t.y, dt);
      else this.stepAlong(t.x, t.y, dt);
      return;
    }
    /* arrived */
    /* a landing craft goes into the well, never into a hold (THE WELL DECK;
       holdRefusal above has already turned away a ship without room) */
    if (this.cat === "naval") {
      if (wellIn) t.takeIntoWell(this);
      else if (t.kind === "unit" && t.def.wellCraft && t.owner === this.owner) t.dockCraft(this);
      else this.order = { type: "idle" };
      return;
    }
    if (t.kind === "building" && t.def.garrison && this.canGarrison(t)) {
      this.enterGarrison(t);
      return;
    }
    if (t.kind === "unit" && t.def.cargo && t.owner === this.owner) {
      /* an airlifter takes its load by weight (AIRLIFT); everything else
         that carries troops still counts seats */
      if (t.def.payload && t.layer === "air") { this.boardAirlifter(t, dt); return; }
      if (t.cargo.length < t.def.cargo) { t.cargo.push(this); this.carried = true; }
      this.order = { type: "idle" };
    } else if (t.kind === "building" && this.def.engineer) {
      /* Rebuilding a collapsed civilian block. The wreck is replaced by a
         sound building on the same footprint, which can then be occupied
         again — so a street can be fought over, flattened, and put back. */
      if (t.def.rubble && t.def.restoresTo && BUILDINGS[t.def.restoresTo]) {
        const g = this.game, tx = t.tx, ty = t.ty, want = t.def.restoresTo;
        const owner = t.owner || g.neutral;
        g.removeBuilding(t);
        t.dead = true;
        const nb = g.placeBuilding(owner, want, tx, ty, true);
        if (nb) {
          nb.hp = Math.max(1, Math.round(nb.maxHp * 0.6));
          if (this.owner === g.human)
            g.alert(nb.def.name.toUpperCase() + " REBUILT", "good");
        }
        this.dead = true;                                // consumed
        this.order = { type: "idle" };
        return;
      }
      if (t.owner === this.owner) {
        /* already ours: only spend the engineer if there is damage to fix,
           so a second engineer following the first is not thrown away */
        if (t.hp >= t.maxHp - 1) { this.order = { type: "idle" }; return; }
        t.hp = t.maxHp;
      } else this.game.captureBuilding(t, this.owner);
      this.dead = true;                                  // consumed, not lost
      this.order = { type: "idle" };
    } else this.order = { type: "idle" };
  }

  healNearby(dt) {
    this.game.grid.query(this.x, this.y, CFG.TILE * 2.2, (e) => {
      if (e.dead || e.owner !== this.owner || e.cat !== "infantry" || e === this) return;
      if (e.hp < e.maxHp) e.hp = Math.min(e.maxHp, e.hp + this.def.heal * dt);
    });
  }
  repairNearby(dt) {
    this.game.grid.query(this.x, this.y, CFG.TILE * 2.2, (e) => {
      if (e.dead || e.owner !== this.owner || (e.cat !== "vehicle" && e.cat !== "naval") || e === this) return;
      if (e.hp < e.maxHp) e.hp = Math.min(e.maxHp, e.hp + this.def.repairRate * dt);
    });
  }
  /* supply truck / oiler: top up fuel & ammo nearby, then auto-return to reload */
  runSupply(dt) {
    if (this.supplyLeft <= 0) {
      /* head home to reload */
      if (this.order.type === "idle") {
        const src = this.game.nearestBuilding(this.owner, this.cat === "naval" ? "navalyard" : "depot", this.x, this.y) ||
                    this.game.nearestBuilding(this.owner, "conyard", this.x, this.y);
        if (src) this.order = { type: "move", x: src.x, y: src.y + CFG.TILE * 2, reload: true };
      }
      if (this.owner.inBaseRadius(this.tx, this.ty)) {
        this.supplyLeft = Math.min(this.def.supply, this.supplyLeft + 160 * dt);
      }
      return;
    }
    const R = this.def.supplyRange * CFG.TILE;
    const fac = FACTIONS[this.owner.faction] || {};
    const rate = 16 * (fac.supplyMul || 1);
    this.game.grid.query(this.x, this.y, R, (e) => {
      if (this.supplyLeft <= 0 || e.dead || e.owner !== this.owner || e === this || e.kind !== "unit") return;
      if (e.fuelMax && e.fuel < e.fuelMax) {
        const amt = Math.min(rate * dt, e.fuelMax - e.fuel, this.supplyLeft);
        e.fuel += amt; this.supplyLeft -= amt;
      }
      if (e.ammoMax && e.ammo < e.ammoMax && e.layer !== "air") {
        const amt = Math.min(0.4 * dt, e.ammoMax - e.ammo, this.supplyLeft * 0.01);
        e.ammo += amt; this.supplyLeft -= amt * 10;
      }
    });
  }

  /* Put the cargo on the ground. Three separate things were wrong here.

     It searched only six tiles out, so a landing craft that stopped short of
     the beach refused to unload and said nothing at all about why - which is
     indistinguishable from the control not working.

     It took the first tile the ring scan happened to hit rather than the
     closest one, so troops could come ashore diagonally behind the craft
     instead of straight off the ramp.

     And because tileBlocked() only knows about structures, every man in the
     hold was handed the same tile and they all landed on top of each other.

     Returns how many actually got off, so the caller can report it.        */
  unload(aimX, aimY, keepClear) {
    if (!this.cargo.length) return 0;
    const T = CFG.TILE;
    const ax = aimX === undefined ? this.x : aimX;
    const ay = aimY === undefined ? this.y : aimY;
    /* keepClear: tiles nobody is put down on - the strip a transport has
       landed on and has to take off from again (AIRLIFT LANDING) */
    const taken = new Set(keepClear || []);
    /* a Tarawa or a Wasp lands her vehicles in her landing craft, not over
       her own side (craftOnly, THE WELL DECK) */
    const keepVeh = Unit.craftOnly(this.def);
    let out = 0;
    for (let i = this.cargo.length - 1; i >= 0; i--) {
      const u = this.cargo[i];
      if (keepVeh && u.cat === "vehicle") continue;
      const spot = this.landingSpot(u, taken, ax, ay);
      if (!spot) continue;
      taken.add(spot.y * this.game.map.W + spot.x);
      u.x = spot.x * T + T / 2; u.y = spot.y * T + T / 2;
      u.carried = false; u.order = { type: "idle" };
      this.cargo.splice(i, 1);
      out++;
    }
    /* an Ivan Rogov's load goes over her bow ramp, which render3d.js lowers
       for WELL_GO.RAMP seconds where her model has one (workGate) */
    if (out && this.def.bowRamp) this.rampHold = WELL_GO.RAMP;
    return out;
  }

  /* ============================ AIR-CUSHION LANDING ============================
     (owner) "Air-cushion craft run up to the waterline (LCAC onto the sand
     edge) and unload there; the vehicle rolls off the ramp and drives to
     your aim point instead of appearing 4.5 tiles away. The LST's beaching
     stays as it is."
     Every craft put its load off the moment it came inside 4.5 tiles of the
     aim (updateGeneric), each passenger set down at once on the tile
     nearest the aim that unload() reaches. Measured on hormuz (e00, a Wasp's
     LCAC with an M1A2, right-clicked two tiles up a beach): it stopped 1.94
     tiles off the sand and the tank appeared 3.49 tiles from it, a tile
     short of the aim, having driven nowhere. A real LCAC is a hovercraft
     and its row (rules.js lst) says it "drives them straight up onto the
     beach", so a craft with def.aircushion does that instead:
       - planBeach: with the order, it picks its waterline - the sea tile of
         its own water nearest the aim with dry, clear ground straight off it
         on the aim's side of any water - and the land its ramp goes down on.
         A tile another of our craft is already running for, or one a hull
         lies on, is passed over while another is free, so three LCACs sent
         to one beach land side by side, not on top of each other;
       - it runs in to that tile (legDone steers for o.sx), then glides the
         last stretch to a third of a tile off its centre toward the land,
         bow to the beach - the berth ai.js loadingHards gives a craft on a
         hard, "so the hull ends within about twenty pixels of the beach".
         Its position stays on its sea tile and its layer stays "sea";
       - only there does it unload, through unload() itself and so by its
         rules (what may go ashore, blocked tiles, one to a tile), onto the
         land at its ramp and the tiles nearest it; each passenger is then
         handed an ordinary move to the aim, and a crowd arriving there is
         spaced round it as any other is (crowdStop).
     The new state is on the order (sx, sy: the berth; rampX, rampY: the
     land tile's centre; rampX -1: no waterline within fourteen tiles of the
     aim, the reach Path.find gives a hull, so the order works as before),
     and save.js carries it. A craft that cannot reach its berth (no route)
     drops the plan and is held to the 4.5-tile rule like any other. Without
     the flag - an LCU, a CTM, every landing and amphibious ship, the Ivan
     Rogov over her bow ramp - nothing here runs. */
  planBeach(o) {
    const g = this.game, M = g.map, W = M.W, H = M.H, T = CFG.TILE, R = 14;
    o.rampX = -1;
    const atx = U.clamp((o.x / T) | 0, 0, W - 1), aty = U.clamp((o.y / T) | 0, 0, H - 1);
    const sea = Path.components(M, this.layer), gnd = Path.components(M, "ground");
    const mine = sea ? sea[this.ty * W + this.tx] : 0, want = gnd ? gnd[aty * W + atx] : 0;
    /* the berths our other craft are already running for */
    const claim = [];
    for (const u of this.owner.units) {
      const uo = u.order;
      if (u !== this && !u.dead && !u.carried && uo && uo.unloadAt && uo.rampX >= 0)
        claim.push(((uo.sx / T) | 0) + ((uo.sy / T) | 0) * W);
    }
    const D4 = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let best = null, bd = Infinity, free = null, fd = Infinity;
    for (let y = Math.max(0, aty - R); y <= Math.min(H - 1, aty + R); y++)
      for (let x = Math.max(0, atx - R); x <= Math.min(W - 1, atx + R); x++) {
        if (!GameMap.passable(M, x, y, this.layer) || g.tileBlocked(x, y, this)) continue;
        if (mine && sea[y * W + x] !== mine) continue;
        /* dry ground straight off the bow, clear, and joined to the aim */
        let land = null, ld = Infinity;
        for (const k of D4) {
          const nx = x + k[0], ny = y + k[1];
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          if (!GameMap.passable(M, nx, ny, "ground") || g.tileBlocked(nx, ny, null)) continue;
          if (want && gnd[ny * W + nx] !== want) continue;
          const d = U.dist2((nx + 0.5) * T, (ny + 0.5) * T, o.x, o.y);
          if (d < ld) { ld = d; land = k; }
        }
        if (!land) continue;
        const d = U.dist2((x + 0.5) * T, (y + 0.5) * T, o.x, o.y);
        const c = { x, y, k: land };
        if (d < bd) { bd = d; best = c; }
        if (d >= fd) continue;
        let taken = false;
        for (const i of claim) {
          if (Math.max(Math.abs(i % W - x), Math.abs(((i / W) | 0) - y)) <= 1) { taken = true; break; }
        }
        if (!taken) g.grid.query((x + 0.5) * T, (y + 0.5) * T, T * 0.5, (e) => {
          if (!taken && e !== this && !e.dead && e.kind === "unit" && e.layer === this.layer && !e.carried && !e.moving) taken = true;
        });
        if (!taken) { fd = d; free = c; }
      }
    const c = free || best;
    if (!c) return;
    o.sx = (c.x + 0.5 + c.k[0] / 3) * T; o.sy = (c.y + 0.5 + c.k[1] / 3) * T;
    o.rampX = (c.x + c.k[0] + 0.5) * T; o.rampY = (c.y + c.k[1] + 0.5) * T;
  }
  /* the run-in, once a waterline is chosen: 3 running in, 1 gliding up to
     the sand edge, 2 there, 0 the plan given up (as any landing craft) */
  beachRun(o, arrived, dt) {
    if (!arrived) return 3;
    const d = U.dist(this.x, this.y, o.sx, o.sy);
    if (this.pathFail || d > CFG.TILE) { o.rampX = -1; return 0; }
    this.ang = U.turnToward(this.ang, Math.atan2(o.rampY - this.y, o.rampX - this.x), this.def.turn * dt);
    if (d < 1) return 2;
    const step = Math.min(d, this.def.speed * this.speedMul() * CFG.TILE * dt);
    this.x += (o.sx - this.x) / d * step; this.y += (o.sy - this.y) / d * step;
    this.moving = true;
    return 1;
  }
  /* down the ramp onto the land at it, then on to the aim */
  rampOff(o) {
    const aboard = this.cargo.slice();
    const n = this.unload(o.rampX, o.rampY);
    for (const u of aboard)
      if (!u.carried && !u.dead && this.cargo.indexOf(u) < 0) u.give({ type: "move", x: o.x, y: o.y });
    return n;
  }

  /* Nearest tile this passenger can actually stand on, skipping any tile
     already given to someone else in the same unload.

     The rings are Chebyshev, so ring r holds tiles between r and r*1.41 away
     and a tile in ring r+1 can genuinely be closer than one in ring r. So once
     a ring yields something we scan one more before choosing.              */
  landingSpot(u, taken, ax, ay) {
    const map = this.game.map, T = CFG.TILE, MAXR = 14;
    let best = null, bd = Infinity, stop = MAXR;
    for (let r = 1; r <= stop; r++) {
      for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
        const nx = this.tx + dx, ny = this.ty + dy;
        if (nx < 0 || ny < 0 || nx >= map.W || ny >= map.H) continue;
        if (taken.has(ny * map.W + nx)) continue;
        if (!GameMap.passable(map, nx, ny, u.layer)) continue;
        if (this.game.tileBlocked(nx, ny, u)) continue;
        const d = U.dist2(nx * T + T / 2, ny * T + T / 2, ax, ay);
        if (d < bd) { bd = d; best = { x: nx, y: ny }; }
      }
      if (best && stop === MAXR) stop = Math.min(MAXR, r + 1);
    }
    return best;
  }

  /* ================================ AIRLIFT ================================
     (owner) "the C-130 and other transportation airplane/helicopter should be
     able to carry some car, mobile, light tank, right?" - anything that REALLY
     fits. Until this the only thing that boarded an aircraft was infantry, one
     seat a man (updateEnter), and a C-17 that can carry an Abrams carried
     twenty riflemen and nothing else.

     WEIGHT. Every vehicle row carries its real mass in tonnes and every
     transport and airlift row now carries its real `payload` (generations.js
     AIRLIFT, with the source of each figure). A vehicle uses its own mass of
     the payload. The infantry seats stay what they were and share the
     payload between them - a seat weighs payload / cargo - so a hold with no
     vehicle in it takes exactly the riflemen it always did, a mixed load is
     held to the payload and the seats at once, and nothing rides in less
     room than a seat. A C-130J-30's 19.96 t is three Humvees (a fourth is
     20 t), or two Humvees and three riflemen, or a HIMARS and a rifleman; a
     C-17's 77.52 t is one Abrams and four riflemen.

     WHAT DOES NOT GO. Any ground vehicle within the payload boards, the
     construction rig included (55 t: a C-17 lifts it, nothing else does),
     except the ore hauler - a forty-tonne mining truck is not air-portable
     and its refinery loop owns it - and except a vehicle with troops aboard
     of its own, which unloads them first. A launcher or a gun set up where it
     stands packs up before it drives up the ramp - its own deploySec, three
     seconds for a HIMARS and sixteen for an S-200, the longest - rather than
     being refused. Something already carried or garrisoned cannot board.

     WHERE IT LOADS. A helicopter takes a vehicle wherever it sits or hovers,
     internal or on the hook, as it takes a squad. An aeroplane takes one only
     on the ground: shut down on its ramp, or stopped on a strip of open
     ground after a landing (below). Infantry board as they always have. */
  static fmtT(t) {
    const r = Math.round(t * 10) / 10;
    return r === Math.round(r) ? String(Math.round(r)) : r.toFixed(1);
  }
  static liftName(u) { return String((u.def && (u.def.name || u.def.id)) || "").toUpperCase(); }
  /* the share of the payload one infantry seat stands for */
  seatWeight() {
    const d = this.def;
    return d.payload && d.cargo ? d.payload / d.cargo : 0;
  }
  /* what a passenger weighs against this airframe: a vehicle its real mass,
     never less than a seat; a soldier, one seat */
  liftWeight(u) {
    const sw = this.seatWeight();
    return u.cat === "vehicle" ? Math.max(u.def.mass || 0, sw) : sw;
  }
  /* what is aboard: vehicles, infantry, tonnes of the payload used, metres
     of the floor used (HOLD SPACE, below) and whether a vehicle is on the hook */
  cargoLoad() {
    let veh = 0, inf = 0, t = 0;
    for (const c of this.cargo) {
      if (!c || c.dead) continue;
      if (c.cat === "vehicle") veh++; else inf++;
      t += this.liftWeight(c);
    }
    const F = this.def.hold || this.def.cabin || null, plan = this.holdPlan(this.cargo);
    return { veh, inf, t, cap: this.def.payload || 0, seats: this.def.cargo || 0,
             floor: plan.used, floorCap: F ? F[0] : 0, hook: plan.hook ? 1 : 0 };
  }

  /* ------------------------------ HOLD SPACE ------------------------------
     (owner) weight alone let a C-17 take fifteen Humvees: "add a REAL
     HOLD-SPACE limit". Each aeroplane's cargo floor (generations.js AIRLIFT
     `hold`, published per airframe) and each vehicle's own length and width
     (vehSize) now have to fit as well as the weight.

     THE RULE, as a loadmaster lays out a hold - and the same whatever order
     the load drove up the ramp in, so a vehicle the click accepted is not
     turned away at the ramp for arriving before or after the others:
       - a vehicle wider than the floor, or longer, does not go at all;
       - one narrow enough to stand two abreast (twice its width within the
         floor's) goes in one of two lanes, longest first, each into the lane
         with less in it; anything wider runs down the middle and takes the
         whole width for its length;
       - vehicles stand end to end with no gap: no spacing figure was found
         to put between them, and none is invented;
       - an infantry seat takes floor / seats of the floor, as it takes
         payload / seats of the weight, so an empty hold still takes exactly
         its seats in riflemen.
     The floor used is the middle run, plus the longer lane, plus the seats.
     A C-130J-30's 16.8 m takes three Humvees (4.9 m each) and not a fourth,
     a short C-130's 12.2 m two; a C-17's 26.8 x 5.5 m takes them two
     abreast, five a lane, or one Abrams (3.7 m wide: the middle) with 15.5 t
     left for light vehicles. Heights are not tested (generations.js says
     why). An aeroplane with no published floor - the Noratlas, the C-46,
     the Po-2 - is held to its weight alone, as before.

     HELICOPTERS. A helicopter carries a vehicle on its hook, ONE at a time
     (the owner's rule; every transport here has a hook), and infantry as its
     payload allows: the hook is not floor. A Chinook also takes vehicles
     inside, up its ramp (generations.js `cabin`): the cabin is laid out by
     the rule above, and of the vehicles aboard the one that fits the cabin
     worst - else the longest - rides the hook. */
  /* a vehicle's length and width in metres: the size table in
     generations.js, else the spec it is drawn from (armour_specs.js, which
     loads after generations.js and so is read here), else its role's class
     default; `src` says which */
  static vehSize(d) {
    if (d._size) return d._size;
    let s = null;
    if (d.sizeL > 0 && d.sizeW > 0) s = { L: d.sizeL, W: d.sizeW, src: d.sizeSrc || "table" };
    else {
      const a = typeof ARMOUR !== "undefined" ? ARMOUR[d.id] : null;
      if (a && a.len > 0 && a.width > 0) s = { L: a.len, W: a.width, src: "armour" };
    }
    if (!s) { const c = d.sizeClass || [6.8, 3.0]; s = { L: c[0], W: c[1], src: "class" }; }
    d._size = s;
    return s;
  }
  static fmtM(m) { return (Math.round(m * 10) / 10).toFixed(1); }
  static fmtW(m) { return (Math.round(m * 100) / 100).toFixed(2); }     // widths: 2.30 against 2.29
  static anA(n) { return /^([AEIOU]|[FHLMNRSX][-\d])/.test(n) ? "AN " : "A "; }
  /* The floor a set of passengers needs in this airframe, laid out by the
     rule above: { ok, why ("hook" | "wide" | "long" | "floor"), v (the
     vehicle that does not go), used and cap (metres), hook (the vehicle on
     the hook, a helicopter's) }. */
  holdPlan(list) {
    const d = this.def, F = d.hold || d.cabin || null;
    const r = { ok: true, why: "", v: null, used: 0, cap: F ? F[0] : 0, hook: null };
    const veh = [];
    let inf = 0;
    for (const c of list) {
      if (!c || c.dead) continue;
      if (c.cat === "vehicle") veh.push(c); else inf++;
    }
    let inside = veh;
    if (d.hover) {
      /* what does not fit the cabin has to go on the hook, and only one can */
      const fits = (v) => { const s = Unit.vehSize(v.def); return !!F && s.W <= F[1] + 1e-6 && s.L <= F[0] + 1e-6; };
      const out = veh.filter(v => !fits(v));
      if (out.length > 1) { r.ok = false; r.why = "hook"; r.v = out[out.length - 1]; return r; }
      inside = veh.filter(fits);
      if (out.length) r.hook = out[0];
      else if (inside.length) {
        let k = 0;
        for (let i = 1; i < inside.length; i++)
          if (Unit.vehSize(inside[i].def).L > Unit.vehSize(inside[k].def).L) k = i;
        r.hook = inside[k];
        inside = inside.filter((v, i) => i !== k);
      }
    }
    if (!F) return r;                          // no floor on record: weight decides
    const FL = F[0], FW = F[1], lanes = [];
    let mid = 0;
    for (const v of inside) {
      const s = Unit.vehSize(v.def);
      if (s.W > FW + 1e-6 || s.L > FL + 1e-6) { r.ok = false; r.why = s.W > FW + 1e-6 ? "wide" : "long"; r.v = v; return r; }
      if (2 * s.W <= FW + 1e-6) lanes.push(s.L); else mid += s.L;
    }
    lanes.sort((a, b) => b - a);
    let A = 0, B = 0;
    for (const L of lanes) { if (A <= B) A += L; else B += L; }
    r.used = mid + Math.max(A, B) + inf * FL / Math.max(1, d.cargo || 1);
    if (r.used > FL + 1e-6) { r.ok = false; r.why = "floor"; }
    return r;
  }
  /* Can a vehicle drive up the ramp now? A helicopter: wherever it is. An
     aeroplane: shut down on a ramp, or stopped on a strip with its ramp down
     - not while it is still rolling out or already rolling for take-off. */
  loadingNow() {
    if (this.layer !== "air") return true;
    if (this.def.hover) return true;
    if (this.parked || (this.order && this.order.type === "parked")) return true;
    const o = this.order;
    return !!(o && o.type === "airland" && (o.ph === "unload" || o.ph === "wait" || o.ph === "dry"));
  }
  /* "" if v may board this airframe now, else the reason, as the alert says
     it. `pending` is who else is already promised to it and on the way (a
     list of units; a number is taken as tonnes, with no floor): they count
     against the weight and the floor as if aboard. Not an airlifter: "" -
     the seat count in updateEnter decides, as before. */
  airliftRefusal(v, pending) {
    const d = this.def;
    if (!d.payload || this.layer !== "air" || !v || v.dead) return "";
    const name = Unit.liftName(this), vn = Unit.liftName(v);
    if (v.carried || v.garrisonIn) return vn + " IS ALREADY ABOARD";
    const hold = d.hover ? null : d.hold;
    if (v.cat === "vehicle") {
      if (v.layer !== "ground") return vn + " CANNOT BE AIRLIFTED";
      if (v.def.harvester) return vn + " IS NOT AIR-PORTABLE — A FORTY-TONNE MINING TRUCK";
      if (v.cargo && v.cargo.length) return vn + " HAS TROOPS ABOARD — UNLOAD THEM FIRST";
      if (!(v.def.mass > 0)) return vn + " CANNOT BE AIRLIFTED";
      if (v.def.mass > d.payload + 1e-6)
        return vn + " (" + Unit.fmtT(v.def.mass) + " T) — TOO HEAVY FOR THE " + name +
               " (" + Unit.fmtT(d.payload) + " T)";
      /* ...and on its own against the floor (HOLD SPACE) */
      const s = Unit.vehSize(v.def);
      if (hold && s.W > hold[1] + 1e-6)
        return vn + " (" + Unit.fmtW(s.W) + " M WIDE) — TOO WIDE FOR THE HOLD OF THE " + name +
               " (" + Unit.fmtW(hold[1]) + " M)";
      if (hold && s.L > hold[0] + 1e-6)
        return vn + " (" + Unit.fmtM(s.L) + " M) — TOO LONG FOR THE HOLD OF THE " + name +
               " (" + Unit.fmtM(hold[0]) + " M)";
      if (!this.loadingNow())
        return this.grounded ? name + " IS STILL ROLLING — VEHICLES LOAD ONCE IT HAS STOPPED"
                             : name + " IS IN THE AIR — VEHICLES LOAD ON THE GROUND";
    } else if (v.cat !== "infantry") return vn + " CANNOT BE AIRLIFTED";
    const pend = Array.isArray(pending)
      ? pending.filter(p => p && p !== v && !p.dead && this.cargo.indexOf(p) < 0) : [];
    /* the floor: everything aboard, everything on its way, and this one */
    const plan = this.holdPlan(this.cargo.concat(pend, [v]));
    if (!plan.ok) {
      if (plan.why === "hook") {
        const s = Unit.vehSize(v.def);
        return d.cabin ? name + " HAS A VEHICLE ON THE HOOK ALREADY — " + Unit.anA(vn) + vn + " (" +
                         Unit.fmtW(s.W) + " M WIDE) DOES NOT GO IN ITS CABIN (" + Unit.fmtW(d.cabin[1]) + " M)"
                       : name + " HAS A VEHICLE ON THE HOOK ALREADY — ONE AT A TIME";
      }
      return name + " — NO FLOOR SPACE LEFT FOR " + Unit.anA(vn) + vn +
             (v.cat === "vehicle" ? " (" + Unit.fmtM(Unit.vehSize(v.def).L) + " M)" : "");
    }
    let reserved = typeof pending === "number" ? pending : 0;
    for (const p of pend) reserved += this.liftWeight(p);
    const w = this.liftWeight(v), left = d.payload - this.cargoLoad().t - reserved;
    if (w > left + 1e-6)
      return name + " HAS " + Unit.fmtT(Math.max(0, left)) + " T LEFT — " + vn +
             " (" + Unit.fmtT(w) + " T) DOES NOT FIT";
    return "";
  }
  canAirlift(v, pending) { return !!this.def.payload && !this.airliftRefusal(v, pending); }

  /* An aircraft shut down on an airbase stands inside the footprint, which is
     a structure to the pathfinder, so nothing on wheels can drive up to it:
     for boarding, the edge of its base is alongside. */
  besideRamp(t) {
    const h = t.layer === "air" && t.padOn && !t.padOn.dead && t.padOn.kind === "building" &&
              (t.parked || (t.order && t.order.type === "parked")) ? t.padOn : null;
    if (!h || this.layer === "air") return false;
    const T = CFG.TILE, x0 = h.tx * T, y0 = h.ty * T;
    const x1 = x0 + h.def.w * T, y1 = y0 + h.def.h * T;
    if (t.x < x0 || t.x > x1 || t.y < y0 || t.y > y1) return false;     // parked on it, not near it
    const dx = Math.max(x0 - this.x, 0, this.x - x1), dy = Math.max(y0 - this.y, 0, this.y - y1);
    return Math.hypot(dx, dy) < T * 1.5;
  }
  /* updateEnter has brought this unit alongside an airlifter */
  boardAirlifter(t, dt) {
    const why = t.airliftRefusal(this);
    if (why) {
      /* Infantry turned away from a full hold go idle without a word, as they
         always have; a vehicle says why, since its driver came a long way */
      if (this.cat === "vehicle" && this.owner === this.game.human) this.game.alert(why, "bad");
      this.order = { type: "idle" };
      this.packT = 0;                    // a pack-up broken off starts again next time
      return;
    }
    if (this.deployed) {
      this.packT = (this.packT || 0) + dt;
      this.moving = false;
      if (this.packT < (this.def.deploySec || 1.6)) return;
      this.deployed = false;
    }
    this.packT = 0;
    t.cargo.push(this);
    this.carried = true; this.moving = false; this.path = null;
    this.order = { type: "idle" };
  }

  /* ---------------------------- AIRLIFT LANDING ----------------------------
     A helicopter puts a vehicle down wherever it can set down, as it puts a
     squad down - unload() on the spot, or the `airland` order below flown to a
     point. An aeroplane cannot: (owner) planes "deliver vehicles by landing
     on open ground near the drop point", rough-field, "unloading, and taking
     off again".

     G.findStrip (game.js) picks the strip: the nearest straight run of flat,
     clear, open ground near the point - sand, grass, dirt or road, one level
     of elevation all along it, nothing built on it and nobody standing on it,
     and no wood, rock, built-up block or structure under either wingtip - as
     long as this type needs (def.strip, generations.js AIRLIFT). No strip,
     no landing, and the order is refused with the reason. The crew lands
     where the player cannot see, as a real crew can: the strip is chosen
     from what its side can see - an enemy hidden in the fog does not move it
     (game.js stripBusy) - and what is standing on it is what they see on
     finals, and they go round for it.

     The order flies in phases, kept on the order as plain numbers so a save
     carries a delivery from wherever it was:
       d1, d2, d3  the approach: a turn, a straight and a turn onto the
                   extended centreline, at this airframe's own turning circle
                   (a Dubins path - the shortest such path, and one it can
                   actually fly, since flyTo turns at def.turn at full speed)
       final       down the centreline to the threshold; not lined up by then,
                   it goes round and plans the approach again
       roll        rolls out to the far end, slowing evenly to a stop
       unload      ramp down, everything aboard driven off beside the strip
                   - not before TOUCHDOWN seconds since the wheels touched,
                   the roll-out counted in, so it is drawn down by then
       wait        on the ground while anyone ordered aboard is on the way
       dry         stays on the ground: no airbase, or not the fuel to
                   reach one (airlandCanGo, below)
       turn        turns on the strip
       takeoff     rolls back down it, lifts off, and goes home - or flies
                   what was queued behind the delivery
     A helicopter flies `fly`, `touch` and `down` instead: to the point,
     coming down onto it for TOUCHDOWN seconds, and the load off.

     The order is G.airLand(transport, x, y): the U key with the transport
     selected, or the AI. Shot down at any point, the cargo dies with it
     (game.js, the existing rule). */
  static airGround(o) {
    return !!(o && o.type === "airland" &&
      (o.ph === "roll" || o.ph === "unload" || o.ph === "wait" || o.ph === "dry" || o.ph === "turn" ||
       o.ph === "takeoff" || o.ph === "touch" || o.ph === "down"));
  }
  /* every tile of the strip and the ground under its wingtips, as indices -
     on a diagonal run with the two tiles at each corner it crosses, which
     stand nearer its centreline than the wingtip tiles (game.js stripFits) */
  static stripTiles(map, o) {
    const out = [];
    if (!o || !(o.n > 0)) return out;
    const px = -o.sy, py = o.sx;                       // perpendicular, in tile steps
    const add = (x, y) => { if (x >= 0 && y >= 0 && x < map.W && y < map.H) out.push(y * map.W + x); };
    for (let i = 0; i < o.n; i++) {
      const cx = o.tax + i * o.sx, cy = o.tay + i * o.sy;
      for (let k = -1; k <= 1; k++) add(cx + k * px, cy + k * py);
      if (o.sx && o.sy && i < o.n - 1) { add(cx + o.sx, cy); add(cx, cy + o.sy); }
    }
    return out;
  }
  airland(o, dt) {
    if (this.def.hover) { this.airlandHelo(o, dt); return; }
    const T = CFG.TILE, G = this.game;
    const sp = this.def.speed * this.speedMul() * T;           // px a second
    const hdg = Math.atan2(o.uy, o.ux);
    this.grounded = Unit.airGround(o);
    switch (o.ph) {
      case "d1": case "d2": case "d3": case undefined: case "app": {
        if (o.ph === undefined || o.ph === "app" || !isFinite(o.phi)) { this.airlandPlan(o); if (o.ph === "final") break; }
        if (o.ph === "d1" || o.ph === "d3") {
          /* a turn at full rate, the way the plan has it, until the heading
             it ends on - turnToward() would take the short way round, and the
             short way is not always the one that comes out on the line */
          const want = o.ph === "d1" ? o.phi : hdg, s = o.ph === "d1" ? o.s1 : o.s2;
          const step = this.def.turn * dt;
          let rem = s * U.angDiff(this.ang, want);
          if (rem < 0) rem += U.PI2;
          if (rem <= step || rem >= U.PI2 - 1e-6) {
            this.ang = want;
            o.ph = o.ph === "d1" ? "d2" : "final";
          } else this.ang += s * step;
          this.airStep(sp, dt);
        } else {
          /* the straight: flown at its far end, which corrects what the turn
             left over */
          this.flyTo(o.t2x, o.t2y, dt);
          const along = (this.x - o.t2x) * Math.cos(o.phi) + (this.y - o.t2y) * Math.sin(o.phi);
          if (along >= -sp * dt) o.ph = "d3";
        }
        /* a plan flown for twice its length has gone wrong somewhere: plan again */
        o.pt = (o.pt || 0) + dt;
        if (o.pt > Math.max(20, 2 * (o.plen || 0) / Math.max(1, sp))) o.ph = "app";
        break;
      }
      case "final": {
        const along = (this.x - o.ax) * o.ux + (this.y - o.ay) * o.uy;
        const lat = -(this.x - o.ax) * o.uy + (this.y - o.ay) * o.ux;
        const turnR = sp / Math.max(0.05, this.def.turn);
        /* the strip is looked at once, on finals, as the crew would: anything
           that has driven onto it since the plan sends this one round for the
           next strip, or home with the cargo when there is none */
        if (!o.seen && along > -2.5 * turnR - 3 * T) {
          o.seen = true;
          if (!G.stripClear(this, o)) {
            if (!this.airlandReplan(o, "STRIP BLOCKED")) return;
            break;
          }
        }
        if (along >= -0.3 * T) {
          if (Math.abs(lat) < 0.8 * T && Math.abs(U.angDiff(this.ang, hdg)) < 0.5) {
            /* on its wheels: snapped onto the centreline it was all but on */
            this.x = o.ax + o.ux * Math.max(0, along);
            this.y = o.ay + o.uy * Math.max(0, along);
            this.ang = hdg; o.gs = sp; o.ph = "roll"; o.t = 0;
            this.grounded = true;
            this.field = Unit.fieldOf(o);
            break;
          }
          /* not lined up: go round, and plan the approach again from here */
          o.goes = (o.goes || 0) + 1;
          if (o.goes > 4) { this.airlandAbort(o, "COULD NOT LINE UP ON THE STRIP"); return; }
          o.ph = "app";
          this.airStep(sp, dt);
          break;
        }
        const look = Math.max(1.5 * T, 0.9 * turnR);
        this.flyTo(o.ax + o.ux * (along + look), o.ay + o.uy * (along + look), dt);
        break;
      }
      case "roll": {
        /* slowing evenly from flying speed to a stop at the far end; o.t is
           the time since the wheels touched, which `unload` goes on with */
        o.t = (o.t || 0) + dt;
        const along = (this.x - o.ax) * o.ux + (this.y - o.ay) * o.uy;
        const left = Math.max(1, o.len - along);
        o.gs = Math.max(0, o.gs - (o.gs * o.gs) / (2 * left) * dt);
        const d = Math.min(o.gs * dt, Math.max(0, o.len - along));
        this.x += o.ux * d; this.y += o.uy * d;
        if (o.gs < 0.06 * sp || along + d >= o.len - 0.5) { o.ph = "unload"; this.moving = false; }
        break;
      }
      case "unload": {
        this.moving = false;
        /* the ramp goes down once it is on its wheels in the drawing too
           (TOUCHDOWN): the roll-out is most of that or all of it - a
           C-130J's on its 5-tile strip 2.3 s, so it waits 0.4 s more here;
           a C-17A's on 11 tiles 5 s, so it waits for nothing */
        if (!o.off) {
          o.t = (o.t || 0) + dt;
          if (o.t < TOUCHDOWN) break;
          o.off = 1; o.t = 0; this.airlandUnload(o);
        }
        o.t = (o.t || 0) + dt;
        if (o.t >= 3) { o.ph = "wait"; o.t = 0; }
        break;
      }
      case "wait": {
        this.moving = false;
        o.t = (o.t || 0) + dt;
        /* stays down while anyone ordered aboard is still coming, and a while
           anyway when it landed empty to be loaded - never for ever */
        const coming = this.boardersComing();
        const hold = o.load ? 20 : 2;
        if (o.t >= 90 || (o.t >= hold && !coming)) { o.ph = "turn"; o.t = 0; }
        break;
      }
      case "turn": {
        /* never off the ground without the fuel to reach an airbase */
        if (!this.airlandCanGo(o)) break;
        /* round to face the longer run left, at taxiing speed */
        this.moving = false;
        const along = (this.x - o.ax) * o.ux + (this.y - o.ay) * o.uy;
        const back = along > o.len / 2;
        const want = back ? hdg + Math.PI : hdg;
        this.ang = U.turnToward(this.ang, want, 1.2 * dt);
        if (Math.abs(U.angDiff(this.ang, want)) < 0.01) {
          this.ang = want; o.ph = "takeoff"; o.gs = 0;
          o.run = Math.max(T, back ? along : o.len - along);
        }
        break;
      }
      case "dry": {
        /* down with too little fuel to get home, or no airbase to go home
           to (airlandCanGo): it stays where it is, ramp down, and looks again
           every two seconds - an airbase built or taken, or nearer, lets it
           go (a tanker does not: reserveFuel says why); what it was told to
           do meanwhile waits in o.then */
        this.moving = false;
        o.t = (o.t || 0) + dt;
        if (o.t >= 2) { o.t = 0; if (this.airlandFuelOK()) { o.ph = "turn"; o.dw = 0; } }
        break;
      }
      case "takeoff": {
        o.gs = Math.min(sp, o.gs + (sp * sp) / (2 * (o.run || o.len || T)) * dt);
        this.x += Math.cos(this.ang) * o.gs * dt;
        this.y += Math.sin(this.ang) * o.gs * dt;
        if (o.gs >= sp - 1e-6) this.airlandDone(o);
        break;
      }
      default: o.ph = "app";
    }
    this.x = U.clamp(this.x, 8, G.map.W * T - 8);
    this.y = U.clamp(this.y, 8, G.map.H * T - 8);
  }
  /* straight ahead at speed, as flyTo moves */
  airStep(sp, dt) {
    this.x += Math.cos(this.ang) * sp * dt;
    this.y += Math.sin(this.ang) * sp * dt;
    this.x = U.clamp(this.x, 8, this.game.map.W * CFG.TILE - 8);
    this.y = U.clamp(this.y, 8, this.game.map.H * CFG.TILE - 8);
  }
  /* ---- the approach: a Dubins path onto the extended centreline ----
     A turn, a straight, a turn, at this airframe's own turning radius, ending
     at the gate on the centreline - far enough out to settle on it - pointing
     down the strip. Of the four turn-straight-turn shapes the shortest is
     flown; at least two exist from anywhere, so there is always a plan. */
  airlandPlan(o) {
    const T = CFG.TILE;
    const sp = this.def.speed * this.speedMul() * T;
    const r = sp / Math.max(0.05, this.def.turn);
    const hdg = Math.atan2(o.uy, o.ux);
    const fin = Math.max(2 * T, 1.5 * r);
    const gx = o.ax - o.ux * fin, gy = o.ay - o.uy * fin;
    o.pt = 0; o.seen = false;
    /* already on the line, behind the gate and pointing down it */
    const along = (this.x - o.ax) * o.ux + (this.y - o.ay) * o.uy;
    const lat = -(this.x - o.ax) * o.uy + (this.y - o.ay) * o.ux;
    if (along <= -fin && Math.abs(lat) < 0.5 * T && Math.abs(U.angDiff(this.ang, hdg)) < 0.3) {
      o.ph = "final"; return;
    }
    const P = Unit.dubins(this.x, this.y, this.ang, gx, gy, hdg, r);
    o.s1 = P.s1; o.phi = P.phi; o.s2 = P.s2; o.t2x = P.t2x; o.t2y = P.t2y; o.plen = P.len;
    o.ph = "d1";
  }
  static dubins(x0, y0, a0, x1, y1, a1, r) {
    const TAU = Math.PI * 2, md = (a) => ((a % TAU) + TAU) % TAU;
    let best = null;
    for (const s1 of [1, -1]) for (const s2 of [1, -1]) {
      /* the centre of a turn of sign s: positive turns the heading up */
      const c1x = x0 - s1 * r * Math.sin(a0), c1y = y0 + s1 * r * Math.cos(a0);
      const c2x = x1 - s2 * r * Math.sin(a1), c2y = y1 + s2 * r * Math.cos(a1);
      const dx = c2x - c1x, dy = c2y - c1y, D = Math.hypot(dx, dy), b = Math.atan2(dy, dx);
      let phi;
      if (s1 === s2) phi = b;                                   // outer tangent
      else {                                                    // inner tangent
        if (D < 2 * r) continue;
        phi = b + s1 * Math.asin(2 * r / D);
      }
      const t1x = c1x + s1 * r * Math.sin(phi), t1y = c1y - s1 * r * Math.cos(phi);
      const t2x = c2x + s2 * r * Math.sin(phi), t2y = c2y - s2 * r * Math.cos(phi);
      const st = (t2x - t1x) * Math.cos(phi) + (t2y - t1y) * Math.sin(phi);
      if (st < -1e-6) continue;
      const len = r * md(s1 * (phi - a0)) + Math.max(0, st) + r * md(s2 * (a1 - phi));
      if (!best || len < best.len) best = { s1, s2, phi, t2x, t2y, len };
    }
    return best || { s1: 1, s2: 1, phi: a1, t2x: x1, t2y: y1, len: Math.hypot(x1 - x0, y1 - y0) };
  }
  /* the strip, as a field it is standing on: kept on the unit so an order
     given on the ground can start with the take-off run */
  static fieldOf(o) {
    return { ax: o.ax, ay: o.ay, bx: o.bx, by: o.by, ux: o.ux, uy: o.uy, len: o.len,
             tax: o.tax, tay: o.tay, sx: o.sx, sy: o.sy, n: o.n, x: o.x, y: o.y };
  }
  /* Everything aboard off, beside the far end of the strip, and none of it
     left standing on the strip it has to take off from again. */
  airlandUnload(o) {
    const n0 = this.cargo.length;
    if (!n0) return 0;
    const veh = this.cargo.filter(c => c.cat === "vehicle").length;
    const T = CFG.TILE, px = -o.uy, py = o.ux;
    const keep = Unit.stripTiles(this.game.map, o);
    let n = this.unload(this.x + px * 2 * T, this.y + py * 2 * T, keep);
    if (n < n0) n += this.unload(this.x - px * 2 * T, this.y - py * 2 * T, keep);
    if (this.owner === this.game.human && n) {
      const v = Math.min(veh, n), i = n - v;
      this.game.alert(Unit.liftName(this) + " DOWN — " +
        (v ? v + (v === 1 ? " VEHICLE" : " VEHICLES") : "") + (v && i ? " AND " : "") +
        (i ? i + (i === 1 ? " SOLDIER" : " SOLDIERS") : "") + " UNLOADED", "good");
    }
    return n;
  }
  /* anyone of ours with an order to board this airframe, still on the way */
  boardersComing() {
    for (const u of this.owner.units)
      if (!u.dead && !u.carried && u.order && u.order.type === "enter" && u.order.target === this) return true;
    return false;
  }
  /* ---- FUEL: never land where it cannot get home ----
     Two checks, one at each end (stage-1 review):
       - before the order is given, G.airlandFuel (game.js) asks whether a
         full tank from its airbase reaches the strip with bingo fuel still
         aboard - what it needs there to get home - and refuses a strip
         beyond that, with the reason; within reach but short of fuel now, it
         goes home first and flies the delivery after (a { rtb, then });
       - on the ground the engines stop (unload, wait, turn and dry burn
         nothing - the fuel burn runs only while moving), so one that landed
         with fuel to get home still has it; one that has not - its airbase
         lost while it waited, or the tanks emptied by a test - would take
         off and fall out of the sky on the way, as the stage-1 build did
         (measured: down at t=11 s after a dry take-off). It stays on the
         strip instead, says so once, and goes when it can.
     "An airbase" is one to land on: with every ramp gone the reserve was
     measured to the owner's home point instead, which is not a runway, and a
     C-130J down 30 tiles out with 90% aboard took off on it, orbited home -
     "NO RUNWAY TO RECOVER TO" - and fell out of the sky (stage-1b review).
     Standing on its strip it is still a transport: it stays. */
  airlandCanGo(o) {
    if (this.airlandFuelOK()) return true;
    o.ph = "dry"; o.t = 0;
    if (!o.dw) {
      o.dw = 1;
      if (this.owner === this.game.human)
        this.game.alert(Unit.liftName(this) + (this.airlandRamp()
          ? " — NOT ENOUGH FUEL TO REACH AN AIRBASE: STAYING ON THE GROUND"
          : " — NO AIRBASE TO RECOVER TO: STAYING ON THE GROUND"), "bad");
    }
    return false;
  }
  /* the ramp an rtb from here would land on (updateAir rtb: the pad
     findPad gives, else its own over-stacked one), or null - none at all */
  airlandRamp() {
    const own = this.padOn;
    return (this.game.findPad && this.game.findPad(this)) ||
           (own && !own.dead && (own.kind !== "building" || own.buildProgress >= 1) ? own : null);
  }
  /* may it leave the ground: a ramp to go to, and the fuel to get there */
  airlandFuelOK() {
    if (this.def.hover || !this.fuelMax) return true;
    return !!this.airlandRamp() && this.fuel >= this.reserveFuel(true);
  }
  /* off the ground, and on to what comes next: the order given while it was
     down, then what was queued behind the delivery, else home */
  airlandDone(o) {
    this.grounded = false; this.field = null;
    if (o.then) { this.order = o.then; return; }
    if (this.nextOrder()) return;
    this.order = { type: "rtb" };
  }
  /* given an order while on the ground: the take-off run first, then it */
  airlandLeave(next) {
    const f = this.field;
    if (this.def.hover || !f) { this.grounded = false; this.field = null; return next; }
    return Object.assign({ type: "airland" }, f, { ph: "turn", t: 0, gs: 0, then: next });
  }
  /* a delivery carried home for fuel comes back to the same point and
     plans its approach from wherever it then is */
  airlandResume(o) {
    if (!this.cargo.length && !o.load) return null;
    const r = Object.assign({}, o);
    r.ph = this.def.hover ? "fly" : "app"; r.goes = 0; r.t = 0; r.seen = false;
    delete r.then;
    return r;
  }
  /* the strip went bad on finals: the next one near the same point, or home */
  airlandReplan(o, why) {
    const s = this.game.findStrip ? this.game.findStrip(this, o.x, o.y) : null;
    if (!s) { this.airlandAbort(o, why); return false; }
    Object.assign(o, s);
    o.ph = "app"; o.goes = (o.goes || 0) + 1;
    if (o.goes > 4) { this.airlandAbort(o, why); return false; }
    return true;
  }
  airlandAbort(o, why) {
    this.grounded = false; this.field = null;
    if (this.owner === this.game.human)
      this.game.alert(Unit.liftName(this) + " — " + why +
        (this.cargo.length ? ", RETURNING WITH THE CARGO" : ", RETURNING"), "bad");
    this.order = { type: "rtb" };
  }
  /* a helicopter sets down at the point, puts its load off and lifts again */
  airlandHelo(o, dt) {
    if (o.ph !== "touch" && o.ph !== "down") {
      this.grounded = false;
      if (this.flyTo(o.x, o.y, dt)) { o.ph = "touch"; o.t = 0; }
      return;
    }
    /* on its wheels only where there is ground to stand on: over water, or
       on top of a structure, it hovers at the point while the load goes off
       to the nearest open ground. G.airLand takes any point for a
       helicopter, and one sent to a point off the shore of fulda "set down"
       in the sea - drawn standing in the water and presented to every gun
       as a vehicle on the ground (targetLayer). */
    this.grounded = GameMap.passable(this.game.map, this.tx, this.ty, "ground") &&
                    !this.game.tileBlocked(this.tx, this.ty, null);
    this.moving = false;
    /* coming down onto it: nobody out until it is on its wheels in the
       drawing too (TOUCHDOWN) - an MV-22B put its squad down the moment it
       arrived, drawn still at cruise height, and lifted again 2 s later
       before the drawing had brought it down. It is on the ground in the
       rules from the start of it, as it was from the moment it arrived.
       Hovering where it cannot set down there is nothing to wait for. */
    if (o.ph === "touch") {
      o.t = (o.t || 0) + dt;
      if (this.grounded && o.t < TOUCHDOWN) return;
      o.ph = "down"; o.t = 0;
    }
    if (!o.off) {
      o.off = 1;
      const veh = this.cargo.filter(c => c.cat === "vehicle").length;
      const n = this.unload(o.x, o.y);
      if (n && this.owner === this.game.human) {
        const v = Math.min(veh, n), i = n - v;
        this.game.alert(Unit.liftName(this) + " SET DOWN — " +
          (v ? v + (v === 1 ? " VEHICLE" : " VEHICLES") : "") + (v && i ? " AND " : "") +
          (i ? i + (i === 1 ? " SOLDIER" : " SOLDIERS") : "") + " UNLOADED", "good");
      } else if (!n && this.cargo.length && this.owner === this.game.human)
        this.game.alert(Unit.liftName(this) + " — NO CLEAR GROUND TO SET DOWN ON", "bad");
    }
    o.t = (o.t || 0) + dt;
    const hold = o.load ? 20 : 2;
    if (o.t >= 90 || (o.t >= hold && !this.boardersComing())) {
      this.grounded = false;
      if (o.then) this.order = o.then;
      else if (!this.nextOrder()) this.order = { type: "hover" };
    }
  }
}

/* =============================================================== BUILDING */
class Building {
  constructor(game, defId, owner, tx, ty) {
    /* ---- the guns of the army and the period that dug it ----
       A US AA Battery of the 1960s is an M167 Vulcan and a Soviet one an S-60
       (rules.js BUILDING_SIDE), keyed exactly as render3d draws them: the
       owner's army, and the period its owner is in now. this.def is then that
       row's copy of the shared def - id, cost, hit points and everything else
       unchanged, the weapons and the description its own - and every reader
       of a structure's weapons (pickWeapon, combat.js, the AI's sightings,
       the selection panel) reads it there. Settled once, here: an army that
       re-equips builds the new guns but does not re-gun the old batteries,
       as it does not retro-fit its tanks. `era` is the period it was dug in
       and `builtBy` the army that dug it - kept apart from the owner, which
       an engineer can change: a battery taken keeps its guns, and render3d
       (bldFrom) goes on drawing every emplacement as the site that army dug
       in that period, in its new owner's colours. A save carries both
       (save.js `bf`, `be`). `sideKey` is the BUILDING_SIDE row it fires, or
       the id. Any other army, period or structure keeps BUILDINGS[defId]
       itself, as before. */
    this.era = (owner && owner.era) || (game && game.era) || "e20";
    this.builtBy = (owner && owner.faction) || null;
    this.sideKey = typeof bldSideKey === "function" ? bldSideKey(defId, this.builtBy, this.era) : defId;
    /* ...or the shape an older save has it in (rules.js BUILDING_LEGACY):
       not in BUILDINGS, so its own key is the def */
    const d = (this.sideKey !== defId && bldDefOf(this.sideKey)) || BUILDINGS[defId] || bldDefOf(defId);
    if (d === BUILDINGS[defId]) this.sideKey = defId;
    this.id = EID++;
    this.game = game; this.def = d; this.owner = owner;
    this.kind = "building"; this.cat = d.cat; this.layer = "ground";
    this.tx = tx; this.ty = ty;
    this.x = (tx + d.w / 2) * CFG.TILE;
    this.y = (ty + d.h / 2) * CFG.TILE;
    this.r = Math.max(d.w, d.h) * CFG.TILE * 0.55;
    this.armor = d.armor;
    /* Whether this structure is unclaimed. canGarrison(), enterGarrison() and
       leaveGarrison() all read and write b.neutral, but nothing ever set it,
       so it was undefined on every building — which meant a civilian block
       could never be occupied by anybody at all. */
    this.neutral = !!d.neutral;
    const bf = FACTIONS[owner.faction] || {};
    this.maxHp = d.hp * (bf.structHpMul || 1);
    this.hp = this.maxHp;
    this.dead = false;
    this.vet = 0;
    this.suppress = 0;
    this.ang = 0; this.tang = -Math.PI / 2;
    this.cooldowns = (d.weapons || []).map(() => 0);
    this.buildProgress = 1;            // set to 0 while under construction
    this.repairing = false;
    this.rally = { x: this.x, y: this.y + (d.h / 2 + 1.5) * CFG.TILE };
    this.pads = [];                    // airbase landing slots
    this.moving = false;
    this.swCharge = d.superweapon ? 0 : -1;   // strategic weapon readiness 0..1
    this.swWarned = false;
  }
  get powered() {
    return !this.def.needPower || this.owner.powerRatio() >= 1;
  }
  /* Make this the structure `fac` dug in `era` (either may be left out):
     what a save restores (save.js `bf`, `be`). The load rebuilds every
     structure as its owner's of the owner's period at that moment, and
     neither need be the one that dug it - an army re-equips, and a battery
     taken by an engineer keeps the guns it was taken with. Its guns and
     description are that army's of that period (rules.js BUILDING_SIDE),
     its hit points that army's as on the day it was dug (structHpMul,
     which a capture does not change either), and render3d draws it from
     builtBy and era. Only the def, the cooldowns of its mounts and maxHp
     can change; the caller sets hp after. */
  setOrigin(fac, era) {
    const id = this.def.id;
    if (fac && FACTIONS[fac]) this.builtBy = fac;
    if (era && (typeof ERAS === "undefined" || ERAS.indexOf(era) >= 0)) this.era = era;
    /* an older save's shape stays the shape it was laid out in */
    const d = (typeof bldLegacyKey === "function" && bldLegacyKey(this.def)) ? this.def
      : (typeof bldDefFor === "function" && bldDefFor(id, this.builtBy, this.era)) || BUILDINGS[id];
    this.sideKey = typeof bldDefKey === "function" ? bldDefKey(d) : id;
    if (d !== this.def) {
      this.def = d;
      this.cooldowns = (d.weapons || []).map(() => 0);
    }
    this.maxHp = d.hp * ((FACTIONS[this.builtBy] || {}).structHpMul || 1);
    return this;
  }
  retaliate() {}
  /* A structure presents its own layer and its own armour - it is never
     parked on anything. Both exist so that a caller holding any entity out
     of the grid can ask without first testing what kind it is. */
  targetLayer() { return this.layer; }
  armorClass() { return this.armor; }
  /* `auto` is accepted and ignored, and the comment says so honestly rather
     than claiming parity: a structure has no order, so released() is a flat
     false and its answer is the automatic one either way - a held round
     emplaced in a building would be invisible to the commanded question too.
     Academic today: nothing in BUILDINGS mounts one, and the eras/generations
     derivation walks UNITS only, so no structure can ever acquire noAuto. No
     new sensor is consulted here, which is what keeps _behtest [7] an
     assertion about weapons and not about visibility. */
  canTarget(t, auto) {
    if (!t || t.dead || !this.def.weapons) return false;
    return this.pickWeapon(t) >= 0;
  }
  /* pickWeapon is borrowed wholesale from Unit and now asks holdsFire on every
     mount, so these have to exist here or the first defensive tick throws. */
  manualWeapon(w) { return Unit.prototype.manualWeapon.call(this, w); }
  released() { return false; }
  holdsFire(w) { return this.manualWeapon(w) || Unit.prototype.radarOffMount.call(this, w); }
  pickWeapon(t) { return Unit.prototype.pickWeapon.call(this, t); }
  weaponRange(w) { return Unit.prototype.weaponRange.call(this, w); }
  sightR() { return this.def.sight * (this.owner.upgrades.optics ? 1.25 : 1); }

  /* How far a point is from this structure's footprint, 0 inside it. A long
     structure (the 12 x 4 airbase) is measured by this, not by the circle
     of r round its middle, which reached 4.6 tiles off its long sides (a
     click, a blast, an engineer's reach). */
  edge(x, y) {
    const T = CFG.TILE, x0 = this.tx * T, y0 = this.ty * T, x1 = x0 + this.def.w * T, y1 = y0 + this.def.h * T;
    const dx = x < x0 ? x0 - x : x > x1 ? x - x1 : 0, dy = y < y0 ? y0 - y : y > y1 ? y - y1 : 0;
    return Math.sqrt(dx * dx + dy * dy);
  }
  long() { return this.def.w !== this.def.h; }
  /* aircraft based here, whether on the ramp or currently flying */
  wing() {
    const out = [];
    for (const u of this.owner.units)
      if (!u.dead && u.layer === "air" && u.padOn === this) out.push(u);
    return out;
  }
  /* just the ones sitting on the ramp, available to send */
  onRamp() { return this.wing().filter(u => u.parked); }
  /* ---- THE REVETMENTS OF THE RUNWAY BASE (def.padPts) ----
     An aircraft keeps the revetment it had while it is free: the slot used
     to be its place in the owner's unit list among those parked, so one
     taking off moved every other one along a bay. One coming home claims
     its revetment as it turns for the base (the rtb branch), so nothing
     else is given it meanwhile. Not saved: after a load each takes the
     first free one again. */
  bayFor(u) {
    const taken = new Set();
    for (const w of this.wing())
      if (w !== u && w.bayHost === this && w.bay !== undefined &&
          (w.parked || (w.order && (w.order.type === "rtb" || w.order.type === "land")))) taken.add(w.bay);
    if (u.bayHost === this && u.bay !== undefined && !taken.has(u.bay)) return u.bay;
    let i = 0;
    while (taken.has(i)) i++;
    return i;
  }
  /* A revetment's world point and heading. A field holding more than it has
     bays stands the rest at the runway's west end, nose east, one drawn
     length apart along its north edge, then its south edge - the only open
     ground it has. */
  padPoint(slot) {
    const d = this.def, P = d.padPts, T = CFG.TILE, x0 = this.tx * T, y0 = this.ty * T;
    if (slot < P.length) return { x: x0 + P[slot][0] * T, y: y0 + P[slot][1] * T, ang: d.padAng || 0 };
    const k = slot - P.length, R = d.runway, row = ((k / 6) | 0) % 2;
    /* along the runway from its first end, on the revetments' side of it and
       then the far side: n is the side the revetments are on */
    const L = Math.hypot(R.x1 - R.x0, R.y1 - R.y0) || 1, ux = (R.x1 - R.x0) / L, uy = (R.y1 - R.y0) / L;
    let nx = uy, ny = -ux;
    if ((P[0][0] - R.x0) * nx + (P[0][1] - R.y0) * ny < 0) { nx = -nx; ny = -ny; }
    const s = 0.9 + 1.8 * (k % 6) + 0.9 * (((k / 12) | 0) % 2), o = (R.half - 0.35) * (row ? -1 : 1);
    return { x: x0 + (R.x0 + ux * s + nx * o) * T, y: y0 + (R.y0 + uy * s + ny * o) * T, ang: Math.atan2(uy, ux) };
  }
  ramp() { return this.def.pads || this.def.carrier || 0; }
  tryFire(wi, t) { Unit.prototype.tryFire.call(this, wi, t); }

  update(dt) {
    if (this.dead) return;
    if (this.buildProgress < 1) return;                       // still being built
    const d = this.def;
    /* Occupants killed inside the building are never taken off its books -
       Combat.kill() drops the unit and nothing else - so the slots leaked and
       a block whose garrison had been burned out stayed the occupier's, which
       kept every gun in range demolishing an empty house. Prune the dead, then
       hand the building back. */
    if (this.garrison && this.garrison.length) {
      for (let i = this.garrison.length - 1; i >= 0; i--) {
        const g = this.garrison[i];
        if (!g || g.dead || g.garrisonIn !== this) this.garrison.splice(i, 1);
      }
      if (!this.garrison.length) releaseCivilian(this);
    }
    for (let i = 0; i < this.cooldowns.length; i++)
      if (this.cooldowns[i] > 0) this.cooldowns[i] -= dt;

    /* auto-repair mode drains cash */
    if (this.repairing && this.hp < this.maxHp && this.owner.cash > 1) {
      const heal = this.maxHp * CFG.REPAIR_RATE * dt;
      const cost = heal * CFG.REPAIR_COST;
      if (this.owner.spend(Math.min(cost, this.owner.cash))) {
        this.hp = Math.min(this.maxHp, this.hp + heal);
      }
      if (this.hp >= this.maxHp) this.repairing = false;
    }

    /* oil derrick income */
    if (d.oilNode) this.owner.oil += d.oilRate * dt * ((FACTIONS[this.owner.faction] || {}).supplyMul || 1);

    /* strategic weapon spins up only while the grid holds */
    if (d.superweapon && this.swCharge < 1) {
      if (this.powered && this.owner.powerRatio() >= 1) {
        this.swCharge = Math.min(1, this.swCharge + dt / d.superweapon.charge);
        if (this.swCharge >= 1 && !this.swWarned) {
          this.swWarned = true;
          if (this.owner === this.game.human) {
            this.game.alert(d.superweapon.label + " READY", "good");
            Sfx.play("ready");
            Sfx.announce(d.superweapon.nuke ? "nuke_ready" : "missile_ready", this);
          } else {
            /* an enemy silo's clock is the one thing this game makes public -
               the sidebar runs every enemy countdown for every player (ui.js
               syncSuperweapons) - so the voice may say it is armed; never
               where it is, and never an ally's */
            const hu = this.game.human;
            if (hu && !this.game.allied(hu, this.owner))
              Sfx.announce(d.superweapon.nuke ? "enemy_nuke_armed" : "enemy_missile_armed", hu);
            this.game.alert("ENEMY " + d.superweapon.label + " IS READY", "bad");
          }
        }
      }
    }

    /* defensive fire */
    if (d.weapons && d.weapons.length && this.powered) {
      /* A held focus is re-tested every tick, not merely kept until it dies or
         walks out of range. Two things can take it away: a civilian block that
         was fair game while it was manned goes neutral again the moment it is
         emptied, and an aircraft that lands stops being an air target. Either
         way the gun has to stop rather than finish the job. Mobile shooters
         already do this in engage(), which idles when pickWeapon returns -1. */
      if (!this.focus || this.focus.dead || !autoTargetable(this.focus) ||
          !this.canTarget(this.focus, true) ||
          U.dist(this.x, this.y, this.focus.x, this.focus.y) > this.weaponRange(WEAPONS[d.weapons[0]]) * 1.1) {
        this.focus = this.acquire();
      }
      if (this.focus) {
        const wi = this.pickWeapon(this.focus);
        if (wi >= 0) {
          const w = WEAPONS[d.weapons[wi]];
          const dist = U.dist(this.x, this.y, this.focus.x, this.focus.y);
          const minR = (w.minRange || 0) * CFG.TILE;
          if (dist <= this.weaponRange(w) && dist >= minR) {
            /* howitzer emplacements need someone to see the target */
            if ((w.proj === "arc") && !this.game.visibleTo(this.owner, this.focus)) return;
            const want = Math.atan2(this.focus.y - this.y, this.focus.x - this.x);
            this.tang = U.turnToward(this.tang, want, 1.8 * dt);
            if (Math.abs(U.angDiff(this.tang, want)) < 0.15) this.tryFire(wi, this.focus);
          }
        }
      }
    }
    /* service depot: repair vehicles on the pad; a naval yard does the same
       for hulls, and needs a wider berth because a destroyer alongside a
       three-tile slipway does not sit on top of it */
    if (d.repair) {
      this.game.grid.query(this.x, this.y, CFG.TILE * (d.repairSea ? 4.6 : 2.4), (e) => {
        if (e.dead || e.owner !== this.owner || e.kind !== "unit" || e.cat === "infantry") return;
        if (d.repairSea && e.layer !== "sea" && e.layer !== "sub") return;
        if (e.hp < e.maxHp && this.owner.cash > 1) {
          const heal = e.maxHp * 0.05 * dt;
          this.owner.spend(heal * 0.12);
          e.hp = Math.min(e.maxHp, e.hp + heal);
        }
        if (e.fuelMax) e.fuel = Math.min(e.fuelMax, e.fuel + 20 * dt);
      });
    }
  }
  acquire() {
    let best = null, bd = Infinity;
    const R = this.def.weapons ? this.weaponRange(WEAPONS[this.def.weapons[0]]) : 0;
    /* PERF: R * R and the air-track rule read nothing but this emplacement, and
       were being worked out again for every candidate the grid handed back.
       Measured: Building.acquire ran 462,934 times in the 350 game-seconds
       around t=850 and cost 9.4 s of a 253.8 s window, growing 8.5 -> 17.0 ->
       24.2 us a call as the board filled from 41 structures to 183.
       The primary mount is read through the SAME guard as the line above:
       inside the callback `canTarget(e, true)` had already proved def.weapons
       exists, and up here nothing has. Today the only caller gates on
       `d.weapons && d.weapons.length`, so an unguarded read could not throw -
       but that is a property of the call site, not of this function, and a
       second caller or an era rewrite that stripped a defence structure's
       weapons would have made it throw on the first defensive tick. */
    const w0 = this.def.weapons ? (WEAPONS[this.def.weapons[0]] || {}) : {};
    const R2 = R * R;
    const VISUAL = 11;
    const needsTrack = ((this.def.radarQ || this.def.radar) && !(this.emcon && this.game.radarDark(this))) ||
          this.layer === "air" ||
          ((this.def.role === "aa" || this.def.role === "sam") &&
           (w0.range || 0) > VISUAL);
    this.game.grid.query(this.x, this.y, R, (e) => {
      if (e.dead || e.owner === this.owner || this.game.allied(this.owner, e.owner)) return;
      /* The civilian player is nobody's ally, so the ownership test above lets a
         vacant block straight through and the turret spent its war levelling
         the village across the road. */
      /* ---- THE CHEAPEST QUESTION FIRST ----
         PERF: the two gates below are the expensive half of this scan -
         canTarget() runs the whole pickWeapon scoring loop for the candidate,
         and the airTrack test walks both sides' sensor lists. The score a
         candidate can finally receive is raw * targetPrio(e, 1), and
         targetPrio is clamped at 0.30 from below (see the table above class
         Unit), so raw * 0.30 is a floor it cannot go under; an out-of-range
         candidate is scored at 1.9 * raw, further above that floor still.
         Anything whose floor already loses to the incumbent can never become
         `best` whatever the gates answer, and every gate here is a pure read,
         so skipping them changes no pick. bd starts at Infinity, so the first
         candidate is always scored in full. */
      const raw = U.dist2(this.x, this.y, e.x, e.y);
      if (raw * 0.30 >= bd) return;
      if (!autoTargetable(e)) return;
      /* the automatic question, said out loud - a turret choosing its own
         target is the same act as a column choosing one on the march */
      if (!this.canTarget(e, true)) return;
      /* an aircraft can only be engaged if somebody actually holds a track
         on it - your own radar, or a friendly sensor over the datalink */
      /* An engagement beyond visual range needs somebody to be holding a
         radar track on the target - your own set, or a friendly one over the
         datalink. Inside visual range it does not: a Stinger is an infrared
         missile aimed by a man looking at the aeroplane, and requiring it to
         wait for a radar picture meant a MANPADS section could never fire at
         all. Twelve of them killed nothing in a hundred seconds against six
         A-10s, which read as a balance problem and was really this. */
      /* VISUAL and needsTrack are hoisted above the query - see the note there */
      /* A parked airframe is not a radar track, it is a thing sitting in the
         open, so it goes down the ordinary visual branch instead. */
      if (e.targetLayer() === "air" && this.game.airTrack && needsTrack) {
        if (!this.game.airTrack(this, e)) return;
      } else if (e.def && e.def.stealth &&
          U.dist(this.x, this.y, e.x, e.y) > R * (1 - e.def.stealth * CFG.STEALTH_ACQ)) return;
      /* The same recognition manual the mobile shooters use (targetPrio,
         above class Unit): a turret with a mortar team and a rifleman in its
         arc should shoot the mortar team.
         Only among candidates INSIDE R, the primary mount's reach (no armed
         structure in the tables mounts a second weapon). grid.query() hands
         back whole two-tile buckets, so candidates up to two tiles past R
         along an axis, and further at the corners, do arrive here, and a plain weighted distance let one of them win: a
         nest with a tank shooting it from 5.0 tiles picked the self-propelled
         gun at 7.7 (59.3 x 0.40 = 23.7 against 25), dropped it next tick at
         the 1.1R re-test, picked it again, and never fired. So an
         out-of-range candidate is scored at the clamp ceiling, 1.9 times its
         squared distance: every in-range candidate outranks every
         out-of-range one, and the out-of-range ones keep their old nearest
         order among themselves.
         On cost: this scan runs EVERY tick for a powered, armed structure
         holding no focus - the re-test above re-acquires the moment the focus
         fails - but targetPrio is reached only by a candidate that has
         survived autoTargetable and canTarget(e, true), so an emplacement with
         an empty arc pays nothing for it. A held focus is sticky and never
         re-scored, so there is no re-slew thrash either. */
      const d = raw <= R2 ? raw * targetPrio(e, 1) : raw * 1.9;
      if (d < bd) { bd = d; best = e; }
    });
    return best;
  }
}
