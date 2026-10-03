/* ============ ru_shmel.js - HERO model: Project 1204 "Shmel" armoured river gunboat ============
   Key: pact_e60_patrol ("Shmel Gunboat", Project 1204, built 1967-72).
   Published figures (en.wikipedia "Shmel-class patrol boat" and ru.wikipedia "Artilleriyskie katera
   proekta 1204", both citing Chernikov 2007): length 27.4 m, beam 4.32 m, draught 0.85 m (en) / 1 m
   (ru), 71 t full load (en), 73.4 t standard and 77.4 t full load (ru, the modernised boats).
   The hull is built to 27.4 x 4.32 m with the keel at about -0.87 m.  facts.js: one 76 mm D-56TS in the PT-76B turret, coaxial 7.62 mm,
   one 140 mm BM-14-17 rocket launcher; 10 mm armour on the bridge sides, 15 mm on the bow.

   References (Wikimedia Commons, museum boats, all cached under shmel_ref in the scratchpad):
     "PSKR Shmel in the Great Patriotic War Museum 5-jun-2014 Side.jpg"  (boat 134, Moscow,
         clean starboard side)
     "Project 1204 ('Shmel' class) '134' - Victory Park, Moscow (24922960298).jpg"  (same boat,
         starboard side, lighter light)
     "AKA-2-2 'Shmel' proekta 1204 (Astrakhan).jpg"  (boat 073 on a plinth: bow quarter, the
         raked stem, the hull form above the red bottom)
   What each feature rests on:
     - hull: long flush deck, beam carried nearly to the stern, a raked stem, a flat chined
       bottom, light sheer rising to the bow; stations scaled off the side photographs (the
       turret ring at about 22 % of the length from the bow, the wheelhouse front at 33 %, its
       rear at 59 %, the launcher at 71 %, the aft mount at 83 %); chined bottom from the
       Astrakhan plinth photograph
     - the PT-76B turret (extractor, headlamp: copied from js/hero/ru_pt76.js) on a low round
       barbette at the forecastle, gun forward: all three photographs
     - wheelhouse: a faceted armoured block with sloped front and sides, two front windows with
       hinged armoured shutters, small side windows, a raised bridge block on its after half
       with a lifebuoy on the back, and a lower aft deckhouse behind it: all three
     - lattice mast leaning aft behind the raised block, a radar platform with a small
       antenna, a yard, two whip aerials: Moscow and Astrakhan photographs
     - the BM-14-17 launcher (17 tubes in 6 + 5 + 6) on a drum behind the aft deckhouse, tubes
       raised and pointing aft: Moscow photographs
     - the aft twin 25 mm mount in a box shield on a plinth, barrels raised and pointing aft:
       Moscow photographs; the dark fender strips low on the hull side and two scuttles: Moscow
     - paint: mid grey (about 0x8c9698 sampled from the photographs) with a darker deck and
       a red-brown anti-fouling bottom (the Moscow and Astrakhan boats show it above the
       waterline because they are ashore or high)
   FIT AGAINST THE PHOTOGRAPHS (boat 134, Moscow, two photographs): bow to stern the PT-76B turret,
   the wheelhouse with its raised bridge block (lifebuoy on the back, lattice mast behind it), a
   low aft deckhouse with a side door, the BM-14-17 on a round drum just behind that house with the
   tube bank elevated about 17 degrees and pointing AFT (stowed), a low box, then the twin 25 mm
   in a boxy shield with its barrels raised steeply and pointing aft (stowed), then bare deck.
   ru.wikipedia says the 25 mm 2M-3M replaced the original twin 14.5 mm 2M-6 in service, so the
   boat as photographed is a refitted one; the original 14.5 mm fit is not drawn (no photograph).
   The 17 tubes (6 + 5 + 6) are the published BM-14-17 figure; the photographs do not resolve the
   count.  Deck line nearly flat from bow to stern as photographed.
   NOT CONFIRMED and therefore not drawn: the 14.5 mm mounts named in the brief (no
   photograph shows them), any hull number, ensign or star, rails (the rails in the photographs
   are museum fences), the exact tube count of the launcher on a service boat, internal layout.
   The underwater shafts, props and rudders are generic; the number of shafts is a guess
   (two, side by side) and is not seen.
   The PT-76 turret hatch discs carry the team colour (as the tank hero does) plus one small
   deck panel aft.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0, keel about -0.9 (rudders -0.95).  The PT-76B
   turret is the group named "turret" (ring centre on the barbette, gun along +X); everything
   else is baked: one mesh per material.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroShmel = (function () {
  "use strict";
  var TAU = Math.PI * 2;
  var X0 = -13.7, X1 = 13.7;     /* transom, stem */
  var TX = 6.1;                    /* turret ring centre */
  var BARB = 0.55;                 /* barbette height above deck */

  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  function Bin(mat) { this.mat = mat; this.P = []; this.N = []; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f], i;
    for (i = 0; i < 3; i++) { this.P.push(v[i][0], v[i][1], v[i][2]); this.N.push(n[i][0], n[i][1], n[i][2]); }
  };
  /* a closed solid: signed volume says whether the faces point out; turned if not */
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function box(bin, x0, x1, y0, y1, z0, z1) {
    solid(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
                [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], HEXF);
  }
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz), nx = -dz / l * th / 2, nz = dx / l * th / 2;
    solid(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
                [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]], HEXF);
  }
  function cyl(bin, A, B, r0, r1, seg) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), V = [], N = [], F = [], i, j, c, s, rn, base, rA, rB, na;
    for (i = 0; i < seg; i++) {
      c = Math.cos(i / seg * TAU); s = Math.sin(i / seg * TAU);
      rn = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
      V.push([A[0] + rn[0] * r0, A[1] + rn[1] * r0, A[2] + rn[2] * r0]); N.push(rn);
      V.push([B[0] + rn[0] * r1, B[1] + rn[1] * r1, B[2] + rn[2] * r1]); N.push(rn);
    }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    base = V.length; na = [-ax[0], -ax[1], -ax[2]];
    V.push(A, B); N.push(na, ax);
    rA = base + 2; rB = base + 2 + seg;
    for (i = 0; i < seg; i++) { V.push(V[2 * i]); N.push(na); }
    for (i = 0; i < seg; i++) { V.push(V[2 * i + 1]); N.push(ax); }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, rA + j, rA + i], [base + 1, rB + i, rB + j]); }
    solid(bin, V, F, N);
  }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg || 10); }

  /* a loft through sections of the same point count, closed at both ends (flat fans) */
  function loft(bin, rings) {
    var n = rings[0].length, V = [], F = [], i, k, r, a, b, c0, c1;
    for (r = 0; r < rings.length; r++) for (k = 0; k < n; k++) V.push(rings[r][k]);
    for (r = 0; r + 1 < rings.length; r++) for (k = 0; k < n; k++) {
      a = r * n + k; b = r * n + (k + 1) % n; c0 = a + n; c1 = b + n;
      F.push([a, b, c1], [a, c1, c0]);
    }
    for (k = 1; k + 1 < n; k++) F.push([0, k, k + 1]);
    var L = (rings.length - 1) * n;
    for (k = 1; k + 1 < n; k++) F.push([L, L + k, L + k + 1]);
    solid(bin, V, F);
  }


  /* smooth-sided loft: rings of equal point count, flat caps; side normals averaged */
  function loftS(bin, rings) {
    var n = rings[0].length, V = [], F = [], i, k, r, a, b, c0, c1, f, vol = 0, ox = 1;
    for (r = 0; r < rings.length; r++) for (k = 0; k < n; k++) V.push(rings[r][k]);
    var ns = V.length;
    for (r = 0; r + 1 < rings.length; r++) for (k = 0; k < n; k++) {
      a = r * n + k; b = r * n + (k + 1) % n; c0 = a + n; c1 = b + n;
      F.push([a, b, c1], [a, c1, c0]);
    }
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    /* fans for the caps need the volume of the whole closed solid: close with the centroids */
    var cA = [0, 0, 0], cB = [0, 0, 0];
    for (k = 0; k < n; k++) for (i = 0; i < 3; i++) { cA[i] += V[k][i] / n; cB[i] += V[ns - n + k][i] / n; }
    for (k = 0; k < n; k++) {
      vol += dot(cA, cross(V[(k + 1) % n], V[k]));
      vol += dot(cB, cross(V[ns - n + k], V[ns - n + (k + 1) % n]));
    }
    var sg = vol < 0 ? -1 : 1, Nv = [], t;
    for (i = 0; i < ns; i++) Nv.push([0, 0, 0]);
    for (i = 0; i < F.length; i++) {
      f = F[i]; t = unit(cross(sub(V[f[1]], V[f[0]]), sub(V[f[2]], V[f[0]])));
      for (k = 0; k < 3; k++) { Nv[f[k]][0] += t[0] * sg; Nv[f[k]][1] += t[1] * sg; Nv[f[k]][2] += t[2] * sg; }
    }
    for (i = 0; i < ns; i++) Nv[i] = unit(Nv[i]);
    for (i = 0; i < F.length; i++) {
      f = F[i];
      if (sg > 0) bin.tri(V[f[0]], V[f[1]], V[f[2]], Nv[f[0]], Nv[f[1]], Nv[f[2]]);
      else bin.tri(V[f[0]], V[f[2]], V[f[1]], Nv[f[0]], Nv[f[2]], Nv[f[1]]);
    }
    for (k = 0; k < n; k++) {
      a = V[k]; b = V[(k + 1) % n]; c0 = V[ns - n + k]; c1 = V[ns - n + (k + 1) % n];
      if (sg > 0) { bin.tri(cA, b, a); bin.tri(cB, c0, c1); } else { bin.tri(cA, a, b); bin.tri(cB, c1, c0); }
    }
  }

  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  /* PT-76B turret, copied from js/hero/ru_pt76.js */
  function tring(r, n) {
    var pts = [], k, c, a;
    for (k = 0; k < n; k++) {
      a = k / n * TAU; c = Math.cos(a);
      pts.push([r[4] + (c >= 0 ? r[1] : r[2]) * c, r[3] * Math.sin(a), r[0]]);
    }
    return pts;
  }
  function addTurret(V, B) {
    var N = 24, i, R = [
      [-0.06, 1.00, 1.10, 0.97, -0.04],
      [0.00, 1.00, 1.10, 0.97, -0.04],
      [0.10, 0.96, 1.04, 0.92, -0.06],
      [0.24, 0.89, 0.93, 0.84, -0.08],
      [0.40, 0.80, 0.80, 0.74, -0.11],
      [0.52, 0.72, 0.68, 0.64, -0.13],
      [0.55, 0.66, 0.62, 0.58, -0.13]
    ], rings = [];
    for (i = 0; i < R.length; i++) rings.push(tring(R[i], N));
    loftS(B.paint, rings);
    /* cast mantlet, sunk into the front slope: a short tapered barrel with a rim */
    cylX(B.paint, 0.74, 1.10, 0, 0.36, 0.25, 0.19, 16);
    cylX(B.dark, 1.08, 1.16, 0, 0.38, 0.14, 0.12, 14);
    /* gun: thick jacket, optional fume extractor, tube, double-baffle muzzle brake */
    cylX(B.dark, 1.10, 1.95, 0, 0.38, 0.105, 0.085, 14);
    cylX(B.dark, 1.90, 3.35, 0, 0.38, 0.080, 0.062, 14);
    if (true) {
      cylX(B.dark, 1.78, 1.90, 0, 0.38, 0.085, 0.118, 14);
      cylX(B.dark, 1.90, 2.28, 0, 0.38, 0.118, 0.118, 14);
      cylX(B.dark, 2.28, 2.40, 0, 0.38, 0.118, 0.080, 14);
    }
    cylX(B.dark, 3.27, 3.65, 0, 0.38, 0.100, 0.100, 14);
    cylX(B.dark, 3.25, 3.29, 0, 0.38, 0.125, 0.125, 14);
    cylX(B.dark, 3.45, 3.49, 0, 0.38, 0.125, 0.125, 14);
    cylX(B.dark, 3.63, 3.67, 0, 0.38, 0.125, 0.125, 14);
    box(B.paint, 3.31, 3.43, -0.04, 0.04, 0.28, 0.48);    /* brake slots */
    box(B.paint, 3.51, 3.61, -0.04, 0.04, 0.28, 0.48);
    /* coaxial machine gun and the sight window in the mantlet face */
    cylX(B.dark, 1.02, 1.55, -0.19, 0.30, 0.025, 0.02, 6);
    box(B.glass, 1.06, 1.10, 0.14, 0.24, 0.38, 0.50);
    box(B.dark, 1.02, 1.08, 0.12, 0.26, 0.34, 0.52);
    /* commander's cupola right of centre with four periscopes, loader's hatch left */
    cylZ(B.paint, -0.26, -0.32, 0.46, 0.66, 0.25, 16);
    for (i = 0; i < 4; i++) box(B.glass, -0.26 + 0.22 * Math.cos(i * TAU / 4 + 0.4) - 0.03, -0.26 + 0.22 * Math.cos(i * TAU / 4 + 0.4) + 0.03,
                                -0.32 + 0.22 * Math.sin(i * TAU / 4 + 0.4) - 0.03, -0.32 + 0.22 * Math.sin(i * TAU / 4 + 0.4) + 0.03, 0.60, 0.66);
    cylZ(B.team, -0.26, -0.32, 0.66, 0.695, 0.19, 16);
    cylZ(B.dark, -0.24, 0.36, 0.45, 0.56, 0.26, 16);
    cylZ(B.team, -0.24, 0.36, 0.56, 0.585, 0.20, 16);
    box(B.dark, -0.52, -0.46, 0.30, 0.42, 0.56, 0.60);     /* hatch hinge */
    /* turret roof ventilator at the rear, gun-mount sight box on the roof front */
    box(B.paint, -0.72, -0.48, -0.16, 0.16, 0.50, 0.62);
    box(B.dark, -0.74, -0.70, -0.12, 0.12, 0.54, 0.60);
    box(B.paint, 0.20, 0.50, 0.40, 0.62, 0.48, 0.58);
    box(B.glass, 0.50, 0.53, 0.43, 0.59, 0.50, 0.56);
    /* turret handrail over the rear, side lugs */
    box(B.dark, -0.90, -0.84, -0.50, 0.50, 0.30, 0.34);
    if (true) {
      box(B.dark, 0.34, 0.44, 0.52, 0.60, 0.46, 0.58);
      cylX(B.dark, 0.44, 0.62, 0.56, 0.58, 0.07, 0.07, 12);
      cylX(B.glass, 0.62, 0.64, 0.56, 0.58, 0.055, 0.055, 12);
    }
  }


  /* ------------------------------------------------------------ hull form */
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function tBow(x) { return clamp01((x - 3.5) / (X1 - 3.5)); }
  function deckZ(x) {
    var t = tBow(x), s = clamp01((-x - 8.0) / 5.85);
    return 1.15 + 0.25 * Math.pow(t, 2.2) + 0.04 * s * s;
  }
  function halfDeck(x) {
    var t = tBow(x), s = clamp01((-x - 11.0) / 2.85), w = 2.16 * Math.sqrt(Math.max(0, 1 - Math.pow(t, 1.8)));
    return w - 0.16 * s * s;
  }
  function halfWl(x) { var t = tBow(x), w = halfDeck(x); return Math.max(0, w * 0.93 - 0.34 * Math.pow(t, 1.5)); }
  function sideAt(x, z) { var wd = halfDeck(x), ww = halfWl(x); return ww + (wd - ww) * Math.max(0, z) / deckZ(x); }
  function ring(x) {
    var t = tBow(x), wd = halfDeck(x), ww = halfWl(x), wc = ww * 0.82, zd = deckZ(x);
    var zc = -0.80 + 0.72 * Math.pow(t, 1.3), zk = zc - 0.07;
    var rW = 0.7 * Math.pow(t, 3), rC = 1.25 * Math.pow(t, 3), rK = 1.45 * Math.pow(t, 3);
    return [[x, wd, zd], [x - rW, ww, 0], [x - rC, wc, zc], [x - rK, 0, zk],
            [x - rC, -wc, zc], [x - rW, -ww, 0], [x, -wd, zd]];
  }
  var XS = [], i0;
  for (i0 = 0; i0 <= 58; i0++) {
    XS.push(i0 < 40 ? X0 + (3.5 - X0) * (i0 / 40) : 3.5 + (X1 - 3.5) * Math.pow((i0 - 40) / 18, 0.85));
  }
  var TAGS = ["hull", "bot", "bot", "bot", "bot", "hull", "deck"];

  function addHull(B) {
    var V = [], F = [], T = [], s, k, a, b, c, d, n = 7, i, f, vol = 0;
    for (s = 0; s < XS.length; s++) { var r = ring(XS[s]); for (k = 0; k < n; k++) V.push(r[k]); }
    for (s = 0; s + 1 < XS.length; s++) for (k = 0; k < n; k++) {
      a = s * n + k; b = s * n + (k + 1) % n; c = a + n; d = b + n;
      F.push([a, b, d], [a, d, c]); T.push(TAGS[k], TAGS[k]);
    }
    for (k = 1; k + 1 < n; k++) { F.push([0, k, k + 1]); T.push("hull"); }
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      c = cross(sub(V[f[1]], V[f[0]]), sub(V[f[2]], V[f[0]]));
      if (dot(c, c) < 1e-10) continue;          /* the collapsed stem point */
      if (vol < 0) B[T[i]].tri(V[f[0]], V[f[2]], V[f[1]]); else B[T[i]].tri(V[f[0]], V[f[1]], V[f[2]]);
    }
  }
  function hexa(bin, P) { solid(bin, P, HEXF); }
  /* tapered block: base x0..x1 half width w0 at z0, top x2..x3 half width w1 at z1 */
  function block(bin, x0, x1, w0, z0, x2, x3, w1, z1) {
    hexa(bin, [[x0, -w0, z0], [x1, -w0, z0], [x1, w0, z0], [x0, w0, z0],
               [x2, -w1, z1], [x3, -w1, z1], [x3, w1, z1], [x2, w1, z1]]);
  }

  /* thin panels that follow a sloped face: no part of them is buried in the slope and none floats.
     fpan: on a face that leans (front x as a function of height h); span: on a side face (half width
     as a function of h).  Both are 8-point solids through two offsets o0 (inner) and o1 (outer). */
  function fpan(bin, xf, zb, y0, y1, h0, h1, o0, o1) {
    var V = [], o = [o0, o1], k;
    for (k = 0; k < 2; k++) V.push([xf(h0) + o[k], y0, zb + h0], [xf(h0) + o[k], y1, zb + h0],
                                   [xf(h1) + o[k], y1, zb + h1], [xf(h1) + o[k], y0, zb + h1]);
    solid(bin, V, HEXF);
  }
  function span(bin, wf, zb, s, x0, x1, h0, h1, o0, o1) {
    var V = [], o = [o0, o1], k;
    for (k = 0; k < 2; k++) V.push([x0, s * (wf(h0) + o[k]), zb + h0], [x1, s * (wf(h0) + o[k]), zb + h0],
                                   [x1, s * (wf(h1) + o[k]), zb + h1], [x0, s * (wf(h1) + o[k]), zb + h1]);
    solid(bin, V, HEXF);
  }

  function materials(THREE, C) {
    var T = {}, mk = function (c, r, m) { return new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m }); };
    T.hull = mk(0x8c9698, 0.88, 0.05);
    T.bot = mk(0x7a3b30, 0.9, 0.04);
    T.deck = mk(0x6a7276, 0.95, 0.04);
    T.sup = mk(0x949ea0, 0.88, 0.05);
    T.dark = mk(0x25282b, 0.8, 0.3);
    T.metal = mk(0x4a5054, 0.55, 0.5);
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.buoy = mk(0xc4452d, 0.7, 0.02);
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }

  function addShip(B) {
    var i, j, s, x, y, z, zd;
    addHull(B);

    /* fender strips low on the sides, scuttles */
    for (x = -12.6; x < 6.9; x += 1.5) for (s = -1; s <= 1; s += 2)
      box(B.dark, x, x + 1.4, s > 0 ? sideAt(x, 0.2) - 0.04 : -sideAt(x, 0.2) - 0.06, s > 0 ? sideAt(x, 0.2) + 0.06 : -sideAt(x, 0.2) + 0.04, 0.05, 0.3);
    [3.1, 7.4].forEach(function (px) { for (s = -1; s <= 1; s += 2) {
      y = s * (sideAt(px, 0.72) + 0.01);
      cylY(B.dark, px, y - 0.03, y + 0.03, 0.72, 0.15, 14);
    } });

    /* forecastle: barbette under the turret, windlass, bitts, anchor pockets, hatch */
    zd = deckZ(TX);
    cylZ(B.sup, TX, 0, zd - 0.05, zd + BARB, 1.38, 28);
    cylZ(B.dark, TX, 0, zd + BARB - 0.04, zd + BARB, 1.18, 28);
    cylZ(B.sup, 10.8, 0, deckZ(10.8), deckZ(10.8) + 0.3, 0.3, 12);
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.metal, 11.6, s * 0.55, deckZ(11.6), deckZ(11.6) + 0.32, 0.09, 8);
      cylZ(B.metal, 9.0, s * 1.3, deckZ(9.0), deckZ(9.0) + 0.3, 0.08, 8);
      box(B.dark, 12.0, 12.45, s * 0.38, s * 0.38 + 0.18, deckZ(12.0) - 0.02, deckZ(12.0) + 0.08);
    }
    box(B.sup, 8.8, 9.7, -0.45, 0.45, deckZ(9.2), deckZ(9.2) + 0.2);
    box(B.dark, 8.9, 9.6, -0.35, 0.35, deckZ(9.2) + 0.2, deckZ(9.2) + 0.23);

    /* wheelhouse: sloped armour, windows with shutters, raised bridge block, lifebuoy */
    var zh = deckZ(0.5) - 0.03, HT = 2.55, zt = zh + HT, BH = 1.15;
    var xfw = function (h) { return 4.5 - 0.9 * h / HT; }, wsw = function (h) { return 1.78 - 0.28 * h / HT; };
    var xfb = function (h) { return 1.3 - 0.2 * h / BH; }, wsb = function (h) { return 1.0 - 0.2 * h / BH; };
    block(B.sup, -3.4, 4.5, 1.78, zh, -3.0, 3.6, 1.5, zt);
    for (s = -1; s <= 1; s += 2) {
      fpan(B.glass, xfw, zh, s * 0.62 - 0.27, s * 0.62 + 0.27, 1.45, 1.95, -0.02, 0.03);
      fpan(B.sup, xfw, zh, s * 0.62 - 0.38, s * 0.62 - 0.27, 1.38, 2.02, -0.02, 0.07);
      fpan(B.sup, xfw, zh, s * 0.62 + 0.27, s * 0.62 + 0.38, 1.38, 2.02, -0.02, 0.07);
      fpan(B.sup, xfw, zh, s * 0.62 - 0.38, s * 0.62 + 0.38, 2.0, 2.1, -0.02, 0.09);
      for (j = 0; j < 3; j++) {
        var wx = 2.4 - j * 1.9;
        span(B.glass, wsw, zh, s, wx - 0.22, wx + 0.22, 1.5, 1.88, -0.02, 0.03);
      }
      span(B.dark, wsw, zh, s, 0.9, 1.5, 0.45, 1.4, -0.02, 0.03);          /* side door */
    }
    block(B.sup, -1.7, 1.3, 1.0, zt, -1.6, 1.1, 0.8, zt + BH);
    fpan(B.glass, xfb, zt, -0.35, 0.35, 0.5, 0.95, -0.02, 0.03);
    for (s = -1; s <= 1; s += 2) span(B.glass, wsb, zt, s, 0.1, 0.55, 0.5, 0.95, -0.02, 0.03);
    cylX(B.buoy, -1.80, -1.70, 0, zt + 0.55, 0.3, 0.3, 18);
    fpan(B.sup, xfw, zh, -1.28, 1.28, 2.42, 2.55, -0.01, 0.12);              /* roof lip over the windows */
    /* lower aft deckhouse (roof about 1.6 m above the deck) with a side door; the BM-14-17 stands on a
       round drum just behind it, tube bank raised and pointing aft as stowed in the photographs */
    var zl = deckZ(-4.5) - 0.03, HL = 1.6;
    var xfl = function (h) { return -3.3 - 0.1 * h / HL; }, wsl = function (h) { return 1.35 - 0.15 * h / HL; };
    block(B.sup, -5.4, -3.3, 1.35, zl, -5.3, -3.4, 1.2, zl + HL);
    for (s = -1; s <= 1; s += 2) span(B.dark, wsl, zl, s, -4.6, -4.0, 0.2, 1.2, -0.02, 0.03);
    fpan(B.dark, xfl, zl, -0.4, 0.4, 0.15, 0.95, -0.02, 0.03);

    var lx = -5.9, dz = deckZ(lx) - 0.03, lz = dz + 1.2, el = 0.30, ce = Math.cos(el), se = Math.sin(el), rows = [6, 5, 6];
    cylZ(B.sup, lx, 0, dz, lz, 0.48, 18);
    for (s = -1; s <= 1; s += 2) cylY(B.dark, lx, s * 0.46, s * 0.5, dz + 0.5, 0.12, 12);
    cylZ(B.metal, lx, 0, lz, lz + 0.45, 0.32, 14);
    cylZ(B.sup, lx, 0, lz + 0.42, lz + 0.52, 0.5, 16);
    box(B.metal, lx - 0.4, lx + 0.4, -0.62, 0.62, lz + 0.52, lz + 0.62);
    function lp(u, v, w) { return [lx - u * ce + w * se, v, lz + 0.78 + u * se + w * ce]; }
    for (j = 0; j < 3; j++) for (i = 0; i < rows[j]; i++) {
      y = (i - (rows[j] - 1) / 2) * 0.172;
      cyl(B.metal, lp(-0.5, y, (j - 1) * 0.15), lp(1.45, y, (j - 1) * 0.15), 0.068, 0.068, 10);
      cyl(B.dark, lp(1.40, y, (j - 1) * 0.15), lp(1.47, y, (j - 1) * 0.15), 0.052, 0.052, 8);
    }
    for (i = 0; i < 3; i++) {
      var ux = -0.3 + i * 0.7;
      solid(B.metal, [lp(ux, -0.58, -0.28), lp(ux + 0.07, -0.58, -0.28), lp(ux + 0.07, 0.58, -0.28), lp(ux, 0.58, -0.28),
                      lp(ux, -0.58, 0.28), lp(ux + 0.07, -0.58, 0.28), lp(ux + 0.07, 0.58, 0.28), lp(ux, 0.58, 0.28)], HEXF);
    }
    box(B.metal, lx - 0.15, lx + 0.15, -0.5, 0.5, lz + 0.62, lz + 0.78);
    /* low box behind the launcher drum */
    box(B.sup, -7.7, -6.4, -0.65, 0.65, deckZ(-7.0) - 0.03, deckZ(-7.0) + 0.6);

    /* lattice mast leaning aft behind the raised block */
    var mx = -2.3, mz = zt + 0.02, top = zt + BH + 2.3, lean = -0.55, leg = [[0.4, 0.4], [0.4, -0.4], [-0.4, -0.4], [-0.4, 0.4]], A, Bp;
    for (i = 0; i < 4; i++) {
      cyl(B.metal, [mx + leg[i][0], leg[i][1], mz], [mx + lean + leg[i][0] * 0.25, leg[i][1] * 0.25, top], 0.03, 0.03, 5);
      Bp = (i + 1) % 4;
      for (j = 0; j < 3; j++) {
        var f0 = j / 3.2, f1 = (j + 1) / 3.2;
        cyl(B.metal, [mx + lean * f0 + leg[i][0] * (1 - 0.75 * f0), leg[i][1] * (1 - 0.75 * f0), mz + (top - mz) * f0],
                     [mx + lean * f1 + leg[Bp][0] * (1 - 0.75 * f1), leg[Bp][1] * (1 - 0.75 * f1), mz + (top - mz) * f1], 0.016, 0.016, 4);
        cyl(B.metal, [mx + lean * f0 + leg[i][0] * (1 - 0.75 * f0), leg[i][1] * (1 - 0.75 * f0), mz + (top - mz) * f0],
                     [mx + lean * f0 + leg[Bp][0] * (1 - 0.75 * f0), leg[Bp][1] * (1 - 0.75 * f0), mz + (top - mz) * f0], 0.016, 0.016, 4);
      }
    }
    var px = mx + lean, ptz = top;
    box(B.metal, px - 0.55, px + 0.55, -0.55, 0.55, ptz, ptz + 0.06);               /* platform */
    cyl(B.metal, [px, 0, ptz], [px, 0, ptz + 3.4], 0.05, 0.03, 8);                    /* topmast */
    box(B.dark, px + 0.35, px + 0.5, -0.6, 0.6, ptz + 0.06, ptz + 0.5);              /* radar antenna */
    cylZ(B.metal, px + 0.2, 0, ptz + 0.06, ptz + 0.22, 0.1, 8);
    box(B.metal, px - 0.04, px + 0.04, -0.95, 0.95, ptz + 2.2, ptz + 2.26);           /* yard */
    cyl(B.dark, [px - 0.12, 0, ptz + 2.6], [px - 0.12, 0, ptz + 3.0], 0.05, 0.05, 6);
    for (i = 0; i < 2; i++) {
      cyl(B.metal, [1.0 - i * 0.9, (i ? -1 : 1) * 1.25, zt - 0.02], [1.0 - i * 0.9 - 0.2, (i ? -1 : 1) * 1.25, zt + 7.0], 0.015, 0.008, 4);
    }
    cyl(B.metal, [px, 0, ptz + 3.3], [3.4, 0, zt + 0.1], 0.006, 0.006, 3);            /* stay forward */


    /* searchlight on the bridge roof, ventilators, roof hatches, deck gear */
    cylZ(B.metal, 0.3, 0.0, zt + BH - 0.02, zt + BH + 0.15, 0.14, 12);
    cylX(B.metal, 0.3, 0.75, 0.0, zt + BH + 0.35, 0.2, 0.2, 18);
    cylX(B.glass, 0.75, 0.78, 0.0, zt + BH + 0.35, 0.17, 0.17, 18);
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.sup, -4.5, s * 0.8, zl + HL - 0.03, zl + HL + 0.35, 0.14, 12);
      cylZ(B.dark, -4.5, s * 0.8, zl + HL + 0.35, zl + HL + 0.41, 0.2, 12);
      cylZ(B.sup, 2.2, s * 1.05, zt, zt + 0.32, 0.12, 12);
      cylZ(B.dark, 2.2, s * 1.05, zt + 0.32, zt + 0.37, 0.17, 12);
      box(B.dark, -2.6, -1.9, s * 0.5 - 0.3, s * 0.5 + 0.3, zt, zt + 0.06);
    }
    cylZ(B.metal, 11.4, 0, deckZ(11.4), deckZ(11.4) + 0.5, 0.05, 8);

    /* aft twin 25 mm: round plinth, a boxy shield about 2.2 m long, barrels raised steeply and pointing aft */
    var ax = -9.2, az = deckZ(ax) - 0.03;
    cylZ(B.metal, ax, 0, az, az + 0.5, 0.42, 14);
    cylZ(B.sup, ax, 0, az + 0.45, az + 0.9, 0.55, 16);
    block(B.sup, ax - 1.1, ax + 1.1, 0.85, az + 0.85, ax - 1.0, ax + 1.0, 0.75, az + 2.3);
    fpan(B.dark, function (h) { return ax + 1.1 - 0.1 * h / 1.45; }, az + 0.85, -0.4, 0.4, 0.3, 1.0, -0.02, 0.05);
    for (s = -1; s <= 1; s += 2) {
      cyl(B.metal, [ax + 0.2, s * 0.28, az + 2.0], [ax - 0.43, s * 0.28, az + 3.35], 0.045, 0.04, 8);
      cyl(B.dark, [ax - 0.34, s * 0.28, az + 3.16], [ax - 0.43, s * 0.28, az + 3.35], 0.07, 0.07, 8);
    }
    /* aft deck: hatches, bitts, panel */
    box(B.dark, -11.5, -10.6, -0.5, 0.5, deckZ(-11.0), deckZ(-11.0) + 0.08);
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.metal, -12.9, s * 1.3, deckZ(-12.9), deckZ(-12.9) + 0.32, 0.09, 8);
      cylZ(B.metal, -7.0, s * 1.75, deckZ(-7.0), deckZ(-7.0) + 0.3, 0.08, 8);
      cylZ(B.metal, 1.6, s * 2.0, deckZ(1.6), deckZ(1.6) + 0.3, 0.08, 8);
      box(B.sup, -13.0, -12.4, s * 1.8, s * 1.98, deckZ(-12.7), deckZ(-12.7) + 0.5);   /* stern fairlead cheeks */
    }
    box(B.team, -13.0, -11.6, -0.4, 0.4, deckZ(-12.3) + 0.02, deckZ(-12.3) + 0.045);
    /* walkway non-skid along the house */
    for (s = -1; s <= 1; s += 2) box(B.dark, -3.0, 3.4, s * 1.97 - 0.12, s * 1.97 + 0.12, deckZ(0.5) + 0.0, deckZ(0.5) + 0.02);

    /* underwater: twin shafts, props, rudders (generic, not seen in the photographs) */
    for (s = -1; s <= 1; s += 2) {
      cylX(B.metal, -13.6, -11.6, s * 1.15, -0.78, 0.06, 0.06, 8);
      box(B.metal, -13.58, -13.52, s * 1.15 - 0.38, s * 1.15 + 0.38, -0.82, -0.74);
      box(B.metal, -13.58, -13.52, s * 1.15 - 0.04, s * 1.15 + 0.04, -0.95, -0.4);
      box(B.metal, -13.6, -12.6, s * 1.15 - 0.03, s * 1.15 + 0.03, -0.95, -0.35);
      cylX(B.metal, -13.7, -13.55, s * 1.15, -0.78, 0.1, 0.05, 8);
    }
  }

  function bins(T, names) { var o = {}; names.forEach(function (n) { o[n] = new Bin(T[n]); }); return o; }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group();
    var HB = bins(T, ["hull", "bot", "deck", "sup", "dark", "metal", "glass", "buoy", "team"]);
    addShip(HB);
    flush(THREE, g, HB);
    /* trained mount: the PT-76B turret on the barbette */
    var TB = { paint: new Bin(T.sup), dark: new Bin(T.dark), glass: new Bin(T.glass), team: new Bin(T.team) };
    addTurret({}, TB);
    var wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(TX, 0, deckZ(TX) + BARB);
    flush(THREE, wg, TB);
    g.add(wg);
    return g;
  }
  return { build: build };
})();

UNIT_MODELS["pact_e60_patrol"] = {
  len: 27.4,
  build: function (THREE, M, C) { return HeroShmel.build(THREE, M, C); }
};
