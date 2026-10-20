/* tools/jsc/sniff_check.js - SNIFF: a SEAD or EW aircraft flies a beat,
   listens, fires on an air-defence set that transmits, breaks away and comes
   back - checked on the real game under JavaScriptCore.

     python3 tools/jsc/run.py index.html --test tools/jsc/sniff_check.js
     python3 tools/jsc/run.py index.html --test tools/jsc/sniff_check.js -- baseline
     (`-- trace` also prints [7]'s flight once a second)

   (owner) "can you [make the] electronic war airplane have a sniff mode like
   patrol, but when it sniffs the radar or SAM, it will launch the missile and
   run away." entities.js SNIFF is the order; ui.js sniffCommit hands it out.
   Checked:
     0. who takes it: every SEAD and EW airframe with an anti-radiation round
        for ground targets, read off the data, and nothing else;
     1. the hangar's SNIFF button and a drag through the page's own #cv
        handlers launch a parked F-16CJ on the beat the player drew;
     2. it flies the beat end to end, and a SAM Site switched off (EMCON)
        within reach is not engaged;
     3. switched on, the site is HEARD (not seen) and engaged, the round
        away at the edge of its reach;
     4. it breaks away to outside the site's ring and does not hang about
        inside it; it does not turn in again until its round has arrived;
        with the site dark again it goes back to the beat;
     5. out of rounds it finishes the break, goes home, rearms, and is back
        on the beat and shooting by itself;
     6. bingo fuel, mid-break, turns it for home at once, and it comes back;
     7. a lit set within reach that nobody hears or sees is left alone; heard,
        it is taken;
     8. a new order ends it; 9. Shift queues it behind a move, Esc and RMB
        disarm it; 10. an unarmed jammer, a fighter and a bomber are refused
        with the reason, a mixed flight takes it and names the rest, a dry
        aircraft on the ramp stays there;
    11. an aircraft NOT on SNIFF takes its own shot exactly as before (the
        cap's self-issued attack, the ramp self-launch) - with `-- baseline`
        only this runs, and prints a fingerprint to compare with HEAD's;
    12. the beat is drawn in its own colour, the break and the turn-in too,
        and Shift shows it for every unit;
    13. a save made mid-break loads into the same break, and one made on the
        way home to rearm still comes back to the beat (last: the load
        rebuilds the match). */
var TT = 32, PASS = 0, FAIL = 0, DT = 1 / 30;
var BASELINE = typeof __ARGS !== "undefined" && __ARGS[0] === "baseline";
var TRACE = typeof __ARGS !== "undefined" && __ARGS.indexOf("trace") >= 0;
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
function ticks(sec, stop) {
  var n = Math.round(sec / DT);
  for (var i = 0; i < n; i++) { Game.tick(DT); if (stop && stop()) return (i + 1) * DT; }
  return -1;
}
/* every round fired, where from, at what, and the projectile it made */
function recordShots() {
  var f0 = Combat.fire;
  Combat.fire = function (g, sh, w, t) {
    var n0 = Combat.projectiles.length, r = f0.apply(this, arguments);
    var p = Combat.projectiles.length > n0 ? Combat.projectiles[Combat.projectiles.length - 1] : null;
    SHOTS.push({ u: sh, w: w, t: Game.time, tgt: t, fx: sh.x, fy: sh.y, d: Math.hypot(sh.x - t.x, sh.y - t.y), p: p });
    return r;
  };
}
function shotsOf(u, t0) { return SHOTS.filter(function (s) { return s.u === u && (t0 === undefined || s.t >= t0); }); }
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
/* the top-left tile of a w x h block of open, unbuilt ground nearest (nx, ny) */
function openGround(w, h, nx, ny, edge) {
  var best = null, bd = Infinity;
  for (var y = edge; y + h < M.H - edge; y += 1) for (var x = edge; x + w < M.W - edge; x += 1) {
    var d = Math.hypot(x + w / 2 - nx, y + h / 2 - ny);
    if (d >= bd || d > 12) continue;
    var ok = true;
    for (var j = 0; j < h && ok; j++) for (var i = 0; i < w; i++)
      if (!GameMap.passable(M, x + i, y + j, "ground") || Game.tileBlocked(x + i, y + j, null)) { ok = false; break; }
    if (ok) { bd = d; best = { x: x, y: y }; }
  }
  return best;
}
function sel(list) {
  var s = UI.selection; for (var i = 0; i < s.length; i++) s[i].selected = false; s.length = 0;
  list.forEach(function (u) { u.selected = true; s.push(u); });
}
function key(k, shift) {
  ["keydown", "keyup"].forEach(function (type) {
    var ev = { type: type, key: k, shiftKey: !!shift, ctrlKey: false, metaKey: false, altKey: false, preventDefault: function () {} };
    (__listeners["win:" + type] || []).slice().forEach(function (f) { f(ev); });
  });
}
function lastAlert() {
  var box = document.getElementById("alerts");
  return box && box.children.length ? String(box.children[box.children.length - 1].textContent) : "";
}
function panel() { return String((document.getElementById("selinfo") || {}).innerHTML || ""); }
function scr(wx, wy) { return { x: Render.sx(wx, wy), y: Render.sy(wx, wy, 0) }; }
function drag(p0, p1, shift) {
  var cv = document.getElementById("cv"), rc = cv.getBoundingClientRect();
  cv.dispatchEvent({ type: "mousedown", button: 0, clientX: rc.left + p0.x, clientY: rc.top + p0.y,
                     shiftKey: !!shift, ctrlKey: false, metaKey: false });
  cv.dispatchEvent({ type: "mousemove", button: 0, clientX: rc.left + p1.x, clientY: rc.top + p1.y, shiftKey: !!shift });
  (__listeners["win:mouseup"] || []).slice().forEach(function (f) {
    f({ type: "mouseup", button: 0, clientX: rc.left + p1.x, clientY: rc.top + p1.y, shiftKey: !!shift });
  });
}
function rclick(p) {
  var cv = document.getElementById("cv"), rc = cv.getBoundingClientRect();
  cv.dispatchEvent({ type: "mousedown", button: 2, clientX: rc.left + p.x, clientY: rc.top + p.y,
                     shiftKey: false, ctrlKey: false, metaKey: false });
}
/* the beat as the player drags it on the 2D view: screen ends, unprojected */
function dragBeat(A, B, shift) {
  Render.setCam((A.x + B.x) / 2, (A.y + B.y) / 2);
  var p0 = scr(A.x, A.y), p1 = scr(B.x, B.y);
  var a = Render.unproject(p0.x, p0.y), b = Render.unproject(p1.x, p1.y);
  drag(p0, p1, shift);
  return { a: a, b: b };
}
function segDist(p, A, B) {
  var dx = B.x - A.x, dy = B.y - A.y, L2 = dx * dx + dy * dy;
  var k = L2 ? Math.max(0, Math.min(1, ((p.x - A.x) * dx + (p.y - A.y) * dy) / L2)) : 0;
  return Math.hypot(p.x - A.x - dx * k, p.y - A.y - dy * k);
}
function durable(u) { u.maxHp = u.hp = 1e6; return u; }
function park(u, sec) { ticks(sec || 40, function () { return u.parked; }); return u.parked; }
/* a set on the air now, or off: the crew's own switch (G.setEmcon), the
   relight cut to nothing so the moment it comes up is this check's */
function lit(e, on) {
  if (on) { Game.setEmcon(e, false); e.relightAt = Game.time; Game.radarDark(e); }
  else Game.setEmcon(e, true);
  return Game.jamming(e);
}
function isSniff(u) { return u.order.type === "sniff" || (u.order.type === "attack" && !!u.order.sniff); }
function reachOf(u) { var m = u.sniffMount ? u.sniffMount() : null; return u.weaponRange(m && m.w ? m.w : WEAPONS[u.def.weapons[0]]); }

/* ---------------- the ground ---------------- */
var G0 = {};
/* a spot for an enemy SAM Site about 42 tiles from our base, well away from
   the enemy's own, with room round it for the beat and the break */
function findSite(skip) {
  var hx = P.homeX / TT, hy = P.homeY / TT, ex = E.homeX / TT, ey = E.homeY / TT, out = [];
  [42, 36, 50].forEach(function (rad, ri) {
    for (var a = 0; a < 24; a++) {
      var an = a / 24 * 6.2832, sx = hx + Math.cos(an) * rad, sy = hy + Math.sin(an) * rad;
      if (sx < 30 || sy < 30 || sx > M.W - 30 || sy > M.H - 30) continue;
      if (Math.hypot(sx - ex, sy - ey) < (skip ? 40 : 50)) continue;
      if (skip && Math.hypot(sx - skip.x, sy - skip.y) < 45) continue;
      var g = openGround(3, 3, sx, sy, 4);
      if (!g) continue;
      out.push({ x: g.x + 1, y: g.y + 1, an: an, far: Math.hypot(g.x - ex, g.y - ey) - ri * 100 });
    }
  });
  out.sort(function (p, q) { return q.far - p.far; });
  return out[0] || null;
}
/* no other hostile emitter within `r` tiles of (x, y) - so what the
   aircraft hears is what this check put there */
function quiet(x, y, r, keep) {
  var n = 0;
  Game.players.forEach(function (p) {
    if (p === P || Game.allied(P, p)) return;
    p.units.slice().concat(p.buildings.slice()).forEach(function (e) {
      if (e.dead || keep.indexOf(e) >= 0 || !e.def || !((e.def.radar || 0) + (e.def.jam || 0))) return;
      if (e.layer === "air") return;
      if (Math.hypot(e.x - x, e.y - y) < r * TT) { gone(e); n++; }
    });
  });
  return n;
}

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
  chk("an airbase for the Weasels", !!base, ab ? "(" + ab.x + "," + ab.y + ")" : "no plot");
  var site = findSite(null);
  chk("a spot for an enemy SAM Site 42 tiles out, away from the enemy's base", !!site && !!E, site ? "(" + site.x + "," + site.y + ")" : "none");
  if (!base || !site) return;
  var S = Game.placeBuilding(E, "sam", site.x - 1, site.y - 1, true);
  if (S) S.buildProgress = 1;
  chk("the SAM Site stands", !!S && !S.dead, S ? S.def.name + " at " + tiles(S.x) + "," + tiles(S.y) : "not placed");
  if (!S) return;
  durable(S);
  quiet(S.x, S.y, 60, [S]);
  Game.setEmcon(S, true);                                // dark until [3]
  ticks(0.5);
  /* the beat: 22 tiles off the site toward our base, 14 tiles long across */
  var ux = (base.x - S.x), uy = (base.y - S.y), ul = Math.hypot(ux, uy); ux /= ul; uy /= ul;
  var C = { x: S.x + ux * 22 * TT, y: S.y + uy * 22 * TT };
  var A = { x: C.x - uy * 7 * TT, y: C.y + ux * 7 * TT }, B = { x: C.x + uy * 7 * TT, y: C.y - ux * 7 * TT };
  G0 = { base: base, S: S, A: A, B: B, C: C, ux: ux, uy: uy, site: site };
  if (BASELINE) { try { secBaseline(); } catch (e) { FAIL++; log("  FAIL  secBaseline crashed   -- " + e + " " + String(e.stack || "").split("\n")[0]); } return; }
  var sections = [secWho, secLaunch, secBeat, secShot, secBreak, secDry, secBingo, secHeard, secCancel, secUi, secRefuse,
                  secBaseline, secDrawn];
  sections.forEach(function (f) {
    try { f(); } catch (e) { FAIL++; log("  FAIL  " + f.name + " crashed   -- " + e + " " + String(e.stack || "").split("\n")[0]); }
  });
  try { secSave(); } catch (e) { FAIL++; log("  FAIL  secSave crashed   -- " + e + " " + String(e.stack || "").split("\n")[0]); }
}

/* ---- 0. who takes it ---- */
function secWho() {
  log("\n[0] who sniffs: SEAD and EW airframes with an anti-radiation round, from the data");
  var yes = [], wrong = [], jam = 0, other = 0;
  for (var id in UNITS) {
    var d = UNITS[id];
    if (!d || d.layer !== "air") continue;
    var arm = (d.weapons || []).some(function (k) { var w = WEAPONS[k]; return w && w.antiRadiation && w.tgt && w.tgt.ground; });
    var want = (d.role === "sead" || d.role === "ewair") && arm;
    var m = Unit.prototype.sniffMount.call({ def: d, layer: "air" });
    if (!m.why !== want) wrong.push(id);
    if (!m.why) yes.push(id + " " + d.name);
    else if (d.role === "ewair" || d.role === "sead") jam++;
    else other++;
  }
  chk("every airframe answers by the data: role sead or ewair and an anti-radiation round for ground targets",
      !wrong.length && yes.length >= 20, yes.length + " take it, " + jam + " SEAD/EW refused (no round), " + other + " others refused" +
      (wrong.length ? "; WRONG: " + wrong.join(",") : ""));
  log("    takes it: " + yes.join(" | "));
  var growler = UNITS.ew_n, raven = UNITS.nato_e80_ewair, prowler70 = UNITS.nato_e60_ewair, prowler90 = UNITS.nato_e90_ewair;
  chk("the Growler and the 1990s EA-6B take it; the EF-111A and the 1970s EA-6B, unarmed jammers, do not",
      !Unit.prototype.sniffMount.call({ def: growler, layer: "air" }).why && !Unit.prototype.sniffMount.call({ def: prowler90, layer: "air" }).why &&
      !!Unit.prototype.sniffMount.call({ def: raven, layer: "air" }).why && !!Unit.prototype.sniffMount.call({ def: prowler70, layer: "air" }).why,
      raven.name + ": " + Unit.prototype.sniffMount.call({ def: raven, layer: "air" }).why);
}

/* ---- 1. launched from the hangar on a drawn beat ---- */
var W1 = null;
function secLaunch() {
  log("\n[1] the hangar's SNIFF button and a drag on the map launch a parked F-16CJ");
  var base = G0.base;
  W1 = Game.spawnUnit(P, "sead_n");
  chk("an F-16CJ parked on the airbase", !!W1 && park(W1) && W1.padOn === base, W1 ? W1.def.name + " parked " + W1.parked : "none");
  if (!W1) return;
  durable(W1);
  sel([base]);
  UI.sniff(base, [W1]);
  UI.frame(DT);
  var row = panel();
  chk("the hangar row carries SNIFF and it is armed for the picked flight",
      /data-hact="sniff"/.test(row) && /arm" data-hact="sniff"/.test(row) && UI.sniffArmed() === base,
      "armed for " + (UI.sniffArmed() && UI.sniffArmed().def ? UI.sniffArmed().def.name : UI.sniffArmed()));
  var t0 = Game.time, d = dragBeat(G0.A, G0.B, false), o = W1.order;
  chk("the drag launches it from the ramp on the beat the player drew",
      o.type === "sniff" && !W1.parked && Math.abs(o.x - d.a.x) < 1 && Math.abs(o.y - d.a.y) < 1 &&
      Math.abs(o.x1 - d.b.x) < 1 && Math.abs(o.y1 - d.b.y) < 1 && /^1 AIRCRAFT ON SNIFF PATROL/.test(lastAlert()),
      o.type + ", beat " + tiles(dist(o, { x: o.x1, y: o.y1 })) + " tiles; " + JSON.stringify(lastAlert()));
  chk("and the hangar is disarmed", !UI.sniffArmed(), "" + UI.sniffArmed());
}

/* ---- 2. flies the beat; a dark site is left alone ---- */
function secBeat() {
  log("\n[2] it flies the beat end to end, and a SAM Site that is switched off is left alone");
  if (!W1) return;
  var S = G0.S, o = W1.order, A = { x: o.x, y: o.y }, B = { x: o.x1, y: o.y1 };
  var visits = [], last = null, near = Infinity, offBeat = 0, t0 = Game.time, heard = false;
  ticks(70, function () {
    var e = dist(W1, A) < 2.5 * TT ? "A" : dist(W1, B) < 2.5 * TT ? "B" : null;
    if (e && e !== last) { visits.push(e); last = e; }
    near = Math.min(near, dist(W1, S));
    if (visits.length) offBeat = Math.max(offBeat, segDist(W1, A, B));
    if (Game.esmPlot(P).has(S.id)) heard = true;
    return visits.length >= 4;
  });
  chk("it reaches the beat and flies it end to end and back", visits.length >= 4 && /ABAB|BABA/.test(visits.join("")),
      "ends reached in turn: " + visits.join(" ") + " in " + (Game.time - t0).toFixed(1) + " s, at most " + tiles(offBeat) + " tiles off the line");
  var reach = reachOf(W1);
  chk("the switched-off SAM Site came inside the round's reach plus the approach and was not heard, nor fired on",
      near < reach + 8 * TT && !heard && shotsOf(W1, t0).length === 0 && W1.order.type === "sniff",
      "closest " + tiles(near) + " tiles (reach " + tiles(reach) + " + 8), heard " + heard + ", " + shotsOf(W1, t0).length + " rounds, order " + W1.order.type);
}

/* ---- 3. lit: heard, engaged, fired at the edge of reach ---- */
var FIRST = null;
function secShot() {
  log("\n[3] switched on, the site is heard - not seen - and fired on from the edge of the round's reach");
  if (!W1) return;
  var S = G0.S;
  /* switched on as the Weasel crosses the middle of its beat, 22 tiles off */
  ticks(30, function () { return dist(W1, G0.C) < 2 * TT; });
  chk("the site comes back on the air", lit(S, true), Game.emconState(S) + ", the Weasel " + tiles(dist(W1, S)) + " tiles off");
  var t0 = Game.time, turn = null;
  ticks(40, function () {
    if (!turn && W1.order.type === "attack" && W1.order.sniff)
      turn = { t: Game.time, tgt: W1.order.target, seen: Game.visibleTo(P, S), known: Game.airPlotKnows(P, S), d: dist(W1, S) };
    return shotsOf(W1, t0).length > 0;
  });
  var reach = reachOf(W1);
  chk("it turns in on the site, which it HEARS and does not see, within the round's reach plus the approach",
      !!turn && turn.tgt === S && !turn.seen && turn.known && turn.d <= reach + 8 * TT + 1,
      turn ? "turned in at " + tiles(turn.d) + " tiles (reach " + tiles(reach) + "), seen " + turn.seen + ", on the picture " + turn.known : "never turned in");
  var s = shotsOf(W1, t0)[0];
  FIRST = s || null;
  chk("the round goes at the edge of its reach, not closer than it must",
      !!s && s.tgt === S && s.w.antiRadiation && s.d <= reach + 1 && s.d >= reach * 0.97,
      s ? s.w.name + " away at " + tiles(s.d) + " tiles, " + (100 * s.d / reach).toFixed(1) + "% of its " + tiles(reach) + "-tile reach, " +
          (turn ? (s.t - turn.t).toFixed(2) : "?") + " s after the turn-in" : "no round");
  chk("and says so", said(/F-16CJ.*MISSILE AWAY, BREAKING OFF/i, t0), (SAID.filter(function (a) { return a.t >= t0; }).map(function (a) { return a.m; }).join(" | ")).slice(0, 200));
}

/* ---- 4. the break, the next pass, and back to the beat ---- */
function secBreak() {
  log("\n[4] it breaks away outside the site's ring, turns in again only once its round is home, and goes back to the beat");
  if (!W1 || !FIRST) return;
  var S = G0.S, ring = Game.airDefenceReach(S.def) * 1.25 * TT, m = W1.sniffMargin() * TT;
  var o = W1.order;
  chk("the tick it fires it is on the break, for a point outside the ring and the margin",
      o.type === "sniff" && o.ph === "out" && Math.hypot(o.ex - S.x, o.ey - S.y) >= ring + m,
      o.type + " " + o.ph + ", break point " + tiles(Math.hypot(o.ex - S.x, o.ey - S.y)) + " tiles from the site (ring " + tiles(ring) + " + " + tiles(m) + ")");
  var t0 = FIRST.t, inside = 0, closest = Infinity, endD = null, endT = null, secondTurn = null, roundGone = null;
  ticks(40, function () {
    var d = dist(W1, S);
    if (endD === null) {
      if (d < ring) inside += DT;
      closest = Math.min(closest, d);
      if (W1.order.type !== "sniff" || W1.order.ph !== "out") { endD = d; endT = Game.time; }
    }
    if (roundGone === null && FIRST.p && (FIRST.p.dead || Combat.projectiles.indexOf(FIRST.p) < 0)) roundGone = Game.time;
    if (!secondTurn && endD !== null && W1.order.type === "attack" && W1.order.sniff) secondTurn = Game.time;
    return shotsOf(W1, t0 + 0.01).length >= 1;
  });
  var maxR = Game.airDefenceReach(S.def) * TT * ((FACTIONS[E.faction] || {}).rangeMul || 1) * (E.upgrades.optics ? 1.15 : 1);
  chk("it breaks straight out and ends the break outside the ring and its margin",
      endD !== null && endD >= ring + m - 1,
      "break over " + (endT - t0).toFixed(1) + " s after the shot, " + tiles(endD) + " tiles from the site (ring " + tiles(ring) + ", margin " + tiles(m) + ")");
  chk("it does not hang about inside the ring: in it only for the turn",
      inside <= 3.0, inside.toFixed(2) + " s inside the ring after the shot; closest " + tiles(closest) + " tiles (the site reaches " + tiles(maxR) + ")");
  var s2 = shotsOf(W1, t0 + 0.01)[0];
  chk("the next turn-in comes only after its round has arrived, and puts another in from the edge",
      !!secondTurn && roundGone !== null && secondTurn > roundGone && !!s2 && s2.d >= reachOf(W1) * 0.97,
      "round home at +" + (roundGone - t0).toFixed(2) + " s, turned in again at +" + (secondTurn - t0).toFixed(2) + " s, second round at " +
      (s2 ? tiles(s2.d) + " tiles" : "-"));
  /* dark again: back to the beat */
  lit(S, false);
  var o2 = W1.order, back = null, t1 = Game.time;
  var A = { x: o2.x, y: o2.y }, B = { x: o2.x1, y: o2.y1 };
  ticks(40, function () {
    if (W1.order.type === "sniff" && W1.order.ph !== "out" && segDist(W1, A, B) < 2.5 * TT) { back = Game.time; return true; }
    return false;
  });
  chk("with the site dark again it finishes the break and goes back to the beat", back !== null && W1.order.type === "sniff",
      back !== null ? "on the beat " + (back - t1).toFixed(1) + " s later" : "not back: " + W1.order.type + " " + W1.order.ph + ", " + tiles(segDist(W1, A, B)) + " tiles off it");
}

/* ---- 5. out of rounds: home, rearm, back ---- */
function secDry() {
  log("\n[5] out of rounds it finishes its break, goes home, rearms, and comes back to the beat by itself");
  if (!W1) return;
  var S = G0.S, base = G0.base, t0 = Game.time;
  lit(S, true);
  var lastShot = null, onBreakAfterLast = false, rtbThen = null, parked = false, back = null, again = null;
  ticks(240, function () {
    if (!lastShot && W1.ordnanceDry() && shotsOf(W1, t0).length) lastShot = Game.time;
    if (lastShot && !rtbThen && W1.order.type === "sniff" && W1.order.ph === "out") onBreakAfterLast = true;
    if (lastShot && !rtbThen && W1.order.type === "rtb") rtbThen = W1.order.then ? W1.order.then.type : "none";
    if (rtbThen && W1.parked) parked = true;
    if (parked && back === null && isSniff(W1) && !W1.parked) { back = Game.time; G0.ammoUp = W1.ammo; }
    if (back !== null && shotsOf(W1, back).length) { again = Game.time; return true; }
    return false;
  });
  chk("the last round away, it finishes its break before it turns for home", !!lastShot && onBreakAfterLast,
      shotsOf(W1, t0).length + " rounds this pass, last at +" + (lastShot ? (lastShot - t0).toFixed(1) : "-") + " s, on its break after it " + onBreakAfterLast);
  chk("then home, carrying the beat", rtbThen === "sniff" && said(/OUT OF MISSILES, REARMING, THEN BACK TO SNIFF/, t0),
      "rtb then " + rtbThen);
  chk("it lands, rearms, and takes off again on the beat by itself", parked && back !== null && G0.ammoUp >= W1.ammoMax - 0.05,
      parked ? (back !== null ? "airborne on the beat again at +" + (back - t0).toFixed(1) + " s with " + G0.ammoUp.toFixed(1) + " rounds" : "still " + W1.order.type) : "never landed: " + W1.order.type);
  chk("and is back on the site, shooting", again !== null, again !== null ? "next round at +" + (again - t0).toFixed(1) + " s" : "no round");
}

/* ---- 6. bingo fuel wins, even on the break, and it comes back ---- */
function secBingo() {
  log("\n[6] bingo fuel turns it for home at once, even mid-break, and it comes back after refuelling");
  if (!W1) return;
  var S = G0.S;
  if (!Game.jamming(S)) lit(S, true);
  ticks(60, function () { return W1.order.type === "sniff" && W1.order.ph === "out"; });
  var onBreak = W1.order.type === "sniff" && W1.order.ph === "out";
  W1.fuel = Math.min(W1.fuel, W1.reserveFuel() - 1);
  ticks(DT);
  var o = W1.order;
  chk("on its break with the tanks at bingo, it turns for home the next tick, the beat carried",
      onBreak && o.type === "rtb" && !!o.then && o.then.type === "sniff" && o.then.ph !== "out",
      "was on the break " + onBreak + "; now " + o.type + " then " + (o.then ? o.then.type : "-"));
  lit(S, false);
  var t0 = Game.time, parked = false, back = null;
  ticks(120, function () {
    if (W1.parked) parked = true;
    if (parked && !W1.parked && isSniff(W1)) { back = Game.time; return true; }
    return false;
  });
  chk("refuelled, it is back on the beat", parked && back !== null && W1.fuel > W1.fuelMax * 0.9,
      back !== null ? "airborne again at +" + (back - t0).toFixed(1) + " s, fuel " + Math.round(W1.fuel) : "now " + W1.order.type);
}

/* ---- 7. heard or seen, or left alone ---- */
function secHeard() {
  log("\n[7] a set on the air within reach that nobody hears or sees is left alone; heard, it is taken");
  /* open ground well clear of the SAM Site and of the enemy's base, the
     nearer our own the better */
  var other = null, bd = Infinity;
  for (var gy = 20; gy < M.H - 20; gy += 4) for (var gx = 20; gx < M.W - 20; gx += 4) {
    if (Math.hypot(gx - G0.site.x, gy - G0.site.y) < 45 || Math.hypot(gx - E.homeX / TT, gy - E.homeY / TT) < 40) continue;
    if (!GameMap.passable(M, gx, gy, "ground") || Game.tileBlocked(gx, gy, null)) continue;
    /* out of sight and hearing of our own base */
    if (P.buildings.some(function (b) { return !b.dead && Math.hypot(b.x / TT - gx, b.y / TT - gy) < 32; })) continue;
    var dd = Math.hypot(gx - P.homeX / TT, gy - P.homeY / TT);
    if (dd < bd) { bd = dd; other = { x: gx, y: gy }; }
  }
  chk("open ground for a second test, clear of the SAM Site and the enemy's base", !!other, other ? "(" + other.x + "," + other.y + ")" : "none");
  if (!other) return;
  /* an AA Battery: a structure, so it stays where it was put, and a set
     quieter than the SAM Site's - heard 17.1 tiles off, inside a HARM's
     reach plus the approach */
  var og = openGround(3, 3, other.x, other.y, 4);
  var tg = og ? Game.placeBuilding(E, "flak", og.x, og.y, true) : null;
  if (tg) { tg.buildProgress = 1; durable(tg); }
  chk("an enemy AA Battery there, on the air", !!tg && Game.jamming(tg), tg ? tg.def.name + " lit " + Game.jamming(tg) : "not placed");
  if (!tg || !Game.jamming(tg)) return;
  quiet(tg.x, tg.y, 45, [tg, G0.S]);
  var hearR = tg.def.radar * Game.ESM_GAIN * TT;
  var w2 = durable(Game.spawnUnitAt(P, "sead_n", P.homeX, P.homeY));
  w2.padOn = G0.base;
  var reach = reachOf(w2), r = Math.max(CFG.CAP_RADIUS * TT, w2.turnRadius() * 1.1);
  /* a point beat whose circle stays just outside hearing and inside reach + approach */
  var hx = (P.homeX - tg.x), hy = (P.homeY - tg.y), hl = Math.hypot(hx, hy); hx /= hl; hy /= hl;
  var D = hearR + r + 1.2 * TT;
  var cx = tg.x + hx * D, cy = tg.y + hy * D;
  /* put on its circle, on the far side, already flying round it */
  w2.x = cx + hx * r; w2.y = cy + hy * r; w2.ang = Math.atan2(hy, hx) + Math.PI / 2;
  w2.give(w2.sniffOrder(cx, cy, cx, cy));
  var t0 = Game.time, inBand = 0, heard = 0, seen = 0, turned = false, near = Infinity;
  ticks(40, function () {
    var d = dist(w2, tg);
    if (TRACE && Math.round(Game.time * 30) % 30 === 0) log("    t " + Game.time.toFixed(1) + " w2 " + tiles(w2.x) + "," + tiles(w2.y) + " tg " + tiles(tg.x) + "," + tiles(tg.y) + " d " + tiles(d) + " c " + tiles(Math.hypot(w2.x - cx, w2.y - cy)) + " " + w2.order.type + " " + (w2.order.ph || ""));
    near = Math.min(near, d);
    var h = Game.esmPlot(P).has(tg.id), v = Game.visibleTo(P, tg);
    if (h) heard++;
    if (v) seen++;
    if (!h && !v && d <= reach + 8 * TT) inBand++;
    if (w2.order.type === "attack") turned = true;
    return false;
  });
  chk("the " + tg.def.name + " on the air, inside reach + approach, neither heard nor seen: left alone",
      inBand > 30 && !turned && shotsOf(w2, t0).length === 0,
      (inBand * DT).toFixed(1) + " s in reach and unheard; heard on " + heard + " ticks, seen " + seen + "; closest " + tiles(near) +
      " (heard inside " + tiles(hearR) + ", reach " + tiles(reach) + " + 8); turned in " + turned);
  /* the same set, the beat moved in to where it is heard */
  var D2 = hearR - r - 1.5 * TT;
  w2.ammo = w2.ammoMax; w2.fuel = w2.fuelMax;
  w2.give(w2.sniffOrder(tg.x + hx * D2, tg.y + hy * D2, tg.x + hx * D2, tg.y + hy * D2));
  var t1 = Game.time, how = null;
  ticks(40, function () {
    if (!how && w2.order.type === "attack" && w2.order.sniff && w2.order.target === tg)
      how = { heard: Game.esmPlot(P).has(tg.id), seen: Game.visibleTo(P, tg) };
    return shotsOf(w2, t1).length > 0;
  });
  chk("moved in to where its receiver hears the set, it turns in and fires", !!how && how.heard && shotsOf(w2, t1).length > 0,
      how ? "turned in: heard " + how.heard + ", seen " + how.seen + "; " + shotsOf(w2, t1).length + " round(s)" : "never turned in");
  gone(w2); gone(tg);
}

/* ---- 8. a new order ends it ---- */
function secCancel() {
  log("\n[8] a new order ends it");
  if (!W1) return;
  var S = G0.S;
  if (!Game.jamming(S)) lit(S, true);
  ticks(60, function () { return W1.order.type === "attack" && !!W1.order.sniff; });
  var turning = W1.order.type === "attack" && !!W1.order.sniff;
  sel([W1]);
  var mid = { x: (G0.C.x + G0.base.x) / 2, y: (G0.C.y + G0.base.y) / 2 };
  Render.setCam(mid.x, mid.y);
  rclick(scr(mid.x, mid.y));
  var o = W1.order, t0 = Game.time, sniffing = 0;
  ticks(12, function () { if (isSniff(W1)) sniffing++; return false; });
  /* its turn-in no longer holds the contact for anyone (sniffBusy prunes it) */
  W1.sniffBusy(S);
  var on = P.sniffOn && P.sniffOn.get(S.id);
  var claim = !!on && on.some(function (r) { return r.u === W1 && !r.away; });
  /* not on SNIFF any more, it is a Weasel on a move: the old reflex - a
     battery transmitting inside its reach is shot at, and then home - is
     its own business ([11]) */
  chk("caught mid turn-in, a right-click on the map sends it there and the sniff is over",
      turning && o.type === "move" && sniffing === 0 && !claim,
      "turning in " + turning + "; given " + o.type + ", on a sniff order on " + sniffing + " ticks of the next 12 s, its claim on the site left " + claim +
      " (then " + W1.order.type + (W1.order.auto ? ", its own reflex" : "") + ", " + shotsOf(W1, t0).length + " rounds)");
  lit(S, false);
}

/* ---- 9. Shift queues it; Esc, RMB and W again disarm ---- */
function secUi() {
  log("\n[9] W arms it for the aircraft selected; Shift queues it; Esc, a right-click or W again disarm it");
  if (!W1) return;
  sel([W1]);
  UI.frame(DT);
  var row = panel();
  chk("an F-16CJ selected: SNIFF is on its order row", /data-aact="sniff"/.test(row) && /SNIFF \(W\)/.test(row),
      /BASE.*PATROL.*STRIKE.*SNIFF/.test(row.replace(/<[^>]+>/g, " ")) ? "BASE / PATROL / STRIKE / SNIFF" : row.replace(/<[^>]+>/g, " ").slice(0, 120));
  key("w");
  var a1 = UI.sniffArmed() === true;
  key("Escape");
  var a2 = UI.sniffArmed();
  key("w");
  rclick(scr(W1.x, W1.y));
  var a3 = UI.sniffArmed();
  key("w"); key("w");
  var a4 = UI.sniffArmed();
  chk("W arms it; Esc, a right-click and W again each disarm it", a1 && !a2 && !a3 && !a4, [a1, a2, a3, a4].join(" "));
  /* Shift: behind a move */
  var far = { x: W1.x + 20 * TT * G0.uy, y: W1.y - 20 * TT * G0.ux };
  W1.ammo = W1.ammoMax; W1.fuel = W1.fuelMax;
  W1.give({ type: "move", x: far.x, y: far.y });
  ticks(0.2);                                           // off the ramp if it was on it
  key("w");
  var d = dragBeat(G0.A, G0.B, true);
  chk("Shift-drag queues the beat behind the move", W1.order.type === "move" && W1.orders.length === 1 && W1.orders[0].type === "sniff",
      W1.order.type + " then " + W1.orders.map(function (q) { return q.type; }).join(","));
  ticks(30, function () { return W1.order.type !== "move"; });
  chk("and takes it up when the move is flown", isSniff(W1), W1.order.type);
  /* the same aircraft parked, selected on the map: launched through the ramp */
  W1.give({ type: "rtb" });
  park(W1, 60);
  ticks(20, function () { return W1.order.type === "parked" || (W1.order.type === "rtb" && W1.ammo >= W1.ammoMax - 0.05 && W1.fuel >= W1.fuelMax - 1); });
  sel([W1]); key("w");
  dragBeat(G0.A, G0.B, false);
  chk("selected on its ramp, it is launched on the beat", W1.order.type === "sniff" && !W1.parked, W1.order.type + " parked " + W1.parked);
}

/* ---- 10. refused, with the reason ---- */
function secRefuse() {
  log("\n[10] an unarmed jammer, a fighter and a bomber are refused with the reason; a mixed flight takes it and names the rest");
  var fid = Object.keys(UNITS).filter(function (k) { return UNITS[k].role === "fighter" && UNITS[k].layer === "air"; })[0];
  var list = [["nato_e80_ewair", /NO ANTI-RADIATION MISSILE ABOARD/], [fid, /ONLY A SEAD OR EW AIRCRAFT/], ["hbomber_n", /ONLY A SEAD OR EW AIRCRAFT/]];
  var rows = [];
  list.forEach(function (it) {
    var u = Game.spawnUnitAt(P, it[0], P.homeX + 3 * TT, P.homeY + 3 * TT);
    sel([u]); UI.frame(DT);
    var row = panel();
    key("w");
    var said1 = lastAlert();
    rows.push({ u: u, ok: it[1].test(said1) && !UI.sniffArmed() && u.order.type !== "sniff", said: said1,
                btn: /data-aact="sniff"/.test(row), off: /off" data-aact="sniff"/.test(row) });
  });
  rows.forEach(function (r) {
    chk(r.u.def.name + ": refused, with the reason", r.ok, JSON.stringify(r.said));
  });
  chk("the EF-111A's row shows SNIFF greyed; the fighter's and the bomber's have none",
      rows[0].btn && rows[0].off && !rows[1].btn && !rows[2].btn, rows.map(function (r) { return r.u.def.name + (r.btn ? (r.off ? " grey" : " live") : " none"); }).join(", "));
  /* a mixed selection: the Weasel takes it, the fighter is named */
  var w = durable(Game.spawnUnitAt(P, "sead_n", P.homeX + 4 * TT, P.homeY + 4 * TT));
  sel([w, rows[1].u]);
  key("w");
  var armed = UI.sniffArmed() === true;
  dragBeat(G0.A, G0.B, false);
  chk("a Weasel and a fighter selected: the Weasel takes it and the fighter is named", armed && w.order.type === "sniff" && rows[1].u.order.type !== "sniff" &&
      /^1 AIRCRAFT ON SNIFF PATROL.*1 CANNOT/.test(lastAlert()), JSON.stringify(lastAlert()));
  /* a dry Weasel on the ramp stays there */
  var dry = Game.spawnUnit(P, "sead_n");
  park(dry);
  dry.ammo = 0;
  sel([G0.base]);
  UI.sniff(G0.base, [dry]);
  dragBeat(G0.A, G0.B, false);
  chk("one still rearming on the ramp stays there, and says why", dry.parked && dry.order.type !== "sniff" && /REARMING/.test(lastAlert()),
      JSON.stringify(lastAlert()) + ", parked " + dry.parked);
  rows.forEach(function (r) { gone(r.u); }); gone(w); gone(dry);
}

/* ---- 11. NOT on SNIFF: exactly as before ---- */
function secBaseline() {
  log("\n[11] an aircraft NOT on SNIFF takes its own shot exactly as before");
  var S = G0.S, base = G0.base;
  if (!Game.jamming(S)) lit(S, true);
  var fp = [];
  /* a combat air patrol 15 tiles from the lit site */
  var w3 = Game.spawnUnit(P, "sead_n");
  park(w3); durable(w3);
  var cx = S.x + G0.ux * 15 * TT, cy = S.y + G0.uy * 15 * TT, t0 = Game.time;
  Game.launchSortie(w3, { type: "cap", x: cx, y: cy });
  var self = null, types = [];
  ticks(60, function () {
    var ty = w3.order.type + (w3.order.auto ? "+auto" : "") + (w3.order.release ? "+rel" : "");
    if (types[types.length - 1] !== ty) { types.push(ty); fp.push("w3 " + Game.time.toFixed(2) + " " + ty); }
    if (!self && w3.order.type === "attack") self = { o: w3.order, t: Game.time };
    return shotsOf(w3, t0).length >= 2;
  });
  var s = shotsOf(w3, t0)[0], reach = w3.weaponRange(WEAPONS[w3.def.weapons[0]]);
  chk("on a combat air patrol it issues itself the attack it always has: auto, release, back to the patrol after",
      !!self && self.o.target === S && self.o.auto && self.o.release && !!self.o.resume && !self.o.sniff &&
      Math.abs(self.o.resume.x - cx) < 1 && types.indexOf("sniff") < 0,
      self ? "attack auto " + self.o.auto + " release " + self.o.release + " resume " + !!self.o.resume + " sniff " + !!self.o.sniff : "none");
  chk("and fires from its old orbit, inside 0.968 of its reach, never on a sniff run or break",
      !!s && s.d <= reach * 0.968 + 2 && types.join(",").indexOf("sniff") < 0,
      s ? "first round at " + tiles(s.d) + " tiles, " + (100 * s.d / reach).toFixed(1) + "% of reach" : "no round");
  shotsOf(w3, t0).forEach(function (q) { fp.push("shot " + q.t.toFixed(2) + " " + tiles(q.fx) + "," + tiles(q.fy) + " " + tiles(q.d)); });
  /* the ramp self-launch: a second airbase 13 tiles from the lit site */
  var bx = ((S.x + G0.ux * 13 * TT) / TT) | 0, by = ((S.y + G0.uy * 13 * TT) / TT) | 0;
  var spot = openGround(BUILDINGS.airbase.w + 2, BUILDINGS.airbase.h + 2, bx, by, 4);
  var b2 = spot ? Game.placeBuilding(P, "airbase", spot.x + 1, spot.y + 1, true) : null;
  if (b2) { b2.buildProgress = 1; P.primary.airbase = b2; }
  var w4 = b2 ? Game.spawnUnit(P, "sead_n") : null;
  if (w4) { park(w4); durable(w4); w4.fuel = w4.fuelMax; w4.ammo = w4.ammoMax; }
  var t1 = Game.time, launched = null;
  if (w4) ticks(20, function () {
    if (!launched && !w4.parked && w4.order.type === "attack") launched = { o: w4.order, t: Game.time };
    return !!launched;
  });
  chk("on its ramp, a battery transmitting in reach of its round starts it, and it attacks with release and goes home after",
      !!launched && launched.o.target === S && launched.o.auto && launched.o.release && !launched.o.sniff &&
      !!launched.o.then && launched.o.then.type === "rtb",
      launched ? "launched at +" + (launched.t - t1).toFixed(2) + " s from " + tiles(dist(b2, S)) + " tiles, then " + (launched.o.then ? launched.o.then.type : "-")
               : (b2 ? "did not launch: " + (w4 ? w4.order.type + " on " + (w4.padOn === b2 ? "the new base" : "?") + " " + tiles(dist(w4, S)) + " tiles off, stance " + w4.stance +
                        ", fuel " + Math.round(w4.fuel) + "/" + w4.fuelMax + ", ammo " + w4.ammo + ", lit " + Game.jamming(S) + ", known " + Game.airPlotKnows(P, S) +
                        ", seadTarget " + !!w4.seadTarget(true) : "-") : "no second airbase"));
  if (launched) fp.push("w4 " + (launched.t - t1).toFixed(2) + " " + tiles(w4.x) + "," + tiles(w4.y));
  /* the fingerprint: identical on HEAD (run there with -- baseline) */
  var h = 0, str = fp.join("|");
  for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  if (BASELINE) log("BASELINE " + (h >>> 0).toString(16) + " " + str);
  if (b2) { P.primary.airbase = base; gone(w4); gone(b2); }
  gone(w3);
}

/* ---- 12. drawn ---- */
function secDrawn() {
  log("\n[12] the beat is drawn in its own colour, with the break and the turn-in; Shift shows it for everyone");
  if (!W1) return;
  var S = G0.S;
  if (!isSniff(W1)) { W1.parked = false; W1.give(W1.sniffOrder(G0.A.x, G0.A.y, G0.B.x, G0.B.y)); }
  if (Game.jamming(S)) lit(S, false);
  ticks(15, function () { return W1.order.type === "sniff" && W1.order.ph !== "out"; });
  var L = Render2D.orderLines(Game, [W1], false), K = L.kinds.indexOf("sniff");
  var legs = function (L, k) { var out = []; for (var i = 0; i < L.n; i++) if (L.seg[i * 7 + 6] === k) out.push({ x0: L.seg[i * 7], y0: L.seg[i * 7 + 1], x1: L.seg[i * 7 + 3], y1: L.seg[i * 7 + 4], a: L.seg[i * 7 + 5] }); return out; };
  var o = W1.order, sn = legs(L, K);
  var ends = sn.some(function (q) { return Math.hypot(q.x1 - o.x, q.y1 - o.y) < 1; }) && sn.some(function (q) { return Math.hypot(q.x1 - o.x1, q.y1 - o.y1) < 1; });
  chk("the selected Weasel's beat: both ends, at height, in the sniff colour (its own, dashed)",
      K >= 0 && sn.length >= 2 && ends && sn.every(function (q) { return q.a === 1; }) && L.dash[K] === 1 &&
      L.colors.indexOf(L.colors[K]) === K,
      sn.length + " legs, colour " + L.colors[K]);
  var L2 = Render2D.orderLines(Game, [], true), sn2 = legs(L2, L2.kinds.indexOf("sniff"));
  var L3 = Render2D.orderLines(Game, [], false), sn3 = legs(L3, L3.kinds.indexOf("sniff"));
  chk("with Shift held it is drawn for every unit, selected or not", sn2.length >= 2 && sn3.length === 0, sn2.length + " with Shift, " + sn3.length + " without");
  lit(S, true);
  ticks(60, function () { return W1.order.type === "attack" && W1.order.sniff; });
  var turn = W1.order.type === "attack", La = Render2D.orderLines(Game, [W1], false);
  var sa = legs(La, La.kinds.indexOf("sniff"));
  chk("on a turn-in: the beat still drawn after it (the strike leg itself only once the site is in sight)", turn && sa.length >= 2,
      "turn-in " + turn + ", " + sa.length + " beat legs, " + legs(La, La.kinds.indexOf("strike")).length + " strike legs");
  ticks(30, function () { return W1.order.type === "sniff" && W1.order.ph === "out"; });
  var Lb = Render2D.orderLines(Game, [W1], false), sb = legs(Lb, Lb.kinds.indexOf("sniff"));
  var ob = W1.order;
  chk("on the break: a leg to the point it is running for, then the beat",
      ob.ph === "out" && sb.length >= 3 && Math.hypot(sb[0].x1 - ob.ex, sb[0].y1 - ob.ey) < 1,
      ob.ph + ", " + sb.length + " legs, first ends " + (sb.length ? tiles(Math.hypot(sb[0].x1 - ob.ex, sb[0].y1 - ob.ey)) : "-") + " tiles from the break point");
  /* a point beat: a mark at the point */
  var w5 = durable(Game.spawnUnitAt(P, "sead_n", P.homeX, P.homeY));
  w5.give(w5.sniffOrder(G0.C.x, G0.C.y, G0.C.x, G0.C.y));
  var Lc = Render2D.orderLines(Game, [w5], false), sc = legs(Lc, Lc.kinds.indexOf("sniff"));
  var mark = false;
  for (var i = 0; i < Lc.nm; i++) if (Lc.mark[i * 4 + 3] === Lc.kinds.indexOf("sniff") && Math.hypot(Lc.mark[i * 4] - G0.C.x, Lc.mark[i * 4 + 1] - G0.C.y) < 1) mark = true;
  chk("a point beat: one leg to the point, marked", sc.length === 1 && mark, sc.length + " legs, marked " + mark);
  gone(w5);
}

/* ---- 13. save and load ---- */
function secSave() {
  log("\n[13] a save made mid-break loads into the same break; one on the way home to rearm comes back to the beat");
  if (!W1) return;
  var S = G0.S;
  if (!Game.jamming(S)) lit(S, true);
  if (!isSniff(W1)) { W1.parked = false; W1.give(W1.sniffOrder(G0.A.x, G0.A.y, G0.B.x, G0.B.y)); }
  if (W1.ordnanceDry()) W1.ammo = W1.ammoMax;
  ticks(90, function () { return W1.order.type === "sniff" && W1.order.ph === "out"; });
  /* a second Weasel on its way home to rearm, the beat carried */
  var w6 = durable(Game.spawnUnitAt(P, "sead_n", G0.C.x, G0.C.y));
  w6.give(w6.sniffOrder(G0.A.x, G0.A.y, G0.B.x, G0.B.y));
  w6.ammo = 0;
  ticks(DT * 2);
  var o1 = W1.order, o6 = w6.order;
  var r = SaveGame.save(Game, "ironfront.sniff"), snap = null;
  try { snap = JSON.parse(localStorage.getItem("ironfront.sniff")); } catch (e) {}
  var rec = function (u) { return snap ? snap.units.filter(function (s) { return s.d === u.def.id && Math.abs(s.x - u.x) < 2 && Math.abs(s.y - u.y) < 2; })[0] : null; };
  var r1 = rec(W1), r6 = rec(w6);
  chk("the save writes the beat and the break: the point it is running for and its clock",
      r.ok && !!r1 && r1.ord.type === "sniff" && r1.ord.ph === "out" && Math.abs(r1.ord.ex - o1.ex) < 1 && Math.abs(r1.ord.x1 - o1.x1) < 1 && r1.ord.until > Game.time,
      r1 ? JSON.stringify(r1.ord) : (r.ok ? "no record" : r.error));
  chk("and the way home to rearm with the beat to come back to",
      o6.type === "rtb" && !!r6 && r6.ord.type === "rtb" && !!r6.ord.then && r6.ord.then.type === "sniff" && Math.abs(r6.ord.then.x - o6.then.x) < 1,
      "live " + o6.type + " then " + (o6.then ? o6.then.type : "-") + "; saved " + (r6 ? JSON.stringify(r6.ord) : "no record"));
  var ld = SaveGame.load("ironfront.sniff");
  localStorage.removeItem("ironfront.sniff");
  Game.players.forEach(function (p) { if (p !== Game.human && p.isAI) AI.setPeace(p, true); });
  Game.checkVictory = function () {};
  P = Game.human; M = Game.map;
  var find = function (id, x, y) { return P.units.filter(function (u) { return !u.dead && u.def.id === id && Math.abs(u.x - x) < 2 && Math.abs(u.y - y) < 2; })[0]; };
  var a = r1 ? find("sead_n", r1.x, r1.y) : null, b = r6 ? find("sead_n", r6.x, r6.y) : null;
  chk("loaded, the first is on the same break, for the same point",
      ld.ok && !!a && a.order.type === "sniff" && a.order.ph === "out" && Math.abs(a.order.ex - o1.ex) < 1,
      ld.ok ? (a ? a.order.type + " " + a.order.ph : "not found") : ld.error);
  chk("and the second is on its way home with the beat to come back to",
      !!b && b.order.type === "rtb" && !!b.order.then && b.order.then.type === "sniff", b ? b.order.type + " then " + (b.order.then ? b.order.then.type : "-") : "not found");
  if (a) {
    var ended = null, A = { x: a.order.x, y: a.order.y }, B = { x: a.order.x1, y: a.order.y1 };
    var S2 = Game.players.filter(function (p) { return p !== P; }).map(function (p) { return p.buildings.filter(function (q) { return !q.dead && q.def.radar && Math.abs(q.x - S.x) < 2 && Math.abs(q.y - S.y) < 2; })[0]; }).filter(Boolean)[0];
    if (S2) Game.setEmcon(S2, true);
    chk("the SAM Site is back where it stood, and is switched off for this", !!S2 && !Game.jamming(S2), S2 ? S2.def.name : "not found");
    ticks(40, function () { if (ended === null && a.order.ph !== "out") ended = Game.time; return ended !== null && segDist(a, A, B) < 2.5 * TT; });
    chk("and finishes it and goes back to the beat", ended !== null && segDist(a, A, B) < 2.5 * TT && a.order.type === "sniff" && a.order.ph !== "out",
        ended !== null ? "break over, " + tiles(segDist(a, A, B)) + " tiles off the beat" : a.order.type + " " + a.order.ph);
  }
  if (b) {
    var parked = false, up = null;
    ticks(120, function () { if (b.parked) parked = true; if (parked && !b.parked && isSniff(b)) { up = Game.time; return true; } return false; });
    chk("and the second rearms and takes the beat up", up !== null, up !== null ? "airborne on it again" : b.order.type);
  }
}
