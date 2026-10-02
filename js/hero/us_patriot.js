/* ===== us_patriot.js - HERO model: MIM-104 Patriot launching station ======
   Rows: nato_e80_sam (Patriot PAC-2, M901), nato_e90_sam (PAC-2 GEM, the
   same M901), nato_e00_sam (PAC-3, sixteen rounds in four packs) and sam_n
   (PAC-3 MSE, twelve canisters in three rows of four).

   What the game's unit is: a launching station on its M860 semitrailer
   behind an M983 HEMTT tractor, as the rows' own text says ("four sealed
   canisters on a semitrailer behind an eight-wheeled tractor").  The radar
   set, the control station and the power plant are separate vehicles and
   are not drawn.  The launcher is drawn in its fire position: the canister
   frame cranked to its single fixed launch angle, 38 degrees, the data link
   mast up and the stabiliser legs down.  render3d.js has no hook for a
   deploy pose, and the launch position is the one a Patriot spends its
   time in.

   References (no photograph was traced; proportions are scaled off them
   against the tyre, which is 16.00R20 on the tractor - 1.30 m - and about
   1.25 m on the trailer):
     - the MIM-104 Patriot article: the radar set and the launchers ride on
       M860 semitrailers towed by Oshkosh M983 HEMTTs; M901 carries up to
       four PAC-2, M902 sixteen PAC-3, M903 can be loaded 4 PAC-3 canisters
       (16 rounds), 12 PAC-3 MSE canisters "in 3 rows of 4" or 4 PAC-2 GEM;
       the PAC-2 round is 5.8 m long, one per canister, four to a launcher;
       a PAC-3 canister holds four rounds;
     - Wikimedia Commons photographs of deployed US launchers: "Patriot
       missile battery Romania 2" (a side view, the whole trailer), "U.S.
       service members stand by a Patriot missile battery in Gaziantep,
       Turkey" (Feb 2013: the camouflaged launcher, a tan up-armoured
       tractor) and "Patriot PAC-3 MSE SIAF-2022" (tan MSE canisters in a
       green frame);
     - HEMTT M977 data already used in units3d.js: 2.44 m wide, 2.57 m to
       the cab roof, a LOW cab behind a real bonnet, axles in two pairs
       1.52 m apart.
   What the photographs showed and the old model had wrong:
     - the trailer's axles are not at the tail.  The two axles sit under the
       middle of the trailer and the deck runs about four metres behind
       them, bare but for the stabiliser legs (the box that shows behind
       the tail of one launcher in the Romania photograph is the next
       launcher's LEM, not a generator set: no generator is drawn);
     - the launcher's turntable is over the tandem, about a third of the
       trailer from the tail, not at the middle: the canister frame, which
       lies forward when stowed, then ends at the LEM at the gooseneck end,
       which is how the stowed launchers stand in the Romania photograph
       (a 6 m frame pivoted at the middle would overhang the cab);
     - the canister stack is a box frame of rectangular canisters, not
       round tubes, and the PAC-3 front is four packs with four round
       hatches each (8 across, 2 high), the MSE front a grid of twelve;
     - the launcher electronics module is a tall box on a pedestal beside
       the frame, ahead of it, and the elevation rams are two long thin
       rods;
     - the canister tops carry a run of cross ribs;
     - stabiliser legs are A-frames (two struts and a pad), not jacks;
     - the data link antenna is a pole beside the frame, not a stub on the
       trailer (drawn up to the frame's top corner; the real one is taller).
   Estimated, not published: the deck height (1.85 m), the M983 wheelbase
   (5.2 m, 1.52 / 2.15 / 1.52), the canister section (0.58 m wide) and the
   mast height.

   Frame: +X is the cab end.  The "turret" group is the launcher: it is
   trained about its own Z with the canisters leaning along +X, which is the
   direction render3d.js points it, and its origin is on the turntable.
   The LEM box, the legs and the mast stand on the trailer
   or the base and clear every azimuth the frame can take.

   Draw calls: every part that does not move is baked, one mesh per
   material; the launcher is its own group because it trains; each axle is
   one roadwheel group (both tyres, the duals and the axle bar in a single
   mesh, which spins about the axle because the group's local Y is the
   axle).  Fourteen to sixteen meshes, six to eight materials, 7,100 to
   7,300 triangles.
   Team colour: C.team exactly, on the cab roof and on the trailer's
   front deck, so it reads from the RTS camera and survives the era kit.
   ASCII only: a stray byte inside a hex literal has broken this before.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroUsPatriot = (function () {
  "use strict";

  /* ------------------------------------------------------------ layout */
  var XB = 7.78;                       /* bumper face                       */
  var XT = -7.60;                      /* trailer tail; guard to 15.44 m    */
  var AXT = [6.15, 4.63, 2.48, 0.96];  /* M983: pairs 1.52 m apart, 2.15 between */
  var RT = 0.65, HT = 0.205, YT = 1.02;          /* 16.00R20, track 2.04 m   */
  var AXL = [-2.10, -3.55];            /* M860: tandem under mid trailer    */
  var RL = 0.62, HL = 0.185, YLO = 1.12, YLI = 0.67;   /* duals              */
  var ZD = 1.85;                       /* trailer deck                      */
  var XP = -4.50;                      /* turntable: over the tandem, ~3 m from the tail */
  var ELEV = 38 * Math.PI / 180;       /* the one launch angle              */
  var HZ = 0.62;                       /* hinge above the turntable         */

  /* ------------------------------------------------------------- paint */
  /* NATO three-tone: green, brown and black in big soft blots.  One canvas
     per page, tiled seamlessly (every blot is drawn nine times). */
  var _cv = null;
  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function camoCanvas() {
    if (_cv) return _cv;
    var R = rng(19841), W = 512, H = 512, i;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var q = cv.getContext("2d");
    q.fillStyle = "#5b6c45"; q.fillRect(0, 0, W, H);
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
    blots("#706044", 12, 40, 95);
    blots("#2c3025", 9, 26, 72);
    /* dust and wear, light and dark, so the flats are not a flat colour */
    for (i = 0; i < 26; i++) {
      q.fillStyle = R() < 0.5 ? "rgba(214,204,160,0.06)" : "rgba(30,28,18,0.07)";
      q.fillRect(R() * W, R() * H, 30 + R() * 120, 20 + R() * 80);
    }
    _cv = cv;
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
    var tex = canvasTex(THREE, camoCanvas());
    T.skin = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05 });
    if (tex) T.skin.map = tex; else T.skin.color.setHex(0x535a3c);
    T.skin.userData.worldUV = 8.0;
    T.steel = new THREE.MeshStandardMaterial({ color: 0x80868a, roughness: 0.50, metalness: 0.42 });
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25292b, roughness: 0.80, metalness: 0.20 });
    T.rub = new THREE.MeshStandardMaterial({ color: 0x1b1c1c, roughness: 0.95, metalness: 0.02 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x24343d, roughness: 0.14, metalness: 0.30 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                              roughness: 0.55, metalness: 0.18 });
    /* the 2013 photograph: an up-armoured M983 in desert tan under a green
       launcher; and the MSE canisters in the 2022 photograph are tan too */
    if (V.tan) T.tan = new THREE.MeshStandardMaterial({ color: 0xa1956f, roughness: 0.88, metalness: 0.04 });
    if (V.gen === "mse") T.can = new THREE.MeshStandardMaterial({ color: 0xb9aa82, roughness: 0.86, metalness: 0.04 });
    return T;
  }

  /* ------------------------------------------------------------- baker */
  /* Positioned geometry collected per material, one mesh per material.
     xf, when set, is the parent transform of the part being added: it is
     how the canister frame is built in its own axes and then cranked up. */
  function Baker(THREE) { this.T = THREE; this.by = []; this.xf = null; }
  Baker.prototype.add = function (mat, geo) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    if (this.xf) g.applyMatrix4(this.xf);
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
  /* a flat round hatch facing +X */
  Baker.prototype.disc = function (mat, r, x, y, z) {
    this.put(mat, new this.T.CircleGeometry(r, 12), x, y, z, 0, Math.PI / 2, 0);
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
  /* box projection by each triangle's own facing, so a long box face does
     not stretch the whole canvas */
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
  /* M983 HEMTT: a flat bonnet, a short tall cab set over the front pair of
     axles, two bare metres of frame, the fifth wheel over the rear pair.
     S is the paint of the tractor's own panels (green, or tan on the MSE
     row). */
  function tractor(K, T, S) {
    var i, s;
    K.bb(T.dark, -0.15, 7.56, -0.52, 0.52, 0.80, 1.16);               /* frame rails */
    K.bb(T.dark, -0.26, -0.12, -0.95, 0.95, 0.84, 1.14);              /* tail cross member */
    K.cyl(T.steel, 0.52, 0.12, 14, 1.80, 0, 1.28, "z");               /* fifth wheel */
    K.bb(T.dark, 1.20, 2.40, -0.44, 0.44, 1.16, 1.22);

    /* bonnet, grille, bumper, lamps */
    K.bb(S, 5.95, 7.46, -1.00, 1.00, 1.28, 1.92);
    K.bb(T.dark, 7.44, 7.52, -0.88, 0.88, 1.34, 1.84);
    for (i = 0; i < 3; i++) K.bb(T.steel, 7.50, 7.54, -0.80, 0.80, 1.44 + i * 0.14, 1.48 + i * 0.14);
    K.bb(T.steel, 7.50, XB, -1.22, 1.22, 0.84, 1.08);
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.steel, 7.40, 7.52, s * 0.92, s * 1.14, 1.62, 1.80);
      K.bb(T.glass, 7.52, 7.54, s * 0.95, s * 1.11, 1.66, 1.76);
    }

    /* the cab: one slab-sided box over the first two axles, raked glass */
    K.bb(S, 4.30, 5.95, -1.17, 1.17, 1.32, 2.52);
    K.bb(S, 4.26, 5.99, -1.19, 1.19, 2.52, 2.58);
    K.box(T.glass, 0.04, 1.98, 0.62, 5.965, 0, 2.20, 0, -0.17, 0);
    K.bb(T.glass, 4.28, 4.30, -0.62, 0.62, 1.86, 2.34);
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.glass, 4.62, 5.60, s * 1.168, s * 1.182, 1.80, 2.40);
      K.bb(T.dark, 4.58, 4.61, s * 1.168, s * 1.182, 1.34, 2.50);
      K.bb(T.dark, 5.62, 5.65, s * 1.168, s * 1.182, 1.34, 2.50);
      /* mirror arm and the tall mirror */
      K.bb(T.steel, 5.86, 5.94, s * 1.17, s * 1.42, 2.28, 2.33);
      K.bb(T.dark, 5.88, 5.94, s * 1.40, s * 1.46, 1.95, 2.55);
      K.bb(T.steel, 4.80, 5.45, s * 1.17, s * 1.36, 1.00, 1.05);     /* steps */
    }
    K.bb(T.team, 4.45, 5.05, -0.90, 0.90, 2.58, 2.61);                /* roof flash */
    K.bb(T.dark, 5.15, 5.65, -0.40, 0.40, 2.58, 2.63);                /* roof hatch */

    /* behind the cab: exhaust stack, air cleaner, fuel tank, battery box */
    K.cyl(T.steel, 0.075, 1.50, 8, 4.12, -1.02, 1.95, "z");
    K.cyl(T.dark, 0.20, 1.00, 10, 4.10, 0.98, 1.72, "z");
    K.bb(S, 2.95, 4.05, 0.52, 1.00, 0.84, 1.30);
    K.bb(T.dark, 2.95, 4.05, -1.00, -0.52, 0.84, 1.30);

    /* fenders: the big flat flares of the front pair, the rear pair under
       the trailer's gooseneck */
    for (s = -1; s <= 1; s += 2) {
      K.bb(S, 5.30, 7.05, s * 1.00, s * 1.27, 1.52, 1.62);
      K.bb(S, 5.30, 7.05, s * 1.23, s * 1.27, 1.04, 1.52);
      K.bb(S, 0.20, 3.10, s * 0.96, s * 1.26, 1.36, 1.44);
    }
  }

  /* --------------------------------------------------------- the trailer */
  /* M860.  A low gooseneck over the fifth wheel, a flat deck on a tandem
     that sits under the MIDDLE of it, a launch base over the tandem about a
     third of the way up from the tail, the LEM at the front and bare deck
     behind the base.  Stabiliser legs are drawn down. */
  function trailer(K, T) {
    var i, s, x;
    K.bb(T.skin, 0.20, 2.75, -1.25, 1.25, 1.48, ZD);                  /* gooseneck */
    K.bb(T.dark, 1.40, 2.20, -0.40, 0.40, 1.40, 1.48);                /* kingpin plate */
    K.bb(T.skin, XT, 0.20, -1.30, 1.30, 1.62, ZD);                    /* deck */
    K.bb(T.dark, XT - 0.06, XT, -1.20, 1.20, 1.45, 1.78);             /* rear guard */
    K.bb(T.team, 1.45, 2.40, -0.95, 0.95, ZD, ZD + 0.03);             /* front deck flash */
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.dark, -7.10, 0.30, s * 0.42, s * 0.62, 1.10, 1.62);      /* beams */
      K.bb(T.skin, -1.15, -0.15, s * 0.66, s * 1.22, 1.14, 1.60);     /* tool boxes */
    }
    x = [-6.6, -5.0, -0.6];
    for (i = 0; i < x.length; i++) K.bb(T.dark, x[i] - 0.07, x[i] + 0.07, -1.12, 1.12, 1.30, 1.62);
    K.bb(T.dark, -3.95, -1.70, -0.46, 0.46, 0.80, 1.10);              /* bogie */

    /* launcher electronics module, on its pedestal ahead of the frame */
    K.bb(T.skin, -0.20, 1.05, -0.95, 0.05, ZD, 2.40);
    K.bb(T.skin, -0.35, 1.15, -1.05, 0.15, 2.40, 3.35);
    K.bb(T.dark, 1.15, 1.18, -0.92, 0.02, 2.55, 3.20);
    K.bb(T.dark, -0.05, 0.85, -0.85, -0.05, 3.35, 3.38);                /* roof vent */
    K.bb(T.steel, 1.15, 1.20, -0.30, -0.10, 2.80, 2.90);

    /* the rear deck is bare: in transport the stowed canister frame lies
       over it, and in the fire position nothing stands on it but the legs */

    /* stabiliser legs: A-frames with a pad, two pairs */
    var sx = [-0.85, -6.90];
    for (i = 0; i < sx.length; i++) for (s = -1; s <= 1; s += 2) {
      K.bb(T.steel, sx[i] - 0.30, sx[i] + 0.30, s * 1.24, s * 1.34, 1.30, 1.62);
      K.rod(T.steel, 0.055, [sx[i] - 0.28, s * 1.30, 1.55], [sx[i], s * 1.90, 0.08], 6);
      K.rod(T.steel, 0.055, [sx[i] + 0.28, s * 1.30, 1.55], [sx[i], s * 1.90, 0.08], 6);
      K.cyl(T.dark, 0.22, 0.07, 8, sx[i], s * 1.90, 0.035, "z");
    }
  }

  /* -------------------------------------------------------- the launcher */
  /* Built about the turntable (origin on the deck) and trained as one
     group.  The frame is built in its own axes - X along the canisters, Z
     up from its tray - and cranked to 38 degrees about the hinge. */
  function launcher(K, T, THREE, V) {
    var s, i, j, a, b;
    K.cyl(T.steel, 1.18, 0.12, 20, 0, 0, 0.06, "z");                  /* turntable ring */
    K.bb(T.skin, -0.85, 0.95, -1.02, 1.02, 0.12, 0.46);               /* base */
    K.bb(T.dark, -0.80, 0.90, -1.04, 1.04, 0.10, 0.20);
    for (s = -1; s <= 1; s += 2) K.bb(T.steel, -0.22, 0.22, s * 1.04, s * 1.20, 0.30, 0.86);  /* hinge lugs */

    /* data link mast: beside the frame, so that no azimuth runs through it.
       The real pole stands well above the frame; it is cut off level with
       the frame's top corner, because the era kit of the allied stand-ins is
       placed by the model's highest point and a 9 m pole would carry their
       stowage up with it. */
    K.bb(T.steel, -0.95, -0.62, 1.02, 1.70, 0.12, 0.28);
    K.cyl(T.steel, 0.07, 2.62, 8, -0.78, 1.62, 1.59, "z");
    K.cyl(T.steel, 0.035, 1.65, 6, -0.78, 1.62, 3.725, "z");

    /* elevation rams, from the base to the frame's underside */
    var ct = Math.cos(ELEV), st = Math.sin(ELEV), fx = 3.4;
    var bx = fx * ct, bz = HZ + fx * st;
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.steel, 0.70, 1.00, s * 0.72, s * 0.92, 0.46, 0.58);        /* clevis on the base */
      var A = [0.85, s * 0.82, 0.54], B = [bx, s * 0.82, bz];
      var M = [A[0] + 0.55 * (B[0] - A[0]), A[1], A[2] + 0.55 * (B[2] - A[2])];
      K.rod(T.dark, 0.10, A, M, 8);
      K.rod(T.steel, 0.055, M, B, 8);
    }

    /* the frame */
    var TH = V.gen === "mse" ? 1.26 : 0.66;          /* stack thickness      */
    var X0 = V.gen === "pac2" ? -0.90 : -0.50, X1 = 5.20, Z0 = 0.14;
    K.xf = new THREE.Matrix4().compose(new THREE.Vector3(0, 0, HZ),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -ELEV, 0)), new THREE.Vector3(1, 1, 1));
    K.bb(T.skin, X0 - 0.05, X1 + 0.06, -1.30, 1.30, 0, Z0);                       /* tray */
    for (s = -1; s <= 1; s += 2) K.bb(T.skin, X0 - 0.05, X1 + 0.06, s * 1.22, s * 1.32, 0, Z0 + TH + 0.18);
    K.bb(T.skin, X0 - 0.10, X0 + 0.05, -1.32, 1.32, 0, Z0 + TH + 0.18);           /* breech beam */
    var strap = [0.4, 1.5, 2.6, 3.7, 4.8];
    for (i = 0; i < strap.length; i++) K.bb(T.steel, strap[i] - 0.05, strap[i] + 0.05, -1.32, 1.32, Z0 + TH, Z0 + TH + 0.06);
    K.bb(T.steel, X1 + 0.02, X1 + 0.12, -1.32, 1.32, Z0 + TH, Z0 + TH + 0.10);    /* muzzle bar */
    for (s = -1; s <= 1; s += 2) K.bb(T.steel, -0.10, 0.50, s * 1.00, s * 1.20, -0.16, 0);   /* hinge brackets */
    for (i = 0; i < 3; i++) K.bb(T.dark, 1.0 + i * 1.5 - 0.06, 1.0 + i * 1.5 + 0.06, -1.25, 1.25, -0.10, 0);  /* ribs under the tray */

    var can = V.gen === "mse" ? T.can : T.skin;
    var cw = 0.58, pitch = 0.62, yc, rx;
    /* the canister tops carry a run of cross ribs, as in the photographs */
    var ribs = [];
    for (rx = X0 + 0.45; rx < X1 - 0.30; rx += 0.46) ribs.push(rx);
    for (i = 0; i < 4; i++) {
      yc = (i - 1.5) * pitch;
      if (V.gen === "pac2") {
        /* one big round per canister, four to the launcher */
        K.bb(can, X0, X1, yc - cw / 2, yc + cw / 2, Z0, Z0 + TH);
        K.bb(T.dark, X1, X1 + 0.05, yc - cw / 2 - 0.01, yc + cw / 2 + 0.01, Z0, Z0 + TH);
        K.bb(T.dark, X0 - 0.10, X0, yc - cw / 2, yc + cw / 2, Z0, Z0 + TH);
        K.disc(T.steel, 0.215, X1 + 0.065, yc, Z0 + TH / 2);
        for (j = 0; j < ribs.length; j++) K.bb(can, ribs[j] - 0.035, ribs[j] + 0.035, yc - cw / 2 + 0.03, yc + cw / 2 - 0.03, Z0 + TH - 0.012, Z0 + TH + 0.045);
      } else if (V.gen === "pac3") {
        /* a pack of four small rounds, two by two */
        K.bb(can, X0, X1, yc - cw / 2, yc + cw / 2, Z0, Z0 + TH);
        K.bb(T.dark, X1, X1 + 0.05, yc - cw / 2 - 0.01, yc + cw / 2 + 0.01, Z0, Z0 + TH);
        K.bb(T.dark, X0 - 0.10, X0, yc - cw / 2, yc + cw / 2, Z0, Z0 + TH);
        for (a = -1; a <= 1; a += 2) for (b = -1; b <= 1; b += 2)
          K.disc(T.steel, 0.115, X1 + 0.065, yc + a * 0.145, Z0 + TH / 2 + b * 0.155);
        for (j = 0; j < ribs.length; j++) K.bb(can, ribs[j] - 0.035, ribs[j] + 0.035, yc - cw / 2 + 0.03, yc + cw / 2 - 0.03, Z0 + TH - 0.012, Z0 + TH + 0.045);
      } else {
        /* MSE: single-round canisters, three rows of four */
        for (j = 0; j < 3; j++) {
          var z0 = Z0 + j * (TH / 3);
          K.bb(can, X0, X1, yc - cw / 2, yc + cw / 2, z0 + 0.012, z0 + TH / 3 - 0.012);
          K.bb(T.dark, X1, X1 + 0.05, yc - cw / 2 - 0.01, yc + cw / 2 + 0.01, z0 + 0.012, z0 + TH / 3 - 0.012);
          K.disc(T.steel, 0.15, X1 + 0.065, yc, z0 + TH / 6);
        }
        K.bb(T.dark, X0 - 0.10, X0, yc - cw / 2, yc + cw / 2, Z0, Z0 + TH);
        for (j = 0; j < ribs.length; j++) K.bb(can, ribs[j] - 0.035, ribs[j] + 0.035, yc - cw / 2 + 0.03, yc + cw / 2 - 0.03, Z0 + TH - 0.012, Z0 + TH + 0.045);
      }
    }
    K.xf = null;
  }

  /* ------------------------------------------------------------- wheels */
  /* One group per axle, named "roadwheel": the axle is the group's local
     Y, which is what render3d.js turns.  Both tyres (and the duals) are
     baked into one mesh. */
  /* Twenty-four segments round, the crown notched every other one so that a
     turning tyre is seen to turn (a smooth one shows nothing).  Flat
     shaded; each face is wound away from the middle of its own
     cross-section, so nothing depends on the order of the rings. */
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
  function hubGeo(THREE, R, h) {
    var p = [new THREE.Vector2(R * 0.60, h * 0.93), new THREE.Vector2(R * 0.36, h * 0.99),
             new THREE.Vector2(R * 0.22, h * 1.10), new THREE.Vector2(0.02, h * 1.10)];
    return new THREE.LatheGeometry(p, 8);
  }
  function wheelGroup(THREE, T, x, R, h, tyres, yBar) {
    var g = new THREE.Group();
    g.name = "roadwheel";
    g.position.set(x, 0, R);
    var K = new Baker(THREE), i, t;
    for (i = 0; i < tyres.length; i++) {
      t = tyres[i];
      K.put(T.rub, tyreGeo(THREE, R, h), 0, t[0], 0);
      if (t[1]) K.put(T.rub, hubGeo(THREE, R, h), 0, t[0], 0, t[1] < 0 ? Math.PI : 0, 0, 0);
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

    var K = new Baker(THREE);
    tractor(K, T, V.tan ? T.tan : T.skin);
    trailer(K, T);
    K.flush(root);

    var tur = new THREE.Group();
    tur.name = "turret";
    tur.position.set(XP, 0, ZD);
    root.add(tur);
    var L = new Baker(THREE);
    launcher(L, T, THREE, V);
    L.flush(tur);

    for (i = 0; i < AXT.length; i++)
      root.add(wheelGroup(THREE, T, AXT[i], RT, HT, [[YT, 1], [-YT, -1]], YT));
    for (i = 0; i < AXL.length; i++)
      root.add(wheelGroup(THREE, T, AXL[i], RL, HL, [[YLO, 1], [-YLO, -1], [YLI, 0], [-YLI, 0]], YLO));

    root.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return root;
  }

  return { build: build };
})();

/* The same M983 and M860 serve every row; what changes is the load.  M901
   carried four PAC-2 (the GEM is the same round in the same canister), the
   PAC-3 row carries four packs of four, the MSE row twelve single-round
   canisters.  len is the measured X extent, bumper to the rear guard. */
(function () {
  var VARS = {
    nato_e80_sam: { gen: "pac2" },
    nato_e90_sam: { gen: "pac2" },
    nato_e00_sam: { gen: "pac3" },
    sam_n:        { gen: "mse", tan: true }
  };
  Object.keys(VARS).forEach(function (k) {
    UNIT_MODELS[k] = { len: 15.44, build: function (THREE, M, C) { return HeroUsPatriot.build(THREE, C, VARS[k]); } };
  });
})();
