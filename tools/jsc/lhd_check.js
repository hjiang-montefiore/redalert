/* tools/jsc/lhd_check.js - the American amphibious assault ships (navy piece
   1 of 8): Iwo Jima LPH, Tarawa LHA, Wasp LHD and America LHA as a helicopter
   deck and a hold - checked on the real game under JavaScriptCore, 3D off.

     python3 tools/jsc/run.py index.html --test tools/jsc/lhd_check.js

   (owner) "We want an amphibious assault ship which can carry F-35B,
   helicopters, and landing ships." The rows and their sources are at the end
   of js/eras.js and at lha_n in js/rules.js; the deck is G.deckAircraftFor /
   G.deckTypesFor in js/game.js (def.deckTakes). Checked, on hormuz:
     1. each class is in its period only, for the United States only, and the
        naval sidebar's filter shows exactly it;
     2. each is buildable at a naval yard in its period and refused outside
        it; two are built through the naval queue and come out of the yard
        with three empty deck spots and an empty 24-seat hold;
     3. what each deck takes in each period, and that it refuses the period's
        carrier jets, an F-16 and the MH-60R; jets get no ramp from it;
     4. a UH-60M lands on the America and launches from her, and an SH-3 on
        the Iwo Jima; one bought from her panel is craned aboard at the yard;
     5. troops and a tank board a Wasp, the 25th passenger is refused, she
        sails to a beach and puts them ashore; the America and the Iwo Jima
        (no well deck) take the troops and refuse the tank, with the reason;
     6. a helicopter-only deck is no airbase for a jet: with every airbase
        down and only an LHA/LHD/LPH or the Moskva afloat a carrier jet is
        refused for want of an airbase, the deck's own helicopter is not, and
        a real carrier still stands in for the airbase for her jets;
     7. the Marine Corps' STOVL jets (navy piece 2: eras.js nato_e80_stovl,
        nato_e90_stovl, rules.js stovl_n): each in its periods only, under a
        role of its own that leaves every other role's card where it was;
        the Tarawa, Wasps and America take theirs and the CVNs none; an
        AV-8B lands on, launches from and rearms on a Tarawa, a Harrier II
        Plus on a Wasp and an F-35B on the America; bought from her panel;
        and the commander, even as a 1980s or present-day American with an
        empty Tarawa or America of its own, never buys one;
     8. a save with a helicopter on her deck and two aboard her hold loads
        with both. (last: the load rebuilds the match) */
var TT = 32, PASS = 0, FAIL = 0, DT = 1 / 30;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-cash", "200000"); set("opt-seed", "lhdcheck"); set("opt-fog", "1"); set("opt-3d", "0");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

var P, M;
var ROW = { e50: null, e60: "nato_e60_lph", e80: "nato_e80_lha", e90: "nato_e90_lhd", e00: "nato_e00_lhd", e20: "lha_n" };
/* what each deck takes in each period (eras.js deckTakes, read in the owner's era) */
var TAKES = { e60: ["nato_e60_aswhelo"], e80: ["nato_e80_transport", "nato_e80_stovl"],
              e90: ["nato_e90_aswhelo", "nato_e90_transport", "nato_e90_stovl"],
              e00: ["nato_e00_transport", "nato_e90_stovl"], e20: ["trans_n", "helo_n", "stovl_n"] };
/* the Marine jet each period fields (navy piece 2) */
var STOVL = { e50: null, e60: null, e80: "nato_e80_stovl", e90: "nato_e90_stovl", e00: "nato_e90_stovl", e20: "stovl_n" };
function ticks(sec, stop) {
  var n = Math.round(sec / DT);
  for (var i = 0; i < n; i++) { Game.tick(DT); if (stop && stop()) return (i + 1) * DT; }
  return -1;
}
function tiles(px) { return (px / TT).toFixed(1); }
function spawn(id, x, y) { var u = Game.spawnUnitAt(P, id, x, y); if (u) { u.stance = "hold"; u.order = { type: "idle" }; } return u; }
function gone(u) {
  if (!u) return; u.dead = true;
  var i = Game.entities.indexOf(u); if (i >= 0) Game.entities.splice(i, 1);
  var l = u.owner && (u.kind === "building" ? u.owner.buildings : u.owner.units);
  if (l) { i = l.indexOf(u); if (i >= 0) l.splice(i, 1); }
}
function same(a, b) { return a.slice().sort().join(",") === b.slice().sort().join(","); }
function useEra(e) { P.era = e; }
/* a structure on dry ground near home, `wet` = with water beside it */
function ashore(key, rMin, rMax, wet) {
  var d = BUILDINGS[key], w = d.w, h = d.h, C = { x: (P.homeX / TT) | 0, y: (P.homeY / TT) | 0 };
  for (var R = rMin; R <= rMax; R++) for (var a = 0; a < 64; a++) {
    var x = (C.x + Math.cos(a / 64 * 6.283) * R) | 0, y = (C.y + Math.sin(a / 64 * 6.283) * R) | 0, land = true, sea = false;
    for (var j = 0; j < h; j++) for (var i = 0; i < w; i++)
      if (!GameMap.passable(M, x + i, y + j, "ground") || Game.tileBlocked(x + i, y + j, null)) land = false;
    if (!land) continue;
    for (var j2 = -1; j2 <= h; j2++) for (var i2 = -1; i2 <= w; i2++) if (GameMap.passable(M, x + i2, y + j2, "sea")) sea = true;
    if (wet && !sea) continue;
    var b = Game.placeBuilding(P, key, x, y, true);
    if (b) { b.buildProgress = 1; return b; }
  }
  return null;
}
/* the beach nearest home with twelve tiles of open water straight out from it */
function findBeach() {
  var hx = P.homeX / TT | 0, hy = P.homeY / TT | 0, best = null, bd = Infinity;
  for (var y = 6; y < M.H - 6; y++) for (var x = 6; x < M.W - 6; x++) {
    if (!GameMap.passable(M, x, y, "ground") || Game.tileBlocked(x, y, null)) continue;
    for (var d = 0; d < 4; d++) {
      var dx = [1, -1, 0, 0][d], dy = [0, 0, 1, -1][d], ok = true;
      for (var k = 1; k <= 13; k++) {
        var xx = x + dx * k, yy = y + dy * k;
        for (var s = -1; s <= 1 && ok; s++) {
          var sx = xx + (dx ? 0 : s), sy = yy + (dy ? 0 : s);
          if (sx < 0 || sy < 0 || sx >= M.W || sy >= M.H || M.terrain[sy * M.W + sx] !== T.WATER) ok = false;
        }
        if (!ok) break;
      }
      if (!ok) continue;
      var dd = Math.hypot(x - hx, y - hy);
      if (dd < bd) { bd = dd; best = { x: x, y: y, dx: dx, dy: dy }; }
    }
  }
  return best;
}

function run() {
  P = Game.human; M = Game.map;
  Game.players.forEach(function (p) { if (p !== P && p.isAI) AI.setPeace(p, true); });
  Game.checkVictory = function () {};
  P.cash = 500000; P.oil = 50000; P.tech = 3; P.techCap = undefined;
  secPeriods();
  var yard = secBuild();
  secDecks();
  secFly(yard);
  secHold();
  secJets();
  secMarines();
  secSave();
}

/* ---------------- 1. one class a period, the United States only ---------------- */
function secPeriods() {
  log("\n[1] each class in its period only");
  ERAS.forEach(function (e) {
    var have = unitsFor("nato", "assault_sea", e), want = ROW[e] ? [ROW[e]] : [];
    /* the naval sidebar (ui.js refreshCards): cat naval, this army, inEra */
    var side = Object.keys(UNITS).filter(function (id) {
      var d = UNITS[id]; return d.cat === "naval" && (d.fac === "both" || d.fac === "nato") && d.role === "assault_sea" && inEra(d, e); });
    chk(e + ": the United States fields " + (want[0] || "none") + " and the Navy tab shows it alone",
        same(have, want) && same(side, want) && unitFor("nato", "assault_sea", e) === (ROW[e] || null), have.join(",") + " | " + side.join(","));
  });
  var other = [];
  ["pact", "pla", "kpa", "roc", "gbr", "fra", "deu"].forEach(function (f) {
    ERAS.forEach(function (e) { if (unitsFor(f, "assault_sea", e).length) other.push(f + "/" + e); }); });
  chk("no other army is handed an American assault ship", other.length === 0, other.join(" "));
  var bad = [];
  for (var e in ROW) if (ROW[e]) {
    var d = UNITS[ROW[e]];
    if (!(d.carrier === 3 && d.heloCarrier && d.emptyDeck && d.cargo === 24 && d.amphib && d.layer === "sea" &&
          d.prereq.indexOf("navalyard") >= 0 && FACTS[ROW[e]] && WARSHIPS[ROW[e]] && WARSHIPS[ROW[e]].deck === "axial" &&
          d.service && d.desc)) bad.push(ROW[e]);
  }
  chk("every row: 3 helicopter spots delivered empty, a 24-seat amphibious hold, built at the naval yard, a field-manual entry and an axial-deck model",
      bad.length === 0, bad.join(" "));
  var wd = [];
  for (var e2 in ROW) if (ROW[e2] && UNITS[ROW[e2]].wellDeck) wd.push(ROW[e2]);
  chk("a well deck (def.wellDeck) on the Tarawa and the Wasps only, not the Iwo Jima or the America",
      same(wd, ["nato_e80_lha", "nato_e90_lhd", "nato_e00_lhd"]), wd.join(","));
  var lst = Object.keys(UNITS).filter(function (id) { return UNITS[id].amphib && !UNITS[id].carrier && Unit.troopsOnly(UNITS[id]); });
  chk("no landing ship is troops-only", lst.length === 0, lst.join(","));
}

/* ---------------- 2. buildable at a naval yard in its period ---------------- */
function secBuild() {
  log("\n[2] built at a naval yard, in period");
  var yard = ashore("navalyard", 4, 40, true), base = ashore("airbase", 4, 30, false);
  chk("a naval yard on the coast and an airbase", !!yard && !!base, "");
  if (!yard || !base) return yard;
  var why = [];
  for (var e in ROW) if (ROW[e]) {
    useEra(e);
    ERAS.forEach(function (o) {
      if (!ROW[o]) return;
      var r = P.lockReason(UNITS[ROW[o]]);
      if (o === e ? r : !/NOT YET IN SERVICE|WITHDRAWN FROM SERVICE/.test(r || "")) why.push(e + ":" + ROW[o] + "=" + r);
    });
  }
  chk("each can be built in its own period and is refused in every other", why.length === 0, why.slice(0, 4).join("; "));
  useEra("e60");
  var noAir = P.buildings.filter(function (b) { return b.def.id === "airbase"; });
  noAir.forEach(function (b) { b.buildProgress = 0.5; });
  var r0 = P.lockReason(UNITS.nato_e60_lph);
  noAir.forEach(function (b) { b.buildProgress = 1; });
  chk("without a finished airbase it is refused, and says so", /AIRBASE|REQUIRES/i.test(r0 || ""), r0);
  [["e60", "nato_e60_lph"], ["e20", "lha_n"]].forEach(function (pr) {
    useEra(pr[0]);
    var ok = P.enqueue("naval", pr[1]), made = null;
    var t = ticks(400, function () {
      for (var i = 0; i < P.units.length; i++) { var u = P.units[i]; if (!u.dead && u.def.id === pr[1]) { made = u; return true; } }
      return false; });
    chk(pr[0] + ": " + UNITS[pr[1]].name + " comes off the naval yard's slip, three empty spots and an empty hold",
        ok && !!made && made.deckSlots() === 3 && made.wing().length === 0 && made.cargo.length === 0 &&
        Math.hypot(made.x - yard.x, made.y - yard.y) < 12 * TT,
        "queued " + ok + ", after " + t.toFixed(1) + " s (list " + P.factionTime(UNITS[pr[1]]) + " s)" + (made ? ", spots " + made.deckSlots() + " aboard " + made.wing().length +
        " at " + tiles(Math.hypot(made.x - yard.x, made.y - yard.y)) + " tiles from the yard" : ""));
    if (made) gone(made);
  });
  return yard;
}

/* ---------------- 3. what each deck takes ---------------- */
function secDecks() {
  log("\n[3] the deck takes its helicopters and the Marine jet of the period, and nothing else");
  var sea = Game.nearestBuilding(P, "navalyard", P.homeX, P.homeY);
  var at = sea ? Path.nearest(M, (sea.x / TT) | 0, (sea.y / TT) | 0, "sea", null, 12) : null;
  if (!at) { chk("open water by the yard", false, ""); return; }
  for (var e in ROW) if (ROW[e]) {
    useEra(e);
    var s = spawn(ROW[e], at.x * TT + 16, at.y * TT + 16);
    var types = Game.deckTypesFor(s), plan = Game.deckAircraftFor(s, 0);
    var jets = [], refused = [];
    ["cfighter", "cstealth", "cstrike", "cawacs", "ewair", "fighter"].forEach(function (r) {
      unitsFor("nato", r, e).forEach(function (id) { jets.push(id); }); });
    ["asw_helo_n", "nato_e00_aswhelo"].forEach(function (id) { if (inEra(UNITS[id], e)) jets.push(id); });
    jets.forEach(function (id) {
      if (types.indexOf(id) < 0 && Game.deckOrderReason(s, id)) refused.push(id); });
    var jet = jets.filter(function (id) { return !UNITS[id].hover; })[0];
    var capJ = jet ? P.airCapacity(UNITS[jet]) : 0, capH = P.airCapacity(UNITS[TAKES[e][0]]);
    chk(e + " " + UNITS[ROW[e]].name + ": takes " + TAKES[e].map(function (id) { return UNITS[id].name; }).join(", ") +
        ", laid out for the first (a helicopter), refuses " + jets.length + " others",
        same(types, TAKES[e]) && plan === TAKES[e][0] && refused.length === jets.length && jets.length > 0,
        "takes " + types.join(",") + " plan " + plan + "; refused " + refused.length + "/" + jets.length +
        (refused.length < jets.length ? " NOT " + jets.filter(function (j) { return refused.indexOf(j) < 0; }).join(",") : ""));
    gone(s);
    var capJ0 = jet ? P.airCapacity(UNITS[jet]) : 0, capH0 = P.airCapacity(UNITS[TAKES[e][0]]);
    chk(e + ": her three spots are ramp for the helicopter and not for a " + (jet ? UNITS[jet].name : "jet"),
        capH - capH0 === 3 && capJ === capJ0, "helicopter +" + (capH - capH0) + ", jet +" + (capJ - capJ0));
  }
  useEra("e20");
}

/* ---------------- 4. a helicopter lands on her and takes off ---------------- */
function secFly(yard) {
  log("\n[4] a helicopter lands on her and launches from her");
  var at = yard ? Path.nearest(M, (yard.x / TT) | 0, (yard.y / TT) | 0, "sea", null, 12) : null;
  if (!at) { chk("open water by the yard", false, ""); return; }
  [["e20", "lha_n", "trans_n"], ["e60", "nato_e60_lph", "nato_e60_aswhelo"]].forEach(function (pr) {
    useEra(pr[0]);
    var s = spawn(pr[1], at.x * TT + 16, at.y * TT + 16);
    var h = spawn(pr[2], s.x + 9 * TT, s.y - 4 * TT);
    h.padOn = s; h.parked = false; h.give({ type: "rtb" });        // the right-click on her deck (ui.js landingHost)
    var t1 = ticks(40, function () { return h.parked && h.padOn === s; });
    chk(pr[0] + ": a " + UNITS[pr[2]].name + " sent to the " + UNITS[pr[1]].name + " lands on her deck",
        t1 > 0 && s.wing().indexOf(h) >= 0 && s.onRamp().indexOf(h) >= 0, "after " + t1.toFixed(1) + " s, parked " + h.parked + " on " + (h.padOn && h.padOn.def.id));
    h.give({ type: "move", x: s.x - 10 * TT, y: s.y + 3 * TT });
    var t2 = ticks(20, function () { return !h.parked && Math.hypot(h.x - s.x, h.y - s.y) > 5 * TT; });
    chk("...and launches from her when sent away", t2 > 0 && h.layer === "air" && !h.parked,
        "after " + t2.toFixed(1) + " s at " + tiles(Math.hypot(h.x - s.x, h.y - s.y)) + " tiles");
    h.give({ type: "rtb" });
    var t3 = ticks(40, function () { return h.parked && h.padOn === s; });
    chk("...and comes home to her", t3 > 0, "after " + t3.toFixed(1) + " s, home " + (h.padOn && h.padOn.def.id));
    /* a jet is not let down on her */
    var jet = unitsFor("nato", "cfighter", pr[0])[0];
    if (jet) {
      /* with every airbase out of action, so her deck is the only ramp there is */
      var bases = P.buildings.filter(function (b) { return b.def.pads; });
      bases.forEach(function (b) { b.buildProgress = 0.5; });
      var j = spawn(jet, s.x + 6 * TT, s.y), j2 = spawn(pr[2], s.x + 6 * TT, s.y);
      var pad = Game.findPad(j), pad2 = Game.findPad(j2);
      bases.forEach(function (b) { b.buildProgress = 1; });
      chk(pr[0] + ": a " + UNITS[jet].name + " looking for somewhere to land is not offered her deck, where a " + UNITS[pr[2]].name + " is",
          !(pad && pad.host === s) && !!pad2 && pad2.host === s,
          "jet offered " + (pad && pad.host ? pad.host.def.id : "nothing") + ", helicopter offered " + (pad2 && pad2.host ? pad2.host.def.id : "nothing"));
      gone(j); gone(j2);
    }
    /* bought from her panel alongside the yard: craned aboard */
    var spare = s.deckSlots() - s.wing().length;
    var why = Game.orderDeckAircraft(s, pr[2]);
    var t4 = ticks(60, function () { return s.wing().length === 2; });
    chk(pr[0] + ": a second " + UNITS[pr[2]].name + " bought from her panel alongside the yard comes aboard",
        !why && t4 > 0 && s.wing().every(function (u) { return u.def.id === pr[2]; }), (why || "") + " after " + t4.toFixed(1) + " s, " + s.wing().length + " aboard of " + spare + " free");
    s.wing().forEach(gone); gone(h); gone(s);
  });
  useEra("e20");
}

/* ---------------- 5. troops and a tank board her and go ashore ---------------- */
var BEACH = null;
function secHold() {
  log("\n[5] the hold: troops and a vehicle aboard a well-deck ship, and ashore on a beach; troops only without one");
  useEra("e00");
  BEACH = findBeach();
  if (!BEACH) { chk("a beach with open water off it", false, ""); return; }
  var B = BEACH, off = 1.5;
  /* alongside the beach, so they can walk aboard */
  var s = spawn("nato_e00_lhd", (B.x + B.dx + 0.5) * TT, (B.y + B.dy + 0.5) * TT);
  var land = function (k) { return { x: (B.x - B.dx * k + 0.5) * TT, y: (B.y - B.dy * k + 0.5) * TT }; };
  var p1 = land(2), p2 = land(3);
  var sq = spawn("rifle_n", p1.x + (B.dy ? TT : 0), p1.y + (B.dx ? TT : 0));
  var tk = spawn("mbt_n", p2.x, p2.y);
  [sq, tk].forEach(function (u) { u.give({ type: "enter", target: s }); });
  ticks(30, function () { return sq.carried && tk.carried; });
  chk("a rifle squad and an Abrams walk aboard a Wasp (well deck) from the beach", sq.carried && tk.carried && s.cargo.length === 2,
      "squad " + sq.carried + ", tank " + tk.carried + ", hold " + s.cargo.length + "/" + s.def.cargo);
  /* fill the rest of the hold, then one more */
  var fill = [];
  for (var i = s.cargo.length; i < s.def.cargo; i++) {
    var f = spawn("rifle_n", P.homeX, P.homeY); s.cargo.push(f); f.carried = true; fill.push(f);
  }
  var x25 = spawn("rifle_n", p1.x, p1.y); x25.give({ type: "enter", target: s });
  ticks(8);
  chk("the 25th passenger is refused: the hold is 24 seats", !x25.carried && s.cargo.length === 24, "hold " + s.cargo.length + ", 25th carried " + x25.carried);
  gone(x25);
  fill.forEach(function (f) { s.cargo.splice(s.cargo.indexOf(f), 1); gone(f); });
  /* out to sea and back in to the beach, as a right-click on the shore orders it (ui.js unloadAt) */
  s.give({ type: "move", x: (B.x + B.dx * 11 + 0.5) * TT, y: (B.y + B.dy * 11 + 0.5) * TT });
  ticks(40, function () { return Math.hypot(s.x - (B.x + B.dx * 11 + 0.5) * TT, s.y - (B.y + B.dy * 11 + 0.5) * TT) < TT; });
  var out = Math.hypot(s.x - (B.x + 0.5) * TT, s.y - (B.y + 0.5) * TT) / TT;
  var aim = land(1);
  s.give({ type: "move", x: aim.x, y: aim.y, unloadAt: true });
  var t = ticks(90, function () { return s.cargo.length === 0; });
  var ashore = [sq, tk].filter(function (u) {
    return !u.carried && !u.dead && GameMap.passable(M, (u.x / TT) | 0, (u.y / TT) | 0, "ground") &&
           Math.hypot(u.x - aim.x, u.y - aim.y) < 5 * TT; });
  chk("she sails out " + out.toFixed(1) + " tiles, runs in to the beach and puts both ashore beside it",
      out > 8 && t > 0 && ashore.length === 2, "after " + t.toFixed(1) + " s, ashore " + ashore.length + "/2, she is at " + tiles(s.x) + "," + tiles(s.y));
  gone(s); gone(sq); gone(tk);
  /* no well deck: the America (and the Iwo Jima) take the squad and turn the tank away */
  [["e20", "lha_n"], ["e60", "nato_e60_lph"]].forEach(function (pr) {
    useEra(pr[0]);
    var a = spawn(pr[1], (B.x + B.dx + 0.5) * TT, (B.y + B.dy + 0.5) * TT);
    var q = spawn("rifle_n", p1.x + (B.dy ? TT : 0), p1.y + (B.dx ? TT : 0));
    var v = spawn("mbt_n", p2.x, p2.y), vx = v.x, vy = v.y;
    var why = a.holdRefusal(v), whyQ = a.holdRefusal(q);
    [q, v].forEach(function (u) { u.give({ type: "enter", target: a }); });
    ticks(30, function () { return q.carried; });
    ticks(2);
    chk(pr[0] + ": the " + UNITS[pr[1]].name + " (no well deck) takes the squad and refuses the tank where it stands, saying why",
        q.carried && !v.carried && a.cargo.length === 1 && v.order.type === "idle" &&
        Math.hypot(v.x - vx, v.y - vy) < TT && /NO WELL DECK/.test(why) && whyQ === "",
        "squad " + q.carried + ", tank " + v.carried + " (" + v.order.type + ", moved " + tiles(Math.hypot(v.x - vx, v.y - vy)) + "), hold " + a.cargo.length + "; \"" + why + "\"");
    if (q.carried) a.cargo.splice(a.cargo.indexOf(q), 1);
    gone(q); gone(v); gone(a);
  });
  var wells = ["nato_e80_lha", "nato_e90_lhd", "nato_e00_lhd"].filter(function (id) {
    var a = spawn(id, P.homeX, P.homeY), v = spawn("mbt_n", P.homeX, P.homeY), r = a.holdRefusal(v);
    gone(a); gone(v); return r === ""; });
  chk("the Tarawa and both Wasps take vehicles (their ship stands in for her landing craft)", wells.length === 3, wells.join(","));
  useEra("e20");
}

/* ---------------- 6. a helicopter-only deck is no airbase for a jet ---------------- */
function secJets() {
  log("\n[6] an assault ship's deck stands in for the airbase for her Marine jet only, the Moskva's for no jet");
  var yard = Game.nearestBuilding(P, "navalyard", P.homeX, P.homeY);
  var at = yard ? Path.nearest(M, (yard.x / TT) | 0, (yard.y / TT) | 0, "sea", null, 12) : null;
  if (!at) { chk("open water by the yard", false, ""); return; }
  var NO_AB = "REQUIRES " + BUILDINGS.airbase.name.toUpperCase();
  var bases = P.buildings.filter(function (b) { return b.def.id === "airbase"; });
  bases.forEach(function (b) { b.buildProgress = 0.5; });       // every airbase down
  var fac0 = P.faction;
  var hulls = [["nato", "e60", "nato_e60_lph"], ["nato", "e80", "nato_e80_lha"], ["nato", "e90", "nato_e90_lhd"],
               ["nato", "e00", "nato_e00_lhd"], ["nato", "e20", "lha_n"], ["pact", "e60", "pact_e60_carrier"]];
  hulls.forEach(function (h) {
    P.faction = h[0]; useEra(h[1]);
    var s = spawn(h[2], at.x * TT + 16, at.y * TT + 16);
    var types = Game.deckTypesFor(s);
    /* every carrier-capable fixed-wing type of any navy and decade: the deck is no airbase for one */
    var jets = Object.keys(UNITS).filter(function (id) { var d = UNITS[id]; return d.cat === "aircraft" && d.carrierCapable && !d.hover; });
    var counted = jets.filter(function (id) { return P.hasDeck(UNITS[id]); });
    var mj = h[0] === "nato" ? STOVL[h[1]] : null;      // her Marine jet (navy piece 2), which does count
    /* the period's own carrier jets, through the AIR tab's gate */
    var own = [];
    ["cfighter", "cstealth", "cstrike", "cawacs", "ewair"].forEach(function (r) {
      unitsFor(h[0], r, h[1]).forEach(function (id) { if (UNITS[id].carrierCapable && !UNITS[id].hover && own.indexOf(id) < 0) own.push(id); }); });
    var let_ = own.filter(function (id) { return P.lockReason(UNITS[id]) !== NO_AB; });
    var helo = types[0], hr = helo ? P.lockReason(UNITS[helo]) : "none";
    var mr = mj ? P.lockReason(UNITS[mj]) : null;
    chk(h[1] + " " + UNITS[h[2]].name + " alone: " + (mj ? "only her " + UNITS[mj].name + " counts" : "no jet counts") + " her deck as an airbase, the " + own.length + " carrier jets of the period are refused \"" + NO_AB + "\", her " + (helo ? UNITS[helo].name : "helicopter") + (mj ? " and " + UNITS[mj].name + " are" : " is") + " not",
        same(counted, mj ? [mj] : []) && let_.length === 0 && !!helo && P.hasDeck(UNITS[helo]) && hr !== NO_AB && (!mj || (mr !== NO_AB && types.indexOf(mj) >= 0)),
        "counted " + counted.slice(0, 4).join(",") + (mj ? "; " + mj + "=" + mr : "") + "; let through " + let_.map(function (id) { return id + "=" + P.lockReason(UNITS[id]); }).slice(0, 3).join(",") + "; helicopter " + helo + "=" + hr);
    gone(s);
  });
  P.faction = fac0;
  /* a real carrier still is the airbase for her own jets, as before */
  [["e60", "nato_e60_carrier"], ["e90", "nato_e90_carrier"], ["e20", "carrier_n"]].forEach(function (pr) {
    if (!UNITS[pr[1]]) { chk(pr[1] + " exists", false, ""); return; }
    useEra(pr[0]);
    var s = spawn(pr[1], at.x * TT + 16, at.y * TT + 16);
    s.wing().forEach(gone);                                  // an empty deck, so there is ramp
    var f = unitFor("nato", "cfighter", pr[0]), r = f ? P.lockReason(UNITS[f]) : "none";
    chk(pr[0] + " " + UNITS[pr[1]].name + " alone: her " + (f ? UNITS[f].name : "fighter") + " is still buildable with every airbase down",
        !!f && P.hasDeck(UNITS[f]) && r === null, f + "=" + r);
    gone(s);
  });
  bases.forEach(function (b) { b.buildProgress = 1; });
  useEra("e20");
}

/* ---------------- 7. the Marine Corps' STOVL jets (navy piece 2) ---------------- */
function secMarines() {
  log("\n[7] the Marine Corps' AV-8B Harrier II and F-35B");
  var IDS = ["nato_e80_stovl", "nato_e90_stovl", "stovl_n"];
  /* each in its periods only, for the United States only, in the AIR tab */
  var badP = [];
  ERAS.forEach(function (e) {
    var want = STOVL[e] ? [STOVL[e]] : [], have = unitsFor("nato", "stovl", e);
    var side = Object.keys(UNITS).filter(function (id) {
      var d = UNITS[id]; return d.cat === "aircraft" && (d.fac === "both" || d.fac === "nato") && d.role === "stovl" && inEra(d, e); });
    if (!same(have, want) || !same(side, want)) badP.push(e + ":" + have.join("+") + "|" + side.join("+"));
  });
  chk("each is in its periods only: AV-8B e80, Harrier II Plus e90-e00, F-35B e20, nothing before 1985", badP.length === 0, badP.join(" "));
  var other = [];
  ["pact", "pla", "kpa", "roc", "gbr", "fra", "deu"].forEach(function (f) {
    ERAS.forEach(function (e) { if (unitsFor(f, "stovl", e).length) other.push(f + "/" + e); }); });
  var rows = IDS.filter(function (id) {
    var d = UNITS[id]; return d && d.cat === "aircraft" && d.jet && !d.hover && d.carrierCapable && same(d.prereq, ["airbase"]) && FACTS[id] && d.desc && d.service; });
  chk("no other army is handed one; all three are carrier-capable jets that need only an airbase, with a field-manual entry",
      other.length === 0 && rows.length === 3 && same(ROLES.stovl || [], IDS), other.join(" ") + " rows " + rows.join(","));
  /* their own role: no other role's card moved */
  var CARD = { e80: { cas: "nato_e80_cas", fighter: "nato_e80_fighter", cfighter: "nato_e80_cfighter" },
               e90: { cas: "nato_e90_cas", fighter: "nato_e90_fighter", cfighter: "nato_e90_cfighter" },
               e00: { cas: "nato_e00_cas", stealthfighter: "nato_e00_stealthfighter" },
               e20: { cstealth: "cstealth_n", fighter: "fighter_n", stealthfighter: "stealth_n" } };
  var moved = [];
  for (var e in CARD) for (var r in CARD[e]) if (unitFor("nato", r, e) !== CARD[e][r]) moved.push(e + "/" + r + "=" + unitFor("nato", r, e));
  var inOther = [];
  for (var r2 in ROLES) if (r2 !== "stovl") ROLES[r2].forEach(function (id) { if (IDS.indexOf(id) >= 0) inOther.push(r2 + ":" + id); });
  chk("the A-10A, F-15E, A-10C, F-15C, F-16C, F-14A, F/A-18C, F-35A, F-35C and F-22 are still each period's answer for their roles",
      moved.length === 0 && inOther.length === 0, moved.concat(inOther).join(" "));
  var wn = function (id) { return (UNITS[id].weapons || []).map(function (w) { return WEAPONS[w] && WEAPONS[w].name; }).join(" / "); };
  var KEEP = { nato_e80_cas: "GAU-8 Avenger 30mm / AGM-65 Maverick / 500lb guided bomb",
               cstealth_n: "AIM-260 (LO) / 2x GBU-31 JDAM (internal bay)",
               cstealth_b: "AIM-120C-7 AMRAAM and ASRAAM (internal) / 2x Paveway IV (internal bay)",
               gbr_e80_cfighter: "AIM-9L Sidewinder / 1,000 lb retarded bombs and BL755 cluster" };
  var chg = [];
  for (var k in KEEP) if (wn(k) !== KEEP[k]) chg.push(k + ": " + wn(k));
  chk("the A-10A's, F-35C's and Britain's F-35B and Sea Harrier's weapons are as they were (the Marine jets' are their own copies)",
      chg.length === 0 && WEAPONS.w_e80_nato_cas.name === "500lb guided bomb" && WEAPONS.aam_lo.name === "AIM-260 (LO)" &&
      WEAPONS.w_e80_gbr_cfighter.name === "AIM-9L Sidewinder", chg.join("; "));
  chk("their real fits: AIM-9L and Mk 82/Rockeye; AIM-9M and GBU-12/Mk 82; AMRAAM and two GBU-32 in the short bay",
      wn("nato_e80_stovl") === "AIM-9L Sidewinder / Mk 82 bombs and Mk 20 Rockeye (ARBS)" &&
      wn("nato_e90_stovl") === "AIM-9M Sidewinder / GBU-12 Paveway II and Mk 82 bombs" &&
      wn("stovl_n") === "AIM-120 AMRAAM (internal bays) / 2x GBU-32 JDAM (short bay)",
      IDS.map(wn).join(" | "));

  var yard = Game.nearestBuilding(P, "navalyard", P.homeX, P.homeY);
  var at = yard ? Path.nearest(M, (yard.x / TT) | 0, (yard.y / TT) | 0, "sea", null, 12) : null;
  if (!at) { chk("open water by the yard", false, ""); return; }
  /* the US carriers take exactly what their rule gave them, and no Marine jet */
  var cv = [];
  ["e50", "e60", "e80", "e90", "e00", "e20"].forEach(function (e) {
    useEra(e);
    var id = unitFor("nato", "carrier", e);
    if (!id) return;
    var s = spawn(id, at.x * TT + 16, at.y * TT + 16), types = Game.deckTypesFor(s), want = [];
    for (var i = 0; i < s.deckSlots(); i++) { var a = Game.deckAircraftFor(s, i); if (a && want.indexOf(a) < 0) want.push(a); }
    if (want.some(function (x) { return !UNITS[x].hover; }))
      ["cfighter", "cstealth", "cstrike", "cawacs", "ewair"].forEach(function (r) {
        unitsFor("nato", r, e).forEach(function (x) { if (UNITS[x].carrierCapable && want.indexOf(x) < 0) want.push(x); }); });
    if (!same(types, want) || types.some(function (x) { return IDS.indexOf(x) >= 0; })) cv.push(e + " " + id + ": " + types.join(","));
    s.wing().forEach(gone); gone(s);
  });
  useEra("e20");
  var qe = UNITS.carrier_b ? (function () { var f0 = P.faction; P.faction = "gbr"; var s = spawn("carrier_b", at.x * TT + 16, at.y * TT + 16);
    var t = Game.deckTypesFor(s); s.wing().forEach(gone); gone(s); P.faction = f0; return t; })() : [];
  chk("the American carriers of every period take their air wing's types and no Marine jet, nor does the Queen Elizabeth",
      cv.length === 0 && qe.indexOf("stovl_n") < 0, cv.join("; ") + " | QE " + qe.join(","));

  /* with every airbase down: her deck is the AV-8B's airbase and not an F-16's; the Iwo Jima's is no jet's */
  var bases = P.buildings.filter(function (b) { return b.def.pads; });
  bases.forEach(function (b) { b.buildProgress = 0.5; });
  var NO_AB = "REQUIRES " + BUILDINGS.airbase.name.toUpperCase();
  useEra("e80");
  var lha = spawn("nato_e80_lha", at.x * TT + 16, at.y * TT + 16);
  /* the F-16C is a 1990s row here; the Tarawa's own decade has the F-15C */
  var f16 = UNITS.nato_e90_fighter, f15 = UNITS.nato_e80_fighter;
  var rA = P.lockReason(UNITS.nato_e80_stovl), rF = P.lockReason(f15);
  chk("e80, a Tarawa alone: she is the AV-8B's airbase (buildable) and not an F-16's or an F-15C's (\"" + NO_AB + "\")",
      P.hasDeck(UNITS.nato_e80_stovl) && !P.hasDeck(f16) && !P.hasDeck(f15) && rA === null && rF === NO_AB, "AV-8B " + rA + ", F-15C " + rF);
  gone(lha);
  var lph = spawn("nato_e60_lph", at.x * TT + 16, at.y * TT + 16);
  var av = spawn("nato_e80_stovl", lph.x + 6 * TT, lph.y), pad = Game.findPad(av);
  var why = Game.deckOrderReason(lph, "nato_e80_stovl");
  chk("e80, an Iwo Jima alone: no jet on her deck - the AV-8B is not her airbase's, not landed on her, not sold for her",
      !P.hasDeck(UNITS.nato_e80_stovl) && P.lockReason(UNITS.nato_e80_stovl) === NO_AB && !(pad && pad.host === lph) &&
      /CANNOT OPERATE/.test(why || "") && Game.deckTypesFor(lph).every(function (x) { return UNITS[x].hover; }),
      "types " + Game.deckTypesFor(lph).join(",") + "; pad " + (pad && pad.host ? pad.host.def.id : "none") + "; " + why);
  gone(av); gone(lph);
  bases.forEach(function (b) { b.buildProgress = 1; });

  /* each lands on her, rearms there, launches and comes home; one more is bought from her panel */
  [["e80", "nato_e80_lha", "nato_e80_stovl"], ["e90", "nato_e90_lhd", "nato_e90_stovl"], ["e20", "lha_n", "stovl_n"]].forEach(function (pr) {
    useEra(pr[0]);
    var s = spawn(pr[1], at.x * TT + 16, at.y * TT + 16);
    var j = spawn(pr[2], s.x + 9 * TT, s.y - 4 * TT);
    j.padOn = s; j.parked = false; j.ammo = 0; j.give({ type: "rtb" });
    var t1 = ticks(90, function () { return j.parked && j.padOn === s; });
    chk(pr[0] + ": an " + UNITS[pr[2]].name + " sent to the " + UNITS[pr[1]].name + " lands on her deck",
        t1 > 0 && s.wing().indexOf(j) >= 0, "after " + t1.toFixed(1) + " s, parked " + j.parked + " on " + (j.padOn && j.padOn.def.id));
    var t1b = ticks(60, function () { return j.ammo >= j.ammoMax; });
    chk("...rearms there (" + j.ammoMax + " points of ordnance)", t1b >= 0 && j.ammo >= j.ammoMax, "after " + t1b.toFixed(1) + " s, " + j.ammo + "/" + j.ammoMax);
    j.give({ type: "move", x: s.x - 14 * TT, y: s.y + 3 * TT });
    var t2 = ticks(30, function () { return !j.parked && Math.hypot(j.x - s.x, j.y - s.y) > 5 * TT; });
    chk("...launches from her when sent away", t2 > 0 && !j.parked, "after " + t2.toFixed(1) + " s at " + tiles(Math.hypot(j.x - s.x, j.y - s.y)) + " tiles");
    j.give({ type: "rtb" });
    var t3 = ticks(90, function () { return j.parked && j.padOn === s; });
    chk("...and comes home to her", t3 > 0, "after " + t3.toFixed(1) + " s, home " + (j.padOn && j.padOn.def.id));
    var why2 = Game.orderDeckAircraft(s, pr[2]);
    var t4 = ticks(90, function () { return s.wing().length === 2; });
    chk(pr[0] + ": a second " + UNITS[pr[2]].name + " bought from her panel alongside the yard comes aboard",
        !why2 && t4 > 0 && s.wing().every(function (u) { return u.def.id === pr[2]; }), (why2 || "") + " after " + t4.toFixed(1) + " s, " + s.wing().length + " aboard");
    /* the deck is still planned, delivered and refilled with her helicopter */
    var wants = [];
    s.wing().forEach(gone);
    for (var n = 0; n < 3; n++) {
      var w = Game.deckWants(s); wants.push(w);
      if (!w) break;
      var h = spawn(w, s.x, s.y); h.padOn = s; h.parked = true; h.order = { type: "parked" };
    }
    chk("...and an empty deck still asks for her helicopter, never the jet (what the commander refills with)",
        wants.length === 3 && wants.every(function (x) { return x === TAKES[pr[0]][0]; }), wants.join(","));
    s.wing().forEach(gone); gone(s);
  });

  /* the commander never buys one */
  var src = (typeof readFile === "function") ? readFile("js/ai.js") : null;
  var A = Game.players.filter(function (p) { return p.isAI && !p.defeated; })[0];
  if (!A) { chk("an AI commander to watch", false, ""); useEra("e20"); return; }
  var keep = { faction: A.faction, era: A.era, cash: A.cash, oil: A.oil, tech: A.tech }, seen = [];
  var enq = A.enqueue, ord = Game.orderDeckAircraft;
  A.enqueue = function (q, id) { seen.push(id); return enq.apply(this, arguments); };
  Game.orderDeckAircraft = function (ship, id) { if (ship.owner === A) seen.push("deck:" + id); return ord.apply(this, arguments); };
  var deckFor = { e80: "nato_e80_lha", e20: "lha_n" };
  var built = [];
  try {
    ["e80", "e20"].forEach(function (e) {
      A.faction = "nato"; A.era = e; A.cash = 300000; A.oil = 60000; A.tech = 3;
      var s = Game.spawnUnitAt(A, deckFor[e], at.x * TT + 16, at.y * TT + 16);
      if (s) { s.stance = "hold"; s.order = { type: "idle" }; }
      ticks(120);
      A.units.forEach(function (u) { if (!u.dead && u.def.role === "stovl") built.push(u.def.id); });
      if (s) { s.wing().forEach(gone); (s.deckQ || []).length = 0; gone(s); }
    });
  } catch (err) { built.push("CRASH " + err); }
  A.enqueue = enq; Game.orderDeckAircraft = ord;
  for (var kk in keep) A[kk] = keep[kk];
  var bad = seen.filter(function (id) { return IDS.indexOf(String(id).replace("deck:", "")) >= 0; });
  chk("the commander, made a 1980s and a present-day American with " + seen.length + " purchases and an empty Tarawa and America of its own, never buys a Marine jet" +
      (src !== null ? ", and js/ai.js names no \"stovl\"" : ""),
      bad.length === 0 && built.length === 0 && (src === null || src.indexOf("stovl") < 0),
      "bought " + bad.concat(built).join(",") + "; deck orders " + seen.filter(function (x) { return /^deck:/.test(x); }).join(","));
  useEra("e20");
}

/* ---------------- 8. save and load with a wing and a hold ---------------- */
function secSave() {
  log("\n[8] a save with a helicopter on her deck and two in her hold (last: the load rebuilds the match)");
  useEra("e20");
  var yard = Game.nearestBuilding(P, "navalyard", P.homeX, P.homeY);
  var at = yard ? Path.nearest(M, (yard.x / TT) | 0, (yard.y / TT) | 0, "sea", null, 12) : null;
  if (!at) { chk("open water by the yard", false, ""); return; }
  var s = spawn("lha_n", at.x * TT + 16, at.y * TT + 16);
  var h = spawn("trans_n", s.x, s.y); h.padOn = s; h.parked = true; h.order = { type: "parked" };
  var a = spawn("rifle_n", P.homeX, P.homeY), b = spawn("rifle_n", P.homeX, P.homeY);
  [a, b].forEach(function (u) { s.cargo.push(u); u.carried = true; });
  ticks(0.5);
  var sx = s.x, sy = s.y;
  var r = SaveGame.save(Game, "ironfront.lhdcheck");
  chk("the save is written", r.ok, r.error || r.bytes + " bytes");
  var ld = SaveGame.load("ironfront.lhdcheck");
  chk("and loads", ld.ok, ld.error || "");
  if (!ld.ok) return;
  P = Game.human; M = Game.map;
  var S = null;
  Game.entities.forEach(function (e) { if (e.kind === "unit" && e.def.id === "lha_n" && Math.hypot(e.x - sx, e.y - sy) < 3) S = e; });
  chk("the America is back", !!S, "");
  if (!S) return;
  var w = S.wing(), c = S.cargo;
  chk("her UH-60M is back on her deck, parked", w.length === 1 && w[0].def.id === "trans_n" && w[0].parked && w[0].padOn === S,
      w.map(function (u) { return u.def.id + (u.parked ? " parked" : " flying"); }).join(","));
  chk("her hold is back: two rifle squads, both carried",
      c.length === 2 && c.every(function (u) { return u.carried && !u.dead; }) &&
      same(c.map(function (u) { return u.def.id; }), ["rifle_n", "rifle_n"]), c.map(function (u) { return u.def.id; }).join(","));
  chk("and her deck still takes what it took", same(Game.deckTypesFor(S), TAKES.e20), Game.deckTypesFor(S).join(","));
}
