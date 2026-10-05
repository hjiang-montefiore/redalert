/* tools/jsc/fallback_check.js - a nearly dead wave member steps out of the
   fight to be mended and comes back (ai.js FALLBACK), checked on the real
   game under JavaScriptCore, 3D off.

     python3 tools/jsc/run.py index.html --test tools/jsc/fallback_check.js

   Every scene is a fresh Game.init: a human seat (NATO) that nobody drives
   and a Pact commander held at peace (AI.setPeace - it launches nothing of
   its own, but its clocks, its picture and FALLBACK all run), with every
   unit of both sides taken off the board and the commander's bank emptied,
   so what moves is what the scene put down. Wave members are stood in the
   commander's own wave lists (AI.wavesOf). "Being shot" is the unit's own
   bar and its lastHitAt, which is what the commander reads of it; the one
   scene that needs a target to shoot (the finishing shot) uses a real one.

     1. A tank at a quarter of its bar, hit a moment ago, in a wave with a
        recovery vehicle: it leaves the wave for the workshop, is mended in
        its bubble, and rejoins the wave at 0.85; its healthy wave-mates, one
        at 0.6 (inside the band between the two lines) and one under the
        line that nothing is shooting at, stay put.
     2. No oscillation: back in the wave it is not sent out again in the band
        (0.6, hit), not inside its eight-second cool-down even under the
        line, and goes again once that is over - one decision per episode.
        The quiet one is asked again no more than once in two seconds.
     3. The player's own damaged tank beside the workshop is never touched.
     4. A rifle squad goes to a medic, is treated, and rejoins.
     5. A destroyer goes to the tender at 0.30 (the line is 0.50 afloat), is
        mended alongside and rejoins its group; with no tender, to the naval
        yard.
     6. With no recovery vehicle, a tank goes to the service depot's pad.
     7. A tank firing on a target it is about to kill finishes it first.
     8. A meeting point in known fire is pulled back out of it, and a first
        leg past known guns takes a bearing round them.
     9. Recruit does not do it; P.aiOff "fallback" switches it off; with
        nothing anywhere that can mend a tank, nothing happens and nothing
        throws.
    10. The wave's book follows the hull (review): stepping out reads level,
        a death on the road reads as the same death in the line would, and
        so do wounds taken on the road by a hull that is then mended and
        rejoins. Scene 1 checks the rejoin the same way. A hull dragged off
        its berth late in the mending is put back on it, not let go.
    11. (review) The finishing shot is read off the picture: a gun firing on
        a target the commander has never seen does not wait to finish it. */
/* TT, not T: config.js owns the global T (the terrain table) */
var PASS = 0, FAIL = 0, TT = 32, DT = 1 / 30;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "fulda"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-seed", "fbcheck"); set("opt-fog", "1"); set("opt-3d", "0");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

/* ------------------------------------------------------------ the scene */
var H = null, E = null;
function scene(map, diff) {
  Game.init({ theatre: map, seed: "fbcheck", cash: 0, diff: diff,
    era: "e20", eraAI: "e20", eraCapHuman: "e20", eraCapAI: "e20", fog: true,
    startPos: -1, weather: "clear", factionHuman: "nato", factionAI: "pact",
    techHuman: 3, techAI: 3, capHuman: 3, capAI: 3, armsHuman: "all", armsAI: "all",
    superweapons: false, resources: 1, mapSize: 144, aiHandicap: 1,
    roster: [{ faction: "nato", ai: false, team: 1, label: "YOU" },
             { faction: "pact", ai: true, team: 2, diff: diff, personality: "balanced", label: "ENEMY" }] });
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
  return !!AI.wavesOf(E);
}
function tick(sec) { var n = Math.round(sec / DT); for (var i = 0; i < n; i++) Game.tick(DT); }
/* tick until f() is true or `sec` runs out; returns the seconds it took, or -1 */
function until(sec, f, each) {
  var t0 = Game.time;
  for (var i = 0; i < sec * 30; i++) { if (f()) return Game.time - t0; if (each) each(); Game.tick(DT); }
  return f() ? Game.time - t0 : -1;
}
/* the middle of a square of open ground (or open water) `r` tiles across
   each way, at least `far` tiles from both start positions */
function arena(layer, r, far) {
  var M = Game.map, best = null, bd = Infinity;
  for (var y = r + 2; y < M.H - r - 2; y += 2) for (var x = r + 2; x < M.W - r - 2; x += 2) {
    if (Math.hypot(x - H.homeX / TT, y - H.homeY / TT) < far || Math.hypot(x - E.homeX / TT, y - E.homeY / TT) < far) continue;
    var d = Math.hypot(x - M.W / 2, y - M.H / 2);
    if (d >= bd) continue;
    var ok = true;
    for (var j = -r; j <= r && ok; j++) for (var i = -r; i <= r; i++)
      if (!GameMap.passable(M, x + i, y + j, layer) || Game.tileBlocked(x + i, y + j, null)) { ok = false; break; }
    if (ok) { best = { x: x, y: y }; bd = d; }
  }
  return best;
}
function put(p, id, tx, ty) {
  var u = Game.spawnUnitAt(p, id, tx * TT + 16, ty * TT + 16);
  if (u) { u.order = { type: "idle" }; u.orders = []; u.path = null; }
  return u;
}
function W() { return AI.wavesOf(E); }
function inList(l, u) { return l.indexOf(u) >= 0; }
function fb() { return AI.intelOf(E).engage.fallback; }
function hurt(u, f) { u.hp = u.maxHp * f; u.lastHitAt = Game.time; }
function tiles(a, b) { return Math.round(U.dist(a.x, a.y, b.x, b.y) / TT * 10) / 10; }
function frac(u) { return Math.round(u.hp / u.maxHp * 100) / 100; }
/* hit points still standing in the ground wave, as waveSpent() counts them */
function waveHp() { var h = 0; W().ground.forEach(function (u) { if (!u.dead) h += u.hp; }); return h; }
function spent() { return AI.intelOf(E).engage.spent; }

function run() {
  groundArv();
  infantryMedic();
  shipTender();
  shipYard();
  groundDepot();
  finishFirst();
  pictureRoutes();
  switchedOff();
  bookFollows();
  finishUnseen();
}

/* ---- 1-3: tank, recovery vehicle, hysteresis, the player's own tank ---- */
function groundArv() {
  log("\n[1] a tank at a quarter of its bar steps back to the recovery vehicle and rejoins");
  if (!scene("fulda", "commander")) { chk("the commander is raised", false); return; }
  var C = arena("ground", 9, 40);
  if (!C) { chk("open ground for the scene", false); return; }
  var mbt = AI.pickOf(E, "mbt"), arvId = AI.pickOf(E, "repair");
  var tanks = [0, 1, 2, 3].map(function (i) { return put(E, mbt, C.x - 3 + i * 2, C.y); });
  var arv = put(E, arvId, C.x, C.y + 6);
  /* the player's tank: as badly hurt, as recently hit, out of the
     commander's sight so it is no part of its picture either */
  var mine = put(H, AI.pickOf(H, "mbt") || "mbt_n", C.x, C.y - 9);
  chk("the scene is laid down", tanks.every(Boolean) && !!arv && !!mine && !!(arv && arv.def.repairRate),
      "mbt " + mbt + ", arv " + arvId + " at (" + C.x + "," + C.y + ")");
  if (!arv || !mine || !tanks.every(Boolean)) return;
  tanks.forEach(function (u) { u.stance = "hold"; W().ground.push(u); });
  mine.stance = "hold"; mine.order = { type: "guard" }; mine.guardX = mine.x; mine.guardY = mine.y;
  var mx = mine.x, my = mine.y, mo = mine.order;
  /* booked as a launch books it, and past the twelve seconds waveSpent()
     waits before it reads anything */
  W().book();
  tick(13);
  var A = tanks[0], B = tanks[1], Q = tanks[2], Z = tanks[3];
  hurt(A, 0.25); hurt(B, 0.6); Q.hp = Q.maxHp * 0.2; Q.lastHitAt = -100;
  var out0 = fb().out, calm0 = fb().calm, t0 = Game.time;
  /* the book as it stands before anybody leaves: waveSpent() is 1 - hp/book */
  var spent0 = AI.intelOf(E).engage.spent, book0 = waveHp() / (1 - spent0);
  var left = until(2, function () { return inList(W().mending, A); }, function () { hurt(mine, 0.2); });
  var spent1 = AI.intelOf(E).engage.spent;
  chk("the tank under the line steps out within one fallback pass", left >= 0 && !inList(W().ground, A),
      "after " + left.toFixed(2) + " s, line " + fb().leave);
  chk("...on a move order, to the recovery vehicle", A.order.type === "move" && fb().arv === 1 && fb().out === out0 + 1,
      "order " + A.order.type + ", arv " + fb().arv);
  chk("...and the workshop holds a meeting point for it", !!arv._fbAt, arv._fbAt ? "meet " + tiles(arv._fbAt, arv) + " tiles from it" : "none");
  chk("the healthy one, the one in the band (0.6) and the quiet one under the line stay in the wave",
      [B, Q, Z].every(function (u) { return inList(W().ground, u) && !inList(W().mending, u); }),
      "B " + frac(B) + " Q " + frac(Q) + " Z " + frac(Z));
  chk("stepping out is not a loss: the wave reads as spent as it did the moment before",
      spent0 > 0.2 && Math.abs(spent1 - spent0) < 0.005, "waveSpent " + spent0 + " -> " + spent1);
  var minD = 1e9, hp0 = A.hp;
  var back = until(90, function () { return inList(W().ground, A); },
                   function () { minD = Math.min(minD, tiles(A, arv)); hurt(mine, 0.2); });
  chk("it reaches the workshop's bubble", minD <= 2.2, "closest " + minD + " tiles");
  chk("it is mended there and rejoins the wave at 0.85", back >= 0 && frac(A) >= 0.85 && fb().mended === 1 && fb().back === 1,
      "rejoined after " + back.toFixed(1) + " s at " + frac(A) + " (from " + Math.round(hp0 / A.maxHp * 100) / 100 + ")");
  var spent2 = AI.intelOf(E).engage.spent, want2 = Math.round((1 - waveHp() / book0) * 1000) / 1000;
  chk("...on an attack-move back to the wave, and the workshop is released",
      A.order.type === "attackmove" && !arv._fbAt, "order " + A.order.type);
  chk("...and the trip leaves the book as it found it: rejoined, the wave reads what it would with the tank mended in the line",
      back >= 0 && Math.abs(spent2 - want2) < 0.005, "waveSpent " + spent2 + ", in the line " + want2);
  var calls = fb().calm - calm0, secs = Game.time - t0;
  chk("the quiet one under the line is asked again no more than once in two seconds",
      calls >= 1 && calls <= Math.ceil(secs / 2) + 1, calls + " asks in " + secs.toFixed(1) + " s");

  log("\n[2] no oscillation round the lines");
  var outN = fb().out;
  /* straight back under the line, under fire, the moment it has rejoined */
  var again = until(14, function () { return fb().out > outN; }, function () { hurt(A, 0.25); });
  chk("back in the wave and under the line again at once, it waits out its eight-second cool-down, then goes",
      again >= 7.4 && again <= 9.2 && fb().out === outN + 1, "went " + again.toFixed(1) + " s after it rejoined");
  back = until(90, function () { return inList(W().ground, A); });
  chk("...and comes back mended a second time", back >= 0 && fb().back === 2, "after " + back.toFixed(1) + " s");
  outN = fb().out;
  /* in the band between the lines, under fire, for twelve seconds */
  until(12, function () { return false; }, function () { hurt(A, 0.6); });
  chk("in the band between the lines (0.6), under fire, it stays in the wave", inList(W().ground, A) && fb().out === outN,
      "out " + (fb().out - outN));

  log("\n[3] the player's own units are the player's");
  chk("the player's damaged, freshly hit tank is never given an order",
      mine.order === mo && U.dist(mine.x, mine.y, mx, my) < TT * 0.5 && !mine._fb &&
      !inList(W().mending, mine) && !inList(W().ground, mine),
      "order " + mine.order.type + ", moved " + tiles(mine, { x: mx, y: my }) + " tiles");
}

/* ---- 4: squad and medic ---- */
function infantryMedic() {
  log("\n[4] a rifle squad steps back to a medic");
  if (!scene("fulda", "commander")) return;
  var C = arena("ground", 7, 40);
  var rid = AI.pickOf(E, "rifle"), mid = AI.pickOf(E, "medic") || "medic";
  var sq = [0, 1, 2].map(function (i) { return put(E, rid, C.x - 2 + i * 2, C.y); });
  var med = put(E, mid, C.x, C.y + 5);
  chk("the squads and the medic are laid down", sq.every(Boolean) && !!med && !!(med && med.def.heal), "rifle " + rid + ", medic " + mid);
  if (!med || !sq.every(Boolean)) return;
  sq.forEach(function (u) { u.stance = "hold"; W().ground.push(u); });
  tick(1);
  var A = sq[0];
  hurt(A, 0.2);
  var left = until(2, function () { return inList(W().mending, A); });
  chk("the squad under the line steps out to the medic", left >= 0 && fb().medic === 1, "medic " + fb().medic);
  var minD = 1e9;
  var back = until(60, function () { return inList(W().ground, A); }, function () { minD = Math.min(minD, tiles(A, med)); });
  chk("it is treated in the medic's reach and rejoins", back >= 0 && minD <= 2.2 && frac(A) >= 0.85,
      "closest " + minD + " tiles, rejoined after " + back.toFixed(1) + " s at " + frac(A));
  chk("its wave-mates stay", inList(W().ground, sq[1]) && inList(W().ground, sq[2]));
}

/* ---- 5: ships ---- */
function shipTender() {
  log("\n[5a] a destroyer steps back to the tender");
  if (!scene("hormuz", "commander")) return;
  var C = arena("sea", 8, 30);
  if (!C) { chk("open water for the scene", false); return; }
  var did = AI.pickOf(E, "destroyer"), tid = AI.pickOf(E, "repair_sea");
  var ships = [0, 1, 2].map(function (i) { return put(E, did, C.x - 3 + i * 3, C.y); });
  var ten = put(E, tid, C.x, C.y + 6);
  chk("the group and its tender are afloat", ships.every(Boolean) && !!ten && ten.layer === "sea",
      "destroyer " + did + ", tender " + tid + " at (" + C.x + "," + C.y + ")");
  if (!ten || !ships.every(Boolean)) return;
  ships.forEach(function (u) { u.stance = "hold"; W().naval.push(u); });
  tick(1);
  var A = ships[0], B = ships[1];
  hurt(B, 0.55);
  hurt(A, 0.3);
  var left = until(2, function () { return inList(W().mending, A); });
  chk("the hull at 0.30 steps out to the tender (the line is " + (fb().leave + 0.15).toFixed(2) + " afloat)",
      left >= 0 && fb().tender === 1 && !inList(W().naval, A), "tender " + fb().tender);
  chk("the one at 0.55 stays with the group", inList(W().naval, B) && !inList(W().mending, B));
  var minD = 1e9;
  var back = until(120, function () { return inList(W().naval, A); }, function () { minD = Math.min(minD, tiles(A, ten)); });
  chk("it is mended alongside and rejoins the group", back >= 0 && minD <= 2.2 && frac(A) >= 0.85 && fb().back === 1,
      "closest " + minD + " tiles, rejoined after " + back.toFixed(1) + " s at " + frac(A));
}
function shipYard() {
  log("\n[5b] with no tender, the naval yard");
  if (!scene("hormuz", "commander")) return;
  var C = arena("sea", 8, 30);
  if (!C) return;
  /* a yard on the nearest shore that has room for it, within twenty tiles */
  var M = Game.map, yard = null;
  for (var R = 9; R < 22 && !yard; R++) for (var a = 0; a < 48 && !yard; a++) {
    var x = (C.x + Math.cos(a / 48 * 6.283) * R) | 0, y = (C.y + Math.sin(a / 48 * 6.283) * R) | 0, land = true, wet = false;
    for (var j = 0; j < 3; j++) for (var i = 0; i < 3; i++)
      if (!GameMap.passable(M, x + i, y + j, "ground") || Game.tileBlocked(x + i, y + j, null)) land = false;
    for (var j2 = -1; j2 <= 3; j2++) for (var i2 = -1; i2 <= 3; i2++) if (GameMap.passable(M, x + i2, y + j2, "sea")) wet = true;
    if (land && wet) yard = Game.placeBuilding(E, "navalyard", x, y, true);
  }
  chk("a naval yard on the shore by the scene", !!yard, yard ? tiles(yard, { x: C.x * TT, y: C.y * TT }) + " tiles off" : "no shore");
  if (!yard) return;
  E.cash = 20000;
  var did = AI.pickOf(E, "destroyer");
  var ships = [0, 1].map(function (i) { return put(E, did, C.x - 2 + i * 4, C.y); });
  ships.forEach(function (u) { u.stance = "hold"; W().naval.push(u); });
  tick(1);
  var A = ships[0];
  hurt(A, 0.3);
  var left = until(2, function () { return inList(W().mending, A); });
  chk("the hull steps out to the yard", left >= 0 && fb().yard === 1, "yard " + fb().yard);
  var minD = 1e9;
  var done = until(120, function () { return !inList(W().mending, A); }, function () { minD = Math.min(minD, tiles(A, yard)); });
  chk("it is mended at the yard and released", done >= 0 && minD <= 4.6 && frac(A) >= 0.85 && fb().mended === 1,
      "closest " + minD + " tiles, released after " + done.toFixed(1) + " s at " + frac(A) + ", back " + fb().back + " pool " + fb().pool);
}

/* ---- 6: depot ---- */
function groundDepot() {
  log("\n[6] with no recovery vehicle, the service depot");
  if (!scene("fulda", "commander")) return;
  var C = arena("ground", 9, 40);
  var dep = room(E, "depot", C.x + 14, C.y + 4) || room(E, "depot", C.x - 14, C.y - 4);
  chk("a service depot near the scene", !!dep, dep ? tiles(dep, { x: C.x * TT, y: C.y * TT }) + " tiles off" : "no room");
  if (!dep) return;
  E.cash = 20000;
  var mbt = AI.pickOf(E, "mbt");
  var tanks = [0, 1, 2].map(function (i) { return put(E, mbt, C.x - 2 + i * 2, C.y); });
  tanks.forEach(function (u) { u.stance = "hold"; W().ground.push(u); });
  tick(1);
  var A = tanks[0];
  hurt(A, 0.25);
  var left = until(2, function () { return inList(W().mending, A); });
  chk("the tank steps out to the depot", left >= 0 && fb().depot === 1, "depot " + fb().depot);
  var minD = 1e9;
  var back = until(90, function () { return !inList(W().mending, A); }, function () { minD = Math.min(minD, tiles(A, dep)); });
  chk("it is mended on the pad and comes back to the wave", back >= 0 && minD <= 2.4 && frac(A) >= 0.85 && inList(W().ground, A),
      "closest " + minD + " tiles, back after " + back.toFixed(1) + " s at " + frac(A));
}

/* ---- 7: the finishing shot ---- */
function finishFirst() {
  log("\n[7] a target about to die is finished first");
  if (!scene("fulda", "commander")) return;
  var C = arena("ground", 9, 40);
  var mbt = AI.pickOf(E, "mbt"), arvId = AI.pickOf(E, "repair");
  var tanks = [0, 1].map(function (i) { return put(E, mbt, C.x - 1 + i * 2, C.y); });
  var arv = put(E, arvId, C.x, C.y + 6);
  var foe = put(H, AI.pickOf(H, "ifv") || "ifv_n", C.x - 1, C.y - 4);
  if (!foe || !arv || !tanks.every(Boolean)) { chk("the scene is laid down", false); return; }
  tanks.forEach(function (u) { u.stance = "hold"; W().ground.push(u); });
  foe.stance = "hold";
  tick(1);
  var A = tanks[0];
  /* one round from dead, and the gun a second and a half from ready, so
     the commander's pass comes while the round is still to be fired */
  foe.hp = 40;
  A.order = { type: "attack", target: foe };
  for (var i = 0; i < A.cooldowns.length; i++) A.cooldowns[i] = 1.5;
  hurt(A, 0.25);
  var f0 = fb().finish;
  tick(0.8);
  chk("it holds its place and fires (finish counted, not out)", fb().finish > f0 && !inList(W().mending, A),
      "finish " + (fb().finish - f0) + ", target " + (foe.dead ? "dead" : Math.round(foe.hp) + " hp"));
  var left = until(10, function () { return inList(W().mending, A); }, function () { if (!A._fb) A.lastHitAt = Game.time; });
  chk("...and steps out once the target is dead", foe.dead && left >= 0, "target " + (foe.dead ? "dead" : "alive") + ", out after " + left.toFixed(1) + " s");
}

/* ---- 8: the picture: a meeting point out of fire, a road round it ---- */
function pictureRoutes() {
  log("\n[8] the meeting point and the road out are read off the picture");
  if (!scene("fulda", "commander")) return;
  var C = arena("ground", 9, 40);
  var hx = E.homeX / TT - C.x, hy = E.homeY / TT - C.y, hl = Math.hypot(hx, hy);
  hx /= hl; hy /= hl;                                   // towards the commander's home
  var px = -hy, py = hx;                                // across it
  var mbt = AI.pickOf(E, "mbt"), arvId = AI.pickOf(E, "repair"), foeId = AI.pickOf(H, "mbt") || "mbt_n";
  /* a: the workshop stands four tiles from three enemy tanks it has seen */
  var tanks = [0, 1].map(function (i) { return put(E, mbt, Math.round(C.x + px * (i * 2 - 1)), Math.round(C.y + py * (i * 2 - 1))); });
  var ax = Math.round(C.x + px * 7), ay = Math.round(C.y + py * 7);
  var arv = put(E, arvId, ax, ay);
  var foes = [0, 1, 2].map(function (i) { return put(H, foeId, Math.round(ax + px * 4 + hx * (i - 1)), Math.round(ay + py * 4 + hy * (i - 1))); });
  if (!arv || !foes.every(Boolean) || !tanks.every(Boolean)) { chk("the scene is laid down", false); return; }
  foes.forEach(function (f) { f.stance = "hold"; });
  tanks.forEach(function (u) { u.stance = "hold"; W().ground.push(u); });
  tick(2);
  var seen = foes.filter(function (f) { return !!AI.sightingOf(E, f.id); }).length;
  chk("the commander has the enemy tanks on its plot", seen === 3, seen + " of 3");
  var A = tanks[0];
  hurt(A, 0.25);
  var left = until(2, function () { return inList(W().mending, A); });
  var meet = arv._fbAt, dFoe = meet ? Math.min.apply(null, foes.map(function (f) { return tiles(meet, f); })) : -1;
  chk("the workshop's meeting point is pulled back out of their reach", left >= 0 && fb().hot === 1 && dFoe >= 6,
      "hot " + fb().hot + ", meeting point " + dFoe + " tiles from the nearest (workshop stood " +
      Math.min.apply(null, foes.map(function (f) { return tiles(arv, f); })) + ")");
  var minD = 1e9;
  var back = until(90, function () { return !inList(W().mending, A); }, function () { minD = Math.min(minD, tiles(A, arv)); });
  chk("...and the tank is mended there", back >= 0 && minD <= 2.2 && frac(A) >= 0.85, "closest " + minD + ", " + frac(A));

  /* b: three seen enemy tanks five tiles up the straight road to the depot */
  if (!scene("fulda", "commander")) return;
  C = arena("ground", 10, 40);
  hx = E.homeX / TT - C.x; hy = E.homeY / TT - C.y; hl = Math.hypot(hx, hy); hx /= hl; hy /= hl; px = -hy; py = hx;
  var dep = room(E, "depot", C.x + hx * 14, C.y + hy * 14);
  var B = put(E, mbt, C.x, C.y), B2 = put(E, mbt, Math.round(C.x - px * 2), Math.round(C.y - py * 2));
  var block = [-1, 0, 1].map(function (i) { return put(H, foeId, Math.round(C.x + hx * 5 + px * i), Math.round(C.y + hy * 5 + py * i)); });
  if (!B || !dep || !block.every(Boolean)) { chk("the second scene is laid down", false, dep ? "" : "no room for a depot"); return; }
  E.cash = 20000;
  block.forEach(function (f) { f.stance = "hold"; });
  [B, B2].forEach(function (u) { u.stance = "hold"; W().ground.push(u); });
  tick(2);
  hurt(B, 0.25);
  var r0 = fb().route;
  left = until(2, function () { return inList(W().mending, B); });
  var leg = B.order, off = -1;
  if (leg && leg.type === "move") {
    var bx = (leg.x - B.x) / TT, by = (leg.y - B.y) / TT, bl = Math.hypot(bx, by) || 1;
    var dx = (dep.x - B.x) / TT, dy = (dep.y - B.y) / TT, dl = Math.hypot(dx, dy) || 1;
    off = Math.round(Math.acos(U.clamp((bx * dx + by * dy) / bl / dl, -1, 1)) * 180 / Math.PI);
  }
  chk("the first leg to the depot takes a bearing round them, not the straight road", left >= 0 && fb().route === r0 + 1 && off >= 30,
      "route " + (fb().route - r0) + ", first leg " + off + " degrees off the straight road, then " +
      ((B.orders || []).length ? "on to the depot" : "nothing queued"));
  var dd = until(60, function () { return U.dist(B.x, B.y, dep.x, dep.y) <= 2.4 * TT; });
  chk("...and it gets there", dd >= 0, "after " + dd.toFixed(1) + " s");
}
/* a building of `id` for `p` on clear ground as near (x, y) as there is */
function room(p, id, x, y) {
  var M = Game.map, d = BUILDINGS[id];
  for (var R = 0; R < 8; R++) for (var a = 0; a < 32; a++) {
    var tx = Math.round(x + Math.cos(a / 32 * 6.283) * R), ty = Math.round(y + Math.sin(a / 32 * 6.283) * R), ok = true;
    for (var j = -1; j <= d.h; j++) for (var i = -1; i <= d.w; i++)
      if (!GameMap.passable(M, tx + i, ty + j, "ground") || Game.tileBlocked(tx + i, ty + j, null)) ok = false;
    if (ok) return Game.placeBuilding(p, id, tx, ty, true);
  }
  return null;
}

/* ---- 10: the book follows the hull ---- */
function bookFollows() {
  log("\n[10] the wave's book follows the hull: a death on the road, and wounds taken on it");
  if (!scene("fulda", "commander")) return;
  var C = arena("ground", 9, 40);
  var mbt = AI.pickOf(E, "mbt"), arvId = AI.pickOf(E, "repair");
  var tanks = [0, 1, 2, 3].map(function (i) { return put(E, mbt, C.x - 3 + i * 2, C.y); });
  var arv = put(E, arvId, C.x, C.y + 7);
  if (!arv || !tanks.every(Boolean)) { chk("the scene is laid down", false); return; }
  tanks.forEach(function (u) { u.stance = "hold"; W().ground.push(u); });
  W().book();
  var book0 = waveHp();
  tick(13);
  var Cc = tanks[2], D = tanks[3];
  hurt(Cc, 0.25);
  var s0 = spent();
  var left = until(2, function () { return inList(W().mending, Cc); });
  var s1 = spent();
  chk("a tank at 0.25 steps out and the wave reads level", left >= 0 && Math.abs(s1 - s0) < 0.003,
      "waveSpent " + s0 + " -> " + s1);
  var onRoad = tiles(Cc, arv);
  Combat.kill(Game, Cc, null);
  var lost0 = fb().lost;
  until(2, function () { return fb().lost > lost0; });
  var s2 = spent(), want = Math.round((1 - waveHp() / book0) * 1000) / 1000;
  chk("killed on its way, " + onRoad + " tiles from the workshop, it reads as the same death in the line would",
      fb().lost === lost0 + 1 && Math.abs(s2 - want) < 0.003 && s2 > s1 + 0.03,
      "waveSpent " + s1 + " -> " + s2 + ", in the line " + want);
  hurt(D, 0.25);
  left = until(2, function () { return inList(W().mending, D); });
  tick(0.5);
  /* knocked down again on its way out, then mended and back */
  D.hp = D.maxHp * 0.1; D.lastHitAt = Game.time;
  /* on the berth well past its road's allowance, then dragged off it - the
     engagement an idle hull picks up, a shove: put back, not let go */
  var onB = until(30, function () { return tiles(D, arv) <= 2.0; });
  tick(20);
  var g0 = fb().giveUp, ax = D.x - arv.x, ay = D.y - arv.y, al = Math.hypot(ax, ay) || 1;
  D.give({ type: "move", x: arv.x + ax / al * 6 * TT, y: arv.y + ay / al * 6 * TT });
  var off = until(6, function () { return tiles(D, arv) > 2.4; });
  var ret = off >= 0 ? until(15, function () { return tiles(D, arv) <= 2.0 || !inList(W().mending, D); }) : -1;
  chk("dragged off its berth 20 s into the mending, it is put back on it rather than let go half-mended",
      onB >= 0 && off >= 0 && ret >= 0 && inList(W().mending, D) && fb().giveUp === g0,
      "off after " + off.toFixed(1) + " s, " + (ret >= 0 ? "back " + ret.toFixed(1) + " s later" : "not back") +
      ", giveUp " + (fb().giveUp - g0) + ", at " + frac(D));
  var back = until(120, function () { return inList(W().ground, D); });
  var s3 = spent(), want3 = Math.round((1 - waveHp() / book0) * 1000) / 1000;
  chk("hit again on its way out, mended and back, it reads as the same wounds and mending in the line would",
      left >= 0 && back >= 0 && Math.abs(s3 - want3) < 0.003,
      "back after " + back.toFixed(1) + " s at " + frac(D) + ", waveSpent " + s3 + ", in the line " + want3);
}

/* ---- 11: the finishing shot reads the picture, not the target ---- */
function finishUnseen() {
  log("\n[11] a target nobody of ours can see is not waited on");
  if (!scene("fulda", "commander")) return;
  var C = arena("ground", 12, 40);
  var spg = AI.pickOf(E, "spg"), arvId = AI.pickOf(E, "repair");
  var A = put(E, spg, C.x, C.y), arv = put(E, arvId, C.x, C.y + 4);
  if (!A || !arv) { chk("the scene is laid down", false); return; }
  var w = null, wi = -1;
  for (var i = 0; i < A.def.weapons.length; i++) {
    var ww = WEAPONS[A.def.weapons[i]];
    if (ww && ww.tgt && ww.tgt.ground && (!w || ww.range > w.range)) { w = ww; wi = i; }
  }
  var sight = Math.max(A.def.sight || 0, arv.def.sight || 0);
  var R = Math.min(w ? A.weaponRange(w) / TT * 0.9 : 0, sight + 6), lo = Math.max(sight + 2.5, (w && w.minRange || 0) + 1);
  if (!w || R < lo) { chk("a gun that outranges its own eyes", false, spg + " sight " + sight + " range " + (w && w.range)); return; }
  var foe = put(H, AI.pickOf(H, "ifv") || "ifv_n", C.x, Math.round(C.y - R));
  if (!foe) { chk("the target is laid down", false); return; }
  foe.stance = "hold";
  A.stance = "hold"; W().ground.push(A);
  tick(1);
  var f0 = fb().finish;
  var arm = function () {
    if (A._fb) return;
    foe.hp = 5;                     // a 150-point shell at 0.3 every 8.5 s: under a second of its fire
    A.order = { type: "attack", target: foe };
    for (var k = 0; k < A.cooldowns.length; k++) A.cooldowns[k] = 1.5;
  };
  arm(); hurt(A, 0.25);
  var left = until(2, function () { return inList(W().mending, A); }, arm);
  chk("the gun steps out at once, the target 5 hp and " + tiles(A, foe) + " tiles off, never seen",
      !AI.sightingOf(E, foe.id) && left >= 0 && fb().finish === f0,
      "seen " + !!AI.sightingOf(E, foe.id) + ", finish " + (fb().finish - f0) + ", out " + (left >= 0 ? left.toFixed(2) + " s" : "no"));
}

/* ---- 9: Recruit, the switch, and nothing to mend with ---- */
function switchedOff() {
  function trial(label, diff, prep, withArv) {
    if (!scene("fulda", diff)) return;
    var C = arena("ground", 9, 40);
    var mbt = AI.pickOf(E, "mbt"), arvId = AI.pickOf(E, "repair");
    var tanks = [0, 1].map(function (i) { return put(E, mbt, C.x - 1 + i * 2, C.y); });
    if (withArv) put(E, arvId, C.x, C.y + 5);
    tanks.forEach(function (u) { u.stance = "hold"; W().ground.push(u); });
    if (prep) prep();
    tick(1);
    var A = tanks[0], o0 = A.order;
    var err = null;
    try { until(8, function () { return false; }, function () { hurt(A, 0.2); }); } catch (e) { err = e; }
    chk(label, !err && !inList(W().mending, A) && inList(W().ground, A) && A.order === o0 && fb().out === 0,
        err ? "threw " + err : "out " + fb().out + ", order " + A.order.type + ", noSrc " + fb().noSrc);
  }
  log("\n[9] Recruit, the A/B switch, and nothing to mend with");
  trial("a Recruit leaves its tank in the line", "recruit", null, true);
  trial("aiOff \"fallback\" switches it off", "commander", function () { E.aiOff = new Set(["fallback"]); }, true);
  trial("with no workshop and no depot, nothing happens and nothing throws", "commander", null, false);
}
