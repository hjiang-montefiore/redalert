/* tools/jsc/aiairlift_check.js - the commander carries its army by air where
   that has a use (ai.js AIR BRIDGE), checked on the real game under
   JavaScriptCore, 3D off.

     python3 tools/jsc/run.py index.html --test tools/jsc/aiairlift_check.js

   Every scene is a fresh Game.init: a human seat that nobody drives and a
   NATO commander, every unit of both sides taken off the board. The
   commander is held at peace (AI.setPeace) so it launches nothing of its
   own; AI.liftOf(E).tick() runs one pass of the air bridge's driver with
   the peace set aside, as its own clock would at war. "Seen" means a scout
   of the commander's stood beside the thing for two seconds.

     1. On taiwan (the rival across the strait) the use reads "split"; on
        fulda (a 61-tile road) it reads nothing, and the commander buys no
        transport there with money in the bank; aiOff "airlift" reads
        nothing on taiwan either and buys nothing.
     2. Purchase on taiwan: with an airbase, two armed aircraft and the
        money, a load seen on one pass of the driver buys nothing (counted
        as held back, "brief"); the same load waiting a minute, pass after
        pass, puts one transport helicopter on order (and the counter says
        so); with one already on order, nothing more. Six tanks and two
        squads standing - the old demand by heads - buy nothing after a
        minute, since two squads are all a Black Hawk would load (counted
        as "load"); six more squads and another minute, and one goes on
        order. A Warsaw Pact commander, whose roster has no fixed-wing
        transport, never orders one.
     3. A helicopter sortie: infantry standing at home is called to a
        Black Hawk on its pad, which flies to them and lands beside them
        (a pick-up), they board, the helicopter flies to a drop point
        near the body already ashore on the far side, sets down, the
        infantry joins the wave (landed) and the helicopter goes home.
     4. An aeroplane sortie: a C-130H that is NOT on its ramp is called
        nothing; once parked, the M551 that fits is called and the tanks
        that do not fit are not; it flies to a strip clear of a SAM Site
        the commander has seen - the strip's ends, its approach margin and
        the straight leg in all outside the ring - lands, puts the M551
        down, and goes home.
     5. aiOff "airlift": the same scene calls nobody and flies nothing.
     6. The spotter pick: a loaded transport helicopter is never taken as
        the air scout; with the behaviour off an empty one still is (the
        old pick), with it on and a use the bridge keeps it.
     7. The air loops leave a delivery alone: a transport flying an
        airland order with its load keeps that order through the
        commander's thinks at war, to the ground and home again.
     8. Lost in flight: a loaded transport shot down on its sortie is
        counted (lostInFlight, its credits with the load's), and that
        ground is avoided for the next drop.
     9. Far (kuwait at 288, the bases 247 tiles apart): the use reads far;
        with no body out nothing flies; with a body out at the far end a
        Black Hawk carries squads to it and they join the wave (not as a
        landed party - the ground is connected). A Regular (D.read 0.35)
        has no far use.
    10. A load never left in the hold: a delivery given up with the squads
        aboard (the order entities.js airlandAbort leaves: a bare rtb) is
        let go and counted, and once the helicopter is down at home the
        squads are put off there, free and in no wave; a delivery under way
        that no sortie holds (a save loaded: the sorties, and the queued way
        home, are not saved) is taken back, its squads join the wave as a
        landed party and the helicopter comes home.
    11. The Air Force's jet transports (eras.js, role "stratlift") are cards
        beside the Hercules and not the commander's: in every period from
        the 1960s its airlift card is still the period's C-130, and in the
        1990s, with the C-141B, the C-5B and the C-17A on its AIR tab, a load
        of Sheridans waiting a minute for an aeroplane orders no jet; filed
        as "airlift" instead (the design not taken, measured and undone),
        the C-17A would be the card and the same scene would order one. */
var PASS = 0, FAIL = 0, TT = 32, DT = 1 / 30;
var TRACE = typeof __ARGS !== "undefined" && __ARGS.indexOf("trace") >= 0;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "taiwan"); set("opt-era", "e80"); set("opt-aera", "e80");
  set("opt-seed", "alcheck"); set("opt-fog", "1"); set("opt-3d", "0");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

/* ------------------------------------------------------------ the scene */
var H = null, E = null, L = null;
function scene(o) {
  o = o || {};
  var map = o.map || "taiwan", facE = o.facE || "nato", facH = o.facH || (facE === "nato" ? "pact" : "nato");
  var era = o.era || "e80";
  var diff = o.diff || "commander";
  Game.init({ theatre: map, seed: "alcheck", cash: 0, diff: diff,
    era: era, eraAI: era, eraCapHuman: era, eraCapAI: era, fog: true,
    startPos: -1, weather: "clear", factionHuman: facH, factionAI: facE,
    techHuman: 3, techAI: 3, capHuman: 3, capAI: 3, armsHuman: "all", armsAI: "all",
    superweapons: false, resources: 1, mapSize: o.size || 144, aiHandicap: 1,
    roster: [{ faction: facH, ai: false, team: 1, label: "YOU" },
             { faction: facE, ai: true, team: 2, diff: diff, personality: "balanced", label: "ENEMY" }] });
  H = Game.players[0]; E = Game.players[1];
  Game.checkVictory = function () {};
  AI.setPeace(E, true);
  E.cash = 0;
  if (o.off) E.aiOff = new Set(["airlift"]);
  [H, E].forEach(function (p) {
    p.units.slice().forEach(function (u) {
      var i = Game.entities.indexOf(u); if (i >= 0) Game.entities.splice(i, 1);
      u.dead = true;
    });
    p.units.length = 0;
  });
  L = AI.liftOf(E);
  EACH = null;
  return !!L;
}
/* EACH runs after every frame: a body ashore is held where it stands (its
   commander's wave driver would otherwise march it at the objective, and an
   unkillable one takes the SAM Site the test is about) */
var EACH = null;
function tick(sec, stop) {
  var n = Math.round(sec / DT);
  for (var i = 0; i < n; i++) { Game.tick(DT); if (EACH) EACH(); if (stop && stop()) return (i + 1) * DT; }
  return -1;
}
function isLand(x, y) { var M = Game.map; return x > 3 && y > 3 && x < M.W - 4 && y < M.H - 4 && GameMap.passable(M, x, y, "ground") && !Game.tileBlocked(x, y, null); }
function clear(x, y, w, h) { for (var i = -1; i < (w || 3); i++) for (var j = -1; j < (h || 3); j++) if (!isLand(x + i, y + j)) return false; return true; }
function spot(p, w, h) { for (var r = 0; r < 14; r++) for (var a = 0; a < 32; a++) {
  var x = Math.round(p.x + Math.cos(a / 32 * 6.283) * r), y = Math.round(p.y + Math.sin(a / 32 * 6.283) * r);
  if (clear(x, y, w, h)) return { x: x, y: y }; } return null; }
/* The airbase is 12 x 4 on one level (rules.js, 2026-10-23): no 13 x 5 of
   clear land within 14 tiles of the commander's home on taiwan, so it goes
   where G.canPlace - the commander's own rule - takes it, nearest the spot
   asked for. */
function abSpot(p, pos) {
  for (var r = 0; r < 30; r++) for (var dy = -r; dy <= r; dy++) for (var dx = -r; dx <= r; dx++) {
    if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
    if (Game.canPlace(p, "airbase", pos.x + dx, pos.y + dy)) return { x: pos.x + dx, y: pos.y + dy };
  }
  return null;
}
function bld(p, id, pos) {
  var d = BUILDINGS[id], s = id === "airbase" ? abSpot(p, pos) : spot(pos, d.w + 1, d.h + 1);
  var b = s ? Game.placeBuilding(p, id, s.x, s.y, true) : null; if (b) b.buildProgress = 1; return b;
}
function put(p, id, pos) {
  var u = Game.spawnUnitAt(p, id, pos.x * TT + 16, pos.y * TT + 16);
  if (!u) return null;
  u.order = { type: "idle" }; u.orders = []; u.path = null;
  if (u.layer === "air") { u.parked = false; u.order = { type: "hover" }; u.fuel = u.fuelMax; if (u.ammoMax) u.ammo = u.ammoMax; }
  return u;
}
/* an aircraft of the commander's, parked on its airbase as one delivered there */
function parkOn(u, base) { u.padOn = base; u.parked = true; u.order = { type: "parked" }; u.x = base.x; u.y = base.y; u.fuel = u.fuelMax; }
function off(list) { list.forEach(function (e) { if (e && !e.dead) { e.dead = true; if (e.kind === "building") Game.removeBuilding(e); } }); Game.sweepDead(); }
function eye(pos, keep) { var r = put(E, AI.pickOf(E, "recon") || "recon_n", pos); tick(2); if (!keep) off([r]); return r; }
function tiles(a, b) { return Math.round(U.dist(a.x, a.y, b.x, b.y) / TT * 10) / 10; }
function home() { return { x: Math.round(E.homeX / TT), y: Math.round(E.homeY / TT) }; }
function hhome() { return { x: Math.round(H.homeX / TT), y: Math.round(H.homeY / TT) }; }
function stats() { return E.aiStats || {}; }
function waves() { return AI.wavesOf(E); }
function R() { return Game.standoffRings(E, true); }
/* the straight segment A-B inside any ring of the list, grown by m tiles? */
function legHot(list, ax, ay, bx, by, m) {
  var dx = bx - ax, dy = by - ay, L2 = dx * dx + dy * dy;
  for (var i = 0; i < list.length; i += 3) {
    var t = L2 > 0 ? ((list[i] - ax) * dx + (list[i + 1] - ay) * dy) / L2 : 0; t = Math.max(0, Math.min(1, t));
    if (U.dist(ax + dx * t, ay + dy * t, list[i], list[i + 1]) < (list[i + 2] + (m || 0)) * TT) return true;
  }
  return false;
}
/* the commander's own base: a yard, an airbase, and what it can see */
function base(o) {
  o = o || {};
  var h = home();
  var yard = bld(E, "conyard", h);
  var ab = bld(E, "airbase", { x: h.x + 6, y: h.y + 4 });
  if (ab) { E.primary = E.primary || {}; E.primary.airbase = ab; }
  bld(E, "barracks", { x: h.x - 6, y: h.y + 4 });
  bld(E, "factory", { x: h.x - 6, y: h.y - 5 });
  return { yard: yard, ab: ab };
}
/* the rival's base across the water, seen once: a yard and a factory */
function rivalSeen() {
  var hh = hhome();
  var y = bld(H, "conyard", hh), f = bld(H, "factory", { x: hh.x + 5, y: hh.y + 3 });
  eye({ x: hh.x + 2, y: hh.y + 1 });
  return { yard: y, fac: f };
}
/* a body of ours ashore near the rival, in the wave and marked landed */
function bodyAshore(n, pos) {
  var out = [];
  for (var i = 0; i < n; i++) {
    var u = put(E, AI.pickOf(E, "mbt") || "mbt_n", { x: pos.x + (i % 3), y: pos.y + ((i / 3) | 0) });
    if (!u) continue;
    u._landed = true; u.stance = "hold"; u.hp = u.maxHp = 1e6;
    u._at = { x: u.x, y: u.y };
    waves().ground.push(u); out.push(u);
  }
  EACH = function () {
    out.forEach(function (u) { u.x = u._at.x; u.y = u._at.y; u.order = { type: "guard", x: u.x, y: u.y }; u.path = null; });
  };
  return out;
}
/* land on the rival's side, open, at distance d from its home toward ours */
function farSide(d) {
  var hh = hhome(), h = home(), ux = h.x - hh.x, uy = h.y - hh.y, Ln = Math.hypot(ux, uy);
  ux /= Ln; uy /= Ln;
  var lab = Path.components(Game.map, "ground"), W = Game.map.W, c0 = 0;
  for (var r = 0; r < 6 && !c0; r++) for (var dy = -r; dy <= r && !c0; dy++) for (var dx = -r; dx <= r && !c0; dx++)
    c0 = lab[(hh.y + dy) * W + hh.x + dx] || 0;
  for (var k = d; k > 4; k--) for (var s = -12; s <= 12; s += 2) {
    var x = Math.round(hh.x + ux * k - uy * s), y = Math.round(hh.y + uy * k + ux * s);
    if (clear(x, y, 4, 4) && lab[y * W + x] === c0) return { x: x, y: y };
  }
  return null;
}
function think(sec) { tick(sec || 3); }

function run() {
  uses();
  purchase();
  heloSortie(false);
  heloSortie(true);
  planeSortie();
  spotter();
  airLoops();
  lostInFlight();
  farUse();
  inTheHold();
  jets();
}

/* standing infantry at home: n rifle squads in a block `dy` tiles south */
function squads(n, dy) {
  var h = home(), out = [];
  for (var i = 0; i < n; i++) {
    var u = put(E, AI.pickOf(E, "rifle") || "rifle_n", { x: h.x - 3 + (i % 3), y: h.y + (dy || 14) + ((i / 3) | 0) });
    if (u) out.push(u);
  }
  return out;
}
function queued(pred) {
  var q = E.queues.aircraft, n = 0;
  [q.items, q.ready].forEach(function (l) { (l || []).forEach(function (it) { var d = UNITS[it.id || it]; if (d && pred(d)) n++; }); });
  return n;
}
/* `sec` seconds of the battle with a pass of the driver every second, the
   bank empty meanwhile so the commander's own think() buys nothing, then the
   money back and one more pass: how many passes saw a load waiting is read
   back from the intel (why.ramp) */
function hold(sec) {
  var r0 = (AI.intelOf(E).lift.why || {}).ramp || 0;
  for (var i = 0; i < sec; i++) { E.cash = 0; tick(1); L.tick(); }
  E.cash = 20000; E.oil = 500;
  L.tick();
  return ((AI.intelOf(E).lift.why || {}).ramp || 0) - r0;
}
function orderOf(u) { return u.dead ? "dead" : u.carried ? "aboard" : u.order.type + (u.order.ph ? "/" + u.order.ph : ""); }

/* ---- 1. when the bridge has a use ---- */
function uses() {
  log("\n[1] the use: split on taiwan, nothing on fulda, nothing with the behaviour off");
  var r = {};
  [["taiwan", false], ["fulda", false], ["taiwan", true]].forEach(function (c) {
    if (!scene({ map: c[0], off: c[1] })) { r[c.join()] = null; return; }
    base(); rivalSeen();
    var f = put(E, AI.pickOf(E, "fighter") || "nato_e80_fighter", home()); var f2 = put(E, AI.pickOf(E, "fighter") || "nato_e80_fighter", home());
    var fs = farSide(26); if (fs) bodyAshore(3, fs);
    think(40);
    squads(8);
    E.cash = 20000; E.oil = 500;
    L.tick();                            // a load standing, a sortie due, no transport: demand
    var use = L.use(), q0 = queued(function (d) { return !!d.payload; });
    var bought = L.buy();
    r[c.join()] = { use: use, bought: bought, q: queued(function (d) { return !!d.payload; }) - q0,
                    land: AI.intelOf(E).forces.land, apart: AI.intelOf(E).lift.apart, stats: Object.assign({}, stats()) };
  });
  var tw = r["taiwan,false"], fu = r["fulda,false"], of = r["taiwan,true"];
  chk("taiwan: the rival across the strait - the use reads split", tw && tw.use === "split", JSON.stringify(tw));
  chk("fulda: the bases 61 tiles apart - no use", fu && fu.use === null, JSON.stringify(fu));
  chk("fulda: with an airbase, two fighters, 20,000 credits, eight squads standing and a body out, no transport is ordered",
      fu && !fu.bought && fu.q === 0 && !fu.stats.airliftBought, JSON.stringify(fu));
  chk("aiOff \"airlift\" on taiwan: no use, no transport ordered", of && of.use === null && !of.bought && of.q === 0,
      JSON.stringify(of));
}

/* ---- 2. what it buys ---- */
function purchase() {
  log("\n[2] purchase on taiwan: one helicopter on order when a load has stood waiting for one; never a fixed-wing for the Warsaw Pact");
  if (!scene()) { chk("the scene is raised", false); return; }
  var b = base(); rivalSeen();
  put(E, "nato_e80_fighter", home()); put(E, "nato_e80_fighter", home());
  think(40);
  E.cash = 20000; E.oil = 500;
  L.tick();
  var none = L.buy();
  chk("nothing standing at home and no sortie due: no transport", !none && queued(function (d) { return !!d.payload; }) === 0, "bought " + none);
  var sq = squads(8);
  L.tick();
  var none2 = L.buy();
  chk("eight squads standing but no sortie due (nothing ashore, no landing, no launch): no transport", !none2 && queued(function (d) { return !!d.payload; }) === 0,
      "bought " + none2 + " " + JSON.stringify(AI.intelOf(E).lift.why));
  var fs = farSide(26); if (fs) bodyAshore(3, fs);
  L.tick();
  var brief = L.buy();
  chk("a body ashore and the load seen on one pass only: no transport yet (it must have waited the window), and the held-back purchase is counted",
      !brief && queued(function (d) { return !!d.payload; }) === 0 && stats().airliftBuySkipped === 1 && stats().airliftSkip_brief === 1,
      "bought " + brief + " " + JSON.stringify(stats()));
  var held = hold(62);
  var ok = L.buy(), qh = queued(function (d) { return !!d.payload && !!d.hover; });
  chk("the same load waiting, pass after pass, for a minute: a transport helicopter goes on order, and the counter says so",
      ok && qh === 1 && stats().airliftBought === 1, "bought " + ok + ", helicopters queued " + qh + ", passes " + held + " " + JSON.stringify(stats()));
  var again = L.buy();
  chk("with one on order, nothing more", !again && queued(function (d) { return !!d.payload; }) === 1, "bought again " + again);
  /* the old demand - bodies enough standing at home, a body ashore, a drop
     point, and one of them (a squad) that fits - but what the Black Hawk
     would actually load (two squads; the tanks are 50-odd tonnes against
     its 4) is under half its eight seats: nothing bought, however long it
     stands, and the held-back purchase is counted as a load that does not fit */
  if (scene()) {
    base(); rivalSeen();
    put(E, "nato_e80_fighter", home()); put(E, "nato_e80_fighter", home());
    var fs3 = farSide(26); if (fs3) bodyAshore(3, fs3);
    think(40);
    var h = home(), tk = [];
    for (var i = 0; i < 6; i++) tk.push(put(E, AI.pickOf(E, "mbt") || "mbt_n", { x: h.x - 3 + (i % 3), y: h.y + 11 + ((i / 3) | 0) }));
    var sq2 = squads(2);
    var held2 = hold(62);
    var nofit = L.buy(), why = AI.intelOf(E).lift.why;
    chk("six tanks and two squads standing (the old demand) but two squads are all a Black Hawk would load: no transport, counted as \"load\"",
        !nofit && queued(function (d) { return !!d.payload; }) === 0 && !stats().airliftBought &&
        stats().airliftBuySkipped === 1 && stats().airliftSkip_load === 1,
        "bought " + nofit + ", passes " + held2 + ", tanks " + tk.filter(function (u) { return u && !u.dead; }).length +
        " (" + (tk[0] && tk[0].def.mass) + " t), squads " + sq2.length + " " + JSON.stringify(stats()) + " " + JSON.stringify(why));
    /* six more squads join them: now a load that fits has waited the window */
    squads(6, 17);
    var held3 = hold(62);
    var fit = L.buy();
    chk("six more squads join them and wait the window: now a transport helicopter goes on order",
        fit && queued(function (d) { return !!d.payload && !!d.hover; }) === 1 && stats().airliftBought === 1,
        "bought " + fit + ", passes " + held3 + " " + JSON.stringify(stats()));
  } else chk("the scene is raised", false);
  /* the Warsaw Pact: no fixed-wing transport in the roster, ever */
  var pk = [];
  ["e60", "e80", "e00", "e20"].forEach(function (era) {
    if (!scene({ facE: "pact", era: era })) return;
    base(); rivalSeen();
    put(E, AI.pickOf(E, "fighter"), home()); put(E, AI.pickOf(E, "fighter"), home());
    var h1 = put(E, AI.pickOf(E, "transport"), home()), h2 = put(E, AI.pickOf(E, "transport"), home());
    var fs2 = farSide(26); if (fs2) bodyAshore(3, fs2);
    think(40);
    E.cash = 20000; E.oil = 500; squads(8);
    var v = put(E, AI.pickOf(E, "recon"), { x: home().x + 2, y: home().y + 8 });
    for (var i = 0; i < 4; i++) { L.tick(); L.buy(); }
    pk.push(era + ": airlift card " + AI.pickOf(E, "airlift") + ", fixed-wing queued " + queued(function (d) { return !!d.payload && !d.hover; }));
  });
  chk("a Warsaw Pact commander never orders a fixed-wing transport (the roster has none)",
      pk.length === 4 && pk.every(function (x) { return /card null, fixed-wing queued 0/.test(x); }), pk.join("; "));
}

/* ---- 3, 5. a helicopter sortie, and the same scene with the behaviour off ---- */
function heloSortie(offB) {
  log(offB ? "\n[5] aiOff \"airlift\": the same scene calls nobody and flies nothing"
           : "\n[3] a Black Hawk carries rifle squads to the body ashore, and comes home");
  if (!scene({ off: offB })) { chk("the scene is raised", false); return; }
  var b = base(); rivalSeen();
  var fs = farSide(26), body = fs ? bodyAshore(3, fs) : [];
  think(32);
  var hel = put(E, "nato_e80_transport", home()); parkOn(hel, b.ab);
  var inf = squads(9);
  think(2);
  var standing = inf.filter(function (u) { return u.order.type === "idle"; }).length;
  L.tick();
  var called = inf.filter(function (u) { return u.order.type === "enter" && u.order.target === hel; });
  var want = Math.min(8, standing - 2);
  if (offB) {
    var any = false, flew = false;
    tick(60, function () {
      L.tick();
      if (inf.some(function (u) { return u.carried || u.order.type === "enter"; })) any = true;
      if (hel.order.type === "airland" || hel.cargo.length) flew = true;
      return false;
    });
    chk("nobody is called to the helicopter, nobody boards, it flies no delivery (an empty one may still be taken as the air scout, as before)",
        called.length === 0 && !any && !flew && !L.ops.length && !stats().airliftSorties,
        "called " + called.length + ", helicopter " + orderOf(hel) + (hel._scout ? " (scout)" : "") + ", ops " + L.ops.length + " " + JSON.stringify(stats()));
    return;
  }
  chk("a body of three ashore across the strait, and nine squads standing at home", body.length === 3 && inf.length === 9,
      "body at " + JSON.stringify(fs));
  chk(want + " are called to the Black Hawk - all " + standing + " standing but the home guard of two, inside its eight seats",
      want >= 5 && called.length === want, called.length + " called; " + inf.map(orderOf).join(" "));
  var t0 = Game.time, ph = [], last = "", drop = null, ashore = null;
  tick(150, function () {
    var o = orderOf(hel);
    if (o !== last) { ph.push(o + "@" + (Game.time - t0).toFixed(0)); last = o; }
    if (hel.order.type === "airland" && hel.cargo.length && L.ops.length && L.ops[0].ph === "fly") drop = { x: hel.order.x, y: hel.order.y };
    if (!ashore && drop && called.some(function (u) { return !u.carried && !u.dead && u.order.type !== "enter"; }) && called.every(function (u) { return !u.carried; }))
      ashore = Game.time - t0;
    L.tick();
    return hel.parked && ashore !== null;
  });
  var lab = Path.components(Game.map, "ground"), W = Game.map.W;
  var farC = 0;
  for (var r = 0; r < 6 && !farC; r++) for (var dy = -r; dy <= r && !farC; dy++) for (var dx = -r; dx <= r && !farC; dx++)
    farC = lab[(hhome().y + dy) * W + hhome().x + dx] || 0;
  chk("it flies to a drop point on the rival's side, within six tiles of the body",
      !!drop && lab[((drop.y / TT) | 0) * W + ((drop.x / TT) | 0)] === farC && U.dist(drop.x, drop.y, body[0].x, body[0].y) < 6 * TT,
      drop ? tiles(drop, body[0]) + " tiles from the body; " + ph.join(" ") : ph.join(" "));
  var inW = called.filter(function (u) { return !u.dead && waves().ground.indexOf(u) >= 0 && u._landed && !u._lift; });
  chk("all " + want + " are put down, join the wave as a landed party and go at the objective",
      inW.length === want && inW.every(function (u) { return u.order.type === "attackmove" || u.order.type === "attack"; }),
      inW.length + " in the wave; " + called.map(orderOf).join(" "));
  chk("the helicopter goes home and parks", hel.parked && !hel.cargo.length && /rtb/.test(ph.join(" ")), ph.join(" "));
  chk("counted: one sortie, " + want + " troops flown", stats().airliftSorties === 1 && stats().troopsFlown === want, JSON.stringify(stats()));
  var stay = inf.filter(function (u) { return called.indexOf(u) < 0; });
  chk("the rest stayed home", stay.length === 9 - want && stay.every(function (u) { return !u.carried && waves().ground.indexOf(u) < 0; }),
      stay.map(orderOf).join(" "));
  /* the cost of a pass of the driver with a transport home, a body ashore
     and squads standing: what its own clock pays twice a think */
  var more = squads(6, 20), sum = 0, worst = 0;
  for (var k = 0; k < 200; k++) { var t2 = preciseTime(); L.tick(); var dt2 = preciseTime() - t2; sum += dt2; worst = Math.max(worst, dt2); if (k % 20 === 19) tick(1); }
  var ms = sum * 1000 / 200;
  log("   a pass of the driver, a sortie being loaded: mean " + ms.toFixed(3) + " ms over 200 passes (a game second between every 20), worst " + (worst * 1000).toFixed(3) + " ms");
  chk("a pass of the driver costs well under a millisecond", ms < 1, ms.toFixed(3) + " ms");
}

/* ---- 4. an aeroplane sortie ---- */
function planeSortie() {
  log("\n[4] a C-130H: nothing called while it is off its ramp; on it, the M551 that fits and not the tanks; a strip clear of a seen SAM Site");
  if (!scene()) { chk("the scene is raised", false); return; }
  var b = base(); rivalSeen();
  var fs = farSide(30), body = fs ? bodyAshore(3, fs) : [];
  /* a SAM Site of theirs beside the body, seen once */
  var sam = fs ? bld(H, "sam", { x: fs.x, y: fs.y - 13 }) : null;
  if (sam) sam.hp = sam.maxHp = 1e9;
  if (sam) eye({ x: Math.round(sam.x / TT) - 3, y: Math.round(sam.y / TT) + 2 });
  think(32);
  var h = home();
  var c = put(E, "nato_e80_airlift", { x: h.x + 2, y: h.y - 2 });          // in the air, on "hover"
  var lt = put(E, "nato_e80_lighttank", { x: h.x + 4, y: h.y + 16 });
  var mbt = put(E, "nato_e80_mbt", { x: h.x + 6, y: h.y + 16 });
  var ifv = put(E, "nato_e80_ifv", { x: h.x + 8, y: h.y + 16 });
  var inf = squads(2, 18);
  think(1);
  L.tick();
  chk("the C-130H is in the air: nothing is called to it", !L.ops.length &&
      [lt, mbt, ifv].every(function (v) { return v.order.type !== "enter"; }), "ops " + L.ops.length + "; " + [lt, mbt, ifv].map(orderOf).join(" "));
  parkOn(c, b.ab);
  tick(0.5);
  if (TRACE) {
    var ld = L.load(c), dd = L.drop(c);
    log("   load " + ld.map(function (u) { return u.def.id; }).join(",") + " drop " + JSON.stringify(dd) + " lift " + JSON.stringify(AI.intelOf(E).lift) +
        " plane " + orderOf(c) + " parked " + c.parked + " loadingNow " + c.loadingNow() + " fuel " + c.fuel + "/" + c.fuelMax);
  }
  L.tick();
  chk("parked on its ramp: the M551 (15.2 t) is called; the M60 and the Bradley are not",
      lt.order.type === "enter" && lt.order.target === c && mbt.order.type !== "enter" && ifv.order.type !== "enter",
      [lt, mbt, ifv].map(orderOf).join(" ") + "; ops " + JSON.stringify(AI.intelOf(E).lift.ops));
  var R0 = R(), t0 = Game.time, ph = [], last = "", strip = null, from = null, off = null;
  tick(200, function () {
    var o = orderOf(c);
    if (TRACE && (o !== last || Math.abs((Game.time - t0) % 10) < DT / 2)) log("     t=" + (Game.time - t0).toFixed(1) + " " + o + " ops " + JSON.stringify(AI.intelOf(E).lift) + " lt " + orderOf(lt) +
        " body " + body.map(function (u) { return (u.x / TT).toFixed(0) + "," + (u.y / TT).toFixed(0) + ":" + orderOf(u); }).join(" ") +
        (c.order.type === "airland" ? " point " + (c.order.x / TT).toFixed(1) + "," + (c.order.y / TT).toFixed(1) : ""));
    if (o !== last) { ph.push(o + "@" + (Game.time - t0).toFixed(0)); last = o; }
    if (!off && strip && lt.order.type !== "enter" && !lt.carried) off = { x: lt.x, y: lt.y };
    if (c.order.type === "airland" && !strip && c.order.n > 0) {
      var q2 = c.order; strip = { ax: q2.ax, ay: q2.ay, bx: q2.bx, by: q2.by, x: q2.x, y: q2.y }; from = { x: c.x, y: c.y };
    }
    L.tick();
    return c.parked && strip && !c.cargo.length && Game.time - t0 > 20;
  });
  var turnR = c.def.speed / c.def.turn, m = turnR + 2;
  var inRing = strip ? (Game.airThreatAt(E, strip.ax, strip.ay, m, R0) > 0 || Game.airThreatAt(E, strip.bx, strip.by, m, R0) > 0) : true;
  chk("the SAM Site is on the commander's ring list", !!sam && R0.length >= 3, "rings " + R0.length / 3);
  chk("it lands on a strip whose ends, with a turning circle and two tiles of margin, are outside the ring, and the straight leg in crosses none",
      !!strip && !inRing && !legHot(R0, from.x, from.y, strip.ax, strip.ay, 0),
      strip ? "strip " + (strip.ax / TT).toFixed(0) + "," + (strip.ay / TT).toFixed(0) + " to " + (strip.bx / TT).toFixed(0) + "," + (strip.by / TT).toFixed(0) +
              ", " + (U.dist(strip.bx, strip.by, sam.x, sam.y) / TT).toFixed(1) + " tiles from the site (ring " + (Game.airDefenceReach(sam.def) * 1.25).toFixed(1) + " + " + m.toFixed(1) + "); " + ph.join(" ") : ph.join(" "));
  chk("the M551 is put down beside the strip and joins the wave", !lt.dead && !lt.carried && waves().ground.indexOf(lt) >= 0 &&
      !!off && U.dist(off.x, off.y, strip.bx, strip.by) < 4 * TT, orderOf(lt) + " " + (off ? "put down " + tiles(off, { x: strip.bx, y: strip.by }) + " tiles from the strip's end" : "never put down"));
  chk("the tanks that do not fit never left home", [mbt, ifv].every(function (v) { return !v.carried && waves().ground.indexOf(v) < 0 && v.order.type !== "enter"; }),
      [mbt, ifv].map(orderOf).join(" "));
  chk("and the C-130H flies home and parks", c.parked && /takeoff/.test(ph.join(" ")), ph.join(" "));
  chk("counted: one sortie, one vehicle flown", stats().airliftSorties === 1 && stats().vehiclesFlown === 1, JSON.stringify(stats()));
}

/* ---- 6. the spotter pick ---- */
function spotter() {
  log("\n[6] the air scout: never a loaded transport helicopter; an empty one only with the behaviour off");
  var res = {};
  [["off-empty", true, false], ["off-loaded", true, true], ["on-empty", false, false], ["on-loaded", false, true]].forEach(function (c) {
    if (!scene({ off: c[1] })) return;
    var b = base(); rivalSeen();
    think(40);
    var hel = put(E, "nato_e80_transport", home()); parkOn(hel, b.ab);
    if (c[2]) { var r = put(E, "rifle_n", home()); hel.cargo.push(r); r.carried = true; }
    var pick = L.scout();
    res[c[0]] = pick === hel ? "picked" : pick ? "other" : "none";
  });
  chk("behaviour off, an empty transport helicopter: taken as the air scout, as before", res["off-empty"] === "picked", JSON.stringify(res));
  chk("behaviour off, a loaded one: not taken", res["off-loaded"] === "none", JSON.stringify(res));
  chk("behaviour on (use split): the bridge keeps it, loaded or not", res["on-empty"] === "none" && res["on-loaded"] === "none", JSON.stringify(res));
}

/* ---- 7. the air loops leave a delivery alone ---- */
function airLoops() {
  log("\n[7] a delivery in hand keeps its airland order through the commander's thinks at war");
  if (!scene()) { chk("the scene is raised", false); return; }
  var b = base(); rivalSeen();
  var fs = farSide(26);
  think(10);
  AI.setPeace(E, false);
  var res = [];
  ["nato_e80_transport", "nato_e80_airlift"].forEach(function (id) {
    var c = put(E, id, home()); parkOn(c, b.ab);
    var v = put(E, id === "nato_e80_airlift" ? "nato_e80_lighttank" : "rifle_n", home());
    c.cargo.push(v); v.carried = true;
    /* a delivery the bridge holds no sortie for and does not take back (one
       it let go at LIFT_FLY_MAX): the air loops alone are under test - taken
       back, the Black Hawk's squad joins the wave and walks across the
       strip the C-130H then finds blocked on finals */
    c._liftLet = true;
    var why = Game.airLand(c, fs.x * TT, fs.y * TT);
    if (c.def.hover) c.give({ type: "rtb" }, true);
    var seq = [], last = "", bad = [];
    tick(220, function () {
      var o = c.order.type;
      if (o !== last) { seq.push(o); last = o; }
      if (o !== "airland" && o !== "rtb" && o !== "land" && o !== "parked") bad.push(o);
      return c.parked && !c.cargo.length;
    });
    res.push({ id: id, why: why, seq: seq.join(">"), bad: bad.length, down: !v.carried && !v.dead && U.dist(v.x, v.y, fs.x * TT, fs.y * TT) < 8 * TT });
  });
  AI.setPeace(E, true);
  chk("the Black Hawk and the C-130H fly the delivery to the ground and home, never re-tasked on the way",
      res.length === 2 && res.every(function (r) { return !r.why && !r.bad && r.down && /^airland>/.test(r.seq) && /(rtb|parked)$/.test(r.seq); }),
      JSON.stringify(res));
}

/* ---- 8. lost in flight ---- */
function lostInFlight() {
  log("\n[8] a loaded transport shot down on its sortie is counted, and that ground is avoided");
  if (!scene()) { chk("the scene is raised", false); return; }
  var b = base(); rivalSeen();
  var fs = farSide(26), body = fs ? bodyAshore(3, fs) : [];
  think(32);
  var hel = put(E, "nato_e80_transport", home()); parkOn(hel, b.ab);
  var inf = squads(9);
  think(2);
  L.tick();
  tick(90, function () { L.tick(); return L.ops.length && L.ops[0].ph === "fly" && hel.cargo.length >= 5 && U.dist(hel.x, hel.y, b.ab.x, b.ab.y) > 20 * TT; });
  var aboard = hel.cargo.length, x = hel.x, y = hel.y;
  var cr = E.factionCost(hel.def) + hel.cargo.reduce(function (s, u) { return s + E.factionCost(u.def); }, 0);
  var d0 = L.drop(hel);
  Combat.applyDamage(Game, hel, hel.hp + 1, { warhead: "flak", dmg: hel.hp + 1 }, null);
  tick(0.2); L.tick();
  chk("shot down 20 tiles out with " + aboard + " squads aboard: counted once, with the load's credits",
      hel.dead && stats().lostInFlight === 1 && stats().lostInFlightCr === cr, JSON.stringify(stats()) + " expected " + cr);
  chk("the sortie is let go", !L.ops.length, "ops " + L.ops.length);
  var AIp = AI.intelOf(E).lift;
  chk("where it went down is remembered", AIp.shy === 1, JSON.stringify(AIp));
}

/* ---- 9. far ---- */
function farUse() {
  log("\n[9] kuwait at 288: the far use - the bridge reinforces a body at the end of a 247-tile road");
  if (!scene({ map: "kuwait", size: 288 })) { chk("the scene is raised", false); return; }
  var b = base(); rivalSeen();
  think(32);
  var hel = put(E, "nato_e80_transport", home()); parkOn(hel, b.ab);
  var inf = squads(8);
  think(2);
  var use = L.use(), it = AI.intelOf(E).lift;
  L.tick();
  var called0 = inf.filter(function (u) { return u.order.type === "enter"; }).length;
  chk("the use reads far (bases " + it.apart + " tiles apart); with no body out nothing is called", use === "far" && called0 === 0 && !L.ops.length,
      "use " + use + ", called " + called0 + " " + JSON.stringify(it));
  /* a body out, 30 tiles short of their base on the line home */
  var fs = farSide(30), body = fs ? bodyAshore(3, fs) : [];
  body.forEach(function (u) { u._landed = false; });
  L.tick();
  var called = inf.filter(function (u) { return u.order.type === "enter" && u.order.target === hel; });
  var drop = null;
  tick(200, function () {
    if (hel.order.type === "airland" && hel.cargo.length && L.ops.length && L.ops[0].ph === "fly") drop = { x: hel.order.x, y: hel.order.y };
    L.tick();
    return hel.parked && drop && !hel.cargo.length && !L.ops.length;
  });
  var inW = called.filter(function (u) { return !u.dead && waves().ground.indexOf(u) >= 0 && !u._landed; });
  chk("with the body out " + (body[0] ? Math.round(U.dist(body[0].x, body[0].y, E.homeX, E.homeY) / TT) : "?") + " tiles from home, squads are flown to it and join the wave",
      called.length >= 5 && !!drop && U.dist(drop.x, drop.y, body[0].x, body[0].y) < 15 * TT && inW.length === called.length,
      called.length + " called, drop " + (drop ? tiles(drop, body[0]) + " tiles from the body" : "none") + ", " + inW.length + " in the wave; " + JSON.stringify(stats()));
  /* a Regular reads no far use; on taiwan it still reads split */
  var reg = [];
  [["kuwait", 288], ["taiwan", 144]].forEach(function (c) {
    if (!scene({ map: c[0], size: c[1], diff: "regular" })) return;
    base(); rivalSeen(); think(40);
    reg.push(c[0] + " " + L.use());
  });
  chk("a Regular: no far use on kuwait, split on taiwan", reg.join() === "kuwait null,taiwan split", reg.join("; "));
}

/* ---- 10. a load never left in the hold ---- */
function inTheHold() {
  log("\n[10] a delivery given up comes home and puts its load off; one under way after a save is loaded is taken back");
  [false, true].forEach(function (reload) {
    if (!scene()) { chk("the scene is raised", false); return; }
    var b = base(); rivalSeen();
    var fs = farSide(26), body = fs ? bodyAshore(3, fs) : [];
    think(32);
    var hel = put(E, "nato_e80_transport", home()); parkOn(hel, b.ab);
    squads(9);
    think(2);
    L.tick();
    tick(90, function () { L.tick(); return L.ops.length && L.ops[0].ph === "fly" && hel.cargo.length >= 5 && U.dist(hel.x, hel.y, b.ab.x, b.ab.y) > 10 * TT; });
    var load = hel.cargo.slice();
    if (!reload) {
      hel.order = { type: "rtb" }; hel.orders = [];          // what airlandAbort leaves
      L.tick();
      chk("given up 10 tiles out with " + load.length + " aboard: the sortie is let go and counted, the squads still aboard",
          load.length >= 5 && !L.ops.length && stats().airliftBack === 1 && load.every(function (u) { return u.carried && !u._lift; }),
          "ops " + L.ops.length + " " + JSON.stringify(stats()));
      /* the commander's own clock only: at peace it puts the load off and
         starts no new sortie, which L.tick() would (the body is still out) */
      var t0 = Game.time;
      tick(120, function () { return hel.parked && !hel.cargo.length; });
      var off = load.filter(function (u) { return !u.dead && !u.carried && !u._lift && waves().ground.indexOf(u) < 0 &&
                                                  U.dist(u.x, u.y, b.ab.x, b.ab.y) < 8 * TT; });
      chk("down at home, everybody is put off there, free and in no wave", hel.parked && off.length === load.length,
          off.length + " of " + load.length + " off at home after " + (Game.time - t0).toFixed(0) + " s; " + load.map(orderOf).join(" "));
      return;
    }
    /* a fresh commander's view of it: no sortie held, nobody marked, the queued rtb gone */
    L.ops.length = 0; hel._lift = null; hel.orders = [];
    load.forEach(function (u) { u._lift = null; });
    L.tick();
    var op = L.ops[0];
    chk("a delivery under way that no sortie holds is taken back as a split sortie in flight",
        L.ops.length === 1 && op.ph === "fly" && op.use === "split" && stats().airliftTaken === 1 && hel.orders.length === 1,
        "ops " + JSON.stringify(AI.intelOf(E).lift.ops) + " " + JSON.stringify(stats()));
    tick(150, function () { L.tick(); return hel.parked && !hel.cargo.length && !L.ops.length; });
    var inW = load.filter(function (u) { return !u.dead && waves().ground.indexOf(u) >= 0 && u._landed && !u._lift; });
    chk("its squads join the wave as a landed party, and the helicopter comes home",
        inW.length === load.length && hel.parked, inW.length + " of " + load.length + " in the wave; helicopter " + orderOf(hel));
  });
}

/* ---- 11. the jet transports are the player's, not the commander's ---- */
function jets() {
  log("\n[11] the jet transports (stratlift) beside the Hercules: the airlift card is still the C-130, and the commander buys no jet");
  var HERC = { e60: "nato_e50_airlift", e80: "nato_e80_airlift", e90: "nato_e80_airlift", e00: "nato_e80_airlift", e20: "airlift_n" };
  var picks = [], bad = [];
  Object.keys(HERC).forEach(function (era) {
    if (!scene({ era: era })) { bad.push(era + " no scene"); return; }
    var pk = AI.pickOf(E, "airlift"), nj = unitsFor("nato", "stratlift", era).length;
    picks.push(era + " " + pk + " (+" + nj + " jets on the tab)");
    if (pk !== HERC[era] || !nj) bad.push(era);
  });
  chk("NATO's airlift card in each period is still its Hercules, with the jets on the same AIR tab", !bad.length, picks.join("; "));
  /* the 1990s on taiwan, a radar dome built (the jets' prerequisite), a
     load standing at home that a Black Hawk cannot
     take and an aeroplane can - four Sheridans (15.2 t), with four M1A2s
     (63 t) that fit no transport standing beside them - waiting a minute,
     pass after pass, for an aeroplane, with a body ashore across the strait:
     what goes on order. Then the same scene with the jets filed as "airlift"
     (the design not taken), to measure what the role keeps from happening. */
  function lift90() {
    if (!scene({ era: "e90" })) return null;
    base(); rivalSeen();
    var hr = home();
    bld(E, "radar", { x: hr.x + 7, y: hr.y - 6 });         // the jets' prerequisite
    put(E, AI.pickOf(E, "fighter"), home()); put(E, AI.pickOf(E, "fighter"), home());
    var fs = farSide(30); if (fs) bodyAshore(3, fs);
    think(40);
    var h = home();
    for (var i = 0; i < 4; i++) {
      put(E, "nato_e80_lighttank", { x: h.x - 3 + i, y: h.y + 12 });
      put(E, AI.pickOf(E, "mbt"), { x: h.x - 3 + i, y: h.y + 14 });
    }
    var held = hold(62), card = AI.pickOf(E, "airlift");
    var ok = L.buy(), fixed = [], jet = [];
    [E.queues.aircraft.items, E.queues.aircraft.ready].forEach(function (l) { (l || []).forEach(function (it) {
      var id = it.id || it, d = UNITS[id];
      if (d && d.payload && !d.hover) fixed.push(id);
      if (/c141|c5|c17/.test(id)) jet.push(id); }); });
    E.units.forEach(function (u) { if (!u.dead && /c141|c5|c17/.test(u.def.id)) jet.push(u.def.id); });
    return { card: card, bought: ok, fixed: fixed.join() || "none", jet: jet.join() || "none", passes: held,
             why: JSON.stringify(AI.intelOf(E).lift.why) };
  }
  var as = lift90();
  chk("1990s, the C-141B, C-5B and C-17A on its tab: the airlift card is the C-130H, and no jet goes on order " +
      "(nor a C-130H here: the far shore is past its 62-tile radius from the airbase, as before)",
      !!as && as.card === "nato_e80_airlift" && as.jet === "none" && /^(none|nato_e80_airlift)$/.test(as.fixed), JSON.stringify(as));
  var JET = ["nato_e60_c141", "nato_e80_c141", "nato_e60_c5", "nato_e80_c5", "nato_e00_c5", "nato_e90_c17"];
  JET.forEach(function (id) { UNITS[id].role = "airlift"; });
  reindexRoles();
  var cf = null;
  try { cf = lift90(); } finally { JET.forEach(function (id) { UNITS[id].role = "stratlift"; }); reindexRoles(); }
  log("     as built: " + JSON.stringify(as) + "\n     filed as airlift: " + JSON.stringify(cf));
  chk("measured against the design not taken: filed as \"airlift\", the C-17A would be the 1990s card and the same scene would order one",
      !!cf && cf.card === "nato_e90_c17" && cf.fixed === "nato_e90_c17" && (ROLES.stratlift || []).length === 6 && unitFor("nato", "airlift", "e90") === "nato_e80_airlift",
      JSON.stringify(cf));
}
