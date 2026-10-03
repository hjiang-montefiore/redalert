/* ===== us_m548_family.js - HERO models: the carriers on the M548 chassis ======
   Two rows, one hull.
     nato_e60_sam    M727 Self-Propelled Improved HAWK (1969): the M192 triple
                     launcher on the open deck of an M548, three MIM-23B rounds
     nato_e80_ewveh  AN/MLQ-34 TACJAM on the M1015 carrier (1985): an S-595/G
                     shelter on an M548 with a ground-rod driver on the bow and
                     the canister behind the cab (the stowed mast) as the
                     trained part

   Both are the M548 tracked cargo carrier (an M113 stretched to five road
   wheels, a cab across the whole front, a cargo bed behind it) with a
   different load.  The drawing "M548 dimensions" (TM figure, in inches) fixes
   the chassis: 226.5 in (5.75 m) long, 105.8 in (2.69 m) wide, cab roof at
   105.5 in (2.68 m), cargo-bed rail at 76 in (1.93 m), track centres 85 in
   apart, track 15 in wide, ground clearance 16 in, approach 22.5 deg, departure
   13.5 deg, sprocket 29.3 in behind the nose, five road wheels 27.75 in apart
   (111 in over four gaps), idler 26 in behind the last.  Front sprocket, rear
   idler, no return rollers, as the M548 article says.  That is what the belt
   outline, the wheel stations and the cab block below are cut from.

   M727.  Reference photographs: the US Army right-side view at a Black Forest
   site (DPLA copy on Commons), the Israeli Air Force Museum example at
   Hatzerim (Bukvoed, 2006) and an Army march-order photograph of a platoon.
   What they fix: the cab is a tall full-width block on the bow with its
   greenhouse raked forward and a roof that slopes away to the rear; behind
   it the deck is open and flat, with a ladder on the right side of the cab
   rear, a long equipment box over the rear deck and the launcher on a
   pedestal on that box; a large drum hangs on the tail (read as the cable
   reel; the photographs do not label it).  The launcher carries three
   rounds, stowed pointing FORWARD with their tails hanging 1.4 m past the
   hull; 6.5 degrees up as in the Black Forest photograph (the march-order
   photograph shows a steeper stow).  The round is the MIM-23B Improved HAWK
   the row names: 5.03 m long, 0.37 m body, four long-chord clipped-delta
   wings from mid-body to the boat-tail, 1.21 m span as published for the
   family.  The row says "three MIM-23 rounds on an open frame", which is
   what the photographs show.  Olive drab, since the row is 1969.

   M1015.  References: the TM drawing "M1015 Electronic Warfare Shelter
   Carrier major components" (an M548 modified to carry an S-595/G shelter,
   with a ground-rod driver on the bow) and an Army photograph of an
   AN/MLQ-34 TACJAM being moved to a museum in 2011.  Both fix the layout
   behind the large-windowed cab: a box fills the 0.8 m between the cab's
   rear wall and the shelter's front wall, a canister lies on that box
   against the shelter, and the shelter itself is a tall plain-green box
   (about 0.65 m over the cab roof) from there back to about 0.4 m short of
   the tail, with its door on the port side in the rear half and the five
   panels of the carrier's side wall under it; the rod driver stands at
   the right corner of the bow; woodland paint on the carrier, since the row
   is 1985.  The drawing adds the roof frame, a tube rack on stand-offs that
   reaches forward over the cab on two braces.  NOT CONFIRMED: the frame is
   in the drawing only (the photograph shows a bare roof), so it sits behind
   the row flag "frame"; no reference shows an antenna group raised, so none
   is drawn; the shelter height (roof 3.32 m) is scaled from the drawing and
   the photograph, no published figure was found.

   Turret.  The launcher of the M727 is the node "turret" (ring centre on the
   deck, rounds along +X); on the TACJAM it is the canister on the box behind
   the cab, which I take to be the stowed mast (the references show it and
   name nothing), so it swings to the target as the antenna would; it is
   short enough to turn all the way round between the cab and the shelter.
   Both rows have turret:true.  The road wheels are five "roadwheel" groups,
   both sides of an axle in each, axle on local Y.  The belts, sprockets
   and idlers are baked.

   Draw calls and materials: bodies are merged to one mesh per material.
   Materials: SKIN (paint canvas), DARK, STEEL, RUBBER, GLASS, TEAM, plus the
   missile paint on the M727 and the plain shelter green on the M1015.  The
   team flash is exactly C.team (cab roof panel, the rear-box top and the
   deck panel on the M727, the shelter roof panel on the M1015), all facing
   up for the RTS camera, which ERA_KIT repainting needs.

   Model space: +X nose, +Y left (port), +Z up, metres; tracks on z = 0.
   ASCII only.  Colours are authored in sRGB (prepModel linearises) and pushed
   a little darker than the finished tone for the ACES pass, as the other
   hero files do.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroUsM548 = (function () {
  "use strict";

  var ROWS = {
    nato_e60_sam:   { veh: "m727",  paint: "olive", turret: true },
    nato_e80_ewveh: { veh: "m1015", paint: "wood",  turret: true, frame: true }
  };

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ---------------------------------------------------------------- paint */
  /* olive: the 1960s drab, the same #4a5a2e the M60A1 hero wears (its table
     value pushed up in chroma so the tone map does not grey it).  wood: the
     MERDC woodland of the 1980s, green with brown and black blocks. */
  var _cv = {};
  function blob(q, R, cx, cy, rad, sx) {
    var n = 9, i, a, r, px, py;
    q.beginPath();
    for (i = 0; i < n; i++) {
      a = i / n * Math.PI * 2; r = rad * (0.55 + R() * 0.75);
      px = cx + Math.cos(a) * r * sx; py = cy + Math.sin(a) * r;
      if (i === 0) q.moveTo(px, py); else q.lineTo(px, py);
    }
    q.closePath(); q.fill();
  }
  function paintCanvas(kind) {
    if (_cv[kind]) return _cv[kind];
    var R = rng(kind === "wood" ? 5521 : 3307), W = 256, i, cv, q, x, y;
    try {
      cv = document.createElement("canvas"); cv.width = W; cv.height = W;
      q = cv.getContext("2d");
      if (kind === "wood") {
        q.fillStyle = "#4a5a36"; q.fillRect(0, 0, W, W);
        var cols = ["#5b4a30", "#22251f", "#3b4b2a", "#5b4a30", "#26291f"];
        for (i = 0; i < 30; i++) { q.fillStyle = cols[i % cols.length]; blob(q, R, R() * W, R() * W, 16 + R() * 30, 1.5 + R() * 0.8); }
      } else {
        q.fillStyle = "#4a5a2e"; q.fillRect(0, 0, W, W);
        for (i = 0; i < 40; i++) {
          q.globalAlpha = 0.10 + R() * 0.14;
          q.fillStyle = R() < 0.5 ? "#333f20" : "#69763c";
          q.beginPath(); q.ellipse(R() * W, R() * W, 30 + R() * 90, 20 + R() * 60, R() * 3.14, 0, 6.2832); q.fill();
        }
        q.globalAlpha = 1;
      }
      /* rubbed paint, grime, and road dust on the lowest part */
      for (i = 0; i < 40; i++) {
        q.fillStyle = (i & 1) ? "rgba(214,200,160,0.07)" : "rgba(20,18,12,0.12)";
        x = R() * W; y = R() * W; q.fillRect(x, y, 3 + R() * 18, 1 + R() * 3);
      }
    } catch (e) { return null; }
    _cv[kind] = cv;
    return cv;
  }
  function canvasTex(THREE, cv) {
    try {
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
      return t;
    } catch (e) { return null; }
  }
  function makeMats(THREE, C, kind) {
    var T = {}, cv = paintCanvas(kind), tx = cv ? canvasTex(THREE, cv) : null;
    T.skin = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.90, metalness: 0.04 });
    if (tx) T.skin.map = tx; else T.skin.color.setHex(kind === "wood" ? 0x4a5a36 : 0x4a5a2e);
    T.skin.userData.worldUV = 5.0;
    T.dark  = new THREE.MeshStandardMaterial({ color: 0x24251f, roughness: 0.82, metalness: 0.20 });
    T.steel = new THREE.MeshStandardMaterial({ color: 0x4a4d4f, roughness: 0.50, metalness: 0.38 });
    T.rub   = new THREE.MeshStandardMaterial({ color: 0x151514, roughness: 0.95, metalness: 0.02 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1c2a31, roughness: 0.14, metalness: 0.30 });
    T.drab   = new THREE.MeshStandardMaterial({ color: 0x5d6747, roughness: 0.55, metalness: 0.15 });
    /* the S-595/G shelter and the box ahead of it are plain green in the
       photograph, not in the carrier's camouflage pattern */
    if (kind === "wood") T.shel = new THREE.MeshStandardMaterial({ color: 0x46543a, roughness: 0.88, metalness: 0.05 });
    /* team flash: exactly the owner's colour */
    T.team  = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                               roughness: 0.60, metalness: 0.10 });
    return T;
  }

  /* ------------------------------------------------------------ triangles */
  /* A triangle soup that orients every face away from a hint point; every
     prism below is convex, so there is no winding to get wrong. */
  function Soup() { this.p = []; this.n = []; }
  Soup.prototype.tri = function (a, b, c, away) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var l = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (l < 1e-9) return;
    nx /= l; ny /= l; nz /= l;
    var cx = (a[0] + b[0] + c[0]) / 3 - away[0];
    var cy = (a[1] + b[1] + c[1]) / 3 - away[1];
    var cz = (a[2] + b[2] + c[2]) / 3 - away[2];
    if (nx * cx + ny * cy + nz * cz < 0) { var t = b; b = c; c = t; nx = -nx; ny = -ny; nz = -nz; }
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    this.n.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
  };
  Soup.prototype.quad = function (a, b, c, d, away) { this.tri(a, b, c, away); this.tri(a, c, d, away); };
  Soup.prototype.geo = function (THREE) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(new Array(this.p.length / 3 * 2).fill(0), 2));
    return g;
  };

  /* Box projection by each triangle's own facing, S metres of paint to the canvas */
  function worldUV(P, U, S) {
    for (var t = 0; t < P.length / 9; t++) {
      var o = t * 9;
      var ux = P[o + 3] - P[o], uy = P[o + 4] - P[o + 1], uz = P[o + 5] - P[o + 2];
      var vx = P[o + 6] - P[o], vy = P[o + 7] - P[o + 1], vz = P[o + 8] - P[o + 2];
      var nx = Math.abs(uy * vz - uz * vy), ny = Math.abs(uz * vx - ux * vz), nz = Math.abs(ux * vy - uy * vx);
      for (var k = 0; k < 3; k++) {
        var x = P[o + k * 3], y = P[o + k * 3 + 1], z = P[o + k * 3 + 2], u, v;
        if (nz >= nx && nz >= ny) { u = x / S; v = y / S; }
        else if (nx >= ny) { u = y / S + 0.5; v = z / S; }
        else { u = x / S; v = z / S; }
        U[t * 6 + k * 2] = u; U[t * 6 + k * 2 + 1] = v;
      }
    }
  }

  /* One merged mesh per material.  `pre` is an optional matrix every part is
     put through on the way in: the launcher's elevation. */
  function Baker(THREE) { this.T = THREE; this.by = []; this.pre = null; }
  Baker.prototype.add = function (mat, geo) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    if (this.pre) g.applyMatrix4(this.pre);
    for (var i = 0; i < this.by.length; i++) if (this.by[i].mat === mat) { this.by[i].g.push(g); return; }
    this.by.push({ mat: mat, g: [g] });
  };
  Baker.prototype.put = function (mat, geo, x, y, z, rx, ry, rz) {
    var T = this.T, m = new T.Matrix4();
    m.compose(new T.Vector3(x, y, z),
              new T.Quaternion().setFromEuler(new T.Euler(rx || 0, ry || 0, rz || 0)),
              new T.Vector3(1, 1, 1));
    geo.applyMatrix4(m);
    this.add(mat, geo);
  };
  Baker.prototype.box = function (mat, sx, sy, sz, x, y, z, rx, ry, rz) {
    this.put(mat, new this.T.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  };
  /* box from min/max corners; mirrored callers may hand them swapped */
  Baker.prototype.bb = function (mat, x0, x1, y0, y1, z0, z1) {
    var t;
    if (x1 < x0) { t = x0; x0 = x1; x1 = t; }
    if (y1 < y0) { t = y0; y0 = y1; y1 = t; }
    if (z1 < z0) { t = z0; z0 = z1; z1 = t; }
    this.box(mat, x1 - x0, y1 - y0, z1 - z0, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  };
  /* cylinder on a world axis ("x", "y" or "z"); r2 is the far-end radius */
  Baker.prototype.cyl = function (mat, r, len, seg, x, y, z, axis, r2) {
    var g = new this.T.CylinderGeometry(r2 === undefined ? r : r2, r, len, seg);
    if (axis === "x") this.put(mat, g, x, y, z, 0, 0, -Math.PI / 2);
    else if (axis === "z") this.put(mat, g, x, y, z, Math.PI / 2, 0, 0);
    else this.put(mat, g, x, y, z);
  };
  /* convex XZ polygon extruded across Y from y0 to y1; M an optional matrix */
  Baker.prototype.prism = function (mat, pts, y0, y1, M) {
    var S = new Soup(), n = pts.length, cx = 0, cz = 0, i;
    for (i = 0; i < n; i++) { cx += pts[i][0]; cz += pts[i][1]; }
    cx /= n; cz /= n;
    var away = [cx, (y0 + y1) / 2, cz], c0 = [cx, y0, cz], c1 = [cx, y1, cz];
    for (i = 0; i < n; i++) {
      var a = pts[i], b = pts[(i + 1) % n];
      var a0 = [a[0], y0, a[1]], b0 = [b[0], y0, b[1]], a1 = [a[0], y1, a[1]], b1 = [b[0], y1, b[1]];
      S.tri(c0, a0, b0, away); S.tri(c1, a1, b1, away);
      S.quad(a0, b0, b1, a1, away);
    }
    var g = S.geo(this.T);
    if (M) g.applyMatrix4(M);
    this.add(mat, g);
  };
  /* a body of revolution about +X: prof is [[x, r], ...] from tail to nose */
  Baker.prototype.lathe = function (mat, prof, seg, M) {
    var T = this.T, pts = [], i;
    for (i = 0; i < prof.length; i++) pts.push(new T.Vector2(prof[i][1], prof[i][0]));
    var g = new T.LatheGeometry(pts, seg);
    g.applyMatrix4(new T.Matrix4().makeRotationZ(-Math.PI / 2));
    if (M) g.applyMatrix4(M);
    this.add(mat, g);
  };
  Baker.prototype.flush = function (group) {
    var THREE = this.T;
    for (var i = 0; i < this.by.length; i++) {
      var e = this.by[i], n = 0, j;
      for (j = 0; j < e.g.length; j++) n += e.g[j].attributes.position.count;
      var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2), o = 0;
      for (j = 0; j < e.g.length; j++) {
        var g = e.g[j], c = g.attributes.position.count;
        P.set(g.attributes.position.array, o * 3);
        if (g.attributes.normal) N.set(g.attributes.normal.array, o * 3);
        if (g.attributes.uv) U.set(g.attributes.uv.array, o * 2);
        o += c;
      }
      var S = e.mat.userData && e.mat.userData.worldUV;
      if (S) worldUV(P, U, S);
      var geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(N, 3));
      geo.setAttribute("uv", new THREE.BufferAttribute(U, 2));
      geo.computeBoundingSphere();
      var mesh = new THREE.Mesh(geo, e.mat);
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
    this.by = [];
  };

  /* convex hull of 2D points (monotone chain) */
  function hull2(p) {
    p = p.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var lo = [], up = [], i;
    for (i = 0; i < p.length; i++) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p[i]) <= 1e-12) lo.pop(); lo.push(p[i]); }
    for (i = p.length - 1; i >= 0; i--) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], p[i]) <= 1e-12) up.pop(); up.push(p[i]); }
    up.pop(); lo.pop();
    return lo.concat(up);
  }

  /* ------------------------------------------------------- the M548 chassis */
  /* Stations in metres from the hull centre, cut from the "M548 dimensions"
     drawing (inches, from the nose): sprocket 29.3 in, road wheels at 56.2 in
     and every 27.75 in after, idler at 193 in, tail at 226.5 in.  Track gauge
     85 in, track 15 in wide. */
  var WX = [1.450, 0.745, 0.040, -0.665, -1.370];   /* road wheel axles */
  var WZ = 0.375, WR = 0.30, BR = 0.375;            /* axle height, tyre radius, belt radius */
  var SPX = 2.133, SPZ = 0.52, SPR = 0.34;          /* drive sprocket, front */
  var IDX = -2.02, IDZ = 0.50, IDR = 0.27;          /* idler, rear */
  var TY0 = 0.889, TY1 = 1.270;                     /* track inner and outer faces */
  var NOSE = 2.80, TAIL = -2.877;                   /* hull plate and the tail */

  /* connector blocks round a curved end of the belt */
  function beltArc(K, mat, THREE, cx, cz, r, a0, a1, n, y) {
    for (var i = 0; i <= n; i++) {
      var a = a0 + (a1 - a0) * i / n;
      K.put(mat, new THREE.BoxGeometry(0.06, 0.06, 0.12), cx + r * Math.cos(a), y, cz + r * Math.sin(a), 0, -a, 0);
    }
  }
  function drum(K, T, THREE, s, x, z, r, nt) {
    var i, a;
    K.cyl(T.dark, r, 0.25, 24, x, s * 1.145, z, "y");
    K.cyl(T.steel, r * 0.42, 0.03, 12, x, s * 1.285, z, "y");
    for (i = 0; i < nt; i++) {
      a = i * Math.PI * 2 / nt;
      K.put(T.steel, new THREE.BoxGeometry(0.05, 0.05, 0.07), x + r * 0.95 * Math.cos(a), s * 1.245, z + r * 0.95 * Math.sin(a), 0, -a, 0);
    }
  }

  /* belts, sprocket, idler, belly and the sponsons: everything below the deck */
  function undercarriage(K, T, THREE) {
    var s, i, a, x, pts = [], k, circ = [[SPX, SPZ, SPR], [IDX, IDZ, IDR]];
    for (i = 0; i < 5; i++) circ.push([WX[i], WZ, BR]);
    for (k = 0; k < circ.length; k++)
      for (i = 0; i < 24; i++) { a = i * Math.PI / 12; pts.push([circ[k][0] + circ[k][2] * Math.cos(a), circ[k][1] + circ[k][2] * Math.sin(a)]); }
    var belt = hull2(pts);
    for (s = -1; s <= 1; s += 2) {
      K.prism(T.dark, belt, s * TY0, s * 1.20);
      /* end connectors along the lower run and round the lower halves of the
         two curved ends: the part of the track anyone sees */
      for (x = -1.76; x < 1.76; x += 0.17) K.box(T.steel, 0.10, 0.045, 0.06, x, s * 1.222, 0.035);
      beltArc(K, T.steel, THREE, SPX, SPZ, SPR + 0.01, -Math.PI / 2 + 0.25, 0.55, 5, s * 1.222);
      beltArc(K, T.steel, THREE, IDX, IDZ, IDR + 0.01, 1.95, Math.PI * 1.5 - 0.30, 5, s * 1.222);
      drum(K, T, THREE, s, SPX, SPZ, 0.30, 11);
      drum(K, T, THREE, s, IDX, IDZ, 0.22, 9);
    }
    /* belly, glacis and nose plate between the tracks, then the sponsons over them */
    K.prism(T.skin, [[-2.70, 0.50], [-2.70, 0.95], [NOSE, 0.95], [NOSE, 0.80], [2.55, 0.55], [2.20, 0.41], [-2.55, 0.41]], -0.90, 0.90);
    K.bb(T.skin, TAIL, NOSE, -1.344, 1.344, 0.72, 0.95);
    for (s = -1; s <= 1; s += 2) {
      /* tow eyes on the bow and a pintle plate on the tail */
      K.box(T.steel, 0.08, 0.10, 0.12, NOSE + 0.035, s * 0.55, 1.05);
      K.box(T.steel, 0.07, 0.12, 0.12, TAIL - 0.03, s * 0.55, 0.84);
      /* headlamp guard on the bow corner, tail lamp on the tail */
      K.box(T.glass, 0.05, 0.20, 0.12, NOSE + 0.005, s * 1.02, 1.12);
      K.box(T.dark, 0.04, 0.26, 0.18, NOSE - 0.005, s * 1.02, 1.12);
      K.box(T.glass, 0.04, 0.16, 0.10, TAIL - 0.005, s * 1.15, 1.00);
    }
  }

  /* One road wheel of each side in one mesh: tyre, a rim a step proud of it,
     the hub and six hub nuts.  Local origin is the axle line at hull centre. */
  function wheelBake(W, T, s) {
    var i, a, y = s * 1.17;
    W.cyl(T.rub, WR, 0.20, 24, 0, y, 0, "y");
    W.cyl(T.rub, 0.215, 0.215, 16, 0, y, 0, "y");
    W.cyl(T.rub, 0.095, 0.23, 10, 0, y, 0, "y");
    for (i = 0; i < 4; i++) {
      a = i * Math.PI / 2 + 0.4;
      W.box(T.rub, 0.034, 0.02, 0.034, 0.16 * Math.cos(a), s * 1.285, 0.16 * Math.sin(a), 0, -a, 0);
    }
  }
  function roadWheels(root, T, THREE) {
    for (var i = 0; i < 5; i++) {
      var W = new Baker(THREE), g = new THREE.Group();
      wheelBake(W, T, -1); wheelBake(W, T, 1);
      W.flush(g);
      g.name = "roadwheel";
      g.position.set(WX[i], 0, WZ);
      root.add(g);
    }
  }

  /* The cab of the M548: a full-width block on the bow, hull block to the cab
     floor line, a greenhouse above it raked forward.  rear is where the cab
     ends (1.41 on the cargo carrier, 0.55 on the M727 which has no cargo
     walls); slope makes the greenhouse roof fall away aft as on the M727. */
  function cab(K, T, THREE, rear, slope, big) {
    var s, i, ZB = 1.97, ZR = 2.68, XR = rear;
    K.bb(T.skin, XR, NOSE, -1.28, 1.28, 0.95, ZB);
    var pts = slope ? [[NOSE, ZB], [2.32, ZR], [1.45, ZR], [0.62, 2.19], [0.62, ZB]]
                    : [[NOSE, ZB], [2.32, ZR], [XR + 0.04, ZR], [XR, ZB]];
    K.prism(T.skin, pts, -1.25, 1.25);
    /* the two small front panes, set high on the raked face: Y -1.09..-0.44
       and +0.40..+1.02 from the front view of the drawing */
    var ph = Math.atan2(0.46, 0.71), nx = Math.cos(ph) * 0.0 + 0.0;
    var fz = 2.35, fx = NOSE - (fz - ZB) / (ZR - ZB) * (NOSE - 2.32);
    var ys = big ? [-0.63, 0.63] : [-0.765, 0.71], ws = big ? [1.0, 1.0] : [0.65, 0.62];
    var ph2 = big ? 0.62 : 0.45;
    if (big) fz = 2.33, fx = NOSE - (fz - ZB) / (ZR - ZB) * (NOSE - 2.32);
    for (i = 0; i < 2; i++) {
      K.box(T.dark, 0.03, ws[i] + 0.08, ph2 + 0.05, fx + 0.012, ys[i], fz, 0, -ph, 0);
      K.box(T.glass, 0.03, ws[i], ph2, fx + 0.022, ys[i], fz, 0, -ph, 0);
    }
    for (s = -1; s <= 1; s += 2) {
      /* side window and its frame, door seam, handle, a step */
      K.box(T.dark, 0.70, 0.026, 0.54, 1.93, s * 1.262, 2.34);
      K.box(T.glass, 0.61, 0.034, 0.46, 1.93, s * 1.265, 2.34);
      K.box(T.dark, 0.03, 0.022, 0.96, 1.50, s * 1.287, 1.46);
      K.box(T.dark, 0.03, 0.022, 0.96, 2.40, s * 1.287, 1.46);
      K.box(T.steel, 0.16, 0.04, 0.035, 1.62, s * 1.305, 1.62);
      K.bb(T.steel, 2.10, 2.60, s * 1.345, s * 1.285, 1.00, 1.04);
      /* lifting eyes on the roof corners */
      K.box(T.steel, 0.10, 0.08, 0.06, 2.20, s * 1.05, ZR + 0.03);
    }
  }

  /* ------------------------------------------------------------ the HAWK */
  /* One MIM-23B on the launcher: axis along +X through the origin of the
     matrix M, tail at -2.515 and nose at +2.515.  Body 0.37 m across, a
     boat-tail, an ogive nose, four clipped-delta wings from mid-body to the
     tail (1.21 m span) set at 45 deg so the neighbours' wings interleave. */
  function missile(KT, T, yy, zz) {
    var THREE = KT.T, k, M = new THREE.Matrix4().makeTranslation(0, yy, zz), Mr;
    var prof = [[-2.515, 0.0], [-2.515, 0.15], [-2.06, 0.185], [1.70, 0.185], [1.84, 0.17], [2.01, 0.14],
                [2.19, 0.10], [2.35, 0.06], [2.46, 0.025], [2.515, 0.0]];
    KT.lathe(T.drab, prof, 14, M);
    /* wing: root chord from -2.36 to +0.10, tip chord 0.5 m at 0.605 m span */
    var wing = [[-2.36, 0.17], [0.10, 0.17], [-0.62, 0.605], [-1.12, 0.605]];
    for (k = 0; k < 4; k++) {
      Mr = new THREE.Matrix4().makeTranslation(0, yy, zz);
      Mr.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 4 + k * Math.PI / 2));
      KT.prism(T.drab, wing, -0.012, 0.012, Mr);
    }
  }

  /* The M192 launcher head and its three rounds, about the traverse ring
     (origin: ring centre on the equipment box).  The pedestal and head do not
     elevate; the beam and the rounds do, about the trunnion 0.95 m up, by the
     few degrees the photographs show. */
  function launcher(KT, T, THREE) {
    var i, s, EL = 0.113;
    KT.cyl(T.dark, 0.60, 0.12, 24, 0, 0, 0.06, "z");
    KT.cyl(T.skin, 0.45, 0.30, 14, 0, 0, 0.27, "z");
    KT.bb(T.skin, -0.70, 0.52, -0.52, 0.52, 0.40, 0.82);
    KT.bb(T.dark, -0.30, 0.30, -0.54, 0.54, 0.52, 0.64);          /* trunnion housing */
    /* control box and a handle plate on the head, port side */
    KT.bb(T.steel, 0.05, 0.40, 0.55, 0.585, 0.46, 0.74);
    KT.bb(T.dark, -0.60, -0.20, 0.52, 0.56, 0.48, 0.74);
    for (s = -1; s <= 1; s += 2) {
      KT.bb(T.steel, -0.10, 0.10, s * 0.50, s * 0.60, 0.82, 1.05);   /* yoke arms */
      KT.cyl(T.steel, 0.075, 0.14, 12, 0, s * 0.60, 0.95, "y");
    }
    /* beam, rails, clamps and the rounds: the elevating assembly */
    KT.pre = new THREE.Matrix4().makeTranslation(0, 0, 0.95)
      .multiply(new THREE.Matrix4().makeRotationY(-EL))
      .multiply(new THREE.Matrix4().makeTranslation(0, 0, -0.95));
    var Y = [0.62, -0.62, 0.0], Z = [1.25, 1.25, 0.93];
    KT.bb(T.dark, -2.00, 0.55, -0.16, 0.16, 0.54, 0.68);          /* the beam */
    KT.bb(T.dark, -2.00, -1.88, -0.80, 0.80, 0.54, 0.66);         /* rear cross-beam */
    KT.bb(T.dark, 0.10, 0.28, -0.80, 0.80, 0.54, 0.66);           /* forward cross-beam */
    for (i = 0; i < 3; i++) {
      KT.bb(T.dark, -2.05, 1.10, Y[i] - 0.04, Y[i] + 0.04, Z[i] - 0.25, Z[i] - 0.17);  /* the rail */
      KT.bb(T.steel, -1.98, -1.80, Y[i] - 0.10, Y[i] + 0.10, Z[i] - 0.24, Z[i] - 0.10);
      KT.bb(T.steel, 0.10, 0.28, Y[i] - 0.10, Y[i] + 0.10, Z[i] - 0.24, Z[i] - 0.10);
      if (i < 2) {   /* the outer rounds ride higher: a strut up from each cross-beam */
        KT.bb(T.steel, -1.96, -1.82, Y[i] - 0.06, Y[i] + 0.06, 0.64, Z[i] - 0.22);
        KT.bb(T.steel, 0.12, 0.26, Y[i] - 0.06, Y[i] + 0.06, 0.64, Z[i] - 0.22);
      }
      missile(KT, T, Y[i], Z[i]);
    }
    KT.pre = null;
  }

  /* ----------------------------------------------------------------- M727 */
  function buildM727(THREE, T, V) {
    var root = new THREE.Group(), K = new Baker(THREE), KT = new Baker(THREE), s, i;
    undercarriage(K, T, THREE);
    cab(K, T, THREE, 0.55, true);
    /* team panel on the flat part of the cab roof */
    K.bb(T.team, 1.58, 2.20, -0.80, 0.80, 2.68, 2.705);
    /* the louvred engine panel on each cab side, and the dark open bay above it */
    for (s = -1; s <= 1; s += 2) {
      K.box(T.dark, 0.72, 0.024, 0.40, 1.02, s * 1.295, 1.78);
      for (i = 0; i < 5; i++) K.box(T.steel, 0.68, 0.03, 0.022, 1.02, s * 1.30, 1.64 + i * 0.075);
      K.box(T.dark, 0.47, 0.02, 0.36, 1.135, s * 1.255, 2.16);
    }
    /* a short whip on the right front corner of the cab roof */
    K.cyl(T.steel, 0.012, 0.55, 6, 2.32, -1.10, 2.95, "z");
    K.cyl(T.dark, 0.04, 0.06, 8, 2.32, -1.10, 2.70, "z");
    /* the deck: dark plate, the equipment box over the rear deck, the ladder */
    K.bb(T.dark, TAIL + 0.04, 0.52, -1.28, 1.28, 0.95, 0.962);
    K.bb(T.skin, -2.75, -0.95, -1.02, 1.02, 0.962, 1.45);
    /* team flashes that stay in view from above: the box top either side of the
       rounds, and a panel on the open deck ahead of the launcher */
    for (s = -1; s <= 1; s += 2) K.bb(T.team, -2.60, -1.10, s * 0.86, s * 1.00, 1.45, 1.466);
    K.bb(T.team, -0.62, 0.22, -0.40, 0.40, 0.962, 0.976);
    for (s = -1; s <= 1; s += 2) {
      K.box(T.dark, 1.30, 0.02, 0.28, -1.85, s * 1.03, 1.20);
      K.box(T.steel, 0.14, 0.03, 0.04, -1.30, s * 1.04, 1.34);
    }
    /* foot on the deck at X -0.30, top on the sloped cab roof at X 0.80 */
    var lx = 0.25, lz = 1.63, la = Math.atan2(1.10, 1.32), ll = Math.sqrt(1.10 * 1.10 + 1.32 * 1.32);
    for (s = 0; s < 2; s++) K.box(T.steel, 0.05, 0.05, ll, lx, s ? -0.48 : -1.00, lz, 0, la, 0);
    for (i = 0; i < 5; i++) K.box(T.steel, 0.035, 0.56, 0.035, lx + (i - 2) * 0.28 * Math.sin(la), -0.74, lz + (i - 2) * 0.28 * Math.cos(la), 0, la, 0);
    /* tail: the cable reel on its two arms, as in the right-side photograph */
    K.cyl(T.steel, 0.04, 0.80, 8, -3.67, 0, 0.55, "y");
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.steel, -3.67, TAIL, s * 0.34, s * 0.28, 0.50, 0.62);
      K.cyl(T.dark, 0.48, 0.03, 24, -3.67, s * 0.245, 0.55, "y");
      K.cyl(T.steel, 0.12, 0.05, 12, -3.67, s * 0.285, 0.55, "y");
    }
    K.cyl(T.dark, 0.31, 0.46, 20, -3.67, 0, 0.55, "y");
    K.flush(root);
    /* the launcher on its ring, centre 1.75 m behind hull centre */
    launcher(KT, T, THREE);
    var G = new THREE.Group();
    G.position.set(-1.75, 0, 1.45);
    KT.flush(G);
    if (V.turret) G.name = "turret";
    root.add(G);
    roadWheels(root, T, THREE);
    return root;
  }

  /* ---------------------------------------------------------------- M1015 */
  function buildM1015(THREE, T, V) {
    var root = new THREE.Group(), K = new Baker(THREE), KT = new Baker(THREE), s, i, x;
    /* shelter front and rear walls and roof, from the "major components" drawing
       (wheel stations as the scale) and the 2011 photograph: the shelter does
       NOT start on the cab; a box fills the 0.8 m between, and it stops about
       0.4 m short of the tail */
    var SF = 0.50, SR = -2.40, SZ = 3.32;
    undercarriage(K, T, THREE);
    cab(K, T, THREE, 1.41, false, true);
    /* the cargo bed: floor, two walls with their five side panels (the drawing
       puts them under the rail, from the shelter front back), the tailgate */
    K.bb(T.dark, TAIL + 0.04, 1.41, -1.29, 1.29, 0.95, 0.965);
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.skin, TAIL, 1.41, s * 1.294, s * 1.344, 0.95, 1.93);
      for (i = 0; i < 5; i++) K.box(T.dark, 0.50, 0.014, 0.36, 0.18 - i * 0.574, s * 1.349, 1.62);
    }
    K.bb(T.skin, TAIL, TAIL + 0.05, -1.344, 1.344, 0.95, 1.93);
    /* the S-595/G shelter: a tall box on the bed, roof about 0.65 m over the
       cab roof; the door on the port side, in the rear half */
    K.bb(T.shel, SR, SF, -1.31, 1.31, 1.93, SZ);
    K.bb(T.dark, -1.42, -0.70, 1.305, 1.325, 2.14, 2.96);
    K.bb(T.shel, -1.38, -0.74, 1.325, 1.34, 2.18, 2.92);
    K.bb(T.steel, -0.80, -0.76, 1.34, 1.38, 2.38, 2.62);
    K.bb(T.team, -2.20, 0.30, -0.70, 0.70, SZ, SZ + 0.02);
    /* the box between the cab and the shelter, the canister's seat */
    K.bb(T.shel, 0.58, 1.30, -1.20, 1.20, 0.965, 2.36);
    /* the roof frame the drawing shows: tube rails on stand-offs over the
       shelter roof, reaching forward over the cab on two braces */
    var FZ0 = SZ + 0.08, FZ1 = SZ + 0.14, FX0 = -2.45, FX1 = 2.15;
    if (V.frame) {
      for (s = -1; s <= 1; s += 2) {
        K.bb(T.dark, FX0, FX1, s * 1.22, s * 1.28, FZ0, FZ1);
        K.bb(T.dark, FX0, FX0 + 0.06, s * 1.22, s * 1.28, SZ, FZ0);
        K.bb(T.dark, SF - 0.06, SF, s * 1.22, s * 1.28, SZ, FZ0);
        K.bb(T.dark, -0.95, -0.89, s * 1.22, s * 1.28, SZ, FZ0);
        K.box(T.dark, 1.154, 0.05, 0.05, 1.05, s * 1.25, 3.225, 0, -0.308, 0);   /* from the shelter front wall up to the frame */
      }
      K.bb(T.dark, FX0, FX0 + 0.06, -1.28, 1.28, FZ0, FZ1);
      K.bb(T.dark, FX1 - 0.06, FX1, -1.28, 1.28, FZ0, FZ1);
      for (x = -1.4; x <= 1.5; x += 1.45) K.bb(T.dark, x, x + 0.06, -1.28, 1.28, FZ0, FZ1);
    }
    /* the ground-rod driver on the bow, at the right corner: mount, rail, hammer */
    K.bb(T.steel, 2.82, 3.08, -1.12, -0.86, 0.95, 1.30);
    K.bb(T.dark, 3.02, 3.16, -1.06, -0.92, 0.62, 3.00);
    K.bb(T.steel, 2.98, 3.22, -1.12, -0.86, 1.25, 1.75);
    K.cyl(T.steel, 0.025, 0.70, 8, 3.09, -0.99, 0.35, "z");
    K.flush(root);
    /* the canister lying on that box against the shelter's front wall, the part
       that trains: the stowed mast, in its cradle with two straps; it is short
       enough to turn all the way round between the walls */
    KT.cyl(T.drab, 0.20, 0.70, 14, 0, 0, 0, "x");
    for (s = -1; s <= 1; s += 2) KT.cyl(T.steel, 0.207, 0.05, 14, s * 0.22, 0, 0, "x");
    KT.bb(T.dark, -0.33, 0.33, -0.14, 0.14, -0.26, -0.10);
    KT.bb(T.steel, -0.05, 0.05, -0.04, 0.04, 0.20, 0.27);
    var G = new THREE.Group();
    G.position.set(0.90, 0, 2.61);
    KT.flush(G);
    if (V.turret) G.name = "turret";
    root.add(G);
    roadWheels(root, T, THREE);
    return root;
  }

  function build(key, THREE, M, C) {
    var V = ROWS[key], T = makeMats(THREE, C, V.paint);
    var root = V.veh === "m727" ? buildM727(THREE, T, V) : buildM1015(THREE, T, V);
    root.name = key;
    root.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return root;
  }

  return { build: build, rows: ROWS };
})();

(function () {
  var k, rows = HeroUsM548.rows;
  function reg(key, len) {
    UNIT_MODELS[key] = { len: len, build: function (THREE, M, C) { return HeroUsM548.build(key, THREE, M, C); } };
  }
  for (k in rows) if (Object.prototype.hasOwnProperty.call(rows, k)) reg(k, rows[k].veh === "m727" ? 7.18 : 6.16);
})();
