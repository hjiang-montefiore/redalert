/* tools/jsc/airbase_runway_check.js - the runway airbase's ground: its
   footprint, its level, its revetments.

     python3 tools/jsc/run.py index.html --test tools/jsc/airbase_runway_check.js

   (owner, 2026-10-23) "the airport model should be re-design and we should
   see the aircraft taking off and landing and then put the base". Piece 2 of
   _keep/airbase_study/PLAN.md: the airbase is 12 x 4 tiles, a runway along
   the south side and four revetments along the north (rules.js airbase
   padPts, padAng, runway). Aircraft still come and go vertically; the roll
   is a later piece. Held here:
     [1] the def: 12 x 4, four revetments inside the plot and clear of the
         runway, the runway inside the plot; the 3 x 3 of older saves keeps
         none of it (BUILDING_LEGACY airbase3);
     [2] G.canPlace takes it on one elevation level and refuses it across a
         step;
     [3] placed, it holds its 48 tiles;
     [4] four aircraft each stand in a revetment of their own, at its point,
         nose to the runway;
     [5] one leaving does not move the others, and coming home it lands in
         the revetment it had, straight onto its point;
     [6] a fifth stands on the open ground at the runway's west end;
     [7] the commander finds ground for one: the AI's own placement, run on
         this map (findRunwaySpot through the ordinary build queue);
     [8] one away while another is delivered into its revetment comes home
         to a free one and stays down, and nobody moves (the review of
         d6d31a1: it used to be bounced back into the air);
     [9] an enemy's base is in sight where any of it is (G.fogAt), and its
         edge is its footprint's (Building.edge), not a circle's. */
var TT = 32, DT = 1 / 30, PASS = 0, FAIL = 0, P = null, E = null;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "fulda"); set("opt-era", "e20"); set("opt-aera", "e20"); set("opt-fac", "nato");
  set("opt-cash", "200000"); set("opt-seed", "abrunway"); set("opt-fog", "1"); set("opt-3d", "0");
  set("opt-weather", "clear");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});
function f1(v) { return (+v).toFixed(1); }
function ticks(n, stop) { for (var i = 0; i < n; i++) { Game.tick(DT); if (stop && stop()) return i + 1; } return n; }
function cells(b) { var n = 0; for (var i = 0; i < Game.occ.length; i++) if (Game.occ[i] === b.id) n++; return n; }
/* a 12 x 4 near home that G.canPlace takes but for its level rule, on one
   level - or, step: true, across a step. The rule's own answer with the
   runway taken off the def is the "but for": so a refusal of the stepped
   one is the level rule's and nothing else's. */
function spot(p, step, avoid) {
  var M = Game.map, W = M.W, hx = (p.homeX / TT) | 0, hy = (p.homeY / TT) | 0, D = BUILDINGS.airbase, w = D.w, h = D.h;
  for (var r = 4; r < 60; r++) for (var a = 0; a < 96; a++) {
    var an = a / 96 * 6.283, x = (hx + Math.cos(an) * r) | 0, y = (hy + Math.sin(an) * r) | 0;
    if (x < 2 || y < 2 || x + w + 2 >= W || y + h + 2 >= M.H) continue;
    if (avoid && Math.hypot(x - avoid.homeX / TT, y - avoid.homeY / TT) < 40) continue;
    var lv = {}, nl = 0;
    for (var j = 0; j < h; j++) for (var i = 0; i < w; i++) {
      var k = (y + j) * W + x + i;
      if (!lv[M.elev[k]]) { lv[M.elev[k]] = 1; nl++; }
    }
    if (step ? nl < 2 : nl !== 1) continue;
    var R = D.runway; D.runway = null;
    var but = Game.canPlace(p, "airbase", x, y);
    D.runway = R;
    if (but) return { x: x, y: y };
  }
  return null;
}

function run() {
  P = Game.human;
  E = Game.players.filter(function (p) { return p !== P && !Game.allied(P, p); })[0];
  AI.setPeace(E, true); Game.checkVictory = function () {};
  var D = BUILDINGS.airbase, L = bldDefOf("airbase3");

  /* ---------------- 1. the def ---------------- */
  var R = D.runway || {}, pts = D.padPts || [];
  var inPlot = pts.every(function (q) { return q[0] > 0 && q[0] < D.w && q[1] > 0 && q[1] < D.h; });
  var offRw = pts.every(function (q) { return q[1] < R.y - R.half; });
  chk("[1] the airbase is 12 x 4: four revetments in the plot, north of the runway, the runway in the plot",
      D.w === 12 && D.h === 4 && D.pads === 4 && pts.length === 4 && inPlot && offRw &&
      R.y - R.half >= 0 && R.y + R.half <= D.h && R.x0 >= 0 && R.x1 <= D.w && Math.abs(D.padAng - Math.PI / 2) < 1e-9,
      D.w + " x " + D.h + ", pads " + JSON.stringify(pts) + ", runway row " + R.y + " +- " + R.half);
  chk("[1] the 3 x 3 of older saves has none of it", !!L && L.w === 3 && L.padPts === null && L.runway === null && L.padAng === null && !L.bare);

  /* ---------------- 2. one level ---------------- */
  var lv = spot(P, false, E), st = spot(P, true, E);
  chk("[2] canPlace takes it on one elevation level", !!lv && Game.canPlace(P, "airbase", lv.x, lv.y), lv ? lv.x + "," + lv.y : "no level 12 x 4 near home");
  chk("[2] ...and refuses it across a step it would otherwise take", !!st && !Game.canPlace(P, "airbase", st.x, st.y),
      st ? st.x + "," + st.y + " has two levels" : "no stepped 12 x 4 near home it would otherwise take");

  /* ---------------- 3. placed ---------------- */
  var a = lv ? Game.placeBuilding(P, "airbase", lv.x, lv.y, true) : null;
  chk("[3] placed, it holds its 48 tiles and is an airbase", !!a && cells(a) === 48 && P.hasBuilding("airbase") && a.def === D,
      a ? cells(a) + " tiles" : "not placed");
  if (!a) return;

  /* ---------------- 4. four in their revetments ---------------- */
  var fid = unitFor("nato", "fighter", "e20");
  var four = [0, 1, 2, 3].map(function () { return Game.spawnUnit(P, fid); });
  ticks(3);
  var spots = four.map(function (u) { return u ? u.bay : -1; });
  var atPts = four.every(function (u) { if (!u) return false; var q = a.padPoint(u.bay); return u.parked && Math.abs(u.x - q.x) < 0.5 && Math.abs(u.y - q.y) < 0.5 && Math.abs(u.ang - Math.PI / 2) < 1e-6; });
  var distinct = spots.slice().sort().join() === "0,1,2,3";
  chk("[4] four fighters each stand in a revetment of their own, at its point, nose to the runway",
      atPts && distinct, "bays " + spots.join(","));

  /* ---------------- 5. one leaves and comes home ---------------- */
  var w = four[1], others = [four[0], four[2], four[3]], before = others.map(function (u) { return u.x + "," + u.y; }).join(" ");
  w.parked = false; w.order = { type: "move", x: a.x, y: a.y - 25 * TT }; w.moving = true;
  ticks(6 * 30);
  var after = others.map(function (u) { return u.x + "," + u.y; }).join(" ");
  chk("[5] one taking off does not move the others along a bay", before === after && !w.parked, "away " + f1(Math.hypot(w.x - a.x, w.y - a.y) / TT) + " tiles");
  w.order = { type: "rtb" };
  var n = ticks(120 * 30, function () { return w.order && w.order.type === "parked"; });
  var q1 = a.padPoint(1);
  chk("[5] coming home it lands in the revetment it had, on its point",
      w.parked && w.bay === 1 && Math.abs(w.x - q1.x) < 0.5 && Math.abs(w.y - q1.y) < 0.5,
      f1(n / 30) + " s, bay " + w.bay + ", " + f1(Math.hypot(w.x - q1.x, w.y - q1.y)) + " px off it");

  /* ---------------- 6. a fifth ---------------- */
  var fifth = Game.spawnUnit(P, fid);
  ticks(3);
  var q4 = a.padPoint(4), rw = a.ty * TT + (D.runway.y - D.runway.half) * TT;
  chk("[6] a fifth stands at the runway's west end, on its north edge, inside the plot",
      !!fifth && fifth.bay === 4 && Math.abs(fifth.x - q4.x) < 0.5 && Math.abs(fifth.y - q4.y) < 0.5 &&
      fifth.x > a.tx * TT && fifth.x < a.x && fifth.y > rw && fifth.y < a.ty * TT + D.h * TT,
      fifth ? "bay " + fifth.bay + " at " + f1(fifth.x / TT - a.tx) + "," + f1(fifth.y / TT - a.ty) + " tiles in" : "none");
  [four[0], four[1], four[2], four[3], fifth].forEach(function (u) { if (u && !u.dead) { u.hp = 0; u.dead = true; } });
  Game.sweepDead();

  /* ---------------- 8. a bay taken while it was away ---------------- */
  var A8 = Game.spawnUnit(P, fid), B8 = Game.spawnUnit(P, fid);
  ticks(3);
  A8.parked = false; A8.order = { type: "move", x: a.x, y: a.y - 25 * TT }; A8.moving = true;
  ticks(5 * 30);
  var C8 = Game.spawnUnit(P, fid);
  ticks(3);
  var cBay = C8 ? C8.bay : -1, bounced = 0, wasDown = false;
  A8.order = { type: "rtb" };
  var n8 = ticks(120 * 30, function () {
    if (A8.order && A8.order.down) wasDown = true;
    if (wasDown && A8.order && A8.order.type === "rtb" && !A8.order.down) bounced++;
    return A8.order && A8.order.type === "parked";
  });
  ticks(5 * 30);
  var qa = a.padPoint(A8.bay), qc = C8 ? a.padPoint(C8.bay) : null;
  chk("[8] home to a base where its revetment was given away meanwhile, it lands in a free one and stays down; nobody moves",
      A8.parked && !bounced && C8 && C8.bay === cBay && A8.bay !== cBay && A8.bay !== B8.bay &&
      Math.abs(A8.x - qa.x) < 0.5 && Math.abs(C8.x - qc.x) < 0.5,
      f1(n8 / 30) + " s, A bay " + A8.bay + ", B " + B8.bay + ", C " + (C8 ? C8.bay : "-") + " (was " + cBay + ")" + (bounced ? ", bounced " + bounced : ""));
  [A8, B8, C8].forEach(function (u) { if (u && !u.dead) { u.hp = 0; u.dead = true; } });
  Game.sweepDead();

  /* ---------------- 9. a long structure: seen and hit on its footprint ---------------- */
  var W = Game.map.W, F = Game.fog, keep = [], east = (a.ty + 1) * W + a.tx + 11;
  for (var j9 = a.ty; j9 < a.ty + 4; j9++) for (var i9 = a.tx; i9 < a.tx + 12; i9++) { keep.push(F[j9 * W + i9]); F[j9 * W + i9] = 0; }
  var wasFog = Game.fogEnabled; Game.fogEnabled = true;
  var eOwner = a.owner; a.owner = E;
  F[east] = 2;
  var seen = Game.fogAt(a) === 2 && Game.visibleTo(P, a) && F[a.ty * W + a.tx] === 0;
  F[east] = 0;
  var unseen = Game.fogAt(a) === 0 && !Game.visibleTo(P, a);
  var k9 = 0; for (j9 = a.ty; j9 < a.ty + 4; j9++) for (i9 = a.tx; i9 < a.tx + 12; i9++) F[j9 * W + i9] = keep[k9++];
  a.owner = eOwner; Game.fogEnabled = wasFog;
  chk("[9] an enemy's runway base is in sight when only its far end is, and not when none of it is",
      seen && unseen, "far end in sight: " + seen + "; none: " + unseen);
  var side = a.edge(a.x, a.ty * TT - 3 * TT), inside = a.edge(a.x + 5 * TT, a.y), endOff = a.edge(a.tx * TT - 2 * TT, a.y);
  chk("[9] its edge is its footprint's: 3 tiles off its long side is 3 tiles, inside is 0, 2 off its end is 2",
      Math.abs(side - 3 * TT) < 0.01 && inside === 0 && Math.abs(endOff - 2 * TT) < 0.01 && a.long() && !Game.entities.some(function (b) { return b.kind === "building" && !b.dead && b.def.w === b.def.h && b.long(); }),
      (side / TT).toFixed(2) + " / " + inside + " / " + (endOff / TT).toFixed(2) + " tiles");
  a.hp = 0; Game.tick(DT);

  /* ---------------- 7. the commander finds ground ---------------- */
  var C = E; AI.setPeace(C, false); Game.checkVictory = function () {};
  C.cash = 200000; C.oil = 2000;
  var had = C.countBuilding("airbase");
  var tN = ticks(8 * 60 * 30, function () { return C.countBuilding("airbase") > had; });
  var nb = null; C.buildings.forEach(function (b) { if (!b.dead && b.def.id === "airbase") nb = b; });
  var level = true;
  if (nb) { var lv0 = Game.map.elev[nb.ty * Game.map.W + nb.tx]; for (var j = 0; j < 4; j++) for (var i = 0; i < 12; i++) if (Game.map.elev[(nb.ty + j) * Game.map.W + nb.tx + i] !== lv0) level = false; }
  chk("[7] the commander puts one down within eight minutes, on one level",
      !!nb && level, nb ? "at t+" + f1(tN / 30) + " s, " + Math.round(Math.hypot(nb.x - C.homeX, nb.y - C.homeY) / TT) + " tiles from home" : "none in " + f1(tN / 30) + " s");
}
