/* ========= mine_ship_sweeper.js -- MCM vessel "minesweeper" (55 m) =========
   The mine countermeasures vessel is the odd one out in the naval roster.
   It is not a scaled-down frigate: a minehunter is built to a completely
   different set of rules and the silhouette has to say so from the first
   glance, because the player is going to be told this thing clears mines
   and nothing else.

   What actually makes a minehunter look like a minehunter:

     - The HULL is FAT and TALL. Real MCMVs are moulded in one piece out of
       glass reinforced plastic, so they are wide, shallow and round-bilged
       with no plate seams anywhere. 55 m long on a 9.6 m beam is a length
       to beam ratio of 5.7 where a frigate runs 8 to 9, and the freeboard
       amidships is over four metres on a draught of under three. The result
       is a stubby, high-sided, almost tugboat-like block, and getting that
       proportion wrong is the one mistake that would make this read as a
       small patrol boat instead.
     - The STERN GANTRY is the identity. An A-frame straddles the transom
       for streaming sweep gear, raked aft so its head overhangs the water,
       with hydraulic luffing rams and a sheave block hanging off it.
     - Under the A-frame, a LAUNCH AND RECOVERY RAMP: the transom bulwark is
       cut away on the centreline and a rollered lip runs down over it, with
       rails leading forward up the quarterdeck.
     - A remotely operated MINE DISPOSAL VEHICLE sits on a cradle on those
       rails, painted the international yellow every one of them wears. At
       RTS zoom that single spot of yellow on a grey deck is the fastest
       read on the whole model.
     - A big HULL MOUNTED SONAR gondola hangs under the forefoot, a metre
       and a half proud of the keel. It is the ship's main sensor and on the
       real ones it is impossible to miss from the side.
     - Forward, one light gun on the forecastle -- these ships carry a
       bandstand mount, not a turret in a barbette -- named "turret" so
       render3d.js can train it.
     - A tall pole-and-tripod mast, a squat funnel, sweep cable reels, otter
       float racks, a deck crane, and railings everywhere.

   Model space follows models3d.js: +X bow, +Y left (port), +Z up, real
   metres, WATERLINE AT z = 0. render3d.js applies rotation.x = -PI/2 and
   rescales by measured length, so this file is authored Z-up, never Y-up.

   Measured, in this file's coordinates (midships x = 0, stem x = +27.5):
     LOA 55.0   max beam 9.62   deck amidships z = 4.20   draught 2.85
     sonar gondola x = +13 .. +23, bottom z = -4.10
     forecastle gun axis x = +20.4      bridge front x = +15.2
     01 deck z = 7.55    bridge roof z = 10.55    mast truck z = 21.4
     A-frame feet x = -25.2, head x = -28.9 at z = 9.65
     ramp lip x = -25.8 .. -28.7        ROV cradle x = -18.6            */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var MineSweeper3D = (function () {
  "use strict";

  var PI = Math.PI;

  /* ---------------------------------------------------------------- paint
     A mine countermeasures vessel is an auxiliary and is painted a shade
     lighter than the escorts, which also keeps it apart from the warship3d
     hulls in a lineup. Boot topping black, antifouling the usual red brown. */
  var C_HULL = "#6e767d";
  var C_SUP  = "#7b838b";
  var C_DECK = "#464c51";
  var C_BOOT = "#1c2023";
  var C_FOUL = "#4b2c25";

  var LOA  = 55.0;
  var X_ST = -27.5, X_BW = 27.5;
  var Z_TB = -3.40, Z_TT = 6.10;      /* hull texture v span, metres of z */

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  /* ------------------------------------------------------------- stations
     x, half beam, deck z, keel z, topsides sq, underbody sq.

     sq below 1 squares the section off, above 1 pinches it in. The topsides
     of a GRP minehunter are nearly vertical with a hard rounded gunwale, so
     they sit near 0.45; the underbody is a genuinely round full bilge and
     runs at 1.0 or above. That combination -- slab sides on a barrel bottom
     -- is what gives these ships their fat, floaty look.                  */
  var STA = [
    [-27.50, 4.10, 3.92, -0.90, 0.38, 0.52],
    [-26.20, 4.28, 3.94, -1.95, 0.39, 0.60],
    [-24.00, 4.46, 3.98, -2.38, 0.40, 0.70],
    [-20.00, 4.62, 4.04, -2.62, 0.42, 0.80],
    [-15.00, 4.73, 4.12, -2.76, 0.44, 0.89],
    [-10.00, 4.79, 4.20, -2.83, 0.46, 0.95],
    [ -4.00, 4.78, 4.31, -2.85, 0.48, 0.99],
    [  1.00, 4.71, 4.43, -2.84, 0.50, 1.02],
    [  6.00, 4.57, 4.57, -2.78, 0.53, 1.04],
    [ 11.00, 4.33, 4.72, -2.66, 0.57, 1.06],
    [ 15.00, 4.01, 4.88, -2.49, 0.62, 1.08],
    [ 18.50, 3.57, 5.04, -2.25, 0.69, 1.11],
    [ 21.50, 3.00, 5.20, -1.92, 0.77, 1.15],
    [ 24.00, 2.31, 5.36, -1.42, 0.87, 1.20],
    [ 26.00, 1.52, 5.51, -0.62, 0.99, 1.26],
    [ 27.10, 0.72, 5.62,  0.52, 1.11, 1.32],
    [ 27.50, 0.16, 5.70,  1.58, 1.20, 1.38]
  ];
  var EPS = 0.05;              /* topsides loft is this much the wider    */

  function sta(x) {
    var n = STA.length, i;
    if (x <= STA[0][0]) return STA[0].slice();
    if (x >= STA[n - 1][0]) return STA[n - 1].slice();
    for (i = 1; i < n; i++) {
      if (x <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i];
        var u = (x - a[0]) / (b[0] - a[0]), o = [x], k;
        for (k = 1; k < 6; k++) o.push(lerp(a[k], b[k], u));
        return o;
      }
    }
    return STA[n - 1].slice();
  }
  function deckZ(x) { return sta(x)[2]; }
  function halfB(x) { return sta(x)[1] + EPS; }

  /* the topsides loft has to close somewhere below the waterline; level
     with the knuckle amidships, climbing with the keel at the ends so the
     stem does not grow a fin hanging under the forefoot */
  function topBot(zk) { return zk < -0.45 ? -0.40 : zk + 0.05; }

  /* where the lofted top surface really is at a fraction of its own half
     beam, so the deck plate lies ON the hull instead of hovering over it */
  function crownZ(x, ky) {
    var s = sta(x), bot = topBot(s[3]);
    var h = (s[2] - bot) * 0.5, zc = (s[2] + bot) * 0.5;
    var c = Math.pow(clamp(Math.abs(ky), 0, 1), 1 / s[4]);
    var t = Math.sqrt(Math.max(0, 1 - c * c));
    return zc + h * Math.pow(t, s[4]);
  }

  /* half beam of the topsides loft at a given height: needed to lay the
     pennant decals flush against a hull that is curved in two directions */
  function hullY(x, z) {
    var s = sta(x), bot = topBot(s[3]);
    var h = (s[2] - bot) * 0.5, zc = (s[2] + bot) * 0.5;
    var v = clamp((z - zc) / h, -1, 1);
    var st = Math.pow(Math.abs(v), 1 / s[4]);
    var ct = Math.sqrt(Math.max(0, 1 - st * st));
    return (s[1] + EPS) * Math.pow(ct, s[4]);
  }

  /* =============================================================== texture
     Three painted SKIN canvases: the hull side elevation, the deckhouse
     plating and the deck. Everything else is METAL or GLASS. The hull
     canvas is a true elevation -- the loft's cylindrical v is thrown away
     and rebuilt from world z -- which is the only way a boot topping and a
     waterline survive on a lofted hull.                                   */
  var TEX = {};

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) {
    var c = document.createElement("canvas"); c.width = w; c.height = h; return c;
  }
  function finish(THREE, cv, clampEdge) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = clampEdge ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
    /* r148 ships SRGBColorSpace but Texture.colorSpace does nothing until
       r152, so the encoding field is the only one that has any effect. */
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  }

  function hullTex(THREE) {
    if (TEX.hull) return TEX.hull;
    var W = 1024, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(51413), i, x, y;
    var pz = H / (Z_TT - Z_TB);            /* texture px per metre of z    */
    var px = W / LOA;                      /* texture px per metre of x    */

    function yOf(z) { return (Z_TT - z) * pz; }
    function uOf(sx) { return (sx - X_ST) * px; }
    function deckY(u) { return yOf(deckZ(X_ST + u / px)); }

    g.fillStyle = C_HULL; g.fillRect(0, 0, W, H);

    /* GRP is moulded in one piece, so there are no strakes to draw. What a
       one-piece hull does show is broad soft variation in the gelcoat and
       the shadow of the internal frames printing through. */
    for (i = 0; i < 150; i++) {
      g.globalAlpha = 0.025 + R() * 0.045;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 60 + R() * 220, 16 + R() * 60);
    }
    g.globalAlpha = 0.09; g.strokeStyle = "#000000"; g.lineWidth = 2.4;
    for (i = 1; i < 34; i++) {
      x = i * W / 34;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
    }
    g.globalAlpha = 1;

    /* the sheer: dark rubbing strake tracked along the real deck line with
       a light gunwale highlight over it */
    g.lineWidth = 6.0; g.strokeStyle = "rgba(20,24,27,0.55)";
    g.beginPath();
    for (i = 0; i <= 80; i++) { x = i * W / 80; if (i) g.lineTo(x, deckY(x) + 11); else g.moveTo(x, deckY(x) + 11); }
    g.stroke();
    g.lineWidth = 2.0; g.strokeStyle = "rgba(220,228,233,0.13)";
    g.beginPath();
    for (i = 0; i <= 80; i++) { x = i * W / 80; if (i) g.lineTo(x, deckY(x) + 2.2); else g.moveTo(x, deckY(x) + 2.2); }
    g.stroke();

    /* boot topping, then antifouling under it */
    g.fillStyle = C_BOOT; g.fillRect(0, yOf(0.30), W, yOf(-0.55) - yOf(0.30));
    g.fillStyle = C_FOUL; g.fillRect(0, yOf(-0.55), W, H - yOf(-0.55));
    g.globalAlpha = 0.055;
    for (i = 0; i < 70; i++) {
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, yOf(-0.55) + R() * (H - yOf(-0.55)), 40 + R() * 160, 6 + R() * 20);
    }
    /* weed and scum that always collects right on the boot topping */
    g.globalAlpha = 0.11; g.fillStyle = "#2b342a";
    for (i = 0; i < 130; i++) g.fillRect(R() * W, yOf(0.10) + R() * 7, 10 + R() * 30, 2 + R() * 4);
    g.globalAlpha = 1;

    /* stains weeping from deck fittings, and exhaust smut abaft the funnel */
    for (i = 0; i < 90; i++) {
      x = R() * W; y = deckY(x) + 14 + R() * 20;
      var len = 16 + R() * 60;
      var grd = g.createLinearGradient(0, y, 0, y + len);
      grd.addColorStop(0, "rgba(64,54,44,0.16)");
      grd.addColorStop(1, "rgba(80,64,48,0.0)");
      g.fillStyle = grd; g.fillRect(x, y, 1.6 + R() * 3.4, len);
    }
    for (i = 0; i < 3; i++) {
      var ex = uOf(-3.0 - i * 2.2), ey = yOf(2.9);
      var sg = g.createRadialGradient(ex, ey, 2, ex, ey, 40);
      sg.addColorStop(0, "rgba(22,22,22,0.30)");
      sg.addColorStop(1, "rgba(22,22,22,0.0)");
      g.fillStyle = sg; g.fillRect(ex - 44, ey - 30, 88, 64);
    }

    /* draught marks fore and aft, two columns of small numerals */
    g.fillStyle = "rgba(232,238,242,0.62)";
    for (i = 0; i < 7; i++) {
      var dz = 0.4 + i * 0.35;
      g.fillRect(uOf(24.4), yOf(dz), 5, 3);
      g.fillRect(uOf(-25.6), yOf(dz), 5, 3);
    }

    /* bow thruster tunnel: a black disc low in the forefoot */
    g.fillStyle = "rgba(10,12,13,0.85)";
    g.beginPath(); g.ellipse(uOf(19.5), yOf(-1.35), 8, 12, 0, 0, 6.2832); g.fill();
    g.strokeStyle = "rgba(232,238,242,0.20)"; g.lineWidth = 1.4;
    g.beginPath(); g.ellipse(uOf(19.5), yOf(-1.35), 10, 15, 0, 0, 6.2832); g.stroke();

    TEX.hull = finish(THREE, cv, true);
    return TEX.hull;
  }

  /* The pennant number cannot be painted into the hull canvas. The loft's u
     climbs with x on BOTH sides of the ship, so whichever way round the
     glyphs are drawn one side reads backwards. It goes on a thin decal box
     per side instead, one canvas each way up -- which is what
     hero/kpa_e90_missileboat.js does for the same reason. */
  function pennantTex(THREE, spin) {
    var key = "pen_" + (spin ? 1 : 0);
    if (TEX[key]) return TEX[key];
    var W = 256, H = 96, cv = cvs(W, H), g = cv.getContext("2d");
    g.clearRect(0, 0, W, H);
    g.save();
    if (spin) { g.translate(W, H); g.scale(-1, -1); }
    g.font = "bold 70px Arial";
    g.textAlign = "center"; g.textBaseline = "middle";
    g.lineWidth = 9; g.strokeStyle = "rgba(12,14,16,0.85)";
    g.strokeText("M 41", W * 0.5, H * 0.54);
    g.fillStyle = "#dbe2e7";
    g.fillText("M 41", W * 0.5, H * 0.54);
    g.restore();
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    TEX[key] = t; return t;
  }

  function supTex(THREE) {
    if (TEX.sup) return TEX.sup;
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(30011), i;
    g.fillStyle = C_SUP; g.fillRect(0, 0, W, H);
    for (i = 0; i < 44; i++) {
      g.globalAlpha = 0.05 + R() * 0.07;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 24 + R() * 90, 16 + R() * 60);
    }
    g.globalAlpha = 0.20; g.strokeStyle = "#000000"; g.lineWidth = 1.6;
    for (i = 1; i < 6; i++) {
      g.beginPath(); g.moveTo(0, i * H / 6); g.lineTo(W, i * H / 6); g.stroke();
      g.beginPath(); g.moveTo(i * W / 6, 0); g.lineTo(i * W / 6, H); g.stroke();
    }
    /* watertight doors and scuttles, small enough to belong in the paint */
    g.globalAlpha = 0.32; g.fillStyle = "#2a2f33";
    for (i = 0; i < 5; i++) g.fillRect(R() * W, R() * H * 0.7 + H * 0.25, 20, 34);
    g.globalAlpha = 0.36; g.fillStyle = "#1b1f22";
    for (i = 0; i < 16; i++) {
      var cxp = R() * W, cyp = R() * H;
      g.beginPath(); g.arc(cxp, cyp, 2.4 + R() * 2, 0, 6.2832); g.fill();
    }
    /* grime always heavier down at the base of a deckhouse */
    g.globalAlpha = 1;
    var gr = g.createLinearGradient(0, H * 0.62, 0, H);
    gr.addColorStop(0, "rgba(40,36,32,0.0)");
    gr.addColorStop(1, "rgba(40,36,32,0.24)");
    g.fillStyle = gr; g.fillRect(0, H * 0.62, W, H * 0.38);
    TEX.sup = finish(THREE, cv, false);
    return TEX.sup;
  }

  function deckTex(THREE) {
    if (TEX.deck) return TEX.deck;
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(77003), i;
    g.fillStyle = C_DECK; g.fillRect(0, 0, W, H);
    for (i = 0; i < 34; i++) {
      g.globalAlpha = 0.06 + R() * 0.07;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 26 + R() * 90, 18 + R() * 60);
    }
    g.globalAlpha = 0.26; g.strokeStyle = "#000000"; g.lineWidth = 2;
    for (i = 1; i < 7; i++) {
      g.beginPath(); g.moveTo(0, i * H / 7); g.lineTo(W, i * H / 7); g.stroke();
      g.beginPath(); g.moveTo(i * W / 7, 0); g.lineTo(i * W / 7, H); g.stroke();
    }
    g.globalAlpha = 0.30; g.fillStyle = "#000000";
    for (i = 0; i < 1100; i++) g.fillRect(R() * W, R() * H, 2, 2);
    /* scuffed drag marks: the working deck of an MCMV gets dragged over */
    g.globalAlpha = 0.13; g.strokeStyle = "#b9c1c6"; g.lineWidth = 3;
    for (i = 0; i < 22; i++) {
      var sx = R() * W, sy = R() * H;
      g.beginPath(); g.moveTo(sx, sy); g.lineTo(sx + (R() - 0.5) * 90, sy + (R() - 0.5) * 30); g.stroke();
    }
    g.globalAlpha = 1;
    TEX.deck = finish(THREE, cv, false);
    return TEX.deck;
  }

  /* ============================================================== helpers */

  /* M.loft winds its triangles inward, so a single-sided material shows you
     the inside of the far wall. Flipping the index and recomputing normals
     costs nothing and halves the fill. */
  function loftMesh(THREE, M, sections, segs, mtl) {
    var g = M.loft(THREE, sections, segs);
    var idx = g.getIndex();
    if (idx) {
      var a = idx.array, i, t;
      for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
      idx.needsUpdate = true;
    }
    g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* throw away the loft's cylindrical v and rebuild the UVs as a true side
     elevation, so the painted waterline lands where the waterline is */
  function elevationUV(geo) {
    var p = geo.getAttribute("position"), uv = geo.getAttribute("uv"), i;
    for (i = 0; i < p.count; i++) {
      uv.setXY(i, (p.getX(i) - X_ST) / LOA, (p.getZ(i) - Z_TB) / (Z_TT - Z_TB));
    }
    uv.needsUpdate = true;
  }

  /* a four sided cylinder is a box whose top face scales independently,
     which is how every deckhouse and funnel casing gets sloped sides free */
  function tbox(THREE, lx, ly, lz, top) {
    var g = new THREE.CylinderGeometry(top === undefined ? 1 : top, 1, lz, 4, 1);
    g.rotateX(PI / 2); g.rotateZ(PI / 4);
    g.scale(lx * 0.70710678, ly * 0.70710678, 1);
    g = g.toNonIndexed(); g.computeVertexNormals();
    return g;
  }
  function boxM(THREE, mtl, lx, ly, lz) {
    return new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), mtl);
  }
  /* the same box, but UV'd off world z so the hull skin's boot topping and
     antifouling run straight through it. A plain BoxGeometry maps the whole
     1024 x 256 elevation onto every face, which put a band of antifouling
     across the transom at deck height the first time this was built. */
  function skinBox(THREE, mtl, lx, ly, lz, x, y, z) {
    var g = new THREE.BoxGeometry(lx, ly, lz);
    g.translate(x, y, z);
    var p = g.getAttribute("position"), uv = g.getAttribute("uv"), i;
    for (i = 0; i < p.count; i++)
      uv.setXY(i, (p.getX(i) - X_ST) / LOA, (p.getZ(i) - Z_TB) / (Z_TT - Z_TB));
    uv.needsUpdate = true;
    return new THREE.Mesh(g, mtl);
  }
  /* cylinder standing on the Z axis */
  function cylZ(THREE, mtl, rt, rb, h, seg, open) {
    return new THREE.Mesh(
      new THREE.CylinderGeometry(rt, rb, h, seg || 8, 1, !!open).rotateX(PI / 2), mtl);
  }
  /* cylinder lying along the X axis */
  function cylX(THREE, mtl, rt, rb, h, seg, open) {
    return new THREE.Mesh(
      new THREE.CylinderGeometry(rt, rb, h, seg || 8, 1, !!open).rotateZ(-PI / 2), mtl);
  }
  /* cylinder lying along the Y axis */
  function cylY(THREE, mtl, rt, rb, h, seg, open) {
    return new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 8, 1, !!open), mtl);
  }
  /* a cylinder stretched between two points: gantry legs, braces, stays */
  function strut(THREE, mtl, ax, ay, az, bx, by, bz, r, seg) {
    var dx = bx - ax, dy = by - ay, dz = bz - az;
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return new THREE.Object3D();
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 5, 1), mtl);
    m.position.set((ax + bx) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0),
                                    new THREE.Vector3(dx, dy, dz).normalize());
    return m;
  }

  /* main deck: a cambered ribbon lying on the hull top, sheer and all */
  function deckRibbon(THREE, mtl) {
    var kys = [-0.985, -0.62, 0, 0.62, 0.985];
    var pos = [], uv = [], idx = [], i, j;
    var xs = [], s;
    for (i = 0; i < STA.length; i++) xs.push(STA[i][0]);
    for (i = 0; i < xs.length; i++) {
      for (j = 0; j < kys.length; j++) {
        var ky = kys[j];
        pos.push(xs[i], halfB(xs[i]) * ky, crownZ(xs[i], ky) + 0.03);
        uv.push((xs[i] - X_ST) / 4.2, (ky + 1) * 2.4);
      }
    }
    var Rn = kys.length;
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < Rn - 1; j++) {
      var a = i * Rn + j, b = a + 1, c = a + Rn, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* Rubbing strake. Built as a swept strip that reads halfB and deckZ at
     every station instead of a row of straight boxes: a 6 m box chord across
     a bow that loses half a metre of beam over the same run stood a third of
     a metre proud of the hull, which is exactly what it looked like. */
  function fenderStrake(THREE, mtl, s) {
    var N = 13, T0 = -27.0, T1 = 23.9, ROWS = 4, t = 0.26;
    var pos = [], uv = [], idx = [], i, j, x;
    for (i = 0; i < N; i++) {
      x = T0 + (T1 - T0) * i / (N - 1);
      var zt = deckZ(x) - 0.50, zb = deckZ(x) - 0.98;
      var yt = hullY(x, zt), yb = hullY(x, zb);
      var prof = [[yt, zt], [yt + t, zt - 0.07], [yb + t, zb + 0.07], [yb, zb]];
      for (j = 0; j < ROWS; j++) {
        pos.push(x, s * prof[j][0], prof[j][1]);
        uv.push(i / (N - 1), j / (ROWS - 1));
      }
    }
    for (i = 0; i < N - 1; i++) for (j = 0; j < ROWS - 1; j++) {
      var a = i * ROWS + j, b = a + 1, c = a + ROWS, d = c + 1;
      if (s > 0) idx.push(a, c, d, a, d, b);
      else       idx.push(a, d, c, a, b, d);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* stanchion and wire railing. A ship without these does not read as one,
     but they are also the cheapest way to blow a triangle budget, so the
     stanchions are stepped along the whole polyline at a fixed spacing and
     each wire is one box per polyline segment rather than per stanchion. */
  function railRun(THREE, G, mtl, pts, h, step) {
    var i, k, n = pts.length;
    if (n < 2) return;
    step = step || 2.4;
    /* wires */
    for (i = 0; i < n - 1; i++) {
      var a = pts[i], b = pts[i + 1];
      var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      for (k = 1; k <= 2; k++) {
        var zz = h * (k === 1 ? 0.54 : 1.0);
        var w = boxM(THREE, mtl, L, 0.05, 0.05);
        w.position.set((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5 + zz);
        w.rotation.z = Math.atan2(dy, dx);
        w.rotation.y = -Math.atan2(dz, Math.sqrt(dx * dx + dy * dy));
        G.add(w);
      }
    }
    /* stanchions, walked along the polyline */
    var acc = 0, seg = 0, segLen, t;
    var total = 0;
    for (i = 0; i < n - 1; i++) {
      total += Math.sqrt(Math.pow(pts[i + 1][0] - pts[i][0], 2) +
                         Math.pow(pts[i + 1][1] - pts[i][1], 2));
    }
    var count = Math.max(2, Math.round(total / step) + 1);
    for (i = 0; i < count; i++) {
      var want = total * i / (count - 1), run = 0, px = pts[0][0], py = pts[0][1], pz = pts[0][2];
      for (seg = 0; seg < n - 1; seg++) {
        segLen = Math.sqrt(Math.pow(pts[seg + 1][0] - pts[seg][0], 2) +
                           Math.pow(pts[seg + 1][1] - pts[seg][1], 2));
        if (run + segLen >= want || seg === n - 2) {
          t = segLen < 1e-6 ? 0 : clamp((want - run) / segLen, 0, 1);
          px = lerp(pts[seg][0], pts[seg + 1][0], t);
          py = lerp(pts[seg][1], pts[seg + 1][1], t);
          pz = lerp(pts[seg][2], pts[seg + 1][2], t);
          break;
        }
        run += segLen;
      }
      var st = boxM(THREE, mtl, 0.07, 0.07, h);
      st.position.set(px, py, pz + h * 0.5);
      G.add(st);
      acc += 1;
    }
  }

  /* ================================================================ build */
  function build(THREE, M, C) {
    var T = THREE, G = new T.Group(), i, s, x, z;

    /* C.team arrives as a CSS hex STRING from render3d.js and as a number
       from the comparison harness. THREE.Color swallows both; bit
       arithmetic on it would not, so nothing here does any. */
    var teamCol = new T.Color((C && C.team !== undefined && C.team !== null)
                              ? C.team : 0x3f7fd0);

    var mSkin  = new T.MeshStandardMaterial({ color: 0xffffff, map: hullTex(T),
                                              roughness: 0.88, metalness: 0.05 });
    var mSup   = new T.MeshStandardMaterial({ color: 0xffffff, map: supTex(T),
                                              roughness: 0.86, metalness: 0.07 });
    var mDeck  = new T.MeshStandardMaterial({ color: 0xffffff, map: deckTex(T),
                                              roughness: 0.92, metalness: 0.05 });
    var mMetal = new T.MeshStandardMaterial({ color: 0x99a1a7, roughness: 0.52, metalness: 0.55 });
    var mDark  = new T.MeshStandardMaterial({ color: 0x23272b, roughness: 0.58, metalness: 0.42 });
    var mFoul  = new T.MeshStandardMaterial({ color: 0x4b2c25, roughness: 0.90, metalness: 0.06 });
    var mRub   = new T.MeshStandardMaterial({ color: 0x191c1f, roughness: 0.95, metalness: 0.03 });
    var mWhite = new T.MeshStandardMaterial({ color: 0xc9d0d5, roughness: 0.80, metalness: 0.06 });
    var mROV   = new T.MeshStandardMaterial({ color: 0xe8a516, roughness: 0.70, metalness: 0.10 });
    var mWarn  = new T.MeshStandardMaterial({ color: 0xcf5426, roughness: 0.78, metalness: 0.08 });
    var mTeam  = new T.MeshStandardMaterial({ color: teamCol, roughness: 0.64, metalness: 0.18 });
    var mGlass = new T.MeshPhysicalMaterial({ color: 0x1d3040, roughness: 0.10, metalness: 0.0,
                                              transparent: true, opacity: 0.84 });
    var mPen = [
      new T.MeshStandardMaterial({ color: 0xffffff, map: pennantTex(T, true),
                                   alphaTest: 0.5, roughness: 0.84, metalness: 0.06 }),
      new T.MeshStandardMaterial({ color: 0xffffff, map: pennantTex(T, false),
                                   alphaTest: 0.5, roughness: 0.84, metalness: 0.06 })
    ];

    /* ------------------------------------------------------------- hull
       Two lofts, not one. The topsides run from just under the waterline
       to the deck and are the wider by EPS; the underbody runs keel to
       deck inside them. Both take the same side elevation UVs, so the
       boot topping lines up across the knuckle with nothing z-fighting. */
    var topS = [], lowS = [];
    for (i = 0; i < STA.length; i++) {
      s = STA[i];
      var bot = topBot(s[3]);
      topS.push({ x: s[0], w: s[1] + EPS, h: (s[2] - bot) * 0.5,
                  zc: (s[2] + bot) * 0.5, sq: s[4] });
      lowS.push({ x: s[0], w: s[1], h: (s[2] - s[3]) * 0.5,
                  zc: (s[2] + s[3]) * 0.5, sq: s[5] });
    }
    var low = loftMesh(T, M, lowS, 12, mSkin); elevationUV(low.geometry); G.add(low);
    var top = loftMesh(T, M, topS, 16, mSkin); elevationUV(top.geometry); G.add(top);
    G.add(deckRibbon(T, mDeck));

    /* ------------------------------------------------- transom and notch
       The loft is open at both ends. The transom is closed with three
       plates rather than one, leaving a 3.1 m notch on the centreline for
       the launch and recovery ramp to run out through -- which is the one
       feature that most reliably says "this ship works over the stern". */
    var TX = -27.52, TB = STA[0][3], TD = STA[0][2], THB = STA[0][1];
    var NHW = 2.05, NZ = 1.80;                 /* notch half width, sill z */
    for (s = -1; s <= 1; s += 2) {
      var wq = (THB - NHW) * 0.90;
      G.add(skinBox(T, mSkin, 0.30, wq, TD - TB,
                    TX, s * (NHW + wq * 0.5), (TD + TB) * 0.5));
    }
    G.add(skinBox(T, mSkin, 0.30, NHW * 2, NZ - TB, TX, 0, (NZ + TB) * 0.5));
    /* the dark inside of the notch, so it reads as an opening not a hole */
    var caveB = boxM(T, mDark, 3.6, NHW * 1.98, TD - NZ);
    caveB.position.set(TX + 1.9, 0, (TD + NZ) * 0.5); G.add(caveB);

    /* ------------------------------------------- hull mounted sonar dome
       The gondola under the forefoot. It hangs 1.7 m proud of the keel and
       is the single feature that separates a minehunter's underwater body
       from a patrol boat's -- worth the 170 triangles on that alone.     */
    var domeMat = new T.MeshStandardMaterial({ color: 0x3a2b28, roughness: 0.86, metalness: 0.08 });
    var dome = [
      { x: 12.6, w: 0.20, h: 0.22, zc: -2.55, sq: 1.0 },
      { x: 14.2, w: 0.88, h: 0.74, zc: -2.98, sq: 1.0 },
      { x: 16.4, w: 1.20, h: 1.00, zc: -3.12, sq: 1.0 },
      { x: 18.8, w: 1.20, h: 1.00, zc: -3.10, sq: 1.0 },
      { x: 20.6, w: 0.98, h: 0.84, zc: -2.96, sq: 1.0 },
      { x: 22.2, w: 0.58, h: 0.52, zc: -2.72, sq: 1.05 },
      { x: 23.1, w: 0.14, h: 0.16, zc: -2.48, sq: 1.1 }
    ];
    G.add(loftMesh(T, M, dome, 12, domeMat));
    /* the fairing where the gondola blends into the forefoot */
    var fair = new T.Mesh(new T.SphereGeometry(1.35, 8, 5), mFoul);
    fair.position.set(17.4, 0, -2.30); fair.scale.set(2.6, 0.66, 0.42); G.add(fair);

    /* ---------------------------------------- skeg, shaft, screw, rudder */
    var skeg = boxM(T, mFoul, 8.0, 0.55, 1.5);
    skeg.position.set(-20.5, 0, -2.35); G.add(skeg);
    var shaft = cylX(T, mMetal, 0.22, 0.22, 3.2, 8);
    shaft.position.set(-24.6, 0, -1.85); G.add(shaft);
    var boss = cylX(T, mFoul, 0.44, 0.60, 1.3, 8);
    boss.position.set(-23.2, 0, -1.85); G.add(boss);
    /* a shrouded screw: MCMVs run ducted or shrouded props for quietness */
    var duct = cylX(T, mMetal, 1.05, 1.05, 1.25, 12, true);
    duct.position.set(-25.6, 0, -1.85); G.add(duct);
    var hub = cylX(T, mMetal, 0.30, 0.24, 0.70, 8);
    hub.position.set(-25.6, 0, -1.85); G.add(hub);
    for (i = 0; i < 4; i++) {
      var bl = boxM(T, mMetal, 0.16, 0.78, 0.34);
      bl.position.set(-25.6, 0, -1.85);
      bl.rotation.x = i * PI / 2 + 0.4;
      bl.translateY(0.52); bl.rotation.y = 0.42; G.add(bl);
    }
    var rud = new T.Mesh(M.slab(T, [[0.95, -1.30], [1.05, 1.05], [-0.30, 1.20],
                                    [-1.15, 0.30], [-1.10, -1.25]], 0.30, "xz"), mFoul);
    rud.position.set(-26.4, 0.15, -1.55); G.add(rud);

    /* ----------------------------------------------------- fender strake
       A working boat that goes alongside dan buoys and tenders all day has
       a rubbing band right round the sheer. It is also the cheapest way to
       make the high freeboard read as high rather than as a flat wall. */
    for (s = -1; s <= 1; s += 2) G.add(fenderStrake(T, mRub, s));

    /* ======================================================= deckhouse
       One long low block filling the forward half, bridge stacked on its
       front end, and then nothing at all abaft it: the whole after half of
       the ship is open working deck. That empty quarterdeck is as much a
       part of the identity as the gantry standing on it.                 */
    var DH_A = -6.5, DH_F = 15.4, DH_HW = 3.85, Z_01 = 7.55;
    var dh = new T.Mesh(tbox(T, DH_F - DH_A, DH_HW * 2, Z_01 - 3.60, 0.97), mSup);
    dh.position.set((DH_A + DH_F) * 0.5, 0, (Z_01 + 3.60) * 0.5); G.add(dh);
    /* 01 deck, run out past the house sides to make the bridge wings */
    var d01 = boxM(T, mDeck, DH_F - DH_A + 0.5, 8.35, 0.14);
    d01.position.set((DH_A + DH_F) * 0.5, 0, Z_01 + 0.07); G.add(d01);
    /* the break at the after end of the house, where the deck steps down */
    var brk = boxM(T, mSup, 0.35, DH_HW * 1.94, 1.1);
    brk.position.set(DH_A - 0.10, 0, Z_01 - 0.55); G.add(brk);

    var BR_A = 6.2, BR_F = 14.1, BR_HW = 3.55, Z_BR = 10.55;
    var br = new T.Mesh(tbox(T, BR_F - BR_A, BR_HW * 2, Z_BR - Z_01 + 0.10, 0.90), mSup);
    br.position.set((BR_A + BR_F) * 0.5, 0, (Z_BR + Z_01 - 0.10) * 0.5); G.add(br);
    var brRoof = boxM(T, mDeck, BR_F - BR_A + 0.35, BR_HW * 1.92, 0.14);
    brRoof.position.set((BR_A + BR_F) * 0.5, 0, Z_BR + 0.07); G.add(brRoof);
    var brFlash = boxM(T, mTeam, 0.62, BR_HW * 1.86, 0.10);
    brFlash.position.set(BR_F - 0.55, 0, Z_BR + 0.16); G.add(brFlash);

    /* bridge windows: one band right round the front and down both sides.
       A wheelhouse that cannot see out is the fastest way to make a ship
       look like a shipping container with a mast on it. */
    var wz = 9.55, wf = (wz - Z_01 + 0.10) / (Z_BR - Z_01 + 0.10);
    var wsc = 1 + (0.90 - 1) * wf;
    var wxF = (BR_A + BR_F) * 0.5 + (BR_F - BR_A) * 0.5 * wsc;
    for (i = 0; i < 5; i++) {
      var wy = (i - 2) * BR_HW * wsc * 0.37;
      var pane = boxM(T, mGlass, 0.22, BR_HW * wsc * 0.33, 1.15);
      pane.position.set(wxF - 0.10 - Math.abs(wy) * 0.055, wy, wz);
      pane.rotation.z = -wy * 0.055; G.add(pane);
    }
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 2; i++) {
      var sx2 = (BR_A + BR_F) * 0.5 + (1.4 - i * 2.4);
      var spane = boxM(T, mGlass, 1.55, 0.22, 1.05);
      spane.position.set(sx2, s * BR_HW * wsc * 0.99, wz); G.add(spane);
    }
    /* two team stripes on the bridge sides -- the only painted marking on
       a ship this drab, and the harness looks for the team colour */
    for (s = -1; s <= 1; s += 2) {
      var tstr = boxM(T, mTeam, 2.6, 0.18, 0.34);
      tstr.position.set(BR_A + 1.7, s * BR_HW * 1.00, 8.45); G.add(tstr);
    }

    /* --------------------------------------------------------- funnel
       Squat and wide. A diesel MCMV needs very little uptake area and the
       funnel on the real ships is barely taller than the bridge.        */
    var FX = -2.4;
    var fcase = new T.Mesh(tbox(T, 3.3, 3.5, 2.85, 0.80), mSup);
    fcase.position.set(FX, 0, Z_01 + 1.55); G.add(fcase);
    var fband = boxM(T, mTeam, 3.14, 3.34, 0.62);
    fband.position.set(FX, 0, Z_01 + 2.32); G.add(fband);
    var fcap = boxM(T, mDark, 2.85, 3.05, 0.18);
    fcap.position.set(FX, 0, Z_01 + 3.05); G.add(fcap);
    for (s = -1; s <= 1; s += 2) {
      var up = cylZ(T, mDark, 0.30, 0.32, 0.95, 8);
      up.position.set(FX - 0.35, s * 0.80, Z_01 + 3.45); G.add(up);
    }
    /* uptake grilles on the funnel sides */
    for (s = -1; s <= 1; s += 2) {
      var gr2 = boxM(T, mDark, 1.9, 0.14, 1.0);
      gr2.position.set(FX + 0.10, s * 1.68, Z_01 + 1.35); G.add(gr2);
    }

    /* ------------------------------------------------------------ mast
       Tall, and deliberately so. A minehunter carries a big navigation and
       mine-avoidance radar fit on a small hull, and at RTS zoom the mast
       is most of what tells the eye which way up the model is.          */
    var MX = 4.6;
    var mlow = new T.Mesh(tbox(T, 1.55, 1.70, 3.40, 0.60), mSup);
    mlow.position.set(MX, 0, Z_01 + 1.78); G.add(mlow);
    for (s = -1; s <= 1; s += 2)
      G.add(strut(T, mMetal, MX - 2.4, s * 1.55, Z_01 + 0.10,
                             MX - 0.25, s * 0.38, Z_01 + 3.30, 0.13, 5));
    var pole = cylZ(T, mMetal, 0.15, 0.24, 7.4, 8);
    pole.position.set(MX, 0, Z_01 + 3.30 + 3.7); G.add(pole);
    var plat = boxM(T, mMetal, 1.7, 2.7, 0.12);
    plat.position.set(MX, 0, 12.70); G.add(plat);
    /* navigation radar: the slotted bar every small ship carries */
    var radPed = cylZ(T, mDark, 0.26, 0.30, 0.55, 8);
    radPed.position.set(MX, 0, 13.05); G.add(radPed);
    var radBar = boxM(T, mWhite, 0.26, 2.85, 0.30);
    radBar.position.set(MX, 0, 13.45); radBar.rotation.z = 0.22; G.add(radBar);
    /* a small surface search dish looking forward off the mast */
    var dsh = new T.Mesh(new T.SphereGeometry(0.62, 9, 5, 0, PI * 2, 0, PI * 0.45)
                           .rotateZ(PI / 2), mWhite);
    dsh.position.set(MX + 0.55, 0, 14.55); G.add(dsh);
    var dped = cylX(T, mMetal, 0.14, 0.16, 0.5, 6);
    dped.position.set(MX + 0.18, 0, 14.55); G.add(dped);
    /* signal yard with halyard blocks and the whip aerials */
    G.add(strut(T, mMetal, MX, -2.9, 16.10, MX, 2.9, 16.10, 0.085, 5));
    for (s = -1; s <= 1; s += 2)
      G.add(strut(T, mMetal, MX, s * 2.85, 16.10, MX, s * 1.05, 17.30, 0.06, 4));
    var topm = cylZ(T, mMetal, 0.05, 0.11, 4.4, 6);
    topm.position.set(MX, 0, 19.20); G.add(topm);
    var trk = new T.Mesh(new T.SphereGeometry(0.14, 5, 4), mWhite);
    trk.position.set(MX, 0, 21.40); G.add(trk);
    for (s = -1; s <= 1; s += 2) {
      var whip = cylZ(T, mDark, 0.030, 0.055, 2.9, 4);
      whip.position.set(MX - 0.1, s * 2.0, 17.55); G.add(whip);
    }

    /* ================================================== STERN GANTRY
       The A-frame. Feet on the quarterdeck, head raked out over the water
       past the transom, luffing rams down to deck pedestals, and a sheave
       block hanging under the head with the sweep wire reeved through it.
       Everything else on this ship could belong to a patrol boat; this
       cannot.                                                            */
    var GF_X = -25.2, GF_Y = 3.30, GF_Z = deckZ(GF_X) + 0.02;
    var GH_X = -28.90, GH_Y = 1.35, GH_Z = 9.65;
    function legAt(f) {
      return [lerp(GF_X, GH_X, f), lerp(GF_Y, GH_Y, f), lerp(GF_Z, GH_Z, f)];
    }
    for (s = -1; s <= 1; s += 2) {
      G.add(strut(T, mMetal, GF_X, s * GF_Y, GF_Z, GH_X, s * GH_Y, GH_Z, 0.31, 6));
      var boss2 = cylY(T, mDark, 0.44, 0.44, 1.00, 8);
      boss2.position.set(GF_X, s * GF_Y, GF_Z + 0.10); G.add(boss2);
      /* pedestal the foot pivots on */
      var pd = boxM(T, mSup, 1.3, 1.0, 0.55);
      pd.position.set(GF_X, s * GF_Y, GF_Z - 0.20); G.add(pd);
    }
    var mid = legAt(0.465);
    G.add(strut(T, mMetal, mid[0], -mid[1], mid[2], mid[0], mid[1], mid[2], 0.15, 5));
    G.add(strut(T, mMetal, GH_X, -GH_Y, GH_Z, GH_X, GH_Y, GH_Z, 0.24, 6));
    /* hydraulic luffing rams, barrel on deck and bright rod out of it */
    var ram = legAt(0.40);
    for (s = -1; s <= 1; s += 2) {
      var ax = -21.30, ay = s * 3.05, az = deckZ(ax) + 0.55;
      var bx = ram[0], by = s * ram[1], bz = ram[2];
      G.add(strut(T, mDark, ax, ay, az, lerp(ax, bx, 0.62), lerp(ay, by, 0.62),
                  lerp(az, bz, 0.62), 0.22, 6));
      G.add(strut(T, mWhite, lerp(ax, bx, 0.55), lerp(ay, by, 0.55), lerp(az, bz, 0.55),
                  bx, by, bz, 0.115, 6));
      var rmount = boxM(T, mSup, 0.8, 0.7, 0.7);
      rmount.position.set(ax, ay, az - 0.35); G.add(rmount);
    }
    /* sheave block and the wire running down through the ramp */
    var blk = boxM(T, mDark, 0.55, 0.80, 0.85);
    blk.position.set(GH_X + 0.05, 0, GH_Z - 0.72); G.add(blk);
    var shv = cylY(T, mMetal, 0.36, 0.36, 0.34, 8);
    shv.position.set(GH_X + 0.05, 0, GH_Z - 0.95); G.add(shv);
    var wire = cylZ(T, mDark, 0.045, 0.045, 4.2, 4);
    wire.position.set(GH_X + 0.05, 0, GH_Z - 3.05); G.add(wire);

    /* ================================== launch and recovery ramp
       A rollered lip running out through the notch in the transom, with
       rails leading forward up the quarterdeck for the vehicle cradle. */
    var rampAng = -Math.atan((3.98 - 2.35) / 2.90);
    var lip = boxM(T, mDeck, 3.34, 4.10, 0.16);
    lip.position.set(-27.25, 0, 3.165); lip.rotation.y = rampAng; G.add(lip);
    for (s = -1; s <= 1; s += 2) {
      var coam = boxM(T, mSup, 3.34, 0.22, 0.70);
      coam.position.set(-27.25, s * 2.06, 3.48); coam.rotation.y = rampAng; G.add(coam);
      /* the channel the cradle runs down, carried forward up the deck */
      var chan = boxM(T, mSup, 6.6, 0.22, 0.55);
      chan.position.set(-22.4, s * 2.06, deckZ(-22.4) + 0.28); G.add(chan);
    }
    var rol1 = cylY(T, mMetal, 0.30, 0.30, 3.70, 8);
    rol1.position.set(-25.85, 0, 4.08); G.add(rol1);
    var rol2 = cylY(T, mMetal, 0.32, 0.32, 3.80, 8);
    rol2.position.set(-28.55, 0, 2.55); G.add(rol2);
    for (s = -1; s <= 1; s += 2) {
      var rail = boxM(T, mMetal, 9.6, 0.22, 0.20);
      rail.position.set(-21.0, s * 1.25, 4.10); G.add(rail);
    }

    /* ======================== remotely operated mine disposal vehicle
       Stowed on its cradle on the ramp rails. International yellow: on a
       grey ship it is the only saturated colour anywhere, and at RTS zoom
       that one spot is what a player will actually recognise.           */
    var RV = new T.Group(); RV.position.set(-18.60, 0, 5.55); G.add(RV);
    var body = [
      { x: -1.55, w: 0.30, h: 0.28, zc: 0.00, sq: 0.85 },
      { x: -1.15, w: 0.66, h: 0.52, zc: 0.00, sq: 0.70 },
      { x: -0.30, w: 0.80, h: 0.60, zc: 0.02, sq: 0.62 },
      { x:  0.60, w: 0.80, h: 0.60, zc: 0.02, sq: 0.62 },
      { x:  1.20, w: 0.62, h: 0.50, zc: 0.00, sq: 0.72 },
      { x:  1.58, w: 0.24, h: 0.24, zc: 0.00, sq: 0.95 }
    ];
    var rvb = loftMesh(T, M, body, 10, mROV); RV.add(rvb);
    /* sonar and camera head in the nose */
    var head = new T.Mesh(new T.SphereGeometry(0.34, 8, 5), mWhite);
    head.position.set(1.28, 0, 0.05); head.scale.x = 1.3; RV.add(head);
    /* ducted thrusters: two pushing aft, two lifting */
    for (s = -1; s <= 1; s += 2) {
      var th1 = cylX(T, mDark, 0.30, 0.30, 0.42, 10, true);
      th1.position.set(-1.35, s * 0.44, -0.06); RV.add(th1);
      var th2 = cylZ(T, mDark, 0.24, 0.24, 0.38, 8, true);
      th2.position.set(0.10, s * 0.92, 0.30); RV.add(th2);
      var tarm = boxM(T, mROV, 0.34, 0.55, 0.14);
      tarm.position.set(0.10, s * 0.62, 0.30); RV.add(tarm);
    }
    /* protective frame over the top, and the skids it sits on */
    for (s = -1; s <= 1; s += 2) {
      var frm = boxM(T, mMetal, 2.5, 0.10, 0.09);
      frm.position.set(-0.20, s * 0.70, 0.74); RV.add(frm);
      var skid = boxM(T, mMetal, 2.3, 0.12, 0.10);
      skid.position.set(-0.20, s * 0.58, -0.68); RV.add(skid);
    }
    for (i = -1; i <= 1; i += 2) {
      var arch = boxM(T, mMetal, 0.10, 1.50, 0.09);
      arch.position.set(i * 1.0, 0, 0.74); RV.add(arch);
      var post2 = boxM(T, mMetal, 0.09, 1.52, 0.09);
      post2.position.set(i * 1.0, 0, 0.36); RV.add(post2);
    }
    /* tether fairlead on the tail */
    var teth = cylX(T, mDark, 0.10, 0.10, 0.5, 6);
    teth.position.set(-1.85, 0, 0.18); RV.add(teth);

    /* cradle under it, standing on the ramp rails */
    for (s = -1; s <= 1; s += 2) {
      var cr = boxM(T, mSup, 2.9, 0.18, 0.14);
      cr.position.set(-18.60, s * 0.80, 4.78); G.add(cr);
      for (i = -1; i <= 1; i += 2) {
        var cleg = boxM(T, mSup, 0.16, 0.16, 0.62);
        cleg.position.set(-18.60 + i * 1.25, s * 0.80, 4.42); G.add(cleg);
      }
      var cv2 = boxM(T, mSup, 0.9, 0.14, 0.55);
      cv2.position.set(-18.60, s * 0.72, 5.05); cv2.rotation.x = s * 0.45; G.add(cv2);
    }

    /* ============================== sweep winch, cable reels, floats
       The rest of the working deck is the sweep outfit: one big winch on
       the centreline, two cable reels against the bulwark, and a pair of
       otter floats in racks. Together they explain what the gantry is for. */
    var WX = -8.60;
    var wbase = boxM(T, mSup, 2.4, 3.4, 0.55);
    wbase.position.set(WX, 0, deckZ(WX) + 0.28); G.add(wbase);
    for (s = -1; s <= 1; s += 2) {
      var wch = boxM(T, mSup, 1.5, 0.35, 1.5);
      wch.position.set(WX, s * 1.45, deckZ(WX) + 1.25); G.add(wch);
    }
    var drum = cylY(T, mDark, 0.80, 0.80, 2.30, 10);
    drum.position.set(WX, 0, deckZ(WX) + 1.30); G.add(drum);

    for (s = -1; s <= 1; s += 2) {
      var RX = -12.30;
      var rfr = boxM(T, mSup, 1.9, 1.7, 0.40);
      rfr.position.set(RX, s * 3.35, deckZ(RX) + 0.20); G.add(rfr);
      var reel = cylY(T, mDark, 0.72, 0.72, 1.25, 8);
      reel.position.set(RX, s * 3.35, deckZ(RX) + 1.05); G.add(reel);
      for (i = -1; i <= 1; i += 2) {
        var flng = cylY(T, mMetal, 0.86, 0.86, 0.14, 8);
        flng.position.set(RX, s * 3.35 + i * 0.62, deckZ(RX) + 1.05); G.add(flng);
      }
    }

    /* otter floats in their deck racks: buoyant bodies with a stabilising
       fin, the things the sweep wire is streamed from */
    for (s = -1; s <= 1; s += 2) {
      var OX = -15.60, OY = s * 3.45, OZ = deckZ(OX) + 0.85;
      var ob = cylX(T, mWarn, 0.44, 0.44, 2.30, 8);
      ob.position.set(OX, OY, OZ); G.add(ob);
      var on = new T.Mesh(new T.ConeGeometry(0.44, 0.85, 8).rotateZ(-PI / 2), mWarn);
      on.position.set(OX + 1.58, OY, OZ); G.add(on);
      var ot = new T.Mesh(new T.ConeGeometry(0.44, 0.60, 8).rotateZ(PI / 2), mWarn);
      ot.position.set(OX - 1.45, OY, OZ); G.add(ot);
      var ofin = boxM(T, mMetal, 1.1, 0.09, 0.72);
      ofin.position.set(OX - 0.85, OY, OZ + 0.55); G.add(ofin);
      for (i = -1; i <= 1; i += 2) {
        var ocr = boxM(T, mSup, 0.30, 1.10, 0.60);
        ocr.position.set(OX + i * 0.85, OY, OZ - 0.62); G.add(ocr);
      }
    }

    /* ---------------------------------------------------- deck crane
       A knuckle-boom crane on the starboard quarter, for putting the
       vehicle and the dan buoys over the side. */
    var CX = -7.00, CY = -3.80, CZ = deckZ(CX);
    var cbase = cylZ(T, mSup, 0.58, 0.70, 0.60, 8);
    cbase.position.set(CX, CY, CZ + 0.30); G.add(cbase);
    var cpost = cylZ(T, mSup, 0.38, 0.48, 4.10, 8);
    cpost.position.set(CX, CY, CZ + 2.60); G.add(cpost);
    var chead = boxM(T, mSup, 0.9, 0.8, 0.7);
    chead.position.set(CX, CY, CZ + 4.80); G.add(chead);
    var jib = boxM(T, mSup, 4.6, 0.30, 0.34);
    jib.position.set(CX - 2.15, CY, CZ + 5.35); jib.rotation.y = 0.30; G.add(jib);
    var jib2 = boxM(T, mSup, 3.0, 0.24, 0.26);
    jib2.position.set(CX - 5.60, CY + 0.02, CZ + 5.28); jib2.rotation.y = -0.22; G.add(jib2);
    G.add(strut(T, mMetal, CX - 0.6, CY, CZ + 3.90, CX - 3.2, CY, CZ + 5.85, 0.15, 6));
    var hookw = cylZ(T, mDark, 0.035, 0.035, 2.0, 4);
    hookw.position.set(CX - 6.95, CY, CZ + 4.00); G.add(hookw);
    var hook = boxM(T, mMetal, 0.26, 0.26, 0.45);
    hook.position.set(CX - 6.95, CY, CZ + 2.85); G.add(hook);

    /* liferaft canisters in their racks on the 01 deck edge */
    for (s = -1; s <= 1; s += 2) {
      var lr = cylY(T, mWhite, 0.45, 0.45, 1.25, 8);
      lr.position.set(0.2, s * 3.95, Z_01 + 0.58); G.add(lr);
      var lrc = boxM(T, mMetal, 1.0, 1.3, 0.16);
      lrc.position.set(0.2, s * 3.95, Z_01 + 0.20); G.add(lrc);
    }
    /* mushroom vents on the 01 deck, aft of the funnel */
    for (s = -1; s <= 1; s += 2) {
      var vt = cylZ(T, mSup, 0.34, 0.28, 0.80, 6);
      vt.position.set(-4.9, s * 2.3, Z_01 + 0.52); G.add(vt);
      var vc = cylZ(T, mDark, 0.44, 0.44, 0.14, 6);
      vc.position.set(-4.9, s * 2.3, Z_01 + 0.97); G.add(vc);
    }

    /* ================================================== forecastle gun
       A bandstand mount, not a barbette: the tub is bolted to the
       forecastle and the whole gun sits proud of it. Named "turret", and
       built pointing +X about its own Z axis, which is what render3d.js
       trains. */
    var GX = 20.40, GDZ = deckZ(GX);
    var tub = cylZ(T, mSup, 1.58, 1.66, 0.95, 12, true);
    tub.position.set(GX, 0, GDZ + 0.42); G.add(tub);
    var tubr = cylZ(T, mMetal, 1.72, 1.72, 0.10, 10);
    tubr.position.set(GX, 0, GDZ + 0.90); G.add(tubr);

    var turret = new T.Group();
    turret.name = "turret";
    turret.position.set(GX, 0, GDZ + 0.55);
    G.add(turret);
    var gped = cylZ(T, mSup, 0.44, 0.62, 0.80, 8);
    gped.position.set(0, 0, 0.40); turret.add(gped);
    var ghouse = new T.Mesh(tbox(T, 1.40, 1.60, 1.00, 0.80), mSup);
    ghouse.position.set(-0.12, 0, 1.30); turret.add(ghouse);
    var gshield = boxM(T, mSup, 0.24, 1.42, 1.05);
    gshield.position.set(0.68, 0, 1.32); gshield.rotation.y = 0.34; turret.add(gshield);
    var cradle = boxM(T, mDark, 0.85, 0.40, 0.34);
    cradle.position.set(0.85, 0, 1.44); turret.add(cradle);
    var barrel = cylX(T, mDark, 0.105, 0.130, 2.85, 8);
    barrel.position.set(2.50, 0, 1.48); turret.add(barrel);
    var mzl = cylX(T, mDark, 0.175, 0.175, 0.42, 8);
    mzl.position.set(4.05, 0, 1.48); turret.add(mzl);
    for (s = -1; s <= 1; s += 2) {
      var amm = boxM(T, mSup, 0.62, 0.34, 0.52);
      amm.position.set(0.12, s * 0.86, 1.18); turret.add(amm);
    }
    var sight = boxM(T, mDark, 0.38, 0.34, 0.32);
    sight.position.set(0.24, 0.64, 1.98); turret.add(sight);

    /* ------------------------------------------------ forecastle gear */
    for (s = -1; s <= 1; s += 2) {
      var bw = boxM(T, mSup, 2.4, 0.22, 0.85);
      bw.position.set(17.9 + 0.0, s * 1.55, deckZ(17.9) + 0.42);
      bw.rotation.z = s * -0.62; G.add(bw);
    }
    var wind = boxM(T, mSup, 1.5, 2.0, 0.75);
    wind.position.set(23.9, 0, deckZ(23.9) + 0.38); G.add(wind);
    for (s = -1; s <= 1; s += 2) {
      var gyp = cylY(T, mDark, 0.42, 0.42, 0.42, 8);
      gyp.position.set(23.9, s * 1.20, deckZ(23.9) + 0.60); G.add(gyp);
    }
    var anch = boxM(T, mDark, 1.10, 0.22, 0.80);
    anch.position.set(25.35, 1.55, deckZ(25.35) - 1.05); G.add(anch);
    /* bollards and fairleads down both sides */
    var bolX = [22.4, 12.0, -3.0, -14.0, -24.2];
    for (i = 0; i < bolX.length; i++) for (s = -1; s <= 1; s += 2) {
      var bx2 = bolX[i];
      var bol = cylZ(T, mMetal, 0.15, 0.18, 0.62, 6);
      bol.position.set(bx2, s * (halfB(bx2) - 0.42), deckZ(bx2) + 0.30); G.add(bol);
    }

    /* --------------------------------------------------------- railings
       Guardrails everywhere they would really be. A hull this tall-sided
       with a bare deck reads as a barge without them.                    */
    for (s = -1; s <= 1; s += 2) {
      /* forecastle, from just abaft the stem down to the bridge front */
      railRun(T, G, mMetal, [
        [26.30, s * 1.05, deckZ(26.30) + 0.05],
        [24.00, s * 2.10, deckZ(24.00) + 0.05],
        [20.00, s * 3.35, deckZ(20.00) + 0.05],
        [15.80, s * 4.05, deckZ(15.80) + 0.05]], 1.05, 3.4);
      /* 01 deck edge, which doubles as the bridge wing rail */
      railRun(T, G, mMetal, [
        [15.35, s * 4.10, Z_01 + 0.14],
        [DH_A + 0.2, s * 4.10, Z_01 + 0.14]], 1.00, 3.6);
      /* bridge roof */
      railRun(T, G, mMetal, [
        [BR_F - 0.4, s * 3.32, Z_BR + 0.14],
        [BR_A + 0.4, s * 3.32, Z_BR + 0.14]], 0.95, 4.0);
      /* the working deck, all the way aft to the gantry feet */
      railRun(T, G, mMetal, [
        [-6.90, s * (halfB(-6.90) - 0.22), deckZ(-6.90) + 0.05],
        [-15.00, s * (halfB(-15.00) - 0.22), deckZ(-15.00) + 0.05],
        [-22.00, s * (halfB(-22.00) - 0.22), deckZ(-22.00) + 0.05],
        [-25.60, s * (halfB(-25.60) - 0.26), deckZ(-25.60) + 0.05]], 1.05, 3.4);
      /* transom rail, stopped short of the ramp notch on both sides */
      railRun(T, G, mMetal, [
        [-26.90, s * 3.85, deckZ(-26.90) + 0.05],
        [-26.90, s * 1.70, deckZ(-26.90) + 0.05]], 1.00, 2.2);
    }

    /* pennant number, one decal a side, the starboard canvas mirrored */
    var PNX = 19.90, PNZ = 3.62;
    var pnSlope = (halfB(PNX + 1.5) - halfB(PNX - 1.5)) / 3.0;
    for (s = -1; s <= 1; s += 2) {
      var pn = boxM(T, mPen[s > 0 ? 0 : 1], 3.05, 0.05, 1.22);
      pn.position.set(PNX, s * (hullY(PNX, PNZ) + 0.05), PNZ);
      pn.rotation.z = Math.atan(s * pnSlope); G.add(pn);
    }

    /* jackstaff and ensign staff: cheap, and they set the eye's scale */
    var jst = cylZ(T, mMetal, 0.05, 0.08, 2.4, 5);
    jst.position.set(26.95, 0, deckZ(26.95) + 1.20); G.add(jst);
    var est = cylZ(T, mMetal, 0.05, 0.08, 2.8, 5);
    est.position.set(-27.10, 0, deckZ(-27.10) + 1.40); G.add(est);

    G.userData.len = LOA;
    return G;
  }

  return { build: build, len: LOA };
})();

UNIT_MODELS["minesweeper"] = {
  len: 55,
  build: function (THREE, M, C) { return MineSweeper3D.build(THREE, M, C); }
};
