/* ============ ru_pt76.js - HERO models: the PT-76 amphibious light tank ============
   Two rows of the Soviet/Pact reconnaissance and bridgehead tank:
     pact_e50_lighttank   PT-76    (1951)  76.2 mm D-56T, plain barrel behind a double-baffle brake
     pact_e60_lighttank   PT-76B   (1959)  D-56TM, the same gun with a fume extractor (bore
                                           evacuator) on the barrel, and the turret headlamp

   References (Wikimedia Commons, all museum exhibits in Soviet green or grey-green):
     "PT-76.png"            three-view line drawing: side, front, three-quarter
     "Pt-76 afv.jpg"        front three-quarter of a PT-76B-pattern tank (extractor, turret lamp)
     "PT-76 (31356566712).jpg"   stern three-quarter, port side
     "Soviet PT-76 Amphibious Tank RSide ... EASM"   clean starboard side view
     "PT-76. Museum Satria Mandala, Jakarta"   front three-quarter, plain barrel, no lamp
   What each feature rests on:
     - boat hull: flat deck from the stern to x = 1.8 m, one shallow glacis to a high bow edge,
       a short steep lower prow plate under it, vertical slab sides down to a ledge at 0.96 m
       with the hull tucking in below it: drawing, EASM side, Jakarta and Kiev photographs
     - SIX road wheels a side on 0.82 m centres, disc wheels with radial ribs and a rubber tyre,
       small front idler and rear drive sprocket both raised (about 0.6 m), NO return rollers,
       a cast track with a flat top run under the ledge: drawing, EASM side, stern photograph
     - low welded turret, steep sides, flat roof, set forward of centre, 76 mm gun in a cast
       mantlet, commander's cupola right, round loader's hatch left: drawing and photographs
     - trim vane folded on the glacis, guarded headlamps at the glacis corners, towing eyes on
       the lower plate, three-periscope driver's box on the glacis: Kiev and Jakarta photographs
     - side louvre near the stern, handrail on the deck side, flap over the sprocket ends of the
       ledge: stern photograph and EASM side
     - PT-76B only: bore evacuator on the barrel and the lamp on the turret roof: the Kiev
       photograph has both, the Jakarta tank has neither (that tank is read as a plain PT-76)
   NOT CONFIRMED and therefore left off or only roughed in: snorkel, stowage, AA machine gun,
   radio aerial, unditching log; the two waterjet outlet flaps on the stern plate are a guess
   at the layout (no stern view of the plate itself), and the rear-deck grille panels likewise.

   Published figures: hull 6.91 m, over gun 7.625 m, width 3.14 m, height 2.195 m, mass 14 t.
   Four materials (paint, dark, glass, team); team colour exactly C.team on the turret hatch
   discs and a stern deck panel.  Named nodes: "turret" (ring centre, gun along +X) and six
   "roadwheel" groups (Y axle, both sides in one mesh).  Model space +X bow, +Y left, +Z up,
   metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPT76 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var VARIANTS = {
    A: { paint: 0x4f5a3b, extractor: false, lamp: false },
    B: { paint: 0x4c5839, extractor: true, lamp: true }
  };
  var XW = [2.28, 1.46, 0.64, -0.18, -1.0, -1.82], ZW = 0.345, RW = 0.315;
  var TYC = 1.385;           /* track centre line, each side */
  var TX = 0.50, TZ = 1.50;  /* turret ring centre, on the deck */
  var DECK = 1.50;
  var IDL = [3.10, 0.65, 0.30], SPR = [-2.65, 0.56, 0.35];   /* x, z, radius */

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

  function materials(THREE, C, V) {
    var T = {};
    T.paint = new THREE.MeshStandardMaterial({ color: V.paint, roughness: 0.9, metalness: 0.05 });
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint), dark: new Bin(T.dark), glass: new Bin(T.glass), team: new Bin(T.team) };
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

  /* a radial rib on a wheel face: centre line from radius r0 to r1 at angle ph, width w */
  function rib(bin, y, ph, r0, r1, w, h, zc) {
    var c = Math.cos(ph), s = Math.sin(ph), tx = -s * w / 2, tz = c * w / 2, y0 = y, y1 = y + h, V = [], P = [[r0, 1], [r1, 1]], i, q, d;
    for (d = 0; d < 2; d++) for (i = 0; i < 2; i++) {
      q = P[i][0];
      V.push([q * c - tx, d ? y1 : y0, zc + q * s - tz], [q * c + tx, d ? y1 : y0, zc + q * s + tz]);
    }
    /* V: 0,1 = inner end (y0); 2,3 = outer end (y0); 4,5 = inner end (y1); 6,7 = outer end (y1) */
    solid(bin, [V[0], V[2], V[3], V[1], V[4], V[6], V[7], V[5]], HEXF);
  }

  /* the track loop: convex hull of the idler, sprocket and road wheels (x, z, r) */
  function trackLoop() {
    var pts = [], i, k, c, a, hull = [], p, circ = [[IDL[0], IDL[1], IDL[2] + 0.03], [SPR[0], SPR[1], SPR[2] + 0.03]];
    for (i = 0; i < XW.length; i++) circ.push([XW[i], ZW, RW + 0.03]);
    for (i = 0; i < circ.length; i++) for (k = 0; k < 28; k++) {
      a = k / 28 * TAU; c = circ[i];
      pts.push([c[0] + c[2] * Math.cos(a), c[1] + c[2] * Math.sin(a)]);
    }
    pts.sort(function (u, v) { return u[0] - v[0] || u[1] - v[1]; });
    function cr(o, a2, b2) { return (a2[0] - o[0]) * (b2[1] - o[1]) - (a2[1] - o[1]) * (b2[0] - o[0]); }
    var lo = [], up = [];
    for (i = 0; i < pts.length; i++) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], pts[i]) <= 1e-9) lo.pop(); lo.push(pts[i]); }
    for (i = pts.length - 1; i >= 0; i--) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], pts[i]) <= 1e-9) up.pop(); up.push(pts[i]); }
    lo.pop(); up.pop();
    return lo.concat(up);    /* counter-clockwise in (x, z): bottom run first, nose to tail reversed */
  }
  function addTrack(B, side) {
    var H = trackLoop(), n = H.length, len = [], tot = 0, i, j, a, b, d, nl, p, t, pos, seg, ang, cx, cz, hl, y0, y1, th = 0.04;
    for (i = 0; i < n; i++) { a = H[i]; b = H[(i + 1) % n]; d = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1])); len.push(d); tot += d; }
    nl = Math.round(tot / 0.14); p = tot / nl;
    y0 = side * (TYC - 0.17); y1 = side * (TYC + 0.17);
    var ya = Math.min(y0, y1), yb = Math.max(y0, y1);
    for (j = 0; j < nl; j++) {
      pos = (j + 0.5) * p; seg = 0;
      while (seg < n - 1 && pos > len[seg]) { pos -= len[seg]; seg++; }
      a = H[seg]; b = H[(seg + 1) % n]; t = pos / len[seg];
      cx = a[0] + (b[0] - a[0]) * t; cz = a[1] + (b[1] - a[1]) * t;
      if (cz > 0.80 && cx > -2.55 && cx < 2.95) continue;     /* the top run is covered by the ledge */
      ang = Math.atan2(b[1] - a[1], b[0] - a[0]); hl = p / 2 - 0.008;
      var ux = Math.cos(ang), uz = Math.sin(ang), nx = -uz * th / 2, nz = ux * th / 2;
      var ox = cx + nx, oz = cz + nz;      /* counter-clockwise loop: the left normal points inward */
      solid(B, [[ox - ux * hl - nx, ya, oz - uz * hl - nz], [ox + ux * hl - nx, ya, oz + uz * hl - nz], [ox + ux * hl - nx, yb, oz + uz * hl - nz], [ox - ux * hl - nx, yb, oz - uz * hl - nz],
                [ox - ux * hl + nx, ya, oz - uz * hl + nz], [ox + ux * hl + nx, ya, oz + uz * hl + nz], [ox + ux * hl + nx, yb, oz + uz * hl + nz], [ox - ux * hl + nx, yb, oz - uz * hl + nz]], HEXF);
    }
  }

  /* ---------------------------------------------------------------- hull */
  /* station: x, bottom z, bottom half width, ledge z, ledge half width, top z, top half width */
  var ST = [
    [-3.45, 0.55, 1.12, 0.96, 1.46, 1.50, 1.46],
    [-2.60, 0.46, 1.18, 0.96, 1.52, 1.50, 1.52],
    [0.00, 0.44, 1.20, 0.96, 1.52, 1.50, 1.52],
    [1.80, 0.46, 1.16, 0.96, 1.52, 1.50, 1.52],
    [2.60, 0.52, 1.08, 1.00, 1.42, 1.36, 1.40],
    [3.15, 0.66, 0.98, 1.08, 1.30, 1.27, 1.30],
    [3.45, 1.02, 0.86, 1.18, 1.22, 1.23, 1.22]
  ];
  function hullZ(x) {          /* top deck height along the centre line */
    var i, a, b, t;
    for (i = 0; i + 1 < ST.length; i++) {
      a = ST[i]; b = ST[i + 1];
      if (x <= b[0]) { t = (x - a[0]) / (b[0] - a[0]); return a[5] + (b[5] - a[5]) * t; }
    }
    return ST[ST.length - 1][5];
  }
  function glacisZ(x) { return hullZ(x); }
  function addHull(V, B) {
    var rings = [], i, s, side, x, k, z;
    for (i = 0; i < ST.length; i++) {
      s = ST[i];
      rings.push([[s[0], -s[2], s[1]], [s[0], s[2], s[1]], [s[0], s[4], s[3]],
                  [s[0], s[6], s[5]], [s[0], -s[6], s[5]], [s[0], -s[4], s[3]]]);
    }
    loftS(B.paint, rings);

    /* trim vane folded on the glacis, hinge edge forward, with its two hinge blocks */
    belt(B.paint, 2.05, glacisZ(2.05) + 0.03, 3.10, glacisZ(3.10) + 0.03, -0.80, 0.80, 0.05);
    box(B.dark, 3.02, 3.14, -0.80, -0.55, glacisZ(3.1) + 0.0, glacisZ(3.1) + 0.09);
    box(B.dark, 3.02, 3.14, 0.55, 0.80, glacisZ(3.1) + 0.0, glacisZ(3.1) + 0.09);
    /* driver's hatch and three-periscope box on the glacis centre */
    box(B.paint, 1.92, 2.34, -0.34, 0.34, 1.50, 1.60);
    box(B.glass, 2.34, 2.37, -0.28, -0.18, 1.53, 1.58);
    box(B.glass, 2.34, 2.37, -0.05, 0.05, 1.53, 1.58);
    box(B.glass, 2.34, 2.37, 0.18, 0.28, 1.53, 1.58);
    cylZ(B.dark, 2.05, 0.0, 1.60, 1.63, 0.15, 12);
    for (side = -1; side <= 1; side += 2) {
      /* guarded headlamps on the glacis corners */
      cylX(B.dark, 2.08, 2.30, side * 1.12, 1.58, 0.075, 0.075, 10);
      cylX(B.glass, 2.30, 2.32, side * 1.12, 1.58, 0.058, 0.058, 10);
      box(B.dark, 2.10, 2.34, side * 1.12 - 0.095, side * 1.12 - 0.080, 1.50, 1.67);
      box(B.dark, 2.10, 2.34, side * 1.12 + 0.080, side * 1.12 + 0.095, 1.50, 1.67);
      box(B.dark, 2.10, 2.34, side * 1.12 - 0.095, side * 1.12 + 0.095, 1.665, 1.68);
      /* towing eyes on the lower prow plate */
      cylX(B.dark, 3.30, 3.42, side * 0.55, 0.92, 0.07, 0.07, 8);
      cylX(B.paint, 3.28, 3.40, side * 0.55, 0.92, 0.035, 0.035, 8);
      /* ledge over the tracks, the sloping flap over the sprocket and the front guard */
      box(B.paint, -2.55, 2.95, side * 1.52, side * 1.57, 0.93, 0.975);
      belt(B.paint, -2.55, 0.975, -3.30, 0.80, Math.min(side * 1.52, side * 1.57), Math.max(side * 1.52, side * 1.57), 0.04);
      belt(B.paint, 2.95, 0.975, 3.30, 0.90, Math.min(side * 1.40, side * 1.57), Math.max(side * 1.40, side * 1.57), 0.04);
      /* engine louvre low on the side behind the middle, deck handrail */
      box(B.dark, -2.65, -2.20, side * 1.52 - 0.01, side * 1.52 + 0.01, 1.08, 1.24);
      for (k = 0; k < 4; k++) box(B.paint, -2.62 + k * 0.11, -2.55 + k * 0.11, side * 1.525 - 0.01, side * 1.525 + 0.02, 1.09, 1.23);
      box(B.dark, -1.45, -0.55, side * 1.545 - 0.015, side * 1.545 + 0.015, 1.34, 1.37);
      box(B.dark, -1.45, -1.40, side * 1.525 - 0.01, side * 1.525 + 0.02, 1.30, 1.36);
      box(B.dark, -0.60, -0.55, side * 1.525 - 0.01, side * 1.525 + 0.02, 1.30, 1.36);
      /* tracks, idler and sprocket */
      addTrack(B.dark, side);
      cylY(B.dark, IDL[0], side * (TYC - 0.12), side * (TYC + 0.12), IDL[1], IDL[2] - 0.02, 16);
      cylY(B.dark, IDL[0], side * (TYC + 0.11), side * (TYC + 0.16), IDL[1], 0.10, 10);
      cylY(B.dark, SPR[0], side * (TYC - 0.13), side * (TYC + 0.13), SPR[1], SPR[2] - 0.05, 16);
      cylY(B.paint, SPR[0], side * (TYC + 0.12), side * (TYC + 0.17), SPR[1], 0.12, 10);
      for (k = 0; k < 14; k++) {
        x = k / 14 * TAU;
        solid(B.dark, (function (cx, cz, ang) {
          var c = Math.cos(ang), sn = Math.sin(ang), r0 = SPR[2] - 0.06, r1 = SPR[2] + 0.015, w = 0.04, ya = side * (TYC - 0.1), yb = side * (TYC + 0.1), q = [], dd, e;
          for (dd = 0; dd < 2; dd++) { e = dd ? yb : ya; q.push([cx + r0 * c + sn * w, e, cz + r0 * sn - c * w], [cx + r1 * c + sn * w * 0.5, e, cz + r1 * sn - c * w * 0.5], [cx + r1 * c - sn * w * 0.5, e, cz + r1 * sn + c * w * 0.5], [cx + r0 * c - sn * w, e, cz + r0 * sn + c * w]); }
          return [q[0], q[1], q[2], q[3], q[4], q[5], q[6], q[7]];
        })(SPR[0], SPR[1], x), HEXF);
      }
    }
    /* rear deck: engine louvre panels, a raised step at the stern, the team-colour panel */
    box(B.dark, -3.15, -2.30, -1.00, -0.28, 1.50, 1.535);
    box(B.dark, -3.15, -2.30, 0.28, 1.00, 1.50, 1.535);
    for (k = 0; k < 5; k++) { box(B.paint, -3.12 + k * 0.17, -3.06 + k * 0.17, -1.00, -0.28, 1.535, 1.56); box(B.paint, -3.12 + k * 0.17, -3.06 + k * 0.17, 0.28, 1.00, 1.535, 1.56); }
    box(B.paint, -3.45, -3.15, -1.30, 1.30, 1.50, 1.54);
    box(B.team, -2.15, -1.55, -0.50, 0.50, 1.50, 1.53);
    /* stern plate: two flap-covered waterjet ports, handles */
    box(B.dark, -3.48, -3.45, -1.00, -0.50, 0.62, 0.95);
    box(B.dark, -3.48, -3.45, 0.50, 1.00, 0.62, 0.95);
    box(B.paint, -3.50, -3.48, -0.96, -0.54, 0.66, 0.91);
    box(B.paint, -3.50, -3.48, 0.54, 0.96, 0.66, 0.91);
    box(B.dark, -3.49, -3.46, -0.2, 0.2, 1.20, 1.28);
  }
  function addWheel(Bw, side) {
    var s = side, y0 = s * (TYC - 0.11), y1 = s * (TYC + 0.11), yo = s * (TYC + 0.135), k;
    cylY(Bw, 0, y0, y1, 0, RW, 18);
    cylY(Bw, 0, s * (TYC - 0.10), s * (TYC + 0.125), 0, 0.235, 18);
    cylY(Bw, 0, s * (TYC + 0.10), yo + s * 0.03, 0, 0.085, 12);
    for (k = 0; k < 6; k++) rib(Bw, s > 0 ? s * (TYC + 0.125) - 0.002 : s * (TYC + 0.125) - 0.012, k / 6 * TAU, 0.11, 0.225, 0.04, 0.014, 0);
  }

  /* -------------------------------------------------------------- turret */
  /* ring: z, half length forward, half length aft, half width, centre x */
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
    if (V.extractor) {
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
    if (V.lamp) {
      box(B.dark, 0.34, 0.44, 0.52, 0.60, 0.46, 0.58);
      cylX(B.dark, 0.44, 0.62, 0.56, 0.58, 0.07, 0.07, 12);
      cylX(B.glass, 0.62, 0.64, 0.56, 0.58, 0.055, 0.055, 12);
    }
  }

  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.B, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), TB = bins(T), i, wg, WB;
    addHull(V, HB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      WB = new Bin(T.dark);
      addWheel(WB, -1); addWheel(WB, 1);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { dark: WB });
      g.add(wg);
    }
    addTurret(V, TB);
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(TX, 0, TZ);
    flush(THREE, wg, TB);
    g.add(wg);
    return g;
  }
  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e50_lighttank"] = {
  len: 7.6,
  build: function (THREE, M, C) { return HeroPT76.build(THREE, M, C, "A"); }
};
UNIT_MODELS["pact_e60_lighttank"] = {
  len: 7.6,
  build: function (THREE, M, C) { return HeroPT76.build(THREE, M, C, "B"); }
};
