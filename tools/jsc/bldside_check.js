/* tools/jsc/bldside_check.js - an emplacement is drawn as the army and the
   period that dug it, checked on the REAL renderer under JavaScriptCore.

     python3 tools/jsc/scene3d.py tools/jsc/bldside_check.js

   render3d.js bldKeyFor draws a defence from BLD_MODELS[id + "_" + army + "_" +
   period] ("sam_pact_e60") when there is one, and from BLD_MODELS[id] when
   there is not. Throwaway models are registered here - none exist yet - and
   a SAM site is placed for each army and period under test: a Pact e60 one
   draws its own; a NATO e60 one, a Pact e80 one and one in a palette from
   nowhere draw the shared "sam". The build-menu thumbnail follows the same
   key. A model that says userData.whole keeps its own paint and gets no
   period kit; one that does not is tinted for its period as ever. */
var TT = 32, PASS = 0, FAIL = 0, DT = 1 / 30, H = null;
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
function frames(n) { for (var i = 0; i < n; i++) { Game.tick(DT); Render.draw(DT, UI.input); } }
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
/* a throwaway emplacement: one grey box, named for the key it stands for */
function fake(key, whole) {
  return { build: function (THREE, M, C) {
    var g = new THREE.Group(), m = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 2), new THREE.MeshStandardMaterial({ color: 0x707868 }));
    m.name = "MARK_" + key; m.position.z = 1; g.add(m);
    if (whole) g.userData.whole = true;
    return g;
  } };
}
/* the placed site's drawn model: the mark it carries, its box's colour, and its mesh count */
function drawn(P, fac, era, main) {
  var c = CFG.FACTION_COLORS[fac] || CFG.FACTION_COLORS.nato;
  P.color = { main: main || c.main, dark: c.dark, light: c.light, fac: main ? undefined : fac }; P.faction = fac; P.era = era;
  var g = flatSpot(), b = Game.placeBuilding(P, "sam", g.x - 1, g.y - 1, true), r = null, out = { mark: null, color: null, meshes: 0 };
  if (!b) return null;
  b.buildProgress = 1;
  frames(2);
  r = H.recOf(b.id);
  if (r) r.grp.traverse(function (o) {
    if (!o.isMesh) return;
    out.meshes++;
    if (/^MARK_/.test(o.name)) { out.mark = o.name; out.color = o.material.color.getHex(); }
  });
  b.dead = true;
  var i = Game.entities.indexOf(b); if (i >= 0) Game.entities.splice(i, 1);
  i = P.buildings.indexOf(b); if (i >= 0) P.buildings.splice(i, 1);
  frames(1);
  return out;
}
function run() {
  var P = Game.human;
  AI.setPeace(Game.players[1], true); Game.checkVictory = function () {};
  chk("the 3D renderer is up, and its records are reachable", Render === Render3D && !!H && !!BLD_MODELS["sam"], "");
  if (!H) return;
  var col0 = P.color, fac0 = P.faction;
  Render3D.setCam(flatSpot().x * TT, flatSpot().y * TT);
  /* the armies' own SAM sites are set aside while the check stands its
     marked boxes in their places, and put back after: what it holds is the
     lookup, not which armies happen to have a site of which period today */
  var kept = {};
  Object.keys(BLD_MODELS).forEach(function (k) {
    if (/^sam_[a-z]+_e\d\d$/.test(k)) { kept[k] = BLD_MODELS[k]; delete BLD_MODELS[k]; }
  });
  BLD_MODELS["sam_pact_e60"] = fake("sam_pact_e60", true);
  BLD_MODELS["sam_pact_e50"] = fake("sam_pact_e50", false);
  BLD_MODELS["sam_pact_e20"] = fake("sam_pact_e20", false);
  var own = drawn(P, "pact", "e60"), nato = drawn(P, "nato", "e60"), late = drawn(P, "pact", "e80"), none = drawn(P, "pact", "e60", "#4b0042");
  chk("a Pact e60 SAM site draws sam_pact_e60", !!own && own.mark === "MARK_sam_pact_e60", own && String(own.mark));
  chk("a NATO e60 one, a Pact e80 one and one in a palette from nowhere draw the shared sam",
      !!nato && !!late && !!none && !nato.mark && !late.mark && !none.mark,
      [nato, late, none].map(function (r) { return r ? String(r.mark) : "not placed"; }).join(", "));
  chk("the key follows the army and the period, and a palette from nowhere has none",
      Render3D.bldKey("sam", CFG.FACTION_COLORS.pact, "e60") === "sam_pact_e60" && Render3D.bldKey("sam", CFG.FACTION_COLORS.nato, "e60") === "sam" &&
      Render3D.bldKey("sam", { main: "#4b0042" }, "e60") === "sam" && Render3D.bldKey("sam", CFG.FACTION_COLORS.pact, undefined) === "sam_pact_e20",
      "the thumbnail asks the same");
  /* the same box in three periods: untinted at e20, tinted at e50 unless it says whole, and no kit on a whole one */
  var ref = drawn(P, "pact", "e20"), tint = drawn(P, "pact", "e50");
  chk("a model that says userData.whole keeps its own paint and gets no period kit; one that does not is tinted",
      !!ref && !!tint && own.color === ref.color && tint.color !== ref.color && own.meshes === ref.meshes && tint.meshes >= ref.meshes,
      "paint " + (own ? own.color.toString(16) : "-") + " whole at e60, " + (ref ? ref.color.toString(16) : "-") + " untinted at e20, " +
      (tint ? tint.color.toString(16) : "-") + " at e50 without it; meshes " + (own ? own.meshes : "-") + "/" + (ref ? ref.meshes : "-") + "/" + (tint ? tint.meshes : "-"));
  P.color = col0; P.faction = fac0; P.era = "e20";
  delete BLD_MODELS["sam_pact_e60"]; delete BLD_MODELS["sam_pact_e50"]; delete BLD_MODELS["sam_pact_e20"];
  Object.keys(kept).forEach(function (k) { BLD_MODELS[k] = kept[k]; });
}
