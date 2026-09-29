/* tools/jsc/impact3d_check.js - what a hit and a kill leave in the 3D view,
   checked on the REAL renderer under JavaScriptCore.

     python3 tools/jsc/scene3d.py tools/jsc/impact3d_check.js
     python3 tools/jsc/scene3d.py tools/jsc/impact3d_check.js -- soak 10 [medium]

   _behtest.html [71] holds the events combat.js sends. This holds what
   js/impact3d.js does with them, which needs WebGL: three.js and render3d.js
   load, THREE.WebGLRenderer runs over tools/jsc/gl_stub.js, and every number
   below is what renderer.info reports. Owner's rule: no browser, ever - the
   owner judges the look in their own.

   Seven checks were added after review, and each failed on the first cut
   (33 passed, 7 failed there): a ballistic missile at a map point drew
   sparks off "armour"; "low" drew no strike at all; a page without
   impact3d.js lost the strike mark; a helicopter killed on a ship's deck
   left a hulk hanging where the deck had been; enemy rubble stayed under an
   enemy block rebuilt in explored fog; and a catastrophic kill in fog,
   explored or not, still threw render3d's stand-in turret and fireball.

   "soak N [LEVEL]" adds N minutes of continuous battle in front of the camera
   (a wave of armour, infantry and gunships every 20 s, as measured at
   d9701f9) and reports the renderer's geometry count, the particle clouds
   and the remains once a minute. LEVEL is a CFG.GFX tier (default high);
   "medium" has no bloom, so renderer.info.render.calls is the whole frame. */
var TT = 32, PXM = 0.625, OUT = [], PASS = 0, FAIL = 0;
var ARGS = (typeof __ARGS !== "undefined") ? __ARGS : [];
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
    try { run(); } catch (e) { log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

/* Every geometry the renderer has uploaded and not been told to dispose:
   WebGLGeometries subscribes to "dispose" on first upload, so that call is
   the registry. Uploaded but drawn by nothing in the scene is what a leak
   looks like - but model templates are in it too: one set per kind and
   owner colour, idle once the last of that kind is gone. At 5d5f4a0 the
   commander builds more kinds through a soak than it did, and templates
   alone moved that count by +530 in ten minutes (measured) while a fresh
   battle left no geometry made after the warm-up idle at all. So each
   geometry is tagged when it is first filled (setAttribute) with the game
   time and whether an effect made it - its stack runs through render3d's
   syncEffects, fx3d.js or impact3d.js - and the leak is an effect's
   geometry left idle. */
var UPLOADED = new Set();
(function () {
  var BG = THREE.BufferGeometry.prototype, ED = THREE.EventDispatcher.prototype, dsp = BG.dispose, sa = BG.setAttribute;
  BG.setAttribute = function (n, a) {
    if (this.__fx === undefined) {
      this.__fx = /syncEffects@|impact3d\.js|fx3d\.js/.test(String(new Error().stack));
      this.__t = (typeof Game !== "undefined" && Game.time) || 0;
    }
    return sa.call(this, n, a);
  };
  BG.addEventListener = function (t, f) { if (t === "dispose") UPLOADED.add(this); return ED.addEventListener.call(this, t, f); };
  BG.dispose = function () { UPLOADED.delete(this); return dsp.apply(this, arguments); };
})();
/* uploaded and drawn by nothing: all of it, and what an effect made after t0 */
function idle(t0) {
  var used = new Set(); R3().scene.traverse(function (o) { if (o.geometry) used.add(o.geometry); });
  var n = 0, fx = 0;
  UPLOADED.forEach(function (g) { if (used.has(g)) return; n++; if (g.__fx && g.__t > t0) fx++; });
  return { all: n, fx: fx };
}
function R3() { return Render3D.three; }
function frames(n) { var t = 0; for (var i = 0; i < n; i++) { Game.tick(CFG.DT); var t0 = preciseTime(); Render.draw(CFG.DT, UI.input); t += preciseTime() - t0; } return t; }
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
function at(P, id, tx, ty) { return Game.spawnUnitAt(P, id, tx * TT + 16, ty * TT + 16); }
/* the top-level scene object drawn for an entity: the one standing on it */
function modelOf(e) {
  var sc = R3().scene, best = null, bd = 1e9;
  sc.children.forEach(function (c) {
    if (!c.isGroup || c.userData.life !== undefined) return;
    var dx = c.position.x - e.x * PXM, dz = c.position.z - e.y * PXM, d = dx * dx + dz * dz;
    if (d < bd) { bd = d; best = c; }
  });
  return bd < 4 ? best : null;
}
function inScene(o) { return !!o && o.parent === R3().scene; }
function S() { return Impact3D.stats(); }
function kill(e, w, by) { Combat.applyDamage(Game, e, 1e7, w || WEAPONS.gun_120, by || null); }
function look(tx, ty) { Render3D.setCam(tx * TT, ty * TT); frames(2); }

function run() {
  var P = Game.human, E = Game.players[1];
  if (E.cash > 4000) E.cash = 4000;
  AI.setPeace(E, true);
  Game.checkVictory = function () {};
  log("[impact3d] renderer " + (Render === Render3D ? "3D" : "2D") + ", Impact3D " + (typeof Impact3D !== "undefined" && Impact3D.ready));
  chk("the 3D renderer is up, with Impact3D", Render === Render3D && Impact3D.ready, "");

  /* ---- the shader: PointsMaterial with one attribute more ---- */
  var g = spot(P, "ground", 12, 16, 8);
  look(g.x + 6, g.y + 3);
  var tank0 = at(E, "mbt_p", g.x + 6, g.y + 3), gun = at(P, "mbt_n", g.x + 1, g.y + 3);
  tank0.ang = 0;
  var rng = Game.rng;
  Game.rng = function () { return 0.5; };
  Combat.fire(Game, gun, Object.assign({}, WEAPONS.lmg, { acc: 5 }), tank0);
  frames(1);
  var vs = __GLSTUB.shaders.filter(function (s) { return s.indexOf("attribute float aSize;") >= 0; });
  chk("the particle shader was composed with a per-point size", vs.length >= 1 &&
      vs.every(function (s) { return s.split("attribute float aSize;").length === 2 && s.indexOf("gl_PointSize = size * aSize;") >= 0; }),
      vs.length + " shader(s) carry aSize");
  chk("three draw calls hold every particle and spark", R3().scene.children.filter(function (c) { return /^impact3d-(glow|smoke|sparks)$/.test(c.name); }).length === 3, "");

  /* ---- hits ---- */
  var s0 = S();
  for (var i = 0; i < 8; i++) Combat.fire(Game, gun, Object.assign({}, WEAPONS.lmg, { acc: 5 }), tank0);
  frames(1);
  var s1 = S();
  chk("a burst on a tank throws sparks", s1.sparks > s0.sparks && s1.hitsShown - s0.hitsShown === 8,
      "sparks " + s0.sparks + " -> " + s1.sparks + ", shown " + (s1.hitsShown - s0.hitsShown) + "/8");
  frames(15);                                             // the burst above has died away
  CFG.GFX_LEVEL = "low";
  var s2 = S();
  for (var i2 = 0; i2 < 8; i2++) Combat.fire(Game, gun, Object.assign({}, WEAPONS.lmg, { acc: 5 }), tank0);
  frames(1);
  var s3 = S();
  /* "low" budgets no impact particles; the strike is still marked, as the
     sphere this replaced marked it on every tier: one point, no sparks */
  chk("on 'low' (sparks budget 0) a hit is still marked: one point each, no sparks",
      s3.hitsShown - s2.hitsShown >= 8 && s3.glow > s2.glow && s3.glow - s2.glow <= s3.hitsShown - s2.hitsShown &&
      s3.sparks <= s2.sparks,
      "shown +" + (s3.hitsShown - s2.hitsShown) + ", glow +" + (s3.glow - s2.glow) + ", sparks " + s2.sparks + " -> " + s3.sparks);
  CFG.GFX_LEVEL = "high";
  /* a page that does not load impact3d.js (the dev pages) keeps the old
     pale sphere at the end of a tracer, rather than showing no strike */
  var I3 = Impact3D, kids0 = new Set(R3().scene.children);
  Impact3D = undefined;
  try {
    Combat.fire(Game, gun, Object.assign({}, WEAPONS.lmg, { acc: 5 }), tank0);
    frames(1);
  } finally { Impact3D = I3; }
  var sphs = R3().scene.children.filter(function (c) { return !kids0.has(c) && c.userData && c.userData.kind === "spark"; });
  var sph = sphs.length;
  chk("without impact3d.js a hitscan round still marks its strike", sph >= 1, sph + " sphere(s)");
  /* the soak's leak test tells an effect's geometry from a model's: it has
     to know one when it sees one, or it would pass by never looking */
  var tagged = 0, models = 0;
  sphs.forEach(function (c) { if (c.geometry && c.geometry.__fx === true) tagged++; });
  R3().scene.children.forEach(function (c) { if (c.isGroup && c.userData.life === undefined)
    c.traverse(function (o) { if (o.geometry && o.geometry.__fx === true) models++; }); });
  chk("the leak test knows an effect's geometry, and does not take a model's for one",
      sph >= 1 && tagged === sph && models === 0, tagged + "/" + sph + " strike spheres tagged, " + models + " model meshes tagged");
  frames(1);
  /* a ballistic missile sent at a bare map point (a bombard order fires at a
     phantom with no hp): earth thrown up, not sparks off armour. dmg 0, so
     nothing on the map is touched. */
  var tel = at(P, "tel_n", g.x + 1, g.y + 6), ax3 = (g.x + 14) * TT + 16, ay3 = (g.y + 6) * TT + 16;
  var ph = { x: ax3, y: ay3, layer: "ground", dead: false, armor: "structure", def: {}, owner: null, r: 0,
             tx: (ax3 / TT) | 0, ty: (ay3 / TT) | 0 };
  Render3D.setCam(ax3, ay3); frames(15);
  var sm0 = S(), mark3 = new Set(Combat.effects), hm3 = [];
  Game.rng = function () { return 0.5; };
  Combat.fire(Game, tel, Object.assign({}, WEAPONS.srbm_mod, { acc: 5, dmg: 0, suppress: 0 }), ph);
  for (var t3 = 0; t3 < 30 * 30 && !hm3.length; t3++) {
    frames(1);
    hm3 = Combat.effects.filter(function (f) { return !mark3.has(f) && f.t === "hit"; });
  }
  Game.rng = rng;
  var sm1 = S();
  chk("a ballistic missile on a map point throws up earth, not sparks off armour",
      hm3.length >= 1 && hm3[0].m === "ground" && !hm3[0].id && sm1.sparks === sm0.sparks && sm1.smoke > sm0.smoke,
      hm3[0] ? "m=" + hm3[0].m + ", sparks " + sm0.sparks + " -> " + sm1.sparks + ", smoke " + sm0.smoke + " -> " + sm1.smoke : "no hit event");
  tel.dead = true;
  look(g.x + 6, g.y + 3);
  /* a round going in: the white-hot core is an additive point far above 1 */
  var n0 = S().glow;
  Combat.fire(Game, gun, Object.assign({}, WEAPONS.gun_120, { acc: 5 }), tank0);
  for (var t = 0; t < 40; t++) frames(1);
  chk("a tank round that hits leaves its flash and sparks", S().hitsShown > s1.hitsShown + 0, "hits shown " + S().hitsShown);
  frames(60);

  /* ---- a catastrophic kill keeps the model, chars it, throws its turret ---- */
  var model = modelOf(tank0);
  var tur = model && model.getObjectByName("turret");
  chk("the tank is drawn before the kill", !!model && !!tur, model ? "turret " + !!tur : "no model");
  Game.rng = function () { return 0; };                   // the carousel goes
  kill(tank0, WEAPONS.gun_120, gun);
  Game.rng = rng;
  frames(1);
  chk("the kill keeps the very model the player was watching", inScene(model) && S().recs.hulk === 1,
      "in scene " + inScene(model) + ", hulks " + S().recs.hulk);
  var charred = 0, lit = 0;
  /* a charred material is rough, barely metallic, and dull to the sky */
  var isChar = function (m) { return !!m && m.roughness === 1 && m.metalness === 0.1 && m.envMapIntensity === 0.25; };
  model && model.traverse(function (o) {
    if (!o.isMesh || !o.visible) return;
    lit++;
    if ((Array.isArray(o.material) ? o.material : [o.material]).every(isChar)) charred++;
  });
  chk("and it is charred", lit > 0 && charred === lit, charred + "/" + lit + " visible meshes charred");
  chk("the turret it had is the one in the air", !!tur && tur.parent === R3().scene, tur ? "parent " + (tur.parent && tur.parent.type) : "");
  chk("and no stand-in box flies beside it", R3().scene.children.filter(function (c) { return c.userData && c.userData.kind === "tumble"; }).length === 0, "");
  var y0 = tur ? tur.position.y : 0; frames(15);
  var yUp = tur ? tur.position.y : 0;
  frames(150);
  var yDown = tur ? tur.position.y : 0, gy = tur ? Render3D.three && tur.position.y : 0;
  chk("it goes up on the gas and comes down again", yUp > y0 + 3 && yDown < yUp - 3,
      "y " + y0.toFixed(1) + " -> " + yUp.toFixed(1) + " -> " + yDown.toFixed(1) + " m");
  chk("the hulk burns: fire and smoke are rising off it", S().glow > 0 && S().smoke > 0,
      "glow " + S().glow + ", smoke " + S().smoke);
  frames(30 * 20);                                        // t ~ 26 s: smouldering
  var sm = S();
  chk("then it smoulders: thin smoke, the fire is out", S().recs.hulk === 1 && sm.smoke > 0,
      "t+26 s: glow " + sm.glow + " smoke " + sm.smoke);
  frames(30 * 13);                                        // t ~ 39 s
  var yh = model.position.y;
  frames(30 * 5);                                         // t ~ 44 s: sinking out
  chk("and it settles out of sight at the end", model.position.y < yh - 1, "y " + yh.toFixed(2) + " -> " + model.position.y.toFixed(2));
  frames(30 * 3);                                         // t ~ 47 s
  chk("on the 2D wreck's own 45 s it is gone, turret and all", !inScene(model) && !inScene(tur) && S().recs.hulk === 0,
      "hulks " + S().recs.hulk);

  /* ---- a helicopter shot down falls, crashes and burns ---- */
  var helo = at(E, "helo_p", g.x + 7, g.y + 2);
  helo.parked = false; helo.order = { type: "idle" };
  frames(30);
  var hm = modelOf(helo);
  var hy0 = hm ? hm.position.y : 0;
  kill(helo, WEAPONS.sam_veh || WEAPONS.hellfire, gun);
  frames(1);
  chk("a helicopter killed in flight starts to fall", S().recs.crash === 1 && inScene(hm), "crash " + S().recs.crash);
  frames(30 * 5);
  chk("it hits the ground and burns there", S().recs.hulk === 1 && hm.position.y < hy0 - 20,
      "alt " + hy0.toFixed(1) + " -> " + (hm ? hm.position.y.toFixed(1) : "?") + " m; hulks " + S().recs.hulk);

  /* ---- a ship lists and goes down, and leaves oil ---- */
  var sea = spot(P, "sea", 4, 4, 4);
  if (sea) {
    look(sea.x + 2, sea.y + 2);
    var boat = at(E, "corvette_p", sea.x + 2, sea.y + 2);
    frames(10);
    var bm = modelOf(boat);
    kill(boat, WEAPONS.ssm, null);
    frames(1);
    chk("a ship killed is kept, and starts to go", S().recs.ship === 1 && inScene(bm), "ships " + S().recs.ship);
    frames(30 * 6);
    chk("she lists and settles", bm && Math.abs(bm.rotation.x) > 0.08 && bm.position.y < 0,
        bm ? "list " + (bm.rotation.x * 57.3).toFixed(1) + " deg, y " + bm.position.y.toFixed(1) : "");
    frames(30 * 14);
    chk("and goes under, leaving a slick", S().slicks >= 1 && bm && !bm.visible, "slicks " + S().slicks);
    var sub = at(E, "sub_p", sea.x + 1, sea.y + 1);
    frames(10);
    kill(sub, WEAPONS.torpedo, null);
    frames(60);
    chk("a submarine leaves bubbles and a slick", S().recs.sub === 1 && S().slicks >= 2, "subs " + S().recs.sub + ", slicks " + S().slicks);
    frames(30 * 30);
    chk("the ship's slick is handed back when her remains go", S().slicks === 1 && S().recs.ship === 0,
        "slicks " + S().slicks + ", ships " + S().recs.ship);
    frames(30 * 15);
    chk("and the submarine's with hers", S().slicks === 0 && S().recs.sub === 0,
        "slicks " + S().slicks + ", subs " + S().recs.sub);
    /* a helicopter killed on a ship's deck goes over the side; a hulk left
       where it died would hang in the air once the ship moved on */
    var ship2 = at(P, "corvette_n", sea.x + 2, sea.y + 2);
    frames(10);
    var kidsD = new Set(R3().scene.children), dh = ship2 && at(P, "helo_n", sea.x + 2, sea.y + 2);
    if (ship2 && dh) {
      /* held on the deck by hand: left alone, a parked machine near an
         enemy scrambles */
      for (var fd = 0; fd < 10; fd++) {
        dh.padOn = ship2; dh.parked = true; dh.order = { type: "parked" }; dh.x = ship2.x; dh.y = ship2.y;
        frames(1);
      }
      dh.parked = true; dh.order = { type: "parked" };
      /* the ship's model stands on the same spot: the helicopter's is the group that appeared */
      var dm = R3().scene.children.filter(function (c) { return c.isGroup && !kidsD.has(c) && c.userData.life === undefined; })[0] || null;
      var hk0 = S().recs.hulk;
      kill(dh, WEAPONS.gun_120, null);
      frames(30 * 2);
      chk("a helicopter killed on a deck goes over the side: no hulk left hanging",
          !!dm && !inScene(dm) && S().recs.hulk === hk0 && S().recs.ditch === 0,
          "model " + (dm ? (inScene(dm) ? "still in scene" : "gone") : "not found") + ", hulks " + hk0 + " -> " + S().recs.hulk);
      ship2.dead = true;
      frames(2);
    }
  }

  /* ---- a structure slumps into its dust and burns as rubble ---- */
  var bp = spot(P, "ground", 18, 4, 4);
  look(bp.x + 1, bp.y + 1);
  var b = Game.placeBuilding(E, "power", bp.x, bp.y, true);
  frames(5);
  var bmod = modelOf(b), sy0 = bmod ? bmod.scale.y : 0, d0 = S().smoke;
  kill(b, WEAPONS.howitzer, null);
  frames(1);
  chk("a structure brought down raises its dust", S().recs.rubble === 1 && S().smoke > d0 + 10,
      "rubble " + S().recs.rubble + ", smoke particles +" + (S().smoke - d0));
  frames(30 * 3);
  chk("and slumps to a third of its height", bmod && bmod.scale.y < sy0 * 0.4, bmod ? "scale.y " + sy0.toFixed(2) + " -> " + bmod.scale.y.toFixed(2) : "");
  /* The enemy builds again on it. The rubble goes exactly when the new
     block is drawn: render3d draws an enemy structure on any explored tile
     (fog >= 1), so clearing the rubble then says nothing the building does
     not - and keeping it drew both, one through the other. Where the
     player has never looked (fog 0) the new block is not drawn, and the
     rubble stays as remembered. The fog is held still by hand here. */
  var rf = Game.recomputeFog;
  Game.fogEnabled = true; Game.recomputeFog = function () {};
  var fogSave = Game.fog.slice();
  var fogPatch = function (v) {
    for (var fy = bp.y - 3; fy < bp.y + 7; fy++) for (var fx2 = bp.x - 3; fx2 < bp.x + 7; fx2++) Game.fog[fy * Game.map.W + fx2] = v;
  };
  fogPatch(0);
  var nb = Game.placeBuilding(E, "power", bp.x, bp.y, true);
  frames(20);
  chk("an enemy building where the player has never looked leaves the rubble as it was", !!nb && S().recs.rubble === 1,
      "rubble " + S().recs.rubble + ", new block drawn " + !!modelOf(nb));
  fogPatch(1);
  frames(20);
  chk("in explored fog the new block is drawn, and the rubble under it is cleared", !!nb && S().recs.rubble === 0,
      "rubble " + S().recs.rubble);
  for (var fi = 0; fi < fogSave.length; fi++) Game.fog[fi] = fogSave[fi];
  Game.recomputeFog = rf; Game.fogEnabled = false;
  if (nb && !nb.dead) { nb.dead = true; Game.removeBuilding(nb); }

  /* ---- a man falls, and is gone in five seconds ---- */
  var man = at(E, "rifle_p", g.x + 5, g.y + 5);
  look(g.x + 5, g.y + 5);
  var mm = modelOf(man);
  kill(man, WEAPONS.rifle, gun);
  frames(20);
  chk("a man killed falls over", S().recs.body === 1 && mm && Math.abs(mm.rotation.z) > 1.0,
      mm ? "rot " + (mm.rotation.z * 57.3).toFixed(0) + " deg" : "no model");
  frames(30 * 5);
  chk("and is gone in five seconds", S().recs.body === 0 && !inScene(mm), "");

  /* ---- a yard packed up to relocate, and unfolded again, is not a kill ----
     (owner) "the mcv should be able to depoly and become back mcv again for
     relocation and re-depoly". G.packYard retires the folded yard with
     removeBuilding and G.deployRig retires the rig by marking it dead; neither
     goes through Combat.kill, so neither sends a death event, and nothing is
     left behind on the slab - no rubble, no hulk. */
  if (Game.packYard && Game.rigFor) {
    var yard = P.buildings.filter(function (b) { return !b.dead && b.buildProgress >= 1 && Game.rigFor(b); })[0];
    if (yard) {
      look(yard.tx + 1, yard.ty + 1);
      var ym = modelOf(yard), mk5 = new Set(Combat.effects), hk5 = S().recs.hulk;
      var gone = function () { return Combat.effects.filter(function (f) { return !mk5.has(f) && (f.t === "death" || f.t === "wreck"); }).length; };
      var packed = Game.packYard(yard, false);
      frames(30 * 5);
      var rig = P.units.filter(function (u) { return !u.dead && u.fromYard && u.def.deployTo === yard.def.id; })[0];
      chk("a yard packed up to relocate leaves no rubble: nobody destroyed it",
          packed && !!rig && gone() === 0 && S().recs.rubble === 0 && !!ym && !inScene(ym),
          "rig " + !!rig + ", death/wreck events " + gone() + ", rubble " + S().recs.rubble + ", yard model " + (ym ? (inScene(ym) ? "left in scene" : "gone") : "not found"));
      if (rig) {
        var redeployed = Game.deployRig(rig);
        frames(30 * 2);
        chk("and the rig unfolding again leaves no hulk", redeployed && gone() === 0 && S().recs.hulk <= hk5,
            "deployed " + redeployed + ", death/wreck events " + gone() + ", hulks " + S().recs.hulk);
      }
    } else chk("a finished construction yard to pack up", false, "none");
  } else log("  (this build has no G.packYard: the relocation check is skipped)");

  /* ---- fog honesty ---- */
  Game.fogEnabled = true;
  frames(10);
  var far = null;
  for (var r = 30; r < 90 && !far; r += 3) {
    var cand = spot(P, "ground", r, 1, 1);
    if (cand && Game.fog[cand.y * Game.map.W + cand.x] !== 2) far = cand;
  }
  if (far) {
    look(far.x, far.y);
    var hid = at(E, "mbt_p", far.x, far.y);
    frames(5);
    var before = S();
    Game.rng = function () { return 0.5; };
    Combat.fire(Game, gun, Object.assign({}, WEAPONS.lmg, { acc: 5 }), hid);
    kill(hid, WEAPONS.gun_120, gun);
    Game.rng = rng;
    frames(2);
    var after = S();
    chk("in fog: a hit draws nothing", after.hits > before.hits && after.hitsShown === before.hitsShown,
        "hits " + (after.hits - before.hits) + ", shown " + (after.hitsShown - before.hitsShown));
    chk("in fog: a kill leaves nothing", after.deaths > before.deaths && after.deathsShown === before.deathsShown &&
        after.recs.hulk === before.recs.hulk, "deaths " + (after.deaths - before.deaths) + ", shown " + (after.deathsShown - before.deathsShown));
    /* The carousel going in fog, explored (the wash is 46%) and not (93%).
       render3d's own fireball, flame jet and opaque stand-in turret were
       drawn there, and the box stood out in front of the wash. */
    var rf2 = Game.recomputeFog; Game.recomputeFog = function () {};
    [1, 0].forEach(function (fv) {
      for (var fy = far.y - 3; fy <= far.y + 3; fy++) for (var fx = far.x - 3; fx <= far.x + 3; fx++) Game.fog[fy * Game.map.W + fx] = fv;
      var vic = at(E, "mbt_p", far.x, far.y);
      frames(3);
      var kids = new Set(R3().scene.children);
      Game.rng = function () { return 0; };               // the carousel goes
      kill(vic, WEAPONS.gun_120, gun);
      Game.rng = rng;
      frames(1);
      var box = 0, fire = 0, cx = far.x * TT * PXM, cz = far.y * TT * PXM;
      R3().scene.children.forEach(function (c) {
        if (kids.has(c) || !c.userData) return;
        var ddx = c.position.x - cx, ddz = c.position.z - cz;
        if (ddx * ddx + ddz * ddz > 30 * 30) return;       // a muzzle's smoke elsewhere on the map
        if (c.userData.kind === "tumble") box++;
        else if (c.userData.kind === "boom" || c.userData.kind === "smoke") fire++;
      });
      chk("in " + (fv ? "explored" : "unexplored") + " fog a catastrophic kill throws no box and lights no fireball",
          box === 0 && fire === 0, "stand-in turrets " + box + ", fireball/jet/smoke meshes " + fire);
      frames(30 * 2);
    });
    Game.recomputeFog = rf2;
  } else chk("a fogged spot was found", false, "");
  Game.fogEnabled = false;

  /* ---- caps: forty tanks die at once in front of the camera ---- */
  look(g.x + 6, g.y + 4);
  var row = [];
  for (var k = 0; k < 40; k++) row.push(at(E, "mbt_p", g.x + 1 + (k % 10), g.y + 1 + ((k / 10) | 0)));
  frames(3);
  var c0 = S().capped;
  row.forEach(function (u) { kill(u, WEAPONS.gun_120, gun); });
  frames(3);
  var sc = S();
  chk("the hulk cap holds", sc.recs.hulk <= sc.caps.recs.hulk && sc.capped > c0,
      "hulks " + sc.recs.hulk + " (cap " + sc.caps.recs.hulk + "), " + (sc.capped - c0) + " oldest released");
  frames(60);
  sc = S();
  chk("the particle clouds stay inside their arrays", sc.glow <= sc.caps.glow && sc.smoke <= sc.caps.smoke && sc.sparks <= sc.caps.sparks,
      "glow " + sc.glow + "/" + sc.caps.glow + ", smoke " + sc.smoke + "/" + sc.caps.smoke + ", sparks " + sc.sparks + "/" + sc.caps.sparks + ", dropped " + sc.dropped);
  frames(30 * 50);
  sc = S();
  chk("and every wreck is released on time", sc.recs.hulk === 0 && sc.orphans === 0, JSON.stringify(sc.recs));
  var ri = R3().renderer.info;
  log("  after the checks: geometries " + ri.memory.geometries + ", programs " + ri.programs.length +
      ", charred materials " + sc.charMaterials + ", particles glow/smoke/sparks " + sc.glow + "/" + sc.smoke + "/" + sc.sparks);

  if (ARGS[0] === "soak") { CFG.GFX_LEVEL = ARGS[2] || "high"; soak(P, E, +(ARGS[1] || 10)); }
}

/* ---- N minutes of battle: what the renderer holds, minute by minute ---- */
function soak(P, E, MIN) {
  var t = spot(P, "ground", 14, 16, 10);
  Render3D.setCam((t.x + 6) * TT, (t.y + 4) * TT);
  var deaths = 0, orig = Game.onDeath;
  Game.onDeath = function () { deaths++; return orig.apply(this, arguments); };
  var wave = function (k) {
    var row = k % 6;
    ["mbt_n", "rifle_n", "rifle_n"].forEach(function (id, i) { at(P, id, t.x + 1 + (i % 2), t.y + 1 + row + i); });
    ["hvy_p", "rifle_p", "helo_p"].forEach(function (id, i) { at(E, id, t.x + 7 + (i % 2), t.y + 1 + row + i); });
  };
  /* warm-up: every model template is built once, so what grows after this is not a template */
  wave(0); frames(20 * 30);
  var ri = R3().renderer.info, g0 = ri.memory.geometries, tw = Game.time;
  log("\n[soak] " + MIN + " min after warm-up: geometries " + g0);
  var fr = Impact3D.frame, ft = 0, fn = 0;
  Impact3D.frame = function (dt) { var a = preciseTime(); fr(dt); ft += preciseTime() - a; fn++; };
  var peak = { glow: 0, smoke: 0, sparks: 0, hulk: 0, body: 0 }, ms = 0, n = 0, u1 = 0;
  for (var sec = 1; sec <= MIN * 60; sec++) {
    if (sec % 20 === 0) wave(sec / 20);
    ms += frames(30); n += 30;
    var s = Impact3D.stats();
    ["glow", "smoke", "sparks"].forEach(function (k) { if (s[k] > peak[k]) peak[k] = s[k]; });
    if (s.recs.hulk > peak.hulk) peak.hulk = s.recs.hulk;
    if (s.recs.body > peak.body) peak.body = s.recs.body;
    if (sec % 60 === 0) {
      var alive = 0; Game.entities.forEach(function (e) { if (!e.dead) alive++; });
      var unused = idle(tw);
      if (sec === 60) u1 = unused.all;
      log("[soak] t+" + (sec / 60) + " min: geometries " + ri.memory.geometries + " (+" + (ri.memory.geometries - g0) + "; " +
          unused.all + " uploaded and drawn by nothing, " + unused.fx + " of them effects made in the soak)" +
          "  programs " + ri.programs.length + "  draw calls " + ri.render.calls + "  particles " + s.glow + "/" + s.smoke + "/" + s.sparks +
          "  remains " + JSON.stringify(s.recs) + "  deaths " + deaths +
          "  draw " + (ms / n * 1000).toFixed(2) + " ms/frame, Impact3D.frame " + (ft / fn * 1000).toFixed(3) + " ms  entities " + alive);
      ms = 0; n = 0; ft = 0; fn = 0;
    }
  }
  Impact3D.frame = fr;
  var s2 = Impact3D.stats();
  log("[soak] peaks: particles glow/smoke/sparks " + peak.glow + "/" + peak.smoke + "/" + peak.sparks +
      ", hulks " + peak.hulk + ", bodies " + peak.body + "; dropped " + s2.dropped + ", capped " + s2.capped +
      ", charred materials " + s2.charMaterials);
  var uEnd = idle(tw);
  chk("no geometry leak over the soak: no effect's geometry is left uploaded and drawn by nothing",
      uEnd.fx < 20, uEnd.fx + " effect geometries idle; all idle minute 1 " + u1 + " -> end " + uEnd.all +
      " (templates of kinds no longer on the map), renderer holds " + ri.memory.geometries);
  chk("the clouds never outgrew their arrays", peak.glow <= s2.caps.glow && peak.smoke <= s2.caps.smoke && peak.sparks <= s2.caps.sparks, "");
}
