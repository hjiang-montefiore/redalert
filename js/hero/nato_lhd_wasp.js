/* ============================================================================
   nato_lhd_wasp.js -- HERO model: USS Wasp (LHD-1) and the Wasp class.
   Registered as nato_e90_lhd (as commissioned in 1989: two Mk 29 Sea
   Sparrow launchers and three Phalanx) and nato_e00_lhd (the same ship in
   the 2000s: two RAM launchers added, and the big radome on the port
   quarter that the 2005 photographs show). One build(), one flag.

   References, named so the next person can check them (Wikimedia Commons
   unless noted):
     - "Wasp class amphibious assault ship line drawing 1995.png": a
       starboard profile, bow to the right, 919 px of flight deck. THE
       scale drawing. Read at 3.646 px/m on the 257 m overall length: the
       deck line, the stem, the stern overhang, every island tier and both
       masts, the hull openings and the knuckle line.
     - "Aerial view of USS Kearsarge (LHD-3) ... Northern Viking 2022": a
       near-overhead, bow to the LEFT, island at the top. Plan of the deck,
       both lifts, the island's place and width, the deck markings. It is
       taken from a little to port (the island's port face shows, ~22
       degrees), so widths were divided by cos 22.
     - "A starboard amidships view of the amphibious assault ship USS WASP
       (LHD 1) underway with crew members manning the rails" (DPLA, early
       1990s): the island as built - the black-capped stack, the two dark
       pole masts, the SPS-48 on the forward one, the after mast's radars,
       the white dome at the island's after end, the Phalanx on the island's
       forward step, the lattice tower, the boat bay and side port.
     - "USS Essex (LHD-2) - Port Bow view.jpg": the bow - a narrow raked
       stem flaring hard into a deep, square flight-deck lip, the stem and
       port anchors, the gallery band of life-raft canisters.
     - the Essex 2005 port broadside (US Navy) and "USS Wasp (LHD-1) in
       Sunndalsfjord 1995.JPEG": the port lift at deck level with the hangar
       opening and truss under it; the port-quarter radome (2005, not 1995).
     - "USS Wasp (LHD-1).jpg" (port quarter, alongside): the stern - wide
       chamfered quarters, the well opening, the stern gate closed across
       its lower part with the lit well deck showing above it.
     - "US Navy 100220-N-1524B-057 ... Makin Island (LHD 8) launches a NATO
       Sea Sparrow missile from the forward NATO mount": the forward Mk 29
       on a platform below the flight deck, starboard side, life rafts in
       racks along the deck edge.
     - en.wikipedia "Wasp-class amphibious assault ship": 257 m overall,
       31.8 m waterline beam, 8.1 m draught, well deck 81 x 15.2 m and
       8.5 m high, two deck-edge lifts, sensors SPS-48, SPS-49, SPS-67,
       SPN-43, SPN-35, URN-25; two Mk 29, two RAM, three Phalanx.

   RECOGNITION LIST (each must show at game zoom):
     1. one long flush flight deck, square at the bow and chamfered at the
        stern corners, 251 m of it, with a lower railed stern gallery 6 m
        further aft (line drawing x 8-27 px; the aerial's strip aft of the
        deck);
     2. a deep square deck lip at the bow over a narrow, convex, raked stem
        that meets the water 10 m aft of the deck's forward edge (line
        drawing rows 146-210; Essex port bow);
     3. slab hull sides to the hangar-deck knuckle, then a modest flare to
        the gallery band under the deck edge; the knuckle line runs down
        from the bow lip to 11 m (line drawing; Essex port bow);
     4. the island on the starboard edge from x +38 to -47.5: a low forward
        deckhouse, the forward step with its Phalanx, the bridge, the
        black-capped stack between two dark pole masts, a low after
        deckhouse with the big white dome (line drawing; DPLA; aerial);
     5. the forward mast carrying the SPS-48 planar array forward of it;
        the after mast taller, with the SPN-43 dish, the Mk 23 TAS and the
        SPS-67 on its platforms (DPLA; line drawing; Essex port bow);
     6. two deck-edge lifts OUTBOARD of the deck: port abreast the island's
        after end, starboard abaft the island, each over a dark hangar
        opening on a truss (aerial; Essex broadside);
     7. the stern: wide chamfered quarters, the well opening 15.2 m wide,
        the stern gate across its lower 5.6 m - openable - and the dark
        well deck behind (USS Wasp (LHD-1).jpg);
     8. the gallery band and catwalk all round under the deck edge, racked
        white life-raft canisters along it (Essex port bow; Makin Island);
     9. sponson weapons below the deck edge: Mk 29 starboard forward of the
        island; Phalanx on the island's forward step (Makin Island; DPLA;
        line drawing);
    10. hull openings: the starboard boat bay and side port, the port boat
        and window row (DPLA; line drawing; Essex broadside);
    11. deck markings: the yellow line 9 m to port of the centreline, six
        spot crossbars and lineup lines, the white dash line, the lift
        borders, the yellow band across the bow (aerial).

   STATION TABLE. Half-breadths in metres, measured from the drawing and the
   aerial and fitted to the 31.8 m waterline beam. Each level runs full from
   the transom chamfer to xb0, then fines to its stem:
        z      yMid  xb0   stem       z      yMid  xb0   stem
      -8.1     9.0  -10    96.0      5.0    16.0   45   119.8
      -7.0    12.6   -5   107.0     11.0    16.2   60   123.5  (knuckle)
      -4.0    15.0    5   114.5     15.0    16.7   88   126.6
       0.0    15.9   10   118.3     18.9    17.4  100   128.4  (gallery dk)
   Keel flat from x -52 to +96, rising aft to z -1.0 at the transom and
   forward into the stem. The underwater body was trimmed until it
   measured 39,900 m3 by signed volume: 40,900 t against the published
   41,150 t full load (block coefficient about 0.66). The transom rakes from x -121.0 at the keel to
   -124.5 at z 13 and is chamfered to a 12 m half-breadth over its last
   8 m (the stern photograph's angled quarters). Deck plan: x -122.5 to
   +128.5, 40.0 m across the plate (42.8 m over the catwalks), stern corners
   cut 4.5-5 m, bow corners 2.4 m. Lifts 15.5 m x 10.5 m: port x -55.0 to
   -39.5, starboard x -96.5 to -81.0. Island outboard face y -20.4,
   inboard -7.0.

   NOT confirmed, and so drawn approximate or left out:
     - the stations of the after Mk 29 (port quarter), the second and third
       Phalanx (port bow, starboard quarter) and both RAM launchers
       (starboard bow, port quarter): no reference I found shows them;
     - the identities of the after mast's three antennas (read as SPN-43,
       Mk 23 TAS and SPS-67 from their shapes) and of the white dome at the
       island's after end (taken as the SPN-35's radome); the two Mk 91
       directors' exact spots;
     - the SPS-49, listed by Wikipedia, is on no photograph of the 1990s
       ship that I could read, so it is not drawn;
     - the purpose of the port-quarter radome (2000s row only);
     - the flight deck plate width: the aerial gives 40 +- 1.5 m; 42.7 m
       is the width over the catwalks here;
     - the 25 mm Mk 38 and .50 cal mounts are not drawn.

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0, keel
   z = -8.1, flight deck z = 20.3. X extent 257.0 m: the stern gallery at
   -128.5 to the bow lip at +128.5. Nothing stands on the flight deck but
   the island. No hull number, name or ensign is drawn. Every static part
   is merged into one mesh per material; the island Phalanx ("ciws") and
   the "wellgate" have their own small mesh sets. Nothing is named
   "turret": the rows have no trained mount. The team
   colour is exactly C.team: a band round the island and a flash across
   each end of the deck.

   ASCII only -- a stray byte in a hex literal has broken this project.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroWaspLHD = (function () {
  "use strict";

  var PI = Math.PI;

  /* ---------------------------------------------------- principal dimensions */
  var LOA    = 257.0;              /* stern gallery to bow lip: x -128.5..128.5 */
  var FD_TOP = 20.3;               /* flight deck above the waterline (drawing) */
  var FD_TH  = 1.4;                /* deck plate and its girders               */
  var FD_BOT = FD_TOP - FD_TH;     /* 18.9: gallery deck, top of the hull loft */
  var KEEL   = -8.1;               /* draught 8.1 m                            */
  var KN     = 11.0;               /* hangar-deck knuckle                      */
  var DHW    = 20.0;               /* flight deck half-width                   */
  var HX0 = -125.0, HX1 = 128.5;   /* texture span along the hull              */
  var XT0 = -121.0;                /* transom at the keel                      */
  var TRW = 12.0;                  /* transom half-width                       */
  var RAKE = Math.atan2(3.5, 14.0);
  /* the transom, raked: x at height z                                      */
  function xT(z) { return XT0 - clamp(z + 1.0, 0, 14.0) / 14.0 * 3.5; }

  /* the flight deck, plan view, counter-clockwise                          */
  var DECK = [
    [ 128.5, -17.6], [ 128.5,  17.6], [ 126.1,  20.0],
    [-117.5,  20.0], [-122.5,  15.0],
    [-122.5, -15.5], [-118.0, -20.0], [ 126.1, -20.0]
  ];
  /* deck-edge lifts outboard of the deck: x range, side, outboard reach    */
  var LIFTS = [
    { x0: -55.0, x1: -39.5, s:  1, w: 10.5 },
    { x0: -96.5, x1: -81.0, s: -1, w: 10.5 }
  ];
  /* the well deck: 81 x 15.2 m, 8.5 m high, floor just above the water     */
  var WELL = { x1: -40.0, hw: 7.6, z0: 0.6, z1: 9.1, zo: 11.0, xs: -108.0, gate: 5.75 };
  /* the yellow line, 9 m to port, and the spot crossbars along it          */
  var CLY = 9.0;
  var SPOTS = [99.2, 62.6, 27.1, -8.0, -59.5, -98.4];

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
  function cylZ(THREE, rt, rb, h, seg, x, y, z0) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, false);
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
    for (i = 0; i < n; i++) { var p = pts[i], q = pts[(i + 1) % n]; a += p[0] * q[1] - q[0] * p[1]; }
    return a < 0 ? pts.slice().reverse() : pts;
  }
  /* a closed frustum on a convex plan, bottom outline at zb, the same outline
     scaled about its centroid at zt; UVs in metres / 16                    */
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
  function plate(THREE, pts, z0, z1) { return frustum(THREE, pts, z0, z1, 1, 1); }
  function rect(x0, x1, y0, y1) { return [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]; }
  function scalePts(pts, s) {
    var cx = 0, cy = 0, i, n = pts.length, out = [];
    for (i = 0; i < n; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    cx /= n; cy /= n;
    for (i = 0; i < n; i++) out.push([cx + (pts[i][0] - cx) * s, cy + (pts[i][1] - cy) * s]);
    return out;
  }
  /* one quad, wound so its face looks toward `look` (a point it is seen
     from): used for the well, which is seen from inside                    */
  function quad(THREE, a, b, c, d, look, uvs) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var mx = look[0] - a[0], my = look[1] - a[1], mz = look[2] - a[2];
    var P = nx * mx + ny * my + nz * mz > 0 ? [a, b, c, a, c, d] : [a, c, b, a, d, c];
    var U = uvs || [[0, 0], [1, 0], [1, 1], [0, 1]];
    var UV = nx * mx + ny * my + nz * mz > 0 ? [U[0], U[1], U[2], U[0], U[2], U[3]] : [U[0], U[2], U[1], U[0], U[3], U[2]];
    var pos = [], uv = [];
    for (var i = 0; i < 6; i++) { pos.push(P[i][0], P[i][1], P[i][2]); uv.push(UV[i][0], UV[i][1]); }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    return g;
  }

  /* ============================================================= textures */
  var PAINT = { hull: 0x747b82, sup: 0x7f878e, deck: 0x585c60 };

  /* topsides and bottom, each its own canvas; row 0 is the top edge, so v
     runs straight from z and the boot topping sits on the waterline       */
  function hullTex(THREE, zTop, zBot, H, seed) {
    var W = 2048, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(seed), i, x, y, z, len, gr;
    var PXZ = H / (zTop - zBot), PXX = W / (HX1 - HX0);
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
    band(0, zBot, "#5c2c28");
    for (i = 0; i < 320; i++) {
      z = zBot + R() * (zTop - zBot);
      var under = z < 0;
      g.globalAlpha = under ? 0.05 + R() * 0.07 : 0.035 + R() * 0.05;
      g.fillStyle = under ? (R() < 0.5 ? "#7a3a31" : "#3c1c19") : (R() < 0.5 ? "#ffffff" : "#000000");
      g.fillRect(R() * W, rowZ(z), 40 + R() * 240, (0.3 + R() * 1.1) * PXZ);
    }
    g.globalAlpha = 1;
    /* boot topping: black from under the waterline to 1.5 m above it      */
    band(1.5, -0.9, "#191b1e");
    /* plate butts and strakes; the knuckle catches the light              */
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.4;
    for (i = 1; i < 64; i++) {
      x = i * W / 64 + (R() - 0.5) * 4;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
    }
    for (i = 1; i < 10; i++) hline(i * 2.0);
    for (i = 1; i < 4; i++) hline(-i * 2.2);
    g.strokeStyle = "rgba(255,255,255,0.18)"; g.lineWidth = 3; hline(KN);
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 2; hline(KN - 0.3);
    /* rust weeping from the scuppers and the hangar-deck drains: these
       ships wear it, the 2005 broadside shows streaks down the whole side  */
    if (zTop > 4) {
      for (i = 0; i < 110; i++) {
        x = R() * W; y = rowZ(3 + R() * 14); len = (2 + R() * 7) * PXZ;
        gr = g.createLinearGradient(0, y, 0, y + len);
        gr.addColorStop(0, "rgba(96,60,40,0.40)");
        gr.addColorStop(1, "rgba(96,60,40,0.0)");
        g.fillStyle = gr; g.fillRect(x, y, 1.5 + R() * 2.5, len);
        g.fillStyle = "rgba(24,22,20,0.36)"; g.fillRect(x - 1, y - 1, 4 + R() * 3, 3);
      }
    }
    /* draught marks fore and aft                                          */
    g.fillStyle = "rgba(236,238,240,0.9)";
    [116.0, -118.0].forEach(function (mx) {
      for (var k = 0; k < 6; k++) {
        var zz = -5 + k * 1.0;
        if (zz > zBot && zz < zTop) g.fillRect((mx - HX0) * PXX, rowZ(zz) - 1, 7, 2);
      }
    });
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }

  /* island and gallery plate                                              */
  function supTex(THREE) {
    var W = 1024, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(1989), i;
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
    /* watertight doors, vents and port lights stay in the paint            */
    g.fillStyle = "rgba(20,22,25,0.45)";
    for (i = 0; i < 22; i++) g.fillRect(R() * W, R() * H, 14 + R() * 8, 30 + R() * 10);
    for (i = 0; i < 40; i++) g.fillRect(R() * W, R() * H, 6, 6);
    for (i = 0; i < 46; i++) {
      var x = R() * W, y = R() * H * 0.8, len = 8 + R() * 30;
      var gr = g.createLinearGradient(0, y, 0, y + len);
      gr.addColorStop(0, "rgba(90,62,44,0.22)");
      gr.addColorStop(1, "rgba(90,62,44,0.0)");
      g.fillStyle = gr; g.fillRect(x, y, 1.4 + R() * 2.2, len);
    }
    return finish(THREE, cv);
  }

  /* ------------------------------------------------------- flight deck
     One plan-view painting of the whole deck, lifts included, sampled
     through the slabs' shape-space UVs (texture repeat and offset turn
     metres into 0..1), so every line sits where the aerial puts it.      */
  var DX0 = -130, DX1 = 130, DY0 = -32, DY1 = 32;
  function deckTex(THREE) {
    var W = 2048, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(1201), i, p, q;
    var SX = W / (DX1 - DX0), SY = H / (DY1 - DY0);
    function cx(x) { return (x - DX0) * SX; }
    function cy(y) { return H - (y - DY0) * SY; }
    function mline(a, b, wm, col, dash) {
      g.save();
      g.strokeStyle = col; g.lineWidth = Math.max(1.0, wm * SY);
      if (dash) g.setLineDash([dash[0] * SX, dash[1] * SX]);
      g.beginPath(); g.moveTo(cx(a[0]), cy(a[1])); g.lineTo(cx(b[0]), cy(b[1])); g.stroke();
      g.restore();
    }
    /* non-skid, scuffed                                                   */
    g.fillStyle = hx(PAINT.deck); g.fillRect(0, 0, W, H);
    for (i = 0; i < 480; i++) {
      g.globalAlpha = 0.04 + R() * 0.06;
      g.fillStyle = R() < 0.5 ? "#8d949a" : "#212529";
      g.fillRect(R() * W, R() * H, 24 + R() * 160, 10 + R() * 46);
    }
    g.globalAlpha = 0.22; g.fillStyle = "#14171a";
    for (i = 0; i < 5000; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    /* tie-down pad-eyes on a 3 m grid, plating seams                       */
    g.fillStyle = "rgba(12,14,16,0.28)";
    for (p = DX0 + 1.5; p < DX1; p += 3.0)
      for (q = DY0 + 1.5; q < DY1; q += 3.0) g.fillRect(cx(p) - 1, cy(q) - 1, 2.0, 2.0);
    g.strokeStyle = "rgba(0,0,0,0.18)"; g.lineWidth = 1.2;
    for (q = DY0 + 2.6; q < DY1; q += 2.6) {
      g.beginPath(); g.moveTo(0, cy(q)); g.lineTo(W, cy(q)); g.stroke();
    }
    /* exhaust and rotor-wash scorch on and around each spot: the aerial's
       dark blotches, heaviest along the yellow line                       */
    g.fillStyle = "#0c0e10";
    for (i = 0; i < 70; i++) {
      var sp = SPOTS[i % SPOTS.length] + (R() - 0.5) * 22, so = CLY + (R() - 0.6) * 18;
      g.globalAlpha = 0.06 + R() * 0.09;
      g.beginPath(); g.ellipse(cx(sp), cy(so), (1.5 + R() * 4.5) * SX, (1.2 + R() * 3.5) * SY, R() * PI, 0, PI * 2); g.fill();
    }
    g.globalAlpha = 1;

    /* the yellow line, 9 m to port of the centreline, bow to stern        */
    mline([-117, CLY], [126.5, CLY], 0.6, "#d6a23a");
    /* the white dash line 4.5 m outboard of it                             */
    mline([-117, CLY + 4.5], [124, CLY + 4.5], 0.35, "#e6eaec", [4.5, 7.3]);
    /* six spots: a crossbar across both lines and its lineup line coming in
       from forward and to starboard, as measured on the aerial            */
    SPOTS.forEach(function (sx) {
      mline([sx, CLY - 5.1], [sx, CLY + 8.6], 0.45, "#e6eaec");
      mline([sx + 7.7, CLY - 4.0], [sx + 0.8, CLY + 3.7], 0.42, "#e6eaec");
    });
    /* the broad yellow band across the bow end                            */
    mline([127.4, -17.4], [127.4, 17.4], 1.0, "#d6a23a");
    /* the deck edge, a white line all round                                */
    g.save();
    g.strokeStyle = "rgba(226,230,232,0.75)"; g.lineWidth = Math.max(1.2, 0.45 * SY);
    g.beginPath(); g.moveTo(cx(DECK[0][0]), cy(DECK[0][1]));
    for (i = 1; i < DECK.length; i++) g.lineTo(cx(DECK[i][0]), cy(DECK[i][1]));
    g.closePath(); g.stroke(); g.restore();
    /* the lifts: yellow edges, a red dashed safety border inside           */
    LIFTS.forEach(function (L) {
      var ya = L.s > 0 ? DHW : -DHW - L.w, yb = L.s > 0 ? DHW + L.w : -DHW;
      g.fillStyle = "rgba(70,74,78,0.35)";
      g.fillRect(cx(L.x0), cy(yb), (L.x1 - L.x0) * SX, (yb - ya) * SY);
      g.save();
      g.strokeStyle = "rgba(170,52,44,0.85)"; g.lineWidth = Math.max(1.2, 0.3 * SY);
      g.setLineDash([1.6 * SX, 1.2 * SX]);
      g.strokeRect(cx(L.x0 + 0.9), cy(yb - 0.9), (L.x1 - L.x0 - 1.8) * SX, (yb - ya - 1.8) * SY);
      g.restore();
      mline([L.x0 + 0.2, ya], [L.x0 + 0.2, yb], 0.4, "#d6a23a");
      mline([L.x1 - 0.2, ya], [L.x1 - 0.2, yb], 0.4, "#d6a23a");
      var yo = L.s > 0 ? yb - 0.2 : ya + 0.2;
      mline([L.x0, yo], [L.x1, yo], 0.4, "#d6a23a");
      mline([L.x0, L.s > 0 ? ya : yb], [L.x1, L.s > 0 ? ya : yb], 0.25, "#101214");
    });
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.repeat.set(1 / (DX1 - DX0), 1 / (DY1 - DY0));
    t.offset.set(-DX0 / (DX1 - DX0), -DY0 / (DY1 - DY0));
    return t;
  }

  /* painted once per page and shared by every build                       */
  var _tex = null;
  function textures(THREE) {
    if (_tex) return _tex;
    _tex = {
      top:  hullTex(THREE, FD_BOT, 0, 256, 19891),
      bot:  hullTex(THREE, 0, KEEL, 128, 19892),
      sup:  supTex(THREE),
      deck: deckTex(THREE)
    };
    return _tex;
  }

  /* ================================================================= hull
     Lofted from the station table in the header. Each level is full from
     the transom chamfer to xb0, then fines to its own stem by
     (1 - t^p)^q; near the stem a V (wedge) takes over, opening with height,
     which is the flare the bow photograph shows from the narrow stem up to
     the square deck lip. Aft, every level is cut to the 12 m transom
     half-breadth over its last 8 m - the angled quarters.                */
  var LEV = [
    /*  z       yMid  xb0  stemX   p    q    */
    [ -8.1,     9.0, -10,  96.0, 1.5, 0.95 ],
    [ -7.0,    12.6,  -5, 107.0, 1.6, 0.90 ],
    [ -4.0,    15.0,   5, 114.5, 1.7, 0.85 ],
    [  0.0,    15.9,  10, 118.3, 1.8, 0.78 ],
    [  5.0,    16.0,  45, 119.8, 2.2, 0.55 ],
    [  KN,     16.2,  60, 123.5, 2.4, 0.50 ],
    [ 15.0,    16.7,  88, 126.6, 2.8, 0.33 ],
    [ FD_BOT,  17.4, 100, 128.4, 3.0, 0.25 ]
  ];
  /* keel height along the length: rising aft to the transom's lower edge,
     forward into the forefoot; past it the stem is the section's foot      */
  var KEELZ = [
    [-121.0, -1.0], [-112, -2.0], [-100, -3.8], [-86, -5.8], [-70, -7.3], [-52, KEEL],
    [96, KEEL], [102, -7.6], [107, -6.6], [111, -5.2], [114.5, -3.4],
    [116.8, -1.6], [118.3, 0.0], [119.8, 5.0], [123.5, KN], [126.6, 15.0],
    [128.4, FD_BOT]
  ];
  /* the stem keyed by height (line drawing rows 146-210, then the forefoot) */
  var STEM = [[-8.1, 96.0], [-6.6, 107.0], [-5.2, 111.0], [-3.4, 114.5], [-1.6, 116.8],
              [0, 118.3], [3.0, 118.9], [6.3, 120.3], [9.6, 121.9], [12.9, 124.6],
              [15.1, 126.6], [16.2, 127.4], [FD_BOT, 128.4]];
  function wedge(x, z) {
    var k = z < 0 ? 0.32 : z < KN ? lerp(0.36, 0.62, z / KN) : lerp(0.62, 3.0, Math.pow((z - KN) / (FD_BOT - KN), 1.6));
    return k * Math.max(0, tbl(STEM, z) - x);
  }
  function lowY(k, x) {
    var L = LEV[k], y = L[1], z = L[0];
    if (x > L[2]) {
      var t = clamp((x - L[2]) / (L[3] - L[2]), 0, 1);
      y *= Math.pow(Math.max(0, 1 - Math.pow(t, L[4])), L[5]);
    }
    y = Math.min(y, wedge(x, z));
    /* the angled quarters                                                 */
    var xt = xT(z), d = x - xt;
    if (d < 8.0) y = Math.min(y, lerp(TRW, L[1], clamp(d / 8.0, 0, 1)));
    return y;
  }
  /* one side's outline at station x, keel up to the gallery deck, [y, z]  */
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
  /* the well opening in the transom, as (y, z): a rectangle with its top
     corners cut, the arch the stern photograph shows                     */
  var HOLE = [[-WELL.hw, WELL.z0], [WELL.hw, WELL.z0], [WELL.hw, WELL.zo - 2.2],
              [WELL.hw - 2.2, WELL.zo], [-WELL.hw + 2.2, WELL.zo], [-WELL.hw, WELL.zo - 2.2]];

  function hullGeo(THREE) {
    var xs = [XT0, -119.0, -117.0, -115.0, -113.0, -110.0, -106.0, -100.0, -92.0, -84.0, -76.0];
    var i, j, x;
    for (x = -66; x < 90; x += 12) xs.push(x);
    [90, 96, 101, 105, 108.5, 111.5, 114.0, 116.0, 117.6, 118.9, 120.2, 121.6,
     123.0, 124.4, 125.6, 126.6, 127.5, 128.4].forEach(function (v) { xs.push(v); });
    var rings = [], rx = [];
    for (i = 0; i < xs.length; i++) {
      var S = sideRing(xs[i]), r = [], xr = [];
      r.push([0, FD_BOT]);
      for (j = S.length - 1; j >= 0; j--) r.push([S[j][0], S[j][1]]);
      r.push([0, tbl(KEELZ, xs[i])]);
      for (j = 0; j < S.length; j++) r.push([-S[j][0], S[j][1]]);
      /* the first ring IS the transom: every point moved aft onto the rake */
      for (j = 0; j < r.length; j++) xr.push(i === 0 ? xT(r[j][1]) : xs[i]);
      rings.push(r); rx.push(xr);
    }
    var nR = rings[0].length;
    var OUT = { top: { pos: [], nrm: [], uv: [], z0: 0, z1: FD_BOT }, bot: { pos: [], nrm: [], uv: [], z0: KEEL, z1: 0 } };
    function V(ii, jj) { var q = rings[ii][jj % nR]; return [rx[ii][jj % nR], q[0], q[1]]; }
    var faces = [];
    /* each face wound outward by testing it against a point inside its own
       station, so the loft needs no winding bookkeeping                   */
    function tri(a, b, c, ka, kb, kc, ref) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var ar = nx * nx + ny * ny + nz * nz;
      if (ar < 4e-6) return;
      var mx = (a[0] + b[0] + c[0]) / 3 - ref[0], my = (a[1] + b[1] + c[1]) / 3 - ref[1], mz = (a[2] + b[2] + c[2]) / 3 - ref[2];
      if (nx * mx + ny * my + nz * mz < 0) { var t = b; b = c; c = t; var tk = kb; kb = kc; kc = tk; nx = -nx; ny = -ny; nz = -nz; }
      ar = Math.sqrt(ar);
      faces.push({ p: [a, b, c], k: [ka, kb, kc], n: [nx, ny, nz], u: [nx / ar, ny / ar, nz / ar] });
    }
    function K(ii, jj) { return ii * nR + (jj % nR); }
    for (i = 0; i < xs.length - 1; i++) {
      var ref = [xs[i] + 0.5 * (xs[i + 1] - xs[i]), 0, (FD_BOT + tbl(KEELZ, xs[i + 1])) * 0.5];
      if (xs[i + 1] > 116) ref = [xs[i], 0, Math.max(tbl(KEELZ, xs[i]) + 0.2, (FD_BOT + tbl(KEELZ, xs[i])) * 0.5)];
      for (j = 0; j < nR; j++) {
        tri(V(i, j), V(i + 1, j), V(i, j + 1), K(i, j), K(i + 1, j), K(i, j + 1), ref);
        tri(V(i, j + 1), V(i + 1, j), V(i + 1, j + 1), K(i, j + 1), K(i + 1, j), K(i + 1, j + 1), ref);
      }
    }
    /* the transom: the first ring's outline with the well opening cut out
       of it, triangulated flat in (y, z) and laid back on the rake        */
    var ts = new THREE.Shape(), hp = new THREE.Path(), r0 = rings[0];
    ts.moveTo(r0[0][0], r0[0][1]);
    var tpts = [];
    for (j = 0; j < nR; j++) tpts.push(new THREE.Vector2(r0[j][0], r0[j][1]));
    /* dedupe points the folded levels stack on the keel                    */
    var clean = [];
    tpts.forEach(function (p) {
      var l = clean[clean.length - 1];
      if (!l || Math.abs(l.x - p.x) > 1e-3 || Math.abs(l.y - p.y) > 1e-3) clean.push(p);
    });
    ts = new THREE.Shape(clean);
    hp.moveTo(HOLE[0][0], HOLE[0][1]);
    for (j = 1; j < HOLE.length; j++) hp.lineTo(HOLE[j][0], HOLE[j][1]);
    hp.closePath();
    ts.holes.push(hp);
    var tg = new THREE.ShapeGeometry(ts).toNonIndexed(), TP = tg.getAttribute("position");
    for (j = 0; j < TP.count; j += 3) {
      var tv = [];
      for (var c3 = 0; c3 < 3; c3++) {
        var yy = TP.getX(j + c3), zz = TP.getY(j + c3);
        tv.push([xT(zz), yy, zz]);
      }
      tri(tv[0], tv[1], tv[2], -1 - j, -2 - j, -3 - j, [-100, 0, 8]);
    }
    var around = {}, COS = Math.cos(34 * PI / 180);
    faces.forEach(function (f, fi) {
      f.k.forEach(function (k) { (around[k] || (around[k] = [])).push(fi); });
    });
    faces.forEach(function (f) {
      var o = (f.p[0][2] + f.p[1][2] + f.p[2][2]) / 3 >= 0 ? OUT.top : OUT.bot;
      for (var c = 0; c < 3; c++) {
        var q = f.p[c], sx = 0, sy = 0, sz = 0;
        (around[f.k[c]] || []).forEach(function (gi) {
          var g2 = faces[gi];
          if (g2.u[0] * f.u[0] + g2.u[1] * f.u[1] + g2.u[2] * f.u[2] < COS) return;
          sx += g2.n[0]; sy += g2.n[1]; sz += g2.n[2];
        });
        var l = Math.sqrt(sx * sx + sy * sy + sz * sz);
        if (!l) { sx = f.n[0]; sy = f.n[1]; sz = f.n[2]; l = Math.sqrt(sx * sx + sy * sy + sz * sz) || 1; }
        o.pos.push(q[0], q[1], q[2]);
        o.nrm.push(sx / l, sy / l, sz / l);
        o.uv.push(clamp((q[0] - HX0) / (HX1 - HX0), 0, 1), clamp((q[2] - o.z0) / (o.z1 - o.z0), 0, 1));
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
  /* the hull's half-breadth at x and z, for parts set against its side    */
  function hullY(x, z) {
    var R = sideRing(x), k;
    for (k = 1; k < R.length; k++) {
      if (z <= R[k][1]) return lerp(R[k - 1][0], R[k][0], clamp((z - R[k - 1][1]) / Math.max(1e-6, R[k][1] - R[k - 1][1]), 0, 1));
    }
    return R[R.length - 1][0];
  }

  /* ========================================================== weapons
     Built in their own frame, gun or launcher along +X, ring centre at the
     origin, then dropped into the batches at a heading.                   */
  function phalanxParts(THREE) {
    return [
      ["S", cylZ(THREE, 0.95, 1.05, 0.8, 10, 0, 0, 0)],
      ["W", box(THREE, 1.7, 1.5, 1.1, -0.15, 0, 1.35)],
      ["W", cylZ(THREE, 0.72, 0.72, 1.55, 10, -0.35, 0, 1.9)],
      ["W", sphere(THREE, 0.72, 10, 3, -0.35, 0, 3.45, 1, 1, 1, true)],
      ["M", place(THREE, new THREE.CylinderGeometry(0.2, 0.24, 2.3, 8).rotateZ(-PI / 2), 1.65, 0, 1.3)],
      ["M", box(THREE, 0.5, 0.36, 0.36, 0.55, 0.72, 1.55)]
    ];
  }
  /* Mk 29: the eight-cell box launcher on its pedestal                    */
  function mk29Parts(THREE) {
    return [
      ["S", cylZ(THREE, 1.1, 1.3, 1.0, 10, 0, 0, 0)],
      ["S", box(THREE, 0.8, 3.2, 1.3, 0, 0, 1.6)],
      ["S", box(THREE, 4.0, 1.25, 1.7, 0.2, 0.75, 2.75, 0, -0.30, 0)],
      ["S", box(THREE, 4.0, 1.25, 1.7, 0.2, -0.75, 2.75, 0, -0.30, 0)],
      ["K", box(THREE, 0.12, 2.6, 1.4, 2.1, 0, 3.42, 0, -0.30, 0)]
    ];
  }
  /* Mk 49: the 21-round RAM box on its mount                              */
  function ramParts(THREE) {
    return [
      ["S", cylZ(THREE, 0.85, 1.0, 0.9, 10, 0, 0, 0)],
      ["S", box(THREE, 1.4, 2.4, 1.0, 0, 0, 1.4)],
      ["W", box(THREE, 2.6, 1.7, 1.7, 0.4, 0, 2.5, 0, -0.18, 0)],
      ["K", box(THREE, 0.1, 1.45, 1.45, 1.72, 0, 2.74, 0, -0.18, 0)],
      ["S", box(THREE, 0.9, 0.35, 0.9, -0.6, 1.05, 2.2)],
      ["S", box(THREE, 0.9, 0.35, 0.9, -0.6, -1.05, 2.2)]
    ];
  }
  /* Mk 91 director: pedestal, body and its two small dishes               */
  function mk91Parts(THREE) {
    return [
      ["S", cylZ(THREE, 0.5, 0.6, 1.1, 8, 0, 0, 0)],
      ["W", box(THREE, 1.1, 1.0, 0.9, 0, 0, 1.55)],
      ["R", place(THREE, new THREE.CylinderGeometry(0.55, 0.55, 0.25, 10).rotateZ(PI / 2), 0.65, 0.3, 1.65)],
      ["R", place(THREE, new THREE.CylinderGeometry(0.32, 0.32, 0.25, 8).rotateZ(PI / 2), 0.65, -0.4, 1.75)]
    ];
  }

  /* ================================================================ build */
  function build(THREE, M, C, later) {
    var root = new THREE.Group();
    var i, j, s, k;

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
    /* the team colour, exactly C.team, pulled a couple of depth steps
       toward the camera as on the Ford: it lies within centimetres of the
       deck and the island plate                                           */
    T.T = new THREE.MeshStandardMaterial({ color: new THREE.Color(C && C.team !== undefined ? C.team : 0x4b8fe0),
                                           roughness: 0.60, metalness: 0.10,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    var B = {};
    Object.keys(T).forEach(function (kk) { B[kk] = new Batch(); });
    function emit(parts, x, y, z, hdg) {
      parts.forEach(function (pp) {
        place(THREE, pp[1], 0, 0, 0, 0, 0, hdg || 0);
        pp[1].translate(x, y, z);
        B[pp[0]].add(pp[1]);
      });
    }
    /* a hand rail along a straight run: a top bar, a knee bar, posts      */
    function rail(x0, y0, x1, y1, z, h, posts) {
      var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy), a = Math.atan2(dy, dx);
      B.M.add(box(THREE, L, 0.08, 0.08, (x0 + x1) / 2, (y0 + y1) / 2, z + h, 0, 0, a));
      B.M.add(box(THREE, L, 0.05, 0.05, (x0 + x1) / 2, (y0 + y1) / 2, z + h * 0.5, 0, 0, a));
      if (posts === false) return;
      var n = Math.max(1, Math.round(L / 4));
      for (var q = 0; q <= n; q++) B.M.add(box(THREE, 0.07, 0.07, h, x0 + dx * q / n, y0 + dy * q / n, z + h * 0.5));
    }
    function ringRail(pts, z, h) {
      for (var q = 0; q < pts.length; q++) {
        var p0 = pts[q], p1 = pts[(q + 1) % pts.length];
        rail(p0[0], p0[1], p1[0], p1[1], z, h || 1.0, false);
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

    /* the bow lip: the deck's forward end is a deep square box, its face
       leaning a little, that the narrow stem flares up into               */
    var lip = [[128.5, -17.6], [128.5, 17.6], [126.1, 20.0], [100.0, 20.0], [100.0, -20.0], [126.1, -20.0]];
    B.S.add(frustum(THREE, lip, FD_TOP - 4.3, FD_BOT, 0.975, 1.0));
    /* scuttles in its face, the row the bow photograph shows              */
    for (i = -3; i <= 3; i++) B.K.add(cylZ(THREE, 0.32, 0.32, 0.1, 8, 0, 0, 0).rotateY(PI / 2).translate(128.45, i * 4.6, FD_TOP - 2.6));

    /* gallery band under the deck edge: the deck overhangs the hull by
       2.6 m and the gallery deck under it reads as one deep band in every
       broadside; not under the lifts, where the hangar opens             */
    function band(x0, x1, side) {
      var yi = side * (hullY((x0 + x1) / 2, FD_BOT) - 0.4), yo = side * (DHW - 0.1);
      B.S.add(plate(THREE, rect(x0, x1, Math.min(yi, yo), Math.max(yi, yo)), FD_BOT - 2.1, FD_BOT + 0.01));
    }
    function bandRun(x0, x1, side) {
      var cuts = [x0];
      LIFTS.forEach(function (L) { if (L.s === side && L.x1 > x0 && L.x0 < x1) { cuts.push(L.x0, L.x1); } });
      cuts.push(x1);
      for (var q = 0; q + 1 < cuts.length; q += 2) {
        var a = cuts[q], b = cuts[q + 1];
        for (var x = a; x < b - 0.5; x += 12) band(x, Math.min(b, x + 12), side);
      }
    }
    bandRun(-110.0, 100.0, 1);
    bandRun(-110.0, 100.0, -1);

    /* ------------------------------------------------------------- lifts
       Deck-edge lifts at flight-deck level, outboard of the deck edge, each
       over its hangar opening with the support truss under it, a rail
       round the outer edges (aerial; Essex broadside)                     */
    LIFTS.forEach(function (L) {
      var ya = L.s > 0 ? DHW : -DHW - L.w, yb = L.s > 0 ? DHW + L.w : -DHW;
      var ls = new THREE.Shape();
      ls.moveTo(L.x0, ya); ls.lineTo(L.x1, ya); ls.lineTo(L.x1, yb); ls.lineTo(L.x0, yb); ls.closePath();
      var lg = new THREE.ExtrudeGeometry(ls, { depth: 0.9, bevelEnabled: false });
      lg.translate(0, 0, FD_TOP - 0.9);
      Batch.addGroups(lg, [B.D, B.S]);
      var xm = (L.x0 + L.x1) / 2, yo = L.s * (hullY(xm, 15.0) + 0.06);
      /* the hangar opening: dark, a little inside the shell               */
      B.K.add(box(THREE, L.x1 - L.x0 - 0.8, 0.3, FD_BOT - KN - 0.8, xm, yo, (FD_BOT + KN) / 2 - 0.2));
      /* side posts of the opening, and the lift's guide rails               */
      for (j = 0; j < 2; j++) {
        var xp = j ? L.x1 - 0.4 : L.x0 + 0.4;
        B.S.add(box(THREE, 0.8, 1.2, FD_TOP - KN, xp, yo + L.s * 0.5, (FD_TOP + KN) / 2));
        B.M.add(box(THREE, 0.35, 0.35, FD_TOP - KN + 1.0, xp, L.s * (DHW + 0.2), (FD_TOP + KN) / 2 - 0.5));
      }
      /* the truss under the platform: girders out to its outer edge and
         diagonals down to the hull side                                   */
      var yEdge = L.s > 0 ? yb : ya;
      for (j = 0; j < 3; j++) {
        var xg = lerp(L.x0 + 1.2, L.x1 - 1.2, j / 2);
        B.M.add(box(THREE, 0.5, L.w + DHW - Math.abs(yo), 0.7, xg, (yo + yEdge) / 2, FD_TOP - 1.25));
        B.M.add(strut(THREE, xg, yo, FD_TOP - 6.5, xg, yEdge - L.s * 0.6, FD_TOP - 1.5, 0.18, 4));
      }
      B.M.add(box(THREE, L.x1 - L.x0, 0.5, 0.7, xm, yEdge - L.s * 0.4, FD_TOP - 1.25));
      rail(L.x0, yEdge, L.x1, yEdge, FD_TOP, 1.0);
      rail(L.x0, yEdge, L.x0, L.s * DHW, FD_TOP, 1.0);
      rail(L.x1, yEdge, L.x1, L.s * DHW, FD_TOP, 1.0);
    });

    /* ------------------------- catwalks round the deck edge, below it
       The plank 1.5 m under the deck edge reaching 1.4 m out, its outer
       rail, along both long sides; not along the lifts (the lift is the
       edge there), and nothing past either end of the deck.               */
    function inLift(x0, x1, side) {
      for (var q = 0; q < LIFTS.length; q++) {
        var L = LIFTS[q];
        if (L.s === side && x1 > L.x0 - 0.5 && x0 < L.x1 + 0.5) return L;
      }
      return null;
    }
    function catwalk(x0, x1, side) {
      var cuts = [[x0, x1]];
      LIFTS.forEach(function (L) {
        if (L.s !== side) return;
        var nx = [];
        cuts.forEach(function (c) {
          if (L.x1 <= c[0] || L.x0 >= c[1]) { nx.push(c); return; }
          if (L.x0 - 0.3 > c[0]) nx.push([c[0], L.x0 - 0.3]);
          if (L.x1 + 0.3 < c[1]) nx.push([L.x1 + 0.3, c[1]]);
        });
        cuts = nx;
      });
      cuts.forEach(function (c) {
        var L2 = c[1] - c[0], xm = (c[0] + c[1]) / 2;
        B.S.add(box(THREE, L2, 1.4, 0.25, xm, side * (DHW + 0.7), FD_TOP - 1.5));
        B.M.add(box(THREE, L2, 0.08, 0.08, xm, side * (DHW + 1.4), FD_TOP - 0.3));
        B.M.add(box(THREE, L2, 0.06, 0.06, xm, side * (DHW + 1.4), FD_TOP - 0.85));
        var n = Math.max(1, Math.round(L2 / 9));
        for (var q = 0; q <= n; q++) B.M.add(box(THREE, 0.07, 0.07, 1.25, c[0] + L2 * q / n, side * (DHW + 1.4), FD_TOP - 0.9));
      });
    }
    catwalk(-116.0, 124.5, 1);
    catwalk(-116.0, 124.5, -1);
    /* across the stern under the after edge                               */
    B.S.add(box(THREE, 1.2, 28.0, 0.25, -123.2, 0, FD_TOP - 1.5));

    /* life-raft canisters racked along the gallery: the white rows of drums
       under the deck edge in every broadside, three to a cradle            */
    for (s = -1; s <= 1; s += 2) {
      for (var xr = -104; xr < 96; xr += 11) {
        if (inLift(xr - 2.5, xr + 2.5, s)) continue;
        if (s < 0 && xr > 40 && xr < 56) continue;                     /* Mk 29 sponson */
        B.S.add(box(THREE, 4.2, 1.6, 0.15, xr, s * (DHW + 0.7), FD_TOP - 2.75));
        for (var d3 = -1; d3 <= 1; d3++) {
          var can = new THREE.CylinderGeometry(0.48, 0.48, 1.25, 5);
          can.rotateX(PI / 2);
          B.W.add(place(THREE, can, xr + d3 * 1.25, s * (DHW + 0.75), FD_TOP - 2.05, PI / 2, 0, 0));
        }
      }
    }

    /* ------------------------------------------------------------- stern
       The upper stern stands 6 m proud of the flight deck's after edge as a
       railed gallery a deck lower (the line drawing x 8-27 px, the aerial's
       strip aft of the deck); its underside slopes back down to the raked
       transom.                                                            */
    var sg = [[-124.0, -15.0], [-124.0, 15.0], [-128.5, 11.5], [-128.5, -11.5]];
    B.S.add(frustum(THREE, sg, 15.3, FD_BOT, 0.94, 1.0));
    B.S.add(plate(THREE, [[-123.0, -13.0], [-123.0, 13.0], [-124.6, 13.0], [-124.6, -13.0]], 13.6, 15.4));
    B.K.add(box(THREE, 0.15, 18.0, 1.0, -128.45, 0, 17.1));                 /* gallery windows */
    rail(-128.4, -11.4, -128.4, 11.4, FD_BOT, 1.0);
    rail(-128.4, 11.4, -124.1, 14.9, FD_BOT, 1.0);
    rail(-128.4, -11.4, -124.1, -14.9, FD_BOT, 1.0);
    B.S.add(box(THREE, 1.6, 2.4, 1.6, -126.0, 9.0, FD_BOT + 0.8));
    B.S.add(box(THREE, 1.6, 2.4, 1.6, -126.0, -9.0, FD_BOT + 0.8));
    B.M.add(strut(THREE, -127.6, 0, FD_BOT, -127.6, 0, FD_BOT + 4.5, 0.08, 4, 0.04));

    /* the well: floor, walls and deckhead seen from inside, dark, running
       the real 81 m forward from the sill; the transom is open over it and
       the gate closes its lower part                                      */
    var wx0 = xT(WELL.z0), wxo = xT(WELL.zo), wf = WELL.x1, ws = WELL.xs;
    var IN = [-80, 0, (WELL.z0 + WELL.z1) / 2];
    var hw = WELL.hw;
    /* the opening stands 11 m high at the transom; the deckhead slopes down
       from it to the well's own 8.5 m over the first 13 m                  */
    B.R.add(quad(THREE, [wx0 - 0.02, -hw, WELL.z0], [wx0 - 0.02, hw, WELL.z0], [wf, hw, WELL.z0], [wf, -hw, WELL.z0], IN));
    for (s = -1; s <= 1; s += 2) {
      B.K.add(quad(THREE, [wx0, s * hw, WELL.z0], [wxo, s * hw, WELL.zo], [ws, s * hw, WELL.z1], [ws, s * hw, WELL.z0], IN));
      B.K.add(quad(THREE, [ws, s * hw, WELL.z0], [ws, s * hw, WELL.z1], [wf, s * hw, WELL.z1], [wf, s * hw, WELL.z0], IN));
    }
    B.K.add(quad(THREE, [wxo, -hw, WELL.zo], [wxo, hw, WELL.zo], [ws, hw, WELL.z1], [ws, -hw, WELL.z1], IN));
    B.K.add(quad(THREE, [ws, -hw, WELL.z1], [ws, hw, WELL.z1], [wf, hw, WELL.z1], [wf, -hw, WELL.z1], IN));
    B.K.add(quad(THREE, [wf, -hw, WELL.z0], [wf, hw, WELL.z0], [wf, hw, WELL.z1], [wf, -hw, WELL.z1], IN));
    /* the deckhead lights the stern photograph shows, and the sill        */
    for (i = 0; i < 5; i++)
      for (s = -1; s <= 1; s += 2) B.W.add(box(THREE, 1.6, 0.5, 0.12, -100.0 + i * 12.0, s * 3.5, WELL.z1 - 0.08));
    B.M.add(box(THREE, 0.6, 2 * hw, 0.3, wx0 + 0.3, 0, WELL.z0 + 0.1));
    /* the gate's side frames, standing proud of the transom                */
    for (s = -1; s <= 1; s += 2) {
      var fr = new THREE.BoxGeometry(0.7, 0.9, WELL.zo - WELL.z0 - 1.8);
      fr.rotateY(-RAKE);
      fr.translate(xT((WELL.z0 + WELL.zo) / 2) - 0.25, s * (hw + 0.45), (WELL.z0 + WELL.zo) / 2);
      B.S.add(fr);
    }

    /* the stern gate: its own group. The holder is turned half round about
       Z so that the gate's local +X points aft; "wellgate" sits on the
       hinge at the sill with its rotation zero, the plate rising from the
       hinge along the transom's rake. rotation.y +1.45 swings it out and
       down aft to 0.1 rad below horizontal, onto the water.               */
    var gh = new THREE.Group();
    gh.position.set(wx0, 0, WELL.z0);
    gh.rotation.z = PI;
    var wg = new THREE.Group();
    wg.name = "wellgate";
    gh.add(wg);
    var GB = { S: new Batch(), M: new Batch() }, GL = WELL.gate, GW = 2 * hw - 0.3;
    function gpart(Bt, lx, ly, lz, x, y, z) {
      var gg = new THREE.BoxGeometry(lx, ly, lz);
      gg.translate(x, y, z);
      gg.rotateY(RAKE);
      Bt.add(gg);
    }
    gpart(GB.S, 0.5, GW, GL, 0.25, 0, GL / 2);
    /* the outer face: vertical stiffeners over its height, a heavy top and
       foot rail - the ribbed face of the photograph                        */
    for (i = 0; i < 15; i++) gpart(GB.M, 0.3, 0.32, GL - 1.9, 0.62, -6.6 + i * (13.2 / 14), 0.95 + (GL - 1.9) / 2);
    gpart(GB.M, 0.4, GW, 0.7, 0.68, 0, GL - 0.45);
    gpart(GB.M, 0.4, GW, 0.6, 0.68, 0, 0.45);
    gpart(GB.M, 0.3, GW, 0.25, 0.62, 0, GL - 1.35);
    Object.keys(GB).forEach(function (kk) { var mm = GB[kk].mesh(THREE, T[kk]); if (mm) wg.add(mm); });
    root.add(gh);
    root.userData.wellExit = { x: wx0, y: 0, z: WELL.z0 };
    root.userData.wellInner = { x: -80.0, y: 0, z: WELL.z0 };

    /* ------------------------------------------------------ bow fittings */
    /* the stem anchor and the port bow anchor, each in its hawse          */
    B.K.add(sphere(THREE, 0.9, 8, 5, tbl(STEM, 7.0) + 0.1, 0, 7.0, 0.5, 1, 1));
    B.M.add(box(THREE, 0.6, 1.6, 2.4, tbl(STEM, 7.0) + 0.25, 0, 5.8));
    for (s = -1; s <= 1; s += 2) {
      var ya = hullY(112.0, 12.5);
      B.K.add(place(THREE, new THREE.CylinderGeometry(1.0, 1.0, 0.3, 10), 112.0, s * (ya + 0.12), 12.5));
      B.M.add(box(THREE, 2.2, 0.5, 2.6, 111.6, s * (ya + 0.3), 11.0));
    }
    /* bilge keels, twin screws, shafts, struts, two rudders               */
    for (s = -1; s <= 1; s += 2) {
      B.U.add(box(THREE, 90.0, 0.35, 1.4, -5.0, s * (hullY(-5.0, -6.6) + 0.35), -6.6, s * 0.75, 0, 0));
      var sy = s * 7.4, sz = -5.6, sx = -104.0;
      B.M.add(strut(THREE, -70.0, s * 6.0, -6.8, sx + 1.0, sy, sz, 0.45, 6));
      B.M.add(strut(THREE, sx + 4.5, s * 4.8, -3.0, sx + 4.5, sy, sz, 0.3, 4));
      B.M.add(strut(THREE, sx + 4.5, s * 10.0, -2.4, sx + 4.5, sy, sz, 0.3, 4));
      B.M.add(place(THREE, new THREE.CylinderGeometry(0.5, 0.8, 1.6, 8).rotateZ(PI / 2), sx, sy, sz));
      for (j = 0; j < 5; j++) {
        var bl = new THREE.BoxGeometry(0.3, 1.3, 2.4);
        bl.translate(0, 0, 1.5);
        bl.rotateZ(0.4);
        bl.rotateX(j * 2 * PI / 5);
        bl.translate(sx, sy, sz);
        B.M.add(bl);
      }
      B.M.add(box(THREE, 5.0, 0.7, 6.0, -111.0, s * 7.4, -4.0));
    }

    /* ------------------------------------------------- hull openings
       starboard: the boat bay and the rounded side port abaft the island's
       after end; port: the boat in its recess and the row of windows      */
    function opening(x0, x1, side, z0, z1, inset) {
      var xm = (x0 + x1) / 2, yy = side * (hullY(xm, (z0 + z1) / 2) + 0.05);
      B.K.add(box(THREE, x1 - x0, 0.2, z1 - z0, xm, yy, (z0 + z1) / 2));
      B.S.add(box(THREE, x1 - x0 + 0.8, 0.5, 0.35, xm, yy + side * 0.15, z1 + 0.15));
      B.S.add(box(THREE, x1 - x0 + 0.8, 0.5, 0.3, xm, yy + side * 0.15, z0 - 0.1));
      return yy;
    }
    function boat(x, y, z, len, side) {
      var bh = new THREE.CylinderGeometry(1.25, 1.25, len, 8, 1, false, 0, PI);
      bh.rotateZ(PI / 2); bh.rotateX(PI);
      B.W.add(place(THREE, bh, x, y, z));
      B.S.add(box(THREE, len * 0.35, 1.6, 0.9, x - len * 0.1, y, z + 0.45));
      B.M.add(strut(THREE, x - len * 0.35, y, z + 2.2, x - len * 0.35, y, z, 0.07, 4));
      B.M.add(strut(THREE, x + len * 0.35, y, z + 2.2, x + len * 0.35, y, z, 0.07, 4));
    }
    var yb1 = opening(-75.0, -64.5, -1, 11.5, 16.4);
    boat(-69.8, yb1 + 0.6, 12.6, 8.5, -1);
    opening(-46.0, -36.5, -1, 11.5, 16.0);
    var yb2 = opening(8.0, 19.5, 1, 12.0, 16.6);
    boat(13.7, yb2 - 0.3, 13.3, 9.0, 1);
    for (i = 0; i < 8; i++) {
      var wxp = -30.0 + i * 2.7;
      B.K.add(box(THREE, 1.6, 0.15, 1.2, wxp, hullY(wxp, 13.5) + 0.05, 13.5));
    }

    /* ----------------------------------------------------------- sponsons
       a platform and a knee sweeping back into the hull side, so it reads
       as carried; ZS is the platform top, 3.2 m under the deck            */
    var ZS = FD_TOP - 3.2;
    function sponson(x0, x1, side, reach) {
      var yi = side * (DHW - 3.0), yo = side * (DHW + reach);
      B.S.add(plate(THREE, rect(x0, x1, Math.min(yi, yo), Math.max(yi, yo)), ZS - 0.6, ZS));
      var yh = side * (hullY((x0 + x1) / 2, ZS - 4.5) - 0.2);
      var knee = [[x0 + 0.6, yh], [x1 - 0.6, yh], [x1 - 0.3, yo - side * 0.8], [x0 + 0.3, yo - side * 0.8]];
      B.S.add(frustum(THREE, knee, ZS - 4.5, ZS - 0.6, 1.0, 1.0));
      rail(x0, yo, x1, yo, ZS, 1.0);
      rail(x0, yo, x0, side * DHW, ZS, 1.0);
      rail(x1, yo, x1, side * DHW, ZS, 1.0);
    }
    /* the forward NATO mount: starboard, forward of the island, on a
       platform below the flight deck (Makin Island; Bataan)               */
    sponson(43.0, 54.0, -1, 5.5);
    emit(mk29Parts(THREE), 48.5, -22.6, ZS, -PI * 0.5);
    /* the after Mk 29, port quarter (station not confirmed)               */
    sponson(-117.0, -106.0, 1, 5.5);
    emit(mk29Parts(THREE), -111.5, 22.6, ZS, PI * 0.62);
    /* Phalanx 2 and 3: port bow and starboard quarter (not confirmed)      */
    sponson(95.0, 102.5, 1, 4.5);
    emit(phalanxParts(THREE), 98.8, 22.2, ZS, PI * 0.3);
    sponson(-112.5, -105.0, -1, 4.5);
    emit(phalanxParts(THREE), -108.8, -22.2, ZS, -PI * 0.7);
    if (later) {
      /* the 2000s: two Mk 49 RAM (stations not confirmed), and the radome
         on its bracketed sponson on the port quarter that the 2005 photos
         show and the 1995 one does not                                    */
      sponson(102.5, 109.0, -1, 4.5);
      emit(ramParts(THREE), 105.8, -22.1, ZS, -PI * 0.3);
      sponson(-104.0, -97.5, 1, 4.5);
      emit(ramParts(THREE), -100.8, 22.1, ZS, PI * 0.7);
      var rdx = -84.0, rdy = DHW + 2.6, rdz = FD_TOP - 4.6;
      B.S.add(plate(THREE, rect(rdx - 2.6, rdx + 2.6, DHW - 2.5, DHW + 5.0), rdz - 0.5, rdz));
      B.M.add(strut(THREE, rdx - 2.0, hullY(rdx, 10) + 0.2, rdz - 5.5, rdx - 2.0, DHW + 4.4, rdz - 0.5, 0.2, 4));
      B.M.add(strut(THREE, rdx + 2.0, hullY(rdx, 10) + 0.2, rdz - 5.5, rdx + 2.0, DHW + 4.4, rdz - 0.5, 0.2, 4));
      B.S.add(cylZ(THREE, 1.9, 1.9, 1.6, 12, rdx, rdy, rdz));
      B.W.add(sphere(THREE, 1.9, 12, 6, rdx, rdy, rdz + 1.6, 1, 1, 1.15, true));
    }

    /* ================================================================ island
       Starboard edge, outboard face 0.4 m past the deck edge. Tiers off the
       line drawing (heights above the deck): forward deckhouse 3.8, forward
       step 7.4, main block 8.0, bridge roof 14.2, stack 15.6; stations off
       the aerial and the drawing together.                                */
    var Z0 = FD_TOP, YO = -20.4;
    var MAIN = [[18.5, YO], [18.5, -8.6], [16.8, -7.0], [-38.0, -7.0], [-38.0, YO]];
    B.S.add(frustum(THREE, MAIN, Z0, Z0 + 8.0, 1.0, 0.996));
    B.T.add(frustum(THREE, MAIN, Z0 + 7.1, Z0 + 7.9, 1.004, 1.0));
    B.S.add(plate(THREE, scalePts(MAIN, 1.004), Z0 + 7.95, Z0 + 8.15));
    /* the low after deckhouse carrying the big dome                        */
    var AFTH = [[-38.0, YO], [-38.0, -8.2], [-47.5, -9.4], [-47.5, YO]];
    B.S.add(frustum(THREE, AFTH, Z0, Z0 + 4.2, 1.0, 0.99));
    B.S.add(cylZ(THREE, 2.7, 2.9, 2.3, 14, -42.6, -14.6, Z0 + 4.2));
    B.W.add(sphere(THREE, 3.0, 16, 9, -42.6, -14.6, Z0 + 6.5, 1, 1, 1.13, true));
    B.W.add(cylZ(THREE, 1.15, 1.15, 3.4, 10, -46.4, -10.6, Z0));
    B.W.add(sphere(THREE, 1.15, 10, 4, -46.4, -10.6, Z0 + 3.4, 1, 1, 0.5, true));
    ringRail(scalePts(AFTH, 0.98), Z0 + 4.2, 1.0);
    /* forward step (the Phalanx stands on it) and the forward deckhouse    */
    var FSTEP = [[24.0, YO], [24.0, -9.6], [18.5, -9.0], [18.5, YO]];
    B.S.add(frustum(THREE, FSTEP, Z0, Z0 + 7.4, 1.0, 0.99));
    ringRail(scalePts(FSTEP, 0.97), Z0 + 7.4, 1.0);
    var FDH = [[42.5, YO], [42.5, -13.4], [40.6, -12.0], [24.0, -12.0], [24.0, YO]];
    B.S.add(frustum(THREE, FDH, Z0, Z0 + 3.8, 1.0, 0.99));
    ringRail(scalePts(FDH, 0.98), Z0 + 3.8, 1.0);
    B.S.add(cylZ(THREE, 0.25, 0.3, 1.2, 6, 31.0, -16.5, Z0 + 3.8));
    B.R.add(box(THREE, 0.3, 2.4, 0.3, 31.0, -16.5, Z0 + 5.15));

    /* the bridge: block, window band all round, a visor roof, wings        */
    var BRG = [[18.5, YO + 0.2], [18.5, -9.6], [9.0, -9.6], [9.0, YO + 0.2]];
    B.S.add(frustum(THREE, BRG, Z0 + 8.0, Z0 + 12.2, 1.0, 0.985));
    B.G.add(frustum(THREE, BRG, Z0 + 12.2, Z0 + 13.5, 0.985, 0.985));
    B.S.add(plate(THREE, scalePts(BRG, 1.03), Z0 + 13.5, Z0 + 14.2));
    B.S.add(plate(THREE, rect(12.5, 17.5, -24.2, YO + 0.2), Z0 + 11.8, Z0 + 12.15));
    ringRail([[12.6, -24.1], [17.4, -24.1], [17.4, YO], [12.6, YO]], Z0 + 12.15, 1.0);
    B.S.add(plate(THREE, rect(12.5, 17.5, -9.6, -6.6), Z0 + 11.8, Z0 + 12.15));
    /* flight-control windows looking over the deck from the inboard face,
       and the window rows the 1990s photograph shows down the main block   */
    B.G.add(box(THREE, 9.0, 0.2, 1.1, -30.0, -7.0, Z0 + 6.4));
    for (i = 0; i < 9; i++) {
      B.G.add(box(THREE, 2.0, 0.14, 0.75, -33.0 + i * 5.6, YO - 0.03, Z0 + 5.6));
      B.K.add(box(THREE, 1.1, 0.14, 2.0, -35.0 + i * 5.6, -7.02, Z0 + 1.05));
    }

    /* the forward mast block, and the mast                                 */
    var FMB = [[9.0, -19.6], [9.0, -9.6], [-4.5, -9.6], [-4.5, -19.6]];
    B.S.add(frustum(THREE, FMB, Z0 + 8.0, Z0 + 13.0, 1.0, 0.98));
    ringRail(scalePts(FMB, 0.97), Z0 + 13.0, 1.0);
    var FMX = -1.0, FMY = -14.6;
    B.S.add(cylZ(THREE, 0.75, 0.9, 2.6, 10, FMX, FMY, Z0 + 13.0));
    B.K.add(cylZ(THREE, 0.42, 0.75, 9.6, 10, FMX, FMY, Z0 + 15.6));
    B.K.add(cylZ(THREE, 0.14, 0.24, 5.4, 6, FMX, FMY, Z0 + 25.2));
    /* the big platform at 15.6 m, the SPS-48 on its forward end            */
    var FPL = [[9.8, -19.5], [9.8, -9.8], [-3.6, -10.6], [-3.6, -18.7]];
    B.S.add(plate(THREE, FPL, Z0 + 15.3, Z0 + 15.6));
    ringRail(scalePts(FPL, 0.98), Z0 + 15.6, 1.0);
    B.S.add(cylZ(THREE, 0.9, 1.1, 1.5, 10, 6.0, -14.6, Z0 + 15.6));
    (function () {
      var lean = -0.44, ax = 6.6, az = Z0 + 19.4;
      B.R.add(box(THREE, 0.45, 5.2, 4.6, ax, FMY, az, 0, lean, 0));
      B.K.add(box(THREE, 0.1, 4.8, 4.2, ax + 0.26 * Math.cos(-lean), FMY, az + 0.26 * Math.sin(-lean), 0, lean, 0));
      B.M.add(box(THREE, 1.6, 1.2, 2.4, ax - 0.9, FMY, Z0 + 17.9, 0, lean, 0));
      for (s = -1; s <= 1; s += 2) B.M.add(strut(THREE, 6.0, FMY + s * 0.9, Z0 + 17.0, ax - 0.5, FMY + s * 2.2, az + 1.2, 0.1, 4));
    })();
    /* the yard at 22 m with its braces, and the top platform at 25.2 m with
       the two small domes the drawing shows fore and aft of the mast        */
    B.S.add(box(THREE, 1.4, 11.0, 0.35, FMX, FMY, Z0 + 22.0));
    for (s = -1; s <= 1; s += 2) {
      B.K.add(strut(THREE, FMX, FMY + s * 0.5, Z0 + 19.4, FMX, FMY + s * 4.5, Z0 + 21.8, 0.09, 4));
      B.M.add(strut(THREE, FMX, FMY + s * 4.6, Z0 + 22.2, FMX, FMY + s * 4.6, Z0 + 24.4, 0.05, 4));
    }
    B.S.add(place(THREE, new THREE.CylinderGeometry(2.0, 2.0, 0.3, 8).rotateX(PI / 2), FMX, FMY, Z0 + 25.2));
    ringRail([[FMX - 1.6, FMY - 1.6], [FMX + 1.6, FMY - 1.6], [FMX + 1.6, FMY + 1.6], [FMX - 1.6, FMY + 1.6]], Z0 + 25.35, 0.9);
    for (s = -1; s <= 1; s += 2) {
      B.S.add(cylZ(THREE, 0.2, 0.25, 0.8, 6, FMX + s * 1.5, FMY, Z0 + 25.35));
      B.W.add(sphere(THREE, 0.62, 10, 6, FMX + s * 1.5, FMY, Z0 + 26.4));
    }
    /* URN-25 TACAN at the masthead                                         */
    B.W.add(cylZ(THREE, 0.55, 0.55, 1.1, 10, FMX, FMY, Z0 + 28.0));
    B.M.add(strut(THREE, FMX, FMY, Z0 + 29.1, FMX, FMY, Z0 + 30.6, 0.05, 4, 0.03));

    /* the lattice tower on the island's outboard face                       */
    (function () {
      var lx0 = -10.6, lx1 = -8.2, ly0 = -20.7, ly1 = -19.0, zt = Z0 + 15.6, nS = 6;
      [[lx0, ly0], [lx1, ly0], [lx1, ly1], [lx0, ly1]].forEach(function (p) {
        B.M.add(strut(THREE, p[0], p[1], Z0, p[0], p[1], zt, 0.12, 4));
      });
      for (var q = 0; q < nS; q++) {
        var za = Z0 + (zt - Z0) * q / nS, zb = Z0 + (zt - Z0) * (q + 1) / nS;
        B.M.add(strut(THREE, lx0, ly0, za, lx1, ly0, zb, 0.06, 3));
        B.M.add(strut(THREE, lx1, ly0, za, lx0, ly0, zb, 0.06, 3));
        B.M.add(box(THREE, lx1 - lx0, 0.08, 0.08, (lx0 + lx1) / 2, ly0, zb));
      }
    })();

    /* the stack, black-capped (the DPLA photograph)                       */
    var STK = [[-19.0, -19.4], [-19.0, -11.4], [-26.2, -11.4], [-26.2, -19.4]];
    B.S.add(frustum(THREE, STK, Z0 + 8.0, Z0 + 14.0, 1.0, 0.985));
    B.K.add(frustum(THREE, STK, Z0 + 14.0, Z0 + 15.6, 0.985, 0.95));
    B.K.add(plate(THREE, scalePts(STK, 0.8), Z0 + 15.55, Z0 + 15.7));
    /* the small house between stack and forward mast, its whips            */
    B.S.add(frustum(THREE, rect(-18.5, -5.0, -18.0, -10.2), Z0 + 8.0, Z0 + 9.8, 1.0, 0.97));
    [[-16.5, -12.0, 6.0], [-13.8, -17.0, 5.5], [-8.0, -11.0, 4.0], [44.0, -18.0, 7.5]].forEach(function (w) {
      var zb = w[0] > 30 ? Z0 : Z0 + 9.8;
      B.M.add(strut(THREE, w[0], w[1], zb, w[0], w[1], zb + w[2], 0.06, 4, 0.025));
    });

    /* the after mast: taller, dark nearly all its height, three platforms  */
    var AMB = [[-26.2, -19.0], [-26.2, -9.0], [-34.5, -9.0], [-34.5, -19.0]];
    B.S.add(frustum(THREE, AMB, Z0 + 8.0, Z0 + 12.0, 1.0, 0.98));
    ringRail(scalePts(AMB, 0.97), Z0 + 12.0, 1.0);
    var AMX = -29.8, AMY = -14.4;
    B.K.add(cylZ(THREE, 0.62, 1.0, 15.0, 10, AMX, AMY, Z0 + 12.0));
    B.K.add(cylZ(THREE, 0.16, 0.3, 7.0, 6, AMX, AMY, Z0 + 27.0));
    /* lower platform at 15.5 m, the SPN-43's curved mesh dish on its after
       side and a Mk 91 director forward                                    */
    var APL = [[-25.6, -18.8], [-25.6, -10.0], [-36.8, -10.0], [-36.8, -18.8]];
    B.S.add(plate(THREE, APL, Z0 + 15.2, Z0 + 15.5));
    ringRail(scalePts(APL, 0.98), Z0 + 15.5, 1.0);
    B.S.add(cylZ(THREE, 0.5, 0.6, 1.4, 8, -34.4, AMY, Z0 + 15.5));
    for (j = 0; j < 5; j++) {
      var aa = (j - 2) * 0.24;
      B.R.add(box(THREE, 0.14, 1.0, 2.2, -35.4 + 4.2 * (1 - Math.cos(aa)), AMY + 4.2 * Math.sin(aa), Z0 + 17.9, 0, -0.18, aa));
    }
    B.M.add(strut(THREE, -34.4, AMY, Z0 + 16.9, -33.0, AMY, Z0 + 18.4, 0.06, 4));
    /* the yard at 21 m with the Mk 23 TAS on a bracket forward of the mast  */
    B.S.add(box(THREE, 1.4, 12.0, 0.35, AMX, AMY, Z0 + 21.0));
    for (s = -1; s <= 1; s += 2) {
      B.K.add(strut(THREE, AMX, AMY + s * 0.6, Z0 + 18.0, AMX, AMY + s * 5.0, Z0 + 20.8, 0.09, 4));
      B.W.add(sphere(THREE, 0.35, 8, 5, AMX, AMY + s * 5.6, Z0 + 21.4));
    }
    B.S.add(box(THREE, 3.4, 3.0, 0.3, AMX - 2.4, AMY, Z0 + 20.8));
    ringRail([[AMX - 4.0, AMY - 1.4], [AMX - 0.8, AMY - 1.4], [AMX - 0.8, AMY + 1.4], [AMX - 4.0, AMY + 1.4]], Z0 + 20.95, 0.9);
    B.S.add(cylZ(THREE, 0.45, 0.55, 0.9, 8, AMX - 2.8, AMY, Z0 + 20.95));
    B.R.add(box(THREE, 0.5, 3.2, 1.5, AMX - 2.9, AMY, Z0 + 22.7, 0, 0.12, 0));
    B.R.add(box(THREE, 0.3, 3.2, 0.3, AMX - 2.9, AMY, Z0 + 23.7));
    /* top platform at 27 m with the SPS-67, then the pole                  */
    B.S.add(place(THREE, new THREE.CylinderGeometry(2.2, 2.2, 0.3, 8).rotateX(PI / 2), AMX, AMY, Z0 + 27.0));
    ringRail([[AMX - 1.8, AMY - 1.8], [AMX + 1.8, AMY - 1.8], [AMX + 1.8, AMY + 1.8], [AMX - 1.8, AMY + 1.8]], Z0 + 27.15, 0.9);
    B.S.add(cylZ(THREE, 0.3, 0.35, 0.8, 6, AMX + 1.0, AMY, Z0 + 27.15));
    B.R.add(box(THREE, 0.35, 3.0, 0.45, AMX + 1.0, AMY, Z0 + 28.2));
    B.M.add(strut(THREE, AMX, AMY, Z0 + 31.0, AMX, AMY, Z0 + 34.0, 0.05, 4, 0.025));
    B.M.add(box(THREE, 0.3, 3.0, 0.08, AMX, AMY, Z0 + 31.5));

    /* the Mk 91 directors: on the after deckhouse and the bridge roof      */
    emit(mk91Parts(THREE), -37.0, -10.5, Z0 + 8.15, PI * 0.95);
    emit(mk91Parts(THREE), 15.0, -17.8, Z0 + 14.2, 0);
    /* boxes and lockers on the main block roof                             */
    for (i = 0; i < 5; i++) B.S.add(box(THREE, 1.8, 1.2, 1.1, -35.0 + i * 3.0, -8.6, Z0 + 8.7));

    /* ---------------------------------------------- island fittings
       port lights and doors down the inboard face, windows in the forward
       block, louvres on the stack, roof lockers and vents, searchlights on
       the bridge wings: the clutter every photograph of the island shows   */
    for (i = 0; i < 10; i++) {
      var wxx = -35.5 + i * 5.2;
      if (wxx > -33 && wxx < -24) continue;
      B.G.add(box(THREE, 1.5, 0.14, 0.65, wxx, -7.0, Z0 + 4.6));
    }
    for (i = 0; i < 3; i++) B.G.add(box(THREE, 2.2, 0.14, 0.8, -2.5 + i * 4.0, -9.6, Z0 + 11.2));
    for (i = 0; i < 3; i++) B.G.add(box(THREE, 2.2, 0.14, 0.8, -2.5 + i * 4.0, -19.5, Z0 + 11.2));
    for (s = -1; s <= 1; s += 2)
      for (i = 0; i < 4; i++) B.K.add(box(THREE, 1.2, 0.12, 2.6, -24.6 + i * 1.6, s > 0 ? -11.42 : -19.38, Z0 + 11.2));
    [[-14.5, -16.5], [-12.0, -12.0], [-7.0, -17.5], [4.0, -8.4], [-36.0, -16.5], [22.5, -11.0], [33.0, -13.6], [28.0, -18.6]].forEach(function (v, q) {
      var zz = v[0] > 24 ? Z0 + 3.8 : v[0] > 18.5 ? Z0 + 7.4 : v[0] > -4.5 && v[0] < 9 ? Z0 + 13.0 : v[0] < -34 ? Z0 + 8.15 : Z0 + 9.8;
      if (v[0] > -19 && v[0] < -5 && v[1] < -10.2) zz = Z0 + 9.8;
      B.S.add(box(THREE, 1.4 + (q % 3) * 0.5, 1.0 + (q % 2) * 0.6, 0.9 + (q % 2) * 0.4, v[0], v[1], zz + 0.45));
    });
    for (s = -1; s <= 1; s += 2) {
      var sly = s < 0 ? -23.6 : -7.2;
      B.S.add(cylZ(THREE, 0.18, 0.22, 0.7, 6, 13.2, sly, Z0 + 12.15));
      B.W.add(place(THREE, new THREE.CylinderGeometry(0.42, 0.42, 0.6, 8).rotateZ(PI / 2), 13.4, sly, Z0 + 13.1));
    }
    /* small dish and dome antennas on the after deckhouse and bridge roof   */
    B.W.add(sphere(THREE, 0.85, 10, 6, -45.6, -18.6, Z0 + 4.2 + 0.2, 1, 1, 1, true));
    B.W.add(sphere(THREE, 0.75, 10, 6, 10.4, -11.0, Z0 + 14.2 + 0.1, 1, 1, 1, true));
    B.W.add(sphere(THREE, 0.75, 10, 6, 10.4, -18.4, Z0 + 14.2 + 0.1, 1, 1, 1, true));
    for (j = 0; j < 6; j++) {
      var wx2 = -44.0 + j * 4.5, wy2 = j % 2 ? -19.8 : -7.6;
      var wz2 = wx2 < -38 ? Z0 + 4.2 : Z0 + 8.15;
      B.M.add(strut(THREE, wx2, wy2, wz2, wx2, wy2, wz2 + 3.0 + (j % 3), 0.05, 4, 0.02));
    }

    /* the knuckle: a rubbing strake along the hangar deck that rises to
       the deck lip at the bow (the line drawing's long curve, x 51 to 123) */
    for (s = -1; s <= 1; s += 2) {
      var kp = [];
      for (i = 0; i <= 14; i++) {
        var tk = i / 14, kx = lerp(-100.0, 36.0, tk);
        kp.push([kx, KN]);
      }
      for (i = 1; i <= 12; i++) {
        var tk2 = i / 12, kx2 = lerp(36.0, 123.0, tk2);
        kp.push([kx2, KN + (17.1 - KN) * Math.pow(tk2, 2.0)]);
      }
      for (i = 0; i + 1 < kp.length; i++) {
        var a0 = kp[i], a1 = kp[i + 1];
        if (inLift(Math.min(a0[0], a1[0]), Math.max(a0[0], a1[0]), s)) continue;
        if (s < 0 && a1[0] > -75.5 && a0[0] < -36) continue;              /* boat bay, side port */
        var y0k = s * (hullY(a0[0], a0[1]) + 0.12), y1k = s * (hullY(a1[0], a1[1]) + 0.12);
        B.S.add(strut(THREE, a0[0], y0k, a0[1], a1[0], y1k, a1[1], 0.16, 4));
      }
    }
    /* the starboard side's square ports and vehicle openings, off the
       drawing; the boom under them                                         */
    opening(-30.0, -26.7, -1, 10.7, 12.9);
    for (i = 0; i < 6; i++) {
      var vx = -11.3 + i * 1.95;
      B.K.add(box(THREE, 1.6, 0.18, 2.2, vx, -(hullY(vx, 12.1) + 0.04), 12.1));
    }
    B.M.add(box(THREE, 11.8, 0.4, 0.5, -12.6, -(hullY(-12.6, 8.2) + 0.2), 8.2));
    for (i = 0; i < 6; i++) {
      var px2 = [70.0, 76.0, 84.0, 59.0, 92.0, 100.0][i];
      B.K.add(box(THREE, 1.4, 0.16, 1.6, px2, -(hullY(px2, 14.0) + 0.04), 14.0 - (i % 2) * 2.5));
      B.K.add(box(THREE, 1.4, 0.16, 1.6, px2 - 3.0, hullY(px2 - 3.0, 14.5) + 0.04, 14.5 - (i % 2) * 2.0));
    }

    /* the island Phalanx on the forward step, its own small group          */
    var tur = new THREE.Group();
    tur.name = "ciws";
    tur.position.set(21.4, -14.4, Z0 + 7.4);
    var tb = {};
    phalanxParts(THREE).forEach(function (pp) {
      if (!tb[pp[0]]) tb[pp[0]] = new Batch();
      tb[pp[0]].add(pp[1]);
    });
    Object.keys(tb).forEach(function (kk) { var mm = tb[kk].mesh(THREE, T[kk]); if (mm) tur.add(mm); });
    root.add(tur);

    /* ------------------------------------------------------ team colour
       a flash laid across each end of the deck, 0.2 m proud, as the Ford  */
    B.T.add(box(THREE, 1.6, 14.0, 0.2, 125.6, 0, FD_TOP + 0.1));
    B.T.add(box(THREE, 1.6, 14.0, 0.2, -120.6, 0, FD_TOP + 0.1));

    /* ------------------------------------------------ out as one mesh each */
    Object.keys(B).forEach(function (kk) {
      var mm = B[kk].mesh(THREE, T[kk]);
      if (mm) root.add(mm);
    });
    root.userData.heroLen = LOA;
    return root;
  }

  return { build: build, len: LOA };
})();

UNIT_MODELS["nato_e90_lhd"] = {
  len: 257,
  build: function (THREE, M, C) { return HeroWaspLHD.build(THREE, M, C, false); }
};
UNIT_MODELS["nato_e00_lhd"] = {
  len: 257,
  build: function (THREE, M, C) { return HeroWaspLHD.build(THREE, M, C, true); }
};
