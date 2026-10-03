/* ============ ru_a50.js -- BERIEV A-50 / A-50U MAINSTAY (HERO MODEL) ============

   The Soviet and Russian AEW&C aeroplane on the Il-76MD airframe, for the three
   rows that fly it:
     pact_e80_awacs  "A-50 Mainstay" (in service 1985-): Soviet star
     pact_e90_awacs  "A-50 Mainstay": the same aeroplane in the 1990s fleet, Russian star
     pact_e00_awacs  "A-50U Mainstay", "Beriev A-50U": the modernised A-50U
   and the present-day row awacs_p ("Beriev A-50U Mainstay", era e20), which is the
   same A-50U (this file replaces its old parametric entry from units3d_air2.js; it
   loads after that file). No other row borrows these keys.

   WHAT EACH FEATURE RESTS ON
     Published figures (Wikipedia "Beriev A-50", Beriev company data): length
     46.59 m, span 50.5 m, height 14.76 m, wing area 300 m2, four Soloviev
     D-30KP turbofans, the rotodome 10.8 m across. air_specs.js gives the A-50U
     49.6 m of length, which no source supports (the U is the same airframe);
     this model draws 46.6 m for all three rows.
     Three-view drawing: Wikimedia Commons "Beriev A-50 3-view line drawing.png"
       (plan, front and side): wing planform (leading edge swept about 24 degrees,
       trailing edge nearly straight, 3 degrees of anhedral), the four engines
       slung well ahead of the wing (inner pair about 6 m, outer pair about 10 m
       off the centreline, measured off the plan), the long main-gear sponsons
       either side of the lower fuselage aft of the nose gear, the swept T-tail
       with a bulb on the fin top, the rotodome over the rear fuselage behind the
       wing on a pair of struts, the blunt rounded nose.
     Photograph, Wikimedia Commons "Beriev A-50, Russia - Air Force
       AN1979130.jpg" (A-50 from ahead): the six-pane glazed windscreen above a
       blunt solid white nose radome, a refuelling probe on the nose, a small
       white fairing each side of the lower nose, two parallel struts under the
       dome (about 0.6 m either side of centre) with a lens-shaped silvery dome
       whose underside is nearly flat and which is thin at the rim, the wings in
       bare-metal grey, a red wingtip.
     Photograph, "Beriev A-50U Mainstay RF-92957 47 red (8708674596).jpg" (A-50U
       in flight): white upper fuselage over a blue-grey belly with the paint
       line below the middle, grey wings with red tips, silver-grey dome centred
       over the wing trailing edge, the Russian red star on the fin, no tail
       turret, the engines hung ahead of the wing, the tailplane on the fin top
       with a bulb fairing at the junction.
     Photograph, "Beriev A-50 color.jpg" (US DoD air-to-air photograph dated
       26 Aug 1988, "Soviet Mainstay"): the Soviet-era finish - overall white,
       a small red star on the fin about mid-height and forward, no other
       marking visible; the dome white-grey, a single big pylon fairing. The
       e80 row is painted from this (and the head-on photograph's wing and
       dome are bare silver, which only the later photographs show).
     "Mainstay-DIA.jpg" is a DIA illustration and is NOT used for paint.
   NOT CONFIRMED and so not drawn: any difference of the A-50U from the A-50
     that photographs show (the U is drawn as the A-50 airframe in the U's
     paint); the flap-track fairings, the wing fences, the dorsal and ventral
     antenna blisters, the tail-cone fairing detail, the wing stars and the
     exact fin star size. No dated 1990s photograph of an A-50 was found on
     Commons, so the e90 row carries the 1988 white finish with the Russian star
     (from the A-50U photograph: a red star on the fin with a thin dark outline,
     same fin position); that the finish stayed white in the 1990s is an
     inference, not a photograph.
   Variants: the two paint sets (e80 and e90 overall white with the Soviet and
     the Russian star; e00 and awacs_p white over blue-grey) and nothing else.
   Team colour (C.team): two small strips, one on the upper skin of each wing
   near the tip (2.4 x 1.0 m); nothing else (no tips, no dome, no fuselage).
   Markings: the star on each side of the fin only; no bort numbers.
   Model space: +X nose, +Y port, +Z up, metres. s below is metres aft of the
   nose tip, h metres above the ground. Merged into one mesh per material; the
   gear is its own named group and the lowest opaque part.
   ========================================================================= */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroA50 = (function () {
  "use strict";

  var V = null;
  var D2R = Math.PI / 180, PI = Math.PI;
  var L3 = 46.6;
  var ZG = -4.0;
  var XN = L3 / 2, FX = 1;
  function X(s) { return XN - s * FX; }
  function Z(h) { return h + ZG; }

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
     differently), 2 is a cap, 3 is the spare (the E-8C's roof band). */
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
        var cat = upper(i, r);
        cat = cat === true ? 0 : (cat === false ? 1 : cat);
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
    for (c = 0; c < 4; c++) {
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
  function finSecs(yc, hs, sle, cs, t) {
    var out = [], i;
    for (i = 0; i < hs.length; i++) out.push({ a: hs[i], s: sle[i], c: cs[i], t: t[i], o: yc });
    return out;
  }

  /* ======================================================== the fuselage ==
     Rows: station s, half-width, top h, bottom h. The Il-76 body is 4.8 m
     across, level from the cockpit roof to the rear, the tail cone sweeping up. */
  var FUS = [
    [0.00, 0.12, 4.00, 3.55],
    [0.50, 0.95, 4.80, 3.00],
    [1.40, 1.70, 5.60, 2.45],
    [3.00, 2.15, 6.25, 2.05],
    [5.00, 2.36, 6.62, 1.92],
    [7.50, 2.40, 6.70, 1.90],
    [30.0, 2.40, 6.70, 1.90],
    [33.0, 2.34, 6.66, 2.05],
    [36.0, 2.10, 6.55, 2.50],
    [39.0, 1.80, 6.40, 3.10],
    [42.0, 1.35, 6.20, 3.75],
    [44.5, 0.80, 5.95, 4.35],
    [46.6, 0.22, 5.60, 4.95]
  ];
  var FST = [0, 0.15, 0.4, 0.8, 1.4, 2.2, 3.0, 4.0, 5.0, 6.5, 7.5, 12, 18, 24, 30, 31.5, 33, 34.5, 36,
             37.5, 39, 40.5, 42, 43.3, 44.5, 45.6, 46.6];
  var FN = 24, FEXP = 0.9;
  function fusPt(s, a, push) {
    var r = tab(FUS, s), hw = r[0], ht = r[1], hb = r[2], hm = (ht + hb) / 2, hh = (ht - hb) / 2;
    var y = hw * sgp(Math.sin(a * D2R), FEXP), h = hm + hh * sgp(Math.cos(a * D2R), FEXP);
    if (push) {
      var dh = h - hm, L = Math.sqrt(y * y + dh * dh) || 1;
      y += push * y / L; h += push * dh / L;
    }
    return [X(s), y, Z(h)];
  }
  /* the paint line a little below the middle of the section (the A-50U photograph) */
  function upperSeg(n) {
    return function (i) { var m = (i + 0.5) * 360 / n; return m < 112 || m > 248; };
  }
  function addFuselage() {
    var rings = [], r, i, sh = new Shell(), up = upperSeg(FN);
    for (r = 0; r < FST.length; r++) {
      var ring = [];
      for (i = 0; i < FN; i++) ring.push(fusPt(FST[r], i * 360 / FN, 0));
      rings.push(ring);
    }
    sh.loft(rings, function (i) { return up(i); }, true, true);
    sh.emit({ 0: "top", 1: "bot", 2: "top" });
  }

  /* ============================================================== wing ==
     High, swept, anhedral. Leading edge 24 degrees back from 15.0 m aft of
     the nose at the centreline; the trailing edge straight to 6 m out, then
     back at 0.21; about 309 m2 against the published 300. The outer 2.6 m of
     each tip is the team's (the photographs show red tips). */
  function wingLE(a) { return 15.0 + 0.45 * a; }
  function wingTE(a) { return 25.3 + Math.max(0, a - 6.0) * 0.21; }
  function wingSec(y) {
    var a = Math.abs(y), le = wingLE(a);
    return { a: y, s: le, c: wingTE(a) - le, t: 0.14 - 0.0016 * a, o: 5.1 - 0.0524 * a };
  }
  var WTIP = 25.25;
  function addWing() {
    var ys = [-25.25, -22.65, -19.0, -15.0, -11.0, -8.0, -5.0, -2.4, 0, 2.4, 5.0, 8.0, 11.0, 15.0,
              19.0, 22.65, 25.25], i, secs = [];
    for (i = 0; i < ys.length; i++) secs.push(wingSec(ys[i]));
    foil(secs, "w", { 0: "wing", 1: "wing", 2: "wing" });
    /* the team's colour: one small up-facing strip on each wing's upper skin, 2.4 m
       along the chord and 1.0 m across, near the tip; nothing else carries it */
    var sd, ia, ib, y, s, sec, pos = [], rows = [];
    for (sd = -1; sd <= 1; sd += 2) {
      pos = [];
      for (ia = 0; ia <= 2; ia++) {
        rows = [];
        for (ib = 0; ib <= 4; ib++) {
          y = sd * (21.2 + 0.5 * ia); sec = wingSec(y);
          s = sec.s + sec.c * (0.30 + 0.5 * ib / 4);
          rows.push([X(s), y, Z(sec.o + foilHalf(sec, s) + 0.035)]);
        }
        pos.push(rows);
      }
      var arr = [];
      for (ia = 0; ia < 2; ia++) for (ib = 0; ib < 4; ib++) {
        var A = pos[ia][ib], B = pos[ia][ib + 1], C2 = pos[ia + 1][ib + 1], D = pos[ia + 1][ib];
        arr.push(A, B, C2, A, C2, D);
      }
      var tg = new V.BufferGeometry(), fl = [], nr = [];
      arr.forEach(function (q) { fl.push(q[0], q[1], q[2]); nr.push(0, 0, 1); });
      tg.setAttribute("position", new V.Float32BufferAttribute(fl, 3));
      tg.setAttribute("normal", new V.Float32BufferAttribute(nr, 3));
      put("team", tg);
    }
  }

  /* ============================================================== tail ==
     T-tail: the fin from the roof to 13.6 m, leading edge swept 41 degrees,
     with a bulb fairing on its top (14.76 m overall); the tailplane 16.5 m
     across on the bulb, its tips the team's. */
  function finLE(h) { return 34.2 + (h - 6.0) * 0.88; }
  function finTE(h) { return 45.9 + (h - 6.0) * 0.05; }
  function finSec(h) {
    var le = finLE(h);
    return { a: h, s: le, c: finTE(h) - le, t: 0.115 - 0.025 * (h - 6.0) / 7.6, o: 0 };
  }
  function addFin() {
    var hs = [5.8, 7.5, 9.0, 10.5, 12.0, 13.6], i, secs = [];
    for (i = 0; i < hs.length; i++) secs.push(finSec(hs[i]));
    foil(secs, "f", { 0: "top", 1: "top", 2: "top" });
    var bulb = new V.SphereGeometry(1, 14, 9);
    bulb.scale(2.7, 0.46, 0.62);
    bulb.translate(X(43.5), 0, Z(14.12));
    put("top", bulb);
  }
  function tpSec(y) {
    var a = Math.abs(y);
    return { a: y, s: 40.4 + 0.5 * a, c: 46.2 - (40.4 + 0.5 * a), t: 0.10, o: 13.75 };
  }
  var TPT = 8.25, TPTEAM = 6.6;
  function addTailplane() {
    var ys = [-6.6, -4.2, -2.0, -0.6, 0, 0.6, 2.0, 4.2, 6.6], i, secs = [];
    for (i = 0; i < ys.length; i++) secs.push(tpSec(ys[i]));
    foil(secs, "w", { 0: "top", 1: "top", 2: "top" });
    foil([tpSec(TPTEAM), tpSec(TPT)], "w", { 0: "top", 1: "top", 2: "top" });
    foil([tpSec(-TPT), tpSec(-TPTEAM)], "w", { 0: "top", 1: "top", 2: "top" });
  }
  /* half thickness of a foil section at station s (matches foilRing) */
  function foilHalf(sec, s) {
    var u = Math.min(1, Math.max(0, (s - sec.s) / sec.c));
    return sec.t * sec.c * (1.4845 * Math.sqrt(u) - 0.63 * u - 1.758 * u * u + 1.4215 * u * u * u - 0.518 * u * u * u * u);
  }

  /* ============================================================== pods ==
     D-30KP: bodies of revolution (rows: distance back from the lip, radius),
     the lip about 3.3 m ahead of the wing's leading edge, on a raked pylon. */
  var POD = [[0.00, 0.80], [0.05, 0.90], [0.30, 0.95], [1.20, 0.96], [2.80, 0.94], [3.80, 0.86],
             [4.50, 0.72], [5.00, 0.56], [5.30, 0.40]];
  function addPod(xLip, yc, hc, rows, seg) {
    var rings = [], r, i, sh = new Shell(), a;
    for (r = 0; r < rows.length; r++) {
      var row = [];
      for (i = 0; i < seg; i++) {
        a = i * 360 / seg;
        row.push([xLip - rows[r][0], yc + rows[r][1] * Math.sin(a * D2R), Z(hc) + rows[r][1] * Math.cos(a * D2R)]);
      }
      rings.push(row);
    }
    sh.loft(rings, upperSeg(seg), true, true);
    sh.emit({ 0: "wing", 1: "wing", 2: "dark" });
  }
  function addPods() {
    var ys = [6.0, 10.2], i, sd, y, sLip, sec;
    for (i = 0; i < ys.length; i++) {
      y = ys[i]; sLip = wingLE(y) - 3.3; sec = wingSec(y);
      for (sd = -1; sd <= 1; sd += 2) {
        addPod(X(sLip), sd * y, 3.05, POD, 16);
        foil(finSecs(sd * y, [3.55, sec.o - 0.1], [sLip + 0.3, sLip + 1.4], [4.4, 5.8], [0.07, 0.07]),
             "f", { 0: "wing", 1: "wing", 2: "wing" });
      }
    }
  }

  /* ========================================================== rotodome ==
     A lens 10.8 m across and 1.8 m deep, centred 27.8 m aft of the nose
     (over the wing trailing edge, the A-50U photograph), its rim at 9.3 m, on
     two struts 0.6 m either side of the centreline (the head-on photograph). */
  var DX = 27.8, DR = 5.4, DC = 9.3, DHT = 0.95, DHB = 0.85, DEXP = 2.8, DN = 32;
  function discRing(r, h) {
    var ring = [], i, b;
    for (i = 0; i < DN; i++) {
      b = i * 2 * Math.PI / DN;
      ring.push([X(DX) + r * Math.cos(b), r * Math.sin(b), Z(h)]);
    }
    return ring;
  }
  function lensRing(f) {
    var cs = Math.cos(f), sn = Math.abs(Math.sin(f));
    return discRing(Math.max(DR * Math.pow(sn, 2 / DEXP), 0.03),
                    DC + (cs >= 0 ? DHT : DHB) * sgp(cs, 2 / DEXP));
  }
  function addDome() {
    var rings = [], k, n = 18, sh = new Shell();
    for (k = 0; k <= n; k++) rings.push(lensRing(PI * k / n));
    sh.loft(rings, function () { return true; }, true, true);
    sh.emit({ 0: "dome", 1: "dome", 2: "dome" });
    var sd;
    for (sd = -1; sd <= 1; sd += 2) {
      foil(finSecs(sd * 0.62, [6.3, 7.4, 8.6], [26.9, 27.0, 27.0], [1.9, 1.5, 1.4], [0.22, 0.24, 0.25]),
           "f", { 0: "wing", 1: "wing", 2: "wing" });
    }
    /* the fairing joining the struts on the roof */
    foil(finSecs(0, [6.4, 6.9, 7.5], [25.8, 26.4, 26.7], [4.4, 3.0, 2.2], [0.10, 0.14, 0.18]),
         "f", { 0: "top", 1: "top", 2: "top" });
  }

  /* ============================================================== sponsons
     The long main-gear fairings low on each side of the fuselage, 15 m long
     (the three-view's plan), rows: fraction of length, half-width, half-height. */
  var SPON = [[0.00, 0.05, 0.05], [0.04, 0.45, 0.50], [0.12, 0.75, 0.90], [0.25, 0.88, 1.05],
              [0.50, 0.90, 1.05], [0.80, 0.88, 1.02], [0.92, 0.70, 0.80], [0.97, 0.45, 0.45],
              [1.00, 0.10, 0.12]];
  function addSponsons() {
    var sd, k, i, u, s, row, rings, sh, ring, a, s0 = 16.8, s1 = 31.6;
    for (sd = -1; sd <= 1; sd += 2) {
      rings = []; sh = new Shell();
      for (k = 0; k <= 14; k++) {
        u = k / 14; s = s0 + (s1 - s0) * u; row = tab(SPON, u); ring = [];
        for (i = 0; i < 14; i++) {
          a = i * 360 / 14;
          ring.push([X(s), sd * 2.2 + row[0] * sgp(Math.sin(a * D2R), 0.9), Z(2.7 + row[1] * sgp(Math.cos(a * D2R), 0.9))]);
        }
        rings.push(ring);
      }
      sh.loft(rings, upperSeg(14), true, true);
      sh.emit({ 0: "top", 1: "bot", 2: "bot" });
    }
  }

  /* ======================================== glass, nose pods, probe, star */
  function glassPane(sh, s0, s1, a0, a1, ns, na) {
    var pp = 0.05, i, j, ids = [], row, ref = [X((s0 + s1) / 2), 0, Z(3.4)];
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
    var g = new V.CylinderGeometry(r, r, w, seg || 18);
    g.translate(x, y, z);
    return g;
  }

  /* the cockpit: a six-pane windscreen across the front (the head-on photograph)
     and two side windows a side */
  function addGlass() {
    var sh = new Shell(), i, sd, wc = [-62, -41, -20, 0, 20, 41, 62];
    for (i = 0; i < 6; i++) glassPane(sh, 3.0, 3.7, wc[i], wc[i + 1], 1, 2);
    for (sd = -1; sd <= 1; sd += 2) {
      glassPane(sh, 3.9, 4.5, sd * 66, sd * 86, 2, 2);
      glassPane(sh, 4.7, 5.3, sd * 66, sd * 86, 2, 2);
    }
    sh.emit({ 0: "glass", 1: "glass", 2: "glass" });
  }

  /* a flat national star on a fin side, three layers in one vertex-coloured mesh */
  function starLayers(list, cx, cz, y, sgn, r, kind) {
    var layers = kind === "soviet"
      ? [[1.24, [0.66, 0.15, 0.12]], [1.12, [0.88, 0.88, 0.85]], [1.0, [0.70, 0.16, 0.13]]]
      : [[1.26, [0.10, 0.18, 0.46]], [1.14, [0.88, 0.88, 0.85]], [1.0, [0.70, 0.16, 0.13]]];
    layers.forEach(function (L, li) {
      var pts = [], i, a, q, yy = y + sgn * 0.012 * (li + 1);
      for (i = 0; i < 10; i++) {
        a = PI / 2 + i * PI / 5; q = (i & 1) ? 0.40 : 1;
        pts.push([cx + Math.cos(a) * q * r * L[0], cz + Math.sin(a) * q * r * L[0]]);
      }
      var pos = [], col = [], nor = [];
      for (i = 0; i < 10; i++) {
        var p1 = pts[i], p2 = pts[(i + 1) % 10];
        var tri = [[cx, yy, cz], [p1[0], yy, p1[1]], [p2[0], yy, p2[1]]];
        var ux = tri[1][0] - tri[0][0], uz = tri[1][2] - tri[0][2];
        var vx = tri[2][0] - tri[0][0], vz = tri[2][2] - tri[0][2];
        var ny = uz * vx - ux * vz;
        if (ny * sgn < 0) { var t = tri[1]; tri[1] = tri[2]; tri[2] = t; }
        for (var k = 0; k < 3; k++) {
          pos.push(tri[k][0], tri[k][1], tri[k][2]); nor.push(0, sgn, 0); col.push(L[1][0], L[1][1], L[1][2]);
        }
      }
      var g = new V.BufferGeometry();
      g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
      g.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
      g.setAttribute("color", new V.Float32BufferAttribute(col, 3));
      put("mark", g);
    });
  }
  function addStars(kind) {
    var h = 9.4, s = 41.3, r = 0.95, sec = finSec(h), half, sd;
    half = Math.max(foilHalf(sec, s - r), foilHalf(sec, s), foilHalf(sec, s + r)) + 0.02;
    for (sd = -1; sd <= 1; sd += 2) starLayers(null, X(s), Z(h), sd * half, sd, r, kind);
  }

  function addSmall() {
    var sd, g, sh = new Shell();
    /* the dark anti-glare panel on the nose roof below the windscreen (head-on photograph) */
    glassPane(sh, 1.7, 3.0, -52, 52, 2, 4);
    sh.emit({ 0: "dark", 1: "dark", 2: "dark" });
    /* the white fairing each side of the lower nose (the head-on photograph) */
    for (sd = -1; sd <= 1; sd += 2) {
      g = new V.SphereGeometry(1, 10, 7); g.scale(0.95, 0.34, 0.30);
      g.translate(X(4.6), sd * 2.28, Z(3.45)); put("top", g);
    }
    /* the refuelling probe, forward and up from the nose over the windscreen */
    put("dark", rod([X(3.0), 0.55, Z(6.05)], [X(0.15), 0.55, Z(5.5)], 0.09, 6));
    g = new V.SphereGeometry(0.13, 6, 5); g.translate(X(0.1), 0.55, Z(5.48)); put("dark", g);
  }

  /* nose gear 6.5 m from the nose, four wheels; two main legs a side under the
     sponsons, four wheels on each (Il-76 gear). Every wheel bottom is h = 0. */
  function addGear(G) {
    var sd, i, j, sx, yy;
    G.metal.push(rod([X(6.5), 0, Z(2.0)], [X(6.5), 0, Z(0.62)], 0.10, 8));
    G.metal.push(rod([X(5.5), 0, Z(2.0)], [X(6.5), 0, Z(1.1)], 0.05, 6));
    for (i = -1; i <= 1; i += 2) for (j = -1; j <= 1; j += 2)
      G.dark.push(wheelG(0.55, 0.36, X(6.5 + i * 0.32), j * 0.34, Z(0.55), 14));
    for (sd = -1; sd <= 1; sd += 2) {
      [21.8, 25.2].forEach(function (sc) {
        G.metal.push(rod([X(sc), sd * 2.2, Z(2.0)], [X(sc), sd * 2.2, Z(0.66)], 0.12, 8));
        G.metal.push(boxG(1.4, 0.74, 0.18, X(sc), sd * 2.2, Z(0.7)));
        for (i = -1; i <= 1; i += 2) for (j = -1; j <= 1; j += 2) {
          sx = sc + i * 0.62; yy = sd * 2.2 + j * 0.37;
          G.dark.push(wheelG(0.65, 0.40, X(sx), yy, Z(0.65), 14));
        }
      });
    }
  }

  /* ========================================================= build / mats == */
  var PAINT = {
    /* white over light grey (the illustration and the head-on photograph) */
    old: { top: 0xe9ebe8, bot: 0xcdd0d1, wing: 0xdcdedd, dome: 0xd8dbdc },
    /* white over blue-grey (the A-50U photograph) */
    u:   { top: 0xdadedc, bot: 0x7d8791, wing: 0xa4a9ac, dome: 0xaeb3b5 }
  };
  function makeMats(C, paint) {
    var p = PAINT[paint] || PAINT.old, m = {};
    function skin(c) {
      return new V.MeshStandardMaterial({ color: c, roughness: 0.78, metalness: 0.08, side: V.DoubleSide });
    }
    m.top = skin(p.top); m.bot = skin(p.bot); m.wing = skin(p.wing); m.dome = skin(p.dome);
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10,
                                          side: V.DoubleSide });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.dark = new V.MeshStandardMaterial({ color: 0x24282b, roughness: 0.82, metalness: 0.12 });
    m.glass = new V.MeshStandardMaterial({ color: 0x2b3a46, roughness: 0.12, metalness: 0.50,
                                           transparent: true, opacity: 0.82, side: V.DoubleSide });
    m.mark = new V.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.7, metalness: 0.02,
                                          side: V.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2,
                                          polygonOffsetUnits: -2 });
    return m;
  }

  function merge(list) {
    var pos = [], nor = [], col = [], hasCol = false, i, j;
    for (i = 0; i < list.length; i++) if (list[i].attributes.color) hasCol = true;
    for (i = 0; i < list.length; i++) {
      var g = list[i].index ? list[i].toNonIndexed() : list[i];
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      var c = g.attributes.color ? g.attributes.color.array : null;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); if (hasCol) col.push(c ? c[j] : 1); }
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    if (hasCol) out.setAttribute("color", new V.Float32BufferAttribute(col, 3));
    return out;
  }
  function emit(parent, lists, mats, order) {
    for (var i = 0; i < order.length; i++) {
      var key = order[i];
      if (!lists[key] || !lists[key].length) continue;
      parent.add(new V.Mesh(merge(lists[key]), mats[key]));
    }
  }

  /* spec: { star, paint } */
  function build(THREE, M, C, spec) {
    V = THREE;
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    K = {};
    XN = L3 / 2; FX = 1;
    addFuselage();
    addWing();
    addTailplane();
    addFin();
    addPods();
    addDome();
    addSponsons();
    addGlass();
    addSmall();
    addStars(spec.star);
    var G = { metal: [], dark: [] };
    addGear(G);

    var mats = makeMats(C, spec.paint);
    var root = new V.Group();
    emit(root, K, mats, ["top", "bot", "wing", "dome", "team", "dark", "glass", "mark"]);
    var gear = new V.Group();
    gear.name = "gear";
    emit(gear, G, mats, ["metal", "dark"]);
    root.add(gear);
    return root;
  }

  return { build: build };
})();

(function () {
  var ROWS = {
    pact_e80_awacs: { star: "soviet",  paint: "old" },
    pact_e90_awacs: { star: "russian", paint: "old" },
    pact_e00_awacs: { star: "russian", paint: "u" },
    awacs_p:        { star: "russian", paint: "u" }
  };
  function reg(key) {
    UNIT_MODELS[key] = {
      len: 46.6,
      build: function (THREE, M, C) { return HeroA50.build(THREE, M, C, ROWS[key]); }
    };
  }
  for (var k in ROWS) reg(k);
})();
