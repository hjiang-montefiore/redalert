/* tools/jsc/ssbn_ai_check.js - the commander buys and sails a ballistic-
   missile boat, and buys a cruise-missile boat against what it can serve
   (ai.js THE BOOMER: wantSsbn, fleetHulls, driveBoomers; navalMix's ssgn
   terms, ssgnCan), on the real game under JavaScriptCore, 3D off.

     python3 tools/jsc/run.py index.html --test tools/jsc/ssbn_ai_check.js

   Every scene is a fresh Game.init on hormuz: a human seat nobody drives and
   a commander, every unit of both sides taken off the board, the commander
   given a conyard, power, a factory, a lab, a radar dome and a naval yard.
   The buying scenes are held at peace (AI.setPeace: it buys, it launches
   nothing of its own); the patrol scenes are fought at war, because the
   patrol, like every driver that moves a hull, is off at peace.
     [1] an Elite commander with yard, lab, radar, a fleet of five and money
         orders ONE ballistic-missile boat (the Typhoon, 1980s Russia), and
         never a second while the first is alive;
     [2] a Veteran in the same scene orders none;
     [3] a Warlord fields up to two, never three alive or on order;
     [4] the boat is not in fleetValue (the value is the same with it and
         without it), and at war a bombardment group sails without it;
     [7] an Ohio of the commander's (1980s US) with a rival structure out of
         its reach that nobody of its side has looked at: it does not sail
         and nothing is fired;
     [5] once a scout of its side has looked at the structure, the boat
         sails to a station inside the Trident's reach, and its SLBM hits it;
     [6] the strike over, it withdraws to home water by its yard, further
         from the structure than where it fired from;
     [9] a sonar datum by its yard (driveBarrier hands one to the nearest
         idle sonar hull on an attackmove) is never handed to the boat;
     [8] the SSGN: against a held carrier group a Russian commander of the
         1980s writes the Oscar II into its mixture and orders one; a French
         and a 1980s American commander, whose navies have no ssgn row,
         hold the same group and have no ssgn term at all. */
var PASS = 0, FAIL = 0, TT = 32, DT = 1 / 30;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e80"); set("opt-aera", "e80");
  set("opt-seed", "ssbnai"); set("opt-fog", "1"); set("opt-3d", "0");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

var H = null, E = null, ORD = null;
function scene(o) {
  o = o || {};
  var facE = o.facE || "pact", facH = facE === "nato" ? "pact" : "nato", diff = o.diff || "elite";
  Game.init({ theatre: "hormuz", seed: "ssbnai", cash: 0, diff: diff,
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
  bld(E, "factory", { x: h.x - 5, y: h.y + 3 });
  bld(E, "lab", { x: h.x + 6, y: h.y });
  bld(E, "radar", { x: h.x - 6, y: h.y });
  E.tech = Math.max(E.tech || 0, 3);
  var yard = ashore(E, "navalyard", h, 4, 30, true);
  if (yard) yard.buildProgress = 1;
  /* every order the commander places, by role */
  ORD = {};
  var enq = E.enqueue;
  E.enqueue = function (q, id) {
    var r = enq.apply(this, arguments);
    if (r !== false && UNITS[id]) ORD[UNITS[id].role] = (ORD[UNITS[id].role] || 0) + 1;
    return r;
  };
  return yard;
}
function tick(sec, stop) {
  var n = Math.round(sec / DT);
  for (var i = 0; i < n; i++) { Game.tick(DT); if (stop && stop()) return (i + 1) * DT; }
  return -1;
}
function home() { return { x: Math.round(E.homeX / TT), y: Math.round(E.homeY / TT) }; }
function isLand(x, y) { var M = Game.map; return x > 3 && y > 3 && x < M.W - 4 && y < M.H - 4 && GameMap.passable(M, x, y, "ground") && !Game.tileBlocked(x, y, null); }
function clear(x, y, w, h) { for (var i = -1; i < (w || 3); i++) for (var j = -1; j < (h || 3); j++) if (!isLand(x + i, y + j)) return false; return true; }
function spot(p, w, h) { for (var r = 0; r < 16; r++) for (var a = 0; a < 32; a++) {
  var x = Math.round(p.x + Math.cos(a / 32 * 6.283) * r), y = Math.round(p.y + Math.sin(a / 32 * 6.283) * r);
  if (clear(x, y, w, h)) return { x: x, y: y }; } return null; }
function bld(p, id, pos) {
  var d = BUILDINGS[id], s = spot(pos, d.w + 1, d.h + 1);
  var b = s ? Game.placeBuilding(p, id, s.x, s.y, true) : null; if (b) b.buildProgress = 1; return b;
}
/* a structure of `p` on dry ground between rMin and rMax tiles of C; `wet`
   asks for water beside its footprint (a naval yard) - reload_check.js's */
function ashore(p, key, C, rMin, rMax, wet) {
  var M = Game.map, d = BUILDINGS[key], w = d.w, h = d.h;
  for (var R = rMin; R <= rMax; R++) for (var a = 0; a < 64; a++) {
    var x = (C.x + Math.cos(a / 64 * 6.283) * R) | 0, y = (C.y + Math.sin(a / 64 * 6.283) * R) | 0, land = true, sea = false;
    for (var j = 0; j < h; j++) for (var i = 0; i < w; i++)
      if (!GameMap.passable(M, x + i, y + j, "ground") || Game.tileBlocked(x + i, y + j, null)) land = false;
    if (!land) continue;
    for (var j2 = -1; j2 <= h; j2++) for (var i2 = -1; i2 <= w; i2++) if (GameMap.passable(M, x + i2, y + j2, "sea")) sea = true;
    if (wet && !sea) continue;
    var b = Game.placeBuilding(p, key, x, y, true);
    if (b) { b.buildProgress = 1; return b; }
  }
  return null;
}
function put(p, id, pos) {
  var u = Game.spawnUnitAt(p, id, pos.x * TT + 16, pos.y * TT + 16);
  if (u) { u.order = { type: "idle" }; u.orders = []; u.path = null; }
  return u;
}
function wet(x, y) { return GameMap.passable(Game.map, x, y, "sea") && !Game.tileBlocked(x, y, null); }
function open3(x, y) { for (var j = -1; j <= 1; j++) for (var i = -1; i <= 1; i++) if (!wet(x + i, y + j)) return false; return true; }
/* `n` open-water tiles near the yard, on its water, at least two apart */
function berths(yard, n) {
  var M = Game.map, out = [], cx = yard.tx + 1, cy = yard.ty + 1;
  var w0 = Path.nearest(M, cx, cy, "sea", null, 6);
  for (var R = 2; R <= 14 && out.length < n; R++) for (var a = 0; a < 48 && out.length < n; a++) {
    var x = (cx + Math.cos(a / 48 * 6.283) * R) | 0, y = (cy + Math.sin(a / 48 * 6.283) * R) | 0;
    if (!open3(x, y) || (w0 && !Path.reachable(M, w0.x, w0.y, x, y, "sea"))) continue;
    if (out.some(function (o) { return Math.abs(o.x - x) + Math.abs(o.y - y) < 3; })) continue;
    out.push({ x: x, y: y });
  }
  return out;
}
function role(u) { return u.def.role; }
function alive(r) { return E.units.filter(function (u) { return !u.dead && u.def.role === r; }); }
function queued(r) {
  var q = E.queues.naval, n = 0;
  (q.items || []).concat(q.ready || []).forEach(function (it) { var d = UNITS[it.id || it]; if (d && d.role === r) n++; });
  return n;
}
function tiles(a, b) { return Math.round(U.dist(a.x, a.y, b.x, b.y) / TT * 10) / 10; }
/* the commander's standing fleet: five hulls of its period by the yard */
function fleet(yard) {
  var b = berths(yard, 6), ids = ["destroyer", "destroyer", "sub", "sub", "corvette"], out = [];
  ids.forEach(function (r, i) {
    var id = unitFor(E.faction, r, "e80"), u = id && b[i] ? put(E, id, b[i]) : null;
    if (u) { u.hp = u.maxHp = 1e6; out.push(u); }
  });
  return out;
}
/* a buying run: money kept in the bank, `secs` of thinks; peak counts */
function buyRun(secs, r) {
  var peakQ = 0, peakAll = 0;
  tick(secs, function () {
    if (E.cash < 30000) E.cash = 60000;
    var q = queued(r), a = alive(r).length;
    if (q > peakQ) peakQ = q;
    if (q + a > peakAll) peakAll = q + a;
    return false;
  });
  return { peakQ: peakQ, peakAll: peakAll, alive: alive(r).length, ordered: ORD[r] || 0 };
}

function run() {
  var era = unitFor("pact", "ssbn", "e80"), eraN = unitFor("nato", "ssbn", "e80");
  log("rows: pact ssbn " + era + ", nato ssbn " + eraN + ", pact ssgn " + unitFor("pact", "ssgn", "e80") +
      ", nato ssgn e80 " + unitFor("nato", "ssgn", "e80") + " / e00 " + unitFor("nato", "ssgn", "e00"));
  var noRow = [];
  ["nato", "pact", "pla", "gbr", "fra", "ger", "roc", "kpa"].forEach(function (f) {
    ["e60", "e80", "e90", "e00", "e20"].forEach(function (e) { if (unitFor(f, "ssgn", e)) noRow.push(f + ":" + e + "=" + unitFor(f, "ssgn", e)); });
  });
  log("every ssgn row a navy can field: " + noRow.join(", "));

  /* ---- [1] Elite: one boat, and not a second ---- */
  var y1 = scene({ diff: "elite" });
  if (!y1) { chk("[1] a naval yard on hormuz", false); return; }
  var f1 = fleet(y1);
  var v1 = AI.boomerOf(E).value();
  var r1 = buyRun(360, "ssbn");
  chk("[1] an Elite commander with yard, lab, radar, a fleet of five and money orders ONE ballistic-missile boat (" + era + "), never two on order, and none after it is alive",
      f1.length === 5 && v1 >= 4 && r1.ordered === 1 && r1.peakQ === 1 && r1.peakAll === 1 && r1.alive === 1,
      "fleet " + f1.length + " hulls, fleetValue " + v1.toFixed(2) + ", ordered " + r1.ordered + ", peak on order " + r1.peakQ +
      ", peak alive+on order " + r1.peakAll + ", alive at the end " + r1.alive + ", orders " + JSON.stringify(ORD));

  /* ---- [2] Veteran: none ---- */
  var y2 = scene({ diff: "veteran" });
  var f2 = fleet(y2);
  var r2 = buyRun(360, "ssbn");
  chk("[2] a Veteran in the same scene orders none",
      f2.length === 5 && r2.ordered === 0 && r2.peakAll === 0,
      "fleet " + f2.length + ", ordered " + r2.ordered + ", orders " + JSON.stringify(ORD));

  /* ---- [3] Warlord: two, never three ---- */
  var y3 = scene({ diff: "warlord" });
  var f3 = fleet(y3);
  var r3 = buyRun(600, "ssbn");
  chk("[3] a Warlord fields up to two, never three alive or on order, one on order at a time",
      f3.length === 5 && r3.peakAll === 2 && r3.alive === 2 && r3.peakQ === 1 && r3.ordered === 2,
      "ordered " + r3.ordered + ", peak on order " + r3.peakQ + ", peak alive+on order " + r3.peakAll + ", alive " + r3.alive);

  wave();
  patrol();
  datum();
  ssgn();
}

/* water and ground for the patrol: the middle of a stretch of open water,
   a yard of the commander's 14-30 tiles off it, a structure of the rival's
   10-16 tiles off it (reload_check.js's arena) */
function seaArena(r, far) {
  var M = Game.map, best = null, bd = Infinity;
  for (var y = r + 2; y < M.H - r - 2; y += 2) for (var x = r + 2; x < M.W - r - 2; x += 2) {
    if (Math.hypot(x - H.homeX / TT, y - H.homeY / TT) < far || Math.hypot(x - E.homeX / TT, y - E.homeY / TT) < far) continue;
    var d = Math.hypot(x - M.W / 2, y - M.H / 2);
    if (d >= bd) continue;
    var ok = true;
    for (var j = -r; j <= r && ok; j++) for (var i = -r; i <= r; i++)
      if (!GameMap.passable(M, x + i, y + j, "sea") || Game.tileBlocked(x + i, y + j, null)) { ok = false; break; }
    if (ok) { best = { x: x, y: y }; bd = d; }
  }
  return best;
}
function rawScene(facE, diff) {
  Game.init({ theatre: "hormuz", seed: "ssbnai", cash: 0, diff: diff,
    era: "e80", eraAI: "e80", eraCapHuman: "e80", eraCapAI: "e80", fog: true,
    startPos: -1, weather: "clear", factionHuman: facE === "nato" ? "pact" : "nato", factionAI: facE,
    techHuman: 3, techAI: 3, capHuman: 3, capAI: 3, armsHuman: "all", armsAI: "all",
    superweapons: false, resources: 1, mapSize: 144, aiHandicap: 1,
    roster: [{ faction: facE === "nato" ? "pact" : "nato", ai: false, team: 1, label: "YOU" },
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
}
var shots = null;
function watchFire() {
  shots = [];
  var f0 = Combat.fire;
  Combat.fire = function (g, s, w, t) {
    if (s && s.owner === E && shots) shots.push({ t: Game.time, s: s, w: w, tgt: t, x: s.x, y: s.y });
    return f0.apply(this, arguments);
  };
  return function () { Combat.fire = f0; };
}
function slbmShots(u) { return shots.filter(function (s) { return s.s === u && s.w && s.w.profile === "ballistic"; }); }

/* ---- [4] not in fleetValue, not in a wave ---- */
function wave() {
  rawScene("nato", "elite");
  var C = seaArena(6, 30);
  var yard = C ? ashore(E, "navalyard", C, 14, 30, true) : null;
  var st = C ? ashore(H, "power", C, 10, 16, false) : null;
  if (!C || !yard || !st) { chk("[4] water, a yard and a structure on hormuz", false); return; }
  st.maxHp = st.hp = 1e9;
  var b = berths(yard, 7), hulls = [];
  ["destroyer", "destroyer", "sub", "cruiser", "corvette"].forEach(function (r, i) {
    var u = b[i] ? put(E, unitFor("nato", r, "e80"), b[i]) : null;
    if (u) { u.hp = u.maxHp = 1e6; hulls.push(u); }
  });
  var v0 = AI.boomerOf(E).value();
  var ss = b[5] ? put(E, "ssbn_n", b[5]) : null;
  if (ss) ss.hp = ss.maxHp = 1e6;
  var v1 = AI.boomerOf(E).value();
  var eye = put(E, unitFor("nato", "recon", "e80") || "recon_n", { x: st.tx + 3, y: st.ty + 1 });
  if (eye) { eye.stance = "hold"; eye.hp = eye.maxHp = 1e6; eye.give({ type: "guard" }); }
  AI.setPeace(E, false);
  var inWave = false, waved = 0, amv = false;
  tick(150, function () {
    var nw = AI.wavesOf(E).naval;
    if (nw.length > waved) waved = nw.length;
    if (nw.indexOf(ss) >= 0) inWave = true;
    if (ss && ss.order.type === "attackmove") amv = true;
    return false;
  });
  AI.setPeace(E, true);
  chk("[4] the boat is not in fleetValue (the same with it as without it), and a bombardment group sails at war without it, the boat never on an attackmove",
      !!ss && hulls.length === 5 && Math.abs(v1 - v0) < 1e-9 && waved >= 4 && !inWave && !amv,
      "fleetValue " + v0.toFixed(2) + " without, " + v1.toFixed(2) + " with; the wave reached " + waved + " hulls, the boat in it " + inWave + ", ever on an attackmove " + amv +
      ", its leg " + AI.boomerOf(E).leg(ss));
}

/* ---- [7], [5], [6]: the patrol, an Ohio at war ---- */
/* a structure of `p` on dry ground 6-16 tiles from C, as far from `away`
   as the shore allows */
function farShore(p, key, C, away) {
  var M = Game.map, d = BUILDINGS[key], best = null, bd = -1;
  for (var y = C.y - 16; y <= C.y + 16; y++) for (var x = C.x - 16; x <= C.x + 16; x++) {
    var r = Math.hypot(x - C.x, y - C.y);
    if (r < 6 || r > 16) continue;
    var land = true;
    for (var j = -1; j <= d.h && land; j++) for (var i = -1; i <= d.w; i++)
      if (!GameMap.passable(M, x + i, y + j, "ground") || Game.tileBlocked(x + i, y + j, null)) { land = false; break; }
    if (!land) continue;
    var e = Math.hypot(x - away.tx, y - away.ty);
    if (e > bd) { bd = e; best = { x: x, y: y }; }
  }
  var b = best ? Game.placeBuilding(p, key, best.x, best.y, true) : null;
  if (b) b.buildProgress = 1;
  return b;
}
function patrol() {
  rawScene("nato", "elite");
  var C = seaArena(6, 30);
  var yard = C ? ashore(E, "navalyard", C, 20, 36, true) : null;
  var st = C && yard ? farShore(H, "power", C, yard) : null;
  if (!C || !yard || !st) { chk("[5] water, a yard and a structure on hormuz", false); return; }
  st.maxHp = st.hp = 1e9;
  var sx = (st.tx + st.def.w / 2) * TT, sy = (st.ty + st.def.h / 2) * TT, S = { x: sx, y: sy };
  /* the boat by its yard, out of the Trident's reach of the structure */
  var ss = null, wR = 0, si = -1;
  var bs = berths(yard, 12);
  for (var i = 0; i < bs.length && !ss; i++) {
    var u = put(E, "ssbn_n", bs[i]);
    si = -1;
    for (var k = 0; k < u.def.weapons.length; k++) if (WEAPONS[u.def.weapons[k]].profile === "ballistic") si = k;
    wR = u.weaponRange(WEAPONS[u.def.weapons[si]]);
    if (U.dist(u.x, u.y, sx, sy) > wR * 1.05) ss = u;
    else { u.dead = true; var ix = Game.entities.indexOf(u); if (ix >= 0) Game.entities.splice(ix, 1); E.units.splice(E.units.indexOf(u), 1); }
  }
  if (!ss) { chk("[5] a berth by the yard out of the Trident's reach", false, "reach " + (wR / TT).toFixed(1)); return; }
  ss.hp = ss.maxHp = 1e6;
  ss.give({ type: "guard", x: ss.x, y: ss.y }); ss.guardX = ss.x; ss.guardY = ss.y;
  var start = { x: ss.x, y: ss.y };
  var unwatch = watchFire();
  AI.setPeace(E, false);
  try {
    /* [7] nobody of its side has looked at the structure */
    var legs7 = {};
    tick(90, function () { legs7[AI.boomerOf(E).leg(ss) || "-"] = 1; return false; });
    var n7 = slbmShots(ss).length, all7 = shots.length;
    chk("[7] a rival structure " + tiles(ss, S) + " tiles off on ground nobody of its side has looked at: the boat does not sail and nothing is fired",
        n7 === 0 && all7 === 0 && !legs7.out && !legs7.on && tiles(ss, start) < 3,
        "legs " + Object.keys(legs7).join("/") + ", SLBM rounds " + n7 + ", rounds of any kind " + all7 + ", moved " + tiles(ss, start) + " tiles" +
        ", reach " + (wR / TT).toFixed(1) + " tiles");

    /* [5] a scout of its side looks at it */
    var eye = put(E, unitFor("nato", "recon", "e80") || "recon_n", { x: st.tx + 4, y: st.ty + 1 });
    if (eye) { eye.stance = "hold"; eye.hp = eye.maxHp = 1e6; eye.give({ type: "guard" }); eye.guardX = eye.x; eye.guardY = eye.y; }
    var t0 = Game.time, outAt = -1, onAt = -1, first = null, hpAt = -1;
    tick(240, function () {
      var lg = AI.boomerOf(E).leg(ss);
      if (outAt < 0 && lg === "out") outAt = Game.time - t0;
      if (onAt < 0 && lg === "on") onAt = Game.time - t0;
      var sl = slbmShots(ss);
      if (!first && sl.length) first = sl[0];
      if (hpAt < 0 && st.hp < 1e9) hpAt = Game.time - t0;
      return first && hpAt >= 0;
    });
    var dFire = first ? U.dist(first.x, first.y, sx, sy) : 0;
    chk("[5] once its scout has looked, the boat sails for a station inside the Trident's reach, fires its SLBM at that structure from there, and it hits",
        outAt >= 0 && onAt > outAt && !!first && first.tgt === st && dFire <= wR * 0.95 && hpAt >= 0 && eye && eye.order.type !== "attack",
        "sailed at " + outAt.toFixed(1) + " s, on station at " + onAt.toFixed(1) + " s, " +
        (first ? "first SLBM at " + (first.t - t0).toFixed(1) + " s from " + (dFire / TT).toFixed(1) + " tiles (reach " + (wR / TT).toFixed(1) + "), at " +
                 (first.tgt === st ? "the structure" : (first.tgt && first.tgt.def ? first.tgt.def.id : "?")) : "no SLBM") +
        ", structure hit at " + (hpAt >= 0 ? hpAt.toFixed(1) + " s (" + Math.round(1e9 - st.hp) + " damage)" : "never") +
        ", start " + tiles(start, S) + " tiles off");

    /* [6] the strike over, it withdraws */
    var fromFire = first ? { x: first.x, y: first.y } : { x: ss.x, y: ss.y };
    var t6 = Game.time, backAt = -1, homeAt = -1;
    tick(240, function () {
      var lg = AI.boomerOf(E).leg(ss);
      if (backAt < 0 && lg === "back") backAt = Game.time - t6;
      if (backAt >= 0 && homeAt < 0 && lg === "home") homeAt = Game.time - t6;
      return homeAt >= 0;
    });
    var nShots = slbmShots(ss).length;
    var yw = { x: (yard.tx + 1) * TT, y: (yard.ty + 1) * TT };
    chk("[6] the strike over (" + nShots + " Tridents), it withdraws: sails back to home water by its yard, further from the structure than where it fired, and waits there",
        backAt >= 0 && homeAt >= 0 && ss.order.type === "guard" && tiles(ss, yw) <= 10 && U.dist(ss.x, ss.y, sx, sy) > U.dist(fromFire.x, fromFire.y, sx, sy) + TT * 3,
        "withdrew at " + backAt.toFixed(1) + " s, home at " + (homeAt >= 0 ? homeAt.toFixed(1) + " s" : "never") + ", " + tiles(ss, yw) + " tiles from its yard, " +
        tiles(ss, S) + " tiles from the structure (fired from " + tiles(fromFire, S) + "), order " + ss.order.type);
  } finally { unwatch(); AI.setPeace(E, true); }
}

/* ---- [9] a sonar datum is not the boat's ----
   driveBarrier() sends the nearest idle or guarding hull with a sonar at the
   newest datum on an attackmove, and every SSBN row has a sonar. A datum is
   held fresh four to eight tiles off a Typhoon on guard by its yard, at war,
   for 60 s (the driver's own clock is 25 s). */
function datum() {
  rawScene("pact", "elite");
  var C = seaArena(6, 30);
  var yard = C ? ashore(E, "navalyard", C, 14, 30, true) : null;
  var bs = yard ? berths(yard, 6) : [];
  var ss = bs[0] ? put(E, "pact_e80_ssbn", bs[0]) : null;
  if (!ss) { chk("[9] a yard and a berth on hormuz", false); return; }
  ss.hp = ss.maxHp = 1e6;
  ss.give({ type: "guard", x: ss.x, y: ss.y }); ss.guardX = ss.x; ss.guardY = ss.y;
  var start = { x: ss.x, y: ss.y }, d = null;
  for (var r = 4; r <= 8 && !d; r++) for (var a = 0; a < 32 && !d; a++) {
    var x = Math.round(bs[0].x + Math.cos(a / 32 * 6.283) * r), y = Math.round(bs[0].y + Math.sin(a / 32 * 6.283) * r);
    if (open3(x, y)) d = { x: (x + 0.5) * TT, y: (y + 0.5) * TT };
  }
  if (!d || !Game.sonarnet) { chk("[9] water for a datum, and the sonar net running", false); return; }
  var saved = Game.sonarDatums, types = {};
  Game.sonarDatums = [{ x: d.x, y: d.y, owner: E, t: Game.time, r: 4 }];
  AI.setPeace(E, false);
  try {
    tick(60, function () {
      if (!Game.sonarDatums.length) Game.sonarDatums.push({ x: d.x, y: d.y, owner: E, t: Game.time, r: 4 });
      Game.sonarDatums[0].t = Game.time;
      types[ss.order.type] = 1;
      return false;
    });
  } finally { AI.setPeace(E, true); Game.sonarDatums = saved || []; }
  chk("[9] a sonar datum " + tiles(start, d) + " tiles off its berth, held for 60 s at war: the boat is never sent at it",
      !types.attackmove && tiles(ss, start) < 3,
      "orders seen " + Object.keys(types).join("/") + ", moved " + tiles(ss, start) + " tiles, leg " + AI.boomerOf(E).leg(ss));
}

/* ---- [8] the SSGN term ---- */
function group(near) {
  var out = [];
  ["carrier", "destroyer", "destroyer"].forEach(function (r, i) {
    var id = unitFor(H.faction, r, "e80"), u = id ? put(H, id, { x: near.x + i * 2, y: near.y }) : null;
    if (u) { u.stance = "hold"; u.hp = u.maxHp = 1e6; out.push(u); }
  });
  return out;
}
function seaNearHome() {
  var h = home(), best = null, bd = 1e9;
  for (var y = 6; y < Game.map.H - 6; y++) for (var x = 6; x < Game.map.W - 6; x++) {
    var d = (x - h.x) * (x - h.x) + (y - h.y) * (y - h.y);
    if (d >= bd || d < 100) continue;
    var ok = true;
    for (var j = -2; j <= 2 && ok; j++) for (var i = -6; i <= 6; i++) if (!wet(x + i, y + j)) { ok = false; break; }
    if (ok) { bd = d; best = { x: x, y: y }; }
  }
  return best;
}
function holdGroup(sea) {
  var best = null, bd = 1e9;
  for (var y = sea.y - 10; y <= sea.y + 10; y++) for (var x = sea.x - 10; x <= sea.x + 10; x++) {
    if (!isLand(x, y)) continue;
    var d = (x - sea.x - 2) * (x - sea.x - 2) + (y - sea.y) * (y - sea.y);
    if (d < bd) { bd = d; best = { x: x, y: y }; }
  }
  var sc = best ? put(E, unitFor(E.faction, "recon", "e80") || "recon_p", best) : null;
  if (sc) { sc.stance = "hold"; sc.hp = sc.maxHp = 1e6; }
  return sc;
}
function ssgn() {
  /* Russia, the 1980s */
  var y8 = scene({ facE: "pact", diff: "elite" });
  var near = seaNearHome();
  if (!y8 || !near) { chk("[8] a yard and water by the commander's home", false); return; }
  var g = group(near); holdGroup(near);
  tick(4);
  var mix0 = AI.boomerOf(E).mix();
  /* a standing fleet with one of each hull the mixture asks for but the
     SSGN, so the shortfall is the SSGN's once a hull or two more are in */
  var b = berths(y8, 8), fl = [];
  ["corvette", "destroyer", "sub", "missileboat", "cruiser", "ssn"].forEach(function (r, i) {
    var id = unitFor("pact", r, "e80"), u = id && b[i] ? put(E, id, b[i]) : null;
    if (u) { u.hp = u.maxHp = 1e6; u.stance = "hold"; fl.push(u); }
  });
  var r8 = buyRun(480, "ssgn");
  var mix8 = AI.boomerOf(E).mix();
  chk("[8] against a held carrier group a 1980s Russian commander writes the Oscar II into its mixture and orders one",
      g.length === 3 && mix8.ssgn > 0 && r8.ordered >= 1 && AI.pickOf(E, "ssgn") === "ssgn_p",
      "group " + g.map(function (u) { return u.def.id; }).join("/") + ", ssgn share " + (mix0.ssgn || 0).toFixed(3) + " then " + (mix8.ssgn || 0).toFixed(3) +
      ", ordered " + r8.ordered + ", orders " + JSON.stringify(ORD));

  /* a navy with no ssgn row */
  [["fra", "France"], ["nato", "the 1980s US"]].forEach(function (f) {
    var y = scene({ facE: f[0], diff: "elite" });
    var nr = seaNearHome();
    if (!y || !nr) { chk("[8] " + f[1] + ": a yard and water", false); return; }
    var gg = group(nr); holdGroup(nr);
    tick(4);
    var m = AI.boomerOf(E).mix(), sea = AI.intelOf(E);
    var r = buyRun(120, "ssgn");
    chk("[8] " + f[1] + " (no ssgn row) holds the same group: no ssgn term in its mixture, none ordered",
        gg.length === 3 && unitFor(f[0], "ssgn", "e80") === null && !("ssgn" in m) && r.ordered === 0,
        "row " + unitFor(f[0], "ssgn", "e80") + ", mixture " + JSON.stringify(Object.keys(m)) + ", ordered " + r.ordered);
  });
}
