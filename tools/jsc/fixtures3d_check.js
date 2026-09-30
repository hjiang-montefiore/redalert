/* tools/jsc/fixtures3d_check.js - the rooftop kit render3d dresses every
   structure with stands on the model, and the owner's colour survives the
   army's and the period's restyling. Checked on the REAL renderer under
   JavaScriptCore.

     python3 tools/jsc/scene3d.py tools/jsc/fixtures3d_check.js
     python3 tools/jsc/scene3d.py tools/jsc/fixtures3d_check.js -- table

   Every structure render3d draws gets a faction kit (a NATO radome and
   aerial mast, a Pact brick stack and banner board, PLA eave slabs and
   masts) and a period kit (a 1950s chimney and whip, a 1960s lattice mast,
   a 1980s camouflage net, a 1990s dish, a present-day array face and
   radome). Every one of the 43 BLD_MODELS keys is built here for all eight
   armies in all six periods (2,064 templates), in a real match: placed,
   drawn, and its cached template measured. A kit piece is a set of meshes
   of one kit group that touch; in a piece a mesh overlapping a lower one
   hangs on it (a yagi on its mast, a dish on its pedestal, the net on its
   poles) and every other mesh is a FOOT. Under each foot - the hull of its
   lowest vertices, sampled at six points an edge - a ray finds the highest
   opaque surface (the model's, or another piece's) no more than 3 m above
   the foot, over a 0.15 m cross, so a foot bridges a crack narrower than
   0.3 m (two containers side by side) and an edge it overhangs by less
   than 0.15 m. The gap is the foot's lowest point less that surface.

   Held: no gap over 5 cm; no piece past the model's own plan; no foot over
   air; the kit never costs more meshes (a draw and a shadow draw each) than
   the pieces it was drawn with; a `bare` structure has none; the owner's
   colour is exactly the owner's after restyle() and eraRestyle(); and the
   damage module's roof fires, lit on a burning building, sit on the model
   or on a piece that itself stands on the model.

   Measured at 3556b96, before the kit placer (render3d.js as at b8f6a68):
   the faction's kit stood at the template's bounding-box top and the
   period's at its tallest broad part, and the worst gaps were 30.2 m on the
   construction yard, 27.7 m on the radar, 27.3 m on the lab, 27.0 m on the
   airbase, 23.0 m on the naval yard, 22.5 m on the silo, 21.8 m on the
   power plant, 20.9 m on the factory, 18.9 m on the refinery; pieces
   reached up to 8.9 m past the plots of the town blocks and the field
   works, with 37,321 foot samples over bare air; 113 of 139 roof fires sat
   on floating kit or on the net, up to 13.3 m over the surface under them;
   and restyle() and eraRestyle() repainted 454 of 3,882 team-coloured
   parts, every one of them Germany's. 4 of these 6 checks failed; with
   the placer the largest gap is under a millimetre. */
var TT = 32, PASS = 0, FAIL = 0, DT = 1 / 30, PXM = 0.625, H = null;
var ARGS = (typeof __ARGS !== "undefined") ? __ARGS : [];
var TABLE = ARGS.indexOf("table") >= 0;
var GAP = 0.05, HANG = 0.02;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }

/* render3d hands Impact3D its record lookup (entity id -> the group it is
   drawn as, and the cached template it was cloned from); borrowed here as
   parked3d_check.js and ghost3d_check.js borrow it */
(function () {
  if (typeof Impact3D === "undefined") return;
  var ii = Impact3D.init;
  Impact3D.init = function (T3, th, G, h) { H = h; return ii.apply(this, arguments); };
})();

window.addEventListener("load", function () {
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v; };
  set("opt-map", "hormuz"); set("opt-era", "e20"); set("opt-aera", "e20");
  set("opt-cash", "200000"); set("opt-seed", "btest"); set("opt-fog", "0"); set("opt-3d", "1");
  CFG.GFX_LEVEL = "high";
  window.IRONFRONT_SYNC_START = true;
  document.getElementById("btn-start").click();
  setTimeout(function () {
    try { run(); } catch (e) { log("HARNESS CRASH " + e + "\n" + e.stack); FAIL++; }
    log("\n==== " + PASS + " passed, " + FAIL + " failed ====");
  }, 50);
});

/* ------------------------------------------------------------ geometry */
var _v = new THREE.Vector3();
var TURNS = { turret: 1, mountwrap: 1, rotor: 1, rotordisc: 1, tailrotor: 1 };
function opaque(o) {
  var list = Array.isArray(o.material) ? o.material : [o.material];
  for (var i = 0; i < list.length; i++) { var m = list[i]; if (m && m.visible !== false && !(m.transparent && m.opacity < 0.99)) return true; }
  return false;
}
/* the triangles of the opaque, visible, still meshes under the roots, in
   the frame of `top` (world matrices are updated from it) */
function tris(roots, top) {
  var V = [];
  roots.forEach(function (root) {
    (function walk(o, off) {
      if (o.visible === false) return;
      if (TURNS[o.name]) off = true;
      if (!off && o.isMesh && o.geometry && o.geometry.attributes.position && opaque(o)) {
        var e = o.matrixWorld.elements, p = o.geometry.attributes.position, ix = o.geometry.index, n = ix ? ix.count : p.count;
        for (var q = 0; q + 2 < n; q += 3) for (var k = 0; k < 3; k++) {
          var vi = ix ? ix.getX(q + k) : q + k, x = p.getX(vi), y = p.getY(vi), z = p.getZ(vi);
          V.push(e[0] * x + e[4] * y + e[8] * z + e[12], e[1] * x + e[5] * y + e[9] * z + e[13], e[2] * x + e[6] * y + e[10] * z + e[14]);
        }
      }
      for (var i = 0; i < o.children.length; i++) walk(o.children[i], off);
    })(root, false);
  });
  return V;
}
function grid(V, tag) {
  var cs = 0.5, x0 = Infinity, z0 = Infinity, x1 = -Infinity, z1 = -Infinity, n = V.length / 9;
  for (var i = 0; i < V.length; i += 3) { if (V[i] < x0) x0 = V[i]; if (V[i] > x1) x1 = V[i]; if (V[i + 2] < z0) z0 = V[i + 2]; if (V[i + 2] > z1) z1 = V[i + 2]; }
  var nx = Math.max(1, Math.ceil((x1 - x0) / cs) + 1), nz = Math.max(1, Math.ceil((z1 - z0) / cs) + 1), cells = new Array(nx * nz);
  for (var t = 0; t < n; t++) {
    var o = t * 9;
    var i0 = Math.floor((Math.min(V[o], V[o + 3], V[o + 6]) - x0) / cs), i1 = Math.floor((Math.max(V[o], V[o + 3], V[o + 6]) - x0) / cs);
    var j0 = Math.floor((Math.min(V[o + 2], V[o + 5], V[o + 8]) - z0) / cs), j1 = Math.floor((Math.max(V[o + 2], V[o + 5], V[o + 8]) - z0) / cs);
    for (var j = j0; j <= j1; j++) for (var i2 = i0; i2 <= i1; i2++) (cells[j * nx + i2] || (cells[j * nx + i2] = [])).push(t);
  }
  return { V: V, x0: x0, z0: z0, x1: x1, z1: z1, cs: cs, nx: nx, nz: nz, cells: cells, tag: tag || null };
}
/* the highest hit of a vertical line at (x, z) no higher than ylim,
   skipping the triangles tagged `skip`; which tag it was in G.hitTag */
function hitBelow(G, x, z, ylim, skip) {
  G.hitTag = -1;
  if (!G) return -Infinity;
  var i = Math.floor((x - G.x0) / G.cs), j = Math.floor((z - G.z0) / G.cs);
  if (i < 0 || j < 0 || i >= G.nx || j >= G.nz) return -Infinity;
  var L = G.cells[j * G.nx + i]; if (!L) return -Infinity;
  var V = G.V, best = -Infinity;
  for (var k = 0; k < L.length; k++) {
    if (G.tag && G.tag[L[k]] === skip) continue;
    var o = L[k] * 9, ax = V[o], ay = V[o + 1], az = V[o + 2];
    var e1x = V[o + 3] - ax, e1z = V[o + 5] - az, e2x = V[o + 6] - ax, e2z = V[o + 8] - az;
    var det = e1x * e2z - e2x * e1z;
    if (det > -1e-9 && det < 1e-9) continue;
    var px = x - ax, pz = z - az, u = (px * e2z - e2x * pz) / det, w = (e1x * pz - px * e1z) / det;
    if (u < -1e-6 || w < -1e-6 || u + w > 1 + 1e-6) continue;
    var y = ay + u * (V[o + 4] - ay) + w * (V[o + 7] - ay);
    if (y <= ylim && y > best) { best = y; if (G.tag) G.hitTag = G.tag[L[k]]; }
  }
  return best;
}
function hull(P) {
  P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
  if (P.length < 3) return P;
  function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
  var lo = [], up = [];
  for (var i = 0; i < P.length; i++) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], P[i]) <= 0) lo.pop(); lo.push(P[i]); }
  for (var j = P.length - 1; j >= 0; j--) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], P[j]) <= 0) up.pop(); up.push(P[j]); }
  up.pop(); lo.pop();
  return lo.concat(up);
}
function footSamples(pts) {
  var Hh = hull(pts), cx = 0, cz = 0;
  Hh.forEach(function (p) { cx += p[0]; cz += p[1]; }); cx /= Hh.length; cz /= Hh.length;
  var S = [[cx, cz]];
  Hh.forEach(function (p, i) {
    var q = Hh[(i + 1) % Hh.length], px = p[0] + (cx - p[0]) * 0.01, pz = p[1] + (cz - p[1]) * 0.01;
    S.push([px, pz]);
    [0.25, 0.5, 0.75].forEach(function (f) { S.push([cx + (px - cx) * f, cz + (pz - cz) * f]); });
    var mx = (p[0] + q[0]) / 2, mz = (p[1] + q[1]) / 2;
    S.push([mx + (cx - mx) * 0.01, mz + (cz - mz) * 0.01]);
  });
  return S;
}
/* the model and its kit: render3d names its kit groups "kit.<piece>";
   before it did, the kit was every child of the template after the first
   but the gun mount */
function kitOf(wrap) {
  var named = wrap.children.filter(function (c) { return c.name && c.name.indexOf("kit") === 0; });
  if (named.length) return named;
  return wrap.children.filter(function (c, i) { return i > 0 && c.name !== "mountwrap"; });
}
function modelOf(wrap) {
  var kit = kitOf(wrap);
  return wrap.children.filter(function (c) { return kit.indexOf(c) < 0 && c.name !== "mountwrap"; });
}
function box(o) {
  var b = new THREE.Box3(), p = o.geometry.attributes.position, e = o.matrixWorld;
  for (var i = 0; i < p.count; i++) b.expandByPoint(_v.fromBufferAttribute(p, i).applyMatrix4(e));
  return b;
}
/* every kit piece of a drawn structure (a template or an instance's group,
   world matrices current): its feet, the worst gap under them, how far it
   reaches past the model's plan, and how many foot samples found nothing */
function pieces(wrap) {
  var top = wrap; while (top.parent) top = top.parent;
  top.updateMatrixWorld(true);
  var MV = tris(modelOf(wrap), wrap), G = grid(MV), mb = new THREE.Box3();
  for (var i = 0; i < MV.length; i += 3) mb.expandByPoint(_v.set(MV[i], MV[i + 1], MV[i + 2]));
  var meshes = [];
  kitOf(wrap).forEach(function (k, ki) {
    k.traverse(function (o) { if (o.isMesh && o.visible !== false) meshes.push({ m: o, b: box(o), ki: ki }); });
  });
  /* pieces: meshes of one kit group that touch */
  var par = meshes.map(function (_, i) { return i; });
  function f(i) { while (par[i] !== i) { par[i] = par[par[i]]; i = par[i]; } return i; }
  for (var a = 0; a < meshes.length; a++) for (var b = a + 1; b < meshes.length; b++)
    if (meshes[a].ki === meshes[b].ki && meshes[a].b.clone().expandByScalar(0.03).intersectsBox(meshes[b].b)) par[f(a)] = f(b);
  var comps = {}, list = [];
  meshes.forEach(function (x, i) { var r = f(i); if (!comps[r]) { comps[r] = []; list.push(comps[r]); } comps[r].push(x); });
  var KV = [], KT = [];
  list.forEach(function (C, ci) { C.forEach(function (x) { if (!opaque(x.m)) return; var v = tris([x.m], wrap); for (var q = 0; q < v.length; q++) KV.push(v[q]); for (var t = 0; t < v.length / 9; t++) KT.push(ci); }); });
  var KG = KV.length ? grid(KV, KT) : null;
  var out = list.map(function (C, ci) {
    var cb = new THREE.Box3(), gap = -Infinity, air = 0, name = "";
    C.forEach(function (x) { cb.union(x.b); name = name || (x.m.parent && x.m.parent.name) || ""; });
    C.forEach(function (x) {
      var ex = x.b.clone().expandByScalar(0.03);
      for (var k = 0; k < C.length; k++) if (C[k] !== x && ex.intersectsBox(C[k].b) && C[k].b.min.y < x.b.min.y - 0.05) return;
      var y0 = x.b.min.y, pts = [], p = x.m.geometry.attributes.position, e = x.m.matrixWorld;
      for (var i = 0; i < p.count; i++) { _v.fromBufferAttribute(p, i).applyMatrix4(e); if (_v.y <= y0 + 0.03) pts.push([_v.x, _v.z]); }
      footSamples(pts).forEach(function (s) {
        var t = -Infinity;
        [[0, 0], [0.15, 0], [-0.15, 0], [0, 0.15], [0, -0.15]].forEach(function (d) {
          t = Math.max(t, hitBelow(G, s[0] + d[0], s[1] + d[1], y0 + 3, -1), KG ? hitBelow(KG, s[0] + d[0], s[1] + d[1], y0 + 3, ci) : -Infinity);
        });
        if (t === -Infinity) { air++; t = 0; }
        gap = Math.max(gap, y0 - t);
      });
    });
    var hang = Math.max(0, mb.min.x - cb.min.x, cb.max.x - mb.max.x, mb.min.z - cb.min.z, cb.max.z - mb.max.z);
    return { name: name, meshes: C.length, gap: gap, hang: hang, air: air, top: cb.max.y, box: cb };
  });
  return { list: out, G: G, KG: KG, meshes: meshes.length, wrap: wrap };
}

/* ------------------------------------------------------------ the match */
function run() {
  var G = Game, P = G.human, E = G.players[1], M = G.map, W = M.W;
  if (typeof AI !== "undefined" && AI.setPeace) AI.setPeace(E, true);
  G.checkVictory = function () {};
  if (!H || !H.recOf) { chk("render3d's record lookup reached", false, "Impact3D.init was not called"); return; }
  var FACS = ["nato", "pact", "pla", "kpa", "roc", "gbr", "fra", "deu"], ERAS = ["e50", "e60", "e80", "e90", "e00", "e20"];
  var KEYS = Object.keys(BLD_MODELS).filter(function (k) { return BUILDINGS[k]; }).sort();
  /* the pieces each kit was drawn with: NATO radome, mast and three yagis;
     Pact stack, band and board; PLA two eave slabs and two masts. Chimney,
     cap and whip; three legs and three rings; net, four poles and a mast;
     pedestal and dish; face and radome. A mesh is a draw and a shadow draw. */
  var ARCH_N = { nato: 5, pact: 3, pla: 4 }, ERA_N = { e50: 3, e60: 6, e80: 6, e90: 2, e00: 2, e20: 2 };
  function owner(fac, era) {
    var o = Object.create(P), fc = CFG.FACTION_COLORS[fac];
    o.color = { main: fc.main, dark: fc.dark, light: fc.light, fac: fac };
    o.era = era;
    return o;
  }
  /* open ground near home for the structures, and a place the camera sees */
  var spot = null, hx = (P.homeX / TT) | 0, hy = (P.homeY / TT) | 0;
  for (var r = 6; r < 60 && !spot; r++) for (var a = 0; a < 48 && !spot; a++) {
    var x = (hx + Math.cos(a / 48 * 6.2832) * r) | 0, y = (hy + Math.sin(a / 48 * 6.2832) * r) | 0, ok = x > 4 && y > 4 && x < W - 8 && y < M.H - 8;
    for (var yy = 0; yy < 3 && ok; yy++) for (var xx = 0; xx < 3 && ok; xx++) if (!GameMap.passable(M, x + xx, y + yy, "ground") || G.tileBlocked(x + xx, y + yy, null)) ok = false;
    if (ok) spot = { x: x, y: y };
  }
  if (!spot) { chk("open ground for the structures", false, "none"); return; }
  function draw(n) { for (var i = 0; i < n; i++) Render3D.draw(DT, UI.input); }
  function place(key, ow) {
    var b = G.placeBuilding(P, key, spot.x, spot.y, true);
    if (b) { b.owner = ow; P.buildings.splice(P.buildings.indexOf(b), 1); }
    return b;
  }
  function gone(list) { list.forEach(function (b) { b.dead = true; }); draw(1); }

  /* ================= [1] roof fires on burning structures ================= */
  log("\n[1] THE DAMAGE MODULE'S ROOF FIRES, ON A STRUCTURE BURNING AT 3%");
  var D3 = typeof Damage3D !== "undefined" ? Damage3D : null;
  var FIRE_KEYS = ["conyard", "power", "refinery", "barracks", "factory", "navalyard", "airbase", "radar", "lab", "depot", "derrick", "silo"];
  var fires = 0, onModel = 0, onKit = 0, badFires = [], worstFire = 0;
  if (!D3) chk("js/damage3d.js loaded", false, "");
  else FIRE_KEYS.forEach(function (key) {
    ["nato", "pact", "pla"].forEach(function (fac) { ["e80", "e20"].forEach(function (era) {
      var b = place(key, owner(fac, era));
      if (!b) return;
      b.hp = b.maxHp * 0.03;
      Render3D.setCam(b.x, b.y);
      draw(4);
      var rec = H.recOf(b.id), an = D3.anchors(b.id);
      if (!rec || !an) { badFires.push(key + " " + fac + " " + era + ": no emitter"); gone([b]); return; }
      var pc = pieces(rec.inst);
      an.srcs.forEach(function (s) {
        if (s.what !== "roof") return;
        fires++;
        var tm = hitBelow(pc.G, s.x, s.z, s.y, -1), tk = pc.KG ? hitBelow(pc.KG, s.x, s.z, s.y, -2) : -Infinity, kt = pc.KG ? pc.KG.hitTag : -1;
        var top = Math.max(tm, tk);
        /* on a surface: LIFT (0.3 m) clear of the top under it */
        var lift = s.y - top;
        if (tk > tm + 0.05) {
          onKit++;
          var piece = pc.list[kt];
          if (!piece || piece.gap > GAP || piece.air) badFires.push(key + " " + fac + " " + era + ": fire on " + (piece ? piece.name : "?") + " " + (piece ? piece.gap.toFixed(1) + " m off its surface" : ""));
          worstFire = Math.max(worstFire, piece ? piece.gap : 99);
        } else onModel++;
        if (!(lift > 0.2 && lift < 0.45)) badFires.push(key + " " + fac + " " + era + ": fire " + lift.toFixed(2) + " m over the surface under it");
      });
      gone([b]);
      rec.tpl.traverse(function (o) { if (o.geometry) o.geometry.dispose(); });
    }); });
  });
  if (D3) chk("every roof fire burns on the model, or on a kit piece standing on it", fires > 0 && !badFires.length,
      fires + " roof fires on " + FIRE_KEYS.length + " structures x 3 armies x e80/e20: " + onModel + " on the model, " + onKit + " on kit" +
      (badFires.length ? "; " + badFires.length + " wrong, e.g. " + badFires.slice(0, 4).join("; ") : ""));

  /* ================= [2] every structure, army and period ================= */
  log("\n[2] THE KIT ON EVERY STRUCTURE: " + KEYS.length + " keys x " + FACS.length + " armies x " + ERAS.length + " periods");
  var rows = [], teamN = 0, teamLost = 0, teamWhere = [], tpls = 0, over = [], bareKit = [];
  KEYS.forEach(function (key) {
    var def = BUILDINGS[key];
    /* the raw model's team-coloured parts, by traversal order, once an army */
    var teamIdx = {};
    FACS.forEach(function (fac) {
      var raw = BLD_MODELS[key].build(THREE, Models3D, { team: CFG.FACTION_COLORS[fac].main });
      var tc = new THREE.Color(CFG.FACTION_COLORS[fac].main).convertSRGBToLinear(), idx = [], i = 0;
      raw.traverse(function (o) {
        if (!o.isMesh) return;
        (Array.isArray(o.material) ? o.material : [o.material]).forEach(function (m, k) {
          if (!m || !m.color) return;
          var c = m.color.clone(); if (!(m.userData && m.userData._srgbDone)) c.convertSRGBToLinear();
          if (Math.abs(c.r - tc.r) + Math.abs(c.g - tc.g) + Math.abs(c.b - tc.b) < 3e-3) idx.push(i + ":" + k);
        });
        i++;
      });
      raw.traverse(function (o) { if (o.geometry) o.geometry.dispose(); });
      teamIdx[fac] = { idx: idx, tc: tc };
    });
    var row = { key: key, gap: 0, hang: 0, air: 0, kit: [99, 0], lost: 0, n: 0, worst: "" };
    /* an army at a time, its six periods side by side */
    FACS.forEach(function (fac) {
      var placed = [], mine = [];
      ERAS.forEach(function (era) { var b = place(key, owner(fac, era)); if (b) { b._era = era; placed.push(b); } });
      Render3D.setCam(placed[0].x, placed[0].y);
      draw(1);
      placed.forEach(function (b) {
        var rec = H.recOf(b.id), era = b._era;
        if (!rec) return;
        tpls++; mine.push(rec.tpl);
        var pc = pieces(rec.tpl);
        pc.list.forEach(function (q) {
          if (q.gap > row.gap) { row.gap = q.gap; row.worst = fac + " " + era + " " + (q.name || "piece"); }
          row.hang = Math.max(row.hang, q.hang); row.air += q.air;
        });
        row.kit[0] = Math.min(row.kit[0], pc.meshes); row.kit[1] = Math.max(row.kit[1], pc.meshes);
        /* kpa, roc, gbr, fra and deu build in NATO's architecture */
        var cap = def.bare ? 0 : (def.cat !== "defense" && key !== "wall" ? ARCH_N[ARCH_N[fac] ? fac : "nato"] : 0) + ERA_N[era];
        if (pc.meshes > cap) over.push(key + " " + fac + " " + era + ": " + pc.meshes + " > " + cap);
        if (def.bare && pc.meshes) bareKit.push(key);
        /* the owner's colour, part by part */
        var T = teamIdx[fac], j = 0;
        pc.wrap.children[0].traverse(function (o) {
          if (!o.isMesh) return;
          (Array.isArray(o.material) ? o.material : [o.material]).forEach(function (m, k) {
            if (T.idx.indexOf(j + ":" + k) < 0) return;
            row.n++; teamN++;
            var c = m.color;
            if (Math.abs(c.r - T.tc.r) + Math.abs(c.g - T.tc.g) + Math.abs(c.b - T.tc.b) > 3e-3) {
              row.lost++; teamLost++;
              if (teamWhere.length < 6) teamWhere.push(key + " " + fac + " " + era + " #" + c.clone().convertLinearToSRGB().getHexString());
            }
          });
          j++;
        });
      });
      gone(placed);
      /* the test's own templates, emptied once no instance of them is left
         in the scene, so 2,064 of them need not fit in memory at once */
      mine.forEach(function (t) { t.traverse(function (o) { if (o.geometry) o.geometry.dispose(); }); t.clear(); });
      if (typeof gc === "function") gc();
    });
    if (row.kit[0] === 99) row.kit[0] = 0;
    rows.push(row);
  });
  if (TABLE) {
    log("\n  key           largest gap   past plan   feet over air   kit meshes   team parts repainted   worst");
    rows.forEach(function (r) {
      log("  " + (r.key + "              ").slice(0, 14) + (r.gap.toFixed(3) + " m        ").slice(0, 14) + (r.hang.toFixed(2) + " m      ").slice(0, 12) +
          ("" + r.air + "               ").slice(0, 16) + (r.kit[0] + "-" + r.kit[1] + "           ").slice(0, 13) + (r.lost + "/" + r.n + "                  ").slice(0, 23) + r.worst);
    });
  }
  var worst = rows.slice().sort(function (a, b) { return b.gap - a.gap; });
  chk("every kit piece stands on the surface under it: no gap over " + (GAP * 100) + " cm", worst[0].gap <= GAP,
      tpls + " templates; largest gaps " + worst.slice(0, 5).map(function (r) { return r.key + " " + r.gap.toFixed(2) + " m (" + r.worst + ")"; }).join(", "));
  var hang = rows.slice().sort(function (a, b) { return b.hang - a.hang; }), air = rows.reduce(function (s, r) { return s + r.air; }, 0);
  chk("no kit piece reaches past the model's own plan, and no foot stands over air", hang[0].hang <= HANG && air === 0,
      "furthest " + hang.slice(0, 4).map(function (r) { return r.key + " " + r.hang.toFixed(2) + " m"; }).join(", ") + "; " + air + " foot samples over air");
  chk("the kit costs no more meshes than the pieces it was drawn with", !over.length,
      over.length ? over.length + " templates over, e.g. " + over.slice(0, 3).join("; ") : "radome, mast and yagis 5, stack, band and board 3, eaves and masts 4; the period's 2-6");
  chk("a `bare` structure carries no kit", !bareKit.length, bareKit.length ? bareKit.slice(0, 4).join(", ") : rows.filter(function (r) { return BUILDINGS[r.key].bare; }).length + " bare keys, none");
  chk("the owner's colour survives restyle() and eraRestyle()", teamN > 0 && teamLost === 0,
      teamLost + " of " + teamN + " team-coloured parts repainted" + (teamWhere.length ? ", e.g. " + teamWhere.join(", ") : ""));
}
