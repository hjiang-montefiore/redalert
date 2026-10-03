/* tools/jsc/launcher3d_check.js - the M270 and HIMARS lay their pods to fire,
   their rounds leave the pod mouths, and the rounds they fire are drawn as
   the M26, GMLRS, ATACMS and PrSM. Checked on the REAL renderer under
   JavaScriptCore.

     python3 tools/jsc/scene3d.py tools/jsc/launcher3d_check.js

   Models: each of the seven rows carries one group "podelev" inside its
   launcher module, level at rest, a cell for every round its pods hold, and
   16 draw calls; stowed it is no taller than the published height, and
   raised the pod mouths go up.
   In play, every row (the two HIMARS TEL rows turn the hull, not a turret):
   the pod is level standing and level driving; given a target off to the
   side and in reach, the module trains to it and the pod is fully raised
   before the first round goes; that round is first drawn at a pod mouth and
   is back on its simulated path once LAUNCH_JOIN has passed; the pod holds
   through the salvo, lowers once the target is gone and the hold has run
   out, and starts down at once when the launcher is driven off.
   Rounds: each named round builds as body, nose, its fins merged and the
   motor's flame and core, to its published length and diameter (and
   ATACMS' published fin span), with the fin and canard counts the
   references give; every unnamed projectile builds with the part count it
   had before (the table was measured on 2e41321); only the seven rows
   declare rounds, and a Smerch firing the same "mlrs" weapon or an Iskander
   firing the same "srbm_mod" still gets the old round.
   Review additions: a spinning M26 rolls about its own axis and keeps its
   nose on its path; a TEL under an order that did not release its missile
   keeps its pod down; an M270 sent on an AT2 mine mission (the order
   naming that mount) lays its pod before the mine rocket goes; a launcher
   already on its bearing when it takes a target lets at most two rounds of
   its ripple leave the pod low.
   Cost: the laying rule and a launch are timed on a live launcher's record
   (Render3D.launcherProbe), and the effect meshes a launch adds are counted
   and seen to go; Render.draw time over a salvo is printed for scale. */
var TT = 32, PXM = 0.625, PASS = 0, FAIL = 0, D2R = Math.PI / 180;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }

window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-cash", "200000"); set("opt-seed", "btest"); set("opt-fog", "0"); set("opt-3d", "1");
  CFG.GFX_LEVEL = "high";
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { log("HARNESS CRASH " + e + "\n" + e.stack); FAIL++; }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

var CELLS = { nato_e80_mlrs: 12, nato_e90_mlrs: 12, mlrs_n: 12, nato_e90_tel: 2, nato_e00_mlrs: 6, nato_e00_tel: 1, tel_n: 2 };
var ORDS = { nato_e80_mlrs: "m26", nato_e90_mlrs: "m26", mlrs_n: "gmlrs", nato_e90_tel: "atacms",
             nato_e00_mlrs: "gmlrs", nato_e00_tel: "atacms", tel_n: "prsm" };
/* mesh counts of FX3D.create(THREE, p) with no round named, measured at 2e41321 */
var BEFORE = [["arc", null, 3], ["shell", null, 4], ["bullet", null, 4], ["bomb", null, 7], ["torpedo", null, 10],
              ["depth", null, 3], ["missile", { dmg: 100, profile: "skim" }, 19], ["missile", { dmg: 300, profile: "cruise" }, 20],
              ["missile", { dmg: 300, profile: "loft" }, 18], ["missile", { dmg: 440, profile: "ballistic" }, 18],
              ["missile", { dmg: 80, profile: "interceptor" }, 21], ["missile", { dmg: 80 }, 21], ["missile", { dmg: 300 }, 18]];
/* published length, diameter (m) and fins: [count] per set, tail first */
var PUB = { m26: { L: 3.94, D: 0.227, fins: 4 }, gmlrs: { L: 3.94, D: 0.227, fins: 8 },
            atacms: { L: 3.975, D: 0.61, fins: 4, span: 1.40 }, prsm: { L: 3.96, D: 0.432, fins: 4 } };

function frames(n) { var t = 0; for (var i = 0; i < n; i++) { Game.tick(CFG.DT); var t0 = preciseTime(); Render.draw(CFG.DT, UI.input); t += preciseTime() - t0; } return t; }
function R3() { return Render3D.three; }
function meshes(g) { var c = 0; g.traverse(function (o) { if (o.isMesh) c++; }); return c; }
function named(g, n) { var f = null; g.traverse(function (o) { if (!f && o.name === n) f = o; }); return f; }
function at(P, id, tx, ty) { return Game.spawnUnitAt(P, id, tx * TT + 16, ty * TT + 16); }
function spot(P, kind, r0, w, h) {
  var M = Game.map, hx = (P.homeX / TT) | 0, hy = (P.homeY / TT) | 0;
  for (var r = r0; r < 90; r++) for (var a = 0; a < 64; a++) {
    var an = a / 64 * 6.283, x = (hx + Math.cos(an) * r) | 0, y = (hy + Math.sin(an) * r) | 0;
    if (x < 3 || y < 3 || x + w >= M.W - 3 || y + h >= M.H - 3) continue;
    var ok = true;
    for (var j = 0; j < h && ok; j++) for (var i = 0; i < w; i++)
      if (!GameMap.passable(M, x + i, y + j, kind) || Game.tileBlocked(x + i, y + j, null)) { ok = false; break; }
    if (ok) return { x: x, y: y };
  }
  return null;
}
/* the top-level scene object drawn for an entity: the one standing on it */
function modelOf(e) {
  var best = null, bd = 1e9;
  R3().scene.children.forEach(function (c) {
    if (!c.isGroup || c.userData.life !== undefined || !named(c, "podelev")) return;
    var dx = c.position.x - e.x * PXM, dz = c.position.z - e.y * PXM, d = dx * dx + dz * dz;
    if (d < bd) { bd = d; best = c; }
  });
  return bd < 4 ? best : null;
}
function kill(e) { Combat.applyDamage(Game, e, 1e7, WEAPONS.gun_120, null); }
/* the pod's axis in the world: elevation and bearing (game x/y plane) */
function podAxis(pe) {
  pe.updateWorldMatrix(true, false);
  var m = pe.matrixWorld.elements, dx = m[0], dy = m[1], dz = m[2], l = Math.hypot(dx, dy, dz);
  return { el: Math.asin(dy / l), brg: Math.atan2(dz, dx) };
}
function angErr(a, b) { var d = a - b; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return Math.abs(d); }
function mouthDist(pe, pos) {
  pe.updateWorldMatrix(true, false);
  var best = 1e9, v = new THREE.Vector3();
  pe.userData.cells.forEach(function (c) { v.set(c[0], c[1], c[2]).applyMatrix4(pe.matrixWorld); best = Math.min(best, v.distanceTo(pos)); });
  return best;
}

function run() {
  var P = Game.human, E = Game.players[1];
  AI.setPeace(E, true);
  Game.checkVictory = function () {};
  chk("the 3D renderer is up", Render === Render3D, "");

  /* ---------------- the models ---------------- */
  var badM = [];
  Object.keys(CELLS).forEach(function (k) {
    var root = UNIT_MODELS[k].build(THREE, typeof Models3D !== "undefined" ? Models3D : null, { team: 0x3a6ea5 });
    root.updateMatrixWorld(true);
    var pe = named(root, "podelev"), n = 0;
    root.traverse(function (o) { if (o.name === "podelev") n++; });
    var why = [];
    if (n !== 1) why.push(n + " podelev groups");
    if (pe) {
      if (pe.rotation.y !== 0) why.push("not level at rest");
      if ((pe.userData.cells || []).length !== CELLS[k]) why.push((pe.userData.cells || []).length + " cells, want " + CELLS[k]);
      if (Math.abs(pe.userData.el - 35 * D2R) > 1e-9) why.push("el " + (pe.userData.el / D2R).toFixed(1));
      if (!pe.parent || pe.parent.parent !== root) why.push("not inside the module");
      if (HeroUsMlrs.rows[k].turret !== (pe.parent && pe.parent.name === "turret")) why.push("module naming changed");
      var dc = meshes(root);
      if (dc !== 16) why.push(dc + " draw calls, want 16");
      var bb = new THREE.Box3().setFromObject(root), hgt = bb.max.z - bb.min.z;
      var pub = HeroUsMlrs.rows[k].veh === "m270" ? 2.57 : 3.20;
      if (hgt > pub + 0.005) why.push("stowed height " + hgt.toFixed(3) + " over " + pub);
      var c0 = pe.userData.cells[0], v0 = new THREE.Vector3(c0[0], c0[1], c0[2]).applyMatrix4(pe.matrixWorld);
      pe.rotation.y = -pe.userData.el; root.updateMatrixWorld(true);
      var v1 = new THREE.Vector3(c0[0], c0[1], c0[2]).applyMatrix4(pe.matrixWorld);
      if (!(v1.z - v0.z > 1.0)) why.push("raising lifts the mouth only " + (v1.z - v0.z).toFixed(2) + " m");
      log("    " + k + ": " + dc + " draw calls, " + pe.userData.cells.length + " cells, stowed " + hgt.toFixed(3) +
          " m high; raised " + (pe.userData.el / D2R).toFixed(0) + " deg the first mouth goes up " + (v1.z - v0.z).toFixed(2) + " m");
    }
    if (why.length) badM.push(k + ": " + why.join(", "));
  });
  chk("each launcher row has one level podelev group in its module, a cell per round, 16 draw calls, its stowed height",
      badM.length === 0, badM.join("; "));

  /* ---------------- the rounds ---------------- */
  var badR = [];
  Object.keys(PUB).forEach(function (o) {
    var g = FX3D.create(THREE, { type: o === "m26" || o === "gmlrs" ? "arc" : "missile", w: {} }, o), V = FX3D.VIS, Q = PUB[o];
    g.updateMatrixWorld(true);
    var parts = g.children.map(function (c) { return c.name || (c.geometry && c.geometry.type); });
    var body = new THREE.Box3(), fl = named(g, "fins"), why = [];
    g.children.forEach(function (c) { if (c.material === g.children[0].material || c.geometry.type === "ConeGeometry" && !c.name) body.expandByObject(c); });
    var Lm = (body.max.x - body.min.x) / V, Dm = (body.max.y - body.min.y) / V;
    if (meshes(g) !== 5) why.push(meshes(g) + " meshes");
    if (!named(g, "flame") || !named(g, "core")) why.push("no motor flame");
    if (Math.abs(Lm / Q.L - 1) > 0.005) why.push("length " + Lm.toFixed(3));
    if (Math.abs(Dm / Q.D - 1) > 0.01) why.push("diameter " + Dm.toFixed(3));
    var nf = fl ? fl.geometry.attributes.position.count / 36 : 0, rmax = 0;
    if (nf !== Q.fins) why.push(nf + " fins");
    if (fl) { var pa = fl.geometry.attributes.position; for (var i = 0; i < pa.count; i++) rmax = Math.max(rmax, Math.hypot(pa.getY(i), pa.getZ(i))); }
    if (Q.span && Math.abs(2 * rmax / V / Q.span - 1) > 0.02) why.push("fin span " + (2 * rmax / V).toFixed(3));
    log("    " + o + ": " + parts.join(", ") + "; " + Lm.toFixed(3) + " x " + Dm.toFixed(3) + " m, " + nf + " fins, span " + (2 * rmax / V).toFixed(2) + " m");
    if (why.length) badR.push(o + ": " + why.join(", "));
  });
  chk("the M26, GMLRS, ATACMS and PrSM build to their published length, diameter, fin counts (and ATACMS' span), with a motor flame",
      badR.length === 0, badR.join("; "));
  var badO = [];
  BEFORE.forEach(function (b) {
    var n1 = meshes(FX3D.create(THREE, { type: b[0], w: b[1] || {} })), n2 = meshes(FX3D.create(THREE, { type: b[0], w: b[1] || {} }, null));
    if (n1 !== b[2] || n2 !== b[2]) badO.push(b[0] + (b[1] ? "/" + (b[1].profile || b[1].dmg) : "") + " " + n1 + " (was " + b[2] + ")");
  });
  chk("every unnamed projectile builds with the part count it had at 2e41321 (" + BEFORE.length + " kinds)", badO.length === 0, badO.join(", "));
  var withOrd = Object.keys(UNIT_MODELS).filter(function (k) { return UNIT_MODELS[k].ord; }).sort();
  chk("only the seven launcher rows name a round", withOrd.join(",") === Object.keys(ORDS).sort().join(","), withOrd.join(","));

  /* ---------------- in play ---------------- */
  var sp = 0, smerchMs = null, rowMs = null;
  Object.keys(CELLS).forEach(function (k) {
    log("    " + k + " fires " + JSON.stringify(UNITS[k].weapons));
    var g = spot(P, "ground", 14 + sp * 6, 34, 12); sp++;
    if (!g) { chk(k + ": a place to stand", false, ""); return; }
    Render3D.setCam((g.x + 4) * TT, (g.y + 6) * TT);
    var L = at(P, k, g.x + 2, g.y + 6);
    L.ang = 0; L.tang = 0; L.order = { type: "idle" }; L.orders = [];
    frames(3);
    var M = modelOf(L), pe = M && named(M, "podelev");
    if (!pe) { chk(k + ": its model is drawn with a podelev group", false, ""); return; }
    var w = WEAPONS[L.def.weapons[0]], el = pe.userData.el;
    var t = 0, upStill = 0;
    for (t = 0; t < 30; t++) { frames(1); if (pe.rotation.y !== 0) upStill++; }
    L.give({ type: "move", x: (g.x + 12) * TT + 16, y: (g.y + 6) * TT + 16 });
    var movedF = 0, upMove = 0;
    for (t = 0; t < 60; t++) { frames(1); if (L.moving) { movedF++; if (pe.rotation.y !== 0) upMove++; } }
    chk(k + ": stowed level standing idle and while driving", upStill === 0 && upMove === 0 && movedF > 10,
        "raised on " + upStill + " idle frames and " + upMove + " of " + movedF + " driving frames");
    for (t = 0; t < 120 && L.moving; t++) frames(1);

    /* a target off to the north, inside reach */
    var dTiles = Math.round(((w.minRange || 0) + w.range) / 2), T = at(E, "mbt_p", ((L.x / TT) | 0), ((L.y / TT) | 0) - dTiles);
    T.order = { type: "idle" };
    L.give({ type: "attack", target: T });
    var first = null, elAtFirst = 0, brgErr = 0, dMouth = 0, f, seen = [], maxEl = 0;
    for (f = 0; f < 400 && !first; f++) {
      frames(1);
      maxEl = Math.max(maxEl, -pe.rotation.y);
      Combat.projectiles.forEach(function (p) { if (p.shooter === L && p._m3 && seen.indexOf(p) < 0) { seen.push(p); if (!first) first = p; } });
    }
    if (!first) { chk(k + ": fires at a target in reach", false, "no round in 400 frames"); return; }
    var ax = podAxis(pe), want = Math.atan2(T.y - L.y, T.x - L.x);
    elAtFirst = ax.el; brgErr = angErr(ax.brg, want); dMouth = mouthDist(pe, first._m3.position);
    chk(k + ": raised to " + (el / D2R).toFixed(0) + " deg and trained on the target when the first round goes",
        Math.abs(elAtFirst - el) < 0.02 && brgErr < 0.16, "pod at " + (elAtFirst / D2R).toFixed(1) + " deg, " + (brgErr / D2R).toFixed(1) + " deg off the target's bearing");
    chk(k + ": the first round is drawn at a pod mouth", dMouth < 0.05, dMouth.toFixed(4) + " m from the nearest mouth");
    chk(k + ": the round is the " + ORDS[k], first._m3.userData.ord === ORDS[k], "" + first._m3.userData.ord);
    var t0 = preciseTime(), nf = 0, onPath = null;
    for (f = 0; f < 12; f++) { frames(1); nf++; }
    if (!first.dead && first._m3) {
      var q = first._m3.position;
      onPath = Math.hypot(q.x - first.x * PXM, q.y - first._lastY, q.z - first.y * PXM);
    }
    chk(k + ": back on its simulated path " + (12 / 30).toFixed(1) + " s after launch", onPath === null || (onPath < 1e-6 && first._lo === null),
        onPath === null ? "(the round had landed)" : onPath.toExponential(2) + " m off");
    /* the salvo goes, then the target is gone */
    var heldLow = 0;
    for (f = 0; f < 60; f++) { frames(1); if (-pe.rotation.y < el - 0.02) heldLow++;
      Combat.projectiles.forEach(function (p) { if (p.shooter === L && p._m3 && seen.indexOf(p) < 0) seen.push(p); }); }
    var ms = (preciseTime() - t0) * 1000 / (nf + 60);
    if (k === "nato_e80_mlrs") rowMs = ms;
    chk(k + ": holds the pod up through the salvo", heldLow === 0, seen.length + " rounds seen; low on " + heldLow + " frames");
    if (!T.dead) kill(T);
    var downAt = -1;
    for (f = 0; f < 300 && downAt < 0; f++) { frames(1); if (pe.rotation.y === 0) downAt = f; }
    var hold = 3 + el / (L.def.tturn || 0.8);
    chk(k + ": lowers once the target is gone and the hold has run", downAt >= 0 && downAt / 30 <= hold + 1.5,
        downAt < 0 ? "still up after 10 s" : "level " + (downAt / 30).toFixed(2) + " s later (hold " + hold.toFixed(2) + " s)");
    /* up again on a second target, then driven off */
    if (L.roundsMax) L.rounds = L.roundsMax;          // a one-round TEL is dry now: reload it by hand
    var T2 = at(E, "mbt_p", ((L.x / TT) | 0) + dTiles, ((L.y / TT) | 0));
    T2.order = { type: "idle" };
    L.give({ type: "attack", target: T2 });
    for (f = 0; f < 240 && -pe.rotation.y < el - 1e-6; f++) frames(1);
    var e0 = -pe.rotation.y, wf = 0;
    L.give({ type: "move", x: L.x - 6 * TT, y: L.y + 2 * TT });
    for (wf = 0; wf < 30 && !L.moving; wf++) frames(1);
    var em = -pe.rotation.y;
    frames(1);
    var e1 = -pe.rotation.y;
    chk(k + ": starts down at once when driven off", e0 > el - 0.01 && L.moving && e1 < em - 0.01,
        (e0 / D2R).toFixed(1) + " deg up; moving after " + wf + " frames at " + (em / D2R).toFixed(1) + " deg, a frame later " + (e1 / D2R).toFixed(1));
    if (!T2.dead) kill(T2);
    kill(L); frames(2);
  });

  /* ---- the same weapons on other rows draw as before ---- */
  var g2 = spot(P, "ground", 40, 30, 10);
  Render3D.setCam((g2.x + 4) * TT, (g2.y + 5) * TT);
  var sm = at(P, "mlrs_p", g2.x + 2, g2.y + 5), tg = at(E, "mbt_p", g2.x + 2, g2.y + 5 - 8);
  sm.order = { type: "idle" }; tg.order = { type: "idle" };
  frames(2);
  var mk = Combat.projectiles.slice();
  var t1 = preciseTime();
  for (var b = 0; b < 12; b++) Combat.fire(Game, sm, WEAPONS.mlrs, tg);
  frames(1);
  var sp2 = Combat.projectiles.filter(function (p) { return mk.indexOf(p) < 0 && p.shooter === sm; });
  frames(71);
  smerchMs = (preciseTime() - t1) * 1000 / 72;
  /* the Iskander-M fires the same srbm_mod as the HIMARS PrSM row */
  var isk = Object.keys(UNITS).filter(function (k) { return k !== "tel_n" && (UNITS[k].weapons || []).indexOf("srbm_mod") >= 0; })[0] ||
            (UNITS.tel_p ? "tel_p" : null);
  log("    srbm_mod rows: " + Object.keys(UNITS).filter(function (k) { return (UNITS[k].weapons || []).indexOf("srbm_mod") >= 0; }).join(",") +
      "; tel_p fires " + (UNITS.tel_p ? JSON.stringify(UNITS.tel_p.weapons) : "(no tel_p)"));
  var ik = isk ? at(P, isk, g2.x + 6, g2.y + 5) : null, mk2 = Combat.projectiles.slice();
  if (ik) { ik.order = { type: "idle" }; Combat.fire(Game, ik, WEAPONS.srbm_mod, tg); frames(1); }
  var ip = Combat.projectiles.filter(function (p) { return mk2.indexOf(p) < 0 && p.shooter === ik; });
  var bad2 = [];
  sp2.forEach(function (p) { if (!p._m3 || p._m3.userData.ord !== undefined || meshes(p._m3) !== 3) bad2.push("Smerch round " + (p._m3 ? meshes(p._m3) + " parts, ord " + p._m3.userData.ord : "undrawn")); });
  ip.forEach(function (p) { if (!p._m3 || p._m3.userData.ord !== undefined || meshes(p._m3) !== 18) bad2.push(isk + " round " + (p._m3 ? meshes(p._m3) + " parts" : "undrawn")); });
  chk("a Smerch firing \"mlrs\" and an Iskander-M (" + isk + ") firing \"srbm_mod\" still draw the old rounds", bad2.length === 0 && sp2.length === 12 && ip.length === 1,
      sp2.length + " Smerch rounds, " + ip.length + " " + isk + " round; " + bad2.slice(0, 3).join(", "));
  log("    frame time (noisy, for scale): Render.draw " + (rowMs || 0).toFixed(2) + " ms a frame over an M270 salvo (12 named rounds out of the pods, the backblast)" +
      " against " + smerchMs.toFixed(2) + " ms over a Smerch salvo of 12 old rounds");

  /* ---- a spinning round rolls about its own axis ---- */
  var sg = FX3D.create(THREE, { type: "arc", w: {} }, "m26"), worst = 1, nv = new THREE.Vector3(),
      vel = new THREE.Vector3(0, 0.3, 1).normalize(), si;
  for (si = 0; si < 30; si++) {
    FX3D.orient(sg, 0, 0.3, 1, 1 / 30, si / 30);
    nv.set(1, 0, 0).applyQuaternion(sg.quaternion);
    worst = Math.min(worst, nv.dot(vel));
  }
  chk("a spinning M26 rolls about its own axis: flying along world z it keeps its nose on its path for a second of spin",
      worst > 0.9999 && sg.rotation.x > 5, "worst cos " + worst.toFixed(5) + " over " + sg.rotation.x.toFixed(2) + " rad of spin");

  /* ---- a held missile does not raise the pod ---- */
  var ff, g4 = spot(P, "ground", 58, 6, 14);
  if (g4) {
    Render3D.setCam((g4.x + 2) * TT, (g4.y + 7) * TT);
    var HT = at(P, "nato_e00_tel", g4.x + 2, g4.y + 12), HTt = at(E, "mbt_p", g4.x + 2, g4.y + 2);
    HT.order = { type: "idle" }; HT.orders = []; HTt.order = { type: "idle" };
    frames(3);
    var hM = modelOf(HT), hpe = hM && named(hM, "podelev"), hUp = 0, mk3 = Combat.projectiles.slice();
    /* as ai.js defendBase gives it: a reflex, which does not release a held round */
    HT.order = { type: "attack", target: HTt, auto: true };
    for (ff = 0; ff < 150; ff++) { frames(1); if (hpe && hpe.rotation.y !== 0) hUp++; }
    var hShots = Combat.projectiles.filter(function (p) { return mk3.indexOf(p) < 0 && p.shooter === HT; }).length;
    chk("a HIMARS TEL under an order that did not release its ATACMS keeps the pod down", !!hpe && hUp === 0 && hShots === 0,
        (hpe ? "" : "no podelev drawn; ") + hUp + " raised frames, " + hShots + " rounds, order now " + HT.order.type);
    kill(HT); if (!HTt.dead) kill(HTt); frames(2);
  } else chk("a place for the held-missile case", false, "");

  /* ---- an AT2 mine mission: the order names the mount ---- */
  var g5 = spot(P, "ground", 64, 6, 25);
  if (g5) {
    Render3D.setCam((g5.x + 2) * TT, (g5.y + 12) * TT);
    var MA = at(P, "nato_e90_mlrs", g5.x + 2, g5.y + 24);
    MA.order = { type: "idle" }; MA.orders = []; MA.ang = -Math.PI / 2; MA.tang = 0;   // the module trained east, the mission north
    frames(3);
    var mM = modelOf(MA), mpe = mM && named(mM, "podelev"), wR = WEAPONS[MA.def.weapons[0]], wA = WEAPONS[MA.def.weapons[1]];
    var rR = MA.weaponRange(wR) / TT, rA = MA.weaponRange(wA) / TT;
    /* between the two reaches when the rockets reach further (they do in
       play), so the launcher drives in first: a rule that read the rockets'
       reach had the pod up for the whole drive */
    var dA = rR > rA + 1 ? rR - 0.15 : rA - 2, mFirst = null, mk4 = Combat.projectiles.slice(), upDrive = 0, nDrive = 0;
    var mX = MA.x, mY = MA.y - dA * TT;
    MA.give({ type: "bombard", x: mX, y: mY, wi: 1, until: Game.time + 60 });
    for (ff = 0; ff < 330 && !mFirst; ff++) {
      frames(1);
      if (MA.moving && Math.hypot(MA.x - mX, MA.y - mY) / TT > rA + 1.2) { nDrive++; if (mpe && mpe.rotation.y !== 0) upDrive++; }
      Combat.projectiles.forEach(function (p) { if (!mFirst && mk4.indexOf(p) < 0 && p.shooter === MA && p._m3) mFirst = p; });
    }
    var mEl = mpe ? podAxis(mpe).el : 0;
    chk("an M270 sent on an AT2 mine mission " + dA.toFixed(2) + " tiles off (its rockets reach " + rR.toFixed(1) + ", the AT2 " + rA.toFixed(1) +
        ") drives in stowed and has the pod up when the mine rocket goes, drawn as before",
        !!mFirst && !!mpe && Math.abs(mEl - mpe.userData.el) < 0.02 && mFirst.w === wA && mFirst._m3.userData.ord === undefined && upDrive === 0,
        (mFirst ? "pod at " + (mEl / D2R).toFixed(1) + " deg, " + (mFirst.w === wA ? "the AT2" : "another round") + ", ord " + mFirst._m3.userData.ord
                : "no round in 11 s") + "; raised on " + upDrive + " of " + nDrive + " frames driving beyond the AT2's reach");
    kill(MA); frames(2);
  } else chk("a place for the AT2 mission", false, "");

  /* ---- a launcher already on its bearing: the game fires the same tick ---- */
  var g6 = spot(P, "ground", 70, 6, 12);
  if (g6) {
    Render3D.setCam((g6.x + 2) * TT, (g6.y + 6) * TT);
    var CU = at(P, "mlrs_n", g6.x + 2, g6.y + 10), CUt = at(E, "mbt_p", g6.x + 2, g6.y + 2);
    CU.order = { type: "idle" }; CU.orders = []; CU.ang = CU.tang = -Math.PI / 2; CUt.order = { type: "idle" };
    frames(3);
    var cM = modelOf(CU), cpe = cM && named(cM, "podelev"), seenC = [], lowC = [];
    CU.give({ type: "attack", target: CUt });
    for (ff = 0; ff < 90 && cpe; ff++) {
      frames(1);
      Combat.projectiles.forEach(function (p) {
        if (p.shooter === CU && p._m3 && seenC.indexOf(p) < 0) {
          seenC.push(p);
          var el0 = podAxis(cpe).el;
          if (el0 < cpe.userData.el - 0.05) lowC.push((el0 / D2R).toFixed(0));
        }
      });
    }
    chk("a launcher already on its bearing when it takes a target: at most two rounds of the ripple leave the pod low",
        !!cpe && seenC.length >= 6 && lowC.length <= 2,
        seenC.length + " rounds; left low at [" + lowC.join(", ") + "] deg");
    kill(CU); if (!CUt.dead) kill(CUt); frames(2);
  } else chk("a place for the on-bearing case", false, "");

  /* ---- what the new code costs, timed on a live launcher's own record ---- */
  var g3 = spot(P, "ground", 50, 20, 10);
  Render3D.setCam((g3.x + 4) * TT, (g3.y + 5) * TT);
  var CL = at(P, "nato_e00_mlrs", g3.x + 2, g3.y + 5), CT = at(E, "mbt_p", g3.x + 2, g3.y + 5 - 8);
  CL.order = { type: "idle" }; CT.order = { type: "idle" };
  frames(2);
  var pr = Render3D.launcherProbe(CL), N = 20000, i, t2;
  if (!pr) { chk("the cost probe reaches a drawn launcher", false, ""); return; }
  CL.order = { type: "attack", target: CT };
  t2 = preciseTime(); for (i = 0; i < N; i++) pr.pose(0); var usPose = (preciseTime() - t2) * 1e6 / N;
  CL.order = { type: "idle" };
  t2 = preciseTime(); for (i = 0; i < N; i++) pr.pose(0); var usIdle = (preciseTime() - t2) * 1e6 / N;
  var before = new Set(R3().scene.children), NL = 60;
  t2 = preciseTime(); for (i = 0; i < NL; i++) pr.launch({ shooter: CL }); var usLaunch = (preciseTime() - t2) * 1e6 / NL;
  var mine = R3().scene.children.filter(function (c) { return !before.has(c) && c.userData && c.userData.life !== undefined; });
  var added = mine.length;
  frames(70);
  var left = mine.filter(function (c) { return c.parent === R3().scene; }).length;
  log("    cost: laying rule " + usPose.toFixed(2) + " us a launcher a frame with a target in reach, " + usIdle.toFixed(2) +
      " us idle; a launch (mouth, flash, backblast) " + usLaunch.toFixed(1) + " us once a round, " + (added / NL).toFixed(2) +
      " effect meshes a round (" + added + " for " + NL + "), " + left + " left 2.3 s later");
  chk("the new code is cheap and its effects are bounded and go away", usPose < 20 && usLaunch < 2000 && added <= 3 * NL && left <= 0,
      usPose.toFixed(2) + " us, " + usLaunch.toFixed(1) + " us, " + added + " meshes, " + left + " left");
}
