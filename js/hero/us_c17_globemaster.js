/* ============ us_c17_globemaster.js -- BOEING C-17A GLOBEMASTER III (HERO MODEL) ============

   The four-jet strategic airlifter, for the rows that fly it:
     nato_e90_c17      "C-17 Globemaster III", Boeing C-17A (USAF, from 1995,
                       role stratlift): US star-and-bar.
     gbr_e00_airlift   "C-17 Globemaster III", Boeing C-17A (RAF, from 2001):
                       RAF roundel. Until now it had no model of its own and
                       borrowed a stand-in.
   The RAF and USAF aircraft are the same airframe in the same overall grey,
   so one builder serves both; a row whose key starts "gbr_" wears the RAF
   roundel, any other row the US star-and-bar (the list at the foot of the
   file).

   Published figures: length 53.04 m (174 ft), span 51.75 m (169 ft 10 in) over
   the winglets, height 16.79 m (55 ft 1 in) to the top of the fin, wing area
   353 m2 (3,800 sq ft); four Pratt & Whitney F117-PW-100 turbofans.

   Drawing: Wikimedia Commons "McDonnell Douglas C-17A Globemaster III 3-view
     line drawing.png" (public domain; the dimensioned three-view of the
     airport-planning kind), read by a pixel scan at its own scale (12.86 px to
     the metre on all three views: 681 px for the 53.1 m length in plan, 666 px
     for the 51.8 m span in the front view). Every station below is s metres
     aft of the nose tip and h metres above the ground:
       fuselage  6.8 m wide from s 8.8 to 36; crown 6.84 m over the cockpit
                 rising to 7.5-7.6 m under the fin; belly 0.6 m, flat in side
                 view from s 6 to 26, then swept up to the tail cone at s 48.3,
                 h 6.4 (the ramp and door underneath); nose tip at h 3.4
       wing      leading edge 29.9 deg back (s 15.3 at 5.3 m out, s 26.2 at
                 24.2 m out), trailing edge 11.9 deg back (25.0 -> 29.0), tip
                 chord 2.5 m: 357 m2 against the published 353; mean plane
                 6.05 m up at the fuselage side falling 4.2 deg to 4.45 m at
                 the tip (the front view: tip underside 4.3 m, the drawing's
                 "dry 13 ft 10 in"); the winglets 2.55 m tall, canted out 15
                 deg (the drawing's "15 DEG" and "8 ft 10 in")
       engines   inlet lips 10.6 m and 14.6 m aft of the nose, 7.6 m and 14.3 m
                 out (the drawing's figures); nacelles 2.78 m across, centres
                 3.9 m and 3.7 m up (front view)
       tail      fin leading edge 41 deg, trailing edge 43 deg, root 36.5-44.6;
                 tailplane 19.9 m across at h 15.95, leading edge 31 deg,
                 trailing edge 12.7 deg, tip chord 2.2 m, 3 deg anhedral; the
                 fin-top fairing runs on to the 53.0 m overall length and is
                 the 16.8 m top
       gear      nose wheels 3.4 m aft of the nose; main axles at s 20.9 and
                 23.3, three wheels abreast on each, 2.4-5.2 m out (the front
                 view; the published 33 ft 8 in track is over the outer tyres)
       sponsons  9.2 m across (front view), from s 12 to 29 (plan and side)
     and "McDonnell Douglas C-17 Globemaster III plan view silhouette
     drawing.jpg" (Commons, public domain), scanned at 18.54 px to the metre,
     for the wing planform, the four flap-track fairings a side (5.9, 9.65,
     12.4 and 16.1 m out, standing behind the trailing edge) and the sponson
     bulges ahead of and behind the wing.
   Photographs (Wikimedia Commons):
     "McDD C-17A Globemaster III 01 (8353417869).jpg" (NATO SAC aircraft on
        the ground, starboard side): the deep body, the sponsons, the tall
        nacelles close under the leading edge, the fin-top fairing, the paint
     "C-17 aircraft over over the Blue Ridge Mountains 2005.jpg" (head on):
        the anhedral, the winglets, the T-tail, the round body with the
        sponsons bulging low
     "C17 Transport Aircraft Taking Off from RAF Brize Norton MOD
        45156519.jpg" (RAF ZZ178): the RAF finish and its roundel, a full-
        colour red, white and blue roundel on the rear fuselage side behind
        the sponson; the three-abreast main wheels
     "8th Airlift Squadron C-17A Globemaster III 90-0535.jpg" (from below):
        the USAF star-and-bar in a darker grey on the rear fuselage side behind
        the wing, the flap-track fairings, the pylons
     "Boeing C-17 Globemaster III departs RIAT Fairford on 17July2017 arp.jpg"
        and "RAAF Boeing C-17A Globemaster III TSV Zhu.jpg" (from below): the
        flap-track fairings, the ramp and door outline under the upswept tail
     "C-17 test sortie.jpg" (from above, ahead): the top of the wing and body
   Paint: one grey overall, sampled off the photographs at about #6a747c
     (lit side) and taken to 0.9 for the renderer's tone curve: #5f686f.

   RECOGNITION (what must read at RTS zoom, and where each shows):
     1. high swept wing on the roof, 4.2 deg anhedral, swept winglets
        (drawing, front view; Blue Ridge photograph)       -> addWing, addWinglets
     2. four big F117 nacelles slung well ahead of the leading edge on short
        pylons, with the light inlet lip and the thrust-reverser cowl seams
        (drawing; McDD and RAF photographs)               -> addNacelle, nacelle strip
     3. T-tail: swept fin, tailplane with anhedral on a long fin-top fairing
        (drawing; McDD photograph)                        -> addFin, addTailplane, addBullet
     4. deep 6.8 m body with a flat belly line in profile (drawing side view)
                                                         -> addFuselage (FUS)
     5. main-gear sponsons bulging low on each side, 9.2 m across (drawing
        front view and plan; McDD photograph)            -> addSponsons
     6. cockpit glazing: the two big windscreens either side of the centre
        post, the eyebrows above them and the long side pane a side, in a band
        4.7-5.6 m up (drawing front and side views; RAF photograph)
                                                         -> addGlass
     7. upswept rear fuselage with the ramp and the cargo door outlined
        underneath (drawing side view; RIAT photograph)   -> FUS rows 26-48, paint
     8. dorsal refuelling receptacle on the crown behind the flight deck (the
        drawing's front view shows its opening)           -> addReceptacle
     9. externally blown flap fairings, four a wing, standing behind the
        trailing edge (silhouette plan; RIAT and 8 AS photographs)
                                                         -> addFlapFairings
    10. three-abreast main wheels on two axles a side, twin nose wheels
        (drawing front view; RAF photograph)              -> addGear
   NOT CONFIRMED and so not drawn: the wing-surface insignia (none can be
     seen in the photographs used), the fin flash and fin flag, the titles,
     serials and unit marks (never drawn), the formation-light strips, the
     exact receptacle outline (a plain dark slot), the antenna fit (three
     blades only, where the side photograph shows bumps on the roof).
   Team colour (exactly C.team, modest): the upper skin of the outer 1.8 m of
     each wing and the fin-top fairing.
   Model space: +X nose, +Y port, +Z up, metres. Merged into one mesh per
     material (skin, team, glass, ink, hot); the gear is its own named group
     of two (metal, tyre), the lowest opaque part.
   ========================================================================= */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroC17 = (function () {
  "use strict";

  var V = null;                         /* THREE, set by build()               */
  var D2R = Math.PI / 180, PI = Math.PI;
  var LEN = 53.0;                       /* nose tip to the fin-top fairing end */
  var XN = LEN / 2, ZG = -3.9;          /* the ground is 3.9 m below the origin */
  function X(s) { return XN - s; }
  function Z(h) { return h + ZG; }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
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
  /* piecewise-linear look-up, for tables with corners */
  function lin(rows, s) {
    var n = rows.length, i, k, out = [];
    if (s <= rows[0][0]) return rows[0].slice(1);
    if (s >= rows[n - 1][0]) return rows[n - 1].slice(1);
    for (i = 0; rows[i + 1][0] < s; i++);
    var t = (s - rows[i][0]) / (rows[i + 1][0] - rows[i][0]);
    for (k = 1; k < rows[i].length; k++) out.push(rows[i][k] + (rows[i + 1][k] - rows[i][k]) * t);
    return out;
  }

  /* ============================================================ shells ==
     Every skin part is a ring loft. A triangle is wound to face away from the
     inside of its ring pair, so no part depends on how a table was written;
     normals are smoothed over the shared vertices, end caps keep their own
     vertices and so their edge. emit() hands each category to a list. */
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
    for (i = 0; i < n; i++) this.tri(ic, ids[i], ids[(i + 1) % n], cat === undefined ? 2 : cat, od);
  };
  Shell.prototype.loft = function (rings, catOf, capA, capB) {
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
        var cat = catOf ? catOf(i, r) : 0;
        this.tri(idx[r][i], idx[r][j], idx[r + 1][j], cat, od);
        this.tri(idx[r][i], idx[r + 1][j], idx[r + 1][i], cat, od);
      }
    }
    /* a lone ring is a disc facing forward (+X): a fan face, a nozzle's inside */
    var refA = R > 1 ? cent[1] : [cent[0][0] - 1, cent[0][1], cent[0][2]];
    if (capA) this.fan(rings[0], cent[0], refA, capA === true ? 2 : capA);
    if (capB && R > 1) this.fan(rings[R - 1], cent[R - 1], cent[R - 2], capB === true ? 2 : capB);
  };
  /* smooth the normals and hand each category to its list (map: cat -> key) */
  Shell.prototype.emit = function (map, uvf) {
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
      if (!pos.length || !map[c]) continue;
      var g = new V.BufferGeometry();
      g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
      g.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
      if (uvf && map[c] === "skin") uvf(g);
      put(map[c], g);
    }
  };

  var K = null;                          /* the lists, one per material        */
  function put(key, g) { (K[key] || (K[key] = [])).push(g); }
  var SKIN = { 0: "skin", 1: "skin", 2: "skin" };

  /* ========================================================= airfoil lofts
     frame "w": sections across the span (a = y), thickness up and down;
     frame "f": sections up a fin or a pylon (a = h), thickness across.
     s is the leading edge's station, c the chord, t the thickness ratio, o
     the height (w) or the lateral offset (f) of the section's mean line. */
  function foilHalf(t, c, u) {
    return t * c * (1.4845 * Math.sqrt(u) - 0.63 * u - 1.758 * u * u + 1.4215 * u * u * u - 0.518 * u * u * u * u);
  }
  function foilRing(sec, frame, KC) {
    var up = [], lo = [], j, u, th, ring = [];
    for (j = 0; j <= KC; j++) {
      u = (1 - Math.cos(Math.PI * j / KC)) / 2;
      th = Math.max(foilHalf(sec.t, sec.c, u), j === KC ? 0.004 : 0);
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
  function foil(secs, frame, map, KC, upperCat) {
    var rings = [], i, sh = new Shell(), kc = KC || 10;
    for (i = 0; i < secs.length; i++) rings.push(foilRing(secs[i], frame, kc));
    sh.loft(rings, function (i) { return i < kc ? 0 : (upperCat === undefined ? 1 : upperCat); }, true, true);
    sh.emit(map, projUV);
  }

  /* ======================================================== the fuselage ==
     Rows: s, half-width, crown h, belly h, the lower half's superellipse
     exponent (below 1 squares the lower corners: the flat ramp underside).
     Read off the three-view (see the header). */
  var FUS = [
    [0.00, 0.05, 3.44, 3.36, 1.00],
    [0.04, 0.36, 3.70, 3.10, 1.00],
    [0.12, 0.58, 3.90, 2.92, 1.00],
    [0.30, 0.78, 4.12, 2.70, 1.00],
    [0.70, 0.98, 4.48, 2.36, 0.98],
    [1.30, 1.27, 4.98, 1.98, 0.96],
    [1.95, 1.52, 5.45, 1.64, 0.94],
    [2.60, 1.73, 5.86, 1.30, 0.92],
    [3.20, 1.99, 6.13, 1.04, 0.90],
    [3.80, 2.22, 6.40, 0.92, 0.88],
    [4.40, 2.45, 6.56, 0.83, 0.87],
    [5.06, 2.69, 6.69, 0.73, 0.86],
    [5.70, 2.90, 6.78, 0.64, 0.85],
    [6.30, 3.04, 6.83, 0.60, 0.85],
    [6.90, 3.21, 6.84, 0.60, 0.85],
    [7.50, 3.33, 6.84, 0.60, 0.85],
    [8.20, 3.37, 6.84, 0.60, 0.85],
    [8.80, 3.40, 6.84, 0.60, 0.85],
    [17.0, 3.40, 6.86, 0.60, 0.85],
    [22.0, 3.40, 6.90, 0.60, 0.85],
    [25.5, 3.40, 6.93, 0.62, 0.84],
    [26.6, 3.40, 6.97, 0.68, 0.82],
    [27.6, 3.40, 7.03, 0.85, 0.79],
    [28.9, 3.40, 7.11, 1.08, 0.75],
    [30.2, 3.40, 7.19, 1.24, 0.72],
    [31.4, 3.40, 7.30, 1.48, 0.70],
    [32.6, 3.40, 7.38, 1.75, 0.70],
    [33.9, 3.40, 7.46, 2.02, 0.70],
    [35.1, 3.38, 7.52, 2.29, 0.70],
    [36.4, 3.32, 7.55, 2.60, 0.72],
    [37.6, 3.22, 7.58, 2.99, 0.74],
    [38.9, 3.12, 7.60, 3.34, 0.76],
    [40.1, 2.95, 7.60, 3.73, 0.78],
    [41.3, 2.78, 7.60, 4.12, 0.80],
    [42.5, 2.48, 7.60, 4.47, 0.84],
    [43.7, 2.06, 7.60, 4.80, 0.88],
    [44.6, 1.72, 7.56, 5.12, 0.90],
    [45.4, 1.42, 7.42, 5.40, 0.92],
    [46.3, 1.08, 7.10, 5.62, 0.95],
    [47.3, 0.72, 6.84, 5.90, 1.00],
    [48.0, 0.42, 6.66, 6.08, 1.00],
    [48.35, 0.10, 6.46, 6.30, 1.00]
  ];
  var FST = [0, 0.04, 0.12, 0.3, 0.7, 1.0, 1.3, 1.62, 1.95, 2.3, 2.6, 3.2, 3.8, 4.4,
             5.06, 5.7, 6.3, 6.9, 7.5, 8.8, 13.0, 17.5, 22.0, 25.5, 26.6, 27.6, 28.9, 30.2,
             31.4, 32.6, 33.9, 35.1, 36.4, 37.6, 38.9, 40.1, 41.3, 42.5, 43.7, 44.6, 45.4, 46.3,
             47.3, 48.0, 48.35];
  var FN = 24;
  function fusRow(s) { return tab(FUS, s); }
  function crown(s) { return fusRow(s)[1]; }
  function belly(s) { return fusRow(s)[2]; }
  /* a = degrees from the roof, positive toward port; push moves it outward */
  function fusPt(s, a, push) {
    var r = fusRow(s), hw = r[0], ht = r[1], hb = r[2], eb = r[3];
    var hm = hb + (ht - hb) * 0.54;
    var ca = Math.cos(a * D2R), sa = Math.sin(a * D2R);
    var e = ca >= 0 ? 0.92 : eb;
    var y = hw * sgp(sa, e);
    var h = ca >= 0 ? hm + (ht - hm) * Math.pow(ca, e) : hm - (hm - hb) * Math.pow(-ca, e);
    if (push) {
      var dh = h - hm, L = Math.sqrt(y * y + dh * dh) || 1;
      y += push * y / L; h += push * dh / L;
    }
    return [X(s), y, Z(h)];
  }
  function addFuselage() {
    var rings = [], r, i, sh = new Shell();
    for (r = 0; r < FST.length; r++) {
      var ring = [];
      for (i = 0; i < FN; i++) ring.push(fusPt(FST[r], i * 360 / FN, 0));
      rings.push(ring);
    }
    sh.loft(rings, null, true, true);
    sh.emit(SKIN, projUV);
  }

  /* the low fairing over the wing's leading-edge root (the hump in the side
     view, 7.2 m at s 14.3, gone by s 21) */
  function addHump() {
    var ROWS = [[12.0, 0.4, 0.00], [13.0, 1.5, 0.22], [14.3, 2.1, 0.40], [16.0, 2.2, 0.34],
                [18.0, 2.2, 0.20], [20.0, 2.0, 0.07], [21.5, 1.6, 0.00]];
    var rings = [], k, i, sh = new Shell(), n = 9;
    for (k = 0; k <= 8; k++) {
      var s = 12.0 + 9.5 * k / 8, r = lin(ROWS, s), w = r[0], b = r[1], c0 = crown(s) - 0.12;
      var ring = [];
      for (i = 0; i < n; i++) {
        var a = PI * i / (n - 1), yy = -w * Math.cos(a), f = Math.sin(a);
        ring.push([X(s), yy, Z(c0 + (b + 0.12) * Math.pow(f, 0.6))]);
      }
      for (i = n - 2; i >= 1; i--) {
        var a2 = PI * i / (n - 1);
        ring.push([X(s), -w * Math.cos(a2) * 0.9, Z(c0 - 0.25)]);
      }
      rings.push(ring);
    }
    sh.loft(rings, null, true, true);
    sh.emit(SKIN, projUV);
  }

  /* ============================================================ sponsons ==
     The main-gear pods low on each side: rows s, outer edge (m from the
     centreline), bottom h, top h where it fairs into the body side. Their
     inner half is buried in the fuselage. */
  var SPON = [
    [12.0, 3.15, 1.70, 2.50],
    [12.8, 3.62, 1.12, 3.15],
    [13.8, 4.02, 0.88, 3.40],
    [15.0, 4.36, 0.78, 3.52],
    [16.5, 4.56, 0.75, 3.56],
    [18.0, 4.60, 0.75, 3.56],
    [24.0, 4.60, 0.75, 3.56],
    [25.2, 4.45, 0.78, 3.50],
    [26.0, 4.17, 0.85, 3.30],
    [27.0, 3.78, 0.95, 3.00],
    [28.0, 3.46, 1.10, 2.60],
    [29.2, 3.18, 1.30, 2.10]
  ];
  var SPST = [12.0, 12.4, 12.8, 13.3, 13.8, 14.6, 15.6, 16.8, 24.0, 25.2, 26.0, 27.0, 28.0, 29.2];
  function addSponsons() {
    var sd, k, i, n = 14;
    for (sd = -1; sd <= 1; sd += 2) {
      var rings = [], sh = new Shell();
      for (k = 0; k < SPST.length; k++) {
        var s = SPST[k], r = tab(SPON, s), yin = 1.7, yo = r[0], yc = (yin + yo) / 2, hy = (yo - yin) / 2;
        var hc = (r[1] + r[2]) / 2, hh = (r[2] - r[1]) / 2, ring = [];
        for (i = 0; i < n; i++) {
          var a = i * 2 * PI / n, ca = Math.cos(a), sa = Math.sin(a);
          /* a squarish ellipse, fuller below (the pod's flat underside) */
          var e = ca < 0 ? 0.62 : 0.9;
          ring.push([X(s), sd * (yc + hy * sgp(sa, 0.8)), Z(hc + hh * sgp(ca, e))]);
        }
        rings.push(ring);
      }
      sh.loft(rings, null, true, true);
      sh.emit(SKIN, projUV);
    }
  }

  /* ============================================================== wing ==
     High, swept, anhedral (see the header). Inside the body every section is
     the root section, so the wing box runs straight through under the roof. */
  var YR = 3.4, YT = 25.3, YTEAM = 23.5;
  function wingLE(a) { return 12.25 + 0.574 * Math.max(a, YR); }
  function wingTE(a) { return 23.90 + 0.211 * Math.max(a, YR); }
  function wingO(a) { return 6.05 - 0.073 * (Math.max(a, YR) - YR); }
  function wingSec(y) {
    var a = Math.abs(y), ae = Math.max(a, YR), le = wingLE(ae);
    return { a: y, s: le, c: wingTE(ae) - le, t: 0.135 - 0.030 * (ae - YR) / (YT - YR), o: wingO(ae) };
  }
  /* the height of the upper or lower skin at (s, y) */
  function wingSurf(s, y, lower) {
    var sec = wingSec(y), u = clamp((s - sec.s) / sec.c, 0, 1), th = foilHalf(sec.t, sec.c, u);
    return lower ? sec.o - th : sec.o + th;
  }
  function addWing() {
    var ys = [-YTEAM, -21.0, -18.5, -16.1, -14.3, -12.4, -9.65, -7.6, -5.9, -YR, 0, YR, 5.9, 7.6,
              9.65, 12.4, 14.3, 16.1, 18.5, 21.0, YTEAM], i, secs = [];
    for (i = 0; i < ys.length; i++) secs.push(wingSec(ys[i]));
    foil(secs, "w", SKIN, 10);
    /* the outer 1.8 m: the team's colour on the upper skin only */
    foil([wingSec(YTEAM), wingSec(YT)], "w", { 0: "team", 1: "skin", 2: "skin" }, 10);
    foil([wingSec(-YT), wingSec(-YTEAM)], "w", { 0: "team", 1: "skin", 2: "skin" }, 10);
  }
  /* winglets: 2.55 m tall, canted out 15 deg, swept, on the tip section */
  function addWinglets() {
    var sd, k, n = 3;
    for (sd = -1; sd <= 1; sd += 2) {
      var rings = [], sh = new Shell();
      for (k = 0; k <= n; k++) {
        var v = k / n, hgt = -0.15 + 2.70 * v;
        var yo = 25.18 + hgt * Math.sin(15 * D2R), h = wingO(YT) + hgt * Math.cos(15 * D2R);
        var le = 26.95 + 1.80 * v, te = 29.28 + 0.27 * v, c = te - le, t = 0.085;
        var ring = [], j, KC = 6;
        var up = [], lo = [];
        for (j = 0; j <= KC; j++) {
          var u = (1 - Math.cos(PI * j / KC)) / 2, th = Math.max(foilHalf(t, c, u), 0.003);
          /* thickness across the winglet's own plane (tilted 15 deg) */
          var ny = Math.cos(15 * D2R), nz = -Math.sin(15 * D2R);
          up.push([X(le + u * c), sd * (yo + th * ny), Z(h + th * nz)]);
          lo.push([X(le + u * c), sd * (yo - th * ny), Z(h - th * nz)]);
        }
        for (j = 0; j <= KC; j++) ring.push(up[j]);
        for (j = KC - 1; j >= 1; j--) ring.push(lo[j]);
        rings.push(ring);
      }
      sh.loft(rings, null, true, true);
      sh.emit(SKIN, projUV);
    }
  }

  /* ============================================== flap-track fairings ==
     The externally blown flaps' hinge fairings: four canoes a wing under the
     lower skin, from mid-chord to 1.3 m behind the trailing edge (the plan
     silhouette's spikes; the photographs from below). */
  var FLAPY = [3.95, 5.9, 9.65, 12.4, 16.1];
  function addFlapFairings() {
    var sd, f, k, i, n = 8;
    var PROF = [[0.00, 0.10, 0.10], [0.15, 0.70, 0.62], [0.45, 1.00, 1.00], [0.80, 0.80, 0.85],
                [1.00, 0.12, 0.15]];
    for (sd = -1; sd <= 1; sd += 2) {
      for (f = 0; f < FLAPY.length; f++) {
        var y = FLAPY[f], sec = wingSec(y), s0 = sec.s + 0.36 * sec.c, s1 = sec.s + sec.c + 1.6;
        var hw = 0.27 - 0.01 * f, hh = 0.62 - 0.04 * f, rings = [], sh = new Shell();
        for (k = 0; k <= 5; k++) {
          var u = [0, 0.15, 0.45, 0.8, 0.93, 1][k], s = s0 + (s1 - s0) * u, pr = lin(PROF, u), ring = [];
          var top = wingSurf(Math.min(s, sec.s + sec.c), y, true) + 0.05;
          for (i = 0; i < n; i++) {
            /* flat against the wing on top, rounded below */
            var a = i * 2 * PI / n, ca = Math.cos(a), sa = Math.sin(a);
            var hz = ca >= 0 ? top - 0.5 * hh * pr[0] * (1 - ca) : top - hh * pr[0] * (0.5 - 0.5 * ca);
            ring.push([X(s), sd * (y + hw * pr[1] * sa), Z(hz)]);
          }
          rings.push(ring);
        }
        sh.loft(rings, null, true, true);
        sh.emit(SKIN, projUV);
      }
    }
  }

  /* ============================================================== tail ==
     Fin: leading edge 41 deg, trailing edge 43 deg (side view); tailplane
     19.9 m across with 3 deg anhedral on the fin-top fairing. */
  function finLE(h) { return 37.6 + (h - 8.24) / 1.155; }
  function finTE(h) { return 45.0 + (h - 7.6) * 0.94; }
  function finSec(h) {
    var le = finLE(h);
    return { a: h, s: le, c: finTE(h) - le, t: 0.105 - 0.015 * (h - 7.0) / 9.0, o: 0 };
  }
  function addFin() {
    var hs = [7.0, 9.4, 12.2, 14.8, 16.1], i, secs = [];
    for (i = 0; i < hs.length; i++) secs.push(finSec(hs[i]));
    foil(secs, "f", SKIN, 10);
  }
  function tpSec(y) {
    var a = Math.abs(y);
    return { a: y, s: 44.37 + 0.607 * a, c: (50.38 + 0.225 * a) - (44.37 + 0.607 * a),
             t: 0.10, o: 15.95 - 0.052 * a };
  }
  function addTailplane() {
    var ys = [-9.95, -5.0, -1.6, 0, 1.6, 5.0, 9.95], i, secs = [];
    for (i = 0; i < ys.length; i++) secs.push(tpSec(ys[i]));
    foil(secs, "w", SKIN, 10);
  }
  /* the fin-top fairing: a body of revolution, 0.55 m half-width, its top the
     published 16.8 m height, its tail the 53.0 m overall length */
  function addBullet() {
    var ROWS = [[0.00, 0.04], [0.35, 0.26], [1.10, 0.46], [2.40, 0.55], [6.20, 0.55], [7.80, 0.42],
                [8.90, 0.18], [9.40, 0.03]];
    var s0 = 43.6, hc = 16.18, rings = [], r, i, n = 12, sh = new Shell();
    for (r = 0; r < ROWS.length; r++) {
      var ring = [], rr = ROWS[r][1];
      for (i = 0; i < n; i++) {
        var a = i * 2 * PI / n;
        ring.push([X(s0 + ROWS[r][0]), rr * Math.sin(a), Z(hc + rr * 1.13 * Math.cos(a))]);
      }
      rings.push(ring);
    }
    sh.loft(rings, null, true, true);
    sh.emit({ 0: "team", 2: "team" });
  }

  /* ============================================================ nacelles ==
     F117: a fat cowl, 2.78 m across, the lip 1.2 m round, the translating
     reverser cowl behind the fan cowl, then the nozzle and plug. Rows: d
     metres behind the lip, radius. The cowl takes its paint from a strip of
     its own (the lip, the reverser seams), mapped along its length. */
  var COWL = [[0.42, 1.10], [0.00, 1.20], [0.07, 1.31], [0.45, 1.39], [2.70, 1.39], [4.10, 1.29],
              [5.05, 1.12]];
  var NOZ = [[4.95, 1.10], [5.05, 1.12], [5.55, 1.00], [5.50, 0.92]];
  var PLUG = [[5.10, 0.70], [5.55, 0.62], [6.10, 0.40], [6.60, 0.06]];
  var NCX = 776, NCPX = 36, NCROW = 40;          /* the cowl strip in the sheet */
  function nacelleUV(xLip) {
    return function (g) {
      var p = g.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), k;
      for (k = 0; k < p.length / 3; k++) {
        var d = clamp(xLip - p[k * 3], 0, 6.6);
        uv[k * 2] = (NCX + d * NCPX) / TW; uv[k * 2 + 1] = 1 - NCROW / TH;
      }
      g.setAttribute("uv", new V.BufferAttribute(uv, 2));
      return g;
    };
  }
  function bodyOfRev(xLip, yc, hc, rows, n, map, uvf, capA, capB) {
    var rings = [], r, i, sh = new Shell();
    for (r = 0; r < rows.length; r++) {
      var ring = [];
      for (i = 0; i < n; i++) {
        var a = i * 2 * PI / n;
        ring.push([xLip - rows[r][0], yc + rows[r][1] * Math.sin(a), Z(hc) + rows[r][1] * Math.cos(a)]);
      }
      rings.push(ring);
    }
    sh.loft(rings, null, capA, capB);
    sh.emit(map, uvf);
  }
  var ENG = [[10.6, 7.6, 3.90], [14.6, 14.3, 3.70]];
  function addNacelles() {
    var e, sd;
    for (e = 0; e < ENG.length; e++) {
      for (sd = -1; sd <= 1; sd += 2) {
        var s0 = ENG[e][0], y = sd * ENG[e][1], hc = ENG[e][2], xl = X(s0);
        bodyOfRev(xl, y, hc, COWL, 16, SKIN, nacelleUV(xl), false, false);
        /* the fan face, dark, and its spinner */
        bodyOfRev(xl, y, hc, [[0.42, 1.10]], 16, { 2: "ink" }, null, true, false);
        bodyOfRev(xl, y, hc, [[0.38, 0.02], [0.52, 0.30], [0.80, 0.42]], 10, { 0: "hot", 2: "hot" }, null, false, false);
        bodyOfRev(xl, y, hc, NOZ, 16, { 0: "hot", 2: "hot" }, null, false, false);
        bodyOfRev(xl, y, hc, [[5.22, 0.92]], 14, { 2: "ink" }, null, true, false);
        bodyOfRev(xl, y, hc, PLUG, 10, { 0: "hot", 2: "hot" }, null, false, false);
        addPylon(s0, y, hc);
      }
    }
  }
  /* the pylon: from the cowl's top, sloping back into the leading edge and
     on under the wing to about 40 per cent of the chord */
  function addPylon(s0, y, hc) {
    var a = Math.abs(y), sec = wingSec(a);
    /* the cowl's top is about level with the wing's underside (front view),
       so the pylon is a fairing on the cowl whose front edge slopes up from
       the cowl into the leading edge (the side photograph); its top section
       lies along the wing's mean line, inside the wing */
    var bot = { a: hc + 1.10, s: s0 + 1.0, c: 4.3, t: 0.12, o: y };
    var top = { a: sec.o, s: sec.s, c: 0.38 * sec.c, t: 0.14, o: y };
    foil([bot, top], "f", SKIN, 8);
  }

  /* ============================================================== glass ==
     Panes laid on the nose skin, 6 cm proud, placed by height as the drawing
     gives them: the two big windscreens either side of the centre post (h
     4.95-5.55), the eyebrows above them, and the long side pane a side (s
     2.9-4.4, h 4.7-5.55; the side view). */
  /* the point at angle a (degrees from the roof) whose height is h */
  function ptAH(a, h, push) {
    var lo = 0.2, hi = 8.0, k;
    for (k = 0; k < 30; k++) {
      var mid = (lo + hi) / 2;
      if (fusPt(mid, a, 0)[2] < Z(h)) lo = mid; else hi = mid;
    }
    return fusPt((lo + hi) / 2, a, push);
  }
  /* the point at station s on side sd whose height is h */
  function ptSH(s, h, sd, push) {
    var lo = 0, hi = 180, k;
    for (k = 0; k < 30; k++) {
      var mid = (lo + hi) / 2;
      if (fusPt(s, mid, 0)[2] > Z(h)) lo = mid; else hi = mid;
    }
    return fusPt(s, sd * (lo + hi) / 2, push);
  }
  function pane(sh, f, nu, nv) {
    var i, j, ids = [];
    for (i = 0; i <= nu; i++) {
      var row = [];
      for (j = 0; j <= nv; j++) row.push(sh.vert(f(i / nu, j / nv)));
      ids.push(row);
    }
    for (i = 0; i < nu; i++) {
      for (j = 0; j < nv; j++) {
        var A = sh.P[ids[i][j]], C = sh.P[ids[i + 1][j + 1]];
        var od = [(A[0] + C[0]) / 2 - X(3.0), (A[1] + C[1]) / 2, (A[2] + C[2]) / 2 - Z(3.6)];
        sh.tri(ids[i][j], ids[i][j + 1], ids[i + 1][j + 1], 0, od);
        sh.tri(ids[i][j], ids[i + 1][j + 1], ids[i + 1][j], 0, od);
      }
    }
  }
  function addGlass() {
    var sh = new Shell(), PP = 0.06;
    [-1, 1].forEach(function (sd) {
      pane(sh, function (u, v) { return ptAH(sd * (3 + 37 * u), 4.95 + 0.60 * v, PP); }, 3, 2);   /* windscreen */
      pane(sh, function (u, v) { return ptAH(sd * (14 + 17 * u), 5.74 + 0.26 * v, PP); }, 2, 1);  /* eyebrow    */
      pane(sh, function (u, v) { return ptSH(2.95 + 1.40 * u, 4.72 + 0.80 * v, sd, PP); }, 2, 1); /* side pane  */
    });
    sh.emit({ 0: "glass" });
  }

  /* the dorsal receptacle: a dark slot in the crown behind the flight deck */
  function addReceptacle() {
    var sh = new Shell(), i, j, ids = [];
    for (i = 0; i <= 2; i++) {
      var row = [];
      for (j = 0; j <= 2; j++) row.push(sh.vert(fusPt(3.95 + 1.15 * i / 2, -9 + 9 * j, 0.025)));
      ids.push(row);
    }
    for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) {
      var A = sh.P[ids[i][j]];
      var od = [0, 0, 1];
      sh.tri(ids[i][j], ids[i][j + 1], ids[i + 1][j + 1], 0, od);
      sh.tri(ids[i][j], ids[i + 1][j + 1], ids[i + 1][j], 0, od);
    }
    sh.emit({ 0: "ink" });
  }

  /* three blade antennas on the roof and one under the nose */
  function addAntennas() {
    [[8.6, 1], [12.0, 1], [30.5, 1], [7.2, -1]].forEach(function (q) {
      var s = q[0], up = q[1] > 0, h0 = up ? crown(s) - 0.05 : belly(s) + 0.05;
      var h1 = up ? h0 + 0.42 : h0 - 0.35;
      foil([{ a: h0, s: s, c: 0.55, t: 0.12, o: 0 }, { a: h1, s: s + 0.22, c: 0.28, t: 0.12, o: 0 }],
           "f", SKIN, 4);
    });
  }

  /* ============================================================== gear ==
     Nose: one leg 3.4 m aft of the nose, twin wheels. Main: two axles a side
     (s 20.9 and 23.3) under the sponsons, three wheels abreast on each, 2.4-
     5.2 m out (the drawing's front view). Every tyre stands on h = 0. */
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
  function addGear(G) {
    var sd, ax, k;
    /* nose */
    G.metal.push(rod([X(3.4), 0, Z(1.55)], [X(3.4), 0, Z(0.51)], 0.10, 8));
    G.metal.push(rod([X(2.5), 0, Z(1.25)], [X(3.35), 0, Z(0.85)], 0.05, 6));
    G.metal.push(rod([X(3.4), -0.42, Z(0.51)], [X(3.4), 0.42, Z(0.51)], 0.06, 6));
    for (k = -1; k <= 1; k += 2) {
      G.tyre.push(wheelG(0.51, 0.40, X(3.4), k * 0.42, Z(0.51), 14));
      G.metal.push(wheelG(0.26, 0.42, X(3.4), k * 0.42, Z(0.51), 7));
    }
    /* main */
    for (sd = -1; sd <= 1; sd += 2) {
      [20.9, 23.3].forEach(function (s) {
        G.metal.push(rod([X(s), sd * 3.76, Z(1.70)], [X(s), sd * 3.76, Z(0.72)], 0.16, 8));
        G.metal.push(boxG(0.30, 2.62, 0.24, X(s), sd * 3.76, Z(0.635)));
        [2.65, 3.76, 4.87].forEach(function (yw) {
          G.tyre.push(wheelG(0.635, 0.53, X(s), sd * yw, Z(0.635), 14));
          G.metal.push(wheelG(0.34, 0.55, X(s), sd * yw, Z(0.635), 6));
        });
      });
    }
  }

  /* ============================================================= paint ==
     One sheet for the whole airframe: four plan views at 14 px to the metre
     (from above, from port, from starboard, from below), and a strip for the
     nacelle cowls. Every skin triangle takes its UVs by projection into the
     band its normal faces (projUV), so the panel lines, doors and insignia
     land where they are on the aeroplane, in metres. Cached per insignia. */
  var PXM = 14, TW = 1024, TH = 2048, XMIN = -26.8;
  var YMAX = 26.1, TOPH = 731, HTOP = 17.2, SIDEH = 241;
  var B_PORT = TOPH, B_STBD = TOPH + SIDEH, B_BOT = TOPH + 2 * SIDEH;
  function cu(x) { return clamp((x - XMIN) * PXM, 1, 760); }
  function rTop(y) { return clamp((YMAX - y) * PXM, 1, TOPH - 1); }
  function rBot(y) { return B_BOT + clamp((YMAX - y) * PXM, 1, TOPH - 1); }
  function rSide(z, stbd) { return (stbd ? B_STBD : B_PORT) + clamp((Z(HTOP) - z) * PXM, 1, SIDEH - 1); }

  var BASE = "#5f686f";                /* the photographs' grey, taken to 0.9  */
  var LINE = "rgba(30,36,41,0.55)";
  var SEAM = "rgba(30,36,41,0.32)";
  var _tex = {};

  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function trace(g, pts, col, lw) {
    var i;
    g.strokeStyle = col; g.lineWidth = lw;
    g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
    g.stroke();
  }
  function poly(g, pts, col) {
    var i;
    g.fillStyle = col; g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
    g.closePath(); g.fill();
  }
  function disc(g, u, v, r, col) {
    g.fillStyle = col; g.beginPath(); g.arc(u, v, r, 0, PI * 2); g.closePath(); g.fill();
  }
  /* national insignia, painted where the photographs show them */
  function insignia(g, u, v, r, uk) {
    var i, a;
    if (uk) {     /* RAF C-17: a full-colour roundel (the Brize Norton photograph) */
      disc(g, u, v, r, "rgba(36,56,104,0.95)");
      disc(g, u, v, r * 0.667, "rgba(214,216,216,0.95)");
      disc(g, u, v, r * 0.333, "rgba(160,36,42,0.95)");
      return;
    }
    /* USAF: the star-and-bar a darker grey than the skin (the 8 AS photograph) */
    var dk = "rgba(44,50,56,0.80)";
    disc(g, u, v, r, dk);
    g.fillStyle = dk;
    g.fillRect(u - r * 2.0, v - r * 0.33, r * 4.0, r * 0.66);
    g.fillStyle = "rgba(112,122,130,0.55)";
    g.beginPath();
    for (i = 0; i < 10; i++) {
      a = -PI / 2 + i * PI / 5;
      var rr = i % 2 ? r * 0.38 : r * 0.92;
      if (i === 0) g.moveTo(u + rr * Math.cos(a), v + rr * Math.sin(a));
      else g.lineTo(u + rr * Math.cos(a), v + rr * Math.sin(a));
    }
    g.closePath(); g.fill();
  }

  function paintSheet(uk) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(uk ? 1702 : 1701), i, k, sd, y, ys, sec;
    function tp(s, yy, bot) { return [cu(X(s)), bot ? rBot(yy) : rTop(yy)]; }
    function sp(s, h, stbd) { return [cu(X(s)), rSide(Z(h), stbd)]; }

    g.fillStyle = BASE; g.fillRect(0, 0, TW, TH);
    /* a faint mottle: one grey, weathered unevenly */
    for (k = 0; k < 110; k++) {
      disc(g, R() * 760, R() * B_BOT + R() * TOPH, 10 + R() * 34,
           R() < 0.5 ? "rgba(80,88,94,0.10)" : "rgba(120,128,134,0.08)");
    }

    /* ---- the wing, from above and below: slats, spoilers, flaps, ailerons */
    for (k = 0; k < 2; k++) {
      var bot = k === 1;
      for (sd = -1; sd <= 1; sd += 2) {
        ys = []; for (y = YR + 0.4; y <= YT - 0.05; y += 0.6) ys.push(y);
        ys.push(YT - 0.05);
        trace(g, ys.map(function (yy) { var q = wingSec(yy); return tp(q.s + 0.10 * q.c, sd * yy, bot); }), LINE, 1.2);
        trace(g, ys.filter(function (yy) { return yy < 19.6; }).map(function (yy) {
          var q = wingSec(yy); return tp(q.s + 0.76 * q.c, sd * yy, bot); }), LINE, 1.3);
        trace(g, ys.filter(function (yy) { return yy >= 19.6; }).map(function (yy) {
          var q = wingSec(yy); return tp(q.s + 0.74 * q.c, sd * yy, bot); }), LINE, 1.3);
        [YR + 0.4, 8.6, 13.6, 19.6, 24.6].forEach(function (yy) {
          var q = wingSec(yy);
          trace(g, [tp(q.s + 0.74 * q.c, sd * yy, bot), tp(q.s + q.c, sd * yy, bot)], LINE, 1.2);
        });
        if (!bot) {
          /* five spoiler panels ahead of the flaps */
          for (i = 0; i < 5; i++) {
            var y0 = 6.4 + i * 2.6, y1 = y0 + 2.4, q0 = wingSec(y0), q1 = wingSec(y1);
            trace(g, [tp(q0.s + 0.60 * q0.c, sd * y0, false), tp(q1.s + 0.60 * q1.c, sd * y1, false),
                      tp(q1.s + 0.74 * q1.c, sd * y1, false), tp(q0.s + 0.74 * q0.c, sd * y0, false),
                      tp(q0.s + 0.60 * q0.c, sd * y0, false)], SEAM, 1.0);
          }
          /* the front and rear spar lines, faint */
          trace(g, ys.map(function (yy) { var q = wingSec(yy); return tp(q.s + 0.18 * q.c, sd * yy, false); }), SEAM, 0.8);
        }
        /* tailplane: elevator hinge, measured off the plan (48.7 -> 51.6) */
        trace(g, [tp(48.72, sd * 1.07, bot), tp(51.60, sd * 9.47, bot)], LINE, 1.2);
        trace(g, [tp(49.90, sd * 4.80, bot), tp(51.75, sd * 4.80, bot)], SEAM, 1.0);
      }
    }

    /* ---- from above: the roof's seams and the receptacle surround ---- */
    for (sd = -1; sd <= 1; sd += 2) {
      trace(g, [tp(7.0, sd * 1.25, false), tp(44.0, sd * 1.25, false)], SEAM, 0.9);
    }
    g.strokeStyle = LINE; g.lineWidth = 1.2;
    g.strokeRect(cu(X(5.25)), rTop(0.55), 1.5 * PXM, 1.1 * PXM);
    for (i = 0; i < 9; i++) {                                 /* roof frames */
      var sf = 9.0 + i * 3.6;
      trace(g, [tp(sf, 1.25, false), tp(sf, -1.25, false)], SEAM, 0.8);
    }

    /* ---- the sides ---- */
    for (k = 0; k < 2; k++) {
      var st = k === 1;
      /* crew entry door (port only, the drawing's side view) */
      if (!st) trace(g, [sp(5.6, 1.70, st), sp(6.6, 1.70, st), sp(6.6, 3.20, st), sp(5.6, 3.20, st), sp(5.6, 1.70, st)], LINE, 1.3);
      /* a small window low on the nose, each side */
      g.fillStyle = "rgba(20,24,28,0.85)";
      var w0 = sp(3.15, 2.70, st);
      g.fillRect(w0[0] - 0.36 * PXM, w0[1], 0.36 * PXM, 0.34 * PXM);
      /* the paratroop door aft of the sponson, with its window */
      trace(g, [sp(25.7, 1.40, st), sp(27.4, 1.40, st), sp(27.4, 3.35, st), sp(25.7, 3.35, st), sp(25.7, 1.40, st)], LINE, 1.3);
      var w1 = sp(26.35, 2.95, st);
      g.fillRect(w1[0] - 0.40 * PXM, w1[1], 0.40 * PXM, 0.40 * PXM);
      /* the ramp's and the door's edges along the lower sides of the upswept
         tail, and the seam between them */
      ys = []; for (y = 29.3; y <= 44.6; y += 0.9) ys.push(y);
      trace(g, ys.map(function (s) { return sp(s, belly(s) + 0.42, st); }), LINE, 1.3);
      trace(g, [sp(35.1, belly(35.1) + 0.05, st), sp(35.1, belly(35.1) + 0.42, st)], LINE, 1.2);
      trace(g, [sp(29.3, belly(29.3) + 0.05, st), sp(29.3, belly(29.3) + 0.42, st)], LINE, 1.2);
      /* fuselage seams: a waist line and a few frames */
      trace(g, [sp(7.5, 4.6, st), sp(44.0, 4.6, st)], SEAM, 0.9);
      for (i = 0; i < 6; i++) {
        var fr = 30.0 + i * 2.6;
        trace(g, [sp(fr, belly(fr) + 0.5, st), sp(fr, crown(fr) - 0.3, st)], SEAM, 0.8);
      }
      /* the fin: the rudder hinge line and the split between its two halves */
      trace(g, [sp(42.4, 7.6, st), sp(49.0, 14.4, st)], LINE, 1.2);
      trace(g, [sp(42.4 + (10.9 - 7.6) * 0.97, 10.9, st), sp(finTE(10.9), 10.9, st)], LINE, 1.2);
      /* the national insignia, on the rear fuselage behind the sponson */
      var c0 = sp(uk ? 33.6 : 34.0, uk ? 4.2 : 4.7, st);
      insignia(g, c0[0], c0[1], (uk ? 0.68 : 0.80) * PXM, uk);
    }

    /* ---- from below: the ramp and the cargo door, gear doors, keel ---- */
    function B(s0, s1, a, b, col, lw) {
      trace(g, [tp(s0, a, true), tp(s1, a, true), tp(s1, b, true), tp(s0, b, true), tp(s0, a, true)], col || LINE, lw || 1.3);
    }
    B(29.3, 35.1, -2.45, 2.45, LINE, 1.6);                     /* the ramp          */
    trace(g, [tp(35.1, 2.45, true), tp(40.0, 2.10, true), tp(44.6, 1.40, true),
              tp(44.6, -1.40, true), tp(40.0, -2.10, true), tp(35.1, -2.45, true)], LINE, 1.6);   /* the door */
    for (i = 1; i < 4; i++) trace(g, [tp(29.3 + i * 1.45, 2.3, true), tp(29.3 + i * 1.45, -2.3, true)], SEAM, 0.9);
    B(2.55, 4.55, -0.55, 0.55);                                /* nose gear doors   */
    for (sd = -1; sd <= 1; sd += 2) {
      B(19.7, 24.5, sd * 2.25, sd * 4.30);                     /* main gear doors   */
      trace(g, [tp(13.5, sd * 3.95, true), tp(19.7, sd * 4.30, true)], SEAM, 0.9);
    }
    trace(g, [tp(6.5, 0, true), tp(28.8, 0, true)], SEAM, 0.9);

    /* ---- the nacelle strip: the lip, the fan cowl, the reverser's
       translating cowl and the aft cowl, as rings along the cowl ---- */
    function nb(d0, d1, col) { g.fillStyle = col; g.fillRect(NCX + d0 * NCPX, 0, (d1 - d0) * NCPX, 80); }
    nb(0, 6.6, BASE);
    nb(0, 0.30, "#8a9196");                                    /* the light inlet lip */
    nb(0.30, 0.36, "rgba(30,36,41,0.5)");
    nb(1.55, 1.60, "rgba(30,36,41,0.45)");
    nb(2.72, 2.80, "rgba(30,36,41,0.65)");                     /* reverser seams    */
    nb(3.02, 3.07, "rgba(30,36,41,0.45)");
    nb(4.30, 4.35, "rgba(30,36,41,0.45)");

    var tex = new V.CanvasTexture(cv);
    tex.wrapS = tex.wrapT = V.ClampToEdgeWrapping;
    tex.anisotropy = 4;
    if (V.sRGBEncoding !== undefined) tex.encoding = V.sRGBEncoding;   /* r148 */
    return tex;
  }
  function sheet(uk) {
    var k = uk ? "uk" : "us";
    if (_tex[k] !== undefined) return _tex[k];
    try { _tex[k] = paintSheet(uk); } catch (e) { _tex[k] = false; }
    return _tex[k];
  }

  /* projected UVs: each triangle into the band its normal faces. Faces that
     look fore or aft would collapse to a line under an x projection, so they
     are laid out along x plus the cross coordinate. */
  function projUV(geo) {
    var p = geo.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var band = nz > 0.5 ? 0 : nz < -0.5 ? 3 : (ny >= 0 ? 1 : 2);
      var endOn = Math.abs(nx) > 0.85;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], yy = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, Rr;
        if (band === 0) { U = cu(endOn ? x + yy * 0.3 : x); Rr = rTop(yy); }
        else if (band === 3) { U = cu(endOn ? x + yy * 0.3 : x); Rr = rBot(yy); }
        else { U = cu(endOn ? x + z * 0.3 : x); Rr = rSide(z, band === 2); }
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - Rr / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  /* ========================================================= materials ==
     SKIN: the painted sheet. TEAM exactly C.team. GLASS: the flight-deck
     panes. INK: the fan faces, the nozzle insides, the receptacle. HOT: the
     spinners, nozzles and plugs. METAL and TYRE: the gear. */
  function makeMats(C, uk) {
    var tex = sheet(uk), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.82, metalness: 0.08,
                                          side: V.DoubleSide });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x5f686f);
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10,
                                          side: V.DoubleSide });
    m.glass = new V.MeshStandardMaterial({ color: 0x24313b, roughness: 0.12, metalness: 0.50,
                                           transparent: true, opacity: 0.85, side: V.DoubleSide });
    m.ink = new V.MeshStandardMaterial({ color: 0x08090a, roughness: 0.95, metalness: 0.03,
                                         side: V.DoubleSide });
    m.hot = new V.MeshStandardMaterial({ color: 0x45484a, roughness: 0.55, metalness: 0.50,
                                         side: V.DoubleSide });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.tyre = new V.MeshStandardMaterial({ color: 0x151617, roughness: 0.95, metalness: 0.02 });
    return m;
  }

  function merge(list) {
    var pos = [], nor = [], uvs = [], hasUV = false, i, j;
    for (i = 0; i < list.length; i++) if (list[i].attributes.uv) hasUV = true;
    for (i = 0; i < list.length; i++) {
      var g = list[i].index ? list[i].toNonIndexed() : list[i];
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      var u = g.attributes.uv ? g.attributes.uv.array : null;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
      if (hasUV) for (j = 0; j < p.length / 3; j++) { uvs.push(u ? u[j * 2] : 0.5, u ? u[j * 2 + 1] : 0.5); }
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    if (hasUV) out.setAttribute("uv", new V.Float32BufferAttribute(uvs, 2));
    return out;
  }
  function emit(parent, lists, mats, order) {
    for (var i = 0; i < order.length; i++) {
      var key = order[i];
      if (!lists[key] || !lists[key].length) continue;
      parent.add(new V.Mesh(merge(lists[key]), mats[key]));
    }
  }

  /* spec: { uk } */
  function build(THREE, M, C, spec) {
    V = THREE;
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    K = {};
    addFuselage();
    addHump();
    addSponsons();
    addWing();
    addWinglets();
    addFlapFairings();
    addFin();
    addTailplane();
    addBullet();
    addNacelles();
    addGlass();
    addReceptacle();
    addAntennas();
    var G = { metal: [], tyre: [] };
    addGear(G);

    var mats = makeMats(C, !!(spec && spec.uk));
    var root = new V.Group();
    emit(root, K, mats, ["skin", "team", "ink", "hot", "glass"]);
    var gear = new V.Group();
    gear.name = "gear";
    emit(gear, G, mats, ["metal", "tyre"]);
    root.add(gear);
    return root;
  }

  return { build: build };
})();

/* The rows that fly it. A row whose key starts "gbr_" wears the RAF roundel,
   any other the US star-and-bar; add US keys to the list as they come. */
["gbr_e00_airlift", "nato_e90_c17"].forEach(function (k) {
  UNIT_MODELS[k] = {
    len: 53.0,
    build: function (THREE, M, C) { return HeroC17.build(THREE, M, C, { uk: /^gbr_/.test(k) }); }
  };
});
