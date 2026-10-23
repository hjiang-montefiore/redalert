/* tools/jsc/weather_radar_check.js - the weather does not blunt what a side's
   own radar holds: the fog, the guns and the 3D picture, checked on the real
   game under JavaScriptCore.

     python3 tools/jsc/run.py index.html --test tools/jsc/weather_radar_check.js
     python3 tools/jsc/scene3d.py tools/jsc/weather_radar_check.js     (adds [6], the 3D look)

   (owner) "weather should not be affect the area with rador" - and, asked what
   goes wrong, all three of: the screen haze hides it, units fight worse there,
   and the fog of war closes. A Pact player (thermal 0.55, so the weather
   bites: a T-90M sees 7.5 tiles on a clear day, 4.5 at night and 3.9 in a
   sandstorm) against a commander played as the Pact too, so the two seats
   are held to the same numbers. Every bad weather is held to clear:
     1. FOG, the player's: a Radar Dome and a Burke's own radar light every
        contact inside their reach - a tank, a ship, a helicopter - in every
        weather, the minimap's grid and the ghosts with them, and the air
        track holds; switched off (EMCON) the dome lights nothing past its
        eyes. All of this held before the change too - the fog's radar lift
        never had a weather term - and is kept. G.radarHeld, the one test the
        rules below ask, is the fog's own radar part, tile for tile.
     2. FOG, the commander's: the same dome's picture (G.sideSees) holds the
        same contacts, and its crews' eyes (G.visibleTo, the plot intelSweep
        writes) reach as far on a radar-held contact as on a clear day.
     3. COMBAT: a tank's 125 mm round, a Burke's 5-inch and the commander's own
        tank hit a radar-held target 7 tiles off as often as on a clear day; a
        dark or jammed radar gives nothing back, and neither does a rifle squad
        get it (the scope: dismounts carry no sight the radar can cue).
     4. ACQUISITION: a tank picks up a radar-held contact 7 tiles off by itself
        at night, as on a clear day - the player's and the commander's alike;
        not with the dome dark, and a rifle squad not at all.
     5. CLEAR WEATHER IS UNTOUCHED: every number above is the clear-day one.
     7. A SUBMERGED BOAT IS NOT HELD: the paint lights the water over it, but
        a radar does not see under the surface (G.radarHolds), so a boat keeps
        the weather's cut on the eyes and the torpedo laid at it.
     6. THE 3D LOOK (scene3d.py only): with the view centred inside the
        player's radar cover the scene's haze is eased back to the clear-day
        distances and the light to at least an overcast day's, fading in over
        a few frames; outside it, and with the dome dark, the weather's own
        look holds; and its cost is one radarHeld lookup a frame.
   Before the change [2] and [3] failed in all four bad weathers, [4] at
   night, in rain and in a sandstorm (overcast cuts a T-90M to 6.6 tiles, and
   the grid's two-tile buckets still hand it the tank at 7), [5] for want of
   the rule, and [6] in all four. */
var TT = 32, PASS = 0, FAIL = 0, DT = 1 / 30;
var HAS3D = typeof THREE !== "undefined" && typeof Render3D !== "undefined";
var WX = ["overcast", "night", "rain", "sandstorm"];
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20"); set("opt-fac", "pact");
  set("opt-cash", "200000"); set("opt-seed", "btest"); set("opt-fog", "1"); set("opt-3d", HAS3D ? "1" : "0");
  set("opt-weather", "clear");
  if (HAS3D) CFG.GFX_LEVEL = "high";
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

/* ---------------- helpers ---------------- */
var P, E, M;
function gone(u) {
  if (!u || u.dead === undefined) return; u.dead = true;
  var i = Game.entities.indexOf(u); if (i >= 0) Game.entities.splice(i, 1);
  var l = u.owner && (u.kind === "building" ? u.owner.buildings : u.owner.units);
  if (l) { i = l.indexOf(u); if (i >= 0) l.splice(i, 1); }
}
function regrid() {
  Game.grid.clear();
  Game.entities.forEach(function (e) { if (!e.dead && !e.carried) Game.grid.insert(e); });
}
function setWx(k) { Game.weatherKey = k; Game.weatherLock = true; }
/* back on the air at once: the crew's relight delay is not what is tested */
function lightUp(e) { Game.setEmcon(e, false); e.emcon = false; e.relightAt = 0; }
function ground(x, y) { return x >= 2 && y >= 2 && x < M.W - 2 && y < M.H - 2 && GameMap.passable(M, x, y, "ground") && !Game.tileBlocked(x, y, null); }
function sea(x, y) { return x >= 2 && y >= 2 && x < M.W - 2 && y < M.H - 2 && GameMap.passable(M, x, y, "sea"); }
function put(p, key, tx, ty) {
  var u = Game.spawnUnitAt(p, key, (tx + 0.5) * TT, (ty + 0.5) * TT);
  if (!u) return null;
  u.x = (tx + 0.5) * TT; u.y = (ty + 0.5) * TT; u.tx = tx; u.ty = ty;
  u.maxHp = u.hp = 1e7; u.stance = "hold"; u.moving = false;
  return u;
}
function dome(p, tx, ty) {
  var b = Game.placeBuilding(p, "radar", tx, ty, true);
  if (b) { b.buildProgress = 1; b.maxHp = b.hp = 1e7; }
  return b;
}
/* the first dome plot, searched outward from (nx, ny), with open ground at
   every offset in `need` (tiles from the dome's centre) and - asked for -
   water 14 to 19 tiles off it, well away from the `far` offset */
function domeSite(nx, ny, need, wantSea, far) {
  for (var r = 0; r < 26; r++) for (var dy = -r; dy <= r; dy++) for (var dx = -r; dx <= r; dx++) {
    if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
    var x = nx + dx, y = ny + dy, ok = true;
    for (var j = 0; j < 2 && ok; j++) for (var i = 0; i < 2; i++) if (!ground(x + i, y + j)) { ok = false; break; }
    for (var k = 0; k < need.length && ok; k++) if (!ground(x + 1 + need[k][0], y + 1 + need[k][1])) ok = false;
    if (!ok) continue;
    var w = null;
    if (wantSea) {
      for (var a = 0; a < 48 && !w; a++) for (var rr = 14; rr <= 19 && !w; rr++) {
        var sx = Math.round(x + 1 + Math.cos(a / 48 * 6.283) * rr), sy = Math.round(y + 1 + Math.sin(a / 48 * 6.283) * rr);
        if (far && Math.hypot(sx - (x + 1 + far[0]), sy - (y + 1 + far[1])) < 12) continue;
        if (sea(sx, sy) && sea(sx + 1, sy) && sea(sx, sy + 1)) w = { x: sx, y: sy };
      }
      if (!w) continue;
    }
    return { x: x, y: y, cx: x + 1, cy: y + 1, sea: w };
  }
  return null;
}
/* an open w x h block for a power station, near (nx, ny) */
function block(w, h, nx, ny) {
  for (var r = 0; r < 30; r++) for (var dy = -r; dy <= r; dy++) for (var dx = -r; dx <= r; dx++) {
    if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
    var ok = true;
    for (var j = -1; j <= h && ok; j++) for (var i = -1; i <= w; i++) if (!ground(nx + dx + i, ny + dy + j)) { ok = false; break; }
    if (ok) return { x: nx + dx, y: ny + dy };
  }
  return null;
}
function power(p) {
  var d = BUILDINGS.power, s = block(d.w, d.h, (p.homeX / TT) | 0, ((p.homeY / TT) | 0) + 6);
  var b = s ? Game.placeBuilding(p, "power", s.x, s.y, true) : null;
  if (b) b.buildProgress = 1;
  return b;
}
/* a sea tile with open water 15 tiles east of it and 14 south of it */
function seaSite(nx, ny) {
  for (var r = 0; r < 30; r++) for (var dy = -r; dy <= r; dy++) for (var dx = -r; dx <= r; dx++) {
    if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
    var x = nx + dx, y = ny + dy;
    if (sea(x, y) && sea(x + 15, y) && sea(x + 10, y) && sea(x, y + 14)) return { x: x, y: y };
  }
  return null;
}
/* How often one round from `sh` hits `tg`, exactly: Combat.fire rolls
   game.rng() < acc, so with the RNG held at a constant the round hits for
   every constant below acc and misses for every one above. Twenty halvings
   pin acc to a millionth. The rounds are taken back off the board. */
function accOf(sh, wkey, tg) {
  var w = WEAPONS[wkey], rng0 = Game.rng, lo = 0, hi = 1, hp0 = tg.hp;
  var n0 = Combat.projectiles.length, f0 = Combat.effects.length;
  for (var i = 0; i < 20; i++) {
    var mid = (lo + hi) / 2;
    Game.rng = function () { return mid; };
    var np = Combat.projectiles.length, ne = Combat.effects.length, hit = false;
    Combat.fire(Game, sh, w, tg);
    if (Combat.projectiles.length > np) hit = !!Combat.projectiles[Combat.projectiles.length - 1].hit;
    else {
      for (var k = Combat.effects.length - 1; k >= ne; k--) {
        var fx = Combat.effects[k];
        if (fx.t === "tracer") { hit = fx.x2 === tg.x; break; }
      }
    }
    if (hit) lo = mid; else hi = mid;
  }
  Game.rng = rng0; tg.hp = hp0;
  Combat.projectiles.length = n0; Combat.effects.length = f0;
  return lo;
}
function f3(v) { return v === null || v === undefined ? "-" : (+v).toFixed(3); }
function tiles(a, b) { return (Math.hypot(a.x - b.x, a.y - b.y) / TT).toFixed(2); }
function vm(u) { return Game.visionMul(u); }
function hasRule() { return typeof Game.radarHeld === "function"; }

function run() {
  P = Game.human; M = Game.map;
  E = Game.players.filter(function (p) { return p !== P && !Game.allied(P, p); })[0];
  /* the commander is played as the Pact too, so the two seats meet the same
     thermal fit and the same numbers (the menu's own foe is whatever its slot
     roster picks) */
  E.faction = "pact";
  AI.setPeace(E, true); Game.checkVictory = function () {};
  Game.players.forEach(function (p) { p.units.slice().forEach(gone); });
  setWx("clear");
  log("human " + P.faction + ", commander " + E.faction + "; T-90M sight " + UNITS.mbt_p.sight +
      ", visionMul night/sandstorm/rain/overcast " + ["night", "sandstorm", "rain", "overcast"].map(function (k) {
        setWx(k); var u = { def: UNITS.mbt_p, owner: P, cat: "vehicle" }; var v = Game.visionMul(u); return v.toFixed(3); }).join("/"));
  setWx("clear");

  /* ---------------- the sites ---------------- */
  /* the player's: the tank row east (12 and 19 tiles), the squads south-west,
     the fog's tank west; the commander's: its tank row east */
  var NEED = [[12, 0], [19, 0], [3, 0], [21, 0], [-6, 6], [-6, 11], [-16, 0]];
  var H = domeSite(112, 30, NEED, true, [12, 0]), A = domeSite(100, 122, [[12, 0], [19, 0]], false), S = seaSite(30, 62);
  chk("the sites: a dome plot for each seat, the player's with water in its reach, and open sea for a Burke",
      !!H && !!A && !!S, JSON.stringify({ H: H, A: A, S: S }));
  if (!H || !A || !S) return;
  power(P); power(E);
  var dH = dome(P, H.x, H.y), dA = dome(E, A.x, A.y);
  chk("both domes stand, built, on a grid that carries them",
      !!dH && !!dA && P.powerRatio() >= 1 && E.powerRatio() >= 1 && dH.powered && dA.powered,
      "power " + P.powerRatio().toFixed(2) + " / " + E.powerRatio().toFixed(2));

  /* the player's site: a tank 12 tiles out from its dome and a Pact tank 7
     tiles beyond it (19 from the dome: past the dome's own 11 tiles of eyes,
     inside its 22 of radar); a rifle squad 4.7 tiles from a Pact squad; and,
     for the fog, a tank, a helicopter and a ship 15-19 tiles off it */
  var T = put(P, "mbt_p", H.cx + 12, H.cy), Q = put(E, "mbt_p", H.cx + 19, H.cy);
  var Rf = put(P, "rifle_p", H.cx - 6, H.cy + 6), Rq = put(E, "rifle_p", H.cx - 6, H.cy + 11);
  /* (the squads stand off the tanks' row, 4.7 tiles apart on a column) */
  if (Rf && Rq) { Rq.x = Rf.x; Rq.y = Rf.y + 4.7 * TT; Rq.tx = Rf.tx; Rq.ty = (Rq.y / TT) | 0; }
  var fTank = put(E, "mbt_p", H.cx - 16, H.cy), fHelo = put(E, "helo_p", H.cx - 8, H.cy - 14);
  var fShip = put(E, "destroyer_p", H.sea.x, H.sea.y);
  /* the Burke, alone at sea: a Pact destroyer 15 tiles east (past her 11.9
     tiles of eyes, inside her 20 of radar) and a helicopter 14 south */
  var B = put(P, "destroyer_n", S.x, S.y), bShip = put(E, "destroyer_p", S.x + 15, S.y), bHelo = put(E, "helo_p", S.x, S.y + 14);
  /* a gun target for the Burke 10 tiles off: past her night eyes (7.2), inside her clear ones */
  var bGun = put(E, "destroyer_p", S.x + 10, S.y);
  /* the commander's site, the mirror: its tank 12 out and one of ours 7 beyond */
  var AT = put(E, "mbt_p", A.cx + 12, A.cy), AQ = put(P, "mbt_p", A.cx + 19, A.cy);
  var all = [T, Q, Rf, Rq, fTank, fHelo, fShip, B, bShip, bHelo, bGun, AT, AQ];
  chk("everything is on the board", all.every(function (u) { return !!u; }),
      all.map(function (u) { return u ? u.def.id : "null"; }).join(" "));
  if (!all.every(function (u) { return !!u; })) return;
  regrid();
  log("  distances: T-Q " + tiles(T, Q) + ", dome-Q " + tiles(dH, Q) + ", dome-fTank " + tiles(dH, fTank) +
      ", dome-fHelo " + tiles(dH, fHelo) + ", dome-fShip " + tiles(dH, fShip) + ", Burke-ship " + tiles(B, bShip) +
      ", Burke-helo " + tiles(B, bHelo) + ", Burke-gun target " + tiles(B, bGun) + ", squads " + tiles(Rf, Rq) +
      ", commander's T-Q " + tiles(AT, AQ) + " (dome-Q " + tiles(dA, AQ) + ")");

  /* ---------------- 1. the player's fog ---------------- */
  log("\n[1] the player's fog under the dome and the Burke's own radar");
  var contacts = [["tank", fTank], ["helicopter", fHelo], ["ship", fShip], ["Burke's ship", bShip], ["Burke's helicopter", bHelo], ["gun target", Q]];
  ["clear"].concat(WX).forEach(function (k) {
    setWx(k); Game.recomputeFog();
    var lost = contacts.filter(function (c) { return !Game.visibleTo(P, c[1]) || !Game.sideSees(P, c[1]); });
    chk("[1] " + k + ": every contact inside the dome's or the Burke's radar is on the player's screen (fog grid, G.sideSees)",
        !lost.length, lost.length ? "lost: " + lost.map(function (c) { return c[0]; }).join(", ") :
        "Burke sees " + B.sightR().toFixed(2) + " tiles, the dome " + dH.sightR().toFixed(1) + ", its radar " + dH.def.radar);
  });
  /* ghosts: a contact held by radar is seen, so it is never left as a ghost */
  setWx("night");
  for (var g = 0; g < 4; g++) { Game.recomputeFog(); if (Game.trackGhosts) Game.trackGhosts(); }
  var gh = (Game.ghosts || []).filter(function (r) { return contacts.some(function (c) { return c[1].id === r.id; }); });
  chk("[1] night: no radar-held contact is turned into a ghost", !gh.length, gh.length + " ghosts");
  /* the air track: radarQ, no weather term at all */
  var sam = put(P, "sam_p", H.cx + 2, H.cy - 3);
  regrid();
  chk("[1] night: the helicopter is an air track for a SAM under the dome (G.airTrack carries no weather)",
      !!sam && Game.airTrack(sam, fHelo), sam ? "" : "no SAM");
  gone(sam);
  /* switched off, the dome lights nothing past its own eyes */
  Game.setEmcon(dH, true); Game.recomputeFog();
  chk("[1] night, dome dark (EMCON): the contacts past its eyes are off the screen again",
      !Game.visibleTo(P, fTank) && !Game.visibleTo(P, Q), "");
  lightUp(dH); Game.recomputeFog();
  /* the rule's own test is the fog's radar part, tile for tile */
  if (hasRule()) {
    var bad = 0, lit = 0;
    Game.recomputeFog();
    for (var ty = 0; ty < M.H; ty++) for (var tx = 0; tx < M.W; tx++) {
      var held = Game.radarHeld(P, (tx + 0.5) * TT, (ty + 0.5) * TT);
      if (held) { lit++; if (Game.fog[ty * M.W + tx] !== 2) bad++; }
    }
    chk("[1] G.radarHeld is the fog's radar part: every tile it holds is lit, and it holds the dome's and the Burke's circles",
        !bad && lit > 2000 && Game.radarHeld(P, fTank.x, fTank.y) && Game.radarHeld(P, bShip.x, bShip.y) && !Game.radarHeld(P, AQ.x, AQ.y),
        lit + " tiles held, " + bad + " of them not lit");
  } else chk("[1] G.radarHeld exists (the one test the weather rules ask)", false, "missing");

  /* ---------------- 2. the commander's fog ---------------- */
  log("\n[2] the commander's picture under its own dome");
  var aiSeen = {};
  ["clear"].concat(WX).forEach(function (k) {
    setWx(k);
    var ss = Game.sideSees(E, AQ), eyes = Game.visibleTo(E, AQ);
    /* its plot: one intel sweep, the one that runs every 0.8 s */
    var t0 = Game.time; Game.time += 1.0;
    AI.update(0.9);
    var s = AI.sightingOf(E, AQ.id);
    var plotted = !!s && s.t >= Game.time - 0.01;
    Game.time = t0 + 1.0;
    aiSeen[k] = { ss: ss, eyes: eyes, plot: plotted };
    chk("[2] " + k + ": the commander's dome holds our tank (G.sideSees), its tank's eyes reach it (G.visibleTo) and its plot has it",
        ss && eyes && plotted, "sideSees " + ss + ", visibleTo " + eyes + ", plotted " + plotted +
        "; its tank sees " + AT.sightR().toFixed(2) + " of " + tiles(AT, AQ) + " tiles");
  });

  /* ---------------- 3. combat ---------------- */
  log("\n[3] how often a round hits a radar-held target");
  var gunT = UNITS.mbt_p.weapons[0], gunB = "navgun_mk45", rifle = UNITS.rifle_p.weapons[0];
  setWx("clear");
  var c0 = { T: accOf(T, gunT, Q), B: accOf(B, gunB, bGun), AT: accOf(AT, gunT, AQ), R: accOf(Rf, rifle, Rq) };
  log("  clear: tank " + f3(c0.T) + ", Burke " + f3(c0.B) + ", commander's tank " + f3(c0.AT) + ", rifle squad " + f3(c0.R));
  WX.forEach(function (k) {
    setWx(k);
    var a = { T: accOf(T, gunT, Q), B: accOf(B, gunB, bGun), AT: accOf(AT, gunT, AQ), R: accOf(Rf, rifle, Rq) };
    chk("[3] " + k + ": our tank, the Burke and the commander's tank hit a radar-held target as on a clear day",
        Math.abs(a.T - c0.T) < 1e-4 && Math.abs(a.B - c0.B) < 1e-4 && Math.abs(a.AT - c0.AT) < 1e-4,
        "tank " + f3(a.T) + "/" + f3(c0.T) + " (sees " + T.sightR().toFixed(2) + " of " + tiles(T, Q) + "), Burke " + f3(a.B) + "/" + f3(c0.B) +
        " (sees " + B.sightR().toFixed(2) + " of " + tiles(B, bGun) + "), commander's " + f3(a.AT) + "/" + f3(c0.AT));
    if (vm(Rf) + 0.35 < 1)
      chk("[3] " + k + ": a rifle squad is not given it - the weather still costs it (scope: dismounts)",
          a.R < c0.R - 1e-3, "rifle " + f3(a.R) + "/" + f3(c0.R) + " (visionMul " + vm(Rf).toFixed(3) + ")");
  });
  /* switched off or jammed, the dome holds nothing and the weather costs what
     it always did: blind past the crew's night eyes. Held to the same shot
     with no radar on a clear day, inside its eyes, the night costs the
     visMul (0.951) and the blind term (0.52) together - 0.49 of it */
  Game.setEmcon(dH, true); Game.recomputeFog();
  setWx("clear");
  var clearDark = accOf(T, gunT, Q);
  setWx("night");
  var dark = accOf(T, gunT, Q);
  chk("[3] night, the dome dark (EMCON): nothing is given back - the round is laid blind past the crew's eyes",
      dark < clearDark * 0.6, f3(dark) + " against " + f3(clearDark) + " on a clear day with the dome dark");
  lightUp(dH);
  var jam = put(E, "ewv_n", H.x - 1, H.y + 3);
  regrid(); Game.recomputeFog();
  var jv = jam ? Game.jamAgainst(P, dH) : 0;
  var jammed = accOf(T, gunT, Q);
  chk("[3] night, the dome jammed past burn-through: nothing given back either",
      !!jam && jv > 0.55 && jammed < clearDark * 0.6, "jam " + jv.toFixed(2) + ", " + f3(jammed) + " against " + f3(clearDark));
  gone(jam); regrid(); Game.recomputeFog();

  /* ---------------- 4. acquisition ---------------- */
  log("\n[4] what a crew picks up by itself");
  ["clear"].concat(WX).forEach(function (k) {
    setWx(k); Game.recomputeFog();
    var a = T.acquire(), b = AT.acquire(), r = Rf.acquire();
    chk("[4] " + k + ": our tank and the commander's take the radar-held tank 7 tiles off by themselves",
        a === Q && b === AQ, "ours " + (a ? a.def.id + " at " + tiles(T, a) : "nothing") + ", theirs " + (b ? b.def.id : "nothing") +
        "; eyes " + T.sightR().toFixed(2));
    if (k !== "clear" && Rf.sightR() < 4.7 - 2.1)
      chk("[4] " + k + ": a rifle squad does not - its eyes are its eyes", r !== Rq, r ? r.def.id : "nothing");
  });
  setWx("night"); Game.setEmcon(dH, true); Game.recomputeFog();
  var aDark = T.acquire();
  chk("[4] night, the dome dark: the tank does not pick it up", aDark !== Q, aDark ? aDark.def.id : "nothing");
  lightUp(dH);
  setWx("clear"); Game.recomputeFog();

  /* ---------------- 5. clear weather untouched ----------------
     [3] and [4] hold every weather to the clear-day numbers; and on a clear
     day the rule is not even asked - nothing in a clear-weather fire or scan
     looks at the radar test, so no clear-day number can have moved */
  if (hasRule()) {
    var asked = 0, rh = Game.radarHeld, ru = Game.radarUp;
    Game.radarHeld = function () { asked++; return rh.apply(this, arguments); };
    /* and the scan's "is any set of ours up" gate, which paints a mask too */
    if (ru) Game.radarUp = function () { asked++; return ru.apply(this, arguments); };
    setWx("clear");
    accOf(T, gunT, Q); accOf(B, gunB, bGun); accOf(AT, gunT, AQ); accOf(Rf, rifle, Rq);
    T.acquire(); AT.acquire(); Rf.acquire(); Game.visibleTo(E, AQ);
    Game.radarHeld = rh; if (ru) Game.radarUp = ru;
    var askedNight = 0;
    Game.radarHeld = function () { askedNight++; return rh.apply(this, arguments); };
    setWx("night"); accOf(T, gunT, Q); T.acquire(); Game.visibleTo(E, AQ);
    Game.radarHeld = rh; setWx("clear");
    chk("[5] clear: the rule is never asked - not by a round, a scan or the commander's eyes - so nothing on a clear day moved",
        asked === 0 && askedNight > 0, asked + " calls on a clear day, " + askedNight + " at night");
  } else chk("[5] clear: the rule is never asked on a clear day", false, "G.radarHeld missing");

  /* ---------------- 7. a submerged boat is not a radar contact ----------------
     Found in review: the fog's paint lights the water over a submarine like
     any other tile, and every caller asked the tile (G.radarHeld), so a
     Burke's eyes on a boat 6 tiles off under her own radar were the clear
     day's at night and her Mk 54 paid no weather term. A radar sees the
     sea's surface and the sky over it; the boat is on sonar alone. */
  log("\n[7] a submarine under our radar is not held by it");
  var subAt = null;
  for (var a7 = 0; a7 < 64 && !subAt; a7++) for (var r7 = 5.6; r7 <= 6.2 && !subAt; r7 += 0.3) {
    var sx7 = Math.round(S.x + Math.cos(a7 / 64 * 6.283) * r7), sy7 = Math.round(S.y + Math.sin(a7 / 64 * 6.283) * r7);
    var d7 = Math.hypot(sx7 - S.x, sy7 - S.y);
    if (d7 >= 5.4 && d7 <= 6.3 && sea(sx7, sy7) && !(sx7 === S.x + 10 && sy7 === S.y)) subAt = { x: sx7, y: sy7 };
  }
  var sub = subAt ? put(E, "sub_p", subAt.x, subAt.y) : null;
  chk("[7] an enemy submarine 5.4-6.3 tiles off the Burke, under her radar", !!sub && sub.layer === "sub",
      sub ? tiles(B, sub) + " tiles" : "no sea tile / no boat");
  if (sub && hasRule()) {
    regrid(); setWx("night"); Game.recomputeFog();
    var tileHeld = Game.radarHeld(P, sub.x, sub.y);
    chk("[7] night: the tile over the boat is in the radar paint, the boat is not held (G.radarHolds), a hull on the surface is",
        tileHeld && !Game.radarHolds(P, sub) && Game.radarHolds(P, bGun),
        "tile " + tileHeld + ", boat " + Game.radarHolds(P, sub) + ", surface hull " + Game.radarHolds(P, bGun));
    chk("[7] night: the Burke's eyes on the boat are her eyes on the night (sightOn), on the surface hull the clear day's",
        Math.abs(B.sightOn(sub) - B.sightR()) < 1e-9 && B.sightOn(bGun) > B.sightR() + 1,
        "boat " + B.sightOn(sub).toFixed(2) + ", surface hull " + B.sightOn(bGun).toFixed(2) + ", her night eyes " + B.sightR().toFixed(2));
    setWx("clear");
    var subClear = accOf(B, "asw_mk54", sub);
    setWx("night");
    var subNight = accOf(B, "asw_mk54", sub);
    chk("[7] night: her Mk 54 at the boat still pays the weather term (no radar gives it back)",
        subNight < subClear - 1e-3, f3(subNight) + " at night against " + f3(subClear) + " on a clear day");
    setWx("clear"); Game.recomputeFog();
  }
  if (sub) { gone(sub); regrid(); }

  if (HAS3D) screen3d(H, A);
  else log("\n[6] the 3D look needs the real renderer: python3 tools/jsc/scene3d.py tools/jsc/weather_radar_check.js");
}

/* ---------------- 6. the 3D look ---------------- */
function screen3d(H, A) {
  log("\n[6] the 3D look");
  var R3 = Render3D, th = R3.three, cam = R3.cam;
  function frames(n) { for (var i = 0; i < n; i++) Render.draw(DT, UI.input); }
  /* the haze over the view centre, for a camera `dist` metres off it */
  function fogAt(l, dist) { return Math.max(0, Math.min(1, (dist - l.near) / (l.far - l.near))); }
  function look() { return { near: th.scene.fog.near, far: th.scene.fog.far, sun: th.sun.intensity, hemi: th.hemi.intensity }; }
  function fmt(l) { return "fog " + Math.round(l.near) + "-" + Math.round(l.far) + " m, sun " + l.sun.toFixed(2) + ", hemi " + l.hemi.toFixed(2) +
                    ", haze over the view centre " + Math.round(fogAt(l, 430) * 100) + "% at 430 m, " + Math.round(fogAt(l, 1200) * 100) + "% at 1200 m"; }
  var dist0 = cam.dist;
  /* inside: the tank row, 10 tiles out from our dome; outside: the
     commander's dome, nowhere near any radar of ours */
  var IN = { x: (H.cx + 10) * TT, y: H.cy * TT }, OUT = { x: A.cx * TT, y: A.cy * TT };
  chk("[6] the two view centres: one our radar holds, one it does not",
      Game.radarHeld ? Game.radarHeld(P, IN.x, IN.y) && !Game.radarHeld(P, OUT.x, OUT.y) : true, "");
  setWx("clear");
  R3.setCam(IN.x, IN.y); frames(150);
  var clear = look();
  log("  clear: " + fmt(clear));
  WX.forEach(function (k) {
    setWx(k);
    R3.setCam(OUT.x, OUT.y); frames(150);
    var outside = look();
    R3.setCam(IN.x, IN.y); frames(3);
    var early = look(); frames(150);
    var inside = look();
    chk("[6] " + k + ": centred inside our radar cover, the haze is the clear day's and the light at least an overcast day's",
        inside.near >= clear.near - 1 && inside.far >= clear.far - 1 && inside.sun >= 1.25 - 0.01 && inside.hemi >= 0.62 - 0.01,
        "inside: " + fmt(inside));
    chk("[6] " + k + ": outside it the weather's own look holds",
        k === "overcast" ? outside.near < clear.near - 1 : outside.near < clear.near - 1 && outside.sun < 1.25 - 0.01,
        "outside: " + fmt(outside));
    if (k === "sandstorm")
      chk("[6] sandstorm: panned in, the look fades rather than snaps (3 frames in it is partway)",
          early.near > outside.near + 1 && early.near < inside.near - 1, "3 frames in: fog from " + Math.round(early.near) + " m");
  });
  /* the dome switched off: its cover is gone, and so is the clear look */
  setWx("sandstorm");
  var dH = P.buildings.filter(function (b) { return b.def.id === "radar"; })[0];
  Game.setEmcon(dH, true); Game.recomputeFog();
  R3.setCam(IN.x, IN.y); frames(150);
  var darkL = look();
  chk("[6] sandstorm, the dome dark: the sandstorm's look comes back over its ground", darkL.near < clear.near - 1 && darkL.sun < 1.25 - 0.01, fmt(darkL));
  lightUp(dH); Game.recomputeFog();
  /* the cost: one radarHeld lookup a frame */
  var n = 200000, t0 = preciseTime(), hits = 0;
  for (var i = 0; i < n; i++) if (Game.radarHeld(P, IN.x + (i & 7), IN.y)) hits++;
  var ns = (preciseTime() - t0) / n * 1e9;
  chk("[6] the look's per-frame cost is one radarHeld lookup: well under a microsecond", hits === n && ns < 1000, ns.toFixed(0) + " ns a call");
  cam.dist = dist0;
  setWx("clear");
}
