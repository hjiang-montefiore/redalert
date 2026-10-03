/* ===== us_m270_himars.js - HERO models: M270 MLRS and M142 HIMARS ==========
   Seven rows, two vehicles.

   TRACKED, the M270 (the M993 carrier, a Bradley-derived chassis with the
   launcher loader module on its back):
     nato_e80_mlrs  M270, 1983: two six-rocket pods, NATO three-tone paint
     nato_e90_mlrs  M270, 1991: two six-rocket pods, desert tan
     mlrs_n         M270A1/A2, present day: two six-rocket pods, CARC green
     nato_e90_tel   M270 with MGM-140 ATACMS: two ATACMS pods, one missile each
   WHEELED, the M142 HIMARS (the FMTV 6x6 truck, armoured cab, ONE pod):
     nato_e00_mlrs  HIMARS: one six-rocket pod
     nato_e00_tel   HIMARS / ATACMS: one ATACMS pod (row says rounds: 1)
     tel_n          HIMARS / PrSM: one PrSM pod (row says rounds: 2)
   Only the pod end face differs between loads: six 227 mm tube mouths, one
   610 mm ATACMS mouth, two 430 mm PrSM mouths, all in the same pod box, which
   is the point of the standard pod.  nato_e90_mlrs carries the rocket pods
   because its weapon row is "12 x 227mm rockets" (+ the AT2 rocket); ATACMS is
   drawn only on the TEL rows, whose weapon is srbm_atacms.

   Published figures (Lockheed Martin / US Army data sheets) and what this
   file models (render3d rescales by the measured X extent, so only the
   proportions survive):
     M270   length 6.85 m, width 2.97 m (over the tracks), height 2.57 m,
            6 road wheels a side, front sprocket, rear idler, 25 t, 3 crew.
            Modelled 6.96 x 3.01 x 2.56 m: the tow shackle and tail eyes make
            the length, the sprocket teeth the width; the module is stowed
            level, its top 2.53 m, so the height is the published one.
     HIMARS length 7.0 m, width 2.4 m, height 3.2 m, 6x6, 3 crew, one pod,
            395/85R20 tyres (1.18 m nominal, as drawn).  Modelled 7.04 x 2.42
            x 3.20 m: the cab-roof hatch ring is the highest point.
   Reference photographs (public-domain US Army / DoD images on Wikimedia
   Commons): Army_mlrs_1982_02, M270A1_..._South_Dakota_ANG, M270_MLRS_-_
   190911-A-HE359-0085, Fire_support_training_140313-A-DM872-123, HIMARS_
   Prototype, Romanian_HIMARS_loaded_into_an_RAF_A400M_airplane.  What they
   fix: the M270 cab is a full-width armoured box on the bow with three front
   panes, the launcher module is one wide box behind it whose top stands a
   little proud of the cab roof, the pods fire FORWARD over the cab and raise
   on a rear trunnion; the HIMARS cab is a tall slab-sided box behind a short
   sloped hood, with two front panes, a hatch ring in the roof, equipment
   lockers behind it, and the module riding over the rear tandem.
   Check-and-fix pass: the nominal tyres lift the HIMARS 0.04 m and its cab
   roof stands 0.11 m taller (the first draft was 3.05 m against 3.2 m
   published); the M270 module is stowed level (the draft's 1.7 degrees of
   elevation made it 2.64 m against 2.57 m); wheels, sprocket teeth and track
   end connectors are finer, so the rows sit in the 6,000-9,000 triangle band.

   Elevation: everything of the module that elevates - the box, the pod
   faces, the HIMARS boom, the team stripe - is the group "podelev", a child
   of the module hinged at its rear trunnion and turned about its own Y (the
   model's pitch axis) by render3d.js, which raises it to LAUNCH_EL to fire
   and lays it level again; the cradle stays on the ring.  Its userData
   carries the cells (each round's mouth and the pod's rear, in its frame),
   where render3d starts a round and puts the backblast.  LAUNCH_EL is not a
   published figure: no reference fetched gives a firing elevation (FAS: the
   M26's range "is a function of LLM elevation", with no table), so it is
   the angle the pod and the missile stand at in the owner's picture of a
   HIMARS firing, read by eye as 30-40 degrees.  The round each row's
   launcher fires (ord, per weapon key) is declared here and only here, so
   the same weapon on another row - "mlrs" is also the Smerch's and the
   PHL-03's, "srbm_mod" the Iskander's - draws exactly as before.

   Turret: the launcher module is the node "turret" on the rows whose def has
   turret:true (all but nato_e00_tel and tel_n).  entities.js turns the hull
   of a turret:false unit to its target and leaves tang where it was, so a
   node named "turret" on those two would swing against the hull; they bake
   the module instead, as tel3d.js did.  The HIMARS tyres are six groups named
   "roadwheel" (axle on local Y) with a lugged tread so the spin shows.  The
   M270 road wheels are six "roadwheel" groups too, one per axle with the
   wheel of each side in it (the old M270 rows spun twelve wheels); the
   belts, sprockets and idlers are baked.

   Draw calls: bodies are baked to one mesh per material.  M270 16, HIMARS 16
   (hull 5 + module 5 + 6 wheel groups; the HIMARS body 5 + module 5 + 6):
   the module is the cradle on the ring (1) and the elevating group (4).
   Materials: SKIN (camo canvas), DARK, STEEL, RUBBER, GLASS, TEAM.  The team
   flash is exactly C.team (cab roof panel and a stripe along the module top,
   both up-facing for the RTS camera), which ERA_KIT repainting relies on.

   Model space: +X nose, +Y left (port), +Z up, metres; tyres and track on
   z = 0.  ASCII only.  Colours are authored in sRGB (prepModel linearises)
   and pulled down for the ACES pass, as nato_e90_mbt.js does.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroUsMlrs = (function () {
  "use strict";

  /* what each registered key carries.  pods: the end-face pattern.  ord:
     the round each weapon of the row is drawn as in flight (js/fx3d.js);
     a weapon not named keeps its old drawing (nato_e90_mlrs' AT2 mine
     rocket).  M26 for the 1983 and 1991 M270s; GMLRS for the present-day
     M270A2 (the M26 family left the US Army's active inventory in June 2009,
     en.wikipedia M270) and for the 2005 HIMARS row, whose description fields
     it with GMLRS (GMLRS introduced 2005); ATACMS and PrSM as the rows say. */
  var ROWS = {
    nato_e80_mlrs: { veh: "m270",   paint: "nato",  pods: "rocket", turret: true,  ord: { w_e80_nato_mlrs: "m26" } },
    nato_e90_mlrs: { veh: "m270",   paint: "sand",  pods: "rocket", turret: true,  ord: { w_e90_nato_mlrs: "m26" } },
    mlrs_n:        { veh: "m270",   paint: "green", pods: "rocket", turret: true,  ord: { mlrs: "gmlrs" } },
    nato_e90_tel:  { veh: "m270",   paint: "sand",  pods: "atacms", turret: true,  ord: { srbm_atacms: "atacms" } },
    nato_e00_mlrs: { veh: "himars", paint: "sand",  pods: "rocket", turret: true,  ord: { w_e00_nato_mlrs: "gmlrs" } },
    nato_e00_tel:  { veh: "himars", paint: "sand",  pods: "atacms", turret: false, ord: { srbm_atacms: "atacms" } },
    tel_n:         { veh: "himars", paint: "green", pods: "prsm",   turret: false, ord: { srbm_mod: "prsm" } }
  };
  /* the pod's firing elevation: see the header (not a published figure) */
  var LAUNCH_EL = 35 * Math.PI / 180;

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ---------------------------------------------------------------- paint */
  /* Base coats authored a little under the finished colour: the ACES pass
     lifts dark hexes.  nato: forest green with brown and black blocks, the
     NATO three-tone of the 1980s.  sand: the same 0x9c8759 the M1A1 hero
     wears for the Gulf.  green: CARC green with light weathering. */
  var PAINT = {
    nato:  { base: "#3a4a2e", patch: ["#5b4528", "#171914", "#4c5e38"], n: 15, big: 1.1 },
    sand:  { base: "#9c8759", patch: ["#8d7a4e", "#aa986c"],            n: 22, big: 0.7 },
    green: { base: "#3a4530", patch: ["#333d29", "#445036"],            n: 22, big: 0.7 }
  };
  var _cv = {};

  function paintCanvas(kind) {
    if (_cv[kind]) return _cv[kind];
    var P = PAINT[kind], R = rng(kind.length * 7919 + 31), W = 256, i, q, cv, x, y;
    try {
      cv = document.createElement("canvas"); cv.width = W; cv.height = W;
      q = cv.getContext("2d");
      q.fillStyle = P.base; q.fillRect(0, 0, W, W);
      for (i = 0; i < P.n; i++) {
        q.fillStyle = P.patch[i % P.patch.length];
        q.beginPath();
        q.ellipse(R() * W, R() * W, (14 + R() * 38) * P.big, (8 + R() * 22) * P.big, R() * 3.14, 0, 6.2832);
        q.fill();
      }
      /* dust and wear: pale flecks and dark scuffs */
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i & 1) ? "rgba(214,200,160,0.07)" : "rgba(20,18,12,0.10)";
        x = R() * W; y = R() * W;
        q.fillRect(x, y, 3 + R() * 18, 1 + R() * 3);
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
    if (tx) T.skin.map = tx; else T.skin.color.setHex(parseInt(PAINT[kind].base.slice(1), 16));
    T.skin.userData.worldUV = 6.0;
    T.dark  = new THREE.MeshStandardMaterial({ color: 0x24251f, roughness: 0.82, metalness: 0.20 });
    T.steel = new THREE.MeshStandardMaterial({ color: 0x4a4d4f, roughness: 0.50, metalness: 0.38 });
    T.rub   = new THREE.MeshStandardMaterial({ color: 0x151514, roughness: 0.95, metalness: 0.02 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1c2a31, roughness: 0.14, metalness: 0.30 });
    /* team flash: exactly the owner's colour */
    T.team  = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                               roughness: 0.60, metalness: 0.10 });
    return T;
  }

  /* ------------------------------------------------------------ triangles */
  /* A flat triangle soup that orients every face away from a hint point; for
     a convex part that is its own middle, so there is no winding to get
     wrong.  Everything prismatic below is convex. */
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

  /* Box projection by each triangle's own facing, 6 m of paint to the
     canvas: a side takes (along, height), a top takes (x, y). */
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
     put through on the way in: about(px, pz) takes parts authored in the
     module's frame into the elevating group's, whose origin is the rear
     trunnion; about() clears it. */
  function Baker(THREE) { this.T = THREE; this.by = []; this.pre = null; }
  Baker.prototype.about = function (px, pz) {
    this.pre = px === undefined ? null : new this.T.Matrix4().makeTranslation(-px, 0, -pz);
  };
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
  /* a flat disc facing +X (a tube mouth) */
  Baker.prototype.mouth = function (mat, r, seg, x, y, z) {
    this.put(mat, new this.T.CircleGeometry(r, seg), x, y, z, 0, Math.PI / 2, 0);
  };
  /* convex XZ polygon extruded across Y from y0 to y1 */
  Baker.prototype.prism = function (mat, pts, y0, y1) {
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
    this.add(mat, S.geo(this.T));
  };
  /* convex YZ polygon extruded along X from x0 to x1 */
  Baker.prototype.prismYZ = function (mat, pts, x0, x1) {
    var S = new Soup(), n = pts.length, cy = 0, cz = 0, i;
    for (i = 0; i < n; i++) { cy += pts[i][0]; cz += pts[i][1]; }
    cy /= n; cz /= n;
    var away = [(x0 + x1) / 2, cy, cz], c0 = [x0, cy, cz], c1 = [x1, cy, cz];
    for (i = 0; i < n; i++) {
      var a = pts[i], b = pts[(i + 1) % n];
      var a0 = [x0, a[0], a[1]], b0 = [x0, b[0], b[1]], a1 = [x1, a[0], a[1]], b1 = [x1, b[0], b[1]];
      S.tri(c0, a0, b0, away); S.tri(c1, a1, b1, away);
      S.quad(a0, b0, b1, a1, away);
    }
    this.add(mat, S.geo(this.T));
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

  /* ------------------------------------------------------------- the pods */
  /* The launcher loader module, built about the traverse ring (origin: the
     ring centre on the deck).  o: hw half width, x0/x1 length, z0/z1 height,
     pods [y centres] and kinds [rocket | atacms | prsm, one per pod],
     px/pz the rear trunnion the module elevates about.  The pods sit
     inside the box; only their end faces show, standing 0.04 m proud of the
     module's front, which is where the rockets leave: forward, over the cab.
     The mouth discs stand 6 and 12 mm beyond that face, apart so they cannot
     z-fight.
     Behind the cab they are hidden at rest and show when the module traverses.
     Two bakers: KT keeps the cradle, which stays on the traverse ring; KE
     takes everything that elevates, shifted into the trunnion's frame for
     the group "podelev" (elevGroup), and is left in that frame so the caller
     can add its own module parts.  Returns the cells, one per round the
     pods hold: [mouth x, y, z, pod rear x] in that frame.
     o.boom: the HIMARS launcher-loader boom (below). */
  function launcher(KT, KE, T, o) {
    var i, j, k, yc, kind, c = 0.12, zc = (o.z0 + 0.16 + o.z1 - 0.12) / 2, cells = [];
    function cell(y, z) { cells.push([o.x1 + 0.06 - o.px, y, z - o.pz, o.x0 - o.px]); }
    /* the cradle under it, which the traverse ring carries */
    KT.bb(T.dark, o.x0 + 0.5, o.x1 - 0.6, -o.hw + 0.3, o.hw - 0.3, o.z0 - 0.14, o.z0 + 0.01);
    KE.about(o.px, o.pz);
    /* the module: an octagonal section, chamfered along its top edges */
    KE.prismYZ(T.skin, [[-o.hw + 0.02, o.z0], [o.hw - 0.02, o.z0], [o.hw, o.z0 + 0.10], [o.hw, o.z1 - c],
                        [o.hw - c, o.z1], [-o.hw + c, o.z1], [-o.hw, o.z1 - c], [-o.hw, o.z0 + 0.10]],
               o.x0, o.x1);
    /* two panel lines down each side, so the box reads as plated, not poured */
    for (j = -1; j <= 1; j += 2) for (k = 0; k < 2; k++)
      KE.box(T.dark, o.x1 - o.x0 - 0.3, 0.012, 0.022, (o.x0 + o.x1) / 2, j * (o.hw + 0.004), k ? o.z1 - 0.20 : o.z0 + 0.30);
    /* the pod end faces: a boxed stub per pod and its mouths */
    for (i = 0; i < o.pods.length; i++) {
      yc = o.pods[i]; kind = o.kinds[i];
      KE.bb(T.skin, o.x1 - 0.02, o.x1 + 0.04, yc - 0.49, yc + 0.49, zc - 0.43, zc + 0.43);
      if (kind === "rocket") {
        for (j = -1; j <= 1; j++) for (k = -1; k <= 1; k += 2)
          { KE.mouth(T.dark, 0.12, 12, o.x1 + 0.052, yc + j * 0.31, zc + k * 0.215);
            KE.mouth(T.steel, 0.14, 12, o.x1 + 0.046, yc + j * 0.31, zc + k * 0.215);
            cell(yc + j * 0.31, zc + k * 0.215); }
      } else if (kind === "atacms") {
        KE.mouth(T.dark, 0.31, 20, o.x1 + 0.052, yc, zc);
        KE.mouth(T.steel, 0.335, 20, o.x1 + 0.046, yc, zc);
        cell(yc, zc);
      } else {
        for (j = -1; j <= 1; j += 2) {
          KE.mouth(T.dark, 0.21, 16, o.x1 + 0.052, yc + j * 0.255, zc);
          KE.mouth(T.steel, 0.23, 16, o.x1 + 0.046, yc + j * 0.255, zc);
          cell(yc + j * 0.255, zc);
        }
      }
    }
    /* The HIMARS launcher-loader boom, stowed: a yoke over the front of the
       box, an arm along each side of the top rising to a cross bar above the
       pod face - as it stands over the pod in the owner's picture and the
       HIMARS training photograph (the integrated loading and hoisting gear,
       de.wikipedia MLRS).  It is kept behind the face, clear of the cab
       wall, and under the cab roof.  Section, rise and length are by eye,
       not published.  The M270 is not given one: its stowed height (2.57 m,
       which the module top already makes) leaves no room for a yoke standing
       above it, and its stowed boom could not be made out. */
    if (o.boom) {
      for (j = -1; j <= 1; j += 2)
        KE.prism(T.skin, [[o.x1 - 1.05, o.z1 - 0.02], [o.x1 - 0.12, o.z1 + 0.26], [o.x1 - 0.12, o.z1 + 0.36],
                          [o.x1 - 1.15, o.z1 + 0.06]], j * (o.hw - 0.17) - 0.045, j * (o.hw - 0.17) + 0.045);
      KE.bb(T.skin, o.x1 - 0.20, o.x1 - 0.06, -(o.hw - 0.12), o.hw - 0.12, o.z1 + 0.26, o.z1 + 0.37);
    }
    /* team stripe along the top, facing the RTS camera */
    KE.bb(T.team, o.x0 + 0.7, o.x1 - 0.7, -0.26, 0.26, o.z1 + 0.0, o.z1 + 0.025);
    return cells;
  }

  /* The elevating part of the module: a group at the trunnion, level at
     rest, which render3d turns about its own Y. */
  function elevGroup(THREE, KE, px, pz, cells) {
    var E = new THREE.Group();
    E.name = "podelev";
    E.position.set(px, 0, pz);
    KE.flush(E);
    KE.about();
    E.userData.cells = cells;
    E.userData.el = LAUNCH_EL;
    return E;
  }

  /* ------------------------------------------------------------ small parts */
  /* One road wheel of the M270 carrier, both sides of an axle in one mesh: the
     tyre, a rim a step proud of it, the hub and six hub nuts.  Local origin is
     the axle line at the middle of the carrier; the group is named "roadwheel"
     and spins about its own Y. */
  function m270Wheel(W, T, s) {
    var i, a, y = s * 1.40;
    W.cyl(T.rub, 0.31, 0.17, 32, 0, y, 0, "y");
    W.cyl(T.rub, 0.215, 0.186, 24, 0, y, 0, "y");
    W.cyl(T.rub, 0.105, 0.18, 16, 0, y, 0, "y");
    for (i = 0; i < 6; i++) {
      a = i * Math.PI / 3 + 0.26;
      W.box(T.rub, 0.036, 0.02, 0.036, 0.165 * Math.cos(a), s * 1.485, 0.165 * Math.sin(a), 0, -a, 0);
    }
  }
  /* track end-connector blocks round a curved end of the belt (sprocket, idler) */
  function beltArc(K, mat, THREE, cx, cz, r, a0, a1, n, y) {
    for (var i = 0; i <= n; i++) {
      var a = a0 + (a1 - a0) * i / n;
      K.put(mat, new THREE.BoxGeometry(0.06, 0.075, 0.13), cx + r * Math.cos(a), y, cz + r * Math.sin(a), 0, -a, 0);
    }
  }
  /* sprocket or idler: a drum, a ring of teeth on its outer face, a hub cap */
  function drum(K, T, THREE, s, x, z, r, nt) {
    var i, a;
    K.cyl(T.dark, r, 0.17, 28, x, s * 1.40, z, "y");
    K.cyl(T.steel, r * 0.42, 0.03, 12, x, s * 1.475, z, "y");
    for (i = 0; i < nt; i++) {
      a = i * Math.PI * 2 / nt;
      K.put(T.steel, new THREE.BoxGeometry(0.05, 0.045, 0.07), x + r * 0.78 * Math.cos(a), s * 1.48, z + r * 0.78 * Math.sin(a), 0, -a, 0);
    }
  }

  /* ----------------------------------------------------------------- M270 */
  /* Hull 6.85 m: tail plate -3.42, bow lip +3.42.  Tracks 0.53 wide, 2.97 m
     over both.  Six road wheels a side at 0.82 m, sprocket forward, idler aft.
     Hull deck 1.45 m; cab roof 2.42; module top 2.53 m, level (the published
     height is 2.57 m). */
  function buildM270(THREE, T, V) {
    var root = new THREE.Group(), K = new Baker(THREE), KT = new Baker(THREE);
    var s, i, x, a, belt = [];
    var XA = -3.0, ZA = 0.40, RA = 0.40, XB = 2.85, ZB = 0.50, RB = 0.50;
    var HW = 1.44, DECK = 1.45;

    /* the belt: the convex outline round idler and sprocket */
    for (i = 0; i <= 6; i++) { a = -Math.PI / 2 + Math.PI * i / 6; belt.push([XB + RB * Math.cos(a), ZB + RB * Math.sin(a)]); }
    for (i = 0; i <= 6; i++) { a = Math.PI / 2 + Math.PI * i / 6; belt.push([XA + RA * Math.cos(a), ZA + RA * Math.sin(a)]); }

    for (s = -1; s <= 1; s += 2) {
      K.prism(T.dark, belt, s * 0.99, s * 1.40);
      /* end connectors along the lower run, the part of the belt anyone sees,
         and round the lower halves of the two curved ends */
      for (x = XA + 0.06; x < XB; x += 0.17) K.box(T.dark, 0.10, 0.075, 0.07, x, s * 1.405, 0.04);
      beltArc(K, T.dark, THREE, XB, ZB, RB + 0.01, -Math.PI / 2 + 0.50, 0.60, 5, s * 1.405);
      beltArc(K, T.dark, THREE, XA, ZA, RA + 0.01, 1.95, Math.PI * 1.5 - 0.58, 5, s * 1.405);
      /* sprocket (front, bigger) and idler (rear); the six road wheels are the
         "roadwheel" groups built below, so they can turn */
      drum(K, T, THREE, s, XB, ZB, 0.40, 12);
      drum(K, T, THREE, s, XA, ZA, 0.34, 10);
      /* tow shackle and a headlamp on the bow, tail lamp and eye aft */
      K.box(T.steel, 0.06, 0.10, 0.10, 3.445, s * 0.45, 0.95);
      K.box(T.glass, 0.05, 0.20, 0.12, 3.44, s * 1.05, 1.00);
      K.box(T.dark, 0.04, 0.26, 0.18, 3.43, s * 1.05, 1.00);
      K.box(T.glass, 0.04, 0.16, 0.10, -3.43, s * 1.15, 1.10);
      K.box(T.steel, 0.06, 0.12, 0.12, -3.45, s * 0.55, 0.95);
    }

    /* belly plate between the tracks, 0.43 m off the ground as published */
    K.bb(T.dark, -3.30, 3.25, -1.00, 1.00, 0.43, 0.80);

    /* hull: a long slab, bow plate rising back to the deck at the cab */
    K.prism(T.skin, [[-3.42, 0.80], [-3.42, DECK], [3.12, DECK], [3.42, 1.20], [3.42, 0.80]], -HW, HW);

    /* the cab: full width, three front panes, flat roof */
    var CHW = 1.38, XF0 = 3.12, XF1 = 2.95, Z0 = DECK, Z1 = 2.42;
    K.prism(T.skin, [[XF0, Z0], [XF1, Z1], [1.15, Z1], [1.15, Z0]], -CHW, CHW);
    function fx(z) { return XF0 - (XF0 - XF1) * (z - Z0) / (Z1 - Z0); }
    var panes = [[-0.36, 0.36], [0.46, 1.08], [-1.08, -0.46]];
    for (i = 0; i < 3; i++) {
      var p0 = panes[i][0], p1 = panes[i][1];
      K.prism(T.dark, [[fx(1.74) + 0.012, 1.74], [fx(2.34) + 0.012, 2.34], [fx(2.34) - 0.02, 2.34], [fx(1.74) - 0.02, 1.74]],
              p0 - 0.05, p1 + 0.05);
      K.prism(T.glass, [[fx(1.78) + 0.026, 1.78], [fx(2.30) + 0.026, 2.30], [fx(2.30) - 0.02, 2.30], [fx(1.78) - 0.02, 1.78]],
              p0, p1);
      /* the armoured visor over each pane */
      K.box(T.skin, 0.12, p1 - p0 + 0.16, 0.06, fx(2.40) + 0.04, (p0 + p1) / 2, 2.395);
    }
    for (s = -1; s <= 1; s += 2) {
      /* a side pane and its frame, and a roof hatch ring */
      K.box(T.dark, 0.70, 0.024, 0.44, 2.45, s * (CHW + 0.004), 2.04);
      K.box(T.glass, 0.60, 0.030, 0.34, 2.45, s * (CHW + 0.010), 2.04);
      K.cyl(T.steel, 0.27, 0.07, 14, 1.50, s * 0.62, Z1 + 0.035, "z");
      K.cyl(T.dark, 0.21, 0.075, 14, 1.50, s * 0.62, Z1 + 0.038, "z");
      /* door seam strap and a handhold on the cab side */
      K.box(T.dark, 0.03, 0.02, 0.95, 1.70, s * (CHW + 0.002), 1.95);
      K.box(T.steel, 0.30, 0.04, 0.03, 1.95, s * (CHW + 0.025), 1.70);
    }
    /* team panel on the cab roof */
    K.bb(T.team, 1.95, 2.80, -0.80, 0.80, Z1, Z1 + 0.025);

    /* the module on its traverse ring: ring centre -0.95, the module 4.15 m,
       rear trunnion 0.6 m in, front 0.3 m clear of the cab rear wall */
    var RX = -0.95, KE = new Baker(THREE), cells;
    KT.cyl(T.dark, 1.02, 0.15, 26, 0, 0, 0.075, "z");
    cells = launcher(KT, KE, T, { hw: 1.22, x0: -2.25, x1: 1.90, z0: 0.15, z1: 1.08, pods: [0.57, -0.57],
                                  kinds: [V.pods, V.pods], px: -1.65, pz: 0.15 });
    /* the louvred panel on the port side of the module, as in the photographs */
    KE.box(T.dark, 1.10, 0.03, 0.42, 0.75, 1.235, 0.64);
    for (i = 0; i < 4; i++) KE.box(T.steel, 1.06, 0.035, 0.025, 0.75, 1.24, 0.50 + i * 0.09);

    K.flush(root);
    var G = new THREE.Group();
    G.position.set(RX, 0, DECK);
    KT.flush(G);
    G.add(elevGroup(THREE, KE, -1.65, 0.15, cells));
    if (V.turret) G.name = "turret";
    root.add(G);

    /* the six road wheels: one "roadwheel" group per axle, the wheel of each
       side in it, axle on local Y through the group origin */
    for (i = 0; i < 6; i++) {
      var W = new Baker(THREE), wg = new THREE.Group();
      m270Wheel(W, T, -1); m270Wheel(W, T, 1);
      W.flush(wg);
      wg.name = "roadwheel";
      wg.position.set(2.00 - 0.82 * i, 0, 0.40);
      root.add(wg);
    }
    return root;
  }

  /* --------------------------------------------------------------- HIMARS */
  /* 7.0 m overall, 2.4 m wide, tyres 1.18 m on 2.0 m tracks, front axle +2.45,
     tandem at -1.15 and -2.52 (1.37 m apart).  The body is authored for 1.10 m
     tyres and carried UP = 0.04 m higher on the nominal ones: frame top 1.08,
     deck 1.28 m.  Cab 2.1 m long and 2.26 m wide, roof 3.10 m, hatch ring to
     3.19 m.  */
  function buildHimars(THREE, T, V) {
    var root = new THREE.Group(), K = new Baker(THREE), KT = new Baker(THREE);
    var s, i, j, a, AX = [2.45, -1.15, -2.52], DECK = 1.24, RAD = 0.59, UP = RAD - 0.55;
    /* everything above the axles rides UP higher than the 1.10 m tyres drew it */
    K.pre = new THREE.Matrix4().makeTranslation(0, 0, UP);

    /* chassis: frame rails, cross members, axle housings and pumpkins */
    for (s = -1; s <= 1; s += 2) K.bb(T.dark, -3.30, 3.05, s * 0.52, s * 0.38, 0.80, 1.04);
    for (i = 0; i < 5; i++) K.bb(T.dark, -3.2 + i * 1.5, -3.2 + i * 1.5 + 0.12, -0.52, 0.52, 0.84, 1.00);
    for (i = 0; i < 3; i++) {
      K.cyl(T.steel, 0.085, 1.9, 10, AX[i], 0, 0.55, "y");
      K.box(T.dark, 0.38, 0.34, 0.30, AX[i], 0, 0.55);
    }
    /* fuel tanks / battery boxes between the axles, low on each side */
    for (s = -1; s <= 1; s += 2) K.bb(T.dark, -0.30, 0.90, s * 0.62, s * 1.00, 0.74, 1.14);

    /* hood and cab */
    K.prism(T.skin, [[2.65, 0.98], [2.65, 1.75], [3.05, 1.66], [3.46, 1.42], [3.46, 0.98]], -1.00, 1.00);
    K.bb(T.steel, 3.44, 3.58, -1.12, 1.12, 0.66, 0.94);                     /* bumper */
    K.bb(T.dark, 3.455, 3.475, -0.62, 0.62, 1.02, 1.38);                    /* grille */
    for (i = 0; i < 6; i++) K.bb(T.steel, 3.47, 3.50, -0.58, 0.58, 1.06 + i * 0.055, 1.085 + i * 0.055);
    for (s = -1; s <= 1; s += 2) {
      K.box(T.glass, 0.05, 0.26, 0.15, 3.46, s * 0.82, 1.28);               /* headlamps */
      K.box(T.steel, 0.08, 0.08, 0.10, 3.54, s * 0.50, 0.80);               /* tow eyes */
    }
    var CHW = 1.13;
    K.prismYZ(T.skin, [[-CHW, 1.20], [CHW, 1.20], [CHW, 2.66], [1.00, 3.06], [-1.00, 3.06], [-CHW, 2.66]], 0.80, 2.65);
    for (s = -1; s <= 1; s += 2) {
      /* the sill under the cab, behind the front wheel arch */
      K.bb(T.dark, 0.82, 1.80, s * 0.50, s * 1.10, 0.95, 1.20);
      /* two front panes, set high, each with a frame */
      K.box(T.dark, 0.03, 0.94, 0.64, 2.66, s * 0.58, 2.57);
      K.box(T.glass, 0.035, 0.82, 0.52, 2.665, s * 0.58, 2.57);
      K.box(T.skin, 0.14, 1.02, 0.06, 2.72, s * 0.58, 2.93);                 /* armoured visor */
      /* side window and the cab-side step and handhold */
      K.box(T.dark, 0.66, 0.03, 0.50, 2.00, s * (CHW + 0.004), 2.45);
      K.box(T.glass, 0.54, 0.036, 0.40, 2.00, s * (CHW + 0.008), 2.45);
      K.box(T.steel, 0.14, 0.04, 0.035, 1.40, s * (CHW + 0.02), 2.06);       /* door handle */
      K.bb(T.steel, 2.05, 2.55, s * (CHW + 0.08), s * (CHW + 0.01), 1.00, 1.05);
      K.box(T.steel, 0.04, 0.05, 0.50, 1.50, s * (CHW + 0.03), 1.95);
      /* fenders over the front wheel and the tandem; lockers behind the cab */
      K.bb(T.skin, 1.80, 3.15, s * 0.76, s * 1.20, 1.17, 1.23);
      K.bb(T.skin, -3.30, -0.42, s * 0.76, s * 1.20, 1.17, 1.23);
      K.bb(T.skin, 0.06, 0.78, s * 0.70, s * 1.16, 1.23, 1.86);
      K.box(T.dark, 0.02, 0.36, 0.12, 0.80, s * 0.93, 1.60);
      /* rear lamps */
      K.box(T.glass, 0.04, 0.14, 0.10, -3.43, s * 0.95, 1.10);
    }
    /* roof: hatch ring with its dark opening, team panel, antenna bases */
    K.cyl(T.steel, 0.38, 0.09, 20, 1.55, 0, 3.105, "z");
    K.cyl(T.dark, 0.30, 0.095, 20, 1.55, 0, 3.108, "z");
    K.bb(T.team, 2.05, 2.55, -0.80, 0.80, 3.06, 3.085);
    K.box(T.steel, 0.12, 0.12, 0.08, 0.95, 0.85, 3.10);
    K.box(T.steel, 0.12, 0.12, 0.08, 0.95, -0.85, 3.10);
    /* the rear deck, narrower than the tyres' inner faces */
    K.bb(T.skin, -3.45, 0.78, -0.76, 0.76, 1.04, DECK);
    K.bb(T.steel, -3.46, -3.40, -0.95, 0.95, 0.88, 1.00);                    /* tail beam */

    /* the module, over the tandem: ring centre -1.40 */
    var RX = -1.40, KE = new Baker(THREE), cells;
    KT.cyl(T.dark, 0.72, 0.15, 24, 0, 0, 0.075, "z");
    cells = launcher(KT, KE, T, { hw: 0.67, x0: -2.05, x1: 2.13, z0: 0.15, z1: 1.40, pods: [0],
                                  kinds: [V.pods], px: -1.45, pz: 0.15, boom: true });

    K.flush(root);
    var G = new THREE.Group();
    G.position.set(RX, 0, DECK + UP);
    KT.flush(G);
    G.add(elevGroup(THREE, KE, -1.45, 0.15, cells));
    if (V.turret) G.name = "turret";
    root.add(G);

    /* six lugged tyres, each a group "roadwheel" with the axle on local Y */
    var W = new Baker(THREE), tmp = new THREE.Group(), wm, wg;
    W.cyl(T.rub, 0.54, 0.40, 32, 0, 0, 0, "y");
    W.cyl(T.rub, 0.32, 0.41, 20, 0, 0, 0, "y");
    for (i = 0; i < 30; i++) {
      a = i * Math.PI * 2 / 30;
      /* alternate blocks sit either side of the centre line so the tread
         reads as a directional pattern when it turns */
      W.put(T.rub, new THREE.BoxGeometry(0.05, 0.19, 0.15), 0.565 * Math.cos(a), (i & 1 ? 0.10 : -0.10), 0.565 * Math.sin(a), 0, -a, 0);
    }
    for (i = 0; i < 10; i++) {
      a = i * Math.PI / 5;
      for (j = -1; j <= 1; j += 2)
        W.put(T.rub, new THREE.BoxGeometry(0.05, 0.04, 0.05), 0.22 * Math.cos(a), j * 0.195, 0.22 * Math.sin(a), 0, -a, 0);
    }
    W.cyl(T.rub, 0.09, 0.43, 12, 0, 0, 0, "y");
    W.flush(tmp);
    wm = tmp.children[0];
    for (i = 0; i < 3; i++) for (s = -1; s <= 1; s += 2) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(AX[i], s * 0.98, RAD);
      wg.add(new THREE.Mesh(wm.geometry, wm.material));
      wg.children[0].castShadow = true; wg.children[0].receiveShadow = true;
      root.add(wg);
    }
    return root;
  }

  function build(key, THREE, M, C) {
    var V = ROWS[key], T = makeMats(THREE, C, V.paint);
    var root = V.veh === "m270" ? buildM270(THREE, T, V) : buildHimars(THREE, T, V);
    root.name = key;
    root.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return root;
  }

  return { build: build, rows: ROWS };
})();

(function () {
  var k, rows = HeroUsMlrs.rows;
  function reg(key, len) {
    UNIT_MODELS[key] = { len: len, ord: rows[key].ord,
                         build: function (THREE, M, C) { return HeroUsMlrs.build(key, THREE, M, C); } };
  }
  for (k in rows) if (Object.prototype.hasOwnProperty.call(rows, k)) reg(k, rows[k].veh === "m270" ? 6.96 : 7.04);
})();
