/* tools/jsc/airspread_check.js - a new aircraft goes to an airbase with a
   free pad, checked on the real game under JavaScriptCore.

     python3 tools/jsc/scene3d.py tools/jsc/airspread_check.js

   (owner) "when the aircraft is over 4 in the primary airbase, then the
   aircraft should be distributed to other airbases instead of
   overstacking." game.js spawnUnit based every new airframe on the
   primary airbase whether or not it had a pad left, so a fifth jet parked
   on the fourth. Two airbases are laid down here, one made primary, and
   fighters are delivered one at a time: the first four go to the primary,
   the next four to the other base, never more than four to a base; with
   every pad taken a ninth stays on the primary, as before; and a pad freed
   on the primary is the next one filled.

   The same for the player's own order. A right-click on a friendly airbase
   with aircraft selected (ui.js issueOrderCore, the "land here" order) based
   every one of them on the base clicked, four pads or not. MEASURED here
   with the order as it was: the fighter below went onto the full primary
   as its fifth, was re-homed in flight by findPad to the free ramp nearest
   itself and landed back on its own airbase 24 tiles off, and no word said
   why; and by the time every airbase was full the orders below had based
   seven on the primary's four pads. Driven here through the page's own
   mouse handler on the real 3D view - a right-button mousedown on #cv over
   the airbase, as the browser delivers it - with a third airbase laid
   down: a fighter based elsewhere, ordered onto the full primary, is based
   on the airbase nearest the primary with a pad free (not left on its own,
   which is farther) and lands there, and the toast says so; one already
   based on the primary keeps its pad; two sent to a base with one pad left
   put one there and the other on; with every airbase full each keeps its
   own; and one whose own airbase is gone still lands on the base clicked,
   as the recovery order itself does, rather than being told the airbase
   is not a landing surface. */
var TT = 32, PASS = 0, FAIL = 0, DT = 1 / 30, H = null;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
(function () {
  if (typeof Impact3D === "undefined") return;
  var ii = Impact3D.init;
  Impact3D.init = function (T3, th, G, h) { H = h; return ii.apply(this, arguments); };
})();
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-cash", "200000"); set("opt-seed", "btest"); set("opt-fog", "0"); set("opt-3d", "1");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});
function frames(n) { for (var i = 0; i < n; i++) { Game.tick(DT); Render.draw(DT, UI.input); } }
/* a clear 3x3 plot at least `far` tiles from every point in `not` */
function plot(not, far) {
  var M = Game.map, P = Game.human, hx = (P.homeX / TT) | 0, hy = (P.homeY / TT) | 0;
  for (var r = 6; r < 90; r++) for (var a = 0; a < 48; a++) {
    var an = a / 48 * 6.283, x = (hx + Math.cos(an) * r) | 0, y = (hy + Math.sin(an) * r) | 0, ok = true;
    if (x < 4 || y < 4 || x + 6 >= M.W || y + 6 >= M.H) continue;
    for (var k = 0; k < not.length && ok; k++) if (Math.hypot(x - not[k].x, y - not[k].y) < far) ok = false;
    for (var j = -1; j <= 4 && ok; j++) for (var i = -1; i <= 4; i++)
      if (!GameMap.passable(M, x + i, y + j, "ground") || Game.tileBlocked(x + i, y + j, null)) { ok = false; break; }
    if (ok) return { x: x, y: y };
  }
  return null;
}
function gone(e, list) {
  e.dead = true;
  var i = Game.entities.indexOf(e); if (i >= 0) Game.entities.splice(i, 1);
  i = list.indexOf(e); if (i >= 0) list.splice(i, 1);
}
function run() {
  var P = Game.human;
  AI.setPeace(Game.players[1], true); Game.checkVictory = function () {};
  /* only the two airbases laid down here, and no aircraft but the ones delivered */
  P.buildings.slice().forEach(function (b) { if (b.def.id === "airbase") gone(b, P.buildings); });
  P.units.slice().forEach(function (u) { if (u.layer === "air" || u.def.cat === "aircraft") gone(u, P.units); });
  var pa = plot([], 0), pb = pa && plot([pa], 14);
  chk("two clear plots for airbases", !!pa && !!pb, pa && pb ? "(" + pa.x + "," + pa.y + ") and (" + pb.x + "," + pb.y + ")" : "none");
  if (!pa || !pb) return;
  var A = Game.placeBuilding(P, "airbase", pa.x, pa.y, true), B = Game.placeBuilding(P, "airbase", pb.x, pb.y, true);
  P.primary = P.primary || {}; P.primary.airbase = A;
  frames(2);
  var id = Game.unitOf(P, "fighter");
  chk("the army fields a fighter", !!id && !!UNITS[id], String(id));
  var on = function (b) { var n = 0; P.units.forEach(function (u) { if (!u.dead && u.padOn === b) n++; }); return n; };
  var got = [], worst = 0, at = [];
  for (var i = 0; i < 9; i++) {
    var u = Game.spawnUnit(P, id);
    got.push(u ? (u.padOn === A ? "A" : u.padOn === B ? "B" : "?") : "-");
    if (u) at.push(Math.hypot(u.x - u.padOn.x, u.y - u.padOn.y) / TT);
    if (i < 8) worst = Math.max(worst, on(A), on(B));
    if (i === 3) chk("the first four go to the primary", on(A) === 4 && on(B) === 0, got.join(""));
    if (i === 7) chk("the next four go to the other airbase, never more than four on a base",
      on(A) === 4 && on(B) === 4 && worst <= 4, got.join("") + ", most on one base " + worst);
  }
  chk("each is delivered at the base it is assigned to", at.length === 9 && at.every(function (d) { return d < 3; }),
      at.map(function (d) { return d.toFixed(1); }).join(" "));
  chk("with every pad taken a ninth stays on the primary, as before", got[8] === "A", got.join(""));
  /* a pad freed on the primary is the next one filled */
  var ninth = P.units.filter(function (u) { return !u.dead && u.padOn === A; });
  gone(ninth[ninth.length - 1], P.units); gone(ninth[ninth.length - 2], P.units);
  var next = Game.spawnUnit(P, id);
  chk("a pad freed on the primary is the next one filled", !!next && next.padOn === A && on(A) === 4,
      next ? (next.padOn === A ? "A" : "B") + ", " + on(A) + " on A" : "none");

  /* ---- the right-click "land here" order ----
     a third airbase, and the two that are not the primary named by how far
     they stand from it: NEAR is where a full primary's overflow belongs, FAR
     is where the aircraft ordered onto the primary is based */
  P.units.slice().forEach(function (u) { if (u.layer === "air" || u.def.cat === "aircraft") gone(u, P.units); });
  var pc = plot([pa, pb], 24) || plot([pa, pb], 14);
  chk("a clear plot for a third airbase", !!pc, pc ? "(" + pc.x + "," + pc.y + ")" : "none");
  if (!pc) return;
  var C = Game.placeBuilding(P, "airbase", pc.x, pc.y, true);
  frames(2);
  var dB = Math.hypot(B.x - A.x, B.y - A.y), dC = Math.hypot(C.x - A.x, C.y - A.y);
  var NEAR = dB <= dC ? B : C, FAR = dB <= dC ? C : B;
  var nm = function (b) { return b === A ? "A" : b === NEAR ? "NEAR" : b === FAR ? "FAR" : b ? (b.dead ? "a lost base" : "?") : "none"; };
  var deliver = function (b, n) {
    var keep = P.primary.airbase, out = [];
    P.primary.airbase = b;
    for (var k = 0; k < n; k++) { var u = Game.spawnUnit(P, id); if (u) out.push(u); }
    P.primary.airbase = keep;
    return out;
  };
  var based = function (b) { return P.units.filter(function (u) { return !u.dead && u.padOn === b; }); };
  /* select `us` and right-click the middle of airbase `b` through the
     canvas's own mousedown handler; returns the toast that order raised */
  var order = function (us, b) {
    var s = UI.selection; for (var i = 0; i < s.length; i++) s[i].selected = false; s.length = 0;
    us.forEach(function (u) { u.selected = true; s.push(u); });
    Render.setCam(b.x, b.y); Render.draw(DT, UI.input);
    var at = Render.entityScreen ? Render.entityScreen(b) : { x: Render.sx(b.x, b.y), y: Render.sy(b.x, b.y) };
    var cv = document.getElementById("cv"), rc = cv.getBoundingClientRect();
    var box = document.getElementById("alerts"), n0 = box ? box.children.length : 0;
    cv.dispatchEvent({ type: "mousedown", button: 2, clientX: rc.left + at.x, clientY: rc.top + at.y - 8,
                       shiftKey: false, ctrlKey: false, metaKey: false });
    return box && box.children.length > n0 ? String(box.children[box.children.length - 1].textContent) : "";
  };
  var full = deliver(A, 4), fifth = deliver(FAR, 1)[0];
  chk("the primary full and a fifth fighter based on the farther airbase",
      based(A).length === 4 && !!fifth && fifth.padOn === FAR && based(NEAR).length === 0,
      based(A).length + " on A, the fifth on " + nm(fifth && fifth.padOn) + ", " + based(NEAR).length + " on NEAR");
  if (!fifth) return;

  /* 1. ordered onto the full primary: based on the nearest airbase with a pad
     free - not its own, which stands farther off - and the toast says so */
  var said = order([fifth], A);
  chk("a fighter based elsewhere, ordered onto the full primary, is based on the nearest airbase with a pad free",
      fifth.padOn === NEAR && fifth.order.type === "rtb" && based(A).length === 4,
      "based on " + nm(fifth.padOn) + ", order " + fifth.order.type + ", " + based(A).length + " on A (NEAR " +
      (Math.min(dB, dC) / TT).toFixed(1) + " tiles from A, FAR " + (Math.max(dB, dC) / TT).toFixed(1) + ")");
  chk("and the toast says the airbase is full and where it went",
      said.indexOf("AIRBASE FULL, 1 TO ANOTHER AIRBASE") >= 0, JSON.stringify(said));
  var landed = false;
  for (var s = 0; s < Math.round(90 / DT) && !landed; s++) {
    Game.tick(DT);
    landed = fifth.parked && fifth.padOn === NEAR && Math.hypot(fifth.x - NEAR.x, fifth.y - NEAR.y) < 3 * TT;
  }
  chk("and it lands there", landed && based(A).length === 4,
      "parked " + fifth.parked + " on " + nm(fifth.padOn) + ", " +
      (Math.hypot(fifth.x - NEAR.x, fifth.y - NEAR.y) / TT).toFixed(1) + " tiles from NEAR, " + based(A).length + " on A");

  /* 2. one already based on the primary keeps its pad there */
  var own = full[0];
  said = order([own], A);
  chk("one already based on the full primary, ordered onto it, keeps its pad there",
      own.padOn === A && own.order.type === "rtb" && based(A).length === 4 && said.indexOf("AIRBASE FULL") < 0,
      "based on " + nm(own.padOn) + ", order " + own.order.type + ", " + based(A).length + " on A, " + JSON.stringify(said));

  /* 3. two sent to a base with one pad left: one lands there, one goes on */
  gone(full[3], P.units);
  var two = deliver(FAR, 2);
  said = order(two, A);
  var toA = two.filter(function (u) { return u.padOn === A; }).length, toN = two.filter(function (u) { return u.padOn === NEAR; }).length;
  chk("two ordered onto the primary with one pad left: one is based there and the other on the nearest airbase with room",
      two.length === 2 && toA === 1 && toN === 1 && based(A).length === 4 &&
      two.every(function (u) { return u.order.type === "rtb"; }) &&
      said.indexOf("2 AIRCRAFT RETURNING TO BASE") >= 0 && said.indexOf("AIRBASE FULL, 1 TO ANOTHER AIRBASE") >= 0,
      toA + " to A, " + toN + " to NEAR, " + based(A).length + " on A, " + JSON.stringify(said));

  /* 4. every airbase full: each keeps the base it has, and the toast still
     says why neither went where it was sent */
  deliver(NEAR, 4 - based(NEAR).length); deliver(FAR, 4 - based(FAR).length);
  var fromN = based(NEAR)[0], fromF = based(FAR)[0];
  said = order([fromN, fromF], A);
  chk("with every airbase full, each one ordered onto the primary keeps its own base",
      based(A).length === 4 && based(NEAR).length === 4 && based(FAR).length === 4 &&
      fromN.padOn === NEAR && fromF.padOn === FAR && fromN.order.type === "rtb" && fromF.order.type === "rtb" &&
      said.indexOf("AIRBASE FULL, 2 TO ANOTHER AIRBASE") >= 0,
      "A " + based(A).length + ", NEAR " + based(NEAR).length + ", FAR " + based(FAR).length + "; the two on " +
      nm(fromN.padOn) + " and " + nm(fromF.padOn) + ", " + JSON.stringify(said));

  /* 5. every airbase full and its own one lost: it lands on the base clicked
     (an over-stacked revetment beats orbiting until the tanks are dry, as
     the recovery order itself says), not a move with "not a landing surface" */
  var lost = based(FAR).filter(function (u) { return u !== fromF; })[0];
  gone(FAR, P.buildings);
  said = order([lost], A);
  chk("with every airbase full and its own one lost, one ordered onto the primary still lands there",
      lost.padOn === A && lost.order.type === "rtb" && said.indexOf("NOT A LANDING SURFACE") < 0,
      "based on " + nm(lost.padOn) + ", order " + lost.order.type + ", " + JSON.stringify(said));
}
