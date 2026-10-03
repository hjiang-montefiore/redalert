/* ============ ru_2s19.js - HERO models: the 2S19 Msta-S 152 mm self-propelled howitzer
   One builder, four keys, one model: pact_e80_spg, pact_e90_spg, pact_e00_spg and
   spg_p (present day). The references show no visible difference between the
   2S19 and the 2S19M1/M2 at game scale (the M1/M2 changes are inside: a
   longer-bored tube, a new fire control), so the shape is the same and only the
   paint tone moves a little from row to row.

   What each feature rests on:
     - Wikimedia Commons photographs "2S19 Msta-S PM MWB 03" (left three-quarter
       rear, a preserved hull) and "PM MWB 09" (left side, gun raised): the
       T-80-derived hull with SIX road wheels a side, the drive sprocket at the
       REAR and the idler at the front, support rollers under a fender, the turret
       sitting over the rear half of the hull with a sloped front roof, a
       rectangular hatch and a round port in its left side, the hull tail with a
       stowed spade plate, a long tube with a bore evacuator two thirds out and a
       double-baffle muzzle brake, the lifting eye on the turret roof.
     - Published figures: length gun forward 11.92 m, hull 7.15 m, width 3.38 m,
       height 2.99 m, 152 mm 2A64 tube of 47 calibres (7.1 m), combat weight 42 t;
       the rows' own sheets (armour_specs.js) give the cupola, the remote AA
       machine gun and smoke dischargers; facts.js gives the 12.7 mm NSVT and the
       902B smoke system. The ammunition conveyor door in the turret rear is the
       howitzer's well-known loading feature (facts.js: "reload from the ground
       through a conveyor hatch").
     - Check-and-fix pass, further Commons photographs of in-service vehicles:
       "Moscow 2012 Victory Day Parade Rehearsal, Msta-S" and "2S19 Msta-S
       parade, 2012" (side: six road wheels, no side skirts, the turret over the
       rear two thirds with its tail near the hull tail), "2S19 Msta-S in service
       with the Ukrainian Army" (front: the smoke-discharger banks of three on the
       sloped turret roof front with louvre blocks below, the commander's cupola
       with the machine gun on the right, one whip aerial, the A-frame travel lock
       on the glacis), and the 2S19M2 at Oboronexpo 2014 and RAE-2013 (segmented
       steel side skirts with round holes over the upper run, six road wheels).
       So: the turret is moved forward and lengthened, the smoke banks sit on the
       turret roof front, the skirts are drawn on the 2S19M2 row (e00) only, the
       gun rests level (the game lays it) and the travel lock is not drawn (it is a
       transport device on the glacis centre; the game trains the gun).
     - Not confirmed and so not drawn: any later add-on armour or reactive armour,
       any camouflage pattern, the travel lock. The drive sprocket end (rear) and
       the number of support rollers (four, hidden under the fender in most views)
       follow the T-80 chassis and the rows' own sheets; the photographs do not
       settle either.

   Model space: +X nose, +Y left (port), +Z up, metres, tracks on z = 0. The turret
   node ("turret") sits on the ring centre at deck height with its gun along +X;
   the tube hangs in a "barrel" group on the trunnion. Nothing spins (running
   gear is baked), so nothing is called "roadwheel". Materials: SKIN, BAR (tube
   paint), DARK, RUBBER, GLASS and TEAM which is exactly C.team. At most 15 draw
   calls. ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMsta = (function () {
  "use strict";
  var VARS = {
    e80: { id: "e80", base: 0x46523a, bar: 0x3f4b34 },
    e90: { id: "e90", base: 0x48553a, bar: 0x414d35 },
    e00: { id: "e00", base: 0x4a5a3e, bar: 0x435238, skirts: true },
    e20: { id: "e20", base: 0x4b5c3f, bar: 0x445439 }
  };

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
      S = e.mat.userData && e.mat.userData.worldUV;
      if (S) worldUV(P, U, S);
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
  /* Box projection by each triangle's own facing, in metres: sides take
     (along, height), tops (along, across), ends (across, height). */
  function worldUV(P, U, S) {
    var t, a, k, ux, uy, uz, vx, vy, vz, nx, ny, nz, X, Y, Z, q;
    for (t = 0; t < P.length / 9; t++) {
      a = t * 9;
      ux = P[a + 3] - P[a]; uy = P[a + 4] - P[a + 1]; uz = P[a + 5] - P[a + 2];
      vx = P[a + 6] - P[a]; vy = P[a + 7] - P[a + 1]; vz = P[a + 8] - P[a + 2];
      nx = Math.abs(uy * vz - uz * vy); ny = Math.abs(uz * vx - ux * vz); nz = Math.abs(ux * vy - uy * vx);
      for (k = 0; k < 3; k++) {
        X = P[a + k * 3]; Y = P[a + k * 3 + 1]; Z = P[a + k * 3 + 2];
        q = t * 6 + k * 2;
        if (ny >= nx && ny >= nz) { U[q] = X / S; U[q + 1] = Z / S; }
        else if (nz >= nx) { U[q] = X / S; U[q + 1] = Y / S; }
        else { U[q] = Y / S; U[q + 1] = Z / S; }
      }
    }
  }

  /* a stadium (two circles and their tangents) as an XZ loop, nose arc first */
  function stadium(xr, xf, zc, R, n) {
    var pts = [], k, a;
    for (k = 0; k <= n; k++) { a = -Math.PI / 2 + Math.PI * k / n; pts.push([xf + R * Math.cos(a), zc + R * Math.sin(a)]); }
    for (k = 0; k <= n; k++) { a = Math.PI / 2 + Math.PI * k / n; pts.push([xr + R * Math.cos(a), zc + R * Math.sin(a)]); }
    return pts;
  }
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
  /* a convex plan outline pulled in towards its middle */
  function inset(pts, d) {
    var cx = 0, cy = 0, k, out = [], dx, dy, l;
    for (k = 0; k < pts.length; k++) { cx += pts[k][0]; cy += pts[k][1]; }
    cx /= pts.length; cy /= pts.length;
    for (k = 0; k < pts.length; k++) {
      dx = pts[k][0] - cx; dy = pts[k][1] - cy; l = Math.sqrt(dx * dx + dy * dy) || 1;
      out.push([pts[k][0] - dx / l * d, pts[k][1] - dy / l * d]);
    }
    return out;
  }

  /* convex hull of circles [x, z, r], counter-clockwise, as an XZ loop */
  function circlesHull(cs, grow) {
    var pts = [], i, k, a, h = [], n, t, lower = [], upper = [];
    for (i = 0; i < cs.length; i++) {
      for (k = 0; k < 16; k++) { a = k * Math.PI / 8; pts.push([cs[i][0] + (cs[i][2] + grow) * Math.cos(a), cs[i][1] + (cs[i][2] + grow) * Math.sin(a)]); }
    }
    pts.sort(function (p, q) { return p[0] - q[0] || p[1] - q[1]; });
    function cr(o, p, q) { return (p[0] - o[0]) * (q[1] - o[1]) - (p[1] - o[1]) * (q[0] - o[0]); }
    for (i = 0; i < pts.length; i++) {
      while (lower.length >= 2 && cr(lower[lower.length - 2], lower[lower.length - 1], pts[i]) <= 1e-9) lower.pop();
      lower.push(pts[i]);
    }
    for (i = pts.length - 1; i >= 0; i--) {
      while (upper.length >= 2 && cr(upper[upper.length - 2], upper[upper.length - 1], pts[i]) <= 1e-9) upper.pop();
      upper.push(pts[i]);
    }
    lower.pop(); upper.pop();
    return lower.concat(upper);
  }

  function build(THREE, M, C, id) {
    var P = VARS[id], s, k, i, a, x, yc, q;
    var root = new THREE.Group();
    root.name = "ru_2s19_" + id;
    var skin = new THREE.MeshStandardMaterial({ color: P.base, roughness: 0.88, metalness: 0.05 });
    var bar = new THREE.MeshStandardMaterial({ color: P.bar, roughness: 0.74, metalness: 0.16 });
    var dark = new THREE.MeshStandardMaterial({ color: 0x23262a, roughness: 0.58, metalness: 0.32 });
    var rub = new THREE.MeshStandardMaterial({ color: 0x1c1d1e, roughness: 0.95, metalness: 0.03 });
    var glass = new THREE.MeshStandardMaterial({ color: 0x1b2a33, roughness: 0.14, metalness: 0.3 });
    var team = new THREE.MeshStandardMaterial({
      color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.55, metalness: 0.12 });
    var B = new Baker(THREE);

    var NOSE = 3.57, TAIL = -3.58, ZD = 1.80, HW = 1.20, TCY = 1.40, TW = 0.58;
    var WR = 0.335, ZW = 0.355, TB = 0.065, HC = 0.045;

    /* ===================================================== 1. HULL === */
    /* upper/lower hull in side profile: low engine deck behind the turret,
       flat fighting deck, the sloped glacis */
    B.xz(skin, [[TAIL, 0.50], [TAIL, 1.38], [-3.00, 1.45], [-2.45, 1.55], [2.15, 1.55], [NOSE, 1.12], [NOSE, 0.50]], -HW, HW);
    /* sloped hull flanks over the tracks and the track fenders */
    for (s = -1; s <= 1; s += 2) {
      B.box(skin, -3.45, 3.38, s * 1.12, s * 1.70, 1.02, 1.07);
      B.box(skin, -3.45, 3.38, s * 1.66, s * 1.70, 0.90, 1.07);          /* fender lip */
      B.box(skin, 2.55, 3.45, s * 1.10, s * 1.70, 1.07, 1.12);           /* front wings */
      B.box(skin, -3.20, -2.55, s * 0.62, s * 1.12, 1.40, 1.46);         /* engine-deck shoulders */
    }
    /* rear engine deck grilles, and the exhaust louvres */
    for (k = 0; k < 6; k++) B.box(dark, -3.45 + k * 0.16, -3.36 + k * 0.16, -0.95, 0.95, 1.40, 1.46);
    B.box(skin, -3.00, -2.62, -0.95, 0.95, 1.43, 1.50);
    /* glacis: driver's hatch centred, periscopes, headlamps, tow eyes, mud flaps */
    B.cyl(skin, "z", 0.30, 0.30, 0.10, 20, 2.70, 0.0, 1.43);
    B.cyl(skin, "z", 0.24, 0.24, 0.05, 18, 2.70, 0.0, 1.50);
    for (k = -1; k <= 1; k++) B.box(glass, 2.98, 3.04, k * 0.20 - 0.07, k * 0.20 + 0.07, 1.30, 1.40);
    B.box(team, 2.20, 2.55, 0.50, 1.00, 1.55, 1.58);                       /* team flash on the deck */
    for (s = -1; s <= 1; s += 2) {
      B.box(glass, NOSE - 0.03, NOSE + 0.02, s * 1.0 - 0.08, s * 1.0 + 0.08, 0.92, 1.04);
      B.box(dark, NOSE - 0.02, NOSE + 0.08, s * 0.45 - 0.07, s * 0.45 + 0.07, 0.66, 0.80);
      B.box(rub, NOSE + 0.04, NOSE + 0.10, s * 1.35 - 0.30, s * 1.35 + 0.30, 0.30, 0.90);
    }
    /* the stowed spade plate and its two arms, hull tail */
    B.box(skin, TAIL - 0.14, TAIL, -1.12, 1.12, 0.52, 1.38);
    B.box(dark, TAIL - 0.16, TAIL - 0.02, -1.12, 1.12, 0.46, 0.58);
    B.rod(dark, 0.07, [TAIL, -0.8, 1.20], [TAIL + 0.55, -0.8, 1.38], 8);
    B.rod(dark, 0.07, [TAIL, 0.8, 1.20], [TAIL + 0.55, 0.8, 1.38], 8);

    /* running gear: sprocket at the REAR, idler at the FRONT, six road wheels */
    var XS = -3.15, ZS = 0.50, RS = 0.45, XI = 3.05, ZI = 0.47, RI = 0.42;
    var circ = [[XS, ZS, RS], [XI, ZI, RI], [2.25, ZW, WR + TB - 0.02], [-2.25, ZW, WR + TB - 0.02]];
    var outer = circlesHull(circ, 0.0), inner = circlesHull(circ, -TB);
    var padL = along(outer, 0.28);
    var SPR = [];
    for (q = 0; q < 28; q++) {
      a = q * Math.PI / 14;
      SPR.push([XS + (q % 2 ? RS - 0.12 : RS - 0.035) * Math.cos(a), ZS + (q % 2 ? RS - 0.12 : RS - 0.035) * Math.sin(a)]);
    }
    for (s = -1; s <= 1; s += 2) {
      yc = s * TCY;
      B.xz(dark, outer, yc - TW / 2, yc + TW / 2, inner);                 /* the belt */
      for (k = 0; k < padL.length; k++) {
        B.boxR(dark, 0.10, TW - 0.03, HC, padL[k].x, yc, padL[k].z, -padL[k].a);   /* link plates */
        if (k % 4 === 0) B.boxR(dark, 0.05, 0.08, 0.06, padL[k].x, yc, padL[k].z + 0.02 * Math.cos(padL[k].a), -padL[k].a);   /* guide horns */
      }
      for (k = 0; k < 6; k++) {                                           /* road wheels: two rubber-tyred discs on a hub */
        x = 2.25 - k * 0.90;
        B.cyl(rub, "y", WR, WR, 0.14, 16, x, yc - 0.15, ZW);
        B.cyl(rub, "y", WR, WR, 0.14, 16, x, yc + 0.15, ZW);
        B.cyl(skin, "y", WR * 0.80, WR * 0.80, 0.07, 12, x, yc - 0.15, ZW);
        B.cyl(skin, "y", WR * 0.80, WR * 0.80, 0.07, 12, x, yc + 0.15, ZW);
        B.cyl(skin, "y", 0.12, 0.12, 0.46, 10, x, yc, ZW);
        B.cyl(dark, "y", 0.07, 0.07, 0.50, 8, x, yc, ZW);
      }
      for (k = 0; k < 4; k++) {                                           /* support rollers */
        x = 2.0 - k * 1.45;
        B.cyl(rub, "y", 0.10, 0.10, 0.22, 10, x, yc, 0.80);
        B.cyl(dark, "y", 0.04, 0.04, 0.26, 8, x, yc, 0.80);
      }
      B.cyl(rub, "y", RI - TB - 0.01, RI - TB - 0.01, 0.30, 24, XI, yc, ZI);   /* idler */
      B.cyl(skin, "y", 0.22, 0.22, 0.34, 16, XI, yc, ZI);
      B.xz(dark, SPR, yc - 0.12, yc + 0.12);                              /* toothed drive sprocket */
      B.cyl(skin, "y", 0.20, 0.20, 0.30, 16, XS, yc, ZS);
      B.rod(dark, 0.02, [XI, yc + s * 0.26, ZI], [2.25, yc + s * 0.26, ZW + 0.08], 6);   /* idler track-tension arm */
    }
    /* side skirts: segmented steel panels over the upper run, with a round
       hole at the wheel stations (2S19M2 photographs only) */
    if (P.skirts) {
      for (s = -1; s <= 1; s += 2) {
        for (k = 0; k < 5; k++) {
          x = 2.70 - k * 1.28;
          B.box(skin, x - 0.60, x + 0.60, s * 1.69, s * 1.72, 0.62, 1.06);
          B.cyl(dark, "y", 0.07, 0.07, 0.01, 12, x + 0.20, s * 1.725, 0.88);
        }
      }
    }
    var hullG = new THREE.Group(); hullG.name = "hull";
    B.flush(hullG);
    root.add(hullG);

    /* =================================================== 2. TURRET === */
    var T = new THREE.Group(); T.name = "turret";
    T.position.set(-0.05, 0, ZD);
    /* the box: a centre block with a sloped front roof, and lower side blocks
       so the flanks step in towards the roof */
    B.xz(skin, [[-2.85, -0.25], [-2.85, 1.02], [-1.75, 1.10], [0.55, 1.10], [1.30, 0.86], [1.30, -0.25]], -1.20, 1.20);
    B.xz(skin, [[-2.77, -0.25], [-2.77, 0.86], [0.45, 0.90], [1.15, 0.70], [1.15, -0.25]], -1.56, -1.19);
    B.xz(skin, [[-2.77, -0.25], [-2.77, 0.86], [0.45, 0.90], [1.15, 0.70], [1.15, -0.25]], 1.19, 1.56);
    /* front: the gun mount housing and the mantlet shield around the cradle */
    B.box(skin, 1.28, 1.62, -0.62, 0.62, 0.18, 0.98);
    B.cyl(bar, "x", 0.34, 0.31, 0.30, 24, 1.77, 0.0, 0.70);
    B.box(dark, 1.30, 1.40, -0.66, 0.66, 0.14, 0.20);
    /* rear: the ammunition conveyor door in the tail, with its frame and hinges */
    B.box(dark, -2.90, -2.85, -0.62, 0.62, 0.14, 0.94);
    B.box(skin, -2.95, -2.90, -0.54, 0.54, 0.20, 0.88);
    B.box(dark, -2.98, -2.95, -0.20, 0.20, 0.45, 0.55);
    B.rod(dark, 0.03, [-2.95, -0.54, 0.88], [-2.95, 0.54, 0.88], 6);
    B.box(skin, -2.93, -2.77, -1.44, -0.74, 0.10, 0.70);                  /* rear stowage boxes */
    B.box(skin, -2.93, -2.77, 0.74, 1.44, 0.10, 0.70);
    B.box(dark, -2.95, -2.93, -1.40, -0.78, 0.36, 0.40);
    B.box(dark, -2.95, -2.93, 0.78, 1.40, 0.36, 0.40);
    /* left flank: the rectangular hatch with its opening, the round port, grab rails */
    B.box(dark, -0.65, 0.05, 1.555, 1.585, 0.30, 0.74);
    B.box(skin, -0.70, 0.10, 1.585, 1.60, 0.26, 0.78);
    B.box(dark, -0.60, 0.00, 1.60, 1.62, 0.34, 0.70);
    B.cyl(dark, "y", 0.12, 0.12, 0.04, 16, -2.00, 1.57, 0.46);
    B.cyl(skin, "y", 0.15, 0.15, 0.03, 16, -2.00, 1.58, 0.46);
    B.rod(dark, 0.022, [-2.5, 1.62, 0.20], [-2.5, 1.62, 0.70], 6);
    B.rod(dark, 0.022, [-2.5, -1.62, 0.20], [-2.5, -1.62, 0.70], 6);
    /* right flank: a vision block and the second hatch */
    B.box(glass, 0.20, 0.50, -1.585, -1.555, 0.46, 0.62);
    B.box(skin, -0.50, 0.00, -1.62, -1.57, 0.28, 0.72);
    /* smoke dischargers (photographs of in-service vehicles): two banks of three
       tubes on the sloped front of the turret roof, with louvre blocks below */
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 3; k++) {
        B.rod(dark, 0.04, [1.00, s * (0.70 + 0.20 * k), 0.93], [1.06, s * (0.70 + 0.20 * k), 1.14], 8);
        B.cyl(bar, "z", 0.045, 0.045, 0.02, 8, 1.065, s * (0.70 + 0.20 * k), 1.145);
      }
      B.box(dark, 1.30, 1.34, s * 0.60 - 0.22, s * 0.60 + 0.22, 0.52, 0.64);
      B.box(dark, 1.30, 1.34, s * 0.60 - 0.22, s * 0.60 + 0.22, 0.68, 0.80);
      B.box(dark, 1.30, 1.34, s * 1.00 - 0.22, s * 1.00 + 0.22, 0.52, 0.64);
      B.box(dark, 1.30, 1.34, s * 1.00 - 0.22, s * 1.00 + 0.22, 0.68, 0.80);
    }
    /* roof: gunner's hatch left front, loader's hatch left rear, round panoramic sight */
    B.cyl(skin, "z", 0.30, 0.30, 0.05, 20, -0.30, 0.62, 1.125);
    B.cyl(skin, "z", 0.24, 0.24, 0.04, 18, -0.30, 0.62, 1.17);
    B.cyl(skin, "z", 0.28, 0.28, 0.05, 20, -1.95, 0.62, 1.125);
    B.cyl(skin, "z", 0.22, 0.22, 0.04, 18, -1.95, 0.62, 1.165);
    B.box(skin, 0.20, 0.52, 0.30, 0.74, 1.10, 1.30);                       /* gunner's sight box */
    B.box(glass, 0.515, 0.54, 0.38, 0.66, 1.16, 1.26);
    /* commander's cupola, right, with its vision blocks and the remote AA machine gun */
    B.cyl(skin, "z", 0.36, 0.36, 0.20, 22, 0.00, -0.66, 1.18);
    B.cyl(dark, "z", 0.28, 0.28, 0.03, 18, 0.00, -0.66, 1.295);
    for (k = 0; k < 8; k++) {
      a = k * Math.PI / 4 + 0.2;
      B.boxZ(glass, 0.05, 0.12, 0.07, 0.00 + 0.365 * Math.cos(a), -0.66 + 0.365 * Math.sin(a), 1.20, a);
    }
    B.box(skin, -0.17, 0.15, -0.80, -0.52, 1.30, 1.43);                   /* MG mount base */
    B.box(dark, -0.35, 0.15, -0.80, -0.52, 1.43, 1.53);                   /* NSVT receiver with its box */
    B.rod(dark, 0.02, [0.15, -0.72, 1.48], [1.15, -0.72, 1.48], 6);
    B.rod(dark, 0.034, [0.90, -0.72, 1.48], [1.07, -0.72, 1.48], 6);
    B.box(dark, -0.50, -0.35, -0.60, -0.40, 1.34, 1.52);
    /* lifting eyes, roof ventilator, team flash */
    B.cyl(dark, "y", 0.11, 0.11, 0.05, 14, 0.80, 0.0, 1.17);
    B.cyl(dark, "y", 0.11, 0.11, 0.05, 14, -2.60, 0.0, 1.10);
    B.box(skin, -2.67, -2.20, -0.50, 0.50, 1.02, 1.12);
    for (k = 0; k < 5; k++) B.box(dark, -2.65 + k * 0.09, -2.60 + k * 0.09, -0.44, 0.44, 1.115, 1.145);
    B.box(team, -0.90, -0.35, -0.20, 0.16, 1.10, 1.13);
    /* radio whip on the roof behind the cupola (Ukrainian parade photograph;
       the preserved hulls and the Moscow parade photographs show none or one
       like it) */
    B.cyl(dark, "z", 0.06, 0.06, 0.10, 8, -0.55, 0.10, 1.15);
    B.rod(dark, 0.010, [-0.55, 0.10, 1.20], [-0.55, 0.10, 2.20], 4);
    B.flush(T);

    /* ================================================== 3. BARREL === */
    var TRX = 1.50, ZT = 0.70;
    var tubeEnd = 8.20 - (T.position.x + TRX);                              /* muzzle from the trunnion */
    var G = new THREE.Group(); G.name = "barrel";
    G.position.set(TRX, 0, ZT);
    /* rest pose level: the game lays the gun */
    var brakeL = 0.62, brakeR = 0.17, tubeStart = 0.45, tubeStop = tubeEnd - brakeL;
    B.cyl(bar, "x", 0.26, 0.19, 0.55, 22, 0.30, 0, 0);                       /* recoil sleeve at the mantlet */
    B.cyl(bar, "x", 0.125, 0.092, tubeStop - tubeStart, 22, (tubeStart + tubeStop) / 2, 0, 0);
    var ev = tubeStart + 0.52 * (tubeStop - tubeStart);                      /* bore evacuator, about the middle */
    B.cyl(bar, "x", 0.10, 0.16, 0.12, 22, ev - 0.32, 0, 0);
    B.cyl(bar, "x", 0.16, 0.16, 0.52, 22, ev, 0, 0);
    B.cyl(bar, "x", 0.16, 0.10, 0.12, 22, ev + 0.32, 0, 0);
    B.cyl(dark, "x", brakeR, brakeR, brakeL, 26, tubeEnd - brakeL / 2, 0, 0);   /* double-baffle muzzle brake */
    B.cyl(dark, "x", brakeR + 0.02, brakeR + 0.02, 0.06, 26, tubeEnd - brakeL + 0.08, 0, 0);
    B.cyl(dark, "x", brakeR + 0.02, brakeR + 0.02, 0.06, 26, tubeEnd - 0.08, 0, 0);
    B.cyl(dark, "x", brakeR + 0.02, brakeR + 0.02, 0.06, 26, tubeEnd - brakeL / 2, 0, 0);
    B.box(dark, tubeEnd - brakeL + 0.08, tubeEnd - 0.06, -brakeR - 0.03, brakeR + 0.03, -0.03, 0.03);
    B.box(dark, tubeEnd - brakeL + 0.08, tubeEnd - 0.06, -0.03, 0.03, -brakeR - 0.03, brakeR + 0.03);
    B.flush(G);
    T.add(G);
    root.add(T);

    root.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    root.updateMatrixWorld(true);
    root.position.z -= new THREE.Box3().setFromObject(root).min.z;
    return root;
  }
  return { build: build };
})();

UNIT_MODELS["pact_e80_spg"] = { len: 11.9, build: function (THREE, M, C) { return HeroMsta.build(THREE, M, C, "e80"); } };
UNIT_MODELS["pact_e90_spg"] = { len: 11.9, build: function (THREE, M, C) { return HeroMsta.build(THREE, M, C, "e90"); } };
UNIT_MODELS["pact_e00_spg"] = { len: 11.9, build: function (THREE, M, C) { return HeroMsta.build(THREE, M, C, "e00"); } };
UNIT_MODELS["spg_p"] = { len: 11.9, build: function (THREE, M, C) { return HeroMsta.build(THREE, M, C, "e20"); } };
