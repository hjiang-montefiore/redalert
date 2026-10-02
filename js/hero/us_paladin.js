/* ============ us_paladin.js - HERO models: the M109 self-propelled howitzer ====
   One hull-and-turret builder, four generations, five keys:

     nato_e60_spg  M109 (1963)        the short 155 mm/23 M126 tube, a plain
                                      boxed turret with only a small stowage
                                      box on its tail, olive drab
     nato_e80_spg  M109A2/A3 (1979)   the long 39-cal M185 tube, the big
                                      stacked-box bustle on the turret tail,
                                      NATO three-tone paint
     nato_e90_spg  M109A6 Paladin     the new slab-sided turret: a wedge roof,
                                      a deep gun-mount housing with a conical
                                      cradle cover, a vented bustle, two radio
                                      whips, the M284 tube and its big brake
     nato_e00_spg  M109A7 Paladin     the A6 turret on the Bradley-derived
     spg_n         present day        chassis: a taller, wider hull with a
                                      steep glacis, the wide rubber-padded
                                      Bradley track, 0.65 m road wheels, black
                                      mud flaps at the nose corners (spg_n is
                                      the same M109A7: rules.js names it
                                      "M109A7 Paladin", so it takes this model)

   What has to read at a glance, from the reference photographs (an M109A7
   photographed in Alaska, a Belgian M109A2 under a net, a Vietnam-era M109
   at Cu Chi, an M109A6 on exercise):
     - SEVEN road wheels a side (the A7, on the Bradley's running gear, has
       SIX: "reduced to 6 pairs", and the Alaska photograph shows six) with
       the drive sprocket at the FRONT and the idler at the rear, and no
       track return rollers: the upper run of the track lies on top of the
       wheels.
     - A flat-decked, slab-sided hull with a steep glacis; the driver's
       hatch front left, the louvred engine deck front right.
     - The turret sits at the REAR of the hull and overhangs its tail, so the
       gun lies across the whole front deck. The stowed spade is a big flat
       plate on the hull tail.
     - Commander's cupola and ring-mounted M2 at the right rear of the roof.
     - A cradle cover, then the tube with its bore evacuator two thirds of
       the way out and a double-baffle muzzle brake.

   Dimensions (published figures): hull 6.19 m long, 3.1 m wide, deck at
   about 1.8 m, ground clearance 0.46 m, track 0.38 m wide (A7: the 0.53 m
   Bradley track), seven 0.62 m road wheels (A7: six 0.65 m); overall length
   gun forward 6.6 m (M109), 9.1 m (A2) and about 9.7 m (A6, A7: the deeper
   bustle). The roof of the turret stands near 2.8 m.

   Model space: +X nose, +Y left (port), +Z up, real metres, tracks on z = 0.
   render3d.js scales the model by its measured X extent, so the muzzle sets
   the size: only proportions survive. The turret is the one node render3d
   trains (it sits on the ring centre, its gun along +X, and it is pushed
   back along X for recoil); the tube hangs in a "barrel" group inside it,
   pivoted on the trunnion and laid 7 degrees up, as in the photographs.
   The running gear is baked, as in the other hero armour: nothing here
   spins. Tracks and wheels are not named "roadwheel" for that reason.

   Draw calls: every static part is merged into one mesh per material, in
   three groups (hull, turret, barrel): 5 + 4 + 2 meshes, about 7,300 to
   7,600 triangles (the old rows were 2,336 to 4,712 triangles in 60 to 166
   meshes). Most of them are the track and its wheels: a rubber pad every
   0.19 m (A7: 0.18 m) round the belt, and 20-sided tyres.
   Materials: SKIN (camouflage canvas, mapped by metre so every plate shows
   the same scale of pattern), the plain barrel paint, DARK (muzzle brake,
   grilles, tracks), RUBBER (tyres, track pads), GLASS, and TEAM, which is
   exactly C.team: stand-in rows are repainted around it (eraPaint).
   Colours are authored in sRGB and left to prepModel() to linearise.
   ASCII only: a stray byte in a hex literal has broken this project before. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPaladin = (function () {
  "use strict";

  /* ------------------------------------------------------------ variants */
  /* gen 0 M109, 1 M109A2, 2 M109A6, 3 M109A7. tip is the muzzle's X on the
     hull. The hull block repeats because a hull is a set of numbers that
     several parts have to agree about. */
  var HULL_OLD = {
    tail: -3.10, nose: 3.09, zd: 1.80, wallY: 1.55, wallB: 0.90,
    glaX: 2.15, glaZ: 1.14, trkW: 0.38, trkCY: 1.36,
    wr: 0.31, tb: 0.05, hc: 0.04, nw: 7, w0: 1.75, wsp: 0.66, xs: 2.55, xr: -2.85
  };
  var HULL_A7 = {
    tail: -3.14, nose: 3.16, zd: 1.86, wallY: 1.64, wallB: 0.97,
    glaX: 2.62, glaZ: 1.22, trkW: 0.53, trkCY: 1.37,
    wr: 0.325, tb: 0.055, hc: 0.05, nw: 6, w0: 1.79, wsp: 0.79, xs: 2.58, xr: -2.97
  };
  var VARS = {
    e60: { id: "e60", gen: 0, hull: HULL_OLD, tip: 3.51, seed: 60631,
           base: "#4a5336", cols: ["#434b30", "#556040"], n: 12, r0: 40, r1: 70, alpha: 0.55,
           barrel: 0x3b4430 },
    e80: { id: "e80", gen: 1, hull: HULL_OLD, tip: 5.85, seed: 80791,
           base: "#3f4a30", cols: ["#5a4830", "#1e221b", "#4a5638"], n: 24, r0: 55, r1: 105, alpha: 0.92,
           barrel: 0x2c3126 },
    e90: { id: "e90", gen: 2, hull: HULL_OLD, tip: 5.85, seed: 90921,
           base: "#9a885e", cols: ["#85734b", "#ad9a6a", "#7a6a46"], n: 14, r0: 60, r1: 110, alpha: 0.60,
           barrel: 0x93815a },
    e00: { id: "e00", gen: 3, hull: HULL_A7, tip: 5.95, seed: 70171,
           base: "#a08f66", cols: ["#8d7c55", "#b2a073"], n: 10, r0: 60, r1: 110, alpha: 0.45,
           barrel: 0x9a8960 },
    e20: { id: "e20", gen: 3, hull: HULL_A7, tip: 5.95, seed: 20271,
           base: "#a79871", cols: ["#938258", "#baa97c", "#6d6a4c"], n: 12, r0: 60, r1: 115, alpha: 0.5,
           barrel: 0xa09068 }
  };

  /* ------------------------------------------------------------- helpers */
  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ------------------------------------------------------------ SKIN tex */
  /* One 512 canvas of paint: the base coat, camouflage patches drawn nine
     times so the pattern tiles, a few weld seams and a fine speckle. */
  var _cv = {};
  function paintCanvas(P) {
    if (_cv[P.id] !== undefined) return _cv[P.id];
    var W = 512, cv, g = null, R = rng(P.seed), i, ox, oy, x, y, rx, ry, rot;
    try {
      cv = document.createElement("canvas"); cv.width = W; cv.height = W;
      g = cv.getContext("2d");
    } catch (e) { g = null; }
    if (!g) { _cv[P.id] = null; return null; }
    g.fillStyle = P.base; g.fillRect(0, 0, W, W);
    for (i = 0; i < P.n; i++) {
      x = R() * W; y = R() * W; rx = P.r0 + R() * P.r1; ry = rx * (0.42 + R() * 0.3); rot = R() * 3.1416;
      g.fillStyle = P.cols[i % P.cols.length]; g.globalAlpha = P.alpha;
      for (ox = -W; ox <= W; ox += W) {
        for (oy = -W; oy <= W; oy += W) {
          g.beginPath(); g.ellipse(x + ox, y + oy, rx, ry, rot, 0, 6.2832); g.fill();
        }
      }
    }
    g.globalAlpha = 0.22; g.strokeStyle = "#15160f"; g.lineWidth = 1.5;
    for (i = 0; i < 6; i++) {
      y = (i + 0.5) * (W / 6) + (R() - 0.5) * 20;
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
      x = (i + 0.5) * (W / 6) + (R() - 0.5) * 20;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, W); g.stroke();
    }
    for (i = 0; i < 520; i++) {
      g.globalAlpha = 0.05 + R() * 0.10;
      g.fillStyle = (i & 1) ? "#12130d" : "#d9d3b8";
      g.fillRect(R() * W, R() * W, 1 + R() * 3, 1 + R() * 3);
    }
    g.globalAlpha = 1;
    _cv[P.id] = cv;
    return cv;
  }
  function texFor(THREE, P) {
    var cv = paintCanvas(P), t;
    if (!cv) return null;
    try {
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      /* r148: encoding is the switch that works; colorSpace does nothing */
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
      return t;
    } catch (e2) { return null; }
  }

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

  /* ------------------------------------------------------------- build() */
  function build(THREE, M, C, id) {
    var P = VARS[id], H = P.hull, gen = P.gen, s, k, i, yc, x, a;
    var root = new THREE.Group();
    root.name = "us_paladin_" + id;

    /* --- the materials: six ----------------------------------------- */
    var skin = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05 });
    var tex = texFor(THREE, P);
    if (tex) skin.map = tex; else skin.color.set(P.base);
    skin.userData.worldUV = 3.6;
    var bar = new THREE.MeshStandardMaterial({ color: P.barrel, roughness: 0.78, metalness: 0.12 });
    var dark = new THREE.MeshStandardMaterial({ color: 0x24272a, roughness: 0.58, metalness: 0.32 });
    var rub = new THREE.MeshStandardMaterial({ color: 0x1b1c1d, roughness: 0.95, metalness: 0.03 });
    var glass = new THREE.MeshStandardMaterial({ color: 0x1b2a33, roughness: 0.14, metalness: 0.3 });
    /* team flash: exactly the owner's colour, so a stand-in repaint leaves it */
    var team = new THREE.MeshStandardMaterial({
      color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.55, metalness: 0.12 });

    var ZD = H.zd, WB = H.wallB, NOSE = H.nose, TAIL = H.tail;
    var ZC = H.hc + H.tb + H.wr;              /* road wheel centre height  */
    var RO = H.wr + H.tb;                     /* belt outer radius         */
    var B = new Baker(THREE);

    /* ================================================== 1. HULL ====== */
    /* upper hull: a slab-sided box with a steep glacis */
    B.xz(skin, [[TAIL, WB], [TAIL, ZD], [H.glaX, ZD], [NOSE, H.glaZ], [NOSE, WB]], -H.wallY, H.wallY);
    /* the belly between the tracks, chamfered at the nose */
    var BI = H.trkCY - H.trkW / 2 - 0.02;
    B.xz(skin, [[TAIL + 0.06, 0.46], [TAIL + 0.06, WB], [NOSE - 0.01, WB], [NOSE - 0.01, 0.66], [NOSE - 0.26, 0.46]], -BI, BI);

    /* deck fittings */
    B.box(skin, 0.95, 1.95, -1.42, -0.25, ZD, ZD + 0.035);                /* engine deck, front right         */
    for (k = 0; k < 7; k++) B.box(dark, 1.02 + k * 0.13, 1.09 + k * 0.13, -1.36, -0.31, ZD + 0.03, ZD + 0.06);   /* its louvres */
    B.cyl(skin, "z", 0.27, 0.27, 0.09, 18, 1.85, 0.70, ZD + 0.045);       /* driver's hatch, front left       */
    for (k = -1; k <= 1; k++) B.box(glass, 2.04, 2.10, 0.70 + k * 0.17 - 0.06, 0.70 + k * 0.17 + 0.06, ZD, ZD + 0.07);
    B.box(team, 0.62, 1.28, 0.22, 0.96, ZD, ZD + 0.03);                   /* team flash on the deck           */
    B.box(dark, H.glaX - 0.34, H.glaX - 0.08, -0.24, 0.24, ZD, ZD + 0.26);   /* the tube's travel lock           */
    /* nose: headlamps and tow eyes, the spade plate on the tail */
    for (s = -1; s <= 1; s += 2) {
      B.box(glass, NOSE - 0.03, NOSE + 0.02, s * 1.15 - 0.09, s * 1.15 + 0.09, H.glaZ - 0.24, H.glaZ - 0.10);
      B.box(dark, NOSE - 0.04, NOSE + 0.05, s * 0.62 - 0.07, s * 0.62 + 0.07, 0.56, 0.70);
    }
    B.box(skin, TAIL - 0.13, TAIL - 0.02, -1.14, 1.14, 0.52, 1.64);       /* stowed spade, between the idlers */
    B.box(dark, TAIL - 0.15, TAIL - 0.02, -1.14, 1.14, 0.46, 0.60);       /* its blade edge                   */
    if (gen === 3) {
      /* the Bradley chassis: black rubber flaps over the nose corners */
      for (s = -1; s <= 1; s += 2) B.box(rub, NOSE - 0.02, NOSE + 0.06, s * 1.64 - 0.0, s * 1.05, 0.58, 1.08);
    }

    /* running gear, one side at a time */
    var outer = stadium(H.xr, H.xs, ZC, RO, 14), inner = stadium(H.xr, H.xs, ZC, H.wr, 14);
    var SPR = [], q;                                                        /* sprocket outline: twelve teeth */
    for (q = 0; q < 24; q++) {
      a = q * Math.PI / 12;
      SPR.push([H.xs + (q % 2 ? H.wr - 0.075 : H.wr - 0.012) * Math.cos(a), ZC + (q % 2 ? H.wr - 0.075 : H.wr - 0.012) * Math.sin(a)]);
    }
    var TW = gen === 3 ? 0.15 : 0.135, TO = gen === 3 ? 0.10 : 0.085;      /* tyre width, offset off the axle centre */
    var padL = along(stadium(H.xr, H.xs, ZC, RO + H.hc / 2, 14), gen === 3 ? 0.18 : 0.19);
    for (s = -1; s <= 1; s += 2) {
      yc = s * H.trkCY;
      B.xz(dark, outer, yc - H.trkW / 2, yc + H.trkW / 2, inner);          /* the belt, a ring                 */
      for (k = 0; k < padL.length; k++) {                                  /* the rubber pads on its face      */
        B.boxR(rub, 0.12, H.trkW - 0.05, H.hc, padL[k].x, yc, padL[k].z, -padL[k].a);
      }
      for (k = 0; k < H.nw; k++) {                                         /* road wheels: a pair of tyres on one painted hub */
        x = H.w0 - k * H.wsp;
        B.cyl(rub, "y", H.wr - 0.01, H.wr - 0.01, TW, 20, x, yc - TO, ZC);
        B.cyl(rub, "y", H.wr - 0.01, H.wr - 0.01, TW, 20, x, yc + TO, ZC);
        B.cyl(skin, "y", H.wr * 0.62, H.wr * 0.62, 2 * TO + TW + 0.04, 16, x, yc, ZC);
      }
      B.cyl(rub, "y", H.wr - 0.02, H.wr - 0.02, 0.28, 20, H.xr, yc, ZC);   /* rear idler                       */
      B.cyl(skin, "y", H.wr * 0.55, H.wr * 0.55, 0.33, 16, H.xr, yc, ZC);
      B.xz(dark, SPR, yc - 0.10, yc + 0.10);                               /* front drive sprocket, toothed    */
      B.cyl(skin, "y", H.wr * 0.50, H.wr * 0.50, 0.26, 16, H.xs, yc, ZC);
    }
    var hullG = new THREE.Group(); hullG.name = "hull";
    B.flush(hullG);
    root.add(hullG);

    /* ================================================ 2. TURRET ====== */
    /* origin on the ring centre at deck height; the gun lies along +X */
    var T = new THREE.Group(); T.name = "turret";
    T.position.set(-1.0, 0, ZD);
    var RF = gen >= 2 ? 1.02 : (gen === 1 ? 0.98 : 0.95);   /* roof height above the deck */
    var cab, wy = gen >= 1 ? 1.52 : 1.50;
    /* the A6/A7 bustle reaches well past the hull tail (about 0.7 m in the
       A7 and A6 photographs, against the A2's flush rear); that is also what
       brings the A7 to its quoted 9.7 m overall length */
    var BK = -2.85;
    if (gen <= 1) {
      cab = [[-1.55, -wy], [0.85, -wy], [gen === 1 ? 1.35 : 1.30, -0.92], [gen === 1 ? 1.35 : 1.30, 0.92], [0.85, wy], [-1.55, wy]];
      B.xy(skin, cab, 0, RF - 0.17);
      B.xy(skin, inset(cab, 0.10), RF - 0.17, RF);
    } else {
      cab = [[-1.50, -wy], [0.60, -wy], [1.20, -0.80], [1.20, 0.80], [0.60, wy], [-1.50, wy]];
      B.xy(skin, cab, 0, 0.70);
      /* the wedge roof: a step in, then the front slopes away */
      B.xz(skin, [[-1.50, 0.70], [-1.50, RF], [0.45, RF], [1.05, 0.82], [1.05, 0.70]], -1.30, 1.30);
    }
    /* the tail: a small box (M109), the stacked-box bustle (A2), the deep
       vented bustle (A6, A7) */
    if (gen === 0) {
      B.box(skin, -1.97, -1.53, -1.05, 1.05, 0.10, 0.86);
    } else if (gen === 1) {
      B.box(skin, -2.36, -1.53, -1.42, 1.42, 0.05, 0.94);
      B.box(dark, -2.385, -2.34, -1.38, 1.38, 0.30, 0.34);
      B.box(dark, -2.385, -2.34, -1.38, 1.38, 0.62, 0.66);
    } else {
      B.box(skin, BK, -1.48, -1.40, 1.40, 0.04, RF);
      for (k = -2; k <= 2; k++) B.box(dark, BK - 0.03, BK + 0.01, k * 0.40 - 0.07, k * 0.40 + 0.07, 0.24, RF - 0.18);
    }
    var tailX = gen === 0 ? -1.97 : (gen === 1 ? -2.36 : BK);
    var tailT = gen === 0 ? 0.86 : (gen === 1 ? 0.94 : RF);
    /* gun-mount housing at the front (A6, A7) */
    if (gen >= 2) B.box(skin, 0.95, 1.45, -0.50, 0.50, 0.24, RF - 0.03);
    /* roof: the left hatches, the right cupola with its M2, the team flash */
    B.cyl(skin, "z", 0.33, 0.33, 0.05, 18, -0.20, 0.66, RF + 0.025);
    B.cyl(skin, "z", 0.27, 0.27, 0.04, 18, -0.20, 0.66, RF + 0.07);
    B.cyl(skin, "z", 0.31, 0.31, 0.05, 18, -0.95, 0.66, RF + 0.025);
    B.cyl(skin, "z", 0.25, 0.25, 0.04, 18, -0.95, 0.66, RF + 0.07);
    B.cyl(skin, "z", 0.38, 0.38, 0.16, 20, -0.95, -0.78, RF + 0.08);       /* cupola ring          */
    B.cyl(dark, "z", 0.30, 0.30, 0.03, 18, -0.95, -0.78, RF + 0.165);
    for (k = 0; k < 6; k++) {                                              /* the cupola's vision blocks      */
      a = k * Math.PI / 3 + 0.3;
      B.boxZ(glass, 0.06, 0.14, 0.07, -0.95 + 0.385 * Math.cos(a), -0.78 + 0.385 * Math.sin(a), RF + 0.10, a);
    }
    B.box(dark, -1.10, -0.80, -0.84, -0.72, RF + 0.28, RF + 0.42);         /* M2 receiver          */
    B.rod(dark, 0.022, [-0.80, -0.78, RF + 0.35], [0.30, -0.78, RF + 0.35], 6);
    B.rod(dark, 0.03, [-0.95, -0.78, RF + 0.16], [-0.95, -0.78, RF + 0.30], 6);
    B.box(skin, -0.72, -0.68, -1.04, -0.52, RF + 0.20, RF + 0.55);        /* gun shield           */
    /* team flashes face up: on the roof (clear of the hatches), and on the tail */
    if (gen >= 2) B.box(team, -0.20, 0.40, -0.28, 0.32, RF + 0.03, RF + 0.06);
    else B.box(team, 0.02, 0.78, -0.32, 0.30, RF, RF + 0.03);
    B.box(team, tailX + 0.08, tailX + (gen === 0 ? 0.36 : 0.58), -0.42, 0.42, tailT, tailT + 0.03);
    if (gen >= 2) B.box(skin, -0.30, 0.44, -0.35, 0.40, RF, RF + 0.03);   /* raised roof plate     */
    if (gen === 3) {
      B.box(skin, 0.50, 0.95, -0.98, -0.60, RF, RF + 0.28);               /* the A7's sight box, front right */
      B.box(glass, 0.945, 0.97, -0.94, -0.64, RF + 0.08, RF + 0.22);
    }
    /* radio whips: one on the M109, two later */
    var wh = gen >= 2 ? 2.4 : 1.9;
    B.cyl(dark, "z", 0.05, 0.05, 0.12, 8, tailX + 0.30, -1.20, RF + 0.06);
    B.rod(dark, 0.011, [tailX + 0.30, -1.20, RF + 0.10], [tailX + 0.30, -1.20, RF + wh], 4);
    if (gen >= 1) {
      B.cyl(dark, "z", 0.05, 0.05, 0.12, 8, tailX + 0.30, 1.20, RF + 0.06);
      B.rod(dark, 0.011, [tailX + 0.30, 1.20, RF + 0.10], [tailX + 0.30, 1.20, RF + wh - 0.4], 4);
    }
    B.flush(T);

    /* ================================================ 3. BARREL ====== */
    var TRX = 0.95, ZT = gen >= 2 ? 0.68 : 0.62;
    var tubeEnd = P.tip - (T.position.x + TRX);            /* muzzle, from the trunnion */
    var brakeL = gen >= 2 ? 0.60 : 0.52, brakeR = gen >= 2 ? 0.175 : 0.16;
    var G = new THREE.Group(); G.name = "barrel";
    G.position.set(TRX, 0, ZT);
    G.rotation.y = -0.12;                                   /* 7 degrees up */
    var sleeveEnd = gen >= 2 ? 1.55 : 1.25;
    if (gen >= 2) B.cyl(bar, "x", 0.31, 0.21, sleeveEnd - 0.40, 20, 0.40 + (sleeveEnd - 0.40) / 2, 0, 0);
    else B.cyl(bar, "x", 0.215, 0.215, sleeveEnd - 0.30, 20, 0.30 + (sleeveEnd - 0.30) / 2, 0, 0);
    var tubeStart = sleeveEnd - 0.04, tubeStop = tubeEnd - brakeL;
    B.cyl(bar, "x", 0.118, 0.094, tubeStop - tubeStart, 20, (tubeStart + tubeStop) / 2, 0, 0);
    /* the bore evacuator, two thirds out, with a cone at each end */
    var ev = tubeStart + 0.60 * (tubeStop - tubeStart), evR = gen >= 2 ? 0.155 : 0.145;
    B.cyl(bar, "x", 0.100, evR, 0.12, 20, ev - 0.34, 0, 0);
    B.cyl(bar, "x", evR, evR, 0.50, 20, ev, 0, 0);
    B.cyl(bar, "x", evR, 0.096, 0.12, 20, ev + 0.31, 0, 0);
    /* the double-baffle muzzle brake and its two flanges */
    B.cyl(dark, "x", brakeR, brakeR, brakeL, 24, tubeEnd - brakeL / 2, 0, 0);
    B.box(dark, tubeEnd - brakeL + 0.06, tubeEnd - 0.05, -brakeR - 0.03, brakeR + 0.03, -0.035, 0.035);
    B.box(dark, tubeEnd - brakeL + 0.06, tubeEnd - 0.05, -0.035, 0.035, -brakeR - 0.03, brakeR + 0.03);
    B.flush(G);
    T.add(G);
    root.add(T);

    root.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    /* the track pads on the curved runs dip a few millimetres under z = 0:
       seat the whole model so its lowest point is exactly on the ground */
    root.updateMatrixWorld(true);
    root.position.z -= new THREE.Box3().setFromObject(root).min.z;
    return root;
  }

  return { build: build };
})();

UNIT_MODELS["nato_e60_spg"] = {
  len: 6.76,
  build: function (THREE, M, C) { return HeroPaladin.build(THREE, M, C, "e60"); }
};
UNIT_MODELS["nato_e80_spg"] = {
  len: 9.21,
  build: function (THREE, M, C) { return HeroPaladin.build(THREE, M, C, "e80"); }
};
UNIT_MODELS["nato_e90_spg"] = {
  len: 9.71,
  build: function (THREE, M, C) { return HeroPaladin.build(THREE, M, C, "e90"); }
};
UNIT_MODELS["nato_e00_spg"] = {
  len: 9.81,
  build: function (THREE, M, C) { return HeroPaladin.build(THREE, M, C, "e00"); }
};
UNIT_MODELS["spg_n"] = {
  len: 9.81,
  build: function (THREE, M, C) { return HeroPaladin.build(THREE, M, C, "e20"); }
};
