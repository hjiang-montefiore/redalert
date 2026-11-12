/* ========== us_a7_corsair.js - HERO MODEL: LTV A-7D Corsair II (e60, NATO) ==========

   Row nato_e60_cas, "LTV A-7D Corsair II", service 1968 (the row text also
   names the Navy A-7A from 1967). The USAF A-7D is drawn: the Allison TF41
   engine, the M61A1 Vulcan in the port forward fuselage, no probe on the
   nose (the boom receptacle on the spine instead), a land-based aircraft
   with the land-field arrestor hook.

   ---- 2026-11-12 review rework (geometry, against [P1] [P2] [P3]) ----
   The visual review found the first model crude: a slab-sided body of
   round sections, an oversize fin, plank wings and 1.4 m team squares on
   the wings. Everything is rebuilt here on the kit of js/hero/nato_e80_fighter.js
   (F-15C) and js/hero/us_ef111a.js: superellipse ring lofts for the body
   and the chin intake, aerofoil lofts for every flying surface, ribbon
   seams, blade aerials and lamps laid on the skin, and one projected
   grey-scale paint sheet (panel lines, rivets, walkways, soot, grime).
   The kit is copied into this file (nato_e80_fighter.js exports none of it).

   References (Wikimedia Commons, fetched 2026-11-12, one at a time; cached
   in the agent scratchpad rw_air2/ref_a7):
     [P1] "LTV A-7 Corsair II 3-view line drawing.gif" (1200 px render):
          plan (nose py 75, tail cone py 687 = 43.5 px/m on the published
          14.06 m), side (nose px 564, fin-tip trailing edge px 1168 =
          43.0 px/m), front (span 502 px = 42.5 px/m on 11.80 m). Every
          table below is read off it (column and row scans of the outline).
     [P2] "LTV A-7D Corsair II '69-197 - VA' (18244220519).jpg": an A-7D
          parked, port bow: the deep fuselage, the chin intake standing
          forward under the radome with its thick rounded lip, the shoulder
          wing, the twin nose wheels, the main legs out of the belly, the
          wing pylons with their sway braces.
     [P3] "Frontiers of Flight Museum December 2015 072 (LTV A-7 Corsair
          II).jpg": a Navy A-7 from the starboard bow, close: the intake
          mouth (a wide oval with a heavy lip, the duct turning up behind
          it), the canopy frame, the gear legs and doors.
     [W]  en.wikipedia "LTV A-7 Corsair II": length 46 ft 2 in (14.06 m),
          span 38 ft 9 in (11.80 m), height 16 ft 0.75 in (4.90 m), wing
          area 375 sq ft (34.8 m2).

   Measured off [P1] (s = metres aft of the radome tip):
     radome tip z 0.19 (the axis z 0 is 0.6 m above the belly line... see
       BODY); intake mouth s 0.45, top lip z -0.02, bottom lip -0.80, half
       width 0.50 [P1 plan s 0.3-0.8; P3];
     canopy: windscreen base s 0.80, crown z 1.38 at s 2.1-2.8, rear s 3.6;
     spine z 1.30 from s 3.6 to the fin; belly z -0.95 from s 4.4 to 8.0,
       rising to -0.17 at s 13.3; tail cone ends at s 13.42, the jet pipe
       centred z 0.30;
     fuselage half-width 0.80 (plan, s 4 - 11);
     wing: leading edge s 4.92 at y 0.80 to 9.33 at the tip y 5.84
       (41 deg), trailing edge 9.15 to 10.63; anhedral 6 deg [P1 front;
       published 5]; root chord plane z 1.02 (shoulder wing, [P1] front);
     tailplane: LE 11.05 at y 0.45 to 13.30 at the tip y 2.62, TE 13.2 to
       13.80, z 0.17;
     fin: LE from s 9.96 at the spine (z 1.25) at 54 deg to the cropped tip
       at z 3.45 (LE 12.92), TE from s 13.2 at z 0.9 to 14.04 at the tip.
   As drawn: 14.04 x 11.84 x 5.46 m (L x W x H; the span over the nav
   lamps). Published 14.06 x 11.80 x
   4.90. HEIGHT IS NOT FITTED: [P1] puts the fin top 4.51 m above the belly
   line (side view; its front view gives 4.3 m), and [P2]'s nose wheel
   (taken as 0.56 m) puts the belly about 1.0 m above the ground, so the
   fin top stands 5.46 m up. The first model's 4.90 m came from a fin 0.8 m
   lower than [P1] draws it. Which is wrong - the drawing's fin or the
   quoted height - is NOT CONFIRMED.
   NOT CONFIRMED: the gear (nose s 3.3, mains s 8.3 on a 2.9 m track, leg
   lengths, the doors; placed from [P2] [P3], not measured); the receptacle
   station (aar_recept, s 4.4 on the port side of the spine, from the
   type's known layout); fittings sizes (seams, aerials, lamps, pitot).
   PAINT: plain (AGENT_POLICY 6): the first model's procedural SEA
   camouflage blotches are gone; FS 34102 green above, FS 36622 light
   grey below, the radome a shade darker. Team colour in small strips: a
   band across the fin, the wing tips, a strip on the spine (no wing
   squares).
   Model space: +X nose, +Y port, +Z up, metres; X = NOSE - s. "gear" is
   the landing gear group; "aar_recept" an Object3D. len 14.06 kept.
*/
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";
  var NOSE = 7.03;
  function X(s) { return NOSE - s; }
  var V = null;
  var D2R = Math.PI / 180;
  function sgp(v, e) { return v < 0 ? -Math.pow(-v, e) : Math.pow(v, e); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function cr(p0, p1, p2, p3, t) {
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t +
                  (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
  }
  function tab(rows, s) {
    var n = rows.length, i = 0, k, out = [];
    if (s <= rows[0][0]) return rows[0].slice(1);
    if (s >= rows[n - 1][0]) return rows[n - 1].slice(1);
    while (rows[i + 1][0] < s) i++;
    var a = rows[Math.max(i - 1, 0)], b = rows[i], c = rows[i + 1], d = rows[Math.min(i + 2, n - 1)];
    var t = (s - b[0]) / (c[0] - b[0]);
    for (k = 1; k < b.length; k++) out.push(cr(a[k], b[k], c[k], d[k], t));
    return out;
  }
  /* ------------------------------------------------------------ shells --
     (us_e2_hawkeye.js) every skin a ring loft, each triangle wound away
     from the inside of its ring pair, the normals smoothed. */
  var K = null, G = null;
  function put(key, g) { (K[key] || (K[key] = [])).push(g); }
  function gput(key, g) { (G[key] || (G[key] = [])).push(g); }
  function Shell() { this.P = []; this.T = []; }
  Shell.prototype.vert = function (p) { this.P.push(p); return this.P.length - 1; };
  Shell.prototype.tri = function (a, b, c, cat, od) {
    var P = this.P, pa = P[a], pb = P[b], pc = P[c];
    var ux = pb[0] - pa[0], uy = pb[1] - pa[1], uz = pb[2] - pa[2];
    var vx = pc[0] - pa[0], vy = pc[1] - pa[1], vz = pc[2] - pa[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    if (nx * od[0] + ny * od[1] + nz * od[2] < 0) { var t = b; b = c; c = t; }
    this.T.push([a, b, c, cat]);
  };
  Shell.prototype.fan = function (ring, c, ref, cat) {
    var n = ring.length, ic = this.vert(c), ids = [], i;
    var od = [c[0] - ref[0], c[1] - ref[1], c[2] - ref[2]];
    for (i = 0; i < n; i++) ids.push(this.vert(ring[i]));
    for (i = 0; i < n; i++) this.tri(ic, ids[i], ids[(i + 1) % n], cat, od);
  };
  Shell.prototype.loft = function (rings, catOf, capA, capB) {
    var R = rings.length, n = rings[0].length, r, i, j, idx = [], cent = [];
    for (r = 0; r < R; r++) {
      var row = [], cx = 0, cy = 0, cz = 0;
      for (i = 0; i < n; i++) { var p = rings[r][i]; row.push(this.vert(p)); cx += p[0]; cy += p[1]; cz += p[2]; }
      idx.push(row); cent.push([cx / n, cy / n, cz / n]);
    }
    for (r = 0; r + 1 < R; r++) {
      var mc = [(cent[r][0] + cent[r + 1][0]) / 2, (cent[r][1] + cent[r + 1][1]) / 2, (cent[r][2] + cent[r + 1][2]) / 2];
      for (i = 0; i < n; i++) {
        j = (i + 1) % n;
        var A = rings[r][i], B = rings[r][j], C = rings[r + 1][j], D = rings[r + 1][i];
        var od = [(A[0] + B[0] + C[0] + D[0]) / 4 - mc[0], (A[1] + B[1] + C[1] + D[1]) / 4 - mc[1],
                  (A[2] + B[2] + C[2] + D[2]) / 4 - mc[2]];
        var cat = catOf(i, r);
        this.tri(idx[r][i], idx[r][j], idx[r + 1][j], cat, od);
        this.tri(idx[r][i], idx[r + 1][j], idx[r + 1][i], cat, od);
      }
    }
    if (capA) this.fan(rings[0], cent[0], cent[1], capA);
    if (capB) this.fan(rings[R - 1], cent[R - 1], cent[R - 2], capB);
  };
  Shell.prototype.emit = function (into) {
    var P = this.P, Tr = this.T, N = [], i, k;
    for (i = 0; i < P.length; i++) N.push([0, 0, 0]);
    for (k = 0; k < Tr.length; k++) {
      var t = Tr[k], pa = P[t[0]], pb = P[t[1]], pc = P[t[2]];
      var ux = pb[0] - pa[0], uy = pb[1] - pa[1], uz = pb[2] - pa[2];
      var vx = pc[0] - pa[0], vy = pc[1] - pa[1], vz = pc[2] - pa[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      for (i = 0; i < 3; i++) { var q = N[t[i]]; q[0] += nx; q[1] += ny; q[2] += nz; }
    }
    for (i = 0; i < N.length; i++) {
      var m = Math.sqrt(N[i][0] * N[i][0] + N[i][1] * N[i][1] + N[i][2] * N[i][2]) || 1;
      N[i][0] /= m; N[i][1] /= m; N[i][2] /= m;
    }
    var by = {};
    for (k = 0; k < Tr.length; k++) {
      var cat = Tr[k][3];
      if (!by[cat]) by[cat] = { pos: [], nor: [] };
      for (i = 0; i < 3; i++) {
        var p = P[Tr[k][i]], nn = N[Tr[k][i]];
        by[cat].pos.push(p[0], p[1], p[2]); by[cat].nor.push(nn[0], nn[1], nn[2]);
      }
    }
    for (var key in by) {
      var g = new V.BufferGeometry();
      g.setAttribute("position", new V.Float32BufferAttribute(by[key].pos, 3));
      g.setAttribute("normal", new V.Float32BufferAttribute(by[key].nor, 3));
      if (into) (into[key] || (into[key] = [])).push(g); else put(key, g);
    }
  };
  function loftTo(rings, cat, capA, capB, into) {
    var sh = new Shell();
    sh.loft(rings, function () { return cat; }, capA ? cat : null, capB ? cat : null);
    sh.emit(into);
  }
  /* a superellipse ring at x about (yc, zw): half-width w, top zt, bottom zb */
  function ringSE(x, yc, w, zt, zb, zw, eU, eL, n) {
    var out = [], j;
    for (j = 0; j < n; j++) {
      var t = j / n * Math.PI * 2, c = Math.cos(t), s = Math.sin(t), e = s >= 0 ? 2 / eU : 2 / eL;
      out.push([x, yc + w * sgp(c, e), s >= 0 ? zw + (zt - zw) * sgp(s, e) : zw + (zw - zb) * sgp(s, e)]);
    }
    return out;
  }
  /* aerofoil rings: frame "w" a section across the span at y = a, chord
     plane z = o; frame "f" a section up a fin at z = a, on y = o. s the
     leading edge's station, c the chord, t the thickness ratio */
  var FK = 9;
  function foilTh(t, c, u) {
    return t * c * (1.4845 * Math.sqrt(u) - 0.63 * u - 1.758 * u * u + 1.4215 * u * u * u - 0.518 * u * u * u * u);
  }
  function foilRing(sec, frame) {
    var up = [], lo = [], j, u, th, ring = [];
    for (j = 0; j <= FK; j++) {
      u = (1 - Math.cos(Math.PI * j / FK)) / 2;
      th = foilTh(sec.t, sec.c, u);
      if (frame === "w") { up.push([X(sec.s + u * sec.c), sec.a, sec.o + th]); lo.push([X(sec.s + u * sec.c), sec.a, sec.o - th]); }
      else { up.push([X(sec.s + u * sec.c), sec.o + th, sec.a]); lo.push([X(sec.s + u * sec.c), sec.o - th, sec.a]); }
    }
    for (j = 0; j <= FK; j++) ring.push(up[j]);
    for (j = FK - 1; j >= 1; j--) ring.push(lo[j]);
    return ring;
  }
  function foilLoft(secs, frame, cat) {
    loftTo(secs.map(function (q) { return foilRing(q, frame); }), cat, true, true);
  }
  function rod(a, b, r, seg, r2) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r2 === undefined ? r : r2, r, L, seg || 8);
    var q = new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L));
    var m = new V.Matrix4().makeRotationFromQuaternion(q);
    m.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(m); return g;
  }
  function boxG(sx, sy, sz, x, y, z) { var g = new V.BoxGeometry(sx, sy, sz); g.translate(x, y, z); return g; }
  function wheelG(r, w, x, y, z, seg) { var g = new V.CylinderGeometry(r, r, w, seg || 20); g.translate(x, y, z); return g; }
  var DX_ = null, LAY = null;
  function merge(list) {
    var pos = [], nor = [], col = [], i, j, anyCol = false;
    for (i = 0; i < list.length; i++) if (list[i].attributes.color) anyCol = true;
    for (i = 0; i < list.length; i++) {
      var g = list[i].index ? list[i].toNonIndexed() : list[i];
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array, c = g.attributes.color ? g.attributes.color.array : null;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); if (anyCol) col.push(c ? c[j] : 1); }
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    if (anyCol) out.setAttribute("color", new V.Float32BufferAttribute(col, 3));
    return out;
  }
  function emit(parent, lists, M2, order) {
    order.forEach(function (key) {
      if (!lists[key] || !lists[key].length) return;
      var geo = merge(lists[key]);
      if (M2[key].map && LAY) DX_.projUV(geo, LAY);
      parent.add(new V.Mesh(geo, M2[key]));
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
      if (spec.base) spec.base(g, U, RT, RB, RS);       /* colour fields under the lines */
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

  /* ============================================================ helpers */
  /* a flat plate cut to a polygon in the (x, z) plane, standing at y0, th thick */
  function plateXZ(poly, y0, th) {
    var sh = new V.Shape(), i;
    sh.moveTo(poly[0][0], poly[0][1]);
    for (i = 1; i < poly.length; i++) sh.lineTo(poly[i][0], poly[i][1]);
    var g = new V.ExtrudeGeometry(sh, { depth: th, bevelEnabled: false });
    g.rotateX(Math.PI / 2);
    g.translate(0, y0 + th / 2, 0);
    return g;
  }
  /* a round body of revolution along x: rows [s, r], centre (yc, zc) */
  function tube(rows, yc, zc, n, cat, into) {
    loftTo(rows.map(function (q) { var r = Math.max(q[1], 0.004); return ringSE(X(q[0]), yc, r, zc + r, zc - r, zc, 2, 2, n); }),
           cat, true, true, into);
  }

  /* ============================================================ the body ==
     Rows: s, half-width, top z, bottom z, the widest line z, squareness
     above and below (2 round, higher flatter). [P1] side top / bottom lines
     and plan widths; the sections squared off as [P2] shows the deep,
     flat-sided A-7 fuselage. Forward of s 0.85 this is the radome alone,
     sitting on the chin intake (INT below). */
  var BODY = [
    [0.00, 0.020, 0.21, 0.17, 0.19, 2.0, 2.0],
    [0.12, 0.160, 0.36, 0.03, 0.20, 2.0, 2.0],
    [0.30, 0.250, 0.50, -0.05, 0.22, 2.0, 2.0],
    [0.55, 0.310, 0.62, -0.09, 0.24, 2.1, 2.1],
    [0.85, 0.380, 0.76, -0.12, 0.26, 2.3, 2.2],
    [1.30, 0.500, 0.84, -0.30, 0.24, 2.6, 2.4],
    [1.90, 0.620, 0.90, -0.60, 0.20, 2.8, 2.8],
    [2.60, 0.710, 0.97, -0.85, 0.18, 3.0, 3.0],
    [3.30, 0.770, 1.05, -0.92, 0.15, 3.2, 3.2],
    [4.20, 0.800, 1.30, -0.95, 0.15, 3.0, 3.4],
    [6.00, 0.800, 1.30, -0.95, 0.15, 3.0, 3.4],
    [8.00, 0.790, 1.30, -0.95, 0.15, 3.0, 3.4],
    [9.50, 0.780, 1.29, -0.80, 0.18, 3.0, 3.2],
    [10.7, 0.740, 1.25, -0.67, 0.22, 3.0, 3.0],
    [11.65, 0.680, 1.17, -0.51, 0.27, 2.8, 2.8],
    [12.35, 0.600, 1.07, -0.40, 0.30, 2.6, 2.6],
    [12.85, 0.530, 0.98, -0.30, 0.32, 2.4, 2.4],
    [13.20, 0.470, 0.84, -0.19, 0.32, 2.2, 2.2],
    [13.42, 0.420, 0.72, -0.12, 0.30, 2.0, 2.0]
  ];
  var BST = [0, 0.04, 0.12, 0.22, 0.32, 0.45, 0.6, 0.85, 1.1, 1.4, 1.75, 2.1, 2.6, 3.0, 3.3, 3.7, 4.2, 5.0, 6.0,
             7.0, 8.0, 8.8, 9.5, 10.1, 10.7, 11.2, 11.65, 12.0, 12.35, 12.6, 12.85, 13.05, 13.2, 13.32, 13.42];
  var BN = 30;
  function bodyPt(s, a, push) {
    var r = tab(BODY, s);
    var c = Math.cos(a), sn = Math.sin(a), e = sn >= 0 ? 2 / r[4] : 2 / r[5];
    var y = r[0] * sgp(c, e), z = sn >= 0 ? r[3] + (r[1] - r[3]) * sgp(sn, e) : r[3] + (r[3] - r[2]) * sgp(sn, e);
    if (push) { var dz = z - r[3], L = Math.sqrt(y * y + dz * dz) || 1; y += push * y / L; z += push * dz / L; }
    return [X(s), y, z];
  }
  function bodyRing(s) {
    var ring = [], i;
    for (i = 0; i < BN; i++) ring.push(bodyPt(s, i / BN * Math.PI * 2, 0));
    return ring;
  }
  function addBody() {
    var rings = [], rad = [], r;
    for (r = 0; r < BST.length; r++) {
      var ring = bodyRing(BST[r]);
      if (BST[r] <= 0.85) rad.push(ring);
      if (BST[r] >= 0.85) rings.push(ring);
    }
    loftTo(rad, "radome", true, false);
    loftTo(rings, "skin", false, false);
  }

  /* ======================================================= chin intake ==
     [P1 side: mouth at s 0.45, top lip under the radome z -0.02, bottom lip
     z -0.80; plan: half-width 0.50 at the lip, 0.64 by s 1.7] [P2, P3: a
     wide oval with a heavy rounded lip, the bottom lip standing a little
     ahead of the top]. Rows: s, half-width, top, bottom, squareness. */
  var INT = [
    [0.45, 0.50, -0.02, -0.80, 2.4],
    [0.75, 0.54, 0.00, -0.83, 2.5],
    [1.20, 0.58, 0.05, -0.87, 2.6],
    [1.80, 0.62, 0.12, -0.90, 2.8],
    [2.50, 0.66, 0.20, -0.92, 3.0],
    [3.10, 0.70, 0.25, -0.93, 3.1]
  ];
  function intRing(s, n, inset) {
    var q = tab(INT, s), k = inset || 0;
    return ringSE(X(s), 0, q[0] - k, q[1] - k, q[2] + k, (q[1] + q[2]) / 2, q[3], q[3], n);
  }
  function rakeLip(ring, top, bot) {
    return ring.map(function (p) { var t = clamp((top - p[2]) / (top - bot), 0, 1); return [p[0] + 0.10 * t, p[1], p[2]]; });
  }
  function addIntake() {
    var ST = [0.45, 0.6, 0.75, 1.0, 1.2, 1.5, 1.8, 2.2, 2.5, 2.8, 3.1], rings = [], r;
    for (r = 0; r < ST.length; r++) {
      var rg = intRing(ST[r], 28, 0);
      if (ST[r] < 0.6) rg = rakeLip(rg, -0.02, -0.80);
      rings.push(rg);
    }
    loftTo(rings, "skin", false, false);
    /* the heavy lip rolled in, then the dark duct turning up to the fan */
    var lip1 = rakeLip(intRing(0.50, 28, 0.06), -0.08, -0.74);
    var lip2 = intRing(0.70, 28, 0.10);
    loftTo([rings[0], lip1], "skin", false, false);
    loftTo([lip1, lip2], "metal", false, false);
    var deep = intRing(2.2, 28, 0.16).map(function (p) { return [p[0], p[1], p[2] + 0.12]; });
    loftTo([lip2, deep], "ink", false, true);
  }

  /* =========================================================== canopy ==
     [P1 side; P2, P3]: the raked one-piece windscreen and the long hood
     sliding into the spine. Rows: s, half-width, sill z, crown z. */
  var CAN = [[0.80, 0.10, 0.74, 0.78], [1.20, 0.36, 0.80, 1.02], [1.65, 0.46, 0.86, 1.22], [2.15, 0.50, 0.92, 1.36],
             [2.80, 0.50, 0.98, 1.38], [3.30, 0.44, 1.04, 1.35], [3.60, 0.30, 1.10, 1.32]];
  function addCanopy() {
    var D = DX_;
    var rings = CAN.map(function (q) { return ringSE(X(q[0]), 0, q[1], q[3], q[2], q[2], 2.4, 2.0, 24).slice(0, 13); });
    loftTo(rings, "glass", false, false);
    var last = CAN[CAN.length - 1], s0 = last[0];
    var SP = [[s0 - 0.05, last[1] + 0.01, last[3] + 0.005], [s0 + 0.35, last[1] * 0.78, last[3] - 0.01],
              [s0 + 0.75, last[1] * 0.50, last[3] - 0.03], [s0 + 1.10, 0.10, 1.30]];
    loftTo(SP.map(function (q) { return ringSE(X(q[0]), 0, q[1], q[2], last[2] - 0.05, last[2] - 0.05, 2.4, 2.0, 24).slice(0, 13); }),
           "skin", false, true);
    /* frames: the windscreen's rear bow, the hood's front and rear bows, the sills */
    [1.52, 1.62, 3.45].forEach(function (sb) {
      var q = tab(CAN.map(function (c) { return [c[0], c[1], c[2], c[3]]; }), sb);
      put("frame", D.hoop(function (a) { return [X(sb), q[0] * sgp(Math.cos(a), 2 / 2.4) * 1.02, q[1] + (q[2] - q[1]) * sgp(Math.sin(a), 2 / 2.4) * 1.015]; },
                          0, Math.PI, 14, function () { return [X(sb), 0, q[1]]; }, 0.06, 0.0));
    });
    for (var sd = -1; sd <= 1; sd += 2) {
      var sl = [];
      for (var k = 0; k <= 8; k++) {
        var s2 = 0.95 + (s0 - 1.0) * k / 8, q3 = tab(CAN, s2);
        sl.push([X(s2), sd * (q3[0] + 0.005), q3[1] + 0.02]);
      }
      put("frame", D.ribbon(sl, [0, sd, 0.3], 0.06, 0));
    }
    put("ink", boxG(1.30, 0.70, 0.18, X(2.30), 0, 0.82));              /* the cockpit tub */
    put("ink", boxG(0.36, 0.44, 0.52, X(2.75), 0, 1.02));              /* the seat */
    put("ink", boxG(0.40, 0.56, 0.12, X(1.30), 0, 0.86));              /* the coaming */
    put("metal", boxG(0.05, 0.28, 0.22, X(1.45), 0, 0.98));            /* HUD combiner */
    put("metal", boxG(0.03, 0.10, 0.05, X(1.55), 0, 1.22));            /* mirror on the bow */
  }

  /* ============================================================ wings ==
     [P1 plan] leading edge 41 deg, trailing edge swept 16 deg, the tip
     chord 1.3 m; [P1 front] 6 deg anhedral from the shoulder root. 7 per
     cent at the root, 5 at the tip. The fold at y 3.25 (a seam). */
  var YF = 3.25, YTIP = 5.84, ANH = Math.tan(6 * D2R);
  function wingSec(y) {
    var le = 4.92 + 0.877 * (y - 0.8), te = 9.15 + 0.293 * (y - 0.8);
    if (y > 5.62) { var u = (y - 5.62) / (YTIP - 5.62); le += 0.10 * u * u; te -= 0.22 * u * u; }
    var t = clamp((y - 0.8) / 5.0, 0, 1);
    return { a: y, s: le, c: Math.max(te - le, 0.08), t: lerp(0.070, 0.050, t), o: 1.02 - Math.max(y - 0.8, 0) * ANH };
  }
  function wingLow(y, u) { var q = wingSec(y); return q.o - foilTh(q.t, q.c, u); }
  function stabSec(y) {
    var le = 11.05 + 1.03 * (y - 0.45), te = 13.20 + 0.28 * (y - 0.45);
    if (y > 2.45) { var u = (y - 2.45) / 0.17; le += 0.08 * u * u; te -= 0.08 * u * u; }
    return { a: y, s: le, c: Math.max(te - le, 0.06), t: lerp(0.060, 0.045, clamp(y / 2.6, 0, 1)), o: 0.17 };
  }
  function finSec(z) {
    var le = 10.72 + 1.362 * (z - 1.81), te = 13.20 + 0.330 * (z - 0.90);
    var t = clamp((z - 0.8) / 2.65, 0, 1);
    return { a: z, s: le, c: te - le, t: lerp(0.055, 0.040, t), o: 0 };
  }
  function addFlying() {
    var sd;
    for (sd = -1; sd <= 1; sd += 2) {
      foilLoft([0.55, 1.2, 2.0, 2.6, YF, 4.0, 4.8, 5.62].map(function (y) { var q = wingSec(y); q.a *= sd; return q; }), "w", "skin");
      foilLoft([5.62, 5.74, YTIP].map(function (y) { var q = wingSec(y); q.a *= sd; return q; }), "w", "team");
      foilLoft([0.30, 0.8, 1.5, 2.2, 2.45, 2.62].map(function (y) { var q = stabSec(y); q.a *= sd; return q; }), "w", "skin");
      /* the tailplane's pivot fairing on the aft fuselage */
      loftTo([0, 0.3, 0.7, 1.0].map(function (t) {
        var s0 = 11.6 + t * 1.5, h = Math.sin(Math.PI * t) * 0.10 + 0.02;
        return ringSE(X(s0), sd * (tab(BODY, s0)[0] - 0.03), 0.05 + h, 0.17 + h * 0.8, 0.17 - h * 0.8, 0.17, 2, 2, 12);
      }), "skin", true, true);
    }
    foilLoft([0.80, 1.25, 1.8, 2.4, 3.0, 3.45].map(function (z) { return finSec(z); }), "f", "skin");
    /* the dielectric cap along the cropped tip [P1: a dark fairing] */
    tube([[12.90, 0.01], [13.00, 0.05], [13.85, 0.05], [14.00, 0.02]], 0, 3.46, 10, "radome");
  }

  /* ======================================================== jet pipe ==
     The TF41's plain round nozzle in the tail cone [P1 side]: a burnt lip,
     the dark pipe, the flameholder ring and the turbine cone deep in it. */
  function addNozzle() {
    var k, zc = 0.30, last = bodyRing(13.42);
    var lip = last.map(function (p) { return [p[0] - 0.03, p[1] * 0.92, zc + (p[2] - zc) * 0.92]; });
    var deep = last.map(function (p) { return [p[0] + 0.9, p[1] * 0.80, zc + (p[2] - zc) * 0.80]; });
    loftTo([last, lip], "burnt", false, false);
    loftTo([lip, deep], "ink", false, true);
    tube([[13.05, 0.20], [13.25, 0.12], [13.36, 0.02]], 0, zc, 14, "burnt");
    for (k = 0; k < 10; k++) {
      var a = k / 10 * Math.PI * 2;
      put("steel", rod([X(13.28), 0.30 * Math.cos(a), zc + 0.30 * Math.sin(a)], [X(13.28), 0.30 * Math.cos(a + 0.63), zc + 0.30 * Math.sin(a + 0.63)], 0.015, 4));
    }
  }

  /* =========================================================== stores ==
     Six wing pylons [P1 plan; P2], an ejector rack under each with its
     sway braces, and the two LAU-7 Sidewinder rails on the fuselage sides
     under the wing root [P1 plan]. No bombs: the row's loads are not drawn
     on the parked model. */
  var PY = [1.67, 2.54, 3.70];
  function addStores() {
    var sd, i;
    for (sd = -1; sd <= 1; sd += 2) {
      for (i = 0; i < PY.length; i++) {
        var y = PY[i], q = wingSec(y), sc = q.s + 0.40 * q.c, wb = wingLow(y, 0.40) + 0.02;
        put("skin", plateXZ([[X(sc - 0.95), wb], [X(sc + 0.85), wb], [X(sc + 0.62), wb - 0.42], [X(sc - 0.55), wb - 0.42]], sd * y, 0.11));
        tube([[sc - 0.62, 0.03], [sc - 0.52, 0.075], [sc + 0.55, 0.075], [sc + 0.66, 0.03]], sd * y, wb - 0.50, 8, "steel");
        put("steel", rod([X(sc - 0.30), sd * (y + 0.09), wb - 0.44], [X(sc - 0.30), sd * (y + 0.09), wb - 0.56], 0.014, 5));
        put("steel", rod([X(sc + 0.25), sd * (y + 0.09), wb - 0.44], [X(sc + 0.25), sd * (y + 0.09), wb - 0.56], 0.014, 5));
        put("steel", rod([X(sc - 0.30), sd * (y - 0.09), wb - 0.44], [X(sc - 0.30), sd * (y - 0.09), wb - 0.56], 0.014, 5));
        put("steel", rod([X(sc + 0.25), sd * (y - 0.09), wb - 0.44], [X(sc + 0.25), sd * (y - 0.09), wb - 0.56], 0.014, 5));
      }
      /* the fuselage Sidewinder station: an adapter and the LAU-7 rail */
      var p = bodyPt(5.6, sd * 0.05, 0);
      put("skin", plateXZ([[X(4.70), p[2] + 0.04], [X(6.50), p[2] + 0.04], [X(6.35), p[2] - 0.14], [X(4.90), p[2] - 0.14]], sd * 0.84, 0.07));
      put("steel", boxG(2.05, 0.08, 0.07, X(5.60), sd * 0.92, p[2] - 0.16));
    }
  }

  /* ============================================================== gear ==
     Twin nose wheels on the leg behind the intake, the mains out of the
     belly at the wing on a 2.9 m track [P2, P3; NOT measured]. Ground z
     GROUND, the belly about 1.0 m above it [P2's nose wheel]. */
  var GROUND = -1.95;
  function addGear() {
    var sd, nr = 0.28, nz = GROUND + nr, mr = 0.36, mz = GROUND + mr, ns = 3.30, ms = 8.30;
    gput("steel", rod([X(ns - 0.05), 0, -0.86], [X(ns + 0.05), 0, nz + 0.10], 0.065, 8, 0.08));
    gput("metal", rod([X(ns - 0.04), 0, -1.05], [X(ns - 0.02), 0, -1.40], 0.095, 8));
    gput("steel", rod([X(ns + 0.70), 0, -0.90], [X(ns + 0.03), 0, nz + 0.45], 0.035, 6));
    gput("steel", rod([X(ns + 0.05), 0.20, nz], [X(ns + 0.05), -0.20, nz], 0.03, 6));
    gput("steel", rod([X(ns - 0.02), 0, nz + 0.22], [X(ns - 0.45), 0, nz + 0.05], 0.025, 5));   /* launch bar */
    gput("metal", rod([X(ns - 0.10), 0.07, -1.20], [X(ns - 0.16), 0.07, -1.20], 0.035, 8));       /* taxi lamp */
    for (sd = -1; sd <= 1; sd += 2) {
      gput("rubber", wheelG(nr, 0.15, X(ns + 0.05), sd * 0.13, nz, 22));
      gput("metal", wheelG(0.14, 0.16, X(ns + 0.05), sd * 0.13, nz, 12));
      gput("skin", boxG(0.95, 0.03, 0.55, X(ns - 0.35), sd * 0.24, -1.15));
      /* mains: leg, oleo, side brace, axle, wheel, hub, the leg door */
      gput("steel", rod([X(ms - 0.10), sd * 0.66, -0.86], [X(ms), sd * 1.30, mz + 0.08], 0.085, 8, 0.10));
      gput("metal", rod([X(ms - 0.06), sd * 0.86, -1.10], [X(ms - 0.03), sd * 1.04, -1.40], 0.12, 8));
      gput("steel", rod([X(ms + 0.55), sd * 0.62, -0.88], [X(ms + 0.02), sd * 1.18, mz + 0.40], 0.04, 6));
      gput("steel", rod([X(ms), sd * 1.24, mz], [X(ms), sd * 1.56, mz], 0.05, 8));
      gput("rubber", wheelG(mr, 0.20, X(ms), sd * 1.45, mz, 26));
      gput("metal", wheelG(0.18, 0.21, X(ms), sd * 1.45, mz, 12));
      gput("rubber", wheelG(0.08, 0.22, X(ms), sd * 1.45, mz, 8));
      gput("skin", plateXZ([[X(ms - 0.45), -0.88], [X(ms + 0.50), -0.88], [X(ms + 0.42), -1.55], [X(ms - 0.30), -1.55]], sd * 1.12, 0.03));
      gput("skin", boxG(1.30, 0.03, 0.40, X(ms - 0.60), sd * 0.50, -1.12));          /* well door, hanging */
    }
  }

  /* =========================================================== details ==
     [P2, P3] the fittings: frame seams and hinge lines, the fold line, the
     ventral speed brake outline, the M61 muzzle on the port side and its
     gun-gas panel, blade aerials, beacons and lamps, the hook, the AoA
     vane, the pitot. Sizes and stations from the photographs, NOT measured. */
  function bodyHoop(s, a0, a1) {
    var r = tab(BODY, s);
    return DX_.hoop(function (a) { return bodyPt(s, a, 0); }, a0, a1, 24, function () { return [X(s), 0, r[3]]; }, 0.03, 0.010);
  }
  function wLine(secOf, y0, y1, u0, u1, sg) {
    var pts = [], i;
    for (i = 0; i <= 6; i++) {
      var q = secOf(Math.abs(y0 + (y1 - y0) * i / 6)), u = u0 + (u1 - u0) * i / 6;
      pts.push([X(q.s + u * q.c), y0 + (y1 - y0) * i / 6, q.o + sg * foilTh(q.t, q.c, u)]);
    }
    return DX_.ribbon(pts, [0, 0, sg], 0.035, 0.008);
  }
  var RECEPT = [4.40, 0.30, 1.28];
  function addDetails() {
    var sd, i, D = DX_;
    [0.85, 2.6, 4.2, 6.0, 8.0, 9.5, 11.2, 12.6].forEach(function (s) { put("seam", bodyHoop(s, -1.2, Math.PI + 1.2)); });
    for (sd = -1; sd <= 1; sd += 2) {
      put("seam", wLine(wingSec, sd * 1.0, sd * YF, 0.74, 0.74, 1));      /* flap hinge */
      put("seam", wLine(wingSec, sd * YF, sd * 5.5, 0.76, 0.76, 1));      /* aileron hinge */
      put("seam", wLine(wingSec, sd * 1.0, sd * 5.5, 0.12, 0.12, 1));     /* leading-edge flap */
      put("seam", wLine(wingSec, sd * 1.0, sd * 5.5, 0.74, 0.74, -1));
      put("seam", wLine(stabSec, sd * 0.7, sd * 2.4, 0.50, 0.50, 1));
      /* the wing fold: a seam across the chord, both faces */
      var qf = wingSec(YF), fl = [], fu = [];
      for (i = 0; i <= 6; i++) {
        var u = i / 6;
        fl.push([X(qf.s + u * qf.c), sd * YF, qf.o + foilTh(qf.t, qf.c, u)]);
        fu.push([X(qf.s + u * qf.c), sd * YF, qf.o - foilTh(qf.t, qf.c, u)]);
      }
      put("seam", D.ribbon(fl, [0, 0, 1], 0.04, 0.008));
      put("seam", D.ribbon(fu, [0, 0, -1], 0.04, 0.008));
      /* the rudder hinge, both faces */
      var rp = [];
      for (i = 0; i <= 5; i++) { var z = 1.4 + 1.9 * i / 5, f = finSec(z); rp.push([X(f.s + 0.70 * f.c), sd * (foilTh(f.t, f.c, 0.70) + 0.004), z]); }
      put("seam", D.ribbon(rp, [0, sd, 0], 0.035, 0.003));
      /* wingtip nav lamps (port red, starboard green), static dischargers */
      var qt = wingSec(5.80);
      put("lamp", D.lamp([X(qt.s + 0.45 * qt.c), sd * 5.86, qt.o], 0.06, sd > 0 ? 0xe02218 : 0x18c04a));
      [5.0, 5.5].forEach(function (yy) { var qq = wingSec(yy); put("ink", rod([X(qq.s + qq.c - 0.02), sd * yy, qq.o], [X(qq.s + qq.c + 0.14), sd * yy, qq.o], 0.007, 3)); });
      /* the intake trunk's side seam and the longeron seam */
      put("seam", D.ribbon([[X(1.6), sd * 0.66, -0.30], [X(4.0), sd * 0.80, -0.40], [X(7.0), sd * 0.80, -0.45]], [0, sd, 0], 0.035, 0.012));
      put("seam", D.ribbon([[X(3.7), sd * 0.80, 0.55], [X(12.0), sd * 0.66, 0.55]], [0, sd, 0], 0.035, 0.012));
    }
    /* the M61A1 muzzle low on the port side behind the intake lip, its gas panel */
    put("ink", rod([X(1.38), 0.60, -0.28], [X(1.52), 0.62, -0.28], 0.055, 8));
    put("seam", D.ribbon([[X(1.45), 0.64, -0.12], [X(2.70), 0.71, -0.10], [X(2.70), 0.70, -0.45], [X(1.45), 0.62, -0.44], [X(1.45), 0.64, -0.12]], [0, 1, 0], 0.03, 0.012));
    /* the AoA vane and pitot on the starboard nose */
    put("steel", rod([X(1.05), -0.42, 0.30], [X(1.30), -0.46, 0.30], 0.02, 6));
    put("steel", boxG(0.16, 0.02, 0.09, X(1.70), -0.55, 0.42));
    /* the ventral speed brake outline under the centre fuselage */
    var sb = [[5.4, 0.45], [7.6, 0.45], [7.6, -0.45], [5.4, -0.45], [5.4, 0.45]], pts = [], k;
    for (k = 1; k < sb.length; k++) for (i = 0; i <= 4; i++) {
      var ss = lerp(sb[k - 1][0], sb[k][0], i / 4), yy2 = lerp(sb[k - 1][1], sb[k][1], i / 4);
      pts.push([X(ss), yy2, -0.948]);
    }
    put("seam", D.ribbon(pts, [0, 0, -1], 0.04, 0.004));
    /* beacons, the white tail lamp, blade aerials on the spine and belly */
    put("lamp", D.lamp(bodyPt(9.0, Math.PI / 2, 0.03), 0.07, 0xe02218));
    put("lamp", D.lamp(bodyPt(9.3, -Math.PI / 2, 0.03), 0.07, 0xe02218));
    put("lamp", D.lamp([X(13.98), 0, 3.32], 0.05, 0xf4f1e0));
    [[7.4, 1], [10.0, 1], [3.6, -1], [10.3, -1]].forEach(function (q) {
      var p = bodyPt(q[0], q[1] * Math.PI / 2, 0);
      put("ink", D.blade(p, [0, 0, q[1]], [1, 0, 0], 0.24, 0.28, 0.12, 0.025, 0.08));
    });
    /* the receptacle door on the spine (port of the centreline), the hook */
    put("ink", boxG(0.46, 0.22, 0.02, X(RECEPT[0]), RECEPT[1], RECEPT[2] + 0.02));
    put("steel", rod([X(11.6), 0, -0.56], [X(12.9), 0, -0.30], 0.05, 6));
    put("steel", rod([X(12.9), 0, -0.30], [X(13.05), 0, -0.36], 0.06, 6));
  }

  /* ============================================================= paint ==
     The grey-scale sheet over the two plain colours: green above and on
     the sides above the wing, light grey below (AGENT_POLICY 6: no
     camouflage pattern), panel lines, rivet rows, the wing-root walkway,
     gun gas, soot over the tail and grime. */
  var _sheet = null;
  function paintSheet() {
    if (_sheet !== null) return _sheet;
    try {
      function wl(secOf, u, y0, y1) {
        var out = [], k;
        for (k = 0; k <= 5; k++) { var y = y0 + (y1 - y0) * k / 5, q = secOf(y); out.push([X(q.s + u * q.c), y]); }
        return out;
      }
      var top = [wl(wingSec, 0.12, 1.0, 5.6), wl(wingSec, 0.30, 1.0, 5.6), wl(wingSec, 0.55, 1.0, 5.6), wl(wingSec, 0.74, 1.0, 5.5),
                 wl(stabSec, 0.30, 0.6, 2.4), [[X(wingSec(YF).s), YF], [X(wingSec(YF).s + wingSec(YF).c), YF]],
                 [[X(3.8), 0.45], [X(12.6), 0.40]], [[X(1.0), 0.30], [X(3.6), 0.40]]];
      var bot = [wl(wingSec, 0.25, 1.0, 5.6), wl(wingSec, 0.62, 1.0, 5.6), [[X(1.0), 0.45], [X(13.0), 0.40]],
                 [[X(5.4), 0.45], [X(7.6), 0.45]]];
      var riv = [wl(wingSec, 0.20, 1.0, 5.6), wl(wingSec, 0.45, 1.0, 5.6), wl(wingSec, 0.66, 1.0, 5.6), [[X(4.0), 0.62], [X(12.4), 0.55]]];
      var fr = [];
      [0.85, 1.6, 2.6, 3.7, 4.6, 5.4, 6.2, 7.0, 7.8, 8.6, 9.5, 10.4, 11.2, 12.0, 12.8].forEach(function (s) { fr.push([X(s), 0.85]); });
      var side = [[[X(1.4), 0.55], [X(12.8), 0.50]], [[X(1.4), -0.30], [X(12.5), -0.25]], [[X(3.7), 0.95], [X(9.6), 0.95]],
                  [[X(1.3), 0.25], [X(2.6), 0.25], [X(2.6), 0.62], [X(1.3), 0.62], [X(1.3), 0.25]],
                  [[X(9.8), 0.30], [X(11.4), 0.30], [X(11.4), 0.70], [X(9.8), 0.70], [X(9.8), 0.30]],
                  [[X(fsec(2.0).s), 2.0], [X(fsec(2.0).s + fsec(2.0).c), 2.0]]];
      _sheet = DX_.sheet(LAY, {
        frames: fr, top: top, bot: bot, rivets: riv, side: side, seam: 0.50, grime: 220,
        walk: [[[X(5.3), 0.90], [X(7.6), 0.90], [X(7.9), 1.50], [X(5.8), 1.50]]],
        soot: [[X(13.4), 0, 0.30, 1.6, 0.42], [X(1.5), 0.62, -0.28, 1.6, 0.12]],
        base: function (g, U, RT, RB, RS) {
          /* green above, grey below: the bottom band, and the sides below z 0.0 */
          g.fillStyle = "#5f6a4c"; g.fillRect(0, 0, LAY.TW, LAY.B_BOT);
          g.fillStyle = "#b9bdbb"; g.fillRect(0, LAY.B_BOT, LAY.TW, LAY.TH - LAY.B_BOT);
          for (var sd2 = 0; sd2 < 2; sd2++) { var r0 = RS(-0.05, sd2); g.fillRect(0, r0, LAY.TW, RS(-3.0, sd2) - r0); }
          g.fillStyle = "#5f6750";                                    /* the radome a shade darker */
          g.fillRect(U(X(0.85)), 0, LAY.TW - U(X(0.85)), LAY.TH);
        }
      }, 3307);
    } catch (e) { _sheet = false; }
    return _sheet;
  }
  function fsec(z) { return finSec(z); }

  function mats(C, tex) {
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    var m = {
      skin: new V.MeshStandardMaterial({ color: tex ? 0xffffff : 0x6b7457, roughness: 0.84, metalness: 0.06, side: V.DoubleSide }),
      radome: new V.MeshStandardMaterial({ color: tex ? 0xffffff : 0x5f6750, roughness: 0.66, metalness: 0.04, side: V.DoubleSide }),
      metal: new V.MeshStandardMaterial({ color: 0x8d9399, roughness: 0.52, metalness: 0.50, side: V.DoubleSide }),
      steel: new V.MeshStandardMaterial({ color: 0x6f757a, roughness: 0.48, metalness: 0.60, side: V.DoubleSide }),
      burnt: new V.MeshStandardMaterial({ color: 0x5d5751, roughness: 0.52, metalness: 0.58, side: V.DoubleSide }),
      ink: new V.MeshStandardMaterial({ color: 0x15181a, roughness: 0.95, metalness: 0.05, side: V.DoubleSide }),
      rubber: new V.MeshStandardMaterial({ color: 0x17181a, roughness: 0.95, metalness: 0.04 }),
      glass: new V.MeshStandardMaterial({ color: 0x24363d, roughness: 0.10, metalness: 0.35, side: V.DoubleSide }),
      frame: new V.MeshStandardMaterial({ color: 0x4a5040, roughness: 0.6, metalness: 0.3, side: V.DoubleSide }),
      seam: new V.MeshStandardMaterial({ color: 0x40463a, roughness: 0.85, metalness: 0.05, side: V.DoubleSide }),
      lamp: new V.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.3, metalness: 0.0,
                                         emissive: 0x333333, emissiveIntensity: 0.6 }),
      team: new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                         emissive: new V.Color(tc), emissiveIntensity: 0.10, side: V.DoubleSide })
    };
    if (tex) { m.skin.map = tex; m.radome.map = tex; }
    return m;
  }

  function build(THREE, Mlib, C) {
    V = THREE; K = {}; G = {};
    DX_ = DK(V);
    addBody(); addIntake(); addCanopy(); addFlying(); addNozzle(); addStores(); addGear(); addDetails();
    /* team colour: a band across both faces of the fin, the wing tips, a strip on the spine */
    for (var fc = -1; fc <= 1; fc += 2) {
      var band = [], f = finSec(2.70);
      for (var i = 0; i <= 6; i++) { var u = 0.05 + 0.88 * i / 6; band.push([X(f.s + u * f.c), fc * (foilTh(f.t, f.c, u) + 0.004), 2.70]); }
      put("team", DX_.ribbon(band, [0, fc, 0], 0.36, 0.004));
    }
    put("team", boxG(0.80, 0.30, 0.02, X(7.6), 0, 1.305));

    LAY = DX_.layout(X(14.2), X(-0.1), 6.0, GROUND, 3.6);
    var T = mats(C, paintSheet());
    var g = new V.Group();
    emit(g, K, T, ["skin", "radome", "team", "seam", "frame", "glass", "metal", "steel", "burnt", "ink", "lamp"]);
    var gear = new V.Group(); gear.name = "gear";
    emit(gear, G, T, ["skin", "steel", "metal", "rubber"]);
    g.add(gear);
    var rec = new V.Object3D();
    rec.name = "aar_recept";
    rec.position.set(X(RECEPT[0]), RECEPT[1], RECEPT[2]);
    g.add(rec);
    return g;
  }

  UNIT_MODELS["nato_e60_cas"] = { len: 14.06, build: build };
})();
