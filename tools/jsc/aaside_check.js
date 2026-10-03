/* tools/jsc/aaside_check.js - an AA Battery fires the guns of the army and the
   period that dug it, checked on the REAL game under JavaScriptCore.

     python3 tools/jsc/scene3d.py tools/jsc/aaside_check.js

   (owner, 2026-10-03) "why russian aa batteries are the same as US. the us aa
   batteries should be better than russia". rules.js BUILDING_SIDE gives the
   AA Battery ("flak") its own guns for the United States and the Soviet
   Union / Russia in each period, keyed exactly as render3d draws the site:
   90 mm M2 / KS-19 in the 1950s, M167 Vulcan / S-60 in the 1960s, M167 /
   ZU-23-2 in the 1980s and 1990s, C-RAM / ZU-23-2 since. Checked here:
     - a battery dug by each army in each period carries that system's weapon
       and its description, and nothing else about the AA Battery changes;
     - the guns it fires are the ones it is drawn with (Render3D.bldKey);
     - another army keeps the shared twin 40 mm;
     - the US battery out-damages the Soviet one of the same period, on the
       tables and in a live duel against the same hovering helicopter;
     - the C-RAM carries the warship's close-in figure, and a pilot plans
       round each battery's own reach;
     - the build card and the field manual show the army's own battery;
     - a saved and reloaded battery comes back with the guns it was dug with,
       even when its army has re-equipped since or an engineer has taken it;
     - and it is DRAWN as the army and the period that dug it (render3d.js
       bldFrom): its army's re-equipping does not turn an M167 battery into
       a C-RAM, nor a capture a Soviet S-60 battery or SAM site into its
       captor's - which flies its own colours on it - and a battery dug after
       the re-equip is the new period's. */
var TT = 32, PASS = 0, FAIL = 0, DT = 1 / 30, H = null;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
/* the renderer's records (as tools/jsc/bldside_check.js reaches them) */
(function () {
  if (typeof Impact3D === "undefined") return;
  var ii = Impact3D.init;
  Impact3D.init = function (T3, th, G, h) { H = h; return ii.apply(this, arguments); };
})();
/* every emplacement model, the armies' sites and the shared ones, says which
   it is on the model it builds - before any is built - so a check can read
   off a placed structure which site the renderer actually drew */
(function () {
  if (typeof BLD_MODELS === "undefined") return;
  Object.keys(BLD_MODELS).forEach(function (k) {
    if (!/^(flak|sam|arty|coastal)(_[a-z]+_e\d\d)?$/.test(k) || !BLD_MODELS[k] || !BLD_MODELS[k].build) return;
    var b0 = BLD_MODELS[k].build;
    BLD_MODELS[k].build = function () { var g = b0.apply(this, arguments); if (g && g.userData) g.userData.bk = k; return g; };
  });
})();
function frames(n) { for (var i = 0; i < n; i++) { Game.tick(DT); Render.draw(DT, UI.input); } }
/* what the renderer has standing for a structure: the site it was built
   from, and the colours of its team-marked parts */
function seen(b) {
  var r = H && H.recOf(b.id), out = { bk: null, team: [], n: 0 };
  if (!r) return out;
  r.grp.traverse(function (o) {
    if (o.userData && o.userData.bk && !out.bk) out.bk = o.userData.bk;
    if (!o.isMesh) return;
    out.n++;
    (Array.isArray(o.material) ? o.material : [o.material]).forEach(function (m) {
      if (m && m.userData && m.userData.team && m.color) { var hx = m.color.getHex(); if (out.team.indexOf(hx) < 0) out.team.push(hx); }
    });
  });
  return out;
}
function lin(main) { return new THREE.Color(main).convertSRGBToLinear().getHex(); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-cash", "200000"); set("opt-seed", "aaside"); set("opt-fog", "0"); set("opt-3d", "1");
  CFG.GFX_LEVEL = "high";
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

/* what each army's battery of each period must fire, and a word its card says */
var WANT = {
  nato: { e50: ["aa_m2_90", /90mm M2/], e60: ["aa_m167", /M167 VADS/], e80: ["aa_m167", /M167 VADS/],
          e90: ["aa_m167", /M167 VADS/], e00: ["aa_lpws", /^C-RAM: radar-directed 20mm Land Phalanx/],
          e20: ["aa_lpws", /^C-RAM: radar-directed 20mm Land Phalanx/] },
  pact: { e50: ["aa_ks19", /KS-19 100mm/], e60: ["aa_s60", /S-60 57mm/], e80: ["aa_zu23", /ZU-23-2/],
          e90: ["aa_zu23", /ZU-23-2/], e00: ["aa_zu23", /ZU-23-2/], e20: ["aa_zu23", /ZU-23-2/] },
};
var SAME = ["id", "name", "cat", "cost", "time", "w", "h", "hp", "armor", "needPower", "power", "sight",
            "tech", "turret", "radar", "radarQ", "from"];

/* a free patch of open ground r0..r1 tiles from this commander's home, clear
   of the other side's base, big enough for a w x h structure with room round it */
function site(P, r0, r1, w, h, avoid) {
  var M = Game.map, hx = (P.homeX / TT) | 0, hy = (P.homeY / TT) | 0;
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
function drop(b) {
  if (!b) return;
  Game.removeBuilding(b);
  var i = Game.entities.indexOf(b); if (i >= 0) Game.entities.splice(i, 1);
  i = b.owner.buildings.indexOf(b); if (i >= 0) b.owner.buildings.splice(i, 1);
}
function as(P, fac, era) {
  var c = CFG.FACTION_COLORS[fac];
  P.faction = fac; P.era = era;
  P.color = { main: c.main, dark: c.dark, light: c.light, fac: fac };
}
/* expected damage a second, as pickWeapon scores it, and in play with the army's accuracy */
function eds(def, fac) {
  var w = WEAPONS[def.weapons[0]], a = w.acc * ((FACTIONS[fac] || {}).accMul || 1);
  return w.dmg * (w.burst || 1) * Math.min(0.98, a) / Math.max(0.4, w.reload);
}

function run() {
  var P = Game.human, E = Game.players[1];
  AI.setPeace(E, true); Game.checkVictory = function () {};
  var fac0 = P.faction, col0 = P.color, era0 = P.era, eera0 = E.era;
  chk("the match is the United States against the Soviet Union", fac0 === "nato" && E.faction === "pact",
      fac0 + " v " + E.faction);
  var S = site(P, 14, 40, 2, 2, E);
  chk("there is open ground to dig on", !!S, S ? S.x + "," + S.y : "none");
  if (!S) return;

  /* ---- 1. every army's battery of every period ---- */
  var got = {}, bad = [], drift = [], drawn = [];
  ["nato", "pact"].forEach(function (fac) {
    ERAS.forEach(function (era) {
      as(P, fac, era);
      var b = Game.placeBuilding(P, "flak", S.x, S.y, true), d = b.def, want = WANT[fac][era];
      got[fac + "_" + era] = d;
      if (d.weapons.length !== 1 || d.weapons[0] !== want[0] || !want[1].test(d.desc) ||
          d.desc !== BUILDING_SIDE["flak_" + fac + "_" + era].desc)
        bad.push(fac + " " + era + ": " + d.weapons + " / " + d.desc.slice(0, 40));
      SAME.forEach(function (k) {
        if (JSON.stringify(d[k]) !== JSON.stringify(BUILDINGS.flak[k])) drift.push(fac + " " + era + " " + k);
      });
      if (JSON.stringify(d.prereq) !== JSON.stringify(BUILDINGS.flak.prereq) || b.maxHp !== BUILDINGS.flak.hp * ((FACTIONS[fac] || {}).structHpMul || 1))
        drift.push(fac + " " + era + " prereq/hp");
      var mk = Render3D.bldKeyOf ? Render3D.bldKeyOf(b) : "?";
      if (b.sideKey !== mk || mk !== "flak_" + fac + "_" + era) drawn.push(fac + " " + era + ": fires " + b.sideKey + ", drawn " + mk);
      drop(b);
    });
  });
  chk("each US and Soviet battery carries its own system's gun and description, in all six periods",
      !bad.length, bad.length ? bad.join("; ") : "90mm M2/KS-19, M167/S-60, M167/ZU-23-2 x2, C-RAM/ZU-23-2 x2");
  chk("...and nothing else about the AA Battery changes (id flak, cost, hp, power, sight, prerequisites, radar)",
      !drift.length, drift.join("; "));
  chk("it fires the guns it is drawn with: its key is the model's (render3d bldKeyOf)", !drawn.length, drawn.join("; "));
  chk("every battery of one army and period shares one def, not a copy each",
      (function () { as(P, "pact", "e60"); var a = Game.placeBuilding(P, "flak", S.x, S.y, true), d = a.def; drop(a);
        return d === got.pact_e60 && d !== BUILDINGS.flak && bldIsDef(d); })(), "");

  /* ---- 2. every other army keeps the twin 40 mm ---- */
  var others = [];
  [["gbr", "e60"], ["pla", "e00"], ["deu", "e80"], ["kpa", "e50"]].forEach(function (fe) {
    as(P, fe[0], fe[1]);
    var b = Game.placeBuilding(P, "flak", S.x, S.y, true);
    if (b.def !== BUILDINGS.flak || b.def.weapons[0] !== "aa_battery" || b.sideKey !== "flak") others.push(fe.join(" ") + ": " + b.def.weapons);
    drop(b);
  });
  chk("Britain, China, Germany and North Korea keep the shared def and its twin 40 mm", !others.length, others.join("; "));
  as(P, "nato", "e20");
  var sam = Game.placeBuilding(P, "sam", S.x, S.y, true);
  chk("and so does every other structure, the US SAM Site included", sam.def === BUILDINGS.sam, "");
  drop(sam);

  /* ---- 3. the tables: the US battery is the better one in every period ---- */
  var tab = [], low = [];
  ERAS.forEach(function (era) {
    var u = got["nato_" + era], r = got["pact_" + era];
    var tu = eds(u), tr = eds(r), pu = eds(u, "nato"), pr = eds(r, "pact");
    tab.push(era + " " + tu.toFixed(0) + "/" + tr.toFixed(0) + " (play " + pu.toFixed(0) + "/" + pr.toFixed(0) + ")");
    if (!(tu > tr * 1.3) || !(pu > pr * 1.3) || Math.abs((tu + tr) / 2 / eds(BUILDINGS.flak) - 1) > 0.05) low.push(era);
  });
  chk("on the tables the US battery puts 1.3 times the Soviet one's damage a second into an aircraft, and the pair averages the old battery's",
      !low.length, tab.join("; ") + (low.length ? " -- short: " + low.join(",") : "") + "; old " + eds(BUILDINGS.flak).toFixed(1));
  var reach = function (k) { return WEAPONS[got[k].weapons[0]].range; };
  chk("each Soviet gun keeps the longer reach it really had: KS-19 > 90mm, S-60 > M167, ZU-23-2 > M167 and >= C-RAM",
      reach("pact_e50") > reach("nato_e50") && reach("pact_e60") > reach("nato_e60") &&
      reach("pact_e80") > reach("nato_e80") && reach("pact_e00") >= reach("nato_e00") &&
      reach("pact_e60") > reach("nato_e60") * FACTIONS.nato.rangeMul,
      ["e50", "e60", "e80", "e00"].map(function (e) { return e + " " + reach("nato_" + e) + "/" + reach("pact_" + e); }).join(", ") +
      "; the S-60's survives the US optics (" + (reach("nato_e60") * FACTIONS.nato.rangeMul).toFixed(2) + ")");

  /* ---- 4. a live duel against the same hovering helicopter ---- */
  var G2 = site(P, 18, 50, 7, 2, E);
  if (!G2) { chk("there is room for the duel", false, "no ground"); return; }
  var plants = [Game.placeBuilding(P, "power", G2.x + 3, G2.y, true), Game.placeBuilding(P, "power", G2.x + 5, G2.y, true)];
  /* nothing of ours but the battery takes part */
  P.units.forEach(function (u) { if (!u.dead) { u.stance = "hold"; u.order = { type: "idle" }; } });
  var hx = (G2.x + 1) * TT, hy = (G2.y + 1 - 6) * TT;
  function duel(fac, era, secs) {
    as(P, fac, era);
    var b = Game.placeBuilding(P, "flak", G2.x, G2.y, true);
    var h = Game.spawnUnitAt(E, "trans_p", hx, hy), hp0 = 1e7;
    h.maxHp = hp0; h.hp = hp0;
    for (var k = 0; k < secs / DT; k++) {
      h.x = hx; h.y = hy; h.parked = false; h.order = { type: "hover" }; if (h.fuelMax) h.fuel = h.fuelMax;
      Game.tick(DT);
      if (h.dead) break;
    }
    var out = { dmg: hp0 - h.hp, dead: h.dead, powered: b.powered, w: b.def.weapons[0] };
    h.dead = true; var i = E.units.indexOf(h); if (i >= 0) E.units.splice(i, 1);
    i = Game.entities.indexOf(h); if (i >= 0) Game.entities.splice(i, 1);
    drop(b);
    for (var q = 0; q < 30; q++) Game.tick(DT);              // let the last rounds land
    return out;
  }
  var duels = [], weak = [], SECS = 45;
  ["e50", "e60", "e80", "e00"].forEach(function (era) {
    var u = duel("nato", era, SECS), r = duel("pact", era, SECS);
    duels.push(era + " " + u.w + " " + Math.round(u.dmg / SECS) + "/s v " + r.w + " " + Math.round(r.dmg / SECS) + "/s");
    if (!u.powered || !r.powered || u.dead || r.dead || !(u.dmg > r.dmg * 1.15) || !(r.dmg > 0)) weak.push(era);
  });
  chk("in a live duel against the same hovering helicopter at six tiles the US battery does clearly more damage, every period",
      !weak.length, duels.join("; ") + (weak.length ? " -- short: " + weak.join(",") : ""));
  plants.forEach(drop);

  /* ---- 5. the C-RAM, and the rings a pilot plans by ---- */
  chk("the C-RAM carries the warship's close-in figure (0.40, and 0.86 x 0.35 from its gun: 70%), no other battery does",
      got.nato_e00.ciws === 0.40 && got.nato_e20.ciws === 0.40 &&
      ["nato_e50", "nato_e60", "nato_e90", "pact_e50", "pact_e60", "pact_e20"].every(function (k) { return !got[k].ciws; }) &&
      !BUILDINGS.flak.ciws, "e00 " + got.nato_e00.ciws + ", e20 " + got.nato_e20.ciws);
  chk("an aircraft plans round each battery's own reach, not the shared one's",
      Game.airDefenceReach(got.nato_e60) === 11.9 && Game.airDefenceReach(got.pact_e60) === 13.5 &&
      Game.airDefenceReach(got.pact_e50) === 13.9 && Game.airDefenceReach(BUILDINGS.flak) === WEAPONS.aa_battery.range,
      [got.nato_e60, got.pact_e60, got.pact_e50, BUILDINGS.flak].map(function (d) { return Game.airDefenceReach(d); }).join(" / "));

  /* ---- 6. the build card and the field manual ---- */
  as(P, "pact", "e60");
  var card = null, th = "";
  try {
    var fire = function (type, key) {
      var ev = { type: type, key: key, shiftKey: false, ctrlKey: false, metaKey: false, altKey: false, preventDefault: function () {} };
      (__listeners["win:" + type] || []).slice().forEach(function (f) { f(ev); });
    };
    var cards = function () { var box = document.getElementById("cards"), out = [];
      for (var i = 0; box && i < box.children.length; i++) if (box.children[i] && box.children[i].dataset) out.push(box.children[i]);
      return out; };
    var tabNow = function () { var c = cards()[0], kd = c && c.dataset.kind; return (kd === "upgrade" || kd === "era") ? "building" : (kd || ""); };
    UI.refreshCards && UI.refreshCards();
    for (var t = 0; t < 7 && tabNow() !== "defense"; t++) { fire("keydown", "Tab"); fire("keyup", "Tab"); }
    cards().forEach(function (c) { if (c.dataset.id === "flak") card = c; });
    if (card) { card.dispatchEvent({ type: "mouseenter" }); th = (document.getElementById("tooltip") || {}).innerHTML || ""; }
  } catch (e) { th = "threw " + e; }
  chk("the build card of a Soviet commander in the 1960s names the S-60 and prints its text",
      th.indexOf("WPN " + WEAPONS.aa_s60.name.toUpperCase()) >= 0 && th.indexOf(BUILDING_SIDE.flak_pact_e60.desc) >= 0,
      card ? th.replace(/<[^>]+>/g, " ").slice(0, 160) : "no AA Battery card on the defence tab");
  var gf = document.getElementById("gal-fac"), ge = document.getElementById("gal-era"), rec = null, rec0 = null;
  if (gf && ge && typeof Gallery !== "undefined") {
    var f0 = gf.value, e0 = ge.value;
    gf.value = "nato"; ge.value = "e00"; rec = Gallery.recordFor("flak", "building");
    gf.value = ""; ge.value = ""; rec0 = Gallery.recordFor("flak", "building");
    gf.value = f0; ge.value = e0;
  }
  chk("the field manual shows the US battery of the 2000s as the C-RAM, and every army's as the twin 40 mm",
      !!rec && rec.weapons.length === 1 && rec.weapons[0].id === "aa_lpws" && rec.fact === BUILDING_SIDE.flak_nato_e00.desc &&
      !!rec0 && rec0.weapons[0].id === "aa_battery",
      rec ? rec.weapons.map(function (w) { return w.id; }) + " / " + (rec0 ? rec0.weapons[0].id : "-") : "no record");

  /* ---- 8. drawn as the army and the period that dug it ----
     A US battery dug in the 1960s, then its army re-equips to the present;
     a Soviet 1960s battery and SAM site an engineer of ours then takes, and
     whose army re-equips too. Each is drawn - and fires - as what it was dug
     as, the taken ones in our colours; a battery dug after the re-equip is
     the present's. */
  chk("the 3D renderer is up, and its records are reachable", Render === Render3D && !!H, "");
  if (H) {
    P.faction = fac0; P.color = col0;
    var at8 = function (Q, w, h) { return site(Q, 10, 44, w, h, Q === P ? E : P); };
    P.era = "e60"; E.era = "e60";
    var a8 = at8(P, 2, 2), u8 = a8 ? Game.placeBuilding(P, "flak", a8.x, a8.y, true) : null;
    var c8 = at8(E, 2, 2), s8 = c8 ? Game.placeBuilding(E, "flak", c8.x, c8.y, true) : null;
    var d8 = at8(E, BUILDINGS.sam.w, BUILDINGS.sam.h), m8 = d8 ? Game.placeBuilding(E, "sam", d8.x, d8.y, true) : null;
    frames(2);
    var v0 = [u8, s8, m8].map(function (b) { return b ? seen(b).bk : "-"; });
    chk("dug in the 1960s: a US M167 battery, a Soviet S-60 battery and a Soviet S-125 SAM site, each drawn as its own site",
        v0.join() === "flak_nato_e60,flak_pact_e60,sam_pact_e60", v0.join());
    /* both armies re-equip to the present */
    P.era = "e20"; E.era = "e20";
    frames(2);
    var v1 = [u8, s8, m8].map(function (b) { return b ? seen(b).bk + "/" + (b.def.weapons || [])[0] : "-"; });
    chk("its army re-equips to the present: the M167 battery is still drawn as one and still fires its Vulcan - not a C-RAM - and the Soviet sites keep theirs",
        v1.join() === "flak_nato_e60/aa_m167,flak_pact_e60/aa_s60,sam_pact_e60/" + BUILDINGS.sam.weapons[0], v1.join());
    /* the selection panel's verdict (ui.js counterRows -> Gallery.matchup)
       is on the battery's own guns, not on its army's of the period now */
    if (u8 && Gallery.matchup) {
      var V8 = [{ fac: "pact", era: "e20" }];
      var mOwn = Gallery.matchup("flak", "building", { fac: "nato", era: P.era, vs: V8, def: u8.def });
      var mM167 = Gallery.matchup("flak", "building", { fac: "nato", era: "e60", vs: V8 });
      var mNow = Gallery.matchup("flak", "building", { fac: "nato", era: P.era, vs: V8 });
      chk("...and the panel's verdict on it is the M167's, not the C-RAM its army would dig today",
          !!mOwn && mOwn === mM167 && mOwn !== mNow, "");
    }
    var f8 = at8(P, 2, 2), n8 = f8 ? Game.placeBuilding(P, "flak", f8.x, f8.y, true) : null;
    frames(2);
    var vn = n8 ? seen(n8).bk + "/" + n8.def.weapons[0] : "-";
    chk("...and a battery dug after it is the present's: drawn as a C-RAM, firing the Land Phalanx", vn === "flak_nato_e20/aa_lpws", vn);
    /* our engineers take the Soviet battery and the SAM site */
    if (s8) Game.captureBuilding(s8, P);
    if (m8) Game.captureBuilding(m8, P);
    frames(2);
    var mine = lin(P.color.main), theirs = lin(E.color.main);
    var cap = [s8, m8].map(function (b) { var v = b ? seen(b) : { bk: "-", team: [] };
      return { b: b, bk: v.bk, team: v.team, ok: !!b && b.owner === P && v.team.length > 0 && v.team.every(function (hx) { return hx === mine; }) }; });
    chk("taken by our engineers, the Soviet S-60 battery and S-125 site are drawn as what they were dug as, and fire it - not as our own sites",
        cap[0].bk === "flak_pact_e60" && !!s8 && s8.def.weapons[0] === "aa_s60" && cap[1].bk === "sam_pact_e60",
        cap.map(function (c) { return c.bk + "/" + (c.b ? c.b.def.weapons[0] : "-"); }).join(", "));
    chk("...in OUR colours: every team-marked part is ours, none theirs, so the capture is plain to see",
        cap[0].ok && cap[1].ok && mine !== theirs,
        cap.map(function (c) { return c.team.map(function (hx) { return hx.toString(16); }).join("/") || "no team parts"; }).join(", ") +
        " (ours " + mine.toString(16) + ", theirs " + theirs.toString(16) + ")");
    [u8, s8, m8, n8].forEach(drop);
    frames(1);
  }

  /* ---- 7. saved and loaded ----
     A US battery dug in the 1960s, two Soviet ones dug in the 1960s and the
     1990s, and a fourth Soviet 1960s one that our engineers then take; both
     armies "re-equip" to the present before the save. The load rebuilds
     every structure as its owner's in its owner's period of the moment -
     which a save does not even carry, so it is the battle's start, 2020 -
     and each battery must still come back with the guns it was dug with. */
  P.faction = fac0; P.color = col0;
  var A = site(P, 10, 40, 2, 2, E), B = site(E, 10, 40, 2, 2, P);
  if (!A || !B) { chk("room for the save", false, ""); return; }
  P.era = "e60"; E.era = "e60";
  var ba = Game.placeBuilding(P, "flak", A.x, A.y, true), bb = Game.placeBuilding(E, "flak", B.x, B.y, true);
  var D = site(E, 10, 40, 2, 2, P), bd = D ? Game.placeBuilding(E, "flak", D.x, D.y, true) : null;
  if (bd) Game.captureBuilding(bd, P);
  E.era = "e90";
  var C = site(E, 10, 40, 2, 2, P), bc = C ? Game.placeBuilding(E, "flak", C.x, C.y, true) : null;
  P.era = "e20"; E.era = "e20";
  var before = [ba, bb, bc, bd].map(function (b) { return b ? b.def.weapons[0] : "-"; });
  chk("before the save: M167, S-60, ZU-23-2, and the S-60 we took", before.join() === "aa_m167,aa_s60,aa_zu23,aa_s60" && !!bd && bd.owner === P,
      before.join());
  var res = SaveGame.save(Game, "ironfront.aaside"), snap = null;
  try { snap = JSON.parse(localStorage.getItem("ironfront.aaside")); } catch (e) {}
  /* the commander may have dug batteries of its own by now; these four are ours */
  var rec7 = function (s) { return snap ? snap.buildings.filter(function (r) { return r.d === "flak" && s && r.tx === s.x && r.ty === s.y; })[0] : null; };
  var recs = [rec7(A), rec7(B), rec7(C), rec7(D)];
  var undated = snap ? snap.buildings.filter(function (r) { return !r.be; }).length : -1;
  var foreign = snap ? snap.buildings.filter(function (r) { return r.bf !== undefined; }).length : -1;
  chk("the save writes the period every structure was dug in, and the army that dug it only for the one we took",
      res.ok && recs.every(Boolean) && undated === 0 && foreign === 1 &&
      recs.map(function (r) { return r.be + ":" + (r.bf || ""); }).join() === "e60:,e60:,e90:,e60:pact",
      res.ok ? recs.map(function (r) { return r ? r.be + ":" + (r.bf || "") : "missing"; }).join() + "; " + undated + " undated, " + foreign + " with an army of their own" : res.error);
  var ld = SaveGame.load("ironfront.aaside");
  localStorage.removeItem("ironfront.aaside");
  var at = function (p, s) {
    var hit = null;
    if (p && s) p.buildings.forEach(function (b) { if (!b.dead && b.def.id === "flak" && b.tx === s.x && b.ty === s.y) hit = b; });
    return hit;
  };
  var P2 = Game.human, E2 = Game.players[1];
  var la = at(P2, A), lb = at(E2, B), lc = at(E2, C), ld2 = at(P2, D);
  var after = [la, lb, lc, ld2].map(function (b) { return b ? b.def.weapons[0] + "@" + b.era : "missing"; });
  chk("loaded, each comes back with the guns it was dug with - not its army's of the battle's start, nor its captor's",
      ld.ok && P2.era === "e20" && after.join() === "aa_m167@e60,aa_s60@e60,aa_zu23@e90,aa_s60@e60" &&
      la.def === bldDefFor("flak", "nato", "e60") && lc.cooldowns.length === 1 && la.def.id === "flak",
      (ld.ok ? "" : ld.error + " ") + after.join(", ") + " (armies now in " + (P2 && P2.era) + ")");
  var keys7 = [la, lb, lc, ld2].map(function (b) { return b && Render3D.bldKeyOf ? Render3D.bldKeyOf(b) : "-"; });
  chk("...and is drawn as it again: the one we took is still the Soviet site, ours, at full strength as dug",
      keys7.join() === "flak_nato_e60,flak_pact_e60,flak_pact_e90,flak_pact_e60" && !!ld2 && ld2.owner === P2 &&
      ld2.builtBy === "pact" && la.builtBy === "nato" && ld2.maxHp === BUILDINGS.flak.hp * ((FACTIONS.pact || {}).structHpMul || 1),
      keys7.join() + (ld2 ? "; taken one built by " + ld2.builtBy + ", maxHp " + ld2.maxHp : ""));
  var fresh = P2 ? Game.placeBuilding(P2, "flak", A.x + 4, A.y, true) : null;
  chk("and a battery dug after the load is the army's of its period now (C-RAM in 2020)",
      !!fresh && fresh.def.weapons[0] === "aa_lpws", fresh ? fresh.def.weapons + "" : "none");
}
