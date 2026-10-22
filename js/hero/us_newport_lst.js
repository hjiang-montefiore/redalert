/* ============================================================================
   us_newport_lst.js -- HERO model: the Newport-class tank landing ship
   (LST-1179), registered for nato_e60_lst, the row's only key. Drawn in the
   fit of the row's era: as built, 1969-72, with the two twin 3-inch/50
   Mk 33 mounts and no Phalanx (navypedia dates the first Mk 15 to the late
   1980s, the guns' removal to the early 1990s).

   REFERENCES (fetched with a generic User-Agent; Commons at 1000 px):
     - navypedia.org "NEWPORT tank landing ships (1969 - 1972)", its two
       standard-scale drawings: "Newport 1979" (starboard profile drawn to the
       waterline and a plan, 3.195 px a metre) and "Saginaw 1972" (profile).
       Every station below is read off the 1979 drawing on a metre grid; its
       plan beam is 21.6 m against the published 21.2, so half-breadths are
       scaled by 0.98. The same page: 159.2 m over the hull, 171.3 m over
       the derrick arms, 21.2 m beam, 5.3 m draught, 3 LCVP and 1 LCP, four
       davits, the 31.4 m ramp lowered through the gallows, the stern ramp
       with the helicopter deck above it, no hangar.
     - en.wikipedia "Newport-class tank landing ship": 522 ft 4 in overall,
       562 ft "over the derrick arms which protruded past the bow", draught
       11 ft 5 in forward and 17 ft 5 in aft, the 112 ft aluminium ramp, two
       twin 3in/50 Mk 33 with two Mk 63 GFCS (removed 1977-78).
     - "USS Boulder (LST-1190) at the National Steel and Shipbuilding
       Company shipyard pier on 13 April 1971" (USN 1147824, overhead from
       the port bow, as built): the 1971 fit - the port 3-inch mount in its
       tub at the after corner of the block, the twin-uptake funnel to port
       with its two exhausts, the round funnel to starboard, the kingpost,
       the boats in their davits, the two landing circles abreast aft.
     - "USS Fresno (LST-1182) stbd beam view" (1983): the profile - the
       block flush with the hull side, the pilot house set in from it, the
       raft canisters, both gunhouses, the two funnels, the ramp lying on
       the forward deck, the derrick arms and their crosshead.
     - "USS Peoria (LST-1183) aerial stbd bow view" (1987): the bow - the
       flared upper bow, the door hinge line raked parallel to the stem, the
       tapered plate-girder arms with walkways and rails, the crosshead
       platform, the anchor, the big door in the block's forward face.
     - "USS Racine (LST-1191) portside bow view" (1987): the round bow in
       plan, the ramp stowed on deck between the arms, the bow bulwark, the
       jackstaff, the block's forward face, its windows and door.
     - "USS Spartanburg County (LST-1192) aft view" (1991): the flat transom,
       the latticed stern gate in its middle, the stern anchor to starboard
       of it, the funnels and booms from astern.
     - "USS Manitowoc (LST-1180) stbd bow view" (1982), "USS Newport
       (LST-1179) at Rota 1982", "USS San Bernardino (LST-1189) during
       landing exercise in 1979" (the bow doors open under the gallows).

   RECOGNITION FEATURES (each with where it rests):
     1. The two huge derrick arms (the "horns"): tapered plate girders that
        rise from the forward deck beside the ramp and run 12.1 m past the
        stem to a crosshead with a railed platform, walkways along their
        tops (drawing profile and plan; Peoria, Fresno, Racine, Wikipedia's
        562 ft over the arms).
     2. A ship-shaped pointed bow: the raked stem, the fine entry at the
        waterline flaring through a knuckle to a round bluff deck edge, the
        bow bulwark, the door hinge line, the anchors (Peoria, Racine,
        drawing).
     3. The 112 ft ramp stowed flat on the forward deck between the arms,
        its tapered toe aft (drawing plan; Racine, Fresno), and the hoist
        falls from the crosshead to its forward end.
     4. The long, low, flush hull at 7.5 m freeboard, narrowing aft in plan
        to a flat transom (drawing plan; Boulder).
     5. The tall block amidships carried up flush from the hull side to
        16.7 m, the big vehicle door in its forward face (drawing; Peoria,
        Racine, Boulder) and the pilot house on it with its window band.
     6. Three stacks: the twin-uptake funnel to port with its two exhausts
        and the round one to starboard, black-capped (drawing plan; Boulder,
        Fresno, Spartanburg County).
     7. The stern gate: a latticed gate in the middle of the flat transom,
        the stern anchor beside it (Spartanburg County).
     8. The helicopter deck over the stern gate: the after main deck, clear
        and flat, with the two landing circles abreast of 1971 (Boulder).
     9. The two twin 3-inch/50 Mk 33 gunhouses in tubs at the after corners
        of the block roof (drawing plan; Boulder, Fresno).
    10. The pole mast with its yard and the SPS-10 on the pilot house roof
        (drawing; Peoria, Racine).
    11. The boats in the waist, one a side under a gantry davit whose top is a
        railed frame - the port one beside the after deckhouse, the starboard
        one further aft (drawing plan; Boulder, Fresno) - and the kingpost
        with its boom stowed athwartships at the starboard funnel.
    12. Raft canisters in rows on the block roof beside the pilot house
        (Fresno).

   STATION TABLE (x from the middle of the 171.3 m overall length, + forward;
   the transom at -85.65, the stem head at +73.55, the arm tips at +85.65;
   z above the waterline; half-breadths in metres):
       x       side top z   deck half-breadth   waterline half-breadth
     -85.65      7.5            7.5                   7.0  (transom)
     -75.65      7.5            8.6                   8.3
     -65.65      7.5            9.7                   9.5
     -53.65      7.5           10.6                  10.55
      14.5       7.5           10.6                  10.6
      19.25      7.5           10.1                  10.1
      23.25      7.5            9.75                  9.6  (block front)
      33.85      7.5 -> 9.3     9.25                  9.0  (bulwark step)
      36.45      9.3            9.0                   8.7
      52.05      9.5            8.1                   6.6
      63.0       9.8            7.45                  2.9
      66.75      9.9            7.0                   0.0  (stem at the WL)
      70.55     10.0            5.6 (round bow)       -
      73.55     10.2            0.0  (stem head)      -
   The stem rakes 6.8 m from the waterline to the head (drawing). The keel
   is not on the drawing: it slopes from 5.3 m down aft to 3.5 m forward,
   the published draughts, and rises to the transom at 0.8 m down. The
   knuckle runs at 5.4 m along the bow (drawing; Peoria).

   THE ARMS AND THE RAMP. The arms stand 5.3 m out from the centreline
   (plan), their bases on the deck from 47.55 to 61.55, their upper edges
   rising at 17 deg to 19.05 m and their lower edges at 23 deg to 17.8 m
   at the tips (drawing profile). The ramp, 34.1 m (112 ft) by 8.3 m, lies
   on the deck from 35.35 to 69.45, aft of the stem head; the crosshead
   ends at the tips. Nothing else is
   proud of the tips or the transom: the stern gate and its lattice sit in
   the transom. The X extent is therefore the published 171.3 m over the
   arms, transom to tips; the hull alone is the published 159.2 m.
   NO "bowramp" NODE: nato_e60_lst has no def.bowRamp, so render3d.js never
   looks for one, and this ramp does not hinge at the bow anyway - it is
   run out over the bow on the falls. It is drawn stowed and merged.

   PAINT. Haze grey sampled off the colour photographs - Manitowoc's lit
   side 106,115,119, Fresno's block 144,140,149 - taken down to 0.9 and set
   at #6c7379 (hull) and #777e84 (upper works), beside the accepted 0x737a81;
   decks at the dark non-skid the photographs show (82-91, 79-88, 59-86),
   #4f4f4a. No hull numbers, names or ensigns. The team colour is exactly
   C.team: a band round the mast and two flashes on the pilot house roof.

   NOT DRAWN (no reference shows it clearly enough): the Mk 63 directors and
   the Mk 34 dishes on the mounts (removed 1977-78; no photograph here
   resolves them), the four pontoon causeways (a carried load: the Saginaw
   1972 drawing and Newport 1982 show them, Boulder 1971 and Fresno 1983 do
   not), the other two of navypedia's four boats (3 LCVP and 1 LCP: the
   drawing and the photographs show only the two in the waist, both drawn
   as LCVPs), the bow thruster, the turntables and the tank deck inside,
   the flags.

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0. Nothing is
   named "turret": the row has no trained mount (weapons: []). ASCII only --
   a stray byte in a hex literal has broken this project.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroNewportLST = (function () {
  "use strict";

  var PI = Math.PI;
  var LOA = 171.3, XS = -85.65, XTIP = 85.65, XSTEM = 73.55, XWS = 66.75;
  var HLEN = XSTEM - XS;                           /* 159.2, the hull alone   */
  var ZDK = 7.5, ZK = 5.4, ZSH = 10.2;             /* deck, knuckle, stem head */
  var XSTEP = 33.85, ZBW = 9.3;                    /* the bulwark step forward */
  var XHA = -2.05, XHF = 23.25, ZH1 = 16.7;        /* the block               */
  var XPA = 5.15, PHW = 8.5, ZP1 = 19.6;           /* the pilot house         */
  var XDA = -11.25, DHW = 5.0, ZD1 = 13.6;         /* the after deckhouse     */
  var XR0 = 35.35, XR1 = 69.45, RHW = 4.15, ZR = 8.55;   /* the stowed ramp   */
  var AY = 5.3, AT = 0.45;                         /* arm centre, half thick  */
  var AU0 = 47.55, AL0 = 61.55, AZU = 19.05, AZL = 17.8; /* arm bases, tips  */
  var GW = 3.3, GZ0 = 0.25, GZ1 = 7.15;            /* the stern gate          */

  /* ---------------------------------------------------------- tables */
  var YDK = [[-85.65, 7.5], [-75.65, 8.6], [-65.65, 9.7], [-57.65, 10.45], [-53.65, 10.6], [14.5, 10.6],
             [19.25, 10.1], [23.25, 9.75], [33.85, 9.25], [36.45, 9.0], [52.05, 8.1], [63.0, 7.45],
             [67.05, 7.05], [73.55, 6.6]];
  var YWL = [[-85.65, 7.0], [-80, 7.7], [-75.65, 8.3], [-65.65, 9.5], [-57.65, 10.3], [-53.65, 10.55],
             [14.5, 10.6], [19.25, 10.1], [23.25, 9.6], [30, 9.2], [36.45, 8.7], [44, 7.9], [52.05, 6.6],
             [57, 5.3], [61, 3.9], [64, 2.4], [66.75, 0.0]];
  /* the knuckle's place between the waterline and the side top: straight
     sides aft (the plain fraction), most of the flare above it forward     */
  var KFR = [[-85.65, 0.72], [25, 0.72], [40, 0.45], [55, 0.36], [73.55, 0.33]];
  var KEEL = [[-85.65, -0.8], [-82, -1.9], [-77, -3.3], [-70, -4.5], [-62, -5.1], [-55, -5.3], [58, -3.5]];
  var PEXP = [[-85.65, 3.0], [-75, 2.6], [-62, 3.4], [-50, 5.0], [30, 5.0], [45, 3.0], [55, 2.0], [66.75, 1.5]];
  /* the plan at every height near the stem, by distance aft of the stem at
     that height: the round bow of the photographs                          */
  var BOWR = [[0, 0], [0.3, 1.6], [0.8, 2.7], [1.6, 3.8], [2.6, 4.8], [3.8, 5.7], [5.0, 6.4],
              [6.5, 7.0], [10, 7.45], [20, 8.0], [60, 12.0]];

  var STATIONS = [-85.65, -85.2, -84.4, -83.2, -81.5, -79.5, -77, -74, -70.5, -67, -63, -59, -55, -50,
                  -44, -38, -32, -26, -20, -14, -8, -2.05, 4, 10, 14.5, 19.25, 23.25, 28.5, 31.2, 33.85, 34.85,
                  35.85, 38, 40, 42, 44, 46, 48, 50, 52.05, 53.6, 55, 56.3, 57.5, 58.5, 59.5, 60.5, 61.5, 62.3,
                  63, 64.3, 65.5, 66.3, 66.75, 67.5,
                  68.3, 69.1, 69.9, 70.6, 71.25, 71.85, 72.4, 72.85, 73.2, 73.42, 73.55];

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
  function keel(x) { return tbl(KEEL, x); }
  /* the side top: flush 7.5 m aft, the bulwark step at XSTEP, the bow
     bulwark sheering up to the stem head                                  */
  function zRef(x) {
    if (x <= XSTEP) return ZDK;
    if (x < XSTEP + 2) { var u = (x - XSTEP) / 2; return ZDK + (ZBW - ZDK) * u * u * (3 - 2 * u); }
    return ZBW + (ZSH - ZBW) * Math.pow(clamp((x - XSTEP - 2) / (XSTEM - XSTEP - 2), 0, 1), 1.5);
  }
  function xStem(z) {
    if (z >= 0) return Math.min(XSTEM, XWS + (XSTEM - XWS) * Math.pow(Math.min(1, z / ZSH), 0.9));
    return XWS - 8.75 * Math.pow(Math.min(1, -z / 3.5), 1.6);
  }
  function zLow(x) {
    var k = keel(x);
    if (x <= 58) return k;
    if (x <= XWS) return Math.max(k, -3.5 * Math.pow((XWS - x) / 8.75, 1 / 1.6));
    return ZSH * Math.pow(Math.min(1, (x - XWS) / (XSTEM - XWS)), 1 / 0.9);
  }
  function halfB(x, z) {
    var zl = zLow(x), y;
    if (z <= zl + 1e-6) return 0;
    var yw = tbl(YWL, x), yt = tbl(YDK, x);
    if (z < 0) {
      var s = clamp(z / Math.min(-1e-3, keel(x)), 0, 1), p = tbl(PEXP, x);
      y = yw * Math.pow(Math.max(0, 1 - Math.pow(s, p)), 1 / p);
    } else {
      var zr = zRef(x), yk = yw + (yt - yw) * tbl(KFR, x);
      if (z <= ZK) y = yw + (yk - yw) * (z / ZK);
      else y = yk + (yt - yk) * clamp((z - ZK) / (zr - ZK), 0, 1);
    }
    return Math.min(y, tbl(BOWR, Math.max(0, xStem(z) - x)));
  }
  /* eleven rows a station: keel, four under water, the waterline, a mid
     row, the knuckle, a mid row, the deck and the side top. Rows below a
     risen keel fold.                                                       */
  var ROWS = 11;
  function rowZ(x) {
    var zl = zLow(x), m0 = Math.min(0, keel(x));
    var zz = [zl, m0 * 0.85, m0 * 0.6, m0 * 0.35, m0 * 0.12, 0, ZK * 0.5, ZK, (ZK + ZDK) * 0.5, ZDK, zRef(x)], k;
    for (k = 0; k < zz.length; k++) zz[k] = Math.max(zl, zz[k]);
    for (k = 1; k < zz.length; k++) if (zz[k] < zz[k - 1]) zz[k] = zz[k - 1];
    return zz;
  }
  function section(x) {
    return rowZ(x).map(function (z, k) { return [k === 0 ? 0 : halfB(x, z), z]; });
  }
  /* the deck plate's edge (inside the bow bulwark)                         */
  function deckHW(x) { return Math.max(0, halfB(Math.min(x, xStem(ZDK) - 0.01), ZDK + 0.01) - (x > XSTEP ? 0.25 : 0)); }

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
  /* an (x, z) outline pushed out across y0..y1, closed                      */
  function yPrism(THREE, xz, y0, y1) {
    var pts = ccw(xz), n = pts.length, pos = [], k;
    function tri(a, b, c) { pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]); }
    for (k = 0; k < n; k++) {
      var a = pts[k], b = pts[(k + 1) % n];
      tri([a[0], y1, a[1]], [b[0], y1, b[1]], [b[0], y0, b[1]]);
      tri([a[0], y1, a[1]], [b[0], y0, b[1]], [a[0], y0, a[1]]);
    }
    for (k = 1; k < n - 1; k++) {
      tri([pts[0][0], y0, pts[0][1]], [pts[k][0], y0, pts[k][1]], [pts[k + 1][0], y0, pts[k + 1][1]]);
      tri([pts[0][0], y1, pts[0][1]], [pts[k + 1][0], y1, pts[k + 1][1]], [pts[k][0], y1, pts[k][1]]);
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
  /* plan UVs onto the deck canvas: u XS..XTIP, v y -DYH..DYH              */
  var DYH = 11.5;
  function planUV(geo) {
    var P = geo.getAttribute("position"), uv = new Float32Array(P.count * 2), i;
    for (i = 0; i < P.count; i++) { uv[i * 2] = (P.getX(i) - XS) / LOA; uv[i * 2 + 1] = (P.getY(i) + DYH) / (2 * DYH); }
    geo.setAttribute("uv", new (P.constructor)(uv, 2));
    return geo;
  }
  /* side-elevation UVs onto the hull canvas (port half above starboard)  */
  var HZ0 = -6.0, HZ1 = 20.0;
  function sideU(x) { return clamp((x - XS) / HLEN, 0.0005, 0.9995); }
  function sideV(z, side) { return (side > 0 ? 0.5 : 0) + 0.5 * clamp((z - HZ0) / (HZ1 - HZ0), 0.002, 0.998); }
  function sideUV(geo, side) {
    var P = geo.getAttribute("position"), uv = new Float32Array(P.count * 2), i;
    for (i = 0; i < P.count; i++) { uv[i * 2] = sideU(P.getX(i)); uv[i * 2 + 1] = sideV(P.getZ(i), side); }
    geo.setAttribute("uv", new (P.constructor)(uv, 2));
    return geo;
  }

  /* ============================================================= textures
     Haze grey: the photographs' level taken down to 0.9 (see the header).  */
  var C_HULL = "#6c7379", C_SUP = 0x777e84, C_DECK = "#4f4f4a", C_RAMP = "#7d8079";
  var C_FOUL = "#4a2523", C_BOOT = "#15181a", C_MARK = "#d9dbd6";
  var TEX = {};
  function hullTex(THREE) {
    if (TEX.hull) return TEX.hull;
    var W = 2048, H = 1024, HH = H / 2, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(1179), i, k, s, x;
    var PXZ = HH / (HZ1 - HZ0), PXX = W / HLEN;
    function U(xx) { return (xx - XS) * PXX; }
    for (s = 0; s < 2; s++) {
      var o = s * HH;
      var Y = function (z) { return o + (HZ1 - z) * PXZ; };
      g.save(); g.beginPath(); g.rect(0, o, W, HH); g.clip();
      g.fillStyle = C_HULL; g.fillRect(0, o, W, HH);
      for (i = 0; i < 170; i++) {
        g.globalAlpha = 0.012 + R() * 0.022;
        g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
        g.fillRect(R() * W, Y(16) + R() * (Y(0.5) - Y(16)), 60 + R() * 240, 8 + R() * 30);
      }
      g.globalAlpha = 1;
      g.fillStyle = C_BOOT; g.fillRect(0, Y(0.55), W, Y(-0.4) - Y(0.55));
      g.fillStyle = C_FOUL; g.fillRect(0, Y(-0.4), W, o + HH - Y(-0.4));
      /* strakes every 1.5 m, butts staggered                                */
      for (k = 0; k < 11; k++) {
        var z0 = 1.0 + k * 1.5, y0 = Y(z0), y1 = Y(z0 + 1.5);
        g.fillStyle = "rgba(0,0,0,0.18)"; g.fillRect(0, y0 - 1, W, 1.5);
        g.fillStyle = "rgba(255,255,255,0.05)"; g.fillRect(0, y0 - 2.5, W, 1.5);
        for (var bx = (k % 2) * 60; bx < W; bx += 120) { g.fillStyle = "rgba(0,0,0,0.10)"; g.fillRect(bx, y1, 1.5, y0 - y1); }
      }
      /* the deck line along the block's side, and a rubbing strake under it */
      g.fillStyle = "rgba(0,0,0,0.30)"; g.fillRect(U(XHA), Y(ZDK + 0.05), U(XHF) - U(XHA), 2.5);
      g.fillStyle = "rgba(255,255,255,0.08)"; g.fillRect(U(XHA), Y(ZDK - 0.1), U(XHF) - U(XHA), 2);
      /* scuttles: three rows in the block, one under it (drawing, Fresno)  */
      var scut = function (xx, z) {
        g.fillStyle = "rgba(10,12,14,0.92)"; g.beginPath(); g.arc(U(xx), Y(z), 3.2, 0, 2 * PI); g.fill();
        g.strokeStyle = "rgba(220,224,226,0.28)"; g.lineWidth = 1; g.beginPath(); g.arc(U(xx), Y(z), 4.4, 0, 2 * PI); g.stroke();
      };
      for (x = XHA + 2.2; x < XHF - 1.0; x += 2.3) { scut(x, 15.0); if (x > XHA + 4) scut(x, 12.3); }
      for (x = XHA + 6.0; x < XHF - 2.0; x += 4.6) scut(x, 9.6);
      for (x = XHA + 3.0; x < XHF - 1.0; x += 6.4) scut(x, 4.6);
      /* a door aft in the block's side, with its ladder                     */
      g.fillStyle = "rgba(20,23,26,0.85)"; g.fillRect(U(XHA + 1.2), Y(ZDK + 2.0), U(XHA + 2.2) - U(XHA + 1.2), Y(ZDK) - Y(ZDK + 2.0));
      /* the bow: the hawse, the door hinge line raked with the stem, the
         seam along its foot (Peoria, Racine)                                */
      g.fillStyle = "rgba(6,7,8,0.95)"; g.beginPath(); g.ellipse(U(59.35), Y(5.0), 9, 11, 0, 0, 2 * PI); g.fill();
      g.fillStyle = "rgba(40,44,46,0.55)"; g.fillRect(U(58.7), Y(4.4), U(60.0) - U(58.7), Y(1.0) - Y(4.4));
      var hz;
      g.strokeStyle = "rgba(14,16,18,0.8)"; g.lineWidth = 2;
      g.beginPath(); g.moveTo(U(64.5), Y(9.6)); g.lineTo(U(60.4), Y(1.6)); g.lineTo(U(XWS - 0.3), Y(1.3)); g.stroke();
      for (hz = 2.2; hz < 9.4; hz += 0.8) {
        var hxx = lerp(60.4, 64.5, (hz - 1.6) / 8.0);
        g.fillStyle = "rgba(205,210,212,0.55)"; g.fillRect(U(hxx) - 5, Y(hz) - 2, 10, 4);
      }
      /* the stem bar                                                        */
      g.fillStyle = "rgba(0,0,0,0.25)"; g.fillRect(U(XSTEM) - 3, 0, 3, H);
      /* draught marks fore and aft                                          */
      g.fillStyle = "rgba(225,228,230,0.7)";
      [65.6, -84.6].forEach(function (xx) { for (var dz = -0.2; dz < 3.0; dz += 0.6) g.fillRect(U(xx), Y(dz + 0.2), 4, 3); });
      /* rust weeps                                                          */
      for (i = 0; i < 46; i++) {
        var rx = R() * W, rz = 1.5 + R() * 13.0, ry = Y(rz), len = 20 + R() * 70;
        var gr = g.createLinearGradient(0, ry, 0, ry + len);
        gr.addColorStop(0, "rgba(80,48,30,0.22)"); gr.addColorStop(1, "rgba(80,48,30,0)");
        g.fillStyle = gr; g.fillRect(rx, ry, 1.5 + R() * 2, len);
      }
      g.restore();
    }
    TEX.hull = finish(THREE, cv, true);
    return TEX.hull;
  }

  /* the deck plan: dark non-skid; the 1971 helicopter deck (two circles
     abreast inside a border, Boulder); the ramp's tread where it lies     */
  var HXC = -61.65, HYC = 4.3, HR = 3.6;
  function deckTex(THREE) {
    if (TEX.deck) return TEX.deck;
    var W = 2048, H = 276, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(1190), i, x, y;
    var SX = W / LOA, SY = H / (2 * DYH);
    function cx(xx) { return (xx - XS) * SX; }
    function cy(yy) { return H - (yy + DYH) * SY; }
    g.fillStyle = C_DECK; g.fillRect(0, 0, W, H);
    for (i = 0; i < 240; i++) {
      g.globalAlpha = 0.02 + R() * 0.035;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 30 + R() * 160, 10 + R() * 40);
    }
    g.globalAlpha = 0.16; g.fillStyle = "#000000";
    for (i = 0; i < 3200; i++) g.fillRect(R() * W, R() * H, 1.5, 1.5);
    g.globalAlpha = 1;
    /* plate seams                                                          */
    g.fillStyle = "rgba(0,0,0,0.20)";
    for (x = XS; x <= XTIP; x += 6) g.fillRect(cx(x), 0, 1.2, H);
    for (y = -10; y <= 10; y += 2.5) g.fillRect(0, cy(y), W, 1.0);
    /* tie-downs: the helicopter and vehicle deck aft, the forward deck     */
    g.fillStyle = "rgba(10,10,9,0.55)";
    for (x = -84; x < -40; x += 2.0) for (y = -9; y <= 9.1; y += 2.0) g.fillRect(cx(x), cy(y), 2.2, 2.2);
    for (x = 24; x < 34; x += 2.0) for (y = -8; y <= 8.1; y += 2.0) g.fillRect(cx(x), cy(y), 2.2, 2.2);
    /* the helicopter deck: border, two circles abreast, the centre line    */
    g.strokeStyle = C_MARK; g.fillStyle = C_MARK; g.lineWidth = 0.32 * SX;
    g.strokeRect(cx(-80.5), cy(8.4), cx(-44.0) - cx(-80.5), 16.8 * SY);
    [HYC, -HYC].forEach(function (yy) {
      g.beginPath(); g.ellipse(cx(HXC), cy(yy), HR * SX, HR * SY, 0, 0, 2 * PI); g.stroke();
      g.fillRect(cx(HXC) - 0.15 * SX, cy(yy + 1.0), 0.3 * SX, 2.0 * SY);
    });
    g.fillRect(cx(HXC + HR + 0.5), cy(0.15), cx(-44.5) - cx(HXC + HR + 0.5), 0.3 * SY);
    /* hatches and the vehicle lanes forward of the block                   */
    g.strokeStyle = "rgba(14,14,13,0.75)"; g.lineWidth = 2;
    g.strokeRect(cx(-83.0), cy(-3.4), 3.2 * SX, 3.0 * SY);
    g.strokeRect(cx(-36.0), cy(2.0), 3.0 * SX, 4.0 * SY);
    g.strokeRect(cx(26.0), cy(-6.5), 2.4 * SX, 2.0 * SY);
    g.fillStyle = "rgba(225,226,220,0.45)";
    [-3.0, 3.0].forEach(function (yy) { g.fillRect(cx(XHF + 0.6), cy(yy + 0.1), cx(XR0) - cx(XHF + 0.6), 0.2 * SY); });
    /* the roofs of the block and the pilot house: plain                    */
    /* the ramp's tread where it lies: aluminium, transverse cleats, the two
       wheel tracks and the curbs                                           */
    g.fillStyle = C_RAMP; g.fillRect(cx(XR0), cy(RHW), cx(XR1) - cx(XR0), 2 * RHW * SY);
    g.fillStyle = "rgba(0,0,0,0.30)";
    for (x = XR0 + 0.4; x < XR1; x += 0.6) g.fillRect(cx(x), cy(RHW - 0.35), 1.6, (2 * RHW - 0.7) * SY);
    g.fillStyle = "rgba(255,255,255,0.10)";
    [-2.2, 2.2].forEach(function (yy) { g.fillRect(cx(XR0 + 2.5), cy(yy + 0.6), cx(XR1) - cx(XR0 + 2.5), 1.2 * SY); });
    g.fillStyle = "rgba(0,0,0,0.38)";
    g.fillRect(cx(XR0), cy(RHW), cx(XR1) - cx(XR0), 0.35 * SY);
    g.fillRect(cx(XR0), cy(-RHW + 0.35), cx(XR1) - cx(XR0), 0.35 * SY);
    for (x = XR0 + 5.6; x < XR1; x += 5.6) g.fillRect(cx(x), cy(RHW), 1.4, 2 * RHW * SY);
    /* the crosshead platform's grating                                     */
    g.fillStyle = "rgba(0,0,0,0.35)";
    for (x = 82.6; x < XTIP; x += 0.5) g.fillRect(cx(x), cy(5.6), 1.2, 11.2 * SY);
    TEX.deck = finish(THREE, cv, true);
    return TEX.deck;
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
      g.fillStyle = "rgba(0,0,0,0.20)"; g.fillRect(0, i * 128, W, 1.5);
      g.fillStyle = "rgba(255,255,255,0.06)"; g.fillRect(0, i * 128 + 2, W, 1.5);
    }
    for (i = 0; i < 5; i++) { g.fillStyle = "rgba(0,0,0,0.13)"; g.fillRect(i * 102.4 + 30, 0, 1.5, H); }
    for (i = 0; i < 22; i++) {
      var sx = R() * W, sy = R() * H, len = 30 + R() * 80;
      var gr = g.createLinearGradient(0, sy, 0, sy + len);
      gr.addColorStop(0, "rgba(46,34,26,0.16)"); gr.addColorStop(1, "rgba(46,34,26,0)");
      g.fillStyle = gr; g.fillRect(sx, sy, 2 + R() * 3, len);
    }
    TEX.sup = finish(THREE, cv);
    return TEX.sup;
  }

  /* ================================================================= hull
     Lofted stern to stem through STATIONS, normals smoothed across faces
     within 38 degrees so the knuckle and the deck edge stay crisp.         */
  function hullGeo() {
    var st = STATIONS, i, j, s;
    var secs = st.map(section);
    var faces = [];
    function V(ii, jj, side) { var q = secs[ii][jj]; return [st[ii], side * q[0], q[1]]; }
    function key(ii, jj, side) { return (side > 0 ? 0 : 1e6) + ii * 100 + jj; }
    function tri(a, b, c, ka, kb, kc, side) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var ar = Math.sqrt(nx * nx + ny * ny + nz * nz);
      if (ar < 2e-5) return;
      faces.push({ p: [a, b, c], k: [ka, kb, kc], n: [nx, ny, nz], u: [nx / ar, ny / ar, nz / ar], s: side });
    }
    for (i = 0; i < st.length - 1; i++) {
      for (j = 0; j < ROWS - 1; j++) {
        for (s = 1; s >= -1; s -= 2) {
          var kA = key(i, j, s), kB = key(i + 1, j, s), kC = key(i + 1, j + 1, s), kD = key(i, j + 1, s);
          var A = V(i, j, s), Bq = V(i + 1, j, s), Cq = V(i + 1, j + 1, s), D = V(i, j + 1, s);
          if (s > 0) { tri(A, D, Bq, kA, kD, kB, s); tri(Bq, D, Cq, kB, kD, kC, s); }
          else { tri(A, Bq, D, kA, kB, kD, s); tri(Bq, Cq, D, kB, kC, kD, s); }
        }
      }
    }
    /* the transom: the station-0 outline                                  */
    var ring = [];
    for (j = ROWS - 1; j >= 0; j--) ring.push(V(0, j, 1));
    for (j = 1; j < ROWS; j++) ring.push(V(0, j, -1));
    var cont = [];
    ring.forEach(function (q) {
      var l = cont[cont.length - 1];
      if (l && Math.abs(l[0] - q[1]) < 1e-4 && Math.abs(l[1] - q[2]) < 1e-4) return;
      cont.push([q[1], q[2]]);
    });
    return { faces: faces, transom: cont };
  }

  /* an LCVP: square bow ramp, open well, the coxswain's flat aft (11 m)   */
  function lcvp(THREE, B, x0, y0, z0, hd) {
    var L = 10.9, hw = 1.6, g, plan = [[-L / 2, -hw * 0.9], [L / 2 - 1.2, -hw], [L / 2, -hw * 0.85], [L / 2, hw * 0.85],
                                         [L / 2 - 1.2, hw], [-L / 2, hw * 0.9]];
    var bot = plan.map(function (q) { return [q[0] * 0.92, q[1] * 0.62]; });
    g = stack(THREE, [[bot, 0], [plan, 1.7]], true, true);
    g.rotateZ(hd); g.translate(x0, y0, z0); B.S.add(g);
    /* the well (dark), the coxswain's flat and screen aft                  */
    g = box(THREE, L * 0.62, hw * 1.55, 0.04, 0.6, 0, 1.72); g.rotateZ(hd); g.translate(x0, y0, z0); B.K.add(g);
    g = box(THREE, 2.2, hw * 1.9, 0.12, -L / 2 + 1.2, 0, 1.75); g.rotateZ(hd); g.translate(x0, y0, z0); B.S.add(g);
    g = box(THREE, 0.9, 1.2, 0.8, -L / 2 + 1.6, 0.4, 2.15); g.rotateZ(hd); g.translate(x0, y0, z0); B.S.add(g);
    g = box(THREE, 0.25, hw * 1.8, 1.5, L / 2 - 0.12, 0, 0.95, 0, -0.2, 0); g.rotateZ(hd); g.translate(x0, y0, z0); B.S.add(g);
  }

  /* ================================================================ build */
  function build(THREE, Mdl, C) {
    var root = new THREE.Group();
    var i, s, x, k;
    var team = C && C.team !== undefined ? C.team : "#d6503f";

    var T = {};
    T.H = new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.86, metalness: 0.07 });
    T.D = new THREE.MeshStandardMaterial({ color: 0xffffff, map: deckTex(THREE), roughness: 0.94, metalness: 0.04 });
    T.S = new THREE.MeshStandardMaterial({ color: 0xffffff, map: supTex(THREE), roughness: 0.86, metalness: 0.07 });
    T.M = new THREE.MeshStandardMaterial({ color: 0x4a5258, roughness: 0.55, metalness: 0.40 });
    T.K = new THREE.MeshStandardMaterial({ color: 0x121416, roughness: 0.85, metalness: 0.08 });
    T.G = new THREE.MeshStandardMaterial({ color: 0x0f1a22, roughness: 0.10, metalness: 0.0, transparent: true, opacity: 0.88,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    T.W = new THREE.MeshStandardMaterial({ color: 0xc8cbc6, roughness: 0.70, metalness: 0.04 });
    T.T = new THREE.MeshStandardMaterial({ color: new THREE.Color(team), roughness: 0.60, metalness: 0.10,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    var B = {};
    Object.keys(T).forEach(function (kk) { B[kk] = new Batch(kk === "S" ? 8 : 0); });
    function addT(batch, tr) { var g = tr.geo(THREE); batch.add(batch === B.D ? planUV(g) : g); }

    /* ------------------------------------------------------------- hull */
    var HG = hullGeo();
    var around = {}, COS = Math.cos(38 * PI / 180);
    HG.faces.forEach(function (f, fi) { f.k.forEach(function (kk) { (around[kk] || (around[kk] = [])).push(fi); }); });
    var hs = { pos: [], nrm: [], uv: [] };
    HG.faces.forEach(function (f) {
      for (var c = 0; c < 3; c++) {
        var q = f.p[c], sx = 0, sy = 0, sz = 0;
        around[f.k[c]].forEach(function (gi) {
          var g2 = HG.faces[gi];
          if (g2.u[0] * f.u[0] + g2.u[1] * f.u[1] + g2.u[2] * f.u[2] < COS) return;
          sx += g2.n[0]; sy += g2.n[1]; sz += g2.n[2];
        });
        var l = Math.sqrt(sx * sx + sy * sy + sz * sz) || 1;
        hs.pos.push(q[0], q[1], q[2]);
        hs.nrm.push(sx / l, sy / l, sz / l);
        hs.uv.push(sideU(q[0]), sideV(q[2], f.s));
      }
    });
    B.H.raw(hs.pos, hs.nrm, hs.uv);

    /* the transom, flat, with the stern gate's recess cut out of it         */
    (function () {
      var cont = HG.transom.map(function (q) { return new THREE.Vector2(q[0], q[1]); });
      if (cont.length > 2 && cont[0].distanceTo(cont[cont.length - 1]) < 1e-4) cont.pop();
      var hole = [new THREE.Vector2(-GW, GZ0), new THREE.Vector2(GW, GZ0), new THREE.Vector2(GW, GZ1), new THREE.Vector2(-GW, GZ1)];
      var tf = THREE.ShapeUtils.triangulateShape(cont, [hole]), tp = cont.concat(hole), pos = [], nrm = [], uv = [];
      tf.forEach(function (f) {
        var a = tp[f[0]], b = tp[f[1]], c = tp[f[2]];
        if ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) > 0) { var t0 = b; b = c; c = t0; }
        [a, b, c].forEach(function (p) {
          pos.push(XS, p.x, p.y); nrm.push(-1, 0, 0);
          uv.push(0.002, sideV(p.y, 1));
        });
      });
      B.H.raw(pos, nrm, uv);
      /* the gate, set 0.35 m into the transom: its plate, the lattice of
         stiffeners on its face (Spartanburg County), the frame round it    */
      var tr = new Tris(), xg = XS + 0.35;
      tr.quad([xg, -GW, GZ0], [xg, GW, GZ0], [xg, GW, GZ1], [xg, -GW, GZ1], [-1, 0, 0]);
      for (s = -1; s <= 1; s += 2) tr.quad([XS, s * GW, GZ0], [xg, s * GW, GZ0], [xg, s * GW, GZ1], [XS, s * GW, GZ1], [0, -s, 0]);
      tr.quad([XS, -GW, GZ1], [xg, -GW, GZ1], [xg, GW, GZ1], [XS, GW, GZ1], [0, 0, -1]);
      tr.quad([XS, -GW, GZ0], [xg, -GW, GZ0], [xg, GW, GZ0], [XS, GW, GZ0], [0, 0, 1]);
      B.S.add(tr.geo(THREE));
      for (i = 0; i <= 5; i++) B.M.add(box(THREE, 0.26, 0.24, GZ1 - GZ0 - 0.1, XS + 0.2, -GW + 0.3 + i * (2 * GW - 0.6) / 5, (GZ0 + GZ1) / 2));
      for (i = 0; i <= 7; i++) B.M.add(box(THREE, 0.26, 2 * GW - 0.1, 0.22, XS + 0.2, 0, GZ0 + 0.25 + i * (GZ1 - GZ0 - 0.5) / 7));
      /* the stern anchor in its recess to starboard of the gate            */
      B.K.add(box(THREE, 0.1, 2.2, 4.4, XS + 0.06, -5.0, 4.3));
      B.M.add(box(THREE, 0.3, 0.3, 3.2, XS + 0.18, -5.0, 4.6));
      B.M.add(box(THREE, 0.3, 2.4, 0.35, XS + 0.18, -5.0, 3.0));
      B.M.add(box(THREE, 0.3, 1.6, 0.3, XS + 0.18, -5.0, 6.0));
      [-1, 1].forEach(function (d) { B.M.add(box(THREE, 0.3, 0.3, 1.0, XS + 0.18, -5.0 + d * 1.1, 3.4, d * 0.5, 0, 0)); });
    })();

    /* ------------------------------------------------------------ deck */
    function deckStrip(x0, x1, zf, hwf, n) {
      var xs = [x0];
      STATIONS.forEach(function (sx) { if (sx > x0 + 0.05 && sx < x1 - 0.05) xs.push(sx); });
      xs.push(x1);
      var tr = new Tris();
      for (var a = 0; a < xs.length - 1; a++) {
        var xa = xs[a], xb = xs[a + 1], za = zf(xa), zb = zf(xb), ha = hwf(xa), hb = hwf(xb);
        for (var q = 0; q < n; q++) {
          var t0 = -1 + 2 * q / n, t1 = -1 + 2 * (q + 1) / n;
          tr.quad([xa, ha * t0, za], [xb, hb * t0, zb], [xb, hb * t1, zb], [xa, ha * t1, za], [0, 0, 1]);
        }
      }
      return tr;
    }
    var XDE = xStem(ZDK) - 0.02;
    addT(B.D, deckStrip(XS, XDE, function () { return ZDK; }, function (xx) { return xx >= XDE - 1e-3 ? 0 : deckHW(xx); }, 6));

    /* the bow bulwark: its inner face from the deck to the side top, and
       its cap, from the step to the stem head                               */
    (function () {
      var tr = new Tris(), xs = [XSTEP], cap = new Tris();
      STATIONS.forEach(function (sx) { if (sx > XSTEP + 0.05 && sx < XDE - 0.05) xs.push(sx); });
      xs.push(XDE);
      for (s = -1; s <= 1; s += 2) {
        for (k = 0; k < xs.length - 1; k++) {
          var xa = xs[k], xb = xs[k + 1];
          var ya = s * deckHW(xa), yb = s * (xb >= XDE - 1e-3 ? 0 : deckHW(xb));
          var za = zRef(xa), zb = zRef(xb);
          tr.quad([xa, ya, ZDK], [xb, yb, ZDK], [xb, yb, zb], [xa, ya, za], [0, -s, 0]);
          var oa = s * halfB(xa, za - 1e-3), ob = s * halfB(xb, zb - 1e-3);
          cap.quad([xa, ya, za], [xb, yb, zb], [xb, ob, zb], [xa, oa, za], [0, 0, 1]);
        }
      }
      /* the stem head's last metre                                         */
      var zs = zRef(XDE);
      cap.tri([XDE, 0.0, zs], [XSTEM, 0, ZSH], [XDE, halfB(XDE, zs - 1e-3), zs], [0, 0, 1]);
      cap.tri([XDE, 0.0, zs], [XSTEM, 0, ZSH], [XDE, -halfB(XDE, zs - 1e-3), zs], [0, 0, 1]);
      B.S.add(tr.geo(THREE));
      B.S.add(cap.geo(THREE));
    })();

    /* underwater: twin shafts, props and rudders, skegs, bilge keels       */
    function uvAt(geo, u, v) {
      var Uv = geo.getAttribute("uv");
      if (Uv) for (var q = 0; q < Uv.count; q++) Uv.setXY(q, u, v);
      return geo;
    }
    for (s = -1; s <= 1; s += 2) {
      B.H.add(uvAt(strut(THREE, -50.0, s * 4.4, -4.9, -77.0, s * 4.4, -3.4, 0.32, 8), 0.5, 0.01));
      B.H.add(uvAt(strut(THREE, -73.0, s * 4.4, -2.3, -73.0, s * 4.4, -3.6, 0.16, 5), 0.5, 0.01));
      B.H.add(uvAt(cylZ(THREE, 1.75, 1.75, 0.35, 14, 0, 0, -0.17), 0.5, 0.01).rotateY(PI / 2).translate(-78.2, s * 4.4, -3.3));
      B.H.add(uvAt(box(THREE, 3.4, 0.4, 3.6, -81.6, s * 4.4, -1.9), 0.5, 0.01));
      B.H.add(uvAt(box(THREE, 18.0, 0.5, 1.6, -64.0, s * 4.4, -4.6), 0.5, 0.01));
      B.H.add(uvAt(box(THREE, 60.0, 0.3, 1.0, 0.0, s * (halfB(0, -4.4) + 0.15), -4.4, s * 0.75, 0, 0), 0.5, 0.01));
    }

    /* rails: top and middle rail, stanchions every 3 m                     */
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
      /* the waist, from the helicopter deck's border to the block           */
      railRun([[-43.0, s * (halfB(-43, ZDK) - 0.1), ZDK], [XHA - 0.3, s * (halfB(XHA - 0.3, ZDK) - 0.1), ZDK]]);
      /* the forward deck to the step, then along the bulwark top           */
      railRun([[XHF + 0.3, s * (halfB(XHF + 0.3, ZDK) - 0.1), ZDK], [XSTEP, s * (halfB(XSTEP, ZDK) - 0.1), ZDK]]);
      var fc = [];
      for (x = XSTEP + 2.2; x < 72.6; x += 3.4) fc.push([x, s * (halfB(x, zRef(x) - 1e-3) - 0.12), zRef(x)]);
      fc.push([73.25, s * 0.9, zRef(73.25)]);
      railRun(fc);
    }

    /* ----------------------------------------------------------- the block
       From the main deck to 16.7 m, its sides flush with the hull's and in
       the hull's paint; the forward face with the vehicle door; the roof in
       deck paint.                                                          */
    (function () {
      var xs = [XHA];
      STATIONS.forEach(function (sx) { if (sx > XHA + 0.05 && sx < XHF - 0.05) xs.push(sx); });
      xs.push(XHF);
      var hw = xs.map(function (xx) { return halfB(xx, ZDK + 0.01); });
      for (s = -1; s <= 1; s += 2) {
        var tr = new Tris();
        for (k = 0; k < xs.length - 1; k++)
          tr.quad([xs[k], s * hw[k], ZDK], [xs[k + 1], s * hw[k + 1], ZDK], [xs[k + 1], s * hw[k + 1], ZH1], [xs[k], s * hw[k], ZH1], [0, s, 0]);
        B.H.add(sideUV(tr.geo(THREE), s));
      }
      var roof = new Tris();
      for (k = 0; k < xs.length - 1; k++)
        roof.quad([xs[k], -hw[k], ZH1], [xs[k + 1], -hw[k + 1], ZH1], [xs[k + 1], hw[k + 1], ZH1], [xs[k], hw[k], ZH1], [0, 0, 1]);
      addT(B.D, roof);
      var fa = new Tris(), hf = hw[hw.length - 1], ha = hw[0];
      fa.quad([XHF, -hf, ZDK], [XHF, hf, ZDK], [XHF, hf, ZH1], [XHF, -hf, ZH1], [1, 0, 0]);
      fa.quad([XHA, -ha, ZDK], [XHA, ha, ZDK], [XHA, ha, ZH1], [XHA, -ha, ZH1], [-1, 0, 0]);
      B.S.add(fa.geo(THREE));
      /* the vehicle door (Peoria, Racine, Boulder): 5 m by 4.8 m, recessed */
      var dr = new Tris(), dx0 = XHF - 1.2;
      dr.quad([dx0, -2.5, ZDK], [dx0, 2.5, ZDK], [dx0, 2.5, ZDK + 4.8], [dx0, -2.5, ZDK + 4.8], [1, 0, 0]);
      for (var sd = -1; sd <= 1; sd += 2) dr.quad([dx0, sd * 2.5, ZDK], [XHF + 0.01, sd * 2.5, ZDK], [XHF + 0.01, sd * 2.5, ZDK + 4.8], [dx0, sd * 2.5, ZDK + 4.8], [0, -sd, 0]);
      dr.quad([dx0, -2.5, ZDK + 4.8], [XHF + 0.01, -2.5, ZDK + 4.8], [XHF + 0.01, 2.5, ZDK + 4.8], [dx0, 2.5, ZDK + 4.8], [0, 0, -1]);
      B.K.add(dr.geo(THREE));
      B.M.add(box(THREE, 0.2, 5.6, 0.3, XHF + 0.1, 0, ZDK + 4.95));
      for (sd = -1; sd <= 1; sd += 2) {
        B.M.add(box(THREE, 0.2, 0.3, 4.8, XHF + 0.1, sd * 2.65, ZDK + 2.4));
        /* a door and a ladder each side of it, the lockers at its foot     */
        B.K.add(box(THREE, 0.1, 1.0, 2.0, XHF + 0.05, sd * 5.2, ZDK + 1.0));
        B.M.add(strut(THREE, XHF + 0.35, sd * 7.0, ZDK, XHF + 0.35, sd * 7.0, ZH1, 0.05, 4));
        B.M.add(strut(THREE, XHF + 0.35, sd * 7.6, ZDK, XHF + 0.35, sd * 7.6, ZH1, 0.05, 4));
        B.S.add(box(THREE, 1.4, 1.6, 1.4, XHF + 0.7, sd * 8.3, ZDK + 0.7));
        /* the after face: a door each side                                 */
        B.K.add(box(THREE, 0.1, 1.0, 2.0, XHA - 0.05, sd * 7.3, ZDK + 1.0));
      }
      /* the yellow-and-black edged ledge across the front at the 02 level  */
      B.S.add(box(THREE, 0.9, 2 * hf - 0.4, 0.2, XHF + 0.45, 0, 13.4));
      railRun([[XHF + 0.85, -hf + 0.3, 13.5], [XHF + 0.85, hf - 0.3, 13.5]], 1.0);
      /* rails round the roof's edge                                        */
      var rp = [];
      for (k = 0; k < xs.length; k++) rp.push([xs[k], hw[k] - 0.15, ZH1]);
      railRun([[XHF - 0.15, hf - 0.15, ZH1]].concat(rp.slice().reverse()).concat([[XHA + 0.15, ha - 0.15, ZH1]]));
      var rs = [];
      for (k = 0; k < xs.length; k++) rs.push([xs[k], -hw[k] + 0.15, ZH1]);
      railRun([[XHA + 0.15, -ha + 0.15, ZH1]].concat(rs).concat([[XHF - 0.15, -hf + 0.15, ZH1]]));
      railRun([[XHF - 0.15, hf - 0.15, ZH1], [XHF - 0.15, PHW + 0.3, ZH1]]);
      railRun([[XHF - 0.15, -PHW - 0.3, ZH1], [XHF - 0.15, -hf + 0.15, ZH1]]);
    })();

    /* walls in plate, roofs in deck paint                                   */
    function tier(pts, z0, z1) {
      B.S.add(stack(THREE, [[pts, z0], [pts, z1]], false, false));
      var P2 = ccw(pts), tr = new Tris();
      for (var q = 1; q < P2.length - 1; q++) tr.tri([P2[0][0], P2[0][1], z1], [P2[q][0], P2[q][1], z1], [P2[q + 1][0], P2[q + 1][1], z1], [0, 0, 1]);
      addT(B.D, tr);
    }

    /* the pilot house level: the window band round its front and sides, a
       sun brow; the roof's fittings                                          */
    tier(chamRect(XPA, XHF, PHW, 0.6), ZH1 - 0.05, ZP1);
    B.G.add(box(THREE, 0.1, 2 * PHW - 1.6, 0.9, XHF + 0.03, 0, 18.35));
    for (i = -7; i <= 7; i++) B.K.add(box(THREE, 0.14, 0.12, 0.92, XHF + 0.05, i * 1.08, 18.35));
    B.S.add(box(THREE, 0.7, 2 * PHW - 0.8, 0.12, XHF + 0.3, 0, 19.0));
    for (s = -1; s <= 1; s += 2) {
      B.G.add(box(THREE, 9.0, 0.1, 0.9, 18.2, s * (PHW + 0.02), 18.35));
      for (x = 14.2; x < 22.8; x += 1.1) B.K.add(box(THREE, 0.12, 0.14, 0.92, x, s * (PHW + 0.04), 18.35));
      B.G.add(box(THREE, 0.1, 1.6, 0.8, XPA - 0.02, s * 5.0, 18.3));
      B.K.add(box(THREE, 0.1, 1.0, 2.0, XPA - 0.03, s * 2.0, ZH1 + 1.0));
      /* the bridge wing at the forward corner                               */
      B.S.add(box(THREE, 2.6, 1.0, 0.2, XHF - 1.5, s * (PHW + 0.5), 17.6));
      railRun([[XHF - 2.8, s * (PHW + 0.95), 17.7], [XHF - 0.1, s * (PHW + 0.95), 17.7]], 1.0);
      /* raft canisters racked on the block roof beside it (Fresno)         */
      for (x = 11.0; x < 22.5; x += 1.6) {
        B.M.add(box(THREE, 1.4, 0.7, 0.1, x, s * 9.15, ZH1 + 0.1));
        B.W.add(place(THREE, new THREE.CylinderGeometry(0.33, 0.33, 1.2, 7), x - 0.35, s * 9.15, ZH1 + 0.48, 0, 0, PI / 2));
        B.W.add(place(THREE, new THREE.CylinderGeometry(0.33, 0.33, 1.2, 7), x + 0.35, s * 9.15, ZH1 + 0.48, 0, 0, PI / 2));
      }
    }
    /* the flying bridge on the roof: binnacle stands, a signal light each
       side, lockers, the rail round it                                      */
    (function () {
      var rp = chamRect(XPA + 0.2, XHF - 0.2, PHW - 0.2, 0.5).map(function (q) { return [q[0], q[1], ZP1]; });
      railRun(rp.concat([rp[0]]), 1.0);
      for (s = -1; s <= 1; s += 2) {
        B.M.add(cylZ(THREE, 0.18, 0.22, 1.2, 6, XHF - 1.2, s * 6.8, ZP1));
        B.M.add(cylZ(THREE, 0.32, 0.32, 0.5, 8, XHF - 1.2, s * 6.8, ZP1 + 1.2));
        B.S.add(box(THREE, 1.6, 1.2, 1.2, XPA + 2.0, s * 6.4, ZP1 + 0.6));
      }
      B.S.add(box(THREE, 3.2, 2.8, 2.2, 13.2, 0, ZP1 + 1.1));
      B.G.add(box(THREE, 0.1, 2.2, 0.6, 14.82, 0, ZP1 + 1.6));
      B.M.add(cylZ(THREE, 0.25, 0.3, 1.1, 6, 18.5, 0, ZP1));
      B.M.add(box(THREE, 1.0, 0.8, 0.5, 18.5, 0, ZP1 + 1.35));
    })();

    /* the mast: a pole on the pilot house roof, raked struts at its foot,
       the yard, the SPS-10 on its platform, the topmast (drawing; Peoria,
       Racine); the team band round it                                       */
    var MX = 8.55;
    (function () {
      B.M.add(cylZ(THREE, 0.18, 0.32, 33.0 - ZP1, 8, MX, 0, ZP1));
      for (s = -1; s <= 1; s += 2) B.M.add(strut(THREE, MX - 2.6, s * 1.6, ZP1, MX, 0, 26.0, 0.12, 5));
      B.M.add(strut(THREE, MX, -5.6, 32.7, MX, 5.6, 32.7, 0.09, 5));
      for (s = -1; s <= 1; s += 2) B.M.add(strut(THREE, MX, s * 5.4, 32.7, MX, 0, 30.4, 0.04, 3));
      B.M.add(cylZ(THREE, 0.08, 0.16, 40.5 - 33.0, 5, MX, 0, 33.0));
      B.S.add(box(THREE, 2.0, 1.8, 0.12, MX + 0.5, 0, 33.6));
      railRun(chamRect(MX - 0.45, MX + 1.45, 0.85, 0.2).map(function (q) { return [q[0], q[1], 33.66]; }).concat([[MX - 0.45 + 0.2, -0.85, 33.66]]), 0.8);
      /* the SPS-10: a cut paraboloid on a pedestal, turned to starboard    */
      B.M.add(cylZ(THREE, 0.15, 0.2, 0.6, 6, MX + 0.8, 0, 33.7));
      /* a 3.2 m reflector curved in plan, its feed on a bracket ahead      */
      for (var sl = 0; sl < 5; sl++) {
        var yy = -1.28 + sl * 0.64, bend = 0.32 * Math.pow(yy / 1.6, 2);
        B.W.add(box(THREE, 0.12, 0.66, 0.95, MX + 1.0 + bend, yy, 34.8, 0, 0, -0.35 * yy / 1.6));
      }
      B.M.add(strut(THREE, MX + 1.05, 0, 34.8, MX + 2.3, 0, 34.8, 0.05, 4));
      B.M.add(strut(THREE, MX, -1.7, 37.6, MX, 1.7, 37.6, 0.05, 4));
      B.K.add(cylZ(THREE, 0.12, 0.12, 0.3, 6, MX, 0, 40.5));
      B.T.add(cylZ(THREE, 0.36, 0.36, 0.8, 10, MX, 0, 27.6, true));
      /* whips at the pilot house front and on the roof aft                 */
      B.M.add(cylZ(THREE, 0.03, 0.07, 8.0, 4, XHF - 0.4, 3.5, ZP1));
      B.M.add(cylZ(THREE, 0.03, 0.07, 7.0, 4, XPA + 0.8, -4.0, ZP1));
    })();
    /* team flashes on the pilot house roof's forward corners                */
    for (s = -1; s <= 1; s += 2) B.T.add(box(THREE, 2.4, 1.4, 0.1, XHF - 1.8, s * (PHW - 1.3), ZP1 + 0.05));

    /* the twin 3-inch/50 Mk 33 mounts in tubs at the block roof's after
       corners (drawing plan; Boulder, Fresno), trained aft                  */
    function mk33(px, py, pz, hdg) {
      B.S.add(cylZ(THREE, 2.25, 2.3, 1.1, 18, px, py, pz, true));
      B.K.add(cylZ(THREE, 2.1, 2.1, 0.05, 16, px, py, pz + 0.02));
      var g = new THREE.Group();
      var gh = stack(THREE, [[chamRect(-1.5, 1.4, 1.35, 0.5), 0], [chamRect(-1.45, 1.35, 1.3, 0.5), 1.4], [chamRect(-1.1, 1.0, 1.0, 0.45), 2.2]], true, false);
      B.S.add(place(THREE, gh, px, py, pz + 0.3, 0, 0, hdg));
      B.S.add(place(THREE, sphere(THREE, 1.0, 10, 4, -0.2, 0, 2.1, true), px, py, pz + 0.3, 0, 0, hdg));
      for (var sd = -1; sd <= 1; sd += 2) {
        var c = Math.cos(hdg), sn = Math.sin(hdg), ox = 1.35, oy = sd * 0.42;
        var bx0 = px + c * ox - sn * oy, by0 = py + sn * ox + c * oy;
        B.M.add(strut(THREE, bx0, by0, pz + 1.15, bx0 + c * 3.6, by0 + sn * 3.6, pz + 1.35, 0.075, 6, 0.1));
        B.K.add(place(THREE, new THREE.BoxGeometry(0.25, 0.32, 0.9), bx0, by0, pz + 1.15, 0, 0, hdg));
      }
      void g;
    }
    for (s = -1; s <= 1; s += 2) mk33(XHA + 3.4, s * 7.6, ZH1, s > 0 ? PI - 0.35 : PI + 0.35);

    /* ------------------------------------------------- the after deckhouse
       the vehicle passage's casing, its door onto the after deck            */
    tier(chamRect(XDA, XHA + 0.02, DHW, 0.4), ZDK - 0.05, ZD1);
    B.K.add(box(THREE, 0.12, 5.0, 4.8, XDA - 0.04, 0, ZDK + 2.4));
    B.M.add(box(THREE, 0.2, 5.6, 0.3, XDA - 0.1, 0, ZDK + 4.95));
    for (s = -1; s <= 1; s += 2) {
      B.K.add(box(THREE, 1.0, 0.1, 2.0, XDA + 2.5, s * (DHW + 0.03), ZDK + 1.0));
      for (x = XDA + 4.5; x < XHA - 0.5; x += 2.0) B.G.add(box(THREE, 0.7, 0.1, 0.6, x, s * (DHW + 0.03), 11.8));
    }
    railRun(chamRect(XDA + 0.15, XHA - 0.1, DHW - 0.15, 0.3).map(function (q) { return [q[0], q[1], ZD1]; }).concat([[XDA + 0.45, -DHW + 0.15, ZD1]]), 1.0);
    B.S.add(box(THREE, 2.4, 2.0, 1.6, XDA + 3.0, 0, ZD1 + 0.8));

    /* ------------------------------------------------------------ funnels
       to port the twin-uptake funnel, two exhausts on its top; to starboard
       the round one; black tops (drawing plan; Boulder, Fresno)             */
    (function () {
      var fx0 = -30.85, fx1 = -22.15, fy0 = 4.0, fy1 = 8.6, ZF = 20.2;
      var pl = rrect(fx0, fx1, fy0, fy1, 0.9);
      B.S.add(stack(THREE, [[pl, ZDK], [pl, ZF - 1.0]], false, false));
      B.K.add(stack(THREE, [[pl, ZF - 1.0], [pl, ZF]], true, false));
      [fx0 + 2.2, fx1 - 2.2].forEach(function (ex) {
        B.K.add(cylZ(THREE, 0.95, 0.95, 0.5, 12, ex, (fy0 + fy1) / 2, ZF));
        B.M.add(cylZ(THREE, 0.8, 0.8, 0.06, 12, ex, (fy0 + fy1) / 2, ZF + 0.5));
        B.M.add(cylZ(THREE, 0.04, 0.08, 9.5, 4, ex, (fy0 + fy1) / 2 + 1.6, ZF));
      });
      /* the two windows near the top on each face (Fresno)                  */
      for (s = 0; s < 2; s++) {
        var yy = s ? fy1 + 0.02 : fy0 - 0.02;
        B.G.add(box(THREE, 1.0, 0.1, 1.1, -27.6, yy, 17.4));
        B.G.add(box(THREE, 1.0, 0.1, 1.1, -25.6, yy, 17.4));
      }
      B.M.add(strut(THREE, fx0 - 0.25, 6.3, ZDK, fx0 - 0.25, 6.3, ZF - 1.0, 0.05, 4));
      B.S.add(box(THREE, 2.6, 2.2, 2.2, fx0 - 1.5, 6.0, ZDK + 1.1));
      /* the starboard funnel, its base casing and ladder                    */
      var sx = -38.85, sy = -6.6;
      B.S.add(cylZ(THREE, 1.85, 1.95, ZF - 1.0 - ZDK, 16, sx, sy, ZDK, true));
      B.K.add(cylZ(THREE, 1.88, 1.88, 1.0, 16, sx, sy, ZF - 1.0));
      B.K.add(cylZ(THREE, 1.7, 1.7, 0.05, 14, sx, sy, ZF - 0.08));
      B.S.add(box(THREE, 5.2, 4.6, 2.6, sx, sy, ZDK + 1.3));
      B.M.add(strut(THREE, sx + 1.95, sy - 0.4, ZDK + 2.6, sx + 1.95, sy - 0.4, ZF - 0.5, 0.05, 4));
      B.M.add(strut(THREE, sx + 1.95, sy + 0.4, ZDK + 2.6, sx + 1.95, sy + 0.4, ZF - 0.5, 0.05, 4));
      /* the kingpost on its inboard side and the boom stowed athwartships
         to a crutch to port (drawing plan; Boulder, Fresno)                  */
      var kx = sx - 0.5, ky = -4.2;
      B.M.add(cylZ(THREE, 0.22, 0.34, 25.0 - ZDK, 8, kx, ky, ZDK));
      B.M.add(strut(THREE, kx, ky - 1.6, 24.4, kx, ky + 1.6, 24.4, 0.06, 4));
      B.M.add(strut(THREE, kx, ky + 0.3, ZDK + 3.0, kx, 7.6, ZDK + 3.6, 0.16, 6, 0.1));
      B.M.add(strut(THREE, kx, 7.6, ZDK, kx, 7.6, ZDK + 3.6, 0.1, 5));
      B.M.add(strut(THREE, kx, ky, 24.0, kx, 4.0, ZDK + 3.6, 0.03, 3));
      B.M.add(cylZ(THREE, 0.5, 0.5, 0.9, 8, kx + 1.2, ky, ZDK));
    })();

    /* --------------------------------------------- boats in the waist
       one a side where the 1979 plan draws them - the port boat beside the
       after deckhouse, the starboard one further aft - each hung outboard
       under a gantry davit whose top is a railed frame (Boulder 1971,
       Fresno 1983)                                                          */
    [[-8.15, 1], [-19.15, -1]].forEach(function (b) {
      var bx = b[0], sd = b[1], by = sd * 8.5, bz = 9.9, zt = 15.4, yi = sd * 6.4, yo = sd * 10.2;
      lcvp(THREE, B, bx, by, bz, 0);
      for (var fx = -5.0; fx <= 5.0; fx += 10.0) {
        B.M.add(strut(THREE, bx + fx, yi, ZDK, bx + fx, yi, zt, 0.14, 5));
        B.M.add(strut(THREE, bx + fx, yi, zt, bx + fx, yo, zt, 0.11, 5));
        B.M.add(strut(THREE, bx + fx, yi, ZDK + 2.2, bx + fx, yi - sd * 1.4, ZDK, 0.08, 4));
        /* the falls                                                           */
        B.M.add(strut(THREE, bx + fx * 0.8, by, zt, bx + fx * 0.8, by, bz + 1.7, 0.03, 3));
      }
      B.M.add(strut(THREE, bx - 5.0, yo, zt, bx + 5.0, yo, zt, 0.1, 5));
      B.M.add(strut(THREE, bx - 5.0, yi, zt, bx + 5.0, yi, zt, 0.1, 5));
      railRun([[bx - 4.8, yo - sd * 0.1, zt], [bx + 4.8, yo - sd * 0.1, zt]], 0.9);
      /* the winch on the deck inboard of it                                  */
      B.M.add(box(THREE, 1.6, 1.2, 1.1, bx, sd * 5.6, ZDK + 0.55));
    });

    /* ------------------------------------------------- the stowed ramp
       34 m by 8.3 m on the forward deck between the arms: its tread in the
       deck paint, side girders, the tapered toe aft (drawing plan; Racine,
       Fresno)                                                               */
    (function () {
      var xt = XR0 + 2.6, tr = new Tris();
      /* the tread: the toe slopes from the deck up to ZR                     */
      tr.quad([XR0, -RHW + 0.35, ZDK + 0.05], [xt, -RHW + 0.35, ZR], [xt, RHW - 0.35, ZR], [XR0, RHW - 0.35, ZDK + 0.05], [-0.6, 0, 1]);
      var xs = [xt];
      for (x = xt + 5.6; x < XR1 - 0.1; x += 5.6) xs.push(x);
      xs.push(XR1);
      for (k = 0; k < xs.length - 1; k++)
        for (var q = 0; q < 2; q++) {
          var y0 = lerp(-RHW + 0.35, RHW - 0.35, q / 2), y1 = lerp(-RHW + 0.35, RHW - 0.35, (q + 1) / 2);
          tr.quad([xs[k], y0, ZR], [xs[k + 1], y0, ZR], [xs[k + 1], y1, ZR], [xs[k], y1, ZR], [0, 0, 1]);
        }
      addT(B.D, tr);
      /* the side girders with their curbs, and the forward end              */
      for (s = -1; s <= 1; s += 2) {
        var gr = yPrism(THREE, [[XR0, ZDK], [XR1, ZDK], [XR1, ZR + 0.45], [xt, ZR + 0.45], [XR0, ZDK + 0.45]],
                        s > 0 ? RHW - 0.35 : -RHW, s > 0 ? RHW : -RHW + 0.35);
        B.S.add(gr);
      }
      B.S.add(box(THREE, 0.3, 2 * RHW, ZR + 0.3 - ZDK, XR1 - 0.15, 0, (ZDK + ZR + 0.3) / 2));
      /* chocks under it, hinge lugs at its toe                               */
      for (x = XR0 + 6; x < XR1; x += 7) for (s = -1; s <= 1; s += 2) B.K.add(box(THREE, 0.6, 0.5, 0.25, x, s * (RHW + 0.25), ZDK + 0.12));
      for (s = -1; s <= 1; s += 2) B.M.add(box(THREE, 0.8, 0.6, 0.6, XR1 - 0.4, s * (RHW - 0.8), ZR + 0.5));
    })();

    /* ------------------------------------------------- the derrick arms
       tapered plate girders on the forward deck, their tops a walkway with
       rails, joined at the tips by the crosshead and its railed platform,
       X-braced between them; the falls to the ramp's forward end            */
    (function () {
      function zU(xx) { return ZDK + (AZU - ZDK) * (xx - AU0) / (XTIP - AU0); }
      function zL(xx) { return ZDK + (AZL - ZDK) * (xx - AL0) / (XTIP - AL0); }
      for (s = -1; s <= 1; s += 2) {
        var xz = [[AU0, ZDK], [AL0, ZDK], [XTIP, AZL], [XTIP, AZU]];
        B.S.add(yPrism(THREE, xz, s * AY - AT, s * AY + AT));
        /* stiffener flats along both faces                                    */
        for (var f = 0; f < 2; f++) {
          var yf = s * AY + (f ? AT : -AT) + (f ? 0.03 : -0.03);
          for (x = AL0 - 2.0; x < XTIP - 1; x += 2.4) B.M.add(strut(THREE, x, yf, Math.max(ZBW, zL(x)), x, yf, zU(x) - 0.05, 0.05, 3));
          B.M.add(strut(THREE, Math.max(AU0, 54.0), yf, zU(Math.max(AU0, 54.0)) - 0.35, XTIP - 0.3, yf, zU(XTIP - 0.3) - 0.35, 0.06, 3));
        }
        /* the walkway's grating along the top                                 */
        var wk = new Tris(), wa = AU0 + 6.0, wb = XTIP - 3.3;
        wk.quad([wa, s * AY - AT - 0.05, zU(wa) + 0.02], [wb, s * AY - AT - 0.05, zU(wb) + 0.02],
                [wb, s * AY + AT + 0.05, zU(wb) + 0.02], [wa, s * AY + AT + 0.05, zU(wa) + 0.02], [-0.3, 0, 1]);
        B.M.add(wk.geo(THREE));
        /* walkway rails                                                       */
        railRun([[AU0 + 6.0, s * (AY - AT + 0.08), zU(AU0 + 6.0)], [XTIP - 3.3, s * (AY - AT + 0.08), zU(XTIP - 3.3)]], 1.0);
        railRun([[AU0 + 6.0, s * (AY + AT - 0.08), zU(AU0 + 6.0)], [XTIP - 3.3, s * (AY + AT - 0.08), zU(XTIP - 3.3)]], 1.0);
        /* the light post at the tip                                          */
        B.M.add(cylZ(THREE, 0.06, 0.09, 3.5, 5, XTIP - 0.5, s * AY, AZU));
      }
      /* the crosshead and its platform, flush with the tips                   */
      B.S.add(box(THREE, 2.2, 2 * (AY + AT), AZU - AZL + 0.3, XTIP - 1.1, 0, (AZL + AZU) / 2 - 0.15));
      var pf = new Tris();
      pf.quad([XTIP - 3.3, -AY - AT, AZU + 0.01], [XTIP, -AY - AT, AZU + 0.01], [XTIP, AY + AT, AZU + 0.01], [XTIP - 3.3, AY + AT, AZU + 0.01], [0, 0, 1]);
      addT(B.D, pf);
      B.S.add(box(THREE, 1.1, 2 * (AY - AT), 0.3, XTIP - 2.75, 0, AZU - 0.15));
      railRun([[XTIP - 3.3, AY + AT - 0.1, AZU], [XTIP - 0.1, AY + AT - 0.1, AZU], [XTIP - 0.1, -AY - AT + 0.1, AZU], [XTIP - 3.3, -AY - AT + 0.1, AZU]], 1.1);
      /* sheaves under the crosshead and the falls down to the ramp's end    */
      for (s = -1; s <= 1; s += 2) {
        B.K.add(box(THREE, 0.7, 0.5, 0.7, XTIP - 1.2, s * 2.6, AZL - 0.5));
        B.M.add(strut(THREE, XTIP - 1.2, s * 2.6, AZL - 0.8, XR1 - 0.4, s * (RHW - 0.8), ZR + 0.8, 0.05, 3));
      }
      /* the X bracing between the arms in their own plane                     */
      var xa = 74.0, xb = XTIP - 2.2;
      B.M.add(strut(THREE, xa, AY - AT, zU(xa) - 0.4, xb, -AY + AT, zU(xb) - 0.4, 0.09, 4));
      B.M.add(strut(THREE, xa, -AY + AT, zU(xa) - 0.4, xb, AY - AT, zU(xb) - 0.4, 0.09, 4));
      B.M.add(strut(THREE, xa, AY - AT, zU(xa) - 0.4, xa, -AY + AT, zU(xa) - 0.4, 0.09, 4));
      /* the jackstaff forward of the ramp's end (Racine)                      */
      B.W.add(cylZ(THREE, 0.1, 0.16, 9.0, 6, 70.6, 0, ZDK));
      B.M.add(strut(THREE, 70.6, -0.9, 14.8, 70.6, 0.9, 14.8, 0.04, 3));
    })();

    /* ------------------------------------------- deck fittings and anchors */
    for (s = -1; s <= 1; s += 2) {
      /* bitts along the deck edges and at the stern                          */
      [[-84.0, 6.6], [-50.0, 9.6], [-14.0, 9.6], [27.5, 8.6], [40.0, 7.8], [50.0, 7.2]].forEach(function (b) {
        B.M.add(cylZ(THREE, 0.2, 0.2, 0.55, 6, b[0] - 0.35, s * b[1], ZDK));
        B.M.add(cylZ(THREE, 0.2, 0.2, 0.55, 6, b[0] + 0.35, s * b[1], ZDK));
      });
      /* the windlass and chain pipes ahead of the arms' feet                  */
      B.M.add(cylZ(THREE, 0.5, 0.55, 0.8, 10, 62.5, s * 6.0, ZDK));
      B.K.add(cylZ(THREE, 0.3, 0.3, 0.05, 8, 60.0, s * 6.2, ZDK));
      /* the anchor in each hawse (Peoria)                                     */
      var ay = halfB(59.35, 5.0);
      B.K.add(box(THREE, 1.6, 0.3, 2.0, 59.35, s * (ay + 0.05), 4.3, 0, 0, s * 0.3));
      B.M.add(box(THREE, 0.35, 0.35, 2.6, 59.35, s * (ay + 0.12), 4.0, 0, 0, s * 0.3));
      /* vents along the waist                                                  */
      [-42.0, -33.0].forEach(function (vx) { B.S.add(box(THREE, 1.4, 1.0, 1.2, vx, s * 9.4, ZDK + 0.6)); });
      /* whips on the forward deck (Fresno)                                     */
      B.M.add(cylZ(THREE, 0.03, 0.07, 8.5, 4, 38.6, s * 8.4, zRef(38.6)));
    }
    /* the ramp's winch drums before the block (Racine) and chocks          */
    for (s = -1; s <= 1; s += 2) {
      B.M.add(place(THREE, new THREE.CylinderGeometry(0.75, 0.75, 1.6, 12), XHF + 3.2, s * 5.6, ZDK + 0.95));
      B.S.add(box(THREE, 1.0, 2.2, 0.9, XHF + 3.2, s * 5.6, ZDK + 0.45));
      [-70.0, -30.0, 30.0, 46.0].forEach(function (cx3) {
        B.M.add(box(THREE, 1.2, 0.35, 0.45, cx3, s * (halfB(cx3, ZDK) - 0.35), ZDK + 0.22));
      });
    }
    /* at the very stern, clear of the circles: the stern anchor's winch
       house to starboard and a locker to port (drawing profile; Fresno)      */
    B.S.add(box(THREE, 3.6, 3.0, 2.4, -82.6, -5.2, ZDK + 1.2));
    B.S.add(box(THREE, 2.4, 2.0, 1.6, -82.8, 5.4, ZDK + 0.8));
    B.M.add(cylZ(THREE, 0.7, 0.7, 1.2, 10, -82.6, -2.6, ZDK));

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

/* Registration: the row's only key. len is the measured X extent, transom
   to the derrick arms' tips: the published 171.3 m (562 ft) overall.        */
UNIT_MODELS["nato_e60_lst"] = { len: 171.3, build: function (THREE, M, C) { return HeroNewportLST.build(THREE, M, C); } };
