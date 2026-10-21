/* tools/jsc/airlift_check.js - AIRLIFT: transport aircraft and helicopters
   carry vehicles by real weight, and an aeroplane delivers them by landing
   on open ground - checked on the real game under JavaScriptCore.

     python3 tools/jsc/run.py index.html --test tools/jsc/airlift_check.js
     (`-- trace` prints the delivery in [5] once a second)

   (owner) "the C-130 and other transportation airplane/helicopter should be
   able to carry some car, mobile, light tank, right?" - anything that REALLY
   fits. generations.js AIRLIFT gives every transport its real payload,
   entities.js AIRLIFT weighs what boards and AIRLIFT LANDING flies the
   delivery, game.js G.findStrip / G.airLand pick the ground and give the
   order, ui.js hands it out. Checked:
     0. the data: every transport and airlift row has a payload, every
        aeroplane a strip, the four aeroplanes that were filed as hovering
        helicopters are aeroplanes, and every vehicle has a mass;
     1. a Humvee boards a C-130J parked on its airbase, through the page's
        own right-click on #cv, and so does a second; the panel says
        "2 VEH + 0 INF · 10 OF 20 T";
     2. an Abrams is refused by the C-130J, with the reason, and boards a
        C-17; a C-17 will not take a second Abrams;
     3. the accounting with infantry and vehicles together: two Humvees and
        three riflemen fill a C-130J's 20 t, the fourth rifleman and a third
        Humvee do not get on, and the Humvee is told why; eight riflemen
        alone fill its eight seats as before;
     4. a Black Hawk refuses a Humvee and a Chinook takes two of them (the
        Wikipedia photograph), coming to them to do it; U puts them down; a
        helicopter sent to a point with G.airLand sets them down there;
     5. a C-130J in the air with two Humvees, U: it picks a strip near where
        it was going, lands on it lined up, rolls out, puts the Humvees down
        beside the strip and not on it, takes off and lands back at its
        airbase; every fixed-wing airlift type lands from eight headings;
     6. no strip near the point: refused, with the reason, and the order it
        had is untouched;
     7. shot down with a Humvee aboard: the Humvee dies with it;
     8. the KPA's An-2 and Po-2 and Il-76, and Taiwan's C-46, fly as
        aeroplanes: no hover, keep flying, burn fuel, land on a runway;
     9. infantry-only loads behave exactly as before: every transport takes
        exactly its seats in riflemen, a squad boards a C-130 in flight, and
        U puts infantry out of a C-130 in the air without landing it;
    10. the build card says what it lifts and the strip it needs;
    11. a save made mid-delivery - one transport on its approach with its
        load, one standing on its strip - loads into the same delivery, and
        both finish it (last: the load rebuilds the match). */
var TT = 32, PASS = 0, FAIL = 0, DT = 1 / 30;
var TRACE = typeof __ARGS !== "undefined" && __ARGS.indexOf("trace") >= 0;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "fulda"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-cash", "200000"); set("opt-seed", "btest"); set("opt-fog", "1"); set("opt-3d", "0");
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

/* ---------------- helpers ---------------- */
var P, E, M, SAID = [], BASE = null;
function ticks(sec, stop) {
  var n = Math.round(sec / DT);
  for (var i = 0; i < n; i++) { Game.tick(DT); if (stop && stop()) return (i + 1) * DT; }
  return -1;
}
/* what was said: through Game.alert (entities.js, game.js), and ui.js's own
   alert, which only the page's #alerts rail sees - caught as it is appended */
function hearAlerts() {
  var a0 = Game.alert; Game.alert = function (m) { SAID.push({ t: Game.time, m: String(m) }); return a0.apply(this, arguments); };
  var box = document.getElementById("alerts");
  if (box && box.appendChild) {
    var ap = box.appendChild;
    box.appendChild = function (el) {
      var m = String(el && el.textContent || "");
      if (!SAID.some(function (a) { return a.m === m && a.t === Game.time; })) SAID.push({ t: Game.time, m: m });
      return ap.apply(this, arguments);
    };
  }
}
function readBox() {}
function said(re, t0) { return SAID.some(function (a) { return a.t >= (t0 || 0) && re.test(a.m); }); }
function saidText(t0) { readBox(); return SAID.filter(function (a) { return a.t >= (t0 || 0); }).map(function (a) { return a.m; }).join(" | "); }
function lastAlert() {
  var box = document.getElementById("alerts");
  return box && box.children.length ? String(box.children[box.children.length - 1].textContent) : "";
}
function tiles(px) { return (px / TT).toFixed(2); }
function gone(u) {
  if (!u) return; u.dead = true;
  var i = Game.entities.indexOf(u); if (i >= 0) Game.entities.splice(i, 1);
  var l = u.owner && (u.kind === "building" ? u.owner.buildings : u.owner.units);
  if (l) { i = l.indexOf(u); if (i >= 0) l.splice(i, 1); }
}
/* the top-left tile of a w x h block of open, unbuilt ground nearest (nx, ny) */
function openGround(w, h, nx, ny, edge, far) {
  var best = null, bd = Infinity;
  for (var y = edge; y + h < M.H - edge; y += 1) for (var x = edge; x + w < M.W - edge; x += 1) {
    var d = Math.hypot(x + w / 2 - nx, y + h / 2 - ny);
    if (d >= bd || d > (far || 14)) continue;
    var ok = true;
    for (var j = 0; j < h && ok; j++) for (var i = 0; i < w; i++)
      if (!GameMap.passable(M, x + i, y + j, "ground") || Game.tileBlocked(x + i, y + j, null)) { ok = false; break; }
    if (ok) { bd = d; best = { x: x, y: y }; }
  }
  return best;
}
function sel(list) {
  var s = UI.selection; for (var i = 0; i < s.length; i++) s[i].selected = false; s.length = 0;
  list.forEach(function (u) { u.selected = true; s.push(u); });
}
function key(k, shift) {
  ["keydown", "keyup"].forEach(function (type) {
    var ev = { type: type, key: k, shiftKey: !!shift, ctrlKey: false, metaKey: false, altKey: false, preventDefault: function () {} };
    (__listeners["win:" + type] || []).slice().forEach(function (f) { f(ev); });
  });
}
function panel() { return String((document.getElementById("selinfo") || {}).innerHTML || ""); }
/* where an entity is drawn on the 2D view, as ui.js pickAt reads it */
function scrOf(e) {
  return { x: Render.sx(e.x, e.y),
           y: Render.sy(e.x, e.y, e.layer === "air" ? 0 : GameMap.elevAt(M, e.tx, e.ty)) - (e.layer === "air" ? 34 * Render.cam.z : 0) };
}
function scrAt(wx, wy) { return { x: Render.sx(wx, wy), y: Render.sy(wx, wy, 0) }; }
function rclick(p) {
  var cv = document.getElementById("cv"), rc = cv.getBoundingClientRect();
  cv.dispatchEvent({ type: "mousedown", button: 2, clientX: rc.left + p.x, clientY: rc.top + p.y,
                     shiftKey: false, ctrlKey: false, metaKey: false });
}
/* right-click a unit, with the camera on it, as the player would */
function rclickUnit(t) { Render.setCam(t.x, t.y); rclick(scrOf(t)); }
function rclickGround(wx, wy) { Render.setCam(wx, wy); rclick(scrAt(wx, wy)); }
function spawn(id, x, y, owner) {
  var u = Game.spawnUnitAt(owner || P, id, x, y);
  if (u) { u.stance = "hold"; }
  return u;
}
/* an aircraft parked on our airbase, as one delivered there */
function parkOn(u, base) {
  u.padOn = base; u.parked = true; u.order = { type: "parked" };
  u.x = base.x; u.y = base.y; u.fuel = u.fuelMax;
  ticks(0.2);
}
/* clear the ground units off a square of the map, so a strip is not refused
   for a rifleman the AI left standing on it */
function clearArea(cx, cy, R, keep) {
  Game.entities.slice().forEach(function (e) {
    if (e.kind !== "unit" || e.dead || e.owner === P || (keep && keep.indexOf(e) >= 0)) return;
    if (Math.hypot(e.x - cx, e.y - cy) < R * TT) gone(e);
  });
}
function onStrip(u, o) {
  var tl = Unit.stripTiles(M, o), k = u.ty * M.W + u.tx;
  return tl.indexOf(k) >= 0;
}

function run() {
  P = Game.human; M = Game.map;
  E = Game.players.filter(function (p) { return p !== P && !Game.allied(P, p); })[0];
  Game.players.forEach(function (p) { if (p !== P && p.isAI) AI.setPeace(p, true); });
  Game.checkVictory = function () {};
  hearAlerts();
  var hx = P.homeX / TT, hy = P.homeY / TT;
  var ab = openGround(BUILDINGS.airbase.w + 4, BUILDINGS.airbase.h + 4, hx, hy, 6);
  BASE = ab ? Game.placeBuilding(P, "airbase", ab.x + 2, ab.y + 2, true) : null;
  if (BASE) { BASE.buildProgress = 1; P.primary = P.primary || {}; P.primary.airbase = BASE; }
  chk("an airbase for the transports", !!BASE, ab ? "(" + ab.x + "," + ab.y + ") faction " + P.faction : "no plot");
  if (!BASE) return;
  var sections = [secData, secBoard, secHeavy, secMixed, secPack, secHelo, secDeliver, secSweep, secGroundOrder,
                  secPickup, secBlocked, secBingo, secNoStrip, secShotDown, secPlanes, secInfantry, secCard];
  sections.forEach(function (f) {
    var w0 = Date.now();
    readBox();
    try { f(); } catch (e) { FAIL++; log("  FAIL  " + f.name + " crashed   -- " + e + " " + String(e.stack || "").split("\n").slice(0, 3).join(" / ")); }
    log("     (" + ((Date.now() - w0) / 1000).toFixed(1) + " s real)");
  });
  try { secSave(); } catch (e) { FAIL++; log("  FAIL  secSave crashed   -- " + e + " " + String(e.stack || "").split("\n").slice(0, 3).join(" / ")); }
}

/* ---- 0. the data ---- */
function secData() {
  log("\n[0] the data: payloads, strips, the four aeroplanes, vehicle masses");
  var noPay = [], noStrip = [], hoverPlanes = [], nVeh = 0, noMass = [];
  for (var id in UNITS) {
    var d = UNITS[id];
    if (d.layer === "air" && (d.cargo || d.role === "transport" || d.role === "airlift")) {
      if (!(d.payload > 0)) noPay.push(id);
      if (!d.hover && !(d.strip >= 3)) noStrip.push(id);
    }
    if (d.cat === "vehicle" && d.layer === "ground") { nVeh++; if (!(d.mass > 0)) noMass.push(id); }
  }
  chk("every transport and airlift row has its payload in tonnes", !noPay.length, noPay.join(", ") || "all");
  chk("every fixed-wing one has a strip length of 3 tiles or more", !noStrip.length, noStrip.join(", ") || "all");
  chk("every ground vehicle has a mass", nVeh > 400 && !noMass.length, nVeh + " vehicles, " + noMass.length + " without");
  var planes = ["trans_k", "kpa_e50_transport", "kpa_e60_transport", "kpa_e80_transport", "kpa_e90_transport",
                "kpa_e00_transport", "roc_e50_transport"];
  var bad = planes.filter(function (id) { var d = UNITS[id]; return !d || d.hover || d.role !== "airlift"; });
  chk("the An-2s, the Po-2, the Il-76TD and the C-46 are aeroplanes: role airlift, no hover flag",
      !bad.length, bad.length ? bad.join(", ") : planes.length + " rows");
  var want = { airlift_n: 19.96, gbr_e00_airlift: 77.52, airlift_g: 37, nato_e00_transport: 4.08, trans_b: 10,
               kpa_e90_transport: 48, nato_e50_airlift: 16.6, fra_e90_transport: 4.5 };
  var off = Object.keys(want).filter(function (id) { return Math.abs(UNITS[id].payload - want[id]) > 0.006; });
  chk("the figures: C-130J-30 19.96 t, C-17A 77.52, A400M 37, UH-60M 4.08, Chinook 10, Il-76TD 48, C-130A 16.6, Cougar 4.5",
      !off.length, off.map(function (id) { return id + " " + UNITS[id].payload; }).join(", "));
  /* nothing that hovered before has lost it except the four aeroplanes */
  var rot = Object.keys(UNITS).filter(function (id) { var d = UNITS[id]; return d.role === "transport" && !d.hover; });
  chk("every transport helicopter still hovers", !rot.length, rot.join(", ") || "all");
}

/* a C-130J on the ramp, two Humvees beside the airbase */
var C130 = null;
function secBoard() {
  log("\n[1] a Humvee boards a C-130J on its ramp, and a second one does too");
  C130 = spawn("airlift_n", BASE.x, BASE.y); parkOn(C130, BASE);
  var spot = openGround(2, 1, BASE.tx + 1, BASE.ty + 6, 3);
  var h1 = spawn("recon_n", (spot.x + 0.5) * TT, (spot.y + 0.5) * TT), h2 = spawn("recon_n", (spot.x + 1.5) * TT, (spot.y + 0.5) * TT);
  chk("two Humvees (5 t) by the airbase", !!h1 && !!h2 && h1.def.mass === 5, h1 ? h1.def.full : "none");
  sel([h1, h2]);
  rclickUnit(C130);
  chk("right-clicking the parked C-130J sends both to it", h1.order.type === "enter" && h1.order.target === C130 &&
      h2.order.type === "enter" && h2.order.target === C130, h1.order.type + "/" + h2.order.type);
  var t = ticks(40, function () { return h1.carried && h2.carried; });
  chk("both drive to the ramp and board", h1.carried && h2.carried && C130.cargo.length === 2,
      "after " + t.toFixed(1) + " s, cargo " + C130.cargo.length);
  sel([C130]); UI.frame && UI.frame(0);
  var pn = panel();
  chk("the panel says what is aboard by weight: CARGO 2 VEH + 0 INF · 10 OF 20 T",
      pn.indexOf("2 VEH + 0 INF · 10 OF 20 T") >= 0, (pn.match(/CARGO <i>[^<]*/) || ["none"])[0]);
  var L = C130.cargoLoad();
  chk("cargoLoad: 2 vehicles, 10 t of 19.96", L.veh === 2 && L.inf === 0 && Math.abs(L.t - 10) < 1e-9 && L.cap === 19.96,
      JSON.stringify(L));
}

function secHeavy() {
  log("\n[2] an Abrams: refused by the C-130J, carried by a C-17");
  var spot = openGround(1, 1, BASE.tx - 3, BASE.ty + 6, 3);
  var ab = spawn("mbt_n", (spot.x + 0.5) * TT, (spot.y + 0.5) * TT);
  chk("an M1A2 Abrams (62 t)", !!ab && ab.def.mass === 62, ab ? ab.def.full : "none");
  var t0 = Game.time;
  sel([ab]); rclickUnit(C130);
  chk("right-clicked onto the C-130J it is refused, and told why",
      ab.order.type !== "enter" && said(/M1A2 ABRAMS \(62 T\) — TOO HEAVY FOR THE C-130J SUPER HERCULES \(20 T\)/, t0),
      ab.order.type + " / " + saidText(t0));
  chk("the refusal is the API's too: C130.canAirlift(abrams) is false", !C130.canAirlift(ab), C130.airliftRefusal(ab));
  /* the C-17 on the same ramp */
  var c17 = spawn("gbr_e00_airlift", BASE.x, BASE.y); parkOn(c17, BASE);
  chk("a C-17A Globemaster III (77.52 t) on the ramp", c17.def.payload === 77.52 && c17.parked, c17.def.full);
  var ab2 = spawn("mbt_n", ab.x + TT, ab.y);
  sel([ab, ab2]); t0 = Game.time; rclickUnit(c17);
  chk("two Abrams right-clicked onto it: the first is sent, the second is refused - 124 t is not 77.5",
      ab.order.type === "enter" && ab2.order.type !== "enter" && said(/C-17 GLOBEMASTER III HAS 15\.5 T LEFT \u2014 M1A2 ABRAMS \(62 T\) DOES NOT FIT/, t0),
      ab.order.type + "/" + ab2.order.type + " " + saidText(t0));
  ticks(40, function () { return ab.carried; });
  chk("the Abrams boards the C-17", ab.carried && c17.cargo.indexOf(ab) >= 0, "cargo " + c17.cargo.length);
  /* tidy up: the C-17 and its Abrams leave the scene */
  gone(ab); gone(ab2); c17.cargo.length = 0; gone(c17);
}

function secMixed() {
  log("\n[3] seats and tonnes together, and infantry alone as before");
  /* C130 holds two Humvees (10 t); a seat is 19.96 / 8 = 2.495 t */
  var spot = openGround(4, 2, BASE.tx + 1, BASE.ty + 6, 3);
  var sq = [];
  for (var i = 0; i < 4; i++) sq.push(spawn("rifle_n", (spot.x + i + 0.5) * TT, (spot.y + 0.5) * TT));
  var h3 = spawn("recon_n", (spot.x + 0.5) * TT, (spot.y + 1.5) * TT);
  chk("four rifle squads and a third Humvee by the airbase", sq.every(function (s) { return !!s; }) && !!h3,
      sq.map(function (s) { return s && s.def.id; }).join(","));
  sel(sq); rclickUnit(C130);
  ticks(30, function () { return sq.every(function (s) { return s.carried || s.order.type === "idle"; }); });
  var aboard = sq.filter(function (s) { return s.carried; }).length;
  chk("three squads board on top of two Humvees and the fourth does not: 10 + 3 x 2.495 = 17.5 t, a fourth would be 19.98",
      aboard === 3 && C130.cargo.length === 5, aboard + " aboard, cargo " + C130.cargo.length);
  var L = C130.cargoLoad();
  chk("the accounting: 2 vehicles, 3 infantry, 17.49 t", L.veh === 2 && L.inf === 3 && Math.abs(L.t - 17.485) < 1e-6, JSON.stringify(L));
  var t0 = Game.time;
  sel([h3]); rclickUnit(C130);
  chk("the third Humvee is refused, and told why", h3.order.type !== "enter" &&
      said(/C-130J SUPER HERCULES HAS 2\.5 T LEFT — HUMVEE \(5 T\) DOES NOT FIT/, t0), saidText(t0));
  sel([C130]); UI.frame && UI.frame(0);
  chk("the panel: CARGO 2 VEH + 3 INF · 17.5 OF 20 T", panel().indexOf("2 VEH + 3 INF · 17.5 OF 20 T") >= 0,
      (panel().match(/CARGO <i>[^<]*/) || ["none"])[0]);
  /* put the infantry down again, keep the two Humvees for [5] */
  for (var k = C130.cargo.length - 1; k >= 0; k--) {
    var c = C130.cargo[k];
    if (c.cat === "infantry") { C130.cargo.splice(k, 1); c.carried = false; gone(c); }
  }
  sq.forEach(gone); gone(h3);
  /* eight riflemen and an empty C-130J, as before: eight seats */
  var c2 = spawn("airlift_n", BASE.x, BASE.y); parkOn(c2, BASE);
  var spot2 = openGround(5, 2, BASE.tx + 1, BASE.ty + 7, 3), nine = [];
  for (i = 0; i < 9; i++) nine.push(spawn("rifle_n", (spot2.x + (i % 5) + 0.5) * TT, (spot2.y + ((i / 5) | 0) + 0.5) * TT));
  sel(nine); rclickUnit(c2);
  ticks(30, function () { return nine.every(function (s) { return s.carried || s.order.type === "idle"; }); });
  chk("an empty C-130J takes eight riflemen and not a ninth, as it always did",
      c2.cargo.length === 8 && nine.filter(function (s) { return s.carried; }).length === 8,
      "cargo " + c2.cargo.length + " " + panel().match(/CARGO <i>[^<]*/));
  sel([c2]); UI.frame && UI.frame(0);
  chk("its panel: CARGO 8/8 · 20 OF 20 T", panel().indexOf("8/8 · 20 OF 20 T") >= 0, (panel().match(/CARGO <i>[^<]*/) || ["none"])[0]);
  c2.cargo.forEach(function (c) { c.carried = false; gone(c); }); c2.cargo.length = 0; nine.forEach(gone); gone(c2);
}

function secPack() {
  log("\n[3b] a launcher set up where it stands packs up before it boards");
  var c = spawn("airlift_n", BASE.x, BASE.y); parkOn(c, BASE);
  var spot = openGround(1, 1, BASE.tx - 2, BASE.ty + 6, 3);
  var hm = spawn("tel_n", (spot.x + 0.5) * TT, (spot.y + 0.5) * TT);
  hm.deployed = true;
  chk("a HIMARS (16 t), set up", !!hm && hm.def.mass === 16 && hm.deployed, hm ? hm.def.full + ", deploySec " + hm.def.deploySec : "none");
  sel([hm]); rclickUnit(c);
  var t0 = Game.time, near = -1;
  var t = ticks(40, function () {
    if (near < 0 && (Math.hypot(hm.x - c.x, hm.y - c.y) < (c.r + hm.r + 10) || hm.besideRamp(c))) near = Game.time;
    return hm.carried;
  });
  var packed = near >= 0 ? Game.time - near : -1;
  chk("it takes its own " + hm.def.deploySec + " s to pack up at the ramp, then boards",
      hm.carried && !hm.deployed && packed >= hm.def.deploySec - 0.1, "boarded " + packed.toFixed(1) + " s after reaching the ramp");
  c.cargo.length = 0; gone(hm); gone(c);
}

function secHelo() {
  log("\n[4] helicopters: a Black Hawk refuses a Humvee, a Chinook takes two and comes for them");
  var g = openGround(8, 8, BASE.tx + 14, BASE.ty, 6, 30);
  var cx = (g.x + 4) * TT, cy = (g.y + 4) * TT;
  var bh = spawn("trans_n", cx, cy - 6 * TT); bh.order = { type: "hover" }; bh.parked = false;
  var hv = spawn("recon_n", cx, cy), hv2 = spawn("recon_n", cx + TT, cy), jk = spawn("recon_n", cx - TT, cy);
  var t0 = Game.time;
  sel([hv]); rclickUnit(bh);
  chk("a UH-60M Black Hawk (4.08 t) refuses a Humvee (5 t), with the reason",
      hv.order.type !== "enter" && said(/HUMVEE \(5 T\) — TOO HEAVY FOR THE BLACK HAWK \(4\.1 T\)/, t0), saidText(t0));
  gone(bh);
  var ch = spawn("trans_b", cx + 9 * TT, cy - 9 * TT); ch.order = { type: "hover" }; ch.parked = false;
  chk("a Chinook HC6A (10 t) hovering nine tiles off", ch.def.payload === 10, ch.def.full);
  t0 = Game.time;
  sel([hv, hv2, jk]); rclickUnit(ch);
  chk("three Humvees right-clicked onto it: two are sent and the third is refused - 15 t is not 10",
      hv.order.type === "enter" && hv2.order.type === "enter" && jk.order.type !== "enter" &&
      said(/CHINOOK HC6A HAS 0 T LEFT \u2014 HUMVEE \(5 T\) DOES NOT FIT/, t0), [hv.order.type, hv2.order.type, jk.order.type].join("/") + " " + saidText(t0));
  chk("the Chinook comes to them rather than make them drive under it", ch.order.type === "move" &&
      Math.hypot(ch.order.x - cx, ch.order.y - cy) < 2 * TT, ch.order.type + " " + tiles(ch.order.x || 0) + "," + tiles(ch.order.y || 0));
  var t = ticks(40, function () { return hv.carried && hv2.carried; });
  chk("both board it, sling or ramp", hv.carried && hv2.carried && ch.cargo.length === 2, "after " + t.toFixed(1) + " s");
  /* U: put them down where it is */
  sel([ch]); t0 = Game.time;
  key("u");
  chk("U puts them down beside it, on the ground", !hv.carried && !hv2.carried && ch.cargo.length === 0 &&
      Math.hypot(hv.x - ch.x, hv.y - ch.y) < 3 * TT, "dist " + tiles(Math.hypot(hv.x - ch.x, hv.y - ch.y)) + " " + saidText(t0));
  /* board again, then G.airLand to a point twenty tiles away */
  sel([hv, hv2]); rclickUnit(ch);
  ticks(40, function () { return hv.carried && hv2.carried; });
  var dx = cx + 20 * TT, dy = cy;
  var g2 = openGround(4, 4, dx / TT, dy / TT, 4, 20);
  if (g2) { dx = (g2.x + 2) * TT; dy = (g2.y + 2) * TT; }
  var why = Game.airLand(ch, dx, dy);
  chk("G.airLand(chinook, point 20 tiles off) is given", why === "" && ch.order.type === "airland", why || ch.order.type);
  var down = false, t1 = ticks(40, function () { if (ch.grounded) down = true; return down && !ch.grounded; });
  chk("it flies there, sets down, puts both Humvees off at the point and lifts again",
      down && !hv.carried && !hv2.carried && Math.hypot(hv.x - dx, hv.y - dy) < 3 * TT && ch.order.type === "hover",
      "after " + t1.toFixed(1) + " s, " + tiles(Math.hypot(hv.x - dx, hv.y - dy)) + " tiles from the point, order " + ch.order.type);
  gone(ch); gone(hv); gone(hv2); gone(jk);
}

/* fly one delivery and watch it: returns what happened */
function fly(u, maxT, trace) {
  var r = { phases: [], touch: null, stop: null, off: null, home: false, unloaded: -1, goes: 0, lift: null, strip: null };
  var last = "", t0 = Game.time, nt = 0;
  ticks(maxT, function () {
    var o = u.order;
    var ph = o.type === "airland" ? o.ph : o.type;
    if (ph !== last) {
      r.phases.push(ph + "@" + (Game.time - t0).toFixed(1));
      if (o.type === "airland") r.strip = { ax: o.ax, ay: o.ay, bx: o.bx, by: o.by, ux: o.ux, uy: o.uy, tax: o.tax, tay: o.tay, sx: o.sx, sy: o.sy, n: o.n, len: o.len };
      if (ph === "roll") {
        var lat = -(u.x - o.ax) * o.uy + (u.y - o.ay) * o.ux;
        r.touch = { x: u.x, y: u.y, lat: lat, hdg: Math.abs(U.angDiff(u.ang, Math.atan2(o.uy, o.ux))), t: Game.time - t0 };
      }
      if (ph === "unload") r.stop = { x: u.x, y: u.y, t: Game.time - t0 };
      if (last === "takeoff") r.lift = { x: u.x, y: u.y, t: Game.time - t0 };
      last = ph;
    }
    if (o.type === "airland") r.goes = Math.max(r.goes, o.goes || 0);
    if (trace && Game.time - t0 >= nt) { nt += 1; log("     t=" + (Game.time - t0).toFixed(0) + " " + ph + " at " + tiles(u.x) + "," + tiles(u.y) + " ang " + u.ang.toFixed(2) + " fuel " + u.fuel.toFixed(0)); }
    if (u.dead) return true;
    return u.parked && r.lift;
  });
  r.home = u.parked && !u.dead;
  r.t = Game.time - t0;
  return r;
}

var DELIV = null;
function secDeliver() {
  log("\n[5] a C-130J delivers two Humvees by landing on open ground");
  if (!C130 || C130.cargo.length !== 2) { chk("the C-130J from [1] with two Humvees", false, C130 ? C130.cargo.length : "none"); return; }
  var hv = C130.cargo.slice();
  /* a drop point 34 tiles from the base, on open ground */
  var g = openGround(14, 14, BASE.tx + 34, BASE.ty - 4, 8, 30) || openGround(14, 14, BASE.tx - 34, BASE.ty, 8, 30);
  var px = (g.x + 7) * TT, py = (g.y + 7) * TT;
  clearArea(px, py, 20);
  sel([C130]);
  rclickGround(px, py);
  chk("right-clicking the ground sends the C-130J there", C130.order.type === "move" &&
      Math.hypot(C130.order.x - px, C130.order.y - py) < TT, C130.order.type);
  ticks(2);
  var t0 = Game.time;
  key("u");
  chk("U in the air: it is told to land on open ground near where it was going and unload there",
      C130.order.type === "airland" && Math.hypot(C130.order.x - px, C130.order.y - py) < TT &&
      said(/C-130J SUPER HERCULES LANDING ON OPEN GROUND TO UNLOAD 2 VEHICLES/, t0) && hv.every(function (h) { return h.carried; }),
      C130.order.type + " " + saidText(t0));
  var o = C130.order, B = { x: o.bx, y: o.by };
  /* the order lines: down to the threshold, along the strip, then home */
  var OLF = typeof Render2D !== "undefined" && Render2D.orderLines, segs = [];
  if (OLF) {
    var OL = OLF(Game, [C130], false);
    for (var q = 0; q < OL.n; q++) { var j = q * 7; segs.push({ x1: OL.seg[j + 3], y1: OL.seg[j + 4], a0: OL.seg[j + 2], a1: OL.seg[j + 5], k: OL.kinds[OL.seg[j + 6]] }); }
  }
  chk("its order line, in the unload colour: from the aircraft down to the strip, along it, then home",
      segs.length >= 3 && segs[0].k === "unload" && segs[0].a0 === 1 && segs[0].a1 === 0 &&
      Math.hypot(segs[0].x1 - o.ax, segs[0].y1 - o.ay) < 1 && segs[1].k === "unload" &&
      Math.hypot(segs[1].x1 - o.bx, segs[1].y1 - o.by) < 1 && segs[2].k === "rtb",
      segs.map(function (g) { return g.k + (g.a1 ? "^" : "") + " " + tiles(g.x1) + "," + tiles(g.y1); }).join(" | "));
  chk("the strip it picked: its far end within 2 tiles of the point, 5 tiles long",
      Math.hypot(B.x - px, B.y - py) < 2 * TT && Math.abs(o.len / TT - 4) < 0.5 + 1e-9 || (o.sx && o.sy && Math.abs(o.len / TT - 4.24) < 0.1),
      "end " + tiles(Math.hypot(B.x - px, B.y - py)) + " tiles off, run " + tiles(o.len) + " tiles, n " + o.n);
  var good = Unit.stripTiles(M, o).every(function (k, i) { return true; });
  var flat = true, lvl = M.elev[o.tay * M.W + o.tax];
  for (var i = 0; i < o.n; i++) {
    var k = (o.tay + i * o.sy) * M.W + (o.tax + i * o.sx), tn = CFG.TERRAIN[M.terrain[k]].name;
    if (M.elev[k] !== lvl || Game.occ[k] || ["sand", "grass", "dirt", "road"].indexOf(tn) < 0) flat = false;
  }
  chk("every tile of it open, flat and unbuilt", good && flat, "level " + lvl);
  var r = fly(C130, 240, TRACE);
  DELIV = r;
  log("     phases: " + r.phases.join(" "));
  chk("it lands lined up: on the centreline, along the strip", !!r.touch && Math.abs(r.touch.lat) < 0.8 * TT && r.touch.hdg < 0.5,
      r.touch ? "lateral " + tiles(r.touch.lat) + " tiles, heading off by " + r.touch.hdg.toFixed(2) + " rad, at t=" + r.touch.t.toFixed(1) : "never touched down");
  chk("it rolls out and stops at the far end", !!r.stop && Math.hypot(r.stop.x - o.bx, r.stop.y - o.by) < 1 * TT,
      r.stop ? tiles(Math.hypot(r.stop.x - o.bx, r.stop.y - o.by)) + " tiles from the end" : "never stopped");
  chk("both Humvees are put down beside it, on the ground, and none on the strip",
      hv.every(function (h) { return !h.carried && !h.dead && Math.hypot(h.x - o.bx, h.y - o.by) < 4 * TT && !onStrip(h, o); }),
      hv.map(function (h) { return tiles(Math.hypot(h.x - o.bx, h.y - o.by)) + (onStrip(h, o) ? " ON STRIP" : ""); }).join(", "));
  chk("and said so: C-130J SUPER HERCULES DOWN — 2 VEHICLES UNLOADED", said(/C-130J SUPER HERCULES DOWN — 2 VEHICLES UNLOADED/, t0), saidText(t0));
  chk("it takes off again and lands back on its airbase", !!r.lift && r.home && C130.padOn === BASE,
      "lift " + (r.lift ? "t=" + r.lift.t.toFixed(1) : "none") + ", home " + r.home + " in " + r.t.toFixed(0) + " s");
  chk("no go-around was needed", r.goes === 0, r.goes + " go-arounds");
  chk("the Humvees, delivered, take orders on the ground", hv.every(function (h) { return h.order.type === "idle" && h.layer === "ground"; }), "");
}

/* a C-130J sent to land at (px, py) and stepped until it stands on its strip */
function landAt(id, px, py, cargoIds) {
  var c = spawn(id, BASE.x, BASE.y); parkOn(c, BASE);
  (cargoIds || []).forEach(function (vid, i) {
    var v = spawn(vid, BASE.x + (i - 1) * TT, BASE.y + 6 * TT); c.cargo.push(v); v.carried = true;
  });
  var why = Game.airLand(c, px, py);
  return { c: c, why: why };
}
function farPoint(dx, dy, R) {
  var g = openGround(14, 14, BASE.tx + dx, BASE.ty + dy, 8, 30);
  if (!g) return null;
  var p = { x: (g.x + 7) * TT, y: (g.y + 7) * TT };
  clearArea(p.x, p.y, R || 20);
  return p;
}

function secGroundOrder() {
  log("\n[5c] an order given on the ground starts with the take-off run");
  var p = farPoint(30, 14);
  var L = landAt("airlift_n", p.x, p.y, ["recon_n"]), c = L.c;
  ticks(90, function () { return c.order.type === "airland" && c.order.ph === "wait"; });
  chk("down on its strip, waiting", c.grounded && c.order.ph === "wait" && c.targetLayer() === "ground", c.order.type + "/" + c.order.ph);
  var mx = c.x + 30 * TT, my = c.y;
  sel([c]); rclickGround(mx, my);
  ticks(DT * 2);
  chk("right-clicking the ground: it turns and rolls for take-off first, the move behind it",
      c.order.type === "airland" && (c.order.ph === "turn" || c.order.ph === "takeoff") && c.order.then &&
      c.order.then.type === "move" && c.grounded, c.order.type + "/" + c.order.ph + " then " + (c.order.then && c.order.then.type));
  var x0 = c.x, y0 = c.y, t = ticks(20, function () { return !c.grounded; });
  chk("it lifts off at the end of its run and then flies the move",
      t > 1 && c.order.type === "move" && Math.hypot(c.x - x0, c.y - y0) > TT,
      "airborne after " + t.toFixed(1) + " s, " + tiles(Math.hypot(c.x - x0, c.y - y0)) + " tiles from where it stood");
  gone(c);
}

function secPickup() {
  log("\n[5d] an empty C-130J lands on open ground to be loaded, and takes a Humvee there");
  var p = farPoint(-30, 14);
  var c = spawn("airlift_n", BASE.x, BASE.y); parkOn(c, BASE);
  c.parked = false; c.order = { type: "move", x: p.x, y: p.y };
  ticks(1);
  sel([c]); var t0 = Game.time;
  key("u");
  chk("U on an empty C-130J in the air: it lands near where it was going, to load",
      c.order.type === "airland" && c.order.load === 1 && said(/C-130J SUPER HERCULES LANDING ON OPEN GROUND TO LOAD/, t0),
      c.order.type + " " + saidText(t0));
  ticks(90, function () { return c.order.type === "airland" && c.order.ph === "wait"; });
  chk("down on its strip, ramp down", c.grounded && c.loadingNow(), c.order.type + "/" + c.order.ph);
  var o = c.order, sx = o.bx - o.uy * 4 * TT, sy = o.by + o.ux * 4 * TT;
  var hv = spawn("recon_n", sx, sy);
  sel([hv]); rclickUnit(c);
  chk("a Humvee four tiles off is sent aboard", hv.order.type === "enter", hv.order.type + " " + saidText(t0));
  var t = ticks(40, function () { return hv.carried; });
  chk("it boards on the field", hv.carried && c.cargo.indexOf(hv) >= 0, "after " + t.toFixed(1) + " s");
  var r = fly(c, 120, false);
  chk("then it takes off with it and goes home", r.home && c.cargo.length === 1, r.phases.join(" "));
  c.cargo.length = 0; gone(hv); gone(c);
}

function secBlocked() {
  log("\n[5e] a strip with somebody on it by finals: it lands on another");
  var p = farPoint(24, -20);
  var L = landAt("airlift_n", p.x, p.y, ["recon_n"]), c = L.c, o = c.order;
  var first = { tax: o.tax, tay: o.tay, sx: o.sx, sy: o.sy };
  ticks(DT * 3);
  /* a tank parks in the middle of it - one of ours, which nobody but the
     player moves (a commander's, even at peace, is driven off by its brain) */
  var mid = Math.floor(o.n / 2), tk = spawn("mbt_n", (o.tax + mid * o.sx + 0.5) * TT, (o.tay + mid * o.sy + 0.5) * TT);
  if (tk) { tk.order = { type: "idle" }; tk.stance = "hold"; }
  var r = fly(c, 150, false), o2 = r.strip || {};
  var moved = o2.tax !== first.tax || o2.tay !== first.tay || o2.sx !== first.sx || o2.sy !== first.sy;
  chk("it sees the tank on finals, picks another strip near the point, lands there and unloads",
      !!tk && moved && c.cargo.length === 0 && r.home, r.phases.join(" ") + (moved ? " (moved)" : " (same strip)"));
  gone(tk); gone(c);
}

function secBingo() {
  log("\n[5f] short of fuel on the way in: home, refuel, and back to deliver");
  var p = farPoint(-28, -18);
  var L = landAt("airlift_n", p.x, p.y, ["recon_n"]), c = L.c, hv = c.cargo[0];
  ticks(1);
  c.fuel = c.reserveFuel() - 1;
  var r = fly(c, 200, false);
  var j = r.phases.join(" ");
  chk("it turns for home with the Humvee aboard, refuels, flies the delivery again and puts it down",
      /rtb@/.test(j) && /unload@/.test(j) && j.indexOf("rtb@") < j.indexOf("unload@") && !hv.carried && Math.hypot(hv.x - p.x, hv.y - p.y) < 4 * TT,
      j + "; Humvee " + tiles(Math.hypot(hv.x - p.x, hv.y - p.y)) + " tiles from the point");
  gone(hv); gone(c);
}

/* every fixed-wing transport type, from eight headings and three ranges */
function secSweep() {
  log("\n[5b] every fixed-wing airlift type lands on a strip from eight headings");
  var g = openGround(16, 16, M.W / 2, M.H / 2, 20, 40);
  var px = (g.x + 8) * TT, py = (g.y + 8) * TT;
  clearArea(px, py, 24);
  var types = {}, ids = [];
  for (var id in UNITS) { var d = UNITS[id]; if (d.layer === "air" && d.payload && !d.hover && !types[d.full]) { types[d.full] = 1; ids.push(id); } }
  var fails = [], worst = 0, worstId = "", n = 0, goes = 0;
  ids.forEach(function (id) {
    [8, 25].forEach(function (R) {
      for (var h = 0; h < 8; h++) {
        var a = h * Math.PI / 4;
        var u = spawn(id, px + Math.cos(a) * R * TT, py + Math.sin(a) * R * TT);
        u.parked = false; u.ang = a + Math.PI * (h % 3 === 0 ? 0.5 : 1) ; u.order = { type: "hover" }; u.fuel = u.fuelMax;
        u.padOn = BASE;
        var why = Game.airLand(u, px, py);
        var tt = 0, down = false;
        /* the aircraft alone is stepped: the approach depends on nothing else */
        if (!why) for (var k = 0; k < 120 / DT && !down; k++) {
          u.update(DT); tt += DT;
          if (u.order.type === "airland" && u.order.ph === "unload") down = true;
        }
        n++;
        goes += u.order.goes || 0;
        if (!down) fails.push(id + " R" + R + " h" + h + (why ? " " + why : " " + u.order.type + "/" + u.order.ph));
        else if (tt > worst) { worst = tt; worstId = id + " R" + R + " h" + h; }
        gone(u);
      }
    });
  });
  chk("all " + ids.length + " types land from 8 headings at 8 and 25 tiles (" + n + " approaches)", !fails.length,
      fails.slice(0, 6).join("; ") + (fails.length ? " (" + fails.length + " failed)" : "worst " + worst.toFixed(1) + " s (" + worstId + "), " + goes + " go-arounds"));
}

function secNoStrip() {
  log("\n[6] no strip near the point: refused, with the reason");
  var c = spawn("airlift_n", BASE.x, BASE.y); parkOn(c, BASE);
  var spot = openGround(1, 1, BASE.tx + 1, BASE.ty + 6, 3);
  var h = spawn("recon_n", (spot.x + 0.5) * TT, (spot.y + 0.5) * TT);
  c.cargo.push(h); h.carried = true;
  /* a wood thirty tiles across around a point: nothing to land on within the twelve searched */
  var g = openGround(2, 2, BASE.tx + 40, BASE.ty + 20, 20, 60);
  var cx = g.x, cy = g.y, saved = [];
  for (var y = cy - 16; y <= cy + 16; y++) for (var x = cx - 16; x <= cx + 16; x++) {
    if (x < 0 || y < 0 || x >= M.W || y >= M.H) continue;
    var k = y * M.W + x; saved.push([k, M.terrain[k]]); M.terrain[k] = T.TREE;
  }
  c.parked = false; c.order = { type: "move", x: cx * TT, y: cy * TT };
  ticks(1);
  sel([c]); var t0 = Game.time;
  key("u");
  chk("U over the wood: refused, and told why", c.order.type === "move" && h.carried &&
      said(/NO STRIP NEAR THERE FOR THE C-130J SUPER HERCULES — IT NEEDS 5 TILES OF FLAT, CLEAR OPEN GROUND/, t0),
      c.order.type + " / " + saidText(t0));
  chk("and G.airLand says the same to the AI", /^NO STRIP NEAR THERE/.test(Game.airLand(c, cx * TT, cy * TT)), "");
  saved.forEach(function (s) { M.terrain[s[0]] = s[1]; });
  chk("with the wood gone, the same point has a strip", !!Game.findStrip(c, cx * TT, cy * TT), "");
  c.cargo.length = 0; gone(h); gone(c);
}

function secShotDown() {
  log("\n[7] shot down with a Humvee aboard: the Humvee dies with it");
  var c = spawn("airlift_n", BASE.x + 10 * TT, BASE.y); c.parked = false; c.order = { type: "hover" };
  var h = spawn("recon_n", BASE.x, BASE.y + 6 * TT);
  c.cargo.push(h); h.carried = true;
  Combat.applyDamage(Game, c, c.hp + 1, { warhead: "flak", dmg: c.hp + 1 }, null);
  ticks(0.2);
  chk("the C-130J is down", c.dead, "hp " + c.hp);
  chk("and the Humvee in its hold with it", h.dead, "dead " + h.dead + " carried " + h.carried);
}

function secPlanes() {
  log("\n[8] the An-2, the Po-2, the Il-76TD and the C-46 fly as aeroplanes");
  ["trans_k", "kpa_e50_transport", "kpa_e90_transport", "roc_e50_transport"].forEach(function (id) {
    var u = spawn(id, BASE.x + 20 * TT, BASE.y + 10 * TT);
    u.parked = false; u.padOn = BASE; u.fuel = u.fuelMax;
    u.order = { type: "move", x: BASE.x + 20 * TT, y: BASE.y + 10 * TT };  // already there: it must keep flying
    var x0 = u.x, y0 = u.y, f0 = u.fuel, path = 0, px = u.x, py = u.y, stopped = 0;
    ticks(6, function () { var s = Math.hypot(u.x - px, u.y - py); path += s; if (s < 1e-6) stopped++; px = u.x; py = u.y; return false; });
    var sp = path / 6 / TT;
    chk(UNITS[id].full + ": keeps flying at its speed over a point it has reached, and burns fuel",
        !u.def.hover && stopped === 0 && Math.abs(sp - u.def.speed) < 0.2 && u.fuel < f0,
        "path " + sp.toFixed(2) + " tiles/s against speed " + u.def.speed + ", fuel " + f0.toFixed(0) + " -> " + u.fuel.toFixed(1) + ", order " + u.order.type);
    u.order = { type: "rtb" };
    var t = ticks(90, function () { return u.parked; });
    chk("  and lands back on its airbase", u.parked && u.padOn === BASE, "after " + t.toFixed(1) + " s");
    gone(u);
  });
}

function secInfantry() {
  log("\n[9] infantry-only loads, exactly as before");
  var bad = [];
  for (var id in UNITS) {
    var d = UNITS[id];
    if (!(d.layer === "air" && d.payload && d.cargo)) continue;
    var u = spawn(id, BASE.x, BASE.y); parkOn(u, BASE);
    var r = spawn("rifle_n", BASE.x, BASE.y + 3 * TT), n = 0;
    while (n < 40 && u.canAirlift(r)) { u.cargo.push(r); n++; }
    u.cargo.length = 0;
    if (n !== d.cargo) bad.push(id + " " + n + "/" + d.cargo);
    gone(r); gone(u);
  }
  chk("every airlifter takes exactly its seats in riflemen by weight", !bad.length, bad.slice(0, 6).join(", ") || "all");
  /* a squad boards a C-130 in flight, as infantry always could */
  var c = spawn("airlift_n", BASE.x + 12 * TT, BASE.y); c.parked = false; c.order = { type: "hover" };
  var sq = spawn("rifle_n", BASE.x + 12 * TT, BASE.y + 2 * TT);
  sq.order = { type: "enter", target: c };
  ticks(30, function () { return sq.carried; });
  chk("a squad still boards a C-130J in flight by catching it up", sq.carried, sq.order.type);
  /* U puts them out in the air - no landing */
  sel([c]); var t0 = Game.time;
  key("u");
  chk("U puts infantry out of a C-130J in the air at once, without landing it",
      !sq.carried && c.order.type !== "airland" && said(/1 UNIT DISEMBARKED/, t0), c.order.type + " " + saidText(t0));
  gone(sq); gone(c);
  /* a vehicle cannot board an aeroplane in flight */
  var c2 = spawn("airlift_n", BASE.x + 12 * TT, BASE.y); c2.parked = false; c2.order = { type: "hover" };
  var hv = spawn("recon_n", BASE.x + 12 * TT, BASE.y + 2 * TT);
  sel([hv]); t0 = Game.time; rclickUnit(c2);
  chk("a Humvee is refused by a C-130J in the air: vehicles load on the ground",
      hv.order.type !== "enter" && said(/C-130J SUPER HERCULES IS IN THE AIR — VEHICLES LOAD ON THE GROUND/, t0), saidText(t0));
  gone(hv); gone(c2);
  /* an APC still counts seats */
  var apc = spawn("ifv_n", BASE.x, BASE.y + 8 * TT), squads = [];
  for (var i = 0; i < (apc.def.cargo || 0) + 1; i++) squads.push(spawn("rifle_n", apc.x + (i % 3) * TT, apc.y + 2 * TT));
  squads.forEach(function (s) { s.order = { type: "enter", target: apc }; });
  ticks(20);
  chk("a Bradley still takes " + apc.def.cargo + " squads by the seat", apc.cargo.length === apc.def.cargo, apc.cargo.length + "");
  apc.cargo.forEach(function (s) { s.carried = false; }); apc.cargo.length = 0; squads.forEach(gone); gone(apc);
}

function secCard() {
  log("\n[10] the build card");
  function cards() { var box = document.getElementById("cards"), out = [], i;
    for (i = 0; box && i < box.children.length; i++) if (box.children[i] && box.children[i].dataset) out.push(box.children[i]);
    return out; }
  function tabNow() { var c = cards()[0], kd = c && c.dataset.kind; return (kd === "upgrade" || kd === "era") ? "building" : (kd || ""); }
  sel([]); UI.refreshCards && UI.refreshCards();
  for (var i = 0; i < 7 && tabNow() !== "aircraft"; i++) key("Tab");
  var card = null;
  cards().forEach(function (c) { if (c.dataset.id === "airlift_n") card = c; });
  if (!card) { chk("the C-130J card on the AIR tab", false, "tab " + tabNow() + ", faction " + P.faction); return; }
  card.dispatchEvent({ type: "mouseenter" });
  var th = (document.getElementById("tooltip") || {}).innerHTML || "";
  chk("its card says CARRIES 8 · LIFTS 20 T · LANDS IN 5 TILES", th.indexOf("CARRIES 8 · LIFTS 20 T · LANDS IN 5 TILES") >= 0,
      (th.match(/CARRIES[^<]*/) || ["none"])[0]);
  card.dispatchEvent({ type: "mouseleave" });
}

function secSave() {
  log("\n[11] a save mid-delivery loads into the same delivery (last: the load rebuilds the match)");
  /* one C-130J on its approach with two Humvees, one standing on its strip with a rifle squad still aboard */
  var a = spawn("airlift_n", BASE.x, BASE.y); parkOn(a, BASE);
  var b = spawn("airlift_n", BASE.x, BASE.y); parkOn(b, BASE);
  var spot = openGround(3, 1, BASE.tx + 1, BASE.ty + 6, 3);
  var h1 = spawn("recon_n", (spot.x + 0.5) * TT, (spot.y + 0.5) * TT), h2 = spawn("recon_n", (spot.x + 1.5) * TT, (spot.y + 0.5) * TT);
  var r1 = spawn("rifle_n", (spot.x + 2.5) * TT, (spot.y + 0.5) * TT);
  a.cargo.push(h1, h2); h1.carried = h2.carried = true;
  b.cargo.push(r1); r1.carried = true;
  var g = openGround(14, 14, BASE.tx + 30, BASE.ty + 12, 8, 30);
  var px = (g.x + 7) * TT, py = (g.y + 7) * TT;
  clearArea(px, py, 22);
  var g2 = openGround(14, 14, BASE.tx - 30, BASE.ty + 12, 8, 30) || openGround(14, 14, BASE.tx + 30, BASE.ty - 20, 8, 30);
  var qx = (g2.x + 7) * TT, qy = (g2.y + 7) * TT;
  clearArea(qx, qy, 22);
  Game.airLand(b, qx, qy);
  b.order.load = 1;               // it waits on the strip twenty seconds, landed "to load"
  /* b down on its strip and its squad off; then a sent, and still on the way in */
  ticks(120, function () { return b.order.type === "airland" && b.order.ph === "wait"; });
  Game.airLand(a, px, py);
  ticks(3);
  var aph = a.order.ph, bph = b.order.ph;
  chk("the moment of the save: one on its approach with two Humvees aboard, one standing on its strip",
      a.order.type === "airland" && /^d|final/.test(aph) && a.cargo.length === 2 && b.grounded && bph === "wait",
      "a " + a.order.type + "/" + aph + " cargo " + a.cargo.length + ", b " + b.order.type + "/" + bph + " grounded " + b.grounded);
  /* put the squad back aboard b, so the load has to carry a hold on the ground too */
  if (!r1.carried) { b.cargo.push(r1); r1.carried = true; }
  b.order.load = 0;               // from here it waits only its two seconds: it leaves soon after the load
  var snapA = { x: a.x, y: a.y, ph: aph, bx: a.order.bx, by: a.order.by }, snapB = { x: b.x, y: b.y, bx: b.order.bx };
  var ia = Game.entities.indexOf(a), ib = Game.entities.indexOf(b);
  var r = SaveGame.save(Game, "ironfront.airlift");
  chk("the save is written", r.ok, r.error || r.bytes + " bytes");
  var ld = SaveGame.load("ironfront.airlift");
  chk("and loads", ld.ok, ld.error || "");
  if (!ld.ok) return;
  P = Game.human; M = Game.map;
  Game.players.forEach(function (p) { if (p !== Game.human && p.isAI) AI.setPeace(p, true); });
  Game.checkVictory = function () {};
  var A = null, B2 = null;
  Game.entities.forEach(function (e) {
    if (e.kind !== "unit" || e.def.id !== "airlift_n" || e.owner !== P) return;
    if (Math.hypot(e.x - snapA.x, e.y - snapA.y) < 2) A = e;
    if (Math.hypot(e.x - snapB.x, e.y - snapB.y) < 2) B2 = e;
  });
  chk("both transports are back", !!A && !!B2, "");
  if (!A || !B2) return;
  chk("the one on its approach: same phase, same strip, two Humvees aboard and carried",
      A.order.type === "airland" && A.order.ph === snapA.ph && A.order.bx === snapA.bx && A.cargo.length === 2 &&
      A.cargo.every(function (c) { return c.carried && c.def.id === "recon_n"; }),
      A.order.type + "/" + A.order.ph + " cargo " + A.cargo.length);
  chk("the one on its strip: still on the ground, waiting, its squad aboard",
      B2.grounded && B2.order.type === "airland" && B2.order.ph === "wait" && B2.cargo.length === 1 && B2.cargo[0].carried &&
      B2.targetLayer() === "ground", B2.order.type + "/" + B2.order.ph + " grounded " + B2.grounded + " cargo " + B2.cargo.length);
  var bph = [];
  var tb = ticks(60, function () { var k = B2.order.type + "/" + (B2.order.ph || ""); if (bph[bph.length - 1] !== k) bph.push(k); return !B2.grounded; });
  chk("the one on the strip turns, takes off down it with what is aboard, and goes home",
      tb > 2 && B2.order.type === "rtb" && B2.cargo.length === 1 && bph.join(" ").indexOf("airland/takeoff") >= 0,
      "after " + tb.toFixed(1) + " s: " + bph.join(" "));
  var hv = A.cargo.slice(), out = fly(A, 200, false);
  chk("the approach carries on: it lands, puts both Humvees down near the point and comes home",
      hv.every(function (h) { return !h.carried && !h.dead && Math.hypot(h.x - snapA.bx, h.y - snapA.by) < 4 * TT; }) && out.home,
      out.phases.join(" ") + " home " + out.home);
}
