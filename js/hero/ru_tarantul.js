/* ==================== js/hero/ru_tarantul.js ===========================
   HERO MODEL -- Project 1241 "Molniya" (NATO Tarantul) missile boat.  Keys (unchanged):
     pact_e80_missileboat (eras.js, "Project 1241 Molniya", service 1979, e80-e90): drawn as the SOVIET
        FIRST SERIES, Project 12411-T (NATO Tarantul II), with four P-15M Termit in KT-138 containers, as
        photographed in 1985 [KK].
     missileboat_p (rules.js "Molniya Missile Boat", present day; warship_specs "Project 12411 Tarantul III"):
        drawn as the Project 12411-M (Tarantul III) with four P-270 Moskit in KT-152 tubes, in the
        present-day Russian Navy paint [ZAR][BSF][MOR].
   Neither row is turret:true: the AK-176 is baked and nothing is named "turret".
   FULL-QUALITY REDO 2026-10-24: hull lofted from a station table measured off the dimensioned drawing [TY]
   and the 1985 beam photograph [KK]; houses, launchers, masts re-measured per variant; canvas plate/deck paint.

   PUBLISHED FIGURES (ru.wikipedia "Raketnye katera proekta 1241", infobox and text; kept from the first
   version and confirmed): hull length 56.1 m, greatest beam 10.2 m, hull draught 2.5 m, depth at midships
   5.31 m.  12411-T: four P-15 Termit; 12411-M: four P-270 Moskit "in two paired KT-152 launchers with the
   tubular containers one above the other", fixed elevation, on the beam on the upper deck.  One AK-176
   forward; two AK-630M on the after superstructure; the Strela-3/Igla quadruple pedestal "on the stern";
   the Monolit radar complex "on the wheelhouse roof under a large cylinder-hemisphere fairing"; the MR-123
   Vympel (Bass Tilt) "on the superstructure by the mast"; five rafts, three on the first-tier roof aft
   "between the AK-630s".  The 12411-T was built 1979-1984 (en.wikipedia: 13 boats).
   CORRECTED against the first version: its Termit boat had NO radome and an upright tapered tower with a
   dish: that is the EXPORT Project 1241RE (Tarantul I, the East German boat of the Typenblatt drawing),
   which ru.wikipedia says lacked the Monolit.  The Soviet 12411-T carries the big dome on the bridge roof
   [KK] and is now drawn so.  Deck height lowered (bow 4.1 m, midships 3.2 m; was 4.85 / 3.6) to the
   drawing and to depth 5.31 - draught 2.5; the Moskit tubes lengthened to 10 m (P-270 is 9.7 m long).

   REFERENCES (Wikimedia Commons, width 960, cached in the scratchpad q_tarantul_ref):
     [KK]  "Pr.12411T.jpg" (US DoD, 12 Nov 1985, public domain): Kirovskiy Komsomolets, 12411-T, starboard
           beam.  The master profile for the Termit row: 56.1 m = 888 px; stations below read off it.
     [TY]  "Typenblatt-Tarantul-engl.jpg" (CC BY-SA 4.0): dimensioned three-view of the 1241RE, 56.1 m =
           627 px.  Hull sheer, stem rake, draught, the deck PLAN (beam stations, launcher and gun plan
           positions, the raft canisters) - the hull and house footprint are common to the family.
     [R71] "R-71 (A).jpg", "Nadstroyka R-71" and "Korma R-71" (Cyrillic titles; 12411-T in Sevastopol,
           2010s): the Termit container close up (two stacked lobes, flat sides, round ends, trestle legs),
           the intake block with two round vents, the raft canisters, the stern, the red-brown deck.
     [R261] "R-261.jpg", [M1] "Pr.12411M1.jpg" (US DoD, Vladivostok Sept 1990, public domain): Soviet
           12411-M: flush bridge front, dome, the tube pairs angled forward-up, the straight lattice mast.
     [ZAR] "Zarechny (parade).jpg" (2011, CC BY-SA 3.0) and "Zarechniy rka korma.jpg": the Moskit tube
           caps, the bridge window row, the mast platform with two boxes and a sphere, the wide top yard,
           the Bass Tilt drum, the AK-630s, the transom-corner exhaust casings with round covers.
     [BSF] "Project 1241 missile boat of the Black Sea Fleet of the Russian Federation.png" (mil.ru 2019,
           CC BY 4.0) and [MOR] "Morshansk.jpg" (2007, public domain): present-day paint.

   RECOGNITION LIST (each must read at game zoom; where it shows in the model):
     1. Long low flush-decked hull, raked stem (deck 4.1 m at the stem, forefoot 3.4 m aft), flat sheer,
        flared bow, immersed transom [TY][KK]: station tables ZD/HD/FL/HW/KL, ring().
     2. AK-176 single 76 mm turret on the forecastle at d 13.6 [KK][TY]: ak176().
     3. The big cylinder-hemisphere Monolit dome on the bridge roof (3.35 m across, top 10.8 m) [KK][R261]
        [ZAR]: both rows.
     4. The missiles amidships on the beam, one above the other, angled forward-up: Termit = two-lobed
        KT-138 boxes on trestles [KK][R71]; Moskit = two big round KT-152 tubes with domed caps [ZAR][M1].
     5. The house narrows beside the launchers (half-width 2.85 m) [TY plan].
     6. Tower block at the mast foot with the Bass Tilt drum on its fore edge [KK][ZAR].
     7. Masts: Termit - a plated tapered column with a platform, a sphere at the top and a gaff [KK];
        Moskit - a straight four-legged lattice with a platform carrying two boxes and a sphere, and a
        wide top yard [ZAR][M1][MOR].
     8. Lower after house with the two AK-630 side by side, trained aft, rafts between them [KK][TY][R71].
     9. Intake block with two round vents on the after main roof [KK][R71].
    10. Strela/Igla pedestal on the quarterdeck; exhaust casings at the transom corners [KK][ZAR].
    11. Paint: 1985/1990 Soviet: blue-grey hull darker than the light-grey houses, paler dome [KK B&W:
        hull 72, house 114, dome 143; R261: hull 56,83,90, house 103,113,119]; present day: dark grey hull,
        mid-grey houses, red-brown decks [BSF hull 41,45,48, house 73,80,84; MOR house 118,129,139; R71
        deck edge 208,174,159 sunlit].  Taken to 0.7-0.9 for the ACES pass.
   NOT CONFIRMED and therefore drawn only as marked: the exact launcher elevation (8 deg Termit from
   [R71], 9 deg Moskit from [M1], both approximate); ru.wikipedia says the launcher axes are "at an angle
   to the centre plane", but [TY]'s plan draws them parallel and no figure is published - drawn parallel;
   the Moskit house's step positions (no beam photograph: footprint taken from [TY]); the forward rafts of
   the Moskit boat (not seen); PK-16 decoy launchers (not located in any photograph: not drawn); any
   Kh-35 Uran refit (not drawn); radar type names beyond those ru.wikipedia gives.  No hull numbers,
   names, flags or ensigns.  Waterline z = 0.
   MODEL SPACE: +X bow, +Y port, +Z up, metres.  Everything baked, one mesh per material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTarantul = (function () {
  "use strict";
  var TAU = Math.PI * 2, PI = Math.PI, L = 56.1, X1 = 28.05;
  function X(d) { return X1 - d; }            /* x at d metres abaft the stem head */

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

  /* a bin per material; box-mapped metre UVs (textures repeat every 16 m) */
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
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
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
  /* loft through rings of equal point count, flat-capped */
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
  /* sphere cap / dome with smooth normals, from latitude lo up to the pole */
  function dome(bin, cx, cy, cz, r, rings, seg, lo) {
    var i, k, a0 = lo === undefined ? -PI * 0.45 : lo, R = [];
    for (i = 0; i <= rings; i++) {
      var a = a0 + (PI / 2 - a0) * i / rings, rr = Math.cos(a) * r, z = cz + Math.sin(a) * r, ring2 = [];
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
  /* box in an oriented frame: origin P, axes u (along), v (across), w (up-ish) */
  function obox(bin, P, u, v, w, a0, a1, b0, b1, c0, c1) {
    var V = [], A = [a0, a1], Bq = [b0, b1], Cq = [c0, c1], i, j, o = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
    for (i = 0; i < 8; i++) {
      j = o[i];
      V.push([P[0] + u[0] * A[j[0]] + v[0] * Bq[j[1]] + w[0] * Cq[j[2]],
              P[1] + u[1] * A[j[0]] + v[1] * Bq[j[1]] + w[1] * Cq[j[2]],
              P[2] + u[2] * A[j[0]] + v[2] * Bq[j[1]] + w[2] * Cq[j[2]]]);
    }
    hexa(bin, V);
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
      var me = new THREE.Mesh(geo, b.mat); me.castShadow = true; me.receiveShadow = true;
      group.add(me);
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
  /* plating, 16 m square: strakes every 1.2 m (a small hull), butts every 3 m staggered, weathering, rust runs */
  function drawPlate(g, S) {
    var R = rng(1241), i, k, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.02 + R() * 0.035; g.fillStyle = R() < 0.55 ? "#8a949a" : "#ffffff";
      g.fillRect(R() * S, R() * S, (1 + R() * 4) * m, (0.4 + R() * 1.2) * m);
    }
    g.globalAlpha = 1;
    for (k = 0; k < 14; k++) {
      var y = Math.round(k * 1.2 * m);
      g.fillStyle = "rgba(70,80,86,0.30)"; g.fillRect(0, y, S, 1.5);
      g.fillStyle = "rgba(255,255,255,0.32)"; g.fillRect(0, y + 1.5, S, 1);
      for (i = 0; i < 6; i++) { var x = Math.round(((i * 3 + (k % 2) * 1.5) % 16) * m); g.fillStyle = "rgba(70,80,86,0.22)"; g.fillRect(x, y, 1.5, 1.2 * m); }
    }
    for (i = 0; i < 30; i++) {
      g.globalAlpha = 0.05 + R() * 0.06; g.fillStyle = "#5b5650";
      g.fillRect(R() * S, R() * S, 0.1 * m, (0.5 + R() * 1.4) * m);
    }
    g.globalAlpha = 1;
  }
  /* deck: non-skid panels 2 x 3 m with seams */
  function drawDeck(g, S) {
    var R = rng(12411), i, j, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 6; i++) for (j = 0; j < 8; j++) {
      g.fillStyle = "rgba(0,0,0," + (0.02 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(i * 3 * m + 2, j * 2 * m + 2, 3 * m - 4, 2 * m - 4);
    }
    g.fillStyle = "rgba(40,44,48,0.35)";
    for (i = 0; i <= 6; i++) g.fillRect(i * 3 * m - 1, 0, 2, S);
    for (j = 0; j <= 8; j++) g.fillRect(0, j * 2 * m - 1, S, 2);
  }

  /* paint by period (see header item 11) */
  var PAINT = {
    termit: { hull: 0x5d6c73, sup: 0x7f898e, light: 0x8e989d, deck: 0x50565a },
    moskit: { hull: 0x40484e, sup: 0x5f686e, light: 0x737d83, deck: 0x5b3d34 }
  };
  function materials(THREE, C, v) {
    var plate = canvasTex(THREE, "plate", drawPlate), deckT = canvasTex(THREE, "deck", drawDeck), P = PAINT[v];
    function mk(c, r, m, map) {
      var o = { color: c, roughness: r, metalness: m };
      if (map) o.map = map;
      return new THREE.MeshStandardMaterial(o);
    }
    return {
      hull: mk(P.hull, 0.82, 0.08, plate),
      sup: mk(P.sup, 0.82, 0.08, plate),
      boot: mk(0x4a2622, 0.86, 0.04),
      deck: mk(P.deck, 0.95, 0.04, deckT),
      light: mk(P.light, 0.6, 0.06),
      dark: mk(0x252a2e, 0.75, 0.3),
      metal: mk(0x4b5257, 0.5, 0.55),
      glass: mk(0x141c22, 0.15, 0.4),
      team: mk((C && C.team !== undefined) ? C.team : 0x3f7fd0, 0.84, 0.06)
    };
  }

  /* ------------------------------------------------------------ the hull: station table, d from the stem head
     ZD deck-edge z; HD deck half-breadth ([TY] plan: 4.55 at the transom, 5.1 from d 30 to 40, 4.25 at d 16.4,
     2.46 at d 7.4, 1.34 at d 3); FL flare (deck edge outboard of the knuckle 1 m below); HW waterline half-
     breadth; KL keel z ([TY] draught 2.7 incl. keel bar, published 2.5 hull); stem rake 4.1 m over 3.4 m */
  var ZD = [[0, 4.1], [3, 3.85], [6, 3.66], [10, 3.5], [16, 3.37], [24, 3.27], [36, 3.2], [48, 3.14], [56.1, 3.1]];
  var HD = [[0, 0.1], [1.5, 0.75], [3, 1.34], [7.4, 2.46], [12, 3.5], [16.4, 4.22], [21, 4.7], [25, 4.92], [30, 5.0],
            [40, 5.0], [48, 4.88], [53, 4.7], [56.1, 4.52]];
  var FL = [[0, 0.03], [3, 0.3], [8, 0.42], [14, 0.32], [20, 0.18], [28, 0.08], [56.1, 0.05]];
  var HW = [[3.4, 0.05], [5, 0.62], [8, 1.45], [12, 2.35], [16, 3.1], [21, 3.75], [27, 4.2], [34, 4.42], [46, 4.42], [52, 4.3], [56.1, 4.15]];
  var KL = [[3.4, 0], [5, -0.65], [7, -1.2], [10, -1.75], [15, -2.2], [22, -2.45], [38, -2.5], [48, -2.25], [53, -1.75], [56.1, -1.3]];
  var STEM_TOP = 4.1, STEM_FOOT = 3.4;
  function zD(d) { return tbl(ZD, d); }
  function hD(d) { return tbl(HD, d); }
  function zLow(d) {
    if (d < STEM_FOOT) return STEM_TOP * (1 - d / STEM_FOOT) * (1 - 0.1 * Math.sin(PI * d / STEM_FOOT));
    return tbl(KL, d);
  }
  function ring(d) {
    var x = X(d), zd = zD(d), hd = hD(d), zk = zd - 1.0, hk = Math.max(0.05, hd - tbl(FL, d));
    var hw = d < STEM_FOOT ? 0.04 : tbl(HW, d), kl = zLow(d), lo = kl, P = [];
    function pt(y, z) {
      if (z < lo) { z = lo; y = Math.min(Math.abs(y), 0.05) * (y < 0 ? -1 : 1); }
      return [x, y, z];
    }
    var hb = hw + (hk - hw) * clamp01(0.3 / Math.max(zk, 0.3));
    var camber = 0.1 * clamp01(hd / 3);
    P.push([x, 0, zd + camber]);
    P.push(pt(hd, zd), pt(hk, zk), pt(hb, 0.3), pt(hw * 0.985, -0.25), pt(hw * 0.86, kl * 0.55), pt(hw * 0.3, kl));
    P.push(pt(-hw * 0.3, kl), pt(-hw * 0.86, kl * 0.55), pt(-hw * 0.985, -0.25), pt(-hb, 0.3), pt(-hk, zk), pt(-hd, zd));
    return P;
  }
  function addHull(B) {
    var ds = [0, 0.3, 0.7, 1.2, 1.8, 2.5, 3.0, STEM_FOOT, 3.9, 4.5, 5.5, 7, 8.6, 10.5, 12.8, 15.5, 18.5, 22, 26, 30, 35, 40,
              44, 48, 51, 53, 54.6, 55.6, L], i, k, n = 13;
    var R = ds.map(ring);
    var TAG = ["deck", "hi", "lo", "boot", "bot", "bot", "bot", "bot", "bot", "boot", "lo", "hi", "deck"];
    function binFor(t) { return t === "deck" ? B.deck : (t === "boot" || t === "bot") ? B.boot : B.hull; }
    for (i = 0; i + 1 < R.length; i++) {
      var A = R[i], Bq = R[i + 1];
      for (k = 0; k < n; k++) {
        var j = (k + 1) % n, bin = binFor(TAG[k]);
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
    /* rubbing strake 0.35 m under the deck edge, d 2.5 - 55.8 (the dark sheer band of [KK]) */
    var s, d;
    for (s = -1; s <= 1; s += 2) {
      var rr = [];
      for (d = 2.5; d < 55.85; d += 1.9) {
        var dd = Math.min(d, 55.8), y0 = hD(dd) - tbl(FL, dd) * 0.35, z0 = zD(dd) - 0.35;
        rr.push([[X(dd), s * (y0 - 0.02), z0 - 0.08], [X(dd), s * (y0 + 0.11), z0 - 0.06], [X(dd), s * (y0 + 0.11), z0 + 0.06], [X(dd), s * (y0 - 0.02), z0 + 0.08]]);
      }
      loft(B.hull, rr);
    }
  }

  /* a house tier with raked ends and tumble: feet dF (fore) .. dB (aft), roof dFt .. dBt */
  function tier(bin, dF, dFt, dBt, dB, z0, z1, w0, w1) {
    hexa(bin, [[X(dB), -w0, z0], [X(dF), -w0, z0], [X(dF), w0, z0], [X(dB), w0, z0],
               [X(dBt), -w1, z1], [X(dFt), -w1, z1], [X(dFt), w1, z1], [X(dBt), w1, z1]]);
  }
  function rails(B, da, db, zf, inset, h) {
    var s, d, hh = h || 1.0;
    for (s = -1; s <= 1; s += 2) {
      for (d = da; d < db - 0.01; d += 1.2) {
        var dn = Math.min(d + 1.2, db), y0 = s * (hD(d) - (inset || 0.12)), y1 = s * (hD(dn) - (inset || 0.12));
        if (Math.abs(y0) < 0.25) continue;
        var z0 = zf ? zf(d) : zD(d), z1 = zf ? zf(dn) : zD(dn);
        cyl(B.metal, [X(d), y0, z0 + hh], [X(dn), y1, z1 + hh], 0.022, 0.022, 4);
        cyl(B.metal, [X(d), y0, z0 + hh * 0.5], [X(dn), y1, z1 + hh * 0.5], 0.014, 0.014, 3);
        box(B.metal, X(d) - 0.022, X(d) + 0.022, y0 - 0.022, y0 + 0.022, z0, z0 + hh);
      }
    }
  }
  function roofRail(B, d0, d1, w, z, ends) {
    var s, d;
    for (s = -1; s <= 1; s += 2) {
      cyl(B.metal, [X(d0), s * w, z + 0.95], [X(d1), s * w, z + 0.95], 0.02, 0.02, 4);
      for (d = d0; d <= d1 + 0.01; d += 1.3) box(B.metal, X(d) - 0.02, X(d) + 0.02, s * w - 0.02, s * w + 0.02, z, z + 0.95);
    }
    if (ends) cyl(B.metal, [X(d1), -w, z + 0.95], [X(d1), w, z + 0.95], 0.02, 0.02, 4);
  }
  /* four-legged lattice, square, half-size aL at z0 closing to aT at z1, X-braced bays */
  function lattice(B, xc, aL, aT, z0, z1, nb, r) {
    var lg, bay, s;
    for (lg = 0; lg < 4; lg++) {
      var sx = lg < 2 ? -1 : 1, sy = (lg % 2) ? -1 : 1;
      cyl(B.metal, [xc + sx * aL, sy * aL, z0], [xc + sx * aT, sy * aT, z1], r, r * 0.8, 5);
    }
    for (bay = 0; bay < nb; bay++) {
      var f0 = bay / nb, f1 = (bay + 1) / nb, a0 = lerp(aL, aT, f0), a1 = lerp(aL, aT, f1), zz0 = lerp(z0, z1, f0), zz1 = lerp(z0, z1, f1);
      for (s = -1; s <= 1; s += 2) {
        cyl(B.metal, [xc - a0, s * a0, zz0], [xc + a1, s * a1, zz1], r * 0.5, r * 0.5, 3);
        cyl(B.metal, [xc + s * a0, -a0, zz0], [xc + s * a1, a1, zz1], r * 0.5, r * 0.5, 3);
        cyl(B.metal, [xc - a1, s * a1, zz1], [xc + a1, s * a1, zz1], r * 0.5, r * 0.5, 3);
      }
    }
  }

  /* ------------------------------------------------------------ weapons */
  /* AK-176 [KK][ZAR]: low ring, faceted shield with a sloped front and roof, sight cupola, L/59 barrel, stowed fore */
  function ak176(B, d) {
    var x = X(d), z = zD(d), s;
    cylZ(B.sup, x, 0, z - 0.05, z + 0.45, 1.45, 24);
    cylZ(B.dark, x, 0, z + 0.45, z + 0.49, 1.3, 24);
    function sec(xx, w0, w1, zt) { return [[x + xx, -w0, z + 0.49], [x + xx, w0, z + 0.49], [x + xx, w1, z + zt], [x + xx, -w1, z + zt]]; }
    loft(B.sup, [sec(-1.8, 1.05, 0.9, 2.0), sec(-1.5, 1.3, 1.15, 2.5), sec(0.35, 1.3, 1.12, 2.5), sec(1.4, 1.2, 0.95, 1.5), sec(1.6, 1.05, 0.8, 0.95)]);
    box(B.dark, x + 1.1, x + 1.48, -0.3, 0.3, z + 1.15, z + 1.95);
    cylX(B.sup, x + 1.35, x + 2.15, 0, z + 1.55, 0.2, 0.17, 12);
    cylX(B.metal, x + 2.1, x + 5.8, 0, z + 1.55, 0.085, 0.075, 10);
    box(B.sup, x - 1.0, x - 0.35, 0.45, 0.95, z + 2.5, z + 2.82);           /* sight cupola */
    box(B.glass, x - 0.37, x - 0.33, 0.52, 0.88, z + 2.58, z + 2.76);
    for (s = -1; s <= 1; s += 2) box(B.dark, x - 1.2, x - 0.5, s * 1.27 - 0.02, s * 1.27 + 0.02, z + 0.65, z + 1.9);
    box(B.dark, x - 1.0, x - 0.3, -0.75, -0.25, z + 2.5, z + 2.54);
  }
  /* AK-630M [KK][ZAR]: pedestal, boxy mount with a rounded face, six barrels in a jacket, trained aft, raised */
  function ak630(B, d, y, z) {
    var x = X(d), i, s = y > 0 ? 1 : -1;
    cylZ(B.sup, x, y, z - 0.02, z + 0.45, 0.62, 16);
    cylZ(B.dark, x, y, z + 0.45, z + 0.49, 0.66, 16);
    hexa(B.sup, [[x + 0.75, y - 0.62, z + 0.49], [x - 0.85, y - 0.62, z + 0.49], [x - 0.85, y + 0.62, z + 0.49], [x + 0.75, y + 0.62, z + 0.49],
                 [x + 0.6, y - 0.5, z + 1.45], [x - 0.5, y - 0.5, z + 1.45], [x - 0.5, y + 0.5, z + 1.45], [x + 0.6, y + 0.5, z + 1.45]]);
    cyl(B.sup, [x - 0.55, y, z + 1.0], [x - 0.95, y, z + 1.05], 0.36, 0.33, 14);
    var el = 0.14, ce = Math.cos(el), se = Math.sin(el), bz = z + 1.05;
    cyl(B.metal, [x - 0.95, y, bz], [x - 1.4, y, bz + 0.06], 0.17, 0.15, 10);
    for (i = 0; i < 6; i++) {
      var an = i / 6 * TAU, by = Math.cos(an) * 0.075, bh = Math.sin(an) * 0.075;
      cyl(B.metal, [x - 1.35, y + by, bz + bh], [x - 1.35 - 1.55 * ce, y + by, bz + bh + 1.55 * se], 0.022, 0.022, 4);
    }
    cyl(B.metal, [x - 2.6, y, bz + 0.17], [x - 2.95, y, bz + 0.21], 0.1, 0.1, 8);
    box(B.dark, x + 0.3, x + 0.62, y - s * 0.3 - 0.15, y - s * 0.3 + 0.15, z + 1.45, z + 1.5);
  }
  /* Strela-3 / Igla quadruple pedestal on the quarterdeck [ru.wiki][KK] */
  function manpads(B, d) {
    var x = X(d), z = zD(d), i, j;
    cylZ(B.sup, x, 0, z, z + 0.25, 0.42, 12);
    cylZ(B.sup, x, 0, z + 0.25, z + 1.15, 0.16, 8);
    box(B.sup, x - 0.35, x + 0.3, -0.32, 0.32, z + 1.1, z + 1.45);
    var el = 0.3, ce = Math.cos(el), se = Math.sin(el);
    for (i = -1; i <= 1; i += 2) for (j = 0; j < 2; j++) {
      var yy = i * 0.42, zz = z + 1.3 + j * 0.2;
      cyl(B.light, [x - 0.75 * ce, yy, zz - 0.75 * se], [x + 0.85 * ce, yy, zz + 0.85 * se], 0.055, 0.055, 6);
    }
    cylY(B.metal, x, -0.5, 0.5, z + 1.35, 0.05, 6);
  }
  /* Termit KT-138 pair [KK][R71]: one container of two stacked lobes, flat sides, rounded ends, on trestles */
  function termitPair(B, s) {
    var el = 6 * PI / 180, u = [Math.cos(el), 0, Math.sin(el)], w = [-Math.sin(el), 0, Math.cos(el)];
    var d0 = 37.0, len = 7.6, yc = s * 4.15, z0 = 4.45, P0 = [X(d0), yc, z0], i, k;
    function at(a, b, c) { return [P0[0] + u[0] * a + w[0] * c, P0[1] + b, P0[2] + u[2] * a + w[2] * c]; }
    var hw = 0.78, hh = 0.9, top = 1.8, sec = [];
    function sp(t, e) { var c = Math.cos(t), sn = Math.sin(t); return [(c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e), (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), e)]; }
    for (k = 0; k <= 6; k++) { var p = sp(PI + k * PI / 6, 0.55); sec.push([p[0] * hw, p[1] * hh]); }
    sec.push([hw - 0.06, hh]);
    for (k = 0; k <= 6; k++) { var q = sp(k * PI / 6, 0.55); sec.push([q[0] * hw, top + q[1] * hh]); }
    sec.push([-hw + 0.06, hh]);
    function ringAt(a, sc) {
      return sec.map(function (pq) { return at(a, pq[0] * sc, hh + (pq[1] - hh) * sc); });
    }
    loft(B.sup, [ringAt(0, 0.86), ringAt(0.15, 0.97), ringAt(0.3, 1.0), ringAt(len - 0.3, 1.0), ringAt(len - 0.12, 0.95), ringAt(len, 0.8)]);
    /* ribs */
    for (i = 0; i < 4; i++) {
      var a = 1.2 + i * 1.75;
      loft(B.sup, [ringAt(a, 1.035), ringAt(a + 0.14, 1.035)]);
    }
    /* aft-end lobe covers */
    for (k = 0; k < 2; k++) cyl(B.dark, at(-0.03, 0, k * top), at(0.02, 0, k * top), 0.55, 0.55, 14);
    /* trestles: A-frames under the lower lobe */
    var zd = zD(d0 - 3);
    for (i = 0; i < 3; i++) {
      var aa = [1.0, 3.9, 6.4][i], foot = at(aa, 0, -hh), ft;
      for (k = -1; k <= 1; k += 2) {
        ft = [foot[0], foot[1] + k * 0.75, zd];
        cyl(B.sup, ft, [foot[0], foot[1] + k * 0.35, foot[2] + 0.12], 0.07, 0.07, 5);
      }
      box(B.sup, foot[0] - 0.2, foot[0] + 0.2, foot[1] - 0.85, foot[1] + 0.85, zd, zd + 0.12);
      cyl(B.sup, [foot[0], foot[1], zd], [foot[0], foot[1], foot[2] + 0.12], 0.06, 0.06, 5);
    }
  }
  /* Moskit KT-152 pair [ZAR][M1][MOR]: two big round tubes one above the other, domed fore caps, bands, saddles */
  function moskitPair(B, s) {
    var el = 7 * PI / 180, u = [Math.cos(el), 0, Math.sin(el)], w = [-Math.sin(el), 0, Math.cos(el)], v = [0, 1, 0];
    var d0 = 39.2, len = 10.0, r = 0.88, gap = 1.8, yc = s * 4.1, z0 = 4.2, P0 = [X(d0), yc, z0], i, k;
    function at(a, c) { return [P0[0] + u[0] * a + w[0] * c, P0[1], P0[2] + u[2] * a + w[2] * c]; }
    for (k = 0; k < 2; k++) {
      var c = k * gap;
      cyl(B.sup, at(0, c), at(len - 0.35, c), r, r, 20);
      cyl(B.sup, at(len - 0.35, c), at(len, c), r, r * 0.72, 20);
      cyl(B.dark, at(len - 0.02, c), at(len + 0.03, c), r * 0.6, r * 0.6, 16);
      cyl(B.dark, at(-0.06, c), at(0.02, c), r * 1.04, r * 1.04, 20);
      for (i = 0; i < 3; i++) { var a = 0.9 + i * 3.6; cyl(B.sup, at(a, c), at(a + 0.18, c), r * 1.05, r * 1.05, 20); }
    }
    for (i = 0; i < 3; i++) {
      var aa = [1.2, 4.9, 8.4][i];
      obox(B.sup, P0, u, v, w, aa - 0.14, aa + 0.14, -r - 0.08, r + 0.08, -r - 0.12, gap + r + 0.08);
      var foot = at(aa, -r - 0.12), zd = zD(d0 - aa);
      for (k = -1; k <= 1; k += 2) cyl(B.sup, [foot[0], foot[1] + k * 0.8, zd], [foot[0], foot[1] + k * 0.45, foot[2]], 0.08, 0.08, 5);
      box(B.sup, foot[0] - 0.22, foot[0] + 0.22, foot[1] - 0.9, foot[1] + 0.9, zd, zd + 0.12);
    }
  }

  /* ------------------------------------------------------------ the ship */
  function build(THREE, M, C, v) {
    var T = materials(THREE, C, v), g = new THREE.Group(), late = v === "moskit";
    var B = {}, k;
    ["hull", "sup", "boot", "deck", "light", "dark", "metal", "glass", "team"].forEach(function (n) { B[n] = new Bin(T[n]); });
    var s, i, j, d, x, z;
    addHull(B);

    /* --- houses, [TY] plan + [KK] heights: roof 7.6 (main), 5.4 (after house) --- */
    var RM = 7.6, RA = 5.4, W = 3.3, WN = 2.85;
    if (late) {
      /* 12411-M: the bridge front flush to the roof [R261][MOR][ZAR] */
      tier(B.sup, 21.0, 21.2, 29.6, 29.6, zD(25) - 0.1, RM, W, W - 0.12);
    } else {
      /* 12411-T: a lower forward step to 5.35 m, the bridge block from d 23.4 [KK] */
      tier(B.sup, 20.9, 21.05, 22.6, 22.6, zD(22) - 0.1, 5.35, W, W - 0.08);
      tier(B.sup, 22.4, 22.75, 29.6, 29.6, zD(26) - 0.1, RM, W, W - 0.12);
    }
    var dN = late ? 39.5 : 37.2;                                                  /* narrow beside the launchers */
    tier(B.sup, 29.6, 29.6, dN, dN, zD(33) - 0.1, RM, WN, WN - 0.08);
    tier(B.sup, dN, dN, 42.5, 42.5, zD(40) - 0.1, RM, W, W - 0.12);
    tier(B.sup, 42.4, 42.4, 47.7, 48.0, zD(45) - 0.1, RA, 3.85, 3.7);         /* after house, first tier */

    /* bridge windows: a row across the front, two a side [KK][MOR][ZAR] */
    var dFr = late ? 21.2 : 22.75, nW = late ? 8 : 7;
    for (j = 0; j < nW; j++) {
      var ya = -2.75 + j * 5.5 / nW, yb = ya + 5.5 / nW - 0.14;
      box(B.glass, X(dFr) - 0.02, X(dFr) + 0.04, ya, yb, 6.75, 7.2);
    }
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 2; j++) box(B.glass, X(dFr + 1.0 + j * 1.2) - 0.45, X(dFr + 1.0 + j * 1.2) + 0.1, s * (W - 0.1) - 0.03, s * (W - 0.1) + 0.03, 6.75, 7.2);
      box(B.dark, X(26.6), X(25.7), s * (W - 0.03) - 0.03, s * (W - 0.03) + 0.03, zD(26) + 0.1, zD(26) + 2.0);   /* doors */
      box(B.dark, X(41.0), X(40.1), s * (W - 0.03) - 0.03, s * (W - 0.03) + 0.03, zD(40) + 0.1, zD(40) + 2.0);
      box(B.dark, X(45.9), X(45.0), s * 3.8 - 0.03, s * 3.8 + 0.03, zD(45) + 0.1, zD(45) + 1.95);
      for (j = 0; j < 3; j++) cylY(B.dark, X(31.0 + j * 2.4), s * (WN - 0.05), s * (WN + 0.03), 6.4, 0.2, 10);  /* scuttles */
      /* vertical ladder to the bridge roof abaft the bridge, outboard */
      for (j = 0; j < 7; j++) box(B.metal, X(29.2), X(28.8), s * (W + 0.06) - 0.02, s * (W + 0.06) + 0.02, zD(29) + 0.6 + j * 0.6, zD(29) + 0.64 + j * 0.6);
    }
    if (!late) {
      for (j = 0; j < 6; j++) box(B.glass, X(21.05) - 0.02, X(21.05) + 0.04, -2.6 + j * 0.9, -2.0 + j * 0.9, 4.65, 4.95);
      /* two raft canisters on the step roof "forward of the wheelhouse" [ru.wiki] */
      for (s = -1; s <= 1; s += 2) {
        cylY(B.light, X(21.8), s * 0.6, s * 2.0, 5.75, 0.33, 12);
        box(B.metal, X(21.8) - 0.3, X(21.8) + 0.3, s * 0.65, s * 1.95, 5.35, 5.45);
      }
      roofRail(B, 21.15, 22.5, W - 0.15, 5.35, true);
    }
    roofRail(B, late ? 21.4 : 22.9, 29.4, W - 0.2, RM, true);

    /* the Monolit dome on the bridge roof: 3.35 m across in [KK], half the container length in [R71] - drawn
       3.6 m, top 11.1 m */
    var dDome = late ? 24.6 : 26.7, xd = X(dDome);
    cylZ(B.sup, xd, 0, RM - 0.02, RM + 0.25, 1.92, 28);
    cylZ(B.light, xd, 0, RM + 0.25, RM + 1.7, 1.8, 28);
    dome(B.light, xd, 0, RM + 1.7, 1.8, 9, 28, 0);
    cylZ(B.dark, xd, 0, RM + 1.0, RM + 1.06, 1.82, 28);

    /* tower block at the mast foot with the Bass Tilt drum on its fore edge [KK][ZAR] */
    var zT = late ? 11.2 : 10.7;
    tier(B.sup, 29.8, 30.0, 32.6, 32.8, RM - 0.02, zT, 1.35, 1.15);
    box(B.dark, X(30.1), X(29.95), -0.9, 0.9, RM + 1.0, RM + 1.6);
    var xb = X(30.4);
    cylZ(B.sup, xb, 0, zT, zT + 0.45, 0.32, 10);
    cylZ(B.sup, xb, 0, zT + 0.45, zT + 1.1, 0.78, 20);
    dome(B.sup, xb, 0, zT + 1.1, 0.78, 6, 20, 0);
    box(B.dark, xb + 0.7, xb + 0.8, -0.45, 0.45, zT + 0.55, zT + 1.05);
    roofRail(B, 30.2, 32.6, 1.1, zT, false);

    if (late) {
      /* 12411-M mast [ZAR][M1][MOR]: straight four-legged lattice from the block top, platform at 15.8 with two
         boxes and a sphere (16.8), wide top yard with lamps (18.6), topmast to 21; small domes at the block sides */
      var xm = X(31.8), zP = 15.8;
      lattice(B, xm, 0.55, 0.22, zT, 18.8, 6, 0.05);
      box(B.deck, xm - 0.9, xm + 0.9, -1.9, 1.9, zP - 0.12, zP);
      for (s = -1; s <= 1; s += 2) {
        box(B.sup, xm - 0.45, xm + 0.45, s * 1.75 - 0.4, s * 1.75 + 0.4, zP, zP + 0.98);
        box(B.dark, xm + 0.45, xm + 0.47, s * 1.75 - 0.3, s * 1.75 + 0.3, zP + 0.13, zP + 0.83);
        cyl(B.metal, [xm - 0.9, s * 1.9, zP + 0.93], [xm + 0.9, s * 1.9, zP + 0.93], 0.02, 0.02, 4);
        cylZ(B.sup, X(31.2), s * 1.8, RM - 0.02, RM + 0.9, 0.18, 8);                       /* "Wine Glass" pair at the mast foot [en.wiki][ZAR] */
        dome(B.light, X(31.2), s * 1.8, RM + 1.15, 0.42, 5, 14, -0.6);
        box(B.metal, xm - 0.05, xm + 0.05, s * 0.3, s * 2.4, 13.6, 13.68);                 /* lamp arms */
        box(B.dark, xm - 0.25, xm + 0.25, s * 2.4 - 0.3, s * 2.4 + 0.3, 13.2, 13.75);
      }
      cylZ(B.metal, xm, 0, zP, zP + 0.55, 0.12, 8);
      dome(B.light, xm, 0, zP + 1.0, 0.5, 6, 16, -PI * 0.45);
      box(B.metal, xm - 0.05, xm + 0.05, -3.3, 3.3, 18.55, 18.65);
      for (s = -1; s <= 1; s += 2) {
        cylZ(B.light, xm, s * 3.2, 18.65, 18.95, 0.1, 8);
        cyl(B.metal, [xm, s * 3.2, 18.6], [xm, 0, 17.0], 0.015, 0.015, 3);
      }
      cyl(B.metal, [xm, 0, 18.8], [xm, 0, 21.0], 0.06, 0.03, 6);
      box(B.metal, xm - 0.04, xm + 0.04, -0.8, 0.8, 20.1, 20.16);
    } else {
      /* 12411-T mast [KK]: plated tapered column from the main roof abaft the block to a platform at 14.2 m,
         a pole with the sphere (top 16.6 m), a small lattice antenna post forward of it, a gaff aft */
      var xc = X(33.3);
      loft(B.sup, [[[xc - 0.75, -0.7, RM - 0.02], [xc + 0.75, -0.7, RM - 0.02], [xc + 0.75, 0.7, RM - 0.02], [xc - 0.75, 0.7, RM - 0.02]],
                   [[xc - 0.32, -0.3, 14.15], [xc + 0.32, -0.3, 14.15], [xc + 0.32, 0.3, 14.15], [xc - 0.32, 0.3, 14.15]]]);
      box(B.deck, xc - 1.2, xc + 1.5, -1.0, 1.0, 14.15, 14.27);
      roofRail(B, 33.3 - 1.5, 33.3 + 1.2, 0.95, 14.27, true);
      cylZ(B.metal, xc, 0, 14.27, 15.45, 0.1, 8);
      dome(B.light, xc, 0, 16.0, 0.58, 7, 18, -PI * 0.45);
      lattice(B, xc + 0.9, 0.18, 0.08, 14.27, 17.4, 3, 0.03);
      box(B.metal, xc + 0.85, xc + 0.95, -0.9, 0.9, 16.9, 16.96);
      cyl(B.metal, [xc + 0.9, 0, 17.4], [xc + 0.9, 0, 18.0], 0.03, 0.02, 4);
      cyl(B.metal, [xc - 0.2, 0, 14.8], [xc - 2.6, 0, 14.9], 0.04, 0.03, 5);                  /* gaff */
      box(B.metal, xc - 0.05, xc + 0.05, -1.4, 1.4, 14.95, 15.02);                             /* yard */
      for (s = -1; s <= 1; s += 2) cylZ(B.metal, xc, s * 1.3, 14.6, 15.0, 0.03, 4);
    }

    /* the launchers on the beam, one above the other, angled forward-up */
    for (s = -1; s <= 1; s += 2) { if (late) moskitPair(B, s); else termitPair(B, s); }

    /* intake block on the after main roof, sloped fore face, two round vents [KK][R71] */
    hexa(B.sup, [[X(39.6), -1.55, RM - 0.02], [X(36.6), -1.55, RM - 0.02], [X(36.6), 1.55, RM - 0.02], [X(39.6), 1.55, RM - 0.02],
                 [X(39.4), -1.45, RM + 1.2], [X(37.5), -1.45, RM + 1.2], [X(37.5), 1.45, RM + 1.2], [X(39.4), 1.45, RM + 1.2]]);
    for (s = -1; s <= 1; s += 2) cylZ(B.dark, X(38.45), s * 0.72, RM + 1.2, RM + 1.25, 0.58, 16);
    roofRail(B, 37.4, 42.3, W - 0.2, RM, false);

    /* after house roof: the two AK-630M side by side [KK][TY], rafts between them aft [ru.wiki][TY] */
    for (s = -1; s <= 1; s += 2) ak630(B, 45.0, s * 2.15, RA);
    for (j = -1; j <= 1; j++) {
      cylX(B.light, X(47.6), X(46.2), j * 0.72, RA + 0.38, 0.3, 0.3, 12);
      box(B.metal, X(47.4), X(46.4), j * 0.72 - 0.25, j * 0.72 + 0.25, RA, RA + 0.1);
    }
    roofRail(B, 42.6, 47.6, 3.6, RA, false);
    box(B.dark, X(47.9), X(47.75), -1.4, 1.4, zD(47) + 0.2, zD(47) + 1.6);

    /* whips: on the after main roof and the bridge front corners [KK][TY] */
    for (s = -1; s <= 1; s += 2) {
      cyl(B.metal, [X(39.7), s * 2.9, RM], [X(39.7), s * 2.9, 13.6], 0.045, 0.018, 4);
      cyl(B.metal, [X(late ? 21.7 : 22.6), s * 2.9, late ? RM : 5.35], [X(late ? 21.7 : 22.6), s * 2.9, 12.2], 0.045, 0.018, 4);
    }

    /* forecastle: windlass, hawses, bollards, V breakwater [TY plan], jack staff (no jack) */
    var dw = 6.2, zw = zD(dw);
    cylZ(B.sup, X(dw), 0, zw - 0.02, zw + 0.4, 0.4, 14);
    cylZ(B.dark, X(dw), 0, zw + 0.4, zw + 0.44, 0.34, 14);
    for (s = -1; s <= 1; s += 2) {
      cylY(B.dark, X(dw - 0.6), s * 0.45, s * 0.9, zw + 0.25, 0.2, 10);
      d = 4.4; cylZ(B.dark, X(d), s * (hD(d) - 0.4), zD(d) - 0.05, zD(d) + 0.05, 0.2, 10);
      box(B.dark, X(d) - 0.4, X(d) + 0.4, s * (hD(d) - 0.05) - 0.2, s * (hD(d) - 0.05) + 0.2, zD(d) - 0.95, zD(d) - 0.4);
      for (d = 9.0; d < 19; d += 8.5) {
        cylZ(B.metal, X(d), s * (hD(d) - 0.5), zD(d), zD(d) + 0.34, 0.1, 8);
        cylZ(B.metal, X(d + 0.45), s * (hD(d) - 0.5), zD(d), zD(d) + 0.34, 0.1, 8);
      }
      hexa(B.sup, [[X(10.0), 0, zD(10)], [X(10.3), 0, zD(10)], [X(11.9), s * 2.4, zD(10)], [X(11.6), s * 2.4, zD(10)],
                   [X(10.0), 0, zD(10) + 0.55], [X(10.3), 0, zD(10) + 0.55], [X(11.9), s * 2.4, zD(10) + 0.4], [X(11.6), s * 2.4, zD(10) + 0.4]]);
    }
    cyl(B.metal, [X(0.4), 0, zD(0.4) + 0.05], [X(0.4), 0, zD(0.4) + 2.4], 0.04, 0.02, 6);
    box(B.dark, X(19.0) - 0.4, X(19.0) + 0.4, 1.0, 1.8, zD(19), zD(19) + 0.08);
    box(B.dark, X(19.0) - 0.4, X(19.0) + 0.4, -1.8, -1.0, zD(19), zD(19) + 0.08);
    ak176(B, 13.6);

    /* quarterdeck: Strela/Igla pedestal, capstan, bollards, hatches, ensign staff (no ensign) */
    manpads(B, 51.6);
    cylZ(B.sup, X(54.2), 0, zD(54.2), zD(54.2) + 0.45, 0.36, 12);
    cylZ(B.dark, X(54.2), 0, zD(54.2) + 0.45, zD(54.2) + 0.49, 0.3, 12);
    for (s = -1; s <= 1; s += 2) {
      for (d = 49.5; d < 55; d += 4.3) {
        cylZ(B.metal, X(d), s * (hD(d) - 0.55), zD(d), zD(d) + 0.34, 0.1, 8);
        cylZ(B.metal, X(d + 0.45), s * (hD(d) - 0.55), zD(d), zD(d) + 0.34, 0.1, 8);
      }
      box(B.dark, X(50.0) - 0.45, X(50.0) + 0.45, s * 1.6 - 0.45, s * 1.6 + 0.45, zD(50), zD(50) + 0.1);
      /* exhaust casings at the transom corners with round covers aft and outboard [ZAR korma][TY] */
      var y0 = hD(54.8);
      box(B.hull, X(56.25), X(53.4), s * (y0 - 1.4), s * (y0 + 0.08), zD(55) - 1.25, zD(55) + 0.5);
      cylX(B.dark, X(56.3), X(56.22), s * (y0 - 0.66), zD(55) - 0.38, 0.55, 0.55, 16);
      cylY(B.dark, X(54.8), s * (y0 + 0.06), s * (y0 + 0.12), zD(55) - 0.38, 0.5, 16);
    }
    cyl(B.metal, [X(55.7), 0, zD(55.7)], [X(55.7), 0, zD(55.7) + 3.0], 0.05, 0.025, 6);

    rails(B, 1.0, 20.3);
    rails(B, 47.9, 55.8);
    for (s = -1; s <= 1; s += 2) for (d = 20.3; d < 42.4; d += 2.4) {
      var yy = s * (hD(d) - 0.12);
      if (d > 29 && d < 39.5) continue;                     /* the launchers stand at the deck edge here */
      box(B.metal, X(d) - 0.022, X(d) + 0.022, yy - 0.022, yy + 0.022, zD(d), zD(d) + 1.0);
      cyl(B.metal, [X(d), yy, zD(d) + 1.0], [X(Math.min(d + 2.4, 42.4)), s * (hD(Math.min(d + 2.4, 42.4)) - 0.12), zD(d) + 1.0], 0.02, 0.02, 4);
    }
    for (i = 0; i < 5; i++) box(B.metal, X(55.95) - 0.02, X(55.95) + 0.02, -3.6 + i * 1.8 - 0.02, -3.6 + i * 1.8 + 0.02, zD(56), zD(56) + 1.0);
    cyl(B.metal, [X(55.95), -3.6, zD(56) + 1.0], [X(55.95), 3.6, zD(56) + 1.0], 0.02, 0.02, 4);

    /* underwater: two shafts with A-brackets, props, rudders */
    for (s = -1; s <= 1; s += 2) {
      cylX(B.metal, X(56.0), X(44.0), s * 2.6, -1.9, 0.13, 0.13, 8);
      cyl(B.metal, [X(53.0), s * 2.6, -1.95], [X(53.0), s * 2.0, -1.0], 0.08, 0.08, 5);
      cyl(B.metal, [X(53.0), s * 2.6, -1.95], [X(53.0), s * 3.2, -1.1], 0.08, 0.08, 5);
      cylX(B.metal, X(55.0), X(54.4), s * 2.6, -1.9, 0.18, 0.25, 8);
      for (i = 0; i < 4; i++) {
        var an = i / 4 * TAU + 0.4, cy = Math.cos(an), cz = Math.sin(an);
        var tv = unit([0.55, -cz * 0.84, cy * 0.84]), tu = cross(tv, [0, cy, cz]);
        obox(B.metal, [X(54.7), s * 2.6, -1.9], tu, tv, [0, cy, cz], -0.03, 0.03, -0.2, 0.2, 0.16, 0.78);
      }
      box(B.metal, X(56.0), X(55.0), s * 2.6 - 0.07, s * 2.6 + 0.07, -2.0, -0.95);
    }

    /* team: small strips on the bridge roof, the after house roof and the quarterdeck */
    box(B.team, X(late ? 27.8 : 29.5), X(late ? 26.8 : 28.7), -0.7, 0.7, RM + 0.005, RM + 0.025);
    box(B.team, X(43.9), X(43.1), -0.7, 0.7, RA + 0.005, RA + 0.025);
    box(B.team, X(53.0), X(52.2), 1.4, 2.4, zD(52.6) + 0.12, zD(52.6) + 0.14);

    flush(THREE, g, B);
    return g;
  }
  return { build: build };
})();

UNIT_MODELS["pact_e80_missileboat"] = {
  len: 56.1,
  build: function (THREE, M, C) { return HeroTarantul.build(THREE, M, C, "termit"); }
};
UNIT_MODELS["missileboat_p"] = {
  len: 56.1,
  build: function (THREE, M, C) { return HeroTarantul.build(THREE, M, C, "moskit"); }
};
