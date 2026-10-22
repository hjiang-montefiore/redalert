/* tools/jsc/lhd_check.js - the American amphibious assault ships (navy piece
   1 of 8): Iwo Jima LPH, Tarawa LHA, Wasp LHD and America LHA as a helicopter
   deck and a hold, their jets and well deck (pieces 2-3), and the other
   navies' (piece 4) - checked on the real game under JavaScriptCore, 3D off.

     python3 tools/jsc/run.py index.html --test tools/jsc/lhd_check.js

   (owner) "We want an amphibious assault ship which can carry F-35B,
   helicopters, and landing ships." The rows and their sources are at the end
   of js/eras.js and at lha_n in js/rules.js; the deck is G.deckAircraftFor /
   G.deckTypesFor in js/game.js (def.deckTakes). Checked, on hormuz:
     1. each class is in its period only, for the United States only, and the
        naval sidebar's filter shows exactly it;
     2. each is buildable at a naval yard in its period and refused outside
        it; two are built through the naval queue and come out of the yard
        with three of her Marine helicopters on deck (navy piece 5a; until
        then her three spots came empty) and an empty 24-seat hold;
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
     8. the well deck (navy piece 3: eras.js THE WELL DECK, entities.js
        THE WELL DECK): the Tarawa's four LCU 1610 or one LCAC, the Wasp's
        three LCAC or two LCU, none on the Iwo Jima or the America, which
        refuse a craft; craft bought from her panel alongside the yard are
        floated into the well, and refused away from it; the Wasp launches
        them off a coast, the hold feeding them vehicles first, one carries
        a tank to the beach and comes back into the well, leaving the
        player's selection as it goes in; she no longer puts a vehicle on a
        beach herself; a ship sunk takes her craft with her; an LCAC on its
        own is built, loads and lands as it always did, and a tank and a
        squad on the sand board one lying a tile off the beach; her panel's
        own buttons buy, cancel and launch; and the commander never meets
        any of it;
     9. a save with a helicopter on her deck and two aboard her hold loads
        with both, and a Wasp's well - two craft in it, one loaded, one at
        sea and one on order - comes back as it was. (the load rebuilds the
        match, so only 11 runs after it)
    10. the other navies' ships (navy piece 4: eras.js THE OTHER NAVIES'
        AMPHIBIOUS ASSAULT SHIPS, rules.js lhd_f / lhd_c): Ocean, Mistral,
        Type 075 and Ivan Rogov each in its own army and period only, none
        for Germany, Taiwan or North Korea; their rows, fits and the CTM;
        every army's carrier and landing ship unchanged; built at their own
        yard; each deck takes its helicopters and no jet, one lands and is
        bought from her panel; Ocean takes troops only, the Mistral and Type
        075 keep vehicles for their craft, the Ivan Rogov beaches them over
        her bow ramp; what each well takes, four CTM built into a Mistral,
        launched, one landing a tank, all recovered; the commander buys
        none of it;
    11. a Mistral with an NH90 on deck, a squad aboard and two CTM in her
        well (one with a tank) saves and loads as she was;
    12. the Marine Corps' assault helicopters (navy piece 5a: eras.js THE
        MARINE CORPS' ASSAULT HELICOPTERS) - CH-46D/E, CH-53D/E, MV-22B and
        UH-1N - each in its periods only, under a role of their own, in the
        AIR tab, hovering and deck-capable, with their sourced payloads; the
        Army's transport card of every period unchanged; every American
        assault ship's deck laid out for, refilled with and delivered with
        her period's Marine helicopter first, at her old price; one of them
        lands on each period's ship with a squad, launches and puts it on a
        beach; the CH-53E slings a Humvee on its hook, one at a time, and
        refuses an Abrams; and the commander never buys one. (Run before 9,
        since the load rebuilds the match.)
    8b. the gate (entities.js WELL TRANSIT): every well-deck ship has her
        well in her hull's geometry (eras.js def.wellPts) and no other ship
        has; launched, a Wasp's three LCACs start at their berths nose to
        tail inside her, off the board's grid, an order given to one waiting;
        her gate takes 2 s to open and none moves until it is open; each
        runs aft along her centreline, never forward, through the sill and
        clear of it, then to water of its own astern, free, the first taking
        the order it was given; gateOpen holds while any is inside and 3 s
        after the last has passed the sill, and gateT is 0 again 2 s later;
        right-clicked back onto her, each steers for her sill, her gate is
        coming down before it gets there, it glides onto her centreline,
        never passes the sill with the gate short of open, runs up the well
        and is docked at a berth behind the one before it, and the gate
        shuts after; launched while she steams on, the craft keeps to her
        centreline as she moves, and recovered while she steams it comes in
        the same way; sunk with one craft inside her and one clear, the one
        inside goes down with her and the other reaches its water; an
        America (no well) never opens a gate, an LCAC on its own sails as
        before, and an Ivan Rogov putting a tank on a beach lowers her bow
        ramp for 4 s;
    14. the other navies' assault helicopters (navy piece 5b: eras.js THE
        OTHER NAVIES' ASSAULT HELICOPTERS) - the new Sea King HC4 and Ka-29
        each in its own army and periods only, deck-capable, with their
        payloads; the Army's Chinook HC4, Apache AH1, NH90 TTH and Tigre HAD
        reused as deck rows, keeping their roles; every army's transport card
        unchanged; Ocean, Mistral, Type 075 and Ivan Rogov laid out for and
        delivered with their faithful type first, at their old price; one of
        each navy's lands on her with a squad, launches and puts it ashore;
        the commander buys neither; and (in 11) an Ocean saved with her three
        Sea Kings loads with three. (Run before 9.)
    13. saved with two craft driving out of a Wasp's well and one driving in,
        the load puts each back where it was in her frame, in her transit,
        her gate open; driven on, the two reach their water and the third
        docks, and the gate shuts. (Last: the load rebuilds the match.) */
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
/* navy piece 5a put the period's Marine helicopters first; the earlier stand-ins and the jet follow */
var TAKES = { e60: ["nato_e60_ch46", "nato_e60_ch53", "nato_e60_uh1n", "nato_e60_aswhelo"],
              e80: ["nato_e80_ch46", "nato_e80_ch53", "nato_e60_uh1n", "nato_e80_transport", "nato_e80_stovl"],
              e90: ["nato_e80_ch46", "nato_e80_ch53", "nato_e60_uh1n", "nato_e90_aswhelo", "nato_e90_transport", "nato_e90_stovl"],
              e00: ["nato_e00_mv22", "nato_e80_ch46", "nato_e80_ch53", "nato_e60_uh1n", "nato_e00_transport", "nato_e90_stovl"],
              e20: ["nato_e00_mv22", "nato_e80_ch53", "trans_n", "helo_n", "stovl_n"] };
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
  secWell();
  secGate();
  secOthers();
  secAssault();
  secAssault5b();
  secSave();
  secSave4();
  secGateSave();
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
    ERAS.forEach(function (e) { unitsFor(f, "assault_sea", e).forEach(function (id) { if (UNITS[id].fac === "nato") other.push(f + "/" + e + "=" + id); }); }); });
  /* the other armies' own ships are navy piece 4's (section 10) */
  chk("no other army is handed an American assault ship", other.length === 0, other.join(" "));
  var bad = [];
  for (var e in ROW) if (ROW[e]) {
    var d = UNITS[ROW[e]];
    if (!(d.carrier === 3 && d.heloCarrier && !d.emptyDeck && d.cargo === 24 && d.amphib && d.layer === "sea" &&
          d.prereq.indexOf("navalyard") >= 0 && FACTS[ROW[e]] && WARSHIPS[ROW[e]] && WARSHIPS[ROW[e]].deck === "axial" &&
          d.service && d.desc)) bad.push(ROW[e]);
  }
  chk("every row: 3 helicopter spots that sail with her complement (navy piece 5a), a 24-seat amphibious hold, built at the naval yard, a field-manual entry and an axial-deck model",
      bad.length === 0, bad.join(" "));
  var wd = [];
  for (var e2 in ROW) if (ROW[e2] && UNITS[ROW[e2]].wellDeck) wd.push(ROW[e2]);
  chk("a well deck (def.wellDeck) on the Tarawa and the Wasps only, not the Iwo Jima or the America",
      same(wd, ["nato_e80_lha", "nato_e90_lhd", "nato_e00_lhd"]), wd.join(","));
  var WC = { nato_e80_lha: { nato_lcu: 4, lst: 1 }, nato_e90_lhd: { lst: 3, nato_lcu: 2 }, nato_e00_lhd: { lst: 3, nato_lcu: 2 } }, wcBad = [];
  for (var e3 in ROW) if (ROW[e3]) {
    var wc = UNITS[ROW[e3]].wellCraft, want3 = WC[ROW[e3]];
    if (JSON.stringify(wc || null) !== JSON.stringify(want3 || null)) wcBad.push(ROW[e3] + "=" + JSON.stringify(wc));
  }
  chk("the well holds 4 LCU 1610 or 1 LCAC on the Tarawa, 3 LCAC or 2 LCU on the Wasps, nothing on the Iwo Jima or the America",
      wcBad.length === 0, wcBad.join(" "));
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
    var first = TAKES[pr[0]][0];
    chk(pr[0] + ": " + UNITS[pr[1]].name + " comes off the naval yard's slip with three " + UNITS[first].name + "s on her deck and an empty hold",
        ok && !!made && made.deckSlots() === 3 && made.wing().length === 3 &&
        made.wing().every(function (u) { return u.def.id === first && u.parked && u.padOn === made; }) && made.cargo.length === 0 &&
        Math.hypot(made.x - yard.x, made.y - yard.y) < 12 * TT,
        "queued " + ok + ", after " + t.toFixed(1) + " s (list " + P.factionTime(UNITS[pr[1]]) + " s)" + (made ? ", spots " + made.deckSlots() + " aboard " +
        made.wing().map(function (u) { return u.def.id; }).join(",") +
        " at " + tiles(Math.hypot(made.x - yard.x, made.y - yard.y)) + " tiles from the yard" : ""));
    if (made) { made.wing().forEach(gone); gone(made); }
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
  var t = ticks(90, function () { return !sq.carried; });
  ticks(1);
  var ashore = [sq, tk].filter(function (u) {
    return !u.carried && !u.dead && GameMap.passable(M, (u.x / TT) | 0, (u.y / TT) | 0, "ground") &&
           Math.hypot(u.x - aim.x, u.y - aim.y) < 5 * TT; });
  /* navy piece 3: her vehicles go ashore in her landing craft, not over her side */
  chk("she sails out " + out.toFixed(1) + " tiles, runs in to the beach and puts the squad ashore beside it; the tank stays aboard for her landing craft",
      out > 8 && t > 0 && ashore.length === 1 && ashore[0] === sq && tk.carried && s.cargo.indexOf(tk) >= 0 &&
      s.vehiclesKept() === 1 && s.order.type === "idle",
      "after " + t.toFixed(1) + " s, ashore " + ashore.map(function (u) { return u.def.id; }).join(",") + ", tank carried " + tk.carried +
      ", her order " + s.order.type + ", she is at " + tiles(s.x) + "," + tiles(s.y));
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
  chk("the Tarawa and both Wasps take vehicles aboard (their landing craft carry them ashore)", wells.length === 3, wells.join(","));
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

/* ---------------- 8. the well deck (navy piece 3) ---------------- */
/* a sea tile at least `far` tiles from every naval yard of ours, with sea all round it */
function seaAway(far) {
  var yards = P.buildings.filter(function (b) { return b.def.id === "navalyard" && !b.dead; });
  for (var y = 4; y < M.H - 4; y++) for (var x = 4; x < M.W - 4; x++) {
    var ok = true;
    for (var j = -2; j <= 2 && ok; j++) for (var i = -2; i <= 2 && ok; i++)
      if (M.terrain[(y + j) * M.W + x + i] !== T.WATER) ok = false;
    if (!ok) continue;
    if (yards.every(function (b) { return Math.hypot(b.x - (x + 0.5) * TT, b.y - (y + 0.5) * TT) > far * TT; })) return { x: x, y: y };
  }
  return null;
}
function secWell() {
  log("\n[8] the well deck: landing craft bought for it, launched off a coast, landing a tank, recovered");
  var yard = Game.nearestBuilding(P, "navalyard", P.homeX, P.homeY);
  var at = yard ? Path.nearest(M, (yard.x / TT) | 0, (yard.y / TT) | 0, "sea", null, 12) : null;
  if (!at || !BEACH) { chk("open water by the yard, and a beach", false, ""); return; }
  var ax = at.x * TT + 16, ay = at.y * TT + 16;
  /* the LCU 1610 row */
  var rf = function (f) { return typeof readFile === "function" ? readFile(f) : ""; };
  var L = UNITS.nato_lcu, uiSrc = rf("js/ui.js"), aiSrc = rf("js/ai.js");
  chk("the LCU 1610: in service 1957, six seats, amphibious, its own role, bought for a well only (no sidebar card), a field-manual entry and a hull",
      !!L && L.service === "1957" && L.from === "e50" && L.cargo === 6 && L.amphib && L.role === "landing_craft" && L.wellOnly &&
      !!FACTS.nato_lcu && !!WARSHIPS.nato_lcu && same(ROLES.landing_craft || [], ["nato_lcu", "fra_ctm"]) &&
      (ROLES.transport_sea || []).indexOf("nato_lcu") < 0 && (!uiSrc || uiSrc.indexOf("!UNITS[id].wellOnly") >= 0),
      L ? L.service + " " + L.role + " cargo " + L.cargo : "no row");
  var tsea = ["e60", "e80", "e90", "e20"].map(function (e) { return unitFor("nato", "transport_sea", e); });
  chk("the landing ship each period offers is as it was (Newport, then the LCAC)",
      same(tsea, ["nato_e60_lst", "lst", "lst", "lst"]) && tsea[0] === "nato_e60_lst", tsea.join(","));
  var aiNames = ["wellQ", "orderWellCraft", "launchCraft", "launchAll", "wellCraft", "nato_lcu", "landing_craft"].filter(function (k) { return aiSrc.indexOf(k) >= 0; });
  chk("js/ai.js names none of it: the commander builds no assault ship and meets no well deck", aiNames.length === 0, aiNames.join(","));
  /* what each well takes, in her period */
  var TY = { e80: ["nato_lcu", "lst"], e90: ["lst", "nato_lcu"], e00: ["lst", "nato_lcu"] }, tyBad = [];
  for (var e in ROW) if (ROW[e]) {
    useEra(e);
    var s0 = spawn(ROW[e], ax, ay), w0 = s0.wellTypes();
    if (!same(w0, TY[e] || [])) tyBad.push(e + ":" + w0.join("+"));
    gone(s0);
  }
  chk("in her period the Tarawa's well takes the LCU 1610 and the LCAC, the Wasps' the LCAC and the LCU, the Iwo Jima's and the America's nothing",
      tyBad.length === 0, tyBad.join(" "));

  /* the Tarawa: four LCUs, or one LCAC, never both */
  useEra("e80");
  var ta = spawn("nato_e80_lha", ax, ay);
  var r = ["nato_lcu", "nato_lcu", "nato_lcu", "nato_lcu"].map(function (id) { return ta.orderWellCraft(id); });
  var r5 = ta.orderWellCraft("nato_lcu"), r6 = ta.orderWellCraft("lst");
  chk("e80, a Tarawa alongside the yard: four LCU 1610 ordered; a fifth and an LCAC refused, the well full",
      r.every(function (x) { return x === null; }) && /WELL DECK FULL/.test(r5 || "") && /WELL DECK FULL/.test(r6 || "") && ta.wellQ.length === 4,
      r.join(",") + " | " + r5 + " | " + r6);
  ticks(3);
  var paid = ta.wellQ.reduce(function (a, it) { return a + it.paid; }, 0), c0 = P.cash;
  while (ta.wellQ.length) ta.cancelWellOrder(0);
  chk("...cancelled, every credit paid comes back", paid > 0 && Math.abs(P.cash - c0 - paid) < 1, "paid " + paid.toFixed(0) + ", back " + (P.cash - c0).toFixed(0));
  var r7 = ta.orderWellCraft("lst"), r8 = ta.orderWellCraft("nato_lcu");
  chk("...one LCAC fills her well: an LCU beside it is refused", r7 === null && /WELL DECK FULL/.test(r8 || ""), r7 + " | " + r8);
  ta.cancelWellOrder(0);
  ["nato_lcu", "nato_lcu", "nato_lcu", "nato_lcu"].forEach(function (id) { ta.orderWellCraft(id); });
  var tl = ticks(120, function () { return ta.well.length === 4; });
  chk("...four LCUs bought from her panel are built and floated into her well, carried, empty",
      tl > 0 && ta.well.every(function (c) { return c.def.id === "nato_lcu" && c.carried && !c.dead && c.cargo.length === 0; }) && !ta.wellQ.length,
      "after " + tl.toFixed(1) + " s, " + ta.well.length + " in the well (list " + P.factionTime(L) + " s each)");
  ta.well.forEach(gone); ta.well.length = 0; gone(ta);

  /* the Wasp: three LCACs bought alongside, none away from a yard */
  useEra("e00");
  var s = spawn("nato_e00_lhd", ax, ay);
  var cash0 = P.cash, oil0 = P.oil;
  var o = [1, 2, 3].map(function () { return s.orderWellCraft("lst"); }), o4 = s.orderWellCraft("lst"), o5 = s.orderWellCraft("nato_lcu");
  var tw = ticks(150, function () { return s.well.length === 3; });
  var cost = 3 * P.factionCost(UNITS.lst), spent = cash0 - P.cash, burnt = oil0 - P.oil;
  chk("e00, a Wasp alongside the yard: three LCACs ordered and floated into her well; a fourth and an LCU refused, the well full",
      o.every(function (x) { return x === null; }) && /FULL/.test(o4 || "") && /FULL/.test(o5 || "") && tw > 0 &&
      s.well.every(function (c) { return c.def.id === "lst" && c.carried; }),
      "after " + tw.toFixed(1) + " s; " + o.join(",") + " | " + o4 + " | " + o5);
  chk("...at their own price and barrels (" + cost + " credits, " + 3 * UNITS.lst.oil + " bbl) and no faster than the yard builds three (" +
      (3 * P.factionTime(UNITS.lst) / P.prodSpeed("naval")).toFixed(0) + " s)",
      spent > cost * 0.85 && burnt >= 3 * UNITS.lst.oil && tw >= 3 * P.factionTime(UNITS.lst) / P.prodSpeed("naval") - 1,
      "spent " + spent.toFixed(0) + " credits (with the base income running), " + burnt + " bbl, " + tw.toFixed(1) + " s");
  var far = seaAway(14), sF = far ? spawn("nato_e00_lhd", far.x * TT + 16, far.y * TT + 16) : null;
  var rF = sF ? sF.orderWellCraft("lst") : "no water away from the yard";
  chk("a Wasp at sea away from any naval yard cannot buy one", /NOT ALONGSIDE A NAVAL YARD/.test(rF || ""), rF);
  if (sF) gone(sF);

  /* off a coast: the hold feeds the craft, vehicles first */
  var B = BEACH, land = function (k) { return { x: (B.x - B.dx * k + 0.5) * TT, y: (B.y - B.dy * k + 0.5) * TT }; };
  s.x = (B.x + B.dx * 8 + 0.5) * TT; s.y = (B.y + B.dy * 8 + 0.5) * TT; s.order = { type: "idle" }; s.path = null;
  s.ang = Math.atan2(-B.dy, -B.dx);                         // bows to the beach, stern to the sea
  var tk1 = spawn("mbt_n", P.homeX, P.homeY), tk2 = spawn("mbt_n", P.homeX, P.homeY), sq = spawn("rifle_n", P.homeX, P.homeY);
  [sq, tk1, tk2].forEach(function (u) { s.cargo.push(u); u.carried = true; });
  var craft = s.well.slice(), n = s.launchAll();
  /* they drive out through her stern gate (WELL TRANSIT, section 8b) */
  var tclr = ticks(30, function () { return craft.every(function (c) { return !c.wellT; }); });
  var c1 = craft[0], wet = craft.filter(function (c) {
    return !c.carried && GameMap.passable(M, (c.x / TT) | 0, (c.y / TT) | 0, "sea") && Math.hypot(c.x - s.x, c.y - s.y) < 5 * TT; });
  var tilesU = {}; craft.forEach(function (c) { tilesU[((c.x / TT) | 0) + "," + ((c.y / TT) | 0)] = 1; });
  var astern = craft.every(function (c) { return (c.x - s.x) * Math.cos(s.ang) + (c.y - s.y) * Math.sin(s.ang) < 0; });
  chk("8 tiles off the beach she launches all three out of her stern onto open water, each on its own tile",
      n === 3 && s.well.length === 0 && wet.length === 3 && Object.keys(tilesU).length === 3 && astern,
      n + " launched, clear of her after " + tclr.toFixed(1) + " s, " + wet.length + " afloat within 5 tiles, " + Object.keys(tilesU).length + " tiles, astern " + astern);
  chk("...the first takes the hold: both tanks first, then the squad; the hold is empty",
      c1.cargo.length === 3 && c1.cargo[0].cat === "vehicle" && c1.cargo[1].cat === "vehicle" && c1.cargo[2] === sq &&
      s.cargo.length === 0 && [tk1, tk2, sq].every(function (u) { return u.carried; }),
      c1.cargo.map(function (u) { return u.def.id; }).join(",") + "; hold " + s.cargo.length);
  /* to the beach, as a right-click on the shore orders it (ui.js unloadAt) */
  var aim = land(1);
  c1.give({ type: "move", x: aim.x, y: aim.y, unloadAt: true });
  var tb = ticks(60, function () { return c1.cargo.length === 0; });
  ticks(0.5);
  var up = [tk1, tk2, sq].filter(function (u) {
    return !u.carried && !u.dead && GameMap.passable(M, (u.x / TT) | 0, (u.y / TT) | 0, "ground") && Math.hypot(u.x - aim.x, u.y - aim.y) < 5 * TT; });
  chk("...an LCAC sent to the beach lands both tanks and the squad on it", tb > 0 && up.length === 3,
      "after " + tb.toFixed(1) + " s, ashore " + up.length + "/3");
  /* and back into the well - picked with her, they leave the selection as
     they go in, and she stays in it */
  sel(craft.concat([s]));
  craft.forEach(function (c) { c.give({ type: "enter", target: s }); });
  var tr = ticks(60, function () { return s.well.length === 3; });
  var selNow = UI.selection.slice();
  chk("...right-clicked back onto her, all three sail into her well and are carried again, and leave the selection she is still in",
      tr > 0 && craft.every(function (c) { return c.carried && s.well.indexOf(c) >= 0 && selNow.indexOf(c) < 0 && !c.selected; }) &&
      selNow.length === 1 && selNow[0] === s,
      "after " + tr.toFixed(1) + " s, " + s.well.length + " in the well; selection " + selNow.map(function (u) { return u.def.id; }).join(","));
  sel([]);
  var c4 = spawn("lst", s.x + Math.cos(s.ang) * 3 * TT, s.y + Math.sin(s.ang) * 3 * TT);
  var w4 = s.wellRefusal(c4);
  c4.give({ type: "enter", target: s });
  ticks(3);
  chk("...a fourth LCAC is refused: the well is full", /WELL DECK FULL/.test(w4) && !c4.carried && c4.order.type === "idle" && s.well.length === 3,
      "\"" + w4 + "\", carried " + c4.carried + ", order " + c4.order.type);

  /* no well deck: the America and the Iwo Jima refuse a craft */
  [["e20", "lha_n"], ["e60", "nato_e60_lph"]].forEach(function (pr) {
    useEra(pr[0]);
    var a = spawn(pr[1], c4.x + 2 * TT, c4.y);
    var why = a.wellRefusal(c4), whyO = a.orderWellCraft("lst");
    c4.give({ type: "enter", target: a });
    ticks(3);
    chk(pr[0] + ": the " + UNITS[pr[1]].name + " has no well deck: she refuses the LCAC (it stays at sea), sells none, and lists none",
        /NO WELL DECK/.test(why) && /NO WELL DECK/.test(whyO || "") && !c4.carried && c4.order.type === "idle" && a.wellTypes().length === 0 && !a.well.length,
        "\"" + why + "\" | \"" + whyO + "\", carried " + c4.carried);
    gone(a);
  });
  useEra("e00");

  /* sunk with her craft in the well, they go down with her - and what they carry */
  var rider = spawn("rifle_n", P.homeX, P.homeY);
  s.well[0].cargo.push(rider); rider.carried = true;
  var inWell = s.well.slice();
  s.wellQ = [{ id: "lst", paid: 200 }];                   // and one on order, part paid
  var cK = P.cash;
  Combat.kill(Game, s, null);
  ticks(0.5);
  chk("a Wasp sunk with three craft in her well takes them down with her, and the squad aboard one; what was paid on order comes back",
      s.dead && inWell.every(function (c) { return c.dead; }) && rider.dead && P.cash - cK >= 199.5 && !s.wellQ.length,
      inWell.map(function (c) { return c.dead; }).join(",") + " rider " + rider.dead + ", refunded " + (P.cash - cK).toFixed(0));
  [tk1, tk2, sq].forEach(gone);

  /* an LCAC on its own: still built at the yard, and still lands a tank it carries */
  var lk = P.lockReason(UNITS.lst);
  c4.x = (B.x + B.dx * 9 + 0.5) * TT; c4.y = (B.y + B.dy * 9 + 0.5) * TT; c4.order = { type: "idle" }; c4.path = null;
  var tk3 = spawn("mbt_n", P.homeX, P.homeY);
  c4.cargo.push(tk3); tk3.carried = true;
  c4.give({ type: "move", x: aim.x, y: aim.y, unloadAt: true });
  var tu = ticks(60, function () { return !tk3.carried; });
  ticks(0.5);
  var nonDeck = Object.keys(UNITS).filter(function (id) { var d = UNITS[id]; return d.amphib && !d.carrier && Unit.craftOnly(d); });
  chk("an LCAC on its own is still built at the yard and still runs a tank in to the beach and lands it; no landing craft or ship keeps vehicles back",
      lk === null && tu > 0 && !tk3.carried && GameMap.passable(M, (tk3.x / TT) | 0, (tk3.y / TT) | 0, "ground") &&
      Math.hypot(tk3.x - aim.x, tk3.y - aim.y) < 5 * TT && nonDeck.length === 0,
      "lock " + lk + ", landed after " + tu.toFixed(1) + " s" + (nonDeck.length ? "; " + nonDeck.join(",") : ""));
  gone(tk3); gone(c4);

  /* boarding from the beach (entities.js updateEnter, the reach): a tank and
     a squad on the sand step into an LCAC lying one tile off it, where they
     used to stop on the sand for good; one two tiles off is still out of reach */
  var off = function (k) { return { x: (B.x + B.dx * k + 0.5) * TT, y: (B.y + B.dy * k + 0.5) * TT }; };
  var sand = { x: (B.x + 0.5) * TT, y: (B.y + 0.5) * TT };
  var o1 = off(2), bc1 = spawn("lst", o1.x, o1.y), btk = spawn("mbt_n", sand.x, sand.y), bsq = spawn("rifle_n", sand.x, sand.y);
  var g1 = Math.hypot(bc1.x - btk.x, bc1.y - btk.y) / TT;
  btk.give({ type: "enter", target: bc1 }); bsq.give({ type: "enter", target: bc1 });
  var tbd = ticks(10, function () { return btk.carried && bsq.carried; });
  chk("a tank and a squad on the beach board an LCAC lying one tile off it (" + g1.toFixed(1) + " tiles centre to centre)",
      tbd > 0 && bc1.cargo.indexOf(btk) >= 0 && bc1.cargo.indexOf(bsq) >= 0,
      "after " + tbd.toFixed(1) + " s; tank carried " + btk.carried + " (" + btk.order.type + "), squad carried " + bsq.carried + " (" + bsq.order.type + ")");
  var o2 = off(3), bc2 = spawn("lst", o2.x, o2.y), btk2 = spawn("mbt_n", sand.x, sand.y);
  btk2.give({ type: "enter", target: bc2 });
  ticks(5);
  chk("...one lying two tiles off is out of reach: the tank stays on the sand",
      !btk2.carried && bc2.cargo.length === 0, (Math.hypot(bc2.x - btk2.x, bc2.y - btk2.y) / TT).toFixed(1) + " tiles, carried " + btk2.carried);
  [btk, bsq, btk2, bc1, bc2].forEach(gone);

  /* her panel's own buttons (ui.js wellPanel, bindWell), pressed */
  var pw = spawn("nato_e00_lhd", ax, ay), pk1 = spawn("lst", ax, ay), pk2 = spawn("lst", ax, ay);
  pw.dockCraft(pk1); pw.dockCraft(pk2);
  var pt1 = spawn("mbt_n", P.homeX, P.homeY), pt2 = spawn("mbt_n", P.homeX, P.homeY);
  [pt1, pt2].forEach(function (u) { pw.cargo.push(u); u.carried = true; });
  sel([pw]);
  var btn = panelButtons(), h0 = panel();
  var buys = (btn.wellbuy || []).map(function (b) { return b.dataset.wellbuy; });
  chk("her panel shows the well: two LCACs each with a launch arrow, LAUNCH CRAFT (2), and an LCAC to buy (an LCU will not fit beside two)",
      /WELL DECK/.test(h0) && h0.indexOf("LAUNCH CRAFT (2)") >= 0 && (btn.welllaunch || []).length === 2 && (btn.wellall || []).length === 1 &&
      same(buys, ["lst"]),
      Object.keys(btn).map(function (k) { return k + " x" + btn[k].length; }).join(", ") + "; buys " + buys.join(","));
  press(btn, "wellbuy", 0);
  var qd = pw.wellQ.length;
  ticks(1);
  btn = panelButtons();
  var pPaid = pw.wellQ.length ? pw.wellQ[0].paid : 0, cB = P.cash;
  press(btn, "wellcancel", 0);
  chk("+ orders an LCAC for her well; x cancels it and every credit paid comes back",
      qd === 1 && pPaid > 0 && !pw.wellQ.length && Math.abs(P.cash - cB - pPaid) < 1,
      "ordered " + qd + ", paid " + pPaid.toFixed(0) + ", back " + (P.cash - cB).toFixed(0));
  btn = panelButtons();
  press(btn, "welllaunch", 1);
  chk("the arrow on the second craft launches it alone, with both tanks from the hold",
      !pk2.carried && pk2.cargo.length === 2 && pk2.cargo.indexOf(pt1) >= 0 && pk2.cargo.indexOf(pt2) >= 0 &&
      pw.well.length === 1 && pw.well[0] === pk1 && !pw.cargo.length,
      "well " + pw.well.length + ", it carries " + pk2.cargo.length + ", hold " + pw.cargo.length);
  btn = panelButtons();
  press(btn, "wellall", 0);
  ticks(30, function () { return !pk1.wellT && !pk2.wellT; });
  chk("LAUNCH CRAFT floats out the other, onto open water", !pk1.carried && !pw.well.length && !pk1.wellT &&
      GameMap.passable(M, (pk1.x / TT) | 0, (pk1.y / TT) | 0, "sea"),
      "well " + pw.well.length + ", carried " + pk1.carried + ", at " + tiles(pk1.x) + "," + tiles(pk1.y));
  panelButtons(true);
  sel([]);
  [pt1, pt2, pk1, pk2, pw].forEach(gone);
  useEra("e20");
}
/* The well panel's buttons (ui.js bindWell). jsc parses no panel markup, so
   the ".well" box the binder asks #selinfo for is a stand-in that lists the
   buttons the markup names; the page's own listeners bind to those, and
   press() runs them as a mousedown would. panelButtons(true) puts #selinfo
   back. */
var BTN = null;
function panelButtons(done) {
  var el = document.getElementById("selinfo");
  if (done) { if (el.__wellQS) { el.querySelector = el.__wellQS; el.__wellQS = null; } return null; }
  if (!el.__wellQS) {
    el.__wellQS = el.querySelector;
    el.querySelector = function (q) {
      if (q !== ".well" || !BTN) return el.__wellQS.call(this, q);
      return { querySelectorAll: function (s2) {
        var m = /^\[data-([\w-]+)\]$/.exec(s2), out = [];
        if (!m) return out;
        var re = new RegExp("data-" + m[1] + "=\"([^\"]*)\"", "g"), mm, html = panel();
        while ((mm = re.exec(html))) {
          var b = { dataset: {}, fns: [], addEventListener: function (ty, f) { if (ty === "mousedown") this.fns.push(f); } };
          b.dataset[m[1]] = mm[1];
          out.push(b); (BTN[m[1]] = BTN[m[1]] || []).push(b);
        }
        return out;
      } };
    };
  }
  BTN = {};
  UI.frame(DT);
  var got = BTN; BTN = null;
  return got;
}
function press(btns, kind, i) {
  var b = btns[kind] && btns[kind][i];
  if (!b) return false;
  b.fns.forEach(function (f) { f({ type: "mousedown", button: 0, stopPropagation: function () {}, preventDefault: function () {} }); });
  return true;
}
function sel(list) {
  var s = UI.selection; for (var i = 0; i < s.length; i++) s[i].selected = false; s.length = 0;
  list.forEach(function (u) { u.selected = true; s.push(u); });
}
function panel() { return String((document.getElementById("selinfo") || {}).innerHTML || ""); }

/* ---------------- 8b. the gate: craft driven out of the well and back in ---------------- */
/* entities.js WELL TRANSIT. A sea tile with water all round it for R tiles */
function openSea(R) {
  for (var y = R + 1; y < M.H - R - 1; y++) for (var x = R + 1; x < M.W - R - 1; x++) {
    var ok = true;
    for (var j = -R; j <= R && ok; j++) for (var i = -R; i <= R && ok; i++)
      if (M.terrain[(y + j) * M.W + x + i] !== T.WATER) ok = false;
    if (ok) return { x: (x + 0.5) * TT, y: (y + 0.5) * TT };
  }
  return null;
}
/* where c is in s's frame: px along her (+ forward) and across */
function rel(s, c) {
  var dx = c.x - s.x, dy = c.y - s.y, co = Math.cos(s.ang), si = Math.sin(s.ang);
  return { s: dx * co + dy * si, l: -dx * si + dy * co };
}
function inGrid(c) { var f = false; Game.grid.query(c.x, c.y, 4, function (e) { if (e === c) f = true; }); return f; }
function onSea(c) { return GameMap.passable(M, (c.x / TT) | 0, (c.y / TT) | 0, "sea"); }
function secGate() {
  log("\n[8b] the gate: craft driven out of her well through the stern gate and back in (WELL TRANSIT)");
  useEra("e00");
  /* (a) where the well lies, in the game's own data */
  var wd = Object.keys(UNITS).filter(function (id) { return UNITS[id].wellDeck; }), badW = [];
  wd.forEach(function (id) {
    var wp = UNITS[id].wellPts;
    if (!wp || !(wp.exit >= -wp.len / 2 - 1e-6 && wp.exit < -wp.len / 2 + 10) || Math.abs(wp.inner - wp.exit - wp.well / 2) > 1e-6) badW.push(id);
  });
  var nw = Object.keys(UNITS).filter(function (id) { return UNITS[id].wellPts && !UNITS[id].wellDeck; });
  var ax = Unit.wellAxis(UNITS.nato_e00_lhd);
  chk("every well-deck ship (" + wd.length + ") has her well in her hull's geometry - the sill at her stern, the first berth mid-well - and no other ship has",
      wd.length >= 9 && !badW.length && !nw.length && !!ax && ax.exit < ax.inner && ax.inner < 0,
      badW.concat(nw).join(",") + (ax ? " Wasp: sill " + ax.exit.toFixed(1) + " px, first berth " + ax.inner.toFixed(1) + " px" : ""));
  var O = openSea(8) || openSea(5);
  if (!O || !ax) { chk("open sea for the gate", false, ""); return; }
  var G0 = WELL_GO;

  /* (b) launched */
  var s = spawn("nato_e00_lhd", O.x, O.y); s.ang = 0.6;
  var k = [spawn("lst", O.x, O.y), spawn("lst", O.x, O.y), spawn("lst", O.x, O.y)];
  k.forEach(function (c) { s.dockCraft(c); });
  var tk = spawn("mbt_n", P.homeX, P.homeY); s.cargo.push(tk); tk.carried = true;
  var n = s.launchAll(), r0 = k.map(function (c) { return rel(s, c); });
  var far = { x: s.x - Math.cos(s.ang) * 7 * TT, y: s.y - Math.sin(s.ang) * 7 * TT };
  k[0].give({ type: "move", x: far.x, y: far.y });
  ticks(DT);
  chk("launched, the three LCACs start at their berths in her well, nose to tail aft from its middle, inside her and off the board's grid; her gate is ordered open and still shut",
      n === 3 && k.every(function (c) { return c.wellT && c.wellT.ph === "out" && !c.carried && c.inWell() && !inGrid(c); }) &&
      Math.abs(r0[0].s - ax.inner) < 0.5 && r0[1].s < r0[0].s - 5 && r0[2].s < r0[1].s - 5 && r0[2].s > ax.exit &&
      r0.every(function (r) { return Math.abs(r.l) < 0.5; }) && s.gateOpen && s.gateT < 0.1,
      "berths " + r0.map(function (r) { return r.s.toFixed(1); }).join(", ") + " px (sill " + ax.exit.toFixed(1) + "); gate " + s.gateT.toFixed(2));
  chk("...an order given to one in the well waits", k[0].order.type === "idle" && k[0].orders.length === 1 && k[0].orders[0].type === "move",
      k[0].order.type + ", " + k[0].orders.length + " waiting");
  var t = DT, tOpen = -1, waitOk = true, mono = true, maxL = 0, prevS = r0.map(function (r) { return r.s; }), minS = prevS.slice();
  var clearAt = [-1, -1, -1], ordAt = [], gateDuring = true, tSill = -1, tOff = -1, tShut = -1;
  for (var i = 0; i < 40 / DT; i++) {
    Game.tick(DT); t += DT;
    if (tOpen < 0 && s.gateT >= 1) tOpen = t;
    var anyIn = false;
    k.forEach(function (c, j) {
      if (c.wellT && c.wellT.ph === "out") {
        anyIn = true;
        var r = rel(s, c);
        if (s.gateT < 1 && Math.abs(r.s - prevS[j]) > 0.01) waitOk = false;
        if (r.s > prevS[j] + 0.01) mono = false;
        maxL = Math.max(maxL, Math.abs(r.l));
        prevS[j] = r.s; minS[j] = Math.min(minS[j], r.s);
      }
      if (clearAt[j] < 0 && !c.wellT) { clearAt[j] = t; ordAt[j] = c.order.type; }
    });
    if (anyIn && !s.gateOpen) gateDuring = false;
    if (!anyIn && tSill < 0) tSill = t;
    if (tSill > 0 && tOff < 0 && !s.gateOpen) tOff = t;
    if (tOff > 0 && s.gateT === 0) { tShut = t; break; }
  }
  var door = ax.exit - k[0].r;
  chk("her gate takes " + G0.GATE + " s to open, and no craft moves in the well until it is open",
      Math.abs(tOpen - G0.GATE) < 0.1 && waitOk, "open at " + tOpen.toFixed(2) + " s");
  chk("...each runs aft along her centreline, never forward, through the sill until its length is clear of it",
      mono && maxL < 0.5 && minS.every(function (m) { return m <= door + 1; }),
      "furthest aft in her frame " + minS.map(function (m) { return m.toFixed(1); }).join(", ") + " px (clear at " + door.toFixed(1) + "), off her centreline " + maxL.toFixed(2) + " px");
  var tiles3 = {}; k.forEach(function (c) { tiles3[((c.x / TT) | 0) + "," + ((c.y / TT) | 0)] = 1; });
  chk("...then each goes on to water of its own astern and is free; the one ordered in the well takes its order",
      clearAt.every(function (x) { return x > 0; }) && k.every(function (c) { return !c.wellT && onSea(c) && rel(s, c).s < ax.exit && inGrid(c); }) &&
      Object.keys(tiles3).length === 3 && ordAt[0] === "move" && ordAt[1] === "idle" && k[0].cargo.indexOf(tk) >= 0,
      "free at " + clearAt.map(function (x) { return x.toFixed(1); }).join(", ") + " s; " + Object.keys(tiles3).length + " tiles; then " + ordAt.join(", "));
  chk("her gate is open (gateOpen) while any is inside, shuts " + G0.HOLD + " s after the last has passed the sill and is closed (gateT 0) " + G0.GATE + " s later",
      gateDuring && tSill > 0 && Math.abs(tOff - tSill - G0.HOLD) < 0.1 && Math.abs(tShut - tOff - G0.GATE) < 0.1,
      "last past the sill " + tSill.toFixed(2) + " s, gateOpen false " + tOff.toFixed(2) + " s, shut " + tShut.toFixed(2) + " s");

  /* (c) recovered */
  k.forEach(function (c) { c.give({ type: "enter", target: s }); });
  var appAt = [], gateAtApp = [], shutInside = false, monoIn = true, prevIn = [null, null, null], fillMax = 0, maxL2 = 0, docked = [];
  t = 0; tSill = -1; tOff = -1; tShut = -1;
  for (i = 0; i < 90 / DT; i++) {
    Game.tick(DT); t += DT;
    fillMax = Math.max(fillMax, s.wellFill());
    k.forEach(function (c, j) {
      var w = c.wellT;
      if (w && w.ship === s && appAt[j] === undefined) {
        var r = rel(s, c);
        appAt[j] = Math.hypot(r.s - (ax.exit - c.r - 2), r.l); gateAtApp[j] = s.gateT;
      }
      if (w && w.ph === "in") {
        var r2 = rel(s, c);
        if (r2.s > ax.exit - c.r + 0.5 && s.gateT < 1) shutInside = true;
        if (prevIn[j] !== null && r2.s < prevIn[j] - 0.01) monoIn = false;
        maxL2 = Math.max(maxL2, Math.abs(r2.l));
        prevIn[j] = r2.s;
      }
      if (c.carried && docked.indexOf(c) < 0) docked.push(c);
    });
    if (docked.length === 3 && tSill < 0) tSill = t;
    if (tSill > 0 && tOff < 0 && !s.gateOpen) tOff = t;
    if (tOff > 0 && s.gateT === 0) { tShut = t; break; }
  }
  chk("right-clicked back onto her, each steers for her sill (taken in within 0.6 tiles of it), and her gate is already coming down when the first gets there",
      appAt.length === 3 && appAt.every(function (d) { return d < 0.6 * TT + 1; }) && Math.max.apply(null, gateAtApp) > 0,
      "taken in " + appAt.map(function (d) { return (d / TT).toFixed(2); }).join(", ") + " tiles from the sill, gate " + gateAtApp.map(function (g) { return g.toFixed(2); }).join(", "));
  chk("...none passes the sill with the gate short of open; each runs up the well on her centreline, never back, and is docked",
      !shutInside && monoIn && maxL2 < 0.5 && docked.length === 3 && k.every(function (c) { return c.carried && s.well.indexOf(c) >= 0 && !c.wellT; }) && fillMax <= 1 + 1e-6,
      docked.length + " docked after " + tSill.toFixed(1) + " s; off her centreline " + maxL2.toFixed(2) + " px; the well at most " + fillMax.toFixed(2) + " full");
  chk("...and her gate shuts " + G0.HOLD + " s after the last is in and is closed " + G0.GATE + " s later",
      tOff > 0 && Math.abs(tOff - tSill - G0.HOLD) < 0.1 && tShut > 0 && Math.abs(tShut - tOff - G0.GATE) < 0.1 && !s.wellGo.length,
      "in " + tSill.toFixed(2) + " s, gateOpen false " + tOff.toFixed(2) + " s, shut " + tShut.toFixed(2) + " s");
  k.forEach(function (c) { c.cargo.forEach(gone); c.cargo.length = 0; });
  [k[1], k[2]].forEach(function (c) { s.well.splice(s.well.indexOf(c), 1); gone(c); });

  /* (d) launched and recovered while she steams on */
  var go = { x: s.x + Math.cos(s.ang) * 30 * TT, y: s.y + Math.sin(s.ang) * 30 * TT };
  var goT = Path.nearest(M, (go.x / TT) | 0, (go.y / TT) | 0, "sea", null, 6);
  if (goT) go = { x: (goT.x + 0.5) * TT, y: (goT.y + 0.5) * TT };
  s.give({ type: "move", x: go.x, y: go.y });
  ticks(3);
  var c0 = k[0], x0 = s.x, y0 = s.y, ln = s.launchCraft(c0), maxL3 = 0, outOk = true, moved = 0;
  for (i = 0; i < 20 / DT && c0.wellT && c0.wellT.ph === "out"; i++) {
    Game.tick(DT);
    if (c0.wellT && c0.wellT.ph === "out") {
      var r3 = rel(s, c0);
      maxL3 = Math.max(maxL3, Math.abs(r3.l));
      if (r3.s > c0.wellT.to + 0.5 || r3.s < ax.exit - c0.r - 0.5) outOk = false;
      moved = Math.hypot(s.x - x0, s.y - y0);
    }
  }
  ticks(10, function () { return !c0.wellT; });
  chk("launched while she steams on, the craft keeps to her centreline in the well as she moves, and reaches its water",
      typeof ln === "number" && outOk && maxL3 < 0.5 && moved > TT && s.order.type === "move" && !c0.wellT && onSea(c0),
      "she made " + tiles(moved) + " tiles while it was in the well; off her centreline " + maxL3.toFixed(2) + " px; she " + s.order.type);
  s.give({ type: "move", x: O.x, y: O.y });                // and on, back the way she came
  c0.give({ type: "enter", target: s });
  var maxL4 = 0, sawIn = false, inX = null, moved2 = 0;
  var tin = ticks(60, function () {
    if (c0.wellT && c0.wellT.ph === "in") {
      sawIn = true; maxL4 = Math.max(maxL4, Math.abs(rel(s, c0).l));
      if (!inX) inX = { x: s.x, y: s.y };
      moved2 = Math.hypot(s.x - inX.x, s.y - inX.y);
    }
    return c0.carried;
  });
  chk("...and recovered while she still steams, it comes in through the gate on her centreline",
      tin > 0 && sawIn && maxL4 < 0.5 && s.well.indexOf(c0) >= 0 && moved2 > TT * 0.5,
      "in after " + tin.toFixed(1) + " s, she made " + tiles(moved2) + " tiles while it ran up the well, off her centreline " + maxL4.toFixed(2) + " px");
  s.order = { type: "idle" }; s.path = null;

  /* (e) sunk with one inside and one clear of her */
  var k2 = spawn("lst", s.x, s.y); s.dockCraft(k2);
  var both = s.well.slice();                               // c0 at the head, k2 behind it
  s.launchAll();
  ticks(20, function () { return both[1].wellT && both[1].wellT.ph === "off"; });
  var inside = both[0].inWell(), clear = both[1].wellT && both[1].wellT.ph === "off";
  Combat.kill(Game, s, null);
  ticks(10, function () { return !both[1].wellT; });
  chk("sunk with one craft inside her and one clear of her sill, the one inside goes down with her; the other reaches its water",
      inside && clear && s.dead && both[0].dead && !both[1].dead && !both[1].wellT && onSea(both[1]),
      "inside " + inside + " dead " + both[0].dead + "; clear " + clear + " dead " + both[1].dead + " free " + !both[1].wellT);
  gone(both[1]); gone(tk);

  /* (f) untouched: a ship without a well, an LCAC on its own */
  useEra("e20");
  var am = spawn("lha_n", O.x, O.y), lc = spawn("lst", O.x + 3 * TT, O.y);
  lc.give({ type: "move", x: O.x + 3 * TT, y: O.y + 4 * TT });
  var tl = ticks(15, function () { return Math.hypot(lc.x - O.x - 3 * TT, lc.y - O.y - 4 * TT) < TT * 0.8; });
  chk("an America (no well) has no gate and never opens one; an LCAC on its own sails where it is sent, as before",
      !Unit.wellAxis(am.def) && !am.gateT && !am.gateHold && !am.gateOpen && !(am.wellGo && am.wellGo.length) &&
      tl > 0 && !lc.wellT && inGrid(lc),
      "America gate " + am.gateT + "; LCAC there after " + tl.toFixed(1) + " s");
  gone(am); gone(lc);

  /* (g) the Ivan Rogov's bow ramp */
  var fac0 = P.faction;
  as("pact", "e80");
  var B = BEACH, ir = spawn("pact_e80_lpd", (B.x + B.dx * 2 + 0.5) * TT, (B.y + B.dy * 2 + 0.5) * TT);
  ir.ang = Math.atan2(-B.dy, -B.dx);
  var rt = spawn("mbt_n", P.homeX, P.homeY); ir.cargo.push(rt); rt.carried = true;
  var nu = ir.unload((B.x - B.dx + 0.5) * TT, (B.y - B.dy + 0.5) * TT), rh = ir.rampHold;
  var tr0 = ticks(G0.RAMP + 1, function () { return !(ir.rampHold > 0); });
  chk("an Ivan Rogov putting a tank on a beach lowers her bow ramp for " + G0.RAMP + " s; her stern gate stays shut",
      nu === 1 && rh === G0.RAMP && Math.abs(tr0 - G0.RAMP) < 0.1 && !ir.gateT && !ir.gateOpen,
      nu + " landed, ramp held " + rh + " s, up after " + tr0.toFixed(2) + " s");
  gone(rt); gone(ir);
  P.faction = fac0; useEra("e20");
}

/* ---------------- 9. save and load with a wing and a hold ---------------- */
function secSave() {
  log("\n[9] a save with a helicopter on her deck and two in her hold, and a Wasp's well (last: the load rebuilds the match)");
  useEra("e20");
  var yard = Game.nearestBuilding(P, "navalyard", P.homeX, P.homeY);
  var at = yard ? Path.nearest(M, (yard.x / TT) | 0, (yard.y / TT) | 0, "sea", null, 12) : null;
  if (!at) { chk("open water by the yard", false, ""); return; }
  var s = spawn("lha_n", at.x * TT + 16, at.y * TT + 16);
  var h = spawn("trans_n", s.x, s.y); h.padOn = s; h.parked = true; h.order = { type: "parked" };
  var a = spawn("rifle_n", P.homeX, P.homeY), b = spawn("rifle_n", P.homeX, P.homeY);
  [a, b].forEach(function (u) { s.cargo.push(u); u.carried = true; });
  /* a Wasp: two LCACs in her well, one with a tank aboard; a third at sea
     with a squad; a fourth on order, part paid */
  var wx = s.x + 6 * TT, wy = s.y;
  var wsp = Path.nearest(M, (wx / TT) | 0, (wy / TT) | 0, "sea", null, 8);
  if (wsp) { wx = wsp.x * TT + 16; wy = wsp.y * TT + 16; }
  var ws = spawn("nato_e00_lhd", wx, wy);
  var k1 = spawn("lst", wx, wy), k2 = spawn("lst", wx, wy), k3 = spawn("lst", wx + 3 * TT, wy);
  ws.dockCraft(k1); ws.dockCraft(k2);
  var wt = spawn("mbt_n", P.homeX, P.homeY), wq = spawn("rifle_n", P.homeX, P.homeY);
  k1.cargo.push(wt); wt.carried = true; k3.cargo.push(wq); wq.carried = true;
  ws.wellQ = [{ id: "lst", paid: 300 }];
  ticks(0.5);
  var wpaid = Math.round(ws.wellQ[0].paid);
  var wsx = ws.x, wsy = ws.y, k3x = k3.x, k3y = k3.y;
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
  var WS = null, K3 = null;
  Game.entities.forEach(function (e) {
    if (e.kind !== "unit" || e.dead) return;
    if (e.def.id === "nato_e00_lhd" && Math.hypot(e.x - wsx, e.y - wsy) < 3) WS = e;
    if (e.def.id === "lst" && !e.carried && Math.hypot(e.x - k3x, e.y - k3y) < 3) K3 = e;
  });
  var WW = WS ? WS.well : [];
  chk("the Wasp's well is back: two LCACs, carried, one with the tank aboard it, carried too",
      !!WS && WW.length === 2 && WW.every(function (c) { return c.def.id === "lst" && c.carried && !c.dead; }) &&
      WW.filter(function (c) { return c.cargo.length === 1 && c.cargo[0].def.id === "mbt_n" && c.cargo[0].carried; }).length === 1,
      WS ? WW.map(function (c) { return c.def.id + "[" + c.cargo.map(function (u) { return u.def.id; }).join("+") + "]" + (c.carried ? " carried" : " LOOSE"); }).join(", ") : "no Wasp");
  chk("...the LCAC at sea is back at sea with its squad, and her order with what was paid (" + wpaid + ")",
      !!K3 && K3.cargo.length === 1 && K3.cargo[0].def.id === "rifle_n" && !!WS && WS.wellQ && WS.wellQ.length === 1 &&
      WS.wellQ[0].id === "lst" && WS.wellQ[0].paid === wpaid,
      (K3 ? "at sea with " + K3.cargo.length : "no craft at sea") + "; order " + (WS && WS.wellQ ? JSON.stringify(WS.wellQ) : "none"));
  if (WS && WW.length) {
    var n9 = WS.launchAll();
    chk("...and launches again from the loaded game", n9 === 2 && WS.well.length === 0, n9 + " launched");
  }
}

/* ---------------- 10. the other navies' assault ships (navy piece 4) ---------------- */
/* eras.js THE OTHER NAVIES' AMPHIBIOUS ASSAULT SHIPS, rules.js lhd_f / lhd_c:
   faction, period, deck spots, hold seats, what the deck takes, the well */
var OTH = {
  gbr_e90_lph:  { f: "gbr",  e: "e90", spots: 3, cargo: 12, takes: ["gbr_e80_seaking4", "gbr_e90_aswhelo"], well: null },
  gbr_e00_lph:  { f: "gbr",  e: "e00", spots: 3, cargo: 12, takes: ["gbr_e80_seaking4", "gbr_e00_transport", "gbr_e00_gunship", "gbr_e00_aswhelo"], well: null },
  fra_e00_lhd:  { f: "fra",  e: "e00", spots: 3, cargo: 6,  takes: ["fra_e00_transport", "fra_e00_gunship", "fra_e00_aswhelo"], well: { fra_ctm: 4 } },
  lhd_f:        { f: "fra",  e: "e20", spots: 3, cargo: 6,  takes: ["trans_f", "helo_f", "asw_helo_f"], well: { fra_ctm: 4 } },
  lhd_c:        { f: "pla",  e: "e20", spots: 3, cargo: 11, takes: ["trans_c", "helo_c"], well: { lst: 3 } },
  pact_e80_lpd: { f: "pact", e: "e80", spots: 2, cargo: 7,  takes: ["pact_e80_ka29", "pact_e80_aswhelo"], well: { lst: 3 }, ramp: true },
  pact_e90_lpd: { f: "pact", e: "e90", spots: 2, cargo: 7,  takes: ["pact_e80_ka29", "asw_helo_p"], well: { lst: 3 }, ramp: true },
  pact_e00_lpd: { f: "pact", e: "e00", spots: 2, cargo: 7,  takes: ["pact_e80_ka29", "asw_helo_p"], well: { lst: 3 }, ramp: true },
};
/* navy piece 5b put each ship's real assault helicopter first (the Sea King HC4,
   the Army's NH90 TTH, the Z-20, the Ka-29), and she sails with it (no emptyDeck);
   the stand-ins piece 4 sourced follow, and the Army rows reused are deck rows */
function as(f, e) { P.faction = f; useEra(e); }
function secOthers() {
  log("\n[10] the other navies' amphibious assault ships: Ocean, Mistral, Type 075, Ivan Rogov");
  var fac0 = P.faction, ids = Object.keys(OTH);
  var yard = Game.nearestBuilding(P, "navalyard", P.homeX, P.homeY);
  var at = yard ? Path.nearest(M, (yard.x / TT) | 0, (yard.y / TT) | 0, "sea", null, 12) : null;
  if (!at || !BEACH) { chk("open water by the yard, and a beach", false, ""); return; }
  var ax = at.x * TT + 16, ay = at.y * TT + 16;

  /* (a) each in its faction and period only; Germany, Taiwan and North Korea none */
  var bad = [];
  ["gbr", "fra", "pla", "pact", "kpa", "roc", "deu"].forEach(function (f) {
    ERAS.forEach(function (e) {
      var want = ids.filter(function (id) { return OTH[id].f === f && OTH[id].e === e; });
      var have = unitsFor(f, "assault_sea", e);
      var side = Object.keys(UNITS).filter(function (id) {
        var d = UNITS[id]; return d.cat === "naval" && !d.wellOnly && (d.fac === "both" || d.fac === f) && d.role === "assault_sea" && inEra(d, e); });
      if (!same(have, want) || !same(side, want) || unitFor(f, "assault_sea", e) !== (want[0] || null))
        bad.push(f + "/" + e + ": " + have.join("+") + " | " + side.join("+"));
    });
  });
  chk("Ocean (UK e90, e00), Mistral (France e00, e20), Type 075 (China e20), Ivan Rogov (East e80-e00), each its Navy tab's only one; none for Germany, Taiwan or North Korea",
      bad.length === 0, bad.slice(0, 4).join("; "));

  /* (b) the rows */
  var shape = [];
  ids.forEach(function (id) {
    var d = UNITS[id], o = OTH[id], w = WARSHIPS[id];
    var ok = d && d.carrier === o.spots && d.heloCarrier && !d.emptyDeck && d.cargo === o.cargo && d.amphib && d.layer === "sea" &&
      d.role === "assault_sea" && d.fac === o.f && same(d.prereq, ["navalyard", "airbase"]) && d.tech === 2 &&
      !!FACTS[id] && !!w && (o.ramp ? w.deck !== "axial" : w.deck === "axial") && d.service && d.desc &&
      !!d.wellDeck === !!o.well && JSON.stringify(d.wellCraft || null) === JSON.stringify(o.well) && !!d.bowRamp === !!o.ramp &&
      same(d.deckTakes, o.takes) && d.deckTakes.every(function (h) { return UNITS[h] && UNITS[h].hover && UNITS[h].carrierCapable; }) &&
      Unit.troopsOnly(d) === !o.well && Unit.craftOnly(d) === (!!o.well && !o.ramp) &&
      (d.weapons || []).every(function (wk) { return !!WEAPONS[wk]; });
    if (!ok) shape.push(id);
  });
  chk("every row: its deck spots (3, the Ivan Rogov's two pads 2) delivered with her complement (navy piece 5b), helicopters only, its hold by troops (12, 6, 11, 7), a well deck and craft where she had one, the Ivan Rogov's bow ramp, a field-manual entry and a stand-in hull",
      shape.length === 0, shape.join(" "));
  var wn = function (id) { return (UNITS[id].weapons || []).map(function (k) { return WEAPONS[k].name; }).join(" / "); };
  chk("their real fits from existing rounds: 3 Phalanx; Mistral on Simbad; HQ-10; Osa-M, AK-630 and the twin AK-726 - and the Army's Mistral 2 row is unchanged",
      wn("gbr_e00_lph") === "Mk 15 Phalanx CIWS" && /Simbad/.test(wn("fra_e00_lhd")) && /Simbad/.test(wn("lhd_f")) && /HQ-10/.test(wn("lhd_c")) &&
      /Osa-M/.test(wn("pact_e80_lpd")) && /AK-630/.test(wn("pact_e80_lpd")) && /AK-726/.test(wn("pact_e80_lpd")) &&
      WEAPONS.w_e00_fra_aa.name === "Mistral 2 IR MANPADS" && WEAPONS.sam_simbad !== WEAPONS.w_e00_fra_aa,
      ids.map(function (id) { return id + ": " + wn(id); }).join(" | "));
  var C = UNITS.fra_ctm;
  chk("the CTM: France's, in service 1965, three seats (200 troops), amphibious, a landing craft bought for a well only (no sidebar card), a field-manual entry and a hull",
      !!C && C.fac === "fra" && C.service === "1965" && C.from === "e60" && C.cargo === 3 && C.amphib && C.role === "landing_craft" && C.wellOnly &&
      !!FACTS.fra_ctm && !!WARSHIPS.fra_ctm && (ROLES.transport_sea || []).indexOf("fra_ctm") < 0, C ? C.service + " " + C.role : "no row");

  /* (c) nothing else moved: each army's carrier and landing ships, and the Army helicopters' deck flag */
  var CV = { gbr: ["gbr_e50_carrier", "gbr_e60_carrier", "gbr_e80_carrier", "gbr_e90_carrier", "gbr_e00_carrier", "carrier_b"],
             fra: ["fra_e50_carrier", "fra_e60_carrier", "fra_e80_carrier", "fra_e90_carrier", "fra_e00_carrier", "carrier_f"],
             pla: [null, null, null, null, "pla_e00_carrier", "carrier_c"],
             pact: [null, "pact_e60_carrier", "pact_e80_carrier", "pact_e90_carrier", "pact_e00_carrier", "carrier_p"] };
  var LS = { gbr: ["gbr_e50_lst", "gbr_e60_lst", "lst", "lst", "lst", "lst"], fra: ["fra_e50_lst", "fra_e50_lst", "lst", "lst", "lst", "lst"],
             pla: [null, null, "lst", "lst", "lst", "lst"], pact: [null, "pact_e60_lst", "lst", "lst", "lst", "lst"] };
  var moved = [];
  for (var f in CV) ERAS.forEach(function (e, i) {
    if (unitFor(f, "carrier", e) !== CV[f][i]) moved.push(f + "/" + e + " carrier " + unitFor(f, "carrier", e));
    if (unitFor(f, "transport_sea", e) !== LS[f][i]) moved.push(f + "/" + e + " landing ship " + unitFor(f, "transport_sea", e));
  });
  /* navy piece 5b made the Army rows that really flew from Ocean and the Mistrals deck rows, and no other */
  var DECKROW = ["gbr_e00_gunship", "gbr_e00_transport", "fra_e00_gunship", "fra_e00_transport", "helo_f", "trans_f"];
  var flags = DECKROW.filter(function (id) { return !(UNITS[id] && UNITS[id].carrierCapable); })
    .concat(["gbr_e90_gunship", "gbr_e90_transport", "gbr_e80_transport", "fra_e90_transport", "fra_e90_gunship"]
      .filter(function (id) { return UNITS[id] && UNITS[id].carrierCapable; }).map(function (id) { return id + " flagged"; }));
  chk("every army's carrier and landing ship of every period is the one it was; the Chinook HC4, Apache AH1, NH90 TTH and Tigre HAD are deck rows (navy piece 5b) and the other British and French Army helicopters still are not",
      moved.length === 0 && flags.length === 0, moved.concat(flags).join("; "));

  /* (d) built at its faction's naval yard in its period, refused elsewhere */
  var why = [];
  ids.forEach(function (id) {
    var o = OTH[id];
    ERAS.forEach(function (e) {
      as(o.f, e);
      var r = P.lockReason(UNITS[id]);
      if (e === o.e ? r : !/NOT YET IN SERVICE|WITHDRAWN FROM SERVICE/.test(r || "")) why.push(o.f + "/" + e + ":" + id + "=" + r);
    });
    as(o.f === "nato" ? "gbr" : "nato", o.e);
    var rf = P.lockReason(UNITS[id]);
    if (!/NOT IN SERVICE WITH THIS ARMY/.test(rf || "")) why.push("nato:" + id + "=" + rf);
  });
  as("fra", "e00"); var rC = P.lockReason(UNITS.fra_ctm);
  as("nato", "e00"); var rCn = P.lockReason(UNITS.fra_ctm);
  chk("each is buildable by its own army in its own period and refused in every other period and by another army; the CTM is France's",
      why.length === 0 && rC === null && /NOT IN SERVICE WITH THIS ARMY/.test(rCn || ""), why.slice(0, 4).join("; ") + " | CTM " + rC + " / " + rCn);
  [["gbr", "e00", "gbr_e00_lph"], ["pact", "e80", "pact_e80_lpd"]].forEach(function (pr) {
    as(pr[0], pr[1]);
    var ok = P.enqueue("naval", pr[2]), made = null;
    var t = ticks(400, function () {
      for (var i = 0; i < P.units.length; i++) { var u = P.units[i]; if (!u.dead && u.def.id === pr[2]) { made = u; return true; } }
      return false; });
    var first = OTH[pr[2]].takes[0], wg = made ? made.wing() : [];
    chk(pr[1] + " " + UNITS[pr[2]].name + " comes off her own army's naval slip with her " + OTH[pr[2]].spots + " spots filled with the " + UNITS[first].name + " (navy piece 5b) and an empty hold",
        ok && !!made && made.deckSlots() === OTH[pr[2]].spots && wg.length === OTH[pr[2]].spots && wg.every(function (u) { return u.def.id === first && u.parked; }) &&
        made.cargo.length === 0 && !(made.well && made.well.length),
        "queued " + ok + ", after " + t.toFixed(1) + " s" + (made ? ", spots " + made.deckSlots() + " aboard " + wg.map(function (u) { return u.def.id; }).join(",") : ""));
    if (made) { made.wing().forEach(gone); gone(made); }
  });

  /* (e) the deck: its helicopters, laid out for the first, and no jet of any army or period */
  var allJets = Object.keys(UNITS).filter(function (id) { var d = UNITS[id]; return d.cat === "aircraft" && d.carrierCapable && !d.hover; });
  var dk = [];
  ids.forEach(function (id) {
    var o = OTH[id];
    as(o.f, o.e);
    var s = spawn(id, ax, ay), types = Game.deckTypesFor(s), plan = Game.deckAircraftFor(s, 0);
    var own = [];
    ["cfighter", "cstealth", "cstrike", "cawacs", "stovl"].forEach(function (r) { unitsFor(o.f, r, o.e).forEach(function (j) { if (!UNITS[j].hover) own.push(j); }); });
    var let_ = own.filter(function (j) { return !Game.deckOrderReason(s, j); });
    var jetIn = types.filter(function (t) { return allJets.indexOf(t) >= 0; });
    var capH = P.airCapacity(UNITS[o.takes[0]]);
    gone(s);
    var capH0 = P.airCapacity(UNITS[o.takes[0]]);
    if (!same(types, o.takes) || plan !== o.takes[0] || let_.length || jetIn.length || capH - capH0 !== o.spots)
      dk.push(id + ": takes " + types.join(",") + " plan " + plan + " jets sold " + let_.join(",") + " ramp +" + (capH - capH0));
  });
  chk("each deck takes its own helicopters (Sea King HC4 then Lynx HMA.8; Sea King HC4, Chinook HC4, Apache AH1, Merlin HM1; NH90 TTH, Tigre HAD, NH90 NFH; Z-20 and Z-10; Ka-29 then Ka-27PL or Ka-27), is laid out for the first, gives it her spots as ramp, and sells no jet of her army",
      dk.length === 0, dk.join("; "));

  /* (f) a helicopter lands on her; one is bought from her panel */
  [["gbr", "e90", "gbr_e90_lph", "gbr_e90_aswhelo"], ["fra", "e00", "fra_e00_lhd", "fra_e00_aswhelo"],
   ["pla", "e20", "lhd_c", "trans_c"], ["pact", "e80", "pact_e80_lpd", "pact_e80_aswhelo"]].forEach(function (pr) {
    as(pr[0], pr[1]);
    var s = spawn(pr[2], ax, ay);
    var h = spawn(pr[3], s.x + 9 * TT, s.y - 4 * TT);
    h.padOn = s; h.parked = false; h.give({ type: "rtb" });
    var t1 = ticks(40, function () { return h.parked && h.padOn === s; });
    h.give({ type: "move", x: s.x - 10 * TT, y: s.y + 3 * TT });
    var t2 = ticks(20, function () { return !h.parked && Math.hypot(h.x - s.x, h.y - s.y) > 5 * TT; });
    chk(pr[1] + ": a " + UNITS[pr[3]].name + " sent to the " + UNITS[pr[2]].name + " lands on her deck and launches again",
        t1 > 0 && s.onRamp().indexOf(h) < 0 && t2 > 0 && !h.parked, "landed after " + t1.toFixed(1) + " s, away after " + t2.toFixed(1) + " s");
    var spare = OTH[pr[2]].takes[OTH[pr[2]].takes.length - 1];
    var why2 = Game.orderDeckAircraft(s, spare);
    var t3 = ticks(60, function () { return s.wing().some(function (u) { return u.def.id === spare && u.parked; }); });
    chk("...and a " + UNITS[spare].name + " bought from her panel alongside the yard comes aboard", !why2 && t3 > 0, (why2 || "") + " after " + t3.toFixed(1) + " s");
    s.wing().forEach(gone); gone(h); gone(s);
  });

  /* (g) the hold: Ocean troops only; Mistral and Type 075 keep vehicles for their craft; the Ivan Rogov beaches them */
  var B = BEACH, land = function (k) { return { x: (B.x - B.dx * k + 0.5) * TT, y: (B.y - B.dy * k + 0.5) * TT }; };
  [["gbr", "e00", "gbr_e00_lph"], ["fra", "e00", "fra_e00_lhd"], ["pla", "e20", "lhd_c"], ["pact", "e80", "pact_e80_lpd"]].forEach(function (pr) {
    as(pr[0], pr[1]);
    var s = spawn(pr[2], (B.x + B.dx + 0.5) * TT, (B.y + B.dy + 0.5) * TT);
    var q = spawn("rifle_n", P.homeX, P.homeY), v = spawn("mbt_n", P.homeX, P.homeY);
    var rq = s.holdRefusal(q), rv = s.holdRefusal(v), rw = spawn("lst", P.homeX, P.homeY), rr = s.wellRefusal(rw);
    gone(rw);
    var o = OTH[pr[2]];
    if (!o.well) {
      chk(pr[1] + " " + UNITS[pr[2]].name + " (no well deck, boats on davits): takes the squad, refuses the tank and a landing craft, buys no craft",
          rq === "" && /NO WELL DECK/.test(rv) && /NO WELL DECK/.test(rr) && /NO WELL DECK/.test(s.orderWellCraft("lst") || "") && s.wellTypes().length === 0,
          "\"" + rv + "\" | \"" + rr + "\"");
    } else {
      [q, v].forEach(function (u) { s.cargo.push(u); u.carried = true; });
      var aim = land(1), n = s.unload(aim.x, aim.y);
      var up = [q, v].filter(function (u) { return !u.carried && GameMap.passable(M, (u.x / TT) | 0, (u.y / TT) | 0, "ground"); });
      chk(pr[1] + " " + UNITS[pr[2]].name + " takes a squad and a tank; off the beach she puts " +
          (o.ramp ? "both ashore over her bow ramp" : "the squad ashore and keeps the tank for her landing craft"),
          rq === "" && rv === "" && (o.ramp ? up.length === 2 && !s.cargo.length && !s.vehiclesKept()
                                            : up.length === 1 && up[0] === q && v.carried && s.vehiclesKept() === 1),
          n + " landed: " + up.map(function (u) { return u.def.id; }).join(",") + ", aboard " + s.cargo.map(function (u) { return u.def.id; }).join(","));
    }
    s.cargo.forEach(function (u) { u.carried = false; }); s.cargo.length = 0;
    gone(q); gone(v); gone(s);
  });

  /* (h) the well: four CTM on a Mistral, three air-cushion craft on a Type 075 and an Ivan Rogov */
  var TYw = { fra_e00_lhd: ["fra_ctm"], lhd_f: ["fra_ctm"], lhd_c: ["lst"], pact_e80_lpd: ["lst"], pact_e90_lpd: ["lst"], pact_e00_lpd: ["lst"],
              gbr_e90_lph: [], gbr_e00_lph: [] }, tyBad = [];
  ids.forEach(function (id) { as(OTH[id].f, OTH[id].e); var s0 = spawn(id, ax, ay); if (!same(s0.wellTypes(), TYw[id])) tyBad.push(id + ":" + s0.wellTypes().join("+")); gone(s0); });
  chk("in her period the Mistral's well takes the CTM, the Type 075's and the Ivan Rogov's the air-cushion landing craft, Ocean's nothing",
      tyBad.length === 0, tyBad.join(" "));
  [["pla", "e20", "lhd_c", "lst", 3, ["fra_ctm", "nato_lcu"]], ["pact", "e80", "pact_e80_lpd", "lst", 3, ["nato_lcu"]],
   ["fra", "e20", "lhd_f", "fra_ctm", 4, ["lst", "nato_lcu"]]].forEach(function (pr) {
    as(pr[0], pr[1]);
    var s = spawn(pr[2], ax, ay), r = [];
    for (var i = 0; i < pr[4]; i++) r.push(s.orderWellCraft(pr[3]));
    var rx = s.orderWellCraft(pr[3]), ro = pr[5].map(function (c) { return s.orderWellCraft(c); });
    chk(pr[1] + " " + UNITS[pr[2]].name + " alongside the yard: " + pr[4] + " " + Unit.craftLabel(UNITS[pr[3]]) + " ordered, one more refused (full), and " + pr[5].join(", ") + " not carried",
        r.every(function (x) { return x === null; }) && /FULL/.test(rx || "") &&
        ro.every(function (x) { return /NOT CARRIED|FULL|NOT IN SERVICE/.test(x || ""); }) && ro.some(function (x) { return /NOT CARRIED/.test(x || ""); }),
        r.join(",") + " | " + rx + " | " + ro.join(" | "));
    while (s.wellQ && s.wellQ.length) s.cancelWellOrder(0);
    gone(s);
  });
  /* the Mistral: four CTM built into her well, launched off the beach, one lands a tank, back in */
  as("fra", "e00");
  var mi = spawn("fra_e00_lhd", ax, ay);
  for (var k = 0; k < 4; k++) mi.orderWellCraft("fra_ctm");
  var tw = ticks(120, function () { return mi.well && mi.well.length === 4; });
  chk("e00: four CTM bought from a Mistral's panel are built and floated into her well, empty",
      tw > 0 && mi.well.every(function (c) { return c.def.id === "fra_ctm" && c.carried && !c.cargo.length; }) && !mi.wellQ.length,
      "after " + tw.toFixed(1) + " s, " + (mi.well || []).length + " in the well (list " + P.factionTime(UNITS.fra_ctm) + " s each)");
  mi.x = (B.x + B.dx * 8 + 0.5) * TT; mi.y = (B.y + B.dy * 8 + 0.5) * TT; mi.order = { type: "idle" }; mi.path = null;
  mi.ang = Math.atan2(-B.dy, -B.dx);
  var mt = spawn("mbt_n", P.homeX, P.homeY), ms1 = spawn("rifle_n", P.homeX, P.homeY), ms2 = spawn("rifle_n", P.homeX, P.homeY), ms3 = spawn("rifle_n", P.homeX, P.homeY);
  [ms1, mt, ms2, ms3].forEach(function (u) { mi.cargo.push(u); u.carried = true; });
  var craft = mi.well.slice(), nL = mi.launchAll(), c1 = craft[0];
  chk("...launched off the beach: the first CTM takes three of the hold, the tank first; the fourth man goes in the second",
      nL === 4 && !mi.well.length && c1.cargo.length === 3 && c1.cargo[0] === mt && craft[1].cargo.length === 1 && !mi.cargo.length,
      nL + " launched; " + craft.map(function (c) { return c.cargo.length; }).join("/"));
  var aim2 = land(1);
  c1.give({ type: "move", x: aim2.x, y: aim2.y, unloadAt: true });
  var tb = ticks(90, function () { return c1.cargo.length === 0; });
  ticks(0.5);
  chk("...a CTM sent to the beach lands the tank and two squads on it", tb > 0 && !mt.carried && GameMap.passable(M, (mt.x / TT) | 0, (mt.y / TT) | 0, "ground"),
      "after " + tb.toFixed(1) + " s");
  craft.forEach(function (c) { c.give({ type: "enter", target: mi }); });
  var tr = ticks(90, function () { return mi.well.length === 4; });
  chk("...and all four sail back into her well", tr > 0 && craft.every(function (c) { return c.carried && mi.well.indexOf(c) >= 0; }),
      "after " + tr.toFixed(1) + " s, " + mi.well.length + " in the well");
  craft.forEach(function (c) { c.cargo.forEach(gone); gone(c); }); mi.well.length = 0;
  [mt, ms1, ms2, ms3].forEach(gone); gone(mi);

  /* (i) the commander never builds one, nor a craft for one */
  var src = (typeof readFile === "function") ? readFile("js/ai.js") : null;
  var A = Game.players.filter(function (p) { return p.isAI && !p.defeated; })[0];
  if (!A) { chk("an AI commander to watch", false, ""); P.faction = fac0; useEra("e20"); return; }
  var keep = { faction: A.faction, era: A.era, cash: A.cash, oil: A.oil, tech: A.tech }, seen = [];
  var enq = A.enqueue, owc = Unit.prototype.orderWellCraft;
  A.enqueue = function (q, id) { seen.push(id); return enq.apply(this, arguments); };
  Unit.prototype.orderWellCraft = function (id) { if (this.owner === A) seen.push("well:" + id); return owc.apply(this, arguments); };
  var built = [], refill = 0;
  try {
    [["gbr", "e00", "gbr_e00_lph"], ["fra", "e20", "lhd_f"], ["pla", "e20", "lhd_c"], ["pact", "e80", "pact_e80_lpd"]].forEach(function (pr) {
      A.faction = pr[0]; A.era = pr[1]; A.cash = 300000; A.oil = 60000; A.tech = 3;
      var before = A.units.slice();
      var s = Game.spawnUnitAt(A, pr[2], ax, ay);
      if (s) { s.stance = "hold"; s.order = { type: "idle" }; }
      ticks(60);
      A.units.forEach(function (u) { if (!u.dead && (u.def.role === "assault_sea" || u.def.role === "landing_craft") && u !== s) built.push(u.def.id); });
      /* a deck the test hands it is refilled by ai.js driveDecks, as any ship
         of its own is (G.deckWants: her faithful type since navy piece 5b);
         the commander never owns one in a match, so take those off again */
      A.units.slice().forEach(function (u) { if (before.indexOf(u) < 0 && u !== s && OTH[pr[2]].takes.indexOf(u.def.id) >= 0) { refill++; gone(u); } });
      if (s) { s.wing().forEach(gone); (s.deckQ || []).length = 0; (s.wellQ || []).length = 0; gone(s); }
    });
  } catch (err) { built.push("CRASH " + err); }
  A.enqueue = enq; Unit.prototype.orderWellCraft = owc;
  for (var kk in keep) A[kk] = keep[kk];
  var badA = seen.filter(function (id) { var d = UNITS[String(id).replace("well:", "")]; return /^well:/.test(id) || (d && (d.role === "assault_sea" || d.role === "landing_craft")); });
  chk("the commander, made British, French, Chinese and Soviet with " + seen.length + " purchases and an assault ship of its own, never buys one or a craft for one" +
      (src !== null ? ", and js/ai.js names no assault_sea" : ""),
      badA.length === 0 && built.length === 0 && (src === null || src.indexOf("assault_sea") < 0), badA.concat(built).join(",") + " | deck refills for the ships it was handed, taken off: " + refill);
  P.faction = fac0;
  useEra("e20");
}

/* ---------------- 11. save and load a Mistral with her deck, hold and well ---------------- */
function secSave4() {
  log("\n[11] a Mistral saved with an NH90 on deck, a squad aboard and two CTM in her well (one with a tank) loads as she was, and an Ocean with her complement");
  P = Game.human; M = Game.map;
  useEra("e00");
  var yard = Game.nearestBuilding(P, "navalyard", P.homeX, P.homeY);
  var at = yard ? Path.nearest(M, (yard.x / TT) | 0, (yard.y / TT) | 0, "sea", null, 12) : null;
  if (!at) { chk("open water by the yard", false, ""); return; }
  var s = spawn("fra_e00_lhd", at.x * TT + 16, at.y * TT + 16);
  var h = spawn("fra_e00_aswhelo", s.x, s.y); h.padOn = s; h.parked = true; h.order = { type: "parked" };
  var q = spawn("rifle_n", P.homeX, P.homeY); s.cargo.push(q); q.carried = true;
  var c1 = spawn("fra_ctm", s.x, s.y), c2 = spawn("fra_ctm", s.x, s.y);
  s.dockCraft(c1); s.dockCraft(c2);
  var tk = spawn("mbt_n", P.homeX, P.homeY); c1.cargo.push(tk); tk.carried = true;
  var sx = s.x, sy = s.y;
  /* navy piece 5b: an Ocean delivered with her three Sea King HC4s, which a
     load must not deliver a second time */
  var ox = s.x + 6 * TT, oy = s.y, osp = Path.nearest(M, (ox / TT) | 0, (oy / TT) | 0, "sea", null, 8);
  if (osp) { ox = osp.x * TT + 16; oy = osp.y * TT + 16; }
  var oc = spawn("gbr_e00_lph", ox, oy), on = Game.embarkComplement(oc);
  ox = oc.x; oy = oc.y;
  var r = SaveGame.save(Game, "ironfront.lhdcheck4");
  var ld = r.ok ? SaveGame.load("ironfront.lhdcheck4") : { ok: false, error: r.error };
  chk("the save is written and loads", r.ok && ld.ok, (r.error || "") + (ld.error || ""));
  if (!ld.ok) return;
  P = Game.human; M = Game.map;
  useEra("e00");                                  // the load puts the match's period back
  var S = null;
  Game.entities.forEach(function (e) { if (e.kind === "unit" && e.def.id === "fra_e00_lhd" && Math.hypot(e.x - sx, e.y - sy) < 3) S = e; });
  var w = S ? S.wing() : [], W = S ? S.well || [] : [];
  chk("the Mistral is back with her NH90 parked on deck, her squad aboard, and both CTM in her well, the tank aboard one",
      !!S && w.length === 1 && w[0].def.id === "fra_e00_aswhelo" && w[0].parked && S.cargo.length === 1 && S.cargo[0].def.id === "rifle_n" &&
      W.length === 2 && W.every(function (c) { return c.def.id === "fra_ctm" && c.carried; }) &&
      W.filter(function (c) { return c.cargo.length === 1 && c.cargo[0].def.id === "mbt_n" && c.cargo[0].carried; }).length === 1,
      S ? "deck " + w.map(function (u) { return u.def.id; }).join(",") + "; hold " + S.cargo.length + "; well " +
          W.map(function (c) { return c.def.id + "[" + c.cargo.length + "]"; }).join(",") : "no Mistral");
  chk("...and her deck and well take what they took", !!S && same(Game.deckTypesFor(S), OTH.fra_e00_lhd.takes) && same(S.wellTypes(), ["fra_ctm"]),
      S ? Game.deckTypesFor(S).join(",") + " | " + S.wellTypes().join(",") : "");
  var OC = null, nSK = 0;
  Game.entities.forEach(function (e) {
    if (e.kind !== "unit" || e.dead) return;
    if (e.def.id === "gbr_e00_lph" && Math.hypot(e.x - ox, e.y - oy) < 3) OC = e;
    if (e.def.id === "gbr_e80_seaking4" && e.owner === Game.human) nSK++;
  });
  var ow = OC ? OC.wing() : [];
  chk("an Ocean saved with the three Sea King HC4s she sailed with loads with those three on her deck, parked, and no more - the load does not deliver her complement again (navy piece 5b)",
      on === 3 && !!OC && ow.length === 3 && ow.every(function (u) { return u.def.id === "gbr_e80_seaking4" && u.parked && u.padOn === OC; }) && nSK === 3 &&
      !!S && S.wing().length === 1,
      "embarked " + on + "; after the load " + (OC ? ow.length + " on her deck" : "no Ocean") + ", " + nSK + " Sea King HC4 in the match, the Mistral's deck " + (S ? S.wing().length : "-"));
}

/* ---------------- 12. the Marine Corps' assault helicopters (navy piece 5a) ---------------- */
/* eras.js THE MARINE CORPS' ASSAULT HELICOPTERS: the six rows, each period's
   types, and the payload (tonnes, generations.js AIRLIFT) and seats of each */
var MAR = ["nato_e60_ch46", "nato_e80_ch46", "nato_e60_ch53", "nato_e80_ch53", "nato_e00_mv22", "nato_e60_uh1n"];
var MAR_ERA = { e50: [], e60: ["nato_e60_ch46", "nato_e60_ch53", "nato_e60_uh1n"],
                e80: ["nato_e80_ch46", "nato_e80_ch53", "nato_e60_uh1n"], e90: ["nato_e80_ch46", "nato_e80_ch53", "nato_e60_uh1n"],
                e00: ["nato_e80_ch46", "nato_e80_ch53", "nato_e00_mv22", "nato_e60_uh1n"], e20: ["nato_e80_ch53", "nato_e00_mv22"] };
var MAR_LIFT = { nato_e60_ch46: [4.54, 10], nato_e80_ch46: [4.54, 10], nato_e60_ch53: [5.9, 14], nato_e80_ch53: [16.33, 14],
                 nato_e00_mv22: [6.8, 10], nato_e60_uh1n: [2.27, 6] };
function secAssault() {
  log("\n[12] the Marine Corps' assault helicopters: CH-46, CH-53, MV-22B and UH-1N");
  P = Game.human; M = Game.map;
  var fac0 = P.faction;
  P.faction = "nato";
  /* (a) each in its periods only, for the United States only, in the AIR tab (ui.js refreshCards) */
  var badP = [];
  ERAS.forEach(function (e) {
    var have = unitsFor("nato", "assaulthelo", e);
    var air = Object.keys(UNITS).filter(function (id) {
      var d = UNITS[id]; return d.cat === "aircraft" && (d.fac === "both" || d.fac === "nato") && d.role === "assaulthelo" && inEra(d, e); });
    if (!same(have, MAR_ERA[e]) || !same(air, MAR_ERA[e])) badP.push(e + ":" + have.join("+") + "|" + air.join("+"));
  });
  var other = [];
  ["pact", "pla", "kpa", "roc", "gbr", "fra", "deu"].forEach(function (f) {
    ERAS.forEach(function (e) { unitsFor(f, "assaulthelo", e).forEach(function (id) { if (UNITS[id].fac === "nato") other.push(f + "/" + e + "=" + id); }); }); });
  /* the other navies' own (navy piece 5b) are section 14's */
  chk("each in its periods only, in the AIR tab: CH-46D, CH-53D and UH-1N in the 1960s-70s; CH-46E, CH-53E and UH-1N in the 1980s and 1990s; the MV-22B joins in the 2000s; MV-22B and CH-53E today; no other army has an American one",
      badP.length === 0 && other.length === 0, badP.concat(other).join(" "));
  /* (b) the rows */
  var badR = [];
  MAR.forEach(function (id) {
    var d = UNITS[id], L = MAR_LIFT[id];
    if (!(d && d.role === "assaulthelo" && d.cat === "aircraft" && d.hover && d.carrierCapable && !d.jet && same(d.prereq, ["airbase"]) &&
          d.weapons.length === 0 && d.payload === L[0] && d.cargo === L[1] && !d.hold && !d.cabin && FACTS[id] && d.desc && d.service &&
          (id === "nato_e00_mv22" || (typeof ROTORCRAFT !== "undefined" && ROTORCRAFT[id] && ROTORCRAFT[id].kind === "rotor"))))
      badR.push(id + (d ? ": payload " + d.payload + " seats " + d.cargo + " hover " + d.hover + " deck " + d.carrierCapable : " missing"));
  });
  chk("all six hover and work from a deck, need only an airbase, carry their sourced payload on the hook (CH-46 4.54 t, CH-53D 5.9, CH-53E 16.33, MV-22B 6.8, UH-1N 2.27) and their seats, unarmed, each with a field-manual entry and a rotorcraft row (the MV-22B a stand-in)",
      badR.length === 0 && same(ROLES.assaulthelo || [], MAR.concat(NEW5B)), badR.join("; ") + " | role " + (ROLES.assaulthelo || []).join(","));
  /* (c) the Army's transport card of every period is as it was */
  var ARMY = { e50: "nato_e50_transport", e60: "nato_e60_transport", e80: "nato_e80_transport", e90: "nato_e90_transport",
               e00: "nato_e00_transport", e20: "trans_n" };
  var moved = [], inT = (ROLES.transport || []).filter(function (id) { return MAR.indexOf(id) >= 0; });
  ERAS.forEach(function (e) { if (unitFor("nato", "transport", e) !== ARMY[e]) moved.push(e + "=" + unitFor("nato", "transport", e)); });
  chk("the Army's transport card is each period's answer as before (H-19, UH-1D, UH-60A, UH-60L, UH-60M, UH-60M) and none of the six is a transport",
      moved.length === 0 && inT.length === 0, moved.concat(inT).join(" "));

  var yard = Game.nearestBuilding(P, "navalyard", P.homeX, P.homeY);
  var at = yard ? Path.nearest(M, (yard.x / TT) | 0, (yard.y / TT) | 0, "sea", null, 12) : null;
  if (!at || !BEACH) { chk("open water by the yard, and a beach", false, ""); P.faction = fac0; useEra("e20"); return; }
  /* (d) every American assault ship asks for her Marine helicopter first, and sails with three, at her old price */
  var PRICE = { nato_e60_lph: 1800, nato_e80_lha: 2750, nato_e90_lhd: 3100, nato_e00_lhd: 3500, lha_n: 3750 };
  var badD = [], firsts = [];
  for (var e in ROW) if (ROW[e]) {
    useEra(e);
    var s = spawn(ROW[e], at.x * TT + 16, at.y * TT + 16), first = TAKES[e][0];
    var plan = [0, 1, 2].map(function (i) { return Game.deckAircraftFor(s, i); });
    var w = Game.deckWants(s), types = Game.deckTypesFor(s);
    var n = Game.embarkComplement(s), aboard = s.wing().map(function (u) { return u.def.id; });
    firsts.push(UNITS[first].name);
    if (!(MAR.indexOf(first) >= 0 && plan.every(function (x) { return x === first; }) && w === first && types[0] === first &&
          n === 3 && aboard.length === 3 && aboard.every(function (x) { return x === first; }) && !UNITS[ROW[e]].emptyDeck &&
          UNITS[ROW[e]].cost === PRICE[ROW[e]]))
      badD.push(e + " " + ROW[e] + ": plan " + plan.join("/") + " wants " + w + " embarked " + aboard.join(",") + " cost " + UNITS[ROW[e]].cost);
    s.wing().forEach(gone); gone(s);
  }
  chk("every American assault ship lays her deck out for, refills with and sails with her period's Marine helicopter (" + firsts.join(", ") + "), at her old price",
      badD.length === 0, badD.join("; "));

  /* (e) one of them takes a squad aboard on a beach, lands on each period's ship, launches and puts the squad back ashore */
  var B = BEACH;
  var land = function (k) { return { x: (B.x - B.dx * k + 0.5) * TT, y: (B.y - B.dy * k + 0.5) * TT }; };
  var off = { x: (B.x + B.dx * 10 + 0.5) * TT, y: (B.y + B.dy * 10 + 0.5) * TT };
  var FLY = { e60: "nato_e60_ch46", e80: "nato_e80_ch46", e90: "nato_e60_uh1n", e00: "nato_e00_mv22", e20: "nato_e80_ch53" };
  for (var e2 in FLY) {
    useEra(e2);
    var sh = spawn(ROW[e2], off.x, off.y);
    var hp = land(2), qp = land(3), aim = land(2);
    var h = spawn(FLY[e2], hp.x, hp.y), q = spawn("rifle_n", qp.x, qp.y);
    q.give({ type: "enter", target: h });
    var tq = ticks(20, function () { return q.carried; });
    h.padOn = sh; h.parked = false; h.give({ type: "rtb" });           // the right-click on her deck
    var t1 = ticks(60, function () { return h.parked && h.padOn === sh; });
    var landed = t1 > 0 && sh.wing().indexOf(h) >= 0 && q.carried && h.cargo.indexOf(q) >= 0;
    var out = Math.hypot(sh.x - aim.x, sh.y - aim.y) / TT;
    var why = Game.airLand(h, aim.x, aim.y);
    var t2 = ticks(90, function () { return !q.carried; });
    ticks(1);
    var dq = Math.hypot(q.x - aim.x, q.y - aim.y);
    var ashore = !q.carried && !q.dead && GameMap.passable(M, (q.x / TT) | 0, (q.y / TT) | 0, "ground") && dq < 4 * TT;
    chk(e2 + ": a " + UNITS[FLY[e2]].name + " takes a rifle squad aboard on the beach, lands on the " + UNITS[ROW[e2]].name + " " + out.toFixed(1) +
        " tiles out with it, launches from her and puts the squad ashore",
        tq > 0 && landed && why === "" && t2 > 0 && ashore && !h.parked,
        "boarded after " + tq.toFixed(1) + " s; landed " + landed + " after " + t1.toFixed(1) + " s; " + (why || "airLand given") +
        "; ashore after " + t2.toFixed(1) + " s, " + tiles(dq) + " tiles from the point; helicopter parked " + h.parked);
    gone(q); gone(h); sh.wing().forEach(gone); gone(sh);
  }

  /* (f) the CH-53E slings a light vehicle, one at a time, and refuses a heavy one */
  useEra("e80");
  var LV = UNITS.nato_e80_recon ? "nato_e80_recon" : "recon_n", HV = UNITS.nato_e80_mbt ? "nato_e80_mbt" : "mbt_n";
  var g0 = land(2), c53 = spawn("nato_e80_ch53", g0.x, g0.y);
  var v1p = land(3), v2p = land(4), tkp = land(5);
  var v1 = spawn(LV, v1p.x, v1p.y), v2 = spawn(LV, v2p.x, v2p.y), tk = spawn(HV, tkp.x, tkp.y);
  var r1 = c53.airliftRefusal(v1);
  v1.give({ type: "enter", target: c53 });
  var tv = ticks(25, function () { return v1.carried; });
  var ld = c53.cargoLoad(), r2 = c53.airliftRefusal(v2), r3 = c53.airliftRefusal(tk);
  chk("e80: the CH-53E slings a " + UNITS[LV].name + " (" + UNITS[LV].mass + " t) on its hook; a second is refused, one at a time, and an " +
      UNITS[HV].name + " (" + UNITS[HV].mass + " t) as too heavy for its 16.33 t",
      r1 === "" && tv > 0 && v1.carried && ld.veh === 1 && ld.hook === 1 && /ONE AT A TIME/.test(r2) && /TOO HEAVY/.test(r3),
      "\"" + r1 + "\" boarded after " + tv.toFixed(1) + " s, hook " + ld.hook + "; second: \"" + r2 + "\"; tank: \"" + r3 + "\"");
  var dz = land(6), why6 = Game.airLand(c53, dz.x, dz.y);
  var t6 = ticks(60, function () { return !v1.carried; });
  ticks(1);
  chk("...and sets it down where it is sent", why6 === "" && t6 > 0 && !v1.carried && Math.hypot(v1.x - dz.x, v1.y - dz.y) < 4 * TT,
      (why6 || "airLand given") + ", down after " + t6.toFixed(1) + " s, " + tiles(Math.hypot(v1.x - dz.x, v1.y - dz.y)) + " tiles from the point");
  [c53, v1, v2, tk].forEach(gone);

  /* (g) the commander never buys one */
  var src = (typeof readFile === "function") ? readFile("js/ai.js") : null;
  var named = src === null ? [] : ["assaulthelo"].concat(MAR).filter(function (k) { return src.indexOf(k) >= 0; });
  var A = Game.players.filter(function (p) { return p.isAI && !p.defeated; })[0];
  if (!A) { chk("an AI commander to watch", false, ""); P.faction = fac0; useEra("e20"); return; }
  var keep = { faction: A.faction, era: A.era, cash: A.cash, oil: A.oil, tech: A.tech }, seen = [], built = [];
  var enq = A.enqueue, ord = Game.orderDeckAircraft;
  A.enqueue = function (q2, id) { seen.push(id); return enq.apply(this, arguments); };
  Game.orderDeckAircraft = function (ship, id) { if (ship.owner === A) seen.push("deck:" + id); return ord.apply(this, arguments); };
  try {
    ["e60", "e00"].forEach(function (e3) {
      A.faction = "nato"; A.era = e3; A.cash = 300000; A.oil = 60000; A.tech = 3;
      ticks(60);
      A.units.forEach(function (u) { if (!u.dead && u.def.role === "assaulthelo") built.push(u.def.id); });
    });
  } catch (err) { built.push("CRASH " + err); }
  A.enqueue = enq; Game.orderDeckAircraft = ord;
  for (var kk in keep) A[kk] = keep[kk];
  var bad = seen.filter(function (id) { return MAR.indexOf(String(id).replace("deck:", "")) >= 0; });
  chk("the commander, made a 1960s and a 2000s American with " + seen.length + " purchases, never buys one" +
      (src !== null ? ", and js/ai.js names neither the role nor any of the six" : ""),
      bad.length === 0 && built.length === 0 && named.length === 0, bad.concat(built, named).join(","));
  P.faction = fac0;
  useEra("e20");
}

/* ---------------- 14. the other navies' assault helicopters (navy piece 5b) ---------------- */
/* eras.js THE OTHER NAVIES' ASSAULT HELICOPTERS: the two new rows (the Sea King
   HC4 and the Ka-29), their periods, payload (tonnes, generations.js AIRLIFT) and
   seats; the four Army rows reused (Chinook HC4, Apache AH1, NH90 TTH, Tigre HAD) */
var NEW5B = ["gbr_e80_seaking4", "pact_e80_ka29"];
var NEW_ERA = { gbr: { e80: ["gbr_e80_seaking4"], e90: ["gbr_e80_seaking4"], e00: ["gbr_e80_seaking4"] },
                pact: { e80: ["pact_e80_ka29"], e90: ["pact_e80_ka29"], e00: ["pact_e80_ka29"], e20: ["pact_e80_ka29"] } };
/* the Sea King HC4's own 8,000 lb lift (en.wikipedia "846 Naval Air Squadron"), 3.63 t */
var NEW_LIFT = { gbr_e80_seaking4: [3.63, 11], pact_e80_ka29: [4, 9] };
function secAssault5b() {
  log("\n[14] the other navies' assault helicopters: Sea King HC4, NH90 TTH, Z-20, Ka-29");
  P = Game.human; M = Game.map;
  var fac0 = P.faction;
  /* (a) each in its own army and periods only, in the AIR tab (ui.js refreshCards) */
  var badP = [];
  ["nato", "pact", "pla", "kpa", "roc", "gbr", "fra", "deu"].forEach(function (f) {
    ERAS.forEach(function (e) {
      var want = (NEW_ERA[f] && NEW_ERA[f][e]) || [];
      var have = unitsFor(f, "assaulthelo", e).filter(function (id) { return NEW5B.indexOf(id) >= 0; });
      var air = Object.keys(UNITS).filter(function (id) {
        var d = UNITS[id]; return NEW5B.indexOf(id) >= 0 && d.cat === "aircraft" && (d.fac === "both" || d.fac === f) && inEra(d, e); });
      if (!same(have, want) || !same(air, want)) badP.push(f + "/" + e + ":" + have.join("+") + "|" + air.join("+"));
    });
  });
  chk("the Sea King HC4 is Britain's in the 1980s, 1990s and 2000s-10s only, the Ka-29 the East's from the 1980s on, each in its AIR tab; no other army has either",
      badP.length === 0, badP.join(" "));
  /* (b) the rows */
  var badR = [];
  NEW5B.forEach(function (id) {
    var d = UNITS[id], L = NEW_LIFT[id];
    if (!(d && d.role === "assaulthelo" && d.cat === "aircraft" && d.hover && d.carrierCapable && !d.jet && same(d.prereq, ["airbase"]) &&
          d.weapons.length === 0 && d.payload === L[0] && d.cargo === L[1] && !d.hold && !d.cabin && FACTS[id] && d.desc && d.service &&
          typeof ROTORCRAFT !== "undefined" && ROTORCRAFT[id] && ROTORCRAFT[id].kind === "rotor"))
      badR.push(id + (d ? ": payload " + d.payload + " seats " + d.cargo + " hover " + d.hover + " deck " + d.carrierCapable : " missing"));
  });
  var REUSE = { gbr_e00_transport: "transport", gbr_e00_gunship: "gunship", fra_e00_transport: "transport", fra_e00_gunship: "gunship",
                trans_f: "transport", helo_f: "gunship" }, badU = [];
  for (var ru in REUSE) if (!(UNITS[ru] && UNITS[ru].role === REUSE[ru] && UNITS[ru].carrierCapable && UNITS[ru].hover)) badU.push(ru);
  chk("both hover and work from a deck, need only an airbase, carry their payload on the hook (Sea King HC4 3.63 t, Ka-29 4 t) and their seats (11, 9), unarmed, each with a field-manual entry and a rotorcraft row; the four Army rows reused keep their roles and are deck rows",
      badR.length === 0 && badU.length === 0, badR.concat(badU).join("; "));
  /* (c) the Army's transport and gunship cards of every period are as they were */
  var ARMY = { gbr: ["gbr_e50_transport", "gbr_e60_transport", "gbr_e80_transport", "gbr_e90_transport", "gbr_e00_transport", "trans_b"],
               fra: ["fra_e50_transport", "fra_e60_transport", "fra_e80_transport", "fra_e90_transport", "fra_e00_transport", "trans_f"],
               pla: ["pla_e50_transport", "pla_e60_transport", "pla_e80_transport", "pla_e90_transport", "pla_e00_transport", "trans_c"],
               pact: ["pact_e50_transport", "pact_e60_transport", "pact_e80_transport", "pact_e90_transport", "pact_e00_transport", "trans_p"] };
  var GUN = { gbr: [null, "gbr_e60_gunship", "gbr_e80_gunship", "gbr_e90_gunship", "gbr_e00_gunship", "helo_b"],
              fra: ["fra_e50_gunship", "fra_e60_gunship", "fra_e80_gunship", "fra_e90_gunship", "fra_e00_gunship", "helo_f"] };
  var moved = [], inT = (ROLES.transport || []).concat(ROLES.gunship || []).filter(function (id) { return NEW5B.indexOf(id) >= 0; });
  for (var f in ARMY) ERAS.forEach(function (e, i) {
    if (unitFor(f, "transport", e) !== ARMY[f][i]) moved.push(f + "/" + e + "=" + unitFor(f, "transport", e));
    if (GUN[f] && unitFor(f, "gunship", e) !== GUN[f][i]) moved.push(f + "/" + e + " gunship=" + unitFor(f, "gunship", e));
  });
  chk("the British, French, Chinese and Soviet Army transport card of every period is the one it was (and the British and French gunship), and neither new row is a transport or a gunship",
      moved.length === 0 && inT.length === 0, moved.concat(inT).join(" "));

  var yard = Game.nearestBuilding(P, "navalyard", P.homeX, P.homeY);
  var at = yard ? Path.nearest(M, (yard.x / TT) | 0, (yard.y / TT) | 0, "sea", null, 12) : null;
  if (!at || !BEACH) { chk("open water by the yard, and a beach", false, ""); P.faction = fac0; useEra("e20"); return; }
  /* (d) every one of these ships asks for her faithful type first and sails with it, at her old price */
  var PRICE = { gbr_e90_lph: 2350, gbr_e00_lph: 2650, fra_e00_lhd: 2650, lhd_f: 2750, lhd_c: 3600, pact_e80_lpd: 1800, pact_e90_lpd: 1850, pact_e00_lpd: 2050 };
  var badD = [], firsts = [];
  Object.keys(OTH).forEach(function (id) {
    var o = OTH[id];
    as(o.f, o.e);
    var s = spawn(id, at.x * TT + 16, at.y * TT + 16), first = o.takes[0];
    var plan = []; for (var i = 0; i < o.spots; i++) plan.push(Game.deckAircraftFor(s, i));
    var w = Game.deckWants(s), types = Game.deckTypesFor(s);
    var n = Game.embarkComplement(s), aboard = s.wing().map(function (u) { return u.def.id; });
    firsts.push(UNITS[id].name + " " + o.e + ": " + n + " " + UNITS[first].name);
    if (!(plan.every(function (x) { return x === first; }) && w === first && types[0] === first &&
          n === o.spots && aboard.length === o.spots && aboard.every(function (x) { return x === first; }) && !UNITS[id].emptyDeck &&
          UNITS[id].cost === PRICE[id]))
      badD.push(id + ": plan " + plan.join("/") + " wants " + w + " embarked " + aboard.join(",") + " cost " + UNITS[id].cost);
    s.wing().forEach(gone); gone(s);
  });
  chk("each lays her deck out for, refills with and sails with her faithful type, at her old price (" + firsts.join("; ") + ")",
      badD.length === 0, badD.join("; "));

  /* (e) one of each navy's takes a squad aboard on a beach, lands on her, launches and puts it ashore */
  var B = BEACH;
  var land = function (k) { return { x: (B.x - B.dx * k + 0.5) * TT, y: (B.y - B.dy * k + 0.5) * TT }; };
  var off = { x: (B.x + B.dx * 10 + 0.5) * TT, y: (B.y + B.dy * 10 + 0.5) * TT };
  [["gbr", "e00", "gbr_e00_lph", "gbr_e80_seaking4"], ["fra", "e00", "fra_e00_lhd", "fra_e00_transport"],
   ["pla", "e20", "lhd_c", "trans_c"], ["pact", "e80", "pact_e80_lpd", "pact_e80_ka29"]].forEach(function (pr) {
    as(pr[0], pr[1]);
    var sh = spawn(pr[2], off.x, off.y);
    var hp = land(2), qp = land(3), aim = land(2);
    var h = spawn(pr[3], hp.x, hp.y), q = spawn("rifle_n", qp.x, qp.y);
    q.give({ type: "enter", target: h });
    var tq = ticks(20, function () { return q.carried; });
    h.padOn = sh; h.parked = false; h.give({ type: "rtb" });           // the right-click on her deck
    var t1 = ticks(60, function () { return h.parked && h.padOn === sh; });
    var landed = t1 > 0 && sh.wing().indexOf(h) >= 0 && q.carried && h.cargo.indexOf(q) >= 0;
    var out = Math.hypot(sh.x - aim.x, sh.y - aim.y) / TT;
    var why = Game.airLand(h, aim.x, aim.y);
    var t2 = ticks(90, function () { return !q.carried; });
    ticks(1);
    var dq = Math.hypot(q.x - aim.x, q.y - aim.y);
    var ashore = !q.carried && !q.dead && GameMap.passable(M, (q.x / TT) | 0, (q.y / TT) | 0, "ground") && dq < 4 * TT;
    chk(pr[1] + ": a " + UNITS[pr[3]].name + " takes a rifle squad aboard on the beach, lands on the " + UNITS[pr[2]].name + " " + out.toFixed(1) +
        " tiles out with it, launches from her and puts the squad ashore",
        tq > 0 && landed && why === "" && t2 > 0 && ashore && !h.parked,
        "boarded after " + tq.toFixed(1) + " s; landed " + landed + " after " + t1.toFixed(1) + " s; " + (why || "airLand given") +
        "; ashore after " + t2.toFixed(1) + " s, " + tiles(dq) + " tiles from the point; helicopter parked " + h.parked);
    gone(q); gone(h); sh.wing().forEach(gone); gone(sh);
  });

  /* (f) the commander never buys a new one, nor anything for a deck */
  var src = (typeof readFile === "function") ? readFile("js/ai.js") : null;
  var named = src === null ? [] : NEW5B.filter(function (k) { return src.indexOf(k) >= 0; });
  var A = Game.players.filter(function (p) { return p.isAI && !p.defeated; })[0];
  if (!A) { chk("an AI commander to watch", false, ""); P.faction = fac0; useEra("e20"); return; }
  var keep = { faction: A.faction, era: A.era, cash: A.cash, oil: A.oil, tech: A.tech }, seen = [], built = [];
  var enq = A.enqueue, ord = Game.orderDeckAircraft;
  A.enqueue = function (q2, id) { seen.push(id); return enq.apply(this, arguments); };
  Game.orderDeckAircraft = function (ship, id) { if (ship.owner === A) seen.push("deck:" + id); return ord.apply(this, arguments); };
  try {
    [["gbr", "e00"], ["pact", "e80"]].forEach(function (fe) {
      A.faction = fe[0]; A.era = fe[1]; A.cash = 300000; A.oil = 60000; A.tech = 3;
      ticks(60);
      A.units.forEach(function (u) { if (!u.dead && (NEW5B.indexOf(u.def.id) >= 0 || u.def.role === "assault_sea")) built.push(u.def.id); });
    });
  } catch (err) { built.push("CRASH " + err); }
  A.enqueue = enq; Game.orderDeckAircraft = ord;
  for (var kk in keep) A[kk] = keep[kk];
  var bad = seen.filter(function (id) { return NEW5B.indexOf(id) >= 0 || /^deck:/.test(String(id)); });
  chk("the commander, made a 2000s British and a 1980s Soviet with " + seen.length + " purchases, never buys a Sea King HC4 or a Ka-29 or an assault ship" +
      (src !== null ? ", and js/ai.js names neither" : ""),
      bad.length === 0 && built.length === 0 && named.length === 0, bad.concat(built, named).join(","));
  P.faction = fac0;
  useEra("e20");
}

/* ---------------- 13. saved and loaded with craft in her gate (WELL TRANSIT) ---------------- */
function secGateSave() {
  log("\n[13] saved with two craft driving out of a Wasp's well and one driving in, loaded and driven on (last: the load rebuilds the match)");
  P = Game.human; M = Game.map;
  useEra("e00");
  var O = openSea(8) || openSea(5);
  if (!O) { chk("open sea for the gate", false, ""); return; }
  var s = spawn("nato_e00_lhd", O.x, O.y); s.ang = -0.9;
  var a = spawn("lst", O.x, O.y), b = spawn("lst", O.x, O.y);
  s.dockCraft(a); s.dockCraft(b);
  var c = spawn("lst", O.x, O.y), dp = s.wellDoor(c);
  c.x = dp.x; c.y = dp.y;
  s.launchAll(); s.takeIntoWell(c);
  ticks(3);
  var before = [a, b, c].map(function (u) { return { ph: u.wellT && u.wellT.ph, ws: u.wellT ? u.wellT.s : NaN, x: u.x, y: u.y }; });
  var g0 = s.gateT, sx = s.x, sy = s.y;
  var r = SaveGame.save(Game, "ironfront.lhdcheck13");
  var ld = r.ok ? SaveGame.load("ironfront.lhdcheck13") : { ok: false, error: r.error };
  chk("saved at 3 s - two craft in her well on their way out, one on its way in - and loaded",
      r.ok && ld.ok && before[0].ph === "out" && before[1].ph === "out" && before[2].ph === "in",
      (r.error || "") + (ld.error || "") + " phases " + before.map(function (x) { return x.ph; }).join(","));
  if (!ld.ok) return;
  P = Game.human; M = Game.map;
  useEra("e00");
  var S = null, K = [];
  Game.entities.forEach(function (e) {
    if (e.kind === "unit" && !e.dead && e.def.id === "nato_e00_lhd" && Math.hypot(e.x - sx, e.y - sy) < 3) S = e;
  });
  before.forEach(function (bf) {
    var f = null;
    Game.entities.forEach(function (e) { if (e.kind === "unit" && !e.dead && e.def.id === "lst" && Math.hypot(e.x - bf.x, e.y - bf.y) < 2) f = e; });
    K.push(f);
  });
  var back = !!S && K.every(function (u, j) {
    return u && u.wellT && u.wellT.ship === S && u.wellT.ph === before[j].ph && S.wellGo.indexOf(u) >= 0 &&
           Math.abs(u.wellT.s - before[j].ws) < 0.01 && Math.abs(rel(S, u).s - before[j].ws) < 2 && Math.abs(rel(S, u).l) < 2 && !u.carried; });
  chk("...each craft is back in her transit, in its phase, where it was in her frame; her gate is open as it was",
      back && Math.abs(S.gateT - g0) < 0.01 && S.gateOpen,
      S ? K.map(function (u, j) { return u ? u.wellT ? u.wellT.ph + " " + rel(S, u).s.toFixed(1) + "/" + before[j].ws.toFixed(1) : "free" : "missing"; }).join(", ") +
          "; gate " + S.gateT + " (" + g0 + ")" : "no Wasp");
  if (!back) return;
  var tg = ticks(40, function () { return !K[0].wellT && !K[1].wellT && K[2].carried && S.gateT === 0; });
  chk("...driven on, the two reach their water, the third is docked in her well, and her gate shuts",
      tg > 0 && onSea(K[0]) && onSea(K[1]) && !K[0].carried && S.well.length === 1 && S.well[0] === K[2] && !S.gateOpen,
      "after " + tg.toFixed(1) + " s; well " + S.well.length);
}
