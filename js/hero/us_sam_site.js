/* ===== us_sam_site.js - HERO model: the United States Army's fixed SAM site ===
   BUILDINGS id "sam", side "nato" (= the United States).  One build, one
   option per system; it registers a key only for the periods in which the
   Army really had FIXED surface-to-air sites:

     sam_nato_e50   Nike Ajax launching area.  First site (Fort Meade) was
                    declared operational in 1954; Nike Hercules took over the
                    sites from 1958, but in the 1950s the Ajax is the site.
     sam_nato_e60   Nike Hercules (MIM-14) launching area.  CONUS sites were
                    manned to 1974 (Alaska to 1979), Europe to the 1980s.

   sam_nato_e80   Patriot battery position, M901 with four PAC-2 (IOC 1984).
   sam_nato_e90   the same with PAC-2 (GEM uses the same canister).
   sam_nato_e00   Patriot, M902 with PAC-3 packs of four (sixteen rounds).
   sam_nato_e20   Patriot, PAC-3 MSE twelve-canister frame, tan paint.
   Patriot is mobile: its site is the battery POSITION - launchers uncoupled
   from their tractors on stabiliser legs, radar set, control station and
   power plant near by (see "the Patriot battery" below).  The Nike keys are
   fixed launching areas.  The Improved HAWK (M727) is not drawn; no
   reference was fetched for it.  US Aegis Ashore is a Navy system.

   What the plot shows (a LAUNCHING AREA, compressed).  A real Nike battery
   was two areas a mile or more apart: the integrated fire-control (IFC) area
   with its acquisition, tracking and missile-tracking radars, and the
   launching area with the missiles.  Only the launching area is drawn; the
   IFC radars are not, and neither are the barracks, the access road loop,
   the warhead assembly building or the sentry-dog kennels.  The launchers
   in a real section stand in rows of four; here three launchers stand
   parallel, 8 m apart, each with the missile on its rail pointing +X
   (the Marin Headlands photograph shows missiles lying on parallel rails
   "aimed" the same way) and the elevator pit it was rolled up from behind
   it (two steel leaves with a yellow-and-black hazard seam, a curb and a
   pipe handrail).  The centre launcher is the "turret" group: the rail on
   its pedestal and the missile ride on it; the other two are baked.  A
   launching control trailer, two fuel drums and two floodlights stand at the
   side.  Equipment is at true size (a Hercules is 12.5 m, an Ajax 10.6 m);
   only the spacing is compressed, so rails 8 m apart with a 12.5 m
   missile fill about 27 x 27 m.

   References (fetched, cached in the scratchpad us_sam_ref folder):
     - "Nike-Ajax Missile Launch Site" (Commons): a former Ajax pad, the
       fenced concrete apron; "Nike Ajax base aerial view" (Commons): the
       launching area is two oval aprons, each a magazine with the rails on
       it, inside a road loop and a fence - the layout above.
     - "Nike-Marin-Headlands-aimed-at-USSR" (Commons, SF-88): two missiles on
       parallel rails lying horizontally, white bodies, a black booster, big
       fins, the elevator doors yellow-and-black striped in the pad between,
       pipe handrails round the pit, an olive lattice rail frame.
     - "SF-88 Nike Hercules Missile Site (06) - Missile on launcher" (Commons):
       the Hercules on its erecting frame: olive-green steel frame, a white
       missile with a long ogive, large delta wings, and big tail fins on
       the booster cluster; an olive control box on the pad beside it.
     - "Nike-missile-family" (Commons, US Army photograph): Ajax, Hercules,
       Zeus side by side - length, wing size and fins relative to each
       other.  The Hercules wing span and the Ajax length are scaled off it
       against the men standing by the launchers.
   Published sizes used: Nike Hercules 12.5 m long, 2.3 m wing span (MIM-14
   article); Nike Ajax 10.6 m long.  ESTIMATED, not published in what I
   read: body diameters (Ajax 0.31 m sustainer with a 0.41 m booster;
   Hercules 0.80 m sustainer over a cluster of four 0.40 m boosters), the
   wing and fin planforms, the rail beam sizes and heights, the pit size
   (5.4 x 3.4 m), and the trailer (6.0 x 2.45 x 2.9 m).  Painted markings
   (the real rounds carry stencilled letters and bands) are left off.

   Paint: US Army olive drab (launcher, trailer, drums), missile white with a
   dark nose cap and dark Ajax booster, as photographed.  Team colour
   C.team exactly, as three small flat panels lifted 2 cm: the trailer's
   roof and door, the centre control box's lid.  Patriot keys: the unit
   hero's own team strips are stripped; three panels (radar shelter roof,
   the middle launcher's deck, the control-station roof).  The Hercules wing
   and tail-fin spans are both 2.3 m (the published wing span).  Pit doors:
   yellow leaves with black hazard bars (Marin Headlands photograph).
   Draw calls: one mesh per material for the baked parts, one per material
   for the launcher group.  ASCII only.  */

var HeroUsSamSite = (function () {
  "use strict";

  var PZ = 0.25;          /* pad thickness; everything stands on it       */
  var LY = [-8, 0, 8];/* launcher lanes; the middle one is the turret */

  function Baker(THREE) { this.T = THREE; this.by = []; }
  Baker.prototype.add = function (mat, geo) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    if (!g.attributes.uv) {
      var n = g.attributes.position.count;
      g.setAttribute("uv", new this.T.BufferAttribute(new Float32Array(n * 2), 2));
    }
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
  Baker.prototype.bb = function (mat, x0, x1, y0, y1, z0, z1) {
    this.put(mat, new this.T.BoxGeometry(x1 - x0, y1 - y0, z1 - z0), (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  };
  /* cylinder along X from x0 to x1 */
  Baker.prototype.cylX = function (mat, r, x0, x1, y, z, seg) {
    this.put(mat, new this.T.CylinderGeometry(r, r, x1 - x0, seg || 14), (x0 + x1) / 2, y, z, 0, 0, -Math.PI / 2);
  };
  Baker.prototype.cylZ = function (mat, r, z0, z1, x, y, seg) {
    this.put(mat, new this.T.CylinderGeometry(r, r, z1 - z0, seg || 12), x, y, (z0 + z1) / 2, Math.PI / 2, 0, 0);
  };
  Baker.prototype.rod = function (mat, r, a, b, seg) {
    var THREE = this.T;
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(); d.normalize();
    var g = new THREE.CylinderGeometry(r, r, len, seg || 6);
    g.applyMatrix4(new THREE.Matrix4().compose(
      new THREE.Vector3((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2),
      new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d),
      new THREE.Vector3(1, 1, 1)));
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

  function makeMats(THREE, C) {
    function mk(c, r, m) { return new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m }); }
    return {
      conc: mk(0x6b6d66, 0.92, 0.04),
      concD: mk(0x4d4f4a, 0.92, 0.04),
      olive: mk(0x4a5236, 0.82, 0.14),
      white: mk(0xdcdcd4, 0.55, 0.10),
      dark: mk(0x23262a, 0.80, 0.20),
      steel: mk(0x7c8288, 0.50, 0.45),
      yellow: mk(0xc9a92a, 0.75, 0.05),
      team: new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                             roughness: 0.55, metalness: 0.18 })
    };
  }

  /* ---------------------------------------------------------- the missiles */
  /* Specs in missile axes: X from the tail (0) to the nose (len), the
     missile lying on its side, "up" = +Z.  fin(): a trapezoid plate in
     (x, radial) with root chord on the body. */
  var MISSILE = {
    ajax: { len: 10.6, R: 0.155, boosterR: 0.205, boosterLen: 4.2, ogive: 2.2,
            wings: { le: 6.6, root: 2.0, tipLe: 5.9, tipTe: 5.1, span: 0.60 },
            canard: { le: 9.5, root: 0.5, tipLe: 9.25, tipTe: 9.05, span: 0.38 },
            tail: { le: 1.1, root: 1.1, tipLe: 0.65, tipTe: 0.05, span: 0.62, R: 0.205 },
            cluster: false },
    hercules: { len: 12.5, R: 0.40, boosterR: 0.20, boosterLen: 4.1, ogive: 2.6,
                wings: { le: 7.9, root: 3.0, tipLe: 6.7, tipTe: 5.7, span: 0.83 },
                canard: null,
                tail: { le: 2.6, root: 2.4, tipLe: 1.2, tipTe: 0.1, span: 0.83, R: 0.40 },
                cluster: true }
  };

  function finGeo(THREE, f, R0, depth) {
    var s = new THREE.Shape();
    s.moveTo(f.le, R0);
    s.lineTo(f.le - f.root, R0);
    s.lineTo(f.tipTe, R0 + f.span);
    s.lineTo(f.tipLe, R0 + f.span);
    s.lineTo(f.le, R0);
    var g = new THREE.ExtrudeGeometry(s, { depth: depth, bevelEnabled: false });
    g.translate(0, 0, -depth / 2);
    return g;
  }
  function ogiveGeo(THREE, R, len, seg) {
    var pts = [], n = 7, i, t;
    for (i = 0; i <= n; i++) { t = i / n; pts.push(new THREE.Vector2(Math.max(0.001, R * Math.pow(Math.cos(t * Math.PI / 2), 0.85)), t * len)); }
    return new THREE.LatheGeometry(pts, seg);   /* axis +Y, tip at +Y */
  }

  /* the round, lying along +X with its tail at x0, axis at height z */
  function missile(K, T, spec, x0, y, z) {
    var THREE = K.T, i, k, a, g;
    var S = spec, noseX = x0 + S.len - S.ogive, bodyCol = T.white;
    /* sustainer body */
    K.cylX(bodyCol, S.R, x0 + S.boosterLen, noseX + 0.01, y, z, 20);
    /* nose: lathe along +Y turned to +X */
    g = ogiveGeo(THREE, S.R, S.ogive, 20);
    K.put(bodyCol, g, noseX, y, z, 0, 0, -Math.PI / 2);
    K.cylX(T.dark, S.R * 0.16, x0 + S.len - 0.02, x0 + S.len + 0.18, y, z, 8);   /* probe */
    /* booster(s) */
    var bm = (S === MISSILE.ajax) ? T.dark : bodyCol;
    if (S.cluster) {
      for (i = 0; i < 4; i++) {
        var by = (i & 1 ? -1 : 1) * S.boosterR, bz = (i & 2 ? -1 : 1) * S.boosterR;
        K.cylX(bm, S.boosterR, x0, x0 + S.boosterLen, y + by, z + bz, 14);
        K.cylX(T.dark, S.boosterR * 0.7, x0 - 0.12, x0 + 0.02, y + by, z + bz, 10);   /* nozzle */
      }
    } else {
      K.cylX(bm, S.boosterR, x0, x0 + S.boosterLen, y, z, 16);
      K.cylX(T.dark, S.boosterR * 0.75, x0 - 0.15, x0 + 0.02, y, z, 10);
    }
    K.cylX(T.dark, S.R + 0.01, x0 + S.boosterLen, x0 + S.boosterLen + 0.05, y, z, 20);   /* separation ring */
    /* four fins each: wings, canards, tail fins - a plus layout */
    var sets = [[S.wings, S.R], [S.canard, S.R], [S.tail, S.tail.R]];
    for (k = 0; k < sets.length; k++) {
      var f = sets[k][0]; if (!f) continue;
      for (a = 0; a < 4; a++) {
        g = finGeo(THREE, { le: f.le, root: f.root, tipLe: f.tipLe, tipTe: f.tipTe, span: f.span }, sets[k][1] * 0.8, S === MISSILE.ajax ? 0.04 : 0.06);
        g.applyMatrix4(new THREE.Matrix4().makeRotationX(a * Math.PI / 2));
        K.put(bodyCol, g, x0, y, z, 0, 0, 0);
      }
    }
  }

  /* ------------------------------------------------------------- launcher */
  /* The rail frame under the round, centred on x = 0 of its own group
     (z = 0 is the pad top).  Returns the missile axis height. */
  function launcher(K, T, kind, y) {
    var S = MISSILE[kind], L = S.len, x0 = -L / 2, i, s;
    var bt, bb0, axis;
    if (kind === "ajax") { bb0 = 0.95; bt = 1.30; axis = bt + S.boosterR + 0.02; }
    else { bb0 = 1.20; bt = 1.60; axis = bt + 0.42; }
    var xa = x0 + 0.3, xb = (kind === "ajax") ? L / 2 - 1.6 : L / 2 - 2.0;
    var bw = (kind === "ajax") ? 0.16 : 0.28;
    /* two rail beams with cross ties */
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.olive, xa, xb, y + s * 0.34 - bw / 2, y + s * 0.34 + bw / 2, bb0, bt);
      K.bb(T.steel, xa, xb, y + s * 0.34 - bw / 2 - 0.02, y + s * 0.34 + bw / 2 + 0.02, bt, bt + 0.04);   /* the rail face */
    }
    var nx = 6;
    for (i = 0; i <= nx; i++) {
      var tx = xa + (xb - xa) * i / nx;
      K.bb(T.olive, tx - 0.07, tx + 0.07, y - 0.34, y + 0.34, bb0 + 0.05, bb0 + 0.2);
    }
    /* diagonal bracing, lattice look */
    for (i = 0; i < nx; i++) {
      var ax = xa + (xb - xa) * i / nx, bx2 = xa + (xb - xa) * (i + 1) / nx;
      K.rod(T.olive, 0.03, [ax, y - 0.34, bb0 + 0.12], [bx2, y + 0.34, bb0 + 0.12], 5);
    }
    /* supports: tail pedestal, centre post (the pivot), front A-frame */
    var ped = (kind === "ajax") ? [1.2, 1.0, bb0] : [1.7, 1.5, bb0];
    K.bb(T.olive, xa - 0.1, xa - 0.1 + ped[0], y - ped[1] / 2, y + ped[1] / 2, 0, ped[2]);
    K.bb(T.concD, xa - 0.3, xa - 0.3 + ped[0] + 0.4, y - ped[1] / 2 - 0.2, y + ped[1] / 2 + 0.2, 0, 0.1);
    K.bb(T.olive, -0.35, 0.35, y - 0.5, y + 0.5, 0, bb0);
    K.cylZ(T.steel, 0.55, 0, 0.12, 0, y, 16);                               /* turntable ring */
    var fx = xb - 0.6;
    for (s = -1; s <= 1; s += 2) {
      K.rod(T.olive, 0.06, [fx, y + s * 0.34, bb0], [fx - 0.5, y + s * 0.8, 0.05], 6);
      K.rod(T.olive, 0.06, [fx, y + s * 0.34, bb0], [fx + 0.5, y + s * 0.8, 0.05], 6);
    }
    K.bb(T.concD, fx - 0.7, fx + 0.7, y - 1.0, y + 1.0, 0, 0.1);
    if (kind === "hercules") {
      /* the tail frame stands taller: a box girder above the pedestal
         that the round's boosters sit against, as in the SF-88 photograph */
      K.bb(T.olive, xa + 0.2, xa + 0.7, y - 0.55, y + 0.55, bb0, bt + 0.9);
      K.bb(T.steel, xa + 0.7, xa + 0.78, y - 0.45, y + 0.45, bt + 0.1, bt + 0.8);
    }
    /* the olive control box on the pad beside the pedestal, with its lid
       (team panel) and a dark panel face, as in the SF-88 photograph */
    return { axis: axis, x0: x0 };
  }

  function controlBox(K, T, x, y, lid) {
    K.bb(T.olive, x - 0.55, x + 0.55, y - 0.4, y + 0.4, 0, 0.8);
    K.bb(T.dark, x + 0.55, x + 0.58, y - 0.3, y + 0.3, 0.2, 0.6);
    if (lid) K.bb(T.team, x - 0.4, x + 0.4, y - 0.3, y + 0.3, 0.8, 0.82);   /* team panel 1: the centre box's lid */
  }

  /* ----------------------------------------------------------- the pit */
  function pit(K, T, x, y) {
    var PW = 5.4, PD = 3.4, i, s;
    K.bb(T.concD, x - PW / 2 - 0.25, x + PW / 2 + 0.25, y - PD / 2 - 0.25, y + PD / 2 + 0.25, PZ, PZ + 0.12);   /* curb */
    for (s = -1; s <= 1; s += 2) {
      /* the two door leaves: yellow with black hazard bars, as in the Marin Headlands photograph */
      K.bb(T.yellow, x - PW / 2, x + PW / 2, y + (s > 0 ? 0.08 : -PD / 2), y + (s > 0 ? PD / 2 : -0.08), PZ + 0.12, PZ + 0.17);
      for (i = 0; i < 9; i++)
        K.bb(T.dark, x - PW / 2 + (i + 0.25) * PW / 9, x - PW / 2 + (i + 0.75) * PW / 9,
             y + (s > 0 ? 0.08 : -PD / 2), y + (s > 0 ? PD / 2 : -0.08), PZ + 0.17, PZ + 0.18);
    }
    K.bb(T.dark, x - PW / 2, x + PW / 2, y - 0.08, y + 0.08, PZ + 0.12, PZ + 0.18);   /* the seam between the leaves */
    /* handrail on the three sides away from the rail */
    var pts = [[x - PW / 2 - 0.45, y - PD / 2 - 0.45], [x - PW / 2 - 0.45, y + PD / 2 + 0.45],
               [x + PW / 2 + 0.45, y + PD / 2 + 0.45]];
    var pts2 = [[x - PW / 2 - 0.45, y - PD / 2 - 0.45], [x + PW / 2 + 0.45, y - PD / 2 - 0.45]];
    function run(p, q) {
      var d = Math.hypot(q[0] - p[0], q[1] - p[1]), n = Math.max(1, Math.round(d / 1.7)), j;
      for (j = 0; j <= n; j++) {
        var px = p[0] + (q[0] - p[0]) * j / n, py = p[1] + (q[1] - p[1]) * j / n;
        K.cylZ(T.steel, 0.035, PZ, PZ + 1.05, px, py, 6);
      }
      K.rod(T.steel, 0.028, [p[0], p[1], PZ + 1.0], [q[0], q[1], PZ + 1.0], 6);
      K.rod(T.steel, 0.025, [p[0], p[1], PZ + 0.55], [q[0], q[1], PZ + 0.55], 6);
    }
    run(pts[0], pts[1]); run(pts[1], pts[2]);
    run(pts2[0], pts2[1]);
  }

  /* ----------------------------------------------- trailer, drums, lamps */
  function trailerVan(K, T, x, y) {
    /* launching control trailer: a box van on a two-wheel-axle trailer */
    var i, s;
    K.bb(T.olive, x - 3.0, x + 3.0, y - 1.22, y + 1.22, 0.55, 2.85);
    K.bb(T.dark, x - 3.0, x + 3.0, y - 1.0, y + 1.0, 0.3, 0.55);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 2; i++)
      K.put(T.dark, new K.T.CylinderGeometry(0.40, 0.40, 0.3, 14), x - 1.3 + i * 1.0, y + s * 1.12, 0.40, 0, 0, 0);
    K.bb(T.steel, x + 3.0, x + 3.5, y - 0.05, y + 0.05, 0.6, 0.7);              /* drawbar stub */
    K.bb(T.steel, x - 3.0, x - 2.6, y - 1.0, y - 0.8, 0, 0.55);                  /* jacks */
    K.bb(T.steel, x - 3.0, x - 2.6, y + 0.8, y + 1.0, 0, 0.55);
    K.bb(T.dark, x - 0.5, x + 0.5, y - 1.24, y - 1.22, 0.9, 2.5);                /* door */
    K.bb(T.team, x + 0.6, x + 1.4, y - 1.245, y - 1.225, 1.7, 2.3);              /* team panel 2: door */
    K.bb(T.team, x - 1.2, x + 1.2, y - 0.6, y + 0.6, 2.85, 2.87);                /* team panel 3: roof */
    K.bb(T.steel, x - 1.9, x - 1.3, y + 0.4, y + 0.8, 2.85, 3.3);                /* vent hood */
    K.rod(T.dark, 0.03, [x + 2.9, y + 1.0, 2.85], [x + 2.9, y + 1.0, 3.9], 5);     /* whip antenna */
  }
  function drum(K, T, x, y) {
    K.put(T.olive, new K.T.CylinderGeometry(0.29, 0.29, 0.88, 12), x, y, 0.44, Math.PI / 2, 0, 0);
    K.put(T.steel, new K.T.CylinderGeometry(0.30, 0.30, 0.04, 12), x, y, 0.5 * 1.76, Math.PI / 2, 0, 0);
  }
  function lamp(K, T, x, y) {
    K.cylZ(T.steel, 0.12, 0, 3.4, x, y, 8);
    K.bb(T.white, x - 0.45, x + 0.45, y - 0.2, y + 0.2, 3.35, 3.85);
  }

  /* ========================================================== ASSEMBLY  */
  function build(THREE, C, kind) {
    var T = makeMats(THREE, C), i, j;
    var root = new THREE.Group();
    root.name = "us_sam_site_" + kind;
    var S = MISSILE[kind];
    var K = new Baker(THREE);
    var X0 = -S.len / 2;

    K.bb(T.conc, -13.5, 13.5, -13.5, 13.5, 0, PZ);                 /* the apron */

    /* three lanes: the pit behind (-X), the rail with its round */
    var px = -13.5 + 0.25 + 2.95 + 0.5;
    for (j = 0; j < 3; j++) {
      pit(K, T, px - 0.3 + 0.0, LY[j]);
      if (j !== 1) {
        var Lk = new Baker(THREE);
        /* baked launcher: build in the group frame, then shifted onto the pad */
        var info = launcher(Lk, T, kind, LY[j]);
        missile(Lk, T, S, info.x0, LY[j], info.axis);
        /* lift everything onto the pad top */
        for (i = 0; i < Lk.by.length; i++) Lk.by[i].g.forEach(function (g) { g.translate(0, 0, PZ); K.add(Lk.by[i].mat, g); });
      }
      controlBox(K, T, px - 0.3, LY[j] + 3.0, j === 1);
    }
    trailerVan(K, T, 10.0, -10.4);
    drum(K, T, 11.4, 5.0); drum(K, T, 12.1, 5.5);
    lamp(K, T, 12.2, 11.8); lamp(K, T, 12.2, -12.4);
    K.flush(root);

    /* the turret: the centre launcher and its round, trained about its own Z */
    var tur = new THREE.Group(); tur.name = "turret";
    tur.position.set(0, 0, PZ);
    var Tk = new Baker(THREE);
    var inf = launcher(Tk, T, kind, 0);
    missile(Tk, T, S, inf.x0, 0, inf.axis);
    Tk.flush(tur);
    root.add(tur);

    root.userData.whole = true;
    return root;
  }


  /* ================================================ the Patriot battery  */
  /* A Patriot battery is a MOBILE system emplaced on a prepared position.
     Photographs of emplaced batteries ("Patriot missile battery Romania 2",
     Commons; "PATRIOT battery in Poland, 2010", Commons) show: the launching
     stations UNCOUPLED from their tractors, the M860 semitrailer standing
     on its stabiliser legs and a landing stand under the gooseneck, spaced
     apart on open ground with coils of concertina wire round them, the
     radar set, the control shelter and the power plant parked near.  That
     is what is drawn.  Not confirmed by any photograph I could fetch (so NOT
     drawn): earth berms and revetments round the launchers (reported for
     Germany 1985-87 and Saudi Arabia / Israel 1991), the antenna mast
     group, the tents, the cable runs.
     The launcher is the unit hero's own (js/hero/us_patriot.js, UNIT_MODELS
     of the same period, built at run time): the trailer, LEM and canister
     frame come from it unchanged, the tractor is cut off, and the wheels
     are re-drawn as plain tyre cylinders to keep the triangle count down.
     Launcher fit per period is the unit hero's: e80 and e90 four PAC-2
     canisters (M901; the GEM uses the same canister, so e80 and e90 look
     the same), e00 PAC-3 packs of four (M902, sixteen rounds), e20 the PAC-3
     MSE twelve-canister frame in the tan paint of the photographs.
     Radar set (AN/MPQ-53; the -65 of the PAC-3 years is drawn the same, I
     found no photograph to tell them apart), engagement control station
     and power plant: simple shapes from the Poland and Gulf photographs;
     their sizes are ESTIMATED (radar trailer 7.0 m, array 2.3 x 2.9 m,
     shelters 5 x 2.5 m).  Layout: three launchers 8 m apart on the left,
     radar, control station and power plant on the right (a real battery is
     spread over a kilometre or more; this is compressed). */
  var PX_OFF = -2.9;                     /* trailer sits left of centre        */
  var P_Z = 0.12;                        /* hard-standing thickness            */

  function patMats(THREE, u, C) {
    var m = {};
    u.traverse(function (o) {
      if (!o.isMesh) return;
      var mt = o.material, h = mt.color.getHex();
      if (mt.map) m.skin = mt;
      else if (h === 0x80868a) m.steel = mt;
      else if (h === 0x25292b) m.dark = mt;
      else if (h === 0x1b1c1c) m.rub = mt;
      else if (h === 0x24343d) m.glass = mt;
      else if (h === 0xa1956f) m.tan = mt;
      else if (h === 0xb9aa82) m.can = mt;
      else m.team = mt;
    });
    if (!m.skin) m.skin = m.team;
    if (!m.team) m.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.55, metalness: 0.18 });
    m.conc = new THREE.MeshStandardMaterial({ color: 0x5c5d58, roughness: 0.93, metalness: 0.03 });
    return m;
  }
  /* copy a mesh's triangles into the baker, translated; keep only the
     triangles whose vertices all satisfy keep(x) */
  /* the unit hero's tractor leaves three small parts behind the cut: the
     tail cross member (x -0.27..-0.11), the fifth wheel disc and the plate
     over it (x 1.19..2.41, z 1.15..1.35).  A parked trailer has none of
     them under its gooseneck, so triangles wholly inside those boxes go. */
  function tractorBit(P, o) {
    var k, a = true, b = true;
    for (k = 0; k < 3; k++) {
      var x = P[o + k * 3], y = P[o + k * 3 + 1], z = P[o + k * 3 + 2];
      if (!(x > -0.28 && x < -0.10 && z > 0.82 && z < 1.151 && Math.abs(y) < 0.96)) a = false;
      if (!(x > 1.18 && x < 2.42 && z > 1.14 && z < 1.351 && Math.abs(y) < 0.54)) b = false;
    }
    return a || b;
  }
  function takeMesh(K, mesh, tx, ty, tz, keepX) {
    var g = mesh.geometry, P = g.attributes.position.array, N = g.attributes.normal.array;
    var U = g.attributes.uv ? g.attributes.uv.array : null, n = P.length / 9, t, k;
    var oP = [], oN = [], oU = [];
    for (t = 0; t < n; t++) {
      if (keepX !== undefined) {
        if (tractorBit(P, t * 9)) continue;
        var okT = true;
        for (k = 0; k < 3; k++) if (P[t * 9 + k * 3] > keepX) okT = false;
        if (!okT) continue;
      }
      for (k = 0; k < 3; k++) {
        oP.push(P[t * 9 + k * 3] + tx, P[t * 9 + k * 3 + 1] + ty, P[t * 9 + k * 3 + 2] + tz);
        oN.push(N[t * 9 + k * 3], N[t * 9 + k * 3 + 1], N[t * 9 + k * 3 + 2]);
        oU.push(U ? U[t * 6 + k * 2] : 0, U ? U[t * 6 + k * 2 + 1] : 0);
      }
    }
    var THREE = K.T, bg = new THREE.BufferGeometry();
    bg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(oP), 3));
    bg.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(oN), 3));
    bg.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(oU), 2));
    K.add(mesh.material, bg);
  }
  function tyre(K, T, x, y, r, w) {
    K.put(T.rub, new K.T.CylinderGeometry(r, r, w, 14), x, y, r, 0, 0, 0);
  }
  /* uncoupled-trailer wheels: M860 tandem as in us_patriot.js (r 0.62, duals) */
  function trailerWheels(K, T, dx, y0) {
    var ax = [-2.10, -3.55], i, s;
    for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) {
      tyre(K, T, dx + ax[i], y0 + s * 1.12, 0.62, 0.37);
      tyre(K, T, dx + ax[i], y0 + s * 0.67, 0.62, 0.37);
    }
  }
  /* a wheeled box truck of the battery, front toward +X, from x0 to x1 */
  function truck(K, T, x0, y, len, bodyH, wheelsAt) {
    var i, s, x1 = x0 + len;
    K.bb(T.dark, x0, x1, y - 0.55, y + 0.55, 0.8, 1.1);                          /* frame */
    K.bb(T.skin, x1 - 2.1, x1 - 0.5, y - 1.15, y + 1.15, 1.1, 2.7);               /* cab */
    K.bb(T.glass, x1 - 0.52, x1 - 0.48, y - 1.0, y + 1.0, 1.7, 2.45);
    K.bb(T.skin, x1 - 0.5, x1 + 0.7, y - 1.0, y + 1.0, 1.1, 1.8);                 /* bonnet */
    K.bb(T.skin, x0 + 0.1, x1 - 2.2, y - 1.25, y + 1.25, 1.1, 1.1 + bodyH);       /* body */
    K.bb(T.dark, x0 + 0.1, x1 - 2.2, y - 1.25, y + 1.25, 1.1 + bodyH, 1.1 + bodyH + 0.04);
    for (i = 0; i < wheelsAt.length; i++) for (s = -1; s <= 1; s += 2) tyre(K, T, x0 + wheelsAt[i], y + s * 1.05, 0.62, 0.4);
  }

  function buildPatriot(THREE, C, key) {
    var u = UNIT_MODELS[key].build(THREE, {}, C), T = patMats(THREE, u, C);
    var root = new THREE.Group(); root.name = "us_sam_site_patriot_" + key;
    var K = new Baker(THREE), i, j, s;
    var tur = null, stat = [];
    u.children.forEach(function (o) {
      if (o.name === "turret") tur = o;
      else if (o.isMesh) stat.push(o);
    });
    K.bb(T.conc, -13.5, 13.5, -13.5, 13.5, 0, P_Z);                              /* the hard-standing */
    var ZB = P_Z;
    for (j = 0; j < 3; j++) {
      var ly = LY[j];
      for (i = 0; i < stat.length; i++) if (stat[i].material !== T.team) takeMesh(K, stat[i], PX_OFF, ly, ZB, 2.8);
      trailerWheels(K, T, PX_OFF, ly); 
      /* landing stand under the gooseneck (the photographs show a stand at the front of a parked trailer) */
      for (s = -1; s <= 1; s += 2) {
        K.bb(T.steel, PX_OFF + 2.1, PX_OFF + 2.4, ly + s * 0.9 - 0.08, ly + s * 0.9 + 0.08, ZB, ZB + 1.5);
        K.bb(T.dark, PX_OFF + 1.95, PX_OFF + 2.55, ly + s * 0.9 - 0.2, ly + s * 0.9 + 0.2, ZB, ZB + 0.06);
      }
      if (j !== 1) tur.children.forEach(function (o) {
        if (o.isMesh && o.material !== T.team) takeMesh(K, o, PX_OFF + tur.position.x, ly + tur.position.y, ZB + tur.position.z);
      });
    }
    /* the wheels of tur's unit are skipped on purpose (roadwheel groups) */
    /* radar set: trailer, shelter, tilted array facing +X */
    var rx = 5.2, ry = 7.0;
    K.bb(T.dark, rx, rx + 7.0, ry - 1.1, ry + 1.1, 1.0, 1.35);
    K.bb(T.skin, rx, rx + 4.2, ry - 1.27, ry + 1.27, 1.35, 3.65);                /* equipment shelter */
    K.bb(T.skin, rx + 4.2, rx + 7.0, ry - 1.2, ry + 1.2, 1.35, 1.9);              /* forward deck */
    K.put(T.dark, new THREE.BoxGeometry(0.34, 2.3, 2.9), rx + 5.9, ry, 1.9 + 1.45 * Math.cos(0.26), 0, -0.26, 0);   /* array, leaning back */
    K.put(T.glass, new THREE.CylinderGeometry(0.85, 0.85, 0.02, 20), rx + 6.1, ry, 1.9 + 1.5 * Math.cos(0.26), 0, 0, Math.PI / 2);
    for (j = 0; j < 2; j++) { tyre(K, T, rx + 1.8 + j * 1.0, ry - 1.1, 0.62, 0.37); tyre(K, T, rx + 1.8 + j * 1.0, ry + 1.1, 0.62, 0.37); }
    K.bb(T.team, rx + 0.5, rx + 1.7, ry - 0.45, ry + 0.45, 3.65, 3.67);          /* team panel 1: shelter roof */
    K.bb(T.team, PX_OFF + 1.50, PX_OFF + 2.30, -0.40, 0.40, ZB + 1.85, ZB + 1.87);   /* team panel 2: the middle launcher's deck */
    K.bb(T.team, 8.0, 9.2, -1.2 - 0.45, -1.2 + 0.45, 3.64, 3.66);                  /* team panel 3: control-station roof */
    /* engagement control station and power plant: truck-mounted shelters */
    truck(K, T, 5.0, -1.2, 7.6, 2.5, [1.4, 3.0, 5.6]);
    K.bb(T.steel, 5.5, 6.7, -1.9, -0.5, 3.6, 4.05);                              /* shelter air conditioner */
    truck(K, T, 5.0, -9.0, 7.4, 2.2, [1.4, 3.0, 5.4]);
    K.bb(T.dark, 6.4, 8.4, -9.4, -8.6, 3.3, 3.55);                                /* generator exhaust box */
    /* coils of concertina wire along the +X edge, as in the Romania photograph */
    for (i = 0; i < 6; i++) K.put(T.rub, new THREE.CylinderGeometry(0.45, 0.45, 4.0, 12), 13.0, -11.5 + i * 4.6, 0.45 + P_Z, 0, 0, 0);
    K.flush(root);

    /* the turret: the middle launcher's own frame group from the unit hero */
    var tg = new THREE.Group(); tg.name = "turret";
    tg.position.set(PX_OFF + tur.position.x, tur.position.y, ZB + tur.position.z);
    tur.children.slice().forEach(function (o) { tg.add(o); });
    root.add(tg);

    root.userData.whole = true;
    return root;
  }

  return { build: build, buildPatriot: buildPatriot };
})();

BLD_MODELS["sam_nato_e50"] = { build: function (THREE, M, C) { return HeroUsSamSite.build(THREE, C, "ajax"); } };
BLD_MODELS["sam_nato_e60"] = { build: function (THREE, M, C) { return HeroUsSamSite.build(THREE, C, "hercules"); } };
/* Patriot battery: the period's own launcher from us_patriot.js (M901 PAC-2 in e80 and e90, M902 PAC-3 in e00, PAC-3 MSE in e20) */
["e80", "e90", "e00"].forEach(function (e) {
  BLD_MODELS["sam_nato_" + e] = { build: function (THREE, M, C) { return HeroUsSamSite.buildPatriot(THREE, C, "nato_" + e + "_sam"); } };
});
BLD_MODELS["sam_nato_e20"] = { build: function (THREE, M, C) { return HeroUsSamSite.buildPatriot(THREE, C, "sam_n"); } };
