/* ====== hero/us_pegasus_phm.js - USS Pegasus (PHM-1) and the Pegasus-class
   patrol hydrofoil missile craft, US Navy, 1977-1993 ======================
   HERO model for nato_e80_missileboat ("Pegasus PHM"). The US Navy never
   operated another missile boat and has fielded none since 1993, so this is
   the only key: there is no later US type to give a model to.

   Model space follows models3d.js: +X bow, +Y port, +Z up, real metres, the
   WATERLINE AT z = 0 with the hull as it floats hullborne (foils retracted
   draught 1.9 m). The fully submerged canard foils are drawn DOWN, as when
   foilborne: one strut and foil forward, two struts joined by one wide foil
   aft. They hang 7 m below the waterline (the published draught with the
   foils extended is 23.2 ft, 7.07 m) and they stay inside the hull's 40.5 m,
   so the foils do not change the length render3d.js scales the boat by.

   Published figures: 40.5 m (133 ft) over the hull, foils retracted; beam
   8.6 m (28.2 ft), the HULL's (the game's warship_specs.js has it so too):
   the deck edge is 8.6 m across at its widest, and the aft foil is drawn the
   same 8.6 m tip to tip, so the model's overall width stays the published
   beam; 1 x OTO Melara 76 mm/62 Mk 75 forward; 8 Harpoon in two
   quadruple canister launchers aft; PHM-1 has the Mk 94 fire control, PHM 2-6
   the Mk 92, both under one egg radome behind the bridge. Pennant number 1.

   Read off four US Navy photographs on Wikimedia Commons (public domain):
   "USS Pegasus (PHM-1) on land c1975" (the hull and the aft foil gear),
   the NHHC starboard view of Pegasus foilborne (profile, 32 px/m once the
   40.5 m deck length is fixed; every house and mast height below comes off
   it), the aerial port quarter view of Taurus (PHM-3) (the launcher layout
   and the stack) and the starboard bow view of Hercules (PHM-2) hullborne
   with the foils out (the foredeck, bridge width and the foil layout).
   What those four settled:
     - the Harpoon canisters sit aft in two groups of four (2 x 2), raised
       35 degrees, muzzles pointing FORWARD and up (the open ends are the
       upper, forward ends of the tubes in the Taurus and the starboard
       profile photographs), on open frames at the stern;
     - the bridge is two decks high just behind the 76 mm, the egg radome
       stands on an open tripod behind it, the tall mast with a forward
       raked A-frame stands behind that, then the squared stack, then the
       launchers: the superstructure is a stepped box, not a streamlined shape;
     - the Mk 75 turret is a big faceted drum with a rear bustle; its barrel
       is 4.7 m, longer than the turret itself;
     - the hull is smooth, flat sided and low (about 1.6 m of freeboard
       hullborne) with a hard chine and a sharply raked stem, light haze grey
       with a dark boot topping.
   Measured, hull coordinates (midships 0, stem +20.25):
     deck z 1.55 aft, 1.60 amidships, 2.00 at the stem
     bridge x +2.7 .. +7.4, roof z 6.8      radome centre x -0.3, z 9.9
     house widths: long house 5.9 m, bridge house 6.1 m, upper bridge 5.3 m
     mast x -4.5, truck z 17.2               stack x -12.3 .. -10.5, top z 5.8
     Mk 75 axis x +10.95                    launcher rear ends x -18.5, y +/-1.45
     forward strut x +14.6                   aft struts x -14.6, y +/-3.3

   Every static part is merged into ONE mesh per material (nine of them) and
   the gun is the one separate group, so the renderer can train it: eleven
   draws. Materials are the house three tiers: SKIN (painted hull, deck and
   superstructure canvases), METAL, GLASS, and the team material, which is
   exactly C.team. ASCII only: a stray byte in a hex literal has broken this
   project before.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPegasusPhm = (function () {
  "use strict";

  var PI = Math.PI;

  /* ---------------------------------------------------- principal dimensions */
  var LOA = 40.5;
  var XS = -20.25, XB = 20.25;      /* transom, stem head                      */
  var CAMBER = 0.14;                /* deck crown over the edge, metres        */
  var Z_TT = 3.0, Z_TB = -2.3;      /* the hull canvas spans these z           */

  /* The hull as station tables, x from midships. Half breadth at the deck
     edge, deck z, keel z, half breadth and z of the hard chine. The keel
     runs flat to x = +15.4 and then climbs the raked stem to the deck; the
     chine climbs with it, so the forward third is a deep V.                 */
  var HB = [[-20.25, 3.40], [-18, 3.52], [-14, 3.60], [-8, 3.62], [-2, 3.62], [3, 3.55], [7, 3.38],
            [10, 3.05], [12.5, 2.60], [14.5, 2.12], [16, 1.62], [17.5, 1.10], [18.8, 0.62], [19.7, 0.28], [20.25, 0.06]];
  var ZD = [[-20.25, 1.55], [-14, 1.56], [-8, 1.58], [-2, 1.60], [3, 1.64], [7, 1.70], [12.5, 1.82],
            [16, 1.90], [20.25, 2.00]];
  var ZK = [[-20.25, -1.55], [-18, -1.72], [-14, -1.86], [-8, -1.92], [3, -1.92], [10, -1.88], [14.5, -1.85],
            [15.4, -1.80], [16.0, -1.45], [17.5, -0.30], [18.8, 0.78], [19.7, 1.50], [20.25, 1.98]];
  var HC = [[-20.25, 3.20], [-18, 3.35], [-14, 3.40], [-8, 3.38], [-2, 3.30], [3, 3.15], [7, 2.90], [10, 2.55],
            [12.5, 2.15], [14.5, 1.70], [16, 1.25], [17.5, 0.80], [18.8, 0.45], [19.7, 0.18], [20.25, 0.04]];
  var ZC = [[-20.25, -1.45], [-14, -1.45], [-8, -1.35], [-2, -1.25], [3, -1.10], [7, -0.85], [10, -0.55],
            [12.5, -0.20], [14.5, 0.10], [16, 0.45], [17.5, 0.85], [18.8, 1.35], [19.7, 1.75], [20.25, 1.98]];
  /* The tables above were drawn at 7.24 m over the deck; the published beam
     is 8.6 m, so every half breadth is scaled to it (the stations, decks and
     keel line are untouched).                                               */
  var BK = 4.30 / 3.62;
  HB = HB.map(function (r) { return [r[0], r[1] * BK]; });
  HC = HC.map(function (r) { return [r[0], r[1] * BK]; });
  var STN = [-20.25, -19.3, -18.2, -16.8, -15.2, -13.5, -11.5, -9.5, -7.5, -5.5, -3.5, -1.5, 0.5, 2.5, 4.5, 6.5,
             8.5, 10.0, 11.5, 12.8, 14.0, 15.0, 15.7, 16.3, 17.0, 17.6, 18.2, 18.7, 19.2, 19.6, 19.9, 20.1, 20.25];

  /* PAINT.haze off warship3d.js, literally: this is the US fleet grey */
  var C_HULL = 0x737b83, C_SUP = 0x808991, C_DECK = 0x484e54;
  var C_BOOT = 0x262b30, C_FOUL = 0x3b1f1a, C_MARK = 0xe8eaec;

  var GX = 10.95;                   /* the Mk 75 ring centre                   */

  /* ---------------------------------------------------------------- helpers */
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
  function finish(THREE, cv, clampEdge) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = clampEdge ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  }
  /* deck height at (x, y): the edge line plus the crown */
  function deckAt(x, y) {
    var hb = tbl(HB, x);
    var f = hb > 0.01 ? Math.min(1, Math.abs(y) / hb) : 1;
    return tbl(ZD, x) + CAMBER * (1 - f * f);
  }

  /* ---------------------------------------------------------------- batching
     Every static part lands in one Batch per material and goes out as one
     mesh. A Batch built with a tile size re-projects its UVs from each
     triangle's own position (box projection, metres / tile), so the plate
     texture keeps one size on every block, strut and hood.                  */
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
  Batch.prototype.mesh = function (THREE, mtl) {
    if (!this.p.length) return null;
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(this.u, 2));
    return new THREE.Mesh(g, mtl);
  };

  /* geometry placed in model space: rotate (XYZ Euler), then translate     */
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
  /* vertical cylinder (axis +Z) standing on z0                              */
  function cylZ(THREE, rt, rb, h, seg, x, y, z0, open) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, !!open);
    g.rotateX(PI / 2);
    return place(THREE, g, x, y, z0 + h * 0.5);
  }
  /* a round bar between two points: struts, masts, canisters, barrels. r is
     the radius at A, r2 the radius at B.                                    */
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
  /* an ellipsoid with true normals (poles on Z)                             */
  function ellipsoid(THREE, rx, ry, rz, ws, hs, x, y, z) {
    var g = new THREE.SphereGeometry(1, ws, hs);
    g.rotateX(PI / 2);
    g.scale(rx, ry, rz);
    var P = g.getAttribute("position"), N = g.getAttribute("normal"), i, nx, ny, nz, l;
    for (i = 0; i < P.count; i++) {
      nx = P.getX(i) / (rx * rx); ny = P.getY(i) / (ry * ry); nz = P.getZ(i) / (rz * rz);
      l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      N.setXYZ(i, nx / l, ny / l, nz / l);
    }
    return place(THREE, g, x, y, z);
  }

  /* The outline, counter-clockwise seen from above                          */
  function ccw(pts) {
    var a = 0, i, n = pts.length;
    for (i = 0; i < n; i++) {
      var p = pts[i], q = pts[(i + 1) % n];
      a += p[0] * q[1] - q[0] * p[1];
    }
    return a < 0 ? pts.slice().reverse() : pts;
  }
  /* A solid lofted through a stack of plan outlines, each [pts, z], listed
     from the LOW z to the HIGH z, every outline with the same number of
     corners in the same order. capTop / capBot close the ends with a fan.   */
  function stack(THREE, rings, capTop, capBot) {
    var pos = [], i, k, n = rings[0][0].length;
    var R = rings.map(function (r) { return { p: ccw(r[0]), z: r[1] }; });
    function P(ri, kk) { var q = R[ri].p[kk % n]; return [q[0], q[1], R[ri].z]; }
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
  /* a rectangle in plan with its corners cut off (8 corners)                */
  function chamRect(x0, x1, hw, ch) {
    return [[x0 + ch, -hw], [x1 - ch, -hw], [x1, -hw + ch], [x1, hw - ch],
            [x1 - ch, hw], [x0 + ch, hw], [x0, hw - ch], [x0, -hw + ch]];
  }
  /* a rounded rectangle, n + 1 points a corner (the gun turret rings)       */
  function rrect(x0, x1, hw, r, n) {
    var pts = [], k, c, a;
    var cs = [[x1 - r, -hw + r, -PI / 2], [x1 - r, hw - r, 0], [x0 + r, hw - r, PI / 2], [x0 + r, -hw + r, PI]];
    for (c = 0; c < 4; c++) {
      for (k = 0; k <= n; k++) {
        a = cs[c][2] + (PI / 2) * k / n;
        pts.push([cs[c][0] + r * Math.cos(a), cs[c][1] + r * Math.sin(a)]);
      }
    }
    return pts;
  }
  /* a strut section: chord c, thickness t, nine corners, leading edge +X    */
  function lens(cx, cy, c, t) {
    return [[cx + 0.50 * c, cy], [cx + 0.42 * c, cy + 0.35 * t], [cx + 0.20 * c, cy + 0.50 * t],
            [cx - 0.15 * c, cy + 0.45 * t], [cx - 0.50 * c, cy + 0.05 * t], [cx - 0.50 * c, cy - 0.05 * t],
            [cx - 0.15 * c, cy - 0.45 * t], [cx + 0.20 * c, cy - 0.50 * t], [cx + 0.42 * c, cy - 0.35 * t]];
  }
  /* a foil's planform: span along Y, root chord cr, tip chord ct            */
  function wingPlan(cx, span, cr, ct) {
    var s = span / 2;
    return [[cx + ct / 2, -s], [cx + cr / 2, -s * 0.12], [cx + cr / 2, s * 0.12], [cx + ct / 2, s],
            [cx - ct / 2, s], [cx - cr / 2, s * 0.12], [cx - cr / 2, -s * 0.12], [cx - ct / 2, -s]];
  }

  /* An indexed grid of points P[i][j] with smooth normals along both
     directions. hint is the way the faces must look, so the caller does not
     have to get the winding right.                                          */
  function gridGeo(THREE, P, hint) {
    var ni = P.length, nj = P[0].length, pos = [], idx = [], i, j, t, sum = 0;
    for (i = 0; i < ni; i++) for (j = 0; j < nj; j++) pos.push(P[i][j][0], P[i][j][1], P[i][j][2]);
    for (i = 0; i < ni - 1; i++) for (j = 0; j < nj - 1; j++) {
      var a = i * nj + j, b = a + 1, c = a + nj, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    for (t = 0; t < idx.length; t += 3) {
      var a0 = idx[t] * 3, b0 = idx[t + 1] * 3, c0 = idx[t + 2] * 3;
      var ux = pos[b0] - pos[a0], uy = pos[b0 + 1] - pos[a0 + 1], uz = pos[b0 + 2] - pos[a0 + 2];
      var vx = pos[c0] - pos[a0], vy = pos[c0 + 1] - pos[a0 + 1], vz = pos[c0 + 2] - pos[a0 + 2];
      sum += (uy * vz - uz * vy) * hint[0] + (uz * vx - ux * vz) * hint[1] + (ux * vy - uy * vx) * hint[2];
    }
    if (sum < 0) for (t = 0; t < idx.length; t += 3) { var tmp = idx[t + 1]; idx[t + 1] = idx[t + 2]; idx[t + 2] = tmp; }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function setUV(THREE, g, f) {
    var p = g.getAttribute("position"), uv = [], i, r;
    for (i = 0; i < p.count; i++) { r = f(p.getX(i), p.getY(i), p.getZ(i)); uv.push(r[0], r[1]); }
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    return g;
  }

  /* ============================================================= textures
     Three painted canvases, cached at module scope (none depends on the
     team): the hull side elevation, the deck, and a plate tile for the
     superstructure. The hull canvas is a true side elevation - u from x, v
     from world z - so the boot topping and the waterline stay level on a
     hull whose chine climbs toward the bow.                                 */
  var TEX = {};

  function hullTex(THREE) {
    if (TEX.hull) return TEX.hull;
    var W = 1024, H = 256, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(80177), i, x, y, zs;
    var pxm = H / (Z_TT - Z_TB), mw = W / LOA;
    function yOf(z) { return (Z_TT - z) * pxm; }
    function uOf(xx) { return (xx - XS) / LOA * W; }
    var zBoot = 0.38, zFoul = -0.28;

    g.fillStyle = hx(C_HULL); g.fillRect(0, 0, W, H);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.03 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      y = yOf(2.1) + R() * (yOf(zBoot) - yOf(2.1));
      g.fillRect(R() * W, y, 30 + R() * 160, 6 + R() * 22);
    }
    g.globalAlpha = 1;

    /* welded plating: a seam every 0.7 m of height, a butt every 1.8 m */
    for (zs = 1.85; zs > zBoot; zs -= 0.7) {
      y = yOf(zs);
      g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.4;
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.10)"; g.lineWidth = 1;
      g.beginPath(); g.moveTo(0, y - 1.6); g.lineTo(W, y - 1.6); g.stroke();
    }
    g.strokeStyle = "rgba(0,0,0,0.12)"; g.lineWidth = 1;
    for (x = XS + 1.8; x < XB; x += 1.8) {
      g.beginPath(); g.moveTo(uOf(x), yOf(2.1)); g.lineTo(uOf(x), yOf(zBoot)); g.stroke();
    }

    /* boot topping at the waterline, anti-fouling below it */
    g.fillStyle = hx(C_BOOT); g.fillRect(0, yOf(zBoot), W, yOf(zFoul) - yOf(zBoot));
    g.fillStyle = hx(C_FOUL); g.fillRect(0, yOf(zFoul), W, H - yOf(zFoul));
    g.strokeStyle = "rgba(255,255,255,0.12)"; g.lineWidth = 1.2;
    g.beginPath(); g.moveTo(0, yOf(zBoot)); g.lineTo(W, yOf(zBoot)); g.stroke();

    /* the sheer: a dark rubbing strake tracked along the real deck line */
    g.lineWidth = 3; g.strokeStyle = "rgba(0,0,0,0.38)";
    g.beginPath();
    for (x = XS; x <= XB + 0.01; x += 0.5) {
      var px = uOf(x), py = yOf(tbl(ZD, x) - 0.10);
      if (x === XS) g.moveTo(px, py); else g.lineTo(px, py);
    }
    g.stroke();

    /* hull number 1, white, on the bow (the canvas serves both sides) */
    var nx = uOf(15.0), top = yOf(1.62), bot = yOf(0.58);
    g.fillStyle = hx(C_MARK);
    g.fillRect(nx, top, 0.30 * mw, bot - top);
    g.beginPath();
    g.moveTo(nx, top); g.lineTo(nx - 0.50 * mw, top + 0.36 * pxm);
    g.lineTo(nx - 0.50 * mw, top + 0.62 * pxm); g.lineTo(nx, top + 0.30 * pxm);
    g.closePath(); g.fill();
    g.fillRect(nx - 0.42 * mw, bot - 0.14 * pxm, 1.14 * mw, 0.14 * pxm);

    return (TEX.hull = finish(THREE, cv, true));
  }

  function deckTex(THREE) {
    if (TEX.deck) return TEX.deck;
    var W = 256, H = 256, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(31337), i;
    g.fillStyle = hx(C_DECK); g.fillRect(0, 0, W, H);
    for (i = 0; i < 700; i++) {
      g.globalAlpha = 0.05 + R() * 0.10;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 1 + R() * 4, 1 + R() * 3);
    }
    g.globalAlpha = 0.10; g.strokeStyle = "#000000"; g.lineWidth = 1;
    for (i = 0; i < 8; i++) { g.beginPath(); g.moveTo(0, i * 32 + 0.5); g.lineTo(W, i * 32 + 0.5); g.stroke(); }
    g.globalAlpha = 1;
    return (TEX.deck = finish(THREE, cv));
  }

  function supTex(THREE) {
    if (TEX.sup) return TEX.sup;
    var W = 256, H = 256, cv = mkCv(W, H), g = cv.getContext("2d");
    var R = rngOf(4421), i;
    g.fillStyle = hx(C_SUP); g.fillRect(0, 0, W, H);
    for (i = 0; i < 40; i++) {
      g.globalAlpha = 0.03 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 16 + R() * 80, 8 + R() * 30);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.3;
    for (i = 0; i < 4; i++) { g.beginPath(); g.moveTo(0, i * 64 + 0.5); g.lineTo(W, i * 64 + 0.5); g.stroke(); }
    for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * 96 + 20, 0); g.lineTo(i * 96 + 20, H); g.stroke(); }
    g.strokeStyle = "rgba(255,255,255,0.10)";
    for (i = 0; i < 4; i++) { g.beginPath(); g.moveTo(0, i * 64 + 2); g.lineTo(W, i * 64 + 2); g.stroke(); }
    return (TEX.sup = finish(THREE, cv));
  }

  /* ================================================================ hull */
  function hullGeos(THREE) {
    var DES = [], CHS = [], KL = [], CHP = [], DEP = [], i, x, out = [];
    for (i = 0; i < STN.length; i++) {
      x = STN[i];
      var hb = tbl(HB, x), zd = tbl(ZD, x), zk = tbl(ZK, x), hc = tbl(HC, x), zc = tbl(ZC, x);
      DES.push([x, -hb, zd]); CHS.push([x, -hc, zc]); KL.push([x, 0, zk]);
      CHP.push([x, hc, zc]); DEP.push([x, hb, zd]);
    }
    function rows(a, b) { return a.map(function (p, j) { return [p, b[j]]; }); }
    function hullUV(xx, yy, zz) {
      return [clamp((xx - XS) / LOA, 0, 1), clamp((zz - Z_TB) / (Z_TT - Z_TB), 0, 1)];
    }
    var G = [gridGeo(THREE, rows(DES, CHS), [0, -1, 0]),      /* starboard side   */
             gridGeo(THREE, rows(CHS, KL), [0, -0.4, -1]),    /* starboard bottom */
             gridGeo(THREE, rows(KL, CHP), [0, 0.4, -1]),     /* port bottom      */
             gridGeo(THREE, rows(CHP, DEP), [0, 1, 0])];      /* port side        */
    G.forEach(function (g) { out.push(setUV(THREE, g, hullUV)); });

    /* the flat transom: a fan from its middle, facing aft */
    var ring = [DES[0], CHS[0], KL[0], CHP[0], DEP[0], [XS, 0, tbl(ZD, XS) + CAMBER]];
    var cen = [XS, 0, (tbl(ZD, XS) + tbl(ZK, XS)) * 0.5], pos = [], k;
    for (k = 0; k < ring.length; k++) {
      var a = ring[k], b = ring[(k + 1) % ring.length];
      var ux = a[0] - cen[0], uy = a[1] - cen[1], uz = a[2] - cen[2];
      var vx = b[0] - cen[0], vy = b[1] - cen[1], vz = b[2] - cen[2];
      var nxx = uy * vz - uz * vy;
      if (nxx > 0) pos.push(cen[0], cen[1], cen[2], b[0], b[1], b[2], a[0], a[1], a[2]);
      else pos.push(cen[0], cen[1], cen[2], a[0], a[1], a[2], b[0], b[1], b[2]);
    }
    var tg = new THREE.BufferGeometry();
    tg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    tg.computeVertexNormals();
    out.push(setUV(THREE, tg, function (xx, yy, zz) { return [0.003, clamp((zz - Z_TB) / (Z_TT - Z_TB), 0, 1)]; }));
    return out;
  }

  /* the main deck: a cambered ribbon lying exactly on the hull's top edge */
  function deckGeo(THREE) {
    var F = [-1, -0.67, -0.34, 0, 0.34, 0.67, 1], P = [], i, j, x, hb, zd, row;
    for (i = 0; i < STN.length; i++) {
      x = STN[i]; hb = tbl(HB, x); zd = tbl(ZD, x); row = [];
      for (j = 0; j < F.length; j++) row.push([x, F[j] * hb, zd + CAMBER * (1 - F[j] * F[j])]);
      P.push(row);
    }
    return setUV(THREE, gridGeo(THREE, P, [0, 0, 1]), function (xx, yy) { return [xx / 8, yy / 8]; });
  }

  /* ============================================================== the gun
     The Mk 75 (OTO Melara Compact): a big faceted drum with a rear bustle
     and a 4.7 m barrel. Authored about its own ring centre with the barrel
     along +X, as the renderer trains it. Two materials, so two draws.       */
  function gunGroup(THREE, T) {
    var tur = new THREE.Group();
    tur.name = "turret";
    var S = new Batch(8), Mt = new Batch(0);
    S.add(cylZ(THREE, 1.50, 1.55, 0.40, 20, 0, 0, 0));
    S.add(stack(THREE, [[rrect(-1.65, 1.55, 1.30, 0.55, 2), 0.40],
                        [rrect(-1.70, 1.60, 1.30, 0.55, 2), 1.30],
                        [rrect(-1.45, 1.45, 1.15, 0.55, 2), 2.00],
                        [rrect(-0.90, 0.95, 0.80, 0.50, 2), 2.45],
                        [rrect(-0.55, 0.65, 0.50, 0.30, 2), 2.62]], true, false));
    S.add(box(THREE, 0.55, 0.95, 0.75, 1.62, 0, 1.35));
    S.add(box(THREE, 0.50, 0.40, 0.30, -0.4, 0.55, 2.62));       /* sight and hatch on the roof */
    Mt.add(strut(THREE, 1.80, 0, 1.35, 2.50, 0, 1.35, 0.20, 12));
    Mt.add(strut(THREE, 2.50, 0, 1.35, 6.00, 0, 1.35, 0.105, 10, 0.09));
    Mt.add(strut(THREE, 6.00, 0, 1.35, 6.40, 0, 1.35, 0.125, 10));
    var ms = S.mesh(THREE, T.S); if (ms) tur.add(ms);
    var mm = Mt.mesh(THREE, T.M); if (mm) tur.add(mm);
    return tur;
  }

  /* ================================================================ build */
  function build(THREE, M, C) {
    var root = new THREE.Group();
    var team = C && C.team !== undefined ? C.team : "#d6503f";
    var i, k, j, x;

    /* ---------------------------------------------------- the materials */
    var T = {};
    T.H = new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.86, metalness: 0.08 });
    T.D = new THREE.MeshStandardMaterial({ color: 0xffffff, map: deckTex(THREE), roughness: 0.94, metalness: 0.04 });
    T.S = new THREE.MeshStandardMaterial({ color: 0xffffff, map: supTex(THREE), roughness: 0.87, metalness: 0.07 });
    T.M = new THREE.MeshStandardMaterial({ color: 0x6a727a, roughness: 0.55, metalness: 0.40 });
    T.K = new THREE.MeshStandardMaterial({ color: 0x24282c, roughness: 0.80, metalness: 0.10 });
    T.W = new THREE.MeshStandardMaterial({ color: 0xcdd2d4, roughness: 0.62, metalness: 0.04 });
    T.F = new THREE.MeshStandardMaterial({ color: 0x3d4449, roughness: 0.50, metalness: 0.55 });
    /* glass lies a few cm off the wall, pulled toward the camera so it never
       flickers against the plating at full zoom-out                         */
    T.G = new THREE.MeshStandardMaterial({ color: 0x0f1a22, roughness: 0.10, metalness: 0.0, transparent: true, opacity: 0.88,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    /* the team material, exactly C.team, pulled a couple of depth steps toward
       the camera because its flashes lie flat on a roof                      */
    T.T = new THREE.MeshStandardMaterial({ color: new THREE.Color(team), roughness: 0.60, metalness: 0.10,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    var B = {};
    Object.keys(T).forEach(function (kk) { B[kk] = new Batch(kk === "S" ? 8 : 0); });

    /* ------------------------------------------------------------- hull */
    hullGeos(THREE).forEach(function (g) { B.H.add(g); });
    B.D.add(deckGeo(THREE));

    /* the two waterjet nozzles in the transom, sunk flush */
    [1, -1].forEach(function (sd) {
      B.K.add(strut(THREE, XS - 0.02, sd * 1.35, -0.75, XS + 0.06, sd * 1.35, -0.75, 0.42, 12));
    });

    /* ------------------------------------------------------ superstructure
       A stepped box: the long low house (stack, mast and radome on it), then
       the two-deck bridge at its forward end with a raked front. Every wall
       stands on z = 1.5, just under the deck, so there is no seam.          */
    var DZ = 1.5, RZ = 4.25;
    var HWL = 2.95, HWB = 3.05, HWU = 2.65;   /* half widths: long house, bridge house, upper bridge */
    B.S.add(stack(THREE, [[chamRect(-10.8, 2.3, HWL, 0.55), DZ], [chamRect(-10.8, 2.3, HWL, 0.55), 3.9],
                          [chamRect(-10.9, 2.2, HWL - 0.12, 0.60), RZ]], true, false));
    B.S.add(stack(THREE, [[chamRect(2.0, 7.9, HWB, 0.70), DZ], [chamRect(2.0, 7.9, HWB, 0.70), 2.9],
                          [chamRect(2.0, 7.55, HWB - 0.10, 0.70), 4.3]], true, false));
    B.S.add(stack(THREE, [[chamRect(2.7, 7.4, HWU, 0.60), 4.2], [chamRect(2.7, 7.0, HWU, 0.60), 6.6]], true, false));
    B.S.add(box(THREE, 4.8, 2 * HWU + 0.4, 0.22, 4.85, 0, 6.72));              /* bridge roof slab */
    B.S.add(box(THREE, 0.9, 0.9, 0.6, 3.4, -1.3, 7.13));                       /* roof sensor boxes */
    B.S.add(box(THREE, 1.0, 1.0, 0.4, 6.3, 1.2, 7.03));
    /* the squared stack with its dark exhaust plate */
    B.S.add(stack(THREE, [[chamRect(-12.3, -10.5, 1.20, 0.25), DZ], [chamRect(-12.3, -10.5, 1.20, 0.25), 5.5],
                          [chamRect(-12.2, -10.6, 1.10, 0.25), 5.85]], true, false));
    B.K.add(box(THREE, 1.30, 1.90, 0.08, -11.4, 0, 5.89));
    /* roof boxes on the long house */
    B.S.add(box(THREE, 1.4, 1.1, 0.6, -8.3, 1.0, RZ + 0.3));
    B.S.add(box(THREE, 0.9, 0.9, 0.5, -7.6, -1.3, RZ + 0.25));
    B.S.add(box(THREE, 1.2, 0.9, 0.5, -2.3, -1.4, RZ + 0.25));
    /* the louvred panel seen on the starboard side of the long house */
    B.K.add(box(THREE, 1.4, 0.06, 1.7, -7.3, -(HWL + 0.03), 2.65));

    /* bridge windows: the raked front (leaning back 9.5 degrees), the sides */
    for (i = 0; i < 4; i++) {
      var wy = (i < 2 ? -1 : 1) * (i % 2 === 0 ? 1.6 : 0.6);
      B.G.add(box(THREE, 0.05, 0.78, 0.90, 7.17, wy, 5.40, 0, -0.166, 0));
    }
    [1, -1].forEach(function (sd) {
      for (j = 0; j < 3; j++) B.G.add(box(THREE, 0.85, 0.05, 0.90, 3.9 + j * 1.0, sd * (HWU + 0.02), 5.40));
      for (j = 0; j < 2; j++) B.G.add(box(THREE, 0.55, 0.05, 0.60, 3.0 + j * 1.2 + 0.2, sd * (HWB + 0.02), 3.35));
    });

    /* ----------------------------------------------- radome on its tripod
       The egg radome stands on an open lattice behind the bridge: three legs
       drawn in toward the top, with cross braces.                           */
    var DX = -0.3, DR0 = 1.25, DR1 = 0.8, DZ1 = 8.2;
    for (k = 0; k < 3; k++) {
      var a0 = PI / 2 + k * 2 * PI / 3, a1 = a0 + 2 * PI / 3;
      var b0x = DX + DR0 * Math.cos(a0), b0y = DR0 * Math.sin(a0), t0x = DX + DR1 * Math.cos(a0), t0y = DR1 * Math.sin(a0);
      var b1x = DX + DR0 * Math.cos(a1), b1y = DR0 * Math.sin(a1), t1x = DX + DR1 * Math.cos(a1), t1y = DR1 * Math.sin(a1);
      B.M.add(strut(THREE, b0x, b0y, RZ, t0x, t0y, DZ1, 0.075, 5));
      B.M.add(strut(THREE, b0x, b0y, RZ, t1x, t1y, DZ1, 0.04, 4, 0.04, true));
      B.M.add(strut(THREE, b1x, b1y, RZ, t0x, t0y, DZ1, 0.04, 4, 0.04, true));
      B.M.add(strut(THREE, b0x, b0y, RZ, b1x, b1y, RZ, 0.04, 4, 0.04, true));
      B.M.add(strut(THREE, lerp(b0x, t0x, 0.5), lerp(b0y, t0y, 0.5), lerp(RZ, DZ1, 0.5),
                    lerp(b1x, t1x, 0.5), lerp(b1y, t1y, 0.5), lerp(RZ, DZ1, 0.5), 0.04, 4, 0.04, true));
    }
    B.M.add(cylZ(THREE, 0.95, 0.95, 0.10, 14, DX, 0, DZ1 - 0.02));
    B.W.add(ellipsoid(THREE, 1.25, 1.25, 1.65, 28, 18, DX, 0, DZ1 + 0.08 + 1.65));

    /* ---------------------------------------------------------------- mast
       A tubular mast with an A-frame raking up to it from aft, a platform,
       the navigation radar bar, a yard and a truck.                         */
    var MX = -4.5, LZ = 10.3;
    B.M.add(strut(THREE, MX, 0, RZ, MX, 0, 12.4, 0.15, 8, 0.12));
    B.M.add(strut(THREE, MX, 0, 12.4, MX, 0, 16.7, 0.09, 6, 0.07));
    B.M.add(strut(THREE, MX, 0, 16.7, MX, 0, 17.25, 0.20, 8));
    [1, -1].forEach(function (sd) {
      B.M.add(strut(THREE, MX - 2.3, sd * 1.25, RZ, MX - 0.05, sd * 0.08, LZ, 0.07, 5));
    });
    var tb = (6.6 - RZ) / (LZ - RZ);
    B.M.add(strut(THREE, lerp(MX - 2.3, MX - 0.05, tb), -lerp(1.25, 0.08, tb), 6.6,
                  lerp(MX - 2.3, MX - 0.05, tb), lerp(1.25, 0.08, tb), 6.6, 0.045, 4, 0.045, true));
    B.M.add(box(THREE, 1.7, 1.5, 0.07, MX, 0, LZ));
    B.M.add(strut(THREE, MX, 0, 12.0, MX + 0.9, 0, 12.2, 0.06, 5));
    B.M.add(strut(THREE, MX + 0.9, 0, 12.2, MX + 0.9, 0, 12.55, 0.10, 8));
    B.M.add(box(THREE, 0.25, 1.5, 0.30, MX + 0.9, 0, 12.75));
    B.M.add(strut(THREE, MX, -1.4, 15.2, MX, 1.4, 15.2, 0.05, 5));
    B.M.add(strut(THREE, 1.9, -1.2, RZ, 1.9, -1.2, 16.5, 0.035, 4, 0.03, true));   /* whip aerial */

    /* ------------------------------------------------- Harpoon launchers
       Two quadruple groups of canisters (2 x 2), raised 35 degrees with the
       muzzles pointing forward and up: the low rear ends sit near the transom
       and the open ends rise toward the stack, as in the photographs.        */
    var U35 = 35 * PI / 180, ux = Math.cos(U35), uz = Math.sin(U35);
    var nx = -Math.sin(U35), nz = Math.cos(U35);
    [1, -1].forEach(function (sd) {
      var yc = sd * 1.45, x0 = -18.5, z0 = deckAt(x0, yc) + 1.05, a, b, o, oy, ax, ay, az;
      for (a = 0; a < 2; a++) for (b = 0; b < 2; b++) {
        o = (a - 0.5) * 0.60; oy = (b - 0.5) * 0.60;
        ax = x0 + nx * o; ay = yc + oy; az = z0 + nz * o;
        B.S.add(strut(THREE, ax, ay, az, ax + ux * 4.6, ay, az + uz * 4.6, 0.265, 16));
      }
      /* the tray under the canisters and the posts it stands on */
      B.K.add(box(THREE, 4.5, 1.50, 0.14, x0 + nx * (-0.69) + ux * 2.25, yc, z0 + nz * (-0.69) + uz * 2.25, 0, -U35, 0));
      [0.7, 3.3].forEach(function (s) {
        var px = x0 + ux * s + nx * (-0.69), pz = z0 + uz * s + nz * (-0.69);
        [-0.55, 0.55].forEach(function (q) {
          B.K.add(strut(THREE, px, yc + q, deckAt(px, yc + q), px, yc + q, pz, 0.075, 4));
        });
      });
    });

    /* ----------------------------------------------------------- lifelines
       Stanchions every 1.35 m along both sheer lines, two rails, closed
       across the bow and the stern.                                        */
    var RXS = [];
    for (x = 19.2; x > -20.0; x -= 1.35) RXS.push(x);
    var ends = [];
    [1, -1].forEach(function (sd) {
      var pts = RXS.map(function (xx) { var yy = sd * (tbl(HB, xx) - 0.13); return [xx, yy, deckAt(xx, yy)]; });
      pts.forEach(function (p) { B.M.add(strut(THREE, p[0], p[1], p[2], p[0], p[1], p[2] + 1.0, 0.035, 3, 0.035, true)); });
      for (j = 0; j < pts.length - 1; j++) {
        B.M.add(strut(THREE, pts[j][0], pts[j][1], pts[j][2] + 1.0, pts[j + 1][0], pts[j + 1][1], pts[j + 1][2] + 1.0, 0.025, 3, 0.025, true));
        B.M.add(strut(THREE, pts[j][0], pts[j][1], pts[j][2] + 0.5, pts[j + 1][0], pts[j + 1][1], pts[j + 1][2] + 0.5, 0.02, 3, 0.02, true));
      }
      ends.push(pts[0], pts[pts.length - 1]);
    });
    [[0, 2], [1, 3]].forEach(function (pr) {
      var p = ends[pr[0]], q = ends[pr[1]];
      B.M.add(strut(THREE, p[0], p[1], p[2] + 1.0, q[0], q[1], q[2] + 1.0, 0.025, 3, 0.025, true));
      B.M.add(strut(THREE, p[0], p[1], p[2] + 0.5, q[0], q[1], q[2] + 0.5, 0.02, 3, 0.02, true));
    });

    /* --------------------------------------------------------------- foils
       Drawn DOWN, as when foilborne. Forward: one strut on the centreline
       just behind the stem carrying a foil of 4.2 m span. Aft: two raked-free
       struts a little forward of the transom, each ending in a pod (the
       waterjet inlet), joined by one 8.6 m foil.                            */
    B.F.add(stack(THREE, [[lens(14.7, 0, 1.55, 0.28), -6.45], [lens(14.6, 0, 2.0, 0.34), -0.6]], true, true));
    B.F.add(frustum(THREE, wingPlan(14.7, 4.2, 1.5, 0.9), -6.7, -6.45, 0.8));
    [1, -1].forEach(function (sd) {
      B.F.add(stack(THREE, [[lens(-14.6, sd * 3.3, 2.1, 0.38), -6.3], [lens(-14.6, sd * 3.3, 2.9, 0.44), -1.1]], true, true));
      B.F.add(strut(THREE, -16.0, sd * 3.3, -6.55, -13.5, sd * 3.3, -6.55, 0.46, 10));
      B.F.add(strut(THREE, -13.5, sd * 3.3, -6.55, -12.6, sd * 3.3, -6.55, 0.46, 10, 0.12));
      B.F.add(strut(THREE, -16.0, sd * 3.3, -6.55, -16.8, sd * 3.3, -6.55, 0.46, 10, 0.18));
    });
    B.F.add(frustum(THREE, wingPlan(-14.6, 8.6, 1.7, 1.0), -6.45, -6.2, 0.8));
    /* the trailing-edge flaps that fly the boat */
    B.F.add(box(THREE, 0.45, 3.8, 0.09, 13.75, 0, -6.58));
    B.F.add(box(THREE, 0.50, 7.8, 0.09, -15.65, 0, -6.33));

    /* -------------------------------------------------------- team colour
       Flat on the roofs, where an RTS camera looks: the bridge roof, two
       bars across the long house, and a chevron on the forecastle.          */
    B.T.add(box(THREE, 3.6, 3.9, 0.05, 4.8, 0, 6.86));
    B.T.add(box(THREE, 0.55, 4.6, 0.05, -10.0, 0, RZ + 0.03));
    B.T.add(box(THREE, 0.55, 4.6, 0.05, 1.75, 0, RZ + 0.03));
    [1, -1].forEach(function (sd) {
      B.T.add(box(THREE, 1.5, 0.35, 0.05, 15.6, -sd * 0.55, deckAt(15.6, 0.55) + 0.04, 0, 0, sd * 0.66));
    });

    /* ------------------------------------------------------ out as meshes */
    Object.keys(B).forEach(function (kk) {
      var mm = B[kk].mesh(THREE, T[kk]);
      if (mm) root.add(mm);
    });

    /* the Mk 75 is the one trainable part: a direct child, ring on the deck */
    var tur = gunGroup(THREE, T);
    tur.position.set(GX, 0, deckAt(GX, 0));
    root.add(tur);

    root.userData.heroLen = LOA;
    return root;
  }

  return { build: build, len: LOA };
})();

/* Registration. nato_e80_missileboat is the def itself (rules.js, NATO e80,
   USS Pegasus PHM-1, service 1977). len is the measured X extent, transom to
   stem head: the foils, the launchers and the gun barrel all stay inside it. */
UNIT_MODELS["nato_e80_missileboat"] = {
  len: 40.5,
  build: function (THREE, M, C) { return HeroPegasusPhm.build(THREE, M, C); }
};
