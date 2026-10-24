/* tools/jsc/asbm_check.js - the PLA's anti-ship ballistic missiles.

     python3 tools/jsc/run.py index.html --test tools/jsc/asbm_check.js

   (owner, 2026-10-23) "yes take your recommendation", then "halve it vs
   moving ships" (_keep/weapons_study/asbm/REPORT.md; PLAN.md C1-C3). The
   DF-21D (ships only) and DF-26 (land and sea) declare `asbm`, so the net
   at the tail of generations.js leaves them the sea that every other
   ballistic round loses. Held here:
     [1] the two rounds: ballistic, the 9K720's interception figure, the
         DF-21D ships only and the DF-26 both, and they alone of the
         ballistic rounds reach the sea (STRATEGIC_ROUND_GAPS clean);
     [2] the PLA's cards: DF-21D and DF-26 from the 2000s-10s on, beside the
         land-attack DF-15B and DF-16, which stay unitFor's default; no other
         army has either;
     [3] against a ship the side holds, a ship under way is hit at exactly
         CFG.ASBM_MOVING (0.5) of the chance against one standing still;
     [4] against one nobody of the side holds, blind (CFG.BLIND_FIRE_ACC);
     [5] the DF-21D can be ordered onto a ship and not onto a tank; the
         DF-26 onto either. */
var TT = 32, DT = 1 / 30, PASS = 0, FAIL = 0;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20"); set("opt-fac", "pla");
  set("opt-cash", "200000"); set("opt-seed", "asbm"); set("opt-fog", "1"); set("opt-3d", "0");
  set("opt-weather", "clear");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});
/* the exact chance one round hits, by holding the RNG at a constant and
   bisecting (navradar_check.js accOf) */
function accOf(sh, w, tg) {
  var rng0 = Game.rng, lo = 0, hi = 1, n0 = Combat.projectiles.length, f0 = Combat.effects.length;
  for (var i = 0; i < 22; i++) {
    var mid = (lo + hi) / 2;
    Game.rng = function () { return mid; };
    var np = Combat.projectiles.length, hit = false;
    Combat.fire(Game, sh, w, tg);
    if (Combat.projectiles.length > np) hit = !!Combat.projectiles[Combat.projectiles.length - 1].hit;
    if (hit) lo = mid; else hi = mid;
  }
  Game.rng = rng0; Combat.projectiles.length = n0; Combat.effects.length = f0;
  return lo;
}
function run() {
  var P = Game.human, E = Game.players.filter(function (p) { return p !== P && !Game.allied(P, p); })[0];
  AI.setPeace(E, true); Game.checkVictory = function () {};

  /* ---- 1. the rounds ---- */
  var A = WEAPONS.asbm_df21d, B = WEAPONS.asbm_df26;
  var seaBall = Object.keys(WEAPONS).filter(function (k) { var w = WEAPONS[k]; return w && w.profile === "ballistic" && w.proj === "missile" && w.tgt && w.tgt.ground && w.tgt.sea; });
  chk("[1] the DF-21D (ships only) and DF-26 (land and sea): ballistic, the 9K720's 0.28, and the only ballistic rounds that reach the sea",
      !!A && !!B && A.asbm && B.asbm && A.profile === "ballistic" && B.profile === "ballistic" && A.intercept === 0.28 && B.intercept === 0.28 &&
      A.tgt.sea && !A.tgt.ground && B.tgt.sea && B.tgt.ground && STRATEGIC_ROUND_GAPS.length === 0 &&
      seaBall.every(function (k) { return k.split("__")[0] === "asbm_df26"; }),
      "ballistic rounds with land and sea: " + (seaBall.join(", ") || "none") + "; gaps " + STRATEGIC_ROUND_GAPS.length);

  /* ---- 2. the cards ---- */
  var cards = ["e90", "e00", "e20"].map(function (e) { return e + ":" + Object.keys(UNITS).filter(function (k) { var u = UNITS[k]; return u.fac === "pla" && u.role === "tel" && inEra(u, e); }).map(function (k) { return UNITS[k].name; }).join("+"); });
  var other = Object.keys(UNITS).filter(function (k) { var u = UNITS[k]; return u.fac !== "pla" && (u.weapons || []).some(function (w) { var W = WEAPONS[w]; return W && W.asbm; }); });
  chk("[2] the PLA's DF-21D and DF-26 from the 2000s-10s on, the land-attack launcher still the default, and nobody else's",
      cards.join(" ") === "e90:DF-15 e00:DF-15B+DF-21D+DF-26 e20:DF-16+DF-21D+DF-26" && unitFor("pla", "tel", "e00") === "pla_e00_tel" &&
      unitFor("pla", "tel", "e20") === "tel_c" && !other.length,
      cards.join(" ") + "; default " + unitFor("pla", "tel", "e00") + "/" + unitFor("pla", "tel", "e20") + (other.length ? "; also " + other.join(",") : ""));

  /* ---- 3, 4. a ship held, still and under way; one nobody holds ---- */
  var M = Game.map, land = null, sea = null;
  for (var y = 10; y < M.H - 10 && !land; y += 3) for (var x = 10; x < M.W - 10 && !land; x += 3) {
    if (!GameMap.passable(M, x, y, "ground") || Game.tileBlocked(x, y, null)) continue;
    for (var a = 0; a < 24 && !land; a++) {
      var sx = Math.round(x + Math.cos(a / 24 * 6.283) * 24), sy = Math.round(y + Math.sin(a / 24 * 6.283) * 24);
      if (sx > 4 && sy > 4 && sx < M.W - 4 && sy < M.H - 4 && GameMap.passable(M, sx, sy, "sea")) { land = { x: x, y: y }; sea = { x: sx, y: sy }; }
    }
  }
  if (!land) { chk("land 24 tiles from open sea", false, "none"); return; }
  var tel = Game.spawnUnitAt(P, "pla_e00_df21d", land.x * TT + 16, land.y * TT + 16), tel26 = Game.spawnUnitAt(P, "pla_e00_df26", land.x * TT + 16, (land.y + 1) * TT + 16);
  var ship = Game.spawnUnitAt(E, unitFor("nato", "destroyer", "e20") || "destroyer_n", sea.x * TT + 16, sea.y * TT + 16);
  [tel, tel26, ship].forEach(function (u) { u.order = { type: "idle" }; u.stance = "hold"; });
  var wA = WEAPONS[tel.def.weapons[0]];
  var holdOn = function () { Game.sideSees = function (p, e) { return true; }; };
  var sideSees0 = Game.sideSees;
  holdOn();
  ship.moving = false; var still = accOf(tel, wA, ship);
  ship.moving = true; var under = accOf(tel, wA, ship);
  chk("[3] a ship the side holds, under way, is hit at exactly half the chance of one standing still (CFG.ASBM_MOVING " + CFG.ASBM_MOVING + ")",
      CFG.ASBM_MOVING === 0.5 && still > 0.05 && Math.abs(under - still * CFG.ASBM_MOVING) < 0.002,
      "standing " + still.toFixed(3) + ", under way " + under.toFixed(3));
  Game.sideSees = function (p, e) { return false; };
  ship.moving = false; var blind = accOf(tel, wA, ship);
  Game.sideSees = sideSees0;
  chk("[4] one nobody of the side holds is fired on blind (CFG.BLIND_FIRE_ACC " + CFG.BLIND_FIRE_ACC + ")",
      Math.abs(blind - still * CFG.BLIND_FIRE_ACC) < 0.002, "held " + still.toFixed(3) + ", unheld " + blind.toFixed(3));

  /* ---- 5. what each can be ordered onto ---- */
  var tank = Game.spawnUnitAt(E, unitFor("nato", "mbt", "e20") || "mbt_n", (land.x + 6) * TT + 16, land.y * TT + 16);
  chk("[5] the DF-21D can be ordered onto a ship and not a tank; the DF-26 onto either",
      tel.canTarget(ship) && !tel.canTarget(tank) && tel26.canTarget(ship) && tel26.canTarget(tank),
      "DF-21D ship " + tel.canTarget(ship) + " tank " + tel.canTarget(tank) + "; DF-26 ship " + tel26.canTarget(ship) + " tank " + tel26.canTarget(tank));
}
