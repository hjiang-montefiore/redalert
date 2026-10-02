/* tools/jsc/parked3d_check.js - a parked aircraft stands on what it is parked
   on, checked on the REAL renderer under JavaScriptCore.

     python3 tools/jsc/scene3d.py tools/jsc/parked3d_check.js [-- A,B,C,D,...]

   The letters run only those sections; with none, all of them, about four
   minutes.

   render3d.js set a parked machine at the ground under it plus 1.2 m whatever
   its landing gear, after the template had been scaled to the unit's length,
   and at sea "the ground" is the seabed. The modellers rebuilding the AH-64E
   and the Mi-28N found their machines sunk into the deck. What this file
   measured at 91c2088, and again at b62fbf6:
     - open ground, all 368 aircraft types: every one below it, the
       fixed-wing 0.21 to 9.70 m, the rotorcraft 1.20 to 5.30 m (0.39 to
       5.30 m at b62fbf6, with eleven European helicopters redrawn);
     - an airbase's pads: the same, less the apron's 0.35 m, and one of the
       four revetments stands under the hangar roof;
     - a ship's deck: 9.3 to 10.1 m under the sea, inside the hull, and with
       the game laying a deck out on the world axes, most of them over open
       water beside her.

   What is held, for every aircraft type that can park:
     A. on open ground, its lowest drawn point is on the ground (3 cm). A
        see-through blur - a propeller disc - is not a point it stands on;
     B. on an airbase's pad - every period's and every architecture's model,
        every revetment - on the pad, every revetment open to the sky, and
        nothing of it inside the base: four of every type, one on each pad,
        and none of it more than VOL_TOL into a wall, the tower or anything
        else standing there, but for the types listed as drawn too big for a
        revetment (OVERSIZE);
     C. on every deck in the game, every type that deck takes, at four
        headings: its lowest point on her deck under that point, measured in
        her own frame with a ray from her own model; and on a carrier nothing
        of it inside her - island, hangar, the aircraft her modeller parked on
        her - and the complement she sails with clear of each other;
     D. riding with her while she steams, turns and rolls, and while a hole
        lists her, heading and all;
     E. taking off and landing without a jump, in place or in heading, from
        and to a deck under way, whichever way she heads and it flies;
     F. moved to another ship's deck, or to an airbase, while it stands on
        one, and on a ship sunk under it: it leaves from where it is drawn;
     G. an enemy deck machine does not jump when its ship goes into the fog;
   and what must not move: an aircraft in flight keeps its cruise altitude
   and the game's position; the mouse picks a parked machine where it is
   drawn, and its selection ring stands over it; the damage module's fire
   and smoke and the wreck the kill leaves are where it is drawn; and once
   every model has been measured, a frame casts no ray at all.

   The draw cost of the scene below is printed, not held: a shared machine. */
var TT = 32, PXM = 0.625, DT = 1 / 30, TOL = 0.03, PASS = 0, FAIL = 0, H = null;
var ONLY = (typeof __ARGS !== "undefined" && __ARGS[0]) ? __ARGS[0].split(",") : null;
function want(k) { return !ONLY || ONLY.indexOf(k) >= 0; }
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }
function f2(v) { return typeof v !== "number" || v !== v ? String(v) : (v >= 0 ? "+" : "") + v.toFixed(2); }
function deg(r) { return (r * 57.2958).toFixed(1); }
function wrapA(a) { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; }

/* render3d hands Impact3D its record lookup (entity id -> the group it is
   drawn as); the checks borrow it to reach the drawn model of an entity */
(function () {
  if (typeof Impact3D === "undefined") return;
  var ii = Impact3D.init;
  Impact3D.init = function (T3, th, G, h) { H = h; return ii.apply(this, arguments); };
})();
/* every ray anyone casts, for the steady-state count */
var RAYS = 0;
(function () {
  var R = THREE.Raycaster.prototype, one = R.intersectObject, many = R.intersectObjects;
  R.intersectObject = function () { RAYS++; return one.apply(this, arguments); };
  R.intersectObjects = function () { RAYS++; return many.apply(this, arguments); };
})();
/* the overlay's selection rings: every ellipse drawn on a 2D context */
var RINGS = [];
(function () {
  var mk = __ctx2d;
  __ctx2d = function () { var c = mk(); c.ellipse = function (x, y, rx) { RINGS.push({ x: x, y: y, r: rx }); }; return c; };
})();

window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-cash", "200000"); set("opt-seed", "btest"); set("opt-fog", "0"); set("opt-3d", "1");
  CFG.GFX_LEVEL = "high";
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { FAIL++; log("HARNESS CRASH " + e + "\n" + e.stack); }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

function R3() { return Render3D.three; }
function frames(n, tick) { for (var i = 0; i < n; i++) { if (tick) Game.tick(DT); Render.draw(DT, UI.input); } }
function recOf(e) { return H ? H.recOf(e.id) : null; }
function shown(o) { for (; o; o = o.parent) if (!o.visible) return false; return true; }
/* a see-through blur, not a solid: the test js/impact3d.js charGroup() uses */
function blur(o) { var m = Array.isArray(o.material) ? o.material[0] : o.material; return !m || (m.transparent && m.opacity < 0.98); }
var _v = new THREE.Vector3(), _m = new THREE.Matrix4();
function eachVert(grp, inv, fn) {
  grp.updateMatrixWorld(true);
  grp.traverse(function (o) {
    if (!o.isMesh || !o.geometry || !o.geometry.attributes.position || !shown(o) || blur(o)) return;
    var p = o.geometry.attributes.position;
    for (var i = 0; i < p.count; i++) {
      _v.fromBufferAttribute(p, i).applyMatrix4(o.matrixWorld);
      if (inv) _v.applyMatrix4(inv);
      fn(_v, o);
    }
  });
}
/* the lowest drawn solid point of a group, in world metres or, given a
   matrix, in that frame (a ship's, so a list or a roll does not count) */
function lowest(grp, inv) {
  var lo = { y: Infinity, x: 0, z: 0 };
  eachVert(grp, inv, function (v) { if (v.y < lo.y) { lo.y = v.y; lo.x = v.x; lo.z = v.z; } });
  return lo;
}
/* the first drawn surface of obj under a point, along dir (world) */
var _rc = new THREE.Raycaster();
function firstHit(obj, from, dir) {
  obj.updateMatrixWorld(true);
  _rc.set(from, dir);
  var hits = _rc.intersectObject(obj, true);
  for (var i = 0; i < hits.length; i++) if (hits[i].object.isMesh && shown(hits[i].object) && !blur(hits[i].object)) return hits[i].point;
  return null;
}
function drop(list) {
  list.forEach(function (u) {
    u.dead = true;
    var i = Game.entities.indexOf(u); if (i >= 0) Game.entities.splice(i, 1);
    var j = u.owner.units.indexOf(u); if (j >= 0) u.owner.units.splice(j, 1);
    var k = u.owner.buildings.indexOf(u); if (k >= 0) u.owner.buildings.splice(k, 1);
  });
  frames(1);
}
function flatSpot() {
  var M = Game.map, P = Game.human, hx = (P.homeX / TT) | 0, hy = (P.homeY / TT) | 0;
  for (var r = 8; r < 90; r++) for (var a = 0; a < 64; a++) {
    var an = a / 64 * 6.283, x = (hx + Math.cos(an) * r) | 0, y = (hy + Math.sin(an) * r) | 0;
    if (x < 12 || y < 12 || x + 12 >= M.W || y + 12 >= M.H) continue;
    var h0 = H.heightAt(x * TT, y * TT), ok = true;
    for (var j = -10; j <= 10 && ok; j += 2) for (var i = -10; i <= 10; i += 2)
      if (Math.abs(H.heightAt((x + i) * TT, (y + j) * TT) - h0) > 0.01 || !GameMap.passable(M, x + i, y + j, "ground")) { ok = false; break; }
    if (ok) return { x: x, y: y };
  }
  return null;
}
function seaSpot(r0, skip) {
  var M = Game.map, n = 0;
  for (var y = r0; y < M.H - r0; y += 2) for (var x = r0; x < M.W - r0; x += 2) {
    var ok = true;
    for (var j = -r0; j <= r0 && ok; j += 2) for (var i = -r0; i <= r0; i += 2)
      if (M.terrain[(y + j) * M.W + x + i] !== T.WATER) { ok = false; break; }
    if (ok && n++ >= (skip || 0)) return { x: x, y: y };
  }
  return null;
}
/* parked by hand, then laid out by the game's own parked branch (twice: it
   sizes the grid by what is already standing there) */
function park(list, host) {
  list.forEach(function (u) { u.padOn = host || null; u.parked = true; u.order = { type: "parked" }; u.moving = false; u.stance = "hold"; });
  if (host) for (var k = 0; k < 2; k++) list.forEach(function (u) { u.updateAir(DT); });
}
function shipInv(ship) { var sr = recOf(ship); sr.grp.updateMatrixWorld(true); return new THREE.Matrix4().copy(sr.grp.matrixWorld).invert(); }
/* a parked machine against the surface it stands on. On a pad: its lowest
   drawn point minus the pad under it, a ray from a metre above that point
   down through its middle (under any roof over it, and into anything it is
   sunk less than a metre into). On a ship, in her own frame and along her
   own "down": under each of its lowest points - every point within 2 cm of
   the lowest, a metre apart - the deck under THAT point, and the least of
   the gaps: a carrier's deck markings stand 4 to 5 cm proud, and one of a
   pair of level wheels can be on one. */
var _from = new THREE.Vector3(), _down = new THREE.Vector3(), _q = new THREE.Quaternion();
function onPad(u, b) {
  var r = recOf(u), br = recOf(b);
  if (!r || !br) return { gap: NaN, why: "not drawn" };
  var lo = lowest(r.grp), p = r.grp.position;
  var hit = firstHit(br.grp, _from.set(p.x, lo.y + 1, p.z), _down.set(0, -1, 0));
  return hit ? { gap: lo.y - hit.y, pad: hit.y - br.grp.position.y } : { gap: NaN, why: "no pad under it" };
}
function onDeck(u, ship) {
  var r = recOf(u), sr = recOf(ship);
  if (!r || !sr) return { gap: NaN, why: "not drawn" };
  var inv = shipInv(ship), lo = lowest(r.grp, inv), pts = [];
  eachVert(r.grp, inv, function (v) {
    if (v.y > lo.y + 0.02) return;
    for (var i = 0; i < pts.length; i++) if (Math.abs(pts[i].x - v.x) < 1 && Math.abs(pts[i].z - v.z) < 1) return;
    pts.push(v.clone());
  });
  var o = r.grp.position.clone().applyMatrix4(inv);             // its origin, in her frame
  _down.set(0, -1, 0).applyQuaternion(sr.grp.getWorldQuaternion(_q));
  var hit = null, gap = Infinity;
  pts.forEach(function (q) {
    var h = firstHit(sr.grp, new THREE.Vector3(q.x, q.y + 1, q.z).applyMatrix4(sr.grp.matrixWorld), _down);
    if (!h) return;
    h = h.clone().applyMatrix4(inv);
    if (q.y - h.y < gap) { gap = q.y - h.y; hit = h; }
  });
  /* its heading in her frame: its nose direction, turned into her frame */
  var nose = new THREE.Vector3(1, 0, 0).applyQuaternion(r.grp.getWorldQuaternion(new THREE.Quaternion()));
  nose.applyQuaternion(sr.grp.getWorldQuaternion(new THREE.Quaternion()).invert());
  var yaw = Math.atan2(-nose.z, nose.x);
  if (!hit) return { gap: NaN, why: "no deck under it", lx: o.x, lz: o.z, yaw: yaw };
  return { gap: gap, deck: hit.y, lx: o.x, lz: o.z, yaw: yaw };
}
function tally(rows) {
  var bad = 0, lo = null, hi = null, miss = 0;
  rows.forEach(function (r) {
    if (r.gap !== r.gap) { miss++; bad++; return; }
    if (Math.abs(r.gap) > TOL) bad++;
    if (!lo || r.gap < lo.gap) lo = r;
    if (!hi || r.gap > hi.gap) hi = r;
  });
  return { bad: bad, miss: miss, lo: lo, hi: hi, n: rows.length,
           text: rows.length + " parked, " + bad + " off by more than " + (TOL * 100) + " cm" + (miss ? " (" + miss + " with nothing under them)" : "") +
                 (lo ? "; lowest point from " + f2(lo.gap) + " m (" + lo.id + ") to " + f2(hi.gap) + " m (" + hi.id + ")" : "") };
}
/* a ship's top surface on a half-metre grid in her own frame, rastered from
   her triangles: what an aircraft on her deck must not be inside */
function topOf(grp) {
  var inv = new THREE.Matrix4().copy(grp.matrixWorld).invert(), tris = [], B = new THREE.Box3();
  grp.updateMatrixWorld(true);
  var a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  grp.traverse(function (o) {
    if (!o.isMesh || !shown(o) || blur(o)) return;
    var p = o.geometry.attributes.position, ix = o.geometry.index, n = ix ? ix.count : p.count;
    for (var t = 0; t + 2 < n; t += 3) {
      a.fromBufferAttribute(p, ix ? ix.getX(t) : t).applyMatrix4(o.matrixWorld).applyMatrix4(inv);
      b.fromBufferAttribute(p, ix ? ix.getX(t + 1) : t + 1).applyMatrix4(o.matrixWorld).applyMatrix4(inv);
      c.fromBufferAttribute(p, ix ? ix.getX(t + 2) : t + 2).applyMatrix4(o.matrixWorld).applyMatrix4(inv);
      tris.push([a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z]);
      B.expandByPoint(a); B.expandByPoint(b); B.expandByPoint(c);
    }
  });
  var s = 0.5, x0 = B.min.x, z0 = B.min.z, nx = Math.ceil((B.max.x - x0) / s) + 1, nz = Math.ceil((B.max.z - z0) / s) + 1;
  var top = new Float32Array(nx * nz).fill(-Infinity);
  tris.forEach(function (T) {
    var d = (T[5] - T[8]) * (T[0] - T[6]) + (T[6] - T[3]) * (T[2] - T[8]);
    if (Math.abs(d) < 1e-9) return;
    var i0 = Math.ceil((Math.min(T[0], T[3], T[6]) - x0) / s), i1 = Math.floor((Math.max(T[0], T[3], T[6]) - x0) / s);
    var k0 = Math.ceil((Math.min(T[2], T[5], T[8]) - z0) / s), k1 = Math.floor((Math.max(T[2], T[5], T[8]) - z0) / s);
    for (var i = i0; i <= i1; i++) for (var k = k0; k <= k1; k++) {
      var x = x0 + i * s, z = z0 + k * s;
      var l1 = ((T[5] - T[8]) * (x - T[6]) + (T[6] - T[3]) * (z - T[8])) / d, l2 = ((T[8] - T[2]) * (x - T[6]) + (T[0] - T[6]) * (z - T[8])) / d;
      if (l1 < -1e-6 || l2 < -1e-6 || l1 + l2 > 1 + 1e-6) continue;
      var y = l1 * T[1] + l2 * T[4] + (1 - l1 - l2) * T[7];
      if (y > top[i * nz + k]) top[i * nz + k] = y;
    }
  });
  return { at: function (x, z) { var i = Math.round((x - x0) / s), k = Math.round((z - z0) / s);
    return i < 0 || k < 0 || i >= nx || k >= nz ? -Infinity : top[i * nz + k]; } };
}
/* how much of an aircraft is more than 1 m inside her, and the cells of it
   in her frame, for the overlap between two aircraft */
function inside(u, ship, T) {
  var inv = shipInv(ship), n = 0, deep = 0, worst = 0, cells = {};
  eachVert(recOf(u).grp, inv, function (v, o) {
    /* render3d's deck planner leaves a rotor out of an aircraft's plan (airPlanOf), so a blade tip over a neighbour is not laid out and not counted */
    for (var an = o; an; an = an.parent) if (an.name === "rotor" || an.name === "rotordisc") return;
    n++;
    var t = T.at(v.x, v.z);
    if (t - v.y > 1.0) { deep++; worst = Math.max(worst, t - v.y); }
    var key = Math.round(v.x / 0.75) + "," + Math.round(v.z / 0.75), c = cells[key];
    if (!c) cells[key] = [v.y, v.y]; else { if (v.y < c[0]) c[0] = v.y; if (v.y > c[1]) c[1] = v.y; }
  });
  return { frac: deep / Math.max(1, n), worst: worst, cells: cells };
}
function overlapM2(a, b) {
  var n = 0;
  for (var k in a) { var q = b[k]; if (q && q[0] <= a[k][1] && a[k][0] <= q[1]) n++; }
  return n * 0.5625;
}
/* per-frame continuity of a drawn aircraft against the game's own motion.
   A frame in which the game itself set it down somewhere else - further
   than a jet flies in a frame - is counted, not measured: render3d draws
   that as the game has it */
function tracker(u) {
  var t = { u: u, last: null, lastG: null, lastYaw: null, lastGA: null, step: 0, yaw: 0, yawEx: 0, f: 0, moved: 0 };
  t.sample = function () {
    var r = recOf(u);
    if (!r) return;
    var p = r.grp.position, g = { x: u.x * PXM, z: u.y * PXM }, yaw = r.grp.rotation.y, ga = -u.ang;
    if (t.last && Math.hypot(g.x - t.lastG.x, g.z - t.lastG.z) > 60) t.moved++;
    else if (t.last) {
      var ex = Math.hypot(p.x - t.last.x, p.y - t.last.y, p.z - t.last.z) - Math.hypot(g.x - t.lastG.x, g.z - t.lastG.z);
      if (ex > t.step) t.step = ex;
      var dy = Math.abs(wrapA(yaw - t.lastYaw)), dg = Math.abs(wrapA(ga - t.lastGA));
      if (dy > t.yaw) t.yaw = dy;
      if (dy - dg > t.yawEx) t.yawEx = dy - dg;
    }
    t.last = { x: p.x, y: p.y, z: p.z }; t.lastG = g; t.lastYaw = yaw; t.lastGA = ga; t.f++;
  };
  return t;
}

/* ---- B's volume test: how far a parked aircraft is inside the base ----
   The base's solid parts as a height map in its own group's frame (world
   metres, y up): the highest drawn surface over every 5 cm cell, leaving out
   the slab and what is painted on it (anything under 0.15 m above the pad).
   A structure is taken as solid from the pad to its top, so a roof over a
   pad counts as inside - a revetment is open to the sky. */
var VOL = { CELL: 0.05, SKIP: 0.15, MARCH: 40, STOP: 1.0 };
function volInv(base) {
  var grp = recOf(base).grp;
  grp.updateMatrixWorld(true);
  return new THREE.Matrix4().copy(grp.matrixWorld).invert();
}
function volMapOf(base, padY) {
  var grp = recOf(base).grp, inv = volInv(base);
  var T = [], lo = [Infinity, Infinity], hi = [-Infinity, -Infinity];
  var a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), M = new THREE.Matrix4();
  grp.traverse(function (o) {
    if (!o.isMesh || !o.geometry || !o.geometry.attributes.position || !shown(o) || blur(o)) return;
    M.multiplyMatrices(inv, o.matrixWorld);
    var p = o.geometry.attributes.position, ix = o.geometry.index, n = ix ? ix.count : p.count;
    for (var t = 0; t + 2 < n; t += 3) {
      a.fromBufferAttribute(p, ix ? ix.getX(t) : t).applyMatrix4(M);
      b.fromBufferAttribute(p, ix ? ix.getX(t + 1) : t + 1).applyMatrix4(M);
      c.fromBufferAttribute(p, ix ? ix.getX(t + 2) : t + 2).applyMatrix4(M);
      if (Math.max(a.y, b.y, c.y) < padY + VOL.SKIP) continue;
      T.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
      lo[0] = Math.min(lo[0], a.x, b.x, c.x); lo[1] = Math.min(lo[1], a.z, b.z, c.z);
      hi[0] = Math.max(hi[0], a.x, b.x, c.x); hi[1] = Math.max(hi[1], a.z, b.z, c.z);
    }
  });
  var s = VOL.CELL, x0 = lo[0] - 1, z0 = lo[1] - 1, nx = Math.ceil((hi[0] - lo[0] + 2) / s) + 1, nz = Math.ceil((hi[1] - lo[1] + 2) / s) + 1;
  if (!T.length) { x0 = 0; z0 = 0; nx = 1; nz = 1; }
  var top = new Float32Array(nx * nz).fill(-Infinity);
  function put(x, z, y) {
    var i = Math.round((x - x0) / s), k = Math.round((z - z0) / s);
    if (i >= 0 && k >= 0 && i < nx && k < nz && y > top[i * nz + k]) top[i * nz + k] = y;
  }
  for (var q = 0; q < T.length; q += 9) {
    var ax = T[q], ay = T[q + 1], az = T[q + 2], bx = T[q + 3], by = T[q + 4], bz = T[q + 5], cx = T[q + 6], cy = T[q + 7], cz = T[q + 8];
    /* its edges, walked at a quarter cell: an upright face has no area in
       plan, and its top edge still bounds the cells it stands on */
    [[ax, ay, az, bx, by, bz], [bx, by, bz, cx, cy, cz], [cx, cy, cz, ax, ay, az]].forEach(function (e) {
      var L = Math.hypot(e[3] - e[0], e[5] - e[2]), m = Math.max(1, Math.ceil(L / (s / 4)));
      for (var j = 0; j <= m; j++) put(e[0] + (e[3] - e[0]) * j / m, e[2] + (e[5] - e[2]) * j / m, e[1] + (e[4] - e[1]) * j / m);
    });
    var d = (bz - cz) * (ax - cx) + (cx - bx) * (az - cz);
    if (Math.abs(d) < 1e-9) continue;
    var i0 = Math.ceil((Math.min(ax, bx, cx) - x0) / s), i1 = Math.floor((Math.max(ax, bx, cx) - x0) / s);
    var k0 = Math.ceil((Math.min(az, bz, cz) - z0) / s), k1 = Math.floor((Math.max(az, bz, cz) - z0) / s);
    for (var i = Math.max(0, i0); i <= Math.min(nx - 1, i1); i++) for (var k = Math.max(0, k0); k <= Math.min(nz - 1, k1); k++) {
      var x = x0 + i * s, z = z0 + k * s;
      var l1 = ((bz - cz) * (x - cx) + (cx - bx) * (z - cz)) / d, l2 = ((cz - az) * (x - cx) + (ax - cx) * (z - cz)) / d;
      if (l1 < -1e-6 || l2 < -1e-6 || l1 + l2 > 1 + 1e-6) continue;
      var y = l1 * ay + l2 * by + (1 - l1 - l2) * cy;
      if (y > top[i * nz + k]) top[i * nz + k] = y;
    }
  }
  /* the highest thing in every metre square, to pass over what is nowhere near */
  var cs = Math.round(1 / s), cnx = Math.ceil(nx / cs), cnz = Math.ceil(nz / cs), coarse = new Float32Array(cnx * cnz).fill(-Infinity);
  for (var i2 = 0; i2 < nx; i2++) for (var k2 = 0; k2 < nz; k2++) {
    var v = top[i2 * nz + k2], ci = ((i2 / cs) | 0) * cnz + ((k2 / cs) | 0);
    if (v > coarse[ci]) coarse[ci] = v;
  }
  return { x0: x0, z0: z0, nx: nx, nz: nz, s: s, top: top, cs: cs, cnx: cnx, cnz: cnz, coarse: coarse };
}
function volCell(S, i, k) { return i < 0 || k < 0 || i >= S.nx || k >= S.nz ? -Infinity : S.top[i * S.nz + k]; }
/* how far a point is inside: 0 if it is not under the top of what stands
   there; else the shortest way out - up through that top, or sideways along
   the plan's four axes to the nearest spot where what stands is no higher
   than the point (to +-half a cell). A wing skimming a wall's top is
   centimetres in, however far across it it reaches; a wing through the
   middle of a wall is as deep as half the wall is thick. */
function volDepth(S, x, y, z) {
  var i = Math.round((x - S.x0) / S.s), k = Math.round((z - S.z0) / S.s), h = volCell(S, i, k);
  if (!(h > y + 0.02)) return 0;
  var best = Math.min(VOL.MARCH, Math.ceil((h - y) / S.s + 0.5), Math.ceil(VOL.STOP / S.s + 0.5));
  var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (var w = 0; w < 4; w++) {
    for (var r = 1; r < best; r++) {
      if (!(volCell(S, i + dirs[w][0] * r, k + dirs[w][1] * r) > y + 0.02)) { best = r; break; }
    }
  }
  return Math.min((best - 0.5) * S.s, h - y);
}
/* the deepest any solid drawn part of a unit goes into the base: its
   triangles sampled every 5 cm, but only those near something that stands
   higher than they are low; a metre in is through it, and there it stops */
function volInside(u, S, inv) {
  var r = recOf(u), worst = { d: 0, x: 0, y: 0, z: 0 };
  var a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), M = new THREE.Matrix4();
  r.grp.updateMatrixWorld(true);
  r.grp.traverse(function (o) {
    if (worst.d >= VOL.STOP) return;
    if (!o.isMesh || !o.geometry || !o.geometry.attributes.position || !shown(o) || blur(o)) return;
    M.multiplyMatrices(inv, o.matrixWorld);
    var p = o.geometry.attributes.position, ix = o.geometry.index, cnt = ix ? ix.count : p.count;
    for (var t = 0; t + 2 < cnt && worst.d < VOL.STOP; t += 3) {
      a.fromBufferAttribute(p, ix ? ix.getX(t) : t).applyMatrix4(M);
      b.fromBufferAttribute(p, ix ? ix.getX(t + 1) : t + 1).applyMatrix4(M);
      c.fromBufferAttribute(p, ix ? ix.getX(t + 2) : t + 2).applyMatrix4(M);
      var ylo = Math.min(a.y, b.y, c.y), near = false;
      var ci0 = Math.floor((Math.min(a.x, b.x, c.x) - S.x0) / S.s / S.cs), ci1 = Math.floor((Math.max(a.x, b.x, c.x) - S.x0) / S.s / S.cs);
      var ck0 = Math.floor((Math.min(a.z, b.z, c.z) - S.z0) / S.s / S.cs), ck1 = Math.floor((Math.max(a.z, b.z, c.z) - S.z0) / S.s / S.cs);
      for (var ci = Math.max(0, ci0); ci <= Math.min(S.cnx - 1, ci1) && !near; ci++)
        for (var ck = Math.max(0, ck0); ck <= Math.min(S.cnz - 1, ck1); ck++) if (S.coarse[ci * S.cnz + ck] > ylo + 0.02) { near = true; break; }
      if (!near) continue;
      var e = Math.max(a.distanceTo(b), b.distanceTo(c), c.distanceTo(a)), m = Math.max(1, Math.ceil(e / S.s));
      for (var i = 0; i <= m && worst.d < VOL.STOP; i++) for (var j = 0; i + j <= m; j++) {
        var l1 = i / m, l2 = j / m, l3 = 1 - l1 - l2;
        var x = a.x * l1 + b.x * l2 + c.x * l3, y = a.y * l1 + b.y * l2 + c.y * l3, z = a.z * l1 + b.z * l2 + c.z * l3;
        var d = volDepth(S, x, y, z);
        if (d > worst.d) worst = { d: d, x: x, y: y, z: z };
      }
    }
  });
  return worst;
}
/* How far in a parked aircraft may reach and still count as clear: 0.15 m
   (world), under a pixel at the default zoom - a wingtip on a wall's face,
   a wing skimming its top. Measured with the model's first commit: the 305
   types a revetment holds reach 0.134 m at most (the tankers' wings over the
   tops of the inner walls; the Su-57 0.075, the F-86 0.041), the nearest of
   the rest 0.175 (the transport-EW stand-in's wingtips on a wall's face). */
var VOL_TOL = 0.15;
/* The types drawn too big for a revetment. The game draws an aircraft at
   about twice its real size and the airbase's walls are real ones, 22.8 m
   apart (25.1 m in the world; js/hero/airbase_revetments.js); each of these
   reaches into a wall below its top, on every pad, by more than VOL_TOL. By
   the model they are drawn with: */
var OVERSIZE = {};
[
  /* the A-10 model, 35.9 m of wing, and the twelve CAS types drawn with it */
  "bomber_n bomber_g deu_e50_cas deu_e60_cas deu_e80_cas gbr_e50_cas gbr_e60_cas gbr_e80_cas gbr_e00_cas fra_e50_cas fra_e60_cas fra_e80_cas fra_e00_cas",
  "nato_e80_cas nato_e00_cas",                                /* A-10, A-10C */
  "bomber_b bomber_f gbr_e90_cas fra_e90_cas",                /* the strike stand-in */
  /* the Su-25 left this list with its hero model (js/hero/pact_su25_frogfoot.js),
     which stands in a revetment clear of the walls */
  "nato_e50_cas pact_e50_cas kpa_e50_cas pla_e50_cas",        /* A-1 Skyraider, Il-10 */
  "roc_e50_cas roc_e80_cas roc_e50_fighter",                  /* F-84G, AT-3, F-86F */
  /* the E-3 model and the AEW types drawn with it; E-3, E-8C */
  "awacs_b awacs_f awacs_n nato_e00_awacs gbr_e60_awacs gbr_e90_awacs gbr_e00_awacs fra_e90_awacs fra_e00_awacs nato_e80_awacs nato_e90_awacs",
  /* the transport-EW stand-in (C-160G, Nimrod R.1, Airseeker), EA-6B */
  "ew_b ew_f gbr_e80_ewair fra_e60_ewair fra_e80_ewair fra_e90_ewair fra_e00_ewair nato_e60_ewair nato_e90_ewair",
  "cstealth_b",                                               /* F-35B */
  /* the B-52, D to H: the old model fitted only because it was drawn 56.2 m
     long for a 48.5 m aeroplane, and the game scales an aircraft by its
     length; drawn to its real proportions its 56.4 m wing reaches through
     the walls (js/hero/us_b52_stratofortress.js) */
  "nato_e50_heavybomber nato_e60_heavybomber nato_e80_heavybomber nato_e90_heavybomber nato_e00_heavybomber hbomber_n",
  /* H-6, Tu-160, B-2 */
  "sbomber_p pla_e60_heavybomber pla_e80_heavybomber pla_e00_heavybomber sbomber_c pact_e80_stealthbomber sbomber_n nato_e90_stealthbomber",
  "trans_k kpa_e50_transport kpa_e60_transport kpa_e80_transport kpa_e00_transport roc_e50_transport"   /* An-2, Po-2, C-46 */
].forEach(function (s) { s.split(" ").forEach(function (id) { OVERSIZE[id] = true; }); });

function run() {
  var P = Game.human, E = Game.players[1];
  AI.setPeace(E, true); Game.checkVictory = function () {};
  chk("the 3D renderer is up, and its records are reachable", Render === Render3D && !!H, "");
  if (!H) return;
  var g = flatSpot(), fac0 = P.faction, col0 = P.color;
  Render3D.setCam(g.x * TT, g.y * TT);
  var AIR = Object.keys(UNITS).filter(function (id) { return UNITS[id].layer === "air"; });
  var eraOf = function (id) { return UNITS[id].from || "e20"; };
  AIR.sort(function (a, b) { return eraOf(a) < eraOf(b) ? -1 : eraOf(a) > eraOf(b) ? 1 : 0; });

  /* ---- A. open ground ---- */
  var rowsA = [], kinds = { rotor: [], wing: [] }, gearUp = [];
  for (var b0 = 0, b1; want("A") && b0 < AIR.length; b0 = b1) {
    /* up to 25 at a time, of one period: a stand-in model takes its owner's */
    for (b1 = b0 + 1; b1 < AIR.length && b1 - b0 < 25 && eraOf(AIR[b1]) === eraOf(AIR[b0]); b1++);
    P.era = eraOf(AIR[b0]);
    var us = AIR.slice(b0, b1).map(function (id, k) {
      return Game.spawnUnitAt(P, id, (g.x - 8 + (k % 5) * 4) * TT + 16, (g.y - 8 + ((k / 5) | 0) * 4) * TT + 16);
    });
    park(us, null);
    frames(2);
    us.forEach(function (u) {
      var r = recOf(u), ground = H.heightAt(u.x, u.y), row = { id: u.def.id, gap: r ? lowest(r.grp).y - ground : NaN };
      rowsA.push(row); kinds[u.def.hover ? "rotor" : "wing"].push(row);
      /* what it stands on when that is not its gear: a model whose fin or
         pod reaches below its wheels (printed, for the modellers) */
      var gear = null, lg = Infinity;
      if (r) r.grp.traverse(function (o) { if (o.name === "gear") gear = o; });
      if (gear) { eachVert(gear, null, function (v) { if (v.y < lg) lg = v.y; }); if (lg - ground > 0.3) gearUp.push({ id: u.def.id, up: lg - ground }); }
    });
    drop(us);
  }
  P.era = "e20";
  var tA = tally(rowsA);
  if (want("A")) {
    log("  open ground: fixed-wing " + tally(kinds.wing).text + "\n  open ground: rotorcraft " + tally(kinds.rotor).text);
    gearUp.sort(function (a, b) { return b.up - a.up; });
    log("  standing on something lower than its gear (a model's fin, pod or tail below its wheels): " + gearUp.length +
        (gearUp.length ? ", the gear up to " + gearUp[0].up.toFixed(2) + " m (" + gearUp.slice(0, 6).map(function (o) { return o.id + " " + o.up.toFixed(2); }).join(", ") + ")" : ""));
    chk("A. every one of the " + AIR.length + " aircraft types, parked on open ground, has its lowest point on it",
        AIR.length > 300 && tA.bad === 0, tA.text);
  }

  /* ---- B. an airbase's pads: every architecture and every period ---- */
  var ARCHS = ["nato", "pact", "pla"], ERAS = ["e50", "e60", "e80", "e90", "e00", "e20"], rowsB = [], padH = {}, nb = 0;
  var open = { n: 0, miss: 0, worst: -Infinity, id: "" };
  for (var i0 = 0, v = 0; want("B") && i0 < AIR.length; v++) {
    var fac = ARCHS[v % 3], era = ERAS[((v / 3) | 0) % 6], c = CFG.FACTION_COLORS[fac];
    P.color = { main: c.main, dark: c.dark, light: c.light, fac: fac }; P.faction = fac; P.era = era;
    var base = Game.placeBuilding(P, "airbase", g.x - 1, g.y - 1, true);
    if (!base) { log("  (no airbase placed)"); break; }
    base.buildProgress = 1; nb++;
    /* four to a base; one base in six takes nine, the overflow grid */
    var take = v % 6 === 5 ? 9 : 4;
    var pl = AIR.slice(i0, i0 + take).map(function (id) { return Game.spawnUnitAt(P, id, base.x, base.y); });
    i0 += take;
    park(pl, base);
    frames(2);
    pl.forEach(function (u) {
      var m = onPad(u, base), key = ((u.x - base.x) * PXM).toFixed(1) + "," + ((u.y - base.y) * PXM).toFixed(1);
      m.id = u.def.id + "@" + fac + "/" + era; rowsB.push(m);
      if (m.pad !== undefined) padH[key] = (padH[key] || "") + (padH[key] && padH[key].indexOf(m.pad.toFixed(2)) >= 0 ? "" : " " + m.pad.toFixed(2));
      /* a revetment is open to the sky: straight down from 400 m over an
         aircraft in one, the first thing of the base is its pad - no roof,
         and none of the faction's or the period's rooftop kit, which
         render3d.js used to hang over one of them */
      var ox = Math.abs((u.x - base.x) * PXM), oz = (u.y - base.y) * PXM;
      if (Math.abs(ox - 18.6) < 0.2 && (Math.abs(oz + 14.9) < 0.2 || Math.abs(oz - 22.3) < 0.2) && m.pad !== undefined) {
        var r = recOf(u), br = recOf(base), p = r.grp.position;
        var top = firstHit(br.grp, _from.set(p.x, 400, p.z), _down.set(0, -1, 0));
        var over = top ? top.y - br.grp.position.y - m.pad : NaN;
        open.n++;
        if (over !== over) open.miss++;
        else if (over > open.worst) { open.worst = over; open.id = m.id; }
      }
    });
    drop(pl.concat([base]));
  }
  P.color = col0; P.faction = fac0; P.era = "e20";
  var tB = tally(rowsB);
  if (want("B")) {
    log("  pads: " + nb + " airbases (3 architectures x 6 periods), surface above the base by spot (m):");
    Object.keys(padH).forEach(function (k) { log("    (" + k + ")" + padH[k]); });
    chk("B. every aircraft type parked on an airbase's pad has its lowest point on the pad", rowsB.length >= AIR.length && tB.bad === 0, tB.text);
    chk("B. every revetment is open to the sky: straight down, the first thing of the base over its aircraft is its pad",
        open.n >= 4 && !open.miss && open.worst <= TOL,
        open.n + " parked in revetments" + (open.miss ? ", " + open.miss + " with nothing of the base under them" : "") +
        "; the most anything of the base stands over a pad: " + f2(open.worst) + " m (" + open.id + ")");
    /* ...and nothing of it inside the base. Four of every type on one base,
       one on each pad, the owner in the type's own period (a stand-in wears
       its period's kit): how far any solid drawn part of it is inside the
       walls, the tower or anything else standing on the slab (volInside).
       The drawn aircraft are twice their real size and overhang a real
       revetment's walls; they must not go through them.
       Each type gets an owner's colour of its own. render3d caches a model
       by its key, colour and period, not by the def, and scales it to the
       def that built it: a stand-in shared by types of different sizes is
       drawn at the size of whichever came first in that colour, so with one
       colour for all of them what was measured would depend on the order of
       the roster. */
    var volRows = [], volBad = [], volBig = [], volFit = [], volMaps = {}, nv = 0, vt0 = preciseTime();
    AIR.forEach(function (id, k) {
      var fac = ARCHS[k % 3], c = CFG.FACTION_COLORS[fac], own = "#4b" + ("0000" + (k + 1).toString(16)).slice(-4);
      P.color = { main: own, dark: c.dark, light: c.light, fac: fac }; P.faction = fac; P.era = eraOf(id);
      var vb = Game.placeBuilding(P, "airbase", g.x - 1, g.y - 1, true);
      if (!vb) return;
      vb.buildProgress = 1;
      var four = [0, 1, 2, 3].map(function () { return Game.spawnUnitAt(P, id, vb.x, vb.y); });
      park(four, vb);
      frames(2);
      var br = recOf(vb), inv = volInv(vb), padY = Infinity;
      four.forEach(function (u) { var m = onPad(u, vb); if (m.pad !== undefined && m.pad < padY) padY = m.pad; });
      /* the base's shape depends on its architecture and period, not on
         the colour it is painted: one map for each */
      var S = volMaps[fac + "|" + P.era] || (volMaps[fac + "|" + P.era] = volMapOf(vb, padY));
      var row = { id: id, d: 0 };
      four.forEach(function (u) { var w = volInside(u, S, inv); if (w.d > row.d) row.d = w.d; nv++; });
      volRows.push(row);
      if (OVERSIZE[id]) (row.d > VOL_TOL ? volBig : volFit).push(row);
      else if (row.d > VOL_TOL) volBad.push(row);
      drop(four.concat([vb]));
    });
    P.color = col0; P.faction = fac0; P.era = "e20";
    volBad.sort(function (a, b) { return b.d - a.d; });
    var held = volRows.filter(function (r) { return !OVERSIZE[r.id]; });
    var worstHeld = held.reduce(function (w, r) { return r.d > w.d ? r : w; }, { d: 0, id: "-" });
    chk("B. nothing of a parked aircraft is inside the base: four of each type, one on each pad, and none of the " + held.length +
        " a revetment holds more than " + (VOL_TOL * 100) + " cm into a wall, the tower or anything else of it",
        volRows.length >= AIR.length && held.length > 250 && !volBad.length,
        nv + " parked; " + volBad.length + " further in" +
        (volBad.length ? " (" + volBad.slice(0, 8).map(function (r) { return r.id + " " + r.d.toFixed(2) + (r.d >= VOL.STOP ? "+" : ""); }).join(", ") + (volBad.length > 8 ? ", ..." : "") + ")" : "") +
        "; the most " + worstHeld.d.toFixed(3) + " m (" + worstHeld.id + ")");
    volBig.sort(function (a, b) { return b.d - a.d; });
    log("  drawn too big for a revetment (OVERSIZE): " + volBig.length + " reach into it, " +
        volBig.filter(function (r) { return r.d >= VOL.STOP; }).length + " of them a metre or more (through a wall)" +
        (volFit.length ? "; " + volFit.length + " listed now fit, take them off the list: " + volFit.map(function (r) { return r.id + " " + r.d.toFixed(2); }).join(", ") : "") +
        "; " + ((preciseTime() - vt0)).toFixed(0) + " s");
  }

  /* ---- C. every deck in the game, everything it takes, four headings ---- */
  var s0 = seaSpot(8);
  Render3D.setCam(s0.x * TT, s0.y * TT);
  var HOSTS = Object.keys(UNITS).filter(function (id) { var d = UNITS[id]; return d.layer === "sea" && ((d.carrier || 0) || (d.helo || 0)); });
  var HEADS = [0, 1.9, 3.6, 5.1], rowsC = [], typesC = 0, inCar = [], inEsc = [], ovl = [], shared = 0, ovlN = 0;
  HOSTS.forEach(function (hid, hi) {
    if (!want("C")) return;
    var d = UNITS[hid];
    P.faction = d.fac || "nato"; P.era = d.from || "e20";
    var ship = Game.spawnUnitAt(P, hid, s0.x * TT + 16, s0.y * TT + 16);
    ship.ang = HEADS[hi % 4]; ship.moving = false;
    var n = ship.deckSlots(), types = Game.deckTypesFor(ship);
    typesC += types.length;
    frames(1);
    var T = topOf(recOf(ship).grp);
    for (var t0 = 0; t0 < types.length; t0 += n) {
      var air = types.slice(t0, t0 + n).map(function (id) { return Game.spawnUnitAt(P, id, ship.x, ship.y); });
      park(air, ship);
      frames(2);
      air.forEach(function (u) {
        var m = onDeck(u, ship); m.id = u.def.id + "@" + hid; rowsC.push(m);
        var ins = inside(u, ship, T);
        (d.carrier ? inCar : inEsc).push({ id: m.id, frac: ins.frac, worst: ins.worst });
      });
      drop(air);
    }
    /* the complement the game sails her with: clear of each other, or - an
       escort's second helicopter, a carrier's machine that cannot be placed
       cleanly - waiting in her hangar, drawn on the same spot as one of its
       own kind */
    Game.embarkComplement(ship);
    var wing = ship.wing();
    wing.forEach(function (u) { u.stance = "hold"; });
    frames(2);
    var cells = wing.map(function (u) { return inside(u, ship, T).cells; }), at = wing.map(function (u) { return onDeck(u, ship); });
    for (var a = 0; a < wing.length; a++) for (var b = a + 1; b < wing.length; b++) {
      if (Math.hypot(at[a].lx - at[b].lx, at[a].lz - at[b].lz) < 0.01 && Math.abs(wrapA(at[a].yaw - at[b].yaw)) < 0.01) { shared++; continue; }
      var m2 = overlapM2(cells[a], cells[b]); ovlN++;
      if (m2 > 0) ovl.push({ id: wing[a].def.id + "/" + wing[b].def.id + "@" + hid, m2: m2 });
    }
    drop(wing.concat([ship]));
  });
  P.faction = fac0; P.era = "e20";
  if (want("C")) {
    var tC = tally(rowsC);
    chk("C. on all " + HOSTS.length + " decks, every type each takes (" + typesC + "), at four headings: its lowest point on her deck, in her own frame",
        HOSTS.length >= 30 && tC.bad === 0, tC.text);
    var worstIn = function (L) { return L.reduce(function (w, r) { return r.frac > w.frac ? r : w; }, { frac: 0, worst: 0, id: "-" }); };
    var carBad = inCar.filter(function (r) { return r.frac > 0.01; }), wc = worstIn(inCar), we = worstIn(inEsc);
    chk("C. on a carrier nothing of it is inside her: no type with more than 1% of it over 1 m into her island, hangar or deck park",
        inCar.length > 50 && carBad.length === 0,
        inCar.length + " parked; " + carBad.length + " over; the most " + (wc.frac * 100).toFixed(1) + "% (" + wc.id + ", " + wc.worst.toFixed(2) + " m)");
    log("  an escort's helicopter, drawn longer than her pad, meets her hangar or deckhouse: the most " + (we.frac * 100).toFixed(1) +
        "% of it over 1 m inside her (" + we.id + ", " + we.worst.toFixed(2) + " m)");
    ovl.sort(function (a, b) { return b.m2 - a.m2; });
    chk("C. the complement each ship sails with stands clear of itself: no two machines on separate spots share more than 3 m2",
        ovlN > 20 && (!ovl.length || ovl[0].m2 <= 3),
        ovlN + " pairs on separate spots, " + ovl.length + " touching" + (ovl.length ? ", the most " + ovl[0].m2.toFixed(1) + " m2 (" + ovl[0].id + ")" : "") +
        "; " + shared + " pairs sharing a spot (the second in her hangar)");
  }

  /* ---- D. riding with her: steaming, turning, rolling, listing ---- */
  var s1 = seaSpot(14) || s0;
  P.faction = "nato"; P.era = "e20";
  var dd = Game.spawnUnitAt(P, "destroyer_n", (s1.x - 6) * TT, s1.y * TT);
  var cv = Game.spawnUnitAt(P, "carrier_n", (s1.x + 4) * TT, (s1.y + 4) * TT);
  [dd, cv].forEach(function (s) {
    Game.embarkComplement(s);
    s.wing().forEach(function (u) { u.stance = "hold"; });
  });
  Render3D.setCam(s1.x * TT, s1.y * TT);
  frames(3, true);
  if (want("D")) {
    var riders = dd.wing().concat(cv.wing()), host = function (u) { return u.padOn; };
    var spot0 = riders.map(function (u) { var m = onDeck(u, host(u)); return { lx: m.lx, lz: m.lz, yaw: m.yaw }; });
    var ang0 = [dd.ang, cv.ang];
    dd.give({ type: "move", x: dd.x + 8 * TT, y: dd.y - 9 * TT });
    cv.give({ type: "move", x: cv.x - 9 * TT, y: cv.y + 7 * TT });
    var worstRide = 0, drift = 0, turn = 0, samples = 0;
    for (var f = 0; f < 300; f++) {
      frames(1, true);
      if (f % 10) continue;
      riders.forEach(function (u, k) {
        if (!u.parked) return;
        var m = onDeck(u, host(u));
        samples++;
        worstRide = Math.max(worstRide, m.gap === m.gap ? Math.abs(m.gap) : 99);
        drift = Math.max(drift, Math.hypot(m.lx - spot0[k].lx, m.lz - spot0[k].lz));
        turn = Math.max(turn, Math.abs(wrapA(m.yaw - spot0[k].yaw)));
      });
    }
    var turned = Math.min(Math.abs(U.angDiff(dd.ang, ang0[0])), Math.abs(U.angDiff(cv.ang, ang0[1])));
    chk("D. " + riders.length + " aircraft ride their decks while the ships steam and turn, heading and all",
        riders.length >= 6 && samples >= riders.length * 25 && worstRide <= TOL && drift < 0.01 && turn < 0.002 && turned > 0.3,
        samples + " samples, worst gap " + worstRide.toFixed(3) + " m, spot moved " + drift.toFixed(3) + " m and turned " + deg(turn) +
        " deg in her frame; the ships turned " + deg(turned) + "+ deg");
    /* a hole lists her (js/damage3d.js), and what is on her deck goes with it */
    cv.hp = cv.maxHp * 0.15; dd.hp = dd.maxHp * 0.15;
    Render3D.setCam(cv.x, cv.y);
    frames(150, true);
    var listed = 0, worstList = 0;
    frames(1, true);
    [dd, cv].forEach(function (s) { var a = Damage3D.anchors(s.id); if (a) listed = Math.max(listed, Math.abs(a.list || 0)); });
    riders.forEach(function (u) { var m = onDeck(u, host(u)); worstList = Math.max(worstList, m.gap === m.gap ? Math.abs(m.gap) : 99); });
    chk("D. and when a hole lists them, the aircraft list with the deck", listed > 0.05 && worstList <= 0.05,
        "list " + deg(listed) + " deg, worst gap " + worstList.toFixed(3) + " m (a list is read a frame late: 0.03 rad/s)");
    cv.hp = cv.maxHp; dd.hp = dd.maxHp;
    dd.give({ type: "idle" }); cv.give({ type: "idle" });
    frames(30, true);
  }

  /* ---- E. off the deck and back, without a jump ---- */
  var AIR_ALT = H.AIR_ALT;
  if (want("E")) {
    /* a helicopter lifts off a destroyer heading four ways and flies off on
       four bearings - the heading blend once flipped by up to 151 degrees in
       a frame when the gap between the ship's heading and its own passed 180 */
    var sE = seaSpot(16, 3) || s1, worstE = { step: 0, yaw: 0, yawEx: 0 }, firstUp = null, nE = 0;
    Render3D.setCam(sE.x * TT, sE.y * TT);
    for (var hs = 0; hs < 4; hs++) for (var bt = 0; bt < 4; bt++) {
      var d2 = Game.spawnUnitAt(P, "destroyer_n", sE.x * TT, sE.y * TT);
      d2.ang = hs * Math.PI / 2 + 0.3; d2.moving = false;
      Game.embarkComplement(d2);
      var hl = d2.wing(); hl.forEach(function (u) { u.stance = "hold"; });
      frames(4, true);
      var h0 = hl[0], rest0 = recOf(h0).grp.position.y, an = bt * Math.PI / 2 + 0.9, tr = tracker(h0);
      tr.sample();
      h0.stance = "fire";
      h0.give({ type: "move", x: h0.x + Math.cos(an) * 12 * TT, y: h0.y + Math.sin(an) * 12 * TT });
      for (var fE = 0; fE < 60; fE++) { frames(1, true); if (fE === 0 && firstUp === null) firstUp = recOf(h0).grp.position.y - rest0; tr.sample(); }
      nE++;
      worstE.step = Math.max(worstE.step, tr.step); worstE.yaw = Math.max(worstE.yaw, tr.yaw); worstE.yawEx = Math.max(worstE.yawEx, tr.yawEx);
      drop(hl.concat([d2]));
    }
    chk("E. a helicopter lifts off a destroyer, whichever way she heads and it flies off, without a jump in place or heading",
        nE === 16 && firstUp !== null && firstUp >= 0 && firstUp <= 26 * DT + 0.01 && worstE.step < 2.5 && worstE.yawEx < 0.14,
        nE + " take-offs: first frame " + f2(firstUp) + " m off the deck; the most any frame moved it beyond the game's own step " +
        worstE.step.toFixed(2) + " m; the most it turned in a frame " + deg(worstE.yaw) + " deg, " + deg(worstE.yawEx) + " deg beyond the game's own turn");
    /* in flight it is where the game has it */
    var helo = dd.wing()[0], hr = recOf(helo);
    helo.stance = "fire";
    helo.give({ type: "move", x: helo.x + 14 * TT, y: helo.y + 3 * TT });
    frames(150, true);
    hr = recOf(helo);
    chk("E. in flight it is where the game has it, level, at the cruise altitude",
        Math.abs(hr.grp.position.y - Math.max(H.heightAt(helo.x, helo.y) + 6, AIR_ALT)) < 0.001 &&
        Math.abs(hr.grp.position.x - helo.x * PXM) < 0.001 && Math.abs(hr.grp.position.z - helo.y * PXM) < 0.001 &&
        hr.grp.rotation.x === 0 && hr.grp.rotation.z === 0 && Math.abs(wrapA(hr.grp.rotation.y + helo.ang)) < 1e-6,
        "y " + hr.grp.position.y.toFixed(2) + " m (cruise " + AIR_ALT + "), roll " + hr.grp.rotation.z + ", pitch " + hr.grp.rotation.x);
    /* back to its destroyer while she steams and turns, and a jet to its carrier */
    dd.give({ type: "move", x: dd.x - 10 * TT, y: dd.y + 12 * TT });
    cv.give({ type: "move", x: cv.x + 12 * TT, y: cv.y + 10 * TT });
    var jet = cv.wing().filter(function (u) { return !u.def.hover; })[0];
    jet.stance = "fire"; jet.give({ type: "move", x: jet.x + 30 * TT, y: jet.y - 10 * TT });
    frames(60, true);
    helo.give({ type: "rtb" }); jet.give({ type: "rtb" });
    var th = tracker(helo), tj = tracker(jet), landed = { h: -1, j: -1 };
    for (var f3 = 0; f3 < 1500 && (landed.h < 0 || landed.j < 0); f3++) {
      frames(1, true);
      th.sample(); tj.sample();
      if (landed.h < 0 && helo.order.type === "parked" && Math.abs(onDeck(helo, dd).gap) <= TOL) landed.h = f3;
      if (landed.j < 0 && jet.order.type === "parked" && Math.abs(onDeck(jet, cv).gap) <= TOL) landed.j = f3;
    }
    chk("E. and they come back down onto their decks under way, easing onto their spots, without a jump in heading",
        landed.h > 0 && landed.j > 0 && th.yawEx < 0.14 && tj.yawEx < 0.14,
        "on deck after " + (landed.h / 30).toFixed(1) + " s and " + (landed.j / 30).toFixed(1) + " s; the most either turned in a frame beyond the game's own turn " +
        deg(Math.max(th.yawEx, tj.yawEx)) + " deg (the game snaps an aircraft onto its pad from its approach, a jump of its own, so the step is printed, not held: " +
        Math.max(th.step, tj.step).toFixed(1) + " m)");
    /* a jet goes off a carrier with the game, not straight up and then after it */
    var tj2 = tracker(jet), lag = 0;
    cv.give({ type: "idle" }); frames(30, true);
    tj2.sample();
    jet.give({ type: "move", x: jet.x + 30 * TT, y: jet.y - 10 * TT });
    for (var f4 = 0; f4 < 45; f4++) {
      frames(1, true); tj2.sample();
      var rj = recOf(jet).grp.position;
      if (f4 > 0 && f4 < 20) lag = Math.max(lag, Math.hypot(rj.x - jet.x * PXM, rj.z - jet.y * PXM));
    }
    chk("E. a jet leaves a carrier's deck at the game's speed, its spot's offset dying away as it climbs",
        tj2.step < 2.5, "the most any frame moved it beyond the game's own step " + tj2.step.toFixed(2) + " m; its greatest distance from the game's position " + lag.toFixed(1) + " m");
  }

  /* ---- F. a new home while it stands on a deck; a ship sunk under it ---- */
  if (want("F")) {
    var sF = seaSpot(16, 6) || s1;
    Render3D.setCam(sF.x * TT, sF.y * TT);
    var A = Game.spawnUnitAt(P, "destroyer_n", sF.x * TT, sF.y * TT);
    var Bf = Game.spawnUnitAt(P, "destroyer_n", (sF.x + 14) * TT, (sF.y + 3) * TT);
    var Cn = Game.spawnUnitAt(P, "destroyer_n", sF.x * TT + 30, sF.y * TT + 10);   // alongside: inside the capture ring
    A.ang = 0.3; Bf.ang = 2.5; Cn.ang = 1.2;
    Game.embarkComplement(A); A.wing().forEach(function (u) { u.stance = "hold"; });
    frames(8, true);
    var hA = A.wing()[0], tF = tracker(hA);
    tF.sample();
    /* the hangar panel's "transfer": based on B now, while it sits on A */
    hA.padOn = Bf; hA.parked = false; hA.order = { type: "rtb" };
    for (var f5 = 0; f5 < 40; f5++) { frames(1, true); tF.sample(); }
    var hB = A.wing()[0], tG = tracker(hB);
    tG.sample();
    /* ...and to a destroyer alongside, close enough that the game sets it
       straight down on her: it lifts off one deck and comes down on the other */
    hB.padOn = Cn; hB.parked = false; hB.order = { type: "rtb" };
    var onC = -1;
    for (var f6 = 0; f6 < 300 && onC < 0; f6++) { frames(1, true); tG.sample(); if (hB.parked && Math.abs(onDeck(hB, Cn).gap) <= TOL && recOf(hB).grp.position.y < 20) onC = f6; }
    chk("F. moved to another ship's deck while it stands on one, it leaves from where it is drawn: no jump",
        tF.step < 2.5 && tG.step < 2.5 && onC > 0,
        "to a destroyer 290 m off: the most a frame moved it beyond the game's own step " + tF.step.toFixed(2) + " m; to one alongside (the game sets it on her at once): " +
        tG.step.toFixed(2) + " m, on her deck after " + (onC / 30).toFixed(1) + " s");
    /* a carrier jet moved to an airbase ashore */
    var ab0 = Game.placeBuilding(P, "airbase", g.x - 1, g.y - 1, true); ab0.buildProgress = 1;
    var jc = cv.wing().filter(function (u) { return !u.def.hover && u.parked; })[0], tJ = tracker(jc);
    frames(2, true); tJ.sample();
    jc.padOn = ab0; jc.parked = false; jc.order = { type: "rtb" };
    for (var f7 = 0; f7 < 40; f7++) { frames(1, true); tJ.sample(); }
    /* no other ramp free: sunk, they fly off it (with one, the game re-homes
       a parked machine and sets it down there at once, and so is it drawn) */
    drop([ab0]);
    /* the carrier sunk with her aircraft aboard */
    Render3D.setCam(cv.x, cv.y); frames(20, true);
    var aboard = cv.wing().filter(function (u) { return u.parked; });
    var ts = aboard.map(function (u) { var t = tracker(u); t.sample(); return t; });
    Combat.applyDamage(Game, cv, 1e8, WEAPONS.gun_120, null);
    for (var f8 = 0; f8 < 40; f8++) { frames(1, true); ts.forEach(function (t) { t.sample(); }); }
    var sunk = ts.reduce(function (w, t) { return Math.max(w, t.step); }, 0), rehomed = ts.filter(function (t) { return t.moved; }).length;
    chk("F. a jet moved ashore, and the aircraft on a carrier sunk under them, lift off from where they are drawn",
        tJ.step < 2.5 && aboard.length >= 2 && sunk < 2.5,
        "moved ashore: " + tJ.step.toFixed(2) + " m beyond the game's step at most; " + aboard.length + " aboard the carrier: " + sunk.toFixed(2) + " m" +
        (rehomed ? " (" + rehomed + " the game set down on another ramp at once)" : ""));
    drop([A, Bf, Cn].concat(A.wing(), Bf.wing(), Cn.wing()));
  }

  /* ---- G. an enemy deck machine in and out of the fog ---- */
  if (want("G")) {
    E.faction = "pact"; E.era = "e20";
    var sG = seaSpot(16, 9) || s1;
    var ec = Game.spawnUnitAt(E, "carrier_p", sG.x * TT, sG.y * TT); ec.ang = 0.7;
    Game.embarkComplement(ec); ec.wing().forEach(function (u) { u.stance = "hold"; });
    Game.fogEnabled = false; frames(3, true);
    var eh = ec.wing().filter(function (u) { return u.tx !== ec.tx || u.ty !== ec.ty; })[0];
    Render3D.setCam(ec.x, ec.y);
    Game.fogEnabled = true;
    var W = Game.map.W, st = ec.ty * W + ec.tx, ht = eh ? eh.ty * W + eh.tx : st;
    for (var i = 0; i < Game.fog.length; i++) Game.fog[i] = 2;
    frames(3);
    var last = recOf(eh).grp.position.clone(), jump = 0, seenF = 0;
    [1, 1, 2, 1, 2, 2, 1].forEach(function (s) {
      Game.fog[st] = s; Game.fog[ht] = 2;
      frames(1);
      var r = recOf(eh); if (!r) return;
      seenF++; jump = Math.max(jump, r.grp.position.distanceTo(last)); last.copy(r.grp.position);
    });
    chk("G. an enemy deck machine in sight stays on its spot while its ship goes in and out of the fog",
        !!eh && st !== ht && seenF === 7 && jump < 0.05, "it moved " + jump.toFixed(3) + " m at most in a frame");
    for (var i2 = 0; i2 < Game.fog.length; i2++) Game.fog[i2] = 2;
    Game.fogEnabled = false;
    drop(ec.wing().concat([ec]));
  }

  /* ---- the mouse picks a parked machine where it is drawn; its ring stands over it ---- */
  /* calibrate the screen from a tank, which entityScreen projects at the
     ground under it, then test the parked machines at their feet */
  var cv2 = cv.dead ? Game.spawnUnitAt(P, "carrier_n", (s1.x + 4) * TT, (s1.y + 4) * TT) : cv;
  if (cv2 !== cv) { Game.embarkComplement(cv2); cv2.wing().forEach(function (u) { u.stance = "hold"; }); }
  Render3D.setCam(cv2.x, cv2.y); frames(3, true);
  var cam = R3().camera, tank = Game.spawnUnitAt(P, "mbt_n", g.x * TT, g.y * TT);
  frames(1);
  var tsn = Render3D.entityScreen(tank), tn = new THREE.Vector3(tank.x * PXM, H.heightAt(tank.x, tank.y), tank.y * PXM).project(cam);
  var Wd = 2 * tsn.x / (tn.x + 1), Hd = 2 * tsn.y / (1 - tn.y);
  function scr(x, y, z) { var w = new THREE.Vector3(x, y, z).project(cam); return { x: (w.x + 1) / 2 * Wd, y: (1 - w.y) / 2 * Hd }; }
  var worstPick = 0, picked = 0, worstRing = 0, rings = 0, offGame = 0;
  dd.wing().concat(cv2.wing()).forEach(function (u) {
    if (!u.parked || !recOf(u)) return;
    var r = recOf(u), s = Render3D.entityScreen(u), lo = lowest(r.grp).y, w = scr(r.grp.position.x, lo, r.grp.position.z);
    worstPick = Math.max(worstPick, Math.hypot(s.x - w.x, s.y - w.y));
    picked++;
    /* its selection ring, drawn by the overlay: over the model, as high as ever */
    u.selected = true; RINGS.length = 0; Render.draw(DT, UI.input); u.selected = false;
    var want2 = scr(r.grp.position.x, AIR_ALT + 4, r.grp.position.z), game = scr(u.x * PXM, AIR_ALT + 4, u.y * PXM), best = Infinity;
    RINGS.forEach(function (e) { best = Math.min(best, Math.hypot(e.x - want2.x, e.y - e.r * 0.4 / 1.15 - want2.y)); });
    worstRing = Math.max(worstRing, best); rings++;
    offGame = Math.max(offGame, Math.hypot(want2.x - game.x, want2.y - game.y));
  });
  drop([tank]);
  chk("the mouse picks a parked machine at its feet where it is drawn, on the deck", picked >= 5 && worstPick < 1.5,
      picked + " picked, worst " + worstPick.toFixed(2) + " px from its drawn feet");
  chk("its selection ring stands over its model, at the height it always has", rings >= 5 && worstRing < 1.5,
      rings + " rings, worst " + worstRing.toFixed(2) + " px from over the model (the game's slot for it is up to " + offGame.toFixed(0) + " px away)");

  /* ---- the damage module's fire is on it, and the wreck starts from it ---- */
  var ch = cv2.wing().filter(function (u) { return u.parked && u.def.hover; })[0] || cv2.wing()[0];
  Render3D.setCam(cv2.x, cv2.y);
  ch.hp = ch.maxHp * 0.4;
  frames(30, true);
  var an2 = Damage3D.anchors(ch.id), cr = recOf(ch), box = new THREE.Box3().setFromObject(cr.grp).expandByScalar(1.0), inb = 0, na = 0;
  if (an2) an2.srcs.forEach(function (sp) { na++; if (box.containsPoint(_v.set(sp.x, sp.y, sp.z))) inb++; });
  chk("the damage module's smoke comes out of the machine on the deck, where it is drawn", na > 0 && inb === na,
      inb + " of " + na + " sources inside its drawn model");
  var cg = cr.grp, at0 = cg.position.clone();
  Combat.applyDamage(Game, ch, 1e7, WEAPONS.gun_120, null);
  frames(1, true);
  var kept = cg.parent === R3().scene, moved = cg.position.distanceTo(at0);
  frames(60, true);
  chk("killed on the deck, its wreck starts where it was drawn, and is gone over the side",
      kept && moved < 0.3 && cg.parent !== R3().scene, "kept " + kept + ", moved " + moved.toFixed(2) + " m in the first frame");

  /* ---- a steady frame casts no ray, and what the frame costs ---- */
  /* nothing else in the air to come aboard a deck in the middle of it */
  drop(P.units.filter(function (u) { return u.layer === "air" && !u.dead && ((u.padOn !== dd && u.padOn !== cv2) || !u.order || u.order.type !== "parked"); }));
  var ab = Game.placeBuilding(P, "airbase", g.x - 1, g.y - 1, true);
  ab.buildProgress = 1;
  var onAb = ["fighter_n", "trans_n", "asw_helo_n", "awacs_n"].map(function (id) { return Game.spawnUnitAt(P, id, ab.x, ab.y); });
  park(onAb, ab);
  cv2.give({ type: "move", x: cv2.x + 10 * TT, y: cv2.y - 6 * TT });
  frames(10, true);
  RAYS = 0;
  frames(150, true);
  chk("a frame casts no ray once every model and spot is measured", RAYS === 0,
      RAYS + " rays over 150 frames with " + (dd.wing().length + cv2.wing().length) + " machines on decks under way and " + onAb.length + " on a pad");
  var tsum = 0;
  for (var f9 = 0; f9 < 90; f9++) { var t1 = preciseTime(); Render.draw(DT, UI.input); tsum += preciseTime() - t1; }
  log("  a whole Render3D.draw with them, stubbed GL: " + (tsum / 90 * 1000).toFixed(2) + " ms mean over 90 frames");
}
