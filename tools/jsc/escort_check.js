/* tools/jsc/escort_check.js - ESCORT: an early-warning aircraft holds station
   over a unit of ours as it moves - checked on the real game under
   JavaScriptCore.

     python3 tools/jsc/run.py index.html --test tools/jsc/escort_check.js

   (owner) "any idea that early warning aircraft, E2D, to company with other
   units to enhance other units to ability" - and, of the proposal, "build
   both". entities.js ESCORT is the order; ui.js airCmdClick hands it out
   (J, or the ESCORT button in the aircraft row, then a click on the unit).
   Checked:
     0. the key and the click: J with an E-2D picked arms it, a click on a
        destroyer of ours gives it; a fighter alone is refused with the reason;
     1. an E-2D escorting a destroyer that sails 30+ tiles stays within its
        orbit distance of her (escortReach) the whole way;
     2. a SAM Site its side has SEEN - its ground explored, then out of sight -
        keeps it out as the unit it escorts drives into the ring: never inside
        the battery's own reach, never fired on;
     3. one its side has NOT seen (dark, holding fire, never on its chart) does
        not: it flies in for the unit, inside the distance a known ring holds
        it off at, with no hold - and holds once its own side's sensors (its
        radar lifts the fog) put the battery on the chart (the owner: "ai
        should have the same fog like us");
     4. bingo fuel sends it home, it lands, refuels, and is back over the
        destroyer on the same escort;
     5. the destroyer sunk: it holds over the last position, as an orbit
        order there;
     6. a save and load keeps the order and the unit it names, live and on
        the way home for fuel (last: the load rebuilds the match). */
var TT = 32, PASS = 0, FAIL = 0, DT = 1 / 30;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-cash", "200000"); set("opt-seed", "btest"); set("opt-fog", "1"); set("opt-3d", "0");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

/* ---------------- helpers ---------------- */
var P, E, M, SHOTS = [], SAID = [];
function ticks(sec, stop, each) {
  var n = Math.round(sec / DT);
  for (var i = 0; i < n; i++) {
    if (each) each();
    Game.tick(DT);
    if (stop && stop()) return (i + 1) * DT;
  }
  return -1;
}
function recordShots() {
  var f0 = Combat.fire;
  Combat.fire = function (g, sh, w, t) { SHOTS.push({ u: sh, t: Game.time, tgt: t }); return f0.apply(this, arguments); };
}
function hearAlerts() { var a0 = Game.alert; Game.alert = function (m) { SAID.push({ t: Game.time, m: String(m) }); return a0.apply(this, arguments); }; }
function said(re, t0) { return SAID.some(function (a) { return a.t >= (t0 || 0) && re.test(a.m); }); }
function tiles(px) { return (px / TT).toFixed(2); }
function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
function gone(u) {
  if (!u) return; u.dead = true;
  var i = Game.entities.indexOf(u); if (i >= 0) Game.entities.splice(i, 1);
  var l = u.owner && (u.kind === "building" ? u.owner.buildings : u.owner.units);
  if (l) { i = l.indexOf(u); if (i >= 0) l.splice(i, 1); }
}
function durable(u) { u.maxHp = u.hp = 1e6; return u; }
function openGround(w, h, nx, ny, edge, unexplored) {
  var best = null, bd = Infinity;
  for (var y = Math.max(edge, Math.floor(ny - 12)); y + h < Math.min(M.H - edge, ny + 12); y += 1)
    for (var x = Math.max(edge, Math.floor(nx - 12)); x + w < Math.min(M.W - edge, nx + 12); x += 1) {
      var d = Math.hypot(x + w / 2 - nx, y + h / 2 - ny);
      if (d >= bd) continue;
      var ok = true;
      for (var j = 0; j < h && ok; j++) for (var i = 0; i < w; i++)
        if (!GameMap.passable(M, x + i, y + j, "ground") || Game.tileBlocked(x + i, y + j, null) ||
            (unexplored && Game.explored(P, (y + j) * M.W + x + i))) { ok = false; break; }
      if (ok) { bd = d; best = { x: x, y: y }; }
    }
  return best;
}
function sel(list) {
  var s = UI.selection; for (var i = 0; i < s.length; i++) s[i].selected = false; s.length = 0;
  list.forEach(function (u) { u.selected = true; s.push(u); });
}
function key(k) {
  ["keydown", "keyup"].forEach(function (type) {
    var ev = { type: type, key: k, shiftKey: false, ctrlKey: false, metaKey: false, altKey: false, preventDefault: function () {} };
    (__listeners["win:" + type] || []).slice().forEach(function (f) { f(ev); });
  });
}
function lastAlert() {
  var box = document.getElementById("alerts");
  return box && box.children.length ? String(box.children[box.children.length - 1].textContent) : "";
}
function panel() { return String((document.getElementById("selinfo") || {}).innerHTML || ""); }
function click(wx, wy) {
  Render.setCam(wx, wy);
  var cv = document.getElementById("cv"), rc = cv.getBoundingClientRect();
  var x = Render.sx(wx, wy), y = Render.sy(wx, wy, 0);
  cv.dispatchEvent({ type: "mousedown", button: 0, clientX: rc.left + x, clientY: rc.top + y, shiftKey: false, ctrlKey: false, metaKey: false });
  (__listeners["win:mouseup"] || []).slice().forEach(function (f) {
    f({ type: "mouseup", button: 0, clientX: rc.left + x, clientY: rc.top + y, shiftKey: false });
  });
}
/* is this hostile on its side's chart: in the ring list it flies by */
function onChart(S) {
  var R = Game.standoffRings(P);
  for (var i = 0; i < R.length; i += 3) if (Math.abs(R[i] - S.x) < 1 && Math.abs(R[i + 1] - S.y) < 1) return true;
  return false;
}
/* no other hostile with an air-defence reach within r tiles of (x, y) */
function quiet(x, y, r, keep) {
  Game.players.forEach(function (p) {
    if (p === P || Game.allied(P, p)) return;
    p.units.slice().concat(p.buildings.slice()).forEach(function (e) {
      if (e.dead || keep.indexOf(e) >= 0 || !e.def || !Game.airDefenceReach(e.def)) return;
      if (Math.hypot(e.x - x, e.y - y) < r * TT) gone(e);
    });
  });
}
/* a puppet unit of ours: put on a straight line, a step a tick */
function puppet(id, x, y) {
  var u = durable(Game.spawnUnitAt(P, id, x, y));
  u.x = x; u.y = y; u.stance = "hold"; u.order = { type: "idle" };
  return u;
}
function setAt(u, x, y) { u.x = x; u.y = y; u.order = { type: "idle" }; u.path = null; }
function reachOf(a) { return a.escortReach() * TT; }
/* a straight lane of open water `len` tiles long, two clear either side,
   starting as near (nx, ny) as there is one */
function findLane(nx, ny, len) {
  var sea = function (x, y) { return x >= 3 && y >= 3 && x < M.W - 3 && y < M.H - 3 && GameMap.passable(M, x, y, "sea"); };
  var best = null, bd = Infinity;
  for (var y = 4; y < M.H - 4; y += 2) for (var x = 4; x < M.W - 4; x += 2) {
    var d0 = Math.hypot(x - nx, y - ny);
    if (d0 >= bd || !sea(x, y)) continue;
    for (var a = 0; a < 8; a++) {
      var an = a / 8 * 6.2832, ux = Math.cos(an), uy = Math.sin(an), ok = true;
      for (var k = 0; k <= len && ok; k++) for (var s = -2; s <= 2; s++)
        if (!sea(Math.round(x + ux * k - uy * s), Math.round(y + uy * k + ux * s))) { ok = false; break; }
      if (ok) { bd = d0; best = { x: x + 0.5, y: y + 0.5, ux: ux, uy: uy }; break; }
    }
  }
  return best;
}

var G0 = {};
function run() {
  P = Game.human; M = Game.map;
  E = Game.players.filter(function (p) { return p !== P && !Game.allied(P, p); })[0];
  Game.players.forEach(function (p) { if (p !== P && p.isAI) AI.setPeace(p, true); });
  Game.checkVictory = function () {};
  recordShots(); hearAlerts();
  var hx = P.homeX / TT, hy = P.homeY / TT;
  var ab = openGround(BUILDINGS.airbase.w + 2, BUILDINGS.airbase.h + 2, hx, hy, 4);
  var base = ab ? Game.placeBuilding(P, "airbase", ab.x + 1, ab.y + 1, true) : null;
  if (base) { base.buildProgress = 1; P.primary = P.primary || {}; P.primary.airbase = base; }
  chk("an airbase to come home to", !!base, ab ? "(" + ab.x + "," + ab.y + ")" : "no plot");
  var lane = findLane(base ? base.x / TT : hx, base ? base.y / TT : hy, 40);
  chk("a lane of open water 40 tiles long", !!lane, lane ? "from " + lane.x.toFixed(0) + "," + lane.y.toFixed(0) : "none");
  if (!base || !lane) return;
  quiet(lane.x * TT, lane.y * TT, 70, []);
  G0 = { base: base, lane: lane };
  /* the battery for [3] is put down first, on ground nobody of ours has
     looked at and well away from the water [1], [4] and [5] are flown over,
     dark and holding fire so that only sight can give it away: no emission
     to hear, no launch flash to see */
  var bx = base.x / TT, by = base.y / TT, S2 = null;
  [46, 40, 54, 34, 60].forEach(function (rad) {
    if (!S2) S2 = placeSam(bx, by, rad, true, function (sx, sy) { return segD(sx, sy, lane, 40) > 34; });
  });
  if (S2) { Game.setEmcon(S2, true); S2.stance = "hold"; }
  G0.S2 = S2;
  /* [3] first, while that ground is still unlooked-at: an E-2D's own radar
     lifts the fog for tens of tiles round it (game.js, radar lifts the fog),
     so any flight before it could put the battery on our chart */
  [secUnseen, secKey, secSail, secSeen, secBingo, secLost].forEach(function (f) {
    try { f(); } catch (e) { FAIL++; log("  FAIL  " + f.name + " crashed   -- " + e + " " + String(e.stack || "").split("\n")[0]); }
  });
  try { secSave(); } catch (e) { FAIL++; log("  FAIL  secSave crashed   -- " + e + " " + String(e.stack || "").split("\n")[0]); }
}

/* ---- 0. J, then a click on the destroyer ---- */
var A1 = null, D1 = null;
function secKey() {
  log("\n[0] J with an E-2D picked arms ESCORT; a click on a destroyer of ours gives it");
  var L = G0.lane;
  D1 = durable(Game.spawnUnitAt(P, "destroyer_n", (L.x + L.ux * 2) * TT, (L.y + L.uy * 2) * TT));
  D1.stance = "hold";
  A1 = durable(Game.spawnUnitAt(P, "cawacs_n", D1.x - L.ux * 6 * TT, D1.y - L.uy * 6 * TT));
  chk("an E-2D airborne and a destroyer afloat", !!A1 && !!D1 && A1.def.awacs && D1.layer === "sea",
      A1 && D1 ? A1.def.name + " / " + D1.def.name : "spawn failed");
  if (!A1 || !D1) return;
  A1.fuel = A1.fuelMax;
  var f16 = Game.spawnUnitAt(P, "fighter_n", A1.x, A1.y + 3 * TT);
  if (f16) {
    sel([f16]); UI.frame(DT);
    key("j");
    chk("a fighter alone is refused, with the reason", /EARLY-WARNING AIRCRAFT ONLY/.test(lastAlert()), lastAlert());
    gone(f16);
  }
  sel([A1]); UI.frame(DT);
  chk("the aircraft row offers ESCORT for an E-2D, beside the buttons it had", /data-aact="escort"/.test(panel()) &&
      /data-aact="cap"/.test(panel()) && /data-aact="strike"/.test(panel()) && /data-aact="rtb"/.test(panel()), "");
  key("j");
  chk("J arms it, and the hint says what the click does", /data-aact="escort">/.test(panel()) && /hb arm" data-aact="escort"/.test(panel()) &&
      /Click a unit or a ship of ours/.test(panel()), "");
  click(D1.x, D1.y);
  chk("the click on the destroyer gives the E-2D an escort of her", A1.order.type === "escort" && A1.order.target === D1,
      A1.order.type + (A1.order.target ? " " + A1.order.target.def.id : "") + "; said: " + lastAlert());
  sel([]);
}

/* ---- 1. she sails 30+ tiles; it stays with her ---- */
function secSail() {
  log("\n[1] an E-2D escorting a destroyer that sails 30+ tiles stays within its orbit distance of her");
  if (!A1 || !D1) return;
  if (A1.order.type !== "escort") A1.give({ type: "escort", target: D1, x: D1.x, y: D1.y });
  var bound = reachOf(A1);
  ticks(12);
  chk("joined: within its orbit distance of her after 12 s", dist(A1, D1) <= bound,
      tiles(dist(A1, D1)) + " tiles, orbit distance " + tiles(bound) + " (escortReach: its circle's join radius and a turning circle)");
  var L = G0.lane, x0 = D1.x, y0 = D1.y, worst = 0, sum = 0, n = 0;
  D1.give({ type: "move", x: (L.x + L.ux * 38) * TT, y: (L.y + L.uy * 38) * TT });
  ticks(90, function () { return Math.hypot(D1.x - x0, D1.y - y0) > 34 * TT && D1.order.type !== "move"; }, function () {
    var d = dist(A1, D1); if (d > worst) worst = d; sum += d; n++;
  });
  var sailed = Math.hypot(D1.x - x0, D1.y - y0);
  chk("she sailed 30+ tiles", sailed >= 30 * TT, tiles(sailed) + " tiles in " + (n * DT).toFixed(1) + " s");
  chk("and the E-2D was within its orbit distance of her the whole way", worst <= bound && A1.order.type === "escort",
      "worst " + tiles(worst) + ", mean " + tiles(sum / Math.max(1, n)) + " tiles, bound " + tiles(bound));
  G0.sailWorst = worst;
}

/* a SAM Site of the enemy's on open ground about `rad` tiles off (cx, cy),
   where `ok` allows; `unexplored`: on ground we have never looked at, with
   none of it looked at within 16 tiles */
function placeSam(cx, cy, rad, unexplored, ok) {
  for (var a = 0; a < 48; a++) {
    var an = a / 48 * 6.2832, sx = cx + Math.cos(an) * rad, sy = cy + Math.sin(an) * rad;
    if (sx < 22 || sy < 22 || sx > M.W - 22 || sy > M.H - 22) continue;
    if (Math.hypot(sx - E.homeX / TT, sy - E.homeY / TT) < 40) continue;
    if (ok && !ok(sx, sy)) continue;
    var g = openGround(3, 3, sx, sy, 4, unexplored);
    if (!g) continue;
    if (unexplored) {
      var clear = true;
      for (var j = -16; j <= 16 && clear; j += 2) for (var i = -16; i <= 16; i += 2) {
        var tx = g.x + 1 + i, ty = g.y + 1 + j;
        if (tx < 0 || ty < 0 || tx >= M.W || ty >= M.H || Math.hypot(i, j) > 16) continue;
        if (Game.explored(P, ty * M.W + tx)) { clear = false; break; }
      }
      if (!clear) continue;
    }
    var S = Game.placeBuilding(E, "sam", g.x, g.y, true);
    if (S) { S.buildProgress = 1; durable(S); quiet(S.x, S.y, 45, [S]); return S; }
  }
  return null;
}
function segD(px, py, L, len) {
  var k = Math.max(0, Math.min(len, (px - L.x) * L.ux + (py - L.y) * L.uy));
  return Math.hypot(px - L.x - L.ux * k, py - L.y - L.uy * k);
}
function ringOf(S, a) { return { plot: Game.airDefenceReach(S.def) * 1.25, margin: 1.5 + (a.def.jam ? 0 : 1.0) }; }

/* ---- 2. a ring its side has seen ---- */
function secSeen() {
  log("\n[2] a SAM Site its side has SEEN keeps the escort out as the unit drives into its ring");
  var base = G0.base;
  var S = null;
  [48, 42, 54].forEach(function (rad) { if (!S) S = placeSam(base.x / TT, base.y / TT, rad, false, null); });
  chk("a SAM Site of the enemy's 48 tiles out", !!S, S ? S.def.name + " at " + tiles(S.x) + "," + tiles(S.y) : "no plot");
  if (!S) return;
  G0.S1 = S;
  /* seen: a scout of ours looks at it for a second and is gone */
  var sc = Game.spawnUnitAt(P, "fighter_n", S.x, S.y);
  ticks(1.0);
  gone(sc); ticks(1.0);
  chk("it is on our chart - its ground explored - and out of sight now", onChart(S) && !Game.visibleTo(P, S),
      "chart " + onChart(S) + ", in sight " + Game.visibleTo(P, S));
  var ux = base.x - S.x, uy = base.y - S.y, ul = Math.hypot(ux, uy); ux /= ul; uy /= ul;
  var a = durable(Game.spawnUnitAt(P, "cawacs_n", base.x, base.y));
  a.fuel = a.fuelMax;
  var r = ringOf(S, a), reach = a.escortReach();
  var T = puppet("ifv_n", S.x + ux * 44 * TT, S.y + uy * 44 * TT);
  chk("a vehicle of ours 44 tiles out from it", !!T, T ? T.def.name : "none");
  if (!T) return;
  a.give({ type: "escort", target: T, x: T.x, y: T.y });
  ticks(15);
  var dS = function () { return dist(a, S) / TT; };
  chk("over the vehicle while it is well clear", dist(a, T) <= reach * TT, tiles(dist(a, T)) + " tiles off it");
  var t0 = Game.time, worst = Infinity, shot = 0, k = 0;
  var steps = Math.round(38 / (1.5 * DT));          // 1.5 tiles a second, in to 6 tiles off the battery
  ticks(steps * DT + 15, null, function () {
    if (k < steps) { k++; setAt(T, S.x + ux * (44 - k * 1.5 * DT) * TT, S.y + uy * (44 - k * 1.5 * DT) * TT); }
    if (dS() < worst) worst = dS();
  });
  SHOTS.forEach(function (s) { if (s.u === S && s.tgt === a && s.t >= t0) shot++; });
  var wr = 0;
  (S.def.weapons || []).forEach(function (wk) { var w = WEAPONS[wk]; if (w && w.tgt && w.tgt.air) wr = Math.max(wr, S.weaponRange(w) / TT); });
  chk("it held short: the HOLDING alert, and never inside the battery's own reach", said(/HOLDING SHORT OF AIR DEFENCE/, t0) && worst > wr,
      "closest " + worst.toFixed(1) + " tiles; the battery reaches " + wr.toFixed(1) + ", drawn at " + r.plot.toFixed(1) +
      " + margin " + r.margin.toFixed(1) + " + orbit " + reach.toFixed(1));
  chk("and was not fired on", shot === 0, shot + " rounds at it");
  var eo = a.order.type === "escort" ? a.order : a.order.then;
  chk("still on the escort (or carrying it home for fuel), the vehicle 6 tiles off the battery", !!eo && eo.type === "escort" && eo.target === T,
      a.order.type + (a.order.then ? " then " + a.order.then.type : "") + "; vehicle " + tiles(dist(T, S)) + " tiles off it");
  gone(a); gone(T);
}

/* ---- 3. a ring its side has not seen ---- */
function secUnseen() {
  log("\n[3] one its side has NOT seen does not hold it off; once its side's sensors find it, it does");
  var base = G0.base;
  var S = G0.S2;
  chk("a SAM Site on ground we have never looked at, dark and holding fire", !!S && !S.dead,
      S ? S.def.name + " at " + tiles(S.x) + "," + tiles(S.y) + ", " + tiles(dist(S, base)) + " tiles from the airbase" : "no plot");
  if (!S) return;
  chk("not on our chart, not in sight", !onChart(S) && !Game.visibleTo(P, S), "chart " + onChart(S));
  var ux = base.x - S.x, uy = base.y - S.y, ul = Math.hypot(ux, uy); ux /= ul; uy /= ul;
  var a = durable(Game.spawnUnitAt(P, "cawacs_n", base.x, base.y));
  a.fuel = a.fuelMax;
  var r = ringOf(S, a), reach = a.escortReach();
  /* 16 tiles off the battery: inside its ring as drawn (and the margins),
     past the vehicle's own sight */
  var T = puppet("ifv_n", S.x + ux * 16 * TT, S.y + uy * 16 * TT);
  chk("a vehicle of ours parked 16 tiles off it, inside the ring as drawn (" + r.plot.toFixed(1) + ")",
      !!T && T.sightR() < 15, T ? "its sight " + T.sightR().toFixed(1) : "none");
  if (!T) return;
  a.give({ type: "escort", target: T, x: T.x, y: T.y });
  /* how far out it holds a ring it KNOWS: the station kept outside the ring
     as drawn and the margin, by the orbit's own reach (entities.js) */
  var zone = r.plot + r.margin + reach;
  var t0 = Game.time, inUnseen = Infinity, heldUnseen = false, seenAt = null;
  ticks(60, function () { return seenAt !== null && Game.time - seenAt > 20; }, function () {
    if (!onChart(S)) {
      var d = dist(a, S) / TT;
      if (d < inUnseen) inUnseen = d;
      if (a.warnedRing) heldUnseen = true;
    } else if (seenAt === null) seenAt = Game.time;
  });
  chk("unseen, it was not held: it flew inside the distance a known ring holds it off at",
      inUnseen < zone && !heldUnseen && a.order.target === T,
      "closest " + inUnseen.toFixed(1) + " tiles while unseen; a known ring holds its station " + zone.toFixed(1) +
      " off (" + r.plot.toFixed(1) + " drawn + " + r.margin.toFixed(1) + " margin + " + reach.toFixed(1) + " orbit); held while unseen: " + heldUnseen);
  var worst = Infinity;
  ticks(25, null, function () { var d = dist(a, S) / TT; if (d < worst) worst = d; });
  chk("its own side's sensors found the battery, and it held then, outside the ring as drawn",
      seenAt !== null && said(/HOLDING SHORT OF AIR DEFENCE/, seenAt - 0.1) && worst > r.plot,
      seenAt !== null ? "on our chart at +" + (seenAt - t0).toFixed(1) + " s (its radar lifts the fog); closest after " + worst.toFixed(1) + " tiles" : "never seen in 60 s");
  gone(a); gone(T); gone(S);
}

/* ---- 4. bingo fuel: home, refuel, back on the escort ---- */
function secBingo() {
  log("\n[4] bingo fuel sends it home; it lands, refuels and takes the same escort up again");
  if (!A1 || !D1 || A1.dead) return;
  if (A1.order.type !== "escort") A1.give({ type: "escort", target: D1, x: D1.x, y: D1.y });
  var L = G0.lane;
  D1.give({ type: "move", x: (L.x + L.ux * 20) * TT, y: (L.y + L.uy * 20) * TT });
  ticks(3);
  A1.fuel = A1.fuelMax * 0.38;
  ticks(DT * 2);
  var o = A1.order;
  chk("it turns for home with the escort carried", (o.type === "rtb") && !!o.then && o.then.type === "escort" && o.then.target === D1,
      o.type + " then " + (o.then ? o.then.type : "-"));
  var landed = false, full = false, back = null;
  ticks(180, function () {
    if (A1.parked) landed = true;
    if (landed && A1.fuel >= A1.fuelMax - 1) full = true;
    if (full && A1.order.type === "escort" && dist(A1, D1) <= reachOf(A1)) { back = Game.time; return true; }
    return false;
  });
  chk("it landed and refuelled", landed && full, "landed " + landed + ", fuel " + A1.fuel.toFixed(0) + "/" + A1.fuelMax);
  chk("and is back over the destroyer on the same escort", back !== null && A1.order.target === D1,
      back !== null ? tiles(dist(A1, D1)) + " tiles off her" : A1.order.type + " " + tiles(dist(A1, D1)) + " tiles off her");
}

/* ---- 5. the destroyer sunk ---- */
function secLost() {
  log("\n[5] the destroyer sunk: it holds over her last position, as an orbit order there");
  if (!A1 || !D1) return;
  if (A1.order.type !== "escort") A1.give({ type: "escort", target: D1, x: D1.x, y: D1.y });
  ticks(5);
  var L = G0.lane;
  D1.give({ type: "move", x: (L.x + L.ux * 2) * TT, y: (L.y + L.uy * 2) * TT });
  ticks(4);
  var lx = D1.x, ly = D1.y, t0 = Game.time;
  gone(D1);
  ticks(DT * 2);
  var o = A1.order;
  chk("its order is a patrol on the spot she was lost on", o.type === "cap" && Math.hypot(o.x - lx, o.y - ly) < 0.5 * TT,
      o.type + (o.x !== undefined ? " " + tiles(Math.hypot(o.x - lx, o.y - ly)) + " tiles from it" : ""));
  chk("and it says so", said(/ESCORTED UNIT LOST/, t0), "");
  var worst = 0;
  ticks(12);
  ticks(20, null, function () { var d = Math.hypot(A1.x - lx, A1.y - ly); if (d > worst) worst = d; });
  chk("it holds over the spot", worst <= reachOf(A1) && A1.order.type === "cap", "worst " + tiles(worst) + " tiles off it");
}

/* ---- 6. save and load ---- */
function secSave() {
  log("\n[6] a save and load keeps the escort and the unit it names - live, and on the way home for fuel");
  var L = G0.lane;
  var D = durable(Game.spawnUnitAt(P, "destroyer_n", (L.x + L.ux * 10) * TT, (L.y + L.uy * 10) * TT));
  D.stance = "hold";
  var a = durable(Game.spawnUnitAt(P, "cawacs_n", D.x, D.y - 2 * TT));
  var b = durable(Game.spawnUnitAt(P, "cawacs_n", D.x, D.y + 2 * TT));
  a.fuel = b.fuel = a.fuelMax;
  if (A1 && !A1.dead) gone(A1);
  a.give({ type: "escort", target: D, x: D.x, y: D.y });
  b.give({ type: "escort", target: D, x: D.x, y: D.y });
  ticks(4);
  b.fuel = b.fuelMax * 0.38;
  ticks(DT * 2);
  var oa = a.order, ob = b.order;
  var r = SaveGame.save(Game, "ironfront.escort"), snap = null;
  try { snap = JSON.parse(localStorage.getItem("ironfront.escort")); } catch (e) {}
  var rec = function (u) { return snap ? snap.units.filter(function (s) { return s.d === u.def.id && Math.abs(s.x - u.x) < 2 && Math.abs(s.y - u.y) < 2; })[0] : null; };
  var ra = rec(a), rb = rec(b), rd = rec(D);
  var di = snap ? snap.units.indexOf(rd) : -1;
  chk("the save writes the escort and names the destroyer by her place in the unit list",
      r.ok && !!ra && ra.ord.type === "escort" && ra.es === di && di >= 0,
      ra ? JSON.stringify(ra.ord) + " es " + ra.es + " (destroyer " + di + ")" : (r.ok ? "no record" : r.error));
  chk("and the way home for fuel with the escort to come back to", ob.type === "rtb" && !!rb && rb.ord.type === "rtb" &&
      !!rb.ord.then && rb.ord.then.type === "escort" && rb.es === di,
      "live " + ob.type + " then " + (ob.then ? ob.then.type : "-") + "; saved " + (rb ? JSON.stringify(rb.ord) + " es " + rb.es : "no record"));
  var ld = SaveGame.load("ironfront.escort");
  localStorage.removeItem("ironfront.escort");
  Game.players.forEach(function (p) { if (p !== Game.human && p.isAI) AI.setPeace(p, true); });
  Game.checkVictory = function () {};
  P = Game.human; M = Game.map;
  var find = function (id, x, y) { return P.units.filter(function (u) { return !u.dead && u.def.id === id && Math.abs(u.x - x) < 2 && Math.abs(u.y - y) < 2; })[0]; };
  var a2 = ra ? find("cawacs_n", ra.x, ra.y) : null, b2 = rb ? find("cawacs_n", rb.x, rb.y) : null, d2 = rd ? find("destroyer_n", rd.x, rd.y) : null;
  chk("loaded, the first is on the escort of the same destroyer", ld.ok && !!a2 && !!d2 && a2.order.type === "escort" && a2.order.target === d2,
      ld.ok ? (a2 ? a2.order.type + (a2.order.target ? " " + a2.order.target.def.id : " no target") : "not found") : ld.error);
  chk("and the second is on its way home with that escort to come back to", !!b2 && b2.order.type === "rtb" && !!b2.order.then &&
      b2.order.then.type === "escort" && b2.order.then.target === d2,
      b2 ? b2.order.type + " then " + (b2.order.then ? b2.order.then.type : "-") : "not found");
  if (a2 && d2) {
    durable(a2); durable(d2);
    d2.give({ type: "move", x: (L.x + L.ux * 30) * TT, y: (L.y + L.uy * 30) * TT });
    var worst = 0;
    ticks(8);
    ticks(15, null, function () { var d = dist(a2, d2); if (d > worst) worst = d; });
    chk("and flies it: within its orbit distance of her as she sails", worst <= reachOf(a2) && a2.order.type === "escort",
        "worst " + tiles(worst) + " tiles");
  }
}
