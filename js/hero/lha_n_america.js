/* ============================================================================
   lha_n_america.js -- HERO model: USS America (LHA-6), America class, Flight 0
   (no well deck), as in service from 2014. Registered as lha_n.

   References read for this model (Wikimedia Commons, US Navy photographs):
     - "Overhead view of USS America (LHA-6) in August 2014": the plan. Deck
       outline, the two deck-edge lifts, the island footprint, the two
       exhaust stacks, the spot markings, the yellow centreline, the domes.
       It is an oblique shot (the camera is nearer the bow), so only the
       fore-and-aft order and the relative positions were taken from it; the
       lengths and widths are the published figures below.
     - "USSAmericaByPhilKonstantin": a high port-side view. The raked and
       flared bow under a squared deck end, the squared stern with its lift
       on the starboard quarter, the island's height against the deck, the
       forward mast and its radar, the gallery walkways and sponsons.
   Published figures (en.wikipedia "America-class amphibious assault ship"
   infobox and the Navy fact file): 257.3 m (844 ft) long, 32.3 m (106 ft)
   beam at the waterline, 1,059 crew, 45,693 t. The deck width of 42.8 m,
   the lift size, the draught and the deck height are NOT in a source I
   could read: they are Wasp-family figures or measured on the photographs
   and are marked "est." below.

   What marks the Flight 0 ship: NO well deck and so a solid squared
   transom with no gate; a smaller island than a Wasp's; two exhaust stacks
   side by side; two deck-edge lifts (one on the starboard quarter, one to
   port abaft the island's centre); a bulky hangar with the flight deck
   running the whole length.

   Armament: none drawn. The class fit (js/facts.js: 2 RAM, 2 ESSM, 2 Phalanx,
   3 Mk 38, 7 twin .50) is published, but the references do not show a mount
   or its place, so none is invented; two sponson radomes that they do show
   are drawn.

   Model space: +X bow, +Y port, +Z up, metres. Waterline z = 0. Nothing
   in here is named "turret". No aircraft are parked: the game parks
   helicopters (and later jets) on the clean deck, and nothing stands
   inside the island or on the deck park. Hull number and names are left
   off: the team colour carries ownership (three small up-facing strips).

   Every static part is merged into ONE mesh per material (ten materials).
   ASCII only.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroAmericaLHA = (function () {
  "use strict";
  var PI = Math.PI;

  /* ---------------------------------------------------- principal dimensions */
  var LOA = 257.3;                 /* published                                    */
  var XA = -LOA / 2, XF = LOA / 2; /* deck ends                                     */
  var FD_TOP = 20.0;               /* est. ~20 m: measured on the broadside photograph; no published figure */
  var FD_TH = 1.2;
  var FD_BOT = FD_TOP - FD_TH;
  var DEPTH = 7.9;                 /* published: 26 ft (7.9 m) draught             */
  var BEAM_WL = 32.3;              /* published: waterline beam                    */
  var HW = BEAM_WL / 2;            /* 16.15                                         */
  var DECK_HW = 18.0;              /* published: 118 ft (36.0 m) beam at the flight deck (Navy welcome-aboard brochure) */
  var KNUCK = 10.0;                /* hangar deck: where the flare starts          */
  var XS_WL = 108.0;               /* stem at the waterline                         */
  var XTR = XA + 1.2;              /* transom                                       */

  var DECK = [
    [XF, -16.0], [XF, 16.0], [XF - 3.5, DECK_HW], [XA + 6.0, DECK_HW],
    [XA, 17.5], [XA, -17.5], [XA + 6.0, -DECK_HW], [XF - 3.5, -DECK_HW]
  ];
  /* lifts, read off the overhead plan, scaled by the published deck length: about 14 m along the ship, none published: starboard on the
     quarter abaft the island, port abaft the island's centre; both
     hang a little outboard of the deck edge, as deck-edge lifts do.     */
  var LIFTS = [
    { x0: -118.0, x1: -104.0, y0: -25.0, y1: -11.0 },
    { x0:  -74.0, x1:  -60.0, y0:  11.0, y1:  25.0 }
  ];

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
  function sstep(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }

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
  /* a closed frustum on a plan outline: bottom at zb scaled sBot, top at zt
     scaled sTop about the centroid; UVs in metres / 16                    */
  function ccw(pts) {
    var a = 0, i, n = pts.length;
    for (i = 0; i < n; i++) { var p = pts[i], q = pts[(i + 1) % n]; a += p[0] * q[1] - q[0] * p[1]; }
    return a < 0 ? pts.slice().reverse() : pts;
  }
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
  /* an axis-aligned slab with a sloped face: a convex block, x0..x1, y0..y1,
     z0..z1, its top outline pulled in by `in` metres on every side          */
  function block(THREE, x0, x1, y0, y1, z0, z1, inset) {
    var s = inset || 0, L = x1 - x0, Wd = y1 - y0;
    var pts = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    var sT = Math.min(1 - 2 * s / Math.max(L, 0.1), 1 - 2 * s / Math.max(Wd, 0.1));
    return frustum(THREE, pts, z0, z1, 1, sT);
  }

  /* ============================================================= textures */
  var PAINT = { hull: 0x737a81, sup: 0x7d858c };
  var HX0 = XA, HX1 = XF;

  function hullTex(THREE, zTop, zBot, H, seed, under) {
    var W = 2048, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(seed), i, x, y, z;
    var PXZ = H / (zTop - zBot), PXX = W / (HX1 - HX0);
    function rowZ(zz) { return (zTop - zz) * PXZ; }
    function band(za, zb, col) {
      var ya = rowZ(Math.min(za, zTop)), yb = rowZ(Math.max(zb, zBot));
      if (yb > ya) { g.fillStyle = col; g.fillRect(0, ya, W, yb - ya); }
    }
    band(zTop, zBot, under ? "#5e2d29" : hx(PAINT.hull));
    for (i = 0; i < 260; i++) {
      z = zBot + R() * (zTop - zBot);
      g.globalAlpha = 0.04 + R() * 0.06;
      g.fillStyle = under ? (R() < 0.5 ? "#7a3a31" : "#3c1c19") : (R() < 0.5 ? "#ffffff" : "#000000");
      g.fillRect(R() * W, rowZ(z), 40 + R() * 240, (0.3 + R() * 1.1) * PXZ);
    }
    g.globalAlpha = 1;
    if (!under) band(1.6, 0, "#17191c");          /* boot topping above the waterline */
    else band(0, -0.8, "#17191c");
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.3;
    for (i = 1; i < 64; i++) {
      x = i * W / 64 + (R() - 0.5) * 4;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
    }
    for (i = 1; i < 9; i++) {
      var zz = under ? -i * 1.8 : i * 2.2;
      if (zz > zBot && zz < zTop) { y = rowZ(zz); g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
    }
    if (!under) {
      /* the hangar-deck strake where the flare starts */
      g.strokeStyle = "rgba(255,255,255,0.18)"; g.lineWidth = 3;
      y = rowZ(KNUCK); g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
      /* dark band under the gallery deck, as the broadside photograph reads */
      g.fillStyle = "rgba(20,24,28,0.28)";
      g.fillRect(0, rowZ(FD_BOT), W, rowZ(FD_BOT - 1.4) - rowZ(FD_BOT));
      /* rust weeping */
      for (i = 0; i < 40; i++) {
        x = R() * W; y = rowZ(3 + R() * 14);
        var len = (2 + R() * 5) * PXZ, gr = g.createLinearGradient(0, y, 0, y + len);
        gr.addColorStop(0, "rgba(92,58,40,0.28)"); gr.addColorStop(1, "rgba(92,58,40,0)");
        g.fillStyle = gr; g.fillRect(x, y, 1.5 + R() * 2.5, len);
      }
      /* draught marks forward and aft (no hull number or name) */
      g.fillStyle = "rgba(236,238,240,0.9)";
      [104.0, -122.0].forEach(function (mx) {
        for (var k = 0; k < 7; k++) {
          var z2 = -6 + k * 1.0;
          if (z2 > zBot && z2 < zTop) g.fillRect((mx - HX0) * PXX, rowZ(z2) - 1, 7, 2);
        }
      });
    }
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }

  function supTex(THREE) {
    var W = 1024, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(6602), i;
    g.fillStyle = hx(PAINT.sup); g.fillRect(0, 0, W, H);
    for (i = 0; i < 140; i++) {
      g.globalAlpha = 0.04 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 30 + R() * 140, 10 + R() * 40);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1.2;
    for (i = 1; i < 32; i++) { g.beginPath(); g.moveTo(i * 32, 0); g.lineTo(i * 32, H); g.stroke(); }
    for (i = 1; i < 16; i++) { g.beginPath(); g.moveTo(0, i * 32); g.lineTo(W, i * 32); g.stroke(); }
    /* doors and hatches */
    for (i = 0; i < 26; i++) {
      g.fillStyle = "rgba(30,34,38,0.55)";
      g.fillRect(20 + R() * (W - 60), 20 + R() * (H - 60), 9, 17);
    }
    return finish(THREE, cv);
  }

  /* One plan painting of the whole deck, sampled through the slab's
     shape-space UVs (x, y in metres), so it costs no triangles.           */
  var DX0 = -132, DX1 = 132, DY0 = -32, DY1 = 32;
  function deckTex(THREE) {
    var W = 2048, H = 512, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(2014), i;
    var SX = W / (DX1 - DX0), SY = H / (DY1 - DY0);
    function cx(x) { return (x - DX0) * SX; }
    function cy(y) { return H - (y - DY0) * SY; }
    function line(x0, y0, x1, y1, wm, col) {
      g.strokeStyle = col; g.lineWidth = wm * SY; g.lineCap = "butt";
      g.beginPath(); g.moveTo(cx(x0), cy(y0)); g.lineTo(cx(x1), cy(y1)); g.stroke();
    }
    function rect(xa, ya, xb, yb, col) {
      g.fillStyle = col; g.fillRect(cx(xa), cy(yb), (xb - xa) * SX, (yb - ya) * SY);
    }
    /* dark non-skid, mottled */
    g.fillStyle = "#464b50"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 900; i++) {
      g.globalAlpha = 0.05 + R() * 0.07;
      g.fillStyle = R() < 0.5 ? "#5a5f64" : "#2f3337";
      g.fillRect(R() * W, R() * H, 6 + R() * 50, 2 + R() * 7);
    }
    g.globalAlpha = 1;
    /* tyre and jet-wash wear down the landing strip */
    g.globalAlpha = 0.10; g.fillStyle = "#1d2023";
    g.fillRect(cx(-120), cy(11), 240 * SX, 9 * SY);
    g.globalAlpha = 1;
    var WH = "#e6e8e8", YL = "#c8a23c";
    /* deck-edge line, a half metre in from the edge */
    line(XA + 7, DECK_HW - 0.5, XF - 4, DECK_HW - 0.5, 0.3, WH);
    line(XA + 7, -DECK_HW + 0.5, XF - 4, -DECK_HW + 0.5, 0.3, WH);
    /* the yellow centreline, a quarter of the deck width in from the port edge, as the overhead shows */
    line(XA + 8, 9.0, XF - 6, 9.0, 0.55, YL);
    /* dashed white lines either side of it */
    for (var xd = XA + 14; xd < XF - 10; xd += 9) {
      line(xd, 1.2, xd + 4.5, 1.2, 0.3, WH);
    }
    /* landing spots: a bar across the deck and a short diagonal for each of the
       port-row spots; the two forward starboard spots as bird-foot crosses */
    var PS = [74, 32, 0, -33, -52, -81, -110];
    PS.forEach(function (sx) {
      line(sx, 1.5, sx, 15.0, 0.4, WH);
      line(sx, 1.5, sx - 5.2, -2.6, 0.4, WH);
    });
    [[100, -9.5], [52, -9.5]].forEach(function (s) {
      line(s[0], s[1] - 8, s[0], s[1] + 8, 0.4, WH);
      line(s[0], s[1] + 8, s[0] - 4.5, s[1] + 12, 0.4, WH);
      line(s[0], s[1] + 8, s[0] + 5.5, s[1] + 12, 0.4, WH);
      line(s[0] - 6, s[1] + 3, s[0] + 8, s[1] + 3, 0.35, WH);
    });
    /* the foul line round the island */
    line(-95, -8.0, 42, -8.0, 0.3, YL);
    /* lifts: painted edges and a safety dash pattern */
    LIFTS.forEach(function (L) {
      rect(L.x0, L.y0, L.x1, L.y1, "#3d4247");
      var b = 0.55;
      line(L.x0 + b / 2, L.y0, L.x0 + b / 2, L.y1, b, YL);
      line(L.x1 - b / 2, L.y0, L.x1 - b / 2, L.y1, b, YL);
      line(L.x0, L.y0 + b / 2, L.x1, L.y0 + b / 2, b, YL);
      line(L.x0, L.y1 - b / 2, L.x1, L.y1 - b / 2, b, YL);
    });
    var t = finish(THREE, cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }

  var _tex = null;
  function textures(THREE) {
    if (_tex) return _tex;
    _tex = {
      top:  hullTex(THREE, FD_BOT, 0, 256, 6601, false),
      bot:  hullTex(THREE, 0, -DEPTH, 128, 6602, true),
      sup:  supTex(THREE),
      deck: deckTex(THREE)
    };
    return _tex;
  }

  /* ================================================================== hull */
  /* half-breadth at station x and height z */
  function stemX(z) { return z >= 0 ? XS_WL + 0.85 * z : XS_WL + 0.55 * z; }
  function widthAt(z) {
    if (z >= 0) {
      if (z <= KNUCK) return HW + 0.12 * z;
      return HW + 1.2 + sstep((z - KNUCK) / (FD_BOT - KNUCK)) * 0.5;
    }
    var t = clamp(-z / DEPTH, 0, 1);
    return HW * Math.pow(1 - Math.pow(t, 2.5), 0.42);
  }
  function halfAt(x, z) {
    var W = widthAt(z), f = 1;
    var xs = stemX(z), Lb = z >= 0 ? lerp(60, 26, clamp(z / FD_BOT, 0, 1)) : 62;
    var d = xs - x;
    if (d <= 0) return 0;
    if (d < Lb) f = Math.pow(d / Lb, 0.62);
    var ts = (x - XTR) / 42;
    if (ts < 1) f *= 0.84 + 0.16 * sstep(ts);
    return W * f;
  }
  function keelZ(x) {
    if (x < -92) return lerp(-1.6, -DEPTH, sstep((x - XTR) / (-92 - XTR)));
    return -DEPTH;
  }
  var LEVS = [-7.9, -7.4, -6.7, -5.8, -4.7, -3.5, -2.3, -1.1, 0, 1.8, 3.8, 6.0, 8.0, KNUCK, 11.4, 12.8, 14.6, 16.6, FD_BOT];

  function hullGeo(THREE) {
    var xs = [XTR, -125, -123, -120, -116, -111, -105, -98, -90, -82, -74, -66, -58, -50, -42, -34, -26, -18, -10, -2, 6, 14, 22,
              30, 38, 46, 54, 62, 70, 76, 82, 88, 93, 98, 102, 106, 109.5, 113, 116, 118.8, 121.2, 123.2, 124.3];
    var rings = [], i, j, nz = LEVS.length;
    for (i = 0; i < xs.length; i++) {
      var x = xs[i], P = [], S = [], zk = keelZ(x), first = -1, k;
      for (k = 0; k < nz; k++) if (LEVS[k] >= zk && first < 0) first = k;
      var y0 = halfAt(x, LEVS[first]);
      for (k = 0; k < nz; k++) {
        var y = LEVS[k] < zk ? 0.7 * y0 : halfAt(x, LEVS[k]);
        var zz = LEVS[k] < zk ? zk : LEVS[k];
        P.push([y, zz]);
      }
      /* the top of the loft is the gallery deck; the deck slab covers it */
      var r = [[0, FD_BOT]];
      for (j = P.length - 1; j >= 0; j--) r.push([P[j][0], P[j][1]]);
      r.push([0, zk]);
      for (j = 0; j < P.length; j++) r.push([-P[j][0], P[j][1]]);
      rings.push(r);
    }
    var nR = rings[0].length;
    var OUT = { top: { pos: [], nrm: [], uv: [], z0: 0, z1: FD_BOT }, bot: { pos: [], nrm: [], uv: [], z0: -DEPTH, z1: 0 } };
    function V(ii, jj) { var q = rings[ii][jj % nR]; return [xs[ii], q[0], q[1]]; }
    function uOf(x) { return (x - HX0) / (HX1 - HX0); }
    var faces = [];
    function K(ii, jj) { return ii * nR + (jj % nR); }
    function tri(a, b, c, ka, kb, kc) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var cxp = uy * vz - uz * vy, cyp = uz * vx - ux * vz, czp = ux * vy - uy * vx;
      var ar = cxp * cxp + cyp * cyp + czp * czp;
      if (ar < 4e-6) return;
      ar = Math.sqrt(ar);
      faces.push({ p: [a, b, c], k: [ka, kb, kc], n: [cxp, cyp, czp], u: [cxp / ar, cyp / ar, czp / ar] });
    }
    for (i = 0; i < xs.length - 1; i++) {
      for (j = 0; j < nR; j++) {
        tri(V(i, j), V(i + 1, j), V(i, j + 1), K(i, j), K(i + 1, j), K(i, j + 1));
        tri(V(i, j + 1), V(i + 1, j), V(i + 1, j + 1), K(i, j + 1), K(i + 1, j), K(i + 1, j + 1));
      }
    }
    /* the transom, a flat squared cap: no well-deck gate on the Flight 0 ship */
    var r0 = rings[0], cyy = 0, czz = 0;
    for (j = 0; j < nR; j++) { cyy += r0[j][0]; czz += r0[j][1]; }
    var C = [xs[0], cyy / nR, czz / nR];
    for (j = 0; j < nR; j++) tri(C, V(0, j), V(0, j + 1), -1, -2 - j, -2 - ((j + 1) % nR));
    var around = {}, COS = Math.cos(34 * PI / 180);
    faces.forEach(function (f, fi) { f.k.forEach(function (k) { (around[k] || (around[k] = [])).push(fi); }); });
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
    return { top: geo(OUT.top), bot: geo(OUT.bot) };
  }

  /* ================================================================ build */
  function build(THREE, M, C) {
    var root = new THREE.Group();
    var i, j;
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
    Object.keys(T).forEach(function (k) { B[k] = new Batch(); });
    function emit(parts, x, y, z, hdg) {
      parts.forEach(function (pp) {
        place(THREE, pp[1], 0, 0, 0, 0, 0, hdg || 0);
        pp[1].translate(x, y, z);
        B[pp[0]].add(pp[1]);
      });
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
    /* the extrude's cap UVs are shape-space metres; the deck painting spans
       DX0..DX1 x DY0..DY1 metres, so map the caps into 0..1                 */
    function deckUV(g) {
      var P = g.getAttribute("position"), U = g.getAttribute("uv"), gr = g.groups.length ? g.groups[0] : null;
      if (!gr) return;
      for (var q = gr.start; q < gr.start + gr.count; q++)
        U.setXY(q, (P.getX(q) - DX0) / (DX1 - DX0), (P.getY(q) - DY0) / (DY1 - DY0));
    }
    var dg = new THREE.ExtrudeGeometry(shp, { depth: FD_TH, bevelEnabled: false, curveSegments: 1 });
    dg.translate(0, 0, FD_BOT);
    deckUV(dg);
    Batch.addGroups(dg, [B.D, B.S]);

    /* the two deck-edge lifts: slabs a hair above the deck, with a dark
       hangar opening and a steel box under the part that overhangs        */
    LIFTS.forEach(function (L) {
      var ls = new THREE.Shape();
      ls.moveTo(L.x0, L.y0); ls.lineTo(L.x1, L.y0); ls.lineTo(L.x1, L.y1); ls.lineTo(L.x0, L.y1); ls.closePath();
      var lg = new THREE.ExtrudeGeometry(ls, { depth: 1.0, bevelEnabled: false });
      lg.translate(0, 0, FD_TOP - 1.0 + 0.02);
      deckUV(lg);
      Batch.addGroups(lg, [B.D, B.S]);
      var side = L.y0 > 0 ? 1 : -1;
      var yo = side > 0 ? L.y1 : L.y0;
      /* guide trunks and the dark opening at the hull */
      B.K.add(box(THREE, L.x1 - L.x0 - 1.2, 0.3, 7.0, (L.x0 + L.x1) * 0.5, side * (DECK_HW - 1.6), KNUCK + 4.0));
      for (j = 0; j < 2; j++) {
        var tx = j ? L.x1 - 0.7 : L.x0 + 0.7;
        B.S.add(box(THREE, 1.2, 1.2, FD_TOP - 1.0 - KNUCK, tx, yo - side * 0.7, (FD_TOP - 1.0 + KNUCK) * 0.5));
      }
      B.M.add(box(THREE, L.x1 - L.x0, 0.3, 1.2, (L.x0 + L.x1) * 0.5, yo, FD_TOP - 1.6));
    });

    /* ---------------- gallery walkways and nets, tucked under the deck edge */
    function walk(xa, xb, side) {
      var yc = side * (DECK_HW + 0.55);
      B.S.add(box(THREE, xb - xa, 1.3, 0.2, (xa + xb) * 0.5, yc, FD_TOP - 1.7));
      B.M.add(box(THREE, xb - xa, 0.07, 0.07, (xa + xb) * 0.5, side * (DECK_HW + 1.15), FD_TOP - 0.7));
      B.M.add(box(THREE, xb - xa, 0.07, 0.07, (xa + xb) * 0.5, side * (DECK_HW + 1.15), FD_TOP - 1.2));
      for (var xp = xa; xp <= xb + 0.01; xp += 4.0)
        B.M.add(box(THREE, 0.07, 0.07, 1.0, xp, side * (DECK_HW + 1.15), FD_TOP - 1.2));
    }
    walk(XA + 8, LIFTS[1].x0 - 0.3, 1);
    walk(LIFTS[1].x1 + 0.3, XF - 5, 1);
    walk(XA + 8, LIFTS[0].x0 - 0.3, -1);
    walk(LIFTS[0].x1 + 0.3, XF - 5, -1);

    /* ------------------------------------ the row of boats' gear and doors
       along the hull side below the gallery: dark door panels and a
       line of scuttles, which the broadside photograph shows              */
    for (i = 0; i < 12; i++) {
      var dx = -100 + i * 18.5 + ((i * 7) % 5);
      [1, -1].forEach(function (s) {
        B.K.add(box(THREE, 3.2, 0.2, 3.0, dx, s * (widthAt(8.0) - 0.05), 6.4));
      });
    }

    /* scuttle rows under the gallery on both sides, as the broadside photograph shows */
    for (i = 0; i < 46; i++) {
      var sx = -118 + i * 4.9;
      if (sx > 96) continue;
      [1, -1].forEach(function (s) {
        B.K.add(box(THREE, 0.9, 0.2, 0.7, sx, s * (widthAt(15.2) - 0.05), 15.2));
        B.K.add(box(THREE, 0.9, 0.2, 0.7, sx + 2.4, s * (widthAt(13.2) - 0.05), 13.2));
      });
    }
    /* ---------------------------------------------------------- island
       The footprint is the overhead's, set on the starboard deck edge; the
       forward face is where the broadside photograph puts it.             */
    var Z0 = FD_TOP, YO = -19.5, YI = -7.0, SH = 18.0;   /* SH: bridge tower and its fittings set 18 m forward (forward face +39) */
    /* after deckhouse, low */
    B.S.add(block(THREE, -90, -52, YO, -9.0, Z0, Z0 + 7.5, 0.5));
    B.S.add(box(THREE, 36, 0.25, 0.3, -71, -9.0, Z0 + 7.3));
    /* uptake block with the two stacks */
    B.S.add(block(THREE, -62, -30, YO, YI - 1.5, Z0, Z0 + 12.5, 0.6));
    [[-61.5, -52.5], [-47.5, -38.5]].forEach(function (st) {
      B.S.add(block(THREE, st[0], st[1], -19.2, -11.2, Z0 + 12.0, Z0 + 21.5, 0.5));
      B.K.add(box(THREE, st[1] - st[0] - 0.8, 7.2, 0.35, (st[0] + st[1]) * 0.5, -15.5, Z0 + 21.7));
      B.R.add(box(THREE, st[1] - st[0] - 0.4, 0.2, 2.5, (st[0] + st[1]) * 0.5, -19.25, Z0 + 18.6));
      B.R.add(box(THREE, 0.2, 8.5, 2.5, (st[0] + st[1]) * 0.5 + 4.2, -15.5, Z0 + 18.6));
    });
    /* the bridge tower: a base of working spaces, then the bridge tier */
    B.S.add(block(THREE, -30, 39, YO, YI, Z0, Z0 + 11.0, 0.7));
    B.S.add(block(THREE, -24, 35, -18.0, -8.5, Z0 + 11.0, Z0 + 19.0, 0.6));
    /* bridge wings, overhanging both sides at the bridge level */
    B.S.add(box(THREE, 20, 15.2, 0.5, 5.5 + SH, -13.3, Z0 + 14.0));
    /* the glazing: a band across the front and down both sides of the bridge */
    B.G.add(box(THREE, 0.15, 13.0, 1.5, 16.6 + SH, -13.3, Z0 + 15.6));
    B.G.add(box(THREE, 15, 0.15, 1.4, 9.0 + SH, -8.0, Z0 + 15.6));
    B.G.add(box(THREE, 15, 0.15, 1.4, 9.0 + SH, -18.6, Z0 + 15.6));
    for (j = 0; j < 7; j++) B.G.add(box(THREE, 0.15, 1.6, 1.0, 39.05, -13.8 + (j - 3) * 1.4, Z0 + 7.0));
    for (j = 0; j < 9; j++) {
      B.S.add(box(THREE, 0.25, 0.25, 1.5, 16.65 + SH, -18.6 + j * 1.45, Z0 + 15.6));
      B.S.add(box(THREE, 0.25, 0.25, 1.5, 3.5 + j * 1.6 - 8 + SH, -8.0, Z0 + 15.6));
      B.S.add(box(THREE, 0.25, 0.25, 1.5, 3.5 + j * 1.6 - 8 + SH, -18.6, Z0 + 15.6));
    }
    /* primary flight control, stepped back above and aft */
    B.S.add(block(THREE, -16 + SH, 4 + SH, -17.0, -9.5, Z0 + 19.0, Z0 + 23.0, 0.4));
    B.G.add(box(THREE, 0.15, 7.4, 1.5, 3.8 + SH, -13.3, Z0 + 21.0));
    B.G.add(box(THREE, 12, 0.15, 1.5, -6 + SH, -9.4, Z0 + 21.0));
    B.G.add(box(THREE, 12, 0.15, 1.5, -6 + SH, -17.1, Z0 + 21.0));
    B.K.add(box(THREE, 20.4, 8.4, 0.25, -6 + SH, -13.3, Z0 + 23.1));
    /* the forward mast: a stub tower, two platforms, the 3-D air-search radar on top */
    B.S.add(frustum(THREE, [[-3.5 + SH, -17.0], [3.5 + SH, -17.0], [3.5 + SH, -11.0], [-3.5 + SH, -11.0]], Z0 + 23, Z0 + 31, 1, 0.6));
    B.M.add(box(THREE, 9.0, 8.5, 0.35, SH, -14, Z0 + 27.0));
    B.M.add(box(THREE, 6.0, 6.0, 0.3, SH, -14, Z0 + 31.2));
    B.R.add(box(THREE, 0.7, 7.2, 3.8, SH, -14, Z0 + 34.2));              /* SPS-48E antenna */
    B.K.add(box(THREE, 0.5, 7.4, 0.3, SH + 0.1, -14, Z0 + 36.2));
    B.M.add(cylZ(THREE, 0.5, 0.7, 2.2, 8, SH, -14, Z0 + 31.3));
    /* the after mast and its platform, a radar drum and a whip farm */
    B.S.add(frustum(THREE, [[-26, -17.0], [-21, -17.0], [-21, -12.0], [-26, -12.0]], Z0 + 19, Z0 + 28, 1, 0.55));
    B.M.add(box(THREE, 7.0, 7.0, 0.3, -23.5, -14.5, Z0 + 28.0));
    B.W.add(sphere(THREE, 1.7, 14, 8, -23.5, -14.5, Z0 + 28.3, 1, 1, 1, true));
    for (j = 0; j < 4; j++) B.M.add(strut(THREE, -26 + j * 1.6, -17.2, Z0 + 12.5, -26 + j * 1.6, -17.2, Z0 + 16.5 + j * 1.1, 0.07, 4));
    /* the after mast's lattice and the ESM fit on the mast platform */
    for (j = 0; j < 5; j++) {
      B.M.add(strut(THREE, -26, -17, Z0 + 19 + j * 1.8, -21, -12, Z0 + 20.8 + j * 1.8, 0.06, 4));
      B.M.add(strut(THREE, -21, -17, Z0 + 19 + j * 1.8, -26, -12, Z0 + 20.8 + j * 1.8, 0.06, 4));
    }
    for (j = 0; j < 4; j++) B.R.add(box(THREE, 1.0, 0.5, 0.7, -4.0 + j * 2.7 + SH, -11.0, Z0 + 27.5));
    for (j = 0; j < 4; j++) B.M.add(strut(THREE, -2.5 + j * 1.6 + SH, -16.8, Z0 + 31.3, -2.5 + j * 1.6 + SH, -16.8, Z0 + 37 + j, 0.05, 4));
    /* the surface-search radar on the bridge roof */
    B.R.add(box(THREE, 0.5, 3.6, 1.1, -10.5 + SH, -12.0, Z0 + 24.3));
    B.M.add(cylZ(THREE, 0.3, 0.4, 1.3, 6, -10.5 + SH, -12.0, Z0 + 23.2));
    /* satellite domes on the island's shoulders */
    [[-76, -15], [-84, -12], [-36, -9.5], [-3 + SH, -8.5], [10 + SH, -17.5]].forEach(function (d, k) {
      var zb = k < 2 ? Z0 + 7.5 : k < 3 ? Z0 + 12.5 : Z0 + 11.0;
      if (k === 3) zb = Z0 + 19.0;
      B.W.add(sphere(THREE, 1.5, 12, 7, d[0], d[1], zb, 1, 1, 1, true));
    });
    /* antenna whips, ladders and rails round the roofs */
    function ringRail(pts, z) {
      for (var k = 0; k < pts.length; k++) {
        var p0 = pts[k], p1 = pts[(k + 1) % pts.length];
        var ddx = p1[0] - p0[0], ddy = p1[1] - p0[1];
        B.M.add(box(THREE, Math.sqrt(ddx * ddx + ddy * ddy), 0.07, 0.07,
                    (p0[0] + p1[0]) * 0.5, (p0[1] + p1[1]) * 0.5, z, 0, 0, Math.atan2(ddy, ddx)));
      }
    }
    ringRail([[-29, -19.0], [38, -19.0], [38, -7.6], [-29, -7.6]], Z0 + 11.6);
    ringRail([[-89, -19.0], [-52.5, -19.0], [-52.5, -9.4], [-89, -9.4]], Z0 + 8.1);
    ringRail([[-23, -17.4], [34, -17.4], [34, -9.1], [-23, -9.1]], Z0 + 19.6);
    /* vertical ladder strips and hatches on the forward face and outboard face */
    for (j = 0; j < 8; j++) {
      B.K.add(box(THREE, 0.15, 1.0, 1.8, 39.0, -9.2 - j * 1.35, Z0 + 3.2));
      B.K.add(box(THREE, 1.9, 0.15, 1.9, -26 + j * 8.4, YO - 0.01, Z0 + 4.0));
    }
    /* the island's flank pipes and vents */
    for (j = 0; j < 5; j++) B.M.add(cylZ(THREE, 0.25, 0.25, 2.2, 6, -50 + j * 3.2, -20.8, Z0 + 12.3));

    /* ------------------------------- sponsons and the weapons they carry */
    function sponson(x, side, len, wid, zTop) {
      var yh = side * (DECK_HW - 0.4);
      B.S.add(box(THREE, len, wid, 0.5, x, side * (DECK_HW + wid * 0.5 - 0.5), zTop - 0.25));
      B.S.add(box(THREE, len - 0.6, wid * 0.5, zTop - KNUCK - 2.0, x, side * (DECK_HW + wid * 0.25 - 0.3), (zTop + KNUCK + 2.0) * 0.5));
      ringRail([[x - len / 2, side * (DECK_HW + wid - 0.5)], [x + len / 2, side * (DECK_HW + wid - 0.5)],
                [x + len / 2, yh], [x - len / 2, yh]], zTop + 0.8);
    }
    var ZS = FD_TOP - 3.9;               /* the sponsons sit a deck below the flight deck */
    /* No weapon mount is drawn: the class fit (2 RAM, 2 ESSM, 2 Phalanx, 3 Mk 38,
       7 twin .50) is published, but the 800 px references do not resolve any
       mount or its place. What they do show is drawn: white radomes on the
       deck-edge sponsons, one big one on the starboard side just forward of
       the island and one hung on the port side abaft the broadside's middle. */
    function dome(x, side, len, wid, r) {
      sponson(x, side, len, wid, ZS);
      B.W.add(sphere(THREE, r, 14, 8, x, side * (DECK_HW + wid * 0.45), ZS + 0.4, 1, 1, 1, true));
    }
    dome(44, -1, 6, 4.5, 2.3);
    dome(-69, 1, 5, 3.5, 1.9);

    /* ------------------------------ stem and stern fittings, the anchors */
    for (j = -1; j <= 1; j += 2) {
      B.M.add(box(THREE, 3.4, 0.9, 1.0, 114.8, j * 6.5, 14.5));
      B.K.add(box(THREE, 0.3, 1.1, 1.1, 116.7, j * 6.5, 14.5));
    }
    B.M.add(cylZ(THREE, 0.9, 0.9, 0.6, 10, 112, 0, FD_BOT));                /* the bow fairlead pad */
    /* stern: a flat transom with a pair of davit-less recesses */
    B.K.add(box(THREE, 0.25, 22, 3.6, XTR - 0.02, 0, 8.0));
    B.M.add(box(THREE, 0.3, 4.0, 0.4, XTR - 0.1, 0, 3.0));

    /* ------------------- team colour: three small up-facing strips, 1 x 4 m */
    B.T.add(box(THREE, 4.0, 1.0, 0.02, XF - 14, 14.5, FD_TOP + 0.02 + 0.01));
    B.T.add(box(THREE, 4.0, 1.0, 0.02, XA + 13, 12.0, FD_TOP + 0.03));
    B.T.add(box(THREE, 4.0, 1.0, 0.02, 18, -17.0, FD_TOP + 0.03));

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

UNIT_MODELS["lha_n"] = {
  len: 257.3,
  build: function (THREE, M, C) { return HeroAmericaLHA.build(THREE, M, C); }
};
