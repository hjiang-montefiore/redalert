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
         in the 1980s and 1990s, and every other side's card each period as
         B3 sets it (none for France or Germany);
     [2] set up on the shore, it fires on an enemy ship nine tiles out - past
         its own five-tile sight - that a scout of its side has in view;
     [3] ...and not on one nobody of its side can see;
     [4] it never fires at a tank, even one in view and in range;
     [5] its two rounds are counted down, and with none left it stops;
     [6] it does not drive after a ship that sails out of its reach;
     [7] the other Pact rows (B2);
     [8] the other sides' rows (B3): the PLA's HY-2A, YJ-62 and YJ-12B, the
         KPA's Kumsong-3, the ROC's Hsiung Feng II, the US NMESIS and the
         British Excalibur - each row's figures, and every side's cards in
         each period;
     [9] its own Garpun (B4, def.seaRadar): set up and transmitting, it holds
         the ship itself and fires with no scout, and the enemy hears it;
         switched off, or on the march, it holds nothing and is not heard;
         the Redut, whose radar is another vehicle, holds nothing and has no
         set to switch off.
   [2]-[6] run with the Rubezh's radar switched off, so the cue they test is
   the side's and not its own. */
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
  var ERAS6 = ["e50", "e60", "e80", "e90", "e00", "e20"];
  var only = ["pact", "nato", "pla", "kpa", "roc", "deu", "gbr", "fra"].map(function (f) {
    return ERAS6.map(function (e) { return unitFor(f, "coastssm", e) || "-"; }).join("/"); });
  var OTHERS = ["-/-/-/-/-/nato_e20_coastssm", "-/-/pla_e80_coastssm/pla_e80_coastssm/pla_e00_coastssm/pla_e00_coastssm",
                "-/-/-/-/kpa_e00_coastssm/kpa_e00_coastssm", "-/-/-/-/roc_e00_coastssm/roc_e00_coastssm", "-/-/-/-/-/-",
                "-/-/gbr_e80_coastssm/gbr_e80_coastssm/-/-", "-/-/-/-/-/-"].join(" | ");
  chk("[1] the Rubezh: two P-15Ms at 12.4 tiles, ships only, five minutes to set up; the Pact's card each period, and each other side's as B3 sets it (France and Germany none)",
      !!D && D.role === "coastssm" && D.rounds === 2 && D.deploySec === 4.0 && D.deploy && !!W && W.range === 12.4 &&
      W.tgt.sea === 1 && !W.tgt.ground && !W.tgt.air &&
      only[0] === "pact_e50_coastssm/pact_e60_coastssm/pact_e80_coastssm/pact_e80_coastssm/pact_e00_coastssm/pact_e00_coastssm" &&
      only.slice(1).join(" | ") === OTHERS && ROUNDS_REQUIRED.indexOf("coastssm") >= 0 && ROUNDS_ERA_GAPS.length === 0,
      only.join(" | "));
  /* B2: the rest of the Soviet and Russian rows, each period's cards */
  var rows = { pact_e50_coastssm: ["ssm_s2", 12.45, 1, 13.6, "e50", "e60"], pact_e60_coastssm: ["ssm_p35b", 14.0, 1, 4.0, "e60", "e90"],
               pact_e00_coastssm: ["ssm_kh35_bal", 13.5, 8, 4.0, "e00", undefined], pact_e20_coastssm: ["ssm_oniks_bastion", 15.0, 2, 4.0, "e00", undefined] };
  var bad = [];
  Object.keys(rows).forEach(function (k) {
    var r = rows[k], u = UNITS[k], w = u && WEAPONS[u.weapons[0]];
    if (!u || !w) { bad.push(k + " missing"); return; }
    if (u.weapons[0].split("__")[0] !== r[0] || w.range !== r[1] || u.rounds !== r[2] || u.deploySec !== r[3] || u.from !== r[4] || u.to !== r[5] || u.role !== "coastssm")
      bad.push(k + " " + u.weapons[0] + " " + w.range + " r" + u.rounds + " d" + u.deploySec + " " + u.from + "-" + u.to);
    if (w.tgt.ground || w.tgt.air || !w.tgt.sea) bad.push(k + " not ships only");
  });
  var cards = ERAS6.map(function (e) { return e + ":" + Object.keys(UNITS).filter(function (k) { var u = UNITS[k]; return u.role === "coastssm" && u.fac === "pact" && inEra(u, e); }).map(function (k) { return UNITS[k].name; }).join("+"); });
  chk("[7] Sopka (1958, one S-2, 17 min), Redut (1966, one P-35B), Bal (2008, eight Kh-35), Bastion-P (2011, two Oniks: the 2000s-10s card on), ships only, each in its periods",
      !bad.length && cards.join(" ") === "e50:Sopka e60:Sopka+Redut e80:Rubezh+Redut e90:Rubezh+Redut e00:Bal+Bastion-P e20:Bal+Bastion-P",
      (bad.join("; ") || "figures as sourced") + "; cards " + cards.join(" "));

  /* B3: the other sides' rows. [weapon, its range (the unsuffixed row), rounds,
     deploySec, from, to, service, confidence, cost, hp, speed] */
  var rows3 = {
    pla_e80_coastssm: ["ssm_hy2", 15.2, 2, 4.0, "e80", "e90", "1983", "medium", 1650, 470, 0.70],
    pla_e00_coastssm: ["ssm_yj62", 16.9, 2, 4.0, "e00", undefined, "2009", "medium", 2500, 630, 1.25],
    pla_e20_coastssm: ["ssm_yj12b", 16.95, 3, 4.0, "e00", undefined, "2018", "medium", 3300, 570, 1.25],
    kpa_e00_coastssm: ["ssm_kumsong3", 9.4, 4, 4.0, "e00", undefined, "2017", "medium", 2600, 530, 1.40],
    roc_e00_coastssm: ["ssm_hf2_shore", 14.9, 2, 4.0, "e00", undefined, "2005", "high", 2900, 560, 1.25],
    nato_e20_coastssm: ["ssm_nsm_nmesis", 16.0, 2, 4.0, "e20", undefined, "2024", "high", 2900, 520, 1.55],
    gbr_e80_coastssm: ["ssm_exocet38_shore", 9.6, 1, 4.0, "e80", "e90", "1985", "medium", 2700, 470, 1.50] };
  var bad3 = [];
  Object.keys(rows3).forEach(function (k) {
    var r = rows3[k], u = UNITS[k], w = u && WEAPONS[u.weapons[0]], w0 = WEAPONS[r[0]];
    if (!u || !w || !w0) { bad3.push(k + " missing"); return; }
    var got = [u.weapons[0].split("__")[0], w0.range, u.rounds, u.deploySec, u.from, u.to, u.service, u.confidence, u.cost, u.hp, u.speed];
    if (got.some(function (v, i) { return v !== r[i]; }) || u.role !== "coastssm" || !u.deploy) bad3.push(k + " " + got.join(" "));
    if (w.tgt.ground || w.tgt.air || !w.tgt.sea || w0.tgt.ground || w0.tgt.air) bad3.push(k + " not ships only");
  });
  var FACS8 = ["pact", "nato", "pla", "kpa", "roc", "deu", "gbr", "fra"];
  var cards3 = FACS8.map(function (f) {
    return f + "[" + ERAS6.map(function (e) { return e + ":" + Object.keys(UNITS).filter(function (k) { var u = UNITS[k]; return u.role === "coastssm" && u.fac === f && inEra(u, e); }).map(function (k) { return UNITS[k].name; }).join("+"); }).join(" ") + "]"; }).join(" | ");
  var CARDS3 = ["pact[e50:Sopka e60:Sopka+Redut e80:Rubezh+Redut e90:Rubezh+Redut e00:Bal+Bastion-P e20:Bal+Bastion-P]",
                "nato[e50: e60: e80: e90: e00: e20:NMESIS]",
                "pla[e50: e60: e80:HY-2A e90:HY-2A e00:YJ-62+YJ-12B e20:YJ-62+YJ-12B]",
                "kpa[e50: e60: e80: e90: e00:Kumsong-3 e20:Kumsong-3]",
                "roc[e50: e60: e80: e90: e00:Hsiung Feng II e20:Hsiung Feng II]",
                "deu[e50: e60: e80: e90: e00: e20:]",
                "gbr[e50: e60: e80:Excalibur e90:Excalibur e00: e20:]",
                "fra[e50: e60: e80: e90: e00: e20:]"].join(" | ");
  chk("[8] HY-2A (1983), YJ-62 (2009), YJ-12B (2018, three), Kumsong-3 (2017, four), Hsiung Feng II (2005), NMESIS (2024), Excalibur (1985-97): figures as sourced, ships only; every side's cards each period",
      !bad3.length && cards3 === CARDS3, (bad3.join("; ") || "figures as sourced") + "; cards " + cards3);

  var S = shore(9);
  if (!S) { chk("a shore with open sea nine tiles off", false, "none on hormuz"); return; }
  var put = function (p, id, x, y) { var u = Game.spawnUnitAt(p, id, x * TT + 16, y * TT + 16); if (u) { u.order = { type: "idle" }; u.orders = []; } return u; };
  var rb = put(P, "pact_e80_coastssm", S.x, S.y);
  SHOOTER = rb;
  rb.stance = "guard";
  ticks(6);
  Game.setEmcon(rb, true);                 // its own Garpun off until [9]
  var shipId = unitFor("nato", "destroyer", "e80") || "destroyer_n";
  var ship = put(E, shipId, S.sx, S.sy);
  ship.stance = "hold"; ship.hp = ship.maxHp = 1e6;

  /* ---- 3. nobody of its side sees the ship ---- */
  shots = 0;
  ticks(8, count);
  chk("[3] set up on the shore, its radar off, it does not fire on a ship nine tiles out that nobody of its side can see",
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

  /* ---- 9. its own Garpun ---- */
  sc.dead = true; ship2.dead = true; Game.sweepDead && Game.sweepDead();
  var ship3 = put(E, shipId, S.sx, S.sy);
  ship3.hp = ship3.maxHp = 1e6; ship3.stance = "hold";
  rb.rounds = 2;
  ticks(1);
  var heard = function () { var s = Game.esmPlot(E); return !!(s && s.has(rb.id)); };
  var dark = { held: Game.seaHolds(P, ship3), heard: heard() };
  Game.setEmcon(rb, false);
  ticks(Game.relightDelay(rb) + 0.5);
  var on = { held: Game.seaHolds(P, ship3), heard: heard() };
  shots = 0;
  ticks(12, count);
  on.shots = shots;
  rb.deployed = false;
  var march = { held: Game.seaHolds(P, ship3) };
  rb.deployed = true;
  chk("[9] set up and transmitting, its Garpun holds the ship nine tiles out and it fires with no scout, and the ship hears it; off, or on the march, nothing",
      Game.canEmcon(rb) && on.held && on.shots >= 1 && on.heard && !dark.held && !dark.heard && !march.held,
      "on: held " + on.held + ", " + on.shots + " fired, heard " + on.heard + " (the destroyer's set " + (ship3.def.radar || 0) + ")" +
      "; off: held " + dark.held + ", heard " + dark.heard + "; on the march: held " + march.held);
  Game.setEmcon(rb, true);
  var rd = put(P, "pact_e60_coastssm", S.x, S.y + 1);
  if (rd) rd.stance = "guard";
  ticks(6);
  chk("[9] ...while the Redut beside it, set up, holds nothing: its radar is another vehicle, and it has no set to switch off",
      !!rd && rd.deployed && !Game.seaHolds(P, ship3) && !Game.canEmcon(rd),
      rd ? "deployed " + rd.deployed + ", held " + Game.seaHolds(P, ship3) + ", can go dark " + Game.canEmcon(rd) : "no Redut");
}
