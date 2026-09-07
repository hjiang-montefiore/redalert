/* ============ sonarnet.js — submarine-laid acoustic barriers ============

   A submarine cannot lay sonobuoys. An A-size buoy is 4.875 in across and
   36 in long; the 3-inch signal ejector fitted to a submarine physically
   cannot pass one, which is why sonobuoys are an AIRCRAFT store and why this
   game already builds sonobuoy racks on the ASW helicopters (asw_helo_fit.js)
   and nowhere else. What a submarine genuinely does deploy is a bottom-laid
   node put out through a torpedo tube - the Mk 60 CAPTOR lineage ("can be
   placed by either aircraft, submarine or surface vessel"), the Mk 67 SLMM
   that swims itself out of a 688i's tube, and on the sensor side the
   Advanced Deployable System (1997-2006, cancelled), TRAPS, and Russia's
   Garmoniya seabed stations. So that is what this module models: a small
   battery-powered passive hydrophone sitting on the seabed with a surface
   float, laid one at a time from a boat that had to stop to do it.

   ARCHITECTURE. Copied from mines.js and for the same reason: a node does
   not move, does not shoot, has no hit points worth tracking, and a barrier
   is a dozen of them. Giving each one an Entity would put idle objects
   through the update loop and the spatial grid every tick for nothing. They
   live in one flat array on the game - G.sonarnet - and are handled here.

   THE RULES A PLAYER NEEDS, deliberately short:

     - ONE node in contact is a DATUM, not a target. A single omnidirectional
       hydrophone gives no bearing, so what the player is told is that
       something is near THAT NODE, and the marker is drawn at the node's own
       position. It does not make the boat targetable and does not touch
       canSeeSub. It exists to tell you where to send the helicopter.
     - TWO OR MORE nodes holding the same boat in the same tick is a FIX: the
       contact goes into G.canSeeSub for the field's owner and is held for a
       few seconds afterwards so it does not strobe as the boat crosses
       between lenses. Overlap is the expensive part of a barrier and overlap
       is what you are paying for.
     - Reach scales with the TARGET's own radiated noise, through the same
       Math.min(2.2, G.acousticOf(sub)) term every other sensor in the game
       uses. A moving Romeo is heard at seven tiles; a Kilo lying still on
       its battery at three quarters of one. A flat-radius node would delete
       the whole `quiet` ladder that eras.js and rules.js are built on.
     - A node runs on a BATTERY and dies. The real AN/SSQ-53B scuttles at
       eight hours whatever life was selected; a deployable seabed field is a
       mission, not an installation. Only the cabled Coastal Sonar Array
       ashore is permanent, and it is permanent because a cable feeds it
       power. LIFE below is the whole balance lever.
     - A node is invisible to the enemy until something detects it. It is a
       radio transmitter, so it is found by ESM at a range set by the finder's
       own radarQ - not by sonar, because a passive hydrophone radiates
       nothing acoustic. A minesweeper's existing gear destroys it; so does
       any detonation in the water near it.

   WHAT THIS MODULE DELIBERATELY DOES NOT DO. It does not add a single line of
   scanning to G.canSeeSub. The contact scan runs once per tick, here, over
   submarines only - the few objects on the map that can be a contact at all -
   and stamps the answer on the boat as sub._netHold[playerIdx] = expiry time.
   canSeeSub, which is called per weapon per candidate per tick by every
   acquiring hull and once per entity per frame by both renderers, then costs
   one array lookup and one numeric compare.                                */
var SonarNet = (function () {
  "use strict";

  var NEXT = 1;      // node id; render3d keys its mesh pool on this
  var FIELD = 1;     // barrier id: every node from one order shares it

  /* ---- the numbers, all in one place ----

     REACH 3.2 tiles is 29% of the MH-60R's effective 10.93 (9.5 x the 1.15
     dipping bonus) and 29% of the Coastal Sonar Array's 11. It is the equal
     of the worst hull sonar in the game and a third of the best, which is the
     honest ratio for one battery-powered omnidirectional hydrophone against a
     towed array or an active dipping transducer with an aircraft's processing
     behind it. There is no airborne bonus: that bonus exists because a
     dipping sonar is lowered THROUGH the layer to a chosen depth, and a
     moored node hangs at whatever depth it was set to.

     LIFE 240 s is one weather block (CFG.WEATHER_MIN 150 - WEATHER_MAX 330).
     A boat crosses the map in about eighty seconds, so a barrier outlives
     three transits and no more: holding a chokepoint is a repeated decision
     rather than a purchase.

     SPACE 2.4 tiles is the lattice spacing and the dedupe radius, and it is
     the number that makes the design work. Two nodes 2.4 apart both hold a
     boat only if that boat is heard at more than 1.2 tiles - which a moving
     Kilo is (1.84) and a stopped one is not (0.77). The barrier therefore
     fixes the hurried and merely cues on the patient, which is both the real
     behaviour and the right game feel.                                      */
  var REACH = 3.2;   // tiles, before the target's own signature scales it
  var LIFE  = 240;   // seconds of battery
  var WARN  = 60;    // seconds left when the field says so, once
  var HOLD  = 6.0;   // seconds a fix is held after the overlap breaks
  var DATUM = 25;    // seconds a single-node bearing is worth anything
  var TELL  = 20;    // seconds between contact reports from one field on one boat
  var OIL   = 8;     // barrels a node costs, charged as it goes in the water
  var SPACE = 2.4;   // tiles: closer than this and a second node buys no lens
  var ESM_MAX = 9;   // tiles: ceiling on how far ESM reads a node's downlink

  function init(G) {
    G.sonarnet = [];
    G.sonarDatums = [];
    G.sonarTold = {};
  }

  function newField() { return FIELD++; }
  function reach() { return REACH; }
  function oilCost() { return OIL; }
  function lifetime() { return LIFE; }
  function spacing() { return SPACE; }

  /* Can this player afford to put one in the water? Charged at LAY rather
     than at reload so the panel can quote the price at the moment of the
     decision, and so a boat sunk with a full rack has not burned fuel for
     nothing. */
  function canAfford(owner) { return !!owner && owner.oil >= OIL; }

  /* Is a node already covering this point? Unlike a mine - which is asked by
     TILE, because a mine kills whatever stands on its tile and a radius test
     either misses a hand-laid one or rejects a legitimate neighbouring tile -
     a node's product is a LENS several tiles across, so the right question is
     a radius one. An ally's node counts: it feeds the same picture. */
  function tooClose(G, owner, x, y) {
    var list = G.sonarnet;
    if (!list) return false;
    var R = SPACE * CFG.TILE * 0.85;
    for (var i = 0; i < list.length; i++) {
      var n = list[i];
      if (n.dead) continue;
      if (n.owner !== owner && !G.allied(n.owner, owner)) continue;
      if (U.dist(n.x, n.y, x, y) < R) return true;
    }
    return false;
  }

  /* Put one in the water. Answers the node, or null if it could not be paid
     for - the caller keeps its rack round in that case, which is the honest
     outcome: the boat still has the node, the navy has no fuel to expend. */
  function lay(G, owner, x, y, field) {
    if (!canAfford(owner)) {
      if (owner === G.human)
        G.alert("NO FUEL FOR A SONAR NODE (" + OIL + " BBL)", "bad");
      return null;
    }
    owner.spendOil(OIL);
    var n = {
      id: NEXT++,
      x: x, y: y,
      tx: (x / CFG.TILE) | 0, ty: (y / CFG.TILE) | 0,
      owner: owner,
      field: field || newField(),
      r: REACH,
      life: LIFE,
      warned: false,
      dead: false,
      /* players who have detected it; the owner always has */
      seen: [owner],
    };
    G.sonarnet.push(n);
    /* NO explosion, and this is the one place this module deliberately
       departs from Mines.lay(). A mine is rolled off the stern of a surface
       hull that is already in plain sight, so the boom that tells the player
       something happened costs nothing. A node is ejected by a submerged boat
       whose whole value is that nobody knows where it is, and a column of
       white water over it would give away the one position the barrier exists
       to protect. The owner gets a word and everybody else gets nothing. */
    if (typeof Combat !== "undefined" && Combat.addEffect && owner === G.human)
      Combat.addEffect({ t: "text", x: x, y: y - 12, s: "NODE LAID",
                         life: 0.8, max: 0.8, c: "#7fd6c0" });
    return n;
  }

  function spot(n, p) { if (n.seen.indexOf(p) < 0) n.seen.push(p); }
  function visibleTo(n, p) { return n.seen.indexOf(p) >= 0; }

  function kill(G, n, loud) {
    n.dead = true;
    if (loud && typeof Combat !== "undefined" && Combat.addEffect) {
      Combat.addEffect({ t: "boom", x: n.x, y: n.y, r: 9,
                         life: 0.35, max: 0.35, water: true });
      if (n.owner === G.human)
        Combat.addEffect({ t: "text", x: n.x, y: n.y - 12, s: "NODE LOST",
                           life: 0.9, max: 0.9, c: "#ffb45c" });
    }
  }

  /* One warning per FIELD, not one per node, or a six-node barrier says the
     same thing six times in the same second. */
  function warnField(G, n) {
    var list = G.sonarnet, said = false;
    for (var i = 0; i < list.length; i++)
      if (list[i].field === n.field) { if (list[i].warned) said = true; list[i].warned = true; }
    if (!said && n.owner === G.human)
      G.alert("SONAR BARRIER — BATTERY LOW", "bad");
  }

  /* A single node in contact. Published at the NODE's position, because that
     is the only position a range-only hydrophone actually knows. */
  function publishDatum(G, n, sub) {
    var key = n.field + ":" + sub.id;
    var last = G.sonarTold[key];
    if (last !== undefined && G.time - last < TELL) return;
    G.sonarTold[key] = G.time;
    G.sonarDatums.push({ x: n.x, y: n.y, owner: n.owner, t: G.time, r: n.r });
    if (n.owner === G.human) {
      G.alert("SUBMARINE CONTACT — BEARING ONLY", "bad");
      if (G.pingEvent) G.pingEvent(n.x, n.y);
    }
  }

  function update(G, dt) {
    var list = G.sonarnet;
    if (!list) return;
    var i, k, n, p, u;

    /* ---- 1. battery. Nothing is said at expiry: a real buoy floods and
       sinks, and a barrier that quietly stops working is the honest failure
       mode. That is what the sixty-second warning is for. ---- */
    for (i = list.length - 1; i >= 0; i--) {
      n = list[i];
      if (n.dead) { list.splice(i, 1); continue; }
      n.life -= dt;
      if (n.life <= WARN && !n.warned) warnField(G, n);
      if (n.life <= 0) { n.dead = true; list.splice(i, 1); }
    }

    /* datums rot on their own; a Kilo covers forty-five tiles in the life of
       one, so a stale marker must visibly go */
    var dl = G.sonarDatums;
    if (dl) for (i = dl.length - 1; i >= 0; i--)
      if (G.time - dl[i].t > DATUM) dl.splice(i, 1);

    if (!list.length) {
      /* keep the rate-limit table from growing across a whole battle */
      if (G.sonarTold) G.sonarTold = {};
      return;
    }

    /* ---- 2. contacts. The ONLY scan in the feature, run once a tick over
       submarines - the sole class of object a node can hear at all - and not
       over the node array from the outside. The inner loop is bounded by the
       size of a barrier, which is bounded by what boats carry: four to six a
       hull, tens on a map, never the hundreds a minefield runs to. An
       axis-aligned box test rejects almost all of them before U.dist. ---- */
    for (var pi = 0; pi < G.players.length; pi++) {
      p = G.players[pi];
      for (var ui = 0; ui < p.units.length; ui++) {
        u = p.units[ui];
        if (u.dead || u.carried || u.layer !== "sub") continue;
        var q = Math.min(2.2, G.acousticOf(u));
        var counts = null, firstNode = null;
        for (k = 0; k < list.length; k++) {
          n = list[k];
          if (n.dead) continue;
          if (n.owner === p || G.allied(n.owner, p)) continue;
          var R = n.r * q * CFG.TILE;
          if (Math.abs(n.x - u.x) > R || Math.abs(n.y - u.y) > R) continue;
          if (U.dist(n.x, n.y, u.x, u.y) > R) continue;
          var oi = n.owner.idx;
          if (!counts) { counts = {}; firstNode = {}; }
          counts[oi] = (counts[oi] || 0) + 1;
          if (!firstNode[oi]) firstNode[oi] = n;
        }
        if (!counts) continue;
        for (var key in counts) {
          var idx = +key;
          if (counts[key] >= 2) {
            /* A FIX. Held for HOLD seconds after the overlap breaks so the
               contact does not strobe as the boat crosses between lenses and
               so pickWeapon has a stable target. Six seconds is just under
               the Mk 54's 7.0 s reload and half the Mk 48's 11.0: one fix
               buys exactly one shot. */
            if (!u._netHold) u._netHold = [];
            u._netHold[idx] = G.time + HOLD;
          } else {
            publishDatum(G, firstNode[idx], u);
          }
        }
      }
    }

    /* ---- 3. who finds a node, and who kills it.
       Found by ESM, not by sonar: a passive hydrophone radiates nothing
       acoustic, but it has a radio downlink, and everything afloat in this
       game already carries radarQ. The best number in the design falls out of
       it - a moving Kilo (radarQ 4) reads a node at 1.8 tiles and the node
       hears the Kilo at 1.84. They find each other at the same instant, which
       is why you learn a barrier is there by being caught by it, and why
       creeping past one is a real decision rather than a stat.
       Nothing ashore is looked at: a tank does not read a buoy at sea. ---- */
    for (var pj = 0; pj < G.players.length; pj++) {
      p = G.players[pj];
      for (var uj = 0; uj < p.units.length; uj++) {
        u = p.units[uj];
        if (u.dead || u.carried || u.layer === "ground") continue;
        var esm = u.def.radarQ ? Math.min(ESM_MAX, 0.45 * u.def.radarQ) : 0;
        /* sweeping is a slow surface job done with towed gear: an aircraft
           cannot do it and a submarine emphatically cannot, or the feature
           deletes itself */
        var clr = (u.layer === "sea" ? (u.def.mineClear || 0) : 0);
        if (!esm && !clr) continue;
        for (k = list.length - 1; k >= 0; k--) {
          n = list[k];
          if (n.dead) continue;
          if (n.owner === p || G.allied(n.owner, p)) continue;
          var d = U.dist(u.x, u.y, n.x, n.y);
          if (esm && d <= esm * CFG.TILE) spot(n, p);
          if (clr && d <= clr * CFG.TILE) {
            n.clearT = (n.clearT || 0) + dt * (u.def.mineClearRate || 1);
            if (n.clearT >= 2.2) { kill(G, n, true); list.splice(k, 1); }
          }
        }
      }
    }
  }

  /* Anything that goes off in the water breaks what is floating in it. The
     radius is the WEAPON's own aoe rather than a flat number, which makes the
     RBU-6000 - burst 6, aoe 1.4, the Pact's explicitly inferior ASW mount -
     the cheapest barrier-breaker in the game, and gives it a second job. */
  function blast(G, x, y, tiles) {
    var list = G.sonarnet;
    if (!list || !list.length) return 0;
    var R = Math.max(1.0, tiles) * CFG.TILE, n = 0;
    for (var i = list.length - 1; i >= 0; i--) {
      if (list[i].dead) continue;
      if (U.dist(list[i].x, list[i].y, x, y) > R) continue;
      kill(G, list[i], false);
      list.splice(i, 1);
      n++;
    }
    return n;
  }

  /* what to draw for this player */
  function forRender(G, p) {
    var out = [];
    if (!G.sonarnet) return out;
    for (var i = 0; i < G.sonarnet.length; i++) {
      var n = G.sonarnet[i];
      if (!n.dead && visibleTo(n, p)) out.push(n);
    }
    return out;
  }

  /* live datums this player is entitled to, newest last */
  function datums(G, p) {
    var out = [];
    if (!G.sonarDatums) return out;
    for (var i = 0; i < G.sonarDatums.length; i++) {
      var d = G.sonarDatums[i];
      if (d.owner === p || G.allied(d.owner, p)) out.push(d);
    }
    return out;
  }

  /* how many of ours are near a point, so the UI and the AI can say something */
  function countNear(G, owner, x, y, tiles) {
    var n = 0, R = tiles * CFG.TILE;
    if (!G.sonarnet) return 0;
    for (var i = 0; i < G.sonarnet.length; i++) {
      var m = G.sonarnet[i];
      if (m.dead || m.owner !== owner) continue;
      if (U.dist(m.x, m.y, x, y) <= R) n++;
    }
    return n;
  }

  /* ---- save and load ----
     Owners and the seen list hold Player OBJECTS, which do not survive JSON,
     so both go out as player indices and come back resolved. The id counter
     is advanced past everything restored: render3d keys its mesh pool on the
     node id, so a restored node and a freshly laid one sharing an id would
     attach one node's mesh to the other. */
  function snapshot(G) {
    var out = [];
    if (!G.sonarnet) return out;
    for (var i = 0; i < G.sonarnet.length; i++) {
      var n = G.sonarnet[i];
      if (n.dead) continue;
      out.push({ id: n.id, x: Math.round(n.x), y: Math.round(n.y),
                 o: n.owner.idx, f: n.field, r: n.r,
                 life: +n.life.toFixed(2), w: n.warned ? 1 : 0,
                 seen: n.seen.map(function (p) { return p.idx; }) });
    }
    return out;
  }
  function restore(G, arr) {
    G.sonarnet = [];
    G.sonarDatums = [];
    G.sonarTold = {};
    if (!arr || !arr.length) return;
    var maxId = 0, maxField = 0;
    for (var i = 0; i < arr.length; i++) {
      var s = arr[i], owner = G.players[s.o];
      if (!owner) continue;
      var seen = [];
      for (var k = 0; k < (s.seen || []).length; k++)
        if (G.players[s.seen[k]]) seen.push(G.players[s.seen[k]]);
      if (seen.indexOf(owner) < 0) seen.push(owner);
      G.sonarnet.push({
        id: s.id, x: s.x, y: s.y,
        tx: (s.x / CFG.TILE) | 0, ty: (s.y / CFG.TILE) | 0,
        owner: owner, field: s.f || 0, r: s.r || REACH,
        life: s.life !== undefined ? s.life : LIFE,
        warned: !!s.w, dead: false, seen: seen,
      });
      if (s.id > maxId) maxId = s.id;
      if ((s.f || 0) > maxField) maxField = s.f || 0;
    }
    if (maxId >= NEXT) NEXT = maxId + 1;
    if (maxField >= FIELD) FIELD = maxField + 1;
  }

  return { init: init, lay: lay, update: update, spot: spot, visibleTo: visibleTo,
           forRender: forRender, datums: datums, countNear: countNear,
           tooClose: tooClose, blast: blast, newField: newField,
           canAfford: canAfford, reach: reach, oilCost: oilCost,
           lifetime: lifetime, spacing: spacing,
           snapshot: snapshot, restore: restore };
})();
