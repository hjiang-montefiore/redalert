/* tools/jsc/escort_ai_check.js - the commander flies its early-warning
   aircraft WITH a force (ai.js ESCORT, aewEscort), checked on the real game
   under JavaScriptCore, 3D off.

     python3 tools/jsc/run.py index.html --test tools/jsc/escort_ai_check.js

   (owner, 2026-10-24) on the E-2D: "any idea that early warning aircraft,
   E2D, to company with other units to enhance other units to ability" -
   "build both". entities.js ESCORT is the order (tools/jsc/escort_check.js);
   this is the commander's use of it. Every scene is a fresh Game.init on
   hormuz in the 2020s: a human seat nobody drives and a NATO commander, all
   units of both sides taken off the board, the commander held at peace
   (AI.setPeace) with no money, so it launches and buys nothing of its own
   while its think - which flies its aircraft at peace as at war - runs on
   its own clock.
     1. A carrier and an E-2D on her deck: the commander gives the E-2D an
        escort of her (the "deck" choice), and it is airborne over her.
     2. She is lost and a destroyer remains: on the next thinks - not after
        the hold - the E-2D escorts the destroyer (the "fleet" choice).
     3. No thrash: a second carrier put in the water inside the hold is not
        taken until the hold (ESC_HOLD) is up, and then it is.
     4. No ships at all, land-based: an E-3G with no force to go with keeps
        the patrol station it always flew (a third of the way to the rival,
        as the reference run with aiOff "escort" flies it); three tanks in
        the wave past the station are not a clear thrust and change nothing
        at its review; six are, and at its review it escorts the tank
        nearest the body's middle (the "land" choice), keeps it through a
        reshuffled wave inside the hold, and flies over it. The wave gone
        (out of the list), it goes back to the station at its review. A
        commander with nobody to fight stands a wave of puppets down on
        every think, so the reviews with a wave stood up are run through
        AI.escortOf(E).review - the sortie loop's own handling, hold and
        all - between thinks.
     5. An E-2D with no ship at all is flown as the land-based one: the
        station; and aiOff "escort" leaves every AEW on the station as
        before, carrier or none.
     6. FOG: its choice is made of its own forces. An enemy carrier and
        cruiser a few tiles off our one destroyer, in sight, are not taken:
        the E-2D escorts the destroyer. */
var PASS = 0, FAIL = 0, TT = 32, DT = 1 / 30;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-seed", "escai"); set("opt-fog", "1"); set("opt-3d", "0");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

/* ------------------------------------------------------------ the scene */
var H = null, E = null, X = null, EACH = null;
function scene(o) {
  o = o || {};
  Game.init({ theatre: "hormuz", seed: "escai", cash: 0, diff: "commander",
    era: "e20", eraAI: "e20", eraCapHuman: "e20", eraCapAI: "e20", fog: true,
    startPos: -1, weather: "clear", factionHuman: "pact", factionAI: "nato",
    techHuman: 3, techAI: 3, capHuman: 3, capAI: 3, armsHuman: "all", armsAI: "all",
    superweapons: false, resources: 1, mapSize: 144, aiHandicap: 1,
    roster: [{ faction: "pact", ai: false, team: 1, label: "YOU" },
             { faction: "nato", ai: true, team: 2, diff: "commander", personality: "balanced", label: "ENEMY" }] });
  H = Game.players[0]; E = Game.players[1];
  Game.checkVictory = function () {};
  AI.setPeace(E, true);
  E.cash = 0;
  if (o.off) E.aiOff = new Set(["escort"]);
  [H, E].forEach(function (p) {
    p.units.slice().forEach(function (u) {
      var i = Game.entities.indexOf(u); if (i >= 0) Game.entities.splice(i, 1);
      u.dead = true;
    });
    p.units.length = 0;
  });
  X = AI.escortOf(E);
  EACH = null;
  return !!X;
}
function tick(sec, stop) {
  var n = Math.round(sec / DT);
  for (var i = 0; i < n; i++) { Game.tick(DT); if (EACH) EACH(); if (stop && stop()) return (i + 1) * DT; }
  return -1;
}
function durable(u) { if (u) u.hp = u.maxHp = 1e6; return u; }
function gone(u) {
  if (!u) return; u.dead = true;
  var i = Game.entities.indexOf(u); if (i >= 0) Game.entities.splice(i, 1);
  var l = u.owner && (u.kind === "building" ? u.owner.buildings : u.owner.units);
  if (l) { i = l.indexOf(u); if (i >= 0) l.splice(i, 1); }
}
/* open water `clear` tiles round, nearest (nx, ny) in tiles, `skip` tiles
   from any point already taken */
var TAKEN = [];
function seaSpot(nx, ny, clear) {
  var M = Game.map, best = null, bd = Infinity;
  var sea = function (x, y) { return x >= 3 && y >= 3 && x < M.W - 3 && y < M.H - 3 && GameMap.passable(M, x, y, "sea"); };
  for (var y = 4; y < M.H - 4; y++) for (var x = 4; x < M.W - 4; x++) {
    var d = Math.hypot(x - nx, y - ny);
    if (d >= bd || !sea(x, y)) continue;
    var ok = true;
    for (var j = -clear; j <= clear && ok; j++) for (var i = -clear; i <= clear; i++) if (!sea(x + i, y + j)) { ok = false; break; }
    for (var t = 0; t < TAKEN.length && ok; t++) if (Math.hypot(TAKEN[t].x - x, TAKEN[t].y - y) < 6) ok = false;
    if (ok) { bd = d; best = { x: x, y: y }; }
  }
  if (best) TAKEN.push(best);
  return best;
}
function landSpot(nx, ny) {
  var M = Game.map;
  for (var r = 0; r < 30; r++) for (var a = 0; a < 32; a++) {
    var x = Math.round(nx + Math.cos(a / 32 * 6.283) * r), y = Math.round(ny + Math.sin(a / 32 * 6.283) * r);
    if (x > 3 && y > 3 && x < M.W - 4 && y < M.H - 4 && GameMap.passable(M, x, y, "ground") && !Game.tileBlocked(x, y, null)) return { x: x, y: y };
  }
  return null;
}
function put(p, id, pos) {
  var u = Game.spawnUnitAt(p, id, pos.x * TT + 16, pos.y * TT + 16);
  if (!u) return null;
  u.order = { type: "idle" }; u.orders = []; u.path = null; u.stance = "hold";
  if (u.layer === "air") { u.parked = false; u.order = { type: "hover" }; u.fuel = u.fuelMax; }
  return durable(u);
}
/* hold every hull and every tank where it was put: nothing here is about
   their moving, and the commander's drivers would otherwise sail them */
var HELD = [];
function hold(u) { if (u) { u._at = { x: u.x, y: u.y }; HELD.push(u); } return u; }
function holdAll() {
  EACH = function () {
    HELD.forEach(function (u) { if (u.dead) return; u.x = u._at.x; u.y = u._at.y; u.order = { type: "idle" }; u.path = null; });
  };
}
function home() { return { x: Math.round(E.homeX / TT), y: Math.round(E.homeY / TT) }; }
function hhome() { return { x: Math.round(H.homeX / TT), y: Math.round(H.homeY / TT) }; }
function tiles(a, b) { return (Math.round(Math.hypot(a.x - b.x, a.y - b.y) / TT * 10) / 10); }
function name(u) { return u ? u.def.id : "none"; }
function ord(a) { var o = a.order || {}; return o.type + (o.target ? " " + name(o.target) : "") + (o.type === "cap" ? " (" + (o.x / TT).toFixed(0) + "," + (o.y / TT).toFixed(0) + ")" : ""); }
/* on an escort of t; on a patrol (the station, or over a lost unit's last
   place) */
function escortOf(a, t) { return a.order.type === "escort" && a.order.target === t; }
function onStation(a) { return a.order.type === "cap"; }

function run() {
  if (!scene()) { chk("an AI commander to test", false, "AI.escortOf(E) is null"); return; }
  log("ESC_HOLD " + X.hold + " s");
  [secDeck, secLand, secDeckNoShip, secOff, secFog].forEach(function (f) {
    try { f(); } catch (e) { FAIL++; log("  FAIL  " + f.name + " crashed   -- " + e + " " + String(e.stack || "").split("\n")[0]); }
  });
}

/* ---- 1-3. the carrier group ---- */
function secDeck() {
  log("\n[1] a carrier and an E-2D on her deck: the commander sends it up over her");
  scene(); HELD = []; TAKEN = [];
  var h = home();
  var s1 = seaSpot(h.x, h.y, 3), s2 = seaSpot(h.x, h.y, 3), s3 = seaSpot(h.x, h.y, 3);
  chk("open water for three hulls near the commander's home", !!(s1 && s2 && s3),
      s1 && s2 && s3 ? "(" + s1.x + "," + s1.y + ") (" + s2.x + "," + s2.y + ") (" + s3.x + "," + s3.y + ")" : "none");
  if (!s1 || !s2 || !s3) return;
  var cv = hold(put(E, "carrier_n", s1)), dd = hold(put(E, "destroyer_n", s2));
  holdAll();
  var a = put(E, "cawacs_n", s1);
  chk("a Ford, a Burke and an E-2D of the commander's", !!(cv && dd && a) && a.def.awacs && a.def.carrierCapable,
      [name(cv), name(dd), name(a)].join(", "));
  if (!cv || !dd || !a) return;
  /* on her deck, as one delivered to her (game.js deck delivery) */
  a.padOn = cv; a.parked = true; a.order = { type: "parked" }; a.x = cv.x; a.y = cv.y;
  chk("she operates the type (G.deckTypesFor)", Game.deckTypesFor(cv).indexOf("cawacs_n") >= 0, Game.deckTypesFor(cv).join(" "));
  var p = X.pick(a);
  chk("the pick: her, as its deck", !!p && p.tgt === cv && p.g === "deck", p ? name(p.tgt) + " / " + p.g : "null");
  var t1 = tick(6, function () { return escortOf(a, cv); });
  chk("within two thinks the E-2D is given an escort of her", t1 >= 0 && escortOf(a, cv),
      ord(a) + (t1 >= 0 ? " at " + t1.toFixed(1) + " s" : ""));
  tick(14);
  chk("and is up over her (within its orbit distance)", !a.parked && a.order.type === "escort" &&
      Math.hypot(a.x - cv.x, a.y - cv.y) <= a.escortReach() * TT, tiles(a, cv) + " tiles; reach " + a.escortReach().toFixed(1));

  log("\n[2] she is lost and a destroyer remains: it re-escorts on the next think, not after the hold");
  var tl = Game.time;
  gone(cv);
  var t2 = tick(6, function () { return escortOf(a, dd); });
  var k = X.of(a);
  chk("it escorts the destroyer", t2 >= 0 && escortOf(a, dd), ord(a) + (t2 >= 0 ? " " + t2.toFixed(1) + " s after" : ""));
  chk("on the next thinks - inside the hold, for a lost unit", t2 >= 0 && t2 < X.hold / 2, (t2 >= 0 ? t2.toFixed(1) : "never") + " s, hold " + X.hold + " s");
  chk("booked as the fleet's lead ship", !!k && k.g === "fleet" && k.tgt === dd, k ? name(k.tgt) + " / " + k.g : "none");

  log("\n[3] no thrash: a second carrier inside the hold waits for the review");
  var t0 = k ? k.t : Game.time;
  var cv2 = hold(put(E, "carrier_n", s3));
  var flips = 0, last = a.order.target;
  var each0 = EACH;
  EACH = function () { each0(); if (a.order.type === "escort" && a.order.target !== last) { flips++; last = a.order.target; } };
  /* up to a few seconds short of the hold */
  tick(Math.max(1, t0 + X.hold - 3 - Game.time));
  chk("held on the destroyer until the hold is nearly up", escortOf(a, dd) && flips === 0,
      ord(a) + ", " + flips + " changes, " + (Game.time - t0).toFixed(1) + " s since the choice");
  var t3 = tick(10, function () { return escortOf(a, cv2); });
  chk("then it takes the carrier - the better group - at its review", t3 >= 0 && escortOf(a, cv2) && X.of(a).g === "deck",
      ord(a) + " at " + (Game.time - t0).toFixed(1) + " s since the choice");
  tick(20);
  chk("and stays with her (one change in all)", escortOf(a, cv2) && flips === 1, ord(a) + ", " + flips + " changes");
  EACH = each0;
}

/* ---- 4. no ships, land-based ---- */
var STATION = null;
function secLand() {
  log("\n[4] no ships at all: a land-based E-3G");
  /* the station the old branch flies, measured off it: aiOff "escort" */
  scene({ off: true }); HELD = []; TAKEN = [];
  var h = home(), ref = put(E, "awacs_n", h);
  tick(4);
  STATION = ref && ref.order.type === "cap" ? { x: ref.order.x, y: ref.order.y } : null;
  chk("(reference) with the escort off it flies the station", !!STATION, ref ? ord(ref) : "no spawn");
  if (!STATION) return;
  scene(); HELD = []; TAKEN = [];
  var a = put(E, "awacs_n", home());
  /* its first sortie given by the loop's own handling (escort.review) the
     moment it is up, rather than on the think: its reviews then fall
     between thinks, where the scene below can stand a wave up for one
     (half a second in: the thinks fall on a 1.2 s grid from the start) */
  tick(0.5);
  X.review(a);
  tick(4);
  chk("with no force to go with: the same station, as before", onStation(a) &&
      Math.hypot(a.order.x - STATION.x, a.order.y - STATION.y) < TT, ord(a) + "; reference (" + (STATION.x / TT).toFixed(0) + "," + (STATION.y / TT).toFixed(0) + ")");
  /* a wave out past the station: on the line from home through it, 12 tiles
     beyond it */
  var hx = E.homeX, hy = E.homeY, dx = STATION.x - hx, dy = STATION.y - hy, L = Math.hypot(dx, dy);
  var ux = L > TT ? dx / L : 1, uy = L > TT ? dy / L : 0;
  /* hormuz is mostly water: open ground 10-18 tiles further from home than
     the station, nearest the line out through it, with room for six */
  var M = Game.map, at = null, best = Infinity, Lt = L / TT;
  for (var ty = 4; ty < M.H - 4; ty++) for (var tx = 4; tx < M.W - 4; tx++) {
    var r = Math.hypot(tx - hx / TT, ty - hy / TT);
    if (r < Lt + 10 || r > Lt + 18) continue;
    var dev = Math.hypot(tx - (hx / TT + ux * r), ty - (hy / TT + uy * r));
    if (dev >= best) continue;
    var room = true;
    for (var jj = 0; jj < 5 && room; jj += 2) for (var ii = 0; ii < 5; ii += 2)
      if (!GameMap.passable(M, tx + ii, ty + jj, "ground") || Game.tileBlocked(tx + ii, ty + jj, null)) { room = false; break; }
    if (room) { best = dev; at = { x: tx, y: ty }; }
  }
  chk("open ground past the station for a wave", !!at, at ? "(" + at.x + "," + at.y + "), " +
      (Math.hypot(at.x * TT - hx, at.y * TT - hy) / TT).toFixed(0) + " tiles from home, station " + (L / TT).toFixed(0) : "none");
  if (!at) return;
  var W = AI.wavesOf(E), tanks = [];
  for (var i = 0; i < 6; i++) {
    var u = hold(put(E, "mbt_n", { x: at.x + (i % 3) * 2, y: at.y + ((i / 3) | 0) * 2 }));
    if (u) tanks.push(u);
  }
  holdAll();
  /* the aircraft kept topped up: what is checked is the choice, and an E-3
     going home for fuel half-way through is escort_check's business */
  var each1 = EACH;
  EACH = function () { each1(); a.fuel = a.fuelMax; };
  chk("six M1s to stand in the wave", tanks.length === 6, tanks.length + "");
  if (tanks.length < 6) return;
  /* A commander with nobody to fight stands a wave of puppets down on its
     next think (here, defendBase's recall: measured, the list was empty
     after every think), so the wave is stood up by hand and the review run
     at once on it (escort.review: the sortie loop's own call, hold and all),
     at the first moment the hold is up and before the think's own review
     can see the empty list. */
  var holdUp = function () { var k = X.of(a); return !!k && Game.time - k.t >= X.hold; };
  var stand = function (n) { var g = AI.wavesOf(E).ground; g.length = 0; for (var j = 0; j < n; j++) g.push(tanks[j]); };
  tick(X.hold + 4, holdUp);
  stand(3);
  var k0 = X.of(a);
  X.review(a);
  chk("three tanks past the station are not a clear thrust: still the station, at its review", onStation(a) && X.of(a).t > k0.t && !X.of(a).g,
      ord(a) + "; reviewed " + (X.of(a).t - k0.t).toFixed(1) + " s after the last");
  tick(X.hold + 4, holdUp);
  stand(6);
  var p = X.pick(a);
  /* the body: the tank nearest the wave's middle */
  var cx = 0, cy = 0; tanks.forEach(function (u) { cx += u.x; cy += u.y; }); cx /= 6; cy /= 6;
  var body = tanks.slice().sort(function (m, n) { return Math.hypot(m.x - cx, m.y - cy) - Math.hypot(n.x - cx, n.y - cy); })[0];
  chk("six are: the pick is the tank at the body's middle", !!p && p.g === "land" && p.tgt === body,
      p ? name(p.tgt) + " / " + p.g + (p.tgt === body ? " (the middle)" : " (not the middle)") : "null");
  X.review(a);
  chk("and at its review it is given an escort of that tank", escortOf(a, body) && X.of(a).g === "land", ord(a));
  /* inside the hold: the wave rebuilt in another order, two of it gone home -
     the same group, so nothing changes; and it does not change on its own */
  var g6 = AI.wavesOf(E).ground; g6.length = 0; for (i = 5; i >= 1; i--) g6.push(tanks[i]);
  X.review(a);
  chk("inside the hold, a reshuffled wave changes nothing", escortOf(a, body), ord(a));
  tick(6);
  chk("nor do the thinks inside it", escortOf(a, body), ord(a));
  tick(6);
  var ds = Math.hypot(a.x - body.x, a.y - body.y);
  chk("and it flies over the tank, out at the front", ds <= a.escortReach() * TT, tiles(a, body) + " tiles off it");
  /* the wave gone home (out of the list, as the think leaves it): its own
     review, through the think, sends it back to the station */
  AI.wavesOf(E).ground.length = 0;
  var t2 = tick(X.hold + 4, function () { return onStation(a); });
  chk("the wave stood down: back to the station at its review", t2 >= 0 && onStation(a) &&
      Math.hypot(a.order.x - STATION.x, a.order.y - STATION.y) < TT, ord(a));
}

/* ---- 5. an E-2D with no ship; aiOff ---- */
function secDeckNoShip() {
  log("\n[5] an E-2D with no ship at all is flown as the land-based one");
  if (!STATION) return;
  scene(); HELD = []; TAKEN = [];
  var a = put(E, "cawacs_n", home());
  tick(4);
  chk("no ship, no force: the station", onStation(a) && Math.hypot(a.order.x - STATION.x, a.order.y - STATION.y) < TT,
      ord(a) + "; " + JSON.stringify(X.of(a) ? { g: X.of(a).g } : null));
}
function secOff() {
  log("\n[5b] aiOff \"escort\": the station, carrier or none");
  scene({ off: true }); HELD = []; TAKEN = [];
  var h = home(), s1 = seaSpot(h.x, h.y, 3);
  var cv = s1 ? hold(put(E, "carrier_n", s1)) : null;
  holdAll();
  var a = cv ? put(E, "cawacs_n", s1) : null;
  if (!a) { chk("a carrier and an E-2D", false, "no spawn"); return; }
  a.padOn = cv; a.parked = true; a.order = { type: "parked" }; a.x = cv.x; a.y = cv.y;
  tick(4);
  chk("the E-2D off her deck flies the station, as before this piece", onStation(a), ord(a));
  tick(X.hold + 4);
  chk("and is never re-tasked", onStation(a) && !X.of(a), ord(a));
}

/* ---- 6. fog ---- */
function secFog() {
  log("\n[6] the enemy's forces change no choice: it reads its own");
  scene(); HELD = []; TAKEN = [];
  var h = home(), s1 = seaSpot(h.x, h.y, 3), s2 = seaSpot(h.x, h.y, 3), s3 = seaSpot(h.x, h.y, 3);
  if (!s1 || !s2 || !s3) { chk("water", false, ""); return; }
  var dd = hold(put(E, "destroyer_n", s1));
  /* the enemy's: a Kuznetsov-class and a Slava a few tiles off, in sight */
  var hc = hold(put(H, UNITS.carrier_p ? "carrier_p" : "carrier_n", s2));
  var hs = hold(put(H, UNITS.cruiser_p ? "cruiser_p" : "cruiser_n", s3));
  holdAll();
  var a = put(E, "cawacs_n", s1);
  if (!a || !dd) { chk("spawns", false, ""); return; }
  var p = X.pick(a);
  chk("the pick is our destroyer, not their carrier", !!p && p.tgt === dd, p ? name(p.tgt) + " / " + p.g : "null");
  tick(6);
  chk("given: an escort of our destroyer", escortOf(a, dd), ord(a) + "; theirs: " + name(hc) + ", " + name(hs));
}
