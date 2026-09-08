/* ============ save.js — save, resume and quit ============
   The world is rebuilt deterministically from the map seed, so a save only
   has to carry what diverged from that: player economies and queues, every
   entity, the ore that has been mined, and the fog you have uncovered.     */
var SaveGame = (function () {
  const KEY = "ironfront.save.v1";
  const AUTO = "ironfront.auto.v1";

  /* ---------- write ---------- */
  function snapshot(G) {
    const map = G.map;
    /* ore is a big float array: store only tiles that changed from full */
    const oreDelta = [];
    for (let i = 0; i < map.ore.length; i++) {
      if (Math.abs(map.ore[i] - map.oreMax[i] / 1.35) > 1) oreDelta.push(i, Math.round(map.ore[i]));
    }
    return {
      v: 1,
      savedAt: new Date().toISOString(),
      opts: G.opts,
      time: G.time,
      /* weather is part of the tactical situation, not cosmetic: reloading
         into clear skies from a sandstorm would change the fight */
      wx: G.weatherKey, wxLock: G.weatherLock, wxT: G.weatherT,
      startOrder: G.startOrder,
      speed: G.speed,
      fog: G.fogEnabled ? btoaBytes(G.fog) : null,
      oreDelta,
      oilTaken: map.oilNodes.map(n => (n.taken ? 1 : 0)),
      /* Neither of these is an entity and neither was in this snapshot at all,
         so a save and reload silently destroyed every minefield on the map and
         silently refilled every minelayer. A barrier would have inherited that
         and been worse: a player does not SEE a barrier vanish, they just stop
         being told about submarines. Owners and seen lists travel as player
         INDICES - a raw seen array holds Player objects and does not survive
         JSON - and the id counters come back with the arrays. */
      mines: (typeof Mines !== "undefined" && Mines.snapshot) ? Mines.snapshot(G) : [],
      net: (typeof SonarNet !== "undefined") ? SonarNet.snapshot(G) : [],
      players: G.players.map(p => ({
        idx: p.idx, faction: p.faction, isAI: p.isAI, team: p.team,
        diff: p.diff, personality: p.personality, handicap: p.handicap, label: p.label,
        cash: Math.round(p.cash), oil: Math.round(p.oil), tech: p.tech,
        sup: p.support || {},
        upgrades: Object.assign({}, p.upgrades),
        banned: Object.assign({}, p.banned),
        defeated: p.defeated,
        stats: Object.assign({}, p.stats),
        homeX: p.homeX, homeY: p.homeY,
        queues: serializeQueues(p.queues),
      })),
      units: G.entities.filter(e => e.kind === "unit" && !e.dead).map(u => ({
        d: u.def.id, o: u.owner.idx, x: Math.round(u.x), y: Math.round(u.y),
        a: +u.ang.toFixed(3), ta: +u.tang.toFixed(3),
        hp: Math.round(u.hp), vet: u.vet, xp: Math.round(u.xp || 0),
        fuel: Math.round(u.fuel), ammo: +(u.ammo || 0).toFixed(2),
        sup: Math.round(u.supplyLeft || 0), load: Math.round(u.load || 0),
        st: u.stance, ord: liteOrder(u.order), pk: u.parked ? 1 : 0,
        mg: u.mag ? u.mag : undefined,
        mn: u.minesMax ? u.mines : undefined,
        nt: u.netMax ? u.net : undefined,
      })),
      buildings: G.entities.filter(e => e.kind === "building" && !e.dead).map(b => ({
        d: b.def.id, o: b.owner.idx, tx: b.tx, ty: b.ty,
        hp: Math.round(b.hp), prog: +b.buildProgress.toFixed(3),
        rep: !!b.repairing, sw: +(b.swCharge || 0).toFixed(3),
        ta: +(b.tang || 0).toFixed(3),
        rx: Math.round(b.rally.x), ry: Math.round(b.rally.y),
      })),
    };
  }
  /* orders are kept simple: positions survive, live target objects do not */
  function liteOrder(o) {
    if (!o) return { type: "idle" };
    if (o.type === "attack" || o.type === "enter") {
      /* re-acquire on load rather than trying to rebuild object identity.
         An aircraft pulled off a patrol to intercept goes back to the patrol
         rather than losing the mission entirely. */
      if (o.cap && o.resume) return { type: "cap", x: Math.round(o.resume.x), y: Math.round(o.resume.y) };
      return o.resume ? { type: "attackmove", x: o.resume.x, y: o.resume.y } : { type: "idle" };
    }
    /* An area order is four corners and no x/y, so it used to come back as a
       bare type with nothing to work on and the vehicle stood there. The
       lattice and the place in it are dropped deliberately: both rebuild from
       the corners, and the already-covered test skips every point that was
       finished before the save. */
    if (o.type === "autolay" || o.type === "autosweep") {
      if (!isFinite(o.x0)) return { type: "idle" };
      return { type: o.type, x0: Math.round(o.x0), y0: Math.round(o.y0),
               x1: Math.round(o.x1), y1: Math.round(o.y1) };
    }
    /* A fire mission is more than a point.
       `release` is the player's authority and has to survive a save, or a
       launcher comes back holding a bombard order it may not shoot: bombard()
       finds no weapon it is allowed to use and drops to idle without a word.
       `wi` names the mount, and a saved minelaying mission that lost it would
       reload as a high-explosive ripple onto the ground picked for a belt.
       `nuke` is the confirmed nuclear release; without it a restored warhead
       mission silently becomes a conventional one it cannot fire.
       `until` is carried for a bug of its own, and this fixes it: dropped, the
       reload compares `this.game.time > undefined`, which is false for ever, so
       EVERY restored bombard order from any gun ran indefinitely. After this
       they all expire, including missions saved longer ago than their window,
       which drop to idle on the first tick after load. That is a real change
       to existing artillery in existing saves and belongs in the commit note.
       An older save carries none of these keys and reads as no release - the
       launcher waits for a fresh order, which is the safe side to be wrong on. */
    if (o.x !== undefined) {
      const l = { type: o.type, x: Math.round(o.x), y: Math.round(o.y) };
      if (o.release) l.release = true;
      if (o.nuke) l.nuke = true;
      if (o.wi !== undefined) l.wi = o.wi;
      if (o.until !== undefined) l.until = Math.round(o.until);
      return l;
    }
    return { type: o.type };
  }
  function serializeQueues(qs) {
    const out = {};
    for (const k in qs) {
      const q = qs[k];
      out[k] = {
        items: q.items.map(i => ({ id: i.id, paid: Math.round(i.paid) })),
        prog: +q.prog.toFixed(3),
        ready: Array.isArray(q.ready) ? q.ready.map(r => ({ id: r.id, paid: Math.round(r.paid) })) : [],
      };
    }
    return out;
  }
  function btoaBytes(arr) {
    let s = "";
    for (let i = 0; i < arr.length; i++) s += String.fromCharCode(arr[i] + 48);
    return s;
  }
  function bytesFromAtob(s, out) {
    for (let i = 0; i < out.length && i < s.length; i++) out[i] = s.charCodeAt(i) - 48;
  }

  function save(G, slot) {
    try {
      const data = JSON.stringify(snapshot(G));
      localStorage.setItem(slot || KEY, data);
      return { ok: true, bytes: data.length };
    } catch (e) {
      return { ok: false, error: e && e.message ? e.message : String(e) };
    }
  }
  function autosave(G) { return save(G, AUTO); }

  function peek(slot) {
    try {
      const raw = localStorage.getItem(slot || KEY);
      if (!raw) return null;
      const d = JSON.parse(raw);
      return {
        savedAt: d.savedAt, time: d.time,
        theatre: d.opts && d.opts.theatre,
        players: d.players ? d.players.length : 0,
        bytes: raw.length,
      };
    } catch (e) { return null; }
  }
  function has(slot) { return !!peek(slot); }
  function clear(slot) { try { localStorage.removeItem(slot || KEY); } catch (e) {} }

  /* ---------- read ---------- */
  function load(slot) {
    const raw = localStorage.getItem(slot || KEY);
    if (!raw) return { ok: false, error: "no save in that slot" };
    let d;
    try { d = JSON.parse(raw); } catch (e) { return { ok: false, error: "save is corrupt" }; }
    if (!d || d.v !== 1) return { ok: false, error: "save is from an incompatible version" };

    /* rebuild the world from the original options, then overwrite the state */
    const opts = Object.assign({}, d.opts);
    opts.roster = d.players.map(p => ({
      faction: p.faction, ai: p.isAI, team: p.team,
      diff: p.diff, personality: p.personality, handicap: p.handicap, label: p.label,
    }));
    const G = Game.init(opts);

    /* wipe the fresh deployment — the save carries the real one */
    G.entities.length = 0;
    for (const p of G.players) { p.units.length = 0; p.buildings.length = 0; }
    G.occ.fill(0);
    for (const n of G.map.oilNodes) n.taken = false;

    G.time = d.time || 0;
    if (d.wx) { G.weatherKey = d.wx; G.weatherLock = !!d.wxLock; G.weatherT = d.wxT || 200; }
    if (d.startOrder) {
      G.startOrder = d.startOrder;
      G.humanStart = G.map.starts[d.startOrder[0]];
    }
    G.speed = d.speed || 1;

    /* ore + oil */
    for (let i = 0; i + 1 < d.oreDelta.length; i += 2) G.map.ore[d.oreDelta[i]] = d.oreDelta[i + 1];
    (d.oilTaken || []).forEach((v, i) => { if (G.map.oilNodes[i]) G.map.oilNodes[i].taken = !!v; });

    /* players */
    d.players.forEach((sp, i) => {
      const p = G.players[i];
      if (!p) return;
      p.cash = sp.cash; p.oil = sp.oil; p.tech = sp.tech;
      p.support = sp.sup || {};
      p.upgrades = sp.upgrades || {};
      p.banned = sp.banned || {};
      p.defeated = !!sp.defeated;
      p.stats = sp.stats || p.stats;
      p.homeX = sp.homeX; p.homeY = sp.homeY;
      for (const k in sp.queues) {
        if (!p.queues[k]) continue;
        const sq = sp.queues[k];
        p.queues[k].prog = sq.prog || 0;
        p.queues[k].items = (sq.items || []).map(it => ({
          id: it.id, paid: it.paid, def: defOf(k, it.id),
        })).filter(it => it.def);
        if (Array.isArray(p.queues[k].ready)) {
          p.queues[k].ready = (sq.ready || []).map(it => ({
            id: it.id, paid: it.paid, def: defOf(k, it.id),
          })).filter(it => it.def);
        }
      }
    });

    /* buildings first so occupancy is right before units land */
    for (const sb of d.buildings) {
      const p = G.players[sb.o];
      if (!p || !BUILDINGS[sb.d]) continue;
      const b = G.placeBuilding(p, sb.d, sb.tx, sb.ty, "restored");
      b.hp = sb.hp; b.buildProgress = sb.prog;
      b.repairing = !!sb.rep;
      b.swCharge = sb.sw !== undefined ? sb.sw : b.swCharge;
      b.tang = sb.ta || 0;
      b.rally = { x: sb.rx, y: sb.ry };
    }
    for (const su of d.units) {
      const p = G.players[su.o];
      if (!p || !UNITS[su.d]) continue;
      const u = G.spawnUnitAt(p, su.d, su.x, su.y);
      u.x = su.x; u.y = su.y;                 // exact, no spawn nudging
      u.ang = su.a; u.tang = su.ta;
      u.hp = su.hp; u.vet = su.vet || 0; u.xp = su.xp || 0;
      u.fuel = su.fuel; u.ammo = su.ammo;
      u.supplyLeft = su.sup || 0; u.load = su.load || 0;
      u.stance = su.st || "guard";
      if (su.pk && u.layer === "air") { u.parked = true; u.order = { type: "parked" }; }
      if (su.mg) u.mag = su.mg;
      if (su.mn !== undefined) u.mines = su.mn;
      if (su.nt !== undefined) u.net = su.nt;
      u.order = su.ord || { type: "idle" };
    }

    /* After the players exist, because owner and seen are player INDICES. An
       older save carries neither key and both restore as empty - no
       minefields, no barriers, full racks - which is exactly the behaviour
       that shipped, so the save version does not have to move. */
    if (typeof Mines !== "undefined" && Mines.restore) Mines.restore(G, d.mines);
    if (typeof SonarNet !== "undefined") SonarNet.restore(G, d.net);

    if (d.fog && G.fogEnabled) bytesFromAtob(d.fog, G.fog);
    G.recomputeFog();
    return { ok: true, game: G };
  }
  function defOf(kind, id) {
    if (kind === "upgrade") { const u = UPGRADES[id]; if (u) u._key = id; return u; }
    if (kind === "building" || kind === "defense") return BUILDINGS[id];
    return UNITS[id];
  }

  return { save, autosave, load, peek, has, clear, KEY, AUTO };
})();
