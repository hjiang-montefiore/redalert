/* ============ player.js — economy, power, production queues, tech ============ */
class Player {
  constructor(game, idx, faction, cash, isAI) {
    this.game = game; this.idx = idx;
    this.faction = faction;
    /* faction colour by default; if two commanders share a faction the later
       ones shift hue so the battlefield stays readable */
    const base = CFG.FACTION_COLORS[faction] || CFG.TEAM[idx % CFG.TEAM.length];
    const dup = game.players ? game.players.filter(p => p && p.faction === faction).length : 0;
    this.color = dup > 0 ? CFG.shiftHue(base, dup * 42) : base;
    this.isAI = isAI;
    this.cash = cash;
    this.oil = 150;                      // barrels — consumed by unit production
    /* mission id -> absolute game time it becomes available again */
    this.support = {};
    /* building id -> the structure nominated to produce that category */
    this.primary = {};
    /* generational re-equipment in progress: seconds remaining, and the era
       being moved to */
    this.eraProgress = 0;
    this.eraTarget = null;
    this.tech = 1;
    this.upgrades = {};                 // ap / armor / optics / drive / tech flags
    this.units = []; this.buildings = [];
    this.stats = { kills: 0, losses: 0, mined: 0, built: 0 };
    this.defeated = false;
    this.allied = false;

    /* five parallel production queues, RA2 style: one per tab */
    this.queues = {
      building: { items: [], prog: 0, ready: [] },
      defense: { items: [], prog: 0, ready: [] },
      infantry: { items: [], prog: 0 },
      vehicle: { items: [], prog: 0 },
      aircraft: { items: [], prog: 0 },
      naval: { items: [], prog: 0 },
      upgrade: { items: [], prog: 0 },
    };
    this.homeX = 0; this.homeY = 0;
  }

  /* first completed structure of this kind awaiting placement */
  readyItem(kind, id) {
    const q = this.queues[kind];
    if (!q || !Array.isArray(q.ready)) return null;
    return id ? q.ready.find(r => r.id === id) || null : (q.ready[0] || null);
  }
  readyCount(kind, id) {
    const q = this.queues[kind];
    if (!q || !Array.isArray(q.ready)) return 0;
    return id ? q.ready.filter(r => r.id === id).length : q.ready.length;
  }
  consumeReady(kind, id) {
    const q = this.queues[kind];
    const i = q.ready.findIndex(r => r.id === id);
    if (i >= 0) q.ready.splice(i, 1);
  }

  earn(n) { this.cash = Math.min(this.storageCap(), this.cash + n); }
  spend(n) { if (this.cash < n) return false; this.cash -= n; return true; }
  storageCap() {
    let cap = 4000;
    for (const b of this.buildings) if (!b.dead && b.def.storage) cap += b.def.storage;
    return cap;
  }
  powerOut() { let p = 0; for (const b of this.buildings) if (!b.dead && b.buildProgress >= 1 && b.def.power > 0) p += b.def.power; return p; }
  powerUse() { let p = 0; for (const b of this.buildings) if (!b.dead && b.buildProgress >= 1 && b.def.power < 0) p += -b.def.power; return p; }
  powerRatio() { const use = this.powerUse(); return use <= 0 ? 2 : this.powerOut() / use; }

  hasBuilding(id) { for (const b of this.buildings) if (!b.dead && b.buildProgress >= 1 && b.def.id === id) return true; return false; }
  countBuilding(id) { let n = 0; for (const b of this.buildings) if (!b.dead && b.def.id === id) n++; return n; }

  inBaseRadius(tx, ty) {
    for (const b of this.buildings) {
      if (b.dead) continue;
      const d = U.dist(tx, ty, b.tx + b.def.w / 2, b.ty + b.def.h / 2);
      if (d <= CFG.BUILD_RADIUS) return true;
    }
    return false;
  }

  /* is this item currently buildable? returns string reason if locked */
  lockReason(def, isUpgrade) {
    /* pre-battle force restrictions (air / navy / superweapons disabled) */
    if (this.banned) {
      if (def.cat && this.banned[def.cat]) return "NOT AUTHORISED THIS BATTLE";
      if (def.superweapon && this.banned.superweapon) return "STRATEGIC WEAPONS DISABLED";
      if ((def.id === "airbase" && this.banned.aircraft) ||
          (def.id === "navalyard" && this.banned.naval)) return "NOT AUTHORISED THIS BATTLE";
    }
    if (isUpgrade) {
      if (this.upgrades[def._key]) return "COMPLETE";
      /* The ceiling is reported before any other reason, because it is the one
         that will never change however long the player waits. */
      if (def.tech && this.techCap !== undefined && def.tech > this.techCap)
        return "ABOVE TECH CEILING (TECH " + this.techCap + ")";
      if (def.needTech && this.tech < def.needTech) return "REQUIRES TECH " + def.needTech;
    }
    /* not yet invented, or long since retired */
    if (typeof inEra === "function" && !isUpgrade && def.cat !== "building" &&
        def.cat !== "defense" && !inEra(def, this.era || CUR_ERA)) {
      const from = def.from !== undefined ? eraIndex(def.from) : 0;
      return eraIndex(this.era || CUR_ERA) < from ? "NOT YET IN SERVICE" : "WITHDRAWN FROM SERVICE";
    }
    if (def.tech && !isUpgrade && this.techCap !== undefined && def.tech > this.techCap)
      return "ABOVE TECH CEILING (TECH " + this.techCap + ")";
    if (def.tech && !isUpgrade && this.tech < def.tech) return "REQUIRES TECH " + def.tech;
    for (const rq of (def.prereq || []))
      if (!this.hasBuilding(rq)) {
        if (rq === "airbase" && def.carrierCapable && this.hasDeck()) continue;   // the deck IS the airbase
        return "REQUIRES " + BUILDINGS[rq].name.toUpperCase();
      }
    if (def.oil && this.oil < def.oil) return "INSUFFICIENT FUEL (" + Math.floor(this.oil) + "/" + def.oil + " bbl)";
    /* ramp space, so the reason is visible on the build card rather than a
       button that silently refuses to work */
    if (def.cat === "aircraft" && !isUpgrade) {
      const cap = this.airCapacity(def);
      const have = this.airOwned(def) + this.queues.aircraft.items.length;
      if (have >= cap) return cap === 0 ? "NO AIRBASE OR CARRIER"
                                        : "NO HANGAR SPACE (" + have + "/" + cap + ")";
    }
    return null;
  }

  factionCost(def) {
    const f = FACTIONS[this.faction] || {};
    if (def.cat === "defense") return Math.round((def.cost || 0) * (f.defenseCostMul || 1));
    if (def.cat === "building") return Math.round(def.cost || 0);
    return Math.round((def.cost || 0) * (f.costMul || 1));
  }
  factionTime(def) {
    const f = FACTIONS[this.faction] || {};
    return (def.time || 1) * (f.buildMul || 1);
  }

  /* Draw down the fuel reserve. Never below zero: a negative reserve makes
     every downstream check (lockReason, the HUD, the AI's affordability
     maths) behave strangely. */
  spendOil(n) {
    this.oil = Math.max(0, this.oil - n);
  }

  /* A commander pumping their own crude does not buy any; anyone else takes
     delivery at a refinery, which is the only place on a base equipped to
     receive it. Nothing is bought on an empty bank - fuel never outbids the
     harvesters and the payroll. */
  pumpsOwnFuel() {
    for (const b of this.buildings)
      if (!b.dead && b.buildProgress >= 1 && b.def.oilNode) return true;
    return false;
  }
  /* Fuel is bought when there is no well of our own, and also when the wells
     we have cannot keep up and the bank is full anyway. A commander sitting on
     twenty-five thousand credits and eleven barrels, unable to buy the air
     defence vehicle it has already researched, is not being challenged by a
     resource constraint - it is stuck behind one. Money that cannot be spent
     is worth nothing; owning the ore is still far better than buying it. */
  buysFuel() {
    if (!this.hasBuilding("refinery")) return false;
    if (!this.pumpsOwnFuel()) return true;
    return this.oil < 60 && this.cash > 3000;
  }
  updateFuelPurchase(dt) {
    if (!this.buysFuel()) return;
    const want = CFG.FUEL_BUY_RATE * dt;
    const cost = want * CFG.FUEL_BUY_PRICE;
    if (this.cash < cost) return;
    this.cash -= cost;
    this.oil += want;
  }

  /* ---- advancing a generation ----
     Re-equipping the whole force one period forward. Expensive in cash, fuel
     and time; what it changes is what the factories build from now on, not
     the units already in the field. */
  eraStepInfo() {
    const nxt = nextEra(this.era || CUR_ERA);
    if (!nxt) return null;
    const st = ERA_STEP[this.era || CUR_ERA];
    if (!st) return null;
    /* an army that cannot procure modern equipment pays more for what it can
       get, and stops short of the present day entirely */
    const reach = (typeof ERA_REACH !== "undefined" && ERA_REACH[this.faction]) ||
                  { cap: "e20", costMul: 1 };
    const m = reach.costMul || 1;
    return { to: nxt, cost: Math.round(st.cost * m), oil: Math.round(st.oil * m),
             time: Math.round(st.time * (0.6 + 0.4 * m)),
             reachCap: reach.cap,
             name: "ADVANCE TO " + ERA_INFO[nxt].name };
  }
  eraLockReason() {
    if (this.eraProgress > 0) return "RE-EQUIPPING";
    const st = this.eraStepInfo();
    if (!st) return "PRESENT DAY";
    if (this.eraCap && eraIndex(st.to) > eraIndex(this.eraCap)) return "ABOVE ERA CEILING";
    /* the national limit: some armies cannot buy their way to the present day */
    if (st.reachCap && eraIndex(st.to) > eraIndex(st.reachCap))
      return "NO MODERN PROCUREMENT (" + ERA_INFO[st.reachCap].name + " CEILING)";
    if (!this.hasBuilding("lab")) return "REQUIRES RESEARCH LAB";
    if (this.oil < st.oil) return "INSUFFICIENT FUEL (" + Math.floor(this.oil) + "/" + st.oil + " bbl)";
    if (this.cash < st.cost) return "INSUFFICIENT FUNDS";
    return null;
  }
  startEraAdvance() {
    if (this.eraLockReason()) return false;
    const st = this.eraStepInfo();
    this.spend(st.cost);
    this.spendOil(st.oil);
    this.eraTarget = st.to;
    this.eraProgress = st.time;
    return true;
  }
  updateEraAdvance(dt) {
    if (this.eraProgress <= 0) return;
    this.eraProgress -= dt * this.prodSpeed("building");
    if (this.eraProgress > 0) return;
    this.eraProgress = 0;
    this.era = this.eraTarget;
    this.eraTarget = null;
    if (!this.isAI) {
      this.game.alert("RE-EQUIPPED \u2014 " + ERA_INFO[this.era].name.toUpperCase() +
                      " EQUIPMENT AVAILABLE", "good");
      Sfx.play("ready");
      UI.refreshCards();
    }
  }

  /* ---- enqueue / cancel ---- */
  enqueue(kind, id) {
    const q = this.queues[kind];
    const def = kind === "upgrade" ? UPGRADES[id] : (kind === "building" || kind === "defense") ? BUILDINGS[id] : UNITS[id];
    if (!def) return false;
    if (kind === "upgrade") def._key = id;
    if (this.lockReason(def, kind === "upgrade")) return false;
    if (kind === "upgrade" && (q.items.length || this.queues.upgrade.items.length)) return false;
    if ((kind === "building" || kind === "defense") &&
        (q.ready.length + q.items.length) >= 6) return false;   // deep enough queue
    if (q.items.length >= 9) return false;
    /* an air force is limited by ramp space: you cannot own more aircraft than
       your airbases and carriers have revetments for */
    if (kind === "aircraft" && this.airSpaceLeft(def) <= q.items.length) return false;
    q.items.push({ id, def, paid: 0 });
    return true;
  }
  cancel(kind, id) {
    const q = this.queues[kind];
    if (Array.isArray(q.ready)) {
      const i = q.ready.findIndex(r => r.id === id);
      if (i >= 0) { this.earn(this.factionCost(q.ready[i].def)); q.ready.splice(i, 1); return; }
    }
    for (let i = q.items.length - 1; i >= 0; i--) {
      if (q.items[i].id === id) {
        this.earn(q.items[i].paid);
        if (i === 0) q.prog = 0;
        q.items.splice(i, 1);
        return;
      }
    }
  }

  /* ---- ramp space ----
     Every airbase revetment and every carrier deck spot holds one airframe.
     Aircraft already flying still occupy their slot: they have to land
     somewhere. */
  airCapacity(def) {
    let n = 0;
    for (const b of this.buildings) if (!b.dead && b.buildProgress >= 1 && b.def.pads) n += b.def.pads;
    /* decks only count toward aircraft that can actually use them */
    if (!def || def.carrierCapable)
      for (const u of this.units) if (!u.dead && u.def.carrier) n += u.def.carrier;
    /* An escort's flight deck is not airbase ramp, but it is parking, and the
       helicopters standing on it were already being counted as owned. Count
       the space too, for rotary airframes only - mirroring deckSlots(), which
       reads carrier first and helo only where there is no carrier. */
    if (!def || def.hover)
      for (const u of this.units) if (!u.dead && !u.def.carrier && u.def.helo) n += u.def.helo;
    return n;
  }
  airOwned(def) {
    let n = 0;
    for (const u of this.units) {
      if (u.dead || u.layer !== "air") continue;
      /* An airframe based on a ship is charged to that ship's deck, and only
         where that deck counted as capacity for the airframe being asked
         about. A destroyer's ASW helicopter is bought by the ship and lives on
         the ship; billing it to the airbase ramp filled the hangar with
         aircraft the airbase never held and locked the AIR tab out. */
      const host = u.padOn && !u.padOn.dead ? u.padOn : null;
      if (host && host.kind === "unit" && host.def) {
        if (host.def.carrier) { if (def && !def.carrierCapable) continue; }
        else if (host.def.helo) { if (def && !def.hover) continue; }
      }
      n++;
    }
    return n;
  }
  airSpaceLeft(def) { return Math.max(0, this.airCapacity(def) - this.airOwned(def)); }
  /* a carrier is a floating airbase, so it satisfies the airbase prerequisite
     for anything that can fly off a deck */
  hasDeck() {
    for (const u of this.units) if (!u.dead && u.def.carrier) return true;
    return false;
  }

  /* production speed scales with number of matching factories and power state */
  prodSpeed(kind) {
    let n = 1;
    if (kind === "infantry") n = this.countBuilding("barracks");
    else if (kind === "vehicle") n = this.countBuilding("factory");
    else if (kind === "aircraft") n = this.countBuilding("airbase");
    else if (kind === "naval") n = this.countBuilding("navalyard");
    else n = this.countBuilding("conyard");
    if (n <= 0) return 0;
    let mul = 1 + (n - 1) * 0.5;
    const pr = this.powerRatio();
    if (pr < 1) mul *= Math.max(CFG.POWER_BROWNOUT_FLOOR, pr);
    return mul;
  }

  updateQueues(dt) {
    for (const kind in this.queues) {
      const q = this.queues[kind];
      if (!q.items.length) continue;
      const it = q.items[0];
      const def = it.def;
      const speed = this.prodSpeed(kind === "upgrade" ? "building" : kind);
      if (speed <= 0) continue;

      const cost = kind === "upgrade" ? def.cost : this.factionCost(def);
      const time = this.factionTime(def);
      const rate = dt * speed / time;                 // fraction per second
      const payment = cost * rate;
      if (it.paid < cost) {
        const pay = Math.min(payment, cost - it.paid, this.cash);
        if (pay <= 0) continue;                        // broke — production stalls
        this.cash -= pay; it.paid += pay;
      }
      q.prog = it.paid / cost;
      if (it.paid >= cost - 0.01) {
        /* item complete */
        q.items.shift(); q.prog = 0;
        this.onProduced(kind, it);
      }
    }
  }

  onProduced(kind, it) {
    if (kind === "building" || kind === "defense") {
      this.queues[kind].ready.push(it);                // waits for placement
      if (!this.isAI) { this.game.alert("CONSTRUCTION COMPLETE", "good"); Sfx.play("ready"); UI.refreshCards(); }
    } else if (kind === "upgrade") {
      const def = it.def;
      /* Oil is checked when the item is queued, but it can be spent on units
         before the research finishes, so it has to be checked again here or
         the reserve goes negative. */
      if (def.oil) this.spendOil(def.oil);
      if (def.tech) { this.tech = Math.max(this.tech, def.tech); }
      else this.upgrades[it.id] = true;
      if (def.tech) this.upgrades["tech" + def.tech] = true;
      if (!this.isAI) { this.game.alert(def.name.toUpperCase() + " COMPLETE", "good"); Sfx.play("ready"); UI.refreshCards(); }
    } else {
      /* unit: spawn at the right factory */
      const def = it.def;
      if (def.oil) {
        if (this.oil < def.oil) { /* refund, fuel ran out mid-build */ this.earn(this.factionCost(def)); return; }
        this.spendOil(def.oil);
      }
      this.game.spawnUnit(this, it.id);
      if (!this.isAI) Sfx.play("unitready");
    }
  }
}
