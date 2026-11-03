/* ==================== js/hero/ru_osa_boat.js ===========================
   HERO MODEL -- Project 205 "Moskit" (NATO Osa I) missile boat.  Key (unchanged): pact_e60_missileboat
   (eras.js "Project 205 Osa", service 1961, e60 only; warship_specs len 38.6, beam 7.6).  Drawn as the
   Soviet OSA I (Project 205, the first series, four KT-97 box launchers for the P-15 Termit): the row names
   Project 205, not the Project 205U (Osa II, 1966, cylindrical launchers).
   The row is NOT turret:true: both AK-230s are baked and nothing is named "turret" (the first version named
   the forward AK-230 "turret"; render3d trains a "turret" only through tang, which a row without turret:true
   never turns, and the house convention is no "turret" unless the row has turret:true).
   FULL-QUALITY REDO 2026-10-24: hull lofted from a station table measured off the dimensioned three-view
   [DDR] (hard chine, raked stem, forefoot, sheer), the KT-97 launchers re-shaped to the photographs (rounded
   tops, rising toward the bow, the hipped front door on an open frame), the house, mast and Drum Tilt
   re-measured, canvas plate and deck paint, Soviet 1980s paint from the colour photograph.

   PUBLISHED FIGURES (kept from the first version, confirmed by [DDR]'s dimension lines): length 38.6 m, beam
   7.6 m.  Draught: [DDR] shows the keel 1.5 m down at the stern and 2.1 m down forward of midships (the
   published 1.7-1.8 m is a mean); drawn as [DDR].  Armament: 4 P-15 Termit (SS-N-2 Styx) in KT-97 hangar
   launchers, 2 twin 30 mm AK-230 fore and aft (the game's own rows, generations.js); radars Square Tie on the
   mast head and Drum Tilt for the guns (the brief and the published fit).  Three shafts ([DDR] front view).

   REFERENCES (Wikimedia Commons, width 960, cached in the scratchpad q_osaboat_ref):
     [DDR] "Raketenschnellboot - Projekt 205 (OSA 1 Klasse).jpg": rendered three-view with the 38.6 m and
           7.6 m dimension lines, 628 px = 38.6 m (16.27 px/m), waterline at y 305.5.  The master: every
           station, the deck plan, launcher, casing, house, mast and gun positions below are read off it,
           as d = metres forward of the transom (model x = d - 19.3).
     [USN] "428-GX-USN 1146012": US Navy recognition drawing "OSA I PTFG", plan and profile: the check
           drawing (launcher fronts, Drum Tilt on the centreline casing, the house, two gun mounts).
     [DN]  "Osa-I class Project205 DN-SN-84-01770.jpg" (US DoD 1984, Soviet boat at speed, starboard bow
           quarter): the KT-97 shape (flat sides, big rounded top edges, rising to the bow, hipped front door
           with two rails, an open frame under it), the house with three front windows and an open bridge,
           the tube mast with yards, IFF arrays and the lattice topmast, the Drum Tilt drum on a railed
           platform, the tall box on the casing, the hull darker than the launchers.
     [83]  "Project205-1983.jpg" (US DoD, the same boat bow-on): the AK-230 (fluted bell base, two rounded
           cheeks, a dark slot with two barrels), the launcher front doors, the house face, lifelines.
     [83C] "Project205-1983c.jpg" (colour, the same boat): the paint.
     [PL]  "Polski kuter rakiet proj.205.jpg" (Polish Osa I, port profile): the profile check.
     [BA]  "Bundesarchiv Bild 183-U1004-0014" (DDR Osa I at a 1960s/70s parade, bow quarter): the mast head
           box and the drum in the same places on the export boats.

   RECOGNITION LIST (each must read at game zoom; where it shows in the model):
     1. Low flush-decked hull, sheer rising from 1.72 m at the transom to 2.95 m at the stem head, a raked
        stem, a HARD CHINE about 0.9 m under water amidships that sweeps up to meet the stem at 1.05 m [DDR
        side and front]: station tables ZD/HD/CH/CZ/KZ, ring().
     2. FOUR BIG KT-97 BOX LAUNCHERS, two a side in tandem, filling the deck from the casing to the deck
        edge (aft pair d 3.6-11.1, forward pair d 14.0-21.5) [DDR][USN][DN]: kt97().
     3. Each box flat-sided with heavily rounded top edges, its roof rising 12 deg toward the bow, three
        longitudinal stiffeners on the outboard face [DDR][DN][PL]: kt97() sections and ribs.
     4. The hipped front door raked back over an open, dark frame with two posts, two hinge rails on it
        [DN][83][DDR]: kt97() hood, recess, rails.
     5. The Drum Tilt drum on a pedestal with a railed platform on the centreline between the aft pair
        (d 7.0, drum top 7.6 m) [DDR][DN][USN]: drumTilt().
     6. The narrow centreline casing between the launchers with the tall box at its after end [DDR][DN].
     7. The low house with rounded front corners, three front windows, the open bridge on its roof
        [DDR][DN][83]: house block.
     8. The tube mast abaft the bridge: lower yard, IFF arrays fore and aft, the SQUARE TIE box on the head
        platform, the lattice topmast and pole (top 12 m) [DDR][DN][BA]: mast block.
     9. Two twin AK-230: forward on the forecastle at d 29.6 trained ahead, aft at d 2.65 trained astern
        [DDR][83]: ak230().
    10. Paint: Soviet, [83C] 1983 colour: mid-grey hull and house darker than the light-grey launchers
        ([DN] B&W: hull 114, house 104, launcher sides 203); red-brown deck ([83C] 96,59,41).  Sampled
        [83C] hull 174,183,176 and launchers 208,211,202 sunlit; the launchers taken to 0.77 for the ACES pass and the hull
        held at the [DN] hull/launcher ratio (0.6 of its glare-lit sample):
        hull 0x687070, launchers 0xa0a4a0, deck 0x5a3a2c.
   NOT CONFIRMED and drawn only as marked: the underbody colour (never seen above water: dark red-brown as
   the set's other Soviet boats); the exact launcher elevation (12 deg off the roof line, the photographs and
   [DDR] agree to a degree or two); the bridge screen height; which IFF array is which; the tall box's purpose
   (drawn as photographed, no fitting named); rudder count (two drawn, behind the wing shafts).  No hull
   numbers, names, flags or ensigns.  Waterline z = 0.
   MODEL SPACE: +X bow, +Y port, +Z up, metres.  Everything baked, one mesh per material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroOsaBoat = (function () {
  "use strict";
  var TAU = Math.PI * 2, PI = Math.PI, L = 38.6, X0 = -19.3;
  function X(d) { return X0 + d; }            /* x at d metres forward of the transom */

  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
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
  /* loft through rings of equal point count, flat-capped */
  function loft(bin, rings, noCap) {
    var n = rings[0].length, V = [], F = [], k, r, a, b, c0, c1, Lr;
    for (r = 0; r < rings.length; r++) for (k = 0; k < n; k++) V.push(rings[r][k]);
    for (r = 0; r + 1 < rings.length; r++) for (k = 0; k < n; k++) {
      a = r * n + k; b = r * n + (k + 1) % n; c0 = a + n; c1 = b + n;
      F.push([a, b, c1], [a, c1, c0]);
    }
    if (!noCap) {
      for (k = 1; k + 1 < n; k++) F.push([0, k + 1, k]);
      Lr = (rings.length - 1) * n;
      for (k = 1; k + 1 < n; k++) F.push([Lr, Lr + k, Lr + k + 1]);
    }
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
  /* ellipsoid with smooth normals; lo..hi latitude (radians), centre C, radii rx ry rz */
  function ellipsoid(bin, C, rx, ry, rz, rings, seg, lo, hi) {
    var i, k, R = [], NR = [], a0 = lo === undefined ? -PI / 2 : lo, a1 = hi === undefined ? PI / 2 : hi;
    for (i = 0; i <= rings; i++) {
      var a = a0 + (a1 - a0) * i / rings, ca = Math.cos(a), sa = Math.sin(a), ring = [], nr = [];
      for (k = 0; k < seg; k++) {
        var t = k / seg * TAU, ct = Math.cos(t), st = Math.sin(t);
        ring.push([C[0] + rx * ca * ct, C[1] + ry * ca * st, C[2] + rz * sa]);
        nr.push(unit([ca * ct / rx, ca * st / ry, sa / rz]));
      }
      R.push(ring); NR.push(nr);
    }
    for (i = 0; i + 1 < R.length; i++) for (k = 0; k < seg; k++) {
      var j = (k + 1) % seg, A = R[i][k], B = R[i][j], C2 = R[i + 1][j], D2 = R[i + 1][k];
      var c1 = cross(sub(B, A), sub(C2, A));
      if (dot(c1, c1) > 1e-12) bin.tri(A, B, C2, NR[i][k], NR[i][j], NR[i + 1][j]);
      var c2 = cross(sub(C2, A), sub(D2, A));
      if (dot(c2, c2) > 1e-12) bin.tri(A, C2, D2, NR[i][k], NR[i + 1][j], NR[i + 1][k]);
    }
    if (a0 > -PI / 2 + 1e-3) {                      /* flat bottom cap */
      var zb = R[0][0][2], cb = [C[0], C[1], zb];
      for (k = 0; k < seg; k++) bin.tri(cb, R[0][(k + 1) % seg], R[0][k], [0, 0, -1], [0, 0, -1], [0, 0, -1]);
    }
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
  /* plating, 16 m square: strakes every 1 m (a 38 m boat), butts every 2.5 m staggered, weathering, streaks */
  function drawPlate(g, S) {
    var R = rng(205), i, k, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.02 + R() * 0.035; g.fillStyle = R() < 0.55 ? "#8a949a" : "#ffffff";
      g.fillRect(R() * S, R() * S, (1 + R() * 3) * m, (0.3 + R() * 1.0) * m);
    }
    g.globalAlpha = 1;
    for (k = 0; k < 16; k++) {
      var y = Math.round(k * m);
      g.fillStyle = "rgba(70,80,86,0.26)"; g.fillRect(0, y, S, 1.5);
      g.fillStyle = "rgba(255,255,255,0.28)"; g.fillRect(0, y + 1.5, S, 1);
      for (i = 0; i < 7; i++) { var x = Math.round(((i * 2.5 + (k % 2) * 1.25) % 16) * m); g.fillStyle = "rgba(70,80,86,0.2)"; g.fillRect(x, y, 1.5, m); }
    }
    for (i = 0; i < 26; i++) {
      g.globalAlpha = 0.05 + R() * 0.06; g.fillStyle = "#5b5650";
      g.fillRect(R() * S, R() * S, 0.08 * m, (0.4 + R() * 1.2) * m);
    }
    g.globalAlpha = 1;
  }
  /* deck: painted plate, seams every 1.5 x 2 m, scuffed walkways */
  function drawDeck(g, S) {
    var R = rng(2051), i, j, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 11; i++) for (j = 0; j < 8; j++) {
      g.fillStyle = "rgba(0,0,0," + (0.02 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(i * 1.5 * m + 2, j * 2 * m + 2, 1.5 * m - 4, 2 * m - 4);
    }
    g.fillStyle = "rgba(40,30,26,0.30)";
    for (i = 0; i <= 11; i++) g.fillRect(i * 1.5 * m - 1, 0, 2, S);
    for (j = 0; j <= 8; j++) g.fillRect(0, j * 2 * m - 1, S, 2);
    for (i = 0; i < 40; i++) { g.globalAlpha = 0.04 + R() * 0.05; g.fillStyle = "#ffffff"; g.fillRect(R() * S, R() * S, (0.5 + R()) * m, 0.3 * m); }
    g.globalAlpha = 1;
  }

  function materials(THREE, C) {
    var plate = canvasTex(THREE, "plate", drawPlate), deckT = canvasTex(THREE, "deck", drawDeck);
    function mk(c, r, m, map) {
      var o = { color: c, roughness: r, metalness: m };
      if (map) o.map = map;
      return new THREE.MeshStandardMaterial(o);
    }
    return {
      hull: mk(0x687070, 0.82, 0.08, plate),     /* hull sides, house, casing, guns, mast (header item 10) */
      lch: mk(0xa0a4a0, 0.82, 0.08, plate),      /* the light-grey KT-97 launchers and the drum */
      boot: mk(0x4a2622, 0.86, 0.04),            /* underbody (not confirmed) */
      deck: mk(0x5a3a2c, 0.95, 0.04, deckT),     /* red-brown weather deck [83C] */
      dark: mk(0x23282b, 0.75, 0.3),             /* recesses, doors, the launcher frames, slots */
      metal: mk(0x4b5257, 0.5, 0.55),            /* rails, barrels, poles, screws */
      glass: mk(0x141c22, 0.15, 0.4),
      team: mk((C && C.team !== undefined) ? C.team : 0x3f7fd0, 0.84, 0.06)
    };
  }

  /* ------------------------------------------------------------ the hull: station table, d from the transom,
     all read off [DDR] (16.27 px/m).  ZD deck-edge z; HD deck half-breadth (plan); CH / CZ the hard chine
     (half-breadth, z: 0.9 m under water amidships, sweeping up to 1.05 m at the stem); KZ keel and stem. */
  var ZD = [[0, 1.72], [5, 1.84], [10, 1.95], [15, 2.04], [20, 2.16], [25, 2.36], [30, 2.6], [35, 2.8], [38.6, 2.95]];
  var HD = [[0, 3.56], [2, 3.62], [5, 3.69], [14, 3.72], [19, 3.75], [24, 3.69], [27.5, 3.63], [29.4, 3.5], [30.4, 3.38],
            [31.4, 3.26], [32.4, 3.13], [33.4, 2.89], [34.4, 2.64], [35.3, 2.27], [36.3, 1.75], [37.3, 1.11], [38.3, 0.18], [38.6, 0.02]];
  var CH = [[0, 3.35], [5, 3.45], [20, 3.5], [25, 3.42], [28, 3.2], [31, 2.75], [33.4, 2.2], [35.3, 1.5], [36.3, 0.95], [37.3, 0.32], [38.6, 0.01]];
  var CZ = [[0, -0.85], [10, -0.9], [20, -0.95], [25, -0.82], [28, -0.5], [31, -0.05], [33.4, 0.35], [35.3, 0.7], [36.3, 0.88], [37.3, 1.05], [38.6, 2.95]];
  var KZ = [[0, -1.0], [0.5, -1.15], [1.0, -1.35], [2, -1.5], [5, -1.57], [10, -1.65], [15, -1.75], [20, -1.9], [25, -2.03], [30, -2.1],
            [32.4, -1.95], [33.4, -1.8], [34.4, -1.5], [35.3, -1.0], [36.0, -0.45], [36.4, 0.0], [37.3, 1.0], [38.0, 1.95], [38.6, 2.95]];
  function zD(d) { return tbl(ZD, d); }
  function hD(d) { return tbl(HD, d); }
  /* one half section, deck edge to keel: deck edge, flare, chine, convex bottom, keel; a waterline point is
     inserted so the boot top lies on z = 0 */
  function half(d) {
    var zd = zD(d), hd = hD(d), hc = Math.min(tbl(CH, d), hd), zc = tbl(CZ, d), kz = tbl(KZ, d);
    if (zc < kz + 0.02) zc = kz + 0.02;
    if (zc > zd - 0.05) zc = zd - 0.05;
    var fw = Math.max(0, Math.min(1, (d - 26) / 10));                        /* flare forward */
    var P = [[hd, zd], [lerp(hc, hd, 0.55) - 0.05 * fw, lerp(zc, zd, 0.55)], [hc, zc],
             [hc * 0.55, lerp(kz, zc, 0.52) - 0.1 * Math.min(1, hc / 3)], [0.0, kz]];
    var out = [], i;
    for (i = 0; i < P.length; i++) {
      out.push(P[i]);
      if (i + 1 < P.length && P[i][1] > 0 && P[i + 1][1] <= 0 && out.length < 6) {
        var t = P[i][1] / (P[i][1] - P[i + 1][1]);
        out.push([lerp(P[i][0], P[i + 1][0], t), 0]);
      }
    }
    while (out.length < 6) out.push(out[out.length - 1].slice());
    return out;
  }
  function addHull(B) {
    var ds = [0, 0.5, 1.0, 2, 3.5, 5, 7, 9, 11, 13.5, 16, 18.5, 21, 23.5, 26, 27.5, 29, 30.4, 31.4, 32.4, 33.4, 34.4, 35.3,
              35.9, 36.4, 36.9, 37.3, 37.7, 38.0, 38.3, 38.6], i, k;
    var H = ds.map(half);
    function bin(a, b, c) { return (a[2] + b[2] + c[2]) / 3 < -0.005 ? B.boot : B.hull; }
    for (i = 0; i + 1 < ds.length; i++) {
      var xa = X(ds[i]), xb = X(ds[i + 1]), A = H[i], Bq = H[i + 1], s;
      for (s = -1; s <= 1; s += 2) for (k = 0; k + 1 < 6; k++) {
        var p = [xa, s * A[k][0], A[k][1]], q = [xa, s * A[k + 1][0], A[k + 1][1]],
            r = [xb, s * Bq[k + 1][0], Bq[k + 1][1]], t = [xb, s * Bq[k][0], Bq[k][1]];
        var tris = s > 0 ? [[p, r, q], [p, t, r]] : [[p, q, r], [p, r, t]];
        tris.forEach(function (T) {
          var cc = cross(sub(T[1], T[0]), sub(T[2], T[0]));
          if (dot(cc, cc) > 1e-12) bin(T[0], T[1], T[2]).tri(T[0], T[1], T[2]);
        });
      }
      /* the deck, cambered 8 cm */
      var cA = zD(ds[i]) + 0.08 * Math.min(1, A[0][0] / 2), cB = zD(ds[i + 1]) + 0.08 * Math.min(1, Bq[0][0] / 2);
      for (s = -1; s <= 1; s += 2) {
        var e0 = [xa, s * A[0][0], A[0][1]], e1 = [xb, s * Bq[0][0], Bq[0][1]], m0 = [xa, 0, cA], m1 = [xb, 0, cB];
        var D = s > 0 ? [[e0, m1, e1], [e0, m0, m1]] : [[e0, e1, m1], [e0, m1, m0]];
        D.forEach(function (T) {
          var cc = cross(sub(T[1], T[0]), sub(T[2], T[0]));
          if (dot(cc, cc) > 1e-12) B.deck.tri(T[0], T[1], T[2]);
        });
      }
    }
    /* transom: a fan per material from the centre line */
    var T0 = H[0], x0 = X(0), cz0 = zD(0) + 0.0, s2;
    for (s2 = -1; s2 <= 1; s2 += 2) for (k = 0; k + 1 < 6; k++) {
      var a = [x0, s2 * T0[k][0], T0[k][1]], b = [x0, s2 * T0[k + 1][0], T0[k + 1][1]];
      var c = [x0, 0, (T0[k][1] + T0[k + 1][1]) / 2 > 0 ? cz0 : T0[5][1]];
      if (T0[k][1] > 0.001 && T0[k + 1][1] < -0.001) c = [x0, 0, 0];
      var cc = cross(sub(b, a), sub(c, a));
      if (dot(cc, cc) < 1e-12) continue;
      var bn = (a[2] + b[2] + c[2]) / 3 < -0.005 ? B.boot : B.hull;
      if (cc[0] < 0) bn.tri(a, b, c); else bn.tri(a, c, b);
    }
    /* the triangle between the two deck-edge halves and the centre at deck height */
    var tq = [[x0, T0[0][0], T0[0][1]], [x0, -T0[0][0], T0[0][1]], [x0, 0, 0]];
    var cq = cross(sub(tq[1], tq[0]), sub(tq[2], tq[0]));
    if (cq[0] < 0) B.hull.tri(tq[0], tq[1], tq[2]); else B.hull.tri(tq[0], tq[2], tq[1]);
    /* toe rail along the deck edge, d 0.2 - 38.2 */
    var s, d;
    for (s = -1; s <= 1; s += 2) {
      var rr = [];
      for (d = 0.2; d < 38.25; d += 1.6) {
        var dd = Math.min(d, 38.2), y0 = s * (hD(dd) - 0.02), z0 = zD(dd);
        rr.push([[X(dd), y0, z0 - 0.02], [X(dd), y0 + s * 0.06, z0 - 0.02], [X(dd), y0 + s * 0.06, z0 + 0.1], [X(dd), y0, z0 + 0.1]]);
      }
      loft(B.hull, rr);
    }
  }

  /* lifelines: stanchions every ~1.2 m inside the deck edge, two wires */
  function rails(B, da, db, inset, h) {
    var s, d, hh = h || 0.9;
    for (s = -1; s <= 1; s += 2) {
      for (d = da; d < db - 0.01; d += 1.2) {
        var dn = Math.min(d + 1.2, db), y0 = s * Math.max(0.3, hD(d) - inset), y1 = s * Math.max(0.3, hD(dn) - inset);
        cyl(B.metal, [X(d), y0, zD(d) + hh], [X(dn), y1, zD(dn) + hh], 0.018, 0.018, 4);
        cyl(B.metal, [X(d), y0, zD(d) + hh * 0.5], [X(dn), y1, zD(dn) + hh * 0.5], 0.012, 0.012, 3);
        box(B.metal, X(d) - 0.022, X(d) + 0.022, y0 - 0.022, y0 + 0.022, zD(d), zD(d) + hh);
      }
      box(B.metal, X(db) - 0.022, X(db) + 0.022, s * Math.max(0.3, hD(db) - inset) - 0.022, s * Math.max(0.3, hD(db) - inset) + 0.022, zD(db), zD(db) + hh);
    }
  }

  /* ------------------------------------------------------------ KT-97 launcher [DDR][DN][83][PL]
     d0 = after end; yi / yo inboard / outboard edges (signed by s).  Roof rising 12 deg toward the bow,
     rounded top edges (0.85 m outboard, 0.45 m inboard), the hipped front door raked back from the roof to a
     nose 7.5 m forward of the after end, an open dark frame under it with two posts. */
  function kt97(B, d0, yi, yo, s) {
    var zdk = zD(d0), Z0 = zdk + 2.12, SL = 0.218;
    function ztop(a) {
      if (a < 0.35) return Z0 - 0.34 + 0.34 * Math.sqrt(Math.max(0, a / 0.35));
      if (a <= 5.4) return Z0 + SL * (a - 0.35);
      return Z0 + SL * 5.05 - 0.762 * (a - 5.4);
    }
    function zbot(a) {
      var zd = zD(d0 + a) + 0.01;
      if (a <= 5.62) return zd;
      var zr = zD(d0 + 5.75) + 1.4;
      if (a <= 5.75) return lerp(zd, zr, (a - 5.62) / 0.13);
      return lerp(zr, ztop(7.5) - 0.04, (a - 5.75) / 1.75);
    }
    var yc = s * (yi + yo) / 2, hw0 = (yo - yi) / 2;
    function sec(a) {
      var x = X(d0 + a), zb = zbot(a), zt = ztop(a), w = a <= 5.4 ? 1 : lerp(1, 0.84, (a - 5.4) / 2.1), hw = hw0 * w;
      var h = Math.max(0.02, zt - zb), ro = Math.min(0.85, h * 0.9, hw * 0.9), ri = Math.min(0.45, h * 0.9, hw * 0.5);
      var yO = yc + s * hw, yI = yc - s * hw, P = [], k;
      P.push([x, yI, zb], [x, yO, zb]);
      for (k = 0; k <= 4; k++) { var t = k / 4 * PI / 2; P.push([x, yO - s * ro * (1 - Math.cos(t)), zt - ro * (1 - Math.sin(t))]); }
      for (k = 0; k <= 4; k++) { var t2 = k / 4 * PI / 2; P.push([x, yI + s * ri * (1 - Math.sin(t2)), zt - ri * (1 - Math.cos(t2))]); }
      return P;
    }
    var as = [0, 0.12, 0.35, 1.5, 3.0, 4.5, 5.4, 5.62, 5.75, 6.2, 6.7, 7.1, 7.38, 7.5], rings = as.map(sec);
    loft(B.lch, rings);
    /* three stiffeners on the outboard face, parallel to the roof [DDR][PL] */
    var k, a;
    for (k = 0; k < 3; k++) {
      var dz = 1.05 + k * 0.42, yy = yc + s * (hw0 + 0.025);
      cyl(B.lch, [X(d0 + 0.8), yy, ztop(0.8) - dz], [X(d0 + 5.3), yy, ztop(5.3) - dz], 0.035, 0.035, 4);
    }
    /* the fold across the door and its two hinge rails, standing proud on L brackets [DN][83] */
    for (k = -1; k <= 1; k += 2) {
      var yr = yc + k * 0.45;
      var pA = [X(d0 + 4.6), yr, ztop(4.6) + 0.16], pB = [X(d0 + 6.9), yr, ztop(6.9) + 0.16];
      cyl(B.metal, pA, pB, 0.045, 0.045, 5);
      cyl(B.metal, [X(d0 + 4.75), yr, ztop(4.75)], [X(d0 + 4.75), yr, ztop(4.75) + 0.16], 0.03, 0.03, 4);
      cyl(B.metal, [X(d0 + 6.75), yr, ztop(6.75) - 0.02], [X(d0 + 6.75), yr, ztop(6.75) + 0.16], 0.03, 0.03, 4);
    }
    cyl(B.dark, [X(d0 + 5.42), yc - s * hw0 * 0.95, ztop(5.42) - 0.33], [X(d0 + 5.42), yc + s * hw0 * 0.95, ztop(5.42) - 0.33], 0.03, 0.03, 4);
    /* open frame under the door: dark recess, two posts, a sill [DN][DDR] */
    var zr = zD(d0 + 5.75) + 1.4, xa = X(d0 + 5.6), xb = X(d0 + 7.25);
    box(B.dark, xa, xa + 0.5, yc - hw0 * 0.9, yc + hw0 * 0.9, zD(d0 + 5.6), zr);
    box(B.dark, xa, xb - 0.6, yc - hw0 * 0.86, yc + hw0 * 0.86, zD(d0 + 6), zD(d0 + 6) + 0.12);
    for (k = -1; k <= 1; k += 2) {
      var yp = yc + k * hw0 * 0.72;
      box(B.lch, xb - 0.62, xb - 0.5, yp - 0.07, yp + 0.07, zD(d0 + 7), zbot(6.65));
      cyl(B.lch, [xb - 0.56, yp, zD(d0 + 6.6) + 0.1], [xa + 0.5, yp, zr - 0.15], 0.04, 0.04, 4);
    }
    /* after-end cover seam */
    box(B.dark, X(d0) - 0.012, X(d0) + 0.01, yc - hw0 * 0.6, yc + hw0 * 0.6, zdk + 0.3, Z0 - 0.7);
    a = 0;
  }

  /* ------------------------------------------------------------ twin 30 mm AK-230 [83][DN][DDR]
     fluted bell base, ring, two rounded cheeks either side of a dark slot, two barrels.  f = +1 trained
     ahead, -1 astern; el = barrel elevation (rad). */
  function ak230(B, d, f, el) {
    var xc = X(d), zc = zD(d) - 0.02, i;
    function P(x, y, z) { return [xc + f * x, f * y, zc + z]; }
    cyl(B.hull, P(0, 0, 0), P(0, 0, 0.82), 0.93, 0.74, 20);
    for (i = 0; i < 12; i++) {                                        /* the flutes */
      var t = (i + 0.5) / 12 * TAU, ct = Math.cos(t), st = Math.sin(t);
      cyl(B.hull, P(0.95 * ct, 0.95 * st, 0.02), P(0.76 * ct, 0.76 * st, 0.8), 0.045, 0.035, 3);
    }
    cyl(B.dark, P(0, 0, 0.82), P(0, 0, 0.9), 0.76, 0.76, 20);
    for (i = -1; i <= 1; i += 2) {                                    /* the two cheeks */
      ellipsoid(B.hull, P(-0.05, i * 0.4, 0.9), 0.66, 0.36, 0.78, 6, 14, 0, PI / 2);
    }
    ellipsoid(B.hull, P(-0.32, 0, 0.9), 0.38, 0.3, 0.62, 4, 10, 0, PI / 2);  /* the back between them */
    obox(B.dark, P(0, 0, 0), [f, 0, 0], [0, f, 0], [0, 0, 1], 0.05, 0.6, -0.17, 0.17, 0.95, 1.42);
    var ce = Math.cos(el), se = Math.sin(el);
    for (i = -1; i <= 1; i += 2) {
      var y = i * 0.11, z = 1.2;
      cyl(B.metal, P(0.45, y, z), P(0.45 + 1.75 * ce, y, z + 1.75 * se), 0.045, 0.04, 6);
      cyl(B.metal, P(0.45 + 1.55 * ce, y, z + 1.55 * se), P(0.45 + 1.8 * ce, y, z + 1.8 * se), 0.06, 0.06, 6);
    }
    obox(B.hull, P(0, 0, 0), [f, 0, 0], [0, f, 0], [0, 0, 1], -0.55, -0.15, -0.2, 0.2, 1.55, 1.68);  /* sight hood */
  }

  /* ------------------------------------------------------------ Drum Tilt [DDR][DN][USN]: casing, pedestal,
     railed platform at 5.05 m, the mount and the drum (centre 6.95 m, axis tilted up toward the bow) */
  function drumTilt(B, d) {
    var x = X(d), zp = 5.05, k;
    cylZ(B.hull, x, 0, 3.5, zp - 0.05, 0.5, 14);
    cyl(B.hull, [x, 0, 3.5], [x, 0, 3.75], 0.75, 0.55, 14);
    box(B.hull, x - 1.1, x + 1.1, -1.05, 1.05, zp - 0.08, zp);
    for (k = 0; k < 4; k++) {                                         /* brackets under the platform */
      var sx = k < 2 ? -1 : 1, sy = k % 2 ? -1 : 1;
      cyl(B.metal, [x + sx * 0.4, sy * 0.4, 4.3], [x + sx * 1.0, sy * 0.95, zp - 0.08], 0.03, 0.03, 4);
    }
    /* rail round the platform */
    var C4 = [[-1.05, -1.0], [1.05, -1.0], [1.05, 1.0], [-1.05, 1.0]];
    for (k = 0; k < 4; k++) {
      var p = C4[k], q = C4[(k + 1) % 4];
      cyl(B.metal, [x + p[0], p[1], zp + 0.95], [x + q[0], q[1], zp + 0.95], 0.02, 0.02, 4);
      cyl(B.metal, [x + p[0], p[1], zp + 0.5], [x + q[0], q[1], zp + 0.5], 0.014, 0.014, 3);
      box(B.metal, x + p[0] - 0.025, x + p[0] + 0.025, p[1] - 0.025, p[1] + 0.025, zp, zp + 0.95);
      var mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
      box(B.metal, x + mx - 0.025, x + mx + 0.025, my - 0.025, my + 0.025, zp, zp + 0.95);
    }
    cylZ(B.hull, x, 0, zp, zp + 0.55, 0.42, 14);
    cylZ(B.hull, x, 0, zp + 0.55, zp + 1.15, 0.28, 12);
    box(B.hull, x - 0.25, x + 0.25, -0.62, 0.62, zp + 1.1, zp + 1.3);   /* yoke */
    for (k = -1; k <= 1; k += 2) box(B.hull, x - 0.18, x + 0.18, k * 0.62 - 0.06, k * 0.62 + 0.06, zp + 1.2, zp + 1.95);
    var tl = 0.5, ax = [Math.cos(tl), 0, Math.sin(tl)], C0 = [x + 0.1, 0, 6.95];
    var A = [C0[0] - ax[0] * 0.45, 0, C0[2] - ax[2] * 0.45], Bf = [C0[0] + ax[0] * 0.45, 0, C0[2] + ax[2] * 0.45];
    cyl(B.lch, A, Bf, 0.76, 0.76, 22);
    cyl(B.lch, Bf, [Bf[0] + ax[0] * 0.24, 0, Bf[2] + ax[2] * 0.24], 0.76, 0.5, 22);   /* domed face */
    cyl(B.lch, [A[0] - ax[0] * 0.16, 0, A[2] - ax[2] * 0.16], A, 0.58, 0.76, 22);
    cyl(B.dark, Bf, [Bf[0] + ax[0] * 0.02, 0, Bf[2] + ax[2] * 0.02], 0.78, 0.78, 22);
  }

  /* ------------------------------------------------------------ the boat */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group();
    var B = {};
    ["hull", "lch", "boot", "deck", "dark", "metal", "glass", "team"].forEach(function (n) { B[n] = new Bin(T[n]); });
    var s, i, j, d, x, z;
    addHull(B);

    /* --- the launchers: aft pair d 3.6, forward pair d 14.0 [DDR plan] --- */
    for (s = -1; s <= 1; s += 2) {
      kt97(B, 3.6, 1.05, 3.6, s);
      kt97(B, 14.0, 1.22, 3.68, s);
    }

    /* --- centreline casing [DDR][USN]: low after part carrying the Drum Tilt (d 5.9 - 9.0), the main casing
       between the pairs to the house (d 9.0 - 20.9), a tall box at its after end [DN] --- */
    function slab(bin, dA, dB, hw, zt, tw) {
      var t = tw === undefined ? 0.06 : tw;
      hexa(bin, [[X(dA), -hw, zD(dA) - 0.05], [X(dB), -hw, zD(dB) - 0.05], [X(dB), hw, zD(dB) - 0.05], [X(dA), hw, zD(dA) - 0.05],
                 [X(dA) + t, -hw + t, zt], [X(dB) - t, -hw + t, zt], [X(dB) - t, hw - t, zt], [X(dA) + t, hw - t, zt]]);
    }
    slab(B.hull, 5.9, 9.1, 0.95, 3.5);
    slab(B.hull, 9.0, 21.0, 1.0, 3.85);
    slab(B.hull, 9.6, 10.9, 0.58, 4.9, 0.03);
    box(B.dark, X(10.9), X(10.92), -0.4, 0.4, 3.95, 4.75);
    cylY(B.hull, X(11.5), -0.45, 0.45, 4.05, 0.22, 12);                       /* the drum on the casing [DN] */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X(13.45), X(12.55), s * 1.0 - 0.02, s * 1.0 + 0.02, zD(13) + 0.1, 3.6);   /* doors in the casing */
      for (j = 0; j < 4; j++) box(B.metal, X(11.75), X(11.25), s * 1.02 - 0.02, s * 1.02 + 0.02, 2.4 + j * 0.38, 2.43 + j * 0.38);
    }
    cylZ(B.metal, X(13.7), 0.3, 3.85, 4.25, 0.05, 6);
    cylZ(B.hull, X(13.7), 0.3, 4.25, 4.42, 0.1, 8);
    drumTilt(B, 7.0);

    /* --- the house [DDR][DN][83]: low after step at the mast (d 20.6 - 21.9, roof 4.5), the main block d 21.8 -
       27.1, roof 5.0, rounded front corners, three front windows, side windows and doors --- */
    var HW = 1.32, RF = 5.0;
    slab(B.hull, 20.6, 21.95, HW, 4.5, 0.04);
    (function () {
      var rings = [], dd = [21.8, 25.6, 26.35, 26.75, 27.0, 27.12], k;
      function hs(dq, zt) {
        var zb = zD(dq) - 0.05, r = 0.42, w = HW, P = [], q;
        var c = Math.max(0, Math.min(1, (dq - 26.3) / 0.82));                 /* the corners round off toward the front */
        var hw = w - r * (1 - Math.sqrt(Math.max(0, 1 - c * c)));
        P.push([X(dq), -hw, zb], [X(dq), hw, zb]);
        for (q = 0; q <= 3; q++) { var t = q / 3 * PI / 2; P.push([X(dq), hw - 0.18 * (1 - Math.cos(t)), zt - 0.18 * (1 - Math.sin(t))]); }
        for (q = 0; q <= 3; q++) { var t2 = q / 3 * PI / 2; P.push([X(dq), -hw + 0.18 * (1 - Math.sin(t2)), zt - 0.18 * (1 - Math.cos(t2))]); }
        return P;
      }
      var zt = [RF, RF, RF - 0.03, RF - 0.12, RF - 0.28, RF - 0.5];
      for (k = 0; k < dd.length; k++) rings.push(hs(dd[k], zt[k]));
      loft(B.hull, rings);
    })();
    for (j = -1; j <= 1; j++) box(B.glass, X(27.1) - 0.02, X(27.1) + 0.05, j * 0.62 - 0.22, j * 0.62 + 0.22, 3.95, 4.38);
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 2; j++) box(B.glass, X(24.4 + j * 0.75) - 0.25, X(24.4 + j * 0.75) + 0.25, s * HW - 0.03, s * HW + 0.03, 3.98, 4.32);
      box(B.dark, X(23.3), X(22.55), s * HW - 0.03, s * HW + 0.03, zD(23) + 0.15, 4.25);       /* doors */
      cyl(B.metal, [X(21.9), s * (HW + 0.06), RF - 0.9], [X(25.8), s * (HW + 0.06), RF - 0.9], 0.025, 0.025, 4);   /* grab rail */
      /* rails along the after step */
    }
    /* open bridge on the roof [DN][83]: a solid screen front and sides, a glass windscreen, open aft */
    var b0 = 22.15, b1 = 24.7, bw = 1.2;
    box(B.hull, X(b1) - 0.08, X(b1), -bw, bw, RF, RF + 0.85);
    for (s = -1; s <= 1; s += 2) box(B.hull, X(b0), X(b1), s * bw - 0.04, s * bw + 0.04, RF, RF + 0.85);
    obox(B.glass, [X(b1) - 0.04, 0, RF + 0.85], unit([-0.35, 0, 1]), [0, 1, 0], unit([1, 0, 0.35]), 0, 0.36, -bw + 0.05, bw - 0.05, -0.02, 0.02);
    box(B.deck, X(b0), X(b1) - 0.08, -bw + 0.04, bw - 0.04, RF, RF + 0.03);
    cylZ(B.hull, X(23.7), 0, RF, RF + 1.05, 0.12, 8);                     /* binnacle / sight pedestal [DDR plan] */
    cylZ(B.metal, X(23.7), 0, RF + 1.05, RF + 1.2, 0.17, 10);
    cylZ(B.hull, X(25.9), -0.5, RF, RF + 0.35, 0.2, 10);                    /* searchlight on the roof */
    cylZ(B.metal, X(25.9), -0.5, RF + 0.35, RF + 0.62, 0.18, 10);

    /* --- the mast [DDR][DN][BA]: a tube from the after step, lower yard with lamps, IFF arrays on brackets
       fore and aft, the head platform with the Square Tie box, the lattice topmast and pole --- */
    var xm = X(21.0), zH = 9.25;
    cyl(B.hull, [xm, 0, 4.5], [xm, 0, zH], 0.27, 0.22, 12);
    box(B.deck, xm - 0.45, xm + 0.55, -0.55, 0.55, 6.55, 6.62);                /* searchlight platform */
    cylZ(B.metal, xm + 0.35, 0, 6.62, 6.95, 0.16, 10);
    box(B.metal, xm - 0.04, xm + 0.04, -1.6, 1.6, 7.6, 7.68);                  /* yard */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, xm - 0.1, xm + 0.1, s * 1.55 - 0.08, s * 1.55 + 0.08, 7.35, 7.6);
      cyl(B.metal, [xm, s * 0.2, 7.2], [xm, s * 1.5, 7.62], 0.018, 0.018, 3);
    }
    function iff(xa, za) {                                                    /* a bedspring array on a bracket */
      box(B.metal, xa - 0.04, xa + 0.04, -0.42, 0.42, za, za + 0.52);
      for (var q = 0; q < 4; q++) box(B.dark, xa - 0.05, xa + 0.05, -0.4 + q * 0.27 - 0.02, -0.4 + q * 0.27 + 0.02, za + 0.02, za + 0.5);
    }
    cyl(B.metal, [xm + 0.2, 0, 8.05], [xm + 1.35, 0, 8.65], 0.03, 0.03, 4);
    iff(xm + 1.35, 8.5);
    cyl(B.metal, [xm - 0.2, 0, 7.85], [xm - 1.35, 0, 8.05], 0.03, 0.03, 4);
    iff(xm - 1.35, 7.85);
    box(B.deck, xm - 0.9, xm + 0.6, -0.65, 0.65, zH - 0.08, zH);              /* head platform */
    for (s = -1; s <= 1; s += 2) cyl(B.metal, [xm - 0.9, s * 0.65, zH + 0.6], [xm + 0.6, s * 0.65, zH + 0.6], 0.015, 0.015, 3);
    /* Square Tie: a flat box about 2 m wide on a short mount, facing ahead [DDR front view][DN] */
    cylZ(B.hull, xm + 0.1, 0, zH, zH + 0.3, 0.14, 8);
    box(B.hull, xm - 0.15, xm + 0.35, -1.0, 1.0, zH + 0.3, zH + 0.85);
    box(B.dark, xm + 0.35, xm + 0.37, -0.92, 0.92, zH + 0.36, zH + 0.79);
    /* lattice topmast abaft the box, then a pole */
    (function () {
      var xc = xm - 0.6, a0 = 0.22, a1 = 0.06, z0 = zH, z1 = 11.0, lg, bay, sgn;
      for (lg = 0; lg < 4; lg++) {
        var sx = lg < 2 ? -1 : 1, sy = (lg % 2) ? -1 : 1;
        cyl(B.metal, [xc + sx * a0, sy * a0, z0], [xc + sx * a1, sy * a1, z1], 0.025, 0.02, 4);
      }
      for (bay = 0; bay < 4; bay++) {
        var f0 = bay / 4, f1 = (bay + 1) / 4, q0 = lerp(a0, a1, f0), q1 = lerp(a0, a1, f1), zz0 = lerp(z0, z1, f0), zz1 = lerp(z0, z1, f1);
        for (sgn = -1; sgn <= 1; sgn += 2) {
          cyl(B.metal, [xc - q0, sgn * q0, zz0], [xc + q1, sgn * q1, zz1], 0.012, 0.012, 3);
          cyl(B.metal, [xc + sgn * q0, -q0, zz0], [xc + sgn * q1, q1, zz1], 0.012, 0.012, 3);
        }
      }
      cyl(B.metal, [xc, 0, z1], [xc, 0, 12.0], 0.03, 0.015, 4);
      box(B.metal, xc - 0.03, xc + 0.03, -0.5, 0.5, 10.5, 10.55);
    })();
    /* whips at the bridge front corners and abaft the after launchers [DDR][DN] */
    for (s = -1; s <= 1; s += 2) cyl(B.metal, [X(25.0), s * 1.15, RF], [X(24.6), s * 1.2, 9.4], 0.035, 0.015, 4);
    cyl(B.metal, [X(16.6), 0.6, 3.85], [X(16.4), 0.6, 9.0], 0.035, 0.015, 4);

    /* --- guns: forward AK-230 ahead, aft AK-230 astern, raised a little [DDR][83] --- */
    ak230(B, 29.6, 1, 0.0);
    ak230(B, 2.65, -1, 0.21);

    /* --- forecastle [DDR plan]: hatches, capstan and chain pipe, bollards, fairleads, jack staff --- */
    function hatch(dq, y, a) {
      var zq = zD(dq);
      box(B.hull, X(dq) - a, X(dq) + a, y - a, y + a, zq, zq + 0.1);
      box(B.dark, X(dq) - a + 0.06, X(dq) + a - 0.06, y - a + 0.06, y + a - 0.06, zq + 0.1, zq + 0.11);
    }
    hatch(27.6, -1.0, 0.38); hatch(32.4, 0.8, 0.36); hatch(35.1, -0.85, 0.34);
    cylZ(B.hull, X(31.3), 0, zD(31.3), zD(31.3) + 0.35, 0.24, 12);
    cylZ(B.dark, X(31.3), 0, zD(31.3) + 0.35, zD(31.3) + 0.38, 0.2, 12);
    box(B.dark, X(30.95), X(30.6), -0.12, 0.12, zD(30.8), zD(30.8) + 0.06);
    for (s = -1; s <= 1; s += 2) {
      [[33.9, 0.55], [26.4, 0.45], [12.2, 0.4], [1.6, 0.5]].forEach(function (b) {
        var dq = b[0], yq = s * (hD(dq) - b[1]);
        cylZ(B.metal, X(dq), yq, zD(dq), zD(dq) + 0.3, 0.09, 8);
        cylZ(B.metal, X(dq + 0.4), yq, zD(dq), zD(dq) + 0.3, 0.09, 8);
      });
      box(B.dark, X(36.6) - 0.15, X(36.6) + 0.15, s * (hD(36.6) - 0.12) - 0.08, s * (hD(36.6) - 0.12) + 0.08, zD(36.6), zD(36.6) + 0.12);
    }
    cyl(B.metal, [X(38.35), 0, zD(38.35)], [X(38.35), 0, zD(38.35) + 1.2], 0.03, 0.02, 5);
    cyl(B.metal, [X(38.35), 0, zD(38.35) + 0.15], [X(37.9), 0, zD(37.9) + 0.9], 0.012, 0.012, 3);
    rails(B, 27.6, 38.1, 0.12, 0.85);

    /* --- quarterdeck [DDR]: two grated boxes at the corners, rails round the stern, ensign staff (bare) --- */
    for (s = -1; s <= 1; s += 2) {
      box(B.hull, X(0.35), X(1.25), s * 2.55, s * 3.25, zD(0.8), zD(0.8) + 0.22);
      for (j = 0; j < 5; j++) box(B.dark, X(0.4 + j * 0.18), X(0.48 + j * 0.18), s * 2.6, s * 3.2, zD(0.8) + 0.22, zD(0.8) + 0.23);
    }
    rails(B, 0.15, 3.4, 0.12, 0.85);
    for (i = 0; i < 5; i++) box(B.metal, X(0.1) - 0.02, X(0.1) + 0.02, -3.0 + i * 1.5 - 0.02, -3.0 + i * 1.5 + 0.02, zD(0.1), zD(0.1) + 0.85);
    cyl(B.metal, [X(0.1), -3.4, zD(0.1) + 0.85], [X(0.1), 3.4, zD(0.1) + 0.85], 0.018, 0.018, 4);
    cyl(B.metal, [X(0.3), 0, zD(0.3)], [X(0.3), 0, zD(0.3) + 1.8], 0.035, 0.02, 5);
    /* rails between the pairs, at the deck edge (d 11.2 - 13.9) */
    rails(B, 11.2, 13.9, 0.12, 0.85);

    /* --- underwater: three shafts, three screws, two rudders [DDR] --- */
    var SY = [2.2, 0, -2.2], SD = [1.6, 3.0, 1.6];
    for (i = 0; i < 3; i++) {
      var yS = SY[i], dS = SD[i], zS = -1.85;
      cyl(B.metal, [X(dS + 0.25), yS, zS], [X(dS + 6.5), yS, tbl(KZ, dS + 6.5) * 0.5 + zS * 0.5 + 0.35], 0.07, 0.07, 6);
      cyl(B.metal, [X(dS + 1.4), yS, zS + 0.05], [X(dS + 1.4), yS * 0.97, tbl(KZ, dS + 1.4) + 0.1], 0.05, 0.05, 4);
      cyl(B.metal, [X(dS - 0.1), yS, zS], [X(dS + 0.25), yS, zS], 0.08, 0.12, 8);
      for (j = 0; j < 3; j++) {
        var an = j / 3 * TAU + 0.3 * i, cy = Math.cos(an), cz = Math.sin(an);
        var tv = unit([0.5, -cz * 0.86, cy * 0.86]), tu = cross(tv, [0, cy, cz]);
        obox(B.metal, [X(dS + 0.1), yS, zS], tu, tv, [0, cy, cz], -0.025, 0.025, -0.13, 0.13, 0.1, 0.46);
      }
    }
    for (s = -1; s <= 1; s += 2) box(B.metal, X(0.35), X(1.1), s * 2.2 - 0.05, s * 2.2 + 0.05, -1.75, -1.0);

    /* --- team: two small strips on up-facing surfaces (the bridge roof forward, the after casing) --- */
    box(B.team, X(26.1), X(25.3), -0.55, 0.55, RF + 0.005, RF + 0.025);
    box(B.team, X(20.85), X(20.25), -0.55, 0.55, 3.855, 3.875);

    flush(THREE, g, B);
    return g;
  }
  return { build: build };
})();

UNIT_MODELS["pact_e60_missileboat"] = {
  len: 38.6,
  build: function (THREE, M, C) { return HeroOsaBoat.build(THREE, M, C); }
};

/* The PLA's Type 021 (Huangfeng) is a Chinese-built copy of the Project 205 Osa I: drawn
   as the Osa I, no markings.  Small differences of the Chinese boats are NOT drawn. */
UNIT_MODELS["pla_e60_missileboat"] = {
  len: 38.6,
  build: function (THREE, M, C) { return HeroOsaBoat.build(THREE, M, C); }
};
