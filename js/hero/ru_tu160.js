/* ============ ru_tu160.js -- TUPOLEV Tu-160 BLACKJACK and Tu-160M (HERO MODEL) ============

   Two rows draw it:
     pact_e80_stealthbomber  "Tu-160 Blackjack"  (js/eras.js; service 1987, e80 to e00)
     sbomber_p               "Tu-160M Blackjack" (js/rules.js; today)
   No other key uses this file. js/models3d_east.js still defines an older HD_MODELS["sbomber_p"];
   this file loads after it (index.html / cmp.html order) and replaces it in UNIT_MODELS.

   REFERENCES (Wikimedia Commons, fetched for this redo at width 960)
     A "Tupolev Tu-160 3-view graphic.svg": plan (one wing at the 65 deg maximum sweep, the other
       spread at 20 deg), front view and side view, metre scale bar. Measured on a metre grid
       (17.41 px/m, nose tip to tail cone = the published 54.1 m): every station table below.
       Its spread span comes out 57.7 m against the published 55.7 m, and its swept span 36.4 m
       against 35.6 m: the outer panels are brought in spanwise by 0.968 about the pivot.
     B "Tupolev Tu160M bn18 2020.jpg" (Tu-160M RF-94111, landing): side view; white overall; red star
       with a hair-thin white border on the upper fin near the trailing edge; the tailplane on its
       long bullet fairing at the fin root; blade mast behind the windscreen; three-axle bogies.
     C "Tupolev Tu-160 RF-94113 Zhukowsky 2012.jpg": front three-quarter on the ground: long white
       nose, canopy hump with windscreen and two side windows a side, mast on the canopy, the square
       nacelle fronts, twin nose wheels, the six-wheel main bogies.
     D "Tu-160 at MAKS 2007.jpg": rear three-quarter taking off: the four NK-32 nozzles in two pairs,
       the glove, the fin with the tailplane bullet, the grey panel on the nose top ahead of the
       windscreen.
     E "Tupolev Tu-160 Alabino 220415 58.jpg" (2015): underside: the two paired nacelles under the
       glove with their big rectangular mouths, the planform, red stars under the outer wings.
     F "Tupolev Tu-160 in 1993.jpg": head-on on the ground: each nacelle two tall rectangular
       intakes either side of a centre wall; the gull blend of glove and body; the all-moving upper
       fin; tailplane at about 7.9 m; white with grey weathered panels on the glove and fin.
     G "Tu-160 profile 06.svg": side profile, used to check the nose, canopy and tail lines of A.
     Published figures (ru/en Wikipedia): length 54.1 m, span 55.7 m at 20 deg and 35.6 m at 65 deg,
     height 13.1 m (A's side view: 13.15 m), wheel track 5.4 m.

   RECOGNITION LIST (each drawn; the reference it rests on; where it shows)
     1. the long blended body and glove: the ogival LERX running from 9.8 m aft of the nose out to
        the pivot glove 9 m off the centre line, and the gull blend from the crown down to a thin
        glove edge (A plan and front, F)                                  [skin loft, 41 stations]
     2. variable-sweep outer wings at the 20 deg spread a parked or landing aircraft shows (A, C),
        built about their measured pivot (28.1 m aft of the nose, 8.4 m out): leading edge 23 deg,
        trailing edge 10 deg, 2.5 m oblique tip; slat line and three trailing-edge panels (A)
                                                                            [skin, texture]
     3. four NK-32s in two paired nacelles under the glove, 3.4 m wide, 5.05 m off the centre line,
        square fronts with two tall rectangular intakes a nacelle either side of a centre wall that
        runs forward of the lips (A plan "<", E, F)                          [skin, dark]
     4. the long nozzles in pairs, 2.8 m past the nacelle ends (A, D)       [metal, dark]
     5. the fin: dorsal fillet from the spine, swept leading edge, upright trailing edge, the
        all-moving upper fin above its join line (A, B, F)                  [skin, texture line]
     6. the tailplane, 13.25 m span, low on the fin on its long bullet fairing that runs past the
        fin trailing edge (A side and front, B, F)                          [skin]
     7. the long pointed nose and the canopy hump: windscreen and two side windows a side, the
        blade mast behind the windscreen (A, C, G)                          [glass, skin]
     8. the refuelling probe: retractable, stowed in every photograph of a parked or landing
        aircraft; the grey panel ahead of the windscreen photographs C and D show is painted
        (it is not drawn extended)                                          [texture]
     9. the undercarriage: twin nose wheels at 11.9 m, two six-wheel (three-axle) bogies at
        28.7-31.3 m, track 5.6 m as A's front view gives it (published 5.4 m) (A, B, C, F)  [gear]
    10. white anti-flash finish overall (B-F); the Soviet Air Force star (red, white and red
        border, as the earlier file and pact_hind_mi24.js draw it) on the fin of the 1980s row; the Russian red star with its thin white border on the fin and the
        red stars under the outer wings (B, E) on today's row.
   The Tu-160M (row sbomber_p): its photograph B shows the Tu-160's outline unchanged; the modernisation is engines, avionics and
   weapons. No outline difference is drawn; only the markings differ (10). The 1980s row carries
   the light grey weathering of the glove and fin that F (1993) shows; no photograph of a 1987-91
   aircraft was found, and the 1988 DIA painting (Commons Blackjack-DIA.jpg) is an artist's work and
   is not followed.

   CORRECTIONS TO THE EARLIER FILE (A, measured): the pivot is 28.1 m aft of the nose and 8.4 m out
   (it had 26 m and 8.8 m); the nacelles are 3.4 m wide, front at 24.1 m, ends at 36.5 m with the
   nozzles to 39.2 m (it had 3.2 m, 24.7-38.3 m); the tailplane rides a bullet fairing at 7.8 m it
   lacked; main-gear track 5.6 m (it had 5.3); fin tip 13.1 m (it had 12.9). Kept as the references
   confirm: 54.1 m length, fin trailing edge 50.6 m, nose gear 12 m, bogies 28.6-31.4 m, no extended probe.

   THE SWEEP. The game's wing-fold convention (tools/jsc/wingfold_check.js; the F-14A in
   us_f14_tomcat.js) gives a "wingfold" group, origin on the pivot, only to carrier aircraft that
   fold or oversweep on a deck; render3d.js folds them only on a deck, and section 2 of the check
   holds that no other aircraft has one. The Tu-160 never goes aboard, so, as the Su-24M and the
   EF-111A, it is drawn spread with no fold group. The outer panels are built about the pivot
   (PIVOT, SWEEP below): SWEEP is the turn from the 20 deg spread, 0 here.

   Markings: no names, bort numbers, nose stripes or lettering. Team colour (C.team): a small strip
   on each upper outer wing near the tip. The nose and main gear retract: the "gear" group, lowest of
   all (tyre bottoms at z = 0). Model space +X nose, +Y port, +Z up, metres; z = 0 the ground.
   Paint: the white sampled off B and C (lit 238-255) taken to about 0.85: #d4d6d6.
   ================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTu160 = (function () {
  "use strict";
  var V = null, PI = Math.PI, D2R = PI / 180;
  var NOSE = 27.05;                      /* x of the nose tip: tables use n, metres aft of the nose */
  function X(n) { return NOSE - n; }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function pl(tab, n) {
    var i;
    if (n <= tab[0][0]) return tab[0][1];
    for (i = 0; i + 1 < tab.length; i++) if (n <= tab[i + 1][0]) {
      return lerp(tab[i][1], tab[i + 1][1], (n - tab[i][0]) / (tab[i + 1][0] - tab[i][0]));
    }
    return tab[tab.length - 1][1];
  }
  /* polynomial smooth maximum: exact once a and b are k apart, at most k/4 over max(a, b) */
  function smax(a, b, k) { if (k < 1e-4) return Math.max(a, b); var h = Math.max(k - Math.abs(a - b), 0) / k; return Math.max(a, b) + h * h * k * 0.25; }
  function smin(a, b, k) { return -smax(-a, -b, k); }
  function yt(f, tc) {
    return tc * (1.4845 * Math.sqrt(f) - 0.6300 * f - 1.7580 * f * f + 1.4215 * f * f * f - 0.5075 * f * f * f * f);
  }
  /* airfoil ring in a 2D plane: [chordwise x, thickness offset], LE at xle, TE at xte */
  function foil(xle, xte, th, m) {
    var p = [], i, f, c = xle - xte, tc = th / c;
    for (i = 0; i <= m; i++) { f = 0.5 * (1 + Math.cos(PI * i / m)); p.push([xle - f * c, yt(f, tc) * c]); }
    for (i = m - 1; i >= 1; i--) { f = 0.5 * (1 + Math.cos(PI * i / m)); p.push([xle - f * c, -yt(f, tc) * c]); }
    return p;
  }
  function loft(rings, open) {
    var n = rings[0].length, pos = [], idx = [], i, j, r, a, b, c, d;
    for (r = 0; r < rings.length; r++) for (j = 0; j < n; j++) pos.push(rings[r][j][0], rings[r][j][1], rings[r][j][2]);
    for (r = 0; r + 1 < rings.length; r++) for (j = 0; j < n; j++) {
      a = r * n + j; b = r * n + (j + 1) % n; c = (r + 1) * n + j; d = (r + 1) * n + (j + 1) % n;
      idx.push(a, b, c, b, d, c);
    }
    if (!open) [0, rings.length - 1].forEach(function (e) {
      var cx = 0, cy = 0, cz = 0;
      for (j = 0; j < n; j++) { cx += rings[e][j][0]; cy += rings[e][j][1]; cz += rings[e][j][2]; }
      var ci = pos.length / 3; pos.push(cx / n, cy / n, cz / n);
      for (j = 0; j < n; j++) { var p = e * n + j, q = e * n + (j + 1) % n; if (e === 0) idx.push(ci, q, p); else idx.push(ci, p, q); }
    });
    var vol = 0;
    for (i = 0; i < idx.length; i += 3) {
      var A = idx[i] * 3, B = idx[i + 1] * 3, Cc = idx[i + 2] * 3;
      vol += pos[A] * (pos[B + 1] * pos[Cc + 2] - pos[B + 2] * pos[Cc + 1])
           - pos[A + 1] * (pos[B] * pos[Cc + 2] - pos[B + 2] * pos[Cc])
           + pos[A + 2] * (pos[B] * pos[Cc + 1] - pos[B + 1] * pos[Cc]);
    }
    if (vol < 0) for (i = 0; i < idx.length; i += 3) { var t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function box(sx, sy, sz, x, y, z) { var g = new V.BoxGeometry(sx, sy, sz); g.translate(x, y, z); return g; }
  function cylX(r0, r1, len, x, y, z, seg, open) {   /* r0 at the +X end */
    var g = new V.CylinderGeometry(r0, r1, len, seg || 16, 1, !!open);
    g.rotateZ(-PI / 2); g.translate(x, y, z); return g;
  }
  function cylY(r, w, x, y, z, seg) { var g = new V.CylinderGeometry(r, r, w, seg || 20); g.translate(x, y, z); return g; }
  function rod(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r, r, L, seg || 8);
    var q = new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L));
    var m = new V.Matrix4().makeRotationFromQuaternion(q);
    m.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(m); return g;
  }
  /* a quad strip surface from a grid of points P[i][j] */
  function sheet(P) {
    var pos = [], i, j;
    for (i = 0; i + 1 < P.length; i++) for (j = 0; j + 1 < P[i].length; j++) {
      var a = P[i][j], b = P[i + 1][j], c = P[i + 1][j + 1], d = P[i][j + 1];
      pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2], a[0], a[1], a[2], c[0], c[1], c[2], d[0], d[1], d[2]);
    }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  /* turn every face of a non-indexed geometry to look along dir (outward) */
  function orient(g, dir) {
    var p = g.attributes.position.array, t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var d = (uy * vz - uz * vy) * dir[0] + (uz * vx - ux * vz) * dir[1] + (ux * vy - uy * vx) * dir[2];
      if (d < 0) for (k = 0; k < 3; k++) { var tmp = p[t + 3 + k]; p[t + 3 + k] = p[t + 6 + k]; p[t + 6 + k] = tmp; }
    }
    g.attributes.position.needsUpdate = true;
    g.computeVertexNormals();
    return g;
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
    out.setAttribute("uv", new V.Float32BufferAttribute(new Float32Array(pos.length / 3 * 2), 2));
    return out;
  }

  /* ---------------- the body and glove (A: plan, side and front views) ---------------- */
  /* plan half width of the body-and-glove outline */
  var TW = [[0, 0.02], [0.5, 0.17], [1, 0.3], [2, 0.55], [3, 0.8], [4, 0.97], [5, 1.08], [6, 1.12], [8, 1.14], [9.8, 1.17],
            [11, 1.35], [12, 1.6], [13, 1.95], [14, 2.4], [15, 2.85], [16, 3.4], [17, 4.0], [18, 4.6], [19, 5.2], [20, 5.85],
            [21, 6.45], [22, 7.05], [23, 7.65], [24, 8.25], [25, 8.75], [25.8, 9.0], [31, 9.0], [32.3, 8.6], [33.2, 3.0],
            [36.5, 2.95], [40, 2.25], [44, 1.6], [48, 1.05], [51, 0.75], [53, 0.5], [54.1, 0.18]];
  /* half width of the fuselage proper (the superellipse inside the blend) */
  var TB = [[0, 0.02], [1, 0.3], [2, 0.55], [3, 0.8], [4, 0.97], [5, 1.08], [6, 1.12], [8, 1.14], [10, 1.18], [12, 1.3],
            [15, 1.45], [20, 1.55], [25, 1.6], [30, 1.7], [32, 2.2], [33.2, 2.7], [36.5, 2.9], [40, 2.2], [44, 1.55],
            [48, 1.02], [51, 0.72], [53, 0.48], [54.1, 0.16]];
  /* crown (with the canopy hump), keel, and the glove plane / body centre, heights above the ground */
  var TZT = [[0, 4.15], [1, 4.4], [2, 4.6], [3, 4.8], [4, 4.97], [5, 5.12], [6.3, 5.3], [7, 5.62], [7.8, 5.92], [8.6, 6.06],
             [10, 6.1], [20, 6.1], [34, 6.05], [40, 6.0], [46, 5.95], [50, 5.9], [52, 5.78], [53.5, 5.6], [54.1, 5.42]];
  var TZB = [[0, 4.15], [1, 3.95], [2, 3.75], [3, 3.6], [4, 3.47], [5, 3.38], [6, 3.3], [7, 3.22], [8, 3.12], [10, 3.1],
             [14, 3.08], [20, 3.1], [25, 3.15], [30, 3.2], [35, 3.3], [38, 3.35], [42, 3.45], [45, 3.6], [48, 3.95],
             [50, 4.25], [52, 4.55], [54.1, 4.98]];
  var TZW = [[0, 4.15], [3, 4.3], [6, 4.45], [10, 4.5], [15, 4.42], [20, 4.32], [25, 4.25], [30, 4.22], [33, 4.3],
             [36, 4.5], [40, 4.65], [45, 4.85], [50, 5.0], [54.1, 5.2]];
  /* glove root half thickness (upper), lower, and the thickness kept at the glove edge (the pivot box) */
  var TEG = [[0, 0.1], [10, 0.25], [14, 0.7], [18, 1.2], [22, 1.65], [26, 1.95], [31, 1.95], [33.2, 0.9], [36.5, 0.5], [54.1, 0.2]];
  var TEB = [[0, 0.05], [12, 0.15], [18, 0.35], [24, 0.5], [31, 0.5], [33.2, 0.3], [54.1, 0.1]];
  var TEE = [[0, 0.02], [24, 0.04], [25.5, 0.16], [31, 0.16], [32.3, 0.05], [54.1, 0.02]];
  var PE = 2.3;

  function sect(n) {
    var W = pl(TW, n), B = Math.min(pl(TB, n), W - 0.06);
    return { W: W, B: Math.max(B, 0.01), zt: pl(TZT, n), zb: pl(TZB, n), zw: pl(TZW, n), eg: pl(TEG, n), eb: pl(TEB, n), ee: pl(TEE, n) };
  }
  function supe(u) { u = clamp(u, 0, 1); return Math.pow(1 - Math.pow(u, PE), 1 / PE); }
  /* the upper and lower surface heights at |y| for a section */
  function topZ(S, y) {
    var a = Math.abs(y), s = clamp((a - 0.5) / Math.max(S.W - 0.5, 0.05), 0, 1), u = a / S.B;
    var tb = u <= 1 ? S.zw + (S.zt - S.zw) * supe(u) : S.zw - 6 * (a - S.B);
    var tg = S.zw + Math.min(S.eg * (1 - s) * (1 - s) + S.ee * (0.6 + 0.4 * s), S.zt - S.zw - 0.3);
    return smax(tb, tg, 0.8 * Math.pow(1 - clamp(a / S.W, 0, 1), 1.5));
  }
  function botZ(S, y) {
    var a = Math.abs(y), s = clamp(a / Math.max(S.W, 0.05), 0, 1), u = a / S.B;
    var bb = u <= 1 ? S.zw - (S.zw - S.zb) * supe(u) : S.zw + 6 * (a - S.B);
    var bg = S.zw - S.eb * Math.pow(1 - s, 1.5) - S.ee * 0.6 - 0.015;
    return smin(bb, bg, 0.7 * Math.pow(1 - s, 1.5));
  }
  /* y positions across a section: the body by angle, then the glove out to its edge */
  var NBODY = 8, NGLOVE = 6;
  function ys(S) {
    var out = [], i;
    for (i = 0; i <= NBODY; i++) out.push(S.B * Math.pow(Math.sin(i / NBODY * PI / 2), 0.9));   /* 0 .. B */
    for (i = 1; i <= NGLOVE; i++) out.push(S.B + (S.W - S.B) * Math.pow(i / NGLOVE, 1.3));     /* .. W  */
    return out;
  }
  function bodyRing(n) {
    var S = sect(n), Y = ys(S), ring = [], i, x = X(n), L = Y.length;
    for (i = L - 1; i >= 1; i--) ring.push([x, Y[i], topZ(S, Y[i])]);          /* port edge -> centre */
    ring.push([x, 0, topZ(S, 0)]);
    for (i = 1; i < L; i++) ring.push([x, -Y[i], topZ(S, Y[i])]);              /* -> starboard edge */
    for (i = L - 2; i >= 1; i--) ring.push([x, -Y[i], botZ(S, Y[i])]);         /* underside back */
    ring.push([x, 0, botZ(S, 0)]);
    for (i = 1; i <= L - 2; i++) ring.push([x, Y[i], botZ(S, Y[i])]);
    return ring;
  }
  var STN = [0, 0.35, 1, 2, 3.2, 4.5, 5.6, 6.3, 7, 7.8, 8.6, 9.8, 11, 12.5, 14, 15.5, 17, 18.5, 20, 21.5, 23, 24.5, 25.8,
             27.5, 29.3, 31, 32.3, 33.2, 34.5, 36.5, 38.5, 40.5, 42.5, 44.5, 46.5, 48.5, 50.3, 51.8, 53, 53.7, 54.1];

  /* a patch lying on the upper body surface: n0..n1, y0..y1, lifted by off */
  function topPatch(n0, n1, y0, y1, nu, nv, off) {
    var P = [], i, j;
    for (i = 0; i <= nu; i++) {
      var n = lerp(n0, n1, i / nu), S = sect(n), row = [];
      for (j = 0; j <= nv; j++) { var y = lerp(y0, y1, j / nv); row.push([X(n), y, topZ(S, y) + off]); }
      P.push(row);
    }
    return orient(sheet(P), [0, 0, 1]);
  }
  /* a patch on the body side between heights z0..z1 (port if side > 0) */
  function sidePatch(n0, n1, z0, z1, side, nu, nv, off) {
    var P = [], i, j;
    for (i = 0; i <= nu; i++) {
      var n = lerp(n0, n1, i / nu), S = sect(n), row = [];
      for (j = 0; j <= nv; j++) {
        var z = lerp(z0, z1, j / nv), v = clamp((z - S.zw) / (S.zt - S.zw), 0, 1);
        var y = S.B * Math.pow(1 - Math.pow(v, PE), 1 / PE) + off;
        row.push([X(n), side * y, z]);
      }
      P.push(row);
    }
    return orient(sheet(P), [0, side, 0]);
  }

  /* ---------------- outer wings (A plan, starboard wing spread) ---------------- */
  var PIVOT = { n: 28.06, y: 8.37 };      /* measured: the 20 and 65 deg wings of A turn about it  */
  var SPAN_K = 0.968;                     /* A's spread span 57.7 m brought to the published 55.7 m */
  var SWEEP = 0;                          /* the turn from the 20 deg spread; drawn spread          */
  function wpt(n, y, z) {                 /* a spread-wing point (A), pulled in spanwise, swept     */
    var dn = n - PIVOT.n, dy = (y - PIVOT.y) * SPAN_K, c = Math.cos(SWEEP * D2R), s = Math.sin(SWEEP * D2R);
    return [X(PIVOT.n + dn * c + dy * s), PIVOT.y + dy * c - dn * s, z];
  }
  function wingLE(y) { return 25.5 + (y - 8.8) * 0.422; }
  function wingTE(y) { return 32.6 + (y - 8.5) * 0.18; }
  /* stations: [y at LE, y at TE, LE n, TE n, z, thickness] */
  function wingStations() {
    var out = [], Ys = [8.2, 9.6, 12, 15, 18, 21, 24, 26.4], i;
    for (i = 0; i < Ys.length; i++) {
      var y = Ys[i], le = wingLE(y), te = wingTE(y), t = (y - 8.2) / 19.8;
      out.push([y, y, le, te, 4.22 - 0.005 * (y - 8.2), (te - le) * (0.09 - 0.03 * t)]);
    }
    out.push([27.6, 28.1, wingLE(27.6), 36.15, 4.12, 2.4 * 0.05]);
    out.push([28.0, 28.5, wingLE(28.0), 36.2, 4.12, 0.03]);
    return out;
  }
  function wingRing(s, side, m) {
    return foil(s[2], s[3], s[5], m).map(function (p) {
      var n = p[0], f = (n - s[2]) / (s[3] - s[2]), y = lerp(s[0], s[1], f);
      var q = wpt(n, y, s[4] + p[1] * (p[1] > 0 ? 1 : 0.75));
      return [q[0], side * q[1], q[2]];
    });
  }

  /* ---------------- paint: a canvas in four bands (top, port, starboard, belly) ---------------- */
  var PXM = 16, NMIN = -0.4, TWPX = 880;            /* along the body */
  var PYM = 10, YMAX = 28.8, TOPH = 576;            /* across, top and belly bands */
  var PZM = 14, ZTOP = 13.3, SIDEH = 186;           /* height, side bands */
  var TH = TOPH * 2 + SIDEH * 2;
  function pxN(n) { return clamp((n - NMIN) * PXM, 1, TWPX - 1); }
  function pxY(y) { return clamp((YMAX - y) * PYM, 1, TOPH - 1); }
  function pxZ(z) { return clamp((ZTOP - z) * PZM, 1, SIDEH - 1); }
  var PALS = {
    soviet:  { base: "#d4d6d6", belly: "#d0d2d3", line: "rgba(40,44,48,0.16)", weather: true, star: "soviet" },
    russian: { base: "#d4d6d6", belly: "#d0d2d3", line: "rgba(40,44,48,0.14)", weather: false, star: "russian" }
  };
  function starPath(g, cx, cy, rx, ry, k) {
    g.beginPath();
    for (var i = 0; i < 10; i++) {
      var a = -PI / 2 + i * PI / 5, q = (i & 1) ? 0.40 : 1;
      var x = cx + Math.cos(a) * q * rx * k, y = cy + Math.sin(a) * q * ry * k;
      if (i) g.lineTo(x, y); else g.moveTo(x, y);
    }
    g.closePath();
  }
  function star(g, kind, cx, cy, rx, ry) {
    if (kind === "soviet") {            /* red, white border, red edge, as pact_hind_mi24.js */
      g.fillStyle = "#a8261f"; starPath(g, cx, cy, rx, ry, 1.24); g.fill();
      g.fillStyle = "#e2e0d8"; starPath(g, cx, cy, rx, ry, 1.12); g.fill();
      g.fillStyle = "#b22a22"; starPath(g, cx, cy, rx, ry, 1.0); g.fill();
    } else {                            /* B: red with a hair-thin white border, on white */
      g.fillStyle = "#e4e4e0"; starPath(g, cx, cy, rx, ry, 1.08); g.fill();
      g.fillStyle = "#b42b22"; starPath(g, cx, cy, rx, ry, 1.0); g.fill();
    }
  }
  var _cv = {};
  function paint(kind) {
    if (_cv[kind]) return _cv[kind];
    var P = PALS[kind], cv = document.createElement("canvas");
    cv.width = TWPX; cv.height = TH;
    var g = cv.getContext("2d"), s = 16001, i, b, n, y;
    function R() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    var BY = [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH];      /* band tops: top, port, starboard, belly */
    g.fillStyle = P.base; g.fillRect(0, 0, TWPX, TOPH + 2 * SIDEH);
    g.fillStyle = P.belly; g.fillRect(0, BY[3], TWPX, TOPH);
    function line(x0, y0, x1, y1) { g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); }
    g.lineWidth = 1;
    /* --- top and belly: frames across the body, the glove panels, the wing's slat and flaps --- */
    [0, 3].forEach(function (bi) {
      var o = BY[bi];
      g.strokeStyle = P.line;
      [6.3, 11, 14, 17.5, 21, 24.5, 28, 31.5, 35, 38.5, 42, 45.5, 49, 52].forEach(function (fn) {
        var hw = pl(TB, fn) * 0.95; line(pxN(fn), o + pxY(hw), pxN(fn), o + pxY(-hw));
      });
      [1, -1].forEach(function (sd) {
        line(pxN(12), o + pxY(sd * 0.9), pxN(50), o + pxY(sd * 0.7));               /* spine panel edges */
        for (n = 15; n <= 30; n += 3.5) line(pxN(n), o + pxY(sd * pl(TB, n)), pxN(n + 1.6), o + pxY(sd * (pl(TW, n + 1.6) - 0.3)));
        /* the glove's flap-shroud line and pivot box */
        line(pxN(25.8), o + pxY(sd * 8.7), pxN(31.2), o + pxY(sd * 8.7));
        line(pxN(31.2), o + pxY(sd * 8.7), pxN(32.6), o + pxY(sd * 3.2));
        /* the outer wing: slat line, flap hinge line, flap and spoiler breaks (A) */
        var yy, k;
        for (k = 0; k < 2; k++) {
          var fr = k ? 0.72 : 0.13, a0 = wpt(lerp(wingLE(9.6), wingTE(9.6), fr), 9.6, 0), a1 = wpt(lerp(wingLE(27.4), wingTE(27.4), fr), 27.4, 0);
          line(pxN(NOSE - a0[0]), o + pxY(sd * a0[1]), pxN(NOSE - a1[0]), o + pxY(sd * a1[1]));
        }
        [9.6, 20.0, 24.2, 27.4].forEach(function (yy2) {                            /* A: breaks at 20 and 24 m */
          var a = wpt(lerp(wingLE(yy2), wingTE(yy2), 0.72), yy2, 0), c = wpt(wingTE(yy2), yy2, 0);
          line(pxN(NOSE - a[0]), o + pxY(sd * a[1]), pxN(NOSE - c[0]), o + pxY(sd * c[1]));
        });
        for (yy = 11; yy <= 25; yy += 4.6) {
          var e0 = wpt(lerp(wingLE(yy), wingTE(yy), 0.13), yy, 0), e1 = wpt(lerp(wingLE(yy), wingTE(yy), 0.72), yy, 0);
          line(pxN(NOSE - e0[0]), o + pxY(sd * e0[1]), pxN(NOSE - e1[0]), o + pxY(sd * e1[1]));
        }
      });
    });
    /* the grey panel on the nose top ahead of the windscreen (C, D): the stowed probe's bay */
    g.fillStyle = "rgba(150,156,160,0.55)";
    g.beginPath(); g.moveTo(pxN(2.6), pxY(0)); g.lineTo(pxN(6.25), pxY(0.62)); g.lineTo(pxN(6.25), pxY(-0.62)); g.closePath(); g.fill();
    g.strokeStyle = "rgba(60,64,68,0.35)"; g.stroke();
    /* --- sides: frames, the cockpit hatch, nacelle panels, the fin's join and rudder lines --- */
    [1, 2].forEach(function (bi) {
      var o = BY[bi];
      g.strokeStyle = P.line;
      [6.3, 11, 14, 17.5, 21, 24.5, 28, 31.5, 35, 38.5, 42, 45.5, 49, 52].forEach(function (fn) {
        line(pxN(fn), o + pxZ(pl(TZT, fn)), pxN(fn), o + pxZ(pl(TZB, fn)));
      });
      line(pxN(3), o + pxZ(4.5), pxN(52), o + pxZ(4.9));                              /* the chine of the blend */
      g.strokeRect(pxN(11.2), o + pxZ(5.7), 0.9 * PXM, 0.6 * PZM);                    /* crew entry hatch */
      for (n = 25; n <= 35; n += 2.5) line(pxN(n), o + pxZ(3.9), pxN(n), o + pxZ(2.1));  /* nacelle panels */
      line(pxN(24.1), o + pxZ(3.0), pxN(36.4), o + pxZ(3.0));
      g.fillStyle = "rgba(40,44,48,0.55)";                                            /* the nacelle's row of slots (A, B) */
      for (n = 27.2; n < 29.3; n += 0.36) g.fillRect(pxN(n), o + pxZ(3.4), 0.18 * PXM, 0.8 * PZM);
      g.strokeStyle = "rgba(40,44,48,0.38)";
      line(pxN(44.6), o + pxZ(8.55), pxN(50.6), o + pxZ(8.55));                       /* all-moving upper fin join */
      g.strokeStyle = P.line;
      line(pxN(49.0), o + pxZ(8.6), pxN(49.0), o + pxZ(13.0));
      /* nozzle soot on the aft nacelle sides */
      var gr = g.createLinearGradient(pxN(34), 0, pxN(36.6), 0);
      gr.addColorStop(0, "rgba(70,62,52,0)"); gr.addColorStop(1, "rgba(70,62,52,0.35)");
      g.fillStyle = gr; g.fillRect(pxN(34), o + pxZ(3.95), pxN(36.6) - pxN(34), pxZ(2.0) - pxZ(3.95));
    });
    /* weathering: F (1993) shows grey-stained panels on the glove and the fin of a 1990s aircraft */
    if (P.weather) {
      for (i = 0; i < 26; i++) {
        g.fillStyle = "rgba(120,126,130," + (0.10 + R() * 0.12).toFixed(3) + ")";
        n = 14 + R() * 20; y = (R() < 0.5 ? -1 : 1) * (1.5 + R() * 6.5);
        g.fillRect(pxN(n), pxY(y), (0.8 + R() * 2.2) * PXM, (0.4 + R() * 1.2) * PYM);
      }
      for (b = 1; b <= 2; b++) for (i = 0; i < 6; i++) {
        g.fillStyle = "rgba(120,126,130," + (0.10 + R() * 0.12).toFixed(3) + ")";
        g.fillRect(pxN(45 + R() * 4.5), BY[b] + pxZ(7 + R() * 5), (0.6 + R()) * PXM, (0.5 + R() * 1.2) * PZM);
      }
    }
    for (i = 0; i < 70; i++) {                                                      /* light grime */
      g.fillStyle = "rgba(60,58,52," + (0.02 + R() * 0.04).toFixed(3) + ")";
      g.fillRect(R() * TWPX, R() * TH, 8 + R() * 40, 2 + R() * 6);
    }
    /* the national star on both sides of the upper fin (B: 45% up the all-moving fin, near the TE) */
    for (b = 1; b <= 2; b++) star(g, P.star, pxN(48.3), BY[b] + pxZ(10.35), 0.72 * PXM, 0.72 * PZM);
    /* today's row: red stars under the outer wings (E) */
    if (P.star === "russian") [1, -1].forEach(function (sd) {
      var c = wpt(lerp(wingLE(22.5), wingTE(22.5), 0.45), 22.5, 0);
      star(g, "russian", pxN(NOSE - c[0]), BY[3] + pxY(sd * c[1]), 1.0 * PXM, 1.0 * PYM);
    });
    _cv[kind] = cv;
    return cv;
  }
  var _tex = {};
  function skinTexture(kind) {
    if (_tex[kind] !== undefined) return _tex[kind];
    var t = false;
    try {
      t = new V.CanvasTexture(paint(kind));
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = false; }
    _tex[kind] = t;
    return t;
  }
  /* each face takes the band its normal looks into, with UVs in 0..1 */
  function projUV(geo) {
    var p = geo.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nz /= nl; ny /= nl;
      var band = nz > 0.5 ? 0 : nz < -0.5 ? 3 : (ny >= 0 ? 1 : 2);
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U = pxN(NOSE - x), W;
        if (band === 0) W = pxY(y);
        else if (band === 3) W = TOPH + 2 * SIDEH + pxY(y);
        else W = TOPH + (band - 1) * SIDEH + pxZ(z);
        uv[(t / 3 + k) * 2] = U / TWPX;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  function makeMats(C, kind) {
    var m = {}, tc = (C && C.team !== undefined) ? C.team : "#3f7fd0", tex = skinTexture(kind);
    m.skin = new V.MeshStandardMaterial({ color: tex ? 0xffffff : 0xd4d6d6, map: tex || null, roughness: 0.52, metalness: 0.08 });
    m.white = new V.MeshStandardMaterial({ color: 0xd0d2d3, roughness: 0.55, metalness: 0.08 });
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5f6266, roughness: 0.42, metalness: 0.65 });
    m.ink = new V.MeshStandardMaterial({ color: 0x16181a, roughness: 0.90, metalness: 0.05 });
    m.glass = new V.MeshStandardMaterial({ color: 0x27333a, roughness: 0.10, metalness: 0.55,
                                           polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    m.leg = new V.MeshStandardMaterial({ color: 0x9a9fa2, roughness: 0.45, metalness: 0.55 });
    m.tyre = new V.MeshStandardMaterial({ color: 0x151617, roughness: 0.95, metalness: 0.02 });
    return m;
  }

  function build(THREE, M, C, kind) {
    V = THREE;
    var side, K = { skin: [], team: [], metal: [], ink: [], glass: [] }, G = { leg: [], tyre: [], white: [] };

    /* 1. body and glove */
    K.skin.push(loft(STN.map(bodyRing)));

    /* 7. canopy: windscreen (centre post), two side windows a side, the roof hatch glazing; the mast */
    K.glass.push(topPatch(6.45, 7.75, -0.08, -0.78, 3, 3, 0.05));
    K.glass.push(topPatch(6.45, 7.75, 0.08, 0.78, 3, 3, 0.05));
    [1, -1].forEach(function (sd) {
      K.glass.push(sidePatch(7.95, 8.85, 5.55, 5.92, sd, 2, 2, 0.05));
      K.glass.push(sidePatch(9.15, 9.85, 5.6, 5.9, sd, 2, 2, 0.05));
      K.glass.push(topPatch(8.2, 8.9, sd * 0.18, sd * 0.62, 1, 2, 0.05));
    });
    (function () {
      var x0 = X(8.35), z0 = topZ(sect(8.35), 0) - 0.05;
      var pos = [x0 + 0.25, 0, z0, x0 - 0.30, 0, z0, x0 - 0.42, 0, z0 + 0.55, x0 - 0.22, 0, z0 + 0.55];
      var g = new V.BoxGeometry(1, 0.06, 1), arr = g.attributes.position;
      for (var i = 0; i < arr.count; i++) {
        var fx = arr.getX(i) + 0.5, fz = arr.getZ(i) + 0.5, y = arr.getY(i);
        var bx = lerp(pos[0], pos[3], fx), tx = lerp(pos[9], pos[6], fx);
        arr.setXYZ(i, lerp(bx, tx, fz) + (fx - 0.5) * 0 , y, lerp(z0, z0 + 0.55, fz));
      }
      g.computeVertexNormals();
      K.skin.push(g);
    })();

    /* 2. outer wings and the team strip */
    var WS = wingStations();
    for (side = -1; side <= 1; side += 2) {
      K.skin.push(loft(WS.map(function (s) { return wingRing(s, side, 12); })));
      var a = wpt(lerp(wingLE(25.2), wingTE(25.2), 0.3), 25.2, 0), c = wpt(lerp(wingLE(26.4), wingTE(26.4), 0.55), 26.4, 0);
      var tz = 4.135 + (wingTE(25.8) - wingLE(25.8)) * 0.066 * 0.5 + 0.03;     /* on the upper skin */
      var tg = box(Math.abs(a[0] - c[0]) + 0.4, Math.abs(c[1] - a[1]) + 0.2, 0.03, (a[0] + c[0]) / 2, side * (a[1] + c[1]) / 2, tz);
      K.team.push(tg);
    }

    /* 3, 4. nacelles, intakes, nozzles */
    var NS = [[24.25, 1.48, 3.86, 2.24], [24.1, 1.62, 3.98, 2.12], [24.35, 1.7, 4.0, 2.05], [26, 1.72, 4.0, 2.03], [30, 1.72, 4.0, 2.03],
              [34, 1.7, 4.0, 2.06], [35.8, 1.62, 3.95, 2.12], [36.6, 1.5, 3.82, 2.2]];
    for (side = -1; side <= 1; side += 2) {
      var yc = side * 5.05;
      K.skin.push(loft(NS.map(function (q) {
        var p = [], i, N = 24, e = 4.2, zc = (q[2] + q[3]) / 2, bz = (q[2] - q[3]) / 2;
        for (i = 0; i < N; i++) {
          var an = i / N * 2 * PI, co = Math.cos(an), si = Math.sin(an);
          p.push([X(q[0]), yc + q[1] * (co < 0 ? -1 : 1) * Math.pow(Math.abs(co), 2 / e), zc + bz * (si < 0 ? -1 : 1) * Math.pow(Math.abs(si), 2 / e)]);
        }
        return p;
      })));
      /* the two tall rectangular mouths, recessed, either side of the centre wall */
      [-1, 1].forEach(function (k) {
        K.ink.push(box(0.6, 1.28, 1.58, X(24.12) - 0.3, yc + k * 0.8, 3.0));
        K.metal.push(cylX(0.6, 0.6, 0.06, X(24.75), yc + k * 0.8, 3.0, 18));               /* compressor face */
      });
      /* the centre wall: a thin wedge running 0.8 m forward of the lips (A plan) */
      K.skin.push(loft([[23.3, 0.02], [24.1, 0.09], [24.4, 0.1]].map(function (q) {
        return [[X(q[0]), yc + q[1], 3.9], [X(q[0]), yc - q[1], 3.9], [X(q[0]), yc - q[1], 2.14], [X(q[0]), yc + q[1], 2.14]];
      })));
      /* the nozzles, two a nacelle (A, D) */
      [-1, 1].forEach(function (k) {
        var y = yc + k * 0.78;
        K.metal.push(cylX(0.69, 0.76, 2.7, X(37.85), y, 2.98, 16, true));
        K.metal.push(cylX(0.72, 0.72, 0.08, X(39.16), y, 2.98, 16, true));
        K.ink.push(cylX(0.64, 0.64, 0.05, X(38.9), y, 2.98, 16));
        K.metal.push(cylX(0.4, 0.05, 0.6, X(38.9) - 0.32, y, 2.98, 12));                 /* centre body */
      });
    }

    /* 5. fin with its dorsal fillet: [z, LE n, TE n, thickness] */
    var FS = [[5.55, 33.0, 51.6, 0.45], [6.15, 36.5, 51.1, 0.62], [6.8, 39.8, 50.85, 0.68], [7.4, 42.3, 50.7, 0.66],
              [8.0, 43.9, 50.65, 0.6], [9.04, 45.05, 50.62, 0.5], [10.58, 46.5, 50.6, 0.38], [11.92, 47.75, 50.6, 0.27], [13.1, 48.8, 50.6, 0.16]];
    K.skin.push(loft(FS.map(function (q) { return foil(X(q[1]), X(q[2]), q[3], 12).map(function (p) { return [p[0], p[1], q[0]]; }); })));
    /* 6. the tailplane bullet fairing and the tailplane */
    (function () {
      var BP = [[42.5, 0.02], [43.2, 0.22], [44.5, 0.38], [46.5, 0.44], [49.5, 0.44], [51.2, 0.36], [52.0, 0.2], [52.45, 0.03]];
      K.skin.push(loft(BP.map(function (q) {
        var p = [], i; for (i = 0; i < 12; i++) { var an = i / 12 * 2 * PI; p.push([X(q[0]), Math.cos(an) * q[1], 7.82 + Math.sin(an) * q[1] * 0.95]); } return p;
      })));
    })();
    var TP = [[0.3, 43.4, 50.3, 0.42], [1.3, 44.5, 50.4, 0.36], [6.5, 49.4, 51.55, 0.13], [6.62, 49.6, 51.6, 0.06]];
    for (side = -1; side <= 1; side += 2) {
      K.skin.push(loft(TP.map(function (q) {
        return foil(X(q[1]), X(q[2]), q[3], 10).map(function (p) { return [p[0], side * q[0], 7.82 + p[1]]; });
      })));
    }
    /* the tail cone's fairing */
    K.skin.push(cylX(0.34, 0.2, 0.5, X(53.85), 0, 5.2, 12));

    /* 9. undercarriage (retracts: the "gear" group) */
    var nx = X(11.9);
    G.leg.push(rod([nx + 0.1, 0, 3.15], [nx, 0, 0.54], 0.12, 8));
    G.leg.push(rod([nx + 1.3, 0, 3.05], [nx + 0.05, 0, 1.6], 0.06, 6));
    G.leg.push(cylY(0.07, 0.95, nx, 0, 0.54, 8));
    [-0.3, 0.3].forEach(function (dy) { G.tyre.push(cylY(0.54, 0.34, nx, dy, 0.54, 16)); });
    [-1, 1].forEach(function (sd) { G.white.push(box(2.3, 0.04, 0.85, X(13.2), sd * 0.6, 2.72)); });   /* nose bay doors, aft of the leg (B, C) */
    for (side = -1; side <= 1; side += 2) {
      var y0 = side * 2.8, mx = X(30.0);
      G.leg.push(rod([mx - 0.2, y0, 3.3], [mx, y0, 0.95], 0.17, 8));
      G.leg.push(rod([mx - 1.6, y0, 3.25], [mx - 0.05, y0, 1.7], 0.07, 6));
      G.leg.push(rod([mx, y0 - side * 1.0, 3.2], [mx, y0, 1.9], 0.06, 6));
      G.leg.push(rod([X(28.7), y0, 0.8], [X(31.3), y0, 0.8], 0.11, 8));                     /* bogie beam */
      [28.7, 30.0, 31.3].forEach(function (an) {
        G.leg.push(cylY(0.09, 0.95, X(an), y0, 0.63, 8));
        [-0.29, 0.29].forEach(function (dy) { G.tyre.push(cylY(0.63, 0.38, X(an), y0 + dy, 0.63, 16)); });
      });
      G.white.push(box(3.0, 0.04, 0.9, X(29.6), y0 + side * 0.45, 2.75));                   /* main leg door (F) */
    }

    var mats = makeMats(C, kind);
    var root = new V.Group();
    ["skin", "team", "ink", "glass", "metal"].forEach(function (key) {
      if (!K[key].length) return;
      var geo = merge(K[key]);
      if (key === "skin") projUV(geo);
      root.add(new V.Mesh(geo, mats[key]));
    });
    var gear = new V.Group(); gear.name = "gear";
    ["leg", "tyre", "white"].forEach(function (key) { if (G[key].length) gear.add(new V.Mesh(merge(G[key]), mats[key])); });
    root.add(gear);
    return root;
  }
  return { build: build };
})();

UNIT_MODELS["pact_e80_stealthbomber"] = { len: 54.1, build: function (THREE, M, C) { return HeroTu160.build(THREE, M, C, "soviet"); } };
UNIT_MODELS["sbomber_p"] = { len: 54.1, build: function (THREE, M, C) { return HeroTu160.build(THREE, M, C, "russian"); } };
