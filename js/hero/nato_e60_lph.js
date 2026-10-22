/* ============================================================================
   nato_e60_lph.js -- HERO model: USS Iwo Jima (LPH-2), lead ship of the
   Iwo Jima class, as built and as she sailed in the early 1960s: the first
   ship designed from the keel up to put Marines ashore by helicopter.
   Registered as nato_e60_lph (the def's own key), so no other ship changes.

   Published figures (en.wikipedia "Iwo Jima-class amphibious assault ship";
   Friedman, U.S. Amphibious Ships and Craft): 592 ft (180.4 m) overall,
   84 ft (25.6 m) on the waterline, 105 ft (32 m) across the flight deck,
   27 ft (8.2 m) draught, one shaft, 18,474 t full load, no well deck.
   USNI Proceedings, Nov 1963: four twin 3in/50 as built, two in tandem
   forward of the island and one on each stern quarter (Sea Sparrow
   replaced two in 1970-74, after this period).

   No scale drawing of the class is on Wikimedia Commons, so the plan and
   profile are measured off these photographs (US Navy / USMC, Wikimedia
   Commons), read against the published length and deck width:
     [P] "USS Iwo Jima, Formal Entrance into Pearl Harbor, 1962": high and
         nearly square to her PORT side, bow LEFT. The whole ship at 4.4 px
         per metre: deck ends, island x +8.6..-14.4, the gun tubs, both
         lifts, the waterline stem 6 m abaft the deck tip, the mast height.
     [O] "USS Iwo Jima on Way to Pearl Harbor, 1962": nearly straight down
         on the waist, bow left, starboard up. The 1962 spot circles (57 ft
         rings in two staggered rows), the port lift and its chamfered
         deck cut, the two gun tubs in tandem ON the starboard deck edge.
     [T] "USS Iwo Jima (LPH-2) with tug c1962": port quarter from above.
         The stern: a flat upper face, a wineglass transom narrowing to the
         waterline, two big stern ports, the quarter gun tubs set into the
         corners under the deck; the starboard lift abaft the island.
     [F] "USS Iwo Jima, Flight Deck Tan, 1962": the island's forward face
         with its chamfered corners and two window bands, the tandem twin
         3in/50 mounts in their shields, the BEDSPRING at the masthead.
     [B] "...during tests with white flight deck c1967": from ahead and
         above: the blunt round bow deck over a flared, raked stem; port
         lift forward, starboard lift aft of the island.
     [S] "USS Iwo Jima (LPH-2) aft" (1965) and "...at sea c1966": the
         stern tubs, the flare of the topsides, the hangar opening behind
         the port lift, the catwalks and raft racks under the deck edge.
     [N] "Uss iwo jima (LPH-2) 4" (1961): starboard bow, the Essex-like
         flare carried right up to the deck, the curved raked stem.

   RECOGNITION LIST (each must read at game zoom):
     1. One long flush deck, 180 x 32 m, with a BLUNT ROUND BOW and a
        square stern [P][B] -- no angled deck, no catapults, no wires.
     2. The island on the starboard edge just abaft amidships, 23 m long,
        in stepped tiers with window bands and chamfered forward corners
        [P][F]; its uptake rising as a short stack at the after end [T].
     3. A single pole mast off the island roof with yards and a BEDSPRING
        air-search array at its head, an SPS-10 type bar below [F].
     4. PORT deck-edge lift centred abreast the island's forward face and
        partly forward of it, STARBOARD lift abaft the island, each a plate
        hung outboard of a shallow chamfered cut in the deck edge, the
        hangar opening dark in the hull side behind it [O][P][T][B].
     5. Two twin 3in/50 mounts in round tubs, in tandem, on the starboard
        deck edge forward of the island [O][F][P].
     6. Two more twin 3in/50 in round tubs set into the STERN CORNERS
        under the deck, each on a conical knee [T][S].
     7. The stern: flat upper face, a wineglass transom narrowing to the
        waterline, two large stern ports [T][S].
     8. A strongly flared, Essex-like bow carried up to the flight deck,
        over a curved raked stem with no bulb [N][B][P].
     9. Topsides that flare from the hangar deck out to the deck edge,
        catwalks, nets and white raft racks along it [S][P].
    10. 1962 deck markings: big spot rings in two staggered rows on dark
        deck grey [O][T]. No hull number, name or flags are drawn.
    11. One screw, one rudder, a skeg [published: one shaft].

   NOT CONFIRMED, drawn as estimates: the deck height (18.3 m); the lift
   platforms' size (no published figure; about 18.5 x 12.4 m off [O][P],
   the starboard one taken as the same); the mast and island heights (off
   [P] and [F], +-1.5 m); the hull lines below the waterline (no drawing:
   the table is fitted to the published length, beam, draught and
   displacement); the stern corners of the deck cut back 3 m over the
   quarter tubs so they show from above as in [S]; the small director on
   the island roof (a shape in [F], type unknown); the crane abaft the
   island [T]; the whip positions. LEFT OUT: hull number, name, flags; the
   1970s Sea Sparrow, Phalanx and SATCOM fits; parked aircraft.

   STATION TABLE (half-breadths in metres; levels in metres above the
   waterline) -- the loft below. The waterline is 171.6 m (stem at +84.0,
   transom at -87.6 [P]); the hull below it measures 18,700 m3 by signed
   volume (19,170 t) against 18,474 t full load. The first cut, a full
   merchant-style body, measured 28,500 t. Above the hangar deck (8.6)
   the sides flare out to 0.9 m inside the deck edge.

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0, keel -8.2,
   flight deck 18.3 (estimate). The X extent is the deck, so nothing sticks
   out past either end of it. The deck is one flat plate with nothing
   parked on it: the helicopters come from the deck-park code.

   Every static part is merged into ONE mesh per material. No mount is
   named "turret": the def has no turret:true. Team colour is exactly
   C.team, two up-facing deck flashes and a band round the stack head.
   ASCII only.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroLPH2 = (function () {
  "use strict";

  var PI = Math.PI;

  /* ---------------------------------------------------- principal dimensions */
  var LOA    = 180.4;              /* flight deck end to end: x -90.2..90.2     */
  var DEXT   = 90.2;
  var DHW    = 16.0;               /* half the 105 ft deck                      */
  var FD_TOP = 18.3;               /* deck above the waterline (estimate)       */
  var FD_TH  = 0.9;
  var FD_BOT = FD_TOP - FD_TH;     /* 17.4: gallery deck, top of the hull loft  */
  var KEEL   = -8.2;               /* 27 ft                                     */
  var KNUCK  = 8.6;                /* hangar deck: where the flare starts       */
  var HX0 = -87.6, HX1 = 89.7;     /* hull: transom at the waterline, stem head */
  var OVH = 0.9;                   /* deck overhang past the hull top           */
  var TRAKE = 0.3;                 /* transom rake, waterline to gallery deck   */

  /* deck half-breadth: straight to x 60, then a blunt superellipse to the
     round bow [P][B]; the stern square with small chamfers                  */
  var BOW0 = 60.0;
  function hwAt(x) {
    if (x > BOW0) {
      var t = Math.min(1, (x - BOW0) / (DEXT - BOW0));
      return DHW * Math.pow(Math.max(0, 1 - Math.pow(t, 2.3)), 1 / 2.3);
    }
    return DHW;
  }

  /* deck-edge lifts. [O]: the port one runs from abreast the forward gun
     tub to a quarter of the way down the island, its platform about 18.5 m
     long [O][P], set into a 2 m cut in the deck edge with chamfered ends
     and reaching some 10 m outboard [P]; [P][T]: the starboard one abaft
     the island, taken as the same size. No published lift size found.    */
  var LIFTS = [
    { x0:   1.5, x1:  20.0, yi:  14.0, yo:  26.4, s:  1 },
    { x0: -46.5, x1: -28.0, yi: -14.0, yo: -26.4, s: -1 },
  ];
  /* the forward gun sponson cut, starboard edge [O]                         */
  var GSX0 = 9.4, GSX1 = 25.6, GSY = -14.6;

  var DECK = (function () {
    var pts = [], x, i, bow = [];
    for (i = 0; i <= 14; i++) {
      var t = i / 14;
      bow.push(DEXT - (DEXT - BOW0) * Math.pow(t, 1.6));
    }
    /* bow, down the port side (bow tip first) */
    for (i = 0; i < bow.length; i++) pts.push([bow[i], hwAt(bow[i])]);
    pts.push([LIFTS[0].x1 + 2.0, DHW], [LIFTS[0].x1, LIFTS[0].yi], [LIFTS[0].x0, LIFTS[0].yi], [LIFTS[0].x0 - 2.0, DHW]);
    /* the stern corners are cut back over the quarter tubs, which [S] and
       the 1966 aerial show standing clear of the deck from above          */
    pts.push([-86.8, DHW], [-DEXT, DHW - 3.2]);
    pts.push([-DEXT, -DHW + 3.2], [-86.8, -DHW]);
    pts.push([LIFTS[1].x0 - 2.0, -DHW], [LIFTS[1].x0, LIFTS[1].yi], [LIFTS[1].x1, LIFTS[1].yi], [LIFTS[1].x1 + 2.0, -DHW]);
    pts.push([GSX0, -DHW], [GSX0, GSY], [GSX1 - 1.0, GSY], [GSX1, -DHW]);
    for (i = bow.length - 1; i >= 1; i--) pts.push([bow[i], -hwAt(bow[i])]);
    return pts;
  })();

  /* island: x -14.4..8.6 [P], inboard face 8 m in from the edge [O]       */
  var ISL_X0 = -14.4, ISL_X1 = 8.6, ISL_YO = -16.7, ISL_YI = -8.2;

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

  /* largest |y| of the deck outline on one side (+1 port, -1 starboard) at
     station x. Inside a lift cut that is the cut's inner edge.             */
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

  /* closed frustum on a convex plan, bottom at zb, top scaled by sTop about
     the centroid at zt; UVs in metres / 16 for the plate texture           */
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
  /* an outline grown outward by d metres, edge by edge (convex, ccw)        */
  function grow(pts, d) {
    pts = ccw(pts);
    var n = pts.length, out = [], i;
    for (i = 0; i < n; i++) {
      var p0 = pts[(i + n - 1) % n], p1 = pts[i], p2 = pts[(i + 1) % n];
      var ax = p1[0] - p0[0], ay = p1[1] - p0[1], la = Math.sqrt(ax * ax + ay * ay);
      var bx = p2[0] - p1[0], by = p2[1] - p1[1], lb = Math.sqrt(bx * bx + by * by);
      var n0x = ay / la, n0y = -ax / la, n1x = by / lb, n1y = -bx / lb;
      var mx = n0x + n1x, my = n0y + n1y, ml = Math.sqrt(mx * mx + my * my) || 1;
      mx /= ml; my /= ml;
      var k = d / Math.max(0.35, mx * n1x + my * n1y);
      out.push([p1[0] + mx * k, p1[1] + my * k]);
    }
    return out;
  }

  /* ============================================================= textures */
  /* 1960s haze grey topsides and island, deck grey, red below the boot top */
  var PAINT = { hull: 0x737b83, sup: 0x7c848b, deck: 0x45494d };

  function hullTex(THREE, zTop, zBot, H, seed) {
    var W = 2048, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(seed), i, x, y, z, len, gr;
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
    band(0, zBot, "#5c2c28");
    for (i = 0; i < 260; i++) {
      z = zBot + R() * (zTop - zBot);
      var under = z < 0;
      g.globalAlpha = under ? 0.05 + R() * 0.07 : 0.035 + R() * 0.05;
      g.fillStyle = under ? (R() < 0.5 ? "#7a3a31" : "#3c1c19") : (R() < 0.5 ? "#ffffff" : "#000000");
      g.fillRect(R() * W, rowZ(z), 30 + R() * 200, (0.3 + R() * 1.0) * PXZ);
    }
    g.globalAlpha = 1;
    /* black boot topping, as every 1960s photograph shows it [N][T]       */
    band(1.2, -0.8, "#18191b");
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.3;
    for (i = 1; i < 60; i++) {
      x = i * W / 60 + (R() - 0.5) * 4;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
    }
    for (i = 1; i < 9; i++) hline(i * 2.0);
    for (i = 1; i < 4; i++) hline(-i * 2.2);
    g.strokeStyle = "rgba(255,255,255,0.18)"; g.lineWidth = 3; hline(KNUCK);
    g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 2; hline(KNUCK - 0.35);
    if (zTop > 4) {
      /* scuttles: a broken row at the hangar-deck level and a lower row in
         the troop spaces amidships, as the broadsides show them [P][S]     */
      g.fillStyle = "rgba(20,22,24,0.85)";
      for (x = -76; x < 70; x += 2.6) {
        if (R() < 0.35) continue;
        g.fillRect(colX(x), rowZ(11.4), 3, 3);
      }
      for (x = -50; x < 48; x += 3.4) {
        if (R() < 0.45) continue;
        g.fillRect(colX(x), rowZ(5.6), 3, 3);
      }
      /* rust weeping from the scuppers and hawse                           */
      for (i = 0; i < 60; i++) {
        x = R() * W; y = rowZ(3 + R() * 13); len = (2 + R() * 5) * PXZ;
        gr = g.createLinearGradient(0, y, 0, y + len);
        gr.addColorStop(0, "rgba(92,58,40,0.36)");
        gr.addColorStop(1, "rgba(92,58,40,0.0)");
        g.fillStyle = gr; g.fillRect(x, y, 1.5 + R() * 2.5, len);
        g.fillStyle = "rgba(24,22,20,0.36)"; g.fillRect(x - 1, y - 1, 4 + R() * 3, 3);
      }
    }
    /* draught marks fore and aft                                           */
    g.fillStyle = "rgba(236,238,240,0.9)";
    [80.5, -84.0].forEach(function (mx) {
      for (var k = 0; k < 7; k++) {
        var zz = -6 + k * 1.0;
        if (zz > zBot && zz < zTop) g.fillRect(colX(mx), rowZ(zz) - 1, 7, 2);
      }
    });
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
    g.fillStyle = "rgba(20,22,25,0.45)";
    for (i = 0; i < 20; i++) g.fillRect(R() * W, R() * H, 14 + R() * 8, 30 + R() * 10);
    for (i = 0; i < 40; i++) {
      var x = R() * W, y = R() * H * 0.8, len = 8 + R() * 30;
      var gr = g.createLinearGradient(0, y, 0, y + len);
      gr.addColorStop(0, "rgba(90,62,44,0.20)");
      gr.addColorStop(1, "rgba(90,62,44,0.0)");
      g.fillStyle = gr; g.fillRect(x, y, 1.4 + R() * 2.2, len);
    }
    return finish(THREE, cv);
  }

  /* --------------------------------------------------------- flight deck
     One plan-view painting of the whole deck, sampled through the slab's
     shape-space UVs (metres, mapped by repeat/offset), so every mark sits
     where [O] puts it. The lift slabs sample the same painting.           */
  var DX0 = -92, DX1 = 92, DY0 = -27, DY1 = 27;
  /* The 1962 spots [O][T]: rings 57 ft across (the H-34's rotor) in two
     staggered rows, each ring all but touching its deck edge, each with a small centre ring and a short lineup
     bar. Stations read off [O] against the island's forward face.          */
  var SPOTS = [
    [ 72.0, -7.0], [ 57.0,  7.3], [ 40.0, -7.0], [ 23.0,  7.3],
    [ -6.0,  7.3], [-37.0,  7.3], [-56.0, -6.0], [-72.0,  7.3],
  ];

  function deckTex(THREE) {
    var W = 2048, H = 576, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(1962), i, p, q;
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
    function ring(x, y, r, wm, col) {
      g.save();
      g.strokeStyle = col; g.lineWidth = Math.max(1.0, wm * SY);
      g.beginPath(); g.ellipse(cx(x), cy(y), r * SX, r * SY, 0, 0, PI * 2); g.stroke();
      g.restore();
    }

    /* non-skid: dark deck grey, worn lighter down the middle              */
    g.fillStyle = hx(PAINT.deck); g.fillRect(0, 0, W, H);
    for (i = 0; i < 420; i++) {
      g.globalAlpha = 0.04 + R() * 0.06;
      g.fillStyle = R() < 0.5 ? "#8d949a" : "#1e2125";
      g.fillRect(R() * W, R() * H, 20 + R() * 140, 8 + R() * 40);
    }
    g.globalAlpha = 0.22; g.fillStyle = "#14171a";
    for (i = 0; i < 4500; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    /* tie-down pad-eyes on a 3 m grid, plating seams athwartships          */
    g.fillStyle = "rgba(12,14,16,0.32)";
    for (p = DX0 + 1.5; p < DX1; p += 3.0)
      for (q = DY0 + 1.5; q < DY1; q += 3.0) g.fillRect(cx(p) - 1, cy(q) - 1, 2.2, 2.2);
    g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1.2;
    for (q = DY0 + 2.4; q < DY1; q += 2.4) {
      g.beginPath(); g.moveTo(0, cy(q)); g.lineTo(W, cy(q)); g.stroke();
    }
    for (p = DX0 + 9; p < DX1; p += 9) {
      g.beginPath(); g.moveTo(cx(p), 0); g.lineTo(cx(p), H); g.stroke();
    }
    /* rotor wash and skid scuffs round each spot                           */
    SPOTS.forEach(function (s) {
      for (var k = 0; k < 40; k++) {
        var a = R() * PI * 2, rr = R() * 6.5;
        g.globalAlpha = 0.05 + R() * 0.07;
        g.fillStyle = R() < 0.7 ? "#1a1c1f" : "#5a4a3a";
        g.fillRect(cx(s[0] + Math.cos(a) * rr), cy(s[1] + Math.sin(a) * rr), (1 + R() * 3) * SX, 1 + R() * 2);
      }
    });
    g.globalAlpha = 1;
    /* the spots: ring, centre ring, lineup bar fore and aft, and the two
       small white squares the overhead shows on the bar                    */
    SPOTS.forEach(function (s) {
      ring(s[0], s[1], 8.7, 0.32, "#e3e6e8");
      ring(s[0], s[1], 0.75, 0.28, "#e3e6e8");
      mline([s[0] + 1.6, s[1]], [s[0] + 4.6, s[1]], 0.30, "#e3e6e8");
      g.fillStyle = "#e3e6e8";
      g.fillRect(cx(s[0] - 3.2) - 0.4 * SX, cy(s[1]) - 0.4 * SY, 0.8 * SX, 0.8 * SY);
      g.fillRect(cx(s[0] + 5.6) - 0.4 * SX, cy(s[1]) - 0.4 * SY, 0.8 * SX, 0.8 * SY);
    });
    /* lift edges: a dark gap round each platform where it meets the deck,
       and the white line round the platform that [O] shows               */
    LIFTS.forEach(function (L) {
      var ya = Math.min(L.yi, L.yo), yb = Math.max(L.yi, L.yo);
      g.strokeStyle = "#0b0c0e"; g.lineWidth = Math.max(1.2, 0.25 * SY);
      g.strokeRect(cx(L.x0 + 0.1), cy(yb - 0.1), (L.x1 - L.x0 - 0.2) * SX, (yb - ya - 0.2) * SY);
      g.strokeStyle = "rgba(226,230,232,0.8)"; g.lineWidth = Math.max(1.0, 0.25 * SY);
      g.strokeRect(cx(L.x0 + 0.5), cy(yb - 0.5), (L.x1 - L.x0 - 1.0) * SX, (yb - ya - 1.0) * SY);
    });
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
      top:  hullTex(THREE, FD_BOT, 0, 256, 2017),
      bot:  hullTex(THREE, 0, KEEL, 128, 2018),
      sup:  supTex(THREE),
      deck: deckTex(THREE)
    };
    return _tex;
  }

  /* ================================================================= hull
     Lofted from the station table. Each row is a station x and its half-
     breadths at the waterlines WLZ; rows are interpolated linearly in x.
     Levels under a risen keel (the run aft, the forefoot and stem forward)
     fold onto the keel line. Above the hangar deck the side flares out to
     the deck edge less the overhang, through 12.5 and 15.5 m, which is the
     flared look of the broadsides; at the bow that flare is the whole
     Essex-like bow over a fine entrance.                                  */
  var WLZ = [-8.2, -7.6, -6.0, -3.5, 0.0, 4.0, KNUCK];
  var STN = [
    /*  x         -8.2   -7.6   -6.0   -3.5    0.0    4.0    8.6              */
    [  -87.6, [ 0.10,  0.10,  0.10,  1.31,  3.45,  6.98, 10.66]],
    [  -84.0, [ 0.10,  0.10,  0.63,  2.03,  4.15,  7.60, 11.08]],
    [  -80.0, [ 0.11,  0.40,  1.24,  2.81,  4.91,  8.26, 11.51]],
    [  -76.0, [ 0.32,  0.79,  1.85,  3.57,  5.65,  8.88, 11.91]],
    [  -70.0, [ 0.63,  1.37,  2.74,  4.67,  6.70,  9.76, 12.43]],
    [  -63.0, [ 1.00,  2.03,  3.74,  5.88,  7.85, 10.69, 12.91]],
    [  -55.0, [ 1.40,  2.76,  4.85,  7.18,  9.06, 11.60, 13.20]],
    [  -45.0, [ 1.90,  3.65,  6.15,  8.67, 10.40, 12.49, 13.20]],
    [  -35.0, [ 2.38,  4.49,  7.36,  9.96, 11.52, 12.95, 13.20]],
    [  -25.0, [ 2.84,  5.27,  8.45, 11.03, 12.36, 12.95, 13.20]],
    [  -15.0, [ 3.18,  5.87,  9.37, 11.81, 12.80, 12.95, 13.20]],
    [    0.0, [ 3.30,  6.05,  9.33, 11.62, 12.80, 12.95, 13.20]],
    [   10.0, [ 2.99,  5.54,  8.67, 10.98, 12.44, 12.95, 13.20]],
    [   20.0, [ 2.65,  4.98,  7.91, 10.16, 11.73, 12.82, 13.20]],
    [   30.0, [ 2.28,  4.36,  7.04,  9.18, 10.78, 12.15, 13.20]],
    [   40.0, [ 1.87,  3.67,  6.07,  8.05,  9.60, 11.10, 13.01]],
    [   48.0, [ 1.52,  3.07,  5.22,  7.02,  8.48, 10.01, 12.25]],
    [   55.0, [ 1.18,  2.49,  4.39,  6.03,  7.37,  8.86, 11.21]],
    [   61.0, [ 0.85,  1.95,  3.62,  5.10,  6.31,  7.72, 10.04]],
    [   66.0, [ 0.54,  1.44,  2.92,  4.24,  5.32,  6.66,  8.86]],
    [   70.0, [ 0.24,  0.99,  2.31,  3.49,  4.45,  5.71,  7.77]],
    [   74.0, [ 0.10,  0.44,  1.62,  2.67,  3.50,  4.65,  6.54]],
    [   77.5, [ 0.10,  0.10,  0.91,  1.86,  2.55,  3.62,  5.30]],
    [   80.5, [ 0.10,  0.10,  0.10,  1.03,  1.62,  2.61,  4.10]],
    [   82.6, [ 0.10,  0.10,  0.10,  0.26,  0.82,  1.80,  3.14]],
    [   84.0, [ 0.10,  0.10,  0.10,  0.10,  0.10,  1.18,  2.43]],
    [   86.0, [ 0.10,  0.10,  0.10,  0.10,  0.10,  0.10,  1.22]],
    [   87.5, [ 0.10,  0.10,  0.10,  0.10,  0.10,  0.10,  0.10]],
  ];


  /* keel height along the length: the run rising to a transom whose lower
     edge is just under the waterline [T], the forefoot rounding up into a
     raked stem, then the stem itself up to the deck [N][P]                  */
  var KEELZ = [
    [-87.6, -0.5], [-84.0, -2.4], [-80.0, -4.0], [-76.0, -5.2], [-70.0, -6.6],
    [-63.0, -7.6], [-55.0, -8.1], [-48.0, -8.2],
    [62.0, -8.2], [66.0, -8.0], [70.0, -7.4], [74.0, -6.2], [77.5, -4.8],
    [80.5, -3.2], [82.6, -1.6], [83.6, -0.5], [84.0, 0.0],
    [85.8, 4.0], [87.3, KNUCK], [88.6, 12.5], [89.4, 15.5], [HX1, FD_BOT],
  ];
  var STEM = [[0, 84.0], [4.0, 85.8], [KNUCK, 87.3], [12.5, 88.6], [15.5, 89.4], [FD_BOT, HX1]];
  function tbl(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++)
      if (x <= T[i][0]) return lerp(T[i - 1][1], T[i][1], (x - T[i - 1][0]) / (T[i][0] - T[i - 1][0]));
    return T[T.length - 1][1];
  }
  function stnY(k, x) {
    if (x <= STN[0][0]) return STN[0][1][k];
    for (var i = 1; i < STN.length; i++)
      if (x <= STN[i][0]) return lerp(STN[i - 1][1][k], STN[i][1][k], (x - STN[i - 1][0]) / (STN[i][0] - STN[i - 1][0]));
    return STN[STN.length - 1][1][k];
  }
  /* the stem closes every level: no section is wider than k times its
     distance abaft the stem at that height                                 */
  function wedge(x, z) { return 3.4 * Math.max(0, tbl(STEM, z) - x); }

  var UPZ = [12.5, 15.5, FD_BOT], UPF = [0.30, 0.72, 1.0];
  function sideRing(x, side) {
    var out = [], zk = tbl(KEELZ, x), k;
    var first = 0;
    while (first < WLZ.length - 1 && WLZ[first] < zk) first++;
    var yFirst = Math.min(stnY(first, x), wedge(x, WLZ[first]));
    for (k = 0; k < WLZ.length; k++) {
      if (WLZ[k] < zk) out.push([0.8 * yFirst, zk]);
      else out.push([Math.min(stnY(k, x), wedge(x, WLZ[k])), WLZ[k]]);
    }
    var yK = out[WLZ.length - 1][0];
    var edge = Math.max(yK, deckHalf(x, side) - OVH);
    for (k = 0; k < UPZ.length; k++) {
      var y = lerp(yK, edge, UPF[k]);
      y = Math.min(y, Math.max(yK, wedge(x, UPZ[k])));
      if (UPZ[k] < zk) y = Math.max(0.05, 0.8 * y);
      out.push([y, Math.max(UPZ[k], zk)]);
    }
    return out;
  }

  function hullGeo(THREE) {
    var xs = [], i, j, x;
    for (x = HX0; x < -70; x += 1.8) xs.push(x);
    for (x = -70; x < 50; x += 5.0) xs.push(x);
    for (x = 50; x < 84; x += 1.4) xs.push(x);
    xs.push(84.0, 85.0, 86.0, 86.8, 87.5, 88.2, 88.8, 89.3, HX1);
    DECK.forEach(function (p) { if (p[0] > HX0 + 0.5 && p[0] < HX1 - 0.3) xs.push(p[0]); });
    LIFTS.forEach(function (L) {
      [L.x0, L.x1].forEach(function (e) { xs.push(e - 0.25); xs.push(e + 0.25); });
    });
    xs.sort(function (a, b) { return a - b; });
    var st = [];
    for (i = 0; i < xs.length; i++) if (!st.length || xs[i] - st[st.length - 1] > 0.2) st.push(xs[i]);

    var rings = [];
    for (i = 0; i < st.length; i++) {
      var xx = st[i], P = sideRing(xx, 1), S = sideRing(xx, -1), r = [];
      r.push([0, FD_BOT]);
      for (j = P.length - 1; j >= 0; j--) r.push([P[j][0], P[j][1]]);
      r.push([0, tbl(KEELZ, xx)]);
      for (j = 0; j < S.length; j++) r.push([-S[j][0], S[j][1]]);
      rings.push(r);
    }
    var nR = rings[0].length;
    var OUT = { top: { pos: [], nrm: [], uv: [], z0: 0, z1: FD_BOT }, bot: { pos: [], nrm: [], uv: [], z0: KEEL, z1: 0 } };
    /* the transom rakes a little aft as it rises [T]; the deck overhangs
       its top by 2.3 m, the shadowed overhang every stern view shows        */
    function xAt(ii, z) { return ii === 0 ? st[0] - TRAKE * clamp((z + 0.5) / (FD_BOT + 0.5), 0, 1) : st[ii]; }
    function V(ii, jj) { var q = rings[ii][jj % nR]; return [xAt(ii, q[1]), q[0], q[1]]; }
    function uOf(xq) { return (xq - HX0 + TRAKE) / (HX1 - HX0 + TRAKE); }
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
    /* the transom: a flat cap fanned from its own centre                    */
    var r0 = rings[0], cyy = 0, czz = 0;
    for (j = 0; j < nR; j++) { cyy += r0[j][0]; czz += r0[j][1]; }
    czz /= nR;
    var C = [xAt(0, czz), cyy / nR, czz];
    for (j = 0; j < nR; j++) tri(C, V(0, j), V(0, j + 1), -1, -2 - j, -2 - ((j + 1) % nR));
    var around = {}, COS = Math.cos(34 * PI / 180);
    faces.forEach(function (f, fi) {
      f.k.forEach(function (k) { (around[k] || (around[k] = [])).push(fi); });
    });
    var vol = 0;
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
    return { top: geo(OUT.top), bot: geo(OUT.bot), st: st };
  }
  /* hull half-breadth at the hangar deck (for parts hung on the side)      */
  function sideAt(x, side, z) {
    var R = sideRing(x, side), best = R[0][0], bd = 1e9;
    for (var k = 0; k < R.length; k++) {
      var d = Math.abs(R[k][1] - z);
      if (d < bd) { bd = d; best = R[k][0]; }
    }
    return best;
  }

  /* ========================================================== the guns
     Twin 3in/50 Mk 33 in its rounded shield [F][T], built in its own frame:
     barrels along +X, the mount's centre at the origin on its tub floor.  */
  function gunParts(THREE) {
    var P = [];
    P.push(["S", cylZ(THREE, 1.25, 1.35, 0.45, 10, 0, 0, 0)]);
    /* the shield: round-fronted, flat-backed, a little narrower on top     */
    var sh = [[1.45, 0.0], [1.2, 1.0], [0.5, 1.35], [-1.5, 1.35], [-1.5, -1.35], [0.5, -1.35], [1.2, -1.0]];
    P.push(["S", frustum(THREE, sh, 0.45, 2.15, 1.0, 0.86)]);
    P.push(["S", plate(THREE, scalePts(sh, 0.84), 2.15, 2.3)]);
    /* sight hoods either side of the roof                                   */
    P.push(["S", box(THREE, 0.7, 0.35, 0.35, 0.2, 0.95, 2.35)]);
    P.push(["S", box(THREE, 0.7, 0.35, 0.35, 0.2, -0.95, 2.35)]);
    /* the slot and the two barrels, 50 calibres of 3 in, a touch elevated  */
    P.push(["K", box(THREE, 0.12, 1.5, 0.6, 1.4, 0, 1.35)]);
    for (var s = -1; s <= 1; s += 2) {
      var b = new THREE.CylinderGeometry(0.075, 0.1, 3.8, 6);
      b.rotateZ(-PI / 2); b.translate(1.9, 0, 0); b.rotateY(-0.10);
      b.translate(1.2, s * 0.42, 1.35);
      P.push(["M", b]);
      P.push(["M", place(THREE, new THREE.CylinderGeometry(0.16, 0.16, 0.6, 6).rotateZ(-PI / 2), 1.5, s * 0.42, 1.35)]);
    }
    return P;
  }

  /* a small boat: a 40 ft personnel launch, lofted, with a canopy          */
  function boatParts(THREE, M, L) {
    var P = [];
    var f = L / 12.0;
    var hull = M.loft(THREE, [
      { x:  6.0 * f, w: 0.10, h: 0.9 * f, zc: 0.95 * f },
      { x:  4.6 * f, w: 1.5 * f, h: 1.3 * f, zc: 0.75 * f },
      { x:  1.5 * f, w: 3.4 * f, h: 1.4 * f, zc: 0.70 * f },
      { x: -3.0 * f, w: 3.4 * f, h: 1.3 * f, zc: 0.70 * f },
      { x: -6.0 * f, w: 2.8 * f, h: 1.1 * f, zc: 0.80 * f },
    ], 8);
    P.push(["S", hull]);
    P.push(["S", box(THREE, 4.0 * f, 2.6 * f, 1.1 * f, 0.6 * f, 0, 1.75 * f)]);
    P.push(["K", box(THREE, 0.1, 2.3 * f, 0.5 * f, 2.62 * f, 0, 1.85 * f)]);
    P.push(["K", box(THREE, 3.0 * f, 2.4 * f, 0.6 * f, -3.6 * f, 0, 1.6 * f)]);
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
    T.K = new THREE.MeshStandardMaterial({ color: 0x1d2024, roughness: 0.90, metalness: 0.05 });
    T.M = new THREE.MeshStandardMaterial({ color: 0x5d666d, roughness: 0.55, metalness: 0.50 });
    T.G = new THREE.MeshStandardMaterial({ color: 0x121c25, roughness: 0.12, metalness: 0.0, transparent: true, opacity: 0.88 });
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
    function ringRail(pts, z, closed) {
      var n = closed === false ? pts.length - 1 : pts.length;
      for (var k = 0; k < n; k++) {
        var p0 = pts[k], p1 = pts[(k + 1) % pts.length];
        var ddx = p1[0] - p0[0], ddy = p1[1] - p0[1];
        B.M.add(box(THREE, Math.sqrt(ddx * ddx + ddy * ddy), 0.08, 0.08,
                    (p0[0] + p1[0]) * 0.5, (p0[1] + p1[1]) * 0.5, z, 0, 0, Math.atan2(ddy, ddx)));
      }
    }
    /* an open round tub: floor and a wall of flat plates (an open cylinder
       would lose its far side to back-face culling seen from above)        */
    function tub(x, y, z, r, h, nseg) {
      B.S.add(cylZ(THREE, r, r, 0.3, nseg, x, y, z - 0.3));
      for (var q = 0; q < nseg; q++) {
        var aq = (q + 0.5) * 2 * PI / nseg;
        B.S.add(box(THREE, 0.12, 2 * PI * r / nseg + 0.05, h, x + r * Math.cos(aq), y + r * Math.sin(aq), z + h * 0.5, 0, 0, aq));
      }
      ringRail(Array.apply(null, Array(nseg)).map(function (_, q) {
        var aq = q * 2 * PI / nseg; return [x + r * Math.cos(aq), y + r * Math.sin(aq)];
      }), z + h + 0.05);
    }
    /* a sponson knee: the outline at zt tapering in to the hull side       */
    function bracket(top, bot, zt, zb, mat) {
      var pos = [], uv = [], nn = top.length, k;
      for (k = 0; k < nn; k++) {
        var q = (k + 1) % nn;
        pos.push(bot[k][0], bot[k][1], zb, bot[q][0], bot[q][1], zb, top[q][0], top[q][1], zt);
        pos.push(bot[k][0], bot[k][1], zb, top[q][0], top[q][1], zt, top[k][0], top[k][1], zt);
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
      (mat || B.S).add(gg);
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

    /* the lifts: platforms hung outboard of the shallow deck cuts, a hair
       proud of the deck, on the same deck painting; behind each the hangar
       opening, dark, from the hangar deck to the gallery [P][S][T]          */
    LIFTS.forEach(function (L) {
      var ya = Math.min(L.yi, L.yo), yb = Math.max(L.yi, L.yo);
      var ls = new THREE.Shape();
      ls.moveTo(L.x0 + 0.1, ya); ls.lineTo(L.x1 - 0.1, ya); ls.lineTo(L.x1 - 0.1, yb); ls.lineTo(L.x0 + 0.1, yb);
      ls.closePath();
      var lg = new THREE.ExtrudeGeometry(ls, { depth: 1.0, bevelEnabled: false });
      lg.translate(0, 0, FD_TOP - 1.0 + 0.02);
      Batch.addGroups(lg, [B.D, B.S]);
      /* the girder frame under the platform's outer edge                    */
      B.S.add(box(THREE, L.x1 - L.x0 - 0.2, 0.5, 1.2, (L.x0 + L.x1) * 0.5, L.yo - L.s * 0.25, FD_TOP - 1.6));
      ringRail([[L.x0 + 0.2, L.yo - L.s * 0.1], [L.x1 - 0.2, L.yo - L.s * 0.1]], FD_TOP + 0.95, false);
      for (j = 0; j <= 4; j++) {
        var px = lerp(L.x0 + 0.3, L.x1 - 0.3, j / 4);
        B.M.add(box(THREE, 0.08, 0.08, 0.95, px, L.yo - L.s * 0.1, FD_TOP + 0.5));
      }
      /* the hangar opening: a dark recess in the hull side behind the lift */
      var xm = (L.x0 + L.x1) * 0.5, yh = sideAt(xm, L.s, KNUCK + 4);
      B.K.add(box(THREE, L.x1 - L.x0 - 1.2, 0.3, FD_BOT - KNUCK - 0.8, xm, L.s * (yh + 0.06), (FD_BOT + KNUCK) * 0.5 - 0.3));
      /* the two guide trunks either end, down to below the hangar deck     */
      for (j = 0; j < 2; j++) {
        var tx = j ? L.x1 - 0.5 : L.x0 + 0.5;
        B.S.add(box(THREE, 1.0, 1.6, FD_BOT - KNUCK + 3.0, tx, L.s * (yh + 0.8), (FD_BOT + KNUCK - 3.0) * 0.5));
      }
    });

    /* ---------------------------- catwalks, nets and rails round the edge */
    var n = DECK.length;
    function inCut(a, b) {
      for (var k = 0; k < LIFTS.length; k++) {
        var L = LIFTS[k];
        var inx = function (q) { return q[0] >= L.x0 - 2.1 && q[0] <= L.x1 + 2.1; };
        if (inx(a) && inx(b) && L.s * a[1] > 0) return true;
      }
      if (a[0] >= GSX0 - 0.1 && a[0] <= GSX1 + 0.1 && b[0] >= GSX0 - 0.1 && b[0] <= GSX1 + 0.1 && a[1] < 0) return true;
      /* the island stands on the starboard edge: no catwalk under it       */
      var mxx = (a[0] + b[0]) * 0.5;
      if (a[1] < -15 && b[1] < -15 && mxx > ISL_X0 - 0.5 && mxx < ISL_X1 + 0.5) return true;
      return false;
    }
    var segs = [];
    for (i = 0; i < n; i++) {
      var a = DECK[i], b = DECK[(i + 1) % n];
      /* the long straight edges carry the catwalk in pieces broken at the
         island so it can be skipped there                                   */
      if (Math.abs(a[1]) > 15.9 && Math.abs(b[1]) > 15.9 && Math.abs(a[0] - b[0]) > 20) {
        var cuts = [a[0], b[0]];
        if (a[1] < 0) cuts.push(ISL_X0 - 0.5, ISL_X1 + 0.5);
        cuts.sort(function (p1, p2) { return a[0] < b[0] ? p1 - p2 : p2 - p1; });
        for (j = 0; j < cuts.length - 1; j++) segs.push([[cuts[j], a[1]], [cuts[j + 1], a[1]]]);
      } else segs.push([a, b]);
    }
    segs.forEach(function (sg) {
      var a2 = sg[0], b2 = sg[1];
      var dx = b2[0] - a2[0], dy = b2[1] - a2[1], L2 = Math.sqrt(dx * dx + dy * dy);
      if (L2 < 2.0 || inCut(a2, b2)) return;
      var ox = dy / L2, oy = -dx / L2, ang = Math.atan2(dy, dx);
      var reach = Math.max(Math.abs(a2[0]), Math.abs(b2[0])) + Math.abs(ox) * 2.6;
      if (Math.abs(ox) > 0.8 || reach > DEXT - 0.1) return;
      var mx = (a2[0] + b2[0]) * 0.5, my = (a2[1] + b2[1]) * 0.5;
      B.S.add(box(THREE, L2, 1.3, 0.22, mx + ox * 0.75, my + oy * 0.75, FD_TOP - 1.35, 0, 0, ang));
      /* the safety net, canted up and out; none round the bow, where [B]
         shows only a rail on the deck edge                                  */
      if (mx < BOW0 + 2) {
        var net = new THREE.BoxGeometry(Math.max(0.5, L2 - 0.3), 1.4, 0.07);
        net.rotateX(0.22);
        net.rotateZ(ang - PI);
        net.translate(mx + ox * 1.9, my + oy * 1.9, FD_TOP - 0.55);
        B.M.add(net);
      }
      B.M.add(box(THREE, L2, 0.08, 0.08, mx + ox * 1.35, my + oy * 1.35, FD_TOP - 0.3, 0, 0, ang));
    });

    /* life-raft canister racks under the deck edge, the white drums along
       the gallery in the broadsides [S][P]                                  */
    [[1, 60, 26], [1, -10, -76], [-1, 56, 30], [-1, -16, -24], [-1, -50, -80]].forEach(function (r) {
      var sd = r[0];
      for (var xr = r[1]; xr > r[2]; xr -= 6.5) {
        var yb2 = sideAt(xr, sd, FD_BOT - 2.0);
        B.S.add(box(THREE, 3.6, 1.6, 0.15, xr, sd * (yb2 + 0.75), FD_BOT - 2.6));
        for (var d3 = -1; d3 <= 1; d3++) {
          var can = new THREE.CylinderGeometry(0.42, 0.42, 1.05, 6);
          can.rotateX(PI / 2); can.rotateY(PI / 2);
          B.W.add(place(THREE, can, xr + d3 * 1.1, sd * (yb2 + 0.8), FD_BOT - 2.0, PI / 2, 0, 0));
        }
      }
    });

    /* -------------------------------------------------------- the stern
       The two big stern ports low in the wineglass transom and the pair of
       slots between them; the doors on the flat upper face [T][S]           */
    var xtr = function (z) { return HX0 - TRAKE * clamp((z + 0.5) / (FD_BOT + 0.5), 0, 1); };
    for (s = -1; s <= 1; s += 2) {
      B.K.add(box(THREE, 0.3, 4.6, 2.0, xtr(7.6) - 0.05, s * 5.4, 7.6));
      B.K.add(box(THREE, 0.3, 0.45, 1.1, xtr(7.9) - 0.05, s * 1.5, 7.9));
      B.K.add(box(THREE, 0.3, 1.2, 2.0, xtr(15.0) - 0.05, s * 7.0, 15.0));
    }
    /* the after gallery under the overhang: a light sponson deck across
       the stern between the tubs                                           */
    B.S.add(box(THREE, 1.6, 15.0, 0.25, HX0 - TRAKE - 0.8, 0, FD_BOT - 2.6));
    ringRail([[HX0 - TRAKE - 1.55, -7.4], [HX0 - TRAKE - 1.55, 7.4]], FD_BOT - 1.6, false);

    /* the quarter tubs: set into the stern corners under the deck, each on
       a conical knee that tapers into the transom [T][S]                    */
    var QT = [[-86.85, 12.0], [-86.85, -12.0]];
    QT.forEach(function (q) {
      var zf = FD_TOP - 4.6, r = 3.1;
      tub(q[0], q[1], zf, r, 1.4, 12);
      var top = [], bot = [];
      for (var k = 0; k < 10; k++) {
        var aq = k * 2 * PI / 10;
        top.push([q[0] + r * Math.cos(aq), q[1] + r * Math.sin(aq)]);
        bot.push([q[0] + 0.9 + 0.5 * Math.cos(aq), q[1] * 0.92 + 0.5 * Math.sin(aq)]);
      }
      bracket(top.reverse(), bot.reverse(), zf - 0.3, zf - 4.4);
      emit(gunParts(THREE), q[0], q[1], zf, PI + (q[1] > 0 ? -1.25 : 1.25));
    });

    /* screw, shaft, skeg, rudder: one shaft [published]                    */
    B.U.add(plate(THREE, [[-56, 0.25], [-80.5, 0.25], [-80.5, -0.25], [-56, -0.25]], -8.1, -4.0));
    B.U.add(frustum(THREE, [[-56, 0.3], [-79, 0.3], [-79, -0.3], [-56, -0.3]], -8.1, -7.6, 1, 1));
    B.M.add(strut(THREE, -70, 0, -5.8, -81.2, 0, -5.6, 0.35, 8));
    B.M.add(place(THREE, new THREE.CylinderGeometry(0.4, 0.75, 1.4, 8).rotateZ(PI / 2), -82.2, 0, -5.6));
    for (j = 0; j < 4; j++) {
      var bl = new THREE.BoxGeometry(0.3, 1.3, 2.3);
      bl.translate(0, 0, 1.4);
      bl.rotateZ(0.45);
      bl.rotateX(j * PI / 2 + 0.3);
      bl.translate(-82.2, 0, -5.6);
      B.M.add(bl);
    }
    B.U.add(plate(THREE, [[-84.0, 0.35], [-87.2, 0.35], [-87.2, -0.35], [-84.0, -0.35]], -7.6, -0.9));
    /* bilge keels                                                          */
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 6; j++) {
        var bkx = -36.0 + j * 10.0, bky = sideAt(bkx, s, -6.0) - 0.15;
        B.U.add(box(THREE, 10.2, 0.3, 1.3, bkx, s * (bky + 0.45), -6.25, -s * 0.75, 0, 0));
      }
    }

    /* anchors and hawse pipes, both bows [N]                               */
    for (s = -1; s <= 1; s += 2) {
      var ya = sideAt(80.5, s, 9.4);
      B.K.add(place(THREE, new THREE.CylinderGeometry(0.7, 0.7, 0.3, 10), 80.5, s * (ya + 0.12), 9.6, 0, 0, 0));
      B.M.add(box(THREE, 1.8, 0.45, 2.6, 80.2, s * (ya + 0.25), 7.8, s * 0.12, 0, 0));
      B.M.add(box(THREE, 2.6, 0.4, 0.45, 80.2, s * (ya + 0.3), 6.6, s * 0.12, 0, 0));
    }

    /* the boat recess on the port side abaft the lift, under the island,
       and the launch in it on its davits [P][S]                             */
    var bx = -19.0, by = sideAt(bx, 1, 11);
    B.K.add(box(THREE, 13.0, 0.3, 4.6, bx, by + 0.05, 11.4));
    emit(boatParts(THREE, M, 11.0), bx, by + 1.6, 9.6, 0);
    for (j = -1; j <= 1; j += 2) {
      B.M.add(strut(THREE, bx + j * 4.2, by, 14.8, bx + j * 4.2, by + 2.6, 14.4, 0.14, 4));
      B.M.add(strut(THREE, bx + j * 4.2, by + 2.6, 14.4, bx + j * 4.2, by + 1.6, 12.2, 0.05, 3));
    }
    /* accommodation-ladder platforms and small sponsons on the topsides    */
    [[1, 44.0], [1, -48.0], [-1, 40.0], [-1, -60.0]].forEach(function (pr) {
      var yy = sideAt(pr[1], pr[0], FD_BOT - 4.5);
      B.S.add(box(THREE, 4.0, 1.6, 0.3, pr[1], pr[0] * (yy + 0.75), FD_BOT - 4.6));
      B.M.add(box(THREE, 4.0, 0.06, 0.06, pr[1], pr[0] * (yy + 1.5), FD_BOT - 3.6));
    });

    /* ------------------------------------------- forward gun sponson [O][F]
       The two mounts in tandem on the starboard edge, in round tubs whose
       rims are the deck edge, on a platform just below the flight deck.   */
    var zg = FD_TOP - 1.0;
    var gsp = [[GSX1, GSY], [GSX1, -18.0], [GSX1 - 2.2, -20.3], [GSX0 + 1.6, -20.3], [GSX0, -18.8], [GSX0, GSY]];
    B.S.add(plate(THREE, gsp, zg - 0.5, zg));
    var gyb = sideAt(17, -1, zg - 5);
    bracket(ccw(gsp), ccw(gsp).map(function (q) { return [q[0], -Math.min(Math.abs(q[1]), gyb + 0.3)]; }), zg - 0.5, zg - 5.0);
    [[21.0, -17.2], [13.9, -17.2]].forEach(function (g2) {
      tub(g2[0], g2[1], zg, 2.9, 1.0, 12);
      emit(gunParts(THREE), g2[0], g2[1], zg, -0.35);
    });
    /* a gun director platform between the island and the guns [F]          */
    B.S.add(cylZ(THREE, 0.5, 0.6, 1.4, 6, 10.1, -18.6, zg));
    B.S.add(box(THREE, 1.4, 1.2, 1.0, 10.1, -18.6, zg + 1.9));

    /* ------------------------------------------------------------ island
       Stepped tiers on the starboard edge [P][F][T]. Heights above the
       deck from [P] and [F]: window bands at 5-6 and 8-9 m, the solid top
       tier to 13.2, the stack head 14.8, the bedspring's top at 31.7.       */
    var Z0 = FD_TOP;
    function chamf(x0, x1, yo, yi, cf, ca) {
      /* plan with the forward corners cut by cf and the after ones by ca  */
      return [[x1, yo + cf], [x1, yi - cf], [x1 - cf, yi], [x0 + ca, yi], [x0, yi - ca],
              [x0, yo + ca], [x0 + ca, yo], [x1 - cf, yo]];
    }
    var I1 = chamf(ISL_X0, ISL_X1, ISL_YO, ISL_YI, 1.4, 0.3);
    /* the forward face rises nearly sheer through all four tiers [F]; the
       steps are at the after end, where [P] shows the tiers falling away  */
    var I2 = chamf(ISL_X0 + 0.6, ISL_X1 - 0.4, ISL_YO + 0.3, ISL_YI - 0.3, 1.5, 0.4);
    var I3 = chamf(ISL_X0 + 1.8, ISL_X1 - 0.9, ISL_YO + 0.3, ISL_YI - 0.8, 1.6, 0.4);
    var I4 = chamf(-9.0, ISL_X1 - 2.0, -15.4, -9.8, 1.3, 0.3);
    B.S.add(frustum(THREE, I1, Z0, Z0 + 3.3, 1.0, 0.995));
    B.S.add(plate(THREE, grow(I1, 0.6), Z0 + 3.3, Z0 + 3.55));
    ringRail(grow(I1, 0.55), Z0 + 4.5);
    B.S.add(frustum(THREE, I2, Z0 + 3.55, Z0 + 6.5, 1.0, 0.995));
    B.S.add(plate(THREE, grow(I2, 0.5), Z0 + 6.5, Z0 + 6.75));
    ringRail(grow(I2, 0.45), Z0 + 7.7);
    B.S.add(frustum(THREE, I3, Z0 + 6.75, Z0 + 9.6, 1.0, 0.99));
    B.S.add(plate(THREE, grow(I3, 0.35), Z0 + 9.6, Z0 + 9.85));
    B.S.add(frustum(THREE, I4, Z0 + 9.85, Z0 + 13.2, 1.0, 0.98));
    B.S.add(plate(THREE, grow(I4, 0.25), Z0 + 13.2, Z0 + 13.4));
    ringRail(grow(I4, 0.2), Z0 + 14.3);

    /* window bands: the two bands that wrap the forward face and its
       chamfers [F], flight-deck control on the inboard face, pri-fly at the
       after end of the second tier                                          */
    function glassBand(pts, z0, z1, x0, grow2) {
      var gp = ccw(grow(pts, grow2 || 0.06)), k;
      for (k = 0; k < gp.length; k++) {
        var p0 = gp[k], p1 = gp[(k + 1) % gp.length];
        var mxg = (p0[0] + p1[0]) * 0.5;
        if (mxg < x0) continue;
        var ddx = p1[0] - p0[0], ddy = p1[1] - p0[1], Lg = Math.sqrt(ddx * ddx + ddy * ddy);
        if (Lg < 0.5) continue;
        B.G.add(box(THREE, Lg - 0.3, 0.12, z1 - z0, mxg, (p0[1] + p1[1]) * 0.5, (z0 + z1) * 0.5, 0, 0, Math.atan2(ddy, ddx)));
      }
    }
    glassBand(I2, Z0 + 4.8, Z0 + 6.2, ISL_X1 - 6.5);
    glassBand(I3, Z0 + 7.9, Z0 + 9.3, ISL_X1 - 7.0);
    /* the top tier is solid plate in [F]: no glass above the two bands  */
    /* flight-deck control along the inboard face, pri-fly aft             */
    B.G.add(box(THREE, 9.0, 0.12, 1.0, -2.0, ISL_YI - 0.25, Z0 + 5.4));
    B.G.add(box(THREE, 0.12, 5.0, 1.1, ISL_X0 + 0.55, -11.3, Z0 + 5.5));
    B.G.add(box(THREE, 0.12, 4.5, 1.0, ISL_X0 + 1.75, -11.5, Z0 + 8.6));
    /* doors and the island's deck-level openings on the inboard face       */
    for (j = 0; j < 4; j++) B.K.add(box(THREE, 1.0, 0.1, 2.0, -11.0 + j * 5.2, ISL_YI - 0.02, Z0 + 1.0));
    /* bridge wings both sides of the third tier, as the bow photo shows    */
    B.S.add(plate(THREE, [[5.4, -19.2], [1.8, -19.2], [1.8, -15.8], [5.4, -15.8]], Z0 + 6.5, Z0 + 6.75));
    ringRail([[5.4, -15.8], [5.4, -19.1], [1.8, -19.1], [1.8, -15.8]], Z0 + 7.7, false);
    B.S.add(plate(THREE, [[5.0, -9.2], [1.8, -9.2], [1.8, -7.2], [5.0, -7.2]], Z0 + 9.6, Z0 + 9.85));
    ringRail([[5.0, -9.0], [5.0, -7.25], [1.8, -7.25], [1.8, -9.0]], Z0 + 10.8, false);

    /* the stack: the uptakes rise at the after end as a short raked casing
       with a dark cap [T]                                                   */
    var STK = [[-8.0, -15.6], [-8.0, -10.6], [-9.0, -10.2], [-13.4, -10.4], [-13.4, -15.6]];
    B.S.add(frustum(THREE, STK, Z0 + 9.85, Z0 + 14.8, 1.0, 0.9));
    B.T.add(frustum(THREE, STK, Z0 + 14.0, Z0 + 14.55, 0.92, 0.912));
    B.K.add(plate(THREE, scalePts(STK, 0.8), Z0 + 14.8, Z0 + 15.05));
    B.K.add(cylZ(THREE, 0.55, 0.55, 0.9, 8, -10.0, -12.0, Z0 + 14.8));
    B.K.add(cylZ(THREE, 0.55, 0.55, 0.9, 8, -11.8, -14.0, Z0 + 14.8));

    /* the block at the foot of the forward face, over the gun sponson [F] */
    B.S.add(frustum(THREE, [[ISL_X1 + 1.4, -14.4], [ISL_X1 + 1.4, -10.6], [ISL_X1 - 0.2, -10.2], [ISL_X1 - 0.2, -14.8]], Z0, Z0 + 2.8, 1, 0.97));
    B.K.add(box(THREE, 0.1, 1.0, 2.0, ISL_X1 + 1.45, -12.4, Z0 + 1.0));
    /* inclined ladders up the inboard face between the tiers, and the
       vertical one at the after end [S]                                     */
    function ladder(x0, y, z0, x1, z1) {
      var dx = x1 - x0, dz = z1 - z0, L = Math.sqrt(dx * dx + dz * dz), a = Math.atan2(dz, dx);
      B.M.add(box(THREE, L, 0.9, 0.08, (x0 + x1) * 0.5, y, (z0 + z1) * 0.5, 0, -a, 0));
      B.M.add(box(THREE, L, 0.06, 0.06, (x0 + x1) * 0.5, y + 0.45, (z0 + z1) * 0.5 + 0.9, 0, -a, 0));
    }
    ladder(-9.5, ISL_YI + 0.5, Z0, -5.0, Z0 + 3.3);
    ladder(-1.0, ISL_YI + 0.2, Z0 + 3.55, -5.2, Z0 + 6.5);
    ladder(-6.0, ISL_YI - 0.3, Z0 + 6.75, -2.0, Z0 + 9.6);
    B.M.add(box(THREE, 0.6, 0.12, 9.0, ISL_X0 - 0.1, -10.5, Z0 + 4.5));
    /* searchlights and signal lamps on the bridge-top corners, flag bags
       on the wings                                                          */
    [[4.2, -15.0], [4.2, -10.4], [-7.6, -15.0], [-7.6, -10.4]].forEach(function (sl) {
      B.S.add(cylZ(THREE, 0.18, 0.25, 0.7, 6, sl[0], sl[1], Z0 + 13.4));
      B.K.add(place(THREE, new THREE.CylinderGeometry(0.42, 0.42, 0.55, 8).rotateZ(PI / 2), sl[0], sl[1], Z0 + 14.4));
    });
    B.S.add(box(THREE, 2.4, 0.9, 1.0, 3.6, -18.5, Z0 + 7.25));
    B.S.add(box(THREE, 2.0, 0.9, 1.0, 3.4, -8.1, Z0 + 10.35));
    /* vents and lockers on the tier roofs                                   */
    [[-11.8, -14.6, Z0 + 9.85], [-11.6, -10.4, Z0 + 9.85], [6.2, -14.8, Z0 + 6.75],
     [-12.6, -9.4, Z0 + 6.75], [-13.4, -15.6, Z0 + 3.55]].forEach(function (v) {
      B.S.add(box(THREE, 1.4, 1.1, 1.0, v[0], v[1], v[2] + 0.5));
    });
    /* the whips on the island's forward corners [F]                        */
    B.M.add(strut(THREE, ISL_X1 - 2.6, ISL_YO + 0.5, Z0 + 9.85, ISL_X1 - 2.6, ISL_YO + 0.5, Z0 + 18.5, 0.08, 4, 0.04));
    B.M.add(strut(THREE, ISL_X1 - 2.6, ISL_YI - 1.2, Z0 + 9.85, ISL_X1 - 2.6, ISL_YI - 1.2, Z0 + 18.5, 0.08, 4, 0.04));
    /* the small director / radar on the roof's forward port corner [F]     */
    B.S.add(cylZ(THREE, 0.6, 0.7, 0.9, 8, 3.2, -10.6, Z0 + 13.4));
    B.M.add(sphere(THREE, 0.75, 8, 4, 3.2, -10.6, Z0 + 14.4, 1, 1, 0.55, true));

    /* ------------------------------------------------------------ mast
       A single pole off the island roof [F][P]: a platform with the SPS-10
       type bar, the main yard, a top yard, and the bedspring air-search
       array at the head facing forward, as the 1962 photograph shows it.   */
    var MX = -2.2, MY = -12.6, MZ0 = Z0 + 13.4, MZ1 = Z0 + 27.6;
    /* grey to the main yard, black above it against the stack gas, as the
       1962 colour photograph [P] shows it                                   */
    var ZY = Z0 + 21.6, rMid = lerp(0.85, 0.42, (ZY - MZ0) / (MZ1 - MZ0));
    var mg = new THREE.CylinderGeometry(rMid, 0.85, ZY - MZ0, 6, 1);
    mg.rotateX(PI / 2); mg.translate(MX, MY, (MZ0 + ZY) * 0.5);
    B.M.add(mg);
    var mg2 = new THREE.CylinderGeometry(0.42, rMid, MZ1 - ZY, 6, 1);
    mg2.rotateX(PI / 2); mg2.translate(MX, MY, (ZY + MZ1) * 0.5);
    B.K.add(mg2);
    /* the two raked legs that brace it fore and aft                         */
    B.M.add(strut(THREE, MX + 3.2, MY, MZ0, MX + 0.2, MY, Z0 + 19.0, 0.22, 5));
    B.M.add(strut(THREE, MX - 3.6, MY, MZ0, MX - 0.2, MY, Z0 + 19.0, 0.22, 5));
    /* radar platform with the SPS-10 bar on its pedestal                    */
    var ZP = Z0 + 17.6;
    B.S.add(plate(THREE, [[MX + 2.6, MY - 1.6], [MX + 2.6, MY + 1.6], [MX - 1.0, MY + 1.6], [MX - 1.0, MY - 1.6]], ZP - 0.25, ZP));
    ringRail([[MX + 2.5, MY - 1.5], [MX + 2.5, MY + 1.5], [MX - 0.9, MY + 1.5], [MX - 0.9, MY - 1.5]], ZP + 1.0);
    B.M.add(cylZ(THREE, 0.18, 0.25, 0.9, 6, MX + 1.6, MY, ZP));
    B.K.add(box(THREE, 0.5, 3.2, 0.55, MX + 1.7, MY, ZP + 1.25));
    /* main yard with its signal halyards' blocks and small antennas        */
    B.K.add(box(THREE, 0.35, 12.0, 0.3, MX, MY, ZY));
    for (s = -1; s <= 1; s += 2) {
      B.M.add(strut(THREE, MX, MY + s * 0.5, ZY - 2.5, MX, MY + s * 4.5, ZY - 0.1, 0.08, 4));
      B.M.add(strut(THREE, MX, MY + s * 5.8, ZY, MX, MY + s * 5.8, ZY + 1.6, 0.05, 4));
      B.S.add(box(THREE, 0.5, 0.6, 0.6, MX + 0.2, MY + s * 3.0, ZY - 0.45));
    }
    /* top yard                                                              */
    var ZY2 = Z0 + 25.4;
    /* top yard: as wide as the main yard in the 1961 and 1965 photographs
       [N][S], a whip standing up at each end                                */
    B.K.add(box(THREE, 0.3, 11.0, 0.25, MX, MY, ZY2));
    for (s = -1; s <= 1; s += 2) {
      B.M.add(strut(THREE, MX, MY + s * 5.4, ZY2, MX, MY + s * 5.4, ZY2 + 2.2, 0.04, 4));
      B.M.add(strut(THREE, MX, MY + s * 0.4, ZY2 - 2.0, MX, MY + s * 4.0, ZY2 - 0.1, 0.06, 4));
    }
    /* the bedspring: a curved rectangular mesh, its frame and a grid of
       bars, on a pedestal at the masthead [F]                               */
    var BZ = MZ1 + 0.9, BW = 6.4, BH = 3.0, NB = 7;
    B.K.add(cylZ(THREE, 0.35, 0.4, 0.9, 6, MX, MY, MZ1));
    B.M.add(box(THREE, 1.2, 0.8, 0.5, MX - 0.3, MY, BZ + 0.1));
    for (j = 0; j <= NB; j++) {
      var a3 = (j / NB - 0.5) * 0.9;
      var yy3 = MY + Math.sin(a3) * BW * 0.56, xx3 = MX + 0.9 - (1 - Math.cos(a3)) * 2.2;
      B.M.add(box(THREE, 0.08, 0.08, BH, xx3, yy3, BZ + BH * 0.5 + 0.2, 0, 0, a3));
    }
    for (j = 0; j <= 4; j++) {
      var zb3 = BZ + 0.2 + BH * j / 4;
      for (var sgi = 0; sgi < NB; sgi++) {
        var aa = ((sgi + 0.5) / NB - 0.5) * 0.9;
        var yb3 = MY + Math.sin(aa) * BW * 0.56, xb3 = MX + 0.9 - (1 - Math.cos(aa)) * 2.2;
        B.M.add(box(THREE, 0.08, BW * 0.56 * 0.9 / NB + 0.05, j === 0 || j === 4 ? 0.14 : 0.07, xb3, yb3, zb3, 0, 0, aa));
      }
    }
    /* the stays from the yard ends down to the island's corners             */
    for (s = -1; s <= 1; s += 2) {
      B.M.add(strut(THREE, MX, MY + s * 5.9, ZY, MX - 9.0, MY + s * 3.6, Z0 + 13.4, 0.025, 3));
      B.M.add(strut(THREE, MX, MY + s * 5.9, ZY, MX + 6.0, MY + s * 3.6, Z0 + 13.4, 0.025, 3));
    }

    /* -------------------------------------------------------- deck gear */
    /* the folding whip masts along both deck edges [N][T]                   */
    [[-16.6, 40.0], [-16.6, 52.0], [-16.6, -22.0], [-16.6, -58.0], [16.6, 64.0], [16.6, -24.0]].forEach(function (w) {
      var sy2 = w[0] > 0 ? 1 : -1;
      B.M.add(strut(THREE, w[1], w[0], FD_TOP - 1.0, w[1], w[0] + sy2 * 0.6, FD_TOP + 9.0, 0.07, 4, 0.035));
    });
    /* the crane on the starboard edge abaft the island, boom stowed [T]    */
    B.S.add(cylZ(THREE, 0.7, 0.9, 1.2, 8, -20.0, -15.0, FD_TOP));
    B.M.add(strut(THREE, -20.0, -15.0, FD_TOP + 1.2, -14.6, -15.2, FD_TOP + 7.8, 0.22, 5));

    /* team flashes on the bow and the after deck, laid on the deck so they
       read from the RTS camera                                              */
    B.T.add(box(THREE, 1.6, 11.0, 0.18, 86.0, 0.0, FD_TOP + 0.09));
    B.T.add(box(THREE, 1.6, 15.0, 0.18, -88.4, 0.0, FD_TOP + 0.09));

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

/* Registration under the def's own key. len is the measured X extent, the
   180.4 m flight deck.                                                     */
UNIT_MODELS["nato_e60_lph"] = {
  len: 180.4,
  build: function (THREE, M, C) { return HeroLPH2.build(THREE, M, C); }
};
