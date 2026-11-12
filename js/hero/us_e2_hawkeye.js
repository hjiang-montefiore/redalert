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
   The redo (see "details" below) adds a grey-scale paint sheet laid over
   the coats (panel lines, rivet rows, wing-root walkways, weathering), seam
   ribbons for the panel breaks and hinge lines, the engine and oil-cooler
   intakes under each spinner, the twin nose wheels, launch bar and gear
   doors, aerials, pitots and lamps.
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
    /* two nose wheels ("E-2 Hawkeye Pax River Museum-1.jpg"), the axle
       through the fork, and the catapult launch bar raised ahead of the leg */
    G.dark.push(wheelG(0.28, 0.15, X(2.62), 0.14, Z(0.28), 20));
    G.dark.push(wheelG(0.28, 0.15, X(2.62), -0.14, Z(0.28), 20));
    G.metal.push(wheelG(0.12, 0.17, X(2.62), 0.14, Z(0.28), 10));
    G.metal.push(wheelG(0.12, 0.17, X(2.62), -0.14, Z(0.28), 10));
    G.metal.push(wheelG(0.04, 0.44, X(2.62), 0, Z(0.28), 6));
    G.metal.push(rod([X(2.60), 0, Z(0.62)], [X(2.02), 0, Z(0.80)], 0.03, 6));
    G.metal.push(boxG(0.10, 0.10, 0.10, X(2.02), 0, Z(0.80)));
    /* mains: a leg and a brace from the nacelle's housing, one wheel a side */
    for (sd = -1; sd <= 1; sd += 2) {
      G.metal.push(rod([X(8.55), sd * NY, Z(1.30)], [X(8.55), sd * NY, Z(0.47)], 0.085, 8));
      G.metal.push(rod([X(9.30), sd * NY, Z(1.05)], [X(8.62), sd * NY, Z(0.56)], 0.05, 6));
      G.dark.push(wheelG(0.47, 0.30, X(8.55), sd * NY, Z(0.47), 24));
      G.metal.push(wheelG(0.22, 0.32, X(8.55), sd * NY, Z(0.47), 10));
    }
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
     (the redo) What the photographs show that the shells alone did not:
     "E-2 Hawkeye Pax River Museum-1.jpg" (head-on, close): the round nose
     cap with its seam and the two lamps in it, the dark windscreen frame,
     the engine intake as a deep oval UNDER the spinner and a smaller oil-
     cooler mouth under that (both red-plugged in the photograph), the long
     white nose-gear doors beside a TWIN-wheel nose leg with its catapult
     launch bar, the main-gear doors hanging beside each single main wheel;
     "A right side view of ... VAW-121 E-2C ..." (DPLA, in flight): the
     panel breaks of the body, the flap and aileron hinge lines, the
     rudders on all four fins. Laid on the skin as seam ribbons (one dark
     material), the lamps in one vertex-coloured material. The blade
     aerials on the spine and belly are placed from the side photograph at
     its small size: their exact stations are NOT CONFIRMED. */
  var DX_ = null;
  function foilTh(sec, u) {
    return sec.t * sec.c * (1.4845 * Math.sqrt(u) - 0.63 * u - 1.758 * u * u + 1.4215 * u * u * u - 0.518 * u * u * u * u);
  }
  /* a point on the upper (sg 1) or lower (sg -1) skin of a wing-frame foil */
  function wPt(sec, u, sg) { return [X(sec.s + u * sec.c), sec.a, Z(sec.o + sg * foilTh(sec, u))]; }
  function fPt(sec, u, sg) { return [X(sec.s + u * sec.c), sec.o + sg * foilTh(sec, u), Z(sec.a)]; }
  function wingLine(secOf, y0, y1, u0, u1, sg, n) {
    var pts = [], i;
    for (i = 0; i <= n; i++) {
      var y = y0 + (y1 - y0) * i / n;
      pts.push(wPt(secOf(y), u0 + (u1 - u0) * i / n, sg));
    }
    return DX_.ribbon(pts, [0, 0, sg], 0.04, 0.012);
  }
  function chordLine(secOf, y, u0, u1, sg) {
    var pts = [], i;
    for (i = 0; i <= 6; i++) pts.push(wPt(secOf(y), u0 + (u1 - u0) * i / 6, sg));
    return DX_.ribbon(pts, [0, 0, sg], 0.04, 0.012);
  }
  function fusHoop(s, a0, a1, w) {
    var r = tab(FUS, s), hm = (r[1] + r[2]) / 2;
    return DX_.hoop(function (a) { return fusPt(s, a, 0); }, a0, a1, 24,
                    function () { return [0, 0, Z(hm)]; }, w || 0.04, 0.012);
  }
  function fusRun(s0, s1, a, n) {
    var pts = [], nr = [], i;
    for (i = 0; i <= n; i++) {
      var s = s0 + (s1 - s0) * i / n, r = tab(FUS, s), p = fusPt(s, a, 0);
      pts.push(p); nr.push([0, p[1], p[2] - Z((r[1] + r[2]) / 2)]);
    }
    return DX_.ribbon(pts, nr, 0.04, 0.012);
  }
  function addDetails(G) {
    var sd, i, s;
    /* body panel breaks: frames over the top and sides, the side seams */
    var FR = [3.30, 4.45, 5.75, 7.00, 8.85, 11.30, 13.20, 15.10];
    for (i = 0; i < FR.length; i++) put("seam", fusHoop(FR[i], -118, 118));
    put("seam", fusHoop(0.78, 0, 360, 0.035));               /* the nose cap's joint */
    for (sd = -1; sd <= 1; sd += 2) {
      put("seam", fusRun(3.3, 16.6, sd * 96, 18));
      put("seam", fusRun(3.3, 15.2, sd * 38, 16));
    }
    /* the windscreen and side-window frames: dark ribbons on the glass edges */
    var wc = [-56, -19, 19, 56], frm = [];
    for (i = 0; i < wc.length; i++) frm.push([[1.46, wc[i]], [2.02, wc[i]]]);
    frm.push([[1.46, -56], [1.46, 56]], [[2.02, -76], [2.02, 76]]);
    for (sd = -1; sd <= 1; sd += 2) {
      frm.push([[2.08, sd * 50], [3.14, sd * 50]], [[2.08, sd * 76], [3.14, sd * 76]],
               [[2.56, sd * 50], [2.56, sd * 76]], [[2.66, sd * 50], [2.66, sd * 76]], [[3.14, sd * 50], [3.14, sd * 76]]);
    }
    for (i = 0; i < frm.length; i++) {
      var pts = [], nr = [], k;
      for (k = 0; k <= 8; k++) {
        var t = k / 8, ss = frm[i][0][0] + (frm[i][1][0] - frm[i][0][0]) * t,
            aa = frm[i][0][1] + (frm[i][1][1] - frm[i][0][1]) * t, rr = tab(FUS, ss);
        var p = fusPt(ss, aa, 0.045); pts.push(p); nr.push([0, p[1], p[2] - Z((rr[1] + rr[2]) / 2)]);
      }
      put("dark", DX_.ribbon(pts, nr, 0.06, 0));
    }
    /* the two lamps in the nose cap */
    put("lamp", DX_.lamp([X(0.10), 0.13, Z(1.40)], 0.07, 0xf4f1e0));
    put("lamp", DX_.lamp([X(0.10), -0.13, Z(1.40)], 0.07, 0xf4f1e0));
    /* pitot heads either side of the nose */
    for (sd = -1; sd <= 1; sd += 2) {
      var pp = fusPt(1.05, sd * 100, 0);
      put("metal", rod(pp, [pp[0] + 0.30, pp[1] + sd * 0.12, pp[2]], 0.015, 6));
    }
    /* wings: the flap and aileron hinge lines (74 per cent chord), the fold
       joint outboard of each nacelle, the front spar's rivet line */
    for (sd = -1; sd <= 1; sd += 2) {
      put("seam", wingLine(wingSec, sd * 1.05, sd * 8.2, 0.74, 0.74, 1, 10));
      put("seam", wingLine(wingSec, sd * 8.2, sd * 11.3, 0.72, 0.72, 1, 4));
      put("seam", chordLine(wingSec, sd * 8.2, 0.72, 1.0, 1));
      put("seam", chordLine(wingSec, sd * 4.55, 0.0, 1.0, 1));
      put("seam", chordLine(wingSec, sd * 4.55, 0.0, 1.0, -1));
      put("seam", wingLine(wingSec, sd * 1.05, sd * 11.3, 0.16, 0.16, 1, 10));
      put("seam", wingLine(wingSec, sd * 1.05, sd * 11.3, 0.74, 0.74, -1, 10));
      /* the tailplane's elevator line */
      put("seam", wingLine(tpSec, sd * 0.4, sd * 3.9, 0.68, 0.68, 1, 6));
      /* the nav lamps: red to port, green to starboard */
      var ws = wingSec(sd * 12.28);
      put("lamp", DX_.lamp([X(ws.s + 0.35), sd * 12.20, Z(ws.o)], 0.07, sd > 0 ? 0xe02218 : 0x18c04a));
    }
    /* rudder hinge lines up all four fins, both faces */
    var fins = [[4.0, 1.75, 4.5, 16.35, 15.75], [1.4, 2.0, 4.85, 16.35, 15.95]];
    for (i = 0; i < 2; i++) {
      for (sd = -1; sd <= 1; sd += 2) {
        for (var face = -1; face <= 1; face += 2) {
          var yc = sd * fins[i][0], ptsF = [], z0 = fins[i][1], z1 = fins[i][2];
          for (k = 0; k <= 5; k++) {
            var h = z0 + (z1 - z0) * k / 5;
            ptsF.push([X(16.95 - 0.05 * k / 5), yc + face * 0.07, Z(h)]);
          }
          put("seam", DX_.ribbon(ptsF, [0, face, 0], 0.03, 0.01));
        }
      }
    }
    /* the tail lamp */
    put("lamp", DX_.lamp([X(17.30), 0, Z(3.14)], 0.06, 0xf4f1e0));
    /* anti-collision beacons, spine and belly */
    put("lamp", DX_.lamp(fusPt(4.2, 0, 0.03), 0.09, 0xe02218));
    put("lamp", DX_.lamp(fusPt(6.4, 180, 0.03), 0.09, 0xe02218));
    /* blade aerials: spine and belly (NOT CONFIRMED stations) */
    var AE = [[3.7, 0, 0.42], [13.6, 0, 0.38], [4.9, 180, 0.30], [11.9, 180, 0.36], [12.9, 180, 0.30]];
    for (i = 0; i < AE.length; i++) {
      var ap = fusPt(AE[i][0], AE[i][1], 0), up = AE[i][1] ? [0, 0, -1] : [0, 0, 1];
      put("dark", DX_.blade(ap, up, [1, 0, 0], AE[i][2], 0.34, 0.14, 0.03, 0.14));
    }
    /* dome: the joint round the rim, the inner ring on top */
    put("seam", DX_.hoop(function (b) { return [X(DX) + 3.645 * Math.cos(b), 3.645 * Math.sin(b), Z(DC + 0.02)]; },
                         0, 2 * Math.PI, 72, function () { return [X(DX), 0, Z(DC)]; }, 0.05, 0.01));
    put("seam", DX_.hoop(function (b) { return [X(DX) + 1.30 * Math.cos(b), 1.30 * Math.sin(b), Z(domeTop(1.30))]; },
                         0, 2 * Math.PI, 40, function () { return [X(DX), 0, Z(DC - 6)]; }, 0.035, 0.012));
    /* nacelles: the engine intake under the spinner and the oil-cooler
       mouth under it (dark, inside a lip), the cowl's panel joints */
    for (sd = -1; sd <= 1; sd += 2) {
      var yc2 = sd * NY;
      intake(yc2, 5.50, NH - 0.53, 0.26, 0.13);
      intake(yc2, 5.85, NH - 0.86, 0.17, 0.09);
      for (i = 0; i < 3; i++) {
        s = [6.3, 7.4, 8.5][i];
        var row = tab(NAC, s);
        put("seam", DX_.hoop((function (rw, ss) {
          return function (a) {
            var sa = Math.sin(a), ca = Math.cos(a);
            return [X(ss), yc2 + rw[0] * sgp(sa, NEXP), Z(NH + (ca >= 0 ? rw[1] : rw[2]) * sgp(ca, NEXP))];
          };
        })(row, s), -2.2, 2.2, 20, function () { return [0, yc2, Z(NH)]; }, 0.03, 0.012));
      }
      /* the main-gear doors, hanging beside the wheel (gear group) */
      for (var q = -1; q <= 1; q += 2) {
        G.bot.push(boxG(1.10, 0.03, 0.62, X(8.65), yc2 + q * 0.33, Z(0.98)));
      }
      /* the nose-gear doors, long and white */
      G.bot.push(boxG(0.95, 0.03, 0.42, X(2.35), sd * 0.24, Z(0.62)));
    }
  }
  /* an intake: a dark oval mouth set in a lip, facing forward */
  function intake(yc, s, h, hw, hh) {
    var o = [], n = 20, i, lip = [], in2 = [];
    for (i = 0; i < n; i++) {
      var a = i * 2 * Math.PI / n;
      o.push([X(s), yc + hw * Math.cos(a), Z(h) + hh * Math.sin(a)]);
      lip.push([X(s) - 0.02, yc + (hw - 0.04) * Math.cos(a), Z(h) + (hh - 0.035) * Math.sin(a)]);
      in2.push([X(s + 0.30), yc + (hw - 0.05) * Math.cos(a), Z(h) + (hh - 0.04) * Math.sin(a)]);
    }
    var sh = new Shell();
    sh.loft([o, lip], function () { return true; }, false, false);
    sh.emit({ 0: "bot", 1: "bot", 2: "bot" });
    var sh2 = new Shell();
    sh2.loft([lip, in2], function () { return true; }, false, true);
    sh2.emit({ 0: "dark", 1: "dark", 2: "dark" });
    /* the cowl ahead of it fairs back over the mouth */
    var sh3 = new Shell(), back = [];
    for (i = 0; i < n; i++) back.push([X(s + 0.45), o[i][1] * 0.98 + yc * 0.02, Z(h) + (o[i][2] - Z(h)) * 0.6]);
    sh3.loft([o, back], function () { return true; }, false, false);
    sh3.emit({ 0: "bot", 1: "bot", 2: "bot" });
  }

  /* the paint sheet: one grey-scale sheet for every row (the coats stay the
     materials' colours): the body frames and side seams, the wing's spars,
     ribs and hinge lines above and below, the walkways on the wing roots
     either side of the body, the nacelle cowl joints, weathering. Made once. */
  var LAY = null, _sheet = null;
  function paintSheet() {
    if (_sheet !== null) return _sheet;
    try {
      var top = [], bot = [], riv = [], side = [], i, y, ws;
      function wl(u, y0, y1) {
        var out = [], k;
        for (k = 0; k <= 6; k++) { var yy = y0 + (y1 - y0) * k / 6, w = wingSec(yy); out.push([X(w.s + u * w.c), yy]); }
        return out;
      }
      top.push(wl(0.16, 1.05, 12.2), wl(0.74, 1.05, 12.2), wl(0.45, 1.05, 12.2));
      bot.push(wl(0.16, 1.05, 12.2), wl(0.74, 1.05, 12.2));
      riv.push(wl(0.30, 1.05, 12.2), wl(0.60, 1.05, 12.2));
      for (y = 1.6; y < 12.2; y += 1.05) {
        ws = wingSec(y);
        top.push([[X(ws.s), y], [X(ws.s + ws.c), y]]);
        bot.push([[X(ws.s), y], [X(ws.s + ws.c), y]]);
      }
      for (i = 0; i < 4; i++) {                      /* the tailplane */
        var tp = tpSec(i);
        top.push([[X(tp.s), i], [X(tp.s + tp.c), i]]);
      }
      top.push([[X(5.8), NY - 0.4], [X(10.2), NY - 0.4]], [[X(5.8), NY + 0.4], [X(10.2), NY + 0.4]]);
      side.push([[X(1.2), Z(2.35)], [X(16.8), Z(2.35)]], [[X(3.3), Z(1.4)], [X(16.0), Z(1.4)]],
                [[X(5.7), Z(NH + 0.5)], [X(10.2), Z(NH + 0.5)]], [[X(5.7), Z(NH - 0.5)], [X(9.6), Z(NH - 0.6)]]);
      var fr = [], FR = [0.78, 1.20, 3.30, 4.45, 5.75, 7.00, 8.85, 10.0, 11.30, 13.20, 15.10, 16.4];
      for (i = 0; i < FR.length; i++) fr.push([X(FR[i]), tab(FUS, FR[i])[0]]);
      _sheet = DX_.sheet(LAY, {
        frames: fr, top: top, bot: bot, rivets: riv, side: side, seam: 0.6, grime: 170,
        walk: [[[X(7.0), 1.1], [X(7.0), 2.4], [X(9.6), 2.4], [X(9.6), 1.1]]]
      }, 2211);
    } catch (e) { _sheet = false; }
    return _sheet;
  }

  /* ========================================================= build / mats == */
  var PAINT = {
    gull:  { top: 0x9ba4a9, bot: 0xe0e4e5, dome: 0xe4e7e7 },   /* gull grey over white  */
    grey:  { top: 0x8d979d, bot: 0xaab3b8, dome: 0xcdd3d6 },   /* low-visibility grey   */
    light: { top: 0xa3acb1, bot: 0xbcc4c8, dome: 0xd6dbdd },   /* E-2D, Aeronavale      */
    roc:   { top: 0x929ca2, bot: 0xb4bcc0, dome: 0xd9dddf }    /* ROCAF grey            */
  };

  function makeMats(C, paint, tex) {
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
    m.dark = new V.MeshStandardMaterial({ color: 0x1a1c1e, roughness: 0.82, metalness: 0.12, side: V.DoubleSide });
    /* panel seams and hinge lines: the top coat darkened; the lamps */
    var sc = new V.Color(p.top).multiplyScalar(0.45);
    m.seam = new V.MeshStandardMaterial({ color: sc, roughness: 0.85, metalness: 0.05, side: V.DoubleSide });
    m.lamp = new V.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.3, metalness: 0.0,
                                          emissive: 0x333333, emissiveIntensity: 0.6 });
    if (tex) { m.top.map = tex; m.bot.map = tex; m.dome.map = tex; }
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
      var geo = merge(lists[key]);
      if (mats[key].map && LAY) DX_.projUV(geo, LAY);
      parent.add(new V.Mesh(geo, mats[key]));
    }
  }

  /* spec: { blades, probe, paint } */
  function build(THREE, M, C, spec) {
    V = THREE;
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    K = {};
    DX_ = DK(V);
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
    var G = { metal: [], dark: [], bot: [] };
    addGear(G);
    addDetails(G);

    LAY = DX_.layout(-XN, XN, 12.3, ZG, Z(5.6));
    var mats = makeMats(C, spec.paint, paintSheet());
    var root = new V.Group();
    emit(root, K, mats, ["top", "bot", "dome", "team", "seam", "dark", "metal", "lamp", "glass", "propDisc", "propBlade"]);
    var gear = new V.Group();
    gear.name = "gear";
    emit(gear, G, mats, ["metal", "dark", "bot"]);
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
