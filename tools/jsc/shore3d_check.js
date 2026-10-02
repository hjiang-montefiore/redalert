/* tools/jsc/shore3d_check.js - where a shore building stands and which way
   it faces, checked on the REAL renderer under JavaScriptCore.

     python3 tools/jsc/scene3d.py tools/jsc/shore3d_check.js

   render3d.js shorePose() seats a naval yard or a coastal sonar array once
   per plot, with the water line its model declares (userData.shore) on the
   0.35 m water plane and never lower than the ground under the plot's
   middle, and turns it a quarter turn at a time so the face its model says
   meets the sea looks at its water; everything drawn at its foot asks
   shorePose. Held here on taiwan at seed "btest" - the default theatre,
   where HEAD sank both commanders' yards 4.0 and 4.8 m (their plots are the
   AI search's own picks, findShoreSpot's order less its pad and lane
   tests, which need the commander's memory):
     - what the two models declare, and that neither carries a part the
       renderer trains ("turret", "mountwrap");
     - both yards: apron above the water, the model's water line on it, the
       heading the rule gives (written again below from its statement), the
       slip's mouth over water; a yard up a bank at the ground under it, and
       sonar arrays on legal plots, one with its middle under water;
     - a yard going up keeps its water line on the water;
     - the enemy's yard remembered under fog, and a ghost written for it, are
       drawn exactly where it is drawn in sight;
     - its selection ring, health bar, repair label, rally flag and rally
       line, a sonar array's ring, the point it is picked by, and the
       placement preview all stand at its seat, the preview's seaward edge on
       the side it will face;
     - fire on it (damage3d.js) turns with it, and it goes down as rubble
       (impact3d.js) where and as it stood;
     - a mount fitted to a turned yard still lays on its bearing, and the
       rooftop kit render3d stands on its roof turns with it;
     - every other structure in the game is placed exactly as HEAD placed
       it: position, rotation, scale, turret, its pick point and its ring.
   Owner's rule: no browser, ever - the owner judges the look in their own.
   At HEAD (no shorePose, no declarations) 33 of the 47 fail. What holds
   there is what HEAD already did: the models carry no mount, a plot whose
   middle is above the water keeps its ground seat, a structure under fog is
   drawn where it is in sight, every other structure is placed as it is (the
   proof they are untouched) - and five of the unturned models' mouths
   happen to lie on water. */
var nface = 0;                                         // B0's count of plots whose face differs
var TT = 32, PXM = 0.625, WATER = 0.35, DT = 1 / 30, PASS = 0, FAIL = 0, H = null;
var S = 1.10;                                          // CFG.BLD_SCALE, read again at run()
var OVLOG = null;                                      // the overlay's strokes while a frame is recorded
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
function f2(v) { return v === undefined || v === null ? String(v) : (+v).toFixed(2); }

/* render3d hands Impact3D its heightAt and its record lookup; borrowed here
   as ghost3d_check.js and parked3d_check.js do */
(function () {
  if (typeof Impact3D === "undefined") return;
  var ii = Impact3D.init;
  Impact3D.init = function (T3, th, G, h) { H = h; return ii.apply(this, arguments); };
})();
/* the overlay's 2D context, wrapped so a frame's strokes can be read back */
function wrapCtx(c) {
  var REC = { ellipse: 1, moveTo: 1, lineTo: 1, fillRect: 1, fillText: 1 };
  return new Proxy(c, {
    get: function (t, k) {
      if (REC[k]) return function () { if (OVLOG) OVLOG.push([k].concat(Array.prototype.slice.call(arguments))); };
      return t[k];
    },
    set: function (t, k, v) { t[k] = v; return true; }
  });
}

window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "taiwan"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-cash", "200000"); set("opt-seed", "btest"); set("opt-fog", "0"); set("opt-3d", "1");
  CFG.GFX_LEVEL = "medium";
  var cv = document.getElementById("cv"), gc = cv.getContext;
  cv.getContext = function (k) { var c = gc.call(cv, k); return k === "2d" && c ? wrapCtx(c) : c; };
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { log("HARNESS CRASH " + e + "\n" + e.stack); FAIL++; }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

/* ---------------- the two models, as their files draw them ----------------
   js/hero/navalyard_building_slip.js: apron DECK 1.0, water WL -1.9, the slip
   runs out of the -X face, its mouth on that face at y SY -13.5.
   js/defences3d.js sonararray: hardstanding 0 to 0.7 (26 m square), the
   cable leaves off the +X face at y CY -4.0, its duct dropping to x 16.7. */
var MODEL = {
  navalyard: { wl: -1.9, top: 1.0, sea: [-1, 0], mouth: [-29, -13.5] },
  sonararray: { wl: 0, top: 0.7, sea: [1, 0], mouth: [16.7, -4.0] }
};
var SIDES = [[1, 0], [0, 1], [-1, 0], [0, -1]], NAMES = "ESWN", QUARTER = [0, Math.PI / 2, Math.PI, -Math.PI / 2];

/* The heading rule, written again from its statement (render3d.js): the
   candidates are the quarter turns that put the mouth on water (the plot
   tile at the mouth or the one past it), else those with water on the face
   or just past it, else all four; of them the one the summed bearings of the
   water tiles within 4 tiles of the plot point along; ties to more water on
   the face, then a ring of 6, then the side the model faces unturned (k0),
   then east, south, west, north. lat: metres the mouth lies left of the
   face's middle, looking out. */
function wetAt(x, y) { var M = Game.map; return x >= 0 && y >= 0 && x < M.W && y < M.H && M.terrain[y * M.W + x] === T.WATER; }
function ruleSide(w, tx, ty, lat, k0, dep) {
  var cx = tx + w / 2, cy = ty + w / 2;
  function pull(R) {
    var px = 0, py = 0;
    for (var y = ty - R; y < ty + w + R; y++) for (var x = tx - R; x < tx + w + R; x++) {
      if (!wetAt(x, y)) continue;
      var ox = x + 0.5 - cx, oy = y + 0.5 - cy, d = Math.sqrt(ox * ox + oy * oy);
      if (d > 0) { px += ox / d; py += oy / d; }
    }
    return function (k) { return px * SIDES[k][0] + py * SIDES[k][1]; };
  }
  function mouth(k) {
    var d = SIDES[k], l = lat / 20;                       // left of (dx, dy) is (dy, -dx)
    var mx = cx + d[0] * w / 2 + d[1] * l, my = cy + d[1] * w / 2 - d[0] * l;
    return wetAt(Math.floor(mx + d[0] / 2), Math.floor(my + d[1] / 2)) || wetAt(Math.floor(mx - d[0] / 2), Math.floor(my - d[1] / 2));
  }
  function face(k) {
    var n = 0;
    for (var i = 0; i < w; i++) for (var o = 0; o < 2; o++) {
      var x = k === 0 ? tx + w - 1 + o : k === 2 ? tx - o : tx + i;
      var y = k === 1 ? ty + w - 1 + o : k === 3 ? ty - o : ty + i;
      if (wetAt(x, y)) n++;
    }
    return n;
  }
  function top(ks, f) {
    var m = -Infinity; ks.forEach(function (k) { m = Math.max(m, f(k)); });
    return ks.filter(function (k) { return f(k) >= m - 1e-9; });
  }
  /* the tile the mouth itself lies in, or the next one out (render3d's
     atMouth): a yard's slip ends 1.9 m past the plot, a sonar's cable lands
     inside its edge tile. Only when no turn has one does the looser mouth()
     above decide. */
  function atMouth(k) {
    var d = SIDES[k], l = lat / 20, dp = dep / 20;
    var px = cx + d[0] * dp + d[1] * l, py = cy + d[1] * dp - d[0] * l;
    return wetAt(Math.floor(px), Math.floor(py)) || wetAt(Math.floor(px + d[0] * 0.5), Math.floor(py + d[1] * 0.5));
  }
  var all = [0, 1, 2, 3], ks = all.filter(atMouth), how = "mouth";
  if (!ks.length) ks = all.filter(mouth);
  if (!ks.length) { ks = all.filter(function (k) { return face(k) > 0; }); how = "face"; }
  if (!ks.length) { ks = all; how = "any"; }
  ks = top(ks, pull(4));
  if (ks.length > 1) { ks = top(ks, face); how += ",face"; }
  if (ks.length > 1) { ks = top(ks, pull(6)); how += ",ring"; }
  if (ks.length > 1) { if (ks.indexOf(k0) >= 0) ks = [k0]; how += ",order"; }
  return { k: ks[0], how: how };
}

function R3() { return Render3D.three; }
function recOf(e) { return H && H.recOf ? H.recOf(e.id) : null; }
function draw(n) { for (var i = 0; i < (n || 1); i++) Render.draw(DT, UI.input); }
function drawRec() { OVLOG = []; Render.draw(DT, UI.input); var L = OVLOG; OVLOG = null; return L; }
/* the screen point render3d's project() makes of a game point at a height */
function proj(wx, wy, alt) {
  var v = new THREE.Vector3(wx * PXM, alt, wy * PXM).project(R3().camera);
  return { x: (v.x + 1) / 2 * (window.innerWidth - 216), y: (1 - v.y) / 2 * window.innerHeight };
}
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-6); }
/* the node of a drawn instance that carries the model's declaration - at
   HEAD, which has none, the model under its stand-up wrap */
function modelNode(grp) {
  var n = null;
  grp.traverse(function (o) { if (!n && o.userData && o.userData.shore) n = o; });
  return n || (grp.children[0] && grp.children[0].children[0]) || grp;
}
/* shorePose, or at HEAD - which has none - a pose that fails every check */
function SP(id, tx, ty) {
  return typeof Render3D.shorePose === "function" ? Render3D.shorePose(id, tx, ty)
    : { y: NaN, yaw: NaN, face: -1, how: "none (HEAD)", ground: NaN, a: NaN };
}
function worldOf(node, x, y, z) { node.updateMatrixWorld(true); return new THREE.Vector3(x, y, z).applyMatrix4(node.matrixWorld); }
function sel(list) {
  var s = UI.selection; for (var i = 0; i < s.length; i++) s[i].selected = false; s.length = 0;
  for (var j = 0; j < list.length; j++) { list[j].selected = true; s.push(list[j]); }
}
/* the AI search's pick: findShoreSpot's box, parity and order, and canPlace */
function aiPick(P) {
  var M = Game.map, bd = 40 * 40, best = null, hx = (P.homeX / TT) | 0, hy = (P.homeY / TT) | 0;
  var y0 = Math.max(1, hy - 40); if (!(y0 & 1)) y0++;
  var x0 = Math.max(1, hx - 40); if (!(x0 & 1)) x0++;
  for (var y = y0; y < M.H - 3 && y <= hy + 40; y += 2)
    for (var x = x0; x < M.W - 3 && x <= hx + 40; x += 2) {
      var d = U.dist2(x, y, hx, hy); if (d >= bd) continue;
      var wet = false, dry = false;
      for (var yy = y; yy < y + 3; yy++) for (var xx = x; xx < x + 3; xx++) { if (wetAt(xx, yy)) wet = true; else dry = true; }
      if (!wet || !dry || !Game.canPlace(P, "navalyard", x, y)) continue;
      bd = d; best = { tx: x, ty: y };
    }
  return best;
}
/* every legal plot of a def within 40 tiles of a home, nearest first */
function legal(P, id) {
  var M = Game.map, D = BUILDINGS[id], out = [], hx = (P.homeX / TT) | 0, hy = (P.homeY / TT) | 0;
  for (var y = Math.max(1, hy - 40); y < M.H - 3 && y <= hy + 40; y++)
    for (var x = Math.max(1, hx - 40); x < M.W - 3 && x <= hx + 40; x++) {
      var d = U.dist2(x, y, hx, hy); if (d >= 1600) continue;
      var n = 0;
      for (var yy = y; yy < y + D.h; yy++) for (var xx = x; xx < x + D.w; xx++) if (wetAt(xx, yy)) n++;
      if (n === 0 || n === D.w * D.h || !Game.canPlace(P, id, x, y)) continue;
      out.push({ tx: x, ty: y, d: d });
    }
  out.sort(function (a, b) { return a.d - b.d || a.ty - b.ty || a.tx - b.tx; });
  return out;
}

/* one shore building as drawn: its seat and heading against the rule */
function standing(b, label) {
  var id = b.def.id, Md = MODEL[id], rec = recOf(b), ps = SP(id, b.tx, b.ty);
  if (!rec) { chk(label + ": drawn", false, "no model"); return null; }
  var g = rec.grp, node = modelNode(g), ground = H.heightAt(b.x, b.y);
  var wl = worldOf(node, 0, 0, Md.wl).y, top = worldOf(node, 0, 0, Md.top).y;
  var afloat = WATER - Md.wl * S;
  chk(label + ": its apron stands above the water, and HEAD's would have been at " + f2(ground + Md.top * S) + " m",
      top >= WATER && near(g.position.y, Math.max(afloat, ground)) && near(g.position.y, ps.y),
      "ground under its middle " + f2(ground) + " m; seat " + f2(g.position.y) + " m, apron " + f2(top) + " m");
  if (ground <= afloat)
    chk(label + ": the water line its model is drawn for is on the water", near(wl, WATER, 1e-6), "water line at " + wl.toFixed(4) + " m");
  else
    chk(label + ": above the water line it stays on the ground under its middle", g.position.y === ground && wl > WATER,
        "seat " + f2(g.position.y) + " = ground " + f2(ground) + ", water line " + f2(wl) + " m over the water");
  /* the mouth's offset left of the face's middle looking out, from the
     model's own numbers: left of (sx, sy) in its axes is (-sy, sx) */
  var lat = (-Md.mouth[0] * Md.sea[1] + Md.mouth[1] * Md.sea[0]) * S;
  var dep = (Md.mouth[0] * Md.sea[0] + Md.mouth[1] * Md.sea[1]) * S;   // and how far out along (sx, sy)
  /* the side it faces unturned: the model's (x, y) stands up as the game's (x, -y) */
  var k0 = (Math.round(Math.atan2(-Md.sea[1], Md.sea[0]) / (Math.PI / 2)) + 4) % 4;
  var R = ruleSide(b.def.w, b.tx, b.ty, lat, k0, dep);
  /* the seaward face in the world: the model's seaward axis taken through the drawn instance */
  node.updateMatrixWorld(true);
  var sv = new THREE.Vector3(Md.sea[0], Md.sea[1], 0).transformDirection(node.matrixWorld);
  var k = Math.round(Math.atan2(sv.z, sv.x) / (Math.PI / 2)); k = (k + 4) % 4;
  /* and its mouth, taken through the drawn instance: the tile it is in, and
     half a tile in and out along the facing (the plot's edge tile and the one past it) */
  var mw = worldOf(node, Md.mouth[0], Md.mouth[1], 0), gx = mw.x / PXM / TT, gy = mw.z / PXM / TT, d = SIDES[k];
  var mx = Math.floor(gx), my = Math.floor(gy);
  var wetMouth = wetAt(mx, my) || wetAt(Math.floor(gx + d[0] / 2), Math.floor(gy + d[1] / 2)) || wetAt(Math.floor(gx - d[0] / 2), Math.floor(gy - d[1] / 2));
  chk(label + ": it faces the side the rule gives, " + NAMES[R.k] + " (" + R.how + ")",
      k === R.k && ps.face === R.k && Math.abs(sv.y) < 1e-9,
      "model's seaward face points " + NAMES[k] + ", shorePose face " + (ps.face >= 0 ? NAMES[ps.face] : "-") + " by " + ps.how + ", yaw " + f2(g.rotation.y));
  if (R.how.split(",")[0] === "mouth")
    chk(label + ": and its " + (id === "navalyard" ? "slip's mouth" : "cable landing") + " is over water", wetMouth,
        "the mouth at tile " + mx + "," + my);
  return { rec: rec, ps: ps, ground: ground };
}

function run() {
  S = CFG.BLD_SCALE;
  var P = Game.human, E = Game.players[1], M = Game.map;
  AI.setPeace(E, true);
  Game.checkVictory = function () {};
  chk("the 3D renderer is up, and has shorePose", Render === Render3D && typeof Render3D.shorePose === "function" && !!H,
      "renderer " + (Render === Render3D ? "3D" : "2D") + ", shorePose " + typeof Render3D.shorePose);
  if (!H) return;

  /* ---- A. what the models say ---- */
  ["navalyard", "sonararray"].forEach(function (id) {
    var root = BLD_MODELS[id].build(THREE, Models3D, { team: "#4b8fe0" }), sd = null, parts = [];
    root.traverse(function (o) { if (!sd && o.userData && o.userData.shore) sd = o.userData.shore; if (o.name === "turret" || o.name === "mountwrap") parts.push(o.name); });
    var Md = MODEL[id];
    chk(id + " declares its water line, its seaward face and its mouth, as its file draws them",
        !!sd && sd.waterline === Md.wl && sd.seaward[0] === Md.sea[0] && sd.seaward[1] === Md.sea[1] &&
        sd.mouth[0] === Md.mouth[0] && sd.mouth[1] === Md.mouth[1], JSON.stringify(sd));
    chk(id + " has no turret or mountwrap for the renderer to train (and no def_" + id + " mount)",
        parts.length === 0 && !BLD_MODELS["def_" + id], parts.join(",") || "none");
  });

  /* ---- B0. every legal plot of both defs near both homes, before
     anything is placed: shorePose's face and how against the rule ---- */
  ["navalyard", "sonararray"].forEach(function (id) {
    var Md = MODEL[id], lat = (-Md.mouth[0] * Md.sea[1] + Md.mouth[1] * Md.sea[0]) * S;
    var dep = (Md.mouth[0] * Md.sea[0] + Md.mouth[1] * Md.sea[1]) * S;
    var k0 = (Math.round(Math.atan2(-Md.sea[1], Md.sea[0]) / (Math.PI / 2)) + 4) % 4;
    var n = 0, bad = [], hows = {}; nface = 0;
    [P, E].forEach(function (pl) { legal(pl, id).forEach(function (q) {
      n++;
      var R = ruleSide(BUILDINGS[id].w, q.tx, q.ty, lat, k0, dep), ps = SP(id, q.tx, q.ty);
      hows[R.how] = (hows[R.how] || 0) + 1;
      if (ps.face !== R.k) nface++;
      if (ps.face !== R.k || ps.how !== R.how) bad.push(q.tx + "," + q.ty + " " + (ps.face >= 0 ? NAMES[ps.face] : "-") + " " + ps.how + " vs " + NAMES[R.k] + " " + R.how);
    }); });
    chk(id + ": on all " + n + " legal plots near both homes it faces the side the rule gives, settled the same way",
        n > 0 && !bad.length, bad.length + " differ (" + nface + " in the face itself): " + bad.slice(0, 3).join("; ") + "   rule's hows " + JSON.stringify(hows));
  });

  /* ---- B. taiwan's two yards, on the AI search's picks ---- */
  var yards = [];
  [P, E].forEach(function (pl, i) {
    var s = aiPick(pl);
    if (!s) { chk("a yard plot for commander " + i, false, "none"); return; }
    var b = Game.placeBuilding(pl, "navalyard", s.tx, s.ty, true);
    yards.push(b);
  });
  Render.setCam(yards[0].x, yards[0].y); draw(2);
  var st = yards.map(function (b, i) { return standing(b, "taiwan yard " + i + " (" + b.tx + "," + b.ty + (b.owner.isAI ? ", AI" : "") + ")"); });
  chk("both taiwan yards were under the water at HEAD: the ground under their middles",
      st.length === 2 && st.every(function (q) { return q && q.ground + 1.0 * S < WATER; }),
      st.map(function (q) { return q ? f2(q.ground) + " m" : "-"; }).join(", ") + " (the modeller's census: -4.0 and -4.8)");

  /* ---- C. a yard up a bank, and sonar arrays ---- */
  var bank = legal(P, "navalyard").filter(function (q) { return H.heightAt((q.tx + 1.5) * TT, (q.ty + 1.5) * TT) > WATER + 1.9 * S + 1; })[0];
  if (bank) {
    Render.setCam((bank.tx + 1.5) * TT, (bank.ty + 1.5) * TT);
    var bb = Game.placeBuilding(P, "navalyard", bank.tx, bank.ty, true);
    draw(2); standing(bb, "a yard on a bank (" + bank.tx + "," + bank.ty + ")");
  } else chk("a yard plot up a bank", false, "none");
  /* set down by a script on dry land, with no water within six tiles: there
     is nothing to turn it to, so it is not turned */
  var dry = null;
  for (var yy = 10; yy < M.H - 10 && !dry; yy += 3) for (var xx = 10; xx < M.W - 10 && !dry; xx += 3) {
    var any = false;
    for (var y2 = yy - 6; y2 < yy + 9 && !any; y2++) for (var x2 = xx - 6; x2 < xx + 9; x2++) if (wetAt(x2, y2)) { any = true; break; }
    if (!any) dry = { tx: xx, ty: yy };
  }
  if (dry) {
    var dp = SP("navalyard", dry.tx, dry.ty);
    chk("a yard set down on dry land with no water in sight is not turned: its slip runs west, as drawn",
        dp.face === 2 && dp.yaw === 0, "(" + dry.tx + "," + dry.ty + ") face " + (dp.face >= 0 ? NAMES[dp.face] : "-") + " by " + dp.how + ", yaw " + f2(dp.yaw));
  } else chk("a dry inland plot", false, "none");
  /* the nearest legal plot to each home, and one more whose middle is under water */
  var sonars = [], sp0 = legal(P, "sonararray"), sp1 = legal(E, "sonararray");
  [[P, sp0], [E, sp1]].forEach(function (pl) {
    var q = pl[1].filter(function (c) { return Game.canPlace(pl[0], "sonararray", c.tx, c.ty); })[0];
    if (q) sonars.push(Game.placeBuilding(pl[0], "sonararray", q.tx, q.ty, true));
    else chk("a sonar array plot", false, "none");
  });
  var wm = sp0.filter(function (c) { return H.heightAt((c.tx + 1) * TT, (c.ty + 1) * TT) < 0 && Game.canPlace(P, "sonararray", c.tx, c.ty); })[0];
  if (wm) sonars.push(Game.placeBuilding(P, "sonararray", wm.tx, wm.ty, true));
  else chk("a sonar array plot with its middle under water", false, "none");
  sonars.forEach(function (b) { Render.setCam(b.x, b.y); draw(2); standing(b, "sonar array (" + b.tx + "," + b.ty + ")"); });

  /* ---- D. a yard going up keeps its water line on the water ---- */
  var y0 = yards[0], r0 = recOf(y0), ps0 = SP("navalyard", y0.tx, y0.ty);
  y0.buildProgress = 0.3; Render.setCam(y0.x, y0.y); draw(1);
  var n0 = modelNode(r0.grp), wlUp = worldOf(n0, 0, 0, MODEL.navalyard.wl).y, apUp = worldOf(n0, 0, 0, MODEL.navalyard.top).y;
  chk("a yard 30% built rises about its water line: the line stays on the water, the apron above it",
      near(wlUp, WATER, 1e-6) && apUp > WATER && near(r0.grp.scale.y, 0.15 + 0.85 * 0.3),
      "water line " + wlUp.toFixed(4) + " m, apron " + f2(apUp) + " m, scale " + f2(r0.grp.scale.y) + " (HEAD: squashed onto the ground at " + f2(H.heightAt(y0.x, y0.y)) + " m)");
  y0.buildProgress = 1; draw(1);
  chk("finished, it is back on its seat, and its pose was found once", near(r0.grp.position.y, ps0.y) && r0.shore === ps0 &&
      SP("navalyard", y0.tx, y0.ty) === ps0, "seat " + f2(r0.grp.position.y));

  /* ---- E. remembered under fog, and a ghost, where it is drawn in sight ---- */
  var ey = yards[1], er = recOf(ey);
  Render.setCam(ey.x, ey.y); draw(1);
  var live = { p: er.grp.position.clone(), r: er.grp.rotation.clone() };
  Game.fogEnabled = true;
  var box = function (v) { for (var y = ey.ty - 4; y < ey.ty + 7; y++) for (var x = ey.tx - 4; x < ey.tx + 7; x++) Game.fog[y * M.W + x] = v; };
  box(1); draw(1);
  var fr = recOf(ey);
  chk("the enemy's yard remembered under explored fog is drawn exactly where it is in sight",
      !!fr && fr.grp.position.equals(live.p) && fr.grp.rotation.equals(live.r),
      fr ? "at " + f2(fr.grp.position.y) + " m, yaw " + f2(fr.grp.rotation.y) : "not drawn");
  var gh = { id: ey.id, def: ey.def, owner: ey.owner, layer: ey.layer, r: ey.r, x: ey.x, y: ey.y,
             tx: ey.tx + 1, ty: ey.ty + 1, ang: ey.ang || 0, tang: ey.tang, parked: false, t: Game.time,
             life: 20, hid: true, show: true };
  var gerr = null;
  Game.ghosts = [gh];
  try { draw(1); } catch (err) { gerr = err; }
  var gg = null; R3().scene.children.forEach(function (o) { if (o.userData && o.userData.ghost === ey.id) gg = o; });
  var own = false; if (gg) gg.traverse(function (o) { if (o.name === "navalyard") own = true; });
  chk("a ghost written for it is its own model, drawn exactly where the yard is",
      !gerr && !!gg && own && gg.position.equals(live.p) && near(gg.rotation.y, live.r.y, 1e-12),
      gerr ? "drawing it threw " + gerr : gg ? (own ? "" : "a unit stand-in, not the yard's model; ") + "ghost at " + f2(gg.position.x) + "," + f2(gg.position.y) + "," + f2(gg.position.z) + " yaw " + f2(gg.rotation.y) +
           " vs " + f2(live.p.x) + "," + f2(live.p.y) + "," + f2(live.p.z) + " yaw " + f2(live.r.y) : "no ghost");
  Game.ghosts = []; box(2); Game.fogEnabled = false; draw(1);

  /* ---- F. everything drawn at its foot ---- */
  var yb = yards[0], ypose = SP("navalyard", yb.tx, yb.ty);
  Render.setCam(yb.x, yb.y);
  sel([yb]); yb.hp = yb.maxHp * 0.6; yb.repairing = true;
  var L = drawRec(), cam = Render3D.cam;
  var r = Math.max(9, yb.r * (760 / cam.dist) * 0.9), p = proj(yb.x, yb.y, ypose.y), pH = proj(yb.x, yb.y, H.heightAt(yb.x, yb.y));
  var ring = L.filter(function (c) { return c[0] === "ellipse" && near(c[3], r * 1.15) && near(c[1], p.x, 1e-6) && near(c[2], p.y + r * 0.4, 1e-6); });
  var bar = L.filter(function (c) { return c[0] === "fillRect" && near(c[2], p.y - r - 8, 1e-6); });
  var rep = L.filter(function (c) { return c[0] === "fillText" && c[1] === "REPAIRING" && near(c[3], p.y - r - 18, 1e-6); });
  chk("its selection ring, health bar and repair label stand at its seat, not at the ground under it",
      ring.length === 1 && bar.length === 2 && rep.length === 1 && Math.abs(p.y - pH.y) > 1,
      "ring " + ring.length + ", bar " + bar.length + ", label " + rep.length + "; the seat is " + f2(pH.y - p.y) + " px above where HEAD drew them");
  var es = Render3D.entityScreen(yb);
  chk("the point it is picked by is its seat", near(es.x, p.x) && near(es.y, p.y), "entityScreen " + f2(es.x) + "," + f2(es.y) + " vs " + f2(p.x) + "," + f2(p.y));
  var rp = proj(yb.rally.x, yb.rally.y, Math.max(H.heightAt(yb.rally.x, yb.rally.y), WATER));
  var flag = L.filter(function (c, i) { return c[0] === "moveTo" && near(c[1], rp.x) && near(c[2], rp.y) && L[i + 1] && L[i + 1][0] === "lineTo" && near(L[i + 1][2], rp.y - 16); });
  chk("its rally flag stands on the sea's surface where its rally line ends, not on the seabed",
      flag.length === 1, "rally at " + f2(H.heightAt(yb.rally.x, yb.rally.y)) + " m ground, flag drawn at " + f2(Math.max(H.heightAt(yb.rally.x, yb.rally.y), WATER)) + " m");
  var ol = R3().scene.children.filter(function (c) { return c.name === "orderLines"; })[0], v0 = null;
  if (ol) { var A = ol.geometry.attributes.position.array, n = ol.geometry.drawRange.count;
    for (var i = 0; i < n; i++) if (near(A[i * 3], yb.x * PXM, 1e-3) && near(A[i * 3 + 2], yb.y * PXM, 1e-3)) { v0 = A[i * 3 + 1]; break; } }
  chk("its rally line leaves it a metre over its seat", v0 !== null && near(v0, ypose.y + 1.0, 1e-4),
      "first point at " + f2(v0) + " m (seat " + f2(ypose.y) + " m; HEAD: " + f2(Math.max(H.heightAt(yb.x, yb.y), WATER) + 1) + " m)");
  yb.repairing = false; yb.hp = yb.maxHp; sel([]);
  var sa = sonars[sonars.length - 1];
  if (sa) {
    var sps = SP("sonararray", sa.tx, sa.ty);
    Render.setCam(sa.x, sa.y); sel([sa]);
    var L2 = drawRec(), sp = proj(sa.x, sa.y, sps.y);
    var sr = L2.filter(function (c) { return c[0] === "ellipse" && c.length === 8 && near(c[1], sp.x, 1e-6) && near(c[2], sp.y, 1e-6); });
    chk("a sonar array's sonar ring lies round its seat", sr.length === 1,
        sr.length + " ring(s) at the seat (" + f2(sps.y) + " m; ground " + f2(sps.ground) + " m)");
    sel([]);
  }
  /* the placement preview, the cursor over the middle of a plot the yard could go on */
  var pv = legal(P, "navalyard").filter(function (c) { return Game.canPlace(P, "navalyard", c.tx, c.ty); })[0];
  if (!pv) { chk("a free yard plot for the preview", false, "none"); return; }
  var pvPose = SP("navalyard", pv.tx, pv.ty);
  Render.setCam((pv.tx + 1.5) * TT, (pv.ty + 1.5) * TT); draw(1);
  var cur = proj((pv.tx + 1.5) * TT, (pv.ty + 1.5) * TT, H.heightAt((pv.tx + 1.5) * TT, (pv.ty + 1.5) * TT));
  UI.input.placing = "navalyard"; UI.input.mx = cur.x; UI.input.my = cur.y;
  var L3 = drawRec(); UI.input.placing = null;
  var cs = [[pv.tx, pv.ty], [pv.tx + 3, pv.ty], [pv.tx + 3, pv.ty + 3], [pv.tx, pv.ty + 3]].map(function (c) { return proj(c[0] * TT, c[1] * TT, pvPose.y); });
  var at = -1;
  for (var j = 0; j + 3 < L3.length; j++)
    if (L3[j][0] === "moveTo" && near(L3[j][1], cs[0].x) && near(L3[j][2], cs[0].y) &&
        [1, 2, 3].every(function (q) { return L3[j + q][0] === "lineTo" && near(L3[j + q][1], cs[q].x) && near(L3[j + q][2], cs[q].y); })) { at = j; break; }
  var ea = cs[(pvPose.face + 1) % 4], eb = cs[(pvPose.face + 2) % 4], edge = at >= 0 && L3[at + 4] && L3[at + 4][0] === "moveTo" &&
      near(L3[at + 4][1], ea.x) && near(L3[at + 4][2], ea.y) && L3[at + 5][0] === "lineTo" && near(L3[at + 5][1], eb.x) && near(L3[at + 5][2], eb.y);
  chk("the placement preview lies level at the seat the yard would take, its " + NAMES[pvPose.face] + " edge - the one it would turn to the water - ruled",
      at >= 0 && edge, at >= 0 ? (edge ? "corners and seaward edge at " + f2(pvPose.y) + " m" : "corners right, no seaward edge") : "no outline at the seat");

  /* ---- G. fire on it turns with it; it goes down where and as it stood ---- */
  var dy = yards[1], dr = recOf(dy), dyaw = dr.grp.rotation.y, dseat = SP("navalyard", dy.tx, dy.ty).y;
  Render.setCam(dy.x, dy.y); dy.hp = dy.maxHp * 0.2; draw(3);
  var an = Damage3D.anchors(dy.id), worst = 0, turned = 0;
  if (an) an.srcs.forEach(function (q) {
    var c = Math.cos(dyaw), s2 = Math.sin(dyaw), gx = dr.grp.position.x + q.local.x * c + q.local.z * s2, gz = dr.grp.position.z - q.local.x * s2 + q.local.z * c;
    worst = Math.max(worst, Math.abs(q.x - gx), Math.abs(q.z - gz), Math.abs(q.y - (dr.grp.position.y + q.local.y)));
    if (Math.hypot(q.local.x, q.local.z) > 1) turned++;
  });
  chk("a burning yard's fires are on its turned model (damage3d.js)", !!an && an.srcs.length > 0 && worst < 1e-6 && Math.abs(dyaw) > 0.1 && turned > 0,
      an ? an.srcs.length + " sources, worst " + worst.toExponential(1) + " m off the turned frame, yaw " + f2(dyaw) : "no emitter");
  Combat.applyDamage(Game, dy, 1e7, WEAPONS.howitzer, null);
  Game.tick(DT); draw(1);
  chk("brought down, it goes to rubble turned as it stood, from its seat (impact3d.js)",
      Impact3D.stats().recs.rubble >= 1 && dr.grp.parent === R3().scene && near(dr.grp.rotation.y, dyaw, 1e-12) && dr.grp.position.y <= dseat + 1e-9 && dr.grp.position.y > dseat - 1,
      "rubble " + Impact3D.stats().recs.rubble + ", yaw " + f2(dr.grp.rotation.y) + ", at " + f2(dr.grp.position.y) + " m");

  /* ---- H. a mount on a turned yard still lays on its bearing ---- */
  var ty0 = yards[0], tr = recOf(ty0), tn = modelNode(tr.grp), tur = new THREE.Group();
  tur.name = "turret"; tn.add(tur); tr.turret = tur; ty0.tang = 0.8;
  draw(1); tur.updateMatrixWorld(true);
  var fw = new THREE.Vector3(1, 0, 0).transformDirection(tur.matrixWorld), bearing = Math.atan2(fw.z, fw.x);
  chk("a mount fitted to a turned yard lays on the building's bearing, not on bearing plus the turn",
      near(bearing, 0.8, 1e-9) && Math.abs(tr.grp.rotation.y) > 0.1, "laid " + bearing.toFixed(4) + " rad for 0.8, the yard turned " + f2(tr.grp.rotation.y));
  tn.remove(tur); tr.turret = null;

  /* ---- I'. the rooftop kit render3d stands on the roof, in the model's own
     frame, turns with it: every kit piece keeps, to the model it stands on,
     the place it has in the unturned template ---- */
  function kitRel(root) {
    var node = modelNode(root), out = [], inv = new THREE.Matrix4();
    root.updateMatrixWorld(true); inv.copy(node.matrixWorld).invert();
    root.traverse(function (o) { if (/^kit\./.test(o.name)) out.push({ n: o.name, m: new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld) }); });
    return out;
  }
  var kitB = [yards[0]].concat(sonars).filter(function (b) { var rc = recOf(b); return rc && Math.abs(rc.grp.rotation.y) > 0.1; });
  var kitN = 0, kitWorst = 0, kitBad = [];
  kitB.forEach(function (b) {
    var rc = recOf(b), live = kitRel(rc.grp), tpl = kitRel(rc.tpl);
    if (!live.length || live.length !== tpl.length) { kitBad.push(b.def.id + ": " + live.length + " kit pieces drawn, " + tpl.length + " in its template"); return; }
    live.forEach(function (q, i) {
      kitN++;
      for (var e = 0; e < 16; e++) kitWorst = Math.max(kitWorst, Math.abs(q.m.elements[e] - tpl[i].m.elements[e]));
    });
  });
  chk("a turned shore building carries its rooftop kit with it: each piece where it stands on the unturned model",
      kitB.length >= 2 && kitN > 0 && !kitBad.length && kitWorst < 1e-6,
      kitB.length + " turned buildings, " + kitN + " kit pieces, worst " + kitWorst.toExponential(1) + (kitBad.length ? "; " + kitBad.join("; ") : ""));

  /* ---- I. every other structure exactly as HEAD placed it ---- */
  var ids = Object.keys(BUILDINGS).filter(function (id) { return !BUILDINGS[id].shore; }), placed = [], bad = [], i2 = 0;
  ids.forEach(function (id) {
    var D = BUILDINGS[id], tx = 6 + (i2 % 13) * 10, ty = 6 + ((i2 / 13) | 0) * 10; i2++;
    if (tx + D.w >= M.W || ty + D.h >= M.H) return;
    var b = Game.placeBuilding(i2 % 2 ? P : E, id, tx, ty, true);
    if (i2 % 3 === 0) b.buildProgress = 0.4;
    b.tang = 0.3 + i2 * 0.01;
    placed.push(b);
  });
  Render.setCam(M.W * TT / 2, M.H * TT / 2); draw(2);
  var withTur = 0;
  placed.forEach(function (b) {
    var rc = recOf(b);
    if (!rc) { bad.push(b.def.id + " not drawn"); return; }
    var g = rc.grp, x = ((b.tx + b.def.w / 2) * CFG.TILE) * PXM, z = ((b.ty + b.def.h / 2) * CFG.TILE) * PXM;
    var ok = g.position.x === x && g.position.y === H.heightAt(b.x, b.y) && g.position.z === z &&
             g.rotation.x === 0 && g.rotation.y === 0 && g.rotation.z === 0 && g.rotation.order === "XYZ" &&
             g.scale.y === 0.15 + 0.85 * b.buildProgress && rc.shore === undefined;
    if (rc.turret) { withTur++; ok = ok && rc.turret.rotation.z === -(b.tang || 0); }
    var es2 = Render3D.entityScreen(b);
    ok = ok && es2.x === Render3D.sx(b.x, b.y) && es2.y === Render3D.sy(b.x, b.y);
    if (!ok) bad.push(b.def.id);
  });
  chk("every one of the " + placed.length + " other structures is placed as HEAD placed it: ground under its middle, unturned, same scale, turret and pick point",
      placed.length === ids.length && bad.length === 0, bad.length ? "differs: " + bad.slice(0, 8).join(", ") : withTur + " with a turret; all exact (===)");
  var pw = placed.filter(function (b) { return b.def.id === "power"; })[0];
  if (pw) {
    Render.setCam(pw.x, pw.y); sel([pw]); pw.hp = pw.maxHp * 0.5;
    var L4 = drawRec(), rr = Math.max(9, pw.r * (760 / Render3D.cam.dist) * 0.9), pp = proj(pw.x, pw.y, H.heightAt(pw.x, pw.y));
    var ring2 = L4.filter(function (c) { return c[0] === "ellipse" && near(c[1], pp.x, 1e-6) && near(c[2], pp.y + rr * 0.4, 1e-6); });
    chk("and a selected power plant's ring is where HEAD drew it, on the ground under its middle", ring2.length === 1, ring2.length + " ring(s)");
    sel([]);
  }
}
