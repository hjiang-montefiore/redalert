/* tools/jsc/reload_check.js - HIMARS three times as fast, and the Ohio's real
   load (generations.js, the tail block; entities.js reloadAtYard; ai.js
   REARM), checked on the real game under JavaScriptCore, 3D off.

     python3 tools/jsc/run.py index.html --test tools/jsc/reload_check.js

   (owner) "increase the refill speed for the Ohio and HIMARS", and "why does
   Trident need to wait such a long time? I believe Ohio should have plenty
   of Trident". Checked:
     1. THE CENSUS. Every unit in the game - its weapons (every field of
        every round it carries), its magazine and its yardReload - read
        twice: from the data files as the page loaded them, and from the same
        files with generations.js's tail block cut out, in a second
        JavaScriptCore realm. Exactly five units differ, the three HIMARS rows
        and the two Ohios, each only by the figures the block names; no
        weapon row that existed before changed, and the only new rows are the
        five copies.
     2. Launch intervals, measured on the player's own launchers on fire
        missions and right-click orders: the five at their new figures, and
        the Iskander, the DF-15B and the 1990s M270 / ATACMS - which fire the
        rounds the HIMARS copies were cut from - at their old ones.
     3. The Ohio SSBN fires exactly twenty Tridents and says its tubes are
        empty; nothing comes back at sea, and the player's boat is not sent
        anywhere; alongside a naval yard the twenty come back at 3.5 / 3 s a
        round, where an Oscar II alongside the same yard still takes 3.5. The
        SSGN likewise: 77 launches, 154 Tomahawks, a pair back every 7 / 3 s.
     4. The commander's Ohio SSBN and SSGN, out with a wave, tubes empty:
        each leaves the wave, sails to its yard, is filled, and rejoins. The
        commander's Oscar II on guard goes home and back to its post. A
        commander at war hands its Ohio from the strike driver's last
        Trident to the yard and back on its own.
     5. Save and load of a part-empty magazine, the player's and the
        commander's.
     6. P.aiOff "rearm" switches it off, and so does AI.setPeace (the
        scripted sandbox the suites hold a commander in).
     7. (review) On korea, whose two seas never meet, a dry hull sails for
        the yard on its own water and not for a nearer one across the land.
   Every scene is a fresh Game.init on hormuz (korea for 7) with every unit of both sides
   taken off the board and the commander's bank emptied, so what moves is
   what the scene put down; the commander's scenes are fought at war,
   because REARM, like every driver that moves a hull, is off at peace. */
/* TT, not T: config.js owns the global T (the terrain table) */
var PASS = 0, FAIL = 0, TT = 32, DT = 1 / 30;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-seed", "rlcheck"); set("opt-fog", "1"); set("opt-3d", "0");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

/* the five rows the block retimes, and what it does to each */
var FIVE = {
  nato_e00_mlrs: { w: "w_e00_nato_mlrs", reload: 4.76, was: 14.28 },
  nato_e00_tel:  { w: "srbm_atacms",     reload: 20,   was: 60 },
  tel_n:         { w: "srbm_mod",        reload: 19.33, was: 58, name: "PrSM Increment 1" },
  ssbn_n:        { w: "slbm_n",          reload: 20,   was: 165, magazine: 20, yardReload: 3.5 / 3 },
  ssgn_n:        { w: "tlam_n",          reload: 6.67, was: 20, magazine: 77, yardReload: 7 / 3 },
};

/* ------------------------------------------------------------ the scene */
var H = null, E = null;
function scene(facH, facA, diff, fog, theatre) {
  Game.init({ theatre: theatre || "hormuz", seed: "rlcheck", cash: 0, diff: diff,
    era: "e20", eraAI: "e20", eraCapHuman: "e20", eraCapAI: "e20", fog: fog !== false,
    startPos: -1, weather: "clear", factionHuman: facH, factionAI: facA,
    techHuman: 3, techAI: 3, capHuman: 3, capAI: 3, armsHuman: "all", armsAI: "all",
    superweapons: false, resources: 1, mapSize: 144, aiHandicap: 1,
    roster: [{ faction: facH, ai: false, team: 1, label: "YOU" },
             { faction: facA, ai: true, team: 2, diff: diff, personality: "balanced", label: "ENEMY" }] });
  H = Game.players[0]; E = Game.players[1];
  Game.checkVictory = function () {};
  AI.setPeace(E, true);
  E.cash = 0;
  [H, E].forEach(function (p) {
    p.units.slice().forEach(function (u) {
      var i = Game.entities.indexOf(u); if (i >= 0) Game.entities.splice(i, 1);
      u.dead = true;
    });
    p.units.length = 0;
  });
  return !!AI.wavesOf(E);
}
function tick(sec, each) { var n = Math.round(sec / DT); for (var i = 0; i < n; i++) { if (each) each(); Game.tick(DT); } }
/* tick until f() is true or `sec` runs out; returns the seconds it took, or -1 */
function until(sec, f, each) {
  var t0 = Game.time;
  for (var i = 0; i < sec * 30; i++) { if (f()) return Game.time - t0; if (each) each(); Game.tick(DT); }
  return f() ? Game.time - t0 : -1;
}
/* the middle of a square of open water `r` tiles across each way, at least
   `far` tiles from both start positions, nearest the map's middle */
function seaArena(r, far) {
  var M = Game.map, best = null, bd = Infinity;
  for (var y = r + 2; y < M.H - r - 2; y += 2) for (var x = r + 2; x < M.W - r - 2; x += 2) {
    if (Math.hypot(x - H.homeX / TT, y - H.homeY / TT) < far || Math.hypot(x - E.homeX / TT, y - E.homeY / TT) < far) continue;
    var d = Math.hypot(x - M.W / 2, y - M.H / 2);
    if (d >= bd) continue;
    var ok = true;
    for (var j = -r; j <= r && ok; j++) for (var i = -r; i <= r; i++)
      if (!GameMap.passable(M, x + i, y + j, "sea") || Game.tileBlocked(x + i, y + j, null)) { ok = false; break; }
    if (ok) { best = { x: x, y: y }; bd = d; }
  }
  return best;
}
/* a structure of `p` on dry ground between rMin and rMax tiles of C; `wet`
   asks for water beside its footprint (a naval yard) */
function ashore(p, key, C, rMin, rMax, wet) {
  var M = Game.map, d = BUILDINGS[key], w = d.w, h = d.h;
  for (var R = rMin; R <= rMax; R++) for (var a = 0; a < 64; a++) {
    var x = (C.x + Math.cos(a / 64 * 6.283) * R) | 0, y = (C.y + Math.sin(a / 64 * 6.283) * R) | 0, land = true, sea = false;
    for (var j = 0; j < h; j++) for (var i = 0; i < w; i++)
      if (!GameMap.passable(M, x + i, y + j, "ground") || Game.tileBlocked(x + i, y + j, null)) land = false;
    if (!land) continue;
    for (var j2 = -1; j2 <= h; j2++) for (var i2 = -1; i2 <= w; i2++) if (GameMap.passable(M, x + i2, y + j2, "sea")) sea = true;
    if (wet && !sea) continue;
    var b = Game.placeBuilding(p, key, x, y, true);
    if (b) return b;
  }
  return null;
}
function put(p, id, tx, ty) {
  var u = Game.spawnUnitAt(p, id, tx * TT + 16, ty * TT + 16);
  if (u) { u.order = { type: "idle" }; u.orders = []; u.path = null; }
  return u;
}
/* a water tile within `r` tiles of a yard's footprint, for a boat put alongside */
function alongside(yard, r) {
  var M = Game.map;
  for (var R = 0; R <= r; R++)
    for (var j = -R; j < yard.def.h + R; j++) for (var i = -R; i < yard.def.w + R; i++) {
      var x = yard.tx + i, y = yard.ty + j;
      if (GameMap.passable(M, x, y, "sea") && !Game.tileBlocked(x, y, null)) return { x: x, y: y };
    }
  return null;
}
function moveTo(u, t) { u.x = t.x * TT + 16; u.y = t.y * TT + 16; u.path = null; u.order = { type: "idle" }; u.orders = []; }
function W() { return AI.wavesOf(E); }
function rearm() { return AI.intelOf(E).engage.rearm; }
function inList(l, u) { return l.indexOf(u) >= 0; }
function tiles(a, b) { return Math.round(U.dist(a.x, a.y, b.x, b.y) / TT * 10) / 10; }
function wIdx(u, base) { for (var i = 0; i < u.def.weapons.length; i++) if (u.def.weapons[i].split("__")[0] === base) return i; return -1; }
function magOf(u, i) { var cap = u.def.magazine[u.def.weapons[i]]; return u.mag && u.mag[i] !== undefined ? u.mag[i] : cap; }
function r2(v) { return Math.round(v * 100) / 100; }
function mean(a) { var s = 0; a.forEach(function (v) { s += v; }); return a.length ? s / a.length : NaN; }
/* every round leaving every rail, by shooter: { t, w } */
var shots = null;
function watchFire() {
  shots = new Map();
  var f0 = Combat.fire;
  Combat.fire = function (g, s, w, t) {
    if (s && shots) { var l = shots.get(s); if (!l) shots.set(s, l = []); l.push({ t: Game.time, w: w }); }
    return f0.apply(this, arguments);
  };
  return function () { Combat.fire = f0; };
}
/* when each launch began: a round more than the burst's own length after the
   previous launch's first round starts the next */
function launches(u, wi) {
  var w = WEAPONS[u.def.weapons[wi]], l = (shots.get(u) || []).filter(function (s) { return s.w === w; });
  var span = ((w.burst || 1) - 1) * (w.burstDelay || 0.1) + 0.3, out = [];
  l.forEach(function (s) { if (!out.length || s.t - out[out.length - 1] > span) out.push(s.t); });
  return { starts: out, rounds: l.length };
}
function gaps(a) { var g = []; for (var i = 1; i < a.length; i++) g.push(a[i] - a[i - 1]); return g; }
/* A rail reads its reload in whole ticks (1/30 s), and a float count of
   them can land one tick past: anything measured is held to within two
   ticks of the figure - against differences here of seconds. */
var TOL = 0.07;

function run() {
  census();
  intervals();
  commanderBoats();
  commanderAtWar();
  switchedOff();
  twoSeas();
}

/* ---- 1. the census ---- */
function fingerprint(UN, WP) {
  var out = {};
  var clean = function (o) {
    var c = {}; Object.keys(o).sort().forEach(function (k) { if (k !== "id") c[k] = o[k]; }); return JSON.stringify(c);
  };
  for (var k in UN) {
    var d = UN[k]; if (!d) continue;
    var rest = {};
    Object.keys(d).sort().forEach(function (f) { if (f !== "weapons" && f !== "magazine" && f !== "desc" && f !== "yardReload") rest[f] = d[f]; });
    var mag = {};
    (d.weapons || []).forEach(function (wk, i) { if (d.magazine && d.magazine[wk] !== undefined) mag[i] = d.magazine[wk]; });
    out[k] = { ws: (d.weapons || []).map(function (wk) { return WP[wk] ? clean(WP[wk]) : "MISSING " + wk; }),
               ids: (d.weapons || []).slice(), mag: JSON.stringify(mag), magKeys: Object.keys(d.magazine || {}).length,
               yard: d.yardReload, rest: JSON.stringify(rest), desc: d.desc };
  }
  return out;
}
function census() {
  log("\n[1] the census: every unit in the game, with and without the block");
  var src = readFile("js/generations.js");
  var a = src.indexOf("  /* ---- HIMARS three times as fast, and the Ohio's real load ----");
  var b = src.indexOf("\n  if (typeof console !== \"undefined\" && console.log)\n    console.log(\"[generations] early warning");
  chk("the block is found in generations.js, at the tail", a > 0 && b > a && src.indexOf("var RETIME", a) < b,
      "block at " + a + ".." + b + " of " + src.length);
  if (!(a > 0 && b > a)) return;
  /* Two fresh realms, the data files and nothing else in each - the page
     itself runs more after them (the rotor and ASW fits rewrite helicopter
     rows), so it is not the "before" of anything. g has the files as they
     are; g0 has generations.js without the block. */
  var errs = [];
  var realm = function (gen, tag) {
    var r = createGlobalObject();
    r.loadString("var window = this, self = this; var document = { getElementById: function(){ return null; }, " +
      "createElement: function(){ return { getContext: function(){ return null; }, style:{} }; }, addEventListener: function(){} }; " +
      "var localStorage = { getItem: function(){ return null; }, setItem: function(){} }; var performance = { now: function(){ return 0; } }; " +
      "var __warn = []; var console = { log: function(){}, warn: function(m){ __warn.push(String(m)); }, error: function(){} };");
    ["util", "config", "facts", "rules", "eras", "heavyair"].forEach(function (f) {
      try { r.load("js/" + f + ".js"); } catch (e) { errs.push(tag + " " + f + ": " + e); }
    });
    try { r.loadString(gen); } catch (e) { errs.push(tag + " generations: " + e); }
    return r;
  };
  var g = realm(src, "with"), g0 = realm(src.slice(0, a) + src.slice(b), "without");
  var miss = g.__warn.filter(function (m) { return /retime/.test(m); });
  chk("the data files load in two more realms, with the block and without it, and the block finds every round it retimes",
      !errs.length && !miss.length && g.__warn.length === g0.__warn.length, errs.concat(miss).join("; ") || "clean, " + g.__warn.length + " other warnings in each");
  if (errs.length) return;
  var before = fingerprint(g0.UNITS, g0.WEAPONS), after = fingerprint(g.UNITS, g.WEAPONS), live = fingerprint(UNITS, WEAPONS);
  var changed = [], why = {};
  var keys = Object.keys(after);
  Object.keys(before).forEach(function (k) { if (!after[k]) changed.push(k + " (gone)"); });
  keys.forEach(function (k) {
    var A = before[k], B = after[k];
    if (!A) { changed.push(k + " (new)"); return; }
    var d = [];
    if (A.ws.length !== B.ws.length) d.push("mounts " + A.ws.length + " -> " + B.ws.length);
    else for (var i = 0; i < A.ws.length; i++) if (A.ws[i] !== B.ws[i] || A.ids[i] !== B.ids[i]) d.push("mount " + i);
    if (A.mag !== B.mag) d.push("magazine " + A.mag + " -> " + B.mag);
    if (A.yard !== B.yard) d.push("yardReload " + A.yard + " -> " + B.yard);
    if (A.rest !== B.rest) d.push("other fields");
    if (A.desc !== B.desc) d.push("card");
    if (d.length) { changed.push(k); why[k] = d.join(", "); }
  });
  chk("of " + keys.length + " units, exactly the five changed: the three HIMARS rows and the two Ohios",
      changed.sort().join() === Object.keys(FIVE).sort().join(),
      changed.map(function (k) { return k + (why[k] ? " [" + why[k] + "]" : ""); }).join("; "));
  /* the page runs scripts after the data files; none of them may touch the five */
  var drift = Object.keys(FIVE).filter(function (k) {
    var A = after[k], L = live[k];
    return !L || A.ws.join("|") !== L.ws.join("|") || A.ids.join() !== L.ids.join() || A.mag !== L.mag || A.yard !== L.yard;
  });
  chk("...and the game itself fields the five exactly as the data files leave them", !drift.length, drift.join(", ") || "same");
  var cardS = UNITS.ssbn_n.desc, cardG = UNITS.ssgn_n.desc;
  chk("the Ohios' cards tell the truth: twenty of twenty-four tubes loaded, 154 Tomahawks, about twenty seconds apart, and home to a yard for more",
      /Twenty-four launch tubes, twenty of them loaded/.test(cardS) && /twenty seconds apart/.test(cardS) && /naval yard/.test(cardS) &&
      /154 Tomahawks/.test(cardG) && /pair every six or seven seconds/.test(cardG) && /naval yard/.test(cardG) && !/165/.test(cardS),
      cardS.slice(cardS.indexOf("Twenty-four"), cardS.indexOf("Twenty-four") + 80) + "... | " + cardG.slice(cardG.indexOf("a pair"), cardG.indexOf("a pair") + 70) + "...");
  /* each of the five: its copy is its round to the last field but for the block's own figures */
  var rows = [], bad = [];
  Object.keys(FIVE).forEach(function (k) {
    var f = FIVE[k], u = g.UNITS[k], u0 = g0.UNITS[k], i = u0.weapons.indexOf(f.w), cid = f.w + "__" + k;
    var c = g.WEAPONS[cid], s0 = g0.WEAPONS[f.w];
    if (i < 0 || u.weapons[i] !== cid || !c || !s0) { bad.push(k + ": no copy " + cid + " at mount " + i); return; }
    var diff = [];
    var all = {}; Object.keys(c).concat(Object.keys(s0)).forEach(function (p) { all[p] = 1; });
    Object.keys(all).forEach(function (p) {
      if (JSON.stringify(c[p]) !== JSON.stringify(s0[p])) diff.push(p);
    });
    var want = ["reload"].concat(f.name ? ["name"] : []);
    if (diff.sort().join() !== want.sort().join()) bad.push(k + " copy differs in " + diff.join("/"));
    if (c.reload !== f.reload || s0.reload !== f.was || (f.name && c.name !== f.name)) bad.push(k + " figures " + s0.reload + " -> " + c.reload + " " + c.name);
    if (c.tgt === g.WEAPONS[f.w].tgt) bad.push(k + " shares its tgt object");
    var others = u.weapons.filter(function (w, j) { return j !== i; }).join(), others0 = u0.weapons.filter(function (w, j) { return j !== i; }).join();
    if (others !== others0) bad.push(k + " other mounts " + others0 + " -> " + others);
    var magOK = f.magazine ? (u.magazine[cid] === f.magazine && Object.keys(u.magazine).length === 1 && !u0.magazine &&
                              Math.abs(u.yardReload - f.yardReload) < 1e-9)
                           : (u.magazine === u0.magazine && u.yardReload === undefined);
    if (!magOK) bad.push(k + " magazine " + JSON.stringify(u.magazine) + " yardReload " + u.yardReload);
    rows.push(k + " " + f.w + " " + s0.reload + " -> " + c.reload + " s" + (f.name ? " '" + s0.name + "' -> '" + c.name + "'" : "") +
              (f.magazine ? ", magazine " + f.magazine + ", " + r2(f.yardReload) + " s a count alongside" : ""));
  });
  chk("each of the five fires its own copy, cut as <round>__<unit>, identical to the round to the last field but for the reload (and the PrSM's name); the Ohios carry their magazines",
      !bad.length, bad.length ? bad.join("; ") : rows.join("; "));
  /* the weapon table itself: nothing that existed changed, and the new rows are the copies */
  var wNew = [], wChanged = [];
  var cl = function (o) { var c = {}; Object.keys(o).sort().forEach(function (k) { c[k] = o[k]; }); return JSON.stringify(c); };
  for (var wk in g.WEAPONS) {
    if (!g0.WEAPONS[wk]) { wNew.push(wk); continue; }
    if (cl(g.WEAPONS[wk]) !== cl(g0.WEAPONS[wk])) wChanged.push(wk);
  }
  var expect = Object.keys(FIVE).map(function (k) { return FIVE[k].w + "__" + k; }).sort().join();
  chk("no weapon row that existed before changed - srbm_mod, srbm_atacms, slbm_n, tlam_n and the MLRS pod among them - and the only new rows are the five copies",
      !wChanged.length && wNew.sort().join() === expect,
      (wChanged.length ? "changed: " + wChanged.slice(0, 8).join(", ") : "none changed") + "; new: " + wNew.join(", "));
  var sib = ["srbm_mod__tel_p", "srbm_mod__tel_c", "srbm_mod__tel_k", "srbm_mod__pact_e00_tel", "srbm_mod__pla_e00_tel"]
    .map(function (k) { return k + " " + (WEAPONS[k] ? WEAPONS[k].reload + " '" + WEAPONS[k].name + "'" : "missing"); });
  chk("the rounds cut from the same rows keep their figures: the Iskander's, the DF-16's, the Hwasong-11Ga's, the 2000s Iskander-M's and DF-15B's (58 s, 9K720 class), the M270's ATACMS (60), the Vanguard's D5 (165)",
      sib.every(function (s) { return / 58 '9K720 class'$/.test(s); }) && UNITS.nato_e90_tel.weapons[0] === "srbm_atacms" &&
      WEAPONS.srbm_atacms.reload === 60 && WEAPONS[UNITS.ssbn_b.weapons[0]].reload === 165,
      sib.join(", ") + "; nato_e90_tel " + UNITS.nato_e90_tel.weapons[0] + " " + WEAPONS[UNITS.nato_e90_tel.weapons[0]].reload +
      "; ssbn_b " + UNITS.ssbn_b.weapons[0] + " " + WEAPONS[UNITS.ssbn_b.weapons[0]].reload);
}

/* ---- 2 and 3: the player's launchers and boats, by the clock ---- */
function intervals() {
  log("\n[2] launch intervals, the five and the three that share their rounds");
  if (!scene("nato", "pact", "commander", false)) { chk("the scene is raised", false); return; }
  var alerts = [];
  var al0 = Game.alert;
  Game.alert = function (m) { alerts.push({ t: Game.time, m: String(m) }); return al0 ? al0.apply(this, arguments) : undefined; };
  var unwatch = watchFire();
  try { intervalsBody(alerts); } finally { unwatch(); Game.alert = al0; }
}
function intervalsBody(alerts) {
  /* the launchers stand in the player's base, in supply, on fire missions
     at a point 14 tiles out; the ready rack (`rounds`) is opened up, because
     the rail is what is measured here, not the supply chain */
  var hx = (H.homeX / TT) | 0, hy = (H.homeY / TT) | 0;
  var cx = Game.map.W / 2, cy = Game.map.H / 2, dd = Math.hypot(cx - hx, cy - hy) || 1;
  var aim = { x: (hx + (cx - hx) / dd * 14) * TT, y: (hy + (cy - hy) / dd * 14) * TT };
  var LAND = ["nato_e00_mlrs", "nato_e00_tel", "tel_n", "tel_p", "pla_e00_tel", "nato_e90_tel"];
  var land = LAND.map(function (id, k) {
    var u = put(H, id, hx + (k % 3) * 2 - 2, hy + ((k / 3) | 0) * 2 + 1);
    if (u) { u.roundsMax = u.rounds = 99; u.give({ type: "bombard", x: aim.x, y: aim.y, until: Game.time + 600 }); }
    return u;
  });
  /* the boats at sea, the station they shoot at ashore, a yard of the player's
     on the shore beside them (put up now, so it is there to be gone to) */
  /* A Tomahawk is never spent inside the reach of another mount aboard that
     can hit a structure (entities.js pickWeapon), so the station stands past
     the SSGN's Harpoon and inside the Tomahawk's and the Trident's reach. */
  var C = seaArena(6, 30);
  var reachT = function (id, base) {
    var d = UNITS[id], r = 0, other = 0;
    d.weapons.forEach(function (k) { var w = WEAPONS[k]; if (!w || !w.tgt || !w.tgt.ground) return;
      if (k.split("__")[0] === base) r = w.range; else if (!w.landAttack && !w.manual) other = Math.max(other, w.range); });
    return { r: r, other: other };
  };
  var rG = reachT("ssgn_n", "tlam_n"), rS = reachT("ssbn_n", "slbm_n");
  var rm = (FACTIONS[H.faction] || {}).rangeMul || 1;          // entities.js weaponRange
  var lo = Math.ceil(rG.other * rm + 1.5), hi = Math.floor(Math.min(rG.r, rS.r) * rm - 1.5);
  var pw = C ? ashore(E, "power", C, lo, hi, false) : null;
  var yard = C ? ashore(H, "navalyard", C, 10, 26, true) : null;
  var ss = C ? put(H, "ssbn_n", C.x - 1, C.y) : null, sg = C ? put(H, "ssgn_n", C.x + 1, C.y) : null;
  chk("the scene: six launchers in the base, two Ohios at sea, a station ashore and a yard of ours on the shore",
      land.every(Boolean) && !!pw && !!yard && !!ss && !!sg,
      (C ? "sea at " + C.x + "," + C.y : "no sea") + ", station wanted " + lo + "-" + hi + " tiles out" + (pw ? ", station " + tiles(pw, ss || { x: C.x * TT, y: C.y * TT }) + " tiles off" : ", no station") +
      (yard ? ", yard " + tiles(yard, ss || { x: C.x * TT, y: C.y * TT }) + " tiles off" : ", no yard"));
  if (!land.every(Boolean) || !pw || !yard || !ss || !sg) return;
  pw.maxHp = pw.hp = 1e9;
  [ss, sg].forEach(function (u) { u.stance = "hold"; u.give({ type: "attack", target: pw }); });
  var held = land.concat([ss, sg]);
  /* held at the rookie's rate of fire, so the reload is read as written:
     a station that soaks up 1e9 would otherwise make veterans of them */
  var vet0 = function () { held.forEach(function (u) { u.xp = 0; u.vet = 0; }); };
  var si = wIdx(ss, "slbm_n"), gi = wIdx(sg, "tlam_n");
  var dryAt = { ss: -1, sg: -1 };
  until(560, function () { return dryAt.ss >= 0 && dryAt.sg >= 0; }, function () {
    vet0();
    if (dryAt.ss < 0 && magOf(ss, si) === 0) dryAt.ss = Game.time;
    if (dryAt.sg < 0 && magOf(sg, gi) === 0) dryAt.sg = Game.time;
  });
  tick(8, vet0);
  var rows = [], ok = true;
  LAND.concat(["ssbn_n", "ssgn_n"]).forEach(function (id) {
    var u = id === "ssbn_n" ? ss : id === "ssgn_n" ? sg : land[LAND.indexOf(id)], wi = 0;
    if (id === "ssbn_n") wi = si; else if (id === "ssgn_n") wi = gi;
    var w = WEAPONS[u.def.weapons[wi]], L = launches(u, wi), gp = gaps(L.starts).slice(0, 8);
    var want = FIVE[id] ? FIVE[id].reload : w.reload, m = mean(gp);
    var good = gp.length >= 2 && Math.abs(m - want) < TOL && gp.every(function (x) { return Math.abs(x - want) < TOL; });
    if (!good) ok = false;
    rows.push(id + " " + r2(m) + " s (" + gp.length + " gaps; " + w.reload + ")");
  });
  var refs = ["tel_p", "pla_e00_tel", "nato_e90_tel"].map(function (id) { return WEAPONS[land[LAND.indexOf(id)].def.weapons[0]].reload; });
  chk("measured launch to launch: M142 4.76 s (was 14.28), HIMARS/ATACMS 20 (60), HIMARS/PrSM 19.33 (58), Ohio SSBN 20 (165), Ohio SSGN 6.67 (20) - and the Iskander, the DF-15B and the M270/ATACMS still 58, 58 and 60",
      ok && refs.join() === "58,58,60", rows.join(", "));

  log("\n[3] the Ohios' magazines: twenty Tridents, 154 Tomahawks, then home for more");
  var sL = launches(ss, si), gL = launches(sg, gi);
  var empty = function (name) { return alerts.filter(function (a) { return a.m.indexOf(name) === 0 && /MISSILE TUBES EMPTY/.test(a.m); }); };
  var eS = empty("OHIO SSBN"), eG = empty("OHIO SSGN");
  chk("the SSBN fires exactly twenty Tridents, twenty seconds apart, and says its tubes are empty with the last",
      sL.rounds === 20 && sL.starts.length === 20 && magOf(ss, si) === 0 && eS.length === 1 && Math.abs(eS[0].t - sL.starts[19]) < 0.1,
      sL.rounds + " away in " + sL.starts.length + " launches, " + magOf(ss, si) + " left; " +
      (eS.length ? "'" + eS[0].m + "' at " + r2(eS[0].t - sL.starts[19]) + " s from the last" : "no alert") + " (HEAD: one every 165 s for ever)");
  chk("the SSGN fires its 154 Tomahawks as 77 pairs, a pair every 6.67 s, and says so with the last",
      gL.rounds === 154 && gL.starts.length === 77 && magOf(sg, gi) === 0 && eG.length === 1 && Math.abs(eG[0].t - gL.starts[76]) < 0.1,
      gL.rounds + " away in " + gL.starts.length + " launches over " + r2(gL.starts[gL.starts.length - 1] - gL.starts[0]) + " s, " +
      magOf(sg, gi) + " left; " + (eG.length ? "'" + eG[0].m + "'" : "no alert"));
  /* at sea nothing comes back, and nothing sends the player's boats
     anywhere. The SSGN is still on the player's own order against the
     station, closing to put its Harpoon into it; the player stops both. */
  [ss, sg].forEach(function (u) { u.give({ type: "idle" }); });
  var p0 = [{ x: ss.x, y: ss.y }, { x: sg.x, y: sg.y }];
  tick(30, vet0);
  var moved = Math.max(tiles(ss, p0[0]), tiles(sg, p0[1]));
  chk("thirty seconds on at sea: still empty, and the player's boats have not been sent to the yard " + tiles(yard, ss) + " tiles off",
      magOf(ss, si) === 0 && magOf(sg, gi) === 0 && moved < 1 && !inList(W().rearming, ss) && !inList(W().rearming, sg) &&
      ss.order.type !== "move" && sg.order.type !== "move",
      "left " + magOf(ss, si) + " / " + magOf(sg, gi) + ", moved " + moved + " tiles, orders " + ss.order.type + " / " + sg.order.type);
  /* alongside: put them there, beside an Oscar II of ours whose Granit are gone */
  var at = alongside(yard, 2), os = at ? put(H, "ssgn_p", at.x, at.y) : null, oi = os ? wIdx(os, "ssm_granit") : -1;
  if (!at || !os || oi < 0) { chk("water beside the yard for three boats", false, at ? "no Oscar" : "none"); return; }
  os.mag = {}; os.mag[oi] = 0;
  [ss, sg, os].forEach(function (u) { moveTo(u, at); });
  tick(0.5);
  var near = [ss, sg, os].map(function (u) { return u.nearFootprint(yard, 4.5); });
  var gain = function (u, i) { var r = { t: [], last: magOf(u, i) }; return r; };
  var gS = gain(ss, si), gG = gain(sg, gi), gO = gain(os, oi);
  var t0 = Game.time, far = [0, 0, 0];
  var rec = function () {
    [[ss, si, gS], [sg, gi, gG], [os, oi, gO]].forEach(function (q, k) {
      var m = magOf(q[0], q[1]); if (m > q[2].last) { q[2].t.push(Game.time); q[2].last = m; }
      if (!q[0].nearFootprint(yard, 4.5)) far[k]++;
    });
  };
  until(200, function () { return magOf(sg, gi) >= 77 && magOf(ss, si) >= 20 && gO.t.length >= 6; }, rec);
  rec();
  var spread = function (g) { var gp = gaps(g.t); return gp.length ? r2(Math.min.apply(null, gp)) + "-" + r2(Math.max.apply(null, gp)) : "-"; };
  var full = function (g) { return g.t.length ? r2(g.t[g.t.length - 1] - t0) : -1; };
  var per = function (g) { return r2(mean(gaps(g.t))); };
  chk("alongside, the SSBN's twenty come back at 3.5 / 3 s a Trident - " + r2(20 * 3.5 / 3) + " s in all - and the Oscar II beside it still takes 3.5 s a Granit",
      near.every(Boolean) && magOf(ss, si) === 20 && gS.t.length === 20 && Math.abs(mean(gaps(gS.t)) - 3.5 / 3) < TOL &&
      Math.abs(mean(gaps(gO.t)) - 3.5) < TOL,
      "SSBN full after " + full(gS) + " s, " + per(gS) + " s a round (" + spread(gS) + "); Oscar " + per(gO) + " s a round (" + spread(gO) + ", " +
      gO.t.length + " back); ticks off the berth " + far.join("/"));
  chk("...and the SSGN's 154 Tomahawks at a pair every 7 / 3 s, three times a surface ship's rate - about three minutes",
      magOf(sg, gi) === 77 && gG.t.length === 77 && Math.abs(mean(gaps(gG.t)) - 7 / 3) < TOL,
      "full after " + full(gG) + " s, " + per(gG) + " s a pair (" + r2(per(gG) / 2) + " s a round; " + spread(gG) + ")");

  /* what the release panel says (ui.js, read-only here): it prints the
     magazine's own count, which for the SSGN is launches - pairs */
  if (typeof UI !== "undefined" && UI.selection && UI.frame) {
    var panel = function (u) {
      UI.selection.forEach(function (e) { e.selected = false; }); UI.selection.length = 0;
      u.selected = true; UI.selection.push(u); UI.frame(DT);
      var h = ((document.getElementById("selinfo") || {}).innerHTML || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
      u.selected = false; UI.selection.length = 0;
      return (h.match(/(MISSILES|TOMAHAWK) \d+\/\d+/) || ["(no magazine line)"])[0];
    };
    log("  info  the release panel, full: SSBN '" + panel(ss) + "', SSGN '" + panel(sg) + "'");
  }

  log("\n[5a] save and load of a part-empty magazine, the player's");
  ss.mag[si] = 7; sg.mag[gi] = 31;
  var res = SaveGame.save(Game, "ironfront.rlcheck");
  var ld = SaveGame.load("ironfront.rlcheck");
  localStorage.removeItem("ironfront.rlcheck");
  var P2 = Game.human, find = function (id) { return P2.units.filter(function (u) { return !u.dead && u.def.id === id; })[0]; };
  var ss2 = find("ssbn_n"), sg2 = find("ssgn_n");
  chk("saved with 7 Tridents and 31 pairs aboard, both come back with exactly that, out of 20 and 77",
      res.ok && ld.ok && !!ss2 && !!sg2 && magOf(ss2, si) === 7 && magOf(sg2, gi) === 31 &&
      ss2.def.magazine[ss2.def.weapons[si]] === 20 && sg2.def.magazine[sg2.def.weapons[gi]] === 77,
      (res.ok ? "" : res.error + " ") + (ld.ok ? "" : ld.error + " ") +
      (ss2 ? "SSBN " + magOf(ss2, si) + "/" + ss2.def.magazine[ss2.def.weapons[si]] : "no SSBN") + ", " +
      (sg2 ? "SSGN " + magOf(sg2, gi) + "/" + sg2.def.magazine[sg2.def.weapons[gi]] : "no SSGN"));
}

/* ---- 4: the commander's boats ---- */
function commanderBoats() {
  log("\n[4a] the commander's Ohios, out with a wave, tubes empty: home, filled, and back");
  if (!scene("pact", "nato", "commander")) { chk("the scene is raised", false); return; }
  var C = seaArena(6, 30);
  var yard = C ? ashore(E, "navalyard", C, 14, 30, true) : null;
  chk("open water, and a yard of the commander's on the shore " + (yard ? tiles(yard, { x: C.x * TT, y: C.y * TT }) + " tiles off" : ""), !!C && !!yard);
  if (!C || !yard) return;
  var ss = put(E, "ssbn_n", C.x - 2, C.y), sg = put(E, "ssgn_n", C.x + 2, C.y), dd = put(E, AI.pickOf(E, "destroyer") || "destroyer_n", C.x, C.y + 2);
  AI.setPeace(E, false);
  var si = wIdx(ss, "slbm_n"), gi = wIdx(sg, "tlam_n");
  [ss, sg, dd].forEach(function (u) { W().naval.push(u); u.give({ type: "attackmove", x: (C.x + 3) * TT, y: C.y * TT }); });
  ss.mag = {}; ss.mag[si] = 0; sg.mag = {}; sg.mag[gi] = 0;
  var left = until(4, function () { return inList(W().rearming, ss) && inList(W().rearming, sg); });
  chk("both leave the wave for the yard on the next pass; the destroyer, with nothing counted, stays",
      left >= 0 && !inList(W().naval, ss) && !inList(W().naval, sg) && inList(W().naval, dd) &&
      ss.order.type === "move" && sg.order.type === "move" && rearm().out === 2,
      "after " + r2(left) + " s; orders " + ss.order.type + " / " + sg.order.type + ", out " + rearm().out);
  var minS = 1e9, minG = 1e9, inS = -1, fullS = -1, t0 = Game.time, joined = {};
  var back = until(260, function () { return inList(W().naval, ss) && inList(W().naval, sg); }, function () {
    minS = Math.min(minS, tiles(ss, yard)); minG = Math.min(minG, tiles(sg, yard));
    if (inS < 0 && ss.nearFootprint(yard, 4.5)) inS = Game.time - t0;
    if (fullS < 0 && magOf(ss, si) >= 20) fullS = Game.time - t0;
    [ss, sg].forEach(function (u) { if (!joined[u.id] && inList(W().naval, u)) joined[u.id] = u.order.type + "@" + magOf(u, u === ss ? si : gi); });
  });
  [ss, sg].forEach(function (u) { if (!joined[u.id] && inList(W().naval, u)) joined[u.id] = u.order.type + "@" + magOf(u, u === ss ? si : gi); });
  chk("each sails alongside, is filled - twenty Tridents, 77 pairs of Tomahawks - and rejoins its wave on an advance",
      back >= 0 && joined[ss.id] === "attackmove@20" && joined[sg.id] === "attackmove@77" &&
      rearm().alongside === 2 && rearm().full === 2 && rearm().back === 2 && rearm().now === 0,
      "alongside after " + r2(inS) + " s (closest " + minS + " / " + minG + " tiles from the yard's middle), SSBN full at " + r2(fullS) +
      " s, both back after " + r2(back) + " s, rejoined on " + joined[ss.id] + " / " + joined[sg.id] + "; " + JSON.stringify(rearm()));
  var aiStats = E.aiStats || {};
  chk("...and the trips are on the commander's books for the scorecard", (aiStats.rearmTrips || 0) === 2 && (aiStats.rearmFull || 0) === 2,
      JSON.stringify({ rearmTrips: aiStats.rearmTrips, rearmFull: aiStats.rearmFull }));

  log("\n[4b] the commander's Oscar II on guard: home, filled, and back to its post");
  if (!scene("nato", "pact", "commander")) { chk("the scene is raised", false); return; }
  C = seaArena(6, 30);
  yard = C ? ashore(E, "navalyard", C, 14, 30, true) : null;
  if (!C || !yard) { chk("open water and a yard", false); return; }
  var os = put(E, "ssgn_p", C.x, C.y), oi = wIdx(os, "ssm_granit");
  AI.setPeace(E, false);
  /* and the player's own empty Ohio beside it, which nobody but the player sends anywhere */
  var mine = put(H, "ssbn_n", C.x + 3, C.y), mi = wIdx(mine, "slbm_n");
  mine.stance = "hold";             // or it puts a Mk 48 into the Oscar beside it
  var yardH = ashore(H, "navalyard", C, 10, 30, true);
  os.give({ type: "guard", x: os.x, y: os.y }); os.guardX = os.x; os.guardY = os.y;
  var post = { x: os.x, y: os.y }, p1 = { x: mine.x, y: mine.y };
  os.mag = {}; os.mag[oi] = 0; mine.mag = {}; mine.mag[mi] = 0;
  var go = until(4, function () { return inList(W().rearming, os); });
  var min = 1e9, fullO = -1, t1 = Game.time;
  /* "at its post" is the guard order's own leash: a guard drifts back only
     from more than three tiles out (entities.js), and the road off a
     crowded berth can be dropped short by the engine's stall rule */
  var home = until(200, function () { return !inList(W().rearming, os) && os.order.type === "guard" && tiles(os, post) <= 3.05; }, function () {
    min = Math.min(min, tiles(os, yard)); if (fullO < 0 && magOf(os, oi) >= 24) fullO = Game.time - t1;
  });
  chk("its twenty-four Granit gone, the Oscar sails to the yard, takes them back at 3.5 s each, and is on guard at its post again",
      go >= 0 && home >= 0 && magOf(os, oi) === 24 && os.order.type === "guard" && tiles({ x: os.guardX, y: os.guardY }, post) < 0.5 &&
      rearm().post === 1 && fullO > 24 * 3.5 - 1,
      "went after " + r2(go) + " s, closest " + min + " tiles from the yard's middle, full at " + r2(fullO) + " s, back on guard after " +
      r2(home) + " s, " + tiles(os, post) + " tiles from its post; " + JSON.stringify(rearm()));
  chk("the player's empty Ohio beside it, with a yard of the player's " + (yardH ? tiles(yardH, mine) : "?") + " tiles off, has not moved and is still empty",
      !!yardH && tiles(mine, p1) < 1 && magOf(mine, mi) === 0 && mine.order.type !== "move" && !inList(W().rearming, mine),
      "moved " + tiles(mine, p1) + " tiles, " + magOf(mine, mi) + " aboard, order " + mine.order.type);

  /* the sandbox: held at peace, the commander leaves an empty boat where it is */
  AI.setPeace(E, true);
  var calm = put(E, "ssbn_n", C.x - 3, C.y), ci = wIdx(calm, "slbm_n"), cp = { x: calm.x, y: calm.y };
  calm.mag = {}; calm.mag[ci] = 0;
  tick(6);
  chk("held at peace (AI.setPeace, the suites' sandbox), the commander sends no empty boat anywhere",
      !inList(W().rearming, calm) && tiles(calm, cp) < 1 && calm.order.type === "idle",
      "order " + calm.order.type + ", moved " + tiles(calm, cp) + " tiles");
  calm.dead = true; Game.sweepDead && Game.sweepDead();

  log("\n[5b] save and load, the commander's boat part-filled alongside");
  var at = alongside(yard, 2);
  var sg = put(E, "ssgn_n", at.x, at.y), gi = wIdx(sg, "tlam_n");
  sg.mag = {}; sg.mag[gi] = 0;
  until(30, function () { return magOf(sg, gi) >= 5; });
  var had = magOf(sg, gi);
  var res = SaveGame.save(Game, "ironfront.rlcheck2"), ld = SaveGame.load("ironfront.rlcheck2");
  localStorage.removeItem("ironfront.rlcheck2");
  E = Game.players[1]; H = Game.players[0];
  AI.setPeace(E, true); Game.checkVictory = function () {};
  var sg2 = E.units.filter(function (u) { return !u.dead && u.def.id === "ssgn_n"; })[0];
  var after = sg2 ? magOf(sg2, gi) : -1;
  var y2 = Game.nearestBuilding(E, "navalyard", sg2 ? sg2.x : 0, sg2 ? sg2.y : 0);
  var st5 = sg2 ? "order " + sg2.order.type + ", yard " + (y2 ? "alongside " + sg2.nearFootprint(y2, 4.5) + " prog " + y2.buildProgress : "none") +
                  ", mag " + JSON.stringify(sg2.mag) : "";
  var done = sg2 ? until(200, function () { return magOf(sg2, gi) >= 77; }) : -1;
  chk("saved part-filled, it comes back with what it had and is filled the rest of the way alongside",
      res.ok && ld.ok && !!sg2 && after === had && done >= 0 && magOf(sg2, gi) === 77,
      "saved with " + had + ", loaded with " + after + " (" + st5 + "), full " + r2(done) + " s later" + (sg2 ? ", now " + magOf(sg2, gi) + ", order " + sg2.order.type : ""));
}

/* ---- 4c: at war, the strike driver's last Trident hands the boat to REARM ---- */
function commanderAtWar() {
  log("\n[4c] a commander at war: the Ohio's last Trident goes at a station, and the boat goes home for twenty more");
  if (!scene("pact", "nato", "commander")) { chk("the scene is raised", false); return; }
  var C = seaArena(6, 30);
  var yard = C ? ashore(E, "navalyard", C, 14, 30, true) : null;
  var st = C ? ashore(H, "power", C, 10, 16, false) : null;
  if (!C || !yard || !st) { chk("water, a yard of the commander's and a station of ours within a Trident's reach", false); return; }
  st.maxHp = st.hp = 1e9;
  var ss = put(E, "ssbn_n", C.x, C.y), si = wIdx(ss, "slbm_n");
  ss.give({ type: "guard", x: ss.x, y: ss.y }); ss.guardX = ss.x; ss.guardY = ss.y;
  var post = { x: ss.x, y: ss.y };
  ss.mag = {}; ss.mag[si] = 1;
  /* a scout of the commander's beside the station, so its side has looked at it */
  var eye = put(E, AI.pickOf(E, "recon") || "recon_n", st.tx + 3, st.ty + 1);
  if (eye) eye.give({ type: "guard" });
  AI.setPeace(E, false);
  var unwatch = watchFire(), fired = -1, went = -1, full = -1, t0 = Game.time;
  try {
    var back = until(150, function () { return full >= 0 && !inList(W().rearming, ss) && tiles(ss, post) < 2.5 && ss.order.type !== "move"; }, function () {
      ss.xp = 0; ss.vet = 0;
      if (fired < 0 && launches(ss, si).rounds) fired = Game.time - t0;
      if (went < 0 && inList(W().rearming, ss)) went = Game.time - t0;
      if (full < 0 && magOf(ss, si) >= 20) full = Game.time - t0;
    });
  } finally { unwatch(); AI.setPeace(E, true); }
  chk("the strike driver puts its last Trident into the station, REARM takes the dry boat to the yard, and it is back at its post with twenty (the strike's end left it idle, not on guard)",
      fired >= 0 && went > fired && full > went && back >= 0 && magOf(ss, si) === 20 && (ss.order.type === "idle" || ss.order.type === "guard"),
      "fired at " + r2(fired) + " s, sent home at " + r2(went) + " s, full at " + r2(full) + " s, back at its post at " + r2(back) + " s, order " +
      ss.order.type + "; " + JSON.stringify(rearm()));
}

/* ---- 6: A/B ---- */
function switchedOff() {
  log("\n[6] P.aiOff \"rearm\" switches it off");
  if (!scene("pact", "nato", "commander")) { chk("the scene is raised", false); return; }
  var C = seaArena(6, 30);
  var yard = C ? ashore(E, "navalyard", C, 14, 30, true) : null;
  if (!C || !yard) { chk("open water and a yard", false); return; }
  E.aiOff = new Set(["rearm"]);
  AI.setPeace(E, false);
  var ss = put(E, "ssbn_n", C.x, C.y), si = wIdx(ss, "slbm_n");
  W().naval.push(ss); ss.give({ type: "attackmove", x: (C.x + 3) * TT, y: C.y * TT });
  ss.mag = {}; ss.mag[si] = 0;
  tick(8);
  chk("an empty Ohio stays with its wave", inList(W().naval, ss) && !inList(W().rearming, ss) && rearm().out === 0,
      "order " + ss.order.type + ", " + JSON.stringify(rearm()));
  E.aiOff = null;
}

/* ---- 7: two waters (review) ----
   REARM sailed for the nearest yard as the crow flies. Found in review, on
   korea with a commander's yard on each sea: a dry corvette 36 tiles across
   land from the one and 45 by sea from the other sailed for the first, was
   let go when its road ran out, and went again every 130 s - four trips in
   400 s and no round gained. ai.js rlYard asks the sea labels. */
function twoSeas() {
  log("\n[7] korea: two seas that never meet, a yard on each");
  if (!scene("nato", "pact", "commander", true, "korea")) { chk("the scene is raised", false); return; }
  var M = Game.map, lab = Path.components(M, "sea"), size = {};
  for (var i = 0; i < lab.length; i++) if (lab[i]) size[lab[i]] = (size[lab[i]] || 0) + 1;
  var big = Object.keys(size).filter(function (k) { return size[k] > 1000; }).map(Number);
  /* every footprint a yard could stand on, by the sea beside it */
  var bd = BUILDINGS.navalyard, spots = [];
  for (var y = 1; y < M.H - bd.h - 1; y++) for (var x = 1; x < M.W - bd.w - 1; x++) {
    var land = true, seaL = 0;
    for (var j = 0; j < bd.h && land; j++) for (var k = 0; k < bd.w; k++)
      if (!GameMap.passable(M, x + k, y + j, "ground") || Game.tileBlocked(x + k, y + j, null)) { land = false; break; }
    if (!land) continue;
    for (var j2 = -1; j2 <= bd.h; j2++) for (var k2 = -1; k2 <= bd.w; k2++) {
      var l = lab[(y + j2) * M.W + x + k2]; if (l && big.indexOf(l) >= 0) seaL = l;
    }
    if (seaL) spots.push({ x: x, y: y, l: seaL });
  }
  /* open water whose nearest footprint on the other sea is under 40 tiles
     off, and a footprint on its own sea 8 to 30 tiles further than that */
  var pick = null;
  for (var ty = 2; ty < M.H - 2 && !pick; ty += 3) for (var tx = 2; tx < M.W - 2; tx += 3) {
    var la = lab[ty * M.W + tx]; if (!la || big.indexOf(la) < 0 || Game.tileBlocked(tx, ty, null)) continue;
    var nB = null, dB = 1e9, nA = null, dA = 0;
    spots.forEach(function (s) { if (s.l === la) return; var d = Math.hypot(s.x + 1 - tx, s.y + 1 - ty); if (d < dB) { dB = d; nB = s; } });
    if (!nB || dB > 40) continue;
    spots.forEach(function (s) { if (s.l !== la || nA) return; var d = Math.hypot(s.x + 1 - tx, s.y + 1 - ty); if (d > dB + 8 && d < dB + 30) { nA = s; dA = d; } });
    if (nA) { pick = { tx: tx, ty: ty, A: nA, B: nB, dA: dA, dB: dB }; break; }
  }
  var yA = pick ? Game.placeBuilding(E, "navalyard", pick.A.x, pick.A.y, true) : null;
  var yB = pick ? Game.placeBuilding(E, "navalyard", pick.B.x, pick.B.y, true) : null;
  var u = pick ? put(E, "corvette_p", pick.tx, pick.ty) : null, ui = u ? wIdx(u, "ssm_oniks") : -1;
  chk("two seas, open water on one, a yard of the commander's on each - the other sea's the nearer as the crow flies",
      big.length === 2 && !!yA && !!yB && !!u && ui >= 0 &&
      Game.nearestBuilding(E, "navalyard", u.x, u.y) === yB,
      "seas " + big.map(function (k) { return size[k]; }).join(" / ") + (pick ? ", hull at " + pick.tx + "," + pick.ty + ", own sea's yard " +
      Math.round(pick.dA) + " tiles, the other's " + Math.round(pick.dB) : ", no such water"));
  if (!yA || !yB || !u || ui < 0) return;
  u.give({ type: "guard", x: u.x, y: u.y }); u.guardX = u.x; u.guardY = u.y;
  u.mag = {}; u.mag[ui] = 0;
  AI.setPeace(E, false);
  var minA = 1e9, minB = 1e9;
  var t = until(150, function () { return magOf(u, ui) >= u.def.magazine[u.def.weapons[ui]]; }, function () {
    minA = Math.min(minA, tiles(u, yA)); minB = Math.min(minB, tiles(u, yB));
  });
  AI.setPeace(E, true);
  chk("the dry corvette sails for the yard on its own sea, and is full alongside it",
      t >= 0 && minA < 6 && rearm().out === 1 && rearm().giveUp === 0,
      "full after " + r2(t) + " s, closest " + minA + " tiles from its own sea's yard and " + minB + " from the other's; " + JSON.stringify(rearm()) +
      " (before review: four trips to the other in 400 s, none filled)");
}
