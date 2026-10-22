/* ============================================================================
   fra_lhd_mistral.js -- HERO model: the Mistral class, Mistral (L9013),
   Tonnerre (L9014) and Dixmude (L9015): BPC from 2006, PHA from 2019.
   Registered as fra_e00_lhd (the 2000s BPC) and lhd_f (the 2020s PHA). One
   build(): no reference read shows a change of hull, island or deck between
   the two periods, so none is drawn.

   References, named so the next person can check them (Wikimedia Commons):
     - "Tonnerre L9014.svg" and "Tonnerre-outlines.svg": the starboard
       profile, bow right, measured on a metre grid at 5.633 px/m (the hull
       1,121 px for 199 m). Its bottom line is the WATERLINE (no bulb shows,
       and the Tonnerre broadside below gives the same 0.109 freeboard to
       length): flight deck 21.8 m above the water. Off it: the stem rake,
       the flare knuckle running from z 10 at x +50 up to the deck at the
       bow, the island's tiers (low casing x -28..+48 to 25.1 m, main block
       -6.5..+22 to 34.0, bridge block +22..+40.5 to 37.4 with the glazed
       bridge leaning out at 31.6-35.3), the tall after mast (x 10-14, to
       47.5, lattice to 56), the forward mast (x 29-33, to 46.5), the dome
       on legs aft, the tilted grille, the forward radome, the deck-edge
       crane at x -45, and every opening and window of the starboard side.
     - "French amphibious assault ship Dixmude (L9015) underway off Cadiz in
       May 2015" (US Navy): the high port-bow overhead. Rectified through a
       homography on the deck's four corners: the TWO LIFTS - a yellow-
       hatched lift at the stern a little to port, x -99.5..-88.5, and the
       central lift abaft the island, x -59..-43, y -15.2..-6.8 (both
       +- 3 m) - the six spots (the end ones 2-3 m to starboard, four on a
       line 5 m to port), the island's inboard face, the deck-edge
       recesses on the port edge, the bow's mooring recess.
     - "French amphibious assault ship Tonnerre (L9014) underway with USS
       Monterey (CG-61) on 23 January 2018": the same two lift markings.
     - "Mistral aout2005 leger" (port side, moored): the island's port face,
       both masts, the big SATCOM dome and the small one on its bracket, the
       after FLYCO tower with its windows, the port hull's windows and the
       bow fairleads, the bow's light upper face over the dark flare.
     - "French amphibious assault ship Mistral (L9013) underway in the
       Mediterranean Sea on 24 June 2020" and "Tonnerre (L9014) underway on
       10 June 2020": the bow, the flare, the island from forward.
     - Mistral at Toulon, stern quarter (Commons, cached as r2): the flat
       transom, the ribbed STERN GATE low on the centreline with the dark
       slot of the well over it (15.6 m wide, to 8.5 m), and the aft lift's
       open trunk under the deck edge (15.8 m wide, 7 m deep).
     - Dixmude stern quarter (port) and the well interior photograph (two
       CTM in the well, wooden floor, walkways along both walls).
     - "MV-22B Osprey lands on BPC Dixmude 150705-N-MD297-044": the island's
       port face close to, and the red-and-white line on the deck along it.
   Published figures (en.wikipedia "Mistral-class amphibious assault ship"):
   199 m overall, 32 m beam, 6.3 m draught, six deck spots, two aircraft
   lifts, a well deck 57.5 x 15.4 m for four CTM, two Mermaid azimuth pods.

   RECOGNITION LIST (what has to read at game zoom, and where it comes from)
     1. A tall, wall-sided BOX HULL, flight deck 21.8 m over the water and
        the full 32 m beam, square at the stern (drawing, Tonnerre broadside).
     2. The FLARED BOW: a knuckle rising from mid-height to the deck corners
        and sweeping across the bow to the stem at 15 m, a light cap over a
        dark V flare, the open mooring gallery under the deck's forward end,
        a raked stem, the BULBOUS forefoot under water (drawing, 2005 and
        2020 photographs, overhead).
     3. The ISLAND forward of midships on the starboard edge, x -28..+48,
        stepped: low casing, main block, bridge block (drawing, overhead).
     4. The glazed BRIDGE leaning out at the island's fore end, two window
        rows round its front, the top level overhanging both sides (drawing,
        2005 and 2020 photographs).
     5. The tall tapered after MAST with a swept yard and a lattice top,
        the shorter forward mast with its swept radar platform (drawing,
        every photograph).
     6. The white RADOMES: the big SATCOM dome by the forward mast, a small
        one on its bracket, the dome on legs aft (drawing, 2005 photograph).
     7. TWO LIFTS: the yellow-hatched stern lift, a little to port, and the
        central lift abaft the island (overhead, both aerials).
     8. The STERN: flat transom, ribbed well gate low on the centreline with
        the well's slot over it, the open trunk of the aft lift under the
        deck edge (stern photographs).
     9. Six SPOTS: white rings with numbers on a line 5 m to port, the end
        spots just to starboard of the centreline (rectified overhead).
    10. The deck-edge CRANE abaft the island (drawing, overhead).
    11. The two big SIDE OPENINGS aft and the window groups of the hull
        sides (drawing, both broadsides).
    12. Marine nationale light grey all over, a darker grey deck.

   NOT confirmed, and so approximate or left out:
     - the lift sizes and places (+- 3 m, from one oblique overhead, the
       central lift half in the island's shadow); the stern photograph puts
       the aft trunk's middle 1-2 m to port, the overhead 3-5 m: taken at
       +1.5. The lifts are drawn flush, as painted outlines with joints;
     - the well: 57.5 x 15.4 m is en.wikipedia's (885 m2), not re-read on a
       plan; the stern photograph's 15.6 m opening agrees. Its floor 0.5 m
       and deckhead 8.6 m, and the gate's 5.8 m, are read off that
       photograph at about 13 px/m (+- 0.5 m);
     - the big SATCOM dome and the FLYCO tower are in every photograph but
       not in the drawing; they are placed from the photographs (+- 2 m);
     - the Simbad launchers and the 12.7 mm mounts: no photograph read
       resolves where they stand. Only the drawing's pedestal with a ball
       head on the island's forward roof is drawn, as drawn;
     - the radars' identities: the shapes are the drawing's (a bar on the
       forward mast's platform, a planar array at the after mast's top);
     - the tilted slatted grille aft of the after mast is drawn as the
       drawing shows it, its purpose unknown;
     - the port side's windows are placed from the 2005 photograph through a
       perspective fit (+- 3 m); the starboard side's are the drawing's;
     - the underwater body: the pods' shape is generic, the bulb's size
       estimated; no drydock photograph was read.
   No hull number, name or ensign is drawn.

   THE WELL GATE OPENS. "wellgate" is its own Object3D in a holder turned
   PI about Z, origin on the hinge at the gate's bottom inner edge, rotation
   zero when shut; rotation.y +1.45 swings it out aft and down to nearly
   flat. Behind it the well is a cavity 15.4 m wide, 57.5 m long, floor
   0.5 m above the water, deckhead 8.6 m. root.userData.wellExit is the sill
   (x -99.5, the transom: the gate stands in its plane), wellInner the
   berth mid-well, x -70.75.

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0, keel -6.3,
   flight deck +21.8. X extent 199 m exactly, transom -99.5 to the bow end
   of the deck +99.5: nothing reaches past either with the gate shut. Every
   static part is merged into one mesh per material. Nothing is named
   "turret". The team colour is exactly C.team: a thin flash across each
   end of the deck and a band round the head of the island's main block.
   ASCII only.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMistralLHD = (function () {
  "use strict";
  var PI = Math.PI;

  /* ---------------------------------------------------- principal dimensions */
  var LOA    = 199.0;
  var XB     = 99.5;               /* bow end of the flight deck                */
  var XS     = -99.5;              /* transom                                   */
  var FD_TOP = 21.8;               /* drawing: 21.5 aft .. 22.0 fwd at the edge */
  var FD_TH  = 1.0;
  var FD_BOT = FD_TOP - FD_TH;     /* 20.8: top of the hull loft                 */
  var KEEL   = -6.3;               /* published draught                         */
  var DHW    = 16.0;               /* 32 m beam, the deck as wide as the hull   */
  var HX0 = -99.5, HX1 = 99.5;     /* hull texture span                         */

  /* the well: floor, deckhead, half-width, forward end (57.5 m from the sill) */
  var WZ0 = 0.5, WZ1 = 8.6, WHW = 7.7, WX1 = XS + 57.5;
  var GATE_H = 5.8, GATE_HW = 7.62;
  /* the aft lift and its trunk, open to the stern under the deck edge: the
     stern photograph puts the opening's middle 1-2 m to port, the rectified
     overhead the lift's 3-5 m to port; taken at +1.5                       */
  var AL = { x0: XS, x1: -88.5, yc: 1.5, hw: 7.8, z0: 14.2 };
  /* the central lift abaft the island (overhead, rectified)                */
  var CL = { x0: -59.0, x1: -43.0, y0: -15.2, y1: -6.8 };

  /* flight deck plan, counter-clockwise: square at the stern, the bow's
     corners cut away (overhead, 2020 bow quarter)                         */
  var DECK = [
    [XS, -DHW], [96.5, -DHW], [98.6, -14.6], [XB, -12.5],
    [XB, 12.5], [98.6, 14.6], [96.5, DHW], [XS, DHW]
  ];

  /* ------------------------------------------- the island, plan (y < 0)
     Stations off the drawing; the inboard faces off the overhead.          */
  var Z0 = FD_TOP;
  var ISL = {
    aft:   [[-28.0, -16.0], [-28.0, -10.0], [-26.5, -8.8], [-6.5, -8.8], [-6.5, -16.0]],
    main:  [[-6.5, -16.0], [-6.5, -5.6], [22.2, -5.6], [22.2, -16.0]],
    brg:   [[22.2, -16.0], [22.2, -5.4], [39.2, -5.4], [40.5, -6.8], [40.5, -16.0]],
    fwd:   [[40.5, -16.0], [40.5, -7.4], [45.0, -7.4], [47.8, -10.4], [47.8, -16.0]]
  };

  /* ================================================================ helpers */
  function rngOf(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hx(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
  function mkCv(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function finish(THREE, cv) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  /* linear interpolation in a table of [x, v], clamped at both ends        */
  function tbl(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) {
      if (x <= T[i][0]) return lerp(T[i - 1][1], T[i][1], (x - T[i - 1][0]) / (T[i][0] - T[i - 1][0]));
    }
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
  /* a closed frustum on a convex plan: the outline at zb, the same outline
     scaled by sTop about its centroid at zt. UVs in metres / 16.           */
  function frustum(THREE, pts, zb, zt, sBot, sTop, noCaps) {
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
    for (i = 1; i < n - 1 && !noCaps; i++) {
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
  /* an outline in the XZ plane ([x, z]) given th of thickness across Y      */
  function vplate(THREE, pts, th) {
    var g = frustum(THREE, pts, -th * 0.5, th * 0.5, 1, 1);
    g.rotateX(PI / 2);
    return g;
  }
  function rect(x0, x1, y0, y1) { return [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]; }
  /* one quad, a-b-c-d counter-clockwise seen from its front, with UVs      */
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

  /* ================================================================== hull
     A STATION LOFT. Each station is a section from the keel to the deck
     edge with a fixed number of points, so the bilge, the waterline and
     the flare KNUCKLE run as edges along the ship:
       keel line   ZB_AFT (the run lifting to the transom's foot 1 m under
                   the water, for the pods) and STEM (forefoot and the raked
                   stem, off the drawing's profile);
       waterline   HWL, wall-sided at the full 32 m from the transom to
                   x +42, then the fine entrance to the stem at x +87;
       knuckle     KN, off the drawing: z 9.8 aft of x +45 (where the side
                   is plumb and it is only a strake), rising to 19 m at the
                   bow; between the waterline and the knuckle the side
                   flares out ever harder toward the top;
       upper side  plumb from the knuckle to the deck at the deck's own
                   half-breadth, the bow corners cut as the deck's are; cut
                   down at the bow to 19.4 m for the open mooring deck.    */
  var ZB_AFT = [[-99.5, -1.0], [-95.0, -1.9], [-88.0, -3.3], [-80.0, -4.6], [-72.0, -5.6], [-64.0, -6.2], [-58.0, -6.3]];
  var STEM = [[78.0, -6.3], [81.5, -5.6], [84.0, -4.5], [85.6, -3.0], [86.5, -1.5], [87.0, 0.0],
              [90.6, 5.0], [94.0, 10.0], [97.3, 15.0], [98.4, 18.5]];
  var HWL = [[-99.5, 15.7], [-92.0, 16.0], [44.0, 16.0], [50.0, 15.8], [60.0, 15.0], [70.0, 13.4],
             [78.0, 10.6], [83.0, 7.2], [86.0, 4.0], [87.0, 1.2], [99.0, 0.0]];
  var KN = [[-99.5, 9.8], [45.0, 9.8], [50.0, 10.0], [55.0, 11.5], [60.0, 12.8], [65.0, 14.0], [70.0, 15.2],
            [75.0, 16.3], [80.0, 17.2], [85.0, 18.0], [90.0, 18.4], [99.0, 18.4]];
  /* THE BOW CAP (2020 bow photographs): forward of x 90 the side knuckle
     turns inboard and down across the bow to the stem at z 15, x 97.3, a
     crease under a broad light face that rises to the open mooring gallery
     under the deck's forward end                                           */
  var CAP_X0 = 90.0, CAP_X1 = 97.3, CAP_Z = 15.0;
  function zbOf(x) { return x < -58.0 ? tbl(ZB_AFT, x) : x < 78.0 ? KEEL : tbl(STEM, x); }
  function hkOf(x) { return x <= 96.0 ? DHW : lerp(DHW, 12.8, clamp((x - 96.0) / 3.0, 0, 1)); }
  function ztOf(x) { return x <= 87.0 ? FD_BOT : lerp(FD_BOT, 18.8, clamp((x - 87.0) / 4.0, 0, 1)); }
  function sec(x) {
    var zb = zbOf(x), hwl = tbl(HWL, x), hk = hkOf(x), zt = ztOf(x);
    var zk = Math.min(tbl(KN, x), zt - 0.3);
    var P = [], k;
    if (zb < -0.05) {
      var R = Math.min(2.8, Math.max(0.35, -zb * 0.55));
      var ext = x > 60.0 ? (x - 60.0) / 25.0 * 4.5 : 0;
      var hf = clamp(hwl - R - ext, 0, 13.2);
      R = Math.min(R, Math.max(0.2, hwl - hf));
      P.push([0, zb], [hf * 0.5, zb], [hf, zb]);
      for (k = 1; k <= 5; k++) {
        var a = k * PI / 10;
        P.push([hf + R * Math.sin(a), zb + R - R * Math.cos(a)]);
      }
      var b = P[P.length - 1];
      P.push([lerp(b[0], hwl, 0.5), b[1] * 0.5]);
      P.push([hwl, 0]);
    } else {
      for (k = 0; k < 10; k++) P.push([0, Math.max(zb, 0)]);
    }
    var w0 = P[P.length - 1];
    /* the crease: the side knuckle aft of CAP_X0, sweeping in across the
       bow to the stem forward of it                                        */
    var yc = hk, zc = zk;
    if (x > CAP_X0) {
      var f = clamp((x - CAP_X0) / (CAP_X1 - CAP_X0), 0, 1);
      yc = hk * Math.pow(1 - f, 0.7);
      zc = x >= CAP_X1 ? Math.max(zb, CAP_Z) : lerp(zk, CAP_Z, f);
      if (zc < w0[1] + 0.2) zc = w0[1] + 0.2;
    }
    /* the flare, hardening toward the top                                  */
    [0.2, 0.4, 0.6, 0.8].forEach(function (t) {
      P.push([w0[0] + (yc - w0[0]) * Math.pow(t, 1.25), w0[1] + (zc - w0[1]) * t]);
    });
    /* over the crease: the plumb side aft, the cap forward, a little full  */
    P.push([yc, zc], [yc + (hk - yc) * 0.72, zc + (zt - zc) * 0.5], [hk, zt]);
    return P;
  }
  /* the hull's half-breadth at (x, z), for fittings on the side          */
  function sideY(x, z) {
    var P = sec(x), k;
    for (k = 1; k < P.length; k++) {
      if (z <= P[k][1] && P[k][1] > P[k - 1][1]) {
        var t = (z - P[k - 1][1]) / Math.max(1e-6, P[k][1] - P[k - 1][1]);
        return lerp(P[k - 1][0], P[k][0], clamp(t, 0, 1));
      }
    }
    return P[P.length - 1][0];
  }
  function ringOf(x) {
    var P = sec(x), r = [[0, P[P.length - 1][1]]], j;
    for (j = P.length - 1; j >= 0; j--) r.push([P[j][0], P[j][1]]);
    for (j = 1; j < P.length; j++) r.push([-P[j][0], P[j][1]]);
    return r;
  }
  var STATIONS = [-99.5, -97.0, -94.0, -90.0, -86.0, -82.0, -78.0, -74.0, -70.0, -66.0, -62.0, -58.0,
                  -50.0, -40.0, -30.0, -20.0, -10.0, 0.0, 10.0, 20.0, 30.0, 40.0, 45.0, 50.0, 55.0, 58.0,
                  61.0, 64.0, 66.0, 68.0, 70.0, 72.0, 74.0, 76.0, 78.0, 79.0, 80.0, 81.0, 82.0, 83.0, 84.0,
                  85.0, 85.6, 86.1, 86.5, 87.0, 87.5, 88.0, 88.8, 89.5, 90.2, 91.0, 91.8, 92.5, 93.2, 94.0,
                  94.8, 95.5, 96.0, 96.5, 97.0, 97.3, 97.7, 98.0, 98.4];

  function hullGeo(THREE) {
    var st = STATIONS, rings = st.map(ringOf), nR = rings[0].length, i, j;
    var OUT = { top: { pos: [], nrm: [], uv: [] }, bot: { pos: [], nrm: [], uv: [] } };
    function V(ii, jj) { var q = rings[ii][jj % nR]; return [st[ii], q[0], q[1]]; }
    function K(ii, jj) { return ii * nR + (jj % nR); }
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
    /* j 0 and nR-1 would close the top under the deck plate: left open    */
    for (i = 0; i < st.length - 1; i++) {
      for (j = 1; j < nR - 1; j++) {
        tri(V(i, j), V(i + 1, j), V(i, j + 1), K(i, j), K(i + 1, j), K(i, j + 1));
        tri(V(i, j + 1), V(i + 1, j), V(i + 1, j + 1), K(i, j + 1), K(i + 1, j), K(i + 1, j + 1));
      }
    }
    /* the bow's last sliver closed by a fan; the transom is built apart,
       with its openings                                                    */
    var e = st.length - 1, r0 = rings[e], cyy = 0, czz = 0;
    for (j = 0; j < nR; j++) { cyy += r0[j][0]; czz += r0[j][1]; }
    var C = [st[e], cyy / nR, czz / nR];
    for (j = 0; j < nR; j++) tri(C, V(e, j + 1), V(e, j), -9, -20 - ((j + 1) % nR), -20 - j);
    var around = {}, COS = Math.cos(30 * PI / 180);
    faces.forEach(function (f, fi) { f.k.forEach(function (k) { (around[k] || (around[k] = [])).push(fi); }); });
    faces.forEach(function (f) {
      var cz = (f.p[0][2] + f.p[1][2] + f.p[2][2]) / 3, cy = (f.p[0][1] + f.p[1][1] + f.p[2][1]) / 3;
      var o = cz >= 0 ? OUT.top : OUT.bot, port = cy >= 0;
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
        var u = (q[0] - HX0) / (HX1 - HX0);
        if (o === OUT.top) {
          var vz = clamp(q[2] / FD_BOT, 0, 1);
          o.uv.push(u, port ? 0.004 + 0.492 * vz : 0.504 + 0.492 * vz);
        } else {
          o.uv.push(u, clamp((q[2] - KEEL) / -KEEL, 0, 1));
        }
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

  /* the transom: the stern station's outline as a flat plate, with the
     well's opening (15.4 m to 8.6 m) and the aft lift's trunk (15.8 m wide,
     14.2 m to just under the deck edge) cut out of it                      */
  function transomGeo(THREE) {
    var r = ringOf(XS), s = new THREE.Shape(), i;
    /* shape coordinates (a, b) = (z, y): rotated into the plane x = XS
       facing aft                                                           */
    s.moveTo(r[0][1], r[0][0]);
    for (i = 1; i < r.length; i++) s.lineTo(r[i][1], r[i][0]);
    s.closePath();
    function hole(z0, z1, y0, y1) {
      var h = new THREE.Path();
      h.moveTo(z0, y0); h.lineTo(z1, y0); h.lineTo(z1, y1); h.lineTo(z0, y1); h.closePath();
      s.holes.push(h);
    }
    hole(WZ0, WZ1, -WHW, WHW);
    hole(AL.z0, FD_BOT - 0.35, AL.yc - AL.hw, AL.yc + AL.hw);
    var g = new THREE.ShapeGeometry(s, 1);
    g.rotateY(-PI / 2);
    g.translate(XS, 0, 0);
    var P = g.getAttribute("position"), U = g.getAttribute("uv");
    for (i = 0; i < P.count; i++) U.setXY(i, P.getY(i) / 16, P.getZ(i) / 16);
    return g;
  }

  /* ============================================================= textures
     Marine nationale light grey, the photographs' level taken down to 0.9:
     this renderer's ACES pass lifts mid greys (pla_e00_destroyer.js
     measured 1.8x), and at full level the ship would render near white.
     She stays lighter than the US flat-tops' 0x737a81, as photographed.  */
  var PAINT = { hull: 0x80868c, sup: 0x878d93, deck: 0x5a5e62 };

  /* hull sides: one canvas, two bands - the starboard side in the upper
     band (v 0.5..1), the port side in the lower (v 0..0.5); each band runs
     the waterline (bottom) to the deck (top), x -99.5 .. 99.5 across.     */
  function hullTex(THREE) {
    var W = 2048, H = 512, BH = 256, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(9013), i, x, y, len, gr;
    var PXX = W / (HX1 - HX0), PXZ = (BH - 4) / FD_BOT;
    function colX(xx) { return (xx - HX0) * PXX; }
    /* band 0 = starboard (rows 0..255), band 1 = port (rows 256..511)       */
    function rowZ(b, zz) { return b * BH + 2 + (FD_BOT - zz) * PXZ; }
    function rr(b, x0, x1, z0, z1, col) {
      g.fillStyle = col;
      g.fillRect(colX(x0), rowZ(b, z1), (x1 - x0) * PXX, (z1 - z0) * PXZ);
    }
    g.fillStyle = hx(PAINT.hull); g.fillRect(0, 0, W, H);
    for (i = 0; i < 360; i++) {
      g.globalAlpha = 0.03 + R() * 0.045;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 40 + R() * 260, 3 + R() * 12);
    }
    g.globalAlpha = 1;
    for (var b = 0; b < 2; b++) {
      /* plating seams and frames                                           */
      g.strokeStyle = "rgba(0,0,0,0.16)"; g.lineWidth = 1.2;
      for (i = 1; i < 80; i++) {
        x = i * W / 80 + (R() - 0.5) * 3;
        g.beginPath(); g.moveTo(x, b * BH); g.lineTo(x, b * BH + BH); g.stroke();
      }
      for (var zz = 2.4; zz < FD_BOT; zz += 2.4) {
        y = rowZ(b, zz); g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
      }
      /* the strake along z 9.6 the drawing shows the whole length          */
      g.strokeStyle = "rgba(255,255,255,0.20)"; g.lineWidth = 2;
      y = rowZ(b, 9.65); g.beginPath(); g.moveTo(0, y); g.lineTo(colX(50), y); g.stroke();
      g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 1.5;
      y = rowZ(b, 9.4); g.beginPath(); g.moveTo(0, y); g.lineTo(colX(50), y); g.stroke();
      /* the deck edge's shadow and the waterline's grime                    */
      g.fillStyle = "rgba(20,24,28,0.28)"; g.fillRect(0, rowZ(b, FD_BOT), W, 0.8 * PXZ);
      g.fillStyle = "rgba(40,44,40,0.30)"; g.fillRect(0, rowZ(b, 0.6), W, 0.6 * PXZ);
      /* rust weeping from the scuppers and fairleads                        */
      for (i = 0; i < 70; i++) {
        x = R() * W; y = rowZ(b, 4 + R() * 15); len = (2 + R() * 5) * PXZ;
        gr = g.createLinearGradient(0, y, 0, y + len);
        gr.addColorStop(0, "rgba(96,64,44,0.28)"); gr.addColorStop(1, "rgba(96,64,44,0)");
        g.fillStyle = gr; g.fillRect(x, y, 1.5 + R() * 2.5, len);
      }
    }
    var DK = "rgba(18,21,24,0.92)", PN = "rgba(66,72,78,0.85)", WH = "#e4e7e9";
    /* --------------- starboard, off the drawing (x0, x1, z0, z1)          */
    [[-96.3, -94.6, 7.7, 9.2], [-93.6, -91.9, 7.7, 9.2], [-91.0, -89.3, 7.7, 9.2], [-88.6, -86.8, 7.7, 9.2],
     [-78.2, -69.1, 5.4, 9.3], [-67.9, -58.6, 5.4, 9.3], [-81.0, -79.0, 5.0, 7.8],
     [11.8, 18.9, 16.0, 20.6], [20.0, 28.0, 6.4, 8.5],
     [12.0, 13.8, 11.7, 12.4], [17.3, 19.8, 11.5, 12.2], [38.6, 39.7, 11.5, 12.6], [38.3, 39.3, 11.3, 12.3]
    ].forEach(function (o) { rr(0, o[0], o[1], o[2], o[3], DK); });
    [[-88.8, -86.6, 10.1, 14.0], [-83.6, -81.3, 10.1, 14.0], [-38.0, -36.0, 15.9, 18.4], [-35.4, -33.4, 15.9, 18.4],
     [-20.5, -18.2, 11.7, 14.6], [-8.1, -6.1, 10.7, 15.1], [2.4, 11.1, 18.8, 20.7]
    ].forEach(function (o) { rr(0, o[0], o[1], o[2], o[3], PN); });
    for (i = 0; i < 6; i++) rr(0, -35.0 + i * 2.55, -33.8 + i * 2.55, 12.6, 14.0, PN);
    [[19.8, 22.5], [22.6, 25.2], [25.4, 27.9]].forEach(function (o) { rr(0, o[0], o[1], 19.3, 20.5, WH); });
    /* portholes and the bow's fairleads                                     */
    g.fillStyle = DK;
    [38.8, 41.5, 47.1, 52.9, 58.8, 64.5, 70.2, 78.9].forEach(function (px) {
      g.beginPath(); g.arc(colX(px), rowZ(0, 17.8), 0.22 * PXZ * 1.6, 0, PI * 2); g.fill();
    });
    [[-54.1, 6.6], [-19.8, 7.3], [-5.3, 7.5], [-3.6, 14.9], [30.6, 7.6], [36.8, 7.8], [41.1, 6.0], [41.3, 7.8]].forEach(function (d) {
      g.beginPath(); g.arc(colX(d[0]), rowZ(0, d[1]), 0.25 * PXZ * 1.6, 0, PI * 2); g.fill();
    });
    /* ------------------- port, off the 2005 broadside and the stern quarter */
    [[93.0, 94.4, 15.0, 16.0], [91.3, 92.7, 15.0, 16.0], [81.2, 82.6, 15.0, 16.0], [79.3, 80.7, 15.0, 16.0],
     [77.1, 78.5, 15.0, 16.0],
     [61.0, 59.9, 0, 0], [-78.2, -69.1, 5.4, 9.3], [-67.9, -58.6, 5.4, 9.3], [-81.0, -79.0, 5.0, 7.8],
     [-96.3, -94.6, 7.7, 9.2], [-93.6, -91.9, 7.7, 9.2]
    ].forEach(function (o) { if (o[3] > o[2]) rr(1, o[0], o[1], o[2], o[3], DK); });
    /* the arched window trio and the pair high up forward                   */
    [[60.6, 59.6], [59.1, 58.1], [57.6, 56.6], [42.8, 41.8], [41.3, 40.3]].forEach(function (o) {
      rr(1, o[1], o[0], 18.0, 19.4, DK);
    });
    /* window groups amidships and aft (perspective fit, +- 3 m)             */
    [[19.0, 21.0, 13.6, 15.6], [13.0, 14.0, 13.0, 15.6], [14.5, 15.5, 13.0, 15.6], [21.5, 22.5, 16.4, 18.2],
     [-23.0, -22.2, 9.0, 12.4], [-29.6, -28.8, 9.0, 12.4], [-62.2, -61.4, 9.4, 13.0],
     [-70.6, -69.8, 10.0, 14.0], [-72.0, -71.2, 10.0, 14.0], [-80.2, -79.4, 3.4, 8.4]
    ].forEach(function (o) { rr(1, o[0], o[1], o[2], o[3], DK); });
    for (i = 0; i < 6; i++) rr(1, -9.0 + i * 1.6, -8.1 + i * 1.6, 6.0, 7.2, DK);
    /* a pipe run and the gangway rail low down (2005 broadside)             */
    rr(1, -16.0, -15.7, 2.4, 14.8, "rgba(205,210,214,0.55)");
    rr(1, -35.0, 25.0, 2.2, 2.45, "rgba(205,210,214,0.45)");
    /* draught marks forward and aft, both sides                             */
    g.fillStyle = "rgba(236,238,240,0.9)";
    for (b = 0; b < 2; b++) [86.4, -98.6].forEach(function (mx) {
      for (var k = 0; k < 5; k++) g.fillRect(colX(mx), rowZ(b, 0.4 + k * 1.0) - 1, 6, 2);
    });
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }

  function botTex(THREE) {
    var W = 1024, H = 128, cv = mkCv(W, H), g = cv.getContext("2d"), R = rngOf(9015), i;
    g.fillStyle = "#5a2e2a"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 220; i++) {
      g.globalAlpha = 0.05 + R() * 0.08;
      g.fillStyle = R() < 0.5 ? "#7a3d34" : "#33191a";
      g.fillRect(R() * W, R() * H, 30 + R() * 160, 2 + R() * 10);
    }
    g.globalAlpha = 1;
    g.fillStyle = "#2f3236"; g.fillRect(0, 0, W, 10);
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }

  function supTex(THREE) {
    var W = 1024, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(9014), i;
    g.fillStyle = hx(PAINT.sup); g.fillRect(0, 0, W, H);
    for (i = 0; i < 140; i++) {
      g.globalAlpha = 0.035 + R() * 0.045;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 30 + R() * 140, 10 + R() * 40);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1.3;
    for (i = 1; i < 16; i++) {
      g.beginPath(); g.moveTo(i * W / 16, 0); g.lineTo(i * W / 16, H); g.stroke();
      g.beginPath(); g.moveTo(0, i * H / 16); g.lineTo(W, i * H / 16); g.stroke();
    }
    g.fillStyle = "rgba(20,22,25,0.42)";
    for (i = 0; i < 22; i++) g.fillRect(R() * W, R() * H, 14 + R() * 8, 30 + R() * 10);
    g.fillStyle = "rgba(20,22,25,0.55)";
    for (i = 0; i < 40; i++) g.fillRect(R() * W, R() * H, 6, 6);
    for (i = 0; i < 36; i++) {
      var x = R() * W, y = R() * H * 0.8, len = 8 + R() * 30;
      var gr = g.createLinearGradient(0, y, 0, y + len);
      gr.addColorStop(0, "rgba(90,62,44,0.18)");
      gr.addColorStop(1, "rgba(90,62,44,0.0)");
      g.fillStyle = gr; g.fillRect(x, y, 1.4 + R() * 2.2, len);
    }
    return finish(THREE, cv);
  }

  /* --------------------------------------------------------- flight deck
     One plan painting of the whole deck, sampled through shape-space UVs in
     metres (repeat/offset below). Off the rectified overhead: the six
     spots, the line-up line 5 m to port, both lifts' yellow-hatched
     outlines and joints, the red-and-white line along the island.          */
  var DX0 = -100, DX1 = 100, DY0 = -17, DY1 = 17;
  var LUL = 5.0;
  var SPOTS = [[90.0, -2.0, 1], [60.0, LUL, 2], [27.0, LUL, 3], [-6.0, LUL, 4], [-42.0, LUL, 5], [-76.0, -3.0, 6]];
  function deckTex(THREE) {
    var W = 2048, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(2006), i, p, q;
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
    function mrect(xa, ya, xb, yb, col) {
      g.fillStyle = col; g.fillRect(cx(xa), cy(yb), (xb - xa) * SX, (yb - ya) * SY);
    }
    /* non-skid, mottled and patched, pad-eyes on a 2 m grid                  */
    g.fillStyle = hx(PAINT.deck); g.fillRect(0, 0, W, H);
    for (i = 0; i < 520; i++) {
      g.globalAlpha = 0.04 + R() * 0.07;
      g.fillStyle = R() < 0.55 ? "#8b9195" : "#25292c";
      g.fillRect(R() * W, R() * H, 24 + R() * 170, 10 + R() * 50);
    }
    g.globalAlpha = 0.20; g.fillStyle = "#16191b";
    for (i = 0; i < 4200; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    g.fillStyle = "rgba(12,14,16,0.28)";
    for (p = DX0 + 1.0; p < DX1; p += 2.0)
      for (q = DY0 + 1.0; q < DY1; q += 2.0) g.fillRect(cx(p) - 1, cy(q) - 1, 2.0, 2.0);
    /* rotor-wash and tyre scuffing round the spots                           */
    g.fillStyle = "#0e1012";
    for (i = 0; i < 420; i++) {
      var sp = SPOTS[Math.floor(R() * SPOTS.length)];
      g.globalAlpha = 0.05 + R() * 0.08;
      g.fillRect(cx(sp[0] + (R() - 0.5) * 16), cy(sp[1] + (R() - 0.5) * 12), (2 + R() * 6) * SX, 1.5 + R() * 2.5);
    }
    g.globalAlpha = 1;
    var WH = "#e7eaeb", YL = "#d6aa34";
    /* the yellow-hatched lifts: a hatched band, the joint, a dark inner gap  */
    function lift(x0, x1, y0, y1, band) {
      /* the band as four strips, each hatched at 45 degrees, clipped here
         by arithmetic rather than by the canvas                             */
      [[x0 - band, y0 - band, x1 + band, y0], [x0 - band, y1, x1 + band, y1 + band],
       [x0 - band, y0, x0, y1], [x1, y0, x1 + band, y1]].forEach(function (r) {
        mrect(r[0], r[1], r[2], r[3], YL);
        g.strokeStyle = "rgba(30,30,30,0.55)"; g.lineWidth = Math.max(1, 0.45 * SX);
        for (var d = r[0] - (r[3] - r[1]); d < r[2]; d += 1.6) {
          /* the segment y = r1 + (x - d), clipped to the strip              */
          var xa = Math.max(r[0], d), xb = Math.min(r[2], d + (r[3] - r[1]));
          if (xb <= xa) continue;
          g.beginPath(); g.moveTo(cx(xa), cy(r[1] + xa - d)); g.lineTo(cx(xb), cy(r[1] + xb - d)); g.stroke();
        }
      });
      g.strokeStyle = "#101214"; g.lineWidth = Math.max(1.5, 0.3 * SY);
      g.strokeRect(cx(x0), cy(y1), (x1 - x0) * SX, (y1 - y0) * SY);
      mrect(x0 + 0.4, y0 + 0.4, x1 - 0.4, y1 - 0.4, "rgba(70,74,78,0.35)");
    }
    lift(AL.x0 - 1.0, AL.x1, AL.yc - AL.hw, AL.yc + AL.hw, 2.0);
    lift(CL.x0, CL.x1, CL.y0, CL.y1, 1.0);
    /* the line-up line: along 5 m to port, and out to the end spots         */
    mline([-42.0, LUL], [60.0, LUL], 0.6, WH);
    mline([60.0, LUL], [90.0, -2.0], 0.6, WH);
    mline([-42.0, LUL], [-76.0, -3.0], 0.6, WH);
    /* each spot: a ring, a bar across, a short tail inboard, its number     */
    g.font = "bold " + Math.round(3.4 * SY) + "px sans-serif";
    g.textAlign = "center"; g.textBaseline = "middle";
    SPOTS.forEach(function (s) {
      g.save();
      g.strokeStyle = WH; g.lineWidth = Math.max(1.2, 0.55 * SY);
      g.beginPath(); g.ellipse(cx(s[0]), cy(s[1]), 4.2 * SX, 4.2 * SY, 0, 0, PI * 2); g.stroke();
      g.restore();
      mline([s[0], s[1] - 9.5], [s[0], s[1] + 6.5], 0.55, WH);
      mline([s[0] - 6.5, s[1]], [s[0] - 4.2, s[1]], 0.55, WH);
      mline([s[0] + 4.2, s[1]], [s[0] + 6.5, s[1]], 0.55, WH);
      g.save();
      g.translate(cx(s[0]), cy(s[1]));
      g.rotate(PI / 2);
      g.fillStyle = WH; g.fillText(String(s[2]), 0, 0);
      g.restore();
      /* the T-shaped arrows beside the spots (overhead)                      */
      mline([s[0] + 9.0, s[1] - 7.5], [s[0] + 13.0, s[1] - 7.5], 0.45, WH);
      mline([s[0] + 11.0, s[1] - 9.0], [s[0] + 11.0, s[1] - 6.0], 0.45, WH);
    });
    /* the red-and-white line along the island's inboard face (MV-22 photo)  */
    mline([-30.0, -4.4], [49.0, -4.4], 0.45, "#e9ecec");
    mline([-30.0, -4.4], [49.0, -4.4], 0.45, "#b8282a", [1.4, 1.4]);
    /* deck-edge line all round                                              */
    g.save();
    g.strokeStyle = "rgba(226,230,232,0.70)"; g.lineWidth = Math.max(1.2, 0.35 * SY);
    g.beginPath(); g.moveTo(cx(DECK[0][0] + 0.3), cy(DECK[0][1] + 0.3));
    for (i = 1; i < DECK.length; i++) g.lineTo(cx(DECK[i][0] - (DECK[i][0] > 0 ? 0.3 : -0.3)), cy(DECK[i][1] - (DECK[i][1] > 0 ? 0.3 : -0.3)));
    g.closePath(); g.stroke(); g.restore();
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.repeat.set(1 / (DX1 - DX0), 1 / (DY1 - DY0));
    t.offset.set(-DX0 / (DX1 - DX0), -DY0 / (DY1 - DY0));
    return t;
  }

  /* --- the well: lit from the open stern, falling to near black forward;
     u along the well (0 at the sill), v 0..0.5 the wooden floor of the
     well photograph, 0.5..1 the walls and deckhead                         */
  function wellTex(THREE) {
    var W = 512, H = 256, cv = mkCv(W, H), g = cv.getContext("2d"), R = rngOf(1785), i;
    var gr = g.createLinearGradient(0, 0, W, 0);
    gr.addColorStop(0, "#77797a"); gr.addColorStop(0.35, "#4a4e52"); gr.addColorStop(1, "#16181a");
    g.fillStyle = gr; g.fillRect(0, 0, W, H / 2);
    var gf = g.createLinearGradient(0, 0, W, 0);
    gf.addColorStop(0, "#8a6a48"); gf.addColorStop(0.4, "#5b4430"); gf.addColorStop(1, "#1d1610");
    g.fillStyle = gf; g.fillRect(0, H / 2, W, H / 2);
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1;
    for (i = 0; i < 16; i++) { var y = H / 2 + i * 8; g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
    for (i = 0; i < 40; i++) {
      g.fillStyle = "rgba(255,240,200," + (0.05 + R() * 0.06) + ")";
      g.fillRect(R() * W * 0.6, R() * H * 0.45, 6 + R() * 10, 2);
    }
    /* deckhead lights, every 6 m, brightest near the stern                  */
    for (i = 0; i < 10; i++) {
      g.fillStyle = "rgba(255,248,226," + (0.75 - i * 0.06) + ")";
      g.fillRect(i * W / 10 + 8, 6, 10, 4);
    }
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }

  var _tex = null;
  function textures(THREE) {
    if (_tex) return _tex;
    _tex = { hull: hullTex(THREE), bot: botTex(THREE), sup: supTex(THREE), deck: deckTex(THREE), well: wellTex(THREE) };
    return _tex;
  }

  /* ================================================================ build */
  function build(THREE, M, C) {
    var root = new THREE.Group();
    var i, j, s;
    var T = {}, TX = textures(THREE);
    T.H = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.hull, roughness: 0.84, metalness: 0.08 });
    T.U = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.bot, roughness: 0.90, metalness: 0.04 });
    T.S = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.sup, roughness: 0.85, metalness: 0.07 });
    T.D = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.deck, roughness: 0.94, metalness: 0.04 });
    T.K = new THREE.MeshStandardMaterial({ color: 0x1c2024, roughness: 0.90, metalness: 0.05 });
    T.M = new THREE.MeshStandardMaterial({ color: 0x7d858c, roughness: 0.55, metalness: 0.45 });
    T.G = new THREE.MeshStandardMaterial({ color: 0x14202a, roughness: 0.12, metalness: 0.0, transparent: true, opacity: 0.9 });
    T.R = new THREE.MeshStandardMaterial({ color: 0x454c53, roughness: 0.58, metalness: 0.22 });
    T.W = new THREE.MeshStandardMaterial({ color: 0xdfe2e3, roughness: 0.60, metalness: 0.04 });
    T.L = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.well, roughness: 0.80, metalness: 0.10,
                                           emissive: 0xffffff, emissiveMap: TX.well, emissiveIntensity: 0.22 });
    T.T = new THREE.MeshStandardMaterial({ color: new THREE.Color(C && C.team !== undefined ? C.team : 0x4b8fe0),
                                           roughness: 0.60, metalness: 0.10,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    var B = {};
    Object.keys(T).forEach(function (k) { B[k] = new Batch(); });
    function ringRail(pts, z, closed) {
      var n = pts.length - (closed === false ? 1 : 0);
      for (var k = 0; k < n; k++) {
        var p0 = pts[k], p1 = pts[(k + 1) % pts.length];
        var ddx = p1[0] - p0[0], ddy = p1[1] - p0[1], L2 = Math.sqrt(ddx * ddx + ddy * ddy);
        B.M.add(box(THREE, L2, 0.08, 0.08, (p0[0] + p1[0]) * 0.5, (p0[1] + p1[1]) * 0.5, z, 0, 0, Math.atan2(ddy, ddx)));
        var np = Math.max(1, Math.round(L2 / 3.0));
        for (var q = 0; q < np; q++)
          B.M.add(box(THREE, 0.07, 0.07, 1.0, lerp(p0[0], p1[0], q / np), lerp(p0[1], p1[1], q / np), z - 0.5));
      }
    }
    /* a window band laid on a face of a block: x-run or y-run              */
    function winX(x0, x1, y, z0, z1) { B.G.add(box(THREE, x1 - x0, 0.16, z1 - z0, (x0 + x1) * 0.5, y, (z0 + z1) * 0.5)); }
    function winY(x, y0, y1, z0, z1) { B.G.add(box(THREE, 0.16, Math.abs(y1 - y0), z1 - z0, x, (y0 + y1) * 0.5, (z0 + z1) * 0.5)); }
    /* mullions over a glazed band                                           */
    function mullX(x0, x1, y, z0, z1, n) {
      for (var k = 0; k <= n; k++) B.S.add(box(THREE, 0.22, 0.24, z1 - z0, lerp(x0, x1, k / n), y, (z0 + z1) * 0.5));
    }
    function mullY(x, y0, y1, z0, z1, n) {
      for (var k = 0; k <= n; k++) B.S.add(box(THREE, 0.24, 0.22, z1 - z0, x, lerp(y0, y1, k / n), (z0 + z1) * 0.5));
    }

    /* ------------------------------------------------------------- hull */
    var hg = hullGeo(THREE);
    B.H.add(hg.top);
    B.U.add(hg.bot);
    B.S.add(transomGeo(THREE));

    /* the bulbous forefoot under the stem, faired into the entrance        */
    B.U.add(sphere(THREE, 1.0, 16, 10, 85.2, 0, -3.8, 4.2, 1.7, 1.95));
    /* the bow thruster's tunnel mouths, both sides                          */
    for (s = -1; s <= 1; s += 2) {
      var yt = sideY(80.0, -3.4);
      B.K.add(place(THREE, new THREE.CylinderGeometry(1.1, 1.1, 0.12, 12), 80.0, s * (yt + 0.02), -3.4));
    }
    /* the two Mermaid pods under the run: strut, nacelle, pulling screw     */
    for (s = -1; s <= 1; s += 2) {
      var py = s * 7.4, pz = -4.1;
      B.M.add(box(THREE, 4.2, 0.8, 2.2, -90.5, py, -2.6));
      B.M.add(place(THREE, new THREE.CylinderGeometry(1.25, 1.25, 7.0, 12).rotateZ(PI / 2), -90.0, py, pz));
      B.M.add(sphere(THREE, 1.25, 12, 6, -93.5, py, pz, 1.6, 1, 1));
      B.M.add(place(THREE, new THREE.CylinderGeometry(0.6, 1.25, 1.6, 12).rotateZ(-PI / 2), -85.7, py, pz));
      for (j = 0; j < 4; j++) {
        var bl = new THREE.BoxGeometry(0.25, 0.9, 1.9);
        bl.translate(0, 0, 1.25); bl.rotateZ(0.35); bl.rotateX(j * PI / 2 + 0.4);
        bl.translate(-85.2, py, pz);
        B.M.add(bl);
      }
    }

    /* ------------------------------------------------------ flight deck */
    var shp = new THREE.Shape();
    shp.moveTo(DECK[0][0], DECK[0][1]);
    for (i = 1; i < DECK.length; i++) shp.lineTo(DECK[i][0], DECK[i][1]);
    shp.closePath();
    var dg = new THREE.ExtrudeGeometry(shp, { depth: FD_TH, bevelEnabled: false, curveSegments: 1 });
    dg.translate(0, 0, FD_BOT);
    Batch.addGroups(dg, [B.D, B.S]);

    /* the open mooring deck under the bow end of the flight deck, x 88 to
       the stem, 19.4 m to the deck: dark inside, the two windlasses and
       their cables, the stem hawse below (overhead, drawing)               */
    B.K.add(plate(THREE, [[87.6, -14.2], [95.6, -14.2], [97.6, -11.0], [97.6, 11.0], [95.6, 14.2], [87.6, 14.2]], 18.8, FD_BOT - 0.02));
    /* its railed front and the windows of the deck's forward face         */
    ringRail([[98.2, -12.6], [98.4, -6.0], [98.4, 6.0], [98.2, 12.6]], 19.85, false);
    for (j = -4; j <= 4; j++) if (j) B.G.add(box(THREE, 0.1, 1.6, 0.5, XB - 0.06, j * 2.6, FD_BOT + 0.45));
    for (s = -1; s <= 1; s += 2) {
      B.M.add(cylZ(THREE, 0.8, 0.9, 0.9, 10, 95.0, s * 4.2, 18.8));
      B.M.add(cylZ(THREE, 0.45, 0.45, 0.5, 8, 95.0, s * 4.2, 19.7));
      B.M.add(box(THREE, 3.6, 0.3, 0.2, 96.6, s * 3.4, 18.95, 0, 0, s * 0.12));
      /* the pillars carrying the deck's forward end                          */
      B.S.add(box(THREE, 0.6, 0.6, FD_BOT - 18.8, 98.0, s * 6.0, (FD_BOT + 18.8) * 0.5));
      B.S.add(box(THREE, 0.6, 0.6, FD_BOT - 18.8, 95.0, s * 15.0, (FD_BOT + 18.8) * 0.5));
      B.S.add(box(THREE, 0.6, 0.6, FD_BOT - 18.8, 89.0, s * 15.6, (FD_BOT + 18.8) * 0.5));
      /* the stem-side hawses on the flare                                   */
      /* the two fairleads and the hawse each side on the cap (2020 bow)    */
      [[96.3, 3.2, 16.2, 0.55], [95.6, 6.4, 16.6, 0.55], [93.8, 9.6, 17.1, 0.75]].forEach(function (h) {
        B.K.add(place(THREE, new THREE.CylinderGeometry(h[3], h[3], 0.3, 10), h[0], s * h[1], h[2], 0, 0, s * 1.2));
      });
    }
    /* the light platforms at both bow corners, under the deck edge          */
    for (s = -1; s <= 1; s += 2) {
      B.S.add(plate(THREE, ccw([[93.4, s * 15.6], [97.0, s * 13.6], [97.6, s * 15.2], [95.0, s * 16.9]]), FD_BOT - 2.6, FD_BOT - 2.3));
      B.W.add(box(THREE, 1.3, 1.0, 1.1, 95.4, s * 15.6, FD_BOT - 1.75));
    }

    /* --------------------------------------------- the well and its gate
       A cavity wound inward: floor, deckhead, two walls and the bulkhead at
       its forward end; the hull is closed round it, so it shows only
       through the stern opening. Web frames down the walls every 4 m and
       the walkways along both walls (well photograph).                     */
    var WL = WX1 - XS, x0w = XS + 0.02;
    function wq(a, b, c, d, va, vb) {
      B.L.add(quad(THREE, a, b, c, d,
        [[(a[0] - XS) / WL, va], [(b[0] - XS) / WL, va], [(c[0] - XS) / WL, vb], [(d[0] - XS) / WL, vb]]));
    }
    wq([x0w, -WHW, WZ0], [WX1, -WHW, WZ0], [WX1, WHW, WZ0], [x0w, WHW, WZ0], 0.02, 0.48);
    wq([x0w, WHW, WZ1], [WX1, WHW, WZ1], [WX1, -WHW, WZ1], [x0w, -WHW, WZ1], 0.55, 0.98);
    wq([x0w, WHW, WZ0], [WX1, WHW, WZ0], [WX1, WHW, WZ1], [x0w, WHW, WZ1], 0.55, 0.98);
    wq([WX1, -WHW, WZ0], [x0w, -WHW, WZ0], [x0w, -WHW, WZ1], [WX1, -WHW, WZ1], 0.55, 0.98);
    B.L.add(quad(THREE, [WX1, WHW, WZ0], [WX1, -WHW, WZ0], [WX1, -WHW, WZ1], [WX1, WHW, WZ1],
                 [[0.99, 0.6], [0.99, 0.6], [0.99, 0.95], [0.99, 0.95]]));
    function wellBox(lx, ly, lz, x, y, z, v) {
      var bx = box(THREE, lx, ly, lz, x, y, z), bu = bx.getAttribute("uv"), uq = (x - XS) / WL;
      for (var qq = 0; qq < bu.count; qq++) bu.setXY(qq, uq, v);
      B.L.add(bx);
    }
    for (var fx = XS + 4.0; fx < WX1 - 1.0; fx += 4.0) {
      for (s = -1; s <= 1; s += 2) wellBox(0.35, 0.4, WZ1 - WZ0, fx, s * (WHW - 0.2), (WZ0 + WZ1) * 0.5, 0.8);
      if (Math.round((fx - XS) / 4.0) % 2 === 0) wellBox(0.4, 2 * WHW, 0.5, fx, 0, WZ1 - 0.25, 0.9);
    }
    for (s = -1; s <= 1; s += 2) {
      wellBox(WL - 2.0, 1.2, 0.2, (XS + WX1) * 0.5 + 1.0, s * (WHW - 0.6), 3.4, 0.75);
      wellBox(WL - 2.0, 0.06, 0.06, (XS + WX1) * 0.5 + 1.0, s * (WHW - 1.2), 4.4, 0.95);
    }
    /* the sill, the guide posts either side of the opening and the lintel  */
    B.M.add(box(THREE, 0.5, 2 * WHW, 0.25, XS + 0.6, 0, WZ0 + 0.1));
    for (s = -1; s <= 1; s += 2) B.S.add(box(THREE, 0.5, 0.5, WZ1 - WZ0, XS + 0.3, s * (WHW + 0.25), (WZ0 + WZ1) * 0.5));
    B.S.add(box(THREE, 0.5, 2 * WHW + 1.0, 0.5, XS + 0.3, 0, WZ1 + 0.25));
    root.userData.wellExit = { x: XS, y: 0, z: WZ0 };
    root.userData.wellInner = { x: XS + 57.5 * 0.5, y: 0, z: WZ0 };

    /* The gate: hinged on its bottom inner edge, in a holder turned half
       round about Z so the gate's local +X points aft. Shut, its outer face
       is 0.15 m inside the transom, so nothing passes x -99.5. rotation.y
       +1.45 swings its top aft and down, nearly flat on the water.         */
    var gh = new THREE.Group();
    gh.position.set(XS + 0.65, 0, WZ0);
    gh.rotation.z = PI;
    var wg = new THREE.Group();
    wg.name = "wellgate";
    gh.add(wg);
    (function () {
      var GB = { S: new Batch(), M: new Batch() };
      /* the plate, 0.5 m thick out from the hinge                           */
      GB.S.add(box(THREE, 0.42, 2 * GATE_HW, GATE_H, 0.21, 0, GATE_H * 0.5));
      /* the ribbed outer face of the photographs: stiffeners in two tiers
         between a heavy foot, middle and head rail                          */
      for (j = 0; j < 14; j++) {
        var yy = -GATE_HW + 0.5 + j * (2 * GATE_HW - 1.0) / 13;
        GB.M.add(box(THREE, 0.1, 0.22, GATE_H * 0.5 - 0.6, 0.46, yy, GATE_H * 0.25 + 0.15));
        GB.M.add(box(THREE, 0.1, 0.22, GATE_H * 0.5 - 0.6, 0.46, yy, GATE_H * 0.75 - 0.15));
      }
      [0.25, GATE_H * 0.5, GATE_H - 0.25].forEach(function (zz) {
        GB.M.add(box(THREE, 0.08, 2 * GATE_HW - 0.1, 0.42, 0.46, 0, zz));
      });
      GB.M.add(place(THREE, new THREE.CylinderGeometry(0.24, 0.24, 2 * GATE_HW - 0.4, 8), 0.12, 0, 0.0));
      Object.keys(GB).forEach(function (kk) { var mm = GB[kk].mesh(THREE, T[kk]); if (mm) wg.add(mm); });
    })();
    root.add(gh);

    /* the aft lift's trunk, open to the stern: floor at the hangar level,
       dark walls, the lift platform up as its roof (the deck plate)        */
    var ap = AL.yc + AL.hw, as = AL.yc - AL.hw;
    B.S.add(plate(THREE, rect(XS + 0.05, AL.x1, as, ap), AL.z0 - 0.2, AL.z0));
    B.K.add(quad(THREE, [AL.x1, ap, AL.z0], [AL.x1, as, AL.z0], [AL.x1, as, FD_BOT], [AL.x1, ap, FD_BOT]));
    B.K.add(quad(THREE, [XS, ap, AL.z0], [AL.x1, ap, AL.z0], [AL.x1, ap, FD_BOT], [XS, ap, FD_BOT]));
    B.K.add(quad(THREE, [AL.x1, as, AL.z0], [XS, as, AL.z0], [XS, as, FD_BOT], [AL.x1, as, FD_BOT]));
    B.R.add(box(THREE, 0.3, 2 * AL.hw - 0.4, 0.6, AL.x1 + 0.2, AL.yc, FD_BOT - 0.35));
    B.M.add(box(THREE, 0.1, 2 * AL.hw, 0.08, XS + 0.15, AL.yc, AL.z0 + 1.05));
    /* the transom between the two openings: a row of windows, the stern
       fairleads and two light boxes (stern photographs)                    */
    for (s = -1; s <= 1; s += 2) {
      B.K.add(box(THREE, 0.06, 2.6, 1.4, XS + 0.04, s * 10.6, 8.2));
      B.K.add(box(THREE, 0.06, 1.2, 1.6, XS + 0.04, s * 12.6, 12.6));
      B.K.add(place(THREE, new THREE.CylinderGeometry(0.5, 0.5, 0.06, 10).rotateZ(PI / 2), XS + 0.04, s * 13.4, 18.4));
    }

    /* ---------------------------------------------- deck-edge fittings
       The overhead's dark recesses on the port deck edge, each a pit with
       folded gear in it; a thin rail along both edges.                     */
    [79.0, 14.0, -88.0].forEach(function (dx) {
      B.S.add(plate(THREE, rect(dx - 3.6, dx + 3.6, DHW - 0.2, DHW + 1.3), FD_TOP - 1.6, FD_TOP - 1.4));
      B.K.add(box(THREE, 7.0, 1.3, 1.2, dx, DHW + 0.55, FD_TOP - 0.85));
      B.M.add(box(THREE, 6.4, 0.25, 0.25, dx, DHW + 0.5, FD_TOP - 0.15, 0.3, 0, 0));
      B.M.add(box(THREE, 0.2, 1.3, 0.2, dx - 3.4, DHW + 0.55, FD_TOP - 0.2));
      B.M.add(box(THREE, 0.2, 1.3, 0.2, dx + 3.4, DHW + 0.55, FD_TOP - 0.2));
    });
    for (s = -1; s <= 1; s += 2) {
      B.M.add(box(THREE, 194.0, 0.07, 0.07, -1.5, s * (DHW - 0.08), FD_TOP + 0.85));
      for (var xr = -98.0; xr < 95.0; xr += 4.0) B.M.add(box(THREE, 0.07, 0.07, 0.85, xr, s * (DHW - 0.08), FD_TOP + 0.43));
    }

    /* ------------------------------------------------------------ island
       Off the drawing's grid (z above the waterline): the low casing to
       25.1, the main block to 34.0 with a level at 31.0, the bridge block
       to 37.4 with the glazed bridge leaning out at 31.6-35.3, the low fore
       end to 25.1 with its balconies. Inboard faces off the overhead.      */
    B.S.add(frustum(THREE, ISL.aft, Z0, 25.1, 1.0, 0.99));
    B.S.add(frustum(THREE, ISL.main, Z0, 31.0, 1.0, 1.0));
    B.S.add(frustum(THREE, [[-6.5, -16.0], [-6.5, -5.9], [22.2, -5.9], [22.2, -16.0]], 31.0, 34.0, 1.0, 0.995));
    B.S.add(frustum(THREE, ISL.brg, Z0, 31.6, 1.0, 1.0));
    B.S.add(frustum(THREE, ISL.fwd, Z0, 25.1, 1.0, 0.99));
    /* the glazed bridge level: its front leaning out 1.5 m over 3.7 m      */
    (function () {
      var lo = [[22.2, -16.1], [22.2, -5.3], [39.4, -5.3], [40.6, -6.6], [40.6, -16.1]];
      var hi = [[22.2, -16.6], [22.2, -4.7], [40.8, -4.7], [42.1, -6.1], [42.1, -16.6]];
      var pos = [], n = lo.length, z0 = 31.6, z1 = 35.3, k;
      for (k = 0; k < n; k++) {
        var q2 = (k + 1) % n, a = lo[k], b = lo[q2], c = hi[q2], d = hi[k];
        pos.push(a[0], a[1], z0, b[0], b[1], z0, c[0], c[1], z1, a[0], a[1], z0, c[0], c[1], z1, d[0], d[1], z1);
      }
      var gg = new THREE.BufferGeometry();
      gg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      var uv = []; for (k = 0; k < pos.length / 3; k++) uv.push(pos[k * 3] / 16, pos[k * 3 + 2] / 16);
      gg.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
      gg.computeVertexNormals();
      B.S.add(gg);
      /* the glass band round its front and both sides, leaning with it      */
      var gl = new THREE.BoxGeometry(0.2, 10.6, 2.5);
      gl.rotateY(-0.38); gl.translate(41.5, -10.9, 33.45);
      B.G.add(gl);
      var gc = new THREE.BoxGeometry(0.2, 1.7, 2.5);
      gc.rotateY(-0.38); gc.rotateZ(0.8); gc.translate(40.65, -5.6, 33.45);
      B.G.add(gc);
      for (var mq = 0; mq <= 7; mq++) {
        var mb = new THREE.BoxGeometry(0.26, 0.2, 2.5);
        mb.rotateY(-0.38); mb.translate(41.62, -15.8 + mq * 1.37, 33.45);
        B.S.add(mb);
      }
      winX(28.0, 40.4, -4.92, 32.3, 34.6);
      winX(28.0, 41.2, -16.45, 32.3, 34.6);
      mullX(28.0, 40.4, -4.86, 32.3, 34.6, 9);
      mullX(28.0, 41.2, -16.52, 32.3, 34.6, 9);
    })();
    /* the visor over it, the upper level with its window band all round the
       front (2005 and 2020 photographs), the roof cab                      */
    /* the bridge overhangs the block under it on both sides (2005 and 2020
       photographs)                                                          */
    B.S.add(plate(THREE, [[22.0, -17.3], [22.0, -3.9], [41.6, -3.9], [43.0, -5.5], [43.0, -17.3]], 35.3, 35.6));
    var UP = [[22.2, -17.0], [22.2, -4.2], [39.8, -4.2], [41.2, -5.6], [41.2, -17.0]];
    B.S.add(frustum(THREE, UP, 35.6, 37.4, 1.0, 1.0));
    winY(41.25, -16.5, -6.0, 35.75, 37.2);
    winX(26.0, 39.7, -4.12, 35.75, 37.2);
    winX(26.0, 40.8, -17.08, 35.75, 37.2);
    B.G.add(place(THREE, new THREE.BoxGeometry(0.16, 1.9, 1.45), 40.55, -4.9, 36.47, 0, 0, 0.78));
    mullY(41.32, -16.5, -6.0, 35.75, 37.2, 8);
    mullX(26.0, 39.7, -4.06, 35.75, 37.2, 9);
    mullX(26.0, 40.8, -17.14, 35.75, 37.2, 10);
    B.S.add(plate(THREE, scaleOut(UP, 1.01), 37.4, 37.65));
    ringRail(UP, 38.55);
    B.S.add(frustum(THREE, rect(35.6, 40.0, -14.2, -8.2), 37.65, 38.8, 1.0, 0.97));
    winY(40.02, -13.6, -8.8, 38.0, 38.6);
    /* the bridge wings stand out over both sides                            */
    B.S.add(plate(THREE, rect(36.5, 40.4, -18.3, -17.0), 35.0, 35.3));
    ringRail([[36.6, -18.2], [40.3, -18.2], [40.3, -17.1], [36.6, -17.1]], 36.2, false);
    /* the low fore end's roof: railed balcony, the drawing's pedestal with
       its ball head, the step up to the bridge front                       */
    ringRail([[40.6, -15.9], [47.6, -15.9], [47.6, -10.5], [45.0, -7.6], [40.6, -7.6]], 26.1, false);
    B.S.add(cylZ(THREE, 0.35, 0.45, 1.6, 8, 44.0, -12.4, 25.1));
    B.R.add(sphere(THREE, 0.65, 10, 7, 44.0, -12.4, 27.2));
    /* the balcony across the island's front under the bridge (drawing z 31,
       2020 bow quarter), on brackets                                        */
    B.S.add(plate(THREE, [[40.4, -16.0], [43.2, -16.0], [43.2, -8.4], [40.4, -7.0]], 28.2, 28.45));
    ringRail([[40.5, -15.9], [43.1, -15.9], [43.1, -8.5], [40.5, -7.1]], 29.4, false);
    for (s = 0; s < 3; s++) B.S.add(vplate(THREE, [[40.5, 26.6], [40.5, 28.2], [42.6, 28.2]], 0.25).translate(0, -14.8 + s * 3.0, 0));
    /* window bands of the low casing and the main block (drawing)          */
    [[-27.0, -24.5], [-23.0, -19.0], [-17.5, -15.0], [-13.5, -11.0], [-9.0, -6.5], [-5.0, -2.5], [-1.0, 1.5],
     [5.0, 10.0], [17.5, 20.5], [26.0, 28.0]].forEach(function (w) {
      winX(w[0], w[1], -16.06, 23.9, 24.8);
    });
    [[-3.0, -1.2], [0.5, 2.5], [3.0, 5.0]].forEach(function (w) { winX(w[0], w[1], -16.06, 26.6, 28.0); });
    for (j = 0; j < 7; j++) winX(-6.0 + j * 4.2, -4.6 + j * 4.2, -5.66, 23.6, 24.6);
    winY(-28.06, -15.0, -11.0, 23.6, 24.6);
    winY(-6.56, -15.0, -9.6, 28.2, 29.4);
    /* team band round the head of the main block                           */
    B.T.add(frustum(THREE, [[-6.5, -16.0], [-6.5, -5.9], [22.2, -5.9], [22.2, -16.0]], 33.1, 33.7, 1.006, 1.004, true));
    /* the main block's roof: a railed deck and the house aft under the
       after mast, windows round it (drawing)                               */
    ringRail([[-6.4, -15.9], [-6.4, -6.0], [22.0, -6.0]], 35.0, false);
    var AH = rect(-1.0, 11.0, -14.6, -7.2);
    B.S.add(frustum(THREE, AH, 34.0, 37.4, 1.0, 0.99));
    winX(-0.5, 5.6, -14.66, 35.6, 36.8);
    winX(0.5, 9.5, -7.14, 35.6, 36.8);
    /* doors and ladders down the inboard face                               */
    for (j = 0; j < 6; j++) B.K.add(box(THREE, 1.1, 0.12, 2.1, -6.0 + j * 5.2, -5.6, Z0 + 1.05));
    B.M.add(strut(THREE, 21.2, -5.2, 25.1, 18.4, -5.2, 31.0, 0.08, 4));
    B.M.add(strut(THREE, 20.4, -5.2, 25.1, 17.6, -5.2, 31.0, 0.08, 4));
    B.S.add(plate(THREE, rect(-6.4, 22.0, -5.6, -4.6), 30.85, 31.05));
    ringRail([[-6.4, -4.65], [22.0, -4.65]], 31.95, false);
    B.S.add(plate(THREE, rect(-26.5, -10.0, -8.8, -7.6), 25.0, 25.2));
    ringRail([[-26.5, -7.65], [-10.0, -7.65]], 26.1, false);

    /* the FLYCO tower at the main block's after end, inboard: glazed on two
       levels and canted out over the deck (2005 photograph, overhead)       */
    B.S.add(frustum(THREE, rect(-10.2, -6.3, -9.6, -4.9), 25.1, 33.8, 1.0, 1.0));
    winX(-10.0, -6.6, -4.84, 31.4, 33.2);
    winY(-10.26, -9.2, -5.2, 31.4, 33.2);
    winX(-10.0, -6.6, -4.84, 27.9, 29.1);
    winY(-10.26, -9.2, -5.2, 27.9, 29.1);
    B.S.add(plate(THREE, rect(-10.5, -6.0, -9.9, -4.6), 33.8, 34.1));
    ringRail(rect(-10.4, -6.1, -9.8, -4.7), 35.0);

    /* ----------------------------------------------- the masts
       The after mast: a tapered, slab-sided tower off the main block's roof
       at x 10-15 (drawing), the swept yard at 47.5, a lattice top with its
       platforms and the planar array at the head (56).                     */
    var MX = 12.5, MY = -11.0;
    B.S.add(frustum(THREE, rect(MX - 2.7, MX + 2.7, MY - 2.4, MY + 2.4), 34.0, 47.0, 1.0, 0.66));
    /* the swept yard: a wing across both sides, its tips raised forward    */
    B.S.add(plate(THREE, [[MX - 1.6, MY - 1.6], [MX + 1.6, MY - 1.6], [MX + 1.6, MY + 1.6], [MX - 1.6, MY + 1.6]], 46.9, 47.6));
    B.S.add(plate(THREE, [[MX - 0.6, MY - 6.0], [MX + 4.4, MY - 6.0], [MX + 4.4, MY - 5.0], [MX - 0.6, MY - 1.2]], 47.2, 47.5));
    B.S.add(plate(THREE, [[MX - 0.6, MY + 1.2], [MX + 4.4, MY + 5.0], [MX + 4.4, MY + 6.0], [MX - 0.6, MY + 6.0]], 47.2, 47.5));
    ringRail(rect(MX - 1.5, MX + 1.5, MY - 1.5, MY + 1.5), 48.6);
    /* lattice top: four legs, cross-bracing, two platforms                  */
    var lg4 = [[-0.8, -0.8], [0.8, -0.8], [0.8, 0.8], [-0.8, 0.8]];
    lg4.forEach(function (l, k) {
      B.M.add(strut(THREE, MX + l[0], MY + l[1], 47.6, MX + l[0] * 0.55, MY + l[1] * 0.55, 54.6, 0.11, 4));
      var l2 = lg4[(k + 1) % 4];
      for (var b2 = 0; b2 < 3; b2++) {
        var za = 47.6 + b2 * 2.33, zb = za + 2.33, fa = 1 - 0.45 * (za - 47.6) / 7, fb = 1 - 0.45 * (zb - 47.6) / 7;
        B.M.add(strut(THREE, MX + l[0] * fa, MY + l[1] * fa, za, MX + l2[0] * fb, MY + l2[1] * fb, zb, 0.05, 3));
      }
    });
    B.S.add(plate(THREE, rect(MX - 1.3, MX + 1.3, MY - 1.3, MY + 1.3), 50.4, 50.6));
    B.M.add(box(THREE, 0.25, 6.0, 0.2, MX + 0.2, MY, 51.7));
    B.S.add(plate(THREE, rect(MX - 0.9, MX + 0.9, MY - 0.9, MY + 0.9), 54.5, 54.7));
    B.S.add(cylZ(THREE, 0.45, 0.55, 0.5, 8, MX, MY, 54.7));
    B.R.add(box(THREE, 0.45, 2.8, 1.5, MX + 0.2, MY, 55.95, 0, -0.2, 0));
    B.M.add(strut(THREE, MX - 0.4, MY, 55.2, MX - 0.4, MY, 56.6, 0.06, 4, 0.03));
    for (s = -1; s <= 1; s += 2) {
      B.M.add(strut(THREE, MX + 0.2, MY + s * 3.0, 51.7, MX + 0.2, MY + s * 3.0, 53.3, 0.04, 3));
      B.R.add(box(THREE, 0.6, 0.6, 0.8, MX + 1.6, MY + s * 1.2, 49.0));
    }
    /* the tilted slatted grille aft of the after mast (drawing x 2-8)       */
    (function () {
      var gx = 5.2, gy = -11.0, gz = 40.2;
      B.S.add(box(THREE, 1.4, 3.0, 4.2, gx - 1.6, gy, 36.3));
      for (var k = 0; k < 5; k++) {
        var sl = new THREE.BoxGeometry(5.2, 3.0, 0.2);
        sl.rotateY(0.62);
        sl.translate(gx + (k - 2) * 0.95, gy, gz + (k - 2) * 0.48);
        B.S.add(sl);
      }
      for (s = -1; s <= 1; s += 2) {
        var fr = new THREE.BoxGeometry(6.4, 0.2, 0.3);
        fr.rotateY(-0.55);
        fr.translate(gx, gy + s * 1.6, gz);
        B.M.add(fr);
      }
    })();

    /* the forward mast off the bridge-block roof (drawing x 29-33): a
       tapered tower, the swept platform forward with the radar bar on it,
       a yard and a short pole                                               */
    var FX = 31.0, FY = -11.0;
    B.S.add(frustum(THREE, rect(FX - 2.2, FX + 2.2, FY - 1.9, FY + 1.9), 37.65, 45.0, 1.0, 0.66));
    B.S.add(plate(THREE, [[FX - 1.3, FY - 1.3], [FX + 1.2, FY - 1.3], [FX + 7.6, FY - 1.0], [FX + 7.6, FY + 1.0],
                          [FX + 1.2, FY + 1.3], [FX - 1.3, FY + 1.3]], 45.0, 45.35));
    B.S.add(box(THREE, 6.0, 0.25, 1.0, FX + 4.0, FY, 44.55, 0, -0.12, 0));
    B.S.add(cylZ(THREE, 0.35, 0.45, 0.5, 8, FX + 6.6, FY, 45.35));
    B.R.add(box(THREE, 0.5, 3.8, 0.4, FX + 6.6, FY, 46.1));
    B.M.add(box(THREE, 0.25, 8.0, 0.2, FX - 0.3, FY, 46.3));
    B.M.add(strut(THREE, FX - 0.4, FY, 45.35, FX - 0.4, FY, 49.0, 0.08, 4, 0.04));
    B.R.add(box(THREE, 1.2, 1.0, 1.0, FX - 1.0, FY + 1.6, 46.0));
    ringRail(rect(FX - 1.2, FX + 7.5, FY - 1.2, FY + 1.2), 46.3);

    /* --------------------------------------------- the domes
       The big SATCOM dome abaft the forward mast, on the bridge-block roof;
       a small one on its bracket forward and to port of that mast (drawing
       x 34.9, z 40); the dome on legs at the main block's after end
       (drawing x -3.6, z 37); two small ones on the after house.           */
    B.S.add(cylZ(THREE, 1.1, 1.3, 0.8, 10, 25.8, -8.8, 37.65));
    B.W.add(sphere(THREE, 2.15, 18, 12, 25.8, -8.8, 40.55));
    B.S.add(strut(THREE, FX + 1.6, FY + 1.5, 39.4, 34.9, -8.4, 39.4, 0.15, 4));
    B.W.add(sphere(THREE, 1.0, 12, 8, 34.9, -8.4, 40.0));
    for (s = -1; s <= 1; s += 2) B.M.add(strut(THREE, -3.6 + s * 0.8, -11.6, 34.0, -3.6 + s * 0.5, -11.6, 35.4, 0.12, 4));
    B.S.add(cylZ(THREE, 0.8, 0.9, 0.3, 8, -3.6, -11.6, 35.3));
    B.W.add(sphere(THREE, 1.85, 14, 10, -3.6, -11.6, 37.35));
    B.W.add(sphere(THREE, 0.6, 10, 6, 9.0, -8.2, 37.65, 1, 1, 1, true));
    B.W.add(sphere(THREE, 0.6, 10, 6, 0.5, -13.6, 37.4, 1, 1, 1, true));

    /* ------------------------------------------- the deck-edge crane
       Abaft the island on the starboard edge (drawing x -45.5): a post to
       30 m, the jib reaching forward to x -34 with its hook                 */
    B.S.add(cylZ(THREE, 0.9, 1.1, 8.2, 10, -45.5, -15.0, Z0));
    B.S.add(box(THREE, 2.4, 1.8, 1.6, -45.4, -15.0, 30.6));
    var jib = new THREE.BoxGeometry(12.0, 0.7, 0.8);
    jib.rotateY(-0.05); jib.translate(-39.6, -15.0, 31.2);
    B.S.add(jib);
    B.M.add(strut(THREE, -45.0, -15.0, 31.4, -41.0, -15.0, 32.2, 0.1, 4));
    B.M.add(strut(THREE, -34.2, -15.0, 31.0, -34.2, -15.0, 29.4, 0.05, 3));
    B.M.add(box(THREE, 0.4, 0.4, 0.7, -34.2, -15.0, 29.1));
    /* the after casing's roof: rails and a light mast at its after end      */
    ringRail([[-27.9, -15.9], [-27.9, -10.1], [-26.5, -8.9], [-9.6, -8.9]], 26.1, false);
    B.M.add(strut(THREE, -26.0, -14.0, 25.1, -26.0, -14.0, 29.5, 0.07, 4, 0.04));

    /* whip aerials along the main block's roof edges and on the bridge
       roof, and the cable trays down the outboard face (2005 photograph)    */
    [[-5.0, -15.6], [1.5, -15.6], [16.0, -15.6], [19.5, -6.4], [-5.0, -6.4]].forEach(function (w) {
      B.M.add(strut(THREE, w[0], w[1], 34.0, w[0], w[1], 41.5, 0.07, 4, 0.03));
    });
    [[24.0, -15.6], [24.0, -5.6]].forEach(function (w) {
      B.M.add(strut(THREE, w[0], w[1], 37.4, w[0], w[1], 43.0, 0.07, 4, 0.03));
    });
    for (j = 0; j < 3; j++) B.S.add(box(THREE, 0.5, 0.35, 8.8, 0.0 + j * 7.5, -16.15, 29.5));
    /* air-conditioning and EW boxes on the main block's roof               */
    [[15.5, -7.2, 1.6, 1.2, 1.0], [18.5, -14.6, 2.0, 1.4, 1.2], [-4.6, -7.4, 1.4, 1.2, 1.0]].forEach(function (b) {
      B.S.add(box(THREE, b[2], b[3], b[4], b[0], b[1], 34.0 + b[4] * 0.5));
    });
    /* the aft lift trunk's guide rails and the gate's hoist brackets       */
    for (s = -1; s <= 1; s += 2) {
      B.M.add(box(THREE, 0.3, 0.3, FD_BOT - AL.z0, AL.x1 + 0.5, AL.yc + s * (AL.hw - 0.2), (FD_BOT + AL.z0) * 0.5));
      B.M.add(box(THREE, 0.3, 0.3, FD_BOT - AL.z0, -96.0, AL.yc + s * (AL.hw - 0.2), (FD_BOT + AL.z0) * 0.5));
      B.M.add(box(THREE, 1.2, 0.6, 1.0, XS + 0.6, s * (WHW + 0.3), WZ1 + 0.2));
      B.M.add(strut(THREE, XS + 0.6, s * (WHW - 0.1), WZ1 - 0.2, XS + 2.6, s * (WHW - 0.1), WZ1 - 2.0, 0.15, 5));
    }

    /* team flashes on the deck ends: thin, laid on the deck                 */
    B.T.add(box(THREE, 1.4, 12.0, 0.18, XB - 3.2, 0, FD_TOP + 0.09));
    B.T.add(box(THREE, 1.4, 12.0, 0.18, XS + 13.6, 0, FD_TOP + 0.09));

    /* ------------------------------------------------ out as one mesh each */
    Object.keys(B).forEach(function (k) {
      var mm = B[k].mesh(THREE, T[k]);
      if (mm) root.add(mm);
    });
    root.userData.heroLen = LOA;
    return root;
  }
  function scaleOut(pts, s) {
    var cx = 0, cy = 0, i, n = pts.length, out = [];
    for (i = 0; i < n; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    cx /= n; cy /= n;
    for (i = 0; i < n; i++) out.push([cx + (pts[i][0] - cx) * s, cy + (pts[i][1] - cy) * s]);
    return out;
  }

  return { build: build, len: LOA };
})();

UNIT_MODELS["fra_e00_lhd"] = {
  len: 199,
  build: function (THREE, M, C) { return HeroMistralLHD.build(THREE, M, C); }
};
UNIT_MODELS["lhd_f"] = {
  len: 199,
  build: function (THREE, M, C) { return HeroMistralLHD.build(THREE, M, C); }
};
