/* ================= harrier2_family.js  -  HERO MODEL =================
   The second-generation Harrier: McDonnell Douglas / BAe AV-8B Harrier II
   and its British cousins. Five rows draw it, each its own variant:
       nato_e80_stovl    AV-8B Harrier II (USMC, 1985)        two-tone grey
       nato_e90_stovl    AV-8B Harrier II Plus (radar nose)   low-visibility grey
       gbr_e80_cas       Harrier GR.5 (RAF)                   dark green / grey
       gbr_e90_cas       Harrier GR7                          dark green / grey
       gbr_e00_cfighter  Harrier GR9                          overall grey
   NOT drawn here, because they are a different, first-generation airframe
   (smaller wing, no LERX, narrow fuselage): the GR.1/GR.3, AV-8A and Sea
   Harrier FRS.1/FA2. Those rows keep whatever model they have.

   Model space: +X nose, +Y left (port), +Z up, metres. Heights below are
   written above the ground and the tyres stand on h = 0 (z = ZG).

   References (Wikimedia Commons, all small downloads):
     "McDonnell Douglas AV-8B Harrier II 3-view line drawing.png" (574 x 385)
       - the planform, side view and front view were read off it by a pixel
       scan, scaled so the 9.25 m span is the wingtip-to-tip of the top
       view (20.6 px per metre; the nose-to-tail length then reads 13.7 m
       without the pitot against the published 14.12 m, so lengths are
       taken from the published figure and the planform in proportion):
         wing LE swept 36 deg, root at 5.5 m aft of the radome tip to the tip
         at 8.3 m, TE nearly straight 9.4 m to 8.95 m, anhedral 12 deg (the
         front view drops 22 px over 94 px), half-span 4.62 m;
         tailplane span 4.2 m, tip 13.1-13.65 m aft, root LE 11.7 m;
         fin top 3.55 m (the published 11 ft 8 in), canopy top about 2.2 m;
         bicycle main gear at 6.1-6.3 m, nose gear at 3.0 m, wing outriggers
         at about 3.3 m out.
     "Hawker Siddeley AV-8A Harrier and McDonnell Douglas AV-8B Harrier II
       top-view silhouettes.png" - the AV-8B's blade-like long pointed nose
       reads about 1 m longer than the 3-view's, which is how the Plus's
       radome is set (+0.43 m; see risks).
     Photographs: "British Aerospace Harrier GR5, UK - Air Force
       AN1703397.jpg", "British Aerospace Harrier GR7, UK - Air Force
       AN0320183.jpg", "Harrier gr9 zg502 threequarter arp.jpg" (paint, the
       smooth rounded nose of GR5 and GR7, the twin nose wheels and twin
       main wheels, the gun pods under the belly), and the GR9's small
       rounded hump on top of the nose ahead of the windscreen, which the
       GR5 and GR7 photographs do not show. The USMC two-tone grey is the
       period scheme; the Plus pair in "VMA-231 - Ace of Spades - 2 AV-8B+
       Harrier II" are in the darker all-over low-visibility grey.
   Published figures: span 9.25 m, length 14.12 m (Plus: 14.55 m), height
     3.55 m.

   What makes it a Harrier at RTS zoom: one wide body with the big side
   intakes; the high, anhedral, swept wing with the missile/outrigger
   wingtips; the bicycle gear (twin nose wheels, twin main wheels on the
   centreline, a small outrigger wheel on each wing); the pegasus nozzles
   at the wing root and aft; a tall swept fin with a tailplane at the belly.
   Not drawn, because no reference here shows it: serials, roundels,
   squadron markings, the Night Attack's wide bubble canopy (the same
   canopy is drawn on every row), a pitot (it would only shrink the model).

   Merging: one mesh per material (upper skin, lower skin, team, hot, ink,
   glass, metal) and the gear one named group of three: 10 draw calls. The
   team colour is exactly C.team, as flashes on the fin and the upper wing.
   ================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroHarrier2 = (function () {
  "use strict";

  var V = null;
  var XN = 7.10, ZG = -1.70;
  function X(s) { return XN - s; }
  function Z(h) { return h + ZG; }

  var VARS = {
    A:  { id: "A",  plus: false, flir: false, gun: true,  up: 0x6f787d, lo: 0x8d9498, len: 14.12 },
    P:  { id: "P",  plus: true,  flir: true,  gun: true,  up: 0x5d656a, lo: 0x687074, len: 14.55 },
    G5: { id: "G5", plus: false, gun: false, flir: false, up: 0x4c5744, lo: 0x586152, len: 14.12 },
    G7: { id: "G7", plus: false, gun: false, flir: true, up: 0x485342, lo: 0x535c4e, len: 14.12 },
    G9: { id: "G9", plus: false, gun: false, flir: true,  up: 0x737c82, lo: 0x808a8f, len: 14.12 }
  };

  /* fuselage stations: [s aft of the radome tip, half-width, bottom h, top h] */
  var NOSE = [[0.00, 0.03, 1.00, 1.05], [0.50, 0.24, 0.88, 1.30], [1.20, 0.42, 0.80, 1.58], [2.00, 0.53, 0.76, 1.74]];
  var NOSE_PLUS = [[-0.43, 0.03, 1.04, 1.10], [0.00, 0.17, 0.96, 1.22], [0.60, 0.33, 0.88, 1.40], [1.30, 0.46, 0.80, 1.62], [2.00, 0.54, 0.76, 1.76]];
  var BODY = [[3.00, 0.62, 0.72, 1.82], [3.45, 0.93, 0.66, 1.86], [4.50, 1.02, 0.62, 1.92], [6.00, 0.97, 0.62, 1.94],
              [7.00, 0.76, 0.62, 1.94], [8.50, 0.60, 0.68, 1.84], [10.00, 0.45, 0.80, 1.68], [11.50, 0.34, 0.96, 1.58],
              [13.00, 0.25, 1.18, 1.52], [14.12, 0.15, 1.30, 1.46]];

  function cr1(p0, p1, p2, p3, t) {
    var t2 = t * t, t3 = t2 * t;
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
  }
  function resample(tab, n) {
    var m = tab.length, cols = tab[0].length, out = [], i, c;
    for (i = 0; i < n; i++) {
      var u = i / (n - 1) * (m - 1), k = Math.min(m - 2, Math.floor(u)), t = u - k, row = [];
      for (c = 0; c < cols; c++) row.push(cr1(tab[Math.max(0, k - 1)][c], tab[k][c], tab[k + 1][c], tab[Math.min(m - 1, k + 2)][c], t));
      out.push(row);
    }
    return out;
  }
  function lerpTab(p, k) {
    var i;
    if (k <= p[0][0]) return p[0][1];
    for (i = 1; i < p.length; i++) if (k <= p[i][0]) return p[i - 1][1] + (k - p[i - 1][0]) * (p[i][1] - p[i - 1][1]) / (p[i][0] - p[i - 1][0]);
    return p[p.length - 1][1];
  }

  /* rings of equal length bridged with quads, optional fan caps */
  function bridge(rings, capA, capB) {
    var nr = rings.length, N = rings[0].length, pos = [], idx = [], i, j;
    for (i = 0; i < nr; i++) for (j = 0; j < N; j++) pos.push(rings[i][j][0], rings[i][j][1], rings[i][j][2]);
    for (i = 0; i < nr - 1; i++) for (j = 0; j < N; j++) {
      var a = i * N + j, b = i * N + (j + 1) % N, c = a + N, d = b + N;
      idx.push(a, c, b, b, c, d);
    }
    function cap(r, first) {
      var cx = 0, cy = 0, cz = 0, base = pos.length / 3, k;
      for (k = 0; k < N; k++) { cx += r[k][0]; cy += r[k][1]; cz += r[k][2]; }
      pos.push(cx / N, cy / N, cz / N);
      for (k = 0; k < N; k++) pos.push(r[k][0], r[k][1], r[k][2]);
      for (k = 0; k < N; k++) {
        var p = base + 1 + k, q = base + 1 + (k + 1) % N;
        if (first) idx.push(base, p, q); else idx.push(base, q, p);
      }
    }
    if (capA) cap(rings[0], true);
    if (capB) cap(rings[nr - 1], false);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* wound outward: positive signed volume */
  function orient(g) {
    var p = g.attributes.position.array, ix = g.index.array, v = 0, t;
    for (t = 0; t < ix.length; t += 3) {
      var a = ix[t] * 3, b = ix[t + 1] * 3, c = ix[t + 2] * 3;
      v += p[a] * (p[b + 1] * p[c + 2] - p[b + 2] * p[c + 1])
         - p[a + 1] * (p[b] * p[c + 2] - p[b + 2] * p[c])
         + p[a + 2] * (p[b] * p[c + 1] - p[b + 1] * p[c]);
    }
    if (v < 0) {
      for (t = 0; t < ix.length; t += 3) { var s = ix[t + 1]; ix[t + 1] = ix[t + 2]; ix[t + 2] = s; }
      g.computeVertexNormals();
    }
    return g;
  }
  function yt(f, tc) {
    return tc * (1.4845 * Math.sqrt(f) - 0.6300 * f - 1.7580 * f * f + 1.4215 * f * f * f - 0.5075 * f * f * f * f);
  }
  /* aerofoil ring across the chord at span station y (wing, tailplane) */
  function foil(sLE, sTE, y, zm, tc, m, grow) {
    var p = [], i, f, chord = sTE - sLE, g = grow || 0, pad = g ? 0.02 : 0;
    var xl = X(sLE) + g, c = chord + 2 * g;
    for (i = 0; i <= m; i++) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push([xl - f * c, y, zm + yt(f, tc) * c + (i === 0 ? 0.004 : 0) + pad]);
    }
    for (i = m - 1; i >= 1; i--) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push([xl - f * c, y, zm - yt(f, tc) * c - pad]);
    }
    return p;
  }
  /* aerofoil ring in a horizontal plane at height h (the fin) */
  function foilH(sLE, sTE, h, tc, m, grow) {
    var p = [], i, f, chord = sTE - sLE, g = grow || 0, c = chord + 2 * g, xl = X(sLE) + g, th;
    for (i = 0; i <= m; i++) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      th = yt(f, tc) * c + (g ? 0.02 : 0);
      p.push([xl - f * c, th, Z(h)]);
    }
    for (i = m - 1; i >= 1; i--) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      th = yt(f, tc) * c + (g ? 0.02 : 0);
      p.push([xl - f * c, -th, Z(h)]);
    }
    return p;
  }
  function mirrorRings(rings) {
    return rings.map(function (r) { return r.map(function (q) { return [q[0], -q[1], q[2]]; }); });
  }
  function rrect(x, hw, zb, zt, n, e) {
    var p = [], i, a, c, s, cz = (zb + zt) / 2, hh = (zt - zb) / 2;
    for (i = 0; i < n; i++) {
      a = i / n * Math.PI * 2; c = Math.cos(a); s = Math.sin(a);
      p.push([x, hw * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e), Z(cz + hh * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), e))]);
    }
    return p;
  }

  var _m4 = null, _q = null, _v = null, _u = null;
  function boxG(sx, sy, sz, x, y, z) {
    var g = new V.BoxGeometry(sx, sy, sz);
    g.translate(x, y, z);
    return g;
  }
  function ellG(rx, ry, rz, x, y, z) {
    var g = new V.SphereGeometry(1, 16, 10);
    g.scale(rx, ry, rz);
    g.translate(x, y, z);
    return g;
  }
  function rod(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r, r, L, seg || 8);
    _q.setFromUnitVectors(_u.set(0, 1, 0), _v.set(dx / L, dy / L, dz / L));
    _m4.makeRotationFromQuaternion(_q);
    _m4.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(_m4);
    return g;
  }
  function wheelG(r, w, x, y, z, seg) {
    var g = new V.CylinderGeometry(r, r, w, seg || 18);
    g.translate(x, y, z);
    return g;
  }
  /* a cylinder lying along X */
  function tubeX(r0, r1, len, x, y, z, seg) {
    var g = new V.CylinderGeometry(r1, r0, len, seg || 14);   /* top = +Y -> turn to +X */
    g.rotateZ(-Math.PI / 2);
    g.translate(x, y, z);
    return g;
  }

  /* ================================================================ parts */
  function addBody(K, v) {
    var tab = (v.plus ? NOSE_PLUS : NOSE).concat(BODY), sec = resample(tab, 62), rings = [], i;
    for (i = 0; i < sec.length; i++) rings.push(rrect(X(sec[i][0]), sec[i][1], sec[i][2], sec[i][3], 28, 0.72));
    K.skinU.push(orient(bridge(rings, true, true)));

    /* canopy: a bubble on the spine, and the sloping windscreen in front */
    var cn = ellG(1.05, 0.34, 0.52, X(2.65), 0, Z(1.74));
    K.glass.push(cn);
    /* intake mouths: dark ellipses on the step where the body widens */
    for (var sd = -1; sd <= 1; sd += 2) {
      var d = new V.CylinderGeometry(0.40, 0.40, 0.05, 20);
      d.rotateZ(Math.PI / 2);
      d.scale(1, 1, 0.78);
      d.translate(X(3.30), sd * 0.80, Z(1.28));
      K.ink.push(d);
    }
    /* the FLIR hump on the nose top, ahead of the windscreen: Night Attack Plus, GR7, GR9 */
    if (v.flir) K.skinU.push(ellG(0.22, 0.15, 0.10, X(1.00), 0, Z(1.52)));
    /* USMC rows: the GAU-12 gun pod and its ammunition pod under the belly.
       RAF rows: the ADEN 25 was never fitted in service (references), so the
       same stations carry only the flat lift-improvement strakes. */
    for (sd = -1; sd <= 1; sd += 2) {
      if (v.gun) K.skinL.push(ellG(1.55, 0.17, 0.17, X(5.00), sd * 0.52, Z(0.52)));
      else K.skinL.push(boxG(1.30, 0.03, 0.22, X(5.00), sd * 0.52, Z(0.52)));
    }
    /* nozzles: front pair at the wing root, rear pair on the aft body */
    for (sd = -1; sd <= 1; sd += 2) {
      K.hot.push(tubeX(0.28, 0.24, 0.90, X(5.55), sd * 1.02, Z(1.02), 14));
      K.hot.push(tubeX(0.21, 0.17, 0.62, X(9.25), sd * 0.62, Z(1.12), 12));
    }
  }

  var LE = [[0.60, 5.45], [4.62, 8.30]], TE = [[0.60, 9.40], [4.62, 8.95]];
  var SEMI = 4.62;
  function wz(y) { return 1.55 - 0.213 * (y - 0.60); }
  function wingRings() {
    var ys = [0.60, 1.20, 2.20, 3.30, 4.10, 4.62], r = [], i, y, t;
    for (i = 0; i < ys.length; i++) {
      y = ys[i]; t = (y - 0.60) / (SEMI - 0.60);
      r.push(foil(lerpTab(LE, y), lerpTab(TE, y), y, Z(wz(y)), 0.108 - 0.040 * t, 11, 0));
    }
    return r;
  }
  function addWings(K, v) {
    var r = wingRings();
    K.skinU.push(orient(bridge(r, true, true)));
    K.skinU.push(orient(bridge(mirrorRings(r), true, true)));
    /* tailplane: thin, low on the aft body, tips 2.1 m out */
    var ys = [0.30, 1.20, 2.12], tl = [[0.30, 11.55], [2.12, 13.10]], tt = [[0.30, 13.45], [2.12, 13.65]], tr = [], i;
    for (i = 0; i < ys.length; i++) tr.push(foil(lerpTab(tl, ys[i]), lerpTab(tt, ys[i]), ys[i], Z(1.34 - 0.08 * ys[i]), 0.055, 7, 0));
    K.skinU.push(orient(bridge(tr, true, true)));
    K.skinU.push(orient(bridge(mirrorRings(tr), true, true)));
  }
  var FLE = [[1.50, 10.60], [3.55, 12.75]], FTE = [[1.50, 13.62], [3.55, 13.70]];
  function addFin(K, v) {
    var hs = [1.50, 2.20, 2.90, 3.55], r = [], i;
    for (i = 0; i < hs.length; i++) r.push(foilH(lerpTab(FLE, hs[i]), lerpTab(FTE, hs[i]), hs[i], 0.058 - 0.014 * (hs[i] - 1.5) / 2.05, 8, 0));
    K.skinU.push(orient(bridge(r, true, true)));
  }
  /* team colour: a flash up the fin and a panel on each upper outer wing */
  function addFlash(K, v) {
    var r = [], i, hs = [3.15, 3.35, 3.52], sd;
    for (i = 0; i < hs.length; i++) r.push(foilH(lerpTab(FLE, hs[i]), lerpTab(FTE, hs[i]), hs[i], 0.058 - 0.014 * (hs[i] - 1.5) / 2.05, 8, 0.02));
    K.team.push(orient(bridge(r, true, true)));
    var ys = [3.95, 4.55];
    r = [];
    for (i = 0; i < ys.length; i++) r.push(foil(lerpTab(LE, ys[i]), lerpTab(TE, ys[i]), ys[i], Z(wz(ys[i])), (0.108 - 0.040 * (ys[i] - 0.6) / 4.02) * 1.0, 9, 0.02));
    K.team.push(orient(bridge(r, true, true)));
    K.team.push(orient(bridge(mirrorRings(r), true, true)));
  }

  /* gear: twin nose wheels, twin main wheels on the centreline, an outrigger
     under each wing. The tyres are the lowest solid thing on the aeroplane. */
  function addGear(G, v) {
    var sd, ns = 3.00, ms = 6.20, os = 8.30, k;
    G.metal.push(rod([X(ns - 0.05), 0, Z(0.72)], [X(ns), 0, Z(0.25)], 0.05, 8));
    for (sd = -1; sd <= 1; sd += 2) {
      G.tyre.push(wheelG(0.24, 0.10, X(ns), sd * 0.13, Z(0.24), 16));
      G.metal.push(wheelG(0.12, 0.12, X(ns), sd * 0.13, Z(0.24), 10));
    }
    G.skin.push(boxG(0.8, 0.03, 0.32, X(ns + 0.15), 0.25, Z(0.60)));
    G.skin.push(boxG(0.8, 0.03, 0.32, X(ns + 0.15), -0.25, Z(0.60)));
    G.metal.push(rod([X(ms - 0.10), 0, Z(0.66)], [X(ms), 0, Z(0.36)], 0.075, 8));
    G.metal.push(rod([X(ms + 0.50), 0, Z(0.68)], [X(ms), 0, Z(0.40)], 0.04, 6));
    for (sd = -1; sd <= 1; sd += 2) {
      G.tyre.push(wheelG(0.36, 0.17, X(ms), sd * 0.13, Z(0.36), 20));
      G.metal.push(wheelG(0.19, 0.19, X(ms), sd * 0.13, Z(0.36), 12));
      /* outrigger: a short leg from the underside of the wing to a small wheel */
      var oy = 3.30, wh = wz(oy) - 0.20;
      G.metal.push(rod([X(os), sd * oy, Z(wh)], [X(os), sd * oy, Z(0.22)], 0.04, 6));
      G.tyre.push(wheelG(0.10, 0.06, X(os), sd * oy, Z(0.22), 10));
    }
  }

  /* ============================================================== build == */
  function merge(list) {
    var pos = [], nor = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = list[i].index ? list[i].toNonIndexed() : list[i];
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(new Float32Array(pos.length / 3 * 2), 2));
    return out;
  }
  /* the upper and lower paint meet along the chines: a triangle whose face
     points down takes the lower colour */
  function splitSkin(list, K) {
    var up = [], lo = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = list[i].index ? list[i].toNonIndexed() : list[i];
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      for (j = 0; j < p.length; j += 9) {
        var nz = (n[j + 2] + n[j + 5] + n[j + 8]) / 3;
        var tgt = nz < -0.30 ? lo : up;
        for (var k = 0; k < 9; k++) tgt.push([p[j + k], n[j + k]]);
      }
    }
    function mk(a) {
      var pos = [], nor = [], q;
      for (q = 0; q < a.length; q++) { pos.push(a[q][0]); nor.push(a[q][1]); }
      var o = new V.BufferGeometry();
      o.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
      o.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
      o.setAttribute("uv", new V.Float32BufferAttribute(new Float32Array(pos.length / 3 * 2), 2));
      return o;
    }
    return { up: mk(up), lo: mk(lo) };
  }

  function build(THREE, M, C, which) {
    V = THREE;
    var v = VARS[which];
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    var K = { skinU: [], skinL: [], team: [], hot: [], ink: [], glass: [] };
    var G = { skin: [], metal: [], tyre: [] };
    addBody(K, v);
    addWings(K, v);
    addFin(K, v);
    addFlash(K, v);
    addGear(G, v);

    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    function std(col, r, m, extra) {
      var o = { color: col, roughness: r, metalness: m };
      if (extra) for (var k in extra) o[k] = extra[k];
      return new V.MeshStandardMaterial(o);
    }
    var mU = std(v.up, 0.86, 0.06, { side: V.DoubleSide });
    var mL = std(v.lo, 0.86, 0.06, { side: V.DoubleSide });
    var mT = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    var mH = std(0x3d3f41, 0.58, 0.45, { side: V.DoubleSide });
    var mI = std(0x060708, 0.95, 0.03, { side: V.DoubleSide });
    var mG = std(0x27343d, 0.10, 0.50, { transparent: true, opacity: 0.80, side: V.DoubleSide });
    var mM = std(0x5d6468, 0.48, 0.60);
    var mY = std(0x131414, 0.95, 0.02);

    var root = new V.Group(), sk = splitSkin(K.skinU.concat(K.skinL), K);
    root.add(new V.Mesh(sk.up, mU));
    var lo = sk.lo; root.add(new V.Mesh(lo, mL));
    root.add(new V.Mesh(merge(K.team), mT));
    root.add(new V.Mesh(merge(K.hot), mH));
    root.add(new V.Mesh(merge(K.ink), mI));
    root.add(new V.Mesh(merge(K.glass), mG));
    var gear = new V.Group();
    gear.name = "gear";
    gear.add(new V.Mesh(merge(G.skin), mU));
    gear.add(new V.Mesh(merge(G.metal), mM));
    gear.add(new V.Mesh(merge(G.tyre), mY));
    root.add(gear);
    return root;
  }

  return { build: build, VARS: VARS };
})();

/* len is the measured X extent: radome tip to the aft end of the body */
UNIT_MODELS["nato_e80_stovl"]   = { len: 14.12, build: function (T, M, C) { return HeroHarrier2.build(T, M, C, "A"); } };
UNIT_MODELS["nato_e90_stovl"]   = { len: 14.55, build: function (T, M, C) { return HeroHarrier2.build(T, M, C, "P"); } };
UNIT_MODELS["gbr_e80_cas"]      = { len: 14.12, build: function (T, M, C) { return HeroHarrier2.build(T, M, C, "G5"); } };
UNIT_MODELS["gbr_e90_cas"]      = { len: 14.12, build: function (T, M, C) { return HeroHarrier2.build(T, M, C, "G7"); } };
UNIT_MODELS["gbr_e00_cfighter"] = { len: 14.12, build: function (T, M, C) { return HeroHarrier2.build(T, M, C, "G9"); } };
