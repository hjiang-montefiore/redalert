/* ============ player.js — economy, power, production queues, tech ============ */
class Player {
  constructor(game, idx, faction, cash, isAI) {
    this.game = game; this.idx = idx;
    this.faction = faction;
    /* The faction's colours, as a copy this commander owns. A colour chosen
       in the pre-battle slot list, and the hue shift that keeps two
       commanders of one army apart, are both applied by Game.assignColors
       once the WHOLE roster exists - and the `fac` tag that pass stamps is
       the mark of a palette that has been through it. Both used to be
       settled here, counting duplicate factions in game.players - which, on
       the frame Game.init is building this battle, still holds the PREVIOUS
       battle's players, and nothing at all on the first match: two French
       commanders deployed in exactly the same blue. */
    const base = CFG.FACTION_COLORS[faction] || CFG.TEAM[idx % CFG.TEAM.length];
    this.color = { main: base.main, dark: base.dark, light: base.light };
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
    /* killValue and lossValue are the priced halves of kills/losses, written
       by Combat.kill. A count cannot tell a rifle squad from a cruiser, so a
       learner reading `kills` learns nothing; these are what ai.js scores a
       push on. */
    this.stats = { kills: 0, losses: 0, mined: 0, built: 0,
                   killValue: 0, lossValue: 0 };
    this.defeated = false;
    /* the game time a side holding nothing but rigs is beaten at; null while
       a production facility stands. See G.checkVictory. */
    this.rigDeadline = null;
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

  /* ---- THE VAULT LIMITS WHAT COMES IN, NOT WHAT IS ALREADY HELD ----
     (rule fix, every player alike) This was `cash = min(cap, cash + n)`.
     CFG.BASE_INCOME is paid through here from the first frame, and a side with
     no refinery has a 4,000 vault - so the Light $5,000, Standard $10,000 and
     Heavy $20,000 purses were all cut to 4,000 in the first sixtieth of a
     second, the human's included, and a hauler landing into a full vault
     (gain 0) clamped again. Measured with the Heavy purse: at t=150 four of
     eight seats held 0 and none more than 425, with 4,400-4,800 credits of
     base standing - about what a 4,000 purse buys. Income beyond the vault is
     still thrown away (that is what silos are for); money already in hand is
     not destroyed. */
  earn(n) {
    if (!(n > 0)) return;
    const cap = this.storageCap();
    if (this.cash >= cap) return;
    this.cash = Math.min(cap, this.cash + n);
  }
  /* ---- MONEY THAT COMES BACK IS NOT INCOME ----
     (rule, every player alike) A refund returns credits that left this purse
     for something that was never delivered - a cancelled order, a unit whose
     tank was dry at completion, a unit with no door to leave by, a structure
     with no ground to stand on. Through earn() it was clamped like ore: with
     the purse above the vault (a Heavy start) a cancelled, half-paid factory
     gave back nothing at all, and under the old clamp a refund into a nearly
     full vault was cut. It comes back whole. Sale proceeds are income and
     stay on earn(): a sale into a full vault pays nothing, as it always did. */
  refund(n) { if (n > 0) this.cash += n; }
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

  /* ---- WHAT A PRODUCTION FACILITY IS ----
     The victory rule (G.checkVictory) turns on this, so it is read off the
     structure table rather than written down as a list of ids. Two flags, and
     they are the two halves of prodSpeed() and G.spawnUnit():
       def.produces  the unit queue a factory feeds - barracks, war factory,
                     naval yard, airbase. The rally-point code already reads it.
       def.base      the construction yard. The structure, defence and research
                     queues all run on its count in prodSpeed(), and it is what
                     a rig unfolds into.
     A structure added later with either flag is a production facility with no
     change here. prodSpeed() still names its buildings by id, so _behtest [44]
     checks that the flags and that mapping have not drifted apart. */
  static isProduction(def) { return !!(def && (def.base || def.produces)); }
  /* standing production facilities, finished or still unfolding */
  productionBuildings() {
    return this.buildings.filter(b => !b.dead && Player.isProduction(b.def));
  }
  /* rigs on the road - or in a hold - that would unfold into one */
  productionRigs() {
    return this.units.filter(u => !u.dead && u.def.deployTo &&
                                  Player.isProduction(BUILDINGS[u.def.deployTo]));
  }

  /* ---- A COIL OF RAZOR WIRE IS NOT A CONSTRUCTION SITE ----
     Obstacles are exempt from the build radius in G.canPlace - an engineer
     emplaces them wherever the fighting is, which is the entire point of them -
     and they are pushed into `buildings` like any other structure. So they were
     EXTENDING the radius as well as ignoring it, and a chain of 20-credit razor
     wire reached any point on the map and let a derrick go down beside it. That
     loophole is open to the player and the commander alike and it defeats the
     rule outright: a field obstacle is not a base and cannot be built from.
     A concrete barrier at 40 credits is NOT an obstacle, obeys the radius, and
     still creeps a base outward one span at a time - which is the legitimate
     version of the same idea and is left alone. */
  inBaseRadius(tx, ty, radius) {
    const R = radius || CFG.BUILD_RADIUS;
    for (const b of this.buildings) {
      if (b.dead || (b.def && b.def.obstacle)) continue;
      const d = U.dist(tx, ty, b.tx + b.def.w / 2, b.ty + b.def.h / 2);
      if (d <= R) return true;
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
    /* An army that never operated the thing cannot buy it. `fac` on a
       STRUCTURE is new - all twenty-eight belonged to everybody until the
       strategic early-warning arrays and the fixed jamming sites - and it
       reads exactly the way it already does on a unit. Tested here rather than
       only in the sidebar because the AI reaches the queue through
       enqueue() -> lockReason() and never through the menu. */
    if (def.fac !== undefined && def.fac !== "both" && def.fac !== this.faction)
      return "NOT IN SERVICE WITH THIS ARMY";
    /* not yet invented, or long since retired.
       Structures are exempt from the era window as a class, and have to be:
       rules.js stamps from:"e50" on every one of them, so an era test against
       that stamp is a test against nothing. The exception is a structure that
       declares an `srole` - the opt-in for a family whose members have real
       service dates and real national owners - and the blanket stamp cannot
       forge that field, because the stamp only ever writes `from`. When the
       stamping workstream lands and every structure carries an honest date the
       two cat tests come out and this reduces to the line the units use. */
    const structDated = def.srole !== undefined;
    if (typeof inEra === "function" && !isUpgrade &&
        (structDated || (def.cat !== "building" && def.cat !== "defense")) &&
        !inEra(def, this.era || CUR_ERA)) {
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
  spendOil(n, why) {
    /* A ledger of where the barrels went. Balancing fuel by watching the
       reserve number is guesswork - it only ever says "low" - and a commander
       sitting on forty thousand credits and six barrels gives no clue which
       of four spenders emptied it. Costs one addition per purchase. */
    if (n > 0) {
      if (!this.oilOut) this.oilOut = {};
      const k = why || "other";
      this.oilOut[k] = (this.oilOut[k] || 0) + n;
    }
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
  /* ---- bulk import (CFG.FUEL_BULK_*) ----
     The same for every player. Refineries are counted once a second, and only
     while the bank and the tanks qualify at all, so a poor side pays nothing
     for the check. */
  bulkFuelRate() {
    const rate = CFG.FUEL_BULK_RATE || 0;
    if (rate <= 0) return 0;
    if (this.cash < (CFG.FUEL_BULK_BANK || 0) || this.oil >= (CFG.FUEL_BULK_CEIL || 0)) return 0;
    const sec = Math.floor(this.game ? this.game.time : 0);
    if (this._refT !== sec) {
      let n = 0;
      for (const b of this.buildings)
        if (!b.dead && b.buildProgress >= 1 && b.def.id === "refinery") n++;
      this._refN = n; this._refT = sec;
    }
    const extra = Math.min(CFG.FUEL_BULK_MAX || 0, (this._refN || 0) - 1);
    return extra > 0 ? extra * rate : 0;
  }
  updateFuelPurchase(dt) {
    /* convoys bought on the market (below) unload here once they are due */
    if (this.fuelInbound && this.fuelInbound.length) this.receiveFuel();
    /* a ledger of barrels bought, beside oilOut's barrels spent */
    const inn = this.oilIn || (this.oilIn = { buy: 0, bulk: 0 });
    if (this.buysFuel()) {
      const want = CFG.FUEL_BUY_RATE * dt;
      const cost = want * CFG.FUEL_BUY_PRICE;
      if (this.cash >= cost) { this.cash -= cost; this.oil += want; inn.buy += want; }
    }
    const bulk = this.bulkFuelRate();
    if (bulk > 0) {
      const want = bulk * dt;
      const cost = want * CFG.FUEL_BULK_PRICE;
      if (this.cash >= cost) {
        this.cash -= cost; this.oil += want; inn.bulk += want;
        /* it spends the player's money on its own, so the player is told
           (once; the fuel readout shows the rate while it runs - ui.js) */
        if (!this.isAI && !this._bulkSaid && this.game && this.game.alert) {
          this._bulkSaid = true;
          this.game.alert("BULK FUEL IMPORT \u2014 REFINERIES BUYING CRUDE AT " +
                          CFG.FUEL_BULK_PRICE + " A BARREL", "good");
        }
      }
    }
  }

  /* ---- THE FUEL MARKET (CFG.FUEL_MKT_*) ----
     (rule, every player alike) Fuel bought by the tanker load: quoted, paid
     for the moment it is ordered, unloaded at a refinery ETA seconds later.
     The price climbs with this side's recent buying and eases as that
     pressure decays - config.js has the numbers and why. The pressure is
     kept as a level and the time it was written, and decayed when read, so a
     side that never buys costs nothing per tick and one that has bought
     costs one Math.pow per quote. */
  fuelPressure() {
    const m = this.fuelMkt;
    if (!m || !(m.p > 0)) return 0;
    const now = this.game ? this.game.time : 0;
    return m.p * Math.pow(0.5, Math.max(0, now - m.t) / (CFG.FUEL_MKT_HALFLIFE || 120));
  }
  /* what the next single barrel would cost */
  fuelPrice() {
    return (CFG.FUEL_MKT_PRICE || 30) * (1 + this.fuelPressure() / (CFG.FUEL_MKT_DEPTH || 100));
  }
  /* The quote describes the order as it WOULD be placed - bbl floored to
     whole barrels and clamped to one lot, its cost, its ETA - whether or not
     it can be; `ok` says whether it can and `why` says why not. So a caller
     that cannot afford 250 barrels still sees what they cost and can ask for
     fewer. `price` is the average per barrel of this order. */
  fuelQuote(bbl) {
    const n = Math.max(0, Math.min(CFG.FUEL_MKT_LOT || 250, Math.floor(+bbl || 0)));
    const L = this.fuelPressure();
    const cost = Math.round((CFG.FUEL_MKT_PRICE || 30) * n *
                            (1 + (L + n / 2) / (CFG.FUEL_MKT_DEPTH || 100)));
    const open = this.fuelInbound ? this.fuelInbound.length : 0;
    let why = null;
    if (this.defeated) why = "OUT OF THE WAR";
    else if (!this.hasBuilding("refinery")) why = "REQUIRES ORE REFINERY";
    else if (n < 1) why = "NOTHING TO BUY";
    else if (open >= (CFG.FUEL_MKT_OPEN || 4)) why = "CONVOYS ALREADY ON THE ROAD (" + open + ")";
    else if (this.cash < cost) why = "INSUFFICIENT FUNDS";
    return { ok: !why, bbl: n, cost, eta: CFG.FUEL_MKT_ETA || 30, why,
             price: n > 0 ? cost / n : this.fuelPrice() };
  }
  /* true = ordered: the credits leave now and the barrels land at `due` */
  buyFuel(bbl) {
    const q = this.fuelQuote(bbl);
    if (!q.ok || !this.spend(q.cost)) return false;
    const now = this.game ? this.game.time : 0;
    this.fuelMkt = { p: this.fuelPressure() + q.bbl, t: now };
    (this.fuelInbound || (this.fuelInbound = [])).push({ bbl: q.bbl, due: now + q.eta, cost: q.cost });
    /* barrels are booked in the ledger when they land (receiveFuel), the
       credits when they are paid */
    const inn = this.oilIn || (this.oilIn = { buy: 0, bulk: 0 });
    inn.marketCr = (inn.marketCr || 0) + q.cost;
    if (!this.isAI && this.game && this.game.alert)
      this.game.alert("FUEL ORDERED \u2014 " + q.bbl + " BBL FOR $" + U.fmt(q.cost) +
                      ", CONVOY DUE IN " + q.eta + "S", "good");
    return true;
  }
  /* undelivered orders, earliest first - copies, so nobody edits the book */
  fuelOrders() {
    const list = this.fuelInbound;
    if (!list || !list.length) return [];
    return list.map(o => ({ bbl: o.bbl, due: o.due, cost: o.cost }))
               .sort((a, b) => a.due - b.due);
  }
  /* From the per-player tick while anything is on the road. Everything due
     unloads together. With no refinery standing it waits, and the check is
     repeated once a second rather than every tick, since hasBuilding walks
     the whole base. A beaten side's orders are simply gone. */
  receiveFuel() {
    const list = this.fuelInbound, now = this.game ? this.game.time : 0;
    if (this.defeated) { list.length = 0; return; }
    let due = false;
    for (const o of list) if (o.due <= now) { due = true; break; }
    if (!due || (this._fuelWait || 0) > now) return;
    if (!this.hasBuilding("refinery")) {
      this._fuelWait = now + 1;
      if (!this.isAI && !this._fuelWaitSaid && this.game && this.game.alert) {
        this._fuelWaitSaid = true;
        this.game.alert("FUEL CONVOY WAITING \u2014 NO REFINERY TO UNLOAD AT", "warn");
      }
      return;
    }
    this._fuelWait = 0; this._fuelWaitSaid = false;
    let got = 0;
    for (let i = list.length - 1; i >= 0; i--)
      if (list[i].due <= now) { got += list[i].bbl; list.splice(i, 1); }
    this.oil += got;
    const inn = this.oilIn || (this.oilIn = { buy: 0, bulk: 0 });
    inn.market = (inn.market || 0) + got;
    /* the tank level makes every arrival line different: UI.alert drops a
       repeat of the previous line inside four seconds, and two 50-barrel
       lots clicked a second apart land a second apart */
    if (!this.isAI && this.game && this.game.alert)
      this.game.alert("FUEL CONVOY ARRIVED \u2014 " + got + " BBL UNLOADED, TANKS " +
                      Math.floor(this.oil) + " BBL", "good");
  }
  /* save.js: the orders on the road and the pressure behind the price, both
     against absolute game time - which a save restores - so a reload neither
     loses paid-for barrels nor hands out a quiet market. Nothing is written
     for a side with neither. */
  fuelMarketState() {
    const list = this.fuelInbound || [];
    const p = this.fuelPressure();
    if (!list.length && p < 0.01) return undefined;
    return { o: list.map(o => [o.bbl, +o.due.toFixed(2), Math.round(o.cost || 0)]),
             p: +p.toFixed(3), t: +(this.game ? this.game.time : 0).toFixed(3) };
  }
  /* ...and back. A missing key restores as nothing on the road and a quiet
     market, which is what a save from before this had; a malformed entry is
     skipped. Every field goes through a number first: a string that passed
     the checks would be concatenated into the tank on delivery ("10" + 50
     is "1050") and break the next save. */
  restoreFuelMarket(s) {
    this.fuelInbound = [];
    this.fuelMkt = null;
    this._fuelWait = 0;
    if (!s || typeof s !== "object") return;
    for (const r of (Array.isArray(s.o) ? s.o : [])) {
      if (!Array.isArray(r)) continue;
      const bbl = Math.floor(+r[0]), due = +r[1];
      if (!(bbl > 0) || !Number.isFinite(due)) continue;
      this.fuelInbound.push({ bbl, due, cost: +r[2] || 0 });
    }
    const p = +s.p, t = +s.t;
    if (p > 0 && Number.isFinite(t)) this.fuelMkt = { p, t };
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
    this.spendOil(st.oil, "era");
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
      if (i >= 0) { this.refund(this.factionCost(q.ready[i].def)); q.ready.splice(i, 1); return; }
    }
    for (let i = q.items.length - 1; i >= 0; i--) {
      if (q.items[i].id === id) {
        this.refund(q.items[i].paid);
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
      if (def.oil) this.spendOil(def.oil, "upgrade");
      if (def.tech) { this.tech = Math.max(this.tech, def.tech); }
      else this.upgrades[it.id] = true;
      if (def.tech) this.upgrades["tech" + def.tech] = true;
      if (!this.isAI) { this.game.alert(def.name.toUpperCase() + " COMPLETE", "good"); Sfx.play("ready"); UI.refreshCards(); }
    } else {
      /* unit: spawn at the right factory */
      const def = it.def;
      if (def.oil) {
        if (this.oil < def.oil) { /* refund, fuel ran out mid-build */ this.refund(this.factionCost(def)); return; }
        this.spendOil(def.oil, def.cat === "vehicle" ? "vehicle" : def.cat || "unit");
      }
      this.game.spawnUnit(this, it.id);
      if (!this.isAI) Sfx.play("unitready");
    }
  }
}
