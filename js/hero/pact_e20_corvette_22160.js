/* ============================================================================
   pact_e20_corvette_22160.js -- HERO model: Project 22160 patrol ship,
   the Vasily Bykov class (Zelenodolsk design bureau, lead ship 2018).
   Registered as corvette_p, the PACT e20 corvette. No other def borrows
   this key, so nothing else in the roster changes when it loads.

   The old corvette_p was the parametric Warship3D row: 33 meshes of
   generic blocks, and a gun group called "gunmount" that the renderer
   never found, so the one weapon on the ship could not train.

   Measured off photographs read at known scale (LOA 94.0 m end to end),
   all on Wikimedia Commons unless said otherwise:
     - "Vasiliy Bykov" (368, 21 Aug 2018). Starboard broadside from near
       sea level, 18.5 px a metre. The sheer, the knuckle, the gun, the
       front slope, the bridge band and wings, the mast and radome, the
       raked leg and the vertical topmast on it, the 02 deckhouse, the
       boat, its davit and radome post, the scuttles, the raft racks and
       the two waterline exhaust hoods all come off a metre grid laid
       over this one, and the model's profile was laid back over it.
     - "Dmitriy Rogachyov in Sevastopol" (375, 12 Apr 2019). Port side
       from a hillside, 10.6 px a metre: the same stations to within half
       a metre, and the freeboard with the camera's height taken out.
     - "Vasiliy Bykov" at the Navy Day parade (368, 26 Jul 2020): the
       black band aft with the name on it, which the 2018 shot lacks.
     - "Vasiliy-Bykov-1200" (368 from the port bow, 2020): the mast rig,
       the length of the main yard, both davit jibs pointing forward.
     - "Sergei-Kotov 4f1-37" (383) alongside at Novorossiysk, from a drone:
       the only picture that looks DOWN on the class. Flight deck markings,
       the raft racks, the davits, the mast and radome from above.
     - "Sergei-Kotov 03-vmf-kotov-29", her launch (29 Jan 2021): the
       underwater body, red below a white boot line, and a straight raked
       stem running down to the keel.
     - "Sergei-Kotov chf1" (8 Dec 2021): the AK-176MA gunhouse close up.
     - "VMF 27 01 2021 3 (5)": the stern quarter, the transom and the big
       opening in it, 2.0 to 4.95 m up and about 7.6 m wide.
     - The Army-2016 display model (three photographs): the plan of the
       superstructure and the aperture panels on the mast.
     - Zelenodolsk's own brochure for Project 22160 (reproduced on
       balancer.ru, 2016): the plan view, from which every half-breadth
       station comes. 94.0 m, 14.0 m, 3.4 m navigational draught, about
       1,300 t standard and 1,700 t full, the Pozitiv-ME1 3D radar.

   What has to read at a glance, in order:
     - The long faceted superstructure. Its forward block is the hull's
       own tumblehome carried straight on up from the deck edge to the
       bridge roof, one leaning plane, ending in a huge front slope (35
       deg off the deck) that narrows forward like a prow. Abaft it the 01
       deck is a lower, near-upright wall set half a metre in, and the join
       is cut on a diagonal: the "V" on every broadside of the class.
     - The tall enclosed pyramid mast over the bridge with the 3 m radome
       of the Pozitiv radar on top. Behind it a heavy tapered leg rakes aft
       30 deg off the pyramid's back to a white dome at 21 m, and a
       VERTICAL lattice topmast stands on that leg, 27.1 m to the whip.
       The main yard crosses it at 20.1 m and is 13 m long, very nearly
       the beam: head-on (the gunhouse close-up), from the port bow (368,
       2020) and from the starboard quarter it spans the ship.
     - The single 76.2 mm AK-176MA forward, in its faceted gunhouse on a
       low plinth, 19 m back from the stem. It is the named "turret".
     - The hull: a knuckle running the length of the ship. Below it the
       side flares out, above it the side leans in, so in any light the
       ship reads as two bands. The sheer climbs through amidships to its
       peak at the foot of the front slope and DROOPS to a low, sharp stem
       head (5.45 m, against 7.25 m); every broadside above shows it.
     - A flight deck over the after quarter of the ship: a 9.4 m ring with
       an inner ring, a chamfered deck-edge box round it, per the drone
       photograph.
     - Abaft the bridge a narrower 02 deckhouse, 12.1 m to its roof, whose
       after end ramps up to 13 m as the pedestal of the two davits: the
       lit wall behind the boat in the 2018 and 2020 broadsides. Two 8.3 m
       rigid inflatables sit outboard of it on the 01 deck roof, each
       under a box-beam davit that leans aft with its jib pointing FORWARD
       over the boat, and a small white radome on a post beside it.
     - The transom is open over most of its width, the mooring deck under
       the flight deck: a real recess, 2.4 m deep, not a painted panel.
     - No funnel. The two diesels exhaust through hoods at the waterline
       21-25 m from the stern, both sides, and from 2020 a black band runs
       aft from them to the transom to hide the soot.

   What is deliberately NOT here:
     - The hangar. The builder's brochure draws a "helicopter in a sliding
       hangar", but no photograph of 368, 375, 363 or 383 shows one: the
       01 deck abaft the bridge is 2.3 m high, far too low for a Ka-27,
       and the drone shot shows open deck from the superstructure to the
       stern. So the deck is modelled and the hangar is not.
     - Missiles, CIWS and container modules. The game's weapon list gives
       this ship Oniks and an AK-630; neither was ever photographed on the
       hull. The 2022 Tor-M2KM that was lashed to the flight deck of 368
       and 363 is left off too: it would sit on the deck markings, and
       the photographs here are the 2018-2021 fit.

   Model space: +X bow, +Y port, +Z up, real metres, waterline at z = 0,
   keel at z -2.8 (3.4 m to the bottom of the rudders), stem head x +47.0,
   transom x -47.0. render3d.js stands the model up with rotation.x = -PI/2
   and scales it by its measured X extent, which is the hull: nothing is
   allowed past either end of it.

   Materials are the house three tiers. SKIN is painted steel through
   procedural CanvasTextures (the hull elevation, the deck plan, a plate
   tile for the superstructure); METAL, GLASS; a few flat colours; and the
   team material, exactly C.team. The paint is the darkgrey row of the
   warship3d.js PAINT table (hull 0x353c43, superstructure 0x3e464d, deck
   0x252a2f): the Pact fleet's storm grey, so this ship sits with the rest
   of its navy under the renderer's ACES pass.

   Every static part is merged into ONE mesh per material, as the Ford
   does: thirteen draws in all. The gun is the one exception, in its own
   group so the renderer can train it. Round things are tessellated for
   the closest zoom (130 m, about 0.09 m a pixel after the 0.63 naval
   scale): the 3 m radome is some twenty pixels across there, the domes
   and EO balls four to eight, so they carry 10 to 24 sides, no more.

   ASCII only -- a stray byte in a hex literal has broken this project.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBykov22160 = (function () {
  "use strict";

  var PI = Math.PI;

  /* ---------------------------------------------------- principal dimensions */
  var LOA = 94.0;
  var XS = -47.0, XB = 47.0;        /* transom, stem head                      */
  var TUMBLE = 0.16;                /* upper hull leans in 9 deg above knuckle */
  var CAMBER = 0.18;                /* deck crown over the edge, metres        */
  /* the opening in the transom (stern-quarter photograph, Jan 2021): 2.0 to
     4.95 m up, y -3.5 to +4.1, and a recess 2.4 m deep behind it. A dark
     panel laid on the transom instead sat 1 cm proud, 6 mm after the naval
     scale, under one depth step from 460 m out: it flickered.            */
  var TR_Y0 = -3.5, TR_Y1 = 4.1, TR_Z0 = 2.0, TR_Z1 = 4.95, TR_D = 2.4;

  /* The hull as station tables, stern to stem, x in metres from midships.
     Heights were read off the 2018 broadside at 18.5 px/m and checked on
     the 2019 port-side shot; half-breadths off the builder's plan view,
     scaled to the published 14.0 m beam.                                  */

  /* deck edge above the waterline. 5.4 m at the transom, 5.75 m at the
     after end of the 01 deck, then a steady climb through amidships to a
     peak of 7.25 m at the foot of the front slope, and down again to a
     5.45 m stem head. The 2018 broadside puts the foot of the 01 deck wall
     at 5.9 m 15 m abaft midships and 6.75 m 4 m abaft it, and the stem head
     1.7 m below the deck edge at the gun; the 2019 and 2020 shots agree
     to half a metre.                                                      */
  var ZD = [[-47, 5.40], [-30, 5.55], [-20, 5.75], [-12, 6.20], [-4, 6.70], [4, 6.95],
            [12, 7.15], [18, 7.25], [26, 7.10], [32, 6.80], [38, 6.35], [43, 5.90], [47, 5.45]];
  /* the knuckle: 2.4 m above the water at the transom, rising to meet the
     deck edge at the stem head, the white line on every broadside        */
  var ZK = [[-47, 2.50], [-20, 2.90], [0, 3.40], [20, 4.35], [30, 4.85], [37, 5.05],
            [43, 5.25], [47, 5.40]];
  /* half-breadth at the knuckle, which is the widest point of the ship:
     full 7.0 m from the transom to just forward of the mast, then an ogive
     entry, off the plan view at 18.3 px/m                                 */
  var YK = [[-47, 6.85], [-45, 6.98], [2, 7.00], [7, 6.85], [13, 6.55], [20, 6.05],
            [27, 5.25], [34, 4.35], [40, 3.20], [44, 1.95], [46, 0.90], [47, 0.00]];
  /* waterline half-breadth: 12.6 m on the water against 14.0 m at the
     knuckle, so the side flares 12 deg amidships and 20 deg at the bow.
     Aft the transom is nearly as wide on the water as at the knuckle, as
     the stern-quarter photograph shows.                                  */
  var YW = [[-47, 6.40], [-40, 6.35], [-25, 6.30], [0, 6.30], [8, 6.00], [15, 5.40],
            [22, 4.50], [28, 3.50], [34, 2.40], [39, 1.30], [42.8, 0.00]];
  /* keel: flat at -2.8 over most of the length, rising aft over the last
     25 m to a transom that sits 0.4 m in the water. The rudders reach the
     published 3.4 m navigational draught below it.                       */
  var ZKEEL = [[-47, -0.40], [-43, -0.95], [-37, -1.65], [-30, -2.25], [-22, -2.80],
               [47, -2.80]];
  /* bilge exponent: full aft, a round bilge amidships, a V forward. With
     these tables the built hull, shafts, props and rudders included,
     integrates below the waterline to 1,652 m3, 1,693 t in sea water,
     against the builder's 1,700 t full load: block coefficient 0.51,
     midship coefficient 0.72. The first cut, with a square bilge and a
     13.1 m waterline, came to 2,420 t.                                   */
  var PEXP = [[-47, 3.5], [-40, 2.4], [-25, 1.8], [5, 1.6], [20, 1.36], [32, 1.3], [42, 1.1]];
  /* flare exponent above the water: straight amidships, hollow forward   */
  var QEXP = [[-47, 1.0], [10, 1.0], [30, 1.35], [47, 1.6]];
  /* The stem is straight and raked 38 deg from the waterline at x 42.8 up
     to the stem head, and straight on down to the keel at x 40.6, as the
     launch photograph shows: 8.25 m of stem, one line, deck to keel. The
     2018 broadside seems to put the waterline point a metre further aft
     (a 45 deg rake), but there it is under the bow wave. Near it the
     section is a wedge whose half angle opens from 12 deg under water to
     32 deg at the deck.                                                  */
  function xStem(z) { return 42.8 + 0.78 * z; }
  var KW = [[-2.8, 0.22], [0, 0.30], [2.5, 0.42], [5.4, 0.62], [9, 0.62]];

  var STATIONS = [-47, -46.4, -45, -42.5, -39.5, -36, -32, -28, -24, -20, -16, -12, -8, -4,
                  0, 4, 8, 12, 16, 20, 23.5, 27, 30, 33, 35.5, 37.5, 39.2, 40.5, 41.6,
                  42.6, 43.5, 44.3, 45.0, 45.6, 46.1, 46.6, 47.0];

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

  /* ------------------------------------------------------- the hull form */
  function zD(x) { return tbl(ZD, x); }
  function zK(x) { return tbl(ZK, x); }
  function yK(x) { return tbl(YK, x); }
  function yW(x) { return x >= 42.8 ? 0 : tbl(YW, x); }
  function yD(x) { return Math.max(0, yK(x) - TUMBLE * (zD(x) - zK(x))); }
  /* the deck edge as the hull actually has it: the stem wedge trims the
     last metre, and the deck, the rails and the loft must all agree     */
  function yDeck(x) { return Math.min(yD(x), wedge(x, zD(x))); }
  /* lowest point of the section: the keel, or the stem where it cuts */
  function zLow(x) { return Math.max(tbl(ZKEEL, x), (x - 42.8) / 0.78); }
  function wedge(x, z) { return tbl(KW, z) * Math.max(0, xStem(z) - x); }

  /* half-breadth of the moulded hull at station x, height z             */
  function halfB(x, z) {
    var zl = zLow(x), zk = zK(x), zd = zD(x), y;
    if (z <= zl + 1e-6) return 0;
    if (z < 0) {
      var s = clamp(z / zl, 0, 1), p = tbl(PEXP, x);
      y = yW(x) * Math.pow(Math.max(0, 1 - Math.pow(s, p)), 1 / p);
    } else if (z <= zk) {
      var t = zk > 1e-6 ? clamp(z / zk, 0, 1) : 1;
      y = yW(x) + (yK(x) - yW(x)) * Math.pow(t, tbl(QEXP, x));
    } else {
      var u = zd - zk > 1e-6 ? clamp((z - zk) / (zd - zk), 0, 1) : 1;
      y = yK(x) - (yK(x) - yD(x)) * u;
    }
    return Math.min(y, wedge(x, z));
  }

  /* One side of a station, keel to deck edge, as [y, z] (y >= 0). Ten
     rows, always the same ten, so the loft is a clean grid: the keel,
     four waterlines under water bunched toward the bilge, the waterline,
     two flare lines, the knuckle and the deck edge. Rows under a risen
     keel or forward of the stem fold onto the lowest point.              */
  var ROWS = 10, R_KN = 8;
  function section(x) {
    var zl = zLow(x), zk = zK(x), zd = zD(x), out = [], k;
    var zs = [];
    zs.push(zl);
    [0.90, 0.75, 0.55, 0.30].forEach(function (s) { zs.push(Math.min(0, zl) * s); });
    zs.push(0);
    zs.push(zk * 0.35, zk * 0.70, zk, zd);
    for (k = 0; k < zs.length; k++) {
      var z = Math.max(zl, zs[k]);
      out.push([k === 0 ? 0 : halfB(x, z), z]);
    }
    /* keep the grid monotone in z even where rows fold together          */
    for (k = 1; k < out.length; k++) if (out[k][1] < out[k - 1][1]) out[k][1] = out[k - 1][1];
    return out;
  }
  /* a point on the hull surface, for things that sit against the side  */
  function hullY(x, z) { return halfB(x, z); }

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

  /* ============================================================= textures */
  var PAINT = { hull: 0x353c43, sup: 0x3e464d, deck: 0x252a2f };
  var C_FOUL = 0x3a1d18, C_BOOT = 0x111315, C_BAND = 0x15171a, C_MARK = 0xc6cbcd;

  /* --- the hull elevation. u runs transom (0) to stem head (1). The canvas
     holds two copies of the side, the PORT one in the top half and the
     STARBOARD one in the bottom half, each z -3.4 (bottom row) to +7.6
     (top row). Seen from port the bow is on the left, so everything with
     a reading direction is drawn mirrored in the port half: both sides
     then read 368 and the name the right way round.                    */
  var HZ0 = -3.4, HZ1 = 7.6;
  var TEX = {};
  function hullTex(THREE, team) {
    var key = "hull_" + hx(team);
    if (TEX[key]) return TEX[key];
    var W = 2048, H = 512, HH = H / 2, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(22160), i, k, s;
    var PXZ = HH / (HZ1 - HZ0), PXX = W / LOA;
    function U(x) { return (x - XS) * PXX; }
    for (s = 0; s < 2; s++) {
      var o = s * HH;
      var Y = function (z) { return o + (HZ1 - z) * PXZ; };
      g.save();
      g.beginPath(); g.rect(0, o, W, HH); g.clip();
      /* paint levels: grey topsides, black boot top, oxide red bottom     */
      g.fillStyle = hx(PAINT.hull); g.fillRect(0, o, W, HH);
      g.fillStyle = hx(C_BOOT); g.fillRect(0, Y(0.30), W, Y(-0.25) - Y(0.30));
      g.fillStyle = hx(C_FOUL); g.fillRect(0, Y(-0.25), W, o + HH - Y(-0.25));
      /* the thin white line along the top of the boot top (2018 shot)    */
      g.fillStyle = "rgba(214,218,220,0.55)"; g.fillRect(0, Y(0.36), W, 2);
      /* plate patchwork: no two strakes weather to the same tone          */
      for (i = 0; i < 110; i++) {
        g.globalAlpha = 0.010 + R() * 0.018;
        g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
        g.fillRect(R() * W, Y(7.6) + R() * (Y(0.4) - Y(7.6)), 60 + R() * 220, 8 + R() * 22);
      }
      g.globalAlpha = 1;
      /* strakes every 1.5 m with a lit lip, butts staggered strake to strake */
      for (k = 0; k < 6; k++) {
        var zs = 0.9 + k * 1.5, y0 = Y(zs), y1 = Y(zs + 1.5);
        g.fillStyle = "rgba(0,0,0,0.26)"; g.fillRect(0, y0 - 1, W, 1.5);
        g.fillStyle = "rgba(255,255,255,0.06)"; g.fillRect(0, y0 - 2.5, W, 1.5);
        for (var bx = (k % 2) * 64; bx < W; bx += 128) {
          g.fillStyle = "rgba(0,0,0,0.18)"; g.fillRect(bx, y1, 1.5, y0 - y1);
        }
      }
      /* the knuckle: a pale rubbing line the whole length                 */
      g.beginPath();
      for (i = 0; i <= 94; i++) {
        var xx = XS + i;
        if (i === 0) g.moveTo(U(xx), Y(zK(xx))); else g.lineTo(U(xx), Y(zK(xx)));
      }
      g.lineWidth = 2.2; g.strokeStyle = "rgba(205,210,212,0.42)"; g.stroke();
      /* the black soot band aft, 2020 on: 1.9 m high over the boot top from
         the transom to the exhaust hoods, its forward end cut on a slant  */
      g.fillStyle = hx(C_BAND);
      g.beginPath();
      g.moveTo(U(XS), Y(0.2)); g.lineTo(U(-17.6), Y(0.2)); g.lineTo(U(-20.3), Y(2.05));
      g.lineTo(U(XS), Y(2.05)); g.closePath(); g.fill();
      /* scuttles: two aft and two forward, read off the 2018 broadside on
         its metre grid (x -42.9, -37.2 at 3.2 m; 30.2 at 5.3, 38.4 at 5.0).
         What looks like a third aft at -31 is a curved plating seam.      */
      var SCUTTLES = [[-42.9, 3.2], [-37.2, 3.2], [30.2, 5.3], [38.4, 5.05]];
      g.fillStyle = "rgba(8,10,12,0.85)";
      SCUTTLES.forEach(function (p) {
        g.beginPath(); g.arc(U(p[0]), Y(p[1]), 4.2, 0, 2 * PI); g.fill();
      });
      g.strokeStyle = "rgba(210,214,216,0.35)"; g.lineWidth = 1;
      SCUTTLES.forEach(function (p) {
        g.beginPath(); g.arc(U(p[0]), Y(p[1]), 5.6, 0, 2 * PI); g.stroke();
      });
      /* the seam itself, curving down and aft from the 01 deck corner     */
      g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.5;
      g.beginPath(); g.moveTo(U(-30.4), Y(5.4));
      g.quadraticCurveTo(U(-30.6), Y(3.1), U(-33.2), Y(2.85)); g.stroke();
      /* the anchor pocket, a recessed hawse set into the flare             */
      g.fillStyle = "rgba(6,7,8,0.92)";
      g.beginPath(); g.moveTo(U(40.9), Y(1.95)); g.lineTo(U(42.3), Y(2.05)); g.lineTo(U(42.8), Y(3.75));
      g.lineTo(U(41.1), Y(3.70)); g.closePath(); g.fill();
      g.fillStyle = "rgba(210,214,216,0.50)"; g.fillRect(U(40.95), Y(3.85), U(42.85) - U(40.95), 2);
      /* draught marks at the stem, amidships and the transom               */
      g.fillStyle = "rgba(220,224,226,0.70)";
      [41.6, -3.8, -46.4].forEach(function (x) {
        for (var dz = -0.2; dz < 2.2; dz += 0.5) g.fillRect(U(x), Y(dz + 0.2), 4, 3);
      });
      /* rust weeping from the scuttles and the hawse, faint: a new ship     */
      for (i = 0; i < 24; i++) {
        var rx = R() * W, rz = 1.0 + R() * 5.0, ry = Y(rz), len = 20 + R() * 70;
        var gr = g.createLinearGradient(0, ry, 0, ry + len);
        gr.addColorStop(0, "rgba(64,38,24,0.20)"); gr.addColorStop(1, "rgba(64,38,24,0)");
        g.fillStyle = gr; g.fillRect(rx, ry, 1.5 + R() * 2, len);
      }
      g.restore();

      /* lettering. Starboard reads left to right as painted; port is drawn
         mirrored about each word's own centre.                            */
      var words = function (txt, x0, x1, zb, zt, fill, stroke, font) {
        var cx = (U(x0) + U(x1)) * 0.5, h = Y(zb) - Y(zt);
        g.save();
        g.translate(cx, Y(zb));
        if (s === 0) g.scale(-1, 1);
        g.font = font.replace("%", String(Math.round(h * 1.32)));
        g.textAlign = "center"; g.textBaseline = "alphabetic";
        var wmax = U(x1) - U(x0), tw = g.measureText ? (g.measureText(txt).width || wmax) : wmax;
        if (tw > wmax) g.scale(wmax / tw, 1);
        if (stroke) { g.lineWidth = 3; g.strokeStyle = stroke; g.strokeText(txt, 0, 0); }
        g.fillStyle = fill; g.fillText(txt, 0, 0);
        g.restore();
      };
      /* pennant 368 on each bow in the team colour, outlined in the white
         the real numbers are painted in: 8 m long, 3 m high               */
      words("368", 22.7, 30.8, 0.85, 3.85, hx(team), "rgba(226,230,232,0.9)", "bold %px Arial");
      /* the name on the soot band, white Cyrillic, 0.7 m letters           */
      words("\u0412\u0410\u0421\u0418\u041b\u0418\u0419 \u0411\u042b\u041a\u041e\u0412",
            -33.5, -25.5, 0.75, 1.45, "rgba(214,218,220,0.92)", null, "bold %px Arial");
    }
    TEX[key] = finish(THREE, cv);
    return TEX[key];
  }

  /* --- the deck, in plan: u = x -47..47, v = y -8 (bottom) .. +8 (top). The
     flight deck markings are measured off the drone photograph of 383:
     a 9.4 m touchdown ring round a 3 m inner ring, centred 8.2 m from the
     transom, inside a chamfered box from x -46.2 to -31.4.               */
  var FD_X = -38.8, FD_R = 4.7, FD_R2 = 1.5;
  /* the gun's training axis: the centre of the gunhouse, 3.9 m long from
     x 25.85 to 29.75 in the 2018 broadside. The "turret" group sits here
     and the deck canvas draws the training circle round the same point. */
  var GUN_X = 27.8;
  function deckTex(THREE) {
    if (TEX.deck) return TEX.deck;
    var W = 2048, H = 352, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(1604), i;
    var SX = W / LOA, SY = H / 16;
    function cx(x) { return (x - XS) * SX; }
    function cy(y) { return H - (y + 8) * SY; }
    g.fillStyle = hx(PAINT.deck); g.fillRect(0, 0, W, H);
    for (i = 0; i < 110; i++) {
      g.globalAlpha = 0.012 + R() * 0.022;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 40 + R() * 160, 14 + R() * 40);
    }
    g.globalAlpha = 0.22; g.fillStyle = "#000000";
    for (i = 0; i < 3000; i++) g.fillRect(R() * W, R() * H, 1.5, 1.5);
    g.globalAlpha = 1;
    /* deck plating: 6 m plates, 1.8 m strakes                              */
    g.fillStyle = "rgba(0,0,0,0.28)";
    for (i = 0; i <= 94; i += 6) g.fillRect(cx(XS + i), 0, 1.5, H);
    for (i = -7.2; i <= 7.2; i += 1.8) g.fillRect(0, cy(i), W, 1.5);
    /* forecastle: the two chain pipes and the hatches between gun and stem */
    g.fillStyle = "rgba(8,9,10,0.85)";
    [1.25, -1.25].forEach(function (y) { g.beginPath(); g.arc(cx(39.4), cy(y), 5, 0, 2 * PI); g.fill(); });
    g.strokeStyle = "rgba(10,11,12,0.7)"; g.lineWidth = 2;
    g.strokeRect(cx(35.0), cy(0.8), 1.6 * SX, 1.6 * SY);
    g.strokeRect(cx(21.2), cy(2.9), 1.4 * SX, 1.2 * SY);
    g.strokeRect(cx(21.2), cy(-1.7), 1.4 * SX, 1.2 * SY);
    /* the gun plinth top: a darker ring and the training circle           */
    g.strokeStyle = "rgba(8,9,10,0.6)"; g.lineWidth = 3;
    g.beginPath(); g.arc(cx(GUN_X), cy(0), 1.5 * SX, 0, 2 * PI); g.stroke();

    /* flight deck: a lighter non-skid field, then the markings            */
    g.fillStyle = "rgba(255,255,255,0.05)";
    g.fillRect(cx(-47), cy(6.3), cx(-31.0) - cx(-47), 12.6 * SY);
    var WH = hx(C_MARK);
    g.strokeStyle = WH;
    /* the chamfered box round the landing area                           */
    g.lineWidth = 0.28 * SX;
    var bx0 = -46.2, bx1 = -31.4, by = 5.95, ch = 2.0;
    g.beginPath();
    g.moveTo(cx(bx0 + ch), cy(by)); g.lineTo(cx(bx1 - ch), cy(by)); g.lineTo(cx(bx1), cy(by - ch));
    g.lineTo(cx(bx1), cy(-by + ch)); g.lineTo(cx(bx1 - ch), cy(-by)); g.lineTo(cx(bx0 + ch), cy(-by));
    g.lineTo(cx(bx0), cy(-by + ch)); g.lineTo(cx(bx0), cy(by - ch)); g.closePath(); g.stroke();
    /* touchdown ring and the inner ring                                   */
    function ring(r, w) {
      g.lineWidth = w * SX;
      g.beginPath();
      g.ellipse ? g.ellipse(cx(FD_X), cy(0), r * SX, r * SY, 0, 0, 2 * PI)
                : g.arc(cx(FD_X), cy(0), r * SX, 0, 2 * PI);
      g.stroke();
    }
    ring(FD_R, 0.36);
    ring(FD_R2, 0.24);
    /* the line-up line forward from the ring to the box, and the dashes
       down the centreline through both rings                              */
    g.fillStyle = WH;
    g.fillRect(cx(FD_X + FD_R), cy(0.20), cx(bx1) - cx(FD_X + FD_R), 0.40 * SY);
    for (i = -FD_R + 0.4; i < FD_R - 0.4; i += 1.0)
      if (Math.abs(i) > FD_R2 + 0.2) g.fillRect(cx(FD_X + i), cy(0.1), 0.5 * SX, 0.2 * SY);
    /* the two tie-down tracks the drone shot shows forward of the box    */
    g.fillStyle = "rgba(6,7,8,0.75)";
    [2.9, 1.3, -1.3, -2.9].forEach(function (y) {
      g.fillRect(cx(-31.2), cy(y + 0.09), cx(-23.8) - cx(-31.2), 0.18 * SY);
    });
    /* tie-down points in a grid over the landing area                     */
    g.fillStyle = "rgba(6,7,8,0.55)";
    for (var tx = -45.5; tx < -31.5; tx += 1.5)
      for (var ty = -5.25; ty <= 5.3; ty += 1.5) g.fillRect(cx(tx), cy(ty), 2.5, 2.5);
    TEX.deck = finish(THREE, cv);
    return TEX.deck;
  }

  /* --- superstructure plate: one 8 m tile, box-projected at a constant size.
     Panel seams every 2 m, verticals every 1.6 m, and the soft streaking a
     two-year-old ship collects under every ledge.                        */
  function supTex(THREE) {
    if (TEX.sup) return TEX.sup;
    var W = 512, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(3316), i;
    g.fillStyle = hx(PAINT.sup); g.fillRect(0, 0, W, H);
    for (i = 0; i < 40; i++) {
      g.globalAlpha = 0.012 + R() * 0.02;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 40 + R() * 150, 20 + R() * 90);
    }
    g.globalAlpha = 1;
    for (i = 0; i < 4; i++) {
      g.fillStyle = "rgba(0,0,0,0.24)"; g.fillRect(0, i * 128, W, 1.5);
      g.fillStyle = "rgba(255,255,255,0.06)"; g.fillRect(0, i * 128 + 2, W, 1.5);
    }
    for (i = 0; i < 5; i++) { g.fillStyle = "rgba(0,0,0,0.16)"; g.fillRect(i * 102.4 + 30, 0, 1.5, H); }
    for (i = 0; i < 20; i++) {
      var sx = R() * W, sy = R() * H, len = 30 + R() * 80;
      var gr = g.createLinearGradient(0, sy, 0, sy + len);
      gr.addColorStop(0, "rgba(20,22,24,0.18)"); gr.addColorStop(1, "rgba(20,22,24,0)");
      g.fillStyle = gr; g.fillRect(sx, sy, 2 + R() * 3, len);
    }
    TEX.sup = finish(THREE, cv);
    return TEX.sup;
  }

  /* ================================================================= hull
     Lofted stern to stem through STATIONS, one ten-row section each. The
     two sides are separate strips so each can take its own half of the
     hull canvas. Normals are smoothed across neighbours within 36 deg,
     except along the knuckle, where the rows above and below are keyed
     apart so the chine stays a hard line in every light.                 */
  function hullGeo(THREE) {
    var st = STATIONS, i, j, s;
    var secs = st.map(section);
    var faces = [];
    function V(ii, jj, side) { var q = secs[ii][jj]; return [st[ii], side * q[0], q[1]]; }
    function key(ii, jj, side, band) {
      return (side > 0 ? 0 : 1e6) + ii * 100 + jj + (jj === R_KN && band >= R_KN ? 50 : 0);
    }
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
        /* port: (A, D, B), (B, D, C) winds outward; starboard the mirror  */
        var kA, kB, kC, kD;
        s = 1;
        kA = key(i, j, s, j); kB = key(i + 1, j, s, j); kC = key(i + 1, j + 1, s, j); kD = key(i, j + 1, s, j);
        tri(V(i, j, s), V(i, j + 1, s), V(i + 1, j, s), kA, kD, kB, s);
        tri(V(i + 1, j, s), V(i, j + 1, s), V(i + 1, j + 1, s), kB, kD, kC, s);
        s = -1;
        kA = key(i, j, s, j); kB = key(i + 1, j, s, j); kC = key(i + 1, j + 1, s, j); kD = key(i, j + 1, s, j);
        tri(V(i, j, s), V(i + 1, j, s), V(i, j + 1, s), kA, kB, kD, s);
        tri(V(i + 1, j, s), V(i + 1, j + 1, s), V(i, j + 1, s), kB, kC, kD, s);
      }
    }
    /* the transom, a flat cap: its outline runs port from the deck edge
       down to the keel, starboard back up, and across the top along the
       deck's crown. The mooring-deck opening is cut out of it (TR_*), and
       three's own earcut fills the rest; every triangle is turned to face
       aft. The recess behind the opening is built with the fittings.    */
    var ring = [];
    for (j = ROWS - 1; j >= 0; j--) ring.push(V(0, j, 1));
    for (j = 1; j < ROWS; j++) ring.push(V(0, j, -1));
    for (j = 1; j < DECK_N; j++) {
      var yy0 = -yDeck(XS) + 2 * yDeck(XS) * j / DECK_N;
      ring.push([XS, yy0, deckZ(XS, yy0)]);
    }
    var cont = [];
    ring.forEach(function (q) {
      var l = cont[cont.length - 1];
      if (l && Math.abs(l.x - q[1]) < 1e-4 && Math.abs(l.y - q[2]) < 1e-4) return;
      cont.push(new THREE.Vector2(q[1], q[2]));
    });
    if (cont.length > 2 && cont[0].distanceTo(cont[cont.length - 1]) < 1e-4) cont.pop();
    var hole = [new THREE.Vector2(TR_Y0, TR_Z0), new THREE.Vector2(TR_Y1, TR_Z0),
                new THREE.Vector2(TR_Y1, TR_Z1), new THREE.Vector2(TR_Y0, TR_Z1)];
    var tf = THREE.ShapeUtils.triangulateShape(cont, [hole]), tp = cont.concat(hole);
    tf.forEach(function (f) {
      var a = tp[f[0]], b = tp[f[1]], c = tp[f[2]];
      if ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) > 0) { var t0 = b; b = c; c = t0; }
      tri([XS, a.x, a.y], [XS, b.x, b.y], [XS, c.x, c.y], -1, -1, -1, 0);
    });

    var around = {}, COS = Math.cos(36 * PI / 180);
    faces.forEach(function (f, fi) { f.k.forEach(function (k) { (around[k] || (around[k] = [])).push(fi); }); });
    var pos = [], nrm = [], uv = [];
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
        pos.push(q[0], q[1], q[2]);
        nrm.push(sx / l, sy / l, sz / l);
        /* port half of the canvas above v 0.5, starboard below; the transom
           takes the port half, which is plain plating at every height     */
        var base = f.s < 0 ? 0 : 0.5;
        uv.push((q[0] - XS) / LOA, base + 0.5 * clamp((q[2] - HZ0) / (HZ1 - HZ0), 0.001, 0.999));
      }
    });
    return { pos: pos, nrm: nrm, uv: uv };
  }

  /* the weather deck: a crowned surface between the two deck edges, UVs in
     plan so the deck canvas lands its markings where they were measured  */
  var DECK_N = 8;
  function deckZ(x, y) {
    var h = yDeck(x);
    var t = h > 1e-4 ? clamp(Math.abs(y) / h, 0, 1) : 1;
    return zD(x) + CAMBER * (1 - t * t);
  }
  function deckGeo(THREE) {
    var st = STATIONS, i, k, pos = [], uv = [];
    function P(ii, kk) {
      var x = st[ii], h = yDeck(x), y = -h + 2 * h * kk / DECK_N;
      return [x, y, deckZ(x, y)];
    }
    function push(q) { pos.push(q[0], q[1], q[2]); uv.push((q[0] - XS) / LOA, (q[1] + 8) / 16); }
    /* at the stem head the last station is a point: its quads fold to one
       triangle each, and the folded half is left out                      */
    function tri(a, b, c) {
      var ux = b[0] - a[0], uy = b[1] - a[1], vx = c[0] - a[0], vy = c[1] - a[1];
      if (Math.abs(ux * vy - uy * vx) < 1e-6) return;
      push(a); push(b); push(c);
    }
    for (i = 0; i < st.length - 1; i++) {
      for (k = 0; k < DECK_N; k++) {
        var A = P(i, k), B = P(i + 1, k), C = P(i + 1, k + 1), D = P(i, k + 1);
        tri(A, B, D);
        tri(B, C, D);
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    return g;
  }
  /* deck-material parts take their UVs from plan position, like the deck */
  function planUV(geo) {
    var P = geo.getAttribute("position"), U = geo.getAttribute("uv"), i;
    if (!U) { geo.setAttribute("uv", new (P.constructor)(new Float32Array(P.count * 2), 2)); U = geo.getAttribute("uv"); }
    for (i = 0; i < P.count; i++) U.setXY(i, (P.getX(i) - XS) / LOA, (P.getY(i) + 8) / 16);
    return geo;
  }

  /* ============================================================ the parts
     Each is built in its own frame and handed back as [material, geo].   */

  /* AK-176MA in the stealth gunhouse, ring centre at the origin, gun on +X.
     The house from the 2018 broadside and the close-up of 383's mount:
     3.9 m long, 2.9 m across, 2.3 m high, a raked front face, flat sides
     leaning in, a canvas blast bag where the 59-calibre barrel leaves the
     face 1.2 m up, and the cooling jacket slung under the barrel. 3.25 m
     of barrel shows ahead of the face in the broadside. The ring and the
     house are centred ON the origin, the axis the renderer trains about,
     so the house turns in place over its ring on every bearing.          */
  function gunParts(THREE) {
    var P = [];
    P.push(["K", cylZ(THREE, 1.30, 1.36, 0.28, 16, 0, 0, 0)]);
    var base = chamRect(-1.95, 1.95, 1.45, 0.35);
    var top = chamRect(-1.80, 0.75, 1.28, 0.30);
    P.push(["S", stack(THREE, [[base, 0.28], [top, 2.30]], true, false)]);
    /* the barrel slot and its blast bag                                  */
    P.push(["K", box(THREE, 0.10, 0.62, 1.05, 1.48, 0, 1.12, 0, -0.52, 0)]);
    var bag = strut(THREE, 1.25, 0, 1.18, 2.25, 0, 1.18, 0.40, 10, 0.20);
    P.push(["W", bag]);
    P.push(["M", strut(THREE, 1.6, 0, 1.18, 4.65, 0, 1.18, 0.12, 10, 0.085)]);
    P.push(["M", strut(THREE, 4.45, 0, 1.18, 4.72, 0, 1.18, 0.105, 10)]);
    P.push(["M", strut(THREE, 2.1, 0, 0.98, 4.1, 0, 1.03, 0.045, 6)]);
    /* ammunition hatch and ladder rungs on the port side of the house    */
    P.push(["K", box(THREE, 0.9, 0.04, 1.1, -0.9, 1.40, 1.05, -0.08, 0, 0)]);
    return P;
  }

  /* the 14.5 mm MTPU pedestal machine gun, barrel on +X                  */
  function mtpuParts(THREE) {
    return [
      ["M", cylZ(THREE, 0.09, 0.13, 0.85, 6, 0, 0, 0)],
      ["M", box(THREE, 0.55, 0.30, 0.28, 0.05, 0, 0.98)],
      ["K", strut(THREE, 0.25, 0, 1.0, 1.55, 0, 1.0, 0.035, 5)],
      ["M", box(THREE, 0.06, 0.55, 0.40, -0.35, 0, 1.10)],
    ];
  }

  /* a rigid inflatable L metres long, stern at x 0, bow at x +L: grey GRP
     hull under the dark grey tubes, a console amidships and the outboard
     aft. The plan is drawn for 7 m and stretched fore and aft.            */
  function rhibParts(THREE, L) {
    var P = [], k7 = L / 7;
    var plan = [[0.0, -1.0], [4.6, -1.08], [6.3, -0.62], [7.0, 0.0], [6.3, 0.62], [4.6, 1.08], [0.0, 1.0]]
      .map(function (q) { return [q[0] * k7, q[1]]; });
    var bot = plan.map(function (q) { return [q[0] * 0.96 + 0.15, q[1] * 0.62]; });
    P.push(["S", stack(THREE, [[bot, 0.0], [plan, 0.62]], true, true)]);
    for (var k = 0; k < plan.length; k++) {
      var a = plan[k], b = plan[(k + 1) % plan.length];
      if (k === plan.length - 1) continue;               /* open at the transom */
      P.push(["K", strut(THREE, a[0], a[1], 0.72, b[0], b[1], 0.72, 0.24, 6)]);
    }
    P.push(["S", box(THREE, 0.8, 0.9, 0.85, 3.2 * k7, 0, 1.05)]);
    P.push(["G", box(THREE, 0.08, 0.8, 0.30, 3.2 * k7 + 0.42, 0, 1.40, 0, -0.5, 0)]);
    P.push(["K", box(THREE, 0.55, 0.45, 0.9, -0.15, 0, 0.75)]);
    return P;
  }

  /* ================================================================ build */
  function build(THREE, M, C) {
    var root = new THREE.Group();
    var i, s, x;
    var team = C && C.team !== undefined ? C.team : "#d6503f";

    /* ---------------------------------------------------- the materials */
    var T = {};
    T.H = new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE, team), roughness: 0.86, metalness: 0.08 });
    T.D = new THREE.MeshStandardMaterial({ color: 0xffffff, map: deckTex(THREE), roughness: 0.94, metalness: 0.04 });
    T.S = new THREE.MeshStandardMaterial({ color: 0xffffff, map: supTex(THREE), roughness: 0.87, metalness: 0.07 });
    T.M = new THREE.MeshStandardMaterial({ color: 0x3c4349, roughness: 0.55, metalness: 0.40 });
    T.K = new THREE.MeshStandardMaterial({ color: 0x15181b, roughness: 0.80, metalness: 0.10 });
    /* glass lies 5 cm off the window band, 3 cm after the naval scale:
       pulled toward the camera like the team flashes, so it never
       flickers against the band at full zoom-out                          */
    T.G = new THREE.MeshStandardMaterial({ color: 0x0f1a22, roughness: 0.10, metalness: 0.0, transparent: true, opacity: 0.88,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    T.W = new THREE.MeshStandardMaterial({ color: 0xb4b8b6, roughness: 0.70, metalness: 0.04 });
    T.A = new THREE.MeshStandardMaterial({ color: 0x5c646b, roughness: 0.62, metalness: 0.05 });
    /* the team material, pulled a couple of depth steps toward the camera
       because its flashes lie flat on a roof, as the Ford's do            */
    T.T = new THREE.MeshStandardMaterial({ color: new THREE.Color(team), roughness: 0.60, metalness: 0.10,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    var B = {};
    Object.keys(T).forEach(function (k) { B[k] = new Batch(k === "S" ? 8 : 0); });
    function emit(parts, px, py, pz, hdg, mirror) {
      parts.forEach(function (pp) {
        var g = pp[1];
        if (mirror) { g.scale(1, -1, 1); flipWinding(g); }
        place(THREE, g, 0, 0, 0, 0, 0, hdg || 0);
        g.translate(px, py, pz);
        B[pp[0]].add(g);
      });
    }
    function flipWinding(g) {
      var P2 = g.index ? null : g.getAttribute("position");
      if (g.index) {
        var ix = g.index.array;
        for (var q = 0; q < ix.length; q += 3) { var t0 = ix[q + 1]; ix[q + 1] = ix[q + 2]; ix[q + 2] = t0; }
        g.index.needsUpdate = true;
      } else {
        for (var q2 = 0; q2 < P2.count; q2 += 3) {
          var ax = P2.getX(q2 + 1), ay = P2.getY(q2 + 1), az = P2.getZ(q2 + 1);
          P2.setXYZ(q2 + 1, P2.getX(q2 + 2), P2.getY(q2 + 2), P2.getZ(q2 + 2));
          P2.setXYZ(q2 + 2, ax, ay, az);
        }
      }
      g.computeVertexNormals();
    }

    /* ------------------------------------------------------------- hull */
    var hg = hullGeo(THREE);
    B.H.raw(hg.pos, hg.nrm, hg.uv);
    B.D.add(deckGeo(THREE));

    /* shafts, props and twin rudders: underwater, painted off the hull
       canvas's anti-fouling row                                           */
    [1, -1].forEach(function (sd) {
      B.H.add(uvAt(strut(THREE, -24.0, sd * 2.4, -2.15, -42.3, sd * 2.4, -2.0, 0.16, 8), 0.5, 0.01));
      B.H.add(uvAt(strut(THREE, -40.6, sd * 2.4, -1.3, -40.6, sd * 2.4, -2.0, 0.08, 5), 0.5, 0.01));
      B.H.add(uvAt(cylZ(THREE, 0.95, 0.95, 0.2, 12, 0, 0, -0.1), 0.5, 0.01)
        .rotateY(PI / 2).translate(-42.5, sd * 2.4, -2.0));
      B.H.add(uvAt(box(THREE, 1.9, 0.26, 2.5, -44.7, sd * 2.4, -2.1), 0.5, 0.01));
    });

    /* the mooring deck behind the transom opening: an open box facing
       aft, its walls and deckhead dark, its floor in deck paint. Nothing
       of it reaches past the transom, so the X extent is the hull's.    */
    function panel(batch, a, b, c, d, n) {
      var q = [a, b, c, a, c, d], pos = [];
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      if ((uy * vz - uz * vy) * n[0] + (uz * vx - ux * vz) * n[1] + (ux * vy - uy * vx) * n[2] < 0)
        q = [a, c, b, a, d, c];
      q.forEach(function (p) { pos.push(p[0], p[1], p[2]); });
      var g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      g.computeVertexNormals();
      batch.add(batch === B.D ? planUV(g) : g);
    }
    (function () {
      var x0 = XS, x1 = XS + TR_D, y0 = TR_Y0, y1 = TR_Y1, z0 = TR_Z0, z1 = TR_Z1;
      panel(B.K, [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1], [-1, 0, 0]);
      panel(B.D, [x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [0, 0, 1]);
      panel(B.K, [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], [0, 0, -1]);
      panel(B.K, [x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1], [0, -1, 0]);
      panel(B.K, [x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], [0, 1, 0]);
    })();

    /* two exhaust hoods a side at the waterline, 21-25 m from the stern   */
    [[-23.9, 1.30], [-21.4, 1.85]].forEach(function (h) {
      [1, -1].forEach(function (sd) {
        var yy = hullY(h[0], 0.60);
        B.S.add(xPrism(THREE, [[yy - 0.2, 0.15], [yy + 0.42, 0.25], [yy + 0.42, 0.95], [yy - 0.2, 1.10]]
          .map(function (q) { return [sd * q[0], q[1]]; }), h[0] - h[1] * 0.5, h[0] + h[1] * 0.5));
        B.K.add(box(THREE, 0.06, 0.5, 0.55, h[0] - h[1] * 0.5 - 0.03, sd * (yy + 0.14), 0.58));
      });
    });

    /* ------------------------------------------------ the superstructure
       Read off the 2018 and 2020 broadsides with the contrast pulled up:
       the FORWARD block's sides are the hull's own tumblehome carried on
       up from the deck edge to the bridge roof, one plane, lit like the
       hull in both shots. The 01 deck abaft it is a separate wall half a
       metre inboard of the deck edge, near upright and darker, 2.3 m high
       all along so its roof follows the sheer. Where the two meet, the
       forward block's after edge is cut on a diagonal from the deck edge 3.9
       m abaft midships up to 9.0 m at x -0.3: the "V" on every broadside. */
    function wall(x, z) { return yK(x) - TUMBLE * (z - zK(x)); }     /* hull plane, extended */
    /* the 01 roof is one plane from its after edge to where the bridge
       block takes over, 2.3 m over the deck edge at both ends            */
    function roofZ(x) { return lerp(zD(-21.6), zD(1.0), (x + 21.6) / 22.6) + 2.3; }
    var ZW0 = 11.6, ZRF = 13.0;

    /* the 01 deck: from its raked after face (x -23.2 on the deck, -21.6 at
       the roof) forward into the bridge block, which swallows its end    */
    function w01(x, top) { return yDeck(x) - (top ? 0.72 : 0.5); }
    B.S.add(stack(THREE, [
      [[[-23.2, -w01(-23.2), zD(-23.2) - 0.12], [1.0, -w01(1.0), zD(1.0) - 0.12],
        [1.0, w01(1.0), zD(1.0) - 0.12], [-23.2, w01(-23.2), zD(-23.2) - 0.12]], 0],
      [[[-21.6, -w01(-21.6, 1), roofZ(-21.6)], [1.0, -w01(1.0, 1), roofZ(1.0)],
        [1.0, w01(1.0, 1), roofZ(1.0)], [-21.6, w01(-21.6, 1), roofZ(-21.6)]], 0]
    ], true, false));

    /* The forward block. Corners, starboard then port: A the after edge of
       the side (the diagonal), C where the side turns in toward the prow,
       D the prow on the front slope. At the deck the prow is 5.5 m across
       at x +19.3 and the side stays flush to x +10.5 (the builder's plan);
       the slope climbs 35 deg to the foot of the windows at x +12.6, 11.6 m
       up; the window band leans back to the roof at 13.0 m.               */
    function ringF(z, xa, xc, xd, yd) {
      var ya = z === null ? yDeck(xa) : wall(xa, z), yc = z === null ? yDeck(xc) : wall(xc, z);
      var za = z === null ? zD(xa) : z, zc = z === null ? zD(xc) : z;
      var zdd = z === null ? deckZ(xd, yd) - 0.12 : z;
      return [[xa, -ya, za], [xc, -yc, zc], [xd, -yd, zdd], [xd, yd, zdd], [xc, yc, zc], [xa, ya, za]];
    }
    var RF0 = ringF(null, -3.9, 10.5, 19.3, 2.75);
    var RF1 = ringF(9.0, -0.3, 9.5, 16.55, 2.97);
    var RF2 = ringF(ZW0, -0.3, 8.0, 12.6, 3.30);
    var RF3 = ringF(ZRF, -0.3, 7.8, 12.0, 3.10);
    B.S.add(stack(THREE, [[RF0, 0], [RF1, 0], [RF2, 0], [RF3, 0]], true, false));
    /* the 02 deckhouse between the bridge wings, abaft the diagonal. It
       stops at x -2.6: behind the after end of the wings the 2018 shot has
       sky above 12.2 m, not a 13 m wall.                                 */
    B.S.add(stack(THREE, [[chamRect(-2.6, 0.2, 4.45, 0.3), roofZ(-2.6) - 0.1],
                          [chamRect(-2.5, 0.2, 4.25, 0.3), ZRF]], true, false));
    /* and the long, lower 02 deckhouse abaft it: the lit wall standing up
       behind the boats in the 2018 and 2020 broadsides, 12.1 m to its roof
       with a rail along it, from the wings aft to x -8.4. There its roof
       ramps up to 13.0 m at x -11.0, the pedestal the davits stand on:
       the sloping edge above each boat in both shots. It stands inboard
       of the boats, 5.8 m across at the 01 roof and leaning in with the
       hull's 9 deg above that. Its width is not measured (the drone shot
       is too coarse to read it); it is what fits between the boats.     */
    var DH0 = -11.0, DH1 = -8.4, DH2 = -2.4, DHT = 12.1, DHP = 13.0;
    function dhW(z) { return 2.9 - TUMBLE * (z - roofZ(DH1)); }
    function dhTop(x) { return x >= DH1 ? DHT : lerp(DHT, DHP, (DH1 - x) / (DH1 - DH0)); }
    (function () {
      var xs = [DH0, DH1, DH2], lo = [], hi = [];
      xs.forEach(function (xx) {
        lo.push([xx, -2.9, roofZ(xx) - 0.1]); hi.push([xx, -dhW(dhTop(xx)), dhTop(xx)]);
      });
      xs.slice().reverse().forEach(function (xx) {
        lo.push([xx, 2.9, roofZ(xx) - 0.1]); hi.push([xx, dhW(dhTop(xx)), dhTop(xx)]);
      });
      B.S.add(stack(THREE, [[lo, 0], [hi, 0]], false, false));
      /* the roof: the ramp, then the flat                                  */
      panel(B.S, hi[0], hi[1], hi[4], hi[5], [0, 0, 1]);
      panel(B.S, hi[1], hi[2], hi[3], hi[4], [0, 0, 1]);
    })();
    [1, -1].forEach(function (sd) {
      railRun([[DH1, sd * (dhW(DHT) - 0.08), DHT], [DH2 - 0.2, sd * (dhW(DHT) - 0.08), DHT]]);
    });

    /* the bridge windows on the leaning band: five across the front, two
       on each corner facet, four down each side                           */
    function onBand(k, z) {
      var f = (z - ZW0) / (ZRF - ZW0);
      return [lerp(RF2[k][0], RF3[k][0], f), lerp(RF2[k][1], RF3[k][1], f)];
    }
    function faceWin(ka, kb, n, zb, zt, inset, ta, tb) {
      ta = ta || 0; tb = tb === undefined ? 1 : tb;
      for (var q = 0; q < n; q++) {
        var t0 = lerp(ta, tb, (q + 0.12) / n), t1 = lerp(ta, tb, (q + 0.88) / n), c = [], pos = [];
        [[t0, zb], [t1, zb], [t1, zt], [t0, zt]].forEach(function (tz) {
          var a = onBand(ka, tz[1]), b = onBand(kb, tz[1]);
          var ex = b[0] - a[0], ey = b[1] - a[1], el = Math.sqrt(ex * ex + ey * ey);
          c.push([lerp(a[0], b[0], tz[0]) + ey / el * inset, lerp(a[1], b[1], tz[0]) - ex / el * inset, tz[1]]);
        });
        [0, 1, 3, 1, 2, 3].forEach(function (k) { pos.push(c[k][0], c[k][1], c[k][2]); });
        var g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
        g.computeVertexNormals();
        B.G.add(g);
      }
    }
    faceWin(2, 3, 5, 11.8, 12.65, 0.05);
    faceWin(1, 2, 2, 11.8, 12.65, 0.05);
    faceWin(3, 4, 2, 11.8, 12.65, 0.05);
    faceWin(0, 1, 4, 11.9, 12.55, 0.05, 0.36, 0.98);
    faceWin(4, 5, 4, 11.9, 12.55, 0.05, 0.02, 0.64);

    /* bridge wings: a box on a raked bracket each side of the 02 deckhouse,
       x -2.6 .. +1.6 and 9.1 .. 13.3 m in the 2018 broadside, open on top
       behind a bulwark, with the 14.5 mm MTPU in it                        */
    [1, -1].forEach(function (sd) {
      B.S.add(xPrism(THREE, [[4.2, 12.1], [6.45, 12.1], [6.45, 11.25], [5.55, 9.15], [4.2, 9.15]]
        .map(function (q) { return [sd * q[0], q[1]]; }), -2.6, 1.6));
      B.S.add(box(THREE, 4.2, 0.08, 1.0, -0.5, sd * 6.41, 12.6));
      B.S.add(box(THREE, 0.08, 2.2, 1.0, 1.56, sd * 5.35, 12.6));
      B.S.add(box(THREE, 0.08, 2.2, 1.0, -2.56, sd * 5.35, 12.6));
      emit(mtpuParts(THREE), -0.4, sd * 5.6, 12.1, sd * 1.2);
    });

    /* doors in the after face of the 02 deckhouse, out onto the 01 roof;
       10 cm proud, which the naval scale leaves above one depth step     */
    [1.2, -1.2].forEach(function (yy) {
      B.K.add(box(THREE, 0.14, 0.8, 1.8, DH0 - 0.05, yy, roofZ(DH0) + 0.95));
    });

    /* ----------------------------------------------------------- the mast
       A closed pyramid on the bridge roof, 8.4 m long at the foot, 4.2 m
       high, its corners cut; a platform; the radome on a short drum.     */
    var MB = chamRect(-0.2, 8.2, 3.3, 0.9), MT = chamRect(1.5, 7.3, 2.0, 0.55);
    var ZMT = 17.2;
    B.S.add(stack(THREE, [[MB, ZRF - 0.05], [MT, ZMT]], true, false));
    function mastAt(z, grow) {
      var f = (z - (ZRF - 0.05)) / (ZMT - ZRF + 0.05);
      return MB.map(function (q, k) {
        var cx0 = 4.0, px = lerp(q[0], MT[k][0], f), py = lerp(q[1], MT[k][1], f);
        return [cx0 + (px - cx0) * grow, py * grow];
      });
    }
    /* team band round the head of the pyramid, the one place ownership
       shows from every side                                              */
    B.T.add(stack(THREE, [[mastAt(16.35, 1.03), 16.35], [mastAt(17.0, 1.03), 17.0]], false, false));
    /* antenna apertures, dark squares on the faces (Army-2016 model), 12
       cm proud of the face so the naval scale leaves them clear of it    */
    [[5.9, 1], [5.9, -1], [2.6, 1], [2.6, -1]].forEach(function (a) {
      var yy = lerp(3.3, 2.0, (14.6 - ZRF) / (ZMT - ZRF));
      B.K.add(box(THREE, 0.9, 0.16, 0.9, a[0], a[1] * (yy + 0.04), 14.6, a[1] * 0.3, 0, 0));
    });
    B.S.add(frustum(THREE, chamRect(1.1, 7.7, 2.35, 0.6), ZMT, ZMT + 0.22, 1.0));
    /* radome: 3.0 m across, top 20.3 m, as the 2018 broadside measures   */
    B.A.add(cylZ(THREE, 1.15, 1.2, 0.62, 20, 4.4, 0, ZMT + 0.22));
    B.A.add(cylZ(THREE, 1.5, 1.5, 0.72, 24, 4.4, 0, ZMT + 0.84));
    B.A.add(sphere(THREE, 1.5, 24, 7, 4.4, 0, ZMT + 1.56, true));
    /* small radome drum on the forward face, and the two navigation radar
       arrays on brackets either side                                     */
    B.A.add(cylZ(THREE, 0.42, 0.42, 0.85, 12, 8.0, 0, 16.1));
    B.S.add(box(THREE, 0.9, 0.5, 0.18, 7.75, 0, 16.0));
    [1, -1].forEach(function (sd) {
      B.S.add(box(THREE, 1.6, 1.3, 0.14, 5.6, sd * 2.95, 15.55));
      B.M.add(cylZ(THREE, 0.08, 0.08, 0.35, 6, 5.6, sd * 3.1, 15.62));
      B.K.add(box(THREE, 0.24, 2.3, 0.32, 5.6, sd * 3.1, 16.12, 0, 0, sd * 0.35));
    });
    /* The rig abaft the pyramid, off the 2018 broadside on its metre grid
       and the 2020 port-bow shot:
       - a tapered box LEG raking aft 30 deg off the back of the pyramid,
         1.2 m fore and aft at 18 m and 0.45 m at its head (21.95 m, x
         -2.1), with a web under its foot down the pyramid's back to 15.4 m;
       - the white dome on the after side of the leg's head, at 20.85 m;
       - the TOPMAST, standing VERTICAL on the leg at x -0.85: a square
         lattice to 25.3 m, then a whip to 27.1 m;
       - the main yard across it at 20.1 m, 13 m long (head-on it spans
         the ship), braced down to the leg, with gear hanging at its arms;
       - a small crosstree at 22.5 m with four dipole arrays, two little
         platforms and the antenna boxes above it.                        */
    B.S.add(stack(THREE, [
      [[[0.45, -0.28], [1.05, -0.28], [1.05, 0.28], [0.45, 0.28]], 15.4],
      [[[-0.30, -0.38], [1.45, -0.38], [1.45, 0.38], [-0.30, 0.38]], 16.9],
      [[[-0.69, -0.34], [0.48, -0.34], [0.48, 0.34], [-0.69, 0.34]], 18.0],
      [[[-2.33, -0.20], [-1.88, -0.20], [-1.88, 0.20], [-2.33, 0.20]], 21.95]
    ], true, true));
    B.A.add(sphere(THREE, 0.45, 12, 8, -2.25, 0, 20.85));
    var TMX = -0.85, ZY = 20.1;
    B.M.add(cylZ(THREE, 0.18, 0.24, 25.3 - 19.4, 4, TMX, 0, 19.4));
    B.M.add(cylZ(THREE, 0.03, 0.07, 27.1 - 25.3, 5, TMX, 0, 25.3));
    [1, -1].forEach(function (sd) {
      B.M.add(strut(THREE, TMX, 0, ZY, TMX, sd * 6.5, ZY, 0.11, 6, 0.06));
      B.M.add(strut(THREE, TMX, sd * 3.3, ZY, -0.35, sd * 0.3, 18.8, 0.04, 4));
      [6.35, 4.4].forEach(function (yy) {
        B.K.add(cylZ(THREE, 0.06, 0.06, 0.6, 4, TMX, sd * yy, ZY - 0.62));
      });
    });
    B.M.add(strut(THREE, TMX - 1.0, 0, 22.5, TMX + 1.0, 0, 22.5, 0.04, 4));
    B.M.add(strut(THREE, TMX, -1.0, 22.5, TMX, 1.0, 22.5, 0.04, 4));
    [[0.95, 0], [-0.95, 0], [0, 0.95], [0, -0.95]].forEach(function (d) {
      B.W.add(cylZ(THREE, 0.05, 0.05, 1.0, 4, TMX + d[0], d[1], 22.5));
    });
    [24.0, 25.0].forEach(function (zz) {
      B.M.add(box(THREE, 0.8, 0.8, 0.08, TMX, 0, zz));
    });
    [1, -1].forEach(function (sd) {
      B.K.add(box(THREE, 0.18, 0.42, 0.5, TMX + 0.1, sd * 0.3, 24.4));
    });

    /* electro-optical spheres on pedestals at the forward corners of the
       bridge roof (both broadsides, the drone shot)                       */
    [1, -1].forEach(function (sd) {
      B.S.add(cylZ(THREE, 0.2, 0.26, 0.95, 8, 10.2, sd * 3.3, ZRF));
      B.A.add(sphere(THREE, 0.62, 12, 8, 10.2, sd * 3.3, ZRF + 1.45));
    });
    /* equipment boxes on the roof abaft the mast                          */
    B.S.add(box(THREE, 1.8, 1.4, 0.8, -1.4, 1.7, ZRF + 0.4));
    B.S.add(box(THREE, 1.2, 1.1, 0.6, -1.6, -2.0, ZRF + 0.3));

    /* ------------------------------------------------- the 01 deck roof
       The two rigid inflatables sit on chocks on the roof outboard of the
       02 deckhouse, x -13.3 .. -5.0 and 8.7 .. 10.1 m up in the 2018
       broadside: 8.3 m boats. Each davit is a box beam standing on the
       deckhouse's ramp and leaning aft (and a little outboard) to its head
       at 17.85 m, x -12.0, with a 2.4 m jib pointing FORWARD over the boat
       (both broadsides, the port-bow shot; the second beam behind the
       first in the 2018 shot is the port davit, in perspective). Beside
       each foot a white radome on a short post, 13.4 to 15.0 m. Two whips
       further aft. Everything here stands on the sloping roof.           */
    var SL = Math.atan((roofZ(1.0) - roofZ(-21.6)) / 22.6);          /* roof pitch */
    function onRoof(g, x0) { g.rotateY(-SL); g.translate(0, 0, roofZ(x0)); return g; }
    var BOAT_L = 8.3, BOAT_X = -13.3, BOAT_Y = 4.3;
    [1, -1].forEach(function (sd) {
      emit(rhibParts(THREE, BOAT_L), BOAT_X, sd * BOAT_Y, roofZ(-9.2) + 0.18, 0, sd < 0);
      B.M.add(box(THREE, 0.3, 1.9, 0.34, -11.4, sd * BOAT_Y, roofZ(-11.4) + 0.12));
      B.M.add(box(THREE, 0.3, 1.9, 0.34, -6.9, sd * BOAT_Y, roofZ(-6.9) + 0.12));
      /* the davit: a tapered box beam, 0.9 m fore and aft at its foot and
         0.35 m at the head, and the jib forward to the hook over the boat */
      B.S.add(stack(THREE, [
        [[[-11.2, sd * 1.45], [-10.3, sd * 1.45], [-10.3, sd * 1.95], [-11.2, sd * 1.95]], dhTop(-10.75) - 0.3],
        [[[-12.15, sd * 3.25], [-11.8, sd * 3.25], [-11.8, sd * 3.55], [-12.15, sd * 3.55]], 17.9]
      ], true, false));
      B.M.add(strut(THREE, -12.0, sd * 3.4, 17.8, -9.6, sd * 4.2, 17.75, 0.09, 5, 0.06));
      B.K.add(box(THREE, 0.22, 0.18, 0.35, -9.65, sd * 4.2, 17.52));
      /* the radome on its post beside the davit foot                      */
      B.M.add(cylZ(THREE, 0.16, 0.2, 13.35 - dhTop(-10.2) + 0.1, 6, -10.2, sd * 2.1, dhTop(-10.2) - 0.1));
      B.K.add(cylZ(THREE, 0.45, 0.45, 0.16, 10, -10.2, sd * 2.1, 13.3));
      B.A.add(cylZ(THREE, 0.58, 0.58, 0.95, 10, -10.2, sd * 2.1, 13.45));
      B.A.add(sphere(THREE, 0.58, 10, 4, -10.2, sd * 2.1, 14.4, true));
      /* whips, raked aft                                                   */
      B.M.add(strut(THREE, -20.8, sd * 4.6, roofZ(-20.8), -21.8, sd * 4.7, roofZ(-20.8) + 7.2, 0.05, 4, 0.02));
      B.M.add(strut(THREE, -15.8, sd * 4.7, roofZ(-15.8), -16.7, sd * 4.8, roofZ(-15.8) + 7.0, 0.05, 4, 0.02));
      /* team flashes, flat on the roof where the camera looks. Rooted in
         the roof and standing 13 cm proud of it: scaled by about 0.63 in
         game, anything closer is under one depth step at full zoom-out   */
      B.T.add(onRoof(box(THREE, 6.2, 2.0, 0.20, 0, sd * 2.2, 0.03), -18.0).translate(-18.0, 0, 0));
      /* MANPADS posts at the after corners of the 01 roof (brochure)       */
      B.M.add(cylZ(THREE, 0.1, 0.14, 0.9, 6, -20.4, sd * 3.9, roofZ(-20.4)));
    });
    /* hand rails along both edges of the 01 roof (2018 broadside), and
       round the platform at the head of the pyramid                       */
    [1, -1].forEach(function (sd) {
      railRun([[-21.4, sd * (w01(-21.4, 1) - 0.1), roofZ(-21.4)],
               [-4.2, sd * (w01(-4.2, 1) - 0.1), roofZ(-4.2)]]);
    });
    var PR = chamRect(1.2, 7.6, 2.25, 0.55).map(function (q) { return [q[0], q[1], ZMT + 0.22]; });
    railRun(PR.concat([PR[0]]));
    /* ventilation trunk and a hatch on the 01 roof                         */
    B.S.add(onRoof(box(THREE, 2.2, 1.8, 0.9, 0, 0, 0.42), -14.2).translate(-14.2, 0, 0));
    B.K.add(onRoof(box(THREE, 1.0, 1.0, 0.14, 0, 0, 0.05), -19.0).translate(-19.0, 0, 0));

    /* ------------------------------------------------------ the aft deck
       Raft racks either side just abaft the 01 deck, two canisters to a
       rack; bollards; the rails round the deck edge.                     */
    [1, -1].forEach(function (sd) {
      [-28.6, -25.3].forEach(function (rx) {
        var zb = deckZ(rx, 5.6);
        B.M.add(box(THREE, 1.6, 1.6, 0.12, rx, sd * 5.35, zb + 0.18));
        [5.0, 5.72].forEach(function (yy) {
          B.W.add(strut(THREE, rx - 0.7, sd * yy, zb + 0.62, rx + 0.7, sd * yy, zb + 0.62, 0.34, 10));
        });
      });
    });
    function bollard(bx, by) {
      var z0 = deckZ(bx, by);
      B.M.add(cylZ(THREE, 0.16, 0.16, 0.45, 6, bx - 0.28, by, z0));
      B.M.add(cylZ(THREE, 0.16, 0.16, 0.45, 6, bx + 0.28, by, z0));
    }
    [[-44.6, 5.7], [-35.2, 5.8], [15.8, 5.2], [33.0, 3.8], [41.2, 1.9]].forEach(function (b) {
      bollard(b[0], b[1]); bollard(b[0], -b[1]);
    });
    /* windlass drums over the chain pipes                                  */
    [1.25, -1.25].forEach(function (yy) {
      B.M.add(cylZ(THREE, 0.34, 0.38, 0.55, 10, 37.4, yy, deckZ(37.4, yy)));
    });
    /* jackstaff at the stem head                                           */
    B.M.add(strut(THREE, 45.9, 0, deckZ(45.9, 0), 45.8, 0, 10.2, 0.06, 5, 0.035));

    /* rails: top and middle rail along the deck edge, stanchions every 2.5 m.
       Forecastle from abreast the front slope to the jackstaff; the after
       deck from the 01 deck to the transom and across it.                */
    function railRun(pts) {
      var k, carry = 0;
      function post(px, py, pz) { B.M.add(strut(THREE, px, py, pz, px, py, pz + 1.1, 0.03, 4)); }
      for (k = 0; k < pts.length - 1; k++) {
        var a = pts[k], b = pts[k + 1];
        var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
        var len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        [1.1, 0.55].forEach(function (h) {
          B.M.add(strut(THREE, a[0], a[1], a[2] + h, b[0], b[1], b[2] + h, 0.03, 4));
        });
        var t = carry;
        for (; t < len; t += 2.5) post(lerp(a[0], b[0], t / len), lerp(a[1], b[1], t / len), lerp(a[2], b[2], t / len));
        carry = t - len;
      }
      var e = pts[pts.length - 1];
      post(e[0], e[1], e[2]);
    }
    [1, -1].forEach(function (sd) {
      var fwd = [], aft = [];
      for (x = 13.0; x <= 45.6; x += 2.9) fwd.push([x, sd * (yDeck(x) - 0.08), zD(x)]);
      fwd.push([45.6, sd * (yDeck(45.6) - 0.05), zD(45.6)]);
      railRun(fwd);
      for (x = -23.4; x >= -46.8; x -= 4.0) aft.push([x, sd * (yDeck(x) - 0.08), zD(x)]);
      aft.push([-46.85, sd * (yDeck(-46.85) - 0.08), zD(-46.85)]);
      railRun(aft);
    });
    railRun([[-46.85, yDeck(-46.85) - 0.08, zD(-46.85)], [-46.85, 0, zD(-46.85) + CAMBER],
             [-46.85, -(yDeck(-46.85) - 0.08), zD(-46.85)]]);

    /* ----------------------------------------------------------- the gun
       The plinth is part of the deck: a low faceted raft 0.35 m proud of
       the forecastle, sloping to the deck ahead of the house, painted in
       the deck colour (dark in every photograph).                         */
    var GX = GUN_X, GZ = deckZ(GX, 0) + 0.34;
    B.D.add(planUV(stack(THREE, [[chamRect(24.9, 33.6, 1.85, 0.6), GZ - 0.6],
                                 [chamRect(25.3, 31.0, 1.65, 0.5), GZ]], true, false)));
    var tur = new THREE.Group();
    tur.name = "turret";
    tur.position.set(GX, 0, GZ);
    var tb = {};
    gunParts(THREE).forEach(function (pp) {
      if (!tb[pp[0]]) tb[pp[0]] = new Batch(pp[0] === "S" ? 8 : 0);
      tb[pp[0]].add(pp[1]);
    });
    Object.keys(tb).forEach(function (k) { var mm = tb[k].mesh(THREE, T[k]); if (mm) tur.add(mm); });
    root.add(tur);

    /* ------------------------------------------------ out as one mesh each */
    Object.keys(B).forEach(function (k) {
      var mm = B[k].mesh(THREE, T[k]);
      if (mm) root.add(mm);
    });
    root.userData.heroLen = LOA;
    return root;
  }

  return { build: build, len: LOA };
})();

/* Registration. corvette_p is the def itself (rules.js, PACT e20); nothing
   else resolves to this key. len is the measured X extent, transom to stem
   head: nothing is proud of either end.                                   */
UNIT_MODELS["corvette_p"] = {
  len: 94.0,
  build: function (THREE, M, C) { return HeroBykov22160.build(THREE, M, C); }
};
