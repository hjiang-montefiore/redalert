/* ============ gallery.js — the field manual ============
   A browsable record of everything the game can put on a battlefield: every
   unit of every army in every period, and every structure, shown with the
   model the battlefield itself will draw, the real designation and date,
   what it costs and what it needs, what it shoots - and, read off the same
   tables the guns read, what its rounds do to each class of armour and what
   class of round undoes it.

   Red Alert's database was a picture and a paragraph. This one can do more
   because almost nothing here is prose: CFG.DMG, the weapons' own `tgt`
   blocks and the UNITS/BUILDINGS rows ARE what combat.js reads, so a page
   that disagreed with the battlefield would be a bug rather than a typo. The
   one piece of prose - the record and the fact line - is the deployment
   briefing's, asked of LoadScreen rather than written a second time here.

   It is a READER, and that is a hard rule. It never ticks the game, never
   touches Game.paused and never changes a menu setting, so opening it from
   the pause menu and closing it again leaves the screen underneath exactly
   as it was.

   Every element it binds to is OPTIONAL. The panel builds itself into
   #gallery, or makes that element if the page has none, and the two ways in
   (#btn-gallery, #pm-gallery) are bound only where they exist - so a page
   carrying an older copy of the menu markup, which every harness page does,
   still starts a match and simply has no manual.                          */
var Gallery = (function () {
  /* The army order the deployment menu uses. Deliberately the same: a player
     who picked an army third in one list should find it third in the other.
     An army not named here is appended, so a new faction appears with no
     edit to this file. */
  const FAC_ORDER = ["nato", "gbr", "fra", "deu", "pact", "pla", "kpa", "roc"];

  /* The deployment briefing names most roles in plain words already, and
     asking it keeps one list rather than two that drift. It does NOT name
     the support roles, because a briefing card never deals one - these are
     the 110 machines (tankers, AEW, airlift, radar vehicles, supply, the
     rigs) that would otherwise show their raw table id in the list rail.
     Consulted only after LoadScreen has been asked. */
  const ROLE_WORD = {
    awacs: "Airborne early warning", cawacs: "Carrier-borne early warning",
    airlift: "Transport aircraft", tanker: "Aerial tanker",
    radarv: "Radar vehicle", supply: "Supply truck",
    transport_sea: "Landing ship", oiler: "Replenishment oiler",
    mcv: "Construction vehicle", harvester: "Ore hauler",
    repair: "Repair vehicle", repair_sea: "Repair ship",
    engineer: "Engineer", medic: "Medic",
  };
  /* ...and for a structure, which has no role at all: the class it is in,
     spelled as a word rather than as the table's own lowercase key. */
  const CAT_WORD = {
    building: "Structure", defense: "Defence", civilian: "Civilian structure",
    infantry: "Infantry", vehicle: "Vehicle", aircraft: "Aircraft", naval: "Vessel",
  };

  /* Plain words for CFG.ARMOR's six classes. The table's ids are shorthand
     for the people balancing it; "wall" on a record page reads as a typo. */
  const ARMOUR_WORD = {
    infantry: "Infantry", light: "Light armour", heavy: "Heavy armour",
    structure: "Structures", wall: "Barriers", air: "Aircraft",
  };
  /* ...and for CFG.DMG's warhead rows: what the round IS. */
  const WARHEAD_WORD = {
    bullet: "Ball and autocannon", cannon: "Kinetic penetrator", he: "High explosive",
    frag: "Artillery fragmentation", heat: "Shaped charge", flak: "Proximity-fused AA",
    nuclear: "Nuclear",
  };
  /* the four sets a weapon's `tgt` block can name */
  const TGT_WORD = { ground: "ground", air: "aircraft", sea: "surface ships", sub: "submerged" };
  const TGT_KEYS = ["ground", "air", "sea", "sub"];
  const TECH_NUM = ["", "I", "II", "III"];
  /* Every class the tables use, INCLUDING civilian - the map's blocks and
     rubble are things a player can shoot, and if they are in the manual at
     all they must be reachable by a filter, or the class counts do not add
     up to the "every class" count and two entries look mislaid. */
  const CATS = [
    ["", "Every class"],
    ["infantry", "Infantry"], ["vehicle", "Vehicles"], ["aircraft", "Aircraft"],
    ["naval", "Ships and submarines"], ["building", "Structures"], ["defense", "Defences"],
    ["civilian", "Civilian and scenery"],
  ];
  /* Every comparison bar in the manual is on ONE scale rather than
     normalised per record - otherwise a rifle's best row would look like a
     tank gun's. The scale is the largest figure in CFG.DMG, READ OFF the
     table rather than typed here, so a new warhead with a bigger number
     cannot quietly push four rows off the end of the bar. Worked out on
     first use: a page may load this file before config.js. */
  let barMax = 0;
  function barScale() {
    if (barMax) return barMax;
    barMax = 1;
    const T = (typeof CFG !== "undefined" && CFG.DMG) || {};
    for (const wh in T) for (const a in T[wh]) if (T[wh][a] > barMax) barMax = T[wh][a];
    return barMax;
  }

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s === undefined || s === null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const money = (n) => "$" + (typeof U !== "undefined" && U.fmt ? U.fmt(n) : String(n));
  const num = (n, d) => Number(n || 0).toFixed(d);
  function rgba(hex, a) {
    const n = parseInt(String(hex || "#6f9c46").slice(1), 16);
    return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
  }

  let root = null, built = false, shown = false;
  let restore = null;              // the screen to put back when we close
  let refocus = null;              // the element that had focus before we opened
  let ids = [], rowEls = [], sel = null;  // the filtered list, its rows, the entry on show
  let marked = -1;                 // which row currently wears the lime bar
  let rec = null;                  // the record object the panel last printed
  let anim = 0, lastT = 0, qTimer = 0;
  /* The turntable is made ONCE and kept: see paintPicture. standId/standCol
     are what it is currently showing, so walking the list with the arrow keys
     swaps a model instead of rebuilding a renderer. standDead latches when
     the borrowed turntable has thrown, the way loading.js's own glFailed
     does - one failure, not one per keypress. */
  let stand = null, standCv = null, standId = null, standCol = null, standDead = false;

  /* ---------------- reading the tables ---------------- */
  /* An entry is a unit id or a structure id; `kind` says which table to
     read. Structures are in because "everything in the game" has to include
     the SAM site that shoots the aircraft on the previous page. */
  function defOf(id, kind) {
    return kind === "unit" ? (typeof UNITS !== "undefined" && UNITS[id])
                           : (typeof BUILDINGS !== "undefined" && BUILDINGS[id]);
  }
  function factionName(f) {
    if (f === undefined || f === "both") return "Every army";
    return (typeof FACTIONS !== "undefined" && FACTIONS[f] && FACTIONS[f].short) || f;
  }
  /* The periods a row is actually fielded in, spelled with the SAME two
     defaults inEra() applies - an entry with no from/to is present-day only,
     which is not what "untagged" looks like from the outside. */
  function eraSpan(def) {
    if (typeof ERAS === "undefined") return "";
    const last = ERAS.length - 1;
    const fi = def.from !== undefined ? eraIndex(def.from) : last;
    const ti = def.to !== undefined ? eraIndex(def.to) : last;
    const nm = (i) => (ERA_INFO[ERAS[i]] && ERA_INFO[ERAS[i]].name) || ERAS[i];
    if (fi <= 0 && ti >= last) return "every period";
    return fi === ti ? nm(fi) : nm(fi) + " to " + nm(ti);
  }
  /* The briefing first, because its list is the one the deployment screen
     already shows the player; ROLE_WORD for the support roles it has no
     card for; then the class as a word. A raw table id is the last resort
     and should never be reached by anything in today's roster. */
  function roleWord(def) {
    if (typeof LoadScreen !== "undefined" && LoadScreen.roleTitle) {
      const t = LoadScreen.roleTitle(def.role);
      if (t) return t;
    }
    if (def.role && ROLE_WORD[def.role]) return ROLE_WORD[def.role];
    if (!def.role && CAT_WORD[def.cat]) return CAT_WORD[def.cat];
    return String(def.role || def.cat || "").replace(/_/g, " ");
  }
  function weaponsOf(def) {
    const out = [];
    for (const wid of def.weapons || []) {
      const W = typeof WEAPONS !== "undefined" ? WEAPONS[wid] : null;
      if (W) out.push(W);
    }
    return out;
  }

  /* ---------------- the filter ---------------- */
  function filter() {
    return {
      fac: ($("gal-fac") || {}).value || "",
      era: ($("gal-era") || {}).value || "",
      cat: ($("gal-cat") || {}).value || "",
      q: String(($("gal-q") || {}).value || "").trim().toLowerCase(),
    };
  }
  function matches(id, def, f) {
    if (f.cat && def.cat !== f.cat) return false;
    /* A structure with no `fac` belongs to every army, which is how
       Player.lockReason reads it; a unit's "both" says the same thing. */
    if (f.fac && def.fac !== undefined && def.fac !== "both" && def.fac !== f.fac) return false;
    if (f.era && typeof inEra === "function" && !inEra(def, f.era)) return false;
    if (f.q) {
      const F = (typeof FACTS !== "undefined" && FACTS[id]) || null;
      const hay = (id + " " + (def.name || "") + " " + (def.full || "") + " " +
                   ((F && F.name) || "") + " " + ((F && F.origin) || "") + " " +
                   roleWord(def)).toLowerCase();
      if (hay.indexOf(f.q) < 0) return false;
    }
    return true;
  }
  /* Everything the filter admits, ordered class then name, so the list reads
     like an inventory rather than like a hash table. */
  const CAT_ORDER = { infantry: 0, vehicle: 1, aircraft: 2, naval: 3, building: 4,
                      defense: 5, civilian: 6 };
  function collect(f) {
    const out = [];
    if (typeof UNITS !== "undefined")
      for (const id in UNITS) {
        const d = UNITS[id];
        if (d && matches(id, d, f)) out.push({ id: id, kind: "unit", def: d });
      }
    if (typeof BUILDINGS !== "undefined")
      for (const id in BUILDINGS) {
        const d = BUILDINGS[id];
        if (d && matches(id, d, f)) out.push({ id: id, kind: "building", def: d });
      }
    out.sort((a, b) => {
      const ca = CAT_ORDER[a.def.cat] === undefined ? 9 : CAT_ORDER[a.def.cat];
      const cb = CAT_ORDER[b.def.cat] === undefined ? 9 : CAT_ORDER[b.def.cat];
      if (ca !== cb) return ca - cb;
      const na = String(a.def.name || a.id), nb = String(b.def.name || b.id);
      if (na !== nb) return na < nb ? -1 : 1;
      return a.id < b.id ? -1 : 1;
    });
    return out;
  }

  /* ---------------- what it kills, and what kills it ----------------
     Both blocks are arithmetic over CFG.DMG and the weapons' own `tgt`
     blocks. Nothing here is an opinion about the machine: the opinion is
     already in the balance table, and this only reads it back out. */

  /* A weapon can put its warhead onto a class of armour only if its `tgt`
     block lets it engage something wearing that class. Aircraft wear `air`;
     everything else is reached by a weapon that can shoot at the ground or
     at surface ships, because a warship's plate is `heavy` or `light` too. */
  function reaches(W, armour) {
    if (!W || !W.tgt) return false;
    if (armour === "air") return !!W.tgt.air;
    return !!(W.tgt.ground || W.tgt.sea);
  }
  /* the best multiplier this armament can bring to each class of armour */
  function effect(def) {
    const ws = weaponsOf(def), out = [];
    for (const a of (CFG.ARMOR || [])) {
      let best = 0, by = null;
      for (const W of ws) {
        if (!reaches(W, a)) continue;
        const m = CFG.dmgMult(W.warhead, a);
        if (m > best) { best = m; by = W.warhead; }
      }
      out.push({ armour: a, word: ARMOUR_WORD[a] || a, mult: best, by: by });
    }
    return out;
  }
  /* ...and what every class of warhead does to ITS armour */
  function threat(def) {
    const a = def.armor || "structure", out = [];
    for (const wh in (CFG.DMG || {}))
      out.push({ warhead: wh, word: WARHEAD_WORD[wh] || wh, mult: CFG.dmgMult(wh, a) });
    out.sort((x, y) => y.mult - x.mult);
    return out;
  }
  /* What one weapon cycle of `W` is worth against armour class `armour`:
     listed damage times the burst times the hit chance times the warhead's
     multiplier, over the time the cycle takes. The same four numbers
     combat.js multiplies, arranged as a rate. */
  function cycleWorth(W, armour) {
    const cyc = Math.max(0.4, (W.reload || 1) + ((W.burst || 1) - 1) * (W.burstDelay || 0));
    return (W.dmg || 0) * (W.burst || 1) * (W.acc === undefined ? 1 : W.acc) *
           CFG.dmgMult(W.warhead, armour) / cyc;
  }
  /* The machines that actually carry the rounds that get through. Thinned to
     one entry per role, so the answer is five different ideas rather than
     four marks of the same tank, and to OTHER armies: "what kills it" is a
     question about the opposition. */
  function counters(id, kind, def, era) {
    if (typeof UNITS === "undefined" || typeof CFG === "undefined") return [];
    const armour = def.armor || "structure";
    const layer = kind === "unit" ? (def.layer || "ground") : "ground";
    const key = TGT_KEYS.indexOf(layer) >= 0 ? layer : "ground";
    /* With no period chosen, judge the entry in the last period it serves: a
       2020s interceptor is not an answer to a 1950s bomber. */
    const when = era || (typeof ERAS !== "undefined"
      ? ERAS[def.to !== undefined ? eraIndex(def.to) : ERAS.length - 1] : null);
    const best = {};
    for (const oid in UNITS) {
      const o = UNITS[oid];
      if (!o || oid === id || !o.weapons || !o.weapons.length) continue;
      if (def.fac && def.fac !== "both" && o.fac === def.fac) continue;
      if (when && typeof inEra === "function" && !inEra(o, when)) continue;
      let score = 0, bw = null;
      for (const W of weaponsOf(o)) {
        if (!W.tgt || !W.tgt[key] || !(W.dmg > 0)) continue;
        const s = cycleWorth(W, armour);
        if (s > score) { score = s; bw = W; }
      }
      if (score <= 0) continue;
      const slot = o.role || o.cat || oid;
      if (!best[slot] || best[slot].score < score)
        best[slot] = { id: oid, def: o, w: bw, score: score };
    }
    return Object.keys(best).map(k => best[k])
      .sort((a, b) => b.score - a.score).slice(0, 5);
  }

  /* ---------------- strong against, weak against ----------------
     (owner) "i take your suggestions and make it on 1,2,3 first." - step 3,
     idea 5 of that roadmap. With twelve hundred real machines nobody can
     remember that a ZSU-23-4's flak does x0.04 to a tank, and until now only
     this manual said so, three menus deep. matchup() says it in a handful of
     short rows for the build card and the selection panel (ui.js
     counterRows), and it lives HERE so there is one reading of the tables,
     not two that drift.
     Every term is the engine's own:
       reach   the weapon's tgt block against the layer the target is on, and
               softOnly - the two gates canTarget and pickWeapon apply
       warhead CFG.dmgMult; the ammoQ applyDamage multiplies in for cannon
               and heat against heavy or light plate; x0.35 for an
               anti-radiation round against anything not transmitting
       plate   Combat.resolveArmor ITSELF, asked about a shot from ahead,
               abeam and astern, so penetration is the engine's verdict and
               not a copy of it. Vehicles only, because resolveArmor returns
               null for infantry, structures, aircraft and ships - as in play
       floor   applyDamage drops a hit worth 0.5 or less, so a round that
               cannot clear it on its own "cannot hurt"; it is not "weak"
     The bands are the manual's own bars: x0.85 and up is STRONG, x0.40 up to
     that is FAIR, under x0.40 is WEAK.
     It is judged against the machines the OPPOSITION can field in ITS period
     - the enemies' armies and eras, and the lobby's service bans and tech
     ceilings on them, which the player set - and nothing a sighting would
     add. One plate for everybody was measured and is wrong: at e80 the
     in-era tank fronts run from 128 mm (ROC) to 503 mm (British), a median
     of 192, which would tell a NATO player that a round which bounces off
     every T-80U kills tanks head-on.
     Cached on (entry, army, opposition): the first card costs one pass over
     the roster, every later hover is a lookup. */
  const FOE = [
    { key: "inf",  word: "infantry",       layer: "ground", armour: "infantry", cat: "infantry" },
    { key: "lv",   word: "light vehicles", layer: "ground", armour: "light", veh: true, cat: "vehicle" },
    { key: "tank", word: "tanks",          layer: "ground", armour: "heavy", veh: true, cat: "vehicle" },
    { key: "bld",  word: "structures",     layer: "ground", armour: "structure", cat: "building" },
    { key: "air",  word: "aircraft",       layer: "air",    armour: "air", cat: "aircraft" },
    /* a patrol boat, corvette or missile boat wears light plate; a
       destroyer, cruiser or carrier heavy - and ninety-six hulls against
       eighty-three is too even a split to call "ships" one thing */
    { key: "boat", word: "light ships",    layer: "sea",    armour: "light", cat: "naval" },
    { key: "ship", word: "warships",       layer: "sea",    armour: "heavy", cat: "naval" },
    /* fifty-two of the sixty-six boats are attack submarines, in light plate */
    { key: "sub",  word: "submarines",     layer: "sub",    armour: "light", cat: "naval" },
  ];
  /* CFG.DMG's warhead rows in the words a card has room for. Every
     anti-aircraft round in WEAPONS is "flak" - the 40 mm battery, the
     Patriot, the Stinger AND the fighter's AIM-120 or cannon (77 of the 324
     air-reaching flak weapons ride on aircraft) - so what hurts an aircraft
     is split by what carries it: "flak and SAMs" alone would never tell a
     pilot that the other side's fighters are the thing to fear. */
  const ROUND_WORD = {
    bullet: "small arms", cannon: "kinetic rounds", he: "high explosive",
    frag: "artillery", heat: "shaped charges", flak: "flak and SAMs", nuclear: "nuclear",
    aa: "air-to-air weapons", arm: "anti-radiation missiles while transmitting",
  };
  const STRONG = 0.85, WEAK = 0.40;
  /* combat.js applyDamage: `if (dmg <= 0.5) return`, on a round that left
     the muzzle at w.dmg x VET_DMG[vet] - and a machine off the line is a
     rookie (entities.js: this.vet = 0), so the floor is judged at x0.88. A
     silo's missile and a mine have no shooter: their damage arrives raw. */
  const FLOOR = 0.5;
  const ROOKIE = () => (CFG.VET_DMG && CFG.VET_DMG[0]) || 1;
  /* the hull sits at 0,0 facing +x; the shot comes from ahead, abeam or
     astern, at the plates' own slopes (52, 14 and 10 degrees), which are all
     under RICO_ANGLE, so no ricochet is ever rolled and the stub never runs */
  const AHEAD = { x: 1, y: 0 }, ABEAM = { x: 0, y: 1 }, ASTERN = { x: -1, y: 0 };
  const ARCS = [["front", AHEAD], ["flank", ABEAM], ["rear", ASTERN]];
  const NO_ROLL = { rng: () => 1 };
  const MU = {}, ARMY = {};
  /* the median, and a true one: with two hulls it is the mean of both, not
     the thinner one. Measured with the upper value, five 1950s-60s guns
     read STRONG against tanks head-on while one of the opponent's only two
     tanks took under x0.40 (a T-34-85 against an M48 and an M103) */
  const med = (a) => {
    if (!a.length) return 0;
    a.sort((x, y) => x - y);
    const h = a.length >> 1;
    return a.length % 2 ? a[h] : (a[h - 1] + a[h]) / 2;
  };
  const fx = (m) => "×" + num(m, 2);

  /* What the machine has to hurt anything with: its weapons, and two things
     that are not in `weapons` and still kill. A silo's strike is the weapon
     game.js launchSuperweapon builds - its dmg and warhead, tgt ground and
     sea, no shooter. A minelayer's mine is Mines' own charge, which goes off
     under the hull (`belly`) and only under what Mines.threatens lets set it
     off; without these the Strategic Silo, whose card says it "erases
     everything inside nine tiles", printed UNARMED. */
  function armsOf(def) {
    const ws = weaponsOf(def).filter(W => W.dmg > 0);
    const sw = def.superweapon;
    if (sw && sw.dmg > 0)
      ws.push({ name: sw.label, dmg: sw.dmg, warhead: sw.warhead, raw: true,
                tgt: { ground: 1, air: 0, sea: 1, sub: 0 } });
    const M = typeof Mines !== "undefined" ? Mines : null;
    if (def.layMines && M && M.LAND && M.SEA && M.threatens) {
      const m = def.mineSea ? M.SEA : M.LAND, sea = !!def.mineSea;
      ws.push({ name: sea ? "Sea mine" : "Land mine", dmg: m.dmg, warhead: m.warhead,
                belly: !sea, raw: true, mine: { sea: sea },
                tgt: { ground: sea ? 0 : 1, air: 0, sea: sea ? 1 : 0, sub: 0 } });
    }
    return ws;
  }
  /* what the other side's round makes of this hull from one direction: the
     verdict object resolveArmor returns, or null where it does not apply */
  function plate(W, hull, hullFac, fac, from) {
    if (typeof Combat === "undefined" || !Combat.resolveArmor) return null;
    const F = (typeof FACTIONS !== "undefined" && FACTIONS[hullFac]) || {};
    const e = { kind: "unit", cat: hull.cat, armor: hull.armor, def: hull, x: 0, y: 0, ang: 0,
                maxHp: (hull.hp || 0) * (F.hpMul && hull.cat !== "infantry" ? F.hpMul : 1) };
    return Combat.resolveArmor(NO_ROLL, e, W,
      W.raw ? null : { x: from.x, y: from.y, owner: { faction: fac }, vet: 0 });
  }
  /* applyDamage's penetrator-quality term, for the army that fired it */
  function ammoQ(W, armour, fac) {
    const F = (typeof FACTIONS !== "undefined" && FACTIONS[fac]) || null;
    if (W.raw || !F || !F.ammoQ || (W.warhead !== "cannon" && W.warhead !== "heat")) return 1;
    return armour === "heavy" ? F.ammoQ : armour === "light" ? 1 + (F.ammoQ - 1) * 0.5 : 1;
  }
  const muzzle = (W) => W.dmg * (W.raw ? 1 : ROOKIE());
  /* The opposition: every armed machine and emplacement its armies can
     field in their period, each with the army that fires it, and their
     vehicles - the plates a round is judged against. "Can field" is
     Player.lockReason's pre-battle half, the half the lobby set and the
     player knows: the army, the period, the Services ban (no air force, no
     navy - on the class and on the airbase or naval yard a structure needs)
     and the tech ceiling. Measured before this, a SAM site facing a PACT
     told to fight on the ground alone still read "HURT BY anti-radiation
     missiles", which only its aircraft carry. */
  function armyKey(a) {
    const b = a.ban || {};
    return a.fac + "@" + (a.era || "") + (b.aircraft ? "!air" : "") + (b.naval ? "!sea" : "") +
           (a.cap && a.cap < 3 ? "/t" + a.cap : "");
  }
  function fields(def, a, memo) {
    if (def.fac !== undefined && def.fac !== "both" && def.fac !== a.fac) return false;
    if (a.era && typeof inEra === "function" && !inEra(def, a.era)) return false;
    const b = a.ban || {};
    if (def.cat && b[def.cat]) return false;
    if (a.cap && def.tech && def.tech > a.cap) return false;
    for (const rq of def.prereq || []) {
      if ((rq === "airbase" && b.aircraft) || (rq === "navalyard" && b.naval)) return false;
      if (memo[rq] === undefined) {
        memo[rq] = true;                     // a loop in the table lets a thing through
        const pb = typeof BUILDINGS !== "undefined" ? BUILDINGS[rq] : null;
        memo[rq] = !!pb && fields(pb, a, memo);
      }
      if (!memo[rq]) return false;
    }
    return true;
  }
  function army(list) {
    /* two commanders of one army in one period are one arsenal */
    const seen = {};
    list = list.filter(a => !seen[armyKey(a)] && (seen[armyKey(a)] = 1));
    const key = list.map(armyKey).sort().join(",");
    if (ARMY[key]) return ARMY[key];
    const guns = [], hulls = [];
    for (const a of list) {
      const memo = {};
      for (const id in (typeof UNITS !== "undefined" ? UNITS : {})) {
        const u = UNITS[id];
        if (!u || !fields(u, a, memo)) continue;
        if (u.cat === "vehicle" && (u.armor === "heavy" || u.armor === "light"))
          hulls.push({ def: u, fac: a.fac });
        for (const W of weaponsOf(u))
          if (W.dmg > 0 && W.tgt) guns.push({ w: W, fac: a.fac, air: u.layer === "air" });
      }
      for (const id in (typeof BUILDINGS !== "undefined" ? BUILDINGS : {})) {
        const b = BUILDINGS[id];
        if (!b || !b.weapons || !fields(b, a, memo)) continue;
        for (const W of weaponsOf(b)) if (W.dmg > 0 && W.tgt) guns.push({ w: W, fac: a.fac, air: false });
      }
    }
    return (ARMY[key] = { key: key, guns: guns, hulls: hulls });
  }
  /* One of our weapons against one class of target. For a vehicle class the
     figure is the median over the opposition's own hulls of that class, head
     on; `flank` says the median hull is holed clean through from the side.
     A round that cannot clear the floor head-on is not yet "cannot hurt":
     that is the one absolute word on the card, so every hull is asked from
     the flank and the rear too, and the least exposed arc that some hull
     can be hurt from is named instead - a 40 mm CTAS scratches a CM-11's
     rear plate, and 10 of 6,258 "cannot" claims said otherwise. */
  function against(W, c, fac, hulls) {
    if (!W || !(W.dmg > 0) || !W.tgt || !W.tgt[c.layer]) return null;
    if (W.softOnly && c.armour !== "infantry") return null;
    /* a mine is set off by weight, and Mines.threatens says whose; a
       structure never drives onto one */
    if (W.mine && (c.key === "bld" ||
        !Mines.threatens(W.mine, { layer: c.layer, cat: c.cat }))) return null;
    const m = CFG.dmgMult(W.warhead, c.armour) * ammoQ(W, c.armour, fac) *
              (W.antiRadiation ? 0.35 : 1);
    if (c.veh && CFG.PEN_WARHEADS[W.warhead]) {
      const fr = [], sd = [], arc = { front: 0, flank: 0, rear: 0 };
      for (const h of hulls) {
        if (h.def.armor !== c.armour) continue;
        const v = ARCS.map(([k, from]) => plate(W, h.def, h.fac, fac, from));
        fr.push(v[0] ? v[0].mul : 1);
        sd.push(!v[1] || v[1].verdict === "PENETRATION" ? 1 : 0);
        ARCS.forEach(([k], i) => { arc[k] = Math.max(arc[k], m * (v[i] ? v[i].mul : 1)); });
      }
      if (fr.length) {
        const f = med(fr);
        /* only a round that is strong once it is through can be "strong from
           the flank"; a hit is judged by the side it can come in from */
        const flank = f < 1 && m >= STRONG && med(sd) === 1;
        const hit = muzzle(W) * (flank ? m : m * f);
        if (hit > FLOOR) return { m: m * f, hit: hit, flank: flank, w: W };
        for (const k of ["flank", "rear"])
          if (muzzle(W) * arc[k] > FLOOR) return { m: arc[k], hit: muzzle(W) * arc[k], arc: k, w: W };
        return { m: m * f, hit: hit, flank: false, w: W };
      }
    }
    return { m: m, hit: muzzle(W) * m, flank: false, w: W };
  }
  /* a head-on figure is worth more than a figure from behind the target */
  const better = (v, best) => !best || (!v.arc !== !best.arc ? !v.arc : v.m > best.m);
  /* What the opposition's rounds do to THIS machine, by warhead: the median
     over every weapon of that warhead it fields that can reach this layer. */
  function threatsTo(def, kind, own, A) {
    const layer = kind === "unit" ? (def.layer || "ground") : "ground";
    const armour = def.armor || "structure";
    const hull = kind === "unit" && def.cat === "vehicle" && (armour === "heavy" || armour === "light");
    const emits = !!(def.radar || def.jam);
    const by = {};
    for (const g of A.guns) {
      const W = g.w;
      if (!W.tgt[layer] || (W.softOnly && armour !== "infantry")) continue;
      /* a HARM is held until it is ordered, and x0.35 on anything silent:
         it is not what hurts a machine with no transmitter, and pooled with
         the high explosive it would drag that row down */
      if (W.antiRadiation && !emits) continue;
      const t = CFG.dmgMult(W.warhead, armour) * ammoQ(W, armour, g.fac) * (W.antiRadiation ? 3.0 : 1);
      let m = t, side = 1, back = null;
      const wh = W.antiRadiation ? "arm" : (W.warhead === "flak" && g.air) ? "aa" : W.warhead;
      if (hull && CFG.PEN_WARHEADS[W.warhead]) {
        const v = ARCS.map(([k, from]) => plate(W, def, own, g.fac, from));
        m = t * (v[0] ? v[0].mul : 1);
        side = !v[1] || v[1].verdict === "PENETRATION" ? 1 : 0;
        /* the least exposed arc it CAN be hurt from, for the one line that
           would otherwise say nothing can */
        for (let i = 1; i < 3 && !back; i++) {
          const mm = t * (v[i] ? v[i].mul : 1);
          if (muzzle(W) * mm > FLOOR) back = { arc: ARCS[i][0], m: mm };
        }
      }
      if (muzzle(W) * m <= FLOOR) m = 0;
      const b = by[wh] || (by[wh] = { m: [], side: [], one: 0, back: null,
                                      table: CFG.dmgMult(W.warhead, armour) });
      b.m.push(m); b.side.push(side); b.one = Math.max(b.one, m);
      if (!m && back && (!b.back || (b.back.arc === back.arc ? back.m > b.back.m : back.arc === "flank")))
        b.back = back;
    }
    const out = [];
    for (const wh in by) {
      const m = med(by[wh].m);
      out.push({ warhead: wh, word: ROUND_WORD[wh] || wh, mult: m, one: by[wh].one, back: by[wh].back,
                 flank: hull && m < STRONG && by[wh].table >= STRONG && med(by[wh].side) === 1 });
    }
    return out.sort((x, y) => y.mult - x.mult || (x.word < y.word ? -1 : 1));
  }
  /* The verdict. `opts.fac` is the army that owns the machine (a structure or
     an "every army" unit has none of its own); `opts.vs` the opposition as
     [{fac, era, ban, cap}]. With no opposition given - the manual, outside a
     match - it is every other army in `opts.era`, else the last period it
     serves. */
  function matchup(id, kind, opts) {
    const def = defOf(id, kind);
    if (!def || typeof CFG === "undefined" || !CFG.DMG) return null;
    opts = opts || {};
    const fac = opts.fac || (def.fac !== undefined && def.fac !== "both" ? def.fac : "");
    let vs = (opts.vs || []).filter(a => a && a.fac);
    if (!vs.length) {
      const era = opts.era || (typeof ERAS !== "undefined"
        ? ERAS[def.to !== undefined ? eraIndex(def.to) : ERAS.length - 1] : "");
      vs = Object.keys(typeof FACTIONS !== "undefined" ? FACTIONS : {})
        .filter(f => f !== fac).map(f => ({ fac: f, era: era }));
    }
    const A = army(vs);
    const key = kind + ":" + id + "|" + fac + "|" + A.key;
    if (MU[key]) return MU[key];

    const ws = armsOf(def);
    /* The sea is on a card only where it is the job. A tank's gun does
       score x0.95 on a destroyer's plate, and a card that said so on every
       tank and every AT emplacement would bury the line their player needs;
       a warship, an aircraft and a structure the naval yard unlocks (or that
       stands on the shore) keep it. Submarines only where there is a way to
       reach one, or the boat is one. */
    const sea = def.cat === "naval" || def.layer === "air" ||
      (kind === "building" && (!!def.shore || (def.prereq || []).indexOf("navalyard") >= 0));
    const deep = def.cat === "naval" || ws.some(W => W.tgt && W.tgt.sub);
    const strong = [], weak = [], cannot = [], fair = [];
    for (const c of FOE) {
      if (c.layer === "sea" && !sea) continue;
      if (c.layer === "sub" && !deep) continue;
      let best = null;
      for (const W of ws) {
        const v = against(W, c, fac, A.hulls);
        if (v && v.hit > FLOOR && better(v, best)) best = v;
      }
      if (!best) { cannot.push(c); continue; }
      const e = { key: c.key, word: c.word, mult: best.m, arc: best.arc || "" };
      if (!best.arc && (best.m >= STRONG || best.flank)) { e.flank = best.m < STRONG; strong.push(e); }
      else if (best.m >= STRONG) strong.push(e);
      else if (best.m < WEAK) weak.push(e);
      else fair.push(e);
    }
    /* A HARM's reason to exist is a transmitter: x3.0 over the table, which
       on a radar site's concrete is the figure the SAM site's own card
       shows as what hurts it. */
    const arm = ws.filter(W => W.antiRadiation);
    if (arm.length) strong.unshift({ key: "radar", word: "radars",
      mult: Math.max.apply(null, arm.map(W => CFG.dmgMult(W.warhead, "structure") * 3.0)) });
    const hurt = threatsTo(def, kind, fac, A);

    const lines = [];
    const said = (e) => e.flank ? e.word + " from the flank"
                               : e.word + (e.arc ? " from the " + e.arc : "") + " " + fx(e.mult);
    if (ws.length) {
      if (strong.length) lines.push({ k: "STRONG VS", v: strong.map(said).join(" · "), cls: "s" });
      /* The middle band is named too. Left unsaid, a Virginia's card read
         "strong against infantry and structures" - its Tomahawk - and never
         mentioned the torpedo, x0.80 on a submarine, that is its job. Every
         class on the card is now in exactly one row. */
      if (fair.length) lines.push({ k: "FAIR VS", v: fair.map(said).join(" · "), cls: "f" });
      if (weak.length) lines.push({ k: "WEAK VS", v: weak.map(said).join(" · "), cls: "w" });
      /* named as classes where a whole domain is out of reach */
      let no = cannot.map(c => c.key);
      const words = [];
      if (["inf", "lv", "tank", "bld"].every(k => no.indexOf(k) >= 0)) {
        words.push("ground targets"); no = no.filter(k => ["inf", "lv", "tank", "bld"].indexOf(k) < 0);
      }
      if (no.indexOf("boat") >= 0 && no.indexOf("ship") >= 0) {
        no = no.filter(k => k !== "boat" && k !== "ship"); no.push("ships");
      }
      for (const k of no) {
        const c = FOE.filter(x => x.key === k)[0];
        words.push(c ? c.word : k);
      }
      if (words.length) lines.push({ k: "CANNOT HURT", v: words.join(" · "), cls: "n" });
    /* A unit with nothing to shoot is worth saying so - a transport, a
       tanker, an AWACS. Twenty-two base structures and a power plant are
       not: their card is about what hurts them. */
    } else if (kind === "unit") lines.push({ k: "UNARMED", v: "", cls: "n" });
    const top = hurt.filter(t => t.mult >= STRONG || t.flank).slice(0, 3);
    if (top.length) lines.push({ k: "HURT BY", v: top.map(said).join(" · "), cls: "h" });
    else if (hurt.length && hurt[0].mult > 0)
      lines.push({ k: "HURT BY", v: "at best " + said(hurt[0]), cls: "h" });
    else {
      /* "nothing" is absolute, so it is said only when not one of the
         opposition's weapons can hurt it from any arc: first the best
         single round head-on, then the least exposed arc one gets in from */
      const one = hurt.filter(t => t.one > 0).sort((x, y) => y.one - x.one)[0];
      const back = hurt.filter(t => t.back).sort((x, y) =>
        (x.back.arc === y.back.arc ? y.back.m - x.back.m : x.back.arc === "flank" ? -1 : 1))[0];
      lines.push({ k: "HURT BY", cls: "h", v: one ? "at best one " + said({ word: one.word, mult: one.one })
        : back ? "only " + said({ word: back.word, arc: back.back.arc, mult: back.back.m })
        : "nothing the opposition fields" });
    }

    return (MU[key] = { id: id, kind: kind, fac: fac, vs: A.key,
                        strong: strong, weak: weak, fair: fair, cannot: cannot.map(c => c.word),
                        hurt: hurt, lines: lines });
  }

  /* ---------------- the record ----------------
     One object, built from the tables, which the panel prints and the
     regression suite reads. There is no second path: what a test asserts
     about is literally what the page shows. */
  function recordFor(id, kind) {
    const def = defOf(id, kind);
    if (!def) return null;
    const F = (typeof FACTS !== "undefined" && FACTS[id]) || null;
    const said = (kind === "unit" && typeof LoadScreen !== "undefined" && LoadScreen.describe)
      ? LoadScreen.describe(id) : null;
    const arms = weaponsOf(def).map(W => {
      const cyc = Math.max(0.01, (W.reload || 1) + ((W.burst || 1) - 1) * (W.burstDelay || 0));
      const can = [], cannot = [];
      for (const k of TGT_KEYS) ((W.tgt && W.tgt[k]) ? can : cannot).push(TGT_WORD[k]);
      return {
        id: W.id || "", name: W.name || W.id || "weapon",
        dmg: W.dmg || 0, warhead: W.warhead || "", range: W.range || 0,
        minRange: W.minRange || 0, reload: W.reload || 0, burst: W.burst || 1,
        acc: W.acc === undefined ? 1 : W.acc, aoe: W.aoe || 0,
        intercept: !!W.intercept, can: can, cannot: cannot,
        rate: (W.dmg || 0) * (W.burst || 1) * (W.acc === undefined ? 1 : W.acc) / cyc,
      };
    });
    const seen = {}, blind = [];
    for (const a of arms) for (const w of a.can) seen[w] = 1;
    for (const k of TGT_KEYS) if (!seen[TGT_WORD[k]]) blind.push(TGT_WORD[k]);
    return {
      id: id, kind: kind, def: def,
      /* the designation FACTS carries, else the roster's own long name */
      name: (F && F.name) || (said && said.name) || def.full || def.name || id,
      shortName: def.name || id,
      origin: (F && F.origin) || def.origin || "",
      service: (F && F.service) || def.service || "",
      role: roleWord(def), cat: def.cat || "", fac: def.fac || "both",
      facName: factionName(def.fac), era: eraSpan(def),
      cost: def.cost || 0, oil: def.oil || 0, time: def.time || 0,
      hp: def.hp || 0, armour: def.armor || "", speed: def.speed || 0,
      sight: def.sight || 0, tech: def.tech || 1, power: def.power || 0,
      prereq: (def.prereq || []).map(p =>
        (typeof BUILDINGS !== "undefined" && BUILDINGS[p] && BUILDINGS[p].name) || p),
      weapons: arms, engages: Object.keys(seen), blind: blind,
      effect: effect(def), threat: threat(def),
      counters: counters(id, kind, def, filter().era),
      verdict: matchup(id, kind, { era: filter().era }),
      fact: (said && said.fact) || (F && F.note) || def.desc || "",
      /* Two different claims, and they are not interchangeable. FACTS'
         `confidence` grades the PUBLISHED FIGURES; a roster row's own grades
         how sure the roster is that this machine belongs in this slot. */
      conf: (F && F.confidence) || "",
      attrib: (!F && def.confidence) || "",
    };
  }

  /* ---------------- painting the record ---------------- */
  function bar(mult) {
    const w = Math.max(0, Math.min(100, (mult / barScale()) * 100));
    const cls = mult >= STRONG ? "hi" : mult >= WEAK ? "md" : "lo";
    return '<i class="gal-bar ' + cls + '"><b style="width:' + num(w, 1) + '%"></b></i>';
  }
  function statRow(k, v) {
    return '<div class="gal-stat"><span>' + esc(k) + "</span><b>" + esc(v) + "</b></div>";
  }
  function paintRecord(r) {
    const box = $("gal-rec");
    if (!box) return;
    if (!r) { box.innerHTML = '<div class="gal-empty">Nothing on this filter.</div>'; return; }
    const h = [];
    h.push('<div class="gal-head"><div class="gal-kicker">' +
      esc([r.facName, r.role, r.era].filter(Boolean).join(" · ")) +
      "</div><h3>" + esc(r.name) + "</h3>");
    const sub = [r.origin, r.service ? "in service " + r.service : ""].filter(Boolean);
    if (sub.length) h.push('<div class="gal-sub">' + esc(sub.join(" · ")) + "</div>");
    h.push("</div>");

    h.push('<div class="gal-stats">');
    h.push(statRow("Cost", r.cost ? money(r.cost) : "—"));
    if (r.oil) h.push(statRow("Fuel", r.oil + " bbl"));
    if (r.time) h.push(statRow("Build", num(r.time, 0) + " s"));
    if (r.power) h.push(statRow("Power", (r.power > 0 ? "+" : "") + r.power + " MW"));
    h.push(statRow("Hit points", r.hp || "—"));
    h.push(statRow("Armour", ARMOUR_WORD[r.armour] || r.armour || "—"));
    if (r.speed) h.push(statRow("Speed", num(r.speed, 2)));
    if (r.sight) h.push(statRow("Sight", num(r.sight, 1) + " tiles"));
    h.push(statRow("Tech", "Tech " + (TECH_NUM[r.tech] || r.tech)));
    h.push("</div>");
    if (r.prereq.length)
      h.push('<div class="gal-need"><span>Needs</span> ' + esc(r.prereq.join(" · ")) + "</div>");

    h.push("<h4>Armament</h4>");
    /* A silo's strike and a minelayer's mines are not in `weapons`, and
       "Unarmed." above a verdict saying they kill contradicted it. Both
       are printed from the fields the engine fires them with: the
       superweapon row game.js launches, and Mines' own charge. */
    const sw = r.def.superweapon, MN = typeof Mines !== "undefined" && Mines.LAND ? Mines : null;
    if (sw) h.push('<div class="gal-w"><div class="gal-wn">' + esc(sw.label) + "<em>" + esc(sw.warhead) +
      "</em></div>" + '<div class="gal-wd">' + esc(["anywhere on the map", sw.dmg + " over " + num(sw.aoe, 1) +
      " tiles", "charges in " + num(sw.charge, 0) + " s"].join(" · ")) + "</div></div>");
    if (r.def.layMines) {
      const m = MN ? (r.def.mineSea ? MN.SEA : MN.LAND) : null;
      h.push('<div class="gal-w"><div class="gal-wn">' + (r.def.mineSea ? "Sea mines" : "Land mines") +
        (m ? "<em>" + esc(m.warhead) + "</em>" : "") + "</div>" + '<div class="gal-wd">' +
        esc([r.def.layMines + " carried", m ? m.dmg + " each" : ""].filter(Boolean).join(" · ")) + "</div></div>");
    }
    if (!r.weapons.length && !sw && !r.def.layMines) h.push('<div class="gal-empty">Unarmed.</div>');
    for (const w of r.weapons) {
      const bits = ["range " + num(w.range, 1) + " tiles"];
      if (w.minRange) bits.push("blind inside " + num(w.minRange, 1));
      if (w.intercept) bits.push("interceptor — does no damage");
      else {
        bits.push(w.dmg + (w.burst > 1 ? " × " + w.burst : "") + " every " + num(w.reload, 1) + " s");
        bits.push(Math.round(w.acc * 100) + "% accurate");
      }
      if (w.aoe) bits.push("blast " + num(w.aoe, 1) + " tiles");
      h.push('<div class="gal-w"><div class="gal-wn">' + esc(w.name) +
        "<em>" + esc(w.warhead) + "</em></div>" +
        '<div class="gal-wd">' + esc(bits.join(" · ")) + "</div>" +
        '<div class="gal-wt">Engages ' + esc(w.can.join(", ") || "nothing") +
        (w.cannot.length ? " <s>" + esc(w.cannot.join(", ")) + "</s>" : "") + "</div></div>");
    }
    if (r.blind.length && r.weapons.length)
      h.push('<div class="gal-need"><span>Cannot engage</span> ' + esc(r.blind.join(" · ")) + "</div>");

    /* The build card's rows, word for word. They are the verdict - through
       the other side's plate, over the damage floor, in their period - and
       the two blocks of bars below are the damage table alone, before any
       of that; both are said on the page, because a rifle's x0.06 bar
       against heavy armour and "cannot hurt tanks" are both true and read
       like a contradiction when neither says which it is. "Cannot touch"
       became "Cannot engage" for the same reason: it is the tgt block,
       the domains no weapon aboard can aim at. An unarmed machine has
       said "Unarmed." under Armament already. */
    if (r.verdict) {
      const vs = r.verdict.lines.filter(l => l.k !== "UNARMED");
      if (vs.length) {
        h.push("<h4>Against the opposition <i>in period, through their plate</i></h4>");
        for (const l of vs)
          h.push('<div class="gal-need gal-vs ' + l.cls + '"><span>' +
                 esc(l.k.charAt(0) + l.k.slice(1).toLowerCase()) + "</span> " + esc(l.v) + "</div>");
      }
    }

    /* an unarmed machine has no rounds, and six empty rows saying so is
       noise; what kills it is still worth knowing, so that block stays */
    if (r.weapons.length) {
      h.push("<h4>What its rounds do <i>by the damage table, before plate</i></h4><div class=\"gal-cmp\">");
      for (const e of r.effect)
        h.push('<div class="gal-row"><span>' + esc(e.word) + "</span>" + bar(e.mult) +
          "<b>" + (e.mult ? "×" + num(e.mult, 2) : "—") + "</b></div>");
      h.push("</div>");
    }

    h.push("<h4>What gets through it <i>by the damage table, before plate</i></h4><div class=\"gal-cmp\">");
    for (const t of r.threat)
      h.push('<div class="gal-row"><span>' + esc(t.word) + "</span>" + bar(t.mult) +
        "<b>×" + num(t.mult, 2) + "</b></div>");
    h.push("</div>");

    if (r.counters.length) {
      h.push("<h4>Fielded against it</h4><ul class=\"gal-ct\">");
      for (const c of r.counters)
        h.push("<li><b>" + esc(c.def.name || c.id) + "</b><i>" + esc(factionName(c.def.fac)) +
          "</i><span>" + esc(c.w ? c.w.name : "") + "</span></li>");
      h.push("</ul>");
    }
    if (r.fact) h.push('<p class="gal-fact">' + esc(r.fact) + "</p>");
    const notes = [];
    if (r.conf && r.conf !== "high") notes.push("published figures: ~" + r.conf + " confidence");
    if (r.attrib && r.attrib !== "high") notes.push("roster attribution: " + r.attrib + " confidence");
    if (notes.length) h.push('<div class="gal-cf">' + esc(notes.join(" · ")) + "</div>");
    box.innerHTML = h.join("");
  }

  /* ---------------- the picture ----------------
     The deployment briefing's turntable, borrowed whole - same renderer,
     same colour fix, same fallback ladder. Where that module is not on the
     page the build menu's baked thumbnail is blitted instead, and where
     neither can be had the frame stays empty: a record without a picture is
     still a record. */
  function colourFor(fac) {
    if (typeof CFG === "undefined") return { main: "#6f9c46", dark: "#2b3d27" };
    return (CFG.FACTION_COLORS && CFG.FACTION_COLORS[fac]) ||
           (CFG.TEAM && CFG.TEAM[0]) || { main: "#6f9c46", dark: "#2b3d27" };
  }
  function dropStand() {
    if (stand) { try { stand.free(); } catch (e) {} }
    stand = null; standCv = null; standId = null; standCol = null;
  }
  /* The turntable is a WebGL context and a shader cache, so it is made ONCE
     and asked to swap models: show() already drops the old geometry and
     resets the slot. Freeing it per selection - which is what walking the
     list with an arrow key is - would dispose and re-create the renderer on
     every keypress, and repeated context loss is exactly how loading.js
     latches glFailed and loses the deployment briefing its models for the
     rest of the session. */
  function paintPicture(r) {
    const cv = $("gal-cv");
    if (!cv || !r) return;
    const col = colourFor(r.fac === "both" ? FAC_ORDER[0] : r.fac);
    const tag = $("gal-tag");
    if (tag) tag.textContent = r.facName + " · " + r.shortName;
    const pic = $("gal-pic");
    /* the plotting grid glows in the army's own map colour, as the briefing
       card's does */
    if (pic && pic.style && pic.style.setProperty)
      pic.style.setProperty("--glow", rgba(col.main, 0.22));
    if (stand && standCv !== cv) dropStand();   // the panel was rebuilt under us
    if (!standDead && !stand && typeof LoadScreen !== "undefined" && LoadScreen.stand) {
      try { stand = LoadScreen.stand(cv); standCv = cv; }
      catch (e) { stand = null; standCv = null; standDead = true; }
    }
    if (stand) {
      try {
        /* nothing to swap when the list re-paints on the same entry, which
           is what every keystroke in the search box does */
        if (r.id !== standId || col.main !== standCol) {
          stand.show(r.id, r.kind, col);
          standId = r.id; standCol = col.main;
        }
        stand.paint();
        return;
      } catch (e) { dropStand(); standDead = true; }
    }
    try {
      const im = (typeof Icons3D !== "undefined" && Icons3D.get)
        ? Icons3D.get(r.id, r.kind === "unit" ? "unit" : "building", col) : null;
      const ctx = cv.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, cv.width, cv.height);
      if (!im || !im.width) return;
      const s = Math.min(cv.width / im.width, cv.height / im.height);
      ctx.drawImage(im, (cv.width - im.width * s) / 2, (cv.height - im.height * s) / 2,
                    im.width * s, im.height * s);
    } catch (e) { /* the picture is decoration; the record stands without it */ }
  }
  function frame(t) {
    if (!shown) return;
    anim = requestAnimationFrame(frame);
    if (!stand) return;
    const dt = Math.min(0.1, Math.max(0, (t - lastT) / 1000));
    lastT = t;
    try { stand.turn(dt); stand.paint(); } catch (e) { dropStand(); standDead = true; }
  }

  /* ---------------- the list ---------------- */
  function paintList() {
    const box = $("gal-list");
    if (!box) return;
    const rows = collect(filter());
    ids = rows.map(r => r.id);
    rowEls = [];
    box.innerHTML = "";
    for (const r of rows) {
      const li = document.createElement("div");
      li.className = "gal-item";
      li.dataset.id = r.id;
      const nm = document.createElement("b");
      nm.textContent = r.def.name || r.id;
      const sub = document.createElement("i");
      sub.textContent = factionName(r.def.fac) + " · " + roleWord(r.def);
      const pr = document.createElement("span");
      pr.textContent = r.def.cost ? money(r.def.cost) : "";
      li.appendChild(nm); li.appendChild(sub); li.appendChild(pr);
      box.appendChild(li);
      rowEls.push(li);            // kept so marking the selection is one row, not all of them
    }
    const c = $("gal-count");
    if (c) c.textContent = rows.length + (rows.length === 1 ? " entry" : " entries");
    if (!rows.length) { sel = null; rec = null; marked = -1; paintRecord(null); dropStand(); return; }
    /* keep the entry on show if the new filter still admits it */
    marked = -1;
    select(ids.indexOf(sel) >= 0 ? sel : ids[0]);
  }
  /* Touching only the row that loses the lime bar and the row that gains it
     matters: on "every army / every period" the list is over a thousand rows
     and this runs on every arrow keypress. */
  function markSelected() {
    const i = ids.indexOf(sel);
    if (marked === i) return;
    const off = rowEls[marked];
    if (off && off.classList) off.classList.remove("on");
    marked = i;
    const on = rowEls[i];
    if (!on || !on.classList) return;
    on.classList.add("on");
    if (on.scrollIntoView) try { on.scrollIntoView({ block: "nearest" }); } catch (e) {}
  }
  function select(id) {
    if (!id) return false;
    const kind = (typeof UNITS !== "undefined" && UNITS[id]) ? "unit" : "building";
    const r = recordFor(id, kind);
    if (!r) return false;
    sel = id; rec = r;
    paintRecord(r);
    paintPicture(r);
    markSelected();
    return true;
  }
  function step(n) {
    if (!ids.length) return;
    const i = ids.indexOf(sel);
    select(ids[Math.max(0, Math.min(ids.length - 1, (i < 0 ? 0 : i) + n))]);
  }

  /* ---------------- the frame ---------------- */
  const MARKUP =
    '<div class="gal-box">' +
      '<header class="gal-top">' +
        '<div><div class="gal-kicker">Field manual</div>' +
        "<h2>EQUIPMENT <span>RECORD</span></h2></div>" +
        '<button id="gal-close" type="button">CLOSE</button>' +
      "</header>" +
      '<div class="gal-body">' +
        '<div class="gal-side">' +
          '<div class="row"><label>Army</label><select id="gal-fac"></select></div>' +
          '<div class="row"><label>Period</label><select id="gal-era"></select></div>' +
          '<div class="row"><label>Class</label><select id="gal-cat"></select></div>' +
          '<div class="row"><label>Search</label><input id="gal-q" type="text" placeholder="name or designation"></div>' +
          '<div class="gal-count" id="gal-count"></div>' +
          '<div class="gal-keys">↑↓ move through the list · Esc closes</div>' +
        "</div>" +
        '<div class="gal-list" id="gal-list"></div>' +
        '<div class="gal-pane">' +
          '<div class="gal-pic" id="gal-pic"><canvas id="gal-cv"></canvas>' +
            '<span class="gal-tag" id="gal-tag"></span></div>' +
          '<div class="gal-rec" id="gal-rec"></div>' +
        "</div>" +
      "</div>" +
    "</div>";

  function fillSelect(id, pairs) {
    const s = $(id);
    if (!s) return;
    s.innerHTML = pairs.map(p =>
      '<option value="' + esc(p[0]) + '">' + esc(p[1]) + "</option>").join("");
  }
  function raise() {
    if (built) return !!root;
    /* The latch goes AFTER the guard, not before it: a raise() that could
       not build because the body is not there yet must be retried on the
       next open(), not remembered as a permanent failure. */
    if (typeof document === "undefined" || !document.body) return false;
    built = true;
    root = $("gallery");
    if (!root) {
      /* a page that carries no #gallery still gets one, so the manual is
         never a reason for a page to be edited - and it is the same modal
         the page in index.html declares, down to the aria */
      root = document.createElement("div");
      root.id = "gallery";
      root.setAttribute("role", "dialog");
      root.setAttribute("aria-modal", "true");
      root.setAttribute("aria-label", "Field manual");
      root.setAttribute("tabindex", "-1");
      document.body.appendChild(root);
    }
    root.classList.add("hidden");
    root.innerHTML = MARKUP;

    const facs = [["", "Every army"]];
    if (typeof FACTIONS !== "undefined") {
      const keys = FAC_ORDER.filter(k => FACTIONS[k])
        .concat(Object.keys(FACTIONS).filter(k => FAC_ORDER.indexOf(k) < 0));
      for (const k of keys) facs.push([k, FACTIONS[k].name]);
    }
    fillSelect("gal-fac", facs);
    const eras = [["", "Every period"]];
    if (typeof ERAS !== "undefined")
      for (const k of ERAS) eras.push([k, ERA_INFO[k].name + " — " + ERA_INFO[k].full]);
    fillSelect("gal-era", eras);
    fillSelect("gal-cat", CATS);

    const on = (id, type, fn) => { const el = $(id); if (el) el.addEventListener(type, fn); };
    on("gal-fac", "change", paintList);
    on("gal-era", "change", paintList);
    on("gal-cat", "change", paintList);
    /* The search box rebuilds the whole list, and on "every army / every
       period" that is over a thousand rows. A keystroke should not pay for
       the list the PREVIOUS keystroke would have shown, so the rebuild
       waits for a gap in the typing. A dropdown is one event and stays
       immediate. */
    on("gal-q", "input", () => {
      clearTimeout(qTimer);
      qTimer = setTimeout(() => { qTimer = 0; if (shown) paintList(); }, 120);
    });
    on("gal-close", "click", close);
    on("gal-list", "click", (e) => {
      let n = e.target;
      for (let i = 0; n && i < 4; i++) {
        if (n.dataset && n.dataset.id) { select(n.dataset.id); return; }
        n = n.parentNode;
      }
    });
    /* the backdrop closes; the panel does not */
    root.addEventListener("click", (e) => { if (e.target === root) close(); });
    return true;
  }

  /* Nothing behind the manual hears a key while it is up - exactly as the
     deployment briefing does it (see onKey in loading.js), and for the same
     reason: otherwise Esc would close this AND open the pause menu behind
     it, typing "s" into the search box would stop every unit the player had
     selected, and Ctrl+4 would quietly rewrite control group 4 under a modal
     the player is reading. So propagation is stopped FIRST, for every key;
     only then are the browser's own chords (Ctrl/Cmd/Alt, the function keys)
     handed back by leaving their default action alone. Stopping propagation
     is not preventDefault, so the search box still types; only a key the
     manual itself acted on is preventDefault'ed. */
  function onKey(e) {
    if (!shown) return;
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    if (e.ctrlKey || e.metaKey || e.altKey || /^F\d+$/.test(e.key || "")) return;
    if (key(e) && e.preventDefault) e.preventDefault();
  }
  /* Tab must stay inside a modal, and querying the panel for what is
     focusable does not work on a page whose DOM stand-in never parsed the
     markup - so the ring is the panel's own controls, named. */
  const FOCUS_RING = ["gal-fac", "gal-era", "gal-cat", "gal-q", "gal-close"];
  let focusAt = -1;                // -1 = the panel itself, as it is on opening
  function focusTo(i) {
    const r = FOCUS_RING.filter(id => $(id));
    if (!r.length) return "";
    focusAt = ((i % r.length) + r.length) % r.length;
    const el = $(r[focusAt]);
    if (el && el.focus) try { el.focus({ preventScroll: true }); } catch (e) {}
    return r[focusAt];
  }
  /* The handler itself, public so the regression suite can press a key
     without a window to dispatch it into. True when it acted. */
  function key(e) {
    if (!shown || !e) return false;
    const k = e.key, typing = !!(e.target && e.target.id === "gal-q");
    if (k === "Escape") { close(); return true; }
    if (k === "Tab") { focusTo(focusAt + (e.shiftKey ? -1 : 1)); return true; }
    if (typing && k !== "ArrowDown" && k !== "ArrowUp") return false;
    if (k === "ArrowDown") { step(1); return true; }
    if (k === "ArrowUp") { step(-1); return true; }
    if (k === "PageDown") { step(10); return true; }
    if (k === "PageUp") { step(-10); return true; }
    if (k === "Home") { if (ids.length) select(ids[0]); return true; }
    if (k === "End") { if (ids.length) select(ids[ids.length - 1]); return true; }
    return false;
  }

  /* ---- open and close ----
     `from` names the screen to put back. The game is not touched: no tick,
     no pause, no unpause. A match frozen behind this stays frozen, and the
     manual is not the thing that decided either way. */
  function open(from) {
    if (shown) return true;
    if (!raise() || !root) return false;
    restore = null;
    if (from === "pause") {
      const pm = $("pausemenu");
      if (pm && pm.classList && !pm.classList.contains("hidden")) {
        pm.classList.add("hidden");
        restore = pm;
      }
    }
    shown = true;
    root.classList.remove("hidden");
    /* A modal takes the focus, or Space re-fires the button underneath it
       and Tab walks the menu behind. Where it was is remembered and given
       back on close, so the player's place on the screen survives a lookup.
       Same two lines the deployment briefing uses. */
    refocus = (typeof document !== "undefined" && document.activeElement) || null;
    if (refocus && refocus.blur) try { refocus.blur(); } catch (e) {}
    focusAt = -1;
    if (root.focus) try { root.focus({ preventScroll: true }); } catch (e) {}
    /* Open on the army and the decade the player is already thinking about -
       but only the first time, or a filter they set here would be undone
       every time they looked something up. */
    if (!sel) {
      const fs = $("gal-fac"), mf = $("opt-fac");
      const es = $("gal-era"), me = $("opt-era");
      if (fs && mf && mf.value) fs.value = mf.value;
      if (es && me && me.value) es.value = me.value;
    }
    paintList();
    if (typeof window !== "undefined" && window.addEventListener)
      window.addEventListener("keydown", onKey, true);
    lastT = typeof performance !== "undefined" ? performance.now() : 0;
    anim = requestAnimationFrame(frame);
    return true;
  }
  function close() {
    if (!shown) return;
    shown = false;
    cancelAnimationFrame(anim);
    anim = 0;
    clearTimeout(qTimer); qTimer = 0;
    /* The context goes back when the manual does - the battle behind it
       wants it. standDead is cleared with it: whatever went wrong belonged
       to that renderer, and the next opening deserves its own try. */
    dropStand();
    standDead = false;
    if (typeof window !== "undefined" && window.removeEventListener)
      window.removeEventListener("keydown", onKey, true);
    if (root) root.classList.add("hidden");
    if (restore && restore.classList) restore.classList.remove("hidden");
    restore = null;
    if (refocus && refocus.focus) try { refocus.focus({ preventScroll: true }); } catch (e) {}
    refocus = null;
  }

  /* The two ways in, both optional: a page with neither button simply has no
     manual, which is what every harness page gets. */
  function boot() {
    raise();
    const m = $("btn-gallery");
    if (m) m.addEventListener("click", (e) => { if (e.preventDefault) e.preventDefault(); open("menu"); });
    const p = $("pm-gallery");
    if (p) p.addEventListener("click", (e) => { if (e.preventDefault) e.preventDefault(); open("pause"); });
  }
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
  }

  return {
    open: open, close: close, key: key, select: select, recordFor: recordFor,
    matchup: matchup,
    isOpen: () => shown,
    /* what the list is showing, and the record the panel printed - the same
       objects the page is built from, not a second calculation, so a test
       that reads them is reading the page */
    entries: () => ids.slice(),
    record: () => rec,
    /* where Tab has left the focus, so a test can prove the ring stays
       inside the panel rather than walking the menu behind it */
    focusId: () => (focusAt < 0 ? "" : (FOCUS_RING.filter(id => $(id))[focusAt] || "")),
  };
})();
