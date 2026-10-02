/* tools/jsc/damage3d_check.js - the WebGL half of the damage-state checks.
   Run through damage3d_check.py, which loads index.html's scripts with
   three.js, the model packs and render3d.js, and a WebGLRenderer that keeps
   the scene graph and draws nothing. _behtest.html section [70] holds the
   half that needs no scene. Numbers printed here are what the report quotes.

   At a tree without js/damage3d.js this still runs: it prints what a damaged
   entity adds to the scene today, and the module checks fail. */
var PASS = 0, FAIL = 0;
function chk(name, cond, detail) {
  if (cond) PASS++; else FAIL++;
  print((cond ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : ""));
}
function log(s) { print(s); }
function ms(t0) { return ((preciseTime() - t0) * 1000); }

/* ---- deploy a real battle with the 3D renderer ---- */
(function () {
  var cv = document.getElementById("cv"), host = document.createElement("div");
  cv.parentElement = cv.parentNode = host;
})();
/* the page's own menu is filled in by main.js, so set the options the way
   _behtest.html does, after load: Hormuz, fog ON, the 3D renderer */
(function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20"); set("opt-cash", "200000");
  set("opt-seed", "dmg3d"); set("opt-fog", "1"); set("opt-3d", "1");
})();
window.IRONFRONT_SYNC_START = true;
var tDeploy = preciseTime();
try { document.getElementById("btn-start").click(); }
catch (e) { print("[deploy error] " + e + "\n" + e.stack); }
var three = Render3D.three, G = Game, P = G.human, E = G.players[1], DT = 1 / 30;
log("deployed " + G.map.name + " in " + (preciseTime() - tDeploy).toFixed(1) + "s, fog " + (G.fogEnabled ? "on" : "off") +
    ", 3D renderer " + (three && Render === Render3D ? "up" : "DOWN"));
if (!three) { print("==== 0 passed, 1 failed ===="); throw new Error("no 3D scene"); }
if (typeof AI !== "undefined" && AI.setPeace) AI.setPeace(E, true);
G.checkVictory = function () {};
P.cash = E.cash = 500000;
var D3 = (typeof Damage3D !== "undefined") ? Damage3D : null;
/* NOT "T": config.js owns a global T (the terrain enum), and a harness that
   overwrote it once turned every sea tile into land for the whole battle */
var PXM = 0.625, TS = CFG.TILE;

function draw(n, tick) { for (var i = 0; i < n; i++) { if (tick) G.tick(DT); Render3D.draw(DT, UI.input); } }
function sceneCount() { var n = 0; three.scene.traverse(function () { n++; }); return n; }
function layers() { var a = []; three.scene.traverse(function (o) { if (o.name && o.name.indexOf("damage3d.") === 0) a.push(o); }); return a; }
function grpOf(e) {
  var cx = e.kind === "building" ? (e.tx + e.def.w / 2) * TS * PXM : e.x * PXM;
  var cz = e.kind === "building" ? (e.ty + e.def.h / 2) * TS * PXM : e.y * PXM;
  var kids = three.scene.children;
  for (var i = 0; i < kids.length; i++) {
    var g = kids[i];
    if (g.type === "Group" && Math.abs(g.position.x - cx) < 0.01 && Math.abs(g.position.z - cz) < 0.01) return g;
  }
  return null;
}
function ids() { return D3 ? D3.stats().ids : []; }
function has(e) { return ids().indexOf(e.id) >= 0; }
function frac(e, f) { e.hp = e.maxHp * f; }
function idProbe() {
  return { o: new THREE.Object3D().id, g: new THREE.BufferGeometry().id, m: new THREE.Material().id };
}
function idDelta(a, b) { return { o: b.o - a.o - 1, g: b.g - a.g - 1, m: b.m - a.m - 1 }; }
function tileNear(px, py, kind, r0, r1) {
  var M = G.map, hx = (px / TS) | 0, hy = (py / TS) | 0;
  for (var r = r0; r <= r1; r++) for (var a = 0; a < 64; a++) {
    var an = a / 64 * 6.2832, x = (hx + Math.cos(an) * r) | 0, y = (hy + Math.sin(an) * r) | 0;
    if (x < 3 || y < 3 || x >= M.W - 3 || y >= M.H - 3) continue;
    if (GameMap.passable(M, x, y, kind) && !G.tileBlocked(x, y, null)) return { x: x, y: y };
  }
  return null;
}
/* The top of a drawn group's mesh at world (x, z): every triangle of every
   mesh, both faces, rotors, turrets and gun mounts left out (they turn, so
   no source is placed on them) - written separately from the module's own
   binned version so the two can be checked against each other. */
var _R = new THREE.Ray(), _A = new THREE.Vector3(), _B = new THREE.Vector3(), _C = new THREE.Vector3(), _Hp = new THREE.Vector3(), _Inv = new THREE.Matrix4();
function spinning(o, all) {
  while (o) {
    if (o.name === "rotor" || o.name === "rotordisc" || o.name === "tailrotor") return true;
    if (!all && (o.name === "turret" || o.name === "mountwrap")) return true;
    o = o.parent;
  }
  return false;
}
/* all = true: the turret and its gun count too (is the source under them?) */
function meshTop(g, x, z, all) {
  g.updateMatrixWorld(true);
  var best = -Infinity;
  g.traverse(function (o) {
    if (!o.isMesh || !o.geometry || !o.geometry.attributes.position || spinning(o, all)) return;
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
/* how far a source sits above the mesh right under it (m); NaN over bare air */
function clear(g, s) { var t = meshTop(g, s.x, s.z); return t === -Infinity ? NaN : s.y - t; }
function onSurface(g, s) { var c = clear(g, s); return c > 0 && c < 0.6; }
function unitAt(pl, id, t, dx, dy) { return G.spawnUnitAt(pl, id, (t.x + (dx || 0)) * TS + 16, (t.y + (dy || 0)) * TS + 16); }
function freeRect(t, w, h) {
  for (var r = 0; r < 20; r++) for (var a = 0; a < 32; a++) {
    var x = (t.x + Math.cos(a / 32 * 6.2832) * r) | 0, y = (t.y + Math.sin(a / 32 * 6.2832) * r) | 0, ok = true;
    for (var yy = 0; yy < h && ok; yy++) for (var xx = 0; xx < w && ok; xx++)
      if (!GameMap.passable(G.map, x + xx, y + yy, "ground") || G.tileBlocked(x + xx, y + yy, null)) ok = false;
    if (ok) return { x: x, y: y };
  }
  return null;
}

/* ============ the scenario ============ */
var land = tileNear(P.homeX, P.homeY, "ground", 8, 40), sea = tileNear(P.homeX, P.homeY, "sea", 4, 220);
var tank = unitAt(P, "mbt_n", land, 0, 0), tank2 = unitAt(P, "mbt_n", land, 2, 2), truck = unitAt(P, "supply_n", land, 3, 0),
    jet = unitAt(P, "fighter_n", land, -3, 0), helo = unitAt(P, "helo_n", land, 0, -3), sq = unitAt(P, "rifle_n", land, -2, 2);
var ship = sea ? unitAt(P, "destroyer_n", sea, 0, 0) : null;
var bspot = freeRect({ x: land.x + 5, y: land.y + 5 }, 3, 3);
var pow = bspot ? G.placeBuilding(P, "power", bspot.x, bspot.y, true) : null;
var bspot2 = freeRect({ x: land.x - 6, y: land.y + 5 }, 3, 3);
var fac = bspot2 ? G.placeBuilding(P, "factory", bspot2.x, bspot2.y, true) : null;
var foe = unitAt(E, "mbt_p", land, 4, 3);
log("scenario: land " + JSON.stringify(land) + " sea " + JSON.stringify(sea) + "; units " +
    [tank, tank2, truck, jet, helo, sq, ship, foe].filter(Boolean).length + "/8, buildings " + [pow, fac].filter(Boolean).length + "/2");
for (var q0 = 0; q0 < G.entities.length; q0++) { var e0 = G.entities[q0]; if (e0.order && e0.owner === P) e0.give && e0.give({ type: "guard" }); }
Render3D.setCam(tank.x, tank.y);
G.recomputeFog();                       // the new arrivals' own sight
draw(3, false);

/* ============ 0. what happens today ============ */
log("\n[0] WHAT A DAMAGED ENTITY ADDS TO THE SCENE");
var healthy = sceneCount();
var list0 = [tank, truck, jet, helo, pow, fac];
for (var i0 = 0; i0 < list0.length; i0++) if (list0[i0]) frac(list0[i0], 0.2);
draw(30, false);
var damaged = sceneCount();
var parts = D3 ? D3.stats() : null;
log("  six entities at 20% health: scene objects " + healthy + " healthy -> " + damaged + " damaged (" +
    (damaged - healthy) + " added); particles " + (parts ? parts.smoke + " smoke + " + parts.glow + " fire/sparks from " + parts.emitters + " emitters" : "none (no module)"));
chk("a damaged entity is drawn differently from a healthy one", !!parts && parts.smoke > 0 && parts.emitters >= 5,
    parts ? parts.emitters + " emitters" : "identical: nothing marks the damage");
if (!D3) { log("\n==== " + PASS + " passed, " + FAIL + " failed ===="); throw new Error("stop: baseline only"); }

/* ============ 1. the layers ============ */
log("\n[1] TWO POOLED LAYERS, MADE ONCE");
var L1 = layers();
chk("exactly two particle layers in the scene, both THREE.Points",
    L1.length === 2 && L1[0].isPoints && L1[1].isPoints, L1.map(function (o) { return o.name; }).join(", "));
var arrPos = L1[0].geometry.attributes.position.array, uu = L1.map(function (o) { return o.uuid; }).join();
chk("the layer adds no objects when damage appears: " + (damaged - healthy) + " added",
    damaged - healthy === 0, "the layers were already there, empty and hidden");
var sv = { vertexShader: THREE.ShaderLib.points.vertexShader };
D3.patchPoints(sv);
chk("the size patch lands in three.js r" + THREE.REVISION + "'s own points shader, once each",
    sv.vertexShader.split("attribute float psize;").length === 2 && sv.vertexShader.split("gl_PointSize = size * psize;").length === 2 &&
    sv.vertexShader.indexOf("gl_PointSize = size;") < 0, "");
chk("and it has its own program key, so the sandstorm dust keeps the stock shader",
    L1[0].material.customProgramCacheKey() !== new THREE.PointsMaterial().customProgramCacheKey(),
    L1[0].material.customProgramCacheKey());
chk("colour carries alpha (4 components) and size is per point",
    L1[0].geometry.attributes.color.itemSize === 4 && L1[0].geometry.attributes.psize.itemSize === 1 && L1[0].material.vertexColors, "");

/* ============ 2. the right entities ============ */
log("\n[2] EMITTERS ONLY ON THE RIGHT ENTITIES");
frac(sq, 0.05); frac(tank2, 1);
draw(2, false);
chk("the damaged tank, truck, jet, gunship, power plant and factory each carry one",
    has(tank) && has(truck) && has(jet) && has(helo) && (!pow || has(pow)) && (!fac || has(fac)), ids().join(","));
chk("the rifle squad at 5% does not, nor the healthy tank", !has(sq) && !has(tank2), "");
/* fog: the enemy tank sits among our units, so it is in sight. It burns for
   two seconds first, so there is smoke in the air to lose - render3d takes a
   fogged enemy's mesh out of the scene BEFORE the damage module runs, and
   the first version, which asked "is it drawn" before "is it seen", let that
   smoke stand over the fog for 4 s (38 particles, 124 frames, measured). */
frac(foe, 0.2);
draw(60, false);
var fIx = foe.ty * G.map.W + foe.tx, fsave = G.fog[fIx], foeBefore = D3.owned(foe.id);
chk("an enemy tank in sight, burning, smokes", has(foe) && foeBefore > 20, "fog " + fsave + ", " + foeBefore + " particles");
G.fog[fIx] = 1;
draw(1, false);
chk("the same tank on a fogged tile is not drawn, carries nothing, and its smoke is gone the same frame",
    !grpOf(foe) && !has(foe) && D3.owned(foe.id) === 0,
    "drawn " + !!grpOf(foe) + ", particles " + foeBefore + " -> " + D3.owned(foe.id));
G.fog[fIx] = fsave;
draw(60, false);
/* the view moves off it first (its emitter goes, its smoke is left to thin
   out, as it should be) and THEN it goes under fog */
var foeLeft = D3.owned(foe.id), camFar = tileNear(G.players[1].homeX, G.players[1].homeY, "ground", 2, 30) || { x: 5, y: 5 };
Render3D.setCam(camFar.x * TS, camFar.y * TS);
draw(2, false);
var afterPan = D3.owned(foe.id);
G.fog[fIx] = 1;
draw(1, false);
var afterFog = D3.owned(foe.id);
chk("looked away from, its smoke thins out by itself; gone under fog as well, the rest goes at once",
    !has(foe) && afterPan > 0 && afterFog === 0, foeLeft + " particles, " + afterPan + " after the pan, " + afterFog + " after the fog");
G.fog[fIx] = fsave;
Render3D.setCam(tank.x, tank.y);
draw(2, false);
/* a remembered enemy building: drawn by render3d at fog 1, but not smoking */
var espot = freeRect({ x: land.x + 10, y: land.y - 6 }, 3, 3);
var efac = espot ? G.placeBuilding(E, "barracks", espot.x, espot.y, true) : null;
if (efac) {
  frac(efac, 0.3);
  var saved = [];
  for (var yy = 0; yy < 2; yy++) for (var xx = 0; xx < 2; xx++) { var ix = (efac.ty + yy) * G.map.W + efac.tx + xx; saved.push(G.fog[ix]); G.fog[ix] = 1; }
  draw(2, false);
  var drawn = !!grpOf(efac);
  chk("an enemy building remembered under fog is drawn, but gives off no live smoke", drawn && !has(efac),
      "drawn " + drawn + ", emitter " + has(efac));
  for (var yy2 = 0, k2 = 0; yy2 < 2; yy2++) for (var xx2 = 0; xx2 < 2; xx2++) G.fog[(efac.ty + yy2) * G.map.W + efac.tx + xx2] = 2;
  draw(2, false);
  chk("...in sight, it does", has(efac), "");
  for (var yy3 = 0, k3 = 0; yy3 < 2; yy3++) for (var xx3 = 0; xx3 < 2; xx3++) G.fog[(efac.ty + yy3) * G.map.W + efac.tx + xx3] = saved[k3++];
}

/* ============ 3. where it burns, on the actual models ============ */
log("\n[3] WHERE IT BURNS, MEASURED ON THE MESH");
function along(e, a) { return (a.x - e.x * PXM) * Math.cos(e.ang) + (a.z - e.y * PXM) * Math.sin(e.ang); }
/* "on the surface" = 0 to 0.6 m above the mesh straight under the source,
   read off the drawn group by a ray against every triangle */
var at = D3.anchors(tank.id), gT = grpOf(tank);
var engT = at && at.srcs[0];
chk("tank: the engine deck is behind the turret, ON the hull top",
    engT && along(tank, engT) < -0.2 * at.L && onSurface(gT, engT),
    engT ? "along-heading " + along(tank, engT).toFixed(1) + " m of a " + at.L.toFixed(1) + " m model, " +
    (engT.y - gT.position.y).toFixed(2) + " m up, " + clear(gT, engT).toFixed(2) + " m clear of the deck" : "none");
var aj = D3.anchors(jet.id), nz = aj && aj.srcs[0];
chk("jet: at the tail nozzle", nz && along(jet, nz) < -0.35 * aj.L, nz ? along(jet, nz).toFixed(1) + " m of " + aj.L.toFixed(1) : "none");
var ah = D3.anchors(helo.id), gH = grpOf(helo);
chk("gunship: the engines aft of the mast and the gearbox under it, both ON the airframe",
    ah && ah.srcs.length === 2 && ah.srcs[1].active && onSurface(gH, ah.srcs[0]) && onSurface(gH, ah.srcs[1]) && ah.srcs[1].y > ah.srcs[0].y,
    ah ? "engine " + (ah.srcs[0].y - gH.position.y).toFixed(2) + " m up (" + clear(gH, ah.srcs[0]).toFixed(2) + " clear), gearbox " +
    (ah.srcs[1].y - gH.position.y).toFixed(2) + " m up (" + clear(gH, ah.srcs[1]).toFixed(2) + " clear)" : "none");
function bldReport(b, a) {
  var g = grpOf(b);
  return a.srcs.map(function (s) {
    var t = meshTop(g, s.x, s.z);
    return s.what + (s.active ? "*" : "") + " " + (s.y - g.position.y).toFixed(1) + " m, mesh " + (t === -Infinity ? "none" : (t - g.position.y).toFixed(1));
  }).join("; ");
}
/* a roof fire on a real roof; the wall-foot fire on bare ground with a wall
   beside it; nothing hanging in the air and nothing buried in a wall */
function bldOk(b, a) {
  var g = grpOf(b), y0 = g.position.y;
  return a.srcs.every(function (s) {
    if (s.what === "footprint") {
      var t = meshTop(g, s.x, s.z), wall = -Infinity;
      for (var k = 0; k < 8; k++) wall = Math.max(wall, meshTop(g, s.x + Math.cos(k * 0.785) * 2.5, s.z + Math.sin(k * 0.785) * 2.5));
      return t < y0 + 1.5 && s.y < y0 + 1.5 && wall > y0 + 3;
    }
    if (s.what === "roof") return onSurface(g, s) && s.y > y0 + 3;
    return onSurface(g, s);
  });
}
var ap = pow && D3.anchors(pow.id);
chk("power plant: a roof fire ON the turbine hall roof, one at a wall's foot, and the transformer yard sparking at 20%",
    ap && ap.srcs.some(function (s) { return s.what === "switchgear" && s.active; }) && ap.srcs.some(function (s) { return s.what === "roof"; }) && bldOk(pow, ap),
    ap ? bldReport(pow, ap) : "none");
var af = fac && D3.anchors(fac.id);
chk("factory (3x3): four sources, all burning at 20%, every one on the mesh", af && af.srcs.length === 4 && af.srcs.every(function (s) { return s.active; }) && bldOk(fac, af),
    af ? bldReport(fac, af) : "none");
/* the vehicles whose engine is not where their role puts it, and the
   self-propelled guns whose laid barrel used to drag the source off the bow */
var odd = [["spg_p", "rear", "2S19 Msta-S on the T-80 hull"], ["spg_n", "front", "M109: engine front right"],
           ["ifv_p", "rear", "BMP-3"], ["recon_p", "rear", "BRDM-2"], ["lt_n", "front", "Stryker MGS"],
           ["spaag_n", "front", "M-SHORAD on the Stryker A1"]];
var oddRows = [], oddOk = true;
for (var o3 = 0; o3 < odd.length; o3++) {
  var uo = unitAt(P, odd[o3][0], land, -4 + o3 * 3, 7);
  if (!uo) { oddOk = false; oddRows.push(odd[o3][0] + " not spawned"); continue; }
  uo.ang = 0.7; uo.tang = 0.7; frac(uo, 0.2);
  Render3D.setCam(uo.x, uo.y); draw(3, false);
  var ao = D3.anchors(uo.id), go = grpOf(uo), so = ao && ao.srcs[0];
  var alo = so ? along(uo, so) : 0, over = so ? meshTop(go, so.x, so.z, true) - so.y : 0;
  /* on the hull, at the right end, and not under the turret or the gun
     laid over the front deck */
  var ok = !!so && ao.cls === odd[o3][1] && onSurface(go, so) && over <= 0.05 && (odd[o3][1] === "rear" ? alo < -0.15 * ao.L : alo > 0.1 * ao.L);
  if (!ok) oddOk = false;
  oddRows.push(odd[o3][0] + " " + (ao ? ao.cls : "?") + " " + alo.toFixed(1) + " m along" + (so && Math.abs(so.local.z) > 0.5 ? ", " + so.local.z.toFixed(1) + " m right" : "") +
               ", " + (so ? clear(go, so).toFixed(2) : "?") + " clear" + (over > 0.05 ? ", UNDER the turret by " + over.toFixed(1) + " m" : ""));
  uo.dead = true; draw(1, false);
}
chk("each vehicle burns where ITS engine is, on its own hull - not on the gun", oddOk, oddRows.join("; "));
Render3D.setCam(tank.x, tank.y);
draw(2, false);
/* the jet in flight: its smoke is left behind it as a trail */
var jx0 = jet.x, jy0 = jet.y;
jet.parked = false;
jet.give({ type: "move", x: jet.x + 32 * 30, y: jet.y });
Render3D.setCam(jet.x + 32 * 10, jet.y);
draw(75, true);
var gJ = grpOf(jet), flew = Math.hypot(jet.x - jx0, jet.y - jy0) * PXM;
var trail = gJ ? D3.reach(jet.id, gJ.position.x, gJ.position.z) : 0;
chk("a damaged jet in flight trails its smoke behind it", has(jet) && flew > 80 && trail > 60,
    "flew " + flew.toFixed(0) + " m in 2.5 s; smoke reaches " + trail.toFixed(0) + " m back (" + D3.owned(jet.id) + " puffs)");
var tr = D3.reach(tank.id, tank.x * PXM, tank.y * PXM);
chk("...while a standing tank's column stays over it", tr > 0 && tr < 45, "reach " + tr.toFixed(1) + " m");
Render3D.setCam(tank.x, tank.y);
draw(2, false);

/* ============ 4. the ship: hit side, list, sink ============ */
log("\n[4] A HOLED SHIP LISTS TOWARD THE HOLE AND SETTLES");
if (ship) {
  Render3D.setCam(ship.x, ship.y);
  draw(2, false);
  var gS = grpOf(ship);
  var rx0 = gS.rotation.x, y0 = gS.position.y;
  /* the shot came from the ship's right-hand side as it heads */
  var ca = Math.cos(ship.ang), sa = Math.sin(ship.ang);
  ship.lastHitBy = { x: ship.x - sa * 300, y: ship.y + ca * 300 };
  /* where it burns, read against the hull while it still floats level (at
     stage 1 it does not list yet; a 6 degree list later leans a 15 m mast
     1.6 m over the deckhouse, which says nothing about the placement) */
  frac(ship, 0.65);
  draw(1, false);
  var as4 = D3.anchors(ship.id);
  chk("the hole's fire sits ON the deck edge and the superstructure's ON the deckhouse roof, not in the air or inside the ship",
      as4 && onSurface(gS, as4.srcs[0]) && onSurface(gS, as4.srcs[1]) && as4.srcs[1].y > as4.srcs[0].y + 3,
      as4 ? "hit area " + clear(gS, as4.srcs[0]).toFixed(2) + " m clear, superstructure " + clear(gS, as4.srcs[1]).toFixed(2) + " m clear, " +
      (as4.srcs[1].y - gS.position.y).toFixed(1) + " m up" : "none");
  frac(ship, 1);
  draw(1, false);
  frac(ship, 0.35);
  draw(1, false);
  var as2 = D3.anchors(ship.id);
  chk("the hit area is on the side the shot came from", as2 && as2.side === 1 && as2.srcs[0].local.z > 0,
      as2 ? "side " + as2.side + ", z " + as2.srcs[0].local.z.toFixed(1) + " m of a " + as2.W.toFixed(1) + " m beam" : "none");
  /* the hole's fire is on the deck near its edge - the deck narrows toward
     the bow, and the source stays a ray-width inboard of the rail - and the
     superstructure's is on a deckhouse roof in the middle of the ship */
  chk("hit area near the deck edge, superstructure amidships above it",
      as2 && as2.srcs[0].local.z > 0.2 * as2.W && as2.srcs[1].what === "superstructure" &&
      as2.srcs[1].local.y > as2.srcs[0].local.y + 3 && Math.abs(as2.srcs[1].local.x) < 0.2 * as2.L,
      as2 ? "hit " + as2.srcs[0].local.z.toFixed(1) + " m off the centreline of a " + as2.W.toFixed(1) + " m beam, " + as2.srcs[0].local.y.toFixed(1) +
      " m up; superstructure " + as2.srcs[1].local.x.toFixed(1) + " m along a " + as2.L.toFixed(1) + " m hull, " + as2.srcs[1].local.y.toFixed(1) + " m up" : "");
  var rx2 = gS.rotation.x - rx0;
  chk("at 35% it lists about 2 degrees toward the hole", Math.abs(rx2 - 0.035) < 0.002, (rx2 * 57.3).toFixed(2) + " deg");
  frac(ship, 0.15);
  draw(30, false);
  var rx3 = gS.rotation.x - rx0;
  chk("worse hit it floods further - slowly, not in one jump", rx3 > 0.05 && rx3 < 0.08, (rx3 * 57.3).toFixed(2) + " deg after 1 s");
  draw(90, false);
  var rx4 = gS.rotation.x - rx0, sink = y0 - gS.position.y;
  chk("...settling at about 6 degrees, lower in the water", Math.abs(rx4 - 0.105) < 0.003 && sink > 0.2,
      (rx4 * 57.3).toFixed(2) + " deg, down " + sink.toFixed(2) + " m of a " + as2.H.toFixed(1) + " m model");

  frac(ship, 1);
  draw(1, false);
  chk("repaired, it rides upright again and stops smoking", Math.abs(gS.rotation.x - rx0) < 1e-9 && !has(ship), "");
  Render3D.setCam(tank.x, tank.y);
  draw(2, false);
} else chk("a sea tile for the destroyer", false, "none near home");

/* ============ 5. repair, death, off screen ============ */
log("\n[5] REPAIR, DEATH, OFF SCREEN");
frac(tank, 0.8);
draw(1, false);
chk("repaired above 70%, the tank's emitter goes at once", !has(tank), "");
draw(150, false);
chk("and five seconds later none of its smoke is left", D3.owned(tank.id) === 0, D3.owned(tank.id) + " particles");
frac(tank, 0.2);
truck.dead = true;
draw(2, false);
chk("a dead truck carries nothing", !has(truck), "");
var far = tileNear(G.players[1].homeX, G.players[1].homeY, "ground", 2, 30) || { x: 5, y: 5 };
Render3D.setCam(far.x * TS, far.y * TS);
draw(2, false);
chk("looking elsewhere: no emitters at all", D3.stats().emitters === 0, D3.stats().emitters + " emitters");
Render3D.setCam(tank.x, tank.y);
draw(2, false);
chk("looking back: they return", D3.stats().emitters >= 4, D3.stats().emitters + " emitters");

/* ============ 6. a scripted battle ============ */
log("\n[6] A SCRIPTED BATTLE: 8 v 8 TANKS, 40 SECONDS");
var bt = tileNear(tank.x, tank.y, "ground", 10, 30), ours = [], theirs = [];
for (var b1 = 0; b1 < 8; b1++) { var u1 = unitAt(P, "mbt_n", bt, (b1 % 4) - 2, (b1 / 4) | 0); if (u1) { ours.push(u1); frac(u1, 0.5 + 0.06 * b1); } }
var bt2 = { x: bt.x + 7, y: bt.y };
for (var b2 = 0; b2 < 8; b2++) { var u2 = unitAt(E, "mbt_p", bt2, (b2 % 4) - 2, (b2 / 4) | 0); if (u2) { theirs.push(u2); frac(u2, 0.5 + 0.06 * b2); } }
G.recomputeFog();
Render3D.setCam(bt.x * TS + 110, bt.y * TS);
draw(2, false);
var probeA = idProbe(), base = sceneCount(), samples = [], wrong = [], diedWith = 0, diedClean = 0, peakS = 0, peakG = 0, peakE = 0;
var hadEm = {}, unseenFrames = 0, unseenMax = 0, hiddenBurning = 0;
for (var f6 = 0; f6 < 1200; f6++) {
  /* at 17 s our side's tanks are all knocked out, and nothing else of ours
     is in sight range of theirs: the burning enemy drops into the fog. At 28 s
     a fresh platoon rolls up and it is in sight again. */
  if (f6 === 500) { for (var m6 = 0; m6 < ours.length; m6++) ours[m6].dead = true; G.sweepDead(); G.recomputeFog(); }
  if (f6 === 850) {
    for (var m7 = 0; m7 < 6; m7++) { var u8 = unitAt(P, "mbt_n", bt, (m7 % 3) - 1, (m7 / 3) | 0); if (u8) ours.push(u8); }
    G.recomputeFog();
  }
  G.tick(DT); Render3D.draw(DT, UI.input);
  var s6 = D3.stats();
  /* smoke or fire of a LIVING enemy the player cannot see right now */
  var hid = 0;
  for (var h6 = 0; h6 < theirs.length; h6++) if (!theirs[h6].dead && !D3.seen(theirs[h6], G)) hid += D3.owned(theirs[h6].id);
  if (hid) { unseenFrames++; if (hid > unseenMax) unseenMax = hid; }
  for (var h7 = 0; h7 < theirs.length; h7++) if (!theirs[h7].dead && D3.stageOf(theirs[h7]) && !D3.seen(theirs[h7], G)) { hiddenBurning++; break; }
  if (s6.smoke > peakS) peakS = s6.smoke; if (s6.glow > peakG) peakG = s6.glow; if (s6.emitters > peakE) peakE = s6.emitters;
  /* every emitter must belong to a live, damaged, burnable entity in sight */
  for (var j6 = 0; j6 < s6.ids.length; j6++) {
    var ent = null;
    for (var k6 = 0; k6 < G.entities.length; k6++) if (G.entities[k6].id === s6.ids[j6]) { ent = G.entities[k6]; break; }
    if (!ent || ent.dead || !D3.stageOf(ent) || !D3.eligible(ent) || !D3.seen(ent, G)) wrong.push(s6.ids[j6]);
    else hadEm[ent.id] = ent;
  }
  for (var id6 in hadEm) if (hadEm[id6].dead) { if (s6.ids.indexOf(+id6) >= 0) diedWith++; else diedClean++; delete hadEm[id6]; }
  if (f6 % 150 === 0) samples.push(sceneCount() + "/" + layers().length + "/" + s6.emitters + "/" + s6.smoke + "+" + s6.glow);
}
var probeB = idProbe(), dAll = idDelta(probeA, probeB);
var deadO = ours.filter(function (u) { return u.dead; }).length, deadT = theirs.filter(function (u) { return u.dead; }).length;
log("  losses " + deadO + " ours (the first eight all at 17 s, by the script), " + deadT + " theirs; samples every 5 s (scene objects / damage layers / emitters / smoke+glow):");
log("    " + samples.join("  "));
log("  THREE objects created by the whole game in those 40 s: " + dAll.o + " Object3D, " + dAll.g + " geometries, " + dAll.m + " materials");
chk("the fight did damage", deadO + deadT > 0 || peakE > 4, "peak " + peakE + " emitters");
chk("the damage layers stayed two objects the whole time", layers().length === 2 && layers().map(function (o) { return o.uuid; }).join() === uu, "");
chk("the pools never went past their caps", peakS <= D3.SMOKE_CAP && peakG <= D3.GLOW_CAP,
    "peak smoke " + peakS + "/" + D3.SMOKE_CAP + ", fire+sparks " + peakG + "/" + D3.GLOW_CAP);
chk("no emitter ever sat on a dead, healthy, unburnable or unseen entity", wrong.length === 0, wrong.length + " frames wrong");
chk("a burning tank that died lost its emitter the same frame", diedWith === 0, diedClean + " died clean, " + diedWith + " kept one");
chk("no frame drew smoke or fire belonging to a living enemy the player could not see", unseenFrames === 0 && hiddenBurning > 30,
    unseenFrames + " frames, at most " + unseenMax + " particles; " + hiddenBurning + " frames had a damaged enemy out of sight");
chk("the layer arrays are the same typed arrays they were made with",
    layers()[0].geometry.attributes.position.array === arrPos, "");
/* stand the battle down: repair everything and watch the smoke clear */
for (var r6 = 0; r6 < G.entities.length; r6++) { var e6 = G.entities[r6]; if (e6.maxHp) e6.hp = e6.maxHp; }
AI.setPeace(E, true);
for (var c6 = 0; c6 < G.entities.length; c6++) { var e7 = G.entities[c6]; if (e7.owner && e7.give && e7.kind === "unit") { try { e7.give({ type: "hold" }); } catch (err) {} } }
draw(200, false);
var sc = D3.stats();
chk("everything repaired: seven seconds on, no emitter or particle is left",
    sc.emitters === 0 && sc.smoke === 0 && sc.glow === 0, sc.emitters + " / " + sc.smoke + " / " + sc.glow);

/* ============ 7. steady state: nothing made per frame ============ */
log("\n[7] STEADY STATE");
/* the production path: the same ents map render3d hands over */
var entsMap = null, real = Damage3D.frame;
Damage3D.frame = function (t, g, dt, ents) { entsMap = ents; return real.apply(this, arguments); };
Render3D.setCam(bt.x * TS, bt.y * TS);
var heavy = [];
for (var h7 = 0; h7 < 40; h7++) { var u7 = unitAt(P, "mbt_n", bt, (h7 % 8) - 4, ((h7 / 8) | 0) - 2); if (u7) { heavy.push(u7); frac(u7, 0.1); } }
for (var h8 = 0; h8 < ours.length; h8++) if (!ours[h8].dead) frac(ours[h8], 0.1);
draw(3, false);
Damage3D.frame = real;
for (var w7 = 0; w7 < 200; w7++) real(three, G, DT, entsMap);
var st7 = D3.stats();
log("  " + st7.emitters + " burning tanks in view, pools " + st7.smoke + "/" + D3.SMOKE_CAP + " smoke, " + st7.glow + "/" + D3.GLOW_CAP + " fire+sparks");
var p7a = idProbe();
var times = [];
for (var rep = 0; rep < 5; rep++) {
  var t7 = preciseTime();
  for (var f7 = 0; f7 < 300; f7++) real(three, G, DT, entsMap);
  times.push(ms(t7) / 300);
}
var p7b = idProbe(), d7 = idDelta(p7a, p7b);
times.sort(function (a, b) { return a - b; });
chk("1,500 frames at the cap create no THREE object, geometry or material", d7.o === 0 && d7.g === 0 && d7.m === 0,
    d7.o + " / " + d7.g + " / " + d7.m);
log("  Damage3D.frame at the cap: median " + times[2].toFixed(3) + " ms, range " + times[0].toFixed(3) + "-" + times[4].toFixed(3) +
    " ms over 5 reps of 300 frames (jsc, shared machine)");
chk("and it costs well under a millisecond a frame", times[2] < 1.0, times[2].toFixed(3) + " ms");
if (__ALLOC) {
  /* the collector is off in this mode, so the heap can only grow */
  for (var w8 = 0; w8 < 300; w8++) real(three, G, DT, entsMap);
  var h0 = heapCapacity();
  for (var f8 = 0; f8 < 3000; f8++) real(three, G, DT, entsMap);
  var h1 = heapCapacity();
  var tA = heapCapacity(), junk = 0;
  for (var f9 = 0; f9 < 3000; f9++) { var o9 = { f: f9, a: [f9] }; junk += o9.a.length; }
  var tB = heapCapacity();
  log("  heap growth over 3,000 frames with the collector off: " + (h1 - h0) + " bytes (" + ((h1 - h0) / 3000).toFixed(2) +
      " per frame); the same loop making one small object and one array a frame grows it " + (tB - tA) + " bytes");
  chk("no heap allocation in the damage module's steady state", (h1 - h0) / 3000 < 8, ((h1 - h0) / 3000).toFixed(2) + " bytes/frame");
}
var full = 0;
for (var f10 = 0; f10 < 60; f10++) { var tt = preciseTime(); Render3D.draw(DT, UI.input); full += ms(tt); }
log("  a whole Render3D.draw at the cap, stubbed GL: " + (full / 60).toFixed(2) + " ms mean over 60 frames");

log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
