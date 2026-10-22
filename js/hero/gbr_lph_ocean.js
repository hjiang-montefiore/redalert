/* ============================================================================
   gbr_lph_ocean.js -- HERO model: HMS Ocean (L12), the Royal Navy's landing
   platform helicopter. One hull, two keys: gbr_e90_lph (as built, 1998) and
   gbr_e00_lph (the later fit). The rows differ only in the main radar.

   Published figures (en.wikipedia "HMS Ocean (L12)", infobox citing The
   Royal Navy Handbook 2003): 203.4 m long, 35 m beam, 6.5 m draught. The
   game's warship_specs gives 28 m on the waterline. No well deck: four LCVP
   Mk5 on davits (facts.js).

   References, all Wikimedia Commons, named so the next person can check:
     [SIL]  "Royal Navy Ocean silhouette.png" -- the scale drawing: port
            profile, bow left, 420 px for 203.4 m. Island stations, the deck-
            edge crane aft, the stem rake (8.7 m from waterline to deck).
     [SIDE] "HMS Ocean Seitenansicht.JPG" -- a true PORT broadside, bow left,
            6.97 px/m. Read on a metre grid: flight deck edge 16.6 m above
            the waterline, stem rake 8.6 m, the island from x +48 to -40,
            the port boat bays at x -10.5..-27 and -44..-60, windows, the
            gallery, the Phalanx on the bow and on the port quarter.
     [IFOS] "HMS Ocean IFOS2005, cropped" -- STARBOARD side in 2005: the
            island's starboard face flush with the hull side, the starboard
            boat bays (one under "L12", one abaft the tower), the Type 996
            on the tower, the crane, the stern quarter.
     [AIR]  "HMS Ocean, a Landing Platform Helicopter, and various other
            ships ... MOD 45144960" -- aerial, nearly overhead: the deck plan,
            its broad ROUNDED bow, and the forward lift LOWERED (a dark hole)
            inboard of the island's forward block.
     [AST]  "Helicopter Carrier HMS Ocean during Exercise Trident Juncture.
            MOD 45159992" -- from astern and high: both lift outlines (yellow
            and black dashed rounded rectangles) on the deck beside the
            island, the deck markings, the flat transom with its tall stern
            door, the two quarter sponsons with Phalanx, the Artisan.
     [BALT] "HMS Ocean, BALTOPS 2015, in formation" (starboard bow quarter)
            and "HMS Ocean at sea. MOD 45160033" (port quarter): the Phalanx
            on the deck at the bow, the Artisan in 2015, the exhaust pipe on
            the tower, the transom.
     Wikipedia's 2007 infobox lists "Radar 996, Radar 1007"; today's lists
     Type 997 Artisan, Type 1008, 2 x Type 1007.

   Recognition features (what must read at game zoom), each with its source
   and where the model draws it:
     1. A flush flight deck the whole length, NO ski jump, ending forward in
        a broad rounded (parabolic) bow, not a point [AIR, AST]: DECK, deckHW.
     2. A merchant-style hull: slab sides, a flat transom with chamfered
        lower corners, a raked flared stem with a knuckle [SIDE, SIL, AST]:
        LV / STEM / KEELZ loft, the transom cap.
     3. The island on the starboard edge from x -40 to +48 (0.27..0.70 of the
        length from the bow), its outboard face flush with the hull side, no
        gallery under it [SIDE, SIL, IFOS]: ISL_X0/ISL_X1, the deck notch.
     4. Island in tiers: forward bridge block with a pole mainmast and a
        short black-capped mast, the "L12" block with two small lattice
        masts (Type 1007), the tall radar tower (the funnel) with two white
        radomes, exhaust pipe and the main radar, a low deckhouse aft
        [SIDE, IFOS, BALT]: "island" section of build().
     5. Main radar: Type 996 as built [IFOS 2005]; Type 997 Artisan later
        [AST, BALT 2015]: radar996() / artisan().
     6. Four LCVP Mk5 in hull-side recesses: port pair abaft the island,
        starboard pair under its middle and after part [SIDE, IFOS]: BAYS,
        real recesses cut in the loft, the boats on davits.
     7. Two aircraft lifts inboard of the island, beside its forward block
        and abaft its tower, with yellow-black dashed rounded outlines [AST,
        AIR]: LIFTS, painted in deckTex and laid as slabs.
     8. Three Phalanx: one on the deck at the bow, two on sponsons at the
        stern corners [BALT, AST, SIDE]: phalanxParts() x3.
     9. Galleries under the deck edge with life-raft canisters, and safety
        nets along both sides [SIDE, AST]: the loft's gallery step, racks.
    10. The deck-edge crane and its housing at the starboard after deck edge
        [SIDE, SIL, IFOS]: "crane".
    11. The tall stern door in the transom, windows either side [AST, BALT].
    12. Deck paint: dark strip down the port side, spot lines, red safety
        line parallel to the island [AST].

   Could not confirm, so not drawn: hull number, name, ensign; the as-built
   small guns (facts.js says 20 mm, no reference gives type or place) and
   the DS30M of the later fit (no photograph resolves their mounts); the
   underwater paint (drawn dark grey); the date the Artisan replaced the 996
   (the references show the 996 in 2005 and the Artisan by 2015).

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0, keel -6.5,
   flight deck 16.8 m up. Nothing sticks out past either end of the deck.
   Every static part is merged into ONE mesh per material (eight). Nothing
   is named "turret": the rows have no trained mount. The team colour is
   exactly C.team on two deck flashes and a band round the tower top.
   ASCII only.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroOceanLPH = (function () {
  "use strict";

  var PI = Math.PI;

  /* ---------------------------------------------------- principal dimensions */
  var LOA    = 203.4;
  var XA = -101.7, XB = 101.7;     /* flight deck ends                        */
  var FD_TOP = 16.8;               /* [SIDE]: deck edge 16.6 m, plate 0.2 up  */
  var FD_TH  = 0.8;
  var FD_BOT = FD_TOP - FD_TH;     /* 16.0: top of the hull loft             */
  var KEEL   = -6.5;
  var HX0 = XA + 0.25, HX1 = 101.6;   /* the deck overhangs the transom a little */

  /* island span on the starboard edge, and its outboard face              */
  var ISL_X0 = -40.0, ISL_X1 = 48.5, ISL_YO = -16.0;

  /* boat bays: [x aft, x fwd, side]. Port from [SIDE]; starboard from
     [IFOS], pinned on the island ("L12" over the forward one)            */
  var BAYS = [[-27.0, -10.5, 1], [-60.0, -44.0, 1], [-14.5, 2.0, -1], [-41.5, -25.0, -1]];
  var BAY_Z0 = 7.5, BAY_Z1 = 15.0, BAY_D = 4.0;

  /* lifts [AST]/[AIR]: inboard of the island, rounded corners             */
  var LIFTS = [
    { x0:  25.0, x1:  40.5, y0: -5.0, y1: 7.0 },
    { x0: -42.0, x1: -26.5, y0: -9.0, y1: 3.0 },
  ];

  /* ================================================================ helpers */
  function rngOf(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hx(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
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
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function tbl(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++)
      if (x <= T[i][0]) return lerp(T[i - 1][1], T[i][1], (x - T[i - 1][0]) / (T[i][0] - T[i - 1][0]));
    return T[T.length - 1][1];
  }

  function Batch() { this.p = []; this.n = []; this.u = []; }
  Batch.prototype.add = function (geo) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    if (!g.getAttribute("normal")) g.computeVertexNormals();
    var P = g.getAttribute("position"), N = g.getAttribute("normal"), U = g.getAttribute("uv");
    for (var i = 0; i < P.count; i++) {
      this.p.push(P.getX(i), P.getY(i), P.getZ(i));
      this.n.push(N.getX(i), N.getY(i), N.getZ(i));
      if (U) this.u.push(U.getX(i), U.getY(i)); else this.u.push(0, 0);
    }
    return this;
  };
  Batch.addGroups = function (geo, batches) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    if (!g.getAttribute("normal")) g.computeVertexNormals();
    var P = g.getAttribute("position"), N = g.getAttribute("normal"), U = g.getAttribute("uv");
    var groups = g.groups.length ? g.groups : [{ start: 0, count: P.count, materialIndex: 0 }];
    groups.forEach(function (gr) {
      var B = batches[gr.materialIndex] || batches[0];
      for (var i = gr.start; i < gr.start + gr.count; i++) {
        B.p.push(P.getX(i), P.getY(i), P.getZ(i));
        B.n.push(N.getX(i), N.getY(i), N.getZ(i));
        if (U) B.u.push(U.getX(i), U.getY(i)); else B.u.push(0, 0);
      }
    });
  };
  Batch.prototype.mesh = function (THREE, mtl) {
    if (!this.p.length) return null;
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(this.u, 2));
    return new THREE.Mesh(g, mtl);
  };

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
  function cylZ(THREE, rt, rb, h, seg, x, y, z0, open) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, !!open);
    g.rotateX(PI / 2);
    return place(THREE, g, x, y, z0 + h * 0.5);
  }
  var _v0 = null, _v1 = null;
  function strut(THREE, ax, ay, az, bx, by, bz, r, seg, r2) {
    if (!_v0) { _v0 = new THREE.Vector3(0, 1, 0); _v1 = new THREE.Vector3(); }
    var dx = bx - ax, dy = by - ay, dz = bz - az;
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new THREE.CylinderGeometry(r2 === undefined ? r : r2, r, L, seg || 5, 1);
    var q = new THREE.Quaternion().setFromUnitVectors(_v0, _v1.set(dx, dy, dz).normalize());
    g.applyQuaternion(q);
    g.translate((ax + bx) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
    return g;
  }
  function sphere(THREE, r, ws, hs, x, y, z, sx, sy, sz, half) {
    var g = new THREE.SphereGeometry(r, ws, hs, 0, PI * 2, 0, half ? PI * 0.5 : PI);
    g.rotateX(PI / 2);
    g.scale(sx || 1, sy || 1, sz || 1);
    return place(THREE, g, x, y, z);
  }
  function ccw(pts) {
    var a = 0, i, n = pts.length;
    for (i = 0; i < n; i++) {
      var p = pts[i], q = pts[(i + 1) % n];
      a += p[0] * q[1] - q[0] * p[1];
    }
    return a < 0 ? pts.slice().reverse() : pts;
  }
  /* closed frustum on a convex plan, top outline scaled about the centroid;
     UVs in metres / 16 so the plate texture keeps one size                 */
  function frustum(THREE, pts, zb, zt, sBot, sTop) {
    pts = ccw(pts);
    var n = pts.length, cx = 0, cy = 0, i;
    for (i = 0; i < n; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    cx /= n; cy /= n;
    var Bp = [], Tp = [];
    for (i = 0; i < n; i++) {
      Bp.push([cx + (pts[i][0] - cx) * sBot, cy + (pts[i][1] - cy) * sBot]);
      Tp.push([cx + (pts[i][0] - cx) * sTop, cy + (pts[i][1] - cy) * sTop]);
    }
    var pos = [], uv = [], per = 0, K = 1 / 16;
    function tri(a, b, c, ua, ub, uc) {
      pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
      uv.push(ua[0], ua[1], ub[0], ub[1], uc[0], uc[1]);
    }
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n;
      var b0 = [Bp[i][0], Bp[i][1], zb], b1 = [Bp[j][0], Bp[j][1], zb];
      var t0 = [Tp[i][0], Tp[i][1], zt], t1 = [Tp[j][0], Tp[j][1], zt];
      var L = Math.sqrt((Bp[j][0] - Bp[i][0]) * (Bp[j][0] - Bp[i][0]) + (Bp[j][1] - Bp[i][1]) * (Bp[j][1] - Bp[i][1]));
      var u0 = per * K, u1 = (per + L) * K; per += L;
      tri(b0, b1, t1, [u0, zb * K], [u1, zb * K], [u1, zt * K]);
      tri(b0, t1, t0, [u0, zb * K], [u1, zt * K], [u0, zt * K]);
    }
    for (i = 1; i < n - 1; i++) {
      tri([Tp[0][0], Tp[0][1], zt], [Tp[i][0], Tp[i][1], zt], [Tp[i + 1][0], Tp[i + 1][1], zt],
          [Tp[0][0] * K, Tp[0][1] * K], [Tp[i][0] * K, Tp[i][1] * K], [Tp[i + 1][0] * K, Tp[i + 1][1] * K]);
      tri([Bp[0][0], Bp[0][1], zb], [Bp[i + 1][0], Bp[i + 1][1], zb], [Bp[i][0], Bp[i][1], zb],
          [Bp[0][0] * K, Bp[0][1] * K], [Bp[i + 1][0] * K, Bp[i + 1][1] * K], [Bp[i][0] * K, Bp[i][1] * K]);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    return g;
  }
  function plate(THREE, pts, z0, z1) { return frustum(THREE, pts, z0, z1, 1, 1); }
  function scalePts(pts, s) {
    var cx = 0, cy = 0, i, n = pts.length, out = [];
    for (i = 0; i < n; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    cx /= n; cy /= n;
    for (i = 0; i < n; i++) out.push([cx + (pts[i][0] - cx) * s, cy + (pts[i][1] - cy) * s]);
    return out;
  }
  function rect(x0, x1, y0, y1) { return [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]; }
  /* a rectangle with chamfered corners, c metres in                        */
  function chamf(x0, x1, y0, y1, c) {
    return [[x0 + c, y0], [x1 - c, y0], [x1, y0 + c], [x1, y1 - c], [x1 - c, y1], [x0 + c, y1], [x0, y1 - c], [x0, y0 + c]];
  }

  /* ============================================================ deck plan
     [AIR] and [BALT]: the deck runs full width from the stern to x +55,
     then rounds to a blunt parabolic nose on the centreline. The stern
     corners are cut short.                                               */
  function deckHW(x) {
    if (x > 55) {
      var t = clamp((x - 55) / (XB - 55), 0, 1);
      return 17.4 * Math.pow(Math.max(0, 1 - Math.pow(t, 2.2)), 0.62);
    }
    if (x < XA + 2.2) return lerp(16.4, 17.4, clamp((x - XA) / 2.2, 0, 1));
    return 17.4;
  }
  /* the starboard edge steps in to the hull side along the island: its
     outboard face is flush with the plating [IFOS]                         */
  function islandFlush(x) {
    if (x < ISL_X0 - 1.5 || x > ISL_X1 + 1.5) return 0;
    if (x < ISL_X0) return (x - (ISL_X0 - 1.5)) / 1.5;
    if (x > ISL_X1) return ((ISL_X1 + 1.5) - x) / 1.5;
    return 1;
  }
  function edgeY(x, side) {
    var hw = deckHW(x);
    if (side < 0) {
      var f = islandFlush(x);
      if (f > 0) hw = lerp(hw, -ISL_YO + 0.05, f);
    }
    return hw;
  }
  var DECK = (function () {
    var xs = [], pts = [], i, x;
    for (x = XB; x > 55; x -= 2.0) xs.push(x);
    xs.push(55, ISL_X1 + 1.5, ISL_X1, 30, 0, ISL_X0, ISL_X0 - 1.5, -70, XA + 2.2, XA);
    xs.sort(function (a, b) { return b - a; });
    for (i = 0; i < xs.length; i++) pts.push([xs[i], edgeY(xs[i], 1)]);
    for (i = xs.length - 1; i >= 0; i--) {
      var y = edgeY(xs[i], -1);
      if (y > 0.01 || i === xs.length - 1) pts.push([xs[i], -y]);
    }
    /* the nose: one point on the centreline                               */
    if (pts[0][1] > 0.01) pts.unshift([XB, 0]);
    return pts;
  })();

  /* ================================================================== hull
     Lofted from a level table. A merchant hull: flat bottom, a tight bilge,
     straight sides that open out a little to the gallery, a fine raked
     stem flaring hard into the round deck nose, and a flat transom whose
     lower corners are cut in by the run.
       z, half-breadth amidships, entrance start, p, q, run start, x where
       the run would vanish, ps                                            */
  var LV = [
    [ -6.5, 11.4,   8, 1.5, 0.95, -40,  -93, 1.4 ],
    [ -5.5, 13.4,  14, 1.7, 0.88, -42, -100, 1.6 ],
    [ -4.0, 13.9,  18, 1.8, 0.84, -44, -105, 1.8 ],
    [ -2.0, 14.0,  22, 1.9, 0.80, -45, -109, 1.9 ],
    [  0.0, 14.1,  26, 2.0, 0.78, -48, -115, 2.0 ],
    [  3.0, 14.4,  32, 2.0, 0.74, -55, -130, 2.0 ],
    [  7.3, 15.0,  40, 2.1, 0.70, -68, -165, 2.0 ],
    [ 10.5, 15.5,  46, 2.2, 0.66, -78, -210, 2.0 ],
    [ 13.6, 16.0,  52, 2.3, 0.62, -90, -280, 2.0 ],
  ];
  /* stem x by height: 93.1 at the waterline, 8.6 m of rake to the deck [SIDE] */
  var STEM = [[-6.5, 80.5], [-5.5, 85.5], [-4, 88.8], [-2, 91.2], [0, 93.1], [4, 95.6],
              [8, 97.6], [12, 99.6], [16, 101.5]];
  /* how fast the half-breadth opens aft of the stem: the flare            */
  var WEDGE = [[-6.5, 0.40], [0, 0.42], [3, 0.5], [7.3, 0.7], [10.5, 1.0], [13.6, 1.6], [16, 2.5]];
  var KEELZ = [[XA, 4.0], [-99, 2.2], [-96.5, 0.8], [-92, -1.2], [-85, -3.2], [-75, -5.0],
               [-62, -6.3], [-55, -6.5], [76, -6.5], [80.5, -6.4], [84, -5.9], [87, -4.9],
               [89.5, -3.3], [91.5, -1.6], [93.1, 0], [95.6, 4], [97.6, 8], [99.6, 12], [101.5, 16]];
  function lvY(k, x) {
    var L = LV[k], y = L[1], st = tbl(STEM, L[0]);
    if (x > L[2]) {
      var t = clamp((x - L[2]) / (st - L[2]), 0, 1);
      y *= Math.pow(Math.max(0, 1 - Math.pow(t, L[3])), L[4]);
    }
    if (x < L[5]) {
      var ts = clamp((L[5] - x) / (L[5] - L[6]), 0, 1);
      y *= Math.max(0, 1 - Math.pow(ts, L[7]));
    }
    return Math.min(y, tbl(WEDGE, L[0]) * Math.max(0, st - x));
  }
  /* hull half-breadth at any height up to 13.6, between table levels      */
  function hullY(x, z) {
    if (z <= LV[0][0]) return lvY(0, x);
    for (var k = 1; k < LV.length; k++)
      if (z <= LV[k][0]) return lerp(lvY(k - 1, x), lvY(k, x), (z - LV[k - 1][0]) / (LV[k][0] - LV[k - 1][0]));
    var top = lvY(LV.length - 1, x);
    return Math.min(top + (z - 13.6) * 0.2, tbl(WEDGE, z) * Math.max(0, tbl(STEM, z) - x) + 0.0001);
  }
  function inBay(x, side) {
    for (var i = 0; i < BAYS.length; i++)
      if (BAYS[i][2] === side && x > BAYS[i][0] + 0.01 && x < BAYS[i][1] - 0.01) return true;
    return false;
  }
  /* the ring levels: the hull to 13.6, the gallery step out to the deck
     edge, and the four extra heights that cut a boat bay                 */
  var ZL = [-6.5, -5.5, -4.0, -2.0, 0.0, 3.0, 7.3, BAY_Z0, 10.5, 13.6, 13.8, BAY_Z1, 15.2, FD_BOT];
  function sideRing(x, side) {
    var zk = tbl(KEELZ, x), out = [], i;
    var hull136 = hullY(x, 13.6);
    var gal = Math.max(hull136, edgeY(x, side) - 0.1);
    var flush = side < 0 && islandFlush(x) >= 0.999;
    if (side < 0 && !flush) gal = Math.max(hull136, lerp(edgeY(x, side) - 0.1, hull136, islandFlush(x)));
    var bay = inBay(x, side);
    for (i = 0; i < ZL.length; i++) {
      var z = ZL[i], y;
      /* a level under a risen keel (the run aft, the forefoot and the stem)
         lands on the keel line at the half-breadth there: the flat of the
         run under the transom, a knife edge up the stem                   */
      if (z < zk) { out.push([z <= 13.6 ? hullY(x, Math.min(zk, 13.6)) : hull136, zk]); continue; }
      if (z <= 13.6) y = hullY(x, z);
      else y = flush ? hull136 + 0.001 : gal;
      if (bay && z >= BAY_Z0 && z <= BAY_Z1) y = Math.max(0.5, Math.min(hullY(x, Math.min(z, 13.6)), hull136) - BAY_D);
      out.push([y, z]);
    }
    return out;
  }

  function hullGeo(THREE) {
    var xs = [HX0, -101.0, -100.0, -98.5, -96.5, -94, -91, -87, -82, -76, -70, -64, -58, -52,
              -46, -36, -30, -20, -6, 8, 16, 24, 34, 42, 50, 56, 61, 66, 71, 76, 80, 84, 87,
              89.5, 91.5, 93.1, 94.5, 96, 97.5, 98.8, 99.8, 100.6, 101.2, HX1];
    var i, j;
    BAYS.forEach(function (b) { xs.push(b[0] - 0.03, b[0] + 0.03, b[1] - 0.03, b[1] + 0.03); });
    xs.push(ISL_X0 - 1.5, ISL_X0, ISL_X1, ISL_X1 + 1.5);
    xs.sort(function (a, b) { return a - b; });
    var st = [];
    for (i = 0; i < xs.length; i++) if (!st.length || xs[i] - st[st.length - 1] > 0.02) st.push(xs[i]);

    var OUT = { pos: [], nrm: [], uv: [] };
    var faces = [];
    function tri(a, b, c, ka, kb, kc, ua, ub, uc) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var cxp = uy * vz - uz * vy, cyp = uz * vx - ux * vz, czp = ux * vy - uy * vx;
      var ar = cxp * cxp + cyp * cyp + czp * czp;
      if (ar < 4e-6) return;
      ar = Math.sqrt(ar);
      faces.push({ p: [a, b, c], k: [ka, kb, kc], n: [cxp, cyp, czp], u: [cxp / ar, cyp / ar, czp / ar], t: [ua, ub, uc] });
    }
    var VZ = FD_BOT - KEEL;
    /* each side is its own strip: centreline at the deck, down that side,
       centreline at the keel. Its own half of the canvas, so the windows
       and bays of each side are painted where that side has them        */
    [1, -1].forEach(function (side, si) {
      var rings = [];
      for (i = 0; i < st.length; i++) {
        var R = sideRing(st[i], side), r = [[0, FD_BOT]];
        for (j = R.length - 1; j >= 0; j--) r.push([R[j][0], R[j][1]]);
        r.push([0, tbl(KEELZ, st[i])]);
        rings.push(r);
      }
      var nR = rings[0].length, base = si * 100000;
      function V(ii, jj) { var q = rings[ii][jj]; return [st[ii], side * q[0], q[1]]; }
      function UV(ii, jj) {
        var q = rings[ii][jj];
        return [si * 0.5 + 0.5 * (st[ii] - HX0) / (HX1 - HX0), clamp((q[1] - KEEL) / VZ, 0, 1)];
      }
      function K(ii, jj) { return base + ii * nR + jj; }
      for (i = 0; i < st.length - 1; i++) {
        for (j = 0; j < nR - 1; j++) {
          if (side > 0) {
            tri(V(i, j), V(i + 1, j), V(i, j + 1), K(i, j), K(i + 1, j), K(i, j + 1), UV(i, j), UV(i + 1, j), UV(i, j + 1));
            tri(V(i, j + 1), V(i + 1, j), V(i + 1, j + 1), K(i, j + 1), K(i + 1, j), K(i + 1, j + 1), UV(i, j + 1), UV(i + 1, j), UV(i + 1, j + 1));
          } else {
            tri(V(i, j), V(i, j + 1), V(i + 1, j), K(i, j), K(i, j + 1), K(i + 1, j), UV(i, j), UV(i, j + 1), UV(i + 1, j));
            tri(V(i, j + 1), V(i + 1, j + 1), V(i + 1, j), K(i, j + 1), K(i + 1, j + 1), K(i + 1, j), UV(i, j + 1), UV(i + 1, j + 1), UV(i + 1, j));
          }
        }
      }
      /* this side's half of the transom: a fan from the centreline       */
      var r0 = rings[0], cz = 0;
      for (j = 0; j < nR; j++) cz += r0[j][1];
      cz /= nR;
      var C = [st[0], 0, cz];
      for (j = 0; j < nR - 1; j++) {
        var a = V(0, j), b = V(0, j + 1);
        var ta = [0.001, clamp((a[2] - KEEL) / VZ, 0, 1)], tb = [0.001, clamp((b[2] - KEEL) / VZ, 0, 1)];
        var tc = [0.001, clamp((cz - KEEL) / VZ, 0, 1)];
        if (side > 0) tri(C, a, b, -1 - si, -10 - j - si * 50, -10 - j - si * 50 - 1, tc, ta, tb);
        else tri(C, b, a, -1 - si, -10 - j - si * 50, -10 - j - si * 50 - 1, tc, tb, ta);
      }
    });
    var around = {}, COS = Math.cos(30 * PI / 180);
    faces.forEach(function (f, fi) {
      f.k.forEach(function (k) { (around[k] || (around[k] = [])).push(fi); });
    });
    faces.forEach(function (f) {
      for (var c = 0; c < 3; c++) {
        var q = f.p[c], sx = 0, sy = 0, sz = 0;
        if (f.k[c] < 0) { sx = f.n[0]; sy = f.n[1]; sz = f.n[2]; }
        else around[f.k[c]].forEach(function (gi) {
          var g2 = faces[gi];
          if (g2.u[0] * f.u[0] + g2.u[1] * f.u[1] + g2.u[2] * f.u[2] < COS) return;
          sx += g2.n[0]; sy += g2.n[1]; sz += g2.n[2];
        });
        var l = Math.sqrt(sx * sx + sy * sy + sz * sz) || 1;
        OUT.pos.push(q[0], q[1], q[2]);
        OUT.nrm.push(sx / l, sy / l, sz / l);
        OUT.uv.push(f.t[c][0], f.t[c][1]);
      }
    });
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(OUT.pos, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(OUT.nrm, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(OUT.uv, 2));
    return g;
  }

  /* ============================================================= textures
     Royal Navy light grey, the photographs' level taken down to 0.9: this
     renderer's ACES pass lifts mid greys (pla_e00_destroyer.js measured
     1.8x), and at full level the ship would render near white. She stays
     lighter than the US flat-tops' 0x737a81, as the photographs show.    */
  var PAINT = { hull: 0x798085, sup: 0x878d92, deck: 0x53585c };

  /* hull plating: one canvas, port in the left half and starboard in the
     right, v straight from z (row 0 is the deck, the bottom row the keel) */
  function hullTex(THREE) {
    var W = 2048, H = 256, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(1201), i;
    var PXZ = H / (FD_BOT - KEEL), HW = W / 2, PXX = HW / (HX1 - HX0);
    function rz(z) { return (FD_BOT - z) * PXZ; }
    function cxs(x, s) { return (s > 0 ? 0 : HW) + (x - HX0) * PXX; }
    function band(za, zb, col) { g.fillStyle = col; g.fillRect(0, rz(za), W, rz(zb) - rz(za)); }
    band(FD_BOT, 0, hx(PAINT.hull));
    band(0, KEEL, "#2e3134");
    for (i = 0; i < 260; i++) {
      g.globalAlpha = 0.03 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, rz(R() * FD_BOT), 30 + R() * 200, (0.4 + R() * 1.2) * PXZ);
    }
    g.globalAlpha = 1;
    /* black boot topping                                                  */
    band(0.7, -0.9, "#16181a");
    /* plate seams and strakes                                             */
    g.strokeStyle = "rgba(0,0,0,0.18)"; g.lineWidth = 1;
    for (i = 1; i < 96; i++) { var xx = i * W / 96; g.beginPath(); g.moveTo(xx, 0); g.lineTo(xx, rz(0.7)); g.stroke(); }
    [3.0, 6.0, 9.0, 12.0].forEach(function (z) { g.beginPath(); g.moveTo(0, rz(z)); g.lineTo(W, rz(z)); g.stroke(); });
    /* the gallery band under the deck edge reads darker in every photo   */
    g.fillStyle = "rgba(40,44,48,0.30)"; g.fillRect(0, rz(FD_BOT), W, rz(13.6) - rz(FD_BOT));
    g.fillStyle = "rgba(255,255,255,0.18)"; g.fillRect(0, rz(FD_BOT) , W, 2);
    /* windows: dark panes with a light frame, each side where [SIDE] and
       [IFOS] put them: [x fwd, x aft, z bottom, z top, side]               */
    var WIN = [
      [40.5, 31.0, 9.4, 11.0, 1], [-79.0, -84.0, 9.2, 10.8, 1], [-85.5, -90.5, 9.2, 10.8, 1],
      [-93.0, -96.5, 9.2, 10.6, 1], [70.0, 66.0, 10.4, 11.6, 1],
      [-4.0, -8.5, 10.6, 11.6, 1], [-62.0, -64.5, 10.4, 11.4, 1],
      [60.0, 52.5, 10.0, 11.6, -1], [44.0, 40.0, 10.4, 11.6, -1], [37.0, 33.0, 10.4, 11.6, -1],
      [-50.0, -54.0, 10.4, 11.4, -1], [-57.0, -61.0, 10.4, 11.4, -1], [-88.0, -92.0, 9.4, 10.8, -1],
      [-94.0, -97.0, 9.4, 10.8, -1], [12.0, 9.0, 11.6, 12.6, -1], [22.0, 19.0, 11.6, 12.6, -1]
    ];
    WIN.forEach(function (w) {
      var x0 = cxs(w[1], w[4]), x1 = cxs(w[0], w[4]), y0 = rz(w[3]), y1 = rz(w[2]);
      g.fillStyle = "#c9cdd0"; g.fillRect(x0 - 1, y0 - 1, x1 - x0 + 2, y1 - y0 + 2);
      g.fillStyle = "#1b1f23"; g.fillRect(x0, y0, x1 - x0, y1 - y0);
      g.fillStyle = "rgba(160,170,180,0.35)";
      for (var m = x0 + 3; m < x1 - 2; m += 6) g.fillRect(m, y0, 1, y1 - y0);
    });
    /* gallery openings: the dark gaps in the gallery face                 */
    [[46, 38, 1], [-52, -58, 1], [-70, -78, 1], [62, 56, -1], [-66, -74, -1], [-84, -92, -1], [86, 80, 1]].forEach(function (o) {
      g.fillStyle = "rgba(18,20,22,0.85)";
      g.fillRect(cxs(o[1], o[2]), rz(15.6), cxs(o[0], o[2]) - cxs(o[1], o[2]), rz(14.1) - rz(15.6));
    });
    /* the side door on the starboard quarter that the vehicle ramp comes
       down from [IFOS]: a plated door, its frame and hinges              */
    g.fillStyle = "rgba(60,64,68,0.55)"; g.fillRect(cxs(-96.5, -1), rz(13.0), cxs(-88.5, -1) - cxs(-96.5, -1), rz(6.2) - rz(13.0));
    g.strokeStyle = "rgba(20,22,24,0.9)"; g.lineWidth = 2;
    g.strokeRect(cxs(-96.5, -1), rz(13.0), cxs(-88.5, -1) - cxs(-96.5, -1), rz(6.2) - rz(13.0));
    /* the bow knuckle that catches the light on both sides [SIDE], and the
       stern chine                                                         */
    [1, -1].forEach(function (s) {
      g.strokeStyle = "rgba(255,255,255,0.16)"; g.lineWidth = 3;
      g.beginPath(); g.moveTo(cxs(84, s), rz(14.2)); g.lineTo(cxs(40, s), rz(8.6)); g.stroke();
      g.strokeStyle = "rgba(0,0,0,0.18)"; g.lineWidth = 2;
      g.beginPath(); g.moveTo(cxs(84, s), rz(13.9)); g.lineTo(cxs(40, s), rz(8.3)); g.stroke();
      /* draught marks fore and aft                                        */
      g.fillStyle = "rgba(236,238,240,0.85)";
      [88.0, -94.0].forEach(function (mx) {
        for (var k = 0; k < 6; k++) g.fillRect(cxs(mx, s), rz(-5 + k), 4, 2);
      });
      /* hawse pipe at the bow, port and starboard [BALT]                 */
      g.fillStyle = "#24272a";
      g.beginPath(); g.arc(cxs(90.5, s), rz(9.6), 0.75 * PXZ, 0, PI * 2); g.fill();
      g.fillStyle = "rgba(92,58,40,0.35)"; g.fillRect(cxs(90.5, s) - 1, rz(9.0), 3, 3.5 * PXZ);
    });
    /* rust weeping a little from the scuppers                             */
    for (i = 0; i < 80; i++) {
      var x = R() * W, y = rz(8 + R() * 6), len = (1 + R() * 4) * PXZ;
      var gr = g.createLinearGradient(0, y, 0, y + len);
      gr.addColorStop(0, "rgba(92,62,44,0.28)"); gr.addColorStop(1, "rgba(92,62,44,0)");
      g.fillStyle = gr; g.fillRect(x, y, 1.5, len);
    }
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }

  function supTex(THREE) {
    var W = 512, H = 256, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(4478), i;
    g.fillStyle = hx(PAINT.sup); g.fillRect(0, 0, W, H);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.04 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 20 + R() * 90, 8 + R() * 30);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.2;
    for (i = 1; i < 8; i++) {
      g.beginPath(); g.moveTo(i * W / 8, 0); g.lineTo(i * W / 8, H); g.stroke();
      g.beginPath(); g.moveTo(0, i * H / 8); g.lineTo(W, i * H / 8); g.stroke();
    }
    /* doors, vents and the odd scuttle                                    */
    g.fillStyle = "rgba(24,26,29,0.45)";
    for (i = 0; i < 10; i++) g.fillRect(R() * W, R() * H, 9 + R() * 5, 22 + R() * 6);
    g.fillStyle = "rgba(24,26,29,0.6)";
    for (i = 0; i < 16; i++) { g.beginPath(); g.arc(R() * W, R() * H, 2.4, 0, PI * 2); g.fill(); }
    for (i = 0; i < 26; i++) {
      var x = R() * W, y = R() * H * 0.8, len = 6 + R() * 22;
      var gr = g.createLinearGradient(0, y, 0, y + len);
      gr.addColorStop(0, "rgba(90,62,44,0.18)"); gr.addColorStop(1, "rgba(90,62,44,0)");
      g.fillStyle = gr; g.fillRect(x, y, 1.4, len);
    }
    return finish(THREE, cv);
  }

  /* the flight deck: one plan-view painting in deck metres                */
  var DX0 = -104, DX1 = 104, DY0 = -20, DY1 = 20;
  function deckTex(THREE) {
    var W = 2048, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(1998), i, p;
    var SX = W / (DX1 - DX0), SY = H / (DY1 - DY0);
    function cx(x) { return (x - DX0) * SX; }
    function cy(y) { return H - (y - DY0) * SY; }
    function mline(a, b, wm, col, dash) {
      g.save(); g.strokeStyle = col; g.lineWidth = Math.max(1.0, wm * SY);
      if (dash) g.setLineDash([dash[0] * SX, dash[1] * SX]);
      g.beginPath(); g.moveTo(cx(a[0]), cy(a[1])); g.lineTo(cx(b[0]), cy(b[1])); g.stroke(); g.restore();
    }
    function rrect(x0, x1, y0, y1, r) {
      g.beginPath();
      g.moveTo(cx(x0 + r), cy(y0)); g.lineTo(cx(x1 - r), cy(y0));
      g.quadraticCurveTo(cx(x1), cy(y0), cx(x1), cy(y0 + r)); g.lineTo(cx(x1), cy(y1 - r));
      g.quadraticCurveTo(cx(x1), cy(y1), cx(x1 - r), cy(y1)); g.lineTo(cx(x0 + r), cy(y1));
      g.quadraticCurveTo(cx(x0), cy(y1), cx(x0), cy(y1 - r)); g.lineTo(cx(x0), cy(y0 + r));
      g.quadraticCurveTo(cx(x0), cy(y0), cx(x0 + r), cy(y0)); g.closePath();
    }
    g.fillStyle = hx(PAINT.deck); g.fillRect(0, 0, W, H);
    for (i = 0; i < 420; i++) {
      g.globalAlpha = 0.04 + R() * 0.06;
      g.fillStyle = R() < 0.5 ? "#8e9498" : "#24282b";
      g.fillRect(R() * W, R() * H, 20 + R() * 140, 8 + R() * 40);
    }
    g.globalAlpha = 0.2; g.fillStyle = "#15181a";
    for (i = 0; i < 4000; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    g.fillStyle = "rgba(12,14,16,0.28)";
    for (p = DX0 + 1.5; p < DX1; p += 3.0)
      for (var q = DY0 + 1.5; q < DY1; q += 3.0) g.fillRect(cx(p) - 1, cy(q) - 1, 2, 2);
    /* the darker landing strip down the port side, bow to stern [AST]    */
    g.fillStyle = "rgba(22,25,28,0.55)";
    g.fillRect(cx(-98), cy(12.2), (80 + 98) * SX, (12.2 - 8.0) * SY);
    /* white line-up line on the centreline, solid; the red safety line
       parallel to the island                                              */
    mline([-99, 0], [86, 0], 0.35, "#e4e8ea");
    mline([-99, -6.2], [62, -6.2], 0.3, "rgba(182,56,46,0.9)");
    mline([62, -6.2], [72, -2.0], 0.3, "rgba(182,56,46,0.9)");
    /* transverse spot lines, port edge to the safety line, with numbers  */
    var SPOT = [-90, -72, -54, -36, -18, 0, 18, 36, 54, 72];
    SPOT.forEach(function (sx, k) {
      mline([sx, 16.4], [sx, -5.6], 0.28, "rgba(228,232,234,0.9)", [1.6, 1.0]);
      g.save(); g.translate(cx(sx + 4.5), cy(13.8)); g.rotate(PI / 2);
      g.font = "bold " + Math.round(2.6 * SY) + "px Arial"; g.textAlign = "center"; g.textBaseline = "middle";
      g.fillStyle = "rgba(228,232,234,0.9)"; g.fillText(String(k + 1), 0, 0); g.restore();
      mline([sx - 3, 5], [sx + 3, 5], 0.4, "rgba(228,232,234,0.85)");
    });
    /* the landing circle at the bow, and the box at the round-down       */
    g.save(); g.strokeStyle = "rgba(228,232,234,0.9)"; g.lineWidth = 0.35 * SY;
    g.beginPath(); g.arc(cx(85), cy(1.0), 4.2 * SX, 0, PI * 2); g.stroke(); g.restore();
    g.save(); g.strokeStyle = "rgba(228,232,234,0.9)"; g.lineWidth = 0.4 * SY;
    rrect(-98.5, -94.5, -2.4, 3.0, 1.0); g.stroke(); g.restore();
    /* the lifts: a dark joint round the plate, then the yellow and black
       dashed rounded outline the photographs show                         */
    LIFTS.forEach(function (L) {
      g.save(); g.strokeStyle = "rgba(14,16,18,0.9)"; g.lineWidth = 0.18 * SY;
      rrect(L.x0, L.x1, L.y0, L.y1, 2.2); g.stroke(); g.restore();
      g.save(); g.lineWidth = 0.45 * SY;
      g.strokeStyle = "#151515"; rrect(L.x0 + 0.7, L.x1 - 0.7, L.y0 + 0.7, L.y1 - 0.7, 2.0); g.stroke();
      g.strokeStyle = "#d8b336"; g.setLineDash([0.9 * SX, 0.9 * SX]);
      rrect(L.x0 + 0.7, L.x1 - 0.7, L.y0 + 0.7, L.y1 - 0.7, 2.0); g.stroke(); g.restore();
    });
    /* deck-edge line all round                                            */
    g.save(); g.strokeStyle = "rgba(226,230,232,0.65)"; g.lineWidth = Math.max(1.2, 0.35 * SY);
    g.beginPath(); g.moveTo(cx(DECK[0][0]), cy(DECK[0][1]));
    for (i = 1; i < DECK.length; i++) g.lineTo(cx(DECK[i][0]), cy(DECK[i][1]));
    g.closePath(); g.stroke(); g.restore();
    /* tyre scuffs and staining round the spots                            */
    g.fillStyle = "#0e1012";
    for (i = 0; i < 260; i++) {
      var sx0 = -90 + R() * 160, sy0 = (R() - 0.4) * 22;
      g.globalAlpha = 0.05 + R() * 0.07;
      g.fillRect(cx(sx0), cy(sy0), (2 + R() * 8) * SX, 1.5 + R() * 2);
    }
    g.globalAlpha = 1;
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.repeat.set(1 / (DX1 - DX0), 1 / (DY1 - DY0));
    t.offset.set(-DX0 / (DX1 - DX0), -DY0 / (DY1 - DY0));
    return t;
  }

  var _tex = null;
  function textures(THREE) {
    if (_tex) return _tex;
    _tex = { hull: hullTex(THREE), sup: supTex(THREE), deck: deckTex(THREE) };
    return _tex;
  }

  /* ============================================================= fittings */
  /* Phalanx, gun along +X, ring centre at the origin                       */
  function phalanxParts(THREE) {
    return [
      ["S", cylZ(THREE, 0.95, 1.05, 0.8, 10, 0, 0, 0)],
      ["W", box(THREE, 1.7, 1.5, 1.1, -0.15, 0, 1.35)],
      ["W", cylZ(THREE, 0.72, 0.72, 1.55, 10, -0.35, 0, 1.9)],
      ["W", sphere(THREE, 0.72, 10, 3, -0.35, 0, 3.45, 1, 1, 1, true)],
      ["M", place(THREE, new THREE.CylinderGeometry(0.2, 0.24, 2.3, 8).rotateZ(-PI / 2), 1.65, 0, 1.3)],
      ["K", box(THREE, 0.5, 0.36, 0.36, 0.55, 0.72, 1.55)],
    ];
  }
  /* LCVP Mk5: 15.7 m, 4.3 m beam, bow ramp forward, wheelhouse aft      */
  /* Models3D.loft winds its rings inward for a hull built this way round:
     turn every triangle over                                               */
  function flipped(g) {
    var ix = g.index.array;
    for (var q = 0; q < ix.length; q += 3) { var t = ix[q + 1]; ix[q + 1] = ix[q + 2]; ix[q + 2] = t; }
    g.computeVertexNormals();
    return g;
  }
  function lcvpParts(THREE, M) {
    var P = [];
    P.push(["S", flipped(M.loft(THREE, [
      { x: -7.85, w: 2.0, h: 0.95, zc: 1.0, sq: 0.45 },
      { x: -6.0,  w: 2.15, h: 1.0, zc: 1.0, sq: 0.45 },
      { x:  4.5,  w: 2.15, h: 1.0, zc: 1.0, sq: 0.45 },
      { x:  7.0,  w: 1.95, h: 0.85, zc: 1.15, sq: 0.45 },
      { x:  7.85, w: 1.8, h: 0.6, zc: 1.4, sq: 0.45 },
    ], 8))]);
    P.push(["K", box(THREE, 10.0, 3.6, 0.2, 0.8, 0, 1.95)]);           /* the open well */
    P.push(["S", box(THREE, 0.3, 3.8, 1.6, 7.55, 0, 1.7)]);            /* bow ramp      */
    P.push(["S", box(THREE, 3.0, 2.6, 1.9, -5.6, 0.4, 2.9)]);          /* wheelhouse    */
    P.push(["G", box(THREE, 0.1, 2.0, 0.55, -4.08, 0.4, 3.35)]);
    P.push(["K", box(THREE, 15.2, 4.4, 0.3, 0, 0, 0.6)]);              /* rubbing strake */
    return P;
  }
  /* Type 996: the slim stacked array on its turntable, IFF on top [IFOS] */
  function radar996(THREE) {
    return [
      ["S", cylZ(THREE, 0.75, 0.9, 1.1, 10, 0, 0, 0)],
      ["M", box(THREE, 0.8, 1.2, 0.9, 0, 0, 1.55)],
      ["K", box(THREE, 0.55, 4.6, 1.15, 0.15, 0, 2.55, 0, -0.12, 0)],
      ["M", box(THREE, 0.25, 4.8, 0.12, -0.2, 0, 1.95)],
      ["K", box(THREE, 0.3, 3.6, 0.4, 0.05, 0, 3.4)],
    ];
  }
  /* Type 997 Artisan: the big rounded face, leaning back [AST, BALT]     */
  function artisan(THREE) {
    var face = box(THREE, 0.9, 4.4, 2.4, 0, 0, 0);
    var cap = place(THREE, new THREE.CylinderGeometry(0.45, 0.45, 4.4, 10, 1, false, 0, PI).rotateX(PI / 2).rotateZ(PI / 2), 0, 0, 1.2);
    return [
      ["S", cylZ(THREE, 0.85, 1.0, 1.0, 10, 0, 0, 0)],
      ["M", box(THREE, 0.9, 1.4, 0.8, 0, 0, 1.4)],
      ["K", place(THREE, face, 0.2, 0, 3.1, 0, -0.26, 0)],
      ["K", place(THREE, cap, 0.2 - 0.3, 0, 3.1, 0, -0.26, 0)],
    ];
  }
  /* small lattice mast with a Type 1007 bar on top                        */
  function lattice(THREE, B, x, y, z0, h) {
    var w0 = 0.9, w1 = 0.45, k;
    for (k = 0; k < 4; k++) {
      var sx = (k & 1) ? 1 : -1, sy = (k & 2) ? 1 : -1;
      B.M.add(strut(THREE, x + sx * w0, y + sy * w0, z0, x + sx * w1, y + sy * w1, z0 + h, 0.07, 4));
    }
    for (k = 1; k < 4; k++) {
      var zz = z0 + h * k / 4, w = lerp(w0, w1, k / 4);
      B.M.add(box(THREE, 2 * w, 0.06, 0.06, x, y - w, zz)); B.M.add(box(THREE, 2 * w, 0.06, 0.06, x, y + w, zz));
      B.M.add(box(THREE, 0.06, 2 * w, 0.06, x - w, y, zz)); B.M.add(box(THREE, 0.06, 2 * w, 0.06, x + w, y, zz));
    }
    B.S.add(box(THREE, 1.3, 1.3, 0.15, x, y, z0 + h));
    B.K.add(box(THREE, 0.35, 2.6, 0.35, x, y, z0 + h + 0.45));
  }

  /* ================================================================ build */
  function build(THREE, M, C, late) {
    var root = new THREE.Group();
    var i, j, s;
    var TX = textures(THREE), T = {};
    T.H = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.hull, roughness: 0.86, metalness: 0.08 });
    T.S = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.sup, roughness: 0.86, metalness: 0.07 });
    T.D = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.deck, roughness: 0.94, metalness: 0.04 });
    T.K = new THREE.MeshStandardMaterial({ color: 0x1d2125, roughness: 0.9, metalness: 0.05 });
    T.M = new THREE.MeshStandardMaterial({ color: 0x5e676e, roughness: 0.55, metalness: 0.45 });
    T.G = new THREE.MeshStandardMaterial({ color: 0x121c25, roughness: 0.12, metalness: 0.0, transparent: true, opacity: 0.88 });
    T.W = new THREE.MeshStandardMaterial({ color: 0xd9dcde, roughness: 0.62, metalness: 0.04 });
    T.T = new THREE.MeshStandardMaterial({ color: new THREE.Color(C && C.team !== undefined ? C.team : 0x4b8fe0),
                                           roughness: 0.6, metalness: 0.1,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    var B = {};
    Object.keys(T).forEach(function (k) { B[k] = new Batch(); });
    function emit(parts, x, y, z, hdg) {
      parts.forEach(function (pp) {
        place(THREE, pp[1], 0, 0, 0, 0, 0, hdg || 0);
        pp[1].translate(x, y, z);
        B[pp[0]].add(pp[1]);
      });
    }
    function rail(pts, z, closed) {
      var n = pts.length, k;
      for (k = 0; k < (closed ? n : n - 1); k++) {
        var p0 = pts[k], p1 = pts[(k + 1) % n], ddx = p1[0] - p0[0], ddy = p1[1] - p0[1];
        var L = Math.sqrt(ddx * ddx + ddy * ddy);
        if (L < 0.05) continue;
        B.M.add(box(THREE, L, 0.07, 0.07, (p0[0] + p1[0]) * 0.5, (p0[1] + p1[1]) * 0.5, z, 0, 0, Math.atan2(ddy, ddx)));
      }
    }

    /* --------------------------------------------------------------- hull */
    B.H.add(hullGeo(THREE));

    /* ----------------------------------------------------- flight deck */
    var shp = new THREE.Shape();
    shp.moveTo(DECK[0][0], DECK[0][1]);
    for (i = 1; i < DECK.length; i++) shp.lineTo(DECK[i][0], DECK[i][1]);
    shp.closePath();
    var dg = new THREE.ExtrudeGeometry(shp, { depth: FD_TH, bevelEnabled: false, curveSegments: 1 });
    dg.translate(0, 0, FD_BOT);
    Batch.addGroups(dg, [B.D, B.S]);
    /* the lift platforms, flush plates a hair proud, painted from the same
       canvas so the outlines run on across the joint                      */
    LIFTS.forEach(function (L) {
      var ls = new THREE.Shape(), q = chamf(L.x0 + 0.1, L.x1 - 0.1, L.y0 + 0.1, L.y1 - 0.1, 1.6);
      ls.moveTo(q[0][0], q[0][1]);
      for (var k = 1; k < q.length; k++) ls.lineTo(q[k][0], q[k][1]);
      ls.closePath();
      var lg = new THREE.ExtrudeGeometry(ls, { depth: 0.3, bevelEnabled: false });
      lg.translate(0, 0, FD_TOP - 0.3 + 0.03);
      Batch.addGroups(lg, [B.D, B.K]);
    });

    /* --------------------------------- deck-edge nets, both sides, and the
       canister racks in the galleries. None along the island, none past the
       deck ends, none over a boat bay's davits                              */
    var n = DECK.length;
    for (i = 0; i < n; i++) {
      var a = DECK[i], b = DECK[(i + 1) % n];
      var dx = b[0] - a[0], dy = b[1] - a[1], L2 = Math.sqrt(dx * dx + dy * dy);
      if (L2 < 3) continue;
      var ox = dy / L2, oy = -dx / L2;
      if (ox * ox > 0.5) continue;
      var mx = (a[0] + b[0]) * 0.5, my = (a[1] + b[1]) * 0.5;
      if (my < 0 && islandFlush(mx) > 0) continue;
      if (Math.max(Math.abs(a[0]), Math.abs(b[0])) > 99.5) continue;
      var ang = Math.atan2(dy, dx), sgn = my > 0 ? 1 : -1;
      var nseg = Math.max(1, Math.round(L2 / 14)), k2;
      for (k2 = 0; k2 < nseg; k2++) {
        var f0 = k2 / nseg, f1 = (k2 + 1) / nseg, sl = L2 / nseg;
        var px = a[0] + dx * (f0 + f1) * 0.5, py = a[1] + dy * (f0 + f1) * 0.5;
        var net = new THREE.BoxGeometry(sl - 0.3, 1.5, 0.07);
        net.rotateX(0.24);
        net.rotateZ(ang + (sgn > 0 ? 0 : PI));
        net.translate(px + ox * 0.75, py + oy * 0.75, FD_TOP - 0.45);
        B.K.add(net);
        B.M.add(box(THREE, sl, 0.07, 0.07, px + ox * 1.45, py + oy * 1.45, FD_TOP - 0.2, 0, 0, ang));
      }
    }
    /* life-raft canisters along the gallery, white drums ends outboard   */
    function racks(x0, x1, side) {
      for (var xx = x0; xx <= x1; xx += 3.8) {
        var hit = false;
        BAYS.forEach(function (bb) { if (bb[2] === side && xx > bb[0] - 2 && xx < bb[1] + 2) hit = true; });
        if (hit) continue;
        /* on a cradle hung off the gallery face, outboard of it            */
        var ye = side * (deckHW(xx) + 0.25);
        B.S.add(box(THREE, 2.3, 1.1, 0.15, xx, ye, 13.95));
        for (var d3 = -1; d3 <= 1; d3 += 2) {
          var can = new THREE.CylinderGeometry(0.42, 0.42, 1.0, 6);
          B.W.add(place(THREE, can, xx + d3 * 0.55, ye, 14.45));
        }
      }
    }
    racks(-88, -64, 1); racks(-40, -30, 1); racks(-8, 26, 1); racks(30, 46, 1); racks(50, 80, 1);
    racks(-92, -70, -1); racks(-66, -57, -1); racks(54, 80, -1);

    /* ------------------------------------------------------- boat bays */
    BAYS.forEach(function (bay) {
      var xm = (bay[0] + bay[1]) * 0.5, sd = bay[2], len = bay[1] - bay[0];
      var yh = hullY(xm, 11.0), yb = yh - BAY_D;
      /* the back wall in shadow, and the bay's deckhead lights          */
      B.K.add(box(THREE, len - 0.2, 0.2, BAY_Z1 - BAY_Z0 - 0.1, xm, sd * (yb + 0.15), (BAY_Z0 + BAY_Z1) * 0.5));
      /* the sill platform, a rail along it                                */
      B.S.add(box(THREE, len - 0.4, 2.2, 0.25, xm, sd * (yh - 1.0), BAY_Z0 + 0.12));
      rail([[bay[0] + 0.4, sd * (yh - 0.05)], [bay[1] - 0.4, sd * (yh - 0.05)]], BAY_Z0 + 1.1);
      /* the LCVP on its davits, its outboard side about flush             */
      var by = sd * (yh - 2.45);
      emit(lcvpParts(THREE, M), xm + 0.2, by, BAY_Z0 + 0.6, 0);
      for (j = 0; j < 2; j++) {
        var dxx = xm + (j ? 5.6 : -5.2);
        B.M.add(box(THREE, 0.4, 3.2, 0.4, dxx, sd * (yh - 2.2), BAY_Z1 - 0.6));
        B.M.add(box(THREE, 0.7, 0.6, 0.7, dxx, sd * (yh - 0.75), BAY_Z1 - 0.9));
        B.M.add(strut(THREE, dxx, sd * (yh - 0.7), BAY_Z1 - 0.6, dxx, sd * (yh - 2.45), BAY_Z0 + 3.4, 0.06, 4));
        B.M.add(strut(THREE, dxx, sd * (yb + 0.3), BAY_Z1 - 0.6, dxx, sd * (yb + 0.3), BAY_Z0 + 0.2, 0.18, 5));
      }
    });

    /* ------------------------------------------------- the stern */
    /* transom fittings: the tall stern door just to starboard of the
       centreline, windows either side, the quarter sponsons              */
    B.K.add(box(THREE, 0.2, 3.6, 8.4, HX0 - 0.04, -1.2, 8.9));
    B.M.add(box(THREE, 0.2, 4.2, 0.3, HX0 - 0.06, -1.2, 13.25));
    [[7.5, 10.4], [-8.5, 9.2], [4.0, 12.2], [-5.0, 12.2], [10.5, 13.2], [-11.5, 13.2]].forEach(function (w) {
      B.K.add(box(THREE, 0.16, 2.6, 1.3, HX0 - 0.04, w[0], w[1]));
    });
    /* quarter sponsons a deck below the flight deck, knees under them,
       a Phalanx on each [AST]                                             */
    for (s = -1; s <= 1; s += 2) {
      var spn = ccw([[-101.6, s * 10.5], [-92.0, s * 15.6], [-92.0, s * 19.2], [-101.6, s * 19.2]]);
      B.S.add(plate(THREE, spn, 13.8, 14.5));
      B.S.add(plate(THREE, ccw([[-101.2, s * 12.0], [-94.0, s * 15.8], [-94.0, s * 17.0], [-101.2, s * 17.0]]), 10.8, 13.8));
      rail([[-92.2, s * 19.1], [-101.4, s * 19.1], [-101.4, s * 10.8]], 15.5, false);
      emit(phalanxParts(THREE), -97.8, s * 16.6, 14.5, s > 0 ? PI * 0.8 : -PI * 0.8);
    }
    /* the bow Phalanx stands on the flight deck forward [BALT]           */
    B.S.add(cylZ(THREE, 1.5, 1.6, 0.5, 10, 92.6, -0.8, FD_TOP));
    emit(phalanxParts(THREE), 92.6, -0.8, FD_TOP + 0.5, 0);
    /* the anchors housed in their hawse pipes, one each bow [BALT]      */
    for (s = -1; s <= 1; s += 2) {
      var yh9 = hullY(90.5, 9.6);
      B.K.add(box(THREE, 1.4, 0.5, 2.2, 90.5, s * (yh9 + 0.05), 8.9));
      B.M.add(box(THREE, 0.5, 0.35, 1.6, 90.5, s * (yh9 + 0.25), 8.6));
    }
    /* jackstaff at the bow and ensign staff at the stern (no flags)      */
    B.M.add(strut(THREE, 99.6, 0, FD_TOP, 99.6, 0, FD_TOP + 5.0, 0.07, 4, 0.04));
    B.M.add(strut(THREE, -100.6, 0, FD_TOP, -100.6, 0, FD_TOP + 6.5, 0.08, 4, 0.04));

    /* twin screws, shafts and rudders                                     */
    for (s = -1; s <= 1; s += 2) {
      var py2 = s * 6.2;
      B.M.add(strut(THREE, -52.0, py2 * 0.8, -5.8, -86.0, py2, -3.4, 0.4, 6));
      B.M.add(place(THREE, new THREE.CylinderGeometry(0.4, 0.7, 1.4, 8).rotateZ(PI / 2), -86.8, py2, -3.4));
      for (j = 0; j < 4; j++) {
        var bl = new THREE.BoxGeometry(0.3, 1.3, 2.0);
        bl.translate(0, 0, 1.25); bl.rotateZ(0.4); bl.rotateX(j * PI / 2 + 0.3); bl.translate(-86.8, py2, -3.4);
        B.M.add(bl);
      }
      B.M.add(strut(THREE, -80.0, py2, -4.9, -80.0, py2 * 0.6, -5.9, 0.15, 4));
      B.M.add(box(THREE, 4.0, 0.45, 4.6, -91.5, py2, -2.0));
    }

    /* --------------------------------------------------------- the island
       Stations from [SIDE] (a far-side view, so x scaled 3% about the frame
       centre) and the [SIL] drawing; widths from [AST], [AIR] and the bow
       view: about 9.5 m across, its outboard face the hull side. Heights
       above the waterline.                                                */
    var Z0 = FD_TOP;
    /* forward block: a deckhouse with a lower step at its front, then the
       bridge, its roof at 28 m                                             */
    B.S.add(frustum(THREE, rect(46.0, 48.5, ISL_YO, -7.2), Z0, 22.4, 1.0, 0.99));
    B.S.add(frustum(THREE, rect(21.5, 46.0, ISL_YO, -6.4), Z0, 23.8, 1.0, 0.996));
    B.S.add(frustum(THREE, rect(22.0, 45.4, -15.8, -7.0), 23.8, 27.8, 1.0, 0.99));
    /* bridge glazing round the front and sides, a visor over it           */
    B.G.add(box(THREE, 0.12, 8.4, 1.25, 45.42, -11.4, 25.7));
    B.G.add(box(THREE, 8.0, 0.12, 1.25, 41.0, -6.98, 25.7));
    B.G.add(box(THREE, 8.0, 0.12, 1.25, 41.0, -15.82, 25.7));
    B.S.add(box(THREE, 1.0, 9.2, 0.22, 45.7, -11.4, 26.5));
    /* bridge wings out over the side and over the deck                     */
    B.S.add(plate(THREE, rect(40.5, 45.2, -18.4, -15.8), 23.6, 23.9));
    B.S.add(plate(THREE, rect(40.5, 45.2, -7.0, -5.0), 23.6, 23.9));
    rail([[40.6, -18.3], [45.1, -18.3], [45.1, -15.9]], 24.9, false);
    rail([[40.6, -5.1], [45.1, -5.1], [45.1, -6.9]], 24.9, false);
    /* windows on the face toward the deck, doors at deck level, and the
       rows on the starboard face that [IFOS] shows                         */
    B.G.add(box(THREE, 10.0, 0.12, 1.0, 33.5, -6.34, 21.8));
    B.G.add(box(THREE, 6.0, 0.12, 1.0, 36.0, -16.03, 22.4));
    B.G.add(box(THREE, 2.2, 0.12, 1.0, 47.2, -16.03, 20.6));
    [26.5, 43.5].forEach(function (dx2) { B.K.add(box(THREE, 1.1, 0.15, 2.1, dx2, -6.35, Z0 + 1.05)); });
    /* the roof: a plated deck, a house with the SATCOM dome on it        */
    B.S.add(plate(THREE, rect(21.5, 45.8, -16.0, -6.8), 27.8, 28.2));
    rail(rect(21.7, 45.6, -15.8, -7.0), 29.2, true);
    B.S.add(frustum(THREE, rect(26.0, 36.0, -14.6, -9.6), 28.2, 30.0, 1.0, 0.97));
    B.S.add(cylZ(THREE, 0.6, 0.7, 1.0, 8, 37.4, -8.6, 28.2));
    B.W.add(sphere(THREE, 1.45, 12, 8, 37.4, -8.6, 30.6));
    B.S.add(box(THREE, 2.0, 1.6, 1.2, 40.0, -14.6, 28.8));
    B.S.add(box(THREE, 1.6, 2.0, 1.0, 29.0, -7.8, 28.7));
    /* the short black-capped mast at the block's forward end [SIDE]: an
       enclosed column, a platform, a navigation radar bar                 */
    B.S.add(frustum(THREE, rect(43.4, 45.6, -13.2, -11.0), 28.2, 30.6, 1.0, 0.92));
    B.S.add(plate(THREE, rect(42.8, 46.2, -13.8, -10.4), 30.6, 30.85));
    rail(rect(42.9, 46.1, -13.7, -10.5), 31.8, true);
    B.K.add(cylZ(THREE, 0.55, 0.65, 1.6, 8, 44.5, -12.1, 30.85));
    B.K.add(box(THREE, 0.3, 3.4, 0.35, 44.7, -12.1, 32.75));
    /* the main pole mast off the after end of the bridge roof: yards,
       platform and whips [SIDE, IFOS]                                      */
    var MMX = 21.8, MMY = -11.6;
    B.S.add(frustum(THREE, rect(MMX - 1.0, MMX + 1.0, MMY - 1.0, MMY + 1.0), 28.2, 32.4, 1.0, 0.6));
    B.M.add(strut(THREE, MMX, MMY, 32.4, MMX, MMY, 39.6, 0.26, 6, 0.1));
    B.S.add(plate(THREE, rect(MMX - 1.4, MMX + 1.4, MMY - 1.4, MMY + 1.4), 32.4, 32.65));
    rail(rect(MMX - 1.35, MMX + 1.35, MMY - 1.35, MMY + 1.35), 33.6, true);
    B.M.add(box(THREE, 0.2, 7.6, 0.2, MMX, MMY, 35.6));
    B.M.add(box(THREE, 0.16, 4.4, 0.16, MMX, MMY, 37.8));
    for (s = -1; s <= 1; s += 2) {
      B.M.add(strut(THREE, MMX, MMY, 34.2, MMX, MMY + s * 3.0, 35.5, 0.06, 4));
      B.W.add(sphere(THREE, 0.35, 6, 4, MMX, MMY + s * 3.4, 36.0));
    }
    B.K.add(box(THREE, 0.5, 0.5, 0.6, MMX + 0.3, MMY, 36.6));

    /* the connecting section and the "L12" block with its two lattice
       masts carrying the Type 1007 radars [IFOS]                          */
    B.S.add(frustum(THREE, rect(10.5, 21.5, ISL_YO, -6.8), Z0, 27.2, 1.0, 0.995));
    B.S.add(frustum(THREE, rect(-7.5, 10.5, ISL_YO, -6.5), Z0, 30.0, 1.0, 0.99));
    rail(rect(-7.2, 10.2, -15.7, -6.8), 31.0, true);
    rail(rect(10.7, 21.3, -15.8, -7.0), 28.2, true);
    lattice(THREE, B, 6.5, -10.2, 30.0, 3.1);
    lattice(THREE, B, -1.5, -12.8, 30.0, 3.1);
    for (j = 0; j < 4; j++) B.M.add(strut(THREE, 1 + j * 2.2, -8.2 - (j & 1) * 6.5, 30.0, 1 + j * 2.2, -8.2 - (j & 1) * 6.5, 32.8 + (j % 2), 0.04, 4));
    B.S.add(box(THREE, 3.0, 2.2, 1.4, 2.0, -8.6, 30.7));
    B.G.add(box(THREE, 6.0, 0.12, 0.9, 2.5, -16.02, 27.2));
    B.G.add(box(THREE, 3.0, 0.12, 0.9, 14.0, -16.02, 24.2));
    B.G.add(box(THREE, 6.0, 0.12, 0.9, 2.5, -6.45, 27.2));
    B.G.add(box(THREE, 7.0, 0.12, 0.9, 16.0, -6.75, 24.6));
    B.K.add(box(THREE, 1.1, 0.15, 2.1, 0.0, -6.45, Z0 + 1.05));
    B.K.add(box(THREE, 1.1, 0.15, 2.1, 16.0, -6.75, Z0 + 1.05));
    /* a catwalk along the island's deck face, its rail                    */
    B.S.add(plate(THREE, rect(-38.0, 46.0, -6.4, -5.5), 21.0, 21.25));
    rail([[-38.0, -5.55], [46.0, -5.55]], 22.2, false);
    for (j = 0; j < 12; j++) B.M.add(strut(THREE, -36 + j * 7.4, -5.6, 21.1, -36 + j * 7.4, -6.4, 19.6, 0.06, 4));

    /* the rows of small windows along the island's starboard face [IFOS] */
    [[44.0, 19.6], [38.5, 19.6], [33.0, 19.6], [27.0, 19.6], [8.0, 19.6], [2.0, 19.6], [-4.0, 19.6],
     [42.0, 21.8], [8.0, 23.0], [-2.0, 23.0], [14.0, 21.4], [-30.0, 18.6], [-35.0, 18.6]].forEach(function (w) {
      B.G.add(box(THREE, 2.6, 0.12, 0.8, w[0], -16.03, w[1]));
    });
    for (j = 0; j < 7; j++) B.M.add(box(THREE, 0.08, 0.16, 1.3, 45.46, -15.0 + j * 1.2, 25.7));
    for (j = 0; j < 6; j++) B.M.add(box(THREE, 0.08, 0.16, 1.3, 38.5 + j * 1.2, -15.86, 25.7));
    /* fire points, lockers and hose racks along the island's deck face [AST] */
    [[44.0, 0], [39.0, 1], [33.0, 0], [18.5, 1], [13.0, 0], [6.0, 1], [-3.0, 0], [-9.5, 1]].forEach(function (e) {
      if (e[1]) B.W.add(box(THREE, 1.2, 0.7, 1.4, e[0], -5.95, Z0 + 0.7));
      else B.S.add(box(THREE, 2.2, 0.9, 1.8, e[0], -5.95, Z0 + 0.9));
    });
    /* the radar tower, which is also the funnel [AST]: a broad base, then
       one long taper to the radar platform, a radome on a bracket fore and
       aft, the exhaust pipe out to starboard, and the main radar on top   */
    B.S.add(frustum(THREE, rect(-12.0, -7.5, ISL_YO, -6.6), Z0, 26.4, 1.0, 0.99));
    B.S.add(frustum(THREE, rect(-24.0, -12.0, ISL_YO, -7.4), Z0, 24.0, 1.0, 0.995));
    var TWR = [[-22.6, -15.6], [-12.6, -15.6], [-12.0, -14.6], [-12.0, -8.6], [-12.6, -7.8], [-22.6, -7.8], [-23.4, -8.6], [-23.4, -14.6]];
    B.S.add(frustum(THREE, TWR, 24.0, 32.9, 1.0, 0.62));
    B.T.add(frustum(THREE, TWR, 32.0, 32.95, 0.659, 0.617));
    B.S.add(plate(THREE, scalePts(TWR, 0.7), 32.9, 33.2));
    rail(scalePts(TWR, 0.68), 34.2, true);
    B.S.add(plate(THREE, scalePts(TWR, 1.06), 24.0, 24.3));
    rail(scalePts(TWR, 1.05), 25.3, true);
    var TC = [-17.7, -11.7];
    [[-12.6, 1], [-22.8, -1]].forEach(function (d) {
      B.S.add(box(THREE, 2.6, 1.2, 0.45, d[0] + d[1] * 0.4, -12.6, 28.0));
      B.S.add(cylZ(THREE, 0.5, 0.6, 1.0, 8, d[0] + d[1] * 0.9, -12.6, 28.2));
      B.W.add(sphere(THREE, 1.5, 12, 8, d[0] + d[1] * 0.9, -12.6, 30.4));
    });
    B.K.add(strut(THREE, -16.2, -13.6, 29.0, -16.2, -17.6, 31.6, 0.55, 8));
    B.K.add(strut(THREE, -19.0, -13.6, 28.6, -19.0, -17.2, 30.8, 0.4, 8));
    B.G.add(box(THREE, 6.0, 0.12, 0.9, -17.6, -16.03, 22.4));
    B.G.add(box(THREE, 6.0, 0.12, 0.9, -17.6, -7.45, 22.4));
    B.K.add(box(THREE, 1.1, 0.15, 2.1, -18.0, -7.45, Z0 + 1.05));
    /* ESM and IFF boxes and whips round the radar platform               */
    [[-15.2, -14.0], [-20.2, -14.0], [-15.2, -9.4], [-20.2, -9.4]].forEach(function (e) {
      B.S.add(box(THREE, 0.8, 0.8, 0.9, e[0], e[1], 33.65));
      B.M.add(strut(THREE, e[0], e[1], 34.1, e[0], e[1], 36.0, 0.035, 4));
    });
    /* the main radar: 996 as built, Artisan later                         */
    emit(late ? artisan(THREE) : radar996(THREE), TC[0], TC[1], 33.2, 0);

    /* the low deckhouse abaft the tower: doors, fire points              */
    B.S.add(frustum(THREE, rect(-39.5, -24.0, ISL_YO, -10.6), Z0, 20.0, 1.0, 0.99));
    rail(rect(-39.3, -24.2, -15.8, -10.8), 21.0, true);
    for (j = 0; j < 3; j++) B.K.add(box(THREE, 1.1, 0.15, 2.1, -37.0 + j * 5.0, -10.55, Z0 + 1.05));
    for (j = 0; j < 4; j++) B.W.add(box(THREE, 0.7, 0.5, 1.0, -26.0 - j * 3.6, -10.1, Z0 + 0.5));
    B.S.add(box(THREE, 4.0, 3.0, 2.2, -30.0, -13.0, 21.1));

    /* ---------------------------------------------------------- crane
       the deck-edge crane on the starboard after edge, its big pale
       housing and the jib stowed aft [SIDE, SIL, IFOS, AST]              */
    B.W.add(frustum(THREE, rect(-54.0, -46.5, -17.0, -11.2), Z0, 20.6, 1.0, 0.97));
    rail(rect(-53.8, -46.7, -16.8, -11.4), 21.6, true);
    B.S.add(cylZ(THREE, 0.9, 1.0, 1.0, 10, -50.0, -14.4, 20.6));
    B.S.add(box(THREE, 2.6, 2.0, 1.8, -50.4, -14.4, 22.5));
    B.G.add(box(THREE, 0.1, 1.6, 0.8, -49.08, -14.4, 22.8));
    B.M.add(box(THREE, 13.5, 0.7, 0.8, -57.6, -14.4, 22.4, 0, 0.05, 0));
    B.M.add(strut(THREE, -64.0, -14.4, 22.0, -64.0, -14.4, 19.0, 0.04, 4));
    B.K.add(box(THREE, 0.5, 0.5, 0.6, -64.0, -14.4, 18.8));
    B.M.add(strut(THREE, -51.6, -14.4, 23.2, -60.0, -14.4, 22.8, 0.08, 4));

    /* the accommodation-ladder platform low on the port side [SIDE]      */
    B.S.add(plate(THREE, rect(1.0, 16.0, hullY(8.0, 6.6) - 0.1, hullY(8.0, 6.6) + 1.6), 6.4, 6.75));
    rail([[1.2, hullY(8.0, 6.6) + 1.5], [15.8, hullY(8.0, 6.6) + 1.5]], 7.7, false);

    /* whip aerials along the starboard deck edge forward and aft         */
    [[56, -17.4], [62, -17.4], [-60, -17.6], [-74, -17.6]].forEach(function (w) {
      B.M.add(strut(THREE, w[0], w[1], FD_TOP - 1.0, w[0], w[1] - 0.6, FD_TOP + 7.0, 0.07, 4, 0.03));
    });

    /* ------------------------------------------------------ team colour:
       two deck flashes at the ends and the band round the tower top        */
    B.T.add(box(THREE, 1.6, 9.0, 0.12, 97.0, 0, FD_TOP + 0.06));
    B.T.add(box(THREE, 1.6, 14.0, 0.12, -100.4, 0, FD_TOP + 0.06));

    Object.keys(B).forEach(function (k) {
      var mm = B[k].mesh(THREE, T[k]);
      if (mm) root.add(mm);
    });
    root.userData.heroLen = LOA;
    return root;
  }

  return { build: build, len: LOA };
})();

/* Registration: the as-built ship carries the Type 996; the later row the
   Type 997 Artisan. len is the measured X extent, the 203.4 m deck.         */
UNIT_MODELS["gbr_e90_lph"] = {
  len: 203.4,
  build: function (THREE, M, C) { return HeroOceanLPH.build(THREE, M, C, false); }
};
UNIT_MODELS["gbr_e00_lph"] = {
  len: 203.4,
  build: function (THREE, M, C) { return HeroOceanLPH.build(THREE, M, C, true); }
};
