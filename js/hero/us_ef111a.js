/* ========== us_ef111a.js - HERO MODEL: General Dynamics/Grumman EF-111A Raven (e80, NATO) ==========

   Registered: nato_e80_ewair.

   Built from a published three-view (Wikimedia Commons, "General Dynamics
   EF-111A Raven 3-view line drawing") and a USAF photograph of 66-0015 parked
   on the apron at Cannon AFB, nose left. Published figures used: length
   23.16 m, span 19.20 m wings spread (16 deg) / 9.74 m fully swept (72.5 deg),
   height 6.10 m.

   WING POSITION: the model is parked WINGS SWEPT. The reference photograph
   shows exactly that - the Raven standing on its apron with the wings folded
   back along the fuselage - and parked F-111s were routinely left that way.
   Span 9.74 m, which also lets the type stand between the airbase revetment
   walls. (Spread, 19.2 m on 23.16 m of length, would be a quite different
   aeroplane in the game's scale-by-length drawing.)

   What makes it an EF-111A and not an F-111: the fin-tip pod (ALQ-99 receivers,
   from the fin top a little forward and well aft of the fin), the long ventral
   "canoe" radome (ALQ-99 jamming transmitters) in the weapons bay, the missing
   gun/pylons (no stores). Side-by-side crew capsule under a hinged canopy,
   the long ogival radome, two side intakes with half-cone spikes.

   Not confirmed from the references and therefore approximate: the exact
   intake lip station, the shape of the ventral strakes, the nose pitot boom
   (left out so it cannot shrink the scale), small blade antennas.
   Paint: overall light grey as in the photograph; no camouflage texture.

   THE REDO (the model evaluation found the old build the plainest of its
   kind: a lofted tube with flat slab wings, slab tail and fin, box intake
   mouths and box gear). Rebuilt on us_e2_hawkeye.js's kit, the same
   stations kept: the body a superellipse loft (flat sides and a flat
   underside from the capsule aft, the spine level to the fin), the glove,
   the swept panels, the tailplanes and the fin as aerofoil lofts, the
   quarter-round intakes as ducts with a lip, a dark throat and the half-
   cone spike, two TF30 nozzles with their petals and dark insides, the
   pivot fairings, the two ventral strakes (the three-view's side view:
   their shape NOT CONFIRMED), a proper nose leg with two wheels and the
   mains on raked trunnion legs, the main door hanging under the body. The
   fittings (seam ribbons, lamps, aerials, the refuelling receptacle) and
   a grey-scale paint sheet are laid over it. The tailplane is 8.1 m
   across on the three-view's plan (the old build had 6.8 m; measured on
   the 574 px drawing at 29 px/m doubled, NOT CONFIRMED to 0.2 m); the
   aft body is the plan's 2.9 m across the nacelles (the old build had
   2.2 m). The ground moved from -2.10 to -1.95: the old build's wheels lay
   flat (rotated about X), so its stated ground was never drawn; with the
   1.04 m main wheels on legs of the drawing's length the height reads 6.14
   m against the published 6.10 (the leg length is NOT CONFIRMED).

   Station reference: s = metres aft of the radome tip, X(s) = NOSE - s.
        0.00 radome tip      3.10 radome base      4.80 windscreen
        7.50 canoe starts    8.60 intake lip      12.3 wing leading edge at the glove
       17.10 fin root LE     20.2 fin pod starts   23.16 tailplane / pod aft end
*/
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroEF111 = (function () {
  "use strict";

  var V = null;
  var NOSE = 11.58;
  function X(s) { return NOSE - s; }
  var GROUND = -1.95;                /* tyre bottoms: the lowest opaque point (see THE REDO) */
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

  /* ========================================================= the body ==
     Rows: s, half-width, top, bottom, the widest line, squareness above
     and below (2 round, higher flatter). From the three-view's side and
     plan (13.9 px/m on the published 23.16 m): the long ogive radome, the
     crew capsule, the broad flat-sided centre body with the spine running
     level to the fin, the flat underside, the tail tapering up to the
     nozzles. */
  var BODY = [
    [0.00, 0.02, -0.32, -0.36, -0.34, 2.0, 2.0],
    [0.70, 0.17, -0.17, -0.50, -0.33, 2.0, 2.0],
    [1.60, 0.37, 0.04, -0.66, -0.31, 2.0, 2.0],
    [2.40, 0.54, 0.24, -0.78, -0.27, 2.0, 2.1],
    [3.15, 0.66, 0.40, -0.86, -0.22, 2.1, 2.2],
    [4.60, 0.86, 0.62, -0.98, -0.14, 2.2, 2.5],
    [6.00, 0.96, 0.84, -1.10, -0.10, 2.4, 2.9],
    [8.00, 1.00, 1.00, -1.18, -0.08, 2.7, 3.2],
    [10.5, 1.06, 1.02, -1.20, -0.10, 3.0, 3.4],
    [14.0, 1.30, 0.98, -1.20, -0.10, 3.2, 3.4],
    [17.0, 1.45, 0.92, -1.12, -0.12, 3.4, 3.4],
    [19.5, 1.40, 0.80, -0.96, -0.18, 3.2, 3.2],
    [21.5, 1.30, 0.60, -0.82, -0.26, 3.0, 3.0],
    [22.2, 1.18, 0.46, -0.74, -0.28, 2.8, 2.8]
  ];
  var BST = [0, 0.18, 0.4, 0.7, 1.1, 1.6, 2.0, 2.4, 2.8, 3.15, 3.8, 4.6, 5.3, 6.0, 7.0, 8.0, 9.2, 10.5,
             12.2, 14.0, 15.5, 17.0, 18.3, 19.5, 20.5, 21.5, 22.2];
  var BN = 36;
  function bodyPt(s, a, push) {      /* a: radians round from +Y (port) through the top */
    var r = tab(BODY, s);
    var c = Math.cos(a), sn = Math.sin(a), e = sn >= 0 ? 2 / r[4] : 2 / r[5];
    var y = r[0] * sgp(c, e), z = sn >= 0 ? r[3] + (r[1] - r[3]) * sgp(sn, e) : r[3] + (r[3] - r[2]) * sgp(sn, e);
    if (push) { var dz = z - r[3], L = Math.sqrt(y * y + dz * dz) || 1; y += push * y / L; z += push * dz / L; }
    return [X(s), y, z];
  }
  function addBody() {
    var rings = [], r, i, rad = [];
    for (r = 0; r < BST.length; r++) {
      var ring = [];
      for (i = 0; i < BN; i++) ring.push(bodyPt(BST[r], i / BN * Math.PI * 2, 0));
      if (BST[r] <= 3.15) rad.push(ring);
      if (BST[r] >= 3.15) rings.push(ring);
    }
    loftTo(rad, "radome", true, false);
    loftTo(rings, "skin", false, true);
  }

  /* the crew capsule's canopy: two clamshell hatches over the side-by-side
     seats, a sharply raked windscreen ahead of them */
  function addCanopy() {
    var CAN = [[4.75, 0.14, 0.62, 0.66], [5.30, 0.62, 0.76, 1.02], [6.00, 0.82, 0.86, 1.30],
               [6.80, 0.82, 0.92, 1.33], [7.50, 0.56, 0.96, 1.16], [7.90, 0.30, 0.98, 1.04]];
    var rings = CAN.map(function (q) { return ringSE(X(q[0]), 0, q[1], q[3], q[2], q[2], 2.2, 2.0, 24); });
    var top = rings.map(function (rg) { return rg.slice(0, 13); });
    loftTo(top, "glass", false, false);
    /* the frames: windscreen bow, the hatch centre bar and rear bows */
    var D = DX_;
    [5.30, 6.05, 7.45].forEach(function (s0) {
      var q = tab(CAN.map(function (c) { return [c[0], c[1], c[2], c[3]]; }), s0);
      put("frame", D.hoop(function (a) { return [X(s0), q[0] * sgp(Math.cos(a), 2 / 2.2) * 1.02, q[1] + (q[2] - q[1]) * sgp(Math.sin(a), 2 / 2.2) * 1.02]; },
                          0, Math.PI, 14, function () { return [X(s0), 0, q[1]]; }, 0.06, 0.0));
    });
    var cl = [];
    for (var k = 0; k <= 8; k++) { var s1 = 5.3 + 2.4 * k / 8, q2 = tab(CAN, s1); cl.push([X(s1), 0, q2[2] + 0.015]); }
    put("frame", D.ribbon(cl, [0, 0, 1], 0.07, 0));
    for (var sd = -1; sd <= 1; sd += 2) {     /* the sills */
      var sl = [];
      for (k = 0; k <= 8; k++) { var s2 = 4.9 + 2.9 * k / 8, q3 = tab(CAN, s2); sl.push([X(s2), sd * (q3[0] + 0.01), q3[1] + 0.02]); }
      put("frame", D.ribbon(sl, [0, sd, 0.4], 0.06, 0));
    }
  }

  /* =================================================== glove and wings ==
     The fixed glove from the body out to the pivot (y 2.2), and the outer
     panel swept to 72.5 degrees lying back along the body (the photograph
     of 66-0015 parked), above the tailplane. */
  function gloveSec(y) {
    var t = (y - 0.90) / 1.40, le = lerp(7.6, 12.6, t), te = lerp(19.2, 17.6, t);
    return { a: y, s: le, c: te - le, t: lerp(0.032, 0.062, t), o: lerp(0.24, 0.30, t) };
  }
  function panelSec(y) {
    var t = (y - 2.10) / (4.87 - 2.10), le = lerp(12.6, 20.1, t), te = lerp(17.9, 20.95, t);
    return { a: y, s: le, c: te - le, t: lerp(0.040, 0.075, t), o: lerp(0.40, 0.44, t) };
  }
  function tailSec(y) {
    var t = (y - 1.00) / (4.05 - 1.00), le = lerp(17.6, 21.0, t), te = lerp(22.9, 22.45, t);
    return { a: y, s: le, c: te - le, t: lerp(0.05, 0.06, t), o: -0.34 };
  }
  function finSec(z) {
    var t = (z - 0.60) / (3.44 - 0.60), le = lerp(17.1, 20.2, t), te = lerp(22.55, 22.4, t);
    return { a: z, s: le, c: te - le, t: lerp(0.05, 0.055, t), o: 0 };
  }
  function addWings() {
    var sd;
    for (sd = -1; sd <= 1; sd += 2) {
      foilLoft([0.9, 1.4, 1.9, 2.3].map(function (y) { var q = gloveSec(y); q.a *= sd; return q; }), "w", "skin");
      foilLoft([2.1, 2.9, 3.7, 4.45].map(function (y) { var q = panelSec(y); q.a *= sd; return q; }), "w", "skin");
      foilLoft([4.45, 4.87].map(function (y) { var q = panelSec(y); q.a *= sd; return q; }), "w", "team");
      foilLoft([1.0, 2.0, 3.0, 4.05].map(function (y) { var q = tailSec(y); q.a *= sd; return q; }), "w", "skin");
      /* the pivot fairing on the glove, the tailplane's pivot bulge */
      loftTo([0, 0.25, 0.6, 1.0].map(function (t) {
        var s0 = 14.2 + t * 1.6, h = Math.sin(Math.PI * Math.min(t * 1.4, 1)) * 0.12 + 0.02;
        return ringSE(X(s0), sd * 2.2, 0.18 + h, 0.42 + h, 0.24, 0.30, 2, 2, 12);
      }), "skin", true, true);
      loftTo([0, 0.3, 0.7, 1.0].map(function (t) {
        var s0 = 19.6 + t * 2.4, h = Math.sin(Math.PI * t) * 0.22 + 0.04;
        return ringSE(X(s0), sd * 1.38, 0.10 + h * 0.6, -0.20 + h * 0.5, -0.50 - h * 0.3, -0.34, 2, 2, 12);
      }), "skin", true, true);
    }
    foilLoft([0.6, 1.6, 2.6, 3.44].map(finSec), "f", "skin");
    /* the ventral strakes under the tail, canted out */
    for (sd = -1; sd <= 1; sd += 2) {
      var sk = [];
      [[0, 0.95], [1, 0.70]].forEach(function (q) {
        var z = -0.95 - q[0] * 0.55, y = sd * (q[1]);
        sk.push(foilRing({ a: z, s: 19.4 + q[0] * 0.9, c: 2.3 - q[0] * 1.1, t: 0.05, o: y }, "f"));
      });
      loftTo(sk, "skin", true, true);
    }
  }

  /* ============================================================ intakes ==
     The quarter-round intakes under the glove, the splitter standing off
     the body, the half-cone spike in each mouth, the dark duct; the duct
     fairing runs aft into the body under the glove. */
  function addIntakes() {
    var sd, k;
    for (sd = -1; sd <= 1; sd += 2) {
      var yc = sd * 1.22;
      var rows = [[8.70, 0.36, 0.20, -0.62], [9.4, 0.42, 0.22, -0.70], [10.6, 0.46, 0.24, -0.76],
                  [12.4, 0.46, 0.24, -0.78], [14.2, 0.42, 0.22, -0.74], [16.0, 0.30, 0.20, -0.62], [17.4, 0.10, 0.16, -0.40]];
      var rings = rows.map(function (q) { return ringSE(X(q[0]), yc, q[1], q[2], q[3], q[2] - 0.05, 4.0, 2.2, 28); });
      loftTo(rings, "skin", false, true);
      /* the mouth: the lip's inner ring and the dark duct inside it */
      var lip = ringSE(X(8.74), yc, 0.30, 0.15, -0.55, 0.10, 4.0, 2.2, 28);
      loftTo([rings[0], lip], "metal", false, false);
      var deep = ringSE(X(9.6), yc, 0.28, 0.13, -0.50, 0.08, 4.0, 2.2, 28);
      loftTo([lip, deep], "ink", false, true);
      /* the quarter-cone spike against the inner wall, top of the mouth */
      var sp = [];
      for (k = 0; k <= 4; k++) {
        var t = k / 4, r = 0.30 * Math.pow(t, 0.8) + 0.01, ring = [], j;
        for (j = 0; j <= 8; j++) {
          var a = Math.PI / 2 + j / 8 * Math.PI / 2;
          ring.push([X(7.95 + t * 1.2), yc - sd * 0.30 + sd * r * -Math.cos(a) * 1.0, 0.18 + r * -Math.sin(a) * 1.0 + 0.0]);
        }
        sp.push(ring);
      }
      var sh = new Shell();
      sh.loft(sp, function () { return "metal"; }, null, null);
      sh.emit();
    }
  }

  /* ========================================================= nozzles ==
     Two TF-30 nozzles under the tail, their petals; the dark inside. */
  function addNozzles() {
    var sd, k, j;
    for (sd = -1; sd <= 1; sd += 2) {
      var yc = sd * 0.60, zc = -0.30, rings = [];
      [[21.2, 0.50], [21.9, 0.50], [22.4, 0.47], [23.0, 0.42]].forEach(function (q, ri) {
        var ring = [];
        for (j = 0; j < 32; j++) {
          var a = j / 32 * Math.PI * 2, r = q[1] * (ri >= 2 ? (j % 2 ? 0.985 : 1.0) : 1.0);
          ring.push([X(q[0]), yc + r * Math.cos(a), zc + r * Math.sin(a)]);
        }
        rings.push(ring);
      });
      loftTo(rings.slice(0, 2), "burnt", false, false);
      loftTo(rings.slice(1), "steel", false, false);
      var inner = rings[3].map(function (p) { return [p[0] + 0.02, yc + (p[1] - yc) * 0.9, zc + (p[2] - zc) * 0.9]; });
      var deep = rings[3].map(function (p) { return [p[0] + 0.7, yc + (p[1] - yc) * 0.82, zc + (p[2] - zc) * 0.82]; });
      loftTo([rings[3], inner], "steel", false, false);
      loftTo([inner, deep], "ink", false, true);
      for (k = 0; k < 16; k++) {       /* the petal joints */
        var a2 = k / 16 * Math.PI * 2;
        put("ink", rod([X(22.4), yc + 0.475 * Math.cos(a2), zc + 0.475 * Math.sin(a2)],
                       [X(22.98), yc + 0.43 * Math.cos(a2), zc + 0.43 * Math.sin(a2)], 0.012, 4));
      }
    }
  }

  /* ============================================== canoe, pod, small parts */
  function addPods() {
    /* the ALQ-99 transmitter canoe in the weapons bay */
    var CN = [[7.50, 0.20, -1.08, -1.20], [8.30, 0.52, -1.06, -1.38], [9.80, 0.60, -1.06, -1.48],
              [11.4, 0.54, -1.06, -1.44], [12.4, 0.22, -1.08, -1.26]];
    loftTo(CN.map(function (q) { return ringSE(X(q[0]), 0, q[1], q[2], q[3], -1.12, 2, 2.4, 28); }), "radome", true, true);
    /* the receiver pod on the fin tip */
    var PD = [[20.05, 0.08, 3.70, 3.60], [20.50, 0.36, 3.98, 3.32], [21.30, 0.52, 4.16, 3.18],
              [22.40, 0.50, 4.19, 3.20], [23.04, 0.30, 3.98, 3.36], [23.14, 0.12, 3.82, 3.50]];
    loftTo(PD.map(function (q) { return ringSE(X(q[0]), 0, q[1], q[2], q[3], 3.64, 2.4, 2.2, 28); }), "radome", true, true);
    for (var sd = -1; sd <= 1; sd += 2) {
      put("ink", boxG(0.50, 0.04, 0.30, X(20.9), sd * 0.47, 3.62));     /* receiver apertures */
      put("metal", boxG(0.22, 0.16, 0.22, X(20.7), sd * 0.50, 3.80));
    }
    put("metal", boxG(0.70, 0.30, 0.26, X(22.0), 0, 0.56));        /* drag chute fairing */
    put("metal", rod([X(19.6), 0, -0.98], [X(20.8), 0, -0.88], 0.05, 6));   /* hook */
  }

  /* ================================================================ gear */
  function addGear() {
    var sd;
    /* nose: one leg, two wheels, the drag brace, the long door */
    var nr = 0.28, nz = GROUND + nr;
    gput("steel", rod([X(6.9), 0, -1.05], [X(6.95), 0, nz], 0.07, 8));
    gput("steel", rod([X(7.6), 0, -1.08], [X(6.95), 0, nz + 0.35], 0.04, 6));
    for (sd = -1; sd <= 1; sd += 2) {
      gput("rubber", wheelG(nr, 0.17, X(6.95), sd * 0.17, nz, 22));
      gput("metal", wheelG(0.13, 0.19, X(6.95), sd * 0.17, nz, 10));
      gput("skin", boxG(1.3, 0.04, 0.62, X(7.25), sd * 0.34, -1.40));
    }
    /* mains: the trunnion legs from the body, one big wheel a side, the
       main door that is also the airbrake hanging under the body */
    var mr = 0.52, mz = GROUND + mr;
    for (sd = -1; sd <= 1; sd += 2) {
      gput("steel", rod([X(14.4), sd * 0.80, -1.12], [X(14.7), sd * 1.40, mz], 0.11, 8, 0.13));
      gput("steel", rod([X(13.6), sd * 0.70, -1.15], [X(14.6), sd * 1.30, mz + 0.30], 0.05, 6));
      gput("rubber", wheelG(mr, 0.36, X(14.7), sd * 1.40, mz, 30));
      gput("metal", wheelG(0.26, 0.40, X(14.7), sd * 1.40, mz, 14));
    }
    gput("skin", boxG(2.6, 1.30, 0.05, X(14.3), 0, -1.50));
    gput("steel", rod([X(13.2), 0, -1.22], [X(13.4), 0, -1.48], 0.05, 6));
  }

  /* ========================================================== details ==
     (the redo) seam ribbons for the panel breaks and control hinge lines,
     the lamps, the blade aerials, the air-refuelling receptacle on the
     spine, the pitot boom left out (as before), AoA vanes. */
  var DX_ = null;
  function bodyHoop(s, a0, a1) {
    var r = tab(BODY, s);
    return DX_.hoop(function (a) { return bodyPt(s, a, 0); }, a0, a1, 24, function () { return [X(s), 0, r[3]]; }, 0.04, 0.012);
  }
  function wLine(secOf, y0, y1, u0, u1, sg) {
    var pts = [], i;
    for (i = 0; i <= 6; i++) {
      var q = secOf(Math.abs(y0 + (y1 - y0) * i / 6)), u = u0 + (u1 - u0) * i / 6;
      pts.push([X(q.s + u * q.c), y0 + (y1 - y0) * i / 6, q.o + sg * foilTh(q.t, q.c, u)]);
    }
    return DX_.ribbon(pts, [0, 0, sg], 0.04, 0.01);
  }
  function addDetails() {
    var sd, i, D = DX_;
    [3.15, 4.6, 8.2, 10.4, 12.6, 15.0, 17.2, 19.4, 21.2].forEach(function (s) {
      put("seam", bodyHoop(s, s > 7.9 ? -0.15 : -0.2, Math.PI + (s > 7.9 ? 0.15 : 0.2)));
    });
    for (sd = -1; sd <= 1; sd += 2) {
      put("seam", wLine(panelSec, sd * 2.2, sd * 4.75, 0.72, 0.72, 1));     /* flap / spoiler line */
      put("seam", wLine(panelSec, sd * 2.2, sd * 4.75, 0.12, 0.12, 1));     /* slat line */
      put("seam", wLine(tailSec, sd * 1.1, sd * 4.0, 0.30, 0.30, 1));       /* the pivot spar */
      put("seam", wLine(gloveSec, sd * 1.1, sd * 2.25, 0.62, 0.62, 1));
      /* AoA vanes and the capsule's hatch outline */
      put("metal", boxG(0.30, 0.05, 0.14, X(2.6), sd * 0.53, -0.16));
      var hp = [], hn = [];
      [[5.0, 0.1], [6.9, 0.1], [6.9, -0.6], [5.0, -0.6], [5.0, 0.1]].forEach(function (q, k, arr) {
        if (k === 0) return;
        var a = arr[k - 1];
        for (var j = 0; j <= 4; j++) {
          var ss = a[0] + (q[0] - a[0]) * j / 4, zz = a[1] + (q[1] - a[1]) * j / 4, r = tab(BODY, ss);
          var aa = Math.asin(clamp((zz - r[3]) / Math.max(0.01, (zz > r[3] ? r[1] - r[3] : r[3] - r[2])), -0.99, 0.99));
          var pp = bodyPt(ss, sd > 0 ? aa : Math.PI - aa, 0.012); hp.push(pp); hn.push([0, sd, 0]);
        }
      });
      put("seam", D.ribbon(hp, hn, 0.04, 0));
      /* lamps on the glove tips and the tail */
      put("lamp", D.lamp([X(13.0), sd * 2.32, 0.30], 0.06, sd > 0 ? 0xe02218 : 0x18c04a));
    }
    /* rudder hinge line, both faces */
    for (sd = -1; sd <= 1; sd += 2) {
      var rp = [];
      for (i = 0; i <= 5; i++) { var z = 0.9 + 2.4 * i / 5, f = finSec(z); rp.push([X(f.s + 0.74 * f.c), sd * (foilTh(f.t, f.c, 0.74) + 0.005), z]); }
      put("seam", D.ribbon(rp, [0, sd, 0], 0.045, 0.006));
    }
    put("lamp", D.lamp([X(23.07), 0, 3.70], 0.05, 0xf4f1e0));
    put("lamp", D.lamp(bodyPt(10.0, Math.PI / 2, 0.03), 0.08, 0xe02218));
    put("lamp", D.lamp(bodyPt(16.0, -Math.PI / 2, 0.03), 0.08, 0xe02218));
    /* blade aerials on the spine and belly */
    [[9.0, 1], [15.8, 1], [5.6, -1], [16.8, -1]].forEach(function (q) {
      var p = bodyPt(q[0], q[1] * Math.PI / 2, 0);
      put("ink", D.blade(p, [0, 0, q[1]], [1, 0, 0], 0.30, 0.32, 0.12, 0.03, 0.12));
    });
    /* the refuelling receptacle on the spine behind the capsule */
    var rc = bodyPt(8.6, Math.PI / 2, 0.005);
    put("ink", boxG(0.55, 0.30, 0.02, rc[0], 0, rc[2]));
  }

  /* ========================================================== paint ==
     A grey-scale sheet over the one grey (us_e2_hawkeye.js's kit): the
     frames, the wing and tail panel lines, the walkway over the spine,
     soot behind the nozzles, weathering. */
  var LAY = null, _sheet = null;
  function paintSheet() {
    if (_sheet !== null) return _sheet;
    try {
      var top = [], bot = [], riv = [], fr = [], side = [];
      function wl(secOf, u, y0, y1) {
        var out = [], k;
        for (k = 0; k <= 5; k++) { var y = y0 + (y1 - y0) * k / 5, q = secOf(y); out.push([X(q.s + u * q.c), y]); }
        return out;
      }
      top.push(wl(panelSec, 0.12, 2.2, 4.8), wl(panelSec, 0.72, 2.2, 4.8), wl(gloveSec, 0.3, 0.9, 2.3), wl(gloveSec, 0.62, 0.9, 2.3),
               wl(tailSec, 0.3, 1.0, 4.05), wl(tailSec, 0.7, 1.0, 4.05));
      bot.push(wl(gloveSec, 0.3, 0.9, 2.3), wl(tailSec, 0.3, 1.0, 4.05));
      riv.push(wl(panelSec, 0.4, 2.2, 4.8), wl(gloveSec, 0.45, 0.9, 2.3));
      [1.6, 3.15, 4.6, 6.0, 8.2, 9.3, 10.4, 11.5, 12.6, 13.8, 15.0, 16.1, 17.2, 18.3, 19.4, 20.3, 21.2].forEach(function (s) {
        fr.push([X(s), tab(BODY, s)[0]]);
      });
      side.push([[X(3.2), 0.30], [X(22.0), 0.30]], [[X(8.0), -0.70], [X(21.0), -0.60]]);
      _sheet = DX_.sheet(LAY, {
        frames: fr, top: top, bot: bot, rivets: riv, side: side, seam: 0.55, grime: 180,
        walk: [[[X(8.0), 0.35], [X(17.0), 0.35], [X(17.0), 0.75], [X(8.0), 0.75]]],
        soot: [[X(21.0), 0.6, -0.3, 2.2, 0.45]]
      }, 1111);
    } catch (e) { _sheet = false; }
    return _sheet;
  }

  function mats(C, tex) {
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    var m = {
      skin: new V.MeshStandardMaterial({ color: 0x9aa3a8, roughness: 0.80, metalness: 0.08, side: V.DoubleSide }),
      radome: new V.MeshStandardMaterial({ color: 0xb9b3a0, roughness: 0.60, metalness: 0.05, side: V.DoubleSide }),
      metal: new V.MeshStandardMaterial({ color: 0x8d9399, roughness: 0.52, metalness: 0.50, side: V.DoubleSide }),
      steel: new V.MeshStandardMaterial({ color: 0x6f757a, roughness: 0.48, metalness: 0.60, side: V.DoubleSide }),
      burnt: new V.MeshStandardMaterial({ color: 0x5d5751, roughness: 0.52, metalness: 0.58, side: V.DoubleSide }),
      ink: new V.MeshStandardMaterial({ color: 0x15181a, roughness: 0.95, metalness: 0.05, side: V.DoubleSide }),
      rubber: new V.MeshStandardMaterial({ color: 0x17181a, roughness: 0.95, metalness: 0.04 }),
      glass: new V.MeshStandardMaterial({ color: 0x1d2e33, roughness: 0.10, metalness: 0.35, side: V.DoubleSide }),
      frame: new V.MeshStandardMaterial({ color: 0x5f676c, roughness: 0.6, metalness: 0.3, side: V.DoubleSide }),
      seam: new V.MeshStandardMaterial({ color: 0x4f5659, roughness: 0.85, metalness: 0.05, side: V.DoubleSide }),
      lamp: new V.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.3, metalness: 0.0,
                                         emissive: 0x333333, emissiveIntensity: 0.6 }),
      /* exactly C.team so eraPaint's team test leaves it alone */
      team: new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                         emissive: new V.Color(tc), emissiveIntensity: 0.10, side: V.DoubleSide })
    };
    if (tex) m.skin.map = tex;
    return m;
  }
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

  function build(THREE, Mlib, C) {
    V = THREE; K = {}; G = {};
    DX_ = DK(V);
    addBody(); addCanopy(); addWings(); addIntakes(); addNozzles(); addPods(); addGear(); addDetails();
    /* team: the fin band either side, a strip on the spine */
    for (var sd = -1; sd <= 1; sd += 2) {
      var band = [];
      for (var i = 0; i <= 4; i++) { var z = 2.0 + 0.6 * i / 4, f = finSec(z); band.push([X(f.s + 0.25 * f.c), sd * (foilTh(f.t, f.c, 0.25) + 0.004), z]); }
      put("team", DX_.ribbon(band, [0, sd, 0], 1.0, 0.004));
    }
    var sp = bodyPt(13.6, Math.PI / 2, 0.01);
    put("team", boxG(1.10, 0.60, 0.02, sp[0], 0, sp[2]));
    LAY = DX_.layout(X(23.3), X(-0.1), 4.9, GROUND, 4.3);
    var T = mats(C, paintSheet());
    var g = new V.Group();
    emit(g, K, T, ["skin", "radome", "team", "seam", "frame", "glass", "metal", "steel", "burnt", "ink", "lamp"]);
    var gear = new V.Group(); gear.name = "gear";
    emit(gear, G, T, ["skin", "steel", "metal", "rubber"]);
    g.add(gear);
    return g;
  }

  return { build: build };
})();

UNIT_MODELS["nato_e80_ewair"] = { len: 23.16, build: function (THREE, M, C) { return HeroEF111.build(THREE, M, C); } };
