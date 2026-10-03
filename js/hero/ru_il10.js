/* ============ ru_il10.js -- ILYUSHIN Il-10M SHTURMOVIK (HERO MODEL) ============

   One 1950s row flies it:
     pact_e50_cas   "Il-10M", Ilyushin Il-10M Shturmovik (1951-): the post-war
                    development of the Il-10 (first flight 2 July 1951), made
                    for the Korean War experience. The pla_e50_cas and
                    kpa_e50_cas rows are plain Il-10 rows with their own keys;
                    they are not changed here (they still resolve as before).

   WHAT EACH FEATURE RESTS ON
     - Il-10 / Il-10M data (English and Russian Wikipedia "Ilyushin Il-10" /
       "Ил-10", after Ilyushin's Proliferous Shturmovik): Il-10 length 11.06
       to 11.12 m, span 13.40 m, height 4.18 m tail up, wing area 30 m2, wing
       NACA 0018 root to 4410 tip, AM-42 V12 under a long round cowl, a
       THREE-blade AV-5L-24 propeller 3.60 m across (not four), crew of two.
       The Il-10M "slightly longer fuselage and wider span, larger control
       surfaces, a false keel (ventral fin) at the tail, a thinner wing";
       four 23 mm NR-23 cannon in the wings. No published Il-10M length or span
       was found (Russian Wikipedia gives only the Il-10 11.12 / 13.40 m), so
       the model takes a little more than those: 11.25 m long and 13.6 m
       across (estimates). air_specs.js lists 11.9 / 14.0, which no source
       supports.
     - Wikimedia Commons "Ilyushin Il-10 Beast side-view silhouette" (the
       profile: slim nose, hood over both seats with the gunner's gun pointing
       aft, tall rounded fin, tailplane low on the fuselage) and "Ilyushin
       Il-10, China Aviation Museum" (an Il-10 from ahead and the side: three
       blades, large round spinner, the long dark exhaust-stack fairing on
       each side of the cowl, wing leading edge with a gun barrel, a pale
       fairing ahead of the leg root, a long main leg with a door-plate beside
       the wheel, the whip mast ahead of the pilot, the olive-green upper
       paint). No three-view drawing of the Il-10M was reachable: plan
       dimensions are estimates from the data above.
     - Check-and-fix: the Il-10M photograph on Commons "Ilyushin Il-10M Soviet
       AF Monino 29.08.94" (a left-side view: THREE-blade propeller, olive
       upper over pale blue lower with the paint line high on the nose and
       sinking aft, the false keel under the tail, low rounded fin with a star,
       star on the rear fuselage and the upper wing, stack fairing on the
       cowl) and the Commons line drawing "Dreiseitenansicht Iljuschin IL10"
       (an Il-10 three-view: wing planform, three blades, tail, gear); fin
       height trimmed to those. The underwing items seen in the photograph are
       not clearly racks or rails, so none are drawn.
     - NOT confirmed from a photograph: the Il-10M paint scheme (the olive
       green over pale blue-grey is the Il-10 museum aircraft's upper colour
       and the usual Soviet pairing, not a labelled Il-10M picture), the
       ventral fin outline, the underwing racks (none are drawn), the exact fin shape.
   Marking: the Soviet star (red, white border) on each side of the rear
   fuselage only, as pact_hind_mi24.js draws it; no bort numbers.
   Team colour (C.team): only a small strip on the top of each wing near the tip
   (two strips in all); no spinner, no fin tip.
   The main legs and the tailwheel hang in the "gear" group, lowest of all.
   Model space +X nose, +Y port, +Z up, metres, the thrust line level.
   ================================================================== */
var HeroIl10 = (function () {
  var V = null;
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* fuselage stations: x, top z, bottom z, half width (z = 0 is the thrust line) */
  var FT = {
    x:  [4.45, 4.00, 3.30, 2.40, 1.40, 0.40, -0.60, -1.70, -2.80, -3.90, -5.00, -5.80, -6.25],
    zt: [0.48, 0.57, 0.63, 0.67, 0.70, 0.68, 0.62, 0.52, 0.43, 0.40, 0.37, 0.34, 0.32],
    zb: [-0.48, -0.57, -0.68, -0.76, -0.80, -0.80, -0.74, -0.60, -0.42, -0.22, -0.06, 0.08, 0.15],
    hw: [0.43, 0.49, 0.52, 0.54, 0.54, 0.50, 0.42, 0.34, 0.26, 0.18, 0.11, 0.06, 0.03]
  };
  var COWL = [[4.62, 0.38], [4.54, 0.45], [4.34, 0.51], [3.9, 0.55], [3.3, 0.56]];
  /* hood over both seats: x, top z, half width; base z */
  var CAN = { zb: 0.60, r: [[2.55, 0.80, 0.28], [2.30, 1.00, 0.36], [1.90, 1.12, 0.40], [1.0, 1.12, 0.40], [0.5, 1.00, 0.38],
              [0.1, 0.84, 0.30], [-0.3, 0.80, 0.30], [-0.7, 1.00, 0.36], [-1.3, 1.12, 0.36], [-1.9, 1.00, 0.30], [-2.35, 0.66, 0.20]],
              fr: [2.2, 1.5, 0.8, -1.0] };

  /* wing: half span 6.8, chord 3.0 at the root to 1.1 at the tip, thinner than the Il-10 */
  var HS = 6.8;
  function wst(y) {
    var t = clamp((y - 0.5) / (HS - 0.5), 0, 1), le = lerp(2.4, 0.95, t), te = lerp(-0.6, -0.15, t);
    var th = lerp(0.46, 0.12, t), zc = -0.45 + Math.max(0, y - 2.4) * 0.055;
    if (y > 6.45) { var u = (y - 6.45) / (HS - 6.45); le -= 0.25 * u * u; te += 0.2 * u * u; th *= (1 - 0.5 * u * u); }
    return [y, le, te, zc, th];
  }
  var WY = [0.5, 1.4, 2.4, 3.4, 4.4, 5.4, 6.2, 6.55, 6.8];

  function yt(f, tc) {
    return tc * (1.4845 * Math.sqrt(f) - 0.6300 * f - 1.7580 * f * f + 1.4215 * f * f * f - 0.5075 * f * f * f * f);
  }
  function foil(xle, xte, th, m) {
    var p = [], i, f, c = xle - xte, tc = th / c;
    for (i = 0; i <= m; i++) { f = 0.5 * (1 + Math.cos(Math.PI * i / m)); p.push([xle - f * c, yt(f, tc) * c]); }
    for (i = m - 1; i >= 1; i--) { f = 0.5 * (1 + Math.cos(Math.PI * i / m)); p.push([xle - f * c, -yt(f, tc) * c]); }
    return p;
  }
  function loft(rings) {
    var n = rings[0].length, pos = [], idx = [], i, j, r, a, b, c, d;
    for (r = 0; r < rings.length; r++) for (j = 0; j < n; j++) pos.push(rings[r][j][0], rings[r][j][1], rings[r][j][2]);
    for (r = 0; r + 1 < rings.length; r++) for (j = 0; j < n; j++) {
      a = r * n + j; b = r * n + (j + 1) % n; c = (r + 1) * n + j; d = (r + 1) * n + (j + 1) % n;
      idx.push(a, b, c, b, d, c);
    }
    [0, rings.length - 1].forEach(function (e) {
      var cx = 0, cy = 0, cz = 0;
      for (j = 0; j < n; j++) { cx += rings[e][j][0]; cy += rings[e][j][1]; cz += rings[e][j][2]; }
      var ci = pos.length / 3; pos.push(cx / n, cy / n, cz / n);
      for (j = 0; j < n; j++) { var p = e * n + j, q = e * n + (j + 1) % n; if (e === 0) idx.push(ci, q, p); else idx.push(ci, p, q); }
    });
    var vol = 0;
    for (i = 0; i < idx.length; i += 3) {
      var A = idx[i] * 3, B = idx[i + 1] * 3, Cc = idx[i + 2] * 3;
      vol += pos[A] * (pos[B + 1] * pos[Cc + 2] - pos[B + 2] * pos[Cc + 1])
           - pos[A + 1] * (pos[B] * pos[Cc + 2] - pos[B + 2] * pos[Cc])
           + pos[A + 2] * (pos[B] * pos[Cc + 1] - pos[B + 1] * pos[Cc]);
    }
    if (vol < 0) for (i = 0; i < idx.length; i += 3) { var t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function cr(p0, p1, p2, p3, t) {
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
  }
  function sub(arr, i, t) {
    var n = arr.length;
    return cr(arr[Math.max(i - 1, 0)], arr[i], arr[Math.min(i + 1, n - 1)], arr[Math.min(i + 2, n - 1)], t);
  }
  function tabAt(tab, key, x) {
    var i;
    for (i = 0; i + 1 < tab.x.length; i++) if (x <= tab.x[i] && x >= tab.x[i + 1]) {
      var t = (tab.x[i] - x) / (tab.x[i] - tab.x[i + 1]);
      return lerp(tab[key][i], tab[key][i + 1], t);
    }
    return tab[key][tab.x.length - 1];
  }
  function sring(x, hw, zt, zb, N, e) {
    var p = [], i, a, c, s, zc = (zt + zb) / 2, b = (zt - zb) / 2;
    for (i = 0; i < N; i++) {
      a = i / N * Math.PI * 2; c = Math.cos(a); s = Math.sin(a);
      p.push([x, hw * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), 2 / e), zc + b * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), 2 / e)]);
    }
    return p;
  }
  function fuselage(tab, N, per) {
    var rings = [], i, s, t, n = tab.x.length;
    for (i = 0; i + 1 < n; i++) for (s = 0; s < per; s++) {
      t = s / per;
      var x = sub(tab.x, i, t), zt = sub(tab.zt, i, t), zb = sub(tab.zb, i, t), hw = sub(tab.hw, i, t);
      rings.push(sring(x, Math.max(hw, 0.02), zt, Math.min(zb, zt - 0.04), N, 2.3));
    }
    rings.push(sring(tab.x[n - 1], tab.hw[n - 1], tab.zt[n - 1], Math.min(tab.zb[n - 1], tab.zt[n - 1] - 0.04), N, 2.3));
    return loft(rings);
  }
  function wingRing(y, side, m) {
    var st = wst(y);
    return foil(st[1], st[2], st[4], m).map(function (p) { return [p[0], side * st[0], st[3] + p[1]]; });
  }
  function box(sx, sy, sz, x, y, z) { var g = new V.BoxGeometry(sx, sy, sz); g.translate(x, y, z); return g; }
  function cylX(r0, r1, len, x, y, z, seg) {   /* r0 at the +X end */
    var g = new V.CylinderGeometry(r0, r1, len, seg || 16);
    g.rotateZ(-Math.PI / 2); g.translate(x, y, z); return g;
  }
  function cylY(r, w, x, y, z, seg) { var g = new V.CylinderGeometry(r, r, w, seg || 20); g.translate(x, y, z); return g; }
  function rod(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r, r, L, seg || 8);
    var q = new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L));
    var m = new V.Matrix4().makeRotationFromQuaternion(q);
    m.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(m); return g;
  }
  function cowl() {
    var rings = COWL.map(function (q) {
      var p = [], i, N = 28;
      for (i = 0; i < N; i++) { var a = i / N * Math.PI * 2; p.push([q[0], q[1] * Math.cos(a), q[1] * Math.sin(a)]); }
      return p;
    });
    return loft(rings);
  }
  function canopy() {
    var rings = CAN.r.map(function (q) {
      var p = [], i;
      for (i = 0; i <= 8; i++) { var a = Math.PI * i / 8; p.push([q[0], q[2] * Math.cos(a), CAN.zb + (q[1] - CAN.zb) * Math.sin(a)]); }
      return p;
    });
    return loft(rings);
  }
  function frames(out) {
    CAN.fr.forEach(function (fx) {
      var r = CAN.r, i = 0, t, top, hw;
      while (i + 2 < r.length && fx < r[i + 1][0]) i++;
      t = clamp((r[i][0] - fx) / (r[i][0] - r[i + 1][0]), 0, 1);
      top = lerp(r[i][1], r[i + 1][1], t); hw = lerp(r[i][2], r[i + 1][2], t);
      var prev = null, j;
      for (j = 0; j <= 8; j++) {
        var a = Math.PI * j / 8, pt = [fx, hw * 1.02 * Math.cos(a), CAN.zb + (top - CAN.zb) * 1.02 * Math.sin(a)];
        if (prev) out.push(rod(prev, pt, 0.016, 5));
        prev = pt;
      }
    });
  }
  /* split a lofted skin piece: triangles for which under(centreZ, normalZ) holds go to B (the pale lower surfaces) */
  function splitTo(g, under, A, B) {
    var ng = g.index ? g.toNonIndexed() : g, p = ng.attributes.position.array, n = ng.attributes.normal.array;
    var pa = [], na = [], pb = [], nb = [], i, k;
    for (i = 0; i < p.length; i += 9) {
      var ux = p[i + 3] - p[i], uy = p[i + 4] - p[i + 1], uz = p[i + 5] - p[i + 2];
      var vx = p[i + 6] - p[i], vy = p[i + 7] - p[i + 1], vz = p[i + 8] - p[i + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx, nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      var cz = (p[i + 2] + p[i + 5] + p[i + 8]) / 3;
      var dst = under(cz, nz / nl) ? [pb, nb] : [pa, na];
      for (k = 0; k < 9; k++) { dst[0].push(p[i + k]); dst[1].push(n[i + k]); }
    }
    [[pa, na, A], [pb, nb, B]].forEach(function (q) {
      if (!q[0].length) return;
      var o = new V.BufferGeometry();
      o.setAttribute("position", new V.Float32BufferAttribute(q[0], 3));
      o.setAttribute("normal", new V.Float32BufferAttribute(q[1], 3));
      q[2].push(o);
    });
  }
  /* split an indexed loft by ring vertex: triangles whose three vertices all satisfy low(j) go to B. The split line then
     follows a line of ring vertices, so it is clean instead of a sawtooth. Cap triangles stay in A. */
  function splitIdx(g, n, low, A, B) {
    var idx = g.index.array, ia = [], ib = [], i, k, all, lim = g.attributes.position.count - 2;
    for (i = 0; i < idx.length; i += 3) {
      all = true;
      for (k = 0; k < 3; k++) if (idx[i + k] >= lim || !low(idx[i + k] % n)) all = false;
      var dst = all ? ib : ia;
      dst.push(idx[i], idx[i + 1], idx[i + 2]);
    }
    [[ia, A], [ib, B]].forEach(function (q) {
      if (!q[0].length) return;
      var o = g.clone(); o.setIndex(q[0]); q[1].push(o);
    });
  }
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
  function emit(parent, lists, mats, order) {
    order.forEach(function (key) { if (lists[key] && lists[key].length) parent.add(new V.Mesh(merge(lists[key]), mats[key])); });
  }
  /* a flat five-point star in the X-Z plane at y (normal along Y), radius r */
  function starGeo(cx, y, cz, r) {
    var pos = [], i, a, q;
    for (i = 0; i < 10; i++) {
      a = Math.PI / 2 + i * Math.PI / 5; q = (i & 1) ? 0.40 : 1;
      var a2 = Math.PI / 2 + (i + 1) * Math.PI / 5, q2 = ((i + 1) & 1) ? 0.40 : 1;
      pos.push(cx, y, cz, cx + Math.cos(a) * q * r, y, cz + Math.sin(a) * q * r, cx + Math.cos(a2) * q2 * r, y, cz + Math.sin(a2) * q2 * r);
    }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }

  function makeMats(C) {
    var m = {}, tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.skin = new V.MeshStandardMaterial({ color: 0x59623f, roughness: 0.62, metalness: 0.10 });
    m.under = new V.MeshStandardMaterial({ color: 0xa9b6bf, roughness: 0.60, metalness: 0.10 });
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.ink = new V.MeshStandardMaterial({ color: 0x0b0c0d, roughness: 0.95, metalness: 0.03 });
    m.tyre = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.glass = new V.MeshStandardMaterial({ color: 0x4a5a58, roughness: 0.12, metalness: 0.55, transparent: true, opacity: 0.80, side: V.DoubleSide });
    m.propDisc = new V.MeshStandardMaterial({ color: 0x202427, roughness: 1.0, metalness: 0.0, transparent: true, opacity: 0.16,
                                              depthWrite: false, side: V.DoubleSide });
    m.starRed = new V.MeshStandardMaterial({ color: 0xb22a22, roughness: 0.7, metalness: 0.0, side: V.DoubleSide,
                                             polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    m.starWhite = new V.MeshStandardMaterial({ color: 0xe2e0d8, roughness: 0.7, metalness: 0.0, side: V.DoubleSide,
                                               polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 });
    return m;
  }

  function build(THREE, M, C) {
    V = THREE;
    var side, j;
    var K = { skin: [], under: [], team: [], metal: [], ink: [], glass: [], propDisc: [], starRed: [], starWhite: [] };
    var G = { metal: [], tyre: [], under: [] };
    var lowRing = function (j) { return j >= 15 && j <= 27; };            /* 28-vertex fuselage/cowl rings: the paint line */
    var lowFoil = function (m) { return function (j) { return j >= m || j === 0; }; };   /* aerofoil rings: the lower surface */

    splitIdx(fuselage(FT, 28, 5), 28, lowRing, K.skin, K.under);
    splitIdx(cowl(), 28, lowRing, K.skin, K.under);
    K.glass.push(canopy());
    frames(K.ink);
    K.ink.push(cylX(0.30, 0.30, 0.02, 4.64, 0, 0, 20));                  /* the dark intake ring behind the spinner */
    /* chin radiator under the nose */
    K.under.push(box(1.5, 0.62, 0.26, 2.7, 0, -0.84));
    K.ink.push(box(0.02, 0.50, 0.16, 3.46, 0, -0.84));
    /* ejector-stack fairings each side of the cowl */
    [-1, 1].forEach(function (sd) { K.ink.push(box(0.9, 0.05, 0.13, 3.35, sd * 0.545, 0.16)); });
    /* the aerial mast ahead of the pilot, and its wire to the fin tip */
    K.metal.push(rod([3.0, 0, 0.62], [3.0, 0, 1.55], 0.012, 4));
    K.metal.push(rod([3.0, 0, 1.55], [-4.85, 0, 2.05], 0.004, 3));
    /* the gunner's gun aft over the rear hood */
    K.metal.push(rod([-1.3, 0, 1.12], [-2.15, 0, 1.22], 0.025, 6));

    /* propeller: spinner, three-blade blur disc 3.60 m, no blades drawn */
    K.metal.push(cylX(0.03, 0.30, 0.50, 4.75, 0, 0, 20));
    var disc = new V.CircleGeometry(1.80, 64); disc.rotateY(Math.PI / 2); disc.translate(4.70, 0, 0); K.propDisc.push(disc);

    /* wing: rounded tip, team strip on the top near the tip */
    for (side = -1; side <= 1; side += 2) {
      var wr = []; WY.forEach(function (y) { wr.push(wingRing(y, side, 16)); });
      splitIdx(loft(wr), 32, lowFoil(16), K.skin, K.under);
      var ws = wst(6.0), cf = ws[1] - 0.40 * (ws[1] - ws[2]);
      K.team.push(box(0.45, 0.6, 0.025, cf, side * 5.9, ws[3] + 0.40 * ws[4] * 0.75 + 0.03));
      /* two NR-23 muzzles a side at the leading edge, a pale fairing ahead of the leg root */
      [2.0, 3.1].forEach(function (cy) {
        var w = wst(cy);
        K.ink.push(cylX(0.034, 0.034, 0.55, w[1] + 0.22, side * cy, w[3] + 0.02, 6));
        K.metal.push(cylX(0.052, 0.052, 0.2, w[1] - 0.02, side * cy, w[3] + 0.02, 8));
      });
      var fw = wst(1.7), fg = new V.SphereGeometry(0.2, 10, 8);
      fg.scale(1.3, 1, 0.9); fg.translate(fw[1] - 0.05, side * 1.7, fw[3] - 0.15); K.under.push(fg);
    }

    /* fin and the false keel of the Il-10M: z, leading x, trailing x, thickness */
    var FS = [[0.30, -3.4, -6.15, 0.24], [0.8, -3.8, -6.15, 0.20], [1.3, -4.2, -6.05, 0.15], [1.75, -4.55, -5.92, 0.10], [2.1, -4.85, -5.8, 0.05]];
    var finRing = function (q) { return foil(q[1], q[2], q[3], 12).map(function (p) { return [p[0], p[1], q[0]]; }); };
    K.skin.push(loft(FS.map(finRing)));
    K.under.push(loft([[-0.05, -4.9, -6.2, 0.16], [-0.3, -5.2, -6.2, 0.10], [-0.55, -5.5, -6.15, 0.04]].map(finRing)));

    /* tailplane: span about 4.2 m, low on the fuselage */
    var TP = [[0.2, -4.2, -5.85, 0.16], [1.2, -4.5, -5.85, 0.11], [2.1, -5.0, -5.78, 0.05]];
    for (side = -1; side <= 1; side += 2) {
      splitIdx(loft(TP.map(function (q) {
        return foil(q[1], q[2], q[3], 8).map(function (p) { return [p[0], side * q[0], 0.22 + p[1]]; });
      })), 16, lowFoil(8), K.skin, K.under);
    }

    /* the Soviet star each side of the rear fuselage: red, white border, red edge */
    for (side = -1; side <= 1; side += 2) {
      var sx = -3.55, sr = 0.27, sy0 = side * (tabAt(FT, "hw", sx + sr * 1.2) + 0.01);
      K.starRed.push(starGeo(sx, sy0, 0.06, sr * 1.24));
      K.starWhite.push(starGeo(sx, sy0 + side * 0.006, 0.06, sr * 1.12));
      K.starRed.push(starGeo(sx, sy0 + side * 0.012, 0.06, sr));
    }

    /* undercarriage, the lowest part: main legs aft-retracting from the wing, track 3.5 m; tailwheel under the false keel */
    for (side = -1; side <= 1; side += 2) {
      var yw = side * 1.75;
      G.metal.push(rod([2.05, side * 1.55, -0.55], [1.92, yw, -1.42], 0.07, 8));
      G.metal.push(rod([1.2, side * 1.45, -0.50], [1.92, side * 1.68, -1.0], 0.03, 6));       /* retraction strut */
      G.tyre.push(cylY(0.40, 0.24, 1.92, yw, -1.40, 22));
      G.metal.push(cylY(0.18, 0.27, 1.92, yw, -1.40, 12));
      G.under.push(box(0.62, 0.02, 0.85, 1.95, side * 1.92, -1.18));                         /* the door plate outboard of the wheel */
    }
    G.metal.push(rod([-4.7, 0, -0.1], [-4.75, 0, -1.55], 0.045, 6));
    G.tyre.push(cylY(0.16, 0.10, -4.75, 0, -1.54, 14));

    var mats = makeMats(C);
    var root = new V.Group();
    emit(root, K, mats, ["skin", "under", "team", "ink", "glass", "metal", "starRed", "starWhite", "propDisc"]);
    var gear = new V.Group(); gear.name = "gear";
    emit(gear, G, mats, ["metal", "tyre", "under"]);
    root.add(gear);
    return root;
  }
  return { build: build };
})();

UNIT_MODELS["pact_e50_cas"] = { len: 11.25, build: function (THREE, M, C) { return HeroIl10.build(THREE, M, C); } };
