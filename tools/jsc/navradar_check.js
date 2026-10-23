/* tools/jsc/navradar_check.js - the warships that carried no radar figure
   now carry their set's, and it lifts the fog in bad weather. So do the
   amphibious ships.

     python3 tools/jsc/run.py index.html --test tools/jsc/navradar_check.js

   (owner) "the fog of war closes" round his ships in bad weather. A radar
   lifts the fog with no weather term (weather_radar_check.js [1]), but 31
   frigates, destroyers and carriers had no `radar` in the data, so their
   only picture was the crew's eyes, which the weather cuts. Fifteen of them
   carried a real air-search set that another row already has a figure for,
   and now carry that figure (rules.js RADAR_COVERAGE and the British, French
   and German rows; eras.js ERA_RADAR_SETS, "the frigates the generator left
   with no radar at all"). Checked:
     1. DATA: the fifteen rows carry exactly the figures written for them, a
        track quality beside every new radius, and no era row is left on the
        radar * 1.6 fallback (ERA_RADAR_GAPS).
     2. NOTHING ELSE MOVED: every other surface row's radar and radarQ is the
        one HEAD carried, pinned below; the frigates left without a figure,
        the landing craft, patrol boats, minesweepers and support ships are
        still without one.
     3. THE FOG, the player's: in overcast, night, rain and sandstorm each of
        the fifteen lights a contact floor(radar) tiles off (G.radarHeld and
        the fog grid) and not one two tiles past its radius - and with its
        figure taken away, as on HEAD, the night loses the same contact.
        The contact is a helicopter over the water, because a HULL there is
        also held without any radar figure by G.seaHolds, out to the
        watcher's own anti-ship reach (an LCS's NSM holds one 16 tiles off):
        that rule is HEAD's, it is not what this change is about, and a hull
        would hide what the radius does.
     4. THE COMMANDER'S PICTURE: the same contact at night is on the
        commander's own picture (G.sideSees) with the figure, and off it
        without.
     5. FIRE CONTROL, measured and reported: the set is what lays the ship's
        own guns and missiles (combat.js fcMul), so a round at a held target
        hits more often with the figure than without it.
   Run on HEAD's data, the first check of [1], [3] and [4] and the one of
   [5] failed, for all fifteen rows; [2] is the guard and passes on both.

   THE AMPHIBIOUS SHIPS. (owner) "amphibious ships should have the radar
   figures". No assault_sea row of any navy carried a radius, and all
   thirteen now carry one (rules.js lha_n, lhd_c and lhd_f; eras.js
   ERA_RADAR_SETS, "the amphibious ships"), held by every check above as the
   fifteen are. Eight take the figure of a row that carries their set; the
   Mistral's MRR3D-NG and the Ivan Rogov's MR-310 are carried by no row
   themselves, so those five take the nearest set of their class - the
   TRS-3D's and the Head Net-A's - and [1] pins them apart, so that the
   choice stays visible. [1] also walks each navy's assault slot decade by
   decade: it never covers or tracks less later. [2] still holds the
   landing craft, LSTs and support ships to navigation radar only. Run on
   the data before this change, five checks failed, all on amphibious hulls:
   the amphibious figures and the slot walk of [1], the first check of [3]
   and of [4], and [5]. The other checks pass on both. */
var TT = 32, PASS = 0, FAIL = 0;
var WX = ["overcast", "night", "rain", "sandstorm"];
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20"); set("opt-fac", "pact");
  set("opt-cash", "200000"); set("opt-seed", "btest"); set("opt-fog", "1"); set("opt-3d", "0");
  set("opt-weather", "clear");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

/* the fifteen rows: [id, radar, radarQ, the set] */
var FILLED = [
  ["destroyer_b", 19.6, 33, "SAMPSON / S1850M"],
  ["destroyer_f", 19.2, 30, "EMPAR / S1850M"],
  ["destroyer_g", 19, 28, "APAR / SMART-L"],
  ["carrier_b", 16.2, 15, "S1850M / Type 997"],
  ["carrier_f", 16, 18, "DRBJ 11B / DRBV 26D"],
  ["corvette_b", 17.2, 13, "Type 997 Artisan"],
  ["corvette_f", 18.2, 20, "Herakles"],
  ["corvette_g", 14.6, 11, "TRS-4D"],
  ["corvette_n", 14.6, 14, "TRS-3D"],
  ["nato_e50_corvette", 8.8, 9, "SPS-6"],
  ["nato_e60_corvette", 10.2, 15, "SPS-40"],
  ["nato_e80_corvette", 12.3, 20, "SPS-49"],
  ["nato_e90_corvette", 13.4, 20, "SPS-49"],
  ["nato_e00_corvette", 14.2, 14, "TRS-3D"],
  ["pact_e50_corvette", 6.6, 7, "Fut-N"]
];
/* the amphibious ships with a set another row carries: [id, radar, radarQ, the set] */
var AMPH = [
  ["lha_n", 17.5, 19, "SPS-48G / SPS-49 / SPQ-9B (the Reagan's)"],
  ["nato_e00_lhd", 17, 18, "SPS-48E / SPS-49 (the Nimitz's pair)"],
  ["nato_e90_lhd", 16.1, 18, "SPS-52C or SPS-48 / SPS-49"],
  ["nato_e80_lha", 14.7, 15, "SPS-52B / SPS-40B (the Spruance's SPS-40B)"],
  ["nato_e60_lph", 12.3, 15, "SPS-40 / SPS-10 (the Knox's fit)"],
  ["gbr_e90_lph", 16.4, 13, "Type 996 (the Type 23's)"],
  ["gbr_e00_lph", 17.2, 13, "Type 996 (the Type 23's)"],
  ["lhd_c", 16.5, 16, "Type 382 (the Liaoning's)"]
];
/* and the five whose set no row carries itself: the nearest set of its class */
var AMPH_NEAREST = [
  ["lhd_f", 14.6, 11, "MRR3D-NG -> TRS-3D (the K130's)"],
  ["fra_e00_lhd", 14.6, 11, "MRR3D-NG -> TRS-3D (the K130's)"],
  ["pact_e80_lpd", 9.8, 12, "MR-310 Head Net-C -> MR-300 Head Net-A (the Grozny's)"],
  ["pact_e90_lpd", 9.8, 12, "MR-310 Head Net-C -> MR-300 Head Net-A (the Grozny's)"],
  ["pact_e00_lpd", 9.8, 12, "MR-310 Head Net-C -> MR-300 Head Net-A (the Grozny's)"]
];
/* the rows each nearest-class figure is taken from, which must still say it */
var NEAREST_FROM = [["deu_e00_corvette", 14.6, 11], ["pact_e60_cruiser", 9.8, 12]];
AMPH = AMPH.concat(AMPH_NEAREST);
var ALL = FILLED.concat(AMPH);
/* Every other surface row as HEAD carried it: id radar radarQ ("-" = none),
   measured before the change. */
var HEAD_SEA = "carrier_c 17 19|carrier_n 18 20|carrier_p 13 14|corvette_r 9 12|cruiser_c 23 41|cruiser_n 22 40|cruiser_p 14 21|" +
  "destroyer_c 19 32|destroyer_n 20 34|destroyer_p 11 18|destroyer_r 15 26|missileboat_r 9 9|" +
  "nato_e50_battleship 12 9|nato_e60_battleship 12.6 10|nato_e80_battleship 16 17|nato_e90_battleship 16 17|" +
  "fra_e00_carrier 16 18|gbr_e00_carrier 16.2 15|nato_e00_carrier 17.5 19|pact_e00_carrier 12.6 14|pla_e00_carrier 16.5 16|" +
  "fra_e50_carrier 9 7|gbr_e50_carrier 9.8 9|nato_e50_carrier 10.8 11|fra_e60_carrier 11.2 11|gbr_e60_carrier 11.6 12|" +
  "nato_e60_carrier 12.6 18|pact_e60_carrier 9.1 13|fra_e80_carrier 13.2 11|gbr_e80_carrier 13.6 12|nato_e80_carrier 15.1 17|" +
  "pact_e80_carrier 10.5 13|fra_e90_carrier 14.2 11|gbr_e90_carrier 14.6 13|nato_e90_carrier 16.6 18|pact_e90_carrier 12 14|" +
  "deu_e00_corvette 14.6 11|fra_e00_corvette 18.2 20|gbr_e00_corvette 17.2 13|roc_e00_corvette 8.7 11|fra_e50_corvette 8.2 6|" +
  "gbr_e50_corvette 8.6 6|roc_e50_corvette 5.4 5|deu_e60_corvette 9 7|fra_e60_corvette 9.4 7|gbr_e60_corvette 9.8 9|" +
  "roc_e60_corvette 6.3 5|fra_e80_corvette 12.4 8|gbr_e80_corvette 13.5 10|roc_e80_corvette 7.6 5|fra_e90_corvette 15.8 11|" +
  "gbr_e90_corvette 16.4 13|roc_e90_corvette 8.3 5|pact_e00_cruiser 13.6 21|fra_e50_cruiser 11.4 10|gbr_e50_cruiser 11.8 9|" +
  "nato_e50_cruiser 13.2 12|pact_e50_cruiser 8.4 8|fra_e60_cruiser 13.2 12|gbr_e60_cruiser 13.6 12|nato_e60_cruiser 15.4 22|" +
  "pact_e60_cruiser 9.8 12|fra_e80_cruiser 17.2 13|nato_e80_cruiser 18.5 36|pact_e80_cruiser 11.8 20|nato_e90_cruiser 20.2 38|" +
  "pact_e90_cruiser 12.9 21|deu_e00_destroyer 19 28|fra_e00_destroyer 19.2 30|gbr_e00_destroyer 19.6 33|nato_e00_destroyer 19.4 33|" +
  "pla_e00_destroyer 18.4 28|roc_e00_destroyer 14.6 25|deu_e50_destroyer 10.4 8|fra_e50_destroyer 11 9|gbr_e50_destroyer 11.5 9|" +
  "nato_e50_destroyer 12 10|pact_e50_destroyer 6.6 7|pla_e50_destroyer 11.4 5|roc_e50_destroyer 9 7|deu_e60_destroyer 13 14|" +
  "fra_e60_destroyer 13.8 16|gbr_e60_destroyer 13.4 15|nato_e60_destroyer 14 16|pact_e60_destroyer 7.7 12|pla_e60_destroyer 13.3 9|" +
  "roc_e60_destroyer 10.5 9|deu_e80_destroyer 15 12|fra_e80_destroyer 15.4 14|gbr_e80_destroyer 16 15|nato_e80_destroyer 16.8 15|" +
  "pact_e80_destroyer 9.2 17|pla_e80_destroyer 16 10|roc_e80_destroyer 12.6 12|deu_e90_destroyer 16.4 14|fra_e90_destroyer 17 19|" +
  "gbr_e90_destroyer 17.4 20|nato_e90_destroyer 18.4 32|pact_e90_destroyer 10.1 18|pla_e90_destroyer 17.5 14|roc_e90_destroyer 13.8 20|" +
  "roc_e00_missileboat 8.7 5|roc_e60_missileboat 6.3 2|roc_e80_missileboat 7.6 2|roc_e90_missileboat 8.3 2|" +
  /* the frigates left without a figure: no row carries one for their set */
  "corvette_p - 9|corvette_c - 13|corvette_k - 5|pact_e00_corvette - -|pla_e00_corvette - -|kpa_e50_corvette - -|" +
  "pact_e60_corvette - -|pla_e50_corvette - -|pla_e60_corvette - -|kpa_e60_corvette - -|kpa_e80_corvette - -|pact_e80_corvette - -|" +
  "pla_e80_corvette - -|kpa_e90_corvette - -|pact_e90_corvette - -|pla_e90_corvette - -|" +
  /* missile boats outside the ROC: the radar vehicle's bubble is theirs (rules.js radarv) */
  "missileboat_c - 8|missileboat_k - 4|missileboat_p - 7|deu_e00_missileboat - -|kpa_e00_missileboat - -|pact_e00_missileboat - -|" +
  "pla_e00_missileboat - -|deu_e60_missileboat - -|kpa_e60_missileboat - -|pact_e60_missileboat - -|pla_e60_missileboat - -|" +
  "deu_e80_missileboat - -|kpa_e80_missileboat - -|nato_e80_missileboat - -|pact_e80_missileboat - -|deu_e90_missileboat - -|" +
  "kpa_e90_missileboat - -|pla_e90_missileboat - -";
  /* (the amphibious ships all carry a figure now: AMPH, above) */
/* the roles held to "navigation radar only", as the roster always had them */
var NAV_ONLY = ["landing_craft", "transport_sea", "patrol", "minesweeper", "oiler", "repair_sea", "navminelayer"];

var P, E, M;
function gone(u) {
  if (!u || u.dead === undefined) return; u.dead = true;
  var i = Game.entities.indexOf(u); if (i >= 0) Game.entities.splice(i, 1);
  var l = u.owner && (u.kind === "building" ? u.owner.buildings : u.owner.units);
  if (l) { i = l.indexOf(u); if (i >= 0) l.splice(i, 1); }
}
function clearAll() { [P, E].forEach(function (p) { p.units.slice().forEach(gone); }); }
/* a commander's radar picture is repainted once per FOG_UPDATE (G.radarMask),
   so a question asked after a figure changes must come after the clock moves */
function stale() { Game.time += CFG.FOG_UPDATE + 0.01; }
function regrid() {
  Game.grid.clear();
  Game.entities.forEach(function (e) { if (!e.dead && !e.carried) Game.grid.insert(e); });
}
function setWx(k) { Game.weatherKey = k; Game.weatherLock = true; }
function sea(x, y) { return x >= 2 && y >= 2 && x < M.W - 2 && y < M.H - 2 && GameMap.passable(M, x, y, "sea"); }
function put(p, key, tx, ty) {
  var u = Game.spawnUnitAt(p, key, (tx + 0.5) * TT, (ty + 0.5) * TT);
  if (!u) return null;
  u.x = (tx + 0.5) * TT; u.y = (ty + 0.5) * TT; u.tx = tx; u.ty = ty;
  u.maxHp = u.hp = 1e7; u.stance = "hold"; u.moving = false; u.order = null;
  return u;
}
/* a sea tile with open water for `n` tiles in a straight line east or west
   of it, and far from both bases */
function seaRun(n) {
  for (var y = 3; y < M.H - 3; y++) for (var x = 3; x < M.W - 3; x++) {
    if (!sea(x, y)) continue;
    var far = [P, E].every(function (p) { return Math.hypot(x - p.homeX / TT, y - p.homeY / TT) > n + 14; });
    if (!far) continue;
    for (var s = -1; s <= 1; s += 2) {
      var ok = true;
      for (var k = 1; k <= n && ok; k++) if (!sea(x + s * k, y)) ok = false;
      if (ok) return { x: x, y: y, s: s };
    }
  }
  return null;
}
/* How often one round hits, exactly: Combat.fire rolls game.rng() < acc, so
   with the RNG held at a constant the round hits for every constant below acc.
   (weather_radar_check.js accOf, the same bisection.) */
function accOf(sh, wkey, tg) {
  var w = WEAPONS[wkey], rng0 = Game.rng, lo = 0, hi = 1, hp0 = tg.hp;
  var n0 = Combat.projectiles.length, f0 = Combat.effects.length;
  for (var i = 0; i < 20; i++) {
    var mid = (lo + hi) / 2;
    Game.rng = function () { return mid; };
    var np = Combat.projectiles.length, ne = Combat.effects.length, hit = false;
    Combat.fire(Game, sh, w, tg);
    if (Combat.projectiles.length > np) hit = !!Combat.projectiles[Combat.projectiles.length - 1].hit;
    else {
      for (var k = Combat.effects.length - 1; k >= ne; k--) {
        var fx = Combat.effects[k];
        if (fx.t === "tracer") { hit = fx.x2 === tg.x; break; }
      }
    }
    if (hit) lo = mid; else hi = mid;
  }
  Game.rng = rng0; tg.hp = hp0;
  Combat.projectiles.length = n0; Combat.effects.length = f0;
  return lo;
}
function f1(v) { return (+v).toFixed(1); }
function f3(v) { return (+v).toFixed(3); }

function run() {
  P = Game.human; M = Game.map;
  E = Game.players.filter(function (p) { return p !== P && !Game.allied(P, p); })[0];
  AI.setPeace(E, true); Game.checkVictory = function () {};
  Game.players.forEach(function (p) { p.units.slice().forEach(gone); });
  setWx("clear");

  /* ---------------- 1. data ---------------- */
  log("[1] the fifteen rows, and the amphibious ships");
  var bad = [];
  FILLED.forEach(function (f) {
    var d = UNITS[f[0]];
    if (!d) { bad.push(f[0] + " missing"); return; }
    if (d.radar !== f[1] || d.radarQ !== f[2]) bad.push(f[0] + " " + d.radar + "/" + d.radarQ + " not " + f[1] + "/" + f[2]);
    if (d.layer !== "sea" || d.submerged) bad.push(f[0] + " is not a surface hull");
  });
  chk("[1] each carries its set's coverage radius and track quality", !bad.length,
      bad.join("; ") || FILLED.map(function (f) { return f[0] + " " + f[1] + "/" + f[2]; }).join(", "));
  var abad = [];
  AMPH.forEach(function (f) {
    var d = UNITS[f[0]];
    if (!d) { abad.push(f[0] + " missing"); return; }
    if (d.radar !== f[1] || d.radarQ !== f[2]) abad.push(f[0] + " " + d.radar + "/" + d.radarQ + " not " + f[1] + "/" + f[2]);
    if (d.role !== "assault_sea") abad.push(f[0] + " is " + d.role + ", not an amphibious ship");
  });
  chk("[1] the amphibious ships carry their set's coverage radius and track quality", !abad.length,
      abad.join("; ") || AMPH.map(function (f) { return f[0] + " " + f[1] + "/" + f[2]; }).join(", "));
  var near = [];
  AMPH_NEAREST.forEach(function (f) { near.push(f[0] + " " + f[3]); });
  NEAREST_FROM.forEach(function (f) {
    var d = UNITS[f[0]];
    if (!d || d.radar !== f[1] || d.radarQ !== f[2]) near.push("BAD " + f[0] + " " + (d && d.radar) + "/" + (d && d.radarQ) + " not " + f[1] + "/" + f[2]);
  });
  chk("[1] the Mistral and the Ivan Rogov take the nearest set of its class, and the rows it comes from still say so",
      !near.some(function (s) { return s.indexOf("BAD ") === 0; }), near.join("; "));
  /* every assault_sea row is one or the other, so a new one cannot slip in */
  var aStray = [];
  for (var ak in UNITS) {
    var ad = UNITS[ak];
    if (!ad || ad.role !== "assault_sea") continue;
    if (!AMPH.some(function (f) { return f[0] === ak; })) aStray.push(ak);
  }
  chk("[1] and every amphibious assault row is one of those thirteen", !aStray.length && AMPH.length === 13,
      aStray.join(", ") || AMPH.length + " rows");
  /* each navy's assault slot, decade by decade into the present day: a
     later ship never tracks worse (the _behtest [55] fleet walk does the
     same over every hull role) */
  var aDrop = [], aSteps = 0;
  ["nato", "pact", "pla", "roc", "gbr", "fra", "deu", "kpa"].forEach(function (fc) {
    var pq = null, pr = null, pe = null;
    ["e50", "e60", "e80", "e90", "e00", "e20"].forEach(function (e) {
      var id = unitFor(fc, "assault_sea", e), d = id && UNITS[id];
      if (!d || d.radarQ === undefined) return;
      if (pq !== null) {
        aSteps++;
        if (d.radarQ < pq || d.radar < pr) aDrop.push(fc + " " + pe + "->" + e + " " + pr + "/" + pq + " -> " + d.radar + "/" + d.radarQ);
      }
      pq = d.radarQ; pr = d.radar; pe = e;
    });
  });
  chk("[1] an amphibious slot never covers or tracks less in a later decade", !aDrop.length && aSteps >= 8,
      aDrop.join("; ") || aSteps + " decade-to-decade steps");
  chk("[1] no era row with a radius is left without a track quality (ERA_RADAR_GAPS)",
      typeof ERA_RADAR_GAPS !== "undefined" && ERA_RADAR_GAPS.length === 0,
      typeof ERA_RADAR_GAPS === "undefined" ? "no gap list" : ERA_RADAR_GAPS.slice(0, 4).join("; "));
  /* no new figure is shorter than the hull's own anti-aircraft weapon
     (_behtest [55] check 7: entities.js needsTrack would gag the gun) */
  var mute = [];
  ALL.forEach(function (f) {
    var d = UNITS[f[0]], far = 0;
    (d.weapons || []).forEach(function (w) { var W = WEAPONS[w]; if (W && W.tgt && W.tgt.air && (W.range || 0) > far) far = W.range; });
    if (far - d.radarQ > 1.0) mute.push(f[0] + " radarQ " + d.radarQ + " vs " + far);
  });
  chk("[1] no new track is shorter than the hull's own anti-aircraft weapon", !mute.length, mute.join("; "));

  /* ---------------- 2. nothing else moved ---------------- */
  log("\n[2] every other surface row");
  var moved = [], seen = {}, filled = {};
  ALL.forEach(function (f) { filled[f[0]] = 1; });
  HEAD_SEA.split("|").forEach(function (s) {
    var a = s.split(" "), d = UNITS[a[0]];
    seen[a[0]] = 1;
    if (!d) { moved.push(a[0] + " missing"); return; }
    var r = a[1] === "-" ? undefined : +a[1], q = a[2] === "-" ? undefined : +a[2];
    if (d.radar !== r || d.radarQ !== q) moved.push(a[0] + " " + d.radar + "/" + d.radarQ + " was " + a[1] + "/" + a[2]);
  });
  chk("[2] every pinned row's radar and radarQ is the one HEAD carried", !moved.length,
      moved.slice(0, 5).join("; ") || Object.keys(seen).length + " rows");
  var nav = [], navN = 0, stray = [];
  for (var k in UNITS) {
    var d = UNITS[k];
    if (!d || d.layer !== "sea" || d.submerged) continue;
    if (NAV_ONLY.indexOf(d.role) >= 0) { navN++; if (d.radar) nav.push(k + " radar " + d.radar); continue; }
    if (!seen[k] && !filled[k]) stray.push(k);
  }
  chk("[2] landing craft, patrol boats, minesweepers and support ships still carry no radius (navigation sets only)",
      !nav.length && navN > 40, nav.join("; ") || navN + " rows");
  chk("[2] and every other surface row is pinned above, so none can move unseen", !stray.length, stray.join(", "));

  /* ---------------- 3. the player's fog ---------------- */
  log("\n[3] the player's fog round each hull");
  var S = seaRun(23);
  chk("[3] open water for a 23-tile line, away from both bases", !!S, JSON.stringify(S));
  if (!S) return;
  log("  site " + S.x + "," + S.y + " looking " + (S.s > 0 ? "east" : "west"));
  var lostNow = [], litPast = [], keptEyes = [], lostBefore = [], rows3 = [];
  ALL.forEach(function (f) {
    var id = f[0], d = UNITS[id], n = Math.floor(f[1]);
    clearAll();
    var me = put(P, id, S.x, S.y), tIn = put(E, "helo_p", S.x + S.s * n, S.y), tOut = put(E, "helo_p", S.x + S.s * (n + 2), S.y);
    if (!me || !tIn || !tOut) { lostNow.push(id + " not placed"); [me, tIn, tOut].forEach(gone); return; }
    regrid();
    var eyes = [];
    WX.forEach(function (k) {
      setWx(k); Game.recomputeFog();
      var held = Game.radarHeld ? Game.radarHeld(P, tIn.x, tIn.y) : false;
      if (!(held && Game.visibleTo(P, tIn))) lostNow.push(id + " " + k);
      if ((Game.radarHeld && Game.radarHeld(P, tOut.x, tOut.y)) ||
          (Game.visibleTo(P, tOut) && me.sightR() < n + 2)) litPast.push(id + " " + k);
      eyes.push(me.sightR());
    });
    /* without the figure, as on HEAD: the night takes the contact */
    setWx("night");
    var r0 = d.radar; delete d.radar;
    Game.recomputeFog();
    var night = me.sightR();
    if (night < n) { if (Game.visibleTo(P, tIn)) lostBefore.push(id + " still lit"); }
    else keptEyes.push(id + " (night eyes " + f1(night) + " of " + n + ")");
    d.radar = r0; Game.recomputeFog();
    rows3.push(id + " " + n + "t: eyes " + eyes.map(f1).join("/"));
    clearAll(); regrid();
  });
  setWx("clear"); Game.recomputeFog();
  rows3.forEach(function (s) { log("  " + s); });
  chk("[3] overcast, night, rain, sandstorm: each hull's radar lights a contact floor(radar) tiles off (G.radarHeld, the fog grid)",
      !lostNow.length, lostNow.slice(0, 6).join("; ") || ALL.length * WX.length + " hull-weathers");
  chk("[3] and nothing two tiles past its radius: the radius is the figure", !litPast.length, litPast.slice(0, 6).join("; "));
  chk("[3] without the figure, as on HEAD, the night loses that contact wherever the crew's eyes fall short",
      !lostBefore.length && keptEyes.length < ALL.length, lostBefore.join("; ") ||
      (ALL.length - keptEyes.length) + " of " + ALL.length + " lost" + (keptEyes.length ? "; inside night eyes anyway: " + keptEyes.join(", ") : ""));

  /* ---------------- 4. the commander's picture ---------------- */
  log("\n[4] the commander's picture at night");
  var aiLost = [], aiBefore = [], aiN = 0;
  setWx("night");
  ALL.forEach(function (f) {
    var id = f[0], d = UNITS[id], n = Math.floor(f[1]);
    clearAll();
    var me = put(E, id, S.x, S.y), t = put(P, "helo_p", S.x + S.s * n, S.y);
    if (!me || !t) { aiLost.push(id + " not placed"); clearAll(); return; }
    regrid(); stale();
    if (!Game.sideSees(E, t)) aiLost.push(id);
    var r0 = d.radar; delete d.radar; stale();
    if (me.sightR() < n) { aiN++; if (Game.sideSees(E, t)) aiBefore.push(id); }
    d.radar = r0; stale();
    clearAll(); regrid();
  });
  setWx("clear");
  chk("[4] night: each hull holds a contact floor(radar) tiles off on the commander's own picture (G.sideSees)",
      !aiLost.length, aiLost.join(", "));
  chk("[4] and without the figure it does not, wherever the crew's eyes fall short", !aiBefore.length && aiN > 0,
      aiBefore.join(", ") || aiN + " hulls");

  /* ---------------- 5. fire control ---------------- */
  log("\n[5] the set lays the ship's own rounds (combat.js fcMul), clear day, nobody else's radar");
  var worse = [], lines = [];
  ALL.forEach(function (f) {
    var id = f[0], d = UNITS[id];
    var wk = null;
    (d.weapons || []).forEach(function (w) { var W = WEAPONS[w]; if (!wk && W && W.tgt && W.tgt.sea && W.dmg > 0 && !W.landAttack) wk = w; });
    if (!wk) { lines.push(id + ": no anti-surface round"); return; }
    var W = WEAPONS[wk], n = Math.max(1, Math.min(Math.floor(f[1]), Math.floor((W.range || 2) - 0.6)));
    clearAll();
    var me = put(P, id, S.x, S.y), t = put(E, "boat_p", S.x + S.s * n, S.y);
    if (!me || !t) { worse.push(id + " not placed"); clearAll(); return; }
    regrid();
    var withR = accOf(me, wk, t);
    var r0 = d.radar; delete d.radar;
    var without = accOf(me, wk, t);
    d.radar = r0;
    lines.push(id + " " + wk.split("__")[0] + " at " + n + "t: " + f3(withR) + " with, " + f3(without) + " without");
    if (!(withR > without)) worse.push(id + " " + f3(withR) + "/" + f3(without));
    clearAll(); regrid();
  });
  lines.forEach(function (s) { log("  " + s); });
  chk("[5] every hull with an anti-surface round hits a held target more often with its figure than without", !worse.length,
      worse.join("; "));
}
