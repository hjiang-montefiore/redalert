/* ============ us_e3_sentry.js -- Boeing E-3 Sentry and Northrop Grumman E-8C Joint STARS (HERO MODEL) ============

   The two big radar jets on the Boeing 707-320 airframe, drawn for the rows
   that fly them: the E-3B/C (nato_e80_awacs), the E-3G (nato_e00_awacs and the
   present-day awacs_n) and the E-8C Joint STARS (nato_e90_awacs). The UK E-3D
   (gbr_e90_awacs, gbr_e00_awacs) and the French E-3F (awacs_f, fra_e90_awacs,
   fra_e00_awacs) have been drawing awacs_n as a stand-in, with the era tint
   the renderer lays over a stand-in; they get their own rows here because they
   are the same aeroplane with different engines (see VARIANTS). Still standing
   in with awacs_n, and not 707s at all: awacs_b (the E-7A Wedgetail, a 737)
   and gbr_e60_awacs (the Shackleton AEW.2, a four-piston-engine aircraft).

   Published figures (USAF fact sheets and Boeing): E-3 length 44.35 m (145 ft
   6 in), span 44.4 m, fin tip 12.6 m; the rotodome 9.1 m (30 ft) across, 1.8 m
   (6 ft) deep, standing about 3.4 m (11 ft) clear of the fuselage on two
   struts. E-8C length 46.6 m (152 ft 11 in), span 44.4 m, about 12.9 m high,
   with a 12 m (40 ft) canoe radome under the forward fuselage and no dome.
   The old parametric models measured 53.8 x 44.5 x 22.9 m (E-3) and 53.8 x
   44.5 x 18.5 m (E-8C): a vertical disc for a dome, boxes for engines, and a
   body 21 per cent longer than the span where the airliner's is as long as
   it is wide. The E-3 is built 44.35 m long here because the USAF figure and
   the three-view agree on it: the drawing's side view, scaled to 44.35 m,
   gives a fin 13.0 m tall against the published 12.6, and 13.7 m if the body
   were 46.6. The E-8C keeps the airliner's 46.6, so its stations are the E-3's
   stretched by 5 per cent along the length; the span, the heights, the dome,
   the pods and the wheels are not stretched.

   Drawing: "AWACS Line drawing.jpg" (Wikimedia Commons, an engineer's three-
     view of the E-3, CC BY-SA 4.0). Its plan view is drawn about 5 per cent long
     against its span and its dome is drawn a third too wide in plan, so every
     fore-and-aft station here comes from the side view and the published
     length, and the wing is read off the plan outline in the side view's
     scale: leading edge swept 37.4 degrees from 13.8 m aft of the nose at the
     fuselage to 29.2 m at the tip, trailing edge to 31.5 m (2.3 m chord at the
     tip), about 280 m2 against the published 283.4; the engines 10.1 m and
     16.0 m off the centreline, their lips 4.4 and 4.8 m ahead of the leading
     edge; tailplane 14.2 m across; the fin raked 32 degrees; the belly rising
     10.7 degrees from 31 m aft of the nose to the tail cone; the nose wheel
     5.2 m and the main bogies 22.5 m from the nose.
   Photographs (Wikimedia Commons):
     "E-3 Sentry, Souda Bay - 021008-N-0780F-001.jpg" (US Navy, public domain)
        a USAF E-3 landing: white upper fuselage over light grey, the white fin
        with a yellow band, the two parallel dome struts a metre or so either
        side of the dome's centre, each about 1.2 m through, the dome's upper
        face dark against its pale rim, four-wheel main bogies, twin nose
        wheels, four slim pods hung well ahead of the wing on raked pylons
     "Boeing Sentry.jpg" (CC BY 4.0) a NATO E-3A climbing out in all-over grey:
        the same dome with the dark upper face, the large low tailplane, the
        dorsal fillet running forward from the fin
     "Northrop Grumman E-8C Joint STARS 00-2000-GA (8731121992).jpg" (CC BY-SA
        2.0) and "116th ACW E-8C Joint STARS 96-0042.jpg" (public domain): the
        E-8C in light grey, no dome, the long pale canoe under the forward
        fuselage starting just behind the nose gear and fairing into the wing
        root, the nose radome, the same four slim pods and the same tail

   What makes it an E-3 and not "a 707", at RTS zoom:
     1. The rotodome: a 9.1 m disc, wider than the fuselage is deep, on two
        struts, its upper face dark inside a pale rim (a team-colour ring sits
        on the rim). From above it is a disc with a swept wing through it.
     2. The wing: swept 35 degrees, four slim pods slung forward of it, a
        large low tailplane and a raked fin with a dorsal fillet.
   and what makes it a JSTARS:
     1. No dome, and the 12 m canoe under the belly, the one thing from the
        side that tells it from an airliner.
   The wings are drawn spread; the pods are not turned; nothing is animated
   (the renderer does not turn a dome).

   VARIANTS. Rows differ only where a photograph or a published fit shows it:
     dome     the E-3 rows; the E-8C has the canoe in its place.
     engines  slim TF33-style pods (the USAF and NATO E-3; the E-8C's pods are
              drawn the same) or the CFM56 pods of the E-3D and E-3F: shorter
              and nearly a third wider, because the CFM56-2 fan is about 1.8 m
              across.
     tips     the E-3D alone has the ESM pods on its wingtips.
     paint    white over light grey for the E-3B/C (the Souda Bay aircraft);
              light grey all over for the E-3G (the NATO E-3A photograph is
              grey all over too) and for the E-3D and E-3F, whose aircraft no
              photograph was consulted for, so theirs is the E-3G's shade; a
              light grey with a paler canoe for the E-8C.
   Team colour: a ring on the dome's rim (what the camera sees), the upper
   wingtips and tailplane tips and the top of the fin, all exactly C.team; the
   E-8C, which has no dome, wears a band round the roof ahead of the wing.

   Model space: +X nose, +Y left (port), +Z up, metres. s below is metres aft of
   the nose tip in the E-3's 44.35 m frame, h metres above the ground; the gear
   stands on h = 0. Merged into one mesh per material; the gear is its own
   named group, the lowest opaque thing on the aeroplane.
   The redo (see "details" below) adds the pods' lips, fan faces, exhaust
   steps and core plugs, the flap-track fairings, seam ribbons for the
   panel breaks and hinge lines, the entry door, the windscreen frames,
   aerials, lamps, gear doors, and a grey-scale paint sheet over the coats.
   ========================================================================= */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroE3 = (function () {
  "use strict";

  var V = null;                         /* THREE, set by build()                  */
  var D2R = Math.PI / 180;
  var L3 = 44.35;                       /* the E-3's length: every table is in it */
  var ZG = -3.45;                       /* the ground, below the origin           */
  var XN = L3 / 2, FX = 1;              /* nose x and the stretch, set per build  */
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

  /* ======================================================== the fuselage ==
     Rows: station s, half-width, top h, bottom h. The 707 body is 3.76 m wide
     and about 4.1 m deep, level on top from the cockpit to the fin, the keel
     bulging into the wing-body fairing under the wing root (belly down to 1.18
     m there) and rising from 31 m aft of the nose to the tail cone at 10.7
     degrees (the drawing's side view). */
  var FUS = [
    [0.00, 0.05, 3.02, 2.90],
    [0.28, 0.46, 3.50, 2.46],
    [0.75, 0.92, 4.00, 2.02],
    [1.50, 1.36, 4.28, 1.76],
    [2.50, 1.70, 4.68, 1.60],
    [3.80, 1.86, 5.08, 1.52],
    [5.30, 1.88, 5.36, 1.47],
    [7.50, 1.88, 5.52, 1.45],
    [11.0, 1.88, 5.58, 1.44],
    [14.0, 1.88, 5.58, 1.40],
    [16.5, 1.88, 5.58, 1.26],
    [20.0, 1.88, 5.58, 1.18],
    [24.0, 1.88, 5.58, 1.20],
    [27.0, 1.88, 5.58, 1.32],
    [29.5, 1.88, 5.58, 1.44],
    [31.5, 1.87, 5.57, 1.58],
    [33.5, 1.80, 5.54, 1.84],
    [35.5, 1.64, 5.48, 2.22],
    [37.5, 1.40, 5.38, 2.66],
    [39.5, 1.14, 5.22, 3.10],
    [41.5, 0.84, 5.00, 3.56],
    [43.2, 0.52, 4.72, 3.92],
    [44.35, 0.20, 4.50, 4.16]
  ];
  var FST = [0, 0.12, 0.28, 0.50, 0.75, 1.10, 1.50, 2.00, 2.50, 3.20, 3.80, 4.60, 5.30, 6.50, 7.50,
             9.20, 10.6, 13.0, 14.0, 16.5, 20.0, 24.0, 27.0, 29.5, 31.5, 33.5, 35.5, 37.5, 39.5,
             41.5, 43.2, 44.35];
  var FEXP = 0.9, FN = 28;
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
  /* the paint line runs a little below the middle of the section */
  function upperSeg(n) {
    return function (i) { var m = (i + 0.5) * 360 / n; return m < 105 || m > 255; };
  }
  /* band: the E-8C's team band, cut into the skin between 9.2 and 10.6 m aft of
     the nose and 77 degrees either side of the roof, not laid over it, so no
     two surfaces share a plane */
  function addFuselage(band) {
    var rings = [], r, i, sh = new Shell(), up = upperSeg(FN);
    for (r = 0; r < FST.length; r++) {
      var ring = [];
      for (i = 0; i < FN; i++) ring.push(fusPt(FST[r], i * 360 / FN, 0));
      rings.push(ring);
    }
    sh.loft(rings, function (i, r) {
      if (band && FST[r] > 9.19 && FST[r + 1] < 10.61) {
        var m = (i + 0.5) * 360 / FN;
        if (m < 80 || m > 280) return 3;
      }
      return up(i);
    }, true, true);
    sh.emit({ 0: "top", 1: "bot", 2: "top", 3: "team" });
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
  function finSecs(yc, hs, sle, cs, t) {
    var out = [], i;
    for (i = 0; i < hs.length; i++) out.push({ a: hs[i], s: sle[i], c: cs[i], t: t[i], o: yc });
    return out;
  }

  /* ============================================================== wing ==
     Low, swept, with the dihedral the front view shows (the tips 4.7 m up
     against 2.55 m at the root). Leading edge 37.4 degrees back; the trailing
     edge kinks at 14 m out, and inboard of 5.8 m it runs straight across (the
     Yehudi, hidden under the dome in the drawing's plan, which brings the
     area to about 280 m2 against the published 283.4). 12.5 per cent thick at the root, 10 at the tip.
     The last 2.2 m of each tip is the team's, on the upper skin. */
  var WLE0 = 13.8, WLES = 0.7625;
  function wingLE(a) { return WLE0 + (a - 2.0) * WLES; }
  function wingTE(a) {
    return a <= 14.0 ? Math.max(23.1 + (a - 1.9) * 0.385, 24.6) : 27.76 + (a - 14.0) * 0.46;
  }
  function wingSec(y) {
    var a = Math.abs(y), le = wingLE(a);
    return { a: y, s: le, c: wingTE(a) - le, t: 0.125 - 0.0011 * a, o: 2.55 + 0.098 * a };
  }
  var WTIP = 22.2, WTEAM = 20.0;
  function addWing() {
    var ys = [-20.0, -17.0, -14.0, -11.5, -10.1, -8.0, -5.8, -3.2, -1.2, 0, 1.2, 3.2, 5.8, 8.0,
              10.1, 11.5, 14.0, 17.0, 20.0], i, secs = [];
    for (i = 0; i < ys.length; i++) secs.push(wingSec(ys[i]));
    foil(secs, "w", { 0: "top", 1: "bot", 2: "top" });
    foil([wingSec(WTEAM), wingSec(WTIP)], "w", { 0: "team", 1: "bot", 2: "team" });
    foil([wingSec(-WTIP), wingSec(-WTEAM)], "w", { 0: "team", 1: "bot", 2: "team" });
  }

  /* ============================================================== tail ==
     Tailplane 14.2 m across, swept 35 degrees, 7 degrees of dihedral, set low
     on the tail cone; the fin raked 32 degrees with the dorsal fillet running
     forward of it. The tailplane tips and the top 1.4 m of the fin are the
     team's. */
  var TAIL_END = 44.30;
  function tpSec(y) {
    var a = Math.abs(y), le = 38.0 + 0.70 * (a - 0.9), te = Math.min(TAIL_END, 42.4 + 0.34 * (a - 0.9));
    return { a: y, s: le, c: te - le, t: 0.105 - 0.0035 * a, o: 4.15 + 0.125 * a };
  }
  function addTailplane() {
    var ys = [-5.6, -4.2, -2.4, -0.9, 0, 0.9, 2.4, 4.2, 5.6], i, secs = [];
    for (i = 0; i < ys.length; i++) secs.push(tpSec(ys[i]));
    foil(secs, "w", { 0: "top", 1: "bot", 2: "top" });
    foil([tpSec(5.6), tpSec(7.1)], "w", { 0: "team", 1: "bot", 2: "team" });
    foil([tpSec(-7.1), tpSec(-5.6)], "w", { 0: "team", 1: "bot", 2: "team" });
  }
  /* the fin: leading edge from 37.2 m at the roof to 41.7 at the tip, trailing
     edge 43.9 to 43.7 */
  function finLE(h, top) { return 37.2 + (h - 5.5) * (4.5 / (top - 5.5)); }
  function finTE(h, top) { return 43.9 - (h - 5.5) * (0.2 / (top - 5.5)); }
  function finSec(h, top) {
    var le = finLE(h, top);
    return { a: h, s: le, c: finTE(h, top) - le, t: 0.105 - 0.025 * (h - 5.5) / (top - 5.5), o: 0 };
  }
  function addFin(top) {
    var hs = [5.3, 6.4, 8.0, 9.6, 11.2], i, secs = [];
    for (i = 0; i < hs.length; i++) secs.push(finSec(hs[i], top));
    foil(secs, "f", { 0: "top", 1: "top", 2: "top" });
    foil([finSec(11.2, top), finSec(top, top)], "f", { 0: "team", 1: "team", 2: "team" });
    /* the dorsal fillet */
    foil(finSecs(0, [5.35, 6.2, 7.0, 7.7], [32.6, 34.2, 35.6, 36.7], [7.0, 4.8, 3.3, 2.1],
                 [0.045, 0.06, 0.08, 0.10]), "f", { 0: "top", 1: "top", 2: "top" });
  }

  /* ============================================================== pods ==
     A pod is a body of revolution about a line parallel to the keel: rows are
     distance back from the lip, radius. The lip is closed by a dark intake
     face and the tail by a dark nozzle. The pylon is a raked foil from the
     pod's top to the wing, leading edge forward of the wing's by about 2 m. */
  var POD_TF33 = [[0.00, 0.60], [0.05, 0.70], [0.25, 0.75], [0.70, 0.76], [1.60, 0.76], [2.60, 0.74],
                  [3.50, 0.67], [4.20, 0.58], [4.70, 0.47], [5.10, 0.36], [5.40, 0.26], [5.60, 0.16]];
  var POD_CFM = [[0.00, 0.80], [0.06, 0.92], [0.30, 0.98], [1.00, 1.00], [2.00, 0.98], [2.80, 0.88],
                 [3.30, 0.70], [3.70, 0.50], [4.00, 0.36], [4.20, 0.20]];
  var POD_ESM = [[0.00, 0.10], [0.20, 0.26], [0.60, 0.32], [2.00, 0.32], [2.80, 0.22], [3.30, 0.08]];
  /* x of the lip, y and h of the axis; seg round the pod */
  function addPod(xLip, yc, hc, rows, seg) {
    var rings = [], r, i, sh = new Shell(), a, row;
    for (r = 0; r < rows.length; r++) {
      row = [];
      for (i = 0; i < seg; i++) {
        a = i * 360 / seg;
        row.push([xLip - rows[r][0], yc + rows[r][1] * Math.sin(a * D2R), Z(hc) + rows[r][1] * Math.cos(a * D2R)]);
      }
      rings.push(row);
    }
    sh.loft(rings, upperSeg(seg), true, true);
    sh.emit({ 0: "top", 1: "bot", 2: "dark" });
  }
  var PODS = [{ y: 10.1, h: 2.15, lead: 4.35 }, { y: 16.0, h: 2.65, lead: 4.80 }];
  function addPods(spec) {
    var i, sd, p, sLip, xLip, rows = spec.cfm ? POD_CFM : POD_TF33, sec, top;
    for (i = 0; i < PODS.length; i++) {
      p = PODS[i];
      /* the lip stands 4.35 m (inboard) or 4.8 m (outboard) ahead of the leading edge, a CFM56 pod 0.7 m less */
      sLip = wingLE(p.y) - (p.lead - (spec.cfm ? 0.7 : 0));
      for (sd = -1; sd <= 1; sd += 2) {
        xLip = X(sLip);
        addPod(xLip, sd * p.y, p.h, rows, spec.cfm ? 22 : 20);
        podDetail(xLip, sd * p.y, p.h, rows);
        sec = wingSec(p.y); top = sec.o - 0.05;
        foil(finSecs(sd * p.y, [p.h + (spec.cfm ? 0.80 : 0.50), top],
                     [sLip + 1.2, sLip + 2.7], [3.3, 3.2], [0.075, 0.07]),
             "f", { 0: "top", 1: "top", 2: "top" });
      }
    }
    if (spec.tips) {
      /* the E-3D's ESM pods on the wingtips, on the chord line at the tip */
      sec = wingSec(WTIP);
      for (sd = -1; sd <= 1; sd += 2) addPod(X(sec.s - 0.2), sd * (WTIP + 0.12), sec.o, POD_ESM, 12);
    }
  }

  /* ========================================================== rotodome ==
     A lens 9.1 m across and 1.84 m deep, centred 28.5 m aft of the nose (the
     side view's lens spans 24.0 to 33.1 m) and standing 3.4 m clear of the
     5.58 m crown, its bottom 8.98 m up (the USAF's "11 feet above the
     fuselage"; the drawing reads 8.96); two struts, the front one broad, 1.3 m
     either side of its centre (the Souda Bay photograph). The upper face is
     dark inside a pale rim, and a team ring sits on the rim. */
  var DX = 28.5, DR = 4.55, DC = 9.86, DHT = 0.92, DHB = 0.88, DEXP = 2.8, DM = 14, DN = 40;
  function discRing(r, h) {
    var ring = [], i, b;
    for (i = 0; i < DN; i++) {
      b = i * 2 * Math.PI / DN;
      ring.push([X(DX) + r * Math.cos(b), r * Math.sin(b), Z(h)]);
    }
    return ring;
  }
  /* the lens profile by angle f (0 = top centre, pi = bottom centre) and, for a
     radius on the upper face, the f that reaches it */
  function lensRing(f) {
    var cs = Math.cos(f), sn = Math.abs(Math.sin(f));
    return discRing(Math.max(DR * Math.pow(sn, 2 / DEXP), 0.03),
                    DC + (cs >= 0 ? DHT : DHB) * sgp(cs, 2 / DEXP));
  }
  function lensF(r) { return Math.asin(Math.pow(Math.min(r / DR, 1), DEXP / 2)); }
  function lensPart(f0, f1, n, capA, capB, mat) {
    var rings = [], k, sh = new Shell();
    for (k = 0; k <= n; k++) rings.push(lensRing(f0 + (f1 - f0) * k / n));
    sh.loft(rings, function () { return true; }, capA, capB);
    sh.emit({ 0: mat, 1: mat, 2: mat });
  }
  function addDome() {
    /* the lens is cut into parts on shared rings, so that no two surfaces
       share a plane: the dark upper face out to r = 3.35 m, a pale band to
       3.65, the team ring to 4.05 (0.4 m wide), and the rest in the rim colour */
    var fc = lensF(3.35), f0 = lensF(3.65), f1 = lensF(4.05);
    lensPart(0, fc, 4, true, false, "dark");
    lensPart(fc, f0, 1, false, false, "dome");
    lensPart(f0, f1, 2, false, false, "team");
    lensPart(f1, Math.PI, DM, false, true, "dome");
    /* the two struts */
    foil(finSecs(0, [5.3, 6.5, 7.8, 9.5], [26.8, 27.1, 27.3, 27.4], [2.0, 1.5, 1.25, 1.2],
                 [0.20, 0.24, 0.26, 0.26]), "f", { 0: "top", 1: "top", 2: "top" });
    foil(finSecs(0, [5.3, 6.5, 7.8, 9.5], [29.0, 29.2, 29.3, 29.4], [1.6, 1.25, 1.05, 1.0],
                 [0.22, 0.25, 0.28, 0.28]), "f", { 0: "top", 1: "top", 2: "top" });
  }

  /* ============================================================== canoe ==
     The E-8C's radome: 12 m long, from just behind the nose gear to the wing
     root fairing, 1.5 m wide and hanging about 1 m below the belly, ends
     tapering (rows: fraction of the length, half-width, depth below the
     belly). The belly line under it is the fuselage's own. */
  var CANOE = [[0.00, 0.05, 0.02], [0.04, 0.35, 0.30], [0.12, 0.60, 0.65], [0.25, 0.72, 0.88],
               [0.45, 0.76, 0.96], [0.70, 0.74, 0.96], [0.88, 0.60, 0.74], [0.96, 0.38, 0.36],
               [1.00, 0.10, 0.08]];
  function addCanoe() {
    var rings = [], k, i, s0 = 6.0 / FX, s1 = 18.0 / FX, sh = new Shell(), u, s, row, hb, top, bot, hm, hh, a, ring;
    for (k = 0; k <= 16; k++) {
      u = k / 16; s = s0 + (s1 - s0) * u;
      row = tab(CANOE, u); hb = tab(FUS, s)[2];
      top = hb + 0.5; bot = hb - row[1]; hm = (top + bot) / 2; hh = (top - bot) / 2;
      ring = [];
      for (i = 0; i < 20; i++) {
        a = i * 18;
        ring.push([X(s), row[0] * sgp(Math.sin(a * D2R), 0.9), Z(hm + hh * sgp(Math.cos(a * D2R), 0.9))]);
      }
      rings.push(ring);
    }
    sh.loft(rings, function () { return true; }, true, true);
    sh.emit({ 0: "dome", 1: "dome", 2: "dome" });
  }

  /* ============================================================== glass ==
     Panes laid just proud of the skin, found by station and angle from the
     roof: the windscreen in three panes and two side windows a side. */
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
  function addGlass() {
    var sh = new Shell(), i, sd, wc = [-58, -20, 20, 58];
    for (i = 0; i < 3; i++) glassPane(sh, 2.35, 3.05, wc[i], wc[i + 1], 2, 3);
    for (sd = -1; sd <= 1; sd += 2) {
      glassPane(sh, 3.15, 3.65, sd * 60, sd * 84, 2, 2);
      glassPane(sh, 3.75, 4.25, sd * 60, sd * 84, 2, 2);
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
  function rod(a, b, r, seg, r2) {        /* r2: the radius at b, if not r */
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r2 === undefined ? r : r2, r, L, seg || 8);
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

  /* nose gear 5.2 m from the nose: twin wheels, a drag brace; two four-wheel
     bogies 22.5 m from it, 3.4 m off the centreline, the strut from the wing
     root's lower surface. Every wheel bottom is h = 0. */
  function addGear(G) {
    var sd, i, sx, yw;
    G.metal.push(rod([X(5.2), 0, Z(1.80)], [X(5.25), 0, Z(0.52)], 0.09, 8));
    G.metal.push(rod([X(4.3), 0, Z(1.62)], [X(5.2), 0, Z(0.95)], 0.05, 6));
    G.metal.push(rod([X(5.25), -0.27, Z(0.50)], [X(5.25), 0.27, Z(0.50)], 0.05, 6));
    G.dark.push(wheelG(0.50, 0.34, X(5.25), -0.27, Z(0.50), 18));
    G.dark.push(wheelG(0.50, 0.34, X(5.25), 0.27, Z(0.50), 18));
    for (sd = -1; sd <= 1; sd += 2) {
      G.metal.push(rod([X(22.2), sd * 3.4, Z(2.60)], [X(22.5), sd * 3.4, Z(0.80)], 0.13, 8));
      G.metal.push(rod([X(21.0), sd * 3.4, Z(2.40)], [X(22.45), sd * 3.4, Z(1.00)], 0.07, 6));
      G.metal.push(boxG(1.9, 0.20, 0.22, X(22.5), sd * 3.4, Z(0.74)));
      for (i = -1; i <= 1; i += 2) {
        sx = 22.5 + i * 0.75;
        for (yw = -1; yw <= 1; yw += 2) {
          G.dark.push(wheelG(0.62, 0.44, X(sx), sd * 3.4 + yw * 0.29, Z(0.62), 20));
        }
      }
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
     (the redo) The shells alone read as a smooth airliner in flat paint.
     What the photographs named above show and is now drawn:
       - the pods: a bright intake lip, the dark fan face set back in it,
         the fan exhaust step two thirds of the way aft and the core nozzle
         with its plug standing out of the back (TF33 pods; the CFM56 pods
         of the E-3D / E-3F the same in their own rows' proportions);
       - four flap-track fairings under each wing (the Souda Bay and Joint
         STARS photographs), the flap, aileron and spoiler hinge lines;
       - the body's panel breaks, the forward entry door outline on the
         port side, the windscreen frames, the E-8C canoe's joints;
       - blade aerials on the spine and belly (their stations NOT
         CONFIRMED), the nav lamps, the beacons, the tail cone's lamp;
       - a grey-scale paint sheet over the coats: panel lines, rivet rows,
         the walkways over the wing roots, soot behind the four pods. */
  var DX_ = null;
  function foilTh(sec, u) {
    return sec.t * sec.c * (1.4845 * Math.sqrt(u) - 0.63 * u - 1.758 * u * u + 1.4215 * u * u * u - 0.518 * u * u * u * u);
  }
  function wPt(sec, u, sg) { return [X(sec.s + u * sec.c), sec.a, Z(sec.o + sg * foilTh(sec, u))]; }
  function wingLine(secOf, y0, y1, u0, u1, sg, n) {
    var pts = [], i;
    for (i = 0; i <= n; i++) {
      var y = y0 + (y1 - y0) * i / n;
      pts.push(wPt(secOf(y), u0 + (u1 - u0) * i / n, sg));
    }
    return DX_.ribbon(pts, [0, 0, sg], 0.07, 0.015);
  }
  function fusHoop(s, a0, a1) {
    var r = tab(FUS, s), hm = (r[1] + r[2]) / 2;
    return DX_.hoop(function (a) { return fusPt(s, a, 0); }, a0, a1, 28,
                    function () { return [0, 0, Z(hm)]; }, 0.045, 0.015);
  }
  function fusRun(s0, s1, a, n) {
    var pts = [], nr = [], i;
    for (i = 0; i <= n; i++) {
      var s = s0 + (s1 - s0) * i / n, r = tab(FUS, s), p = fusPt(s, a, 0);
      pts.push(p); nr.push([0, p[1], p[2] - Z((r[1] + r[2]) / 2)]);
    }
    return DX_.ribbon(pts, nr, 0.045, 0.015);
  }
  /* a path in (s, angle) on the skin, closed or open */
  function fusPath(sa, w, push, key) {
    var pts = [], nr = [], i, k;
    for (i = 0; i + 1 < sa.length; i++) {
      for (k = 0; k < 6; k++) {
        var t = k / 6, s = sa[i][0] + (sa[i + 1][0] - sa[i][0]) * t, a = sa[i][1] + (sa[i + 1][1] - sa[i][1]) * t;
        var r = tab(FUS, s), p = fusPt(s, a, push);
        pts.push(p); nr.push([0, p[1], p[2] - Z((r[1] + r[2]) / 2)]);
      }
    }
    var e = sa[sa.length - 1], re = tab(FUS, e[0]), pe = fusPt(e[0], e[1], push);
    pts.push(pe); nr.push([0, pe[1], pe[2] - Z((re[1] + re[2]) / 2)]);
    put(key || "seam", DX_.ribbon(pts, nr, w, 0));
  }
  function podDetail(xLip, yc, hc, rows) {
    var R0 = rows[0][1], i, n = 24, last = rows[rows.length - 1], Lp = last[0];
    var lip = [], fan = [], ring = [];
    for (i = 0; i < n; i++) {
      var a = i * 2 * Math.PI / n, c = Math.cos(a), s = Math.sin(a);
      lip.push([xLip + 0.02, yc + (R0 + 0.03) * c, Z(hc) + (R0 + 0.03) * s]);
      ring.push([xLip - 0.05, yc + (R0 - 0.06) * c, Z(hc) + (R0 - 0.06) * s]);
      fan.push([xLip - 0.45, yc + (R0 - 0.08) * c, Z(hc) + (R0 - 0.08) * s]);
    }
    var sh = new Shell();
    sh.loft([lip, ring], function () { return true; }, false, false);
    sh.emit({ 0: "metal", 1: "metal", 2: "metal" });
    var sh2 = new Shell();
    sh2.loft([ring, fan], function () { return true; }, false, true);
    sh2.emit({ 0: "dark", 1: "dark", 2: "dark" });
    /* the spinner in the fan face */
    put("metal", rod([xLip - 0.40, yc, Z(hc)], [xLip - 0.12, yc, Z(hc)], 0.17, 12, 0.02));
    /* the fan-exhaust step: a band round the pod */
    var st = Lp * 0.62, rr = tab(rows, st)[0];
    put("seam", DX_.hoop(function (a) { return [xLip - st, yc + rr * Math.cos(a), Z(hc) + rr * Math.sin(a)]; },
                         0, 2 * Math.PI, 24, function () { return [xLip - st, yc, Z(hc)]; }, 0.10, 0.012));
    /* the core nozzle and its plug out of the back */
    var xe = xLip - Lp, rc = Math.max(last[1], 0.16) + 0.04;
    put("metal", rod([xe + 0.05, yc, Z(hc)], [xe - 0.55, yc, Z(hc)], rc, 16, rc * 0.92));
    put("dark", rod([xe - 0.54, yc, Z(hc)], [xe - 0.56, yc, Z(hc)], rc * 0.85, 16));
    put("metal", rod([xe - 0.5, yc, Z(hc)], [xe - 1.05, yc, Z(hc)], rc * 0.55, 12, 0.02));
  }
  function addDetails(spec, G) {
    var sd, i, s;
    /* body frames over the top and sides; side seams */
    [5.0, 7.6, 10.4, 13.6, 16.6, 19.6, 22.6, 25.6, 28.6, 31.6, 34.6, 37.6, 40.4].forEach(function (s0) {
      put("seam", fusHoop(s0, -112, 112));
    });
    for (sd = -1; sd <= 1; sd += 2) {
      put("seam", fusRun(4.6, 41.0, sd * 92, 24));
      put("seam", fusRun(4.6, 38.0, sd * 34, 22));
      /* windscreen and side-window frames */
      fusPath([[2.35, sd * 58], [3.05, sd * 58]], 0.10, 0.065, "dark");
      fusPath([[2.35, sd * 20], [3.05, sd * 20]], 0.10, 0.065, "dark");
      fusPath([[3.15, sd * 60], [4.25, sd * 60]], 0.08, 0.065, "dark");
      fusPath([[3.15, sd * 84], [4.25, sd * 84]], 0.08, 0.065, "dark");
      fusPath([[3.70, sd * 60], [3.70, sd * 84]], 0.08, 0.065, "dark");
    }
    fusPath([[2.35, -58], [2.35, 58]], 0.10, 0.065, "dark");
    fusPath([[3.05, -84], [3.05, 84]], 0.10, 0.065, "dark");
    /* the forward entry door, port side */
    fusPath([[5.4, 62], [6.4, 62], [6.4, 112], [5.4, 112], [5.4, 62]], 0.07, 0.012);
    /* wings: flap / aileron line, spoilers, front spar; the flap-track
       fairings under the trailing edge */
    for (sd = -1; sd <= 1; sd += 2) {
      put("seam", wingLine(wingSec, sd * 2.2, sd * 21.8, 0.76, 0.76, 1, 16));
      put("seam", wingLine(wingSec, sd * 2.2, sd * 21.8, 0.62, 0.62, 1, 16));
      put("seam", wingLine(wingSec, sd * 2.2, sd * 21.8, 0.16, 0.16, 1, 16));
      put("seam", wingLine(wingSec, sd * 2.2, sd * 21.8, 0.76, 0.76, -1, 16));
      [7.0, 11.5].forEach(function (y) { put("seam", wingLine(wingSec, sd * y, sd * y, 0.62, 1.0, 1, 4)); });
      [5.0, 8.6, 12.6, 15.4].forEach(function (y) {
        var sec = wingSec(sd * y), rings = [], k, prof = [[0.50, 0.02, 0.02], [0.60, 0.18, 0.24], [0.82, 0.25, 0.36],
                                                       [1.02, 0.22, 0.32], [1.18, 0.11, 0.18], [1.27, 0.02, 0.04]];
        for (k = 0; k < prof.length; k++) {
          var u = prof[k][0], hw = prof[k][1], dp = prof[k][2], sx = sec.s + u * sec.c;
          var zb = sec.o - (u <= 1 ? foilTh(sec, Math.min(u, 1)) : 0) - 0.02, ring = [], j;
          for (j = 0; j < 12; j++) {
            var a = j / 12 * Math.PI * 2, cy = Math.cos(a), sz = Math.sin(a);
            ring.push([X(sx), sd * y + hw * cy, Z(zb + (sz > 0 ? 0.05 * sz : dp * sz))]);
          }
          rings.push(ring);
        }
        var shf = new Shell();
        shf.loft(rings, function () { return false; }, true, true);
        shf.emit({ 0: "bot", 1: "bot", 2: "bot" });
      });
      /* tailplane elevator line; nav lamps on the wingtips */
      put("seam", wingLine(tpSec, sd * 1.0, sd * 7.0, 0.70, 0.70, 1, 6));
      var ws = wingSec(sd * WTIP);
      put("lamp", DX_.lamp([X(ws.s + 0.5), sd * (WTIP - 0.15), Z(ws.o)], 0.12, sd > 0 ? 0xe02218 : 0x18c04a));
    }
    /* the rudder line, both faces */
    for (sd = -1; sd <= 1; sd += 2) {
      var rp = [];
      for (i = 0; i <= 6; i++) {
        var h = 5.9 + (spec.fin - 6.2) * i / 6, f = finSec(h, spec.fin);
        rp.push([X(f.s + 0.70 * f.c), sd * (foilTh(f, 0.70) + 0.01), Z(h)]);
      }
      put("seam", DX_.ribbon(rp, [0, sd, 0], 0.07, 0.008));
    }
    /* beacons, the tail lamp */
    put("lamp", DX_.lamp(fusPt(spec.dome ? 13.0 : 21.0, 0, 0.04), 0.14, 0xe02218));
    put("lamp", DX_.lamp(fusPt(25.0, 180, 0.04), 0.14, 0xe02218));
    put("lamp", DX_.lamp(fusPt(44.25, 180, 0.0), 0.08, 0xf4f1e0));
    /* blade aerials: spine and belly; the E-8C carries more */
    var AE = [[8.5, 0, 0.55], [30.5, 0, 0.50], [11.5, 180, 0.45], [28.5, 180, 0.40], [33.0, 180, 0.40]];
    if (spec.canoe) AE.push([16.0, 0, 0.6], [19.0, 0, 0.6], [24.0, 0, 0.5], [35.5, 180, 0.35]);
    for (i = 0; i < AE.length; i++) {
      var ap = fusPt(AE[i][0], AE[i][1], 0), up = AE[i][1] ? [0, 0, -1] : [0, 0, 1];
      put("dark", DX_.blade(ap, up, [1, 0, 0], AE[i][2], 0.55, 0.22, 0.05, 0.25));
    }
    /* the canoe's joints */
    if (spec.canoe) {
      for (i = 1; i < 6; i++) {
        s = (6.0 + 12.0 * i / 6) / FX;
        var hb = tab(FUS, s)[2], cw = tab(CANOE, i / 6)[0], dpt = tab(CANOE, i / 6)[1];
        put("seam", DX_.hoop((function (ss, hb2, w2, d2) {
          return function (a) {
            var top = hb2 + 0.5, bot = hb2 - d2, hm = (top + bot) / 2, hh = (top - bot) / 2;
            return [X(ss), w2 * sgp(Math.sin(a), 0.9), Z(hm + hh * sgp(Math.cos(a), 0.9))];
          };
        })(s, hb, cw, dpt), Math.PI * 0.55, Math.PI * 1.45, 14, (function (ss, hb2) { return function () { return [X(ss), 0, Z(hb2)]; }; })(s, hb), 0.06, 0.012));
      }
    }
    /* gear doors: the nose doors beside the leg, the main doors outboard */
    for (sd = -1; sd <= 1; sd += 2) {
      G.bot.push(boxG(1.6, 0.04, 0.85, X(5.0), sd * 0.62, Z(1.30)));
      G.bot.push(boxG(2.2, 0.05, 1.10, X(22.4), sd * 4.05, Z(1.85)));
    }
  }

  var LAY = null, _sheets = {};
  function paintSheet(spec) {
    var id = spec.len + (spec.canoe ? "c" : "d");
    if (_sheets[id] !== undefined) return _sheets[id];
    try {
      var top = [], bot = [], riv = [], side = [], fr = [], i, y, ws;
      function wl(u, y0, y1) {
        var out = [], k;
        for (k = 0; k <= 8; k++) { var yy = y0 + (y1 - y0) * k / 8, w = wingSec(yy); out.push([X(w.s + u * w.c), yy]); }
        return out;
      }
      top.push(wl(0.16, 2.0, 22.0), wl(0.62, 2.0, 22.0), wl(0.76, 2.0, 22.0), wl(0.40, 2.0, 22.0));
      bot.push(wl(0.16, 2.0, 22.0), wl(0.76, 2.0, 22.0));
      riv.push(wl(0.28, 2.0, 22.0), wl(0.52, 2.0, 22.0));
      for (y = 3.0; y < 22; y += 1.6) { ws = wingSec(y); top.push([[X(ws.s), y], [X(ws.s + ws.c), y]]); bot.push([[X(ws.s), y], [X(ws.s + ws.c), y]]); }
      for (i = 1; i < 7; i++) { var tp = tpSec(i); top.push([[X(tp.s), i], [X(tp.s + tp.c), i]]); }
      for (s = 2.4; s < 44; s += 1.5) fr.push([X(s), tab(FUS, s)[0]]);
      side.push([[X(1.0), Z(4.2)], [X(43.0), Z(4.2)]], [[X(4.0), Z(2.3)], [X(36.0), Z(2.3)]], [[X(4.0), Z(4.95)], [X(38.0), Z(4.95)]]);
      var soot = [];
      for (i = 0; i < PODS.length; i++) {
        var sLip = wingLE(PODS[i].y) - PODS[i].lead, lp = (spec.cfm ? POD_CFM : POD_TF33);
        soot.push([X(sLip) - lp[lp.length - 1][0], PODS[i].y, Z(PODS[i].h), 7.0, 0.55]);
        soot.push([X(sLip) - lp[lp.length - 1][0], -PODS[i].y, Z(PODS[i].h), 7.0, 0.55]);
      }
      var s;
      _sheets[id] = DX_.sheet(LAY, {
        frames: fr, top: top, bot: bot, rivets: riv, side: side, seam: 0.5, grime: 220, soot: soot,
        walk: [[[X(14.5), 1.9], [X(14.5), 3.6], [X(20.5), 3.6], [X(20.5), 1.9]]]
      }, 3301);
    } catch (e) { _sheets[id] = false; }
    return _sheets[id];
  }

  /* ========================================================= build / mats == */
  var PAINT = {
    white: { top: 0xe4e7e9, bot: 0xb7bdc1, dome: 0xe8eaeb },   /* E-3B/C: white over light grey   */
    grey:  { top: 0xbcc3c7, bot: 0xa5adb2, dome: 0xd7dbdd },   /* E-3G, E-3D, E-3F: light grey    */
    jstar: { top: 0xaeb6bb, bot: 0x9ea7ac, dome: 0xd6dbdd }    /* E-8C: light grey, a paler canoe */
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
    m.dark = new V.MeshStandardMaterial({ color: 0x24282b, roughness: 0.82, metalness: 0.12, side: V.DoubleSide });
    m.seam = new V.MeshStandardMaterial({ color: new V.Color(p.bot).multiplyScalar(0.5), roughness: 0.85, metalness: 0.05,
                                          side: V.DoubleSide });
    m.lamp = new V.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.3, metalness: 0.0,
                                          emissive: 0x333333, emissiveIntensity: 0.6 });
    if (tex) { m.top.map = tex; m.bot.map = tex; m.dome.map = tex; }
    m.glass = new V.MeshStandardMaterial({ color: 0x2b3a46, roughness: 0.12, metalness: 0.50,
                                           transparent: true, opacity: 0.82, side: V.DoubleSide });
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

  /* spec: { len, fin, dome, canoe, cfm, tips, paint } */
  function build(THREE, M, C, spec) {
    V = THREE;
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    K = {};
    DX_ = DK(V);
    XN = spec.len / 2; FX = spec.len / L3;
    addFuselage(spec.canoe);
    addWing();
    addTailplane();
    addFin(spec.fin);
    addPods(spec);
    if (spec.dome) addDome();
    if (spec.canoe) addCanoe();
    addGlass();
    var G = { metal: [], dark: [], bot: [] };
    addGear(G);
    addDetails(spec, G);

    LAY = DX_.layout(X(spec.len / FX) - 0.1, XN + 0.1, 22.3, ZG, Z(spec.fin + 0.2));
    var mats = makeMats(C, spec.paint, paintSheet(spec));
    var root = new V.Group();
    emit(root, K, mats, ["top", "bot", "dome", "team", "seam", "dark", "metal", "lamp", "glass"]);
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
  var E3BC = { len: 44.35, fin: 12.6, dome: true, canoe: false, cfm: false, tips: false, paint: "white" };
  var E3G = { len: 44.35, fin: 12.6, dome: true, canoe: false, cfm: false, tips: false, paint: "grey" };
  var E3D = { len: 44.35, fin: 12.6, dome: true, canoe: false, cfm: true, tips: true, paint: "grey" };
  var E3F = { len: 44.35, fin: 12.6, dome: true, canoe: false, cfm: true, tips: false, paint: "grey" };
  var E8C = { len: 46.6, fin: 12.9, dome: false, canoe: true, cfm: false, tips: false, paint: "jstar" };
  var ROWS = {
    nato_e80_awacs: E3BC, nato_e00_awacs: E3G, awacs_n: E3G, nato_e90_awacs: E8C,
    gbr_e90_awacs: E3D, gbr_e00_awacs: E3D,
    awacs_f: E3F, fra_e90_awacs: E3F, fra_e00_awacs: E3F
  };
  function reg(key) {
    UNIT_MODELS[key] = {
      len: ROWS[key].len,
      build: function (THREE, M, C) { return HeroE3.build(THREE, M, C, ROWS[key]); }
    };
  }
  for (var k in ROWS) reg(k);
})();
