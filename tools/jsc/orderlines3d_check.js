/* tools/jsc/orderlines3d_check.js - the order lines in the 3D view, checked on
   the REAL renderer under JavaScriptCore.

     python3 tools/jsc/scene3d.py tools/jsc/orderlines3d_check.js

   _behtest.html [83] holds the list render.js orderLines() makes - which legs,
   which kinds, the fog rule, the fire-mission ring - and the 2D view's
   strokes. This holds what render3d.js does with that list, which needs WebGL:
   three.js and render3d.js load, THREE.WebGLRenderer runs over
   tools/jsc/gl_stub.js, and the draw calls below are what renderer.info
   reports. It runs at CFG.GFX tier "medium", which has no bloom, so
   renderer.info.render.calls is the whole frame. Owner's rule: no browser,
   ever - the owner judges the look in their own. */
var TT = 32, PXM = 0.625, AIR_ALT = 46, PASS = 0, FAIL = 0;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }

window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-cash", "200000"); set("opt-seed", "btest"); set("opt-fog", "0"); set("opt-3d", "1");
  CFG.GFX_LEVEL = "medium";
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

function R3() { return Render3D.three; }
function lineObj() { return R3().scene.children.filter(function (c) { return c.name === "orderLines"; }); }
function draw(n) { var t = 0; for (var i = 0; i < n; i++) { var t0 = preciseTime(); Render.draw(CFG.DT, UI.input); t += preciseTime() - t0; } return t; }
function sel(list) { var s = UI.selection; for (var i = 0; i < s.length; i++) s[i].selected = false; s.length = 0;
  for (var j = 0; j < list.length; j++) { list[j].selected = true; s.push(list[j]); } }
function spot(P, r0) {
  var M = Game.map, hx = (P.homeX / TT) | 0, hy = (P.homeY / TT) | 0;
  for (var r = r0; r < 90; r++) for (var a = 0; a < 64; a++) {
    var an = a / 64 * 6.283, x = (hx + Math.cos(an) * r) | 0, y = (hy + Math.sin(an) * r) | 0;
    if (x < 12 || y < 12 || x + 12 >= M.W || y + 12 >= M.H) continue;
    var ok = true;
    for (var j = -3; j <= 3 && ok; j++) for (var i = -3; i <= 8; i++)
      if (!GameMap.passable(M, x + i, y + j, "ground") || Game.tileBlocked(x + i, y + j, null)) { ok = false; break; }
    if (ok) return { x: x, y: y };
  }
  return null;
}
/* vertex i of the line object, in metres */
function vtx(o, i) { var a = o.geometry.attributes.position.array; return { x: a[i * 3], y: a[i * 3 + 1], z: a[i * 3 + 2] }; }
function hasVtx(o, wx, wy, tol) {
  var n = o.geometry.drawRange.count;
  for (var i = 0; i < n; i++) { var v = vtx(o, i); if (Math.abs(v.x - wx * PXM) < tol && Math.abs(v.z - wy * PXM) < tol) return v; }
  return null;
}

function run() {
  var P = Game.human, E = Game.players[1];
  if (E.cash > 4000) E.cash = 4000;
  AI.setPeace(E, true);
  Game.checkVictory = function () {};
  chk("the 3D renderer is up", Render === Render3D && !!R3(), "");
  var g = spot(P, 10);
  if (!g) { chk("scenario built", false, "no open ground"); return; }
  Render3D.setCam(g.x * TT, g.y * TT);
  sel([]);
  draw(2);
  var o0 = lineObj();
  chk("with nothing selected there is one line object, and it draws nothing",
      o0.length === 1 && o0[0].isLineSegments && !o0[0].visible && o0[0].geometry.drawRange.count === 0,
      o0.length + " objects" + (o0[0] ? ", visible " + o0[0].visible + ", count " + o0[0].geometry.drawRange.count : ""));
  var O = o0[0];
  if (!O) return;
  /* a tank: a move and two queued waypoints */
  var A = Game.spawnUnitAt(P, "mbt_n", g.x * TT + 16, g.y * TT + 16);
  A.stance = "hold";
  var w = [[A.x + TT * 4, A.y], [A.x + TT * 4, A.y + TT * 3], [A.x + TT, A.y + TT * 5]];
  A.give({ type: "move", x: w[0][0], y: w[0][1] });
  A.give({ type: "move", x: w[1][0], y: w[1][1] }, true);
  A.give({ type: "move", x: w[2][0], y: w[2][1] }, true);
  sel([A]);
  draw(1);
  var n = O.geometry.drawRange.count, v0 = vtx(O, 0);
  chk("a selected tank's three legs are drawn: the line object shows, in pairs of vertices",
      O.visible && n > 0 && n % 2 === 0, "visible " + O.visible + ", " + n + " vertices");
  chk("the first leg starts at the tank", Math.abs(v0.x - A.x * PXM) < 0.01 && Math.abs(v0.z - A.y * PXM) < 0.01,
      "(" + v0.x.toFixed(2) + "," + v0.z.toFixed(2) + ") vs (" + (A.x * PXM).toFixed(2) + "," + (A.y * PXM).toFixed(2) + ")");
  var hits = w.map(function (p) { return hasVtx(O, p[0], p[1], 0.01); });
  chk("and the line passes through every waypoint", hits.every(function (h) { return !!h; }),
      hits.map(function (h) { return h ? "y " + h.y.toFixed(1) : "missing"; }).join(", "));
  var lo = 1e9, hi = -1e9;
  for (var i = 0; i < n; i++) { var v = vtx(O, i); lo = Math.min(lo, v.y); hi = Math.max(hi, v.y); }
  chk("a ground leg lies on the ground: below cruise height, above the sea", lo > 0 && hi < AIR_ALT - 10,
      "heights " + lo.toFixed(2) + " to " + hi.toFixed(2) + " m");
  var col = O.geometry.attributes.color.array, want = new THREE.Color("#8fd05f").convertSRGBToLinear();
  chk("in the move colour", Math.abs(col[0] - want.r) < 1e-4 && Math.abs(col[1] - want.g) < 1e-4 && Math.abs(col[2] - want.b) < 1e-4,
      col[0].toFixed(3) + "," + col[1].toFixed(3) + "," + col[2].toFixed(3));
  chk("drawn over the scene, never hidden by a ridge", O.material.depthTest === false && O.renderOrder >= 999 && O.frustumCulled === false, "");
  /* an aircraft's strike: at height */
  var jet = Game.spawnUnitAt(P, "fighter_n", A.x - TT * 3, A.y - TT * 2), foe = Game.spawnUnitAt(E, "mbt_p", A.x + TT * 9, A.y);
  jet.parked = false; jet.order = { type: "attack", target: foe, release: true };
  sel([jet]);
  draw(1);
  var jv = vtx(O, 0), fv = hasVtx(O, foe.x, foe.y, 0.01);
  chk("an aircraft's strike leaves from cruise height and comes down on the target",
      Math.abs(jv.y - AIR_ALT) < 1e-3 && Math.abs(jv.x - jet.x * PXM) < 0.01 && !!fv && fv.y < AIR_ALT - 10,
      "start y " + jv.y.toFixed(1) + ", target y " + (fv ? fv.y.toFixed(1) : "missing"));
  /* nothing grows: the same object, the same buffers, frame after frame */
  sel([A]);
  var arr0 = O.geometry.attributes.position.array, geo0 = O.geometry, kids0 = R3().scene.children.length;
  draw(120);
  chk("120 frames later: the same object, the same geometry and buffer, no new scene objects",
      lineObj().length === 1 && lineObj()[0] === O && O.geometry === geo0 && O.geometry.attributes.position.array === arr0 &&
      R3().scene.children.length === kids0, "children " + kids0 + " -> " + R3().scene.children.length);
  /* one draw call */
  draw(1); var cOn = R3().renderer.info.render.calls;
  sel([]); draw(1); var cOff = R3().renderer.info.render.calls;
  chk("the lines cost one draw call however many units", cOn - cOff === 1 && !O.visible, cOn + " calls with, " + cOff + " without");
  /* frame cost: 40 tanks, each with a move and 12 queued, every one shown with Shift */
  var army = [];
  for (var k = 0; k < 40; k++) {
    var u = Game.spawnUnitAt(P, "mbt_n", (g.x + (k % 8) - 2) * TT + 16, (g.y + ((k / 8) | 0) - 2) * TT + 16);
    if (!u) continue; u.stance = "hold"; army.push(u);
    for (var q = 0; q < 13; q++) u.give({ type: "move", x: u.x + TT * (3 + q) * Math.cos(q), y: u.y + TT * (3 + q) * Math.sin(q) }, q > 0);
  }
  sel(army);
  draw(10);
  var nOn = Render2D.orderLines(Game, UI.selection, false).n, vOn = O.geometry.drawRange.count;
  var t0 = preciseTime(); for (var r = 0; r < 200; r++) Render2D.orderLines(Game, UI.selection, false); var tList = (preciseTime() - t0) / 200;
  /* What the lines cost the 3D frame, timed around exactly that work and
     nothing else: from render3d's call for the list (Render2D.orderLines,
     read through the module object, so it can be wrapped here) to its
     setDrawRange on the line object, which is the last thing it does. A
     whole frame under this harness runs 100-300 ms depending on the load on
     the machine, and first cuts of this check that compared frames with and
     without the orders read anything from -8 to +7 ms for the same work. */
  var IDLE = { type: "idle" }, NONE = [], keep = army.map(function (u2) { return [u2.order, u2.orders]; });
  function orders(on) { army.forEach(function (u2, i2) { u2.order = on ? keep[i2][0] : IDLE; u2.orders = on ? keep[i2][1] : NONE; }); }
  function med(a2) { a2 = a2.slice().sort(function (x, y) { return x - y; }); return a2[a2.length >> 1]; }
  var olf = Render2D.orderLines, geo = O.geometry, tIn = 0, spans = [];
  Render2D.orderLines = function () { tIn = preciseTime(); return olf.apply(this, arguments); };
  geo.setDrawRange = function (a2, b2) {
    if (tIn) { spans.push(preciseTime() - tIn); tIn = 0; }
    return THREE.BufferGeometry.prototype.setDrawRange.call(this, a2, b2);
  };
  function cost(n2) { spans = []; draw(n2); return med(spans); }
  var cOn2, cShift, cNone, nShift;
  try {
    orders(true); cOn2 = cost(60);
    UI.input.shift = true; nShift = olf(Game, UI.selection, true).n; cShift = cost(60); UI.input.shift = false;
    orders(false); cNone = cost(60); orders(true);
  } finally { Render2D.orderLines = olf; delete geo.setDrawRange; UI.input.shift = false; orders(true); }
  log("[orderlines3d] " + army.length + " tanks x 13 orders: " + nOn + " legs, " + vOn + " vertices; the list alone " +
      (tList * 1000).toFixed(3) + " ms; list and fill, median of 60 frames: " + (cOn2 * 1000).toFixed(3) + " ms, with Shift (" +
      nShift + " legs) " + (cShift * 1000).toFixed(3) + " ms, with no orders " + (cNone * 1000).toFixed(3) + " ms");
  chk("40 tanks with 13 orders each are all drawn", nOn === army.length * 13 && vOn > nOn * 2, nOn + " legs, " + vOn + " vertices");
  chk("building the list for them costs under 2 ms, even on a loaded machine", tList < 0.002, (tList * 1000).toFixed(3) + " ms");
  chk("and laying all 520 legs into the buffer a few milliseconds at most, even under this harness",
      cOn2 < 0.010 && cShift < 0.010, (cOn2 * 1000).toFixed(3) + " ms, " + (cShift * 1000).toFixed(3) + " ms with Shift");
  chk("with no orders to show it costs next to nothing", cNone < 0.0005, (cNone * 1000).toFixed(3) + " ms");
  army.concat([A, jet, foe]).forEach(function (u2) { u2.dead = true; });
}
