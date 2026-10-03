/* ===== us_pershing.js - HERO model: Pershing 1a and Pershing II erector-launchers ==
   Rows: nato_e60_tel  "MGM-31A Pershing 1a, M790 erector-launcher"
         nato_e80_tel  "MGM-31B Pershing II" (the M1003 erector-launcher)

   What the game's unit is: ONE articulated vehicle, a tractor towing the
   erector-launcher semitrailer with the round lying on it.  The programmer
   test station, the power station and the warhead carrier of the real
   battery are separate vehicles and are not drawn.  turret:false on both
   rows and render3d.js has no hook for a deploy pose (there is no "deployed"
   branch in it), so the round is drawn STOWED, lying on the trailer as it
   travels, and nothing here is named "turret".  The only named nodes are the
   "roadwheel" axle groups render3d.js spins.

   References (nothing was traced; proportions were scaled off them against
   the round, which is 40 in / 1.02 m across, and the tyres):
     - Wikimedia Commons, the U.S. Army technical-manual line drawings
       "M757 tractor" (the Pershing 1a tractor, public domain) and
       "Pershing II launcher roadside / curbside / covers" (the M1003, public
       domain): the M757 is a cab-over-engine 8x8 with a flat slab front,
       two big windscreen panes, a vertical grille and a deep bumper plate;
       the launcher is a long trailer with the TANDEM AT THE REAR, the erector
       structure and the four stabiliser jacks at the rear, a narrow neck
       forward, a box on the curb (right) side and, on the Pershing II, a
       pallet at the front end of the deck;
     - "Pershing 1a erector launcher", Auto- und Technikmuseum Sinsheim (CC BY-SA
       2.0), and "Ft Sill P1A" and "Ft Sill P2", the U.S. Army Artillery
       Museum, Fort Sill (CC BY-SA 3.0): the round lies in cradle rings on
       two long boom beams, tail low at the hinge and nose RAISED by a few
       degrees; two axles of single tyres at the tail; a long ram running from
       the tail frame up to the booms; two jacks at mid-length and one at each
       rear corner; the Pershing II round has small fins at the tail and at
       the stage joint and a white nose;
     - "Pershing II on EL", 9th Field Artillery in Germany (public domain);
     - the Wikipedia articles MGM-31 Pershing and Pershing II: the M790 EL
       was a low-boy trailer towed by a Ford M757 5-ton tractor in U.S. units;
       "the warhead was not mated during travel" on the Pershing 1a; the
       Pershing II M1003 is the rebuilt M790; its warhead and radar sections
       ride "as an assembly on a pallet that rotated to mate with the main
       missile"; U.S. units used the M983 HEMTT with a Hiab 8001 crane and a
       30 kW generator; the round is 34.8 ft (10.6 m) long and 40 in wide.
   So the Pershing 1a is drawn without its nose (the warhead section is not
   on the launcher) and the Pershing II with its re-entry assembly on the
   front pallet, as those texts say.  The museum photographs show the nose
   mated, which is the display state, not the travel state.
   Not confirmed, and estimated: the trailer's length (about 10.3 m from the
   kingpin), the tyre sizes, the tractor's axle spacing, the heights, where on
   the M983 the crane and generator sit (the texts only say it carries
   them), the lengths of the stages, the colour of the missile (the photographs
   show olive green bodies and, on the Pershing II, a white nose; no photograph
   of a fielded round was available), and what the open nose of the Pershing 1a
   looked like in transit (drawn as a plain closed end).  The covers of the
   Pershing II launcher are left off (the manual drawings show it both ways).
   The jacks are drawn retracted, as in travel.

   Paint: the Pershing 1a is plain olive drab (the 1960s-70s Army); the
   Pershing II wears the 1984 NATO three-tone, as the M983 does in
   us_patriot.js.  Team colour is C.team exactly, on the cab roof and in two
   strips along the trailer's deck, outboard of the round, where the camera
   sees them.

   Frame: the parts are laid out with +X at the tractor's bumper, x = 0 at the
   kingpin and the tail of the trailer at -10.3, then build() moves the lot
   so that the middle of the bounding box is on the origin.  Everything
   stands on z = 0.  Draw calls: every part
   that does not move is baked, one mesh per material; each axle is one
   roadwheel group (both tyres and the axle in a single mesh).  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroUsPershing = (function () {
  "use strict";

  /* ------------------------------------------------------------ layout */
  var XT = -10.30;                     /* trailer tail                          */
  var ZD = 1.50;                       /* deck top                              */
  var AXL = [-8.15, -9.40];            /* trailer tandem                        */
  var RL = 0.52, HL = 0.145, YL = 0.98;/* trailer tyres, 11.00-20 class         */
  var XP = -9.85, ZP = 2.30;           /* tail of the round, on the hinge       */
  var INC = 3.5 * Math.PI / 180;       /* nose-up rake of the round             */
  var AX757 = [4.10, 2.45, 0.80, -0.80];                    /* M757, 4 axles   */
  var R757 = 0.62, H757 = 0.19, Y757 = 1.02;
  var AX983 = [4.35, 2.83, 0.68, -0.84];                    /* M983, the Patriot's axles less 1.80 */
  var R983 = 0.65, H983 = 0.205, Y983 = 1.02;

  function axisZ(x) { return ZP + (x - XP) * Math.tan(INC); }

  /* ------------------------------------------------------------- paint */
  var _cv = {};
  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  /* One canvas per kind per page, tiled seamlessly (every blot is drawn nine
     times).  "od" is plain olive drab with weathering; "nato" is the
     three-tone green, brown and black in big soft blots. */
  function paintCanvas(kind) {
    if (_cv[kind]) return _cv[kind];
    var R = rng(kind === "od" ? 6919 : 19841), W = 512, H = 512, i;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var q = cv.getContext("2d");
    q.fillStyle = kind === "od" ? "#4c5737" : "#5b6c45"; q.fillRect(0, 0, W, H);
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
    if (kind === "od") {
      blots("#56623e", 10, 40, 100);
      blots("#434d31", 8, 30, 80);
    } else {
      blots("#706044", 12, 40, 95);
      blots("#2c3025", 9, 26, 72);
    }
    /* dust and wear, light and dark, so the flats are not a flat colour */
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
    if (tex) T.skin.map = tex; else T.skin.color.setHex(V.paint === "od" ? 0x4c5737 : 0x535a3c);
    T.skin.userData.worldUV = 8.0;
    T.steel = new THREE.MeshStandardMaterial({ color: 0x80868a, roughness: 0.50, metalness: 0.42 });
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25292b, roughness: 0.80, metalness: 0.20 });
    T.rub = new THREE.MeshStandardMaterial({ color: 0x1b1c1c, roughness: 0.95, metalness: 0.02 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x24343d, roughness: 0.14, metalness: 0.30 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                              roughness: 0.55, metalness: 0.18 });
    /* the round: a painted motor case, olive in both museum photographs */
    T.mis = new THREE.MeshStandardMaterial({ color: V.misCol, roughness: 0.62, metalness: 0.12 });
    if (V.rv) T.white = new THREE.MeshStandardMaterial({ color: 0xd8d8d0, roughness: 0.50, metalness: 0.08 });
    return T;
  }

  /* ------------------------------------------------------------- baker */
  /* Positioned geometry collected per material, one mesh per material.
     xf, when set, is the parent transform of the part being added: it is
     how the round is built in its own axes and then raked on its hinge. */
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
  /* a body of revolution along +X from the origin: [axial, radius] pairs */
  Baker.prototype.revolve = function (mat, prof, seg) {
    var THREE = this.T, pts = [], i;
    for (i = 0; i < prof.length; i++) pts.push(new THREE.Vector2(prof[i][1], prof[i][0]));
    var g = new THREE.LatheGeometry(pts, seg || 20);
    g.applyMatrix4(new THREE.Matrix4().makeRotationZ(-Math.PI / 2));   /* lathe's Y becomes +X */
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

  /* --------------------------------------------------- the M757 tractor */
  /* Ford M757, 5-ton 8x8, from the manual drawing: a cab over the engine
     with a flat slab front, two windscreen panes either side of a pillar, a
     tall vertical grille, a deep bumper plate, four equal-looking axles and
     bare frame behind the cab to the fifth wheel. */
  function tractor757(K, T, S) {
    var i, s;
    K.bb(T.dark, -1.65, 4.95, -0.46, 0.46, 0.78, 1.14);               /* frame rails */
    K.bb(T.dark, -1.78, -1.64, -0.95, 0.95, 0.80, 1.10);              /* tail cross member */
    K.cyl(T.steel, 0.52, 0.12, 14, 0, 0, 1.24, "z");                  /* fifth wheel */
    K.bb(T.dark, -0.60, 0.60, -0.40, 0.40, 1.12, 1.19);

    /* the cab: one slab-fronted box over the front two axles */
    K.bb(S, 2.75, 4.75, -1.19, 1.19, 1.30, 2.92);
    K.bb(S, 2.72, 4.78, -1.21, 1.21, 2.92, 2.98);                     /* roof edge */
    K.bb(T.dark, 4.75, 4.80, -0.52, 0.52, 1.42, 2.00);                /* grille */
    for (i = 0; i < 4; i++) K.bb(T.steel, 4.79, 4.82, -0.48, 0.48, 1.50 + i * 0.13, 1.54 + i * 0.13);
    K.bb(S, 4.75, 4.79, -0.07, 0.07, 2.04, 2.88);                     /* pillar */
    K.bb(T.steel, 4.76, 5.28, -1.24, 1.24, 0.72, 1.00);               /* bumper plate */
    K.bb(T.dark, 4.76, 5.20, -0.30, 0.30, 0.60, 0.72);                /* tow shackle block */
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.glass, 4.75, 4.78, s * 0.07, s * 1.10, 2.08, 2.84);      /* windscreen pane */
      K.bb(S, 4.75, 4.79, s * 1.10, s * 1.19, 2.04, 2.88);
      K.bb(T.glass, 4.80, 4.84, s * 0.86, s * 1.08, 1.66, 1.82);      /* head lamp */
      K.bb(T.steel, 4.79, 4.80, s * 0.84, s * 1.10, 1.64, 1.84);
      K.bb(T.glass, 3.30, 4.45, s * 1.19, s * 1.21, 2.02, 2.82);      /* door glass */
      K.bb(T.dark, 3.24, 3.28, s * 1.19, s * 1.215, 1.34, 2.88);      /* door seam */
      K.bb(T.dark, 4.48, 4.52, s * 1.19, s * 1.215, 1.34, 2.88);
      K.bb(T.steel, 4.56, 4.64, s * 1.19, s * 1.40, 2.46, 2.50);      /* mirror arm */
      K.bb(T.dark, 4.54, 4.64, s * 1.36, s * 1.42, 2.00, 2.70);       /* mirror */
      K.bb(T.steel, 3.30, 4.00, s * 1.19, s * 1.38, 0.96, 1.01);      /* cab step */
      /* mudguards over the front pair: a flat top and a low outer skirt */
      K.bb(S, 1.70, 4.72, s * 1.17, s * 1.29, 1.30, 1.38);
      K.bb(S, 1.70, 4.72, s * 1.25, s * 1.29, 0.98, 1.30);
    }
    K.bb(T.team, 3.00, 4.35, -0.85, 0.85, 2.98, 3.01);                /* roof flash */

    /* behind the cab: exhaust stack, fuel tank, battery box */
    K.cyl(T.steel, 0.075, 1.70, 8, 2.62, -1.04, 2.15, "z");
    K.bb(S, 1.30, 2.60, 0.52, 1.02, 0.84, 1.30);
    K.bb(T.dark, 1.30, 2.60, -1.02, -0.52, 0.84, 1.26);
    K.bb(T.dark, -1.60, 1.20, -0.55, 0.55, 1.14, 1.18);               /* sub-frame under the fifth wheel */
  }

  /* --------------------------------------------------- the M983 tractor */
  /* M983 HEMTT, built as in us_patriot.js (flat bonnet, a short tall cab
     over the front pair of axles, the fifth wheel over the rear pair) and
     moved so that the fifth wheel is on x = 0.  The Pershing II's tractor
     also carries a crane and a 30 kW generator; the generator is drawn as a
     louvred box behind the cab on the right and the crane as a pedestal on
     the centre line with its boom folded forward along the frame.  Where
     they really sat is not in the references. */
  function tractor983(K, T, S, THREE) {
    var i, s, XB = 7.78;
    K.xf = new THREE.Matrix4().makeTranslation(-1.80, 0, 0);
    K.bb(T.dark, -0.15, 7.56, -0.52, 0.52, 0.80, 1.16);               /* frame rails */
    K.bb(T.dark, -0.26, -0.12, -0.95, 0.95, 0.84, 1.14);              /* tail cross member */
    K.cyl(T.steel, 0.52, 0.12, 14, 1.80, 0, 1.24, "z");               /* fifth wheel */
    K.bb(T.dark, 1.20, 2.40, -0.44, 0.44, 1.14, 1.19);

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
      K.bb(T.steel, 5.86, 5.94, s * 1.17, s * 1.42, 2.28, 2.33);      /* mirror arm */
      K.bb(T.dark, 5.88, 5.94, s * 1.40, s * 1.46, 1.95, 2.55);       /* mirror */
      K.bb(T.steel, 4.80, 5.45, s * 1.17, s * 1.36, 1.00, 1.05);      /* steps */
    }
    K.bb(T.team, 4.45, 5.05, -0.90, 0.90, 2.58, 2.61);                /* roof flash */
    K.bb(T.dark, 5.15, 5.65, -0.40, 0.40, 2.58, 2.63);                /* roof hatch */

    /* behind the cab: exhaust stack, air cleaner, fuel tank */
    K.cyl(T.steel, 0.075, 1.50, 8, 4.12, -1.02, 1.95, "z");
    K.cyl(T.dark, 0.20, 1.00, 10, 4.10, 0.98, 1.72, "z");
    K.bb(S, 2.95, 4.05, 0.52, 1.00, 0.84, 1.30);

    /* the crane: pedestal, folded boom and jib, and its ram */
    K.bb(T.dark, 2.62, 3.08, -0.26, 0.26, 1.16, 1.90);
    K.bb(S, 2.58, 3.12, -0.30, 0.30, 1.84, 1.98);
    K.bb(T.steel, 2.70, 4.15, -0.09, 0.09, 1.98, 2.16);               /* boom, folded forward */
    K.bb(T.steel, 2.90, 3.95, -0.07, 0.07, 2.18, 2.32);               /* jib, folded back over it */
    K.rod(T.dark, 0.045, [2.95, 0.12, 1.98], [3.60, 0.10, 2.20], 6);
    /* the generator: a louvred box on the right, behind the cab */
    K.bb(S, 2.95, 4.20, -1.18, -0.52, 0.84, 1.74);
    K.bb(T.dark, 3.00, 4.15, -1.195, -1.18, 1.00, 1.60);
    K.cyl(T.steel, 0.05, 0.55, 6, 3.30, -0.80, 2.01, "z");
    for (s = -1; s <= 1; s += 2) {
      K.bb(S, 5.30, 7.05, s * 1.00, s * 1.27, 1.52, 1.62);            /* fenders */
      K.bb(S, 5.30, 7.05, s * 1.23, s * 1.27, 1.04, 1.52);
      K.bb(S, 0.20, 3.10, s * 0.96, s * 1.26, 1.36, 1.44);
    }
    K.xf = null;
  }

  /* --------------------------------------------------------- the trailer */
  /* M790 / M1003.  A narrow neck from the kingpin, a deck that widens over
     the length of the round, the tandem at the very tail under the erector
     hinge, a box on the curb (right) side, four jacks drawn retracted.
     V.gieu: the Pershing II's electronics box is the bigger one. */
  function trailer(K, T, V) {
    var i, s, x;
    K.bb(T.dark, -0.55, 0.55, -0.50, 0.50, 1.26, 1.32);               /* kingpin plate */
    K.bb(T.skin, -3.30, 0.55, -0.46, 0.46, 1.32, ZD);                 /* neck */
    K.bb(T.skin, -4.60, -3.30, -0.95, 0.95, 1.46, ZD);                /* the widening step */
    K.bb(T.skin, XT, -4.60, -1.12, 1.12, 1.46, ZD);                   /* main deck */
    K.bb(T.skin, -9.10, -3.40, -0.32, 0.32, 1.06, 1.46);              /* the main beam, a deep box under the deck */
    K.bb(T.skin, -3.50, -2.60, -0.40, 0.40, 1.20, 1.40);              /* where it rises to the neck */
    x = [-9.9, -7.0, -4.4];
    for (i = 0; i < x.length; i++) K.bb(T.dark, x[i] - 0.07, x[i] + 0.07, -1.10, 1.10, 1.36, 1.46);
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.team, -9.00, -4.70, s * 0.62, s * 1.02, ZD, ZD + 0.025);  /* deck flashes, outboard of the round */
      K.bb(T.steel, -9.00, -1.20, s * 1.10, s * 1.12, ZD, ZD + 0.05); /* deck edge lip, left plain */
    }

    /* tail housing: a low cross beam under the round, two cheeks beside it,
       the hinge pin through them, the tail guard and the lamps */
    K.bb(T.skin, XT, -9.15, -1.17, 1.17, 1.16, 1.62);
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.skin, XT, -9.15, s * 0.64, s * 1.17, 1.62, 2.04);
      K.bb(T.dark, XT - 0.04, XT, s * 0.20, s * 1.12, 1.24, 1.60);
      K.bb(T.glass, XT - 0.06, XT - 0.04, s * 0.90, s * 1.08, 1.30, 1.40);
    }
    K.cyl(T.steel, 0.12, 2.00, 10, -9.62, 0, 1.96);                   /* hinge pin, along Y */

    /* the tandem: bogie box, mudguards */
    K.bb(T.dark, -9.60, -7.95, -0.55, 0.55, 0.62, 1.46);
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.skin, -10.02, -7.52, s * 0.80, s * 1.17, 1.07, 1.12);
      K.bb(T.skin, -10.02, -7.52, s * 1.13, s * 1.17, 0.78, 1.10);
    }

    /* the electronics box on the right side ahead of the tandem */
    if (V.gieu) {
      K.bb(T.skin, -7.75, -6.15, -1.30, -0.86, 0.80, 1.62);
      K.bb(T.dark, -7.60, -6.30, -1.315, -1.30, 0.95, 1.45);
      K.bb(T.steel, -7.00, -6.90, -1.33, -1.315, 1.10, 1.30);
    } else {
      K.bb(T.skin, -7.60, -6.60, -1.22, -0.86, 0.95, 1.50);
      K.bb(T.dark, -7.50, -6.70, -1.235, -1.22, 1.05, 1.40);
    }

    /* jacks, retracted: a bracket on the frame, a leg, a pad.  Two at the
       tail corners and two at mid-length. */
    var jx = [-10.00, -5.60];
    for (i = 0; i < jx.length; i++) for (s = -1; s <= 1; s += 2) {
      K.bb(T.dark, jx[i] - 0.22, jx[i] + 0.22, s * 1.06, s * 1.24, 1.30, 1.58);
      K.cyl(T.dark, 0.075, 0.90, 8, jx[i], s * 1.16, 1.10, "z");
      K.cyl(T.steel, 0.19, 0.07, 10, jx[i], s * 1.16, 0.62, "z");
      K.rod(T.dark, 0.04, [jx[i] - 0.20, s * 0.55, 1.34], [jx[i], s * 1.16, 0.84], 6);   /* A-frame struts */
      K.rod(T.dark, 0.04, [jx[i] + 0.20, s * 0.55, 1.34], [jx[i], s * 1.16, 0.84], 6);
    }
    K.bb(T.dark, -5.75, -5.45, -1.10, 1.10, 1.34, 1.46);              /* mid jacks' cross beam */
  }

  /* ------------------------------------------------------ the round, on it */
  /* Built in its own axes (x along the round from the tail, z up from its
     axis) and raked nose-up on the hinge, as both museum photographs show:
     the round lies in cradle rings on two long booms, tail low and nose a few
     degrees high.  V.stages: [axial, radius] profile of the body in transit. */
  function roundOnTrailer(K, T, THREE, V) {
    var i, s, L = V.bodyLen;
    var MF = new THREE.Matrix4().compose(new THREE.Vector3(XP, 0, ZP),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -INC, 0)), new THREE.Vector3(1, 1, 1));
    K.xf = MF;
    K.revolve(T.mis, V.prof, 22);
    if (V.nose === "plain") K.cyl(T.dark, 0.43, 0.05, 16, L, 0, 0, "x");  /* the open end, drawn closed */
    /* cradle rings and the booms under them */
    var rg = V.rings;
    for (i = 0; i < rg.length; i++) {
      K.cyl(T.steel, 0.575, 0.22, 20, rg[i], 0, 0, "x");
      K.bb(T.skin, rg[i] - 0.34, rg[i] + 0.34, -0.40, 0.40, -0.62, -0.38);   /* saddle */
    }
    for (s = -1; s <= 1; s += 2) K.bb(T.dark, 0.45, V.boomEnd, s * 0.20, s * 0.40, -0.74, -0.60);  /* the booms */
    var cx = [0.9, 2.9, 5.0, 6.9];
    for (i = 0; i < cx.length; i++) if (cx[i] < V.boomEnd) K.bb(T.dark, cx[i] - 0.05, cx[i] + 0.05, -0.42, 0.42, -0.74, -0.60);
    if (V.fins) {
      /* small fins at the tail and at the stage joint, the way the Fort Sill
         photograph shows them: top and both sides (the lower one is hidden
         by the cradle) */
      var fx = [[0.05, 0.80, 0.32], [V.joint + 0.04, V.joint + 0.59, 0.24]], fi;
      for (fi = 0; fi < fx.length; fi++) {
        K.bb(T.mis, fx[fi][0], fx[fi][1], -0.012, 0.012, 0.47, 0.47 + fx[fi][2]);
        for (s = -1; s <= 1; s += 2) K.bb(T.mis, fx[fi][0], fx[fi][1], s * 0.47, s * (0.47 + fx[fi][2]), -0.012, 0.012);
      }
    }
    K.xf = null;

    /* posts from the deck to the booms, in world axes */
    var ps = V.posts;
    for (i = 0; i < ps.length; i++) {
      var xw = XP + ps[i] * Math.cos(INC), zb = axisZ(xw) - 0.70;
      K.bb(T.dark, xw - 0.16, xw + 0.16, -0.40, 0.40, ZD, zb);
    }
    /* the erector rams: tail cheek up to the boom, as a long thin pair */
    for (s = -1; s <= 1; s += 2) {
      var A = [XP + 0.25, s * 0.80, 1.86];
      var bx = XP + 3.4 * Math.cos(INC);
      var B = [bx, s * 0.40, axisZ(bx) - 0.62];
      var M = [A[0] + 0.50 * (B[0] - A[0]), A[1] + 0.50 * (B[1] - A[1]), A[2] + 0.50 * (B[2] - A[2])];
      K.rod(T.dark, 0.09, A, M, 8);
      K.rod(T.steel, 0.05, M, B, 8);
    }

    /* the Pershing II's re-entry assembly on its pallet at the front of the
       deck: a flat frame, two cradles, the radar section and warhead, white */
    if (V.rv) {
      var zr = 2.26, rx = [-1.20, 0.10];
      K.bb(T.dark, -2.00, 0.70, -0.50, 0.50, ZD, ZD + 0.20);
      for (i = 0; i < rx.length; i++) {
        K.bb(T.skin, rx[i] - 0.14, rx[i] + 0.14, -0.42, 0.42, ZD + 0.20, zr - 0.30);
        K.cyl(T.steel, 0.40, 0.08, 14, rx[i], 0, zr, "x");
      }
      K.xf = new THREE.Matrix4().makeTranslation(-1.80, 0, zr);
      K.revolve(T.white, [[0, 0], [0, 0.37], [0.95, 0.37], [1.80, 0.25], [2.48, 0.11], [2.60, 0.0]], 18);
      K.xf = null;
    }
  }

  /* ------------------------------------------------------------- wheels */
  /* One group per axle, named "roadwheel": the axle is the group's local
     Y, which is what render3d.js turns.  Both tyres are baked into one mesh. */
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
  function wheelGroup(THREE, T, x, R, h, y) {
    var g = new THREE.Group();
    g.name = "roadwheel";
    g.position.set(x, 0, R);
    var K = new Baker(THREE);
    K.put(T.rub, tyreGeo(THREE, R, h), 0, y, 0);
    K.put(T.rub, hubGeo(THREE, R, h), 0, y, 0);
    K.put(T.rub, tyreGeo(THREE, R, h), 0, -y, 0);
    K.put(T.rub, hubGeo(THREE, R, h), 0, -y, 0, Math.PI, 0, 0);
    K.put(T.rub, new THREE.CylinderGeometry(0.09, 0.09, y * 2, 8), 0, 0, 0);
    K.flush(g);
    return g;
  }

  /* ========================================================== ASSEMBLY  */
  function build(THREE, C, V) {
    var T = makeMats(THREE, C, V), i;
    var root = new THREE.Group();
    root.name = V.name;

    var K = new Baker(THREE);
    if (V.tractor === "m757") tractor757(K, T, T.skin); else tractor983(K, T, T.skin, THREE);
    trailer(K, T, V);
    roundOnTrailer(K, T, THREE, V);
    K.flush(root);

    var ax = V.tractor === "m757" ? AX757 : AX983;
    var R = V.tractor === "m757" ? R757 : R983, H = V.tractor === "m757" ? H757 : H983;
    var Y = V.tractor === "m757" ? Y757 : Y983;
    for (i = 0; i < ax.length; i++) root.add(wheelGroup(THREE, T, ax[i], R, H, Y));
    for (i = 0; i < AXL.length; i++) root.add(wheelGroup(THREE, T, AXL[i], RL, HL, YL));

    /* The unit turns about, and is drawn at, the model's origin: seat the
       middle of the whole combination there (as the other long heroes do),
       not the kingpin the parts were laid out around. */
    var bb = new THREE.Box3().setFromObject(root), cx = (bb.min.x + bb.max.x) / 2, ch;
    for (i = 0; i < root.children.length; i++) {
      ch = root.children[i];
      if (ch.isMesh) { ch.geometry.translate(-cx, 0, 0); ch.geometry.computeBoundingSphere(); }   /* baked parts: move the vertices */
      else ch.position.x -= cx;                                                                   /* the axle groups: move the node */
    }

    root.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return root;
  }

  return { build: build };
})();

/* The two launchers share one trailer (the M1003 is a rebuilt M790) and
   differ in the tractor, the round, the electronics box and the paint.
   len is the measured X extent, bumper to tail guard. */
(function () {
  var VARS = {
    /* Pershing 1a: the body only, 7.2 m (the warhead is not on the launcher),
       olive drab, M757 */
    nato_e60_tel: {
      name: "pershing_1a_m790", tractor: "m757", paint: "od", misCol: 0x4a5336, len: 15.64,
      bodyLen: 7.2, boomEnd: 6.4, nose: "plain", posts: [1.4, 3.8, 6.0], rings: [1.7, 4.4], joint: 4.10,
      prof: [[0, 0], [0, 0.44], [0.14, 0.51], [3.95, 0.51], [3.95, 0.53], [4.10, 0.53], [4.10, 0.51],
             [6.35, 0.51], [6.40, 0.48], [7.15, 0.47], [7.20, 0.44], [7.20, 0]]
    },
    /* Pershing II: stages 1 and 2 and the guidance section, 8.0 m, and the
       white re-entry assembly (2.6 m) on the front pallet, 10.6 m between
       them as published; NATO three-tone, M983 */
    nato_e80_tel: {
      name: "pershing_ii_m1003", tractor: "m983", paint: "nato", misCol: 0x56603e, len: 16.34,
      bodyLen: 8.0, boomEnd: 7.2, nose: "closed", posts: [1.4, 4.0, 6.6], rings: [1.7, 4.8], joint: 4.36,
      fins: true, rv: true, gieu: true,
      prof: [[0, 0], [0, 0.44], [0.14, 0.51], [4.20, 0.51], [4.20, 0.535], [4.36, 0.535], [4.36, 0.51],
             [6.70, 0.49], [6.76, 0.47], [7.95, 0.40], [8.00, 0.38], [8.00, 0]]
    }
  };
  Object.keys(VARS).forEach(function (k) {
    UNIT_MODELS[k] = { len: VARS[k].len, build: function (THREE, M, C) { return HeroUsPershing.build(THREE, C, VARS[k]); } };
  });
})();
