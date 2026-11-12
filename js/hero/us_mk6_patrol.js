/* ====== hero/us_mk6_patrol.js - Mark VI patrol boat (US Navy, from 2016) ======
   HERO model for boat_n. Model space follows models3d.js: +X bow, +Y port,
   +Z up, real metres, WATERLINE AT z = 0 (wakes, damage fires and the
   sinking list read the hull from the model). Authored Z-up, never Y-up.

   The boat: Safe Boats International, aluminium hull and superstructure,
   25.9 m (85 ft) overall, 6.2 m beam, about 1.2 m draught, two diesels
   driving two waterjets - so there is no propeller, no rudder and no shaft
   anywhere below the hull; the two nozzles come out of the transom and that
   is all the propulsion there is. Two Mk 38 Mod 2 25 mm stabilised mounts
   (one on the foredeck, one aft) and six pintle-mounted M2 .50 cal round the
   deckhouse (the published standard fit; M240s take the same mounts), and a
   swept mast carrying the radar and the electro-optical ball. Published
   figures it was checked against (Wikipedia infobox, Navy fact file): length
   84.8 ft = 25.85 m, beam 20.5 ft = 6.25 m, draft 4 ft = 1.22 m, in service
   2016. The cues this file exists to carry, all read off the photographs:

     - A high-sided hard-chine planing hull with a deep vee forward, a very
       raked stem and a flat transom. Topsides flare; a dark rubbing strake
       runs the length of the side and dips in a wide U under the deckhouse.
     - A bulwark waist high (about 0.75 m) round the whole weather deck: the
       crew stand BEHIND it in every photograph, visible from the hips up.
       The deck is recessed behind it, so the model has a real deck well.
     - A long deckhouse from 8 m to 21 m abaft the transom: a low aft house
       (four ribbon windows a side) stepping up to the taller pilothouse
       with three raked windscreen panes, corner panes, a side door and a
       ladder on its lower front. Side decks 0.8 m wide go past it.
     - The mast is a tapered pylon swept AFT, carrying the radome ball, and
       an open T-top frame ahead of it with the radar and EO ball on it.
     - Mk 38 Mod 2 forward on a low pedestal, with the barrel 2.8 m above the
       water; the aft one is trained aft, as it sits in every photograph.

   Photographs (Wikimedia Commons, US Navy releases, public domain), all
   read from 960 px thumbnails:
     Mark_VI_patrol_boat_180207-N-AT895-068 - the broadside, San Diego,
       Feb 2018. The whole boat is 912 px long in the thumbnail, so 35.2
       px/m fixed by the 25.9 m overall length; every height below is read
       off it on a metre grid laid over a 1.62x enlargement. The boat is
       planing in that shot, so its waterline is not visible: it is placed
       from the two Mk 38 ring heights and the bulwark, and heights above
       the DECK are measured while heights above the water are good to about
       0.3 m.
     US_Navy_MKVI_patrol_boat and Mk_VI.3 - bow-on, settle the vee, the
       flare, the pilothouse width and the pintle mounts at its front corners.
     Kater-mark-VI - port bow quarter, the bulwark and the side deck.
     A_Mark_VI_patrol_boat_attached_to_CRS-2... and Three_CRS-2's... - from
       above, the plan: the aft deck, the deckhouse width, the hatch.
     Mark_VI_patrol_boat_being_lifted... - the stern.

   Measured, in this file's coordinates (midships x = 0, stem x = +12.95):
     transom x = -12.65, waterjet nozzles reach -12.95
     deck z = 1.25, bulwark top z = 2.00 (freeboard 2.0 at the sheer)
     aft house x = -4.75 .. -0.95, roof z = 3.40
     pilothouse x = -0.95 .. +8.35, roof z = 3.80, windscreen foot x = 8.30
     mast pylon base x = -0.2 .. +1.4, ball centre z = 5.95
     whip tips z = 7.25 (the old model stood 13.3 m tall; the boat is not)
     aft Mk 38 ring x = -7.35, z = 2.15, fore Mk 38 ring x = +10.25, z = 2.20

   MATERIALS are the house three tiers. SKIN: three painted canvases (the
   hull side elevation, the deck non-skid, a plate tile for the house) in
   the haze row of the warship3d.js PAINT table - hull 0x737b83, house
   0x808991, deck 0x484e54 - the colour the whole US Navy small-craft fleet
   wears; METAL, dark fittings, GLASS, an off-white radome; and the team
   material, exactly C.team. Every static part is merged into ONE mesh per
   material (eight), and the forward Mk 38 is its own group in two meshes,
   so the renderer can train it: ten draw calls. ASCII only.            */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMk6Patrol = (function () {
  "use strict";

  var PI = Math.PI;

  /* ------------------------------------------------- principal dimensions */
  var LOA = 25.9, XS = -12.95, XB = 12.95;
  var XT = -12.65;                  /* the transom; the nozzles carry on to XS */
  var ZS = 2.00;                    /* bulwark top, the sheer line             */
  var ZD = 1.25;                    /* the weather deck                        */
  var ZA = 3.40, ZP = 3.80;         /* aft house roof, pilothouse roof         */
  var HZ0 = -1.5, HZ1 = 2.3;        /* hull canvas spans these heights         */
  var PAINT = { hull: 0x737b83, sup: 0x808991, deck: 0x484e54 };

  /* Stations, stern to stem: x, half breadth at the sheer, half breadth at
     the chine, chine height, keel height. The sheer is level at z = 2.0. The
     keel rises into a raked stem from x = +10.95 (forefoot, z = -0.22) to the
     stem head (12.95, 2.0): two metres of length for two of height, as in the
     broadside. The chine climbs with it, which is the deep vee of the
     bow-on photographs. Aft the section is a 24 deg vee, flat enough to plane. */
  var STA = [
    [-12.65, 2.95, 2.30, -0.05, -0.85],
    [-11.50, 3.02, 2.40, -0.08, -0.96],
    [-10.00, 3.06, 2.48, -0.10, -1.05],
    [ -8.00, 3.09, 2.53, -0.11, -1.12],
    [ -6.00, 3.10, 2.55, -0.12, -1.18],
    [ -3.00, 3.10, 2.53, -0.09, -1.21],
    [ -1.00, 3.10, 2.50, -0.05, -1.22],
    [  1.00, 3.07, 2.43,  0.00, -1.21],
    [  3.00, 3.02, 2.35,  0.05, -1.20],
    [  4.50, 2.90, 2.20,  0.14, -1.14],
    [  6.00, 2.74, 2.00,  0.25, -1.05],
    [  7.25, 2.50, 1.72,  0.40, -0.90],
    [  8.50, 2.18, 1.40,  0.55, -0.72],
    [  9.25, 1.90, 1.18,  0.70, -0.58],
    [ 10.00, 1.58, 0.95,  0.85, -0.42],
    [ 10.50, 1.36, 0.78,  0.97, -0.30],
    [ 11.00, 1.12, 0.60,  1.10, -0.165],
    [ 11.40, 0.90, 0.47,  1.22,  0.275],
    [ 11.80, 0.68, 0.35,  1.35,  0.715],
    [ 12.10, 0.52, 0.26,  1.48,  1.045],
    [ 12.40, 0.36, 0.17,  1.65,  1.375],
    [ 12.70, 0.19, 0.08,  1.82,  1.705],
    [ 12.95, 0.04, 0.02,  1.98,  1.98]
  ];

  /* ================================================================ helpers */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function rngOf(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hx(c) {
    if (typeof c === "string") return c;
    return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6);
  }
  function mkCv(w, h) {
    var c = document.createElement("canvas"); c.width = w; c.height = h; return c;
  }
  function finish(THREE, cv) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  }

  function staAt(x) {
    var n = STA.length, i, k;
    if (x <= STA[0][0]) return STA[0].slice();
    if (x >= STA[n - 1][0]) return STA[n - 1].slice();
    for (i = 1; i < n; i++) {
      if (x <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i], u = (x - a[0]) / (b[0] - a[0]), o = [x];
        for (k = 1; k < 5; k++) o.push(lerp(a[k], b[k], u));
        return o;
      }
    }
    return STA[n - 1].slice();
  }
  /* half breadth of the skin at height z on a station row                  */
  function skinY(s, z) {
    var ys = s[1], yc = s[2], zc = s[3], zk = s[4];
    if (z >= zc) return yc + (ys - yc) * clamp((z - zc) / (ZS - zc), 0, 1);
    return yc * clamp((z - zk) / (zc - zk), 0, 1);
  }
  /* the weather deck is flat at ZD, but it has to climb with the keel in the
     bow or the open-topped hull would show the sea through the stem        */
  function deckZat(s) { return Math.min(ZS - 0.02, Math.max(ZD, s[4] + 0.03)); }

  /* ------------------------------------------------------------- batching
     Every static part lands in one Batch per material and goes out as one
     mesh. A Batch built with a tile size re-projects its UVs from each
     triangle's own position (box projection, metres / tile), so the plate
     texture keeps one size on every block, rail and hood.                 */
  function Batch(tile) { this.p = []; this.n = []; this.u = []; this.tile = tile || 0; }
  Batch.prototype.add = function (geo) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    if (!g.getAttribute("normal")) g.computeVertexNormals();
    var P = g.getAttribute("position"), N = g.getAttribute("normal"), U = g.getAttribute("uv");
    var i, k = this.tile;
    for (i = 0; i < P.count; i++) {
      this.p.push(P.getX(i), P.getY(i), P.getZ(i));
      this.n.push(N.getX(i), N.getY(i), N.getZ(i));
      if (!k) { if (U) this.u.push(U.getX(i), U.getY(i)); else this.u.push(0, 0); }
    }
    if (k) {
      for (i = 0; i < P.count; i += 3) {
        var ax = P.getX(i), ay = P.getY(i), az = P.getZ(i);
        var bx = P.getX(i + 1) - ax, by = P.getY(i + 1) - ay, bz = P.getZ(i + 1) - az;
        var cx = P.getX(i + 2) - ax, cy = P.getY(i + 2) - ay, cz = P.getZ(i + 2) - az;
        var nx = Math.abs(by * cz - bz * cy), ny = Math.abs(bz * cx - bx * cz), nz = Math.abs(bx * cy - by * cx);
        for (var c = 0; c < 3; c++) {
          var px = P.getX(i + c), py = P.getY(i + c), pz = P.getZ(i + c);
          if (nz >= nx && nz >= ny) this.u.push(px / k, py / k);
          else if (ny >= nx) this.u.push(px / k, pz / k);
          else this.u.push(py / k, pz / k);
        }
      }
    }
    return this;
  };
  Batch.prototype.raw = function (pos, nrm, uv) {
    Array.prototype.push.apply(this.p, pos);
    Array.prototype.push.apply(this.n, nrm);
    Array.prototype.push.apply(this.u, uv);
  };
  Batch.prototype.mesh = function (THREE, mtl) {
    if (!this.p.length) return null;
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(this.u, 2));
    return new THREE.Mesh(g, mtl);
  };

  /* geometry placed in model space: rotate (XYZ Euler), then translate    */
  var _o = null;
  function place(THREE, geo, x, y, z, rx, ry, rz) {
    if (!_o) _o = new THREE.Object3D();
    _o.position.set(x || 0, y || 0, z || 0);
    _o.rotation.set(rx || 0, ry || 0, rz || 0);
    _o.scale.set(1, 1, 1);
    _o.updateMatrix();
    geo.applyMatrix4(_o.matrix);
    return geo;
  }
  function box(THREE, lx, ly, lz, x, y, z, rx, ry, rz) {
    return place(THREE, new THREE.BoxGeometry(lx, ly, lz), x, y, z, rx, ry, rz);
  }
  /* vertical cylinder (axis +Z) standing on z0                            */
  function cylZ(THREE, rt, rb, h, seg, x, y, z0, open) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, !!open);
    g.rotateX(PI / 2);
    return place(THREE, g, x, y, z0 + h * 0.5);
  }
  /* cylinder along +X from x0 (radius rb) to x0 + len (radius rt)          */
  function cylX(THREE, rt, rb, len, seg, x0, y, z, open) {
    var g = new THREE.CylinderGeometry(rt, rb, len, seg, 1, !!open);
    g.rotateZ(-PI / 2);
    return place(THREE, g, x0 + len * 0.5, y, z);
  }
  /* a round bar between two points: rails, posts, whips, struts           */
  var _v0 = null, _v1 = null;
  function strut(THREE, ax, ay, az, bx, by, bz, r, seg, r2, open) {
    if (!_v0) { _v0 = new THREE.Vector3(0, 1, 0); _v1 = new THREE.Vector3(); }
    var dx = bx - ax, dy = by - ay, dz = bz - az;
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new THREE.CylinderGeometry(r2 === undefined ? r : r2, r, Math.max(L, 1e-4), seg || 5, 1, !!open);
    var q = new THREE.Quaternion().setFromUnitVectors(_v0, _v1.set(dx, dy, dz).normalize());
    g.applyQuaternion(q);
    g.translate((ax + bx) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
    return g;
  }
  function sphere(THREE, r, ws, hs, x, y, z, half) {
    var g = new THREE.SphereGeometry(r, ws, hs, 0, PI * 2, 0, half ? PI * 0.5 : PI);
    g.rotateX(PI / 2);                             /* poles on the Z axis    */
    return place(THREE, g, x, y, z);
  }

  /* The outline, counter-clockwise seen from above                        */
  function ccw(pts) {
    var a = 0, i, n = pts.length;
    for (i = 0; i < n; i++) {
      var p = pts[i], q = pts[(i + 1) % n];
      a += p[0] * q[1] - q[0] * p[1];
    }
    return a < 0 ? pts.slice().reverse() : pts;
  }
  /* A solid lofted through a stack of plan outlines, each [pts, z], every
     outline with the same number of corners in the same order: how each
     block of the house gets its inboard lean and its raked front. capTop /
     capBot close the ends with a fan.                                     */
  function stack(THREE, rings, capTop, capBot) {
    var pos = [], i, k, n = rings[0][0].length;
    var R = rings.map(function (r) { return { p: ccw(r[0]), z: r[1] }; });
    function P(ri, kk) { var q = R[ri].p[kk % n]; return [q[0], q[1], R[ri].z]; }
    function tri(a, b, c) { pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]); }
    for (i = 0; i < R.length - 1; i++) {
      for (k = 0; k < n; k++) {
        tri(P(i, k), P(i, k + 1), P(i + 1, k + 1));
        tri(P(i, k), P(i + 1, k + 1), P(i + 1, k));
      }
    }
    var top = R.length - 1;
    if (capTop) for (k = 1; k < n - 1; k++) tri(P(top, 0), P(top, k), P(top, k + 1));
    if (capBot) for (k = 1; k < n - 1; k++) tri(P(0, 0), P(0, k + 1), P(0, k));
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  /* house outline: square aft corners, chamfered forward corners           */
  function housePoly(xa, xf, hw, ch) {
    return [[xa, -hw], [xf - ch, -hw], [xf, -hw + ch], [xf, hw - ch], [xf - ch, hw], [xa, hw]];
  }
  function rectPoly(x0, x1, hw) { return [[x0, -hw], [x1, -hw], [x1, hw], [x0, hw]]; }

  /* a flat quad a-b-c-d (around the perimeter), turned to face `out` and
     lifted `off` metres along it: windows, doors, panels                   */
  function quadGeo(THREE, a, b, c, d, out, off) {
    var L = Math.sqrt(out[0] * out[0] + out[1] * out[1] + out[2] * out[2]) || 1;
    var P = [a, b, c, d].map(function (p) {
      return off ? [p[0] + out[0] / L * off, p[1] + out[1] / L * off, p[2] + out[2] / L * off] : p;
    });
    var ux = P[1][0] - P[0][0], uy = P[1][1] - P[0][1], uz = P[1][2] - P[0][2];
    var vx = P[3][0] - P[0][0], vy = P[3][1] - P[0][1], vz = P[3][2] - P[0][2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var ord = (nx * out[0] + ny * out[1] + nz * out[2] >= 0) ? [0, 1, 2, 0, 2, 3] : [0, 2, 1, 0, 3, 2];
    var pos = [];
    ord.forEach(function (k) { pos.push(P[k][0], P[k][1], P[k][2]); });
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }

  /* ------------------------------------------------------- FITTINGS KIT
     (detail pass) the small deck fittings every photograph shows and a
     profile drawing leaves out: rails and lifelines, bollards, fairleads,
     hatches, vents, raft canisters, ladders, the anchor in its hawse,
     scuttles, whips, davits and boats.  Each one is emitted as outward-
     wound triangles into a SINK, anything with a tri(a, b, c) method, so it
     merges into the material bins already here and costs no draw call.
     FK.Sink() is a sink of its own whose geo(THREE) gives a flat-shaded
     BufferGeometry for the kit's mesh batches.  All sizes in metres.    */
  var FK = (function () {
    var TW = Math.PI * 2;
    function sb(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
    function cr(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
    function dt(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
    function nz(v) { var l = Math.sqrt(dt(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
    function ad(a, b, k) { return [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k]; }
    /* a triangle; with ref given it is turned to face away from ref     */
    function tri(s, a, b, c, ref) {
      var n = cr(sb(b, a), sb(c, a));
      if (dt(n, n) < 1e-14) return;
      if (ref) {
        var m = [(a[0] + b[0] + c[0]) / 3 - ref[0], (a[1] + b[1] + c[1]) / 3 - ref[1], (a[2] + b[2] + c[2]) / 3 - ref[2]];
        if (dt(n, m) < 0) { s.tri(a, c, b); return; }
      }
      s.tri(a, b, c);
    }
    function quad(s, a, b, c, d, ref) { tri(s, a, b, c, ref); tri(s, a, c, d, ref); }
    /* a tube A -> B, radius ra at A and rb at B, n sides, optional caps */
    function tube(s, A, B, ra, rb, n, caps) {
      var d = sb(B, A); if (dt(d, d) < 1e-10) return;
      var ax = nz(d), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
      var u = nz(cr(ax, t)), v = cr(ax, u), RA = [], RB = [], i, j;
      for (i = 0; i < n; i++) {
        var c = Math.cos(i / n * TW + 0.5), sn = Math.sin(i / n * TW + 0.5);
        var r = [u[0] * c + v[0] * sn, u[1] * c + v[1] * sn, u[2] * c + v[2] * sn];
        RA.push(ad(A, r, ra)); RB.push(ad(B, r, rb));
      }
      for (i = 0; i < n; i++) {
        j = (i + 1) % n;
        if (ra > 0) tri(s, RA[i], RA[j], RB[j]);
        if (rb > 0) tri(s, RA[i], RB[j], RB[i]);
        if (caps) { if (rb > 0) tri(s, B, RB[i], RB[j]); if (ra > 0) tri(s, A, RA[j], RA[i]); }
      }
    }
    /* an oriented box: centre c, the frame (ex along, ey across, ez up)  */
    function obox(s, c, ex, ey, ez, lx, ly, lz) {
      var V = [], i, F = [[0, 1, 3, 2], [4, 6, 7, 5], [0, 4, 5, 1], [2, 3, 7, 6], [0, 2, 6, 4], [1, 5, 7, 3]];
      for (i = 0; i < 8; i++) {
        var a = (i & 1 ? 0.5 : -0.5) * lx, b = (i & 2 ? 0.5 : -0.5) * ly, e = (i & 4 ? 0.5 : -0.5) * lz;
        V.push([c[0] + ex[0] * a + ey[0] * b + ez[0] * e, c[1] + ex[1] * a + ey[1] * b + ez[1] * e, c[2] + ex[2] * a + ey[2] * b + ez[2] * e]);
      }
      F.forEach(function (f) { quad(s, V[f[0]], V[f[1]], V[f[2]], V[f[3]], c); });
    }
    /* a box standing on z0, yawed about Z                               */
    function boxZ(s, x, y, z0, lx, ly, lz, yaw) {
      var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
      obox(s, [x, y, z0 + lz / 2], [c, sn, 0], [-sn, c, 0], [0, 0, 1], lx, ly, lz);
    }
    function cylZ(s, x, y, z0, h, r, n, r2) { tube(s, [x, y, z0], [x, y, z0 + h], r, r2 === undefined ? r : r2, n, true); }
    /* a flat disc (scuttle, port, hawse mouth) facing nrm               */
    function disc(s, c, nrm, r, n) {
      var a = nz(nrm), t = Math.abs(a[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], u = nz(cr(a, t)), v = cr(a, u), P = [], i;
      for (i = 0; i < n; i++) P.push(ad(ad(c, u, Math.cos(i / n * TW) * r), v, Math.sin(i / n * TW) * r));
      var back = ad(c, a, -1);
      for (i = 1; i < n - 1; i++) tri(s, P[0], P[i], P[i + 1], back);
    }
    /* guard rail along a polyline of deck points [x, y, z]: stanchions
       every `step`, a top rail at h and a lifeline at h / 2              */
    function rail(s, pts, h, step, rp) {
      var i, k, carry = 0; rp = rp || 0.024; h = h || 1.0; step = step || 1.5;
      function post(p) { tube(s, p, [p[0], p[1], p[2] + h], rp, rp, 4, false); }
      for (i = 0; i < pts.length - 1; i++) {
        var a = pts[i], b = pts[i + 1], d = sb(b, a), L = Math.sqrt(dt(d, d));
        if (L < 1e-3) continue;
        tube(s, [a[0], a[1], a[2] + h], [b[0], b[1], b[2] + h], rp * 0.8, rp * 0.8, 3, false);
        tube(s, [a[0], a[1], a[2] + h * 0.5], [b[0], b[1], b[2] + h * 0.5], rp * 0.55, rp * 0.55, 3, false);
        for (k = carry; k < L; k += step) post(ad(a, d, k / L));
        carry = k - L;
      }
      post(pts[pts.length - 1]);
    }
    /* a toe-rail / deck-edge gutter: a low bar along the deck edge       */
    function toe(s, pts, r) {
      for (var i = 0; i < pts.length - 1; i++) tube(s, pts[i], pts[i + 1], r || 0.04, r || 0.04, 3, false);
    }
    /* double bollard on its base plate, k = scale (1 = a 1.2 m frigate pair) */
    function bollard(s, x, y, z, yaw, k) {
      k = k || 1; var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
      boxZ(s, x, y, z, 0.9 * k, 0.36 * k, 0.05 * k, yaw);
      [-1, 1].forEach(function (e) {
        var px = x + c * e * 0.26 * k, py = y + sn * e * 0.26 * k;
        cylZ(s, px, py, z + 0.05 * k, 0.36 * k, 0.12 * k, 8);
        cylZ(s, px, py, z + 0.41 * k, 0.05 * k, 0.15 * k, 8);
      });
    }
    function cleat(s, x, y, z, yaw, k) {
      k = k || 1; var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
      [-1, 1].forEach(function (e) { cylZ(s, x + c * e * 0.09 * k, y + sn * e * 0.09 * k, z, 0.1 * k, 0.035 * k, 4); });
      boxZ(s, x, y, z + 0.1 * k, 0.42 * k, 0.07 * k, 0.05 * k, yaw);
    }
    /* a roller fairlead at the deck edge, yaw = the line of the edge     */
    function fairlead(s, x, y, z, yaw, k) {
      k = k || 1; var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
      boxZ(s, x, y, z, 0.8 * k, 0.32 * k, 0.07 * k, yaw);
      [-1, 1].forEach(function (e) { cylZ(s, x + c * e * 0.22 * k, y + sn * e * 0.22 * k, z + 0.07 * k, 0.26 * k, 0.09 * k, 8); });
    }
    /* a deck hatch: coaming, lid, hinge bar and dogs                     */
    function hatch(s, x, y, z, lx, ly, yaw) {
      var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
      boxZ(s, x, y, z, lx, ly, 0.10, yaw);
      boxZ(s, x, y, z + 0.10, lx - 0.08, ly - 0.08, 0.04, yaw);
      var hx = x - c * lx * 0.5, hy = y - sn * lx * 0.5;
      tube(s, [hx + sn * ly * 0.4, hy - c * ly * 0.4, z + 0.12], [hx - sn * ly * 0.4, hy + c * ly * 0.4, z + 0.12], 0.035, 0.035, 4, true);
      [-1, 1].forEach(function (e) {
        boxZ(s, x + c * lx * 0.5 - sn * e * ly * 0.3, y + sn * lx * 0.5 + c * e * ly * 0.3, z + 0.03, 0.08, 0.06, 0.1, yaw);
      });
    }
    /* a mushroom vent and a gooseneck vent                               */
    function mushroom(s, x, y, z, r, h) {
      cylZ(s, x, y, z, h, r, 8);
      cylZ(s, x, y, z + h, r * 0.5, r * 1.7, 8, r * 0.6);
    }
    function goose(s, x, y, z, r, h, yaw) {
      var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
      tube(s, [x, y, z], [x, y, z + h], r, r, 6, false);
      tube(s, [x, y, z + h - r], [x + c * r * 2.4, y + sn * r * 2.4, z + h - r * 2.2], r * 1.05, r * 1.15, 6, true);
    }
    /* a life-raft canister on its cradle, axis along yaw: shell to sW,
       the cradle and bands to sM                                         */
    function raft(sW, sM, x, y, z, yaw, L, r) {
      L = L || 1.25; r = r || 0.32;
      var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0), zc = z + r + 0.08;
      tube(sW, [x - c * L / 2, y - sn * L / 2, zc], [x + c * L / 2, y + sn * L / 2, zc], r, r, 10, true);
      [-0.3, 0.3].forEach(function (f) {
        var px = x + c * L * f, py = y + sn * L * f;
        tube(sM, [px - c * 0.04, py - sn * 0.04, zc], [px + c * 0.04, py + sn * 0.04, zc], r * 1.06, r * 1.06, 10, false);
        boxZ(sM, px, py, z, 0.1, r * 1.8, 0.22, yaw);
      });
    }
    /* an inclined or vertical ladder from foot A to head B; side = the
       horizontal unit vector across it                                  */
    function ladder(s, A, B, side, w, step) {
      w = (w || 0.5) / 2; step = step || 0.3;
      var e = [side[0] * w, side[1] * w, 0], d = sb(B, A), L = Math.sqrt(dt(d, d)), n = Math.max(1, Math.floor(L / step)), i;
      tube(s, ad(A, e, 1), ad(B, e, 1), 0.025, 0.025, 4, false);
      tube(s, ad(A, e, -1), ad(B, e, -1), 0.025, 0.025, 4, false);
      for (i = 1; i <= n; i++) { var p = ad(A, d, i / (n + 0.5)); tube(s, ad(p, e, 1), ad(p, e, -1), 0.016, 0.016, 3, false); }
    }
    /* a stockless anchor stowed in its hawse on a hull side; (x, y, z) the
       hawse mouth on the plating, out = outward unit normal [nx, ny, nz] */
    function anchor(s, x, y, z, out, k) {
      k = k || 1;
      var o = nz(out), ez = [0, 0, 1], ex = nz(cr(ez, o)), p = ad([x, y, z], o, 0.10 * k);
      tube(s, [x, y, z], ad([x, y, z], o, 0.14 * k), 0.30 * k, 0.34 * k, 10, true);       /* hawse lip */
      obox(s, ad(p, ez, -0.62 * k), ex, o, ez, 0.17 * k, 0.12 * k, 1.0 * k);             /* shank     */
      obox(s, ad(p, ez, -1.12 * k), ex, o, ez, 0.75 * k, 0.16 * k, 0.16 * k);            /* crown     */
      [-1, 1].forEach(function (e) {
        tube(s, ad(ad(p, ez, -1.12 * k), ex, e * 0.36 * k), ad(ad(p, ez, -0.72 * k), ex, e * 0.24 * k), 0.09 * k, 0.04 * k, 4, true);
      });
    }
    /* a whip aerial, tapering, with a small base insulator               */
    function whip(s, x, y, z, h, r) {
      r = r || 0.03;
      cylZ(s, x, y, z, 0.3, r * 2.5, 6);
      tube(s, [x, y, z + 0.3], [x, y, z + h], r, r * 0.3, 4, false);
    }
    /* a boat davit: post, curved arm reaching out along yaw, the fall    */
    function davit(s, x, y, z, yaw, h, reach) {
      var c = Math.cos(yaw), sn = Math.sin(yaw), t = [x, y, z + h], e = [x + c * reach, y + sn * reach, z + h - 0.2];
      tube(s, [x, y, z], t, 0.07, 0.06, 6, false);
      tube(s, t, [x + c * reach * 0.55, y + sn * reach * 0.55, z + h + 0.2], 0.06, 0.05, 6, false);
      tube(s, [x + c * reach * 0.55, y + sn * reach * 0.55, z + h + 0.2], e, 0.05, 0.045, 6, true);
      tube(s, e, [e[0], e[1], e[2] - 0.9], 0.012, 0.012, 3, false);
    }
    /* a rigid-hull inflatable: grey sponson tubes to sT, floor/console to sH */
    function rib(sT, sH, x, y, z, yaw, L, B) {
      var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0), r = B * 0.2;
      function P(a, b, h) { return [x + c * a - sn * b, y + sn * a + c * b, z + h]; }
      [-1, 1].forEach(function (e) {
        tube(sT, P(-L / 2, e * (B / 2 - r), r), P(L * 0.22, e * (B / 2 - r), r), r, r, 7, true);
        tube(sT, P(L * 0.22, e * (B / 2 - r), r), P(L / 2, e * r * 0.3, r * 1.4), r, r * 0.6, 7, true);
      });
      obox(sH, P(-L * 0.04, 0, r * 0.5), [c, sn, 0], [-sn, c, 0], [0, 0, 1], L * 0.86, B - 2 * r, r * 0.9);
      boxZ(sH, x - c * L * 0.08, y - sn * L * 0.08, z + r, L * 0.16, B * 0.35, r * 2.2, yaw);
    }
    /* a sink of the kit's own                                            */
    function Sink() { this.p = []; }
    Sink.prototype.tri = function (a, b, c) { this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]); };
    Sink.prototype.geo = function (THREE, tile) {
      if (!this.p.length) return null;
      var P = this.p, U = [], i, q = 1 / (tile || 4);
      for (i = 0; i < P.length; i += 9) {
        var n = cr(sb([P[i + 3], P[i + 4], P[i + 5]], [P[i], P[i + 1], P[i + 2]]), sb([P[i + 6], P[i + 7], P[i + 8]], [P[i], P[i + 1], P[i + 2]]));
        var ax = Math.abs(n[0]), ay = Math.abs(n[1]), az = Math.abs(n[2]);
        for (var k = 0; k < 9; k += 3) {
          if (az >= ax && az >= ay) U.push(P[i + k] * q, P[i + k + 1] * q);
          else if (ay >= ax) U.push(P[i + k] * q, P[i + k + 2] * q);
          else U.push(P[i + k + 1] * q, P[i + k + 2] * q);
        }
      }
      var g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(U, 2));
      g.computeVertexNormals();
      return g;
    };
    /* weathering laid over a painted canvas: rust runs from fittings,
       salt bloom, grime patches, drips.  w x h the canvas, n the density */
    function weather(g, w, h, seed, n, strength) {
      var s = (seed >>> 0) || 11, i, a = strength || 1;
      function R() { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }
      n = n || 30;
      for (i = 0; i < n; i++) {
        var x = R() * w, y = R() * h, l = h * (0.05 + R() * 0.22), gr = g.createLinearGradient(0, y, 0, y + l);
        gr.addColorStop(0, "rgba(92,52,30," + (0.30 * a).toFixed(3) + ")"); gr.addColorStop(1, "rgba(92,52,30,0)");
        g.fillStyle = gr; g.fillRect(x, y, 1 + R() * 2.2, l);
      }
      for (i = 0; i < n * 0.6; i++) {
        var x2 = R() * w, y2 = R() * h, l2 = h * (0.04 + R() * 0.14), g2 = g.createLinearGradient(0, y2, 0, y2 + l2);
        g2.addColorStop(0, "rgba(20,22,24," + (0.22 * a).toFixed(3) + ")"); g2.addColorStop(1, "rgba(20,22,24,0)");
        g.fillStyle = g2; g.fillRect(x2, y2, 1 + R() * 3, l2);
      }
      g.fillStyle = "#ffffff";
      for (i = 0; i < n * 0.4; i++) { g.globalAlpha = 0.04 * a + R() * 0.04 * a; g.fillRect(R() * w, R() * h, w * (0.03 + R() * 0.08), h * (0.02 + R() * 0.06)); }
      g.fillStyle = "#1a1c1e";
      for (i = 0; i < n * 0.4; i++) { g.globalAlpha = 0.04 * a + R() * 0.05 * a; g.fillRect(R() * w, R() * h, w * (0.04 + R() * 0.1), h * (0.01 + R() * 0.04)); }
      g.globalAlpha = 1;
    }
    return { tri: tri, quad: quad, tube: tube, obox: obox, boxZ: boxZ, cylZ: cylZ, disc: disc, rail: rail, toe: toe,
             bollard: bollard, cleat: cleat, fairlead: fairlead, hatch: hatch, mushroom: mushroom, goose: goose,
             raft: raft, ladder: ladder, anchor: anchor, whip: whip, davit: davit, rib: rib, Sink: Sink, weather: weather };
  })();

  /* ============================================================= textures */
  var TEX = {};

  /* the hull side elevation. u runs transom (0) to stem head (1), v is
     height from HZ0 to HZ1; the loft's UVs are replaced with exactly that,
     the only way a rubbing strake and a wet band survive on a faceted hull */
  function hullTex(THREE) {
    if (TEX.hull) return TEX.hull;
    var W = 1024, H = 256, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(60711), i, x, pxm = H / (HZ1 - HZ0);
    function yOf(z) { return (HZ1 - z) * pxm; }
    function xOf(xx) { return (xx - XS) / LOA * W; }
    g.fillStyle = hx(PAINT.hull); g.fillRect(0, 0, W, H);
    for (i = 0; i < 100; i++) {
      g.globalAlpha = 0.03 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 30 + R() * 150, 8 + R() * 30);
    }
    g.globalAlpha = 1;
    /* aluminium plate seams every 1.3 m, the light catching each edge     */
    for (x = XS + 1.3; x < XB; x += 1.3) {
      g.strokeStyle = "rgba(0,0,0,0.14)"; g.lineWidth = 1.2;
      g.beginPath(); g.moveTo(xOf(x), 0); g.lineTo(xOf(x), H); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.06)";
      g.beginPath(); g.moveTo(xOf(x) + 1.6, 0); g.lineTo(xOf(x) + 1.6, H); g.stroke();
    }
    /* the wet lower hull: below the waterline everything is darker         */
    g.fillStyle = "rgba(8,16,20,0.34)"; g.fillRect(0, yOf(0.04), W, H - yOf(0.04));
    g.fillStyle = "rgba(8,16,20,0.20)"; g.fillRect(0, yOf(-0.50), W, H - yOf(-0.50));
    /* the rubbing strake: along the side, then a wide U under the house    */
    var RUB = [[-12.60, 0.55], [-11.40, 1.12], [-4.95, 1.12], [-4.45, 1.00], [-4.05, 0.50],
               [-3.80, 0.12], [-3.40, 0.02], [-1.95, 0.02], [-1.55, 0.10], [-1.25, 0.50],
               [-1.00, 1.05], [-0.90, 1.60], [-0.85, 2.05]];
    g.strokeStyle = "rgba(14,18,22,0.80)"; g.lineWidth = 5; g.lineJoin = "round";
    g.beginPath();
    for (i = 0; i < RUB.length; i++) {
      if (i === 0) g.moveTo(xOf(RUB[i][0]), yOf(RUB[i][1])); else g.lineTo(xOf(RUB[i][0]), yOf(RUB[i][1]));
    }
    g.stroke();
    /* the dark band along the sheer, under the bulwark cap                 */
    g.fillStyle = "rgba(0,0,0,0.22)"; g.fillRect(0, yOf(2.0), W, 0.07 * pxm);
    /* scuppers and a pair of small ports on the forward topsides           */
    g.fillStyle = "rgba(10,14,18,0.85)";
    g.fillRect(xOf(7.9), yOf(1.50), 0.50 / LOA * W, 0.16 * pxm);
    g.fillRect(xOf(8.7), yOf(1.50), 0.50 / LOA * W, 0.16 * pxm);
    g.fillRect(xOf(-12.1), yOf(1.00), 0.42 / LOA * W, 0.14 * pxm);
    /* detail pass: the black boot-topping band at the waterline, salt and
       grime runs down the topsides from the scuppers and the strake       */
    g.fillStyle = "rgba(12,14,16,0.85)"; g.fillRect(0, yOf(0.22), W, 0.30 * pxm);
    g.fillStyle = "rgba(255,255,255,0.10)"; g.fillRect(0, yOf(0.24), W, 1.2);
    FK.weather(g, W, yOf(0.25), 60711, 46, 0.9);
    return (TEX.hull = finish(THREE, cv));
  }
  function deckTex(THREE) {
    if (TEX.deck) return TEX.deck;
    var W = 256, cv = mkCv(W, W), g = cv.getContext("2d"), R = rngOf(4417), i;
    g.fillStyle = hx(PAINT.deck); g.fillRect(0, 0, W, W);
    for (i = 0; i < 900; i++) {
      g.globalAlpha = 0.10 + R() * 0.16;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * W, 1 + R() * 2.2, 1 + R() * 2.2);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 1.6;
    for (i = 0; i < 3; i++) {
      g.beginPath(); g.moveTo(i * 86 + 2, 0); g.lineTo(i * 86 + 2, W); g.stroke();
      g.beginPath(); g.moveTo(0, i * 86 + 2); g.lineTo(W, i * 86 + 2); g.stroke();
    }
    FK.weather(g, W, W, 4417, 14, 0.6);
    return (TEX.deck = finish(THREE, cv));
  }
  function supTex(THREE) {
    if (TEX.sup) return TEX.sup;
    var W = 256, cv = mkCv(W, W), g = cv.getContext("2d"), R = rngOf(31207), i;
    g.fillStyle = hx(PAINT.sup); g.fillRect(0, 0, W, W);
    for (i = 0; i < 60; i++) {
      g.globalAlpha = 0.03 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * W, 20 + R() * 70, 8 + R() * 30);
    }
    g.globalAlpha = 1;
    for (i = 0; i < 4; i++) {
      g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.5;
      g.beginPath(); g.moveTo(i * 64 + 1, 0); g.lineTo(i * 64 + 1, W); g.stroke();
      g.beginPath(); g.moveTo(0, i * 64 + 1); g.lineTo(W, i * 64 + 1); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.09)"; g.lineWidth = 1;
      g.beginPath(); g.moveTo(i * 64 + 3, 0); g.lineTo(i * 64 + 3, W); g.stroke();
      g.beginPath(); g.moveTo(0, i * 64 + 3); g.lineTo(W, i * 64 + 3); g.stroke();
    }
    /* rivet lines along the seams and the grime of a working boat         */
    g.fillStyle = "rgba(0,0,0,0.22)";
    for (i = 0; i < 4; i++) for (var j = 0; j < 32; j++) { g.fillRect(i * 64 + 6, j * 8 + 2, 1.5, 1.5); g.fillRect(j * 8 + 2, i * 64 + 6, 1.5, 1.5); }
    FK.weather(g, W, W, 31207, 22, 0.7);
    return (TEX.sup = finish(THREE, cv));
  }

  /* ============================================================== the hull */
  function hullArrays() {
    var pos = [], nrm = [], uv = [], i, j, N = STA.length;
    function tri3(a, b, c, ref) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var ar = Math.sqrt(nx * nx + ny * ny + nz * nz);
      if (ar < 1e-7) return;
      var cx = (a[0] + b[0] + c[0]) / 3 - ref[0], cy = (a[1] + b[1] + c[1]) / 3 - ref[1], cz = (a[2] + b[2] + c[2]) / 3 - ref[2];
      if (nx * cx + ny * cy + nz * cz < 0) { var t = b; b = c; c = t; nx = -nx; ny = -ny; nz = -nz; }
      var Q = [a, b, c];
      for (var k = 0; k < 3; k++) {
        pos.push(Q[k][0], Q[k][1], Q[k][2]);
        nrm.push(nx / ar, ny / ar, nz / ar);
        uv.push((Q[k][0] - XS) / LOA, (Q[k][2] - HZ0) / (HZ1 - HZ0));
      }
    }
    function sec(s) { return [[s[1], ZS], [s[2], s[3]], [0, s[4]], [-s[2], s[3]], [-s[1], ZS]]; }
    for (i = 0; i < N - 1; i++) {
      var s0 = STA[i], s1 = STA[i + 1], A = sec(s0), B = sec(s1);
      var ref = [(s0[0] + s1[0]) / 2, 0, ((s0[4] + ZS) / 2 + (s1[4] + ZS) / 2) / 2];
      for (j = 0; j < 4; j++) {
        var a = [s0[0], A[j][0], A[j][1]], b = [s0[0], A[j + 1][0], A[j + 1][1]];
        var c = [s1[0], B[j + 1][0], B[j + 1][1]], d = [s1[0], B[j][0], B[j][1]];
        tri3(a, b, c, ref); tri3(a, c, d, ref);
      }
    }
    /* the transom: a flat cap, facing aft                                  */
    var T0 = sec(STA[0]), tr = [XT + 5, 0, 0.5];
    function P0(k) { return [XT, T0[k][0], T0[k][1]]; }
    tri3(P0(0), P0(1), P0(2), tr); tri3(P0(0), P0(2), P0(3), tr); tri3(P0(0), P0(3), P0(4), tr);
    return { pos: pos, nrm: nrm, uv: uv };
  }

  /* the deck plate, the bulwark inner wall and its cap */
  function deckParts(THREE) {
    var out = { D: [], S: [] }, i, sd, N = STA.length;
    function quad(list, a, b, c, d, dir) { list.push(quadGeo(THREE, a, b, c, d, dir, 0)); }
    for (i = 0; i < N - 1; i++) {
      var s0 = STA[i], s1 = STA[i + 1];
      var z0 = deckZat(s0), z1 = deckZat(s1), y0 = skinY(s0, z0), y1 = skinY(s1, z1);
      quad(out.D, [s0[0], -y0, z0], [s1[0], -y1, z1], [s1[0], y1, z1], [s0[0], y0, z0], [0, 0, 1]);
      for (sd = -1; sd <= 1; sd += 2) {
        var t0 = Math.min(0.10, s0[1] * 0.45), t1 = Math.min(0.10, s1[1] * 0.45);
        var o0 = [s0[0], sd * s0[1], ZS], o1 = [s1[0], sd * s1[1], ZS];
        var n0 = [s0[0], sd * (s0[1] - t0), ZS], n1 = [s1[0], sd * (s1[1] - t1), ZS];
        var l0 = [s0[0], sd * y0, z0], l1 = [s1[0], sd * y1, z1];
        quad(out.S, o0, o1, n1, n0, [0, 0, 1]);                 /* the cap  */
        quad(out.S, n0, n1, l1, l0, [0, -sd, 0]);               /* inner wall */
      }
    }
    /* inside face of the transom bulwark, and its cap                      */
    var s = STA[0], y = skinY(s, ZD), tt = 0.10;
    quad(out.S, [XT, -s[1], ZS], [XT, s[1], ZS], [XT + tt, s[1] - tt, ZS], [XT + tt, -s[1] + tt, ZS], [0, 0, 1]);
    quad(out.S, [XT + tt, -s[1] + tt, ZS], [XT + tt, s[1] - tt, ZS], [XT + tt, y, ZD], [XT + tt, -y, ZD], [1, 0, 0]);
    return out;
  }

  /* ============================================================ the guns */
  /* Mk 38 Mod 2: origin on the ring centre, gun along +X. Returns parts as
     [material key, geometry]; the pedestal below it belongs to the deck.   */
  function mk38Parts(THREE) {
    var P = [];
    P.push(["S", cylZ(THREE, 0.38, 0.42, 0.14, 14, 0, 0, 0)]);
    P.push(["S", cylZ(THREE, 0.30, 0.34, 0.30, 12, 0, 0, 0.14)]);
    P.push(["S", box(THREE, 0.78, 0.58, 0.38, 0.04, 0, 0.64)]);          /* housing         */
    P.push(["S", box(THREE, 0.44, 0.40, 0.30, 0.52, 0, 0.60)]);          /* cradle nose     */
    P.push(["S", box(THREE, 0.32, 0.24, 0.34, -0.12, 0.43, 0.60)]);      /* ammunition can  */
    P.push(["S", box(THREE, 0.22, 0.30, 0.20, -0.32, 0, 0.62)]);         /* rear box        */
    P.push(["S", box(THREE, 0.40, 0.07, 0.34, 0.30, 0.34, 0.62)]);       /* cheek plates    */
    P.push(["S", box(THREE, 0.40, 0.07, 0.34, 0.30, -0.34, 0.62)]);
    P.push(["S", box(THREE, 0.30, 0.26, 0.10, 0.02, 0, 0.88)]);          /* top hatch       */
    P.push(["K", box(THREE, 0.08, 0.22, 0.12, 0.76, 0, 0.62)]);          /* feed-out port   */
    P.push(["K", strut(THREE, -0.10, 0.34, 0.74, 0.20, 0.12, 0.68, 0.03, 6)]); /* belt chute  */
    P.push(["K", cylX(THREE, 0.062, 0.070, 0.60, 8, 0.62, 0, 0.62)]);    /* shroud          */
    P.push(["K", cylX(THREE, 0.040, 0.042, 1.30, 8, 0.70, 0, 0.62)]);    /* the 25 mm       */
    P.push(["K", cylX(THREE, 0.068, 0.058, 0.18, 8, 1.84, 0, 0.62)]);    /* muzzle brake    */
    P.push(["K", cylZ(THREE, 0.05, 0.06, 0.16, 8, -0.06, -0.26, 0.83)]); /* sensor stalk    */
    P.push(["K", sphere(THREE, 0.15, 8, 5, -0.06, -0.26, 1.05)]);         /* EO ball         */
    return P;
  }
  /* an M2 .50 cal on a pintle: origin at the foot of the stand, gun along +X */
  function pintleParts(THREE) {
    return [
      ["M", cylZ(THREE, 0.035, 0.045, 0.80, 6, 0, 0, 0, true)],
      ["K", box(THREE, 0.34, 0.11, 0.16, 0.10, 0, 0.88)],
      ["K", cylX(THREE, 0.020, 0.024, 1.00, 6, 0.27, 0, 0.90)],
      ["K", cylX(THREE, 0.032, 0.032, 0.14, 6, 1.22, 0, 0.90)],
      ["K", box(THREE, 0.06, 0.12, 0.20, -0.10, 0, 0.82)]
    ];
  }

  /* ================================================================ build */
  function build(THREE, M, C) {
    var root = new THREE.Group();
    var i, k, x, sd;
    var team = C && C.team !== undefined ? C.team : "#d6503f";

    var T = {};
    T.H = new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.86, metalness: 0.08 });
    T.D = new THREE.MeshStandardMaterial({ color: 0xffffff, map: deckTex(THREE), roughness: 0.94, metalness: 0.04 });
    T.S = new THREE.MeshStandardMaterial({ color: 0xffffff, map: supTex(THREE), roughness: 0.87, metalness: 0.07 });
    T.M = new THREE.MeshStandardMaterial({ color: 0x59616a, roughness: 0.55, metalness: 0.42 });
    T.K = new THREE.MeshStandardMaterial({ color: 0x1b1f23, roughness: 0.78, metalness: 0.14 });
    /* glass is lifted 2 cm off the wall, about 4 cm after the naval scale:
       pulled toward the camera so it never flickers against the plating   */
    T.G = new THREE.MeshStandardMaterial({ color: 0x0f1a22, roughness: 0.10, metalness: 0.0, transparent: true, opacity: 0.88,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    T.W = new THREE.MeshStandardMaterial({ color: 0xc4c8c8, roughness: 0.65, metalness: 0.05 });
    /* the team material, exactly C.team, pulled toward the camera because
       its panels lie flat on a roof                                       */
    T.T = new THREE.MeshStandardMaterial({ color: new THREE.Color(team), roughness: 0.60, metalness: 0.10,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    var B = {};
    Object.keys(T).forEach(function (kk) { B[kk] = new Batch(kk === "S" || kk === "D" ? 6 : 0); });

    function emit(parts, px, py, pz, yaw, pitch) {
      parts.forEach(function (pp) {
        var g = pp[1];
        if (pitch) g.rotateY(-pitch);
        if (yaw) g.rotateZ(yaw);
        g.translate(px, py, pz);
        B[pp[0]].add(g);
      });
    }

    /* ----------------------------------------------------------- hull */
    var hg = hullArrays();
    B.H.raw(hg.pos, hg.nrm, hg.uv);
    var dp = deckParts(THREE);
    dp.D.forEach(function (g) { B.D.add(g); });
    dp.S.forEach(function (g) { B.S.add(g); });

    /* the two waterjet nozzles come out of the transom; they are all the
       propulsion there is                                                  */
    for (sd = -1; sd <= 1; sd += 2) {
      B.K.add(cylX(THREE, 0.34, 0.28, 0.60, 12, XS, sd * 1.30, -0.30));
      B.M.add(cylX(THREE, 0.36, 0.36, 0.10, 12, XT - 0.10, sd * 1.30, -0.30));
      B.K.add(box(THREE, 0.40, 0.26, 0.22, XT - 0.06, sd * 0.55, 0.45));      /* exhaust vents */
    }
    /* the hatch on the aft deck and four bollards                         */
    B.S.add(cylZ(THREE, 0.72, 0.76, 0.08, 18, -10.00, 0, ZD));
    B.K.add(cylZ(THREE, 0.05, 0.05, 0.02, 8, -10.00, 0, ZD + 0.08));
    for (sd = -1; sd <= 1; sd += 2) {
      B.K.add(cylZ(THREE, 0.09, 0.11, 0.34, 8, -11.80, sd * 2.45, ZD));
      B.K.add(cylZ(THREE, 0.09, 0.11, 0.34, 8, 9.40, sd * 1.15, ZD));
    }
    B.K.add(box(THREE, 0.50, 0.40, 0.28, 11.00, 0, ZD + 0.14));               /* the windlass */

    /* ------------------------------------------------------- the house */
    var AHP = [[rectPoly(-4.75, -0.95, 2.15), ZD], [rectPoly(-4.75, -0.95, 2.00), ZA]];
    B.S.add(stack(THREE, AHP, true, false));
    var PH = { z: [ZD, 2.20, ZP], xa: [-0.95, -0.95, -0.80], xf: [8.35, 8.30, 5.55], hw: [2.15, 2.10, 1.75], ch: [0.95, 0.95, 0.80] };
    var PHR = [0, 1, 2].map(function (q) { return [housePoly(PH.xa[q], PH.xf[q], PH.hw[q], PH.ch[q]), PH.z[q]]; });
    B.S.add(stack(THREE, PHR, true, false));
    function phY(z) {
      if (z <= PH.z[1]) return lerp(PH.hw[0], PH.hw[1], (z - PH.z[0]) / (PH.z[1] - PH.z[0]));
      return lerp(PH.hw[1], PH.hw[2], clamp((z - PH.z[1]) / (PH.z[2] - PH.z[1]), 0, 1));
    }
    function ahY(z) { return lerp(2.15, 2.00, (z - ZD) / (ZA - ZD)); }
    function wall(bt, wy, sdd, x0, x1, z0, z1, off) {
      bt.add(quadGeo(THREE, [x0, sdd * wy(z0), z0], [x1, sdd * wy(z0), z0], [x1, sdd * wy(z1), z1], [x0, sdd * wy(z1), z1], [0, sdd, 0], off));
    }

    for (sd = -1; sd <= 1; sd += 2) {
      /* aft house: four ribbon windows a side, a door on the after face   */
      [-3.95, -3.00, -2.05, -1.35].forEach(function (xc) {
        wall(B.G, ahY, sd, xc - 0.30, xc + 0.30, 2.54, 2.90, 0.02);
      });
      /* pilothouse: the side door (dark recess), three side windows        */
      wall(B.K, phY, sd, 0.45, 1.55, 1.30, 2.20, 0.02);
      wall(B.K, phY, sd, 0.45, 1.55, 2.20, 2.90, 0.02);
      [2.60, 3.50, 4.40].forEach(function (xc) {
        wall(B.G, phY, sd, xc - 0.35, xc + 0.35, 3.15, 3.60, 0.02);
      });
      /* the chamfer panes wrap the corner of the windscreen */
      var c2a = [PH.xf[1] - PH.ch[1], sd * PH.hw[1]], c2b = [PH.xf[1], sd * (PH.hw[1] - PH.ch[1])];
      var c3a = [PH.xf[2] - PH.ch[2], sd * PH.hw[2]], c3b = [PH.xf[2], sd * (PH.hw[2] - PH.ch[2])];
      var s0 = 0.14, s1 = 0.86, t0 = 0.26, t1 = 0.88;
      function cp(s, t) {
        var a2 = [lerp(c2a[0], c2b[0], s), lerp(c2a[1], c2b[1], s)], a3 = [lerp(c3a[0], c3b[0], s), lerp(c3a[1], c3b[1], s)];
        return [lerp(a2[0], a3[0], t), lerp(a2[1], a3[1], t), lerp(PH.z[1], PH.z[2], t)];
      }
      B.G.add(quadGeo(THREE, cp(s0, t0), cp(s1, t0), cp(s1, t1), cp(s0, t1), [0.8, sd * 0.8, 0.7], 0.025));
    }
    /* three raked windscreen panes */
    function fp(s, t) {
      return [lerp(PH.xf[1], PH.xf[2], t), lerp(PH.hw[1] - PH.ch[1], PH.hw[2] - PH.ch[2], t) * s, lerp(PH.z[1], PH.z[2], t)];
    }
    [[-0.97, -0.36], [-0.30, 0.30], [0.36, 0.97]].forEach(function (ss) {
      B.G.add(quadGeo(THREE, fp(ss[0], 0.26), fp(ss[1], 0.26), fp(ss[1], 0.88), fp(ss[0], 0.88), [0.5, 0, 0.865], 0.025));
    });
    /* the door on the after face of the aft house, and its ladder to the roof */
    B.K.add(quadGeo(THREE, [-4.77, 0.30, 1.35], [-4.77, 1.30, 1.35], [-4.77, 1.30, 2.70], [-4.77, 0.30, 2.70], [-1, 0, 0], 0.0));
    for (sd = -1; sd <= 1; sd += 2) {
      B.M.add(strut(THREE, -4.85, -0.55 + sd * 0.22, ZD, -4.85, -0.55 + sd * 0.22, ZA + 0.05, 0.03, 4, undefined, true));
    }
    for (i = 0; i < 6; i++) {
      B.M.add(strut(THREE, -4.85, -0.77, ZD + 0.28 + i * 0.36, -4.85, -0.33, ZD + 0.28 + i * 0.36, 0.02, 4, undefined, true));
    }
    /* the ladder up the lower front of the pilothouse */
    for (sd = -1; sd <= 1; sd += 2) {
      B.M.add(strut(THREE, 8.42, sd * 0.24, ZD, 8.28, sd * 0.24, 2.18, 0.03, 4, undefined, true));
    }
    for (i = 0; i < 3; i++) {
      B.M.add(strut(THREE, 8.40 - i * 0.04, -0.24, ZD + 0.25 + i * 0.30, 8.40 - i * 0.04, 0.24, ZD + 0.25 + i * 0.30, 0.02, 4, undefined, true));
    }

    for (sd = -1; sd <= 1; sd += 2) {
      B.M.add(strut(THREE, 1.70, sd * 2.05, 2.70, 6.20, sd * 2.05, 2.70, 0.02, 4, undefined, true));
      B.M.add(strut(THREE, -4.40, sd * 2.10, 2.30, -1.10, sd * 2.10, 2.30, 0.02, 4, undefined, true));
      B.S.add(box(THREE, 0.45, 0.45, 0.30, -12.00, sd * 1.15, ZD + 0.15));          /* deck vents */
    }
    B.S.add(box(THREE, 0.34, 2.20, 0.05, 5.62, 0, ZP + 0.02));                     /* windscreen visor */
    /* roof gear on the aft house: two equipment boxes, an antenna drum    */
    B.S.add(box(THREE, 1.10, 1.40, 0.85, -2.20, 0.55, ZA + 0.43));
    B.S.add(box(THREE, 0.90, 0.90, 0.60, -1.45, -0.65, ZA + 0.30));
    B.S.add(cylZ(THREE, 0.25, 0.27, 1.25, 12, -4.20, 1.55, ZA));
    B.W.add(sphere(THREE, 0.25, 10, 5, -4.20, 1.55, ZA + 1.25, true));
    B.M.add(strut(THREE, -4.60, -1.95, ZA, -4.60, 1.95, ZA, 0.025, 4, undefined, true));
    B.M.add(strut(THREE, -4.60, -1.95, ZA + 0.55, -4.60, 1.95, ZA + 0.55, 0.025, 4, undefined, true));
    for (i = 0; i < 5; i++) {
      B.M.add(strut(THREE, -4.60, -1.95 + i * 0.975, ZA, -4.60, -1.95 + i * 0.975, ZA + 0.55, 0.025, 4, undefined, true));
    }

    /* --------------------------------------------- mast, radome, T-top */
    var PYL = [[rectPoly(-0.20, 1.40, 0.50), ZP], [rectPoly(-0.80, 0.20, 0.34), 5.55]];
    B.S.add(stack(THREE, PYL, true, false));
    B.M.add(box(THREE, 1.00, 1.10, 0.05, -0.30, 0, 5.58));
    B.W.add(sphere(THREE, 0.32, 12, 7, -0.30, 0, 5.95));
    B.M.add(box(THREE, 0.55, 0.06, 0.40, -0.30, 0, 5.82));
    for (sd = -1; sd <= 1; sd += 2) {
      for (k = 0; k < 2; k++) {
        B.M.add(strut(THREE, 1.65 + k * 1.40, sd * 0.90, ZP, 1.65 + k * 1.40, sd * 0.90, 5.10, 0.03, 4, undefined, true));
      }
      B.M.add(strut(THREE, 1.65, sd * 0.90, 4.50, 3.05, sd * 0.90, 4.50, 0.025, 4, undefined, true));
    }
    B.M.add(box(THREE, 1.60, 2.00, 0.06, 2.35, 0, 5.13));
    B.W.add(cylZ(THREE, 0.30, 0.30, 0.06, 14, 2.00, 0.45, 5.16));
    B.K.add(cylZ(THREE, 0.04, 0.05, 0.16, 6, 2.60, -0.40, 5.16));
    B.K.add(sphere(THREE, 0.17, 10, 6, 2.60, -0.40, 5.40));
    B.W.add(sphere(THREE, 0.13, 8, 5, 2.00, -0.45, 5.30, true));
    /* the two forward searchlight / EO balls at the front roof edge       */
    for (sd = -1; sd <= 1; sd += 2) {
      B.K.add(sphere(THREE, 0.14, 8, 5, 5.40, sd * 1.15, ZP + 0.14));
    }
    B.K.add(box(THREE, 0.03, 0.22, 0.50, 2.90, 0.70, 5.40));                       /* blade antennas */
    B.K.add(box(THREE, 0.03, 0.22, 0.50, 1.80, -0.70, 5.40));
    /* whips and blades: the tallest is 7.25 m above the water             */
    [[-0.55, 0.25, 5.55, 7.25], [-0.45, -0.25, 5.55, 6.85], [1.90, 0.90, 5.13, 6.55], [3.00, -0.90, 5.13, 6.15],
     [-4.35, 1.60, ZA, 5.20], [-4.35, -1.60, ZA, 4.55], [-0.10, 1.40, ZP, 5.00]].forEach(function (w) {
      B.K.add(strut(THREE, w[0], w[1], w[2], w[0], w[1], w[3], 0.014, 4, 0.008, true));
    });

    /* ------------------------------------------------ guard rails */
    function railRun(pts, h, gap) {
      var q, carry = 0, e;
      function post(px, py, pz) { B.M.add(strut(THREE, px, py, pz, px, py, pz + h, 0.026, 4, undefined, true)); }
      for (q = 0; q < pts.length - 1; q++) {
        var a = pts[q], b = pts[q + 1];
        var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (len < 1e-4) continue;
        B.M.add(strut(THREE, a[0], a[1], a[2] + h, b[0], b[1], b[2] + h, 0.022, 4, undefined, true));
        B.M.add(strut(THREE, a[0], a[1], a[2] + h * 0.5, b[0], b[1], b[2] + h * 0.5, 0.018, 4, undefined, true));
        var t = carry;
        for (; t < len; t += gap) post(lerp(a[0], b[0], t / len), lerp(a[1], b[1], t / len), lerp(a[2], b[2], t / len));
        carry = t - len;
      }
      e = pts[pts.length - 1]; post(e[0], e[1], e[2]);
    }
    /* foredeck: along the bulwark top, round the bow and back              */
    var fwdP = [], fwdS = [];
    [8.45, 9.40, 10.30, 11.10, 11.70].forEach(function (xx) {
      var yy = staAt(xx)[1] - 0.06;
      fwdP.push([xx, yy, ZS]); fwdS.push([xx, -yy, ZS]);
    });
    railRun(fwdP.concat(fwdS.slice().reverse()), 0.50, 1.10);
    /* side decks beside the house, on the bulwark top                      */
    for (sd = -1; sd <= 1; sd += 2) {
      railRun([[-0.80, sd * 3.04, ZS], [3.00, sd * 3.08, ZS], [8.40, sd * 2.36, ZS]], 0.50, 1.25);
      /* the aft deck: the broadside photograph shows the bulwark top bare
         from the aft Mk 38 to the aft house and a tubular rail only at the
         stern corners, so that is all there is                              */
      railRun([[-12.30, sd * 2.95, ZS], [-11.30, sd * 3.00, ZS]], 0.45, 0.50);
    }
    /* the ensign staff at the transom, the jackstaff on the stem           */
    B.M.add(strut(THREE, -12.30, 0, ZD, -12.30, 0, 3.55, 0.03, 5, 0.02));
    B.M.add(strut(THREE, 12.30, 0, 1.40, 12.30, 0, 2.60, 0.025, 5, 0.018));

    /* ------------------------------------------------------ the guns */
    /* aft Mk 38: a low pedestal, the mount trained aft, a box of ready
       ammunition on the deck ahead of it                                    */
    B.S.add(stack(THREE, [[rectPoly(-8.10, -6.60, 0.75), ZD], [rectPoly(-7.95, -6.75, 0.60), 2.15]], true, false));
    B.S.add(box(THREE, 1.20, 1.10, 0.80, -5.90, 0, ZD + 0.40));
    emit(mk38Parts(THREE), -7.35, 0, 2.15, PI, 0);
    /* forward Mk 38 pedestal; the mount itself is the trainable "turret"   */
    B.S.add(cylZ(THREE, 0.42, 0.50, 0.95, 16, 10.25, 0, ZD));
    /* the six M2 .50 cals: two on the pilothouse roof stand up and out, two
       on the foredeck flank the windscreen, two on the bulwark amidships   */
    for (sd = -1; sd <= 1; sd += 2) {
      emit(pintleParts(THREE), -0.45, sd * 1.45, ZP, sd * 0.55, 0.45);
      emit(pintleParts(THREE), 8.85, sd * 1.55, ZD, sd * 0.30, 0.08);
      emit(pintleParts(THREE), 3.00, sd * 2.88, ZS, sd * 0.45, 0.06);
    }

    /* ------------------------------------------- fittings (detail pass)
       what the broadside and the bow-on photographs show and the old pass
       left out: cleats and chocks on the bulwark cap, the deck-edge gutter
       inside the bulwark, the bow roller with its anchor, two hatches on
       the aft deck, raft canisters on the aft house roof, louvres, door
       hinges, eyebrows over the side windows, wipers, the roof grab rails
       and a searchlight.  All of it goes into the existing batches.       */
    var fM = new FK.Sink(), fK = new FK.Sink(), fW = new FK.Sink(), fS = new FK.Sink();
    for (sd = -1; sd <= 1; sd += 2) {
      [-11.0, -9.0, -5.4, -0.4, 4.6, 7.6, 10.4].forEach(function (xx) {
        var st = staAt(xx), yy = sd * (st[1] - 0.06);
        FK.cleat(fK, xx, yy, ZS, Math.atan2(staAt(xx + 0.5)[1] - st[1], 0.5) * sd, 0.9);
      });
      FK.fairlead(fK, -12.25, sd * 2.70, ZS - 0.02, 0, 0.55);
      FK.fairlead(fK, 11.30, sd * 0.86, ZS - 0.02, sd * 0.45, 0.55);
      /* the gutter along the foot of the bulwark, on the deck            */
      var gut = [];
      for (x = -12.45; x <= 11.6; x += 0.8) { var st2 = staAt(x), zz = deckZat(st2); gut.push([x, sd * (skinY(st2, zz) - 0.10), zz + 0.03]); }
      FK.toe(fK, gut, 0.035);
      /* the second hatch pair on the aft deck                            */
      FK.hatch(fS, -9.05, sd * 1.70, ZD, 0.70, 0.70, 0);
      /* raft canisters on the aft house roof, one a side                 */
      FK.raft(fW, fM, -3.30, sd * 1.55, ZA, 0, 1.05, 0.29);
      /* louvres low on the aft house and the pilothouse                  */
      wall(B.K, ahY, sd, -4.55, -4.15, 1.55, 2.05, 0.02);
      wall(B.K, phY, sd, 6.05, 6.65, 1.60, 2.00, 0.02);
      wall(B.K, phY, sd, 6.85, 7.45, 1.60, 2.00, 0.02);
      /* hinges and the handle of the pilothouse side door                */
      [1.55, 2.25, 2.75].forEach(function (zz) { FK.boxZ(fM, 0.47, sd * (phY(zz) + 0.03), zz - 0.06, 0.06, 0.05, 0.12, 0); });
      FK.boxZ(fM, 1.42, sd * (phY(2.0) + 0.04), 1.98, 0.14, 0.05, 0.04, 0);
      /* the eyebrow over each side window                                */
      [2.60, 3.50, 4.40].forEach(function (xc) { FK.boxZ(fK, xc, sd * (phY(3.66) + 0.05), 3.63, 0.78, 0.10, 0.04, 0); });
      [-3.95, -3.00, -2.05, -1.35].forEach(function (xc) { FK.boxZ(fK, xc, sd * (ahY(2.95) + 0.05), 2.93, 0.66, 0.10, 0.04, 0); });
      /* the grab rail along the pilothouse roof edge                     */
      FK.rail(fM, [[0.0, sd * 1.55, ZP], [5.0, sd * 1.55, ZP]], 0.16, 1.25, 0.018);
      /* the anchor on its bow roller                                     */
      FK.tube(fM, [11.85, sd * 0.18, 1.98], [12.55, sd * 0.18, 1.86], 0.04, 0.04, 4, false);
    }
    FK.cylZ(fK, 12.55, 0, 1.80, 0.06, 0.09, 8);
    FK.tube(fM, [12.55, -0.16, 1.88], [12.55, 0.16, 1.88], 0.07, 0.07, 8, true);           /* the roller */
    FK.tube(fM, [12.70, 0, 1.86], [11.95, 0, 1.97], 0.045, 0.045, 4, true);                /* shank      */
    FK.obox(fM, [12.78, 0, 1.78], [0.3, 0, 0.95], [0, 1, 0], [0.95, 0, -0.3], 0.12, 0.55, 0.10);  /* crown + flukes */
    FK.tube(fK, [11.95, 0, 1.97], [11.10, 0, ZD + 0.28], 0.02, 0.02, 4, false);            /* the cable  */
    /* wipers on the three windscreen panes                                */
    [-0.66, 0, 0.66].forEach(function (sc) {
      var a = fp(sc - 0.05, 0.30), b = fp(sc + 0.12, 0.78);
      FK.tube(fK, [a[0] + 0.04, a[1], a[2] + 0.02], [b[0] + 0.04, b[1], b[2] + 0.02], 0.014, 0.014, 3, false);
    });
    /* a searchlight and the horn on the pilothouse roof                   */
    FK.cylZ(fK, 4.90, -0.55, ZP, 0.22, 0.05, 6);
    FK.tube(fK, [4.72, -0.55, ZP + 0.34], [5.06, -0.55, ZP + 0.34], 0.12, 0.13, 10, true);
    FK.tube(fK, [4.85, 0.55, ZP + 0.16], [5.15, 0.55, ZP + 0.16], 0.03, 0.09, 8, false);
    FK.boxZ(fK, 4.85, 0.55, ZP, 0.10, 0.08, 0.14, 0);
    /* the hatch and two mushroom vents on the foredeck ahead of the house */
    FK.hatch(fS, 9.10, 0, ZD, 0.55, 0.55, 0);
    FK.mushroom(fK, -11.10, 0.70, ZD, 0.07, 0.30);
    FK.mushroom(fK, -11.10, -0.70, ZD, 0.07, 0.30);
    [[fM, "M"], [fK, "K"], [fW, "W"], [fS, "S"]].forEach(function (q) { var gg = q[0].geo(THREE); if (gg) B[q[1]].add(gg); });

    /* ----------------------------------------------- team colour */
    B.T.add(box(THREE, 1.90, 2.60, 0.03, 4.25, 0, ZP + 0.02));            /* pilothouse roof */
    B.T.add(box(THREE, 1.20, 2.40, 0.03, -3.60, 0, ZA + 0.02));           /* aft house roof  */
    B.T.add(box(THREE, 0.80, 3.80, 0.03, -11.20, 0, ZD + 0.02));          /* aft deck band   */
    B.T.add(box(THREE, 0.04, 0.72, 0.46, -12.30, 0.38, 3.30));            /* the ensign      */
    B.T.add(box(THREE, 0.04, 0.50, 0.30, 12.30, 0.28, 2.40));             /* the jack        */

    /* ------------------------------------ out as one mesh each */
    var NAMES = { H: "hull", D: "deck", S: "house", M: "metal", K: "dark", G: "glass", W: "dome", T: "team" };
    Object.keys(B).forEach(function (kk) {
      var mm = B[kk].mesh(THREE, T[kk]);
      if (mm) { mm.name = NAMES[kk]; root.add(mm); }
    });

    /* the trainable forward mount: one group, ring centre on its origin   */
    var tur = new THREE.Group();
    tur.name = "turret";
    tur.position.set(10.25, 0, 2.20);
    var tb = { S: new Batch(6), K: new Batch(0) };
    mk38Parts(THREE).forEach(function (pp) { tb[pp[0]].add(pp[1]); });
    Object.keys(tb).forEach(function (kk) {
      var mm = tb[kk].mesh(THREE, T[kk]);
      if (mm) { mm.name = "mk38_" + kk; tur.add(mm); }
    });
    root.add(tur);

    root.userData.heroLen = LOA;
    return root;
  }

  return { build: build, len: LOA };
})();

/* Registration. boat_n is the def itself (rules.js, "Mk VI Patrol Boat");
   older eras that stand a period boat in for it resolve to this key too.
   len is the measured X extent, nozzle tips to stem head.                  */
UNIT_MODELS["boat_n"] = {
  len: 25.9,
  build: function (THREE, M, C) { return HeroMk6Patrol.build(THREE, M, C); }
};
