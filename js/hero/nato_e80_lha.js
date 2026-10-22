/* ============================================================================
   nato_e80_lha.js -- HERO model: USS Tarawa (LHA-1), Tarawa-class amphibious
   assault ship, as she served in the 1980s. Registered as nato_e80_lha.

   She was a straight-deck stand-in from warship3d.js. This is the real ship:
   a flush flight deck on a full, blunt-bowed hull, the island to starboard,
   two lifts (port deck edge, stern centreline), a stern gate for the well deck and the as-built
   armament the row carries (three 5in/54 Mk 45 and two Mk 25 BPDMS Sea
   Sparrow launchers).

   Figures used (published): 254.2 m overall, 40.2 m extreme beam, 32.3 m
   waterline beam, 7.9 m draught, flight deck about 250 x 36 m, nine landing
   spots, a well deck 268 ft long for four LCU, closed by a stern gate about
   24 m wide.

   Read off the references (named so they can be checked):
     - "USS Tarawa (LHA-1) and Essex (LHD-2) aerial view at Long Beach NS in
       1993" (US Navy, Wikimedia Commons): nearly straight down, Tarawa on
       the left with her bow to the right. Plan of the deck (square stern,
       chamfered bow corners), the island on the starboard edge about the
       middle of the ship with its two stacks abaft the bridge, the nine
       spot markings (five along the port side, four to starboard) and the
       long yellow line down the deck. The island overhangs the deck edge.
     - "USS Peleliu (LHA 5) in South China Sea 03" (US Navy, 2008): bow
       quarter view from port. Hull flare, the gallery under the deck edge,
       the island with a foremast over the bridge and a mast over the
       stacks, the port quarter lift opening, the stern gate.
   Check pass (same 1993 overhead, enlarged): the island runs about x -34 ..
   +23 (the builder had -46 .. +4), the port lift is read from the Peleliu photo
   (about 36-50 m from the stern) and the stern centreline lift is the
   outlined rectangle across the stern (x -122 .. -105.5), the forward starboard Mk 45 stands at
   the island's fore corner and the aft one on the port quarter, (two lifts in all, per Jane's via Wikipedia).
   Not confirmed (so drawn plainly and listed in the report): exact lift
   sizes, which mast carries which radar, the exact gun and BPDMS
   sponson stations, any boats or davits.

   Model space: +X bow, +Y port, +Z up, metres; waterline z = 0, keel -7.9,
   flight deck 19.8. The flight deck is a clean flat surface for deckOf. Only
   three small team strips lie on it, each 1 x 4 m, 2 cm up.

   Every static part is merged into ONE mesh per material (ten materials,
   ten draws). Nothing is named "turret": the row has no trained mount.
   ASCII only.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTarawaLHA = (function () {
  "use strict";

  var PI = Math.PI;

  var DL     = 127.1;              /* deck end to end: x -127.1..127.1 = 254.2 */
  var FD_TOP = 19.8;               /* flight deck above the waterline          */
  var FD_TH  = 1.2;
  var FD_BOT = FD_TOP - FD_TH;     /* 18.6: gallery deck, top of the hull loft */
  var KEEL   = -7.9;               /* 26 ft draught                            */
  var KNUCK  = 11.0;
  var HX0 = -126.8, HX1 = 127.0;   /* hull loft: transom, stem head            */

  /* plan of the flight deck, counter-clockwise from the bow: 36 m across,
     square stern, bow corners cut away                                     */
  var DECK = [
    [ 127.1, -9.0], [ 127.1,  9.0], [ 121.0, 12.4], [ 110.0, 16.2], [ 100.0, 18.0],
    [-120.0, 18.0], [-127.1, 16.8],
    [-127.1,-16.8], [-120.0,-18.0],
    [ 100.0,-18.0], [ 110.0,-16.2], [ 121.0,-12.4]
  ];
  /* island ledge: the island base hangs over the starboard deck edge, to the
     extreme beam of 40.2 m                                                  */
  var ISL = { x0: -34.0, x1: 23.0, yo: -20.1, yi: -5.5 };
  /* deck-edge lifts: x range and inboard edge, side +1 port / -1 starboard   */
  var LIFTS = [
    { x0: -93.0, x1: -76.0, yin:  5.5, s:  1 }
  ];

  var PAINT = { hull: 0x7a8187, sup: 0x80878d, deck: 0x44494e };
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

  /* largest |y| of the deck outline on one side (+1 port, -1 starboard) at
     station x. Inside a lift notch that is the notch's inner edge, which is
     exactly where the hull stops flaring and the hangar opening begins.  */
  function deckHalf(x, side) {
    var best = 0, i, n = DECK.length;
    for (i = 0; i < n; i++) {
      var a = DECK[i], b = DECK[(i + 1) % n];
      if (side * a[1] <= 0 && side * b[1] <= 0) continue;
      var lo = Math.min(a[0], b[0]), hi = Math.max(a[0], b[0]);
      if (x < lo || x > hi) continue;
      var y;
      if (hi - lo < 1e-6) y = Math.max(side * a[1], side * b[1]);
      else y = side * (a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]));
      if (y > best) best = y;
    }
    return best;
  }

  /* ------------------------------------------------------------- batching
     Every static part lands in one Batch per material and goes out as one
     mesh. Parts are built with ordinary three.js geometry, moved into
     model space, then appended as plain triangles.                       */
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
  /* an ExtrudeGeometry's caps and sides into two different batches       */
  Batch.addGroups = function (geo, batches) {
    var g = geo.index ? geo.toNonIndexed() : geo;
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
  /* vertical cylinder (axis +Z) standing on z0                             */
  function cylZ(THREE, rt, rb, h, seg, x, y, z0, open) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, !!open);
    g.rotateX(PI / 2);
    return place(THREE, g, x, y, z0 + h * 0.5);
  }
  /* a round bar between two points: struts, braces, shafts, masts        */
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
    g.rotateX(PI / 2);                             /* poles on the Z axis    */
    g.scale(sx || 1, sy || 1, sz || 1);
    return place(THREE, g, x, y, z);
  }

  /* A closed frustum on a convex plan: bottom outline at zb, the same
     outline scaled by sTop about its own centroid at zt. Every face of the
     Ford's island leans inboard, and this is how it gets that for free.
     pts run counter-clockwise seen from above. UVs are in metres / 16 so
     the plate texture tiles at a constant size whatever the block.      */
  function frustum(THREE, pts, zb, zt, sBot, sTop) {
    pts = ccw(pts);
    var n = pts.length, cx = 0, cy = 0, i;
    for (i = 0; i < n; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    cx /= n; cy /= n;
    var B = [], T = [];
    for (i = 0; i < n; i++) {
      B.push([cx + (pts[i][0] - cx) * sBot, cy + (pts[i][1] - cy) * sBot]);
      T.push([cx + (pts[i][0] - cx) * sTop, cy + (pts[i][1] - cy) * sTop]);
    }
    var pos = [], uv = [], per = 0, K = 1 / 16;
    function tri(a, b, c, ua, ub, uc) {
      pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
      uv.push(ua[0], ua[1], ub[0], ub[1], uc[0], uc[1]);
    }
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n;
      var b0 = [B[i][0], B[i][1], zb], b1 = [B[j][0], B[j][1], zb];
      var t0 = [T[i][0], T[i][1], zt], t1 = [T[j][0], T[j][1], zt];
      var L = Math.sqrt((B[j][0] - B[i][0]) * (B[j][0] - B[i][0]) + (B[j][1] - B[i][1]) * (B[j][1] - B[i][1]));
      var u0 = per * K, u1 = (per + L) * K; per += L;
      tri(b0, b1, t1, [u0, zb * K], [u1, zb * K], [u1, zt * K]);
      tri(b0, t1, t0, [u0, zb * K], [u1, zt * K], [u0, zt * K]);
    }
    for (i = 1; i < n - 1; i++) {
      tri([T[0][0], T[0][1], zt], [T[i][0], T[i][1], zt], [T[i + 1][0], T[i + 1][1], zt],
          [T[0][0] * K, T[0][1] * K], [T[i][0] * K, T[i][1] * K], [T[i + 1][0] * K, T[i + 1][1] * K]);
      tri([B[0][0], B[0][1], zb], [B[i + 1][0], B[i + 1][1], zb], [B[i][0], B[i][1], zb],
          [B[0][0] * K, B[0][1] * K], [B[i + 1][0] * K, B[i + 1][1] * K], [B[i][0] * K, B[i][1] * K]);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    return g;
  }
  /* the same outline, counter-clockwise seen from above, which is the
     order frustum() needs for its faces to point out                      */
  function ccw(pts) {
    var a = 0, i, n = pts.length;
    for (i = 0; i < n; i++) {
      var p = pts[i], q = pts[(i + 1) % n];
      a += p[0] * q[1] - q[0] * p[1];
    }
    return a < 0 ? pts.slice().reverse() : pts;
  }
  /* a flat plate on a plan outline (any convex polygon), z0 to z1        */
  function plate(THREE, pts, z0, z1) { return frustum(THREE, pts, z0, z1, 1, 1); }
  /* the same plate drawn in the XZ plane (outline as [x, z]) and extruded
     th across Y: fins, vertical tails, blast deflectors                  */
  function vplate(THREE, pts, th) {
    var g = frustum(THREE, pts, -th * 0.5, th * 0.5, 1, 1);
    g.rotateX(PI / 2);                     /* plan y -> z; extrusion -> -y */
    return g;
  }
  /* an outline scaled about its own centroid: balconies, visors, roofs   */
  function scalePts(pts, s) {
    var cx = 0, cy = 0, i, n = pts.length, out = [];
    for (i = 0; i < n; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    cx /= n; cy /= n;
    for (i = 0; i < n; i++) out.push([cx + (pts[i][0] - cx) * s, cy + (pts[i][1] - cy) * s]);
    return out;
  }
  function centroid(pts) {
    var cx = 0, cy = 0, i;
    for (i = 0; i < pts.length; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    return [cx / pts.length, cy / pts.length];
  }

  /* ============================================================= textures */
  function hullTex(THREE, zTop, zBot, H, seed) {
    var W = 2048, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(seed), i, x, y;
    var PXZ = H / (zTop - zBot);
    function rowZ(zz) { return (zTop - zz) * PXZ; }
    function band(za, zb, col) {
      var ya = rowZ(Math.min(za, zTop)), yb = rowZ(Math.max(zb, zBot));
      if (yb > ya) { g.fillStyle = col; g.fillRect(0, ya, W, yb - ya); }
    }
    function hline(zz) {
      if (zz <= zBot || zz >= zTop) return;
      y = rowZ(zz); g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
    }
    band(zTop, 0, hx(PAINT.hull));
    band(0, zBot, "#5e2d29");
    for (i = 0; i < 300; i++) {
      var z = zBot + R() * (zTop - zBot), under = z < 0;
      g.globalAlpha = under ? 0.05 + R() * 0.07 : 0.035 + R() * 0.045;
      g.fillStyle = under ? (R() < 0.5 ? "#7a3a31" : "#3c1c19") : (R() < 0.5 ? "#ffffff" : "#000000");
      g.fillRect(R() * W, rowZ(z), 40 + R() * 240, (0.3 + R() * 1.1) * PXZ);
    }
    g.globalAlpha = 1;
    band(1.5, -0.8, "#17191c");                         /* boot topping       */
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.4;
    for (i = 1; i < 64; i++) {
      x = i * W / 64 + (R() - 0.5) * 4;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
    }
    for (i = 1; i < 9; i++) hline(i * 2.2);
    for (i = 1; i < 4; i++) hline(-i * 2.4);
    g.strokeStyle = "rgba(255,255,255,0.18)"; g.lineWidth = 3; hline(KNUCK);
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 2; hline(KNUCK - 0.35);
    /* a little rust weeping from the scuppers: a 1980s ship at sea         */
    if (zTop > 4) {
      for (i = 0; i < 50; i++) {
        x = R() * W; y = rowZ(5 + R() * 12);
        var len = (2 + R() * 5) * PXZ, gr = g.createLinearGradient(0, y, 0, y + len);
        gr.addColorStop(0, "rgba(92,58,40,0.26)"); gr.addColorStop(1, "rgba(92,58,40,0.0)");
        g.fillStyle = gr; g.fillRect(x, y, 1.5 + R() * 2.5, len);
      }
    }
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }

  function supTex(THREE) {
    var W = 1024, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(4478), i;
    g.fillStyle = hx(PAINT.sup); g.fillRect(0, 0, W, H);
    for (i = 0; i < 140; i++) {
      g.globalAlpha = 0.04 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 30 + R() * 140, 10 + R() * 40);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.4;
    for (i = 1; i < 16; i++) {
      g.beginPath(); g.moveTo(i * W / 16, 0); g.lineTo(i * W / 16, H); g.stroke();
      g.beginPath(); g.moveTo(0, i * H / 16); g.lineTo(W, i * H / 16); g.stroke();
    }
    /* watertight doors and vents stay in the paint                        */
    g.fillStyle = "rgba(20,22,25,0.42)";
    for (i = 0; i < 18; i++) g.fillRect(R() * W, R() * H, 14 + R() * 8, 30 + R() * 10);
    for (i = 0; i < 40; i++) {
      var x = R() * W, y = R() * H * 0.8, len = 8 + R() * 30;
      var gr = g.createLinearGradient(0, y, 0, y + len);
      gr.addColorStop(0, "rgba(90,62,44,0.20)");
      gr.addColorStop(1, "rgba(90,62,44,0.0)");
      g.fillStyle = gr; g.fillRect(x, y, 1.4 + R() * 2.2, len);
    }
    return finish(THREE, cv);
  }

  /* flight deck: one plan-view painting, sampled through the slab's shape
     space UVs, so every mark costs no triangle                            */
  var DX0 = -130, DX1 = 130, DY0 = -24, DY1 = 24;
  var SPOTS = [[-49, 9], [-17, 9], [17, 9], [50, 9], [83, 9],
               [-91, -9], [52, -9], [84, -9], [109, -9]];

  function deckTex(THREE) {
    var W = 2048, H = 384, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(2077), i, p, q;
    var SX = W / (DX1 - DX0), SY = H / (DY1 - DY0);
    function cx(x) { return (x - DX0) * SX; }
    function cy(y) { return H - (y - DY0) * SY; }
    function mline(a, b, wm, col, dash) {
      g.save(); g.strokeStyle = col; g.lineWidth = Math.max(1.0, wm * SY);
      if (dash) g.setLineDash([dash[0] * SX, dash[1] * SX]);
      g.beginPath(); g.moveTo(cx(a[0]), cy(a[1])); g.lineTo(cx(b[0]), cy(b[1])); g.stroke();
      g.restore();
    }
    g.fillStyle = hx(PAINT.deck); g.fillRect(0, 0, W, H);
    for (i = 0; i < 420; i++) {
      g.globalAlpha = 0.04 + R() * 0.06;
      g.fillStyle = R() < 0.5 ? "#8d949a" : "#212529";
      g.fillRect(R() * W, R() * H, 24 + R() * 160, 8 + R() * 36);
    }
    g.globalAlpha = 0.22; g.fillStyle = "#14171a";
    for (i = 0; i < 4500; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    g.fillStyle = "rgba(12,14,16,0.28)";
    for (p = DX0 + 1.5; p < DX1; p += 3.0)
      for (q = DY0 + 1.5; q < DY1; q += 3.0) g.fillRect(cx(p) - 1, cy(q) - 1, 2.2, 2.2);
    g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1.2;
    for (q = DY0 + 2.7; q < DY1; q += 2.7) { g.beginPath(); g.moveTo(0, cy(q)); g.lineTo(W, cy(q)); g.stroke(); }
    /* scuffing where the helicopters land and taxi, aft of the island      */
    for (i = 0; i < 220; i++) {
      g.globalAlpha = 0.06 + R() * 0.07; g.fillStyle = "#0c0e10";
      g.fillRect(cx(-120 + R() * 220), cy(-14 + R() * 28), (3 + R() * 12) * SX, 1.2 + R() * 2.2);
    }
    g.globalAlpha = 1;

    /* white edge lines, the long yellow line the overhead shows, a few
       metres to port of the centreline                                    */
    mline([-124, 17.2], [96, 17.2], 0.4, "#e4e8ea");
    mline([-124, -17.2], [96, -17.2], 0.4, "#e4e8ea");
    mline([-124, 5.5], [112, 5.5], 0.6, "#d8a23a");
    /* the nine landing spots: a white cross with the diagonals of a spot
       marker, as in the overhead                                           */
    SPOTS.forEach(function (s) {
      mline([s[0] - 8, s[1]], [s[0] + 8, s[1]], 0.45, "#e8ecee");
      mline([s[0], s[1] - 6.5], [s[0], s[1] + 6.5], 0.45, "#e8ecee");
      mline([s[0] - 5.5, s[1] - 5.5], [s[0] + 5.5, s[1] + 5.5], 0.35, "#e8ecee");
      mline([s[0] - 5.5, s[1] + 5.5], [s[0] + 5.5, s[1] - 5.5], 0.35, "#e8ecee");
    });
    /* lift outlines: a red dashed safety border inside a black edge        */
    LIFTS.forEach(function (L) {
      var ya = L.s > 0 ? L.yin : -18.0, yb = L.s > 0 ? 18.0 : L.yin;
      g.save();
      g.strokeStyle = "rgba(170,52,44,0.85)"; g.lineWidth = Math.max(1.2, 0.3 * SY);
      g.setLineDash([2 * SX, 1.5 * SX]);
      g.strokeRect(cx(L.x0 + 0.7), cy(yb - 0.7), (L.x1 - L.x0 - 1.4) * SX, (yb - ya - 1.4) * SY);
      g.restore();
      mline([L.x0, ya], [L.x0, yb], 0.3, "#0b0c0e");
      mline([L.x1, ya], [L.x1, yb], 0.3, "#0b0c0e");
      mline([L.x0, L.yin], [L.x1, L.yin], 0.3, "#0b0c0e");
    });
    /* the stern centreline lift (the class has two): a flush platform
       outlined as the 1993 overhead shows it, about 16.5 x 13 m, orange
       outline with black seams; no opening in the hull side               */
    mline([-122.0, 7.7], [-105.5, 7.7], 0.3, "#0b0c0e");
    mline([-122.0, -5.3], [-105.5, -5.3], 0.3, "#0b0c0e");
    mline([-105.5, -5.3], [-105.5, 7.7], 0.3, "#0b0c0e");
    g.save(); g.strokeStyle = "rgba(205,128,52,0.85)"; g.lineWidth = Math.max(1.2, 0.3 * SY);
    g.strokeRect(cx(-122.0), cy(7.7), 16.5 * SX, 13.0 * SY); g.restore();
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.repeat.set(1 / (DX1 - DX0), 1 / (DY1 - DY0));
    t.offset.set(-DX0 / (DX1 - DX0), -DY0 / (DY1 - DY0));
    return t;
  }

  var _tex = null;
  function textures(THREE) {
    if (_tex) return _tex;
    _tex = {
      top:  hullTex(THREE, FD_BOT, 0, 256, 11001),
      bot:  hullTex(THREE, 0, KEEL, 128, 11002),
      sup:  supTex(THREE),
      deck: deckTex(THREE)
    };
    return _tex;
  }

  /* ================================================================= hull
     Full, blunt hull lofted from stations. Waterline half-breadth table W0
     (32.3 m beam), a raked, flared bow whose stem leans forward 8 m from the
     waterline to the deck, a stern that carries the well-deck gate, and a
     flare out to the flight-deck edge above the knuckle.                   */
  var W0T = [[-126.8, 12.8], [-122, 14.4], [-112, 15.6], [-100, 16.15], [40, 16.15],
             [70, 15.8], [90, 14.6], [103, 12.6], [111, 10.2], [116, 7.4], [119, 4.2], [120, 3.2]];
  var KEELZ = [[-126.8, -1.5], [-122, -3.5], [-112, -5.8], [-100, -7.2], [-90, -7.9],
               [75, -7.9], [88, -7.2], [98, -5.8], [106, -3.8], [112, -1.8], [119, 0.0],
               [127.0, 18.4]];
  var SBOT = [[-7.9, 0.36], [-6, 0.60], [-3.5, 0.84], [-1.5, 0.95], [0, 1.0]];
  var LEVZ = [-7.9, -6.0, -3.5, -1.5, 0.0, 3.0, 6.0, 9.0, 12.0, 15.0, 17.2];
  function tbl(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++)
      if (x <= T[i][0]) return lerp(T[i - 1][1], T[i][1], (x - T[i - 1][0]) / (T[i][0] - T[i - 1][0]));
    return T[T.length - 1][1];
  }
  function halfAt(x, z) {
    if (z < 0) return tbl(SBOT, z) * tbl(W0T, x);
    var sh = x > 20 ? 8.1 * (z / FD_BOT) * clamp((x - 20) / 80, 0, 1) : 0;
    var t = Math.pow(z / FD_BOT, 1.35);
    return lerp(tbl(W0T, x - sh), Math.max(0, deckHalf(x, 1) - 0.3), t);
  }
  function sideRing(x) {
    var zk = tbl(KEELZ, x), out = [], first = 0, k;
    while (first < LEVZ.length - 1 && LEVZ[first] < zk) first++;
    var yF = halfAt(x, LEVZ[first]);
    for (k = 0; k < LEVZ.length; k++) {
      if (LEVZ[k] < zk) out.push([0.8 * yF, zk]);
      else out.push([halfAt(x, LEVZ[k]), LEVZ[k]]);
    }
    out.push([Math.max(0, deckHalf(x, 1) - 0.3), FD_BOT]);
    return out;
  }

  function hullGeo(THREE) {
    var xs = [-126.8, -125.5, -124, -122, -120, -118, -115, -112, -108, -105, -100, -95, -90, -85, -78, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50,
              60, 70, 78, 85, 90, 95, 99, 102, 105, 108, 111, 113, 115, 117, 119, 120, 121.5, 123, 124, 125, 125.8, 126.5, HX1];
    var i, j;
    DECK.forEach(function (p) { if (p[0] > HX0 + 0.5 && p[0] < HX1 - 0.5) xs.push(p[0]); });
    xs.sort(function (a, b) { return a - b; });
    var st = [];
    for (i = 0; i < xs.length; i++) if (!st.length || xs[i] - st[st.length - 1] > 0.2) st.push(xs[i]);
    var rings = [];
    for (i = 0; i < st.length; i++) {
      var x = st[i], P = sideRing(x), r = [];
      r.push([0, FD_BOT]);
      for (j = P.length - 1; j >= 0; j--) r.push([P[j][0], P[j][1]]);
      r.push([0, tbl(KEELZ, x)]);
      for (j = 0; j < P.length; j++) r.push([-P[j][0], P[j][1]]);
      rings.push(r);
    }
    var nR = rings[0].length;
    /* topsides and bottom, split by each triangle's own mean height: every
       ring has a vertex on z = 0, so almost none straddle the waterline   */
    var OUT = { top: { pos: [], nrm: [], uv: [], z0: 0, z1: FD_BOT }, bot: { pos: [], nrm: [], uv: [], z0: KEEL, z1: 0 } };
    function V(ii, jj) { var q = rings[ii][jj % nR]; return [st[ii], q[0], q[1]]; }
    function uOf(x) { return (x - HX0) / (HX1 - HX0); }
    /* Faces are collected first, each corner keyed to its grid vertex, so
       the normals can be smoothed across neighbours: flat facets made the
       twisted quads of the bow flare and the run read as a zigzag. Only
       neighbours within 34 degrees are averaged, so the hangar-deck
       knuckle, the gallery deck and the square lift openings stay crisp. */
    var faces = [];
    function tri(a, b, c, ka, kb, kc) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var cxp = uy * vz - uz * vy, cyp = uz * vx - ux * vz, czp = ux * vy - uy * vx;
      var ar = cxp * cxp + cyp * cyp + czp * czp;
      if (ar < 4e-6) return;                                      /* < 1 mm2 */
      ar = Math.sqrt(ar);
      faces.push({ p: [a, b, c], k: [ka, kb, kc], n: [cxp, cyp, czp], u: [cxp / ar, cyp / ar, czp / ar] });
    }
    function K(ii, jj) { return ii * nR + (jj % nR); }
    for (i = 0; i < st.length - 1; i++) {
      for (j = 0; j < nR; j++) {
        tri(V(i, j), V(i + 1, j), V(i, j + 1), K(i, j), K(i + 1, j), K(i, j + 1));
        tri(V(i, j + 1), V(i + 1, j), V(i + 1, j + 1), K(i, j + 1), K(i + 1, j), K(i + 1, j + 1));
      }
    }
    /* the transom: a flat cap, fanned from its own centre, keyed apart
       from the loft so its edge stays a hard corner                        */
    var r0 = rings[0], cyy = 0, czz = 0;
    for (j = 0; j < nR; j++) { cyy += r0[j][0]; czz += r0[j][1]; }
    var C = [st[0], cyy / nR, czz / nR];
    for (j = 0; j < nR; j++) tri(C, V(0, j), V(0, j + 1), -1, -2 - j, -2 - ((j + 1) % nR));
    var around = {}, COS = Math.cos(34 * PI / 180);
    faces.forEach(function (f, fi) {
      f.k.forEach(function (k) { (around[k] || (around[k] = [])).push(fi); });
    });
    faces.forEach(function (f) {
      var o = (f.p[0][2] + f.p[1][2] + f.p[2][2]) / 3 >= 0 ? OUT.top : OUT.bot;
      for (var c = 0; c < 3; c++) {
        var q = f.p[c], sx = 0, sy = 0, sz = 0;
        around[f.k[c]].forEach(function (gi) {
          var g2 = faces[gi];
          if (g2.u[0] * f.u[0] + g2.u[1] * f.u[1] + g2.u[2] * f.u[2] < COS) return;
          sx += g2.n[0]; sy += g2.n[1]; sz += g2.n[2];                /* area-weighted */
        });
        var l = Math.sqrt(sx * sx + sy * sy + sz * sz) || 1;
        o.pos.push(q[0], q[1], q[2]);
        o.nrm.push(sx / l, sy / l, sz / l);
        o.uv.push(uOf(q[0]), clamp((q[2] - o.z0) / (o.z1 - o.z0), 0, 1));
      }
    });
    function geo(o) {
      var g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(o.pos, 3));
      g.setAttribute("normal", new THREE.Float32BufferAttribute(o.nrm, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(o.uv, 2));
      return g;
    }
    return { top: geo(OUT.top), bot: geo(OUT.bot) };
  }

  /* ============================================================ weapons
     Built in their own frame, gun or launcher along +X, ring centre at the
     origin.                                                               */
  /* 5in/54 Mk 45: a pedestal, the sloped gun house and the barrel, shown
     with the barrel out ahead of the house                                */
  function mk45Parts(THREE) {
    return [
      ["S", cylZ(THREE, 2.0, 2.2, 1.3, 12, 0, 0, 0)],
      ["S", box(THREE, 3.6, 3.6, 2.0, 0, 0, 2.3)],
      ["S", box(THREE, 2.2, 3.0, 1.0, 0.9, 0, 3.7, 0, 0.25, 0)],
      ["M", place(THREE, new THREE.CylinderGeometry(0.34, 0.40, 5.4, 8).rotateZ(-PI / 2), 4.1, 0, 3.3)],
      ["K", place(THREE, new THREE.CylinderGeometry(0.42, 0.42, 0.7, 8).rotateZ(-PI / 2), 6.7, 0, 3.3)],
      ["K", box(THREE, 0.3, 1.6, 1.1, 1.8, 0, 3.1)]
    ];
  }
  /* Mk 25 BPDMS: the eight-cell Sea Sparrow box on a pedestal, in two rows
     of four hatches                                                       */
  function mk25Parts(THREE) {
    var P = [
      ["S", cylZ(THREE, 1.0, 1.2, 1.0, 10, 0, 0, 0)],
      ["S", box(THREE, 0.8, 2.6, 1.2, 0, 0, 1.5)],
      ["W", box(THREE, 3.0, 2.4, 1.5, 0.1, 0, 2.7, 0, -0.18, 0)]
    ];
    for (var a = 0; a < 2; a++) for (var b = 0; b < 4; b++)
      P.push(["K", box(THREE, 0.7, 0.55, 0.1, 0.55 - b * 0.0, (a ? 1 : -1) * 0.58, 3.5 + 0.0, 0, 0, 0)]);
    P.push(["K", box(THREE, 0.1, 2.2, 1.3, 1.72, 0, 2.95, 0, -0.18, 0)]);
    return P;
  }

  /* ================================================================ build */
  function build(THREE, M, C) {
    var root = new THREE.Group();
    var i, j, s;

    var T = {}, TX = textures(THREE);
    T.H = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.top, roughness: 0.86, metalness: 0.08 });
    T.U = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.bot, roughness: 0.90, metalness: 0.04 });
    T.S = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.sup, roughness: 0.87, metalness: 0.07 });
    T.D = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.deck, roughness: 0.94, metalness: 0.04 });
    T.K = new THREE.MeshStandardMaterial({ color: 0x1f2327, roughness: 0.90, metalness: 0.05 });
    T.M = new THREE.MeshStandardMaterial({ color: 0x5d666d, roughness: 0.55, metalness: 0.50 });
    T.G = new THREE.MeshStandardMaterial({ color: 0x121c25, roughness: 0.12, metalness: 0.0, transparent: true, opacity: 0.88 });
    T.R = new THREE.MeshStandardMaterial({ color: 0x40474e, roughness: 0.58, metalness: 0.22 });
    T.W = new THREE.MeshStandardMaterial({ color: 0xd7dbdd, roughness: 0.62, metalness: 0.04 });
    /* exactly C.team; pulled toward the camera so the thin strips do not
       shimmer against the deck at the zoom-out limit                      */
    T.T = new THREE.MeshStandardMaterial({ color: new THREE.Color(C && C.team !== undefined ? C.team : 0x4b8fe0),
                                           roughness: 0.60, metalness: 0.10,
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
    /* island parts are written about the old datum; this moves everything
       added since the snapshot along x                                    */
    function snap() { var o = {}; Object.keys(B).forEach(function (k) { o[k] = B[k].p.length; }); return o; }
    function shiftSince(o, dx) {
      Object.keys(B).forEach(function (k) { var a = B[k].p; for (var q = o[k]; q < a.length; q += 3) a[q] += dx; });
    }
    function ringRail(pts, z) {
      for (var k = 0; k < pts.length; k++) {
        var p0 = pts[k], p1 = pts[(k + 1) % pts.length];
        var ddx = p1[0] - p0[0], ddy = p1[1] - p0[1];
        B.M.add(box(THREE, Math.sqrt(ddx * ddx + ddy * ddy), 0.08, 0.08,
                    (p0[0] + p1[0]) * 0.5, (p0[1] + p1[1]) * 0.5, z, 0, 0, Math.atan2(ddy, ddx)));
      }
    }

    /* ------------------------------------------------------------- hull */
    var hg = hullGeo(THREE);
    B.H.add(hg.top);
    B.U.add(hg.bot);

    /* ------------------------------------------------------ flight deck */
    var shp = new THREE.Shape();
    shp.moveTo(DECK[0][0], DECK[0][1]);
    for (i = 1; i < DECK.length; i++) shp.lineTo(DECK[i][0], DECK[i][1]);
    shp.closePath();
    var dg = new THREE.ExtrudeGeometry(shp, { depth: FD_TH, bevelEnabled: false, curveSegments: 1 });
    dg.translate(0, 0, FD_BOT);
    Batch.addGroups(dg, [B.D, B.S]);
    /* the island ledge: a plate out over the starboard gallery to the
       extreme beam, with a knee under it                                   */
    var Z0 = FD_TOP;
    var ledge = [[ISL.x1, -18.0], [ISL.x1, ISL.yo], [ISL.x0, ISL.yo], [ISL.x0, -18.0]];
    B.S.add(plate(THREE, ledge, FD_BOT, FD_TOP));
    B.S.add(frustum(THREE, [[ISL.x1, -16.0], [ISL.x1, ISL.yo + 0.2], [ISL.x0, ISL.yo + 0.2], [ISL.x0, -16.0]], FD_BOT - 4.0, FD_BOT, 0.80, 1.0));

    /* the lifts: the hangar opening in the hull side under each, and the
       two guide trunks; the platform itself is paint on the flush deck     */
    LIFTS.forEach(function (L) {
      var xc = (L.x0 + L.x1) * 0.5, yh = L.s * (halfAt(xc, 12.0) + 0.06);
      B.K.add(box(THREE, L.x1 - L.x0 - 1.0, 0.3, 6.6, xc, yh, 12.6));
      for (j = 0; j < 2; j++) {
        var tx = j ? L.x1 - 0.8 : L.x0 + 0.8;
        B.S.add(box(THREE, 1.2, 1.6, 6.8, tx, yh - L.s * 0.9, 12.6));
      }
      /* the edge of the platform, a dark seam in the deck                  */
      B.K.add(box(THREE, L.x1 - L.x0, 0.2, 0.05, xc, L.s * 17.9, FD_TOP + 0.02));
    });

    /* ----------- catwalks, safety nets, stanchions and life-raft canisters */
    function edgeRun(xa, xb, side) {
      var L2 = xb - xa, mx = (xa + xb) * 0.5, ye = side * 18.0, k;
      B.S.add(box(THREE, L2, 1.5, 0.25, mx, ye + side * 0.9, FD_TOP - 1.45));
      var net = new THREE.BoxGeometry(L2 - 0.4, 1.2, 0.08);
      net.rotateX(side * 0.21);
      net.translate(mx, ye + side * 1.5, FD_TOP - 0.6);
      B.K.add(net);
      B.M.add(box(THREE, L2, 0.08, 0.08, mx, ye + side * 1.6, FD_TOP - 0.25));
      B.M.add(box(THREE, L2, 0.08, 0.08, mx, ye + side * 1.6, FD_TOP - 0.75));
      for (k = 0; k * 5.0 <= L2 + 0.01; k++)
        B.M.add(box(THREE, 0.08, 0.08, 1.0, xa + k * 5.0, ye + side * 1.6, FD_TOP - 0.7));
      var n = Math.floor(L2 / 15);
      for (k = 0; k < n; k++) {
        var rx = xa + (k + 0.5) * L2 / n;
        B.S.add(box(THREE, 3.5, 2.0, 0.15, rx, ye + side * 0.2, FD_TOP - 2.65));
        for (var d = -1; d <= 1; d++) {
          var can = new THREE.CylinderGeometry(0.5, 0.5, 1.15, 6);
          can.translate(rx + d * 1.1, ye + side * 0.4, FD_TOP - 2.1);
          B.W.add(can);
        }
      }
    }
    edgeRun(-118.0, -97.0, 1); edgeRun(-70.0, 96.0, 1);
    edgeRun(-118.0, -36.0, -1); edgeRun(30.0, 96.0, -1);
    /* the bow and stern edges carry a rail only                            */
    [[100.0, 18.0, 121.0, 12.4], [100.0, -18.0, 121.0, -12.4], [-120.0, 18.0, -127.0, 16.8], [-120.0, -18.0, -127.0, -16.8]].forEach(function (e) {
      var dx = e[2] - e[0], dy = e[3] - e[1], l = Math.sqrt(dx * dx + dy * dy);
      B.M.add(box(THREE, l, 0.08, 0.08, (e[0] + e[2]) * 0.5, (e[1] + e[3]) * 0.5, FD_TOP + 0.5, 0, 0, Math.atan2(dy, dx)));
    });

    /* --------------------------------------------- stern: the well-deck gate
       The gate closes a well 268 ft long and about 24 m across; the opening
       is a dark frame, the gate a plated door inside it with its strakes.   */
    B.K.add(box(THREE, 0.24, 24.8, 9.2, -126.85, 0, 5.4));
    B.S.add(box(THREE, 0.22, 23.6, 8.2, -126.95, 0, 5.4));
    for (j = 0; j < 4; j++) B.K.add(box(THREE, 0.1, 23.6, 0.16, -127.05, 0, 2.0 + j * 2.1));
    B.K.add(box(THREE, 0.1, 0.16, 8.2, -127.05, 0, 5.4));
    /* the stern gallery under the deck overhang                            */
    B.G.add(box(THREE, 0.12, 20.0, 1.0, -127.0, 0, FD_BOT - 1.3));

    /* anchors, hawse pipes */
    for (s = -1; s <= 1; s += 2) {
      var ya = halfAt(116.0, 9.0);
      B.K.add(place(THREE, new THREE.CylinderGeometry(0.9, 0.9, 0.3, 10), 115.5, s * (ya + 0.1), 9.0, 0, 0, 0));
      B.M.add(box(THREE, 2.2, 0.5, 3.0, 114.5, s * (ya + 0.25), 7.0));
    }
    /* bilge keels                                                          */
    for (s = -1; s <= 1; s += 2)
      B.U.add(box(THREE, 100.0, 0.35, 1.6, -15.0, s * (halfAt(-15, -4.0) + 0.5), -4.6, s * 0.75, 0, 0));
    /* two shafts and screws, skegs and twin rudders                        */
    for (s = -1; s <= 1; s += 2) {
      var sy = s * 9.2, sz = -5.2, sx = -112.0;
      B.M.add(strut(THREE, -92.0, sy, sz + 1.4, sx - 0.8, sy, sz, 0.5, 6));
      B.M.add(place(THREE, new THREE.CylinderGeometry(0.5, 0.85, 1.8, 8).rotateZ(PI / 2), sx - 1.3, sy, sz));
      B.U.add(box(THREE, 12.0, 0.9, 2.8, -101.0, sy, -6.3));
      for (j = 0; j < 5; j++) {
        var bl = new THREE.BoxGeometry(0.35, 1.5, 2.6);
        bl.translate(0, 0, 1.6);
        bl.rotateZ(0.4);
        bl.rotateX(j * 2 * PI / 5);
        bl.translate(sx - 1.3, sy, sz);
        B.M.add(bl);
      }
      B.M.add(box(THREE, 4.0, 0.5, 5.2, -119.0, s * 5.6, -3.0));
    }

    /* ----------------------------------------------------------- sponsons */
    function sponson(pts, ztop, depth, side) {
      pts = ccw(pts);
      B.S.add(plate(THREE, pts, ztop - 0.6, ztop));
      var yin = Math.min.apply(null, pts.map(function (q) { return Math.abs(q[1]); }));
      var knee = pts.map(function (q) { return [q[0], side * lerp(yin, Math.abs(q[1]), 0.25)]; });
      B.S.add(bracket(pts, knee, ztop - 0.6, ztop - 0.6 - depth));
    }
    function bracket(top, bot, zt, zb) {
      var pos = [], uv = [], nn = top.length, k;
      for (k = 0; k < nn; k++) {
        var q = (k + 1) % nn;
        var t0 = [top[k][0], top[k][1], zt], t1 = [top[q][0], top[q][1], zt];
        var b0 = [bot[k][0], bot[k][1], zb], b1 = [bot[q][0], bot[q][1], zb];
        pos.push(b0[0], b0[1], b0[2], b1[0], b1[1], b1[2], t1[0], t1[1], t1[2]);
        pos.push(b0[0], b0[1], b0[2], t1[0], t1[1], t1[2], t0[0], t0[1], t0[2]);
        uv.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1);
      }
      for (k = 1; k < nn - 1; k++) {
        pos.push(bot[0][0], bot[0][1], zb, bot[k + 1][0], bot[k + 1][1], zb, bot[k][0], bot[k][1], zb);
        uv.push(0, 0, 1, 1, 0, 1);
      }
      var gg = new THREE.BufferGeometry();
      gg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      gg.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
      gg.computeVertexNormals();
      return gg;
    }
    var ZS = 12.8;
    /* three 5in/54 Mk 45: both bow quarters and the starboard quarter, as
       the row's armament lists them; stations read from the overhead        */
    sponson([[16, -15.6], [28, -15.6], [28, -20.1], [16, -20.1]], ZS, 3.6, -1);
    emit(mk45Parts(THREE), 22.0, -17.4, ZS, -0.30);
    sponson([[90, 15.6], [102, 15.6], [102, 20.1], [90, 20.1]], ZS, 3.6, 1);
    emit(mk45Parts(THREE), 96.0, 17.4, ZS, 0.30);
    sponson([[-118, 15.6], [-106, 15.6], [-106, 20.1], [-118, 20.1]], ZS, 3.6, 1);
    emit(mk45Parts(THREE), -112.0, 17.4, ZS, PI - 0.3);
    /* two Mk 25 BPDMS Sea Sparrow launchers                                */
    sponson([[-66, 15.6], [-54, 15.6], [-54, 20.1], [-66, 20.1]], ZS, 3.6, 1);
    emit(mk25Parts(THREE), -60.0, 18.4, ZS, 0.6);
    sponson([[56, -15.6], [66, -15.6], [66, -20.1], [56, -20.1]], ZS, 3.6, -1);
    emit(mk25Parts(THREE), 61.0, -18.4, ZS, -0.6);

    /* ----------------------------------------------------------- island
       Starboard, x -46 .. +4. A bridge block forward under a flight-control
       house, two stacks abaft it, a foremast over the bridge and a mast
       between the stacks.                                                  */
    var Zb = Z0 + 9.5, Zr = Z0 + 16.0, Zp = Z0 + 19.5;
    var isl0 = snap();
    var base = [[11.0, -20.1], [11.0, -7.5], [9.0, -5.5], [-44.0, -5.5], [-46.0, -7.5], [-46.0, -20.1]];
    B.S.add(frustum(THREE, base, Z0, Zb, 1.0, 0.985));
    /* the lower decks: a band of doors and windows along both faces         */
    B.G.add(box(THREE, 38.0, 0.15, 0.9, -22.0, -20.0, Z0 + 4.0));
    B.G.add(box(THREE, 38.0, 0.15, 0.9, -22.0, -5.55, Z0 + 4.0));
    B.S.add(plate(THREE, scalePts(base, 1.015), Zb, Zb + 0.3));
    /* bridge block and its window band, flight-control house above it       */
    var bridge = [[8.0, -19.8], [8.0, -10.2], [-14.0, -10.2], [-14.0, -19.8]];
    B.S.add(frustum(THREE, bridge, Zb + 0.3, Zr, 1.0, 0.97));
    B.G.add(box(THREE, 0.2, 9.4, 1.5, 8.0, -15.0, Zb + 3.6));
    B.G.add(box(THREE, 22.0, 0.2, 1.5, -3.0, -19.85, Zb + 3.6));
    B.G.add(box(THREE, 22.0, 0.2, 1.5, -3.0, -10.15, Zb + 3.6));
    B.S.add(plate(THREE, scalePts(bridge, 1.06), Zr, Zr + 0.3));
    var fly = [[0.0, -18.0], [0.0, -12.0], [-11.0, -12.0], [-11.0, -18.0]];
    B.S.add(frustum(THREE, fly, Zr + 0.3, Zp - 1.3, 1.0, 0.98));
    B.G.add(frustum(THREE, fly, Zp - 1.3, Zp, 1.03, 1.03));
    B.S.add(plate(THREE, scalePts(fly, 1.1), Zp, Zp + 0.3));
    ringRail(scalePts(fly, 1.08), Zp + 1.2);
    ringRail(scalePts(bridge, 1.05), Zr + 1.2);
    /* individual panes in the bridge and flight-control bands               */
    for (i = 0; i < 8; i++) {
      B.G.add(box(THREE, 1.5, 0.1, 1.0, -12.0 + i * 1.9, -19.9, Zb + 1.4));
      B.G.add(box(THREE, 1.5, 0.1, 1.0, -12.0 + i * 1.9, -10.1, Zb + 1.4));
    }
    for (i = 0; i < 6; i++) {
      B.G.add(box(THREE, 0.1, 1.2, 0.9, 8.05, -18.4 + i * 1.5, Zb + 1.4));
      B.K.add(box(THREE, 1.2, 0.1, 1.2, -45.0 + i * 7.0, -20.1, Z0 + 6.0));
    }
    /* the stacks: two rectangular uptakes, raked a little outboard, with
       the roof between them lower                                          */
    [[-16.0, -26.0], [-30.0, -40.0]].forEach(function (c) {
      var sp = [[c[0], -19.2], [c[0], -11.0], [c[1], -11.0], [c[1], -19.2]];
      B.S.add(frustum(THREE, sp, Zb, Z0 + 19.0, 1.0, 0.9));
      B.K.add(plate(THREE, scalePts(sp, 0.84), Z0 + 19.0, Z0 + 19.3));
      B.M.add(box(THREE, 0.3, 7.0, 0.5, (c[0] + c[1]) * 0.5, -15.1, Z0 + 19.5));
      for (j = 0; j < 5; j++) {
        B.K.add(box(THREE, Math.abs(c[0] - c[1]) - 1.6, 0.1, 0.6, (c[0] + c[1]) * 0.5, -19.35 - j * 0.0, Zb + 1.6 + j * 1.5));
        B.K.add(box(THREE, Math.abs(c[0] - c[1]) - 1.6, 0.1, 0.6, (c[0] + c[1]) * 0.5, -10.9, Zb + 1.6 + j * 1.5));
      }
    });
    B.S.add(plate(THREE, [[-26.0, -19.0], [-26.0, -11.0], [-30.0, -11.0], [-30.0, -19.0]], Zb, Z0 + 13.0));
    B.S.add(plate(THREE, [[-16.0, -19.0], [-16.0, -11.0], [-14.0, -11.0], [-14.0, -19.0]], Zb, Z0 + 12.0));
    ringRail([[-26.0, -19.0], [-26.0, -11.0], [-30.0, -11.0], [-30.0, -19.0]], Z0 + 14.0);

    /* lattice mast: four legs, rungs on every level, diagonals on two faces */
    function lattice(mx, my, z0, z1, w0, w1, lev) {
      var k, a, b;
      for (a = -1; a <= 1; a += 2) for (b = -1; b <= 1; b += 2)
        B.M.add(strut(THREE, mx + a * w0 * 0.5, my + b * w0 * 0.5, z0, mx + a * w1 * 0.5, my + b * w1 * 0.5, z1, 0.13, 4));
      for (k = 0; k <= lev; k++) {
        var f = k / lev, w = lerp(w0, w1, f), zz = lerp(z0, z1, f);
        B.M.add(box(THREE, w, 0.1, 0.1, mx, my - w * 0.5, zz));
        B.M.add(box(THREE, w, 0.1, 0.1, mx, my + w * 0.5, zz));
        B.M.add(box(THREE, 0.1, w, 0.1, mx - w * 0.5, my, zz));
        B.M.add(box(THREE, 0.1, w, 0.1, mx + w * 0.5, my, zz));
        if (k < lev) {
          var fn = (k + 1) / lev, wn = lerp(w0, w1, fn), zn = lerp(z0, z1, fn), sg = k % 2 ? -1 : 1;
          B.M.add(strut(THREE, mx + sg * w * 0.5, my - w * 0.5, zz, mx - sg * wn * 0.5, my - wn * 0.5, zn, 0.05, 3));
          B.M.add(strut(THREE, mx - sg * w * 0.5, my + w * 0.5, zz, mx + sg * wn * 0.5, my + wn * 0.5, zn, 0.05, 3));
        }
      }
    }
    function platform(mx, my, zp, r) {
      B.S.add(box(THREE, r * 2, r * 2, 0.3, mx, my, zp));
      ringRail([[mx - r, my - r], [mx + r, my - r], [mx + r, my + r], [mx - r, my + r]], zp + 1.0);
    }
    /* foremast over the bridge: surface search radar low, the 3D air search
       array at the head                                                    */
    var FMX = -5.0, FMY = -15.0;
    lattice(FMX, FMY, Zp + 0.3, Zp + 8.5, 3.2, 1.8, 8);
    platform(FMX, FMY, Zp + 4.5, 2.2);
    platform(FMX, FMY, Zp + 8.5, 1.6);
    B.R.add(cylZ(THREE, 0.5, 0.6, 1.0, 8, FMX, FMY, Zp + 8.65));
    B.R.add(box(THREE, 0.9, 7.6, 3.6, FMX, FMY, Zp + 11.5));
    B.M.add(box(THREE, 1.1, 7.8, 0.15, FMX, FMY, Zp + 13.4));
    B.M.add(box(THREE, 1.1, 7.8, 0.15, FMX, FMY, Zp + 9.6));
    B.R.add(box(THREE, 0.5, 3.9, 0.7, FMX + 0.2, FMY, Zp + 5.0));
    B.M.add(cylZ(THREE, 0.1, 0.15, 3.0, 5, FMX, FMY + 0.8, Zp + 13.5));
    /* the SATCOM radome forward on the bridge roof                           */
    B.S.add(cylZ(THREE, 0.9, 1.1, 0.9, 8, 1.2, -17.8, Zr + 0.3));
    B.W.add(sphere(THREE, 1.6, 12, 7, 1.2, -17.8, Zr + 2.6));
    /* mast between the stacks: the 2D air search antenna and TACAN           */
    var AMX = -28.0, AMY = -15.0;
    lattice(AMX, AMY, Z0 + 12.9, Z0 + 26.0, 3.6, 2.0, 9);
    platform(AMX, AMY, Z0 + 19.0, 2.4);
    platform(AMX, AMY, Z0 + 26.0, 1.7);
    B.R.add(cylZ(THREE, 0.5, 0.6, 1.0, 8, AMX, AMY, Z0 + 26.15));
    B.R.add(box(THREE, 0.5, 7.0, 3.2, AMX, AMY, Z0 + 29.0));
    B.M.add(box(THREE, 0.7, 7.2, 0.12, AMX, AMY, Z0 + 30.7));
    B.M.add(box(THREE, 0.7, 7.2, 0.12, AMX, AMY, Z0 + 27.3));
    B.W.add(cylZ(THREE, 0.5, 0.5, 1.6, 8, AMX, AMY, Z0 + 31.0));
    B.M.add(cylZ(THREE, 0.1, 0.15, 3.5, 5, AMX, AMY - 1.0, Z0 + 31.0));
    /* domes and whips on the stack roof and the island sides                  */
    B.W.add(sphere(THREE, 1.2, 10, 6, -36.0, -17.5, Z0 + 14.9));
    B.S.add(cylZ(THREE, 0.7, 0.9, 0.9, 8, -36.0, -17.5, Z0 + 14.1));
    for (i = 0; i < 5; i++)
      B.M.add(strut(THREE, -44.0 + i * 9.5, -9.2, Zb + 0.3, -44.0 + i * 9.5, -9.2, Zb + 5.5, 0.07, 4, 0.04));
    /* signal yards and a flag hoist off the bridge roof                     */
    B.M.add(box(THREE, 0.15, 7.0, 0.15, -9.0, -15.0, Zp + 7.0));
    B.M.add(strut(THREE, FMX - 1.0, FMY, Zp + 9.0, FMX - 7.0, FMY + 1.5, Zr + 2.0, 0.05, 3));
    /* island sides: ladders and a deck edge gallery for the flight crews     */
    B.S.add(box(THREE, 38.0, 0.9, 0.2, -22.0, -5.95, Z0 + 2.2));
    B.M.add(box(THREE, 38.0, 0.06, 0.06, -22.0, -5.5, Z0 + 3.2));
    shiftSince(isl0, 12.0);

    /* ---------------------------------------------------------- team strips
       Three small strips, each 1 x 4 m and 2 cm above the deck, on the
       bow and the stern, where the RTS camera sees them                     */
    B.T.add(box(THREE, 1.0, 4.0, 0.04, 116.0, 0.0, FD_TOP + 0.04));
    B.T.add(box(THREE, 1.0, 4.0, 0.04, -123.0, 8.0, FD_TOP + 0.04));
    B.T.add(box(THREE, 1.0, 4.0, 0.04, -123.0, -8.0, FD_TOP + 0.04));

    Object.keys(B).forEach(function (k) {
      var mm = B[k].mesh(THREE, T[k]);
      if (mm) root.add(mm);
    });
    root.userData.heroLen = 2 * DL;
    return root;
  }

  return { build: build, len: 2 * DL };
})();

UNIT_MODELS["nato_e80_lha"] = {
  len: 254.2,
  build: function (THREE, M, C) { return HeroTarawaLHA.build(THREE, M, C); }
};
