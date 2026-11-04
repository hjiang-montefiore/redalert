/* ============ ru_bombers.js -- Soviet / Russian HEAVY BOMBER rows: Tu-16A and Tu-22M3 (HERO MODELS) ============

   Three new heavybomber rows draw here (the rows themselves are proposed for js/heavyair.js and
   js/air_specs.js; this file only registers their models):
     pact_e60_heavybomber  "Tu-16A Badger-A"       the Tu-16A, free-fall nuclear bomber
     pact_e90_heavybomber  "Tu-22M3 Backfire-C"    the Tu-22M3, Kh-22M fit, 1990s markings
     pact_e00_heavybomber  "Tu-22M3 Backfire-C"    the Tu-22M3, later fit, Russian markings

   ---------------------------------------------------------------------------------------------
   pact_e60_heavybomber: THE Tu-16A, REUSED. js/hero/ru_tu16.js (HeroTu16Z) already draws the
   Tu-16A airframe with the bomber's seven-gun fit: its header says the Tu-16Z was a converted
   Tu-16A and that NO tanker hose fairing is drawn, so its Soviet-marked build (HeroTu16Z.build,
   natural metal with the red star on the fin and both faces of each wing) IS the Tu-16A, and it
   is registered on that builder unchanged (AGENT_POLICY 5: reuse, never copy). The variant is the
   Tu-16A and not the Tu-16K-10 because that file's references (its A-F: Commons three-view and
   photographs of Badger-A aircraft, the glazed navigator's nose and chin RBP-4 radome) support the
   bomber; the K-10's YeN radome and the K-10S missile were not looked for and are NOT drawn.
   en.wikipedia "Tupolev Tu-16": introduction 1954; the Tu-16A the nuclear-bomb version, 453 built;
   Badger-A 9,000 kg of free-fall weapons. The ru_tu16.js figures stand: 34.8 m x 32.989 m,
   10.355 m high. Note its model space puts z = 0 on the fuselage axis (ground at -3.35), as that
   file explains; the Tu-22M3 below puts z = 0 on the ground, as ru_tu160.js does.

   ---------------------------------------------------------------------------------------------
   pact_e90_heavybomber / pact_e00_heavybomber: THE Tu-22M3 BACKFIRE-C, BUILT NEW (HeroTu22M3).

   REFERENCES (fetched for this file at width 1280-1600 through commons.wikimedia.org/w/thumb.php)
     A "Tupolev Tu-22M3 four-view silhouette.png" (Commons, GVG/PD, used on en.wikipedia "Tupolev
       Tu-22M"; 1600 x 1192 thumb of a 659 px original): plan with the wings at the 20 deg spread,
       plan at 65 deg, side and front views. Measured row by row and column by column on the
       black silhouette (tools: a run-length profile of each pixel row / column):
         plan:  nose tip row 26 to the tailplane tips row 810 = 784 px = 42.46 m (ru.wikipedia:
                length 42.46 m "by the stabiliser", 42.16 m by the fin) -> 18.47 px/m along X.
                Its span comes out 625 px = 33.84 m against the published 34.28 m, so the OUTER
                WING is brought out spanwise by 1.022 about its root at 6.74 m (the glove, body,
                intakes and tailplane are kept at 18.47 px/m).
         side:  nose tip col 1327.5 to the fin's rearmost point col 581 = 746.5 px = 42.16 m (the
                published length by the fin) -> 17.71 px/m. Every height below is off this view.
         front: used only for the main-gear track (span scale, 17.62 px/m): 6.76 m.
     B "Tu-22M3 Russian Air Force, Soltsy.jpg" (14 March 2007): climbing out, gear down: light
       grey and white overall, a small red star high on the fin, the six-wheel main bogies.
     C "Tupolev Tu-22M-3, Ukraine - Air Force AN1191613.jpg" (24 July 2000): rotating, side-on
       three-quarter: the tall box intakes standing off the body, the low glove, the dorsal fillet
       running far forward to the fin, the twin nozzles side by side under the tail turret, the
       low dihedral tailplane, the 2 x 3 main bogies, light grey with white undersides.
     D "Tupolev Tu-22M3 at Ryazan Dyagilevo.jpg" (2015): four aircraft head-on taxiing, wings
       spread: the tall rectangular intake mouths either side of the nose, the three-pane
       windscreen, the twin nose wheels, the main legs well outboard of the intakes, the outer
       wings flat (no dihedral), red stars with a thin white border on the upper outer wings.
     Published figures (ru.wikipedia "Tu-22M", Tu-22M3 of the 90th series; en.wikipedia "Tupolev
       Tu-22M", specifications): length 42.46 m by the tailplane and 42.16 m by the fin, span
       34.28 m at 20 deg and 23.30 m at 65 deg, height 11.05 m; wing dihedral 0 deg; centre wing
       (glove) leading edge 56 deg, trailing edge 0 deg; tailplane leading edge 59 deg and
       dihedral +8 deg; nose leg two wheels, main legs six wheels each, retracting into the
       fuselage under very large doors; "all Tu-22M2 and M3 were painted white underneath and
       light grey on the sides and top"; the UKU-9A-502M tail mount with one GSh-23 under the
       Krypton radar fairing; tactical numbers red (not drawn).

   MEASURED (A) AGAINST PUBLISHED
     length 42.46 m (A plan, the scale) = published 42.46 m; fin trailing edge 42.04 m (A side; 42.16)
     span 34.28 m after the 1.022 spanwise correction (published 34.28 m; A alone 33.84 m)
     height 10.53 m at the fin tip, off A's side view (published 11.05 m): NOT fitted. A's side
       view stands 4.7% short of the figure on its own length scale; its wheels are drawn smaller
       than photographs B-D show and the drawing's gear is not compressed to the ground, so most of
       the difference is likely the drawing's gear and fin; it is reported, not stretched.
     glove LE sweep 56.3 deg (A, published 56); outer LE 18.4 deg at the drawn spread (A: the "20
       deg" spread is the quarter-chord figure); tailplane LE 60 deg (A, published 59).

   RECOGNITION LIST (each drawn; the reference; where)
     1. long, deep, tall-oval forward fuselage with the pointed radome, the nose rising to a
        stepped windscreen at 6.2-7.8 m, the shallow ventral bulge ahead of the nose leg at
        9.5-11.5 m (A side and plan, C)                                   [skin loft, glass]
     2. the big box intakes alongside, mouths at 12.4 m, 1.0 m wide, standing 0.25 m off the body
        for the first metre (A plan gap, D)                               [skin, ink mouths]
     3. the low fixed glove, 56 deg LE, straight TE at 29.7 m, to 6.74 m out (A plan, C)  [skin]
     4. the outer wings at the 20 deg spread, flat, 1.4 m tip chord (A plan, D)            [skin]
     5. the wide boxy engine section behind the glove narrowing to the TWIN NOZZLES side by side
        at 40.55 m (A plan and side, C)                                    [skin, metal, ink]
     6. the fin with its very long low dorsal fillet from 22.5 m, LE 59 deg from the vertical
        (A side, C)                                                       [skin]
     7. the low tailplane, LE 60 deg, swept TE, +8 deg dihedral, tips 42.46 m aft (A, C; ru.wiki)
     8. the tail gun mount under the fin trailing edge, its single barrel, the radar fairing
        above it (A side: barrel at 4.74 m, fairing at 5.65 m; C; ru.wiki)  [skin, metal]
     9. gear: twin nose wheels at 11.6 m with the door behind the leg (A side), two six-wheel
        three-axle main bogies at 25.2-27.5 m on a 6.76 m track (A side and front, B, C, D), the
        large main doors (C, ru.wiki)                                     ["gear"]
    10. paint: light grey top and sides, white underneath (ru.wiki; C, D); the side windows and
        the 2 x 2 louvres over the intakes at 22 m (A); the red star (below).

   THE SWEEP. Drawn at the 20 deg spread a parked, taxiing or landing aircraft shows (A, C, D), as
   ru_tu160.js and ru_su24.js draw theirs. No "wingfold" or sweep node: render3d.js folds wings only
   for carrier aircraft (tools/jsc/wingfold_check.js holds that nothing else has one).

   THE TWO ROWS. No visible difference in FINISH between the 1990s and the 2000s-2010s was found:
   C (2000) and D (2015) sample the same light blue-grey (lit 168-185 / 175-193 / 185-210) over
   white, and ru.wikipedia gives one scheme for every service Tu-22M2/M3. What does differ is the
   national marking: D (2015) shows the post-2010 Russian star (red, a thin white border) on the
   upper outer wings. So both rows take one airframe and one paint; pact_e90 carries a red star on
   the fin as B shows (the Soviet-pattern star, red with a white and a red border, as
   ru_tu160.js's 1980s row and ru_tu16.js draw it), and pact_e00 carries the Russian star on the fin
   and on both upper outer wings as D shows.

   NOT CONFIRMED (estimated, not measured or published)
     - fuselage and intake HALF-HEIGHTS above and below the mid line where A's side silhouette is
       hidden by the intakes (12.4-29 m): the body is drawn 2.1 to 4.75 m, the intake boxes 2.05
       to 4.35 m (D shows them nearly body-height); the intake lips are drawn square to the axis,
       their rake and the wedge ramp inside are not drawn.
     - wheel sizes: about 1.0 m main and nose tyres (scaled off C and D by eye; A draws them
       smaller). The glove and wing thickness (t/c 0.06 to 0.08). The fin's thickness.
     - the Soviet-pattern border on the e90 fin star (B is too small to show the border).
     - whether the fin star was carried with the wing stars on every e00 aircraft.
   Not drawn: Kh-22 / Kh-32 missiles and their pylons, the MBD3 racks, the refuelling probe (removed
   under SALT; ru/en.wikipedia), bort numbers, guards badges, the 1990s shark mouths.

   Markings beyond the star: none. Team colour (C.team): a small strip on each upper outer wing
   near the tip. Model space +X nose, +Y port, +Z up, metres; z = 0 the ground (tyre bottoms).
   ============================================================================================ */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTu22M3 = (function () {
  "use strict";
  var V = null, PI = Math.PI, D2R = PI / 180;
  var NOSE = 21.23;                     /* x of the nose tip; the tables use d, metres aft of it */
  function X(d) { return NOSE - d; }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function pl(tab, d, c) {
    var i; c = c || 1;
    if (d <= tab[0][0]) return tab[0][c];
    for (i = 0; i + 1 < tab.length; i++) if (d <= tab[i + 1][0]) {
      return lerp(tab[i][c], tab[i + 1][c], (d - tab[i][0]) / (tab[i + 1][0] - tab[i][0]));
    }
    return tab[tab.length - 1][c];
  }
  function yt(f, tc) {
    return tc * (1.4845 * Math.sqrt(f) - 0.6300 * f - 1.7580 * f * f + 1.4215 * f * f * f - 0.5075 * f * f * f * f);
  }
  /* airfoil ring: [chord fraction, thickness offset / chord], LE first */
  function foil(m, tc) {
    var p = [], i, f;
    for (i = 0; i <= m; i++) { f = 0.5 * (1 - Math.cos(PI * i / m)); p.push([f, yt(f, tc)]); }
    for (i = m - 1; i >= 1; i--) { f = 0.5 * (1 - Math.cos(PI * i / m)); p.push([f, -yt(f, tc)]); }
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
    var vol = 0, mx = 0, my = 0, mz = 0, np = pos.length / 3;
    for (i = 0; i < np; i++) { mx += pos[3 * i]; my += pos[3 * i + 1]; mz += pos[3 * i + 2]; }
    mx /= np; my /= np; mz /= np;
    for (i = 0; i < idx.length; i += 3) {
      var A = idx[i] * 3, B = idx[i + 1] * 3, Cc = idx[i + 2] * 3;
      var ax = pos[A] - mx, ay = pos[A + 1] - my, az = pos[A + 2] - mz;
      var bx = pos[B] - mx, by = pos[B + 1] - my, bz = pos[B + 2] - mz;
      var qx = pos[Cc] - mx, qy = pos[Cc + 1] - my, qz = pos[Cc + 2] - mz;
      vol += ax * (by * qz - bz * qy) - ay * (bx * qz - bz * qx) + az * (bx * qy - by * qx);
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
  function cylY(r, w, x, y, z, seg) { var g = new V.CylinderGeometry(r, r, w, seg || 18); g.translate(x, y, z); return g; }
  function rod(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r, r, L, seg || 8);
    var q = new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L));
    var m = new V.Matrix4().makeRotationFromQuaternion(q);
    m.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(m); return g;
  }
  function ell(rx, ry, rz, x, y, z, ws, hs) {
    var g = new V.SphereGeometry(1, ws || 14, hs || 9);
    g.scale(rx, ry, rz); g.translate(x, y, z); return g;
  }
  /* a quad grid surface P[i][j], every face turned to look along dir */
  function sheet(P, dir) {
    var pos = [], i, j;
    for (i = 0; i + 1 < P.length; i++) for (j = 0; j + 1 < P[i].length; j++) {
      var a = P[i][j], b = P[i + 1][j], c = P[i + 1][j + 1], d = P[i][j + 1];
      [a, b, c, a, c, d].forEach(function (q) { pos.push(q[0], q[1], q[2]); });
    }
    for (i = 0; i < pos.length; i += 9) {
      var ux = pos[i + 3] - pos[i], uy = pos[i + 4] - pos[i + 1], uz = pos[i + 5] - pos[i + 2];
      var vx = pos[i + 6] - pos[i], vy = pos[i + 7] - pos[i + 1], vz = pos[i + 8] - pos[i + 2];
      var dd = (uy * vz - uz * vy) * dir[0] + (uz * vx - ux * vz) * dir[1] + (ux * vy - uy * vx) * dir[2];
      if (dd < 0) for (j = 0; j < 3; j++) { var t = pos[i + 3 + j]; pos[i + 3 + j] = pos[i + 6 + j]; pos[i + 6 + j] = t; }
    }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
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

  /* ---------------- station tables (A; d aft of the nose, heights above the ground) ---------------- */
  /* fuselage: d, half width (A plan), top z, bottom z (A side), superellipse power */
  var FUS = [
    [0.00, 0.02, 3.10, 3.10, 2.0], [0.43, 0.14, 3.15, 2.96, 2.0], [1.00, 0.28, 3.25, 2.82, 2.0],
    [1.55, 0.40, 3.32, 2.68, 2.0], [2.13, 0.52, 3.40, 2.52, 2.0], [2.68, 0.62, 3.45, 2.40, 2.0],
    [3.25, 0.70, 3.52, 2.30, 2.05], [3.80, 0.76, 3.58, 2.23, 2.1], [4.40, 0.80, 3.68, 2.17, 2.1],
    [5.50, 0.81, 3.80, 2.12, 2.15], [6.20, 0.82, 3.88, 2.12, 2.2], [7.00, 0.85, 4.25, 2.12, 2.3],
    [7.80, 0.88, 4.55, 2.12, 2.4], [9.00, 0.95, 4.60, 2.10, 2.4], [9.8, 0.96, 4.61, 1.95, 2.4], [10.5, 0.97, 4.62, 1.92, 2.4],
    [11.4, 1.0, 4.64, 1.98, 2.4], [12.0, 1.03, 4.66, 2.12, 2.4], [13.2, 1.05, 4.67, 2.10, 2.5], [14.2, 1.32, 4.68, 2.08, 3.0],
    [24.0, 1.32, 4.75, 2.05, 3.0], [27.5, 1.40, 4.75, 2.00, 3.0], [28.6, 2.00, 4.74, 1.90, 3.2],
    [29.6, 2.36, 4.73, 1.85, 3.4], [33.0, 2.32, 4.72, 1.84, 3.4], [35.5, 2.20, 4.68, 2.00, 3.2],
    [37.5, 2.05, 4.60, 2.18, 3.0], [39.5, 1.85, 4.50, 2.40, 2.8], [40.4, 1.75, 4.42, 2.60, 2.6],
    [40.5, 1.40, 4.30, 2.75, 2.6]
  ];
  var FUS_D = [0, 0.15, 0.43, 0.75, 1.0, 1.55, 2.13, 2.68, 3.25, 3.8, 4.4, 5.0, 5.5, 6.2, 6.6, 7.0, 7.4, 7.8, 8.4, 9.0,
               9.8, 10.5, 11.4, 12.0, 12.6, 13.2, 13.7, 14.2, 16, 18, 20, 22, 24, 26, 27.5, 28.1, 28.6, 29.1, 29.6, 31, 33,
               34.3, 35.5, 36.5, 37.5, 38.5, 39.5, 40.0, 40.4, 40.5];
  function sect(d) { return [pl(FUS, d, 1), pl(FUS, d, 2), pl(FUS, d, 3), pl(FUS, d, 4)]; }
  function sgnp(v, e) { return (v < 0 ? -1 : 1) * Math.pow(Math.abs(v), e); }
  function fusPt(d, t) {
    var s = sect(d), e = 2 / s[3], c = Math.cos(t), sn = Math.sin(t), zc = (s[1] + s[2]) / 2, hh = (s[1] - s[2]) / 2;
    return [X(d), s[0] * sgnp(c, e), zc + hh * sgnp(sn, e)];
  }
  /* the body's side at height z (port, y > 0) */
  function fusY(d, z) {
    var s = sect(d), e = s[3], zc = (s[1] + s[2]) / 2, hh = (s[1] - s[2]) / 2, v = clamp(Math.abs(z - zc) / hh, 0, 1);
    return s[0] * Math.pow(1 - Math.pow(v, e), 1 / e);
  }
  function fusTopZ(d, y) {
    var s = sect(d), e = s[3], zc = (s[1] + s[2]) / 2, hh = (s[1] - s[2]) / 2, u = clamp(Math.abs(y) / s[0], 0, 1);
    return zc + hh * Math.pow(1 - Math.pow(u, e), 1 / e);
  }
  /* intakes: d, inner y, outer y, bottom z, top z (A plan; heights NOT CONFIRMED) */
  var INT = [[12.4, 1.30, 2.27, 2.05, 4.30], [13.4, 1.30, 2.33, 2.05, 4.32], [15.0, 1.30, 2.38, 2.05, 4.35],
             [27.0, 1.30, 2.38, 2.02, 4.35], [28.8, 1.30, 2.36, 1.95, 4.33], [29.4, 1.40, 2.30, 1.92, 4.30]];
  /* glove: y, LE d, TE d, thickness; chord plane z = WZ (low wing; A front, C, D) */
  var WZ = 2.38;
  function gloveLE(y) { return 19.55 + (y - 2.76) * 1.5; }
  var GLOVE = [[2.2, gloveLE(2.2), 29.67, 0.66], [2.38, gloveLE(2.38), 29.67, 0.64], [4.5, gloveLE(4.5), 29.67, 0.48],
               [6.74, gloveLE(6.74), 29.67, 0.32]];
  /* outer wing at the 20 deg spread: plan y, LE d, TE d, t/c (A plan; y brought out by 1.022 about 6.74) */
  var YR = 6.74, SPANK = 1.022;
  var OWING = [[6.70, 25.48, 29.78, 0.075], [11.0, 26.95, 29.99, 0.068], [14.5, 28.14, 30.17, 0.063],
               [16.62, 28.86, 30.27, 0.06], [16.84, 29.45, 30.27, 0.055], [16.92, 29.85, 30.25, 0.05]];
  function wy(y) { return YR + (y - YR) * SPANK; }
  /* tailplane: y, LE d, TE d, t/c (A plan); dihedral +8 deg (ru.wiki), root at the body's foot */
  var TP = [[1.3, 32.6, 39.5, 0.06], [2.1, 33.9, 39.74, 0.055], [3.5, 36.35, 40.82, 0.05], [5.0, 38.95, 41.95, 0.045],
            [5.86, 40.3, 42.32, 0.04], [5.9, 40.9, 42.46, 0.035]];
  function tpz(y) { return 2.45 + (Math.abs(y) - 2.1) * Math.tan(8 * D2R); }
  /* fin: z, LE d, TE d, thickness (A side; thickness NOT CONFIRMED) */
  var FIN = [[4.55, 22.0, 40.6, 0.9], [4.83, 23.9, 40.62, 0.85], [5.0, 25.1, 40.65, 0.8], [5.34, 27.2, 40.7, 0.72],
             [5.67, 29.8, 40.75, 0.62], [6.18, 33.4, 40.8, 0.5], [7.88, 36.6, 41.25, 0.38], [9.57, 39.1, 41.75, 0.26],
             [10.4, 40.3, 42.0, 0.18], [10.53, 40.6, 42.04, 0.12]];

  /* ---------------- paint: a canvas in four bands (top, port, starboard, belly) ---------------- */
  var PXM = 20, DMIN = -0.4, TWPX = 880;            /* along the body */
  var PYM = 14, YMAX = 17.6, TOPH = 496;            /* across, top and belly bands */
  var PZM = 16, ZTOP = 10.9, SIDEH = 176;           /* height, side bands */
  var TH = TOPH * 2 + SIDEH * 2;
  function pxD(d) { return clamp((d - DMIN) * PXM, 1, TWPX - 1); }
  function pxY(y) { return clamp((YMAX - y) * PYM, 1, TOPH - 1); }
  function pxZ(z) { return clamp((ZTOP - z) * PZM, 1, SIDEH - 1); }
  function starPath(g, cx, cy, rx, ry, k, rot) {
    g.beginPath();
    for (var i = 0; i < 10; i++) {
      var a = (rot || -PI / 2) + i * PI / 5, q = (i & 1) ? 0.40 : 1;
      var x = cx + Math.cos(a) * q * rx * k, y = cy + Math.sin(a) * q * ry * k;
      if (i) g.lineTo(x, y); else g.moveTo(x, y);
    }
    g.closePath();
  }
  function star(g, kind, cx, cy, rx, ry, rot) {
    if (kind === "soviet") {            /* red, white border, red edge, as ru_tu160.js's 1980s row */
      g.fillStyle = "#a8261f"; starPath(g, cx, cy, rx, ry, 1.24, rot); g.fill();
      g.fillStyle = "#e2e0d8"; starPath(g, cx, cy, rx, ry, 1.12, rot); g.fill();
      g.fillStyle = "#b22a22"; starPath(g, cx, cy, rx, ry, 1.0, rot); g.fill();
    } else {                            /* D: red with a thin white border */
      g.fillStyle = "#e4e4e0"; starPath(g, cx, cy, rx, ry, 1.08, rot); g.fill();
      g.fillStyle = "#b42b22"; starPath(g, cx, cy, rx, ry, 1.0, rot); g.fill();
    }
  }
  /* the light blue-grey of C and D (lit 168-185 / 175-193 / 185-210) taken to about 0.9; white below */
  var GREY = "#a9b0bc", WHITE = "#d3d5d6", WHITE_Z = 2.55;
  var _cv = {};
  function paint(kind) {
    if (_cv[kind]) return _cv[kind];
    var cv = document.createElement("canvas");
    cv.width = TWPX; cv.height = TH;
    var g = cv.getContext("2d"), s = 22013, i, d;
    function R() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    function line(x0, y0, x1, y1) { g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); }
    var BY = [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH];
    g.fillStyle = GREY; g.fillRect(0, 0, TWPX, TOPH + 2 * SIDEH);
    g.fillStyle = WHITE; g.fillRect(0, BY[3], TWPX, TOPH);
    /* the sides: white below the demarcation, grey above (C) */
    [1, 2].forEach(function (b) { g.fillStyle = WHITE; g.fillRect(0, BY[b] + pxZ(WHITE_Z), TWPX, SIDEH - pxZ(WHITE_Z)); });
    /* sheets differ a little in tone (C) */
    for (i = 0; i < 260; i++) {
      g.fillStyle = (R() < 0.5 ? "rgba(196,202,212," : "rgba(130,138,150,") + (0.05 + R() * 0.08).toFixed(3) + ")";
      g.fillRect(R() * TWPX, R() * (TOPH + 2 * SIDEH), (0.8 + R() * 2) * PXM, (0.4 + R() * 1.2) * PYM);
    }
    g.lineWidth = 1;
    /* frames on every band */
    [0, 1, 2, 3].forEach(function (b) {
      var o = BY[b];
      g.strokeStyle = "rgba(50,56,64,0.20)";
      for (d = 2.5; d < 40; d += 1.6) {
        if (b === 0 || b === 3) { var hw = pl(FUS, d, 1) * 0.95; line(pxD(d), o + pxY(hw), pxD(d), o + pxY(-hw)); }
        else line(pxD(d), o + pxZ(pl(FUS, d, 2) - 0.05), pxD(d), o + pxZ(pl(FUS, d, 3) + 0.05));
      }
    });
    /* top and belly: the glove joint, slat and flap lines on the outer wing, tailplane hinge (A) */
    [0, 3].forEach(function (b) {
      var o = BY[b];
      [1, -1].forEach(function (sd) {
        g.strokeStyle = "rgba(30,34,40,0.42)";
        line(pxD(gloveLE(6.74)), o + pxY(sd * 6.74), pxD(29.7), o + pxY(sd * 6.74));             /* glove / wing joint */
        g.strokeStyle = "rgba(40,46,54,0.30)";
        [0.12, 0.72].forEach(function (f) {
          var a = OWING[0], e = OWING[3];
          line(pxD(lerp(a[1], a[2], f)), o + pxY(sd * wy(a[0])), pxD(lerp(e[1], e[2], f)), o + pxY(sd * wy(e[0])));
        });
        [9.6, 13.0].forEach(function (yb) {                                                    /* flap / aileron breaks */
          var w = [pl(OWING, yb, 1), pl(OWING, yb, 2)];
          line(pxD(lerp(w[0], w[1], 0.72)), o + pxY(sd * wy(yb)), pxD(w[1]), o + pxY(sd * wy(yb)));
        });
        line(pxD(25.0), o + pxY(sd * 3.0), pxD(29.6), o + pxY(sd * 3.0));                       /* glove flap line */
        line(pxD(lerp(TP[1][1], TP[1][2], 0.7)), o + pxY(sd * 2.1), pxD(lerp(TP[4][1], TP[4][2], 0.7)), o + pxY(sd * 5.8));
      });
    });
    /* the 2 x 2 louvres on top of each intake trunk at 21.6-22.7 m (A plan) */
    g.fillStyle = "rgba(40,44,50,0.65)";
    [1, -1].forEach(function (sd) {
      for (var a = 0; a < 2; a++) for (var b2 = 0; b2 < 2; b2++)
        g.fillRect(pxD(21.6 + a * 0.6), pxY(sd * 1.8 + 0.25 - b2 * 0.5) - 3, 0.45 * PXM, 0.35 * PYM);
    });
    /* sides: the crew windows (A side), the intake trunk louvres (A side 22.6-23.7 m), soot at the nozzles */
    [1, 2].forEach(function (b) {
      var o = BY[b];
      g.fillStyle = "rgba(22,28,34,0.85)";
      g.fillRect(pxD(7.35), o + pxZ(4.35), 0.4 * PXM, 0.3 * PZM);
      g.fillRect(pxD(9.85), o + pxZ(4.45), 0.4 * PXM, 0.3 * PZM);
      g.fillStyle = "rgba(40,44,50,0.55)";
      for (var a = 0; a < 3; a++) for (var b2 = 0; b2 < 2; b2++) g.fillRect(pxD(22.6 + a * 0.38), o + pxZ(4.15 - b2 * 0.3), 0.25 * PXM, 0.2 * PZM);
      g.strokeStyle = "rgba(40,46,54,0.35)";
      line(pxD(41.0), o + pxZ(5.3), pxD(41.9), o + pxZ(10.3));                                  /* rudder hinge line */
      g.strokeRect(pxD(8.6), o + pxZ(3.9), 0.9 * PXM, 1.0 * PZM);                               /* crew hatch */
      var gr = g.createLinearGradient(pxD(37.5), 0, pxD(40.5), 0);
      gr.addColorStop(0, "rgba(70,62,52,0)"); gr.addColorStop(1, "rgba(70,62,52,0.4)");
      g.fillStyle = gr; g.fillRect(pxD(37.5), o + pxZ(4.2), pxD(40.5) - pxD(37.5), pxZ(2.4) - pxZ(4.2));
    });
    for (i = 0; i < 70; i++) {                                                                  /* light grime */
      g.fillStyle = "rgba(60,58,52," + (0.02 + R() * 0.04).toFixed(3) + ")";
      g.fillRect(R() * TWPX, R() * TH, 8 + R() * 40, 2 + R() * 6);
    }
    /* the national star high on the fin, both sides (B) */
    for (var bb = 1; bb <= 2; bb++) star(g, kind, pxD(38.6), BY[bb] + pxZ(8.35), 0.7 * PXM, 0.7 * PZM);
    /* today's row: stars on the upper outer wings (D) */
    if (kind === "russian") [1, -1].forEach(function (sd) {
      var y = wy(14.0), dc = lerp(pl(OWING, 14.0, 1), pl(OWING, 14.0, 2), 0.5);
      star(g, "russian", pxD(dc), pxY(sd * y), 0.9 * PXM, 0.9 * PYM, PI);
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
  /* each face takes the band its normal looks into; UVs in 0..1 */
  function projUV(geo) {
    var p = geo.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1, cy = (p[t + 1] + p[t + 4] + p[t + 7]) / 3;
      nz /= nl; ny /= nl;
      var band = nz > 0.5 ? 0 : nz < -0.5 ? 3 : (Math.abs(ny) > 0.05 ? (ny > 0 ? 1 : 2) : (cy >= 0 ? 1 : 2));
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U = pxD(NOSE - x), W;
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
    m.skin = new V.MeshStandardMaterial({ color: tex ? 0xffffff : 0xa9b0bc, map: tex || null, roughness: 0.55, metalness: 0.08 });
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5c6064, roughness: 0.42, metalness: 0.65 });
    m.ink = new V.MeshStandardMaterial({ color: 0x15171a, roughness: 0.90, metalness: 0.05 });
    m.glass = new V.MeshStandardMaterial({ color: 0x27333a, roughness: 0.10, metalness: 0.55,
                                           polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    m.leg = new V.MeshStandardMaterial({ color: 0x8f969c, roughness: 0.45, metalness: 0.55 });
    m.tyre = new V.MeshStandardMaterial({ color: 0x151617, roughness: 0.95, metalness: 0.02 });
    m.white = new V.MeshStandardMaterial({ color: 0xcfd2d4, roughness: 0.55, metalness: 0.08, side: V.DoubleSide });
    return m;
  }

  /* ---------------- parts ---------------- */
  function addBody(K) {
    var N = 28;
    K.skin.push(loft(FUS_D.map(function (d) {
      var r = [], j; for (j = 0; j < N; j++) r.push(fusPt(d, j / N * 2 * PI)); return r;
    })));
    /* the windscreen: three panes on the rising nose top 6.25-7.75 m (A side, D) */
    [[-0.72, -0.26], [-0.24, 0.24], [0.26, 0.72]].forEach(function (yy) {
      var P = [], i, j;
      for (i = 0; i <= 3; i++) {
        var d = lerp(6.3, 7.75, i / 3), row = [];
        for (j = 0; j <= 2; j++) { var y = lerp(yy[0], yy[1], j / 2) * (0.75 + 0.25 * i / 3); row.push([X(d), y, fusTopZ(d, y) + 0.03]); }
        P.push(row);
      }
      K.glass.push(sheet(P, [0.6, 0, 1]));
    });
    /* side windows: the pilots' behind the windscreen and the navigators' at 9.9 m (A side) */
    [1, -1].forEach(function (sd) {
      [[7.85, 8.45, 4.05, 4.4], [9.85, 10.25, 4.12, 4.42]].forEach(function (w) {
        var P = [], i, j;
        for (i = 0; i <= 1; i++) { var row = []; for (j = 0; j <= 1; j++) {
          var d = lerp(w[0], w[1], i), z = lerp(w[2], w[3], j); row.push([X(d), sd * (fusY(d, z) + 0.03), z]); }
          P.push(row); }
        K.glass.push(sheet(P, [0, sd, 0]));
      });
    });
    /* the blade aerial on the spine at 9.1 m (A side) */
    K.metal.push(box(0.35, 0.05, 0.3, X(9.1), 0, 4.75));
  }
  function addIntakes(K) {
    [1, -1].forEach(function (sd) {
      var rings = INT.map(function (q) {
        var r = [], yi = q[1], yo = q[2], zb = q[3], zt = q[4], c = 0.12;
        [[yo - c, zt], [yo, zt - c], [yo, zb + c], [yo - c, zb], [yi + c, zb], [yi, zb + c], [yi, zt - c], [yi + c, zt]]
          .forEach(function (p) { r.push([X(q[0]), sd * p[0], p[1]]); });
        return r;
      });
      K.skin.push(loft(rings));
      /* the dark mouth, inset from the lip (D), and the compressor face far down the duct */
      var q = INT[0];
      K.ink.push(box(0.04, q[2] - q[1] - 0.14, q[4] - q[3] - 0.14, X(q[0]) + 0.015, sd * (q[1] + q[2]) / 2, (q[3] + q[4]) / 2));
      /* the splitter gap between body and intake for the first metre (A plan): a dark slot */
      K.ink.push(box(1.0, 0.2, 1.9, X(12.95), sd * 1.18, 3.2));
      /* a boundary-layer plate joining the intake top to the body behind the gap */
      K.skin.push(box(15.4, 0.3, 0.06, X(21.6), sd * 1.2, 4.28));
    });
  }
  function addWings(K) {
    [1, -1].forEach(function (sd) {
      /* the glove (A plan: LE 56 deg, TE straight at 29.67 m) */
      K.skin.push(loft(GLOVE.map(function (w) {
        var c = w[2] - w[1];
        return foil(10, w[3] / c).map(function (p) { return [X(w[1] + p[0] * c), sd * w[0], WZ + p[1] * c]; });
      })));
      /* the outer wing at the 20 deg spread, flat (A, D) */
      K.skin.push(loft(OWING.map(function (w) {
        var c = w[2] - w[1];
        return foil(10, w[3]).map(function (p) { return [X(w[1] + p[0] * c), sd * wy(w[0]), WZ - 0.02 + p[1] * c]; });
      })));
      /* team strip: a small panel on the upper wing near the tip */
      var y0 = 15.4, y1 = 16.4, P = [], i, j;
      for (i = 0; i <= 2; i++) {
        var y = lerp(y0, y1, i / 2), le = pl(OWING, y, 1), te = pl(OWING, y, 2), c = te - le, tc = pl(OWING, y, 3), row = [];
        for (j = 0; j <= 2; j++) { var f = lerp(0.25, 0.6, j / 2); row.push([X(le + f * c), sd * wy(y), WZ - 0.02 + yt(f, tc) * c + 0.02]); }
        P.push(row);
      }
      K.team.push(sheet(P, [0, 0, 1]));
    });
  }
  function addTail(K) {
    /* fin with its long dorsal fillet (A side) */
    K.skin.push(loft(FIN.map(function (f) {
      var c = f[2] - f[1];
      return foil(12, f[3] / c).map(function (p) { return [X(f[1] + p[0] * c), p[1] * c, f[0]]; });
    })));
    /* tailplane, +8 deg dihedral (A plan, ru.wiki) */
    [1, -1].forEach(function (sd) {
      K.skin.push(loft(TP.map(function (t) {
        var c = t[2] - t[1];
        return foil(9, t[3]).map(function (p) { return [X(t[1] + p[0] * c), sd * t[0], tpz(t[0]) + p[1] * c]; });
      })));
    });
    /* twin nozzles side by side (A plan and side, C) */
    [1, -1].forEach(function (sd) {
      K.metal.push(cylX(0.66, 0.7, 1.2, X(39.95), sd * 0.86, 3.32, 18, true));
      K.metal.push(cylX(0.68, 0.68, 0.06, X(40.52), sd * 0.86, 3.32, 18, true));
      K.ink.push(cylX(0.62, 0.62, 0.04, X(40.4), sd * 0.86, 3.32, 18));
    });
    /* the tail gun mount under the fin trailing edge, its barrel at 4.74 m to 41.7 m, and the radar
       fairing above at 5.65 m (A side, C, ru.wiki) */
    K.skin.push(ell(0.75, 0.42, 0.42, X(40.75), 0, 4.55, 14, 9));
    K.metal.push(rod([X(41.0), 0, 4.70], [X(41.72), 0, 4.74], 0.05, 6));
    K.skin.push(ell(0.55, 0.22, 0.3, X(40.95), 0, 5.65, 12, 7));
  }
  function addGear(G) {
    /* nose: twin wheels at 11.6 m (A side, D), the door aft of the leg hanging to 1.55 m (A side) */
    var nd = 11.6, nr = 0.5;
    [1, -1].forEach(function (k) {
      G.tyre.push(cylY(nr, 0.3, X(nd), k * 0.28, nr, 18));
      G.leg.push(cylY(0.22, 0.32, X(nd), k * 0.28, nr, 10));
    });
    G.leg.push(rod([X(nd - 0.25), 0, 2.15], [X(nd), 0, nr], 0.1, 8));
    G.leg.push(rod([X(nd), -0.45, nr], [X(nd), 0.45, nr], 0.05, 6));
    G.leg.push(rod([X(nd + 1.0), 0, 2.1], [X(nd + 0.05), 0, nr + 0.85], 0.05, 6));
    [1, -1].forEach(function (k) { G.white.push(box(1.2, 0.04, 0.55, X(13.0), k * 0.42, 1.83)); });
    /* mains: three axles of two at 25.2, 26.35, 27.5 m (A side), track 6.76 m (A front), legs coming
       down out of the body sides under the big doors (C, D; ru.wiki) */
    var mr = 0.5, ax = [25.2, 26.35, 27.5];
    [1, -1].forEach(function (sd) {
      var yc = sd * 3.38;
      ax.forEach(function (a) {
        [1, -1].forEach(function (k) {
          G.tyre.push(cylY(mr, 0.32, X(a), yc + k * 0.24, mr, 18));
          G.leg.push(cylY(0.24, 0.34, X(a), yc + k * 0.24, mr, 10));
        });
        G.leg.push(rod([X(a), yc - 0.42, mr], [X(a), yc + 0.42, mr], 0.06, 6));
      });
      G.leg.push(rod([X(25.0), yc, mr + 0.12], [X(27.7), yc, mr + 0.12], 0.1, 8));               /* bogie beam */
      G.leg.push(rod([X(26.2), sd * 2.55, 2.05], [X(26.35), yc, mr + 0.15], 0.15, 10));          /* main leg */
      G.leg.push(rod([X(26.4), sd * 1.6, 1.95], [X(26.3), sd * 3.0, 1.2], 0.07, 6));             /* side brace */
      G.leg.push(rod([X(24.6), sd * 2.4, 2.05], [X(26.1), sd * 3.2, 1.2], 0.06, 6));             /* drag brace */
      G.white.push(box(3.2, 0.04, 1.05, X(26.3), sd * 2.05, 1.45));                              /* the main door (C) */
    });
  }

  function build(THREE, M, C, kind) {
    V = THREE;
    kind = kind === "russian" ? "russian" : "soviet";
    var K = { skin: [], team: [], metal: [], ink: [], glass: [] }, G = { leg: [], tyre: [], white: [] };
    addBody(K);
    addIntakes(K);
    addWings(K);
    addTail(K);
    addGear(G);
    var mats = makeMats(C, kind), root = new V.Group();
    ["skin", "team", "metal", "ink", "glass"].forEach(function (key) {
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

/* the Tu-16A: ru_tu16.js's Soviet-marked build (HeroTu16Z.build), unchanged; len its measured 34.8 m.
   Needs js/hero/ru_tu16.js loaded first. */
if (typeof HeroTu16Z !== "undefined") {
  UNIT_MODELS["pact_e60_heavybomber"] = {
    len: 34.8,
    build: function (THREE, M, C) { return HeroTu16Z.build(THREE, M, C); }
  };
}
/* the Tu-22M3: len the measured X extent, nose tip to the tailplane tips (A; published 42.46 m) */
/* the row runs e80 to e90 (heavyair.js pact_e80_heavybomber): the Soviet-marked build; the
   "russian" finish is kept in the builder for a later row */
UNIT_MODELS["pact_e80_heavybomber"] = { len: 42.46, build: function (THREE, M, C) { return HeroTu22M3.build(THREE, M, C, "soviet"); } };
