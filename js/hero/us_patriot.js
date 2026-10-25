/* ===== us_patriot.js - HERO model: MIM-104 Patriot launching station ======
   Rows (keys kept, registered in the VARS loop at the foot): nato_e80_sam
   (Patriot, M901, four PAC-2 canisters), nato_e90_sam (PAC-2 GEM, the same
   M901 and canister), nato_e00_sam (PAC-3, M902: sixteen rounds in four
   packs of four) and sam_n (PAC-3 MSE, M903: twelve single-round canisters
   "in 3 rows of 4").  All four rows are turret:true, deploy:true.
   Full-quality redo 2026-10-24 (measured layout, two poses, an elevating
   pod, period paint).  js/sam3d.js registers the same keys earlier in
   index.html; this file loads later and wins.

   What the unit is: one launching station on its M860 semitrailer, coupled
   to its Oshkosh M983 HEMTT tractor (en.wikipedia "MIM-104 Patriot": the
   launchers ride on M860 semi-trailers towed by M983 HEMTTs; the M90x LS
   has four subsystems - the 15 kW launcher generator set, the launcher
   electronics module (LEM), the launcher mechanics assembly (LMA) that
   "physically erects and rotates the launcher's platform", and the cable
   group; the ECS can "remotely emplace, slew or stow" it).  The radar, ECS
   and power plant are other vehicles and are not drawn.

   References (Wikimedia Commons, fetched at width 960, cached in the
   scratchpad q_patriot_ref):
     [S]  "JASDF MIM-104 Patriot PAC-2 M901 Launching Station(49-3157, launch
          mode) right side view ..." (2017) - near-orthographic starboard
          side, launcher raised: THE STATION TABLE below is scaled off it.
     [L]  "... (49-3158) launch mode left side view at Tsuiki ..." (2017) -
          port side, launcher raised: the mast side, the generator visor.
     [T]  "Patriot PAC-2 Launcher with HEMTT Display at ... Xianmin Blvd
          Right Side View 20140906" (ROC) - the whole M983 + M901 in the
          TRAVEL position: two canister layers lying level on the LMA.
     [U]  "U.S. Soldiers with the 5th Battalion, 7th ADA ... Austere
          Challenge 2012" (US, Israel 2012) - two US M983s side on (one tan,
          one green) coupled to green launchers: the tractor's axle spacing,
          the cab, the louvred box and the upright stack behind it.
     [P]  "Soldiers from the 43rd ADA ... National Victory Celebration
          parade" (US, June 1991) - head on, travelling: tan M983, the 2 x 2
          canister ends standing high over the cab.
     [W]  "MIM-104 Patriot (1997)" (US, 1997) - tan launcher raised, four
          canister ends 2 x 2, the outriggers splayed, tractor coupled.
     [K]  "A U.S. Army four-round Patriot ... M901 ... near Camp Doha" (US,
          Kuwait, DoD) - set up and raised with the M983 STILL COUPLED, tan.
     [Q]  "PATRIOT battery in Poland, 2010" (US) - green NATO three-colour
          M983s and launchers.
     [M]  "Maintenance check on a Patriot missile" (US, ACU period) - an
          M902 from behind: four tan PAC-3 packs, 2 x 2 cells each, in a
          green three-colour launcher.
     [E]  "Patriot PAC-3 MSE SIAF-2022" (US launcher in Slovakia, 2022) -
          tan MSE canisters in a green three-colour M903 frame.
   Scale: [S] at 64.6 px a metre from the trailer's tyres, taken as the
   HEMTT's 16.00R20 (1.30 m) - [T] shows the same wheel, hub and tread on
   tractor and trailer; [T] for heights in travel at 57.7 px a metre; [U]
   for the tractor at 72 px a metre (tyre and axle pair agree to 1%).

   Recognition list (where each shows):
     1. A long semitrailer whose tandem sits at the TAIL (rear axle 0.87 m
        from the tail, 1.45 m pair) and whose front is a raised gooseneck
        over the tractor [S][T][L]: trailer(), AXL.
     2. The tall generator box standing on the gooseneck, louvred grille
        high at its front, a visor over its rear top corner [S][L][T]:
        trailer().
     3. The canister stack: TWO canisters wide and TWO high (PAC-2), 2 x 2
        packs with 2 x 2 cells each (PAC-3), four wide by three high (MSE)
        [P][W][M][E] and the Wikipedia M903 text: podelev contents.
     4. Ribbed canisters with open end frames X-braced on the sides, at both
        ends [S][L][M]: canister().
     5. Travel: the stack lying level on the LMA, its bottom 2.45 m and its
        top 4.3 m up, high over the cab [T][P]: podelev at rest.
     6. Fire: the stack cranked up about a hinge over the rear axle, its
        mouths high toward the tractor, two long rams under it [S][L][W][K]:
        podelev raised (userData.el), rams.
     7. The LEM box under the front of the stack, a long box slung under the
        starboard side [S][T]: trailer().
     8. Four A-frame outriggers with round pads: a pair at the tail, a pair
        just behind the gooseneck [S][L][T][W]: legs().
     9. The data-link mast, two poles on the PORT side by the hinge, up only
        when set up [S][L][K]: deploypose.
    10. The M983: a short flat-faced cab with raked screen ahead of the
        front axle, the cab's rear corner cut over the front tyre, the
        louvred box and an upright stack behind it, the spare lying flat,
        the fifth wheel over the rear pair, axles 1.52 / 3.10 / 1.52 m
        [U][T][P]: tractor().
    11. Paint by period (below).

   Station table, metres ahead of the trailer's tail (x'), heights above
   ground ([S] unless marked):
       0.00 tail / lamp bar        0.87, 2.32 trailer axles (tyres 1.30)
       0.85 hinge, 2.24 up          0.58 / 6.48 stack rear / front, level
       0.15-3.00 LMA base, top 2.0  1.55 turntable centre
       2.90 ram base clevis 2.12    4.40-6.45 LEM 1.70-2.18
       4.40-6.50 starboard box 0.55-1.16   6.95 front outriggers
       7.05 step to the gooseneck  7.25-9.80 generator 2.20-3.85
       9.44 kingpin (fifth wheel 1.38)    10.19 gooseneck front
       8.68, 10.20, 13.30, 14.82 tractor axles [U]
      14.05-15.15 louvred box 2.53 [U]   15.18-16.80 cab, roof 2.63 [U]
      16.89 bumper face [U]
     Deck 1.70 [S 1.70, T 1.65]; stack bottom 2.45 and canister layers 0.92
     [T]; raised, the stack spans 5.9 m with its end frames [S].
   Published: M901 four PAC-2, M902 sixteen PAC-3 (four canisters of four),
     M903 four PAC-2 GEM, four PAC-3 canisters or twelve MSE "in 3 rows of
     4" (en.wikipedia).  Launch elevation: the fixed 38 degrees of the old
     header is kept; [S] measures 34 and [L] 46 degrees, both through some
     perspective, which brackets it.
   CORRECTED from the old header: the tandem is at the tail, not under the
     middle ([S][T][L] all show it); the canisters stand 2 x 2, not four
     abreast ([P][W]); the PAC-3 face is a 4 x 4 grid, not 8 x 2 ([M]); the
     MSE load is four wide by three high (Wikipedia; the old file had it so);
     the tall box at the front IS drawn, as the generator set, and the LEM
     is the box under the stack's front ([S][T]); the trailer runs on single
     tyres, not duals ([S][T]); the M983's middle gap is about 3.1 m, not
     2.15 ([U] 3.2, [T] 3.05 through perspective); the tractor stays coupled
     when set up ([K][W]).  Kept: the M983 and M860, the 38 degrees, the
     MSE in tan canisters on a green frame behind a tan tractor (below).
   Paint, by the dated US photographs, no markings, sampled colours taken to
     about 0.8 of their level:
     e80  NATO three-colour (green 383, brown 383, black) over tractor,
          trailer, launcher and the PAC-2 canisters.  NO dated 1980s
          photograph of a US launcher was found; the three-colour is the
          brief's mid-1980s CARC and the scheme of every green US Patriot
          later photographed ([Q] 2010, [U] 2012, [E] 2022).
     e90  tan (CARC desert sand) over everything: every dated 1990s US
          photograph found shows it ([P] 1991, [W] 1997, [K] Kuwait).
     e00  three-colour tractor and launcher ([Q] 2010), the PAC-3 packs in
          their tan ([M]).
     sam_n a tan M983 ([U] 2012; the old header's Gaziantep 2013) towing a
          three-colour launcher with tan MSE canisters ([E] 2022).
   Deliberate departures: the rear outrigger pads stand 1.25 m behind the
     tail in [S]; render3d sizes the model by both poses together, so they
     are drawn swung out wide with their pads 0.30 m behind the tail (1.8%
     of the length).  The mast's two poles (above 5.4 m and 7 m in [S]) are
     cut at 4.3 and 4.6 m: the era kit of a row borrowing this model sits on
     its highest point.  The rams are true when the pod is raised; laid
     level they fold away through the LMA base.
   NOT confirmed, estimated: the outriggers' travel stowage (drawn folded
     up at the chassis corners), the LEM's width, the trailer tyre size (the
     whole trailer scales with it), the port side under the deck (nothing
     drawn there), cable runs, the M983's crane (not drawn), its exhaust.

   Nodes other files read: "turret" (a direct child of the root: render3d
   trains it; js/hero/us_sam_site.js finds it among the root's children and
   copies its meshes) holding "podelev" (render3d poseLauncher raises it to
   userData.el about its local Y; userData.cells = mouth x, y, z and rear x
   of every round, in its frame); "travelpose" / "deploypose" (outriggers
   up and mast down / outriggers down and mast up; render3d shows one from
   e.deployed); six "roadwheel" groups.  The trailer's static meshes are
   direct children of the root (the SAM site copies them); the tractor is
   its own group, which the site leaves behind.  Material colours steel
   0x80868a, dark 0x25292b, tyre 0x1b1c1c, glass 0x24343d, tan 0xa1956f,
   canister 0xb9aa82 are the ones the site sorts by.  HeroUsPatriot.site
   gives the site this trailer's axles, tyres and kingpin.
   Team colour: C.team exactly, on the cab roof and the generator roof.
   +X is the tractor's bumper, +Y port, +Z up, metres, tyres on z = 0.
   ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroUsPatriot = (function () {
  "use strict";

  /* ------------------------------------------------------------ layout */
  var OFF = 8.295;                        /* x' (from the tail) to model X: centres both poses */
  function X(xp) { return xp - OFF; }
  var RT = 0.65, HT = 0.205;              /* 16.00R20 on tractor and trailer      */
  var AXT = [8.68, 10.20, 13.30, 14.82];  /* M983: 1.52 / 3.10 / 1.52 [U]         */
  var YT = 1.02;
  var AXL = [0.87, 2.32];                 /* M860 tandem at the tail [S]          */
  var YL = 1.00;
  var ZD = 1.70;                          /* trailer deck                         */
  var XKP = 9.44;                         /* kingpin over the tractor's rear pair */
  var XTT = 1.55;                         /* turntable centre                     */
  var HX = -0.70, HZ = 0.54;              /* hinge in the turret's frame (x' 0.85, 2.24 up) */
  var EL = 38 * Math.PI / 180;            /* the one launch angle                 */
  /* the stack in the pod's frame: end frames and canister body */
  var SX0 = -0.27, SB0 = 0.18, SB1 = 5.18, SX1 = 5.63;
  var SZ0 = 0.21, SZ1 = 2.05;             /* canister bottom / top                */

  /* ------------------------------------------------------------- paint */
  /* one canvas per scheme, tiled seamlessly (every blot drawn nine times) */
  var _cv = {};
  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function paintCanvas(kind) {
    if (_cv[kind]) return _cv[kind];
    var R = rng(kind === "tan" ? 19911 : 19851), W = 512, H = 512, i;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var q = cv.getContext("2d");
    function blots(col, n, r0, r1) {
      for (var j = 0; j < n; j++) {
        var x = R() * W, y = R() * H, rx = r0 + R() * (r1 - r0), ry = rx * (0.35 + R() * 0.45);
        var rot = R() * 3.14, a = R() - 0.5, b = R() - 0.5, c = R() - 0.5;
        q.fillStyle = col;
        for (var oy = -1; oy <= 1; oy++) for (var ox = -1; ox <= 1; ox++) {
          for (var m = 0; m < 3; m++) {
            q.beginPath();
            q.ellipse(x + ox * W + (m - 1) * rx * 0.5 * (1 + a), y + oy * H + (m - 1) * ry * 0.6 * b,
                      rx * (0.62 + 0.2 * m), ry * (0.8 + 0.3 * c), rot + m * 0.35, 0, 6.2832);
            q.fill();
          }
        }
      }
    }
    if (kind === "tan") {
      /* CARC desert sand: one colour, dust and weathering only */
      q.fillStyle = "#a99877"; q.fillRect(0, 0, W, H);
      blots("rgba(150,132,100,0.35)", 10, 40, 110);
      blots("rgba(196,182,150,0.30)", 8, 30, 90);
    } else {
      /* NATO three-colour: green 383, brown 383, black, in big soft blots */
      q.fillStyle = "#4f5b3b"; q.fillRect(0, 0, W, H);
      blots("#5c4e38", 12, 40, 95);
      blots("#24261f", 9, 26, 72);
    }
    for (i = 0; i < 26; i++) {
      q.fillStyle = R() < 0.5 ? "rgba(214,204,160,0.06)" : "rgba(30,28,18,0.07)";
      q.fillRect(R() * W, R() * H, 30 + R() * 120, 20 + R() * 80);
    }
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

  function makeMats(THREE, C, V) {
    var T = {};
    var tex = canvasTex(THREE, paintCanvas(V.paint));
    T.skin = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05 });
    if (tex) T.skin.map = tex; else T.skin.color.setHex(V.paint === "tan" ? 0xa99877 : 0x4f5b3b);
    T.skin.userData.worldUV = 8.0;
    T.steel = new THREE.MeshStandardMaterial({ color: 0x80868a, roughness: 0.50, metalness: 0.42 });
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25292b, roughness: 0.80, metalness: 0.20 });
    T.rub = new THREE.MeshStandardMaterial({ color: 0x1b1c1c, roughness: 0.95, metalness: 0.02 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x24343d, roughness: 0.14, metalness: 0.30 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                              roughness: 0.55, metalness: 0.18 });
    /* [U] 2012: a tan M983 towing a green launcher */
    if (V.tanTractor) T.tan = new THREE.MeshStandardMaterial({ color: 0xa1956f, roughness: 0.88, metalness: 0.04 });
    /* [M][E]: PAC-3 packs and MSE canisters come in tan */
    if (V.tanCans) T.can = new THREE.MeshStandardMaterial({ color: 0xb9aa82, roughness: 0.86, metalness: 0.04 });
    return T;
  }

  /* ------------------------------------------------------------- baker */
  /* Positioned geometry collected per material, one mesh per material. */
  function Baker(THREE) { this.T = THREE; this.by = []; }
  Baker.prototype.add = function (mat, geo) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    for (var i = 0; i < this.by.length; i++) if (this.by[i].mat === mat) { this.by[i].g.push(g); return; }
    this.by.push({ mat: mat, g: [g] });
  };
  Baker.prototype.put = function (mat, geo, x, y, z, rx, ry, rz) {
    var THREE = this.T, m = new THREE.Matrix4();
    m.compose(new THREE.Vector3(x, y, z),
              new THREE.Quaternion().setFromEuler(new THREE.Euler(rx || 0, ry || 0, rz || 0)),
              new THREE.Vector3(1, 1, 1));
    geo.applyMatrix4(m);
    this.add(mat, geo);
  };
  Baker.prototype.box = function (mat, sx, sy, sz, x, y, z, rx, ry, rz) {
    this.put(mat, new this.T.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  };
  /* box from its corners; callers mirror with s * y, so they may arrive swapped */
  Baker.prototype.bb = function (mat, x0, x1, y0, y1, z0, z1) {
    var t;
    if (x1 < x0) { t = x0; x0 = x1; x1 = t; }
    if (y1 < y0) { t = y0; y0 = y1; y1 = t; }
    if (z1 < z0) { t = z0; z0 = z1; z1 = t; }
    this.box(mat, x1 - x0, y1 - y0, z1 - z0, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  };
  Baker.prototype.cyl = function (mat, r, len, seg, x, y, z, axis, r2) {
    var g = new this.T.CylinderGeometry(r2 === undefined ? r : r2, r, len, seg);
    if (axis === "x") this.put(mat, g, x, y, z, 0, 0, -Math.PI / 2);
    else if (axis === "z") this.put(mat, g, x, y, z, Math.PI / 2, 0, 0);
    else this.put(mat, g, x, y, z);
  };
  /* cylinder from point a to point b */
  Baker.prototype.rod = function (mat, r, a, b, seg) {
    var THREE = this.T;
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(); d.normalize();
    var g = new THREE.CylinderGeometry(r, r, len, seg || 8);
    g.applyMatrix4(new THREE.Matrix4().compose(
      new THREE.Vector3((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2),
      new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d),
      new THREE.Vector3(1, 1, 1)));
    this.add(mat, g);
  };
  /* a flat round cap facing +X (or -X with back) */
  Baker.prototype.disc = function (mat, r, x, y, z, back) {
    this.put(mat, new this.T.CircleGeometry(r, 12), x, y, z, 0, back ? -Math.PI / 2 : Math.PI / 2, 0);
  };
  /* a convex side profile [[x, z], ...] (counter-clockwise seen from +Y)
     extruded across y0..y1 */
  Baker.prototype.prism = function (mat, prof, y0, y1) {
    var THREE = this.T, P = [], n = prof.length, i;
    prof = prof.slice().reverse();
    function v(p, y) { return [p[0], y, p[1]]; }
    function tri(a, b, c) { P.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]); }
    for (i = 1; i < n - 1; i++) {
      tri(v(prof[0], y1), v(prof[i], y1), v(prof[i + 1], y1));
      tri(v(prof[0], y0), v(prof[i + 1], y0), v(prof[i], y0));
    }
    for (i = 0; i < n; i++) {
      var a = prof[i], b = prof[(i + 1) % n];
      tri(v(a, y0), v(b, y0), v(b, y1));
      tri(v(a, y0), v(b, y1), v(a, y1));
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
    g.computeVertexNormals();
    g.setAttribute("uv", new THREE.Float32BufferAttribute(new Float32Array(P.length / 3 * 2), 2));
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
  /* box projection by each triangle's own facing, in metres over S, so a
     long face does not stretch the canvas */
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

  /* --------------------------------------------------------- the tractor */
  /* M983 HEMTT [U][T][P].  S is the paint of its panels. */
  function tractor(K, T, S) {
    var i, s;
    /* frame, cross member, fifth wheel over the rear pair */
    for (s = -1; s <= 1; s += 2) K.bb(T.dark, X(7.98), X(16.55), s * 0.40, s * 0.55, 0.80, 1.15);
    K.bb(T.dark, X(7.98), X(8.12), -0.95, 0.95, 0.84, 1.15);
    K.bb(T.dark, X(8.90), X(10.00), -0.55, 0.55, 1.15, 1.24);
    K.cyl(T.dark, 0.55, 0.14, 18, X(XKP), 0, 1.31, "z");
    K.bb(T.dark, X(9.70), X(10.05), -0.30, 0.30, 1.30, 1.36);           /* coupler jaw ramp */
    /* rear fenders, flat over the tyres, mud flaps behind */
    for (s = -1; s <= 1; s += 2) {
      K.bb(S, X(7.95), X(10.95), s * 0.78, s * 1.25, 1.36, 1.41);
      K.bb(T.dark, X(7.98), X(8.02), s * 0.80, s * 1.22, 0.40, 1.36);
      K.bb(S, X(12.55), X(15.55), s * 0.78, s * 1.27, 1.42, 1.48);    /* front fenders */
      K.bb(S, X(12.55), X(12.62), s * 0.78, s * 1.27, 1.05, 1.42);
    }
    /* round fuel tank to port, battery box to starboard, between the pairs */
    K.cyl(S, 0.30, 1.30, 14, X(11.85), 0.96, 0.98, "x");
    K.bb(S, X(11.20), X(12.40), -1.20, -0.62, 0.75, 1.20);
    K.bb(T.dark, X(11.20), X(12.40), -1.21, -1.20, 0.80, 0.84);
    /* spare tyre lying flat on its carrier [U] */
    for (i = 0; i < 4; i++) K.bb(T.dark, X(12.55 + (i & 1) * 1.10) - 0.05, X(12.55 + (i & 1) * 1.10) + 0.05,
                                 (i < 2 ? -0.55 : 0.55) - 0.05, (i < 2 ? -0.55 : 0.55) + 0.05, 1.15, 2.05);
    K.bb(T.dark, X(12.45), X(13.80), -0.65, 0.65, 2.02, 2.07);
    K.put(T.dark, new K.T.TorusGeometry(0.47, 0.19, 8, 20), X(13.12), 0, 2.27);
    K.cyl(T.dark, 0.30, 0.20, 12, X(13.12), 0, 2.27, "z");
    /* louvred box behind the cab, the upright stack beside it [U] */
    K.bb(S, X(14.05), X(15.15), -1.15, 1.15, 1.48, 2.53);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 6; i++)
      K.bb(T.dark, X(14.25), X(14.95), s * 1.15, s * 1.165, 1.60 + i * 0.13, 1.66 + i * 0.13);
    K.bb(T.dark, X(14.15), X(15.05), -0.60, 0.60, 2.53, 2.56);
    K.cyl(S, 0.11, 1.37, 10, X(13.85), 0.55, 2.165, "z");
    K.cyl(T.dark, 0.16, 0.22, 10, X(13.85), 0.55, 2.92, "z");
    /* the cab: rear lower corner cut away over the front tyre, flat face,
       screen raked about 24 degrees [U][P] */
    K.prism(S, [[15.18 - OFF, 1.45], [16.80 - OFF, 1.45], [16.80 - OFF, 1.85], [16.46 - OFF, 2.60],
                [16.36 - OFF, 2.63], [15.18 - OFF, 2.63]], -1.18, 1.18);
    K.prism(S, [[15.60 - OFF, 1.05], [16.80 - OFF, 1.05], [16.80 - OFF, 1.46], [15.55 - OFF, 1.46]], -1.18, 1.18);
    K.box(T.glass, 0.03, 0.98, 0.72, X(16.668), 0.53, 2.24, 0, -0.426, 0);
    K.box(T.glass, 0.03, 0.98, 0.72, X(16.668), -0.53, 2.24, 0, -0.426, 0);
    K.box(T.dark, 0.05, 0.08, 0.80, X(16.668), 0, 2.24, 0, -0.426, 0);       /* centre post */
    K.bb(S, X(16.36), X(16.52), -1.20, 1.20, 2.58, 2.66);                       /* brow */
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.glass, X(15.50), X(16.30), s * 1.18, s * 1.186, 1.86, 2.45);      /* door window */
      K.bb(T.dark, X(15.40), X(15.43), s * 1.18, s * 1.19, 1.10, 2.55);        /* door seams */
      K.bb(T.dark, X(16.42), X(16.45), s * 1.18, s * 1.19, 1.10, 1.85);
      K.bb(T.dark, X(16.05), X(16.20), s * 1.18, s * 1.21, 1.70, 1.74);       /* handle */
      K.bb(T.dark, X(15.62), X(16.30), s * 1.10, s * 1.30, 0.70, 0.75);       /* step */
      K.bb(T.dark, X(16.70), X(16.80), s * 1.18, s * 1.46, 2.28, 2.32);       /* mirror arm */
      K.bb(T.dark, X(16.74), X(16.80), s * 1.40, s * 1.50, 1.92, 2.48);        /* mirror */
      K.bb(T.dark, X(16.78), X(16.86), s * 0.86, s * 1.14, 1.32, 1.56);       /* lamp pod */
      K.disc(T.glass, 0.09, X(16.865), s * 1.00, 1.44);
    }
    K.bb(T.dark, X(16.80), X(16.83), -0.80, 0.80, 1.12, 1.66);                 /* grille */
    for (i = 0; i < 5; i++) K.bb(T.dark, X(16.83), X(16.85), -0.78, 0.78, 1.18 + i * 0.1, 1.21 + i * 0.1);
    K.bb(S, X(16.62), X(16.89), -1.22, 1.22, 0.72, 1.02);                      /* bumper */
    for (s = -1; s <= 1; s += 2) K.bb(T.dark, X(16.70), X(16.89), s * 0.55, s * 0.75, 0.60, 0.72);  /* tow eyes */
    K.bb(T.dark, X(15.55), X(15.95), -0.35, 0.35, 2.63, 2.68);                 /* roof hatch */
  }

  /* --------------------------------------------------------- the trailer */
  /* M860: rear deck over the tandem, the step up to the gooseneck, the
     generator on it, the LEM under the stack's front [S][T]. */
  function trailer(K, T) {
    var i, s;
    K.bb(T.skin, X(0.00), X(7.05), -1.25, 1.25, 1.32, ZD);                     /* rear deck */
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.dark, X(0.20), X(7.40), s * 0.35, s * 0.55, 1.00, 1.32);          /* main beams */
      K.bb(T.dark, X(0.00), X(7.05), s * 1.25, s * 1.27, 1.40, 1.46);          /* rub rail */
      K.bb(T.dark, X(0.05), X(0.09), s * 0.78, s * 1.22, 0.38, 1.32);           /* mud flaps */
    }
    for (i = 0; i < 4; i++) K.bb(T.dark, X(3.40 + i * 0.9) - 0.06, X(3.40 + i * 0.9) + 0.06, -0.95, 0.95, 1.08, 1.32);
    K.bb(T.dark, X(0.00), X(0.10), -1.25, 1.25, 1.02, 1.32);                   /* lamp bar */
    for (s = -1; s <= 1; s += 2) K.bb(T.dark, X(-0.01), X(0.00), s * 0.85, s * 1.10, 1.10, 1.22);
    K.bb(T.dark, X(0.95), X(2.25), -0.40, 0.40, 0.85, 1.00);                   /* walking beam */
    /* gooseneck: deck plate, the box under it, kingpin plate */
    K.bb(T.skin, X(7.05), X(10.19), -1.25, 1.25, 1.95, 2.20);
    K.bb(T.skin, X(7.05), X(10.19), -0.92, 0.92, 1.42, 1.95);
    K.prism(T.skin, [[6.55 - OFF, 1.32], [7.05 - OFF, 1.32], [7.05 - OFF, 1.95], [6.55 - OFF, 1.70]], -0.92, 0.92);
    K.bb(T.dark, X(9.00), X(9.90), -0.50, 0.50, 1.38, 1.42);
    K.cyl(T.dark, 0.06, 0.10, 8, X(XKP), 0, 1.33, "z");                        /* kingpin */
    for (s = -1; s <= 1; s += 2) K.bb(T.dark, X(7.05), X(10.19), s * 1.25, s * 1.27, 2.00, 2.14);
    /* generator set on the gooseneck, louvred grille high at the front of
       the starboard side, visor over its rear top [S][L] */
    /* narrow, with a walk on either side of it ([P]: a soldier each side) */
    var GY = 0.62;
    K.bb(T.skin, X(7.25), X(9.80), -GY, GY, 2.20, 3.85);
    K.bb(T.skin, X(7.08), X(7.40), -GY - 0.04, GY + 0.04, 3.79, 3.87);
    K.bb(T.dark, X(9.00), X(9.65), -GY - 0.005, -GY + 0.005, 3.38, 3.76);
    for (i = 0; i < 5; i++) K.bb(T.dark, X(9.02), X(9.63), -GY - 0.02, -GY, 3.42 + i * 0.07, 3.44 + i * 0.07);
    K.bb(T.dark, X(9.80), X(9.81), -0.50, 0.50, 2.95, 3.70);                   /* louvred front [P][W] */
    for (i = 0; i < 6; i++) K.bb(T.dark, X(9.81), X(9.83), -0.48, 0.48, 3.00 + i * 0.12, 3.04 + i * 0.12);
    for (s = -1; s <= 1; s += 2) {
      var dx = [7.55, 8.55, 9.55];
      for (i = 0; i < dx.length; i++) K.bb(T.dark, X(dx[i]) - 0.015, X(dx[i]) + 0.015, s * GY, s * (GY + 0.01), 2.40, 3.30);
      K.bb(T.dark, X(7.55), X(9.55), s * GY, s * (GY + 0.01), 2.39, 2.41);
      K.bb(T.dark, X(8.40), X(8.48), s * GY, s * (GY + 0.03), 2.80, 2.95);
      K.bb(T.dark, X(9.40), X(9.48), s * GY, s * (GY + 0.03), 2.80, 2.95);
      K.bb(T.dark, X(7.30), X(9.75), s * 1.18, s * 1.22, 2.20, 3.10);           /* walk rails */
      K.bb(T.dark, X(7.30), X(9.75), s * 1.18, s * 1.22, 3.05, 3.10);
    }
    K.cyl(T.dark, 0.05, 0.30, 8, X(7.70), 0.30, 4.00, "z");                     /* exhaust stub */
    K.bb(T.team, X(7.80), X(9.20), -0.45, 0.45, 3.85, 3.88);                    /* roof flash */
    /* the tractor's cab-roof flash rides in this mesh (one team draw call) */
    K.bb(T.team, X(15.40), X(16.15), -0.80, 0.80, 2.63, 2.66);
    /* LEM under the front of the stack, the long box slung to starboard */
    K.bb(T.skin, X(4.40), X(6.45), -1.27, 1.27, 1.30, 2.12);                   /* hangs over the sides [S] */
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.dark, X(5.40), X(5.43), s * 1.27, s * 1.28, 1.35, 2.08);
      K.bb(T.dark, X(5.10), X(5.25), s * 1.27, s * 1.30, 1.75, 1.79);
      K.bb(T.dark, X(5.58), X(5.73), s * 1.27, s * 1.30, 1.75, 1.79);
    }
    K.bb(T.skin, X(4.40), X(6.50), -1.25, -0.60, 0.55, 1.16);
    K.bb(T.dark, X(5.45), X(5.48), -1.26, -1.25, 0.60, 1.12);
    K.bb(T.skin, X(3.30), X(4.20), -1.20, -0.75, 0.62, 1.05);                  /* small box [S] */
    /* outrigger mounts at the four corners */
    var mx = [0.32, 6.95];
    for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2)
      K.bb(T.dark, X(mx[i]) - 0.32, X(mx[i]) + 0.32, s * 1.22, s * 1.34, 1.30, 1.70);
  }

  /* ------------------------------------------------------- outriggers */
  /* A-frames with round pads; set up they splay out wide (the rear pads
     held to 0.30 m behind the tail, see the header); on the march they are
     folded up at the corners. */
  function legs(K, T, down) {
    var i, s, mx = [0.32, 6.95];
    for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) {
      var x = mx[i], foot;
      if (down) foot = i === 0 ? [X(-0.08), s * 2.05, 0.10] : [X(x), s * 2.15, 0.10];
      else foot = [X(x), s * 1.42, 2.30];
      K.rod(T.skin, 0.06, [X(x - 0.26), s * 1.32, 1.42], foot, 6);
      K.rod(T.skin, 0.06, [X(x + 0.26), s * 1.32, 1.42], foot, 6);
      K.rod(T.skin, 0.035, [X(x), s * 1.32, 1.62], foot, 6);
      if (down) {
        K.cyl(T.dark, 0.22, 0.06, 12, foot[0], foot[1], 0.03, "z");
        K.cyl(T.skin, 0.07, 0.10, 8, foot[0], foot[1], 0.11, "z");
      } else K.bb(T.skin, foot[0] - 0.18, foot[0] + 0.18, foot[1] - 0.03, foot[1] + 0.03, 2.22, 2.38);
    }
  }

  /* --------------------------------------------------- the canisters */
  /* One canister (or pack) of section y0..y1 x z0..z1 in the pod's frame:
     body with rib rings, open end frames X-braced on the outer sides
     (side = -1 or +1 when that side is outermost, 0 otherwise). */
  function canister(K, T, M, y0, y1, z0, z1, sideL, sideR, top, lite) {
    var i, rx, e, ends = [[SX0, SB0], [SB1, SX1]];
    K.bb(M, SB0, SB1, y0 + 0.01, y1 - 0.01, z0 + 0.01, z1 - 0.01);
    for (rx = SB0 + 0.35; rx < SB1 - 0.2; rx += lite ? 1.24 : 0.62)
      K.bb(M, rx - 0.03, rx + 0.03, y0, y1, z0, z1 + (top ? 0.03 : 0));
    for (e = 0; e < 2; e++) {
      var a = ends[e][0], b = ends[e][1], f = e === 0 ? a : b, w = 0.055;
      /* corner bars (the small MSE canisters: their outer ones only) and the end ring */
      if (!lite || sideL || top) K.bb(M, a, b, y0, y0 + w, z1 - w, z1);
      if (!lite || sideR || top) K.bb(M, a, b, y1 - w, y1, z1 - w, z1);
      if (!lite || sideL) K.bb(M, a, b, y0, y0 + w, z0, z0 + w);
      if (!lite || sideR) K.bb(M, a, b, y1 - w, y1, z0, z0 + w);
      var r0 = e === 0 ? a : b - 0.06, r1 = e === 0 ? a + 0.06 : b;
      K.bb(M, r0, r1, y0, y1, z0, z0 + w); K.bb(M, r0, r1, y0, y1, z1 - w, z1);
      K.bb(M, r0, r1, y0, y0 + w, z0, z1); K.bb(M, r0, r1, y1 - w, y1, z0, z1);
      if (sideL) { K.rod(M, 0.022, [a, y0 + 0.02, z0 + 0.05], [b, y0 + 0.02, z1 - 0.05], 4);
                   K.rod(M, 0.022, [a, y0 + 0.02, z1 - 0.05], [b, y0 + 0.02, z0 + 0.05], 4); }
      if (sideR) { K.rod(M, 0.022, [a, y1 - 0.02, z0 + 0.05], [b, y1 - 0.02, z1 - 0.05], 4);
                   K.rod(M, 0.022, [a, y1 - 0.02, z1 - 0.05], [b, y1 - 0.02, z0 + 0.05], 4); }
      if (top) { K.rod(M, 0.022, [a, (y0 + y1) / 2, z1 - 0.02], [b, y0 + 0.06, z1 - 0.02], 4);
                 K.rod(M, 0.022, [a, (y0 + y1) / 2, z1 - 0.02], [b, y1 - 0.06, z1 - 0.02], 4); }
      /* the closure inside the frame */
      K.bb(T.dark, e === 0 ? SB0 - 0.02 : SB1, e === 0 ? SB0 : SB1 + 0.02, y0 + 0.04, y1 - 0.04, z0 + 0.04, z1 - 0.04);
      void f;
    }
  }

  /* ------------------------------------------------------- the launcher */
  /* The LMA base on the turntable (the turret's own meshes) and the pod:
     frame, canisters, rams, all in the "podelev" frame (origin on the
     hinge, +X along the canisters toward their mouths). */
  function base(K, T) {
    var s;
    K.cyl(T.dark, 1.00, 0.08, 24, 0, 0, 0.04, "z");                            /* turntable ring */
    K.bb(T.skin, -1.40, 1.45, -1.08, 1.08, 0.08, 0.30);
    K.bb(T.dark, -1.36, 1.41, -1.09, 1.09, 0.10, 0.16);
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.skin, HX - 0.16, HX + 0.16, s * 0.74, s * 0.94, 0.28, HZ + 0.10);   /* hinge lugs */
      K.bb(T.dark, 1.25, 1.45, s * 0.52, s * 0.72, 0.28, 0.48);                 /* ram clevis */
      K.bb(T.dark, -0.20, 0.60, s * 1.08, s * 1.10, 0.12, 0.26);                 /* access panel */
    }
    K.cyl(T.dark, 0.07, 1.96, 10, HX, 0, HZ, "y");                              /* hinge pin */
    /* cable bundle from the base to the rear of the stack */
    for (s = -1; s <= 1; s += 2) K.rod(T.dark, 0.045, [HX + 0.10, s * 0.30, 0.30], [HX - 0.25, s * 0.40, 0.75], 6);
  }
  function pod(K, T, V, M) {
    var s, i, j, cells = [];
    /* frame beams, cross members, hinge blocks, ram brackets */
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.skin, SX0, SX1 - 0.18, s * 0.52, s * 0.72, -0.10, SZ0);
      K.bb(T.skin, -0.18, 0.22, s * 0.52, s * 0.74, -0.16, SZ0);
      K.bb(T.dark, 3.30, 3.50, s * 0.54, s * 0.70, -0.18, -0.10);
    }
    for (i = 0; i < 5; i++) K.bb(T.dark, 0.30 + i * 1.20 - 0.05, 0.30 + i * 1.20 + 0.05, -0.95, 0.95, 0.02, SZ0);
    /* rams: true from the base's clevis to the bracket at the launch angle */
    var cx = (1.35 - HX), cz = (0.38 - HZ);
    var lx = cx * Math.cos(EL) + cz * Math.sin(EL), lz = -cx * Math.sin(EL) + cz * Math.cos(EL);
    for (s = -1; s <= 1; s += 2) {
      var A = [3.40, s * 0.62, -0.14], Cc = [lx, s * 0.62, lz];
      var Mm = [Cc[0] + 0.55 * (A[0] - Cc[0]), s * 0.62, Cc[2] + 0.55 * (A[2] - Cc[2])];
      K.rod(T.skin, 0.10, Cc, Mm, 10);
      K.rod(T.steel, 0.055, Mm, A, 8);
    }
    /* the load */
    var nY, nZ, cw, ch, k = V.gen;
    if (k === "mse") { nY = 4; nZ = 3; } else { nY = 2; nZ = 2; }
    cw = 1.84 / nY; ch = (SZ1 - SZ0) / nZ;
    for (i = 0; i < nY; i++) for (j = 0; j < nZ; j++) {
      var y0 = -0.92 + i * cw, y1 = y0 + cw, z0 = SZ0 + j * ch, z1 = z0 + ch;
      canister(K, T, M, y0, y1, z0, z1, i === 0, i === nY - 1, j === nZ - 1, k === "mse");
      var yc = (y0 + y1) / 2, zc = (z0 + z1) / 2;
      if (k === "pac3") {
        /* a pack of four rounds, 2 x 2 round caps at each end [M] */
        for (var a = -1; a <= 1; a += 2) for (var b = -1; b <= 1; b += 2) {
          K.disc(T.dark, 0.15, SB1 + 0.025, yc + a * 0.22, zc + b * 0.22);
          K.disc(T.dark, 0.15, SB0 - 0.025, yc + a * 0.22, zc + b * 0.22, true);
          cells.push([SB1 + 0.03, yc + a * 0.22, zc + b * 0.22, SB0]);
        }
      } else if (k === "mse") {
        K.disc(T.dark, 0.17, SB1 + 0.025, yc, zc);
        K.disc(T.dark, 0.17, SB0 - 0.025, yc, zc, true);
        cells.push([SB1 + 0.03, yc, zc, SB0]);
      } else {
        /* PAC-2: one round, a flat cover with its square boss */
        K.bb(T.dark, SB1 + 0.02, SB1 + 0.05, yc - 0.20, yc + 0.20, zc - 0.20, zc + 0.20);
        K.disc(T.dark, 0.18, SB0 - 0.025, yc, zc, true);
        cells.push([SB1 + 0.05, yc, zc, SB0]);
      }
    }
    /* hold-down straps over the top */
    for (i = 0; i < 2; i++) K.bb(M, 1.4 + i * 2.4, 1.48 + i * 2.4, -0.94, 0.94, SZ1, SZ1 + 0.04);
    return cells;
  }

  /* ------------------------------------------------------------- wheels */
  /* One group per axle, named "roadwheel": the axle is the group's local
     Y, which is what render3d.js turns.  Both tyres baked into one mesh.
     Twenty-four segments round, the crown notched every other one so that
     a turning tyre is seen to turn. */
  function tyreGeo(THREE, R, h) {
    var ring = [[R * 0.58, -h * 0.93, 0], [R * 0.90, -h, 0], [R, -h * 0.50, 1],
                [R, h * 0.50, 1], [R * 0.90, h, 0], [R * 0.58, h * 0.93, 0]];
    var N = 24, P = [], j, k;
    function pt(k, j) {
      var a = j / N * Math.PI * 2, r = ring[k][0] * (ring[k][2] && (j & 1) ? 0.945 : 1);
      return [r * Math.cos(a), ring[k][1], r * Math.sin(a)];
    }
    function tri(a, b, c, a0) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var cx = (a[0] + b[0] + c[0]) / 3 - 0.79 * R * Math.cos(a0);
      var cz = (a[2] + b[2] + c[2]) / 3 - 0.79 * R * Math.sin(a0);
      var cy = (a[1] + b[1] + c[1]) / 3;
      if (nx * cx + ny * cy + nz * cz < 0) { var t = b; b = c; c = t; }
      P.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    }
    for (k = 0; k < ring.length - 1; k++) for (j = 0; j < N; j++) {
      var a0 = (j + 0.5) / N * Math.PI * 2;
      var A = pt(k, j), B = pt(k, j + 1), C = pt(k + 1, j + 1), D = pt(k + 1, j);
      tri(A, B, C, a0); tri(A, C, D, a0);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
    g.computeVertexNormals();
    return g;
  }
  /* the disc wheel: a dished face and a hub cap, in the tyre material */
  function hubGeo(THREE, R, h) {
    var p = [new THREE.Vector2(R * 0.60, h * 0.93), new THREE.Vector2(R * 0.42, h * 0.97),
             new THREE.Vector2(R * 0.30, h * 1.02), new THREE.Vector2(R * 0.17, h * 1.12),
             new THREE.Vector2(0.02, h * 1.14)];
    return new THREE.LatheGeometry(p, 10);
  }
  function wheelGroup(THREE, T, x, R, h, Y, yBar) {
    var g = new THREE.Group();
    g.name = "roadwheel";
    g.position.set(x, 0, R);
    var K = new Baker(THREE), s;
    for (s = -1; s <= 1; s += 2) {
      K.put(T.rub, tyreGeo(THREE, R, h), 0, s * Y, 0);
      K.put(T.rub, hubGeo(THREE, R, h), 0, s * Y, 0, s < 0 ? Math.PI : 0, 0, 0);
    }
    K.put(T.rub, new THREE.CylinderGeometry(0.09, 0.09, yBar * 2, 8), 0, 0, 0);
    K.flush(g);
    return g;
  }

  /* ========================================================== ASSEMBLY  */
  function build(THREE, C, V) {
    var T = makeMats(THREE, C, V), i;
    var root = new THREE.Group();
    root.name = "patriot_launcher";

    /* the trailer: direct meshes of the root (the SAM site copies them) */
    var K = new Baker(THREE);
    trailer(K, T);
    K.flush(root);

    /* the tractor, coupled in both poses [K][W] */
    var tg = new THREE.Group(); tg.name = "m983";
    K = new Baker(THREE);
    tractor(K, T, V.tanTractor ? T.tan : T.skin);
    K.flush(tg);
    root.add(tg);

    /* poses: outriggers folded and mast down / outriggers down, mast up */
    var trv = new THREE.Group(); trv.name = "travelpose";
    K = new Baker(THREE); legs(K, T, false); K.flush(trv);
    root.add(trv);
    var dep = new THREE.Group(); dep.name = "deploypose"; dep.visible = false;
    K = new Baker(THREE); legs(K, T, true);
    /* data-link mast, two poles on the port side by the hinge [S][L] */
    K.bb(T.dark, X(1.40), X(1.80), 1.25, 1.45, ZD - 0.20, ZD + 0.05);
    K.cyl(T.skin, 0.075, 4.30 - ZD, 10, X(1.52), 1.36, (4.30 + ZD) / 2, "z");
    K.cyl(T.dark, 0.035, 4.60 - ZD, 8, X(1.70), 1.36, (4.60 + ZD) / 2, "z");
    K.bb(T.dark, X(1.48), X(1.74), 1.33, 1.39, 3.40, 3.45);
    K.flush(dep);
    root.add(dep);

    /* the launcher: LMA base on the turntable, trained as the turret */
    var tur = new THREE.Group();
    tur.name = "turret";
    tur.position.set(X(XTT), 0, ZD);
    root.add(tur);
    K = new Baker(THREE); base(K, T); K.flush(tur);
    var pe = new THREE.Group();
    pe.name = "podelev";
    pe.position.set(HX, 0, HZ);
    K = new Baker(THREE);
    var cells = pod(K, T, V, V.tanCans ? T.can : T.skin);
    K.flush(pe);
    pe.userData.el = EL;
    pe.userData.cells = cells;
    tur.add(pe);

    for (i = 0; i < AXT.length; i++) root.add(wheelGroup(THREE, T, X(AXT[i]), RT, HT, YT, YT));
    for (i = 0; i < AXL.length; i++) root.add(wheelGroup(THREE, T, X(AXL[i]), RT, HT, YL, YL));

    root.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return root;
  }

  return {
    build: build,
    /* for js/hero/us_sam_site.js: where this trailer's wheels and kingpin are */
    site: { axles: [X(AXL[0]), X(AXL[1])], r: RT, w: HT * 2, y: YL, kingpin: X(XKP), front: X(10.19) }
  };
})();

/* The same M983 and M860 serve every row; what changes is the load and the
   paint.  len is the measured X extent over both poses (the set-up pads
   0.30 m behind the tail to the bumper face). */
(function () {
  var VARS = {
    nato_e80_sam: { gen: "pac2", paint: "camo" },
    nato_e90_sam: { gen: "pac2", paint: "tan" },
    nato_e00_sam: { gen: "pac3", paint: "camo", tanCans: true },
    sam_n:        { gen: "mse",  paint: "camo", tanCans: true, tanTractor: true }
  };
  Object.keys(VARS).forEach(function (k) {
    UNIT_MODELS[k] = { len: 17.19, build: function (THREE, M, C) { return HeroUsPatriot.build(THREE, C, VARS[k]); } };
  });
})();
