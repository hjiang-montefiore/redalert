/* tools/jsc/coastssm_check.js - the coastal anti-ship missile launcher.

     python3 tools/jsc/run.py index.html --test tools/jsc/coastssm_check.js

   (owner, 2026-10-23) "yes take your recommendation", then "launchers now,
   sites later" (_keep/weapons_study/coastssm/REPORT.md, PLAN.md B1). Role
   `coastssm`: a launcher on wheels that drives to the coast, sets up where
   it stops, and fires on the hulls its side holds; ships only. Its first
   row is the Soviet 4K51 Rubezh (pact e80-e90). Held here:
     [1] the role and the row: two P-15M missiles (ru.wikipedia: two KT-161
         containers a launcher), five minutes to set up (4.0 s on the S-300's
         scale), the P-15M's 12.4 tiles by rank, ships only; the Pact's card
         in the 1980s and 1990s and nobody else's;
     [2] set up on the shore, it fires on an enemy ship nine tiles out - past
         its own five-tile sight - that a scout of its side has in view;
     [3] ...and not on one nobody of its side can see;
     [4] it never fires at a tank, even one in view and in range;
     [5] its two rounds are counted down, and with none left it stops;
     [6] it does not drive after a ship that sails out of its reach. */
var TT = 32, DT = 1 / 30, PASS = 0, FAIL = 0;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e80"); set("opt-aera", "e80"); set("opt-fac", "pact");
  set("opt-cash", "200000"); set("opt-seed", "coastssm"); set("opt-fog", "1"); set("opt-3d", "0");
  set("opt-weather", "clear");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});
function ticks(sec, each) { for (var i = 0; i < Math.round(sec / DT); i++) { Game.tick(DT); if (each) each(); } }
var shots = 0, SHOOTER = null, SEEN = new Set();
function count() {
  Combat.projectiles.forEach(function (p) { if (p.shooter === SHOOTER && !SEEN.has(p)) { SEEN.add(p); shots++; } });
}
/* a shore tile with open sea `d` tiles off in one of 16 directions, and the
   land between quiet: nobody's within 12 tiles */
function shore(d) {
  var M = Game.map;
  for (var y = 8; y < M.H - 8; y += 2) for (var x = 8; x < M.W - 8; x += 2) {
    if (!GameMap.passable(M, x, y, "ground") || Game.tileBlocked(x, y, null)) continue;
    var busy = Game.entities.some(function (e) { return !e.dead && Math.hypot(e.x / TT - x, e.y / TT - y) < 14; });
    if (busy) continue;
    for (var a = 0; a < 16; a++) {
      var ux = Math.cos(a / 16 * 6.283), uy = Math.sin(a / 16 * 6.283);
      var sx = Math.round(x + ux * d), sy = Math.round(y + uy * d), ok = true;
      for (var j = -2; j <= 2 && ok; j++) for (var i = -2; i <= 2; i++) if (!GameMap.passable(M, sx + i, sy + j, "sea")) { ok = false; break; }
      if (ok) return { x: x, y: y, sx: sx, sy: sy, ux: ux, uy: uy };
    }
  }
  return null;
}
function run() {
  var P = Game.human, E = Game.players.filter(function (p) { return p !== P && !Game.allied(P, p); })[0];
  AI.setPeace(E, true); Game.checkVictory = function () {};
  Game.players.forEach(function (p) { p.units.slice().forEach(function (u) { u.dead = true; }); });
  Game.sweepDead && Game.sweepDead();

  /* ---- 1. the role and the row ---- */
  var D = UNITS.pact_e80_coastssm, W = WEAPONS.ssm_p15m;
  var only = ["pact", "nato", "pla", "kpa", "roc", "deu", "gbr", "fra"].map(function (f) {
    return ["e60", "e80", "e90", "e00"].map(function (e) { return unitFor(f, "coastssm", e) || "-"; }).join("/"); });
  chk("[1] the Rubezh: two P-15Ms at 12.4 tiles, ships only, five minutes to set up, the Pact's in the 1980s and 1990s only",
      !!D && D.role === "coastssm" && D.rounds === 2 && D.deploySec === 4.0 && D.deploy && !!W && W.range === 12.4 &&
      W.tgt.sea === 1 && !W.tgt.ground && !W.tgt.air && only[0] === "-/pact_e80_coastssm/pact_e80_coastssm/-" &&
      only.slice(1).every(function (s) { return s === "-/-/-/-"; }) && ROUNDS_REQUIRED.indexOf("coastssm") >= 0 && ROUNDS_ERA_GAPS.length === 0,
      only.join(" | "));

  var S = shore(9);
  if (!S) { chk("a shore with open sea nine tiles off", false, "none on hormuz"); return; }
  var put = function (p, id, x, y) { var u = Game.spawnUnitAt(p, id, x * TT + 16, y * TT + 16); if (u) { u.order = { type: "idle" }; u.orders = []; } return u; };
  var rb = put(P, "pact_e80_coastssm", S.x, S.y);
  SHOOTER = rb;
  rb.stance = "guard";
  ticks(6);
  var shipId = unitFor("nato", "destroyer", "e80") || "destroyer_n";
  var ship = put(E, shipId, S.sx, S.sy);
  ship.stance = "hold"; ship.hp = ship.maxHp = 1e6;

  /* ---- 3. nobody of its side sees the ship ---- */
  shots = 0;
  ticks(8, count);
  chk("[3] set up on the shore, it does not fire on a ship nine tiles out that nobody of its side can see",
      rb.deployed && shots === 0 && !Game.sideSees(P, ship), "deployed " + rb.deployed + ", " + shots + " fired, held " + Game.sideSees(P, ship));

  /* ---- 2. a scout of its side sees it ---- */
  var sc = put(P, unitFor("pact", "recon", "e80") || "recon_p", Math.round(S.x + S.ux * 5), Math.round(S.y + S.uy * 5));
  if (!GameMap.passable(Game.map, sc.tx, sc.ty, "ground")) { sc.x = rb.x + S.ux * 4 * TT; sc.y = rb.y + S.uy * 4 * TT; }
  sc.stance = "hold";
  shots = 0;
  ticks(12, count);
  chk("[2] with a scout of its side watching the ship, it fires on it, past its own five-tile sight",
      shots >= 1 && Game.sideSees(P, ship), shots + " fired, held " + Game.sideSees(P, ship) + ", ship " + (Math.hypot(ship.x - rb.x, ship.y - rb.y) / TT).toFixed(1) + " tiles off");

  /* ---- 5. two rounds, then none ---- */
  ticks(40, count);
  chk("[5] its two rounds are counted down, and with none left it stops", rb.rounds === 0 && shots === 2,
      shots + " fired in all, " + rb.rounds + " left");

  /* ---- 4. a tank in view and in range ---- */
  rb.rounds = 2; ship.dead = true; Game.sweepDead && Game.sweepDead();
  var tk = put(E, unitFor("nato", "mbt", "e80") || "mbt_n", Math.round(S.x - S.ux * 6), Math.round(S.y - S.uy * 6));
  if (tk) { tk.stance = "hold"; tk.hp = tk.maxHp = 1e6; }
  shots = 0; SEEN = new Set();
  ticks(10, count);
  chk("[4] it never fires at a tank, even one in view and in range", !!tk && shots === 0 && Game.sideSees(P, tk),
      tk ? shots + " fired at a tank " + (Math.hypot(tk.x - rb.x, tk.y - rb.y) / TT).toFixed(1) + " tiles off, held " + Game.sideSees(P, tk) : "no tank");
  if (tk) tk.dead = true;

  /* ---- 6. a ship that sails out of reach ---- */
  var ship2 = put(E, shipId, S.sx, S.sy);
  ship2.hp = ship2.maxHp = 1e6; ship2.stance = "hold";
  ticks(3, count);
  var x0 = rb.x, y0 = rb.y, o0 = rb.order ? rb.order.type + (rb.order.auto ? " (auto)" : "") + (rb.order.target === ship2 ? " on the ship" : "") : "-";
  ship2.x = rb.x + S.ux * 16 * TT; ship2.y = rb.y + S.uy * 16 * TT;
  if (!GameMap.passable(Game.map, (ship2.x / TT) | 0, (ship2.y / TT) | 0, "sea")) { ship2.x = S.sx * TT + S.ux * 7 * TT; ship2.y = S.sy * TT + S.uy * 7 * TT; }
  ticks(8, count);
  chk("[6] it does not drive after a ship that sails out of its reach: still on its shore, still set up",
      o0 === "attack (auto) on the ship" && Math.hypot(rb.x - x0, rb.y - y0) < 2 && rb.deployed,
      "engaged as " + o0 + "; moved " + (Math.hypot(rb.x - x0, rb.y - y0) / TT).toFixed(2) + " tiles, deployed " + rb.deployed);
}
