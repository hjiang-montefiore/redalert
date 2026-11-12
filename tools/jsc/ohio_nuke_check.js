/* tools/jsc/ohio_nuke_check.js - the Ohio's one nuclear Trident on the
   army's one nuclear charge, and the Trident II D5 drawn as itself - checked
   on the real game and the REAL 3D renderer under JavaScriptCore.

     python3 tools/jsc/scene3d.py tools/jsc/ohio_nuke_check.js --limit 3000

   (owner) the Ohio carries ONE nuclear Trident on top of its conventional
   ones, fired like the Strategic Silo's, under the rule the owner chose
   (js/subnuke.js): one nuclear charge an army, shared by its silo(s) and its
   Ohio(s), so firing from either resets both; no silo, the Ohio charges it
   herself at the silo's time; the launch is from the boat, submerged, cold,
   with the silo's alert; the Ohio sunk takes her charge with her unless a
   silo holds it. And the Ohio's (and the Vanguard's) Trident is drawn as the
   real D5 (js/fx3d.js ORD.trident2): 13.42 m x 2.11 m, no fins, a blunt
   fairing with the aerospike that telescopes out after the first stage
   lights. Checked:
     0. the data: only the US Ohio has the nuclear Trident; it is the silo's
        weapon (charge, dmg, aoe, warhead, flight, alert, nuke);
     1. the round: trident2 builds to 13.42 x 2.11 m with no fins, a stowed
        spike and a motor; only ssbn_n and ssbn_b name it;
     2. an Ohio alone charges at the silo's rate, says READY to her own side,
        is on the launch bar, and fires one nuclear Trident: the alert, the
        round leaving from where she lies, under water, and the warhead on
        the aim point; a second launch is refused;
     3. the conventional magazine and its clock are untouched by it, and a
        conventional Trident still goes;
     4. the cold launch as drawn: unlit under water, out and hanging nose-up
        unlit, then lit and climbing; the spike out after ignition; the
        round drawn is the trident2;
     5. with a silo: the boat's charge IS the silo's; firing the Ohio resets
        the silo, firing the silo resets the Ohio; a charge the boat built up
        alone goes over to a silo finished later;
     6. the Ohio sunk: alone, her charge goes with her; with a silo, the
        silo keeps it;
     7. the Vanguard (and any other boomer) has no nuclear Trident, and its
        conventional round is drawn as the trident2 too;
     8. the commander: an AI Ohio with no silo, its charge ready and one of
        our structures seen under its radar, fires it - and we are told
        NUCLEAR LAUNCH DETECTED. */
var TT = 32, PXM = 0.625, PASS = 0, FAIL = 0, DT = 1 / 30;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-cash", "200000"); set("opt-seed", "ohionuke"); set("opt-fog", "0"); set("opt-3d", "1");
  CFG.GFX_LEVEL = "high";
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

/* ---------------- helpers ---------------- */
var H, E, SAID = [];
function hearAlerts() {
  var a0 = UI.alert;
  UI.alert = function (m) { SAID.push({ t: Game.time, m: String(m) }); return a0.apply(this, arguments); };
}
function said(re, t0) { return SAID.some(function (a) { return a.t >= (t0 || 0) && re.test(a.m); }); }
function ticks(sec, stop, each) {
  var n = Math.round(sec / DT);
  for (var i = 0; i < n; i++) { if (each) each(); Game.tick(DT); if (stop && stop()) return (i + 1) * DT; }
  return -1;
}
function frames(n, each) { for (var i = 0; i < n; i++) { Game.tick(DT); Render.draw(DT, UI.input); if (each) each(); } }
function named(g, n) { var f = null; g.traverse(function (o) { if (!f && o.name === n) f = o; }); return f; }
function meshes(g) { var c = 0; g.traverse(function (o) { if (o.isMesh) c++; }); return c; }
function gone(u) {
  if (!u) return; u.dead = true;
  var i = Game.entities.indexOf(u); if (i >= 0) Game.entities.splice(i, 1);
  var l = u.owner && (u.kind === "building" ? u.owner.buildings : u.owner.units);
  if (l) { i = l.indexOf(u); if (i >= 0) l.splice(i, 1); }
}
function strip(p) { p.units.slice().forEach(gone); }
/* open water: the tile and two rings round it wet, far from land */
function openSea(cx, cy, rMin) {
  var M = Game.map;
  for (var r = rMin || 0; r < 90; r++) for (var a = 0; a < 64; a++) {
    var x = (cx + Math.cos(a / 64 * 6.283) * r) | 0, y = (cy + Math.sin(a / 64 * 6.283) * r) | 0, ok = true;
    for (var j = -2; j <= 2 && ok; j++) for (var i = -2; i <= 2; i++)
      if (!GameMap.passable(M, x + i, y + j, "sea")) { ok = false; break; }
    if (ok) return { x: x, y: y };
  }
  return null;
}
function boat(p, id, t) { var u = Game.spawnUnitAt(p, id, t.x * TT + 16, t.y * TT + 16); u.order = { type: "idle" }; u.orders = []; return u; }
/* a structure on dry ground near tile (cx, cy) */
function ashore(p, key, cx, cy, r0) {
  var M = Game.map, d = BUILDINGS[key];
  for (var r = r0 || 0; r < 80; r++) for (var a = 0; a < 64; a++) {
    var x = (cx + Math.cos(a / 64 * 6.283) * r) | 0, y = (cy + Math.sin(a / 64 * 6.283) * r) | 0, ok = true;
    if (x < 3 || y < 3 || x + d.w >= M.W - 3 || y + d.h >= M.H - 3) continue;
    for (var j = -1; j <= d.h && ok; j++) for (var i = -1; i <= d.w; i++)
      if (!GameMap.passable(M, x + i, y + j, "ground") || Game.tileBlocked(x + i, y + j, null)) { ok = false; break; }
    if (!ok) continue;
    var b = Game.placeBuilding(p, key, x, y, true);
    if (b) { b.buildProgress = 1; return b; }
  }
  return null;
}
function wIdx(u, base) { for (var i = 0; i < u.def.weapons.length; i++) if (u.def.weapons[i].split("__")[0] === base) return i; return -1; }
function shown(u) { var r = null; Combat.projectiles.forEach(function (p) { if (p.shooter === u && p.show) r = p; }); return r; }

function run() {
  H = Game.human; E = Game.players[1];
  AI.setPeace(E, true);
  Game.checkVictory = function () {};
  hearAlerts();
  chk("the 3D renderer is up", Render === Render3D, "");
  var SW = SubNuke.sw(), SILO = BUILDINGS.nukesilo.superweapon;

  /* ---------------- 0. the data ---------------- */
  var withNuke = Object.keys(UNITS).filter(function (k) { return UNITS[k].subNuke; });
  chk("only the US Ohio carries the nuclear Trident", withNuke.join(",") === "ssbn_n", withNuke.join(","));
  var same = ["charge", "dmg", "aoe", "warhead", "flight", "alert", "nuke"].filter(function (k) { return SW[k] !== SILO[k]; });
  chk("it is the Strategic Silo's weapon: charge, dmg, aoe, warhead, flight, alert and nuke", !same.length,
      "differs: " + (same.join(",") || "none") + "; charge " + SW.charge + " s, dmg " + SW.dmg + ", aoe " + SW.aoe + ", " + SW.alert);

  /* ---------------- 1. the round ---------------- */
  var g = FX3D.create(THREE, { type: "missile", w: {} }, "trident2"), V = FX3D.VIS;
  g.updateMatrixWorld(true);
  var box = new THREE.Box3(), sp = named(g, "spike");
  g.children.forEach(function (c) { if (c.name !== "flame" && c.name !== "core" && c.name !== "spike") box.expandByObject(c); });
  var Lm = (box.max.x - box.min.x) / V, Dm = (box.max.y - box.min.y) / V;
  chk("trident2 builds to 13.42 m x 2.11 m, no fins, its spike stowed, a motor flame",
      Math.abs(Lm / 13.42 - 1) < 0.005 && Math.abs(Dm / 2.11 - 1) < 0.02 && !named(g, "fins") && sp && sp.scale.x < 0.05 &&
      named(g, "flame") && named(g, "core") && g.userData.ord === "trident2",
      Lm.toFixed(3) + " x " + Dm.toFixed(3) + " m, " + meshes(g) + " meshes, fins " + !!named(g, "fins") + ", spike " + (sp ? sp.scale.x : "none"));
  var withT = Object.keys(UNIT_MODELS).filter(function (k) {
    var o = UNIT_MODELS[k].ord; return o && Object.keys(o).some(function (w) { return o[w] === "trident2"; });
  }).sort();
  chk("the rows that name it are the Ohio and the Vanguard", withT.join(",") === "ssbn_b,ssbn_n", withT.join(","));

  /* ---------------- 2. an Ohio alone ---------------- */
  strip(H); strip(E);
  H.buildings.filter(function (b) { return b.def.superweapon; }).forEach(gone);
  var hx = (H.homeX / TT) | 0, hy = (H.homeY / TT) | 0, ex = (E.homeX / TT) | 0, ey = (E.homeY / TT) | 0;
  var sea = openSea(hx, hy, 4);
  if (!sea) { chk("open water for the Ohio", false, ""); return; }
  var O = boat(H, "ssbn_n", sea);
  Render3D.setCam(O.x, O.y);
  var si = wIdx(O, "slbm_n"), mag0 = O.mag ? O.mag[si] : undefined, cd0 = O.cooldowns[si];
  ticks(10);
  var rate = H.subNuke;
  chk("alone, she charges at the silo's rate (10 s of " + SW.charge + ")", Math.abs(rate - 10 / SW.charge) < 0.002 && O.swCharge === H.subNuke,
      "after 10 s: " + rate.toFixed(4) + ", want " + (10 / SW.charge).toFixed(4));
  H.subNuke = 0.999; var t0 = Game.time;
  var readyAt = ticks(5, function () { return O.swCharge >= 1; });
  chk("...and at full charge her side is told NUCLEAR TRIDENT READY", readyAt >= 0 && said(/NUCLEAR TRIDENT READY/, t0),
      readyAt < 0 ? "never ready" : "ready after " + readyAt.toFixed(2) + " s");
  /* the launch bar: the ui's own sync, through UI.frame */
  var bar = null, uiErr = "";
  try { UI.frame(DT); bar = document.getElementById("swbar"); } catch (e) { uiErr = String(e); }
  var onBar = bar && Array.prototype.some.call(bar.children || [], function (el) { return el._b === O; });
  var barTx = "";
  if (onBar) Array.prototype.forEach.call(bar.children, function (el) {
    if (el._b !== O) return;
    var tx = el.querySelector(".swtx"); barTx = el.className + (tx && tx.textContent ? " \"" + tx.textContent + "\"" : "");
    onBar = /\bnuke\b/.test(el.className) && el.classList.contains("ready");
  });
  chk("she is on the launch bar, as a silo is: a nuclear entry, READY", !!onBar, uiErr || barTx);
  var tgt = ashore(E, "power", ex, ey, 2);
  var hp0 = tgt ? tgt.hp : 0;
  var tx = tgt ? tgt.x : E.homeX, ty = tgt ? tgt.y : E.homeY;
  t0 = Game.time;
  var ok = Game.launchSuperweapon(O, tx, ty), P1 = shown(O);
  chk("she fires one nuclear Trident on a target, and the launch alert goes up", ok && said(/NUCLEAR LAUNCH DETECTED/, t0) && O.swCharge === 0 && H.subNuke === 0,
      "launched " + ok + ", charge " + O.swCharge + "; " + SAID.filter(function (a) { return a.t >= t0; }).map(function (a) { return a.m; }).join(" | "));
  chk("the round leaves from where she lies, under water, as a cold launch",
      !!P1 && P1.x === O.x && P1.y === O.y && P1.z < 0 && P1.wet === true && P1.subLaunch === 0,
      P1 ? "at " + (P1.x - O.x) + "," + (P1.y - O.y) + " from her, z " + P1.z : "no round");
  chk("a second launch is refused until the charge is back", Game.launchSuperweapon(O, tx, ty) === false, "");

  /* ---------------- 4. the cold launch, drawn ---------------- */
  var seen = { wet: 0, wetLit: 0, hang: 0, hangLit: 0, hangUp: 0, lit: 0, litOn: 0, spikeOut: -1, ignAt: -1 }, ord = null, f = 0;
  frames(1);
  for (f = 0; f < 150 && P1 && Combat.projectiles.indexOf(P1) >= 0; f++) {
    frames(1);
    var m3 = P1._m3; if (!m3) continue;
    ord = m3.userData.ord;
    var fl = named(m3, "flame"), spk = named(m3, "spike");
    if (P1.subLaunch !== undefined && P1.wet) { seen.wet++; if (fl.visible) seen.wetLit++; }
    else if (P1.subLaunch !== undefined && P1.unlit) {
      seen.hang++; if (fl.visible) seen.hangLit++;
      if (m3.rotation.z > 1.3) seen.hangUp++;          // pitch: nose to the sky
    } else { seen.lit++; if (fl.visible) seen.litOn++; if (seen.ignAt < 0) seen.ignAt = Game.time; }
    if (spk && spk.scale.x > 0.99 && seen.spikeOut < 0) seen.spikeOut = Game.time;
  }
  chk("drawn as the trident2", ord === "trident2", "" + ord);
  chk("unlit in the water, out and hanging nose-up unlit, then lit and climbing",
      seen.wet > 10 && !seen.wetLit && seen.hang >= 6 && !seen.hangLit && seen.hangUp === seen.hang && seen.lit > 10 && seen.litOn === seen.lit,
      JSON.stringify(seen));
  chk("the aerospike is out shortly after the first stage lights", seen.ignAt >= 0 && seen.spikeOut > seen.ignAt && seen.spikeOut - seen.ignAt < 1.0,
      seen.spikeOut < 0 ? "never out" : "out " + (seen.spikeOut - seen.ignAt).toFixed(2) + " s after ignition");
  chk("the shown round leaves the board, never detonating", !P1 || Combat.projectiles.indexOf(P1) < 0, "frames " + f);
  ticks(SW.flight + 2);
  chk("the warhead comes down on the aim point (the silo's strike)", !tgt || tgt.dead || tgt.hp < hp0,
      tgt ? "power plant hp " + hp0 + " -> " + Math.round(tgt.hp) + (tgt.dead ? " (destroyed)" : "") : "no target placed");

  /* ---------------- 3. the conventional magazine ---------------- */
  chk("the conventional Tridents are untouched: same mounts, magazine and clock",
      O.def.weapons.join(",") === "slbm_n__ssbn_n,torp_mk48" && O.def.magazine.slbm_n__ssbn_n === 20 &&
      (O.mag ? O.mag[si] : undefined) === mag0 && O.cooldowns[si] === cd0 && WEAPONS.slbm_n__ssbn_n.reload === 20,
      O.def.weapons.join(",") + "; magazine " + (mag0 === undefined ? "full" : mag0) + " -> " + (O.mag ? O.mag[si] : "full") + "; cooldown " + cd0 + " -> " + O.cooldowns[si]);
  var T2 = ashore(E, "power", ((O.x / TT) | 0), ((O.y / TT) | 0), 8);
  var conv = null;
  if (T2) {
    O.give({ type: "attack", target: T2 });
    ticks(25, function () { Combat.projectiles.forEach(function (p) { if (p.shooter === O && !p.show) conv = p; }); return !!conv; });
  }
  var magAfter = O.mag ? O.mag[si] : undefined;
  chk("...and a conventional Trident still goes, from the magazine", !!conv && magAfter === (mag0 === undefined ? 20 : mag0) - 1,
      conv ? "magazine " + (mag0 === undefined ? "full (20)" : mag0) + " -> " + magAfter : (T2 ? "nothing fired" : "no target ashore in reach"));
  if (conv) { frames(2); chk("...drawn as the trident2", conv._m3 && conv._m3.userData.ord === "trident2", conv._m3 ? "" + conv._m3.userData.ord : "no mesh"); }
  O.order = { type: "idle" }; O.orders = [];

  /* ---------------- 5. with a silo ---------------- */
  var S = ashore(H, "nukesilo", hx, hy, 3);
  if (!S) { chk("a place for the silo", false, ""); return; }
  ticks(DT);
  chk("a silo standing, her charge IS the silo's", O.swCharge === S.swCharge && H.subNuke === S.swCharge,
      "silo " + S.swCharge.toFixed(4) + ", Ohio " + O.swCharge.toFixed(4));
  S.swCharge = 1; ticks(DT);
  ok = Game.launchSuperweapon(O, tx, ty);
  chk("firing from the Ohio resets the silo", ok && S.swCharge === 0 && O.swCharge === 0, "launched " + ok + ", silo " + S.swCharge + ", Ohio " + O.swCharge);
  S.swCharge = 1; ticks(DT);
  var readyBoth = O.swCharge === 1;
  ok = Game.launchSuperweapon(S, tx, ty);
  chk("firing from the silo resets the Ohio, the same tick", readyBoth && ok && O.swCharge === 0 && H.subNuke === 0,
      "Ohio ready before " + readyBoth + "; launched " + ok + ", Ohio " + O.swCharge);
  chk("...and the refused launch from the Ohio with the silo spent", Game.launchSuperweapon(O, tx, ty) === false, "");
  /* the boat's own charge goes over to a silo finished later */
  gone(S); ticks(DT);
  H.subNuke = 0.6; ticks(DT);
  var S2 = ashore(H, "nukesilo", hx, hy, 3);
  ticks(DT);
  chk("a charge the Ohio built alone goes over to a silo finished later", S2 && S2.swCharge >= 0.6 && Math.abs(O.swCharge - S2.swCharge) < 1e-9,
      S2 ? "silo " + S2.swCharge.toFixed(4) + ", Ohio " + O.swCharge.toFixed(4) : "no silo");

  /* ---------------- 6. the Ohio sunk ---------------- */
  S2.swCharge = 0.7; ticks(DT);
  gone(O); ticks(DT);
  chk("sunk with a silo standing: the silo keeps the charge", Math.abs(S2.swCharge - 0.7) < 0.01, "silo " + S2.swCharge.toFixed(4));
  gone(S2);
  var O2 = boat(H, "ssbn_n", sea);
  H.subNuke = 0.8; ticks(DT);
  var had = O2.swCharge;
  gone(O2); ticks(DT);
  var O3 = boat(H, "ssbn_n", sea); ticks(DT);
  chk("sunk with no silo: her charge goes with her", had >= 0.8 && H.subNuke < 0.01 && O3.swCharge < 0.01,
      "had " + had.toFixed(3) + ", the next Ohio starts at " + O3.swCharge.toFixed(4));
  gone(O3);

  /* ---------------- 7. the Vanguard ---------------- */
  var VG = boat(H, "ssbn_b", sea);
  ticks(DT);
  chk("the Vanguard has no nuclear Trident", !SubNuke.holds(VG) && !VG.def.subNuke && Game.launchSuperweapon(VG, tx, ty) === false, "");
  var T3 = ashore(E, "power", ((VG.x / TT) | 0), ((VG.y / TT) | 0), 8), cv = null;
  if (T3) {
    VG.give({ type: "attack", target: T3 });
    ticks(4, function () { Combat.projectiles.forEach(function (p) { if (p.shooter === VG) cv = p; }); return !!cv; });
  }
  if (cv) frames(2);
  chk("her Trident II D5 is drawn as the trident2 too", !!cv && cv._m3 && cv._m3.userData.ord === "trident2",
      cv ? (cv._m3 ? "" + cv._m3.userData.ord : "no mesh") : "nothing fired");
  gone(VG);

  /* ---------------- 8. the commander ---------------- */
  /* the enemy seat becomes an American one with an Ohio and no silo */
  strip(E);
  E.buildings.filter(function (b) { return b.def.superweapon; }).forEach(gone);
  E.faction = "nato";
  var esea = openSea(ex, ey, 4);
  var EO = esea ? boat(E, "ssbn_n", esea) : null;
  if (!EO) { chk("open water for the commander's Ohio", false, ""); return; }
  var dome = E.buildings.filter(function (b) { return !b.dead && b.def.radar; })[0] || ashore(E, "radar", ex, ey, 2);
  /* one of ours, near the dome, where its radar and its eyes have it */
  var bait = dome ? ashore(H, "power", (dome.x / TT) | 0, (dome.y / TT) | 0, 4) : null;
  E.subNuke = 1; ticks(DT);
  AI.setPeace(E, false);
  t0 = Game.time;
  var fired = ticks(30, function () { return E.subNuke === 0; });
  AI.setPeace(E, true);
  chk("an AI Ohio with no silo fires its nuclear Trident on a structure it has seen under its radar",
      fired >= 0 && !!shown(EO) || (fired >= 0 && E.subNuke === 0),
      fired < 0 ? "not fired in 30 s (bait " + !!bait + ", dome " + !!dome + ", covered " + (bait ? Game.radarCovers(E, bait.x, bait.y) : "-") + ")" : "fired after " + fired.toFixed(2) + " s");
  chk("...and we are told: NUCLEAR LAUNCH DETECTED, inbound", said(/NUCLEAR LAUNCH DETECTED.*INBOUND/, t0),
      SAID.filter(function (a) { return a.t >= t0; }).map(function (a) { return a.m; }).slice(0, 4).join(" | "));
}
