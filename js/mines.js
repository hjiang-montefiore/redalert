/* ============ mines.js — minefields, ashore and afloat ============

   A mine is not a unit. It does not move, it does not shoot, it has no
   hit points worth tracking and there can be a great many of them, so
   giving each one an Entity would put hundreds of idle objects through
   the update loop and the spatial grid every tick for nothing.

   Instead they live in one flat array on the game and are handled here:

     lay()        put one down, disarmed, and let it settle
     update()     arm them, look for victims, let sweepers work
     visibleTo()  who can see which - the whole point of a mine is that
                  the other side cannot
     forRender()  what a given player should be shown

   The rules a player needs to understand are deliberately short:

     - A mine is invisible to the enemy until something with a detector
       gets close, or until it goes off.
     - It arms a few seconds after being laid, so you cannot drop one
       under a vehicle that is already on top of you.
     - It fires once. There is no reuse and no salvage.
     - Sea mines only threaten surface ships, land mines only threaten
       ground units. Neither touches aircraft, and neither touches
       infantry hard enough to be worth laying a field for - an anti-tank
       mine is set off by weight.
     - A sweeper clears them over time within its own radius, whether it
       can see them or not. That is what a sweeper is for.               */
var Mines = (function () {
  "use strict";

  var NEXT = 1;

  /* Defaults, overridable per mine when something wants a special one.

     The land mine is a shaped charge, not a blast weapon, because that is
     what a modern full-width anti-tank mine is and because it is the only
     way the engine will model it correctly: CFG.PEN_WARHEADS covers cannon,
     heat and bullet, so an "he" mine skipped the penetration model entirely
     and fell through to the blast table, where HE against heavy armour is
     0.32. A 260 kg charge took 83 points off an Abrams. As heat it resolves
     against the belly - 55 mm of top plate against 540 of glacis - and does
     what a mine actually does.

     The sea mine stays blast, because that is what it is, and because ships
     are outside the penetration model anyway. Its damage is raised instead:
     a mine detonates below the waterline where no ship carries armour. */
  var LAND = { dmg: 200, r: 0.55, arm: 3.0, warhead: "heat", aoe: 0.5 };
  var SEA  = { dmg: 1200, r: 0.85, arm: 4.0, warhead: "he", aoe: 0.7 };

  /* ---- how many one side may have in the ground at once ----
     A mine does not expire and nothing in this file will ever delete one, so
     the only honest brake on a weapon that puts eight in the ground per rocket
     is a refusal to lay the next one. Note what this does NOT do: it never
     removes an existing mine. Trimming the oldest to make room would be
     self-destruct wearing a different coat, and it is forbidden.

     update() runs unthrottled every tick and does one spatial query per ARMED
     mine plus a pass of every detector against every mine, so the term that
     grows is O(detectors x mines).

     300 per player - 1200 in a four-way game - sits an order of magnitude below
     where the simulation cost matters, and leaves headroom for the term nobody
     measured: render3d syncMines() builds one shadow-casting group per mine
     visible to the human, every frame, with no instancing and no distance
     culling. That is plausibly the binding constraint rather than the spatial
     scan, and this constant is the single dial to turn if it bites. Games today
     hold 20 to 31 mines, so this is two orders above what the game does now,
     and about forty rocket missions: nobody reaches it by accident. Shared with
     sea mines, because it counts what a PLAYER owns. */
  var CAP = 300;
  var capWarnT = -1e9;

  function countOwned(G, owner) {
    var n = 0;
    if (!G.mines) return 0;
    for (var i = 0; i < G.mines.length; i++)
      if (!G.mines[i].dead && G.mines[i].owner === owner) n++;
    return n;
  }
  function roomFor(G, owner) { return countOwned(G, owner) < CAP; }

  function init(G) { G.mines = []; capWarnT = -1e9; }

  /* Can this mine hurt that entity? Weight is the whole mechanism: an
     anti-tank mine needs a vehicle on top of it, and a moored sea mine
     needs a hull. Aircraft are never at risk. */
  function threatens(m, e) {
    if (!e || e.dead || e.carried) return false;
    if (e.layer === "air") return false;
    if (m.sea) return e.layer === "sea";
    if (e.layer !== "ground") return false;
    /* infantry do not reliably set off an anti-tank mine */
    return e.cat !== "infantry";
  }

  /* opts, all optional:
       dmg, r     override the warhead and the trigger radius
       arm        override the ARMING delay - the seconds before the mine wakes
                  up. A mine thrown out of a rocket has to right itself, and at
                  the LAND default of 3.0 a launcher could drop a live field on
                  a column already inside the footprint, turning an area-denial
                  weapon into a direct-fire one. THIS IS AN ARMING DELAY AND NOT
                  A LIFETIME. Nothing in this file expires.
       quiet      lay without the boom and the banner. A dispensing round puts
                  eight down in ONE frame, and eight booms with eight "MINE
                  LAID" lines on top of each other is not a minefield going in,
                  it is a rendering fault.
     Returns the mine, or null if the ceiling refused it, so the caller can keep
     the round on the rack rather than spend it on nothing. */
  function lay(G, owner, x, y, sea, opts) {
    var base = sea ? SEA : LAND;
    /* The hard stop, here as well as at the order point, because this is the
       only door into G.mines and a ceiling any future caller can walk past is
       not a ceiling. Throttled, so eight refused submunitions do not produce
       eight banners. */
    if (!roomFor(G, owner)) {
      if (owner === G.human && G.time - capWarnT > 8) {
        capWarnT = G.time;
        G.alert("MINEFIELD CEILING \u2014 " + CAP + " MINES ALREADY IN THE GROUND", "bad");
      }
      return null;
    }
    var m = {
      id: NEXT++,
      x: x, y: y,
      tx: (x / CFG.TILE) | 0, ty: (y / CFG.TILE) | 0,
      owner: owner,
      sea: !!sea,
      dmg: (opts && opts.dmg) || base.dmg,
      r: (opts && opts.r) || base.r,
      warhead: base.warhead,
      aoe: base.aoe,
      armIn: (opts && opts.arm) || base.arm,
      armed: false,
      dead: false,
      /* players who have spotted it; the owner always has */
      seen: [owner],
    };
    G.mines.push(m);
    if (!(opts && opts.quiet) &&
        typeof Combat !== "undefined" && Combat.addEffect) {
      /* Something visibly happens where the mine goes in. Without this a mine
         simply materialised and the vehicle looked like it had done nothing. */
      Combat.addEffect({ t: "boom", x: x, y: y, r: sea ? 9 : 6,
                         life: sea ? 0.45 : 0.28, max: sea ? 0.45 : 0.28, water: !!sea });
      if (owner === G.human)
        Combat.addEffect({ t: "text", x: x, y: y - 12, s: sea ? "MINE LAID" : "MINE LAID",
                           life: 0.7, max: 0.7, c: "#c8b06a" });
    }
    return m;
  }

  function spot(m, p) {
    if (m.seen.indexOf(p) < 0) m.seen.push(p);
  }
  function visibleTo(m, p) {
    return m.seen.indexOf(p) >= 0;
  }

  function detonate(G, m, victim) {
    m.dead = true;
    var w = { warhead: m.warhead, dmg: m.dmg, aoe: m.aoe, belly: true,
              name: m.sea ? "Sea mine" : "Land mine" };
    if (victim) Combat.applyDamage(G, victim, m.dmg, w, null);
    /* anything else standing on top of it takes the splash */
    if (m.aoe) {
      var R = m.aoe * CFG.TILE;
      G.grid.query(m.x, m.y, R, function (e) {
        if (e === victim || !threatens(m, e)) return;
        if (U.dist(e.x, e.y, m.x, m.y) > R) return;
        Combat.applyDamage(G, e, m.dmg * 0.45, w, null);
      });
    }
    /* everyone can see a mine that has just gone off */
    for (var i = 0; i < G.players.length; i++) spot(m, G.players[i]);
    if (Combat.addEffect) {
      Combat.addEffect({ t: "boom", x: m.x, y: m.y, r: (m.aoe || 0.6) * CFG.TILE,
                         life: 0.5, max: 0.5, water: m.sea });
      Combat.addEffect({ t: "text", x: m.x, y: m.y - 14, s: "MINE",
                         life: 0.9, max: 0.9, c: "#ffb45c" });
    }
    if (victim && victim.owner === G.human)
      G.alert((m.sea ? "SHIP MINED" : "MINE STRIKE") + " — " +
              victim.def.name.toUpperCase(), "bad");
  }

  function update(G, dt) {
    var list = G.mines;
    if (!list || !list.length) return;

    for (var i = list.length - 1; i >= 0; i--) {
      var m = list[i];
      if (m.dead) { list.splice(i, 1); continue; }
      if (!m.armed) {
        m.armIn -= dt;
        if (m.armIn <= 0) m.armed = true;
        continue;
      }

      /* a victim: nearest hostile of the right kind actually on top of it */
      var R = m.r * CFG.TILE, hit = null;
      G.grid.query(m.x, m.y, R, function (e) {
        if (hit || !threatens(m, e)) return;
        if (e.owner === m.owner || G.allied(e.owner, m.owner)) return;
        if (U.dist(e.x, e.y, m.x, m.y) <= R + (e.r || 0) * 0.35) hit = e;
      });
      if (hit) { detonate(G, m, hit); list.splice(i, 1); continue; }
    }

    /* detectors and sweepers. One pass over the units that have either,
       rather than a pass over every mine, because minefields are large
       and the machines that care about them are few. */
    for (var pi = 0; pi < G.players.length; pi++) {
      var p = G.players[pi];
      for (var ui = 0; ui < p.units.length; ui++) {
        var u = p.units[ui];
        if (u.dead || u.carried) continue;
        var det = u.def.mineDetect || 0, clr = u.def.mineClear || 0;
        if (!det && !clr) continue;
        var ord = u.order && u.order.type;
        if (ord === "move" || ord === "attackmove") u.breachT = G.time;
        var reach = Math.max(det, clr) * CFG.TILE;
        for (var k = list.length - 1; k >= 0; k--) {
          var mm = list[k];
          if (mm.dead) continue;
          if (mm.sea !== (u.layer === "sea")) continue;
          /* ---- OUR OWN FIELDS CAN BE BREACHED ----
             (owner) "miner sweep cannot sweep the mine but only see the mine."
             A friendly mine was skipped outright, so a clearer parked on top of
             one sat there for ever - measured, clearT 0.00 at 0.41 tiles - and
             since we always see our own mines it read as "it can see it and
             will not touch it". Mines here are persistent until something
             triggers them, so with no way to lift them a field laid across
             one's own line of advance was permanent.
             A friendly mine is lifted only while the machine is being DRIVEN
             through it: a clearer sitting in the base does not quietly disarm
             the perimeter it is parked behind. A hostile mine is still lifted
             whatever the clearer happens to be doing. */
          if (mm.owner === p || G.allied(mm.owner, p)) {
            /* ...and for ten seconds after the drive ends, or a clearer sent
               onto the last mine of a lane would stop a breath short of
               lifting it (2.2 seconds of work, and arriving ends the order) */
            if (G.time - (u.breachT || -1e9) > 10) continue;
          }
          var d = U.dist(u.x, u.y, mm.x, mm.y);
          if (det && d <= det * CFG.TILE) spot(mm, p);
          if (clr && d <= clr * CFG.TILE) {
            mm.clearT = (mm.clearT || 0) + dt * (u.def.mineClearRate || 1);
            if (mm.clearT >= 2.2) {
              mm.dead = true; list.splice(k, 1);
              /* A cleared mine is blown in place, so it looks like the work it
                 is rather than the mine quietly vanishing. */
              if (Combat.addEffect) {
                Combat.addEffect({ t: "boom", x: mm.x, y: mm.y,
                                   r: mm.sea ? 11 : 8, life: 0.35, max: 0.35,
                                   water: !!mm.sea });
                if (p === G.human)
                  Combat.addEffect({ t: "text", x: mm.x, y: mm.y - 12, s: "CLEARED",
                                     life: 0.8, max: 0.8, c: "#8fd05f" });
              }
            }
          }
        }
        if (reach) { /* keep the loop honest about its own bound */ }
      }
    }
  }

  /* what to draw for this player */
  function forRender(G, p) {
    var out = [];
    if (!G.mines) return out;
    for (var i = 0; i < G.mines.length; i++) {
      var m = G.mines[i];
      if (!m.dead && visibleTo(m, p)) out.push(m);
    }
    return out;
  }

  /* how many a given field holds near a point, so the UI can say something */
  function countNear(G, owner, x, y, tiles) {
    var n = 0, R = tiles * CFG.TILE;
    if (!G.mines) return 0;
    for (var i = 0; i < G.mines.length; i++) {
      var m = G.mines[i];
      if (m.dead || m.owner !== owner) continue;
      if (U.dist(m.x, m.y, x, y) <= R) n++;
    }
    return n;
  }

  /* Is this tile already mined for us? A second mine on a tile the first
     already covers is a mine spent for nothing, so a layer working an area
     asks before it lays. The test is by TILE rather than by radius because
     that is the real question - a radius test either misses a hand-laid mine
     sitting off centre or rejects a legitimate point in the next tile. An
     ally's mine counts: it kills the same people. */
  function tileMined(G, owner, x, y, sea) {
    if (!G.mines) return false;
    var tx = (x / CFG.TILE) | 0, ty = (y / CFG.TILE) | 0;
    for (var i = 0; i < G.mines.length; i++) {
      var m = G.mines[i];
      if (m.dead || m.tx !== tx || m.ty !== ty) continue;
      if (!!m.sea !== !!sea) continue;
      if (m.owner === owner || G.allied(m.owner, owner)) return true;
    }
    return false;
  }

  /* ---- save and load ----
     Mines were never serialised, so a save and reload destroyed every field on
     the map without a word. Owner and seen hold Player OBJECTS, which do not
     survive JSON, so both travel as player indices. NEXT is advanced past
     everything restored because render3d keys its mesh pool on the mine id,
     and a restored mine sharing an id with a freshly laid one would attach one
     mine's mesh to the other. */
  function snapshot(G) {
    var out = [];
    if (!G.mines) return out;
    for (var i = 0; i < G.mines.length; i++) {
      var m = G.mines[i];
      if (m.dead) continue;
      out.push({ id: m.id, x: Math.round(m.x), y: Math.round(m.y), o: m.owner.idx,
                 sea: m.sea ? 1 : 0, dmg: m.dmg, r: m.r, w: m.warhead, aoe: m.aoe,
                 arm: +(m.armIn || 0).toFixed(2), a: m.armed ? 1 : 0,
                 seen: m.seen.map(function (p) { return p.idx; }) });
    }
    return out;
  }
  function restore(G, arr) {
    G.mines = [];
    capWarnT = -1e9;
    if (!arr || !arr.length) return;
    var maxId = 0;
    for (var i = 0; i < arr.length; i++) {
      var s = arr[i], owner = G.players[s.o];
      if (!owner) continue;
      var seen = [];
      for (var k = 0; k < (s.seen || []).length; k++)
        if (G.players[s.seen[k]]) seen.push(G.players[s.seen[k]]);
      if (seen.indexOf(owner) < 0) seen.push(owner);
      G.mines.push({ id: s.id, x: s.x, y: s.y,
                     tx: (s.x / CFG.TILE) | 0, ty: (s.y / CFG.TILE) | 0,
                     owner: owner, sea: !!s.sea, dmg: s.dmg, r: s.r,
                     warhead: s.w, aoe: s.aoe, armIn: s.arm, armed: !!s.a,
                     dead: false, seen: seen });
      if (s.id > maxId) maxId = s.id;
    }
    if (maxId >= NEXT) NEXT = maxId + 1;
  }

  return { init: init, lay: lay, update: update, visibleTo: visibleTo,
           CAP: CAP, countOwned: countOwned, roomFor: roomFor,
           forRender: forRender, countNear: countNear, tileMined: tileMined,
           detonate: detonate, threatens: threatens,
           snapshot: snapshot, restore: restore };
})();
