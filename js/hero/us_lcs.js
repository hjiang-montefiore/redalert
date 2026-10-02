/* ============================================================================
   us_lcs.js -- HERO model: the US Navy's Littoral Combat Ship, in both of its
   hull designs. Two keys, two different ships:
     corvette_n         the Freedom class (LCS-1), Lockheed Martin's steel
                        semi-planing monohull, 115.3 m by 17.5 m, as she is
                        today (LCS-9 in 2020, LCS-5 in 2022, LCS-21 in 2025).
     nato_e00_corvette  the Independence (LCS-2), Austal's aluminium
                        trimaran, 127.4 m by 31.6 m, as she was in her first
                        decade (Key West, 2010).

   WHICH ROW DRAWS WHICH SHIP. corvette_n's own cards describe the Freedom
   class - facts.js "Freedom-class littoral combat ship (LCS-1)", steel
   monohull and combining gear; warship_specs.js "LCS (Freedom class)",
   115.3 x 17.5 m - and corvette_n is also the corvette every navy without
   a model of its own borrows (see the registration at the end), which a
   monohull serves and a trimaran does not. The e00 row names "USS Freedom
   (LCS-1) and USS Independence (LCS-2)" and carries the RAM: the
   Independence, with SeaRAM on her hangar, is the other half of it.

   What the pictures gave, all on Wikimedia Commons:
     - The Navy's two fact graphics ("An informational graphic depicting the
       littoral combat ship USS Freedom" 8618564659, and "... USS
       Independence" 8619670500): a broadside silhouette of each ship beside
       the published figures (378 ft by 57.4 ft; 419 ft by 103.7 ft), read
       pixel by pixel for the sheer, the stem, every roof level, the mast,
       the gun, RAM and SeaRAM and the flight deck.
     - USSIndependenceWeapons.png: the plan of the trimaran's deck - the
       wide aft body, the angled shoulders, the narrow neck, the dagger of a
       bow, the pad circle, and two square housings on the island roof.
     - Freedom: USS-Freedom-130222-N-DR144-174 (2013, bow quarter) and
       090928-N-7241L-232 (2009, port side from above): the house's sides
       are the hull's sides carried on up, with no side deck; the boat bay
       in the port side abaft the bridge; radomes, mast and RAM. USS Little
       Rock (LCS-9) underway 16 Feb 2020, USS Milwaukee (LCS-5) with FS
       Germinal 16 Feb 2022, and USS Minneapolis-Saint Paul (LCS-21) in
       Guantanamo Bay, July 2025: the bridge glazing, the four radomes, the
       Mk 46 30 mm mounts on sponsons either side abaft the bridge, the
       tower mast with its yard, the box of the air-search radar and the
       pole over it, the cut corners of the hangar, the flight deck's fence.
       None of the three shows a Naval Strike Missile launcher, so this
       Freedom has none.
     - Independence: USS Independence (LCS-2) at NAS Key West, 29 Mar 2010
       (100329-N-1481K-298): the bridge windows round the three faces of the
       island's front, the white cone and the lattice mast over it with the
       white dome at its head, the grey domes on the roof, SeaRAM, the boat
       bay in the port quarter, the flight deck and the anchor at the stem.
       "Independence (LCS 2) in drydock", from ahead: the centre hull, the
       two side hulls and the arched wet deck between them. USS Gabrielle
       Giffords (LCS-10), 1 Oct 2019: the starboard boat bay and the ports
       along the side. No NSM: it came to the class in 2019 (LCS-10), after
       the period this row draws.

   DATA NOTE (reported, not changed here): rules.js arms corvette_n with
   navgun_76 (an OTO 76 mm; the class has the 57 mm Mk 110), ssm_nsm (no
   photograph of a Freedom-class ship shows NSM) and ciws_phalanx (her
   point defence is the RAM launcher); facts.js gives corvette_n a "21-cell
   SeaRAM", where the Freedom's 21-cell launcher is the Mk 49 RAM and
   SeaRAM is the Independence's 11-cell fit.

   What has to read at a glance:
     Freedom: the long forecastle with the gun at the after end of it; the
       house rising sheer from the deck edge, its sloping front, the bridge
       glazing, four white radomes and the tall tower mast with the radar
       box on it; the 30 mm sponsons; the hangar with RAM on its roof; a
       long fenced flight deck to the stern, the ramp door and four
       waterjets in the transom.
     Independence: a dagger of a bow, the wide wedge of the aft body
       standing on three hulls, an aft deck 44 m long and the full 31.6 m
       wide, the island with its band of windows, the lattice mast, SeaRAM.

   Model space: +X bow, +Y port, +Z up, real metres, waterline at z = 0.
   Nothing is allowed past either end of the hull (the renderer scales by
   the X extent). A flight deck is flat, at one level, and clear of anything
   but its edge rails and fittings: the renderer lays a helicopter out on it
   by ray and by cell (render3d.js deckOf/padSpot) and
   tools/jsc/parked3d_check.js C holds it to the deck. The one trained
   mount is the Mk 110 57 mm, named "turret"; everything else is baked.

   Materials are the house three tiers: SKIN (painted CanvasTextures: hull,
   deck, plate tile), METAL, GLASS, a few flat colours and the team
   material, exactly C.team (era-kit stand-ins depend on it). Every static
   part is merged into one mesh per material (nine) and the gun is the only
   separate group (three meshes): 12 draw calls, 9 materials. 14,922
   triangles for the Freedom, 15,446 for the Independence.

   ASCII only -- a stray byte in a hex literal has broken this project.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroUsLcs = (function () {
  "use strict";

  var PI = Math.PI;

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
  /* ------------------------------------------------------------- batching
     Every static part lands in one Batch per material and goes out as one
     mesh. A Batch built with a tile size re-projects its UVs from each
     triangle's own position (box projection, metres / tile), so the plate
     texture keeps one size on every block, strut and hood.               */
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
  /* vertical cylinder (axis +Z) standing on z0                             */
  function cylZ(THREE, rt, rb, h, seg, x, y, z0, open) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, !!open);
    g.rotateX(PI / 2);
    return place(THREE, g, x, y, z0 + h * 0.5);
  }
  /* a round bar between two points: struts, masts, whips, barrels         */
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
    g.rotateX(PI / 2);                             /* poles on the Z axis    */
    return place(THREE, g, x, y, z);
  }
  /* every UV of a part pointed at one texel: underwater fittings take the
     anti-fouling straight off the hull canvas                             */
  function uvAt(geo, u, v) {
    var U = geo.getAttribute("uv");
    if (U) for (var i = 0; i < U.count; i++) U.setXY(i, u, v);
    return geo;
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
     outline with the same number of corners in the same order. This is
     how every block of the superstructure gets its inboard lean and its
     faceted prow: the outline simply changes from one height to the next.
     A corner may carry its own z as a third element, so a wall can stand
     on the sheer line instead of a level. capTop / capBot close the ends
     with a fan.                                                          */
  function stack(THREE, rings, capTop, capBot) {
    var pos = [], i, k, n = rings[0][0].length;
    var R = rings.map(function (r) { return { p: ccw(r[0]), z: r[1] }; });
    function P(ri, k) { var q = R[ri].p[k % n]; return [q[0], q[1], q.length > 2 ? q[2] : R[ri].z]; }
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
  function frustum(THREE, pts, zb, zt, sTop) {
    var cx = 0, cy = 0, i;
    for (i = 0; i < pts.length; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    cx /= pts.length; cy /= pts.length;
    var top = pts.map(function (q) { return [cx + (q[0] - cx) * sTop, cy + (q[1] - cy) * sTop]; });
    return stack(THREE, [[pts, zb], [top, zt]], true, true);
  }
  /* a rectangle in plan with its corners cut off, counter-clockwise      */
  function chamRect(x0, x1, hw, ch) {
    return [[x0 + ch, -hw], [x1 - ch, -hw], [x1, -hw + ch], [x1, hw - ch],
            [x1 - ch, hw], [x0 + ch, hw], [x0, hw - ch], [x0, -hw + ch]];
  }
  /* a section drawn in the YZ plane, [y, z], extruded along X from x0 to
     x1: bridge wings, hoods, anything whose shape is its cross-section   */
  function xPrism(THREE, yz, x0, x1) {
    var pts = ccw(yz), n = pts.length, pos = [], k;
    function tri(a, b, c) { pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]); }
    for (k = 0; k < n; k++) {
      var a = pts[k], b = pts[(k + 1) % n];
      /* (y, z) counter-clockwise: the outward side normal is (dz, -dy),
         which (a0, b0, b1) and (a0, b1, a1) wind toward                   */
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

  /* ----------------------------------------------------------- plan helpers */
  /* a symmetric outline from its port half: [x, y > 0] aft to fore. The
     starboard half is the mirror, so the ring runs counter-clockwise seen
     from above, and every ring of a stack has the same corner count.      */
  function symRing(half) {
    var out = [], i;
    for (i = 0; i < half.length; i++) out.push([half[i][0], -half[i][1]].concat(half[i].slice(2)));
    for (i = half.length - 1; i >= 0; i--) out.push(half[i].slice());
    return out;
  }
  /* a rectangle in plan with its four corners cut, the after cut chA and the
     forward cut chF: 8 corners                                              */
  function sym8(xa, xb, hw, chA, chF) {
    return symRing([[xa, hw - chA], [xa + chA, hw], [xb - chF, hw], [xb, hw - chF]]);
  }
  function rect4(xa, xb, hw) { return symRing([[xa, hw], [xb, hw]]); }
  /* pitch about Y, then yaw about Z, then move: a launcher box on its cradle */
  function orient(g, pitch, yaw, x, y, z) { g.rotateY(pitch); g.rotateZ(yaw); g.translate(x, y, z); return g; }

  /* =============================================================== variants
     Everything that differs between the two ships is a table here. x runs
     from midships, bow +. Heights are metres above the waterline; the
     tables were read off the Navy silhouettes at 0.24 m (Freedom) and
     0.27 m (Independence) a pixel and checked against the photographs.    */
  var P_HULL = 0x636b72, P_SUP = 0x6e767d, P_DECK = 0x43484d;
  var C_FOUL = 0x3a1d18, C_BOOT = 0x14181b;

  var FD = {
    id: "freedom", seed: 1, LOA: 115.3,
    XS: -57.65, XDK: -57.65, XB: 57.65, RAKE: 0, CAMBER: 0.15,
    HZ0: -3.6, HZ1: 7.2, DH: 14.4, boot: 0.9, ZM: 5.6,
    /* deck edge: 6.6 m at the stem head, a little lower each station aft to
       5.8 at the gun, and level at 5.6 from the gun to the stern, which is
       the height of the flight deck: the silhouette's 6.57, 6.32, 6.08,
       5.84 and 5.59 steps                                                  */
    ZD: [[-57.65, 5.60], [28, 5.60], [34, 5.84], [40, 6.08], [46, 6.32], [51, 6.50], [57.65, 6.62]],
    /* deck-edge half-breadth: 17.5 m of beam from the gun to the stern,
       tapering to the stem head                                            */
    YD: [[-57.65, 8.15], [-52, 8.55], [-45, 8.75], [20, 8.75], [28, 8.60], [33, 8.30], [38, 7.50],
         [42, 6.50], [46, 5.20], [50, 3.90], [53, 2.50], [55.5, 1.20], [57.0, 0.40], [57.65, 0]],
    /* waterline half-breadth: the hard chine of the semi-planing hull sits
       on the water, the topsides flare out 21 deg above it                 */
    YW: [[-57.65, 6.00], [-50, 6.30], [-30, 6.50], [5, 6.50], [12, 6.20], [20, 5.60], [28, 4.60],
         [35, 3.40], [41, 2.30], [46, 1.20], [49, 0.50], [51.1, 0]],
    ZKEEL: [[-57.65, -0.60], [-52, -1.30], [-44, -2.10], [-34, -2.90], [-20, -3.40], [20, -3.40],
            [35, -3.20], [45, -3.00]],
    PEXP: [[-57.65, 1.8], [-30, 1.6], [10, 1.35], [40, 1.15]],
    QEXP: [[-57.65, 1.0], [20, 1.0], [45, 1.3], [57.65, 1.5]],
    /* the stem rakes 45 deg: 1 m aft for every metre down (silhouette)     */
    stemX0: 51.1, stemK: 1.0,
    KW: [[-3.6, 0.20], [0, 0.30], [3, 0.45], [6.6, 0.62]],
    ST: [-57.65, -56.5, -54, -50, -45, -40, -35, -30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 24,
         28, 31, 34, 37, 40, 43, 46, 48, 50, 52, 53.8, 55.2, 56.3, 57.1, 57.65]
  };

  var IN = {
    id: "indep", seed: 2, LOA: 127.4,
    /* the deck overhangs the transom: at the waterline the stern is at
       -58.5 and it rakes 28 deg aft to -63.7 at the deck edge (silhouette:
       the bottom edge climbs from the water at 122 m to the deck at 127 m) */
    XS: -58.5, XDK: -63.7, XB: 63.7, RAKE: 0.536, CAMBER: 0.12,
    HZ0: -4.2, HZ1: 10.0, DH: 15.9, boot: 2.2, ZM: 9.7,
    /* flight deck at 9.7, the foredeck 9.2 to 9.4, then the sheer drops
       to the stem head at 5.95: the long ramp of the bow                    */
    ZD: [[-63.7, 9.70], [5, 9.70], [18, 9.30], [34.7, 9.16], [39.7, 9.43], [45.9, 9.43], [49.7, 8.89],
         [53.5, 8.35], [56.7, 7.81], [58.3, 7.54], [60.5, 7.27], [61.5, 7.00], [62.9, 5.95], [63.7, 5.95]],
    /* the plan of the weapons diagram: full 31.6 m to the shoulders at x 4,
       a diagonal cut in to a 10 m neck at x 18, then a dagger to the stem  */
    YD: [[-63.7, 15.8], [3.95, 15.8], [18.3, 5.0], [26, 4.3], [36, 3.7], [46, 2.9], [56, 1.6],
         [62, 0.5], [63.7, 0]],
    /* the envelope of the three hulls on the water, the outer hulls aft
       and the central hull alone forward of the shoulders: kept for the
       record; the hulls themselves are INC and AMA below                   */
    YW: [[-58.5, 12.4], [-30, 12.6], [-8, 12.6], [3.95, 11.0], [10, 6.8], [18.3, 3.3], [30, 2.6],
         [40, 2.1], [50, 1.1], [56.2, 0]],
    ZKEEL: [[-58.5, -1.2], [-52, -2.4], [-40, -3.6], [-25, -4.0], [30, -4.0], [45, -3.5]],
    PEXP: [[-58.5, 1.1], [30, 1.1]],
    QEXP: [[-58.5, 1.0], [63.7, 1.0]],
    /* the stem: 5.4 m of rise over 7.5 m of run (silhouette), 54 deg off the
       vertical, a wave-piercing dagger                                      */
    stemX0: 56.2, stemK: 1.39,
    KW: [[-4.2, 0.16], [0, 0.18], [3, 0.22], [6.2, 0.26]],
    ST: [-58.5, -56, -52, -46, -40, -34, -28, -22, -16, -10, -5, 0, 3.95, 6, 8, 10, 12, 14, 16, 18.3,
         21, 24, 28, 32, 36, 40, 44, 48, 52, 55, 57.5, 59.5, 61, 62.2, 63, 63.7]
  };

  /* The Independence's centre hull alone: the same lines forward of the
     shoulders, where it is the whole ship, but only 6.6 m across the
     waterline aft of them, where the two side hulls carry the rest of the
     beam (drydock photograph, from ahead). Its sides run up inside the
     cross-structure to the deck; the stern is upright under the overhang. */
  var INC = {
    id: "indep", seed: 2, LOA: 127.4,
    XS: -58.5, XDK: -63.7, XB: 63.7, RAKE: 0, CAMBER: 0.0,
    HZ0: -4.2, HZ1: 10.0, DH: 15.9, boot: 2.2, ZM: 9.7,
    ZD: IN.ZD,
    YD: [[-58.5, 4.4], [3.95, 4.6], [18.3, 5.0], [26, 4.3], [36, 3.7], [46, 2.9], [56, 1.6], [62, 0.5], [63.7, 0]],
    YW: [[-58.5, 2.5], [-45, 3.0], [-10, 3.3], [18.3, 3.3], [30, 2.6], [40, 2.1], [50, 1.1], [56.2, 0]],
    ZKEEL: IN.ZKEEL, PEXP: IN.PEXP, QEXP: IN.QEXP,
    stemX0: 56.2, stemK: 1.39, KW: IN.KW,
    ST: IN.ST
  };
  /* the side hulls: centred 12.6 m out, 2.7 m across the water and 1.8 m
     deep, from the stern to under the shoulders; each joins the underside
     of the cross-structure, the wet deck, 3.9 m over the water              */
  var AMA = { yc: 12.6, zTop: 4.4,
    /* x, bottom z, half-breadth on the water, half-breadth at the top   */
    ST: [[-58.5, -0.9, 1.05, 1.5], [-55, -1.5, 1.3, 1.65], [-48, -1.8, 1.38, 1.7], [-20, -1.8, 1.38, 1.7],
         [-8, -1.6, 1.25, 1.62], [-2, -1.1, 0.95, 1.5], [2.5, 0.2, 0.5, 1.2], [4.2, 2.4, 0.12, 0.35]] };

  /* every hull station gap over 2.6 m split in two: a smoother sheer, flare
     and stem for the same lines                                           */
  function dens(st) {
    var out = [st[0]], i;
    for (i = 1; i < st.length; i++) {
      if (st[i] - st[i - 1] > 1.7) out.push((st[i] + st[i - 1]) * 0.5);
      out.push(st[i]);
    }
    return out;
  }
  FD.ST = dens(FD.ST); IN.ST = dens(IN.ST); INC.ST = IN.ST;

  /* ------------------------------------------------------------- the form */
  function zDk(V, x) { return tbl(V.ZD, x); }
  function yDk(V, x) { return tbl(V.YD, x); }
  function yWk(V, x) { return x >= V.stemX0 ? 0 : tbl(V.YW, x); }
  function xStem(V, z) { return V.stemX0 + V.stemK * z; }
  function wedge(V, x, z) { return tbl(V.KW, z) * Math.max(0, xStem(V, z) - x); }
  /* the deck edge as the hull has it: the stem wedge trims the last metres */
  function yDeck(V, x) { return Math.min(yDk(V, x), wedge(V, x, zDk(V, x))); }
  function zLow(V, x) { return Math.max(tbl(V.ZKEEL, x), (x - V.stemX0) / V.stemK); }
  function halfB(V, x, z) {
    var zl = zLow(V, x), zd = zDk(V, x), yw = yWk(V, x), yd = yDk(V, x), y;
    if (z <= zl + 1e-6) return 0;
    if (z < 0) {
      var s = clamp(z / zl, 0, 1), p = tbl(V.PEXP, x);
      y = yw * Math.pow(Math.max(0, 1 - Math.pow(s, p)), 1 / p);
    } else {
      y = yw + (yd - yw) * Math.pow(clamp(z / zd, 0, 1), tbl(V.QEXP, x));
    }
    return Math.min(y, wedge(V, x, z));
  }
  /* One side of a station, keel to deck edge, as [y, z]: the keel, four
     rows under water, the waterline (the chine, row 5) and three above. Rows
     under a risen keel or forward of the stem fold onto the lowest point.   */
  var ROWS = 9, R_CH = 5;
  function section(V, x) {
    var zl = zLow(V, x), zd = zDk(V, x), out = [], k;
    var zs = [zl, zl * 0.88, zl * 0.70, zl * 0.45, zl * 0.20, 0, zd * 0.30, zd * 0.60, zd];
    for (k = 0; k < zs.length; k++) {
      var z = Math.max(zl, zs[k]);
      out.push([k === 0 ? 0 : halfB(V, x, z), z]);
    }
    for (k = 1; k < out.length; k++) if (out[k][1] < out[k - 1][1]) out[k][1] = out[k - 1][1];
    return out;
  }
  function deckZ(V, x, y) {
    var h = yDeck(V, x), t = h > 1e-4 ? clamp(Math.abs(y) / h, 0, 1) : 1;
    return zDk(V, x) + V.CAMBER * (1 - t * t);
  }

  /* ============================================================= textures */
  var TEX = {};
  /* the hull elevation, one canvas for both sides (no lettering to mirror):
     u runs from the after end of the deck to the stem head, v from the keel
     to the deck edge. Grey topsides over a black boot top over red                */
  function hullTex(THREE, V) {
    var key = "hull_" + V.id;
    if (TEX[key]) return TEX[key];
    var W = 2048, H = 256, cv = mkCv(W, H), g = cv.getContext("2d"), R = rngOf(V.seed * 7919), i, k;
    var PXZ = H / (V.HZ1 - V.HZ0), PXX = W / V.LOA;
    function Y(z) { return (V.HZ1 - z) * PXZ; }
    g.fillStyle = hx(P_HULL); g.fillRect(0, 0, W, H);
    g.fillStyle = hx(C_BOOT); g.fillRect(0, Y(V.boot), W, Y(-0.3) - Y(V.boot));
    g.fillStyle = hx(C_FOUL); g.fillRect(0, Y(-0.3), W, H - Y(-0.3));
    g.fillStyle = "rgba(205,210,212,0.40)"; g.fillRect(0, Y(V.boot) - 2, W, 2);
    for (i = 0; i < 100; i++) {
      g.globalAlpha = 0.012 + R() * 0.022;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, Y(V.HZ1) + R() * (Y(V.boot) - Y(V.HZ1)), 60 + R() * 220, 6 + R() * 18);
    }
    g.globalAlpha = 1;
    /* plate seams every 3 m, and a lit lip along the boot top                */
    for (k = 0; k < V.LOA; k += 3.0) {
      g.fillStyle = "rgba(0,0,0,0.10)"; g.fillRect(k * PXX, 0, 1.4, Y(V.boot));
    }
    TEX[key] = finish(THREE, cv);
    return TEX[key];
  }

  /* the weather deck: dark non-skid in plan, one pixel row of canvas a
     metre-for-metre match of the deck so the pad markings land where they
     were measured. Port is the top of the canvas.                           */
  function marksFreedom(g, X, Y, PX) {
    /* the landing circle on the after deck (flight deck certification
       photograph), its inner ring, the centre line from the hangar door and
       the cross line; a thin edge line a metre inside each deck edge      */
    var xc = -43.0, r = 6.2;
    g.strokeStyle = "rgba(205,210,212,0.80)"; g.lineWidth = 0.40 * PX;
    g.beginPath(); g.arc(X(xc), Y(0), r * PX, 0, 2 * PI); g.stroke();
    g.lineWidth = 0.28 * PX;
    g.beginPath(); g.arc(X(xc), Y(0), 2.4 * PX, 0, 2 * PI); g.stroke();
    g.fillStyle = "rgba(205,210,212,0.70)";
    g.fillRect(X(-55.5), Y(0.15), 25.5 * PX, 0.30 * PX);
    g.fillRect(X(xc) - 0.15 * PX, Y(r + 0.5), 0.30 * PX, (2 * r + 1.0) * PX);
    g.fillRect(X(-56.8), Y(7.3), 28.3 * PX, 0.18 * PX);
    g.fillRect(X(-56.8), Y(-7.3) - 0.18 * PX, 28.3 * PX, 0.18 * PX);
  }
  function marksIndep(g, X, Y, PX) {
    /* the pad circle and its ring (weapons diagram), the landing area box
       round it, and the edge line 1.2 m inside the deck edge               */
    var xc = -43.0, r = 7.5;
    g.strokeStyle = "rgba(205,210,212,0.80)"; g.lineWidth = 0.40 * PX;
    g.beginPath(); g.arc(X(xc), Y(0), r * PX, 0, 2 * PI); g.stroke();
    g.lineWidth = 0.28 * PX;
    g.beginPath(); g.arc(X(xc), Y(0), 3.0 * PX, 0, 2 * PI); g.stroke();
    g.fillStyle = "rgba(205,210,212,0.70)";
    g.fillRect(X(-59.0), Y(0.15), 33.0 * PX, 0.30 * PX);
    g.fillRect(X(xc) - 0.15 * PX, Y(r + 0.6), 0.30 * PX, (2 * r + 1.2) * PX);
    g.fillRect(X(-59.0), Y(10.6), 33.0 * PX, 0.22 * PX);
    g.fillRect(X(-59.0), Y(-10.6) - 0.22 * PX, 33.0 * PX, 0.22 * PX);
    g.fillRect(X(-59.0), Y(10.6), 0.22 * PX, 21.2 * PX);
    g.fillRect(X(-26.0), Y(10.6), 0.22 * PX, 21.2 * PX);
    g.fillRect(X(-62.6), Y(14.6), 62.0 * PX, 0.20 * PX);
    g.fillRect(X(-62.6), Y(-14.6) - 0.20 * PX, 62.0 * PX, 0.20 * PX);
  }
  function deckTex(THREE, V) {
    var key = "deck_" + V.id;
    if (TEX[key]) return TEX[key];
    var W = 2048, H = 512, cv = mkCv(W, H), g = cv.getContext("2d"), R = rngOf(V.seed * 104729), i;
    var PX = W / V.LOA;
    function X(x) { return (x - V.XDK) * PX; }
    function Y(y) { return (V.DH - y) * PX; }
    g.fillStyle = hx(P_DECK); g.fillRect(0, 0, W, H);
    for (i = 0; i < 1400; i++) {
      g.globalAlpha = 0.05 + R() * 0.10;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 2 + R() * 5, 2 + R() * 5);
    }
    for (i = 0; i < 40; i++) {
      g.globalAlpha = 0.02 + R() * 0.03;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 40 + R() * 160, 10 + R() * 40);
    }
    g.globalAlpha = 1;
    if (V.id === "freedom") marksFreedom(g, X, Y, PX); else marksIndep(g, X, Y, PX);
    TEX[key] = finish(THREE, cv);
    return TEX[key];
  }

  /* superstructure plate: aluminium panels, seams every half tile. One tile
     is 8 m (Batch tile size), projected from each triangle's own position */
  function supTex(THREE) {
    if (TEX.sup) return TEX.sup;
    var S = 256, cv = mkCv(S, S), g = cv.getContext("2d"), R = rngOf(4242), i;
    g.fillStyle = hx(P_SUP); g.fillRect(0, 0, S, S);
    for (i = 0; i < 70; i++) {
      g.globalAlpha = 0.02 + R() * 0.035;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * S, R() * S, 20 + R() * 90, 6 + R() * 30);
    }
    g.globalAlpha = 1;
    g.fillStyle = "rgba(0,0,0,0.26)";
    g.fillRect(0, 0, S, 2); g.fillRect(0, 0, 2, S); g.fillRect(0, S / 2, S, 1.5); g.fillRect(S / 2, 0, 1.5, S);
    g.fillStyle = "rgba(255,255,255,0.07)";
    g.fillRect(0, 2, S, 1.5); g.fillRect(2, 0, 1.5, S);
    TEX.sup = finish(THREE, cv);
    return TEX.sup;
  }

  /* ================================================================= hull
     Lofted stern to stem through ST, nine rows a station. Each side is two
     strips (keel to chine, chine to deck edge) so the chine stays a hard
     line, and the two sides are separate so the stem and the keel are hard
     edges. The first station may be raked (the Independence's transom): its
     rows sit further aft as they climb.                                    */
  function hullGeos(THREE, V) {
    var st = V.ST, n = st.length, secs = st.map(function (x) { return section(V, x); }), out = [];
    var ii, jj, k;
    function xAt(i, j) { return i === 0 ? st[0] - V.RAKE * Math.max(0, secs[0][j][1]) : st[i]; }
    [1, -1].forEach(function (sd) {
      [[0, R_CH], [R_CH, ROWS - 1]].forEach(function (rg) {
        var pos = [], uv = [], idx = [], cols = rg[1] - rg[0] + 1, i, j;
        for (i = 0; i < n; i++) for (j = rg[0]; j <= rg[1]; j++) {
          var q = secs[i][j], x = xAt(i, j);
          pos.push(x, sd * q[0], q[1]);
          uv.push((x - V.XDK) / V.LOA, clamp((q[1] - V.HZ0) / (V.HZ1 - V.HZ0), 0.001, 0.999));
        }
        var id = function (a, b) { return a * cols + (b - rg[0]); };
        var tri = function (a, b, c) {
          var ax = pos[a * 3], ay = pos[a * 3 + 1], az = pos[a * 3 + 2];
          var ux = pos[b * 3] - ax, uy = pos[b * 3 + 1] - ay, uz = pos[b * 3 + 2] - az;
          var vx = pos[c * 3] - ax, vy = pos[c * 3 + 1] - ay, vz = pos[c * 3 + 2] - az;
          var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
          if (nx * nx + ny * ny + nz * nz < 1e-10) return;
          idx.push(a, b, c);
        };
        for (i = 0; i < n - 1; i++) for (j = rg[0]; j < rg[1]; j++) {
          var A = id(i, j), Bq = id(i + 1, j), Cq = id(i + 1, j + 1), D = id(i, j + 1);
          /* port winds (A, D, B), (B, D, C) outward; starboard the mirror */
          if (sd > 0) { tri(A, D, Bq); tri(Bq, D, Cq); } else { tri(A, Bq, D); tri(Bq, Cq, D); }
        }
        var g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
        g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
        g.setIndex(idx);
        g.computeVertexNormals();
        out.push(g);
      });
    });
    /* the transom: a flat cap, outline from the port deck edge down to the
       keel and back up the starboard side and over the top along the crown;
       every triangle turned to face aft                                    */
    var s0 = secs[0], ring = [], DN = 8, x0 = st[0];
    var yt = s0[ROWS - 1][0], zt = s0[ROWS - 1][1];
    for (jj = ROWS - 1; jj >= 0; jj--) ring.push([s0[jj][0], s0[jj][1]]);
    for (jj = 1; jj < ROWS; jj++) ring.push([-s0[jj][0], s0[jj][1]]);
    for (k = 1; k < DN; k++) {
      var yy = -yt + 2 * yt * k / DN;
      ring.push([yy, zt + V.CAMBER * (1 - (yy / yt) * (yy / yt))]);
    }
    var cont = [];
    ring.forEach(function (q) {
      var l = cont[cont.length - 1];
      if (l && Math.abs(l.x - q[0]) < 1e-4 && Math.abs(l.y - q[1]) < 1e-4) return;
      cont.push(new THREE.Vector2(q[0], q[1]));
    });
    if (cont.length > 2 && cont[0].distanceTo(cont[cont.length - 1]) < 1e-4) cont.pop();
    var tf = THREE.ShapeUtils.triangulateShape(cont, []), cpos = [], cuv = [];
    tf.forEach(function (f) {
      var a = cont[f[0]], b = cont[f[1]], c = cont[f[2]];
      if ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) > 0) { var t0 = b; b = c; c = t0; }
      [a, b, c].forEach(function (p) {
        var px = x0 - V.RAKE * Math.max(0, p.y);
        cpos.push(px, p.x, p.y);
        cuv.push((px - V.XDK) / V.LOA, clamp((p.y - V.HZ0) / (V.HZ1 - V.HZ0), 0.001, 0.999));
      });
    });
    var cg = new THREE.BufferGeometry();
    cg.setAttribute("position", new THREE.Float32BufferAttribute(cpos, 3));
    cg.setAttribute("uv", new THREE.Float32BufferAttribute(cuv, 2));
    cg.computeVertexNormals();
    out.push(cg);
    return out;
  }

  /* the weather deck: a crowned surface between the two deck edges, UVs in
     plan so the canvas lands its markings where they were laid out        */
  function deckGeo(THREE, V) {
    var st = V.ST[0] === V.XDK ? V.ST.slice() : [V.XDK].concat(V.ST);
    var n = st.length, DN = 8, i, k, pos = [], uv = [];
    function P(ii, kk) {
      var x = st[ii], h = yDeck(V, x), y = -h + 2 * h * kk / DN;
      return [x, y, deckZ(V, x, y)];
    }
    function push(q) { pos.push(q[0], q[1], q[2]); uv.push((q[0] - V.XDK) / V.LOA, (q[1] + V.DH) / (2 * V.DH)); }
    function tri(a, b, c) {
      var ux = b[0] - a[0], uy = b[1] - a[1], vx = c[0] - a[0], vy = c[1] - a[1];
      if (Math.abs(ux * vy - uy * vx) < 1e-6) return;
      push(a); push(b); push(c);
    }
    for (i = 0; i < n - 1; i++) {
      for (k = 0; k < DN; k++) {
        var A = P(i, k), Bq = P(i + 1, k), Cq = P(i + 1, k + 1), D = P(i, k + 1);
        tri(A, Bq, D);
        tri(Bq, Cq, D);
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    return g;
  }

  /* ======================================================== more helpers */
  /* UVs for a part painted with the hull canvas: u along the ship, v up the
     side, exactly as the hull loft has them, so an added hull keeps the
     boot top and the anti-fouling at the right heights                     */
  function uvHull(THREE, geo, V) {
    var P = geo.getAttribute("position"), uv = [], i;
    for (i = 0; i < P.count; i++)
      uv.push((P.getX(i) - V.XDK) / V.LOA, clamp((P.getZ(i) - V.HZ0) / (V.HZ1 - V.HZ0), 0.001, 0.999));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    return geo;
  }
  /* A solid lofted along X through sections drawn in the YZ plane, each
     [x, [[y, z], ...]], x increasing, every section with the same corner
     count; both ends capped. The side hulls of the trimaran.              */
  function loftX(THREE, secs) {
    var pos = [], n = secs[0][1].length, i, k;
    var R = secs.map(function (s) { return { x: s[0], p: ccw(s[1]) }; });
    function P(ii, kk) { var q = R[ii].p[kk % n]; return [R[ii].x, q[0], q[1]]; }
    function tri(a, b, c) { pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]); }
    for (i = 0; i < R.length - 1; i++) for (k = 0; k < n; k++) {
      tri(P(i, k), P(i, k + 1), P(i + 1, k + 1));
      tri(P(i, k), P(i + 1, k + 1), P(i + 1, k));
    }
    var L = R.length - 1;
    for (k = 1; k < n - 1; k++) { tri(P(L, 0), P(L, k), P(L, k + 1)); tri(P(0, 0), P(0, k + 1), P(0, k)); }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  /* a flat four-cornered panel, turned to face o: windows, doors, vents and
     grilles laid a few centimetres proud of the wall they are painted on  */
  function quad(Bk, a, b, c, d, o) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var L = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    nx /= L; ny /= L; nz /= L;
    if (nx * o[0] + ny * o[1] + nz * o[2] < 0) { var t = b; b = d; d = t; nx = -nx; ny = -ny; nz = -nz; }
    Bk.raw([a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2], a[0], a[1], a[2], c[0], c[1], c[2], d[0], d[1], d[2]],
           [nx, ny, nz, nx, ny, nz, nx, ny, nz, nx, ny, nz, nx, ny, nz, nx, ny, nz],
           [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1]);
  }
  /* a panel on face k of a stacked block (rings lo at zLo and hi at zHi,
     both counter-clockwise from above, as symRing makes them), from t0 to
     t1 along the face and z0 to z1 up it, lifted off it by off             */
  function facet(Bk, lo, zLo, hi, zHi, k, t0, t1, z0, z1, off) {
    var n = lo.length, a = k % n, b = (k + 1) % n;
    var ex = lo[b][0] - lo[a][0], ey = lo[b][1] - lo[a][1], el = Math.sqrt(ex * ex + ey * ey) || 1;
    var ox = ey / el, oy = -ex / el;
    function at(t, z) {
      var f = (z - zLo) / (zHi - zLo);
      var xl = lerp(lo[a][0], lo[b][0], t), yl = lerp(lo[a][1], lo[b][1], t);
      var xh = lerp(hi[a][0], hi[b][0], t), yh = lerp(hi[a][1], hi[b][1], t);
      return [lerp(xl, xh, f) + ox * off, lerp(yl, yh, f) + oy * off, z];
    }
    quad(Bk, at(t0, z0), at(t1, z0), at(t1, z1), at(t0, z1), [ox, oy, 0.2]);
  }
  /* a row of n panes along a face, each pane w of the face's length       */
  function paneRow(Bk, lo, zLo, hi, zHi, k, ta, tb, nP, z0, z1, gap, off) {
    var d = (tb - ta) / nP;
    for (var i = 0; i < nP; i++) facet(Bk, lo, zLo, hi, zHi, k, ta + d * i + gap * 0.5, ta + d * (i + 1) - gap * 0.5, z0, z1, off);
  }
  /* a panel on a ship's side wall, x0..x1 by z0..z1, its corners on the
     wall where yAt(x, z) puts it; s = +1 port, -1 starboard               */
  function wallQuad(Bk, s, x0, x1, z0, z1, yAt, off) {
    function p(x, z) { return [x, s * (yAt(x, z) + off), z]; }
    quad(Bk, p(x0, z0), p(x1, z0), p(x1, z1), p(x0, z1), [0, s, 0]);
  }
  /* a ring part way up a stacked block, grown outward by g: a painted band */
  function ringAt(lo, zLo, hi, zHi, z, g) {
    var f = (z - zLo) / (zHi - zLo), cx = 0, cy = 0, i, out = [];
    for (i = 0; i < lo.length; i++) { cx += lo[i][0]; cy += lo[i][1]; }
    cx /= lo.length; cy /= lo.length;
    for (i = 0; i < lo.length; i++) {
      var x = lerp(lo[i][0], hi[i][0], f), y = lerp(lo[i][1], hi[i][1], f);
      var dx = x - cx, dy = y - cy, L = Math.sqrt(dx * dx + dy * dy) || 1;
      out.push([x + dx / L * g, y + dy / L * g]);
    }
    return out;
  }

  /* ============================================================ the parts
     Each is built in its own frame and handed back as [material, geo].    */

  /* the Mk 110 57 mm in its stealth gunhouse, ring centre at the origin,
     gun on +X: a faceted house 3.5 m long and 2.7 m across with a knuckle
     round its waist, the mantlet 1.4 m up, a 70-calibre barrel with 3.1 m
     of it showing and its muzzle brake. Centred ON the ring, the axis the
     renderer trains about.                                                */
  function gunParts(THREE) {
    var P = [];
    P.push(["K", cylZ(THREE, 1.35, 1.40, 0.25, 24, 0, 0, 0)]);
    P.push(["S", stack(THREE, [[sym8(-1.9, 1.6, 1.35, 0.5, 0.7), 0.25], [sym8(-1.85, 1.35, 1.32, 0.5, 0.7), 1.25],
                                [sym8(-1.6, 0.9, 1.05, 0.4, 0.55), 2.45]], true, false)]);
    P.push(["K", box(THREE, 0.30, 0.9, 0.8, 1.40, 0, 1.4)]);
    P.push(["M", strut(THREE, 1.5, 0, 1.4, 4.2, 0, 1.4, 0.16, 14, 0.12)]);
    P.push(["M", strut(THREE, 4.2, 0, 1.4, 4.72, 0, 1.4, 0.19, 14)]);
    P.push(["K", strut(THREE, 4.5, 0, 1.4, 4.73, 0, 1.4, 0.21, 14)]);
    P.push(["K", box(THREE, 0.6, 0.04, 0.9, -0.5, 1.33, 1.3)]);
    P.push(["K", box(THREE, 0.6, 0.04, 0.9, -0.5, -1.33, 1.3)]);
    /* the roof: the sight and the vents                                    */
    P.push(["K", box(THREE, 0.5, 0.35, 0.28, 0.0, 0.55, 2.55)]);
    P.push(["K", box(THREE, 0.9, 0.9, 0.06, -0.9, 0, 2.47)]);
    return P;
  }
  /* the Mk 49 launcher, RAM in 21 cells: the pedestal, the carriage with its
     two trunnion arms, the box and its dark face with the 21 cell covers
     (the Freedom's, on the hangar roof)                                   */
  function ramParts(THREE) {
    var P = [
      ["K", cylZ(THREE, 0.95, 1.05, 0.8, 18, 0, 0, 0)],
      ["S", box(THREE, 1.5, 2.4, 0.9, -0.1, 0, 1.25)],
      ["S", box(THREE, 0.9, 0.28, 1.3, 0.1, 1.12, 2.1)],
      ["S", box(THREE, 0.9, 0.28, 1.3, 0.1, -1.12, 2.1)],
      ["S", box(THREE, 2.7, 1.9, 1.7, 0.15, 0, 2.3)],
      ["K", box(THREE, 0.08, 1.7, 1.5, 1.52, 0, 2.3)],
      ["W", box(THREE, 1.0, 1.5, 0.12, -0.6, 0, 3.2)]
    ];
    for (var r = 0; r < 3; r++) for (var c = 0; c < 7; c++)
      P.push(["W", box(THREE, 0.05, 0.17, 0.32, 1.57, -0.69 + c * 0.23, 1.85 + r * 0.45)]);
    return P;
  }
  /* SeaRAM (the Independence's, on the hangar roof): the Phalanx 1B mount
     with its sensor drum and dome, and an 11-cell launcher on the cradle,
     4.6 m over the roof (silhouette)                                       */
  function seaRamParts(THREE) {
    var P = [
      ["K", cylZ(THREE, 1.1, 1.2, 0.55, 18, 0, 0, 0)],
      ["S", box(THREE, 1.9, 2.3, 1.0, -0.2, 0, 1.05)],
      ["S", box(THREE, 0.9, 0.3, 1.2, 0.2, 1.0, 1.9)],
      ["S", box(THREE, 0.9, 0.3, 1.2, 0.2, -1.0, 1.9)],
      ["S", box(THREE, 2.8, 1.6, 1.4, 0.45, 0, 2.15)],
      ["K", box(THREE, 0.08, 1.4, 1.2, 1.87, 0, 2.15)],
      ["W", cylZ(THREE, 0.62, 0.62, 1.3, 18, -0.55, 0, 2.85)],
      ["W", sphere(THREE, 0.62, 18, 8, -0.55, 0, 4.15, true)],
      ["K", box(THREE, 0.3, 0.9, 0.5, 0.15, 0, 3.4)],
      ["K", box(THREE, 0.5, 0.36, 0.36, -0.5, 0.75, 2.9)]
    ];
    /* the launcher face: 11 cell covers in two rows, six over five          */
    var r, c;
    for (c = 0; c < 6; c++) P.push(["W", box(THREE, 0.05, 0.17, 0.34, 1.92, -0.55 + c * 0.22, 2.55)]);
    for (c = 0; c < 5; c++) P.push(["W", box(THREE, 0.05, 0.17, 0.34, 1.92, -0.44 + c * 0.22, 1.9)]);
    return P;
  }
  /* the Mk 46 30 mm gun mount: a low faceted turret, the Bushmaster's
     barrel with its brake, the sight on the roof                           */
  function mk46Parts(THREE) {
    return [
      ["K", cylZ(THREE, 0.62, 0.68, 0.22, 18, 0, 0, 0)],
      ["S", stack(THREE, [[sym8(-0.95, 0.85, 0.78, 0.25, 0.45), 0.22], [sym8(-0.85, 0.55, 0.62, 0.2, 0.3), 1.2]], true, false)],
      ["K", box(THREE, 0.2, 0.5, 0.45, 0.72, 0, 0.72)],
      ["M", strut(THREE, 0.75, 0, 0.72, 2.9, 0, 0.72, 0.055, 8)],
      ["M", strut(THREE, 2.6, 0, 0.72, 3.0, 0, 0.72, 0.085, 8)],
      ["K", box(THREE, 0.35, 0.28, 0.3, -0.1, 0.32, 1.35)],
      ["S", box(THREE, 0.7, 0.35, 0.55, -0.35, -0.85, 0.6)]
    ];
  }
  /* a 12.7 mm pedestal machine gun, barrel on +X                           */
  function mgParts(THREE) {
    return [
      ["M", cylZ(THREE, 0.07, 0.10, 0.8, 6, 0, 0, 0)],
      ["M", box(THREE, 0.5, 0.28, 0.26, 0.05, 0, 0.93)],
      ["K", strut(THREE, 0.25, 0, 0.95, 1.35, 0, 0.95, 0.04, 5)],
      ["M", box(THREE, 0.06, 0.5, 0.35, -0.3, 0, 1.0)]
    ];
  }
  /* a life-raft canister, 1.6 m, lying fore and aft, on its cradle        */
  function raftParts(THREE) {
    return [["W", strut(THREE, -0.8, 0, 0.35, 0.8, 0, 0.35, 0.35, 16)],
            ["K", strut(THREE, -0.25, 0, 0.35, -0.15, 0, 0.35, 0.36, 16, undefined, true)],
            ["K", strut(THREE, 0.15, 0, 0.35, 0.25, 0, 0.35, 0.36, 16, undefined, true)],
            ["M", box(THREE, 1.4, 0.75, 0.08, 0, 0, 0.04)]];
  }
  /* a rigid-hull inflatable, bow on +X, keel at z = 0: a grey hull with a
     pointed bow, the black collar round it, the console and the outboard  */
  function rhibParts(THREE, L, Bm) {
    var h = L * 0.5, w = Bm * 0.5, P = [];
    P.push(["A", stack(THREE, [[symRing([[-h, w * 0.35], [h - L * 0.25, w * 0.4], [h - 0.3, 0.05]]), 0],
                               [symRing([[-h, w * 0.78], [h - L * 0.22, w * 0.82], [h, 0.08]]), 0.62]], true, true)]);
    [1, -1].forEach(function (s) {
      P.push(["K", strut(THREE, -h + 0.15, s * w * 0.82, 0.78, h - L * 0.22, s * w * 0.84, 0.78, 0.26, 6)]);
      P.push(["K", strut(THREE, h - L * 0.22, s * w * 0.84, 0.78, h - 0.15, s * 0.1, 0.86, 0.24, 6, 0.18)]);
    });
    P.push(["W", box(THREE, 0.8, w * 0.8, 0.9, -L * 0.05, 0, 1.05)]);
    P.push(["K", box(THREE, 0.15, w * 0.75, 0.35, -L * 0.05 + 0.42, 0, 1.4)]);
    P.push(["K", box(THREE, 0.5, 0.5, 0.9, -h - 0.1, 0, 0.95)]);
    return P;
  }

  /* ================================================================ build */
  function build(THREE, V, C) {
    var root = new THREE.Group();
    var team = C && C.team !== undefined ? C.team : "#d6503f";

    /* ---------------------------------------------------- the materials */
    var T = {};
    T.H = new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE, V), roughness: 0.86, metalness: 0.08 });
    T.D = new THREE.MeshStandardMaterial({ color: 0xffffff, map: deckTex(THREE, V), roughness: 0.94, metalness: 0.04 });
    T.S = new THREE.MeshStandardMaterial({ color: 0xffffff, map: supTex(THREE), roughness: 0.87, metalness: 0.07 });
    T.M = new THREE.MeshStandardMaterial({ color: 0x3c4349, roughness: 0.55, metalness: 0.40 });
    T.K = new THREE.MeshStandardMaterial({ color: 0x15181b, roughness: 0.80, metalness: 0.10 });
    /* glass lies a few cm off the wall, pulled toward the camera so it
       never flickers against it at full zoom-out                          */
    T.G = new THREE.MeshStandardMaterial({ color: 0x0f1a22, roughness: 0.10, metalness: 0.0, transparent: true, opacity: 0.88,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    T.W = new THREE.MeshStandardMaterial({ color: 0xb4b8b6, roughness: 0.70, metalness: 0.04 });
    T.A = new THREE.MeshStandardMaterial({ color: 0x5c646b, roughness: 0.62, metalness: 0.05 });
    /* the team material, exactly C.team, pulled a couple of depth steps
       toward the camera because its flashes lie flat on roofs and decks   */
    T.T = new THREE.MeshStandardMaterial({ color: new THREE.Color(team), roughness: 0.60, metalness: 0.10,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    var B = {};
    Object.keys(T).forEach(function (k) { B[k] = new Batch(k === "S" ? 8 : 0); });

    function emit(parts, px, py, pz, yaw) {
      parts.forEach(function (pp) {
        var g = pp[1];
        place(THREE, g, 0, 0, 0, 0, 0, yaw || 0);
        g.translate(px, py, pz);
        B[pp[0]].add(g);
      });
    }
    function emitO(parts, pitch, yaw, px, py, pz) {
      parts.forEach(function (pp) { B[pp[0]].add(orient(pp[1], pitch, yaw, px, py, pz)); });
    }
    /* rails: a top and a middle rail and a post every sp metres (3 m on the
       weather deck, closer round the flight deck, where the photographs
       show a fence of stanchions)                                         */
    function railRun(pts, hgt, sp) {
      var k, carry = 0, h = hgt || 1.1, step = sp || 3.0;
      function post(px, py, pz) { B.M.add(strut(THREE, px, py, pz, px, py, pz + h, 0.03, 4, undefined, true)); }
      for (k = 0; k < pts.length - 1; k++) {
        var a = pts[k], b = pts[k + 1];
        var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
        var len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (len < 1e-4) continue;
        [h, h * 0.5].forEach(function (hh) {
          B.M.add(strut(THREE, a[0], a[1], a[2] + hh, b[0], b[1], b[2] + hh, 0.03, 4, undefined, true));
        });
        var t = carry;
        for (; t < len; t += step) post(lerp(a[0], b[0], t / len), lerp(a[1], b[1], t / len), lerp(a[2], b[2], t / len));
        carry = t - len;
      }
      var e = pts[pts.length - 1];
      post(e[0], e[1], e[2]);
    }
    /* a closed hand rail round a roof edge, ring = [x, y] corners             */
    function railRing(ring, z, hgt, sp) {
      var pts = ring.map(function (q) { return [q[0], q[1], z]; });
      pts.push([ring[0][0], ring[0][1], z]);
      railRun(pts, hgt, sp);
    }
    function addGun(gx) {
      var gz = deckZ(V, gx, 0);
      var tur = new THREE.Group();
      tur.name = "turret";
      tur.position.set(gx, 0, gz);
      var tb = {};
      gunParts(THREE).forEach(function (pp) {
        if (!tb[pp[0]]) tb[pp[0]] = new Batch(pp[0] === "S" ? 8 : 0);
        tb[pp[0]].add(pp[1]);
      });
      Object.keys(tb).forEach(function (k) { var mm = tb[k].mesh(THREE, T[k]); if (mm) tur.add(mm); });
      root.add(tur);
    }
    /* a radome: its drum and the white dome on it                           */
    function radome(x, y, z, r, hb) {
      B.S.add(cylZ(THREE, r, r * 1.03, hb, 24, x, y, z, true));
      B.W.add(sphere(THREE, r, 24, 10, x, y, z + hb, true));
    }
    /* a rack of life-raft canisters: n along x, two high                     */
    function raftRack(x0, y, z, n) {
      for (var i = 0; i < n; i++) {
        emit(raftParts(THREE), x0 + i * 1.75, y, z, 0);
        emit(raftParts(THREE), x0 + i * 1.75, y, z + 0.74, 0);
      }
    }
    /* an inclined ladder: two stringers and a rung every 0.3 m            */
    function ladder(ax, ay, az, bx, by, bz) {
      var dz = bz - az, n = Math.floor(Math.abs(dz) / 0.3), i;
      if (n < 1) return;
      [-0.35, 0.35].forEach(function (o) { B.M.add(strut(THREE, ax, ay + o, az, bx, by + o, bz, 0.03, 4)); });
      for (i = 1; i < n; i++) {
        var t = i / n;
        B.M.add(strut(THREE, lerp(ax, bx, t), ay - 0.35, lerp(az, bz, t), lerp(ax, bx, t), ay + 0.35, lerp(az, bz, t), 0.02, 4));
      }
      [-0.35, 0.35].forEach(function (o) { B.M.add(strut(THREE, bx, by + o, bz, bx, by + o, bz + 0.9, 0.025, 4)); });
    }
    function whip(x, y, z, len, lean) {
      B.A.add(strut(THREE, x, y, z, x - (lean || 0), y, z + len, 0.045, 4, 0.02));
    }

    /* ============================================================ Freedom */
    function fitFreedom() {
      var ZM = V.ZM, sd, x, s;
      hullGeos(THREE, V).forEach(function (g) { B.H.add(g); });
      B.D.add(deckGeo(THREE, V));
      /* THE HOUSE. Its sides are the hull's sides carried on up: there is no
         side deck, and the camouflage of 2013 ran across the join without a
         break. From the deck edge (8.72 m) they lean in 13.5 deg to the 01
         roof at 11.4 m (7.3 m), from the hangar's after face at x -27.9 to
         the foot of the sloping front at x +27; the front climbs 44 deg to
         x +21, its corners cut back. The after corners of the hangar are
         cut at the top (the photograph from her bow, 2025).                */
      var HA = symRing([[-27.9, 8.0], [-27.6, 8.72], [23.5, 8.66], [27.0, 4.5]]);
      var HB = symRing([[-27.9, 5.6], [-26.2, 7.3], [18.5, 7.3], [21.0, 3.8]]);
      B.S.add(stack(THREE, [[HA, 5.5], [HB, 11.4]], true, false));
      function yHouse(xx, z) { return 8.72 - (z - 5.5) * (1.42 / 5.9); }
      /* the sloping front: a door at its foot onto the forecastle and two
         ports either side of it                                            */
      facet(B.K, HA, 5.5, HB, 11.4, 3, 0.44, 0.56, 5.75, 7.75, 0.03);
      paneRow(B.K, HA, 5.5, HB, 11.4, 3, 0.12, 0.32, 2, 8.6, 9.2, 0.05, 0.03);
      paneRow(B.K, HA, 5.5, HB, 11.4, 3, 0.68, 0.88, 2, 8.6, 9.2, 0.05, 0.03);
      /* the 02 level and the bridge: its front leans back 40 deg from the
         vertical, the corners cut, the sides lean in with the house        */
      var C2 = symRing([[-19.6, 5.6], [-19.0, 6.2], [17.0, 6.2], [19.6, 3.6]]);
      var D2 = symRing([[-19.6, 4.9], [-19.0, 5.4], [15.2, 5.4], [17.4, 3.0]]);
      B.S.add(stack(THREE, [[C2, 11.4], [D2, 14.0]], true, false));
      /* the bridge glazing: five panes across the front, two in each cut
         corner, two down each side; the mullions are the wall between them */
      paneRow(B.G, C2, 11.4, D2, 14.0, 3, 0.03, 0.97, 5, 12.25, 13.45, 0.035, 0.03);
      paneRow(B.G, C2, 11.4, D2, 14.0, 2, 0.08, 0.95, 2, 12.25, 13.45, 0.06, 0.03);
      paneRow(B.G, C2, 11.4, D2, 14.0, 4, 0.05, 0.92, 2, 12.25, 13.45, 0.06, 0.03);
      paneRow(B.G, C2, 11.4, D2, 14.0, 1, 0.84, 0.97, 2, 12.35, 13.35, 0.012, 0.03);
      paneRow(B.G, C2, 11.4, D2, 14.0, 5, 0.03, 0.16, 2, 12.35, 13.35, 0.012, 0.03);
      /* the raised roof over the uptakes with its grilles, and the trunk
         behind the mast                                                    */
      var U0 = sym8(-13.5, -4.2, 3.3, 0.6, 0.6), U1 = sym8(-13.0, -4.7, 2.9, 0.6, 0.6);
      B.S.add(stack(THREE, [[U0, 14.0], [U1, 15.4]], true, false));
      paneRow(B.K, U0, 14.0, U1, 15.4, 1, 0.08, 0.92, 4, 14.3, 15.1, 0.05, 0.03);
      paneRow(B.K, U0, 14.0, U1, 15.4, 5, 0.08, 0.92, 4, 14.3, 15.1, 0.05, 0.03);
      B.K.add(box(THREE, 1.5, 2.6, 0.06, -7.6, 0, 15.43));
      B.K.add(box(THREE, 1.5, 2.6, 0.06, -10.1, 0, 15.43));
      B.S.add(stack(THREE, [[sym8(-3.6, 3.6, 3.0, 0.8, 0.8), 14.0], [sym8(-3.0, 3.0, 2.5, 0.6, 0.6), 16.6]], true, false));
      /* THE MAST. A faceted tower off the 02 roof to 20.6 m with the team
         band round it; on its head the big yard and its whips, the drum, the
         air-search radar - a box-shaped rotating array, the TRS-3D of the
         first ships and the TRS-4D from LCS-17 on - and the pole to 31.1 m
         with its two small yards (photographs of LCS-9, 2020; LCS-21, 2025) */
      var MA = symRing([[2.4, 2.4], [3.0, 3.1], [9.6, 3.1], [10.4, 2.2]]);
      var MB = symRing([[4.7, 1.0], [5.0, 1.35], [7.6, 1.35], [7.9, 1.0]]);
      B.S.add(stack(THREE, [[MA, 14.0], [MB, 20.6]], true, false));
      B.T.add(stack(THREE, [[ringAt(MA, 14.0, MB, 20.6, 18.3, 0.04), 18.3], [ringAt(MA, 14.0, MB, 20.6, 19.1, 0.04), 19.1]], false, false));
      paneRow(B.K, MA, 14.0, MB, 20.6, 3, 0.2, 0.8, 1, 15.0, 16.6, 0, 0.03);
      x = 6.3;
      /* the tower's head: the electronic-support arrays in their boxes on
         its four faces, and the access door in its front                   */
      [[x + 1.62, 0, 0.12, 1.2], [x - 1.62, 0, 0.12, 1.2], [x, 1.37, 1.6, 0.12], [x, -1.37, 1.6, 0.12]].forEach(function (q) {
        B.K.add(box(THREE, q[2], q[3], 0.9, q[0], q[1], 19.85));
      });
      B.S.add(cylZ(THREE, 0.80, 0.86, 1.7, 14, x, 0, 20.6));
      B.M.add(strut(THREE, x, -4.8, 21.0, x, 4.8, 21.0, 0.09, 6));
      B.M.add(strut(THREE, x - 0.9, 0, 21.0, x + 0.9, 0, 21.0, 0.07, 6));
      [1, -1].forEach(function (s) {
        B.M.add(strut(THREE, x, s * 0.8, 21.9, x, s * 3.9, 21.05, 0.05, 4));
        whip(x, s * 4.7, 21.0, 2.6, 0);
        B.M.add(strut(THREE, x, s * 4.7, 21.0, x, s * 4.7, 20.2, 0.04, 4));
        B.A.add(cylZ(THREE, 0.13, 0.13, 0.7, 8, x, s * 3.4, 21.05));
        B.K.add(box(THREE, 0.3, 0.3, 0.45, x, s * 2.2, 20.8));
      });
      B.M.add(cylZ(THREE, 0.45, 0.5, 0.5, 10, x, 0, 22.3));
      B.S.add(box(THREE, 1.8, 3.4, 2.4, x, 0, 24.0));
      B.A.add(box(THREE, 0.06, 3.1, 2.1, x + 0.92, 0, 24.0));
      B.A.add(box(THREE, 0.06, 3.1, 2.1, x - 0.92, 0, 24.0));
      B.K.add(box(THREE, 1.4, 3.0, 0.06, x, 0, 25.22));
      B.M.add(strut(THREE, x, 0, 25.2, x, 0, 31.1, 0.13, 8, 0.07));
      B.M.add(strut(THREE, x, -1.5, 27.4, x, 1.5, 27.4, 0.05, 4));
      B.M.add(strut(THREE, x, -0.9, 29.6, x, 0.9, 29.6, 0.04, 4));
      [1, -1].forEach(function (s) {
        B.A.add(cylZ(THREE, 0.12, 0.12, 0.6, 8, x, s * 1.4, 27.45));
        B.A.add(cylZ(THREE, 0.08, 0.08, 0.5, 6, x, s * 0.85, 29.65));
      });
      B.A.add(cylZ(THREE, 0.16, 0.16, 0.45, 8, x, 0, 30.7));
      /* radomes: a big pair on drums at the forward corners of the 02 roof,
         a smaller pair on the trunk, and the little one over the bridge    */
      [1, -1].forEach(function (s) {
        radome(12.6, s * 4.0, 14.0, 0.95, 1.0);
        radome(-1.2, s * 1.9, 16.6, 0.7, 0.6);
      });
      radome(16.0, 0, 14.0, 0.42, 0.5);
      /* whips off the roofs                                                 */
      [1, -1].forEach(function (s) {
        whip(-10.0, s * 2.6, 15.4, 6.2, 0.9);
        whip(-17.0, s * 4.4, 14.0, 5.4, 0.9);
        whip(0.6, s * 2.2, 16.6, 4.4, 0.5);
        whip(14.2, s * 4.8, 14.0, 4.0, 0.4);
      });

      /* THE SIDES. Small square ports and doors along the 01 level; the
         port side has the boat bay abaft the bridge, open, with its RHIB
         (2009 photograph); a sponson either side abaft the bridge carries a
         Mk 46 30 mm mount (photographs of 2013, 2020, 2025)               */
      [1, -1].forEach(function (s) {
        [[14.5, 9.0], [13.4, 9.0], [-3.0, 8.8], [-4.1, 8.8], [-12.6, 8.8], [-13.7, 8.8], [-21.5, 8.6], [-22.6, 8.6]].forEach(function (w) {
          wallQuad(B.K, s, w[0] - 0.35, w[0] + 0.35, w[1] - 0.35, w[1] + 0.35, yHouse, 0.03);
        });
        [[-8.0, 6.0], [10.8, 6.0], [-17.0, 6.0]].forEach(function (d) {
          wallQuad(B.K, s, d[0] - 0.45, d[0] + 0.45, d[1], d[1] + 1.95, yHouse, 0.03);
        });
        /* the sponson and its gun: the broadside of LCS-5 (2022) puts the
           platform under the after end of the bridge, x +10 to +18 m, so the
           mount stands at +14.7, not abaft the hangar-side ports            */
        B.S.add(box(THREE, 5.4, 1.5, 0.28, 14.5, s * 8.0, 9.96));
        B.S.add(xPrism(THREE, [[s * 7.3, 8.3], [s * 8.75, 9.82], [s * 7.3, 9.82]], 11.8, 17.2));
        emit(mk46Parts(THREE), 14.7, s * 8.05, 10.1, s * 0.2);
        railRun([[12.0, s * 8.68, 10.1], [17.0, s * 8.68, 10.1]], 0.95, 1.4);
        /* life rafts on the 01 ledge beside the 02 level, two racks a side */
        raftRack(-17.4, s * 6.75, 11.4, 2);
        raftRack(-11.6, s * 6.75, 11.4, 2);
        /* 12.7 mm guns: at the forward corners of the 01 roof, and aft at
           the corners of the hangar roof                                    */
        emit(mgParts(THREE), 18.3, s * 6.3, 11.4, s * 0.3);
        emit(mgParts(THREE), -26.0, s * 4.6, 11.4, s * PI * 0.9);
      });
      /* inclined ladders from the 01 roof to the 02 roof, abaft the 02
         level, and from the hangar roof down to the flight deck             */
      [1, -1].forEach(function (s) {
        ladder(-22.2, s * 4.6, 11.4, -19.62, s * 4.6, 14.0);
        B.K.add(box(THREE, 0.5, 0.5, 0.6, -15.0, s * 3.4, 14.3));
        B.K.add(box(THREE, 0.4, 0.4, 0.5, 9.8, s * 2.2, 14.25));
      });
      /* the port boat bay: the dark opening, its davit, and the 7 m RHIB   */
      B.M.add(strut(THREE, 3.8, 6.9, 11.4, 3.8, 7.6, 10.4, 0.1, 6));
      B.M.add(strut(THREE, 3.8, 7.6, 10.4, 3.8, 7.6, 9.5, 0.04, 4));
      wallQuad(B.K, 1, 0.4, 7.2, 6.9, 9.8, yHouse, 0.02);
      emit(rhibParts(THREE, 6.4, 2.4), 3.8, 7.25, 7.0, 0);

      /* THE HANGAR: the roller door in the after face, 9 m wide and 4.6 m
         high, its slats and its frame; the Mk 49 on the roof at the after end
         (silhouette: top 14.8 m at x -22.6 to -25)                          */
      B.K.add(box(THREE, 0.10, 9.0, 4.6, -27.93, 0, 7.9));
      for (x = 0; x < 9; x++) B.M.add(box(THREE, 0.05, 8.9, 0.05, -27.99, 0, 5.95 + x * 0.5));
      [1, -1].forEach(function (s) { B.M.add(box(THREE, 0.16, 0.25, 4.8, -27.95, s * 4.6, 7.95)); });
      B.M.add(box(THREE, 0.16, 9.45, 0.25, -27.95, 0, 10.3));
      emit(ramParts(THREE), -23.4, 0, 11.4, 0);
      [1, -1].forEach(function (s) { B.T.add(box(THREE, 5.2, 2.2, 0.2, -23.4, s * 3.6, 11.5)); });
      /* a team flash on the 02 roof abaft the uptakes, and along the flight deck edges */
      B.T.add(box(THREE, 4.6, 5.4, 0.2, -16.6, 0, 14.1));
      B.T.add(box(THREE, 2.4, 2.2, 0.12, 6.3, 0, 20.66));
      [1, -1].forEach(function (s) {
        B.T.add(box(THREE, 22.0, 0.9, 0.12, -42.0, s * 7.0, deckZ(V, -42.0, s * 7.0) + 0.06));
      });

      /* THE STERN: the launch-and-recovery ramp, closed, a dark door 7 m wide
         hinged at its foot, and the four waterjet nozzles under it, the
         outer two the steerers                                            */
      B.K.add(box(THREE, 0.16, 7.0, 3.4, -57.72, 0, 2.75));
      [1, -1].forEach(function (s) { B.M.add(box(THREE, 0.2, 0.25, 3.6, -57.74, s * 3.6, 2.75)); });
      B.M.add(box(THREE, 0.2, 7.4, 0.22, -57.74, 0, 4.5));
      B.M.add(strut(THREE, -57.78, -3.4, 1.05, -57.78, 3.4, 1.05, 0.12, 6));
      [-4.4, -1.6, 1.6, 4.4].forEach(function (wy) {
        B.M.add(strut(THREE, -57.6, wy, 0.25, -57.88, wy, 0.25, Math.abs(wy) > 3 ? 0.62 : 0.55, 12, undefined, true));
        B.K.add(strut(THREE, -57.6, wy, 0.25, -57.84, wy, 0.25, Math.abs(wy) > 3 ? 0.56 : 0.49, 12));
      });
      /* the starboard side door near the waterline, into the mission bay  */
      B.K.add(box(THREE, 3.4, 0.06, 2.2, -24.0, -7.47, 2.35, 0.382, 0, 0));
      B.M.add(box(THREE, 3.6, 0.07, 0.12, -24.0, -7.95, 3.5, 0.382, 0, 0));
      /* the forecastle: the windlass, the chain to the hawse pipes, bollards,
         and the anchor pockets in the bow                                  */
      [1.2, -1.2].forEach(function (yy) {
        B.M.add(cylZ(THREE, 0.34, 0.38, 0.55, 12, 44.0, yy, deckZ(V, 44.0, yy)));
        B.K.add(box(THREE, 3.2, 0.22, 0.08, 45.6, yy * 1.9, deckZ(V, 45.6, yy * 1.9) + 0.03, 0, 0, -yy * 0.35));
      });
      [[40.5, 2.6], [47.0, 1.8], [-50, 8.0], [-34, 8.3], [36.0, 5.0]].forEach(function (b) {
        [1, -1].forEach(function (s) {
          B.M.add(cylZ(THREE, 0.15, 0.15, 0.42, 6, b[0] - 0.26, s * b[1], deckZ(V, b[0], s * b[1])));
          B.M.add(cylZ(THREE, 0.15, 0.15, 0.42, 6, b[0] + 0.26, s * b[1], deckZ(V, b[0], s * b[1])));
        });
      });
      [1, -1].forEach(function (s) { B.K.add(box(THREE, 1.6, 0.5, 1.2, 47.4, s * 3.3, 4.6, -s * 0.62, 0, -s * 0.3)); });
      /* rails: the forecastle edges, and a close fence of stanchions round
         the flight deck and across the stern                               */
      [1, -1].forEach(function (s) {
        var pts = [];
        for (x = 23.8; x <= 56.0; x += 2.0) pts.push([x, s * (yDeck(V, x) - 0.08), zDk(V, x)]);
        pts.push([56.4, s * (yDeck(V, 56.4) - 0.04), zDk(V, 56.4)]);
        railRun(pts, 1.1, 1.5);
        /* closed chocks at the deck edge                                    */
        [52.0, 42.0, 33.5, -31.0, -45.0, -55.5].forEach(function (cx) {
          B.M.add(box(THREE, 0.7, 0.3, 0.35, cx, s * (yDeck(V, cx) - 0.35), zDk(V, cx) + 0.17));
        });
        pts = [];
        for (x = -28.1; x >= -57.3; x -= 3.0) pts.push([x, s * (yDeck(V, x) - 0.08), zDk(V, x)]);
        pts.push([-57.4, s * (yDeck(V, -57.4) - 0.08), zDk(V, -57.4)]);
        railRun(pts, 1.15, 1.2);
      });
      railRun([[-57.4, 8.0, deckZ(V, -57.4, 8.0)], [-57.4, 0, deckZ(V, -57.4, 0)], [-57.4, -8.0, deckZ(V, -57.4, -8.0)]], 1.15, 1.2);
      /* hand rails round the 02 roof, along the 01 ledges and the after
         end of the hangar roof                                              */
      railRing(D2, 14.0, 0.9);
      railRun([[-19.6, -7.15, 11.4], [-26.2, -7.15, 11.4], [-27.75, -5.6, 11.4], [-27.75, 5.6, 11.4],
               [-26.2, 7.15, 11.4], [-19.6, 7.15, 11.4]], 0.9);
      [1, -1].forEach(function (s) { railRun([[18.0, s * 7.15, 11.4], [-19.6, s * 7.15, 11.4]], 0.9, 1.5); });
      addGun(30.75);
    }

    /* ========================================================= Independence */
    function fitIndep() {
      var ZF = V.ZM, s, x, k;
      /* THE HULLS. The centre hull is a monohull of its own, 6.6 m across
         the water aft and the whole ship forward of the shoulders; the two
         side hulls stand 12.6 m out; the cross-structure bridges all three
         from the wet deck, 3.9 m over the water, to the flight deck. Its
         sides flare out to the 31.6 m of the deck and its after face rakes
         aft over the transoms (drydock photograph, from ahead; Key West,
         2010; the Navy silhouette)                                          */
      hullGeos(THREE, INC).forEach(function (g) { B.H.add(g); });
      B.D.add(deckGeo(THREE, V));
      [1, -1].forEach(function (s) {
        var secs = AMA.ST.map(function (q) {
          var yc = s * AMA.yc, zb = q[1], bw = q[2], bt = q[3], zm = Math.max(zb + 0.3, 0);
          return [q[0], [[yc, zb], [yc + 0.75 * bw, zb + 0.45 * (zm - zb)], [yc + bw, zm], [yc + bt, AMA.zTop],
                         [yc - bt, AMA.zTop], [yc - bw, zm], [yc - 0.75 * bw, zb + 0.45 * (zm - zb)]]];
        });
        B.H.add(uvHull(THREE, loftX(THREE, secs), V));
      });
      var X0 = symRing([[-59.6, 14.0], [2.0, 14.0], [16.5, 4.0]]);
      var X1 = symRing([[-61.9, 15.5], [3.4, 15.5], [17.6, 4.7]]);
      var X2 = symRing([[-63.7, 15.78, 9.67], [3.95, 15.78, 9.67], [18.3, 4.98, zDk(V, 18.3) - 0.03]]);
      B.H.add(uvHull(THREE, stack(THREE, [[X0, 3.9], [X1, 7.6], [X2, 9.67]], false, true), V));
      /* the wet deck is not flat: from ahead it springs in two arches, off
         the centre hull's sides and down into the side hulls (drydock)     */
      [1, -1].forEach(function (s) {
        B.H.add(uvHull(THREE, xPrism(THREE, [[s * 3.35, 1.4], [s * 6.4, 3.92], [s * 3.35, 3.92]], -58.4, -2.0), V));
        B.H.add(uvHull(THREE, xPrism(THREE, [[s * 11.2, 1.9], [s * 11.2, 3.92], [s * 8.9, 3.92]], -58.4, -2.0), V));
      });
      function yWall(xx, z) { return z <= 7.6 ? 14.0 + (z - 3.9) / 3.7 * 1.5 : 15.5 + (z - 7.6) / 2.07 * 0.28; }

      /* THE ISLAND: from the foot of the bridge front (x 17.9) to the
         hangar's after face (x -19.8), its sides leaning in; the hexagon
         follows the deck's shoulders, 4 m inboard of them. Roof 16.2 m
         (silhouette: bridge and hangar roofs 16.2, the foot at 9.4)        */
      var IL0 = symRing([[-19.8, 11.0, ZF - 0.02], [5.0, 11.0, ZF - 0.02], [17.9, 3.0, zDk(V, 17.9) - 0.05]]);
      var IL1 = symRing([[-19.0, 9.2], [3.0, 9.2], [14.7, 3.2]]);
      B.S.add(stack(THREE, [[IL0, ZF], [IL1, 16.2]], true, false));
      /* the bridge: a band of windows round the three faces of the front
         (Key West, 2010): six down each cut corner and three across        */
      paneRow(B.G, IL0, ZF, IL1, 16.2, 1, 0.42, 0.98, 6, 14.0, 15.25, 0.03, 0.03);
      paneRow(B.G, IL0, ZF, IL1, 16.2, 2, 0.05, 0.95, 3, 14.0, 15.25, 0.05, 0.03);
      paneRow(B.G, IL0, ZF, IL1, 16.2, 3, 0.02, 0.58, 6, 14.0, 15.25, 0.03, 0.03);
      /* doors and ports in the island's sides and the hangar's after face  */
      paneRow(B.K, IL0, ZF, IL1, 16.2, 0, 0.12, 0.55, 3, 13.4, 14.1, 0.11, 0.03);
      paneRow(B.K, IL0, ZF, IL1, 16.2, 4, 0.45, 0.88, 3, 13.4, 14.1, 0.11, 0.03);
      facet(B.K, IL0, ZF, IL1, 16.2, 0, 0.30, 0.335, ZF + 0.05, ZF + 2.0, 0.03);
      facet(B.K, IL0, ZF, IL1, 16.2, 4, 0.665, 0.70, ZF + 0.05, ZF + 2.0, 0.03);
      /* the tall block over the middle of it, roof 19.7 m, with the team
         flash on its roof                                                  */
      B.S.add(stack(THREE, [[rect4(-5.8, 1.2, 4.8), 16.2], [rect4(-5.0, 0.6, 3.9), 19.7]], true, false));
      B.T.add(box(THREE, 4.6, 6.6, 0.12, -2.2, 0, 19.76));
      /* THE MAST (Key West, 2010; from ahead in the drydock): a white cone
         on the roof, four lattice legs over it to a platform at 25 m, the
         white dome at the masthead, a yard either side under it, the pole
         to 30.7 m with its small yard                                      */
      x = 6.3;
      B.W.add(cylZ(THREE, 0.55, 2.1, 3.2, 24, x, 0, 16.2));
      var legs = [[3.4, 2.7, 5.7, 0.75], [9.2, 2.7, 6.9, 0.75], [9.2, -2.7, 6.9, -0.75], [3.4, -2.7, 5.7, -0.75]];
      legs.forEach(function (L) { B.M.add(strut(THREE, L[0], L[1], 16.2, L[2], L[3], 25.0, 0.17, 6, 0.12)); });
      [19.0, 21.8, 23.9].forEach(function (zz) {
        var f = (zz - 16.2) / 8.8, P = legs.map(function (L) { return [lerp(L[0], L[2], f), lerp(L[1], L[3], f)]; });
        for (k = 0; k < 4; k++) {
          var a = P[k], b = P[(k + 1) % 4];
          B.M.add(strut(THREE, a[0], a[1], zz, b[0], b[1], zz, 0.06, 4));
        }
      });
      [[0, 1], [2, 3]].forEach(function (pr) {
        var a = legs[pr[0]], b = legs[pr[1]], f0 = (19.0 - 16.2) / 8.8, f1 = (21.8 - 16.2) / 8.8;
        B.M.add(strut(THREE, lerp(a[0], a[2], f0), lerp(a[1], a[3], f0), 19.0, lerp(b[0], b[2], f1), lerp(b[1], b[3], f1), 21.8, 0.05, 4));
      });
      B.S.add(box(THREE, 2.8, 2.8, 0.25, x, 0, 25.12));
      B.W.add(sphere(THREE, 1.15, 24, 14, x, 0, 26.4));
      B.M.add(strut(THREE, x, -3.6, 24.6, x, 3.6, 24.6, 0.08, 6));
      B.M.add(strut(THREE, x, 0, 27.4, x, 0, 30.4, 0.09, 6, 0.05));
      B.M.add(strut(THREE, x, -1.2, 28.9, x, 1.2, 28.9, 0.04, 4));
      B.A.add(strut(THREE, x, 0, 30.3, x, 0, 30.7, 0.05, 4, 0.03));
      [1, -1].forEach(function (s) {
        whip(x, s * 3.5, 24.6, 2.4, 0);
        B.A.add(cylZ(THREE, 0.12, 0.12, 0.55, 8, x, s * 2.6, 24.65));
        B.A.add(cylZ(THREE, 0.07, 0.07, 0.4, 6, x, s * 1.1, 28.95));
      });
      /* the 28.8 m raked leg abaft the mast in the silhouette is a whip    */
      B.A.add(strut(THREE, 1.4, 0, 19.7, 1.6, 0, 28.4, 0.05, 4, 0.025));
      /* the two grey domes at the forward corners of the roof, the two
         square housings the Navy's deck plan shows either side of the roof,
         and whips                                                          */
      [1, -1].forEach(function (s) {
        B.S.add(cylZ(THREE, 0.75, 0.8, 0.8, 20, 11.3, s * 3.9, 16.2));
        B.A.add(sphere(THREE, 0.95, 20, 9, 11.3, s * 3.9, 17.0, true));
        B.S.add(box(THREE, 2.4, 2.4, 1.0, -2.0, s * 7.0, 16.7));
        B.K.add(box(THREE, 2.0, 2.0, 0.06, -2.0, s * 7.0, 17.22));
        whip(-7.5, s * 4.0, 19.7, 6.3, 0.7);
        whip(-13.0, s * 8.6, 16.2, 5.0, 0.6);
        whip(1.5, s * 8.4, 16.2, 5.6, 0.5);
        whip(-18.2, s * 8.0, 16.2, 4.2, 0.4);
      });
      /* the hangar: its door in the after face, 10 m wide, with its slats;
         the SeaRAM on the roof at x -16.8; the team flashes either side    */
      B.K.add(box(THREE, 0.35, 10.0, 5.0, -19.62, 0, 12.2, 0, 0.123, 0));
      for (k = 0; k < 9; k++) B.M.add(box(THREE, 0.06, 9.9, 0.05, -20.13 + k * 0.0618, 0, 10.0 + k * 0.5));
      [1, -1].forEach(function (s) { B.K.add(box(THREE, 0.35, 2.4, 3.8, -19.62, s * 7.6, 11.8, 0, 0.123, 0)); });
      emit(seaRamParts(THREE), -16.8, 0, 16.2, 0);
      [1, -1].forEach(function (s) { B.T.add(box(THREE, 6.5, 3.0, 0.2, -10.5, s * 6.0, 16.3)); });

      /* THE SIDES: the boat bay in each quarter with its RHIB (port, Key
         West 2010; starboard, LCS-10 2019), ports along the upper wall, the
         vehicle ramp in the starboard side, the stern door in the raked
         after face                                                          */
      [1, -1].forEach(function (s) {
        wallQuad(B.K, s, -56.0, -48.0, 5.2, 7.6, yWall, 0.03);
        wallQuad(B.K, s, -56.0, -48.0, 7.6, 8.7, yWall, 0.03);
        emit(rhibParts(THREE, 7.0, 2.5), -52.0, s * 14.3, 5.35, 0);
        [-41.0, -39.8, -31.0, -29.8, -15.0, -13.8, -5.0, -3.8].forEach(function (wx) {
          wallQuad(B.K, s, wx - 0.35, wx + 0.35, 8.25, 8.95, yWall, 0.03);
        });
        [-24.0, -22.8, -10.0, -8.8, -44.5].forEach(function (wx) {
          wallQuad(B.K, s, wx - 0.3, wx + 0.3, 6.0, 6.6, yWall, 0.03);
        });
        /* deck edge stripes of the team colour, the 12.7 mm guns           */
        B.T.add(box(THREE, 34.0, 1.0, 0.12, -43.0, s * 13.5, deckZ(V, -43.0, s * 13.5) + 0.06));
        emit(mgParts(THREE), 2.0, s * 13.4, ZF, s * 0.4);
        emit(mgParts(THREE), -62.0, s * 14.0, ZF, s * PI * 0.9);
        /* life rafts on the deck abreast the island and the hangar         */
        raftRack(-9.0, s * 13.6, ZF, 4);
        raftRack(-18.0, s * 13.6, ZF, 3);
      });
      wallQuad(B.K, -1, -38.0, -31.0, 4.4, 7.6, yWall, 0.03);
      wallQuad(B.K, -1, -38.0, -31.0, 7.6, 8.3, yWall, 0.03);
      wallQuad(B.M, -1, -38.2, -30.8, 4.15, 4.4, yWall, 0.05);
      (function () {
        function ax(z) { return (z <= 7.6 ? -59.6 - (z - 3.9) * (2.3 / 3.7) : -61.9 - (z - 7.6) * (1.8 / 2.07)) - 0.04; }
        quad(B.K, [ax(4.4), -5.0, 4.4], [ax(4.4), 5.0, 4.4], [ax(7.6), 5.0, 7.6], [ax(7.6), -5.0, 7.6], [-1, 0, 0.6]);
        quad(B.K, [ax(7.6), -5.0, 7.6], [ax(7.6), 5.0, 7.6], [ax(8.6), 5.0, 8.6], [ax(8.6), -5.0, 8.6], [-1, 0, 0.6]);
        quad(B.M, [ax(4.15), -5.3, 4.15], [ax(4.15), 5.3, 4.15], [ax(4.4), 5.3, 4.4], [ax(4.4), -5.3, 4.4], [-1, 0, 0.6]);
      })();
      /* rails: along both sides of the flight deck, round the shoulders and on
         up the narrow foredeck; across the stern                            */
      [1, -1].forEach(function (s) {
        var pts = [];
        [-63.0, -50, -35, -20, -5, 3.95, 11, 18.3, 26, 34, 40, 46, 52, 56].forEach(function (px) {
          pts.push([px, s * (yDeck(V, px) - 0.3), zDk(V, px) + 0.05]);
        });
        railRun(pts, 1.1, 1.5);
      });
      railRun([[-63.3, 15.5, deckZ(V, -63.3, 15.5)], [-63.3, 0, deckZ(V, -63.3, 0)], [-63.3, -15.5, deckZ(V, -63.3, -15.5)]], 1.1, 1.5);
      /* the foredeck: the windlass, the chain, bollards                     */
      [0.9, -0.9].forEach(function (yy) {
        B.M.add(cylZ(THREE, 0.32, 0.36, 0.5, 12, 52.0, yy, deckZ(V, 52.0, yy)));
        B.K.add(box(THREE, 2.6, 0.2, 0.08, 53.4, yy * 1.4, deckZ(V, 53.4, yy * 1.4) + 0.03, 0, 0, -yy * 0.25));
      });
      [[46.0, 2.2], [30.0, 3.6], [-58.0, 14.8], [-40.0, 14.9]].forEach(function (b) {
        [1, -1].forEach(function (s) {
          B.M.add(cylZ(THREE, 0.15, 0.15, 0.42, 6, b[0] - 0.26, s * b[1], deckZ(V, b[0], s * b[1])));
          B.M.add(cylZ(THREE, 0.15, 0.15, 0.42, 6, b[0] + 0.26, s * b[1], deckZ(V, b[0], s * b[1])));
        });
      });
      /* ladders up the after face of the island, either side of the hangar  */
      [1, -1].forEach(function (s) { ladder(-21.2, s * 9.6, ZF, -19.15, s * 9.6, 16.2); });
      /* hand rails round the island roof and the mast platform             */
      railRing(IL1, 16.2, 0.9, 1.5);
      /* the anchor in its pocket at the stem (Key West, 2010)              */
      B.K.add(box(THREE, 1.0, 1.3, 1.4, 60.9, 0, 4.0, 0, 0.947, 0));
      B.M.add(box(THREE, 0.3, 1.6, 0.3, 60.1, 0, 3.3, 0, 0.947, 0));
      railRing(rect4(x - 1.35, x + 1.35, 1.35), 25.25, 0.8, 1.3);
      addGun(37.0);
    }

    if (V.id === "freedom") fitFreedom(); else fitIndep();

    /* ------------------------------------------------ out as one mesh each */
    Object.keys(B).forEach(function (k) {
      var mm = B[k].mesh(THREE, T[k]);
      if (mm) root.add(mm);
    });
    root.userData.heroLen = V.LOA;
    return root;
  }

  return { build: build, FD: FD, IN: IN };
})();

/* Registration. corvette_n is the present-day row and the Freedom (LCS-1
   class), as its fact sheet and ship spec describe her; it is also the
   corvette that other navies' corvette rows borrow by role (render3d.js
   modelKeyFor) - at this writing corvette_b, corvette_f, corvette_g,
   gbr_e50/e60/e80/e90/e00_corvette, fra_e50/e60/e80/e90/e00_corvette and
   deu_e60/e00_corvette - and a monohull stands in for them better than a
   trimaran. nato_e00_corvette (eras.js, NATO e00, "USS Freedom (LCS-1) and
   USS Independence (LCS-2)") is the Independence as she was in her first
   decade. len is the measured X extent, transom to stem head.            */
UNIT_MODELS["corvette_n"] = {
  len: 115.53,
  build: function (THREE, M, C) { return HeroUsLcs.build(THREE, HeroUsLcs.FD, C); }
};
UNIT_MODELS["nato_e00_corvette"] = {
  len: 127.40,
  build: function (THREE, M, C) { return HeroUsLcs.build(THREE, HeroUsLcs.IN, C); }
};
