/* ============================================================================
   pla_lhd_type075.js -- HERO model: the PLAN Type 075 landing helicopter dock
   (Hainan, commissioned April 2021). Registered as lhd_c.

   Measured off these references (Wikimedia Commons unless said), named so
   the next person can check them:
     - "Type 075 LHD-33 Anhui.png": straight down at sea, bow to the right,
       the island on the bottom (starboard) edge. 670 px from the stern
       corners to the bow, read as the 232 m the game row gives her (0.346
       m/px); the same scale gives 107 px = 37 m across, the deck and its
       folded edge rails, against 36 m published. Deck outline and its two
       stern notches, the seven spots and their lines, the dashed line down
       the deck, the stern lift, the forward lift and the weapons lift, the
       island strip, and every sponson round the edge come from this one.
     - "PLANS Anhui (LHD-33) 20250516.jpg": a distant, nearly square
       starboard broadside at sea (2.21 px/m). Freeboard, the stem rake,
       and every height on the island: the base deckhouse, the two towers,
       the bridge, the mast, yard, radar and pole.
     - "2024-11 Hainan A / C1" (the files titled in Chinese) and "PLANS
       Hainan (LHD-31) starboard bow view.jpg" and "... bow view with
       abandoned jetty.jpg": the island close up from starboard - the
       glazed middle block with its black top, the bridge with its slanted
       glazing, the HHQ-10 on the island's forward end, the deck-edge crane
       and the life-raft racks under it, the side door, the gangway port,
       the louvres, the deep fascia at the bow and the flare under it.
     - "PLANS Hainan (LHD-31) starboard aft view.jpg": the transom - the
       20 m ribbed stern gate with a dark slot over it, the open recess
       under the flight deck, the two stern-corner platforms (an HHQ-10 to
       PORT, an H/PJ-14 to STARBOARD), the black exhaust face high on the
       after side of the forward tower, the satcom balcony and the decoy
       launcher on the starboard quarter.
     - en.wikipedia "Type 075 landing helicopter dock": deck 226 x 36 m,
       seven spots (six to port, one aft of the island), the forward lift
       and the larger stern lift, two weapons lifts forward (only one shows
       on the overhead and only it is drawn), the 20 m well gate and an
       80-90 m well, an opening each side to the vehicle deck, two HHQ-10
       and two 11-barrel H/PJ-14.

   What has to read at a glance (and where each comes from):
     1. A full-length FLUSH flight deck, squared at both ends, 232 x 36 m,
        no ski-jump and no angled deck (overhead).
     2. SIX spots down the PORT side and the seventh aft of the island, each
        a white circle with its lineup line, fan lines and transverse bar,
        numbered 1 to 6 from the bow (overhead).
     3. A long island of TWO TOWERS on the starboard edge, x -37 .. +33:
        a low after tower with its own small mast, a glazed middle block
        with a black top between them, and a tall tapering forward tower
        that runs straight up into the mast (overhead, Anhui broadside).
     4. The forward tower's after face BLACK from the middle block's roof
        to the yard, where the uptakes come out (starboard aft view).
     5. The mast head: one long yard and the big planar H/LJQ-382 array on
        top, a pole beside it, platforms on the mast flanks (bow views).
     6. A bridge that juts forward of the forward tower with slanted
        glazing and wings both sides (bow views).
     7. HHQ-10 box launcher on the island's forward end; a deck-edge crane
        forward of it on an A-frame rest, life rafts under it (C1, bow).
     8. The bow: the deck runs out square over a deep fascia, and under it
        the hull flares hard in to a raked stem (broadsides, bow view).
     9. The stern: a flat transom nearly the full width to the waterline,
        the 20 m ribbed well gate on the centreline with the dark slot
        over it, the recess under the deck, the stern lift at the very
        edge of the deck above it (starboard aft view, overhead).
    10. The stern corners: notched out of the deck, with a HHQ-10 platform
        to port and an H/PJ-14 platform to starboard (aft view, overhead).
    11. Vertical, slab-sided topsides with rows of small windows, the side
        door to the vehicle deck, sponsons and balconies (broadsides).

   Not confirmed, and drawn only as said:
     - The draught. Nothing shows it; at 7.2 m the lofted hull displaces
       40,650 t (sectional volume, 1.025 t/m3), against the published
       35,000-40,000 t and "more than 40,000 t" at full load.
     - The forward H/PJ-14: the stern photo fixes the after pair (HHQ-10
       port, H/PJ-14 starboard) and three photos the HHQ-10 on the island,
       so the second H/PJ-14 must be the remaining mount forward to port.
       It is put on the port sponson at x 48-55, whose square mount on the
       overhead reads as a gun house; no photo of the port side was found.
     - The two boats: elongated boat-shaped objects on the port sponsons
       at x -73 .. -61 and 75 .. 88 on the overhead, at 3 px a metre.
     - The port side door is the published "opening on each side", placed
       opposite the starboard one. The port anchor and the port windows
       are the starboard ones mirrored. The screws and rudders are a
       generic twin-shaft fit; nothing under water was seen.
     - No fixed radar faces are drawn on the towers: none shows in any of
       the photographs.

   The well gate OPENS. It is its own Object3D, "wellgate", origin on the
   hinge at the gate's bottom outer edge, rotation zero when shut; turning
   its rotation.y to +1.45 lowers it aft to nearly flat (it hangs in a fixed
   mount turned PI about X, so +Y swings it out). Behind it the well is a
   real cavity, 20 m wide, 9.7 m high and 85 m long, floor 0.2 m above the
   waterline. root.userData.wellExit is the sill, wellInner a berth deep in
   the well.

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0. Nothing
   sticks out past either end of the deck and the stern platforms: render3d
   scales the ship by her X extent, 232 m. No hull number, name or ensign.
   Every static part is merged into one mesh per material. The team colour
   is exactly C.team: a band round the mast head, a flash on the bow and
   one on the after tower roof.

   ASCII only -- a stray byte in a hex literal has broken this project.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroType075LHD = (function () {
  "use strict";

  var PI = Math.PI;

  /* ---------------------------------------------------- principal dimensions */
  var LOA    = 232.0;
  var FD_TOP = 19.6;               /* deck above the waterline (Anhui broadside) */
  var FD_BOT = 15.2;               /* bottom of the deck slab and its fascia     */
  var KEEL   = -7.2;               /* draught, from the displacement             */
  var HX0 = -112.9, HX1 = 113.1;   /* hull loft: transom, stem head               */
  var XB = 116.0, XS = -116.0;     /* deck front; after face of the stern decks   */
  var DHW = 18.0;                  /* deck half-width                             */
  var ZP = 17.1;                   /* stern corner platforms                      */
  /* the well: floor, deckhead, half-width and forward end                     */
  var WZ0 = 0.2, WZ1 = 9.9, WHW = 10.0, WX1 = -28.0, GATE_H = 7.8;

  /* deck outline, counter-clockwise from above: the bow square with small
     chamfers, the two stern notches where the weapon platforms sit lower */
  var DECK = [
    [XB, -16.8], [XB, 16.8], [XB - 1.2, DHW],
    [-107.6, DHW], [-107.6, 15.1], [HX0, 15.1],
    [HX0, -7.4], [-109.4, -7.4], [-109.4, -DHW],
    [XB - 1.2, -DHW]
  ];
  /* the six spots to port, bow first, and the seventh aft of the island    */
  var SPOTS = [[96.7, 9.9], [59.5, 9.9], [23.1, 9.9], [-13.3, 9.9], [-50.5, 10.0], [-88.1, 10.2]];
  var SPOT7 = [-74.7, -10.4];
  var LIFT_A = { x0: -112.9, x1: -97.3, y0: -7.5, y1: 7.8 };
  var LIFT_F = { x0: 29.6, x1: 49.5, y0: -9.35, y1: -1.7 };
  var LIFT_W = { x0: 69.4, x1: 75.0, y0: -5.2, y1: 2.2 };
  var DASH_Y = -5.2;

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

  /* one batch per material, out as one mesh                              */
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
  function ccwSign(pts) {
    var a = 0, i, n = pts.length;
    for (i = 0; i < n; i++) { var p = pts[i], q = pts[(i + 1) % n]; a += p[0] * q[1] - q[0] * p[1]; }
    return a;
  }
  function rect(x0, x1, y0, y1) { return [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]; }
  function scalePts(pts, s) {
    var cx = 0, cy = 0, i, n = pts.length, out = [];
    for (i = 0; i < n; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    cx /= n; cy /= n;
    for (i = 0; i < n; i++) out.push([cx + (pts[i][0] - cx) * s, cy + (pts[i][1] - cy) * s]);
    return out;
  }

  /* A closed block between two plan outlines of the same vertex count:
     `bot` at zb, `top` at zt. Every tower on this island tapers, and the
     forward one leans aft as it rises, so the two outlines are given
     separately rather than one scaled about its centre. UVs in metres/16
     so the plate texture tiles at a constant size.                       */
  function prism2(THREE, bot, top, zb, zt) {
    if (ccwSign(bot) < 0) { bot = bot.slice().reverse(); top = top.slice().reverse(); }
    var n = bot.length, i, pos = [], uv = [], per = 0, K = 1 / 16;
    function tri(a, b, c, ua, ub, uc) {
      pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
      uv.push(ua[0], ua[1], ub[0], ub[1], uc[0], uc[1]);
    }
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n;
      var b0 = [bot[i][0], bot[i][1], zb], b1 = [bot[j][0], bot[j][1], zb];
      var t0 = [top[i][0], top[i][1], zt], t1 = [top[j][0], top[j][1], zt];
      var L = Math.sqrt((bot[j][0] - bot[i][0]) * (bot[j][0] - bot[i][0]) + (bot[j][1] - bot[i][1]) * (bot[j][1] - bot[i][1]));
      var u0 = per * K, u1 = (per + L) * K; per += L;
      tri(b0, b1, t1, [u0, zb * K], [u1, zb * K], [u1, zt * K]);
      tri(b0, t1, t0, [u0, zb * K], [u1, zt * K], [u0, zt * K]);
    }
    for (i = 1; i < n - 1; i++) {
      tri([top[0][0], top[0][1], zt], [top[i][0], top[i][1], zt], [top[i + 1][0], top[i + 1][1], zt],
          [top[0][0] * K, top[0][1] * K], [top[i][0] * K, top[i][1] * K], [top[i + 1][0] * K, top[i + 1][1] * K]);
      tri([bot[0][0], bot[0][1], zb], [bot[i + 1][0], bot[i + 1][1], zb], [bot[i][0], bot[i][1], zb],
          [bot[0][0] * K, bot[0][1] * K], [bot[i + 1][0] * K, bot[i + 1][1] * K], [bot[i][0] * K, bot[i][1] * K]);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    return g;
  }
  function frustum(THREE, pts, zb, zt, sb, st) { return prism2(THREE, scalePts(pts, sb), scalePts(pts, st), zb, zt); }
  function plate(THREE, pts, z0, z1) { return prism2(THREE, pts, pts, z0, z1); }

  /* A patch laid on one face of a prism2 block, `off` metres proud of it:
     windows, the black uptake face, doors. Edge e runs from vertex e to
     e+1 of the (counter-clockwise) outlines; f0..f1 along it, za..zc up.  */
  function facePatch(THREE, bot, top, zb, zt, e, f0, f1, za, zc, off) {
    if (ccwSign(bot) < 0) { bot = bot.slice().reverse(); top = top.slice().reverse(); e = bot.length - 2 - e; if (e < 0) e += bot.length; }
    var n = bot.length, e1 = (e + 1) % n;
    function P(f, z) {
      var t = (z - zb) / (zt - zb);
      var bx = lerp(bot[e][0], bot[e1][0], f), by = lerp(bot[e][1], bot[e1][1], f);
      var tx = lerp(top[e][0], top[e1][0], f), ty = lerp(top[e][1], top[e1][1], f);
      return [lerp(bx, tx, t), lerp(by, ty, t), z];
    }
    var a = P(f0, za), b = P(f1, za), c = P(f1, zc), d = P(f0, zc);
    /* outward normal: along x up                                          */
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    nx = nx / l * off; ny = ny / l * off; nz = nz / l * off;
    var pos = [];
    [a, b, c, a, c, d].forEach(function (q) { pos.push(q[0] + nx, q[1] + ny, q[2] + nz); });
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute([0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1], 2));
    g.computeVertexNormals();
    return g;
  }
  /* a one-sided quad from four corners, wound as given                   */
  function quad(THREE, a, b, c, d, uvs) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(
      [a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2], a[0], a[1], a[2], c[0], c[1], c[2], d[0], d[1], d[2]], 3));
    var u = uvs || [[0, 0], [1, 0], [1, 1], [0, 1]];
    g.setAttribute("uv", new THREE.Float32BufferAttribute(
      [u[0][0], u[0][1], u[1][0], u[1][1], u[2][0], u[2][1], u[0][0], u[0][1], u[2][0], u[2][1], u[3][0], u[3][1]], 2));
    g.computeVertexNormals();
    return g;
  }

  /* ============================================================= textures
     Paint as the photographs show a 2020s PLAN ship: LIGHT blue-grey,
     near-white in sun. Sampled off sunlit flat plating (the middle half
     of each patch by brightness): the C1 close-up's hull side reads
     (135,135,140) and its island (147,153,160), the bow view's forward
     tower (150,162,169), the stern photograph's transom (130,145,140).
     Hull and superstructure take those (the hull a step lighter, so that
     its strakes and window rows average back to the sampled plate);
     the boot topping is the dark
     blue-grey band at the bow waterline (c.jpg, (55,69,77)); the deck
     stays dark non-skid; the bottom is never seen and keeps red.
     Hull and superstructure are then taken down to 0.9 of the sampled
     level: this renderer's ACES pass lifts mid greys (pla_e00_destroyer.js
     measured 1.8x), and at full level the ship sat well above the US
     flat-tops' 0x737a81 and risked rendering pure white. It stays the
     lighter of the two, as the photographs show.                        */
  var PAINT = { hull: 0x7f8389, sup: 0x81888e, deck: 0x41474d, boot: 0x2b343a, foul: 0x4a2622 };

  /* hull window groups off the broadsides: [x0, x1, z, count]            */
  var WIN = [
    [-110.4, -101.6, 8.1, 5], [-96, -92.5, 11.6, 2], [-86, -82.5, 8.0, 2],
    [-64.5, -57.0, 16.6, 4], [-52.6, -39.0, 8.1, 6], [-45, -41.6, 12.0, 2],
    [-29.0, -23.6, 12.0, 3], [-20.0, -15.5, 12.0, 2], [-6.0, -1.0, 11.6, 3],
    [6.3, 10.9, 15.0, 2], [14.5, 18.5, 11.6, 2], [26.0, 32.9, 15.0, 3],
    [41.2, 48.8, 11.1, 4], [46.0, 48.0, 15.0, 1], [62.0, 66.0, 11.6, 2],
    [80.0, 82.0, 13.0, 1], [88.0, 90.0, 13.4, 1]
  ];

  /* Two canvases split at the waterline, as the Ford does it: topsides
     with the boot topping's upper half, and the bottom. Row 0 is the top
     edge, so v runs straight from z and the boot topping sits on the
     waterline at every station.                                          */
  function hullTex(THREE, zTop, zBot, H, seed) {
    var W = 2048, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(seed), i, k;
    var PXZ = H / (zTop - zBot), PXX = W / (HX1 - HX0);
    function Y(z) { return (zTop - z) * PXZ; }
    function X(x) { return (x - HX0) * PXX; }
    g.fillStyle = hx(PAINT.foul); g.fillRect(0, 0, W, H);
    g.fillStyle = hx(PAINT.hull); g.fillRect(0, 0, W, Y(1.0));
    g.fillStyle = hx(PAINT.boot); g.fillRect(0, Y(1.0), W, Y(-0.7) - Y(1.0));
    /* plate patchwork above, a few tones                                  */
    for (i = 0; i < 320; i++) {
      g.globalAlpha = 0.03 + R() * 0.045;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * Y(1.2), 30 + R() * 200, 10 + R() * 34);
    }
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.05 + R() * 0.07;
      g.fillStyle = R() < 0.5 ? "#6a3a32" : "#2c1714";
      g.fillRect(R() * W, Y(-0.8) + R() * (H - Y(-0.8)), 40 + R() * 200, 8 + R() * 30);
    }
    g.globalAlpha = 1;
    /* strakes every 2.4 m and staggered butts                             */
    for (i = -3; i < 7; i++) {
      var zs = 1.0 + i * 2.4, y0 = Y(zs);
      g.fillStyle = "rgba(0,0,0,0.24)"; g.fillRect(0, y0 - 1, W, 2);
      g.fillStyle = "rgba(255,255,255,0.06)"; g.fillRect(0, y0 - 3, W, 2);
      for (k = ((i + 10) % 2) * 22; k < W; k += 44) {
        g.fillStyle = "rgba(0,0,0,0.16)"; g.fillRect(k, Y(zs + 2.4), 1.6, y0 - Y(zs + 2.4));
      }
    }
    /* the windows: dark panes in a pale frame, rows off the broadsides    */
    WIN.forEach(function (w) {
      var n = w[3], step = n > 1 ? (w[1] - w[0] - 1.1) / (n - 1) : 0;
      for (var q = 0; q < n; q++) {
        var x = X(w[0] + q * step), y = Y(w[2] + 0.55);
        g.fillStyle = "rgba(225,230,232,0.25)"; g.fillRect(x - 1.5, y - 1.5, 1.1 * PXX + 3, 1.1 * PXZ + 3);
        g.fillStyle = "#14191e"; g.fillRect(x, y, 1.1 * PXX, 1.1 * PXZ);
        g.fillStyle = "rgba(120,140,160,0.35)"; g.fillRect(x + 1, y + 1, 1.1 * PXX * 0.4, 1.1 * PXZ * 0.35);
      }
    });
    /* the cable run in black down the side forward of the side door, an L
       as the C1 photograph shows it                                       */
    g.fillStyle = "#16191c";
    g.fillRect(X(36.2), Y(13.6), 2.2, Y(8.8) - Y(13.6));
    g.fillRect(X(31.0), Y(8.8) - 1, X(36.2) - X(31.0) + 2, 2.2);
    /* freeing ports and scuppers weep a little: a new ship                */
    for (i = 0; i < 46; i++) {
      var rx = R() * W, ry = Y(5 + R() * 9), len = (2 + R() * 5) * PXZ;
      var gr = g.createLinearGradient(0, ry, 0, ry + len);
      gr.addColorStop(0, "rgba(88,60,42,0.26)"); gr.addColorStop(1, "rgba(88,60,42,0)");
      g.fillStyle = gr; g.fillRect(rx, ry, 1.4 + R() * 2, len);
    }
    /* draught marks fore and aft                                          */
    g.fillStyle = "rgba(232,236,238,0.9)";
    [100.0, -108.0].forEach(function (mx) {
      for (var q = 0; q < 6; q++) g.fillRect(X(mx), Y(-5 + q * 1.0) - 1, 5, 2);
    });
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }

  function supTex(THREE) {
    var W = 1024, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(7503), i;
    g.fillStyle = hx(PAINT.sup); g.fillRect(0, 0, W, H);
    for (i = 0; i < 140; i++) {
      g.globalAlpha = 0.03 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 30 + R() * 140, 10 + R() * 40);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.4;
    for (i = 1; i < 16; i++) {
      g.beginPath(); g.moveTo(i * W / 16, 0); g.lineTo(i * W / 16, H); g.stroke();
      g.beginPath(); g.moveTo(0, i * H / 16); g.lineTo(W, i * H / 16); g.stroke();
    }
    /* watertight doors, vents and the odd small window                     */
    for (i = 0; i < 16; i++) {
      var dx = R() * (W - 40), dy = R() * (H - 60);
      g.strokeStyle = "rgba(0,0,0,0.40)"; g.lineWidth = 2;
      g.strokeRect(dx, dy, 15 + R() * 6, 30 + R() * 8);
    }
    g.fillStyle = "rgba(18,22,26,0.5)";
    for (i = 0; i < 14; i++) g.fillRect(R() * W, R() * H, 10 + R() * 8, 7 + R() * 4);
    for (i = 0; i < 40; i++) {
      var x = R() * W, y = R() * H * 0.8, len = 8 + R() * 30;
      var gr = g.createLinearGradient(0, y, 0, y + len);
      gr.addColorStop(0, "rgba(60,64,68,0.26)"); gr.addColorStop(1, "rgba(60,64,68,0)");
      g.fillStyle = gr; g.fillRect(x, y, 1.4 + R() * 2.2, len);
    }
    return finish(THREE, cv);
  }

  /* --------------------------------------------------------- flight deck
     One plan-view painting of the deck, sampled through the slab's shape
     UVs (metres) by repeat and offset, so every line sits where the
     overhead puts it.                                                     */
  var DX0 = -118, DX1 = 118, DY0 = -20, DY1 = 20;
  function deckTex(THREE) {
    var W = 2048, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(33075), i, p, q;
    var SX = W / (DX1 - DX0), SY = H / (DY1 - DY0);
    function cx(x) { return (x - DX0) * SX; }
    function cy(y) { return H - (y - DY0) * SY; }
    var WHITE = "#e4e8ea", YEL = "#d8b030";
    function mline(a, b, wm, col, dash) {
      g.save();
      g.strokeStyle = col; g.lineWidth = Math.max(1.0, wm * SY);
      if (dash) g.setLineDash([dash[0] * SX, dash[1] * SX]);
      g.beginPath(); g.moveTo(cx(a[0]), cy(a[1])); g.lineTo(cx(b[0]), cy(b[1])); g.stroke();
      g.restore();
    }
    function circ(x, y, r, wm, col) {
      g.save(); g.strokeStyle = col; g.lineWidth = Math.max(1.0, wm * SY);
      g.beginPath(); g.ellipse(cx(x), cy(y), r * SX, r * SY, 0, 0, PI * 2); g.stroke(); g.restore();
    }
    function hazard(L, wm, dashed) {
      /* a yellow border, black between its dashes                          */
      var pts = [[L.x0, L.y0], [L.x1, L.y0], [L.x1, L.y1], [L.x0, L.y1], [L.x0, L.y0]];
      for (var k = 0; k < 4; k++) {
        mline(pts[k], pts[k + 1], wm, "#16181a");
        mline(pts[k], pts[k + 1], wm, YEL, dashed ? [0.8, 0.8] : [1.2, 1.2]);
      }
    }
    /* --- non-skid in plates of slightly different tone, as the overhead  */
    g.fillStyle = hx(PAINT.deck); g.fillRect(0, 0, W, H);
    for (p = DX0; p < DX1; p += 6 + R() * 6) {
      for (q = DY0; q < DY1; q += 4 + R() * 4) {
        g.globalAlpha = 0.04 + R() * 0.07;
        g.fillStyle = R() < 0.55 ? "#9aa1a6" : "#202428";
        g.fillRect(cx(p), cy(q + 4), (5 + R() * 6) * SX, (3 + R() * 4) * SY);
      }
    }
    g.globalAlpha = 0.18; g.fillStyle = "#121518";
    for (i = 0; i < 4200; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    g.fillStyle = "rgba(10,12,14,0.26)";
    for (p = DX0 + 1.5; p < DX1; p += 3.0)
      for (q = DY0 + 1.5; q < DY1; q += 3.0) g.fillRect(cx(p) - 1, cy(q) - 1, 2, 2);
    /* rotor wash and tyre scuffing round the spots                         */
    SPOTS.concat([SPOT7]).forEach(function (s) {
      for (var k = 0; k < 40; k++) {
        g.globalAlpha = 0.05 + R() * 0.07; g.fillStyle = "#15181b";
        g.fillRect(cx(s[0] + (R() - 0.5) * 9), cy(s[1] + (R() - 0.5) * 7), (1 + R() * 3) * SX, 2 + R() * 2);
      }
    });
    g.globalAlpha = 1;

    /* --- the white deck-edge line, 0.9 m in, all round                    */
    var EDGE = [[XB - 0.9, -DHW + 0.9], [XB - 0.9, DHW - 0.9], [-106.7, DHW - 0.9], [-106.7, 14.2],
                [HX0 + 0.9, 14.2], [HX0 + 0.9, -6.5], [-108.5, -6.5], [-108.5, -DHW + 0.9]];
    g.save(); g.strokeStyle = WHITE; g.lineWidth = Math.max(1.2, 0.35 * SY);
    g.beginPath(); g.moveTo(cx(EDGE[0][0]), cy(EDGE[0][1]));
    for (i = 1; i < EDGE.length; i++) g.lineTo(cx(EDGE[i][0]), cy(EDGE[i][1]));
    g.closePath(); g.stroke(); g.restore();

    /* --- the dashed line down the deck, between the spots and the island  */
    mline([LIFT_A.x1 + 0.5, DASH_Y], [XB - 2.5, DASH_Y], 0.32, WHITE, [3.2, 3.0]);

    /* --- the spots: circle, lineup dashes aft of it, a transverse bar 6.3 m
       forward of its centre from the edge line to the dashed line, and two
       fan lines from the circle to the outboard end of the bar             */
    function spot(s, num, sideSign) {
      var x = s[0], y = s[1];
      circ(x, y, 3.9, 0.32, WHITE);
      mline([x - 26, y], [x - 5.2, y], 0.32, WHITE, [6.5, 4.0]);
      var yEdge = sideSign > 0 ? DHW - 1.2 : -7.0 - 1.0, yIn = DASH_Y + (sideSign > 0 ? 0.3 : -0.3);
      if (sideSign < 0) { yEdge = -DHW + 1.2; }
      mline([x + 6.3, yIn], [x + 6.3, yEdge], 0.34, WHITE);
      mline([x - 2.6, y - sideSign * 2.9], [x + 6.3, yEdge], 0.26, WHITE);
      mline([x + 0.4, y - sideSign * 3.9], [x + 6.3, yEdge - sideSign * 2.2], 0.26, WHITE);
      g.save();
      g.translate(cx(x + 1.6), cy(y - sideSign * 6.6)); g.rotate(PI / 2);
      g.font = "bold " + Math.round(3.4 * SX) + "px Arial";
      g.textAlign = "center"; g.textBaseline = "middle";
      g.fillStyle = WHITE; g.fillText(String(num), 0, 0);
      g.restore();
    }
    SPOTS.forEach(function (s, k) { spot(s, k + 1, 1); });
    /* spot 7 aft of the island: its bar runs to the starboard edge         */
    circ(SPOT7[0], SPOT7[1], 3.9, 0.32, WHITE);
    mline([SPOT7[0] + 6.3, DASH_Y - 0.3], [SPOT7[0] + 6.3, -DHW + 1.2], 0.34, WHITE);
    mline([SPOT7[0] - 2.6, SPOT7[1] + 2.9], [SPOT7[0] + 6.3, -DHW + 1.2], 0.26, WHITE);
    g.save();
    g.translate(cx(SPOT7[0] + 9.0), cy(SPOT7[1] + 2.6)); g.rotate(PI / 2);
    g.font = "bold " + Math.round(3.4 * SX) + "px Arial";
    g.textAlign = "center"; g.textBaseline = "middle";
    g.fillStyle = WHITE; g.fillText("7", 0, 0);
    g.restore();

    /* --- the lifts: flush, outlined. The stern lift in a solid yellow and
       black border, the forward lift and the weapons lift in yellow dashes,
       white guide dashes inside, and a dark seam round each plate          */
    [LIFT_A, LIFT_F, LIFT_W].forEach(function (L) {
      g.strokeStyle = "rgba(10,11,13,0.85)"; g.lineWidth = 1.4;
      g.strokeRect(cx(L.x0 + 0.1), cy(L.y1 - 0.1), (L.x1 - L.x0 - 0.2) * SX, (L.y1 - L.y0 - 0.2) * SY);
    });
    hazard({ x0: LIFT_A.x0 + 1.1, x1: LIFT_A.x1 - 0.5, y0: LIFT_A.y0 + 0.5, y1: LIFT_A.y1 - 0.5 }, 0.55, false);
    [4.3, 0.4, -3.9].forEach(function (yy) { mline([LIFT_A.x0 + 3.5, yy], [LIFT_A.x1 - 3.5, yy], 0.32, WHITE, [3.0, 2.0]); });
    hazard({ x0: LIFT_F.x0 + 0.4, x1: LIFT_F.x1 - 0.4, y0: LIFT_F.y0 + 0.4, y1: LIFT_F.y1 - 0.4 }, 0.45, true);
    [-3.9, -6.9].forEach(function (yy) { mline([LIFT_F.x0 + 4.0, yy], [LIFT_F.x1 - 4.0, yy], 0.30, WHITE, [3.0, 2.0]); });
    hazard({ x0: LIFT_W.x0 + 0.3, x1: LIFT_W.x1 - 0.3, y0: LIFT_W.y0 + 0.3, y1: LIFT_W.y1 - 0.3 }, 0.4, true);
    for (i = 0; i < 3; i++) mline([LIFT_W.x0 + 1.4, LIFT_W.y0 + 1.6 + i * 2.0], [LIFT_W.x1 - 1.4, LIFT_W.y0 + 1.6 + i * 2.0], 0.35, YEL);

    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.repeat.set(1 / (DX1 - DX0), 1 / (DY1 - DY0));
    t.offset.set(-DX0 / (DX1 - DX0), -DY0 / (DY1 - DY0));
    return t;
  }

  /* --- the well: lit from the open stern, falling to near black forward;
     frames down the walls, wet plating and craft skid marks on the floor.
     u runs stern (0) to the forward bulkhead (1); v across or up.         */
  function wellTex(THREE) {
    var W = 1024, H = 256, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(7520), i;
    var gr = g.createLinearGradient(0, 0, W, 0);
    gr.addColorStop(0, "#6a7075"); gr.addColorStop(0.18, "#4a5055");
    gr.addColorStop(0.55, "#2a2e32"); gr.addColorStop(1, "#141619");
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    for (i = 0; i < 140; i++) {
      g.globalAlpha = 0.05 + R() * 0.08;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 20 + R() * 80, 8 + R() * 30);
    }
    g.globalAlpha = 1;
    /* web frames every 4 m                                                 */
    for (i = 1; i < 22; i++) {
      var x = i * W / 21.25;
      g.fillStyle = "rgba(0,0,0,0.45)"; g.fillRect(x, 0, 4, H);
      g.fillStyle = "rgba(255,255,255,0.10)"; g.fillRect(x - 3, 0, 2, H);
    }
    g.fillStyle = "rgba(0,0,0,0.35)"; g.fillRect(0, H * 0.5 - 2, W, 4);
    /* light fittings near the stern                                        */
    g.fillStyle = "rgba(255,246,220,0.55)";
    for (i = 0; i < 8; i++) g.fillRect(30 + i * 52, H * 0.12, 10, 5);
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }

  var _tex = null;
  function textures(THREE) {
    if (_tex) return _tex;
    _tex = { hull: hullTex(THREE, FD_BOT, 0, 512, 75031), bot: hullTex(THREE, 0, KEEL, 128, 75032), sup: supTex(THREE), deck: deckTex(THREE), well: wellTex(THREE) };
    return _tex;
  }

  /* ================================================================= hull
     Lofted from a station table. The broadsides and the stern photograph
     show a box: vertical, slab sides to the waterline for most of her
     length, a transom nearly her full width down to the water (80% of it
     at the waterline), a flat bottom. Forward the waterline fines away to
     a raked stem 11 m aft of the deck front, while the upper levels stay
     full far longer: that is the hard flare under the square overhang.

     Levels: [z, midship half-breadth, where it starts to fine forward,
     the shape exponents p and q, where it starts to narrow aft, its
     half-breadth at the transom, and that taper's exponent].            */
  var LEV = [
    [ -7.2, 12.5, -20, 1.6, 0.90,  -50,  6.0, 1.5 ],
    [ -6.95, 14.6, -12, 1.65, 0.87, -52,  7.8, 1.5 ],
    [ -6.6, 15.6,  -5, 1.7, 0.85,  -55,  9.0, 1.5 ],
    [ -6.0, 16.3,   2, 1.75, 0.82, -58, 10.6, 1.55 ],
    [ -5.0, 16.7,   8, 1.8, 0.80,  -60, 11.5, 1.6 ],
    [ -2.0, 17.0,  18, 1.9, 0.80,  -65, 13.5, 1.7 ],
    [  0.0, 17.1,  25, 1.9, 0.85,  -70, 14.6, 1.8 ],
    [  4.0, 17.2,  38, 2.0, 0.80,  -85, 16.4, 2.0 ],
    [  9.0, 17.35, 52, 2.0, 0.75, -999, 17.35, 1 ],
    [ 11.0, 17.42, 58, 2.05, 0.72, -999, 17.42, 1 ],
    [ 13.0, 17.5,  64, 2.1, 0.68, -999, 17.5, 1 ],
    [ 14.3, 17.56, 68, 2.15, 0.64, -999, 17.56, 1 ],
    [ FD_BOT, 17.6, 72, 2.2, 0.60, -999, 17.6, 1 ],
  ];
  /* the stem, as x for each height: the broadside reads the waterline
     entry 11.3 m aft of the deck front and the stem head at 113 m; under
     water a rounded forefoot (not seen: the usual form)                  */
  var STEM = [[-7.2, 88.0], [-6.6, 92.5], [-5.0, 98.0], [-2.0, 102.6], [0.0, 104.7],
              [4.0, 105.9], [9.0, 107.6], [13.0, 110.4], [FD_BOT, 113.1]];
  /* the lowest point of each section: the run rises to the transom's
     bottom, just under the water where the gate sill is; forward of the
     forefoot the lowest point IS the stem                                 */
  var KEELZ = [[HX0, -0.4], [-108, -1.5], [-100, -3.4], [-90, -5.3], [-80, -6.5], [-68, -7.1],
               [-60, KEEL], [86, KEEL], [88, -7.15], [92.5, -6.6], [98, -5.0], [102.6, -2.0],
               [104.7, 0.0], [105.9, 4.0], [107.6, 9.0], [110.4, 13.0], [HX1, FD_BOT]];
  function stemAt(z) { return tbl(STEM, z); }
  function lowY(k, x) {
    var L = LEV[k], y = L[1];
    if (x > L[2]) {
      var t = clamp((x - L[2]) / (stemAt(L[0]) - L[2]), 0, 1);
      y *= Math.pow(Math.max(0, 1 - Math.pow(t, L[3])), L[4]);
    }
    if (x < L[5]) {
      var s = clamp((L[5] - x) / (L[5] - HX0), 0, 1);
      y -= (L[1] - L[6]) * Math.pow(s, L[7]);
    }
    return y;
  }
  /* one side at station x, keel to the deck slab, as [y, z]              */
  function sideRing(x) {
    var out = [], zk = tbl(KEELZ, x), k, first = 0;
    while (first < LEV.length - 1 && LEV[first][0] < zk) first++;
    var yFirst = lowY(first, x);
    for (k = 0; k < LEV.length; k++) {
      if (LEV[k][0] < zk) out.push([0.8 * yFirst, zk]);
      else out.push([lowY(k, x), LEV[k][0]]);
    }
    return out;
  }
  var STA = [HX0, -111, -108, -106, -104, -102, -100, -97.5, -95, -92.5, -90, -87, -84, -81, -78,
             -74, -70, -65, -60, -50, -40, -28, -16, -4,
             8, 18, 26, 34, 42, 50, 55, 58, 61, 64, 67, 70, 73, 76, 78.5, 81, 83.5, 86, 88, 90, 92,
             94, 95.5, 97, 98.5, 100, 101, 102, 103.6,
             104.7, 105.4, 106.2, 107.0, 108.0, 109.2, 110.4, 111.6, 112.5, HX1];
  function ringAt(x) {
    var P = sideRing(x), r = [], j;
    r.push([0, FD_BOT]);
    for (j = P.length - 1; j >= 0; j--) r.push([P[j][0], P[j][1]]);
    r.push([0, tbl(KEELZ, x)]);
    for (j = 0; j < P.length; j++) r.push([-P[j][0], P[j][1]]);
    return r;
  }

  function hullGeo(THREE) {
    var st = STA, i, j, rings = [];
    for (i = 0; i < st.length; i++) rings.push(ringAt(st[i]));
    var nR = rings[0].length;
    function V(ii, jj) { var q = rings[ii][jj % nR]; return [st[ii], q[0], q[1]]; }
    function K(ii, jj) { return ii * nR + (jj % nR); }
    /* faces collected first, so normals can be smoothed across neighbours
       within 34 degrees: the flare reads smooth, the chines stay crisp   */
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
    for (i = 0; i < st.length - 1; i++) {
      for (j = 0; j < nR; j++) {
        tri(V(i, j), V(i + 1, j), V(i, j + 1), K(i, j), K(i + 1, j), K(i, j + 1));
        tri(V(i, j + 1), V(i + 1, j), V(i + 1, j + 1), K(i, j + 1), K(i + 1, j), K(i + 1, j + 1));
      }
    }
    var around = {}, COS = Math.cos(34 * PI / 180);
    faces.forEach(function (f, fi) { f.k.forEach(function (k) { (around[k] || (around[k] = [])).push(fi); }); });
    var OUT = { top: { pos: [], nrm: [], uv: [], z0: 0, z1: FD_BOT }, bot: { pos: [], nrm: [], uv: [], z0: KEEL, z1: 0 } };
    faces.forEach(function (f) {
      var o = (f.p[0][2] + f.p[1][2] + f.p[2][2]) / 3 >= 0 ? OUT.top : OUT.bot;
      var pos = o.pos, nrm = o.nrm, uv = o.uv;
      for (var c = 0; c < 3; c++) {
        var q = f.p[c], sx = 0, sy = 0, sz = 0;
        around[f.k[c]].forEach(function (gi) {
          var g2 = faces[gi];
          if (g2.u[0] * f.u[0] + g2.u[1] * f.u[1] + g2.u[2] * f.u[2] < COS) return;
          sx += g2.n[0]; sy += g2.n[1]; sz += g2.n[2];
        });
        var l = Math.sqrt(sx * sx + sy * sy + sz * sz) || 1;
        pos.push(q[0], q[1], q[2]);
        nrm.push(sx / l, sy / l, sz / l);
        uv.push((q[0] - HX0) / (HX1 - HX0), clamp((q[2] - o.z0) / (o.z1 - o.z0), 0, 1));
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
  /* The transom: a flat plate on the after station's outline with the
     well opening cut out of it, the gate's 20 m by the well's height.   */
  function transomGeo(THREE) {
    var r = ringAt(HX0), pts = [], i;
    for (i = 0; i < r.length; i++) {
      var p = r[i], q = pts[pts.length - 1];
      if (!q || Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]) > 0.01) pts.push(p);
    }
    if (Math.abs(pts[0][0] - pts[pts.length - 1][0]) + Math.abs(pts[0][1] - pts[pts.length - 1][1]) < 0.01) pts.pop();
    var sh = new THREE.Shape();
    sh.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) sh.lineTo(pts[i][0], pts[i][1]);
    sh.closePath();
    var hole = new THREE.Path();
    hole.moveTo(-WHW, WZ0); hole.lineTo(WHW, WZ0); hole.lineTo(WHW, WZ1); hole.lineTo(-WHW, WZ1); hole.closePath();
    sh.holes.push(hole);
    var sg = new THREE.ShapeGeometry(sh).toNonIndexed();
    var P = sg.getAttribute("position"), pos = [], uv = [];
    for (i = 0; i < P.count; i += 3) {
      var a = [HX0, P.getX(i), P.getY(i)], b = [HX0, P.getX(i + 1), P.getY(i + 1)], c = [HX0, P.getX(i + 2), P.getY(i + 2)];
      /* facing aft: the normal's x must be negative                       */
      var nx = (b[1] - a[1]) * (c[2] - a[2]) - (b[2] - a[2]) * (c[1] - a[1]);
      if (nx > 0) { var tq = b; b = c; c = tq; }
      [a, b, c].forEach(function (v) {
        pos.push(v[0], v[1], v[2]);
        uv.push(0.004, clamp(v[2] / FD_BOT, 0, 1));
      });
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    return g;
  }
  /* the hull's underwater volume, by the signed volume of the loft below
     z = 0 (tests only)                                                   */
  function underVolume() {
    var v = 0, i, prev = null, px = 0;
    for (var xx = HX0; xx <= HX1; xx += 0.5) {
      var r = ringAt(xx), a = 0;
      for (i = 0; i < r.length; i++) {
        var p = r[i], q = r[(i + 1) % r.length];
        a += p[0] * Math.min(0, q[1]) - q[0] * Math.min(0, p[1]);
      }
      a = Math.abs(a) * 0.5;
      if (prev !== null) v += (a + prev) * 0.5 * (xx - px);
      prev = a; px = xx;
    }
    return v;
  }

  /* ========================================================== weapons
     Built in their own frame, mount on +X, ring centre at the origin.     */
  /* H/PJ-14 (Type 1130): a squared gun house on a ring, the eleven-barrel
     cluster in a shroud out of its face, the fire-control dome behind,
     as the starboard aft photograph shows it.                              */
  function hpj14Parts(THREE) {
    return [
      ["S", cylZ(THREE, 1.45, 1.6, 0.5, 16, 0, 0, 0)],
      ["S", prism2(THREE, rect(-1.6, 1.3, -1.35, 1.35), rect(-1.4, 1.0, -1.15, 1.15), 0.5, 2.1)],
      ["W", sphere(THREE, 0.95, 14, 6, -0.9, 0, 2.05, 1, 1, 1, true)],
      ["M", place(THREE, new THREE.CylinderGeometry(0.30, 0.36, 2.6, 10).rotateZ(-PI / 2), 2.4, 0, 1.75, 0, -0.32, 0)],
      ["K", place(THREE, new THREE.CylinderGeometry(0.22, 0.22, 0.12, 10).rotateZ(-PI / 2), 3.62, 0, 2.17, 0, -0.32, 0)],
      ["S", box(THREE, 0.9, 0.5, 0.6, 1.2, 0.95, 1.4)],
    ];
  }
  /* HHQ-10: the box launcher, wider than tall, trained and elevated on a
     slender pedestal, as on the island's forward end and the port quarter */
  function hhq10Parts(THREE) {
    var el = -0.42;
    return [
      ["S", cylZ(THREE, 0.75, 0.95, 1.1, 10, 0, 0, 0)],
      ["S", cylZ(THREE, 0.55, 0.6, 1.3, 8, 0, 0, 1.1)],
      ["S", box(THREE, 1.0, 1.5, 0.7, 0, 0, 2.55)],
      ["S", box(THREE, 2.4, 2.9, 1.7, 0.25, 0, 3.4, 0, el, 0)],
      ["K", box(THREE, 0.08, 2.6, 1.45, 0.25 + 1.24 * Math.cos(el), 0, 3.4 - 1.24 * Math.sin(el), 0, el, 0)],
      ["M", box(THREE, 0.4, 0.3, 0.5, -0.9, 1.2, 3.0)],
    ];
  }
  /* decoy launcher: a trainable block of tubes                            */
  function decoyParts(THREE) {
    return [
      ["S", cylZ(THREE, 0.5, 0.6, 0.6, 8, 0, 0, 0)],
      ["S", box(THREE, 1.3, 1.6, 0.9, 0, 0, 1.0, 0, -0.5, 0)],
      ["K", box(THREE, 0.06, 1.4, 0.75, 0.66, 0, 1.33, 0, -0.5, 0)],
    ];
  }
  /* a rigid-hull inflatable in its cradle, bow +X, keel on z = 0         */
  function rhibParts(THREE, M) {
    var hull = M.loft(THREE, [
      { x:  4.4, w: 0.10, h: 0.25, zc: 0.85 },
      { x:  3.4, w: 1.05, h: 0.62, zc: 0.62 },
      { x:  1.0, w: 1.45, h: 0.70, zc: 0.55 },
      { x: -3.0, w: 1.45, h: 0.70, zc: 0.55 },
      { x: -4.4, w: 1.40, h: 0.66, zc: 0.55 },
    ], 8);
    return [
      ["W", hull],
      ["K", place(THREE, new THREE.CircleGeometry(1.0, 8).rotateY(-PI / 2).scale(1, 1.4, 0.66), -4.41, 0, 0.55)],
      ["S", box(THREE, 1.2, 1.0, 0.9, -0.6, 0, 1.4)],
      ["G", box(THREE, 0.1, 0.9, 0.35, 0.02, 0, 1.75, 0, -0.5, 0)],
      ["M", strut(THREE, -2.2, 0, 1.2, -2.2, 0, 2.6, 0.06, 4)],
    ];
  }

  /* ================================================================ build */
  function build(THREE, M, C) {
    var root = new THREE.Group();
    var i, j, s;

    var T = {}, TX = textures(THREE);
    T.H = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.hull, roughness: 0.86, metalness: 0.06 });
    T.U = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.bot, roughness: 0.90, metalness: 0.04 });
    T.S = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.sup, roughness: 0.86, metalness: 0.06 });
    T.D = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.deck, roughness: 0.94, metalness: 0.04 });
    T.L = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.well, roughness: 0.80, metalness: 0.10,
                                           emissive: 0xffffff, emissiveMap: TX.well, emissiveIntensity: 0.22 });
    T.K = new THREE.MeshStandardMaterial({ color: 0x1b1f23, roughness: 0.90, metalness: 0.05 });
    T.M = new THREE.MeshStandardMaterial({ color: 0x5d666d, roughness: 0.55, metalness: 0.50 });
    T.G = new THREE.MeshStandardMaterial({ color: 0x121c25, roughness: 0.12, metalness: 0.0, transparent: true, opacity: 0.88 });
    T.R = new THREE.MeshStandardMaterial({ color: 0x3f474f, roughness: 0.58, metalness: 0.22 });
    T.W = new THREE.MeshStandardMaterial({ color: 0xc9cdd0, roughness: 0.62, metalness: 0.04 });
    T.T = new THREE.MeshStandardMaterial({ color: new THREE.Color(C && C.team !== undefined ? C.team : 0xd04a3a),
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
        B.M.add(box(THREE, Math.sqrt(ddx * ddx + ddy * ddy), 0.07, 0.07,
                    (p0[0] + p1[0]) * 0.5, (p0[1] + p1[1]) * 0.5, z, 0, 0, Math.atan2(ddy, ddx)));
      }
    }
    function polyRail(pts, z) {
      for (var k = 0; k < pts.length - 1; k++) {
        var p0 = pts[k], p1 = pts[k + 1];
        var ddx = p1[0] - p0[0], ddy = p1[1] - p0[1];
        B.M.add(box(THREE, Math.sqrt(ddx * ddx + ddy * ddy), 0.07, 0.07,
                    (p0[0] + p1[0]) * 0.5, (p0[1] + p1[1]) * 0.5, z, 0, 0, Math.atan2(ddy, ddx)));
      }
    }
    /* a sponson or balcony: a deck plate and a knee sweeping back in to
       the hull side under it, so it reads as carried                     */
    function sponson(pts, ztop, depth, side) {
      if (ccwSign(pts) < 0) pts = pts.slice().reverse();
      B.S.add(plate(THREE, pts, ztop - 0.45, ztop));
      var yin = Math.min.apply(null, pts.map(function (q) { return Math.abs(q[1]); }));
      var knee = pts.map(function (q) { return [q[0], side * lerp(yin, Math.abs(q[1]), 0.2)]; });
      B.S.add(prism2(THREE, knee, pts, ztop - 0.45 - depth, ztop - 0.45));
    }
    function sideRail(x0, x1, y, z) {
      B.M.add(box(THREE, x1 - x0, 0.06, 0.06, (x0 + x1) * 0.5, y, z + 1.0));
      B.M.add(box(THREE, x1 - x0, 0.05, 0.05, (x0 + x1) * 0.5, y, z + 0.5));
    }

    /* ------------------------------------------------------------- hull */
    var hg = hullGeo(THREE);
    B.H.add(hg.top);
    B.U.add(hg.bot);
    B.H.add(transomGeo(THREE));

    /* ------------------------------------------------------ flight deck
       The slab is the deck and the 4.4 m fascia round it in one: the cap
       on top takes the deck painting, its sides and the soffit under the
       bow overhang take the plate                                         */
    var shp = new THREE.Shape();
    shp.moveTo(DECK[0][0], DECK[0][1]);
    for (i = 1; i < DECK.length; i++) shp.lineTo(DECK[i][0], DECK[i][1]);
    shp.closePath();
    var dg = new THREE.ExtrudeGeometry(shp, { depth: FD_TOP - FD_BOT, bevelEnabled: false, curveSegments: 1 });
    dg.translate(0, 0, FD_BOT);
    (function () {
      var g = dg.index ? dg.toNonIndexed() : dg;
      if (!g.getAttribute("normal")) g.computeVertexNormals();
      var P = g.getAttribute("position"), N = g.getAttribute("normal"), U = g.getAttribute("uv");
      for (var q = 0; q < P.count; q += 3) {
        var nz = N.getZ(q) + N.getZ(q + 1) + N.getZ(q + 2);
        var top = nz > 2.5, Bt = top ? B.D : B.S, k = top ? 1 : 1 / 16;
        for (var c = q; c < q + 3; c++) {
          Bt.p.push(P.getX(c), P.getY(c), P.getZ(c));
          Bt.n.push(N.getX(c), N.getY(c), N.getZ(c));
          Bt.u.push(U.getX(c) * k, U.getY(c) * k);
        }
      }
    })();

    /* folded deck-edge rails: at sea they lie flat outboard of the edge, the
       pale fringe round the deck in the overhead. Not on the bow or stern
       faces, where they would lengthen the ship in render3d's eyes        */
    for (s = -1; s <= 1; s += 2) {
      var xa = s > 0 ? -107.6 : -109.4, xb = XB - 1.4;
      B.M.add(box(THREE, xb - xa, 0.5, 0.08, (xa + xb) * 0.5, s * (DHW + 0.25), FD_TOP - 0.18));
      B.M.add(box(THREE, xb - xa, 0.07, 0.07, (xa + xb) * 0.5, s * (DHW + 0.55), FD_TOP - 0.2));
      for (var xr = xa + 2.0; xr < xb; xr += 4.0)
        B.M.add(box(THREE, 0.08, 0.62, 0.08, xr, s * (DHW + 0.27), FD_TOP - 0.15));
    }

    /* ------------------------------------------------------------ stern
       The two corner platforms, notched out of the deck 2.5 m below it, a
       block under each standing proud of the transom; the recess under
       the flight deck between them; the well gate and the slot over it.  */
    B.S.add(plate(THREE, rect(XS, -107.6, 15.1, 21.3), ZP - 0.45, ZP));
    B.S.add(prism2(THREE, rect(XS, -107.6, 15.1, 18.2), rect(XS, -107.6, 15.1, 21.3), 13.0, ZP - 0.45));
    B.S.add(plate(THREE, rect(XS + 0.04, HX0 + 0.2, 6.1, 15.1), 12.0, ZP));
    B.S.add(plate(THREE, rect(XS + 0.04, -109.4, -DHW, -7.4), 12.0, ZP));
    polyRail([[XS + 0.15, 6.2], [XS + 0.15, 21.15], [-107.75, 21.15]], ZP + 1.0);
    polyRail([[XS + 0.15, -7.6], [XS + 0.15, -DHW + 0.15]], ZP + 1.0);
    /* HHQ-10 on the port quarter, H/PJ-14 on the starboard, both trained
       aft-outboard as the stern photograph shows them                      */
    emit(hhq10Parts(THREE), -112.0, 18.2, ZP, PI * 0.82);
    emit(hpj14Parts(THREE), -112.6, -12.8, ZP, -PI * 0.78);
    /* windows and the round stern fairleads in the transom                 */
    B.K.add(box(THREE, 0.06, 0.9, 1.1, XS + 0.03, 12.8, 14.2));
    B.K.add(box(THREE, 0.06, 0.9, 1.1, XS + 0.03, -14.4, 14.6));
    B.K.add(box(THREE, 0.1, 0.9, 1.1, HX0 - 0.04, 12.8, 8.6));
    for (s = -1; s <= 1; s += 2)
      B.K.add(place(THREE, new THREE.CylinderGeometry(0.66, 0.66, 0.2, 10).rotateZ(PI / 2), HX0 - 0.06, s > 0 ? 11.0 : -12.9, 7.9));
    /* the recess under the deck: dark, a balcony across its floor          */
    B.K.add(box(THREE, 0.12, 10.4, 5.4, HX0 - 0.2, -2.1, 15.6));
    B.S.add(box(THREE, 1.0, 10.4, 0.25, HX0 - 0.5, -2.1, 12.95));
    sideRail(-2.1 - 5.2, -2.1 + 5.2, 0, 0);
    B.M.add(box(THREE, 0.06, 10.4, 0.06, HX0 - 0.95, -2.1, 13.1 + 1.0));
    B.M.add(box(THREE, 0.06, 10.4, 0.05, HX0 - 0.95, -2.1, 13.1 + 0.5));
    /* the dark slot over the gate is the well itself, seen through it; a
       guide rail each side of the opening and a lintel over it            */
    for (s = -1; s <= 1; s += 2) B.S.add(box(THREE, 0.5, 0.45, WZ1 - WZ0 + 0.4, HX0 - 0.2, s * (WHW + 0.22), (WZ0 + WZ1) * 0.5));
    B.S.add(box(THREE, 0.5, 2 * WHW + 0.9, 0.45, HX0 - 0.2, 0, WZ1 + 0.2));

    /* --------------------------------------------------------- the well
       A cavity wound inward: floor, deckhead, two walls and the bulkhead
       at its forward end. The hull is closed round it, so it shows only
       through the stern opening.                                           */
    var WL = WX1 - HX0;
    function wq(a, b, c, d, va, vb) {
      B.L.add(quad(THREE, a, b, c, d,
        [[(a[0] - HX0) / WL, va], [(b[0] - HX0) / WL, va], [(c[0] - HX0) / WL, vb], [(d[0] - HX0) / WL, vb]]));
    }
    var x0w = HX0 + 0.02;
    wq([x0w, -WHW, WZ0], [WX1, -WHW, WZ0], [WX1, WHW, WZ0], [x0w, WHW, WZ0], 0.0, 0.5);       /* floor  */
    wq([x0w, WHW, WZ1], [WX1, WHW, WZ1], [WX1, -WHW, WZ1], [x0w, -WHW, WZ1], 0.5, 1.0);       /* deckhead */
    wq([x0w, WHW, WZ0], [WX1, WHW, WZ0], [WX1, WHW, WZ1], [x0w, WHW, WZ1], 0.5, 1.0);         /* port wall */
    wq([WX1, -WHW, WZ0], [x0w, -WHW, WZ0], [x0w, -WHW, WZ1], [WX1, -WHW, WZ1], 0.5, 1.0);     /* stbd wall */
    B.L.add(quad(THREE, [WX1, WHW, WZ0], [WX1, -WHW, WZ0], [WX1, -WHW, WZ1], [WX1, WHW, WZ1],
                 [[0.99, 0], [0.99, 0.2], [0.99, 0.6], [0.99, 1]]));                          /* bulkhead */
    /* web frames down both walls and beams across the deckhead, every 4 m,
       so a craft moving in reads against the structure it passes           */
    for (var fx = HX0 + 4.0; fx < WX1 - 1.0; fx += 4.0) {
      var uq = (fx - HX0) / WL;
      for (s = -1; s <= 1; s += 2) {
        var fr = box(THREE, 0.35, 0.45, WZ1 - WZ0, fx, s * (WHW - 0.22), (WZ0 + WZ1) * 0.5);
        var fu = fr.getAttribute("uv");
        for (var qq = 0; qq < fu.count; qq++) fu.setXY(qq, uq, 0.75);
        B.L.add(fr);
      }
      if (Math.round((fx - HX0) / 4.0) % 2 === 0) {
        var bm = box(THREE, 0.4, 2 * WHW, 0.5, fx, 0, WZ1 - 0.25), bu = bm.getAttribute("uv");
        for (var qb = 0; qb < bu.count; qb++) bu.setXY(qb, uq, 0.9);
        B.L.add(bm);
      }
    }
    /* the wing-wall walkways down each side of the well, as LPD wells have */
    for (s = -1; s <= 1; s += 2) {
      B.S.add(box(THREE, WL - 2, 1.3, 0.2, (HX0 + WX1) * 0.5 + 1, s * (WHW - 0.65), 4.6));
      B.M.add(box(THREE, WL - 2, 0.05, 0.05, (HX0 + WX1) * 0.5 + 1, s * (WHW - 1.3), 5.6));
    }
    root.userData.wellExit = { x: HX0, y: 0, z: WZ0 };
    root.userData.wellInner = { x: -80.0, y: 0, z: WZ0 };

    /* ----------------------------------------------- the gate, which opens
       Hinged on its bottom outer edge. It is built upright about that
       hinge, then turned PI about X into a fixed mount that is also turned
       PI about X: shut, the two cancel. Turning "wellgate" +Y inside the
       mount then swings its top AFT and down.                             */
    var gMount = new THREE.Group();
    gMount.position.set(HX0 - 0.3, 0, WZ0);
    gMount.rotation.x = PI;
    var gate = new THREE.Group();
    gate.name = "wellgate";
    gMount.add(gate);
    root.add(gMount);
    (function () {
      var GB = { S: new Batch(), M: new Batch() };
      function gadd(k, geo) { geo.rotateX(PI); GB[k].add(geo); }
      /* the plate, 0.6 m thick from the hinge inboard                       */
      gadd("S", box(THREE, 0.6, 2 * WHW - 0.1, GATE_H, 0.3, 0, GATE_H * 0.5));
      /* two rows of ten recessed panels between frames, as photographed    */
      for (j = 0; j <= 10; j++)
        gadd("S", box(THREE, 0.3, 0.32, GATE_H - 0.6, -0.12, -WHW + 0.4 + j * (2 * WHW - 0.8) / 10, GATE_H * 0.5));
      [0.35, GATE_H * 0.5, GATE_H - 0.35].forEach(function (zz) {
        gadd("S", box(THREE, 0.34, 2 * WHW - 0.2, 0.42, -0.14, 0, zz));
      });
      for (j = 0; j < 10; j++) for (var rr = 0; rr < 2; rr++) {
        var yc = -WHW + 0.4 + (j + 0.5) * (2 * WHW - 0.8) / 10, zc = rr ? GATE_H * 0.75 : GATE_H * 0.25;
        gadd("M", box(THREE, 0.04, 1.35, GATE_H * 0.5 - 0.95, -0.02, yc, zc));
      }
      /* the hinge barrel and the hoist lugs at the head                    */
      gadd("M", place(THREE, new THREE.CylinderGeometry(0.28, 0.28, 2 * WHW, 8), 0.0, 0, 0.0));
      for (s = -1; s <= 1; s += 2) gadd("M", box(THREE, 0.5, 0.3, 0.5, 0.05, s * (WHW - 1.0), GATE_H - 0.1));
      Object.keys(GB).forEach(function (k) { var mm = GB[k].mesh(THREE, T[k]); if (mm) gate.add(mm); });
    })();

    /* ------------------------------------------------------------- bow
       The anchors in their pockets on the flare; the stem fitting.        */
    for (s = -1; s <= 1; s += 2) {
      var ya = lerp(lowY(7, 97.6), lowY(8, 97.6), 0.52) + 0.1;
      B.K.add(place(THREE, new THREE.CylinderGeometry(1.05, 1.05, 0.3, 10), 97.6, s * (ya + 0.1), 6.6, s * 0.5, 0, s * -0.55));
      B.M.add(box(THREE, 2.2, 0.45, 2.6, 97.2, s * (ya + 0.4), 5.6, s * 0.5, 0, s * -0.55));
    }

    /* ----------------------------------------------------------- the sides */
    /* the starboard side door to the vehicle deck, and its opposite        */
    for (s = -1; s <= 1; s += 2) {
      var yd = s * (lowY(8, 32.5) + 0.06);
      B.K.add(box(THREE, 6.2, 0.12, 5.2, 32.5, yd, 6.1));
      B.S.add(box(THREE, 6.8, 0.25, 0.35, 32.5, yd + s * 0.08, 8.85));
    }
    /* the gangway port and its accommodation ladder stowed in it          */
    B.K.add(box(THREE, 7.4, 0.12, 2.5, 11.4, -(lowY(8, 11.4) + 0.06), 5.8));
    B.M.add(strut(THREE, 8.6, -(lowY(8, 11.4) + 0.3), 4.7, 14.6, -(lowY(8, 11.4) + 0.3), 6.6, 0.12, 4));
    /* the big louvred intake under the after tower, both quarters          */
    B.K.add(box(THREE, 5.5, 0.12, 3.6, -27.2, -(lowY(10, -27.2) + 0.06), 8.8));
    for (j = 0; j < 7; j++) B.S.add(box(THREE, 5.5, 0.22, 0.12, -27.2, -(lowY(10, -27.2) + 0.13), 7.3 + j * 0.5));
    B.K.add(box(THREE, 3.2, 0.12, 2.6, -88.0, -(lowY(10, -88) + 0.06), 9.6));
    for (j = 0; j < 5; j++) B.S.add(box(THREE, 3.2, 0.22, 0.12, -88.0, -(lowY(10, -88) + 0.13), 8.6 + j * 0.5));

    /* bilge keels                                                          */
    for (s = -1; s <= 1; s += 2) B.U.add(box(THREE, 90.0, 0.3, 1.4, -10.0, s * (lowY(2, -10) + 0.35), -6.5, s * 0.8, 0, 0));
    /* twin shafts, five-bladed screws and spade rudders (a generic fit)    */
    for (s = -1; s <= 1; s += 2) {
      var sy = s * 7.6, sz = -5.6, sx = -94.0;
      B.M.add(strut(THREE, -64.0, s * 6.6, -6.95, sx + 0.8, sy, sz, 0.35, 6));
      B.M.add(strut(THREE, sx + 3.0, sy, sz, sx + 3.0, sy * 0.9, -3.9, 0.22, 4));
      B.M.add(place(THREE, new THREE.CylinderGeometry(0.38, 0.6, 1.3, 8).rotateZ(PI / 2), sx - 0.2, sy, sz));
      for (j = 0; j < 5; j++) {
        var bl = new THREE.BoxGeometry(0.25, 1.0, 1.45);
        bl.translate(0, 0, 0.95); bl.rotateZ(0.4); bl.rotateX(j * 2 * PI / 5);
        bl.translate(sx - 0.2, sy, sz);
        B.M.add(bl);
      }
      B.U.add(box(THREE, 4.0, 0.55, 3.4, -99.5, sy, -5.1));
    }

    /* ---------------------------------------------- sponsons and balconies
       Port side, off the overhead: the HHQ-10 platform on the quarter (the
       stern, above), a boat at x -73 .. -61, a satcom dome, the H/PJ-14 at
       48 .. 55, a boat at 75 .. 88.                                         */
    var ZSP = FD_TOP - 2.4;
    sponson(rect(-73.0, -61.0, DHW - 0.6, 21.6), ZSP, 3.0, 1);
    emit(rhibParts(THREE, M), -67.0, 20.0, ZSP, 0);
    for (j = 0; j < 2; j++) B.M.add(strut(THREE, -70 + j * 6, 18.2, FD_TOP - 0.3, -70 + j * 6, 20.6, FD_TOP + 1.2, 0.1, 4));
    sponson(rect(-56.0, -51.0, DHW - 0.6, 21.2), FD_TOP - 3.0, 2.5, 1);
    B.S.add(cylZ(THREE, 0.5, 0.6, 1.0, 8, -53.5, 19.8, FD_TOP - 3.0));
    B.W.add(sphere(THREE, 1.4, 16, 10, -53.5, 19.8, FD_TOP - 0.6));
    sponson(rect(47.5, 55.0, DHW - 0.6, 22.0), FD_TOP - 2.5, 3.5, 1);
    emit(hpj14Parts(THREE), 51.3, 20.0, FD_TOP - 2.5, PI * 0.45);
    sideRail(47.6, 54.9, 21.9, FD_TOP - 2.5);
    sponson(rect(75.5, 87.6, DHW - 0.6, 21.6), ZSP, 3.0, 1);
    emit(rhibParts(THREE, M), 81.5, 20.0, ZSP, 0);
    for (j = 0; j < 2; j++) B.M.add(strut(THREE, 78.5 + j * 6, 18.2, FD_TOP - 0.3, 78.5 + j * 6, 20.6, FD_TOP + 1.2, 0.1, 4));
    sponson(rect(5.5, 15.9, DHW - 0.6, 20.4), FD_TOP - 2.6, 2.5, 1);
    sideRail(5.6, 15.8, 20.3, FD_TOP - 2.6);
    /* the radio whips, lowered flat out to port for flying               */
    [-44.0, -38.0, -32.4, -14.4, -5.7].forEach(function (wx) {
      B.M.add(box(THREE, 0.5, 0.6, 0.6, wx, DHW + 0.1, FD_TOP - 1.0));
      B.M.add(strut(THREE, wx, DHW + 0.3, FD_TOP - 0.9, wx + 0.8, DHW + 7.4, FD_TOP - 0.6, 0.09, 4, 0.04));
    });

    /* Starboard: the H/PJ-14 platform on the quarter (above), the satcom
       balcony and the decoy launcher off the aft photograph, small
       balconies off the broadsides, the life-raft racks under the crane. */
    sponson(rect(-95.5, -91.5, -21.2, -DHW + 0.6), FD_TOP - 3.2, 2.5, -1);
    B.S.add(cylZ(THREE, 0.5, 0.6, 1.1, 8, -93.5, -19.8, FD_TOP - 3.2));
    B.W.add(sphere(THREE, 1.4, 16, 10, -93.5, -19.8, FD_TOP - 0.7));
    sideRail(-95.4, -91.6, -21.1, FD_TOP - 3.2);
    sponson(rect(-79.0, -74.0, -20.8, -DHW + 0.6), FD_TOP - 5.4, 2.0, -1);
    emit(decoyParts(THREE), -76.5, -19.6, FD_TOP - 5.4, -PI * 0.5);
    sideRail(-78.9, -74.1, -20.7, FD_TOP - 5.4);
    [[-100.5, -97.0, 14.6], [-86.5, -83.0, 15.2], [-42.0, -38.5, 15.0], [7.0, 10.0, 15.2],
     [-55.0, -51.0, 15.4], [-3.0, 1.0, 13.2], [-3.0, 1.0, 15.6], [19.0, 23.5, 13.6], [61.0, 64.0, 14.4]].forEach(function (b) {
      sponson(rect(b[0], b[1], -20.0, -DHW + 0.6), b[2], 1.6, -1);
      sideRail(b[0] + 0.1, b[1] - 0.1, -19.9, b[2]);
    });
    for (j = 0; j < 7; j++) for (var rk = 0; rk < 2; rk++) {
      var can = new THREE.CylinderGeometry(0.42, 0.42, 1.25, 6).rotateZ(PI / 2);
      B.W.add(place(THREE, can, 31.2 + j * 1.15, -18.6, 17.3 + rk * 0.95, 0, 0, 0));
    }
    B.S.add(box(THREE, 8.4, 1.0, 0.18, 34.6, -18.4, 16.75));

    /* --------------------------------------------------------- the island
       x -36.6 .. 33 on the starboard edge, 8.5 m across: a base deckhouse
       the whole length, the after tower, the glazed middle block, and the
       forward tower rising into the mast. Heights off the Anhui broadside.  */
    var Z0 = FD_TOP, ZB = Z0 + 5.6;
    var YO = -17.6, YI = -9.0;
    var baseB = rect(-36.6, 33.0, YO, YI), baseT = rect(-36.6, 29.3, YO, YI);
    B.S.add(prism2(THREE, baseB, baseT, Z0, ZB));
    /* flight deck control looks over the deck from the base's inboard face */
    B.G.add(facePatch(THREE, baseB, baseT, Z0, ZB, 2, 0.62, 0.86, Z0 + 2.4, Z0 + 3.5, 0.05));
    B.G.add(facePatch(THREE, baseB, baseT, Z0, ZB, 2, 0.10, 0.22, Z0 + 2.4, Z0 + 3.5, 0.05));
    /* doors onto the deck                                                   */
    [0.3, 0.48, 0.72].forEach(function (f) { B.K.add(facePatch(THREE, baseB, baseT, Z0, ZB, 2, f, f + 0.018, Z0, Z0 + 2.1, 0.04)); });
    polyRail([[29.0, YO + 0.2], [29.0, YI - 0.2], [-36.4, YI - 0.2]], ZB + 1.0);
    polyRail([[-23.4, YO + 0.2], [1.4, YO + 0.2]], ZB + 1.0);
    /* air-conditioning plant and lockers on the base roof between towers  */
    B.S.add(box(THREE, 3.0, 2.0, 1.4, -18.0, -11.2, ZB + 0.7));
    B.S.add(box(THREE, 2.2, 1.6, 1.1, -22.4, -11.0, ZB + 0.55));
    B.K.add(box(THREE, 2.6, 0.06, 0.8, -18.0, -10.17, ZB + 0.75));

    /* after tower                                                          */
    var aB = rect(-36.6, -23.6, YO + 0.1, -10.0), aT = rect(-36.2, -24.2, YO + 0.35, -10.4), ZA = Z0 + 11.4;
    B.S.add(prism2(THREE, aB, aT, ZB, ZA));
    /* its glazed upper storey looks aft and to both sides, over spot 7    */
    B.G.add(facePatch(THREE, aB, aT, ZB, ZA, 3, 0.1, 0.9, ZA - 2.6, ZA - 1.2, 0.05));
    for (j = 0; j < 3; j++) B.G.add(facePatch(THREE, aB, aT, ZB, ZA, 0, 0.08 + j * 0.14, 0.16 + j * 0.14, ZA - 2.4, ZA - 1.4, 0.05));
    B.G.add(facePatch(THREE, aB, aT, ZB, ZA, 2, 0.45, 0.95, ZA - 2.6, ZA - 1.2, 0.05));
    B.G.add(facePatch(THREE, aB, aT, ZB, ZA, 0, 0.1, 0.4, ZA - 5.0, ZA - 3.9, 0.05));
    for (j = 0; j < 4; j++) B.G.add(facePatch(THREE, aB, aT, ZB, ZA, 0, 0.12 + j * 0.2, 0.22 + j * 0.2, ZB + 1.6, ZB + 2.5, 0.05));
    B.T.add(prism2(THREE, rect(-36.0, -24.8, YO + 0.6, -10.8), rect(-36.0, -24.8, YO + 0.6, -10.8), ZA, ZA + 0.12));
    B.S.add(plate(THREE, rect(-31.0, -24.6, -15.6, -11.6), ZA, ZA + 1.6));
    ringRail(aT, ZA + 1.0);
    B.W.add(sphere(THREE, 0.75, 10, 6, -35.0, -16.0, ZA + 0.75));
    B.W.add(sphere(THREE, 0.75, 10, 6, -35.0, -11.6, ZA + 0.75));
    /* its mast: a tapered post, a yard, the navigation radar's enclosed
       antenna on top and a whip                                            */
    var AMX = -26.6, AMY = -13.6, AZ = ZA + 1.6;
    B.S.add(cylZ(THREE, 0.32, 0.55, 5.4, 6, AMX, AMY, AZ));
    B.S.add(box(THREE, 0.5, 5.6, 0.25, AMX, AMY, AZ + 3.2));
    B.S.add(cylZ(THREE, 1.2, 1.2, 0.2, 8, AMX, AMY, AZ + 2.0));
    B.W.add(sphere(THREE, 1, 10, 6, AMX, AMY, AZ + 6.0, 1.6, 0.9, 0.55));
    B.M.add(strut(THREE, AMX - 0.5, AMY, AZ + 5.4, AMX - 0.5, AMY, AZ + 9.4, 0.06, 4, 0.03));
    /* the big satcom dome on the base between the towers                  */
    B.S.add(cylZ(THREE, 0.7, 0.9, 1.4, 8, -20.4, -15.0, ZB));
    B.W.add(sphere(THREE, 1.75, 18, 11, -20.4, -15.0, ZB + 2.6));

    /* middle block, glazed in two storeys, black-topped                   */
    var mB = rect(-14.6, 1.6, -16.6, -10.4), mT = rect(-14.5, 1.5, -16.5, -10.5), ZM = Z0 + 12.8;
    B.S.add(prism2(THREE, mB, mT, ZB, ZM - 0.8));
    B.K.add(prism2(THREE, rect(-14.62, 1.62, -16.62, -10.38), rect(-14.52, 1.52, -16.52, -10.48), ZM - 0.8, ZM));
    for (j = 0; j < 6; j++) {
      var f0 = 0.06 + j * 0.152;
      B.G.add(facePatch(THREE, mB, mT, ZB, ZM - 0.8, 0, f0, f0 + 0.11, ZB + 3.6, ZB + 5.0, 0.05));
      B.G.add(facePatch(THREE, mB, mT, ZB, ZM - 0.8, 0, f0, f0 + 0.11, ZB + 0.6, ZB + 2.0, 0.05));
    }
    B.G.add(facePatch(THREE, mB, mT, ZB, ZM - 0.8, 3, 0.15, 0.45, ZB + 3.6, ZB + 5.0, 0.05));
    B.G.add(facePatch(THREE, mB, mT, ZB, ZM - 0.8, 3, 0.55, 0.85, ZB + 3.6, ZB + 5.0, 0.05));
    B.K.add(plate(THREE, rect(-12.6, -0.6, -14.3, -12.7), ZM, ZM + 0.25));
    ringRail(rect(-14.3, 1.3, -16.3, -10.7), ZM + 1.0);
    for (j = 0; j < 3; j++) B.M.add(strut(THREE, -10 + j * 4.5, -10.9, ZM, -10 + j * 4.5, -10.9, ZM + 4.5, 0.05, 4, 0.025));

    /* forward tower: from the base it tapers and leans aft into the mast;
       its after face is black from the middle block's roof to the yard    */
    var fB = rect(4.2, 14.6, YO + 0.2, -9.4), fT = rect(4.6, 13.0, -16.4, -10.6), ZF = Z0 + 17.9;
    B.S.add(prism2(THREE, fB, fT, ZB, ZF));
    B.K.add(facePatch(THREE, fB, fT, ZB, ZF, 3, 0.0, 1.0, ZM, ZF, 0.05));
    var uB = rect(5.4, 11.4, -15.6, -11.4), uT = rect(6.0, 10.0, -14.9, -12.1), ZU = Z0 + 24.6;
    B.S.add(plate(THREE, rect(4.4, 13.2, -16.6, -10.4), ZF, ZF + 0.35));
    ringRail(rect(4.5, 13.1, -16.5, -10.5), ZF + 1.35);
    B.S.add(prism2(THREE, uB, uT, ZF, ZU));
    B.K.add(facePatch(THREE, uB, uT, ZF, ZU, 3, 0.0, 1.0, ZF, ZU, 0.05));
    /* team band round the mast head                                        */
    B.T.add(prism2(THREE, rect(5.84, 10.26, -15.06, -11.94), rect(5.82, 10.12, -14.98, -12.02), ZU - 1.2, ZU - 0.2));
    /* platforms on the mast flanks, each carrying an EW box               */
    [Z0 + 19.5, Z0 + 21.9].forEach(function (zp, k) {
      for (var sd = -1; sd <= 1; sd += 2) {
        var yy = -13.5 + sd * (2.0 - k * 0.3);
        yy = -13.5 + sd * (2.6 - k * 0.4);
        B.S.add(plate(THREE, rect(5.0, 11.0, yy - 1.2, yy + 1.2), zp - 0.25, zp));
        B.R.add(box(THREE, 1.2, 0.8, 1.3, 8.0, yy + sd * 0.4, zp + 0.65));
        ringRail(rect(5.0, 11.0, yy - 1.2, yy + 1.2), zp + 1.0);
      }
    });
    /* the yard, the platform at the head, the H/LJQ-382 array, the pole  */
    B.S.add(plate(THREE, rect(5.0, 10.8, -15.6, -11.4), ZU, ZU + 0.3));
    B.S.add(box(THREE, 0.55, 17.0, 0.45, 7.2, -13.5, ZU + 0.2));
    for (s = -1; s <= 1; s += 2) {
      B.M.add(strut(THREE, 7.2, -13.5 + s * 1.4, ZU - 3.0, 7.2, -13.5 + s * 6.4, ZU, 0.12, 4));
      B.M.add(strut(THREE, 7.2, -13.5 + s * 8.2, ZU + 0.4, 7.2, -13.5 + s * 8.2, ZU + 2.8, 0.05, 4));
      B.W.add(sphere(THREE, 0.45, 8, 5, 7.6, -13.5 + s * 5.0, ZU + 0.9));
    }
    var RX = 7.8, RY = -13.5, RZ = ZU + 0.3;
    B.S.add(cylZ(THREE, 0.75, 0.9, 1.3, 10, RX, RY, RZ));
    B.S.add(box(THREE, 1.4, 1.6, 0.9, RX - 0.2, RY, RZ + 1.6));
    var arr = new THREE.BoxGeometry(0.55, 4.8, 3.2);
    arr.rotateY(-0.26); arr.translate(RX + 0.35, RY, RZ + 3.6);
    B.S.add(arr);
    var face = new THREE.BoxGeometry(0.06, 4.4, 2.85);
    face.rotateY(-0.26); face.translate(RX + 0.66, RY, RZ + 3.52);
    B.R.add(face);
    B.S.add(box(THREE, 0.35, 4.0, 0.4, RX - 0.1, RY, RZ + 5.55));
    B.M.add(strut(THREE, 5.1, -13.5, ZU + 0.3, 5.1, -13.5, Z0 + 36.0, 0.17, 5, 0.05));
    B.W.add(sphere(THREE, 0.4, 8, 5, 5.1, -13.5, Z0 + 31.8));

    /* the bridge: juts forward of the tower and out both sides, its glass
       raked out at the head, a visor over it, a roof deck with a dome     */
    var BR = [[13.0, -18.8], [21.2, -18.8], [22.8, -16.9], [22.8, -10.1], [21.2, -8.2], [13.0, -8.2]];
    var Zb0 = Z0 + 9.8, Zb1 = Z0 + 11.2, Zb2 = Z0+ 12.7, Zb3 = Z0 + 14.3;
    B.S.add(prism2(THREE, scalePts(BR, 0.96), BR, Zb0 - 0.9, Zb1));
    B.G.add(frustum(THREE, BR, Zb1, Zb2, 0.985, 1.03));
    B.S.add(plate(THREE, scalePts(BR, 1.05), Zb2, Zb2 + 0.3));
    var BU = [[14.0, -17.5], [20.6, -17.5], [20.6, -9.5], [14.0, -9.5]];
    B.S.add(plate(THREE, BU, Zb2 + 0.3, Zb3));
    B.G.add(facePatch(THREE, BU, BU, Zb2 + 0.3, Zb3, 1, 0.1, 0.9, Zb2 + 0.7, Zb3 - 0.4, 0.05));
    ringRail(scalePts(BR, 1.04), Zb2 + 1.3);
    /* window posts round the glazing                                        */
    for (j = 0; j < BR.length; j++) {
      var b0 = BR[j], b1 = BR[(j + 1) % BR.length], nseg = Math.max(1, Math.round(Math.hypot(b1[0] - b0[0], b1[1] - b0[1]) / 1.8));
      for (var mq = 0; mq < nseg; mq++) {
        var fq = mq / nseg, qx = lerp(b0[0], b1[0], fq), qy = lerp(b0[1], b1[1], fq);
        var cxq = 17.9, cyq = -13.5;
        B.S.add(strut(THREE, cxq + (qx - cxq) * 0.99, cyq + (qy - cyq) * 0.99, Zb1, cxq + (qx - cxq) * 1.035, cyq + (qy - cyq) * 1.035, Zb2, 0.09, 4));
      }
    }
    B.W.add(sphere(THREE, 0.95, 10, 6, 18.0, -13.6, Zb3 + 0.9));
    B.S.add(cylZ(THREE, 0.3, 0.4, 0.9, 6, 14.6, -15.6, Zb3));
    B.W.add(sphere(THREE, 0.8, 10, 6, 14.6, -15.6, Zb3 + 1.6));
    B.S.add(cylZ(THREE, 0.3, 0.4, 0.9, 6, 18.0, -13.6, Zb3));
    for (s = -1; s <= 1; s += 2) B.M.add(strut(THREE, 15.4, -13.6 + s * 3.0, Zb3, 15.4, -13.6 + s * 3.0, Zb3 + 3.4, 0.06, 4, 0.03));
    /* bridge wing balconies below on the tower's starboard face            */
    B.S.add(plate(THREE, rect(9.0, 14.0, -19.0, YO), Z0 + 7.6, Z0 + 7.9));
    polyRail([[9.0, YO], [9.0, -19.0], [14.0, -19.0], [14.0, YO]], Z0 + 8.9);

    /* under the bridge a block runs down to the base, its face sloping
       forward to the HHQ-10's platform (the Anhui broadside's diagonal)    */
    B.S.add(prism2(THREE, rect(10.0, 26.0, YO + 0.2, -9.6), rect(10.0, 22.4, YO + 0.4, -9.8), ZB, Zb0 - 0.9));
    B.K.add(facePatch(THREE, rect(10.0, 26.0, YO + 0.2, -9.6), rect(10.0, 22.4, YO + 0.4, -9.8), ZB, Zb0 - 0.9, 0, 0.55, 0.6, ZB, ZB + 2.1, 0.04));
    /* the forward end: the HHQ-10 on its raised platform                   */
    B.S.add(plate(THREE, rect(26.0, 29.3, -16.4, -10.4), ZB, ZB + 0.7));
    emit(hhq10Parts(THREE), 27.7, -13.4, ZB + 0.7, -0.15);
    polyRail([[26.0, -16.6], [29.3, -16.6], [29.3, -10.2], [26.0, -10.2]], ZB + 1.7);

    /* the deck-edge crane: post at the island's forward end, boom forward
       on to the A-frame rest standing on the deck edge, a strut under it   */
    var CY = -15.8, CZ = Z0 + 6.2;
    B.S.add(cylZ(THREE, 0.9, 1.1, CZ - Z0 - 0.8, 10, 31.0, CY, Z0));
    B.S.add(box(THREE, 2.2, 1.9, 1.5, 31.0, CY, CZ - 0.2));
    B.S.add(prism2(THREE, rect(31.5, 40.8, CY - 0.5, CY + 0.5), rect(31.5, 40.8, CY - 0.4, CY + 0.4), CZ - 0.5, CZ + 0.4));
    B.S.add(strut(THREE, 40.4, CY - 1.4, Z0, 40.4, CY, CZ - 0.5, 0.22, 5));
    B.S.add(strut(THREE, 40.4, CY + 1.4, Z0, 40.4, CY, CZ - 0.5, 0.22, 5));
    B.S.add(strut(THREE, 35.0, CY, CZ - 0.5, 39.6, CY, Z0 + 0.6, 0.2, 5));
    B.K.add(cylZ(THREE, 0.45, 0.45, 0.8, 8, 40.9, CY, CZ + 0.4));
    B.M.add(box(THREE, 0.4, 0.4, 0.7, 41.0, CY, CZ - 1.0));

    /* ------------------------------------------------- team identification:
       a flash across the bow, where her number would be                    */
    B.T.add(box(THREE, 2.2, 14.0, 0.14, XB - 3.0, 0.0, FD_TOP + 0.07));

    /* ------------------------------------------------ out as one mesh each */
    Object.keys(B).forEach(function (k) {
      var mm = B[k].mesh(THREE, T[k]);
      if (mm) root.add(mm);
    });
    root.userData.heroLen = LOA;
    return root;
  }

  return { build: build, len: LOA, underVolume: underVolume };
})();

/* Registration: lhd_c. len is the measured X extent, deck front to the
   stern platforms.                                                         */
UNIT_MODELS["lhd_c"] = {
  len: 232,
  build: function (THREE, M, C) { return HeroType075LHD.build(THREE, M, C); }
};
