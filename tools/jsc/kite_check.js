/* tools/jsc/kite_check.js - fire, then give ground (entities.js
   Unit.kiteDecide / kiteStep), checked on the real game under JavaScriptCore.

     python3 tools/jsc/run.py index.html --limit 1800 --test tools/jsc/kite_check.js [-- verbose]
     python3 tools/jsc/run.py index.html --limit 3600 --test tools/jsc/kite_check.js -- ab [n 40]

   Every scene is played on a strip of open grass painted into the middle of
   the fulda map (terrain and elevation put back afterwards), with every other
   unit taken off the board and both commanders' brains stopped, so what is
   measured is two crews and nothing else. Both seats are made the same army
   (pact) - the setup screen will not deal a mirror match, so the AI seat's
   faction is set by hand - and no faction modifier favours either side. The
   kiter stands on guard at its post, left to pick the fight up itself; the
   enemy starts to the west with an attack order on it, so it keeps coming at
   its road speed. Each fight runs on its own seed, so a fight with "kite" on
   and the same fight with it off roll the same dice until the kite changes
   something.

   What is checked:
     [1] two pairings that pass every test in kiteDecide - a tank destroyer
         against a Javelin team, a Kornet team against an MG team - over 40
         paired fights each: with "kite" on the kiter gives ground, wins more
         of them and comes out ahead on the exchange; with it switched off for
         its side (owner.aiOff, as the scorecard does it) it never moves. And
         the rhythm: every step begins as a round leaves the barrel, never
         twice in one reload, and none is a flicker;
     [2] who does not: a slower unit, an outranged one, against what cannot
         hurt it, against a tank that would be in its reach before the hull
         came round, on stance hold, under an attack order naming the enemy;
         an explicit move order is carried out, given before or during a step;
     [3] the leash: against an enemy it cannot kill, and against four coming
         one after another, it never ends up more than the leash from its post;
     [4] cornered, with water behind it and on both sides, with water three
         tiles behind it, against the map edge: never on water or off the
         board, and it still fights;
     [5] the player's unit and the AI's unit, same fight: the same steps.
   "-- ab" prints the paired table over seven pairings instead (the numbers
   in the entities.js comment). */
var TT = 32, PASS = 0, FAIL = 0, DT = 1 / 30;
var ARGS = typeof __ARGS !== "undefined" ? __ARGS : [];
var VERBOSE = ARGS.indexOf("verbose") >= 0;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
function r1(v) { return Math.round(v * 10) / 10; }

window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "fulda"); set("opt-fac", "pact"); set("opt-foe", "nato");
  set("opt-era", "e20"); set("opt-peracap", "e20"); set("opt-aera", "e20"); set("opt-aeracap", "e20");
  set("opt-opponents", "1"); set("opt-cash", "20000"); set("opt-seed", "kite");
  set("opt-fog", "0"); set("opt-3d", "0");
  var sl = document.getElementById("slot-list");
  if (sl) sl.querySelectorAll = function () { return []; };
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
    window.requestAnimationFrame = function () { return 0; }; Game.paused = true;
  }, 0);
});

function run() {
  var G = Game, M = G.map, P0 = G.players[0], P1 = G.players[1];
  P1.faction = P0.faction;
  /* no commander moves anything, and nothing else is on the board */
  AI.update = function () {};
  var scene = [];
  function sweep() {
    for (var i = G.entities.length - 1; i >= 0; i--) {
      var e = G.entities[i];
      if (e.kind !== "unit" || scene.indexOf(e) >= 0) continue;
      G.entities.splice(i, 1);
      var j = e.owner.units.indexOf(e); if (j >= 0) e.owner.units.splice(j, 1);
    }
  }
  sweep();

  /* ---- the strip: 46 x 15 tiles of open grass, no structure near it ---- */
  var SW = 46, SH = 15, sx0 = -1, sy0 = -1;
  for (var tries = 0; tries < 400 && sx0 < 0; tries++) {
    var cx = ((M.W / 2) | 0) + ((tries % 20) - 10) * 3, cy = ((M.H / 2) | 0) + (((tries / 20) | 0) - 10) * 3;
    var x0 = cx - (SW >> 1), y0 = cy - (SH >> 1), ok = x0 > 3 && y0 > 3 && x0 + SW < M.W - 3 && y0 + SH < M.H - 3;
    for (var y = y0 - 2; ok && y < y0 + SH + 2; y++) for (var x = x0 - 2; ok && x < x0 + SW + 2; x++)
      if (G.tileBlocked(x, y, null)) ok = false;
    if (ok) { sx0 = x0; sy0 = y0; }
  }
  if (sx0 < 0) { chk("found an open strip on the map", false); return; }
  var saved = [];
  function paint(x, y, ter) {
    var i = y * M.W + x;
    saved.push([i, M.terrain[i], M.elev[i]]);
    M.terrain[i] = ter; M.elev[i] = 0;
  }
  function unpaint() {
    for (var i = saved.length - 1; i >= 0; i--) { M.terrain[saved[i][0]] = saved[i][1]; M.elev[saved[i][0]] = saved[i][2]; }
    saved = []; Path.invalidate();
  }
  var GRASS = 2, WATER = 0, midY = sy0 + (SH >> 1);

  /* ---- one fight ----
     o.k / o.e: kiter and enemy ids; o.ko: the kiter's seat (0 the player's,
     1 the AI's); o.d: tiles between them, the enemy to the west (o.edy tiles
     off the line); o.seed; o.off: "kite" off for the kiter's seat; o.hold;
     o.attack: the kiter told to attack the enemy by name; o.move {dx, dy} at
     o.moveT s: a move order; o.immortal; o.waves: that many enemies, each
     sent in when the last is dead (o.kImmortal: the kiter cannot die);
     o.water: water from this many tiles
     behind the kiter (o.cove: on both sides too); o.edge: the kiter this
     many tiles from the map's east edge; o.dur: seconds. */
  function duel(o) {
    Combat.reset && Combat.reset();
    G.rng = U.mulberry32(o.seed !== undefined ? o.seed : 7);
    var ko = o.ko === 1 ? P1 : P0, eo = ko === P0 ? P1 : P0;
    var kx = o.edge ? (M.W - 1 - o.edge) : sx0 + 34, ky = midY;
    if (o.edge) { for (var y = ky - 7; y <= ky + 7; y++) for (var x = kx - 30; x < M.W; x++) paint(x, y, GRASS); }
    else for (var y1 = sy0; y1 < sy0 + SH; y1++) for (var x1 = sx0; x1 < sx0 + SW; x1++) paint(x1, y1, GRASS);
    if (o.water !== undefined) {
      for (var y2 = sy0; y2 < sy0 + SH; y2++) for (var x2 = kx + o.water; x2 < sx0 + SW; x2++) paint(x2, y2, WATER);
      if (o.cove) for (var x3 = kx - 4; x3 < sx0 + SW; x3++) for (var y3 = sy0; y3 < sy0 + SH; y3++)
        if (Math.abs(y3 - ky) >= 2) paint(x3, y3, WATER);
    }
    Path.invalidate();
    var K = G.spawnUnitAt(ko, o.k, kx * TT + 16, ky * TT + 16), E = null;
    var x0 = K.x, y0 = K.y;
    function send() {
      E = G.spawnUnitAt(eo, o.e, K.x - o.d * TT, y0 + (o.edy || 0) * TT);
      E.ang = 0; E.tang = 0;
      E.give({ type: "attack", target: K });
      scene = [K, E];
    }
    K.ang = Math.PI; K.tang = Math.PI;
    K.guardX = K.x; K.guardY = K.y;
    if (o.hold) K.stance = "hold";
    ko.aiOff = o.off ? new Set(["kite"]) : undefined;
    var k0 = ko.kiteN || 0, kMove = -1;
    send();
    if (o.attack) K.give({ type: "attack", target: E });
    var r = { K: K, steps: 0, kShots: 0, eShots: 0, maxBack: 0, maxOff: 0, wet: 0, off: 0, startT: [], shotT: [],
              stepTicks: [], end: 0, tStart: G.time, kHp0: K.hp, eHp0: E.hp, kills: 0, eDmg: 0 };
    var ofire = Combat.fire;
    Combat.fire = function (g, sh, w, t) {
      if (sh === K) { r.kShots++; r.shotT.push(G.time); }
      else if (sh === E) r.eShots++;
      return ofire.apply(this, arguments);
    };
    var was = false, run0 = 0, waves = o.waves || 1;
    var N = Math.round((o.dur || 60) / DT);
    for (var n = 0; n < N; n++) {
      if (o.move && Math.abs(G.time - r.tStart - (o.moveT || 0)) < DT / 2) {
        K.give({ type: "move", x: x0 + o.move.dx * TT, y: y0 + o.move.dy * TT });
        kMove = ko.kiteN || 0;
      }
      if (o.immortal) E.hp = E.maxHp;
      if (o.kImmortal) K.hp = K.maxHp;
      G.tick(DT);
      sweep();
      var st = !!(K.kiteS && K.kiteS.step && G.time >= K.kiteS.go);
      if (st && !was) { r.startT.push(G.time); run0 = 0; }
      if (st) run0++;
      if (!st && was) r.stepTicks.push(run0);
      was = st;
      if (!K.dead) {
        r.maxBack = Math.max(r.maxBack, (K.x - x0) / TT);
        r.maxOff = Math.max(r.maxOff, U.dist(K.x, K.y, x0, y0) / TT);
        var tx = (K.x / TT) | 0, ty = (K.y / TT) | 0;
        if (K.x < 0 || K.y < 0 || tx >= M.W || ty >= M.H) r.off++;
        else if (!GameMap.passable(M, tx, ty, K.layer)) r.wet++;
      }
      if (E.dead) {
        r.eDmg += r.eHp0; r.kills++;
        if (--waves > 0 && !K.dead) { send(); continue; }
      }
      if (K.dead || E.dead) { r.end = G.time - r.tStart; break; }
    }
    if (!E.dead) r.eDmg += r.eHp0 - Math.max(0, E.hp);
    Combat.fire = ofire;
    r.steps = (ko.kiteN || 0) - k0;
    r.afterMove = kMove < 0 ? 0 : (ko.kiteN || 0) - kMove;
    r.kDmg = r.kHp0 - Math.max(0, K.hp);
    r.kDead = K.dead; r.eDead = E.dead; r.won = E.dead && !K.dead;
    r.kEnd = { x: (K.x - x0) / TT, y: (K.y - y0) / TT };
    /* clear the board */
    [K, E].forEach(function (u) {
      var i = G.entities.indexOf(u); if (i >= 0) G.entities.splice(i, 1);
      var j = u.owner.units.indexOf(u); if (j >= 0) u.owner.units.splice(j, 1);
      u.dead = true;
    });
    scene = []; ko.aiOff = undefined;
    unpaint();
    if (VERBOSE) log("    [" + (o.label || o.k + " v " + o.e) + "] steps " + r.steps + "  K rounds " + r.kShots +
                     "  E rounds " + r.eShots + "  K took " + Math.round(r.kDmg) + (r.kDead ? " DEAD" : "") +
                     "  dealt " + Math.round(r.eDmg) + (r.eDead ? " (killed)" : "") + "  t " + r1(r.end) +
                     "  furthest back " + r1(r.maxBack) + "  ended at " + r1(r.kEnd.x) + "," + r1(r.kEnd.y));
    return r;
  }
  function S(a, f) { return a.reduce(function (z, x) { return z + f(x); }, 0); }
  /* the same fights with "kite" on and off: per side, wins, losses, and the
     mean exchange - the share of the enemy's hit points dealt, less the
     share of our own lost, per fight */
  function paired(k, e, d, n) {
    var on = [], off = [];
    for (var i = 0; i < n; i++) {
      var o = { k: k, e: e, d: d + (i % 4) * 0.12, edy: (i % 5) - 2, dur: 60, seed: 1000 + i };
      on.push(duel(o)); o.off = true; off.push(duel(o));
    }
    function sum(a) {
      return { steps: S(a, function (r) { return r.steps; }), won: S(a, function (r) { return r.won ? 1 : 0; }),
               lost: S(a, function (r) { return r.kDead ? 1 : 0; }), took: S(a, function (r) { return r.kDmg; }),
               net: S(a, function (r) { return r.eDmg / r.eHp0 - r.kDmg / r.kHp0; }) / a.length };
    }
    return { on: sum(on), off: sum(off), runs: on };
  }
  function line(label, x) {
    return label + ": " + x.steps + " steps, won " + x.won + " lost " + x.lost + ", hp lost " + Math.round(x.took) +
           ", exchange " + (x.net >= 0 ? "+" : "") + x.net.toFixed(2);
  }
  function info(id) {
    var d = UNITS[id], w = WEAPONS[d.weapons[0]];
    return id + " (" + d.role + ", speed " + d.speed + ", " + (d.turret ? "turret" : "turn " + d.turn) + ", " +
           w.range + " t, reload " + w.reload + ", sight " + d.sight + ")";
  }

  log("seats: " + P0.faction + " (player), " + P1.faction + " (AI); strip at " + sx0 + "," + sy0 + " on " + M.W + "x" + M.H);

  if (ARGS.indexOf("ab") >= 0) {
    var NT = ARGS.indexOf("n") >= 0 ? +ARGS[ARGS.indexOf("n") + 1] : 40;
    [["atgmv_p", "at_n", 10.3], ["at_p", "mg_n", 9.0], ["pact_e80_at", "mg_n", 8.6], ["nato_e90_at", "mg_p", 9.8],
     ["nato_e90_tankdestroyer", "pact_e90_mbt", 10.5], ["pact_e60_tankdestroyer", "nato_e60_lighttank", 8.0],
     ["atgmv_n", "lt_p", 10.0]].forEach(function (pr) {
      var x = paired(pr[0], pr[1], pr[2], NT);
      log("  " + pr[0] + " v " + pr[1] + " (" + NT + " fights)");
      log("    " + line("kite on ", x.on));
      log("    " + line("kite off", x.off));
    });
    return;
  }

  /* ===== 1. where it should, it does, and it pays ===== */
  [["atgmv_p", "at_n", 10.3, "a tank destroyer against a Javelin team"],
   ["at_p", "mg_n", 9.0, "a Kornet team against an MG team"]].forEach(function (pr) {
    log("\n[1] " + info(pr[0]) + "\n    v " + info(pr[1]));
    var x = paired(pr[0], pr[1], pr[2], 40);
    log("    " + line("kite on ", x.on));
    log("    " + line("kite off", x.off));
    chk(pr[3] + ": it gives ground", x.on.steps >= 40, x.on.steps + " steps in 40 fights");
    chk("...never with kite switched off for its side", x.off.steps === 0, x.off.steps + " steps");
    chk("...it wins more of the same fights", x.on.won > x.off.won, x.on.won + " of 40 against " + x.off.won);
    chk("...and comes out ahead on the exchange", x.on.net > x.off.net,
        (x.on.net >= 0 ? "+" : "") + x.on.net.toFixed(2) + " against " + (x.off.net >= 0 ? "+" : "") + x.off.net.toFixed(2));
    var orphan = 0, twice = 0, flick = 0;
    x.runs.forEach(function (r) {
      var rl = WEAPONS[r.K.def.weapons[0]].reload;
      r.startT.forEach(function (t, i) {
        if (!r.shotT.some(function (q) { return q <= t + 1e-6 && q >= t - 0.6; })) orphan++;
        if (i > 0 && t - r.startT[i - 1] < rl * 0.8) twice++;
      });
      r.stepTicks.forEach(function (n) { if (n < 9) flick++; });
    });
    chk("...shot, step, shot: every step starts as a round goes, one per reload, none under 0.3 s",
        !orphan && !twice && !flick, "unprompted " + orphan + ", twice in a reload " + twice + ", flickers " + flick);
  });

  /* ===== 2. who does not ===== */
  log("\n[2] who does not give ground");
  var slow = duel({ k: "sniper_n", e: "rifle_p", d: 9.0, label: "slower: sniper v rifle squad" });
  chk("a slower unit (sniper team 0.78 against a rifle squad's 1.05)", slow.steps === 0 && slow.kShots > 0,
      slow.steps + " steps, " + slow.kShots + " rounds fired");
  var outr = duel({ k: "mg_n", e: "pact_e80_at", d: 6.0, label: "outranged: MG v ATGM team" });
  chk("an outranged unit (MG team against an ATGM team)", outr.steps === 0 && outr.kShots > 0,
      outr.steps + " steps, " + outr.kShots + " rounds fired");
  var harm = duel({ k: "atgmv_p", e: "rifle_p", d: 9.5, label: "harmless: TD v rifle squad" });
  chk("against what cannot hurt it (tank destroyer against a rifle squad)", harm.steps === 0 && harm.kShots > 0,
      harm.steps + " steps, " + harm.kShots + " rounds fired");
  var tank = duel({ k: "atgmv_p", e: "mbt_n", d: 10.6, label: "TD v M1" });
  chk("against a tank that would be in its reach before the hull came round (TD against an M1)",
      tank.steps === 0 && tank.kShots > 0, tank.steps + " steps, " + tank.kShots + " rounds fired");
  var hold = duel({ k: "atgmv_p", e: "at_n", d: 10.3, hold: true, dur: 25, label: "hold" });
  chk("on stance hold", hold.steps === 0 && hold.maxOff < 0.2,
      hold.steps + " steps, moved " + r1(hold.maxOff) + " t");
  var att = duel({ k: "atgmv_p", e: "at_n", d: 10.3, attack: true, label: "attack order" });
  chk("under an attack order naming that enemy", att.steps === 0 && att.kShots > 0,
      att.steps + " steps, " + att.kShots + " rounds fired");
  var mv = duel({ k: "atgmv_p", e: "at_n", d: 10.3, move: { dx: -3, dy: 3 }, moveT: 0.0, dur: 12, label: "move order" });
  chk("an explicit move order is carried out", mv.steps === 0 && U.dist(mv.kEnd.x, mv.kEnd.y, -3, 3) < 0.8,
      mv.steps + " steps, ended " + r1(mv.kEnd.x) + "," + r1(mv.kEnd.y) + " t from the start (sent to -3,3)");
  var mv2 = duel({ k: "atgmv_p", e: "at_n", d: 10.3, move: { dx: -3, dy: 0 }, moveT: 1.0, dur: 12, label: "move order mid-step" });
  chk("...also one given in the middle of a step", mv2.steps === 1 && mv2.afterMove === 0 &&
      U.dist(mv2.kEnd.x, mv2.kEnd.y, -3, 0) < 0.8,
      mv2.steps + " step before the order, " + mv2.afterMove + " after, ended " + r1(mv2.kEnd.x) + "," + r1(mv2.kEnd.y) + " (sent to -3,0)");

  /* ===== 3. the leash ===== */
  log("\n[3] the leash (five tiles from its post)");
  var lea = duel({ k: "atgmv_p", e: "at_n", d: 10.3, immortal: true, dur: 120, label: "an enemy it cannot kill" });
  chk("against an enemy it cannot kill it gives ground, then stands", lea.steps >= 1 && lea.maxOff <= 5.5,
      lea.steps + " steps, at most " + r1(lea.maxOff) + " t from its post");
  var wv = duel({ k: "atgmv_p", e: "at_n", d: 10.3, waves: 4, kImmortal: true, dur: 240, label: "four in a row" });
  chk("four enemies one after another cannot walk it back past the leash", wv.kills >= 2 && wv.maxOff <= 5.5,
      wv.kills + " killed, " + wv.steps + " steps, at most " + r1(wv.maxOff) + " t from its post");

  /* ===== 4. cornered ===== */
  log("\n[4] cornered");
  var cove = duel({ k: "atgmv_p", e: "at_n", d: 10.3, water: 1, cove: true, label: "water behind and both sides" });
  chk("water behind it and on both sides: never on water, and it fights from where it stands",
      cove.wet === 0 && cove.off === 0 && cove.kShots > 0 && cove.maxOff < 1.0,
      "ticks on water " + cove.wet + ", steps " + cove.steps + ", moved " + r1(cove.maxOff) + " t, " + cove.kShots + " rounds fired");
  var shore = duel({ k: "atgmv_p", e: "at_n", d: 10.3, water: 3, label: "water 3 t behind" });
  chk("water three tiles behind it: it gives what ground there is, never onto the water",
      shore.wet === 0 && shore.steps >= 1 && shore.maxBack < 3 && shore.kShots > 0,
      "ticks on water " + shore.wet + ", steps " + shore.steps + ", furthest back " + r1(shore.maxBack) + " t");
  var edge = duel({ k: "atgmv_p", e: "at_n", d: 10.3, edge: 2, label: "map edge" });
  chk("against the map edge: never off the board", edge.off === 0 && edge.wet === 0 && edge.kShots > 0,
      "ticks off the board " + edge.off + ", steps " + edge.steps);
  var flick = 0;
  [cove, shore, edge].forEach(function (r) { r.stepTicks.forEach(function (n) { if (n < 9) flick++; }); });
  chk("...and none of the three flickers between stepping and standing", flick === 0, flick + " steps under 0.3 s");

  /* ===== 5. the player's and the AI's alike ===== */
  log("\n[5] the player's unit and the AI's");
  var same = 0, diff = [];
  for (var i = 0; i < 6; i++) {
    var hu = duel({ k: "atgmv_p", e: "at_n", d: 10.3 + i * 0.1, ko: 0, seed: 50 + i, label: "player's " + i });
    var ai = duel({ k: "atgmv_p", e: "at_n", d: 10.3 + i * 0.1, ko: 1, seed: 50 + i, label: "AI's " + i });
    if (hu.steps === ai.steps && Math.abs(hu.maxBack - ai.maxBack) < 0.05 && hu.won === ai.won) same++;
    else diff.push(i + ": " + hu.steps + "/" + ai.steps + " steps, " + r1(hu.maxBack) + "/" + r1(ai.maxBack) + " t");
  }
  chk("the same fight gives the same steps and the same result for either seat", same === 6,
      same + " of 6 identical" + (diff.length ? "; " + diff.join("; ") : ""));
}
