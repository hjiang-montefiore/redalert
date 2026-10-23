/* ===== airbase_runway.js - the runway airbase, INTERIM model ==============
   rules.js airbase: 12 x 4 tiles, 240 x 80 m - a runway 40 m wide along the
   south side and four revetments in a row along the north, 60 m of it each
   (owner 2026-10-23; _keep/airbase_study/REPORT.md, option B; PLAN.md).

   This is the plain, flat field the logic pieces are built and measured on:
   the concrete apron, the runway with its threshold bars, centreline and
   touchdown marks, the four hardstands where def.padPts puts the aircraft,
   and a yellow lead-in from each to the runway. Nothing stands up from it,
   so nothing can be inside a parked or taxiing aircraft. The full-quality
   model - the revetment walls, the tower, the hut, the fuel point, the
   lights (PLAN.md piece 10) - replaces it.

   Model frame as every structure's: +X east, +Y north, +Z up, world metres
   over BLD_SCALE (1.10), the origin at the footprint's middle. The 3 x 3
   field of older saves is hero/airbase_revetments.js (airbase3). */
var HeroAirbaseRunway = (function () {
  "use strict";
  var S = 1 / 1.1;                       /* world metres -> model            */
  var TILE = 20;                         /* metres a tile                     */
  var W = 12, H = 4;                     /* rules.js airbase w, h             */
  var HX = W * TILE / 2 * S, HY = H * TILE / 2 * S;
  /* tiles from the north-west corner -> model x, y */
  function MX(t) { return (t - W / 2) * TILE * S; }
  function MY(t) { return (H / 2 - t) * TILE * S; }
  var RW_Y = 3, RW_HALF = 1;             /* rules.js airbase.runway           */
  var PADS = [1.5, 4.5, 7.5, 10.5], PAD_Y = 0.9;   /* rules.js airbase.padPts */
  var Z0 = 0.30;                         /* the apron's top                   */

  function Batch() { this.p = []; this.n = []; }
  /* a flat rectangle at height z */
  Batch.prototype.rect = function (x0, x1, y0, y1, z) {
    var a = [x0, y0, z], b = [x1, y0, z], c = [x1, y1, z], d = [x0, y1, z];
    [a, b, c, a, c, d].forEach(function (v) { this.p.push(v[0], v[1], v[2]); this.n.push(0, 0, 1); }, this);
  };
  /* the apron's edge, a skirt down to the ground */
  Batch.prototype.skirt = function (x0, x1, y0, y1, z) {
    var self = this;
    function q(a, b, nx, ny) {
      var A = [a[0], a[1], z], B = [b[0], b[1], z], C = [b[0], b[1], 0], D = [a[0], a[1], 0];
      [A, B, C, A, C, D].forEach(function (v) { self.p.push(v[0], v[1], v[2]); self.n.push(nx, ny, 0); });
    }
    q([x0, y0], [x1, y0], 0, -1); q([x1, y0], [x1, y1], 1, 0); q([x1, y1], [x0, y1], 0, 1); q([x0, y1], [x0, y0], -1, 0);
  };
  Batch.prototype.mesh = function (THREE, mat, name) {
    if (!this.p.length) return null;
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    var m = new THREE.Mesh(g, mat);
    m.name = name;
    return m;
  };

  function build(THREE, M, C) {
    var root = new THREE.Group();
    root.name = "airbase";
    var mat = function (c, r) { return new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: 0.02 }); };
    var T = {
      concrete: mat(0x8d8e88, 0.95),
      asphalt:  mat(0x3d4043, 0.9),
      paint:    mat(0xd8d8d2, 0.8),
      lead:     mat(0xc9a43a, 0.8),
      stand:    mat(0x9d9d96, 0.95),
      team:     new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x4b8fe0, roughness: 0.6, metalness: 0.1 }),
    };
    var K = {};
    Object.keys(T).forEach(function (k) { K[k] = new Batch(); });

    /* the apron, the whole plot */
    K.concrete.rect(-HX, HX, -HY, HY, Z0);
    K.concrete.skirt(-HX, HX, -HY, HY, Z0);

    /* the runway: 40 m by the plot's length, its threshold bars at both ends,
       a dashed centreline between them and a pair of touchdown marks past each */
    var ry0 = MY(RW_Y + RW_HALF) + 1.0 * S, ry1 = MY(RW_Y - RW_HALF) - 1.0 * S, rc = MY(RW_Y);
    K.asphalt.rect(-HX + 1.0 * S, HX - 1.0 * S, ry0, ry1, Z0 + 0.02);
    var ZP = Z0 + 0.04;
    [-1, 1].forEach(function (end) {
      var xe = end * (HX - 3.0 * S);
      for (var i = 0; i < 10; i++) {
        var y = ry0 + 2.2 * S + i * (ry1 - ry0 - 4.4 * S) / 9.5;
        K.paint.rect(Math.min(xe, xe - end * 14 * S), Math.max(xe, xe - end * 14 * S), y, y + 1.6 * S, ZP);
      }
      var xt = end * (HX - 38 * S);
      [rc - 6 * S, rc + 4 * S].forEach(function (y) {
        K.paint.rect(Math.min(xt, xt - end * 16 * S), Math.max(xt, xt - end * 16 * S), y, y + 2.0 * S, ZP);
      });
    });
    for (var x = -HX + 60 * S; x < HX - 60 * S; x += 24 * S) K.paint.rect(x, x + 12 * S, rc - 0.45 * S, rc + 0.45 * S, ZP);
    /* the runway's edge lines */
    K.paint.rect(-HX + 1.0 * S, HX - 1.0 * S, ry0, ry0 + 0.9 * S, ZP);
    K.paint.rect(-HX + 1.0 * S, HX - 1.0 * S, ry1 - 0.9 * S, ry1, ZP);

    /* the four hardstands, a lead-in from each to the runway, and a flash of
       the owner's colour at the back of each */
    PADS.forEach(function (px) {
      var cx = MX(px), cy = MY(PAD_Y);
      K.stand.rect(cx - 22 * S, cx + 22 * S, MY(1.85), MY(0.08), Z0 + 0.03);
      K.lead.rect(cx - 0.4 * S, cx + 0.4 * S, ry1, cy + 6 * S, ZP);
      K.team.rect(cx - 6 * S, cx + 6 * S, MY(0.08) - 1.6 * S, MY(0.08) - 0.4 * S, ZP);
    });

    Object.keys(T).forEach(function (k) {
      var m = K[k].mesh(THREE, T[k], "airbase_" + k);
      if (m) root.add(m);
    });
    return root;
  }
  return { build: build };
})();
BLD_MODELS["airbase"] = { build: HeroAirbaseRunway.build };
