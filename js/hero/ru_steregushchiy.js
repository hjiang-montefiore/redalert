/* ============================================================================
   ru_steregushchiy.js -- HERO model: Project 20380 Steregushchiy, the lead
   ship of the class (Severnaya Verf, St Petersburg; launched 2006,
   commissioned Nov 2008 as the first post-Soviet Russian surface warship).
   Registered as pact_e00_corvette, the PACT e00 corvette ("service 2008").

   Measured off photographs, all on Wikimedia Commons ("Steregushchiy" 530):
     - "Corvette Steregushchiy in SPB" (Navy Day, starboard broadside from
       across the Neva, long lens, 9.9 px a metre at 104.5 m): the sheer,
       the open after deck, the hangar block (front at 19 m from the
       transom, roof 11.8 m up), the black exhaust pylon aft of the bridge,
       the bridge block and the mast tower (dome 23.7 m, whip 31 m), the
       sloping front of the 01 deck house, the Kashtan abaft the gun and
       the A-190 on the forecastle (28 m from midships).
     - "Corvette Steregushchiy" and "Steregushchiy in SPb 2011 (1), (4)":
       the same ship from the starboard bow and quarter: the faceted
       bridge with its window band, the tower with dark radar faces and the
       cross yards, the black pylon with its own mast, the red boot line.
     - "Steregushchiy ship": the stern - the open after deck at one level
       with a Ka-27PL on it, the sloping transom, the hangar's tall aft face
       with the door in it, deck edge 3.9 m above the water.
     - "CIWS Kortik - Steregushchiy (1)" (2007): the Kashtan close up -
       a faceted shield pedestal with the fire-control module and the gun
       on it - on the LEAD SHIP, at the start of her trials.
   Published figures: LOA 104.5 m, beam 11.1 m, draught about 3.7 m, about
   2,100 t full load; one 100 mm A-190, Kashtan CIWS, two quadruple Uran
   launchers, a Ka-27 hangar and flat pad aft.

   What the lead ship has that later boats do not (reported, not drawn as a
   variant): the 2008 fit is the A-190 and ONE Kashtan abaft it on the
   centreline, at the forward end of the 01 house (checked in four starboard
   and bow photographs); the Redut VLS belongs to the 20385 and is NOT here,
   and the later 20380s carry AK-630M in place of the Kashtan. The torpedo
   tubes and the 14.5 mm mounts were not confirmed, so none is drawn. The
   quad Uran launchers (a published fit) are NOT drawn: no photograph read
   shows them as boxes; the inclined panelled surfaces forward of the bridge
   are where they are reported to be, and that was not confirmed.

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0. The flat
   after deck is one level (z 4.0) from the transom to the hangar, with no
   rails or fittings on it: render3d's deckOf finds it and parks a Ka-27.
   The only trained part is the A-190 ("turret"); the Kashtan is baked.
   Every static part is merged into ONE mesh per material (ten materials), the gun being its own small group of three.
   ASCII only.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSteregushchiy = (function () {
  "use strict";
  var PI = Math.PI;
  var LOA = 104.5, XT = -52.25, XBOW = 52.2;

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function tbl(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++)
      if (x <= T[i][0]) return lerp(T[i - 1][1], T[i][1], (x - T[i - 1][0]) / (T[i][0] - T[i - 1][0]));
    return T[T.length - 1][1];
  }

  /* ----------------------------------------------------------- hull form */
  /* deck edge height: the after deck is one flat level, z 4.0, to the hangar */
  var ZD = [[-52.25, 4.00], [-30, 4.00], [-12, 4.25], [5, 4.65], [15, 5.2], [28, 6.0],
            [38, 6.55], [46, 7.05], [52.2, 7.4]];
  var YD = [[-52.25, 4.55], [-46, 5.15], [-30, 5.50], [10, 5.55], [22, 4.95], [32, 3.85],
            [40, 2.75], [46, 1.45], [50, 0.5], [52.2, 0.0]];
  var YW = [[-52.25, 4.10], [-45, 4.65], [-30, 4.90], [8, 4.90], [20, 4.45], [30, 3.55],
            [38, 2.35], [44, 1.05], [47.6, 0.0]];
  var ZL = [[-52.25, -1.2], [-44, -2.5], [-30, -3.5], [-12, -3.7], [40, -3.7], [47, -3.2]];
  var PE = [[-52.25, 2.6], [-30, 1.9], [10, 1.7], [30, 1.35], [47, 1.1]];
  function stemX(z) { return 47.6 + 0.62 * z; }
  function zD(x) { return tbl(ZD, x); }
  function halfB(x, z) {
    var xs = stemX(z);
    if (x >= xs) return 0;
    var zl = tbl(ZL, x), zd = zD(x), yw = tbl(YW, x), y;
    if (z <= zl) return 0;
    if (z < 0) {
      var s = clamp(z / zl, 0, 1), p = tbl(PE, x);
      y = yw * Math.pow(Math.max(0, 1 - Math.pow(s, p)), 1 / p);
    } else {
      y = yw + (tbl(YD, x) - yw) * Math.pow(clamp(z / zd, 0, 1), 1.25);
    }
    return Math.min(y, 0.55 * (xs - x));
  }
  function edgeY(x) { return halfB(x, zD(x)); }
  var STA0 = [-52.25, -51.2, -49, -46, -42.5, -39, -35, -31, -27, -23, -19, -15, -11, -7, -3, 1,
             5, 9, 13, 17, 21, 25, 28.5, 32, 35, 38, 40.5, 43, 45, 46.8, 48.2, 49.4, 50.5,
             51.4, 52.2];
  var STA = [STA0[0]];
  for (var _i = 1; _i < STA0.length; _i++) { STA.push((STA0[_i - 1] + STA0[_i]) / 2); STA.push(STA0[_i]); }

  /* --------------------------------------------------------- triangle bag */
  function Bag() { this.p = []; this.n = []; }
  Bag.prototype.tri = function (a, b, c, ref) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var l = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (l < 1e-9) return this;
    nx /= l; ny /= l; nz /= l;
    if (ref) {
      var dx = (a[0] + b[0] + c[0]) / 3 - ref[0], dy = (a[1] + b[1] + c[1]) / 3 - ref[1],
          dz = (a[2] + b[2] + c[2]) / 3 - ref[2];
      if (nx * dx + ny * dy + nz * dz < 0) { var t = b; b = c; c = t; nx = -nx; ny = -ny; nz = -nz; }
    }
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    this.n.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
    return this;
  };
  Bag.prototype.quad = function (a, b, c, d, ref) {
    /* a sliver lying in the centreplane (the stem line) is no surface */
    if (Math.abs(a[1]) + Math.abs(b[1]) + Math.abs(c[1]) + Math.abs(d[1]) < 1e-6) return this;
    this.tri(a, b, c, ref); this.tri(a, c, d, ref); return this;
  };
  /* a hull-side triangle: outward means away from the centreplane on side sd */
  Bag.prototype.side = function (a, b, c, sd) {
    var ny = (b[2] - a[2]) * (c[0] - a[0]) - (b[0] - a[0]) * (c[2] - a[2]);
    if (Math.abs(ny) < 1e-12) return this;
    return this.tri(a, b, c, [(a[0] + b[0] + c[0]) / 3, (a[1] + b[1] + c[1]) / 3 - sd * 10, (a[2] + b[2] + c[2]) / 3]);
  };
  Bag.prototype.geo = function (g) {
    if (g.index) g = g.toNonIndexed();
    var P = g.getAttribute("position"), N = g.getAttribute("normal");
    for (var i = 0; i < P.count; i++) {
      this.p.push(P.getX(i), P.getY(i), P.getZ(i));
      this.n.push(N.getX(i), N.getY(i), N.getZ(i));
    }
    return this;
  };
  Bag.prototype.mesh = function (THREE, mtl) {
    if (!this.p.length) return null;
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    return new THREE.Mesh(g, mtl);
  };

  var _o = null;
  function place(THREE, g, x, y, z, rx, ry, rz) {
    if (!_o) _o = new THREE.Object3D();
    _o.position.set(x || 0, y || 0, z || 0);
    _o.rotation.set(rx || 0, ry || 0, rz || 0);
    _o.scale.set(1, 1, 1);
    _o.updateMatrix();
    g.applyMatrix4(_o.matrix);
    return g;
  }
  function box(THREE, lx, ly, lz, x, y, z, rx, ry, rz) {
    return place(THREE, new THREE.BoxGeometry(lx, ly, lz), x, y, z, rx, ry, rz);
  }
  function cylZ(THREE, rt, rb, h, seg, x, y, z0) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, false);
    g.rotateX(PI / 2);
    return place(THREE, g, x, y, z0 + h * 0.5);
  }
  var _a = null, _b = null;
  function strut(THREE, ax, ay, az, bx, by, bz, r, seg, r2) {
    if (!_a) { _a = new THREE.Vector3(0, 1, 0); _b = new THREE.Vector3(); }
    var dx = bx - ax, dy = by - ay, dz = bz - az, L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new THREE.CylinderGeometry(r2 === undefined ? r : r2, r, L, seg || 5, 1, false);
    g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(_a, _b.set(dx, dy, dz).normalize()));
    g.translate((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
    return g;
  }
  function sphere(THREE, r, ws, hs, x, y, z) {
    var g = new THREE.SphereGeometry(r, ws, hs);
    g.rotateX(PI / 2);
    return place(THREE, g, x, y, z);
  }

  /* a convex solid from plan rings: rings = [[pts3...], ...], same count each */
  function solid(bag, rings, capTop, capBot) {
    var n = rings[0].length, cx = 0, cy = 0, cz = 0, c = 0, i, k;
    rings.forEach(function (r) { r.forEach(function (q) { cx += q[0]; cy += q[1]; cz += q[2]; c++; }); });
    var ref = [cx / c, cy / c, cz / c];
    for (i = 0; i < rings.length - 1; i++)
      for (k = 0; k < n; k++)
        bag.quad(rings[i][k], rings[i][(k + 1) % n], rings[i + 1][(k + 1) % n], rings[i + 1][k], ref);
    var t = rings[rings.length - 1], b = rings[0];
    if (capTop) for (k = 1; k < n - 1; k++) bag.tri(t[0], t[k], t[k + 1], ref);
    if (capBot) for (k = 1; k < n - 1; k++) bag.tri(b[0], b[k], b[k + 1], ref);
    return ref;
  }
  function ring(pts, z) { return pts.map(function (q) { return [q[0], q[1], z]; }); }
  function plan6(x0, xa, xb, w, wf) {
    return [[x0, -w], [xa, -w], [xb, -wf], [xb, wf], [xa, w], [x0, w]];
  }
  function chamRect(x0, x1, hw, ch) {
    return [[x0 + ch, -hw], [x1 - ch, -hw], [x1, -hw + ch], [x1, hw - ch],
            [x1 - ch, hw], [x0 + ch, hw], [x0, hw - ch], [x0, -hw + ch]];
  }
  /* a point on the wall between corners i and j of a two-ring block        */
  function wallPt(bot, top, i, j, u, v) {
    var n = bot.length, a = bot[i], b = bot[j % n], c = top[i], d = top[j % n];
    var p = [], k;
    for (k = 0; k < 3; k++) p.push(lerp(lerp(a[k], b[k], u), lerp(c[k], d[k], u), v));
    return p;
  }
  /* a flat panel laid on a wall, proud by off, outward from ref            */
  function panel(bag, bot, top, i, j, u0, u1, v0, v1, off, ref) {
    var P = [wallPt(bot, top, i, j, u0, v0), wallPt(bot, top, i, j, u1, v0),
             wallPt(bot, top, i, j, u1, v1), wallPt(bot, top, i, j, u0, v1)];
    var ux = P[1][0] - P[0][0], uy = P[1][1] - P[0][1], uz = P[1][2] - P[0][2];
    var vx = P[3][0] - P[0][0], vy = P[3][1] - P[0][1], vz = P[3][2] - P[0][2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    nx /= l; ny /= l; nz /= l;
    var mx = (P[0][0] + P[2][0]) / 2 - ref[0], my = (P[0][1] + P[2][1]) / 2 - ref[1],
        mz = (P[0][2] + P[2][2]) / 2 - ref[2];
    if (nx * mx + ny * my + nz * mz < 0) { nx = -nx; ny = -ny; nz = -nz; }
    P = P.map(function (q) { return [q[0] + nx * off, q[1] + ny * off, q[2] + nz * off]; });
    bag.quad(P[0], P[1], P[2], P[3], ref);
  }

  /* =================================================================== build */
  function build(THREE, M, C) {
    var team = C && C.team !== undefined ? C.team : "#d6503f";
    var root = new THREE.Group();
    var T = {};
    function mat(c, r, m) { return new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m }); }
    T.H = mat(0x808c90, 0.86, 0.08);            /* hull topsides, sampled off the broadside   */
    T.F = mat(0x6a2c26, 0.90, 0.05);            /* red anti-fouling under the boot line       */
    T.S = mat(0xa0aeaf, 0.87, 0.07);            /* superstructure, the lighter grey           */
    T.D = mat(0x717b80, 0.94, 0.04);            /* decks and the flat pad                      */
    T.M = mat(0x4c555a, 0.55, 0.40);            /* fittings, masts, rails                      */
    T.K = mat(0x1d242c, 0.80, 0.10);            /* the black pylon, barrels                    */
    T.W = mat(0xc4c9ca, 0.70, 0.04);            /* radome                                      */
    T.G = new THREE.MeshStandardMaterial({ color: 0x0f1a22, roughness: 0.10, metalness: 0.0,
                                           transparent: true, opacity: 0.88 });
    T.A = mat(0x6a7176, 0.62, 0.05);            /* the dark radar faces                        */
    T.T = new THREE.MeshStandardMaterial({ color: new THREE.Color(team), roughness: 0.60, metalness: 0.10 });
    var B = {};
    Object.keys(T).forEach(function (k) { B[k] = new Bag(); });

    /* ------------------------------------------------------------- the hull */
    var si, ri, sd, x0, x1;
    function rowsAt(x) {
      var zl = tbl(ZL, x), zd = zD(x);
      return [zl, zl * 0.8, zl * 0.55, zl * 0.25, 0, zd * 0.3, zd * 0.65, zd];
    }
    function pt(x, z, s) {
      var xs = stemX(z);
      if (x >= xs) return [xs, 0, z];
      return [x, s * halfB(x, z), z];
    }
    for (si = 0; si < STA.length - 1; si++) {
      x0 = STA[si]; x1 = STA[si + 1];
      var r0 = rowsAt(x0), r1 = rowsAt(x1);
      for (ri = 0; ri < 7; ri++) {
        var bag = ri < 4 ? B.F : B.H;
        for (sd = -1; sd <= 1; sd += 2) {
          var ref = [(x0 + x1) / 2 - 2.5, 0, (r0[ri] + r1[ri]) / 2 * 0.5];
          var q0 = pt(x0, r0[ri], sd), q1 = pt(x1, r1[ri], sd), q2 = pt(x1, r1[ri + 1], sd), q3 = pt(x0, r0[ri + 1], sd);
          bag.side(q0, q1, q2, sd); bag.side(q0, q2, q3, sd);
        }
      }
      /* the deck strip, one flat level aft */
      var za = zD(x0), zb = zD(x1);
      B.D.quad(pt(x0, za, -1), pt(x1, zb, -1), pt(x1, zb, 1), pt(x0, za, 1), [(x0 + x1) / 2, 0, za - 2]);
    }
    /* the transom */
    var rt = rowsAt(XT);
    for (ri = 0; ri < 7; ri++) {
      (ri < 4 ? B.F : B.H).quad(pt(XT, rt[ri], -1), pt(XT, rt[ri + 1], -1), pt(XT, rt[ri + 1], 1),
                                pt(XT, rt[ri], 1), [-30, 0, 0]);
    }
    /* -------------------------------------------------------- deck houses */
    var ZB = 3.9;                                           /* bases sink into the deck */
    /* hangar block, the whole height from deck to roof, 33 m to 4 m abaft midships */
    var HGb = ring(plan6(-33, -9, -4, 5.2, 4.9), ZB), HGt = ring(plan6(-33, -9, -4, 3.7, 3.6), 11.8);
    var hgRef = solid(B.S, [HGb, HGt], true, false);
    /* the 01 deck house, with the sloped front the broadside photograph shows */
    var Lb = ring(plan6(-6, 11, 15.5, 5.2, 3.5), ZB), Lt = ring(plan6(-6, 7, 9.5, 4.3, 3.0), 8.8);
    var lRef = solid(B.S, [Lb, Lt], true, false);
    /* the bridge block */
    var Bb = ring(plan6(-4, 2, 9.2, 3.3, 2.4), 8.8), Bt = ring(plan6(-4, 1.5, 8.0, 3.0, 2.0), 13.0);
    var bRef = solid(B.S, [Bb, Bt], true, false);
    /* the mast tower: an octagonal faceted pylon */
    var Tb = ring(chamRect(-3.2, 3.6, 2.4, 0.8), 13.0), Tt = ring(chamRect(-2.2, 2.6, 1.6, 0.6), 22.0);
    var tRef = solid(B.S, [Tb, Tt], true, false);

    /* windows: a band of panes round the bridge and a row down the 01 house */
    [0, 1, 2, 3, 4].forEach(function (f) {
      var nn = f === 2 ? 4 : f === 0 || f === 4 ? 6 : 2;
      for (var k = 0; k < nn; k++)
        panel(B.G, Bb, Bt, f, f + 1, 0.06 + 0.88 * k / nn, 0.06 + 0.88 * (k + 0.82) / nn, 0.42, 0.78, 0.03, bRef);
    });
    [0, 4].forEach(function (f) {
      for (var k = 0; k < 7; k++)
        panel(B.G, Lb, Lt, f, f + 1, 0.05 + 0.5 * k / 7, 0.05 + 0.5 * (k + 0.5) / 7, 0.5, 0.72, 0.03, lRef);
    });
    /* the hangar's aft door and its frame: the tall face the Ka-27 backs into */
    panel(B.A, HGb, HGt, 5, 0, 0.10, 0.90, 0.04, 0.80, 0.04, hgRef);
    for (var dk = 1; dk < 4; dk++)
      panel(B.M, HGb, HGt, 5, 0, 0.10 + 0.8 * dk / 4 - 0.008, 0.10 + 0.8 * dk / 4 + 0.008, 0.04, 0.80, 0.055, hgRef);
    /* the radar faces on the tower: dark flat panels on the front and sides */
    [[2, 0.12, 0.88, 0.12, 0.62], [1, 0.15, 0.85, 0.15, 0.55], [3, 0.15, 0.85, 0.15, 0.55],
     [0, 0.2, 0.8, 0.2, 0.6], [4, 0.2, 0.8, 0.2, 0.6]].forEach(function (p) {
      panel(B.A, Tb, Tt, p[0], p[0] + 1, p[1], p[2], p[3], p[4], 0.05, tRef);
    });
    /* tower top: a platform, the dome, the mast and its yards */
    B.S.geo(cylZ(THREE, 1.55, 1.7, 0.5, 8, 0.2, 0, 22.0));
    B.W.geo(sphere(THREE, 1.5, 36, 20, 0.2, 0, 23.5));
    B.M.geo(strut(THREE, 0.2, 0, 24.6, 0.2, 0, 31.0, 0.12, 6, 0.07));
    [[28.2, 2.4], [30.2, 1.5]].forEach(function (yd) {
      B.M.geo(strut(THREE, 0.2, -yd[1], yd[0], 0.2, yd[1], yd[0], 0.06, 5));
      B.A.geo(box(THREE, 0.5, 0.35, 0.35, 0.2, yd[1], yd[0]));
      B.A.geo(box(THREE, 0.5, 0.35, 0.35, 0.2, -yd[1], yd[0]));
    });
    [1, -1].forEach(function (s) {
      B.M.geo(strut(THREE, -1.4, s * 1.0, 22.4, -1.9, s * 1.0, 27.2, 0.04, 4, 0.02));
      B.M.geo(strut(THREE, 1.8, s * 1.0, 22.4, 2.1, s * 1.0, 26.0, 0.04, 4, 0.02));
      /* director boxes and sensor balls on the bridge roof, the 01 roof */
      B.A.geo(box(THREE, 0.9, 0.9, 0.8, 5.8, s * 1.6, 13.4));
      B.A.geo(sphere(THREE, 0.42, 14, 9, 5.8, s * 1.6, 14.15));
      B.S.geo(box(THREE, 1.2, 0.9, 0.7, -2.5, s * 2.3, 13.35));
      B.M.geo(box(THREE, 0.7, 0.4, 1.0, 1.2, s * 2.6, 13.5));
      /* bridge wing platforms either side (broadside photographs) */
      B.S.geo(box(THREE, 2.2, 0.9, 0.18, 3.0, s * 3.6, 11.4));
      B.M.geo(box(THREE, 2.2, 0.05, 0.5, 3.0, s * 4.05, 11.75));
    });
    /* the black exhaust pylon aft of the bridge, and the mast it carries */
    solid(B.K, [ring(chamRect(-20.0, -14.4, 1.7, 0.35), 11.8), ring(chamRect(-18.9, -15.6, 0.85, 0.25), 20.8)], true, false);
    B.M.geo(strut(THREE, -17.25, 0, 20.8, -17.25, 0, 27.6, 0.1, 6, 0.06));
    [[24.6, 1.9], [26.6, 1.2]].forEach(function (yd) {
      B.M.geo(strut(THREE, -17.25, -yd[1], yd[0], -17.25, yd[1], yd[0], 0.05, 5));
      B.K.geo(box(THREE, 0.4, 0.3, 0.3, -17.25, yd[1], yd[0]));
      B.K.geo(box(THREE, 0.4, 0.3, 0.3, -17.25, -yd[1], yd[0]));
    });
    /* hangar roof: ventilation, an antenna, the team strip */
    B.S.geo(box(THREE, 1.6, 1.2, 0.5, -10.5, 1.4, 12.05));
    B.S.geo(box(THREE, 1.2, 1.0, 0.4, -12.5, -1.5, 12.0));
    B.M.geo(box(THREE, 0.6, 0.6, 0.15, -24, 1.8, 11.88));
    B.M.geo(box(THREE, 0.6, 0.6, 0.15, -29, -1.8, 11.88));
    B.M.geo(strut(THREE, -30.5, 1.8, 11.8, -30.8, 1.8, 15.6, 0.04, 4, 0.02));
    B.M.geo(strut(THREE, -30.5, -1.8, 11.8, -30.8, -1.8, 15.2, 0.04, 4, 0.02));
    B.T.geo(box(THREE, 3.6, 1.0, 0.04, -26.5, 0, 11.84));
    /* a team strip forward on the forecastle, flat on the deck */
    B.T.geo(box(THREE, 3.4, 1.0, 0.04, 40.0, 0, zD(40) + 0.02));

    /* NO Uran launchers are drawn: none of the photographs read shows a launcher
       box on the 2008 ship (the Kh-35 cells, if fitted, sit behind the inclined
       panels forward of the bridge). Reported, not guessed.                  */

    /* ----------------------------------------------------- the Kashtan, baked */
    (function () {
      var kx = 17.5, kz = zD(kx) - 0.05;
      solid(B.S, [ring(chamRect(kx - 1.35, kx + 1.35, 1.3, 0.55), kz), ring(chamRect(kx - 1.05, kx + 1.05, 1.0, 0.45), kz + 1.3)], true, false);
      /* the fire-control head and the gun module on top */
      var kz1 = kz + 1.3;
      B.M.geo(cylZ(THREE, 0.55, 0.62, 0.35, 10, kx - 0.1, 0, kz1));
      B.S.geo(box(THREE, 1.5, 1.2, 1.0, kx - 0.1, 0, kz1 + 0.85));
      B.A.geo(box(THREE, 0.18, 1.0, 1.0, kx - 0.95, 0, kz1 + 1.35));
      B.W.geo(sphere(THREE, 0.34, 8, 6, kx + 0.35, 0.2, kz1 + 1.65));
      B.A.geo(box(THREE, 0.5, 0.4, 0.4, kx - 0.35, -0.45, kz1 + 1.6));
      B.A.geo(box(THREE, 0.5, 0.4, 0.4, kx - 0.35, 0.45, kz1 + 1.6));
      /* 30 mm gun on the right, barrel cluster pointing forward */
      B.S.geo(box(THREE, 1.1, 0.7, 0.8, kx + 0.2, -0.95, kz1 + 0.8));
      B.K.geo(strut(THREE, kx + 0.7, -0.95, kz1 + 0.85, kx + 2.2, -0.95, kz1 + 0.85, 0.15, 8));
      B.M.geo(strut(THREE, kx + 0.7, -0.95, kz1 + 0.85, kx + 1.4, -0.95, kz1 + 0.85, 0.2, 8));
      /* missile pods either side of the head */
      [1.0, -1.0].forEach(function (s) {
        if (s > 0) {
          B.S.geo(box(THREE, 1.1, 0.5, 0.8, kx - 0.3, 0.95, kz1 + 0.75));
          for (var q = 0; q < 4; q++)
            B.K.geo(box(THREE, 0.05, 0.2, 0.2, kx + 0.27, 0.95 + (q % 2 - 0.5) * 0.24, kz1 + 0.75 + (q > 1 ? 0.2 : -0.2)));
        }
      });
    })();

    /* ---------------------------------------------- forecastle fittings, rails */
    function post(px, py, pz) { B.M.geo(strut(THREE, px, py, pz, px, py, pz + 1.0, 0.03, 6)); }
    function rail(pts) {
      var k, carry = 0;
      for (k = 0; k < pts.length - 1; k++) {
        var a = pts[k], b = pts[k + 1];
        var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        [1.0, 0.5].forEach(function (h) {
          B.M.geo(strut(THREE, a[0], a[1], a[2] + h, b[0], b[1], b[2] + h, 0.025, 6));
        });
        for (var t = carry; t < len; t += 2.0)
          post(lerp(a[0], b[0], t / len), lerp(a[1], b[1], t / len), lerp(a[2], b[2], t / len));
        carry = 2.0 - ((len - carry) % 2.0 || 2.0);
      }
    }
    [1, -1].forEach(function (s) {
      var pts = [], x;
      for (x = 21; x <= 50.0; x += 3.2) pts.push([x, s * (edgeY(x) - 0.08), zD(x)]);
      rail(pts);
      /* hawse pipes, bollards, deck vents */
      B.K.geo(cylZ(THREE, 0.28, 0.28, 0.12, 10, 42.0, s * 1.45, zD(42.0) + 0.0));
      [[23, 0], [31, 0], [47, 0]].forEach(function (b) {
        var bx = b[0], by = s * (edgeY(bx) - 0.5);
        B.M.geo(cylZ(THREE, 0.14, 0.14, 0.4, 6, bx - 0.25, by, zD(bx)));
        B.M.geo(cylZ(THREE, 0.14, 0.14, 0.4, 6, bx + 0.25, by, zD(bx)));
      });
      B.S.geo(box(THREE, 0.9, 0.7, 0.9, 19.5, s * 3.3, zD(19.5) + 0.4));
    });
    /* windlass, the anchor handling, a jackstaff, the plinth of the gun */
    [1.1, -1.1].forEach(function (yy) { B.M.geo(cylZ(THREE, 0.34, 0.38, 0.5, 10, 38.0, yy, zD(38.0))); });
    B.M.geo(strut(THREE, 50.8, 0, zD(50.8), 50.7, 0, 9.0, 0.05, 5, 0.03));
    /* hull-side fittings aft: boarding and mooring doors, a flat panel only */
    [1, -1].forEach(function (s) {
      for (var dd = 0; dd < 3; dd++) {
        var dx = -27 + dd * 7.5;
        B.A.quad([dx, s * (halfB(dx, 3.2) + 0.03), 0.9], [dx + 1.4, s * (halfB(dx + 1.4, 3.2) + 0.03), 0.9],
                 [dx + 1.4, s * (halfB(dx + 1.4, 3.2) + 0.03), 3.2], [dx, s * (halfB(dx, 3.2) + 0.03), 3.2],
                 [dx, 0, 2]);
      }
    });


    /* ------------------------------------------------------ more fittings:
       rails on the roofs, rafts, scuttles, vents, the tower platform ring   */
    [1, -1].forEach(function (s) {
      /* rail round the 01 roof beside the bridge and along the hangar roof */
      rail([[-5.5, s * 4.05, 8.8], [4.5, s * 4.05, 8.8], [8.2, s * 3.25, 8.8]]);
      rail([[-33.0, s * 3.55, 11.8], [-5.0, s * 3.55, 11.8]]);
      /* life-raft canisters on the 01 roof beside the bridge */
      [-1, 0].forEach(function (rr) {
        B.W.geo(strut(THREE, -2.6 + rr * 1.9, s * 4.0, 9.35, -1.0 + rr * 1.9, s * 4.0, 9.35, 0.32, 10));
      });
      /* portholes and hull doors, forward, on the sloped sides of the house */
      for (var pk = 0; pk < 12; pk++) {
        var px = -30 + pk * 5.4, hb = halfB(px, 2.7);
        B.K.geo(strut(THREE, px, s * (hb - 0.02), 2.7, px, s * (hb + 0.05), 2.7, 0.14, 8));
      }
      /* forecastle: hatches, vents, ladders */
      B.S.geo(box(THREE, 1.2, 1.0, 0.35, 22.5, s * 1.8, zD(22.5) + 0.17));
      B.S.geo(box(THREE, 0.9, 0.9, 0.5, 33.5, s * 2.0, zD(33.5) + 0.25));
      B.M.geo(box(THREE, 0.7, 0.7, 0.18, 35.5, s * 1.4, zD(35.5) + 0.09));
      [24.5, 26.0, 31.0, 32.5].forEach(function (vx) {
        B.M.geo(cylZ(THREE, 0.18, 0.2, 0.55, 8, vx, s * 2.6, zD(vx)));
      });
      /* chocks along the deck edge forward and aft */
      for (var ck = 0; ck < 9; ck++) {
        var cx2 = -48 + ck * 5.2;
        B.M.geo(box(THREE, 0.5, 0.2, 0.18, cx2, s * (edgeY(cx2) - 0.1), zD(cx2) + 0.09));
      }
      /* sensor posts and bridge-wing rails */
      B.M.geo(strut(THREE, 3.0, s * 4.05, 11.4, 5.2, s * 4.05, 11.4, 0.025, 4));
      B.M.geo(strut(THREE, 5.2, s * 4.05, 11.4, 5.2, s * 3.6, 11.4, 0.025, 4));
    });
    /* tower platform rail and a ladder up the pylon */
    (function () {
      var pr = chamRect(-1.55, 1.95, 1.65, 0.55).map(function (q) { return [q[0], q[1], 22.55]; });
      rail(pr.concat([pr[0]]));
      for (var lk = 0; lk < 8; lk++)
        B.M.geo(strut(THREE, -17.2, -0.9, 12.3 + lk * 1.0, -17.2, 0.9, 12.3 + lk * 1.0, 0.025, 4));
    })();
    /* aft equipment boxes on the hangar's aft top edge, hatches on the pad
       edge are NOT drawn - the pad stays clean */
    B.S.geo(box(THREE, 2.0, 1.6, 0.9, -31.5, 0.0, 12.25));

    /* ----------------------------------------------------------- the gun */
    var GX = 28.0, GZ = zD(GX) + 0.35;
    solid(B.D, [ring(chamRect(GX - 3.0, GX + 3.0, 2.1, 0.8), GZ - 0.4), ring(chamRect(GX - 2.7, GX + 2.7, 1.9, 0.7), GZ)], true, false);
    var tur = new THREE.Group();
    tur.name = "turret";
    tur.position.set(GX, 0, GZ);
    var tS = new Bag(), tM = new Bag(), tK = new Bag();
    solid(tS, [ring(chamRect(-1.9, 1.8, 1.55, 0.7), 0), ring(chamRect(-1.5, 1.4, 1.1, 0.55), 1.55)], true, false);
    tS.geo(box(THREE, 0.8, 0.6, 0.1, -0.6, 0.0, 1.6));
    tS.geo(box(THREE, 0.9, 0.5, 0.3, -0.9, 0.7, 1.7));
    tM.geo(box(THREE, 0.5, 1.1, 0.8, 1.75, 0, 0.85));
    tM.geo(strut(THREE, 1.9, 0, 0.85, 3.6, 0, 0.85, 0.2, 16));
    tK.geo(strut(THREE, 3.4, 0, 0.85, 6.8, 0, 0.85, 0.13, 16));
    tK.geo(strut(THREE, 6.2, 0, 0.85, 6.8, 0, 0.85, 0.18, 16));
    [[tS, T.S], [tM, T.M], [tK, T.K]].forEach(function (pr) {
      var mm = pr[0].mesh(THREE, pr[1]);
      if (mm) tur.add(mm);
    });
    root.add(tur);

    Object.keys(B).forEach(function (k) {
      var mm = B[k].mesh(THREE, T[k]);
      if (mm) root.add(mm);
    });
    root.userData.heroLen = LOA;
    return root;
  }

  return { build: build, len: LOA };
})();

/* pact_e00_corvette is the def itself (eras.js); len is the X extent. */
UNIT_MODELS["pact_e00_corvette"] = {
  len: 104.5,
  build: function (THREE, M, C) { return HeroSteregushchiy.build(THREE, M, C); }
};
