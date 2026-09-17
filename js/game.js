/* ============ game.js — simulation core ============ */
var Game = (function () {
  const G = {};

  G.init = function (opts) {
    G.opts = opts;
    /* the period this battle is fought in, before anything reads the roster */
    G.era = (typeof ERAS !== "undefined" && ERAS.indexOf(opts.era) >= 0) ? opts.era : "e20";
    /* The two sides start in their own periods. A 1950s army defending against
       a present-day expedition is the fight the era system exists to allow, and
       it was impossible while both sides were pinned to one starting era. */
    G.eraAI = (typeof ERAS !== "undefined" && ERAS.indexOf(opts.eraAI) >= 0) ? opts.eraAI : G.era;
    /* CUR_ERA is only the fallback for code with no player in hand, so it
       follows the human - every real lookup goes through p.era. */
    if (typeof setEra === "function") setEra(G.era);
    G.rng = U.mulberry32(opts.seed);
    /* A battle may be fought on a bigger theatre than the 144x144 default.
       CFG.MAP_W is updated to match because render.js sizes the ground texture
       from it (PPT = 3072 / max(MAP_W, MAP_H)) and would otherwise paint a
       288-tile map at the detail budget of a 144-tile one. Everything else in
       the engine already reads G.map.W / G.map.H. The value rides in opts, so
       save.js - which stores G.opts wholesale and re-inits from it - carries
       the map size through a save and reload with no change of its own. */
    const mapSize = U.clamp(Math.round(opts.mapSize || CFG.MAP_W), 96, 384);
    CFG.MAP_W = mapSize; CFG.MAP_H = mapSize;
    G.map = GameMap.build(opts.theatre, opts.seed, opts.resources || 1,
      { starts: (opts.roster && opts.roster.length) || 2, size: mapSize });
    G.time = 0;
    G.speed = 1;
    G.paused = false;
    G.over = false;
    G.entities = [];
    G.grid = new U.SpatialGrid(G.map.W * CFG.TILE, G.map.H * CFG.TILE, CFG.TILE * 2);
    G.deferred = [];
    G.fogT = 0;
    G.eventX = 0; G.eventY = 0;
    /* the recent-event ring the minimap warning reads; see G.pingEvent */
    G.events = [];
    /* weather: fixed if the player chose one, otherwise it rolls */
    G.weatherKey = opts.weather && opts.weather !== "dynamic" ? opts.weather : "clear";
    G.weatherLock = !!(opts.weather && opts.weather !== "dynamic");
    G.weatherT = CFG.WEATHER_MIN;
    G.weatherBlend = 1;
    if (typeof Threat !== "undefined") Threat.init(G);

    Combat.reset();

    /* ---- roster: one human plus any number of AI commanders ---- */
    const roster = opts.roster && opts.roster.length ? opts.roster : [
      { faction: opts.factionHuman, ai: false, team: 1 },
      { faction: opts.factionAI, ai: true, team: 2, diff: opts.diff, handicap: opts.aiHandicap },
    ];
    G.players = roster.map((r, i) =>
      new Player(G, i, r.faction, opts.cash, !!r.ai));
    G.human = G.players.find(p => !p.isAI) || G.players[0];
    G.ai = G.players.find(p => p.isAI) || null;      // legacy: "the" AI
    roster.forEach((r, i) => {
      const p = G.players[i];
      p.team = r.team || (i + 1);
      p.diff = r.diff || opts.diff;
      p.personality = r.personality || "balanced";
      p.handicap = r.handicap || 1;
      /* The pre-battle Economy setting is a multiplier on what this commander's
         haulers bring home - the one place income can be scaled without
         inventing credits. On "Even" it is exactly 1 and the label is true. */
      p.harvestMul = r.handicap || 1;
      p.label = r.label || (p.isAI ? "AI " + i : "YOU");
    });

    /* pre-battle rules: starting tech, service restrictions, AI economy handicap */
    const armsBan = (mode) => {
      const b = {};
      if (mode === "noair" || mode === "ground") b.aircraft = true;
      if (mode === "nonavy" || mode === "ground") b.naval = true;
      return b;
    };
    for (const p of G.players) {
      const isHuman = p === G.human;
      p.banned = armsBan(isHuman ? opts.armsHuman : opts.armsAI);
      if (!opts.superweapons) p.banned.superweapon = true;
      p.tech = (isHuman ? opts.techHuman : opts.techAI) || 1;
      /* the highest tier this commander may ever reach. A ceiling below the
         starting tier would be contradictory, so it is raised to meet it. */
      p.techCap = Math.max(p.tech, (isHuman ? opts.capHuman : opts.capAI) || 3);
      /* each commander advances generations independently from the battle's
         starting period, up to the ceiling the battle was set with */
      p.era = isHuman ? G.era : G.eraAI;
      /* Each side carries its own era ceiling, the same way the tech tier cap
         is already split. A single shared ceiling made it impossible to set up
         the asymmetric fights the era system exists for — a modern expedition
         against an army frozen in the 1970s, say. */
      const wantCap = isHuman ? opts.eraCapHuman : opts.eraCapAI;
      p.eraCap = (typeof ERAS !== "undefined" && ERAS.indexOf(wantCap) >= 0)
        ? wantCap
        : ((typeof ERAS !== "undefined" && ERAS.indexOf(opts.eraCap) >= 0) ? opts.eraCap : "e20");
      if (eraIndex(p.eraCap) < eraIndex(p.era)) p.eraCap = p.era;
      for (let t = 2; t <= p.tech; t++) p.upgrades["tech" + t] = true;
    }

    if (typeof Mines !== "undefined") Mines.init(G);
    if (typeof SonarNet !== "undefined") SonarNet.init(G);
    G.obs = new Map();                     // tile index -> field obstacle

    /* occupancy: which tiles are covered by structures (index into entities or 0) */
    G.occ = new Int32Array(G.map.W * G.map.H);
    /* bumped whenever a structure is placed or removed, so cached lookups
       that depend on occupancy (harvester docks) know to recompute */
    G.occStamp = 1;
    /* Per-battle caches keyed on G.time. A new battle resets G.time to 0, so
       any cache stamped during the previous battle looks infinitely fresh
       (time - stamp goes negative) and is never rebuilt - which left
       harvesters searching the previous map's ore positions. */
    G._oreIdx = null;
    G.cbContacts = [];

    /* fog: 0 unseen, 1 explored, 2 visible — per human player only */
    G.fog = new Uint8Array(G.map.W * G.map.H);
    G.fogEnabled = opts.fog;
    if (!opts.fog) G.fog.fill(2);

    /* ---- civilian structures ----
       Neutral buildings standing in the towns, owned by nobody, that infantry
       can occupy and fight from. They belong to a bystander player so that
       ownership checks, targeting and the occupancy grid all work unchanged. */
    G.neutral = new Player(G, -1, G.players[0].faction, 0, false);
    G.neutral.isNeutral = true;
    G.neutral.label = "CIVILIAN";
    G.neutral.team = 0;
    G.neutral.cash = 0;
    /* civilian structures are nobody's colour: a neutral concrete grey, so
       they never read as belonging to a side until somebody occupies one */
    G.neutral.color = { main: "#8b8f92", dark: "#5d6164", light: "#b4b8bb" };
    for (const site of (G.map.civSites || [])) {
      const b = G.placeBuilding(G.neutral, "civblock", site.x, site.y, true);
      if (b) b.neutral = true;
    }

    /* ---- who deploys where ----
       The human may claim a specific position on the map; everyone else is
       dealt the remaining ones in a shuffled order so the same choice does
       not produce the same neighbours every time. */
    const nS = G.map.starts.length;
    const order = [];
    for (let i = 0; i < nS; i++) order.push(i);
    const want = opts.startPos;
    let mine = 0;
    if (typeof want === "number" && want >= 0 && want < nS) mine = want;
    else mine = Math.floor(G.rng() * nS);
    order.splice(order.indexOf(mine), 1);
    for (let i = order.length - 1; i > 0; i--) {          // deterministic shuffle
      const j = Math.floor(G.rng() * (i + 1));
      const t = order[i]; order[i] = order[j]; order[j] = t;
    }
    order.unshift(mine);
    G.startOrder = order;
    /* the human's actual deployment site. Anything that needs "where is the
       player's base" must use this, not starts[0] - the player may have
       chosen a different position, or been dealt a random one. */
    G.humanStart = G.map.starts[order[0]];

    /* deploy every commander */
    for (let i = 0; i < G.players.length; i++) {
      const p = G.players[i], s = G.map.starts[order[i % nS]];
      p.startIndex = order[i % nS];
      p.startName = (THEATRES[opts.theatre] && THEATRES[opts.theatre].startNames &&
                     THEATRES[opts.theatre].startNames[p.startIndex]) || null;
      p.homeX = s.x * CFG.TILE; p.homeY = s.y * CFG.TILE;
      const cy = G.placeBuilding(p, "conyard", s.x - 1, s.y - 1, true);
      /* free starting force */
      const mk = (role, dx, dy) => {
        const id = unitFor(p.faction, role);
        if (id) G.spawnUnitAt(p, id, (s.x + dx) * CFG.TILE, (s.y + dy) * CFG.TILE);
      };
      mk("rifle", -3, 2); mk("rifle", 3, 2); mk("recon", 0, 4);
    }

    AI.reset();
    for (const p of G.players)
      if (p.isAI) AI.create(G, p, p.diff || opts.diff, p.personality);
    /* opening intel: a generous explored zone around your deployment */
    if (G.fogEnabled) {
      const s0 = G.map.starts[G.startOrder ? G.startOrder[0] : 0], R = 16, R2 = R * R;
      for (let y = Math.max(0, s0.y - R); y <= Math.min(G.map.H - 1, s0.y + R); y++)
        for (let x = Math.max(0, s0.x - R); x <= Math.min(G.map.W - 1, s0.x + R); x++)
          if ((x - s0.x) * (x - s0.x) + (y - s0.y) * (y - s0.y) <= R2)
            G.fog[y * G.map.W + x] = 1;
    }
    G.recomputeFog();
    return G;
  };

  /* ---------------- weather ---------------- */
  G.weather = function () { return CFG.WEATHER[G.weatherKey] || CFG.WEATHER.clear; };
  G.updateWeather = function (dt) {
    if (G.weatherLock) return;
    G.weatherT -= dt;
    if (G.weatherT > 0) return;
    const keys = Object.keys(CFG.WEATHER);
    /* clear weather is the most common state; the rest roll in and out */
    const roll = G.rng();
    const next = roll < 0.40 ? "clear"
      : roll < 0.60 ? "overcast"
      : roll < 0.78 ? "night"
      : roll < 0.92 ? "rain" : "sandstorm";
    if (next !== G.weatherKey) {
      G.weatherKey = next;
      const w = G.weather();
      G.alert("WEATHER: " + w.name +
        (w.vis < 0.7 ? " — VISIBILITY DEGRADED" : ""), w.vis < 0.7 ? "bad" : "good");
    }
    G.weatherT = CFG.WEATHER_MIN + G.rng() * (CFG.WEATHER_MAX - CFG.WEATHER_MIN);
  };
  /* how far this unit can actually see, given weather and its sight fit */
  G.visionMul = function (unit) {
    const w = G.weather();
    if (w.vis >= 1) return 1;
    const fac = FACTIONS[unit.owner.faction] || {};
    /* thermal sights claw back most of what the weather takes away */
    let th = unit.def.thermal !== undefined ? unit.def.thermal : (fac.thermal || 0.5);
    /* dismounts rarely carry the sights their vehicles do */
    if (unit.cat === "infantry") th *= 0.6;
    /* a steep curve: a full thermal fit recovers nearly all of the loss,
       a partial fit recovers little. This is the 1991 asymmetry. */
    const recovery = w.thermalEdge * Math.pow(U.clamp(th, 0, 1), 1.6);
    return w.vis + (1 - w.vis) * recovery;
  };

  /* ---------------- air search radar ----------------
     Radar range against a given target scales with the fourth root of its
     radar cross section. A shooter may use its own nose radar, or a track
     handed to it over the datalink by any friendly radar that can see the
     target - which is how AWACS and Aegis decide a fight between two
     stealth fighters that cannot see each other.                         */
  function rcsOf(e) {
    if (e.def.rcs !== undefined) return e.def.rcs;
    /* fall back to the older stealth figure so nothing goes undetectable */
    if (e.def.stealth) return Math.max(0.004, Math.pow(1 - e.def.stealth, 3));
    return e.layer === "air" ? 1.0 : 1.4;
  }
  G.rcsOf = rcsOf;
  /* how far one sensor can see one target, in tiles */
  function radarReach(sensor, target) {
    const q = sensor.def.radarQ !== undefined ? sensor.def.radarQ
            : (sensor.def.radar ? sensor.def.radar * 1.6 : 0);
    if (!q) return 0;
    return q * Math.pow(rcsOf(target), 0.25);
  }
  G.radarReach = radarReach;

  /* The best track available to `shooter` on `target`, in tiles of range from
     the SHOOTER. Organic radar counts fully; an off-board track counts only
     as well as the faction's datalink carries it. */
  G.airTrack = function (shooter, target) {
    const d = U.dist(shooter.x, shooter.y, target.x, target.y) / CFG.TILE;
    /* organic nose radar */
    if (radarReach(shooter, target) >= d) return true;

    const fac = FACTIONS[shooter.owner.faction] || {};
    const dl = fac.datalink !== undefined ? fac.datalink : 0.5;
    if (dl < 0.05) return false;

    /* off-board: any friendly sensor that holds the track, degraded by how
       well this side actually shares it */
    for (const p of G.players) {
      if (p !== shooter.owner && !G.allied(shooter.owner, p)) continue;
      const scan = (list) => {
        for (const u of list) {
          if (u.dead || u === shooter || u.carried) continue;
          /* Pre-existing defect, closed here because these arrays make it
             worth much more: this loop is handed p.buildings as well as
             p.units and had neither a buildProgress nor a powered guard,
             where G.radarCovers and G.recomputeFog both have one. A radar
             dome already fed air tracks from its foundations; a 32-radarQ
             array would have fed much better ones. */
          if (u.kind === "building" && (u.buildProgress < 1 || !u.powered)) continue;
          /* the same rule one layer along: a set that is not running feeds
             nobody a firing solution either */
          if (u.kind !== "building" && !G.emitting(u)) continue;
          const q = u.def.radarQ !== undefined ? u.def.radarQ : (u.def.radar ? u.def.radar * 1.6 : 0);
          if (!q) continue;
          const du = U.dist(u.x, u.y, target.x, target.y) / CFG.TILE;
          if (radarReach(u, target) < du) continue;         // that sensor cannot see it
          /* a shared track is usable, but a poor datalink shrinks how far
             from the sensor the shooter may act on it */
          if (du <= radarReach(u, target) * dl) return true;
        }
        return false;
      };
      if (scan(p.units)) return true;
      if (scan(p.buildings)) return true;
    }
    return false;
  };

  /* ---------------- alliances ----------------
     Same team number = allies. Everyone else is a legitimate target.      */
  G.allied = function (a, b) {
    if (!a || !b) return false;
    if (a === b) return true;
    return a.team !== undefined && a.team === b.team;
  };
  G.enemiesOf = function (p) {
    return G.players.filter(o => o !== p && !o.defeated && !G.allied(p, o));
  };

  /* ---------------- deferred callbacks (burst fire scheduling) ---------------- */
  G.defer = function (delay, fn) { G.deferred.push({ t: G.time + delay, fn }); };

  /* ---------------- entity management ---------------- */
  G.spawnUnitAt = function (p, defId, x, y) {
    /* nudge spawn off occupied / impassable tiles */
    const layer = UNITS[defId].layer;
    if (layer !== "air") {
      let tx = U.clamp((x / CFG.TILE) | 0, 0, G.map.W - 1);
      let ty = U.clamp((y / CFG.TILE) | 0, 0, G.map.H - 1);
      if (!GameMap.passable(G.map, tx, ty, layer) || G.tileBlocked(tx, ty, null)) {
        const spot = Path.nearest(G.map, tx, ty, layer, (a, b) => G.tileBlocked(a, b, null), 10);
        if (spot) { x = spot.x * CFG.TILE + 16; y = spot.y * CFG.TILE + 16; }
      }
    }
    const u = new Unit(G, defId, p, x, y);
    G.entities.push(u); p.units.push(u);
    return u;
  };

  /* spawn from the correct production structure with rally point */
  /* the id this commander currently fields for a role, in its own era */
  G.unitOf = function (p, role) { return unitFor(p.faction, role, p.era || CUR_ERA); };

  G.spawnUnit = function (p, defId) {
    const def = UNITS[defId];
    const srcId = def.cat === "infantry" ? "barracks" : def.cat === "aircraft" ? "airbase" :
                  def.cat === "naval" ? "navalyard" : "factory";
    /* A commander with several factories nominates one as primary, and new
       units come out of that one - so reinforcements appear where they are
       wanted rather than wherever the pathfinder happens to pick. */
    let src = null;
    if (p.primary && p.primary[srcId]) {
      const pb = p.primary[srcId];
      if (!pb.dead && pb.buildProgress >= 1 && pb.def.id === srcId) src = pb;
    }
    if (!src) src = G.nearestBuilding(p, srcId, p.homeX, p.homeY);
    /* a carrier is an airbase that sails: if there is no strip, or its decks
       are the only free ramp, deliver the aircraft to the ship instead */
    let deck = null;
    if (def.cat === "aircraft" && def.carrierCapable) {
      let padsFree = 0;
      if (src) {
        let used = 0;
        for (const e of p.units) if (!e.dead && e.layer === "air" && e.padOn === src) used++;
        padsFree = (src.def.pads || 0) - used;
      }
      if (!src || padsFree <= 0) {
        let bd = Infinity;
        for (const sh of p.units) {
          if (sh.dead || !sh.def.carrier) continue;
          let used = 0;
          for (const e of p.units) if (!e.dead && e.layer === "air" && e.padOn === sh) used++;
          if (used >= sh.def.carrier) continue;
          const d = U.dist2(sh.x, sh.y, p.homeX, p.homeY);
          if (d < bd) { bd = d; deck = sh; }
        }
      }
    }
    if (!src && !deck) { p.earn(p.factionCost(def)); return null; }

    let sx, sy;
    if (def.cat === "naval") {
      /* find open water beside the yard */
      const spot = Path.nearest(G.map, src.tx + ((src.def.w / 2) | 0), src.ty + src.def.h, "sea", null, 8) ||
                   Path.nearest(G.map, src.tx, src.ty, "sea", null, 10);
      if (!spot) { p.earn(p.factionCost(def)); return null; }
      sx = spot.x * CFG.TILE + 16; sy = spot.y * CFG.TILE + 16;
    } else if (def.cat === "aircraft") {
      const host = deck || src;
      sx = host.x; sy = host.y;
    } else {
      const spot = Path.nearest(G.map, src.tx + ((src.def.w / 2) | 0), src.ty + src.def.h, "ground",
        (tx, ty) => G.tileBlocked(tx, ty, null), 7);
      sx = spot ? spot.x * CFG.TILE + 16 : src.x;
      sy = spot ? spot.y * CFG.TILE + 16 : src.y + src.def.h * CFG.TILE;
    }
    const u = G.spawnUnitAt(p, defId, sx, sy);
    p.stats.built++;
    /* a new airframe starts shut down on its ramp, not orbiting */
    if (u && def.cat === "aircraft") {
      u.padOn = deck || src;
      u.parked = true;
      u.order = { type: "parked" };
    }
    /* A warship with a flight deck sails with its air complement aboard, and
       that complement belongs to the ship. Lose an aircraft and the deck stays
       empty until the ship goes home for another - which is the whole
       logistical point of embarking aircraft rather than basing them ashore.
       An era carrier spells its deck `carrier` and has no `helo` at all, so
       gating on `helo` delivered the one hull built to operate aircraft empty. */
    if (u && def.cat === "naval" && (def.helo || def.carrier)) G.embarkComplement(u);

    /* move to rally */
    if (src.rally && def.cat !== "aircraft")
      u.give({ type: "move", x: src.rally.x, y: src.rally.y });
    return u;
  };

  /* ---- which airframes can work from a deck ----
     rules.js tags the present-day roster by hand, but eras.js is merged after
     that pass has run, so no era aircraft carried the flag at all - not even
     the ASW helicopters that exist purely to fly off ships. The geometry table
     already separates real rotorcraft from the aeroplanes filed under the same
     roles (An-2, Po-2, C-46 and Il-76 are kind:"wing"), so no second
     hand-written list is needed. */
  for (const _id in UNITS) {
    const _d = UNITS[_id];
    if (_d.cat !== "aircraft" || _d.carrierCapable) continue;
    const _spec = (typeof ROTORCRAFT !== "undefined") ? ROTORCRAFT[_id] : null;
    if (_d.role === "aswhelo" || (_spec && _spec.kind !== "wing")) _d.carrierCapable = true;
  }
  /* an id only if that machine can actually operate from a deck: whatever is
     put on one has to be allowed to land back on it by G.findPad */
  function deckLegal(id) { return (id && UNITS[id] && UNITS[id].carrierCapable) ? id : null; }

  /* What a navy puts in ONE deck spot, on this ship, in its owner's period.
     An escort's hangar takes a helicopter and nothing else. A carrier is an
     air wing: fighters fill the deck and the last spot is the ASW helicopter
     every real deck sails with for plane-guard and submarine work. This used
     to answer "a helicopter" whoever asked, which is why a supercarrier put to
     sea as a very expensive helicopter pad. */
  G.deckAircraftFor = function (host, slot) {
    const p = host && host.owner ? host.owner : host;      // a bare player still works
    if (!p) return null;
    const era = p.era || G.era;
    const helo = deckLegal(unitFor(p.faction, "aswhelo", era)) ||
                 deckLegal(unitFor(p.faction, "transport", era));
    if (!host || !host.def || !host.def.carrier) return helo;
    /* The deck is filled with the workhorse rather than the exquisite machine -
       a wing is mostly Super Hornets - and a stealth fighter or a Hawkeye can
       still be bought onto a spare spot by hand. */
    const fighter = deckLegal(unitFor(p.faction, "cfighter", era)) ||
                    deckLegal(unitFor(p.faction, "cstealth", era));
    /* No naval air arm this period: she sails as a helicopter carrier, which
       is exactly what Moskva and her kind actually were. */
    if (!fighter) return helo;
    const slots = host.deckSlots ? host.deckSlots() : 1;
    if (slot >= slots - 1 && helo) return helo;
    /* A REAL AIR WING IS FIGHTERS AND ATTACK AIRCRAFT. Until the "cstrike"
       role existed this returned the fighter for every spot but the last, so
       a deck sailed as a single squadron - and in the 1980s that squadron was
       F-14As, which carry nothing that can touch the beach. One spot in three
       goes to the strike aircraft where the navy HAS one; where it does not,
       nothing changes and the deck is fighters as before. */
    const strike = deckLegal(unitFor(p.faction, "cstrike", era));
    if (strike && slots >= 3 && slot % 3 === 1) return strike;
    return fighter;
  };

  /* Fill every empty deck slot. Used when the ship is delivered, and again
     whenever it is alongside a naval yard. Returns how many it took on. */
  G.embarkComplement = function (ship, charge) {
    if (!ship || ship.dead || !ship.deckSlots) return 0;
    const slots = ship.deckSlots();
    if (!slots) return 0;
    let have = ship.wing().length;
    if (have >= slots) return 0;
    let made = 0;
    while (have < slots) {
      /* Ask per spot rather than once for the whole deck, and ask for the spot
         that is actually empty: lose the helicopter and the next machine craned
         aboard is a helicopter, lose a fighter and it is a fighter. The price
         below then follows the airframe instead of always being a helicopter's. */
      const id = G.deckAircraftFor(ship, ship.wing().some(u => u.def.hover) ? 0 : slots - 1);
      if (!id || !UNITS[id]) break;
      if (charge) {
        const cost = Math.round((UNITS[id].cost || 0) * 0.6);   // airframe only
        if (ship.owner.cash < cost) break;
        ship.owner.cash -= cost;
      }
      const h = G.spawnUnitAt(ship.owner, id, ship.x, ship.y);
      if (!h) break;
      h.padOn = ship; h.parked = true; h.order = { type: "parked" };
      have++; made++;
    }
    return made;
  };

  /* ---------------- construction ---------------- */
  G.canPlace = function (p, defId, tx, ty) {
    const def = BUILDINGS[defId];
    if (tx < 0 || ty < 0 || tx + def.w > G.map.W || ty + def.h > G.map.H) return false;
    let touchesShoreWater = false, anyLand = false;
    for (let y = ty; y < ty + def.h; y++) for (let x = tx; x < tx + def.w; x++) {
      const t = G.map.terrain[y * G.map.W + x];
      if (G.occ[y * G.map.W + x]) return false;
      /* never pave an ore field — except a derrick, which must sit on its node */
      if (!def.oilNode && G.map.ore[y * G.map.W + x] > 25) return false;
      if (def.shore) {
        if (t === T.WATER) touchesShoreWater = true; else anyLand = true;
        if (t === T.ROCK || t === T.TREE) return false;
      } else {
        if (!CFG.TERRAIN[t].pass || t === T.TREE) return false;
      }
      /* no units standing in the footprint */
      let blocked = false;
      G.grid.query(x * CFG.TILE + 16, y * CFG.TILE + 16, 20, (e) => {
        if (e.dead || e.kind !== "unit" || e.layer !== "ground" || e.carried) return;
        /* The engineer doing the emplacing is standing right there by
           definition, and must not veto its own work. */
        if (e === G._placer) return;
        blocked = true;
      });
      if (blocked) return false;
    }
    if (def.shore && !(touchesShoreWater && anyLand)) return false;
    /* oil derricks only on surveyed nodes */
    if (def.oilNode) {
      let onNode = false;
      for (const n of G.map.oilNodes)
        if (!n.taken && n.x >= tx && n.x < tx + def.w && n.y >= ty && n.y < ty + def.h) onNode = true;
      if (!onNode) return false;
    }
    /* ---- AND A DERRICK IS INSIDE THE RADIUS LIKE EVERYTHING ELSE ----
       (owner) "the ai may cheat by expand their building out of the buidling
       scope. like they can build the oil derrick very far away from their
       building."
       It was not a cheat - this line exempted oilNode for EVERYBODY, so a
       player could pipeline to any surveyed node on the map too. But the owner
       is right about what it costs: a well that needs no base beside it makes
       expansion free, and taking ground is the whole point of an oil field. It
       obeys CFG.BUILD_RADIUS now, so reaching the next field means building
       TOWARD it - which is what a player does and what a commander now has to
       do as well.
       The conyard still deploys anywhere, because it is what a base starts
       from, and a field obstacle is still emplaced by an engineer wherever the
       fighting is, which is the entire point of it. */
    if (!def.base && !def.obstacle &&
        !p.inBaseRadius(tx + def.w / 2, ty + def.h / 2,
                        def.oilNode ? CFG.OIL_RADIUS : CFG.BUILD_RADIUS)) return false;
    return true;
  };

  /* ---- unfolding a rig into a base ----
     This lived inside the keyboard handler in ui.js and was hardcoded to
     G.human, so the one mechanism the game itself calls "the only way to build
     a forward base or an expansion" was available to the player and to nobody
     else. A commander could not expand at all, which is why it sat in its
     starting corner for the whole match. Same code, same rules, either side. */
  G.deployRig = function (u) {
    if (!u || u.dead || u.kind !== "unit" || !u.def.deployTo) return false;
    const bid = u.def.deployTo, bd = BUILDINGS[bid];
    if (!bd) return false;
    const tx = u.tx - ((bd.w / 2) | 0), ty = u.ty - ((bd.h / 2) | 0);
    /* clear our own footprint by momentarily ignoring the vehicle */
    u.carried = true;
    const ok = G.canPlace(u.owner, bid, tx, ty);
    u.carried = false;
    if (!ok) return false;
    u.dead = true;
    const b = G.placeBuilding(u.owner, bid, tx, ty, true);
    b.hp = b.maxHp * (u.hp / u.maxHp);
    if (u.owner === G.human) { G.alert("CONSTRUCTION YARD DEPLOYED", "good"); Sfx.play("ready"); }
    return true;
  };

  G.bumpOcc = function () { G.occStamp = (G.occStamp || 0) + 1; };

  G.placeBuilding = function (p, defId, tx, ty, instant) {
    G.bumpOcc();
    const def = BUILDINGS[defId];
    const b = new Building(G, defId, p, tx, ty);
    b.buildProgress = instant ? 1 : 0;
    G.entities.push(b); p.buildings.push(b);
    for (let y = ty; y < ty + def.h; y++) for (let x = tx; x < tx + def.w; x++) {
      G.occ[y * G.map.W + x] = b.id;
      /* G.occ only stores an entity id, and the movement and cover code needs
         the obstacle itself every tick - so obstacles get their own index */
      if (def.obstacle) G.obs.set(y * G.map.W + x, b);
    }
    if (def.oilNode)
      for (const n of G.map.oilNodes)
        if (n.x >= tx && n.x < tx + def.w && n.y >= ty && n.y < ty + def.h) n.taken = true;
    if (def.freeUnit && instant !== "captured") {
      /* refinery ships with a harvester */
      G.defer(0.5, () => {
        if (!b.dead) G.spawnUnitAt(p, def.freeUnit,
          (tx + def.w / 2) * CFG.TILE, (ty + def.h + 1) * CFG.TILE);
      });
    }
    return b;
  };

  G.captureBuilding = function (b, newOwner) {
    const old = b.owner;
    old.buildings.splice(old.buildings.indexOf(b), 1);
    b.owner = newOwner;
    newOwner.buildings.push(b);
    /* a structure with a commander's name on it is not unclaimed any more:
       leaving the flag set left a captured block that no gun would fire at */
    b.neutral = false;
    b.hp = Math.max(b.hp, b.maxHp * 0.5);
    /* The renderer caches one model instance per building keyed on the owner's
       colour. reassignBuilding() below has always raised this flag; this path
       never did, so an engineer capture left the structure flying the previous
       owner's colours and the player could not see what they had just taken. */
    b.reskin = true;
    /* And stop shooting at it. autoTargetable() only rejects NEUTRAL
       buildings, so a captured one stayed a legal target for the very army
       that had just taken it, and the attack handler deliberately preserves
       an order the player gave by hand - which is right in general and wrong
       here, because nobody hand-orders an attack on a building they own. */
    G.dropOrdersAgainst(b, newOwner);
    /* A capture the human neither suffered nor carried out - two AI
       commanders trading a block behind the fog - used to ping anyway, and
       shift+space would then fly the camera to a structure the player has
       never laid eyes on. A warning system must not be a map hack.

       Losing one of yours is Threat's banner, for the same reason as onDeath:
       G.alert("...", "bad") already sounds `alarm`, so both would announce
       the same capture twice. Taking one of theirs is a good-news toast,
       which Threat has no rung for and should not have. */
    if (old === G.human) {
      const T = (typeof Threat !== "undefined" && Threat.reportLoss) ? Threat : null;
      if (T) { if (!T.reportLoss(b, true)) G.alert("STRUCTURE CAPTURED BY ENEMY", "bad", true); }
      else { G.alert("STRUCTURE CAPTURED BY ENEMY", "bad"); G.pingEvent(b.x, b.y, "loss"); }
    } else {
      G.alert("ENEMY STRUCTURE CAPTURED", "good");
      if (newOwner === G.human || G.visibleTo(G.human, b)) G.pingEvent(b.x, b.y, "note");
    }
  };

  /* Cancel every standing engagement against `b` held by `owner` and its
     allies - the current order, anything queued behind it, and a turret's
     acquired focus. Called whenever a structure changes hands, so it covers
     an engineer capture, a civilian block being garrisoned, and a garrison
     emptying out again. Other commanders keep their orders: the building is
     still hostile to them. */
  G.dropOrdersAgainst = function (b, owner) {
    if (!b || !owner) return;
    const stops = (o) => o && (o.type === "attack" || o.type === "bombard") && o.target === b;
    for (const p of G.players) {
      if (p !== owner && !G.allied(p, owner)) continue;
      for (const u of p.units) {
        if (u.dead) continue;
        if (u.orders && u.orders.length) u.orders = u.orders.filter(o => !stops(o));
        if (stops(u.order)) {
          /* Send it back to the ground it was working, not to idle - a unit
             that was attack-moving through should carry on through. */
          u.order = u.order.resume
            ? { type: "attackmove", x: u.order.resume.x, y: u.order.resume.y }
            : (u.nextOrder() ? u.order : { type: u.layer === "air" ? "hover" : "idle" });
        }
        if (u.focus === b) u.focus = null;
      }
      for (const s of p.buildings) {
        if (s.dead) continue;
        if (stops(s.order)) s.order = { type: "idle" };
        if (s.focus === b) s.focus = null;
      }
    }
  };

  G.sellBuilding = function (b) {
    if (b.dead) return;
    b.owner.earn(b.def.cost * CFG.SELL_REFUND * (b.hp / b.maxHp));
    G.removeBuilding(b);
    Sfx.play("sell");
  };

  /* Hand a structure to another commander - used when infantry occupy a
     civilian building, and when an engineer captures one. */
  G.reassignBuilding = function (b, p) {
    const from = b.owner;
    if (from && from.buildings) {
      const i = from.buildings.indexOf(b);
      if (i >= 0) from.buildings.splice(i, 1);
    }
    b.owner = p;
    p.buildings.push(b);
    /* The renderer caches one model instance per building, keyed on the
       owner's colour, but nothing told it the owner had changed - so a
       captured structure kept flying the previous owner's colours and the
       player had no way to see what they had just taken. */
    b.reskin = true;
    /* Same reasoning as captureBuilding: whoever now owns it should stop
       shooting at it. p may be G.neutral here (a civilian block emptying
       out), and a neutral structure is already rejected by autoTargetable,
       so the sweep is a no-op in that direction rather than wrong. */
    G.dropOrdersAgainst(b, p);
    return b;
  };

  G.removeBuilding = function (b) {
    G.bumpOcc();
    /* clear a primary nomination pointing at this structure */
    if (b.owner && b.owner.primary) {
      for (const k in b.owner.primary) if (b.owner.primary[k] === b) b.owner.primary[k] = null;
    }
    b.dead = true;
    for (let y = b.ty; y < b.ty + b.def.h; y++)
      for (let x = b.tx; x < b.tx + b.def.w; x++) {
        if (G.occ[y * G.map.W + x] === b.id) G.occ[y * G.map.W + x] = 0;
        if (G.obs.get(y * G.map.W + x) === b) G.obs.delete(y * G.map.W + x);
      }
    /* a destroyed or sold derrick frees its oil node for whoever takes the
       ground next — otherwise the site is dead for the rest of the match */
    if (b.def.oilNode) {
      for (const n of G.map.oilNodes) {
        if (n.x >= b.tx && n.x < b.tx + b.def.w &&
            n.y >= b.ty && n.y < b.ty + b.def.h) n.taken = false;
      }
    }
  };

  G.onDeath = function (e) {
    if (e.kind === "building") {
      /* A civilian block that comes down leaves a wreck rather than clean
         ground: it still blocks the street, and an engineer can put a roof
         back on it later. */
      const rubbleId = (e.def.cat === "civilian" && !e.def.rubble) ? "civrubble" : null;
      const rtx = e.tx, rty = e.ty;
      G.removeBuilding(e);
      if (rubbleId && BUILDINGS[rubbleId] && G.neutral) {
        const r = G.placeBuilding(G.neutral, rubbleId, rtx, rty, true);
        if (r) r.hp = r.maxHp;
      }
      const mine = e.owner === G.human;
      if (mine || !e.owner.isAI || e.owner === G.ai) Sfx.play("explode_big");
      /* Losing a structure is the top rung of the warning. An enemy block
         coming down where the player cannot see it is not a warning at all,
         and pinging it would turn the marker into a fog reveal.

         One event, one announcement. G.alert with class "bad" already plays
         `alarm` at ui.js:2635, so running it alongside Threat.reportLoss told
         the player the same thing twice, in two widgets, with two different
         sounds - a toast reading "POWER PLANT LOST" with an alarm, and a
         banner reading "POWER PLANT LOST" with threat_high, a red flash and a
         shake. Threat owns this one: its banner carries the sub-line and it
         places the minimap marker. The toast is the fallback for a build with
         no Threat module, and stays for the barriers Threat deliberately
         passes over, which would otherwise die silently. */
      if (mine) {
        const T = (typeof Threat !== "undefined" && Threat.reportLoss) ? Threat : null;
        /* Threat places the marker and decides whether this is worth a banner.
           It says so, and the toast fills the gap it leaves - QUIETLY. The
           previous version sent every barrier down the toast branch, so each
           dead wall segment fired `alarm` on a 60 ms gate and painted a red
           strategic cross: the two things the barrier rule exists to stop. */
        if (T) {
          if (!T.reportLoss(e, false)) G.alert(e.def.name.toUpperCase() + " LOST", "bad", true);
        } else {
          G.alert(e.def.name.toUpperCase() + " LOST", "bad");
          G.pingEvent(e.x, e.y, "loss");
        }
      } else if (G.visibleTo(G.human, e)) {
        G.pingEvent(e.x, e.y, "note");
      }
    } else {
      if (e.cargo && e.cargo.length) for (const c of e.cargo) { c.carried = false; Combat.kill(G, c, null); }
      if (e.owner === G.human && e.def.harvester) G.alert("ORE HAULER LOST", "bad");
      /* A destroyed unit leaves a mark. The damage path pings once every three
         seconds per object and that marker lives 2.5s, so a company wiped out
         off-screen could otherwise leave the minimap blank by the time the
         player looked at it. No sound: the rungs above own that. */
      if (e.owner === G.human && G.pingEvent) G.pingEvent(e.x, e.y, "unit");
      Sfx.play(e.cat === "infantry" ? "die_inf" : "explode");
    }
  };

  /* ---------------- queries ---------------- */
  /* An airborne sensor only works airborne. A radar aircraft shut down on its
     ramp has its rotodome stationary and its crew on the ground - it should
     not be lighting up half the map from inside the hangar. The same is true
     of a jammer. Ground and naval emitters are unaffected. */
  G.emitting = function (u) {
    if (!u || u.dead || u.carried) return false;
    if (u.layer !== "air") return true;
    return !u.parked && !(u.order && u.order.type === "parked");
  };

  /* The nearest friendly tanker that is airborne, still has fuel to give, and
     is closer than u's own ramp. This is the whole aerial-refuelling
     mechanism: it makes reserveFuel() and the RTB decision measure distance to
     the TANKER rather than to the airfield. */
  G.nearestTanker = function (u) {
    if (!u || !u.def.refuelable) return null;
    let best = null, bd = Infinity;
    for (const t of u.owner.units) {
      if (t === u || t.dead || t.carried) continue;
      if (!t.def.tanker || t.offload <= 0) continue;
      if (t.parked || (t.order && t.order.type === "parked")) continue;
      const d = U.dist2(u.x, u.y, t.x, t.y);
      if (d < bd) { bd = d; best = t; }
    }
    return best;
  };

  G.obstacleAt = function (tx, ty) {
    if (!G.obs) return null;
    const o = G.obs.get(ty * G.map.W + tx);
    return (o && !o.dead) ? o : null;
  };
  G.tileBlocked = function (tx, ty, forUnit) {
    const id = G.occ[ty * G.map.W + tx];
    if (!id) return false;
    if (forUnit && forUnit.layer === "air") return false;
    /* A field obstacle blocks selectively. Dragon's teeth stop a tank dead and
       let a rifle squad walk between them; wire is the other way round. Without
       this every obstacle would be an impassable wall to everybody, which is
       the whole difference between an obstacle and a building. */
    const o = G.obstacleAt(tx, ty);
    if (o && forUnit) {
      const blocks = o.def.blocks || "all";
      if (blocks === "none") return false;
      if (blocks === "vehicle") return forUnit.cat !== "infantry";
    }
    return true;
  };
  G.nearestBuilding = function (p, defId, x, y) {
    let best = null, bd = Infinity;
    for (const b of p.buildings) {
      if (b.dead || b.def.id !== defId || b.buildProgress < 1) continue;
      const d = U.dist2(x, y, b.x, b.y);
      if (d < bd) { bd = d; best = b; }
    }
    return best;
  };
  /* ---- ore index ----
     Harvesters used to scan the whole grid every time they wanted a field.
     That is 20k tiles per query; with six commanders it was the hottest loop
     in the game. Ore lives in a coarse bucket index instead, rebuilt lazily. */
  const ORE_CELL = 6;                                  // tiles per bucket
  G._oreIdx = null;
  function buildOreIndex() {
    const map = G.map;
    const cw = Math.ceil(map.W / ORE_CELL), ch = Math.ceil(map.H / ORE_CELL);
    const cells = new Array(cw * ch);
    for (let i = 0; i < cells.length; i++) cells[i] = null;
    for (let y = 0; y < map.H; y++) for (let x = 0; x < map.W; x++) {
      if (map.ore[y * map.W + x] < 20) continue;
      const ci = ((y / ORE_CELL) | 0) * cw + ((x / ORE_CELL) | 0);
      (cells[ci] || (cells[ci] = [])).push(x, y);
    }
    G._oreIdx = { cw, ch, cells, stamp: G.time };
  }
  G.invalidateOre = function () { if (G._oreIdx) G._oreIdx.stamp = -1; };

  G.nearestOre = function (tx, ty, p) {
    const map = G.map;
    if (!G._oreIdx || G.time - G._oreIdx.stamp > 8) buildOreIndex();
    const idx = G._oreIdx, cw = idx.cw, ch = idx.ch;
    const foes = G.enemiesOf(p);
    const cx0 = (tx / ORE_CELL) | 0, cy0 = (ty / ORE_CELL) | 0;
    let best = null, bd = Infinity;
    /* expanding ring search: stop as soon as no closer bucket can beat the best */
    for (let r = 0; r < Math.max(cw, ch); r++) {
      if (best && (r - 1) * ORE_CELL * (r - 1) * ORE_CELL > bd) break;
      let scanned = false;
      for (let cy = cy0 - r; cy <= cy0 + r; cy++) {
        if (cy < 0 || cy >= ch) continue;
        for (let cx = cx0 - r; cx <= cx0 + r; cx++) {
          if (cx < 0 || cx >= cw) continue;
          if (r > 0 && Math.max(Math.abs(cx - cx0), Math.abs(cy - cy0)) !== r) continue;
          const list = idx.cells[cy * cw + cx];
          if (!list) continue;
          scanned = true;
          for (let k = 0; k < list.length; k += 2) {
            const x = list[k], y = list[k + 1], i = y * map.W + x;
            if (map.ore[i] < 20 || G.occ[i]) continue;
            /* Nobody routes a hauler to ore they have never laid eyes on.
               This used to read `p === G.human`, so only the player was held to
               it: an AI hauler picked the best tile on the whole map from the
               first second, through fog, on ground nothing of its had visited. */
            if (G.fogEnabled && !G.explored(p, i)) continue;
            let d = U.dist2(tx, ty, x, y);
            for (const f of foes)
              if (U.dist2(x, y, f.homeX / CFG.TILE, f.homeY / CFG.TILE) < 18 * 18) { d *= 9; break; }
            if (d < bd) { bd = d; best = { x, y }; }
          }
        }
      }
      if (!scanned && r > Math.max(cw, ch) / 2 && !best) break;
    }
    return best;
  };
  /* Airbase pad or deck for an aircraft to land on. `claim` writes the result
     back as the airframe's home ramp; without it this is a pure query, which
     is all the bingo-fuel reserve ever wanted from it. */
  G.findPad = function (u, claim) {
    /* What a given host can offer THIS airframe. A carrier's deck takes
       anything carrier-capable; an escort's flight deck takes a rotor and
       nothing else - a destroyer cannot recover a fixed-wing aircraft.
       def.helo had been sitting on twelve ships since they were written, and
       the build tooltip had been promising "EMBARKS 2 HELICOPTERS" the whole
       time, but the old blanket carrier-capable gate skipped every ship for a
       helicopter without the flag - including the deck it was standing on. */
    const rotary = !!(u && u.def.hover);
    const deckOK = !u || u.def.carrierCapable;
    const slotsOn = (h) => h.kind === "building"
      ? (h.buildProgress >= 1 ? (h.def.pads || 0) : 0)
      : ((h.def.carrier || 0) > 0 ? (deckOK ? h.def.carrier : 0)
                                  : (rotary ? (h.def.helo || 0) : 0));
    const usedOn = (h) => {
      let n = 0;
      for (const e of u.owner.units)
        if (!e.dead && e.layer === "air" && e !== u && e.padOn === h) n++;
      return n;
    };
    /* An aircraft goes home to where it is BASED, not to whatever ramp happens
       to be nearest this frame. Home is an assignment - the player's, or the
       one the airframe was delivered to. This runs once a tick per airframe
       out of reserveFuel(), so the moment a ship's helicopter drifted closer
       to a shore airfield than to its own deck it was re-homed there for good:
       the ship read her hangar as empty and bought a replacement, and no
       recall to the ship survived to the next tick. */
    const home = u && u.padOn && !u.padOn.dead ? u.padOn : null;
    if (home) {
      const hs = slotsOn(home);
      if (hs > 0 && usedOn(home) < hs) return { x: home.x, y: home.y, host: home };
    }
    let best = null, bd = Infinity;
    for (const b of u.owner.buildings) {
      if (b.dead || !slotsOn(b)) continue;
      if (usedOn(b) >= slotsOn(b)) continue;
      const d = U.dist2(u.x, u.y, b.x, b.y);
      if (d < bd) { bd = d; best = { x: b.x, y: b.y, host: b }; }
    }
    for (const s of u.owner.units) {
      if (s.dead) continue;
      const slots = slotsOn(s);
      if (!slots || usedOn(s) >= slots) continue;
      const d = U.dist2(u.x, u.y, s.x, s.y);
      if (d < bd) { bd = d; best = { x: s.x, y: s.y, host: s }; }
    }
    /* Only an aircraft that is actually going there claims the slot. This used
       to fire on every call, and a wing therefore reshuffled its home bases
       thirty times a second. */
    if (claim && best && u) u.padOn = best.host;
    return best;
  };

  /* ---------------- sensors ----------------
     Any friendly platform with a `radar` fit projects a coverage bubble.
     Fire directed into that bubble is far more accurate than blind fire.   */
  /* ---- electronic warfare ----
     Strength of hostile jamming over a point, 0..~1.5. A jammer's own faction
     doctrine scales its output; the victim's doctrine hardens against it.   */
  /* ---- the generational contest ----
     Jamming is not a flat effect. A jammer built to defeat the radars of its
     own day struggles against a set two generations newer, which hops
     frequencies it was never designed to follow; and a modern jammer walks
     straight through an old radar. So the outcome depends on which of the two
     is the newer machine, not merely on how close the jammer is.
     Returns a multiplier on the jammer's strength. */
  function genContest(radarDef, jammerDef) {
    if (typeof eraIndex !== "function") return 1;
    /* rules.js stamps from:"e50" on every structure that was never given a
       real service date, and marks the ones it invented. Running a
       generational contest against an invented 1950 gave an e80 jammer
       1.7^3 = 4.91x against a radar dome, a SAM site or an airbase - a
       fabricated bonus, and the single largest number in this whole
       subsystem. Either side undated means no contest. */
    if ((radarDef && radarDef.eraStamped) || (jammerDef && jammerDef.eraStamped)) return 1;
    /* ---- THE SET, NOT THE AEROPLANE ----
       (owner) "fixing the E2d and E2C"
       This contest used to key off `from`, which is the PLATFORM's service
       date, and that conflates an airframe with the electronics inside it.
       The E-2C and the E-2D are the same aeroplane to look at and two
       different radars: an APS-145 of about 1990 against an APY-9 UHF
       active array of 2014. France and Taiwan fly E-2Cs TODAY, so `from`
       put a 1990 radar into a 2020s contest and handed it three generations
       it never earned - the largest correction available in this subsystem,
       in the wrong direction.
       `radarGen` and `jamGen` are the honest date of the EQUIPMENT and
       override the airframe when they are present. Absent, nothing changes
       and the platform's own date is still used - which is right for the
       overwhelming majority, where the set and the airframe are the same
       generation. */
    const rFrom = (radarDef && (radarDef.radarGen || radarDef.from)) || "e20";
    const jFrom = (jammerDef && (jammerDef.jamGen || jammerDef.from)) || "e20";
    const r = eraIndex(rFrom);
    const j = eraIndex(jFrom);
    const gap = r - j;                       // positive: the radar is newer
    if (gap === 0) return 1;
    /* each generation of advantage roughly halves the jamming that gets
       through; each generation behind roughly doubles it */
    return gap > 0 ? Math.pow(0.55, Math.min(3, gap))
                   : Math.pow(1.7, Math.min(3, -gap));
  }
  G.genContest = genContest;

  /* ---- who is actually on the air ----
     jamAgainst(), jamAt() and gpsJamAt() each have to walk BOTH object kinds
     now, and a vehicle and a structure are switched off for different reasons.
     A vehicle is off when it is dead, riding inside a transport, or parked on
     a ramp with its pods stowed - that is G.emitting(). A structure is off
     while it is still scaffolding, and off again the instant the grid browns
     out: a jamming station is a transmitter hall and the largest single load
     on its plot, so an unpowered one is a shed. */
  /* ---- THE SHARED ELECTRONIC PICTURE ----
     (owner) "if you need to make an intellegence info brain to share with ew
     aircraft or e2/e3 or argus navy, it won't be a bad idea right?"

     It is the right idea, and it is the physics. A radar that transmits
     announces itself, and it announces itself MUCH further than it can see:
     the radar pays for the round trip out to a target and back, a receiver
     pays one way. So a Growler hears a battery long before that battery could
     paint the Growler, and an E-3 or an Aegis ship hears it for the whole
     force at once. That asymmetry is the entire basis of suppression of enemy
     air defences and the game had no expression of it.

     ai.js:esmSweep has had this since the Wild Weasel work - the AI has been
     hearing emitters at 1.9x their own reach - and the human has had nothing,
     so a player's Growler could not hear a battery that an AI Growler standing
     beside it could. This lifts the law out so both sides share it, and so
     that ONE listener cues EVERY shooter.

     WHO LISTENS: anything carrying a set or built to collect - the strategic
     arrays and the radar dome (PAVE PAWS), an AEW aircraft by role, an Aegis
     hull by its radar quality, and the SEAD and EW aircraft's own receivers.
     WHAT IS HEARD: only what is actually ON THE AIR. G.jamming() is false for
     an unpowered dome, a browned-out SAM and a jammer parked with its pods
     stowed - so switching a set off hides it from the whole network, which is
     the counter-play and is why it is worth modelling at all.

     Cached half a second per player: this is asked once per SEAD aircraft per
     tick and it is O(listeners x emitters). */
  G.ESM_GAIN = 1.9;
  const ESM_PLOT = [];
  G.esmPlot = function (owner) {
    if (!owner) return null;
    const rec = ESM_PLOT[owner.idx];
    if (rec && G.time - rec.t < 0.5) return rec.set;
    const set = new Set(), ears = [];
    for (const u of owner.units) {
      if (u.dead || u.carried || !G.emitting(u)) continue;
      const d = u.def;
      if (d.radar || d.radarQ || d.awacs || d.role === "ewair" || d.role === "sead")
        ears.push(u);
    }
    for (const b of owner.buildings) {
      if (b.dead || b.buildProgress < 1 || b.powered === false) continue;
      if (b.def.radar || b.def.radarQ) ears.push(b);
    }
    if (ears.length) for (const o of G.players) {
      if (o === owner || o.defeated || G.allied(owner, o)) continue;
      const heed = (e) => {
        const loud = ((e.def && (e.def.radar || e.def.jam)) || 0) * G.ESM_GAIN;
        if (!loud || !G.jamming(e)) return;
        for (const l of ears)
          if (U.dist(l.x, l.y, e.x, e.y) <= loud * CFG.TILE) { set.add(e.id); return; }
      };
      for (const u of o.units) if (!u.dead && !u.carried) heed(u);
      for (const b of o.buildings) if (!b.dead && b.buildProgress >= 1) heed(b);
    }
    ESM_PLOT[owner.idx] = { t: G.time, set: set };
    return set;
  };
  /* On our air picture at all? Two ways in and no third: we SEE it, or it is
     transmitting and somebody of ours HEARS it. Stated once so the routing and
     the shooting cannot drift apart. */
  G.airPlotKnows = function (owner, e) {
    if (!owner || !e || e.dead) return false;
    if (G.visibleTo(owner, e)) return true;
    const set = G.esmPlot(owner);
    return !!(set && set.has(e.id));
  };

  G.jamming = function (e) {
    if (!e || e.dead) return false;
    if (e.kind === "building") return e.buildProgress >= 1 && e.powered !== false;
    return G.emitting(e);
  };

  /* Jamming felt by one specific radar platform, taking the generational
     contest between that radar and each jammer into account.
     Units and structures are walked in two explicit loops rather than over a
     concatenation of the two arrays, for exactly the reason G.radarCovers()
     splits them: this runs once per radar per fog rebuild and again for every
     radar-laid shot, and allocating a throwaway array in here would be felt. */
  G.jamAgainst = function (victim, radarEnt) {
    const rd = radarEnt && radarEnt.def;
    let worst = 0;
    for (const o of G.players) {
      if (o === victim || G.allied(victim, o) || o.defeated) continue;
      const fac = FACTIONS[o.faction] || {};
      const ecm = fac.ecm || 1;
      for (const u of o.units) {
        if (u.dead || u.carried || !u.def.jam) continue;
        if (!G.emitting(u)) continue;                  // parked jammer is off
        const R = u.def.jam * CFG.TILE;
        const d = U.dist(u.x, u.y, radarEnt.x, radarEnt.y);
        if (d > R) continue;
        let k = (1 - d / R) * (u.def.jamPower || 1) * ecm;
        k *= genContest(rd, u.def);
        if (k > worst) worst = k;
      }
      /* ---- and the fixed sites ----
         Until now not one of the twenty-eight structures carried `jam`, and a
         building that did would have done nothing at all: both of these
         functions walked o.units and stopped. A jamming station cannot follow
         the battle and cannot be built within reach of anybody else's base -
         CFG.BUILD_RADIUS is 11 tiles from your own structures - so it never
         blinds an enemy radar dome sitting at home. What it does is deny the
         spectrum over YOUR ground: it burns down the picture of every radar
         platform that comes to you, which is the AEW aircraft, the radar
         vehicle and the Aegis hull offshore. */
      for (const b of o.buildings) {
        if (!b.def.jam) continue;                      // cheapest possible reject
        if (!G.jamming(b)) continue;                   // scaffolding, or no power
        const R = b.def.jam * CFG.TILE;
        const d = U.dist(b.x, b.y, radarEnt.x, radarEnt.y);
        if (d > R) continue;
        let k = (1 - d / R) * (b.def.jamPower || 1) * ecm;
        k *= genContest(rd, b.def);
        if (k > worst) worst = k;
      }
    }
    if (!worst) return 0;
    const vf = FACTIONS[victim.faction] || {};
    let eccm = vf.eccm || 1;
    if (victim.upgrades && victim.upgrades.eccm) eccm *= 1.55;
    return worst / eccm;
  };

  G.jamAt = function (victim, x, y) {
    let worst = 0;
    for (const o of G.players) {
      if (o === victim || G.allied(victim, o) || o.defeated) continue;
      const fac = FACTIONS[o.faction] || {};
      const ecm = fac.ecm || 1;
      for (const u of o.units) {
        if (u.dead || u.carried || !u.def.jam) continue;
        if (!G.emitting(u)) continue;                  // parked jammer is off
        const R = u.def.jam * CFG.TILE;
        const d = U.dist(u.x, u.y, x, y);
        if (d > R) continue;
        /* falls off toward the edge of the bubble */
        const k = (1 - d / R) * (u.def.jamPower || 1) * ecm;
        if (k > worst) worst = k;
      }
      /* This is where a fixed site earns its price. jamAt() is keyed on the
         SHOOTER's position, so a station standing in the middle of your own
         base degrades every radar-laid shot fired from inside its bubble - the
         tank column that has driven into your yard, the SPAAG hosing at your
         helicopters, the destroyer in your bay. */
      for (const b of o.buildings) {
        if (!b.def.jam) continue;
        if (!G.jamming(b)) continue;
        const R = b.def.jam * CFG.TILE;
        const d = U.dist(b.x, b.y, x, y);
        if (d > R) continue;
        const k = (1 - d / R) * (b.def.jamPower || 1) * ecm;
        if (k > worst) worst = k;
      }
    }
    if (!worst) return 0;
    const vf = FACTIONS[victim.faction] || {};
    /* national hardening, multiplied by whatever the commander has researched */
    let eccm = vf.eccm || 1;
    if (victim.upgrades && victim.upgrades.eccm) eccm *= 1.55;
    return worst / eccm;
  };

  /* ---- satellite navigation denial, which is a different war ----
     Jamming a radar and jamming GPS are not the same act and must not share a
     number. A radar jammer fights a transmitter that is looking for it and
     hopping to get away; a GPS jammer sits on a band that has not moved since
     1978 and shouts down a receiver listening for about a hundred attowatts
     from twenty thousand kilometres up. That is why the second is so much
     easier than the first, and why an army that cannot build a decent radar
     jammer can still close an adversary's airspace with one.

     Its own field, its own hardening term (FACTIONS.*.gpsHard - keyed military
     GPS and a null-steering antenna on the munition, not radar ECCM), and
     deliberately NOT multiplied by fac.ecm, which measures how good a nation's
     radar electronic attack is and has nothing to say about brute noise in a
     known band. Deliberately outside genContest too: a radar jammer goes stale
     because radars learn to hop, and the L1 band has not moved in fifty years.

     Same worst-bubble-never-the-sum rule as the other two, for the same
     physical reason: a receiver is denied by the loudest interferer over it. */
  G.gpsJamAt = function (victim, x, y) {
    let worst = 0;
    for (const o of G.players) {
      if (o === victim || G.allied(victim, o) || o.defeated) continue;
      for (const u of o.units) {
        if (u.dead || u.carried || !u.def.gpsJam) continue;
        if (!G.emitting(u)) continue;
        const R = u.def.gpsJam * CFG.TILE;
        const d = U.dist(u.x, u.y, x, y);
        if (d > R) continue;
        const k = (1 - d / R) * (u.def.gpsPower || 1);
        if (k > worst) worst = k;
      }
      for (const b of o.buildings) {
        if (!b.def.gpsJam) continue;
        if (!G.jamming(b)) continue;
        const R = b.def.gpsJam * CFG.TILE;
        const d = U.dist(b.x, b.y, x, y);
        if (d > R) continue;
        const k = (1 - d / R) * (b.def.gpsPower || 1);
        if (k > worst) worst = k;
      }
    }
    if (!worst) return 0;
    const vf = FACTIONS[victim.faction] || {};
    return worst / (vf.gpsHard || 1);
  };

  /* ---- strategic early warning: the ballistic back-plot ----
     A second sensor, not a bigger first one. G.radarCovers answers "can this
     side lay a shot into that square", and every consumer of that - fire
     control, the fog, the AI's target sweeps - would have inherited a
     thirty-tile bubble for free had this been folded into it. `ew` answers one
     narrow question, "was a BALLISTIC round fired from there", and
     G.updateCounterBattery is its only caller. It lifts no fog (G.recomputeFog
     reads def.radar), feeds no shooter (G.airTrack reads radarQ) and touches
     neither fcMul nor jamMul in combat.js.

     Two arrays cover the UNION of their circles. That is the opposite of a
     jammer, where G.jamAt takes the WORST bubble and a second set adds
     nothing - and it is not an inconsistency: coverage is a yes/no question
     and the answer is yes if any one array holds it, while jamming is a
     strength and two of them do not add.

     The early-out matters. updateCounterBattery runs every tick over up to
     sixty contacts times every player, and each call would otherwise be an
     O(buildings) scan that itself calls G.jamAgainst, which is O(players x
     units). Almost every player in almost every match owns no `ew` structure
     at all, and this returns false for them without touching a thing. */
  G.ewCovers = function (p, x, y) {
    if (!p || !p.buildings || !p.buildings.length) return false;
    for (const b of p.buildings) {
      if (!b.def.ew) continue;
      if (b.dead || b.buildProgress < 1 || !b.powered) continue;   // a dark array is a pyramid
      if (U.dist2(b.x, b.y, x, y) >= Math.pow(b.def.ew * CFG.TILE, 2)) continue;
      if (G.jamAgainst(p, b) > 0.55) continue;    // burned through, same 0.55 as every radar
      return true;
    }
    return false;
  };

  G.radarCovers = function (p, x, y) {
    /* Each radar is judged on its own: a modern set may still hold the picture
       through a bubble that has already blinded an older one beside it. */
    for (const u of p.units) {
      if (u.dead || u.carried || !u.def.radar) continue;
      if (!G.emitting(u)) continue;                    // parked radar is off
      if (U.dist2(u.x, u.y, x, y) >= Math.pow(u.def.radar * CFG.TILE, 2)) continue;
      if (G.jamAgainst(p, u) > 0.55) continue;          // this set is burned through
      return true;
    }
    for (const b of p.buildings) {
      if (b.dead || !b.def.radar || b.buildProgress < 1) continue;
      if (!b.powered) continue;
      if (U.dist2(b.x, b.y, x, y) >= Math.pow(b.def.radar * CFG.TILE, 2)) continue;
      if (G.jamAgainst(p, b) > 0.55) continue;
      return true;
    }
    return false;
  };

  /* ---------------- counter-battery ----------------
     Firing indirect gives your position away. Every arcing shot leaves a
     contact; a radar that covers it plots the firing point after a delay,
     with a little scatter. This is what makes shoot-and-scoot matter.     */
  G.cbContacts = [];
  /* `w` is the weapon that fired, and it is what separates a howitzer from a
     ballistic launcher. A counter-battery radar back-plots a shell; only a
     strategic early-warning array back-plots a boost-phase plume, and the two
     have to be told apart at the moment of firing. The test is exact rather
     than heuristic: rules.js records the invariant that the six srbm_* rounds
     are the only weapons in the game carrying indirect:true, and they are the
     only indirect rounds that fly as a missile rather than an arc. The
     argument is optional, so a one-argument call still works.

     A ballistic launch is plotted faster and held longer than a gun contact,
     and both numbers are earned. Faster, because the signature is a
     boost-phase plume rather than the acoustic and radar scraps of a shell.
     Longer, because the plot is only worth anything if something can reach the
     launcher: a TEL reloads in 55 to 95 seconds, so a fix arriving two seconds
     after launch and living for twenty-eight lands while the vehicle is still
     standing on its firing point. (Deploy time is NOT the argument - the
     modern launchers this will actually be plotting are out of their firing
     point in three to four and a half seconds. The reload is.) */
  G.reportIndirectFire = function (shooter, w) {
    if (!shooter || !shooter.owner) return;
    const ball = !!(w && w.indirect && w.proj === "missile");
    G.cbContacts.push({
      x: shooter.x, y: shooter.y, owner: shooter.owner,
      t: G.time, plotted: false, unit: shooter,
      ballistic: ball, wname: (w && w.name) || null,
      delay: ball ? 2.0 : 5.0,
      life:  ball ? 28.0 : 17.0,
    });
    /* The buffer used to evict the OLDEST contact whatever it was. Every arc
       round leaves a contact, so a gun line or a 240 mm rocket burst could
       push a two-second-old, not-yet-plotted ballistic contact out before
       updateCounterBattery ever reached it - silently deleting the one event
       this whole family exists to catch. Drop the oldest NON-ballistic one
       first, and only fall back to the plain shift if they are all ballistic. */
    if (G.cbContacts.length > 60) {
      let i = G.cbContacts.findIndex(c => !c.ballistic);
      G.cbContacts.splice(i >= 0 ? i : 0, 1);
    }
  };
  let lastBallisticBanner = -99;
  G.updateCounterBattery = function () {
    /* Defaults only. reportIndirectFire stamps a delay and a life on every
       contact now, because a gun battery and a ballistic launcher are not
       plotted on the same clock. These two are the fallback for a contact that
       arrived without them - an old save, or a one-argument caller. */
    const PLOT_DELAY = 5.0, LIFE = 17.0;
    for (let i = G.cbContacts.length - 1; i >= 0; i--) {
      const c = G.cbContacts[i];
      if (G.time - c.t > (c.life || LIFE)) { G.cbContacts.splice(i, 1); continue; }
      if (c.plotted || G.time - c.t < (c.delay || PLOT_DELAY)) continue;
      /* who has radar over the firing point? */
      for (const p of G.players) {
        if (p === c.owner || G.allied(p, c.owner) || p.defeated) continue;
        /* A gun battery is plotted by radar. A ballistic launch may ALSO be
           plotted by a strategic early-warning array, which is the only thing
           in the game that reaches past a radar dome's 22 tiles to the 24-31 a
           launcher shoots from. Artillery contacts are untouched: the `ew`
           circle does nothing whatsoever against a howitzer. */
        if (!G.radarCovers(p, c.x, c.y) &&
            !(c.ballistic && G.ewCovers && G.ewCovers(p, c.x, c.y))) continue;
        c.plotted = true;
        c.by = p;
        /* the plot is not perfect: scatter it by up to a tile. A back-plot
           from a boost-phase track is a better answer than one extrapolated
           from a shell in flight, so an array halves it. */
        const sc = c.ballistic ? 1.0 : 2.0;
        c.px = c.x + (G.rng() - 0.5) * CFG.TILE * sc;
        c.py = c.y + (G.rng() - 0.5) * CFG.TILE * sc;
        if (p === G.human) {
          if (c.ballistic) {
            /* Not "ENEMY GUNS LOCATED", which is what this said for every
               contact and is simply false for a Hwasong; and not
               Threat.reportLaunch either, whose subtitle reads "<name>
               INBOUND" - the round has already landed by the time this fires,
               and the name we hold is the launcher's, not the missile's.
               Rate-limited, because a present-day TEL duel reloads every 55 to
               95 seconds and a tier-3 banner every half minute for the rest of
               a match is not a warning, it is wallpaper. */
            G.alert("BALLISTIC LAUNCH BACK-PLOTTED", "good");
            if (typeof Threat !== "undefined" && Threat.fire &&
                G.time - lastBallisticBanner > 20) {
              lastBallisticBanner = G.time;
              Threat.fire(3, "BALLISTIC LAUNCH BACK-PLOTTED",
                          (c.wname || "LAUNCHER") .toUpperCase() + " SITE FIXED");
            }
          } else {
            G.alert("COUNTER-BATTERY PLOT \u2014 ENEMY GUNS LOCATED", "good");
          }
          G.pingEvent(c.px, c.py);
        }
        break;
      }
    }
  };
  /* fresh plots this player can shoot at */
  G.cbTargets = function (p) {
    /* the contact's own lifetime, not a repeated literal - a ballistic plot
       is held for 28 seconds because that is how long it takes to get
       something onto the launcher, and hard-coding 17 here silently threw
       eleven of them away. */
    return G.cbContacts.filter(c => c.plotted && c.by === p &&
                                    G.time - c.t < (c.life || 17));
  };

  /* ---------------- strategic weapons ---------------- */
  /* Area damage with falloff at a point on the map. One routine for every
     kind of off-map ordnance - a missile silo, an artillery mission, a
     bomber pass - so they all behave consistently and there is one place to
     change how a blast falls off. */
  G.areaStrike = function (wx, wy, dmg, aoeTiles, warhead, opts) {
    opts = opts || {};
    const w = { dmg, warhead: warhead || "he", aoe: aoeTiles,
                tgt: { ground: 1, air: 0, sea: 1, sub: 0 } };
    Combat.addEffect({ t: "boom", x: wx, y: wy,
      r: aoeTiles * CFG.TILE * (opts.nuke ? 1.1 : 0.8),
      life: opts.nuke ? 1.6 : 0.9, max: opts.nuke ? 1.6 : 0.9, nuke: !!opts.nuke });
    const R = aoeTiles * CFG.TILE;
    G.grid.query(wx, wy, R + 40, (e) => {
      /* aircraft in flight ride out a ground burst; ones on the ramp do not */
      if (e.dead || e.targetLayer() === "air") return;
      if (opts.owner && (e.owner === opts.owner || G.allied(opts.owner, e.owner))) {
        if (!opts.friendlyFire) return;
      }
      const d = U.dist(wx, wy, e.x, e.y) - (e.r || 8);
      if (d > R) return;
      const f = U.clamp(1 - Math.max(0, d) / R, 0, 1);
      Combat.applyDamage(G, e, dmg * (0.35 + 0.65 * f), w, null);
    });
    Sfx.play(opts.nuke || aoeTiles > 3 ? "explode_big" : "explode");
  };

  G.launchSuperweapon = function (b, wx, wy) {
    const sw = b.def.superweapon;
    if (!sw || b.swCharge < 1) return false;
    b.swCharge = 0;
    /* both sides are warned — there is no surprise nuclear strike */
    UI.alert(sw.alert + (b.owner === G.human ? " — OUTBOUND" : " — INBOUND"),
             b.owner === G.human ? "good" : "bad");
    if (typeof Threat !== "undefined") Threat.reportLaunch(sw.alert, b.owner === G.human);
    else Sfx.play("alarm");
    if (b.owner !== G.human) G.pingEvent(wx, wy);

    /* ---- something has to leave the silo ----
       A strategic launch was a banner, a klaxon and, sw.flight seconds later,
       a crater. The missile itself never existed: no round was created, no
       door opened, nothing climbed. The most expensive thing in the game went
       off with less to look at than a machine-gun burst.

       Deliberately COSMETIC. The damage model is the deferred areaStrike
       below and is untouched - a real projectile here would either double the
       damage or hand the layered interception in combat.js a round it was
       never balanced against, and a silently interceptable superweapon is a
       balance change, not an animation.

       Built from `boom` and `flash`, which are the only two effect kinds BOTH
       renderers draw (render3d.js:1369/1438, render.js:1086/1082) - `trail`
       is 2D-only and `turrettoss` is 3D-only, so neither would show for half
       the players. Effects carry no z, so height is baked into y the way
       combat.js already does it at :474 with `y: p.y - p.z`. */
    (function () {
      const cx = b.x, cy = b.y - 6;
      const eff = (typeof Combat !== "undefined" && Combat.addEffect)
        ? Combat.addEffect : null;
      if (!eff) return;
      /* ignition: the flame front under the missile, and the door */
      eff({ t: "flash", x: cx, y: cy, life: 0.5, max: 0.5, big: true, ang: -Math.PI / 2 });
      eff({ t: "boom", x: cx, y: cy + 4, r: 7, life: 0.9, max: 0.9 });
      /* the climb. Eleven puffs over 1.4s, rising and spreading - the round
         is out of sight long before the warhead arrives, which is right: a
         ballistic missile is visible for a few seconds and then it is weather. */
      for (let i = 0; i < 11; i++) {
        G.defer(0.09 * i, () => {
          const f = i / 10;
          eff({ t: "boom", x: cx + (i % 2 ? 2 : -2) * f, y: cy - 30 * f * f - 6 * f,
                r: 6 - 3.4 * f, life: 0.7 + 0.5 * f, max: 0.7 + 0.5 * f });
        });
      }
      /* the exhaust cloud the launch leaves sitting on the pad */
      for (let i = 0; i < 4; i++)
        G.defer(0.18 * i, () => eff({ t: "boom", x: cx + (i - 1.5) * 5, y: cy + 5,
                                      r: 5.5, life: 1.6, max: 1.6 }));
    })();
    G.defer(sw.flight, () => {
      const w = { dmg: sw.dmg, warhead: sw.warhead, aoe: sw.aoe, tgt: { ground: 1, air: 0, sea: 1, sub: 0 } };
      G.areaStrike(wx, wy, sw.dmg, sw.aoe, sw.warhead, { nuke: !!sw.nuke, friendlyFire: true });
      if (sw.nuke) {
        /* fallout: a second, weaker pulse a moment later */
        G.defer(1.2, () => {
          G.grid.query(wx, wy, sw.aoe * CFG.TILE, (e) => {
            if (e.dead || e.targetLayer() === "air") return;
            Combat.applyDamage(G, e, sw.dmg * 0.18, w, null);
          });
        });
      }
    });
    return true;
  };

  /* ---------------- off-map fire support ----------------
     Missions flown or fired from outside the map. They are paid for in fuel
     rather than cash, come on a cooldown, and arrive after a time of flight -
     so calling one is a commitment made ahead of the moment it lands. What
     the player can see determines how well it lands: a mission called onto
     ground your radar covers is accurate, one called into the dark scatters. */
  G.supportReady = function (p, key) {
    const m = SUPPORT[key];
    if (!m) return "NO SUCH MISSION";
    if (m.fac !== "both" && m.fac !== p.faction) return "NOT AVAILABLE";
    const pe = p.era || CUR_ERA;
    if (typeof inEra === "function" && !inEra(m, pe))
      return eraIndex(pe) < eraIndex(m.from || "e50") ? "NOT YET IN SERVICE" : "WITHDRAWN";
    if (m.tech && p.tech < m.tech) return "REQUIRES TECH " + m.tech;
    for (const rq of (m.prereq || []))
      if (!p.hasBuilding(rq)) return "REQUIRES " + BUILDINGS[rq].name.toUpperCase();
    if (p.oil < m.oil) return "INSUFFICIENT FUEL (" + Math.floor(p.oil) + "/" + m.oil + " bbl)";
    const until = (p.support && p.support[key]) || 0;
    if (G.time < until) return "READY IN " + Math.ceil(until - G.time) + "s";
    return null;
  };
  /* how far a mission scatters from the aimpoint, in pixels */
  G.supportScatter = function (p, key, wx, wy) {
    const m = SUPPORT[key];
    let mul = 1;
    if (G.radarCovers(p, wx, wy)) mul = 0.35;              // observed and plotted
    else if (!G.fogEnabled || G.fog[(wy / CFG.TILE | 0) * G.map.W + (wx / CFG.TILE | 0)] === 2)
      mul = 1.0;                                           // seen by eye
    else mul = m.blindMul !== undefined ? m.blindMul : 2.6; // called into the dark
    /* ---- satellite navigation denial at the AIMPOINT ----
       Measured where the round arrives, not where it was fired: what a GPS
       jammer attacks is the receiver in the munition on its terminal run, and
       the station standing over the target is the one that gets to do it. This
       is the answer to the mission that does not care whether you can see the
       target - the cruise missile with cep 0.35 and blindMul 1.1 that navigates
       itself onto a set of coordinates. Deny the coordinates and it is an
       unguided rocket with a long range. Nothing else in here touches an
       observed shot; this does, because eyes on the target do not put the
       satellites back. */
    const gps = G.gpsJamAt ? G.gpsJamAt(p, wx, wy) : 0;
    if (gps > 0.15) mul *= 1 + 2.2 * gps;
    return (m.cep || 1.2) * CFG.TILE * mul;
  };
  G.callFireSupport = function (p, key, wx, wy) {
    const why = G.supportReady(p, key);
    if (why) return why;
    const m = SUPPORT[key];
    p.spendOil(m.oil, "support");
    if (!p.support) p.support = {};
    p.support[key] = G.time + m.cooldown;
    const scatter = G.supportScatter(p, key, wx, wy);
    /* Jamming is invisible by nature and satellite denial is worse: without
       this line the defender's station never announces itself and the attacker
       reads a mission landing 200 metres off as bad luck. Both ends are told. */
    const gpsJ = G.gpsJamAt ? G.gpsJamAt(p, wx, wy) : 0;
    if (p === G.human) {
      G.alert(m.name.toUpperCase() + " \u2014 ROUNDS INBOUND", "good");
      if (gpsJ > 0.15)
        G.alert("SATELLITE NAVIGATION DENIED OVER TARGET \u2014 ROUNDS WILL SCATTER", "bad");
    } else if (gpsJ > 0.15 && G.human && !G.allied(p, G.human)) {
      G.alert("OUR JAMMING IS SPOILING THEIR PRECISION MISSION", "good");
    }
    if (p !== G.human)
      { G.alert(m.name.toUpperCase() + " \u2014 INBOUND", "bad"); G.pingEvent(wx, wy); }
    /* a mission is a number of impacts spread around the aimpoint, not a
       single explosion: a battery fires a pattern */
    const n = m.rounds || 1;
    for (let i = 0; i < n; i++) {
      const delay = m.flight + i * (m.spacing || 0.35);
      const ax = wx + (G.rng() - 0.5) * scatter * 2;
      const ay = wy + (G.rng() - 0.5) * scatter * 2;
      G.defer(delay, () => G.areaStrike(ax, ay, m.dmg, m.aoe, m.warhead,
        { owner: p, friendlyFire: !!m.friendlyFire }));
    }
    return null;
  };

  /* ---------------- alerts ---------------- */

  /* ---- acoustic signature ----
     A boat's own noise sets how far away a sonar can hear it. A 1950s Romeo
     is audible from four times the range of a modern Kilo sitting quiet, and
     a boat running hard is far louder than one creeping. */
  /* How long a boat stays localised after it shoots. A torpedo launch gives a
     bearing whoever fires it, but a noisy old diesel boat stays held far longer
     than a modern one that can slip away between reloads. */
  G.firedWindow = function (sub) {
    return U.clamp(4 * (sub.def.quiet !== undefined ? sub.def.quiet : 0.5) / 0.35, 3, 9);
  };
  G.justFired = function (sub) {
    return !!sub.recentlyFired && (G.time - sub.recentlyFired) < G.firedWindow(sub);
  };

  G.acousticOf = function (sub) {
    let q = sub.def.quiet !== undefined ? sub.def.quiet : 0.5;
    /* speed through the water is the single biggest term in radiated noise */
    if (sub.moving) q *= sub.def.nuclear ? 1.9 : 2.4;
    /* a diesel boat forced to snorkel is briefly very loud indeed */
    if (!sub.def.nuclear && !sub.def.aip && sub.fuelMax && sub.fuel < 25) q *= 2.2;
    /* having just fired gives the position away outright */
    /* Ordered to run silent. Speed through the water is the biggest term in
       radiated noise and the boat has already given up two thirds of it (see
       speedMul); this is the rest of the trade. It is the counter to a
       barrier that a player can actually find: a Kilo creeping at 0.24 x 0.70
       is heard by a node at 0.54 tiles while reading that node's own downlink
       at 1.8, so a careful boat can map a barrier without being fixed by it. */
    if (sub.stance === "quiet") q *= 0.70;
    if (G.justFired(sub)) q *= 6;
    return q;
  };

  /* submarine detection: sonar ships and aircraft, coastal sonar, or a firing
     wake. Detection range scales with the target's own radiated noise. */
  G.canSeeSub = function (p, sub) {
    if (sub.owner === p) return true;
    if (G.allied(sub.owner, p)) return true;
    if (G.justFired(sub)) return true;
    /* A laid acoustic barrier. This is a READ, not a search. SonarNet.update()
       does the one scan per tick, over submarines only - the sole class of
       object a node can hear at all - and stamps the answer on the boat as
       _netHold[playerIdx] = the time the fix expires. TWO nodes must hold the
       same boat at once for that stamp to exist, because a single
       omnidirectional hydrophone gives a datum and not a bearing, and the
       reach that produced it was scaled by the same Math.min(2.2, acousticOf)
       term the two loops below use. So the cost this feature adds to a
       function called once per weapon per candidate per tick by every
       acquiring hull, and once per entity per frame by both renderers, is one
       array lookup and one numeric compare. */
    if (sub._netHold && sub._netHold[p.idx] > G.time) return true;
    const q = G.acousticOf(sub);
    for (const u of p.units) {
      if (u.dead || !u.def.sonar) continue;
      /* a dipping sonar on a helicopter is the most effective sensor there is */
      const reach = u.def.sonar * (u.layer === "air" ? 1.15 : 1) * Math.min(2.2, q);
      if (U.dist(u.x, u.y, sub.x, sub.y) < reach * CFG.TILE) return true;
    }
    for (const b of p.buildings) {
      if (b.dead || !b.def.sonar) continue;
      if (U.dist(b.x, b.y, sub.x, sub.y) < b.def.sonar * Math.min(2.2, q) * CFG.TILE) return true;
    }
    return false;
  };
  /* Has this player's side ever overlooked this tile? The human has the fog
     array; an AI commander keeps its own explored map, and any player without a
     commander (the neutral owner, a human seat) is unrestricted exactly as
     before, so this can never change an existing behaviour by accident. */
  /* ================= AIR DEFENCE THREAT RINGS =================
     Real air planning starts by drawing the enemy's missile engagement zones
     on the chart and routing around them. Nothing in this engine did that: an
     aircraft flew at whatever it was pointed at and discovered the SAM by
     being shot down. Measured before this existed: an E-3 Sentry ordered to
     orbit over a Patriot flew to 0.4 tiles and died, and it carries no weapon
     at all - a 3,400-credit airframe whose entire job is to see.

     THE RING IS ONLY AS REAL AS THE OWNER'S PICTURE. Both tests below go
     through G.visibleTo, so a commander routes around the batteries it has
     actually seen and blunders into the ones it has not - the human off G.fog,
     an AI off its own look grid. Nobody gets a free plot of the other side's
     air defence, which is the whole point. */
  const AAREACH = {};
  G.airDefenceReach = function (def) {
    if (!def) return 0;
    const key = def.id || def.name;
    if (key && AAREACH[key] !== undefined) return AAREACH[key];
    let reach = 0;
    for (const wk of (def.weapons || [])) {
      const w = WEAPONS[wk];
      if (!w || !w.tgt || !w.tgt.air) continue;
      if (w.range > reach) reach = w.range;
    }
    if (key) AAREACH[key] = reach;
    return reach;
  };

  /* How deep inside somebody's air-defence envelope this point is, in tiles.
     0 means clear. Positive is the depth of penetration past the ring edge,
     so a caller can hold station just outside by pushing back that far. Only
     hostiles the owner can SEE are counted, and only ones that can actually
     reach the altitude band this aircraft flies in. */
  G.airThreatAt = function (owner, x, y, margin) {
    if (!owner) return 0;
    const m = margin || 0;                       // inflate every ring by this
    let worst = 0;
    for (const o of G.players) {
      if (o === owner || G.allied(owner, o) || o.defeated) continue;
      const scan = (list, isBld) => {
        for (const e of list) {
          if (e.dead || e.carried) continue;
          if (isBld && e.buildProgress < 1) continue;
          /* Plan against the catalogue figure with a buffer, the way a real
             threat ring is drawn. The published range is not what the battery
             actually reaches: weaponRange() multiplies by the owner's faction
             rangeMul (nato 1.08, roc 1.14) and again by 1.15 if they hold the
             optics upgrade, so a 14-tile site can engage at 17.4. An aircraft
             cannot know which upgrades an enemy bought, and should not be told
             - so it assumes the worst plausible case instead. */
          const reach = G.airDefenceReach(e.def) * 1.25;
          if (!reach) continue;
          if (!G.visibleTo(owner, e)) continue;      // not on our chart, not on our route
          const d = U.dist(x, y, e.x, e.y) / CFG.TILE;
          const deep = reach + m - d;
          if (deep > worst) worst = deep;
        }
      };
      scan(o.units, false);
      scan(o.buildings, true);
    }
    return worst;
  };

  /* The nearest point on the way to (tx,ty) that is NOT inside a ring the
     owner knows about, given a margin. Returns the original point when the
     route is clear, so the common case costs one airThreatAt call. Walks the
     approach back toward the aircraft rather than sideways: an orbit short of
     the threat is what an early-warning aircraft actually flies, and it keeps
     the geometry legible to a player watching it. */
  G.standoffPoint = function (owner, fx, fy, tx, ty, margin) {
    const m = margin === undefined ? 1.5 : margin;
    /* airThreatAt returns 0 when clear and a POSITIVE depth when inside, so the
       margin has to inflate the ring inside the test rather than be added to
       its result - added outside, a clear point scores 0 + 1.5 > 0 and every
       route in the game reads as threatened. That was the first cut of this
       function and it pinned an E-3 to its own runway. */
    if (!G.airThreatAt(owner, tx, ty, m)) return { x: tx, y: ty, held: false };
    const dx = tx - fx, dy = ty - fy;
    const len = Math.hypot(dx, dy);
    if (len < 1) return { x: fx, y: fy, held: true };
    /* Walk the approach back toward the aircraft in twentieths and take the
       furthest point that is clear, so the station is as far forward as the
       threat allows rather than merely somewhere safe. */
    for (let k = 0.95; k > 0.02; k -= 0.05) {
      const px = fx + dx * k, py = fy + dy * k;
      if (!G.airThreatAt(owner, px, py, m)) return { x: px, y: py, held: true };
    }
    /* Already inside somebody's envelope, and every point on the approach is
       too. Holding here is not good enough - the owner asked for aircraft that
       "try to avoid them as much as possible" - so egress: run directly away
       from the battery that has the deepest hold on us until the ring lets go.
       That is what a crew told they are being tracked actually does. */
    let bx = 0, by = 0, worstDeep = 0;
    for (const o of G.players) {
      if (o === owner || G.allied(owner, o) || o.defeated) continue;
      const scan = (list, isBld) => {
        for (const e of list) {
          if (e.dead || e.carried) continue;
          if (isBld && e.buildProgress < 1) continue;
          const reach = G.airDefenceReach(e.def) * 1.25;
          if (!reach || !G.visibleTo(owner, e)) continue;
          const deep = reach + m - U.dist(fx, fy, e.x, e.y) / CFG.TILE;
          if (deep > worstDeep) { worstDeep = deep; bx = e.x; by = e.y; }
        }
      };
      scan(o.units, false);
      scan(o.buildings, true);
    }
    if (worstDeep > 0) {
      const ax = fx - bx, ay = fy - by;
      const al = Math.hypot(ax, ay) || 1;
      const run = (worstDeep + 1) * CFG.TILE;
      return { x: fx + ax / al * run, y: fy + ay / al * run, held: true, egress: true };
    }
    return { x: fx, y: fy, held: true };
  };

  G.explored = function (p, i) {
    if (p === G.human) return !G.fogEnabled || G.fog[i] !== 0;
    const lk = (typeof AI !== "undefined" && AI.lookOf) ? AI.lookOf(p) : null;
    return lk ? lk[i] !== 0 : true;
  };
  G.visibleTo = function (p, e) {
    if (e.owner === p) return true;
    if (p === G.human) {
      if (!G.fogEnabled) return true;
      return G.fog[e.ty * G.map.W + e.tx] === 2;
    }
    /* AI: symmetric check against its own units' sight */
    for (const u of p.units) {
      if (u.dead) continue;
      if (U.dist2(u.x, u.y, e.x, e.y) < Math.pow(u.sightR() * CFG.TILE, 2)) return true;
    }
    for (const b of p.buildings) {
      if (b.dead) continue;
      if (U.dist2(b.x, b.y, e.x, e.y) < Math.pow(b.sightR() * CFG.TILE, 2)) return true;
    }
    return false;
  };

  /* ---------------- fog of war ---------------- */
  G.recomputeFog = function () {
    if (!G.fogEnabled) return;
    const map = G.map, fog = G.fog;
    for (let i = 0; i < fog.length; i++) if (fog[i] === 2) fog[i] = 1;
    const reveal = (cx, cy, r) => {
      const r2 = r * r;
      const x0 = Math.max(0, cx - r | 0), x1 = Math.min(map.W - 1, cx + r | 0);
      const y0 = Math.max(0, cy - r | 0), y1 = Math.min(map.H - 1, cy + r | 0);
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
        const dx = x - cx, dy = y - cy;
        if (dx * dx + dy * dy <= r2) fog[y * map.W + x] = 2;
      }
    };
    for (const u of G.human.units) if (!u.dead && !u.carried) reveal(u.tx, u.ty, u.sightR());
    for (const b of G.human.buildings) if (!b.dead) reveal(b.tx + b.def.w / 2, b.ty + b.def.h / 2, b.sightR());

    /* ---- radar lifts the fog ----
       A radar picture is the main reason to build a dome, keep an AEW aircraft
       up, or sail an Aegis ship forward: it shows you what is out there long
       before anything of yours can see it. Jamming is the counter - a radar
       sitting inside a hostile electronic-attack bubble has its reach cut
       down, and a strong enough bubble blinds it completely. */
    const radarReveal = (ent, cx, cy, r) => {
      if (!r) return;
      const jam = G.jamAgainst(G.human, ent);
      if (jam > 0.55) return;                       // burned through: no picture at all
      const eff = jam > 0.15 ? r * Math.max(0.15, 1 - jam) : r;
      reveal(cx, cy, eff);
    };
    /* ---- AND THE ROTODOME HAS TO BE TURNING ----
       (owner) "parked fighter/e2 should not have the rador or Jam since their
       electronic weapon does not open when landed."
       G.emitting() has said exactly this since it was written - "a radar
       aircraft shut down on its ramp has its rotodome stationary and its crew
       on the ground, it should not be lighting up half the map from inside the
       hangar" - and jamAt(), jamAgainst() and radarCovers() all ask it. THIS
       loop never did, so the one thing a parked E-3 or E-2 still did from the
       hangar was the biggest: lift the fog. Measured on a parked E-3G, radar
       34: emitting() false, and 34 tiles of map open anyway. */
    for (const u of G.human.units) {
      if (u.dead || u.carried || !u.def.radar) continue;
      if (!G.emitting(u)) continue;                   // shut down on the ramp
      radarReveal(u, u.tx, u.ty, u.def.radar);
    }
    /* ---- and the grid carries all of it ----
       A radar picture is the first thing a brownout costs you. The minimap has
       always known this - render.js:1461 tests powerRatio() and prints "RADAR
       OFFLINE - LOW POWER" across a dark panel - but the FOG did not, so the
       map stayed peeled open while the panel said the radar was down. The
       player was looking at two widgets contradicting each other.

       The `!b.powered` test below was there all along and did nothing, because
       powered is `!def.needPower || ratio >= 1` and the Radar Dome never
       declared needPower. The airbase and the AA battery did not either. So
       the test passed for exactly the structures it existed to stop.

       Gated on the ratio directly, so it covers every structure that lifts fog
       rather than only the ones that remembered to ask. What survives a
       brownout is what the units and buildings can SEE - sightR(), their own
       eyes - which is the honest picture and the one the AI has always been
       held to: Building.sightR() at entities.js:2483 is def.sight with no
       radar term at all, so an AI commander has never had radar-extended fog
       lifting in the first place. This closes that asymmetry in the one
       direction that was open. Vehicles keep their sets: a radar vehicle
       carries its own generator and is not on the base grid. */
    const gridUp = G.human.powerRatio() >= 1;
    for (const b of G.human.buildings) {
      if (b.dead || !b.def.radar || b.buildProgress < 1 || !b.powered) continue;
      if (!gridUp) continue;
      radarReveal(b, b.tx + b.def.w / 2, b.ty + b.def.h / 2, b.def.radar);
    }
  };

  /* ---------------- sorties ----------------
     Launching costs nothing. What constrains a mission is the airframe: a
     jet carries a finite amount of time on station and has to come home for
     fuel and ordnance. A helicopter is not on that clock. */
  G.sortieCost = function () { return 0; };
  /* how long this airframe can stay out, in seconds */
  G.enduranceOf = function (u) {
    /* Test the HOVER flag, not the jet flag - the same correction reserveFuel()
       already carries. A turboprop is not a helicopter: the AC-130 and the
       C-130 burn fuel and do have to land, but this line called them endless
       and printed an infinite endurance in the hangar tooltip for an aircraft
       that runs dry and falls out of the sky. */
    if (u.def.hover) return Infinity;
    const burn = u.airBurn ? u.airBurn() : CFG.FUEL_BURN_AIR;
    return burn > 0 ? u.fuelMax / burn : Infinity;
  };
  /* Launch one aircraft on an order. Returns a reason string on failure. */
  G.launchSortie = function (u, order) {
    if (!u || u.dead || u.layer !== "air") return "NOT AN AIRCRAFT";
    /* Do not sell the player a sortie the aircraft cannot fly. An air
       superiority fighter told to strike a tank would previously take off,
       charge the fuel, discover it carries nothing that can hit the ground,
       and come home - having achieved nothing and said nothing. */
    if (order && order.type === "attack" && order.target && !u.canTarget(order.target))
      return u.def.name.toUpperCase() + " CANNOT ENGAGE THAT TARGET";
    if (u.ammoMax && u.ammo <= 0.05) return "REARMING";
    if (u.fuel < u.reserveFuel()) return "REFUELLING";
    /* A tanker with an empty boom can fly, but it cannot do the one thing it
       is for. The hangar used to launch it anyway and the player got a "ready"
       tanker that refuelled nobody. */
    if (u.offloadMax && u.offload < u.offloadMax - 1) return "REPLENISHING";
    u.parked = false;
    u.give(order);
    return null;
  };

  G.alert = function (msg, cls, quiet) { UI.alert(msg, cls, quiet); };
  /* ---------------- recent events: what the minimap warns about ----------
     The old pingEvent kept exactly one position and no time, so it could say
     "something happened, over there" and nothing else. Three attacks at once
     collapsed into one point, and a ping from ten minutes ago looked as
     urgent as one from this second. It now keeps a short DATED list with a
     KIND, which is what the minimap marker and its audio grade off.

       "note"  a plot the player made or was told about - own fire mission,
               counter-battery fix, a strategic contact. Informational.
       "unit"  something of the player's is being shot at.
       "base"  a STRUCTURE of the player's is being shot at. Worse: buildings
               cannot withdraw and the ground they hold is the player's base.
       "loss"  a structure of the player's is gone - destroyed or captured.

     COST. This is reached from Combat.applyDamage, which in a battalion
     action runs several hundred times a second, so there is no sort, no
     filter and no allocation beyond the one event object: a push, and
     pruning that only ever looks at the head of the array. EV_MAX 12 caps
     the ring - a dozen markers is already more than anyone can read on a
     196px minimap - and EV_LIFE 6 is the longest any marker lives, so the
     array is a handful of entries even under sustained fire. */
  /* Each kind fades on its own clock, and the ring has to prune on the SAME
     clock or the two disagree. A flat six-second life meant a `unit` marker
     that stopped drawing at 2.5s went on holding a slot for another 3.5 -
     so in the one situation this feature exists for, a base assault with a
     dozen units and several structures under fire, the ring filled with
     invisible entries and evicted the `loss` markers that actually mattered.
     These must stay equal to EV_STYLE in render.js:1325. */
  const EV_LIFE = { note: 3.0, unit: 2.5, base: 4.0, loss: 6.0 };
  const EV_MAX = 12;
  G.eventLife = EV_LIFE;                     // render.js reads this to stay in step
  function evLife(k) { const v = EV_LIFE[k]; return v === undefined ? 3.0 : v; }
  /* Drop everything past its own life. Entries are in push order but their
     lives differ, so a stale one can sit behind a fresh one and this cannot
     be a shift-from-the-head loop any more. */
  function evPrune(ev, now) {
    let w = 0;
    for (let i = 0; i < ev.length; i++)
      if (now - ev[i].t <= evLife(ev[i].k)) ev[w++] = ev[i];
    ev.length = w;
  }
  G.pingEvent = function (x, y, kind) {
    G.eventX = x; G.eventY = y;              // legacy: the shift+space camera jump
    const ev = G.events || (G.events = []), now = G.time;
    evPrune(ev, now);
    /* Still full of live markers: give up the one with the least life left
       rather than the oldest, so a fading unit ping yields to a lost
       refinery instead of the other way round. */
    if (ev.length >= EV_MAX) {
      let worst = 0, least = Infinity;
      for (let i = 0; i < ev.length; i++) {
        const left = evLife(ev[i].k) - (now - ev[i].t);
        if (left < least) { least = left; worst = i; }
      }
      ev.splice(worst, 1);
    }
    ev.push({ x: x, y: y, t: now, k: kind || "note" });
  };
  /* what is still worth drawing, oldest first. The minimap is the only caller. */
  G.recentEvents = function () {
    const ev = G.events || (G.events = []), now = G.time;
    evPrune(ev, now);
    return ev;
  };

  /* ---------------- main tick ---------------- */
  G.tick = function (dt) {
    if (G.paused || G.over) return;
    G.time += dt;

    /* deferred fire callbacks */
    for (let i = G.deferred.length - 1; i >= 0; i--) {
      if (G.deferred[i].t <= G.time) {
        const d = G.deferred[i];
        G.deferred.splice(i, 1);
        d.fn();
      }
    }

    /* rebuild the spatial grid */
    G.grid.clear();
    /* Cargo inside a transport is off the board and must not be in the grid;
       a squad manning a building is emphatically on it, and has to be findable
       or nothing can ever shoot at it - which is what the garrison damage table
       in combat.js exists to resolve. */
    for (const e of G.entities)
      if (!e.dead && (!e.carried || e.garrisonIn)) G.grid.insert(e);

    /* ore regrowth from seed tiles */
    const map = G.map;
    if (((G.time * 10) | 0) % 10 === 0) {
      for (let i = 0; i < map.ore.length; i++) {
        if (map.oreSeed[i] && map.ore[i] < map.oreMax[i])
          map.ore[i] = Math.min(map.oreMax[i], map.ore[i] + CFG.ORE_REGROW);
      }
    }

    G.updateWeather(dt);
    if (typeof Threat !== "undefined") Threat.update(dt);
    G.updateCounterBattery();
    for (const p of G.players) {
      /* the standing budget - see CFG.BASE_INCOME. Every surviving commander,
         the same rate, no difficulty multiplier and no faction modifier: the
         point of it is that it favours nobody. */
      if (!p.defeated) p.earn(CFG.BASE_INCOME * dt);
      p.updateQueues(dt); p.updateEraAdvance(dt); p.updateFuelPurchase(dt);
    }
    for (const e of G.entities) e.update(dt);
    if (typeof Mines !== "undefined") Mines.update(G, dt);
    if (typeof SonarNet !== "undefined") SonarNet.update(G, dt);
    Combat.update(G, dt);
    AI.update(dt);

    /* sweep dead */
    for (let i = G.entities.length - 1; i >= 0; i--) {
      const e = G.entities[i];
      if (e.dead) {
        G.entities.splice(i, 1);
        const arr = e.kind === "unit" ? e.owner.units : e.owner.buildings;
        const j = arr.indexOf(e);
        if (j >= 0) arr.splice(j, 1);
      }
    }

    G.fogT -= dt;
    if (G.fogT <= 0) { G.fogT = CFG.FOG_UPDATE; G.recomputeFog(); }

    G.checkVictory();
  };

  G.checkVictory = function () {
    for (const p of G.players) {
      if (p.defeated) continue;
      const alive = p.buildings.some(b => !b.dead) ||
                    p.units.some(u => !u.dead && (u.def.deployTo || u.def.harvester));
      if (!alive) {
        p.defeated = true;
        if (p === G.human) G.alert("YOUR FORCES HAVE BEEN DESTROYED", "bad");
        else G.alert((p.label || "AI") + " ELIMINATED", "good");
      }
    }
    /* the war ends when only one team is left standing */
    const liveTeams = new Set();
    for (const p of G.players) if (!p.defeated) liveTeams.add(p.team);
    if (G.human.defeated) { G.over = true; UI.endGame(false); return; }
    if (liveTeams.size <= 1 && !G.over) { G.over = true; UI.endGame(true); }
  };

  return G;
})();
