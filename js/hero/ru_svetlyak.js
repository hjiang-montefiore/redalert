/* ============ ru_svetlyak.js - HERO model: Project 10410 "Svetlyak" fast patrol boat ============
   Key (unchanged): pact_e80_patrol ("Svetlyak", full "Project 10410 Svetlyak fast patrol boat", service 1988,
   eras.js e80-e00, turret:true).  facts.js: one 76 mm AK-176M (152 rounds), steel hull, aluminium
   superstructure, NBC protection, 375 t, 56 km/h.  No warship_specs row.
   FULL-QUALITY REDO 2026-10-24: hull lofted from a station table measured off two profile photographs, the
   knuckle and flared bow, the three-step house re-measured, the mast raised to its photographed height, the
   AK-176M shield and the AK-630M redrawn, canvas plate/deck texture with metre UVs.

   PUBLISHED FIGURES (en.wikipedia "Svetlyak-class patrol boat", kept from the first version): length 49.5 m
   (eras.js note 49.2; 49.5 drawn, the figure the old model and the infobox use), beam 9.2 m, draught 2.63 m
   (drawn to the rudders and propeller tips; the keel is at -2.05 m), three diesels on three shafts.

   WHICH BOAT AND WHICH PAINT.  The row spans 1988 to the 2000s and names the Border Guard and the Navy.  Every
   photograph of a RUSSIAN 10410 on Commons (Syktyvkar 178, Anatoliy Korolev 137, the 017 at Baltiysk, 051 at
   Sochi, PSKR-907 at Shikotan; 2014-2018) shows the later FSB Coast Guard livery (dark blue hull, white house,
   lettering and a slanted stripe), which is outside the row's decades and is all text and numbers.  The boat is
   therefore drawn in the plain naval grey of the Border Guard / Navy boats of the row's period, the grey the
   photographed 10412 hulls wear (Vietnam 266, Slovenian Triglav, same hull and house); no photograph of a grey
   RUSSIAN 10410 was found (NOT CONFIRMED beyond that).  The SHAPES and FITS follow the Russian 10410 "178"
   (port profile) and are checked on the 266 (starboard profile): where they differ the 178 is drawn.

   REFERENCES (Wikimedia Commons, width=960, cached in the scratchpad q_svetlyak_ref):
     [SYK] "Syktyvkar ship 178.JPG" (2018, CC BY 3.0): Russian 10410, port profile from near water level, the
           master: 49.5 m = 792 px; stations and heights below are read off a metre grid laid over it.
     [VN]  "Vietnam People's Navy Ship 266 (Project 10412 Svetlyak-class).jpg" (2021, CC BY 4.0): starboard
           profile from a little above: the check profile, the roofs, the grey paint (bridge side sampled
           rgb 162,173,182 sunlit).
     [AK1] / [AK2] "Anatoliy Korolev Russian coast guard vessel 01 / 02.jpg" (2018, CC BY-SA 4.0): Russian
           10410, port profile and port bow quarter from above: the lattice mast, yard and platform radars, the
           flare of the bow, the stepped house.
     [ND]  "NavyDay2018-03.jpg" (mil.ru, CC BY 4.0): a 10410 at speed, starboard bow quarter: the bow flare
           and knuckle, the bridge front windows.
     [TRG] "Patrol boat Triglav side.jpg" (2010, CC BY 3.0): 10412 bow close up: the knuckle line and flare,
           the red-brown bottom.  Its plated mast is a Slovenian change and is NOT followed.
     No published line drawing of the 10410 was found on Commons or ru.wikipedia; two near-orthogonal profiles
     plus the published length and beam are the basis.

   RECOGNITION LIST (each must read at game zoom; where it shows):
     1. Long low hull with a sheer that rises only in the forward third (deck edge 2.9 m amidships, 4.25 m at
        the stem) and a raked stem with a cut-up forefoot [SYK, VN]: station table HULL, ring().
     2. A KNUCKLE running aft from the stem head, strong flare below it forward, near-vertical sides aft
        [TRG, ND, AK2]: ring() point K, table ZK/HK.
     3. The AK-176M in its rounded shield (4.0 m long, 2.5 m tall) on a 0.7 m barbette at d 12.0, the barrel
        long and thin [SYK, VN]:
        group "turret".
     4. The tall bridge block d 13.8-20.6 (roof 8.5 m), its window ribbon on the front and sides [SYK, VN]:
        tier A, windows().
     5. The long lower house d 20.4-31.7 (roof 5.9 m) and the aft house d 31.7-42.4 (roof 5.85 m) with its
        sloped after end, narrow side decks outboard of both [SYK, VN]: tiers B and C.
     6. The radar deckhouse on house B (d 20.4-28.6, roof 8.1 m, nearly as wide as the bridge block, its side
        in line with the bridge side) carrying the four-legged LATTICE MAST (feet d 24.8-27.2) to 21.2 m with
        the platform at 14.2 m and its two radar arrays, the yard at 17.2 m and the navigation-radar bar at
        18 m [SYK, VN, AK2]: tier M, mast().
     7. The big radome on the mast's forward face (centre d 22.6, 12.3 m, r 1.0) [SYK; VN 23.6 / 13.4] and the
        small sphere on the bridge roof (d 15.4, 9.9 m, r 0.55) [SYK]: domes.
     8. The AK-630M on the aft house roof (d 38.9), its six barrels trained aft [SYK, VN]: ak630().
     9. Four liferaft canisters a side on house B's roof outboard of the radar deckhouse (d 25-28.2) [SYK;
        VN shows five] and a stowed
        davit arm abaft the AK-630 each side (d 41.3) [SYK port, VN starboard].
    10. The open stern deck d 42.4-49.5 with rails round it, the railed forecastle, the many whip aerials
        [SYK, VN].
    11. Paint: grey hull and house, darker grey decks, red-brown bottom; sampled [VN] sunlit bridge side
        0xa2adb6, taken to about 0.8: house 0x858e95, hull 0x7c858c, decks 0x5f676c, bottom 0x5e2a24 [TRG].
   CORRECTED against the first version (published figures, the AK-176M / AK-630M fits, the 178 as the
   pattern, the lattice mast and the no-stays decision are kept): the deck edge is 2.9 m amidships (was 2.2-
   2.5) and 4.25 m at the stem (was 3.5-3.8); the mast top is 21.2 m (was 17.4), its feet at d 24.8-27.2
   (was 26.2-27.0), with the platform at 14.2 m
   (was 11.9-14) and the yard at 17.2 m (was 15.2); the big dome is on the mast's forward face at 12.3 m (was
   a grey dome at 12.6 m on the platform and a white dome on the bridge roof at d 20.7, which is the 266's
   extra dome, not on the 178); the bridge roof is 8.5 m (was 8.1); the long lower house is 5.9 / 5.85 m
   (was 6.5 forward and 4.8 aft) and the radar deckhouse on it 8.1 m and 6.4 m wide (was 9.0 m and 5.4 m);
   the AK-630M is at d 38.9 (was 38.3); the AK-176M is at d 12.0 (was 12.2) and its shield 2.5 m tall on a
   0.7 m barbette (was 1.4 m on 0.55) as both profiles show; the hull now has its knuckle and flare.
   NOT CONFIRMED and not drawn: torpedo tubes and Igla posts (no photograph shows them), the RIB (the 266
   carries one, the 178 does not), radar types (drawn as photographed shapes only), stays (none visible),
   pennant numbers, names, ensigns, Coast Guard lettering and stripes.  Shafts, propellers and rudders are
   generic (never photographed).  Waterline z = 0.
   MODEL SPACE: +X bow, +Y port, +Z up, metres.  The AK-176M (shield, cradle, barrel) is the group named
   "turret" with its origin on the training axis; everything else is baked, one mesh per material.  ASCII
   only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSvetlyak = (function () {
  "use strict";
  var TAU = Math.PI * 2;
  var L = 49.5, X0 = -L / 2, X1 = L / 2, GUN = 12.0, BARB = 0.7;
  function X(d) { return X1 - d; }       /* x at d metres abaft the stem */
  function dOf(x) { return X1 - x; }
  var TX = X(GUN);

  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function tbl(T, d) {
    if (d <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) if (d <= T[i][0]) {
      var t = (d - T[i - 1][0]) / ((T[i][0] - T[i - 1][0]) || 1);
      return lerp(T[i - 1][1], T[i][1], t);
    }
    return T[T.length - 1][1];
  }

  /* a bin per material; UVs box-mapped in metres off the face normal (textures repeat every 16 m) */
  var UVS = 1 / 16;
  function Bin(mat) { this.mat = mat; this.P = []; this.N = []; this.U = []; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f], i, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      this.P.push(v[i][0], v[i][1], v[i][2]); this.N.push(n[i][0], n[i][1], n[i][2]);
      if (az >= ax && az >= ay) this.U.push(v[i][0] * UVS, v[i][1] * UVS);
      else if (ay >= ax) this.U.push(v[i][0] * UVS, v[i][2] * UVS);
      else this.U.push(v[i][1] * UVS, v[i][2] * UVS);
    }
  };
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      var cc = cross(sub(V[b], V[a]), sub(V[c], V[a]));
      if (dot(cc, cc) < 1e-12) continue;
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function skin(bin, x0, x1, y0, y1, z) {
    bin.tri([x0, y0, z], [x1, y0, z], [x1, y1, z], [0, 0, 1], [0, 0, 1], [0, 0, 1]);
    bin.tri([x0, y0, z], [x1, y1, z], [x0, y1, z], [0, 0, 1], [0, 0, 1], [0, 0, 1]);
  }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function block(bin, x0, x1, w0, z0, x2, x3, w1, z1, yc) {
    var y = yc || 0;
    hexa(bin, [[x0, y - w0, z0], [x1, y - w0, z0], [x1, y + w0, z0], [x0, y + w0, z0],
               [x2, y - w1, z1], [x3, y - w1, z1], [x3, y + w1, z1], [x2, y + w1, z1]]);
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
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg || 10); }
  /* loft through rings of equal point count, flat-capped, faceted */
  function loft(bin, rings) {
    var n = rings[0].length, V = [], F = [], k, r, a, b, c0, c1, Lr;
    for (r = 0; r < rings.length; r++) for (k = 0; k < n; k++) V.push(rings[r][k]);
    for (r = 0; r + 1 < rings.length; r++) for (k = 0; k < n; k++) {
      a = r * n + k; b = r * n + (k + 1) % n; c0 = a + n; c1 = b + n;
      F.push([a, b, c1], [a, c1, c0]);
    }
    for (k = 1; k + 1 < n; k++) F.push([0, k + 1, k]);
    Lr = (rings.length - 1) * n;
    for (k = 1; k + 1 < n; k++) F.push([Lr, Lr + k, Lr + k + 1]);
    var vol = 0, i, f;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      var p = V[f[0]], q = vol < 0 ? V[f[2]] : V[f[1]], s2 = vol < 0 ? V[f[1]] : V[f[2]];
      var cc = cross(sub(q, p), sub(s2, p));
      if (dot(cc, cc) < 1e-12) continue;
      bin.tri(p, q, s2);
    }
  }
  /* sphere / dome with smooth normals, from latitude lo to the pole */
  function dome(bin, cx, cy, cz, r, rings, seg, lo) {
    var i, k, a0 = lo === undefined ? -Math.PI * 0.45 : lo, R = [];
    for (i = 0; i <= rings; i++) {
      var a = a0 + (Math.PI / 2 - a0) * i / rings, rr = Math.cos(a) * r, z = cz + Math.sin(a) * r, ring2 = [];
      if (i === rings) rr = 0.0001;
      for (k = 0; k < seg; k++) ring2.push([cx + rr * Math.cos(k / seg * TAU), cy + rr * Math.sin(k / seg * TAU), z]);
      R.push(ring2);
    }
    for (i = 0; i + 1 < R.length; i++) for (k = 0; k < seg; k++) {
      var j = (k + 1) % seg, A = R[i][k], B = R[i][j], C2 = R[i + 1][j], D2 = R[i + 1][k];
      var nA = unit(sub(A, [cx, cy, cz])), nB = unit(sub(B, [cx, cy, cz])), nC = unit(sub(C2, [cx, cy, cz])), nD = unit(sub(D2, [cx, cy, cz]));
      bin.tri(A, B, C2, nA, nB, nC); bin.tri(A, C2, D2, nA, nC, nD);
    }
    var zb = R[0][0][2], cb = [cx, cy, zb];
    for (k = 0; k < seg; k++) bin.tri(cb, R[0][(k + 1) % seg], R[0][k], [0, 0, -1], [0, 0, -1], [0, 0, -1]);
  }

  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  /* ------------------------------------------------------------ canvas paint */
  var TEX = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function canvasTex(THREE, key, draw) {
    if (TEX[key]) return TEX[key];
    if (typeof document === "undefined" || !document.createElement) return null;
    var cv = document.createElement("canvas"); cv.width = 512; cv.height = 512;
    var g = cv.getContext && cv.getContext("2d");
    if (!g) return null;
    draw(g, 512);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    TEX[key] = t;
    return t;
  }
  /* plating, 16 m square: strakes every 1.4 m, butts every 4 m staggered, faint weathering, rust runs */
  function drawPlate(g, S) {
    var R = rng(10410), i, k, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.02 + R() * 0.035; g.fillStyle = R() < 0.55 ? "#8a949a" : "#ffffff";
      g.fillRect(R() * S, R() * S, (1 + R() * 4) * m, (0.4 + R() * 1.2) * m);
    }
    g.globalAlpha = 1;
    for (k = 0; k < 12; k++) {
      var y = Math.round(k * 1.4 * m);
      g.fillStyle = "rgba(70,80,86,0.28)"; g.fillRect(0, y, S, 1.5);
      g.fillStyle = "rgba(255,255,255,0.32)"; g.fillRect(0, y + 1.5, S, 1);
      for (i = 0; i < 4; i++) { var x = Math.round(((i * 4 + (k % 2) * 2) % 16) * m); g.fillStyle = "rgba(70,80,86,0.2)"; g.fillRect(x, y, 1.5, 1.4 * m); }
    }
    for (i = 0; i < 30; i++) {
      g.globalAlpha = 0.05 + R() * 0.06; g.fillStyle = "#5b5048";
      g.fillRect(R() * S, R() * S, 0.12 * m, (0.6 + R() * 1.6) * m);
    }
    g.globalAlpha = 1;
  }
  /* deck: non-skid panels 2 x 4 m with their seams */
  function drawDeck(g, S) {
    var R = rng(10412), i, j, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 4; i++) for (j = 0; j < 8; j++) {
      g.fillStyle = "rgba(0,0,0," + (0.02 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(i * 4 * m + 2, j * 2 * m + 2, 4 * m - 4, 2 * m - 4);
    }
    g.fillStyle = "rgba(40,44,48,0.35)";
    for (i = 0; i <= 4; i++) g.fillRect(i * 4 * m - 1, 0, 2, S);
    for (j = 0; j <= 8; j++) g.fillRect(0, j * 2 * m - 1, S, 2);
  }

  function materials(THREE, C) {
    var plate = canvasTex(THREE, "plate", drawPlate), deckT = canvasTex(THREE, "deck", drawDeck);
    function mk(c, r, m, map) {
      var o = { color: c, roughness: r, metalness: m };
      if (map) o.map = map;
      return new THREE.MeshStandardMaterial(o);
    }
    return {
      hull: mk(0x7c858c, 0.84, 0.07, plate),      /* hull sides */
      sup: mk(0x858e95, 0.84, 0.06, plate),       /* houses, gun shield, mast deckhouse, big dome */
      boot: mk(0x5e2a24, 0.86, 0.04),             /* red-brown bottom */
      deck: mk(0x5f676c, 0.95, 0.04, deckT),      /* weather decks and roofs */
      light: mk(0xa4abb0, 0.6, 0.06),             /* small radome, liferaft canisters */
      dark: mk(0x2a2f33, 0.75, 0.3),              /* recesses, doors, hatches, antenna faces */
      metal: mk(0x4e565b, 0.5, 0.55),             /* rails, barrels, mast lattice */
      glass: mk(0x17222b, 0.15, 0.4),
      buoy: mk(0xb8432c, 0.7, 0.02),              /* lifebuoys */
      team: mk((C && C.team !== undefined) ? C.team : 0x3f7fd0, 0.84, 0.06)
    };
  }

  /* ------------------------------------------------------------ hull: station table (d = metres abaft the
     stem head).  ZD deck-edge height, ZK knuckle height, HD/HK/HW half-breadths at the deck edge, knuckle and
     waterline, KL keel height.  Heights read off [SYK] (metre grid, 16 px a metre) and checked on [VN]; the
     breadths from the published 9.2 m beam and the flare seen in [TRG], [ND] and [AK2]. */
  var H = {
    stemTop: 4.25, stemFoot: 3.0,
    ZD: [[0, 4.25], [2, 4.05], [5, 3.8], [8, 3.55], [12, 3.32], [16, 3.12], [21, 3.0], [30, 2.92], [42, 2.92], [49.5, 2.95]],
    ZK: [[0, 4.1], [2, 3.45], [5, 3.0], [9, 2.62], [14, 2.38], [20, 2.25], [30, 2.2], [49.5, 2.2]],
    HD: [[0, 0.12], [1.5, 1.05], [4, 2.2], [7, 3.15], [10, 3.75], [14, 4.25], [18, 4.5], [22, 4.6], [42, 4.6], [46, 4.55], [49.5, 4.45]],
    HK: [[0, 0.1], [1.5, 0.98], [4, 2.12], [7, 3.08], [10, 3.7], [14, 4.22], [18, 4.5], [22, 4.6], [42, 4.6], [46, 4.55], [49.5, 4.45]],
    HW: [[3.0, 0.05], [5, 0.8], [8, 1.9], [12, 2.9], [16, 3.5], [21, 3.95], [28, 4.15], [42, 4.15], [49.5, 4.0]],
    KL: [[3.0, 0], [4.5, -0.6], [7, -1.25], [11, -1.7], [16, -1.95], [22, -2.05], [36, -2.05], [44, -1.85], [49.5, -1.6]]
  };
  function zD(d) { return tbl(H.ZD, d); }
  function hD(d) { return tbl(H.HD, d); }
  function zLow(d) {
    if (d < H.stemFoot) return H.stemTop * (1 - d / H.stemFoot) * (1 - 0.12 * Math.sin(Math.PI * d / H.stemFoot));
    return tbl(H.KL, d);
  }
  function ring(d) {
    var x = X(d), zd = zD(d), zk = Math.min(tbl(H.ZK, d), zd - 0.12), hd = hD(d), hk = tbl(H.HK, d), hw = d < H.stemFoot ? 0.04 : tbl(H.HW, d);
    var kl = zLow(d), P = [];
    function pt(y, z) {
      if (z < kl) { z = kl; y = Math.min(Math.abs(y), 0.06) * (y < 0 ? -1 : 1); }
      return [x, y, z];
    }
    var hb = hw + (hk - hw) * clamp01(0.15 / Math.max(zk, 0.2));
    var camber = 0.1 * clamp01(hd / 3);
    P.push([x, 0, zd + camber]);
    P.push(pt(hd, zd), pt(hk, zk), pt(hb, 0.15), pt(hw, 0), pt(hw * 0.88, kl * 0.5), pt(hw * 0.32, kl));
    P.push(pt(-hw * 0.32, kl), pt(-hw * 0.88, kl * 0.5), pt(-hw, 0), pt(-hb, 0.15), pt(-hk, zk), pt(-hd, zd));
    return P;
  }
  function addHull(B) {
    var ds = [], d, i, k, n = 13;
    var base = [0, 0.25, 0.6, 1.0, 1.5, 2.0, 2.5, H.stemFoot, H.stemFoot + 0.6, 4.5, 5.5, 7, 8.5, 10, 12, 14, 16, 18, 21, 24];
    for (i = 0; i < base.length; i++) ds.push(base[i]);
    for (d = 27; d < L - 0.5; d += 3.0) ds.push(d);
    ds.push(L - 1.0, L);
    ds.sort(function (a, b) { return a - b; });
    var DS = [ds[0]];
    for (i = 1; i < ds.length; i++) if (ds[i] - DS[DS.length - 1] > 0.02 && ds[i] <= L) DS.push(ds[i]);
    var R = DS.map(ring);
    var TAG = ["deck", "hull", "hull", "boot", "boot", "boot", "boot", "boot", "boot", "boot", "hull", "hull", "deck"];
    for (i = 0; i + 1 < R.length; i++) {
      var A = R[i], Bq = R[i + 1];
      for (k = 0; k < n; k++) {
        var j = (k + 1) % n, bin = B[TAG[k]];
        var p = A[k], q = A[j], r = Bq[j], s = Bq[k];
        var c1 = cross(sub(q, p), sub(r, p));
        if (dot(c1, c1) > 1e-12) bin.tri(p, q, r);
        var c2 = cross(sub(r, p), sub(s, p));
        if (dot(c2, c2) > 1e-12) bin.tri(p, r, s);
      }
    }
    var T = R[R.length - 1];
    function fanAft(bin, idx) {
      for (k = 1; k + 1 < idx.length; k++) {
        var p0 = T[idx[0]], p1 = T[idx[k]], p2 = T[idx[k + 1]], cc = cross(sub(p1, p0), sub(p2, p0));
        if (dot(cc, cc) < 1e-12) continue;
        if (cc[0] < 0) bin.tri(p0, p1, p2); else bin.tri(p0, p2, p1);
      }
    }
    fanAft(B.hull, [0, 1, 2, 3, 10, 11, 12]);
    fanAft(B.boot, [3, 4, 5, 6, 7, 8, 9, 10]);
    /* the knuckle as a thin rubbing strake from the stem to d 22, where it fades into the side */
    for (d = 0.6; d < 22; d += 1.4) {
      var dn = Math.min(d + 1.4, 22), s;
      for (s = -1; s <= 1; s += 2) {
        var za = Math.min(tbl(H.ZK, d), zD(d) - 0.12), zb = Math.min(tbl(H.ZK, dn), zD(dn) - 0.12);
        cyl(B.hull, [X(d), s * (tbl(H.HK, d) - 0.015), za], [X(dn), s * (tbl(H.HK, dn) - 0.015), zb], 0.035, 0.035, 4);
      }
    }
  }

  /* a tier with raked ends and tumble on its own deck, with a deck-painted roof skin */
  function tier(bin, roofBin, dF, dFt, dBt, dB, z0, z1, w0, w1) {
    hexa(bin, [[X(dB), -w0, z0], [X(dF), -w0, z0], [X(dF), w0, z0], [X(dB), w0, z0],
               [X(dBt), -w1, z1], [X(dFt), -w1, z1], [X(dFt), w1, z1], [X(dBt), w1, z1]]);
    if (roofBin) skin(roofBin, X(dBt) + 0.05, X(dFt) - 0.05, -w1 + 0.05, w1 - 0.05, z1 + 0.012);
  }
  /* guard rails along both deck edges between two stations */
  function rails(B, da, db, zf, inset, h) {
    var s, d, hh = h || 1.0;
    for (s = -1; s <= 1; s += 2) {
      for (d = da; d < db - 0.01; d += 1.2) {
        var dn = Math.min(d + 1.2, db), y0 = s * (hD(d) - (inset || 0.1)), y1 = s * (hD(dn) - (inset || 0.1));
        if (Math.abs(y0) < 0.25) continue;
        var z0 = zf ? zf(d) : zD(d), z1 = zf ? zf(dn) : zD(dn);
        cyl(B.metal, [X(d), y0, z0 + hh], [X(dn), y1, z1 + hh], 0.022, 0.022, 4);
        cyl(B.metal, [X(d), y0, z0 + hh * 0.5], [X(dn), y1, z1 + hh * 0.5], 0.014, 0.014, 3);
        box(B.metal, X(d) - 0.022, X(d) + 0.022, y0 - 0.022, y0 + 0.022, z0, z0 + hh);
      }
    }
  }
  /* straight rail round a roof rectangle (sides and after edge) */
  function roofRail(B, d0, d1, w, z, aft) {
    var s, d;
    for (s = -1; s <= 1; s += 2) {
      cyl(B.metal, [X(d0), s * w, z + 0.95], [X(d1), s * w, z + 0.95], 0.02, 0.02, 4);
      cyl(B.metal, [X(d0), s * w, z + 0.5], [X(d1), s * w, z + 0.5], 0.014, 0.014, 3);
      for (d = d0; d <= d1 + 0.01; d += 1.4) box(B.metal, X(d) - 0.02, X(d) + 0.02, s * w - 0.02, s * w + 0.02, z, z + 0.95);
    }
    if (aft) cyl(B.metal, [X(d1), -w, z + 0.95], [X(d1), w, z + 0.95], 0.02, 0.02, 4);
  }
  /* a thin panel on a tumbled side: d0..d1 along, z0..z1 up, w(z) the side's half-width there */
  function sidePanel(bin, d0, d1, z0, z1, w, s, t) {
    var o = t || 0.035, a = w(z0), b = w(z1);
    hexa(bin, [[X(d1), s * (a - 0.01), z0], [X(d0), s * (a - 0.01), z0], [X(d0), s * (a + o), z0], [X(d1), s * (a + o), z0],
               [X(d1), s * (b - 0.01), z1], [X(d0), s * (b - 0.01), z1], [X(d0), s * (b + o), z1], [X(d1), s * (b + o), z1]]);
  }

  /* ------------------------------------------------------------ the boat */
  var ZA = 8.5, ZB = 5.9, ZC = 5.85, ZM = 8.1, ZBASE = 2.86;
  function wA(z) { return 3.85 - 0.2 * (z - ZBASE) / (ZA - ZBASE); }
  function wB(z) { return 3.85 - 0.15 * (z - ZBASE) / (ZB - ZBASE); }
  function wC(z) { return 3.6 - 0.15 * (z - ZBASE) / (ZC - ZBASE); }
  function wM(z) { return 3.2 - 0.15 * (z - ZB) / (ZM - ZB); }

  function addShip(B) {
    var s, j, d, i, x, k;
    addHull(B);
    rails(B, 1.0, 13.6);
    rails(B, 42.6, L - 0.3);
    /* side-deck rails abreast the houses */
    rails(B, 13.6, 42.6, null, 0.12, 1.0);

    /* forecastle: windlass, gypsies, hawse pipes and anchor pockets, bitts, hatch, jack staff */
    var zw = zD(5.2);
    cylZ(B.sup, X(5.2), 0, zw - 0.02, zw + 0.42, 0.42, 14);
    cylZ(B.dark, X(5.2), 0, zw + 0.42, zw + 0.46, 0.36, 14);
    for (s = -1; s <= 1; s += 2) {
      cylY(B.dark, X(4.6), s * 0.5, s * 0.95, zw + 0.25, 0.22, 10);
      d = 3.0;
      cylZ(B.dark, X(d), s * (hD(d) - 0.45), zD(d) - 0.05, zD(d) + 0.05, 0.2, 10);
      box(B.dark, X(d) - 0.45, X(d) + 0.45, s * (hD(d) - 0.03) - 0.22, s * (hD(d) - 0.03) + 0.22, zD(d) - 0.95, zD(d) - 0.35);
      for (d = 7.5; d < 12; d += 3.5) {
        cylZ(B.metal, X(d), s * (hD(d) - 0.5), zD(d), zD(d) + 0.34, 0.1, 8);
        cylZ(B.metal, X(d + 0.45), s * (hD(d) - 0.5), zD(d), zD(d) + 0.34, 0.1, 8);
      }
    }
    box(B.sup, X(8.4), X(7.4), -0.55, 0.55, zD(8) - 0.05, zD(8) + 0.22);
    box(B.dark, X(8.3), X(7.5), -0.45, 0.45, zD(8) + 0.22, zD(8) + 0.25);
    cyl(B.metal, [X(0.4), 0, zD(0.4) + 0.05], [X(0.4), 0, zD(0.4) + 2.4], 0.04, 0.02, 6);
    /* AK-176M barbette */
    var zg = zD(GUN);
    cylZ(B.sup, TX, 0, zg - 0.05, zg + BARB, 1.3, 28);
    cylZ(B.dark, TX, 0, zg + BARB - 0.04, zg + BARB, 1.18, 28);

    /* ---- house A (bridge block) d 13.8-20.6 to 8.5 m; B d 20.4-31.7 to 5.9 m; C d 31.7-42.4 to 5.85 m;
       radar deckhouse M d 20.4-28.6 on B to 8.1 m.  [SYK] stations, [VN] roofs. */
    tier(B.sup, B.deck, 13.8, 14.25, 20.4, 20.6, ZBASE, ZA, 3.85, 3.65);
    tier(B.sup, B.deck, 20.4, 20.5, 31.5, 31.7, ZBASE, ZB, 3.85, 3.7);
    tier(B.sup, B.deck, 31.6, 31.7, 41.3, 42.4, ZBASE, ZC, 3.6, 3.45);
    tier(B.sup, B.deck, 20.4, 20.45, 28.3, 28.6, ZB - 0.02, ZM, 3.2, 3.05);
    /* bridge-roof lip and visor */
    box(B.sup, X(20.5), X(14.15), -3.72, 3.72, ZA - 0.05, ZA + 0.12);
    box(B.dark, X(14.35), X(14.1), -3.7, 3.7, ZA - 0.32, ZA - 0.2);
    /* bridge windows: seven panes across the raked front, five down each side [SYK] */
    var rake = 0.45 / (ZA - ZBASE);
    for (j = 0; j < 7; j++) {
      var ya = -3.2 + j * 0.93, yb = ya + 0.78, zw0 = 7.55, zw1 = 8.15;
      var xa = X(13.8) - rake * (zw0 - ZBASE) + 0.03, xb = X(13.8) - rake * (zw1 - ZBASE) + 0.03;
      hexa(B.glass, [[xa - 0.06, ya, zw0], [xa + 0.02, ya, zw0], [xa + 0.02, yb, zw0], [xa - 0.06, yb, zw0],
                     [xb - 0.06, ya, zw1], [xb + 0.02, ya, zw1], [xb + 0.02, yb, zw1], [xb - 0.06, yb, zw1]]);
    }
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 5; j++) sidePanel(B.glass, 14.6 + j * 0.8, 15.2 + j * 0.8, 7.55, 8.15, wA, s);
      sidePanel(B.dark, 18.8, 19.7, ZBASE + 0.15, ZBASE + 2.0, wA, s);                 /* bridge-block door */
      for (j = 0; j < 3; j++) sidePanel(B.glass, 21.0 + j * 0.75, 21.4 + j * 0.75, 4.7, 5.1, wB, s);   /* ports [SYK] */
      sidePanel(B.dark, 23.6, 24.5, ZBASE + 0.15, ZBASE + 2.0, wB, s);
      sidePanel(B.dark, 33.3, 34.2, ZBASE + 0.15, ZBASE + 1.95, wC, s);
      for (j = 0; j < 3; j++) sidePanel(B.glass, 35.6 + j * 1.3, 36.0 + j * 1.3, 4.3, 4.7, wC, s);
      for (j = 0; j < 3; j++) sidePanel(B.glass, 21.8 + j * 1.6, 22.3 + j * 1.6, 7.1, 7.5, wM, s);
      /* lifebuoys on the bridge and house sides */
      cylY(B.buoy, X(17.3), s * wA(5.6), s * (wA(5.6) + 0.1), 5.6, 0.32, 14);
      cylY(B.buoy, X(30.4), s * wB(5.5), s * (wB(5.5) + 0.1), 5.5, 0.32, 14);
      /* four liferaft canisters on the house B ledge (d 25-28.2), axis fore and aft [SYK] */
      for (j = 0; j < 4; j++) {
        x = X(25.0 + j * 0.8);
        cylX(B.light, x - 0.36, x + 0.36, s * 3.52, ZB + 0.32, 0.3, 0.3, 10);
      }
      box(B.metal, X(28.4), X(24.6), s * 3.45 - 0.3, s * 3.45 + 0.3, ZB - 0.02, ZB + 0.04);
    }
    /* hull-side portholes (d 17.0, 19.0, 23.7 at 2.3 m) and freeing ports at the deck edge [VN] */
    for (s = -1; s <= 1; s += 2) {
      [17.0, 19.0, 23.7].forEach(function (dp) { cylY(B.dark, X(dp), s * (hD(dp) - 0.03), s * (hD(dp) + 0.012), 2.3, 0.15, 10); });
      [27.6, 29.6, 36.0, 39.5].forEach(function (dp) { box(B.dark, X(dp) - 0.3, X(dp) + 0.3, s * hD(dp) - 0.03, s * hD(dp) + 0.012, zD(dp) - 0.32, zD(dp) - 0.12); });
    }
    /* rails round the roofs of B (abaft M) and C, and round the mast deckhouse roof */
    roofRail(B, 28.7, 31.4, 3.55, ZB, false);
    roofRail(B, 31.9, 41.2, 3.3, ZC, false);
    roofRail(B, 21.0, 28.2, 2.95, ZM, true);
    roofRail(B, 14.6, 20.2, 3.5, ZA, false);

    /* small sphere on the bridge roof (d 15.4, 9.9 m, r 0.55) [SYK] */
    cylZ(B.metal, X(15.4), 0, ZA, ZA + 0.9, 0.16, 10);
    cylZ(B.sup, X(15.4), 0, ZA + 0.75, ZA + 0.95, 0.42, 14);
    dome(B.light, X(15.4), 0, 9.9, 0.55, 7, 18, -Math.PI * 0.42);
    /* a box at the after end of the bridge roof and the lamp posts */
    box(B.sup, X(20.2), X(18.6), -1.0, 1.0, ZA, ZA + 0.55);
    box(B.dark, X(18.65), X(18.58), -0.8, 0.8, ZA + 0.15, ZA + 0.45);

    /* the mast: four-legged lattice from the deckhouse roof (feet d 24.8-27.2, 8.1 m) to 17.2 m, platform at
       14.2 m with the two radar arrays, the big radome on the forward face, yard 17.2 m, radar bar 18 m,
       topmast 21.2 m [SYK, VN, AK2] */
    mast(B);

    /* AK-630M on the aft house (d 38.9) */
    ak630(B, X(38.9), ZC);
    /* stowed davit arm abaft the gun, each side (d 41.3) [SYK port, VN starboard] */
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.sup, X(41.3), s * 3.2, ZC - 0.6, ZC + 0.3, 0.12, 8);
      cyl(B.metal, [X(41.3), s * 3.2, ZC + 0.3], [X(43.4), s * 3.6, ZC - 0.9], 0.07, 0.05, 6);
    }
    /* small lockers on the aft house roof and a ventilator pair */
    for (s = -1; s <= 1; s += 2) {
      box(B.sup, X(34.6), X(33.2), s * 1.2, s * 2.5, ZC, ZC + 0.5);
      cylZ(B.sup, X(36.0), s * 2.4, ZC, ZC + 0.5, 0.2, 10);
      cylZ(B.dark, X(36.0), s * 2.4, ZC + 0.5, ZC + 0.55, 0.27, 10);
    }

    /* whip aerials [SYK]: bridge sides, mast deckhouse, house B aft corner, aft house */
    [[16.6, 3.4, ZA, 7.4], [16.6, -3.4, ZA, 7.4], [21.2, 2.85, ZM, 7.6], [21.2, -2.85, ZM, 7.6],
     [30.4, 3.4, ZB, 9.4], [30.4, -3.4, ZB, 9.4], [33.3, 3.1, ZC, 8.8], [36.6, -3.1, ZC, 8.6]].forEach(function (a) {
      cylZ(B.metal, X(a[0]), a[1], a[2], a[2] + 0.4, 0.07, 6);
      cyl(B.metal, [X(a[0]), a[1], a[2] + 0.4], [X(a[0]), a[1], a[2] + a[3]], 0.03, 0.012, 4);
    });

    /* aft deck: capstan, bitts, hatch, fairleads, ensign staff (no ensign) */
    cylZ(B.sup, X(46.3), 0, zD(46.3), zD(46.3) + 0.5, 0.38, 12);
    cylZ(B.dark, X(46.3), 0, zD(46.3) + 0.5, zD(46.3) + 0.54, 0.32, 12);
    box(B.dark, X(44.4), X(43.4), -0.6, 0.6, zD(44) - 0.03, zD(44) + 0.06);
    for (s = -1; s <= 1; s += 2) {
      for (d = 44.0; d < 49; d += 3.5) {
        cylZ(B.metal, X(d), s * (hD(d) - 0.55), zD(d), zD(d) + 0.34, 0.1, 8);
        cylZ(B.metal, X(d + 0.45), s * (hD(d) - 0.55), zD(d), zD(d) + 0.34, 0.1, 8);
      }
    }
    cyl(B.metal, [X(L - 0.5), 0, zD(L - 0.5)], [X(L - 0.5), 0, zD(L - 0.5) + 3.2], 0.05, 0.025, 6);

    /* team strips: bridge roof, mast deckhouse roof, aft deck */
    box(B.team, X(18.4), X(16.6), -1.2, 1.2, ZA + 0.012, ZA + 0.03);
    box(B.team, X(40.6), X(40.0), -1.6, 1.6, ZC + 0.012, ZC + 0.03);
    box(B.team, X(47.8), X(46.9), 1.4, 2.6, zD(47.5) + 0.03, zD(47.5) + 0.05);

    /* underwater: three shafts with struts, propellers and rudders (generic, never photographed) */
    for (s = -1; s <= 1; s++) {
      var ys = s * 1.75, zs = -1.95;
      cyl(B.metal, [X0 - 0.3, ys, zs], [X0 + 7.5, ys, -1.2], 0.1, 0.1, 8);
      cylX(B.metal, X0 - 0.55, X0 - 0.3, ys, zs, 0.2, 0.09, 8);
      for (k = 0; k < 3; k++) {
        var pa = k / 3 * TAU + 0.5, py = Math.cos(pa) * 0.6, pz = Math.sin(pa) * 0.6;
        hexa(B.metal, [[X0 - 0.5, ys, zs], [X0 - 0.35, ys, zs], [X0 - 0.35, ys + py * 0.2, zs + pz * 0.2], [X0 - 0.5, ys + py * 0.2, zs + pz * 0.2],
                       [X0 - 0.48, ys + py, zs + pz - 0.05], [X0 - 0.37, ys + py, zs + pz - 0.05], [X0 - 0.37, ys + py * 1.0 + 0.05, zs + pz], [X0 - 0.48, ys + py + 0.05, zs + pz]]);
      }
      box(B.metal, X0 + 1.2, X0 + 1.6, ys - 0.04, ys + 0.04, zs - 0.1, zLow(L - 1.4) + 0.1);
      if (s !== 0) box(B.metal, X0 + 0.2, X0 + 1.0, ys - 0.04, ys + 0.04, -2.63, -1.2);
    }
  }

  function mast(B) {
    var i, j, s, lg, bay;
    var xm = X(26.0), z0 = ZM, zt = 17.2, aB = 0.95, aT = 0.3, nb = 6;
    for (lg = 0; lg < 4; lg++) {
      var sx = lg < 2 ? -1 : 1, sy = (lg % 2) ? -1 : 1;
      cyl(B.metal, [xm + sx * aB * 1.25, sy * aB, z0], [xm + sx * aT, sy * aT, zt], 0.055, 0.035, 5);
    }
    for (bay = 0; bay < nb; bay++) {
      var f0 = bay / nb, f1 = (bay + 1) / nb, a0 = lerp(aB, aT, f0), a1 = lerp(aB, aT, f1), z00 = lerp(z0, zt, f0), z11 = lerp(z0, zt, f1);
      for (s = -1; s <= 1; s += 2) {
        cyl(B.metal, [xm - a0 * 1.25 * (1 - f0 * 0.0), s * a0, z00], [xm + a1 * 1.25, s * a1, z11], 0.02, 0.02, 3);
        cyl(B.metal, [xm + s * a0 * 1.25, -a0, z00], [xm + s * a1 * 1.25, a1, z11], 0.02, 0.02, 3);
        cyl(B.metal, [xm - a1 * 1.25, s * a1, z11], [xm + a1 * 1.25, s * a1, z11], 0.018, 0.018, 3);
        cyl(B.metal, [xm + s * a1 * 1.25, -a1, z11], [xm + s * a1 * 1.25, a1, z11], 0.018, 0.018, 3);
      }
    }
    /* radome on the forward face: column from the deckhouse roof, then the dome (centre d 22.6, 12.3 m) */
    var xd = X(22.6);
    cylZ(B.sup, xd, 0, ZM, 11.0, 0.5, 14);
    box(B.metal, xd - 0.1, xm - 0.6, -0.08, 0.08, 10.7, 10.85);
    cylZ(B.sup, xd, 0, 10.95, 11.45, 0.82, 20);
    dome(B.sup, xd, 0, 12.3, 1.0, 10, 28, -Math.PI * 0.32);
    /* platform at 14.2 m with its rail and the two antenna arrays fore and aft [SYK] */
    var zp = 14.2, pl = X(27.7), pf = X(22.8);
    box(B.deck, pl, pf, -1.15, 1.15, zp - 0.08, zp);
    box(B.metal, pl, pf, -1.15, 1.15, zp - 0.22, zp - 0.08);
    for (s = -1; s <= 1; s += 2) cyl(B.metal, [pl, s * 1.12, zp + 0.9], [pf, s * 1.12, zp + 0.9], 0.018, 0.018, 3);
    box(B.sup, X(24.1), X(22.9), -0.75, 0.75, zp, zp + 1.0);              /* forward array housing */
    box(B.dark, X(22.95), X(22.85), -0.65, 0.65, zp + 0.1, zp + 0.9);
    box(B.sup, X(27.7), X(26.6), -0.75, 0.75, zp, zp + 1.0);              /* after array housing */
    box(B.dark, X(27.75), X(27.65), -0.65, 0.65, zp + 0.1, zp + 0.9);
    cylZ(B.metal, X(25.2), 0, zp, zp + 0.6, 0.1, 8);                       /* small dish on its post */
    cyl(B.light, [X(25.2) + 0.05, 0, zp + 0.85], [X(25.2) + 0.25, 0, zp + 0.85], 0.32, 0.1, 12);
    /* yard at 17.2 m with small antennas at its arms */
    box(B.metal, xm - 0.05, xm + 0.05, -2.9, 2.9, zt - 0.05, zt + 0.05);
    for (s = -1; s <= 1; s += 2) {
      cyl(B.metal, [xm, s * 0.3, zt - 0.5], [xm, s * 2.4, zt], 0.025, 0.025, 4);
      box(B.dark, xm - 0.1, xm + 0.1, s * 2.75 - 0.08, s * 2.75 + 0.08, zt - 0.35, zt + 0.05);
    }
    /* navigation radar bar on a small platform at 18 m, topmast to 21.2 m */
    cylZ(B.metal, xm, 0, zt, 18.0, 0.09, 8);
    box(B.metal, xm - 0.45, xm + 0.45, -0.45, 0.45, 17.95, 18.02);
    box(B.dark, xm - 0.08, xm + 0.08, -1.0, 1.0, 18.1, 18.3);
    cyl(B.metal, [xm, 0, 18.02], [xm, 0, 21.2], 0.06, 0.025, 6);
    box(B.metal, xm - 0.03, xm + 0.03, -0.6, 0.6, 19.8, 19.85);
  }

  /* AK-630M: low ring, rounded turret housing, six barrels in a cluster trained aft, slightly elevated */
  function ak630(B, ax, az) {
    var i;
    cylZ(B.sup, ax, 0, az, az + 0.35, 0.95, 22);
    cylZ(B.dark, ax, 0, az + 0.33, az + 0.38, 0.98, 22);
    cylZ(B.sup, ax, 0, az + 0.36, az + 0.6, 0.78, 20);
    dome(B.sup, ax, 0, az + 0.6, 0.78, 6, 20, 0);
    box(B.sup, ax - 0.9, ax - 0.4, -0.34, 0.34, az + 0.45, az + 1.05);     /* gun port housing */
    var el = 0.14, ce = Math.cos(el), se = Math.sin(el), bz = az + 0.78;
    cyl(B.dark, [ax - 0.9, 0, bz], [ax - 1.25, 0, bz + 0.05], 0.2, 0.18, 12);
    for (i = 0; i < 6; i++) {
      var an = i / 6 * TAU, by = Math.cos(an) * 0.08, bh = Math.sin(an) * 0.08;
      cyl(B.metal, [ax - 1.2, by, bz + bh], [ax - 1.2 - 1.6 * ce, by, bz + bh + 1.6 * se], 0.026, 0.026, 5);
    }
    cyl(B.metal, [ax - 2.2, 0, bz + 0.14], [ax - 2.6, 0, bz + 0.19], 0.12, 0.12, 8);
  }

  /* ------------------------------------------------------------ the AK-176M (group "turret", origin on the
     training axis on the barbette top).  Rounded shield 3.7 x 2.4 x 2.3 m [SYK, VN]: a lofted body with a
     sloped, rounded front and a low rear; cradle, a long thin 76 mm L/59 barrel. */
  function addTurret(B) {
    var s;
    /* rounded shoulders: the side runs up to zs, then two facets round into the roof */
    function sec(x, w, zt, zs) {
      var zq = zs + (zt - zs) * 0.6;
      return [[x, -w, 0], [x, w, 0], [x, w, zs], [x, w * 0.94, zq], [x, w * 0.78, zt * 0.985], [x, w * 0.45, zt],
              [x, -w * 0.45, zt], [x, -w * 0.78, zt * 0.985], [x, -w * 0.94, zq], [x, -w, zs]];
    }
    loft(B.paint, [sec(-1.65, 1.05, 1.7, 1.35), sec(-1.3, 1.22, 2.25, 1.75), sec(-0.5, 1.25, 2.5, 1.9),
                   sec(0.6, 1.23, 2.5, 1.85), sec(1.45, 1.1, 2.15, 1.55), sec(2.0, 0.85, 1.5, 1.1), sec(2.35, 0.55, 0.85, 0.65)]);
    /* gun port, mantlet sleeve, barrel, muzzle brake (barrel drawn level; trains with the group) */
    box(B.dark, 1.9, 2.12, -0.34, 0.34, 0.95, 1.55);
    cylX(B.paint, 2.05, 2.7, 0, 1.25, 0.26, 0.2, 14);
    cylX(B.dark, 2.65, 3.15, 0, 1.25, 0.15, 0.12, 14);
    cylX(B.metal, 3.1, 7.1, 0, 1.25, 0.075, 0.065, 12);
    cylX(B.dark, 7.05, 7.35, 0, 1.25, 0.1, 0.085, 12);
    /* roof sight and hatch, side doors, training ring */
    box(B.dark, 0.1, 0.7, 0.45, 0.85, 2.48, 2.62);
    box(B.glass, 0.68, 0.72, 0.5, 0.8, 2.51, 2.59);
    box(B.dark, -0.9, -0.3, -0.75, -0.3, 2.48, 2.53);
    for (s = -1; s <= 1; s += 2) box(B.dark, -1.1, -0.35, s * 1.25 - 0.02, s * 1.25 + 0.02, 0.35, 1.65);
    cylZ(B.dark, 0, 0, -0.02, 0.05, 1.2, 24);
  }

  function bins(T, names) { var o = {}; names.forEach(function (n) { o[n] = new Bin(T[n]); }); return o; }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group();
    var HB = bins(T, ["hull", "sup", "boot", "deck", "light", "dark", "metal", "glass", "buoy", "team"]);
    addShip(HB);
    flush(THREE, g, HB);
    var TB = { paint: new Bin(T.sup), dark: new Bin(T.dark), metal: new Bin(T.metal), glass: new Bin(T.glass) };
    addTurret(TB);
    var wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(TX, 0, zD(GUN) + BARB);
    flush(THREE, wg, TB);
    g.add(wg);
    return g;
  }
  return { build: build };
})();

UNIT_MODELS["pact_e80_patrol"] = {
  len: 49.5,
  build: function (THREE, M, C) { return HeroSvetlyak.build(THREE, M, C); }
};
