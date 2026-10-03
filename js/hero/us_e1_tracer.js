/* ============ us_e1_tracer.js -- Grumman WF-2 / E-1B Tracer (HERO MODEL) ============

   The Navy's first carrier airborne-early-warning type with its radar in a
   fixed radome: the S-2 Tracker's wing, engines and gear under an AN/APS-82
   teardrop on struts over the fuselage, the horizontal tail with a fin at each
   tip and a small one on the centreline (three fins, as the photograph shows). One row draws it: nato_e50_cawacs (1958), which
   until now borrowed the Hawkeye hero model.

   Published figures: length 13.26 m (43 ft 6 in), span 22.12 m (72 ft 3.9 in),
   height 5.13 m (16 ft 10 in). Measured 13.26 x 22.12 x 5.135 m.

   What each feature rests on:
     "Grumman WF-2 Tracker 3-view line drawing.png" (Wikimedia Commons, a Bureau
     of Aeronautics descriptive arrangement of the WF-2, public domain), read as
     follows. Radome 19 ft 3 in (5.87 m) wide, about 9.6 m long from over the
     cockpit to the tail, its top level with the fin tip at 5.13 m, a pair of
     struts under it and two splayed struts to the nacelles; the wing in plan 2.8 m
     chord at the root to 1.6 m at the tip, trailing edge swept forward a
     little; engines 2.85 m off the centreline, 3-blade propellers about 3.5 m
     across with the axis 2.5 m up; main track 18 ft 6 in (5.64 m) on 34 in tyres
     under the nacelles aft of the wing, a single 18 in nose wheel right under
     the nose, a small 7.5 in tail wheel under the tail cone; tailplane span
     26 ft 8 in (8.13 m) with a fin on each tip reaching 3.6 m above and 1 m
     below it. The drawing's own length figure is 44 ft 6 in (13.56 m), over
     the nose and tail wheels; the model keeps the 13.26 m the E-1B is quoted
     at. The fuselage cross-section, cabin windows and nacelle depth are read
     off its side view.
     "Grumman WF-2 E-1B Tracer.jpg" (Commons, four E-1Bs of VAW-11 in flight): the
     third, small centre fin on the tailplane between the two end fins (the
     drawing's side view shows only the near end fin), the white upper radome
     with a dark underside, the near-white nose and nacelles, the deep forward
     cockpit with its side windows, the nose wheel under the nose. The brief's
     note "no central fin" disagrees with this photograph and the row's own
     description ("the fin split into three"); the model follows them.
     Not confirmed: the paint is the Navy's published light gull grey over white
     with a white radome (the photograph is black and white), the centre fin's
     exact height is read off it by eye, and the fold line of the wing, the antennas and the tail hook (not in the
     drawing) are left out rather than guessed.

   The wing is drawn spread. The propellers are see-through blur discs with
   three blades painted on them; they are not animated. Team colour (exactly
   C.team): the wing tips, the fin tips and a band across the radome.
   Budget: about 6,900 triangles, 10 draw calls, 9 materials. The gear is the
   lowest opaque part.
   Model space: +X nose, +Y left (port), +Z up, metres; s is metres aft of the
   nose, h metres above the ground; the nose and the fin trailing edge are the
   two extremes in X.
   ========================================================================= */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroE1 = (function () {
  "use strict";

  var V = null;                         /* THREE, set by build()                  */
  var D2R = Math.PI / 180;
  var XN = 6.63;
  var ZG = -2.60;                       /* the ground                             */
  function X(s) { return XN - s; }
  function Z(h) { return h + ZG; }

  function lerp(a, b, t) { return a + (b - a) * t; }
  function sgp(v, e) { return v < 0 ? -Math.pow(-v, e) : Math.pow(v, e); }
  function cr(p0, p1, p2, p3, t) {
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t +
                  (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
  }
  /* a smooth look-up in a table whose first column is the station */
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

  /* ============================================================ shells ==
     Every skin part is a ring loft. A triangle is wound to face away from the
     inside of its ring pair (outDir), so no part depends on how a table was
     written; the normals are smoothed over the shared vertices, the end caps
     keep their own vertices and so their sharp edge. Category 0 and 1 are the
     two sides of a ring (the upper skin and the lower skin, painted
     differently), 2 is a cap. */
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
  Shell.prototype.fan = function (ring, c, ref) {
    var n = ring.length, ic = this.vert(c), ids = [], i;
    var od = [c[0] - ref[0], c[1] - ref[1], c[2] - ref[2]];
    for (i = 0; i < n; i++) ids.push(this.vert(ring[i]));
    for (i = 0; i < n; i++) this.tri(ic, ids[i], ids[(i + 1) % n], 2, od);
  };
  /* rings joined to each other; upper(i) says which skin segment i belongs to */
  Shell.prototype.loft = function (rings, upper, capA, capB) {
    var R = rings.length, n = rings[0].length, r, i, j, idx = [], cent = [];
    for (r = 0; r < R; r++) {
      var row = [], cx = 0, cy = 0, cz = 0;
      for (i = 0; i < n; i++) {
        var p = rings[r][i];
        row.push(this.vert(p)); cx += p[0]; cy += p[1]; cz += p[2];
      }
      idx.push(row); cent.push([cx / n, cy / n, cz / n]);
    }
    for (r = 0; r + 1 < R; r++) {
      var mc = [(cent[r][0] + cent[r + 1][0]) / 2, (cent[r][1] + cent[r + 1][1]) / 2,
                (cent[r][2] + cent[r + 1][2]) / 2];
      for (i = 0; i < n; i++) {
        j = (i + 1) % n;
        var A = rings[r][i], B = rings[r][j], C = rings[r + 1][j], D = rings[r + 1][i];
        var od = [(A[0] + B[0] + C[0] + D[0]) / 4 - mc[0], (A[1] + B[1] + C[1] + D[1]) / 4 - mc[1],
                  (A[2] + B[2] + C[2] + D[2]) / 4 - mc[2]];
        var cat = upper(i) ? 0 : 1;
        this.tri(idx[r][i], idx[r][j], idx[r + 1][j], cat, od);
        this.tri(idx[r][i], idx[r + 1][j], idx[r + 1][i], cat, od);
      }
    }
    if (capA) this.fan(rings[0], cent[0], cent[1]);
    if (capB) this.fan(rings[R - 1], cent[R - 1], cent[R - 2]);
  };
  /* a flat quad (glass), facing away from the point ref */
  Shell.prototype.quad = function (a, b, c, d, cat, ref) {
    var ia = this.vert(a), ib = this.vert(b), ic = this.vert(c), id = this.vert(d);
    var od = [(a[0] + b[0] + c[0] + d[0]) / 4 - ref[0], (a[1] + b[1] + c[1] + d[1]) / 4 - ref[1],
              (a[2] + b[2] + c[2] + d[2]) / 4 - ref[2]];
    this.tri(ia, ib, ic, cat, od); this.tri(ia, ic, id, cat, od);
  };
  /* smooth the normals and hand each category to its material's list */
  Shell.prototype.emit = function (map) {
    var P = this.P, T = this.T, N = [], i, k, c;
    for (i = 0; i < P.length; i++) N.push([0, 0, 0]);
    for (k = 0; k < T.length; k++) {
      var t = T[k], pa = P[t[0]], pb = P[t[1]], pc = P[t[2]];
      var ux = pb[0] - pa[0], uy = pb[1] - pa[1], uz = pb[2] - pa[2];
      var vx = pc[0] - pa[0], vy = pc[1] - pa[1], vz = pc[2] - pa[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      for (i = 0; i < 3; i++) { var q = N[t[i]]; q[0] += nx; q[1] += ny; q[2] += nz; }
    }
    for (i = 0; i < N.length; i++) {
      var m = Math.sqrt(N[i][0] * N[i][0] + N[i][1] * N[i][1] + N[i][2] * N[i][2]) || 1;
      N[i][0] /= m; N[i][1] /= m; N[i][2] /= m;
    }
    for (c = 0; c < 3; c++) {
      var pos = [], nor = [];
      for (k = 0; k < T.length; k++) {
        if (T[k][3] !== c) continue;
        for (i = 0; i < 3; i++) {
          var p = P[T[k][i]], nn = N[T[k][i]];
          pos.push(p[0], p[1], p[2]); nor.push(nn[0], nn[1], nn[2]);
        }
      }
      if (!pos.length) continue;
      var g = new V.BufferGeometry();
      g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
      g.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
      put(map[c], g);
    }
  };

  var K = null;                          /* the lists, one per material           */
  function put(key, g) { (K[key] || (K[key] = [])).push(g); }

  /* ======================================================== the fuselage ==
     Rows: station s, half-width, top h, bottom h. */
  var FUS = [
    [0.00, 0.05, 1.75, 1.45],
    [0.30, 0.42, 2.10, 1.12],
    [0.80, 0.66, 2.50, 0.95],
    [1.40, 0.82, 2.85, 0.82],
    [2.20, 0.92, 3.02, 0.76],
    [3.20, 0.95, 3.00, 0.72],
    [4.50, 0.95, 2.95, 0.72],
    [6.00, 0.93, 2.92, 0.74],
    [7.50, 0.88, 2.88, 0.78],
    [9.00, 0.78, 2.84, 0.90],
    [10.2, 0.62, 2.78, 1.10],
    [11.4, 0.46, 2.72, 1.30],
    [12.4, 0.30, 2.64, 1.45],
    [13.0, 0.14, 2.58, 1.55]
  ];
  var FST = [0, 0.10, 0.30, 0.80, 1.4, 2.2, 3.2, 4.5, 6.0, 7.5, 9.0, 10.2, 11.4, 12.4, 13.0];
  var FEXP = 0.8, FN = 32;
  function fusPt(s, a, push) {
    var r = tab(FUS, s), hw = r[0], ht = r[1], hb = r[2], hm = (ht + hb) / 2, hh = (ht - hb) / 2;
    var y = hw * sgp(Math.sin(a * D2R), FEXP), h = hm + hh * sgp(Math.cos(a * D2R), FEXP);
    if (push) {
      var dh = h - hm, L = Math.sqrt(y * y + dh * dh) || 1;
      y += push * y / L; h += push * dh / L;
    }
    return [X(s), y, Z(h)];
  }
  function upperSeg(n) {
    return function (i) { var m = (i + 0.5) * 360 / n; return m < 105 || m > 255; };
  }
  function addFuselage() {
    var rings = [], r, i, sh = new Shell();
    for (r = 0; r < FST.length; r++) {
      var ring = [];
      for (i = 0; i < FN; i++) ring.push(fusPt(FST[r], i * 360 / FN, 0));
      rings.push(ring);
    }
    sh.loft(rings, upperSeg(FN), true, true);
    sh.emit({ 0: "top", 1: "bot", 2: "top" });
  }

  /* ========================================================= airfoil lofts
     frame "w": sections across the span (a = y), the thickness up and down;
     frame "f": sections up a fin or a strut (a = h), the thickness across.
     s is the leading edge's station, c the chord, t the thickness ratio, o the
     height (w) or the lateral offset (f) of the section's centre. */
  function foilRing(sec, frame, KC) {
    var up = [], lo = [], j, u, th, ring = [];
    for (j = 0; j <= KC; j++) {
      u = (1 - Math.cos(Math.PI * j / KC)) / 2;
      th = sec.t * sec.c * (1.4845 * Math.sqrt(u) - 0.63 * u - 1.758 * u * u +
                            1.4215 * u * u * u - 0.518 * u * u * u * u);
      if (frame === "w") {
        up.push([X(sec.s + u * sec.c), sec.a, Z(sec.o + th)]);
        lo.push([X(sec.s + u * sec.c), sec.a, Z(sec.o - th)]);
      } else {
        up.push([X(sec.s + u * sec.c), sec.o + th, Z(sec.a)]);
        lo.push([X(sec.s + u * sec.c), sec.o - th, Z(sec.a)]);
      }
    }
    for (j = 0; j <= KC; j++) ring.push(up[j]);
    for (j = KC - 1; j >= 1; j--) ring.push(lo[j]);
    return ring;
  }
  var FK = 12;
  function foil(secs, frame, map) {
    var rings = [], i, sh = new Shell();
    for (i = 0; i < secs.length; i++) rings.push(foilRing(secs[i], frame, FK));
    sh.loft(rings, function (i) { return i < FK; }, true, true);
    sh.emit(map);
  }


  /* ============================================================== wing ==
     High wing, 22.12 m: chord 3.0 m on the centreline to 1.3 m at the tip,
     leading edge a little back, 17 per cent thick at the root to 12. */
  var HALF = 11.06;
  function wingSec(y) {
    var a = Math.abs(y);
    return { a: y, s: 3.56 + 0.058 * a, c: 2.8 - 0.1086 * a, t: 0.16 - 0.0036 * a,
             o: a < 2.85 ? 2.8 : 2.8 + (a - 2.85) * 0.03 };
  }
  function addWing() {
    var ys = [-10.3, -7.5, -5.0, -3.1, -1.2, 0, 1.2, 3.1, 5.0, 7.5, 10.3], i, secs = [];
    for (i = 0; i < ys.length; i++) secs.push(wingSec(ys[i]));
    foil(secs, "w", { 0: "top", 1: "bot", 2: "top" });
    foil([wingSec(10.3), wingSec(HALF)], "w", { 0: "team", 1: "bot", 2: "team" });
    foil([wingSec(-HALF), wingSec(-10.3)], "w", { 0: "team", 1: "bot", 2: "team" });
  }

  /* ============================================================== tail == */
  var TAIL_END = 13.26;
  var TH = 4.06;
  function tpSec(y) {
    var a = Math.abs(y);
    return { a: y, s: 11.75 + 0.02 * a, c: 1.35 - 0.05 * a, t: 0.12 - 0.004 * a, o: 2.45 + 0.02 * a };
  }
  function finSecs(yc, hs, sle, cs, t) {
    var out = [], i;
    for (i = 0; i < hs.length; i++) out.push({ a: hs[i], s: sle[i], c: cs[i], t: t[i], o: yc });
    return out;
  }
  function addTail() {
    var ys = [-TH, -2.6, -1.2, 0, 1.2, 2.6, TH], i, secs = [], sd, yc;
    for (i = 0; i < ys.length; i++) secs.push(tpSec(ys[i]));
    foil(secs, "w", { 0: "top", 1: "bot", 2: "top" });
    for (sd = -1; sd <= 1; sd += 2) {
      yc = sd * (TH - 0.1);
      foil(finSecs(yc, [1.5, 2.5, 3.8, 5.13], [11.75, 11.6, 11.85, 12.15],
                   [1.5, 1.62, 1.35, 1.11], [0.13, 0.13, 0.11, 0.09]), "f",
           { 0: "top", 1: "top", 2: "top" });
      foil(finSecs(yc, [4.5, 5.13], [11.95, 12.15], [1.31, 1.11], [0.10, 0.09]), "f",
           { 0: "team", 1: "team", 2: "team" });
    }
    /* the small centre fin between the two end fins (the VAW-11 photograph) */
    foil(finSecs(0, [2.4, 3.3, 4.2, 4.7], [11.35, 11.55, 11.8, 11.95], [1.65, 1.35, 1.0, 0.85],
                 [0.10, 0.09, 0.08, 0.07]), "f", { 0: "top", 1: "top", 2: "top" });
  }

  /* ========================================================== nacelles ==
     Two Wright R-1820 radials 3.1 m out, the axis 2.05 m up; the cowl runs
     back along the wing into the main-gear housing. */
  var NAC = [
    [2.28, 0.52, 0.50, 0.50],
    [2.80, 0.64, 0.55, 0.60],
    [4.00, 0.66, 0.50, 0.72],
    [5.50, 0.62, 0.48, 0.85],
    [7.00, 0.50, 0.40, 0.85],
    [8.20, 0.30, 0.28, 0.70],
    [8.60, 0.10, 0.15, 0.50]
  ];
  var NST = [2.28, 2.40, 2.65, 3.0, 3.8, 4.7, 5.6, 6.6, 7.4, 8.0, 8.4, 8.6];
  var NY = 2.85, NH = 2.50, NN = 28, NEXP = 2 / 2.3, PX = 2.28, PR = 1.75;
  function addNacelles() {
    var sd, r, i, rings, sh, row;
    for (sd = -1; sd <= 1; sd += 2) {
      rings = []; sh = new Shell();
      for (r = 0; r < NST.length; r++) {
        row = tab(NAC, NST[r]);
        var ring = [];
        for (i = 0; i < NN; i++) {
          var a = i * 360 / NN, sa = Math.sin(a * D2R), ca = Math.cos(a * D2R);
          ring.push([X(NST[r]), sd * NY + row[0] * sgp(sa, NEXP),
                     Z(NH + (ca >= 0 ? row[1] : row[2]) * sgp(ca, NEXP))]);
        }
        rings.push(ring);
      }
      sh.loft(rings, upperSeg(NN), true, true);
      sh.emit({ 0: "top", 1: "bot", 2: "dark" });
      /* the spinner */
      var SP = [[1.65, 0.03], [1.73, 0.14], [1.85, 0.23], [2.0, 0.29], [2.15, 0.32], [2.28, 0.33]],
                sr = [], sh2 = new Shell();
      for (r = 0; r < SP.length; r++) {
        var ring2 = [];
        for (i = 0; i < 14; i++) {
          var b = i * 2 * Math.PI / 14;
          ring2.push([X(SP[r][0]), sd * NY + SP[r][1] * Math.cos(b), Z(NH) + SP[r][1] * Math.sin(b)]);
        }
        sr.push(ring2);
      }
      sh2.loft(sr, function () { return true; }, true, true);
      sh2.emit({ 0: "dark", 1: "dark", 2: "dark" });
    }
  }

  /* =============================================================== radome
     The APS-82 radome: a fixed teardrop on two struts over the fuselage, blunt
     at the front, drawn out to a point behind. Rows: station, half-width, top
     h, bottom h. */
  var RAD = [
    [1.60, 0.05, 4.15, 4.05],
    [2.00, 1.00, 4.55, 3.85],
    [2.80, 1.75, 4.90, 3.65],
    [4.00, 2.35, 5.07, 3.55],
    [5.40, 2.75, 5.10, 3.52],
    [7.00, 2.90, 5.10, 3.55],
    [8.60, 2.75, 5.08, 3.60],
    [9.80, 2.30, 4.95, 3.70],
    [10.6, 1.55, 4.80, 3.82],
    [11.1, 0.70, 4.60, 3.95],
    [11.25, 0.05, 4.45, 4.15]
  ];
  var RST = [1.60, 1.68, 1.85, 2.2, 2.8, 3.6, 4.6, 5.8, 7.0, 8.2, 9.3, 10.1, 10.7, 11.05, 11.25];
  function addRadome() {
    var rings = [], r, i, sh = new Shell(), row, ring, a;
    for (r = 0; r < RST.length; r++) {
      row = tab(RAD, RST[r]); ring = [];
      var hm = (row[1] + row[2]) / 2, hh = (row[1] - row[2]) / 2;
      for (i = 0; i < 32; i++) {
        a = i * 11.25;
        ring.push([X(RST[r]), row[0] * sgp(Math.sin(a * D2R), 0.9), Z(hm + hh * sgp(Math.cos(a * D2R), 0.9))]);
      }
      rings.push(ring);
    }
    sh.loft(rings, function () { return true; }, true, true);
    sh.emit({ 0: "dome", 1: "dome", 2: "dome" });
    /* a team band across the radome, laid 3 cm proud of its skin */
    var band = [], sh3 = new Shell(), bs = [5.2, 5.4, 5.6];
    for (r = 0; r < bs.length; r++) {
      row = tab(RAD, bs[r]); ring = [];
      var hm2 = (row[1] + row[2]) / 2, hh2 = (row[1] - row[2]) / 2;
      for (i = 0; i < 32; i++) {
        a = i * 11.25;
        ring.push([X(bs[r]), (row[0] + 0.03) * sgp(Math.sin(a * D2R), 0.9), Z(hm2 + (hh2 + 0.03) * sgp(Math.cos(a * D2R), 0.9))]);
      }
      band.push(ring);
    }
    sh3.loft(band, function () { return true; }, false, false);
    sh3.emit({ 0: "team", 1: "team", 2: "team" });
    /* the struts: two thin pylons from the roof, and a splayed pair out to the nacelles */
    foil(finSecs(0, [2.9, 3.2, 3.58], [3.4, 3.4, 3.4], [1.5, 1.5, 1.5], [0.12, 0.12, 0.12]),
         "f", { 0: "dome", 1: "dome", 2: "dome" });
    foil(finSecs(0, [2.8, 3.2, 3.58], [7.0, 7.0, 7.0], [1.6, 1.6, 1.6], [0.12, 0.12, 0.12]),
         "f", { 0: "dome", 1: "dome", 2: "dome" });
    var sd;
    for (sd = -1; sd <= 1; sd += 2) {
      put("dome", rod([X(5.2), sd * 2.75, Z(3.0)], [X(5.2), sd * 2.2, Z(3.58)], 0.06, 8));
      put("dome", rod([X(8.0), sd * 2.75, Z(3.0)], [X(8.0), sd * 2.3, Z(3.62)], 0.06, 8));
    }
  }

  /* ============================================================ propellers
     Three-blade Hamilton Standard props as see-through blur discs. */
  function addProp(sd) {
    var yc = sd * NY, hc = NH, x = X(PX), pos = [], nor = [], i, b, k;
    function pt(r, ang, tau) {
      return [x, yc + r * Math.cos(ang) - tau * Math.sin(ang), Z(hc) + r * Math.sin(ang) + tau * Math.cos(ang)];
    }
    function tri(a, b2, c) {
      pos.push(a[0], a[1], a[2], b2[0], b2[1], b2[2], c[0], c[1], c[2]);
      nor.push(1, 0, 0, 1, 0, 0, 1, 0, 0);
    }
    var g, DNseg = 40, a0, a1;
    for (i = 0; i < DNseg; i++) {
      a0 = i * 2 * Math.PI / DNseg; a1 = (i + 1) * 2 * Math.PI / DNseg;
      tri(pt(0.33, a0, 0), pt(PR, a0, 0), pt(PR, a1, 0));
      tri(pt(0.33, a0, 0), pt(PR, a1, 0), pt(0.33, a1, 0));
    }
    g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    put("propDisc", g);
    pos = []; nor = [];
    var R = [0.35, 0.80, 1.30, PR], W = [0.10, 0.17, 0.16, 0.10], T = [0, 0.02, 0.05, 0.09];
    var ph = 25 * D2R;
    for (b = 0; b < 3; b++) {
      var an = ph + b * 2 * Math.PI / 3;
      for (k = 0; k < 3; k++) {
        var p0 = pt(R[k], an, sd * T[k] - W[k]), p1 = pt(R[k], an, sd * T[k] + W[k]);
        var q0 = pt(R[k + 1], an, sd * T[k + 1] - W[k + 1]), q1 = pt(R[k + 1], an, sd * T[k + 1] + W[k + 1]);
        p0[0] = p1[0] = q0[0] = q1[0] = x - 0.01;
        tri(p0, p1, q1); tri(p0, q1, q0);
      }
    }
    g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    put("propBlade", g);
  }

  /* ============================================================== cockpit */
  function glassPane(sh, s0, s1, a0, a1, ns, na) {
    var pp = 0.035, i, j, ids = [], row, ref = [X((s0 + s1) / 2), 0, Z(1.7)];
    for (i = 0; i <= ns; i++) {
      row = [];
      for (j = 0; j <= na; j++) {
        row.push(sh.vert(fusPt(s0 + (s1 - s0) * i / ns, a0 + (a1 - a0) * j / na, pp)));
      }
      ids.push(row);
    }
    for (i = 0; i < ns; i++) {
      for (j = 0; j < na; j++) {
        var A = sh.P[ids[i][j]], B = sh.P[ids[i][j + 1]], C = sh.P[ids[i + 1][j + 1]],
            E = sh.P[ids[i + 1][j]];
        var od = [(A[0] + B[0] + C[0] + E[0]) / 4 - ref[0], (A[1] + B[1] + C[1] + E[1]) / 4 - ref[1],
                  (A[2] + B[2] + C[2] + E[2]) / 4 - ref[2]];
        sh.tri(ids[i][j], ids[i][j + 1], ids[i + 1][j + 1], 0, od);
        sh.tri(ids[i][j], ids[i + 1][j + 1], ids[i + 1][j], 0, od);
      }
    }
  }

  function addGlass() {
    var sh = new Shell(), i, sd, wc = [-56, -19, 19, 56];
    for (i = 0; i < 3; i++) glassPane(sh, 0.60, 1.45, wc[i], wc[i + 1], 3, 4);
    for (sd = -1; sd <= 1; sd += 2) {
      glassPane(sh, 1.50, 2.30, sd * 48, sd * 76, 3, 3);
      glassPane(sh, 2.45, 3.00, sd * 52, sd * 76, 3, 3);
    }
    sh.emit({ 0: "glass", 1: "glass", 2: "glass" });
  }

  /* ============================================================ the small
     parts: boxes, rods, wheels */
  var _m4 = null, _q = null, _v = null, _u = null;
  function boxG(sx, sy, sz, x, y, z) {
    var g = new V.BoxGeometry(sx, sy, sz);
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
  function wheelG(r, w, x, y, z, seg) {      /* the axle runs along Y */
    var g = new V.CylinderGeometry(r, r, w, seg || 20);
    g.translate(x, y, z);
    return g;
  }


  function addGear(G) {
    var sd;
    /* nose leg under the nose: one 18 in wheel */
    G.metal.push(rod([X(0.55), 0, Z(1.0)], [X(0.45), 0, Z(0.23)], 0.06, 8));
    G.dark.push(wheelG(0.23, 0.14, X(0.45), 0, Z(0.23), 16));
    G.metal.push(wheelG(0.09, 0.17, X(0.45), 0, Z(0.23), 8));
    /* mains: 34 in tyres at 5.64 m track, out of the nacelles behind the wing */
    for (sd = -1; sd <= 1; sd += 2) {
      G.metal.push(rod([X(4.70), sd * NY, Z(1.85)], [X(4.70), sd * NY, Z(0.43)], 0.08, 8));
      G.metal.push(rod([X(5.50), sd * NY, Z(1.85)], [X(4.76), sd * NY, Z(0.58)], 0.05, 6));
      G.dark.push(wheelG(0.43, 0.25, X(4.70), sd * NY, Z(0.43), 22));
      G.metal.push(wheelG(0.18, 0.28, X(4.70), sd * NY, Z(0.43), 10));
    }
    /* the small tail wheel under the tail cone */
    G.metal.push(rod([X(12.7), 0, Z(1.55)], [X(12.8), 0, Z(0.10)], 0.04, 6));
    G.dark.push(wheelG(0.10, 0.10, X(12.8), 0, Z(0.10), 10));
  }

  var PAINT = {
    gull: { top: 0x9ea7ab, bot: 0xe2e5e6, dome: 0xe6e8e8 }    /* light gull grey over white */
  };
  function makeMats(C) {
    var p = PAINT.gull, m = {};
    function skin(c) {
      return new V.MeshStandardMaterial({ color: c, roughness: 0.78, metalness: 0.08, side: V.DoubleSide });
    }
    m.top = skin(p.top); m.bot = skin(p.bot); m.dome = skin(p.dome);
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10,
                                          side: V.DoubleSide });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.dark = new V.MeshStandardMaterial({ color: 0x1a1c1e, roughness: 0.82, metalness: 0.12 });
    m.glass = new V.MeshStandardMaterial({ color: 0x2b3a46, roughness: 0.12, metalness: 0.50,
                                           transparent: true, opacity: 0.82, side: V.DoubleSide });
    m.propDisc = new V.MeshStandardMaterial({ color: 0x202427, roughness: 1.0, metalness: 0.0,
                                              transparent: true, opacity: 0.13, depthWrite: false,
                                              side: V.DoubleSide });
    m.propBlade = new V.MeshStandardMaterial({ color: 0x15171a, roughness: 1.0, metalness: 0.0,
                                               transparent: true, opacity: 0.50, depthWrite: false,
                                               side: V.DoubleSide });
    return m;
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
    return out;
  }
  function emit(parent, lists, mats, order) {
    for (var i = 0; i < order.length; i++) {
      var key = order[i];
      if (!lists[key] || !lists[key].length) continue;
      parent.add(new V.Mesh(merge(lists[key]), mats[key]));
    }
  }


  function build(THREE, M, C) {
    V = THREE;
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    K = {};
    addFuselage();
    addWing();
    addTail();
    addNacelles();
    addRadome();
    addGlass();
    addProp(-1);
    addProp(1);
    var G = { metal: [], dark: [] };
    addGear(G);
    var mats = makeMats(C);
    var root = new V.Group();
    emit(root, K, mats, ["top", "bot", "dome", "team", "dark", "metal", "glass", "propDisc", "propBlade"]);
    var gear = new V.Group();
    gear.name = "gear";
    emit(gear, G, mats, ["metal", "dark"]);
    root.add(gear);
    return root;
  }

  return { build: build };
})();

UNIT_MODELS["nato_e50_cawacs"] = {
  len: 13.26,
  build: function (THREE, M, C) { return HeroE1.build(THREE, M, C); }
};
