/* tools/jsc/crowd_check.js - a crowd at rest round the point it was sent to
   stays at rest when it is handed that point again, and when the point comes
   free one of it walks in - one, and all the way. Checked on the real game
   under JavaScriptCore.

     python3 tools/jsc/scene3d.py tools/jsc/crowd_check.js

   entities.js crowdStop(): a unit handed the point it already stopped for
   is still there - unless the point has come free since, and then it walks
   in. The commander re-hands every idle member of a wave its attack-move
   each think (ai.js driveWave, 1.6 s), so that rule is asked of the whole
   crowd at once, again and again. The behaviour suite ([64], "re-handed the
   same point every 1.6 s") failed once on a crowd of rifle squads that had
   come to rest with the point itself open, and the re-hands sent squads off
   on every think; it passed again only on a different random stream.

   The crowd here is laid down directly, ring by ring round one point, and
   each squad is handed that point with its spot already chosen where it
   stands - the order findSpot() itself writes - so each trip ends on the
   spot and the squad rests there for the point exactly as an arrival does
   (restsAt). Then:
     1. the point left open, the nearest six standing just off it - inside
        the 0.8 of a tile an arrival is allowed, so each of them is there by
        its own measure, and outside a squad's formation spacing, so none of
        them covers the point for the others - and twelve more 40 px out,
        near enough that one walking in from there used to stop short; the
        point re-handed every 1.6 s for 8 s: nobody sets off; then one
        squad of the outer twelve handed the point on its own - selected
        alone and right-clicked, or one give() - walks in, all the way, and
        the rest stay: nobody else was asked, so nobody holds it back;
     2. a squad standing on the point, six round it 30 px out and twelve
        beyond, all facing outward: at rest under the re-hands; then the
        squad on the point is lost, and at the next re-hand ONE squad walks
        in, all the way onto the point, and nobody else moves - the six
        nearest stand the same distance out, so a tie must not send two, and
        the one that goes turns as it goes, so its first steps take it
        farther out than the rest of its ring - and after that the crowd is
        at rest again.
   Both for a crowd of the player's, re-handed the way the player does it -
   one squad selected at a time and right-clicked onto the point through the
   page's own mouse handler on the real 3D view (ui.js hands a single unit the
   raw point, a move) - and for a crowd of the commander's, re-handed the
   way driveWave does it (give() an attack-move to every idle member). The
   rule is the engine's, not a setting of the commander's: the two crowds
   must behave alike, and do.

   MEASURED on the build before the fix (38b14d3): 11 of 21 failed. With the
   point open the re-hands moved the player's crowd 152.8 px in 8 s, with 37
   unit-samples back on the order, the commander's 131.5 px and 23: re-hand
   after re-hand sent one squad in for the point, to stop 25 px out, and up to
   five more off to spots farther out, until one that set off from farther
   back got onto it (the player's crowd: the fourth) - so the squad handed
   the point on its own afterwards stood wherever that left it. With the
   squad on the point lost, all 18 moved (220.8 and 243.1 px), and the one
   sent onto the point stopped 22-25 px out. On the first cut of the fix,
   which counted every one of the crowd at rest nearer the point, and one
   walking in only while it stood nearer: 4 of 21 failed. The squad handed
   the open point on its own did not move, in either crowd, 40.0 px out;
   and with the ring facing outward six of the commander's squads walked in
   for the lost point. */
var TT = 32, PASS = 0, FAIL = 0, DT = 1 / 30;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-cash", "200000"); set("opt-seed", "btest"); set("opt-fog", "0"); set("opt-3d", "1");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});
function ticks(n) { for (var i = 0; i < n; i++) Game.tick(DT); }
function run() {
  var P = Game.human, E = Game.players.filter(function (p) { return p !== P && p.isAI; })[0];
  var M = Game.map, team1 = E && E.team, made = [];
  chk("a commander to own the second crowd", !!E, E ? E.faction : "none");
  if (!E) return;
  Game.players.forEach(function (p) { if (p !== P) AI.setPeace(p, true); });
  Game.checkVictory = function () {};
  /* the commander's squads stand by the player's base: on one letter for
     the duration, so nobody shoots at them */
  E.team = P.team;
  /* open ground nearest the player's base, as the behaviour suite finds it */
  var gp = null, bd = Infinity, hx = (P.homeX / TT) | 0, hy = (P.homeY / TT) | 0;
  for (var y = 4; y < M.H - 18; y += 2) for (var x = 4; x < M.W - 18; x += 2) {
    var good = true;
    for (var j = 0; j < 14 && good; j++) for (var i = 0; i < 14; i++)
      if (!GameMap.passable(M, x + i, y + j, "ground") || Game.tileBlocked(x + i, y + j, null)) { good = false; break; }
    if (good) { var d = Math.abs(x - hx) + Math.abs(y - hy); if (d < bd) { bd = d; gp = { x: x, y: y }; } }
  }
  chk("open ground for the crowd", !!gp, gp ? "(" + gp.x + "," + gp.y + ")" : "none");
  if (!gp) return;
  var gx = (gp.x + 7) * TT + 16, gy = (gp.y + 7) * TT + 16, clicked = null;
  var sides = [{ who: P, name: "the player's" }, { who: E, name: "the commander's" }];
  try {
    sides.forEach(function (side) {
      var id = Game.unitOf(side.who, "rifle"), def = UNITS[id];
      if (!def) { chk(side.name + " army fields a rifle squad", false, String(id)); return; }
      /* the two distances that disagree: a squad's formation spacing (what
         pointTaken counts as covering the point, squad to squad) and the
         0.8 of a tile an arrival may stop short (stepAlong, crowdStop) */
      var cl = Math.max(def.r * 0.6, 8), cover = 2 * def.r + cl, arrive = TT * 0.8;
      log("\n" + side.name + " crowd, " + id + ": a squad covers the point within " + cover.toFixed(1) +
          " px, an arrival stops within " + arrive.toFixed(1));
      var A = side.who === P ? reHandPlayer : reHandCommander;

      /* ---- 1. at rest with the point open: the nearest six between the
         two distances, the next twelve near enough that one walking in from
         there is still within half a tile of where it stood (restsAt) when
         it comes inside 0.8 of a tile of the point ---- */
      var r1 = (cover + arrive) / 2;
      var crowd = lay(side.who, id, [[r1, 6, 0], [arrive + TT * 0.45, 12, Math.PI / 12]]);
      chk(side.name + " crowd of 18 squads laid down at rest round the point, the nearest " + r1.toFixed(1) + " px off it",
          crowd.length === 18 && crowd.every(function (u) { return u.order.type === "idle" && u.restsAt(gx, gy); }) &&
          !crowd.some(function (u) { return u.pointTaken(gx, gy) && Math.hypot(u.x - gx, u.y - gy) > arrive; }),
          crowd.length + " laid, " + crowd.filter(function (u) { return u.restsAt(gx, gy); }).length + " at rest for the point");
      var s = watch(crowd, A, 5);
      if (side.who === P)
        chk("a right-click with one squad selected hands it the point itself, a move",
            clicked !== null && clicked < 3, clicked === null ? "no move order" : (clicked.toFixed(2) + " px off the point"));
      chk(side.name + " crowd with the point open, re-handed it every 1.6 s for 8 s: nobody sets off",
          s.moved < 2 && s.going === 0, say(s));
      side.open = s;

      /* ---- 1b. one squad of that crowd handed the point on its own - the
         player's right-click with only it selected - walks in, all the way:
         nobody else was asked, so nobody else holds it back ---- */
      var lone = crowd[9], l0 = Math.hypot(lone.x - gx, lone.y - gy), at1 = crowd.map(function (u) { return [u.x, u.y]; });
      A([lone]);
      ticks(Math.round(4 / DT));
      var lw = Math.hypot(lone.x - gx, lone.y - gy), stirred = 0, rest = 0;
      crowd.forEach(function (u, i) {
        if (u === lone) return;
        var m = Math.hypot(u.x - at1[i][0], u.y - at1[i][1]);
        rest += m; if (m > 4) stirred++;
      });
      chk(side.name + " crowd: one squad of it handed the open point on its own walks in, all the way, and the rest stay",
          lw < TT * 0.45 && lone.order.type === "idle" && stirred === 0,
          "ended " + lw.toFixed(1) + " px from the point (" + l0.toFixed(1) + " out before); the rest moved " + rest.toFixed(1) +
          " px, " + stirred + " of them more than 4 px");
      s = watch(crowd, A, 2);
      chk(side.name + " crowd: and then it is at rest under the re-hands", s.moved < 2 && s.going === 0, say(s));
      clear();

      /* ---- 2. the point comes free. The crowd faces outward, away from
         it: the one that walks in turns as it goes, so its first steps take
         it farther out, past the rest of its ring ---- */
      var cen = lay(side.who, id, [[0, 1, 0]]), ring = lay(side.who, id, [[cover + 10, 6, 0], [2 * cover + 10, 12, Math.PI / 12]]);
      ring.forEach(function (u) { u.ang = u.tang = Math.atan2(u.y - gy, u.x - gx); });
      crowd = cen.concat(ring);
      s = watch(crowd, A, 2);
      chk(side.name + " crowd with a squad on the point, re-handed it: nobody sets off",
          crowd.length === 19 && s.moved < 2 && s.going === 0, say(s));
      var lost = cen[0];
      lost.dead = true; Game.sweepDead();
      var at0 = ring.map(function (u) { return [u.x, u.y]; });
      s = watch(ring, A, 1);
      var went = ring.filter(function (u, i) { return Math.hypot(u.x - at0[i][0], u.y - at0[i][1]) > 2; });
      var w = went[0], wd = w ? Math.hypot(w.x - gx, w.y - gy) : NaN;
      chk(side.name + " crowd: the squad on the point lost, at the next re-hand one squad walks in - and only one",
          went.length === 1, went.length + " moved more than 2 px; " + say(s));
      chk(side.name + " crowd: and it walks all the way onto the point, where the rest count it as covering it",
          !!w && wd < TT * 0.45 && ring.every(function (u) { return u === w || u.pointTaken(gx, gy); }),
          w ? "ended " + wd.toFixed(1) + " px from the point (" + Math.hypot(at0[ring.indexOf(w)][0] - gx, at0[ring.indexOf(w)][1] - gy).toFixed(1) +
              " out before)" : "nobody went");
      s = watch(ring, A, 4);
      chk(side.name + " crowd: and then it is at rest again under the re-hands", s.moved < 2 && s.going === 0, say(s));
      side.free = { went: went.length, wd: wd };
      clear();
    });
  } finally {
    E.team = team1; clear();
  }
  chk("the player's crowd and the commander's behave alike: at rest with the point open, one walking in when it comes free",
      sides[0].open && sides[1].open && sides[0].free && sides[1].free &&
      sides[0].open.moved < 2 && sides[1].open.moved < 2 &&
      sides[0].free.went === sides[1].free.went && Math.abs(sides[0].free.wd - sides[1].free.wd) < 4,
      sides.map(function (sd) { return sd.name + ": open point " + (sd.open ? sd.open.moved.toFixed(1) + " px" : "-") +
        ", freed point " + (sd.free ? sd.free.went + " walked in, ended " + sd.free.wd.toFixed(1) + " px off" : "-"); }).join("; "));
  chk("the letters and the board are back as they were", E.team === team1 && made.length === 0, "team " + E.team);

  /* squads laid at rest round (gx, gy): rings of [radius, count, start angle].
     Each is handed the point with its spot where it stands, so its trip ends
     there and it rests there for this point */
  function lay(who, id, rings) {
    var out = [];
    rings.forEach(function (rg) {
      for (var k = 0; k < rg[1]; k++) {
        var a = rg[2] + k / rg[1] * Math.PI * 2, x = gx + Math.cos(a) * rg[0], y = gy + Math.sin(a) * rg[0];
        var u = Game.spawnUnitAt(who, id, x, y);
        if (!u) continue;
        u.x = x; u.y = y; made.push(u); out.push(u);
      }
    });
    ticks(2);
    out.forEach(function (u) {
      u.give({ type: who === P ? "move" : "attackmove", x: gx, y: gy, sx: u.x, sy: u.y });
    });
    ticks(30);
    return out;
  }
  /* re-hand the point every 1.6 s, `n` times, and say how the crowd stood:
     px moved in all, and unit-samples back on the order every 0.4 s */
  function watch(us, reHand, n) {
    var at = us.map(function (u) { return [u.x, u.y]; }), going = 0, every = Math.round(1.6 / DT), smp = Math.round(0.4 / DT);
    for (var k = 0; k < n * every; k++) {
      if (k % every === 0) reHand(us.filter(function (u) { return !u.dead && u.order.type === "idle"; }));
      Game.tick(DT);
      if (k % smp === 0) us.forEach(function (u) { var t = u.order.type; if (t === "move" || t === "attackmove") going++; });
    }
    var moved = 0;
    us.forEach(function (u, i) { moved += Math.hypot(u.x - at[i][0], u.y - at[i][1]); });
    return { moved: moved, going: going };
  }
  function say(s) { return "moved " + s.moved.toFixed(1) + " px, " + s.going + " unit-samples back on the order"; }
  /* the commander's way: driveWave */
  function reHandCommander(us) { us.forEach(function (u) { u.give({ type: "attackmove", x: gx, y: gy }); }); }
  /* the player's way: each squad selected on its own and right-clicked onto
     the point on the 3D view */
  function reHandPlayer(us) {
    Render.setCam(gx, gy); Render.draw(DT, UI.input);
    var cv = document.getElementById("cv"), rc = cv.getBoundingClientRect();
    var px = Render.sx(gx, gy), py = Render.sy(gx, gy);
    us.forEach(function (u) {
      var sel = UI.selection; for (var i = 0; i < sel.length; i++) sel[i].selected = false; sel.length = 0;
      u.selected = true; sel.push(u);
      cv.dispatchEvent({ type: "mousedown", button: 2, clientX: rc.left + px, clientY: rc.top + py,
                         shiftKey: false, ctrlKey: false, metaKey: false });
      if (clicked === null && u.order.type === "move") clicked = Math.hypot(u.order.x - gx, u.order.y - gy);
    });
    var sel = UI.selection; for (var i = 0; i < sel.length; i++) sel[i].selected = false; sel.length = 0;
  }
  function clear() {
    while (made.length) made.pop().dead = true;
    Game.sweepDead();
  }
}
