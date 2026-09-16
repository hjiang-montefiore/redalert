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
    this.carried = false;
    this.load = 0;                                          // harvester ore
    this.repathT = 0; this.stuckT = 0;
    this.guardX = x; this.guardY = y;
    this.deployed = false;
    this.routT = 0;                                         // seconds left running
    this.pad = null;                                        // airbase slot
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
    if (queue && (this.order.type !== "idle" || this.orders.length)) {
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
       assigned straight to this.order and never comes through here: the seven
       auto sites, retaliate(), the counter-battery plot, afterAttack().

       Only `attack` and `bombard` release, because only those two name what is
       to be shot - a thing, or a piece of ground. Attack-move in particular is
       a standing authority to engage whatever you meet, which is precisely
       what a held round must not have. `auto` is honoured even here, for the
       one commanded order that is explicitly a reflex: ai.js defendBase. */
    if (order && !order.auto &&
        (order.type === "attack" || order.type === "bombard")) order.release = true;
    /* any order other than the group move that set it releases the pace cap */
    if (!(order && order.type === "move")) this.groupSpeed = 0;
    this.order = order;
    this.path = null; this.pathI = 0;
    if (order.type === "move" || order.type === "attackmove") {
      this.guardX = order.x; this.guardY = order.y;
    }
    if (order.type !== "attack") this.focus = null;
  }
  /* pull the next queued task when the current one finishes */
  nextOrder() {
    if (this.orders && this.orders.length) { this.setOrder(this.orders.shift()); return true; }
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
    return (this.parked || (this.order && this.order.type === "parked")) ? "ground" : "air";
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
    else { this.updateGeneric(dt); }

    /* A carrier's deck is spelled `carrier`, not `helo`, and an era carrier has
       no `helo` at all - so the one ship built to operate aircraft was the one
       ship that could never replace a loss alongside its own yard. */
    if (this.cat === "naval" && (this.def.helo || this.def.carrier)) this.replenishDeck(dt);

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
    if (this.layer === "air" && !this.def.hover && this.fuelMax && this.fuel <= 0 && !this.parked) {
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
    if (w && w.nuke) {
      const o = this.order;
      return !(o && o.release === true && o.type === "bombard" && o.nuke === true);
    }
    return this.manualWeapon(w) && !this.released();
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
  /* fire on a map position: how artillery answers a counter-battery plot */
  bombard(o, dt) {
    if (this.game.time > o.until) { this.order = { type: "idle" }; return; }
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
    if (wi < 0) { this.order = { type: "idle" }; return; }
    const w = WEAPONS[this.def.weapons[wi]];
    const range = this.weaponRange(w), minR = (w.minRange || 0) * CFG.TILE;
    const dist = U.dist(this.x, this.y, o.x, o.y);
    if (dist > range) { this.stepAlong(o.x, o.y, dt, range * 0.85); return; }
    if (dist < minR) {
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
      if (this.dispMax && this.disp <= 0) {
        if (this.owner === this.game.human)
          this.game.alert(this.def.name.toUpperCase() + " \u2014 NO MINE ROUNDS ABOARD", "bad");
        this.order = { type: "idle" };
        return;
      }
      /* Asked before the rocket flies as well as inside Mines.lay, so a
         commander whose field is already full keeps the round on the rack
         instead of watching a rocket land and do nothing. */
      if (typeof Mines !== "undefined" && !Mines.roomFor(this.game, this.owner)) {
        if (this.owner === this.game.human)
          this.game.alert("MINEFIELD CEILING \u2014 " + Mines.CAP +
                          " MINES ALREADY IN THE GROUND", "bad");
        this.order = { type: "idle" };
        return;
      }
      this.disp--;
      if (this.disp === 0 && this.owner === this.game.human)
        this.game.alert(this.def.name.toUpperCase() +
                        " \u2014 MINE RACK EMPTY, RETURN TO BASE", "bad");
    }
    Combat.fire(this.game, this, w, {
      x: o.x, y: o.y, layer: "ground", dead: false, armor: "structure",
      def: {}, owner: null, r: 0, tx: (o.x / CFG.TILE) | 0, ty: (o.y / CFG.TILE) | 0,
    });
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
       - anything out of reach of the round it is actually carrying. */
  seadTarget(fromRamp) {
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
        if (dist > reach * CFG.TILE) return;
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
      const arrived = this.stepAlong(o.x, o.y, dt);
      if (arrived) this.groupSpeed = 0;
      /* A loaded transport sent to a shore it cannot itself enter beaches as
         close as it can get and puts its cargo off there, which is plainly
         what the order meant. It will never report "arrived" - the goal tile
         is land its own layer cannot occupy, so stepAlong clamps the path to
         the water's edge and the final distance test never passes. The test
         that matters is whether the CARGO can reach the aim point now, not
         whether the hull did. */
      if (o.unloadAt && this.cargo && this.cargo.length &&
          U.dist(this.x, this.y, o.x, o.y) < CFG.TILE * 4.5) {
        const n = this.unload(o.x, o.y);
        if (n) {
          if (this.owner === this.game.human)
            this.game.alert(n + (n === 1 ? " UNIT ASHORE" : " UNITS ASHORE"), "good");
          if (!this.cargo.length && !this.nextOrder()) this.order = { type: "idle" };
          return;
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
      else if (this.stepAlong(o.x, o.y, dt) && !this.nextOrder()) this.order = { type: "idle" };
    } else if (o.type === "attack") {
      const t = o.target;
      /* An engagement the unit chose for itself is dropped as soon as the target
         stops being something anyone may open up on unprompted. Only orders
         carrying the auto flag are tested: one the player gave by hand is left
         exactly as given. */
      if (!t || t.dead || (o.auto && !autoTargetable(t))) {
        if (o.resume) this.order = { type: "attackmove", x: o.resume.x, y: o.resume.y };
        else if (!this.nextOrder()) this.order = { type: "idle" };
        return;
      }
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
  }

  /* fight: close to range of best weapon, face, fire */
  engage(t, dt) {
    const wi = this.pickWeapon(t);
    if (wi < 0) {                                  // nothing can hurt it — walk away or idle
      this.order = { type: "idle" };
      return;
    }
    const w = WEAPONS[this.def.weapons[wi]];
    const range = this.weaponRange(w);
    const minR = (w.minRange || 0) * CFG.TILE;
    const dist = U.dist(this.x, this.y, t.x, t.y);

    if (dist > range) {
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
      this.ang = U.turnToward(this.ang, want, this.def.turn * dt);
      if (Math.abs(U.angDiff(this.ang, want)) > 0.1) return;
    }
    this.tryFire(wi, t);
    /* A warship is not a tank with one gun. The 127mm mount, the anti-ship
       missiles, the area SAM and the close-in system are separate installations
       with separate crews and separate magazines, and they engage at the same
       time. Picking a single "best" weapon meant a destroyer scored its gun
       highest at medium range and never launched the missiles it was built
       around. Anything with more than one mount now fires everything that is
       ready, in range, and able to engage this target. */
    if (this.def.weapons.length > 1 && this.cat === "naval") this.fireOtherMounts(wi, t);
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

  /* Top the deck launchers back up while alongside a friendly naval yard. */
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
    if (this.reloadT < 3.5) return;
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

  /* fire every mount other than the primary that can engage this target */
  fireOtherMounts(primary, t) {
    const tl = t.targetLayer();
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

  /* Choose the best weapon for this target, not merely the first that can
     engage it. A destroyer carries a gun, an area SAM, an anti-ship missile,
     a lightweight ASW torpedo and a CIWS; which one it reaches for depends
     on what it is shooting at and how far away that thing is. */
  pickWeapon(t) {
    const subVisible = t.layer !== "sub" || this.game.canSeeSub(this.owner, t);
    if (!subVisible) return -1;
    /* gate on the layer the target presents and score against the armour the
       round will really meet, or every mount would score zero damage on a
       parked airframe and the choice between them would be arbitrary */
    const tl = t.targetLayer(), tArmor = t.armorClass();
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

  tryFire(wi, t) {
    if (this.cooldowns[wi] > 0) return;
    const w = WEAPONS[this.def.weapons[wi]];
    if (this.ammoMax && this.ammo < (w.ammo || 1)) return;   // aircraft out of ordnance
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
      let n = burstN - 1;
      const delay = w.burstDelay || 0.1;
      const shooter = this, game = this.game;
      const tick = () => {
        if (shooter.dead || !t || t.dead || n-- <= 0) return;
        Combat.fire(game, shooter, w, t);
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
     A SEAD shooter weights emitters far above anything else. */
  acquire() {
    const R = this.sightR() * CFG.TILE * (this.stance === "aggressive" ? 1.25 : 1);
    /* A Weasel weights an emitter a hundredfold below - 0.06 against 6 - but
       only for a round it may actually fire. acquire() is the automatic
       question by definition, so a held ARM contributes nothing to it;
       otherwise a mixed hull is dragged across the map toward a radar it is
       then going to shoot with its cannon. */
    const sead = this.def.weapons.some(k => {
      const w = WEAPONS[k];
      return w && w.antiRadiation && !this.manualWeapon(w);
    });
    let best = null, bd = Infinity;
    this.game.grid.query(this.x, this.y, R, (e) => {
      if (e.dead || e.owner === this.owner || this.game.allied(this.owner, e.owner)) return;
      /* An unoccupied civilian building belongs to nobody and threatens nobody.
         It was being acquired automatically simply because its owner is the
         neutral player, so a column driving past a village would stop and
         level it unprompted. Once somebody garrisons it, it stops being
         neutral and becomes a legitimate target like any other. */
      if (!autoTargetable(e)) return;
      /* The automatic question. This one call is the gate behind attackmove,
         idle/guard, the garrison windows, air attackmove, CAP, strip alert and
         hover - all seven reach a target only through here. Because a held
         round is invisible to it, a hull can never be handed an automatic
         order against something only a held round could reach.
         This matters far more than the designs assumed: a launcher's sight is
         21 to 31 tiles after generations.js rewrites it, not the 5.0 on the
         card, so idle/guard and attackmove were LIVE auto-fire paths for every
         TEL in the game. */
      if (!this.canTarget(e, true)) return;
      /* low-observable airframes cannot be acquired at full range */
      /* A surface mount cannot shoot at an aeroplane it cannot reach, so it
         has no business asking whether anybody holds a track on one. acquire()
         scans to sightR() * 1.25, and a naval hull's sight is widened to match
         its LONGEST weapon - an anti-ship missile - so an LCS whose 76mm
         reaches 8.0 tiles was interrogating airTrack about every airframe
         inside 20.5 tiles, every tick, for ever, and being silently refused.
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
        if (U.dist(this.x, this.y, e.x, e.y) > airReach) return;
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
      const VISUAL = 11;
      const needsTrack = this.def.radarQ || this.def.radar || this.layer === "air" ||
            ((this.def.role === "aa" || this.def.role === "sam") &&
             ((WEAPONS[this.def.weapons[0]] || {}).range || 0) > VISUAL);
      /* A parked airframe is not a radar track, it is a thing sitting in the
         open, so it goes down the ordinary visual branch instead. */
      if (e.targetLayer() === "air" && this.game.airTrack && needsTrack) {
        if (!this.game.airTrack(this, e)) return;
      } else if (e.def && e.def.stealth &&
          U.dist(this.x, this.y, e.x, e.y) > R * (1 - e.def.stealth * CFG.STEALTH_ACQ)) return;
      if (e.def && e.def.harvester) { /* juicy */ }
      let d = U.dist2(this.x, this.y, e.x, e.y);
      const prio = (e.cat === "infantry" && this.def.role === "mg") ? 0.5 : 1;
      d *= prio;
      /* radars and jammers are what a Weasel is here for */
      if (sead) d *= (e.def && (e.def.radar || e.def.jam)) ? 0.06 : 6;
      if (d < bd) { bd = d; best = e; }
    });
    return best;
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
    if (!this.path || this.repathT <= 0) {
      const gm = this.game;
      this.path = Path.find(map, this.tx, this.ty, gtx, gty, this.layer,
        (tx, ty) => gm.tileBlocked(tx, ty, this));
      this.pathI = 0;
      this.repathT = 2.2 + this.game.rng() * 0.8;
      if (!this.path || !this.path.length) return true;   // nowhere to go
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
    let pushX = 0, pushY = 0;
    this.game.grid.query(this.x, this.y, this.r + 18, (e) => {
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
    });
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
    if (o.type === "move") { if (this.stepAlong(o.x, o.y, dt)) this.order = { type: "harvest" }; return; }
    if (o.type !== "harvest" && o.type !== "return") this.order = { type: "harvest" };

    if (this.order.type === "harvest") {
      if (this.load >= CFG.HARVEST_LOAD) { this.order = { type: "return" }; return; }
      const map = this.game.map;
      /* on ore? scoop */
      const i = this.ty * map.W + this.tx;
      if (map.ore[i] > 1) {
        const take = Math.min(CFG.HARVEST_RATE * dt, map.ore[i], CFG.HARVEST_LOAD - this.load);
        map.ore[i] -= take; this.load += take;
        return;
      }
      /* find nearest ore tile */
      if (!this.oreT || map.ore[this.oreT.y * map.W + this.oreT.x] < 1 || (this.oreRetryT -= dt) < 0) {
        this.oreT = this.game.nearestOre(this.tx, this.ty, this.owner);
        this.oreRetryT = 3;
        if (!this.oreT) { this.order = this.load > 40 ? { type: "return" } : { type: "idle" }; return; }
      }
      this.stepAlong(this.oreT.x * CFG.TILE + 16, this.oreT.y * CFG.TILE + 16, dt);
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
          this.game.alert("ORE LOST — BUILD SILOS", "bad"); this.warnedSilo = true;
        }
        this.owner.earn(gain);
        this.owner.stats.mined += gain;
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
    const o = this.order;
    this.moving = true;                     // airframes never idle their engines

    if (o.type !== "parked") this.parked = false;

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
    const dryAmmo = !!(this.ammoMax && this.ammo <= 0.05);
    const needRTB = (this.ammoMax && this.ammo <= 0.05) || dry;
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
        ? { type: o.type, x: o.x, y: o.y }
        : (o.cap && o.resume) ? { type: "cap", x: o.resume.x, y: o.resume.y } : null;
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
       advance and engage, which is a fight the player asked for. */
    const transiting = (o.type === "move" || o.type === "cap") &&
                       !o.release && this.stance !== "aggressive";
    if ((defenceless || transiting) && this.game.standoffPoint &&
        (o.type === "move" || o.type === "attackmove" || o.type === "cap")) {
      const margin = 1.5 + (this.def.jam ? 0 : 1.0);   // a jammer may sit closer
      /* Anchor the walk-back at HOME, not at the aircraft. Computed from the
         current position the station moves every time the aircraft does: it
         backs out of the ring, the route then reads clear, it turns in again,
         and it oscillates across the threat edge - measured, that drove an E-3
         from a 12.3-tile hold to a 6.2-tile one, i.e. deeper in than doing
         nothing. Anchored at home the station is a fixed point on the corridor
         and the aircraft simply flies to it and stays. */
      const hx = this.owner.homeX, hy = this.owner.homeY;
      const sp = this.game.standoffPoint(this.owner, hx, hy, o.x, o.y, margin);
      if (sp.held) {
        if (!this.warnedRing && this.owner === this.game.human) {
          this.warnedRing = true;
          this.game.alert(this.def.name.toUpperCase() +
                          " \u2014 HOLDING SHORT OF AIR DEFENCE", "bad");
        }
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
         sortie - it still has fuel and ordnance. */
      if (wi < 0) { this.order = this.afterAttack(o); return; }
      const w = WEAPONS[this.def.weapons[wi]];
      const range = this.weaponRange(w);
      const dist = U.dist(this.x, this.y, t.x, t.y);
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
             another. That is a bombing run rather than a hover. */
          const bx = t.x - this.x, by = t.y - this.y;
          const bl = Math.max(1, Math.hypot(bx, by));
          const through = Math.max(range, 4) * CFG.TILE;
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
            if (standoff && this.ammoMax && this.ammo <= 0.05)
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
    } else if (o.type === "rtb" || o.type === "land") {
      /* The ramp this aircraft is based on. If every slot has gone it lands
         on its own anyway: an over-stacked revetment beats orbiting the field
         until the tanks run dry. */
      const own = this.padOn;
      const pad = this.game.findPad(this, true) ||
        (own && !own.dead && (own.kind !== "building" || own.buildProgress >= 1)
          ? { x: own.x, y: own.y, host: own } : null);
      if (!pad) { /* nowhere to land: orbit home */ this.flyTo(this.owner.homeX, this.owner.homeY, dt); return; }
      const px = pad.x, py = pad.y;
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
      if (host && !host.dead) {
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
     approach. This is what gives each airframe a real combat radius. */
  reserveFuel() {
    const pad = this.game.findPad ? this.game.findPad(this) : null;
    let hx = pad ? pad.x : this.owner.homeX, hy = pad ? pad.y : this.owner.homeY;
    /* A tanker orbiting forward IS somewhere to get fuel, and a nearer one
       than the airfield. Measuring the reserve to it is what lets a fighter
       hold station instead of turning for home - the tanker does not add
       fuel to the aircraft so much as it moves the edge of the map. */
    const tk = this.game.nearestTanker ? this.game.nearestTanker(this) : null;
    if (tk && U.dist2(this.x, this.y, tk.x, tk.y) < U.dist2(this.x, this.y, hx, hy)) {
      hx = tk.x; hy = tk.y;
    }
    const d = U.dist(this.x, this.y, hx, hy) / CFG.TILE;          // tiles home
    const sp = Math.max(0.5, this.def.speed);                     // tiles/sec
    const burn = this.airBurn() * ((FACTIONS[this.owner.faction] || {}).fuelMul || 1);
    return U.clamp(d / sp * burn * 1.35 + 8, 10, this.fuelMax * 0.9);
  }
  /* the radius this airframe can strike to and still get home, in tiles */
  combatRadius() {
    const sp = Math.max(0.5, this.def.speed);
    const burn = this.airBurn() * ((FACTIONS[this.owner.faction] || {}).fuelMul || 1);
    return Math.max(1, (this.fuelMax / burn) * sp * 0.5 * 0.85);
  }

  /* what an aircraft does when its target dies or its track is lost */
  afterAttack(o) {
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
    /* nothing queued: keep station where the contact was rather than quitting */
    if (this.ammoMax && this.ammo <= 0.05) return { type: "rtb" };
    if (this.fuel < Math.max(this.reserveFuel(), this.fuelMax * 0.40)) return { type: "rtb" };
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
  orbitAround(t, radius, dt) {
    const a = Math.atan2(this.y - t.y, this.x - t.x);
    const lead = 0.55;                       // radians ahead on the circle
    return this.flyTo(t.x + Math.cos(a + lead) * radius,
                      t.y + Math.sin(a + lead) * radius, dt);
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

  /* Alongside a naval yard, a ship with an empty deck slot takes on a
     replacement airframe. This is the only way to refill one: a helicopter
     lost at sea leaves a hole in the ship's capability until she goes home,
     which is what makes losing it matter. */
  replenishDeck(dt) {
    if (!this.deckSlots || !this.deckSlots()) return;
    if (this.wing().length >= this.deckSlots()) { this.deckT = 0; return; }
    const yard = this.game.nearestBuilding(this.owner, "navalyard", this.x, this.y);
    if (!yard || U.dist(this.x, this.y, yard.x, yard.y) > CFG.TILE * 7) { this.deckT = 0; return; }
    this.deckT = (this.deckT || 0) + dt;
    if (this.deckT < 12) return;                 // craning an aircraft aboard takes a while
    this.deckT = 0;
    const n = this.game.embarkComplement(this, true);
    if (n && this.owner === this.game.human)
      this.game.alert(this.def.name.toUpperCase() + " \u2014 AIRCRAFT EMBARKED", "good");
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

  /* ---- transports & structures entry (engineer/infantry into buildings) ---- */
  updateEnter(dt) {
    const o = this.order, t = o.target;
    if (!t || t.dead) { this.order = { type: "idle" }; return; }
    const near = U.dist(this.x, this.y, t.x, t.y) < (t.r || 20) + this.r + 10;
    if (!near) {
      if (this.layer === "air") this.flyTo(t.x, t.y, dt);
      else this.stepAlong(t.x, t.y, dt);
      return;
    }
    /* arrived */
    if (t.kind === "building" && t.def.garrison && this.canGarrison(t)) {
      this.enterGarrison(t);
      return;
    }
    if (t.kind === "unit" && t.def.cargo && t.owner === this.owner) {
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
  unload(aimX, aimY) {
    if (!this.cargo.length) return 0;
    const T = CFG.TILE;
    const ax = aimX === undefined ? this.x : aimX;
    const ay = aimY === undefined ? this.y : aimY;
    const taken = new Set();
    let out = 0;
    for (let i = this.cargo.length - 1; i >= 0; i--) {
      const u = this.cargo[i];
      const spot = this.landingSpot(u, taken, ax, ay);
      if (!spot) continue;
      taken.add(spot.y * this.game.map.W + spot.x);
      u.x = spot.x * T + T / 2; u.y = spot.y * T + T / 2;
      u.carried = false; u.order = { type: "idle" };
      this.cargo.splice(i, 1);
      out++;
    }
    return out;
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
}

/* =============================================================== BUILDING */
class Building {
  constructor(game, defId, owner, tx, ty) {
    const d = BUILDINGS[defId];
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
  holdsFire(w) { return this.manualWeapon(w); }
  pickWeapon(t) { return Unit.prototype.pickWeapon.call(this, t); }
  weaponRange(w) { return Unit.prototype.weaponRange.call(this, w); }
  sightR() { return this.def.sight * (this.owner.upgrades.optics ? 1.25 : 1); }

  /* aircraft based here, whether on the ramp or currently flying */
  wing() {
    const out = [];
    for (const u of this.owner.units)
      if (!u.dead && u.layer === "air" && u.padOn === this) out.push(u);
    return out;
  }
  /* just the ones sitting on the ramp, available to send */
  onRamp() { return this.wing().filter(u => u.parked); }
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
          } else this.game.alert("ENEMY " + d.superweapon.label + " IS READY", "bad");
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
    this.game.grid.query(this.x, this.y, R, (e) => {
      if (e.dead || e.owner === this.owner || this.game.allied(this.owner, e.owner)) return;
      /* The civilian player is nobody's ally, so the ownership test above lets a
         vacant block straight through and the turret spent its war levelling
         the village across the road. */
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
      const VISUAL = 11;
      const needsTrack = this.def.radarQ || this.def.radar || this.layer === "air" ||
            ((this.def.role === "aa" || this.def.role === "sam") &&
             ((WEAPONS[this.def.weapons[0]] || {}).range || 0) > VISUAL);
      /* A parked airframe is not a radar track, it is a thing sitting in the
         open, so it goes down the ordinary visual branch instead. */
      if (e.targetLayer() === "air" && this.game.airTrack && needsTrack) {
        if (!this.game.airTrack(this, e)) return;
      } else if (e.def && e.def.stealth &&
          U.dist(this.x, this.y, e.x, e.y) > R * (1 - e.def.stealth * CFG.STEALTH_ACQ)) return;
      const d = U.dist2(this.x, this.y, e.x, e.y);
      if (d < bd) { bd = d; best = e; }
    });
    return best;
  }
}
