/* ========== nato_e80_fighter.js - HERO MODEL: F-15C Eagle (e80, NATO) ==========

   Style and period anchor for the 1980s NATO air roster. Everything here is
   measured off a McDonnell Douglas planform drawing (bottom view, scale
   checked twice: 13.05 m span and 19.43 m length both land on 110.5 px/m)
   and off side / three-quarter photographs of 18th Wing jets.

   Model space follows models3d.js: +X nose, +Y left, +Z up, real metres.
   Everything in this file is written against a NOSE STATION s - metres aft
   of the radome tip, exactly as the drawing is dimensioned - and converted
   with X(s). That way the numbers below can be checked against the drawing
   without mental arithmetic.

   The four period cues this model exists to carry:
     1. twin fins standing WIDE APART on the outboard engine decks, on booms
        that run aft past the nozzles;
     2. a large trapezoidal wing with a very long root chord (7.6 m at the
        centreline, 39% of the aircraft) and the raked-off tip;
     3. rectangular variable cheek intakes, open-mouthed, with the ramp
        wedge visible inside and the boundary-layer splitter standing off
        the fuselage side;
     4. a bubble canopy set far forward - the windscreen starts where the
        radome ends, at 15% of the length.

   Station reference (metres aft of the nose tip):
        0.00  radome tip
        2.90  radome / windscreen joint
        5.72  intake lip (top lip; bottom lip 5.95)
        7.18  wing leading edge, extended to the centreline
       14.76  wing trailing edge at the centreline
       14.90  fin root leading edge
       16.18  stabilator root leading edge
       17.84  engine nozzle exit
       19.00  tail boom aft end
       19.42  stabilator trailing edge - the aft-most point on the aircraft

   ---- 2026-11-12 rebuild to the current standard (draw calls, re-measure) ----
   References (Wikimedia Commons / Wikipedia; cached in the agent scratchpad
   q_f15f86_ref):
     [P1] "McDonnell Douglas F-15 Eagle 3-view.svg" (2000 px render): plan,
          head-on, and a TWO-SEAT side view. Plan nose py 14, stabilator
          TE py 1127, span px 12..774. Scaled on the published length
          (57.08 px/m) the plan of this model lies on it - radome, intakes,
          wing, stabilators, booms, Sparrows - except that [P1]'s span comes
          out 13.28 m: its span/length ratio is 1.8 per cent above the
          published one, so the length scale is kept. Its side view is
          stylised (fin tip chord about 0.6 m) and of a two-seater; not used
          for the fin.
     [P2] "F-15C Eagle 57th Wg 65th Aggressor Squadron AW 080010 - Nellis
          AFB NV - 2007.jpg" (800 px): a side-on profile print of a
          single-seat F-15C, nose px 50, stabilator tip px 747 = 35.87 px/m.
          Canopy, radome, spine and intake line lie on this model. The fin
          did not: it is re-drawn off [P2] (see FIN). Its markings, codes
          and camouflage are NOT drawn.
     [W]  en.wikipedia "McDonnell Douglas F-15 Eagle", F-15C specification:
          length 63 ft 9 in (19.43 m), span 42 ft 10 in (13.05 m), height
          18 ft 6 in (5.63 m), wing area 608 sq ft.
   As drawn: 19.52 x 13.19 x 5.42 m (L x W x H; the length includes the
   0.09 m the boom tips stand behind the stabilator line in the dump, the
   span the nav lenses). Published 19.43 x 13.05 x 5.63. Height is NOT
   fitted: fin top 3.54 m above the datum (3.50 on [P2] including the tip
   fairing), gear as the first build drew it; the 0.21 m short is in the
   main oleo / tyre stance, which no fetched reference shows side-on.
   NOT CONFIRMED: the gear leg lengths and the ground line; the receptacle
   station (aar_recept, port wing root at s 7.95, from the type's known
   layout, not measured); the F-15E items (CFTs, LANTIRN, Mk 82 rows) as
   the first build had them; the fin area check (5.9 m2 a fin as drawn
   against a remembered 125 sq ft for the pair).
   Kept API: UNIT_MODELS "nato_e80_fighter" (F-15C) and "nato_e90_cas"
   (F-15E, build(..., isE = true)), len 19.43, the "gear" group. Added:
   an Object3D "aar_recept" (render3d.js aarPoints) on both.
   Draw calls: every mesh merged per material (mergePerMaterial), the gear
   kept as its own merged group; F-15C 16 (was 235), F-15E 13.
   ---- 2026-11-12 review rework (geometry, against [P1] and [P2]) ----
   The visual review found the draw-call rebuild still crude at the side
   view and the game camera: a round-cornered tube body, the intakes four
   flat plates round an open box, the wing a 0.18 m plank under a 0.42 m
   glove block, plank stabilators and fins, box gear lying on its side,
   and two 1.5 m team squares on the wings. Rebuilt on the us_ef111a.js
   kit, every station of the first build kept:
     - body: a superellipse loft on the same w / h / zc table, flat on top
       over the speed-brake deck and flat under the keel;
     - intake trunks: one loft a side, the near-square raked mouth with
       radiused corners ([P1] head-on), a lip, the dark duct, the ramp panel
       in the top of the mouth, the splitter and its gap, the bleed louvre;
       squareness falling aft into the round engine bay (outer edge y 2.01
       at s 13 as measured before);
     - wing, stabilators and fins: aerofoil lofts on the same outlines
       (wing 6.6 -> 3.0 per cent thick, 1 deg anhedral; the stabilator's
       leading-edge snag; the fin with its ECM tip fairing and root fillet);
     - nozzles with lip, petals and dark throat; booms lofted;
     - stores re-lofted with cruciform fins; gear legs with oleos, braces,
       doors and the wheels stood upright (the first build's wheels lay
       flat, so its ground was the tyre flank): ground z -2.08, height as
       drawn 5.6 m against the published 5.63 (leg length still NOT
       CONFIRMED, see above);
     - fittings: seams, hinge lines, the speed-brake outline, gun port and
       fairing, pitots, AoA vanes, blade aerials, lamps, the hook;
     - paint: a grey-scale panel-line / rivet / walkway / soot sheet over
       the skin grey; team colour now a band on each fin, the wingtips and
       a spine strip (small strips, AGENT_POLICY 6), not the wing squares.
   aar_recept and the "gear" group are kept; len 19.43 kept.
*/
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";
  var V = null;
  var NOSE = 9.72;                  /* x of the radome tip */
  function X(s) { return NOSE - s; }
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
     layout() / projUV()  the four-band sheet layout and its projected UVs
               (the same layout as HeroKit's paint sheet, so the canvas
               HeroKit.paintSheet draws lies on these UVs; see paint). */
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
    return { ribbon: ribbon, blade: blade, lamp: lamp, hoop: hoop, layout: layout, projUV: projUV,
             geo: geo, quad: quad };
  }

  /* ============================================================ helpers */
  /* a flat plate cut to a polygon in the (x, z) plane, standing at y0, th thick */
  function plateXZ(poly, y0, th) {
    var sh = new V.Shape(), i;
    sh.moveTo(poly[0][0], poly[0][1]);
    for (i = 1; i < poly.length; i++) sh.lineTo(poly[i][0], poly[i][1]);
    var g = new V.ExtrudeGeometry(sh, { depth: th, bevelEnabled: false });
    g.rotateX(Math.PI / 2);                 /* shape (x, z), depth -> -y */
    g.translate(0, y0 + th / 2, 0);
    return g;
  }
  /* a round body of revolution along x: rows [s, r], centre (yc, zc) */
  function tube(rows, yc, zc, n, cat, into) {
    loftTo(rows.map(function (q) { return ringSE(X(q[0]), yc, Math.max(q[1], 0.004), zc + Math.max(q[1], 0.004), zc - Math.max(q[1], 0.004), zc, 2, 2, n); }),
           cat, true, true, into);
  }

  /* ============================================================ the body ==
     Rows: s, half-width, top, bottom, the widest line, squareness above and
     below (2 round, higher flatter). The first build's BODY table (its w, h,
     zc) is kept station for station: here it is a superellipse loft instead
     of the round-cornered tube, so the forward fuselage keeps the ogive
     radome and the slab-sided cockpit section of [P2], and the centre body
     between the trunks goes flat on top (the speed-brake deck) and flat
     underneath (the keel the Sparrows hang off). */
  var BODY = [
    [0.00, 0.015, -0.345, -0.375, -0.36, 2.0, 2.0],
    [0.40, 0.130, -0.220, -0.460, -0.34, 2.0, 2.0],
    [0.90, 0.250, -0.070, -0.550, -0.31, 2.0, 2.0],
    [1.50, 0.380, 0.090, -0.630, -0.27, 2.0, 2.1],
    [2.10, 0.480, 0.240, -0.680, -0.22, 2.0, 2.2],
    [2.75, 0.560, 0.390, -0.710, -0.16, 2.1, 2.4],
    [3.50, 0.610, 0.530, -0.730, -0.10, 2.2, 2.7],
    [4.60, 0.635, 0.660, -0.760, -0.05, 2.4, 3.0],
    [5.80, 0.640, 0.740, -0.780, -0.02, 2.6, 3.2],
    [7.00, 0.655, 0.790, -0.790, 0.00, 2.9, 3.4],
    [8.60, 0.750, 0.780, -0.820, -0.02, 3.2, 3.6],
    [10.4, 0.880, 0.740, -0.840, -0.05, 3.6, 3.8],
    [12.4, 0.960, 0.680, -0.840, -0.08, 3.8, 3.8],
    [14.4, 1.000, 0.620, -0.820, -0.10, 3.8, 3.8],
    [16.2, 0.980, 0.530, -0.790, -0.13, 3.6, 3.6],
    [17.6, 0.900, 0.350, -0.730, -0.19, 3.4, 3.4],
    [18.4, 0.800, 0.030, -0.570, -0.27, 3.4, 3.4],
    [19.05, 0.660, -0.160, -0.460, -0.31, 3.4, 3.4]
  ];
  var BST = [0, 0.15, 0.4, 0.7, 1.1, 1.5, 2.1, 2.75, 3.5, 4.2, 4.6, 5.2, 5.8, 6.4, 7.0, 7.8, 8.6, 9.5, 10.4,
             11.4, 12.4, 13.4, 14.4, 15.3, 16.2, 17.0, 17.6, 18.0, 18.4, 18.8, 19.05];
  var BN = 28;
  function bodyPt(s, a, push) {
    var r = tab(BODY, s);
    var c = Math.cos(a), sn = Math.sin(a), e = sn >= 0 ? 2 / r[4] : 2 / r[5];
    var y = r[0] * sgp(c, e), z = sn >= 0 ? r[3] + (r[1] - r[3]) * sgp(sn, e) : r[3] + (r[3] - r[2]) * sgp(sn, e);
    if (push) { var dz = z - r[3], L = Math.sqrt(y * y + dz * dz) || 1; y += push * y / L; z += push * dz / L; }
    return [X(s), y, z];
  }
  function addBody() {
    var rings = [], rad = [], r, i;
    for (r = 0; r < BST.length; r++) {
      var ring = [];
      for (i = 0; i < BN; i++) ring.push(bodyPt(BST[r], i / BN * Math.PI * 2, 0));
      if (BST[r] <= 2.75) rad.push(ring);
      if (BST[r] >= 2.75) rings.push(ring);
    }
    loftTo(rad, "radome", true, false);
    loftTo(rings, "skin", false, true);
  }

  /* ======================================================= intake trunks ==
     The first build's four flat plates round an open box become one loft
     each side: the rectangular cheek intake with radiused corners [P1 head-
     on: the mouths are near-square with round corners], squareness falling
     aft as the trunk turns into the round engine bay [NAC table kept: outer
     edge y 2.01 at s 13]. The mouth is raked, top lip at s 5.55 and bottom
     lip at 5.95 [first build, P2]. Rows: s, half-width, top, bottom, e. */
  var TRK = [
    [5.55, 0.400, 0.50, -0.80, 6.0],
    [6.40, 0.410, 0.53, -0.84, 5.6],
    [7.60, 0.420, 0.555, -0.87, 5.0],
    [9.00, 0.440, 0.565, -0.88, 4.4],
    [10.2, 0.560, 0.575, -0.88, 4.0],
    [11.6, 0.720, 0.585, -0.88, 3.6],
    [13.0, 0.790, 0.585, -0.88, 3.2],
    [14.6, 0.800, 0.580, -0.87, 2.8],
    [16.2, 0.780, 0.550, -0.85, 2.5],
    [17.2, 0.680, 0.480, -0.78, 2.2],
    [17.85, 0.580, 0.410, -0.71, 2.0]
  ];
  var TYC = 1.21;
  function trunkRing(s, sd, n, inset) {
    var q = tab(TRK, s), k = inset || 0;
    return ringSE(X(s), sd * TYC, q[0] - k, q[1] - k, q[2] + k, (q[1] + q[2]) / 2, q[3], q[3], n);
  }
  function rake(ring, top, bot) {      /* the raked mouth: lower lip 0.40 m aft of the upper */
    return ring.map(function (p) { var t = clamp((top - p[2]) / (top - bot), 0, 1); return [p[0] - 0.40 * t, p[1], p[2]]; });
  }
  function addTrunks() {
    var sd, r;
    var ST = [5.55, 6.0, 6.4, 7.0, 7.6, 8.3, 9.0, 9.6, 10.2, 10.9, 11.6, 12.3, 13.0, 13.8, 14.6, 15.4, 16.2, 16.7, 17.2, 17.55, 17.85];
    for (sd = -1; sd <= 1; sd += 2) {
      var rings = [];
      for (r = 0; r < ST.length; r++) {
        var rg = trunkRing(ST[r], sd, 24, 0);
        if (ST[r] < 6.0) rg = rake(rg, 0.50, -0.80);
        rings.push(rg);
      }
      loftTo(rings, "skin", false, false);
      /* the lip: a thin inner wall, then the dark duct running in to the fan */
      var lip = rake(trunkRing(5.62, sd, 24, 0.07), 0.43, -0.73);
      loftTo([rings[0], lip], "metal", false, false);
      var deep = trunkRing(7.4, sd, 24, 0.10);
      loftTo([lip, deep], "ink", false, true);
      /* the variable ramp: the hinged first panel hanging in the top of the mouth */
      put("metal", plateXZ([[X(5.62), 0.42], [X(6.9), 0.36], [X(6.9), 0.16], [X(5.70), 0.30]], sd * TYC - 0.33, 0.66));
      /* the boundary-layer splitter standing off the fuselage, its gap */
      put("skin", plateXZ([[X(5.40), 0.44], [X(5.90), -0.62], [X(9.6), -0.72], [X(9.6), 0.50]], sd * 0.76, 0.05));
      put("ink", plateXZ([[X(5.75), 0.38], [X(6.10), -0.56], [X(8.6), -0.62], [X(8.6), 0.42]], sd * 0.73, 0.04));
      /* bleed-air louvre on the outer face of the trunk */
      put("ink", plateXZ([[X(7.0), 0.22], [X(8.3), 0.22], [X(8.3), -0.02], [X(7.0), -0.02]], sd * (TYC + 0.43), 0.02));
    }
  }

  /* tail booms: the outboard structure that runs aft past the nozzles and
     carries the fins and the stabilator pivots (first build's BOOM table) */
  var BOOM = [[14.2, 0.42, 0.45, -0.55, 3.4], [16.5, 0.38, 0.40, -0.52, 3.0], [17.8, 0.34, 0.30, -0.46, 2.6],
              [18.6, 0.28, 0.18, -0.38, 2.3], [19.05, 0.15, 0.03, -0.27, 2.0]];
  function addBooms() {
    for (var sd = -1; sd <= 1; sd += 2) {
      var rings = [14.2, 15.0, 15.8, 16.5, 17.2, 17.8, 18.3, 18.6, 18.9, 19.05].map(function (s) {
        var q = tab(BOOM, s);
        return ringSE(X(s), sd * 1.66, q[0], q[1], q[2], (q[1] + q[2]) / 2, q[3], q[3], 18);
      });
      loftTo(rings, "skin", false, true);
    }
  }

  /* =========================================================== canopy ==
     Bubble canopy set far forward, the windscreen meeting the radome base
     [P2]. Rows: s, half-width, sill z, top z (the first build's CANOPY). */
  function canRows(isE) {
    /* 2026-11-26 shape pass: the tops raised to the references (review:
       0.14-0.18 m low).  C off [P2] (top z 0.96 s 3.62, 1.35 s 4.46, 1.44
       s 5.02-5.30, 1.38 s 5.85, 1.27 s 6.69); E off the 3-view sheet's
       two-seat side elevation [P1s] (1.00 s 3.7, 1.23 s 4.4, 1.39 s 5.0,
       1.46 s 5.6-6.2, 1.39 s 6.8, 1.27 s 7.4, 1.12 s 7.85).  Sills kept. */
    var C = [[3.05, 0.09, 0.53, 0.60], [3.70, 0.31, 0.56, 1.00], [4.40, 0.45, 0.62, 1.32],
             [5.15, 0.50, 0.68, 1.43], [5.90, 0.48, 0.72, 1.39], [6.60, 0.36, 0.76, 1.28]];
    if (isE) C = [[3.05, 0.09, 0.53, 0.60], [3.70, 0.31, 0.56, 1.00], [4.40, 0.45, 0.62, 1.25],
                  [5.15, 0.50, 0.68, 1.40], [5.90, 0.48, 0.72, 1.46], [6.60, 0.46, 0.75, 1.42],
                  [7.25, 0.43, 0.77, 1.31], [7.85, 0.30, 0.78, 1.12]];
    return C;
  }
  function addCanopy(isE) {
    var CAN = canRows(isE), D = DX_;
    var rings = CAN.map(function (q) { return ringSE(X(q[0]), 0, q[1], q[3], q[2], q[2], 2.3, 2.0, 24).slice(0, 13); });
    loftTo(rings, "glass", false, false);
    /* the canopy's metal tail fairing back into the spine */
    var last = CAN[CAN.length - 1], s0 = last[0];
    /* the spine fairing behind the raised canopy: C [P2] 1.16 at s 7.25,
       0.99 at s 8.08; E [P1s] 1.03 at s 8.6, 0.96 at s 9.2 */
    var d1 = isE ? 0.10 : 0.12, d2 = isE ? 0.20 : 0.28;
    var SP = [[s0 - 0.05, last[1] + 0.01, last[3] + 0.005], [s0 + 0.7, last[1] * 0.80, last[3] - d1],
              [s0 + 1.4, last[1] * 0.55, last[3] - d2], [s0 + 2.0, 0.10, last[2] + 0.03]];
    loftTo(SP.map(function (q) { return ringSE(X(q[0]), 0, q[1], q[2], last[2] - 0.05, last[2] - 0.05, 2.3, 2.0, 24).slice(0, 13); }),
           "skin", false, true);
    /* frames: windscreen bow, the canopy arch(es), the sills */
    var bows = isE ? [3.72, 6.35, 7.30] : [3.72, 6.30];
    bows.forEach(function (sb) {
      var q = tab(CAN.map(function (c) { return [c[0], c[1], c[2], c[3]]; }), sb);
      put("frame", D.hoop(function (a) { return [X(sb), q[0] * sgp(Math.cos(a), 2 / 2.3) * 1.02, q[1] + (q[2] - q[1]) * sgp(Math.sin(a), 2 / 2.3) * 1.015]; },
                          0, Math.PI, 14, function () { return [X(sb), 0, q[1]]; }, 0.07, 0.0));
    });
    for (var sd = -1; sd <= 1; sd += 2) {
      var sl = [];
      for (var k = 0; k <= 8; k++) {
        var s2 = 3.3 + (last[0] - 3.4) * k / 8, q3 = tab(CAN, s2);
        sl.push([X(s2), sd * (q3[0] + 0.005), q3[1] + 0.02]);
      }
      put("frame", D.ribbon(sl, [0, sd, 0.3], 0.06, 0));
    }
    /* seats and the coaming seen through the glass */
    put("ink", boxG(0.44, 0.60, 0.16, X(4.20), 0, 0.68));
    put("ink", boxG(0.34, 0.44, 0.50, X(5.62), 0, 0.90));
    if (isE) put("ink", boxG(0.34, 0.42, 0.50, X(7.05), 0, 0.94));
    put("metal", boxG(0.06, 0.30, 0.26, X(4.05), 0, 0.84));      /* HUD */
  }

  /* ============================================================ wings ==
     Leading edge straight at 45 deg from the root, trailing edge nearly
     square, the raked-off tip [P1 plan, first build's WING outline]. Now an
     aerofoil loft, 6.6 per cent thick at the root and 3 at the tip with the
     1 deg anhedral, in place of the 0.18 m plank and the 0.42 m glove block. */
  var WZ = 0.40;
  function wingSec(y) {
    var le = 8.12 + (y - 0.9) * (13.93 - 8.12) / (6.45 - 0.9), te;
    /* 2026-11-26: the flap trailing edge is straight across at s 15.28
       (x -5.56) out to the kink at y 3.9 ([P1] plan: x -5.55 at y 2.0 and
       2.8), then the outboard line as before (x -5.68 at y 4.8) */
    if (y <= 3.9) te = 15.28;
    else if (y <= 5.68) te = lerp(15.28, 15.52, (y - 3.9) / (5.68 - 3.9));
    else te = lerp(15.52, 14.50, (y - 5.68) / (6.50 - 5.68));
    if (y > 6.45) le = lerp(13.93, 14.45, (y - 6.45) / 0.05);
    var t = (y - 0.9) / 5.6;
    return { a: y, s: le, c: Math.max(te - le, 0.06), t: lerp(0.066, 0.030, t), o: WZ - (y - 0.9) * 0.0175 };
  }
  function stabSec(y) {
    var le, te;
    if (y <= 2.58) le = lerp(15.52, 16.73, (y - 1.3) / 1.28);
    else if (y <= 4.10) le = lerp(16.55, 18.30, (y - 2.62) / 1.48);
    else le = lerp(18.30, 18.56, (y - 4.10) / 0.18);
    if (y <= 3.80) te = lerp(18.84, 19.42, (y - 1.3) / 2.5);
    else te = lerp(19.42, 18.60, (y - 3.80) / 0.48);
    return { a: y, s: le, c: Math.max(te - le, 0.05), t: 0.045, o: -0.29 };
  }
  /* the fin re-measured off [P2] in the first rebuild: root LE s 15.30,
     tip LE 17.54, tip TE 18.48, root TE 18.20, root z 0.42, tip 3.47 */
  var FY = 1.555;
  function finSec(z) {
    var t = (z - 0.42) / (3.47 - 0.42);
    return { a: z, s: lerp(15.30, 17.54, t), c: lerp(2.90, 0.94, t), t: lerp(0.05, 0.04, t), o: 0 };
  }
  function addFlying() {
    var sd;
    for (sd = -1; sd <= 1; sd += 2) {
      var ys = [0.9, 1.8, 2.8, 3.9, 4.8, 5.68, 6.05], yt = [6.05, 6.30, 6.48];
      foilLoft(ys.map(function (y) { var q = wingSec(y); q.a *= sd; return q; }), "w", "skin");
      foilLoft(yt.map(function (y) { var q = wingSec(y); q.a *= sd; return q; }), "w", "team");
      foilLoft([1.3, 1.9, 2.58].map(function (y) { var q = stabSec(y); q.a *= sd; return q; }), "w", "skin");
      foilLoft([2.62, 3.2, 3.8, 4.1, 4.26].map(function (y) { var q = stabSec(y); q.a *= sd; return q; }), "w", "skin");
      /* fins: the lofted aerofoil on the boom, the ECM fairing projecting
         ahead of the tip [P2], a tip cap, the root fillet along the deck */
      var fins = [0.42, 1.2, 2.0, 2.8, 3.47].map(function (z) { var q = finSec(z); q.o = sd * FY; return q; });
      foilLoft(fins, "f", "skin");
      tube([[16.92, 0.01], [17.10, 0.08], [17.35, 0.11], [17.75, 0.11], [18.0, 0.07]], sd * FY, 3.30, 12, "radome");
      tube([[17.50, 0.01], [17.62, 0.05], [18.40, 0.05], [18.52, 0.02]], sd * FY, 3.49, 10, "metal");
      loftTo([0, 0.3, 0.7, 1.0].map(function (t) {
        var s0 = 13.9 + t * 1.8, h = Math.sin(Math.PI * Math.min(t * 1.2, 1)) * 0.10 + 0.02;
        return ringSE(X(s0), sd * FY, 0.06 + h * 0.8, 0.44 + h, 0.30, 0.36, 2, 2, 12);
      }), "skin", true, true);
      /* the stabilator pivot fairing where it leaves the boom */
      loftTo([0, 0.3, 0.7, 1.0].map(function (t) {
        var s0 = 16.4 + t * 1.8, h = Math.sin(Math.PI * t) * 0.12 + 0.03;
        return ringSE(X(s0), sd * 1.44, 0.08 + h, -0.18 + h * 0.6, -0.40 - h * 0.4, -0.29, 2, 2, 12);
      }), "skin", true, true);
    }
  }

  /* ========================================================= nozzles ==
     Two F100 convergent-divergent nozzles, the petals bare and burnt, the
     dark throat (the first build's cans re-lofted with a lip). */
  function addNozzles() {
    var sd, k, j;
    for (sd = -1; sd <= 1; sd += 2) {
      var yc = sd * TYC, zc = -0.15, rings = [];
      /* 2026-11-26: exit moved forward to s 18.18 (x -8.46; [P1] plan s 18.15,
         review: the first build's s 18.68 left the booms only 0.35 m of
         overhang, 0.9 on the drawing) */
      [[17.80, 0.56], [17.90, 0.54], [18.02, 0.51], [18.18, 0.48]].forEach(function (q, ri) {
        var ring = [];
        for (j = 0; j < 28; j++) {
          var a = j / 28 * Math.PI * 2, r = q[1] * (ri >= 2 ? (j % 2 ? 0.985 : 1.0) : 1.0);
          ring.push([X(q[0]), yc + r * Math.cos(a), zc + r * Math.sin(a)]);
        }
        rings.push(ring);
      });
      loftTo(rings.slice(0, 2), "burnt", false, false);
      loftTo(rings.slice(1), "steel", false, false);
      var inner = rings[3].map(function (p) { return [p[0] + 0.02, yc + (p[1] - yc) * 0.9, zc + (p[2] - zc) * 0.9]; });
      var deep = rings[3].map(function (p) { return [p[0] + 0.6, yc + (p[1] - yc) * 0.78, zc + (p[2] - zc) * 0.78]; });
      loftTo([rings[3], inner], "steel", false, false);
      loftTo([inner, deep], "ink", false, true);
      for (k = 0; k < 10; k++) {                 /* petal ribs (14 before the E's triangle budget cut) */
        var a2 = k / 10 * Math.PI * 2;
        put("ink", rod([X(17.92), yc + 0.525 * Math.cos(a2), zc + 0.525 * Math.sin(a2)],
                       [X(18.16), yc + 0.485 * Math.cos(a2), zc + 0.485 * Math.sin(a2)], 0.012, 4));
      }
    }
  }

  /* =========================================================== stores ==
     The first build's fit: C - four fuselage-corner AIM-7s, a 610 gal bag on
     each wing pylon with an AIM-9 on each shoulder rail, the 600 gal
     centreline tank; E - the conformal tanks with three Mk 82s along each,
     the LANTIRN pods under the intakes, the same wing pylons. */
  function missile(s0, len, r, y, z, fin) {
    tube([[s0, 0.01], [s0 + len * 0.06, r * 0.7], [s0 + len * 0.14, r], [s0 + len * 0.97, r], [s0 + len, r * 0.7]], y, z, 8, "metal");
    put("ink", rod([X(s0 + len * 0.002), y, z], [X(s0 + len * 0.10), y, z], r * 0.72, 8, 0.005));
    for (var k = 0; k < 4; k++) {
      var a = Math.PI / 4 + k * Math.PI / 2, up = [0, Math.cos(a), Math.sin(a)];
      var base = [X(s0 + len * 0.90), y + up[1] * r, z + up[2] * r];
      put("steel", DX_.blade(base, up, [1, 0, 0], fin, len * 0.12, len * 0.06, 0.02, len * 0.03));
      var b2 = [X(s0 + len * 0.30), y + up[1] * r, z + up[2] * r];
      put("steel", DX_.blade(b2, up, [1, 0, 0], fin * 0.7, len * 0.08, len * 0.05, 0.02, 0));
    }
  }
  function tank(rows, y, z, finR) {
    tube(rows, y, z, 12, "skin");
    var s1 = rows[rows.length - 2][0];
    for (var k = 0; k < (finR ? 3 : 0); k++) {
      var a = -Math.PI / 2 + k * 2 * Math.PI / 3, up = [0, Math.cos(a), Math.sin(a)];
      put("skin", DX_.blade([X(s1 - 0.2), y + up[1] * finR, z + up[2] * finR], up, [1, 0, 0], 0.26, 0.70, 0.40, 0.03, 0.25));
    }
  }
  function addStores(isE) {
    var sd, b;
    for (sd = -1; sd <= 1; sd += 2) {
      if (!isE) {
        missile(8.27, 3.66, 0.10, sd * 1.82, -0.74, 0.30);
        missile(8.87, 3.66, 0.10, sd * 1.30, -0.98, 0.30);
      }
      /* wing pylon, the bag, the launcher rail and two Sidewinders */
      put("skin", plateXZ([[X(10.3), 0.32], [X(12.6), 0.32], [X(12.3), -0.30], [X(10.7), -0.30]], sd * 2.90, 0.12));
      tank([[8.30, 0.02], [8.85, 0.24], [9.70, 0.33], [12.2, 0.33], [13.1, 0.26], [13.85, 0.06]], sd * 2.90, -0.62, 0.20);
      put("steel", boxG(1.80, 0.98, 0.08, X(11.2), sd * 2.90, -0.20));
      missile(9.66, 2.87, 0.064, sd * 2.90 + 0.46, -0.32, 0.22);
      missile(9.66, 2.87, 0.064, sd * 2.90 - 0.46, -0.32, 0.22);
    }
    if (!isE) {
      tank([[7.30, 0.02], [7.80, 0.28], [8.60, 0.42], [11.2, 0.44], [12.3, 0.36], [12.9, 0.10]], 0, -1.25, 0.30);
      put("skin", plateXZ([[X(9.2), -0.80], [X(10.4), -0.80], [X(10.2), -0.88], [X(9.4), -0.88]], 0, 0.16));
    }
    if (isE) {
      for (sd = -1; sd <= 1; sd += 2) {
        /* conformal tanks hugging the trunk under the wing root */
        loftTo([[7.40, 0.07, 0.08], [7.90, 0.20, 0.26], [8.60, 0.27, 0.31], [11.2, 0.28, 0.31], [13.8, 0.26, 0.29], [14.55, 0.10, 0.12]].map(function (q) {
          return ringSE(X(q[0]), sd * 1.86, q[1], -0.28 + q[2], -0.30 - q[2], -0.30, 2.6, 2.6, 18);
        }), "skin", true, true);
        for (b = 0; b < 3; b++) {
          tube([[8.4 + b * 2.3, 0.01], [8.6 + b * 2.3, 0.10], [9.0 + b * 2.3, 0.136], [10.0 + b * 2.3, 0.136], [10.45 + b * 2.3, 0.085], [10.61 + b * 2.3, 0.04]],
               sd * 2.03, -0.76, 6, "metal");
          put("steel", boxG(0.30, 0.04, 0.12, X(9.4 + b * 2.3), sd * 2.03, -0.62));
          for (var k = 0; k < 4; k++) {
            var a = Math.PI / 4 + k * Math.PI / 2, up = [0, Math.cos(a), Math.sin(a)];
            put("steel", DX_.blade([X(10.45 + b * 2.3), sd * 2.03 + up[1] * 0.08, -0.76 + up[2] * 0.08], up, [1, 0, 0], 0.16, 0.36, 0.30, 0.015, 0.03));
          }
        }
        /* LANTIRN: the nav pod to port, the targeting pod to starboard */
        var pl = sd > 0 ? 1.99 : 2.50, pd = sd > 0 ? 0.150 : 0.190;
        tube([[6.35, 0.02], [6.53, pd * 0.78], [6.90, pd], [6.35 + pl - 0.5, pd], [6.35 + pl - 0.12, pd * 0.8], [6.35 + pl, pd * 0.45]],
             sd * 1.16, -1.12, 10, "metal");
        put("ink", rod([X(6.33), sd * 1.16, -1.12], [X(6.45), sd * 1.16, -1.12], pd * 0.72, 10));
        put("steel", boxG(0.70, 0.07, 0.22, X(7.30), sd * 1.16, -0.97));
      }
    }
  }

  /* ============================================================== gear ==
     The first build's legs (nose at s 5.90, mains at s 10.80 on a 2.75 m
     track) with the wheels now stood upright (the first build had them
     lying on their sides about the vertical, so its ground line was the
     tyre's flank). Ground at tyre bottom, z -2.08. */
  var GROUND = -2.08;
  function addGear() {
    var sd, nr = 0.30, nz = GROUND + nr, mr = 0.44, mz = GROUND + mr;
    gput("steel", rod([X(5.85), 0, -0.76], [X(5.90), 0, nz], 0.075, 8, 0.09));
    gput("metal", rod([X(5.85), 0, -0.90], [X(5.87), 0, -1.30], 0.11, 8));
    gput("steel", rod([X(6.70), 0, -0.80], [X(5.90), 0, nz + 0.40], 0.04, 6));
    gput("rubber", wheelG(nr, 0.18, X(5.90), 0, nz, 22));
    gput("metal", wheelG(0.15, 0.20, X(5.90), 0, nz, 12));
    for (sd = -1; sd <= 1; sd += 2) {
      gput("skin", boxG(1.30, 0.04, 0.62, X(5.30), sd * 0.20, -1.10));
      gput("steel", rod([X(10.80), sd * 1.30, -0.86], [X(10.80), sd * 1.375, mz], 0.095, 8, 0.12));
      gput("metal", rod([X(10.80), sd * 1.31, -1.00], [X(10.80), sd * 1.34, -1.36], 0.14, 8));
      gput("steel", rod([X(10.0), sd * 1.05, -0.86], [X(10.75), sd * 1.33, mz + 0.30], 0.045, 6));
      gput("rubber", wheelG(mr, 0.26, X(10.80), sd * 1.48, mz, 24));
      gput("metal", wheelG(0.22, 0.28, X(10.80), sd * 1.48, mz, 14));
      gput("skin", boxG(1.60, 0.04, 0.80, X(10.60), sd * 1.02, -1.26));
    }
  }

  /* =========================================================== details ==
     Panel seams, the speed-brake outline on the spine, hinge lines, gun
     port, lamps, aerials, AoA vanes and the short flank pitots (no nose
     boom on a production Eagle - the first build's note), the hook. */
  function bodyHoop(s, a0, a1) {
    var r = tab(BODY, s);
    return DX_.hoop(function (a) { return bodyPt(s, a, 0); }, a0, a1, 24, function () { return [X(s), 0, r[3]]; }, 0.035, 0.010);
  }
  function wLine(secOf, y0, y1, u0, u1, sg) {
    var pts = [], i;
    for (i = 0; i <= 6; i++) {
      var q = secOf(Math.abs(y0 + (y1 - y0) * i / 6)), u = u0 + (u1 - u0) * i / 6;
      pts.push([X(q.s + u * q.c), y0 + (y1 - y0) * i / 6, q.o + sg * foilTh(q.t, q.c, u)]);
    }
    return DX_.ribbon(pts, [0, 0, sg], 0.04, 0.01);
  }
  function addDetails(isE) {
    var sd, i, D = DX_;
    [2.75, 3.6, 7.0, 8.6].forEach(function (s) { put("seam", bodyHoop(s, -0.25, Math.PI + 0.25)); });
    for (sd = -1; sd <= 1; sd += 2) {
      put("seam", wLine(wingSec, sd * 2.1, sd * 5.5, 0.80, 0.80, 1));     /* flap and aileron hinge */
      put("seam", wLine(wingSec, sd * 1.6, sd * 5.9, 0.16, 0.16, 1));     /* front spar */
      put("seam", wLine(stabSec, sd * 1.5, sd * 3.7, 0.35, 0.35, 1));
      var rp = [];                                                       /* rudder hinge both faces */
      for (i = 0; i <= 5; i++) { var z = 1.0 + 2.2 * i / 5, f = finSec(z); rp.push([X(f.s + 0.72 * f.c), sd * FY + (foilTh(f.t, f.c, 0.72) + 0.005), z]); }
      put("seam", D.ribbon(rp, [0, 1, 0], 0.04, 0.004));
      var rq = rp.map(function (p) { return [p[0], p[1] - 2 * (foilTh(0.045, 1.5, 0.72) + 0.005), p[2]]; });
      put("seam", D.ribbon(rq, [0, -1, 0], 0.04, 0.004));
      /* AoA vanes, pitots */
      put("metal", boxG(0.26, 0.05, 0.12, X(2.30), sd * 0.50, -0.20));
      put("steel", rod([X(1.10), sd * 0.33, -0.36], [X(1.56), sd * 0.36, -0.36], 0.022, 6, 0.03));
      /* trunk-top panel lines and the outer cheek seams */
      put("seam", D.ribbon([[X(6.2), sd * (TYC + 0.40), 0.34], [X(13.5), sd * (TYC + 0.79), 0.34]], [0, sd, 0], 0.035, 0.012));
      put("seam", D.ribbon([[X(6.2), sd * (TYC + 0.40), -0.55], [X(13.5), sd * (TYC + 0.79), -0.60]], [0, sd, 0], 0.035, 0.012));
      [6.9, 9.0, 11.6].forEach(function (s) {
        var q = tab(TRK, s);
        put("seam", D.ribbon([[X(s), sd * (TYC + q[0] + 0.005), q[1] - 0.05], [X(s), sd * (TYC + q[0] + 0.005), q[2] + 0.06]], [0, sd, 0], 0.035, 0.008));
      });
      /* lamps: wingtip nav lights (port red, starboard green), fin tips */
      put("lamp", D.lamp([X(14.12), sd * 6.47, wingSec(6.4).o], 0.07, sd > 0 ? 0xe02218 : 0x18c04a));
      put("lamp", D.lamp([X(18.50), sd * FY, 3.36], 0.06, 0xf4f1e0));
    }
    /* the speed brake outline on the spine behind the canopy */
    var b0 = isE ? 7.95 : 7.60, b1 = isE ? 10.0 : 9.90, bz = function (s) { return tab(BODY, s)[1] + 0.012; };
    var ol = [[b0, 0.58], [b1, 0.66], [b1, -0.66], [b0, -0.58], [b0, 0.58]], pts = [], k;
    for (k = 1; k < ol.length; k++) for (i = 0; i <= 4; i++) {
      var ss = lerp(ol[k - 1][0], ol[k][0], i / 4), yy = lerp(ol[k - 1][1], ol[k][1], i / 4);
      pts.push([X(ss), yy, bz(ss) - 0.02 * Math.abs(yy)]);
    }
    put("seam", D.ribbon(pts, [0, 0, 1], 0.045, 0.004));
    /* the M61 port in the starboard wing root and its fairing */
    loftTo([[8.0, 0.10], [8.3, 0.17], [9.6, 0.20], [10.4, 0.10]].map(function (q) {
      return ringSE(X(q[0]), -1.16, q[1] * 1.4, WZ + 0.30 + q[1] * 0.5, WZ + 0.18, WZ + 0.22, 2, 2, 12);
    }), "skin", true, true);
    put("ink", rod([X(7.98), -1.16, WZ + 0.30], [X(8.12), -1.16, WZ + 0.30], 0.06, 8));
    put("lamp", D.lamp(bodyPt(11.0, Math.PI / 2, 0.03), 0.07, 0xe02218));
    put("lamp", D.lamp(bodyPt(9.5, -Math.PI / 2, 0.03), 0.07, 0xe02218));
    /* blade aerials: spine and belly */
    [[10.6, 1], [12.6, 1], [4.6, -1], [5.6, -1], [14.0, -1]].forEach(function (q) {
      var p = bodyPt(q[0], q[1] * Math.PI / 2, 0);
      put("ink", D.blade(p, [0, 0, q[1]], [1, 0, 0], 0.28, 0.30, 0.12, 0.03, 0.10));
    });
    /* the receptacle door in the port wing root, the arrestor hook */
    put("ink", boxG(0.50, 0.32, 0.02, X(RECEPT[0]), RECEPT[1], tab(TRK, RECEPT[0])[1] + 0.008));   /* seated on the trunk top */
    put("metal", rod([X(16.4), 0, -0.68], [X(17.8), 0, -0.62], 0.06, 6));
  }

  /* ============================================================= paint ==
     2026-11-25 paint rework (the true render showed the rebuild nearly bare
     at the game camera: the skin grey authored as a paint chip came out
     near white and the grey-scale sheet's lines vanished on it).  Now the
     WHOLE colour is carried by a HeroKit.paintSheet canvas over a white
     skin material, every tone authored with HeroKit.authorFor(the grey the
     game camera should show), so:
       F-15C  one main air-superiority grey; the darker grey ONLY as a plain
              panel tone on the upper centre fuselage and trunk tops
              between the canopy and the fins (the darker upper tone of the
              Compass Ghost / Mod Eagle scheme, drawn as one plain panel -
              no blots, no pattern), the anti-glare-free radome a shade
              lighter;
       F-15E  one dark gunship grey all over.
     On the sheet: panel lines and frames (HeroKit sheet lines), fastener
     rows along the spars, trunk and keel seams, access panels with screw
     corners (the nose avionics doors under the sills, the gun bay, the
     trunk-top and engine-bay doors, fuel panels on the wing, the flaps,
     ailerons and rudders in a fresh-paint tone), the walkways either side
     of the spine with scuffs, exhaust soot along the boom and keel and on
     the nozzle shrouds, the gun-port blast stain, fluid streaks behind
     the gear wells, and weathering.  Plain paint (AGENT_POLICY 6): no
     camouflage, numbers, text or national markings; team colour stays in
     the small strips (fin bands, wingtips, spine). */
  var _sheets = {};
  function seen(hex) { return HeroKit.authorFor(hex); }
  function sheetSpec(isE) {
    function wl(secOf, u, y0, y1) {
      var out = [], k;
      for (k = 0; k <= 5; k++) { var y = y0 + (y1 - y0) * k / 5, q = secOf(y); out.push([X(q.s + u * q.c), y]); }
      return out;
    }
    /* the tones the game camera should show (sRGB, sunlit top face) */
    var MAIN = isE ? 0x676e73 : 0x9ba3a9, DARK = isE ? 0x5b6267 : 0x6d767e, RAD = isE ? 0x60676b : 0xa6adb2;
    var FRESH = isE ? 0x80878c : 0xb2babf, WORN = isE ? 0x565d61 : 0x838b91;
    function halfM(h) { var o = 0, k; for (k = 0; k < 3; k++) { var sh = 16 - 8 * k; o |= Math.round((((MAIN >> sh) & 255) + ((h >> sh) & 255)) / 2) << sh; } return o; }
    var FRESHW = halfM(FRESH), WORNW = halfM(WORN);
    var top = [wl(wingSec, 0.16, 1.6, 6.0), wl(wingSec, 0.45, 1.6, 6.0), wl(wingSec, 0.80, 2.1, 5.5),
               wl(stabSec, 0.35, 1.4, 3.8), [[X(11.4), 2.6], [X(15.1), 2.6]], [[X(10.2), 4.2], [X(15.3), 4.2]],
               [[X(7.0), 0.92], [X(16.5), 0.95]], [[X(7.0), 1.92], [X(13.0), 2.0]], [[X(6.6), 0.0], [X(17.6), 0.0]]];
    var bot = [wl(wingSec, 0.30, 1.6, 6.0), wl(wingSec, 0.70, 1.6, 6.0), [[X(6.0), 0.5], [X(16.0), 0.5]],
               [[X(6.0), 1.21], [X(17.6), 1.21]], [[X(3.0), 0.0], [X(17.6), 0.0]]];
    var riv = [wl(wingSec, 0.30, 1.6, 6.0), wl(wingSec, 0.62, 1.6, 6.0), wl(wingSec, 0.08, 1.5, 6.0),
               wl(stabSec, 0.15, 1.4, 4.0), [[X(9.0), 1.30], [X(16.5), 1.40]], [[X(7.0), 0.62], [X(16.0), 0.70]],
               [[X(3.2), 0.40], [X(6.6), 0.55]]];
    var rivB = [wl(wingSec, 0.30, 1.6, 6.0), wl(wingSec, 0.62, 1.6, 6.0), [[X(6.0), 0.9], [X(17.4), 0.9]],
                [[X(6.0), 1.55], [X(17.4), 1.55]]];
    var fr = [];
    [1.5, 2.75, 3.6, 4.6, 5.6, 7.0, 8.0, 9.0, 10.1, 11.2, 12.4, 13.6, 14.8, 16.0, 17.0].forEach(function (s) {
      fr.push([X(s), s < 7 ? tab(BODY, s)[0] : 2.0]);
    });
    var side = [[[X(2.9), 0.15], [X(5.5), 0.30]], [[X(9.5), 0.10], [X(17.6), 0.10]], [[X(9.5), -0.45], [X(17.6), -0.45]],
                [[X(2.9), -0.40], [X(6.6), -0.45]], [[X(14.9), 0.45], [X(18.3), 0.45]], [[X(14.9), 1.6], [X(18.3), 1.6]],
                [[X(14.9), 2.6], [X(18.3), 2.6]]];
    var areas = [];
    if (!isE) {
      /* the darker grey: one plain panel over the upper centre fuselage and
         the trunk tops, canopy fairing to the tail (top band) */
      areas.push({ band: "top", color: seen(DARK), poly: [[X(7.6), 0.0], [X(7.6), 0.62], [X(9.0), 1.05], [X(10.4), 1.62],
                                                         [X(13.0), 1.98], [X(17.9), 1.98], [X(17.9), 0.0]] });
      /* the same tone on the upper flank of the trunks and booms (sides) */
      areas.push({ band: "side", color: seen(DARK), poly: [[X(7.6), 0.72], [X(10.0), 0.52], [X(17.9), 0.48],
                                                          [X(19.2), 0.20], [X(19.2), 0.62], [X(14.6), 0.66], [X(7.6), 0.90]] });
    }
    /* the aft engine bay ahead of the nozzles: bare, heat-darkened metal
       (titanium) on the type, top, sides and bottom, booms excluded */
    var TI = isE ? 0x7d8184 : 0x646a6e;
    areas.push({ band: "top", color: seen(TI), poly: [[X(16.3), 0.0], [X(16.3), 0.95], [X(17.0), 1.85], [X(18.0), 1.85], [X(18.0), 0.0]] });
    areas.push({ band: "bot", color: seen(TI), poly: [[X(16.0), 0.0], [X(16.0), 0.95], [X(16.8), 1.85], [X(18.0), 1.85], [X(18.0), 0.0]] });
    areas.push({ band: "side", color: seen(TI), poly: [[X(16.4), 0.40], [X(16.4), -0.75], [X(18.0), -0.75], [X(18.0), 0.40]] });
    /* the radome a shade lighter (it is a separate material on the type) */
    areas.push({ band: "top", color: seen(RAD), poly: [[X(-0.1), 0], [X(-0.1), 0.6], [X(2.75), 0.6], [X(2.75), 0]] });
    areas.push({ band: "side", color: seen(RAD), poly: [[X(-0.1), -1.0], [X(2.75), -1.0], [X(2.75), 0.6], [X(-0.1), 0.6]] });
    areas.push({ band: "bot", color: seen(RAD), poly: [[X(-0.1), 0], [X(-0.1), 0.6], [X(2.75), 0.6], [X(2.75), 0]] });
    /* fresh-paint control surfaces: flaps, ailerons, stabilators' aft panel */
    function surf(secOf, u0, u1, y0, y1) {
      var a = wl(secOf, u0, y0, y1), b = wl(secOf, u1, y0, y1).reverse();
      return a.concat(b);
    }
    ["top", "bot"].forEach(function (bd) {
      areas.push({ band: bd, color: seen(FRESHW), poly: surf(wingSec, 0.80, 0.99, 2.1, 4.1) });
      areas.push({ band: bd, color: seen(WORNW), poly: surf(wingSec, 0.80, 0.99, 4.2, 5.5) });
      areas.push({ band: bd, color: seen(FRESH), poly: surf(stabSec, 0.55, 0.95, 1.6, 3.6) });
      /* wing leading edge: worn, a little darker */
      areas.push({ band: bd, color: seen(WORN), poly: surf(wingSec, 0.0, 0.07, 1.0, 6.0) });
    });
    return {
      key: isE ? "nato_e90_cas_v2" : "nato_e80_fighter_v2", seed: isE ? 1661 : 1543,
      bounds: { x0: X(19.6), x1: X(-0.1), ymax: 6.6, z0: GROUND, z1: 3.6 },
      demarcation: { z: 0, above: seen(MAIN), below: seen(MAIN) },
      areas: areas, frames: fr, top: top, bot: bot, rivets: riv, rivetsBot: rivB, side: side,
      seam: isE ? 0.75 : 0.72, grime: 220,
      walk: [[[X(8.6), 0.30], [X(15.8), 0.30], [X(15.8), 0.70], [X(8.6), 0.70]],
             [[X(10.6), 1.05], [X(13.4), 1.05], [X(13.4), 1.55], [X(10.6), 1.55]]],
      soot: [[X(18.2), 1.21, -0.15, 2.6, 0.55], [X(17.8), 1.66, -0.10, 1.4, 0.30], [X(16.6), 0.0, -0.80, 2.8, 0.35]],
      draw: function (g, m) {
        var R = HeroKit.rng(isE ? 77 : 55);
        function rgba(hex, a) { return "rgba(" + ((hex >> 16) & 255) + "," + ((hex >> 8) & 255) + "," + (hex & 255) + "," + a + ")"; }
        var INK = isE ? "rgba(8,10,12," : "rgba(24,27,30,", LIT = "rgba(255,255,255,", LK = isE ? 1.7 : 1;
        /* rect in a band: band "top" | "bot" (x, y, mirrored) or "side" (x, z, both sides) */
        function rows(bd, v, sd) { return bd === "top" ? m.top(v) : bd === "bot" ? m.bot(v) : m.side(v, sd); }
        function each(bd, fn) {
          if (bd === "side") { fn(function (v) { return rows(bd, v, false); }); fn(function (v) { return rows(bd, v, true); }); }
          else { fn(function (v) { return rows(bd, v); }); fn(function (v) { return rows(bd, -v); }); }
        }
        function panel(bd, s0, s1, v0, v1, o) {
          o = o || {};
          each(bd, function (rv) {
            var xa = m.U(X(s0)), xb = m.U(X(s1)), ya = rv(v0), yb = rv(v1);
            var x0 = Math.min(xa, xb), y0 = Math.min(ya, yb), w = Math.abs(xb - xa), h = Math.abs(yb - ya);
            if (o.fill !== undefined) { g.fillStyle = rgba(seen(o.fill), 1); g.fillRect(x0, y0, w, h); }
            if (o.shade) { g.fillStyle = INK + o.shade + ")"; g.fillRect(x0, y0, w, h); }
            g.strokeStyle = INK + (o.line || 0.66) + ")"; g.lineWidth = o.lw || 2; g.strokeRect(x0 + 0.5, y0 + 0.5, w, h);
            g.strokeStyle = LIT + (0.22 * LK).toFixed(3) + ")"; g.lineWidth = 1; g.strokeRect(x0 + 2.5, y0 + 2.5, w - 4, h - 4);
            var st = o.step || 7, k;
            g.fillStyle = INK + "0.55)";
            if (o.screws !== false) {
              for (k = x0 + 3; k < x0 + w - 2; k += st) { g.fillRect(k, y0 + 2, 1.6, 1.6); g.fillRect(k, y0 + h - 3, 1.6, 1.6); }
              for (k = y0 + 3 + st; k < y0 + h - 3; k += st) { g.fillRect(x0 + 2, k, 1.6, 1.6); g.fillRect(x0 + w - 3, k, 1.6, 1.6); }
            }
          });
        }
        var P = isE ? 0x868d92 : 0xb6bdc2, Q = isE ? 0x50575b : 0x80888f;
        /* the wing's tone patches at half the contrast (review: a quilt) */
        function half(h) { var M0 = MAIN, o = 0, k; for (k = 0; k < 3; k++) { var sh = 16 - 8 * k, a3 = (M0 >> sh) & 255, b3 = (h >> sh) & 255; o |= Math.round((a3 + b3) / 2) << sh; } return o; }
        var PW = half(P), QW = half(Q);
        /* forward fuselage: the big avionics doors under the sills */
        panel("side", 3.1, 4.5, -0.45, 0.25, { fill: P });
        panel("side", 4.6, 6.4, -0.50, 0.30, {});
        panel("side", 1.0, 2.6, -0.55, -0.15, { screws: false, line: 0.4 });
        panel("side", 6.6, 7.5, 0.30, 0.62, { fill: Q });
        /* trunk sides: bleed / engine access, under the wing */
        panel("side", 9.8, 11.6, -0.65, -0.15, {});
        panel("side", 12.0, 13.8, -0.70, -0.15, { fill: Q });
        panel("side", 14.2, 17.2, -0.70, -0.05, { shade: 0.06 });
        /* fins: rudder in the fresh tone, the tip fairing panel */
        panel("side", 17.65, 18.40, 0.95, 3.15, { fill: P, screws: false });
        panel("side", 16.2, 17.2, 0.70, 1.40, {});
        /* top: trunk-top doors, gun bay (starboard only via the mirror is
           acceptable: the plain panel reads the same), spine panels */
        panel("top", 7.2, 8.6, 0.95, 1.75, { fill: isE ? P : 0x8a939a });
        panel("top", 10.6, 12.2, 1.10, 1.85, {});
        panel("top", 13.4, 15.0, 1.05, 1.90, { fill: isE ? Q : 0x77808a });
        panel("top", 15.6, 17.4, 0.25, 0.80, { shade: 0.08 });
        panel("top", 6.8, 7.5, 0.10, 0.55, { screws: false });
        /* wing top: fuel and access panels */
        [[10.2, 11.0, 2.6, 3.2], [11.6, 12.6, 3.4, 4.0], [12.6, 13.4, 4.6, 5.0], [9.6, 10.2, 1.7, 2.2],
         [12.0, 13.6, 2.3, 2.9], [13.4, 14.1, 3.3, 4.1], [10.0, 10.8, 3.6, 4.0], [14.0, 14.6, 4.6, 5.4]].forEach(function (q, i) {
          panel("top", q[0], q[1], q[2], q[3], { fill: i % 3 === 1 ? PW : i % 3 === 2 ? QW : undefined, step: 6 });
        });
        /* underside: engine bay doors, gear-well doors, keel */
        panel("bot", 13.2, 17.5, 0.75, 1.65, { fill: Q, step: 6 });
        panel("bot", 9.8, 11.6, 0.95, 1.55, { shade: 0.10 });
        panel("bot", 5.2, 6.6, 0.05, 0.30, { shade: 0.08 });
        [[10.0, 11.2, 2.4, 3.2], [11.8, 13.0, 3.6, 4.4]].forEach(function (q) { panel("bot", q[0], q[1], q[2], q[3], { fill: PW }); });
        /* wing and stabilator ribs: chordwise panel breaks between the spars,
           and the fin's rib lines (top and bottom bands, both sides) */
        function line(pts, map, a2, lw) {
          g.strokeStyle = INK + a2 + ")"; g.lineWidth = lw || 1.8; g.beginPath();
          pts.forEach(function (q, n) { var pp = map(q); if (n) g.lineTo(pp[0], pp[1]); else g.moveTo(pp[0], pp[1]); });
          g.stroke();
          g.strokeStyle = LIT + (0.18 * LK).toFixed(3) + ")"; g.lineWidth = 1; g.beginPath();      /* the lit lip beside the seam */
          pts.forEach(function (q, n) { var pp = map(q); if (n) g.lineTo(pp[0] + 2, pp[1] + 2); else g.moveTo(pp[0] + 2, pp[1] + 2); });
          g.stroke();
        }
        function rib(secOf, y, u0, u1, a2) {
          var q = secOf(y), pts = [[X(q.s + u0 * q.c), y], [X(q.s + u1 * q.c), y]];
          [1, -1].forEach(function (sg) {
            line(pts, function (pp) { return [m.U(pp[0]), m.top(sg * pp[1])]; }, a2);
            line(pts, function (pp) { return [m.U(pp[0]), m.bot(sg * pp[1])]; }, a2 * 0.8);
          });
        }
        [1.6, 2.1, 2.8, 3.5, 4.2, 4.9, 5.6].forEach(function (y) { rib(wingSec, y, 0.16, 0.80, 0.55); });
        [2.1, 4.15, 5.5].forEach(function (y) { rib(wingSec, y, 0.80, 1.0, 0.7); });
        [1.6, 2.2, 2.9, 3.5].forEach(function (y) { rib(stabSec, y, 0.12, 0.95, 0.5); });
        [0.9, 1.5, 2.1, 2.6, 3.1].forEach(function (z) {
          var f = finSec(z), pts = [[X(f.s + 0.05 * f.c), z], [X(f.s + 0.72 * f.c), z]];
          line(pts, function (pp) { return [m.U(pp[0]), m.side(pp[1], false)]; }, 0.5);
          line(pts, function (pp) { return [m.U(pp[0]), m.side(pp[1], true)]; }, 0.5);
        });
        /* lengthwise panel lines along the trunk tops and the spine */
        [[0.45, 7.6, 17.6], [1.45, 8.4, 16.8], [1.75, 9.5, 14.6]].forEach(function (q) {
          var pts = [[X(q[1]), q[0]], [X(q[2]), q[0]]];
          [1, -1].forEach(function (sg) { line(pts, function (pp) { return [m.U(pp[0]), m.top(sg * pp[1])]; }, 0.5); });
        });
        /* the gun port blast stain on the starboard root */
        var gx = m.U(X(8.0)), gy = m.top(-1.16), gr = g.createLinearGradient(gx, 0, gx - 0.9 * m.L.PX * 2, 0);
        gr.addColorStop(0, "rgba(20,18,16,0.6)"); gr.addColorStop(1, "rgba(20,18,16,0)");
        g.fillStyle = gr; g.fillRect(gx - 1.8 * m.L.PX, gy - 0.12 * m.L.PY, 1.8 * m.L.PX, 0.24 * m.L.PY);
        /* fluid streaks aft of the wells and along the keel (from below) */
        var k, sd;
        for (k = 0; k < 70; k++) {
          var sx = X(9.0 + R() * 8.5), sy = (R() < 0.5 ? -1 : 1) * (0.2 + R() * 1.6), len = (0.4 + R() * 1.4) * m.L.PX;
          g.fillStyle = "rgba(30,26,20," + (0.05 + R() * 0.08).toFixed(3) + ")";
          g.fillRect(m.U(sx) - len, m.bot(sy), len, 1 + R() * 2);
        }
        /* walkway scuffs and boot marks */
        for (k = 0; k < 50; k++) {
          sd = R() < 0.5 ? -1 : 1;
          g.fillStyle = INK + "0.07)";
          g.beginPath(); g.ellipse(m.U(X(8.8 + R() * 6.8)), m.top(sd * (0.32 + R() * 0.36)), 2 + R() * 5, 1 + R() * 3, R() * 3, 0, Math.PI * 2); g.fill();
        }
        /* the fine fastener rows along the trunk and boom seams (sides) */
        g.fillStyle = INK + "0.38)";
        [[-0.42, 6.4, 17.4], [0.12, 9.6, 17.4], [0.42, 14.9, 18.3], [-0.20, 3.0, 6.4]].forEach(function (q) {
          for (sd = 0; sd < 2; sd++) for (var xx = m.U(X(q[2])); xx < m.U(X(q[1])); xx += 4) g.fillRect(xx, m.side(q[0], !!sd) - 3, 1.4, 1.4);
        });
        /* oil and hydraulic staining under the nozzles' shroud (sides) */
        for (sd = 0; sd < 2; sd++) {
          var hx = m.U(X(17.9)), hg = g.createLinearGradient(hx, 0, m.U(X(14.5)), 0);
          hg.addColorStop(0, "rgba(28,24,20,0.45)"); hg.addColorStop(1, "rgba(28,24,20,0)");
          g.fillStyle = hg; g.fillRect(m.U(X(14.5)) - (m.U(X(14.5)) - hx), m.side(0.35, !!sd), m.U(X(14.5)) - hx, m.side(-0.8, !!sd) - m.side(0.35, !!sd));
        }
      }
    };
  }
  function paintSheet(THREE, Mlib, C, isE) {
    var key = isE ? "e" : "c";
    if (_sheets[key] !== undefined) return _sheets[key];
    var tex = null;
    try {
      var HK = HeroKit.begin(THREE, Mlib, C, { category: "air", key: isE ? "nato_e90_cas" : "nato_e80_fighter" });
      HK.paintSheet(sheetSpec(isE));
      tex = HK.R.mats.skin.def.map || null;
    } catch (e) { if (typeof console !== "undefined") console.warn("nato_e80_fighter sheet: " + e); tex = null; }
    _sheets[key] = tex;
    return tex;
  }

  function mats(C, tex, isE) {
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    /* with the sheet, the skin is white and the canvas carries the paint;
       without one (no document) the main grey goes on the material */
    var skinCol = tex ? 0xffffff : seen(isE ? 0x666d72 : 0x9aa2a8);
    var m = {
      skin: new V.MeshStandardMaterial({ color: skinCol, roughness: 0.80, metalness: 0.08, side: V.DoubleSide }),
      radome: new V.MeshStandardMaterial({ color: seen(isE ? 0x60676b : 0xa3aaaf), roughness: 0.62, metalness: 0.05, side: V.DoubleSide }),
      metal: new V.MeshStandardMaterial({ color: 0x7d838a, roughness: 0.52, metalness: 0.50, side: V.DoubleSide }),
      steel: new V.MeshStandardMaterial({ color: 0x5f656a, roughness: 0.48, metalness: 0.60, side: V.DoubleSide }),
      burnt: new V.MeshStandardMaterial({ color: 0x4a4540, roughness: 0.52, metalness: 0.58, side: V.DoubleSide }),
      ink: new V.MeshStandardMaterial({ color: 0x15181a, roughness: 0.95, metalness: 0.05, side: V.DoubleSide }),
      rubber: new V.MeshStandardMaterial({ color: 0x17181a, roughness: 0.95, metalness: 0.04 }),
      glass: new V.MeshStandardMaterial({ color: 0x1d2e33, roughness: 0.10, metalness: 0.35, side: V.DoubleSide }),
      frame: new V.MeshStandardMaterial({ color: seen(isE ? 0x4d5357 : 0x6b7378), roughness: 0.6, metalness: 0.3, side: V.DoubleSide }),
      seam: new V.MeshStandardMaterial({ color: seen(isE ? 0x41474b : 0x5f676d), roughness: 0.85, metalness: 0.05, side: V.DoubleSide }),
      lamp: new V.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.3, metalness: 0.0,
                                         emissive: 0x333333, emissiveIntensity: 0.6 }),
      team: new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                         emissive: new V.Color(tc), emissiveIntensity: 0.10, side: V.DoubleSide })
    };
    if (tex) m.skin.map = tex;
    return m;
  }

  /* receptacle: [station s, y (port +), z] - kept from the first build */
  var RECEPT = [7.95, 1.22, 0.62];

  function build(THREE, Mlib, C, isE) {
    V = THREE; K = {}; G = {};
    DX_ = DK(V);
    addBody(); addTrunks(); addBooms(); addCanopy(isE); addFlying(); addNozzles(); addStores(isE); addGear(); addDetails(isE);
    /* team colour: a band across each fin, the wingtips, a strip on the spine */
    for (var sd = -1; sd <= 1; sd += 2) {
      /* a horizontal band across both faces of the fin, z 2.6 - 3.1 */
      for (var fc = -1; fc <= 1; fc += 2) {
        var band = [], f = finSec(2.85);
        for (var i = 0; i <= 6; i++) { var u = 0.06 + 0.88 * i / 6; band.push([X(f.s + u * f.c), sd * FY + fc * (foilTh(f.t, f.c, u) + 0.004), 2.85]); }
        put("team", DX_.ribbon(band, [0, fc, 0], 0.50, 0.004));
      }
    }
    var sp = bodyPt(11.4, Math.PI / 2, 0.01);
    put("team", boxG(1.0, 0.40, 0.02, sp[0], 0, sp[2]));

    LAY = DX_.layout(X(19.6), X(-0.1), 6.6, GROUND, 3.6);
    var T = mats(C, paintSheet(THREE, Mlib, C, isE), isE);
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

  UNIT_MODELS["nato_e80_fighter"] = { len: 19.43, build: function (THREE, M, C) { return build(THREE, M, C, false); } };
  /* F-15E Strike Eagle: the same airframe with the two-seat canopy, the
     conformal fuel tanks, tangential bombs and the LANTIRN pods. */
  UNIT_MODELS["nato_e90_cas"] = { len: 19.43, build: function (THREE, M, C) { return build(THREE, M, C, true); } };
})();
