/* tools/jsc/touchdown3d_check.js - a transport set down to unload is drawn
   on the ground when its load comes off, checked on the REAL renderer under
   JavaScriptCore.

     python3 tools/jsc/scene3d.py tools/jsc/touchdown3d_check.js

   (owner) "Hold the aircraft on the ground until the drawn model has actually
   landed before troops get out, so they don't drop from 13 m." An offline
   render of the game found an MV-22B sent to a beach with G.airLand putting
   its squad down at once and lifting again two seconds later, while
   render3d.js brings it down from its cruise height (CFG.AIR_ALT, 46 m) at
   CFG.AIR_SINK (17 m a second): the squad stood under an aircraft still
   about 13 m up. entities.js TOUCHDOWN now holds the load aboard for
   AIR_ALT / AIR_SINK seconds from the moment the rules put it on the ground.
   Held, for an MV-22B and a UH-60M each with a rifle squad, the MV-22B
   again at 3x game speed and on a beach (the case found), and a C-130J
   with a Humvee landing on open ground:
     - when the load comes off, the lowest it can be drawn - its model's
       foot on the ground under it - is within a metre;
     - it is still on the ground in the rules then, and stays drawn down
       until it lifts again. */
var TT = 32, DT = 1 / 30, PASS = 0, FAIL = 0, H = null;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }

/* render3d hands Impact3D its record lookup (entity id -> the group it is
   drawn as); the check borrows it to reach the drawn model of an entity */
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

function recOf(e) { return H ? H.recOf(e.id) : null; }
/* one frame of the page's loop: `speed` ticks of the game, one draw */
function frame(speed) { for (var i = 0; i < (speed || 1); i++) Game.tick(DT); Render.draw(DT, UI.input); }
/* how far above where it stands its origin is drawn: its model's foot on
   the ground under it is 0 (render3d.js landRest) */
function above(u) {
  var r = recOf(u);
  return r && r.foot !== undefined ? r.grp.position.y - (H.heightAt(u.x, u.y) - r.foot) : NaN;
}
function gone(u) {
  if (!u) return; u.dead = true;
  var i = Game.entities.indexOf(u); if (i >= 0) Game.entities.splice(i, 1);
  var l = u.owner && u.owner.units; if (l) { i = l.indexOf(u); if (i >= 0) l.splice(i, 1); }
}
/* the middle of a flat, open, unbuilt square of ground, near home */
function flatSpot(R) {
  var M = Game.map, P = Game.human, hx = (P.homeX / TT) | 0, hy = (P.homeY / TT) | 0;
  for (var r = 10; r < 90; r++) for (var a = 0; a < 64; a++) {
    var an = a / 64 * 6.283, x = (hx + Math.cos(an) * r) | 0, y = (hy + Math.sin(an) * r) | 0;
    if (x < R + 4 || y < R + 4 || x + R + 4 >= M.W || y + R + 4 >= M.H) continue;
    var h0 = H.heightAt(x * TT, y * TT), ok = true;
    for (var j = -R; j <= R && ok; j++) for (var i = -R; i <= R; i++)
      if (Math.abs(H.heightAt((x + i) * TT, (y + j) * TT) - h0) > 0.01 || !GameMap.passable(M, x + i, y + j, "ground") ||
          Game.tileBlocked(x + i, y + j, null)) { ok = false; break; }
    if (ok) return { x: x, y: y, h: h0 };
  }
  return null;
}
/* a sand tile at the water's edge, open and unbuilt, with open ground
   behind it to come in over, nearest home. (dx, dy) points out to sea. */
function beach() {
  var M = Game.map, P = Game.human, hx = P.homeX / TT, hy = P.homeY / TT, best = null, bd = Infinity;
  var open = function (x, y) { return GameMap.passable(M, x, y, "ground") && !Game.tileBlocked(x, y, null); };
  for (var y = 6; y < M.H - 6; y++) for (var x = 6; x < M.W - 6; x++) {
    if (CFG.TERRAIN[M.terrain[y * M.W + x]].name !== "sand" || !open(x, y)) continue;
    for (var k = 0; k < 4; k++) {
      var dx = [1, -1, 0, 0][k], dy = [0, 0, 1, -1][k];
      if (M.terrain[(y + dy) * M.W + x + dx] !== T.WATER || !open(x - dx, y - dy) || !open(x - 2 * dx, y - 2 * dy)) continue;
      var d = Math.hypot(x - hx, y - hy);
      if (d < bd) { bd = d; best = { x: x, y: y, dx: dx, dy: dy, h: H.heightAt((x + 0.5) * TT, (y + 0.5) * TT) }; }
    }
  }
  return best;
}
/* fly one delivery, a frame at a time, and note the frame its load comes
   off and the frames it stands there after (eight seconds at most: one with
   no airbase to go home to stays down - entities.js airlandCanGo) */
function deliver(u, load, px, py, speed, maxT) {
  var r = { why: Game.airLand(u, px, py), t: -1, h: NaN, down: false, after: -Infinity, held: -1 };
  var t0 = Game.time, n = Math.round(maxT / DT / (speed || 1));
  for (var i = 0; i < n && !r.why; i++) {
    frame(speed);
    if (r.t < 0) {
      if (load.carried) continue;
      r.t = Game.time - t0; r.h = above(u); r.down = !!u.grounded;
      continue;
    }
    if (!u.grounded) { r.held = Game.time - t0 - r.t; break; }
    r.after = Math.max(r.after, above(u));
    if (Game.time - t0 - r.t > 8) break;
  }
  return r;
}
function say(r) {
  return r.why ? r.why : r.t < 0 ? "the load never came off" :
    "off " + r.t.toFixed(2) + " s after the order, drawn " + r.h.toFixed(2) + " m above its rest, " +
    (r.down ? "on the ground" : "NOT on the ground") + " in the rules; on the ground " +
    (r.held >= 0 ? r.held.toFixed(2) + " s more" : "8 s more and still there") +
    ", at most " + (r.after > -Infinity ? r.after.toFixed(2) : "-") + " m up meanwhile";
}

function run() {
  var P = Game.human, E = Game.players[1];
  AI.setPeace(E, true); Game.checkVictory = function () {};
  chk("the 3D renderer is up, and its records are reachable", Render === Render3D && !!H, "");
  if (!H) return;
  var TD = CFG.AIR_ALT / CFG.AIR_SINK;
  chk("the rules and the drawing share the cruise height and the sink rate (config.js), and the touchdown is their ratio",
      H.AIR_ALT === CFG.AIR_ALT && typeof TOUCHDOWN === "number" && Math.abs(TOUCHDOWN - TD) < 1e-9,
      "AIR_ALT " + H.AIR_ALT + " m / AIR_SINK " + CFG.AIR_SINK + " m/s = " + TD.toFixed(3) + " s; TOUCHDOWN " + (typeof TOUCHDOWN === "number" ? TOUCHDOWN.toFixed(3) : "missing"));
  var g = flatSpot(9);
  chk("flat open ground to land on", !!g, g ? "(" + g.x + "," + g.y + ") at " + g.h.toFixed(2) + " m" : "none");
  if (!g) return;
  Render3D.setCam(g.x * TT, g.y * TT);
  var px = (g.x + 0.5) * TT, py = (g.y + 0.5) * TT;

  /* ---- helicopters, a rifle squad each: at the point ---- */
  [["nato_e00_mv22", 1], ["trans_n", 1], ["nato_e00_mv22", 3]].forEach(function (c) {
    var h = Game.spawnUnitAt(P, c[0], px - 12 * TT, py - 3 * TT);
    h.order = { type: "hover" }; h.parked = false; h.stance = "hold";
    var q = Game.spawnUnitAt(P, "rifle_n", px - 12 * TT, py + 6 * TT);
    q.x = h.x; q.y = h.y; q.carried = true; h.cargo.push(q);
    for (var i = 0; i < 10; i++) frame(1);                        // drawn at its cruise height
    Game.speed = c[1];
    var r = deliver(h, q, px, py, c[1], 40);
    Game.speed = 1;
    chk(h.def.name + (c[1] > 1 ? " at " + c[1] + "x game speed" : "") + " sets down with a rifle squad: it is drawn on the ground when they get out, and stays down until it lifts",
        !r.why && r.t > 0 && r.down && Math.abs(r.h) < 1 && r.after < 1 && r.held !== 0, say(r));
    gone(q); gone(h);
    for (var k = 0; k < 4; k++) frame(1);
  });

  /* ---- the case found: an MV-22B to a beach ---- */
  var b = beach();
  chk("a beach to set down on: sand at the water's edge, open ground behind it", !!b, b ? "(" + b.x + "," + b.y + ") at " + b.h.toFixed(2) + " m" : "none");
  if (b) {
    var bx = (b.x + 0.5) * TT, by = (b.y + 0.5) * TT;
    Render3D.setCam(bx, by);
    var mv = Game.spawnUnitAt(P, "nato_e00_mv22", bx - b.dx * 12 * TT, by - b.dy * 12 * TT);      // in over the land
    mv.order = { type: "hover" }; mv.parked = false; mv.stance = "hold";
    var sq = Game.spawnUnitAt(P, "rifle_n", bx, by);
    sq.x = mv.x; sq.y = mv.y; sq.carried = true; mv.cargo.push(sq);
    for (var f = 0; f < 10; f++) frame(1);
    var rb = deliver(mv, sq, bx, by, 1, 40);
    chk("MV-22B Osprey to a beach with a rifle squad: drawn on the sand when they get out, and stays down until it lifts",
        !rb.why && rb.t > 0 && rb.down && Math.abs(rb.h) < 1 && rb.after < 1 && rb.held !== 0, say(rb));
    gone(sq); gone(mv);
    for (var k2 = 0; k2 < 4; k2++) frame(1);
    Render3D.setCam(g.x * TT, g.y * TT);
  }

  /* ---- a C-130J with a Humvee, landing on open ground beside the point ---- */
  var c130 = Game.spawnUnitAt(P, "airlift_n", px - 22 * TT, py - 10 * TT);
  c130.order = { type: "move", x: px - 40 * TT, y: py - 10 * TT }; c130.parked = false; c130.stance = "hold";
  c130.ang = Math.PI;
  var hv = Game.spawnUnitAt(P, "recon_n", px - 22 * TT, py + 8 * TT);
  hv.x = c130.x; hv.y = c130.y; hv.carried = true; c130.cargo.push(hv);
  for (var j = 0; j < 10; j++) frame(1);
  var rc = deliver(c130, hv, px, py, 1, 90);
  chk("C-130J lands on open ground with a Humvee: it is drawn on the ground when the Humvee drives off, and stays down until it rolls for take-off",
      !rc.why && rc.t > 0 && rc.down && Math.abs(rc.h) < 1 && rc.after < 1 && rc.held !== 0, say(rc));
  gone(hv); gone(c130);
}
