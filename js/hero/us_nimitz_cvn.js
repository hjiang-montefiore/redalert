/* ============================================================================
   us_nimitz_cvn.js -- HERO model: the Nimitz class (CVN-68), three periods.
     nato_e80_carrier  the class in the 1980s
     nato_e90_carrier  the class in the 1990s
     nato_e00_carrier  USS Ronald Reagan (CVN-76), 2003: bulbous bow and the
                       reworked island of the later ships
   The present-day Ford (carrier_n, js/hero/nato_e20_carrier_ford.js) is the
   benchmark this was built against; its machinery (station loft, deck
   painting, per-material batching) is reused here and its dimensions are not.

   References, measured at known scale and named so the next person can check
   them (all Wikimedia Commons, US Navy / NARA photographs unless noted):
     - "Aircraft carrier comparison.svg" (deck-area comparison, scale bar
       333 m x 77 m): the flight-deck outline -- angled-deck corner and its
       diagonal, the starboard bow cut, the narrow square stern, the port-
       quarter recess where lift 4 stands.
     - "Nimitz Class.png" (starboard profile drawing): island, lifts, lattice
       mast, sheer, stem rake.
     - "A starboard beam view of ... USS THEODORE ROOSEVELT (CVN 71) underway"
       (9 Oct 1986): a true broadside, bow right. Read on a grid at
       0.3345 m/px (995 px of flight deck = 332.8 m): lifts 3, 2, 1 at
       x -116.5..-90.6, -36.6..-10.7 and +8.8..+34.7; the island -71..-41;
       the lattice radar mast at -79; the low forward starboard sponson
       +89..+111 with its box launcher; deck 19.1-20.1 m above the
       waterline; the island roof about 16 m above the deck at its foot
       (the far deck edge reads 4 px high: the shot is a few degrees above
       the horizontal), yards at 27 and 31 m, masthead 42 m.
     - "A port beam view of ... THEODORE ROOSEVELT (CVN 71)" (1 Oct 1986):
       the port side -- the forward sponson +54..+89 under the angled-deck
       diagonal with its launcher, and the step at x -130 where the angled
       deck ends and lift 4 begins.
     - "Crew of USS Abraham Lincoln (CVN-72) spelling out RIMPAC 2006"
       (near-vertical overhead): landing-area angle (about 9 deg), the four
       catapult tracks, the jet-blast deflector wells, the stern shape.
     - "DF-ST-93-06045" (TR overhead, 1 Apr 1993) and "DN-SC-93-05981"
       (Nimitz bow view, 21 May 1993): the 1990s deck and island.
     - "US Navy 040723-N-7615S-305" (Reagan entering San Diego, 23 Jul 2004),
       "US Navy 040621-N-6536T-066" (Reagan in the Straits of Magellan,
       2004) -- both taken from her PORT quarter, the island on the far
       side -- and "CVN-76-Reagan-2005-07-25" (from ahead): Reagan's island
       and mast, the box launcher and white-domed mount on her port
       quarter, the forward sponsons and the dome on the starboard bow.

   Recognition list -- what has to read at a glance, and where it comes from:
     1. the ANGLED DECK, about 9 degrees to port, its outboard edge straight
        and its forward end cut back on a long diagonal (svg, Lincoln 2006);
     2. FOUR DECK-EDGE LIFTS: three to starboard -- two forward of the
        island, one aft of it -- and one on the PORT QUARTER, aft of the
        angled deck (TR 1986 both beams, svg recess);
     3. the ISLAND well forward of the Ford's, its after face at x -71,
        about a third of the way from the stern (TR 1986 starboard beam);
     4. by period: 1980s/1990s -- pole mast with two yards and the SPS-48
        planar array, and the SEPARATE LATTICE MAST abaft the island with
        the SPS-49 reflector; 2004 -- Reagan's big three-yard mast and the
        white SATCOM domes on the island corners;
     5. FOUR CATAPULT TRACKS, two up the bow and two in the waist (Lincoln);
     6. FOUR arresting pendants in the 1980s and 1990s, THREE on Reagan;
     7. the narrow SQUARE STERN with the open fantail under the round-down
        and the starboard after corner cut back (svg, Magellan 2004);
     8. the raked, flared BOW, plain in the 1980s and 1990s, over a BULB on
        Reagan (row text; the bulb itself is under water in every photo);
     9. corner SPONSONS: low forward starboard, forward port under the
        diagonal, and the two after ones, carrying Mk 29 Sea Sparrow
        launchers and Phalanx (and RAM on Reagan);
    10. DECK MARKINGS by period in the canvas: white landing lines and
        dashed centreline with helicopter circles (1986), a yellow
        centreline (1993), the alternating yellow/white solid centreline
        and ladder bars of the 2000s (2004 photographs);
    11. catwalks, safety nets and life-raft racks fringing every deck edge.

   What could not be confirmed and is drawn conservatively:
     - lift outlines are drawn square: no reference resolves a chamfer;
     - which sponson carries which weapon is only partly resolved: the TR
       1986 beams show box launchers on both forward sponsons; the after
       fits follow the class's published three Mk 29 and four Phalanx
       (1980s, 1990s) and Reagan's two Mk 29 and two RAM, with Phalanx
       where her 2004-05 photographs show a white dome;
     - the 1990s SATCOM domes rest on one white disc on the island in the
       1993 TR overhead;
     - three of the references (TR 1986 port beam, Lincoln 2006, Reagan
       2004) show lift 4 lowered to the hangar, the port quarter cut back;
       it is drawn raised and flush, as the other three are;
     - Reagan's three arresting pendants follow the published fit of
       CVN-76; the 2004 photographs are too small to count them.

   Model space: +X bow, +Y port, +Z up. Real metres, waterline z = 0,
   keel z = -11.3, flight deck z = 19.4. render3d.js scales by the X extent,
   which is the 332.8 m flight deck: nothing sticks out past either end.
   No node is named "turret" (the rows have no turret flag); every static
   part is merged into ONE mesh per material.

   ASCII only -- a stray byte in a hex literal has broken this project.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroNimitzCVN = (function () {
  "use strict";

  var PI = Math.PI;

  /* ---------------------------------------------------- principal dimensions */
  var LOA    = 332.8;              /* flight deck, end to end: x -166.4..166.4 */
  var FD_TOP = 19.4;               /* flight deck above the waterline (TR 1986) */
  var FD_TH  = 1.4;                /* flight deck plate and its girders        */
  var FD_BOT = FD_TOP - FD_TH;     /* 18.0: gallery deck, top of the hull loft */
  var KEEL   = -11.3;              /* 37 ft navigational draught               */
  var KNUCK  = 7.0;                /* hangar deck: the openings' sill, TR 1986 */
  var HX0 = -163.0, HX1 = 165.0;   /* hull loft: transom, stem head            */
  var HB  = 20.9;                  /* hull half-breadth at the hangar deck     */

  /* The landing area: 9 degrees to port, the axis crossing the round-down
     a little to starboard of the centreline and x = 0 at y 20.5. */
  var ANG = 9.0 * PI / 180, CA = Math.cos(ANG), SA = Math.sin(ANG);
  var LA_Y0 = 20.5, LA_HW = 9.0;
  function la(s, o) { return [s * CA - o * SA, LA_Y0 + s * SA + o * CA]; }

  /* ------------------------------------------------------ the deck outline
     Bow first, down the port side, across the stern and forward up the
     starboard side. Lifts are NOTCHES that their own slabs fill.        */
  var DECK = [
    [ 166.4, -12.0], [ 166.4,  11.0], [ 164.6,  13.0],
    [ 120.0,  15.9], [  89.0,  18.6],                  /* port bow edge      */
    [  61.0,  40.5],                                   /* angled-deck corner */
    [  14.0,  40.5], [  11.0,  38.2],                  /* the waist step     */
    [-124.5,  38.2], [-131.6,  34.2],
    [-131.6,  HB  ], [-157.6,  HB  ],                  /* lift 4 notch       */
    [-163.4,  17.0], [-166.4,  10.0], [-166.4, -15.0], [-162.0, -25.6],
    [-144.0, -29.8], [-126.0, -32.4], [-123.0, -36.8],
    [-116.5, -36.8], [-116.5, -HB  ], [ -90.6, -HB  ], [ -90.6, -36.8],   /* lift 3 */
    [ -36.6, -36.8], [ -36.6, -HB  ], [ -10.7, -HB  ], [ -10.7, -36.8],   /* lift 2 */
    [   8.8, -36.8], [   8.8, -HB  ], [  34.7, -HB  ], [  34.7, -36.8],   /* lift 1 */
    [  61.8, -36.8], [  88.0, -19.6],                  /* starboard bow cut  */
    [ 120.0, -16.2], [ 164.6, -13.4],
  ];
  /* the four 85 x 52 ft deck-edge lifts, raised flush                    */
  var LIFTS = [
    { x0:    8.8, x1:  34.7, y0: -36.8, y1: -HB, s: -1 },
    { x0:  -36.6, x1: -10.7, y0: -36.8, y1: -HB, s: -1 },
    { x0: -116.5, x1: -90.6, y0: -36.8, y1: -HB, s: -1 },
    { x0: -157.6, x1: -131.6, y0: HB, y1: 36.8, s: 1 },
  ];

  /* island main block (TR 1986 broadside): 30 m long, 10 m across, its
     outboard face just outside the deck edge                              */
  var ISL_X0 = -71.0, ISL_X1 = -41.0, ISL_YO = -38.0, ISL_YI = -28.0;
  var ISL_YC = (ISL_YO + ISL_YI) * 0.5;

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

  /* largest |y| of the deck outline on one side at station x; inside a lift
     notch that is the notch's inner edge                                  */
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

  /* a closed frustum on a convex plan, top scaled about the centroid      */
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
  function scalePts(pts, s) {
    var cx = 0, cy = 0, i, n = pts.length, out = [];
    for (i = 0; i < n; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    cx /= n; cy /= n;
    for (i = 0; i < n; i++) out.push([cx + (pts[i][0] - cx) * s, cy + (pts[i][1] - cy) * s]);
    return out;
  }
  function rect(x0, x1, y0, y1) { return [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]; }

  /* ============================================================= textures
     Haze grey by period, at about 0.9 of what the photographs sample: the
     TR 1986 broadside's lit island reads #5e616a, a shade bluer than the
     Ford's; Reagan in 2004 reads like the Ford. The non-skid is the dark
     grey every overhead shows.                                            */
  var PAINTS = {
    e80: { hull: 0x6f767f, sup: 0x7a828b, deck: 0x44494e },
    e90: { hull: 0x70777f, sup: 0x7b838b, deck: 0x45494e },
    e00: { hull: 0x737a81, sup: 0x7d858c, deck: 0x464b50 },
  };

  function hullTex(THREE, PAINT, zTop, zBot, H, seed) {
    var W = 2048, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(seed), i, x, y, z, len, gr;
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
      z = zBot + R() * (zTop - zBot);
      var under = z < 0;
      g.globalAlpha = under ? 0.05 + R() * 0.07 : 0.035 + R() * 0.045;
      g.fillStyle = under ? (R() < 0.5 ? "#7a3a31" : "#3c1c19") : (R() < 0.5 ? "#ffffff" : "#000000");
      g.fillRect(R() * W, rowZ(z), 40 + R() * 240, (0.3 + R() * 1.1) * PXZ);
    }
    g.globalAlpha = 1;
    /* the black boot topping every broadside shows at the waterline       */
    band(1.6, -1.0, "#17191c");
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.4;
    for (i = 1; i < 72; i++) {
      x = i * W / 72 + (R() - 0.5) * 4;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
    }
    for (i = 1; i < 9; i++) hline(i * 2.0);
    for (i = 1; i < 5; i++) hline(-i * 2.3);
    g.strokeStyle = "rgba(255,255,255,0.20)"; g.lineWidth = 3; hline(KNUCK);
    g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 2; hline(KNUCK - 0.35);
    /* a working ship: rust weeping from the scuppers and the hangar sills */
    if (zTop > 4) {
      for (i = 0; i < 110; i++) {
        x = R() * W; y = rowZ(3 + R() * 13); len = (2 + R() * 7) * PXZ;
        gr = g.createLinearGradient(0, y, 0, y + len);
        gr.addColorStop(0, "rgba(92,58,40,0.36)");
        gr.addColorStop(1, "rgba(92,58,40,0.0)");
        g.fillStyle = gr; g.fillRect(x, y, 1.5 + R() * 2.5, len);
        g.fillStyle = "rgba(24,22,20,0.38)"; g.fillRect(x - 1, y - 1, 4 + R() * 3, 3);
      }
    }
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }

  function supTex(THREE, PAINT, seed) {
    var W = 1024, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(seed), i;
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
    g.fillStyle = "rgba(20,22,25,0.42)";
    for (i = 0; i < 18; i++) g.fillRect(R() * W, R() * H, 14 + R() * 8, 30 + R() * 10);
    for (i = 0; i < 50; i++) {
      var x = R() * W, y = R() * H * 0.8, len = 8 + R() * 30;
      var gr = g.createLinearGradient(0, y, 0, y + len);
      gr.addColorStop(0, "rgba(90,62,44,0.22)");
      gr.addColorStop(1, "rgba(90,62,44,0.0)");
      g.fillStyle = gr; g.fillRect(x, y, 1.4 + R() * 2.2, len);
    }
    return finish(THREE, cv);
  }

  /* --------------------------------------------------------- flight deck
     One plan-view painting of the whole deck per period, sampled through
     the slab's shape-space UVs.                                          */
  var DX0 = -168, DX1 = 168, DY0 = -40, DY1 = 44;

  /* steam catapult tracks, [start, end]: two up the bow from the deflector
     wells at x 60, two in the waist nearly parallel to the angled deck's
     edge, as the Lincoln overhead shows them                              */
  var CATS = [
    [[ 62.0, -12.6], [160.5,  -5.4]],
    [[ 62.0,   3.4], [160.5,   6.0]],
    [[-40.5,  18.4], [ 57.0,  26.2]],
    [[-50.5,  28.6], [ 56.0,  36.8]],
  ];
  function pendants(P) {
    /* four Mk 7 pendants 12.2 m (40 ft) apart; Reagan has three          */
    return P === "e00" ? [-104.0, -91.8, -79.6] : [-110.0, -97.8, -85.6, -73.4];
  }

  function deckTex(THREE, P) {
    var PAINT = PAINTS[P];
    var W = 2048, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(P === "e80" ? 6801 : P === "e90" ? 6901 : 7601), i, p, q;
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
    function mpoly(pts, col) {
      g.fillStyle = col; g.beginPath();
      g.moveTo(cx(pts[0][0]), cy(pts[0][1]));
      for (var k = 1; k < pts.length; k++) g.lineTo(cx(pts[k][0]), cy(pts[k][1]));
      g.closePath(); g.fill();
    }
    function mrect(xa, ya, xb, yb, col) { mpoly([[xa, ya], [xb, ya], [xb, yb], [xa, yb]], col); }

    /* --- non-skid ----------------------------------------------------- */
    g.fillStyle = hx(PAINT.deck); g.fillRect(0, 0, W, H);
    for (i = 0; i < 460; i++) {
      g.globalAlpha = 0.04 + R() * 0.06;
      g.fillStyle = R() < 0.5 ? "#8d949a" : "#212529";
      g.fillRect(R() * W, R() * H, 24 + R() * 160, 10 + R() * 46);
    }
    g.globalAlpha = 0.22; g.fillStyle = "#14171a";
    for (i = 0; i < 5000; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    g.fillStyle = "rgba(12,14,16,0.30)";
    for (p = DX0 + 1.5; p < DX1; p += 3.0)
      for (q = DY0 + 1.5; q < DY1; q += 3.0) g.fillRect(cx(p) - 1, cy(q) - 1, 2.2, 2.2);
    g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1.2;
    for (q = DY0 + 2.7; q < DY1; q += 2.7) {
      g.beginPath(); g.moveTo(0, cy(q)); g.lineTo(W, cy(q)); g.stroke();
    }

    /* --- landing area: scuffed, tyre marks thickest at the wires -------- */
    var PEND = pendants(P);
    g.save();
    g.beginPath();
    p = la(-172, LA_HW); g.moveTo(cx(p[0]), cy(p[1]));
    p = la(68, LA_HW);   g.lineTo(cx(p[0]), cy(p[1]));
    p = la(68, -LA_HW);  g.lineTo(cx(p[0]), cy(p[1]));
    p = la(-172, -LA_HW); g.lineTo(cx(p[0]), cy(p[1]));
    g.closePath(); g.fillStyle = "rgba(18,21,24,0.26)"; g.fill();
    g.restore();
    g.fillStyle = "#0c0e10";
    for (i = 0; i < 520; i++) {
      var s0 = -140 + Math.pow(R(), 1.6) * 150, o0 = (R() - 0.5) * 9;
      p = la(s0, o0);
      g.globalAlpha = 0.07 + R() * 0.08;
      g.save(); g.translate(cx(p[0]), cy(p[1])); g.rotate(-ANG);
      g.fillRect(0, 0, (4 + R() * 16) * SX, 1.5 + R() * 2.5);
      g.restore();
    }
    g.globalAlpha = 1;

    /* --- landing lines, centreline, foul line, by period -------------- */
    mline(la(-172, LA_HW), la(70, LA_HW), 0.45, "#e8ecee");
    mline(la(-172, -LA_HW), la(70, -LA_HW), 0.45, "#e8ecee");
    mline(la(-172, -LA_HW - 3.0), la(40, -LA_HW - 3.0), 0.30, "rgba(178,58,48,0.8)", [3, 3]);
    if (P === "e80") {
      /* 1986: white dashes the whole length, short edge bars             */
      mline(la(-170, 0), la(68, 0), 0.40, "#e8ecee", [6, 6]);
      for (i = 0; i < 9; i++) {
        var sb = -150 + i * 26;
        mline(la(sb, LA_HW), la(sb, LA_HW + 2.0), 0.7, "#e8ecee");
        mline(la(sb, -LA_HW), la(sb, -LA_HW - 2.0), 0.7, "#e8ecee");
      }
    } else if (P === "e90") {
      /* 1993: the centreline picked out in yellow from the ramp to the
         wires, white dashes on from there                                  */
      mline(la(-170, 0), la(PEND[3] + 4, 0), 0.50, "#d3a03c");
      mline(la(PEND[3] + 4, 0), la(68, 0), 0.40, "#e8ecee", [6, 6]);
      for (i = 0; i < 10; i++) {
        var sc = -152 + i * 24;
        mline(la(sc, LA_HW), la(sc, LA_HW + 3.0), 0.9, "#e8ecee");
        mline(la(sc, -LA_HW), la(sc, -LA_HW - 3.0), 0.9, "#e8ecee");
      }
    } else {
      /* 2004: solid centreline in alternating yellow and white lengths to
         the wires, white dashes forward; ladder bars both sides            */
      var CL = [[-172, -155, "#d8a23a"], [-155, -139, "#e8ecee"],
                [-139, -122, "#d8a23a"], [-122, -106, "#e8ecee"]];
      CL.forEach(function (c) { mline(la(c[0], 0), la(c[1], 0), 0.55, c[2]); });
      mline(la(-106, 0), la(68, 0), 0.40, "#e8ecee", [6, 6]);
      for (i = 0; i < 11; i++) {
        var sd = -152 + i * 22;
        mline(la(sd, LA_HW), la(sd, LA_HW + 3.2), 0.9, "#e8ecee");
        mline(la(sd, -LA_HW), la(sd, -LA_HW - 3.2), 0.9, "#e8ecee");
      }
    }
    /* rubber where the hooks come down                                    */
    for (i = 0; i < 90; i++) {
      var ss = PEND[0] - 4 + R() * 44, so = (R() - 0.5) * 3.2;
      p = la(ss, so);
      g.globalAlpha = 0.05 + R() * 0.08;
      g.fillStyle = R() < 0.6 ? "#8a4a22" : "#5c3a24";
      g.save(); g.translate(cx(p[0]), cy(p[1])); g.rotate(-ANG);
      g.fillRect(0, 0, (3 + R() * 10) * SX, 1.2 + R() * 2.2);
      g.restore();
    }
    g.globalAlpha = 1;
    /* the pendants, square to the landing axis, each with its sheave
       trough out past the landing lines                                   */
    PEND.forEach(function (sw) {
      mline(la(sw, -LA_HW - 0.6), la(sw, LA_HW + 0.6), 0.30, "#15181b");
      for (var sd2 = -1; sd2 <= 1; sd2 += 2) {
        var t0 = la(sw + 5.5, sd2 * (LA_HW + 0.4)), t1 = la(sw + 1.5, sd2 * (LA_HW + 4.4));
        mline(t0, t1, 1.1, "rgba(22,20,19,0.82)");
        var sh = la(sw + 0.8, sd2 * (LA_HW + 5.3));
        g.fillStyle = "#e3e6e7";
        g.beginPath(); g.arc(cx(sh[0]), cy(sh[1]), 0.6 * SX, 0, PI * 2); g.fill();
      }
    });

    /* --- the steam catapults: a narrow dark slot down a pale track, the
       white start bar behind the shuttle                                   */
    function cat(a, b) {
      mline(a, b, 1.6, "#7b8288");
      mline(a, b, 0.30, "#121417");
      mline([a[0] - 0.6, a[1] - 1.5], [a[0] - 0.6, a[1] + 1.5], 0.5, "#e8ecee");
    }
    CATS.forEach(function (c) { cat(c[0], c[1]); });
    /* deflector wells behind the four catapults: the raised panels sit in
       front of these and the scorch runs aft of them                       */
    mrect(57.5, -18.2, 61.5, -7.2, "rgba(20,22,25,0.9)");
    mrect(57.5, -2.1, 61.5, 8.9, "rgba(20,22,25,0.9)");
    function jbdFlush(xa, ya, xb, yb) {
      mrect(xa, ya, xb, yb, "#6e5139");
      var gg = g.createLinearGradient(cx(xa), 0, cx(xb), 0);
      gg.addColorStop(0, "rgba(38,30,24,0.55)");
      gg.addColorStop(0.5, "rgba(20,18,17,0.95)");
      gg.addColorStop(1, "rgba(38,30,24,0.55)");
      g.fillStyle = gg;
      g.fillRect(cx(xa + 0.35), cy(yb - 0.35), (xb - xa - 0.7) * SX, (yb - ya - 0.7) * SY);
    }
    jbdFlush(-45.5, 13.0, -41.5, 23.6);
    jbdFlush(-55.5, 23.4, -51.5, 34.0);
    /* bow centreline, dashed                                              */
    mline([64, -4.0], [165, -4.0], 0.35, "#e8ecee", [3, 3]);

    /* --- helicopter spots: white circles in the 1986 and 1993 photographs,
       numbered spots along the port bow in the 2000s                      */
    var HS = [[100.0, 11.5], [130.0, 10.5], [-8.0, 31.0], [-60.0, 32.0]];
    HS.forEach(function (h, k) {
      if (P === "e00") {
        mline([h[0] - 5, h[1]], [h[0] + 5, h[1]], 0.5, "#e8ecee");
        mline([h[0], h[1] - 2.5], [h[0], h[1] + 2.5], 0.5, "#e8ecee");
      } else {
        g.save();
        g.strokeStyle = "#e8ecee"; g.lineWidth = Math.max(1.2, 0.45 * SY);
        g.beginPath(); g.ellipse(cx(h[0]), cy(h[1]), 3.4 * SX, 3.4 * SY, 0, 0, PI * 2); g.stroke();
        g.restore();
      }
    });

    /* --- lift outlines: a red dashed safety border inside a black edge -- */
    LIFTS.forEach(function (L) {
      g.save();
      g.strokeStyle = "rgba(170,52,44,0.85)"; g.lineWidth = Math.max(1.2, 0.35 * SY);
      g.setLineDash([2 * SX, 1.5 * SX]);
      g.strokeRect(cx(L.x0 + 0.8), cy(Math.max(L.y0, L.y1) - 0.8), (L.x1 - L.x0 - 1.6) * SX, (Math.abs(L.y1 - L.y0) - 1.6) * SY);
      g.restore();
      mline([L.x0, L.y0], [L.x0, L.y1], 0.30, "#0b0c0e");
      mline([L.x1, L.y0], [L.x1, L.y1], 0.30, "#0b0c0e");
      mline([L.x0, L.s > 0 ? L.y0 : L.y1], [L.x1, L.s > 0 ? L.y0 : L.y1], 0.30, "#0b0c0e");
    });

    /* --- the deck edge line, all the way round -------------------------- */
    g.save();
    g.strokeStyle = "rgba(226,230,232,0.7)"; g.lineWidth = Math.max(1.2, 0.6 * SY);
    g.beginPath(); g.moveTo(cx(DECK[0][0]), cy(DECK[0][1]));
    for (i = 1; i < DECK.length; i++) g.lineTo(cx(DECK[i][0]), cy(DECK[i][1]));
    g.closePath(); g.stroke(); g.restore();
    /* the round-down's white edge, which every stern shot picks out       */
    mline([-166.0, -14.0], [-166.0, 9.6], 1.2, "#e8ecee");

    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.repeat.set(1 / (DX1 - DX0), 1 / (DY1 - DY0));
    t.offset.set(-DX0 / (DX1 - DX0), -DY0 / (DY1 - DY0));
    return t;
  }

  /* painted once per page and period, shared by every build              */
  var _tex = {};
  function textures(THREE, P) {
    if (_tex[P]) return _tex[P];
    var PAINT = PAINTS[P];
    _tex[P] = {
      top:  hullTex(THREE, PAINT, FD_BOT, 0, 256, 68017),
      bot:  hullTex(THREE, PAINT, 0, KEEL, 128, 68018),
      sup:  supTex(THREE, PAINT, 6878),
      deck: deckTex(THREE, P)
    };
    return _tex[P];
  }

  /* ================================================================= hull
     Lofted from station outlines: flat bottom, tight bilge, near-vertical
     sides to the hangar deck, then the flare out under the flight deck.
     LEV rows: z, midship half-breadth, where the waterline starts to fine
     forward, where it would close at the stem, the two shape exponents,
     where it starts to fine aft, where it would vanish aft, aft exponent.
     The waterline closes at x 155.7 (TR 1986: the stem meets the water
     32 px abaft the deck tip). Reagan's two lower rows end blunt and well
     forward of the waterline stem: that is her bulb.                     */
  function levels(P) {
    var bulb = P === "e00";
    return [
      [ -11.3,  8.0, -40, bulb ? 150.0 : 136.0, 1.4, 1.00,  -15, -150, 1.3 ],
      [ -10.3, 14.0, -20, bulb ? 153.0 : 142.0, 1.5, 0.85,  -25, -162, 1.5 ],
      [  -8.0, 18.0, -10, bulb ? 158.0 : 147.0, 1.8, bulb ? 0.55 : 0.75,  -40, -182, 1.7 ],
      [  -4.0, 19.8,   0, bulb ? 159.0 : 152.0, 2.0, bulb ? 0.50 : 0.80,  -55, -212, 2.0 ],
      [   0.0, 20.4,  10, 155.7, 1.8, 1.00,  -90, -268, 2.0 ],
      [   4.0, 20.6,  50, 158.6, 1.9, 0.85, -130, -400, 2.0 ],
      [  KNUCK, HB,   90, 160.6, 2.2, 0.75, -999, -9999, 1 ],
    ];
  }
  function keelz(P) {
    var aft = [[-163, 0.6], [-153, -2.4], [-143, -5.0], [-131, -7.4], [-118, -9.2],
               [-103, -10.5], [-83, -11.1], [-63, -11.3]];
    var fwd = P === "e00"
      ? [[136, -11.3], [142, -11.1], [146, -10.7], [150, -10.0], [153, -9.0],
         [155.6, -7.6], [157.6, -6.0], [158.8, -4.2],
         /* past the bulb the stem rises from the waterline to the deck   */
         [159.4, 1.6], [159.6, 4.0], [160.6, KNUCK], [162.6, 12.0], [164.2, 15.6], [HX1, FD_BOT]]
      : [[124, -11.3], [130, -11.0], [136, -10.2], [141, -8.8], [145, -7.0],
         [149, -4.8], [152.3, -2.4], [155.7, 0.0], [158.6, 4.0], [160.6, KNUCK],
         [162.6, 12.0], [164.2, 15.6], [HX1, FD_BOT]];
    return aft.concat(fwd);
  }
  var STEM = [[0, 155.7], [4, 158.6], [KNUCK, 160.6], [12, 162.6], [15.6, 164.2], [FD_BOT, HX1]];
  function wedge(x, z) {
    var k = z < 12 ? lerp(0.50, 0.70, clamp((z - KNUCK) / (12 - KNUCK), 0, 1))
                   : lerp(0.70, 0.95, clamp((z - 12) / (FD_BOT - 12), 0, 1));
    return k * Math.max(0, tbl(STEM, z) - x);
  }
  function tbl(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++)
      if (x <= T[i][0]) return lerp(T[i - 1][1], T[i][1], (x - T[i - 1][0]) / (T[i][0] - T[i - 1][0]));
    return T[T.length - 1][1];
  }
  function lowY(LEV, k, x) {
    var L = LEV[k], y = L[1];
    if (x > L[2]) {
      var t = clamp((x - L[2]) / (L[3] - L[2]), 0, 1);
      y *= Math.pow(Math.max(0, 1 - Math.pow(t, L[4])), L[5]);
    }
    if (x < L[6]) {
      var ts = clamp((L[6] - x) / (L[6] - L[7]), 0, 1);
      y *= Math.max(0, 1 - Math.pow(ts, L[8]));
    }
    return y;
  }

  function sideRing(LEV, KZ, x, side) {
    var out = [], zk = tbl(KZ, x), k;
    var first = 0;
    while (first < LEV.length - 1 && LEV[first][0] < zk) first++;
    var yFirst = lowY(LEV, first, x);
    for (k = 0; k < LEV.length; k++) {
      if (LEV[k][0] < zk) out.push([0.8 * yFirst, zk]);
      else out.push([lowY(LEV, k, x), LEV[k][0]]);
    }
    var yK = out[LEV.length - 1][0];
    var edge = Math.max(yK, deckHalf(x, side) - 1.0), over = edge - yK;
    /* straight sides past the hangar deck and a dark shelf under the
       gallery where the overhang is modest; under the angled deck the
       knees start lower                                                    */
    var zF = Math.max(zk, lerp(FD_BOT - 4.8, FD_BOT - 7.2, clamp((over - 13) / 6, 0, 1)));
    var yF = Math.min(yK + 0.08 * over, wedge(x, zF));
    var y16 = Math.min(edge, wedge(x, FD_BOT - 1.2));
    var y17 = Math.min(edge, wedge(x, FD_BOT));
    /* a point half way up the flare, a touch inside the straight line, so
       the bow's V reads slightly hollow as the bow photographs show it    */
    var zm = (zF + FD_BOT - 1.2) * 0.5;
    var ym = Math.min(edge, wedge(x, zm), lerp(yF, y16, 0.45));
    out.push([yF, zF], [ym, zm], [y16, FD_BOT - 1.2], [y17, FD_BOT]);
    return out;
  }

  function hullGeo(THREE, P) {
    var LEV = levels(P), KZ = keelz(P);
    var xs = [-163, -160, -156, -151, -145, -138, -130, -121, -111, -100,
              -88, -76, -64, -52, -40, -28, -16, -4, 8, 20, 32, 44, 56, 68,
              80, 90, 100, 110, 118, 126, 133, 139, 144, 148, 151, 153.5,
              155.5, 157.0, 158.2, 159.2, 160.2, 161.4, 162.8, 164.0, HX1];
    var i, j;
    /* a station every 6 m through the midbody as well: the flare under the
       angled deck changes width at every deck-outline corner             */
    for (i = -94; i <= 98; i += 12) xs.push(i);
    [-161.5, -158.5, -153.5, 141.5, 146.0, 149.6, 152.3, 154.5, 156.3].forEach(function (q) { xs.push(q); });
    DECK.forEach(function (p) { if (p[0] > HX0 + 0.5 && p[0] < HX1 - 0.5) xs.push(p[0]); });
    LIFTS.forEach(function (L) {
      [L.x0, L.x1].forEach(function (e) {
        if (e > HX0 + 0.5) { xs.push(e - 0.25); xs.push(e + 0.25); }
      });
    });
    xs.sort(function (a, b) { return a - b; });
    var st = [];
    for (i = 0; i < xs.length; i++) if (!st.length || xs[i] - st[st.length - 1] > 0.2) st.push(xs[i]);

    var rings = [];
    for (i = 0; i < st.length; i++) {
      var x = st[i], Pp = sideRing(LEV, KZ, x, 1), S = sideRing(LEV, KZ, x, -1), r = [];
      r.push([0, FD_BOT]);
      for (j = Pp.length - 1; j >= 0; j--) r.push([Pp[j][0], Pp[j][1]]);
      r.push([0, tbl(KZ, x)]);
      for (j = 0; j < S.length; j++) r.push([-S[j][0], S[j][1]]);
      rings.push(r);
    }
    var nR = rings[0].length;
    var OUT = { top: { pos: [], nrm: [], uv: [], z0: 0, z1: FD_BOT }, bot: { pos: [], nrm: [], uv: [], z0: KEEL, z1: 0 } };
    function V(ii, jj) { var q = rings[ii][jj % nR]; return [st[ii], q[0], q[1]]; }
    function uOf(x) { return (x - HX0) / (HX1 - HX0); }
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
          sx += g2.n[0]; sy += g2.n[1]; sz += g2.n[2];
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
    return { top: geo(OUT.top), bot: geo(OUT.bot), LEV: LEV, KZ: KZ };
  }

  /* ========================================================== weapons
     Built in their own frame, launcher or gun along +X, ring centre at the
     origin, then dropped into the batches at a heading.                   */
  function phalanxParts(THREE) {
    return [
      ["S", cylZ(THREE, 0.95, 1.05, 0.8, 10, 0, 0, 0)],
      ["W", box(THREE, 1.7, 1.5, 1.1, -0.15, 0, 1.35)],
      ["W", cylZ(THREE, 0.72, 0.72, 1.55, 10, -0.35, 0, 1.9)],
      ["W", sphere(THREE, 0.72, 10, 3, -0.35, 0, 3.45, 1, 1, 1, true)],
      ["M", place(THREE, new THREE.CylinderGeometry(0.2, 0.24, 2.3, 8).rotateZ(-PI / 2), 1.65, 0, 1.3)],
    ];
  }
  /* Mk 29: the eight-cell Sea Sparrow box on its pedestal                 */
  function mk29Parts(THREE) {
    return [
      ["S", cylZ(THREE, 0.9, 1.1, 1.1, 10, 0, 0, 0)],
      ["S", box(THREE, 0.7, 2.9, 1.2, 0, 0, 1.6)],
      ["S", box(THREE, 3.9, 2.5, 1.8, 0.2, 0, 2.7, 0, -0.33, 0)],
      ["K", box(THREE, 0.12, 2.2, 1.5, 2.08, 0, 3.37, 0, -0.33, 0)],
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
      ["S", box(THREE, 0.9, 0.35, 0.9, -0.6, -1.05, 2.2)],
    ];
  }
  /* Mk 95 illuminator of the Mk 91 fire control: a pedestal and the twin
     dish head that stands beside each Sea Sparrow launcher               */
  function mk95Parts(THREE) {
    return [
      ["S", cylZ(THREE, 0.45, 0.6, 1.6, 8, 0, 0, 0)],
      ["S", box(THREE, 0.9, 1.6, 0.9, 0, 0, 2.05)],
      ["R", place(THREE, new THREE.CylinderGeometry(0.62, 0.62, 0.2, 10).rotateZ(-PI / 2), 0.55, 0.45, 2.15)],
      ["R", place(THREE, new THREE.CylinderGeometry(0.42, 0.42, 0.2, 10).rotateZ(-PI / 2), 0.55, -0.55, 2.15)],
    ];
  }

  /* ================================================================ build */
  function build(THREE, M, C, P) {
    P = P || "e80";
    var root = new THREE.Group();
    var i, j, s;
    var late = P === "e00";

    var T = {}, TX = textures(THREE, P);
    T.H = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.top, roughness: 0.86, metalness: 0.08 });
    T.U = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.bot, roughness: 0.90, metalness: 0.04 });
    T.S = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.sup, roughness: 0.87, metalness: 0.07 });
    T.D = new THREE.MeshStandardMaterial({ color: 0xffffff, map: TX.deck, roughness: 0.94, metalness: 0.04 });
    T.K = new THREE.MeshStandardMaterial({ color: 0x1f2327, roughness: 0.90, metalness: 0.05 });
    T.M = new THREE.MeshStandardMaterial({ color: 0x5d666d, roughness: 0.55, metalness: 0.50 });
    T.G = new THREE.MeshStandardMaterial({ color: 0x121c25, roughness: 0.12, metalness: 0.0, transparent: true, opacity: 0.88 });
    T.R = new THREE.MeshStandardMaterial({ color: 0x40474e, roughness: 0.58, metalness: 0.22 });
    T.W = new THREE.MeshStandardMaterial({ color: 0xd7dbdd, roughness: 0.62, metalness: 0.04 });
    /* the team material, exactly C.team, pulled a couple of depth steps
       toward the camera as the Ford's is: its flashes lie on the deck    */
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

    /* ------------------------------------------------------------- hull */
    var hg = hullGeo(THREE, P);
    var LEV = hg.LEV;
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
    LIFTS.forEach(function (L) {
      var ya = Math.min(L.y0, L.y1), yb = Math.max(L.y0, L.y1);
      var ls = new THREE.Shape();
      var inA = L.s > 0 ? 0.15 : 0, inB = L.s < 0 ? 0.15 : 0;
      ls.moveTo(L.x0 + 0.15, ya + inA); ls.lineTo(L.x1 - 0.15, ya + inA);
      ls.lineTo(L.x1 - 0.15, yb - inB); ls.lineTo(L.x0 + 0.15, yb - inB);
      ls.closePath();
      var lg = new THREE.ExtrudeGeometry(ls, { depth: 1.1, bevelEnabled: false });
      lg.translate(0, 0, FD_TOP - 1.1 + 0.02);
      Batch.addGroups(lg, [B.D, B.S]);
      /* the hangar opening behind it, and the two guide trunks            */
      var yo = L.s * (HB + 0.05);
      B.K.add(box(THREE, L.x1 - L.x0 - 1.0, 0.3, 7.6, (L.x0 + L.x1) * 0.5, yo, KNUCK + 3.9));
      for (j = 0; j < 2; j++) {
        var tx = j ? L.x1 - 0.9 : L.x0 + 0.9;
        B.S.add(box(THREE, 1.6, 2.6, FD_BOT - KNUCK, tx, yo + L.s * 1.25, (FD_BOT + KNUCK) * 0.5));
      }
      /* the open sill under the lift's outboard edge                      */
      B.M.add(box(THREE, L.x1 - L.x0 - 0.6, 0.25, 0.25, (L.x0 + L.x1) * 0.5, L.s * (HB + 0.4), KNUCK + 0.15));
    });

    /* ---------------------------- catwalks and safety nets round the edge */
    var n = DECK.length;
    function inNotch(a, b) {
      for (var k = 0; k < LIFTS.length; k++) {
        var L = LIFTS[k], ya = Math.min(L.y0, L.y1), yb = Math.max(L.y0, L.y1);
        var inx = function (q) { return q[0] >= L.x0 - 0.01 && q[0] <= L.x1 + 0.01; };
        var iny = function (q) { return q[1] >= ya - 0.01 && q[1] <= yb + 0.01; };
        if (inx(a) && inx(b) && iny(a) && iny(b)) return true;
      }
      return false;
    }
    for (i = 0; i < n; i++) {
      var a = DECK[i], b = DECK[(i + 1) % n];
      var dx = b[0] - a[0], dy = b[1] - a[1], L2 = Math.sqrt(dx * dx + dy * dy);
      if (L2 < 3 || inNotch(a, b)) continue;
      var ox = dy / L2, oy = -dx / L2, ang = Math.atan2(dy, dx);
      var reach = Math.max(Math.abs(a[0]), Math.abs(b[0])) + Math.abs(ox) * 3.6;
      if (Math.abs(ox) > 0.75 || reach > LOA * 0.5 - 0.1) continue;
      /* none along the island's foot                                       */
      var mx = (a[0] + b[0]) * 0.5, my = (a[1] + b[1]) * 0.5;
      B.S.add(box(THREE, L2, 1.5, 0.25, mx + ox * 0.9, my + oy * 0.9, FD_TOP - 1.45, 0, 0, ang));
      var net = new THREE.BoxGeometry(L2 - 0.4, 2.0, 0.08);
      net.rotateX(0.21);
      net.rotateZ(ang - PI);
      net.translate(mx + ox * 2.45, my + oy * 2.45, FD_TOP - 0.62);
      B.K.add(net);
      B.M.add(box(THREE, L2, 0.08, 0.08, mx + ox * 1.6, my + oy * 1.6, FD_TOP - 0.25, 0, 0, ang));
    }

    /* life-raft canister racks along the gallery                           */
    for (i = 0; i < n; i++) {
      var a3 = DECK[i], b3 = DECK[(i + 1) % n];
      var ex = b3[0] - a3[0], ey = b3[1] - a3[1], LE = Math.sqrt(ex * ex + ey * ey);
      if (LE < 18 || inNotch(a3, b3) || Math.abs(ey / LE) > 0.6) continue;
      var k3 = Math.floor(LE / 15), ea = Math.atan2(ey, ex);
      for (j = 0; j < k3; j++) {
        var f = (j + 0.5) / k3;
        var rx = a3[0] + ex * f + (ey / LE) * 0.5, ry = a3[1] + ey * f - (ex / LE) * 0.5;
        if (rx > ISL_X0 - 10 && rx < ISL_X1 + 2 && ry < 0) continue;
        B.S.add(box(THREE, 3.5, 2.3, 0.15, rx - (ey / LE) * 0.5, ry + (ex / LE) * 0.5, FD_TOP - 2.65, 0, 0, ea));
        for (var d3 = -1; d3 <= 1; d3++) {
          var can = new THREE.CylinderGeometry(0.5, 0.5, 1.15, 5);
          can.translate(d3 * 1.1, 0, 0.5);
          B.W.add(place(THREE, can, rx, ry, FD_TOP - 2.6, 0, 0, ea));
        }
      }
    }

    /* --------------------------------------------- stern and bow details
       The stern: an open fantail under the round-down, the enclosed
       gallery above it, and the transom (Magellan 2004, TR 1986).        */
    B.S.add(box(THREE, 3.8, 34.0, 4.6, -164.4, -3.0, FD_BOT - 2.3));
    B.G.add(box(THREE, 0.12, 30.0, 0.9, -166.32, -3.0, FD_BOT - 2.0));
    B.K.add(box(THREE, 0.3, 24.0, 5.6, HX0 - 0.1, -1.0, 9.0));
    B.M.add(box(THREE, 0.25, 24.0, 0.2, HX0 - 0.35, -1.0, 11.8));
    /* fantail rails and the boat boom stowed along the transom             */
    for (j = 0; j < 9; j++) B.M.add(box(THREE, 0.12, 0.12, 2.0, HX0 - 0.4, -12.0 + j * 2.75, 7.6));

    /* anchors and hawse pipes, one each bow                                */
    for (s = -1; s <= 1; s += 2) {
      var ya2 = sideRing(LEV, hg.KZ, 152.0, s)[LEV.length - 1][0];
      B.K.add(place(THREE, new THREE.CylinderGeometry(0.9, 0.9, 0.3, 10), 152.0, s * (ya2 + 0.25), 10.0, 0, 0, 0));
      B.M.add(box(THREE, 2.2, 0.5, 3.0, 151.0, s * (ya2 + 0.35), 7.8));
    }
    /* bilge keels                                                          */
    for (s = -1; s <= 1; s += 2) {
      var bk = lowY(LEV, 1, 0) + 0.5;
      B.U.add(box(THREE, 110.0, 0.35, 1.6, -5.0, s * bk, -10.0, s * 0.75, 0, 0));
    }
    /* four five-bladed screws on their shafts and struts, two rudders     */
    var SH = [[6.8, -7.8, -134.0], [14.8, -6.9, -140.0]];
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 2; i++) {
        var sy = s * SH[i][0], sz = SH[i][1], sx = SH[i][2];
        B.M.add(strut(THREE, -92.0, sy, sz + 2.2, sx - 0.8, sy, sz, 0.55, 6));
        B.M.add(strut(THREE, sx + 4.5, s * (SH[i][0] - 2.5), sz + 4.0, sx + 4.5, sy, sz, 0.35, 4));
        B.M.add(strut(THREE, sx + 4.5, s * (SH[i][0] + 2.5), sz + 4.0, sx + 4.5, sy, sz, 0.35, 4));
        B.M.add(place(THREE, new THREE.CylinderGeometry(0.55, 0.9, 1.8, 8).rotateZ(PI / 2), sx - 1.3, sy, sz));
        for (j = 0; j < 5; j++) {
          var bl = new THREE.BoxGeometry(0.35, 1.5, 2.8);
          bl.translate(0, 0, 1.7);
          bl.rotateZ(0.4);
          bl.rotateX(j * 2 * PI / 5);
          bl.translate(sx - 1.3, sy, sz);
          B.M.add(bl);
        }
      }
      B.M.add(box(THREE, 6.4, 0.8, 7.6, -149.5, s * 10.6, -5.6));
    }

    /* ----------------------------------------------------------- sponsons */
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
    function sponson(pts, ztop, depth, side) {
      pts = ccw(pts);
      B.S.add(plate(THREE, pts, ztop - 0.6, ztop));
      var yin = Math.min.apply(null, pts.map(function (q) { return Math.abs(q[1]); }));
      var knee = pts.map(function (q) { return [q[0], side * lerp(yin, Math.abs(q[1]), 0.25)]; });
      B.S.add(bracket(pts, knee, ztop - 0.6, ztop - 0.6 - depth));
      /* a rail round its outboard edges                                    */
      ringRail(scalePts(pts, 0.97), ztop + 1.0);
    }
    var ZS = FD_TOP - 4.6;          /* TR 1986: the forward sponson 4.5 m under the deck */
    /* starboard forward: the low sponson at x 89-111 outboard of the bow
       cut, its box launcher in both 1986 broadsides and in 2005           */
    sponson([[89.0, -18.6], [111.0, -17.4], [110.0, -22.0], [104.0, -28.8], [89.0, -28.8]], ZS, 6.0, -1);
    emit(mk29Parts(THREE), 101.5, -24.0, ZS, -PI * 0.36);
    emit(mk95Parts(THREE), 93.0, -26.0, ZS, -PI * 0.5);
    /* port forward: under the angled deck's diagonal, x 54-89 (TR 1986 port
       beam); it carries the launcher and a Phalanx                         */
    sponson([[60.0, 38.0], [86.0, 20.6], [92.0, 20.0], [92.0, 27.5], [70.0, 42.5], [60.0, 42.5]], ZS, 6.0, 1);
    if (late) emit(ramParts(THREE), 84.0, 26.0, ZS, PI * 0.30);
    else emit(mk29Parts(THREE), 82.5, 27.0, ZS, PI * 0.30);
    if (!late) {
      emit(phalanxParts(THREE), 66.0, 40.0, ZS, PI * 0.45);
      emit(mk95Parts(THREE), 74.0, 35.0, ZS, PI * 0.35);
    }
    /* port after: under the angled deck's edge, forward of lift 4          */
    sponson([[-124.0, 37.2], [-104.0, 37.2], [-106.0, 45.0], [-122.0, 45.0]], ZS, 6.0, 1);
    if (late) {
      /* Reagan 2004 (San Diego and Magellan, both from the PORT quarter):
         a box launcher low on this sponson and a white-domed mount on a
         higher platform forward of it                                      */
      emit(ramParts(THREE), -118.0, 41.4, ZS, PI * 0.62);
      B.S.add(plate(THREE, [[-108.0, 38.2], [-100.0, 38.2], [-100.5, 43.6], [-107.5, 43.6]], FD_TOP - 2.2, FD_TOP - 1.6));
      emit(phalanxParts(THREE), -104.0, 41.0, FD_TOP - 1.6, PI * 0.55);
    } else emit(phalanxParts(THREE), -114.0, 41.6, ZS, PI * 0.6);
    /* starboard after: the quarter sponson outboard of the cut-back corner,
       the box launcher low on it in 2004, a white dome on the upper deck   */
    sponson([[-152.0, -27.6], [-127.0, -31.0], [-129.0, -39.6], [-150.0, -36.8]], ZS, 6.5, -1);
    emit(mk29Parts(THREE), -143.5, -33.6, ZS, -PI * 0.62);
    emit(mk95Parts(THREE), -133.0, -35.6, ZS, -PI * 0.5);
    emit(phalanxParts(THREE), -151.0, -26.2, FD_TOP - 1.6, -PI * 0.75);
    B.S.add(plate(THREE, [[-154.5, -23.2], [-148.0, -24.6], [-148.0, -29.2], [-154.5, -28.0]], FD_TOP - 2.2, FD_TOP - 1.6));
    /* the fourth mount: starboard bow, on its own platform at the cut (the
       white dome on that corner in the 2005 bow-on view)                    */
    B.S.add(plate(THREE, [[112.5, -16.6], [119.0, -16.2], [119.0, -21.0], [112.5, -21.0]], FD_TOP - 2.2, FD_TOP - 1.6));
    emit(phalanxParts(THREE), 116.0, -19.0, FD_TOP - 1.6, -PI * 0.4);

    /* --------------------------------------------------------- deck gear */
    /* bow blast deflectors raised, hinged on the forward edge             */
    [[-12.7], [3.4]].forEach(function (c) {
      var jb = box(THREE, 4.0, 11.0, 0.3, 0, 0, 0);
      jb.translate(-2.0, 0, 0.15);
      jb.rotateY(0.96);
      jb.translate(61.6, c[0] - 0.0, FD_TOP);
      B.D.add(jb);
      for (var k = -1; k <= 1; k += 2)
        B.M.add(strut(THREE, 60.7, c[0] + k * 3.5, FD_TOP, 59.6, c[0] + k * 3.5, FD_TOP + 2.1, 0.18, 4));
      B.K.add(place(THREE, new THREE.CylinderGeometry(0.22, 0.22, 11.0, 6), 61.6, c[0], FD_TOP + 0.05));
    });
    /* the arresting pendants, raised a hand's breadth on their springs     */
    pendants(P).forEach(function (sw) {
      var pa = la(sw, -LA_HW - 0.6), pb = la(sw, LA_HW + 0.6);
      B.M.add(strut(THREE, pa[0], pa[1], FD_TOP + 0.12, pb[0], pb[1], FD_TOP + 0.12, 0.09, 4));
      [pa, pb].forEach(function (pe) {
        B.K.add(place(THREE, new THREE.BoxGeometry(0.9, 1.2, 0.2), pe[0], pe[1], FD_TOP + 0.1, 0, 0, ANG));
      });
    });
    /* the optical landing aid on the port edge abeam the wires, and the
       LSO platform aft of it                                               */
    B.S.add(box(THREE, 4.0, 3.0, 0.3, -88.0, 39.6, FD_TOP - 0.2));
    B.S.add(box(THREE, 1.4, 1.6, 3.0, -88.0, 39.4, FD_TOP + 1.5));
    B.W.add(box(THREE, 0.3, 1.3, 2.4, -87.25, 39.4, FD_TOP + 1.7));
    B.M.add(box(THREE, 0.3, 6.6, 0.3, -87.4, 39.4, FD_TOP + 1.8));
    B.S.add(plate(THREE, [[-128.0, 38.2], [-120.0, 38.2], [-120.0, 42.0], [-128.0, 42.0]], FD_TOP - 1.4, FD_TOP - 1.0));
    /* whips along the starboard deck edge, and the tall one at x 72 the
       1986 broadside shows forward of lift 1                               */
    B.M.add(strut(THREE, 72.0, -37.6, FD_TOP - 1.0, 72.0, -37.6, FD_TOP + 13.0, 0.18, 5, 0.08));
    [-130, -20, 45].forEach(function (wx) {
      B.M.add(strut(THREE, wx, -37.9, FD_TOP - 1.0, wx, -38.8, FD_TOP + 6.5, 0.07, 4));
    });
    [-60, 0, 40].forEach(function (wx) {
      B.M.add(strut(THREE, wx, 41.0, FD_TOP - 1.0, wx, 42.0, FD_TOP + 6.0, 0.07, 4));
    });
    /* team flashes on the bow and the round-down                           */
    B.T.add(box(THREE, 2.0, 20.0, 0.2, 165.2, -0.5, FD_TOP + 0.1));
    B.T.add(box(THREE, 2.0, 18.0, 0.2, -165.0, -2.5, FD_TOP + 0.1));

    /* ------------------------------------------------------------ island */
    if (late) islandReagan(); else islandEarly();

    function islandBase(top) {
      var base = [[ISL_X1, ISL_YO], [ISL_X1, ISL_YI - 1.5], [ISL_X1 - 1.5, ISL_YI],
                  [ISL_X0 + 1.0, ISL_YI], [ISL_X0, ISL_YI - 1.0], [ISL_X0, ISL_YO]];
      var Z0 = FD_TOP;
      B.S.add(frustum(THREE, base, Z0, Z0 + top, 1.0, 0.99));
      /* the flight-deck control windows low on the inboard face, and the
         doors along the foot                                               */
      B.G.add(box(THREE, 9.0, 0.3, 1.0, -52.0, ISL_YI + 0.1, Z0 + 2.9));
      for (var k = 0; k < 4; k++) B.K.add(box(THREE, 1.0, 0.25, 2.1, -68.0 + k * 7.5, ISL_YI + 0.05, Z0 + 1.05));
      /* the horizontal deck lines that band the block in the broadsides    */
      for (var lv = 1; lv < 5; lv++) {
        var zl = Z0 + lv * top / 5;
        B.K.add(frustum(THREE, base, zl - 0.12, zl + 0.05, 1.004, 1.004));
      }
      /* team band at the head of the block                                 */
      B.T.add(frustum(THREE, base, Z0 + top - 1.3, Z0 + top - 0.2, 1.012, 1.008));
      return base;
    }
    /* a glazed tier: a plate block with a window band round its forward
       end and sides, and the visor over it                                 */
    function tier(x0, x1, yo, yi, z0, z1, glassAft) {
      var pl = [[x1, yo], [x1, yi + 0.8], [x1 - 0.8, yi], [x0, yi], [x0, yo]];
      B.S.add(frustum(THREE, pl, z0, z1, 1.0, 0.985));
      var zg = z0 + (z1 - z0) * 0.40, hg2 = (z1 - z0) * 0.38;
      B.G.add(box(THREE, 0.25, yi - yo - 0.6, hg2, x1 + 0.08, (yo + yi) * 0.5, zg + hg2 * 0.5));
      B.G.add(box(THREE, (x1 - x0) * 0.7, 0.25, hg2, x1 - (x1 - x0) * 0.36, yi + 0.06, zg + hg2 * 0.5));
      B.G.add(box(THREE, (x1 - x0) * 0.7, 0.25, hg2, x1 - (x1 - x0) * 0.36, yo - 0.06, zg + hg2 * 0.5));
      if (glassAft) B.G.add(box(THREE, 0.25, yi - yo - 0.6, hg2, x0 - 0.08, (yo + yi) * 0.5, zg + hg2 * 0.5));
      B.S.add(plate(THREE, [[x1 + 0.7, yo - 0.4], [x1 + 0.7, yi + 0.4], [x0, yi + 0.4], [x0, yo - 0.4]], z1 - 0.15, z1 + 0.15));
    }
    /* the SPS-48 planar array: a frequency-scanned face leaning back, the
       serpentine feed along its top                                        */
    function sps48(x, y, z, hdg, sz) {
      var parts = [
        ["S", cylZ(THREE, 0.6, 0.8, 1.4, 8, 0, 0, 0)],
        ["S", box(THREE, 1.2, 1.2, 1.2, 0, 0, 1.8)],
        ["R", box(THREE, 0.35, sz, sz * 0.92, 0.6, 0, 2.4 + sz * 0.46, 0, -0.26, 0)],
        ["S", box(THREE, 0.9, sz + 0.2, 0.55, 0.15, 0, 2.4 + sz * 0.92, 0, -0.26, 0)],
        ["M", strut(THREE, -0.4, 0, 2.2, 0.2, 0, 2.4 + sz * 0.8, 0.09, 4)],
      ];
      emit(parts, x, y, z, hdg);
    }
    /* the SPS-49: an open curved reflector on a pedestal, its feed on two
       booms in front                                                       */
    function sps49(x, y, z, hdg) {
      var parts = [["S", cylZ(THREE, 0.55, 0.7, 1.1, 8, 0, 0, 0)]];
      for (var k = -3; k <= 3; k++) {
        var aa = k * 0.13;
        parts.push(["R", box(THREE, 0.18, 1.12, 4.1, -Math.cos(aa) * 0.4 + 0.4, Math.sin(aa) * 4.3, 3.2, 0, -0.10, -aa)]);
      }
      parts.push(["M", strut(THREE, 0.0, -0.8, 1.6, 2.4, 0, 2.6, 0.07, 4)]);
      parts.push(["M", strut(THREE, 0.0, 0.8, 1.6, 2.4, 0, 2.6, 0.07, 4)]);
      parts.push(["S", box(THREE, 0.5, 0.6, 0.6, 2.5, 0, 2.6)]);
      emit(parts, x, y, z, hdg);
    }
    /* a square lattice tower: four raked legs with cross bracing           */
    function lattice(x, y, z0, z1, w0, w1, bays) {
      var k, h = z1 - z0, cs = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
      for (k = 0; k < 4; k++) {
        B.M.add(strut(THREE, x + cs[k][0] * w0 / 2, y + cs[k][1] * w0 / 2, z0,
                             x + cs[k][0] * w1 / 2, y + cs[k][1] * w1 / 2, z1, 0.16, 4));
      }
      for (var bb = 0; bb < bays; bb++) {
        var za = z0 + h * bb / bays, zb = z0 + h * (bb + 1) / bays;
        var wa = lerp(w0, w1, bb / bays) / 2, wb = lerp(w0, w1, (bb + 1) / bays) / 2;
        for (k = 0; k < 4; k++) {
          var c0 = cs[k], c1 = cs[(k + 1) % 4];
          B.M.add(strut(THREE, x + c0[0] * wa, y + c0[1] * wa, za, x + c1[0] * wb, y + c1[1] * wb, zb, 0.07, 3));
          B.M.add(strut(THREE, x + c0[0] * wb, y + c0[1] * wb, zb, x + c1[0] * wb, y + c1[1] * wb, zb, 0.07, 3));
        }
      }
    }

    /* 1980s and 1990s: the island as the TR 1986 broadside and the 1993
       bow view show it. The main block to 13.7 m, then the flag and
       navigation bridge tiers and pri-fly to the roof at 23.6 m; the pole
       mast with two yards, the SPS-48 on its platform at the forward end,
       and the separate lattice mast with the SPS-49 abaft the island.     */
    function islandEarly() {
      var Z0 = FD_TOP;
      var base = islandBase(8.0);
      var Z1 = Z0 + 8.0;
      /* the flag and navigation bridge tiers stand a little proud of the
         block fore and aft, as the broadside shows                          */
      tier(-71.6, -40.0, -38.6, -27.4, Z1, Z1 + 2.9, false);
      tier(-69.0, -40.4, -38.2, -27.8, Z1 + 2.9, Z1 + 5.6, false);
      /* bridge wings out over the deck edge and the deck                    */
      B.S.add(plate(THREE, rect(-46.0, -41.0, -41.6, -24.8), Z1 + 2.95, Z1 + 3.3));
      ringRail(rect(-45.8, -41.2, -41.4, -25.0), Z1 + 4.2);
      /* pri-fly at the after end, glazed aft and to port over the landing
         area, and the plated house forward of it                            */
      tier(-67.0, -56.0, -37.2, -28.6, Z1 + 5.6, Z1 + 7.9, true);
      B.S.add(frustum(THREE, rect(-56.0, -44.0, -37.0, -29.0), Z1 + 5.6, Z1 + 7.5, 1.0, 0.97));
      var Z4 = Z1 + 7.9;
      B.S.add(plate(THREE, rect(-67.5, -43.0, -37.6, -28.2), Z4 - 0.1, Z4 + 0.25));
      ringRail(rect(-67.3, -43.2, -37.4, -28.4), Z4 + 1.2);
      /* the radar platform forward and the SPS-48 on it                     */
      B.S.add(frustum(THREE, rect(-50.0, -43.5, -36.0, -30.2), Z4 + 0.25, Z4 + 0.8, 1.0, 0.96));
      sps48(-47.0, -33.0, Z4 + 0.8 - 1.2, -0.35, 4.8);
      /* the pole mast: a tapered tube from the roof, two yards, platforms,
         the TACAN and the whip at the head (masthead 47 m above the deck) */
      var MX = -56.5, MY = -33.2;
      B.S.add(cylZ(THREE, 0.42, 0.85, Z0 + 32.5 - Z4, 8, MX, MY, Z4));
      B.S.add(box(THREE, 1.6, 14.0, 0.35, MX, MY, Z0 + 26.8));
      ringRail(rect(MX - 0.7, MX + 0.7, MY - 6.9, MY + 6.9), Z0 + 27.8);
      B.S.add(box(THREE, 1.2, 10.0, 0.3, MX, MY, Z0 + 31.4));
      for (s = -1; s <= 1; s += 2) {
        B.M.add(strut(THREE, MX, MY + s * 0.7, Z0 + 24.0, MX, MY + s * 5.8, Z0 + 26.6, 0.12, 4));
        B.M.add(strut(THREE, MX, MY + s * 0.5, Z0 + 29.6, MX, MY + s * 4.2, Z0 + 31.25, 0.10, 4));
        B.W.add(sphere(THREE, 0.45, 8, 5, MX, MY + s * 6.2, Z0 + 27.4));
        B.M.add(strut(THREE, MX + 0.4, MY + s * 3.5, Z0 + 27.0, MX + 0.4, MY + s * 3.5, Z0 + 29.4, 0.05, 4));
        B.S.add(box(THREE, 1.0, 0.6, 1.4, MX, MY + s * 0.9, Z0 + 21.0));
        /* the signal yards' halyard spreaders off the lower mast            */
        B.M.add(strut(THREE, MX, MY, Z0 + 22.4, MX + 0.2, MY + s * 3.0, Z0 + 23.0, 0.06, 4));
      }
      B.S.add(place(THREE, new THREE.CylinderGeometry(1.6, 1.6, 0.3, 8).rotateX(PI / 2), MX, MY, Z0 + 29.2));
      B.S.add(cylZ(THREE, 0.3, 0.42, 2.6, 8, MX, MY, Z0 + 32.5));
      B.S.add(cylZ(THREE, 0.8, 0.8, 1.1, 10, MX, MY, Z0 + 35.1));
      B.M.add(strut(THREE, MX, MY, Z0 + 36.2, MX, MY, Z0 + 42.5, 0.13, 5, 0.06));
      /* the whip abaft the mast that stands clear of the top yard          */
      B.M.add(strut(THREE, MX - 0.6, MY + 2.6, Z0 + 31.5, MX - 0.6, MY + 2.6, Z0 + 38.0, 0.06, 4, 0.03));
      /* the small air-traffic radar on the island's after face             */
      B.S.add(box(THREE, 2.2, 3.0, 0.35, -71.6, -33.5, Z0 + 6.6));
      B.R.add(box(THREE, 0.3, 2.6, 1.0, -72.2, -33.5, Z0 + 7.4, 0, 0.2, 0));
      /* the lattice radar mast abaft the island, on the deck edge: a low
         house at its foot, 13 m of tower and the SPS-49 reflector on top,
         its middle 17 m above the deck (TR 1986, x -79)                    */
      B.S.add(frustum(THREE, rect(-81.6, -76.6, -38.0, -32.6), Z0, Z0 + 3.2, 1.0, 0.98));
      lattice(-79.2, -35.2, Z0 + 3.2, Z0 + 15.8, 3.2, 1.4, 5);
      B.S.add(plate(THREE, rect(-80.5, -77.9, -36.5, -33.9), Z0 + 15.8, Z0 + 16.2));
      sps49(-79.2, -35.2, Z0 + 16.2, PI * 0.82);
      /* the island's outboard face: the vertical ladder trunk and the
         uptake vents the broadside shows as dark panels; whips and small
         antennas round the roof edge                                        */
      B.S.add(box(THREE, 2.4, 1.2, 8.0, -61.0, ISL_YO - 0.6, Z0 + 4.0));
      B.S.add(box(THREE, 2.0, 1.0, 7.6, -50.0, ISL_YO - 0.5, Z0 + 3.8));
      for (var vk = 0; vk < 3; vk++) B.K.add(box(THREE, 3.2, 0.12, 1.6, -66.5 + vk * 6.5, ISL_YO - 0.06, Z0 + 6.2));
      [[-66.5, -37.0], [-66.5, -28.8], [-44.0, -37.2], [-44.0, -28.6]].forEach(function (q) {
        B.M.add(strut(THREE, q[0], q[1], Z4 + 0.25, q[0], q[1], Z4 + 5.0, 0.05, 4, 0.025));
      });
      B.S.add(cylZ(THREE, 0.5, 0.6, 1.2, 8, -61.0, -36.6, Z4 + 0.25));
      B.R.add(place(THREE, new THREE.CylinderGeometry(0.9, 0.9, 0.25, 12).rotateZ(PI / 2), -61.0, -36.6, Z4 + 2.0));
      if (P === "e90") {
        /* the two SATCOM domes on the roof's after corners: the white disc
           on the island in the TR 1993 overhead                            */
        [[-65.0, -36.2], [-65.0, -29.6]].forEach(function (d) {
          B.S.add(cylZ(THREE, 0.9, 1.1, 0.9, 8, d[0], d[1], Z4 + 0.25));
          B.W.add(sphere(THREE, 1.5, 12, 7, d[0], d[1], Z4 + 2.5));
        });
      }
      return base;
    }

    /* Reagan, 2004: the reworked island. The main block and three glazed
       tiers carry a heavy three-yard tower mast in place of the pole; the
       SPS-48E stands on its own pedestal at the forward end and the SPS-49
       on the after platform, so there is no separate lattice mast on the
       deck; white SATCOM domes stand on the forward roof and on the after
       corners (San Diego and Magellan, 2004).                            */
    function islandReagan() {
      var Z0 = FD_TOP;
      islandBase(7.8);
      var Z1 = Z0 + 7.8;
      tier(-71.6, -40.0, -38.6, -27.4, Z1, Z1 + 3.0, false);
      tier(-69.0, -40.6, -38.2, -27.8, Z1 + 3.0, Z1 + 5.9, false);
      B.S.add(plate(THREE, rect(-46.0, -41.0, -41.6, -24.8), Z1 + 3.05, Z1 + 3.4));
      ringRail(rect(-45.8, -41.2, -41.4, -25.0), Z1 + 4.3);
      tier(-67.0, -46.0, -37.4, -28.4, Z1 + 5.9, Z1 + 8.6, true);
      var Z4 = Z1 + 8.6;
      B.S.add(plate(THREE, rect(-67.0, -43.0, -37.8, -28.0), Z4 - 0.1, Z4 + 0.25));
      ringRail(rect(-66.8, -43.2, -37.6, -28.2), Z4 + 1.2);
      /* the SPS-48E on its pedestal forward                                */
      B.S.add(frustum(THREE, rect(-48.0, -43.5, -35.4, -30.6), Z4 + 0.25, Z4 + 2.4, 1.0, 0.9));
      sps48(-45.8, -33.0, Z4 + 2.4, -0.3, 5.0);
      /* the tower mast: a tapered square shaft, three yards with walkways
         and the platforms the Magellan view shows, the topmast above       */
      var MX = -56.5, MY = -33.0, MZ0 = Z4 + 0.25, MZ1 = Z0 + 37.5;
      var mg = new THREE.CylinderGeometry(1.0, 2.0, MZ1 - MZ0, 4, 1);
      mg.rotateY(PI / 4); mg.rotateX(PI / 2);
      mg.translate(MX, MY, (MZ0 + MZ1) * 0.5);
      B.S.add(mg);
      [[Z0 + 26.0, 16.0], [Z0 + 30.6, 14.0], [Z0 + 35.0, 11.0]].forEach(function (yd) {
        B.S.add(box(THREE, 2.0, yd[1], 0.4, MX, MY, yd[0]));
        ringRail(rect(MX - 0.9, MX + 0.9, MY - yd[1] / 2 + 0.1, MY + yd[1] / 2 - 0.1), yd[0] + 1.0);
        for (var ss = -1; ss <= 1; ss += 2) {
          B.M.add(strut(THREE, MX, MY + ss * 1.0, yd[0] - 2.6, MX, MY + ss * yd[1] * 0.38, yd[0] - 0.2, 0.12, 4));
          B.W.add(sphere(THREE, 0.45, 8, 5, MX, MY + ss * (yd[1] / 2 - 0.6), yd[0] + 0.65));
          B.M.add(strut(THREE, MX + 0.5, MY + ss * yd[1] * 0.3, yd[0] + 0.2, MX + 0.5, MY + ss * yd[1] * 0.3, yd[0] + 2.6, 0.05, 4));
        }
      });
      for (s = -1; s <= 1; s += 2) {
        B.S.add(box(THREE, 1.2, 0.5, 1.6, MX, MY + s * 1.6, Z0 + 23.5));
        B.S.add(box(THREE, 0.5, 1.2, 1.4, MX + s * 1.3, MY, Z0 + 28.5));
      }
      B.S.add(cylZ(THREE, 0.55, 0.8, 4.0, 8, MX, MY, MZ1));
      B.S.add(cylZ(THREE, 0.95, 0.95, 1.2, 10, MX, MY, MZ1 + 4.0));
      B.M.add(strut(THREE, MX, MY, MZ1 + 5.2, MX, MY, Z0 + 47.5, 0.14, 5, 0.06));
      /* the after platform with the SPS-49 and the air-traffic radars      */
      B.S.add(frustum(THREE, rect(-70.5, -64.0, -37.4, -29.0), Z4 + 0.25, Z4 + 3.4, 1.0, 0.9));
      lattice(-67.2, -33.2, Z4 + 3.4, Z4 + 7.6, 3.0, 2.0, 2);
      B.S.add(plate(THREE, rect(-69.4, -65.0, -35.6, -30.8), Z4 + 7.6, Z4 + 8.0));
      sps49(-67.2, -33.2, Z4 + 8.0, PI * 0.82);
      /* SATCOM domes: the big pair on the forward roof corners and the
         three smaller on the after corners and the platform               */
      [[-44.8, -37.6, 1.9], [-44.8, -28.2, 1.9]].forEach(function (d) {
        B.S.add(cylZ(THREE, 1.0, 1.2, 0.9, 8, d[0], d[1], Z1 + 5.9));
        B.W.add(sphere(THREE, d[2], 12, 7, d[0], d[1], Z1 + 5.9 + 0.9 + d[2] * 0.75));
      });
      [[-70.0, -38.6, 1.3, Z1 + 3.0], [-62.0, -39.6, 1.3, Z1 + 5.9], [-68.4, -27.2, 1.2, Z4 + 0.25]].forEach(function (d) {
        B.S.add(box(THREE, 2.6, 2.6, 0.35, d[0], d[1], d[3] + 0.17));
        B.W.add(sphere(THREE, d[2], 10, 6, d[0], d[1], d[3] + 0.35 + d[2] * 0.8));
      });
      /* the low annex abaft the island at deck level                        */
      B.S.add(frustum(THREE, rect(-78.0, -71.0, -37.8, -31.5), Z0, Z0 + 5.5, 1.0, 0.98));
    }

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

/* Registration: one builder, three periods, each under its own row. len is
   the measured X extent, the 332.8 m flight deck.                         */
UNIT_MODELS["nato_e80_carrier"] = {
  len: 332.8,
  build: function (THREE, M, C) { return HeroNimitzCVN.build(THREE, M, C, "e80"); }
};
UNIT_MODELS["nato_e90_carrier"] = {
  len: 332.8,
  build: function (THREE, M, C) { return HeroNimitzCVN.build(THREE, M, C, "e90"); }
};
UNIT_MODELS["nato_e00_carrier"] = {
  len: 332.8,
  build: function (THREE, M, C) { return HeroNimitzCVN.build(THREE, M, C, "e00"); }
};
