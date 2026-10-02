/* ============ us_e2_hawkeye.js -- Grumman / Northrop Grumman E-2 Hawkeye (HERO MODEL) ============

   The carrier airborne-early-warning aircraft, drawn for the eleven rows that
   fly it: the E-2A (nato_e60_awacs) and E-2B (nato_e60_cawacs) of the 1960s,
   the E-2C with the APS-125 (nato_e80_cawacs), the Group II (nato_e90_cawacs),
   the Hawkeye 2000 (nato_e00_cawacs, and France's fra_e00_cawacs and cawacs_f),
   the E-2D Advanced Hawkeye (cawacs_n), and Taiwan's E-2T (roc_e90_awacs) and
   E-2K (roc_e00_awacs, awacs_r). One airframe, fitted per row (VARIANTS below).

   Published figures (Northrop Grumman and US Navy fact files): length 17.54 m
   (E-2C) and 17.6 m (E-2D), span 24.56 m, height 5.58 m, rotodome 7.32 m (24 ft)
   across and about 0.7 m deep, propellers about 4.1 m across. The model is
   17.6 x 24.56 x 5.58 m. The old parametric model measured 19.3 x 24.5 x 7.5.

   Drawing: "Grumman E-2C Hawkeye 0014.svg" (Wikimedia Commons, public domain),
     a three-view. Read for the side profile (nose, cockpit, wing root, the
     nacelle behind the propeller plane at 5.3 m, the dome 10.3 m aft of the
     nose, the pylon and its raked rear strut, the four fins) and for the front
     view (engines 3.4 m off the centreline, the outer wing panel rising about 3
     degrees, the two thin struts that hold the dome out to the nacelles). Its
     plan view is drawn about 7 per cent long against its span, so every fore-
     and-aft station here comes from the side view and the published length,
     and the wing is the plan's trapezoid read in the
     same corrected scale: 3.75 m chord at the centreline to 1.43 m at the tip,
     leading edge swept back 7 degrees, trailing edge swept forward 3.7, the
     quarter-chord 4.4 (63.6 m2 against the quoted 65.0). The tailplane, the
     fins and the nacelles were checked against the plan the same way.
   Photographs (Wikimedia Commons):
     "E-2 Hawkeye Pax River Museum-1.jpg"  an E-2B head-on: the short blunt
        nose, the three-pane windscreen, the round pylon column under the
        dome, four broad black paddle blades with red and white tips, the
        nose gear behind the cockpit
     "First Grumman E-2D Hawkeye with inflight refueling probe arrives at NAS
        Norfolk on 9 September 2019 (190909-N-PW480-0121).JPG"  the E-2D: the
        fixed refuelling probe on the starboard side of the nose, standing
        forward of and above the radome, the all-over light grey and the dome
        lighter than the body, the props as blur discs
     "Grumman E-2C Hawkeye 2000 '3' (166417) (27127780631).jpg"  the Aeronavale
        Hawkeye 2000 from the side: the NP2000 eight-blade scimitar propellers,
        the nacelle deepening aft into the main-gear housing, one main wheel
        under each nacelle, the nose wheel just behind the cockpit

   What makes it a Hawkeye and not "a twin-turboprop with a disc", at RTS zoom:
     1. The rotodome: a 7.3 m lens on a stout pylon, bigger than the fuselage is
        wide, so that from above the aircraft is a disc with a tail and wings.
     2. A straight, high, long wing that rises outboard of the nacelles, with
        the engines hung under it and the propellers well clear of the body.
     3. A short body and a four-fin tail on a tailplane with dihedral, the
        outer fins reaching above and below it.
   The wings are drawn spread (the aircraft flies and parks spread here).
   The propellers are see-through discs with the blades painted on them (the
   renderer does not turn them): four paddle blades on the E-2A to the Group II
   and the E-2T, eight scimitar blades (NP2000) from the Hawkeye 2000 and on
   the E-2D and E-2K. The dome and the rest are not animated either.

   VARIANTS. Rows differ only where a photograph of that period shows it:
     blades   4 or 8, as above.
     probe    the E-2D alone; the earlier Hawkeyes have none.
     cockpit  none: the Norfolk E-2D wears the same three-pane windscreen and
              side windows as the E-2B and the Aeronavale E-2C, so every row
              has one cockpit (the E-2D's glass cockpit is inside).
     paint    gull grey over white with a white dome for the E-2A, E-2B and
              the 1970s-80s E-2C; the low-visibility grey of the Group II,
              the Hawkeye 2000 and the E-2T; a lighter all-over grey with a
              lighter dome for the E-2D and the Aeronavale; the E-2T and E-2K
              take a slightly cooler grey (no photograph of a ROCAF aircraft
              was consulted, so that shade is a guess). The Pax River E-2B
              is a museum repaint in pale grey and white; the gull-grey-over-
              white of the 1960s-80s is the Navy's published scheme.
   Team colour: a stripe around the dome's rim (what an RTS camera sees), the
   upper wingtips and the outer fin tips, all exactly C.team.

   Model space: +X nose, +Y left (port), +Z up, metres. s below is metres aft of
   the nose tip, h metres above the ground; the gear stands on h = 0.
   Merged into one mesh per material; the gear is its own named group.
   ========================================================================= */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroE2 = (function () {
  "use strict";

  var V = null;                         /* THREE, set by build()                  */
  var D2R = Math.PI / 180;
  var XN = 8.80;                        /* the nose tip; the tail ends at -8.80   */
  var ZG = -2.10;                       /* the ground                             */
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
     Rows: station s, half-width, top h, bottom h. The belly is higher at the
     nose than at the wing: the Hawkeye stands nose-high on its long nose leg
     (the Aeronavale photograph). The roof is level from the wing root to the
     tail, where the tailplane sits on it; the keel rises to the tail. */
  var FUS = [
    [0.00, 0.06, 1.46, 1.32],
    [0.28, 0.36, 1.80, 1.12],
    [0.60, 0.60, 2.06, 1.02],
    [1.00, 0.77, 2.26, 0.94],
    [1.50, 0.90, 2.46, 0.88],
    [2.10, 0.99, 2.78, 0.82],
    [2.80, 1.03, 2.98, 0.78],
    [3.60, 1.05, 3.04, 0.75],
    [4.60, 1.05, 2.98, 0.73],
    [5.80, 1.05, 3.00, 0.74],
    [7.00, 1.04, 3.06, 0.74],
    [8.20, 1.03, 3.10, 0.75],
    [9.40, 1.00, 3.12, 0.77],
    [10.6, 0.95, 3.12, 0.80],
    [11.8, 0.85, 3.10, 0.88],
    [13.0, 0.76, 3.08, 1.00],
    [14.2, 0.64, 3.06, 1.18],
    [15.4, 0.52, 3.06, 1.42],
    [16.4, 0.42, 3.07, 1.68],
    [17.1, 0.30, 3.08, 1.78]
  ];
  var FST = [0, 0.10, 0.28, 0.60, 1.0, 1.5, 2.1, 2.8, 3.6, 4.6, 5.8, 7.0, 8.2, 9.4, 10.6, 11.8,
             13.0, 14.2, 15.4, 16.4, 17.1];
  var FEXP = 0.8, FN = 28;
  /* a = degrees from the roof, positive toward port; push moves it outward */
  function fusPt(s, a, push) {
    var r = tab(FUS, s), hw = r[0], ht = r[1], hb = r[2], hm = (ht + hb) / 2, hh = (ht - hb) / 2;
    var y = hw * sgp(Math.sin(a * D2R), FEXP), h = hm + hh * sgp(Math.cos(a * D2R), FEXP);
    if (push) {
      var dh = h - hm, L = Math.sqrt(y * y + dh * dh) || 1;
      y += push * y / L; h += push * dh / L;
    }
    return [X(s), y, Z(h)];
  }
  /* grey above a line a little below the middle of the section, white below */
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
  var FK = 10;
  function foil(secs, frame, map) {
    var rings = [], i, sh = new Shell();
    for (i = 0; i < secs.length; i++) rings.push(foilRing(secs[i], frame, FK));
    sh.loft(rings, function (i) { return i < FK; }, true, true);
    sh.emit(map);
  }

  /* ============================================================== wing ==
     High wing, tapering: 3.75 m chord on the centreline to 1.43 m at the tip
     (leading edge back 7 degrees, trailing edge forward 3.7, as the plan view
     reads once its fore-and-aft scale is brought to the side view's); 16 per
     cent thick at the root to 12; level out to the nacelle,
     then rising 3.3 degrees. The last 0.73 m of each tip is the team's. */
  function wingSec(y) {
    var a = Math.abs(y);
    return { a: y, s: 6.85 + 0.125 * a, c: 3.75 - 0.189 * a, t: 0.16 - 0.00326 * a,
             o: a < 5.6 ? 3.0 : 3.0 + (a - 5.6) * 0.057 };
  }
  function addWing() {
    var ys = [-11.55, -8.5, -5.8, -3.43, -1.2, 0, 1.2, 3.43, 5.8, 8.5, 11.55], i, secs = [];
    for (i = 0; i < ys.length; i++) secs.push(wingSec(ys[i]));
    foil(secs, "w", { 0: "top", 1: "bot", 2: "top" });
    foil([wingSec(11.55), wingSec(12.28)], "w", { 0: "team", 1: "bot", 2: "team" });
    foil([wingSec(-12.28), wingSec(-11.55)], "w", { 0: "team", 1: "bot", 2: "team" });
  }

  /* ============================================================== tail ==
     Tailplane 8 m across with 8 degrees of dihedral; an outer fin on each tip
     reaching above and below it and a shorter inner fin 1.4 m out, all with
     the trailing edge at the end of the aircraft. */
  var TAIL_END = 17.60;
  function tpSec(y) {
    var a = Math.abs(y), s = 15.65 + 0.075 * a;
    return { a: y, s: s, c: TAIL_END - s - 0.005 * a, t: 0.13 - 0.0075 * a, o: 3.15 + 0.14 * a };
  }
  function finSecs(yc, hs, sle, cs, t) {
    var out = [], i;
    for (i = 0; i < hs.length; i++) out.push({ a: hs[i], s: sle[i], c: cs[i], t: t[i], o: yc });
    return out;
  }
  function addTail() {
    var ys = [-4.0, -2.8, -1.4, 0, 1.4, 2.8, 4.0], i, secs = [], sd, yc;
    for (i = 0; i < ys.length; i++) secs.push(tpSec(ys[i]));
    foil(secs, "w", { 0: "top", 1: "bot", 2: "top" });
    for (sd = -1; sd <= 1; sd += 2) {
      yc = sd * 4.0;                      /* outer fins; the tips are the team's */
      foil(finSecs(yc, [1.75, 2.7, 3.71, 4.5], [16.35, 15.95, 15.45, 15.75],
                   [1.25, 1.65, 2.15, 1.85], [0.09, 0.10, 0.10, 0.09]), "f",
           { 0: "top", 1: "top", 2: "top" });
      foil(finSecs(yc, [4.5, 5.08], [15.75, 15.95], [1.85, 1.65], [0.09, 0.08]), "f",
           { 0: "team", 1: "team", 2: "team" });
      yc = sd * 1.4;                      /* inner fins */
      foil(finSecs(yc, [2.0, 3.0, 3.35, 4.85], [16.35, 15.75, 15.45, 15.95],
                   [1.25, 1.85, 2.15, 1.65], [0.09, 0.10, 0.10, 0.08]), "f",
           { 0: "top", 1: "top", 2: "top" });
    }
  }

  /* ========================================================== nacelles ==
     Two T56 turboprops 3.43 m out, the axis 2.5 m up. The cowl deepens aft
     into the main-gear housing, whose bottom hangs 0.6 m off the ground a
     little ahead of its end (the drawing and the Aeronavale photograph); the
     exhaust is dark. NAC rows: station, half-width, depth above the axis, depth below. */
  var NAC = [
    [5.45, 0.40, 0.45, 0.50],
    [5.75, 0.52, 0.58, 0.70],
    [6.30, 0.58, 0.74, 1.08],
    [7.00, 0.60, 0.80, 1.30],
    [8.00, 0.58, 0.78, 1.55],
    [9.00, 0.48, 0.62, 1.74],
    [9.70, 0.34, 0.46, 1.90],
    [10.2, 0.24, 0.34, 1.80],
    [10.45, 0.14, 0.24, 1.30]
  ];
  var NST = [5.45, 5.60, 5.80, 6.05, 6.40, 6.80, 7.30, 7.90, 8.50, 9.10, 9.70, 10.1, 10.45];
  var NY = 3.43, NH = 2.50, NN = 24, NEXP = 2 / 2.3;
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
      /* the spinner: a stubby ogive, dark */
      var SP = [[4.70, 0.03], [4.78, 0.15], [4.90, 0.24], [5.05, 0.31], [5.20, 0.36], [5.38, 0.39],
                [5.56, 0.40]], sr = [], sh2 = new Shell();
      for (r = 0; r < SP.length; r++) {
        var ring2 = [];
        for (i = 0; i < 18; i++) {
          var b = i * 2 * Math.PI / 18;
          ring2.push([X(SP[r][0]), sd * NY + SP[r][1] * Math.cos(b), Z(NH) + SP[r][1] * Math.sin(b)]);
        }
        sr.push(ring2);
      }
      sh2.loft(sr, function () { return true; }, true, true);
      sh2.emit({ 0: "dark", 1: "dark", 2: "dark" });
    }
  }

  /* ============================================================= rotodome
     A lens 7.32 m across, top at 5.58 m, 0.7 m thick, centred 10.3 m aft of
     the nose; a stout pylon, a raked rear strut, and the two thin struts out
     to the nacelles that the front view draws. */
  var DX = 10.30, DR = 3.66, DC = 5.22, DHT = 0.36, DHB = 0.34, DEXP = 2.4, DM = 14, DN = 48;
  function domeTop(r) { return DC + DHT * Math.pow(1 - Math.pow(r / DR, DEXP), 1 / DEXP); }
  function discRing(r, h) {
    var ring = [], i, b;
    for (i = 0; i < DN; i++) {
      b = i * 2 * Math.PI / DN;
      ring.push([X(DX) + r * Math.cos(b), r * Math.sin(b), Z(h)]);
    }
    return ring;
  }
  function addDome() {
    var rings = [], k, sh = new Shell(), f, cs, r, h;
    for (k = 0; k <= DM; k++) {
      f = Math.PI * k / DM; cs = Math.cos(f);
      r = Math.max(DR * Math.pow(Math.abs(Math.sin(f)), 2 / DEXP), 0.03);
      h = DC + (cs >= 0 ? DHT : DHB) * sgp(cs, 2 / DEXP);
      rings.push(discRing(r, h));
    }
    sh.loft(rings, function () { return true; }, true, true);
    sh.emit({ 0: "dome", 1: "dome", 2: "dome" });
    /* the stripe on the rim: 0.36 m wide, laid 3 cm over the surface so it
       cannot flicker against the skin at a distance */
    var st = [3.00, 3.18, 3.36], sr = [], sh2 = new Shell();
    for (k = 0; k < st.length; k++) sr.push(discRing(st[k], domeTop(st[k]) + 0.03));
    sh2.loft(sr, function () { return true; }, false, false);
    sh2.emit({ 0: "team", 1: "team", 2: "team" });
    /* the pylon column, a raked rear strut (each a foil in frame f) */
    foil(finSecs(0, [2.95, 3.6, 4.3, 4.95], [9.20, 9.30, 9.45, 9.55], [1.70, 1.55, 1.40, 1.30],
                 [0.30, 0.29, 0.27, 0.26]), "f", { 0: "dome", 1: "dome", 2: "dome" });
    foil(finSecs(0, [3.05, 3.9, 4.9], [12.45, 11.5, 10.55], [0.55, 0.55, 0.55], [0.20, 0.20, 0.20]),
         "f", { 0: "dome", 1: "dome", 2: "dome" });
    var sd;
    for (sd = -1; sd <= 1; sd += 2) {
      put("dome", rod([X(10.0), sd * 3.65, Z(4.88)], [X(10.0), sd * 4.05, Z(3.22)], 0.05, 8));
    }
  }

  /* ============================================================ propellers
     See-through discs with the blades painted on: four paddles (the earlier
     Hawkeyes) or eight scimitars (NP2000). Not animated. */
  function addProp(sd, blades) {
    var yc = sd * NY, hc = NH, x = X(5.25), pos = [], nor = [], i, b, k;
    function pt(r, ang, tau) {      /* radial r, tangential tau, at angle ang */
      return [x, yc + r * Math.cos(ang) - tau * Math.sin(ang), Z(hc) + r * Math.sin(ang) + tau * Math.cos(ang)];
    }
    function tri(a, b2, c) {
      pos.push(a[0], a[1], a[2], b2[0], b2[1], b2[2], c[0], c[1], c[2]);
      nor.push(1, 0, 0, 1, 0, 0, 1, 0, 0);
    }
    var g, DNseg = 48, a0, a1;
    for (i = 0; i < DNseg; i++) {
      a0 = i * 2 * Math.PI / DNseg; a1 = (i + 1) * 2 * Math.PI / DNseg;
      tri(pt(0.40, a0, 0), pt(2.05, a0, 0), pt(2.05, a1, 0));
      tri(pt(0.40, a0, 0), pt(2.05, a1, 0), pt(0.40, a1, 0));
    }
    g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    put("propDisc", g);
    pos = []; nor = [];
    var R = blades === 8 ? [0.42, 0.95, 1.50, 2.05] : [0.45, 0.95, 1.50, 2.05];
    var W = blades === 8 ? [0.10, 0.14, 0.12, 0.07] : [0.13, 0.20, 0.22, 0.17];
    var T = blades === 8 ? [0.00, 0.10, 0.28, 0.55] : [0.00, 0.02, 0.05, 0.08];
    var ph = (blades === 8 ? 10 : 20) * D2R;
    for (b = 0; b < blades; b++) {
      var an = ph + b * 2 * Math.PI / blades;
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

  /* ============================================================== cockpit
     Glass panels laid just proud of the fuselage skin, found by station and
     angle from the roof: a three-pane windscreen and two side windows a side,
     as the E-2B, the Aeronavale E-2C and the E-2D photographs all show. Each
     pane is a small grid whose points all sit on the skin's own curve (one flat
     quad sagged below the round body and let the skin through in a bow-tie). */
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
    for (i = 0; i < 3; i++) glassPane(sh, 1.46, 2.02, wc[i], wc[i + 1], 3, 4);
    for (sd = -1; sd <= 1; sd += 2) {
      glassPane(sh, 2.08, 2.56, sd * 50, sd * 76, 3, 3);
      glassPane(sh, 2.66, 3.14, sd * 50, sd * 76, 3, 3);
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
    /* nose leg behind the cockpit: one wheel, a drag brace, a fork */
    G.metal.push(rod([X(2.55), 0, Z(0.82)], [X(2.62), 0, Z(0.30)], 0.06, 8));
    G.metal.push(rod([X(2.05), 0, Z(0.76)], [X(2.58), 0, Z(0.50)], 0.035, 6));
    G.metal.push(rod([X(2.62), 0.12, Z(0.50)], [X(2.62), 0.12, Z(0.30)], 0.03, 6));
    G.metal.push(rod([X(2.62), -0.12, Z(0.50)], [X(2.62), -0.12, Z(0.30)], 0.03, 6));
    G.dark.push(wheelG(0.30, 0.22, X(2.62), 0, Z(0.30), 20));
    G.metal.push(wheelG(0.13, 0.25, X(2.62), 0, Z(0.30), 10));
    /* mains: a leg and a brace from the nacelle's housing, one wheel a side */
    for (sd = -1; sd <= 1; sd += 2) {
      G.metal.push(rod([X(8.55), sd * NY, Z(1.30)], [X(8.55), sd * NY, Z(0.47)], 0.085, 8));
      G.metal.push(rod([X(9.30), sd * NY, Z(1.05)], [X(8.62), sd * NY, Z(0.56)], 0.05, 6));
      G.dark.push(wheelG(0.47, 0.30, X(8.55), sd * NY, Z(0.47), 24));
      G.metal.push(wheelG(0.22, 0.32, X(8.55), sd * NY, Z(0.47), 10));
    }
  }

  /* ========================================================= build / mats == */
  var PAINT = {
    gull:  { top: 0x9ba4a9, bot: 0xe0e4e5, dome: 0xe4e7e7 },   /* gull grey over white  */
    grey:  { top: 0x8d979d, bot: 0xaab3b8, dome: 0xcdd3d6 },   /* low-visibility grey   */
    light: { top: 0xa3acb1, bot: 0xbcc4c8, dome: 0xd6dbdd },   /* E-2D, Aeronavale      */
    roc:   { top: 0x929ca2, bot: 0xb4bcc0, dome: 0xd9dddf }    /* ROCAF grey            */
  };

  function makeMats(C, paint) {
    var p = PAINT[paint] || PAINT.grey, m = {};
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

  /* spec: { blades, probe, paint } */
  function build(THREE, M, C, spec) {
    V = THREE;
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    K = {};
    addFuselage();
    addWing();
    addTail();
    addNacelles();
    addDome();
    addGlass();
    addProp(-1, spec.blades);
    addProp(1, spec.blades);
    /* the tailhook, stowed along the keel with its point at the end of the
       fuselage */
    put("metal", rod([X(14.6), 0, Z(1.10)], [X(17.1), 0, Z(1.66)], 0.04, 6));
    put("metal", rod([X(17.1), 0, Z(1.66)], [X(17.05), 0, Z(1.44)], 0.04, 6));
    /* the E-2D's refuelling probe: fixed, on the starboard side of the nose,
       raked up and a little outward (the Norfolk photograph) */
    if (spec.probe) {
      put("metal", rod([X(1.85), -0.50, Z(2.66)], [X(0.35), -0.62, Z(2.84)], 0.03, 8));
      put("metal", boxG(0.40, 0.12, 0.12, X(1.75), -0.50, Z(2.64)));
    }
    var G = { metal: [], dark: [] };
    addGear(G);

    var mats = makeMats(C, spec.paint);
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

/* Which fit each row wears (see VARIANTS above). */
(function () {
  var E2A = { blades: 4, probe: false, paint: "gull" };
  var E2C_GII = { blades: 4, probe: false, paint: "grey" };
  var H2000 = { blades: 8, probe: false, paint: "grey" };
  var FRA = { blades: 8, probe: false, paint: "light" };
  var E2D = { blades: 8, probe: true, paint: "light" };
  var E2T = { blades: 4, probe: false, paint: "roc" };
  var E2K = { blades: 8, probe: false, paint: "roc" };
  var ROWS = {
    nato_e60_awacs: E2A, nato_e60_cawacs: E2A, nato_e80_cawacs: E2A,
    nato_e90_cawacs: E2C_GII, nato_e00_cawacs: H2000,
    fra_e00_cawacs: FRA, cawacs_f: FRA,
    cawacs_n: E2D,
    roc_e90_awacs: E2T, roc_e00_awacs: E2K, awacs_r: E2K
  };
  function reg(key) {
    UNIT_MODELS[key] = {
      len: 17.6,
      build: function (THREE, M, C) { return HeroE2.build(THREE, M, C, ROWS[key]); }
    };
  }
  for (var k in ROWS) reg(k);
})();
