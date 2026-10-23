/* tools/jsc/sling3d_check.js - a vehicle on a helicopter's hook is drawn
   under it.

     python3 tools/jsc/scene3d.py tools/jsc/sling3d_check.js

   (owner) "the veichle is disapearing but not under the mv22". A vehicle on
   the hook is `carried`, and render3d draws nothing carried: it vanished at
   the pick-up and came back at the drop. render3d drawSlings now draws the
   hook load (Unit.holdPlan's) under the machine. On the real renderer, an
   MV-22B and a Humvee:
     [1] the Humvee boards, on the hook, and it is drawn: a sling (the
         Humvee's own model and a cable) is in the scene;
     [2] with the Osprey standing on the ground the Humvee stands on the
         ground beside it, clear of its rotors, on its heading;
     [3] in flight it hangs under it: directly below, its roof SLING_M (7 m)
         under the machine's lowest point, on its heading, and the cable runs
         from the one to the other;
     [4] put down (U), it is a vehicle on the ground again and the sling is
         gone from the scene. */
var TT = 32, PXM = 0.625, DT = 1 / 30, PASS = 0, FAIL = 0, H = null;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
function f2(v) { return typeof v !== "number" || v !== v ? String(v) : v.toFixed(2); }
(function () {
  if (typeof Impact3D === "undefined") return;
  var ii = Impact3D.init;
  Impact3D.init = function (T3, th, G, h) { H = h; return ii.apply(this, arguments); };
})();
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "fulda"); set("opt-era", "e20"); set("opt-aera", "e20"); set("opt-fac", "nato");
  set("opt-cash", "200000"); set("opt-seed", "sling"); set("opt-fog", "0"); set("opt-3d", "1");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});
function frames(n, tick) { for (var i = 0; i < n; i++) { if (tick) Game.tick(DT); Render.draw(DT, UI.input); } }
function recOf(e) { return H ? H.recOf(e.id) : null; }
function inScene(o) { for (; o; o = o.parent) if (o === Render3D.three.scene) return true; return false; }
/* open, level ground near home */
function flat() {
  var M = Game.map, P = Game.human, hx = (P.homeX / TT) | 0, hy = (P.homeY / TT) | 0;
  for (var r = 8; r < 80; r++) for (var a = 0; a < 48; a++) {
    var x = (hx + Math.cos(a / 48 * 6.283) * r) | 0, y = (hy + Math.sin(a / 48 * 6.283) * r) | 0, ok = true;
    if (x < 14 || y < 14 || x > M.W - 14 || y > M.H - 14) continue;
    var e0 = M.elev[y * M.W + x];
    for (var j = -8; j <= 8 && ok; j++) for (var i = -8; i <= 8; i++) {
      var k = (y + j) * M.W + x + i;
      if (M.elev[k] !== e0 || !GameMap.passable(M, x + i, y + j, "ground") || Game.occ[k]) { ok = false; break; }
    }
    if (ok) return { x: x, y: y };
  }
  return null;
}
function run() {
  var P = Game.human, E = Game.players[1];
  AI.setPeace(E, true); Game.checkVictory = function () {};
  var g = flat();
  if (!g || !H) { chk("a scene and the renderer's records", false, (g ? "" : "no flat ground ") + (H ? "" : "no records")); return; }
  Render3D.setCam(g.x * TT, g.y * TT);
  var cx = g.x * TT + 16, cy = g.y * TT + 16;
  var os = Game.spawnUnitAt(P, "nato_e00_mv22", cx, cy - 4 * TT);
  os.parked = false; os.order = { type: "hover" }; os.fuel = os.fuelMax;
  var hv = Game.spawnUnitAt(P, "recon_n", cx, cy);
  hv.order = { type: "idle" };
  frames(30, true);

  /* ---- 1. aboard, and drawn ---- */
  hv.give({ type: "enter", target: os });
  var t = 0;
  for (; t < 60 * 30 && !hv.carried; t++) { Game.tick(DT); if (t % 3 === 0) Render.draw(DT, UI.input); }
  frames(4, true);
  var rec = recOf(os), s = rec && rec.sling;
  chk("[1] the Humvee boards the MV-22 on its hook, and is drawn: its model and a cable are in the scene",
      hv.carried && os.cargoLoad().hook === 1 && !!s && s.id === hv.id && inScene(s.grp) && inScene(s.cable),
      "carried " + hv.carried + " after " + (t / 30).toFixed(1) + " s; sling " + (s ? "for " + s.id : "none"));
  if (!s) return;

  /* ---- 2. on the ground: beside it ----
     drawn as the renderer draws a machine down on the ground (e.grounded:
     the transport-strip rule), the game held still meanwhile */
  os.grounded = true; os.moving = false;
  frames(150, false);
  rec = recOf(os); s = rec.sling;
  var gp = rec.grp.position, lp = s.grp.position;
  var ground = Render3D.heightAt ? Render3D.heightAt(hv.x, hv.y) : NaN;
  var beside = Math.hypot(lp.x - gp.x, lp.z - gp.z);
  chk("[2] with the Osprey on the ground the Humvee stands on the ground, beside it clear of its rotors, on its heading",
      Math.abs(lp.y - (gp.y + rec.foot * rec.grp.scale.y)) < 0.2 && beside >= rec.slingR * rec.grp.scale.y * 0.95 &&
      Math.abs(s.grp.rotation.y - rec.grp.rotation.y) < 1e-6,
      "its floor " + f2(lp.y) + " against the Osprey's " + f2(gp.y + rec.foot * rec.grp.scale.y) + " m; " + f2(beside) + " m out (rotors " + f2(rec.slingR * rec.grp.scale.y) + ")");

  /* ---- 3. in flight: under it ---- */
  /* over the same flat ground: the machine cruises at a height above the
     sea, not the ground (render3d AIR_ALT), so over a hill 29 m up it is 13 m
     over the ground and the Humvee - 13 m tall to its whip antenna - comes
     down on it, as it should */
  os.grounded = false; os.parked = false; os.order = { type: "move", x: cx + 6 * TT, y: cy }; os.moving = true;
  var hi = 0;
  for (t = 0; t < 10 * 30; t++) { Game.tick(DT); Render.draw(DT, UI.input); }
  rec = recOf(os); s = rec.sling; gp = rec.grp.position; lp = s.grp.position;
  var belly = gp.y + rec.foot * rec.grp.scale.y, a = s.cable.geometry.attributes.position;
  var under = Math.hypot(lp.x - gp.x, lp.z - gp.z), roof = lp.y + s.h;
  chk("[3] in flight it hangs straight under it, its roof 7 m below the machine's lowest point, on its heading, on the cable",
      under < 0.01 && Math.abs(belly - roof - 7) < 0.01 && Math.abs(s.grp.rotation.y - rec.grp.rotation.y) < 1e-6 &&
      Math.abs(a.getY(0) - belly) < 1e-3 && Math.abs(a.getY(1) - roof) < 1e-3 && Math.abs(a.getX(1) - lp.x) < 1e-3,
      "Osprey " + f2(gp.y) + " m up, " + f2(belly - roof) + " m of cable, " + f2(under) + " m off the vertical, the Humvee's floor " + f2(lp.y) + " m");

  /* ---- 4. put down ---- */
  os.order = { type: "hover" }; os.moving = false;
  frames(60, true);
  UI.select && UI.select([os]);
  if (os.unload) os.unload();
  frames(60, true);
  rec = recOf(os);
  var hr = recOf(hv);
  chk("[4] put down, it is a vehicle on the ground again and the sling is gone from the scene",
      !hv.carried && !!rec && !rec.sling && !inScene(s.grp) && !inScene(s.cable) && !!hr,
      "carried " + hv.carried + ", sling " + (rec && rec.sling ? "still" : "gone") + ", drawn " + !!hr);
}
