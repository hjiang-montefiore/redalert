/* tools/jsc/nifcca_check.js - NIFC-CA: an E-2D holding a sea-skimmer lifts
   the clutter cut off an Aegis ship's area SAM, and nothing else does.

     python3 tools/jsc/run.py index.html --test tools/jsc/nifcca_check.js

   (owner, 2026-10-24) asked how the E-2D could "enhance other units'
   ability", and said "build both" to the two pieces proposed; this is the
   second (combat.js nifccaHolds, game.js G.setHolds, the `nifcca` flags in
   rules.js). Layer 1 of combat.js's layered defence multiplies an area
   SAM's chance against a sea-skimmer by 0.45; the rule waives that when the
   host is a NIFC-CA ship and an E-2D of its side, in the air and on the air,
   holds the round inside its jammed radar reach. Held here, each against a
   real skim-profile round fired at a hull with nothing else near it, so the
   hull is its own area-SAM host:
     [1] exactly destroyer_n, cruiser_n and cawacs_n carry the flag - no e00
         row, no Russian, Chinese or other army's row;
     [2] an e20 Burke with a friendly E-2D overhead holding the round: the
         kill chance is the layer's own figure with NO 0.45;
     [3] the same Burke with no E-2D: the figure WITH the 0.45;
     [4] the cruiser too, with and without;
     [5] the E-2D on its ramp, its radar off: the cut;
     [6] the E-2D jammed past burn-through (over 0.55): the cut;
     [7] the E-2D jammed short - its reach cut below the distance to the
         round, though the round is inside its unjammed reach: the cut;
     [8] a Russian A-50U over its own Slava, and [9] a Chinese KJ-500 over
         its own Type 055: the cut, exactly as with no aircraft at all;
     [10] an e00 E-2C Hawkeye 2000 over an e00 Burke: the cut - CEC, and no
         source that it beat the clutter.
   The chance is measured exactly, by holding the RNG at a constant from the
   moment the round leaves the rail and bisecting on it (asbm_check.js
   accOf): the round's launch roll is held at 0 so it is guided at the hull,
   and the flight is stepped through Combat.update alone, so nothing else in
   the match draws on the RNG or moves. The layer's one roll is
   `rng() < sam x 0.62`, so the threshold the bisection finds IS the
   kill chance. The expected figure is the layer's own formula, written
   out the way bmd_check.js [6] writes out its own:
     (acc x 0.45) x (1 + min(0.5, vls / 220)) x intercept [x 0.45] x 0.62. */
var PASS = 0, FAIL = 0, TT = 32, DT = 1 / 30;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-seed", "nifcca"); set("opt-fog", "0"); set("opt-3d", "0");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});
var H, E;
/* a fresh match with nobody's units on it, the player's side `fh` in `era` */
function scene(fh, fa, era) {
  Game.init({ theatre: "hormuz", seed: "nifcca", cash: 0, diff: "normal",
    era: era, eraAI: era, eraCapHuman: era, eraCapAI: era, fog: false,
    startPos: -1, weather: "clear", factionHuman: fh, factionAI: fa,
    techHuman: 3, techAI: 3, capHuman: 3, capAI: 3, armsHuman: "all", armsAI: "all",
    superweapons: false, resources: 1, mapSize: 144, aiHandicap: 1,
    roster: [{ faction: fh, ai: false, team: 1, label: "YOU" },
             { faction: fa, ai: true, team: 2, diff: "normal", personality: "balanced", label: "ENEMY" }] });
  H = Game.players[0]; E = Game.players[1];
  Game.checkVictory = function () {};
  AI.setPeace(E, true); E.cash = 0;
  [H, E].forEach(function (p) {
    p.units.slice().forEach(function (u) { var i = Game.entities.indexOf(u); if (i >= 0) Game.entities.splice(i, 1); u.dead = true; });
    p.units.length = 0;
  });
  Combat.projectiles.length = 0; Combat.effects.length = 0;
}
function put(p, id, x, y) {
  var u = Game.spawnUnitAt(p, id, x, y);
  if (u) { u.order = { type: "idle" }; u.orders = []; u.path = null; u.stance = "hold"; u.x = x; u.y = y; }
  return u;
}
/* in flight, on the air: not parked, not on the ground */
function fly(u) { u.parked = false; u.grounded = false; u.order = { type: "idle" }; return u; }
/* open water: a sea tile with sea 12 tiles off along some bearing, and room
   on the far side for an aircraft standing 12 tiles back */
var SEA = null;
function findSea() {
  var M = Game.map;
  for (var y = 16; y < M.H - 16 && !SEA; y += 2) for (var x = 16; x < M.W - 16 && !SEA; x += 2) {
    if (!GameMap.passable(M, x, y, "sea")) continue;
    for (var a = 0; a < 16 && !SEA; a++) {
      var c = Math.cos(a / 16 * 6.283), s = Math.sin(a / 16 * 6.283), ok = true;
      for (var r = 1; r <= 12 && ok; r++) ok = GameMap.passable(M, Math.round(x + c * r), Math.round(y + s * r), "sea");
      var bx = x - c * 14, by = y - s * 14;
      if (ok && bx > 2 && by > 2 && bx < M.W - 2 && by < M.H - 2) SEA = { x: x * TT + 16, y: y * TT + 16, c: c, s: s };
    }
  }
  return SEA;
}
/* one round of w from sh at tg, the RNG held at `mid` from the rail on;
   true if the area layer killed it */
function oneShot(sh, w, tg, mid) {
  Combat.projectiles.length = 0; Combat.effects.length = 0;
  Game.rng = function () { return 0; };
  Combat.fire(Game, sh, w, tg);
  var p = Combat.projectiles[Combat.projectiles.length - 1];
  if (!p || p.target !== tg) return null;
  Game.rng = function () { return mid; };
  for (var t = 0; t < 900 && Combat.projectiles.indexOf(p) >= 0 && !p.samCheck; t++) Combat.update(Game, DT);
  var killed = Combat.projectiles.indexOf(p) < 0 && Combat.effects.some(function (f) { return f.t === "text" && f.s === "SAM KILL"; });
  LAST = { x: p.x, y: p.y, checked: !!p.samCheck };
  Combat.projectiles.length = 0; Combat.effects.length = 0;
  return killed;
}
var LAST = null;
function killOf(sh, w, tg) {
  var rng0 = Game.rng, lo = 0, hi = 1, bad = false;
  for (var i = 0; i < 22; i++) {
    var mid = (lo + hi) / 2, k = oneShot(sh, w, tg, mid);
    if (k === null) { bad = true; break; }
    if (k) lo = mid; else hi = mid;
  }
  Game.rng = rng0;
  return bad ? -1 : lo;
}
/* the layer's own figure for this host and this round, with or without the cut */
function expected(host, w, cut) {
  var score = 0;
  (host.def.weapons || []).forEach(function (k) {
    var w2 = WEAPONS[k];
    if (!w2 || !w2.tgt || !w2.tgt.air || w2.proj !== "missile") return;
    var v = (w2.acc || 0.7) * 0.45; if (v > score) score = v;
  });
  var sam = score;
  if (sam && host.def.vls) sam *= 1 + Math.min(0.5, host.def.vls / 220);
  sam *= w.intercept !== undefined ? w.intercept : 1;
  if (cut) sam *= 0.45;
  return Math.min(1, sam * 0.62);
}
var near = function (a, b) { return a >= 0 && Math.abs(a - b) < 0.002; };
var f3 = function (v) { return v.toFixed(3); };
/* the skim round a row carries */
function skimOf(id) {
  var k = (UNITS[id].weapons || []).filter(function (k) { var w = WEAPONS[k]; return w && w.profile === "skim" && w.tgt && w.tgt.sea; })[0];
  return k ? WEAPONS[k] : null;
}
/* a hull of the player's at sea, the shooter 12 tiles out along the open
   water, and (optionally) an aircraft of the player's at `air` */
function setup(fh, fa, era, shipId, shooterId) {
  scene(fh, fa, era);
  var s = SEA || findSea();
  if (!s) return null;
  var ship = put(H, shipId, s.x, s.y);
  var sh = put(E, shooterId, s.x + s.c * 12 * TT, s.y + s.s * 12 * TT);
  return { ship: ship, sh: sh, w: skimOf(shooterId), s: s };
}

function run() {
  /* ---- 1. the flags ---- */
  var flagged = Object.keys(UNITS).filter(function (k) { return UNITS[k].nifcca; }).sort();
  chk("[1] the flag is on the e20 Burke and Ticonderoga and the E-2D, and on nothing else",
      flagged.join(",") === "cawacs_n,cruiser_n,destroyer_n" &&
      flagged.every(function (k) { return UNITS[k].fac === "nato" && inEra(UNITS[k], "e20") && !inEra(UNITS[k], "e00"); }),
      flagged.join(", "));

  /* ---- 2-7. the e20 Burke and the E-2D ---- */
  var A = setup("nato", "pact", "e20", "destroyer_n", "pact_e00_coastssm");
  if (!A || !A.ship || !A.sh || !A.w) { chk("the e20 scene", false, JSON.stringify({ sea: !!SEA, ship: !!(A && A.ship), shooter: !!(A && A.sh), round: !!(A && A.w) })); return; }
  var s = A.s;
  log("  " + A.sh.def.name + " (" + A.w.name + ", skim, intercept " + A.w.intercept + ") 12 tiles from a " + A.ship.def.name +
      " (" + A.ship.def.weapons.filter(function (k) { return WEAPONS[k] && WEAPONS[k].tgt && WEAPONS[k].tgt.air && WEAPONS[k].proj === "missile"; }).join(",") + ", vls " + A.ship.def.vls + ")");
  var e2 = fly(put(H, "cawacs_n", s.x, s.y));
  var withE2 = killOf(A.sh, A.w, A.ship), at = LAST;
  var held = at && Game.setHolds(e2, at.x, at.y);
  log("  the round is engaged " + (at ? (Math.hypot(at.x - s.x, at.y - s.y) / TT).toFixed(1) : "?") + " tiles out; the E-2D's radar " + e2.def.radar + " tiles, emitting " + Game.emitting(e2) + ", holds it " + held);
  var full = expected(A.ship, A.w, false), cut = expected(A.ship, A.w, true);
  chk("[2] a Burke with a friendly E-2D overhead holding the round: no 0.45 cut",
      !!at && at.checked && held && near(withE2, full) && full < 0.999,
      "kill " + f3(withE2) + ", formula without the cut " + f3(full) + ", with it " + f3(cut));
  e2.dead = true; H.units.splice(H.units.indexOf(e2), 1);
  var noE2 = killOf(A.sh, A.w, A.ship);
  chk("[3] the same Burke with no E-2D: the 0.45 cut", near(noE2, cut) && near(noE2 / 0.45, withE2),
      "kill " + f3(noE2) + " against " + f3(cut) + "; with the E-2D " + f3(withE2) + " = " + f3(noE2 / 0.45) + " / 0.45");

  /* the cruiser, the other shooter */
  var cg = put(H, "cruiser_n", s.x, s.y); A.ship.dead = true; H.units.splice(H.units.indexOf(A.ship), 1);
  var cgNo = killOf(A.sh, A.w, cg);
  var e2b = fly(put(H, "cawacs_n", s.x, s.y));
  var cgWith = killOf(A.sh, A.w, cg);
  chk("[4] a Ticonderoga likewise: the cut without the E-2D, none with it",
      near(cgNo, expected(cg, A.w, true)) && near(cgWith, expected(cg, A.w, false)),
      "without " + f3(cgNo) + " (" + f3(expected(cg, A.w, true)) + "), with " + f3(cgWith) + " (" + f3(expected(cg, A.w, false)) + ")");

  /* on its ramp: the rotodome is still */
  e2b.parked = true;
  var ramp = killOf(A.sh, A.w, cg);
  chk("[5] the E-2D on its ramp, its radar off the air: the cut", !Game.emitting(e2b) && near(ramp, cgNo),
      "emitting " + Game.emitting(e2b) + ", kill " + f3(ramp) + " against " + f3(cgNo));
  fly(e2b);

  /* jammed out: the strongest jammer the Pact fields in the 2020s, on top of it */
  var jid = Object.keys(UNITS).filter(function (k) { var u = UNITS[k]; return u.fac === "pact" && u.jam && inEra(u, "e20"); })
    .sort(function (a, b) { return (UNITS[b].jamPower || 1) - (UNITS[a].jamPower || 1); })[0];
  var jam = jid ? put(E, jid, e2b.x, e2b.y) : null;
  if (jam && jam.layer === "air") fly(jam);
  var j1 = jam ? Game.jamAgainst(H, e2b) : 0;
  var jammed = jam ? killOf(A.sh, A.w, cg) : -1;
  chk("[6] the E-2D jammed past burn-through (over 0.55): the cut", !!jam && j1 > 0.55 && near(jammed, cgNo),
      (jid || "no Pact jammer") + " on top of it: jamming " + j1.toFixed(2) + ", kill " + f3(jammed) + " against " + f3(cgNo));

  /* jammed short: 12 tiles back from the hull, the round about 21 tiles off
     and inside the 30-tile set; the jammer walked out until what is left of
     the reach is short of the round */
  var bx = s.x - s.c * 12 * TT, by = s.y - s.s * 12 * TT;
  e2b.x = bx; e2b.y = by;
  var openKill = -1, shortKill = -1, j2 = 0, dRound = 0, left = 0;
  if (jam) {
    jam.x = bx + 1e5; jam.y = by;                    // out of it: the set reaches the round
    openKill = killOf(A.sh, A.w, cg);
    dRound = LAST ? Math.hypot(LAST.x - bx, LAST.y - by) / TT : 0;
    for (var dd = 0; dd <= jam.def.jam; dd += 0.25) {
      jam.x = bx + dd * TT; jam.y = by;
      j2 = Game.jamAgainst(H, e2b); left = e2b.def.radar * Math.max(0.15, 1 - j2);
      if (j2 > 0.15 && j2 <= 0.55 && left < dRound - 0.5) break;
    }
    shortKill = killOf(A.sh, A.w, cg);
  }
  chk("[7] the E-2D jammed short of the round, though inside its unjammed reach: the cut",
      !!jam && near(openKill, expected(cg, A.w, false)) && j2 > 0.15 && j2 <= 0.55 && left < dRound && near(shortKill, cgNo),
      "round " + dRound.toFixed(1) + " tiles off: unjammed kill " + f3(openKill) + "; jamming " + j2.toFixed(2) + " leaves " + left.toFixed(1) +
      " tiles, kill " + f3(shortKill) + " against " + f3(cgNo));

  /* ---- 8, 9. Russia and China, each over its own ship ---- */
  [["8", "pact", "cruiser_p", "awacs_p", "A-50U"], ["9", "pla", "cruiser_c", "awacs_c", "KJ-500"]].forEach(function (c) {
    var B = setup(c[1], "nato", "e20", c[2], "destroyer_n");
    if (!B || !B.ship || !B.sh || !B.w) { chk("[" + c[0] + "] the scene", false, c[2]); return; }
    var none = killOf(B.sh, B.w, B.ship);
    var aew = fly(put(H, c[3], s.x, s.y));
    var over = killOf(B.sh, B.w, B.ship), at2 = LAST;
    var hold = at2 && Game.setHolds(aew, at2.x, at2.y);
    chk("[" + c[0] + "] a " + aew.def.name + " over its own " + B.ship.def.name + ", holding the " + B.w.name + ": the cut, unchanged",
        hold && near(none, expected(B.ship, B.w, true)) && near(over, none) && none > 0,
        "holds it " + hold + "; kill without " + f3(none) + ", with " + f3(over) + ", formula with the cut " + f3(expected(B.ship, B.w, true)));
  });

  /* ---- 10. the e00 pair: E-2C Hawkeye 2000 and the Flight IIA ---- */
  var C = setup("nato", "pact", "e00", "nato_e00_destroyer", "pact_e00_corvette");
  if (!C || !C.ship || !C.sh || !C.w) { chk("[10] the e00 scene", false, ""); return; }
  var c0 = killOf(C.sh, C.w, C.ship);
  var e2c = fly(put(H, "nato_e00_cawacs", s.x, s.y));
  var c1 = killOf(C.sh, C.w, C.ship), at3 = LAST;
  var hold3 = at3 && Game.setHolds(e2c, at3.x, at3.y);
  chk("[10] an e00 E-2C Hawkeye 2000 over an e00 Burke, holding the round: the cut (CEC, and no source it beat the clutter)",
      hold3 && near(c0, expected(C.ship, C.w, true)) && near(c1, c0) && c0 > 0,
      C.sh.def.name + "'s " + C.w.name + " at " + C.ship.def.name + ": holds it " + hold3 + "; kill without " + f3(c0) + ", with " + f3(c1));
}
