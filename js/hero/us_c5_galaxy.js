/* ============ us_c5_galaxy.js -- LOCKHEED C-5 GALAXY (HERO MODEL) ============

   The four-jet strategic airlifter, for the three rows that fly it, each
   drawn as its own variant:
     nato_e60_c5   "C-5A Galaxy" (1970): TF39 engines, the 1970s Military
                   Airlift Command finish (white over light grey, dark radome,
                   a thin dark-blue cheatline).
     nato_e80_c5   "C-5B Galaxy" (1986): TF39 engines, the European One
                   wrap-round camouflage of two greens and a grey.
     nato_e00_c5   "C-5M Super Galaxy" (2008): CF6-80C2 (F138) engines in
                   their longer nacelles, overall Air Mobility Command grey.
   The airframe is one outline for all three: the drawing and the photographs
   show no difference in it between the A, B and M. The glass cockpit of the
   M is inside and is not drawn.

   Published figures: length 75.31 m, span 67.89 m, height 19.84 m (the
   drawing's own dimension lines: 247 ft 1 in, 222 ft 9 in, 65 ft 1 in); the
   built model measures 75.31 x 67.88 x 19.84 m. 28 wheels (the row's facts
   note): a four-wheel nose gear and four six-wheel main bogies.

   Drawing: Wikimedia Commons "Lockheed C-5 Galaxy 3-view line drawing.jpg"
     (dimensioned three-view), read by a pixel scan at its own scale: side
     view 7.516 px to the metre (567 px for the 75.31 m line), front view
     7.453 px to the metre (506 px for the 67.89 m line). Its plan view does
     not hold its own span, so the planform comes from
     "Lockheed C-5 Galaxy plan view silhouette drawing - 2023.jpg" (Commons),
     which does: 14.14 px to the metre over the span, 14.17 over the length.
     Every station below is s metres aft of the nose tip and h metres above
     the ground.
       fuselage  crown 9.65 m from s 7 aft, rising to 10.05 under the fin;
                 belly 1.40 m from s 14 to s 42, then swept up to the tail
                 cone at s 69.8, h 7.9 (the ramp and the aft doors underneath);
                 nose tip h 5.0, the cockpit glazing at h 8.3-8.95, s 5-6.9;
                 7.0 m wide (front view 7.04, three-view plan 7.1-7.3,
                 silhouette 6.64: their middle; no published figure found)
       wing      leading edge 27.6 deg back (s 23.0 at 5.06 m out, s 33.7
                 at 25.4 m), trailing edge 16.0 deg (34.7 -> 40.5), chord
                 12.0 m at the root and 5.4 m at 31.4 m out, a rounded tip at
                 33.95 m; mean plane 9.2 m up at the body falling 4.6 deg (the
                 front view)
       engines   inlets at s 22.8 and 26.4, 12.34 m and 19.11 m out
                 (silhouette); centres 4.8 m and 4.25 m up (side view and the
                 C-5M take-off photograph; the front view draws them higher
                 and does not agree with its own side view)
       tail      fin leading edge 36 deg back, trailing edge 32 deg, chord
                 about 7.5 m at the root and 6.5 m at the top; the fin-top
                 fairing to 19.84 m and to the 75.31 m overall length;
                 tailplane 21.8 m across, leading edge 33.9 deg, trailing
                 edge 5.3 deg, 5 deg anhedral (front view and photographs)
       gear      nose wheels at s 11.0, four abreast (front view); main legs
                 at s 29.95 and 35.5, 4.5 m out; each bogie a pair of wheels
                 on its forward axle and four on its rear one: two axles in
                 the side view, four tyres abreast in the front view and in
                 the C-5M head-on photograph
       pods      the main-gear fairings from s 21.5 to 45, 9.25 m across
                 (front view), their bottom 1.3 m up
   Photographs (Wikimedia Commons):
     "Dover Air Force Base - MAC 1970s C-5 Galaxy.jpg" (1975 postcard) and
       "C-5A 2 Juli 77.jpg" (Ramstein, 1977): the 1970s finish, white above
       a thin dark-blue cheatline, light grey below and on the wings, the
       dark radome; the cheatline carries on up the raised visor
     "The first C-5A Galaxy to arrive in Vietnam ... Cam Banh Bay.jpg"
       (1970, head on): the dark radome, the anhedral, the T-tail
     "An air-to-air front view of a C-5B Galaxy aircraft from the 22nd
       Military Airlift Squadron- DF-ST-88-07447.jpg" (1988) and "87-0041 ...
       Lockheed C-5B Galaxy ... RIAT 1993" : the European One camouflage on
       the C-5B, the open nose and aft doors
     "C-5 Galaxy.jpg" (C-5A 66-8306 from below): the planform, the flap-track
       fairings, the pods
     "C-5M Super Galaxy takes off at Dover AFB 150817-F-BO262-607/-609.jpg"
       and "Aircraft maintenance personnel tow a U.S. Air Force C-5M ...
       140103-F-BO262-040.jpg" (head on): the C-5M grey, its long nacelles,
       the nose and the four-abreast main wheels
     "TF39 engines on a Lockheed C-5 Galaxy.jpg", "C-5 Galaxy CF6-80C2 Engine
       - Aviation Nation 2019.jpg": the two nacelles; "C-5 nose open.jpg":
       the visor
   Paint (each sampled and taken to about 0.9 for the renderer's tone curve):
     1970s: white #d9dad6 above the cheatline, light grey #aeb2b2 below and
       on the wings, radome #22262e, cheatline #24366a
     European One: FS 34092 #2f3a2f, FS 34102 #4a5a3c, FS 36081 #3c4043
     C-5M: Air Mobility Command grey FS 36173, the C-17's #5f686f
   RECOGNITION (what must read at RTS zoom, and where each shows):
     1. very long deep fuselage, the visor nose with its joint line below the
        flight deck and down to the belly (drawing side view; C-5M head-on
        photograph; "C-5 nose open")                  -> FUS, paint (visor seam)
     2. the upswept rear fuselage with the ramp and aft doors outlined
        underneath (drawing; RIAT 1993 photograph)      -> FUS rows 42-70, paint
     3. high swept wing on the roof with 4.6 deg anhedral (front view; 1970
        head-on photograph)                             -> addWing
     4. four engines on pylons well ahead of the leading edge: short TF39 fan
        cowls with the core behind (A, B), the long CF6-80C2 cowls (M)
        (photographs)                                   -> addNacelles, addPylon
     5. tall swept fin and the T-tail with its fin-top fairing and the
        drooping tailplane (drawing; C-5M take-off photograph)
                                                        -> addFin, addTailplane, addBullet
     6. the long main-gear pods low on each side (front and side views)
                                                        -> addPods
     7. the 28-wheel gear: four six-wheel bogies, four nose wheels abreast
        (front view; head-on photograph)                -> addGear
     8. the flight deck and upper deck on top of the nose, the crown rising
        behind the cockpit and the wing-root fairing hump (side view; C-5M
        photographs)                                    -> FUS rows 3-8, addHump
     9. the cockpit glazing: front panes and side panes in a band 8.3-8.95 m
        up (drawing; head-on photograph)                -> addGlass
    10. six flap-track fairings under each wing (silhouette; "C-5 Galaxy")
                                                        -> addFlapFairings
    11. each period's paint (the photographs above)    -> paintSheet
   NOT CONFIRMED and so not drawn: the national insignia (no photograph used
     shows one on the fuselage sides, fin or wings of any of the three
     finishes; the C-5M outline star-and-bar is photographed close up but not
     where it sits); titles, serials, unit badges, fin bands and the fin flag
     (never drawn); the open nose and aft doors (the model flies closed); the
     exact antenna fit (four blades); which axle of a main bogie carries four
     wheels (the views show two axles and four tyres abreast).
   Team colour (exactly C.team, modest): the upper skin of the rounded tip of
     each wing (the outer 2.5 m) and the fin-top fairing.
   Model space: +X nose, +Y port, +Z up, metres. Merged into one mesh per
     material (skin, team, glass, ink, hot); the gear is its own named group
     of two (metal, tyre), the lowest opaque part.
   ========================================================================= */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroC5 = (function () {
  "use strict";

  var V = null;                         /* THREE, set by build()               */
  var D2R = Math.PI / 180, PI = Math.PI;
  var LEN = 75.31;                      /* nose tip to the fin-top fairing end */
  var XN = LEN / 2, ZG = -5.6;          /* the ground is 5.6 m below the origin */
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
  function foil(secs, frame, map, KC, upperCat, uvf) {
    var rings = [], i, sh = new Shell(), kc = KC || 10;
    for (i = 0; i < secs.length; i++) rings.push(foilRing(secs[i], frame, kc));
    sh.loft(rings, function (i) { return i < kc ? 0 : (upperCat === undefined ? 1 : upperCat); }, true, true);
    sh.emit(map, uvf || (frame === "w" ? projUVflat : projUV));
  }

  /* ======================================================== the fuselage ==
     Rows: s, half-width, crown h, belly h, the upper and lower halves'
     superellipse exponents (below 1 squares the corners: the boxy main deck,
     the flat ramp underside), and where the widest line sits as a fraction
     of the depth from the belly (low on the bulbous visor and the main deck,
     higher as the belly sweeps up aft). Read off the side view and the
     silhouette (see the header). */
  var FUS = [
    [0.00, 0.10, 5.15, 4.85, 1.00, 1.00, 0.50],
    [0.25, 0.82, 5.55, 4.45, 0.98, 0.95, 0.45],
    [0.50, 1.09, 5.72, 4.28, 0.96, 0.90, 0.42],
    [1.00, 1.53, 6.04, 3.93, 0.94, 0.84, 0.39],
    [1.50, 1.87, 6.36, 3.62, 0.92, 0.80, 0.37],
    [2.00, 2.16, 6.69, 3.41, 0.90, 0.76, 0.36],
    [2.50, 2.42, 7.02, 3.24, 0.88, 0.73, 0.36],
    [3.00, 2.66, 7.34, 3.03, 0.87, 0.70, 0.36],
    [3.50, 2.84, 7.64, 2.89, 0.87, 0.68, 0.37],
    [4.00, 2.98, 7.94, 2.75, 0.87, 0.66, 0.38],
    [5.00, 3.24, 8.62, 2.48, 0.88, 0.62, 0.39],
    [6.00, 3.42, 9.18, 2.28, 0.90, 0.58, 0.40],
    [7.00, 3.49, 9.50, 2.12, 0.92, 0.56, 0.41],
    [8.30, 3.50, 9.63, 2.00, 0.93, 0.54, 0.42],
    [11.0, 3.50, 9.65, 1.62, 0.93, 0.52, 0.43],
    [14.0, 3.50, 9.65, 1.42, 0.93, 0.50, 0.44],
    [22.0, 3.50, 9.65, 1.40, 0.93, 0.50, 0.44],
    [42.0, 3.50, 9.75, 1.40, 0.93, 0.50, 0.44],
    [44.2, 3.49, 9.78, 1.53, 0.93, 0.52, 0.45],
    [46.9, 3.45, 9.82, 1.93, 0.93, 0.56, 0.46],
    [50.9, 3.36, 9.90, 2.73, 0.93, 0.60, 0.47],
    [54.9, 3.18, 10.00, 3.59, 0.93, 0.64, 0.48],
    [58.9, 2.92, 10.05, 4.52, 0.93, 0.68, 0.49],
    [62.9, 2.52, 10.05, 5.52, 0.93, 0.74, 0.50],
    [65.5, 2.05, 9.95, 6.32, 0.94, 0.80, 0.50],
    [66.9, 1.70, 9.68, 6.72, 0.95, 0.85, 0.50],
    [68.2, 1.22, 9.18, 7.12, 0.97, 0.90, 0.50],
    [69.2, 0.70, 8.62, 7.58, 1.00, 0.95, 0.50],
    [69.8, 0.12, 8.15, 7.92, 1.00, 1.00, 0.50]
  ];
  var FST = [0, 0.08, 0.25, 0.5, 0.75, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0,
             6.5, 7.0, 8.3, 9.6, 11.0, 12.5, 14.0, 22.0, 30.0, 38.0, 42.0,
             44.2, 46.9, 48.9, 50.9, 52.9, 54.9, 56.9, 58.9, 60.9, 62.9, 64.2, 65.5, 66.9,
             68.2, 69.2, 69.8];
  var FN = 28;
  function fusRow(s) { return tab(FUS, s); }
  function crown(s) { return fusRow(s)[1]; }
  function belly(s) { return fusRow(s)[2]; }
  /* a = degrees from the roof, positive toward port; push moves it outward */
  function fusPt(s, a, push) {
    var r = fusRow(s), hw = r[0], ht = r[1], hb = r[2], et = r[3], eb = r[4], hf = r[5];
    var hm = hb + (ht - hb) * hf;
    var ca = Math.cos(a * D2R), sa = Math.sin(a * D2R);
    var e = ca >= 0 ? et : eb;
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

  /* the wing-root fairing on the roof: rises ahead of the leading edge and
     carries the wing over the crown (the hump in the C-5M side photographs) */
  function addHump() {
    var ROWS = [[16.5, 0.8, 0.00], [18.0, 2.0, 0.14], [20.0, 2.7, 0.30], [22.2, 3.0, 0.38],
                [27.0, 3.0, 0.36], [33.0, 3.0, 0.30], [37.0, 2.6, 0.18], [41.0, 1.8, 0.05],
                [43.0, 1.0, 0.00]];
    var rings = [], k, i, sh = new Shell(), n = 9, NK = 12;
    for (k = 0; k <= NK; k++) {
      var s = 16.5 + 26.5 * k / NK, r = lin(ROWS, s), w = r[0], b = r[1], c0 = crown(s) - 0.15;
      var ring = [];
      for (i = 0; i < n; i++) {
        var a = PI * i / (n - 1), yy = -w * Math.cos(a), f = Math.sin(a);
        ring.push([X(s), yy, Z(c0 + (b + 0.15) * Math.pow(f, 0.5))]);
      }
      for (i = n - 2; i >= 1; i--) {
        var a2 = PI * i / (n - 1);
        ring.push([X(s), -w * Math.cos(a2) * 0.9, Z(c0 - 0.3)]);
      }
      rings.push(ring);
    }
    sh.loft(rings, null, true, true);
    sh.emit(SKIN, projUV);
  }

  /* ============================================================== pods ==
     The main-gear fairings low on each side: rows s, outer edge (m from the
     centreline), bottom h, top h where they fair into the body side. Their
     inner half is buried in the fuselage. */
  var POD = [
    [21.5, 3.30, 2.70, 4.60],
    [22.5, 3.90, 1.78, 5.00],
    [23.8, 4.28, 1.44, 5.15],
    [25.5, 4.52, 1.32, 5.20],
    [27.5, 4.62, 1.28, 5.20],
    [37.0, 4.62, 1.28, 5.20],
    [39.0, 4.52, 1.30, 5.15],
    [41.0, 4.30, 1.36, 5.00],
    [42.8, 3.98, 1.50, 4.70],
    [44.0, 3.68, 1.74, 4.30],
    [45.0, 3.36, 2.10, 3.80]
  ];
  var POST = [21.5, 21.9, 22.5, 23.2, 24.2, 25.5, 27.5, 37.0, 39.0, 41.0, 42.4, 43.5, 44.3,
              45.0];
  function addPods() {
    var sd, k, i, n = 14;
    for (sd = -1; sd <= 1; sd += 2) {
      var rings = [], sh = new Shell();
      for (k = 0; k < POST.length; k++) {
        var s = POST[k], r = tab(POD, s), yin = 2.4, yo = r[0], yc = (yin + yo) / 2, hy = (yo - yin) / 2;
        var hc = (r[1] + r[2]) / 2, hh = (r[2] - r[1]) / 2, ring = [];
        for (i = 0; i < n; i++) {
          var a = i * 2 * PI / n, ca = Math.cos(a), sa = Math.sin(a);
          /* a squarish ellipse, fuller below (the pod's flat underside) */
          var e = ca < 0 ? 0.58 : 0.92;
          ring.push([X(s), sd * (yc + hy * sgp(sa, 0.75)), Z(hc + hh * sgp(ca, e))]);
        }
        rings.push(ring);
      }
      sh.loft(rings, null, true, true);
      sh.emit(SKIN, projUV);
    }
  }

  /* ============================================================== wing ==
     High, swept, anhedral (see the header). Inside the body every section is
     the root section, so the wing box runs straight through over the roof. */
  var YR = 3.5, YT = 33.94, YTEAM = 31.4;
  function wingLE(a) { return 23.01 + 0.5236 * (Math.max(a, YR) - 5.06); }
  function wingTE(a) { return 34.66 + 0.287 * (Math.max(a, YR) - 5.06); }
  function wingO(a) { return 9.20 - 0.080 * (Math.max(a, YR) - YR); }
  function wingT(a) { return 0.130 - 0.028 * (Math.max(a, YR) - YR) / (YT - YR); }
  function wingSec(y) {
    var a = Math.abs(y), ae = Math.max(a, YR), le = wingLE(ae);
    return { a: y, s: le, c: wingTE(ae) - le, t: wingT(ae), o: wingO(ae) };
  }
  /* the rounded tip (silhouette): leading edge swept back into the tip */
  var TIP = [[31.4, 36.84, 42.21], [32.4, 37.75, 42.40], [33.1, 38.95, 42.55], [33.6, 40.15, 42.55],
             [33.94, 41.45, 42.15]];
  function tipSec(k, sd) {
    var q = TIP[k];
    return { a: sd * q[0], s: q[1], c: q[2] - q[1], t: wingT(q[0]), o: wingO(q[0]) };
  }
  /* the height of the upper or lower skin at (s, y) */
  function wingSurf(s, y, lower) {
    var sec = wingSec(y), u = clamp((s - sec.s) / sec.c, 0, 1), th = foilHalf(sec.t, sec.c, u);
    return lower ? sec.o - th : sec.o + th;
  }
  function addWing() {
    var ys = [-YTEAM, -28.0, -24.36, -21.68, -19.11, -15.98, -12.34, -8.17, -5.06, -YR, 0,
              YR, 5.06, 8.17, 12.34, 15.98, 19.11, 21.68, 24.36, 28.0, YTEAM], i, secs = [];
    for (i = 0; i < ys.length; i++) secs.push(wingSec(ys[i]));
    foil(secs, "w", SKIN, 12);
    /* the rounded tip, the outer 2.5 m: the team's colour on the upper skin only */
    [-1, 1].forEach(function (sd) {
      var t = [];
      for (var k = 0; k < TIP.length; k++) t.push(tipSec(k, sd));
      if (sd < 0) t.reverse();
      foil(t, "w", { 0: "team", 1: "skin", 2: "skin" }, 12);
    });
  }

  /* ============================================== flap-track fairings ==
     Six canoes a wing under the lower skin, from mid-chord to just behind the
     trailing edge (the silhouette's six spikes; the photograph from below). */
  var FLAPY = [8.17, 12.34, 15.98, 19.11, 21.68, 24.36];
  function addFlapFairings() {
    var sd, f, k, i, n = 6;
    var PROF = [[0.00, 0.10, 0.10], [0.15, 0.70, 0.62], [0.45, 1.00, 1.00], [0.80, 0.80, 0.85],
                [1.00, 0.12, 0.15]];
    for (sd = -1; sd <= 1; sd += 2) {
      for (f = 0; f < FLAPY.length; f++) {
        var y = FLAPY[f], sec = wingSec(y), s0 = sec.s + 0.45 * sec.c, s1 = sec.s + sec.c + 1.1;
        var hw = 0.24 - 0.012 * f, hh = 0.50 - 0.03 * f, rings = [], sh = new Shell();
        for (k = 0; k <= 4; k++) {
          var u = [0, 0.18, 0.5, 0.88, 1][k], s = s0 + (s1 - s0) * u, pr = lin(PROF, u), ring = [];
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
        sh.emit(SKIN, projUVflat);
      }
    }
  }

  /* ============================================================== tail ==
     Fin: leading edge 36 deg, trailing edge 32 deg (side view); tailplane
     21.8 m across with 5 deg anhedral on the fin-top fairing. */
  function finLE(h) { return 58.75 + (h - 10.0) / 1.38; }
  function finTE(h) { return 66.30 + (h - 10.0) / 1.60; }
  function finSec(h) {
    var le = finLE(h);
    return { a: h, s: le, c: finTE(h) - le, t: 0.115 - 0.02 * (h - 9.4) / 9.2, o: 0 };
  }
  function addFin() {
    var hs = [9.4, 11.5, 14.0, 16.5, 18.6], i, secs = [];
    for (i = 0; i < hs.length; i++) secs.push(finSec(hs[i]));
    foil(secs, "f", SKIN, 12);
  }
  var TPH = 18.80;                       /* the tailplane's mean line at the root */
  function tpSec(y) {
    var a = Math.max(Math.abs(y), 0.9), le = 67.26 + 0.671 * (a - 1.66), te = 73.33 + 0.092 * (a - 1.66);
    return { a: y, s: le, c: te - le, t: 0.10, o: TPH - 0.0875 * (a - 0.9) };
  }
  function addTailplane() {
    var ys = [-10.9, -9.6, -7.0, -4.0, -0.9, 0, 0.9, 4.0, 7.0, 9.6, 10.9], i, secs = [];
    for (i = 0; i < ys.length; i++) {
      var q = tpSec(ys[i]);
      if (Math.abs(ys[i]) > 10) { q.s = 73.30; q.c = 0.85; }        /* the pointed tip */
      secs.push(q);
    }
    foil(secs, "w", SKIN, 10);
  }
  /* the fin-top fairing: a body of revolution, 0.85 m round, its top the
     published 19.84 m height, its tail the 75.31 m overall length */
  function addBullet() {
    var ROWS = [[0.00, 0.05], [0.40, 0.42], [1.30, 0.72], [2.80, 0.85], [7.20, 0.85], [9.20, 0.70],
                [10.6, 0.40], [11.51, 0.06]];
    var s0 = 63.8, hc = 18.99, rings = [], r, i, n = 14, sh = new Shell();
    for (r = 0; r < ROWS.length; r++) {
      var ring = [], rr = ROWS[r][1];
      for (i = 0; i < n; i++) {
        var a = i * 2 * PI / n;
        ring.push([X(s0 + ROWS[r][0]), rr * Math.sin(a), Z(hc + rr * Math.cos(a))]);
      }
      rings.push(ring);
    }
    sh.loft(rings, null, true, true);
    sh.emit({ 0: "team", 2: "team" });
  }

  /* ============================================================ nacelles ==
     Rows: d metres behind the inlet lip, radius. TF39 (C-5A, C-5B): a short
     fat fan cowl ending in the fan nozzle, then the core cowl, its nozzle and
     plug well behind (the TF39 photograph, the drawing's side view). CF6-80C2
     (C-5M): a long fan cowl with the translating reverser, a short core
     behind (the C-5M photographs). The cowl takes its paint from a strip of
     its own (the lip, the cowl seams), mapped along its length. */
  var ENGS = {
    tf39: {
      cowl: [[0.40, 1.14], [0.00, 1.27], [0.08, 1.37], [0.50, 1.45], [2.60, 1.45], [3.30, 1.38],
             [3.70, 1.30]],
      fanFace: 0.42, fanR: 1.14,
      core: [[3.40, 0.98], [3.75, 1.02], [4.60, 0.98], [6.20, 0.80], [6.90, 0.70]],
      coreExit: 6.70, coreR: 0.62,
      plug: [[6.40, 0.52], [7.00, 0.44], [7.60, 0.18], [7.90, 0.04]],
      fanExit: [[3.55, 1.26], [3.70, 1.30]],
      seams: [[0, 0.30, "lip"], [1.70, 1.75], [2.55, 2.62], [3.62, 3.70]]
    },
    cf6: {
      cowl: [[0.40, 1.16], [0.00, 1.29], [0.08, 1.41], [0.60, 1.50], [3.90, 1.50], [4.80, 1.38],
             [5.40, 1.22]],
      fanFace: 0.48, fanR: 1.16,
      core: [[5.10, 0.86], [5.45, 0.88], [6.20, 0.78], [6.75, 0.66]],
      coreExit: 6.55, coreR: 0.58,
      plug: [[6.30, 0.50], [6.85, 0.40], [7.40, 0.15], [7.65, 0.04]],
      fanExit: [[5.25, 1.19], [5.40, 1.22]],
      seams: [[0, 0.34, "lip"], [1.95, 2.00], [3.02, 3.08], [4.05, 4.11], [5.30, 5.40]]
    }
  };
  var NCX = 884, NCPX = 17, NCROW = 40;          /* the cowl strip in the sheet */
  function nacelleUV(xLip) {
    return function (g) {
      var p = g.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), k;
      for (k = 0; k < p.length / 3; k++) {
        var d = clamp(xLip - p[k * 3], 0, 7.9);
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
  var ENG = [[22.80, 12.34, 4.80], [26.40, 19.11, 4.25]];
  function addNacelles(E) {
    var e, sd;
    for (e = 0; e < ENG.length; e++) {
      for (sd = -1; sd <= 1; sd += 2) {
        var s0 = ENG[e][0], y = sd * ENG[e][1], hc = ENG[e][2], xl = X(s0);
        bodyOfRev(xl, y, hc, E.cowl, 16, SKIN, nacelleUV(xl), false, false);
        /* the fan face, dark, and its spinner */
        bodyOfRev(xl, y, hc, [[E.fanFace, E.fanR]], 16, { 2: "ink" }, null, true, false);
        bodyOfRev(xl, y, hc, [[E.fanFace - 0.05, 0.02], [E.fanFace + 0.12, 0.30], [E.fanFace + 0.40, 0.44]],
                  10, { 0: "hot", 2: "hot" }, null, false, false);
        /* the fan nozzle's dark annulus, the core cowl, its nozzle and plug */
        bodyOfRev(xl, y, hc, E.fanExit, 16, { 0: "ink", 2: "ink" }, null, false, false);
        bodyOfRev(xl, y, hc, E.core, 12, SKIN, nacelleUV(xl), false, false);
        bodyOfRev(xl, y, hc, [[E.coreExit, E.coreR]], 12, { 2: "ink" }, null, true, false);
        bodyOfRev(xl, y, hc, E.plug, 10, { 0: "hot", 2: "hot" }, null, false, false);
        addPylon(s0, y, hc);
      }
    }
  }
  /* the pylon: from the cowl's top, sloping back into the leading edge and on
     under the wing (the photographs: the nacelle hangs a half-diameter below
     the wing on a deep pylon) */
  function addPylon(s0, y, hc) {
    var a = Math.abs(y), sec = wingSec(a);
    var bot = { a: hc + 1.30, s: s0 + 0.9, c: 4.6, t: 0.11, o: y };
    var top = { a: wingSurf(sec.s + 0.3 * sec.c, a, true) + 0.25, s: sec.s - 0.6, c: 0.62 * sec.c, t: 0.10, o: y };
    foil([bot, top], "f", SKIN, 8, undefined, plainUV);
  }
  function plainUV(g) {
    var n = g.attributes.position.count, uv = new Float32Array(n * 2), k;
    for (k = 0; k < n; k++) { uv[k * 2] = (NCX + 1.2 * NCPX) / TW; uv[k * 2 + 1] = 1 - NCROW / TH; }
    g.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return g;
  }

  /* ============================================================== glass ==
     Panes laid on the nose skin, 10 cm proud, placed by height as the drawing
     and the head-on photograph give them: four front panes across the nose
     (h 8.32-8.92) and two side panes a side (s 5.7-6.9). */
  /* the point at angle a (degrees from the roof) whose height is h */
  function ptAH(a, h, push) {
    var lo = 0.2, hi = 9.0, k;
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
        var od = [(A[0] + C[0]) / 2 - X(6.0), (A[1] + C[1]) / 2, (A[2] + C[2]) / 2 - Z(6.0)];
        sh.tri(ids[i][j], ids[i][j + 1], ids[i + 1][j + 1], 0, od);
        sh.tri(ids[i][j], ids[i + 1][j + 1], ids[i + 1][j], 0, od);
      }
    }
  }
  function addGlass() {
    var sh = new Shell(), PP = 0.10;
    [-1, 1].forEach(function (sd) {
      pane(sh, function (u, v) { return ptAH(sd * (1.6 + 11.4 * u), 8.30 + 0.62 * v, PP); }, 3, 2);   /* centre pane */
      pane(sh, function (u, v) { return ptAH(sd * (15.2 + 16.0 * u), 8.30 + 0.60 * v, PP); }, 3, 2);  /* outer pane  */
      pane(sh, function (u, v) { return ptSH(5.75 + 0.50 * u, 8.38 + 0.50 * v, sd, PP); }, 1, 1);     /* side pane 1 */
      pane(sh, function (u, v) { return ptSH(6.40 + 0.50 * u, 8.42 + 0.46 * v, sd, PP); }, 1, 1);     /* side pane 2 */
    });
    sh.emit({ 0: "glass" });
  }

  /* blade antennas on the roof and one under the nose */
  function addAntennas() {
    [[12.5, 1], [16.0, 1], [44.0, 1], [48.0, 1], [9.0, -1]].forEach(function (q) {
      var s = q[0], up = q[1] > 0, h0 = up ? crown(s) - 0.05 : belly(s) + 0.05;
      var h1 = up ? h0 + 0.48 : h0 - 0.38;
      foil([{ a: h0, s: s, c: 0.6, t: 0.12, o: 0 }, { a: h1, s: s + 0.25, c: 0.3, t: 0.12, o: 0 }],
           "f", SKIN, 4);
    });
  }

  /* ============================================================== gear ==
     Nose: one leg at s 11.0, four wheels abreast. Main: four legs (s 29.95
     and 35.5, 4.5 m out of the pods), each with a pair of wheels on the
     forward axle and four on the rear one. Every tyre stands on h = 0. */
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
    var sd, k;
    var RN = 0.52, RM = 0.62;
    /* nose */
    G.metal.push(rod([X(11.0), 0, Z(1.75)], [X(11.0), 0, Z(RN)], 0.13, 8));
    G.metal.push(rod([X(10.0), 0, Z(1.55)], [X(10.95), 0, Z(1.0)], 0.06, 6));
    G.metal.push(rod([X(11.0), -1.35, Z(RN)], [X(11.0), 1.35, Z(RN)], 0.07, 6));
    [-1.12, -0.40, 0.40, 1.12].forEach(function (yw) {
      G.tyre.push(wheelG(RN, 0.36, X(11.0), yw, Z(RN), 12));
      G.metal.push(wheelG(0.26, 0.38, X(11.0), yw, Z(RN), 7));
    });
    /* main */
    for (sd = -1; sd <= 1; sd += 2) {
      [29.95, 35.5].forEach(function (s) {
        var yl = sd * 4.5;
        G.metal.push(rod([X(s), yl, Z(1.95)], [X(s), yl, Z(RM + 0.25)], 0.17, 8));
        /* the bogie beam and its two axles */
        G.metal.push(boxG(1.9, 0.26, 0.24, X(s), yl, Z(RM + 0.2)));
        G.metal.push(rod([X(s - 0.85), yl - 0.55, Z(RM)], [X(s - 0.85), yl + 0.55, Z(RM)], 0.07, 6));
        G.metal.push(rod([X(s + 0.85), yl - 1.05, Z(RM)], [X(s + 0.85), yl + 1.05, Z(RM)], 0.07, 6));
        [-0.25, 0.25].forEach(function (o) {
          G.tyre.push(wheelG(RM, 0.40, X(s - 0.85), yl + o * 1.0 + (o > 0 ? 0.03 : -0.03), Z(RM), 12));
          G.metal.push(wheelG(0.32, 0.42, X(s - 0.85), yl + o * 1.0 + (o > 0 ? 0.03 : -0.03), Z(RM), 6));
        });
        [-0.85, -0.38, 0.38, 0.85].forEach(function (o) {
          G.tyre.push(wheelG(RM, 0.40, X(s + 0.85), yl + o, Z(RM), 12));
          G.metal.push(wheelG(0.32, 0.42, X(s + 0.85), yl + o, Z(RM), 6));
        });
      });
    }
    /* the nose and pod door edges: thin plates hanging at the openings */
    for (k = -1; k <= 1; k += 2) {
      G.metal.push(boxG(2.4, 0.05, 0.42, X(11.0), k * 1.55, Z(1.42)));
    }
  }

  /* ============================================================= paint ==
     One sheet for the whole airframe: four plan views at 11.5 px to the metre
     (from above, from port, from starboard, from below), and a strip for the
     nacelle cowls. Every skin triangle takes its UVs by projection into the
     band its normal faces (projUV), so the panel lines, doors and paint land
     where they are on the aeroplane, in metres. Cached per finish. */
  var PXM = 11.5, TW = 1024, TH = 2048, XMIN = -37.9;
  var YMAX = 34.3, TOPH = 789, HTOP = 20.4, SIDEH = 235;
  var B_PORT = TOPH, B_STBD = TOPH + SIDEH, B_BOT = TOPH + 2 * SIDEH;
  function cu(x) { return clamp((x - XMIN) * PXM, 1, 872); }
  function rTop(y) { return clamp((YMAX - y) * PXM, 1, TOPH - 1); }
  function rBot(y) { return B_BOT + clamp((YMAX - y) * PXM, 1, TOPH - 1); }
  function rSide(z, stbd) { return (stbd ? B_STBD : B_PORT) + clamp((Z(HTOP) - z) * PXM, 1, SIDEH - 1); }

  var FIN = {
    mac70: { base: "#aeb2b2", top: "#d9dad6", radome: "#22262e", stripe: "#24366a",
             line: "rgba(60,66,72,0.50)", seam: "rgba(60,66,72,0.30)", lip: "#c4c8cb", hex: 0xaeb2b2 },
    euro1: { base: "#46553a", c2: "#2d382f", c3: "#3e4245",
             line: "rgba(14,18,14,0.55)", seam: "rgba(14,18,14,0.32)", lip: "#8a9196", hex: 0x4a5a3c },
    amc:   { base: "#5f686f", line: "rgba(30,36,41,0.55)", seam: "rgba(30,36,41,0.32)", lip: "#8a9196",
             hex: 0x5f686f }
  };
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
  /* a soft-edged lizard patch for the European One finish: a ring of points
     at random radii round a centre, wide along x */
  function blob(g, R, u, v, rx, ry, col) {
    var n = 11, i, pts = [];
    for (i = 0; i < n; i++) {
      var a = i * 2 * PI / n, k = 0.55 + 0.6 * R();
      pts.push([u + Math.cos(a) * rx * k, v + Math.sin(a) * ry * k]);
    }
    poly(g, pts, col);
  }

  function paintSheet(fin) {
    var F = FIN[fin];
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(fin === "mac70" ? 501 : fin === "euro1" ? 502 : 503), i, k, sd, y, ys, s;
    function tp(ss, yy, bot) { return [cu(X(ss)), bot ? rBot(yy) : rTop(yy)]; }
    function sp(ss, h, stbd) { return [cu(X(ss)), rSide(Z(h), stbd)]; }
    var LINE = F.line, SEAM = F.seam;

    g.fillStyle = F.base; g.fillRect(0, 0, TW, TH);

    if (fin === "mac70") {
      /* white above the cheatline on the fuselage sides and roof, white fin;
         light grey below, on the wings, tailplane and nacelles */
      var CH = 6.45;                                         /* the cheatline's height */
      for (k = 0; k < 2; k++) {
        var st = k === 1, top0 = st ? B_STBD : B_PORT;
        g.fillStyle = F.top;
        g.fillRect(cu(X(LEN)), top0, cu(X(0)) - cu(X(LEN)), rSide(Z(CH), st) - top0);
        /* the fin white to the top, above the crown */
        g.fillRect(cu(X(LEN)), top0, cu(X(57.5)) - cu(X(LEN)), rSide(Z(9.9), st) - top0);
      }
      /* the roof: white over the fuselage's width */
      g.fillStyle = F.top;
      g.fillRect(cu(X(LEN)), rTop(3.55), cu(X(0)) - cu(X(LEN)), rTop(-3.55) - rTop(3.55));
      /* the wing over the roof stays grey: paint the wing's planform back */
      for (sd = -1; sd <= 1; sd += 2) {
        var wp = [];
        for (y = 3.6; y <= YT; y += 1.0) wp.push(tp(wingLE(y) - 0.05, sd * y, false));
        for (y = YT; y >= 3.6; y -= 1.0) wp.push(tp(wingTE(y) + 0.1, sd * y, false));
        poly(g, wp, F.base);
        /* the tailplane grey too */
        poly(g, [tp(67.0, sd * 0.9, false), tp(73.3, sd * 11.0, false), tp(74.2, sd * 11.0, false),
                 tp(73.6, sd * 0.9, false)], F.base);
      }
      /* the cheatline */
      for (k = 0; k < 2; k++) {
        var stt = k === 1;
        g.fillStyle = F.stripe;
        var a0 = sp(1.2, CH + 0.12, stt), a1 = sp(68.5, CH - 0.12, stt);
        g.fillRect(a0[0] > a1[0] ? a1[0] : a0[0], a0[1], Math.abs(a1[0] - a0[0]), Math.max(2, 0.24 * PXM));
      }
      /* the radome: the dark nose cap, back to s 3.0 (the 1970 head-on photograph) */
      for (k = 0; k < 2; k++) {
        var s2 = k === 1;
        g.fillStyle = F.radome;
        var r0 = sp(3.0, 9.0, s2), r1 = sp(-0.5, 2.6, s2);
        g.fillRect(r1[0] < r0[0] ? r1[0] : r0[0], r0[1], Math.abs(r0[0] - r1[0]), r1[1] - r0[1]);
      }
      g.fillStyle = F.radome;
      g.fillRect(cu(X(3.0)), rTop(3.0), cu(X(-0.5)) - cu(X(3.0)), rTop(-3.0) - rTop(3.0));
      g.fillRect(cu(X(3.0)), rBot(3.0), cu(X(-0.5)) - cu(X(3.0)), rBot(-3.0) - rBot(3.0));
    } else if (fin === "euro1") {
      /* European One: the medium green ground with large patches of the dark
         green and the grey, all over, top and bottom alike */
      for (k = 0; k < 300; k++) {
        var u = R() * 880, v = R() * TH;
        blob(g, R, u, v, 30 + R() * 46, 16 + R() * 24, R() < 0.55 ? F.c2 : F.c3);
      }
      /* the radome the dark green */
      g.fillStyle = F.c2;
      g.fillRect(cu(X(2.6)), 0, cu(X(-0.5)) - cu(X(2.6)), TH);
    } else {
      /* a faint mottle: one grey, weathered unevenly */
      for (k = 0; k < 140; k++) {
        disc(g, R() * 870, R() * TH, 10 + R() * 34,
             R() < 0.5 ? "rgba(80,88,94,0.10)" : "rgba(120,128,134,0.08)");
      }
      /* the radome a shade darker */
      g.fillStyle = "rgba(60,66,72,0.25)";
      g.fillRect(cu(X(2.6)), 0, cu(X(-0.5)) - cu(X(2.6)), TH);
    }

    /* ---- the wing, from above and below: slats, spoilers, flaps, ailerons */
    for (k = 0; k < 2; k++) {
      var bot = k === 1;
      for (sd = -1; sd <= 1; sd += 2) {
        ys = []; for (y = YR + 0.4; y <= 31.4; y += 0.7) ys.push(y);
        ys.push(31.4);
        trace(g, ys.map(function (yy) { var q = wingSec(yy); return tp(q.s + 0.11 * q.c, sd * yy, bot); }), LINE, 1.2);
        trace(g, ys.filter(function (yy) { return yy < 24.5; }).map(function (yy) {
          var q = wingSec(yy); return tp(q.s + 0.74 * q.c, sd * yy, bot); }), LINE, 1.3);
        trace(g, ys.filter(function (yy) { return yy >= 24.5; }).map(function (yy) {
          var q = wingSec(yy); return tp(q.s + 0.72 * q.c, sd * yy, bot); }), LINE, 1.3);
        [YR + 0.4, 12.34, 19.11, 24.5, 31.0].forEach(function (yy) {
          var q = wingSec(yy);
          trace(g, [tp(q.s + 0.72 * q.c, sd * yy, bot), tp(q.s + q.c, sd * yy, bot)], LINE, 1.2);
        });
        if (!bot) {
          /* six spoiler panels ahead of the flaps */
          for (i = 0; i < 6; i++) {
            var y0 = 5.0 + i * 3.2, y1 = y0 + 3.0, q0 = wingSec(y0), q1 = wingSec(y1);
            trace(g, [tp(q0.s + 0.60 * q0.c, sd * y0, false), tp(q1.s + 0.60 * q1.c, sd * y1, false),
                      tp(q1.s + 0.73 * q1.c, sd * y1, false), tp(q0.s + 0.73 * q0.c, sd * y0, false),
                      tp(q0.s + 0.60 * q0.c, sd * y0, false)], SEAM, 1.0);
          }
          trace(g, ys.map(function (yy) { var q = wingSec(yy); return tp(q.s + 0.20 * q.c, sd * yy, false); }), SEAM, 0.8);
        }
        /* tailplane: elevator hinge */
        trace(g, [tp(71.6, sd * 1.2, bot), tp(73.6, sd * 9.8, bot)], LINE, 1.2);
        trace(g, [tp(72.6, sd * 5.4, bot), tp(73.9, sd * 5.4, bot)], SEAM, 1.0);
      }
    }

    /* ---- from above: the roof's seams ---- */
    for (sd = -1; sd <= 1; sd += 2) {
      trace(g, [tp(8.0, sd * 1.3, false), tp(62.0, sd * 1.3, false)], SEAM, 0.9);
      /* the visor's top edge, just below the windscreen, seen from above */
      trace(g, [tp(3.4, sd * 2.6, false), tp(8.1, sd * 3.45, false)], LINE, 1.1);
    }
    for (i = 0; i < 12; i++) {                                 /* roof frames */
      var sf = 10.0 + i * 4.4;
      trace(g, [tp(sf, 1.3, false), tp(sf, -1.3, false)], SEAM, 0.8);
    }
    /* two escape hatches in the upper deck roof */
    g.strokeStyle = LINE; g.lineWidth = 1.1;
    g.strokeRect(cu(X(14.0)), rTop(0.5), 0.9 * PXM, 1.0 * PXM);
    g.strokeRect(cu(X(46.6)), rTop(0.5), 0.9 * PXM, 1.0 * PXM);

    /* ---- the sides ---- */
    for (k = 0; k < 2; k++) {
      var sst = k === 1;
      /* the visor joint: along under the flight deck, then down and forward
         to the belly (the drawing's side view; "C-5 nose open") */
      trace(g, [sp(3.4, 8.05, sst), sp(8.1, 8.2, sst), sp(5.65, 2.45, sst)], LINE, 1.4);
      /* crew door, port forward (the 1975 postcard), and its twin aft hatch */
      if (!sst) trace(g, [sp(9.4, 2.4, sst), sp(10.4, 2.4, sst), sp(10.4, 4.4, sst), sp(9.4, 4.4, sst), sp(9.4, 2.4, sst)], LINE, 1.3);
      /* the troop doors aft of the pods and the upper-deck exits (the
         drawing's small rectangles at s 15.6 and 42.9) */
      trace(g, [sp(45.4, 2.2, sst), sp(46.6, 2.2, sst), sp(46.6, 4.4, sst), sp(45.4, 4.4, sst), sp(45.4, 2.2, sst)], LINE, 1.3);
      trace(g, [sp(15.2, 8.2, sst), sp(16.1, 8.2, sst), sp(16.1, 9.2, sst), sp(15.2, 9.2, sst), sp(15.2, 8.2, sst)], LINE, 1.1);
      trace(g, [sp(42.6, 8.2, sst), sp(43.5, 8.2, sst), sp(43.5, 9.2, sst), sp(42.6, 9.2, sst), sp(42.6, 8.2, sst)], LINE, 1.1);
      g.fillStyle = "rgba(20,24,28,0.80)";
      var w1 = sp(46.0, 3.9, sst);
      g.fillRect(w1[0] - 0.2 * PXM, w1[1], 0.4 * PXM, 0.4 * PXM);
      /* the main-deck floor line and the upper-deck floor line, faint */
      trace(g, [sp(9.0, 6.6, sst), sp(58.0, 6.6, sst)], SEAM, 0.9);
      /* the aft petal doors' edges along the lower sides of the upswept tail */
      ys = []; for (y = 46.9; y <= 66.0; y += 1.0) ys.push(y);
      trace(g, ys.map(function (ss) { return sp(ss, belly(ss) + 0.55, sst); }), LINE, 1.3);
      trace(g, [sp(52.5, belly(52.5) + 0.05, sst), sp(52.5, belly(52.5) + 0.55, sst)], LINE, 1.2);
      trace(g, [sp(46.9, belly(46.9) + 0.05, sst), sp(46.9, belly(46.9) + 0.55, sst)], LINE, 1.2);
      /* fuselage frames */
      for (i = 0; i < 7; i++) {
        var fr = 48.0 + i * 2.6;
        trace(g, [sp(fr, belly(fr) + 0.7, sst), sp(fr, crown(fr) - 0.3, sst)], SEAM, 0.8);
      }
      /* the pod's main gear doors */
      trace(g, [sp(27.6, 1.5, sst), sp(38.0, 1.5, sst)], SEAM, 1.0);
      /* the fin: the rudder hinge line and the split between its halves */
      trace(g, [sp(64.2, 10.2, sst), sp(68.9, 18.3, sst)], LINE, 1.2);
      trace(g, [sp(64.2 + (14.2 - 10.2) * 0.58, 14.2, sst), sp(finTE(14.2), 14.2, sst)], LINE, 1.2);
    }

    /* ---- from below: the ramp and aft doors, the gear doors, the keel ---- */
    function B(s0, s1, a, b, col, lw) {
      trace(g, [tp(s0, a, true), tp(s1, a, true), tp(s1, b, true), tp(s0, b, true), tp(s0, a, true)], col || LINE, lw || 1.3);
    }
    B(46.9, 52.5, -2.6, 2.6, LINE, 1.6);                       /* the ramp          */
    trace(g, [tp(52.5, 2.6, true), tp(58.0, 2.4, true), tp(64.0, 1.6, true), tp(66.2, 0.9, true),
              tp(66.2, -0.9, true), tp(64.0, -1.6, true), tp(58.0, -2.4, true), tp(52.5, -2.6, true)], LINE, 1.6);
    trace(g, [tp(52.5, 0, true), tp(66.2, 0, true)], LINE, 1.2);          /* the petal doors' split */
    for (i = 1; i < 4; i++) trace(g, [tp(46.9 + i * 1.4, 2.4, true), tp(46.9 + i * 1.4, -2.4, true)], SEAM, 0.9);
    B(9.2, 12.8, -1.2, 1.2);                                   /* nose gear doors   */
    for (sd = -1; sd <= 1; sd += 2) {
      B(27.6, 38.0, sd * 3.4, sd * 4.5);                       /* main gear doors   */
    }
    trace(g, [tp(5.65, 0, true), tp(46.0, 0, true)], SEAM, 0.9);
    /* the visor's lower joint across the belly */
    trace(g, [tp(5.65, 2.3, true), tp(5.65, -2.3, true)], LINE, 1.3);

    /* ---- the nacelle strip: the lip and the cowl seams as rings ---- */
    function nb(d0, d1, col) { g.fillStyle = col; g.fillRect(NCX + d0 * NCPX, 0, (d1 - d0) * NCPX, 80); }
    nb(0, 7.9, F.base);
    if (fin === "mac70") nb(0, 7.9, "#bfc2c2");
    var E = fin === "amc" ? ENGS.cf6 : ENGS.tf39;
    E.seams.forEach(function (q) {
      if (q[2] === "lip") nb(q[0], q[1], F.lip);
      else nb(q[0], q[1], "rgba(30,36,41,0.55)");
    });

    var tex = new V.CanvasTexture(cv);
    tex.wrapS = tex.wrapT = V.ClampToEdgeWrapping;
    tex.anisotropy = 4;
    if (V.sRGBEncoding !== undefined) tex.encoding = V.sRGBEncoding;   /* r148 */
    return tex;
  }
  function sheet(fin) {
    if (_tex[fin] !== undefined) return _tex[fin];
    try { _tex[fin] = paintSheet(fin); } catch (e) { _tex[fin] = false; }
    return _tex[fin];
  }

  /* projected UVs: each triangle into the band its normal faces. Faces that
     look fore or aft would collapse to a line under an x projection, so they
     are laid out along x plus the cross coordinate. */
  function projUVflat(geo) { return projUV(geo, true); }
  function projUV(geo, flat) {
    var p = geo.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var band = flat ? (nz >= 0 ? 0 : 3) : nz > 0.5 ? 0 : nz < -0.5 ? 3 : (ny >= 0 ? 1 : 2);
      var endOn = Math.abs(nx) > 0.85;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], yy = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, Rr;
        if (band === 0) { U = cu(endOn && !flat ? x + yy * 0.3 : x); Rr = rTop(yy); }
        else if (band === 3) { U = cu(endOn && !flat ? x + yy * 0.3 : x); Rr = rBot(yy); }
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
     panes. INK: the fan faces, the nozzle annuli. HOT: the spinners, the
     core nozzles and plugs. METAL and TYRE: the gear. */
  function makeMats(C, fin) {
    var tex = sheet(fin), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.82, metalness: 0.08,
                                          side: V.DoubleSide });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(FIN[fin].hex);
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

  /* spec: { eng: "tf39" | "cf6", fin: "mac70" | "euro1" | "amc" } */
  function build(THREE, M, C, spec) {
    V = THREE;
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    K = {};
    addFuselage();
    addHump();
    addPods();
    addWing();
    addFlapFairings();
    addFin();
    addTailplane();
    addBullet();
    addNacelles(ENGS[spec.eng]);
    addGlass();
    addAntennas();
    var G = { metal: [], tyre: [] };
    addGear(G);

    var mats = makeMats(C, spec.fin);
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

/* The rows that fly it, each with its own engines and finish. */
[["nato_e60_c5", { eng: "tf39", fin: "mac70" }],
 ["nato_e80_c5", { eng: "tf39", fin: "euro1" }],
 ["nato_e00_c5", { eng: "cf6", fin: "amc" }]].forEach(function (q) {
  UNIT_MODELS[q[0]] = {
    len: 75.31,
    build: function (THREE, M, C) { return HeroC5.build(THREE, M, C, q[1]); }
  };
});
