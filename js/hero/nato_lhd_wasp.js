/* ============================================================================
   nato_lhd_wasp.js -- HERO model: USS Wasp (LHD-1) and the Wasp class.
   Registered as nato_e90_lhd (1989-1990s fit) and nato_e00_lhd (2000s fit:
   the same ship with two RAM launchers added). One build(), one flag.

   References, named so the next person can check them:
     - "Aerial view of USS Kearsarge (LHD-3) while she transiting the
       Atlantic Ocean during Northern Viking 2022" (US Navy, Wikimedia
       Commons). A near-overhead of a Wasp-class ship, bow to the LEFT, the
       island to the top (starboard). Deck outline, island station, the
       two deck-edge lifts, the spot and line markings and the stern
       chamfers are read off it on a metre grid (257 m / 838 px).
     - "A starboard side view of the amphibious assault ship USS Wasp
       (LHD 1) ... MV-22B Osprey flight operations", 19 Nov 2005 (US Navy,
       Wikimedia Commons), a silhouette: two lattice masts, the taller
       forward, the island low and set aft of midships, the flared bow and
       the deck overhang.
     - en.wikipedia "Wasp-class amphibious assault ship": 257 m overall,
       31.8 m beam on the waterline, 8.1 m draught, a well deck 81 x 15.2 m
       with the stern gate, two deck-edge aircraft lifts, nine helicopter
       spots, 41,150 t full load; the bridge lower than the Tarawa's.

   What reads at a glance: one long flush flight deck, square at the bow and
   chamfered at the stern corners, the whole length of the ship; a smallish
   island on the starboard edge aft of midships with two stacks and two
   lattice masts; a lift on the starboard quarter abaft the island and one
   to port abreast the island's after end, both outboard of the deck edge;
   a catwalk gallery all round under the deck edge; the closed well-deck
   gate across the transom; sponson-mounted Sea Sparrow and Phalanx.

   NOT confirmed by any reference seen, and so approximate: the exact set
   and layout of the island's radars (the big flat array on the after mast
   and the rotating air-search antenna are drawn as generic shapes), and the
   exact sponson stations of the Mk 29, Phalanx and RAM mounts. Only the
   port-quarter dome shows in the overhead. The 25 mm Mk 38 and the .50
   cal mounts are not drawn. The 2000s row differs from the 1990s row by the
   two RAM launchers alone; nothing else on the ship is changed.

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0, keel
   z = -8.1, flight deck z = 18.3. Nothing stands on the flight deck or past
   either end of it. No hull number, name or ensign is drawn. Every static
   part is merged into one mesh per material; the team colour is exactly
   C.team on three 1 x 4 m strips on the island roof.

   ASCII only -- a stray byte in a hex literal has broken this project.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroWaspLHD = (function () {
  "use strict";

  var PI = Math.PI;

  /* ---------------------------------------------------- principal dimensions */
  var LOA    = 257.0;              /* flight deck, end to end: x -128.5..128.5 */
  var XB = 128.5, XS = -128.5;
  var FD_TOP = 18.3;               /* flight deck above the waterline          */
  var FD_TH  = 2.8;                /* deck plate and its gallery girders       */
  var FD_BOT = FD_TOP - FD_TH;     /* 15.5: top of the hull loft               */
  var KEEL   = -8.1;               /* draught 8.1 m                            */
  var HX0 = -126.5, HX1 = 128.0;   /* hull loft: transom, stem head            */
  var DHW = 21.35;                 /* flight deck half-width (42.7 m)          */

  var DECK = [
    [ 128.5, -DHW], [ 128.5, DHW], [-117.5, DHW], [-128.5, 14.0],
    [-128.5, -12.0], [-116.0, -DHW]
  ];
  /* lifts: outboard of the deck edge, flush with the deck */
  var LIFTS = [
    { x0: -99.0, x1: -81.0, y0: -DHW, y1: -35.0, s: -1 },   /* starboard quarter */
    { x0: -55.0, x1: -37.0, y0:  DHW, y1:  36.0, s:  1 }    /* port, abreast the island's after end */
  ];

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
  /* a closed frustum on a convex plan, bottom outline at zb, the same
     outline scaled about its centroid at zt; UVs in metres / 16          */
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

  /* ============================================================= textures */
  var PAINT = { hull: 0x757c83, sup: 0x7d858c, deck: 0x55595c };

  function hullTex(THREE, zTop, zBot, H, seed) {
    var W = 1024, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(seed), i, x, y, z;
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
    for (i = 0; i < 200; i++) {
      z = zBot + R() * (zTop - zBot);
      g.globalAlpha = z < 0 ? 0.05 + R() * 0.07 : 0.035 + R() * 0.045;
      g.fillStyle = z < 0 ? (R() < 0.5 ? "#7a3a31" : "#3c1c19") : (R() < 0.5 ? "#ffffff" : "#000000");
      g.fillRect(R() * W, rowZ(z), 30 + R() * 200, (0.3 + R() * 1.0) * PXZ);
    }
    g.globalAlpha = 1;
    band(1.5, -0.8, "#17191c");                      /* boot topping */
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.2;
    for (i = 1; i < 60; i++) {
      x = i * W / 60 + (R() - 0.5) * 4;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
    }
    for (i = 1; i < 8; i++) hline(i * 2.0);
    for (i = 1; i < 4; i++) hline(-i * 2.2);
    /* weathering from the scuppers */
    if (zTop > 4) {
      for (i = 0; i < 50; i++) {
        x = R() * W; y = rowZ(3 + R() * 11);
        var len = (2 + R() * 5) * PXZ;
        var gr = g.createLinearGradient(0, y, 0, y + len);
        gr.addColorStop(0, "rgba(92,58,40,0.30)");
        gr.addColorStop(1, "rgba(92,58,40,0.0)");
        g.fillStyle = gr; g.fillRect(x, y, 1.5 + R() * 2.2, len);
      }
    }
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }
  function supTex(THREE) {
    var W = 512, H = 256, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(9021), i;
    g.fillStyle = hx(PAINT.sup); g.fillRect(0, 0, W, H);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.04 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 20 + R() * 90, 8 + R() * 30);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.24)"; g.lineWidth = 1.2;
    for (i = 1; i < 12; i++) {
      g.beginPath(); g.moveTo(i * W / 12, 0); g.lineTo(i * W / 12, H); g.stroke();
      g.beginPath(); g.moveTo(0, i * H / 12); g.lineTo(W, i * H / 12); g.stroke();
    }
    g.fillStyle = "rgba(20,22,25,0.40)";
    for (i = 0; i < 14; i++) g.fillRect(R() * W, R() * H, 10 + R() * 6, 22 + R() * 8);
    return finish(THREE, cv);
  }

  var DX0 = -134, DX1 = 134, DY0 = -40, DY1 = 40;
  /* the spot marks, read off the overhead: x of the vertical stroke */
  var SPOTS = [99, 64, 29, -6, -54, -95];
  var CLY = 9.3;                                     /* yellow line, to port of the axis */

  function deckTex(THREE) {
    var W = 2048, H = 612, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(1989), i, p, q;
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
    for (i = 0; i < 420; i++) {
      g.globalAlpha = 0.04 + R() * 0.06;
      g.fillStyle = R() < 0.5 ? "#8d949a" : "#212529";
      g.fillRect(R() * W, R() * H, 24 + R() * 160, 10 + R() * 40);
    }
    g.globalAlpha = 0.22; g.fillStyle = "#14171a";
    for (i = 0; i < 4500; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    g.fillStyle = "rgba(12,14,16,0.28)";
    for (p = DX0 + 1.5; p < DX1; p += 3.0)
      for (q = DY0 + 1.5; q < DY1; q += 3.0) g.fillRect(cx(p) - 1, cy(q) - 1, 2.0, 2.0);
    /* exhaust scorch where the jets and rotors sit */
    g.fillStyle = "#0c0e10";
    for (i = 0; i < 26; i++) {
      var sx = SPOTS[i % SPOTS.length] + (R() - 0.5) * 14, sy = CLY + (R() - 0.5) * 14;
      g.globalAlpha = 0.07 + R() * 0.08;
      g.beginPath(); g.ellipse(cx(sx), cy(sy), (2 + R() * 4) * SX, (1.5 + R() * 3) * SY, 0, 0, PI * 2); g.fill();
    }
    g.globalAlpha = 1;
    /* the yellow centreline to port of the axis, and the white dashes either side */
    mline([-120, CLY], [127, CLY], 0.6, "#d8a23a");
    mline([-122, CLY + 4.0], [126, CLY + 4.0], 0.35, "#e8ecee", [4.5, 11]);
    mline([-122, CLY - 9.8], [126, CLY - 9.8], 0.35, "#e8ecee", [4.5, 11]);
    /* the spots: a stroke across the line and a short diagonal ahead of it */
    SPOTS.forEach(function (sxp) {
      mline([sxp - 1.2, CLY - 6.5], [sxp + 1.2, CLY + 7.5], 0.45, "#e8ecee");
      mline([sxp + 8.5, CLY - 2.8], [sxp + 4.5, CLY - 0.2], 0.45, "#e8ecee");
    });
    /* the bow edge is a broad yellow band, the deck edge a white line all round */
    mline([127.2, -DHW + 1.0], [127.2, DHW - 1.0], 1.3, "#d8a23a");
    g.save();
    g.strokeStyle = "rgba(226,230,232,0.7)"; g.lineWidth = Math.max(1.2, 0.5 * SY);
    g.beginPath(); g.moveTo(cx(DECK[0][0]), cy(DECK[0][1]));
    for (i = 1; i < DECK.length; i++) g.lineTo(cx(DECK[i][0]), cy(DECK[i][1]));
    g.closePath(); g.stroke(); g.restore();
    /* lifts: yellow edge, red dashed border inside */
    LIFTS.forEach(function (L) {
      var ya = Math.min(L.y0, L.y1), yb = Math.max(L.y0, L.y1);
      g.save();
      g.strokeStyle = "rgba(170,52,44,0.85)"; g.lineWidth = Math.max(1.2, 0.3 * SY);
      g.setLineDash([1.6 * SX, 1.2 * SX]);
      g.strokeRect(cx(L.x0 + 0.8), cy(yb - 0.8), (L.x1 - L.x0 - 1.6) * SX, (yb - ya - 1.6) * SY);
      g.restore();
      mline([L.x0, ya], [L.x0, yb], 0.4, "#d8a23a");
      mline([L.x1, ya], [L.x1, yb], 0.4, "#d8a23a");
      mline([L.x0, L.s > 0 ? yb : ya], [L.x1, L.s > 0 ? yb : ya], 0.4, "#d8a23a");
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
      top:  hullTex(THREE, FD_BOT, 0, 192, 19891),
      bot:  hullTex(THREE, 0, KEEL, 96, 19892),
      sup:  supTex(THREE),
      deck: deckTex(THREE)
    };
    return _tex;
  }

  /* ================================================================= hull
     Lofted from station outlines: a full, boxy section with moderate flare to
     the deck gallery, a fine bow whose flare opens hard toward the deck, a
     square transom with the well-deck gate, and a keel that rises under the
     run. Levels: z, mid half-breadth, where the forward taper starts, stem x,
     taper power and blunt exponent, where the after taper starts and ends. */
  var LEV = [
    /*  z      yMid  xb0   stemX   p    q     xs0    xsEnd  ps */
    [ -8.1,    5.0,  -20,   96.0, 1.5, 0.90,  -80, -150, 1.3 ],
    [ -6.5,   10.5,  -10,  103.0, 1.6, 0.80,  -90, -190, 1.5 ],
    [ -4.0,   13.8,    0,  108.0, 1.8, 0.70, -100, -230, 1.8 ],
    [  0.0,   15.9,   10,  116.0, 2.0, 0.60, -105, -260, 2.0 ],
    [  5.0,   16.9,   30,  119.5, 2.2, 0.60, -118, -400, 2.0 ],
    [ 10.0,   17.9,   50,  123.0, 2.6, 0.35, -999, -9999, 1 ],
    [ FD_BOT, 19.0,   70,  128.0, 3.0, 0.25, -999, -9999, 1 ]
  ];
  var KEELZ = [
    [-126.5, -3.6], [-118, -5.0], [-108, -7.0], [-96, -8.1], [92, -8.1],
    [100, -7.2], [104, -6.0], [108, -4.0], [112, -2.0], [116, 0.0],
    [119.5, 5.0], [123, 10.0], [128, FD_BOT]
  ];
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
  /* one side's outline at station x, keel to the hull top, as [y, z] */
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

  function hullGeo(THREE) {
    var xs = [], i, j, x;
    for (x = HX0; x < -100; x += 3.5) xs.push(x);
    for (x = -100; x < 88; x += 7.0) xs.push(x);
    for (x = 88; x < HX1 - 0.5; x += 2.6) xs.push(x);
    xs.push(HX1);
    var rings = [];
    for (i = 0; i < xs.length; i++) {
      var S = sideRing(xs[i]), r = [];
      r.push([0, FD_BOT]);
      for (j = S.length - 1; j >= 0; j--) r.push([S[j][0], S[j][1]]);      /* port, top down */
      r.push([0, tbl(KEELZ, xs[i])]);
      for (j = 0; j < S.length; j++) r.push([-S[j][0], S[j][1]]);          /* starboard, bottom up */
      rings.push(r);
    }
    var nR = rings[0].length;
    var OUT = { top: { pos: [], nrm: [], uv: [], z0: 0, z1: FD_BOT }, bot: { pos: [], nrm: [], uv: [], z0: KEEL, z1: 0 } };
    function V(ii, jj) { var q = rings[ii][jj % nR]; return [xs[ii], q[0], q[1]]; }
    var faces = [];
    /* every face is wound outward by testing it against an interior point of
       its own station, so the loft needs no winding bookkeeping */
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
      var ref = [xs[i], 0, (FD_BOT + tbl(KEELZ, xs[i])) * 0.5];
      for (j = 0; j < nR; j++) {
        tri(V(i, j), V(i + 1, j), V(i, j + 1), K(i, j), K(i + 1, j), K(i, j + 1), ref);
        tri(V(i, j + 1), V(i + 1, j), V(i + 1, j + 1), K(i, j + 1), K(i + 1, j), K(i + 1, j + 1), ref);
      }
    }
    var r0 = rings[0], cyy = 0, czz = 0;
    for (j = 0; j < nR; j++) { cyy += r0[j][0]; czz += r0[j][1]; }
    var C = [xs[0], cyy / nR, czz / nR];
    for (j = 0; j < nR; j++) tri(C, V(0, j), V(0, j + 1), -1, -2 - j, -2 - ((j + 1) % nR), [0, 0, 5]);
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
        o.uv.push((q[0] - HX0) / (HX1 - HX0), clamp((q[2] - o.z0) / (o.z1 - o.z0), 0, 1));
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
     Built in their own frame, gun or launcher along +X, ring centre at the
     origin, then dropped into the batches at a heading.                   */
  function phalanxParts(THREE) {
    return [
      ["S", cylZ(THREE, 0.95, 1.05, 0.8, 10, 0, 0, 0)],
      ["W", box(THREE, 1.7, 1.5, 1.1, -0.15, 0, 1.35)],
      ["W", cylZ(THREE, 0.72, 0.72, 1.55, 10, -0.35, 0, 1.9)],
      ["W", sphere(THREE, 0.72, 10, 3, -0.35, 0, 3.45, 1, 1, 1, true)],
      ["M", place(THREE, new THREE.CylinderGeometry(0.2, 0.24, 2.3, 8).rotateZ(-PI / 2), 1.65, 0, 1.3)],
      ["K", box(THREE, 0.5, 0.36, 0.36, 0.55, 0.72, 1.55)]
    ];
  }
  /* Mk 29: the eight-cell box launcher on its pedestal */
  function mk29Parts(THREE) {
    return [
      ["S", cylZ(THREE, 0.9, 1.1, 1.1, 10, 0, 0, 0)],
      ["S", box(THREE, 0.7, 2.9, 1.2, 0, 0, 1.6)],
      ["S", box(THREE, 3.9, 2.5, 1.8, 0.2, 0, 2.7, 0, -0.33, 0)],
      ["K", box(THREE, 0.12, 2.2, 1.5, 2.08, 0, 3.37, 0, -0.33, 0)]
    ];
  }
  /* Mk 49: the 21-round RAM box on its mount */
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

  /* ================================================================ build */
  function build(THREE, M, C, withRAM) {
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
    /* a rail: posts every 3 m and one top bar, on a straight run */
    function rail(x0, y0, x1, y1, z, h) {
      var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy), n = Math.max(1, Math.round(L / 3));
      B.M.add(box(THREE, L, 0.07, 0.07, (x0 + x1) / 2, (y0 + y1) / 2, z + h, 0, 0, Math.atan2(dy, dx)));
      B.M.add(box(THREE, L, 0.05, 0.05, (x0 + x1) / 2, (y0 + y1) / 2, z + h * 0.5, 0, 0, Math.atan2(dy, dx)));
      for (var q = 0; q <= n; q++) {
        var t = q / n;
        B.M.add(box(THREE, 0.07, 0.07, h, x0 + dx * t, y0 + dy * t, z + h * 0.5));
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

    /* the two deck-edge lifts, flush with the deck, outboard of its edge;
       a support box under each, a guard rail round the outer edges */
    LIFTS.forEach(function (L) {
      var ya = Math.min(L.y0, L.y1), yb = Math.max(L.y0, L.y1);
      var ls = new THREE.Shape();
      ls.moveTo(L.x0, ya); ls.lineTo(L.x1, ya); ls.lineTo(L.x1, yb); ls.lineTo(L.x0, yb);
      ls.closePath();
      var lg = new THREE.ExtrudeGeometry(ls, { depth: 0.9, bevelEnabled: false });
      lg.translate(0, 0, FD_TOP - 0.9);
      Batch.addGroups(lg, [B.D, B.S]);
      var yc = (ya + yb) / 2, hy = yb - ya;
      B.K.add(box(THREE, L.x1 - L.x0 - 1.2, hy - 0.8, 0.5, (L.x0 + L.x1) / 2, yc, FD_TOP - 1.15));
      B.S.add(box(THREE, 1.6, hy, 4.2, L.x0 + 1.0, yc, FD_TOP - 3.2));
      B.S.add(box(THREE, 1.6, hy, 4.2, L.x1 - 1.0, yc, FD_TOP - 3.2));
      var ye = L.s > 0 ? yb : ya;
      rail(L.x0, ye, L.x1, ye, FD_TOP - 0.9, 1.1);
      rail(L.x0, ye, L.x0, L.s > 0 ? ya : yb, FD_TOP - 0.9, 1.1);
      rail(L.x1, ye, L.x1, L.s > 0 ? ya : yb, FD_TOP - 0.9, 1.1);
    });

    /* ------------------------- catwalk gallery round the deck edge, below it
       a plate and a rail, with sponson pads where the weapons stand.
       Not along the lifts, and not past the deck's ends.                   */
    var GZ = FD_BOT + 0.6;
    function gallery(x0, x1, side, w) {
      var ye = side * DHW;
      B.S.add(plate(THREE, rect(x0, x1, Math.min(ye, ye + side * w), Math.max(ye, ye + side * w)), GZ - 0.2, GZ));
      rail(x0, ye + side * w, x1, ye + side * w, GZ, 1.1);
    }
    gallery(-35.0, 126.5, 1, 1.7);                    /* port, abaft the lift to the bow */
    gallery(-116.0, -57.0, 1, 1.7);                   /* port, aft */
    gallery(10.0, 126.5, -1, 1.7);                    /* starboard, ahead of the island */
    gallery(-78.5, -58.0, -1, 1.7);                   /* starboard, between island and lift */
    gallery(-114.0, -101.0, -1, 1.7);
    /* deck-edge gallery fittings: lockers and vents under the overhang */
    for (i = 0; i < 26; i++) {
      var gx = -108 + i * 8.9;
      if (gx > -35 && gx < -3) continue;
      B.K.add(box(THREE, 2.4, 0.5, 1.4, gx, DHW + 0.35, GZ - 1.6));
      if (gx > -62 || gx < -100) B.K.add(box(THREE, 2.4, 0.5, 1.4, gx + 3.0, -DHW - 0.35, GZ - 1.6));
    }

    /* ------------------------------------------------------ the well-deck gate
       a closed gate across the transom: 15.2 m wide, 8.5 m high, its frame and
       seams dark                                                          */
    B.K.add(box(THREE, 0.4, 16.0, 9.6, HX0 - 0.15, 0, 4.9));
    B.S.add(box(THREE, 0.5, 15.2, 8.5, HX0 - 0.45, 0, 4.75));
    for (j = 1; j < 4; j++) B.K.add(box(THREE, 0.1, 15.2, 0.14, HX0 - 0.75, 0, 0.5 + j * 2.1));
    B.K.add(box(THREE, 0.1, 0.14, 8.5, HX0 - 0.75, 0, 4.75));
    for (s = -1; s <= 1; s += 2) B.M.add(box(THREE, 0.3, 0.5, 0.5, HX0 - 0.8, s * 6.6, 9.1));
    /* ================================================================ island
       Starboard edge, aft of midships: a long main block, the bridge forward,
       a lower casing, two stacks, a flight-control house aft, two lattice
       masts. 64 m long, 14 m across, outboard face at the deck edge.        */
    var IY0 = -22.4, IY1 = -8.4, Z0 = FD_TOP, ZA = Z0 + 8.7;
    B.S.add(frustum(THREE, rect(-56, 8, IY0, IY1), Z0, ZA, 1.0, 0.96));
    /* bridge */
    B.S.add(frustum(THREE, rect(-2, 8.5, IY0, -11.5), ZA, ZA + 5.5, 1.0, 0.94));
    B.G.add(box(THREE, 0.1, 9.2, 1.6, 8.5, -17.0, ZA + 2.6));
    B.G.add(box(THREE, 7.6, 0.1, 1.6, 3.2, IY0 - 0.08, ZA + 2.6));
    B.G.add(box(THREE, 7.6, 0.1, 1.6, 3.2, -11.45, ZA + 2.6));
    B.S.add(box(THREE, 6.0, 4.4, 0.35, 3.0, IY0 - 2.2, ZA + 1.6));         /* bridge wing */
    rail(0.0, IY0 - 4.3, 6.0, IY0 - 4.3, ZA + 1.8, 1.0);
    rail(0.0, IY0 - 4.3, 0.0, IY0, ZA + 1.8, 1.0);
    rail(6.0, IY0 - 4.3, 6.0, IY0, ZA + 1.8, 1.0);
    B.S.add(box(THREE, 11.0, 12.0, 0.3, 3.2, -17.0, ZA + 5.65));             /* bridge roof */
    /* casing between the masts and the stacks */
    B.S.add(frustum(THREE, rect(-21, -4, -18.5, -10.0), ZA, ZA + 3.6, 1.0, 0.95));
    B.G.add(box(THREE, 0.1, 6.0, 1.0, -3.92, -14.2, ZA + 2.0));
    /* two stacks, flattened and tall, set apart */
    [[-26.0, 8.0], [-40.0, 7.5]].forEach(function (st) {
      B.S.add(frustum(THREE, rect(st[0] - st[1] / 2, st[0] + st[1] / 2, -20.0, -13.5), ZA, ZA + 9.4, 1.0, 0.85));
      B.K.add(plate(THREE, rect(st[0] - st[1] * 0.4, st[0] + st[1] * 0.4, -19.3, -14.2), ZA + 9.35, ZA + 9.55));
      for (j = 0; j < 4; j++)
        B.K.add(box(THREE, 0.1, 4.5, 0.4, st[0] + st[1] * 0.5 + 0.0, -16.75, ZA + 2.4 + j * 1.8));
    });
    /* flight control, aft, glazed on three sides */
    B.S.add(frustum(THREE, rect(-54.0, -46.0, -20.0, -11.0), ZA, ZA + 4.2, 1.0, 0.95));
    B.G.add(box(THREE, 0.1, 7.6, 1.5, -54.05, -15.5, ZA + 2.2));
    B.G.add(box(THREE, 6.4, 0.1, 1.5, -50.0, -11.0, ZA + 2.2));
    B.G.add(box(THREE, 6.4, 0.1, 1.5, -50.0, -20.05, ZA + 2.2));
    B.S.add(box(THREE, 9.0, 11.0, 0.3, -50.0, -15.5, ZA + 4.35));
    /* main-block detail: door and window rows, vents, the deck-level hatch row */
    for (i = 0; i < 12; i++) {
      B.K.add(box(THREE, 1.1, 0.1, 2.0, -52.0 + i * 5.1, IY0 - 0.06, Z0 + 2.0));
      B.G.add(box(THREE, 2.2, 0.1, 0.8, -53.0 + i * 5.1, IY0 - 0.07, Z0 + 5.4));
      B.G.add(box(THREE, 2.2, 0.1, 0.8, -53.0 + i * 5.1, IY1 + 0.07, Z0 + 5.4));
    }
    B.G.add(box(THREE, 0.1, 9.0, 0.9, 8.05, -15.0, Z0 + 4.2));
    for (i = 0; i < 6; i++) B.K.add(box(THREE, 0.1, 1.4, 1.2, 8.08, -21.5 + i * 2.2, Z0 + 1.6));
    /* life rafts racked along the island's aft end, and boxes on the roof */
    for (i = 0; i < 8; i++) B.W.add(cylZ(THREE, 0.45, 0.45, 1.1, 8, -57.2, -21.0 + i * 1.6, Z0 + 0.1));
    for (i = 0; i < 6; i++) B.S.add(box(THREE, 1.6, 1.0, 1.2, -9.0 - i * 1.9, -12.0, ZA + 0.6));

    /* team colour: three 1 x 4 m strips lifted 2 cm on the island roof */
    [[-33.0, -21.2], [-14.0, -21.2], [-50.0, -21.4]].forEach(function (tp) {
      B.T.add(box(THREE, 4.0, 1.0, 0.04, tp[0], tp[1], ZA + 0.02 + 0.02));
    });

    /* ------------------------------------------------------------ masts
       Two lattice masts off the island roof; the forward the taller, with
       a yard, the aft carrying the big flat air-search array, as the 2005
       silhouette reads. Radar types are generic shapes.                    */
    function lattice(mx, my, zb, zt, w0, w1, nSeg) {
      var legs = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
      legs.forEach(function (l) {
        B.M.add(strut(THREE, mx + l[0] * w0, my + l[1] * w0, zb, mx + l[0] * w1, my + l[1] * w1, zt, 0.1, 4));
      });
      for (var q = 0; q < nSeg; q++) {
        var za = zb + (zt - zb) * q / nSeg, zbb = zb + (zt - zb) * (q + 1) / nSeg;
        var wa = lerp(w0, w1, q / nSeg), wb = lerp(w0, w1, (q + 1) / nSeg);
        B.M.add(strut(THREE, mx - wa, my - wa, za, mx + wb, my - wb, zbb, 0.04, 3));
        B.M.add(strut(THREE, mx + wa, my - wa, za, mx - wb, my - wb, zbb, 0.04, 3));
        B.M.add(strut(THREE, mx + wa, my - wa, za, mx + wb, my + wb, zbb, 0.04, 3));
        B.M.add(strut(THREE, mx + wa, my + wa, za, mx + wb, my - wb, zbb, 0.04, 3));
        B.M.add(box(THREE, wb * 2, 0.07, 0.07, mx, my - wb, zbb));
        B.M.add(box(THREE, 0.07, wb * 2, 0.07, mx + wb, my, zbb));
      }
    }
    var FMX = 3.0, FMY = -16.5, FZ0 = ZA + 5.8, FZ1 = Z0 + 36.0;
    lattice(FMX, FMY, FZ0, FZ1, 1.5, 0.45, 9);
    B.S.add(box(THREE, 1.4, 10.0, 0.25, FMX, FMY, FZ0 + 8.0));                  /* lower yard */
    B.S.add(box(THREE, 1.2, 7.0, 0.22, FMX, FMY, FZ0 + 13.5));                  /* upper yard */
    B.S.add(cylZ(THREE, 1.2, 1.2, 0.3, 8, FMX, FMY, FZ0 + 10.5));               /* platform */
    for (s = -1; s <= 1; s += 2) {
      B.M.add(strut(THREE, FMX, FMY + s * 1.0, FZ0 + 8.2, FMX, FMY + s * 4.8, FZ0 + 8.2, 0.04, 3));
      B.W.add(sphere(THREE, 0.32, 6, 4, FMX, FMY + s * 5.0, FZ0 + 8.45));
    }
    B.R.add(box(THREE, 0.6, 2.8, 0.25, FMX, FMY, FZ1 + 0.3));                   /* surface search */
    B.R.add(box(THREE, 0.5, 0.5, 0.5, FMX, FMY, FZ1 - 0.1));
    B.M.add(strut(THREE, FMX, FMY, FZ1 + 0.4, FMX, FMY, FZ1 + 3.6, 0.07, 4, 0.03));
    B.W.add(sphere(THREE, 0.9, 8, 5, FMX - 1.5, FMY - 1.8, FZ0 + 3.4));         /* satcom dome */

    var AMX = -13.0, AMY = -14.4, AZ0 = ZA + 3.8, AZ1 = Z0 + 31.0;
    lattice(AMX, AMY, AZ0, AZ1, 1.6, 0.6, 8);
    B.S.add(box(THREE, 1.4, 9.0, 0.25, AMX, AMY, AZ0 + 12.0));
    B.S.add(box(THREE, 5.0, 6.0, 0.3, AMX, AMY, AZ0 + 8.0));                    /* radar platform */
    rail(AMX - 2.5, AMY - 3.0, AMX + 2.5, AMY - 3.0, AZ0 + 8.15, 1.0);
    rail(AMX + 2.5, AMY - 3.0, AMX + 2.5, AMY + 3.0, AZ0 + 8.15, 1.0);
    rail(AMX - 2.5, AMY + 3.0, AMX + 2.5, AMY + 3.0, AZ0 + 8.15, 1.0);
    /* the big flat three-dimensional air-search array on its pedestal */
    B.S.add(box(THREE, 1.6, 1.6, 1.6, AMX + 0.6, AMY, AZ0 + 9.0));
    B.R.add(box(THREE, 0.55, 5.8, 3.6, AMX + 1.6, AMY, AZ0 + 11.2));
    for (j = 0; j < 6; j++) B.K.add(box(THREE, 0.1, 5.7, 0.07, AMX + 1.92, AMY, AZ0 + 9.7 + j * 0.6));
    B.R.add(box(THREE, 0.6, 2.6, 0.25, AMX - 0.2, AMY, AZ1 + 0.3));
    B.M.add(strut(THREE, AMX, AMY + 1.0, AZ1 + 0.4, AMX, AMY + 1.0, AZ1 + 3.0, 0.06, 4, 0.03));
    for (s = -1; s <= 1; s += 2) B.W.add(sphere(THREE, 0.3, 6, 4, AMX, AMY + s * 4.6, AZ0 + 12.25));
    /* the rotating two-dimensional air-search antenna, a lattice dish on a
       pedestal between the stacks */
    var RPX = -33.0, RPY = -16.6;
    B.S.add(cylZ(THREE, 0.9, 1.2, 1.0, 8, RPX, RPY, ZA));
    B.M.add(strut(THREE, RPX, RPY, ZA + 1.0, RPX, RPY, ZA + 9.0, 0.5, 6));
    B.R.add(box(THREE, 0.25, 7.3, 0.2, RPX + 0.7, RPY, ZA + 8.9));
    B.R.add(box(THREE, 0.25, 7.3, 0.2, RPX + 0.7, RPY, ZA + 12.8));
    for (j = 0; j < 5; j++) B.R.add(box(THREE, 0.25, 0.2, 4.1, RPX + 0.7, RPY - 3.0 + j * 1.5, ZA + 10.85));
    B.R.add(box(THREE, 0.9, 1.0, 1.6, RPX + 0.15, RPY, ZA + 10.8));
    /* two white domes on the roofs */
    B.W.add(sphere(THREE, 1.8, 12, 7, -48.0, -14.5, ZA + 4.9));
    B.W.add(sphere(THREE, 1.3, 10, 6, -9.0, -15.0, ZA + 3.6 + 0.9));
    B.S.add(cylZ(THREE, 1.0, 1.2, 1.0, 8, -9.0, -15.0, ZA + 3.5 + 0.0));
    B.W.add(sphere(THREE, 0.9, 8, 5, -52.0, -12.5, ZA + 4.5 + 0.7));
    /* whips and small antennas off the roofs */
    for (j = 0; j < 8; j++) {
      var wx = -52.0 + j * 7.2, wy = (j % 2 ? -21.0 : -9.4);
      B.M.add(strut(THREE, wx, wy, ZA, wx, wy, ZA + 2.6 + (j % 3), 0.05, 4, 0.02));
    }

    /* ---------------------------------------------------------- weapons
       Sponson pads below the deck edge, the mount on each; none stands above
       the flight deck. Stations are approximate (see the header).          */
    function sponson(x, y, w, len, hdg) {
      B.S.add(box(THREE, len, w, 0.5, x, y, GZ - 2.6));
      B.S.add(box(THREE, len - 1.0, w * 0.5, 2.2, x, y - Math.sign(y) * w * 0.25, GZ - 3.8));
      rail(x - len / 2, y + Math.sign(y) * w / 2, x + len / 2, y + Math.sign(y) * w / 2, GZ - 2.35, 1.0);
    }
    var WZ = GZ - 2.35;
    /* two Mk 29 Sea Sparrow: port forward, starboard aft */
    sponson(70.0, 24.5, 5.0, 7.5);
    emit(mk29Parts(THREE), 70.0, 24.5, WZ, PI / 2);
    sponson(-72.0, -24.5, 5.0, 7.5);
    emit(mk29Parts(THREE), -72.0, -24.5, WZ, -PI / 2);
    /* three Phalanx: starboard bow, port quarter, starboard stern */
    sponson(108.0, -24.0, 4.5, 5.5);
    emit(phalanxParts(THREE), 108.0, -24.0, WZ, 0);
    sponson(-83.0, 24.0, 4.5, 5.5);
    emit(phalanxParts(THREE), -83.0, 24.0, WZ, PI * 0.5);
    sponson(-110.0, -23.5, 4.5, 5.5);
    emit(phalanxParts(THREE), -110.0, -23.5, WZ, PI);
    if (withRAM) {
      /* the 2000s fit: two RAM launchers, one each side */
      sponson(88.0, -24.0, 4.5, 5.0);
      emit(ramParts(THREE), 88.0, -24.0, WZ, -PI / 2);
      sponson(-104.0, 24.0, 4.5, 5.0);
      emit(ramParts(THREE), -104.0, 24.0, WZ, PI / 2);
    }

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
