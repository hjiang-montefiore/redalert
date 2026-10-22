/* ============================================================================
   nato_e80_lha.js -- HERO model: USS Tarawa (LHA-1), Tarawa-class amphibious
   assault ship, as she served from 1976 into the 1980s. Registered as
   nato_e80_lha.

   Published figures: 254.2 m (834 ft) overall, flight deck 820 x 118.1 ft
   (250 x 36 m), 40.2 m extreme beam, 32.3 m (106 ft) on the waterline, 7.9 m
   draught; a 268 x 78 ft well deck (81.7 x 23.8 m) in the stern for four
   LCU 1610; two aircraft lifts; as built, three 5in/54 Mk 45 and two Mk 25
   BPDMS Sea Sparrow launchers.

   Read off the reference photographs (all on Wikimedia Commons, named so the
   next person can check them). There is no scale drawing of the class on
   Commons, so the plan comes from the overhead and the profile from the
   near-square broadside, both pinned to the published length.
     - "USS Tarawa (LHA-1) underway at sea, in 1979": PORT broadside, bow to
       the left, almost square on. 0.219 m a pixel over the 254.2 m. The
       island block (x -35 .. +16), the bridge tiers forward of it (to
       +22.3), the low deckhouse ahead of them (+16 .. +31.5), roof 15.5 m
       above the deck, the stack (x -16 .. -22, top +21), the foremast at
       x +8.5 (head +37.6) and after mast at -29.1 (head +32), the boat deck
       and crane abaft the island, the stem profile, the gallery band 5 m
       deep under the deck edge, and the one opening on the port side aft,
       the hangar door behind the deck-edge lift, at x -56 .. -72.
     - "USS Tarawa (LHA-1) and Essex (LHD-2) aerial view at Long Beach NS in
       1993": nearly straight down. Deck plan, the bow chamfers, the island
       footprint (inboard face 5.5 m to starboard of the centreline), the
       stern lift (x -123 .. -107) and the landing-spot marks.
     - "Aerial view of USS Tarawa (LHA-1), in 1979": from right astern. The
       stern centreline lift (lowered in the photo), the flight deck cut
       back at both quarters with a box launcher on the port quarter and a
       gun house on the starboard quarter, the port deck-edge lift standing
       out past the deck edge, the radome at the island's after end.
     - "USS Tarawa (LHA-1) underway c1979" (starboard quarter, from above)
       and "USS Tarawa (LHA-1) underway in the Pacific Ocean in March 1979"
       (port bow): the bridge tiers, black-capped stack and mast heads, the
       gun under the deck edge at the island's forward corner, the port bow
       gun on its gallery sponson, the boats and crane on the boat deck.
     - "Island of USS Tarawa (LHA-1) c1981": the island's inboard face, the
       after mast with the long SPS-40 reflector at its head and a box
       antenna on a bracket abaft it.
     - "US Navy 080204-N-4774B-494 ... LCU 1630 leaves the well deck of ...
       USS Tarawa (LHA 1)": the square transom and the stern-gate opening
       across nearly all of it.

   What has to read at a glance (the recognition list):
     1. A long FLUSH deck on a slab-sided hull, square at the stern and
        chamfered to a blunt front at the bow, overhanging a flared V bow
        whose raked stem meets the waterline 12.6 m aft of the deck's end.
        (broadside 1979, overhead 1993)
     2. The ISLAND: huge, long and tall - 57 m of slab-sided block 15.5 m
        high and 14.6 m across, overhanging the starboard side, with the
        bridge in three stacked tiers across its forward end. (broadside
        1979, overhead 1993, island c1981)
     3. ONE black-capped stack between TWO masts: the lattice foremast over
        the bridge with the SPS-52 planar array, and the after mast with
        the SPS-40 at its head. (all 1979-81 photographs)
     4. The PORT DECK-EDGE LIFT aft, standing out past the deck edge, with
        the hangar door in the side behind it. (aerial 1979, broadside 1979)
     5. The STERN CENTRELINE LIFT. (aerial 1979, overhead 1993)
     6. The STERN GATE closing the well deck, nearly the width of the
        transom. (2008 stern photograph) It opens: see "wellgate" below.
     7. The quarters of the flight deck cut back for a Mk 25 BPDMS (port)
        and a Mk 45 (starboard). (aerial 1979)
     8. The other two Mk 45: under the deck edge at the island's forward
        corner, and on the port bow gallery. (starboard quarter and port
        bow 1979, overhead 1993)
     9. The boat deck abaft the island with two boats and a tall crane,
        and the radome on the island's after end. (broadside 1979)
    10. The gallery band under the deck edge all round, life rafts and
        catwalk nets. (broadside 1979)
    11. Deck markings: the long line to port of the centreline from a white
        block abaft the lifts, the landing-spot marks. (1979, 1993)

   Not confirmed, and drawn plainly or not at all: which mast carries which
   small antenna; what the box antenna abaft the after mast is; the second
   BPDMS launcher's exact place (a box launcher on a pedestal ahead of the
   forward deckhouse in both 1979 views); the stern gate's two-leaf form in
   later photographs (drawn as one leaf); the boats' types.

   Model space: +X bow, +Y port, +Z up, metres; waterline z = 0, keel -7.9,
   flight deck 19.8. The flight deck is one flat surface for deckOf; the
   lifts sit flush in it (the port one at deck level as in both 1979
   aerials). Nothing is named "turret": the row has no trained mount.
   Every static part is merged into ONE mesh per material; the stern gate
   has its own two meshes under the "wellgate" node. ASCII only.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTarawaLHA = (function () {
  "use strict";

  var PI = Math.PI;

  /* ---------------------------------------------------- principal dimensions */
  var DL     = 127.1;              /* deck end to end: x -127.1..127.1 = 254.2 */
  var FD_TOP = 19.8;               /* flight deck above the waterline          */
  var FD_TH  = 1.2;
  var FD_BOT = FD_TOP - FD_TH;     /* 18.6: gallery deck, top of the hull loft */
  var KEEL   = -7.9;               /* 26 ft draught                            */
  var GAL    = 14.8;               /* top of the side plating; the gallery band
                                      above it is 5 m deep in the broadside   */
  var ZQ     = FD_TOP - 3.4;       /* the quarter platforms in the deck cuts   */
  var HX0 = -126.8, HX1 = 126.7;   /* hull loft: transom (the well's sill, as
                                      the game data has it), stem head       */

  /* ------------------------------------------------------ the deck outline
     Bow first, down the port side, round the cut-back quarters, and forward
     up the starboard side. The centre of the stern runs aft to the transom
     over the well and the stern lift; both quarters are cut back to x
     -118.5 for the weapons on the platforms below.                        */
  var NOTCH_X = -118.5, NOTCH_P = 9.8, NOTCH_S = 8.2;
  var DECK = [
    [ 127.1, -8.6], [ 127.1,  8.6], [ 118.0, 12.4], [ 101.0, 18.0],
    [NOTCH_X, 18.0], [NOTCH_X, NOTCH_P], [-127.1, NOTCH_P],
    [-127.1, -NOTCH_S], [NOTCH_X, -NOTCH_S], [NOTCH_X, -18.0],
    [ 101.0, -18.0], [ 118.0, -12.4]
  ];
  /* the deck edge the hull follows: the outline without the quarter cuts */
  function edgeHalf(x) {
    if (x <= 101.0) return 18.0;
    if (x <= 118.0) return lerp(18.0, 12.4, (x - 101.0) / 17.0);
    return lerp(12.4, 8.6, clamp((x - 118.0) / 9.1, 0, 1));
  }
  /* the port deck-edge lift: a platform standing out past the deck edge at
     flight-deck level, the hangar door in the side behind it              */
  var PLIFT = { x0: -72.5, x1: -56.5, y0: 17.6, y1: 27.6 };
  /* the stern centreline lift, flush in the deck                          */
  var SLIFT = { x0: -123.0, x1: -107.0, y0: -5.5, y1: 7.5 };
  /* the island: main block, bridge tiers ahead of it, boat deck abaft     */
  var ISL = { x0: -35.0, x1: 16.0, xb: 22.3, yi: -5.5, yo: -20.1 };
  /* the well: 268 x 78 ft, floor and deckhead; the gate opening in the
     transom is nearly the well's width (2008 stern photograph)            */
  var WELL = { x1: HX0 + 81.7, hw: 11.9, z0: 1.0, z1: 9.6, ow: 11.75 };

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

  /* ------------------------------------------------------------- batching */
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
  /* closed frustum on a convex plan, outline scaled sBot / sTop about its
     centroid; UVs in metres / 16 so the plate texture tiles evenly       */
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
  function ccw(pts) {
    var a = 0, i, n = pts.length;
    for (i = 0; i < n; i++) {
      var p = pts[i], q = pts[(i + 1) % n];
      a += p[0] * q[1] - q[0] * p[1];
    }
    return a < 0 ? pts.slice().reverse() : pts;
  }
  function plate(THREE, pts, z0, z1) { return frustum(THREE, pts, z0, z1, 1, 1); }
  function vplate(THREE, pts, th) {
    var g = frustum(THREE, pts, -th * 0.5, th * 0.5, 1, 1);
    g.rotateX(PI / 2);
    return g;
  }
  function scalePts(pts, s) {
    var cx = 0, cy = 0, i, n = pts.length, out = [];
    for (i = 0; i < n; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    cx /= n; cy /= n;
    for (i = 0; i < n; i++) out.push([cx + (pts[i][0] - cx) * s, cy + (pts[i][1] - cy) * s]);
    return out;
  }
  function rect(x0, x1, y0, y1) { return [[x1, y0], [x1, y1], [x0, y1], [x0, y0]]; }
  /* a flat quad a-b-c-d, wound so its face looks toward point "eye"       */
  function quad(THREE, a, b, c, d, eye) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var ex = eye[0] - a[0], ey = eye[1] - a[1], ez = eye[2] - a[2];
    var P = nx * ex + ny * ey + nz * ez >= 0 ? [a, b, c, a, c, d] : [a, c, b, a, d, c];
    var pos = [], uv = [];
    P.forEach(function (p) { pos.push(p[0], p[1], p[2]); uv.push(p[0] / 16, (p[1] + p[2]) / 16); });
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    return g;
  }

  /* ============================================================= textures */
  var PAINT = { hull: 0x7a8187, sup: 0x81888e, deck: 0x464b50 };

  /* hull plating: v runs straight from z, so the boot topping and the
     gallery band sit at their heights the whole length                   */
  function hullTex(THREE, zTop, zBot, H, seed) {
    var W = 2048, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(seed), i, x, y, z;
    var PXZ = H / (zTop - zBot), PXX = W / (HX1 - HX0);
    function rowZ(zz) { return (zTop - zz) * PXZ; }
    function colX(xx) { return (xx - HX0) * PXX; }
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
      z = zBot + R() * (zTop - zBot);
      var under = z < 0;
      g.globalAlpha = under ? 0.05 + R() * 0.07 : 0.035 + R() * 0.045;
      g.fillStyle = under ? (R() < 0.5 ? "#7a3a31" : "#3c1c19") : (R() < 0.5 ? "#ffffff" : "#000000");
      g.fillRect(R() * W, rowZ(z), 40 + R() * 240, (0.3 + R() * 1.1) * PXZ);
    }
    g.globalAlpha = 1;
    /* the gallery band under the flight deck: in shadow, the openings of
       the gallery deck and the white life-raft drums in them             */
    if (zTop > GAL) {
      band(FD_BOT, GAL + 0.4, "#5a6066");
      g.fillStyle = "rgba(18,20,23,0.85)";
      for (x = HX0 + 4; x < HX1 - 10; x += 7 + R() * 5) {
        var w = (2.5 + R() * 4) * PXX;
        g.fillRect(colX(x), rowZ(FD_BOT - 0.6), w, 2.2 * PXZ);
      }
      g.strokeStyle = "rgba(255,255,255,0.22)"; g.lineWidth = 2; hline(GAL + 0.4);
    }
    band(1.5, -0.8, "#17191c");                         /* boot topping       */
    /* plate butts: the broadside shows the side as tall vertical panels    */
    g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1.4;
    for (i = 1; i < 64; i++) {
      x = i * W / 64 + (R() - 0.5) * 4;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
    }
    for (i = 1; i < 7; i++) hline(i * 2.2);
    for (i = 1; i < 4; i++) hline(-i * 2.4);
    /* rows of scuttles along the side, the small dark ports of the
       broadside, thinned out over the well and the machinery             */
    if (zTop > 4) {
      g.fillStyle = "rgba(20,22,24,0.7)";
      [12.3, 9.4].forEach(function (zr) {
        for (x = HX0 + 6; x < HX1 - 14; x += 2.6) {
          if (R() < 0.45) continue;
          g.fillRect(colX(x), rowZ(zr), 0.55 * PXX, 0.5 * PXZ);
        }
      });
      for (i = 0; i < 50; i++) {
        x = R() * W; y = rowZ(5 + R() * 9);
        var len = (2 + R() * 5) * PXZ, gr = g.createLinearGradient(0, y, 0, y + len);
        gr.addColorStop(0, "rgba(92,58,40,0.24)"); gr.addColorStop(1, "rgba(92,58,40,0.0)");
        g.fillStyle = gr; g.fillRect(x, y, 1.5 + R() * 2.5, len);
      }
    }
    /* draught marks forward and aft                                        */
    g.fillStyle = "rgba(236,238,240,0.9)";
    [110.0, -122.0].forEach(function (mx) {
      for (var k = 0; k < 6; k++) {
        var zz = -5 + k * 1.0;
        if (zz > zBot && zz < zTop) g.fillRect(colX(mx), rowZ(zz) - 1, 6, 2);
      }
    });
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }

  /* island and deckhouse plate: the island's faces are big vertical panels
     in every photograph, with doors at the foot                           */
  function supTex(THREE) {
    var W = 1024, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(4479), i;
    g.fillStyle = hx(PAINT.sup); g.fillRect(0, 0, W, H);
    for (i = 0; i < 140; i++) {
      g.globalAlpha = 0.04 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 30 + R() * 140, 10 + R() * 40);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.6;
    for (i = 1; i < 16; i++) {
      g.beginPath(); g.moveTo(i * W / 16, 0); g.lineTo(i * W / 16, H); g.stroke();
    }
    g.strokeStyle = "rgba(0,0,0,0.18)"; g.lineWidth = 1.2;
    for (i = 1; i < 8; i++) {
      g.beginPath(); g.moveTo(0, i * H / 8); g.lineTo(W, i * H / 8); g.stroke();
    }
    g.fillStyle = "rgba(20,22,25,0.40)";
    for (i = 0; i < 22; i++) g.fillRect(R() * W, R() * H, 10 + R() * 8, 8 + R() * 8);
    for (i = 0; i < 40; i++) {
      var x = R() * W, y = R() * H * 0.8, len = 8 + R() * 30;
      var gr = g.createLinearGradient(0, y, 0, y + len);
      gr.addColorStop(0, "rgba(90,62,44,0.18)");
      gr.addColorStop(1, "rgba(90,62,44,0.0)");
      g.fillStyle = gr; g.fillRect(x, y, 1.4 + R() * 2.2, len);
    }
    return finish(THREE, cv);
  }

  /* --------------------------------------------------------- flight deck */
  var DX0 = -130, DX1 = 130, DY0 = -30, DY1 = 30;
  /* landing-spot marks, read off the 1993 overhead: six down the port side,
     four to starboard (one abaft the island, three forward of it)         */
  var SPOTS = [[-93.5, 1], [-47.0, 1], [-16.5, 1], [15.0, 1], [52.0, 1], [86.0, 1],
               [-93.5, -1], [55.0, -1], [86.0, -1], [112.0, -1]];
  var LINE_Y = 5.5;

  function deckTex(THREE) {
    var W = 2048, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
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
    function mrect(xa, ya, xb, yb, col) {
      g.fillStyle = col; g.fillRect(cx(xa), cy(yb), (xb - xa) * SX, (yb - ya) * SY);
    }
    g.fillStyle = hx(PAINT.deck); g.fillRect(0, 0, W, H);
    for (i = 0; i < 460; i++) {
      g.globalAlpha = 0.04 + R() * 0.06;
      g.fillStyle = R() < 0.5 ? "#8d949a" : "#212529";
      g.fillRect(R() * W, R() * H, 24 + R() * 160, 8 + R() * 36);
    }
    g.globalAlpha = 0.22; g.fillStyle = "#14171a";
    for (i = 0; i < 4500; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    /* tie-down pad-eyes on a 3 m grid and the plating seams               */
    g.fillStyle = "rgba(12,14,16,0.28)";
    for (p = DX0 + 1.5; p < DX1; p += 3.0)
      for (q = DY0 + 1.5; q < DY1; q += 3.0) g.fillRect(cx(p) - 1, cy(q) - 1, 2.2, 2.2);
    g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1.2;
    for (q = DY0 + 2.7; q < DY1; q += 2.7) { g.beginPath(); g.moveTo(0, cy(q)); g.lineTo(W, cy(q)); g.stroke(); }
    /* rotor wash and tyre scuffing round the spots                         */
    SPOTS.forEach(function (s) {
      for (var k = 0; k < 26; k++) {
        g.globalAlpha = 0.05 + R() * 0.07; g.fillStyle = "#0c0e10";
        g.fillRect(cx(s[0] - 7 + R() * 14), cy(s[1] * 11 - 5 + R() * 10), (2 + R() * 8) * SX, 1.2 + R() * 2.2);
      }
    });
    g.globalAlpha = 1;

    /* the long line a few metres to port of the centreline, from the white
       block abaft the lifts (starboard-quarter 1979 view; solid there, and
       dashed up the bow in the port-bow view)                             */
    mrect(-104.0, LINE_Y - 1.7, -95.0, LINE_Y + 1.7, "#e4e8ea");
    mline([-95.0, LINE_Y], [62.0, LINE_Y], 0.6, "#e4e8ea");
    mline([62.0, LINE_Y], [122.0, LINE_Y], 0.6, "#e4e8ea", [4, 4]);
    mline([-104.0, 0], [122.0, 0], 0.35, "rgba(228,232,234,0.8)", [3, 6]);
    /* the spot marks: a bar in from the deck edge, the lineup line forward
       along it and a diagonal forward and inboard, as the overhead shows  */
    SPOTS.forEach(function (s) {
      var x = s[0], d = s[1];
      mline([x, d * 16.6], [x, d * 6.8], 0.5, "#e8ecee");
      mline([x, d * 13.4], [x + 14.0, d * 13.4], 0.45, "#e8ecee");
      mline([x, d * 13.4], [x + 6.4, d * 7.0], 0.45, "#e8ecee");
    });
    /* the stern lift: a black seam round it and a dashed safety border     */
    var L = SLIFT;
    g.save(); g.strokeStyle = "rgba(170,52,44,0.85)"; g.lineWidth = Math.max(1.2, 0.3 * SY);
    g.setLineDash([2 * SX, 1.5 * SX]);
    g.strokeRect(cx(L.x0 + 0.8), cy(L.y1 - 0.8), (L.x1 - L.x0 - 1.6) * SX, (L.y1 - L.y0 - 1.6) * SY);
    g.restore();
    g.save(); g.strokeStyle = "#0b0c0e"; g.lineWidth = Math.max(1.2, 0.3 * SY);
    g.strokeRect(cx(L.x0), cy(L.y1), (L.x1 - L.x0) * SX, (L.y1 - L.y0) * SY); g.restore();
    /* the port lift's platform samples this same painting                  */
    L = PLIFT;
    g.save(); g.strokeStyle = "rgba(170,52,44,0.85)"; g.lineWidth = Math.max(1.2, 0.3 * SY);
    g.setLineDash([2 * SX, 1.5 * SX]);
    g.strokeRect(cx(L.x0 + 0.8), cy(L.y1 - 0.8), (L.x1 - L.x0 - 1.6) * SX, (L.y1 - L.y0 - 1.6) * SY);
    g.restore();
    mline([L.x0, 18.0], [L.x1, 18.0], 0.3, "#0b0c0e");
    /* the deck edge line, white, all round                                 */
    g.save();
    g.strokeStyle = "rgba(226,230,232,0.7)"; g.lineWidth = Math.max(1.2, 0.5 * SY);
    g.beginPath(); g.moveTo(cx(DECK[0][0] - 0.3), cy(DECK[0][1]));
    for (i = 1; i < DECK.length; i++) g.lineTo(cx(DECK[i][0]), cy(DECK[i][1]));
    g.closePath(); g.stroke(); g.restore();
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
     Lofted from station outlines as the benchmark carrier is. A Tarawa
     section is a flat bottom, a tight bilge and slab sides standing
     straight up from the bilge to the gallery deck, 32.3 m apart; the
     gallery band above leans out a little to the flight-deck edge. Forward
     the waterlines fine away to a raked stem and the upper levels flare
     out as a V to the blunt end of the flight deck; aft they stay full to a
     square transom, wide enough for the well-deck gate.

     The stem and forefoot, read off the 1979 broadside: the stem meets the
     waterline 12.6 m aft of the deck's end and rakes forward in a convex
     curve, 8.6 m aft at 5.5 m up, 4.3 m at 10 m. Below the waterline it
     sweeps back into the keel at about x 96.                              */
  var FORE = [[96.0, -7.9], [100.5, -7.7], [104.0, -7.0], [107.2, -5.6], [110.0, -3.6],
              [112.5, -1.6], [114.5, 0.0], [118.5, 5.5], [121.4, 10.0], [124.2, GAL],
              [HX1, FD_BOT]];
  var STEMZ = FORE.map(function (p) { return [p[1], p[0]]; });
  function stemX(z) { return tbl(STEMZ, z); }
  /* the run: the bottom rises under the well deck to a transom whose lower
     edge is a metre under the waterline                                   */
  var KEELZ = [[HX0, -0.6], [-120.0, -1.8], [-110.0, -3.4], [-100.0, -4.9], [-90.0, -6.1],
               [-80.0, -7.0], [-68.0, -7.6], [-56.0, -7.9], [96.0, -7.9]];
  function keelZ(x) { return x <= 96.0 ? tbl(KEELZ, x) : tbl(FORE, x); }

  /* The table was trimmed until the hull under the waterline measured
     39,170 m3 by its own sections: 40,150 t of sea water against the
     published 39,967 t full load at 7.9 m, block coefficient 0.64 on the
     241 m waterline. The first cut, slab-sided to both ends, came to
     52,200 t: the bottom fines away from amidships and the run rises
     under the well, while the waterline stays full aft for the gate.
      z      yMid   xf0  p    q     xs0    xsEnd  ps                      */
  var LEV = [
    [ -7.9, 10.2, -55, 1.5, 1.35,  -22, -125, 1.4 ],
    [ -7.4, 13.0, -45, 1.5, 1.25,  -32, -145, 1.5 ],
    [ -6.3, 14.9, -30, 1.6, 1.18,  -42, -175, 1.6 ],
    [ -4.0, 15.85, -15, 1.7, 1.08, -58, -215, 1.8 ],
    [  0.0, 16.15, 10, 1.9, 1.00,  -88, -255, 2.2 ],
    [  5.0, 16.2,  36, 2.0, 0.85, -110, -320, 2.2 ],
    [ 10.0, 16.3,  56, 2.2, 0.70, -120, -400, 2.0 ],
    [  GAL, 16.45, 72, 2.5, 0.60, -999, -9999, 1 ]
  ];
  /* the V of the flared bow: half-breadth grows k metres a metre aft of
     the stem, k rising with height                                         */
  function wedge(x, z) {
    var k = z <= 0 ? 0.55 : z <= GAL ? lerp(0.55, 0.9, z / GAL) : lerp(0.9, 1.35, (z - GAL) / (FD_BOT - GAL));
    return k * Math.max(0, stemX(z) - x);
  }
  function lowY(k, x) {
    var L = LEV[k], z = L[0], y = L[1];
    var sx = stemX(z);
    if (x > L[2]) {
      var t = clamp((x - L[2]) / (sx - L[2]), 0, 1);
      y *= Math.pow(Math.max(0, 1 - Math.pow(t, L[3])), L[4]);
    }
    if (x < L[5]) {
      var ts = clamp((L[5] - x) / (L[5] - L[6]), 0, 1);
      y *= Math.max(0, 1 - Math.pow(ts, L[7]));
    }
    return Math.min(y, wedge(x, z));
  }
  /* one side's outline at station x, keel up to the gallery deck, [y, z].
     In the cut-back quarters the side stops at the platform level and
     steps in to the flight deck's edge.                                   */
  function sideRing(x, side) {
    var out = [], zk = keelZ(x), k, first = 0;
    while (first < LEV.length - 1 && LEV[first][0] < zk) first++;
    var yFirst = lowY(first, x);
    for (k = 0; k < LEV.length; k++) {
      if (LEV[k][0] < zk) out.push([0.8 * yFirst, zk]);
      else out.push([lowY(k, x), LEV[k][0]]);
    }
    var yG = out[LEV.length - 1][0];
    var yT = Math.max(yG, Math.min(edgeHalf(x) - 1.0, wedge(x, FD_BOT)));
    if (x < NOTCH_X - 0.05) {
      var ny = side > 0 ? NOTCH_P : NOTCH_S;
      out.push([yT, ZQ], [ny, ZQ], [ny, FD_BOT]);
    } else {
      var f1 = (ZQ - GAL) / (FD_BOT - GAL), f2 = (ZQ + 0.9 - GAL) / (FD_BOT - GAL);
      out.push([lerp(yG, yT, f1), ZQ], [lerp(yG, yT, f2), ZQ + 0.9], [yT, FD_BOT]);
    }
    return out;
  }

  function hullGeo(THREE) {
    var xs = [HX0, -126.0, -124.5, -122.5, -120.0, NOTCH_X - 0.1, NOTCH_X + 0.1, -116.0, -112.0,
              -108.0, -104.0, -99.0, -94.0, -88.0, -84.0, -76.0, PLIFT.x0, PLIFT.x1, -48.0];
    var i, j, x;
    for (x = -36; x < 50; x += 12) xs.push(x);
    for (x = 54; x < 96; x += 5) xs.push(x);
    [96, 100.5, 104, 107.2, 110, 112.5, 114.5, 116.5, 118.5, 120.0, 121.4, 122.8,
     124.2, 125.2, 126.0, HX1].forEach(function (v) { xs.push(v); });
    xs.sort(function (a, b) { return a - b; });
    var st = [];
    for (i = 0; i < xs.length; i++) if (!st.length || xs[i] - st[st.length - 1] > 0.15) st.push(xs[i]);

    /* ring: top centre, port side top-down, keel centre, starboard bottom-up */
    var rings = [];
    for (i = 0; i < st.length; i++) {
      var P = sideRing(st[i], 1), S = sideRing(st[i], -1), r = [];
      r.push([0, FD_BOT]);
      for (j = P.length - 1; j >= 0; j--) r.push([P[j][0], P[j][1]]);
      r.push([0, keelZ(st[i])]);
      for (j = 0; j < S.length; j++) r.push([-S[j][0], S[j][1]]);
      rings.push(r);
    }
    var nR = rings[0].length;
    var OUT = { top: { pos: [], nrm: [], uv: [], z0: 0, z1: FD_BOT }, bot: { pos: [], nrm: [], uv: [], z0: KEEL, z1: 0 } };
    function V(ii, jj) { var q = rings[ii][jj % nR]; return [st[ii], q[0], q[1]]; }
    function uOf(xx) { return (xx - HX0) / (HX1 - HX0); }
    var faces = [];
    function tri(a, b, c, ka, kb, kc) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var cxp = uy * vz - uz * vy, cyp = uz * vx - ux * vz, czp = ux * vy - uy * vx;
      var ar = cxp * cxp + cyp * cyp + czp * czp;
      if (ar < 4e-6) return;
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
    /* the transom: the first ring as a flat face with the well-gate opening
       cut out of it, triangulated by three's own shape code              */
    var r0 = rings[0], sh = new THREE.Shape(), last = null, n0 = 0;
    for (j = 0; j < nR; j++) {
      var q0 = r0[j];
      if (last && Math.abs(q0[0] - last[0]) < 0.02 && Math.abs(q0[1] - last[1]) < 0.02) continue;
      if (!n0) sh.moveTo(q0[0], q0[1]); else sh.lineTo(q0[0], q0[1]);
      last = q0; n0++;
    }
    var hole = new THREE.Path();
    hole.moveTo(-WELL.ow, WELL.z0); hole.lineTo(-WELL.ow, WELL.z1); hole.lineTo(WELL.ow, WELL.z1);
    hole.lineTo(WELL.ow, WELL.z0); hole.lineTo(-WELL.ow, WELL.z0);
    sh.holes.push(hole);
    var tg = new THREE.ShapeGeometry(sh), TP = tg.getAttribute("position"), TI = tg.index;
    var tcount = TI ? TI.count : TP.count;
    for (j = 0; j < tcount; j += 3) {
      var ia = TI ? TI.getX(j) : j, ib = TI ? TI.getX(j + 1) : j + 1, ic = TI ? TI.getX(j + 2) : j + 2;
      var A = [st[0], TP.getX(ia), TP.getY(ia)], Bv = [st[0], TP.getX(ib), TP.getY(ib)], Cv = [st[0], TP.getX(ic), TP.getY(ic)];
      /* facing aft (-X)                                                  */
      tri(A, Cv, Bv, -1 - ia, -1 - ic, -1 - ib);
    }
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
          sx += g2.n[0]; sy += g2.n[1]; sz += g2.n[2];
        });
        var l = Math.sqrt(sx * sx + sy * sy + sz * sz) || 1;
        o.pos.push(q[0], q[1], q[2]);
        o.nrm.push(sx / l, sy / l, sz / l);
        o.uv.push(uOf(q[0]) + (q[0] < HX0 + 0.01 ? q[1] * 0.0004 : 0), clamp((q[2] - o.z0) / (o.z1 - o.z0), 0, 1));
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
  /* 5in/54 Mk 45: the low faceted gun house on its ring and the barrel   */
  function mk45Parts(THREE) {
    return [
      ["S", cylZ(THREE, 1.9, 2.1, 0.7, 12, 0, 0, 0)],
      ["S", frustum(THREE, [[1.9, 0], [1.2, 1.55], [-1.7, 1.75], [-2.2, 1.0], [-2.2, -1.0], [-1.7, -1.75], [1.2, -1.55]], 0.7, 2.55, 1.0, 0.82)],
      ["M", place(THREE, new THREE.CylinderGeometry(0.11, 0.17, 6.9, 8).rotateZ(-PI / 2), 4.6, 0, 1.75)],
      ["M", place(THREE, new THREE.CylinderGeometry(0.36, 0.36, 0.8, 8).rotateZ(-PI / 2), 1.6, 0, 1.75)],
      ["K", box(THREE, 0.1, 1.1, 0.5, 1.72, 0, 1.75)]
    ];
  }
  /* Mk 25 BPDMS: the eight-cell box on its pedestal, two rows of four    */
  function mk25Parts(THREE) {
    var P = [
      ["S", cylZ(THREE, 0.9, 1.1, 1.3, 10, 0, 0, 0)],
      ["S", box(THREE, 0.8, 2.8, 1.3, 0, 0, 1.9)],
      ["W", box(THREE, 3.2, 2.5, 1.6, 0.2, 0, 3.1, 0, -0.18, 0)]
    ];
    for (var a = 0; a < 2; a++) for (var b = 0; b < 4; b++)
      P.push(["K", box(THREE, 0.06, 0.55, 0.62, 1.82, -0.9 + b * 0.6, 2.95 + a * 0.68, 0, -0.18, 0)]);
    return P;
  }
  /* a ship's boat on deck: a lofted hull, the canopy and a cradle        */
  function boatParts(THREE, M, len) {
    var w = len * 0.29, h = len * 0.14;
    var hull = M.loft(THREE, [
      { x:  len * 0.50, w: 0.10, h: h * 0.8, zc: h * 0.6 },
      { x:  len * 0.36, w: w * 0.75, h: h, zc: h * 0.55 },
      { x:  len * 0.05, w: w, h: h, zc: h * 0.5 },
      { x: -len * 0.40, w: w * 0.95, h: h * 0.9, zc: h * 0.55 },
      { x: -len * 0.50, w: w * 0.85, h: h * 0.8, zc: h * 0.6 }
    ], 8);
    return [
      ["S", hull],
      ["S", box(THREE, len * 0.36, w * 0.7, h * 0.8, -len * 0.08, 0, h * 1.35)],
      ["G", box(THREE, 0.12, w * 0.62, h * 0.35, len * 0.10, 0, h * 1.45)],
      ["M", box(THREE, 0.4, w * 1.1, 0.6, len * 0.25, 0, 0.3)],
      ["M", box(THREE, 0.4, w * 1.1, 0.6, -len * 0.25, 0, 0.3)]
    ];
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
    T.K = new THREE.MeshStandardMaterial({ color: 0x1c1f23, roughness: 0.90, metalness: 0.05 });
    T.M = new THREE.MeshStandardMaterial({ color: 0x5d666d, roughness: 0.55, metalness: 0.50 });
    T.G = new THREE.MeshStandardMaterial({ color: 0x121c25, roughness: 0.12, metalness: 0.0, transparent: true, opacity: 0.88 });
    T.R = new THREE.MeshStandardMaterial({ color: 0x3a4148, roughness: 0.62, metalness: 0.20 });
    T.W = new THREE.MeshStandardMaterial({ color: 0xd7dbdd, roughness: 0.62, metalness: 0.04 });
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
    function ringRail(pts, z) {
      for (var k = 0; k < pts.length; k++) {
        var p0 = pts[k], p1 = pts[(k + 1) % pts.length];
        var ddx = p1[0] - p0[0], ddy = p1[1] - p0[1];
        B.M.add(box(THREE, Math.sqrt(ddx * ddx + ddy * ddy), 0.08, 0.08,
                    (p0[0] + p1[0]) * 0.5, (p0[1] + p1[1]) * 0.5, z, 0, 0, Math.atan2(ddy, ddx)));
      }
    }
    function rail(ax, ay, bx, by, z) {
      var ddx = bx - ax, ddy = by - ay;
      B.M.add(box(THREE, Math.sqrt(ddx * ddx + ddy * ddy), 0.08, 0.08, (ax + bx) * 0.5, (ay + by) * 0.5, z, 0, 0, Math.atan2(ddy, ddx)));
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

    /* the port deck-edge lift: the platform out past the deck edge, flush
       with the deck and sampling the same painting; the hangar door in the
       side behind it, and the guide trunks either end                       */
    var PL = PLIFT;
    var ls = new THREE.Shape();
    ls.moveTo(PL.x0, PL.y0); ls.lineTo(PL.x1, PL.y0); ls.lineTo(PL.x1, PL.y1); ls.lineTo(PL.x0, PL.y1); ls.closePath();
    var lg = new THREE.ExtrudeGeometry(ls, { depth: 1.0, bevelEnabled: false });
    lg.translate(0, 0, FD_TOP - 1.0);
    Batch.addGroups(lg, [B.D, B.S]);
    var plx = (PL.x0 + PL.x1) * 0.5, ply = lowY(LEV.length - 1, plx);
    B.K.add(box(THREE, PL.x1 - PL.x0 - 1.0, 0.3, FD_BOT - 10.4, plx, ply + 0.6, (FD_BOT + 10.4) * 0.5));
    for (j = 0; j < 2; j++) {
      var tx = j ? PL.x1 + 0.7 : PL.x0 - 0.7;
      B.S.add(box(THREE, 1.4, 1.6, FD_TOP - 9.0, tx, ply + 1.2, (FD_TOP + 9.0) * 0.5));
    }
    /* the platform's under-frame                                           */
    for (j = 0; j < 4; j++)
      B.M.add(box(THREE, PL.x1 - PL.x0 - 0.6, 0.35, 0.7, plx, PL.y0 + 1.5 + j * 2.6, FD_TOP - 1.35));
    rail(PL.x0, PL.y1, PL.x1, PL.y1, FD_TOP + 0.9);
    /* the stern lift: the platform's edge seam, a hair proud               */
    B.K.add(box(THREE, SLIFT.x1 - SLIFT.x0, 0.18, 0.04, (SLIFT.x0 + SLIFT.x1) * 0.5, SLIFT.y0, FD_TOP + 0.01));
    B.K.add(box(THREE, SLIFT.x1 - SLIFT.x0, 0.18, 0.04, (SLIFT.x0 + SLIFT.x1) * 0.5, SLIFT.y1, FD_TOP + 0.01));
    B.K.add(box(THREE, 0.18, SLIFT.y1 - SLIFT.y0, 0.04, SLIFT.x1, (SLIFT.y0 + SLIFT.y1) * 0.5, FD_TOP + 0.01));
    B.K.add(box(THREE, 0.18, SLIFT.y1 - SLIFT.y0, 0.04, SLIFT.x0, (SLIFT.y0 + SLIFT.y1) * 0.5, FD_TOP + 0.01));

    /* ------------------- catwalks, safety nets, rails and life-raft racks
       along the straight deck edges, broken by the island, the lift and
       the boat deck. Nothing hangs past either end of the deck.            */
    function edgeRun(xa, xb, side, rafts) {
      var L2 = xb - xa, mx = (xa + xb) * 0.5, ye = side * 18.0, k;
      B.S.add(box(THREE, L2, 1.5, 0.25, mx, ye + side * 0.75, FD_TOP - 1.45));
      var net = new THREE.BoxGeometry(L2 - 0.4, 1.9, 0.08);
      net.rotateX(side * 0.21);
      net.translate(mx, ye + side * 2.2, FD_TOP - 0.62);
      B.K.add(net);
      B.M.add(box(THREE, L2, 0.08, 0.08, mx, ye + side * 1.5, FD_TOP - 0.25));
      for (k = 0; k * 6.0 <= L2 + 0.01; k++)
        B.M.add(box(THREE, 0.08, 0.08, 1.2, xa + k * 6.0, ye + side * 1.5, FD_TOP - 0.85));
      if (!rafts) return;
      var n = Math.floor(L2 / 14);
      for (k = 0; k < n; k++) {
        var rx = xa + (k + 0.5) * L2 / n;
        B.S.add(box(THREE, 3.5, 1.8, 0.15, rx, ye - side * 0.3, FD_TOP - 2.95));
        for (var d = -1; d <= 1; d++) {
          var can = new THREE.CylinderGeometry(0.5, 0.5, 1.15, 6);
          can.translate(rx + d * 1.1, ye - side * 0.3, FD_TOP - 2.3);
          B.W.add(can);
        }
      }
    }
    edgeRun(NOTCH_X + 0.5, PL.x0 - 1.6, 1, true);
    edgeRun(PL.x1 + 1.6, 100.5, 1, true);
    edgeRun(NOTCH_X + 0.5, -50.0, -1, true);
    edgeRun(31.5, 100.5, -1, true);
    /* the bow chamfers carry a rail and stanchions only                    */
    [[101.0, 18.0, 118.0, 12.4], [101.0, -18.0, 118.0, -12.4], [118.0, 12.4, 126.8, 8.7], [118.0, -12.4, 126.8, -8.7]].forEach(function (e) {
      rail(e[0], e[1], e[2], e[3], FD_TOP + 0.9);
    });
    /* the quarter cuts: rails round the platforms below                    */
    for (s = -1; s <= 1; s += 2) {
      var ny = s > 0 ? NOTCH_P : NOTCH_S;
      rail(NOTCH_X - 0.3, s * 17.2, -126.6, s * 17.0, ZQ + 1.0);
      rail(-126.6, s * 17.0, -126.6, s * (ny + 0.3), ZQ + 1.0);
      rail(-127.0, s * (ny - 0.2), -127.0, 0.0, FD_TOP + 0.9);
    }

    /* ----------------------------------------- the well deck and its gate
       The well runs 81.7 m forward from the sill and is 23.8 m across, its
       floor a metre above the waterline and its deckhead 8.6 m over that.
       Seen from inside: floor, walls and deckhead, dark; a few deckhead
       lights; the forward end wall. Only the open gate shows it.          */
    var wx0 = HX0 + 0.05, wf = WELL.x1, hw = WELL.hw, IN = [-90, 0, 5];
    B.R.add(quad(THREE, [wx0, -hw, WELL.z0], [wx0, hw, WELL.z0], [wf, hw, WELL.z0], [wf, -hw, WELL.z0], IN));
    for (s = -1; s <= 1; s += 2)
      B.K.add(quad(THREE, [wx0, s * hw, WELL.z0], [wx0, s * hw, WELL.z1], [wf, s * hw, WELL.z1], [wf, s * hw, WELL.z0], IN));
    B.K.add(quad(THREE, [wx0, -hw, WELL.z1], [wx0, hw, WELL.z1], [wf, hw, WELL.z1], [wf, -hw, WELL.z1], IN));
    B.K.add(quad(THREE, [wf, -hw, WELL.z0], [wf, hw, WELL.z0], [wf, hw, WELL.z1], [wf, -hw, WELL.z1], IN));
    /* the sides of the opening between the transom and the well walls    */
    for (s = -1; s <= 1; s += 2)
      B.K.add(quad(THREE, [HX0 - 0.01, s * WELL.ow, WELL.z0], [HX0 - 0.01, s * WELL.ow, WELL.z1], [wx0, s * hw, WELL.z1], [wx0, s * hw, WELL.z0], IN));
    B.K.add(quad(THREE, [HX0 - 0.01, -WELL.ow, WELL.z1], [HX0 - 0.01, WELL.ow, WELL.z1], [wx0, hw, WELL.z1], [wx0, -hw, WELL.z1], IN));
    for (i = 0; i < 6; i++)
      for (s = -1; s <= 1; s += 2) B.W.add(box(THREE, 1.6, 0.5, 0.12, -118.0 + i * 13.0, s * 4.5, WELL.z1 - 0.08));
    /* the wing walls' catwalks and the sill                                */
    for (s = -1; s <= 1; s += 2) B.M.add(box(THREE, wf - wx0 - 1.0, 0.9, 0.15, (wx0 + wf) * 0.5, s * (hw - 0.45), WELL.z0 + 3.2));
    B.M.add(box(THREE, 0.6, 2 * WELL.ow, 0.3, HX0 + 0.35, 0, WELL.z0 + 0.12));
    /* the frame round the opening, standing proud of the transom           */
    for (s = -1; s <= 1; s += 2) B.S.add(box(THREE, 0.3, 0.8, WELL.z1 - WELL.z0 + 0.8, HX0 + 0.05, s * (WELL.ow + 0.4), (WELL.z0 + WELL.z1) * 0.5 + 0.4));
    B.S.add(box(THREE, 0.3, 2 * WELL.ow + 1.6, 0.8, HX0 + 0.05, 0, WELL.z1 + 0.4));

    /* the gate: its own node. The holder turns half round about Z so that
       the gate's local +X points aft; "wellgate" sits on the hinge at the
       sill, rotation zero closed. rotation.y +1.45 swings the top aft and
       down to 0.12 rad short of flat, onto the water as an LCU ramp.      */
    var gh = new THREE.Group();
    gh.position.set(HX0, 0, WELL.z0);
    gh.rotation.z = PI;
    var wg = new THREE.Group();
    wg.name = "wellgate";
    gh.add(wg);
    var GB = { S: new Batch(), M: new Batch() }, GH = WELL.z1 - WELL.z0 - 0.1, GW = 2 * WELL.ow - 0.2;
    GB.S.add(box(THREE, 0.5, GW, GH, -0.4, 0, GH * 0.5));
    /* outer face: vertical stiffeners, a heavy head and foot, the hinges.
       Everything stays inside x -127.1 closed, the deck's own end.       */
    for (i = 0; i < 12; i++) GB.M.add(box(THREE, 0.22, 0.3, GH - 1.4, -0.04, -11.0 + i * 2.0, GH * 0.5));
    GB.M.add(box(THREE, 0.3, GW, 0.55, -0.02, 0, GH - 0.3));
    GB.M.add(box(THREE, 0.3, GW, 0.5, -0.02, 0, 0.3));
    GB.M.add(box(THREE, 0.24, GW, 0.22, -0.04, 0, GH * 0.5));
    for (i = 0; i < 4; i++) GB.M.add(place(THREE, new THREE.CylinderGeometry(0.28, 0.28, 1.6, 8), -0.15, -9.0 + i * 6.0, 0.05));
    Object.keys(GB).forEach(function (kk) { var mm = GB[kk].mesh(THREE, T[kk]); if (mm) wg.add(mm); });
    root.add(gh);
    root.userData.wellExit = { x: HX0, y: 0, z: WELL.z0 };
    /* the game's well figures: sill at x -126.8, first berth mid-well     */
    root.userData.wellInner = { x: HX0 + 81.7 * 0.5, y: 0, z: WELL.z0 };

    /* the transom above the gate: the stern gallery's windows and the
       platforms' undersides                                                */
    B.G.add(box(THREE, 0.12, 15.0, 1.1, HX0 - 0.07, 0, FD_BOT - 2.6));
    B.K.add(box(THREE, 0.12, 4.0, 2.4, HX0 - 0.07, 6.0, WELL.z1 + 2.6));
    B.K.add(box(THREE, 0.12, 4.0, 2.4, HX0 - 0.07, -6.0, WELL.z1 + 2.6));

    /* ------------------------------------------------- anchors, appendages */
    for (s = -1; s <= 1; s += 2) {
      var ya = lowY(6, 112.0);
      B.K.add(place(THREE, new THREE.CylinderGeometry(0.85, 0.85, 0.3, 10), 112.0, s * (ya + 0.1), 10.0, 0, 0, 0));
      B.M.add(box(THREE, 2.2, 0.5, 2.8, 111.2, s * (ya + 0.2), 8.0, s * 0.3, 0, 0));
    }
    for (s = -1; s <= 1; s += 2)
      B.U.add(box(THREE, 80.0, 0.35, 1.5, -12.0, s * (lerp(lowY(1, -12), lowY(2, -12), 0.55) + 0.45), -6.8, s * 0.75, 0, 0));
    /* twin shafts and five-bladed screws, two rudders                      */
    for (s = -1; s <= 1; s += 2) {
      var sy = s * 8.6, sz = -5.5, sx = -100.0;
      B.M.add(strut(THREE, -72.0, sy, sz - 1.4, sx - 0.8, sy, sz, 0.45, 6));
      B.M.add(strut(THREE, sx + 4.0, s * 6.0, -4.2, sx + 4.0, sy, sz, 0.3, 4));
      B.M.add(place(THREE, new THREE.CylinderGeometry(0.45, 0.75, 1.6, 8).rotateZ(PI / 2), sx - 1.2, sy, sz));
      for (j = 0; j < 5; j++) {
        var bl = new THREE.BoxGeometry(0.3, 1.3, 2.0);
        bl.translate(0, 0, 1.3);
        bl.rotateZ(0.4);
        bl.rotateX(j * 2 * PI / 5);
        bl.translate(sx - 1.2, sy, sz);
        B.M.add(bl);
      }
      B.M.add(box(THREE, 4.2, 0.5, 4.4, -108.0, s * 6.2, -4.4));
    }

    /* ----------------------------------------------------------- sponsons */
    function sponson(pts, ztop, depth, side) {
      pts = ccw(pts);
      B.S.add(plate(THREE, pts, ztop - 0.6, ztop));
      var yin = Math.min.apply(null, pts.map(function (q) { return Math.abs(q[1]); }));
      var knee = pts.map(function (q) { return [q[0], side * lerp(yin, Math.abs(q[1]), 0.2)]; });
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
    var ZS = FD_TOP - 4.3;
    /* Mk 45 under the deck edge at the island's forward corner (starboard
       quarter and overhead views), trained forward                         */
    sponson([[16.5, -16.2], [29.5, -16.2], [29.5, -22.6], [18.5, -22.6], [16.5, -21.0]], ZS, 3.6, -1);
    emit(mk45Parts(THREE), 23.0, -19.9, ZS, 0.08);
    ringRail([[29.3, -22.4], [18.6, -22.4], [16.7, -20.9]], ZS + 1.0);
    /* Mk 45 on the port bow gallery (port-bow view, 1979)                  */
    sponson([[82.0, 16.2], [95.0, 16.2], [93.0, 22.6], [82.0, 22.6]], ZS, 3.6, 1);
    emit(mk45Parts(THREE), 88.0, 19.6, ZS, 0.25);
    /* the quarter platforms: Mk 25 to port, Mk 45 to starboard, trained
       out over the quarters (aerial from astern, 1979)                     */
    for (s = -1; s <= 1; s += 2) {
      var ny2 = s > 0 ? NOTCH_P : NOTCH_S;
      B.S.add(plate(THREE, rect(-127.0, NOTCH_X, s * (ny2 - 0.2), s * 17.4), ZQ - 0.5, ZQ));
    }
    emit(mk25Parts(THREE), -122.6, 13.8, ZQ, PI * 0.72);
    emit(mk45Parts(THREE), -122.2, -13.2, ZQ, -PI * 0.70);

    /* ------------------------------------------------------------ island
       Footprint x -35 .. +16 for the main block, bridge tiers to +22.3,
       14.6 m across from 5.5 m to starboard of the centreline out to the
       extreme beam. Heights above the deck off the 1979 broadside: the
       block's face to 12.4 m, a set-back upper level to the roof at 15.5,
       the stack to 21, the foremast head 37.6, the after mast head 32.    */
    var Z0 = FD_TOP, ZU = Z0 + 12.4, ZR = Z0 + 15.5;
    /* the ledge the island stands on, out over the starboard gallery, and
       the deep knee under it back to the side                              */
    B.S.add(plate(THREE, rect(-48.5, ISL.xb, -17.6, ISL.yo), FD_BOT, FD_TOP));
    B.S.add(frustum(THREE, rect(-48.5, ISL.xb, -16.4, ISL.yo + 0.15), GAL, FD_BOT, 0.92, 1.0));
    var blk = [[ISL.x1, ISL.yi], [ISL.x1, ISL.yo], [ISL.x0 + 1.2, ISL.yo], [ISL.x0, ISL.yo + 1.2],
               [ISL.x0, ISL.yi - 1.0], [ISL.x0 + 1.0, ISL.yi]];
    B.S.add(frustum(THREE, blk, Z0, ZU, 1.0, 0.996));
    /* the upper level, set back on the inboard face, its window band       */
    var up = [[ISL.x1, ISL.yi - 0.8], [ISL.x1, ISL.yo + 0.3], [ISL.x0 + 1.5, ISL.yo + 0.3], [ISL.x0 + 0.3, ISL.yo + 1.4],
              [ISL.x0 + 0.3, ISL.yi - 1.6], [ISL.x0 + 1.1, ISL.yi - 0.8]];
    B.S.add(plate(THREE, scalePts(blk, 1.006), ZU, ZU + 0.3));
    ringRail(scalePts(blk, 1.004), ZU + 1.3);
    B.S.add(frustum(THREE, up, ZU + 0.3, ZR, 1.0, 0.996));
    /* the upper level's faces are plain in the photographs: a seam at its
       foot and a short run of windows at the forward end only             */
    B.K.add(box(THREE, ISL.x1 - ISL.x0 - 2.0, 0.1, 0.16, (ISL.x0 + ISL.x1) * 0.5, ISL.yi - 0.82, ZU + 0.45));
    B.G.add(box(THREE, 7.0, 0.12, 0.8, ISL.x1 - 5.0, ISL.yi - 0.82, ZU + 1.9));
    B.G.add(box(THREE, 7.0, 0.12, 0.8, ISL.x1 - 5.0, ISL.yo + 0.28, ZU + 1.9));
    B.S.add(plate(THREE, scalePts(up, 1.008), ZR, ZR + 0.35));
    ringRail(scalePts(up, 1.0), ZR + 1.35);
    /* doors and the flight-deck control windows along the foot of the
       inboard face, as in the c1981 photograph                             */
    for (i = 0; i < 9; i++) B.K.add(box(THREE, 1.2, 0.12, 2.1, -32.0 + i * 5.6, ISL.yi + 0.05, Z0 + 1.05));
    for (i = 0; i < 6; i++) B.K.add(box(THREE, 1.0, 0.12, 1.0, -30.0 + i * 8.0, ISL.yo - 0.05, Z0 + 6.0));
    /* vertical panel ribs on the big faces                                 */
    for (i = 0; i < 8; i++) {
      B.S.add(box(THREE, 0.3, 0.18, ZU - Z0 - 0.4, -31.0 + i * 6.2, ISL.yi + 0.08, Z0 + (ZU - Z0) * 0.5));
      B.S.add(box(THREE, 0.3, 0.18, ZU - Z0 - 0.4, -31.0 + i * 6.2, ISL.yo - 0.08, Z0 + (ZU - Z0) * 0.5));
    }

    /* the bridge: three stacked tiers across the forward end, each with
       its wrap-round window band and a deck lip, rounded at the inboard
       corner (port-bow and broadside views)                                */
    var tier = [[ISL.xb, -9.2], [ISL.xb - 0.8, -7.4], [ISL.xb - 2.4, -6.2], [ISL.x1 - 0.5, -6.2],
                [ISL.x1 - 0.5, -19.6], [ISL.xb - 1.0, -19.6], [ISL.xb, -18.4]];
    var TZ = [Z0 + 3.7, Z0 + 6.7, Z0 + 9.7, Z0 + 12.7];
    for (i = 0; i < 3; i++) {
      var tp = scalePts(tier, 1.0 - i * 0.012);
      B.S.add(frustum(THREE, tp, TZ[i], TZ[i + 1] - 1.2, 1.0, 1.0));
      B.G.add(frustum(THREE, tp, TZ[i + 1] - 1.2, TZ[i + 1] - 0.25, 0.975, 0.975));
      B.S.add(plate(THREE, scalePts(tp, 1.06), TZ[i + 1] - 0.25, TZ[i + 1]));
      ringRail([[ISL.xb + 0.6, -19.8], [ISL.xb + 0.6, -6.6]], TZ[i + 1] + 1.0);
    }
    /* below the tiers the block runs down to the deck set back under them:
       the tiers overhang it, as the broadside shows                         */
    B.S.add(frustum(THREE, [[ISL.xb - 3.2, -7.0], [ISL.xb - 3.2, -19.2], [ISL.x1 - 0.5, -19.2], [ISL.x1 - 0.5, -7.0]], Z0, TZ[0], 1.0, 1.0));
    for (s = -1; s <= 1; s += 2)
      B.M.add(strut(THREE, ISL.xb - 3.2, s > 0 ? -7.6 : -18.6, TZ[0] - 2.6, ISL.xb - 1.0, s > 0 ? -7.6 : -18.6, TZ[0] - 0.05, 0.12, 4));
    /* the pilot house roof and its rail, level with the roof              */
    B.S.add(frustum(THREE, scalePts(tier, 0.95), TZ[3], ZR, 1.0, 0.98));
    B.G.add(box(THREE, 0.14, 11.0, 1.0, ISL.xb - 0.6, -12.9, TZ[3] + 1.3));
    B.S.add(plate(THREE, scalePts(tier, 0.97), ZR, ZR + 0.35));
    /* the low deckhouse ahead of the bridge, the second Mk 25 on the deck
       ahead of it                                                           */
    var fdh = [[31.5, -8.0], [31.5, -18.8], [ISL.xb, -19.6], [ISL.xb, -7.2]];
    B.S.add(frustum(THREE, fdh, Z0, Z0 + 3.6, 1.0, 0.99));
    B.S.add(plate(THREE, scalePts(fdh, 1.02), Z0 + 3.6, Z0 + 3.85));
    ringRail(scalePts(fdh, 1.0), Z0 + 4.85);
    B.K.add(box(THREE, 0.12, 1.4, 2.1, 31.56, -11.0, Z0 + 1.05));
    B.K.add(box(THREE, 0.12, 1.4, 2.1, 31.56, -15.6, Z0 + 1.05));
    B.S.add(cylZ(THREE, 1.6, 1.8, 1.2, 10, 34.6, -13.4, Z0));
    emit(mk25Parts(THREE), 34.6, -13.4, Z0 + 1.2, 0.0);

    /* the stack: one casing, rounded in plan, capped black                 */
    var stk = [[-15.5, -11.6], [-16.2, -10.6], [-21.8, -10.6], [-22.5, -11.6],
               [-22.5, -16.4], [-21.8, -17.4], [-16.2, -17.4], [-15.5, -16.4]];
    B.S.add(frustum(THREE, stk, ZR, Z0 + 19.2, 1.0, 0.97));
    B.T.add(frustum(THREE, stk, Z0 + 18.4, Z0 + 18.9, 0.982, 0.978));
    B.K.add(frustum(THREE, stk, Z0 + 19.2, Z0 + 21.0, 0.97, 0.95));
    B.K.add(plate(THREE, scalePts(stk, 0.8), Z0 + 21.0, Z0 + 21.15));
    for (s = -1; s <= 1; s += 2) B.M.add(cylZ(THREE, 0.55, 0.55, 1.1, 8, -19.0 + s * 1.8, -14.0, Z0 + 21.0));

    /* lattice mast: four legs, rungs at each level, diagonals on two faces */
    function lattice(mx, my, z0, z1, w0, w1, lev, mat) {
      var k, a, b, Bm = B[mat || "M"];
      for (a = -1; a <= 1; a += 2) for (b = -1; b <= 1; b += 2)
        Bm.add(strut(THREE, mx + a * w0 * 0.5, my + b * w0 * 0.5, z0, mx + a * w1 * 0.5, my + b * w1 * 0.5, z1, 0.14, 4));
      for (k = 0; k <= lev; k++) {
        var f = k / lev, w = lerp(w0, w1, f), zz = lerp(z0, z1, f);
        Bm.add(box(THREE, w, 0.1, 0.1, mx, my - w * 0.5, zz));
        Bm.add(box(THREE, w, 0.1, 0.1, mx, my + w * 0.5, zz));
        Bm.add(box(THREE, 0.1, w, 0.1, mx - w * 0.5, my, zz));
        Bm.add(box(THREE, 0.1, w, 0.1, mx + w * 0.5, my, zz));
        if (k < lev) {
          var fn = (k + 1) / lev, wn = lerp(w0, w1, fn), zn = lerp(z0, z1, fn), sg = k % 2 ? -1 : 1;
          Bm.add(strut(THREE, mx + sg * w * 0.5, my - w * 0.5, zz, mx - sg * wn * 0.5, my - wn * 0.5, zn, 0.05, 3));
          Bm.add(strut(THREE, mx - sg * w * 0.5, my + w * 0.5, zz, mx + sg * wn * 0.5, my + wn * 0.5, zn, 0.05, 3));
          Bm.add(strut(THREE, mx - w * 0.5, my + sg * w * 0.5, zz, mx - wn * 0.5, my - sg * wn * 0.5, zn, 0.05, 3));
        }
      }
    }
    function platform(mx, my, zp, rx, ry) {
      B.S.add(box(THREE, rx * 2, ry * 2, 0.3, mx, my, zp));
      ringRail([[mx - rx, my - ry], [mx + rx, my - ry], [mx + rx, my + ry], [mx - rx, my + ry]], zp + 1.0);
    }

    /* Both masts are painted black above the roof in every 1979 photograph.
       foremast over the bridge: a lattice tower off the roof to the radar
       platform at 19 m, the SPS-52 planar array on its pedestal abaft the
       mast, a surface-search antenna on the forward bracket, then a black
       lattice topmast with its yards and the radome on its forward side.  */
    var FX = 8.5, FY = -13.0, ZP1 = Z0 + 19.0;
    lattice(FX, FY, ZR + 0.3, ZP1, 4.6, 3.6, 3, "K");
    B.K.add(box(THREE, 3.2, 3.2, ZP1 - ZR - 0.3, FX, FY, (ZR + ZP1) * 0.5 + 0.15));
    B.K.add(box(THREE, 4.4, 3.6, 2.6, FX - 1.2, FY, ZP1 - 1.45));
    platform(FX - 0.8, FY, ZP1, 4.6, 3.0);
    /* SPS-52: a flat array about 5 x 4.3 m, leaning back, on its pedestal */
    B.R.add(cylZ(THREE, 0.7, 0.9, 1.4, 8, FX - 3.4, FY, ZP1 + 0.15));
    var arr = box(THREE, 0.5, 5.2, 4.3, 0, 0, 0);
    arr.rotateY(-0.32); arr.translate(FX - 3.4, FY, ZP1 + 3.8);
    B.K.add(arr);
    B.M.add(strut(THREE, FX - 3.4, FY, ZP1 + 1.5, FX - 2.6, FY, ZP1 + 3.0, 0.2, 5));
    /* forward bracket with the small surface-search antenna               */
    B.M.add(strut(THREE, FX + 1.5, FY, ZP1 - 1.8, FX + 5.4, FY, ZP1 + 3.6, 0.13, 4));
    B.S.add(box(THREE, 2.2, 2.2, 0.25, FX + 5.4, FY, ZP1 + 3.6));
    B.R.add(box(THREE, 0.5, 3.4, 0.8, FX + 5.4, FY, ZP1 + 4.6));
    /* topmast: black, as the 1979 photographs show the mast heads         */
    lattice(FX, FY, ZP1 + 0.15, Z0 + 31.5, 2.6, 1.3, 5, "K");
    B.K.add(strut(THREE, FX, FY, Z0 + 31.5, FX, FY, Z0 + 37.6, 0.22, 5, 0.1));
    B.K.add(box(THREE, 0.3, 8.0, 0.3, FX, FY, Z0 + 31.7));
    B.K.add(box(THREE, 0.25, 5.0, 0.25, FX, FY, Z0 + 34.2));
    for (s = -1; s <= 1; s += 2) B.M.add(strut(THREE, FX, FY + s * 3.6, Z0 + 31.7, FX, FY + s * 3.6, Z0 + 30.2, 0.04, 3));
    platform(FX + 1.6, FY, Z0 + 26.0, 1.4, 1.6);
    /* the long platform the broadside shows under the yard, fore and aft  */
    B.K.add(box(THREE, 6.4, 2.0, 0.3, FX - 0.6, FY, Z0 + 29.9));
    ringRail(rect(FX - 3.7, FX + 2.5, FY - 0.95, FY + 0.95), Z0 + 30.9);
    B.K.add(box(THREE, 1.4, 1.2, 1.2, FX - 3.2, FY, Z0 + 30.65));
    B.W.add(sphere(THREE, 1.35, 10, 7, FX + 2.6, FY, Z0 + 28.2));
    B.W.add(sphere(THREE, 0.45, 8, 5, FX, FY - 3.9, Z0 + 32.3));
    B.W.add(cylZ(THREE, 0.45, 0.45, 0.9, 8, FX, FY, Z0 + 37.6));
    /* the flag hoist from the yard to the bridge roof                       */
    B.M.add(strut(THREE, FX, FY + 3.8, Z0 + 31.6, ISL.xb - 1.5, -7.2, ZR + 0.4, 0.03, 3));
    B.M.add(strut(THREE, FX, FY - 3.8, Z0 + 31.6, ISL.xb - 1.5, -18.6, ZR + 0.4, 0.03, 3));

    /* after mast at the island's after end: a deckhouse on the roof, the
       lattice mast, a platform at 23.4 m with its bracket carrying the box
       antenna aft, and the SPS-40's long reflector at the head            */
    var AX = -29.1, AY = -13.0, ZA1 = Z0 + 23.4;
    B.S.add(frustum(THREE, rect(-33.4, -25.0, -9.2, -17.2), ZR, Z0 + 18.0, 1.0, 0.98));
    B.S.add(plate(THREE, rect(-33.6, -24.8, -9.0, -17.4), Z0 + 18.0, Z0 + 18.3));
    lattice(AX, AY, Z0 + 18.3, ZA1, 3.4, 2.4, 3, "K");
    platform(AX - 1.8, AY, ZA1, 4.4, 2.2);
    lattice(AX, AY, ZA1 + 0.15, Z0 + 29.6, 2.0, 1.1, 3, "K");
    B.K.add(strut(THREE, AX, AY, Z0 + 29.6, AX, AY, Z0 + 32.4, 0.18, 5, 0.1));
    /* SPS-40: a long, shallow reflector and its feed on the masthead       */
    B.R.add(cylZ(THREE, 0.45, 0.55, 0.8, 8, AX, AY, Z0 + 29.6));
    /* the reflector is a shallow trough 7 m wide and under 2 m deep, both
       photographs showing it as a long bar along the ship: built from both
       sides of one arc so it reads from either side                       */
    [0, PI].forEach(function (rz) {
      var sps = new THREE.CylinderGeometry(7.5, 7.5, 1.8, 10, 1, true, -0.48, 0.96);
      sps.rotateX(PI / 2);
      sps.rotateZ(rz);
      sps.translate(AX, AY + (rz ? -6.9 : 6.9), Z0 + 31.2);
      B.R.add(sps);
    });
    B.M.add(strut(THREE, AX, AY + 0.6, Z0 + 31.2, AX, AY - 1.4, Z0 + 31.2, 0.08, 4));
    B.M.add(box(THREE, 7.0, 0.25, 0.25, AX, AY + 0.55, Z0 + 30.35));
    /* the box antenna on the after bracket (identity not confirmed)       */
    B.M.add(strut(THREE, AX - 1.4, AY, ZA1 - 1.4, AX - 6.2, AY, ZA1 + 1.6, 0.13, 4));
    B.S.add(box(THREE, 2.6, 2.6, 0.25, AX - 6.4, AY, ZA1 + 1.5));
    B.K.add(box(THREE, 3.2, 3.4, 2.8, AX - 6.4, AY, ZA1 + 3.1));
    B.K.add(box(THREE, 0.3, 7.0, 0.3, AX, AY, Z0 + 27.6));
    /* TACAN pot and whips                                                   */
    B.W.add(cylZ(THREE, 0.55, 0.55, 1.0, 8, AX + 1.0, AY, Z0 + 28.0));
    for (i = 0; i < 4; i++)
      B.M.add(strut(THREE, -10.0 + i * 6.0, -7.2, ZR + 0.35, -10.0 + i * 6.0, -6.8, ZR + 5.5, 0.06, 4, 0.03));

    /* the radome on the island's after end, standing on its own platform  */
    /* set into the block's after inboard corner, as the broadside shows it */
    B.S.add(box(THREE, 4.0, 6.0, 0.4, ISL.x0 - 1.4, -9.4, Z0 + 5.8));
    B.S.add(cylZ(THREE, 2.6, 2.6, 5.8, 14, ISL.x0 - 1.2, -9.4, Z0 + 6.0));
    B.W.add(sphere(THREE, 2.6, 14, 6, ISL.x0 - 1.2, -9.4, Z0 + 11.8, 1, 1, 1, true));
    B.M.add(strut(THREE, ISL.x0 - 2.6, -11.6, Z0 + 5.6, ISL.x0 - 2.6, -11.6, Z0 + 0.0, 0.15, 4));
    /* the SATCOM-size dome and the vent trunks on the roof                 */
    B.W.add(sphere(THREE, 1.0, 10, 6, -3.0, -17.6, ZR + 1.25));
    B.S.add(cylZ(THREE, 0.6, 0.7, 0.9, 8, -3.0, -17.6, ZR + 0.35));
    B.S.add(box(THREE, 6.0, 2.4, 1.6, -8.0, -10.0, ZR + 1.15));
    B.S.add(box(THREE, 4.0, 2.4, 1.4, -2.0, -10.4, ZR + 1.05));
    B.S.add(box(THREE, 3.0, 2.0, 1.2, -11.5, -18.4, ZR + 0.95));
    B.S.add(box(THREE, 2.4, 3.2, 1.0, -26.5, -19.0, ZR + 0.85));
    /* searchlight platforms on the pilot-house roof, either side           */
    for (s = -1; s <= 1; s += 2) {
      var sly = s > 0 ? -7.6 : -18.4;
      B.S.add(cylZ(THREE, 0.9, 0.9, 0.25, 8, ISL.xb - 2.2, sly, ZR + 0.35));
      B.M.add(cylZ(THREE, 0.35, 0.4, 0.8, 8, ISL.xb - 2.2, sly, ZR + 0.6));
      B.K.add(place(THREE, new THREE.CylinderGeometry(0.4, 0.4, 0.6, 8).rotateZ(-PI / 2), ISL.xb - 1.9, sly, ZR + 1.6));
    }
    /* signal yard and the halyard lines down to the bridge roof           */
    B.M.add(box(THREE, 0.15, 6.0, 0.15, ISL.x1 - 1.0, -12.9, ZR + 4.2));
    B.M.add(strut(THREE, ISL.x1 - 1.0, -12.9, ZR + 0.35, ISL.x1 - 1.0, -12.9, ZR + 4.4, 0.1, 4));

    /* the boat deck abaft the island: a lower block, two boats in their
       cradles on its roof, and the crane at its after end, boom raised and
       leaning aft as in the 1979 broadside                                  */
    var ZB = Z0 + 5.0;
    B.S.add(frustum(THREE, [[ISL.x0, -11.5], [ISL.x0, ISL.yo], [-48.5, ISL.yo], [-48.5, -12.5]], Z0, ZB, 1.0, 1.0));
    B.S.add(plate(THREE, rect(-48.8, ISL.x0, -11.2, ISL.yo - 0.2), ZB, ZB + 0.3));
    ringRail(rect(-48.6, ISL.x0, -11.4, ISL.yo - 0.1), ZB + 1.3);
    B.K.add(box(THREE, 0.12, 2.0, 2.1, -48.56, -15.0, Z0 + 1.05));
    emit(boatParts(THREE, M, 11.0), -41.0, -14.2, ZB + 0.3, 0);
    emit(boatParts(THREE, M, 12.0), -41.5, -18.0, ZB + 0.3, 0);
    var CX = -46.6, CY = -16.0;
    B.S.add(cylZ(THREE, 1.0, 1.2, 1.6, 10, CX, CY, ZB + 0.3));
    B.S.add(box(THREE, 2.6, 2.0, 1.8, CX, CY, ZB + 2.8));
    for (s = -1; s <= 1; s += 2)
      B.M.add(strut(THREE, CX - 0.6, CY + s * 0.55, ZB + 2.6, CX - 6.4, CY + s * 0.2, Z0 + 20.0, 0.16, 4, 0.1));
    for (i = 0; i < 5; i++)
      B.M.add(strut(THREE, lerp(CX - 0.6, CX - 6.4, i / 5), CY - 0.5, lerp(ZB + 2.6, Z0 + 20.0, i / 5),
                    lerp(CX - 0.6, CX - 6.4, (i + 1) / 5), CY + 0.5, lerp(ZB + 2.6, Z0 + 20.0, (i + 1) / 5), 0.05, 3));
    B.M.add(strut(THREE, CX - 6.4, CY, Z0 + 20.0, CX - 6.4, CY, ZB + 4.0, 0.04, 3));
    B.M.add(strut(THREE, CX + 0.6, CY, ZB + 3.6, CX - 6.4, CY, Z0 + 20.0, 0.04, 3));

    /* whip aerials along the starboard deck edge forward of the island    */
    for (i = 0; i < 4; i++)
      B.M.add(strut(THREE, 42.0 + i * 15.0, -19.6, FD_TOP - 1.3, 42.0 + i * 15.0, -20.4, FD_TOP + 8.5, 0.07, 4, 0.035));
    for (i = 0; i < 2; i++)
      B.M.add(strut(THREE, -100.0 + i * 25.0, 19.6, FD_TOP - 1.3, -100.0 + i * 25.0, 20.4, FD_TOP + 7.0, 0.07, 4, 0.035));

    /* ---------------------------------------------------------- team strips
       Two small strips across the deck, at the bow and over the stern, and
       a band round the stack under its black cap: exactly C.team            */
    B.T.add(box(THREE, 2.0, 12.0, 0.1, 123.6, 0.0, FD_TOP + 0.05));
    B.T.add(box(THREE, 2.0, 12.0, 0.1, -125.2, 1.0, FD_TOP + 0.05));

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
