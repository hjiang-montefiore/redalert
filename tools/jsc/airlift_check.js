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
        "2 VEH + 0 INF · 11 OF 20 T · 9.8 OF 16.8 M";
     2. an Abrams is refused by the C-130J, with the reason, and boards a
        C-17; a C-17 will not take a second Abrams;
     3. the accounting with infantry and vehicles together: two Humvees and
        three riflemen fill a C-130J's 20 t and its floor, the fourth
        rifleman and a third Humvee do not get on, and the Humvee is told
        why; eight riflemen alone fill its eight seats as before;
     4. a Black Hawk refuses a Humvee; a Chinook takes one on its hook -
        one at a time (stage 1b), and an M1151 is too wide for its cabin -
        coming to it to do it; U puts it down; a helicopter sent to a point
        with G.airLand sets it down there;
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
        both finish it; a landing craft saved on its run to a beach with
        troops aboard still puts them ashore (last: the load rebuilds the
        match).
   Stage 1b, HOLD SPACE (owner: "add a REAL HOLD-SPACE limit"): every
   aeroplane's published cargo floor and every vehicle's own length and width
   have to fit as well as the weight (entities.js HOLD SPACE):
     0. the floors, the vehicle sizes and where each came from, the range
        corrections of the An-2s, the Po-2 and the Il-76TD;
    12. the matrix: a C-130J-30 three Humvees then the floor says no, a
        C-130H two, a C-17 ten (two lanes of five) or one Abrams and nothing
        else heavy, an A400M three, an Il-76TD three BMD-2s and four Humvees
        (its floor both times); too wide, too long; a Black Hawk one
        vehicle on the hook, a Chinook one on the hook and more inside;
        the panel and the card say so;
    13. the stage-1 reviewer's cases: a diagonal strip down a one-tile lane
        in a wood is refused; a helicopter sent to set down on water is
        never "on the ground" there; U on an aeroplane standing on its strip
        puts nobody on the strip;
    14. fuel: a strip beyond a full tank's reach is refused with the reason;
        short of fuel now, it goes home first and then delivers; a transport
        down on its strip without the fuel to get home stays down, says so,
        does not take off to crash, and goes once it can; nor with no
        airbase left, nor on a tanker beside the strip (the review);
    15. fog: the strip finder steps round an enemy its side can see, and not
        round one hidden in the fog.
   The Air Force's jet transports (owner: "i didn't see good us
   transportation airplane"; eras.js, role "stratlift"):
    16. each row only in its periods and only for NATO; the Hercules rows,
        unitFor("airlift") and the AIR tab's C-130 card unchanged, the jets
        beside it; their cards; the period's MBT and the published loads by
        the weight and floor rules - one Abrams in a C-17A, two tanks in a
        C-5 where the figures allow it (the M60A1, the M1A1, the M1A2 SEP in
        a C-5M) and one where they do not (the M1A2 in a C-5B, the SEP v3 in
        a C-5M), five Bradleys in a C-5B, two Bradleys or three Strykers in a
        C-17A; the C-141s refuse every tank and a Bradley; the C-17A lands on
        open ground in 11 tiles and the C-5 in 15 (the review: 4,900 ft at
        maximum load, "paved or earth surfaces", en.wikipedia), the C-141 is
        refused it (G.airLand, U - loaded or empty, the toast saying which)
        and unloads standing on an airbase. A C-141B in flight with a load
        and a C-5M on the ramp go through the save (11).
   TOUCHDOWN (owner: "Hold the aircraft on the ground until the drawn model
   has actually landed before troops get out, so they don't drop from
   13 m"; entities.js TOUCHDOWN = CFG.AIR_ALT / CFG.AIR_SINK):
    17. an MV-22B and a UH-60M set down with a rifle squad: the squad is put
        down TOUCHDOWN seconds after the helicopter is on the ground and
        not before, it is still on the ground then and two seconds more,
        and the delivery takes the touchdown longer and no more; a C-130J
        with a Humvee drives it off no sooner than TOUCHDOWN after its
        wheels touched and no later than that or the end of the roll-out,
        a C-17A's long roll-out covers it with nothing to wait; and what
        goes out of the door in flight still goes at once - a squad out of
        a hovering helicopter and out of a C-130J. A helicopter saved half
        way down with its squad aboard goes through the save (11) and
        waits out only the rest of it. The drawing itself:
        tools/jsc/touchdown3d_check.js. */
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
  var sections = [secData, secBoard, secHeavy, secMixed, secHold, secPack, secHelo, secDeliver, secSweep, secGroundOrder,
                  secPickup, secBlocked, secBingo, secNoStrip, secShotDown, secPlanes, secInfantry, secCard,
                  secReview, secFuel, secFog, secJets, secTouch];
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
      if (!d.hover && !(d.strip >= 3) && !d.runway) noStrip.push(id);
    }
    if (d.cat === "vehicle" && d.layer === "ground") { nVeh++; if (!(d.mass > 0)) noMass.push(id); }
  }
  chk("every transport and airlift row has its payload in tonnes", !noPay.length, noPay.join(", ") || "all");
  chk("every fixed-wing one has a strip length of 3 tiles or more, or lands only on an airbase (runway)", !noStrip.length, noStrip.join(", ") || "all");
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

  /* ---- stage 1b: HOLD SPACE ---- */
  var holdWant = { airlift_n: [16.76, 3.02], nato_e80_airlift: [12.19, 3.02], nato_e50_airlift: [12.19, 3.02],
                   gbr_e60_airlift: [12.19, 3.02], gbr_e80_airlift: [16.76, 3.02], gbr_e00_airlift: [26.82, 5.49],
                   airlift_g: [17.71, 4], deu_e60_airlift: [13.5, 3.15], gbr_e50_airlift: [12.2, 2.59],
                   trans_k: [4.1, 1.6], kpa_e90_transport: [20, 3.46] };
  var offH = Object.keys(holdWant).filter(function (id) {
    var h = UNITS[id].hold; return !h || Math.abs(h[0] - holdWant[id][0]) > 0.006 || Math.abs(h[1] - holdWant[id][1]) > 0.006; });
  chk("the floors: C-130J-30 16.76 x 3.02 m, the short Hercules 12.19, C-17 26.82 x 5.49, A400M 17.71 x 4.00, " +
      "C-160 13.5 x 3.15, Beverley 12.2 x 2.59, An-2 4.1 x 1.6, Il-76TD 20 x 3.46", !offH.length,
      offH.map(function (id) { return id + " " + JSON.stringify(UNITS[id].hold); }).join(", "));
  var noHold = [], cab = [];
  for (var id2 in UNITS) {
    var d2 = UNITS[id2];
    if (d2.layer === "air" && d2.payload && !d2.hover && !d2.hold) noHold.push(id2);
    if (d2.cabin) cab.push(id2);
  }
  chk("the aeroplanes with no published floor are exactly the Noratlas, the C-46 and the Po-2: weight alone",
      noHold.sort().join(",") === "deu_e50_airlift,fra_e50_airlift,kpa_e50_transport,roc_e50_transport", noHold.join(", "));
  chk("the Chinooks, and only they, take vehicles inside a cabin as well as on the hook",
      cab.sort().join(",") === "gbr_e00_transport,gbr_e80_transport,gbr_e90_transport,trans_b", cab.join(", "));
  var src = {}, nosize = [];
  for (var id3 in UNITS) {
    var d3 = UNITS[id3];
    if (d3.cat !== "vehicle" || d3.layer !== "ground") continue;
    var sz = Unit.vehSize(d3);
    src[sz.src] = (src[sz.src] || 0) + 1;
    if (!(sz.L > 0 && sz.W > 0)) nosize.push(id3);
  }
  log("     vehicle sizes by source: " + JSON.stringify(src) +
      "  (armour = its own armour_specs.js row; spec = another row of the same vehicle or chassis; hero = a published figure in js/hero/; pub = fetched; class = CLASS DEFAULT)");
  chk("every ground vehicle has a length and a width, most of them from their own model spec",
      !nosize.length && (src.armour || 0) > 340, nosize.join(", ") || JSON.stringify(src));
  var mis = ["spaag_n", "atgmv_r", "nato_e50_recon", "nato_e60_ifv", "nato_e80_spaag"].filter(function (id) {
    return Unit.vehSize(UNITS[id]).src === "armour"; });
  chk("the five spec rows that draw another vehicle are not taken for its size", !mis.length, mis.join(", "));
  var hz = Unit.vehSize(UNITS.recon_n), az = Unit.vehSize(UNITS.mbt_n);
  chk("a Humvee (M1151) is 4.9 x 2.3 m, the AM General figure; an Abrams 7.9 x 3.7, its hull",
      hz.L === 4.9 && hz.W === 2.3 && az.L === 7.9 && az.W === 3.7, hz.L + " x " + hz.W + " " + hz.src + ", " + az.L + " x " + az.W + " " + az.src);
  var rw = { trans_k: 16, kpa_e60_transport: 16, kpa_e80_transport: 16, kpa_e00_transport: 16, kpa_e50_transport: 12,
             kpa_e90_transport: 67, roc_e50_transport: 31, airlift_n: 62 };
  var offR = Object.keys(rw).filter(function (id) { return UNITS[id].radius !== rw[id]; });
  chk("radius on the C-130J's scale (62 for 3,334 km): An-2 16 (845 km), Po-2 12 (630 km), Il-76TD 67 (3,600 km); the C-46 left at 31",
      !offR.length, offR.map(function (id) { return id + " " + UNITS[id].radius; }).join(", "));
}

/* a C-130J on the ramp, two Humvees beside the airbase */
var C130 = null;
function secBoard() {
  log("\n[1] a Humvee boards a C-130J on its ramp, and a second one does too");
  C130 = spawn("airlift_n", BASE.x, BASE.y); parkOn(C130, BASE);
  var spot = openGround(2, 1, BASE.tx + 1, BASE.ty + 6, 3);
  var h1 = spawn("recon_n", (spot.x + 0.5) * TT, (spot.y + 0.5) * TT), h2 = spawn("recon_n", (spot.x + 1.5) * TT, (spot.y + 0.5) * TT);
  /* masses are the published figures since the vehicle audit of 2026-10-21
     (_keep/vehicle_audit_20261021.txt): an M1151 5.5 t (it was 5), an M1A2
     SEP v3 66.8 t (62), a HIMARS 16.25 t (16), a BMD-2 8.2 t (18) */
  chk("two Humvees (5.5 t) by the airbase", !!h1 && !!h2 && h1.def.mass === 5.5, h1 ? h1.def.full : "none");
  sel([h1, h2]);
  rclickUnit(C130);
  chk("right-clicking the parked C-130J sends both to it", h1.order.type === "enter" && h1.order.target === C130 &&
      h2.order.type === "enter" && h2.order.target === C130, h1.order.type + "/" + h2.order.type);
  var t = ticks(40, function () { return h1.carried && h2.carried; });
  chk("both drive to the ramp and board", h1.carried && h2.carried && C130.cargo.length === 2,
      "after " + t.toFixed(1) + " s, cargo " + C130.cargo.length);
  sel([C130]); UI.frame && UI.frame(0);
  var pn = panel();
  chk("the panel says what is aboard by weight and floor: CARGO 2 VEH + 0 INF · 11 OF 20 T · 9.8 OF 16.8 M",
      pn.indexOf("2 VEH + 0 INF · 11 OF 20 T · 9.8 OF 16.8 M") >= 0, (pn.match(/CARGO <i>[^<]*/) || ["none"])[0]);
  var L = C130.cargoLoad();
  chk("cargoLoad: 2 vehicles, 11 t of 19.96", L.veh === 2 && L.inf === 0 && Math.abs(L.t - 11) < 1e-9 && L.cap === 19.96,
      JSON.stringify(L));
}

function secHeavy() {
  log("\n[2] an Abrams: refused by the C-130J, carried by a C-17");
  var spot = openGround(1, 1, BASE.tx - 3, BASE.ty + 6, 3);
  var ab = spawn("mbt_n", (spot.x + 0.5) * TT, (spot.y + 0.5) * TT);
  chk("an M1A2 SEP v3 Abrams (66.8 t)", !!ab && ab.def.mass === 66.8, ab ? ab.def.full : "none");
  var t0 = Game.time;
  sel([ab]); rclickUnit(C130);
  chk("right-clicked onto the C-130J it is refused, and told why",
      ab.order.type !== "enter" && said(/M1A2 ABRAMS \(66\.8 T\) — TOO HEAVY FOR THE C-130J SUPER HERCULES \(20 T\)/, t0),
      ab.order.type + " / " + saidText(t0));
  chk("the refusal is the API's too: C130.canAirlift(abrams) is false", !C130.canAirlift(ab), C130.airliftRefusal(ab));
  /* the C-17 on the same ramp */
  var c17 = spawn("gbr_e00_airlift", BASE.x, BASE.y); parkOn(c17, BASE);
  chk("a C-17A Globemaster III (77.52 t) on the ramp", c17.def.payload === 77.52 && c17.parked, c17.def.full);
  var ab2 = spawn("mbt_n", ab.x + TT, ab.y);
  sel([ab, ab2]); t0 = Game.time; rclickUnit(c17);
  chk("two Abrams right-clicked onto it: the first is sent, the second is refused - 133.6 t is not 77.5",
      ab.order.type === "enter" && ab2.order.type !== "enter" && said(/C-17 GLOBEMASTER III HAS 10\.7 T LEFT \u2014 M1A2 ABRAMS \(66\.8 T\) DOES NOT FIT/, t0),
      ab.order.type + "/" + ab2.order.type + " " + saidText(t0));
  ticks(40, function () { return ab.carried; });
  chk("the Abrams boards the C-17", ab.carried && c17.cargo.indexOf(ab) >= 0, "cargo " + c17.cargo.length);
  /* tidy up: the C-17 and its Abrams leave the scene */
  gone(ab); gone(ab2); c17.cargo.length = 0; gone(c17);
}

function secMixed() {
  log("\n[3] seats and tonnes together, and infantry alone as before");
  /* C130 holds two Humvees (11 t); a seat is 19.96 / 8 = 2.495 t */
  var spot = openGround(4, 2, BASE.tx + 1, BASE.ty + 6, 3);
  var sq = [];
  for (var i = 0; i < 4; i++) sq.push(spawn("rifle_n", (spot.x + i + 0.5) * TT, (spot.y + 0.5) * TT));
  var h3 = spawn("recon_n", (spot.x + 0.5) * TT, (spot.y + 1.5) * TT);
  chk("four rifle squads and a third Humvee by the airbase", sq.every(function (s) { return !!s; }) && !!h3,
      sq.map(function (s) { return s && s.def.id; }).join(","));
  sel(sq); rclickUnit(C130);
  ticks(30, function () { return sq.every(function (s) { return s.carried || s.order.type === "idle"; }); });
  var aboard = sq.filter(function (s) { return s.carried; }).length;
  chk("three squads board on top of two Humvees and the fourth does not: 11 + 3 x 2.495 = 18.5 t, a fourth would be 20.98; " +
      "9.8 + 3 x 2.095 = 16.1 m of floor, a fourth 18.2",
      aboard === 3 && C130.cargo.length === 5, aboard + " aboard, cargo " + C130.cargo.length);
  var L = C130.cargoLoad();
  chk("the accounting: 2 vehicles, 3 infantry, 18.49 t", L.veh === 2 && L.inf === 3 && Math.abs(L.t - 18.485) < 1e-6, JSON.stringify(L));
  var t0 = Game.time;
  sel([h3]); rclickUnit(C130);
  chk("the third Humvee is refused, and told why: the floor (9.8 m of Humvees and 3 x 2.1 m of seats) is the first to say no",
      h3.order.type !== "enter" &&
      said(/C-130J SUPER HERCULES — NO FLOOR SPACE LEFT FOR A HUMVEE \(4\.9 M\)/, t0), saidText(t0));
  sel([C130]); UI.frame && UI.frame(0);
  chk("the panel: CARGO 2 VEH + 3 INF · 18.5 OF 20 T", panel().indexOf("2 VEH + 3 INF · 18.5 OF 20 T") >= 0,
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
  chk("a HIMARS (16.25 t), set up", !!hm && hm.def.mass === 16.25 && hm.deployed, hm ? hm.def.full + ", deploySec " + hm.def.deploySec : "none");
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
  log("\n[4] helicopters: a Black Hawk refuses a Humvee, a Chinook takes one on its hook and comes for it");
  var g = openGround(8, 8, BASE.tx + 14, BASE.ty, 6, 30);
  var cx = (g.x + 4) * TT, cy = (g.y + 4) * TT;
  var bh = spawn("trans_n", cx, cy - 6 * TT); bh.order = { type: "hover" }; bh.parked = false;
  var hv = spawn("recon_n", cx, cy), hv2 = spawn("recon_n", cx + TT, cy), jk = spawn("recon_n", cx - TT, cy);
  var t0 = Game.time;
  sel([hv]); rclickUnit(bh);
  chk("a UH-60M Black Hawk (4.08 t) refuses a Humvee (5.5 t), with the reason",
      hv.order.type !== "enter" && said(/HUMVEE \(5\.5 T\) — TOO HEAVY FOR THE BLACK HAWK \(4\.1 T\)/, t0), saidText(t0));
  gone(bh);
  var ch = spawn("trans_b", cx + 9 * TT, cy - 9 * TT); ch.order = { type: "hover" }; ch.parked = false;
  chk("a Chinook HC6A (10 t, a 9.3 x 2.29 m cabin) hovering nine tiles off", ch.def.payload === 10 && ch.def.cabin, ch.def.full);
  t0 = Game.time;
  sel([hv, hv2, jk]); rclickUnit(ch);
  chk("three Humvees right-clicked onto it: one is sent, for the hook; the next is too wide for its cabin and the hook is taken - told so",
      hv.order.type === "enter" && hv2.order.type !== "enter" && jk.order.type !== "enter" &&
      said(/CHINOOK HC6A HAS A VEHICLE ON THE HOOK ALREADY \u2014 A HUMVEE \(2\.30 M WIDE\) DOES NOT GO IN ITS CABIN \(2\.29 M\)/, t0),
      [hv.order.type, hv2.order.type, jk.order.type].join("/") + " " + saidText(t0));
  chk("the Chinook comes to it rather than make it drive under it", ch.order.type === "move" &&
      Math.hypot(ch.order.x - cx, ch.order.y - cy) < 2 * TT, ch.order.type + " " + tiles(ch.order.x || 0) + "," + tiles(ch.order.y || 0));
  var t = ticks(40, function () { return hv.carried; });
  chk("it boards, on the hook", hv.carried && ch.cargo.length === 1 && ch.cargoLoad().hook === 1, "after " + t.toFixed(1) + " s");
  sel([ch]); UI.frame && UI.frame(0);
  chk("the panel: CARGO 1 VEH + 0 INF · 5.5 OF 10 T · 0.0 OF 9.3 M · 1 ON THE HOOK",
      panel().indexOf("1 VEH + 0 INF · 5.5 OF 10 T · 0.0 OF 9.3 M · 1 ON THE HOOK") >= 0, (panel().match(/CARGO <i>[^<]*/) || ["none"])[0]);
  /* U: put it down where it is */
  t0 = Game.time;
  key("u");
  chk("U puts it down beside it, on the ground", !hv.carried && ch.cargo.length === 0 &&
      Math.hypot(hv.x - ch.x, hv.y - ch.y) < 3 * TT, "dist " + tiles(Math.hypot(hv.x - ch.x, hv.y - ch.y)) + " " + saidText(t0));
  /* board again, then G.airLand to a point twenty tiles away */
  sel([hv]); rclickUnit(ch);
  ticks(40, function () { return hv.carried; });
  var dx = cx + 20 * TT, dy = cy;
  var g2 = openGround(4, 4, dx / TT, dy / TT, 4, 20);
  if (g2) { dx = (g2.x + 2) * TT; dy = (g2.y + 2) * TT; }
  var why = Game.airLand(ch, dx, dy);
  chk("G.airLand(chinook, point 20 tiles off) is given", why === "" && ch.order.type === "airland", why || ch.order.type);
  var down = false, t1 = ticks(40, function () { if (ch.grounded) down = true; return down && !ch.grounded; });
  chk("it flies there, sets down, puts the Humvee off at the point and lifts again",
      down && !hv.carried && Math.hypot(hv.x - dx, hv.y - dy) < 3 * TT && ch.order.type === "hover",
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
  for (var id in UNITS) { var d = UNITS[id]; if (d.layer === "air" && d.payload && !d.hover && !d.runway && !types[d.full]) { types[d.full] = 1; ids.push(id); } }
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
    while (n < 80 && u.canAirlift(r)) { u.cargo.push(r); n++; }      // 80: past the C-5's 51 seats
    u.cargo.length = 0;
    if (n !== d.cargo) bad.push(id + " " + n + "/" + d.cargo);
    gone(r); gone(u);
  }
  chk("every airlifter takes exactly its seats in riflemen by weight", !bad.length, bad.slice(0, 6).join(", ") || "all");
  /* a squad boards a C-130 in flight, as infantry always could */
  /* the squad starts under it: a fixed-wing "hover" is an orbit about three
     tiles across, and a squad two tiles off chases it round for as long as
     the geometry of the moment decides (stage 1b measured 30 s of misses
     after the sections before it moved the clock on) */
  var c = spawn("airlift_n", BASE.x + 12 * TT, BASE.y); c.parked = false; c.order = { type: "hover" };
  var sq = spawn("rifle_n", c.x, c.y);
  sq.order = { type: "enter", target: c };
  ticks(30, function () { return sq.carried; });
  chk("a squad still boards a C-130J in flight", sq.carried, sq.order.type);
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
  chk("its card says CARRIES 8 · LIFTS 20 T · LANDS IN 5 TILES · FLOOR 16.8 \u00d7 3.0 M",
      th.indexOf("CARRIES 8 · LIFTS 20 T · LANDS IN 5 TILES · FLOOR 16.8 \u00d7 3.0 M") >= 0,
      (th.match(/CARRIES[^<]*/) || ["none"])[0]);
  card.dispatchEvent({ type: "mouseleave" });
}

/* ---- 12. HOLD SPACE: the matrix (stage 1b) ----
   Each airframe parked on the ramp, vehicles put to it one at a time through
   airliftRefusal - the test boardAirlifter makes at the ramp - and put aboard
   while it says yes. */
function liftOn(id) { var c = spawn(id, BASE.x, BASE.y); parkOn(c, BASE); return c; }
function emptyHold(c) { c.cargo.forEach(function (v) { v.carried = false; gone(v); }); c.cargo.length = 0; }
function fill(c, vid, max) {
  var n = 0, why = "";
  for (var i = 0; i < (max || 30); i++) {
    var v = spawn(vid, BASE.x + (i % 6 - 3) * TT, BASE.y + (6 + ((i / 6) | 0)) * TT);
    why = c.airliftRefusal(v);
    if (why) { gone(v); break; }
    c.cargo.push(v); v.carried = true; n++;
  }
  return { n: n, why: why };
}
function secHold() {
  log("\n[12] HOLD SPACE: floor and weight together, airframe by airframe");
  var c = liftOn("airlift_n"), f = fill(c, "recon_n"), L = c.cargoLoad();
  chk("C-130J-30 (16.76 m floor, one lane): three Humvees, then the floor says no",
      f.n === 3 && /^C-130J SUPER HERCULES — NO FLOOR SPACE LEFT FOR A HUMVEE \(4\.9 M\)$/.test(f.why) && Math.abs(L.floor - 14.7) < 1e-6,
      f.n + " aboard, " + L.floor.toFixed(2) + " m, then: " + f.why);
  var pt = spawn("pact_e50_lighttank", BASE.x, BASE.y + 6 * TT);
  emptyHold(c);
  chk("a PT-76 (14 t, 3.10 m wide) is light enough and too wide for its hold",
      c.airliftRefusal(pt) === "PT-76 (3.10 M WIDE) — TOO WIDE FOR THE HOLD OF THE C-130J SUPER HERCULES (3.02 M)", c.airliftRefusal(pt));
  gone(pt); gone(c);
  c = liftOn("nato_e80_airlift"); f = fill(c, "recon_n");
  chk("C-130H (12.19 m, the short hold): two Humvees, then the floor - its 19 t would have taken a third",
      f.n === 2 && /^C-130H HERCULES — NO FLOOR SPACE LEFT FOR A HUMVEE \(4\.9 M\)$/.test(f.why), f.n + " aboard, then: " + f.why);
  emptyHold(c);
  var s75 = spawn("kpa_e60_sam", BASE.x, BASE.y + 6 * TT);
  chk("an S-75 battery (12 t; the SAM CLASS DEFAULT 12.6 m - no figure on record) is too long for it",
      c.airliftRefusal(s75) === "S-75 DVINA (12.6 M) — TOO LONG FOR THE HOLD OF THE C-130H HERCULES (12.2 M)", c.airliftRefusal(s75));
  gone(s75); gone(c);
  c = liftOn("gbr_e00_airlift"); f = fill(c, "recon_n"); L = c.cargoLoad();
  chk("C-17 (26.82 x 5.49 m): ten Humvees, two abreast in two lanes of five, then the floor - weight (55 of 77.5 t) would take fourteen",
      f.n === 10 && /NO FLOOR SPACE LEFT FOR A HUMVEE \(4\.9 M\)$/.test(f.why) && Math.abs(L.floor - 24.5) < 1e-6,
      f.n + " aboard, " + L.floor.toFixed(2) + " m, then: " + f.why);
  sel([c]); UI.frame && UI.frame(0);
  chk("its panel: CARGO 10 VEH + 0 INF · 55 OF 77.5 T · 24.5 OF 26.8 M",
      panel().indexOf("10 VEH + 0 INF · 55 OF 77.5 T · 24.5 OF 26.8 M") >= 0, (panel().match(/CARGO <i>[^<]*/) || ["none"])[0]);
  emptyHold(c);
  var ab = spawn("mbt_n", BASE.x, BASE.y + 6 * TT); c.cargo.push(ab); ab.carried = true;
  var ab2 = spawn("mbt_n", BASE.x + TT, BASE.y + 6 * TT), br = spawn("ifv_n", BASE.x - TT, BASE.y + 6 * TT);
  var w2 = c.airliftRefusal(ab2), wb = c.airliftRefusal(br);
  chk("C-17 with one Abrams: a second Abrams and a Bradley are refused - 10.7 t left",
      /HAS 10\.7 T LEFT — M1A2 ABRAMS \(66\.8 T\) DOES NOT FIT/.test(w2) && /HAS 10\.7 T LEFT — BRADLEY IFV \(29\.9 T\) DOES NOT FIT/.test(wb), w2 + " | " + wb);
  gone(ab2); gone(br);
  f = fill(c, "recon_n"); L = c.cargoLoad();
  chk("...and only light vehicles go beside it: one Humvee, then the weight (72.3 of 77.5 t); the Abrams down the middle, 7.9 + 4.9 m of floor",
      f.n === 1 && /HAS 5\.2 T LEFT — HUMVEE \(5\.5 T\) DOES NOT FIT/.test(f.why) && Math.abs(L.floor - 12.8) < 1e-6,
      f.n + " aboard, " + L.floor.toFixed(2) + " m, then: " + f.why);
  /* the same load in another order lays out the same */
  var hv3 = c.cargo.filter(function (v) { return v.def.id === "recon_n"; });
  var p1 = c.holdPlan([ab].concat(hv3)).used, p2 = c.holdPlan(hv3.concat([ab])).used, p3 = c.holdPlan([hv3[0], ab, hv3[1], hv3[2]]).used;
  chk("the layout does not depend on the order they drove up the ramp", p1 === p2 && p2 === p3, p1 + " / " + p2 + " / " + p3);
  emptyHold(c);
  var abr = spawn("mbt_n", BASE.x, BASE.y + 6 * TT); c.cargo.push(abr); abr.carried = true;
  f = fill(c, "rifle_n"); L = c.cargoLoad();
  chk("an Abrams and riflemen: two squads (66.8 + 2 x 3.876 t), then the weight", f.n === 2 && /DOES NOT FIT/.test(f.why), f.n + " then: " + f.why);
  emptyHold(c); gone(c);
  c = liftOn("airlift_g"); f = fill(c, "recon_n");
  chk("A400M (17.71 x 4.00 m: too narrow for two Humvees abreast): three Humvees, then the floor - 37 t would take six",
      f.n === 3 && /^A400M ATLAS — NO FLOOR SPACE LEFT FOR A HUMVEE \(4\.9 M\)$/.test(f.why), f.n + " aboard, then: " + f.why);
  emptyHold(c); gone(c);
  c = liftOn("kpa_e90_transport"); f = fill(c, "pact_e80_lighttank"); L = c.cargoLoad();
  chk("Il-76TD (20 x 3.46 m, 48 t): three BMD-2s (8.2 t), then its floor (16.2 of 20 m) - its weight (24.6 of 48 t) would take five",
      f.n === 3 && /^IL-76TD — NO FLOOR SPACE LEFT FOR A BMD-2 \(5\.4 M\)$/.test(f.why) && Math.abs(L.floor - 16.2) < 1e-6,
      f.n + " aboard, " + L.floor.toFixed(2) + " m, then: " + f.why);
  emptyHold(c);
  f = fill(c, "recon_n");
  chk("...and four Humvees, then its floor (19.6 of 20 m; 22 of 48 t)", f.n === 4 && /NO FLOOR SPACE LEFT FOR A HUMVEE/.test(f.why), f.n + " then: " + f.why);
  emptyHold(c); gone(c);
  /* helicopters: one on the hook */
  c = spawn("trans_n", BASE.x + 10 * TT, BASE.y); c.parked = false; c.order = { type: "hover" };
  f = fill(c, "gbr_e60_sam");
  chk("a Black Hawk (4.08 t) slings one Rapier launcher (1.2 t), and not a second: one at a time",
      f.n === 1 && f.why === "BLACK HAWK HAS A VEHICLE ON THE HOOK ALREADY — ONE AT A TIME" && c.cargoLoad().hook === 1, f.n + " then: " + f.why);
  var g = fill(c, "rifle_n");
  chk("...and still takes riflemen as its payload allows: five squads (1.2 + 5 x 0.51 t)", g.n === 5, g.n + " then: " + g.why);
  emptyHold(c); gone(c);
  c = spawn("trans_b", BASE.x + 10 * TT, BASE.y); c.parked = false; c.order = { type: "hover" };
  f = fill(c, "nato_e80_recon"); L = c.cargoLoad();
  chk("a Chinook takes two M998 HMMWVs (2.2 m wide): one on the hook and one in its cabin, then its 10 t",
      f.n === 2 && L.hook === 1 && Math.abs(L.floor - 4.6) < 1e-6 && /HAS 0 T LEFT/.test(f.why), f.n + ", cabin " + L.floor + " m, then: " + f.why);
  emptyHold(c); gone(c);
}

/* ---- 13. the stage-1 reviewer's cases ---- */
function secReview() {
  log("\n[13] the stage-1 reviewer's cases");
  /* a diagonal lane one tile wide through a wood: the tiles 0.7 of a tile off its centreline are trees */
  var g = openGround(2, 2, BASE.tx + 40, BASE.ty + 20, 20, 60), cx = g.x, cy = g.y, saved = [];
  for (var y = cy - 18; y <= cy + 18; y++) for (var x = cx - 18; x <= cx + 18; x++) {
    if (x < 1 || y < 1 || x >= M.W - 1 || y >= M.H - 1) continue;
    var k = y * M.W + x; saved.push([k, M.terrain[k], M.elev[k]]);
    var dd = x - cx - (y - cy);
    M.terrain[k] = (dd === 0 || dd === 2 || dd === -2) ? T.GRASS : T.TREE;
    M.elev[k] = M.elev[cy * M.W + cx];
  }
  clearArea(cx * TT, cy * TT, 22);
  var c = liftOn("airlift_n");
  var s = Game.findStrip(c, (cx + 0.5) * TT, (cy + 0.5) * TT);
  chk("no strip down a one-tile diagonal lane in a wood (its corner tiles 0.7 tile off the centreline are trees)", !s,
      s ? "strip " + s.tax + "," + s.tay + " dir " + s.sx + "," + s.sy + " n " + s.n : "none");
  saved.forEach(function (q) { M.terrain[q[0]] = q[1]; M.elev[q[0]] = q[2]; });
  gone(c);
  /* a helicopter sent to set down on water */
  var w = null;
  for (var wy = 4; wy < M.H - 4 && !w; wy++) for (var wx = 4; wx < M.W - 4; wx++) {
    var all = true;
    for (var j = -1; j <= 1 && all; j++) for (var i = -1; i <= 1; i++) if (M.terrain[(wy + j) * M.W + wx + i] !== T.WATER) { all = false; break; }
    if (all) { w = { x: wx, y: wy }; break; }
  }
  if (!w) chk("water on this map for the helicopter case", false, "none");
  else {
    var ch = spawn("trans_b", (w.x + 6) * TT, (w.y + 6) * TT); ch.parked = false; ch.order = { type: "hover" };
    var hv = spawn("recon_n", BASE.x, BASE.y + 6 * TT); ch.cargo.push(hv); hv.carried = true;
    var why = Game.airLand(ch, (w.x + 0.5) * TT, (w.y + 0.5) * TT), wet = 0, ph = [];
    ticks(30, function () {
      var k2 = ch.ty * M.W + ch.tx;
      if (ch.grounded && M.terrain[k2] === T.WATER) wet++;
      var q = ch.order.type + "/" + (ch.order.ph || ""); if (ph[ph.length - 1] !== q) ph.push(q);
      return ch.order.type !== "airland";
    });
    var hk = hv.carried ? -1 : hv.ty * M.W + hv.tx;
    chk("a Chinook sent to set down on water hovers there - never 'on the ground' over water - and the Humvee goes off onto land",
        why === "" && wet === 0 && !hv.carried && M.terrain[hk] !== T.WATER && GameMap.passable(M, hv.tx, hv.ty, "ground"),
        "grounded over water " + wet + " ticks; " + ph.join(" ") + "; Humvee " + (hv.carried ? "aboard" : CFG.TERRAIN[M.terrain[hk]].name));
    gone(ch); hv.carried = false; gone(hv);
  }
  /* U on an aeroplane standing on its strip, with vehicles that boarded there */
  var p = farPoint(30, 14, 24);
  c = liftOn("airlift_n"); Game.airLand(c, p.x, p.y);
  ticks(120, function () { return c.order.type === "airland" && c.order.ph === "wait"; });
  var o = c.order, hs = [];
  for (var n = 0; n < 3; n++) {
    var h = spawn("recon_n", o.bx - o.uy * (3 + n) * TT, o.by + o.ux * (3 + n) * TT);
    h.order = { type: "enter", target: c }; hs.push(h);
  }
  ticks(15, function () { return hs.every(function (q) { return q.carried; }); });
  var aboard = hs.filter(function (q) { return q.carried; }).length;
  sel([c]); key("u");
  var on = hs.filter(function (q) { return !q.carried && onStrip(q, o); }).length;
  chk("U on a C-130J standing on its strip puts the three Humvees that boarded there down, and none on the strip",
      aboard === 3 && hs.every(function (q) { return !q.carried; }) && on === 0, aboard + " boarded, " + on + " put on the strip");
  hs.forEach(gone); gone(c);
}

/* ---- 14. fuel: never land where it cannot get home ---- */
function secFuel() {
  log("\n[14] fuel: refused beyond reach, refuels first, stays down when dry");
  /* an An-2 (radius 16: about 78 tiles out and back) to a strip ~95 tiles from its airbase */
  var far = null, near = null;
  for (var r = 0; r < 60 && (!far || !near); r++) {
    var a = r * 0.7;
    if (!far) { var gf = openGround(10, 10, BASE.tx - Math.cos(a) * 95, BASE.ty - Math.sin(a) * 95, 6, 12);
      if (gf) far = { x: (gf.x + 5) * TT, y: (gf.y + 5) * TT }; }
    if (!near) { var gn = openGround(10, 10, BASE.tx - Math.cos(a) * 40, BASE.ty - Math.sin(a) * 40, 6, 12);
      if (gn) near = { x: (gn.x + 5) * TT, y: (gn.y + 5) * TT }; }
  }
  var an = liftOn("kpa_e60_transport");
  if (far) clearArea(far.x, far.y, 16);
  if (near) clearArea(near.x, near.y, 16);
  var w1 = far ? Game.airLand(an, far.x, far.y) : "no far point";
  chk("an An-2 sent to land ~95 tiles from its airbase is refused: it could not get home",
      /^AN-2 COLT CANNOT LAND THERE AND GET HOME — \d+ TILES FROM ITS AIRBASE, BEYOND ITS REACH$/.test(w1) && an.order.type === "parked", w1);
  var w2 = near ? Game.airLand(an, near.x, near.y) : "no near point";
  chk("...and one ~40 tiles off is given", w2 === "" && an.order.type === "airland", w2 || an.order.type);
  gone(an);
  /* short of fuel for it now: home first, then the delivery */
  var p = farPoint(-30, 14, 20);
  var c = spawn("airlift_n", BASE.x + 6 * TT, BASE.y - 6 * TT); c.parked = false; c.padOn = BASE; c.order = { type: "hover" };
  var hv = spawn("recon_n", BASE.x, BASE.y + 6 * TT); c.cargo.push(hv); hv.carried = true;
  c.fuel = c.fuelMax * 0.45;
  var f = Game.airlandFuel(c, Game.findStrip(c, p.x, p.y));
  var why = Game.airLand(c, p.x, p.y);
  chk("a C-130J at 45% with a Humvee, sent 30 tiles out: within a full tank's reach but not this one's - it goes home first, the delivery queued",
      why === "" && f.reach && !f.now && c.order.type === "rtb" && c.order.then && c.order.then.type === "airland",
      why + " reach " + f.reach + " now " + f.now + " order " + c.order.type + (c.order.then ? "/" + c.order.then.type : ""));
  var r1 = fly(c, 260, false), j = r1.phases.join(" ");
  chk("...lands, refuels, flies the delivery and puts the Humvee down at the point",
      /parked@|rtb@/.test(j) && /unload@/.test(j) && !hv.carried && Math.hypot(hv.x - p.x, hv.y - p.y) < 6 * TT && !c.dead,
      j + "; Humvee " + (hv.carried ? "aboard" : tiles(Math.hypot(hv.x - p.x, hv.y - p.y)) + " tiles from the point"));
  gone(hv); gone(c);
  /* down on its strip with too little fuel to get home */
  var p2 = farPoint(28, -16, 20);
  var L = landAt("airlift_n", p2.x, p2.y, ["recon_n"]); c = L.c;
  ticks(120, function () { return c.order.type === "airland" && c.order.ph === "wait"; });
  chk("a C-130J down on its strip, its Humvee off", c.grounded && c.order.ph === "wait" && !c.cargo.length, c.order.type + "/" + c.order.ph);
  c.fuel = 3;
  var t0 = Game.time, phs = [];
  ticks(25, function () { var q = c.order.type + "/" + (c.order.ph || ""); if (phs[phs.length - 1] !== q) phs.push(q); return c.dead; });
  chk("tanks all but dry: it stays on the ground, alive, and says so - no take-off to crash",
      !c.dead && c.grounded && c.order.ph === "dry" &&
      said(/C-130J SUPER HERCULES — NOT ENOUGH FUEL TO REACH AN AIRBASE: STAYING ON THE GROUND/, t0),
      phs.join(" ") + " dead " + c.dead + " " + saidText(t0));
  sel([c]); rclickGround(c.x + 30 * TT, c.y);
  ticks(15, function () { return c.dead || !c.grounded; });
  chk("ordered away, it still stays down rather than fly off dry", !c.dead && c.grounded && c.order.ph === "dry" && c.order.then && c.order.then.type === "move",
      c.order.type + "/" + c.order.ph + (c.order.then ? " then " + c.order.then.type : "") + " dead " + c.dead);
  c.fuel = c.fuelMax;            // a tanker, or an airbase within reach - here, simply fuel
  var tt = ticks(20, function () { return !c.grounded; });
  chk("with the fuel to get home it turns, takes off and flies the order it was given", tt > 0 && !c.dead && c.order.type === "move",
      "airborne after " + tt.toFixed(1) + " s, order " + c.order.type);
  gone(c);
  /* (stage-1b review) its airbase lost while it stands there: the reserve
     had been measured to the home point, it took off on full tanks, orbited
     home - "NO RUNWAY TO RECOVER TO" - and fell out of the sky. Stood on
     its strip directly (downOn), so the section costs seconds of the clock,
     not minutes: the landing craft of [11] is put ashore near home later,
     and a commander's helicopter comes by there in time. */
  c = downOn("airlift_n", p2);
  var bi = P.buildings.indexOf(BASE);
  P.buildings.splice(bi, 1); c.padOn = null;             // no ramp anywhere: the airbase is gone
  t0 = Game.time; phs = [];
  ticks(4, function () { var q = c.order.type + "/" + (c.order.ph || ""); if (phs[phs.length - 1] !== q) phs.push(q); return c.dead || !c.grounded; });
  chk("its airbase lost while it is down, full tanks and all: it stays on its strip and says why",
      !c.dead && c.grounded && c.order.ph === "dry" && c.fuel > c.fuelMax * 0.8 &&
      said(/C-130J SUPER HERCULES — NO AIRBASE TO RECOVER TO: STAYING ON THE GROUND/, t0),
      phs.join(" ") + " dead " + c.dead + " fuel " + c.fuel.toFixed(0) + " " + saidText(t0));
  P.buildings.splice(bi, 0, BASE);                     // ...built again
  tt = ticks(12, function () { return c.dead || !c.grounded; });
  chk("...and with an airbase again it takes off for it", tt > 0 && !c.dead && c.order.type === "rtb" && Game.findPad(c).host === BASE,
      "airborne after " + tt.toFixed(1) + " s, order " + c.order.type);
  gone(c);
  /* (stage-1b review) a tanker beside the strip is not a ramp: a C-17 let
     go on the reserve to it flew a plain rtb to its airbase on empty tanks */
  var tkid = Object.keys(UNITS).filter(function (id) { return UNITS[id].tanker && UNITS[id].layer === "air" && !UNITS[id].hover; })[0];
  var p3 = null;
  [[-60, 0], [0, -60], [-50, -40], [40, -50], [-60, 30], [60, 0], [0, 60]].forEach(function (dd) {
    if (!p3) { var q = farPoint(dd[0], dd[1], 20); if (q && Math.hypot(q.x - BASE.x, q.y - BASE.y) > 45 * TT) p3 = q; } });
  c = p3 ? downOn("gbr_e00_airlift", p3) : null;
  var tk = c && tkid ? spawn(tkid, c.x + TT, c.y - TT) : null;
  if (tk) { tk.parked = false; tk.order = { type: "hover" }; }
  var rRamp = c ? c.reserveFuel(true) : 0, rTk = c ? c.reserveFuel() : 0;
  if (c) c.fuel = 12;                                    // over the reserve to the tanker (its floor, 10), short of the ramp
  if (c) ticks(4, function () { return c.dead || !c.grounded; });
  chk("a C-17 down " + (c ? tiles(Math.hypot(c.x - BASE.x, c.y - BASE.y)) : "?") + " tiles out on 12 of fuel, a tanker beside it: it stays down (" +
      rRamp.toFixed(1) + " to reach its ramp, " + rTk.toFixed(1) + " to the tanker)",
      !!c && !!tk && !c.dead && c.grounded && c.order.ph === "dry" && rRamp > 12 && rTk < 12,
      c ? c.order.type + "/" + c.order.ph + " grounded " + c.grounded + " dead " + c.dead : "no far strip");
  gone(tk); gone(c);
}
/* a transport of ours standing on a strip near p, stopped and waiting, as
   one that has just landed and unloaded there */
function downOn(id, p) {
  var c = spawn(id, BASE.x, BASE.y); parkOn(c, BASE);
  var s = Game.findStrip(c, p.x, p.y);
  if (!s) { gone(c); return null; }
  c.parked = false; c.x = s.bx; c.y = s.by; c.ang = Math.atan2(s.uy, s.ux);
  c.order = Object.assign({ type: "airland", x: p.x, y: p.y, goes: 0 }, s, { ph: "wait", t: 0, off: 1 });
  c.grounded = true; c.field = Unit.fieldOf(c.order);
  return c;
}

/* ---- 15. fog: the strip finder sees what its side sees ---- */
function secFog() {
  log("\n[15] fog: a hidden enemy does not move the strip, a seen one does");
  var c = liftOn("airlift_n"), best = null;
  /* a point no unit of ours can see */
  for (var r = 0; r < 40 && !best; r++) {
    var a = r * 0.9, gx = BASE.tx - Math.cos(a) * 45, gy = BASE.ty - Math.sin(a) * 45;
    var g = openGround(12, 12, gx, gy, 8, 14);
    if (!g) continue;
    var px = (g.x + 6) * TT, py = (g.y + 6) * TT;
    clearArea(px, py, 18);
    var s0 = Game.findStrip(c, px, py);
    if (!s0) continue;
    var mid = Math.floor(s0.n / 2), mx = s0.tax + mid * s0.sx, my = s0.tay + mid * s0.sy;
    if (Game.fog[my * M.W + mx] === 2) continue;           // in sight: not the case wanted
    best = { px: px, py: py, s0: s0, mx: mx, my: my };
  }
  if (!best) { chk("a fogged point with a strip", false, "none found"); gone(c); return; }
  var en = spawn(E && UNITS.rifle_p ? "rifle_p" : "rifle_n", (best.mx + 0.5) * TT, (best.my + 0.5) * TT, E);
  en.stance = "hold"; en.order = { type: "idle" };
  var same = function (s) { return s && s.tax === best.s0.tax && s.tay === best.s0.tay && s.sx === best.s0.sx && s.sy === best.s0.sy; };
  var s1 = Game.findStrip(c, best.px, best.py);
  chk("an enemy squad standing on that strip, hidden in the fog: the same strip is chosen - the side does not know it is there",
      !!en && en.owner === E && !Game.visibleTo(P, en) && same(s1),
      "enemy at " + best.mx + "," + best.my + " visible " + Game.visibleTo(P, en) + ", strip " + (s1 ? s1.tax + "," + s1.tay + " " + s1.sx + "," + s1.sy : "none"));
  var k = en.ty * M.W + en.tx, f0 = Game.fog[k];
  Game.fog[k] = 2;                                          // in sight now
  var s2 = Game.findStrip(c, best.px, best.py);
  chk("the same squad in sight: the strip finder steps round it", Game.visibleTo(P, en) && !same(s2) && !!s2,
      "strip " + (s2 ? s2.tax + "," + s2.tay + " " + s2.sx + "," + s2.sy : "none"));
  Game.fog[k] = f0;
  gone(en);
  var own = spawn("rifle_n", (best.mx + 0.5) * TT, (best.my + 0.5) * TT); own.order = { type: "idle" };
  chk("one of ours on it, fog or not: stepped round", !same(Game.findStrip(c, best.px, best.py)), "");
  gone(own); gone(c);
}

/* ---- 16. the Air Force's jet transports (eras.js, role "stratlift") ---- */
var JETS = ["nato_e60_c141", "nato_e80_c141", "nato_e60_c5", "nato_e80_c5", "nato_e00_c5", "nato_e90_c17"];
function airCards(era) {
  var e0 = P.era, out = [];
  P.era = era;
  sel([]); UI.refreshCards && UI.refreshCards();
  var box = document.getElementById("cards"), kind = function () {
    var c = box && box.children[0], kd = c && c.dataset && c.dataset.kind;
    return (kd === "upgrade" || kd === "era") ? "building" : (kd || ""); };
  for (var i = 0; i < 7 && kind() !== "aircraft"; i++) key("Tab");
  for (var j = 0; box && j < box.children.length; j++) if (box.children[j].dataset) out.push(box.children[j]);
  P.era = e0;
  return out;
}
function tipOf(card) {
  card.dispatchEvent({ type: "mouseenter" });
  var th = (document.getElementById("tooltip") || {}).innerHTML || "";
  card.dispatchEvent({ type: "mouseleave" });
  return (th.match(/CARRIES[^<]*/) || ["none"])[0];
}
function secJets() {
  log("\n[16] the Air Force's jet transports beside the Hercules: C-141, C-5, C-17");
  /* a. the rows, each in its periods, NATO's alone */
  var WANT = { e50: "", e60: "nato_e60_c141,nato_e60_c5", e80: "nato_e80_c141,nato_e80_c5",
               e90: "nato_e80_c141,nato_e80_c5,nato_e90_c17", e00: "nato_e00_c5,nato_e80_c141,nato_e90_c17",
               e20: "nato_e00_c5,nato_e90_c17" };
  var offP = [], other = [];
  ERAS.forEach(function (e) {
    var have = unitsFor("nato", "stratlift", e).slice().sort().join(",");
    if (have !== WANT[e]) offP.push(e + ": " + (have || "none") + " (want " + (WANT[e] || "none") + ")");
    Object.keys(FACTIONS).forEach(function (f) { if (f !== "nato" && unitsFor(f, "stratlift", e).length) other.push(f + "/" + e); });
  });
  chk("each in its periods: C-141A and C-5A in the 1960s-70s, C-141B 1980s-2000s, C-5B 1980s-90s, C-5M 2000s on, C-17A 1990s on",
      !offP.length && (ROLES.stratlift || []).slice().sort().join() === JETS.slice().sort().join(), offP.join("; ") || ERAS.map(function (e) { return e + " " + (WANT[e] || "-"); }).join(" | "));
  chk("and no other army fields one", !other.length, other.join(", ") || "none");
  /* strip: the C-17A's 3,500 ft and the C-5's 4,900 ft at maximum load (en.wikipedia) at a tile a hundred metres; 0 = runway (the C-141: no figure) */
  var FIG = { nato_e60_c141: [28.8, 21.34, 3.05, 0], nato_e80_c141: [42.5, 28.45, 3.05, 0], nato_e60_c5: [118.39, 36.88, 5.79, 15],
              nato_e80_c5: [118.39, 36.88, 5.79, 15], nato_e00_c5: [127.46, 36.88, 5.79, 15], nato_e90_c17: [77.52, 26.82, 5.49, 11] };
  var badF = JETS.filter(function (id) {
    var d = UNITS[id], w = FIG[id];
    return !d || d.fac !== "nato" || d.cat !== "aircraft" || !d.jet || d.hover || d.weapons.length || d.payload !== w[0] ||
           !d.hold || d.hold[0] !== w[1] || d.hold[1] !== w[2] || (w[3] ? d.strip !== w[3] || d.runway : !d.runway || d.strip);
  });
  chk("their figures: C-141A 28.8 t on 21.34 x 3.05 m, C-141B 42.5 t on 28.45 x 3.05, C-5A/B 118.39 t and C-5M 127.46 t on 36.88 x 5.79, " +
      "C-17A 77.52 t on 26.82 x 5.49 in 11 tiles; the C-5s in 15 tiles, the C-141s runway only; unarmed jets", !badF.length,
      badF.map(function (id) { var d = UNITS[id]; return id + " " + d.payload + " " + JSON.stringify(d.hold) + " strip " + d.strip + " runway " + d.runway; }).join("; "));

  /* b. the Hercules: unchanged, and still unitFor's answer */
  var HERC = { e50: "nato_e50_airlift", e60: "nato_e50_airlift", e80: "nato_e80_airlift", e90: "nato_e80_airlift",
               e00: "nato_e80_airlift", e20: "airlift_n" };
  var offH = ERAS.filter(function (e) { return unitFor("nato", "airlift", e) !== HERC[e] || unitsFor("nato", "airlift", e).join() !== HERC[e]; });
  chk("unitFor(\"airlift\") is still the period's Hercules, and the only NATO airlift row: C-130A, C-130H, C-130J",
      !offH.length, offH.map(function (e) { return e + " " + unitFor("nato", "airlift", e) + " [" + unitsFor("nato", "airlift", e).join() + "]"; }).join("; ") || "all six periods");
  var HF = { nato_e50_airlift: [16.6, 12.19, 5, 1200, 5, "e50", "e60"], nato_e80_airlift: [19.05, 12.19, 5, 1400, 6, "e80", "e00"],
             airlift_n: [19.96, 16.76, 5, 1600, 8, "e20", undefined] };
  var offHF = Object.keys(HF).filter(function (id) { var d = UNITS[id], w = HF[id];
    return d.role !== "airlift" || d.payload !== w[0] || d.hold[0] !== w[1] || d.strip !== w[2] || d.cost !== w[3] || d.cargo !== w[4] ||
           d.from !== w[5] || d.to !== w[6] || d.runway; });
  chk("the three Hercules rows as they were: 16.6 / 19.05 / 19.96 t, 5 tiles, $1,200 / 1,400 / 1,600, 5 / 6 / 8 seats, the same periods",
      !offHF.length, offHF.join(", "));
  var ids90 = airCards("e90").map(function (c) { return c.dataset.id; });
  chk("the 1990s AIR tab: the C-130H card, and the C-141B, the C-5B and the C-17A beside it",
      ["nato_e80_airlift", "nato_e80_c141", "nato_e80_c5", "nato_e90_c17"].every(function (id) { return ids90.indexOf(id) >= 0; }) &&
      ids90.indexOf("airlift_n") < 0 && ids90.indexOf("nato_e00_c5") < 0, ids90.filter(function (id) { return /lift|c141|c5|c17/.test(id); }).join(", "));
  var cs = airCards("e20"), byId = {};
  cs.forEach(function (c) { byId[c.dataset.id] = c; });
  var t5 = byId.nato_e00_c5 ? tipOf(byId.nato_e00_c5) : "no card", t17 = byId.nato_e90_c17 ? tipOf(byId.nato_e90_c17) : "no card",
      t130 = byId.airlift_n ? tipOf(byId.airlift_n) : "no card";
  chk("today's AIR tab: the C-130J card says what it said; the C-5M's CARRIES 51 · LIFTS 127.5 T · LANDS IN 15 TILES · FLOOR 36.9 × 5.8 M; " +
      "the C-17A's CARRIES 20 · LIFTS 77.5 T · LANDS IN 11 TILES · FLOOR 26.8 × 5.5 M",
      t130 === "CARRIES 8 · LIFTS 20 T · LANDS IN 5 TILES · FLOOR 16.8 × 3.0 M" &&
      t5 === "CARRIES 51 · LIFTS 127.5 T · LANDS IN 15 TILES · FLOOR 36.9 × 5.8 M" &&
      t17 === "CARRIES 20 · LIFTS 77.5 T · LANDS IN 11 TILES · FLOOR 26.8 × 5.5 M", t130 + " | " + t5 + " | " + t17);
  var c00 = airCards("e00"), t141 = "no card";
  c00.forEach(function (c) { if (c.dataset.id === "nato_e80_c141") t141 = tipOf(c); });
  chk("the 2000s AIR tab: the C-141B's card says RUNWAY ONLY: LANDS ON AN AIRBASE",
      t141 === "CARRIES 31 · LIFTS 42.5 T · RUNWAY ONLY: LANDS ON AN AIRBASE · FLOOR 28.5 × 3.1 M", t141);
  sel([]); UI.refreshCards && UI.refreshCards();

  /* c. the loads, by weight and floor (entities.js AIRLIFT, HOLD SPACE) */
  var rows = [];
  function load(lift, veh, want, re) {
    var c = liftOn(lift), f = fill(c, veh), L = c.cargoLoad();
    var ok = f.n === want && (!re || re.test(f.why));
    rows.push((ok ? "" : "WRONG ") + UNITS[lift].name + " + " + UNITS[veh].name + " (" + UNITS[veh].mass + " t): " + f.n +
              " (" + Unit.fmtT(L.t) + " t, " + Unit.fmtM(L.floor) + " m), then " + (f.why || "-"));
    emptyHold(c); gone(c);
    return ok;
  }
  var HEAVY = /DOES NOT FIT$/, WIDE = /TOO WIDE FOR THE HOLD/, TOO = /TOO HEAVY FOR THE/;
  var okL = [
    load("nato_e90_c17", "nato_e90_mbt", 1, HEAVY), load("nato_e90_c17", "nato_e00_mbt", 1, HEAVY), load("nato_e90_c17", "mbt_n", 1, HEAVY),
    load("nato_e90_c17", "nato_e90_ifv", 2, HEAVY), load("nato_e90_c17", "nato_e00_lighttank", 3, HEAVY),
    load("nato_e60_c5", "nato_e60_mbt", 2, HEAVY), load("nato_e80_c5", "nato_e80_mbt", 2, HEAVY), load("nato_e80_c5", "nato_e90_mbt", 1, HEAVY),
    load("nato_e80_c5", "nato_e80_ifv", 5, /NO FLOOR SPACE LEFT FOR AN M2 BRADLEY/), load("nato_e00_c5", "nato_e00_mbt", 2, HEAVY), load("nato_e00_c5", "mbt_n", 1, HEAVY),
    load("nato_e60_c141", "nato_e60_mbt", 0, TOO), load("nato_e80_c141", "nato_e80_mbt", 0, TOO), load("nato_e80_c141", "mbt_n", 0, TOO),
    load("nato_e80_c141", "nato_e80_ifv", 0, WIDE), load("nato_e60_c141", "nato_e60_ifv", 2, HEAVY), load("nato_e80_c141", "nato_e60_ifv", 4, HEAVY),
    load("nato_e80_c141", "nato_e80_lighttank", 2, HEAVY)
  ];
  rows.forEach(function (r) { log("       " + r); });
  chk("C-17A: one tank of each period from the M1A2 (63 t) on, two Bradleys, three Strykers - each time the weight says no to the next",
      okL.slice(0, 5).every(Boolean), rows.slice(0, 5).join(" | "));
  chk("C-5: two M60A1s in a C-5A, two M1A1s in a C-5B, two M1A2 SEPs in a C-5M (126 of 127.5 t); one M1A2 in a C-5B (126 > 118.4) and one SEP v3 in a C-5M (133.6 > 127.5); five Bradleys in a C-5B (32.5 m of its 36.9; the floor, and the weight, say no to a sixth)",
      okL.slice(5, 11).every(Boolean), rows.slice(5, 11).join(" | "));
  chk("C-141: every tank refused (too heavy), a Bradley refused (3.20 m, too wide for its 3.05 m); M113s and Sheridans until the weight is gone",
      okL.slice(11).every(Boolean), rows.slice(11).join(" | "));

  /* d. where they land */
  var g = openGround(16, 16, M.W / 2, M.H / 2, 20, 40), px = (g.x + 8) * TT, py = (g.y + 8) * TT;
  clearArea(px, py, 24);
  var c17 = spawn("nato_e90_c17", px + 20 * TT, py);
  c17.parked = false; c17.order = { type: "hover" }; c17.fuel = c17.fuelMax; c17.padOn = BASE;
  var w17 = Game.airLand(c17, px, py), down = false;
  for (var k = 0; k < 120 / DT && !w17 && !down; k++) { c17.update(DT); if (c17.order.type === "airland" && c17.order.ph === "unload") down = true; }
  chk("the C-17A lands on open ground (11 tiles) like a Hercules", !w17 && down, w17 || c17.order.type + "/" + c17.order.ph);
  gone(c17);
  /* the C-5M with two M1A2 SEPs: open ground too, on a strip of fifteen
     tiles, and the tanks come off it (the review: generations.js AIRLIFT) */
  var c5 = spawn("nato_e00_c5", px + 20 * TT, py);
  c5.parked = false; c5.order = { type: "hover" }; c5.fuel = c5.fuelMax; c5.padOn = BASE;
  var tanks = [spawn("nato_e00_mbt", BASE.x, BASE.y + 6 * TT), spawn("nato_e00_mbt", BASE.x + TT, BASE.y + 6 * TT)];
  tanks.forEach(function (v) { c5.cargo.push(v); v.carried = true; });
  var w5 = Game.airLand(c5, px, py), len5 = c5.order.type === "airland" ? c5.order.len / TT : 0, down5 = false;
  for (k = 0; k < 150 / DT && !w5 && !down5; k++) { c5.update(DT); if (c5.order.type === "airland" && c5.order.ph === "unload") down5 = true; }
  if (down5) ticks(10, function () { return !c5.cargo.length; });
  chk("the C-5M lands on open ground on a strip of 15 tiles and puts both tanks down beside it",
      !w5 && down5 && len5 >= 14 - 1e-6 && !c5.cargo.length && tanks.every(function (v) { return !v.carried && !v.dead && v.layer === "ground"; }),
      (w5 || c5.order.type + "/" + c5.order.ph) + ", strip " + len5.toFixed(1) + " tiles long, cargo " + c5.cargo.length);
  tanks.forEach(gone); gone(c5);
  /* the C-141B: a runway or nothing */
  var c141 = spawn("nato_e80_c141", px + 20 * TT, py);
  c141.parked = false; c141.fuel = c141.fuelMax; c141.padOn = BASE;
  c141.order = { type: "move", x: px, y: py };
  var m113 = [spawn("nato_e60_ifv", BASE.x, BASE.y + 6 * TT), spawn("nato_e60_ifv", BASE.x + TT, BASE.y + 6 * TT)];
  m113.forEach(function (v) { c141.cargo.push(v); v.carried = true; });
  var w141 = Game.airLand(c141, px, py);
  chk("the C-141B is refused open ground, with the reason (G.airLand), and has no strip (G.findStrip)",
      /^C-141B STARLIFTER NEEDS A RUNWAY — LAND IT ON AN AIRBASE AND UNLOAD IT THERE$/.test(w141) && !Game.findStrip(c141, px, py) &&
      c141.order.type === "move", w141);
  ticks(1);
  sel([c141]); var t0 = Game.time;
  key("u");
  chk("U over open ground with two M113s aboard: refused and told why; the order and the load are untouched",
      c141.order.type === "move" && c141.cargo.length === 2 && said(/C-141B STARLIFTER NEEDS A RUNWAY — LAND IT ON AN AIRBASE AND UNLOAD IT THERE/, t0),
      c141.order.type + " " + c141.cargo.length + " / " + saidText(t0));
  /* empty, U asks it to land to be loaded: refused, and the toast says load, not unload */
  var e141 = spawn("nato_e60_c141", px + 20 * TT, py - 6 * TT);
  e141.parked = false; e141.fuel = e141.fuelMax; e141.padOn = BASE; e141.order = { type: "move", x: px, y: py };
  ticks(1);
  sel([e141]); t0 = Game.time;
  key("u");
  chk("U on an empty one over open ground: refused, and told to land it on an airbase and LOAD it there",
      e141.order.type === "move" && said(/C-141A STARLIFTER NEEDS A RUNWAY — LAND IT ON AN AIRBASE AND LOAD IT THERE/, t0) &&
      !said(/C-141A STARLIFTER NEEDS A RUNWAY — LAND IT ON AN AIRBASE AND UNLOAD/, t0), e141.order.type + " / " + saidText(t0));
  gone(e141);
  /* sent to the airbase, as a right-click on it sends it (ui.js), it lands there and unloads standing on it */
  c141.padOn = BASE; c141.parked = false; c141.give({ type: "rtb" });
  var tp = ticks(150, function () { return c141.parked; });
  sel([c141]); t0 = Game.time;
  key("u");
  var offB = m113.map(function (v) { return v.carried || v.dead ? 99 : Math.round(Math.hypot(v.x - BASE.x, v.y - BASE.y) / TT * 10) / 10; });
  chk("sent to the airbase it lands and parks; U there puts both M113s on the ground beside it",
      c141.parked && c141.padOn === BASE && !c141.cargo.length && offB.every(function (d) { return d < 8; }) &&
      m113.every(function (v) { return v.layer === "ground" && !v.carried; }),
      "parked after " + tp.toFixed(1) + " s, cargo " + c141.cargo.length + ", M113s " + offB.join(" / ") + " tiles from the base; " + saidText(t0));
  m113.forEach(gone); gone(c141);
  sel([]);
}

/* ---- 17. TOUCHDOWN ---- */
/* one delivery, a tick at a time: when it is on the ground in the rules
   (`gnd`: a helicopter's `touch`, an aeroplane's `roll`), when it has
   stopped (`unload`), when the load is off - and in what phase, on the
   ground or not - and when it leaves the ground again */
function touchRun(u, load, px, py, maxT) {
  var t0 = Game.time, r = { why: Game.airLand(u, px, py), gnd: -1, stop: -1, off: -1, lift: -1, offGnd: false, offPh: "" };
  if (r.why) return r;
  ticks(maxT, function () {
    var o = u.order, t = Game.time - t0, ph = o.type === "airland" ? o.ph : o.type;
    if (r.gnd < 0 && (ph === "touch" || ph === "roll")) r.gnd = t;
    if (r.stop < 0 && (ph === "touch" || ph === "unload")) r.stop = t;
    if (r.off < 0) {
      if (load.every(function (v) { return !v.carried; })) { r.off = t; r.offGnd = !!u.grounded; r.offPh = o.type + "/" + o.ph; }
      return false;
    }
    if (!u.grounded) { r.lift = t; return true; }
    return u.order.type === "airland" && (u.order.ph === "turn" || u.order.ph === "dry");      // an aeroplane: off, and turning to go
  });
  return r;
}
function secTouch() {
  log("\n[17] TOUCHDOWN: a transport set down to unload keeps its load aboard until it is down in the drawing too");
  var TD = CFG.AIR_ALT / CFG.AIR_SINK;
  chk("TOUCHDOWN is the 3D view's cruise height over the rate it brings an aircraft down (config.js): " + CFG.AIR_ALT + " m / " + CFG.AIR_SINK + " m/s",
      typeof TOUCHDOWN === "number" && Math.abs(TOUCHDOWN - TD) < 1e-9 && TD > 2.5 && TD < 3,
      (typeof TOUCHDOWN === "number" ? TOUCHDOWN.toFixed(3) : "missing") + " s");
  var p = farPoint(14, -12, 16) || farPoint(-14, 12, 16);
  if (!p) { chk("open ground for the helicopters", false, ""); return; }
  /* helicopters, a rifle squad each, to the point */
  ["nato_e00_mv22", "trans_n"].forEach(function (id) {
    var h = spawn(id, p.x - 10 * TT, p.y - 4 * TT); h.parked = false; h.order = { type: "hover" };
    var q = spawn("rifle_n", BASE.x, BASE.y + 6 * TT); h.cargo.push(q); q.carried = true;
    var r = touchRun(h, [q], p.x, p.y, 40), dq = Math.hypot(q.x - p.x, q.y - p.y);
    chk(h.def.name + " sets down with a rifle squad: the squad is put down TOUCHDOWN after it is on the ground and not before, at the point, with it still standing there",
        !r.why && r.gnd > 0 && r.off - r.gnd >= TD - 1e-6 && r.off - r.gnd <= TD + DT + 1e-6 && r.offGnd && r.offPh === "airland/down" &&
        !q.carried && !q.dead && dq < 3 * TT,
        r.why || "on the ground at t=" + r.gnd.toFixed(2) + ", squad out at t=" + r.off.toFixed(2) + " (" + (r.off - r.gnd).toFixed(2) + " s later, " +
        r.offPh + ", grounded " + r.offGnd + "), " + tiles(dq) + " tiles from the point");
    chk("...it stays down two seconds more, as before, so the delivery is the flight, the touchdown and the old hold - TOUCHDOWN longer, no more",
        r.lift > r.off && Math.abs(r.lift - r.off - 2) <= 2 * DT + 1e-6 && Math.abs(r.lift - r.gnd - (TD + 2)) <= 2 * DT + 1e-6,
        "lifts at t=" + r.lift.toFixed(2) + ": " + (r.lift - r.off).toFixed(2) + " s after the squad, " + (r.lift - r.gnd).toFixed(2) +
        " s on the ground (" + TD.toFixed(2) + " + 2)");
    gone(q); gone(h);
  });
  /* a C-130J with a Humvee, on open ground */
  var p2 = farPoint(-30, 10, 20) || farPoint(30, 14, 20);
  if (p2) {
    var L = landAt("airlift_n", p2.x, p2.y, ["recon_n"]), hv = L.c.cargo.slice();
    var r2 = L.why ? { why: L.why } : touchRun(L.c, hv, p2.x, p2.y, 150);
    chk("C-130J with a Humvee: it drives off no sooner than TOUCHDOWN after the wheels touched, and no later than that or the end of the roll-out, with the aircraft stopped on its strip",
        !r2.why && r2.gnd > 0 && r2.stop > r2.gnd && r2.off - r2.gnd >= TD - 1e-6 && r2.off <= Math.max(r2.stop, r2.gnd + TD) + DT + 1e-6 &&
        r2.offGnd && r2.offPh === "airland/unload" && hv.every(function (v) { return !v.carried && !v.dead && v.layer === "ground"; }),
        r2.why || "wheels on at t=" + r2.gnd.toFixed(2) + ", stopped at t=" + r2.stop.toFixed(2) + " (a " + (r2.stop - r2.gnd).toFixed(2) +
        " s roll-out), Humvee off at t=" + r2.off.toFixed(2) + " (" + (r2.off - r2.gnd).toFixed(2) + " s after the wheels, " +
        Math.max(0, r2.off - r2.stop - DT).toFixed(2) + " s waited stopped; " + r2.offPh + ", grounded " + r2.offGnd + ")");
    hv.forEach(gone); gone(L.c);
  } else chk("open ground for the C-130J", false, "");
  /* a C-17A with a Humvee: its 11-tile roll-out is longer than the touchdown */
  var g = openGround(16, 16, M.W / 2, M.H / 2, 20, 40);
  if (g) {
    var px = (g.x + 8) * TT, py = (g.y + 8) * TT;
    clearArea(px, py, 24);
    var c17 = spawn("nato_e90_c17", px + 20 * TT, py);
    c17.parked = false; c17.order = { type: "hover" }; c17.fuel = c17.fuelMax; c17.padOn = BASE;
    var v17 = spawn("recon_n", BASE.x, BASE.y + 6 * TT); c17.cargo.push(v17); v17.carried = true;
    var r3 = touchRun(c17, [v17], px, py, 150);
    chk("C-17A with a Humvee: its roll-out on 11 tiles is longer than the touchdown, so it drives off as soon as it has stopped, as before",
        !r3.why && r3.stop - r3.gnd >= TD && r3.off > r3.stop && r3.off - r3.stop <= DT + 1e-6 && r3.offGnd && !v17.carried,
        r3.why || "a " + (r3.stop - r3.gnd).toFixed(2) + " s roll-out, off " + (r3.off - r3.stop).toFixed(3) + " s after it stopped (" + r3.offPh + ")");
    gone(v17); gone(c17);
  } else chk("open ground for the C-17A", false, "");
  /* out of the door in flight: at once, as before */
  var hh = spawn("trans_n", p.x, p.y - 6 * TT); hh.parked = false; hh.order = { type: "hover" };
  var hq = spawn("rifle_n", BASE.x, BASE.y + 6 * TT); hh.cargo.push(hq); hq.carried = true;
  ticks(1);
  sel([hh]); var t0 = Game.time;
  key("u");
  chk("U on a hovering Black Hawk puts its squad out at once - no touchdown, no landing",
      !hq.carried && !hq.dead && !hh.grounded && hh.order.type !== "airland" && Game.time === t0 && said(/1 UNIT DISEMBARKED/, t0),
      "carried " + hq.carried + ", order " + hh.order.type + ", grounded " + hh.grounded + " / " + saidText(t0));
  gone(hq); gone(hh);
  var cc = spawn("airlift_n", BASE.x + 12 * TT, BASE.y); cc.parked = false; cc.order = { type: "hover" };
  var cq = spawn("rifle_n", BASE.x, BASE.y + 6 * TT); cc.cargo.push(cq); cq.carried = true;
  ticks(1);
  sel([cc]); t0 = Game.time;
  key("u");
  chk("U on a C-130J in flight with a squad: out of the door at once, as before",
      !cq.carried && !cq.dead && cc.order.type !== "airland" && !cc.grounded && Game.time === t0,
      "carried " + cq.carried + ", order " + cc.order.type + ", grounded " + cc.grounded);
  gone(cq); gone(cc);
  sel([]);
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
  /* and a landing craft on its run to a beach with two squads aboard (the
     stage-1 review: a load lost its order to put them ashore) - half a
     second into an eleven-tile run, so it is still on the way at the save */
  var LC = beachRun();
  if (LC) ticks(0.5);
  /* put the squad back aboard b, so the load has to carry a hold on the ground too */
  if (!r1.carried) { b.cargo.push(r1); r1.carried = true; }
  b.order.load = 0;               // from here it waits only its two seconds: it leaves soon after the load
  /* the jets through the save as well (16): a C-141B in the air with an M113
     aboard, and a C-5M shut down on the ramp - placed by hand, since a tick
     here would move the two above on from the moment being saved */
  var j141 = spawn("nato_e80_c141", BASE.x, BASE.y - 4 * TT), jm = spawn("nato_e60_ifv", BASE.x - 3 * TT, BASE.y + 8 * TT);
  j141.parked = false; j141.fuel = j141.fuelMax; j141.padOn = BASE; j141.order = { type: "move", x: BASE.x + 10 * TT, y: BASE.y - 4 * TT };
  j141.cargo.push(jm); jm.carried = true;
  var j5 = spawn("nato_e00_c5", BASE.x, BASE.y);
  j5.padOn = BASE; j5.parked = true; j5.order = { type: "parked" }; j5.fuel = j5.fuelMax;
  /* and a Black Hawk half way down onto its point with a rifle squad aboard
     (17, TOUCHDOWN): flown there and down on its own, a tick at a time, for
     the same reason */
  var tg = openGround(3, 3, BASE.tx + 8, BASE.ty - 10, 3, 20), snapH = null, TD = CFG.AIR_ALT / CFG.AIR_SINK;
  if (tg) {
    var tpx = (tg.x + 1.5) * TT, tpy = (tg.y + 1.5) * TT;
    var th = spawn("trans_n", tpx - 3 * TT, tpy); th.parked = false; th.order = { type: "hover" };
    var tq = spawn("rifle_n", BASE.x, BASE.y + 6 * TT); th.cargo.push(tq); tq.carried = true;
    Game.airLand(th, tpx, tpy);
    for (var s = 0; s < 600 && !(th.order.ph === "touch" && th.order.t >= 1.2); s++) th.update(DT);
    snapH = { x: th.x, y: th.y, ph: th.order.ph, t: th.order.t, g: th.grounded, n: th.cargo.length };
  }
  chk("and a Black Hawk coming down onto its point, 1.2 s into its " + TD.toFixed(2) + " s touchdown, on the ground in the rules, its squad still aboard",
      !!snapH && snapH.ph === "touch" && snapH.t >= 1.2 && snapH.t < TD && snapH.g && snapH.n === 1,
      snapH ? snapH.ph + " t=" + snapH.t.toFixed(2) + " grounded " + snapH.g + " cargo " + snapH.n : "no ground for it");
  var snapA ={ x: a.x, y: a.y, ph: a.order.ph, bx: a.order.bx, by: a.order.by }, snapB = { x: b.x, y: b.y, bx: b.order.bx };
  var snapL = LC ? { x: LC.l.x, y: LC.l.y, n: LC.l.cargo.length, u: !!LC.l.order.unloadAt } : null;
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
  var J141 = null, J5 = null;
  Game.entities.forEach(function (e) {
    if (e.kind !== "unit" || e.dead || e.owner !== P) return;
    if (e.def.id === "nato_e80_c141") J141 = e;
    if (e.def.id === "nato_e00_c5") J5 = e;
  });
  var w141 = J141 ? Game.airLand(J141, J141.x, J141.y) : "";
  chk("the jets are back (16): the C-141B in the air, its M113 aboard and its order, still runway only and refused open ground; the C-5M on the ramp, 15 tiles",
      !!J141 && !!J5 && J141.def.runway === true && !J141.def.strip && !J141.parked && J141.order.type === "move" &&
      J141.cargo.length === 1 && J141.cargo[0].carried && J141.cargo[0].def.id === "nato_e60_ifv" && /NEEDS A RUNWAY/.test(w141) &&
      J5.parked && J5.def.strip === 15 && !J5.def.runway,
      (J141 ? "C-141B " + J141.order.type + " cargo " + J141.cargo.length + " runway " + J141.def.runway + " / " + w141 : "no C-141B") +
      (J5 ? "; C-5M parked " + J5.parked + " strip " + J5.def.strip : "; no C-5M"));
  if (J141) { J141.cargo.forEach(gone); J141.cargo.length = 0; gone(J141); }
  if (J5) gone(J5);
  /* the Black Hawk half way down: stepped on its own again, as it was saved */
  var TH = null;
  if (snapH) Game.entities.forEach(function (e) {
    if (e.kind === "unit" && e.def.id === "trans_n" && e.owner === P && Math.hypot(e.x - snapH.x, e.y - snapH.y) < 2) TH = e; });
  var tho = TH ? TH.order : {};
  chk("the Black Hawk is back half way down: the same phase, as far through it, on the ground, its squad aboard",
      !!TH && tho.type === "airland" && tho.ph === "touch" && Math.abs(tho.t - snapH.t) < 1e-6 && TH.grounded &&
      TH.targetLayer() === "ground" && TH.cargo.length === 1 && TH.cargo[0].carried,
      TH ? tho.type + "/" + tho.ph + " t=" + (tho.t || 0).toFixed(2) + " grounded " + TH.grounded + " cargo " + TH.cargo.length : "not found");
  if (TH) {
    var tsq = TH.cargo[0], k2 = 0;
    for (; k2 < 300 && tsq && tsq.carried; k2++) TH.update(DT);
    var left = k2 * DT, rest = TD - snapH.t;
    chk("...and waits out only the rest of it: the squad is out " + rest.toFixed(2) + " s on, the helicopter still on the ground",
        !!tsq && !tsq.carried && !tsq.dead && left >= rest - 1e-6 && left <= rest + DT + 1e-6 && TH.grounded && TH.order.ph === "down",
        "out after " + left.toFixed(2) + " s, " + (TH.order.type + "/" + TH.order.ph) + " grounded " + TH.grounded);
    gone(tsq); gone(TH);
  }
  var LL = null;
  if (snapL) Game.entities.forEach(function (e) {
    if (e.kind === "unit" && e.def.id === LC.id && e.owner === P && Math.hypot(e.x - snapL.x, e.y - snapL.y) < 3) LL = e; });
  var LLsq = LL ? LL.cargo.slice() : [];
  chk("the landing craft is back on its run in, its two squads aboard and its order to put them ashore",
      !!snapL && snapL.n === 2 && snapL.u && !!LL && LL.cargo.length === 2 && LL.cargo.every(function (c) { return c.carried; }) &&
      !!LL.order.unloadAt, snapL ? (LL ? LL.order.type + " unloadAt " + !!LL.order.unloadAt + " cargo " + LL.cargo.length : "not found") : "no beach");
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
  if (LL) {
    ticks(20, function () { return LL.cargo.length === 0; });
    /* the two squads that were aboard as the save loaded: each off the craft
       and on land by the beach. Whether they are still alive afterwards is
       not this check's business - the peace-mode AI's gunships can be over
       that beach when they land (they are, since the vehicle audit of
       2026-10-21 moved this match's clock by three seconds: two Mi-28Ns
       shot both squads after they came ashore), so a dead squad counts if
       it died on the beach and not in the hold. */
    var ashore = LLsq.filter(function (q) {
      return !q.carried && GameMap.passable(M, (q.x / TT) | 0, (q.y / TT) | 0, "ground") &&
             Math.hypot(q.x - (LC.beach.x + 0.5) * TT, q.y - (LC.beach.y + 0.5) * TT) < 4 * TT; });
    chk("...and, the load behind it, the landing craft has put both squads ashore",
        LL.cargo.length === 0 && LLsq.length === 2 && ashore.length === 2,
        "cargo " + LL.cargo.length + ", order " + LL.order.type + " at " + tiles(LL.x) + "," + tiles(LL.y) + " beach " + LC.beach.x + "," + LC.beach.y +
        "; ashore " + ashore.length + " of " + LLsq.length + ", alive " + LLsq.filter(function (q) { return !q.dead; }).length +
        LLsq.filter(function (q) { return q.dead; }).map(function (q) {
          return " (one killed by " + (q.lastHitBy && q.lastHitBy.def ? q.lastHitBy.def.full || q.lastHitBy.def.id : "?") + ")"; }).join(""));
  }
}
/* a landing craft eleven tiles out from the beach nearest home, two squads aboard, running in to put them ashore */
function beachRun() {
  var id = unitFor(P.faction, "transport_sea", Game.era || "e20");
  var hx = P.homeX / TT | 0, hy = P.homeY / TT | 0, best = null, bd = Infinity;
  for (var y = 6; y < M.H - 6; y++) for (var x = 6; x < M.W - 6; x++) {
    if (!GameMap.passable(M, x, y, "ground") || Game.tileBlocked(x, y, null)) continue;
    for (var d = 0; d < 4; d++) {
      var dx = [1, -1, 0, 0][d], dy = [0, 0, 1, -1][d], ok = true;
      for (var k = 1; k <= 12; k++) {
        var xx = x + dx * k, yy = y + dy * k;
        if (xx < 0 || yy < 0 || xx >= M.W || yy >= M.H || M.terrain[yy * M.W + xx] !== T.WATER) { ok = false; break; }
      }
      if (!ok) continue;
      var dd = Math.hypot(x - hx, y - hy);
      if (dd < bd) { bd = dd; best = { x: x, y: y, dx: dx, dy: dy }; }
    }
  }
  if (!best || !UNITS[id]) return null;
  var l = spawn(id, (best.x + best.dx * 11 + 0.5) * TT, (best.y + best.dy * 11 + 0.5) * TT);
  l.stance = "guard";
  [spawn("rifle_n", P.homeX, P.homeY + 2 * TT), spawn("rifle_n", P.homeX + TT, P.homeY + 2 * TT)].forEach(function (c) {
    l.cargo.push(c); c.carried = true; c.order = { type: "idle" }; });
  l.give({ type: "move", x: (best.x + 0.5) * TT, y: (best.y + 0.5) * TT, unloadAt: true });
  return { l: l, id: id, beach: best };
}
