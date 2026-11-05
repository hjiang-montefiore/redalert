/* tools/jsc/aar_check.js - AIR-TO-AIR REFUELLING: boom and drogue, who fits
   which, and both aircraft flying while the fuel moves - checked on the real
   game (and the real 3D renderer) under JavaScriptCore.

     python3 tools/jsc/scene3d.py tools/jsc/aar_check.js --limit 3000

   (owner) "Yes [to visible refuelling and to boom/probe compatibility].
   Fueling two aircraft should fly as well, not static." js/aar_specs.js is
   the data, entities.js AIR-TO-AIR REFUELLING the stations and the flying,
   render3d.js drawAAR the boom and the hoses.
   Checked:
     0. the data: every tanker row has its stations, every refuelable jet a
        receiver type, and a jet that never had a probe (the J-6) is not
        refuelable;
     1. a probe jet is never given a boom-only tanker (the KC-97G), a
        receptacle jet is; a KC-135R's boom drogue adapter takes a probe;
     2. two probe jets on a two-pod tanker (the H-6U) take fuel at the same
        time, from the two pods, side by side and not on top of each other;
     3. both keep FLYING while in contact: every tick in contact moves them,
        their headings follow the tanker's, and nothing is snapped onto the
        slot (the step a tick is never more than their own speed allows);
     4. a boom-only tanker (the KC-135R) serves one receptacle jet at a time,
        the other waiting off its wing, and both end up topped up;
     5. the offload: what left the tanker is what the receivers took, never
        faster than refuelRate per station, and TOPPED UP hands back `then`;
     6. the tanker flies its racetrack, never turning faster than the cap;
     7. drawn: the boom and the hoses come out to the receivers and go back
        in when no one is on them. */
var TT = 32, PASS = 0, FAIL = 0, DT = 1 / 30;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-cash", "200000"); set("opt-seed", "aartest"); set("opt-fog", "0"); set("opt-3d", "1");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

var P, M, SAID = [];
function hearAlerts() { var a0 = Game.alert; Game.alert = function (m) { SAID.push({ t: Game.time, m: String(m) }); return a0.apply(this, arguments); }; }
function gone(u) {
  if (!u) return; u.dead = true;
  var i = Game.entities.indexOf(u); if (i >= 0) Game.entities.splice(i, 1);
  var l = u.owner && (u.kind === "building" ? u.owner.buildings : u.owner.units);
  if (l) { i = l.indexOf(u); if (i >= 0) l.splice(i, 1); }
}
function durable(u) { u.maxHp = u.hp = 1e6; return u; }
function tiles(px) { return (px / TT).toFixed(2); }
function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
function angD(a, b) { var d = a - b; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return d; }
var CX, CY, ALL = [];
function air(id, x, y, fuelK) {
  var u = durable(Game.spawnUnitAt(P, id, x, y));
  u.x = x; u.y = y; u.parked = false; u.stance = "hold";
  u.fuel = u.fuelMax * (fuelK === undefined ? 1 : fuelK);
  ALL.push(u);
  return u;
}
function clear() { ALL.forEach(gone); ALL = []; }
function tanker(id) {
  var t = air(id, CX, CY, 1);
  t.order = { type: "cap", x: CX, y: CY };
  t.ang = 0;
  return t;
}
/* ticks with a per-tick callback; returns the number run */
function ticks(sec, each, stop) {
  var n = Math.round(sec / DT);
  for (var i = 0; i < n; i++) {
    Game.tick(DT);
    if (each) each(i);
    if (stop && stop()) return i + 1;
  }
  return n;
}
/* the station a receiver holds on t, or -1 */
function stOf(t, r) { if (!t.aar) return -1; for (var i = 0; i < t.aar.st.length; i++) if (t.aar.st[i].who === r) return i; return -1; }
function inContact(t, r) {
  var i = stOf(t, r);
  if (i < 0 || t.aar.st[i].ext < 1) return false;
  var P2 = t.aarSlot(r, i, {});
  return Math.hypot(r.x - P2.cx, r.y - P2.cy) <= TT * AirRefuel.TOL;
}

/* the fuel ledger, tick by tick: what left the tanker against what the
   receivers gained plus what they burned on those ticks (their burn is the
   loss they show on a tick they take nothing, airBurn) */
function ledger(t, rs) {
  var L = { gave: 0, took: 0, last: t.offload, f: rs.map(function (r) { return r.fuel; }), full: rs.map(function () { return -1; }) };
  L.step = function () {
    var dOff = L.last - t.offload;
    L.last = t.offload;
    rs.forEach(function (r, i) {
      var d = r.fuel - L.f[i];
      L.f[i] = r.fuel;
      if (dOff > 0 && d > 0) L.took += d + r.airBurn() * ((FACTIONS[r.owner.faction] || {}).fuelMul || 1) * DT;
      if (L.full[i] < 0 && r.order.type !== "tank") L.full[i] = r.fuel;
    });
    if (dOff > 0) L.gave += dOff;
  };
  return L;
}
function run() {
  P = Game.human; M = Game.map;
  Game.players.forEach(function (p) { if (p !== P && p.isAI) AI.setPeace(p, true); });
  Game.checkVictory = function () {};
  hearAlerts();
  /* the middle of the map, well clear of every edge */
  CX = M.W * TT * 0.5; CY = M.H * TT * 0.5;
  Game.players.forEach(function (p) {
    if (p === P) return;
    p.units.slice().forEach(function (u) { if (Math.hypot(u.x - CX, u.y - CY) < 60 * TT) gone(u); });
    p.buildings.slice().forEach(function (b) { if (Math.hypot(b.x - CX, b.y - CY) < 60 * TT) gone(b); });
  });
  [secData, secCompat, secTwoPods, secBoom, secDrawn].forEach(function (f) {
    try { f(); } catch (e) { FAIL++; log("  FAIL  " + f.name + " crashed   -- " + e + " " + String(e.stack || "").split("\n").slice(0, 3).join(" | ")); }
    clear();
  });
}

/* ---- 0. the data ---- */
function secData() {
  log("\n[0] every tanker row has its stations, every refuelable jet a receiver type");
  var tk = [], noSt = [], noRecv = [], nRecv = 0;
  for (var id in UNITS) {
    var d = UNITS[id];
    if (d.tanker) { tk.push(id); if (!d.aarSt || !d.aar) noSt.push(id); }
    if (d.refuelable) { nRecv++; if (!d.aarRecv) noRecv.push(id); }
  }
  chk("every tanker row says boom, drogue or both, and which stations", tk.length >= 20 && !noSt.length,
      tk.length + " tankers" + (noSt.length ? "; missing: " + noSt.join(",") : ""));
  chk("every refuelable jet says receptacle, probe or both", nRecv > 100 && !noRecv.length,
      nRecv + " receivers" + (noRecv.length ? "; missing: " + noRecv.join(",") : ""));
  chk("a jet that never had a probe (the J-6, the MiG-21bis, the Tu-22M3 after SALT II) is not refuelable",
      !UNITS.pla_e60_fighter.refuelable && !UNITS.fighter_k.refuelable && !UNITS.pact_e80_heavybomber.refuelable,
      "J-6 " + !!UNITS.pla_e60_fighter.refuelable + ", MiG-21bis " + !!UNITS.fighter_k.refuelable + ", Tu-22M3 " + !!UNITS.pact_e80_heavybomber.refuelable);
  chk("the USAF types carry a receptacle, the Navy's a probe", UNITS.fighter_n.aarRecv === "receptacle" &&
      UNITS.nato_e80_fighter.aarRecv === "receptacle" && UNITS.cfighter_n.aarRecv === "probe" && UNITS.nato_e80_cfighter.aarRecv === "probe",
      "F-16C " + UNITS.fighter_n.aarRecv + ", F-15C " + UNITS.nato_e80_fighter.aarRecv + ", F/A-18E " + UNITS.cfighter_n.aarRecv + ", F-14A " + UNITS.nato_e80_cfighter.aarRecv);
  chk("KC-97G boom only; H-6U two wing pods; Il-78 three; KC-46 both", UNITS.nato_e50_tanker.aar === "boom" && !UNITS.nato_e50_tanker.aarBda &&
      UNITS.pla_e90_tanker.aarSt.join() === "pod_l,pod_r" && UNITS.tanker_p.aarSt.length === 3 && UNITS.tanker_n.aar === "both",
      "KC-97G " + UNITS.nato_e50_tanker.aarSt + ", H-6U " + UNITS.pla_e90_tanker.aarSt + ", Il-78 " + UNITS.tanker_p.aarSt + ", KC-46 " + UNITS.tanker_n.aarSt);
}

/* ---- 1. compatibility ---- */
function secCompat() {
  log("\n[1] a probe jet is not given a boom-only tanker; a receptacle jet is; a BDA boom takes a probe");
  var t = tanker("nato_e50_tanker");
  var fa18 = air("cfighter_n", CX - 20 * TT, CY, 0.5), f16 = air("fighter_n", CX - 20 * TT, CY + 2 * TT, 0.5);
  fa18.order = { type: "cap", x: fa18.x, y: fa18.y }; f16.order = { type: "cap", x: f16.x, y: f16.y };
  chk("an F/A-18E (probe) finds no tanker in a sky holding only a KC-97G (boom)", Game.nearestTanker(fa18) === null,
      String(Game.nearestTanker(fa18) && Game.nearestTanker(fa18).def.id));
  chk("an F-16C (receptacle) is given the KC-97G", Game.nearestTanker(f16) === t, String(Game.nearestTanker(f16) && Game.nearestTanker(f16).def.id));
  /* the break-off itself: fuel under bingo with ordnance aboard sends the
     F/A-18 home, not to the boom it cannot use */
  fa18.fuel = fa18.fuelMax * 0.3; f16.fuel = f16.fuelMax * 0.3;
  ticks(0.2);
  chk("at bingo the F/A-18E goes home, the F-16C to the KC-97G", fa18.order.type !== "tank" && f16.order.type === "tank" && f16.order.target === t,
      "F/A-18E " + fa18.order.type + ", F-16C " + f16.order.type);
  gone(t);
  var r = tanker("nato_e90_tanker");
  chk("a KC-135R's boom drogue adapter takes the probe jet", Game.nearestTanker(fa18) === r, String(Game.nearestTanker(fa18) && Game.nearestTanker(fa18).def.id));
}

/* ---- 2, 3, 5, 6: two probe jets on the H-6U's two pods ---- */
function secTwoPods() {
  log("\n[2] two probe jets on a two-pod tanker (H-6U) refuel at the same time, side by side - and keep flying");
  var t = tanker("pla_e90_tanker");
  var A = air("cfighter_n", CX - 14 * TT, CY - 3 * TT, 0.45), B = air("cfighter_n", CX - 15 * TT, CY + 4 * TT, 0.45);
  var thenA = { type: "cap", x: CX + 30 * TT, y: CY };
  A.order = { type: "tank", target: t, then: thenA }; B.order = { type: "tank", target: t };
  A.ang = B.ang = 0;
  var off0 = t.offload, fuel0 = A.fuel + B.fuel, both = 0, sep = Infinity, sepMax = 0, sameSt = false;
  var steps = 0, frozen = 0, moved = 0, teleport = 0, hdgWorst = 0, fastStep = 0, fastRate = 0, contactT = 0;
  var last = { A: { x: A.x, y: A.y, f: A.fuel }, B: { x: B.x, y: B.y, f: B.fuel } };
  var tWorst = 0, tAng = t.ang, tBusy = 0, tMoved = 0, tx = t.x, ty = t.y, wasBusy = false;
  var doneA = -1, atC = {}, LG = ledger(t, [A, B]);
  ticks(90, function (i) {
    LG.step();
    var inA = inContact(t, A) && A.order.type === "tank", inB = inContact(t, B) && B.order.type === "tank";
    if (inA && atC.A === undefined) atC.A = last.A.f;
    if (inB && atC.B === undefined) atC.B = last.B.f;
    var gA = A.fuel - last.A.f, gB = B.fuel - last.B.f;
    [[A, last.A, inA, gA], [B, last.B, inB, gB]].forEach(function (q) {
      var u = q[0], L = q[1], step = Math.hypot(u.x - L.x, u.y - L.y);
      if (step > u.def.speed * u.speedMul() * TT * DT * 1.01 + 0.01) teleport++;
      if (q[2]) {
        steps++; contactT += DT;
        if (step < 0.5) frozen++; else moved += step;
        hdgWorst = Math.max(hdgWorst, Math.abs(angD(u.ang, t.ang)));
        if (q[3] > t.def.refuelRate * DT + 1e-6) fastRate++;
      }
      L.x = u.x; L.y = u.y; L.f = u.fuel;
    });
    if (inA && inB && gA > 0 && gB > 0) {
      both++;
      var s = dist(A, B); sep = Math.min(sep, s); sepMax = Math.max(sepMax, s);
      if (stOf(t, A) === stOf(t, B)) sameSt = true;
    }
    if (t.aarBusy) {
      tBusy++;
      if (wasBusy) tWorst = Math.max(tWorst, Math.abs(angD(t.ang, tAng)) / DT);
      tMoved += Math.hypot(t.x - tx, t.y - ty);
    }
    tAng = t.ang; tx = t.x; ty = t.y; wasBusy = !!t.aarBusy;
    if (doneA < 0 && A.order.type !== "tank") doneA = Game.time;
  }, function () { return A.order.type !== "tank" && B.order.type !== "tank"; });
  var Lr = AirRefuel.drawLen(A.def);
  chk("both took fuel AT THE SAME TIME, for " + (both * DT).toFixed(1) + " s", both * DT > 1.0, both + " ticks with both in contact and both gaining");
  chk("from different stations - the two wing pods", !sameSt && both > 0,
      both ? "stations " + t.aar.st.map(function (s) { return s.k; }).join(",") : "never both");
  chk("side by side and not on top of each other: more than a wingspan apart", sep > Lr * 0.7 && isFinite(sep),
      "closest " + tiles(sep) + " tiles, widest " + tiles(sepMax) + "; drawn length " + tiles(Lr));
  log("\n[3] in contact the receivers FLY: they move every tick, hold the tanker's heading, and are never snapped");
  chk("every tick in contact they moved (" + steps + " receiver-ticks)", steps > 30 && frozen === 0,
      frozen + " ticks still; " + tiles(moved) + " tiles flown in " + contactT.toFixed(1) + " s of contact");
  chk("their heading follows the tanker's", hdgWorst < 0.35, "worst " + (hdgWorst * 57.3).toFixed(1) + " deg off the tanker's");
  chk("never moved faster than they can fly (no lerp, no teleport)", teleport === 0, teleport + " steps over the airframe's own speed");
  log("\n[5] the offload, and the hand-back");
  chk("what left the tanker is exactly what the receivers took", LG.gave > 50 && Math.abs(LG.gave - LG.took) < 0.5 &&
      Math.abs((off0 - t.offload) - LG.gave) < 1e-6,
      "offload " + off0.toFixed(1) + " -> " + t.offload.toFixed(1) + " (" + LG.gave.toFixed(2) + " given), " +
      LG.took.toFixed(2) + " taken (gain plus burn on the hoses)");
  chk("never faster than refuelRate per station (" + t.def.refuelRate + "/s)", fastRate === 0, fastRate + " ticks over");
  chk("TOPPED UP, and the order it carried in is what it flies next", doneA > 0 && A.order === thenA && SAID.some(function (a) { return /TOPPED UP/.test(a.m); }),
      "A now " + A.order.type + (doneA > 0 ? " at t=" + doneA.toFixed(1) : ""));
  log("\n[6] the tanker flies its own track, turning no harder than the racetrack allows");
  chk("busy, it moved the whole time", tBusy > 30 && tMoved > tBusy * t.def.speed * TT * DT * 0.5,
      tiles(tMoved) + " tiles in " + (tBusy * DT).toFixed(1) + " s busy");
  chk("and never turned faster than " + AirRefuel.TURN + " rad/s", tWorst <= AirRefuel.TURN * 1.02, "worst " + tWorst.toFixed(3) + " rad/s");
}

/* ---- 4. one at a time on a boom ---- */
function secBoom() {
  log("\n[4] a boom-only tanker (KC-135R) serves one receptacle jet at a time; the other waits off the wing");
  var t = tanker("nato_e90_tanker");
  var A = air("fighter_n", CX - 12 * TT, CY - 2 * TT, 0.42), B = air("fighter_n", CX - 13 * TT, CY + 3 * TT, 0.42);
  A.ang = B.ang = 0;
  A.order = { type: "tank", target: t }; B.order = { type: "tank", target: t };
  var both = 0, onlyA = 0, onlyB = 0, waitD = 0, la = A.fuel, lb = B.fuel, off0 = t.offload, f0 = A.fuel + B.fuel;
  var first = null, second = null, LB = ledger(t, [A, B]);
  ticks(120, function () {
    LB.step();
    var gA = A.order.type === "tank" && A.fuel - la > 1e-9, gB = B.order.type === "tank" && B.fuel - lb > 1e-9;
    if (gA && gB) both++;
    if (gA && !gB) onlyA++;
    if (gB && !gA) onlyB++;
    if ((gA || gB) && !first) first = gA ? A : B;
    if (first && !second && ((first === A && gB) || (first === B && gA))) second = first === A ? B : A;
    if (first && !second) {
      var w = first === A ? B : A;
      if (w.order.type === "tank" && stOf(t, w) < 0) waitD = Math.max(waitD, dist(w, t));
    }
    la = A.fuel; lb = B.fuel;
  }, function () { return A.order.type !== "tank" && B.order.type !== "tank"; });
  chk("never two on the boom at once", both === 0, both + " ticks with both gaining");
  chk("one, then the other: both took fuel in turn", onlyA > 10 && onlyB > 10 && !!second,
      (onlyA * DT).toFixed(1) + " s and " + (onlyB * DT).toFixed(1) + " s on the boom");
  chk("the second waited off the wing, beside the tanker", waitD > 0 && waitD < 6 * TT, "out to " + tiles(waitD) + " tiles from it");
  chk("both topped up when they left", LB.full[0] >= A.fuelMax - 1 && LB.full[1] >= B.fuelMax - 1,
      LB.full[0].toFixed(1) + " / " + LB.full[1].toFixed(1));
  chk("and the one shared offload paid for both, unit for unit", LB.gave > 50 && Math.abs(LB.gave - LB.took) < 0.5 &&
      Math.abs((off0 - t.offload) - LB.gave) < 1e-6,
      LB.gave.toFixed(2) + " given, " + LB.took.toFixed(2) + " taken");
}

/* ---- 7. drawn ---- */
function secDrawn() {
  log("\n[7] drawn: the boom and the hoses run out to the receivers and stow when no one is on them");
  if (typeof Render === "undefined" || !Render.aarDebug) { chk("the renderer reports its refuelling gear", false, "no Render.aarDebug"); return; }
  var t = tanker("tanker_n");
  var A = air("fighter_n", CX - 8 * TT, CY - 1 * TT, 0.42), B = air("cfighter_n", CX - 9 * TT, CY + 2 * TT, 0.42);
  A.ang = B.ang = 0;
  A.order = { type: "tank", target: t }; B.order = { type: "tank", target: t };
  Render.setCam(t.x, t.y);
  var outBoom = 0, outHose = 0, gap = 0, gapK = "", n = 0;
  ticks(25, function (i) {
    if (i % 3) return;
    Render.setCam(t.x, t.y);
    Render.draw(DT * 3, UI.input);
    var D = Render.aarDebug(t);
    if (!D) return;
    D.forEach(function (s, si) {
      if (s.ext < 1 || !s.to) return;
      if (s.k === "boom") outBoom++; else outHose++;
      /* the end on the receiver: measured while the game has it in contact */
      var w = t.aar.st[si].who;
      if (!w || !inContact(t, w)) return;
      n++;
      if (s.gap > gap) { gap = s.gap; gapK = s.k; }
    });
  }, function () { return A.order.type !== "tank" && B.order.type !== "tank"; });
  chk("the boom came out to the F-16C and a hose to the F/A-18E", outBoom > 0 && outHose > 0, outBoom + " boom frames, " + outHose + " hose frames");
  chk("in contact, each ends at the receiver's receptacle or probe", n > 0 && gap < 1.0, n + " frames in contact; worst gap " + gap.toFixed(2) + " m" + (gapK ? " (" + gapK + ")" : ""));
  ticks(6, function (i) { if (i % 3 === 0) { Render.setCam(t.x, t.y); Render.draw(DT * 3, UI.input); } });
  var D2 = Render.aarDebug(t) || [];
  chk("and with no one on them everything is stowed", D2.length > 0 && D2.every(function (s) { return s.ext === 0 && !s.visible; }),
      D2.map(function (s) { return s.k + " " + s.ext.toFixed(2) + (s.visible ? " shown" : ""); }).join(", "));
}
