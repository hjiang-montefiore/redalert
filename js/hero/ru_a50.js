/* ============ ru_a50.js -- THE Il-76 AIRFRAME, BERIEV A-50 / A-50U MAINSTAY (HERO MODEL) ====

   This file holds the ONE Il-76 airframe builder (HeroIl76) and registers the
   AEW&C rows that fly the A-50. js/hero/ru_il78.js registers the Il-78 tanker on
   the same builder (it calls HeroIl76.build at build time; index.html loads both).
     pact_e80_awacs  "A-50 Mainstay" (in service 1985-): Soviet star, overall white
     pact_e90_awacs  "A-50 Mainstay": the same aeroplane in the 1990s fleet, Russian star
     pact_e00_awacs  "A-50U Mainstay", "Beriev A-50U": the modernised A-50U, grey scheme
     awacs_p         "Beriev A-50U Mainstay" (era e20): the same A-50U
   No other row borrows these keys.

   PUBLISHED FIGURES (Wikipedia "Ilyushin Il-76", "Beriev A-50"): length 46.59 m,
   span 50.5 m, height 14.76 m, four Soloviev D-30KP turbofans, the A-50 rotodome
   10.8 m across. air_specs.js gives the A-50U 49.6 m of length, which no source
   supports (the U is the same airframe); this model draws 46.6 m for every row.

   DRAWINGS (Wikimedia Commons)
     "Ilyushin Il-76.svg" (side, plan and front three-view, rendered 960 px; the
       side and plan measured at 14.8 px/m, nose to tailplane tip 46.59 m, span
       50.8 m on the plan): every table below was measured off it:
       - FUS: the fuselage half-width off the plan, roof and belly off the side,
         4.86 m wide, roof 6.55 m and belly 1.6 m above the ground; the chin
         radome bulging to 1.35 m at 4 m from the nose; the glazed navigator's nose
         over it; the rear fuselage sweeping up from 30 m to the blunt tail end at
         43 m (belly 5.4 m) under the fin root, the tail gunner's turret on it.
       - wing: leading edge s = 12.43 + 0.54 y (28 deg), trailing edge
         23.36 + 0.135 y to 11 m out, then 0.28 a metre; tip 25.3 m out; 3.4 deg
         of anhedral off the front view.
       - D-30KP pods: inner centre 6.35 m out, lip 11.5 m aft of the nose, centre
         4.25 m up; outer 10.55 m out, lip 13.7 m, 3.92 m up; 1.86 m across.
       - fin: leading edge 0.88 back per metre of height above a dorsal fillet,
         trailing edge from 42.6 m at the root, top 13.8 m; the tailplane bullet
         36.9-46.5 m at 14.35 m; tailplane leading edge 38.7 + 0.68 y, trailing
         edge 43.85 + 0.31 y, 8.6 m a side.
       - gear: the nose leg 8.5 m from the nose; two main axles a side at 20.1 and
         22.6 m, each with four wheels abreast (front view: 2.0-4.5 m out); the
         main-gear fairings 13.3-29.5 m, 3.5 m out, 0.82 m above the ground.
     "Beriev A-50 3-view line drawing.png": the rotodome over the wing trailing
       edge (centre 24.8 m aft of the nose), 9.5 m up, on two struts side by side;
       the tail ending in a pointed fairing instead of the turret.
     "Ilyushin Il-78 Midas two-view silhouette.png": see ru_il78.js.

   PHOTOGRAPHS (Wikimedia Commons)
     "Beriev A-50U Mainstay RF-92957 47 red (8708674596).jpg" (A-50U in flight):
       a solid nose (no navigator's glazing), the probe over the nose, the chin
       bulge, light grey over a darker blue-grey with the paint line at about
       two-thirds of the fuselage height, grey wings, red-orange wing and
       tailplane tips, the silver-grey dome on its struts, the red star with a
       white and a dark border on the fin, no tail turret.
     "Beriev A-50 color.jpg" (US DoD, 26 Aug 1988, "Soviet Mainstay"): overall
       white with a light grey dome, a small red star on the fin. The e80 row is
       painted from it; the e90 row carries it with the Russian star (no dated
       1990s photograph was found; that the finish stayed white is an inference).
     Earlier round, kept: "Beriev A-50, Russia - Air Force AN1979130.jpg" (head-on):
       the struts about 0.6 m either side of the centre, the probe, the small
       fairing each side of the lower nose, a dark panel on the nose roof.
   NOT CONFIRMED and so not drawn: any shape difference of the A-50U from the
     A-50 (the U is the A-50 airframe in the U's paint); the flap-track fairings
     as parts (painted only), the dorsal and ventral antenna blisters, the
     wing-underside stars (seen in photographs, left out because the wing texture
     is shared by both skins), the exact paint-line run at the nose.
   RECOGNITION LIST (and where it shows)
     1 high T-tail with its bullet and swept tailplane (FIN, TAILPLANE, the bullet);
     2 high swept wing drooping 3.4 deg (wingSec);
     3 four D-30KP pods slung well ahead of the wing on raked pylons (addPods);
     4 long main-gear fairings low on the fuselage sides (SPON), four-abreast
       wheels (addGear);
     5 the glazed navigator's nose over the chin radome (FUS rows 0-6, addGlass;
       Il-78 only; the A-50 nose is solid);
     6 the stepped cockpit windscreen and side windows (addGlass);
     7 the swept-up rear fuselage with the blunt tail end (FUS rows 30-43);
     8 A-50: the 10.8 m rotodome on two struts, the probe, the tail-tip fairing;
     9 Il-78: three UPAZ pods (two under the wings, one on the port rear fuselage)
       and the tail gunner's glazed station with the gun turret removed;
    10 paint by period on a canvas texture (fuselage, fin, wing bands).
   Team colour (C.team): one small strip on the upper skin of each wing near the
   tip; nothing else. Markings: the national star on each side of the fin; no
   bort numbers, registrations or titles.
   Model space: +X nose, +Y port, +Z up, metres. s below is metres aft of the
   nose tip, h metres above the ground. One mesh per material; the gear (it
   retracts into the fairings and the nose bay) is the group "gear" and the
   lowest opaque part.
   ========================================================================= */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroIl76 = (function () {
  "use strict";

  var V = null;
  var D2R = Math.PI / 180, PI = Math.PI;
  var L3 = 46.6, ZG = -4.0, XN = L3 / 2;
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
     down; both sides share it), the fin (s, h), the wing and tailplane plan
     (s, y), plus colour swatches in the corner the wing never reaches. */
  var TW = 2048, TH = 1024;
  function fusU(s) { return s / 47 * TW; }
  function fusV(th) { return clamp(Math.abs(th) / 180, 0, 1) * 508 + 2; }
  function finU(s) { return (s - 30) / 17 * TW; }
  function finV(h) { return 514 + clamp((15.3 - h) / 10.5, 0, 1) * 252; }
  function wngU(s) { return (s - 10) / 38 * TW; }
  function wngV(y) { return 770 + clamp((y + 26) / 52, 0, 1) * 252; }
  var SW = { wing: [30, 790], dome: [30, 830], bot: [30, 870], top: [30, 910], red: [30, 950], dark: [30, 990] };

  /* ======================================================== the fuselage ==
     Rows: s, upper half-width, lower half-width, roof h, widest-line h, belly h. */
  var FUS = [
    [0.00, 0.10, 0.10, 3.98, 3.72, 3.45],
    [0.40, 0.50, 0.45, 4.28, 3.70, 3.10],
    [0.90, 0.80, 0.72, 4.62, 3.66, 2.64],
    [1.50, 1.08, 0.98, 4.96, 3.62, 2.20],
    [2.20, 1.36, 1.18, 5.44, 3.58, 1.80],
    [3.00, 1.62, 1.34, 6.02, 3.60, 1.50],
    [4.00, 1.88, 1.46, 6.36, 3.66, 1.36],
    [5.00, 2.12, 1.66, 6.48, 3.78, 1.46],
    [6.00, 2.25, 1.98, 6.52, 3.92, 1.62],
    [7.00, 2.34, 2.22, 6.54, 4.00, 1.62],
    [8.50, 2.42, 2.38, 6.55, 4.05, 1.60],
    [10.0, 2.43, 2.43, 6.55, 4.08, 1.58],
    [18.0, 2.43, 2.43, 6.55, 4.08, 1.58],
    [22.0, 2.43, 2.43, 6.46, 4.06, 1.58],
    [26.0, 2.43, 2.43, 6.34, 4.04, 1.58],
    [29.0, 2.43, 2.43, 6.40, 4.08, 1.60],
    [30.5, 2.43, 2.42, 6.52, 4.20, 1.85],
    [32.0, 2.40, 2.38, 6.72, 4.38, 2.12],
    [34.0, 2.30, 2.24, 7.02, 4.65, 2.70],
    [36.0, 2.08, 2.00, 7.28, 5.02, 3.25],
    [38.0, 1.76, 1.66, 7.52, 5.45, 3.93],
    [40.0, 1.42, 1.32, 7.70, 5.90, 4.60],
    [41.5, 1.16, 1.06, 7.80, 6.25, 5.00],
    [42.6, 0.94, 0.84, 7.78, 6.45, 5.32],
    [43.15, 0.66, 0.60, 7.55, 6.50, 5.48],
    [43.45, 0.10, 0.10, 7.05, 6.40, 5.80]
  ];
  var FST = [0, 0.15, 0.4, 0.75, 1.15, 1.6, 2.1, 2.6, 3.1, 3.7, 4.4, 5.2, 6.0, 7.0,
             8.5, 10, 14, 18, 22, 26, 29, 30.5, 32, 33.5, 35, 36.5, 38, 39.5, 41,
             41.8, 42.6, 43.0, 43.3, 43.45];
  var FN = 26, FEXP = 0.9;
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
     inside of its ring pair; normals are smoothed over shared vertices; caps keep
     their own vertices. Each emitted triangle carries its material key and the
     texture band its UVs come from. */
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
        var cat = upper ? upper(i, r) : 0;
        cat = cat === true ? 0 : (cat === false ? 1 : cat);
        this.tri(idx[r][i], idx[r][j], idx[r + 1][j], cat, od);
        this.tri(idx[r][i], idx[r + 1][j], idx[r + 1][i], cat, od);
      }
    }
    if (capA) this.fan(rings[0], cent[0], cent[1]);
    if (capB) this.fan(rings[R - 1], cent[R - 1], cent[R - 2]);
  };
  /* map: category -> [material key, uv band] ; band is "fus", "fin", "wng" or a swatch name */
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
      if (!map[c]) continue;
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
      put(map[c][0], g, map[c][1]);
    }
  };

  var K = null;
  /* every skin geometry gets its UVs here, from its own vertex positions */
  function uvFor(g, band) {
    var p = g.attributes.position.array, n = p.length / 3, uv = new Float32Array(n * 2), i, U, W;
    for (i = 0; i < n; i++) {
      var x = p[3 * i], y = p[3 * i + 1], z = p[3 * i + 2], s = S_(x), h = H_(z);
      if (band === "fus") {
        var th = Math.atan2(Math.abs(y), h - fusHc(clamp(s, 0, 43.45))) / D2R;
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
  function foilHalf(sec, s) {
    var u = Math.min(1, Math.max(0, (s - sec.s) / sec.c));
    return sec.t * sec.c * (1.4845 * Math.sqrt(u) - 0.63 * u - 1.758 * u * u + 1.4215 * u * u * u - 0.518 * u * u * u * u);
  }
  function foil(secs, frame, key, band, kc) {
    var rings = [], i, sh = new Shell(), KC = kc || 9;
    for (i = 0; i < secs.length; i++) rings.push(foilRing(secs[i], frame, KC));
    sh.loft(rings, null, true, true);
    sh.emit({ 0: [key, band], 2: [key, band] });
  }
  function finSecs(yc, hs, sle, cs, t) {
    var out = [], i;
    for (i = 0; i < hs.length; i++) out.push({ a: hs[i], s: sle[i], c: cs[i], t: t[i], o: yc });
    return out;
  }

  function addFuselage() {
    var rings = [], r, i, sh = new Shell();
    for (r = 0; r < FST.length; r++) {
      var ring = [];
      for (i = 0; i < FN; i++) ring.push(fusPt(FST[r], i * 360 / FN, 0));
      rings.push(ring);
    }
    sh.loft(rings, null, true, true);
    sh.emit({ 0: ["skin", "fus"], 2: ["skin", "fus"] });
  }

  /* ============================================================== wing ==
     High, swept 28 deg at the leading edge, the trailing edge cranked at 11 m;
     the mean line 6.6 m up at the root, falling 0.059 a metre (3.4 deg). */
  function wingLE(a) { return 12.43 + 0.54 * a; }
  function wingTE(a) { return a <= 11 ? 23.36 + 0.135 * a : 24.85 + 0.28 * (a - 11); }
  function wingO(a) { return 6.62 - 0.059 * Math.max(0, a - 2.2); }
  function wingSec(y) {
    var a = Math.abs(y), le = wingLE(a);
    return { a: y, s: le, c: wingTE(a) - le, t: 0.135 - 0.0018 * a, o: wingO(a) };
  }
  var WTIP = 25.3;
  function addWing() {
    var ys = [-25.3, -24.2, -22.0, -19.0, -16.0, -13.0, -11.0, -8.5, -6.3, -4.0, -2.2, 0,
              2.2, 4.0, 6.3, 8.5, 11.0, 13.0, 16.0, 19.0, 22.0, 24.2, 25.3], i, secs = [];
    for (i = 0; i < ys.length; i++) secs.push(wingSec(ys[i]));
    /* the rounded tip: a short closing section */
    secs[0] = { a: -25.3, s: wingLE(25.3) + 0.6, c: wingTE(25.3) - wingLE(25.3) - 0.9, t: 0.07, o: wingO(25.3) };
    secs[secs.length - 1] = { a: 25.3, s: wingLE(25.3) + 0.6, c: wingTE(25.3) - wingLE(25.3) - 0.9, t: 0.07, o: wingO(25.3) };
    foil(secs, "w", "skin", "wng", 11);
    /* the wing-root fairing on the roof, from the leading edge back over the
       flaps (the plan and side views) */
    var fr = [], s, k;
    for (k = 0; k <= 10; k++) {
      s = 12.0 + k * 1.45;
      var hw = 2.3 * Math.sin(Math.min(1, k / 2.2) * PI / 2) * (k > 7 ? Math.cos((k - 7) / 3 * PI / 2) * 0.9 + 0.1 : 1);
      var ht = 6.55 + (k < 2 ? 0.4 * k : (k > 7 ? 0.8 * (10 - k) / 3 : 0.8)) * 0.95;
      var ring = [], i2;
      for (i2 = 0; i2 < 14; i2++) {
        var a = -90 + i2 * 180 / 13;
        ring.push([X(s), Math.max(0.05, hw) * Math.sin(a * D2R), Z(6.1 + (ht - 6.1) * Math.cos(a * D2R))]);
      }
      fr.push(ring);
    }
    var sh = new Shell(); sh.loft(fr.map(function (r) { return r.concat([[r[13][0], r[13][1] * 0.98, r[13][2] - 0.4], [r[0][0], r[0][1] * 0.98, r[0][2] - 0.4]]); }), null, true, true);
    sh.emit({ 0: ["skin", "fus"], 2: ["skin", "fus"] });
    /* the team's colour: a small strip on each wing's upper skin near the tip */
    var sd, ia, ib, y, sec, pos, arr;
    for (sd = -1; sd <= 1; sd += 2) {
      pos = [];
      for (ia = 0; ia <= 2; ia++) {
        var rows = [];
        for (ib = 0; ib <= 4; ib++) {
          y = sd * (20.6 + 0.5 * ia); sec = wingSec(y);
          s = sec.s + sec.c * (0.25 + 0.45 * ib / 4);
          rows.push([X(s), y, Z(sec.o + foilHalf(sec, s) + 0.035)]);
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

  /* ============================================================== tail == */
  function finLE(h) { return h < 9 ? 31.3 + (h - 7.0) * 2.06 : 35.42 + (h - 9.0) * 0.88; }
  function finTE(h) { return 42.55 + Math.max(0, h - 8.0) * 0.50; }
  function finSec(h) {
    var le = finLE(h);
    return { a: h, s: le, c: finTE(h) - le, t: 0.11 - 0.03 * (h - 7) / 7, o: 0 };
  }
  function addFin() {
    var hs = [6.9, 7.5, 8.2, 9.0, 10.2, 11.5, 12.7, 13.9], i, secs = [];
    for (i = 0; i < hs.length; i++) secs.push(finSec(hs[i]));
    foil(secs, "f", "skin", "fin", 10);
    /* the bullet at the fin top, carrying the tailplane */
    var B = [[0, 0.02], [0.5, 0.22], [1.4, 0.36], [3.0, 0.43], [6.5, 0.44], [8.6, 0.36], [9.6, 0.10]];
    addBody(36.9, 0, 14.35, B, 12, "skin", "top", null);
  }
  function tpSec(y) {
    var a = Math.abs(y);
    return { a: y, s: 38.7 + 0.68 * a, c: 43.85 + 0.31 * a - (38.7 + 0.68 * a), t: 0.10 - 0.003 * a, o: 14.3 };
  }
  function addTailplane() {
    var ys = [-8.65, -8.2, -6.6, -4.4, -2.2, 0, 2.2, 4.4, 6.6, 8.2, 8.65], i, secs = [];
    for (i = 0; i < ys.length; i++) secs.push(tpSec(ys[i]));
    secs[0].t = secs[10].t = 0.05; secs[0].s += 0.3; secs[10].s += 0.3; secs[0].c -= 0.5; secs[10].c -= 0.5;
    foil(secs, "w", "skin", "wng", 9);
  }

  /* a body of revolution along -X: rows (distance back from the front, radius) */
  function addBody(s0, yc, hc, rows, seg, key, band, capBand) {
    var rings = [], r, i, sh = new Shell(), a;
    for (r = 0; r < rows.length; r++) {
      var row = [];
      for (i = 0; i < seg; i++) {
        a = i * 360 / seg;
        row.push([X(s0 + rows[r][0]), yc + rows[r][1] * Math.sin(a * D2R), Z(hc) + rows[r][1] * Math.cos(a * D2R)]);
      }
      rings.push(row);
    }
    sh.loft(rings, null, true, true);
    var map = { 0: [key, band] };
    map[2] = capBand ? ["dark", null] : [key, band];
    sh.emit(map);
  }

  /* ============================================================== pods ==
     D-30KP nacelles (the plan and side views): the lip, the fan cowl, the
     reverser bulge, the tapering hot section; the fan face and the exhaust dark. */
  var POD = [[0.00, 0.84], [0.06, 0.92], [0.30, 0.95], [1.4, 0.95], [2.6, 0.93], [3.4, 0.90],
             [3.9, 0.82], [4.6, 0.70], [5.1, 0.60], [5.4, 0.56]];
  function addPod(sLip, yc, hc) {
    addBody(sLip, yc, hc, POD, 16, "skin", "wing", null);
    /* the fan face, set back in the lip, and the exhaust with its cone */
    var g = new V.CircleGeometry(0.80, 16); g.rotateY(PI / 2); g.translate(X(sLip + 0.32), yc, Z(hc)); put("dark", g);
    g = new V.CylinderGeometry(0.80, 0.84, 0.32, 16, 1, true); g.rotateZ(PI / 2); g.translate(X(sLip + 0.16), yc, Z(hc)); put("dark", g);
    g = new V.CircleGeometry(0.53, 14); g.rotateY(-PI / 2); g.translate(X(sLip + 5.38), yc, Z(hc)); put("dark", g);
    g = new V.ConeGeometry(0.30, 0.8, 10); g.rotateZ(PI / 2); g.translate(X(sLip + 5.6), yc, Z(hc)); put("metal", g);
  }
  function addPods() {
    var P = [[6.35, 11.5, 4.25], [10.55, 13.7, 3.92]], i, sd, p, sec;
    for (i = 0; i < P.length; i++) {
      p = P[i]; sec = wingSec(p[0]);
      for (sd = -1; sd <= 1; sd += 2) {
        addPod(p[1], sd * p[0], p[2]);
        /* the pylon: raked forward, from the cowl top to the wing's under-skin */
        var lo = p[2] + 0.80, hi = sec.o - 0.15;
        foil(finSecs(sd * p[0], [lo, (lo + hi) / 2, hi], [p[1] + 1.2, p[1] + 1.9, sec.s - 0.2],
                     [4.0, 3.9, 4.4], [0.075, 0.075, 0.07]), "f", "skin", "wing", 6);
      }
    }
  }

  /* ========================================================== sponsons ==
     The main-gear fairings (side view 13.3-29.5 m, front view 3.5 m out):
     rows: s, outer half-width about y = 2.55, top h, bottom h. */
  var SPON = [[13.3, 0.08, 2.55, 2.30], [14.5, 0.46, 2.85, 1.55], [16.0, 0.72, 3.00, 1.15],
              [18.0, 0.82, 3.05, 0.90], [19.5, 0.85, 3.05, 0.83], [24.5, 0.85, 3.05, 0.83],
              [26.2, 0.82, 3.05, 0.95], [27.6, 0.72, 3.00, 1.25], [28.8, 0.46, 2.90, 1.75],
              [29.6, 0.08, 2.75, 2.45]];
  function addSponsons() {
    var sd, k, i, s, row, rings, sh, ring, a, n = 14, hm;
    for (sd = -1; sd <= 1; sd += 2) {
      rings = []; sh = new Shell();
      for (k = 0; k <= 14; k++) {
        s = 13.3 + (29.6 - 13.3) * k / 14; row = tab(SPON, s); ring = [];
        hm = (row[1] + row[2]) / 2;
        for (i = 0; i < n; i++) {
          a = i * 360 / n;
          ring.push([X(s), sd * (2.58 + row[0] * sgp(Math.sin(a * D2R), 0.8) * (Math.sin(a * D2R) < 0 ? 1.2 : 1)),
                     Z(hm + (row[1] - row[2]) / 2 * sgp(Math.cos(a * D2R), 0.8))]);
        }
        rings.push(ring);
      }
      sh.loft(rings, null, true, true);
      sh.emit({ 0: ["skin", "fus"], 2: ["skin", "fus"] });
    }
  }

  /* ============================================================ rotodome (A-50) ==
     A lens 10.8 m across, 1.7 m deep, centred 24.8 m aft of the nose and 9.5 m
     up, on two struts 0.62 m either side of the centre. */
  var DX = 24.8, DR = 5.4, DC = 9.5, DHT = 0.88, DHB = 0.82, DEXP = 2.6, DN = 30;
  function addDome() {
    var rings = [], k, n = 12, sh = new Shell(), i;
    for (k = 0; k <= n; k++) {
      var f = PI * k / n, cs = Math.cos(f), sn = Math.abs(Math.sin(f));
      var r = Math.max(DR * Math.pow(sn, 2 / DEXP), 0.03), h = DC + (cs >= 0 ? DHT : DHB) * sgp(cs, 2 / DEXP);
      var ring = [];
      for (i = 0; i < DN; i++) { var b = i * 2 * PI / DN; ring.push([X(DX) + r * Math.cos(b), r * Math.sin(b), Z(h)]); }
      rings.push(ring);
    }
    sh.loft(rings, null, true, true);
    sh.emit({ 0: ["skin", "dome"], 2: ["skin", "dome"] });
    /* the dark dielectric band round the rim (photographs: a darker edge band) */
    var g2 = new V.CylinderGeometry(DR * 0.985, DR * 0.985, 0.32, DN, 1, true);
    g2.rotateX(PI / 2); g2.translate(X(DX), 0, Z(DC - 0.02));
    put("skin", g2, "bot");
    var sd;
    for (sd = -1; sd <= 1; sd += 2) {
      foil(finSecs(sd * 0.62, [6.4, 7.6, 8.8], [DX - 1.15, DX - 0.95, DX - 0.8], [2.4, 1.9, 1.7], [0.20, 0.22, 0.24]),
           "f", "skin", "wing", 6);
    }
    /* the fairing joining the struts on the roof */
    foil(finSecs(0, [6.45, 6.95, 7.5], [DX - 2.3, DX - 1.6, DX - 1.05], [4.6, 3.2, 2.1], [0.10, 0.14, 0.20]),
         "f", "skin", "top", 6);
  }

  /* ============================================================ UPAZ (Il-78) ==
     The three hose-drum pods: one under each wing 17.2 m out, one on a short
     pylon low on the PORT side of the rear fuselage. Rows: back from the nose, radius. */
  var UPAZ = [[0.00, 0.10], [0.25, 0.32], [0.7, 0.48], [1.4, 0.53], [4.9, 0.53], [5.6, 0.47],
              [6.0, 0.40], [6.2, 0.36]];
  function addUPAZ() {
    var sd, y = 17.2, sec = wingSec(y), sLip = 20.9, g;
    for (sd = -1; sd <= 1; sd += 2) {
      addBody(sLip, sd * y, 4.55, UPAZ, 14, "skin", "wing", null);
      g = new V.CircleGeometry(0.30, 12); g.rotateY(-PI / 2); g.translate(X(sLip + 6.21), sd * y, Z(4.55)); put("dark", g);
      foil(finSecs(sd * y, [5.0, sec.o - 0.1], [sLip + 1.6, sLip + 1.8], [3.4, 3.8], [0.08, 0.08]), "f", "skin", "wing", 6);
    }
    /* the fuselage pod: 5.2 m long, lip 34 m aft of the nose, 2.55 m out to port */
    var R = [[0.00, 0.10], [0.25, 0.32], [0.65, 0.46], [1.3, 0.50], [4.2, 0.50], [4.8, 0.44], [5.2, 0.36]];
    addBody(34.0, 2.55, 3.15, R, 14, "skin", "bot", null);
    g = new V.CircleGeometry(0.30, 12); g.rotateY(-PI / 2); g.translate(X(34.0 + 5.21), 2.55, Z(3.15)); put("dark", g);
    foil(finSecs(2.30, [3.55, 3.95], [35.3, 35.2], [3.0, 3.3], [0.10, 0.10]), "f", "skin", "bot", 6);
  }

  /* ======================================================== glass, details */
  function glassPane(s0, s1, a0, a1, ns, na, key, band) {
    var pp = 0.04, i, j, P = [], pos = [], nor = [];
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
      var tri1 = [A, B, C], tri2 = [A, C, E];
      if (nx * cx + ny * cy + nz * cz < 0) { tri1 = [A, C, B]; tri2 = [A, E, C]; }
      var L = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1, sg = (nx * cx + ny * cy + nz * cz < 0) ? -1 : 1;
      [tri1, tri2].forEach(function (t) {
        t.forEach(function (p) { pos.push(p[0], p[1], p[2]); nor.push(sg * nx / L, sg * ny / L, sg * nz / L); });
      });
    }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    put(key || "glass", g, band);
  }

  var _m4 = null, _q = null, _v = null, _u = null;
  function boxG(sx, sy, sz, x, y, z) { var g = new V.BoxGeometry(sx, sy, sz); g.translate(x, y, z); return g; }
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
  function wheelG(r, w, x, y, z, seg) { var g = new V.CylinderGeometry(r, r, w, seg || 12); g.translate(x, y, z); return g; }

  /* the cockpit: the windscreen in two tiers across the front (the side view and
     the photographs) and three side windows a side; the navigator's glazed nose
     (Il-78 only: a grid of panes on the lower front of the nose cone) */
  function addGlass(kind) {
    var i, sd, wc = [-58, -38, -18, 0, 18, 38, 58];
    for (i = 0; i < 6; i++) glassPane(2.75, 3.45, wc[i], wc[i + 1], 1, 2);
    var wu = [-40, -14, 14, 40];
    for (i = 0; i < 3; i++) glassPane(3.55, 3.95, wu[i], wu[i + 1], 1, 2);
    for (sd = -1; sd <= 1; sd += 2) {
      glassPane(3.0, 3.7, sd * 62, sd * 80, 1, 1);
      glassPane(3.85, 4.5, sd * 64, sd * 80, 1, 1);
      glassPane(4.65, 5.25, sd * 64, sd * 80, 1, 1);
    }
    if (kind === "il78") {
      var nc = [104, 126, 148, 170, 190, 212, 234, 256];
      var ns = [0.25, 0.75, 1.25, 1.75];
      for (i = 0; i < nc.length - 1; i++) for (var j = 0; j < ns.length - 1; j++)
        glassPane(ns[j] + 0.05, ns[j + 1] - 0.05, nc[i] + 2, nc[i + 1] - 2, 1, 1);
    }
  }

  /* national star on each fin side: painted into the texture (see paint) */

  function addNose(kind) {
    var g, sd;
    if (kind === "a50") {
      /* the white fairing each side of the lower nose (the head-on photograph) */
      for (sd = -1; sd <= 1; sd += 2) {
        g = new V.SphereGeometry(1, 10, 7); g.scale(0.95, 0.30, 0.28);
        g.translate(X(4.6), sd * 2.02, Z(3.0)); put("skin", g, "top");
      }
      /* the refuelling probe forward over the windscreen (photographs) */
      put("dark", rod([X(3.4), 0.55, Z(6.3)], [X(0.35), 0.55, Z(5.75)], 0.09, 6));
      g = new V.SphereGeometry(0.13, 6, 5); g.translate(X(0.3), 0.55, Z(5.74)); put("dark", g);
    }
    /* roof antennas over the cockpit (the side view: two blades) */
    put("dark", boxG(0.5, 0.05, 0.35, X(6.2), 0, Z(6.7)));
    put("dark", boxG(0.4, 0.05, 0.30, X(10.0), 0, Z(6.68)));
  }

  /* the tail end: Il-76/Il-78 the gunner's station (glazed, on the blunt end),
     the Il-78 with its turret removed and faired (the photographs: no guns);
     A-50: a pointed fairing in its place (the A-50 drawing and photographs) */
  function addTail(kind) {
    var g, sd;
    if (kind === "a50") {
      var T = [[0, 0.62], [0.4, 0.58], [0.9, 0.45], [1.4, 0.26], [1.75, 0.05]];
      addBody(42.85, 0, 6.35, T, 14, "skin", "top", null);
      return;
    }
    /* the gunner's windows: a side window each side and the rear panes */
    for (sd = -1; sd <= 1; sd += 2) glassPane(41.6, 42.5, sd * 40, sd * 70, 1, 1);
    glassPane(42.75, 43.2, -28, 28, 1, 2);
    /* the faired turret position low on the tail end */
    g = new V.SphereGeometry(1, 12, 8, 0, PI * 2, 0, PI * 0.55); g.scale(0.70, 0.62, 0.62);
    g.rotateZ(-PI / 2); g.translate(X(43.15), 0, Z(5.85)); put("skin", g, "bot");
  }

  /* gear (it retracts): nose leg 8.5 m aft, four wheels; two axles a side at 20.1
     and 22.6 m with four wheels abreast. Every wheel bottom is h = 0. */
  function addGear(G) {
    var sd, i, sc;
    G.metal.push(rod([X(8.5), 0, Z(1.7)], [X(8.5), 0, Z(0.55)], 0.11, 8));
    G.metal.push(rod([X(7.6), 0, Z(1.7)], [X(8.5), 0, Z(1.0)], 0.05, 6));
    G.metal.push(rod([X(8.5), -0.75, Z(0.55)], [X(8.5), 0.75, Z(0.55)], 0.07, 6));
    [-0.62, -0.21, 0.21, 0.62].forEach(function (y) {
      var w = wheelG(0.55, 0.30, X(8.5), y, Z(0.55), 12); G.tyre.push(w);
    });
    for (sd = -1; sd <= 1; sd += 2) {
      [20.1, 22.6].forEach(function (s) {
        G.metal.push(rod([X(s), sd * 3.05, Z(1.25)], [X(s), sd * 3.05, Z(0.65)], 0.14, 8));
        G.metal.push(rod([X(s), sd * 2.1, Z(0.65)], [X(s), sd * 4.0, Z(0.65)], 0.09, 6));
        [2.3, 2.78, 3.32, 3.8].forEach(function (y) {
          G.tyre.push(wheelG(0.65, 0.42, X(s), sd * y, Z(0.65), 12));
        });
      });
      /* the open bay doors hanging under each fairing */
      G.metal.push(boxG(4.6, 0.05, 0.55, X(21.35), sd * 1.95, Z(0.95)));
    }
    G.metal.push(boxG(2.0, 0.05, 0.6, X(8.4), 0.95, Z(1.25)));
    G.metal.push(boxG(2.0, 0.05, 0.6, X(8.4), -0.95, Z(1.25)));
  }

  /* ========================================================= paint ==
     Colours sampled off the photographs, taken to about 0.85 of their level. */
  var PAINT = {
    /* 1988 DoD photograph: overall white, light grey dome, white-grey wings */
    a50_88: { top: "#c9ccca", bot: "#babebf", wing: "#bfc2c2", dome: "#b4b8ba", split: 96, nosePanel: true,
              starAt: [38.7, 9.7, 0.72] },
    /* A-50U photograph: light grey over a blue-grey belly, grey wings and dome */
    a50u:   { top: "#b4b9b9", bot: "#6c757d", wing: "#8d9396", dome: "#959b9e", split: 70, nosePanel: true,
              starAt: [39.8, 10.3, 1.12] },
    /* Il-78 photographs: light grey-white over a slightly darker grey belly */
    il78:   { top: "#bfc3c3", bot: "#9da3a8", wing: "#a9aeb1", dome: "#a9aeb1", split: 98, nosePanel: false,
              starAt: [39.8, 10.3, 1.12] }
  };
  function star(g, cx, cy, rx, ry, kind) {
    function path(f) {
      g.beginPath();
      for (var i = 0; i < 10; i++) {
        var a = -PI / 2 + i * PI / 5, q = (i & 1) ? 0.40 : 1;
        var x = cx + Math.cos(a) * q * rx * f, y = cy + Math.sin(a) * q * ry * f;
        if (i) g.lineTo(x, y); else g.moveTo(x, y);
      }
      g.closePath();
    }
    if (kind === "soviet") {
      g.fillStyle = "#a8261f"; path(1.24); g.fill();
      g.fillStyle = "#e2e0d8"; path(1.12); g.fill();
      g.fillStyle = "#b22a22"; path(1.0); g.fill();
    } else {
      g.fillStyle = "#1f2433"; path(1.28); g.fill();
      g.fillStyle = "#e2e0d8"; path(1.16); g.fill();
      g.fillStyle = "#8a1a22"; path(1.0); g.fill();
    }
  }
  var _cv = {};
  function paint(spec) {
    var key = spec.kind + "/" + spec.paint + "/" + spec.star;
    if (_cv[key]) return _cv[key];
    var P = PAINT[spec.paint] || PAINT.a50u;
    var cv = document.createElement("canvas"); cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), i, s, x, y, sd, R0 = 31337;
    function R() { R0 = (R0 * 16807) % 2147483647; return R0 / 2147483647; }
    /* ---- fuselage band */
    g.fillStyle = P.top; g.fillRect(0, 0, TW, 512);
    var vs = fusV(P.split);
    g.fillStyle = P.bot; g.fillRect(0, vs, TW, 512 - vs);
    if (P.split < 90) {
      /* the A-50U paint line rises to just under the windscreen at the nose */
      g.beginPath(); g.moveTo(0, fusV(40)); g.lineTo(fusU(2.6), fusV(52)); g.lineTo(fusU(6), vs);
      g.lineTo(fusU(6), 512); g.lineTo(0, 512); g.closePath(); g.fill();
    }
    /* frames and stringers */
    g.strokeStyle = "rgba(0,0,0,0.16)"; g.lineWidth = 1;
    for (s = 5.5; s < 43; s += 1.9) { x = fusU(s); g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 512); g.stroke(); }
    g.strokeStyle = "rgba(0,0,0,0.10)";
    [30, 62, 120, 150].forEach(function (a) { y = fusV(a); g.beginPath(); g.moveTo(fusU(5), y); g.lineTo(fusU(41), y); g.stroke(); });
    /* the crew door forward on the side and the hatch over the wing trailing
       edge (the side view) */
    g.strokeStyle = "rgba(0,0,0,0.42)"; g.lineWidth = 2;
    g.strokeRect(fusU(7.6), fusV(78), fusU(8.7) - fusU(7.6), fusV(122) - fusV(78));
    g.strokeRect(fusU(27.9), fusV(32), fusU(28.8) - fusU(27.9), fusV(62) - fusV(32));
    /* the cargo ramp and rear doors outline under the upswept tail */
    g.strokeStyle = "rgba(0,0,0,0.35)";
    g.beginPath(); g.moveTo(fusU(32.5), fusV(130)); g.lineTo(fusU(41.8), fusV(110)); g.stroke();
    g.beginPath(); g.moveTo(fusU(36.5), fusV(178)); g.lineTo(fusU(36.5), fusV(122)); g.stroke();
    /* the dark nose-roof panel ahead of the windscreen (A-50 head-on photograph) */
    if (P.nosePanel && spec.kind === "a50") {
      g.fillStyle = "rgba(40,44,48,0.85)"; g.fillRect(fusU(1.7), fusV(0), fusU(2.7) - fusU(1.7), fusV(48) - fusV(0));
    }
    /* the windscreen frames are geometry; soot behind nothing; light weathering */
    for (i = 0; i < 90; i++) {
      g.fillStyle = "rgba(30,30,28," + (0.02 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * 512, 20 + R() * 70, 2 + R() * 6);
    }
    /* ---- fin band */
    g.fillStyle = P.top; g.fillRect(0, 512, TW, 256);
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 2;
    /* the rudder hinge line, in two sections */
    g.beginPath(); g.moveTo(finU(42.0), finV(8.3)); g.lineTo(finU(43.9), finV(13.6)); g.stroke();
    g.beginPath(); g.moveTo(finU(42.9), finV(10.9)); g.lineTo(finU(43.7 + 0.5), finV(10.9)); g.stroke();
    g.strokeStyle = "rgba(0,0,0,0.12)"; g.lineWidth = 1;
    for (i = 0; i < 6; i++) { g.beginPath(); g.moveTo(finU(34 + i * 1.5), finV(7.2)); g.lineTo(finU(37.5 + i * 1.3), finV(13.6)); g.stroke(); }
    /* the star: small and forward on the 1988 aeroplane, large mid-fin on today's
       A-50U and Il-78 (the photographs) */
    var sa = P.starAt;
    if (spec.star) star(g, finU(sa[0]), finV(sa[1]), sa[2] * TW / 17, sa[2] * 252 / 10.5, spec.star);
    /* ---- wing band */
    g.fillStyle = P.wing; g.fillRect(0, 768, TW, 256);
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.5;
    for (sd = -1; sd <= 1; sd += 2) {
      /* slats along the leading edge, flaps and ailerons along the trailing edge */
      g.beginPath(); g.moveTo(wngU(wingLE(3) + 0.9), wngV(sd * 3)); g.lineTo(wngU(wingLE(24.5) + 0.6), wngV(sd * 24.5)); g.stroke();
      g.beginPath(); g.moveTo(wngU(wingTE(2.6) - 2.6), wngV(sd * 2.6)); g.lineTo(wngU(wingTE(11) - 2.2), wngV(sd * 11));
      g.lineTo(wngU(wingTE(24.5) - 1.0), wngV(sd * 24.5)); g.stroke();
      [6.0, 11.0, 15.5, 19.5].forEach(function (a) {
        g.beginPath(); g.moveTo(wngU(wingTE(a) - 2.4 + a * 0.05), wngV(sd * a)); g.lineTo(wngU(wingTE(a)), wngV(sd * a)); g.stroke();
      });
      /* flap-track fairings, dark marks under the trailing edge */
      g.fillStyle = "rgba(0,0,0,0.22)";
      [4.5, 8.0, 12.5, 16.0].forEach(function (a) { g.fillRect(wngU(wingTE(a) - 1.2), wngV(sd * a) - 1, wngU(1.6) - wngU(0), 3); });
      /* the red-orange tips (A-50U and Il-78 photographs) */
      g.fillStyle = "#b8452c";
      g.beginPath(); g.moveTo(wngU(wingLE(23.9)), wngV(sd * 23.9)); g.lineTo(wngU(wingTE(23.9)), wngV(sd * 23.9));
      g.lineTo(wngU(wingTE(26)), wngV(sd * 26)); g.lineTo(wngU(wingLE(26)), wngV(sd * 26)); g.closePath(); g.fill();
      g.beginPath(); g.moveTo(wngU(38.7 + 0.68 * 7.6), wngV(sd * 7.6)); g.lineTo(wngU(43.85 + 0.31 * 7.6), wngV(sd * 7.6));
      g.lineTo(wngU(44.6 + 0.31 * 9), wngV(sd * 9)); g.lineTo(wngU(38.7 + 0.68 * 9), wngV(sd * 9)); g.closePath(); g.fill();
      /* the elevator hinge line */
      g.strokeStyle = "rgba(0,0,0,0.30)";
      g.beginPath(); g.moveTo(wngU(42.6), wngV(sd * 0.6)); g.lineTo(wngU(44.9), wngV(sd * 8.3)); g.stroke();
    }
    /* ---- swatches */
    function sw(name, col) { var p = SW[name]; g.fillStyle = col; g.fillRect(p[0] - 24, p[1] - 14, 48, 28); }
    sw("wing", P.wing); sw("dome", P.dome); sw("bot", P.bot); sw("top", P.top); sw("red", "#b8452c"); sw("dark", "#2a2e31");
    _cv[key] = cv;
    return cv;
  }
  var _tex = {};
  function skinTexture(spec) {
    var key = spec.kind + "/" + spec.paint + "/" + spec.star;
    if (_tex[key] !== undefined) return _tex[key];
    var t = false;
    try {
      t = new V.CanvasTexture(paint(spec));
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = false; }
    _tex[key] = t;
    return t;
  }

  function makeMats(C, spec) {
    var m = {}, tex = skinTexture(spec), P = PAINT[spec.paint] || PAINT.a50u;
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.74, metalness: 0.10, side: V.DoubleSide });
    if (tex) m.skin.map = tex; else m.skin.color.set(P.top);
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10, side: V.DoubleSide });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.dark = new V.MeshStandardMaterial({ color: 0x24282b, roughness: 0.82, metalness: 0.12, side: V.DoubleSide });
    m.tyre = new V.MeshStandardMaterial({ color: 0x1b1d1e, roughness: 0.92, metalness: 0.02 });
    m.glass = new V.MeshStandardMaterial({ color: 0x223040, roughness: 0.12, metalness: 0.50,
                                           transparent: true, opacity: 0.86, side: V.DoubleSide });
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

  /* spec: { kind: "a50" | "il78", star: "soviet" | "russian", paint: PAINT key } */
  function build(THREE, M, C, spec) {
    V = THREE;
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    K = {};
    addFuselage();
    addWing();
    addTailplane();
    addFin();
    addPods();
    addSponsons();
    addGlass(spec.kind);
    addNose(spec.kind);
    addTail(spec.kind);
    if (spec.kind === "a50") addDome();
    if (spec.kind === "il78") addUPAZ();
    var G = { metal: [], tyre: [] };
    addGear(G);
    var mats = makeMats(C, spec);
    var root = new V.Group();
    emit(root, K, mats, ["skin", "metal", "dark", "team", "glass"]);
    var gear = new V.Group();
    gear.name = "gear";
    emit(gear, G, mats, ["metal", "tyre"]);
    root.add(gear);
    return root;
  }

  return { build: build };
})();

/* the A-50 builder name the earlier file exported, kept for anything that calls it */
var HeroA50 = { build: function (THREE, M, C, spec) { return HeroIl76.build(THREE, M, C, spec); } };

(function () {
  var ROWS = {
    pact_e80_awacs: { kind: "a50", star: "soviet",  paint: "a50_88" },
    pact_e90_awacs: { kind: "a50", star: "russian", paint: "a50_88" },
    pact_e00_awacs: { kind: "a50", star: "russian", paint: "a50u" },
    awacs_p:        { kind: "a50", star: "russian", paint: "a50u" },
    /* the PLAAF's KJ-2000 (2007) is an Il-76 with a FIXED dome carrying three AESA arrays
       (en.wikipedia "Shaanxi KJ-2000"); drawn as the A-50U, a STAND-IN: the A-50's rotodome and
       its nose and tail fittings are not the KJ-2000's.  No star (star: null). */
    pla_e00_awacs:  { kind: "a50", star: null,      paint: "a50u" }
  };
  function reg(key) {
    UNIT_MODELS[key] = {
      len: 46.6,
      build: function (THREE, M, C) { return HeroA50.build(THREE, M, C, ROWS[key]); }
    };
  }
  for (var k in ROWS) reg(k);
})();
