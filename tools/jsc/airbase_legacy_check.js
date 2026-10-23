/* tools/jsc/airbase_legacy_check.js - the airbase of a game saved before the
   runway is the 3 x 3 field it was saved as.

     python3 tools/jsc/run.py index.html --test tools/jsc/airbase_legacy_check.js

   The airbase grows a runway (_keep/airbase_study/PLAN.md, owner 2026-10-23:
   "the airport model should be re-design and we should see the aircraft
   taking off and landing"), so its footprint changes. A game saved before
   that has its 3 x 3 revetment field where the new one will not fit, and
   the owner keeps old saves working. rules.js BUILDING_LEGACY airbase3 is
   that field: the airbase's def with the old shape over it, its id still
   "airbase", filed under a key of its own (bldLegacyKey). Held here:
     [1] the def: id airbase, 3 x 3, four pads, its own key, not buildable;
     [2] placed, it is an airbase to every rule that asks for one, and it
         holds exactly its 3 x 3;
     [3] an aircraft is delivered to it, comes home to it and stands on it;
     [4] a save writes every structure's footprint, and this one's key
         (`lg`), and loads it back as itself; an airbase of today's shape
         loads as today's;
     [5] save.js shapeKey: a record from before records carried a footprint
         is the 3 x 3; once today's airbase is another shape, a record of the
         3 x 3 loads as airbase3; a shape this build has no def for is left
         out rather than laid over its neighbours;
     [6] the period and the army it is re-dated with on load do not change
         its shape;
     [7] a minute of play with it standing, and the commander's own. */
var TT = 32, DT = 1 / 30, PASS = 0, FAIL = 0, P = null, E = null;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "fulda"); set("opt-era", "e20"); set("opt-aera", "e20"); set("opt-fac", "nato");
  set("opt-cash", "200000"); set("opt-seed", "ablegacy"); set("opt-fog", "1"); set("opt-3d", "0");
  set("opt-weather", "clear");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

/* a clear patch of open ground w x h near a player's home (aaside_check.js) */
function site(p, r0, r1, w, h, avoid) {
  var M = Game.map, hx = (p.homeX / TT) | 0, hy = (p.homeY / TT) | 0;
  for (var r = r0; r < r1; r++) for (var a = 0; a < 64; a++) {
    var an = a / 64 * 6.283, x = (hx + Math.cos(an) * r) | 0, y = (hy + Math.sin(an) * r) | 0;
    if (x < 12 || y < 12 || x + w + 12 >= M.W || y + h + 12 >= M.H) continue;
    if (avoid && Math.hypot(x - avoid.homeX / TT, y - avoid.homeY / TT) < 40) continue;
    var ok = true;
    for (var j = -3; j < h + 3 && ok; j++) for (var i = -3; i < w + 3; i++) {
      var k = (y + j) * M.W + x + i;
      if (!GameMap.passable(M, x + i, y + j, "ground") || Game.occ[k]) { ok = false; break; }
    }
    if (ok) return { x: x, y: y };
  }
  return null;
}
function cells(b) { var n = 0; for (var i = 0; i < Game.occ.length; i++) if (Game.occ[i] === b.id) n++; return n; }
function at(p, s, legacy) {
  var hit = null;
  p.buildings.forEach(function (b) { if (!b.dead && b.def.id === "airbase" && b.tx === s.x && b.ty === s.y) hit = b; });
  return hit;
}
function ticks(n) { for (var i = 0; i < n; i++) Game.tick(DT); }

function run() {
  P = Game.human;
  E = Game.players.filter(function (p) { return p !== P && !Game.allied(P, p); })[0];
  AI.setPeace(E, true); Game.checkVictory = function () {};

  /* ---------------- 1. the def ---------------- */
  var L = bldDefOf("airbase3"), A0 = BUILDINGS.airbase;
  chk("[1] airbase3 is the airbase's def with the 3 x 3 shape: id airbase, four pads, its own key",
      !!L && L !== A0 && L.id === "airbase" && L.w === 3 && L.h === 3 && L.pads === 4 &&
      L.produces === "aircraft" && L.hp === A0.hp && bldLegacyKey(L) === "airbase3" && bldDefOf("airbase3") === L,
      L ? "id " + L.id + ", " + L.w + " x " + L.h + ", pads " + L.pads + ", key " + bldLegacyKey(L) : "no def");
  chk("[1] nobody can build one: it is not in BUILDINGS, and the airbase has no older-save key",
      !BUILDINGS.airbase3 && bldLegacyKey(A0) === null && bldIsDef(L) && L.of === undefined);

  /* ---------------- 2. placed ---------------- */
  var S = site(P, 8, 40, 3, 3, E);
  var a = S ? Game.placeBuilding(P, "airbase3", S.x, S.y, true) : null;
  chk("[2] placed, it is an airbase to every rule that asks (hasBuilding, countBuilding, nearestBuilding)",
      !!a && a.def === L && a.sideKey === "airbase3" && P.hasBuilding("airbase") && P.countBuilding("airbase") >= 1 &&
      Game.nearestBuilding(P, "airbase", a.x, a.y) === a,
      a ? "sideKey " + a.sideKey + ", count " + P.countBuilding("airbase") : "no site");
  chk("[2] it holds exactly its 3 x 3 and stands at its middle",
      !!a && cells(a) === 9 && a.x === (S.x + 1.5) * TT && a.y === (S.y + 1.5) * TT,
      a ? cells(a) + " cells" : "");

  /* ---------------- 3. an aircraft on it ---------------- */
  var fid = unitFor("nato", "fighter", "e20");
  var u = fid ? Game.spawnUnit(P, fid) : null;
  chk("[3] a fighter built is delivered to it", !!u && u.padOn === a, u ? fid + " on " + (u.padOn ? u.padOn.def.id : "nothing") : "no fighter");
  if (u) {
    u.x = a.x + 20 * TT; u.y = a.y; u.order = { type: "rtb" }; u.parked = false; u.moving = true;
    var t = 0;
    for (; t < 90 * 30 && !(u.order && u.order.type === "parked") && !u.dead; t++) Game.tick(DT);
    var pad = Game.findPad(u);
    chk("[3] sent home from 20 tiles it lands on it and stands there",
        !u.dead && u.parked && u.padOn === a && Math.abs(u.x - a.x) < 2 * TT && Math.abs(u.y - a.y) < 2 * TT,
        (t / 30).toFixed(1) + " s, " + (u.order ? u.order.type : "-") + ", " + Math.round(Math.hypot(u.x - a.x, u.y - a.y)) + " px from it");
  }

  /* ---------------- 4. save and load ---------------- */
  var S2 = site(P, 8, 60, 3, 3, E);
  var n = S2 ? Game.placeBuilding(P, "airbase", S2.x, S2.y, true) : null;
  var res = SaveGame.save(Game, "ironfront.ablegacy"), snap = null;
  try { snap = JSON.parse(localStorage.getItem("ironfront.ablegacy")); } catch (e) {}
  var rec = function (s) { return snap && s ? snap.buildings.filter(function (r) { return r.d === "airbase" && r.tx === s.x && r.ty === s.y; })[0] : null; };
  var ra = rec(S), rn = rec(S2);
  var shaped = snap ? snap.buildings.filter(function (r) { return r.w > 0 && r.h > 0 && BUILDINGS[r.d] && (r.lg || (r.w === BUILDINGS[r.d].w && r.h === BUILDINGS[r.d].h)); }).length : -1;
  chk("[4] the save writes every structure's footprint, the 3 x 3 with its key and today's airbase without one",
      res.ok && snap.v === 1 && shaped === snap.buildings.length && !!ra && ra.lg === "airbase3" && ra.w === 3 &&
      !!rn && rn.lg === undefined && rn.w === BUILDINGS.airbase.w,
      res.ok ? shaped + " of " + snap.buildings.length + " with their shape; " + (ra ? ra.lg : "missing") + " / " + (rn ? String(rn.lg) : "missing") : res.error);
  var ld = SaveGame.load("ironfront.ablegacy");
  var P2 = Game.human, la = S ? at(P2, S) : null, ln = S2 ? at(P2, S2) : null;
  chk("[4] loaded, the 3 x 3 is itself again and today's is today's",
      ld.ok && !!la && la.def === bldDefOf("airbase3") && cells(la) === 9 && !!ln && ln.def === BUILDINGS.airbase &&
      P2.hasBuilding("airbase") && P2.countBuilding("airbase") >= 2,
      ld.ok ? (la ? bldDefKey(la.def) : "missing") + " / " + (ln ? bldDefKey(ln.def) : "missing") : ld.error);

  /* ---------------- 5. save.js shapeKey ---------------- */
  if (snap) {
    var raw0 = JSON.stringify(snap);
    var reload = function (edit) {
      var s2 = JSON.parse(raw0); edit(s2);
      localStorage.setItem("ironfront.ablegacy", JSON.stringify(s2));
      return SaveGame.load("ironfront.ablegacy");
    };
    var kinds = function (p) { return [S, S2].map(function (s) { var b = s ? at(p, s) : null; return b ? (bldLegacyKey(b.def) || "airbase") + ":" + cells(b) : "missing"; }); };
    /* (a) records from before saves carried a footprint */
    var la5 = reload(function (s2) { s2.buildings.forEach(function (r) { delete r.lg; delete r.w; delete r.h; }); });
    var ka = kinds(Game.human), wantA = BUILDINGS.airbase.w === 3 && BUILDINGS.airbase.h === 3 ? "airbase:9" : "airbase3:9";
    chk("[5] a record from before saves carried a footprint is the 3 x 3 (today's airbase while that is 3 x 3, else airbase3)",
        la5.ok && ka[0] === wantA && ka[1] === wantA, la5.ok ? ka.join(", ") : la5.error);
    /* (b) today's airbase another shape: the 3 x 3 records find airbase3 */
    var A = BUILDINGS.airbase, w0 = A.w, h0 = A.h;
    A.w = 4; A.h = 12;
    var lb5;
    try { lb5 = reload(function (s2) { s2.buildings.forEach(function (r) { delete r.lg; }); }); } finally { A.w = w0; A.h = h0; }
    var kb = kinds(Game.human);
    chk("[5] once today's airbase is another shape, a record of the 3 x 3 loads as airbase3",
        lb5.ok && kb[0] === "airbase3:9" && kb[1] === "airbase3:9", lb5.ok ? kb.join(", ") : lb5.error);
    /* (c) a shape this build has no def for */
    var lc5 = reload(function (s2) { var r = s2.buildings.filter(function (r) { return r.d === "airbase" && r.tx === S2.x && r.ty === S2.y; })[0]; if (r) { r.w = 5; r.h = 5; } });
    var kc = kinds(Game.human), b1 = S ? at(Game.human, S) : null, b2 = S2 ? at(Game.human, S2) : null;
    chk("[5] a shape this build cannot lay is left out, and the rest load",
        lc5.ok && kc[1] === "missing" && kc[0] === "airbase3:9", lc5.ok ? kc.join(", ") : lc5.error);
    b2 = b1;

    /* ---------------- 6. re-dated ---------------- */
    if (b1) b1.setOrigin("pact", "e60");
    chk("[6] re-dated to another army and period, it keeps its shape and key",
        !!b1 && bldLegacyKey(b1.def) === "airbase3" && b1.def.w === 3 && b1.builtBy === "pact" && b1.era === "e60" &&
        b1.sideKey === "airbase3");

    /* ---------------- 7. play on ---------------- */
    var hp0 = b2 ? b2.hp : 0, crash = null;
    try { ticks(60 * 30); } catch (e) { crash = e; }
    chk("[7] a minute of play with them standing", !crash && !!b2 && !b2.dead,
        crash ? String(crash) : "airbase hp " + Math.round(hp0) + " -> " + Math.round(b2 ? b2.hp : 0));
  }
  localStorage.removeItem("ironfront.ablegacy");
}
