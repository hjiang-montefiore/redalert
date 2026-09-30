/* tools/jsc/ghost3d_check.js - what the player is left of a contact that has
   gone out of sight, checked on the REAL renderer under JavaScriptCore.

     python3 tools/jsc/scene3d.py tools/jsc/ghost3d_check.js

   _behtest.html [85] holds the record game.js G.trackGhosts keeps: written
   when a contact leaves sight, never moved, gone when the ground is looked
   at again, when the contact is seen again, or after its life. This holds
   what render3d.js syncGhosts makes of it: the contact's own model, in flat
   grey, where and how it was last seen, fading in eight steps, gone with the
   record - and nothing uploaded to the GPU for it (it is a clone of the
   template the live unit was drawn from). Also held: a ghost throws no
   shadow and takes none (the first cut's threw the full shadow of a solid
   tank); its turret is trained as it was last seen even along a grid row
   (tang exactly 0, which the first cut took for the hull's heading); a unit
   that walks out of view is drawn over the edge, on ground out of view,
   never on ground the player can see is empty; and a machine parked on a
   carrier's deck is drawn where it stood on her deck, not at the sea under
   its game position. Owner's rule: no browser, ever - the owner judges the
   look in their own. At HEAD there is no ghost at all: every check below
   that needs one fails. */
var TT = 32, PASS = 0, FAIL = 0, DT = 1 / 30, PXM = 0.625, H = null;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }

/* render3d hands Impact3D its record lookup (entity id -> the group it is
   drawn as); this borrows it to reach the drawn model of a live unit, as
   parked3d_check.js does */
(function () {
  if (typeof Impact3D === "undefined") return;
  var ii = Impact3D.init;
  Impact3D.init = function (T3, th, G, h) { H = h; return ii.apply(this, arguments); };
})();

window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-cash", "200000"); set("opt-seed", "btest"); set("opt-fog", "1"); set("opt-3d", "1");
  CFG.GFX_LEVEL = "high";
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { log("HARNESS CRASH " + e + "\n" + e.stack); FAIL++; }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

function R3() { return Render3D.three; }
function ghostGroups() {
  var out = [];
  R3().scene.children.forEach(function (o) { if (o.userData && o.userData.ghost !== undefined) out.push(o); });
  return out;
}
function ghostFor(id) { return ghostGroups().filter(function (o) { return o.userData.ghost === id; })[0] || null; }
function recOf(e) { return H && H.recOf ? H.recOf(e.id) : null; }
function seaSpot(r0) {
  var M = Game.map;
  for (var y = r0; y < M.H - r0; y += 2) for (var x = r0; x < M.W - r0; x += 2) {
    var ok = true;
    for (var j = -r0; j <= r0 && ok; j += 2) for (var i = -r0; i <= r0; i += 2)
      if (M.terrain[(y + j) * M.W + x + i] !== T.WATER) { ok = false; break; }
    if (ok) return { x: x, y: y };
  }
  return null;
}
function run() {
  var P = Game.human, E = Game.players[1], M = Game.map, W = M.W;
  if (typeof AI !== "undefined" && AI.setPeace) AI.setPeace(E, true);
  Game.checkVictory = function () {};
  var made = [];
  function mk(p, id, x, y) { var u = Game.spawnUnitAt(p, id, x * TT + 16, y * TT + 16); if (u) { made.push(u); u.stance = "hold"; u._pin = { x: u.x, y: u.y }; } return u; }
  function put(u, x, y) { u.x = x; u.y = y; u._pin = { x: x, y: y }; }
  /* a frame: every unit made here held where it was put (a commander at
     peace still re-tasks what it owns) and, given _aim, its hull and turret
     held where they were laid; its guns held too, since a shot would light
     it; one tick, one draw */
  function frame() {
    made.forEach(function (u) {
      if (u.dead || !u._pin) return;
      u.x = u._pin.x; u.y = u._pin.y; u.order = { type: "idle" }; u.path = null;
      if (u._aim) { u.ang = u._aim.ang; u.tang = u._aim.tang; }
      if (u.cooldowns) for (var c = 0; c < u.cooldowns.length; c++) u.cooldowns[c] = 99;
    });
    Game.tick(DT); Render.draw(DT, UI.input);
  }
  function frames(n) { for (var i = 0; i < n; i++) frame(); }
  function pass(x, y) { return x > 1 && y > 1 && x < W - 2 && y < M.H - 2 && GameMap.passable(M, x, y, "ground") && !Game.tileBlocked(x, y, null); }
  function lonely(x, y, r) { var n = 0; Game.grid.query(x * TT + 16, y * TT + 16, r * TT, function (e) { if (!e.dead) n++; }); return n === 0; }
  var g = null;
  for (var y = 6; y < M.H - 6 && !g; y += 2) for (var x = 6; x + 16 < W - 6 && !g; x += 2) {
    var ok = true; for (var k = 0; k <= 16 && ok; k++) if (!pass(x + k, y)) ok = false;
    if (!ok || !lonely(x, y, 22) || !lonely(x + 16, y, 22)) continue;
    if (U.dist(x * TT, y * TT, P.homeX, P.homeY) < 30 * TT || U.dist(x * TT, y * TT, E.homeX, E.homeY) < 30 * TT) continue;
    g = { x: x, y: y };
  }
  if (!g) { chk("quiet ground", false, "none"); return; }
  var tank = mk(E, "mbt_p", g.x, g.y), eye = mk(P, "recon_n", g.x + 3, g.y);
  if (!tank || !eye) { chk("units spawned", false, ""); return; }
  tank._aim = { ang: 0.7, tang: 1.9 };
  Render.setCam(tank.x, tank.y);
  frames(4);
  var geo0 = R3().renderer.info.memory.geometries;
  chk("an enemy tank three tiles from our scout is drawn live, and nothing is a ghost",
      Game.fog[tank.ty * W + tank.tx] === 2 && ghostGroups().length === 0, "");
  /* our scout pulls back sixteen tiles: the tank drops out of sight */
  put(eye, eye.x + TT * 13, eye.y);
  frames(9);
  var gg = ghostGroups(), G0 = gg[0];
  chk("when it drops out of sight it is left as one ghost", gg.length === 1 && G0.userData.ghost === tank.id,
      gg.length + " ghost group(s) (HEAD: none)");
  if (!G0) return;
  var ex = tank.x * PXM, ez = tank.y * PXM;
  chk("where it was last seen, heading as it was", Math.abs(G0.position.x - ex) < 0.01 && Math.abs(G0.position.z - ez) < 0.01 &&
      Math.abs(G0.rotation.y + 0.7) < 1e-6, "at " + G0.position.x.toFixed(2) + "," + G0.position.z.toFixed(2) + " m, yaw " + G0.rotation.y.toFixed(3));
  var mats = new Set(), meshes = 0, shadowy = 0, tur = null;
  G0.traverse(function (o) {
    if (o.isMesh) { meshes++; mats.add(o.material); if (o.castShadow || o.receiveShadow) shadowy++; }
    if (o.name === "turret" && !tur) tur = o;
  });
  var m0 = Array.from(mats)[0];
  chk("in flat grey, every mesh on one translucent material that writes no depth",
      meshes > 0 && mats.size === 1 && m0.transparent && !m0.depthWrite && m0.opacity > 0.5 && m0.opacity <= 0.55,
      meshes + " meshes, " + mats.size + " material(s), opacity " + (m0 ? m0.opacity.toFixed(3) : "-"));
  var live = 0; R3().scene.traverse(function (o) { if (o.isMesh && o.castShadow) live++; });
  chk("and it throws no shadow and takes none: a ghost is not there",
      meshes > 0 && shadowy === 0 && R3().renderer.shadowMap.enabled,
      shadowy + " of " + meshes + " ghost meshes cast or take a shadow (first cut: all " + meshes + " cast); " + live + " meshes in the scene still cast");
  chk("its turret trained where it was last seen", !tur || Math.abs(tur.rotation.z + (1.9 - 0.7)) < 1e-6,
      tur ? "turret z " + tur.rotation.z.toFixed(3) : "no turret part");
  chk("and nothing new uploaded to draw it: it is the live unit's template",
      R3().renderer.info.memory.geometries === geo0, geo0 + " -> " + R3().renderer.info.memory.geometries + " geometries");
  /* it moves off unseen: the ghost stays */
  put(tank, tank.x, tank.y + TT * 10);
  frames(9);
  gg = ghostGroups();
  chk("the ghost does not follow the tank when it moves on unseen",
      gg.length === 1 && Math.abs(gg[0].position.z - ez) < 0.01, gg.length ? "ghost z " + gg[0].position.z.toFixed(2) + " vs " + ez.toFixed(2) : "none");
  put(tank, tank.x, tank.y - TT * 10);
  /* ten seconds on: fainter */
  frames(Math.round(10 / DT));
  gg = ghostGroups();
  var m1 = null; if (gg[0]) gg[0].traverse(function (o) { if (o.isMesh && !m1) m1 = o.material; });
  chk("ten seconds on it has faded to about half", !!m1 && m1.opacity < m0.opacity - 0.15 && m1.opacity > 0.2,
      m1 ? "opacity " + m0.opacity.toFixed(3) + " -> " + m1.opacity.toFixed(3) : "gone");
  /* seen again: the ghost goes, the tank is drawn */
  put(eye, eye.x - TT * 13, eye.y);
  frames(9);
  chk("seen again, the ghost is gone", ghostGroups().length === 0 && Game.fog[tank.ty * W + tank.tx] === 2, "");
  /* a turret laid exactly along a grid row: tang 0, hull 0.5. The live
     renderer draws it -(0 - 0.5); so must its ghost */
  tank._aim = { ang: 0.5, tang: 0 };
  frames(3);
  put(eye, eye.x + TT * 13, eye.y);
  frames(9);
  var gz = ghostFor(tank.id), tz = null;
  if (gz) gz.traverse(function (o) { if (o.name === "turret" && tz === null) tz = o.rotation.z; });
  chk("a turret laid along a grid row (tang exactly 0) is drawn as laid, not along the hull",
      !!gz && tz !== null && Math.abs(tz - 0.5) < 1e-6 && Math.abs(gz.rotation.y + 0.5) < 1e-6,
      gz ? "turret z " + (tz === null ? "-" : tz.toFixed(3)) + " (live rule 0.500; first cut 0.000)" : "no ghost");
  tank._aim = null;
  /* out of sight again and left for its whole life */
  var life = (Game.GHOST_LIFE || {}).ground || 20;
  chk("out of sight again, a fresh ghost", ghostGroups().length === 1, "");
  frames(Math.round((life + 0.5) / DT));
  chk("after its " + life + " s it is gone from the scene", ghostGroups().length === 0, "");
  /* our scout stands still and the tank walks away from it, 6 px a frame:
     the ghost is drawn where it stepped out of view, on ground out of view -
     not on the tile it was last seen on, in plain view and empty */
  put(eye, (g.x + 16) * TT + 16, eye.y); put(tank, (g.x + 13) * TT + 16, tank.y);
  frames(9);
  var inView = Game.fog[tank.ty * W + tank.tx] === 2, lastX = tank.x, n = 0;
  while (Game.fog[tank.ty * W + tank.tx] === 2 && n++ < 90) { lastX = tank.x; put(tank, tank.x - 6, tank.y); frame(); }
  frames(2);
  var gw = ghostFor(tank.id), gtx = gw ? Math.floor(gw.position.x / PXM / TT) : -1, gty = gw ? Math.floor(gw.position.z / PXM / TT) : -1;
  chk("a unit that walks out of view is drawn over the edge, on ground out of view",
      inView && !!gw && Game.fog[gty * W + gtx] !== 2 && Math.abs(gw.position.x / PXM - lastX) <= 6.01,
      gw ? "ghost " + Math.abs(gw.position.x / PXM - lastX).toFixed(1) + " px on from where it was last seen, its tile " +
           (Game.fog[gty * W + gtx] === 2 ? "IN VIEW (first cut)" : "out of view") : (inView ? "no ghost" : "never in view"));
  /* the fog switched off: nothing is out of sight, nothing is a ghost */
  var had = ghostGroups().length;
  Game.fogEnabled = false; frames(9);
  chk("with the fog off no ghost is drawn", had === 1 && ghostGroups().length === 0, had + " before");
  Game.fogEnabled = true;
  made.forEach(function (u) { u.dead = true; });
  frames(9);

  /* ---- a machine parked on a carrier's deck ----
     The game laid out with the fog off, as parked3d_check.js G does; then her
     box of sea is lit, drawn, and darkened again by hand (no tick, so no
     fog pass puts it back), and the ghosts are written by G.trackGhosts
     itself. The ghost of a machine on her deck belongs where the machine was
     drawn - on the deck at its spot, rolled with her - not at the sea under
     its game position, where the first cut drew it. */
  var sp = seaSpot(12);
  if (!sp) { chk("open sea for a carrier", false, "none"); return; }
  var ec = Game.spawnUnitAt(E, "carrier_p", sp.x * TT, sp.y * TT);
  if (!ec) { chk("carrier spawned", false, ""); return; }
  ec.ang = 0.7;
  Game.embarkComplement(ec); ec.wing().forEach(function (u) { u.stance = "hold"; });
  Game.fogEnabled = false; for (var i = 0; i < 3; i++) { Game.tick(DT); Render.draw(DT, UI.input); }
  Game.fogEnabled = true;
  Render.setCam(ec.x, ec.y);
  var box = function (v) {
    for (var yy = ec.ty - 6; yy <= ec.ty + 6; yy++) for (var xx = ec.tx - 6; xx <= ec.tx + 6; xx++)
      if (xx >= 0 && yy >= 0 && xx < W && yy < M.H) Game.fog[yy * W + xx] = v;
  };
  box(2); Game.trackGhosts();
  for (var i2 = 0; i2 < 3; i2++) Render.draw(DT, UI.input);
  var parked = ec.wing().filter(function (u) { return u.parked && recOf(u); });
  var pose = parked.map(function (u) { var r = recOf(u).grp; return { u: u, p: r.position.clone(), r: r.rotation.clone() }; });
  box(1); Game.trackGhosts();
  Render.draw(DT, UI.input);
  var worst = 0, drawn = 0, sea = 0;
  pose.forEach(function (q) {
    var gq = ghostFor(q.u.id); if (!gq) return;
    drawn++;
    worst = Math.max(worst, gq.position.distanceTo(q.p), Math.abs(gq.rotation.x - q.r.x), Math.abs(gq.rotation.z - q.r.z));
    sea = Math.max(sea, Math.abs(q.p.y - (H ? H.heightAt(q.u.x, q.u.y) : 0)));
  });
  chk("a machine parked on her deck leaves its ghost where it stood on her deck, rolled with her",
      pose.length >= 2 && drawn === pose.length && worst < 0.01 && !!ghostFor(ec.id),
      drawn + " of " + pose.length + " deck machines, worst " + worst.toFixed(4) + " m/rad off where they were drawn (the first cut: at the sea under them, up to " +
      sea.toFixed(1) + " m off)");
  [ec].concat(ec.wing()).forEach(function (u) { u.dead = true; });
  Game.ghosts = [];
  frames(3);
}
