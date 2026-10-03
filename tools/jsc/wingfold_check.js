/* tools/jsc/wingfold_check.js - carrier aircraft are drawn with their wings
   folded on a ship's deck, and spread everywhere else, on the REAL renderer
   under JavaScriptCore.

     python3 tools/jsc/scene3d.py tools/jsc/wingfold_check.js

   A hero may give its folding outer wing panels as groups named "wingfold"
   (origin on the hinge line, userData.fold = { axis, angle }); render3d.js
   folds them once the machine stands at rest on a deck (foldOnDeck) and lays
   the deck out with the folded plan (airPlanOf). What is held:
     1. each folding type has two fold groups; spread, its span is the
        published span; folded, the wing's width is the published folded span
        (2%), the two panels do not cross, nothing goes below the wheels, and
        the draw calls stay within 14;
     2. no other aircraft model has a fold group, and on a deck a machine
        without one is drawn exactly as its template (every node's turn);
     3. the complement a carrier sails with is drawn folded on her deck the
        frame it is drawn (what tools/jsc/parked3d_check.js C measures);
     4. it spreads before it leaves the deck and is never folded in the air,
        coming back down it lands spread and folds once it stands on her deck;
     5. in flight, and parked on an airbase, the wings are spread;
     6. the ghost of an enemy machine last seen folded on a deck is folded. */
var TT = 32, DT = 1 / 30, PASS = 0, FAIL = 0, H = null;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
(function () {
  if (typeof Impact3D === "undefined") return;
  var ii = Impact3D.init;
  Impact3D.init = function (T3, th, G, h) { H = h; return ii.apply(this, arguments); };
})();
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-cash", "200000"); set("opt-seed", "btest"); set("opt-fog", "0"); set("opt-3d", "1");
  CFG.GFX_LEVEL = "high";
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});
function frames(n, tick) { for (var i = 0; i < n; i++) { if (tick) Game.tick(DT); Render.draw(DT, UI.input); } }
function recOf(e) { return H ? H.recOf(e.id) : null; }

/* published spans, spread and folded (m): NAVAIR descriptive arrangements of
   the A-6E (53'-0", 25'-4" folded) and the EA-6B (53'-0", 299" = 24'-11"
   folded); the F-4: 38 ft 5 in, 27 ft 7 in folded (F-4E figures) */
var PUB = {
  nato_e60_cstrike: [16.15, 7.72], nato_e80_cstrike: [16.15, 7.72], nato_e90_cstrike: [16.15, 7.72],
  nato_e60_ewair: [16.15, 7.595], nato_e90_ewair: [16.15, 7.595],
  nato_e60_cfighter: [11.70, 8.41], nato_e60_fighter: [11.70, 8.41], nato_e80_sead: [11.70, 8.41]
};
var _v = new THREE.Vector3(), _ax = new THREE.Vector3();
function foldsOf(o) { var L = []; o.traverse(function (x) { if (x.name === "wingfold") L.push(x); }); return L; }
function pose(parts, f) {
  parts.forEach(function (p) { var d = p.userData.fold; p.quaternion.setFromAxisAngle(_ax.set(d.axis[0], d.axis[1], d.axis[2]), d.angle * f); });
}
/* how far a fold group is turned, as a fraction of its fold */
function amount(p) { var d = p.userData.fold; return 2 * Math.acos(Math.min(1, Math.abs(p.quaternion.w))) / Math.abs(d.angle); }
function foldAmt(rec) { var a = 0; (rec.folds || []).forEach(function (p) { a = Math.max(a, amount(p)); }); return a; }
function foldMin(rec) { var a = 1; (rec.folds || []).forEach(function (p) { a = Math.min(a, amount(p)); }); return rec.folds && rec.folds.length ? a : 0; }
function verts(o, fn) {
  o.updateMatrixWorld(true);
  o.traverse(function (m) {
    if (!m.isMesh || !m.geometry || !m.geometry.attributes.position) return;
    var p = m.geometry.attributes.position;
    for (var i = 0; i < p.count; i++) { _v.fromBufferAttribute(p, i).applyMatrix4(m.matrixWorld); fn(_v); }
  });
}
function seaSpot(r0, skip) {
  var M = Game.map, n = 0;
  for (var y = r0; y < M.H - r0; y += 2) for (var x = r0; x < M.W - r0; x += 2) {
    var ok = true;
    for (var j = -r0; j <= r0 && ok; j += 2) for (var i = -r0; i <= r0; i += 2)
      if (M.terrain[(y + j) * M.W + x + i] !== T.WATER) { ok = false; break; }
    if (ok && n++ >= (skip || 0)) return { x: x, y: y };
  }
  return null;
}
function flatSpot() {
  var M = Game.map, P = Game.human, hx = (P.homeX / TT) | 0, hy = (P.homeY / TT) | 0;
  for (var r = 8; r < 90; r++) for (var a = 0; a < 64; a++) {
    var an = a / 64 * 6.283, x = (hx + Math.cos(an) * r) | 0, y = (hy + Math.sin(an) * r) | 0;
    if (x < 12 || y < 12 || x + 12 >= M.W || y + 12 >= M.H) continue;
    var h0 = H.heightAt(x * TT, y * TT), ok = true;
    for (var j = -10; j <= 10 && ok; j += 2) for (var i = -10; i <= 10; i += 2)
      if (Math.abs(H.heightAt((x + i) * TT, (y + j) * TT) - h0) > 0.01 || !GameMap.passable(M, x + i, y + j, "ground")) { ok = false; break; }
    if (ok) return { x: x, y: y };
  }
  return null;
}
function drop(list) {
  list.forEach(function (u) {
    u.dead = true;
    var i = Game.entities.indexOf(u); if (i >= 0) Game.entities.splice(i, 1);
    var j = u.owner.units.indexOf(u); if (j >= 0) u.owner.units.splice(j, 1);
    var k = u.owner.buildings.indexOf(u); if (k >= 0) u.owner.buildings.splice(k, 1);
  });
  frames(1);
}
function park(list, host) {
  list.forEach(function (u) { u.padOn = host || null; u.parked = true; u.order = { type: "parked" }; u.moving = false; u.stance = "hold"; });
  if (host) for (var k = 0; k < 2; k++) list.forEach(function (u) { u.updateAir(DT); });
}
/* every node of a drawn instance turned exactly as its template's, but the
   parts the engine turns of its own (a rotor, a turret, a launcher's pod) */
var ANIM = { rotor: 1, tailrotor: 1, rotordisc: 1, turret: 1, podelev: 1, mountwrap: 1, roadwheel: 1 };
function asTemplate(rec) {
  var a = [], b = [];
  rec.inst.traverse(function (o) { a.push(o); });
  rec.tpl.traverse(function (o) { b.push(o); });
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; i++) if (!ANIM[a[i].name] && !a[i].quaternion.equals(b[i].quaternion)) return false;
  return true;
}

function run() {
  var P = Game.human, E = Game.players[1];
  AI.setPeace(E, true); Game.checkVictory = function () {};
  chk("the 3D renderer is up, and its records are reachable", Render === Render3D && !!H, "");
  if (!H) return;
  var KEYS = Object.keys(PUB);

  /* ---- 1. the models: spans spread and folded ---- */
  var rows = [], bad = [];
  KEYS.forEach(function (k) {
    var m = UNIT_MODELS[k].build(THREE, Models3D, { team: "#3f7fd0" }), parts = foldsOf(m);
    var ok = parts.length === 2 && parts.every(function (p) { return p.userData.fold && p.userData.fold.axis && typeof p.userData.fold.angle === "number"; });
    if (!ok) { bad.push(k + " has " + parts.length + " fold groups"); return; }
    var bb = new THREE.Box3().setFromObject(m), span = bb.max.y - bb.min.y, z0 = bb.min.z, calls = 0;
    m.traverse(function (o) { if (o.isMesh) calls++; });
    pose(parts, 1);
    var w = 0, pMin = Infinity, sMax = -Infinity;
    parts.forEach(function (p) {
      var port = p.userData.fold.angle > 0;
      verts(p, function (v) { w = Math.max(w, Math.abs(v.y)); if (port) pMin = Math.min(pMin, v.y); else sMax = Math.max(sMax, v.y); });
    });
    m.updateMatrixWorld(true);
    var fb = new THREE.Box3().setFromObject(m);
    var e1 = span / PUB[k][0] - 1, e2 = 2 * w / PUB[k][1] - 1;
    rows.push(k + " " + span.toFixed(2) + " (" + (e1 * 100).toFixed(1) + "%) folded " + (2 * w).toFixed(2) + " (" + (e2 * 100).toFixed(1) + "%), top " +
      (fb.max.z - z0).toFixed(2) + " m, " + calls + " calls");
    if (Math.abs(e1) > 0.02 || Math.abs(e2) > 0.02 || !(pMin > 0) || !(sMax < 0) || fb.min.z < z0 - 1e-6 || calls > 14)
      bad.push(k + ": span " + e1.toFixed(3) + ", folded " + e2.toFixed(3) + ", panels " + pMin.toFixed(3) + "/" + sMax.toFixed(3) + ", low " + (fb.min.z - z0).toFixed(3) + ", calls " + calls);
  });
  chk("1. " + KEYS.length + " folding types: two fold groups, the published span spread and the published folded span folded (2%), panels clear of each other, nothing below the wheels, at most 14 draw calls",
      bad.length === 0 && rows.length === KEYS.length, bad.length ? bad.join("; ") : rows.length + " types");
  rows.forEach(function (r) { log("    " + r); });

  /* ---- 2. no other aircraft model has a fold group ---- */
  var others = [], nOther = 0;
  Object.keys(UNIT_MODELS).forEach(function (k) {
    if (PUB[k] || !UNITS[k] || UNITS[k].layer !== "air") return;
    var m = null;
    try { m = UNIT_MODELS[k].build(THREE, Models3D, { team: "#3f7fd0" }); } catch (e) { return; }
    nOther++;
    if (m && foldsOf(m).length) others.push(k);
  });
  chk("2. no other aircraft model has a fold group", nOther > 50 && others.length === 0, nOther + " other models built; with fold groups: " + (others.join(", ") || "none"));

  /* ---- 3. the complement each carrier sails with, the frame it is drawn ---- */
  var s0 = seaSpot(8), fac0 = P.faction;
  Render3D.setCam(s0.x * TT, s0.y * TT);
  var HOSTS = Object.keys(UNITS).filter(function (id) { var d = UNITS[id]; return d.layer === "sea" && d.carrier; });
  var onDecks = 0, folded = 0, plain = 0, plainOk = 0, hostsWith = [], keep = null;
  HOSTS.forEach(function (hid) {
    var d = UNITS[hid];
    P.faction = d.fac || "nato"; P.era = d.from || "e20";
    var ship = Game.spawnUnitAt(P, hid, s0.x * TT + 16, s0.y * TT + 16);
    ship.moving = false;
    Game.embarkComplement(ship);
    var wing = ship.wing();
    wing.forEach(function (u) { u.stance = "hold"; });
    frames(2);
    var any = false;
    wing.forEach(function (u) {
      var r = recOf(u);
      if (!r) return;
      if (r.folds && r.folds.length) { onDecks++; any = true; if (foldMin(r) > 0.999) folded++; }
      else { plain++; if (asTemplate(r)) plainOk++; }
    });
    if (any) hostsWith.push(hid);
    if (any && !keep) keep = { ship: ship, wing: wing };
    else drop(wing.concat([ship]));
  });
  chk("3. on every carrier, the complement's folding machines are drawn folded the frame they are drawn, and every other machine as its template",
      onDecks > 0 && folded === onDecks && plain > 20 && plainOk === plain,
      folded + " of " + onDecks + " folding machines folded on " + hostsWith.join(", ") + "; " + plainOk + " of " + plain + " others as their templates");

  /* ---- 4. off the deck and back ---- */
  if (keep) {
    var jet = keep.wing.filter(function (u) { var r = recOf(u); return r && r.folds && r.folds.length; })[0], jr = recOf(jet);
    var inAir = 0, foldedAir = 0, first = -1, maxUp = 0;
    jet.stance = "fire";
    jet.give({ type: "move", x: jet.x + 30 * TT, y: jet.y - 10 * TT });
    for (var f = 0; f < 90; f++) {
      frames(1, true);
      jr = recOf(jet);
      var up = jr.grp.position.y - jr.deckRest;
      maxUp = Math.max(maxUp, up);
      if (f === 0) first = foldAmt(jr);
      if (up > 0.05) { inAir++; if (foldAmt(jr) > 0) foldedAir++; }
    }
    chk("4. a folded machine spreads its wings before it leaves the deck, and is never folded in the air",
        first === 0 && inAir > 30 && foldedAir === 0 && maxUp > 10,
        jet.def.id + ": first frame of the sortie folded " + first.toFixed(2) + "; " + foldedAir + " of " + inAir + " frames off the deck folded; climbed " + maxUp.toFixed(1) + " m");
    jet.give({ type: "rtb" });
    var landed = -1, foldDown = 0, nDown = 0, done = -1;
    for (var g = 0; g < 1800 && done < 0; g++) {
      frames(1, true);
      jr = recOf(jet);
      var hgt = jr.grp.position.y - jr.deckRest;
      if (jr.deckShip && hgt > 0.05) { nDown++; if (foldAmt(jr) > 0) foldDown++; }
      if (landed < 0 && jet.order && jet.order.type === "parked" && jr.deckShip && hgt <= 0.05) landed = g;
      if (landed >= 0 && foldMin(jr) > 0.999) done = g;
    }
    chk("4. coming back down onto her deck it is spread, and folds within a few seconds once it stands on it",
        landed >= 0 && done >= landed && (done - landed) * DT <= 3.5 && foldDown === 0,
        "on deck after " + (landed * DT).toFixed(1) + " s, folded " + ((done - landed) * DT).toFixed(1) + " s later; " + foldDown + " of " + nDown + " frames on the way down folded");
    drop(keep.wing.concat([keep.ship]));
  } else chk("4. a carrier takes a folding machine", false, "none found");

  /* ---- 5. in flight, and on an airbase ---- */
  P.faction = "nato"; P.era = "e60";
  var g0 = flatSpot();
  Render3D.setCam(g0.x * TT, g0.y * TT);
  var fly = KEYS.map(function (k) { var u = Game.spawnUnitAt(P, k, g0.x * TT, g0.y * TT); u.give({ type: "move", x: u.x + 20 * TT, y: u.y }); return u; });
  frames(20, true);
  var flyBad = fly.filter(function (u) { var r = recOf(u); return !r || !r.folds || r.folds.length !== 2 || foldAmt(r) !== 0; });
  chk("5. in flight every folding type is spread", flyBad.length === 0, fly.length + " in the air; folded or without its groups: " + (flyBad.map(function (u) { return u.def.id; }).join(", ") || "none"));
  drop(fly);
  var ab = Game.placeBuilding(P, "airbase", g0.x - 1, g0.y - 1, true);
  ab.buildProgress = 1;
  var abBad = [], nAb = 0;
  for (var i0 = 0; i0 < KEYS.length; i0 += 4) {
    var pl = KEYS.slice(i0, i0 + 4).map(function (k) { return Game.spawnUnitAt(P, k, ab.x, ab.y); });
    park(pl, ab);
    frames(4, true);
    pl.forEach(function (u) { var r = recOf(u); nAb++; if (!r || foldAmt(r) !== 0 || !u.parked) abBad.push(u.def.id); });
    drop(pl);
  }
  chk("5. parked on an airbase every folding type is spread", abBad.length === 0 && nAb === KEYS.length, nAb + " parked; folded: " + (abBad.join(", ") || "none"));
  P.faction = fac0; P.era = "e20";

  /* ---- 6. the fog: an enemy carrier's machines seen folded on her deck,
     then lost to sight, leave ghosts folded as they were seen (notePoses);
     her box of sea is lit and darkened by hand, as ghost3d_check.js does ---- */
  var EN = Game.players[1], efac = EN.faction, eera = EN.era, s6 = seaSpot(12, 3), MW = Game.map.W;
  EN.faction = "nato"; EN.era = "e60";
  var ec = s6 && Game.spawnUnitAt(EN, "nato_e60_carrier", s6.x * TT, s6.y * TT);
  if (ec) {
    ec.moving = false; ec.ang = 0.7;
    Game.embarkComplement(ec); ec.wing().forEach(function (u) { u.stance = "hold"; });
    Game.fogEnabled = false; frames(3, true);
    Game.fogEnabled = true;
    Render3D.setCam(ec.x, ec.y);
    var box6 = function (v) {
      for (var yy = ec.ty - 6; yy <= ec.ty + 6; yy++) for (var xx = ec.tx - 6; xx <= ec.tx + 6; xx++)
        if (xx >= 0 && yy >= 0 && xx < MW && yy < Game.map.H) Game.fog[yy * MW + xx] = v;
    };
    box6(2); Game.trackGhosts(); frames(3);
    var seen6 = ec.wing().filter(function (u) { var r = recOf(u); return u.parked && r && r.folds && r.folds.length && foldMin(r) > 0.999; });
    box6(1); Game.trackGhosts(); frames(1);
    var ghosts6 = Render3D.three.scene.children.filter(function (o) { return o.userData && o.userData.ghost !== undefined; });
    var nG = 0, nF = 0;
    seen6.forEach(function (u) {
      var gq = ghosts6.filter(function (o) { return o.userData.ghost === u.id; })[0];
      if (!gq) return;
      nG++;
      var parts = foldsOf(gq), m = parts.length ? 1 : 0;
      parts.forEach(function (p) { m = Math.min(m, amount(p)); });
      if (parts.length === 2 && m > 0.999) nF++;
    });
    chk("6. the ghost of an enemy machine last seen folded on her deck is folded as it was seen",
        seen6.length > 0 && nG === seen6.length && nF === nG,
        nF + " of " + nG + " ghosts folded, of " + seen6.length + " folded machines seen on her deck");
    Game.fogEnabled = false; Game.ghosts = [];
    drop(ec.wing().concat([ec]));
    frames(2);
  } else chk("6. an enemy carrier for the fog case", false, "none spawned");
  EN.faction = efac; EN.era = eera;
}
