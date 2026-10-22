/* ============================================================================
   pact_lpd_rogov.js -- HERO model: Project 1174 "Nosorog" large landing ship,
   the Ivan Rogov class (Yantar, Kaliningrad). Registered for pact_e80_lpd
   (Ivan Rogov, 1978) and pact_e90_lpd / pact_e00_lpd (Mitrofan Moskalenko,
   1990). Nothing else borrows these keys.

   REFERENCES (fetched with a generic User-Agent; Commons at 1000 px):
     - navypedia.org "IVAN ROGOV large landing ships (project 1174)", its
       standard-scale drawing "Mitrofan Moskalenko 2000": a starboard
       profile drawn to the WATERLINE (no underwater body) and a plan, 3.24
       and 3.21 px a metre. Every station below is read off it on a metre
       grid. Its plan beam over the outline is 25.4 m against the published
       23.8 m; half-breadths are scaled by 0.937 to the published figure.
       The same page: 157.0 m, 23.8 m, 2 shafts, the fits of 101 and 103.
     - "DoD-Ivan Rogov-DN-SN-85-07169" (starboard quarter, 1985): the stern
       gate, the after pad, the openings under it, the block side and its
       gallery, the funnel block and lattice mast, the raft racks.
     - "Quarter view of a Soviet Ivan Rogov class ship" (port quarter,
       colour): the paint - light grey sides, red-brown decks, the dark
       square round the after landing circle; the block's after face with
       its hangar door and the port deckhouse on the pad; the round flush
       cover at the after end of the block roof; the lattice of the gate.
     - "Amphibious Ivan Rogov class" (starboard bow, 1982): the forecastle
       and its AK-726, the forward deck, the forward face of the block and
       its big door, the raft-rack tower and the launcher on it, the port
       deckhouse and launch, the AK-630 domes, the mast and its dish.
     - "Amphibious landing ship Mitrofan Moskalenko in 1994" (port bow):
       the concave fillet where the block's side drops to the forward deck,
       the gallery and grille on the port side, the bow door seam, the hawse,
       her Top Plate (MR-750) on the main mast.
     - "Ivan Rogov class landing ship with soviet military equipment"
       (starboard amidships): the three tiers of raft canisters, the rails.
     - "IvanRogovLSModel" (museum model, starboard): deck colours, the tiers.

   RECOGNITION FEATURES (each with where it rests):
     1. A slab-sided hull carried straight up into a full-width block 20 m
        high between the two pads (drawing profile; 85-07169, 1994, 1982).
     2. The after pad, 13.0 m up over the well, full beam, ending in a flat
        square transom filled by the latticed stern gate (85-07169, colour).
     3. The low forward deck, 7.7 m, with its landing circle and lanes,
        narrowing to the forecastle (drawing plan; 1982; amidships).
     4. A raised forecastle, 10.9 to 12.5 m, with the twin AK-726 on the
        centreline and the bow door seam running down aft (drawing; 1982;
        1994).
     5. The concave fillets where the block's sides drop to the forward deck
        (1994; amidships; drawing).
     6. The starboard tower ahead of the block: three tiers of raft canisters
        under a platform with the launcher on it (1982; amidships; drawing).
     7. The big doors in the block's forward and after faces; the deckhouse
        on the port side of the after pad (1982; 1994; colour; 85-07169).
     8. The stepped upper works: the 01 level, the funnel block with its
        exhaust grille and the lattice mast on it, the bridge block (all).
     9. The pyramid main mast with its yard and the air-search antenna on
        top: Head Net-C (MR-310) on Ivan Rogov, Top Plate (MR-750) on
        Mitrofan Moskalenko (colour, 1982; 1994; navypedia's fits).
    10. The long gallery openings and rows of scuttles in the sides, the two
        openings under the after pad (85-07169; 1994; drawing).
    11. The MR-105 dish forward of the mast; the AK-630 domes on the 01
        level (1982; 85-07169; drawing plan).
    12. The boats on the 01 level beside the funnel block (drawing plan) and
        the launch on the port side of the forward deck (1982; 1994).

   STATION TABLE (x from amidships, + forward; z above the waterline):
       x       deck edge z   half-breadth at deck   waterline half-breadth
     -78.75    13.0 pad        11.9                    11.7
     -53.5     13.0 | 20.0     11.9                    11.9   (block aft face)
      -5.0     20.0 -> fillet  11.9                    11.9   (block fwd face)
      -1.0      7.7            11.9                    11.9
      20        7.7            11.5                    11.5
      30        7.7            10.9                    10.7
      40        7.7            10.3                     9.7
      50        7.7             9.2                     8.3
      52.3     10.9 forecastle  9.3                     7.9
      60       11.6             8.45                    6.7
      66       11.9             7.3                     4.6
      70       12.0             6.4                     2.8
      74       12.2             5.1                     0.4
      78.75    12.5 stem        0.0                      -
   The stem is raked 4.25 m from the waterline (x 74.5) to the stem head
   (drawing); the forefoot below water and the keel are not on the drawing:
   keel 6.5 m down (the published 6.5-6.7 m draught), rising aft to 2.6 m
   at the transom over the well.

   WEAPONS, drawn where the references show them: the twin AK-726 on the
   forecastle (drawing, 1982); four AK-630 domes, two at the forward
   corners of the 01 level and two at the after end of the block roof
   (1982, 85-07169; the drawing's plan has the forward pair at x -20); the
   MR-105 dish forward of the mast; the two MR-123 directors, one on the
   mast's forward platform and one on a post at the after end of the 01
   level (the drawing's profile); the launcher on the starboard tower,
   taken as the A-215 Grad-M (the class's only box launcher); the Osa-M,
   whose launcher retracts into its magazine, as the round flush cover at
   the port after corner of the block roof (colour photograph and the
   drawing's plan). The identifications of the launcher and of the cover
   are mine, from their shapes and stations.

   THE OPENING PARTS. "wellgate": the stern gate, hinged at its foot on the
   sill (x -78.75, z 0.3) under a holder turned PI about Z, so rotation.y
   +1.45 lays it out aft and down (the gate stands upright in the flat
   transom, so at 1.45 its lip is 7 deg above level, 1.7 m over the sill).
   Behind it the well: 13.2 m wide, 10.5 m high, dark, drawn to a metre
   short of the block's forward face (x -6.0), where the forward deck
   drops below its deckhead. The game's well is 75 m (js/facts.js; no
   reference here measures it): userData.wellExit is the sill at x -78.75,
   wellInner the middle of those 75 m, x -41.25, both at the floor.
   "bowramp": the bow doors (the shell forward of the seam the drawing and
   the 1994 photograph show) and the ramp stowed upright behind them,
   hinged at the foot of the bow opening (x 66.5, z 1.0); +1.45 swings them
   forward and down. Behind them a dark bow compartment and the tank deck
   tunnel. The real doors are two leaves that swing out sideways; the
   renderer turns one node, so they go down with the ramp.

   NOT DRAWN (no reference shows it well enough): the Strela-3 posts of
   1985 on, the MRG-1 grenade launcher, the 4R33 (Pop Group) director, the
   jib crane 85-07169 seems to show at the block's starboard fore corner, the
   radar identities beyond the two named above, the hangar's interior,
   hull numbers, names and ensigns. Moskalenko and Rogov differ here only
   in the masthead antenna and the after pad's dark square, which only
   the colour photograph of Ivan Rogov shows.

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0. X extent
   157.5 m: the transom at -78.75 to the stem head at +78.75; nothing is
   proud of either end. Nothing is named "turret": the rows have no trained
   mount. The team colour is exactly C.team: a band round the mast and two
   flashes on the block roof.

   ASCII only -- a stray byte in a hex literal has broken this project.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRogov1174 = (function () {
  "use strict";

  var PI = Math.PI;
  var LOA = 157.5, XS = -78.75, XB = 78.75;
  var ZPAD = 13.0, ZBLK = 20.0, ZFWD = 7.7;        /* after pad, block roof, forward deck */
  var XBA = -53.5, XBF = -5.0, RF = 4.0;           /* block after/forward faces, fillet  */
  var XR0 = 50.0, XFC = 52.3, ZFC0 = 10.9;         /* forecastle rise and front          */
  var XDOOR = 66.5, ZSILL = 1.0, ZDTOP = 10.2, XDT = 74.5;  /* the bow door seam      */
  var ZKEEL = -6.5;
  /* the well and its gate */
  var WHW = 6.6, WZ0 = 0.3, WZ1 = 10.8, WLEN = 75.0;
  var TG0 = 7.7, TG1 = 10.9, TZ0 = 9.4, TZ1 = 11.7;     /* transom gallery openings */

  /* ---------------------------------------------------------- tables */
  var YDK = [[-78.75, 11.9], [15, 11.9], [20, 11.5], [30, 10.9], [40, 10.3], [50, 9.2], [54, 9.3],
             [58, 8.75], [62, 8.15], [66, 7.3], [70, 6.4], [72, 5.83], [74, 5.1], [76, 4.2],
             [77.6, 2.9], [78.4, 1.6], [78.75, 0.0]];
  var YWL = [[-78.75, 11.7], [-72, 11.9], [15, 11.9], [20, 11.5], [30, 10.7], [40, 9.7], [50, 8.3],
             [56, 7.2], [62, 5.6], [66, 4.6], [70, 2.8], [73, 1.1], [74.5, 0.0]];
  var KEEL = [[-78.75, -2.6], [-74, -3.9], [-68, -5.2], [-60, -6.2], [-54, -6.5], [78.75, -6.5]];
  var PEXP = [[-78.75, 3.0], [-60, 4.5], [-40, 6.0], [40, 6.0], [55, 3.2], [65, 2.2], [74.5, 1.6]];
  var QEXP = [[-78.75, 1.0], [15, 1.0], [40, 1.2], [60, 1.5], [78.75, 1.7]];
  var ZFCT = [[52.3, 10.9], [58, 11.5], [66, 11.9], [74, 12.2], [78.75, 12.5]];
  /* the deck plan near the stem, as a function of distance aft of the stem:
     the bow is round in plan at every height and follows the raked stem   */
  var BOWR = [[0, 0], [0.35, 1.6], [1.15, 2.9], [2.75, 4.2], [4.75, 5.1], [6.75, 5.83],
              [8.75, 6.4], [12.75, 7.3], [16.75, 8.15], [20.75, 8.75], [24.75, 9.3], [60, 12.5]];

  var STATIONS = [-78.75, -78.0, -76.5, -74, -71, -68, -64, -60, -56.5, -53.52, -53.5, -50, -45,
                  -40, -35, -30, -25, -20, -15, -10, -7, -5.0, -4.99, -4.9, -4.6, -4.1, -3.4, -2.5,
                  -1.6, -1.0, 0, 5, 10, 15, 20, 25, 30, 35, 40, 44, 47, 50, 50.6, 51.2, 51.7, 52.05,
                  52.25, 52.3, 54, 56, 58, 60, 62, 64, 65.5, 66.5, 67.3, 68.1, 68.9, 69.7, 70.5,
                  71.3, 72.1, 72.9, 73.7, 74.5, 75.1, 75.7, 76.2, 76.7, 77.1, 77.5, 77.85, 78.15,
                  78.4, 78.6, 78.75];

  /* ================================================================ helpers */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function tbl(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++)
      if (x <= T[i][0]) return lerp(T[i - 1][1], T[i][1], (x - T[i - 1][0]) / (T[i][0] - T[i - 1][0]));
    return T[T.length - 1][1];
  }
  function rngOf(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hx(c) { return typeof c === "string" ? c : "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
  function mkCv(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function finish(THREE, cv, clampIt) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = clampIt ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  }

  /* ------------------------------------------------------------ hull form */
  /* the top of the side: the pad, the block, the fillet, the forward deck,
     the rise to the forecastle and the forecastle sheer                    */
  function zD(x) {
    if (x < XBA) return ZPAD;
    if (x <= XBF) return ZBLK;
    if (x < XBF + RF) { var d = x - XBF - RF; return ZFWD + RF - Math.sqrt(Math.max(0, RF * RF - d * d)); }
    if (x <= XR0) return ZFWD;
    if (x < XFC) { var u = (x - XR0) / (XFC - XR0); return ZFWD + (ZFC0 - ZFWD) * (1 - Math.sqrt(Math.max(0, 1 - u * u))); }
    return tbl(ZFCT, x);
  }
  /* the deck plate's level (the fillet and the rise are side plating)     */
  function zDeck(x) { return x < XBA ? ZPAD : x < XBF ? ZBLK : x < XFC ? ZFWD : tbl(ZFCT, x); }
  function zRef(x) { return x < XR0 ? ZFWD : x < XFC ? lerp(ZFWD, ZFC0, (x - XR0) / (XFC - XR0)) : tbl(ZFCT, x); }
  function xStem(z) {
    if (z >= 0) return Math.min(XB, 74.5 + 4.25 * Math.pow(Math.min(1, z / 12.5), 0.85));
    return 74.5 - 12.5 * Math.pow(Math.min(1, -z / 6.5), 1.6);
  }
  function zLow(x) {
    var k = tbl(KEEL, x);
    if (x <= 62) return k;
    if (x <= 74.5) return Math.max(k, -6.5 * Math.pow((74.5 - x) / 12.5, 1 / 1.6));
    return 12.5 * Math.pow(Math.min(1, (x - 74.5) / 4.25), 1 / 0.85);
  }
  function zs(x) { return clamp(ZSILL + (x - XDOOR) * (ZDTOP - ZSILL) / (XDT - XDOOR), ZSILL, ZDTOP); }
  function halfB(x, z) {
    var zl = zLow(x), y;
    if (z <= zl + 1e-6) return 0;
    var yw = tbl(YWL, x), yt = tbl(YDK, x);
    if (z < 0) {
      var s = clamp(z / Math.min(-1e-3, tbl(KEEL, x)), 0, 1), p = tbl(PEXP, x);
      y = yw * Math.pow(Math.max(0, 1 - Math.pow(s, p)), 1 / p);
    } else {
      var t = clamp(z / zRef(x), 0, 1);
      y = yw + (yt - yw) * Math.pow(t, tbl(QEXP, x));
    }
    return Math.min(y, tbl(BOWR, Math.max(0, xStem(z) - x)));
  }
  /* ten rows a station, always the same ten: keel, four under water, the
     waterline, the door sill, the door top (or a mid line), 10.2 m (or the
     deck) and the top of the side. Rows below a risen keel fold onto it.  */
  var ROWS = 10;
  function rowZ(x) {
    var zl = zLow(x), zd = zD(x), m0 = Math.min(0, tbl(KEEL, x));
    var a = x >= XDOOR ? zs(x) : 4.5, b = Math.min(zd, ZDTOP);
    var zz = [zl, m0 * 0.85, m0 * 0.6, m0 * 0.35, m0 * 0.12, 0, ZSILL, a, b, zd], k;
    for (k = 0; k < zz.length; k++) zz[k] = Math.max(zl, zz[k]);
    for (k = 1; k < zz.length; k++) if (zz[k] < zz[k - 1]) zz[k] = zz[k - 1];
    return zz;
  }
  function section(x) {
    return rowZ(x).map(function (z, k) { return [k === 0 ? 0 : halfB(x, z), z]; });
  }

  /* ------------------------------------------------------------- batching */
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
  function strut(THREE, ax, ay, az, bx, by, bz, r, seg, r2, open) {
    if (!_v0) { _v0 = new THREE.Vector3(0, 1, 0); _v1 = new THREE.Vector3(); }
    var dx = bx - ax, dy = by - ay, dz = bz - az;
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new THREE.CylinderGeometry(r2 === undefined ? r : r2, r, L, seg || 5, 1, !!open);
    var q = new THREE.Quaternion().setFromUnitVectors(_v0, _v1.set(dx, dy, dz).normalize());
    g.applyQuaternion(q);
    g.translate((ax + bx) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
    return g;
  }
  function sphere(THREE, r, ws, hs, x, y, z, half) {
    var g = new THREE.SphereGeometry(r, ws, hs, 0, PI * 2, 0, half ? PI * 0.5 : PI);
    g.rotateX(PI / 2);
    return place(THREE, g, x, y, z);
  }
  function ccw(pts) {
    var a = 0, i, n = pts.length;
    for (i = 0; i < n; i++) { var p = pts[i], q = pts[(i + 1) % n]; a += p[0] * q[1] - q[0] * p[1]; }
    return a < 0 ? pts.slice().reverse() : pts;
  }
  function stack(THREE, rings, capTop, capBot) {
    var pos = [], i, k, n = rings[0][0].length;
    var R = rings.map(function (r) { return { p: ccw(r[0]), z: r[1] }; });
    function P(ri, k) { var q = R[ri].p[k % n]; return [q[0], q[1], q.length > 2 ? q[2] : R[ri].z]; }
    function tri(a, b, c) { pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]); }
    for (i = 0; i < R.length - 1; i++)
      for (k = 0; k < n; k++) { tri(P(i, k), P(i, k + 1), P(i + 1, k + 1)); tri(P(i, k), P(i + 1, k + 1), P(i + 1, k)); }
    var top = R.length - 1;
    if (capTop) for (k = 1; k < n - 1; k++) tri(P(top, 0), P(top, k), P(top, k + 1));
    if (capBot) for (k = 1; k < n - 1; k++) tri(P(0, 0), P(0, k + 1), P(0, k));
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  function chamRect(x0, x1, hw, ch) {
    return [[x0 + ch, -hw], [x1 - ch, -hw], [x1, -hw + ch], [x1, hw - ch],
            [x1 - ch, hw], [x0 + ch, hw], [x0, hw - ch], [x0, -hw + ch]];
  }
  function rrect(x0, x1, y0, y1, ch) {
    return [[x0 + ch, y0], [x1 - ch, y0], [x1, y0 + ch], [x1, y1 - ch], [x1 - ch, y1], [x0 + ch, y1], [x0, y1 - ch], [x0, y0 + ch]];
  }
  function xPrism(THREE, yz, x0, x1) {
    var pts = ccw(yz), n = pts.length, pos = [], k;
    function tri(a, b, c) { pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]); }
    for (k = 0; k < n; k++) {
      var a = pts[k], b = pts[(k + 1) % n];
      tri([x0, a[0], a[1]], [x0, b[0], b[1]], [x1, b[0], b[1]]);
      tri([x0, a[0], a[1]], [x1, b[0], b[1]], [x1, a[0], a[1]]);
    }
    for (k = 1; k < n - 1; k++) {
      tri([x1, pts[0][0], pts[0][1]], [x1, pts[k][0], pts[k][1]], [x1, pts[k + 1][0], pts[k + 1][1]]);
      tri([x0, pts[0][0], pts[0][1]], [x0, pts[k + 1][0], pts[k + 1][1]], [x0, pts[k][0], pts[k][1]]);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  /* loose triangles, each turned to face n                                 */
  function Tris() { this.pos = []; }
  Tris.prototype.tri = function (a, b, c, n) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
    if (cx * cx + cy * cy + cz * cz < 1e-10) return this;
    if (cx * n[0] + cy * n[1] + cz * n[2] < 0) { var t = b; b = c; c = t; }
    this.pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    return this;
  };
  Tris.prototype.quad = function (a, b, c, d, n) { this.tri(a, b, c, n); return this.tri(a, c, d, n); };
  Tris.prototype.geo = function (THREE) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.pos, 3));
    g.computeVertexNormals();
    return g;
  };
  /* plan UVs onto the deck canvas: u x XS..XB, v y -12.5..12.5           */
  var DYH = 12.5;
  function planUV(geo) {
    var P = geo.getAttribute("position"), uv = new Float32Array(P.count * 2), i;
    for (i = 0; i < P.count; i++) { uv[i * 2] = (P.getX(i) - XS) / LOA; uv[i * 2 + 1] = (P.getY(i) + DYH) / (2 * DYH); }
    geo.setAttribute("uv", new (P.constructor)(uv, 2));
    return geo;
  }

  /* ============================================================= textures
     Hull and superstructure grey: the colour photograph's level taken down
     to 0.9, as on the other assault-ship heroes - this renderer's ACES pass
     lifts mid greys (pla_e00_destroyer.js measured 1.8x).                 */
  var C_HULL = "#788085", C_SUP = 0x80888d, C_DECK = "#6f4335", C_PADSQ = "#46483f";
  var C_FOUL = "#3a1d18", C_BOOT = "#15181a", C_MARK = "#d4d6d0";
  var HZ0 = -6.7, HZ1 = 20.3;
  var TEX = {};
  /* the side elevation: port half on top, starboard half below, u transom
     (0) to stem (1); each half z HZ0 (bottom row) to HZ1 (top row). Port is
     seen bow-left, so its half is drawn with x mirrored only where words
     would read; there are no words, so both halves are drawn alike.      */
  function hullTex(THREE) {
    if (TEX.hull) return TEX.hull;
    var W = 2048, H = 1024, HH = H / 2, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(1174), i, k, s;
    var PXZ = HH / (HZ1 - HZ0), PXX = W / LOA;
    function U(x) { return (x - XS) * PXX; }
    for (s = 0; s < 2; s++) {
      var o = s * HH;
      var Y = function (z) { return o + (HZ1 - z) * PXZ; };
      g.save(); g.beginPath(); g.rect(0, o, W, HH); g.clip();
      g.fillStyle = C_HULL; g.fillRect(0, o, W, HH);
      g.fillStyle = C_BOOT; g.fillRect(0, Y(0.45), W, Y(-0.35) - Y(0.45));
      g.fillStyle = C_FOUL; g.fillRect(0, Y(-0.35), W, o + HH - Y(-0.35));
      for (i = 0; i < 160; i++) {
        g.globalAlpha = 0.012 + R() * 0.02;
        g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
        g.fillRect(R() * W, Y(20) + R() * (Y(0.5) - Y(20)), 60 + R() * 240, 8 + R() * 30);
      }
      g.globalAlpha = 1;
      /* strakes every 1.6 m, butts staggered                                */
      for (k = 0; k < 12; k++) {
        var z0 = 1.0 + k * 1.6, y0 = Y(z0), y1 = Y(z0 + 1.6);
        g.fillStyle = "rgba(0,0,0,0.20)"; g.fillRect(0, y0 - 1, W, 1.5);
        g.fillStyle = "rgba(255,255,255,0.05)"; g.fillRect(0, y0 - 2.5, W, 1.5);
        for (var bx = (k % 2) * 70; bx < W; bx += 140) { g.fillStyle = "rgba(0,0,0,0.12)"; g.fillRect(bx, y1, 1.5, y0 - y1); }
      }
      /* the openings: the gallery in the block, the two under the after pad
         (drawing profile and 85-07169), each with its frames and a rail    */
      var opening = function (x0, x1, za, zb, n) {
        g.fillStyle = "#0d0f10"; g.fillRect(U(x0), Y(zb), U(x1) - U(x0), Y(za) - Y(zb));
        g.fillStyle = "rgba(150,158,163,0.55)";
        for (var q = 0; q <= n; q++) g.fillRect(U(lerp(x0, x1, q / n)) - 1.5, Y(zb), 3, Y(za) - Y(zb));
        g.fillRect(U(x0), Y(za + 1.0), U(x1) - U(x0), 2);
        g.fillStyle = "rgba(255,255,255,0.10)"; g.fillRect(U(x0), Y(za) - 2, U(x1) - U(x0), 2);
      };
      opening(-41.0, -24.5, 8.4, 11.4, 6);
      opening(-75.6, -69.6, 8.5, 11.4, 2);
      opening(-66.2, -57.6, 8.5, 11.4, 3);
      /* the louvred panel above the gallery's after end (85-07169, 1994)    */
      g.fillStyle = "#2a2f33"; g.fillRect(U(-36.5), Y(17.0), U(-31.0) - U(-36.5), Y(14.0) - Y(17.0));
      g.fillStyle = "rgba(160,168,172,0.5)";
      for (k = 0; k < 8; k++) g.fillRect(U(-36.5), Y(14.2 + k * 0.36), U(-31.0) - U(-36.5), 1.5);
      /* scuttles: two rows along the block, a few on the hull below         */
      var scut = function (x, z) {
        g.fillStyle = "rgba(8,10,12,0.9)"; g.beginPath(); g.arc(U(x), Y(z), 3.4, 0, 2 * PI); g.fill();
        g.strokeStyle = "rgba(220,224,226,0.30)"; g.lineWidth = 1; g.beginPath(); g.arc(U(x), Y(z), 4.6, 0, 2 * PI); g.stroke();
      };
      var x;
      for (x = -51.0; x < -6.0; x += 2.4) scut(x, 18.4);
      for (x = -50.0; x < -6.0; x += 3.2) if (x < -41.5 || x > -24) scut(x, 15.6);
      for (x = -21.0; x < -6.0; x += 3.2) scut(x, 12.8);
      for (x = -75.0; x < -56.0; x += 4.6) scut(x, 6.2);
      for (x = 6.0; x < 48.0; x += 6.5) scut(x, 5.6);
      /* the hawse on the bow and its rubbing plate (1994)                   */
      g.fillStyle = "rgba(6,7,8,0.95)"; g.beginPath(); g.ellipse ? g.ellipse(U(65.2), Y(8.6), 9, 12, 0, 0, 2 * PI) : g.arc(U(65.2), Y(8.6), 10, 0, 2 * PI); g.fill();
      g.fillStyle = "rgba(60,64,66,0.7)"; g.fillRect(U(64.4), Y(8.0), U(66.0) - U(64.4), Y(1.5) - Y(8.0));
      /* the bow door seam: down aft from the stem head to the sill          */
      g.strokeStyle = "rgba(10,12,13,0.85)"; g.lineWidth = 2.2;
      g.beginPath(); g.moveTo(U(XB), Y(ZDTOP)); g.lineTo(U(XDT), Y(ZDTOP)); g.lineTo(U(XDOOR), Y(ZSILL)); g.stroke();
      /* draught marks and rust weeps                                        */
      g.fillStyle = "rgba(225,228,230,0.7)";
      [73.2, -2.0, -77.6].forEach(function (xx) { for (var dz = -0.2; dz < 3.0; dz += 0.6) g.fillRect(U(xx), Y(dz + 0.2), 4, 3); });
      for (i = 0; i < 40; i++) {
        var rx = R() * W, rz = 2.0 + R() * 16.0, ry = Y(rz), len = 20 + R() * 80;
        var gr = g.createLinearGradient(0, ry, 0, ry + len);
        gr.addColorStop(0, "rgba(70,44,28,0.22)"); gr.addColorStop(1, "rgba(70,44,28,0)");
        g.fillStyle = gr; g.fillRect(rx, ry, 1.5 + R() * 2, len);
      }
      g.restore();
    }
    TEX.hull = finish(THREE, cv, true);
    return TEX.hull;
  }

  /* --- the deck plan: every weather deck, red-brown as the colour
     photograph has them; the landing circles where the drawing puts them.
     Ivan Rogov (e80) carries the dark square round the after circle that
     the colour photograph shows.                                         */
  /* the forward circle: the drawing has it at x 30.5, but the 1982 and
     1994 photographs both put it some nine metres aft of the forecastle
     front; the photographs win                                            */
  var PAD_A = -71.0, PAD_F = 43.0;
  function deckTex(THREE, era) {
    var key = "deck" + (era === "e80" ? "80" : "90");
    if (TEX[key]) return TEX[key];
    var W = 2048, H = 336, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(4417), i;
    var SX = W / LOA, SY = H / (2 * DYH);
    function cx(x) { return (x - XS) * SX; }
    function cy(y) { return H - (y + DYH) * SY; }
    g.fillStyle = C_DECK; g.fillRect(0, 0, W, H);
    for (i = 0; i < 220; i++) {
      g.globalAlpha = 0.02 + R() * 0.035;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 30 + R() * 160, 10 + R() * 40);
    }
    g.globalAlpha = 0.18; g.fillStyle = "#000000";
    for (i = 0; i < 3500; i++) g.fillRect(R() * W, R() * H, 1.5, 1.5);
    g.globalAlpha = 1;
    g.fillStyle = "rgba(0,0,0,0.22)";
    for (i = 0; i <= 157; i += 6) g.fillRect(cx(XS + i), 0, 1.2, H);
    for (i = -12; i <= 12; i += 2) g.fillRect(0, cy(i), W, 1.2);
    /* the after pad                                                        */
    if (era === "e80") { g.fillStyle = C_PADSQ; g.fillRect(cx(PAD_A - 7.5), cy(7.5), 15 * SX, 15 * SY); }
    g.strokeStyle = C_MARK; g.fillStyle = C_MARK;
    g.lineWidth = 0.45 * SX;
    g.beginPath(); g.ellipse(cx(PAD_A), cy(0), 5.0 * SX, 5.0 * SY, 0, 0, 2 * PI); g.stroke();
    g.fillRect(cx(PAD_A + 5.0), cy(0.22), cx(XBA - 1.2) - cx(PAD_A + 5.0), 0.44 * SY);
    g.fillRect(cx(PAD_A) - 0.22 * SX, cy(11.6), 0.44 * SX, 6.6 * SY);
    g.fillRect(cx(PAD_A) - 0.22 * SX, cy(-5.0), 0.44 * SX, 6.6 * SY);
    g.fillRect(cx(PAD_A - 1.6), cy(0.2), 3.2 * SX, 0.4 * SY);
    /* the forward pad: the circle near the forecastle (1982) and the lanes
       the drawing runs the length of the forward deck                      */
    g.fillStyle = "rgba(20,14,12,0.45)";
    [5.6, 2.2, -2.2, -5.6].forEach(function (y) { g.fillRect(cx(-1.0), cy(y + 0.12), cx(XFC - 1.0) - cx(-1.0), 0.24 * SY); });
    g.strokeStyle = C_MARK; g.lineWidth = 0.42 * SX;
    g.beginPath(); g.ellipse(cx(PAD_F), cy(0), 4.9 * SX, 4.9 * SY, 0, 0, 2 * PI); g.stroke();
    g.fillStyle = C_MARK; g.fillRect(cx(PAD_F - 1.5), cy(0.2), 3.0 * SX, 0.4 * SY);
    g.fillRect(cx(PAD_F) - 0.2 * SX, cy(1.5), 0.4 * SX, 3.0 * SY);
    /* tie-downs on both pads                                               */
    g.fillStyle = "rgba(8,6,5,0.55)";
    var tx, ty;
    for (tx = -77; tx < -56; tx += 2.0) for (ty = -10.5; ty <= 10.6; ty += 2.0) g.fillRect(cx(tx), cy(ty), 2.2, 2.2);
    for (tx = 35; tx < 51; tx += 2.0) for (ty = -8; ty <= 8.1; ty += 2.0) g.fillRect(cx(tx), cy(ty), 2.2, 2.2);
    /* forecastle: chain pipes and hatches                                  */
    g.fillStyle = "rgba(8,9,10,0.85)";
    [1.6, -1.6].forEach(function (y) { g.beginPath(); g.arc(cx(73.0), cy(y), 4.5, 0, 2 * PI); g.fill(); });
    g.strokeStyle = "rgba(10,11,12,0.7)"; g.lineWidth = 2;
    g.strokeRect(cx(56.0), cy(3.5), 1.6 * SX, 1.4 * SY); g.strokeRect(cx(56.0), cy(-2.1), 1.6 * SX, 1.4 * SY);
    /* the block roof: hatches                                              */
    g.strokeRect(cx(-15.0), cy(10.8), 2.0 * SX, 1.4 * SY); g.strokeRect(cx(-15.0), cy(-9.4), 2.0 * SX, 1.4 * SY);
    TEX[key] = finish(THREE, cv, true);
    return TEX[key];
  }

  function supTex(THREE) {
    if (TEX.sup) return TEX.sup;
    var W = 512, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(3316), i;
    g.fillStyle = hx(C_SUP); g.fillRect(0, 0, W, H);
    for (i = 0; i < 40; i++) {
      g.globalAlpha = 0.012 + R() * 0.02;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 40 + R() * 150, 20 + R() * 90);
    }
    g.globalAlpha = 1;
    for (i = 0; i < 4; i++) {
      g.fillStyle = "rgba(0,0,0,0.22)"; g.fillRect(0, i * 128, W, 1.5);
      g.fillStyle = "rgba(255,255,255,0.06)"; g.fillRect(0, i * 128 + 2, W, 1.5);
    }
    for (i = 0; i < 5; i++) { g.fillStyle = "rgba(0,0,0,0.14)"; g.fillRect(i * 102.4 + 30, 0, 1.5, H); }
    for (i = 0; i < 22; i++) {
      var sx = R() * W, sy = R() * H, len = 30 + R() * 80;
      var gr = g.createLinearGradient(0, sy, 0, sy + len);
      gr.addColorStop(0, "rgba(40,30,24,0.18)"); gr.addColorStop(1, "rgba(40,30,24,0)");
      g.fillStyle = gr; g.fillRect(sx, sy, 2 + R() * 3, len);
    }
    TEX.sup = finish(THREE, cv);
    return TEX.sup;
  }

  /* ================================================================= hull
     Lofted stern to stem through STATIONS. Quads between the sill row and
     the door-top row forward of XDOOR are the bow doors and go to their
     own list; the static skin above the seam gets a dark inner face so the
     open bow shows a compartment, not the sky.                            */
  function hullGeo() {
    var st = STATIONS, i, j, s;
    var secs = st.map(section);
    var faces = [];
    function V(ii, jj, side) { var q = secs[ii][jj]; return [st[ii], side * q[0], q[1]]; }
    function key(ii, jj, side) { return (side > 0 ? 0 : 1e6) + ii * 100 + jj; }
    function tri(a, b, c, ka, kb, kc, side, door) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var ar = Math.sqrt(nx * nx + ny * ny + nz * nz);
      if (ar < 2e-5) return;
      faces.push({ p: [a, b, c], k: [ka, kb, kc], n: [nx, ny, nz], u: [nx / ar, ny / ar, nz / ar], s: side, d: door });
    }
    var inner = [];
    for (i = 0; i < st.length - 1; i++) {
      for (j = 0; j < ROWS - 1; j++) {
        var door = st[i] >= XDOOR - 1e-6 && j === 6;
        var lid = st[i] >= XDOOR - 1e-6 && j === 7;
        for (s = 1; s >= -1; s -= 2) {
          var kA = key(i, j, s), kB = key(i + 1, j, s), kC = key(i + 1, j + 1, s), kD = key(i, j + 1, s);
          var A = V(i, j, s), Bq = V(i + 1, j, s), Cq = V(i + 1, j + 1, s), D = V(i, j + 1, s);
          if (s > 0) { tri(A, D, Bq, kA, kD, kB, s, door); tri(Bq, D, Cq, kB, kD, kC, s, door); }
          else { tri(A, Bq, D, kA, kB, kD, s, door); tri(Bq, Cq, D, kB, kC, kD, s, door); }
          if (lid) inner.push([A, Bq, Cq, D, s]);
        }
      }
    }
    /* the transom: the station-0 outline, the pad's edge across the top,
       and the gate opening cut out of it                                  */
    var ring = [];
    for (j = ROWS - 1; j >= 0; j--) ring.push(V(0, j, 1));
    for (j = 1; j < ROWS; j++) ring.push(V(0, j, -1));
    var cont = [];
    ring.forEach(function (q) {
      var l = cont[cont.length - 1];
      if (l && Math.abs(l[0] - q[1]) < 1e-4 && Math.abs(l[1] - q[2]) < 1e-4) return;
      cont.push([q[1], q[2]]);
    });
    return { faces: faces, inner: inner, transom: cont };
  }

  /* ================================================================ build */
  function build(THREE, Mdl, C, era) {
    var root = new THREE.Group();
    var i, s, x, k;
    var team = C && C.team !== undefined ? C.team : "#d6503f";
    var mosk = era !== "e80";

    var T = {};
    T.H = new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.86, metalness: 0.07 });
    T.D = new THREE.MeshStandardMaterial({ color: 0xffffff, map: deckTex(THREE, era), roughness: 0.94, metalness: 0.04 });
    T.S = new THREE.MeshStandardMaterial({ color: 0xffffff, map: supTex(THREE), roughness: 0.86, metalness: 0.07 });
    T.M = new THREE.MeshStandardMaterial({ color: 0x4a5258, roughness: 0.55, metalness: 0.40 });
    T.K = new THREE.MeshStandardMaterial({ color: 0x121416, roughness: 0.85, metalness: 0.08 });
    T.G = new THREE.MeshStandardMaterial({ color: 0x0f1a22, roughness: 0.10, metalness: 0.0, transparent: true, opacity: 0.88,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    T.W = new THREE.MeshStandardMaterial({ color: 0xc4c7c4, roughness: 0.70, metalness: 0.04 });
    T.A = new THREE.MeshStandardMaterial({ color: 0x9aa2a7, roughness: 0.60, metalness: 0.08 });
    T.T = new THREE.MeshStandardMaterial({ color: new THREE.Color(team), roughness: 0.60, metalness: 0.10,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    var B = {};
    Object.keys(T).forEach(function (kk) { B[kk] = new Batch(kk === "S" ? 8 : 0); });
    function addT(batch, tr) { var g = tr.geo(THREE); batch.add(batch === B.D ? planUV(g) : g); }

    /* ------------------------------------------------------------- hull */
    var HG = hullGeo();
    var around = {}, COS = Math.cos(38 * PI / 180);
    HG.faces.forEach(function (f, fi) { f.k.forEach(function (kk) { (around[kk] || (around[kk] = [])).push(fi); }); });
    var hs = { pos: [], nrm: [], uv: [] }, ds = { pos: [], nrm: [], uv: [] };
    var HX = XDOOR, HZ = ZSILL;                       /* the bow hinge        */
    HG.faces.forEach(function (f) {
      var tgt = f.d ? ds : hs;
      for (var c = 0; c < 3; c++) {
        var q = f.p[c], sx = 0, sy = 0, sz = 0;
        around[f.k[c]].forEach(function (gi) {
          var g2 = HG.faces[gi];
          if (g2.d !== f.d) return;
          if (g2.u[0] * f.u[0] + g2.u[1] * f.u[1] + g2.u[2] * f.u[2] < COS) return;
          sx += g2.n[0]; sy += g2.n[1]; sz += g2.n[2];
        });
        var l = Math.sqrt(sx * sx + sy * sy + sz * sz) || 1;
        if (f.d) tgt.pos.push(q[0] - HX, q[1], q[2] - HZ); else tgt.pos.push(q[0], q[1], q[2]);
        tgt.nrm.push(sx / l, sy / l, sz / l);
        tgt.uv.push(clamp((q[0] - XS) / LOA, 0.0005, 0.9995), (f.s > 0 ? 0.5 : 0) + 0.5 * clamp((q[2] - HZ0) / (HZ1 - HZ0), 0.002, 0.998));
      }
    });
    B.H.raw(hs.pos, hs.nrm, hs.uv);
    /* the inside of the static skin above the door seam                    */
    var tin = new Tris();
    HG.inner.forEach(function (q) {
      /* the quad's outward normal, from its two diagonals, turned to its side */
      var A = q[0], Bq = q[1], Cq = q[2], D = q[3];
      var ux = Cq[0] - A[0], uy = Cq[1] - A[1], uz = Cq[2] - A[2], vx = D[0] - Bq[0], vy = D[1] - Bq[1], vz = D[2] - Bq[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx, nl = Math.sqrt(nx * nx + ny * ny + nz * nz);
      if (nl < 1e-8) return;
      if (ny * q[4] < 0) { nx = -nx; ny = -ny; nz = -nz; }
      nx /= nl; ny /= nl; nz /= nl;
      var m = q.slice(0, 4).map(function (p) { return [p[0] - 0.3 * nx, p[1] - 0.3 * ny, p[2] - 0.3 * nz]; });
      tin.quad(m[0], m[1], m[2], m[3], [-nx, -ny, -nz]);
    });
    addT(B.K, tin);

    /* the transom with the gate opening cut out of it                      */
    (function () {
      var cont = HG.transom.map(function (q) { return new THREE.Vector2(q[0], q[1]); });
      if (cont.length > 2 && cont[0].distanceTo(cont[cont.length - 1]) < 1e-4) cont.pop();
      var hole = [new THREE.Vector2(-WHW, WZ0), new THREE.Vector2(WHW, WZ0), new THREE.Vector2(WHW, WZ1), new THREE.Vector2(-WHW, WZ1)];
      /* and the two gallery openings high in its corners (85-07169)        */
      var hl = [new THREE.Vector2(TG0, TZ0), new THREE.Vector2(TG1, TZ0), new THREE.Vector2(TG1, TZ1), new THREE.Vector2(TG0, TZ1)];
      var hr = [new THREE.Vector2(-TG1, TZ0), new THREE.Vector2(-TG0, TZ0), new THREE.Vector2(-TG0, TZ1), new THREE.Vector2(-TG1, TZ1)];
      var tf = THREE.ShapeUtils.triangulateShape(cont, [hole, hl, hr]), tp = cont.concat(hole, hl, hr), pos = [], nrm = [], uv = [];
      tf.forEach(function (f) {
        var a = tp[f[0]], b = tp[f[1]], c = tp[f[2]];
        if ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) > 0) { var t0 = b; b = c; c = t0; }
        [a, b, c].forEach(function (p) {
          pos.push(XS, p.x, p.y); nrm.push(-1, 0, 0);
          uv.push(0.002, 0.5 + 0.5 * clamp((p.y - HZ0) / (HZ1 - HZ0), 0.002, 0.998));
        });
      });
      B.H.raw(pos, nrm, uv);
      /* the recesses behind the two gallery openings                       */
      var tr = new Tris();
      for (s = -1; s <= 1; s += 2) {
        var y0 = s * TG0, y1 = s * TG1, x1 = XS + 1.8;
        tr.quad([x1, y0, TZ0], [x1, y1, TZ0], [x1, y1, TZ1], [x1, y0, TZ1], [-1, 0, 0]);
        tr.quad([XS, y0, TZ0], [x1, y0, TZ0], [x1, y1, TZ0], [XS, y1, TZ0], [0, 0, 1]);
        tr.quad([XS, y0, TZ1], [x1, y0, TZ1], [x1, y1, TZ1], [XS, y1, TZ1], [0, 0, -1]);
        tr.quad([XS, y0, TZ0], [x1, y0, TZ0], [x1, y0, TZ1], [XS, y0, TZ1], [0, s, 0]);
        tr.quad([XS, y1, TZ0], [x1, y1, TZ0], [x1, y1, TZ1], [XS, y1, TZ1], [0, -s, 0]);
      }
      B.K.add(tr.geo(THREE));
      for (s = -1; s <= 1; s += 2) B.M.add(strut(THREE, XS + 0.2, s * TG0, TZ0 + 1.0, XS + 0.2, s * TG1, TZ0 + 1.0, 0.04, 3, undefined, true));
    })();

    /* ------------------------------------------------- decks and faces */
    function deckStrip(x0, x1, zf, n, inset) {
      var xs = [x0];
      STATIONS.forEach(function (sx) { if (sx > x0 + 0.05 && sx < x1 - 0.05) xs.push(sx); });
      xs.push(x1);
      var tr = new Tris();
      for (var a = 0; a < xs.length - 1; a++) {
        var xa = xs[a], xb = xs[a + 1];
        var za = zf(xa), zb = zf(xb), ha = Math.max(0, halfB(Math.min(xa, XB - 0.01), za) - inset), hb = Math.max(0, halfB(Math.min(xb, XB - 0.01), zb) - inset);
        if (xb >= XB - 1e-6) hb = 0;
        for (var q = 0; q < n; q++) {
          var t0 = -1 + 2 * q / n, t1 = -1 + 2 * (q + 1) / n;
          tr.quad([xa, ha * t0, za], [xb, hb * t0, zb], [xb, hb * t1, zb], [xa, ha * t1, za], [0, 0, 1]);
        }
      }
      return tr;
    }
    addT(B.D, deckStrip(XS, XBA, function () { return ZPAD; }, 6, 0.0));
    addT(B.D, deckStrip(XBA, XBF, function () { return ZBLK; }, 6, 0.0));
    addT(B.D, deckStrip(XBF, XFC, function () { return ZFWD; }, 6, 0.0));
    addT(B.D, deckStrip(XFC, XB, function (xx) { return tbl(ZFCT, xx); }, 6, 0.0));

    /* the block's after and forward faces, the forecastle front           */
    (function () {
      var tr = new Tris(), hwA = halfB(XBA, 16), hwF = halfB(XBF, 14);
      tr.quad([XBA, -hwA, ZPAD], [XBA, hwA, ZPAD], [XBA, hwA, ZBLK], [XBA, -hwA, ZBLK], [-1, 0, 0]);
      tr.quad([XBF, -hwF, ZFWD], [XBF, hwF, ZFWD], [XBF, hwF, ZBLK], [XBF, -hwF, ZBLK], [1, 0, 0]);
      var hc0 = halfB(XFC, ZFWD + 0.1), hc1 = halfB(XFC, ZFC0);
      tr.quad([XFC, -hc0, ZFWD], [XFC, hc0, ZFWD], [XFC, hc1, ZFC0], [XFC, -hc1, ZFC0], [-1, 0, 0]);
      /* the inboard faces of the two fillets and of the rise              */
      for (s = -1; s <= 1; s += 2) {
        var prevF = null, prevR = null;
        for (k = 0; k <= 10; k++) {
          var xf = XBF + RF * k / 10, zf = zD(XBF + Math.max(1e-3, RF * k / 10)), yf = s * (halfB(xf, 9) - 0.25);
          if (prevF) tr.quad(prevF[0], [xf, yf, ZFWD], [xf, yf, zf], prevF[1], [0, -s, 0]);
          prevF = [[xf, yf, ZFWD], [xf, yf, zf]];
          var xr = XR0 + (XFC - XR0) * k / 10, zr = zD(Math.min(XFC - 1e-3, xr)), yr = s * (halfB(xr, ZFWD) - 0.25);
          if (prevR) tr.quad(prevR[0], [xr, yr, ZFWD], [xr, yr, zr], prevR[1], [0, -s, 0]);
          prevR = [[xr, yr, ZFWD], [xr, yr, zr]];
        }
        /* and the fillet's top edge, 0.25 m wide                          */
        for (k = 0; k < 10; k++) {
          var xa = XBF + RF * k / 10, xb2 = XBF + RF * (k + 1) / 10;
          var za = zD(Math.max(XBF + 1e-3, xa)), zb = zD(xb2);
          var yo = s * halfB(xa, za), yo2 = s * halfB(xb2, zb);
          tr.quad([xa, yo, za], [xb2, yo2, zb], [xb2, yo2 - s * 0.25, zb], [xa, yo - s * 0.25, za], [0, 0, 1]);
        }
      }
      B.S.add(tr.geo(THREE));
    })();

    /* ------------------------------------------- the well behind the gate */
    (function () {
      /* drawn to a metre short of the block's forward face, under which the
         forward deck is lower than the well's deckhead                     */
      var tr = new Tris(), xf = Math.min(XS + WLEN, XBF - 1.0);
      var fl = [[XS, -WHW, WZ0], [xf, -WHW, WZ0], [xf, WHW, WZ0], [XS, WHW, WZ0]];
      tr.quad(fl[0], fl[1], fl[2], fl[3], [0, 0, 1]);
      tr.quad([XS, -WHW, WZ1], [xf, -WHW, WZ1], [xf, WHW, WZ1], [XS, WHW, WZ1], [0, 0, -1]);
      for (s = -1; s <= 1; s += 2)
        tr.quad([XS, s * WHW, WZ0], [xf, s * WHW, WZ0], [xf, s * WHW, WZ1], [XS, s * WHW, WZ1], [0, -s, 0]);
      tr.quad([xf, -WHW, WZ0], [xf, WHW, WZ0], [xf, WHW, WZ1], [xf, -WHW, WZ1], [-1, 0, 0]);
      B.K.add(tr.geo(THREE));
      for (i = 0; i < 6; i++) for (s = -1; s <= 1; s += 2) B.W.add(box(THREE, 1.6, 0.5, 0.12, XS + 8 + i * 11, s * 3.6, WZ1 - 0.08));
      B.M.add(box(THREE, 0.6, 2 * WHW, 0.3, XS + 0.35, 0, WZ0 + 0.15));
      /* the gate's side frames, inside the transom line                    */
      for (s = -1; s <= 1; s += 2) B.S.add(box(THREE, 0.6, 0.5, WZ1 - WZ0, XS + 0.3, s * (WHW + 0.25), (WZ0 + WZ1) / 2));
      B.S.add(box(THREE, 0.6, 2 * WHW + 1.0, 0.5, XS + 0.3, 0, WZ1 + 0.25));
    })();

    /* --------------------------- the bow compartment and the tank deck */
    (function () {
      var tr = new Tris(), XT = 45.0, TH = 4.2, TZ = 7.2;
      /* floor of the compartment at the sill, out to the hull skin         */
      var xs = [XDOOR], xx;
      for (xx = XDOOR + 0.8; xx < xStem(ZSILL); xx += 0.8) xs.push(xx);
      xs.push(xStem(ZSILL) - 0.02);
      for (k = 0; k < xs.length - 1; k++) {
        var ha = halfB(xs[k], ZSILL + 0.01) - 0.03, hb = halfB(xs[k + 1], ZSILL + 0.01) - 0.03;
        tr.quad([xs[k], -ha, ZSILL], [xs[k + 1], -hb, ZSILL], [xs[k + 1], hb, ZSILL], [xs[k], ha, ZSILL], [0, 0, 1]);
      }
      /* its deckhead under the forecastle                                  */
      xs = [XDOOR];
      for (xx = XDOOR + 0.8; xx < xStem(ZDTOP); xx += 0.8) xs.push(xx);
      xs.push(xStem(ZDTOP) - 0.02);
      for (k = 0; k < xs.length - 1; k++) {
        var hc = halfB(xs[k], ZDTOP) - 0.03, hd = halfB(xs[k + 1], ZDTOP) - 0.03;
        tr.quad([xs[k], -hc, ZDTOP], [xs[k + 1], -hd, ZDTOP], [xs[k + 1], hd, ZDTOP], [xs[k], hc, ZDTOP], [0, 0, -1]);
      }
      /* its after bulkhead with the tunnel mouth                           */
      for (s = -1; s <= 1; s += 2) {
        for (k = 0; k < 8; k++) {
          var za = lerp(ZSILL, ZDTOP, k / 8), zb = lerp(ZSILL, ZDTOP, (k + 1) / 8);
          var ya = Math.max(TH, halfB(XDOOR, za + 0.01) - 0.06), yb = Math.max(TH, halfB(XDOOR, zb) - 0.06);
          tr.quad([XDOOR, s * TH, za], [XDOOR, s * ya, za], [XDOOR, s * yb, zb], [XDOOR, s * TH, zb], [1, 0, 0]);
        }
      }
      tr.quad([XDOOR, -TH, TZ], [XDOOR, TH, TZ], [XDOOR, TH, ZDTOP], [XDOOR, -TH, ZDTOP], [1, 0, 0]);
      /* the tunnel                                                         */
      tr.quad([XT, -TH, ZSILL], [XDOOR, -TH, ZSILL], [XDOOR, TH, ZSILL], [XT, TH, ZSILL], [0, 0, 1]);
      tr.quad([XT, -TH, TZ], [XDOOR, -TH, TZ], [XDOOR, TH, TZ], [XT, TH, TZ], [0, 0, -1]);
      for (s = -1; s <= 1; s += 2) tr.quad([XT, s * TH, ZSILL], [XDOOR, s * TH, ZSILL], [XDOOR, s * TH, TZ], [XT, s * TH, TZ], [0, -s, 0]);
      tr.quad([XT, -TH, ZSILL], [XT, TH, ZSILL], [XT, TH, TZ], [XT, -TH, TZ], [1, 0, 0]);
      B.K.add(tr.geo(THREE));
    })();

    /* underwater: twin shafts, props and rudders, bilge keels             */
    function uvAt(geo, u, v) {
      var Uv = geo.getAttribute("uv");
      if (Uv) for (var q = 0; q < Uv.count; q++) Uv.setXY(q, u, v);
      return geo;
    }
    for (s = -1; s <= 1; s += 2) {
      B.H.add(uvAt(strut(THREE, -40.0, s * 4.6, -6.0, -70.5, s * 4.6, -3.9, 0.35, 8), 0.5, 0.01));
      B.H.add(uvAt(strut(THREE, -66.5, s * 4.6, -2.6, -66.5, s * 4.6, -4.4, 0.18, 5), 0.5, 0.01));
      B.H.add(uvAt(cylZ(THREE, 1.9, 1.9, 0.35, 14, 0, 0, -0.17), 0.5, 0.01).rotateY(PI / 2).translate(-71.5, s * 4.6, -3.85));
      B.H.add(uvAt(box(THREE, 3.6, 0.4, 4.0, -75.6, s * 4.6, -1.9), 0.5, 0.01));
      B.H.add(uvAt(box(THREE, 70.0, 0.3, 1.1, -5.0, s * (halfB(-5.0, -6.15) + 0.2), -6.15, s * 0.8, 0, 0), 0.5, 0.01));
    }

    /* --------------------------------------------- after pad and stern */
    /* the deckhouse on the port side of the pad (colour; 85-07169)        */
    B.S.add(stack(THREE, [[rrect(-59.0, XBA, 4.6, 11.4, 0.6), ZPAD], [rrect(-58.8, XBA, 4.8, 11.3, 0.5), ZPAD + 3.6]], true, false));
    B.G.add(box(THREE, 0.1, 5.2, 0.8, -59.05, 8.0, ZPAD + 2.6));
    B.K.add(box(THREE, 0.14, 1.0, 2.0, -59.05, 5.6, ZPAD + 1.0));
    /* the hangar door in the block's after face (colour photograph)       */
    B.S.add(box(THREE, 0.16, 3.5, 5.6, XBA - 0.08, -4.3, ZPAD + 2.8));
    B.S.add(box(THREE, 0.16, 3.5, 5.6, XBA - 0.08, -0.7, ZPAD + 2.8));
    B.K.add(box(THREE, 0.12, 7.6, 0.25, XBA - 0.06, -2.5, ZPAD + 5.75));
    B.K.add(box(THREE, 0.12, 0.2, 5.6, XBA - 0.06, -2.5, ZPAD + 2.8));
    B.K.add(box(THREE, 0.12, 1.0, 2.0, XBA - 0.06, -9.0, ZPAD + 1.0));
    /* a ladder up the after face to the block roof, starboard            */
    B.M.add(strut(THREE, XBA - 0.5, -10.6, ZPAD, XBA - 0.5, -10.6, ZBLK, 0.06, 4));
    B.M.add(strut(THREE, XBA - 0.5, -11.3, ZPAD, XBA - 0.5, -11.3, ZBLK, 0.06, 4));

    /* rails: top and middle rail, stanchions every 2.5 m                  */
    function railRun(pts, h) {
      var kk, carry = 0; h = h || 1.1;
      function post(px, py, pz) { B.M.add(strut(THREE, px, py, pz, px, py, pz + h, 0.04, 3, undefined, true)); }
      for (kk = 0; kk < pts.length - 1; kk++) {
        var a = pts[kk], b = pts[kk + 1];
        var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
        var len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (len < 0.05) continue;
        [h, h * 0.5].forEach(function (hh) { B.M.add(strut(THREE, a[0], a[1], a[2] + hh, b[0], b[1], b[2] + hh, 0.04, 3, undefined, true)); });
        var t = carry;
        for (; t < len; t += 3.0) post(lerp(a[0], b[0], t / len), lerp(a[1], b[1], t / len), lerp(a[2], b[2], t / len));
        carry = t - len;
      }
      var e = pts[pts.length - 1];
      post(e[0], e[1], e[2]);
    }
    for (s = -1; s <= 1; s += 2) {
      railRun([[XS + 0.15, s * (halfB(XS + 0.15, ZPAD) - 0.1), ZPAD], [XBA - 0.4, s * (halfB(XBA - 0.4, ZPAD) - 0.1), ZPAD]]);
      /* forward deck, from the fillet to the forecastle                   */
      var fw = [];
      for (x = XBF + RF; x <= XR0 + 0.01; x += 5.4) fw.push([x, s * (halfB(x, ZFWD) - 0.1), ZFWD]);
      railRun(fw);
      /* forecastle to the stem                                             */
      var fc = [];
      for (x = XFC + 0.3; x < 78.2; x += 2.6) fc.push([x, s * (halfB(x, tbl(ZFCT, x)) - 0.12), tbl(ZFCT, x)]);
      fc.push([78.45, s * 0.6, tbl(ZFCT, 78.45)]);
      railRun(fc);
      /* the block roof's edges                                             */
      railRun([[XBA + 0.3, s * 11.75, ZBLK], [XBF - 0.3, s * 11.75, ZBLK]]);
    }
    railRun([[XS + 0.15, 11.6, ZPAD], [XS + 0.15, 4.0, ZPAD]]);
    railRun([[XS + 0.15, -4.0, ZPAD], [XS + 0.15, -11.6, ZPAD]]);
    railRun([[XBA + 0.3, 11.75, ZBLK], [XBA + 0.3, -11.75, ZBLK]]);
    railRun([[XBF - 0.3, 11.75, ZBLK], [XBF - 0.3, -11.75, ZBLK]]);

    /* ----------------------------------------- the block's forward face */
    /* the big door (1982, 1994), the window row near the top              */
    B.K.add(box(THREE, 0.16, 6.2, 6.6, XBF + 0.08, 0.9, ZFWD + 3.3));
    B.M.add(box(THREE, 0.2, 6.6, 0.3, XBF + 0.1, 0.9, ZFWD + 6.75));
    for (i = 0; i < 9; i++) {
      var wy = -9.0 + i * 2.25;
      B.G.add(box(THREE, 0.1, 0.9, 0.75, XBF + 0.05, wy, 18.2));
      if (i % 2 === 0 && Math.abs(wy) > 4.5) B.G.add(box(THREE, 0.1, 0.9, 0.75, XBF + 0.05, wy, 15.6));
    }

    /* the starboard tower: raft racks in three tiers on its outboard face,
       a platform on top with the launcher (1982, amidships, drawing)      */
    (function () {
      var x0 = XBF + 0.1, x1 = 8.6, yi = -6.0, yo = -11.3, zt = 17.6;
      B.S.add(stack(THREE, [[rrect(x0, x1, yo + 1.6, yi, 0.3), ZFWD], [rrect(x0, x1, yo + 1.6, yi, 0.3), zt]], true, false));
      /* the open galleries: shelves, uprights and canisters                */
      [9.0, 11.7, 14.4].forEach(function (zb) {
        B.S.add(box(THREE, x1 - x0, 1.7, 0.18, (x0 + x1) / 2, yo + 0.85, zb - 0.5));
        B.K.add(box(THREE, x1 - x0 - 0.2, 0.08, 2.4, (x0 + x1) / 2, yo + 1.62, zb + 0.7));
        for (var cx2 = x0 + 0.95; cx2 < x1 - 0.6; cx2 += 1.45) {
          var can = new THREE.CylinderGeometry(0.42, 0.42, 1.25, 6);
          can.rotateZ(PI / 2);
          B.W.add(place(THREE, can, cx2, yo + 0.75, zb - 0.0));
          B.W.add(place(THREE, new THREE.CylinderGeometry(0.42, 0.42, 1.25, 6).rotateZ(PI / 2), cx2, yo + 0.75, zb + 0.9));
        }
        railRun([[x0 + 0.2, yo + 0.12, zb - 0.41], [x1 - 0.2, yo + 0.12, zb - 0.41]], 0.9);
      });
      B.S.add(box(THREE, x1 - x0, 1.7, 0.2, (x0 + x1) / 2, yo + 0.85, zt - 0.1));
      for (var ux = x0 + 0.2; ux < x1; ux += 3.0) B.M.add(strut(THREE, ux, yo + 0.1, ZFWD, ux, yo + 0.1, zt, 0.08, 4));
      /* a door in its forward face                                         */
      B.K.add(box(THREE, 0.12, 1.0, 2.0, x1 + 0.06, -7.5, ZFWD + 1.0));
      /* the launcher on its platform: a box of tubes on a trunnion carriage */
      B.S.add(cylZ(THREE, 1.0, 1.15, 0.6, 12, 3.4, -8.6, zt));
      B.S.add(box(THREE, 1.4, 1.2, 1.0, 3.4, -8.6, zt + 1.0));
      B.S.add(box(THREE, 3.0, 2.3, 1.25, 3.6, -8.6, zt + 2.0, 0, -0.12, 0));
      B.K.add(box(THREE, 0.08, 2.1, 1.05, 5.12, -8.6, zt + 2.18, 0, -0.12, 0));
      railRun([[x0 + 0.2, yo + 0.4, zt], [x1 - 0.2, yo + 0.4, zt], [x1 - 0.2, yi - 0.2, zt]]);
    })();

    /* the port side ahead of the block: a deckhouse and the launch on its
       chocks with a davit (1982, 1994)                                     */
    B.S.add(stack(THREE, [[rrect(XBF + 0.1, 2.6, 6.2, 11.2, 0.4), ZFWD], [rrect(XBF + 0.1, 2.4, 6.3, 11.1, 0.4), ZFWD + 4.3]], true, false));
    B.G.add(box(THREE, 0.1, 3.6, 0.8, 2.62, 8.7, ZFWD + 3.2));
    B.K.add(box(THREE, 0.12, 1.0, 2.0, 2.62, 6.9, ZFWD + 1.0));
    function launch(L, x0, y0, z0) {
      var hwb = 1.35;
      var plan = [[0, -hwb * 0.8], [L * 0.7, -hwb], [L * 0.92, -hwb * 0.6], [L, 0], [L * 0.92, hwb * 0.6], [L * 0.7, hwb], [0, hwb * 0.8]];
      var bot = plan.map(function (q) { return [q[0] * 0.94 + L * 0.03, q[1] * 0.55]; });
      var g = stack(THREE, [[bot, 0], [plan, 1.3]], true, true);
      g.translate(x0, y0, z0);
      B.W.add(g);
      B.W.add(box(THREE, L * 0.42, hwb * 1.5, 0.9, x0 + L * 0.42, y0, z0 + 1.75));
      B.G.add(box(THREE, 0.08, hwb * 1.3, 0.45, x0 + L * 0.63 + 0.05, y0, z0 + 1.85));
      B.M.add(box(THREE, 0.4, hwb * 1.8, 0.5, x0 + L * 0.25, y0, z0 - 0.2));
      B.M.add(box(THREE, 0.4, hwb * 1.8, 0.5, x0 + L * 0.75, y0, z0 - 0.2));
    }
    launch(8.6, 3.6, 8.5, ZFWD + 0.45);
    B.M.add(strut(THREE, 13.0, 10.6, ZFWD, 13.0, 10.6, ZFWD + 5.2, 0.16, 6));
    B.M.add(strut(THREE, 13.0, 10.6, ZFWD + 5.0, 9.0, 9.0, ZFWD + 5.6, 0.1, 5));

    /* ------------------------------------------------ the upper works
       01 level over most of the block; the funnel block aft with the
       lattice mast; the bridge block forward with the pyramid mast; the
       upper bridge. Roofs in deck paint, walls in plate.                 */
    function tier(pts, z0, z1) {
      B.S.add(stack(THREE, [[pts, z0], [pts, z1]], false, false));
      var P2 = ccw(pts), tr = new Tris();
      for (var q = 1; q < P2.length - 1; q++) tr.tri([P2[0][0], P2[0][1], z1], [P2[q][0], P2[q][1], z1], [P2[q + 1][0], P2[q + 1][1], z1], [0, 0, 1]);
      addT(B.D, tr);
    }
    var Z1 = 23.6, Z2 = 27.2, Z3 = 30.8, ZFN = 28.6;
    tier(chamRect(-44.0, -6.0, 9.6, 1.6), ZBLK - 0.05, Z1);
    tier(chamRect(-40.5, -26.0, 6.4, 1.0), Z1 - 0.05, ZFN);
    tier(chamRect(-24.5, -7.0, 7.0, 1.2), Z1 - 0.05, Z2);
    tier(chamRect(-17.5, -9.0, 4.6, 0.9), Z2 - 0.05, Z3);
    /* windows: the bridge front and sides, the upper bridge              */
    B.G.add(box(THREE, 0.1, 9.6, 0.95, -6.97, 0, Z2 - 1.15));
    for (s = -1; s <= 1; s += 2) {
      B.G.add(box(THREE, 5.0, 0.1, 0.9, -10.5, s * 7.02, Z2 - 1.15));
      B.G.add(box(THREE, 3.6, 0.1, 0.8, -12.0, s * 4.62, Z3 - 1.1));
      for (x = -42.0; x < -8.0; x += 3.2) if (x < -27 || x > -24) B.G.add(box(THREE, 0.9, 0.1, 0.7, x, s * 9.62, Z1 - 1.3));
    }
    B.G.add(box(THREE, 0.1, 6.2, 0.8, -8.97, 0, Z3 - 1.1));
    /* rails round the 01 roof                                             */
    (function () {
      var P8 = chamRect(-43.8, -6.2, 9.4, 1.5).map(function (q) { return [q[0], q[1], Z1]; });
      railRun(P8.concat([P8[0]]));
    })();
    /* the funnel's exhaust grilles on the funnel block (colour, 85-07169)  */
    B.S.add(box(THREE, 5.6, 6.2, 0.6, -29.2, 0, ZFN + 0.3));
    for (i = 0; i < 7; i++) B.K.add(box(THREE, 0.45, 5.8, 0.08, -31.6 + i * 0.8, 0, ZFN + 0.62));

    /* the lattice mast on the funnel block's after part, a platform and a
       small radar at its head (85-07169, colour, 1994)                    */
    (function () {
      var mx = -36.0, z0 = ZFN, z1 = 37.4, b0 = 1.0, b1 = 0.38;
      var c0 = [[1, 1], [1, -1], [-1, -1], [-1, 1]];
      c0.forEach(function (c) { B.M.add(strut(THREE, mx + c[0] * b0, c[1] * b0, z0, mx + c[0] * b1, c[1] * b1, z1, 0.08, 4)); });
      for (var lv = 0; lv < 4; lv++) {
        var za = z0 + (z1 - z0) * lv / 4, zb = z0 + (z1 - z0) * (lv + 1) / 4;
        var ba = lerp(b0, b1, lv / 4), bb = lerp(b0, b1, (lv + 1) / 4);
        for (var e = 0; e < 4; e++) {
          var p = c0[e], q2 = c0[(e + 1) % 4];
          B.M.add(strut(THREE, mx + p[0] * ba, p[1] * ba, za, mx + q2[0] * bb, q2[1] * bb, zb, 0.04, 3));
          B.M.add(strut(THREE, mx + p[0] * bb, p[1] * bb, zb, mx + q2[0] * bb, q2[1] * bb, zb, 0.04, 3));
        }
      }
      B.M.add(box(THREE, 2.2, 2.2, 0.15, mx, 0, z1));
      B.S.add(box(THREE, 1.2, 1.2, 0.9, mx, 0, z1 + 0.5));
      B.K.add(box(THREE, 0.35, 3.4, 0.3, mx, 0, z1 + 1.25));
      B.M.add(cylZ(THREE, 0.05, 0.08, 3.0, 4, mx - 0.6, 0.6, z1));
    })();

    /* the pyramid main mast on the bridge block, its platforms, yard and
       topmast; the air-search antenna on its head                        */
    var MX = -20.0, ZMT = 40.0;
    (function () {
      var base = chamRect(-24.8, -15.6, 3.6, 0.8), top = chamRect(MX - 1.4, MX + 1.4, 1.05, 0.3);
      B.S.add(stack(THREE, [[base, Z2 - 0.05], [top, ZMT]], true, false));
      function at(z) { var f = (z - Z2) / (ZMT - Z2); return base.map(function (p, kk) { return [lerp(p[0], top[kk][0], f), lerp(p[1], top[kk][1], f)]; }); }
      /* platforms at 33.0 and 36.9 with rails                              */
      [[33.0, 1.5], [36.9, 1.0]].forEach(function (pl) {
        var r = at(pl[0]).map(function (p) { return [MX + (p[0] - MX) * 1.0 - (pl[1] > 1.2 ? 0.6 : 0), p[1] * 1.0]; });
        var ex = chamRect(Math.min.apply(null, r.map(function (p) { return p[0]; })) - pl[1], Math.max.apply(null, r.map(function (p) { return p[0]; })) + pl[1] * 0.6,
                          Math.max.apply(null, r.map(function (p) { return p[1]; })) + pl[1], 0.5);
        B.S.add(stack(THREE, [[ex, pl[0] - 0.18], [ex, pl[0]]], true, true));
        var rp = ex.map(function (p) { return [p[0], p[1] * 0.98, pl[0]]; });
        railRun(rp.concat([rp[0]]), 1.0);
      });
      /* the team band round the head of the pyramid                        */
      var bandA = at(38.4).map(function (p) { return [MX + (p[0] - MX) * 1.04, p[1] * 1.04]; });
      var bandB = at(39.2).map(function (p) { return [MX + (p[0] - MX) * 1.04, p[1] * 1.04]; });
      B.T.add(stack(THREE, [[bandA, 38.4], [bandB, 39.2]], false, false));
      /* yard, topmast                                                      */
      B.M.add(strut(THREE, MX, -5.6, 39.4, MX, 5.6, 39.4, 0.1, 5));
      B.M.add(cylZ(THREE, 0.1, 0.18, 8.3, 5, MX + 0.6, 0, ZMT + 0.4));
      B.M.add(strut(THREE, MX + 0.6, 0, 46.0, MX + 0.6, 1.8, 46.0, 0.05, 4));
      B.M.add(strut(THREE, MX + 0.6, 0, 46.0, MX + 0.6, -1.8, 46.0, 0.05, 4));
      /* the antenna's turntable and the antenna                            */
      B.M.add(cylZ(THREE, 0.7, 0.8, 0.5, 10, MX, 0, ZMT));
      if (!mosk) {
        /* Head Net-C (MR-310 Angara): two long curved reflectors back to
           back, one tilted, on Ivan Rogov (colour photograph, 1982)        */
        [0, 1].forEach(function (w) {
          var tilt = w ? 0.52 : 0.0, hd = w ? PI : 0;
          for (var sl = 0; sl < 5; sl++) {
            var yy = -2.8 + sl * 1.4;
            var bend = 0.22 * (1 - Math.pow(yy / 2.8, 2));
            var g = box(THREE, 0.14, 1.36, 1.35, 0, yy, 0);
            g.translate(-bend - 0.25, 0, 0);
            g.rotateY(tilt); g.rotateZ(hd);
            g.translate(MX, 0, ZMT + 1.35 + w * 0.2);
            B.A.add(g);
          }
          B.M.add(strut(THREE, MX, 0, ZMT + 0.5, MX + (w ? 0.8 : -0.8), 0, ZMT + 1.3 + w * 0.2, 0.08, 4));
        });
      } else {
        /* Top Plate (MR-750 Fregat-M2): two flat arrays back to back on
           Mitrofan Moskalenko (1994; navypedia's fit of 103)                */
        [1, -1].forEach(function (w) {
          var g = box(THREE, 0.3, 3.6, 2.2, 0, 0, 0);
          g.rotateY(w * 0.32);
          g.translate(MX + w * 0.55, 0, ZMT + 1.7);
          B.A.add(g);
          B.K.add(place(THREE, new THREE.BoxGeometry(0.06, 3.3, 1.9), MX + w * 0.72, 0, ZMT + 1.7, 0, w * 0.32, 0));
        });
        B.M.add(box(THREE, 1.2, 0.9, 0.7, MX, 0, ZMT + 0.85));
      }
    })();
    /* the MR-105 dish forward of the mast (1982, 1994, drawing), and an
       MR-123 director on the mast's forward platform                      */
    (function () {
      var dz = Z3 + 1.9, dx = -12.0;
      B.S.add(cylZ(THREE, 0.5, 0.65, 1.4, 8, dx - 0.9, 0.4, Z3));
      var d = new THREE.SphereGeometry(2.2, 14, 4, 0, PI * 2, 0, 0.6);
      d.rotateZ(-PI / 2);
      B.A.add(place(THREE, d, dx - 1.5, 0.4, dz));
      B.M.add(strut(THREE, dx - 0.9, 0.4, dz - 0.4, dx + 0.5, 0.4, dz, 0.07, 4));
      B.A.add(cylZ(THREE, 0.75, 0.75, 1.0, 12, -15.9, 0, 36.9));
      B.A.add(sphere(THREE, 0.75, 12, 5, -15.9, 0, 37.9, true));
    })();
    /* the second MR-123 on a pedestal at the after end of the 01 level,
       where the drawing has a post to 27.8 m                              */
    B.S.add(cylZ(THREE, 0.45, 0.6, 2.9, 8, -42.2, 0, Z1));
    B.A.add(cylZ(THREE, 0.75, 0.75, 0.9, 12, -42.2, 0, Z1 + 2.9));
    B.A.add(sphere(THREE, 0.75, 12, 5, -42.2, 0, Z1 + 3.8, true));
    /* radomes either side of the mast (1982, 85-07169), taken as the
       MP-401 Start ECM suite navypedia lists                              */
    for (s = -1; s <= 1; s += 2) {
      B.S.add(cylZ(THREE, 0.45, 0.55, 1.0, 8, -19.5, s * 4.4, 33.0));
      B.A.add(sphere(THREE, 0.85, 12, 6, -19.5, s * 4.4, 34.6));
    }

    /* AK-630 domes: two on the 01 roof at the drawing's x -20, two at the
       after end of the block roof (1982, 85-07169, drawing)               */
    function ak630(px, py, pz, hdg) {
      B.S.add(cylZ(THREE, 1.15, 1.25, 0.55, 12, px, py, pz));
      B.A.add(cylZ(THREE, 0.95, 1.0, 0.65, 12, px, py, pz + 0.55));
      B.A.add(sphere(THREE, 0.95, 12, 5, px, py, pz + 1.2, true));
      B.K.add(strut(THREE, px + Math.cos(hdg) * 0.7, py + Math.sin(hdg) * 0.7, pz + 1.05,
                    px + Math.cos(hdg) * 2.6, py + Math.sin(hdg) * 2.6, pz + 1.15, 0.17, 6));
    }
    for (s = -1; s <= 1; s += 2) {
      ak630(-20.0, s * 8.35, Z1, s * 1.1);
      ak630(-47.5, s * 8.6, ZBLK, s * 2.2);
    }
    /* the Osa-M's magazine cover, flush with the roof (colour, drawing)   */
    B.A.add(cylZ(THREE, 1.65, 1.75, 0.22, 18, -49.6, 5.7, ZBLK));
    B.M.add(cylZ(THREE, 0.5, 0.5, 0.12, 10, -49.6, 5.7, ZBLK + 0.22));

    /* boats on the 01 roof beside the funnel block (drawing plan) with
       their davits                                                         */
    for (s = -1; s <= 1; s += 2) {
      launch(8.8, -37.2, s * 8.1, Z1 + 0.5);
      [-35.4, -30.4].forEach(function (dx2) {
        B.M.add(strut(THREE, dx2, s * 6.6, Z1, dx2, s * 6.9, Z1 + 3.4, 0.11, 5));
        B.M.add(strut(THREE, dx2, s * 6.9, Z1 + 3.4, dx2, s * 8.1, Z1 + 3.6, 0.08, 4));
      });
    }
    /* team flashes on the block roof's forward corners                    */
    for (s = -1; s <= 1; s += 2) B.T.add(box(THREE, 5.5, 1.6, 0.16, -9.2, s * 10.7, ZBLK + 0.05));
    /* raft canisters racked along the block roof beside the 01 level
       (colour photograph)                                                 */
    for (s = -1; s <= 1; s += 2) {
      [-41.5, -35.5, -29.5, -23.5].forEach(function (rx) {
        B.M.add(box(THREE, 2.6, 1.3, 0.12, rx, s * 10.75, ZBLK + 0.2));
        [-0.7, 0.7].forEach(function (d2) {
          B.W.add(place(THREE, new THREE.CylinderGeometry(0.4, 0.4, 1.2, 6), rx + d2, s * 10.75, ZBLK + 0.68));
        });
      });
      /* the anchor in each hawse (1994, drawing)                          */
      var ay = halfB(65.2, 8.6);
      B.K.add(box(THREE, 1.5, 0.3, 1.9, 65.2, s * (ay + 0.05), 7.9, 0, 0, s * 0.35));
      B.M.add(box(THREE, 0.35, 0.35, 2.4, 65.2, s * (ay + 0.12), 7.6, 0, 0, s * 0.35));
    }
    /* vents and lockers on the block roof                                 */
    [[-46.5, 10.6], [-46.5, -10.6], [-14, 10.4], [-14, -10.4]].forEach(function (v) {
      B.S.add(box(THREE, 1.6, 1.0, 1.0, v[0], v[1], ZBLK + 0.5));
    });

    /* ------------------------------------------------------ forecastle */
    /* the twin AK-726 on the centreline (drawing, 1982)                    */
    (function () {
      var gx = 64.6, gz = tbl(ZFCT, gx);
      B.S.add(cylZ(THREE, 1.75, 1.85, 0.35, 16, gx, 0, gz));
      var pl = [[-2.6, -1.0], [-2.2, -1.55], [1.4, -1.6], [2.2, -1.1], [2.2, 1.1], [1.4, 1.6], [-2.2, 1.55], [-2.6, 1.0]];
      var tp = pl.map(function (q) { return [q[0] * 0.92 - 0.1, q[1] * 0.88]; });
      var g = stack(THREE, [[pl, 0.35], [tp, 2.3]], true, false);
      g.translate(gx, 0, gz);
      B.S.add(g);
      B.S.add(sphere(THREE, 1.35, 12, 5, gx - 1.2, 0, gz + 1.9, true).scale(1, 1, 1));
      for (s = -1; s <= 1; s += 2) {
        B.M.add(strut(THREE, gx + 2.1, s * 0.48, gz + 1.25, gx + 6.2, s * 0.48, gz + 1.3, 0.11, 6, 0.085));
        B.K.add(box(THREE, 0.3, 0.6, 0.7, gx + 2.25, s * 0.48, gz + 1.25));
      }
    })();
    /* the forecastle mast and the jackstaff (drawing)                      */
    B.M.add(cylZ(THREE, 0.1, 0.16, 23.0 - tbl(ZFCT, 61.0), 5, 61.0, 0, tbl(ZFCT, 61.0)));
    B.M.add(strut(THREE, 61.0, -1.4, 20.2, 61.0, 1.4, 20.2, 0.05, 4));
    B.M.add(strut(THREE, 78.3, 0, tbl(ZFCT, 78.3), 78.5, 0, 17.6, 0.06, 4, 0.035));
    /* windlasses, bollards, lockers                                         */
    for (s = -1; s <= 1; s += 2) {
      B.M.add(cylZ(THREE, 0.45, 0.5, 0.7, 10, 70.5, s * 1.6, tbl(ZFCT, 70.5)));
      [[56.5, 7.8], [62.0, 7.4], [72.5, 4.8], [-60.0, 10.9], [-72.0, 10.9], [20.0, 10.6], [40.0, 9.4]].forEach(function (b) {
        var zz = b[0] < XBA ? ZPAD : b[0] < XFC ? ZFWD : tbl(ZFCT, b[0]);
        B.M.add(cylZ(THREE, 0.18, 0.18, 0.5, 6, b[0] - 0.3, s * b[1], zz));
        B.M.add(cylZ(THREE, 0.18, 0.18, 0.5, 6, b[0] + 0.3, s * b[1], zz));
      });
      B.S.add(box(THREE, 1.2, 1.0, 0.9, 58.5, s * 4.6, tbl(ZFCT, 58.5) + 0.45));
    }

    /* ---------------------------------------------------- the stern gate
       Its own group: the holder sits on the sill turned half round about Z,
       so the gate's local +X points aft and rotation.y +1.45 lays it out
       and down astern. Its outer face is flush with the transom.          */
    var gh = new THREE.Group();
    gh.position.set(XS, 0, WZ0);
    gh.rotation.z = PI;
    var wg = new THREE.Group();
    wg.name = "wellgate";
    gh.add(wg);
    (function () {
      var GB = { S: new Batch(8), M: new Batch() }, GH = WZ1 - WZ0, GW = 2 * WHW - 0.1;
      GB.S.add(box(THREE, 0.3, GW, GH, -0.45, 0, GH / 2));
      /* the lattice of frames over its outer face (colour, 85-07169)       */
      for (i = 0; i <= 8; i++) GB.M.add(box(THREE, 0.28, 0.28, GH - 0.2, -0.15, -GW / 2 + 0.2 + i * (GW - 0.4) / 8, GH / 2));
      for (i = 0; i <= 4; i++) GB.M.add(box(THREE, 0.28, GW, 0.28, -0.15, 0, 0.2 + i * (GH - 0.4) / 4));
      Object.keys(GB).forEach(function (kk) { var mm = GB[kk].mesh(THREE, T[kk]); if (mm) wg.add(mm); });
    })();
    root.add(gh);
    root.userData.wellExit = { x: XS, y: 0, z: WZ0 };
    root.userData.wellInner = { x: XS + WLEN / 2, y: 0, z: WZ0 };

    /* -------------------------------------------- the bow doors and ramp
       The door shell is the hull skin forward of the seam; the ramp stands
       upright behind it. Both hang from the hinge at the foot of the bow
       opening; +rotation.y swings them forward and down.                  */
    var br = new THREE.Group();
    br.name = "bowramp";
    br.position.set(HX, 0, HZ);
    (function () {
      var RB = { H: new Batch(), D: new Batch(), K: new Batch() };
      RB.H.raw(ds.pos, ds.nrm, ds.uv);
      /* the shell's inside, seen once the doors are down                   */
      var ip = [], inr = [];
      for (var q = 0; q < ds.pos.length; q += 9) {
        /* pulled 0.3 m in along the face's own normal                     */
        var a0 = [ds.pos[q], ds.pos[q + 1], ds.pos[q + 2]], a1 = [ds.pos[q + 3], ds.pos[q + 4], ds.pos[q + 5]], a2 = [ds.pos[q + 6], ds.pos[q + 7], ds.pos[q + 8]];
        var ux = a1[0] - a0[0], uy = a1[1] - a0[1], uz = a1[2] - a0[2], vx = a2[0] - a0[0], vy = a2[1] - a0[1], vz = a2[2] - a0[2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx, nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        nx = -0.3 * nx / nl; ny = -0.3 * ny / nl; nz = -0.3 * nz / nl;
        ip.push(a0[0] + nx, a0[1] + ny, a0[2] + nz, a2[0] + nx, a2[1] + ny, a2[2] + nz, a1[0] + nx, a1[1] + ny, a1[2] + nz);
      }
      var gi = new THREE.BufferGeometry();
      gi.setAttribute("position", new THREE.Float32BufferAttribute(ip, 3));
      gi.computeVertexNormals();
      RB.K.add(gi); void inr;
      /* the ramp: 7.0 m wide, 8.4 m long. Upright, its tread faces aft into
         the ship; laid down, that face is on top.                          */
      var rw = 3.5, rl = 8.4;
      var rt = new Tris();
      rt.quad([0.15, -rw, 0.05], [0.15, rw, 0.05], [0.15, rw, rl], [0.15, -rw, rl], [-1, 0, 0]);
      var rg = rt.geo(THREE), P = rg.getAttribute("position"), uv = new Float32Array(P.count * 2);
      for (var v = 0; v < P.count; v++) { uv[v * 2] = (41 + P.getZ(v) - XS) / LOA; uv[v * 2 + 1] = (P.getY(v) + DYH) / (2 * DYH); }
      rg.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
      RB.D.add(rg);
      RB.K.add(box(THREE, 0.45, 2 * rw, rl - 0.05, 0.38, 0, rl / 2 + 0.025));
      for (var rr = 0; rr < 6; rr++) RB.K.add(box(THREE, 0.08, 2 * rw - 0.2, 0.12, 0.11, 0, 0.8 + rr * 1.3));
      Object.keys(RB).forEach(function (kk) { var mm = RB[kk].mesh(THREE, T[kk]); if (mm) br.add(mm); });
    })();
    root.add(br);

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

/* Registration: the three rows of the class. len is the measured X extent,
   transom to stem head.                                                    */
UNIT_MODELS["pact_e80_lpd"] = { len: 157.5, build: function (THREE, M, C) { return HeroRogov1174.build(THREE, M, C, "e80"); } };
UNIT_MODELS["pact_e90_lpd"] = { len: 157.5, build: function (THREE, M, C) { return HeroRogov1174.build(THREE, M, C, "e90"); } };
UNIT_MODELS["pact_e00_lpd"] = { len: 157.5, build: function (THREE, M, C) { return HeroRogov1174.build(THREE, M, C, "e00"); } };
