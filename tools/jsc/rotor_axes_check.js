/* tools/jsc/rotor_axes_check.js - every rotor in the game turns about its own
   shaft, the way its type turns, whatever the machine's heading, pitch and
   roll. Checked on the REAL renderer under JavaScriptCore.

     python3 tools/jsc/scene3d.py tools/jsc/rotor_axes_check.js
     python3 tools/jsc/scene3d.py tools/jsc/rotor_axes_check.js -- table

   Every UNIT_MODELS entry with a part named "rotor" or "tailrotor" is flown
   through render3d.js at nine headings and four attitudes, and the axis each
   part actually turned about is read off its world matrix between two
   frames: the one direction the frame-to-frame change leaves where it was.
   That is held within 1 deg of the shaft the part's geometry is built round
   - the normal of its blur disc, else the flattest direction of its blades,
   found in the part's own rest frame - and of the one of the part's own axes
   that lies along the machine's up (a main rotor) or across it (a tail rotor
   or a fenestron fan), which is the renderer's rule. A mast the modeller
   tilted, like a Lynx's 4 degrees forward or a Black Hawk's tail rotor
   canted 19 degrees, is part of that shaft: turning the head about the
   machine's pure vertical instead would make the tilted disc wobble. The
   Tiger (twice), the parametric Apache and the Black Hawk with its canted
   tail rotor are also built inside a mirrored or a stretched group, and
   the Gazelle again with its Fenestron switched on (FAN_SPINS).

   At 081caf0 render3d turned the parts with rotateOnWorldAxis, which
   three.js documents as assuming no rotated parent: the axis lands in the
   PARENT's frame. Measured here (7 passed, 9 failed): 44 main rotors -
   every parametric machine and the older hand-built ones - windmilled
   about the lateral axis, 90 deg out at every heading, and their 41 tail
   rotors were 90 deg out too; the 15 tail rotors hung in mounts were right
   only at 0 and 180 deg (backwards at 180, 30 deg out at 30, 45 at 45, 90
   at 90, 18 at 0 once banked 18); the Ka-50's upper head never turned; the
   Z-9C's fan went 377 mm out of the slab it fills at rest - out through
   its shroud - and the Gazelle's, switched on, 289 mm. Only the 20 main
   rotors hung in mounts were right. "table" prints what each part turned
   about, per heading and attitude.

   The sense is held too: a Mil, Sud or Tiger head clockwise from above, an
   American, Bo 105, Scout or Lynx head anti-clockwise, the heroes' tail
   rotors as their modellers wrote them down, and a Kamov's two heads
   against each other. So are the speeds: a parked machine winds down at
   0.32 of full speed a second and spools up at 0.55, the main rotor
   turning 28 rad/s and the tail 40 rad/s at full speed, and the blur disc
   fades with it. */
var TT = 32, PASS = 0, FAIL = 0, DT = 1 / 30;
var ARGS = (typeof __ARGS !== "undefined") ? __ARGS : [];
var TABLE = ARGS.indexOf("table") >= 0;
var D2R = Math.PI / 180, R2D = 180 / Math.PI;
function log(s) { print(s); }
function chk(name, ok, detail) { (ok ? PASS++ : FAIL++); log((ok ? "  PASS  " : "  FAIL  ") + name + (detail ? "   -- " + detail : "")); }

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

var HEADINGS = [0, 30, 45, 90, 135, 180, 225, 270, 315];
/* render3d's group is YXZ with the nose along its local X: rotation.x turns
   the machine about its fore-and-aft axis (roll) and rotation.z about its
   lateral axis (pitch). An aircraft's group is given neither by the air
   branch, so what is set here stays set. */
var ATTS = [
  { name: "level",               rx: 0,   rz: 0 },
  { name: "nose up 12",          rx: 0,   rz: 12 },
  { name: "banked 18",           rx: 18,  rz: 0 },
  { name: "nose down 9, bank -24", rx: -24, rz: -9 },
];
var SPUN = { rotor: 1, tailrotor: 1 };

/* ---- 3x3 helpers on three's column-major 4x4 ---- */
function m3(M) { var e = M.elements; return [e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]]; }
function mul(A, B) {
  var C = [];
  for (var r = 0; r < 3; r++) for (var c = 0; c < 3; c++)
    C.push(A[r * 3] * B[c] + A[r * 3 + 1] * B[3 + c] + A[r * 3 + 2] * B[6 + c]);
  return C;
}
function inv(A) {
  var a = A[0], b = A[1], c = A[2], d = A[3], e = A[4], f = A[5], g = A[6], h = A[7], i = A[8];
  var A0 = e * i - f * h, B0 = -(d * i - f * g), C0 = d * h - e * g, det = a * A0 + b * B0 + c * C0;
  return [A0 / det, -(b * i - c * h) / det, (b * f - c * e) / det,
          B0 / det, (a * i - c * g) / det, -(a * f - c * d) / det,
          C0 / det, -(a * h - b * g) / det, (a * e - b * d) / det];
}
function apply(A, v) { return [A[0] * v[0] + A[1] * v[1] + A[2] * v[2], A[3] * v[0] + A[4] * v[1] + A[5] * v[2], A[6] * v[0] + A[7] * v[1] + A[8] * v[2]]; }
function norm(v) { var l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
/* angle between two LINES, in degrees */
function lineAng(a, b) { return Math.acos(Math.min(1, Math.abs(dot(norm(a), norm(b))))) * R2D; }
function quatM(q) { var M = new THREE.Matrix4().makeRotationFromQuaternion(q); return m3(M); }

/* The frame-to-frame change of a part's world matrix, D = L1 L0^-1, and what
   it turned about: the direction D leaves where it was (the null direction of
   D - I), which is the spin axis for a rigid parent and still the drawn shaft
   under a mirrored or stretched one. The angle is from the trace, which a
   change of frame does not alter. */
function spinOf(L0, L1) {
  var D = mul(L1, inv(L0));
  var M = [D[0] - 1, D[1], D[2], D[3], D[4] - 1, D[5], D[6], D[7], D[8] - 1];
  var rows = [[M[0], M[1], M[2]], [M[3], M[4], M[5]], [M[6], M[7], M[8]]];
  var best = null, bl = 0;
  [[0, 1], [0, 2], [1, 2]].forEach(function (p) {
    var c = cross(rows[p[0]], rows[p[1]]), l = Math.hypot(c[0], c[1], c[2]);
    if (l > bl) { bl = l; best = c; }
  });
  var tr = D[0] + D[4] + D[8];
  var ang = Math.acos(Math.max(-1, Math.min(1, (tr - 1) / 2)));
  /* rotation vector, for the sense: 2 sin(angle) along the axis */
  var rv = [D[7] - D[5], D[2] - D[6], D[3] - D[1]];
  return { axis: bl > 1e-9 ? norm(best) : null, ang: ang, rv: rv };
}

/* Of a part's own axes, the one that lies along the machine's up (a main
   rotor) or across it (a tail rotor), as a direction in the frame F maps
   into. F is the part's rest frame: its parent's matrix times its own rest
   rotation - the frame a turn about a local axis is made in. */
function shaftIn(F, target) {
  var best = null, bd = -1, bi = -1;
  for (var i = 0; i < 3; i++) {
    var e = [0, 0, 0]; e[i] = 1;
    var d = norm(apply(F, e)), s = dot(d, target);
    if (Math.abs(s) > bd) { bd = Math.abs(s); best = s < 0 ? [-d[0], -d[1], -d[2]] : d; bi = i; }
  }
  return { dir: best, idx: bi, tilt: Math.acos(Math.min(1, bd)) * R2D };
}

/* The geometry's own axis: the blur disc's normal where the part has one,
   else the flattest direction of the outer half of its blades. Only vertices
   beyond half the radius count, so the hub, the swashplate and a mast-mounted
   sight - all standing along the shaft - cannot outvote the blade plane,
   which on a two-bladed rotor would otherwise lose to the blade's chord.
   It is found in the part's rest frame (Finv takes model space back into
   it), where a stretch or a mirror above the part is undone, and it never
   asks which of the part's axes the renderer chose. */
function geomAxis(node, Finv) {
  var disc = null;
  node.traverse(function (o) { if (!disc && o.isMesh && o.name === "rotordisc") disc = o; });
  if (disc) {
    var g = disc.geometry; if (!g.boundingBox) g.computeBoundingBox();
    var s = new THREE.Vector3(); g.boundingBox.getSize(s);
    var j = s.x <= s.y && s.x <= s.z ? 0 : s.y <= s.z ? 1 : 2;
    var e = [0, 0, 0]; e[j] = 1;
    return { dir: norm(apply(Finv, apply(m3(disc.matrixWorld), e))), how: "disc" };
  }
  var pts = [], v = new THREE.Vector3(), hub = new THREE.Vector3().setFromMatrixPosition(node.matrixWorld), R = 0;
  node.traverse(function (o) {
    if (!o.isMesh || !o.geometry || !o.geometry.attributes.position) return;
    var p = o.geometry.attributes.position;
    for (var i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i).applyMatrix4(o.matrixWorld).sub(hub);
      var q = apply(Finv, [v.x, v.y, v.z]);
      pts.push(q); R = Math.max(R, Math.hypot(q[0], q[1], q[2]));
    }
  });
  pts = pts.filter(function (p) { return Math.hypot(p[0], p[1], p[2]) > 0.5 * R; });
  if (pts.length < 4) return null;
  var C = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  pts.forEach(function (d) {
    for (var r = 0; r < 3; r++) for (var k = 0; k < 3; k++) C[r * 3 + k] += d[r] * d[k];
  });
  /* Jacobi on the symmetric second moment about the hub */
  var A = C.slice(), V = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  for (var sweep = 0; sweep < 30; sweep++) {
    [[0, 1], [0, 2], [1, 2]].forEach(function (pq) {
      var p = pq[0], q = pq[1], apq = A[p * 3 + q];
      if (Math.abs(apq) < 1e-15) return;
      var th = (A[q * 3 + q] - A[p * 3 + p]) / (2 * apq);
      var t = (th >= 0 ? 1 : -1) / (Math.abs(th) + Math.sqrt(th * th + 1));
      var cs = 1 / Math.sqrt(t * t + 1), sn = t * cs;
      for (var k = 0; k < 3; k++) {
        var akp = A[k * 3 + p], akq = A[k * 3 + q];
        A[k * 3 + p] = cs * akp - sn * akq; A[k * 3 + q] = sn * akp + cs * akq;
      }
      for (var k2 = 0; k2 < 3; k2++) {
        var apk = A[p * 3 + k2], aqk = A[q * 3 + k2];
        A[p * 3 + k2] = cs * apk - sn * aqk; A[q * 3 + k2] = sn * apk + cs * aqk;
      }
      for (var k3 = 0; k3 < 3; k3++) {
        var vkp = V[k3 * 3 + p], vkq = V[k3 * 3 + q];
        V[k3 * 3 + p] = cs * vkp - sn * vkq; V[k3 * 3 + q] = sn * vkp + cs * vkq;
      }
    });
  }
  var ev = [A[0], A[4], A[8]], j2 = ev[0] <= ev[1] && ev[0] <= ev[2] ? 0 : ev[1] <= ev[2] ? 1 : 2;
  return { dir: norm([V[j2], V[3 + j2], V[6 + j2]]), how: "blades" };
}

function draw(n) { for (var i = 0; i < (n || 1); i++) Render.draw(DT, UI.input); }
function named(root) { var out = []; root.traverse(function (o) { if (SPUN[o.name]) out.push(o); }); return out; }

/* A model built inside a mirrored or a stretched group: the axis has to come
   out right however the parts above the rotor are scaled. */
function wrapped(base, sx, sy, sz) {
  return { len: UNIT_MODELS[base].len, build: function (T, M, o) {
    var inner = UNIT_MODELS[base].build(T, M, o), g = new T.Group();
    inner.scale.set(sx, sy, sz); g.add(inner); return g;
  } };
}

function run() {
  var P = Game.human;
  Game.checkVictory = function () {};
  Game.players.forEach(function (p) { if (p !== P && typeof AI !== "undefined" && AI.setPeace) AI.setPeace(p, true); });
  chk("the 3D renderer is up", Render === Render3D, "");

  UNIT_MODELS.__mirror_helo_f = wrapped("helo_f", 1, -1, 1);            // Tiger, mirrored port to starboard
  UNIT_MODELS.__stretch_helo_f = wrapped("helo_f", 1.3, 0.75, 1.15);    // Tiger, non-uniformly scaled
  UNIT_MODELS.__mirror_nato_e00_gunship = wrapped("nato_e00_gunship", -1, 1, 1);  // parametric, mirrored nose to tail
  UNIT_MODELS.__stretch_trans_n = wrapped("trans_n", 0.8, 1.25, 1.1);   // canted tail rotor, stretched

  /* The Gazelle's Fenestron fan stands still (FAN_SPINS in fr_gazelle.js:
     a blur at any zoom, and two draw calls fewer). Switched on, it has to
     turn inside its shroud like any other, so the file is built again here
     with the switch on, into names of its own. */
  var FANS = { asw_helo_c: 1 };
  (function () {
    var src = readFile("js/hero/fr_gazelle.js"), on = src.replace(/var FAN_SPINS = (true|false);/, "var FAN_SPINS = true;");
    if (!/var FAN_SPINS = true;/.test(on)) { FANS.__fan_switch_missing = 1; return; }
    var Gz = (new Function("UNIT_MODELS", on + "\nreturn HeroGazelle;"))({});
    ["fra_e60_gunship", "fra_e80_gunship", "fra_e90_gunship"].forEach(function (id) {
      UNIT_MODELS["__fan_" + id] = { len: UNIT_MODELS[id].len, build: function (T, M, C) { return Gz.build(T, M, C, id); } };
      FANS["__fan_" + id] = 1;
    });
  })();

  /* ---- every unit model the renderer would spin a part of ---- */
  var list = [];
  Object.keys(UNIT_MODELS).sort().forEach(function (k) {
    var m;
    try { m = UNIT_MODELS[k].build(THREE, Models3D, { team: "#4b6f44" }); } catch (err) { return; }
    if (!m || !m.isObject3D) return;
    m.updateMatrixWorld(true);
    var parts = named(m);
    if (parts.length) list.push({ key: k, fresh: m, parts: parts });
  });
  var nParts = list.reduce(function (s, L) { return s + L.parts.length; }, 0);
  log("[rotor] " + list.length + " models (" + list.filter(function (L) { return L.key.indexOf("__") === 0; }).length +
      " of them synthetic) with " + nParts + " spun parts");
  chk("the roster has rotorcraft to check", list.length >= 60, list.length + " models");

  /* ---- the shaft each part should turn about: the axis its geometry is
     built round, in its own rest frame. The part's own axis nearest the
     machine's up or across (the renderer's rule) is held to it too. ---- */
  var geoWorst = 0, geoWho = "", tiltWorst = 0, tiltWho = "", geoN = { disc: 0, blades: 0 }, noGeo = [];
  list.forEach(function (L) {
    var seen = {};
    L.parts.forEach(function (o) {
      seen[o.name] = (seen[o.name] || 0) + 1;
      o.userData.__id = o.name + (seen[o.name] > 1 ? "#" + seen[o.name] : "");
      var F = mul(m3(o.parent.matrixWorld), quatM(o.quaternion));
      var target = o.name === "rotor" ? [0, 0, 1] : [0, 1, 0];      // model space: +Z up, +Y left
      var sh = shaftIn(F, target);
      o.userData.__tilt = sh.tilt;
      var g = geomAxis(o, inv(F)), e = [0, 0, 0]; e[sh.idx] = 1;
      o.userData.__gF = g ? g.dir : null;
      o.userData.__geo = g ? lineAng(g.dir, e) : null;
      if (!g) { noGeo.push(L.key + " " + o.userData.__id); return; }
      geoN[g.how]++;
      if (o.userData.__geo >= geoWorst) { geoWorst = o.userData.__geo; geoWho = L.key + " " + o.userData.__id + " (" + g.how + ")"; }
      if (sh.tilt > tiltWorst) { tiltWorst = sh.tilt; tiltWho = L.key + " " + o.userData.__id; }
    });
  });
  chk("every part has geometry to find its shaft from (a blur disc, else blades), and the axis it is built round is one of its own axes, within 0.5 deg",
      noGeo.length === 0 && geoWorst < 0.5, geoN.disc + " by the disc, " + geoN.blades + " by the blades; worst " + fmt(geoWorst) + " deg, " + geoWho +
      (noGeo.length ? "; no geometry: " + noGeo.join(", ") : ""));
  chk("and it lies within 25 deg of the machine's up or across (a tilted mast or a canted tail rotor)",
      tiltWorst < 25, "most tilted " + tiltWorst.toFixed(2) + " deg, " + tiltWho);

  /* ---- fly one of each: spawned and drawn one at a time, so the group the
     renderer adds for it is known for certain rather than guessed by place ---- */
  var base = UNITS.helo_n, sc = Render3D.three.scene;
  var hx = (P.homeX / TT) | 0, hy = (P.homeY / TT) | 0;
  Render3D.setCam(hx * TT, hy * TT);
  draw(1);
  var missing = [];
  list.forEach(function (L, i) {
    var had = !!UNITS[L.key];
    if (!had) UNITS[L.key] = Object.assign({}, base, { id: L.key, name: L.key });
    var tx = U.clamp(hx - 12 + (i % 9) * 3, 2, Game.map.W - 3), ty = U.clamp(hy - 12 + ((i / 9) | 0) * 3, 2, Game.map.H - 3);
    var before = new Set(sc.children);
    var e = Game.spawnUnitAt(P, L.key, tx * TT + 16, ty * TT + 16);
    if (!had) delete UNITS[L.key];
    L.synthetic = !had;
    e.ang = 0; e.order = null; e.moving = false; e.parked = false;
    L.e = e;
    draw(1);
    var added = sc.children.filter(function (c) { return !before.has(c) && c.isGroup && named(c).length; });
    L.grp = added.length === 1 ? added[0] : null;
    L.live = L.grp ? named(L.grp) : [];
    if (!L.grp || L.live.length !== L.parts.length ||
        L.live.some(function (o, k) { return o.name !== L.parts[k].name; })) missing.push(L.key + (L.grp ? " (parts differ)" : " (" + added.length + " groups)"));
  });
  chk("every rotorcraft is drawn, with the parts its model was built with", missing.length === 0, missing.join(", "));
  list = list.filter(function (L) { return L.grp && L.live.length === L.parts.length; });

  /* ---- measure: nine headings x four attitudes, two frame-to-frame turns each ---- */
  var worst = 0, worstWho = "", frozen = [], nMeas = 0, rateBad = 0, rateWorst = 0;
  var slabWorst = 0, slabWho = "", err = {}, sense = {};
  /* The slab each part fills along its shaft at rest, in model metres: a part
     turning about its true shaft never leaves it, one turning about anything
     else sweeps out of it - which is what took a fenestron fan out through
     both faces of its shroud. The fans are held to it everywhere. */
  list.forEach(function (L) {
    L.root = L.live[0]; while (L.root.parent && L.root.parent.parent !== L.grp) L.root = L.root.parent;
    L.parts.forEach(function (fo, pi) {
      var F = mul(m3(fo.parent.matrixWorld), quatM(fo.quaternion));
      var sh = shaftIn(F, fo.name === "rotor" ? [0, 0, 1] : [0, 1, 0]).dir;
      var hub = new THREE.Vector3().setFromMatrixPosition(fo.matrixWorld), lo = 1e9, hi = -1e9, v = new THREE.Vector3();
      fo.traverse(function (o) {
        if (!o.isMesh || !o.geometry.attributes.position) return;
        var pa = o.geometry.attributes.position;
        for (var i = 0; i < pa.count; i++) {
          v.fromBufferAttribute(pa, i).applyMatrix4(o.matrixWorld).sub(hub);
          var t = v.x * sh[0] + v.y * sh[1] + v.z * sh[2];
          if (t < lo) lo = t; if (t > hi) hi = t;
        }
      });
      fo.userData.__slab = { sh: sh, hub: hub, lo: lo, hi: hi };
    });
  });
  function slabOut(L, pi) {
    var o = L.live[pi], S = L.parts[pi].userData.__slab, out = 0, v = new THREE.Vector3();
    var toModel = new THREE.Matrix4().copy(L.root.matrixWorld).invert(), Mm = new THREE.Matrix4();
    o.traverse(function (m) {
      if (!m.isMesh || !m.geometry.attributes.position) return;
      Mm.multiplyMatrices(toModel, m.matrixWorld);
      var pa = m.geometry.attributes.position;
      for (var i = 0; i < pa.count; i++) {
        v.fromBufferAttribute(pa, i).applyMatrix4(Mm).sub(S.hub);
        var t = v.x * S.sh[0] + v.y * S.sh[1] + v.z * S.sh[2];
        out = Math.max(out, S.lo - t, t - S.hi);
      }
    });
    return out;
  }
  var fansSeen = {};
  ATTS.forEach(function (A) {
    HEADINGS.forEach(function (h, hi) {
      list.forEach(function (L) {
        L.e.ang = h * D2R;
        L.grp.rotation.x = A.rx * D2R; L.grp.rotation.z = A.rz * D2R;
      });
      draw(1);
      var snaps = [];
      for (var f = 0; f < 3; f++) {
        if (f) draw(1);
        snaps.push(list.map(function (L) { return L.live.map(function (o) { return m3(o.matrixWorld); }); }));
      }
      list.forEach(function (L, li) {
        var up = norm(apply(m3(L.grp.matrixWorld), [0, 1, 0])), right = norm(apply(m3(L.grp.matrixWorld), [0, 0, 1]));
        L.live.forEach(function (o, pi) {
          var fo = L.parts[pi];
          /* the shaft now: the part's rest rotation under its parent as drawn this frame */
          var F = mul(m3(o.parent.matrixWorld), quatM(fo.quaternion));
          var sh = shaftIn(F, o.name === "rotor" ? up : right);
          /* where the geometry's own axis lies now, as drawn this frame */
          var gd = fo.userData.__gF ? norm(apply(F, fo.userData.__gF)) : sh.dir;
          var e = 0, turned = true, id = L.key + "|" + fo.userData.__id;
          for (var f2 = 1; f2 < 3; f2++) {
            var s = spinOf(snaps[f2 - 1][li][pi], snaps[f2][li][pi]);
            nMeas++;
            if (!s.axis || s.ang < 1e-6) { turned = false; continue; }
            e = Math.max(e, lineAng(s.axis, gd), lineAng(s.axis, sh.dir));
            var want = (o.name === "rotor" ? 28 : 40) * DT;
            if (Math.abs(s.ang - want) > rateWorst) rateWorst = Math.abs(s.ang - want);
            if (Math.abs(s.ang - want) > 1e-4) rateBad++;
            /* the sense, seen from above (a main rotor) or from the machine's
               left (a tail rotor): the rotation vector along up or right is
               anti-clockwise from above / clockwise from the left. Rigid
               parents only: under a stretch the vector is not on the axis. */
            if (L.key.indexOf("__stretch") !== 0) {
              var sg = dot(s.rv, o.name === "rotor" ? up : right) > 0 ? 1 : -1;
              var S2 = sense[id] || (sense[id] = {});
              S2[sg] = (S2[sg] || 0) + 1;
            }
          }
          if (!turned) { if (frozen.indexOf(L.key + " " + fo.userData.__id) < 0) frozen.push(L.key + " " + fo.userData.__id); e = NaN; }
          ((err[id] = err[id] || {})[A.name] = err[id][A.name] || [])[hi] = e;
          if (e > worst) { worst = e; worstWho = L.key + " " + o.name + " at heading " + h + ", " + A.name; }
          if (FANS[L.key] && o.name === "tailrotor") {
            var so = slabOut(L, pi);
            fansSeen[L.key] = Math.max(fansSeen[L.key] || 0, so);
            if (so > slabWorst) { slabWorst = so; slabWho = L.key + " at heading " + h + ", " + A.name; }
          }
        });
      });
    });
  });

  if (TABLE) {
    log("\n[table] degrees between the axis each part turned about and its own shaft, per heading");
    log("        tilt = the shaft's angle from the machine's pure up (rotor) or across (tail);");
    log("        geo = the shaft against its geometry (blur disc normal, else the blade plane)");
    list.forEach(function (L) {
      L.parts.forEach(function (fo, pi) {
        var r = err[L.key + "|" + fo.userData.__id]; if (!r) return;
        var S2 = sense[L.key + "|" + fo.userData.__id] || {};
        var sn = S2[1] && S2[-1] ? "both ways" : S2[1] ? (fo.name === "rotor" ? "acw from above" : "cw from left") :
                 S2[-1] ? (fo.name === "rotor" ? "cw from above" : "acw from left") : "-";
        log(pad((L.synthetic ? "*" : "") + L.key, 27) + pad(fo.userData.__id, 10) +
            "tilt " + pad(fo.userData.__tilt.toFixed(1), 5) + "geo " + pad(fo.userData.__geo === null ? "-" : fo.userData.__geo.toFixed(1), 5) + sn);
        ATTS.forEach(function (A) {
          log("    " + pad(A.name, 23) + r[A.name].map(function (v, hi) {
            return pad(HEADINGS[hi] + ":" + (isNaN(v) ? "stuck" : v.toFixed(1)), 10); }).join(""));
        });
      });
    });
    log("  * no unit of that id: drawn through a stand-in definition (__mirror and __stretch rows are models under a mirrored or stretched parent, __fan rows the Gazelle with FAN_SPINS on)\n");
  }

  log("[rotor] " + nMeas + " frame-to-frame turns measured on " + list.length + " models");
  chk("every spun part turns, the second head of a coaxial pair included", frozen.length === 0,
      frozen.length ? frozen.length + " never turned: " + frozen.slice(0, 6).join(", ") : "");
  var lvlWorst = 0, lvlWho = "";
  Object.keys(err).forEach(function (id) { err[id].level.forEach(function (v, hi) { if (v > lvlWorst) { lvlWorst = v; lvlWho = id.split("|")[0] + " at " + HEADINGS[hi]; } }); });
  chk("level, at 0, 30, 45, 90, 135, 180, 225, 270 and 315 deg: every rotor, tail rotor and fan turns about the shaft its geometry is built round, within 1 deg",
      lvlWorst < 1, "worst " + fmt(lvlWorst) + " deg" + (lvlWho ? ", " + lvlWho : ""));
  chk("and nosed up, banked, or both, at every one of those headings", worst < 1,
      "worst " + fmt(worst) + " deg: " + worstWho);
  chk("every fenestron fan turns, and stays inside the slab it fills at rest (so inside its shroud), within 1 mm",
      slabWorst < 0.001 && Object.keys(fansSeen).length === Object.keys(FANS).length,
      Object.keys(FANS).map(function (k) { return k + (k in fansSeen ? " " + (fansSeen[k] * 1000).toFixed(1) + " mm out" : " has no fan"); }).join(", ") +
      (slabWho ? "; worst at " + slabWho : ""));
  chk("the speeds are what they were: 28 rad/s a main rotor, 40 a tail rotor, at full speed", rateBad === 0,
      rateBad + " turns off by more than 1e-4 rad, worst " + rateWorst.toExponential(2));
  var flip = Object.keys(sense).filter(function (id) { return sense[id][1] && sense[id][-1]; });
  chk("each head keeps one sense of rotation at every heading and attitude", flip.length === 0,
      flip.length ? flip.length + " reverse somewhere: " + flip.slice(0, 5).join(", ") : "");
  /* Which way each head turns, seen from above (a main rotor) or from the
     machine's left (a tail rotor): +1 anti-clockwise from above / clockwise
     from the left. The heroes' are what their modellers built and wrote
     down; the rest follow the design line. The Mil and Sud / Aerospatiale
     lines turn clockwise from above: Mi-4 (and the Z-5 built from it),
     Mi-8/17, Mi-24, Mi-28, Alouette II, Gazelle, Dauphin (Z-9) and the
     Tiger. American ones - Sikorsky, Bell, Boeing, Hughes - and the Bo 105,
     Scout and Lynx turn anti-clockwise. Not held: the Z-8, Z-10 and Z-20,
     whose sense is not recorded here, and the Kamov pairs, held below only
     to turn against each other. */
  var CW = ["helo_p", "helo_f", "helo_g", "fra_e00_gunship", "fra_e50_gunship",   // heroes: Mi-28N, Tiger, Alouette II
            "fra_e60_gunship", "fra_e80_gunship", "fra_e90_gunship",               // Gazelle
            "kpa_e00_gunship", "kpa_e80_gunship", "kpa_e90_gunship", "helo_k",    // Mi-24
            "pact_e60_gunship", "pact_e80_gunship", "pact_e00_gunship",           // Mi-24, Mi-24V, Mi-28N
            "pact_e00_transport", "pact_e60_transport", "pact_e80_transport",     // Mi-8
            "pact_e90_transport", "pla_e90_transport", "trans_p",                 // Mi-8, Mi-17, Mi-8 (units3d)
            "pact_e50_transport", "pla_e50_transport", "pla_e60_transport",       // Mi-4, Mi-4, Z-5
            "nato_e50_gunship", "pla_e80_gunship", "pla_e90_gunship", "asw_helo_c"];  // Alouette II, Gazelle, Z-9W, Z-9C
  var ACW = ["helo_n", "gbr_e60_gunship", "gbr_e80_gunship", "gbr_e90_gunship", "deu_e80_gunship",  // heroes: AH-64E, Scout, Lynx, Bo 105
             "nato_e00_gunship", "roc_e00_gunship", "helo_r", "nato_e80_gunship", "nato_e90_gunship", // Apache
             "nato_e00_transport", "roc_e00_transport", "trans_n", "trans_r",                      // Black Hawk
             "nato_e80_transport", "nato_e90_transport", "pla_e80_transport",                      // Black Hawk, S-70C-2
             "nato_e00_aswhelo", "roc_e00_aswhelo", "asw_helo_n", "asw_helo_r",                    // Seahawk, Thunderhawk
             "nato_e80_lamps", "nato_e90_aswhelo",                                                 // SH-60B, SH-60F
             "nato_e50_transport", "nato_e60_gunship", "roc_e90_gunship",                          // S-55, AH-1G, AH-1W
             "nato_e60_transport", "roc_e60_transport", "roc_e80_transport", "roc_e90_transport",  // UH-1
             "roc_e80_gunship"];                                                                   // 500MD
  var DOC = {
    "deu_e80_gunship|tailrotor": 1, "gbr_e90_gunship|tailrotor": 1,        // Bo 105, Lynx AH.7: cw from the left
    /* the H-60s (hero/h60_hawk_family.js): a tractor on the starboard
       side, top blade aft, clockwise from the left */
    "asw_helo_n|tailrotor": 1, "nato_e00_aswhelo|tailrotor": 1, "nato_e80_lamps|tailrotor": 1,
    "nato_e90_aswhelo|tailrotor": 1, "asw_helo_r|tailrotor": 1, "roc_e00_aswhelo|tailrotor": 1,
    "trans_n|tailrotor": 1, "nato_e80_transport|tailrotor": 1, "nato_e90_transport|tailrotor": 1,
    "nato_e00_transport|tailrotor": 1, "trans_r|tailrotor": 1, "roc_e00_transport|tailrotor": 1,
    "pla_e80_transport|tailrotor": 1,
    "gbr_e80_gunship|tailrotor": -1,                                       // Lynx AH.1: the -PI/2 mount, the other way
    /* Mi-24D and Mi-24V (hero/pact_hind_mi24.js): top blade aft, clockwise
       from the left - "up on the side towards the front" (Gordon and
       Komissarov), "top blade aft" (VFS Vertipedia) */
    "pact_e60_gunship|tailrotor": 1, "pact_e80_gunship|tailrotor": 1, "helo_k|tailrotor": 1,
    "kpa_e80_gunship|tailrotor": 1, "kpa_e90_gunship|tailrotor": 1, "kpa_e00_gunship|tailrotor": 1,
  };
  CW.forEach(function (k) { DOC[k + "|rotor"] = -1; });
  ACW.forEach(function (k) { DOC[k + "|rotor"] = 1; });
  var docBad = [];
  Object.keys(DOC).forEach(function (id) {
    var S2 = sense[id] || {};
    if (!list.some(function (x) { return x.key === id.split("|")[0]; })) { docBad.push(id + " (not in the roster)"); return; }
    if (!S2[DOC[id]] || S2[-DOC[id]]) docBad.push(id + " (" + (S2[1] || 0) + " one way, " + (S2[-1] || 0) + " the other)");
  });
  chk("every head turns the way its type does, at every heading and attitude: " + CW.length + " Mil, Sud and Tiger heads clockwise from above, " +
      ACW.length + " American, Bo 105, Scout and Lynx heads anti-clockwise, and the hero tail rotors as written",
      docBad.length === 0, docBad.length + " wrong" + (docBad.length ? ": " + docBad.slice(0, 8).join("; ") : ""));
  var coax = [];
  function sgn(S2) { S2 = S2 || {}; return S2[1] && !S2[-1] ? 1 : S2[-1] && !S2[1] ? -1 : 0; }
  list.forEach(function (L) {
    if (!L.parts.some(function (fo) { return fo.userData.__id === "rotor#2"; })) return;
    var sa = sgn(sense[L.key + "|rotor"]), sb = sgn(sense[L.key + "|rotor#2"]);
    coax.push({ key: L.key, ok: sa !== 0 && sb !== 0 && sa === -sb });
  });
  chk("a coaxial pair's heads turn opposite ways", coax.length > 0 && coax.every(function (c) { return c.ok; }),
      coax.map(function (c) { return c.key + (c.ok ? " contra-rotating" : " NOT"); }).join(", "));
  /* A turn made in the part's own frame is mirrored with its geometry: the
     rotation vector is a pseudovector, so a mirror keeps the component at
     right angles to its plane and reverses the ones in it. */
  var mirr = [["__mirror_helo_f", "helo_f", [1, -1, 1]], ["__mirror_nato_e00_gunship", "nato_e00_gunship", [-1, 1, 1]]], mBad = [];
  mirr.forEach(function (p) {
    ["rotor", "tailrotor"].forEach(function (nm) {
      var det = p[2][0] * p[2][1] * p[2][2], along = nm === "rotor" ? p[2][2] : p[2][1];
      var sa = sgn(sense[p[0] + "|" + nm]), sb = sgn(sense[p[1] + "|" + nm]);
      if (!(sa && sb && sa === det * along * sb)) mBad.push(p[0] + " " + nm + " (" + sa + " against " + sb + ")");
    });
  });
  chk("a mirrored copy turns as the mirror image of the original: a main rotor the other way, a tail rotor as the mirror's plane decides", mBad.length === 0, mBad.join(", "));

  /* ---- spool-down and spool-up, and the blur disc with them ---- */
  var picks = list.filter(function (L) { return L.key === "helo_f" || L.key === "nato_e00_gunship" || L.key === "pact_e90_gunship"; });
  picks.forEach(function (L) {
    L.grp.rotation.x = 0; L.grp.rotation.z = 0; L.e.ang = 0.7;
    var discs = [];
    L.grp.traverse(function (o) { if (o.name === "rotordisc" && o.material) discs.push(o); });
    L.discs = discs;
  });
  draw(1);
  var rpm = 1, spoolBad = 0, spoolWorst = 0, discBad = 0, discWorst = 0, n = 0;
  function spoolStep(want) {
    var spool = (want > rpm ? 0.55 : 0.32) * DT;
    rpm = Math.max(0, Math.min(1, rpm + Math.max(-spool, Math.min(spool, want - rpm))));
  }
  function phase(parked, frames) {
    picks.forEach(function (L) { L.e.parked = parked; });
    for (var k = 0; k < frames; k++) {
      var before = picks.map(function (L) { return L.live.map(function (o) { return m3(o.matrixWorld); }); });
      draw(1);
      spoolStep(parked ? 0 : 1); n++;
      picks.forEach(function (L, li) {
        L.live.forEach(function (o, pi) {
          var s = spinOf(before[li][pi], m3(o.matrixWorld));
          var want = o.name === "rotor" ? (rpm > 0.001 ? 28 * DT * rpm : 0) : 40 * DT * rpm;
          var d = Math.abs(s.ang - want);
          if (d > spoolWorst) spoolWorst = d;
          if (d > 1e-4) spoolBad++;
        });
        L.discs.forEach(function (dk) {
          var mt = Array.isArray(dk.material) ? dk.material[0] : dk.material, b = mt.userData.baseOpacity;
          if (b === undefined) return;
          var dd = Math.abs(mt.opacity / b - rpm);
          if (dd > discWorst) discWorst = dd;
          if (dd > 0.021 || dk.visible !== (mt.opacity / b > 0.02)) discBad++;
        });
      });
    }
  }
  phase(true, 120);           // four seconds: from full speed to stopped (1 / 0.32 = 3.1 s)
  var stopped = rpm;
  phase(false, 75);           // two and a half seconds: back up (1 / 0.55 = 1.8 s)
  chk("a parked machine winds down at 0.32 a second and spools up at 0.55, every rotor turning 28 or 40 rad/s times that",
      spoolBad === 0 && stopped === 0 && rpm === 1, n + " frames on " + picks.length + " machines, worst " + spoolWorst.toExponential(2) +
      " rad, " + spoolBad + " off; stopped at " + stopped + ", back to " + rpm);
  chk("the blur disc fades with the rotor and is hidden when it stops", discBad === 0,
      "worst |opacity/base - rpm| " + discWorst.toFixed(4) + ", " + discBad + " off");
}
function fmt(v) { return v > 0 && v < 0.001 ? v.toExponential(1) : v.toFixed(3); }
function pad(s, n) { s = String(s); while (s.length < n) s += " "; return s; }
