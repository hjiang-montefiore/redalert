/* ============================================================================
   ru_yak38.js  --  HERO models: Yakovlev Yak-38 "Forger" (Yak-36M)
     pact_e60_cfighter   Yak-38 (1976): R-27V-300 + 2 x RD-36-35
     pact_e80_cfighter   Yak-38M (1985): R-28V-300 + 2 x RD-38
   ----------------------------------------------------------------------------
   Model space: +X nose, +Y port, +Z up, metres; origin on the fuselage axis.

   WHAT EACH FEATURE RESTS ON
     * 16.37 m long, 4.25 m high, wing area 18.5 m2 (English Wikipedia data
       block / Combat Aircraft since 1945). Span: 7.022 m spread, 4.45 m folded
       (migflug.com's Yak-38 data page, citing Russian primary sources, which
       also gives the leading edge swept 45 deg, the wing at 10 deg of
       anhedral, zero incidence, and the outer panels folding UP through 102
       deg); aviadejavu.ru gives 7.02 m too. The Western tables' 7.32 m is
       the figure those sources say Russian ones do not print; this model
       takes 7.022 m so that spread and folded span agree. Four pylons under
       the inner wing, two a side (aviadejavu.ru, Mir Aviatsii 124).
     * the lift/cruise engine's two swivelling rear nozzles at the fuselage
       sides under the wing trailing edge, the two lift engines behind the
       cockpit under a dorsal intake door, the vectoring layout: the Commons
       drawing "Yak-38 Lift Engines NT.PNG".
     * wing folded on deck: the outer panels stand upright on the Kiev-class
       deck (photographs: Minsk deck, four Forgers with the panels up and
       stars on the fins and on the outer face of the panels; DPLA photograph
       of a Forger on the Kiev). Hinge at y 2.13 m (4.45 m folded width with the root leaning),
       fold 102 deg (the published figures above).
     * the paint: ONE plain service colour for both rows - the dark blue-grey
       of the Minsk and Kiev deck photographs, the same under the folded
       panels; the fin tips pale as the deck photographs show. The lighter
       Monino museum Yak-38M is a museum repaint and is NOT copied; no
       photograph of an in-service Yak-38M was found, so the 1985 row wears
       the colour of the 1976 one. The belly colour is not visible in the
       photographs I could read and is a shade lighter, unconfirmed. Red stars
       on the fin and on the panels; NO bort numbers, ensign or badge.
     * stores: R-60 on each OUTER pylon (aviadejavu.ru: the Yak-38 "carries
       the R-60M, the typical air-combat weapon"; the rows name 2 x R-60 / R-60M
       and a GSh-23L pod); inner pylons clean, as on the deck photographs. The
       UPK-23-250 pod and the UB-16/UB-32 rocket pods the sources also show
       are not drawn.
     * the Yak-38M differs from the Yak-38 in this model by nothing: its
       changes (R-28V-300 and RD-38 engines, slightly wider intakes,
       reinforced pylons) are not visible in a model of this scale.
   ========================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroYak38 = (function () {
  "use strict";
  var PI = Math.PI, D2R = PI / 180;

  var VARS = {
    /* the dark blue-grey of the Minsk and Kiev deck photographs; both rows */
    y38:  { top: 0x364651, belly: 0x4a5a65, wing: 0x364651, fin: 0x364651, tip: 0xc9d0d3 }
  };

  function build(THREE, M, C, V) {
    var g = new THREE.Group();
    var col = new THREE.Color();

    /* ------------------------------------------------ geometry accumulators */
    function Acc() { this.p = []; this.c = []; }
    function put(A, a, b, c, hex, flip) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      if ((uy * vz - uz * vy) === 0 && (uz * vx - ux * vz) === 0 && (ux * vy - uy * vx) === 0) return;
      if (flip) { var t = b; b = c; c = t; }
      col.setHex(hex);
      A.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
      for (var i = 0; i < 3; i++) A.c.push(col.r, col.g, col.b);
    }
    function normal(a, b, c) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx, l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      return [nx / l, ny / l, nz / l];
    }
    /* a closed loft through rings (same point count), capped; faces point
       away from the solid's centre. colorFn(normal, centroid) -> hex */
    function solid(A, rings, colorFn, capStart, capEnd) {
      var n = rings[0].length, cx = 0, cy = 0, cz = 0, cnt = 0, i, j, r;
      for (r = 0; r < rings.length; r++) for (i = 0; i < n; i++) { cx += rings[r][i][0]; cy += rings[r][i][1]; cz += rings[r][i][2]; cnt++; }
      cx /= cnt; cy /= cnt; cz /= cnt;
      function tri(a, b, c) {
        var nn = normal(a, b, c), mx = (a[0] + b[0] + c[0]) / 3, my = (a[1] + b[1] + c[1]) / 3, mz = (a[2] + b[2] + c[2]) / 3;
        var out = nn[0] * (mx - cx) + nn[1] * (my - cy) + nn[2] * (mz - cz) < 0;
        if (out) { var t = b; b = c; c = t; nn = [-nn[0], -nn[1], -nn[2]]; }
        put(A, a, b, c, colorFn ? colorFn(nn, [mx, my, mz]) : 0x888888, false);
      }
      for (r = 0; r + 1 < rings.length; r++) {
        for (i = 0; i < n; i++) {
          j = (i + 1) % n;
          tri(rings[r][i], rings[r][j], rings[r + 1][j]);
          tri(rings[r][i], rings[r + 1][j], rings[r + 1][i]);
        }
      }
      function cap(ring) {
        var m = [0, 0, 0];
        for (var k = 0; k < n; k++) { m[0] += ring[k][0] / n; m[1] += ring[k][1] / n; m[2] += ring[k][2] / n; }
        for (var k2 = 0; k2 < n; k2++) tri(m, ring[k2], ring[(k2 + 1) % n]);
      }
      if (capStart !== false) cap(rings[0]);
      if (capEnd !== false) cap(rings[rings.length - 1]);
    }

    /* ------------------------------------------------ colour rules */
    function bodyCol(nn, c) { return nn[2] < -0.35 ? V.belly : V.top; }
    function wingCol(nn) { return V.wing; }
    function finCol(nn, c) { return c[2] > 2.35 ? V.tip : V.fin; }
    function plain(h) { return function () { return h; }; }

    /* ------------------------------------------------ materials (<= 10) */
    var T = {
      body:  new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.62, metalness: 0.12 }),
      marks: new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.7, metalness: 0.0, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }),
      dark:  new THREE.MeshStandardMaterial({ color: 0x1b1d20, roughness: 0.8, metalness: 0.3 }),
      glass: new THREE.MeshStandardMaterial({ color: 0x2a3a40, roughness: 0.15, metalness: 0.6 }),
      metal: new THREE.MeshStandardMaterial({ color: 0x8d9195, roughness: 0.5, metalness: 0.6 }),
      tyre:  new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 0.95, metalness: 0.0 }),
      burn:  new THREE.MeshStandardMaterial({ color: 0x54504a, roughness: 0.6, metalness: 0.6 }),
      store: new THREE.MeshStandardMaterial({ color: 0xb7bcbc, roughness: 0.55, metalness: 0.15 }),
      team:  new THREE.MeshStandardMaterial({ color: C && C.team !== undefined ? C.team : 0xc83a2a, roughness: 0.55, metalness: 0.4 })
    };

    var body = new Acc(), marks = new Acc(), dark = new Acc(), glass = new Acc(), metal = new Acc(), tyre = new Acc(),
        burn = new Acc(), store = new Acc(), team = new Acc();
    var fold = [new Acc(), new Acc()], foldMk = [new Acc(), new Acc()];   /* [0] port, [1] starboard; built in model space, moved to the hinge later */

    /* ------------------------------------------------ fuselage */
    function sx(c, p) { var s = c < 0 ? -1 : 1; return s * Math.pow(Math.abs(c), 2 / p); }
    function secRing(x, hw, top, bot, p, N) {
      var ring = [], zc = (top + bot) / 2, hh = (top - bot) / 2;
      for (var k = 0; k < N; k++) {
        var a = 2 * PI * k / N;
        ring.push([x, hw * sx(Math.cos(a), p), zc + hh * sx(Math.sin(a), p)]);
      }
      return ring;
    }
    /* x, half width, top, bottom, exponent */
    var FS = [
      [7.15, 0.03, 0.05, -0.05, 2],
      [7.00, 0.17, 0.20, -0.20, 2.2],
      [6.40, 0.40, 0.38, -0.42, 2.3],
      [5.50, 0.60, 0.52, -0.58, 2.5],
      [4.50, 0.74, 0.62, -0.68, 2.6],
      [3.40, 0.86, 0.70, -0.74, 2.7],
      [1.80, 0.92, 0.76, -0.78, 2.8],
      [0.00, 0.92, 0.76, -0.76, 2.8],
      [-1.80, 0.86, 0.72, -0.70, 2.7],
      [-3.40, 0.70, 0.64, -0.58, 2.6],
      [-5.20, 0.52, 0.56, -0.46, 2.5],
      [-7.00, 0.38, 0.46, -0.38, 2.4],
      [-8.05, 0.24, 0.34, -0.30, 2.2]
    ];
    /* smooth the control stations: cosine interpolation every ~0.4 m */
    var FD = [];
    (function () {
      for (var i = 0; i + 1 < FS.length; i++) {
        var a = FS[i], b = FS[i + 1], n = Math.max(1, Math.round((a[0] - b[0]) / 0.3));
        for (var k = 0; k < n; k++) {
          var t = k / n, u = (1 - Math.cos(PI * t)) / 2, r = [];
          for (var q = 0; q < 5; q++) r.push(a[q] + (b[q] - a[q]) * (q === 0 ? t : u));
          FD.push(r);
        }
      }
      FD.push(FS[FS.length - 1]);
    })();
    var rings = FD.map(function (s) { return secRing(s[0], s[1], s[2], s[3], s[4], 40); });
    solid(body, rings, bodyCol);
    /* the tail cone's end: a dark jet pipe stub */
    solid(burn, [secRing(-8.05, 0.22, 0.30, -0.26, 2.2, 14), secRing(-8.19, 0.18, 0.25, -0.22, 2.2, 14)], plain(0), true, true);

    /* nose: the pitot boom */
    solid(metal, [secRing(7.15, 0.025, 0.025, -0.025, 2, 6), secRing(8.18, 0.012, 0.012, -0.012, 2, 6)], plain(0), true, true);

    /* ------------------------------------------------ canopy and dorsal spine */
    function zTop(x) { /* fuselage top surface at x (linear between stations) */
      for (var i = 0; i + 1 < FS.length; i++) if (x <= FS[i][0] && x >= FS[i + 1][0]) {
        var t = (FS[i][0] - x) / (FS[i][0] - FS[i + 1][0]); return FS[i][2] + t * (FS[i + 1][2] - FS[i][2]);
      }
      return 0.4;
    }
    var cs = [[5.25, 0.0, 0.0], [5.0, 0.28, 0.20], [4.5, 0.38, 0.44], [3.9, 0.40, 0.54], [3.3, 0.36, 0.46], [2.85, 0.26, 0.28], [2.6, 0.0, 0.0]];
    solid(glass, cs.map(function (s) {
      var base = zTop(s[0]) - 0.06, ring = [];
      for (var k = 0; k < 10; k++) { var a = PI * k / 9; ring.push([s[0], s[1] * Math.cos(a), base + s[2] * Math.sin(a) * 1.0 + (k === 0 || k === 9 ? -0.02 : 0)]); }
      return ring;
    }), plain(0), true, true);
    /* the canopy sill and the aft fairing in body colour */
    solid(body, [
      secRing(2.9, 0.20, 0.00 + zTop(2.9) + 0.30, zTop(2.9) - 0.05, 2.4, 12),
      secRing(1.6, 0.34, zTop(1.6) + 0.20, zTop(1.6) - 0.10, 2.6, 12),
      secRing(-0.5, 0.36, zTop(-0.5) + 0.20, zTop(-0.5) - 0.12, 2.6, 12),
      secRing(-2.9, 0.26, zTop(-2.9) + 0.14, zTop(-2.9) - 0.12, 2.6, 12)
    ], bodyCol);
    /* the lift engines' dorsal intake door: a flat raised slab behind the cockpit, dark louvre inside */
    (function () {
      var x0 = 2.45, x1 = 1.15, zz = zTop(2.0) + 0.27;
      var quad = [[x0, -0.31, zz], [x0, 0.31, zz], [x1, 0.31, zz], [x1, -0.31, zz]];
      solid(dark, [quad, quad.map(function (q) { return [q[0], q[1], q[2] + 0.025]; })], plain(0), true, true);
      var x2 = 1.15, x3 = 0.35, ring = [[x2, -0.30, zz + 0.02], [x2, 0.30, zz + 0.02], [x3, 0.30, zz - 0.04], [x3, -0.30, zz - 0.04]];
      solid(body, [ring, ring.map(function (q) { return [q[0], q[1], q[2] + 0.03]; })], bodyCol, true, true);
    })();

    /* the dorsal door's louvres: five thin dark slats across it */
    for (var li = 0; li < 5; li++) {
      var lx = 2.30 - li * 0.2, lz = zTop(2.0) + 0.30;
      solid(dark, [[[lx, -0.26, lz], [lx, 0.26, lz], [lx - 0.07, 0.26, lz], [lx - 0.07, -0.26, lz]], [[lx, -0.26, lz + 0.03], [lx, 0.26, lz + 0.03], [lx - 0.07, 0.26, lz + 0.03], [lx - 0.07, -0.26, lz + 0.03]]], plain(0), true, true);
    }

    /* ------------------------------------------------ side intakes (R-27V-300 + lift-engine air) */
    [-1, 1].forEach(function (s) {
      var mk = function (x, y0, y1, z0, z1) { return [[x, s * y0, z0], [x, s * y1, z0], [x, s * y1, z1], [x, s * y0, z1]]; };
      /* the box: lip at x 4.45, running aft along the fuselage side */
      solid(body, [mk(4.45, 0.58, 1.06, -0.52, 0.42), mk(3.9, 0.66, 1.12, -0.55, 0.45), mk(2.6, 0.78, 1.14, -0.55, 0.45), mk(1.2, 0.84, 1.00, -0.50, 0.40)], bodyCol, true, true);
      /* the dark mouth */
      var m0 = mk(4.455, 0.64, 1.00, -0.46, 0.36), m1 = mk(4.40, 0.64, 1.00, -0.46, 0.36);
      solid(dark, [m0, m1], plain(0), true, true);
    });

    /* ------------------------------------------------ the swivelling rear nozzles */
    [-1, 1].forEach(function (s) {
      function ring(x, r, y, z) { var R = []; for (var k = 0; k < 32; k++) { var a = 2 * PI * k / 32; R.push([x, y + r * Math.cos(a), z + r * Math.sin(a)]); } return R; }
      var y = s * 0.80, z = -0.22;
      solid(burn, [ring(-1.3, 0.40, y, z), ring(-1.8, 0.36, y, z), ring(-2.7, 0.30, y, z)], plain(0), true, true);
      solid(dark, [ring(-2.7, 0.26, y, z), ring(-2.66, 0.26, y, z)], plain(0), true, true);
    });

    /* ------------------------------------------------ wing: low, 45 deg sweep, 10 deg anhedral, outer panels fold up 102 deg */
    var ANH = -10 * D2R, YR = 0.85, YH = 2.13, YT = 3.511;
    function wlead(y) { return 1.30 - (y - YR) * 1.0; }                 /* leading edge x */
    function wtrail(y) { return -2.10 - (y - YR) * 0.285; }              /* trailing edge x */
    function wz(y) { return -0.34 + (y - YR) * Math.tan(ANH); }          /* wing mid-plane height */
    function wthk(y) { return 0.20 - (y - YR) * 0.034; }
    function wsec(s, y) {
      var xl = wlead(y), xt = wtrail(y), z = wz(y), t = wthk(y), c = xl - xt;
      return [[xl, s * y, z], [xl - 0.2 * c, s * y, z + t / 2], [xl - 0.7 * c, s * y, z + t / 2], [xt, s * y, z], [xl - 0.7 * c, s * y, z - t / 2], [xl - 0.2 * c, s * y, z - t / 2]];
    }
    [-1, 1].forEach(function (s, si) {
      solid(body, [wsec(s, YR), wsec(s, 1.35), wsec(s, 1.85), wsec(s, YH)], wingCol, true, true);
      /* the outer panel: built in model space, then moved to its hinge */
      var A = fold[si];
      solid(A, [wsec(s, YH), wsec(s, 2.7), wsec(s, 3.2), wsec(s, YT)], wingCol, true, true);
      /* wing-tip fairing stub */
    });

    /* pylons: two on each wing inboard of the fold hinge */
    var PYL = [1.35, 2.05];
    [-1, 1].forEach(function (s) {
      PYL.forEach(function (y, idx) {
        var zw = wz(y) - wthk(y) / 2, xl = wlead(y) - 0.4, xt = xl - 1.1;
        solid(store, [
          [[xl, s * y - 0.03, zw + 0.02], [xl, s * y + 0.03, zw + 0.02], [xt, s * y + 0.03, zw + 0.02], [xt, s * y - 0.03, zw + 0.02]],
          [[xl - 0.1, s * y - 0.03, zw - 0.20], [xl - 0.1, s * y + 0.03, zw - 0.20], [xt + 0.1, s * y + 0.03, zw - 0.20], [xt + 0.1, s * y - 0.03, zw - 0.20]]
        ], plain(0), true, true);
        function cyl(x0, x1, r, zc, noseL, tailL, Acc_) {
          function rg(x, rr) { var R = []; for (var k = 0; k < 20; k++) { var a = 2 * PI * k / 20; R.push([x, s * y + rr * Math.cos(a), zc + rr * Math.sin(a)]); } return R; }
          solid(Acc_, [rg(x0 + noseL, 0.01), rg(x0, r), rg(x1, r), rg(x1 - tailL, r * 0.35)], plain(0), true, true);
        }
        if (idx === 1) {
          /* R-60 on the outer pylon: 2.09 m, 120 mm body */
          cyl(xl + 0.5, xl - 1.6, 0.060, zw - 0.28, 0.35, 0.10, store);
        }
      });
    });

    /* ------------------------------------------------ tailplane (all moving, slight anhedral) */
    [-1, 1].forEach(function (s) {
      function tsec(y) {
        var xl = -5.05 - (y - 0.35) * 1.28, xt = -8.00 - (y - 0.35) * 0.06, z = -0.26 + (y - 0.35) * Math.tan(-5 * D2R), t = 0.14 - (y - 0.35) * 0.04;
        return [[xl, s * y, z], [xl * 0.62 + xt * 0.38, s * y, z + t / 2], [xt, s * y, z], [xl * 0.62 + xt * 0.38, s * y, z - t / 2]];
      }
      solid(body, [tsec(0.30), tsec(0.8), tsec(1.3), tsec(1.95)], wingCol, true, true);
    });

    /* ------------------------------------------------ fin: swept, with its dorsal root */
    (function () {
      function fsec(h, t) {
        var xl = -2.85 - h * 1.55, xt = -8.00, z = 0.40 + h, c = xl - xt;
        return [[xl, 0, z], [xl - 0.25 * c, t / 2, z], [xl - 0.65 * c, t / 2, z], [xt, 0, z], [xl - 0.65 * c, -t / 2, z], [xl - 0.25 * c, -t / 2, z]];
      }
      var fr = [fsec(0.0, 0.30), fsec(0.7, 0.23), fsec(1.4, 0.17), fsec(2.1, 0.11)];
      solid(body, fr, finCol, true, true);
    })();

    /* ------------------------------------------------ landing gear: group "gear" */
    var GZ = -1.75;                        /* ground, below the axis */
    var gr = new THREE.Group(); gr.name = "gear";
    var gm = new Acc(), gt = new Acc();
    function wheel(x, y, r, w, A) {
      var a = new Acc(), R1 = [], R2 = [];
      for (var k = 0; k < 32; k++) { var q = 2 * PI * k / 32; R1.push([x + r * Math.cos(q), y - w / 2, GZ + r + r * Math.sin(q)]); R2.push([x + r * Math.cos(q), y + w / 2, GZ + r + r * Math.sin(q)]); }
      solid(A, [R1, R2], plain(0), true, true);
      var H1 = [], H2 = [];
      for (var k2 = 0; k2 < 24; k2++) { var q2 = 2 * PI * k2 / 24; H1.push([x + 0.55 * r * Math.cos(q2), y - w / 2 - 0.01, GZ + r + 0.55 * r * Math.sin(q2)]); H2.push([x + 0.55 * r * Math.cos(q2), y + w / 2 + 0.01, GZ + r + 0.55 * r * Math.sin(q2)]); }
      solid(gm, [H1, H2], plain(0), true, true);
    }
    function strut(x0, y0, z0, x1, y1, z1, r, A) {
      function rg(x, y, z) { var R = []; for (var k = 0; k < 6; k++) { var q = 2 * PI * k / 6; R.push([x + r * Math.cos(q), y + r * Math.sin(q), z]); } return R; }
      solid(A, [rg(x0, y0, z0), rg(x1, y1, z1)], plain(0), true, true);
    }
    /* nose gear, twin wheels, forward-retracting, under the cockpit */
    var NX = 4.55;
    strut(NX, 0, -0.62, NX - 0.10, 0, GZ + 0.28, 0.055, gm);
    wheel(NX - 0.10, -0.13, 0.27, 0.15, gt); wheel(NX - 0.10, 0.13, 0.27, 0.15, gt);
    /* main gear: single wheels at the wing root, track 2.6 m */
    var MX = -0.85;
    [-1, 1].forEach(function (s) {
      strut(MX, s * 0.62, -0.50, MX, s * 1.30, GZ + 0.44, 0.07, gm);
      wheel(MX, s * 1.30, 0.44, 0.24, gt);
      /* a small door on the leg */
    });
    function mesh(A, mat, name, parent) {
      if (!A.p.length) return null;
      var geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(A.p, 3));
      geo.setAttribute("color", new THREE.Float32BufferAttribute(A.c, 3));
      geo.computeVertexNormals();
      var m = new THREE.Mesh(geo, mat); m.name = name; (parent || g).add(m); return m;
    }
    mesh(gm, T.metal, "gear_legs", gr); mesh(gt, T.tyre, "gear_tyres", gr);
    g.add(gr);

    /* ------------------------------------------------ national marking: the Soviet star
       red edge, white border, red star; on the fin and on the upper wing */
    function starPoly(A, cx, o, r, ang, offs, uAx, vAx, nAx) {
      /* o: [x,y,z] centre; (u,v) the surface axes; n the offset normal */
      function pt(rr, k) {
        var a = -PI / 2 + k * PI / 5 + ang, q = (k & 1) ? 0.40 : 1;
        var u = Math.cos(a) * q * rr, v = Math.sin(a) * q * rr;
        return [o[0] + uAx[0] * u + vAx[0] * v + nAx[0] * offs, o[1] + uAx[1] * u + vAx[1] * v + nAx[1] * offs, o[2] + uAx[2] * u + vAx[2] * v + nAx[2] * offs];
      }
      var layers = [[1.22, 0xa8261f, 0], [1.10, 0xe6e4dc, 0.004], [0.98, 0xb7241d, 0.008]];
      layers.forEach(function (L) {
        var c = [o[0] + nAx[0] * (offs + L[2]), o[1] + nAx[1] * (offs + L[2]), o[2] + nAx[2] * (offs + L[2])];
        for (var k = 0; k < 10; k++) {
          var a0 = -PI / 2 + k * PI / 5 + ang, a1 = -PI / 2 + (k + 1) * PI / 5 + ang, q0 = (k & 1) ? 0.40 : 1, q1 = ((k + 1) & 1) ? 0.40 : 1;
          var p0 = [0, 0, 0], p1 = [0, 0, 0], i;
          var u0 = Math.cos(a0) * q0 * r * L[0], v0 = Math.sin(a0) * q0 * r * L[0], u1 = Math.cos(a1) * q1 * r * L[0], v1 = Math.sin(a1) * q1 * r * L[0];
          for (i = 0; i < 3; i++) { p0[i] = c[i] + uAx[i] * u0 + vAx[i] * v0; p1[i] = c[i] + uAx[i] * u1 + vAx[i] * v1; }
          var nn = normal(c, p0, p1), flip = (nn[0] * nAx[0] + nn[1] * nAx[1] + nn[2] * nAx[2]) < 0;
          put(A, c, p0, p1, L[1], flip);
        }
      });
    }
    /* fin: both sides, at the mid-height of the fin, aft of its root; u = forward (+x), v = up (+z) - mirrored so it reads right on both sides */
    [-1, 1].forEach(function (s) {
      var h = 1.0, xl = -2.85 - h * 1.55, xc = xl - 0.45 * (xl + 8.0), zc = 0.40 + h, t = 0.30 - h * (0.19 / 2.1);
      starPoly(marks, null, [xc, s * t / 2, zc], 0.26, 0, 0.012, [s > 0 ? -1 : 1, 0, 0], [0, 0, -1], [0, s, 0]);
    });
    /* upper wing: on the outer (folding) panel, at 2/3 of the panel's span; plane is the panel's own so it folds with it */
    /* the photographs (Kiev deck, Monino) show the star on the face of the folded panel that
       looks outward, which is the panel's UNDERSIDE: it is placed there */
    [-1, 1].forEach(function (s, si) {
      var y = 3.0, c = wlead(y) - wtrail(y), xc = wlead(y) - 0.45 * c, zc = wz(y) - wthk(y) / 2;
      var sA = Math.sin(ANH), cA = Math.cos(ANH);
      starPoly(foldMk[si], null, [xc, s * y, zc], 0.30, 0, 0.004, [-1, 0, 0], [0, s * cA, sA], [0, s * sA, -cA]);
    });

    /* ------------------------------------------------ team colour: two small up-facing strips on the tailplane tops */
    function strip(A, x0, x1, y0, y1, z) {
      var q = [[x0, y0, z], [x0, y1, z], [x1, y1, z], [x1, y0, z]];
      solid(A, [q, q.map(function (p) { return [p[0], p[1], p[2] + 0.025]; })], plain(0), true, true);
    }
    [-1, 1].forEach(function (s) {
      var y0 = 0.9, y1 = 1.55, zt = -0.26 + ((y0 + y1) / 2 - 0.35) * Math.tan(-5 * D2R) + 0.07 - 0.0 - 0.005;
      strip(team, -6.6, -7.2, s * y0, s * y1, zt + 0.0);
    });

    /* ------------------------------------------------ assemble */
    mesh(body, T.body, "airframe");
    mesh(marks, T.marks, "marks");
    mesh(dark, T.dark, "intakes");
    mesh(glass, T.glass, "canopy");
    mesh(metal, T.metal, "boom");
    mesh(burn, T.burn, "nozzles");
    mesh(store, T.store, "stores");
    mesh(team, T.team, "team");

    /* folding outer panels: one "wingfold" group each, origin on the hinge (the wing's mid-plane at y 2.13) */
    [-1, 1].forEach(function (s, si) {
      var fg = new THREE.Group(), hz = wz(YH);
      fg.name = "wingfold";
      fg.position.set(0, s * YH, hz);
      fg.userData.fold = { axis: [1, 0, 0], angle: s * 102 * D2R };
      [[fold[si], T.body, "skin_fold"], [foldMk[si], T.marks, "marks_fold"]].forEach(function (e) {
        var A = e[0];
        for (var i = 0; i < A.p.length; i += 3) { A.p[i + 1] -= s * YH; A.p[i + 2] -= hz; }
        mesh(A, e[1], e[2], fg);
      });
      g.add(fg);
    });
    return g;
  }

  return { build: build, VARS: VARS };
})();

UNIT_MODELS["pact_e60_cfighter"] = {
  len: 16.37,
  build: function (THREE, M, C) { return HeroYak38.build(THREE, M, C, HeroYak38.VARS.y38); }
};
UNIT_MODELS["pact_e80_cfighter"] = {
  len: 16.37,
  build: function (THREE, M, C) { return HeroYak38.build(THREE, M, C, HeroYak38.VARS.y38); }
};
