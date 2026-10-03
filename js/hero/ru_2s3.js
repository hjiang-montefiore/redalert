/* ============ ru_2s3.js - HERO model: the 2S3 Akatsiya 152 mm self-propelled howitzer
   Key: pact_e60_spg  "2S3 Akatsiya 152mm Self-Propelled Howitzer" (service 1971).

   References (Wikimedia Commons): "2S3 Akatsiya 3260.jpg" (front three-quarter
   of a Soviet-green 2S3, port side) and "2S3 Akatsiya 2.jpg" (a clean port
   side view of a sand-painted example, used for every side-profile station).
   What each feature rests on:
     - six single-tyred road wheels a side, unevenly spaced (the first two
       are further apart than the rest), toothed drive sprocket at the FRONT
       and a raised idler at the REAR, the track running up from the first
       wheel to the sprocket and from the last wheel to the idler (side view);
       NO return rollers are visible in either photograph, so none are drawn
       (the old table entry of four is not supported); five round bosses sit
       on the lower hull side between the wheels (side view);
     - a low hull: flat fenders over the tracks, a low trough shelf at the
       nose, the front of the upper hull rising in a slope to the flat deck,
       a sloped rear; three access plates on the port hull side (one with a
       crossed-bar stencil) and dark stowage boxes at the rear of the port
       side (side view); a guarded headlamp on each front corner (3/4 view);
     - the big welded turret at the REAR: sloped front, flat roof, a steep
       rear slope, sides leaning in; a rounded gun mount with two recoil
       cylinders above the tube; the tube is stepped (thick breech half,
       thinner muzzle half with the bore evacuator) and ends in a large
       double-baffle muzzle brake with side slots, its muzzle level with
       the front of the track (side view); the travel-lock post on the
       front deck;
     - the commander's cupola on the PORT side of the roof, its dome
       overhanging the leaning side wall on a V-shaped base (both views);
       an MG ring on its front, a lens lamp on its front face and a round
       searchlight drum behind it (3/4 view); a sight box forward of it on
       the roof; a whip antenna behind it.
   Published figures: length gun forward 7.765 m, width 3.2 m, height about
   2.76 m (turret roof / cupola), 152 mm D-22 howitzer, 6 road wheels.
   NOT confirmed and so NOT drawn: a spade, rear hatches or a tail door,
   engine grilles or a driver's hatch (not visible in either photograph),
   side stowage boxes on the turret, handrails. The port-side cupola is read
   off both photographs. No tactical markings are drawn.

   Model space +X nose, +Y left (port), +Z up, metres, tracks on z = 0. The
   "turret" node (ring centre, gun along +X) holds the cab and a "barrel"
   group; each road wheel (both sides of one axle) is its own group named
   "roadwheel", rotating about Y at the axle. Materials: GREEN, DARK, GLASS,
   TEAM (exactly C.team). ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroAkatsiya = (function () {
  "use strict";

  /* --------------------------------------------------------------- baker */
  /* Collects positioned geometry per material and emits ONE mesh each. A
     part is turned into a plain triangle list first, so a box keeps its hard
     edges and a cylinder its smooth side. */
  function Baker(THREE) { this.T = THREE; this.by = []; }
  Baker.prototype.add = function (mat, geo) {
    var g = geo.index ? geo.toNonIndexed() : geo, i;
    for (i = 0; i < this.by.length; i++) {
      if (this.by[i].mat === mat) { this.by[i].g.push(g); return; }
    }
    this.by.push({ mat: mat, g: [g] });
  };
  /* box from its corners, in any order */
  Baker.prototype.box = function (mat, x0, x1, y0, y1, z0, z1) {
    var g = new this.T.BoxGeometry(Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0));
    g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    this.add(mat, g);
  };
  /* a box turned about Y: a track pad on a curved run */
  Baker.prototype.boxR = function (mat, sx, sy, sz, x, y, z, ry) {
    var g = new this.T.BoxGeometry(sx, sy, sz);
    g.rotateY(ry); g.translate(x, y, z);
    this.add(mat, g);
  };
  /* a box turned about Z: a vision block round a ring */
  Baker.prototype.boxZ = function (mat, sx, sy, sz, x, y, z, rz) {
    var g = new this.T.BoxGeometry(sx, sy, sz);
    g.rotateZ(rz); g.translate(x, y, z);
    this.add(mat, g);
  };
  /* an outline in the XZ plane (x forward, z up) extruded across y0..y1;
     ExtrudeGeometry turns its own winding the right way, and a hole makes a
     ring (the track belt) */
  Baker.prototype.xz = function (mat, pts, y0, y1, hole) {
    var T = this.T, sh = new T.Shape(), k, hp, g;
    sh.moveTo(pts[0][0], pts[0][1]);
    for (k = 1; k < pts.length; k++) sh.lineTo(pts[k][0], pts[k][1]);
    sh.closePath();
    if (hole) {
      hp = new T.Path();
      hp.moveTo(hole[0][0], hole[0][1]);
      for (k = 1; k < hole.length; k++) hp.lineTo(hole[k][0], hole[k][1]);
      hp.closePath();
      sh.holes.push(hp);
    }
    g = new T.ExtrudeGeometry(sh, { depth: y1 - y0, bevelEnabled: false });
    g.rotateX(Math.PI / 2);          /* shape y -> z, extrusion -> -y */
    g.translate(0, y1, 0);
    this.add(mat, g);
  };
  /* a plan outline (x forward, y left) extruded up from z0 to z1 */
  Baker.prototype.xy = function (mat, pts, z0, z1) {
    var T = this.T, sh = new T.Shape(), k, g;
    sh.moveTo(pts[0][0], pts[0][1]);
    for (k = 1; k < pts.length; k++) sh.lineTo(pts[k][0], pts[k][1]);
    sh.closePath();
    g = new T.ExtrudeGeometry(sh, { depth: z1 - z0, bevelEnabled: false });
    g.translate(0, 0, z0);
    this.add(mat, g);
  };
  /* cylinder on a world axis, centred at (x,y,z); r0 at the low end of the
     axis, r1 at the high end */
  Baker.prototype.cyl = function (mat, axis, r0, r1, len, seg, x, y, z) {
    var g = new this.T.CylinderGeometry(r1, r0, len, seg);
    if (axis === "x") g.rotateZ(-Math.PI / 2);
    else if (axis === "z") g.rotateX(Math.PI / 2);
    g.translate(x, y, z);
    this.add(mat, g);
  };
  /* cylinder from a to b */
  Baker.prototype.rod = function (mat, r, a, b, seg) {
    var T = this.T, d = new T.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]), len = d.length(), g, m;
    d.normalize();
    g = new T.CylinderGeometry(r, r, len, seg || 6);
    m = new T.Matrix4().compose(
      new T.Vector3((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2),
      new T.Quaternion().setFromUnitVectors(new T.Vector3(0, 1, 0), d),
      new T.Vector3(1, 1, 1));
    g.applyMatrix4(m);
    this.add(mat, g);
  };
  Baker.prototype.flush = function (group) {
    var T = this.T, i, j, e, n, P, N, U, o, g, c, S, geo, mesh;
    for (i = 0; i < this.by.length; i++) {
      e = this.by[i]; n = 0;
      for (j = 0; j < e.g.length; j++) n += e.g[j].attributes.position.count;
      P = new Float32Array(n * 3); N = new Float32Array(n * 3); U = new Float32Array(n * 2); o = 0;
      for (j = 0; j < e.g.length; j++) {
        g = e.g[j]; c = g.attributes.position.count;
        P.set(g.attributes.position.array, o * 3);
        if (g.attributes.normal) N.set(g.attributes.normal.array, o * 3);
        if (g.attributes.uv) U.set(g.attributes.uv.array, o * 2);
        o += c;
      }
      geo = new T.BufferGeometry();
      geo.setAttribute("position", new T.BufferAttribute(P, 3));
      geo.setAttribute("normal", new T.BufferAttribute(N, 3));
      geo.setAttribute("uv", new T.BufferAttribute(U, 2));
      geo.computeBoundingSphere();
      mesh = new T.Mesh(geo, e.mat);
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
    this.by = [];
  };
  /* equally spaced stations round a closed loop, with the heading at each */
  function along(pts, pitch) {
    var n = pts.length, out = [], cum = [0], k, i = 0, L, cnt, s, t, p0, p1, dx, dz;
    for (k = 1; k <= n; k++) {
      dx = pts[k % n][0] - pts[k - 1][0]; dz = pts[k % n][1] - pts[k - 1][1];
      cum.push(cum[k - 1] + Math.sqrt(dx * dx + dz * dz));
    }
    L = cum[n]; cnt = Math.max(1, Math.round(L / pitch));
    for (k = 0; k < cnt; k++) {
      s = (k + 0.5) * L / cnt;
      while (i < n - 1 && cum[i + 1] < s) i++;
      t = (s - cum[i]) / Math.max(1e-6, cum[i + 1] - cum[i]);
      p0 = pts[i]; p1 = pts[(i + 1) % n];
      out.push({ x: p0[0] + (p1[0] - p0[0]) * t, z: p0[1] + (p1[1] - p0[1]) * t,
                 a: Math.atan2(p1[1] - p0[1], p1[0] - p0[0]) });
    }
    return out;
  }

  /* a loft between two equal CCW plan outlines (x,y) at heights za, zb,
     with a flat top */
  Baker.prototype.loft = function (mat, pa, za, pb, zb, cap) {
    var n = pa.length, P = [], i, j, k;
    function tri(a, b, c) { P.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]); }
    for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      var ba = [pa[i][0], pa[i][1], za], bb = [pa[j][0], pa[j][1], za];
      var ta = [pb[i][0], pb[i][1], zb], tb = [pb[j][0], pb[j][1], zb];
      tri(ba, bb, tb); tri(ba, tb, ta);
    }
    if (cap) for (k = 1; k < n - 1; k++) tri([pb[0][0], pb[0][1], zb], [pb[k][0], pb[k][1], zb], [pb[k + 1][0], pb[k + 1][1], zb]);
    var g = new this.T.BufferGeometry();
    g.setAttribute("position", new this.T.BufferAttribute(new Float32Array(P), 3));
    g.computeVertexNormals();
    g.setAttribute("uv", new this.T.BufferAttribute(new Float32Array(P.length / 3 * 2), 2));
    this.add(mat, g);
  };


  /* convex outline (CCW) of several circles in the XZ plane */
  function hullOf(circles, n) {
    var P = [], i, k, a, c, out = [], lo, up;
    for (i = 0; i < circles.length; i++) {
      c = circles[i];
      for (k = 0; k < n; k++) { a = 2 * Math.PI * k / n; P.push([c[0] + c[2] * Math.cos(a), c[1] + c[2] * Math.sin(a)]); }
    }
    P.sort(function (p, q) { return p[0] - q[0] || p[1] - q[1]; });
    function cr(o, p, q) { return (p[0] - o[0]) * (q[1] - o[1]) - (p[1] - o[1]) * (q[0] - o[0]); }
    lo = [];
    for (i = 0; i < P.length; i++) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], P[i]) <= 1e-9) lo.pop(); lo.push(P[i]); }
    up = [];
    for (i = P.length - 1; i >= 0; i--) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], P[i]) <= 1e-9) up.pop(); up.push(P[i]); }
    lo.pop(); up.pop();
    return lo.concat(up);
  }

  function build(THREE, M, C) {
    var s, k, x, a, yc, i;
    var root = new THREE.Group();
    root.name = "ru_2s3";
    var green = new THREE.MeshStandardMaterial({ color: 0x59633f, roughness: 0.85, metalness: 0.06 });
    var dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.6, metalness: 0.32 });
    var glass = new THREE.MeshStandardMaterial({ color: 0x1b2a33, roughness: 0.14, metalness: 0.3 });
    var team = new THREE.MeshStandardMaterial({
      color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.55, metalness: 0.12 });

    /* stations read off the port side view (x from the middle of the length) */
    var NOSE = 3.85, TAIL = -3.85, ZD = 1.57, HC = 0.05, WR = 0.385, ZC = WR + HC;
    var WX = [2.64, 1.52, 0.41, -0.50, -1.41, -2.34];          /* road wheels */
    var SX = 3.45, SZ = 0.66, SR = 0.35;                       /* sprocket */
    var IX = -3.22, IZ = 0.70, IR = 0.35;                      /* idler */
    var TY = 1.40, TW = 0.40;                                  /* track centre and width */
    var B = new Baker(THREE);

    /* ---------------- hull ---------------- */
    /* lower hull between the tracks, then the upper hull with its sloped
       front, flat deck and sloped tail */
    B.xz(green, [[TAIL, 0.62], [TAIL, 1.0], [3.4, 1.02], [NOSE, 0.98], [NOSE, 0.66], [3.55, 0.40], [-3.6, 0.40]], -1.18, 1.18);
    B.xz(green, [[TAIL, 1.0], [-3.65, 1.18], [-3.2, ZD], [2.4, ZD], [2.85, 1.27], [3.35, 1.18], [NOSE - 0.1, 1.04], [NOSE - 0.1, 1.0]],
      -1.28, 1.28);
    for (s = -1; s <= 1; s += 2) {
      /* fender over the track: flat, curled down at the nose */
      B.xz(green, [[-3.3, 1.10], [3.3, 1.10], [3.62, 1.06], [NOSE, 0.84], [NOSE, 0.79], [3.62, 1.01], [3.3, 1.05], [-3.3, 1.05]],
        s > 0 ? 1.20 : -1.60, s > 0 ? 1.60 : -1.20);
      B.box(green, -3.3, 3.3, s * 1.58, s * 1.60, 0.98, 1.14);          /* fender lip */
      /* guarded headlamp on the front corner */
      B.box(dark, 2.84, 3.00, s * 1.05 - 0.10, s * 1.05 + 0.10, 1.26, 1.44);
      B.cyl(glass, "x", 0.075, 0.075, 0.04, 12, 3.02, s * 1.05, 1.35);
      B.box(dark, 3.00, 3.03, s * 1.05 - 0.14, s * 1.05 + 0.14, 1.22, 1.26);
      B.box(dark, 3.00, 3.03, s * 1.05 - 0.14, s * 1.05 + 0.14, 1.44, 1.48);
      /* tow eye on the nose plate */
      B.cyl(dark, "x", 0.07, 0.07, 0.08, 10, NOSE - 0.04, s * 0.60, 0.76);
    }
    /* trough shelf across the nose */
    B.box(green, 3.12, NOSE - 0.05, -1.22, 1.22, 1.00, 1.20);
    B.box(dark, 3.14, NOSE - 0.07, -1.18, 1.18, 1.19, 1.215);
    /* access plates on the hull side (port as photographed, mirrored) and the
       dark stowage boxes at the rear of the port side */
    for (s = -1; s <= 1; s += 2) {
      B.box(green, 1.75, 2.33, s * 1.28, s * 1.31, 1.14, 1.48);
      B.box(green, 0.95, 1.56, s * 1.28, s * 1.31, 1.14, 1.48);
      B.box(green, 0.06, 0.61, s * 1.28, s * 1.31, 1.14, 1.48);
      B.box(dark, 0.10, 0.57, s * 1.305, s * 1.315, 1.30, 1.32);       /* crossed-bar stencil plate */
      B.rod(dark, 0.012, [0.10, s * 1.31, 1.16], [0.57, s * 1.31, 1.46], 4);
      B.rod(dark, 0.012, [0.10, s * 1.31, 1.46], [0.57, s * 1.31, 1.16], 4);
      for (k = 0; k < 3; k++) B.cyl(dark, "y", 0.025, 0.025, 0.03, 6, 1.85 + k * 0.17, s * 1.31, 1.44);
    }
    B.box(dark, -2.33, -1.44, 1.28, 1.40, 1.20, 1.50);                  /* stowage boxes, port */
    B.box(green, -2.33, -1.44, 1.40, 1.42, 1.24, 1.46);
    B.cyl(green, "z", 1.22, 1.22, 0.14, 28, -1.45, 0, ZD + 0.04);     /* turret ring collar */
    /* barrel travel lock on the front deck: post and clamp */
    B.box(green, 2.12, 2.26, -0.10, 0.10, ZD, 1.80);
    B.box(dark, 2.08, 2.30, -0.15, 0.15, 1.78, 1.84);
    B.box(dark, 2.08, 2.30, -0.15, -0.11, 1.84, 2.02);
    B.box(dark, 2.08, 2.30, 0.11, 0.15, 1.84, 2.02);

    /* ---------------- running gear ---------------- */
    var CO = [[SX, SZ, SR + HC + 0.01], [WX[0], ZC, ZC], [WX[5], ZC, ZC], [IX, IZ, IR + HC + 0.01]];
    var CI = [[SX, SZ, SR], [WX[0], ZC, WR], [WX[5], ZC, WR], [IX, IZ, IR]];
    var CM = [[SX, SZ, SR + HC / 2], [WX[0], ZC, ZC - HC / 2], [WX[5], ZC, ZC - HC / 2], [IX, IZ, IR + HC / 2]];
    var outer = hullOf(CO, 16), inner = hullOf(CI, 16);
    var padL = along(hullOf(CM, 16), 0.23);
    var SPR = [], q, rr;
    for (q = 0; q < 24; q++) {
      a = q * Math.PI / 12; rr = (q % 2) ? SR - 0.05 : SR + 0.02;
      SPR.push([SX + rr * Math.cos(a), SZ + rr * Math.sin(a)]);
    }
    for (s = -1; s <= 1; s += 2) {
      yc = s * TY;
      B.xz(dark, outer, yc - TW / 2, yc + TW / 2, inner);
      for (k = 0; k < padL.length; k++) {
        B.boxR(dark, 0.13, TW - 0.02, HC, padL[k].x, yc, padL[k].z, -padL[k].a);
      }
      /* sprocket and idler, baked; round bosses on the lower hull side */
      B.xz(dark, SPR, yc - 0.10, yc + 0.10);
      B.cyl(green, "y", SR - 0.10, SR - 0.10, 0.24, 14, SX, yc, SZ);
      B.cyl(dark, "y", 0.07, 0.07, 0.30, 8, SX, yc, SZ);
      B.cyl(dark, "y", IR, IR, 0.26, 18, IX, yc, IZ);
      B.cyl(green, "y", IR - 0.07, IR - 0.07, 0.30, 20, IX, yc, IZ);
      for (k = 0; k < 6; k++) {
        a = k * Math.PI / 3;
        B.cyl(dark, "y", 0.035, 0.035, 0.32, 6, IX + 0.19 * Math.cos(a), yc, IZ + 0.19 * Math.sin(a));
      }
      B.cyl(dark, "y", 0.07, 0.07, 0.34, 8, IX, yc, IZ);
      for (k = 0; k < 5; k++) B.cyl(dark, "y", 0.08, 0.08, 0.08, 10, (WX[k] + WX[k + 1]) / 2, s * 1.215, 0.86);
    }
    var hullG = new THREE.Group(); hullG.name = "hull";
    B.flush(hullG);
    root.add(hullG);

    /* road wheels: one group per axle, both sides, spun about Y by render3d */
    for (i = 0; i < WX.length; i++) {
      var wg = new THREE.Group(); wg.name = "roadwheel";
      wg.position.set(WX[i], 0, ZC);
      for (s = -1; s <= 1; s += 2) {
        yc = s * TY;
        B.cyl(dark, "y", WR, WR, 0.20, 16, 0, yc, 0);                  /* tyre */
        B.cyl(dark, "y", WR * 0.72, WR * 0.72, 0.26, 20, 0, yc + s * 0.0, 0);
        B.cyl(dark, "y", 0.085, 0.085, 0.32, 10, 0, yc, 0);             /* hub */
        for (k = 0; k < 5; k++) {
          a = k * 2 * Math.PI / 5 + 0.3;
          B.cyl(dark, "y", 0.045, 0.045, 0.285, 6, 0.19 * Math.cos(a), yc, 0.19 * Math.sin(a));
        }
      }
      B.flush(wg);
      root.add(wg);
    }

    /* ---------------- turret ---------------- */
    var T = new THREE.Group(); T.name = "turret";
    T.position.set(-1.45, 0, ZD);
    var P0 = [[-1.99, -1.46], [1.50, -1.46], [1.94, -1.02], [1.94, 1.02], [1.50, 1.46], [-1.99, 1.46]];
    var P1 = [[-1.99, -1.43], [1.46, -1.43], [1.90, -1.00], [1.90, 1.00], [1.46, 1.43], [-1.99, 1.43]];
    var P2 = [[-1.28, -1.02], [1.12, -1.02], [1.46, -0.70], [1.46, 0.70], [1.12, 1.02], [-1.28, 1.02]];
    var ZR = 0.93;
    B.loft(green, P0, 0.08, P1, 0.20, false);
    B.loft(green, P1, 0.20, P2, ZR, true);
    /* rounded gun mount on the sloped front, tube sleeve */
    B.box(green, 1.78, 2.08, -0.56, 0.56, 0.12, 0.68);
    B.box(green, 1.78, 2.08, -0.62, -0.56, 0.18, 0.60);
    B.box(green, 1.78, 2.08, 0.56, 0.62, 0.18, 0.60);
    B.cyl(dark, "x", 0.27, 0.27, 0.05, 20, 2.08, 0, 0.36);
    /* sight box on the roof forward of the cupola, small plates on the side wall */
    B.box(green, 0.82, 1.14, 0.40, 0.72, ZR, ZR + 0.14);
    B.box(glass, 1.14, 1.16, 0.46, 0.66, ZR + 0.03, ZR + 0.11);
    for (s = -1; s <= 1; s += 2) {
      B.box(dark, -0.15, 0.12, s * 1.20 - 0.01 * s, s * 1.20 + 0.03 * s, 0.50, 0.58);
      B.box(dark, -0.15, 0.12, s * 1.28 - 0.01 * s, s * 1.28 + 0.03 * s, 0.26, 0.34);
    }
    /* commander's cupola on the port side: dome on a V-shaped base over the leaning wall */
    var CX = 0.05, CY = 0.80, CR = 0.40, ring = [], ring2 = [];
    for (k = 0; k < 10; k++) {
      a = 2 * Math.PI * k / 10;
      ring.push([CX + 0.06 * Math.cos(a), CY + 0.42 + 0.06 * Math.sin(a)]);
      ring2.push([CX + (CR + 0.02) * Math.cos(a), CY + (CR + 0.02) * Math.sin(a)]);
    }
    B.loft(green, ring, ZR - 0.46, ring2, ZR, false);
    B.cyl(green, "z", CR, CR - 0.02, 0.26, 24, CX, CY, ZR + 0.13);
    B.cyl(green, "z", CR - 0.08, CR - 0.08, 0.04, 22, CX, CY, ZR + 0.28);
    for (k = 0; k < 8; k++) {
      a = k * Math.PI / 4 + Math.PI / 8;
      B.boxZ(glass, 0.04, 0.12, 0.08, CX + (CR - 0.01) * Math.cos(a), CY + (CR - 0.01) * Math.sin(a), ZR + 0.17, a);
    }
    B.cyl(dark, "z", 0.07, 0.07, 0.07, 8, CX, CY, ZR + 0.32);
    /* MG ring and gun on the front of the cupola, lens lamp, searchlight drum behind */
    B.cyl(dark, "z", 0.17, 0.17, 0.05, 14, CX + 0.30, CY, ZR + 0.31);
    B.box(dark, CX + 0.24, CX + 0.50, CY - 0.05, CY + 0.05, ZR + 0.34, ZR + 0.44);
    B.rod(dark, 0.022, [CX + 0.46, CY, ZR + 0.41], [CX + 0.95, CY, ZR + 0.41], 6);
    B.box(dark, CX + CR - 0.02, CX + CR + 0.12, CY + 0.20, CY + 0.42, ZR + 0.06, ZR + 0.22);
    B.box(glass, CX + CR + 0.12, CX + CR + 0.14, CY + 0.23, CY + 0.39, ZR + 0.09, ZR + 0.19);
    B.cyl(dark, "x", 0.14, 0.14, 0.24, 16, CX - 0.40, CY - 0.06, ZR + 0.38);
    B.cyl(glass, "x", 0.11, 0.11, 0.02, 14, CX - 0.27, CY - 0.06, ZR + 0.38);
    B.box(dark, CX - 0.50, CX - 0.30, CY - 0.10, CY + 0.02, ZR + 0.22, ZR + 0.26);
    B.box(team, -0.95, -0.55, -0.55, 0.05, ZR, ZR + 0.012);             /* team flash on the roof */
    B.rod(dark, 0.02, [-0.95, 0.55, ZR], [-0.95, 0.55, ZR + 0.10], 6);   /* antenna base and whip */
    B.rod(dark, 0.011, [-0.95, 0.55, ZR + 0.10], [-0.97, 0.55, ZR + 0.62], 4);
    B.flush(T);

    /* the tube, in a pivot group on the trunnion, laid level (as photographed) */
    var G = new THREE.Group(); G.name = "barrel";
    G.position.set(1.85, 0, 0.36);
    B.cyl(green, "x", 0.22, 0.22, 0.62, 24, 0.31, 0, 0);                /* cradle sleeve */
    B.cyl(dark, "x", 0.12, 0.12, 0.05, 14, 0.64, 0, 0);
    B.cyl(green, "x", 0.125, 0.125, 1.80, 22, 1.00, 0, 0);              /* thick breech half */
    B.cyl(green, "x", 0.155, 0.155, 0.34, 22, 1.45, 0, 0);              /* bore evacuator */
    B.cyl(dark, "x", 0.16, 0.16, 0.03, 22, 1.28, 0, 0);
    B.cyl(dark, "x", 0.16, 0.16, 0.03, 22, 1.62, 0, 0);
    B.cyl(green, "x", 0.105, 0.105, 1.05, 22, 2.33, 0, 0);             /* thinner muzzle half */
    B.cyl(green, "x", 0.20, 0.20, 0.54, 26, 3.12, 0, 0);                /* double-baffle muzzle brake */
    B.cyl(green, "x", 0.225, 0.225, 0.06, 26, 2.88, 0, 0);
    B.cyl(green, "x", 0.225, 0.225, 0.06, 26, 3.36, 0, 0);
    B.cyl(dark, "x", 0.09, 0.09, 0.01, 14, 3.405, 0, 0);
    for (s = -1; s <= 1; s += 2) {
      B.box(dark, 3.00, 3.24, s * 0.20, s * 0.215, -0.10, 0.10);        /* side slots of the brake */
      B.box(dark, 3.00, 3.24, -0.10, 0.10, s * 0.20, s * 0.215);
      B.rod(green, 0.06, [0.10, s * 0.12, 0.24], [0.95, s * 0.12, 0.24], 12);   /* recoil cylinders */
      B.rod(dark, 0.065, [0.90, s * 0.12, 0.24], [0.97, s * 0.12, 0.24], 12);
    }
    B.flush(G);
    T.add(G);
    root.add(T);

    root.updateMatrixWorld(true);
    root.position.z -= new THREE.Box3().setFromObject(root).min.z;
    return root;
  }

  return { build: build };
})();

UNIT_MODELS["pact_e60_spg"] = {
  len: 7.77,
  build: function (THREE, M, C) { return HeroAkatsiya.build(THREE, M, C); }
};
