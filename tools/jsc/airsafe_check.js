/* tools/jsc/airsafe_check.js - the commander's air force keeps out of the
   air defence it knows (ai.js AIRSAFE), checked on the real game under
   JavaScriptCore, 3D off.

     python3 tools/jsc/run.py index.html --test tools/jsc/airsafe_check.js

   Every scene is a fresh Game.init: a human seat that nobody drives and a
   commander held at peace (AI.setPeace - its clocks and its picture run, it
   launches nothing of its own), every unit of both sides taken off the
   board and the commander's bank emptied. The human's structures stand
   unpowered, so no battery here fires a shot. "Seen" means a scout of the
   commander's stood beside the thing for two seconds - its own picture and
   its own look grid, the only way it learns anything - and taken away
   again, unless a live track is wanted. What the commander would order is
   read through AI.airTargetOf (the pick a think makes) and AI.airsafeOf
   (the sweep, the book of airframes, the rules of engagement, a purchase).

     1. A fighter leaves an air contact under a SAM Site it has seen, takes
        one well clear of it, and leaves one clear of it whose straight way
        in crosses the ring; aiOff "airsafe" takes the nearest each time.
     2. A gunship passes over a tank 3 tiles from a seen AA Battery for one
        further off in the open; takes one just inside the ring that it can
        work from outside it with the Hellfire; aiOff takes the nearer.
     3. The sweep toward an objective under a seen SAM Site stops on our
        side of it - its patrol circle clear of the ring, the line from home
        to it crossing none; aiOff sweeps over the objective.
     4. A Weasel (NATO, HARM) goes at the AA Battery it out-flies, not at a
        nearer SAM Site; with no Battery it stays home; aiOff takes the SAM
        Site.
     5. A battery the commander has never seen is not avoided - and is, once
        a scout of its own has seen it.
     6. Re-buy: two fighters lost inside 45 s of their orders hold the
        fighter's purchase, a loss a minute after its order does not count,
        a purchase is refused while it holds and the hold runs out; the loss
        to a battery on the ring list at the order is counted; aiOff never
        holds.
     7. Rules of engagement: a fighter on patrol near a seen SAM Site has the
        contact under it struck off and does not take it, where aiOff
        chases it; a gunship's attack on a tank under a seen AA Battery is
        broken off and it leaves; aiOff leaves the attack alone.
     8. Difficulty: a Recruit takes the covered contact; a Regular leaves it
        but takes the one whose way in crosses the ring.
     9. The player's aircraft are not the commander's: nothing here touches
        them, the ring list a stand-off bomber flies by still holds an enemy
        fighter while the commander's (noAir) does not, and reading the
        commander's list sweeps nothing on the plot.
    10. Flown: a commander at war, a gunship of its own on the ramp side of
        the field, a tank of ours (the player's) 2 tiles beyond a POWERED AA
        Battery it has seen, a radar dome behind it. aiOff sends the gunship at the tank and it is
        shot down; with the rule it is not sent there, and lives.
    11. Review. (a) A contact in the corner of the square acquire() scans,
        beyond the old circle, under a seen ring: struck off. (b) Expired
        strikes are dropped from the list. */
/* TT, not T: config.js owns the global T (the terrain table) */
var PASS = 0, FAIL = 0, TT = 32, DT = 1 / 30;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "fulda"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-seed", "ascheck"); set("opt-fog", "1"); set("opt-3d", "0");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

/* ------------------------------------------------------------ the scene */
var H = null, E = null, F = null;
function scene(o) {
  o = o || {};
  var facH = o.facH || "nato", facE = o.facE || "pact", diff = o.diff || "commander";
  Game.init({ theatre: "fulda", seed: "ascheck", cash: 0, diff: diff,
    era: "e20", eraAI: "e20", eraCapHuman: "e20", eraCapAI: "e20", fog: true,
    startPos: -1, weather: "clear", factionHuman: facH, factionAI: facE,
    techHuman: 3, techAI: 3, capHuman: 3, capAI: 3, armsHuman: "all", armsAI: "all",
    superweapons: false, resources: 1, mapSize: 144, aiHandicap: 1,
    roster: [{ faction: facH, ai: false, team: 1, label: "YOU" },
             { faction: facE, ai: true, team: 2, diff: diff, personality: "balanced", label: "ENEMY" }] });
  H = Game.players[0]; E = Game.players[1];
  Game.checkVictory = function () {};
  AI.setPeace(E, true);
  E.cash = 0;
  if (o.off) E.aiOff = new Set(["airsafe"]);
  [H, E].forEach(function (p) {
    p.units.slice().forEach(function (u) {
      var i = Game.entities.indexOf(u); if (i >= 0) Game.entities.splice(i, 1);
      u.dead = true;
    });
    p.units.length = 0;
  });
  F = frame();
  return !!AI.airsafeOf(E) && !!F;
}
function tick(sec) { var n = Math.round(sec / DT); for (var i = 0; i < n; i++) Game.tick(DT); }
function isLand(x, y) { var M = Game.map; return x > 3 && y > 3 && x < M.W - 4 && y < M.H - 4 && GameMap.passable(M, x, y, "ground") && !Game.tileBlocked(x, y, null); }
function clear(x, y) { for (var i = -1; i < 3; i++) for (var j = -1; j < 3; j++) if (!isLand(x + i, y + j)) return false; return true; }
function spot(p) { for (var r = 0; r < 10; r++) for (var a = 0; a < 32; a++) {
  var x = Math.round(p.x + Math.cos(a / 32 * 6.283) * r), y = Math.round(p.y + Math.sin(a / 32 * 6.283) * r);
  if (clear(x, y)) return { x: x, y: y }; } return null; }
/* the open ground furthest from both start positions, and a frame on it:
   `a` tiles toward the commander's home, `b` tiles across */
function frame() {
  var M = Game.map, best = null, bs = -1;
  for (var y = 40; y <= M.H - 40; y += 2) for (var x = 40; x <= M.W - 40; x += 2) {
    var s = Math.min(Math.hypot(x * TT - H.homeX, y * TT - H.homeY), Math.hypot(x * TT - E.homeX, y * TT - E.homeY)) / TT;
    if (s > bs && clear(x, y)) { bs = s; best = { x: x, y: y }; }
  }
  if (!best) return null;
  var ux = E.homeX / TT - best.x, uy = E.homeY / TT - best.y, L = Math.hypot(ux, uy);
  best.ux = ux / L; best.uy = uy / L; best.vx = -best.uy; best.vy = best.ux;
  return best;
}
function at(a, b) { return { x: Math.round(F.x + F.ux * a + F.vx * b), y: Math.round(F.y + F.uy * a + F.vy * b) }; }
function bld(p, id, pos) { var s = spot(pos); var b = s ? Game.placeBuilding(p, id, s.x, s.y, true) : null; if (b) b.buildProgress = 1; return b; }
function put(p, id, pos) {
  var u = Game.spawnUnitAt(p, id, pos.x * TT + 16, pos.y * TT + 16);
  if (!u) return null;
  u.order = { type: "idle" }; u.orders = []; u.path = null; u.stance = "hold";
  if (u.layer === "air") { u.parked = false; u.order = { type: "hover" }; u.fuel = u.fuelMax; if (u.ammoMax) u.ammo = u.ammoMax; }
  return u;
}
/* one of the commander's aircraft, in the air, idle, unkillable here */
function fly(id, pos) { var u = put(E, id, pos); if (u) { u.stance = "normal"; u.hp = u.maxHp = 1e6; } return u; }
function off(list) { list.forEach(function (e) { if (e && !e.dead) { e.dead = true; if (e.kind === "building") Game.removeBuilding(e); } }); Game.sweepDead(); }
/* the commander sees `pos` for two seconds through a scout of its own; kept
   if `keep` (a live track wanted), else taken away again */
function eye(pos, keep) { var r = put(E, AI.pickOf(E, "recon") || "recon_p", pos); tick(2); if (!keep) off([r]); return r; }
function near(e, d) { return { x: Math.round(e.x / TT + F.ux * d), y: Math.round(e.y / TT + F.uy * d) }; }
function tiles(a, b) { return Math.round(U.dist(a.x, a.y, b.x, b.y) / TT * 10) / 10; }
function moveTo(u, pos) { u.x = pos.x * TT + 16; u.y = pos.y * TT + 16; u.tx = pos.x; u.ty = pos.y; }
function nm(e) { return e ? e.def.name : "nothing"; }
function R(p) { return Game.standoffRings(p || E, true); }
function ringOf(e, list) { list = list || R(); var r = Game.airDefenceReach(e.def) * 1.25;
  for (var i = 0; i < list.length; i += 3) if (Math.abs(list[i + 2] - r) < 0.01 && U.dist(list[i], list[i + 1], e.x, e.y) < 3 * TT) return true; return false; }
function inside(x, y, m) { return Game.airThreatAt(E, x, y, m || 0, R()) > 0; }
/* the straight segment A-B inside any ring of the list? */
function legHot(list, ax, ay, bx, by) {
  var dx = bx - ax, dy = by - ay, L2 = dx * dx + dy * dy;
  for (var i = 0; i < list.length; i += 3) {
    var t = L2 > 0 ? ((list[i] - ax) * dx + (list[i + 1] - ay) * dy) / L2 : 0; t = Math.max(0, Math.min(1, t));
    if (U.dist(ax + dx * t, ay + dy * t, list[i], list[i + 1]) < list[i + 2] * TT) return true;
  }
  return false;
}
function stats() { return E.aiStats || {}; }

function run() {
  fighterPick();
  gunshipPick();
  sweepPoint();
  weasel();
  unseen();
  rebuy();
  roe();
  tiers();
  playersOwn();
  flown();
  review();
}

/* ---- 1. the fighter ---- */
function fighterScene(noAS) {
  var out = {};
  if (!scene({ off: noAS })) return null;
  var sam = bld(H, "sam", at(0, 0));
  eye(near(sam, 2));
  var fi = fly(AI.pickOf(E, "fighter") || "fighter_p", at(30, 0));
  var c = put(H, "helo_n", at(-3, 2));
  var ey = eye(near(c, 3), true);
  out.ring = ringOf(sam); out.sam = sam; out.fi = fi; out.c = c;
  out.inRing = AI.airTargetOf(E, fi) === c;
  out.inD = tiles(c, sam);
  moveTo(c, at(34, 24)); moveTo(ey, at(36, 24)); tick(2);
  out.clear = AI.airTargetOf(E, fi) === c;
  out.clearD = tiles(c, sam);
  moveTo(c, at(-32, 0)); moveTo(ey, at(-34, 0)); tick(2);
  out.far = AI.airTargetOf(E, fi) === c;
  out.farD = tiles(c, sam);
  out.stats = Object.assign({}, stats());
  return out;
}
function fighterPick() {
  log("\n[1] a fighter leaves an air contact under a SAM Site it has seen, and one whose way in crosses it");
  var on = fighterScene(false), offS = fighterScene(true);
  if (!on || !offS) { chk("the scenes are raised", false); return; }
  chk("the SAM Site is on the commander's ring list, seen once and remembered", on.ring, "");
  chk("a contact " + on.inD + " tiles from the battery (inside its 17.5-tile ring) is left alone", !on.inRing, "picked " + on.inRing);
  chk("a contact " + on.clearD + " tiles off, on our side, is taken", on.clear, "picked " + on.clear);
  chk("a contact " + on.farD + " tiles beyond the battery - clear of the ring, but the straight way in crosses it - is left alone", !on.far, "picked " + on.far);
  chk("aiOff \"airsafe\": the old pick, the nearest contact, each time", offS.inRing && offS.clear && offS.far,
      "under the ring " + offS.inRing + ", clear " + offS.clear + ", beyond " + offS.far);
  chk("the refusals are counted (airTargetsRefused), and not with the behaviour off",
      (on.stats.airTargetsRefused || 0) >= 1 && !offS.stats.airTargetsRefused,
      JSON.stringify(on.stats) + " / off " + JSON.stringify(offS.stats));
}

/* ---- 2. the gunship ---- */
function gunshipScene(noAS) {
  if (!scene({ off: noAS })) return null;
  var flak = bld(H, "flak", at(0, 0));
  var g = fly(AI.pickOf(E, "gunship") || "helo_p", at(35, 0));
  var t1 = put(H, "mbt_n", at(3, 0)), t2 = put(H, "mbt_n", at(13, 28));
  var e1 = eye(near(t1, 3), true), e2 = eye(near(t2, 3), true);
  var out = { flak: flak, g: g, t1: t1, t2: t2, d1: tiles(g, t1), d2: tiles(g, t2), f1: tiles(flak, t1), f2: tiles(flak, t2) };
  out.ring = ringOf(flak);
  out.pick = AI.airTargetOf(E, g);
  /* a tank just inside the ring's edge, nearer than the one in the open */
  off([t1]);
  var t3 = put(H, "mbt_n", at(14, 0)); eye(near(t3, 3), true);
  out.t3 = t3; out.f3 = tiles(flak, t3); out.reach = Game.airDefenceReach(flak.def) * 1.25;
  out.pick3 = AI.airTargetOf(E, g);
  return out;
}
function gunshipPick() {
  log("\n[2] a gunship works what it can from outside a seen AA Battery");
  var on = gunshipScene(false), offS = gunshipScene(true);
  if (!on || !offS) { chk("the scenes are raised", false); return; }
  chk("the AA Battery is on the ring list", on.ring);
  chk("of a tank " + on.f1 + " tiles from the Battery (" + on.d1 + " off) and one " + on.f2 + " tiles from it (" + on.d2 + " off), it takes the one in the open",
      on.pick === on.t2, "picked " + (on.pick === on.t1 ? "the covered tank" : on.pick === on.t2 ? "the open one" : nm(on.pick)));
  chk("a tank " + on.f3 + " tiles from the Battery - inside its " + on.reach.toFixed(1) + "-tile ring - is taken: the Hellfire works it from outside",
      on.pick3 === on.t3, "picked " + (on.pick3 === on.t3 ? "the tank at the edge" : nm(on.pick3)));
  chk("aiOff \"airsafe\": the nearer tank under the Battery", offS.pick === offS.t1,
      "picked " + (offS.pick === offS.t1 ? "the covered tank" : nm(offS.pick)));
}

/* ---- 3. the sweep ---- */
function sweepScene(noAS) {
  if (!scene({ off: noAS })) return null;
  var A = AI.airsafeOf(E);
  var s0 = A.sweep();
  if (!s0) return { none: true };
  var sam = bld(H, "sam", { x: Math.round(s0.raw.x / TT), y: Math.round(s0.raw.y / TT) });
  eye(near(sam, 3));
  var s = AI.airsafeOf(E).sweep();
  return { s0: s0, s: s, sam: sam };
}
function sweepPoint() {
  log("\n[3] a sweep toward an objective under a seen SAM Site stops on our side of it");
  var on = sweepScene(false), offS = sweepScene(true);
  if (!on || !offS || on.none || offS.none) { chk("the scenes are raised and there is a sweep point", false); return; }
  var s = on.s, list = R(), ring = Game.airDefenceReach(on.sam.def) * 1.25;
  var rawIn = Game.airThreatAt(E, s.raw.x, s.raw.y, 0, list) > 0;
  var circ = CFG.CAP_RADIUS + 1.75 + 2.5;
  var clearC = Game.airThreatAt(E, s.x, s.y, circ, list) <= 0;
  var leg = legHot(list, E.homeX, E.homeY, s.x, s.y);
  chk("the objective it sweeps toward is under the battery's ring", rawIn,
      "objective " + tiles(s.raw, on.sam) + " tiles from the battery");
  chk("the sweep is moved to " + tiles(s, on.sam) + " tiles from the battery: its patrol circle (" + circ.toFixed(2) + " tiles) clear of the " + ring.toFixed(1) + "-tile ring, and the line from home to it crossing none",
      s.moved && clearC && !leg, "moved " + s.moved + ", circle clear " + clearC + ", way in crosses a ring " + leg +
      ", " + tiles(s, { x: E.homeX, y: E.homeY }) + " tiles from home (objective " + tiles(s.raw, { x: E.homeX, y: E.homeY }) + ")");
  chk("aiOff \"airsafe\": over the objective", !offS.s.moved && offS.s.x === offS.s.raw.x && offS.s.y === offS.s.raw.y,
      tiles(offS.s, offS.sam) + " tiles from the battery");
}

/* ---- 4. the Weasel ---- */
function weaselScene(noAS, withFlak) {
  if (!scene({ off: noAS, facH: "pact", facE: "nato" })) return null;
  var w = fly(AI.pickOf(E, "sead") || "sead_n", at(30, 0));
  var sam = bld(H, "sam", at(0, -16));
  var flak = withFlak ? bld(H, "flak", at(-12, 28)) : null;
  eye(near(sam, 3));
  if (flak) eye(near(flak, 3));
  var harm = 0;
  w.def.weapons.forEach(function (k) { var x = WEAPONS[k]; if (x && x.antiRadiation) harm = Math.max(harm, w.weaponRange(x) / TT); });
  return { w: w, sam: sam, flak: flak, pick: AI.airTargetOf(E, w), harm: harm,
           dS: tiles(w, sam), dF: flak ? tiles(w, flak) : 0 };
}
function weasel() {
  log("\n[4] a Weasel goes at the battery it out-flies, not the nearer one that out-ranges it");
  var on = weaselScene(false, true), lone = weaselScene(false, false), offS = weaselScene(true, true);
  if (!on || !lone || !offS) { chk("the scenes are raised", false); return; }
  var orbit = on.harm * 0.88 * 0.85;
  chk("of a SAM Site " + on.dS + " tiles off (published reach " + Game.airDefenceReach(on.sam.def) + ") and an AA Battery " + on.dF +
      " off (" + Game.airDefenceReach(on.flak.def) + "), the " + on.w.def.name + " (HARM " + on.harm.toFixed(2) + ", circling at " + orbit.toFixed(2) + ") takes the Battery",
      on.pick === on.flak, "picked " + nm(on.pick));
  chk("with no Battery, nothing: it stays on the ramp rather than go at the SAM Site", lone.pick === null, "picked " + nm(lone.pick));
  chk("aiOff \"airsafe\": the nearer emitter, the SAM Site", offS.pick === offS.sam, "picked " + nm(offS.pick));
}

/* ---- 5. fog ---- */
function unseen() {
  log("\n[5] a battery the commander has never seen is not avoided");
  if (!scene({})) { chk("the scene is raised", false); return; }
  var flak = bld(H, "flak", at(0, 0));
  var g = fly(AI.pickOf(E, "gunship") || "helo_p", at(35, 0));
  var rid = AI.pickOf(E, "recon") || "recon_p", sight = UNITS[rid].sight;
  /* the tank 10 tiles beyond the battery from the gunship, the scout 5
     tiles beyond the tank: the tank in its eyes, the battery out of them,
     and a gunship working the tank would hover right over the battery */
  var t1 = put(H, "mbt_n", at(-10, 0));
  var ey = put(E, rid, at(-15, 0)); tick(2);
  var seen = Game.visibleTo(E, flak), onList = ringOf(flak), explored = Game.explored(E, flak.ty * Game.map.W + flak.tx);
  var pick = AI.airTargetOf(E, g);
  chk("unseen and on unexplored ground the battery is on no list, and the tank " + tiles(t1, flak) + " tiles from it is taken",
      !seen && !onList && !explored && pick === t1, "seen " + seen + ", explored " + explored + ", on the list " + onList + ", picked " + nm(pick));
  moveTo(ey, at(4, 3)); tick(2);
  var pick2 = AI.airTargetOf(E, g);
  chk("once a scout of its own has seen it, the tank is left alone", ringOf(flak) && pick2 !== t1,
      "on the list " + ringOf(flak) + ", picked " + nm(pick2));
}

/* ---- 6. re-buy ---- */
function rebuyScene(noAS) {
  if (!scene({ off: noAS })) return null;
  var A = function () { return AI.airsafeOf(E); };
  var fid = AI.pickOf(E, "fighter") || "fighter_p";
  var sam = bld(H, "sam", at(0, 0)); eye(near(sam, 2));
  var out = { steps: [] };
  function lose(after, bySam) {
    var f = fly(fid, at(20, 0));
    A().sent(f);
    tick(after);
    if (bySam) { f.lastHitBy = sam; f.lastHitAt = Game.time; }
    Combat.kill(Game, f, bySam ? sam : null);
    tick(0.5); A().tick();
    out.steps.push({ after: after, hold: A().holds.fighter || 0, now: Game.time, quick: (A().quick.fighter || []).length });
  }
  lose(60, false);          // a slow loss: not counted
  lose(8, true);            // the first quick loss, to the known battery
  out.afterOne = A().holds.fighter || 0;
  lose(20, false);          // the second: the hold
  out.held = A().holds.fighter || 0; out.heldAt = Game.time;
  /* a purchase while it holds: an airbase, the cash and the fuel for it */
  var ab = bld(E, "airbase", { x: Math.round(E.homeX / TT) + 6, y: Math.round(E.homeY / TT) + 6 });
  bld(E, "radar", { x: Math.round(E.homeX / TT) - 6, y: Math.round(E.homeY / TT) + 6 });
  E.cash = 60000; E.oil = 2000;
  var h0 = stats().rebuyHeld || 0;
  out.buyHeld = A().buy("fighter");
  out.heldCount = (stats().rebuyHeld || 0) - h0;
  tick(Math.max(0, out.held - Game.time) + 1);
  E.cash = 60000; E.oil = 2000;
  var h1 = stats().rebuyHeld || 0;
  out.buyAfter = A().buy("fighter");
  out.afterCount = (stats().rebuyHeld || 0) - h1;
  out.expired = !(A().holds.fighter > Game.time);
  out.stats = Object.assign({}, stats());
  out.ab = !!ab;
  return out;
}
function rebuy() {
  log("\n[6] a role whose airframes die as soon as they are sent waits before it is bought again");
  var on = rebuyScene(false), offS = rebuyScene(true);
  if (!on || !offS) { chk("the scenes are raised", false); return; }
  chk("a loss 60 s after the order is not a quick loss; one 8 s after it is, and one alone holds nothing",
      on.steps[0].quick === 0 && on.steps[1].quick === 1 && !(on.afterOne > on.steps[1].now),
      JSON.stringify(on.steps.slice(0, 2)));
  var len = Math.round((on.held - on.heldAt) * 10) / 10;
  chk("a second quick loss holds the fighter's purchase, " + len + " s (AS_HOLD 90 a loss past the first)",
      on.held > on.heldAt && len >= 85 && len <= 91, JSON.stringify(on.steps[2]));
  chk("while it holds the purchase is refused, and counted (rebuyHeld)", on.ab && on.buyHeld === false && on.heldCount === 1,
      "airbase " + on.ab + ", bought " + on.buyHeld + ", counted " + on.heldCount);
  chk("the hold runs out, and the purchase is no longer refused for it", on.expired && on.afterCount === 0,
      "expired " + on.expired + ", bought " + on.buyAfter + " (counted held " + on.afterCount + ")");
  chk("the counters: three lost, two quick, one to the battery on the ring list at its order, one hold",
      on.stats.airLost === 3 && on.stats.airLossQuick === 2 && on.stats.airLossKnownAD === 1 && on.stats.rebuyHolds === 1,
      JSON.stringify(on.stats));
  chk("aiOff \"airsafe\": never held, never refused - the losses still counted",
      !(offS.held > offS.heldAt) && offS.heldCount === 0 && offS.stats.airLost === 3 && !offS.stats.rebuyHolds,
      "hold " + (offS.held > offS.heldAt) + ", bought " + offS.buyHeld + ", counted held " + offS.heldCount + ", " + JSON.stringify(offS.stats));
}

/* ---- 7. rules of engagement ---- */
function roeScene(noAS) {
  if (!scene({ off: noAS })) return null;
  var A = function () { return AI.airsafeOf(E); };
  var sam = bld(H, "sam", at(0, 0)); eye(near(sam, 2));
  var ring = Game.airDefenceReach(sam.def) * 1.25;
  /* a helicopter of theirs hovering under the battery 15 tiles in, held on
     the commander's picture by a scout; then a fighter put on patrol 26
     tiles off the battery - where asStation would put one: the 17.5-tile
     ring, 2.5 tiles of margin, the patrol circle and its wander - the
     helicopter inside its eyes and its patrol */
  var c = put(H, "helo_n", at(15, 0));
  var ey = eye(at(16, 3), true);
  var fi = fly(AI.pickOf(E, "fighter") || "fighter_p", at(26, 0));
  var p = at(26, 0);
  fi.give({ type: "cap", x: p.x * TT + 16, y: p.y * TT + 16 });
  A().tick();
  var struck = !!(fi.soNo && fi.soNo.get(c.id) > Game.time);
  var took = false, minD = 1e9;
  for (var i = 0; i < 6 / DT; i++) {
    Game.tick(DT);
    if (i % 15 === 0) A().tick();
    if (fi.order.type === "attack" && fi.order.target === c) took = true;
    var d = U.dist(fi.x, fi.y, sam.x, sam.y) / TT; if (d < minD) minD = d;
  }
  off([fi, c, ey]);
  /* a gunship already on an attack at a tank under a seen AA Battery */
  var flak = bld(H, "flak", at(-30, 30)); eye(near(flak, 2));
  var t = put(H, "mbt_n", { x: Math.round(flak.x / TT) + 2, y: Math.round(flak.y / TT) });
  var e2 = eye(near(t, 3), true);
  var g = fly(AI.pickOf(E, "gunship") || "helo_p", near(t, 12));
  g.order = { type: "attack", target: t, auto: true };
  A().tick();
  return { struck: struck, took: took, minD: minD, ring: ring,
           gOrder: g.order.type, gTarget: g.order.target === t, gStruck: !!(g.soNo && g.soNo.get(t.id) > Game.time),
           stats: Object.assign({}, stats()) };
}
function roe() {
  log("\n[7] rules of engagement: what it could take for itself under a seen ring is struck off");
  var on = roeScene(false), offS = roeScene(true);
  if (!on || !offS) { chk("the scenes are raised", false); return; }
  chk("a fighter on patrol has the helicopter under the SAM Site struck off, does not take it, and stays out of the " + on.ring.toFixed(1) + "-tile ring",
      on.struck && !on.took && on.minD > on.ring, "struck " + on.struck + ", took it " + on.took + ", closest " + on.minD.toFixed(1) + " tiles");
  chk("aiOff \"airsafe\": it takes the helicopter and goes in after it", !offS.struck && offS.took,
      "struck " + offS.struck + ", took it " + offS.took + ", closest " + offS.minD.toFixed(1));
  chk("a gunship's attack on a tank under the AA Battery is broken off - struck off, and away on a move",
      on.gStruck && !(on.gOrder === "attack" && on.gTarget) && (on.stats.airBrokeOff || 0) >= 1,
      "order now " + on.gOrder + ", struck " + on.gStruck + ", " + JSON.stringify(on.stats));
  chk("aiOff \"airsafe\": the attack stands", offS.gOrder === "attack" && offS.gTarget && !offS.gStruck,
      "order " + offS.gOrder);
}

/* ---- 8. difficulty ---- */
function tierScene(diff) {
  if (!scene({ diff: diff })) return null;
  var sam = bld(H, "sam", at(0, 0)); eye(near(sam, 2));
  var fi = fly(AI.pickOf(E, "fighter") || "fighter_p", at(30, 0));
  var c = put(H, "helo_n", at(-3, 2)); var ey = eye(near(c, 3), true);
  var under = AI.airTargetOf(E, fi) === c;
  moveTo(c, at(-32, 0)); moveTo(ey, at(-34, 0)); tick(2);
  var beyond = AI.airTargetOf(E, fi) === c;
  return { under: under, beyond: beyond, on: AI.airsafeOf(E).on, full: AI.airsafeOf(E).full };
}
function tiers() {
  log("\n[8] the difficulty table: a Recruit flies as before, a Regular half-way");
  var rec = tierScene("recruit"), reg = tierScene("regular"), vet = tierScene("veteran");
  if (!rec || !reg || !vet) { chk("the scenes are raised", false); return; }
  chk("a Recruit takes the contact under the ring (the rule is off at read 0)", !rec.on && rec.under && rec.beyond,
      "on " + rec.on + ", under " + rec.under + ", beyond " + rec.beyond);
  chk("a Regular leaves the contact under the ring but takes the one whose way in crosses it", reg.on && !reg.full && !reg.under && reg.beyond,
      "on " + reg.on + ", full " + reg.full + ", under " + reg.under + ", beyond " + reg.beyond);
  chk("a Veteran leaves both", vet.on && vet.full && !vet.under && !vet.beyond,
      "under " + vet.under + ", beyond " + vet.beyond);
}

/* ---- 9. the player's own ---- */
function playersOwn() {
  log("\n[9] the player's aircraft are the player's");
  if (!scene({})) { chk("the scene is raised", false); return; }
  var sam = bld(E, "sam", at(-10, 0));
  var mine = put(H, "fighter_n", at(-14, 4)); mine.stance = "normal"; mine.hp = mine.maxHp = 1e6;
  var p = at(-10, 2); mine.give({ type: "cap", x: p.x * TT + 16, y: p.y * TT + 16 });
  var tk = put(E, "mbt_p", at(-12, 0));
  tick(1);
  var foeFi = fly(AI.pickOf(E, "fighter") || "fighter_p", { x: Math.round(mine.x / TT) + 2, y: Math.round(mine.y / TT) });
  Game.recomputeFog();
  var hSees = Game.visibleTo(H, foeFi);
  var full = Game.airThreatRings(H, true), noAir = Game.airThreatRings(H, true, true);
  var fiRing = false, fiRingNA = false, r = Game.airDefenceReach(foeFi.def) * 1.25;
  for (var i = 0; i < full.length; i += 3) if (Math.abs(full[i + 2] - r) < 0.01 && U.dist(full[i], full[i + 1], foeFi.x, foeFi.y) < TT * 4) fiRing = true;
  for (i = 0; i < noAir.length; i += 3) if (Math.abs(noAir[i + 2] - r) < 0.01 && U.dist(noAir[i], noAir[i + 1], foeFi.x, foeFi.y) < TT * 4) fiRingNA = true;
  chk("the list a stand-off bomber flies by still holds the enemy fighter it sees; the commander's (noAir) does not",
      hSees && fiRing && !fiRingNA, "seen " + hSees + ", on the full list " + fiRing + ", on the noAir list " + fiRingNA);
  /* reading the commander's list moves nothing on the plot */
  Game.tick(DT);
  var pl = E._aaPlot, t0 = pl ? pl.t : null, n0 = pl ? pl.by.size : -1;
  Game.standoffRings(E, true); Game.time += 0.2; Game.standoffRings(E, true); Game.time -= 0.2;
  chk("reading the noAir list sweeps nothing on the plot", (pl ? pl.t : null) === t0 && (pl ? pl.by.size : -1) === n0,
      "plot swept at " + t0 + " -> " + (pl ? pl.t : null));
  /* the commander, at war, thinks and runs its rules: the player's fighter
     keeps its own order and is struck off nothing */
  AI.setPeace(E, false);
  var order0 = mine.order.type, ox = mine.order.x;
  for (var k = 0; k < 10 / DT; k++) { Game.tick(DT); if (k % 15 === 0) AI.airsafeOf(E).tick(); }
  chk("ten seconds of a commander at war beside it: the player's fighter keeps its patrol and has nothing struck off",
      !mine.soNo && (mine.order.type === order0 || mine.order.type === "attack") && (mine.order.type !== "cap" || mine.order.x === ox),
      "order " + order0 + " -> " + mine.order.type + ", soNo " + !!mine.soNo);
  chk("no commander runs the human seat", AI.airsafeOf(H) === null && AI.airTargetOf(H, mine) === null);
}

/* ---- 10. flown ---- */
function flownScene(noAS) {
  if (!scene({ off: noAS })) return null;
  var flak = bld(H, "flak", at(0, 0));
  /* the Battery's own set sees 9 tiles; a dome behind it gives it the
     track out to its reach, as a base would */
  bld(H, "radar", at(-7, 0));
  for (var i = 0; i < 6 && H.powerRatio() < 1.5; i++) bld(H, "power", at(-8 - i * 3, 12));
  eye(near(flak, 3));
  var t = put(H, "mbt_n", at(-2, 0)); t.hp = t.maxHp = 1e6;
  var e1 = eye(near(t, 4), true); e1.hp = e1.maxHp = 1e6;
  var g = put(E, AI.pickOf(E, "gunship") || "helo_p", at(40, 0));
  g.stance = "normal"; g.order = { type: "hover" };
  var hp0 = g.hp, minD = 1e9, sentAt = -1;
  AI.setPeace(E, false);
  for (var k = 0; k < 75 / DT; k++) {
    Game.tick(DT);
    if (g.dead) break;
    g.fuel = g.fuelMax;
    var d = U.dist(g.x, g.y, flak.x, flak.y) / TT; if (d < minD) minD = d;
    if (sentAt < 0 && g.order.type === "attack" && g.order.target === t) sentAt = Game.time;
  }
  return { dead: g.dead, minD: minD, sent: sentAt >= 0, hp: g.dead ? 0 : Math.round(g.hp), hp0: hp0,
           power: H.powerRatio(), reach: Game.airDefenceReach(flak.def), order: g.dead ? "-" : g.order.type, stats: Object.assign({}, stats()) };
}
function flown() {
  log("\n[10] flown: the commander at war, its gunship, a tank under a powered AA Battery it has seen");
  var on = flownScene(false), offS = flownScene(true);
  if (!on || !offS) { chk("the scenes are raised", false); return; }
  chk("aiOff \"airsafe\": sent at the tank under the Battery, and shot down", offS.sent && offS.dead,
      "sent " + offS.sent + ", " + (offS.dead ? "shot down" : "alive " + offS.hp + "/" + offS.hp0) + ", closest " + offS.minD.toFixed(1) + " tiles of the " + offS.reach + "-tile Battery (power " + offS.power.toFixed(2) + ")");
  chk("with the rule: not sent there, never within the Battery's reach, alive after 75 s", !on.sent && !on.dead && on.minD > on.reach,
      "sent " + on.sent + ", " + (on.dead ? "shot down" : "alive " + on.hp + "/" + on.hp0) + ", closest " + on.minD.toFixed(1) + ", order " + on.order + ", " + JSON.stringify(on.stats));
}

/* ---- 11. review ---- */
/* (a) a fighter hovering where it was left; the player's helicopter 12 tiles
   in from a seen SAM Site, held on the picture by a scout, placed on the
   diagonal of the square acquire() scans round the fighter */
function cornerScene() {
  if (!scene({})) return null;
  var sam = bld(H, "sam", at(0, 0)); eye(near(sam, 2));
  var fi = fly(AI.pickOf(E, "fighter") || "fighter_p", at(30, 0));
  var R0 = fi.sightR() * TT, Q = ((fi.acqReach ? fi.acqReach(R0) : R0) + Game.grid.cell) / TT;
  var k = Math.round((Q - 0.5) * 10) / 10;
  var sx = Math.round(sam.x / TT), sy = Math.round(sam.y / TT);
  var dir = (sx < Game.map.W / 2 ? 1 : -1), diy = (sy < Game.map.H / 2 ? 1 : -1);
  var hp = { x: sx + 8 * dir, y: sy + 8 * diy };
  var c = put(H, "helo_n", hp);
  moveTo(fi, { x: Math.round(hp.x + k * dir), y: Math.round(hp.y + k * diy) });
  fi.order = { type: "hover" };
  var s = spot({ x: hp.x + 2 * dir, y: hp.y + 2 * diy }); var ey = s ? put(E, AI.pickOf(E, "recon") || "recon_p", s) : null;
  tick(2);
  moveTo(fi, { x: Math.round(hp.x + k * dir), y: Math.round(hp.y + k * diy) });
  AI.airsafeOf(E).tick();
  var oldRR = fi.sightR() + CFG.CAP_RADIUS + 2;
  /* (b) thirty strikes that ran out, on ids nothing carries */
  fi.soNo = fi.soNo || new Map();
  for (var j = 0; j < 30; j++) fi.soNo.set(1e7 + j, Game.time - 1);
  var n0 = fi.soNo.size;
  AI.airsafeOf(E).tick();
  var stale = 0; fi.soNo.forEach(function (u, id) { if (id >= 1e7) stale++; });
  return { struck: !!(fi.soNo.get(c.id) > Game.time), d: tiles(fi, c), oldRR: oldRR, Q: Q, inRing: inside(c.x, c.y),
           seen: !!ey && Game.visibleTo(E, c), n0: n0, n1: fi.soNo.size, stale: stale };
}
function review() {
  log("\n[11] review: the square acquire() scans; expired strikes");
  var c = cornerScene();
  if (!c) { chk("the corner scene is raised", false); return; }
  chk("a helicopter under the ring " + c.d + " tiles off on the diagonal - beyond the old " + c.oldRR.toFixed(1) + "-tile circle, inside the " + c.Q.toFixed(1) + "-tile half-side of the square acquire() scans - is struck off",
      c.inRing && c.seen && c.d > c.oldRR && c.struck, "under the ring " + c.inRing + ", seen " + c.seen + ", struck " + c.struck);
  chk("expired strikes are dropped from the list", c.stale === 0 && c.n1 < c.n0, "list " + c.n0 + " -> " + c.n1 + ", expired left " + c.stale);
}
