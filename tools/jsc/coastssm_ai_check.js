/* tools/jsc/coastssm_ai_check.js - the commander buys coastal anti-ship
   launchers and sites them (ai.js COASTAL ANTI-SHIP MISSILES, coastSites,
   driveCoastal; PLAN.md B5), on the real game under JavaScriptCore, 3D off.

     python3 tools/jsc/run.py index.html --test tools/jsc/coastssm_ai_check.js

   Every scene is a fresh Game.init on hormuz: a human seat nobody drives
   and a Commander-tier commander, every unit of both sides taken off the
   board, the commander given a yard, power, a factory, a lab and a radar
   dome and held at peace (AI.setPeace: it buys and stations, it launches
   nothing of its own). "Held" means a scout of the commander's stands on
   the shore with the rival's ship in its sight.
     [1] a Pact commander (1980s: the Rubezh) with money in the bank and a
         rival destroyer on the water that nothing of its side can see
         buys no launcher, and its dossier has no hull in it - it does not
         know what it has not seen (owner: "ai should have the same fog
         like us");
     [2] once its scout holds a rival ship off its coast, its dossier says
         so and it puts one launcher on order - one, not two;
     [3] the launcher drives to a land tile two to six tiles back from the
         water, inside its base's build radius or under its own dome, with
         the ship inside its missiles' reach, and sets up there;
     [4] a French commander, whose army has no coastal launcher in any
         period (eras.js), holds the same ship and buys none;
     [5] a Recruit (no navy programme, D.navy) holds the same ship and buys
         none;
     [6] (run after [3], in its scene) three hulls held at once - a surface
         group, dossier.peakSea - buy a second launcher and no third, and it
         sets up at a site of its own, two to six tiles back from the water
         and clear of the first.
   After the launch (ai.js driveCoastal, coastShots, coastRefill; PLAN.md
   B6), each on a launcher put down by hand rather than bought, so the
   minutes of the buy are not paid again:
     [7] a Rubezh set up launches at the held ship; the ship gone (the
         salvo over, a missile still in the magazine), it drives to another
         site of the siting search, five tiles or more from the place it
         fired from, and sets up again there, on guard;
     [7b] a fresh hull held off the same coast and left there: it fires
         all it carries, fills, and leaves the site it fired from with the
         hull still held, for one five tiles or more away;
     [8] a Rubezh dry on a stretch of shore out of supply (no structure of
         its side within the base radius, no lorry) drives for its base,
         comes into supply, fills its magazine there (entities.js
         updateSupply), and goes back to a coastal site - five tiles or more
         from the place it was dry at - and sets up;
     [9] the Rubezh's own Garpun (def.seaRadar) and the commander's
         emission-control drill: with a Weasel in its crew's sight, one pass
         of the drill takes the SAM beside it dark (the drill saw the
         Weasel) and leaves the Garpun on the air - because no
         anti-radiation round in the game can home on it: G.armLock and the
         Weasel's own seadTarget read def.radar || def.jam only, though its
         receivers hear the set (G.esmPlot). Going dark would blind the
         launcher for a threat that cannot touch it. Should an ARM ever be
         let home on a sea set, this fails, and the drill must take the set
         in (ai.js emconDiscipline). */
var PASS = 0, FAIL = 0, TT = 32, DT = 1 / 30;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e80"); set("opt-aera", "e80");
  set("opt-seed", "coastai"); set("opt-fog", "1"); set("opt-3d", "0");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

var H = null, E = null;
function scene(o) {
  o = o || {};
  var facE = o.facE || "pact", facH = facE === "nato" ? "pact" : "nato", diff = o.diff || "commander";
  Game.init({ theatre: "hormuz", seed: "coastai", cash: 0, diff: diff,
    era: "e80", eraAI: "e80", eraCapHuman: "e80", eraCapAI: "e80", fog: true,
    startPos: -1, weather: "clear", factionHuman: facH, factionAI: facE,
    techHuman: 3, techAI: 3, capHuman: 3, capAI: 3, armsHuman: "all", armsAI: "all",
    superweapons: false, resources: 1, mapSize: 144, aiHandicap: 1,
    roster: [{ faction: facH, ai: false, team: 1, label: "YOU" },
             { faction: facE, ai: true, team: 2, diff: diff, personality: "balanced", label: "ENEMY" }] });
  H = Game.players[0]; E = Game.players[1];
  Game.checkVictory = function () {};
  AI.setPeace(E, true);
  E.cash = 0;
  [H, E].forEach(function (p) {
    p.units.slice().forEach(function (u) {
      var i = Game.entities.indexOf(u); if (i >= 0) Game.entities.splice(i, 1);
      u.dead = true;
    });
    p.units.length = 0;
  });
  var h = home();
  bld(E, "conyard", h);
  bld(E, "power", { x: h.x + 4, y: h.y - 3 }); bld(E, "power", { x: h.x - 4, y: h.y - 3 });
  bld(E, "power", { x: h.x + 4, y: h.y + 3 });
  var f = bld(E, "factory", { x: h.x - 5, y: h.y + 3 });
  bld(E, "lab", { x: h.x + 6, y: h.y });
  bld(E, "radar", { x: h.x - 6, y: h.y });
  E.tech = Math.max(E.tech || 0, 3);
  return !!f;
}
function tick(sec, stop) {
  var n = Math.round(sec / DT);
  for (var i = 0; i < n; i++) { Game.tick(DT); if (stop && stop()) return (i + 1) * DT; }
  return -1;
}
function isLand(x, y) { var M = Game.map; return x > 3 && y > 3 && x < M.W - 4 && y < M.H - 4 && GameMap.passable(M, x, y, "ground") && !Game.tileBlocked(x, y, null); }
function clear(x, y, w, h) { for (var i = -1; i < (w || 3); i++) for (var j = -1; j < (h || 3); j++) if (!isLand(x + i, y + j)) return false; return true; }
function spot(p, w, h) { for (var r = 0; r < 16; r++) for (var a = 0; a < 32; a++) {
  var x = Math.round(p.x + Math.cos(a / 32 * 6.283) * r), y = Math.round(p.y + Math.sin(a / 32 * 6.283) * r);
  if (clear(x, y, w, h)) return { x: x, y: y }; } return null; }
function bld(p, id, pos) {
  var d = BUILDINGS[id], s = spot(pos, d.w + 1, d.h + 1);
  var b = s ? Game.placeBuilding(p, id, s.x, s.y, true) : null; if (b) b.buildProgress = 1; return b;
}
function put(p, id, pos) {
  var u = Game.spawnUnitAt(p, id, pos.x * TT + 16, pos.y * TT + 16);
  if (!u) return null;
  u.order = { type: "idle" }; u.orders = []; u.path = null;
  return u;
}
function home() { return { x: Math.round(E.homeX / TT), y: Math.round(E.homeY / TT) }; }
function wet(x, y) { return GameMap.passable(Game.map, x, y, "sea"); }
/* how many tiles back from the nearest water (Chebyshev), up to 12 */
function depth(x, y) {
  for (var r = 0; r <= 12; r++)
    for (var dy = -r; dy <= r; dy++) for (var dx = -r; dx <= r; dx++)
      if (Math.max(Math.abs(dx), Math.abs(dy)) === r && wet(x + dx, y + dy)) return r;
  return 99;
}
/* open water nearest the commander's home: a 5 x 5 of sea, and the shore
   tile nearest it */
function seaNearHome() {
  var h = home(), best = null, bd = 1e9;
  for (var y = 6; y < Game.map.H - 6; y++) for (var x = 6; x < Game.map.W - 6; x++) {
    var d = (x - h.x) * (x - h.x) + (y - h.y) * (y - h.y);
    if (d >= bd || d < 64) continue;
    var ok = true;
    for (var j = -2; j <= 2 && ok; j++) for (var i = -2; i <= 2; i++) if (!wet(x + i, y + j)) { ok = false; break; }
    if (ok) { bd = d; best = { x: x, y: y }; }
  }
  return best;
}
function shoreBy(s) {
  var best = null, bd = 1e9;
  for (var y = s.y - 10; y <= s.y + 10; y++) for (var x = s.x - 10; x <= s.x + 10; x++) {
    if (!isLand(x, y)) continue;
    var d = (x - s.x) * (x - s.x) + (y - s.y) * (y - s.y);
    if (d < bd) { bd = d; best = { x: x, y: y }; }
  }
  return best;
}
/* open water far from the commander, near the human's home */
function seaFar() {
  var hx = Math.round(H.homeX / TT), hy = Math.round(H.homeY / TT), h = home(), best = null, bd = 1e9;
  for (var y = 6; y < Game.map.H - 6; y += 2) for (var x = 6; x < Game.map.W - 6; x += 2) {
    if ((x - h.x) * (x - h.x) + (y - h.y) * (y - h.y) < 50 * 50) continue;
    var ok = true;
    for (var j = -2; j <= 2 && ok; j++) for (var i = -2; i <= 2; i++) if (!wet(x + i, y + j)) { ok = false; break; }
    if (!ok) continue;
    var d = (x - hx) * (x - hx) + (y - hy) * (y - hy);
    if (d < bd) { bd = d; best = { x: x, y: y }; }
  }
  return best;
}
function coastals() { return E.units.filter(function (u) { return !u.dead && u.def.role === "coastssm"; }); }
function onOrder() {
  var n = 0;
  ["vehicle"].forEach(function (k) { var q = E.queues[k]; if (!q) return;
    (q.items || []).concat(q.ready || []).forEach(function (it) { var d = UNITS[it.id || it]; if (d && d.role === "coastssm") n++; }); });
  return n;
}
function dossier() { var I = AI.intelOf(E); return I && I.dossier ? I.dossier[H.idx] : null; }
function ship(pos) {
  var s = put(H, unitFor("nato", "destroyer", "e80") || "destroyer_n", pos);
  if (s) { s.stance = "hold"; s.hp = s.maxHp = 1e6; }
  return s;
}
/* the scout on the shore with the ship in its sight, two seconds */
function holdShip(sea) {
  var sh = shoreBy(sea), sc = put(E, unitFor(E.faction, "recon", "e80") || "recon_p", sh);
  if (sc) { sc.stance = "hold"; sc.hp = sc.maxHp = 1e6; }
  return sc;
}
/* a rival hull held, money in the bank, minutes of thinks: what is bought */
function buyRun(secs, stop) {
  var t0 = Game.time, got = -1;
  tick(secs, function () {
    if (E.cash < 9000) E.cash = 20000;
    if (got < 0 && (onOrder() + coastals().length) > 0) got = Game.time - t0;
    return !!stop && got >= 0;
  });
  return got;
}

function run() {
  /* ---- [1] a hull nobody of its side can see ---- */
  if (!scene()) { chk("the commander's base on hormuz", false, "no factory spot"); return; }
  var far = seaFar(), near = seaNearHome();
  if (!far || !near) { chk("open water on hormuz", false, "far " + !!far + " near " + !!near); return; }
  var s1 = ship(far);
  /* four minutes, longer than [2]'s purchase takes. The commander's own
     scouts are out meanwhile, and may find the ship honestly: what is held
     to is that no launcher is ever on order while its dossier has no hull,
     and none at all while the ship stays unseen. */
  var t0 = Game.time, early = -1, seenAt = -1;
  tick(240, function () {
    if (E.cash < 9000) E.cash = 20000;
    var d = dossier(), saw = !!(d && d.sawHull);
    if (saw && seenAt < 0) seenAt = Game.time - t0;
    if (!saw && early < 0 && onOrder() + coastals().length > 0) early = Game.time - t0;
    return false;
  });
  var d1 = dossier(), n1 = onOrder() + coastals().length;
  chk("[1] a rival destroyer on the water nothing of its side has seen: no launcher on order while the dossier has no hull, over four minutes with money in the bank",
      !!s1 && early < 0 && (seenAt >= 0 || (n1 === 0 && !Game.sideSees(E, s1))),
      "ship " + (s1 ? (Math.hypot(s1.x - E.homeX, s1.y - E.homeY) / TT).toFixed(0) + " tiles off, held now " + Game.sideSees(E, s1) : "none") +
      ", dossier hull " + (seenAt >= 0 ? "from " + seenAt.toFixed(0) + " s (its own scouts)" : "never") + ", launchers " + n1 +
      (early >= 0 ? ", one on order unseen at " + early.toFixed(1) + " s" : "") + ", card " + AI.pickOf(E, "coastssm"));
  /* the far ship off the board, the next scene's dossier starts clean */
  if (seenAt >= 0) { scene(); near = seaNearHome(); }
  else s1.dead = true;

  /* ---- [2] its scout holds a ship off its coast ---- */
  var s2 = ship(near), sc = holdShip(near);
  tick(3);
  var d2 = dossier();
  /* the commander's own build plan comes first (its refinery, then the
     haulers mineShort waits for), so its first purchase can take minutes */
  var t2 = buyRun(300, true);
  var n2 = onOrder() + coastals().length;
  var card = (E.queues.vehicle.items.concat(E.queues.vehicle.ready || []).map(function (it) { return it.id || it; })
              .concat(coastals().map(function (u) { return u.def.id; })).filter(function (id) { return UNITS[id] && UNITS[id].role === "coastssm"; })[0]) || "-";
  chk("[2] its scout holds a rival ship off its coast: the dossier says so, and one launcher of its period (a Rubezh or a Redut) goes on order",
      !!(d2 && d2.sawHull) && t2 >= 0 && n2 === 1 && (card === "pact_e80_coastssm" || card === "pact_e60_coastssm"),
      "held " + Game.sideSees(E, s2) + ", dossier hull " + !!(d2 && d2.sawHull) + " (peak " + (d2 && d2.peakSea) + ")" +
      ", on order after " + (t2 >= 0 ? t2.toFixed(1) + " s" : "never") + ", " + n2 + " in all, " + card);

  /* ---- [3] it is driven to the shore and sets up ---- */
  var L = null;
  tick(240, function () {
    if (E.cash < 9000) E.cash = 20000;
    L = coastals()[0] || null;
    return !!(L && L.deployed && !L.moving && L._coastAt);
  });
  if (!L) { chk("[3] the launcher is built", false, "none after four minutes; on order " + onOrder()); }
  else {
    var tx = (L.x / TT) | 0, ty = (L.y / TT) | 0, dp = depth(tx, ty);
    var inBase = E.inBaseRadius(tx + 0.5, ty + 0.5, CFG.BUILD_RADIUS);
    var dome = E.buildings.some(function (b) { return !b.dead && b.def.radar &&
      Math.hypot(tx + 0.5 - (b.tx + b.def.w / 2), ty + 0.5 - (b.ty + b.def.h / 2)) <= (typeof b.def.radar === "number" ? b.def.radar : 22); });
    var reach = L.weaponRange(WEAPONS[L.def.weapons[0]]), toShip = Math.hypot(L.x - s2.x, L.y - s2.y);
    var site = L._coastAt, atSite = site && Math.hypot(L.x - site.x, L.y - site.y) <= 2 * TT;
    var all = onOrder() + coastals().length;
    chk("[3] it drives to a land tile two to six tiles back from the water, on its own side (base radius or under its dome), the ship inside its reach, and sets up there, on guard; still one launcher in all",
        L.deployed && dp >= 2 && dp <= 6 && (inBase || dome) && toShip <= reach && atSite && L.stance === "guard" && all === 1,
        "at " + tx + "," + ty + ", " + dp + " tiles back from the water, in base radius " + inBase + ", under its dome " + dome +
        ", ship " + (toShip / TT).toFixed(1) + " tiles off (reach " + (reach / TT).toFixed(1) + "), deployed " + L.deployed +
        ", at its site " + atSite + ", stance " + L.stance + ", " + all + " in all, home " + (Math.hypot(L.x - E.homeX, L.y - E.homeY) / TT).toFixed(1) + " tiles");
  }

  /* ---- [6] a surface group: a second launcher, at a site of its own ---- */
  var g = [ship({ x: near.x + 1, y: near.y }), ship({ x: near.x - 1, y: near.y + 1 })];
  tick(3);
  var d6 = dossier(), L2 = null;
  tick(300, function () {
    if (E.cash < 9000) E.cash = 20000;
    var cs = coastals();
    L2 = cs.length > 1 ? cs[1] : null;
    return !!(L2 && L2.deployed && !L2.moving && L2._coastAt);
  });
  var cs6 = coastals(), n6 = onOrder() + cs6.length;
  /* site to site where both hold one. Since B6 the first launcher has not
     stood still: the ship held in [3] is never sunk, so it fires its two,
     moves off five tiles or more and sets up again, over and over, and the
     second can be given the site it has just left. What coastPick keeps is
     three tiles between the SITES; each sets up within two tiles of its own
     (driveCoastal), so two launchers' bodies can stand closer than that.
     A launcher between sites (no _coastAt: driving to be refilled) is
     measured where it is. */
  var at6 = function (u) { return u._coastAt || u; };
  var gap = cs6.length > 1 ? Math.hypot(at6(cs6[0]).x - at6(cs6[1]).x, at6(cs6[0]).y - at6(cs6[1]).y) / TT : 0;
  var dp6 = L2 ? depth((L2.x / TT) | 0, (L2.y / TT) | 0) : -1;
  chk("[6] three hulls held at once: a second launcher, and no third; it sets up at a site of its own, three tiles or more from the first's and two to six back from the water",
      !!(d6 && d6.peakSea >= 3) && n6 === 2 && !!L2 && L2.deployed && gap >= 2.5 && dp6 >= 2 && dp6 <= 6,
      "peak held " + (d6 && d6.peakSea) + ", " + n6 + " in all, the second " + (L2 ? "deployed " + L2.deployed + ", " + dp6 + " tiles back" : "none") +
      ", its site " + gap.toFixed(1) + " tiles from the first's");
  g.forEach(function (u) { if (u) u.dead = true; });

  /* ---- [4] an army with no row ---- */
  scene({ facE: "fra" });
  near = seaNearHome();
  var s4 = ship(near); holdShip(near);
  tick(3);
  var d4 = dossier(), t4 = buyRun(240);
  chk("[4] a French commander holds the same ship and buys no launcher: its army has none",
      !!(d4 && d4.sawHull) && t4 < 0 && AI.pickOf(E, "coastssm") === null,
      "dossier hull " + !!(d4 && d4.sawHull) + ", launchers " + (onOrder() + coastals().length) + ", card " + AI.pickOf(E, "coastssm"));

  /* ---- [5] a Recruit ---- */
  scene({ diff: "recruit" });
  near = seaNearHome();
  ship(near); holdShip(near);
  tick(3);
  var d5 = dossier(), t5 = buyRun(240);
  chk("[5] a Recruit commander (no navy programme) holds the same ship and buys none",
      !!(d5 && d5.sawHull) && t5 < 0,
      "dossier hull " + !!(d5 && d5.sawHull) + ", launchers " + (onOrder() + coastals().length));

  afterLaunch();
}

/* a Rubezh of the commander's, put down at tile `at`, hard to kill (the
   destroyer is on hold, but its guns still answer) */
function rubezh(at) {
  var u = put(E, "pact_e80_coastssm", at);
  if (u) { u.hp = u.maxHp = 1e6; }
  return u;
}
function atSite(u) { return !!(u && u._coastAt && Math.hypot(u.x - u._coastAt.x, u.y - u._coastAt.y) <= 2 * TT); }
function settled(u) { return !!(u && u.deployed && !u.moving && atSite(u)); }
function tileOf(u) { return { x: (u.x / TT) | 0, y: (u.y / TT) | 0 }; }
/* land two to six tiles back from the water, ground-reachable from home and
   further than `clearOf` tiles from every structure of the commander's: out
   of its base's radius (CFG.BUILD_RADIUS), so out of supply */
function shoreOutOfSupply(clearOf) {
  var h = home(), best = null, bd = 1e9;
  for (var y = 6; y < Game.map.H - 6; y++) for (var x = 6; x < Game.map.W - 6; x++) {
    var d = (x - h.x) * (x - h.x) + (y - h.y) * (y - h.y);
    if (d >= bd || !clear(x, y, 1, 1)) continue;
    var dp = depth(x, y);
    if (dp < 2 || dp > 6) continue;
    var near = E.buildings.some(function (b) { return !b.dead && Math.hypot(x + 0.5 - (b.tx + b.def.w / 2), y + 0.5 - (b.ty + b.def.h / 2)) <= clearOf; });
    if (near || !Path.reachable(Game.map, h.x, h.y, x, y, "ground")) continue;
    bd = d; best = { x: x, y: y };
  }
  return best;
}

function afterLaunch() {
  /* ---- [7] it fires, the salvo is over, it moves off ---- */
  scene();
  var near = seaNearHome(), s7 = ship(near);
  holdShip(near);
  tick(3);
  var h = home(), L = rubezh({ x: h.x + 2, y: h.y + 5 });
  if (!L) { chk("[7] a Rubezh put down at home", false, "no spot"); return; }
  /* wherever it first sets up - its site, or the spot it was put down on
     if the ship is in reach from there - it fires */
  var tFire = tick(150, function () { return L.rounds < L.roundsMax; });
  var from = { x: L.x, y: L.y }, rd = L.rounds, ft = tileOf(L);
  /* the ship gone: nothing held in reach, so the engagement ends */
  s7.dead = true;
  var tOff = tFire < 0 ? -1 : tick(150, function () {
    return settled(L) && Math.hypot(L.x - from.x, L.y - from.y) >= 5 * TT;
  });
  var t7 = tileOf(L), dp7 = depth(t7.x, t7.y), off = Math.hypot(L.x - from.x, L.y - from.y) / TT;
  chk("[7] set up, it launches at the held ship; the ship gone, it drives to another site five tiles or more from the one it fired from (two to six back from the water) and sets up again, on guard",
      tFire >= 0 && tOff >= 0 && L.deployed && off >= 5 && dp7 >= 2 && dp7 <= 6 && L.stance === "guard",
      "first launch after " + (tFire >= 0 ? tFire.toFixed(1) + " s at " + ft.x + "," + ft.y + " (" + rd + " of " + L.roundsMax + " left)" : "never") +
      ", set up again " + (tOff >= 0 ? tOff.toFixed(1) + " s after the ship went" : "never") + " at " + t7.x + "," + t7.y +
      ", " + off.toFixed(1) + " tiles from the firing point, " + dp7 + " back from the water, deployed " + L.deployed + ", stance " + L.stance);

  /* ---- [7b] the whole salvo away at a hull still held: it moves off ----
     The same launcher, a fresh hull held off the same coast and left
     there: it fires what it has, is empty, fills (in the base's radius, or
     by driving for it) and leaves the site it emptied its magazine from
     with the hull still held, for one five tiles or more away. */
  /* launches counted off the rail's reload clock, every tick: a site in
     the base's radius refills a round in two seconds, so the magazine of
     two is never seen empty there */
  var s7b = ship(near), from2 = null, shots = 0, cd0 = L.cooldowns[0];
  var tOff2 = tick(240, function () {
    if (L.cooldowns[0] > cd0 + 1e-3) { shots++; if (!from2) from2 = { x: L.x, y: L.y }; }
    cd0 = L.cooldowns[0];
    return shots >= L.roundsMax && from2 && settled(L) && Math.hypot(L.x - from2.x, L.y - from2.y) >= 5 * TT;
  });
  var t7b = tileOf(L), off2 = from2 ? Math.hypot(L.x - from2.x, L.y - from2.y) / TT : 0;
  chk("[7b] a hull held and left there: it fires all it carries (a magazine's worth of launches from the one site), and moves off five tiles or more from where it fired, the hull still held, and sets up again",
      tOff2 >= 0 && !s7b.dead && Game.sideSees(E, s7b) && off2 >= 5 && L.deployed,
      "fired from " + (from2 ? ((from2.x / TT) | 0) + "," + ((from2.y / TT) | 0) : "nowhere") + ", " + shots + " launches" +
      ", set up again " + (tOff2 >= 0 ? tOff2.toFixed(1) + " s on" : "never") + " at " + t7b.x + "," + t7b.y + ", " + off2.toFixed(1) + " tiles off" +
      ", rounds " + L.rounds + "/" + L.roundsMax + ", hull still held " + Game.sideSees(E, s7b));
  s7b.dead = true;

  /* ---- [8] dry out of supply: to the base, filled, back to the coast ---- */
  scene();
  near = seaNearHome();
  ship(near); holdShip(near);
  tick(3);
  var at8 = shoreOutOfSupply(CFG.BUILD_RADIUS + 2);
  if (!at8) { chk("[8] a stretch of shore out of supply on hormuz", false, "none found"); }
  else {
    var L8 = rubezh(at8);
    var out0 = L8 ? !L8.inSupply() : false;
    /* it has just fired its last: the magazine empty and the rail's reload
       clock running, as tryFire leaves them */
    if (L8) { L8.rounds = 0; L8.cooldowns[0] = 20; }
    var dry = L8 ? { x: L8.x, y: L8.y } : null, tIn = -1, inAt = null, tFull = -1, gone = 0;
    var t8 = !L8 ? -1 : tick(300, function () {
      if (L8.moving && Math.hypot(L8.x - dry.x, L8.y - dry.y) > gone) gone = Math.hypot(L8.x - dry.x, L8.y - dry.y);
      if (tIn < 0 && L8.inSupply()) { tIn = Game.time; inAt = tileOf(L8); }
      if (tFull < 0 && L8.rounds >= L8.roundsMax) tFull = Game.time;
      return tFull >= 0 && settled(L8);
    });
    var e8 = L8 ? tileOf(L8) : { x: 0, y: 0 }, dp8 = depth(e8.x, e8.y);
    var back = L8 ? Math.hypot(L8.x - dry.x, L8.y - dry.y) / TT : 0;
    chk("[8] dry on a stretch of shore out of supply, it drives for its base, comes into supply and fills its magazine there, then goes back to a coastal site five tiles or more from where it was dry, and sets up",
        !!L8 && out0 && tIn >= 0 && tFull >= tIn && t8 >= 0 && L8.rounds === L8.roundsMax && L8.deployed &&
        dp8 >= 2 && dp8 <= 6 && back >= 5,
        "dry at " + at8.x + "," + at8.y + " (out of supply " + out0 + ", " + depth(at8.x, at8.y) + " back from the water)" +
        ", in supply " + (tIn >= 0 ? "at " + inAt.x + "," + inAt.y : "never") +
        ", full " + (tFull >= 0 ? (tFull - tIn).toFixed(1) + " s after" : "never") +
        ", set up again " + (t8 >= 0 ? "at " + e8.x + "," + e8.y + ", " + dp8 + " back from the water, " + back.toFixed(1) + " tiles from where it was dry" : "never") +
        ", rounds " + (L8 ? L8.rounds + "/" + L8.roundsMax : "-"));
  }

  /* ---- [9] the Garpun and the emission-control drill ---- */
  scene();
  h = home();
  var L9 = rubezh({ x: h.x + 2, y: h.y + 6 });
  var sam = put(E, unitFor("pact", "sam", "e80") || "sam_p", { x: h.x + 4, y: h.y + 6 });
  var wz = put(H, unitFor("nato", "sead", "e80") || "sead_n", { x: h.x + 3, y: h.y + 8 });
  if (!L9 || !sam || !wz) { chk("[9] a Rubezh, a SAM and a Weasel", false, "rubezh " + !!L9 + " sam " + !!sam + " weasel " + !!wz); return; }
  [L9, sam].forEach(function (u) { u.stance = "hold"; u.hp = u.maxHp = 1e6; });
  wz.parked = false; wz.order = { type: "hover" }; wz.fuel = wz.fuelMax; wz.ammo = wz.ammoMax; wz.stance = "hold"; wz.hp = wz.maxHp = 1e6;
  tick(1);
  L9.deployed = true; sam.deployed = true;
  var seen = Game.visibleTo(E, wz), heard = !!(Game.esmPlot(H) && Game.esmPlot(H).has(L9.id));
  AI.emconPass(E);
  var samDark = Game.radarDark(sam), lit = !Game.radarDark(L9) && Game.emitting(L9);
  var lock = Game.armLock(L9), named = wz.seadTarget(true) === L9;
  chk("[9] a Weasel in its crew's sight: the drill takes the SAM beside it dark and leaves the Garpun on the air - no anti-radiation round can home on a sea set (G.armLock, seadTarget), though the Weasel's receiver hears it",
      seen && samDark && lit && !lock && !named,
      "Weasel " + wz.def.id + " seen " + seen + ", SAM " + sam.def.id + " dark " + samDark + ", Garpun lit " + lit +
      ", heard by the Weasel's side " + heard + ", ARM lock " + lock + ", Weasel's own pick the Rubezh " + named);
}
