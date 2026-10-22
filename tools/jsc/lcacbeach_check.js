/* tools/jsc/lcacbeach_check.js - an air-cushion landing craft runs up to the
   waterline and puts its load off over its ramp (entities.js AIR-CUSHION
   LANDING), checked on the real game under JavaScriptCore, 3D off.

     python3 tools/jsc/run.py index.html --test tools/jsc/lcacbeach_check.js

   (owner) "Air-cushion craft run up to the waterline (LCAC onto the sand
   edge) and unload there; the vehicle rolls off the ramp and drives to your
   aim point instead of appearing 4.5 tiles away. The LST's beaching stays as
   it is." Found on hormuz, e00: an LCAC launched from a Wasp with an M1A2
   and right-clicked onto a beach unloaded about 2.5 tiles off the waterline,
   and the tank appeared at the aim point. Checked, on hormuz:
     1. the flag (def.aircushion) is on the LCAC row (lst) alone - the craft
        every well that takes an air-cushion craft carries - and on no LCU,
        CTM or landing ship;
     2. an LCAC launched from a Wasp with an M1A2, right-clicked onto a beach
        through the canvas handler, runs in to the waterline (its hull within
        a tile of the sand), stays a sea unit on a sea tile, and only there
        puts the tank off - on the land tile at its ramp, within 1.5 tiles of
        it - and the tank then drives to the aim point and arrives;
     3. three LCACs from one Wasp, selected together and right-clicked onto
        one beach, each run in to a waterline tile of its own, each tank
        comes off beside its own craft, and all three gather round the aim;
     4. a conventional craft - the LCU 1610, the CTM, the Newport LST and the
        Ivan Rogov over her bow ramp - unloads exactly as before: as soon as
        it is inside 4.5 tiles of the aim, the tank on the aim tile itself
        (the POS lines are the positions, to diff against HEAD);
     5. a commander's LCAC, given the order ai.js runAmphib gives, lands the
        same way;
     6. saved half way through its run-in, an LCAC comes back with its
        waterline and ramp, runs on, and lands its tank beside it. (Last: the
        load rebuilds the match.) */
var TT = 32, PASS = 0, FAIL = 0, DT = 1 / 30;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-cash", "200000"); set("opt-seed", "lcacbeach"); set("opt-fog", "1"); set("opt-3d", "0");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

var P, M, BEACH;
function ticks(sec, stop) {
  var n = Math.round(sec / DT);
  for (var i = 0; i < n; i++) { Game.tick(DT); if (stop && stop()) return (i + 1) * DT; }
  return -1;
}
function f2(v) { return (v / TT).toFixed(2); }
function spawn(id, x, y, owner) { var u = Game.spawnUnitAt(owner || P, id, x, y); if (u) { u.stance = "hold"; u.order = { type: "idle" }; } return u; }
function gone(u) {
  if (!u) return; u.dead = true;
  var i = Game.entities.indexOf(u); if (i >= 0) Game.entities.splice(i, 1);
  var l = u.owner && (u.kind === "building" ? u.owner.buildings : u.owner.units);
  if (l) { i = l.indexOf(u); if (i >= 0) l.splice(i, 1); }
}
function same(a, b) { return a.slice().sort().join(",") === b.slice().sort().join(","); }
function useEra(e) { P.era = e; }
function tileOf(u) { return { x: (u.x / TT) | 0, y: (u.y / TT) | 0 }; }
function onGround(u) { var t = tileOf(u); return GameMap.passable(M, t.x, t.y, "ground"); }
function onSea(u) { var t = tileOf(u); return GameMap.passable(M, t.x, t.y, "sea"); }
/* how far a point is from dry land, in tiles: to the nearest edge of a tile a
   tank can stand on (0 on land) */
function gapToLand(x, y) {
  var tx = (x / TT) | 0, ty = (y / TT) | 0, best = Infinity;
  for (var j = -8; j <= 8; j++) for (var i = -8; i <= 8; i++) {
    var nx = tx + i, ny = ty + j;
    if (nx < 0 || ny < 0 || nx >= M.W || ny >= M.H || !GameMap.passable(M, nx, ny, "ground")) continue;
    var cx = Math.max(nx * TT, Math.min(x, (nx + 1) * TT)), cy = Math.max(ny * TT, Math.min(y, (ny + 1) * TT));
    best = Math.min(best, Math.hypot(x - cx, y - cy));
  }
  return best / TT;
}
/* the beach nearest `home` with thirteen tiles of open water, three wide, straight out from it
   (lhd_check.js findBeach), and the ground behind it dry for three tiles */
function findBeach(hx, hy) {
  var best = null, bd = Infinity;
  for (var y = 6; y < M.H - 6; y++) for (var x = 6; x < M.W - 6; x++) {
    if (!GameMap.passable(M, x, y, "ground") || Game.tileBlocked(x, y, null)) continue;
    for (var d = 0; d < 4; d++) {
      var dx = [1, -1, 0, 0][d], dy = [0, 0, 1, -1][d], ok = true;
      for (var k = 1; k <= 13 && ok; k++) {
        var xx = x + dx * k, yy = y + dy * k;
        for (var s = -1; s <= 1 && ok; s++) {
          var sx = xx + (dx ? 0 : s), sy = yy + (dy ? 0 : s);
          if (sx < 0 || sy < 0 || sx >= M.W || sy >= M.H || M.terrain[sy * M.W + sx] !== T.WATER) ok = false;
        }
      }
      for (var k2 = 1; k2 <= 3 && ok; k2++)
        for (var s2 = -1; s2 <= 1 && ok; s2++) {
          var lx = x - dx * k2 + (dx ? 0 : s2), ly = y - dy * k2 + (dy ? 0 : s2);
          if (!GameMap.passable(M, lx, ly, "ground") || Game.tileBlocked(lx, ly, null)) ok = false;
        }
      if (!ok) continue;
      var dd = Math.hypot(x - hx, y - hy);
      if (dd < bd) { bd = dd; best = { x: x, y: y, dx: dx, dy: dy }; }
    }
  }
  return best;
}
function land(B, k) { return { x: (B.x - B.dx * k + 0.5) * TT, y: (B.y - B.dy * k + 0.5) * TT }; }
function off(B, k) { return { x: (B.x + B.dx * k + 0.5) * TT, y: (B.y + B.dy * k + 0.5) * TT }; }
/* a right-click on a point of the map, through the canvas handler, with `us` selected */
function rclickAt(us, wx, wy) {
  var s = UI.selection; for (var i = 0; i < s.length; i++) s[i].selected = false; s.length = 0;
  us.forEach(function (u) { u.selected = true; s.push(u); });
  Render.setCam(wx, wy); Render.draw(DT, UI.input);
  var cv = document.getElementById("cv"), rc = cv.getBoundingClientRect();
  cv.dispatchEvent({ type: "mousedown", button: 2, clientX: rc.left + Render.sx(wx, wy), clientY: rc.top + Render.sy(wx, wy),
                     shiftKey: false, ctrlKey: false, metaKey: false });
  s.forEach(function (u) { u.selected = false; }); s.length = 0;
}
/* a Wasp off the beach, bows in, with `n` LCACs in her well and the tanks in her hold */
function waspWithCraft(B, n, tanks) {
  var o = off(B, 8), s = spawn("nato_e00_lhd", o.x, o.y), craft = [];
  s.ang = Math.atan2(-B.dy, -B.dx);
  for (var i = 0; i < n; i++) { var c = spawn("lst", o.x, o.y); s.dockCraft(c); craft.push(c); }
  var tk = [];
  for (var j = 0; j < tanks; j++) { var t = spawn("mbt_n", P.homeX, P.homeY); s.cargo.push(t); t.carried = true; tk.push(t); }
  return { s: s, craft: craft, tanks: tk };
}
/* tick until every craft has put its load off, noting where each was and where its load came down */
function watchLanding(craft, sec) {
  var seen = craft.map(function (c) { return { c: c, load: c.cargo.slice(), at: null, t: -1 }; }), t = 0;
  var n = Math.round(sec / DT);
  for (var i = 0; i < n; i++) {
    Game.tick(DT); t += DT;
    seen.forEach(function (w) {
      if (w.at || !w.load.length || w.c.cargo.length) return;
      w.at = { x: w.c.x, y: w.c.y, sea: onSea(w.c), layer: w.c.layer, load: w.load.map(function (u) { return { u: u, x: u.x, y: u.y, ord: u.order.type, ox: u.order.x, oy: u.order.y }; }) };
      w.t = t;
    });
    if (seen.every(function (w) { return w.at || !w.load.length; })) break;
  }
  return seen;
}

function run() {
  P = Game.human; M = Game.map;
  Game.players.forEach(function (p) { if (p !== P && p.isAI) AI.setPeace(p, true); });
  Game.checkVictory = function () {};
  P.cash = 500000; P.oil = 50000; P.tech = 3; P.techCap = undefined;
  BEACH = findBeach(P.homeX / TT | 0, P.homeY / TT | 0);
  if (!BEACH) { chk("a beach with open water off it", false, ""); return; }
  log("beach " + BEACH.x + "," + BEACH.y + " facing " + BEACH.dx + "," + BEACH.dy);
  secFlag();
  secWasp();
  secThree();
  secConventional();
  secAI();
  secSave();
}

/* ---------------- 1. which craft ride an air cushion ---------------- */
function secFlag() {
  log("\n[1] the air-cushion flag");
  var flagged = Object.keys(UNITS).filter(function (id) { return UNITS[id].aircushion; });
  var wells = {};
  Object.keys(UNITS).forEach(function (id) {
    var w = UNITS[id].wellCraft;
    if (w) Object.keys(w).forEach(function (k) { (wells[k] = wells[k] || []).push(id); });
  });
  log("  well craft: " + Object.keys(wells).map(function (k) { return k + (UNITS[k] && UNITS[k].aircushion ? " (air cushion)" : " (conventional)") + " in " + wells[k].join(","); }).join("; "));
  var conv = Object.keys(UNITS).filter(function (id) {
    var d = UNITS[id]; return id !== "lst" && d.layer === "sea" && (d.amphib || d.role === "transport_sea" || d.role === "landing_craft"); });
  var badConv = conv.filter(function (id) { return UNITS[id].aircushion; });
  chk("the flag is on the LCAC row (lst) alone, which stands in for the Type 075's Type 726 and the Ivan Rogov's Project 1206",
      same(flagged, ["lst"]) && wells.lst && wells.lst.indexOf("lhd_c") >= 0, "flagged: " + (flagged.join(",") || "none"));
  chk("no LCU, CTM, landing ship or amphibious ship carries it (" + conv.length + " rows)", badConv.length === 0 && conv.length > 10, badConv.join(","));
}

/* ---------------- 2. an LCAC from a Wasp, right-clicked onto a beach ---------------- */
function secWasp() {
  log("\n[2] an LCAC launched from a Wasp with an M1A2, right-clicked onto the beach");
  useEra("e00");
  var B = BEACH, W = waspWithCraft(B, 1, 1), c = W.craft[0], tk = W.tanks[0];
  W.s.launchAll();
  var tc = ticks(30, function () { return !c.wellT; });
  chk("launched, it drives out of her well with the tank aboard", tc > 0 && c.cargo.length === 1 && c.cargo[0] === tk && onSea(c),
      "clear after " + tc.toFixed(1) + " s, cargo " + c.cargo.length);
  var aim0 = land(B, 2);
  rclickAt([c], aim0.x, aim0.y);
  var o = c.order, aim = { x: o.x, y: o.y };
  chk("the right-click on the sand gives it the landing order (ui.js unloadAt)", o.type === "move" && !!o.unloadAt,
      o.type + " unloadAt " + !!o.unloadAt + " to " + f2(o.x) + "," + f2(o.y) + " (clicked " + f2(aim0.x) + "," + f2(aim0.y) + ")");
  var w = watchLanding([c], 60)[0], at = w.at;
  if (!at) { chk("it lands the tank", false, "cargo still " + c.cargo.length + ", order " + c.order.type); gone(c); gone(tk); gone(W.s); return; }
  var gap = gapToLand(at.x, at.y), toAim = Math.hypot(at.x - aim.x, at.y - aim.y) / TT;
  var L = at.load[0], fromCraft = Math.hypot(L.x - at.x, L.y - at.y) / TT, landAim = Math.hypot(L.x - aim.x, L.y - aim.y) / TT;
  log("  MEASURED: craft unloaded " + gap.toFixed(2) + " tiles off the sand, " + toAim.toFixed(2) + " tiles from the aim, after " + w.t.toFixed(1) +
      " s; the tank came down " + fromCraft.toFixed(2) + " tiles from the craft and " + landAim.toFixed(2) + " tiles from the aim");
  chk("it runs in to the waterline before it unloads: the hull within a tile of the sand, not 4.5 tiles out",
      gap <= 1.0 && at.sea && at.layer === "sea",
      gap.toFixed(2) + " tiles off the sand, " + toAim.toFixed(2) + " from the aim; on a sea tile " + at.sea + ", layer " + at.layer);
  chk("the tank comes off onto the land tile at its ramp, within 1.5 tiles of the craft - not at the aim point",
      fromCraft <= 1.5 && GameMap.passable(M, (L.x / TT) | 0, (L.y / TT) | 0, "ground") && !tk.carried && tk.cat === "vehicle",
      fromCraft.toFixed(2) + " tiles from the craft at " + f2(L.x) + "," + f2(L.y));
  chk("...and is ordered on to the aim point", L.ord === "move" && Math.abs(L.ox - aim.x) < 1 && Math.abs(L.oy - aim.y) < 1,
      L.ord + " to " + f2(L.ox || 0) + "," + f2(L.oy || 0));
  var ta = ticks(30, function () { return !tk.moving && tk.order.type === "idle"; });
  var end = Math.hypot(tk.x - aim.x, tk.y - aim.y) / TT;
  chk("the tank drives up the beach to the aim point and stops there", ta > 0 && end < 0.8 && onGround(tk),
      "after " + (ta > 0 ? ta.toFixed(1) + " s" : "30 s, still " + tk.order.type) + ", " + end.toFixed(2) + " tiles from the aim");
  chk("the craft has done what it was told: idle at the waterline, hold empty", c.order.type === "idle" && !c.cargo.length && onSea(c),
      c.order.type + ", cargo " + c.cargo.length);
  gone(c); gone(tk); gone(W.s);
}

/* ---------------- 3. three of them onto one beach ---------------- */
function secThree() {
  log("\n[3] three LCACs from one Wasp, each with a tank, right-clicked together onto one beach");
  useEra("e00");
  var B = BEACH, W = waspWithCraft(B, 3, 3);
  W.s.launchAll();
  var tc = ticks(30, function () { return W.craft.every(function (c) { return !c.wellT; }); });
  var loaded = W.craft.filter(function (c) { return c.cargo.length === 1; }).length;
  /* the hold feeds the first craft first: one tank to each, as a player would load them */
  if (loaded !== 3) {
    var all = []; W.craft.forEach(function (c) { all = all.concat(c.cargo); c.cargo.length = 0; });
    W.craft.forEach(function (c, i) { if (all[i]) c.cargo.push(all[i]); });
  }
  var aim0 = land(B, 2);
  rclickAt(W.craft, aim0.x, aim0.y);
  var aim = { x: W.craft[0].order.x, y: W.craft[0].order.y };
  var seen = watchLanding(W.craft, 60);
  var tiles = {}, worst = 0, gaps = [];
  seen.forEach(function (w) {
    if (!w.at) return;
    tiles[((w.at.x / TT) | 0) + "," + ((w.at.y / TT) | 0)] = 1;
    gaps.push(gapToLand(w.at.x, w.at.y).toFixed(2));
    w.at.load.forEach(function (L) { worst = Math.max(worst, Math.hypot(L.x - w.at.x, L.y - w.at.y) / TT); });
  });
  var landed = seen.filter(function (w) { return !!w.at; }).length;
  chk("each runs in to a waterline tile of its own and lands its tank beside it",
      tc > 0 && landed === 3 && Object.keys(tiles).length === 3 && gaps.every(function (g) { return +g <= 1.0; }) && worst <= 1.5,
      landed + "/3 landed on " + Object.keys(tiles).join(" ") + "; off the sand " + gaps.join(", ") + " tiles; the farthest tank " + worst.toFixed(2) + " tiles from its craft");
  var tk = W.tanks;
  var ta = ticks(40, function () { return tk.every(function (t) { return !t.moving && t.order.type === "idle"; }); });
  ticks(3);                        // settle() eases hulls left touching apart at rest, inside 3 s
  var dists = tk.map(function (t) { return Math.hypot(t.x - aim.x, t.y - aim.y) / TT; });
  var pairs = 0, ov = 0;
  for (var i = 0; i < tk.length; i++) for (var j = i + 1; j < tk.length; j++) {
    var o2 = tk[i].r + tk[j].r - Math.hypot(tk[i].x - tk[j].x, tk[i].y - tk[j].y);
    ov = Math.max(ov, o2);
    if (o2 > 2) pairs++;
  }
  chk("the three tanks drive up to the aim and stand round it, none on top of another",
      ta > 0 && dists.every(function (d) { return d < 2.5; }) && pairs === 0 && tk.every(onGround),
      "all stopped after " + (ta > 0 ? ta.toFixed(1) : ">40") + " s, " + dists.map(function (d) { return d.toFixed(2); }).join(", ") +
      " tiles from the aim; pairs overlapping by more than 2 px " + pairs + " (the most " + ov.toFixed(1) + " px)");
  W.craft.forEach(gone); tk.forEach(gone); gone(W.s);
}

/* ---------------- 4. conventional craft, unchanged ---------------- */
function secConventional() {
  log("\n[4] conventional craft unload as they always did (4.5 tiles, on the aim tile)");
  var B = BEACH, aim = land(B, 2);
  [["e00", "nato_lcu"], ["e00", "fra_ctm"], ["e60", "nato_e60_lst"], ["e80", "pact_e80_lpd"]].forEach(function (pr) {
    useEra(pr[0]);
    if (!UNITS[pr[1]]) { chk(pr[1] + " exists", false, ""); return; }
    var o = off(B, 9), c = spawn(pr[1], o.x, o.y), tk = spawn("mbt_n", P.homeX, P.homeY);
    c.ang = Math.atan2(-B.dy, -B.dx);
    c.cargo.push(tk); tk.carried = true;
    c.give({ type: "move", x: aim.x, y: aim.y, unloadAt: true });
    var w = watchLanding([c], 60)[0], at = w.at;
    if (!at) { chk(pr[1] + " lands its tank", false, "cargo " + c.cargo.length); gone(c); gone(tk); return; }
    var L = at.load[0], d = Math.hypot(at.x - aim.x, at.y - aim.y) / TT, fc = Math.hypot(L.x - at.x, L.y - at.y) / TT;
    log("  POS " + pr[1] + " craft " + at.x.toFixed(2) + "," + at.y.toFixed(2) + " tank " + L.x.toFixed(2) + "," + L.y.toFixed(2) +
        " order " + L.ord + " t " + w.t.toFixed(3));
    /* unload() sets each passenger on the tile nearest the aim within one
       ring past the first ring of the craft's that holds dry ground - here a
       tile short of the aim, three and a half from the hull */
    chk(pr[0] + " " + UNITS[pr[1]].name + ": unloads as soon as it is inside 4.5 tiles of the aim (" + d.toFixed(2) + "), " +
        gapToLand(at.x, at.y).toFixed(2) + " off the sand; the tank set down at once " + fc.toFixed(2) + " tiles from the hull, toward the aim, and left idle",
        d <= 4.5 && d > 4.0 && fc > 2.5 && Math.hypot(L.x - aim.x, L.y - aim.y) / TT <= 1.01 && onGround(L) && L.ord === "idle" && !c.def.aircushion,
        "tank at " + f2(L.x) + "," + f2(L.y) + " (aim " + f2(aim.x) + "," + f2(aim.y) + "), order " + L.ord);
    gone(c); gone(tk);
  });
}

/* ---------------- 5. the commander's landing ---------------- */
function secAI() {
  log("\n[5] a commander's LCAC, given the order ai.js runAmphib gives");
  var E = Game.players.filter(function (p) { return p !== P && p.isAI; })[0];
  if (!E) { chk("an AI side", false, ""); return; }
  var B = findBeach(E.homeX / TT | 0, E.homeY / TT | 0);
  if (!B) { chk("a beach by the commander's home", true, "none of that shape - skipped"); return; }
  useEra("e00");
  var o = off(B, 9), c = spawn("lst", o.x, o.y, E), tk = spawn("mbt_n", E.homeX, E.homeY, E), aim = land(B, 2);
  c.cargo.push(tk); tk.carried = true;
  c.give({ type: "move", x: aim.x, y: aim.y, unloadAt: true });
  var w = watchLanding([c], 60)[0], at = w.at;
  if (!at) { chk("it lands the tank", false, "cargo " + c.cargo.length + ", order " + c.order.type + (c.dead ? " (sunk)" : "")); gone(c); gone(tk); return; }
  var gap = gapToLand(at.x, at.y), L = at.load[0], fc = Math.hypot(L.x - at.x, L.y - at.y) / TT;
  chk("it runs in to the waterline (" + gap.toFixed(2) + " tiles off the sand) and the tank comes off beside it (" + fc.toFixed(2) + " tiles), ordered on to the aim",
      gap <= 1.0 && fc <= 1.5 && L.ord === "move" && onSea(c), "order " + L.ord);
  gone(c); gone(tk);
}

/* ---------------- 6. saved on the run in ---------------- */
function secSave() {
  log("\n[6] saved half way through the run-in, loaded and driven on (last: the load rebuilds the match)");
  useEra("e00");
  var B = BEACH, o = off(B, 9), aim = land(B, 2), c = spawn("lst", o.x, o.y), tk = spawn("mbt_n", P.homeX, P.homeY);
  c.ang = Math.atan2(-B.dy, -B.dx);
  c.cargo.push(tk); tk.carried = true;
  c.give({ type: "move", x: aim.x, y: aim.y, unloadAt: true });
  ticks(1.0);
  var co = c.order, snap = { x: c.x, y: c.y, sx: co.sx, sy: co.sy, rx: co.rampX, ry: co.rampY, n: c.cargo.length };
  chk("1 s into the run, it is still at sea with the tank aboard and its waterline chosen",
      snap.n === 1 && co.unloadAt && co.rampX >= 0 && gapToLand(c.x, c.y) > 2,
      "off the sand " + gapToLand(c.x, c.y).toFixed(2) + " tiles; waterline " + (co.sx !== undefined ? f2(co.sx) + "," + f2(co.sy) : "none") +
      ", ramp " + (co.rampX !== undefined ? f2(co.rampX) + "," + f2(co.rampY) : "none"));
  var r = SaveGame.save(Game, "ironfront.lcacbeach");
  var ld = r.ok ? SaveGame.load("ironfront.lcacbeach") : { ok: false, error: r.error };
  chk("saved and loaded", r.ok && ld.ok, (r.error || "") + (ld.error || ""));
  if (!ld.ok) return;
  P = Game.human; M = Game.map;
  Game.players.forEach(function (p) { if (p !== P && p.isAI) AI.setPeace(p, true); });
  Game.checkVictory = function () {};
  useEra("e00");
  var C = null;
  Game.entities.forEach(function (e) { if (e.kind === "unit" && !e.dead && e.def.id === "lst" && e.owner === P && Math.hypot(e.x - snap.x, e.y - snap.y) < 2) C = e; });
  var O = C && C.order;
  chk("the craft is back on its run in: the order, the waterline it was running for, its ramp's land, the tank aboard",
      !!C && O.type === "move" && O.unloadAt && Math.abs(O.sx - snap.sx) < 0.2 && Math.abs(O.sy - snap.sy) < 0.2 &&
      O.rampX === snap.rx && O.rampY === snap.ry && C.cargo.length === 1 && C.cargo[0].carried,
      C ? O.type + " unloadAt " + !!O.unloadAt + " waterline " + (O.sx !== undefined ? f2(O.sx) + "," + f2(O.sy) : "none") +
          " ramp " + (O.rampX !== undefined ? f2(O.rampX) + "," + f2(O.rampY) : "none") + " cargo " + C.cargo.length : "not found");
  if (!C) return;
  var T2 = C.cargo[0], w = watchLanding([C], 60)[0], at = w.at;
  if (!at) { chk("driven on, it lands the tank", false, "cargo " + C.cargo.length); return; }
  var gap = gapToLand(at.x, at.y), L = at.load[0], fc = Math.hypot(L.x - at.x, L.y - at.y) / TT;
  chk("driven on, it reaches the waterline (" + gap.toFixed(2) + " tiles off the sand) and the tank comes off beside it (" + fc.toFixed(2) + " tiles)",
      gap <= 1.0 && fc <= 1.5 && L.ord === "move", "order " + L.ord);
  var ta = ticks(30, function () { return !T2.moving && T2.order.type === "idle"; });
  var end = Math.hypot(T2.x - aim.x, T2.y - aim.y) / TT;
  chk("...and the tank drives to the aim point", ta > 0 && end < 0.8, end.toFixed(2) + " tiles from it");
}
