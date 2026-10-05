/* tools/jsc/scorecard.js - ONE computer-vs-computer match, measured.

   Not run by hand: tools/jsc/scorecard.py starts it through run.py --test.
   By hand (3D off, 3D scripts skipped):

     python3 tools/jsc/run.py index.html --limit 3000 --test tools/jsc/scorecard.js -- \
         map=fulda era=e80 seed=s1 fac0=nato fac1=pact b=1 off=name1,name2

   Keys (all optional): map, era, seed, fac0, fac1 (faction of seat 0 / seat 1),
   diff (tier of both, default commander), pers (doctrine of both, default
   balanced), limit (game seconds, default 900), b (which seat is "B": 0 or 1),
   off (comma list, goes on B's player as player.aiOff = new Set([...]) before
   the first tick), cash, res.

   Output: one line "SCORECARD {json}". Side "A" and "B" are not seats; the
   json carries seat numbers too. Per side: destroyed / lost (credits, from the
   defs' costs: Combat.kill prices every death, and what one side destroyed is
   what the other lost), units and buildings lost, production buildings
   standing, army value (units that are not haulers), buildings value, result.
   Based on _comp.html's harness: both seats get a brain, the human chair
   included. */
(function () {
  var A = {};
  (typeof __ARGS !== "undefined" ? __ARGS : []).forEach(function (s) {
    var i = s.indexOf("="); if (i > 0) A[s.slice(0, i)] = s.slice(i + 1);
  });
  var MAP = A.map || "fulda", ERA = A.era || "e80", SEED = A.seed || "sc1",
      FAC = [A.fac0 || "nato", A.fac1 || "pact"], DIFF = A.diff || "commander",
      PERS = A.pers || "balanced", LIMIT = parseFloat(A.limit || "900"),
      B = A.b === "0" ? 0 : 1, OFF = (A.off || "").split(",").filter(Boolean);
  var SIDE = B === 0 ? ["B", "A"] : ["A", "B"];          /* seat -> label */
  var errs = [];
  window.addEventListener("error", function (e) { errs.push((e.message || "error") + " " + (e.filename || "") + ":" + (e.lineno || "")); });

  window.addEventListener("load", function () {
    var set = function (i, v) { var e = document.getElementById(i); if (e) e.value = v; };
    set("opt-map", MAP);
    set("opt-fac", FAC[0]); set("opt-foe", FAC[1]);
    set("opt-ptech", "3"); set("opt-atech", "3");
    set("opt-era", ERA); set("opt-peracap", ERA); set("opt-aera", ERA); set("opt-aeracap", ERA);
    set("opt-diff", DIFF); set("opt-pers", PERS); set("opt-opponents", "1"); set("opt-handi", "1");
    set("opt-fog", "1"); set("opt-3d", "0");
    set("opt-cash", A.cash || "20000"); set("opt-res", A.res || "1.6");
    set("opt-seed", SEED);
    /* The page's slot list is mounted but under env.js its rows carry no
       faction, so the roster would deal the enemy a RANDOM army from the seed.
       With no rows to read, main.js falls back to the old count path, which
       honours opt-fac / opt-foe - what every harness page does. */
    var sl = document.getElementById("slot-list");
    if (sl) sl.querySelectorAll = function () { return []; };
    window.IRONFRONT_SYNC_START = true;
    var t0 = Date.now();
    try { document.getElementById("btn-start").click(); }
    catch (e) { print("SCORECARD " + JSON.stringify({ error: "start failed: " + e })); return; }
    var P = Game.players;
    if (!P || P.length < 2) { print("SCORECARD " + JSON.stringify({ error: "no two players" })); return; }
    P[0].isAI = true;
    AI.create(Game, P[0], DIFF, PERS);
    if (OFF.length) P[B].aiOff = new Set(OFF);

    var lost = [0, 1].map(function () { return { uv: 0, bv: 0, un: 0, bn: 0 }; });
    var defeatT = [null, null];
    var od = Game.onDeath;
    Game.onDeath = function (e) {
      var o = e.owner ? e.owner.idx : -1;
      if (o === 0 || o === 1) {
        var c = e.def.cost || 100, L = lost[o];
        if (e.kind === "building") { L.bv += c; L.bn++; } else { L.uv += c; L.un++; }
      }
      return od.apply(this, arguments);
    };

    function side(seat) {
      var p = P[seat], o = lost[1 - seat], me = lost[seat], army = 0, bld = 0, nu = 0, i;
      for (i = 0; i < p.units.length; i++) { var u = p.units[i]; if (u.dead) continue; nu++; if (!u.def.harvester) army += u.def.cost || 100; }
      for (i = 0; i < p.buildings.length; i++) { var b = p.buildings[i]; if (!b.dead) bld += b.def.cost || 100; }
      return { seat: seat, faction: p.faction,
               destroyed: o.uv + o.bv, destroyedUnits: o.uv, destroyedBldgs: o.bv,
               lost: me.uv + me.bv, lostUnits: me.un, lostBldgs: me.bn,
               prodLeft: p.productionBuildings().length, armyValue: army, bldValue: bld, unitsLeft: nu,
               defeatT: defeatT[seat] };
    }
    function finish() {
      var s = [side(0), side(1)], out = { map: MAP, era: ERA, seed: SEED, tier: DIFF, pers: PERS, limit: LIMIT,
                                          b: B, off: OFF, endT: Math.round(Game.time * 10) / 10 };
      out.A = s[SIDE.indexOf("A")]; out.B = s[SIDE.indexOf("B")];
      [out.A, out.B].forEach(function (x) {
        var other = x === out.A ? out.B : out.A;
        x.result = other.defeatT !== null && x.defeatT === null ? "won" : (x.defeatT !== null && other.defeatT === null ? "lost" : "undecided");
      });
      out.wall = Math.round((Date.now() - t0) / 100) / 10;
      if (errs.length) out.errors = errs.slice(0, 3);
      print("SCORECARD " + JSON.stringify(out));
      window.requestAnimationFrame = function () { return 0; }; Game.paused = true;
    }
    function batch() {
      var n = 0;
      while (Game.time < LIMIT && !Game.over && n++ < 3000) {
        Game.tick(CFG.DT);
        for (var s = 0; s < 2; s++) if (defeatT[s] === null && P[s].defeated) defeatT[s] = Math.round(Game.time * 10) / 10;
      }
      if (Game.time >= LIMIT || Game.over) { finish(); return; }
      setTimeout(batch, 0);
    }
    setTimeout(batch, 0);
  });
})();
