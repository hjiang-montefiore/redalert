/* tools/jsc/wellgate3d_check.js - a well deck's stern gate swings down while
   a landing craft drives through it, checked on the REAL renderer under
   JavaScriptCore.

     python3 tools/jsc/scene3d.py tools/jsc/wellgate3d_check.js

   (owner) "Can the gate open and see the craft in and out?" The game drives
   a craft out of a ship's well and back in through her stern gate
   (js/entities.js WELL TRANSIT) and keeps how far the gate is open
   (gateT); render3d.js swingGates turns a model's "wellgate" node by it,
   rotation.y 0 shut to 1.45 rad open, and a "bowramp" node by rampHold.
   THE MODEL CONTRACT, for each hero that draws a gate: the node hinged at
   the gate's foot, swung aft and down at +1.45; root userData.wellExit (the
   sill) and wellInner (the first berth, mid-well), model metres, agreeing with the
   game's own def.wellPts (js/eras.js WHERE THE WELL LIES IN HER HULL).
   Checked:
     1. every well-deck ship's model: a hero with the node and points obeys
        the contract (the gate swings aft of its hinge and down; the sill
        within 3 m of the game's, on her centreline; the first berth inside
        the well; both within a quarter of a tile where the game puts them
        on her drawn hull); one without them is listed;
     2. a stub hero (registered here for the Mistral, fra_e00_lhd) with the
        node and points: its gate is shut at rest and its hinge lies on the
        game's sill, in the world, to a quarter of a tile; launched, the gate
        reaches 1.45 rad while the craft are inside and is back at 0 when
        they are clear and the gate is shut; a craft inside her is drawn
        (her gate is there to see it through);
     3. the live Wasp (nato_e00_lhd): with her rebuilt hero's node, as 2;
        and the Tarawa (nato_e80_lha), whose model has no "wellgate": nothing
        on her model moves or hides, and a craft inside her is not drawn
        until it has passed her sill - it appears at her stern as it always
        did (if the Tarawa gains a gate, as 2);
     4. a ship with no well (the America) has no gate record and is
        untouched by the launch beside her;
     5. a stub Ivan Rogov (pact_e80_lpd) with a "bowramp" node: putting a
        tank on a beach she lowers it to 1.45 rad and raises it again;
     6. THE CRAFT TO HER PROPORTION (render3d.js wellScale): in every gated
        hero - Tarawa, Wasp (e90 and e00), Mistral (lhd_f), Type 075,
        Ivan Rogov (pact_e90_lpd) - each craft her well takes, launched:
        drawn at her scale, its box at its berth and as its middle crosses
        her sill inside her well (aft of its forward end and, at the berth,
        forward of the sill; inside its walls; under the deck over it, by
        rays through her model), the gate not inside that box; on its run
        to its water it grows back to its game length, within 1% of it on
        the last frame of the run and exactly it once free, never more than
        STEP of its game length in a frame; recovered from six tiles astern
        the same in reverse: at its game length when sent in, shrinking
        frame by frame as it comes up to her stern and glides to her sill,
        at her scale from there to its berth, inside the well at the sill
        and the berth. A craft wider than her well (her own craft is not
        modelled and a wider one stands in) can fit no proportion: it is
        listed, held centred between her walls and otherwise as above;
     7. a ship whose model has no gate (a stub, pact_e00_lpd): her craft is
        not drawn inside her and is drawn at its game size whenever it is,
        out and back in. */
var TT = 32, PASS = 0, FAIL = 0, DT = 1 / 30, H = null;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }

/* render3d hands Impact3D its record lookup, as deploypose_check.js borrows it */
(function () {
  if (typeof Impact3D === "undefined") return;
  var ii = Impact3D.init;
  Impact3D.init = function (T3, th, G, h) { H = h; return ii.apply(this, arguments); };
})();

/* the stub hero: a 199-metre box with the gate at its transom, built to the
   contract (its holder turned half round so +rotation.y swings it aft) */
var ORIG = {};
["nato_e80_lha", "nato_e90_lhd", "nato_e00_lhd", "fra_e00_lhd", "lhd_f", "lhd_c", "pact_e80_lpd", "pact_e90_lpd", "pact_e00_lpd"]
  .forEach(function (id) { ORIG[id] = typeof UNIT_MODELS !== "undefined" ? UNIT_MODELS[id] : undefined; });
UNIT_MODELS.fra_e00_lhd = { len: 199, build: function (T3) {
  var root = new T3.Group(), m = new T3.MeshStandardMaterial({ color: 0x8090a0 });
  var hull = new T3.Mesh(new T3.BoxGeometry(199, 28, 20), m); hull.position.set(0, 0, 4); root.add(hull);
  var hold = new T3.Group(); hold.position.set(-99.5, 0, 0.5); hold.rotation.z = Math.PI; root.add(hold);
  var gate = new T3.Group(); gate.name = "wellgate"; hold.add(gate);
  var leaf = new T3.Mesh(new T3.BoxGeometry(0.5, 15, 9), m); leaf.position.set(0, 0, 4.5); gate.add(leaf);
  root.userData.wellExit = { x: -99.5, y: 0, z: 0.5 };
  root.userData.wellInner = { x: -99.5 + 57.5 / 2, y: 0, z: 1 };
  return root;
} };
UNIT_MODELS.pact_e80_lpd = { len: 157, build: function (T3) {
  var root = new T3.Group(), m = new T3.MeshStandardMaterial({ color: 0x7a8a7a });
  var hull = new T3.Mesh(new T3.BoxGeometry(157, 24, 16), m); hull.position.set(0, 0, 3); root.add(hull);
  var ramp = new T3.Group(); ramp.name = "bowramp"; ramp.position.set(78.5, 0, 0.5); root.add(ramp);
  var leaf = new T3.Mesh(new T3.BoxGeometry(0.5, 8, 7), m); leaf.position.set(0, 0, 3.5); ramp.add(leaf);
  return root;
} };
/* and one with a well and no gate (7): her hull alone */
UNIT_MODELS.pact_e00_lpd = { len: 157, build: function (T3) {
  var root = new T3.Group(), m = new T3.MeshStandardMaterial({ color: 0x6a7a6a });
  var hull = new T3.Mesh(new T3.BoxGeometry(157, 24, 16), m); hull.position.set(0, 0, 3); root.add(hull);
  return root;
} };

window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e00"); set("opt-aera", "e00");
  set("opt-cash", "200000"); set("opt-seed", "wellgate"); set("opt-fog", "0"); set("opt-3d", "1");
  CFG.GFX_LEVEL = "high";
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { log("HARNESS CRASH " + e + "\n" + e.stack); FAIL++; }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

function recOf(e) { return H && H.recOf ? H.recOf(e.id) : null; }
function named(g, n) { var f = null; g.traverse(function (o) { if (!f && o.name === n) f = o; }); return f; }
/* every node's turn and visibility, to tell whether anything on a model
   moved; `still` leaves out the nodes that move on their own (a radar
   turning), found by watching the model for a second first */
function pose(root) {
  var a = []; root.traverse(function (o) { a.push(o.rotation.x.toFixed(4) + o.rotation.y.toFixed(4) + o.rotation.z.toFixed(4) + (o.visible ? 1 : 0)); });
  return a;
}
function still(a, b) { return a.map(function (x, i) { return x === b[i] ? x : "*"; }); }
function same(base, now) { return base.length === now.length && base.every(function (x, i) { return x === "*" || x === now[i]; }); }
function openSea(M, R) {
  for (var y = R + 1; y < M.H - R - 1; y++) for (var x = R + 1; x < M.W - R - 1; x++) {
    var ok = true;
    for (var j = -R; j <= R && ok; j++) for (var i = -R; i <= R && ok; i++)
      if (M.terrain[(y + j) * M.W + x + i] !== T.WATER) ok = false;
    if (ok) return { x: (x + 0.5) * TT, y: (y + 0.5) * TT };
  }
  return null;
}
/* A model built to the contract? Returns null when it carries none of it,
   else { ok, d }. Measured in model space on a fresh build: the gate's
   subtree shut and at 1.45, the points against def.wellPts, and the points
   in px on the hull as render3d scales it against the game's (wellAxis). */
function contract(id, entry) {
  var def = UNITS[id], root;
  try { root = entry.build(THREE, typeof Models3D !== "undefined" ? Models3D : null, { team: "#4a7bd0" }); }
  catch (e) { return { ok: false, d: "build threw " + e }; }
  var ud = root.userData || {}, gate = named(root, "wellgate");
  if (!gate && !ud.wellExit && !ud.wellInner) return null;
  var d = [], ok = !!gate && !!ud.wellExit && !!ud.wellInner;
  if (!ok) return { ok: false, d: "gate " + !!gate + ", wellExit " + !!ud.wellExit + ", wellInner " + !!ud.wellInner };
  root.updateMatrixWorld(true);
  var hinge = new THREE.Vector3(); gate.getWorldPosition(hinge);
  var shut = new THREE.Box3().setFromObject(gate), cs = shut.getCenter(new THREE.Vector3());
  gate.rotation.y = 1.45; root.updateMatrixWorld(true);
  var open = new THREE.Box3().setFromObject(gate), co = open.getCenter(new THREE.Vector3());
  gate.rotation.y = 0; root.updateMatrixWorld(true);
  var swing = co.x < hinge.x - 1 && co.z < cs.z - 1 && Math.abs(gate.rotation.y) < 1e-9;
  d.push("open gate's middle " + (co.x - hinge.x).toFixed(1) + " m fore-and-aft of the hinge, " + (co.z - cs.z).toFixed(1) + " m below shut");
  var wp = def.wellPts, ex = ud.wellExit, inn = ud.wellInner;
  var pts = Math.abs(ex.x - wp.exit) < 3 && Math.abs(ex.y) < 2 && Math.abs(inn.y) < 2 && inn.x > ex.x && inn.x < wp.exit + wp.well;
  d.push("sill " + ex.x.toFixed(1) + " m (game " + wp.exit.toFixed(1) + "), first berth " + inn.x.toFixed(1) + " m (game " + wp.inner.toFixed(1) + ")");
  /* on her drawn hull: render3d.js getModel's naval length over the model's
     measured one; the game's points drawn on her as render3d.js wellScale
     draws a craft at them (times Unit.navalDraw: the game's well keeps its
     length whatever size she is drawn at) */
  var bb = new THREE.Box3().setFromObject(root), act = Math.max(0.5, bb.max.x - bb.min.x), nd = Unit.navalDraw(def);
  var pxm = def.r * 2.1 * 1.9 * CFG.MODEL_SCALE * nd / act, ax = Unit.wellAxis(def);
  var dE = Math.abs(ex.x * pxm - ax.exit * nd), dI = Math.abs(inn.x * pxm - ax.inner * nd);
  var px = dE < TT * 0.25 && dI < TT * 0.25;
  d.push("drawn " + dE.toFixed(1) + " and " + dI.toFixed(1) + " px from the game's sill and berth");
  return { ok: swing && pts && px, d: d.join("; ") };
}

function run() {
  var P = Game.human, M = Game.map;
  Game.players.forEach(function (p) { if (p !== P && p.isAI && typeof AI !== "undefined" && AI.setPeace) AI.setPeace(p, true); });
  Game.checkVictory = function () {};
  chk("the 3D renderer is up", Render === Render3D && !!H, "");

  /* 1. the heroes */
  var none = [], seenM = {};
  for (var id in ORIG) {
    var e0 = ORIG[id];
    if (!e0 || seenM[e0.build]) { if (!e0) none.push(id + " (stand-in)"); continue; }
    seenM[e0.build] = 1;
    var c = contract(id, e0);
    if (!c) { none.push(id); continue; }
    chk(id + ": the hero's gate and points keep the contract", c.ok, c.d);
  }
  chk("models without a gate yet (keep the instant look: the craft is hidden inside them): " + none.length, true, none.join(", "));
  var cs = contract("fra_e00_lhd", UNIT_MODELS.fra_e00_lhd);
  chk("the stub hero keeps the contract the heroes are held to", !!cs && cs.ok, cs ? cs.d : "no contract");

  /* 2. the stub on the Mistral, 3. the live Wasp, 4. an America beside them */
  var O = openSea(M, 9) || openSea(M, 6);
  if (!O) { chk("open sea", false, ""); return; }
  var spawnAt = function (id, x, y) { var u = Game.spawnUnitAt(P, id, x, y); u.order = { type: "idle" }; u.orders = []; u.stance = "hold"; return u; };
  var mi = spawnAt("fra_e00_lhd", O.x, O.y - 3 * TT); mi.ang = 0.4;
  var wa = spawnAt("nato_e00_lhd", O.x, O.y + 3 * TT); wa.ang = 0.4;
  var ta = spawnAt("nato_e80_lha", O.x + 6 * TT, O.y); ta.ang = 0.4;
  var am = spawnAt("lha_n", O.x - 7 * TT, O.y);
  var km = [spawnAt("fra_ctm", O.x, O.y), spawnAt("fra_ctm", O.x, O.y)], kw = [spawnAt("lst", O.x, O.y)], kt = [spawnAt("nato_lcu", O.x, O.y)];
  km.forEach(function (c) { mi.dockCraft(c); }); kw.forEach(function (c) { wa.dockCraft(c); }); kt.forEach(function (c) { ta.dockCraft(c); });
  Render.setCam(O.x, O.y);
  function frames(n) { for (var i = 0; i < n; i++) { Game.tick(DT); Render.draw(DT, UI.input); } }
  frames(2);
  var rm = recOf(mi), rw = recOf(wa), ra = recOf(am), rt = recOf(ta);
  if (!rm || !rw || !ra || !rt) { chk("the ships are drawn", false, !!rm + " " + !!rw + " " + !!ra + " " + !!rt); return; }
  var taGate = !!rt.gate, t0 = pose(rt.inst), a0 = pose(ra.inst);
  frames(30);
  var taPose = still(t0, pose(rt.inst)), amPose = still(a0, pose(ra.inst));
  /* where the stub's hinge is in the world, against the game's sill */
  rm.grp.updateMatrixWorld(true);
  var hp = new THREE.Vector3(); rm.gate.getWorldPosition(hp);
  var ax = Unit.wellAxis(mi.def), nM = Unit.navalDraw(mi.def), gx = mi.x + Math.cos(mi.ang) * ax.exit * nM, gy = mi.y + Math.sin(mi.ang) * ax.exit * nM;
  var off = Math.hypot(hp.x / H.PXM - gx, hp.z / H.PXM - gy);
  chk("the Mistral (stub) has her gate record, shut at rest, and its hinge on the game's sill",
      !!rm.gate && rm.gate.rotation.y === 0 && off < TT * 0.25, "hinge " + off.toFixed(1) + " px from the sill");
  chk("an America (no well) has no gate record", !ra.gate && !ra.ramp, "");

  mi.launchAll(); wa.launchAll(); ta.launchAll();
  var maxM = 0, maxW = 0, maxT = 0, mIn = 0, mInDrawn = 0, wIn = 0, wInDrawn = 0, tIn = 0, tInDrawn = 0, tOutDrawn = 0, tOut = 0, t = 0, endT = -1;
  for (var i = 0; i < 40 / DT; i++) {
    frames(1); t += DT;
    maxM = Math.max(maxM, rm.gate.rotation.y);
    if (rw.gate) maxW = Math.max(maxW, rw.gate.rotation.y);
    if (rt.gate) maxT = Math.max(maxT, rt.gate.rotation.y);
    km.forEach(function (c) { if (c.inWell()) { mIn++; if (recOf(c)) mInDrawn++; } });
    kw.forEach(function (c) { if (c.inWell()) { wIn++; if (recOf(c)) wInDrawn++; } });
    kt.forEach(function (c) {
      if (c.inWell()) { tIn++; if (recOf(c)) tInDrawn++; }
      else if (c.wellT || !c.carried) { tOut++; if (recOf(c)) tOutDrawn++; }
    });
    if (km.concat(kw, kt).every(function (c) { return !c.wellT; }) && !mi.gateT && !wa.gateT && !ta.gateT) { endT = t; break; }
  }
  frames(2);
  chk("launched: the stub's gate reaches 1.45 rad while the craft are in her well, and is back at 0 when they are clear and it has shut",
      maxM > 1.44 && maxM <= 1.4501 && endT > 0 && rm.gate.rotation.y === 0, "most " + maxM.toFixed(3) + " rad; shut again at " + endT.toFixed(1) + " s");
  chk("...a craft inside her is drawn, her gate there to see it through", mIn > 0 && mInDrawn === mIn, mInDrawn + "/" + mIn + " frames");
  if (rw.gate)
    chk("the live Wasp's hero has her gate: it reaches 1.45 rad and shuts, her craft drawn inside her",
        maxW > 1.44 && rw.gate.rotation.y === 0 && wIn > 0 && wInDrawn === wIn, "most " + maxW.toFixed(3) + " rad, " + wInDrawn + "/" + wIn + " frames drawn");
  else chk("the live Wasp has no gate node yet", true, "");
  if (!taGate)
    chk("the Tarawa, with no gate node: nothing on her model moves or hides, and her craft is not drawn until it has passed her sill, then is",
        same(taPose, pose(rt.inst)) && tIn > 0 && tInDrawn === 0 && tOut > 0 && tOutDrawn > 0,
        "inside " + tInDrawn + "/" + tIn + " frames drawn, past the sill " + tOutDrawn + "/" + tOut);
  else
    chk("the Tarawa's hero has her gate: it reaches 1.45 rad and shuts, her craft drawn inside her",
        maxT > 1.44 && rt.gate.rotation.y === 0 && tIn > 0 && tInDrawn === tIn, "most " + maxT.toFixed(3) + " rad, " + tInDrawn + "/" + tIn + " frames drawn");
  chk("the America beside them is untouched", same(amPose, pose(ra.inst)) && !am.gateT, "");

  /* 6 and 7, on the same water, the ships above taken off it first */
  clearAway([mi, wa, ta, am].concat(km, kw, kt));
  proportion(O, spawnAt, frames);

  /* 5. a bow ramp (a stub Ivan Rogov), put down for a tank on a beach */
  var bch = null;
  for (var y = 4; y < M.H - 4 && !bch; y++) for (var x = 4; x < M.W - 4 && !bch; x++) {
    if (!GameMap.passable(M, x, y, "ground") || Game.tileBlocked(x, y, null)) continue;
    for (var dd = 0; dd < 4 && !bch; dd++) {
      var dx = [1, -1, 0, 0][dd], dy = [0, 0, 1, -1][dd], ok = true;
      for (var q = 1; q <= 4 && ok; q++) if (M.terrain[(y + dy * q) * M.W + x + dx * q] !== T.WATER) ok = false;
      if (ok) bch = { x: x, y: y, dx: dx, dy: dy };
    }
  }
  if (!bch) { chk("a beach", false, ""); return; }
  var ir = spawnAt("pact_e80_lpd", (bch.x + bch.dx * 3 + 0.5) * TT, (bch.y + bch.dy * 3 + 0.5) * TT);
  ir.ang = Math.atan2(-bch.dy, -bch.dx);
  var tk = spawnAt("mbt_n", P.homeX, P.homeY); ir.cargo.push(tk); tk.carried = true;
  Render.setCam(ir.x, ir.y);
  frames(2);
  var ri = recOf(ir);
  var r0 = ri && ri.ramp ? ri.ramp.rotation.y : NaN, nu = ir.unload((bch.x + 0.5) * TT, (bch.y + 0.5) * TT), maxR = 0;
  for (i = 0; i < 12 / DT; i++) { frames(1); maxR = Math.max(maxR, ri.ramp.rotation.y); if (!(ir.rampHold > 0) && ri.ramp.rotation.y === 0) break; }
  chk("a stub Ivan Rogov putting a tank on a beach lowers her bow ramp to 1.45 rad and raises it again; her stern gate is not touched",
      !!ri && !!ri.ramp && r0 === 0 && nu === 1 && maxR > 1.44 && maxR <= 1.4501 && ri.ramp.rotation.y === 0 && !ri.gate && !ir.gateT,
      nu + " landed, ramp most " + maxR.toFixed(3) + " rad, up again " + (i * DT).toFixed(1) + " s after");
}

function clearAway(list) { list.forEach(function (e) { if (e && !e.dead) e.dead = true; }); Game.sweepDead(); }

/* ---- 6 and 7: the craft to her proportion ----
   Everything is measured in HER model's metres: the craft's drawn meshes,
   corner by corner, taken through her drawn model's inverse (boxIn), so
   her heading and her own roll and pitch fall out and what is left is where
   the craft is drawn against her well, its own roll included. The well
   itself is found by rays through
   a fresh build of her hero (wellOf), every surface two-sided and the gate
   left out: from its first berth (wellInner) forward to its end, out to
   each wall and up to its deckhead; from a metre inside her sill out to the
   walls and up; and down from above her over the berth and the sill, the
   first surface met being the deck over the well (her flight deck). */
var STEP = 0.10;            // most of a craft's game length it may grow or shrink by in one frame (1/30 s)
var _bv = null;
function boxIn(obj, inv) {
  var b = new THREE.Box3(); _bv = _bv || new THREE.Vector3();
  obj.traverse(function (o) {
    if (!o.isMesh || !o.geometry) return;
    if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
    var bb = o.geometry.boundingBox;
    for (var c = 0; c < 8; c++) {
      _bv.set(c & 1 ? bb.max.x : bb.min.x, c & 2 ? bb.max.y : bb.min.y, c & 4 ? bb.max.z : bb.min.z);
      _bv.applyMatrix4(o.matrixWorld).applyMatrix4(inv);
      b.expandByPoint(_bv);
    }
  });
  return b;
}
function underGate(o) { for (var p = o; p; p = p.parent) if (p.name === "wellgate") return true; return false; }
function wellOf(id) {
  var root = UNIT_MODELS[id].build(THREE, typeof Models3D !== "undefined" ? Models3D : null, { team: "#4a7bd0" }), ud = root.userData;
  root.updateMatrixWorld(true);
  var meshes = [], sides = [], all = new THREE.Box3().setFromObject(root);
  root.traverse(function (o) {
    if (!o.isMesh || underGate(o)) return;
    meshes.push(o);
    (Array.isArray(o.material) ? o.material : [o.material]).forEach(function (m) { sides.push([m, m.side]); m.side = THREE.DoubleSide; });
  });
  var rc = new THREE.Raycaster();
  function ray(p, d) {
    rc.set(new THREE.Vector3(p[0], p[1], p[2]), new THREE.Vector3(d[0], d[1], d[2]));
    var h = rc.intersectObjects(meshes, false);
    return h.length ? h[0].distance : Infinity;
  }
  var z = ud.wellInner.z + 1.5, bi = [ud.wellInner.x, 0, z], si = [ud.wellExit.x + 1, 0, z], up = all.max.z + 5;
  var w = {
    exit: ud.wellExit.x, inner: ud.wellInner.x, fwd: ud.wellInner.x + ray(bi, [1, 0, 0]),
    port: ray(bi, [0, 1, 0]), stbd: ray(bi, [0, -1, 0]), top: z + ray(bi, [0, 0, 1]),
    sPort: ray(si, [0, 1, 0]), sStbd: ray(si, [0, -1, 0]), sTop: z + ray(si, [0, 0, 1]),
    deckB: up - ray([ud.wellInner.x, 0, up], [0, 0, -1]), deckS: up - ray([ud.wellExit.x + 1, 0, up], [0, 0, -1]),
    stern: all.min.x, side: Math.max(all.max.y, -all.min.y), len: all.max.x - all.min.x
  };
  sides.forEach(function (s) { s[0].side = s[1]; });
  return w;
}
function m1(x) { return x.toFixed(1); }

function proportion(O, spawnAt, frames) {
  var WELLS = ["nato_e80_lha", "nato_e90_lhd", "nato_e00_lhd", "lhd_f", "lhd_c", "pact_e90_lpd"];
  WELLS.forEach(function (sid) {
    var wc = UNITS[sid] && UNITS[sid].wellCraft;
    if (!wc) { chk(sid + " has a well", false, ""); return; }
    Object.keys(wc).forEach(function (cid) { if (UNITS[cid]) transit(sid, cid, O, spawnAt, frames, wellOf(sid)); });
  });
  gateless(O, spawnAt, frames);
}

/* one craft out of her well and back into it */
function transit(sid, cid, O, spawnAt, frames, wb) {
  var s = spawnAt(sid, O.x, O.y), c = spawnAt(cid, O.x, O.y), tag = sid + " / " + cid;
  s.ang = 0.4; s.dockCraft(c);
  Render.setCam(O.x, O.y); frames(2);
  var rs = recOf(s), ax = Unit.wellAxis(s.def);
  if (!rs || !rs.gate) { chk(tag + ": her model is drawn with its gate", false, ""); clearAway([s, c]); return; }
  var sS = rs.tpl.userData.inner.scale.x;                        // world metres to her model's metre
  var Lg = c.def.r * 2.1 * H.PXM * 1.9 * CFG.MODEL_SCALE * Unit.navalDraw(c.def);   // its game length, drawn (getModel)
  /* its length at her proportion, from fresh builds of the two models: its
     measured length in metres times her drawn length over her measured one */
  var cb = new THREE.Box3().setFromObject(UNIT_MODELS[cid].build(THREE, typeof Models3D !== "undefined" ? Models3D : null, { team: "#4a7bd0" }));
  var kt = (cb.max.x - cb.min.x) * (s.def.r * 2.1 * H.PXM * 1.9 * CFG.MODEL_SCALE * Unit.navalDraw(s.def) / wb.len) / Lg;
  var inv = new THREE.Matrix4(), lastL = null, jump = 0, jumpAt = "";
  function rel() { return (c.x - s.x) * Math.cos(s.ang) + (c.y - s.y) * Math.sin(s.ang); }
  /* the craft's drawn box and the gate's, in her model metres, this frame */
  function look() {
    var rc = recOf(c);
    if (!rc) { lastL = null; return null; }
    rs.grp.updateMatrixWorld(true); rc.grp.updateMatrixWorld(true);
    inv.copy(rs.inst.children[0].matrixWorld).invert();
    var k = rc.grp.scale.x, L = k * Lg, ph = c.wellT ? c.wellT.ph : c.order && c.order.type === "enter" ? "sent in" : "free";
    if (lastL !== null && Math.abs(L - lastL) > jump) { jump = Math.abs(L - lastL); jumpAt = ph; }
    lastL = L;
    return { k: k, ph: ph, b: boxIn(rc.inst, inv), g: boxIn(rs.gate, inv) };
  }
  /* inside her well? (measured in her model metres, 5 cm allowed for the
     sea's roll; what is out is said in drawn metres) */
  var E = 0.05;
  function fits(v, atSill) {
    var b = v.b, why = [];
    if (b.max.x > wb.fwd + E) why.push("fore end " + m1((b.max.x - wb.fwd) * sS) + " m past the well's end");
    if (!atSill && b.min.x < wb.exit - E) why.push(m1((wb.exit - b.min.x) * sS) + " m out past the sill");
    var p = atSill ? wb.sPort : wb.port, q = atSill ? wb.sStbd : wb.stbd;
    if (b.max.y > p + E || b.min.y < -q - E) why.push(m1(Math.max(b.max.y - p, -q - b.min.y) * sS) + " m through a wall");
    var dk = atSill ? wb.deckS : wb.deckB;
    if (b.max.z > dk + E) why.push(m1((b.max.z - dk) * sS) + " m up through the deck over the well");
    return why;
  }
  /* the craft's size and how it lies, drawn metres (world) */
  function says(v, atSill) {
    var b = v.b, f = sS;
    return m1((b.max.x - b.min.x) * f) + " x " + m1((b.max.y - b.min.y) * f) + " x " + m1((b.max.z - b.min.z) * f) + " m drawn (k " + v.k.toFixed(3) + ")" +
      (atSill ? "" : ", " + m1((wb.stern - b.min.x) * f) + " m past her stern, " + m1((Math.max(b.max.y, -b.min.y) - wb.side) * f) + " m out over her side, top " +
       m1((b.max.z - wb.deckB) * f) + " m against her flight deck, " + m1((b.max.z - wb.top) * f) + " m against the well's deckhead") +
      (v.g ? "; gate " + m1((v.g.max.y - v.g.min.y) * f) + " m wide " + (v.b.containsBox(v.g) ? "INSIDE the craft" : "not inside it") : "");
  }
  log("  -- " + tag + ": her well drawn " + m1((wb.fwd - wb.exit) * sS) + " m long behind the sill, " + m1((wb.port + wb.stbd) * sS) + " m between the walls, deckhead " +
      m1(wb.top * sS) + " m, flight deck " + m1(wb.deckB * sS) + " m over the berth (" + m1(wb.deckS * sS) + " at the sill); craft's game length " + m1(Lg) + " m, at her scale " + m1(Lg * kt) + " m");

  /* OUT */
  s.launchAll();
  var berth = null, sill = null, outK = [], offK = [], freeK = null, inWellHid = 0;
  for (var i = 0; i < 40 / DT; i++) {
    frames(1);
    var w = c.wellT, v = look();
    if (!w) { freeK = v ? v.k : null; break; }
    if (w.ph === "out") {
      if (!v) { inWellHid++; continue; }
      outK.push(v.k);
      if (!berth) berth = v;
      if (!sill && rel() <= ax.exit) sill = v;
    } else if (w.ph === "off" && v) offK.push(v.k);
  }
  frames(1); look();
  var fB = berth ? fits(berth, false) : ["not drawn"], fS = sill ? fits(sill, true) : ["not seen at the sill"];
  var wide = berth && (berth.b.max.y - berth.b.min.y) > wb.port + wb.stbd;
  var atK = outK.length && outK.every(function (k) { return Math.abs(k / kt - 1) < 1e-4; });
  var gateSeen = sill && !sill.b.containsBox(sill.g) && berth && !berth.b.containsBox(berth.g);
  var noWall = function (x) { return !/wall/.test(x); };
  if (wide) {
    /* the craft's own model is wider than her well: no proportion fits it,
       and wider than her gate it rides over it at the sill */
    var ctr = Math.abs(berth.b.max.y + berth.b.min.y) / 2;
    chk(tag + ": launched, drawn at her proportion - THE CRAFT'S MODEL IS WIDER THAN HER WELL (" + m1(berth.b.max.y - berth.b.min.y) + " m in " + m1(wb.port + wb.stbd) +
        " m, her model metres): centred between her walls, otherwise inside, the gate not inside it at the berth",
        atK && ctr < 0.1 && !fB.filter(noWall).length && !fS.filter(noWall).length && !berth.b.containsBox(berth.g) && !inWellHid,
        "berth " + says(berth, false) + (fB.length ? " [" + fB.join(", ") + "]" : "") + " | sill " + says(sill, true) + (fS.length ? " [" + fS.join(", ") + "]" : ""));
  } else
    chk(tag + ": launched, drawn at her proportion inside her well at the berth and at the sill, the gate not inside it",
        atK && !fB.length && !fS.length && gateSeen && !inWellHid,
        "berth " + (berth ? says(berth, false) : "-") + (fB.length ? " [" + fB.join(", ") + "]" : "") + " | sill " + (sill ? says(sill, true) : "-") + (fS.length ? " [" + fS.join(", ") + "]" : ""));
  var grows = offK.length > 1 && Math.abs(offK[0] / kt - 1) < 0.05 && offK.every(function (k, j) { return !j || k >= offK[j - 1] - 1e-9; });
  chk(tag + ": on its run to its water it grows back to its game length, never more than " + (STEP * 100) + "% of it a frame",
      grows && offK[offK.length - 1] > 0.99 && freeK === 1 && jump <= STEP * Lg,
      offK.length + " frames, k " + (offK.length ? offK[0].toFixed(3) + " to " + offK[offK.length - 1].toFixed(3) : "-") + ", then " + freeK + "; largest step " + m1(jump) + " m (" + jumpAt + ")");

  /* BACK IN, from six tiles astern of her */
  c.give({ type: "move", x: s.x - Math.cos(s.ang) * 6 * TT, y: s.y - Math.sin(s.ang) * 6 * TT });
  for (i = 0; i < 30 / DT && (c.moving || c.order.type !== "idle"); i++) { frames(1); look(); }
  c.give({ type: "enter", target: s });
  jump = 0; jumpAt = "";
  var appK = [], appN = 0, inK = [], bSill = null, bBerth = null, hid = 0;
  for (i = 0; i < 60 / DT && !c.carried; i++) {
    frames(1);
    w = c.wellT; v = look();
    if (c.carried) continue;
    /* sent in: up to her stern, then the glide to her sill */
    if (!w || w.ph === "app") { if (v) appK.push(v.k); if (w) appN++; continue; }
    if (w.ph === "in") {
      if (!v) { hid++; continue; }
      inK.push(v.k);
      if (!bSill && rel() >= ax.exit) bSill = v;
      bBerth = v;
    }
  }
  var fS2 = bSill ? fits(bSill, true) : ["not seen at the sill"], fB2 = bBerth ? fits(bBerth, false) : ["not drawn"];
  if (wide) { fS2 = fS2.filter(noWall); fB2 = fB2.filter(noWall); }
  var shrank = appK.filter(function (k) { return k < 1; }).length;
  var shrinks = appN > 0 && appK.length > 1 && appK[0] === 1 && appK.every(function (k, j) { return !j || k <= appK[j - 1] + 1e-9; }) &&
                inK.length && inK.every(function (k) { return Math.abs(k / kt - 1) < 1e-4; });
  chk(tag + ": recovered, it shrinks as it comes up to her stern and glides to her sill, and is at her proportion from there to its berth, inside her well, never more than " + (STEP * 100) + "% a frame",
      c.carried && shrinks && !fS2.length && !fB2.length && !hid && jump <= STEP * Lg,
      (c.carried ? "docked" : "NOT docked") + "; shrinking over " + shrank + " frames (" + appN + " of them the glide), k " + (appK.length ? appK[0].toFixed(3) + " to " + appK[appK.length - 1].toFixed(3) : "-") +
      ", in " + inK.length + " frames at " + (inK.length ? inK[0].toFixed(3) : "-") + "; largest step " + m1(jump) + " m (" + jumpAt + ")" +
      " | sill " + (bSill ? says(bSill, true) : "-") + (fS2.length ? " [" + fS2.join(", ") + "]" : "") + " | berth " + (bBerth ? says(bBerth, false) : "-") + (fB2.length ? " [" + fB2.join(", ") + "]" : ""));
  clearAway([s, c]); frames(1);
}
/* 7. a well and no gate: the craft hidden inside her, at its game size whenever it is drawn */
function gateless(O, spawnAt, frames) {
  var s = spawnAt("pact_e00_lpd", O.x, O.y), c = spawnAt("lst", O.x, O.y);
  s.ang = 0.4; s.dockCraft(c);
  Render.setCam(O.x, O.y); frames(2);
  var rs = recOf(s), seen = 0, inside = 0, insideDrawn = 0, notOne = 0, phs = {};
  function look() {
    var rc = recOf(c), w = c.wellT;
    if (w) phs[w.ph] = 1;
    if (c.inWell()) { inside++; if (rc) insideDrawn++; }
    if (rc) { seen++; if (rc.grp.scale.x !== 1 || rc.grp.scale.y !== 1 || rc.grp.scale.z !== 1) notOne++; }
  }
  s.launchAll();
  for (var i = 0; i < 40 / DT && (c.wellT || c.carried); i++) { frames(1); look(); }
  c.give({ type: "move", x: s.x - Math.cos(s.ang) * 6 * TT, y: s.y - Math.sin(s.ang) * 6 * TT });
  for (i = 0; i < 30 / DT && (c.moving || c.order.type !== "idle"); i++) { frames(1); look(); }
  c.give({ type: "enter", target: s });
  for (i = 0; i < 60 / DT && !c.carried; i++) { frames(1); look(); }
  chk("a ship whose model has no gate (stub pact_e00_lpd): her craft is not drawn inside her, and at its game size whenever it is, out and back in",
      !!rs && !rs.gate && c.carried && phs.out && phs.off && phs.app && phs["in"] && inside > 0 && insideDrawn === 0 && seen > 0 && notOne === 0,
      "phases " + Object.keys(phs).join(" ") + "; inside " + insideDrawn + "/" + inside + " frames drawn; drawn " + seen + " frames, " + notOne + " not at 1");
  clearAway([s, c]); frames(1);
}
