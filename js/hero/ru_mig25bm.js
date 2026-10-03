/* ============================================================================
   ru_mig25bm.js  --  HERO model: MiG-25BM "Foxbat-F" (pact_e80_sead)
   ----------------------------------------------------------------------------
   The defence-suppression Foxbat: the MiG-25 airframe with the reconnaissance-
   family nose and four Kh-58 anti-radiation missiles on wing pylons.

   What each feature rests on (Wikimedia Commons, fetched small, July 2026):
     * "Mikoyan-Gurevich MiG-25BM top-view silhouette" (Foxbat-F top view):
       the long pointed nose with a probe, the cropped-delta wing with outboard
       sweep, FOUR missiles under the wings (two a side, nose just ahead of the
       leading edge), twin tails, tailplanes aft of the wing.
     * "Mikoyan-Gurevich MiG-25P three-view silhouette": side and head-on
       proportions - fins canted outward, intakes beside the fuselage, wing
       mounted high with anhedral, ventral fins, tailplanes low on the nacelles.
     * NMUSAF MiG-25RB photographs (LNose, LSideFront, RRear): the faceted
       pointed nose with a flat camera window panel on the side (not the
       interceptor radome), long pitot boom, big rectangular intakes, nose
       leg forward / one wide wheel per main leg under the intake ducts, natural metal
       fins and tail with a plain grey painted nose, the large R-15 nozzles and
       the tall ventral fin.
   Dimensions: overall length 23.8 m with the boom (air_specs.js), span 14.0 m,
   height about 6.1 m, track about 3.85 m (published MiG-25 figures).
   Paint: natural-metal light grey airframe, grey nose, as the photographs show
   (no camouflage is drawn). Marking: the Soviet star on the fins only; no bort
   numbers. Not confirmed from photographs: star positions on the fuselage and
   wings - left off rather than guessed. Four Kh-58 are drawn as the row and
   the BM silhouette show (the row's "ammo" counts two salvos).
   Only pact_e80_sead uses this key.
   Model space: +X nose, +Y port, +Z up, metres; origin on the fuselage axis.
   ========================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMiG25BM = (function () {
  "use strict";

  var D2R = Math.PI / 180;
  var GROUND = -2.55;       /* underside of the tyres; ~6.1 m to the fin tips */

  /* ---------- geometry kit: everything is a ring loft in world space ------ */
  function vol(pos, idx) {
    var v = 0;
    for (var i = 0; i < idx.length; i += 3) {
      var a = idx[i] * 3, b = idx[i + 1] * 3, c = idx[i + 2] * 3;
      v += pos[a] * (pos[b + 1] * pos[c + 2] - pos[b + 2] * pos[c + 1])
         - pos[a + 1] * (pos[b] * pos[c + 2] - pos[b + 2] * pos[c])
         + pos[a + 2] * (pos[b] * pos[c + 1] - pos[b + 1] * pos[c]);
    }
    return v;
  }
  /* rings: array of arrays of [x,y,z], all with the same point count. */
  function loft(rings, capA, capB) {
    var n = rings[0].length, pos = [], idx = [], r, i;
    for (r = 0; r < rings.length; r++)
      for (i = 0; i < n; i++) pos.push(rings[r][i][0], rings[r][i][1], rings[r][i][2]);
    for (r = 0; r < rings.length - 1; r++)
      for (i = 0; i < n; i++) {
        var a = r * n + i, b = r * n + (i + 1) % n, c = (r + 1) * n + i, d = (r + 1) * n + (i + 1) % n;
        idx.push(a, b, c, b, d, c);
      }
    function cap(ring, base, flip) {
      var cx = 0, cy = 0, cz = 0, k, ci = pos.length / 3;
      for (k = 0; k < n; k++) { cx += ring[k][0]; cy += ring[k][1]; cz += ring[k][2]; }
      pos.push(cx / n, cy / n, cz / n);
      for (k = 0; k < n; k++) {
        if (flip) idx.push(ci, base + (k + 1) % n, base + k);
        else idx.push(ci, base + k, base + (k + 1) % n);
      }
    }
    if (capA !== false) cap(rings[0], 0, false);
    if (capB !== false) cap(rings[rings.length - 1], (rings.length - 1) * n, true);
    if (vol(pos, idx) < 0) for (i = 0; i < idx.length; i += 3) { var t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; }
    return { pos: pos, idx: idx };
  }
  /* superellipse section: stations [x, cy, cz, hw, hh, n] */
  function sup(st, N) {
    var ring = [], k;
    for (k = 0; k < N; k++) {
      var a = k / N * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
      var e = 2 / st[5];
      ring.push([st[0], st[1] + st[3] * Math.sign(c) * Math.pow(Math.abs(c), e),
                 st[2] + st[4] * Math.sign(s) * Math.pow(Math.abs(s), e)]);
    }
    return ring;
  }
  function superLoft(sts, N, capA, capB) {
    var rings = [];
    for (var i = 0; i < sts.length; i++) rings.push(sup(sts[i], N));
    return loft(rings, capA, capB);
  }
  /* lifting surface from a root and a tip section; section = [x(LE), y, z, chord, thick] */
  function foil(s0, s1) {
    function sec(s) {
      var x = s[0], y = s[1], z = s[2], c = s[3], t = s[4];
      return [[x, y, z], [x - c * 0.35, y, z + t / 2], [x - c * 0.8, y, z + t * 0.25],
              [x - c, y, z], [x - c * 0.8, y, z - t * 0.25], [x - c * 0.35, y, z - t / 2]];
    }
    return loft([sec(s0), sec(s1)]);
  }
  /* mirror across y=0 */
  function mirror(g) {
    var p = g.pos.slice(), ix = g.idx.slice(), i;
    for (i = 1; i < p.length; i += 3) p[i] = -p[i];
    for (i = 0; i < ix.length; i += 3) { var t = ix[i + 1]; ix[i + 1] = ix[i + 2]; ix[i + 2] = t; }
    return { pos: p, idx: ix };
  }
  /* flat polygon (star, panel) given as 3D points, fan from the first centroid */
  function poly(pts) {
    var pos = [], idx = [], cx = 0, cy = 0, cz = 0, i, n = pts.length;
    for (i = 0; i < n; i++) { pos.push(pts[i][0], pts[i][1], pts[i][2]); cx += pts[i][0]; cy += pts[i][1]; cz += pts[i][2]; }
    pos.push(cx / n, cy / n, cz / n);
    for (i = 0; i < n; i++) idx.push(n, i, (i + 1) % n);
    return { pos: pos, idx: idx };
  }
  function toGeo(THREE, list) {
    var pos = [], idx = [], off = 0, i, j;
    for (i = 0; i < list.length; i++) {
      var g = list[i];
      for (j = 0; j < g.pos.length; j++) pos.push(g.pos[j]);
      for (j = 0; j < g.idx.length; j++) idx.push(g.idx[j] + off);
      off += g.pos.length / 3;
    }
    var bg = new THREE.BufferGeometry();
    bg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    bg.setIndex(idx);
    bg.computeVertexNormals();
    return bg;
  }

  /* ------------------------------------------------------------ the model */
  function build(THREE, M, C) {
    var root = new THREE.Group();
    var sk = new THREE.MeshStandardMaterial({ color: 0xa9adb0, roughness: 0.55, metalness: 0.35, side: THREE.DoubleSide });
    var nose = new THREE.MeshStandardMaterial({ color: 0x8c9296, roughness: 0.7, metalness: 0.12, side: THREE.DoubleSide });
    var ink = new THREE.MeshStandardMaterial({ color: 0x0a0b0c, roughness: 0.95, metalness: 0.03, side: THREE.DoubleSide });
    var metal = new THREE.MeshStandardMaterial({ color: 0x474d52, roughness: 0.5, metalness: 0.55, side: THREE.DoubleSide });
    var tyre = new THREE.MeshStandardMaterial({ color: 0x0a0b0c, roughness: 0.95, metalness: 0.04 });
    var glass = new THREE.MeshPhysicalMaterial({ color: 0x27383f, roughness: 0.13, metalness: 0.3, transparent: true, opacity: 0.85, side: THREE.DoubleSide });
    var msl = new THREE.MeshStandardMaterial({ color: 0xcfd2d0, roughness: 0.6, metalness: 0.15, side: THREE.DoubleSide });
    var team = new THREE.MeshStandardMaterial({ color: new THREE.Color((C && C.team !== undefined) ? C.team : 0xd03030), roughness: 0.8, metalness: 0.05, side: THREE.DoubleSide });
    var sred = new THREE.MeshStandardMaterial({ color: 0xa8261f, roughness: 0.8, metalness: 0.02, side: THREE.DoubleSide });
    var swht = new THREE.MeshStandardMaterial({ color: 0xe2e0d8, roughness: 0.8, metalness: 0.02, side: THREE.DoubleSide });

    var B = { sk: [], nose: [], ink: [], metal: [], glass: [], msl: [], team: [], sred: [], swht: [] };
    var G = { metal: [], tyre: [] };

    /* ---- fuselage centre body, nose tip x=9.2 to tail x=-10.6.  The BM nose
       is the long faceted cone of the recon family, flattened on the sides. */
    var fus = [
      [9.2, 0, 0, 0.03, 0.03, 2],
      [8.2, 0, 0, 0.17, 0.17, 2.4],
      [7.0, 0, 0, 0.32, 0.32, 2.5],
      [5.6, 0, -0.02, 0.50, 0.46, 2.7],
      [4.2, 0, -0.02, 0.66, 0.66, 3.0],
      [2.4, 0, 0.0, 0.80, 0.80, 3.0],
      [0.0, 0, 0.0, 0.85, 0.85, 3.0],
      [-4.0, 0, 0.0, 0.85, 0.85, 3.0],
      [-8.0, 0, 0.0, 0.80, 0.78, 3.0],
      [-10.6, 0, 0.0, 0.55, 0.55, 2.6]
    ];
    var fusGeo = superLoft(fus, 64);
    /* split: grey nose cone ahead of x=5.6, natural metal behind */
    var noseGeo = superLoft(fus.slice(0, 4), 32, true, false);
    var bodyGeo = superLoft(fus.slice(3), 32, false, true);
    B.nose.push(noseGeo); B.sk.push(bodyGeo);

    /* camera/sensor window panel on each side of the nose (RB-family nose) */
    function hwAt(x) {
      for (var i = 0; i < fus.length - 1; i++) if (x <= fus[i][0] && x >= fus[i + 1][0]) {
        var t = (fus[i][0] - x) / (fus[i][0] - fus[i + 1][0]);
        return fus[i][3] + (fus[i + 1][3] - fus[i][3]) * t;
      }
      return 0.5;
    }
    [1, -1].forEach(function (s) {
      var x0 = 6.4, x1 = 4.4;
      B.ink.push(poly([[x0, s * hwAt(x0) * 1.02, 0.18], [x1, s * hwAt(x1) * 1.02, 0.24],
                       [x1, s * hwAt(x1) * 1.02, -0.2], [x0, s * hwAt(x0) * 1.02, -0.16]]));
    });

    /* pitot boom to 11.9 m (the length figure includes it) */
    B.metal.push(superLoft([[9.15, 0, 0, 0.11, 0.11, 2], [9.9, 0, 0, 0.06, 0.06, 2], [11.9, 0, 0, 0.022, 0.022, 2]], 8));

    /* canopy: flat windscreen, long hump */
    B.glass.push(superLoft([
      [5.1, 0, 0.72, 0.08, 0.05, 2], [4.5, 0, 0.78, 0.36, 0.28, 2.2],
      [3.2, 0, 0.82, 0.42, 0.32, 2.2], [2.0, 0, 0.78, 0.30, 0.22, 2.2]], 24));
    B.sk.push(superLoft([[2.0, 0, 0.78, 0.30, 0.22, 2.2], [0.8, 0, 0.7, 0.2, 0.12, 2], [0.4, 0, 0.65, 0.02, 0.02, 2]], 12));

    /* ---- intakes and engine nacelles, one side then mirrored.  Rectangular
       box at the lip, blending to the round R-15 nacelle aft. */
    function side(s) {
      var nac = [
        [1.6, 1.30, 0.0, 0.62, 0.92, 7],
        [-0.8, 1.30, 0.0, 0.62, 0.92, 7],
        [-3.4, 1.20, 0.0, 0.78, 0.92, 3.4],
        [-5.5, 1.12, 0.0, 0.88, 0.88, 2.4],
        [-9.6, 1.08, 0.0, 0.86, 0.86, 2.2]
      ];
      nac = nac.map(function (a) { return [a[0], s * a[1], a[2], a[3], a[4], a[5]]; });
      B.sk.push(superLoft(nac, 64, false, false));
      /* dark duct interior at the lip */
      var lip = nac[0].slice(); lip[0] = 1.55; lip[3] *= 0.86; lip[4] *= 0.88;
      B.ink.push(superLoft([lip, [1.1, lip[1], lip[2], lip[3], lip[4], lip[5]]], 64));
      /* nozzle: shell + dark bore */
      var ex = [
        [-9.6, s * 1.08, 0, 0.86, 0.86, 2], [-10.5, s * 1.08, 0, 0.80, 0.80, 2], [-11.9, s * 1.08, 0, 0.74, 0.74, 2]];
      B.metal.push(superLoft(ex, 64, false, false));
      B.ink.push(superLoft([[-11.9, s * 1.08, 0, 0.66, 0.66, 2], [-10.4, s * 1.08, 0, 0.60, 0.60, 2]], 64));
    }
    side(1); side(-1);
    /* blend between nacelles aft of the wing: a shallow tail deck */
    B.sk.push(superLoft([[-3.0, 0, 0.0, 1.1, 0.8, 3], [-9.5, 0, 0.0, 1.45, 0.62, 3.2], [-10.0, 0, 0.0, 1.45, 0.3, 3.2]], 64));

    /* ---- wing: cropped delta, shoulder mounted, 5 deg anhedral */
    var zr = 0.28, an = Math.tan(5 * D2R);
    function wz(y) { return zr - y * an; }
    var wing = foil([-1.7, 1.2, wz(1.2), 7.2, 0.42], [-5.7, 7.0, wz(7.0), 1.9, 0.14]);
    B.sk.push(wing); B.sk.push(mirror(wing));
    /* team strips: small panels on the upper surface, outboard */
    function strip(s) {
      var y0 = 4.8, y1 = 6.2, x0 = -5.5, x1 = -6.3;
      var q = function (y, x) { return [x, s * y, wz(y) + 0.045]; };
      return poly([q(y0, -4.15 - 0.5), q(y1, -5.0 - 0.5), q(y1, -6.4), q(y0, -5.7)]);
    }
    B.team.push(strip(1)); B.team.push(strip(-1));
    /* wing fences are not drawn; pylons + Kh-58 */
    function kh58(x, y, z) {
      var L = 4.8, r = 0.19, x0 = x + L / 2;
      var body = superLoft([[x0, y, z, 0.02, 0.02, 2], [x0 - 0.5, y, z, 0.14, 0.14, 2], [x0 - 1.1, y, z, r, r, 2],
        [x0 - 4.3, y, z, r, r, 2], [x0 - L, y, z, 0.17, 0.17, 2]], 40);
      B.msl.push(body);
      [x0 - 1.5, x0 - 4.4].forEach(function (fx, k) {
        var c = k ? 0.8 : 0.9, sp = k ? 0.48 : 0.30;
        B.msl.push(foil([fx, y - sp, z, c, 0.03], [fx, y + sp, z, c, 0.03]));
        B.msl.push(foil([fx, y, z - sp, c, 0.03], [fx, y, z + sp, c, 0.03]));
      });
      /* pylon up to the wing */
      var wy = Math.abs(y);
      B.sk.push(foil([x0 - 1.2, y, z + r, 2.4, 0.12], [x0 - 1.2, y, wz(wy) - 0.05, 2.4, 0.12]));
    }
    [2.9, 4.9].forEach(function (ay, k) {
      [1, -1].forEach(function (s) {
        var y = s * ay, lex = -1.7 - (ay - 1.2) * 0.7;
        kh58(lex - 2.0 + 0.5 + (k ? 0.0 : 0.3) - 0.0, y, wz(ay) - 0.62);
      });
    });

    /* ---- twin fins, canted 8 deg outward, on the nacelles */
    function fin(s) {
      var cant = 8 * D2R * s, yb = s * 1.35;
      var base = [-5.4, yb, 0.75, 5.0, 0.16];
      var tip = [-8.6, yb + s * Math.tan(8 * D2R) * 2.9, 3.65, 1.9, 0.08];
      return foil(base, tip);
    }
    B.sk.push(fin(1)); B.sk.push(fin(-1));
    /* red stars on the fins, both faces; flat, just off the skin */
    function star(s, face) {
      var cz = 2.0, rr = 0.46, xs = -7.2;
      var yb = s * 1.35 + s * Math.tan(8 * D2R) * (cz - 0.75), th = 0.1;
      var yy = yb + s * face * (th * 0.5 + 0.012);
      function ring(k) {
        var p = [];
        for (var i = 0; i < 10; i++) {
          var a = -Math.PI / 2 + i * Math.PI / 5, q = (i & 1) ? 0.40 : 1;
          p.push([xs + Math.cos(a) * q * rr * k * 0.9, yy, cz + Math.sin(a) * q * rr * k]);
        }
        return p;
      }
      var fl = (s * face) < 0;
      function fix(g) { if (fl) for (var i = 0; i < g.idx.length; i += 3) { var t = g.idx[i + 1]; g.idx[i + 1] = g.idx[i + 2]; g.idx[i + 2] = t; } return g; }
      B.swht.push(fix(poly(ring(1.22))));
      var r2 = ring(1.0).map(function (p) { p[1] += s * face * 0.004; return p; });
      B.sred.push(fix(poly(r2)));
    }
    [1, -1].forEach(function (s) { star(s, 1); star(s, -1); });

    /* ---- ventral fins, canted outward */
    function vent(s) {
      return foil([-6.6, s * 1.9, -0.7, 3.0, 0.10], [-8.6, s * 2.25, -1.6, 1.6, 0.06]);
    }
    B.sk.push(vent(1)); B.sk.push(vent(-1));

    /* ---- all-moving tailplanes, low on the nacelles, slight anhedral */
    function stab(s) {
      var g = foil([-8.4, s * 1.8, -0.1, 3.0, 0.18], [-10.3, s * 4.6, -0.35, 1.4, 0.08]);
      return g;
    }
    B.sk.push(stab(1)); B.sk.push(stab(-1));

    /* ---- landing gear (named "gear", lowest opaque part) */
    var gear = new THREE.Group(); gear.name = "gear";
    /* vertical strut: loft along z requires rings in x-y; build manually */
    function post(x, y, z0, z1, r) {
      var rings = [], zs = [z0, z1];
      zs.forEach(function (z) {
        var ring = [];
        for (var k = 0; k < 8; k++) { var a = k / 8 * Math.PI * 2; ring.push([x + Math.cos(a) * r, y + Math.sin(a) * r, z]); }
        rings.push(ring);
      });
      return loft(rings);
    }
    function wheel(x, y, r, w) {
      var rings = [];
      [w / 2, -w / 2].forEach(function (d) {
        var ring = [];
        for (var k = 0; k < 40; k++) { var a = k / 40 * Math.PI * 2; ring.push([x + Math.cos(a) * r, y + d, GROUND + r + Math.sin(a) * r]); }
        rings.push(ring);
      });
      var g = loft(rings), P = g.pos, I = g.idx, q, cz0 = GROUND + r;
      /* orient every face outward from the wheel centre (caps along y, tread radially) */
      for (q = 0; q < I.length; q += 3) {
        var i0 = I[q] * 3, i1 = I[q + 1] * 3, i2 = I[q + 2] * 3;
        var ux = P[i1] - P[i0], uy = P[i1 + 1] - P[i0 + 1], uz = P[i1 + 2] - P[i0 + 2];
        var vx = P[i2] - P[i0], vy = P[i2 + 1] - P[i0 + 1], vz = P[i2 + 2] - P[i0 + 2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        var cx = (P[i0] + P[i1] + P[i2]) / 3 - x, cy = (P[i0 + 1] + P[i1 + 1] + P[i2 + 1]) / 3 - y,
            cz = (P[i0 + 2] + P[i1 + 2] + P[i2 + 2]) / 3 - cz0;
        var cap = Math.abs(ny) > 0.9 * Math.sqrt(nx * nx + ny * ny + nz * nz);
        var out = cap ? ny * cy : nx * cx + nz * cz;
        if (out < 0) { var tt = I[q + 1]; I[q + 1] = I[q + 2]; I[q + 2] = tt; }
      }
      return g;
    }
    /* nose leg: twin small wheels */
    G.metal.push(post(5.2, 0, -0.5, GROUND + 0.35, 0.07));
    G.tyre.push(wheel(5.2, 0.16, 0.35, 0.16)); G.tyre.push(wheel(5.2, -0.16, 0.35, 0.16));
    /* main legs under the intake ducts, one wide wheel each */
    [1, -1].forEach(function (s) {
      G.metal.push(post(-3.4, s * 1.92, -0.4, GROUND + 0.45, 0.10));
      G.tyre.push(wheel(-3.4, s * 1.92, 0.55, 0.26));
      G.metal.push(post(-3.4, s * 1.92 - s * 0.14, -0.4, -1.4, 0.05));
    });

    /* ---- assemble: one mesh per material */
    var mats = { sk: sk, nose: nose, ink: ink, metal: metal, glass: glass, msl: msl, team: team, sred: sred, swht: swht };
    Object.keys(B).forEach(function (k) {
      if (!B[k].length) return;
      var m = new THREE.Mesh(toGeo(THREE, B[k]), mats[k]);
      m.name = k; root.add(m);
    });
    var gm = new THREE.Mesh(toGeo(THREE, G.metal), metal); gear.add(gm);
    var gt = new THREE.Mesh(toGeo(THREE, G.tyre), tyre); gear.add(gt);
    root.add(gear);
    return root;
  }

  return { build: build };
})();

UNIT_MODELS["pact_e80_sead"] = {
  len: 23.8,
  build: function (THREE, M, C) { return HeroMiG25BM.build(THREE, M, C); },
};
