/* tools/jsc/deploypose_check.js - a towed launcher is drawn on its tractor
   while it moves and set up once it has deployed, checked on the REAL
   renderer under JavaScriptCore.

     python3 tools/jsc/scene3d.py tools/jsc/deploypose_check.js

   A model may carry two groups, "deploypose" and "travelpose"
   (js/hero/ru_s75_s125.js: the S-75's SM-63 and the S-125's 5P73).
   render3d shows the first while the unit is deployed (e.deployed, which
   js/entities.js sets after deploySec seconds standing idle and clears when
   it moves) and the second otherwise, by visibility alone.
   Models: each pose group once, the travel pose shown and the deploy pose
   hidden in the template, the one "turret" inside the deploy pose, the
   convoy (drawn at k of true scale) on z = 0 inside the deployed pose's
   box, that box the model's and len its length, and each pose within 9,000
   triangles.
   In play (fog on, as the ghosts need it): a new S-75 stands packed up; a
   moving one shows the travel pose on every frame it moves; after deploySec
   standing it shows the deploy pose, and its turret trains (it is the
   deploy pose's); driven off it packs up again at once; a deploy flag held
   on the move (a gun or ballistic launcher keeps e.deployed through a plain
   move order) still draws it on the march. Burning, its smoke and fire come
   off the pose it shows (js/damage3d.js measures each pose on its own), set
   up and on the march. The S-125 likewise.
   A deploy:true SAM row without the groups (the KPA S-75, js/sam3d.js) and
   a tank keep every node's visibility as their templates have it. An enemy
   S-75 seen set up and then lost to the fog leaves a ghost set up; one seen
   on the move leaves a ghost packed up. */
var TT = 32, PASS = 0, FAIL = 0, DT = 1 / 30, H = null;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }

/* render3d hands Impact3D its record lookup (entity id -> the record it is
   drawn from), as ghost3d_check.js borrows it */
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
function recOf(e) { return H && H.recOf ? H.recOf(e.id) : null; }
function named(g, n) { var f = null; g.traverse(function (o) { if (!f && o.name === n) f = o; }); return f; }
function count(g, n) { var c = 0; g.traverse(function (o) { if (o.name === n) c++; }); return c; }
function shown(o) { for (; o; o = o.parent) if (!o.visible) return false; return true; }
function ghostFor(id) {
  var f = null;
  R3().scene.children.forEach(function (o) { if (o.userData && o.userData.ghost === id) f = o; });
  return f;
}
/* triangles drawn with the given pose shown */
function poseTris(root, dep) {
  var d = named(root, "deploypose"), t = named(root, "travelpose"), n = 0;
  d.visible = dep; t.visible = !dep;
  root.traverse(function (o) {
    if (!o.isMesh || !shown(o)) return;
    var g = o.geometry;
    n += (g.index ? g.index.count : g.attributes.position.count) / 3;
  });
  d.visible = false; t.visible = true;
  return n;
}
/* the top of the meshes under one pose group at world (x, z), the turret
   left out as damage3d leaves it out (it turns); -Infinity over bare air */
var _R = null, _A, _B, _C, _Hp, _Inv;
function topOver(g, x, z) {
  if (!_R) { _R = new THREE.Ray(); _A = new THREE.Vector3(); _B = new THREE.Vector3(); _C = new THREE.Vector3(); _Hp = new THREE.Vector3(); _Inv = new THREE.Matrix4(); }
  g.updateMatrixWorld(true);
  var best = -Infinity;
  g.traverse(function (o) {
    if (!o.isMesh || !o.geometry || !o.geometry.attributes.position) return;
    for (var p = o; p && p !== g; p = p.parent) if (p.name === "turret") return;
    _Inv.copy(o.matrixWorld).invert();
    _R.origin.set(x, 5000, z); _R.direction.set(0, -1, 0); _R.applyMatrix4(_Inv);
    var pos = o.geometry.attributes.position, idx = o.geometry.index, n = idx ? idx.count : pos.count;
    for (var t = 0; t + 2 < n; t += 3) {
      _A.fromBufferAttribute(pos, idx ? idx.getX(t) : t); _B.fromBufferAttribute(pos, idx ? idx.getX(t + 1) : t + 1); _C.fromBufferAttribute(pos, idx ? idx.getX(t + 2) : t + 2);
      if (_R.intersectTriangle(_A, _B, _C, false, _Hp)) { _Hp.applyMatrix4(o.matrixWorld); if (_Hp.y > best) best = _Hp.y; }
    }
  });
  return best;
}
/* every damage source of a burning unit 0 to 0.6 m over the pose shown */
function burnsOn(u, g) {
  if (typeof Damage3D === "undefined") return { ok: true, d: "no damage3d" };
  var a = Damage3D.anchors(u.id);
  if (!a || !a.srcs.length) return { ok: false, d: "no sources" };
  var ok = true, d = [];
  a.srcs.forEach(function (s) {
    var t = topOver(g, s.x, s.z), c = t === -Infinity ? NaN : s.y - t;
    if (!(c > 0 && c < 0.6)) ok = false;
    d.push(s.what + " " + (isNaN(c) ? "over air" : c.toFixed(2) + " m up"));
  });
  return { ok: ok, d: d.join(", ") };
}
function vis(root) { var a = []; root.traverse(function (o) { a.push(o.visible ? 1 : 0); }); return a.join(""); }

function run() {
  var P = Game.human, E = Game.players[1], M = Game.map, W = M.W;
  if (typeof AI !== "undefined" && AI.setPeace) AI.setPeace(E, true);
  Game.checkVictory = function () {};
  chk("the 3D renderer is up", Render === Render3D, "");

  /* ---------------- the models ---------------- */
  ["pact_e50_s75", "pact_e60_s125"].forEach(function (k) {
    var root = UNIT_MODELS[k].build(THREE, typeof Models3D !== "undefined" ? Models3D : null, { team: 0x3a6ea5 });
    var d = named(root, "deploypose"), t = named(root, "travelpose"), tur = named(root, "turret");
    var inDep = false; for (var o = tur; o; o = o.parent) if (o === d) inDep = true;
    chk(k + ": one deploypose and one travelpose; travel shown, deploy hidden in the template",
        count(root, "deploypose") === 1 && count(root, "travelpose") === 1 && t.visible && !d.visible, "");
    chk(k + ": one turret, inside the deploy pose", count(root, "turret") === 1 && inDep, count(root, "turret") + " turret(s)");
    root.updateMatrixWorld(true);
    var bd = new THREE.Box3().setFromObject(d, true), bt = new THREE.Box3().setFromObject(t, true), ba = new THREE.Box3().setFromObject(root);
    var e3 = 0.005;
    chk(k + ": the convoy (drawn at k " + (t.userData.k || 1).toFixed(3) + ") stands on z = 0 inside the deployed pose's box, which is the model's",
        Math.abs(bt.min.z) < e3 && Math.abs(bd.min.z) < e3 && bd.containsBox(bt.clone().expandByScalar(-e3)) &&
        Math.abs(ba.min.x - bd.min.x) < e3 && Math.abs(ba.max.x - bd.max.x) < e3 && Math.abs(UNIT_MODELS[k].len - (bd.max.x - bd.min.x)) < 0.05,
        "deploy x " + bd.min.x.toFixed(2) + ".." + bd.max.x.toFixed(2) + ", travel x " + bt.min.x.toFixed(2) + ".." + bt.max.x.toFixed(2) + " z0 " + bt.min.z.toFixed(3) + ", len " + UNIT_MODELS[k].len);
    var td = poseTris(root, true), tt = poseTris(root, false);
    chk(k + ": each pose within 9,000 triangles", td <= 9000 && tt <= 9000, "deploy " + td + ", travel " + tt);
  });

  /* ---------------- in play ---------------- */
  function pass(x, y) { return x > 1 && y > 1 && x < W - 2 && y < M.H - 2 && GameMap.passable(M, x, y, "ground") && !Game.tileBlocked(x, y, null); }
  function lonely(x, y, r) { var n = 0; Game.grid.query(x * TT + 16, y * TT + 16, r * TT, function (e) { if (!e.dead) n++; }); return n === 0; }
  var g = null;
  for (var y = 6; y < M.H - 6 && !g; y += 2) for (var x = 6; x + 20 < W - 6 && !g; x += 2) {
    var ok = true; for (var k = 0; k <= 20 && ok; k++) if (!pass(x + k, y) || !pass(x + k, y + 4)) ok = false;
    if (!ok || !lonely(x, y, 24) || !lonely(x + 20, y, 24)) continue;
    if (U.dist(x * TT, y * TT, P.homeX, P.homeY) < 30 * TT || U.dist(x * TT, y * TT, E.homeX, E.homeY) < 30 * TT) continue;
    g = { x: x, y: y };
  }
  if (!g) { chk("quiet ground", false, "none"); return; }
  function frames(n) { for (var i = 0; i < n; i++) { Game.tick(DT); Render.draw(DT, UI.input); } }
  Render.setCam((g.x + 8) * TT, g.y * TT);

  function drive(k, row) {
    var u = Game.spawnUnitAt(P, k, g.x * TT + 16, (g.y + row) * TT + 16);
    if (!u) { chk(k + ": spawned", false, ""); return null; }
    u.order = { type: "idle" }; u.orders = [];
    frames(2);
    var r = recOf(u);
    if (!r || !r.pose) { chk(k + ": drawn with its pose groups", false, r ? "no pose" : "no record"); return u; }
    chk(k + ": a new one stands packed up (travel pose, deploy hidden)", !u.deployed && r.march.visible && !r.pose.visible, "");
    u.give({ type: "move", x: (g.x + 12) * TT + 16, y: (g.y + row) * TT + 16 });
    var mv = 0, bad = 0, t;
    for (t = 0; t < 3000 && u.order.type === "move"; t++) {
      frames(1);
      if (u.moving) { mv++; if (!r.march.visible || r.pose.visible) bad++; }
    }
    chk(k + ": on the march, it shows the travel pose on every frame", mv > 20 && bad === 0 && u.order.type !== "move",
        mv + " moving frames, " + bad + " not packed up; arrived " + (u.order.type !== "move"));
    var dsec = u.def.deploySec || 1.6, early = 0;
    for (t = 0; t < Math.floor((dsec - 0.5) / DT); t++) { frames(1); if (r.pose.visible) early++; }
    chk(k + ": standing, it stays packed up until deploySec (" + dsec + " s) has run", early === 0 && !u.deployed, early + " early frames");
    frames(Math.ceil(1.5 / DT));
    chk(k + ": then it is set up: the deploy pose shown, the travel pose hidden",
        u.deployed && r.pose.visible && !r.march.visible, "deployed " + u.deployed);
    u.hp = u.maxHp * 0.12;                         // burning, for damage3d
    frames(3);
    var b1 = burnsOn(u, r.pose);
    chk(k + ": burning set up, its smoke and fire come off the launcher shown", b1.ok, b1.d);
    var inDep = false; for (var o = r.turret; o; o = o.parent) if (o === r.pose) inDep = true;
    u.tang = u.ang + 1.0;
    frames(1);
    chk(k + ": its turret is the deploy pose's and trains", inDep && Math.abs(r.turret.rotation.z + (u.tang - u.ang)) < 1e-6,
        "turret z " + (r.turret ? r.turret.rotation.z.toFixed(3) : "-"));
    u.give({ type: "move", x: (g.x + 2) * TT + 16, y: (g.y + row) * TT + 16 });
    for (t = 0; t < 30 && !u.moving; t++) frames(1);
    frames(1);
    chk(k + ": driven off it packs up at once", u.moving && !u.deployed && r.march.visible && !r.pose.visible, "");
    frames(2);
    var b2 = burnsOn(u, r.march);
    chk(k + ": burning on the march, its smoke and fire come off the convoy shown", u.moving && b2.ok, b2.d);
    u.deployed = true;                             // as a gun or ballistic launcher holds it on a move
    Render.draw(DT, UI.input);
    chk(k + ": a deploy flag held on the move is still drawn on the march", u.moving && r.march.visible && !r.pose.visible, "");
    u.deployed = false;
    u.hp = u.maxHp;
    return u;
  }
  var mine = [drive("pact_e50_s75", 0), drive("pact_e60_s125", 4)];

  /* models without the groups: every node's visibility as in the template */
  ["kpa_e60_sam", "mbt_p"].forEach(function (k, i) {
    var u = Game.spawnUnitAt(P, k, (g.x + 16) * TT + 16, (g.y + i * 4) * TT + 16);
    if (!u) { chk(k + ": spawned", false, ""); return; }
    u.order = { type: "idle" }; u.orders = [];
    frames(Math.ceil(((u.def.deploySec || 1.6) + 1.5) / DT));
    mine.push(u);
    var r = recOf(u), tpl = r && r.tpl;
    chk(k + " (no pose groups): no pose found, and its nodes shown exactly as its template's" + (u.def.deploy ? " after it deployed" : ""),
        r && !r.pose && !r.march && vis(r.inst) === vis(tpl) && (!u.def.deploy || u.deployed), "");
  });

  /* ghosts: an enemy S-75 seen set up, and one seen moving, then lost.
     Our units above would keep it in sight: they go first. */
  mine.forEach(function (u) { if (u && !u.dead) Combat.applyDamage(Game, u, 1e7, WEAPONS.gun_120, null); });
  frames(3);
  var eye = Game.spawnUnitAt(P, "recon_n", (g.x + 6) * TT + 16, (g.y + 9) * TT + 16);
  var es = Game.spawnUnitAt(E, "pact_e50_s75", (g.x + 6) * TT + 16, (g.y + 11) * TT + 16);
  if (!eye || !es) { chk("ghost units spawned", false, ""); return; }
  es.order = { type: "idle" }; es.orders = []; es.stance = "hold"; eye.stance = "hold";
  var ex = es.x, ey = es.y;
  for (var t2 = 0; t2 < Math.ceil(((es.def.deploySec || 1.6) + 2) / DT); t2++) { es.x = ex; es.y = ey; es.order = { type: "idle" }; frames(1); }
  var er = recOf(es);
  chk("an enemy S-75 in sight sets up and is drawn set up", es.deployed && er && er.pose && er.pose.visible, "deployed " + es.deployed);
  eye.x += TT * 16;
  frames(9);
  var gh = ghostFor(es.id), gd = gh && named(gh, "deploypose"), gt = gh && named(gh, "travelpose");
  chk("lost to the fog, it leaves a ghost set up, as last seen", !!gh && gd.visible && !gt.visible, gh ? "" : "no ghost");
  /* seen on the move */
  eye.x -= TT * 16;
  frames(9);
  es.give({ type: "move", x: es.x + TT * 4, y: es.y });
  for (t2 = 0; t2 < 30 && !es.moving; t2++) frames(1);
  frames(3);
  chk("seen again and driven off, it is drawn packed up", es.moving && recOf(es) && recOf(es).march.visible, "");
  eye.x += TT * 16;
  frames(9);
  gh = ghostFor(es.id); gd = gh && named(gh, "deploypose"); gt = gh && named(gh, "travelpose");
  chk("lost to the fog on the move, it leaves a ghost packed up", !!gh && !gd.visible && gt.visible, gh ? "" : "no ghost");
}
