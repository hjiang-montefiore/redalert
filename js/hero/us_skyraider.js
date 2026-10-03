/* ============ us_skyraider.js -- DOUGLAS AD SKYRAIDER (HERO MODEL) ============

   The two 1950s rows that fly the Skyraider:
     nato_e50_cas     "A-1 Skyraider", full name Douglas AD-4 Skyraider (1946-):
                      the single-seat attack aircraft. The A-1 designation only
                      dates from 1962, so the airframe drawn is the AD-4 the
                      row names, in the glossy sea blue overall of the early
                      1950s Navy (a 1952 VA-35 AD-4 photograph).
     nato_e50_ewair   AD-5Q Skyraider (EA-1F from 1962), the four-man electronic
                      warfare version on the AD-5 airframe, in the light gull
                      grey over white the Navy used from the mid-1950s (period
                      photographs of AD-5Qs); the row is carrier capable.
   Other nations' e50 CAS rows (pact, kpa, pla Il-10 and so on) share the role
   and borrow the first same-role peer, which is this model; that was already so
   for their old stand-in and is not changed here.

   WHAT EACH FEATURE RESTS ON
     - Bureau of Aeronautics three-view drawings of the AD-4 and the AD-5
       (Wikimedia Commons "Douglas AD-4 BuAer 3 side view" and "Douglas AD-5
       BuAer 3 side view"): overall length 38 ft 10 1/2 in (11.84 m) and 40 ft
       (12.19 m), span 50 ft 0 3/16 in (15.25 m), height 15 ft 8 in / 15 ft 10
       in-class, tailplane span 19 ft 10 in, main-wheel track 13 ft 10 in /
       13 ft 11 in, 32 x 8.8 tyres; the wing from the plan view (root leading
       edge about 3.1 m aft of the cowl face, tapering to a rounded tip, the
       root chord 3.1 m and tip chord 1.8 m, NACA 2417 to 4413, about 4 degrees
       of dihedral, the two wing-cannon muzzles a side on the leading edge of
       the AD-4); the profile: a big round R-3350 cowl about 1.5 m across, a
       deep slab-sided fuselage, a low spine running back to a tall swept fin
       with a raked trailing edge, the AD-4's single hood with a sloped
       windscreen, the AD-5's long framed greenhouse over the side-by-side
       cabin and its 1.5-1.6 m wide fuselage, main wheels under the wing
       leading edge and the tailwheel well aft.
     - The four-blade propeller is 13 ft 6 in (4.1 m): a see-through disc with
       four paddles, not animated.
     - NOT confirmed from a drawing: the exact fuselage stations and fin curve
       (read off a small, tilted drawing), the AD-5Q's four small cabin
       windows aft, its dorsal whip and ventral blade (suggested by period
       photographs; the real ECM aerial layout is not reproduced), and the AD-5Q
       has no cannon drawn (the drawing is the plain AD-5). No stores are drawn
       on either: the loads varied from sortie to sortie.
   The tailwheel undercarriage hangs in the "gear" group, lowest of all.
   Team colour (C.team) is on the spinner, the fin tip and the wing tips.
   Model space +X nose, +Y port, +Z up, metres, the thrust line level.
   ================================================================== */
var HeroSkyraider = (function () {
  var V = null;
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* ----- fuselage station tables (AD-4 / AD-5): x, top z, bottom z, half width ----- */
  var AD4 = {
    x:  [4.45, 4.00, 3.20, 2.20, 1.00, -0.20, -1.40, -2.60, -3.80, -4.80, -5.50, -5.92],
    zt: [0.80, 0.96, 1.08, 1.12, 1.14, 1.14, 1.12, 1.04, 0.88, 0.66, 0.46, 0.30],
    zb: [-0.66, -0.72, -0.76, -0.78, -0.80, -0.80, -0.72, -0.56, -0.40, -0.26, -0.14, -0.02],
    hw: [0.70, 0.73, 0.74, 0.74, 0.74, 0.72, 0.62, 0.48, 0.34, 0.22, 0.12, 0.05]
  };
  var AD5 = {
    x:  AD4.x, zb: AD4.zb,
    zt: [0.80, 0.96, 1.05, 1.04, 1.02, 1.02, 1.04, 1.00, 0.88, 0.66, 0.46, 0.30],
    hw: [0.72, 0.76, 0.80, 0.82, 0.82, 0.80, 0.68, 0.50, 0.34, 0.22, 0.12, 0.05]
  };
  var COWL = [[5.64, 0.60], [5.58, 0.68], [5.46, 0.74], [5.20, 0.78], [4.80, 0.79], [4.40, 0.78], [4.10, 0.75]];
  var CZ = 0.08;      /* thrust line height */
  /* canopy stations: x, top z, half width ; base z */
  var CAN4 = { zb: 1.00, r: [[3.55, 1.18, 0.30], [3.35, 1.34, 0.38], [2.95, 1.47, 0.40], [2.1, 1.46, 0.40], [1.4, 1.30, 0.34], [0.95, 1.14, 0.20]],
               fr: [3.3, 2.5, 1.8] };
  var CAN5 = { zb: 0.95, r: [[4.0, 1.12, 0.46], [3.6, 1.38, 0.60], [3.0, 1.52, 0.66], [1.5, 1.54, 0.66], [0.0, 1.50, 0.64], [-0.5, 1.30, 0.50], [-0.8, 1.08, 0.30]],
               fr: [3.5, 2.4, 1.3, 0.2] };

  /* wing planform, from the plan view: root LE 3.10 / TE -0.04 at the centreline-ish
     station, tip LE 2.48 / TE 0.67; thickness 0.52 to 0.23; dihedral about 4 degrees */
  var HS = 7.625;
  function wst(y) {
    var t = clamp((y - 0.55) / (HS - 0.55), 0, 1), le = lerp(3.10, 2.48, t), te = lerp(-0.04, 0.67, t);
    var th = lerp(0.52, 0.23, t), zc = -0.52 + (y - 0.55) * 0.0699 + th * 0, c = le - te;
    if (y > 7.3) { var u = (y - 7.3) / (7.70 - 7.3); le -= 0.35 * u * u; te += 0.15 * u * u; th *= (1 - 0.45 * u * u); }
    return [y, le, te, zc, th];
  }
  var WY = [0.55, 1.3, 2.0, 2.8, 3.6, 4.5, 5.4, 6.2, 6.9, 7.3, 7.5, 7.62];
  var WSPLIT = 8;   /* WY index where the team tip begins */

  /* ----- geometry helpers ----- */
  function yt(f, tc) {
    return tc * (1.4845 * Math.sqrt(f) - 0.6300 * f - 1.7580 * f * f + 1.4215 * f * f * f - 0.5075 * f * f * f * f);
  }
  function foil(xle, xte, th, m) {
    var p = [], i, f, c = xle - xte, tc = th / c;
    for (i = 0; i <= m; i++) { f = 0.5 * (1 + Math.cos(Math.PI * i / m)); p.push([xle - f * c, yt(f, tc) * c]); }
    for (i = m - 1; i >= 1; i--) { f = 0.5 * (1 + Math.cos(Math.PI * i / m)); p.push([xle - f * c, -yt(f, tc) * c]); }
    return p;
  }
  /* closed loft of equal-length rings, with caps, wound outward */
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
      for (j = 0; j < n; j++) { var p = e * n + j, q = e * n + (j + 1) % n; if (e === 0) idx.push(ci, p, q); else idx.push(ci, q, p); }
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
    rings.push(sring(tab.x[n - 1], tab.hw[n - 1], tab.zt[n - 1], tab.zb[n - 1] - 0.0 > tab.zt[n - 1] - 0.04 ? tab.zt[n - 1] - 0.04 : tab.zb[n - 1], N, 2.3));
    return loft(rings);
  }

  /* ----- wing ring helpers ----- */
  function wingRing(y, side, m) {
    var st = wst(y);
    return foil(st[1], st[2], st[4], m).map(function (p) { return [p[0], side * st[0], st[3] + p[1]]; });
  }
  function wingLoft(i0, i1, side, m) {
    var r = [], i;
    for (i = i0; i <= i1; i++) r.push(wingRing(WY[i], side, m));
    return loft(r);
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

  /* a round body of revolution about the thrust line (the cowl) */
  function cowl(dx) {
    var rings = COWL.map(function (q) {
      var p = [], i, N = 32;
      for (i = 0; i < N; i++) { var a = i / N * Math.PI * 2; p.push([q[0] + dx, q[1] * Math.cos(a), CZ + q[1] * Math.sin(a)]); }
      return p;
    });
    return loft(rings);
  }
  function canopy(c, X) {
    var rings = c.r.map(function (q) {
      var p = [], i;
      for (i = 0; i <= 8; i++) { var a = Math.PI * i / 8; p.push([X(q[0]), q[2] * Math.cos(a), c.zb + (q[1] - c.zb) * Math.sin(a)]); }
      return p;
    });
    return loft(rings);
  }
  /* frame hoops over the canopy */
  function frames(c, X, out) {
    c.fr.forEach(function (fx) {
      var r = c.r, i = 0, t, top, hw;
      while (i + 2 < r.length && fx < r[i + 1][0]) i++;
      t = clamp((r[i][0] - fx) / (r[i][0] - r[i + 1][0]), 0, 1);
      top = lerp(r[i][1], r[i + 1][1], t); hw = lerp(r[i][2], r[i + 1][2], t);
      var prev = null, j;
      for (j = 0; j <= 8; j++) {
        var a = Math.PI * j / 8, pt = [X(fx), hw * 1.02 * Math.cos(a), c.zb + (top - c.zb) * 1.02 * Math.sin(a)];
        if (prev) out.push(rod(prev, pt, 0.016, 5));
        prev = pt;
      }
    });
  }
  /* split a lofted skin piece: triangles for which under(centreZ, normalZ) holds go to B (the white lower surfaces) */
  function splitTo(g, under, A, B) {
    if (!under) { A.push(g); return; }
    var ng = g.index ? g.toNonIndexed() : g, p = ng.attributes.position.array, n = ng.attributes.normal.array;
    var pa = [], na = [], pb = [], nb = [], i, k;
    for (i = 0; i < p.length; i += 9) {
      var ux = p[i + 3] - p[i], uy = p[i + 4] - p[i + 1], uz = p[i + 5] - p[i + 2];
      var vx = p[i + 6] - p[i], vy = p[i + 7] - p[i + 1], vz = p[i + 8] - p[i + 2];
      var nz = ux * vy - uy * vx, nl = Math.sqrt((uy * vz - uz * vy) * (uy * vz - uz * vy) + (uz * vx - ux * vz) * (uz * vx - ux * vz) + nz * nz) || 1;
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

  function makeMats(C, Q) {
    var m = {}, tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    /* AD-4: glossy sea blue overall; AD-5Q: gull grey over white */
    m.skin = Q ? new V.MeshStandardMaterial({ color: 0x98a2a8, roughness: 0.55, metalness: 0.10, side: V.DoubleSide })
               : new V.MeshStandardMaterial({ color: 0x24406c, roughness: 0.34, metalness: 0.14, side: V.DoubleSide });
    m.under = new V.MeshStandardMaterial({ color: 0xe3e5e1, roughness: 0.55, metalness: 0.08, side: V.DoubleSide });
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.ink = new V.MeshStandardMaterial({ color: 0x0b0c0d, roughness: 0.95, metalness: 0.03, side: V.DoubleSide });
    m.tyre = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.glass = new V.MeshStandardMaterial({ color: 0x4a5a58, roughness: 0.12, metalness: 0.55, transparent: true, opacity: 0.80, side: V.DoubleSide });
    m.propDisc = new V.MeshStandardMaterial({ color: 0x202427, roughness: 1.0, metalness: 0.0, transparent: true, opacity: 0.13,
                                              depthWrite: false, side: V.DoubleSide });
    m.propBlade = new V.MeshStandardMaterial({ color: 0x15171a, roughness: 1.0, metalness: 0.0, transparent: true, opacity: 0.50,
                                               depthWrite: false, side: V.DoubleSide });
    return m;
  }

  function build(THREE, M, C, kind) {
    V = THREE;
    var Q = kind === "Q", tab = Q ? AD5 : AD4, side, i, j;
    var X = Q ? function (x) { return x * 1.0296; } : function (x) { return x; };    /* AD-5 fuselage 12.19 m long */
    var K = { skin: [], under: [], team: [], metal: [], ink: [], glass: [], propDisc: [], propBlade: [] };
    var G = { metal: [], tyre: [] };
    var lowFus = function (cz) { return cz < -0.10; }, lowWing = function (cz, nz) { return nz < -0.05; };
    var lowCowl = function (cz) { return cz < CZ - 0.02; };
    var S = function (g, t) { splitTo(g, Q ? t : null, K.skin, K.under); };

    /* fuselage (stations from the drawings, aft part stretched on the AD-5), cowl, canopy */
    var xs = tab.x.map(X), ft = { x: xs, zt: tab.zt, zb: tab.zb, hw: tab.hw };
    S(fuselage(ft, 32, 6), lowFus);
    var NX = Q ? 0.10 : 0;
    S(cowl(NX), lowCowl);
    K.glass.push(canopy(Q ? CAN5 : CAN4, X));
    frames(Q ? CAN5 : CAN4, X, K.ink);
    K.ink.push(cylX(0.54, 0.54, 0.02, 5.655 + NX, 0, CZ, 24));              /* the dark intake face */
    [-1, 1].forEach(function (sd) {                                      /* cowl flaps and exhaust stubs */
      K.ink.push(box(0.26, 0.03, 0.44, 4.28, sd * 0.765, CZ));
      for (j = 0; j < 3; j++) K.ink.push(box(0.16, 0.05, 0.07, 4.62 - j * 0.0, sd * 0.78, CZ - 0.2 + j * 0.2));
    });

    /* propeller: spinner (team), blur disc, four paddles */
    K.team.push(cylX(0.03, 0.30, 0.42, 5.72 + NX, 0, CZ, 16));
    var disc = new V.CircleGeometry(2.05, 64); disc.rotateY(Math.PI / 2); disc.translate(5.68 + NX, 0, CZ); K.propDisc.push(disc);
    [20, 110].forEach(function (d) {
      var b = new V.BoxGeometry(0.04, 0.24, 4.1); b.rotateX(d * Math.PI / 180); b.translate(5.70 + NX, 0, CZ); K.propBlade.push(b);
    });

    /* wings: skin to the tip break, team caps */
    for (side = -1; side <= 1; side += 2) {
      S(wingLoft(0, WSPLIT, side, 14), lowWing);
      K.team.push(wingLoft(WSPLIT, WY.length - 1, side, 14));
    }

    /* fin: stations z, leading x, trailing x, thickness */
    var FS = [[0.95, -2.2, -5.84, 0.30], [1.35, -3.0, -5.80, 0.27], [1.85, -3.7, -5.70, 0.22], [2.35, -4.2, -5.55, 0.16],
              [2.72, -4.48, -5.35, 0.10], [2.84, -4.62, -5.22, 0.05]];
    var finRing = function (q) { return foil(X(q[1]), X(q[2]), q[3], 12).map(function (p) { return [p[0], p[1], q[0]]; }); };
    K.skin.push(loft(FS.slice(0, 4).map(finRing)));
    K.team.push(loft(FS.slice(3).map(finRing)));
    [-1, 1].forEach(function (sd) {                                      /* rudder hinge line */
      var a = FS[0], b = FS[3], ha = a[2] + 0.32 * (a[1] - a[2]) * 0.55, hb = b[2] + 0.32 * (b[1] - b[2]) * 0.8;
      K.ink.push(rod([X(ha), sd * (a[3] * 0.5 + 0.004), 1.0], [X(hb), sd * (b[3] * 0.5 + 0.004), 2.35], 0.010, 4));
    });

    /* tailplane: span 6.05 m */
    var TP = [[0.2, -4.25, -5.76, 0.17], [1.6, -4.55, -5.74, 0.12], [3.02, -4.90, -5.64, 0.06]];
    for (side = -1; side <= 1; side += 2) {
      S(loft(TP.map(function (q) {
        return foil(X(q[1]), X(q[2]), q[3], 8).map(function (p) { return [p[0], side * q[0], 0.22 + p[1]]; });
      })), lowWing);
    }
    K.ink.push(rod([X(-4.85), 0, -0.12], [X(-5.85), 0, -0.22], 0.03, 6));    /* arrestor hook, stowed */

    if (!Q) {
      /* the AD-4's two 20 mm cannon a side: muzzles at the leading edge, plan view */
      for (side = -1; side <= 1; side += 2) [3.5, 4.04].forEach(function (cy) {
        var w = wst(cy);
        K.ink.push(cylX(0.034, 0.034, 0.5, w[1] + 0.25, side * cy, w[3] + 0.02, 6));
        K.metal.push(cylX(0.055, 0.055, 0.2, w[1] - 0.02, side * cy, w[3] + 0.02, 8));
      });
    } else {
      /* AD-5Q: four small cabin windows aft, one dorsal whip, one ventral blade; nothing else is claimed */
      for (side = -1; side <= 1; side += 2) [-1.35, -2.25].forEach(function (x) {
        K.glass.push(box(0.42, 0.03, 0.26, X(x), side * (tabAt(ft, "hw", X(x)) - 0.01), 0.45));
      });
      K.metal.push(rod([X(-3.3), 0, tabAt(ft, "zt", X(-3.3)) - 0.02], [X(-3.9), 0, tabAt(ft, "zt", X(-3.9)) + 0.75], 0.02, 5));
      K.metal.push(box(0.4, 0.03, 0.3, X(-3.0), 0, tabAt(ft, "zb", X(-3.0)) - 0.12));
    }

    /* undercarriage, the lowest part: main wheels (32 x 8.8) under the wing leading edge, track 4.25 m */
    for (side = -1; side <= 1; side += 2) {
      var yw = side * 2.12;
      G.metal.push(rod([3.0, side * 1.6, -0.74], [3.05, yw, -1.55], 0.07, 8));
      G.metal.push(rod([2.6, side * 1.5, -0.72], [3.05, side * 2.02, -1.26], 0.03, 6));
      G.tyre.push(cylY(0.405, 0.24, 3.05, yw, -1.545, 22));
      G.metal.push(cylY(0.21, 0.27, 3.05, yw, -1.545, 14));
    }
    G.metal.push(rod([X(-4.85), 0, -0.1], [X(-5.1), 0, -1.74], 0.045, 6));
    G.tyre.push(cylY(0.17, 0.10, X(-5.1), 0, -1.78, 14));

    var mats = makeMats(C, Q);
    var root = new V.Group();
    emit(root, K, mats, ["skin", "under", "team", "ink", "glass", "metal", "propDisc", "propBlade"]);
    var gear = new V.Group(); gear.name = "gear";
    emit(gear, G, mats, ["metal", "tyre"]);
    root.add(gear);
    return root;
  }
  return { build: build };
})();

UNIT_MODELS["nato_e50_cas"] = { len: 11.84, build: function (THREE, M, C) { return HeroSkyraider.build(THREE, M, C, "AD4"); } };
UNIT_MODELS["nato_e50_ewair"] = { len: 12.19, build: function (THREE, M, C) { return HeroSkyraider.build(THREE, M, C, "Q"); } };
