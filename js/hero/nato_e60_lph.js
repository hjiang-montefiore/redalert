/* ============================================================================
   nato_e60_lph.js -- HERO model: USS Iwo Jima (LPH-2), Iwo Jima class, as she
   was built and flew in the 1960s: the first ships designed from the keel up
   as helicopter carriers for the Marines. Registered as nato_e60_lph (the
   def's own key), so no other ship changes model.

   Dimensions are the published figures (en.wikipedia "Iwo Jima-class
   amphibious assault ship"; Friedman, US Amphibious Ships and Craft):
   592 ft (180.4 m) long, 84 ft (25.6 m) beam on the waterline, 105 ft
   (32 m) across the flight deck, 27 ft (8.2 m) draught, one shaft, no well
   deck, a flush flight deck with the island on the starboard edge.

   What was read off photographs (Wikimedia Commons, US Navy; named so the
   next person can check them), no more:
     - "USS Iwo Jima (LPH-2) at sea c1966" (aerial, from port; her bow is the
       LEFT end): the island on the starboard edge about amidships with a pole
       mast; a deck-edge lift opening in the PORT side forward of it; white
       landing-spot circles on a dark deck; round gun sponsons at the stern
       corners; rows of life-raft canisters under the deck edge.
     - "USS Iwo Jima (LPH-2), portside view": the same lift opening, a boat
       stowed in a hull recess abaft it under the island, the stern corners.
     - "USS Iwo Jima (LPH-2) aft": round sponson tubs at the transom corners,
       the blunt overhanging stern with two scuttles, and the island.
     - "USS Iwo Jima, Flight Deck Tan, 1962" and "USS Iwo Jima (LPH-2),
       superstructure": the stepped island, window bands, twin 3in mounts
       on the starboard edge beside the island's forward face, the mast with
       its yards and a bedspring radar on a platform.
     - "...during tests with white flight deck c1967" (bow view): a deck-edge
       lift platform to starboard aft of the island, one to port forward of
       it, the round bow, the white spot arcs. Class descriptions agree: port
       lift forward and opposite the island, starboard lift aft of it.
   Not confirmed and so not drawn: hull number, name, flags; Sea Sparrow and
   Phalanx (they came in the 1970s-80s, after this period's fit). The two
   lift stations are read off oblique views and are approximate. Guns: USNI
   Proceedings Nov 1963 gives four twin 3in/50 Mk 33 as built, two in tandem
   forward of the island and one on each stern quarter; two were replaced by
   Sea Sparrow in 1970-74. The wiki infobox and the game's def say two; the
   1960s fit is drawn: four.

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0, keel -8.2,
   flight deck 18.3 m up. The deck is one flat plate with nothing parked on it:
   the helicopters come from the deck-park code (deckOf finds the level in
   the after eighth, which is bare deck). The model's X extent is the deck,
   so nothing sticks out past either end of it.

   Every static part is merged into ONE mesh per material (nine materials,
   nine draws). The team colour is exactly C.team, three small up-facing
   strips and nothing else. ASCII only.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroLPH2 = (function () {
  "use strict";

  var PI = Math.PI;

  /* ---------------------------------------------------- principal dimensions */
  var LOA    = 180.4;              /* flight deck end to end: x -90.2..90.2     */
  var FD_TOP = 18.3;
  var FD_TH  = 1.1;
  var FD_BOT = FD_TOP - FD_TH;
  var KEEL   = -8.2;
  var KNUCK  = 8.5;                /* hangar deck: where the flare starts       */
  var HX0 = -90.0, HX1 = 89.4;
  var DEXT = 90.2;
  var DHW = 16.0;                  /* half the 105 ft deck                      */

  /* deck half-breadth: a straight run, a blunt round bow, a squared stern     */
  function hwAt(x) {
    var a = Math.abs(x);
    if (x > 56) {
      var t = (x - 56) / (DEXT - 56);
      return 3.0 + (DHW - 3.0) * Math.pow(Math.max(0, 1 - Math.pow(t, 2.1)), 0.62);
    }
    if (x < -78) return DHW - (-78 - x) * 0.22;
    return DHW;
  }
  var DECK = (function () {
    var pts = [], x, st = [], i;
    for (x = DEXT; x >= 56; x -= 3.0) st.push(x);
    st.push(50, 20, 0, -20, -50, -78, -90.2);
    /* port side, bow to stern, then the transom, then starboard, stern to bow */
    for (i = 0; i < st.length; i++) pts.push([st[i], hwAt(st[i])]);
    for (i = st.length - 1; i >= 0; i--) pts.push([st[i], -hwAt(st[i])]);
    return pts;
  })();

  /* deck-edge lifts, 44 x 34 ft. Port: forward of the island, the opening
     the port-side photograph shows (bow to the left of it); starboard: aft of
     the island (the bow view with the platforms lowered). Stations are read
     off those two oblique photographs, so approximate. Both are painted
     outlines on the one flat deck.                                          */
  var LIFTS = [
    { x0:  24.0, x1:  37.4, y0:  5.6, y1: 16.0, s:  1 },
    { x0: -35.4, x1: -22.0, y0: -16.0, y1: -5.6, s: -1 },
  ];

  /* island: three tiers on the starboard edge, a hand's breadth outside it   */
  var ISL_X0 = -13.0, ISL_X1 = 11.0, ISL_YO = -16.2, ISL_YI = -6.6;

  /* ================================================================ helpers */
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
     station x. Inside a lift notch that is the notch's inner edge, which is
     exactly where the hull stops flaring and the hangar opening begins.  */
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

  /* ------------------------------------------------------------- batching
     Every static part lands in one Batch per material and goes out as one
     mesh. Parts are built with ordinary three.js geometry, moved into
     model space, then appended as plain triangles.                       */
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
  /* an ExtrudeGeometry's caps and sides into two different batches       */
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
  /* a round bar between two points: struts, braces, shafts, masts        */
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
    g.rotateX(PI / 2);                             /* poles on the Z axis    */
    g.scale(sx || 1, sy || 1, sz || 1);
    return place(THREE, g, x, y, z);
  }

  /* A closed frustum on a convex plan: bottom outline at zb, the same
     outline scaled by sTop about its own centroid at zt. Every face of the
     Ford's island leans inboard, and this is how it gets that for free.
     pts run counter-clockwise seen from above. UVs are in metres / 16 so
     the plate texture tiles at a constant size whatever the block.      */
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
  /* the same outline, counter-clockwise seen from above, which is the
     order frustum() needs for its faces to point out                      */
  function ccw(pts) {
    var a = 0, i, n = pts.length;
    for (i = 0; i < n; i++) {
      var p = pts[i], q = pts[(i + 1) % n];
      a += p[0] * q[1] - q[0] * p[1];
    }
    return a < 0 ? pts.slice().reverse() : pts;
  }
  /* a flat plate on a plan outline (any convex polygon), z0 to z1        */
  function plate(THREE, pts, z0, z1) { return frustum(THREE, pts, z0, z1, 1, 1); }
  /* the same plate drawn in the XZ plane (outline as [x, z]) and extruded
     th across Y: fins, vertical tails, blast deflectors                  */
  function vplate(THREE, pts, th) {
    var g = frustum(THREE, pts, -th * 0.5, th * 0.5, 1, 1);
    g.rotateX(PI / 2);                     /* plan y -> z; extrusion -> -y */
    return g;
  }
  /* an outline scaled about its own centroid: balconies, visors, roofs   */
  function scalePts(pts, s) {
    var cx = 0, cy = 0, i, n = pts.length, out = [];
    for (i = 0; i < n; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    cx /= n; cy /= n;
    for (i = 0; i < n; i++) out.push([cx + (pts[i][0] - cx) * s, cy + (pts[i][1] - cy) * s]);
    return out;
  }
  function centroid(pts) {
    var cx = 0, cy = 0, i;
    for (i = 0; i < pts.length; i++) { cx += pts[i][0]; cy += pts[i][1]; }
    return [cx / pts.length, cy / pts.length];
  }

  /* ============================================================= textures */
  var PAINT = { hull: 0x7d868c, sup: 0x889096, deck: 0x4a4d4f };

  /* The hull is two materials split at the waterline, each with its own
     canvas: haze grey topsides and the red bottom. Row 0 of each canvas is
     its top edge (flipY puts v = 1 there), so v runs straight from z and
     the boot topping sits on the waterline at every station, fine bow and
     full midbody alike.                                                   */
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
    /* haze grey above, the dark red US carriers wear below               */
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
    /* boot topping: black from a metre under the waterline to 1.8 m above,
       the band every photograph of her shows at the waterline            */
    band(1.8, -1.0, "#17191c");
    /* plate butts and strakes                                             */
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.4;
    for (i = 1; i < 72; i++) {
      x = i * W / 72 + (R() - 0.5) * 4;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
    }
    for (i = 1; i < 9; i++) hline(i * 2.0);
    for (i = 1; i < 5; i++) hline(-i * 2.4);
    /* the hangar-deck strake, where the flare starts: it catches the light */
    g.strokeStyle = "rgba(255,255,255,0.20)"; g.lineWidth = 3; hline(KNUCK);
    g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 2; hline(KNUCK - 0.35);
    /* a new ship: light rust weeping from the scuppers only               */
    if (zTop > 4) {
      for (i = 0; i < 70; i++) {
        x = R() * W; y = rowZ(4 + R() * 12); len = (2 + R() * 6) * PXZ;
        gr = g.createLinearGradient(0, y, 0, y + len);
        gr.addColorStop(0, "rgba(92,58,40,0.34)");
        gr.addColorStop(1, "rgba(92,58,40,0.0)");
        g.fillStyle = gr; g.fillRect(x, y, 1.5 + R() * 2.5, len);
        g.fillStyle = "rgba(24,22,20,0.38)"; g.fillRect(x - 1, y - 1, 4 + R() * 3, 3);
      }
    }
    /* draught marks, forward and aft                                      */
    g.fillStyle = "rgba(236,238,240,0.9)";
    [148.0, -156.0].forEach(function (mx) {
      for (var k = 0; k < 7; k++) {
        var zz = -6 + k * 1.0;
        if (zz > zBot && zz < zTop) g.fillRect((mx - HX0) * PXX, rowZ(zz) - 1, 7, 2);
      }
    });
    var t = finish(THREE, cv);
    /* clamped, so the boot topping on one edge never bleeds onto the other */
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }

  /* island and gallery plate: seams, doors, a little weathering           */
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
    /* watertight doors and vents stay in the paint                        */
    g.fillStyle = "rgba(20,22,25,0.42)";
    for (i = 0; i < 18; i++) g.fillRect(R() * W, R() * H, 14 + R() * 8, 30 + R() * 10);
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
     One plan-view painting, sampled through the slab's shape-space UVs.
     Dark non-skid, a white edge line, the landing-spot rings down the
     centreline (the white arcs of the photographs), yellow centre lead-ins
     and the yellow-edged lift outlines.                                     */
  var DX0 = -95, DX1 = 95, DY0 = -20, DY1 = 20;
  function deckTex(THREE) {
    var W = 2048, H = 432, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(2061), i, p, q;
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
    g.fillStyle = hx(PAINT.deck); g.fillRect(0, 0, W, H);
    for (i = 0; i < 380; i++) {
      g.globalAlpha = 0.04 + R() * 0.06;
      g.fillStyle = R() < 0.5 ? "#8d949a" : "#212529";
      g.fillRect(R() * W, R() * H, 24 + R() * 140, 8 + R() * 36);
    }
    g.globalAlpha = 0.2; g.fillStyle = "#14171a";
    for (i = 0; i < 3500; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.18)"; g.lineWidth = 1.1;
    for (q = DY0 + 2.7; q < DY1; q += 2.7) {
      g.beginPath(); g.moveTo(0, cy(q)); g.lineTo(W, cy(q)); g.stroke();
    }
    /* the centreline: yellow dashes between the spots                       */
    mline([-86, 0], [86, 0], 0.30, "#d8a23a", [5, 4]);
    /* landing spots: a white ring with a cross, one every 20 m or so,
       skipping the lifts' stations                                          */
    var SPOTS = [-72, -52, -2, 30, 48, 66];
    SPOTS.forEach(function (sx, k) {
      var r = 5.4;
      g.save(); g.strokeStyle = "#e8ecee"; g.lineWidth = 0.42 * SY;
      g.beginPath(); g.ellipse(cx(sx), cy(0), r * SX, r * SY, 0, 0, PI * 2); g.stroke();
      g.restore();
      mline([sx - 2.2, 0], [sx + 2.2, 0], 0.4, "#e8ecee");
      mline([sx, -2.2], [sx, 2.2], 0.4, "#e8ecee");
    });
    /* spots to port and starboard of the island zone, aft: two more rings   */
    [[-78, 9.5], [-78, -9.5]].forEach(function (s2) {
      g.save(); g.strokeStyle = "#e8ecee"; g.lineWidth = 0.38 * SY;
      g.beginPath(); g.ellipse(cx(s2[0]), cy(s2[1]), 4.2 * SX, 4.2 * SY, 0, 0, PI * 2); g.stroke();
      g.restore();
    });
    /* lift outlines: a yellow dashed border and dark joints                 */
    LIFTS.forEach(function (L) {
      g.save();
      g.strokeStyle = "#d8a23a"; g.lineWidth = Math.max(1.2, 0.35 * SY);
      g.setLineDash([2 * SX, 1.4 * SX]);
      g.strokeRect(cx(L.x0 + 0.5), cy(L.y1 - 0.5), (L.x1 - L.x0 - 1.0) * SX, (L.y1 - L.y0 - 1.0) * SY);
      g.restore();
      mline([L.x0, L.y0], [L.x0, L.y1], 0.25, "#0b0c0e");
      mline([L.x1, L.y0], [L.x1, L.y1], 0.25, "#0b0c0e");
      mline([L.x0, L.s > 0 ? L.y0 : L.y1], [L.x1, L.s > 0 ? L.y0 : L.y1], 0.25, "#0b0c0e");
    });
    /* the deck edge line all round, white                                    */
    g.save();
    g.strokeStyle = "rgba(226,230,232,0.75)"; g.lineWidth = Math.max(1.2, 0.5 * SY);
    g.beginPath();
    var inset = DECK.map(function (pp) { return [pp[0] - Math.sign(pp[0]) * 0.0, pp[1] - Math.sign(pp[1]) * 0.5]; });
    g.moveTo(cx(inset[0][0]), cy(inset[0][1]));
    for (i = 1; i < inset.length; i++) g.lineTo(cx(inset[i][0]), cy(inset[i][1]));
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
      top:  hullTex(THREE, FD_BOT, 0, 256, 60201),
      bot:  hullTex(THREE, 0, KEEL, 128, 60202),
      sup:  supTex(THREE),
      deck: deckTex(THREE)
    };
    return _tex;
  }

  /* ================================================================= hull
     Lofted from station outlines: a rounded bilge, sides standing near
     vertical to the hangar deck, then the flare out to the gallery under the
     flight deck, a blunt raked flared bow and a squared overhanging stern.
     Levels: z, midship half-breadth, where the waterline starts to fine
     toward the stem and how blunt, the stem x, then the stern fining.       */
  var LEV = [
    /*  z      yMid  xb0  stemX   p    q    xs0   xsEnd  ps  */
    [ -8.2,   2.5,  -25,  64.0, 1.5, 0.80, -55, -96,  1.5 ],
    [ -7.2,   5.8,  -18,  70.0, 1.6, 0.76, -57, -100, 1.6 ],
    [ -6.0,   8.8,   -8,  75.5, 1.7, 0.72, -59, -105, 1.7 ],
    [ -4.0,  10.8,    0,  79.0, 1.8, 0.70, -60, -108, 1.8 ],
    [ -2.0,  12.0,    2,  81.5, 1.85, 0.70, -60, -111, 1.85 ],
    [  0.0,  12.8,    5,  83.7, 1.9, 0.70, -60, -114, 1.9 ],
    [  2.0,  13.1,   12,  84.8, 2.05, 0.70, -62, -122, 1.95 ],
    [  4.0,  13.3,   18,  85.8, 2.2, 0.70, -64, -130, 2.0 ],
    [  6.2,  13.5,   28,  87.0, 2.35, 0.74, -66, -200, 2.0 ],
    [ KNUCK, 13.7,   36,  88.0, 2.5, 0.78, -68, -400, 2.0 ],
  ];
  var KEELZ = [
    [-90, 6.0], [-86, 1.0], [-80, -3.0], [-72, -6.0], [-62, -7.8], [-52, -8.2],
    [56, -8.2], [66, -7.6], [74, -6.0], [79, -4.0], [82, -1.8], [83.6, 0.2],
    [85, 3.5], [87, 7.5], [88.5, 12.0], [89.4, FD_BOT],
  ];
  var STEM = [[0, 83.7], [4, 85.8], [KNUCK, 88.0], [13, 88.9], [FD_BOT, 89.6]];
  function wedge(x, z) {
    var k = z < 13 ? lerp(0.45, 0.65, clamp((z - KNUCK) / (13 - KNUCK), 0, 1))
                   : lerp(0.65, 0.9, clamp((z - 13) / (FD_BOT - 13), 0, 1));
    return k * Math.max(0, tbl(STEM, z) - x);
  }
  function tbl(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++)
      if (x <= T[i][0]) return lerp(T[i - 1][1], T[i][1], (x - T[i - 1][0]) / (T[i][0] - T[i - 1][0]));
    return T[T.length - 1][1];
  }
  function lowY(k, x) {
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
  function sideRing(x, side) {
    var out = [], zk = tbl(KEELZ, x), k;
    var first = 0;
    while (first < LEV.length - 1 && LEV[first][0] < zk) first++;
    var yFirst = lowY(first, x);
    for (k = 0; k < LEV.length; k++) {
      if (LEV[k][0] < zk) out.push([0.8 * yFirst, zk]);
      else out.push([lowY(k, x), LEV[k][0]]);
    }
    var yK = out[LEV.length - 1][0];
    var edge = Math.max(yK, hwAt(x) - 0.8);
    var y17 = Math.min(edge, Math.max(yK, wedge(x, FD_BOT)));
    var y13 = Math.min(y17, yK + (y17 - yK) * 0.45);
    out.push([y13, 13.0], [y17, FD_BOT]);
    return out;
  }

  /* the hull half-breadth at a height between the hangar deck and the gallery */
  function hullYAt(x, z, side) {
    var r = sideRing(x, side), nn = r.length;
    var yK = r[nn - 3][0], y13 = r[nn - 2][0], y17 = r[nn - 1][0];
    if (z <= 13) return lerp(yK, y13, clamp((z - KNUCK) / (13 - KNUCK), 0, 1));
    return lerp(y13, y17, clamp((z - 13) / (FD_BOT - 13), 0, 1));
  }

  function hullGeo(THREE) {
    /* stations: dense at the ends, a pair either side of every lift edge so
       the hangar openings come out square                                 */
    var xs = [-90, -89, -87.5, -85, -82, -78.5, -74, -68, -62, -56, -50, -44, -38, -32, -26, -20, -14, -8, -2, 4, 10, 16, 22, 28, 34, 40, 46, 52, 57, 62, 66, 70, 73.5, 76.5, 79, 81.5, 83.5, 85.2, 86.7, 87.8, 88.6, HX1];
    var i, j;
    DECK.forEach(function (p) { if (p[0] > HX0 + 0.5 && p[0] < HX1 - 0.5) xs.push(p[0]); });
    LIFTS.forEach(function (L) {
      [L.x0, L.x1].forEach(function (e) { xs.push(e - 0.25); xs.push(e + 0.25); });
    });
    xs.sort(function (a, b) { return a - b; });
    var st = [];
    for (i = 0; i < xs.length; i++) if (!st.length || xs[i] - st[st.length - 1] > 0.2) st.push(xs[i]);

    /* ring: top centre, port side top-down, keel centre, starboard bottom-up */
    var rings = [];
    for (i = 0; i < st.length; i++) {
      var x = st[i], P = sideRing(x, 1), S = sideRing(x, -1), r = [];
      r.push([0, FD_BOT]);
      for (j = P.length - 1; j >= 0; j--) r.push([P[j][0], P[j][1]]);
      r.push([0, tbl(KEELZ, x)]);
      for (j = 0; j < S.length; j++) r.push([-S[j][0], S[j][1]]);
      rings.push(r);
    }
    var nR = rings[0].length;
    /* topsides and bottom, split by each triangle's own mean height: every
       ring has a vertex on z = 0, so almost none straddle the waterline   */
    var OUT = { top: { pos: [], nrm: [], uv: [], z0: 0, z1: FD_BOT }, bot: { pos: [], nrm: [], uv: [], z0: KEEL, z1: 0 } };
    function V(ii, jj) { var q = rings[ii][jj % nR]; return [st[ii], q[0], q[1]]; }
    function uOf(x) { return (x - HX0) / (HX1 - HX0); }
    /* Faces are collected first, each corner keyed to its grid vertex, so
       the normals can be smoothed across neighbours: flat facets made the
       twisted quads of the bow flare and the run read as a zigzag. Only
       neighbours within 34 degrees are averaged, so the hangar-deck
       knuckle, the gallery deck and the square lift openings stay crisp. */
    var faces = [];
    function tri(a, b, c, ka, kb, kc) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var cxp = uy * vz - uz * vy, cyp = uz * vx - ux * vz, czp = ux * vy - uy * vx;
      var ar = cxp * cxp + cyp * cyp + czp * czp;
      if (ar < 4e-6) return;                                      /* < 1 mm2 */
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
    /* the transom: a flat cap, fanned from its own centre, keyed apart
       from the loft so its edge stays a hard corner                        */
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
          sx += g2.n[0]; sy += g2.n[1]; sz += g2.n[2];                /* area-weighted */
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
    return { top: geo(OUT.top), bot: geo(OUT.bot) };
  }

  /* ========================================================== weapons
     Twin 3in/50 Mk 33: a round tub, the rotating house and two barrels along
     +X, ring centre at the origin.                                          */
  function gun3Parts(THREE) {
    var P = [];
    P.push(["S", cylZ(THREE, 2.3, 2.4, 1.0, 12, 0, 0, -1.2)]);
    P.push(["S", cylZ(THREE, 1.5, 1.7, 0.8, 10, 0, 0, 0)]);
    P.push(["S", box(THREE, 2.3, 2.3, 1.5, 0, 0, 1.5)]);
    P.push(["S", box(THREE, 1.4, 2.3, 0.9, -0.5, 0, 2.55)]);
    P.push(["M", place(THREE, new THREE.CylinderGeometry(0.1, 0.12, 3.3, 6).rotateZ(-PI / 2), 2.7, 0.45, 1.7)]);
    P.push(["M", place(THREE, new THREE.CylinderGeometry(0.1, 0.12, 3.3, 6).rotateZ(-PI / 2), 2.7, -0.45, 1.7)]);
    P.push(["K", box(THREE, 0.2, 1.5, 0.9, 1.2, 0, 1.6)]);
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
    T.K = new THREE.MeshStandardMaterial({ color: 0x1f2327, roughness: 0.90, metalness: 0.05 });
    T.M = new THREE.MeshStandardMaterial({ color: 0x5d666d, roughness: 0.55, metalness: 0.50 });
    T.G = new THREE.MeshStandardMaterial({ color: 0x121c25, roughness: 0.12, metalness: 0.0, transparent: true, opacity: 0.88 });
    T.W = new THREE.MeshStandardMaterial({ color: 0xd7dbdd, roughness: 0.62, metalness: 0.04 });
    /* the team material, exactly C.team, pulled a couple of depth steps
       toward the camera so its flat strips never shimmer on the deck        */
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

    /* the two lift wells: a dark opening in the hull side under each lift,
       with the lift's guide trunks. Port abaft the island (photographed);
       starboard level with it.                                             */
    LIFTS.forEach(function (L) {
      var xm = (L.x0 + L.x1) * 0.5, yo = L.s * (hwAt(xm) - 0.7);
      B.K.add(box(THREE, L.x1 - L.x0 - 0.8, 0.3, 6.6, xm, yo + L.s * 0.05, KNUCK + 4.0));
      for (j = 0; j < 2; j++) {
        var tx = j ? L.x1 - 0.8 : L.x0 + 0.8;
        B.S.add(box(THREE, 1.4, 1.8, FD_BOT - KNUCK, tx, yo - L.s * 0.9, (FD_BOT + KNUCK) * 0.5));
      }
    });

    /* ---------------------------- catwalks and safety nets round the edge */
    var n = DECK.length;
    for (i = 0; i < n; i++) {
      var a = DECK[i], b = DECK[(i + 1) % n];
      var dx = b[0] - a[0], dy = b[1] - a[1], L2 = Math.sqrt(dx * dx + dy * dy);
      if (L2 < 3) continue;
      var ox = dy / L2, oy = -dx / L2, ang = Math.atan2(dy, dx);
      var reach = Math.max(Math.abs(a[0]), Math.abs(b[0])) + Math.abs(ox) * 3.0;
      if (Math.abs(ox) > 0.8 || reach > DEXT - 0.1) continue;
      var mx = (a[0] + b[0]) * 0.5, my = (a[1] + b[1]) * 0.5;
      B.S.add(box(THREE, L2, 1.3, 0.22, mx + ox * 0.8, my + oy * 0.8, FD_TOP - 1.35, 0, 0, ang));
      var net = new THREE.BoxGeometry(L2 - 0.4, 1.8, 0.08);
      net.rotateX(0.21);
      net.rotateZ(ang - PI);
      net.translate(mx + ox * 2.1, my + oy * 2.1, FD_TOP - 0.55);
      B.K.add(net);
      B.M.add(box(THREE, L2, 0.08, 0.08, mx + ox * 1.4, my + oy * 1.4, FD_TOP - 0.22, 0, 0, ang));
      /* net stanchions every 3 m along the outer rail, leaning out         */
      var np = Math.max(1, Math.floor(L2 / 3.0));
      for (j = 0; j < np; j++) {
        var fp = (j + 0.5) / np, pxx = a[0] + dx * fp, pyy = a[1] + dy * fp;
        B.M.add(strut(THREE, pxx + ox * 1.4, pyy + oy * 1.4, FD_TOP - 1.2, pxx + ox * 2.7, pyy + oy * 2.7, FD_TOP - 0.1, 0.045, 4));
      }
    }
    /* life-raft canister racks under the gallery, three canisters a rack    */
    for (i = 0; i < n; i++) {
      var a3 = DECK[i], b3 = DECK[(i + 1) % n];
      var ex = b3[0] - a3[0], ey = b3[1] - a3[1], LE = Math.sqrt(ex * ex + ey * ey);
      if (LE < 18 || Math.abs(ey / LE) > 0.6) continue;
      var k3 = Math.floor(LE / 10), ea = Math.atan2(ey, ex);
      for (j = 0; j < k3; j++) {
        var f = (j + 0.5) / k3;
        var rx = a3[0] + ex * f + (ey / LE) * 0.5, ry = a3[1] + ey * f - (ex / LE) * 0.5;
        /* none across a lift opening                                        */
        var skip = false;
        LIFTS.forEach(function (L) { if (rx > L.x0 - 2 && rx < L.x1 + 2 && Math.abs(ry) > 8) skip = true; });
        if (skip) continue;
        B.S.add(box(THREE, 3.2, 2.0, 0.15, rx - (ey / LE) * 0.5, ry + (ex / LE) * 0.5, FD_TOP - 2.45, 0, 0, ea));
        for (var d3 = -1; d3 <= 1; d3++) {
          var can = new THREE.CylinderGeometry(0.5, 0.5, 1.1, 6);
          can.translate(d3 * 1.0, 0, 0.5);
          B.W.add(place(THREE, can, rx, ry, FD_TOP - 2.4, 0, 0, ea));
        }
      }
    }

    /* --------------------------------------------- stern and bow details */
    /* the stern: overhanging transom with the two scuttles the aft view shows */
    B.S.add(box(THREE, 5.0, 24.0, 4.0, -87.5, 0, FD_BOT - 2.0));
    for (s = -1; s <= 1; s += 2) B.G.add(box(THREE, 0.12, 2.2, 1.4, -90.05, s * 3.5, FD_BOT - 4.6));
    B.K.add(box(THREE, 0.3, 14.0, 3.6, HX0 - 0.1, 0, 5.8));
    /* a hull-side boat recess abaft the port lift, the boat in it on its davits */
    B.K.add(box(THREE, 9.5, 0.3, 3.4, -2.0, hwAt(-2) - 0.7 - 0.02 + 0.0, 12.2));
    var bx = -2.0, by = hwAt(-2) - 1.9;
    var bt = M.loft(THREE, [
      { x: bx + 4.6, w: 0.1, h: 0.2, zc: 11.5 },
      { x: bx + 3.0, w: 1.1, h: 1.0, zc: 11.4 },
      { x: bx, w: 1.35, h: 1.1, zc: 11.3 },
      { x: bx - 3.4, w: 1.2, h: 1.0, zc: 11.3 },
      { x: bx - 4.6, w: 0.9, h: 0.8, zc: 11.4 },
    ], 8);
    place(THREE, bt, 0, by, 0);
    B.W.add(bt);
    B.M.add(strut(THREE, bx + 2.5, by, 12.4, bx + 2.5, by + 1.0, 16.0, 0.12, 5));
    B.M.add(strut(THREE, bx - 2.5, by, 12.4, bx - 2.5, by + 1.0, 16.0, 0.12, 5));

    /* anchors and hawse pipes, one each bow                                */
    for (s = -1; s <= 1; s += 2) {
      var ya = sideRing(82.0, s)[LEV.length - 1][0];
      B.K.add(place(THREE, new THREE.CylinderGeometry(0.8, 0.8, 0.3, 10).rotateX(PI / 2).rotateZ(0), 82.0, s * (ya + 0.25), 9.8));
      B.M.add(box(THREE, 2.0, 0.45, 2.6, 81.0, s * (ya + 0.3), 8.0));
    }
    /* bilge keels                                                           */
    for (s = -1; s <= 1; s += 2) {
      var bk = lowY(3, 0) + 0.4;
      B.U.add(box(THREE, 80.0, 0.3, 1.4, -4.0, s * bk, -4.0, s * 0.75, 0, 0));
    }
    /* the single screw: a five-blade propeller on its shaft, a skeg and a rudder */
    B.M.add(strut(THREE, -56.0, 0, -6.6, -84.0, 0, -2.4, 0.55, 7));
    B.M.add(place(THREE, new THREE.CylinderGeometry(0.5, 0.85, 1.8, 8).rotateZ(PI / 2), -85.5, 0, -2.2));
    for (j = 0; j < 5; j++) {
      var bl = new THREE.BoxGeometry(0.32, 1.5, 2.8);
      bl.translate(0, 0, 1.7);
      bl.rotateZ(0.4);
      bl.rotateX(j * 2 * PI / 5);
      bl.translate(-85.5, 0, -2.2);
      B.M.add(bl);
    }
    B.M.add(box(THREE, 5.0, 0.5, 5.0, -88.0, 0, -0.4));
    B.M.add(box(THREE, 1.8, 0.5, 4.0, -83.2, 0, -4.0));
    for (s = -1; s <= 1; s += 2) B.M.add(strut(THREE, -80.0, s * 0.1, -3.6, -84.5, s * 2.4, -4.2, 0.2, 4));


    /* ladders and doors on the hull side, and the mooring fittings the
       photographs show along the gallery: bollards on the catwalk         */
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 26; j++) {
        var qx = -72 + j * 5.6 + (s > 0 ? 1.1 : 0);
        var qh = hwAt(qx) - 1.2;
        B.K.add(box(THREE, 0.7, 0.9, 0.5, qx, s * (qh + 0.3), FD_TOP - 1.05));
      }
    }
    /* hull-side doors and rubbing strakes: a few dark rectangles on the
       topsides, and a fender strake at the hangar deck                     */
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 8; j++) {
        var dxx = -66 + j * 17 + (s > 0 ? 3 : 0);
        var skipD = false;
        LIFTS.forEach(function (L) { if (dxx > L.x0 - 3 && dxx < L.x1 + 3) skipD = true; });
        if (skipD || (s > 0 && dxx > -9 && dxx < 5)) continue;
        var yd = hullYAt(dxx, 10.6, s);
        B.K.add(box(THREE, 1.0, 0.18, 2.0, dxx, yd * s * 1.0 + s * 0.03, 10.6));
        B.M.add(box(THREE, 0.08, 0.2, 2.2, dxx + 0.6, s * (yd + 0.05), 10.6));
      }
    }

    /* ----------------------------------------------------------- gun sponsons */
    function sponson(pts, ztop, depth, side) {
      pts = ccw(pts);
      B.S.add(plate(THREE, pts, ztop - 0.6, ztop));
      var yin = Math.min.apply(null, pts.map(function (q) { return Math.abs(q[1]); }));
      var knee = pts.map(function (q) { return [q[0], side * lerp(yin, Math.abs(q[1]), 0.3)]; });
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
    var ZS = FD_TOP - 3.0;
    /* Four twin 3in/50 Mk 33, the 1961-70 fit (USNI Proceedings Nov 1963: four
       twin mounts, two in tandem forward of the island and one on each stern
       quarter; the 1962 deck photograph shows the forward pair on the
       starboard edge beside the island's forward face). Two were later
       replaced by Sea Sparrow, so this is the as-built count.              */
    [[-80.5,  1, PI - 0.4], [-80.5, -1, PI + 0.4]].forEach(function (g3) {
      var gx = g3[0], gs = g3[1];
      var gy = gs * (hwAt(gx) + 1.8);
      sponson([[gx - 3.0, gs * (hwAt(gx) - 0.3)], [gx + 3.0, gs * (hwAt(gx) - 0.3)],
               [gx + 3.0, gy + gs * 3.0], [gx - 3.0, gy + gs * 3.0]], ZS, 3.2, gs);
      emit(gun3Parts(THREE), gx, gy, ZS, g3[2]);
    });
    sponson([[13.5, -(DHW - 0.3)], [30.0, -(DHW - 0.3)], [30.0, -(DHW + 4.8)], [13.5, -(DHW + 4.8)]], ZS, 3.2, -1);
    [17.0, 26.5].forEach(function (gx) {
      emit(gun3Parts(THREE), gx, -(DHW + 1.8), ZS, -0.35);
    });

    /* ---------------------------------------------------------- the island
       Three stepped tiers, a window band round each, the integral funnel
       abaft the pilot house, bridge wings out over the edge, the pole
       mast and its radars.                                                  */
    var Z0 = FD_TOP;
    var BLK = [[ISL_X0, ISL_YO], [ISL_X1, ISL_YO], [ISL_X1, ISL_YI], [ISL_X0, ISL_YI]];
    B.S.add(frustum(THREE, BLK, Z0, Z0 + 5.2, 1.0, 0.975));
    var P2 = [[-11.0, -15.6], [7.0, -15.6], [7.0, -7.4], [-11.0, -7.4]];
    B.S.add(frustum(THREE, P2, Z0 + 5.2, Z0 + 9.0, 1.0, 0.97));
    var P3 = [[-8.5, -14.6], [4.5, -14.6], [4.5, -8.4], [-8.5, -8.4]];
    B.S.add(frustum(THREE, P3, Z0 + 9.0, Z0 + 12.4, 1.0, 0.97));
    /* the roof lip of each tier                                             */
    B.S.add(plate(THREE, scalePts(BLK, 1.0), Z0 + 5.0, Z0 + 5.22));
    B.S.add(plate(THREE, scalePts(P2, 1.04), Z0 + 8.9, Z0 + 9.1));
    /* windows: forward and outboard faces, two bands                         */
    B.G.add(box(THREE, 0.12, 8.0, 1.2, 7.05, -11.5, Z0 + 7.0));
    B.G.add(box(THREE, 17.0, 0.12, 1.2, -2.0, -15.65, Z0 + 7.0));
    B.G.add(box(THREE, 0.12, 5.4, 1.0, 4.55, -11.5, Z0 + 10.7));
    B.G.add(box(THREE, 12.0, 0.12, 1.0, -2.0, -14.65, Z0 + 10.7));
    B.G.add(box(THREE, 0.12, 6.0, 1.0, 5.02, -11.5, Z0 + 3.2));
    B.G.add(box(THREE, 12.0, 0.12, 0.9, -1.0, -16.0, Z0 + 3.4));
    /* flag bridge and bridge wings: a plate each side, outer one over the edge */
    B.S.add(box(THREE, 6.5, 3.2, 0.3, 1.0, -17.3, Z0 + 8.1));
    B.S.add(box(THREE, 6.5, 3.2, 0.3, 1.0, -4.6, Z0 + 8.1));
    ringRail([[-2.2, -18.9], [4.2, -18.9], [4.2, -15.6], [-2.2, -15.6]], Z0 + 9.1);
    /* the integral funnel: a raked, flat-topped stack at the after end, its cap
       dark, a grille across it                                              */
    var STK = [[-13.0, -15.6], [-5.5, -15.0], [-5.5, -9.0], [-13.0, -8.6]];
    B.S.add(frustum(THREE, STK, Z0 + 5.2, Z0 + 14.5, 1.0, 0.8));
    B.K.add(plate(THREE, scalePts(STK, 0.72), Z0 + 14.45, Z0 + 14.8));
    for (j = 0; j < 4; j++) B.M.add(box(THREE, 6.0, 0.12, 0.12, -9.3, -12.0 + (j - 1.5) * 1.3, Z0 + 14.95));
    ringRail([[-12.4, -14.2], [-6.3, -14.0], [-6.3, -9.8], [-12.4, -9.6]], Z0 + 12.5);
    /* roof deck rails and the doors/vents that crowd it                     */
    ringRail([[-8.0, -14.2], [4.0, -14.2], [4.0, -8.8], [-8.0, -8.8]], Z0 + 13.2);
    B.K.add(box(THREE, 1.2, 0.12, 1.8, 2.0, -14.65, Z0 + 3.0));
    B.K.add(box(THREE, 1.2, 0.12, 1.8, -6.0, -16.0, Z0 + 2.2));
    for (s = 0; s < 3; s++) B.S.add(box(THREE, 1.4, 1.2, 1.2, -9.0 + s * 3.0, -8.0, Z0 + 5.8));
    /* the pole mast: a tapered round mast off the roof, a yard and a platform,
       the masthead radar, and a whip at the top                             */
    var MX = -1.0, MY = -11.5, MZ0 = Z0 + 8.4, MZ1 = Z0 + 26.5;
    B.S.add(cylZ(THREE, 0.2, 0.5, MZ1 - MZ0, 8, MX, MY, MZ0));
    B.S.add(box(THREE, 0.2, 9.0, 0.22, MX, MY, Z0 + 20.5));
    B.S.add(place(THREE, new THREE.CylinderGeometry(1.7, 1.7, 0.3, 8).rotateX(PI / 2), MX, MY, Z0 + 16.5));
    ringRail([[MX - 1.3, MY - 1.3], [MX + 1.3, MY - 1.3], [MX + 1.3, MY + 1.3], [MX - 1.3, MY + 1.3]], Z0 + 17.4);
    for (s = -1; s <= 1; s += 2) {
      B.M.add(strut(THREE, MX, MY + s * 0.5, Z0 + 19.0, MX, MY + s * 4.2, Z0 + 20.4, 0.07, 4));
      B.M.add(strut(THREE, MX + 0.6, MY + s * 3.4, Z0 + 20.6, MX + 0.6, MY + s * 3.4, Z0 + 23.2, 0.04, 4));
    }
    /* SPS-10 surface search on the platform, an SPS-12 bedspring on a mast-top
       platform                                                              */
    B.K.add(box(THREE, 0.7, 0.6, 0.8, MX + 0.6, MY, Z0 + 17.0));
    B.K.add(box(THREE, 0.18, 3.6, 0.7, MX + 0.6, MY, Z0 + 18.0));
    B.S.add(place(THREE, new THREE.CylinderGeometry(1.2, 1.2, 0.25, 8).rotateX(PI / 2), MX, MY, Z0 + 24.2));
    B.M.add(strut(THREE, MX, MY, Z0 + 24.2, MX, MY, Z0 + 25.2, 0.35, 6));
    for (j = 0; j < 7; j++) B.M.add(box(THREE, 0.22, 4.8, 0.08, MX, MY, Z0 + 25.2 + (j / 6) * 2.0));
    for (s = -1; s <= 1; s += 2) B.M.add(box(THREE, 0.22, 0.1, 2.1, MX, MY + s * 2.4, Z0 + 26.2));
    B.M.add(box(THREE, 0.14, 4.8, 0.12, MX - 0.25, MY, Z0 + 26.3));
    B.M.add(strut(THREE, MX, MY, Z0 + 27.2, MX, MY, MZ1 + 3.0, 0.1, 5, 0.05));
    B.W.add(place(THREE, new THREE.CylinderGeometry(0.55, 0.55, 0.18, 8).rotateX(PI / 2), MX, MY, MZ1 + 3.1));
    /* the radome on its little tower at the forward port corner of the
       pilot house roof, whips and the lattice air-control radar mast abaft   */
    B.S.add(box(THREE, 1.2, 1.2, 2.2, 5.2, -10.0, Z0 + 10.1));
    B.W.add(sphere(THREE, 1.35, 12, 8, 5.2, -10.0, Z0 + 12.9));
    for (s = -1; s <= 1; s += 2) {
      B.M.add(strut(THREE, -4.0, -9.0 + s * 3.0, Z0 + 12.4, -4.0, -9.0 + s * 3.0, Z0 + 19.0, 0.05, 4));
    }
    B.M.add(strut(THREE, -6.8, -13.0, Z0 + 12.4, -6.8, -13.0, Z0 + 21.0, 0.07, 4));
    /* the twin lattice (SPN) radar: a small bar on a lattice tower, forward
       on the roof                                                           */
    for (j = 0; j < 4; j++) {
      var tx2 = 2.8 + (j & 1) * 1.4, ty2 = -9.4 - (j >> 1) * 1.4;
      B.M.add(strut(THREE, tx2, ty2, Z0 + 12.4, 3.4 + (j & 1) * 0.5, -10.1 - (j >> 1) * 0.5, Z0 + 17.0, 0.05, 4));
    }
    B.K.add(box(THREE, 0.2, 3.0, 1.1, 3.6, -10.1, Z0 + 17.5));
    /* island detail: gun-director style boxes, searchlights on the wings, the
       ladders between tiers, signal-flag lockers, vents and the cable trays
       that run up the forward face                                          */
    for (s = -1; s <= 1; s += 2) {
      var wy = s < 0 ? -18.3 : -4.6;
      B.M.add(cylZ(THREE, 0.38, 0.38, 0.9, 8, 2.2, wy, Z0 + 8.4));
      B.K.add(box(THREE, 0.7, 0.5, 0.5, 2.5, wy, Z0 + 9.5));
    }
    for (j = 0; j < 5; j++) {
      B.M.add(box(THREE, 0.08, 0.5, 1.8, -5.0 + j * 2.6, -15.7, Z0 + 3.0));
      B.S.add(box(THREE, 1.5, 1.0, 1.1, -8.5 + j * 3.2, -16.0, Z0 + 1.0));
      B.W.add(cylZ(THREE, 0.4, 0.4, 0.9, 6, -7.0 + j * 3.0, -8.6, Z0 + 9.0));
    }
    for (j = 0; j < 10; j++) B.M.add(box(THREE, 0.1, 0.5, 0.1, -9.0 + j * 1.7, -14.2, Z0 + 12.5 + 0.3 * (j & 1)));
    for (j = 0; j < 6; j++) {
      B.M.add(strut(THREE, 6.8, -15.2 + j * 1.3, Z0 + 5.2, 6.8, -15.2 + j * 1.3, Z0 + 9.0, 0.05, 4));
      B.S.add(box(THREE, 0.4, 1.0, 0.3, 4.8, -10.0 - j * 0.6, Z0 + 13.1));
    }
    /* the fuel and weapons stations at the island foot: small boxes and
       hose reels                                                            */
    for (j = 0; j < 6; j++) {
      B.S.add(box(THREE, 1.6, 1.2, 1.0, 12.4, -8.0 - j * 1.5, Z0 + 0.5));
      B.M.add(place(THREE, new THREE.CylinderGeometry(0.4, 0.4, 0.9, 8).rotateX(PI / 2), 13.5, -7.5 - j * 1.4, Z0 + 0.5));
    }
    /* radar-warning and comms whips on the island roof and the bridge wings  */
    for (j = 0; j < 8; j++) {
      B.M.add(strut(THREE, -7.5 + j * 1.8, -8.9 - (j & 1) * 4.8, Z0 + 12.4, -7.5 + j * 1.8, -8.9 - (j & 1) * 4.8, Z0 + 15.2 + 0.7 * (j % 3), 0.035, 4));
    }
    /* aircraft-handling kit along the island base: tractor-sized boxes and a
       fuel hose reel are small enough to leave to the helicopters           */

    /* ------------------------------------------------------ team strips
       three flat boxes 1 x 4 m, 2 cm proud of their surface, facing up.    */
    function strip(x, y, z) { B.T.add(box(THREE, 4.0, 1.0, 0.04, x, y, z + 0.02)); }
    strip(-83.0, 0, FD_TOP);
    strip(84.0, 0, FD_TOP);
    strip(-5.5, -11.5, Z0 + 12.4);

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

UNIT_MODELS["nato_e60_lph"] = {
  len: 180.4,
  build: function (THREE, M, C) { return HeroLPH2.build(THREE, M, C); }
};
