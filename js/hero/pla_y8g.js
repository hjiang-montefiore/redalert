/* ============ pla_y8g.js -- SHAANXI Y-8G 'HIGH NEW 3' (GX-3) EW AIRCRAFT (HERO MODEL) ====

   Module HeroY8G. Registers ONE row:
     pla_e00_ewair  "Y-8G / Y-9 Gaoxin series" (js/eras.js; air_specs.js
                    designation "Y-8G", len 34, span 38, four turboprops, high
                    wing). Drawn as the Y-8G of the photographs below. The Y-9
                    based members of the family the row's name also covers are
                    NOT drawn (their airframe differs: six-blade props, new nose).
   No earlier An-12 / Y-8 hero exists in js/hero/ (grep "An-12|an12|Y-8"
   finds only an unrelated photo number in us_uh1_huey_family.js), so nothing
   was built on: the kit (Shell, foils, bodies, merge-per-material, gear group)
   is copied from js/hero/ru_a50.js and the four-blade propeller (twisted blade
   strips and a faint blur disc) from js/hero/us_c130_hercules.js.

   PUBLISHED FIGURES (en.wikipedia "Shaanxi Y-8", specs from Sinodefence):
   length 34.02 m, span 38.0 m, height 11.16 m, wing area 121.9 m2, wing
   sections C-5-18 at the root and C-3-14 at the tip, four WJ-6 turboprops with
   four-blade constant-speed propellers. The same article says the Y-8GX3 'High
   New 3' is "based on the Y-8F-200", which it describes as stretched 2.2 m;
   the side photograph (P1) measures 34 m nose to tail at the fuselage depth's
   scale (+-5 %, perspective), so the 34.0 m airframe is drawn and the stretch
   is NOT drawn (see NOT CONFIRMED).

   DRAWINGS (Wikimedia Commons, measured with a pixel scan of the dark mask)
     D1 "Shaanxi Y-8 two-view silhouette.png" (plan and side, 383 px wide; plan
        9.03 px/m off the 38.0 m span, side 9.04 px/m off the 34.02 m length -
        the two agree): every table below is measured off it unless a P is named:
        - fuselage 4.1 m wide, belly to roof 4.2 m (with the wing root), the
          plan narrowing from 24.7 m aft of the nose to 2.98 m wide at 29.8 m;
        - wing: leading edge 12.7 m aft of the nose at the fuselage side to
          15.3 m at the tip (9 deg), trailing edge straight at 17.0 m, tip
          19.0 m out;
        - nacelles 4.7 and 9.57 m out, 1.2 m wide, their spinners 9.5 and
          10.2 m aft of the nose, running back to the trailing edge;
        - main-gear fairings showing 0.35 m proud of each side from 12.0 to
          18.3 m;
        - tailplane 12.8 m span, leading edge 30.2 m (root) to 31.5 m (tip),
          trailing edge straight at 32.7 m;
        - side: the dorsal fillet rising from the roof at 21.9 m to 7.5 m high
          at 29.0 m; the fin leading edge to the 10.75 m-high top at 30.75 m;
          fin top chord to 32.4 m; the trailing edge leaning aft going down
          (32.5 m at 9.7 m high, 33.4 m at 6.3 m); the belly rising from 1.2 m
          at 19.7 m to 4.5 m at 33 m; the Y-8's glazed nose and tail turret
          (both replaced on the Y-8G, see P1/P2).
     D2 "Antonov An-12 Cub two-view silhouette.png" (the An-12, the same
        artist; it shows the gear the Y-8 silhouette leaves out): belly 0.9 m
        over the ground (8 px at 9.0 px/m), the main wheels in two tandem rows
        13.8 and 15.0 m aft of the An-12's nose and the nose wheel 4.4 m aft -
        moved 0.92 m aft here, the Y-8's longer nose (34.02 - 33.10 m). Fin top
        to wheel bottom measures 10.75 m on D2 and the same 10.75 m on D1 with
        D2's ground line, against the published 11.16 m (the An-12's own
        published 10.53 m); the drawing is followed.

   PHOTOGRAPHS (Wikimedia Commons; Japan Joint Staff release photographs)
     P1 "PLAAF Y-8G (GX-4) 30515 RED 2017-08-09.jpg" (port side, nearly level;
        gridded at 53.6 px/m off the 4.2 m mid-fuselage depth):
        - the NOSE: solid, no navigator's glazing, a cone with a straight top
          from the windscreen down to a short rounded white radome cap
          (thimble) about 1 m across and 0.65 m long, its tip centred about
          3.0 m up (the glazed Y-8 nose tip of D1 is 2.1 m up); the
          windscreen 2.6-4.0 m aft, a probe under the nose 2.2 m aft;
        - the CHEEK FAIRING ("canoe"): a big flat-sided box with rounded ends
          low on the side, 5.4-9.2 m aft of the nose plus a fillet to 10.2 m,
          from 1.2 to 3.8 m up, under the inboard propeller;
        - a dark ventral blister under the fairings, 7.3-8.4 m aft;
        - the four-blade props, the blades dark blue, light spinners;
        - the high wing on the roof, the deep nacelles slung under it;
        - the TAIL: the tail-gun position faired over into a blunt rounded
          end with a small spike under it; a cylindrical pod 2.2 m long and
          0.8 m through on the fin top; blade aerials on the roof 4.7, 16.4
          and 20.7 m aft;
        - light grey-blue all over, lighter on the upper sides.
     P2 "PLAAF Y-8G (GX-4) 30018 RED 2017-08-14.jpg" (a second airframe from
        ahead and below): the same nose, cheek fairing (deep, standing well
        out from the side), fin-top pod and faired tail end; the tailplane
        tip plain.
     (Commons files these photographs as "Y-8G (GX-4)"; Wikipedia names the
     Y-8G the GX-3. The fit drawn is the one the photographs show.)
   SERIES: the airframe follows the Y-8 / An-12 of D1 (D1's length, wing, tail,
   nacelles); the nose follows the Y-8G photographs (P1, P2), not the glazed
   Y-8 nose of D1, and the tail end follows P1/P2, not D1's turret.

   NOT CONFIRMED (estimated, or not shown by the references, and so drawn
   plainly or left out):
     - the 2.2 m Y-8F-200 stretch (published for the GX-3's base airframe, not
       measured in P1): not drawn;
     - the extra fins / endplates on the tailplane: NOT SEEN in P1 or P2 (the
       tailplane tips are plain in both), so NOT drawn;
     - the cheek fairing's outward depth (0.75 m beyond the side): no plan or
       front view; estimated from P2;
     - the lateral place of the ventral blister (drawn on the centre line);
     - wing dihedral / anhedral (no front view): drawn flat; tailplane flat;
     - the nacelle hub height (0.45 m under the wing mean line) and the
       nacelles' run aft of the trailing edge: from the photographs' look;
     - the 4.5 m propeller diameter: the An-12's AV-68, not published for the
       WJ-6 installation here;
     - the main-gear layout (two tandem twin-wheel legs a side, track 4.9 m,
       tyres 1.05 m; nose twin 0.9 m tyres): the An-12's, and D2's stations;
     - the paint: one plain light grey-blue (P1, P2 also show a wavy darker
       lower band, a scheme pattern, left out); no stars, bars or numbers.
   RECOGNITION LIST (and where it shows)
     1 high straight-tapered wing with four deep turboprop nacelles (addWing,
       addEngines), four-blade props with a blur disc (addProp);
     2 the solid Y-8G nose with the thimble cap and small windscreen (FUS rows
       0-6, addNose, addGlass);
     3 the big flat-sided cheek fairings both sides of the forward fuselage
       (addCheeks), the ventral blister;
     4 the upswept rear fuselage, long dorsal fillet, tall fin (FUS, addFin);
     5 the fin-top pod (addFin);
     6 the faired-over tail end (FUS closing rows, addTailEnd);
     7 the main-gear fairings low on the sides (addSponsons), the gear itself
       in the group "gear" (addGear).
   Team colour (C.team): one small strip on each wing's upper skin near the tip.
   Model space: +X nose, +Y port, +Z up, metres; z = 0 is 2.9 m above the
   ground (Z(h) below), x = 0 at mid-length. s below is metres aft of the nose
   tip, h metres above the ground. One mesh per material; the gear is the
   group "gear" and the lowest opaque part.
   ========================================================================= */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroY8G = (function () {
  "use strict";

  var V = null;
  var D2R = Math.PI / 180, PI = Math.PI;
  var L3 = 34.0, ZG = -2.9, XN = L3 / 2;
  function X(s) { return XN - s; }
  function Z(h) { return h + ZG; }
  function S_(x) { return XN - x; }
  function H_(z) { return z - ZG; }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function sgp(v, e) { return v < 0 ? -Math.pow(-v, e) : Math.pow(v, e); }
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

  /* ======================================================= the texture ==
     One canvas, three bands: the fuselage (s along, |angle from the roof|
     down), the fin (s, h), the wing and tailplane plan (s, y), and swatches. */
  var TW = 2048, TH = 1024;
  function fusU(s) { return s / 34.5 * TW; }
  function fusV(th) { return clamp(Math.abs(th) / 180, 0, 1) * 508 + 2; }
  function finU(s) { return (s - 20) / 15 * TW; }
  function finV(h) { return 514 + clamp((12.2 - h) / 8.0, 0, 1) * 252; }
  function wngU(s) { return (s - 9) / 25 * TW; }
  function wngV(y) { return 770 + clamp((y + 20) / 40, 0, 1) * 252; }
  var SW = { wing: [30, 790], cap: [30, 830], bot: [30, 870], top: [30, 910], dark: [30, 990] };

  /* ======================================================== the fuselage ==
     Rows: s, upper half-width, lower half-width, roof h, widest-line h, belly h.
     Nose rows 0-6 off P1 (the Y-8G's solid nose and thimble cap) with D1's plan
     widths; the rest off D1; the closing rows the faired tail end of P1/P2. */
  var FUS = [
    [0.00, 0.08, 0.08, 3.05, 2.97, 2.88],
    [0.20, 0.36, 0.36, 3.36, 2.97, 2.56],
    [0.65, 0.56, 0.56, 3.55, 2.94, 2.36],
    [1.20, 0.86, 0.84, 3.74, 2.88, 2.14],
    [2.20, 1.26, 1.22, 4.02, 2.84, 1.84],
    [3.00, 1.56, 1.50, 4.30, 2.84, 1.58],
    [4.00, 1.80, 1.74, 4.64, 2.86, 1.28],
    [5.00, 1.93, 1.90, 4.80, 2.90, 1.08],
    [6.50, 2.02, 2.01, 4.88, 2.92, 0.95],
    [8.00, 2.05, 2.05, 4.90, 2.93, 0.90],
    [19.0, 2.05, 2.05, 4.92, 2.93, 0.92],
    [20.5, 2.05, 2.04, 4.93, 2.98, 1.30],
    [22.0, 2.05, 2.02, 4.95, 3.10, 1.66],
    [24.1, 2.04, 1.98, 5.00, 3.40, 2.30],
    [26.3, 1.88, 1.80, 5.08, 3.80, 3.00],
    [28.0, 1.73, 1.64, 5.18, 4.15, 3.40],
    [29.8, 1.50, 1.40, 5.32, 4.45, 3.90],
    [31.5, 1.24, 1.14, 5.48, 4.70, 4.20],
    [32.9, 1.00, 0.92, 5.60, 4.88, 4.36],
    [33.6, 0.80, 0.72, 5.58, 4.94, 4.46],
    [33.9, 0.46, 0.42, 5.40, 4.96, 4.58],
    [34.0, 0.08, 0.08, 5.08, 4.96, 4.84]
  ];
  var FST = [0, 0.06, 0.2, 0.4, 0.65, 0.9, 1.2, 1.7, 2.2, 2.6, 3.0, 3.5, 4.0, 4.5, 5.0, 5.8,
             6.5, 8.0, 11, 14, 17, 19, 20.5, 22, 23, 24.1, 25.2, 26.3, 27.2, 28, 29, 29.8, 30.7,
             31.5, 32.3, 32.9, 33.3, 33.6, 33.8, 33.9, 33.97, 34.0];
  var FN = 26, FEXP = 0.86;
  function fusPt(s, a, push) {
    var r = tab(FUS, s), up = Math.cos(a * D2R) >= 0;
    var hw = up ? r[0] : r[1], hc = r[3], ext = up ? r[2] - hc : hc - r[4];
    var y = hw * sgp(Math.sin(a * D2R), FEXP), h = hc + ext * sgp(Math.cos(a * D2R), FEXP);
    if (push) {
      var dh = h - hc, L = Math.sqrt(y * y + dh * dh) || 1;
      y += push * y / L; h += push * dh / L;
    }
    return [X(s), y, Z(h)];
  }
  function fusHc(s) { return tab(FUS, s)[3]; }

  /* ============================================================ shells ==
     Every skin part is a ring loft. A triangle is wound to face away from the
     inside of its ring pair; normals are smoothed over shared vertices. Each
     triangle carries its material key; skin takes its UV band from emit(). */
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
  Shell.prototype.loft = function (rings, cat, capA, capB) {
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
        this.tri(idx[r][i], idx[r][j], idx[r + 1][j], cat, od);
        this.tri(idx[r][i], idx[r + 1][j], idx[r + 1][i], cat, od);
      }
    }
    if (capA) this.fan(rings[0], cent[0], cent[1], capA === true ? cat : capA);
    if (capB) this.fan(rings[R - 1], cent[R - 1], cent[R - 2], capB === true ? cat : capB);
  };
  Shell.prototype.sheet = function (grid, cat, ref) {
    var ids = [], i, j;
    for (i = 0; i < grid.length; i++) {
      var row = [];
      for (j = 0; j < grid[i].length; j++) row.push(this.vert(grid[i][j]));
      ids.push(row);
    }
    for (i = 0; i + 1 < grid.length; i++) {
      for (j = 0; j + 1 < grid[i].length; j++) {
        var A = grid[i][j], B = grid[i][j + 1], C = grid[i + 1][j + 1], D = grid[i + 1][j];
        var od = [(A[0] + B[0] + C[0] + D[0]) / 4 - ref[0], (A[1] + B[1] + C[1] + D[1]) / 4 - ref[1],
                  (A[2] + B[2] + C[2] + D[2]) / 4 - ref[2]];
        this.tri(ids[i][j], ids[i][j + 1], ids[i + 1][j + 1], cat, od);
        this.tri(ids[i][j], ids[i + 1][j + 1], ids[i + 1][j], cat, od);
      }
    }
  };
  Shell.prototype.emit = function (band) {
    var P = this.P, T = this.T, N = [], i, k;
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
    var by = {};
    for (k = 0; k < T.length; k++) {
      var cat = T[k][3];
      if (!by[cat]) by[cat] = { pos: [], nor: [] };
      for (i = 0; i < 3; i++) {
        var p = P[T[k][i]], nn = N[T[k][i]];
        by[cat].pos.push(p[0], p[1], p[2]); by[cat].nor.push(nn[0], nn[1], nn[2]);
      }
    }
    for (var key in by) {
      var g = new V.BufferGeometry();
      g.setAttribute("position", new V.Float32BufferAttribute(by[key].pos, 3));
      g.setAttribute("normal", new V.Float32BufferAttribute(by[key].nor, 3));
      put(key, g, band);
    }
  };

  var K = null;
  /* every skin geometry gets its UVs here, from its own vertex positions */
  function uvFor(g, band) {
    var p = g.attributes.position.array, n = p.length / 3, uv = new Float32Array(n * 2), i, U, W;
    for (i = 0; i < n; i++) {
      var x = p[3 * i], y = p[3 * i + 1], z = p[3 * i + 2], s = S_(x), h = H_(z);
      if (band === "fus") {
        var th = Math.atan2(Math.abs(y), h - fusHc(clamp(s, 0, 34))) / D2R;
        U = fusU(s); W = fusV(th);
      } else if (band === "fin") { U = finU(s); W = finV(h); }
      else if (band === "wng") { U = wngU(s); W = wngV(y); }
      else { var sw = SW[band] || SW.wing; U = sw[0]; W = sw[1]; }
      uv[2 * i] = clamp(U, 1, TW - 1) / TW; uv[2 * i + 1] = 1 - clamp(W, 1, TH - 1) / TH;
    }
    g.setAttribute("uv", new V.BufferAttribute(uv, 2));
  }
  function put(key, g, band) {
    if (key === "skin") {
      if (g.index) g = g.toNonIndexed();
      uvFor(g, band || "wing");
    }
    (K[key] || (K[key] = [])).push(g);
  }

  /* ===================================================== foils ==
     frame "w": a section at span y (a), chord along -X, thickness in Z about o;
     frame "f": a section at height h (a), thickness in Y about o. */
  function foilT(u) {
    return 1.4845 * Math.sqrt(u) - 0.63 * u - 1.758 * u * u + 1.4215 * u * u * u - 0.518 * u * u * u * u;
  }
  function foilRing(sec, frame, KC) {
    var up = [], lo = [], j, u, th, ring = [];
    for (j = 0; j <= KC; j++) {
      u = (1 - Math.cos(Math.PI * j / KC)) / 2;
      th = sec.t * sec.c * foilT(u);
      if (frame === "w") {
        up.push([X(sec.s + u * sec.c), sec.a, Z(sec.o + th)]);
        lo.push([X(sec.s + u * sec.c), sec.a, Z(sec.o - th * (sec.lo || 1))]);
      } else {
        up.push([X(sec.s + u * sec.c), sec.o + th, Z(sec.a)]);
        lo.push([X(sec.s + u * sec.c), sec.o - th, Z(sec.a)]);
      }
    }
    for (j = 0; j <= KC; j++) ring.push(up[j]);
    for (j = KC - 1; j >= 1; j--) ring.push(lo[j]);
    return ring;
  }
  function foilHalf(sec, s) {
    var u = Math.min(1, Math.max(0, (s - sec.s) / sec.c));
    return sec.t * sec.c * foilT(u);
  }
  function foil(secs, frame, key, band, kc) {
    var rings = [], i, sh = new Shell(), KC = kc || 9;
    for (i = 0; i < secs.length; i++) rings.push(foilRing(secs[i], frame, KC));
    sh.loft(rings, key, true, true);
    sh.emit(band);
  }
  function finSecs(yc, hs, sle, cs, t) {
    var out = [], i;
    for (i = 0; i < hs.length; i++) out.push({ a: hs[i], s: sle[i], c: cs[i], t: t[i], o: yc });
    return out;
  }

  /* a body of revolution along -X: rows (distance back from the front, radius) */
  function addBody(s0, yc, hc, rows, seg, key, band, sy, sz) {
    var rings = [], r, i, sh = new Shell(), a;
    sy = sy || 1; sz = sz || 1;
    for (r = 0; r < rows.length; r++) {
      var row = [];
      for (i = 0; i < seg; i++) {
        a = i * 360 / seg;
        row.push([X(s0 + rows[r][0]), yc + sy * rows[r][1] * Math.sin(a * D2R), Z(hc) + sz * rows[r][1] * Math.cos(a * D2R)]);
      }
      rings.push(row);
    }
    sh.loft(rings, key, true, true);
    sh.emit(band);
  }

  function addFuselage() {
    var rings = [], r, i, sh = new Shell();
    for (r = 0; r < FST.length; r++) {
      var ring = [];
      for (i = 0; i < FN; i++) ring.push(fusPt(FST[r], i * 360 / FN, 0));
      rings.push(ring);
    }
    sh.loft(rings, "skin", true, true);
    sh.emit("fus");
  }

  /* ============================================================== wing ==
     High on the roof (D1 side: the roof line with the wing 5.1 m up), leading
     edge 12.7 m aft at the side to 15.3 m at the 19.0 m tip, trailing edge
     straight at 17.0 m (D1 plan); thickness 18 % at the root to 14 % at the
     tip (the published C-5-18 / C-3-14 sections); drawn flat (no front view). */
  var WTIP = 19.0, WO = 4.86;
  function wingLE(a) { return 12.70 + 0.160 * Math.max(0, a - 2.05); }
  function wingTE(a) { return 17.0; }
  function wingSec(y) {
    var a = Math.abs(y), le = wingLE(a);
    return { a: y, s: le, c: wingTE(a) - le, t: 0.18 - 0.04 * a / WTIP, o: WO, lo: 0.75 };
  }
  function addWing() {
    var ys = [-19.0, -18.4, -16.0, -12.5, -9.6, -7.0, -4.7, -2.05, 0,
              2.05, 4.7, 7.0, 9.6, 12.5, 16.0, 18.4, 19.0], i, secs = [];
    for (i = 0; i < ys.length; i++) secs.push(wingSec(ys[i]));
    /* the rounded tip: a short closing section */
    secs[0] = { a: -19.0, s: wingLE(19.0) + 0.35, c: 17.0 - wingLE(19.0) - 0.6, t: 0.08, o: WO, lo: 0.75 };
    secs[secs.length - 1] = { a: 19.0, s: wingLE(19.0) + 0.35, c: 17.0 - wingLE(19.0) - 0.6, t: 0.08, o: WO, lo: 0.75 };
    foil(secs, "w", "skin", "wng", 11);
    /* the team's colour: a small strip on each wing's upper skin near the tip */
    var sd, ia, ib, y, sec, s, pos, arr;
    for (sd = -1; sd <= 1; sd += 2) {
      pos = [];
      for (ia = 0; ia <= 2; ia++) {
        var rows = [];
        for (ib = 0; ib <= 4; ib++) {
          y = sd * (15.6 + 0.45 * ia); sec = wingSec(y);
          s = sec.s + sec.c * (0.22 + 0.45 * ib / 4);
          rows.push([X(s), y, Z(sec.o + foilHalf(sec, s) + 0.03)]);
        }
        pos.push(rows);
      }
      arr = [];
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
     D1 side: the dorsal fillet from the roof at 21.9 m to 7.5 m high at 29.0 m,
     the leading edge from there to the 10.75 m top at 30.75 m; the top chord
     to 32.4 m; the trailing edge leaning aft 0.24 m per metre down. */
  function finLE(h) { return h < 7.5 ? 21.9 + (h - 4.95) / (7.5 - 4.95) * (29.0 - 21.9) : 29.0 + (h - 7.5) * 0.538; }
  function finTE(h) { return 32.4 + (10.75 - h) * 0.24; }
  function addFin() {
    var hs = [5.0, 5.6, 6.3, 7.0, 7.5, 8.2, 9.0, 9.9, 10.75], i, secs = [];
    for (i = 0; i < hs.length; i++) {
      var le = finLE(hs[i]), te = finTE(hs[i]);
      secs.push({ a: hs[i], s: le, c: te - le, t: (hs[i] < 7.5 ? 0.05 + 0.04 * (hs[i] - 5) / 2.5 : 0.10 - 0.02 * (hs[i] - 7.5) / 3.25), o: 0 });
    }
    secs[0].t = 0.04;
    foil(secs, "f", "skin", "fin", 10);
    /* the fin-top pod (P1, P2): 2.2 m long, 0.8 m through, a little proud of
       the leading edge and past the trailing edge */
    var B = [[0, 0.04], [0.12, 0.25], [0.35, 0.36], [0.7, 0.40], [1.6, 0.40], [1.95, 0.35], [2.12, 0.22], [2.2, 0.04]];
    addBody(30.62, 0, 10.75 + 0.30, B, 14, "skin", "cap");
  }
  function tpSec(y) {
    var a = Math.abs(y);
    return { a: y, s: 30.2 + 0.20 * a, c: 32.7 - (30.2 + 0.20 * a), t: 0.11 - 0.003 * a, o: 5.35 };
  }
  function addTailplane() {
    var ys = [-6.4, -6.05, -4.8, -3.2, -1.5, 0, 1.5, 3.2, 4.8, 6.05, 6.4], i, secs = [];
    for (i = 0; i < ys.length; i++) secs.push(tpSec(ys[i]));
    secs[0].t = secs[10].t = 0.06; secs[0].s += 0.25; secs[10].s += 0.25; secs[0].c -= 0.4; secs[10].c -= 0.4;
    foil(secs, "w", "skin", "wng", 9);
  }
  /* the faired-over tail-gun position: a blunt rounded end (FUS closing rows)
     and the small spike under it (P1) */
  function addTailEnd() {
    put("dark", rodG([X(33.55), 0, Z(4.55)], [X(34.0), 0, Z(4.47)], 0.05, 6));
  }

  /* ============================================================ engines ==
     Nacelles 4.7 and 9.57 m out, 1.2 m wide, spinner tips 9.5 and 10.2 m aft
     (D1 plan); the hub 0.45 m under the wing mean line; deep, the lower body
     running aft to past the trailing edge (P1). Rows: d aft of the spinner
     tip, half-width, top over the hub, bottom under the hub. */
  var NAC = [[0.80, 0.44, 0.44, -0.44], [1.10, 0.55, 0.56, -0.60], [1.8, 0.60, 0.66, -0.78],
             [3.0, 0.61, 0.72, -0.86], [4.6, 0.60, 0.74, -0.86], [6.0, 0.54, 0.70, -0.74],
             [7.2, 0.42, 0.62, -0.52], [8.2, 0.22, 0.52, -0.22], [8.6, 0.06, 0.45, 0.10]];
  var SPIN = [[0, 0.04], [0.15, 0.20], [0.35, 0.32], [0.6, 0.40], [0.82, 0.43]];
  var ENG = [[4.7, 9.5], [9.57, 10.2]], RP = 2.25;
  function hubH() { return WO - 0.45; }
  function ringSE(x, yc, w, zt, zb, zw, e, n) {
    var out = [], j;
    for (j = 0; j < n; j++) {
      var a = j / n * PI * 2, c = Math.cos(a), sn = Math.sin(a);
      var z = c >= 0 ? zw + (zt - zw) * sgp(c, e) : zw + (zw - zb) * sgp(c, e);
      out.push([x, yc + w * sgp(sn, e), z]);
    }
    return out;
  }
  function addBlade(x, yc, zc, a) {
    var rr = [0.36, 0.7, 1.1, 1.6, 2.0, 2.25], ch = [0.24, 0.34, 0.36, 0.33, 0.28, 0.18];
    var PT = [52, 42, 33, 26, 21, 18], k, grid = [];
    var er = [Math.sin(a), Math.cos(a)], et = [Math.cos(a), -Math.sin(a)];
    for (k = 0; k < 6; k++) {
      var r = rr[k] * RP / 2.25, hc = ch[k] / 2, pr = PT[k] * D2R;
      var by = yc + er[0] * r, bz = zc + er[1] * r;
      grid.push([[x + hc * Math.sin(pr), by + et[0] * hc * Math.cos(pr), bz + et[1] * hc * Math.cos(pr)],
                 [x - hc * Math.sin(pr), by - et[0] * hc * Math.cos(pr), bz - et[1] * hc * Math.cos(pr)]]);
    }
    var sh = new Shell();
    sh.sheet(grid, "blade", [x + 1, yc, zc]);
    sh.emit();
  }
  function addEngines() {
    var zh = Z(hubH());
    ENG.forEach(function (E, ei) {
      var Y = E[0], s0 = E[1], sd, k;
      for (sd = -1; sd <= 1; sd += 2) {
        var yc = sd * Y;
        var rings = NAC.map(function (q) {
          return ringSE(X(s0 + q[0]), yc, q[1], zh + q[2], zh + q[3], zh, 0.8, 18);
        });
        var sh = new Shell();
        sh.loft(rings, "skin", "dark", true);
        sh.emit("wing");
        /* the spinner */
        addBody(s0, yc, hubH(), SPIN, 12, "skin", "cap");
        /* four blades in the prop plane, the lowest a little off straight down */
        var xP = X(s0 + 0.62), a0 = (180 - sd * (ei === 0 ? 30 : 15)) * D2R;
        for (k = 0; k < 4; k++) addBlade(xP, yc, zh, a0 + k * PI / 2);
        var dg = new V.CircleGeometry(RP, 32);
        dg.rotateY(PI / 2); dg.translate(xP - 0.02, yc, zh);
        put("blur", dg);
        /* the exhaust low on the outboard side, aft of the wing leading edge */
        put("dark", cylX(0.13, 0.5, X(s0 + 5.4), yc + sd * 0.56, Z(hubH() - 0.25), 8));
      }
    });
  }
  function cylX(r, len, x, y, z, seg) {
    var g = new V.CylinderGeometry(r, r, len, seg || 8);
    g.rotateZ(PI / 2); g.translate(x, y, z); return g;
  }

  /* ========================================================== sponsons ==
     The main-gear fairings: 0.35 m proud of each side 12.0-18.3 m on D1's
     plan, faired in fore and aft 11.2-19.3 m; top 2.5 m up (P1). Rows: s,
     outward bulge, top h, bottom h. */
  var SPON = [[11.2, 0.02, 2.0, 1.6], [12.0, 0.26, 2.4, 1.05], [13.0, 0.35, 2.5, 0.95],
              [17.5, 0.35, 2.5, 0.95], [18.3, 0.28, 2.4, 1.0], [19.3, 0.02, 2.1, 1.3]];
  function addSponsons() {
    var sd, k, i, s, row, rings, sh, ring, a, n = 14, hm;
    for (sd = -1; sd <= 1; sd += 2) {
      rings = []; sh = new Shell();
      for (k = 0; k <= 12; k++) {
        s = 11.2 + (19.3 - 11.2) * k / 12; row = tab(SPON, s); ring = [];
        hm = (row[1] + row[2]) / 2;
        for (i = 0; i < n; i++) {
          a = i * 360 / n;
          var sn = Math.sin(a * D2R);
          ring.push([X(s), sd * (1.80 + (sn > 0 ? (0.25 + row[0]) * sgp(sn, 0.6) : 0.25 * sn)),
                     Z(hm + (row[1] - row[2]) / 2 * sgp(Math.cos(a * D2R), 0.7))]);
        }
        rings.push(ring);
      }
      sh.loft(rings, "skin", true, true);
      sh.emit("fus");
    }
  }

  /* ============================================================ cheeks ==
     The Y-8G's cheek fairings (P1, P2): flat-sided boxes with rounded ends,
     5.4-9.2 m aft of the nose and a fillet to 10.2 m, 1.2-3.8 m up, standing
     0.75 m out from the side (the depth estimated off P2). Rows: s, outward
     reach beyond y = 2.05, top h, bottom h. */
  var CHK = [[5.40, 0.10, 3.10, 1.80], [5.55, 0.42, 3.55, 1.40], [5.85, 0.62, 3.74, 1.24],
             [6.30, 0.72, 3.80, 1.20], [8.60, 0.74, 3.80, 1.20], [9.20, 0.66, 3.74, 1.24],
             [9.70, 0.40, 3.55, 1.34], [10.2, 0.04, 3.30, 1.45]];
  function addCheeks() {
    var sd, k, i, s, row, rings, sh, ring, a, n = 18, hm, hw;
    for (sd = -1; sd <= 1; sd += 2) {
      rings = []; sh = new Shell();
      for (k = 0; k <= 16; k++) {
        s = 5.40 + (10.2 - 5.40) * k / 16; row = tab(CHK, s); ring = [];
        hm = (row[1] + row[2]) / 2; hw = (row[1] - row[2]) / 2;
        var yIn = 1.55, yOut = 2.05 + row[0];
        for (i = 0; i < n; i++) {
          a = i * 360 / n;
          var sn = Math.sin(a * D2R), cs = Math.cos(a * D2R);
          var yy = (yIn + yOut) / 2 + (yOut - yIn) / 2 * sgp(sn, 0.25);
          ring.push([X(s), sd * yy, Z(hm + hw * sgp(cs, 0.35))]);
        }
        rings.push(ring);
      }
      sh.loft(rings, "skin", true, true);
      sh.emit("fus");
    }
    /* the dark ventral blister under the fairings (P1) */
    var R = [[0, 0.06], [0.15, 0.26], [0.4, 0.34], [0.75, 0.36], [1.0, 0.30], [1.1, 0.10]];
    addBody(7.3, 0, 0.98, R, 12, "dark", null, 1.0, 1.0);
  }

  /* ======================================================== glass, details */
  function glassPane(s0, s1, a0, a1, ns, na) {
    var pp = 0.03, i, j, P = [], pos = [], nor = [];
    for (i = 0; i <= ns; i++) {
      var row = [];
      for (j = 0; j <= na; j++) row.push(fusPt(s0 + (s1 - s0) * i / ns, a0 + (a1 - a0) * j / na, pp));
      P.push(row);
    }
    var ref = [X((s0 + s1) / 2), 0, Z(fusHc((s0 + s1) / 2))];
    for (i = 0; i < ns; i++) for (j = 0; j < na; j++) {
      var A = P[i][j], B = P[i][j + 1], C = P[i + 1][j + 1], E = P[i + 1][j];
      var cx = (A[0] + C[0]) / 2 - ref[0], cy = (A[1] + C[1]) / 2 - ref[1], cz = (A[2] + C[2]) / 2 - ref[2];
      var ux = B[0] - A[0], uy = B[1] - A[1], uz = B[2] - A[2], vx = C[0] - A[0], vy = C[1] - A[1], vz = C[2] - A[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var sg = (nx * cx + ny * cy + nz * cz < 0) ? -1 : 1;
      var tri1 = sg > 0 ? [A, B, C] : [A, C, B], tri2 = sg > 0 ? [A, C, E] : [A, E, C];
      var L = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      [tri1, tri2].forEach(function (t) {
        t.forEach(function (p) { pos.push(p[0], p[1], p[2]); nor.push(sg * nx / L, sg * ny / L, sg * nz / L); });
      });
    }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    put("glass", g);
  }
  var _m4 = null, _q = null, _v = null, _u = null;
  function boxG(sx, sy, sz, x, y, z) { var g = new V.BoxGeometry(sx, sy, sz); g.translate(x, y, z); return g; }
  function rodG(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r, r, L, seg || 8);
    _q.setFromUnitVectors(_u.set(0, 1, 0), _v.set(dx / L, dy / L, dz / L));
    _m4.makeRotationFromQuaternion(_q);
    _m4.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(_m4);
    return g;
  }
  function wheelG(r, w, x, y, z, seg) { var g = new V.CylinderGeometry(r, r, w, seg || 12); g.translate(x, y, z); return g; }

  /* the small windscreen high on the nose (P1: 2.6-4.0 m aft, three panes
     across and a side pane each side) */
  function addGlass() {
    var wc = [-46, -16, 16, 46], i, sd;
    for (i = 0; i < 3; i++) glassPane(2.75, 3.55, wc[i], wc[i + 1], 1, 2);
    for (sd = -1; sd <= 1; sd += 2) {
      glassPane(2.85, 3.55, sd * 50, sd * 68, 1, 1);
      glassPane(3.7, 4.2, sd * 52, sd * 68, 1, 1);
    }
  }
  /* the nose: the thimble cap is skin of its own colour (FUS rows 0-2, painted
     as the cap swatch); the probe under the nose and the roof aerials (P1) */
  function addNose() {
    var rings = [], r, i, sh = new Shell(), ss = [0, 0.06, 0.2, 0.4, 0.62];
    for (r = 0; r < ss.length; r++) {
      var ring = [];
      for (i = 0; i < FN; i++) ring.push(fusPt(ss[r], i * 360 / FN, 0.012));
      rings.push(ring);
    }
    sh.loft(rings, "skin", true, false);
    sh.emit("cap");
    put("dark", rodG([X(2.2), 0, Z(1.9)], [X(2.25), 0, Z(1.3)], 0.04, 6));
    put("dark", rodG([X(2.25), 0, Z(1.32)], [X(1.95), 0, Z(1.30)], 0.03, 6));
    [[4.7, 4.86, 0.45], [16.4, 5.18, 0.55], [20.7, 4.95, 0.55]].forEach(function (b) {
      var g = new V.BoxGeometry(0.45, 0.05, b[2]); g.translate(X(b[0]), 0, Z(b[1] + b[2] / 2 - 0.05));
      put("skin", g, "top");
    });
  }

  /* gear (it retracts): the nose leg 5.3 m aft with twin 0.9 m tyres; two
     main legs a side 14.7 and 15.9 m aft (D2 moved 0.92 m aft), twin 1.05 m
     tyres each, track 4.9 m (the An-12's). Every wheel bottom is h = 0. */
  function addGear(GL) {
    var sd;
    GL.metal.push(rodG([X(5.3), 0, Z(1.25)], [X(5.3), 0, Z(0.45)], 0.09, 8));
    GL.metal.push(rodG([X(5.3), -0.36, Z(0.45)], [X(5.3), 0.36, Z(0.45)], 0.05, 6));
    [-0.24, 0.24].forEach(function (y) { GL.tyre.push(wheelG(0.45, 0.26, X(5.3), y, Z(0.45), 14)); });
    GL.metal.push(boxG(1.4, 0.04, 0.4, X(5.0), 0.55, Z(1.0)));
    GL.metal.push(boxG(1.4, 0.04, 0.4, X(5.0), -0.55, Z(1.0)));
    for (sd = -1; sd <= 1; sd += 2) {
      [14.7, 15.9].forEach(function (s) {
        GL.metal.push(rodG([X(s), sd * 2.45, Z(1.2)], [X(s), sd * 2.45, Z(0.53)], 0.11, 8));
        GL.metal.push(rodG([X(s), sd * 2.1, Z(0.53)], [X(s), sd * 2.8, Z(0.53)], 0.07, 6));
        [2.2, 2.7].forEach(function (y) { GL.tyre.push(wheelG(0.525, 0.30, X(s), sd * y, Z(0.53), 14)); });
      });
      GL.metal.push(boxG(2.6, 0.04, 0.45, X(15.3), sd * 1.95, Z(0.85)));
    }
  }

  /* ========================================================= paint ==
     One plain light grey-blue (P1, P2, taken to about 0.85 of the sunlit
     level), the thimble cap and fin pod a lighter grey; panel lines only. */
  var P = { top: "#a9b5be", bot: "#a1adb7", wing: "#a3afb8", cap: "#c4ccd2", dark: "#2a2e31" };
  var _cv = null;
  function paint() {
    if (_cv) return _cv;
    var cv = document.createElement("canvas"); cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), i, s, x, y, sd, R0 = 2741;
    function R() { R0 = (R0 * 16807) % 2147483647; return R0 / 2147483647; }
    /* ---- fuselage band */
    g.fillStyle = P.top; g.fillRect(0, 0, TW, 512);
    g.fillStyle = P.bot; g.fillRect(0, fusV(110), TW, 512 - fusV(110));
    g.strokeStyle = "rgba(0,0,0,0.15)"; g.lineWidth = 1;
    for (s = 4.5; s < 33; s += 1.5) { x = fusU(s); g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 512); g.stroke(); }
    g.strokeStyle = "rgba(0,0,0,0.10)";
    [35, 70, 125, 155].forEach(function (a) { y = fusV(a); g.beginPath(); g.moveTo(fusU(4), y); g.lineTo(fusU(32), y); g.stroke(); });
    /* the crew door aft of the cheek fairing, the paratroop doors and the
       cargo ramp outline under the upswept tail (D1, P1) */
    g.strokeStyle = "rgba(0,0,0,0.40)"; g.lineWidth = 2;
    g.strokeRect(fusU(10.4), fusV(70), fusU(11.3) - fusU(10.4), fusV(118) - fusV(70));
    g.strokeRect(fusU(20.2), fusV(62), fusU(21.0) - fusU(20.2), fusV(112) - fusV(62));
    g.beginPath(); g.moveTo(fusU(21.5), fusV(150)); g.lineTo(fusU(31.5), fusV(122)); g.stroke();
    g.beginPath(); g.moveTo(fusU(26.0), fusV(180)); g.lineTo(fusU(26.0), fusV(130)); g.stroke();
    for (i = 0; i < 70; i++) {
      g.fillStyle = "rgba(30,30,28," + (0.02 + R() * 0.04).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * 512, 20 + R() * 60, 2 + R() * 5);
    }
    /* ---- fin band: the rudder hinge line and its tab (P1) */
    g.fillStyle = P.top; g.fillRect(0, 512, TW, 256);
    g.strokeStyle = "rgba(0,0,0,0.32)"; g.lineWidth = 2;
    g.beginPath(); g.moveTo(finU(31.6), finV(10.7)); g.lineTo(finU(32.5), finV(5.6)); g.stroke();
    g.beginPath(); g.moveTo(finU(32.5), finV(7.2)); g.lineTo(finU(33.1), finV(7.2)); g.stroke();
    /* ---- wing band */
    g.fillStyle = P.wing; g.fillRect(0, 768, TW, 256);
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.5;
    for (sd = -1; sd <= 1; sd += 2) {
      /* flaps inboard, ailerons outboard along the trailing edge */
      g.beginPath(); g.moveTo(wngU(16.1), wngV(sd * 2.1)); g.lineTo(wngU(16.2), wngV(sd * 18.5)); g.stroke();
      [6.0, 11.2, 14.5].forEach(function (a) {
        g.beginPath(); g.moveTo(wngU(16.15), wngV(sd * a)); g.lineTo(wngU(17.0), wngV(sd * a)); g.stroke();
      });
      /* the elevator hinge line */
      g.beginPath(); g.moveTo(wngU(32.0), wngV(sd * 0.6)); g.lineTo(wngU(32.0), wngV(sd * 6.0)); g.stroke();
    }
    function sw(name, col) { var p = SW[name]; g.fillStyle = col; g.fillRect(p[0] - 24, p[1] - 14, 48, 28); }
    sw("wing", P.wing); sw("cap", P.cap); sw("bot", P.bot); sw("top", P.top); sw("dark", P.dark);
    _cv = cv;
    return cv;
  }
  var _tex;
  function skinTexture() {
    if (_tex !== undefined) return _tex;
    var t = false;
    try {
      t = new V.CanvasTexture(paint());
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = false; }
    _tex = t;
    return t;
  }

  function makeMats(C) {
    var m = {}, tex = skinTexture();
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.72, metalness: 0.10, side: V.DoubleSide });
    if (tex) m.skin.map = tex; else m.skin.color.set(P.top);
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10, side: V.DoubleSide });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.dark = new V.MeshStandardMaterial({ color: 0x2a2e31, roughness: 0.82, metalness: 0.12, side: V.DoubleSide });
    m.tyre = new V.MeshStandardMaterial({ color: 0x1b1d1e, roughness: 0.92, metalness: 0.02 });
    m.glass = new V.MeshStandardMaterial({ color: 0x223040, roughness: 0.12, metalness: 0.50,
                                           transparent: true, opacity: 0.86, side: V.DoubleSide });
    /* the blades: dark blue (P1) */
    m.blade = new V.MeshStandardMaterial({ color: 0x2b3850, roughness: 0.6, metalness: 0.2, side: V.DoubleSide });
    m.blur = new V.MeshStandardMaterial({ color: 0x9aa4b0, roughness: 0.6, metalness: 0.0,
                                          transparent: true, opacity: 0.12, depthWrite: false, side: V.DoubleSide });
    return m;
  }

  function merge(list) {
    var pos = [], nor = [], uvs = [], hasUv = false, i, j;
    for (i = 0; i < list.length; i++) if (list[i].attributes.uv) hasUv = true;
    for (i = 0; i < list.length; i++) {
      var g = list[i].index ? list[i].toNonIndexed() : list[i];
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      var u = g.attributes.uv ? g.attributes.uv.array : null;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
      if (hasUv) for (j = 0; j < p.length / 3 * 2; j++) uvs.push(u ? u[j] : 0);
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    if (hasUv) out.setAttribute("uv", new V.Float32BufferAttribute(uvs, 2));
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
    addNose();
    addWing();
    addTailplane();
    addFin();
    addTailEnd();
    addEngines();
    addSponsons();
    addCheeks();
    addGlass();
    var GL = { metal: [], tyre: [] };
    addGear(GL);
    var mats = makeMats(C);
    var root = new V.Group();
    emit(root, K, mats, ["skin", "metal", "dark", "team", "blade", "glass", "blur"]);
    var gear = new V.Group();
    gear.name = "gear";
    emit(gear, GL, mats, ["metal", "tyre"]);
    root.add(gear);
    return root;
  }

  return { build: build };
})();

UNIT_MODELS["pla_e00_ewair"] = {
  len: 34.0,
  build: function (THREE, M, C) { return HeroY8G.build(THREE, M, C); }
};
