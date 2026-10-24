/* tools/jsc/bmd_check.js - a ballistic round is engaged by the battery that
   covers where it is coming down, whatever it was fired at.

     python3 tools/jsc/run.py index.html --test tools/jsc/bmd_check.js

   (owner, 2026-10-23) chose to "fix the missile-defence holes first"
   (_keep/weapons_study/bmd/REPORT.md). Two holes, both in combat.js's
   layered-defence block: a launcher told to fire at a point aims at
   Unit.groundAim, whose owner is null, so areaSam had nobody's batteries to
   ask; and a round that missed its roll left the rail with no target and
   never came into the block at all, though it still comes down 0.4-1.4
   tiles off with its whole blast. Measured before the fix on hormuz e20, an
   Iskander fired at a point beside a PAC-3: 0 engaged of 400 - and the
   commander's TELs only ever fire at a point. Held here, each against a
   PAC-3 three tiles from a structure and a Pact launcher 24 tiles out:
     [1] a round fired at the structure's POINT is engaged (made certain to
         die if it is, so every engagement shows as a kill);
     [2] a round fired AT the structure that misses its roll is engaged;
     [3] one that hits its roll is engaged, as it always was;
     [4] a submarine's ballistic round (profile "ballistic", not indirect)
         fired at the point is engaged;
     [5] a round coming down on ground nobody covers is not;
     [6] the real Iskander round, fired at the point, dies at the rate the
         layer's own formula gives (abm x 0.75 x intercept x 0.62), within
         three standard deviations;
     [7] the Strategic Silo fires no round at all: nothing to engage.
   Piece A2 (bmd/REPORT.md R2): a ballistic shot is fired from the battery's
   own magazine. The battery fires its weapon's burst (two for a PAC-3) as
   one round, then reloads; each interceptor has its own chance.
     [6] so the rate is 1 - (1 - p)^2, p = abm x 0.75 x intercept x 0.62;
     [8] one engagement spends one round of its magazine;
     [9] an empty battery engages nothing;
     [10] nor one still reloading from its last shot;
     [11] nor one packed up.
   [1]-[6] put the battery back in order before each round - full, set up,
   reloaded - so they measure the engagement and not the magazine. */
var PASS = 0, FAIL = 0, TT = 32, DT = 1 / 30;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-seed", "bmd"); set("opt-fog", "0"); set("opt-3d", "0");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});
var H, E;
/* a fresh match, nobody's units on it: the player's yard, the commander's yard */
function scene() {
  Game.init({ theatre: "hormuz", seed: "bmd", cash: 0, diff: "normal",
    era: "e20", eraAI: "e20", eraCapHuman: "e20", eraCapAI: "e20", fog: false,
    startPos: -1, weather: "clear", factionHuman: "nato", factionAI: "pact",
    techHuman: 3, techAI: 3, capHuman: 3, capAI: 3, armsHuman: "all", armsAI: "all",
    superweapons: false, resources: 1, mapSize: 144, aiHandicap: 1,
    roster: [{ faction: "nato", ai: false, team: 1, label: "YOU" },
             { faction: "pact", ai: true, team: 2, diff: "normal", personality: "balanced", label: "ENEMY" }] });
  H = Game.players[0]; E = Game.players[1];
  Game.checkVictory = function () {};
  AI.setPeace(E, true); E.cash = 0;
  [H, E].forEach(function (p) {
    p.units.slice().forEach(function (u) { var i = Game.entities.indexOf(u); if (i >= 0) Game.entities.splice(i, 1); u.dead = true; });
    p.units.length = 0;
  });
}
function put(p, id, x, y) { var u = Game.spawnUnitAt(p, id, x, y); if (u) { u.order = { type: "idle" }; u.orders = []; u.path = null; } return u; }
/* n rounds of w from the launcher at `aim` (a point or the structure); the
   kills the area layer scored and the rounds that came down */
/* every kill text counted once across the run: one lives a second on the
   effects list, into the next volley */
var SEEN = new Set();
function volley(tel, w, aim, n, keep) {
  var kills = 0, seen = SEEN, landed = 0;
  for (var k = 0; k < n; k++) {
    keep();
    Combat.fire(Game, tel, w, aim());
    var p = Combat.projectiles[Combat.projectiles.length - 1], gone = false;
    for (var t = 0; t < 150 && Combat.projectiles.indexOf(p) >= 0; t++) {
      Game.tick(DT);
      Combat.effects.forEach(function (f) {
        if (f.t !== "text" || seen.has(f)) return; seen.add(f);
        if (f.s === "SAM KILL") { kills++; gone = true; }
      });
    }
    if (!gone) landed++;
  }
  return { kills: kills, landed: landed };
}

function run() {
  scene();
  var b = H.buildings[0];
  var sam = put(H, "sam_n", b.x + 3 * TT, b.y);
  var dx = E.homeX - b.x, dy = E.homeY - b.y, d = Math.hypot(dx, dy);
  var tel = put(E, "tel_p", b.x + dx / d * 24 * TT, b.y + dy / d * 24 * TT);
  if (!b || !sam || !tel) { chk("the scene", false, "yard " + !!b + ", PAC-3 " + !!sam + ", launcher " + !!tel); return; }
  var keep = function () { b.hp = b.maxHp = 1e7; sam.hp = sam.maxHp; sam.rounds = sam.roundsMax; sam.deployed = true; sam.cooldowns = sam.cooldowns.map(function () { return 0; }); };
  var w = WEAPONS[tel.def.weapons[0]];
  var abm = 0;
  sam.def.weapons.forEach(function (k) { var w2 = WEAPONS[k]; if (w2 && w2.abm > abm) abm = w2.abm; });
  log("  " + tel.def.name + " (" + w.name + ", intercept " + w.intercept + ") 24 tiles from a " + sam.def.name + " (abm " + abm + ") three tiles from " + b.def.name);
  /* certain to die if engaged: what is measured is the engagement */
  var sure = function (o) { return Object.assign({}, w, { intercept: 50 }, o || {}); };
  var point = function () { return Unit.groundAim(b.x, b.y); }, at = function () { return b; };
  var N = 40;

  var r1 = volley(tel, sure(), point, N, keep);
  chk("[1] a round fired at the structure's point is engaged by the PAC-3 covering it", r1.kills === N, r1.kills + " of " + N + " engaged (0 of 400 before)");
  var r2 = volley(tel, sure({ acc: 0 }), at, N, keep);
  chk("[2] a round fired at the structure that misses its roll is engaged", r2.kills === N, r2.kills + " of " + N);
  var r3 = volley(tel, sure({ acc: 5 }), at, N, keep);
  chk("[3] one that hits its roll is engaged, as it always was", r3.kills === N, r3.kills + " of " + N);
  var sk = null;
  Object.keys(WEAPONS).forEach(function (k) { if (!sk && /^slbm_/.test(k) && WEAPONS[k].profile === "ballistic" && !WEAPONS[k].indirect) sk = k; });
  var r4 = sk ? volley(tel, Object.assign({}, WEAPONS[sk], { intercept: 50 }), point, N, keep) : { kills: -1 };
  chk("[4] a submarine's ballistic round fired at the point is engaged", !!sk && r4.kills === N, (sk || "no SLBM row") + ": " + r4.kills + " of " + N);

  /* ground nobody covers: a point far from everything of the player's */
  var bare = null, M = Game.map;
  for (var r = 20; r < 60 && !bare; r += 2) for (var a = 0; a < 32 && !bare; a++) {
    var x = b.x + Math.cos(a / 32 * 6.283) * r * TT, y = b.y + Math.sin(a / 32 * 6.283) * r * TT;
    if (x < TT * 4 || y < TT * 4 || x > (M.W - 4) * TT || y > (M.H - 4) * TT) continue;
    var near = Game.entities.some(function (e) { return !e.dead && e.owner === H && Math.hypot(e.x - x, e.y - y) < 25 * TT; });
    if (!near) bare = { x: x, y: y };
  }
  var r5 = bare ? volley(tel, sure(), function () { return Unit.groundAim(bare.x, bare.y); }, N, keep) : { kills: -1, landed: 0 };
  chk("[5] a round coming down on ground nobody of ours covers is not engaged", !!bare && r5.kills === 0 && r5.landed === N,
      bare ? r5.kills + " engaged, " + r5.landed + " came down" : "no bare ground");

  var n6 = 400, r6 = volley(tel, w, point, n6, keep);
  var burst = 1; sam.def.weapons.forEach(function (k) { var w2 = WEAPONS[k]; if (w2 && w2.abm) burst = Math.max(1, w2.burst || 1); });
  var p1 = Math.min(1, abm * 0.75 * (w.intercept !== undefined ? w.intercept : 1) * 0.62);
  var pk = 1 - Math.pow(1 - p1, burst), mean = n6 * pk, sd = Math.sqrt(n6 * pk * (1 - pk));
  chk("[6] the real round at the point dies at the layer's own rate, one chance an interceptor of the burst: 1 - (1 - p)^" + burst,
      burst === 2 && Math.abs(r6.kills - mean) <= 3 * sd + 1, r6.kills + " of " + n6 + " against " + mean.toFixed(1) + " +- " + (3 * sd).toFixed(1) + " (p " + p1.toFixed(3) + ")");

  /* ---- the magazine ---- */
  var none = function () {};
  keep();
  var m0 = sam.rounds, r8 = volley(tel, sure(), point, 1, none);
  chk("[8] one engagement spends one round of the battery's magazine, and it reloads after", r8.kills === 1 && sam.rounds === m0 - 1 && sam.cooldowns.some(function (c) { return c > 0; }),
      m0 + " -> " + sam.rounds + " rounds; reloading " + sam.cooldowns.map(function (c) { return c.toFixed(1); }).join(","));
  /* out of supply too: three tiles from the yard it is refilled as it stands */
  keep(); sam.rounds = 0;
  var sup0 = sam.inSupply; sam.inSupply = function () { return false; };
  var r9 = volley(tel, sure(), point, 3, function () { sam.cooldowns = sam.cooldowns.map(function () { return 0; }); });
  sam.inSupply = sup0;
  chk("[9] an empty battery engages nothing", r9.kills === 0 && r9.landed === 3 && sam.rounds === 0, r9.kills + " engaged of 3, " + sam.rounds + " rounds");
  keep(); sam.cooldowns = sam.cooldowns.map(function () { return 60; });
  var r10 = volley(tel, sure(), point, 3, none);
  chk("[10] nor one still reloading from its last shot", r10.kills === 0 && r10.landed === 3, r10.kills + " engaged of 3");
  keep(); sam.deployed = false;
  var r11 = volley(tel, sure(), point, 3, function () { sam.deployed = false; sam.moving = false; });
  chk("[11] nor one packed up", r11.kills === 0 && r11.landed === 3, r11.kills + " engaged of 3");

  /* the Strategic Silo: a launch, and no round anywhere */
  var silo = Game.placeBuilding(E, "missilesilo", ((E.homeX / TT) | 0) + 4, ((E.homeY / TT) | 0) + 4, true);
  var p0 = Combat.projectiles.length, launched = false, extra = 0;
  if (silo && silo.def.superweapon) {
    silo.buildProgress = 1; silo.swCharge = 1;
    launched = Game.launchSuperweapon(silo, b.x, b.y) !== false;
    for (var t7 = 0; t7 < 30 * 9; t7++) { Game.tick(DT); extra = Math.max(extra, Combat.projectiles.length - p0); }
  }
  chk("[7] the Strategic Silo fires no round at all: nothing for a battery to engage", !!silo && launched && extra === 0,
      silo ? (launched ? "launched, " + extra + " rounds in the air meanwhile" : "not launched") : "no silo placed");
}
