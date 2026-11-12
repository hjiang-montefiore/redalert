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
  var LAY = null, DXK = null;
  function emit(parent, lists, mats, order) {
    order.forEach(function (key) {
      if (!lists[key] || !lists[key].length) return;
      var geo = merge(lists[key]);
      if (mats[key].map && LAY) DXK.projUV(geo, LAY);
      parent.add(new V.Mesh(geo, mats[key]));
    });
  }

  /* ========================================================= detail kit ==
     (the redo) Fittings laid on the skin, and a projected paint sheet.
     ribbon()  a strip along a polyline lying on the skin (outward normal at
               each point given), lifted a little: panel seams, hinge lines,
               walkway edges, de-icer boots;
     blade()   a tapered blade aerial or a fence standing on the skin;
     lamp()    a small eight-faced lamp in a vertex colour (one material);
     sheet()   a grey-scale canvas laid over the coloured skins by projected
               UVs (plan views from above and below, the two sides): panel
               lines, rivet rows, walkways, exhaust soot and weathering. The
               skins keep their colour; the sheet only darkens it. */
  function DK(V) {
    function vsub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
    function vcross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
    function vnorm(a) { var m = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]) || 1; return [a[0] / m, a[1] / m, a[2] / m]; }
    function geo(pos, col) {
      var g = new V.BufferGeometry();
      g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
      if (col) g.setAttribute("color", new V.Float32BufferAttribute(col, 3));
      g.computeVertexNormals();
      return g;
    }
    function quad(pos, a, b, c, d, n) {
      var u = vsub(b, a), v = vsub(c, a), f = vcross(u, v);
      if (n && f[0] * n[0] + f[1] * n[1] + f[2] * n[2] < 0) { var t = b; b = d; d = t; }
      pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2],
               a[0], a[1], a[2], c[0], c[1], c[2], d[0], d[1], d[2]);
    }
    /* pts: [[x,y,z]...]; nrm: the outward normal at each point, or a
       function (p) -> normal; w the width, lift the height off the skin */
    function ribbon(pts, nrm, w, lift) {
      var pos = [], A = [], B = [], i, n = pts.length;
      if (n < 2) return null;
      for (i = 0; i < n; i++) {
        var p = pts[i], nn = vnorm(typeof nrm === "function" ? nrm(p) : (nrm[0].length ? nrm[i] : nrm));
        var t = vsub(pts[Math.min(i + 1, n - 1)], pts[Math.max(i - 1, 0)]);
        var s = vnorm(vcross(t, nn)), l = lift === undefined ? 0.012 : lift;
        var c = [p[0] + nn[0] * l, p[1] + nn[1] * l, p[2] + nn[2] * l];
        A.push([c[0] + s[0] * w / 2, c[1] + s[1] * w / 2, c[2] + s[2] * w / 2]);
        B.push([c[0] - s[0] * w / 2, c[1] - s[1] * w / 2, c[2] - s[2] * w / 2]);
        A[i].n = nn;
      }
      for (i = 0; i + 1 < n; i++) quad(pos, A[i], B[i], B[i + 1], A[i + 1], A[i].n);
      return geo(pos);
    }
    /* a blade from base point p, standing along up, chord along fwd (the
       leading edge forward); h tall, chord c0 at the root, c1 at the tip,
       th thick, the tip set back by rake */
    function blade(p, up, fwd, h, c0, c1, th, rake) {
      up = vnorm(up); fwd = vnorm(fwd);
      var sd = vnorm(vcross(up, fwd)), pos = [];
      function P(f, u, s) {
        return [p[0] + fwd[0] * f + up[0] * u + sd[0] * s, p[1] + fwd[1] * f + up[1] * u + sd[1] * s,
                p[2] + fwd[2] * f + up[2] * u + sd[2] * s];
      }
      var r = rake || 0, t = th / 2;
      var a0 = P(c0 / 2, 0, t), a1 = P(-c0 / 2, 0, t), a2 = P(-c0 / 2, 0, -t), a3 = P(c0 / 2, 0, -t);
      var b0 = P(c1 / 2 - r, h, t), b1 = P(-c1 / 2 - r, h, t), b2 = P(-c1 / 2 - r, h, -t), b3 = P(c1 / 2 - r, h, -t);
      quad(pos, a0, a1, b1, b0, sd); quad(pos, a3, a2, b2, b3, [-sd[0], -sd[1], -sd[2]]);
      quad(pos, a0, b0, b3, a3, fwd); quad(pos, a1, a2, b2, b1, [-fwd[0], -fwd[1], -fwd[2]]);
      quad(pos, b0, b1, b2, b3, up);
      return geo(pos);
    }
    /* an eight-faced lamp of radius r at p, in colour hex (vertex colour) */
    function lamp(p, r, hex) {
      var c = [((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255];
      var pos = [], col = [], i, j;
      var X = [[r, 0, 0], [-r, 0, 0]], Y = [[0, r, 0], [0, -r, 0]], Z = [[0, 0, r], [0, 0, -r]];
      for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) for (var k = 0; k < 2; k++) {
        var a = X[i], b = Y[j], d = Z[k];
        pos.push(p[0] + a[0], p[1] + a[1], p[2] + a[2], p[0] + b[0], p[1] + b[1], p[2] + b[2],
                 p[0] + d[0], p[1] + d[1], p[2] + d[2]);
        col.push(c[0], c[1], c[2], c[0], c[1], c[2], c[0], c[1], c[2]);
      }
      return geo(pos, col);
    }
    /* a closed loop of points around a body: f(angle) -> [x,y,z]; the
       normal is taken radially from the axis point ax(angle) */
    function hoop(f, a0, a1, n, ax, w, lift) {
      var pts = [], nr = [], i;
      for (i = 0; i <= n; i++) {
        var a = a0 + (a1 - a0) * i / n, p = f(a), c = ax(a);
        pts.push(p); nr.push([0, p[1] - c[1], p[2] - c[2]]);
      }
      return ribbon(pts, nr, w, lift);
    }

    /* ------------------------------------------------ the paint sheet --
       Four bands on a 1024 x 2048 sheet: from above (x, y), the port side
       (x, z), the starboard side (x, z), from below (x, y). */
    function layout(xmin, xmax, ymax, zmin, zmax) {
      var TW = 1024, TH = 2048, PX = (TW - 4) / (xmax - xmin);
      var PY = Math.min(PX * 1.6, 620 / (2 * ymax)), PZ = Math.min(PX * 1.6, 300 / (zmax - zmin));
      var TOPH = Math.ceil(2 * ymax * PY) + 2, SIDEH = Math.ceil((zmax - zmin) * PZ) + 2;
      var B_PORT = TOPH + 4, B_STBD = B_PORT + SIDEH + 4, B_BOT = B_STBD + SIDEH + 4;
      return { TW: TW, TH: TH, PX: PX, PY: PY, PZ: PZ, XMIN: xmin, YMAX: ymax, ZMAX: zmax,
               TOPH: TOPH, SIDEH: SIDEH, B_PORT: B_PORT, B_STBD: B_STBD, B_BOT: B_BOT };
    }
    function cl(v, a, b) { return v < a ? a : (v > b ? b : v); }
    function projUV(geo2, L) {
      var p = geo2.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
      for (t = 0; t + 8 < p.length; t += 9) {
        var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
        var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        nx /= nl; ny /= nl; nz /= nl;
        var endOn = Math.abs(nx) > 0.85;
        var band = endOn ? (nz < -0.3 ? 3 : 0) : (nz > 0.45 ? 0 : nz < -0.45 ? 3 : (ny >= 0 ? 1 : 2));
        for (k = 0; k < 3; k++) {
          var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, R;
          U = cl((x - L.XMIN) * L.PX, 1, L.TW - 1);
          if (band === 0) R = cl((L.YMAX - y) * L.PY, 1, L.TOPH - 1);
          else if (band === 3) R = L.B_BOT + cl((L.YMAX - y) * L.PY, 1, L.TOPH - 1);
          else R = (band === 2 ? L.B_STBD : L.B_PORT) + cl((L.ZMAX - z) * L.PZ, 1, L.SIDEH - 1);
          uv[(t / 3 + k) * 2] = U / L.TW;
          uv[(t / 3 + k) * 2 + 1] = 1 - R / L.TH;
        }
      }
      geo2.setAttribute("uv", new V.BufferAttribute(uv, 2));
      return geo2;
    }
    function rng(seed) {
      var s = seed >>> 0 || 1;
      return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    }
    /* spec: { frames: [[x, half-width], ...] lines round the body;
               top: [[[x,y],...], ...] polylines seen from above (mirrored
                    to starboard if spec.mirror);
               bot: the same from below; side: [[[x,z],...]] both sides;
               rivets: polylines (above) dotted;
               walk: [[[x,y],...]] walkway outlines (above);
               soot: [[x, y, z, length, width]] streaks running aft;
               grime: count of weathering blots; seam: line darkness 0-1 } */
    function sheet(L, spec, seed) {
      var cv = document.createElement("canvas");
      cv.width = L.TW; cv.height = L.TH;
      var g = cv.getContext("2d"), R = rng(seed || 7), i, j, sd;
      function U(x) { return (x - L.XMIN) * L.PX; }
      function RT(y) { return (L.YMAX - y) * L.PY; }
      function RB(y) { return L.B_BOT + (L.YMAX - y) * L.PY; }
      function RS(z, s) { return (s ? L.B_STBD : L.B_PORT) + (L.ZMAX - z) * L.PZ; }
      g.fillStyle = "#f2f2f2"; g.fillRect(0, 0, L.TW, L.TH);
      for (i = 0; i < (spec.grime || 140); i++) {          /* weathering */
        g.fillStyle = R() < 0.6 ? "rgba(40,40,40," + (0.03 + R() * 0.04) + ")" : "rgba(255,255,255,0.05)";
        g.beginPath(); g.ellipse(R() * L.TW, R() * L.TH, 4 + R() * 26, 2 + R() * 9, 0, 0, Math.PI * 2); g.fill();
      }
      var sa = spec.seam === undefined ? 0.55 : spec.seam;
      var LINE = "rgba(30,32,34," + sa + ")", FAINT = "rgba(30,32,34," + (sa * 0.45) + ")";
      function path(pts, map, col, lw, dash) {
        g.strokeStyle = col || LINE; g.lineWidth = lw || 1.2;
        if (g.setLineDash) g.setLineDash(dash || []);
        g.beginPath();
        for (var k = 0; k < pts.length; k++) {
          var q = map(pts[k]);
          if (k) g.lineTo(q[0], q[1]); else g.moveTo(q[0], q[1]);
        }
        g.stroke();
        if (g.setLineDash) g.setLineDash([]);
      }
      var mirror = spec.mirror !== false;
      function both(list, fT, col, lw, dash) {
        for (j = 0; j < (list || []).length; j++) {
          path(list[j], fT(1), col, lw, dash);
          if (mirror) path(list[j], fT(-1), col, lw, dash);
        }
      }
      both(spec.top, function (m) { return function (q) { return [U(q[0]), RT(m * q[1])]; }; });
      both(spec.bot, function (m) { return function (q) { return [U(q[0]), RB(m * q[1])]; }; });
      both(spec.rivets, function (m) { return function (q) { return [U(q[0]), RT(m * q[1])]; }; }, FAINT, 1, [1, 3]);
      both(spec.rivetsB, function (m) { return function (q) { return [U(q[0]), RB(m * q[1])]; }; }, FAINT, 1, [1, 3]);
      for (j = 0; j < (spec.side || []).length; j++) {
        for (sd = 0; sd < 2; sd++) {
          path(spec.side[j], (function (s) { return function (q) { return [U(q[0]), RS(q[1], s)]; }; })(sd));
        }
      }
      for (j = 0; j < (spec.frames || []).length; j++) {
        var f = spec.frames[j], x = U(f[0]);
        g.strokeStyle = LINE; g.lineWidth = 1.2;
        g.beginPath(); g.moveTo(x, RT(f[1])); g.lineTo(x, RT(-f[1])); g.stroke();
        g.beginPath(); g.moveTo(x, RB(f[1])); g.lineTo(x, RB(-f[1])); g.stroke();
        for (sd = 0; sd < 2; sd++) {
          g.beginPath(); g.moveTo(x, RS(L.ZMAX, sd)); g.lineTo(x, RS(L.ZMAX - L.SIDEH / L.PZ, sd)); g.stroke();
        }
      }
      for (j = 0; j < (spec.walk || []).length; j++) {     /* walkways: a darker, non-slip band */
        for (sd = 1; sd >= (mirror ? -1 : 1); sd -= 2) {
          var w = spec.walk[j];
          g.fillStyle = "rgba(20,22,24,0.16)";
          g.beginPath();
          for (i = 0; i < w.length; i++) { if (i) g.lineTo(U(w[i][0]), RT(sd * w[i][1])); else g.moveTo(U(w[i][0]), RT(sd * w[i][1])); }
          g.closePath(); g.fill();
        }
      }
      for (j = 0; j < (spec.soot || []).length; j++) {     /* exhaust soot, fading aft */
        var s = spec.soot[j], x0 = U(s[0]), x1 = U(s[0] - s[3]), hw = s[4] * L.PY;
        var grd = g.createLinearGradient(x0, 0, x1, 0);
        grd.addColorStop(0, "rgba(25,22,20,0.55)"); grd.addColorStop(1, "rgba(25,22,20,0)");
        g.fillStyle = grd;
        g.fillRect(x1, RT(s[1]) - hw, x0 - x1, 2 * hw);
        g.fillRect(x1, RB(s[1]) - hw, x0 - x1, 2 * hw);
        for (sd = 0; sd < 2; sd++) g.fillRect(x1, RS(s[2], sd) - s[4] * L.PZ, x0 - x1, 2 * s[4] * L.PZ);
      }
      var tex = new V.CanvasTexture(cv);
      tex.wrapS = tex.wrapT = V.ClampToEdgeWrapping;
      tex.anisotropy = 4;
      return tex;
    }
    return { ribbon: ribbon, blade: blade, lamp: lamp, hoop: hoop, layout: layout, projUV: projUV,
             sheet: sheet, geo: geo, quad: quad };
  }

  /* ============================================================ details ==
     (the redo) The shells were a smooth tube with crossed-plank blades. What
     every Skyraider photograph shows and is now drawn ("Skyraider AEW1 778
     RNAS Culdrose" and the AD-4 / AD-5 BuAer drawings named above; the
     AD-4 racks and exhausts are on every period photograph of the type):
       - the propeller as four broad paddles, pitched, round-tipped;
       - the R-3350's exhaust stubs, eight a side in a curved row behind the
         cowl flaps, and the ring of cowl flaps;
       - the fuselage dive brakes' outlines either side aft of the wing and
         the body's panel breaks; the canopy rail;
       - the wing's flap and aileron hinge lines, the fold joint (its span
         station, 3.0 m, read off the plan view: NOT CONFIRMED to the
         centimetre), and on the AD-4 the twelve outer-wing bomb racks and
         the two inner station pylons, empty;
       - the radio mast behind the canopy, the pitot under the starboard
         tip, the position lamps;
       - a grey-scale paint sheet over the coats: panel lines, rivet rows,
         the wing-root walkways, exhaust soot down the fuselage sides. */
  function fusSidePt(ft, x, z, sd, push) {
    var zt = tabAt(ft, "zt", x), zb = tabAt(ft, "zb", x), hw = tabAt(ft, "hw", x), e = 2.3;
    var zc = (zt + zb) / 2, b = (zt - zb) / 2, v = clamp(Math.abs(z - zc) / b, 0, 0.999);
    var s = Math.pow(v, e / 2), c = Math.sqrt(1 - s * s), y = hw * Math.pow(c, 2 / e);
    var ny = y / (hw * hw), nz = (z - zc) / (b * b), nl = Math.sqrt(ny * ny + nz * nz) || 1;
    return [x, sd * (y + (push || 0) * ny / nl), z + (push || 0) * nz / nl];
  }
  function fusHoop(DXk, ft, x, w) {
    var zt = tabAt(ft, "zt", x), zb = tabAt(ft, "zb", x), hw = tabAt(ft, "hw", x), zc = (zt + zb) / 2, b = (zt - zb) / 2;
    return DXk.hoop(function (a) {
      var c = Math.cos(a), s = Math.sin(a);
      return [x, hw * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), 2 / 2.3), zc + b * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), 2 / 2.3)];
    }, 0, Math.PI * 2, 32, function () { return [x, 0, zc]; }, w || 0.035, 0.01);
  }
  function wPt(y, f, sg) {
    var st = wst(Math.abs(y)), c = st[1] - st[2];
    return [st[1] - f * c, y, st[3] + sg * yt(f, st[4] / c) * c];
  }
  function wLine(DXk, y0, y1, f0, f1, sg, n) {
    var pts = [], i;
    for (i = 0; i <= n; i++) pts.push(wPt(y0 + (y1 - y0) * i / n, f0 + (f1 - f0) * i / n, sg));
    return DXk.ribbon(pts, [0, 0, sg], 0.035, 0.01);
  }
  /* one paddle blade: root to tip along the direction a (round the shaft,
     from straight up), the chord pitched p radians to the disc */
  function paddle(x, cz, a, R, p) {
    var ST = [[0.30, 0.09, 0.05], [0.55, 0.20, 0.035], [1.0, 0.27, 0.025], [1.5, 0.28, 0.02],
              [1.85, 0.24, 0.016], [2.0, 0.14, 0.012], [2.05, 0.03, 0.01]];
    var er = [Math.sin(a), Math.cos(a)], et = [Math.cos(a), -Math.sin(a)], rings = [];
    ST.forEach(function (q) {
      var r = q[0] * R / 2.05, hc = q[1], th = q[2], ring = [], k;
      var pp = p * (1 - 0.35 * q[0] / 2.05);
      var C4 = [[hc, 0], [0, th], [-hc, 0], [0, -th]];
      for (k = 0; k < 4; k++) {
        var u = C4[k][0], w = C4[k][1];
        var dx = u * Math.sin(pp) + w * Math.cos(pp), dt = u * Math.cos(pp) - w * Math.sin(pp);
        ring.push([x + dx, er[0] * r + et[0] * dt, cz + er[1] * r + et[1] * dt]);
      }
      rings.push(ring);
    });
    return loft(rings);
  }

  function makeMats(C, Q, tex) {
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
    m.blade = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.6, metalness: 0.3, side: V.DoubleSide });
    m.seam = new V.MeshStandardMaterial({ color: new V.Color(Q ? 0x98a2a8 : 0x24406c).multiplyScalar(Q ? 0.5 : 0.35), roughness: 0.8,
                                          metalness: 0.05, side: V.DoubleSide });
    m.lamp = new V.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.3, metalness: 0.0,
                                          emissive: 0x333333, emissiveIntensity: 0.6 });
    if (tex) { m.skin.map = tex; m.under.map = tex; }
    return m;
  }


  function details(K, ft, X, Q, NX) {
    var D = DXK, sd, i, j;
    /* cowl flaps round the cowl's rear edge, the exhaust stubs behind them */
    for (i = 0; i < 22; i++) {
      var a = i / 22 * Math.PI * 2, c = Math.cos(a), sn = Math.sin(a);
      var fl = box(0.30, 0.20, 0.025, 4.06 + NX, 0, 0);
      fl.rotateX(a + Math.PI / 2); fl.translate(0, 0.755 * c, CZ + 0.755 * sn);
      K.ink.push(fl);
    }
    for (sd = -1; sd <= 1; sd += 2) {
      for (j = 0; j < 8; j++) {
        var an = (-52 + j * 13) * Math.PI / 180, ry = 0.80 * Math.cos(an), rz = CZ + 0.80 * Math.sin(an);
        var x0 = 3.86 - 0.05 * (j % 2);
        K.ink.push(rod([x0 + 0.04, sd * (ry - 0.03), rz], [x0 - 0.16, sd * (ry + 0.05), rz - 0.01], 0.045, 6));
      }
    }
    /* body panel breaks: the firewall (round the sides and belly), frames aft */
    var FX = Q ? [-1.0, -2.1, -3.2, -4.3] : [0.45, -0.9, -2.1, -3.2, -4.3];
    for (i = 0; i < FX.length; i++) K.seam.push(fusHoop(D, ft, X(FX[i])));
    var xf = X(3.72), ztf = tabAt(ft, "zt", xf), zbf = tabAt(ft, "zb", xf), hwf = tabAt(ft, "hw", xf), zcf = (ztf + zbf) / 2, bf = (ztf - zbf) / 2;
    K.seam.push(D.hoop(function (a) {
      var c = Math.cos(a), sn = Math.sin(a);
      return [xf, hwf * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), 2 / 2.3), zcf + bf * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), 2 / 2.3)];
    }, 0.72 * Math.PI, 2.28 * Math.PI, 26, function () { return [xf, 0, zcf]; }, 0.04, 0.01));
    for (sd = -1; sd <= 1; sd += 2) {
      /* the side dive brake: its outline aft of the wing */
      var br = [[-0.30, 0.62], [-1.75, 0.62], [-1.75, -0.40], [-0.30, -0.48], [-0.30, 0.62]], bp = [], bn = [];
      for (i = 0; i < br.length; i++) {
        var p = fusSidePt(ft, X(br[i][0]), br[i][1], sd, 0.012);
        bp.push(p); bn.push([0, sd, 0]);
        if (i + 1 < br.length) {
          for (j = 1; j < 4; j++) {
            var t = j / 4, q = fusSidePt(ft, X(br[i][0] + (br[i + 1][0] - br[i][0]) * t), br[i][1] + (br[i + 1][1] - br[i][1]) * t, sd, 0.012);
            bp.push(q); bn.push([0, sd, 0]);
          }
        }
      }
      K.seam.push(D.ribbon(bp, bn, 0.04, 0));
      /* a longeron seam along the side */
      var lp = [], ln = [];
      for (i = 0; i <= 10; i++) { var xx = X(3.6 - i * 0.92); lp.push(fusSidePt(ft, xx, 0.42 - 0.03 * i, sd, 0.012)); ln.push([0, sd, 0]); }
      K.seam.push(D.ribbon(lp, ln, 0.035, 0));
      /* wing: spar, flap / aileron hinge lines top and bottom, the fold joint */
      K.seam.push(wLine(D, sd * 0.8, sd * 7.25, 0.74, 0.74, 1, 10));
      K.seam.push(wLine(D, sd * 0.8, sd * 7.25, 0.74, 0.74, -1, 10));
      K.seam.push(wLine(D, sd * 0.8, sd * 7.25, 0.18, 0.18, 1, 10));
      K.seam.push(wLine(D, sd * 4.9, sd * 4.9, 0.74, 1.0, 1, 4));
      K.seam.push(wLine(D, sd * 3.0, sd * 3.0, 0.0, 1.0, 1, 8));
      K.seam.push(wLine(D, sd * 3.0, sd * 3.0, 0.0, 1.0, -1, 8));
      if (!Q) {
        /* the twelve outer racks and the two inner station pylons, empty */
        for (i = 0; i < 6; i++) {
          var y = 4.45 + 0.5 * i, pb = wPt(sd * y, 0.36, -1);
          K.metal.push(box(0.62, 0.05, 0.09, pb[0], pb[1], pb[2] - 0.045));
          K.ink.push(box(0.10, 0.04, 0.07, pb[0] + 0.20, pb[1], pb[2] - 0.11));
          K.ink.push(box(0.10, 0.04, 0.07, pb[0] - 0.20, pb[1], pb[2] - 0.11));
        }
        var pi = wPt(sd * 1.75, 0.30, -1);
        K.skin.push(box(1.45, 0.09, 0.22, pi[0], pi[1], pi[2] - 0.09));
        K.metal.push(box(0.9, 0.05, 0.05, pi[0], pi[1], pi[2] - 0.22));
      }
      /* position lamps: red to port, green to starboard */
      var lt = wPt(sd * 7.55, 0.35, 1);
      K.lamp.push(D.lamp([lt[0], lt[1], lt[2]], 0.05, sd > 0 ? 0xe02218 : 0x18c04a));
    }
    /* the canopy rails */
    var cn = Q ? CAN5 : CAN4;
    for (sd = -1; sd <= 1; sd += 2) {
      var rp = [], rn = [];
      for (i = 0; i < cn.r.length; i++) { rp.push([X(cn.r[i][0]), sd * (cn.r[i][2] + 0.01), cn.zb + 0.01]); rn.push([0, sd, 0.3]); }
      K.ink.push(D.ribbon(rp, rn, 0.05, 0.005));
    }
    /* radio mast behind the AD-4's hood; the pitot under the starboard tip */
    if (!Q) K.ink.push(D.blade([X(0.55), 0, tabAt(ft, "zt", X(0.55)) - 0.01], [0, 0, 1], [1, 0, 0], 0.38, 0.22, 0.08, 0.025, 0.16));
    var pt = wPt(-6.9, 0.25, -1);
    K.metal.push(rod([pt[0], pt[1], pt[2] - 0.02], [pt[0] + 0.55, pt[1], pt[2] - 0.08], 0.014, 5));
    /* the tail lamp and the beacon under the belly */
    K.lamp.push(D.lamp([X(-5.875), 0, 0.12], 0.04, 0xf4f1e0));
    K.lamp.push(D.lamp([X(-1.2), 0, tabAt(ft, "zb", X(-1.2)) - 0.03], 0.06, 0xe02218));
  }
  var _sheets = {};
  function paintSheet(ft, X, Q) {
    var id = Q ? "Q" : "A";
    if (_sheets[id] !== undefined) return _sheets[id];
    try {
      var top = [], bot = [], riv = [], side = [], fr = [], y, i;
      function wl(f, y0, y1) {
        var out = [], k;
        for (k = 0; k <= 6; k++) { var yy = y0 + (y1 - y0) * k / 6, w = wst(yy); out.push([w[1] - f * (w[1] - w[2]), yy]); }
        return out;
      }
      top.push(wl(0.18, 0.8, 7.5), wl(0.74, 0.8, 7.5), wl(0.45, 0.8, 7.5));
      bot.push(wl(0.18, 0.8, 7.5), wl(0.74, 0.8, 7.5));
      riv.push(wl(0.30, 0.8, 7.5), wl(0.60, 0.8, 7.5));
      for (y = 1.4; y < 7.5; y += 0.8) { var w = wst(y); top.push([[w[1], y], [w[2], y]]); bot.push([[w[1], y], [w[2], y]]); }
      [3.72, 2.6, 0.45, -0.9, -2.1, -3.2, -4.3, -5.2].forEach(function (x) { fr.push([X(x), tabAt(ft, "hw", X(x))]); });
      side.push([[X(3.7), 0.42], [X(-5.6), 0.30]], [[X(3.7), -0.40], [X(-4.5), -0.20]]);
      _sheets[id] = DXK.sheet(LAY, {
        frames: fr, top: top, bot: bot, rivets: riv, side: side, seam: 0.55, grime: 160,
        walk: [[[0.5, 0.75], [2.9, 0.75], [2.9, 1.35], [0.5, 1.35]]],
        soot: [[3.8, 0.0, 0.05, 3.4, 0.22], [3.8, 0.0, -0.25, 2.6, 0.12]]
      }, Q ? 4401 : 4402);
    } catch (e) { _sheets[id] = false; }
    return _sheets[id];
  }

  function build(THREE, M, C, kind) {
    V = THREE;
    var Q = kind === "Q", tab = Q ? AD5 : AD4, side, i, j;
    var X = Q ? function (x) { return x * 1.0296; } : function (x) { return x; };    /* AD-5 fuselage 12.19 m long */
    var K = { skin: [], under: [], team: [], metal: [], ink: [], glass: [], propDisc: [], propBlade: [], blade: [], seam: [], lamp: [] };
    DXK = DK(V);
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
    /* four paddle blades, pitched (the redo; they were two crossed planks) */
    [20, 110, 200, 290].forEach(function (d) { K.blade.push(paddle(5.70 + NX, CZ, d * Math.PI / 180, 2.05, 0.42)); });

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

    details(K, ft, X, Q, NX);
    LAY = DXK.layout(-6.3, 6.1, 7.7, -2.0, 3.0);
    var mats = makeMats(C, Q, paintSheet(ft, X, Q));
    var root = new V.Group();
    emit(root, K, mats, ["skin", "under", "team", "seam", "ink", "glass", "metal", "blade", "lamp", "propDisc", "propBlade"]);
    var gear = new V.Group(); gear.name = "gear";
    emit(gear, G, mats, ["metal", "tyre"]);
    root.add(gear);
    return root;
  }
  return { build: build };
})();

UNIT_MODELS["nato_e50_cas"] = { len: 11.84, build: function (THREE, M, C) { return HeroSkyraider.build(THREE, M, C, "AD4"); } };
UNIT_MODELS["nato_e50_ewair"] = { len: 12.19, build: function (THREE, M, C) { return HeroSkyraider.build(THREE, M, C, "Q"); } };
