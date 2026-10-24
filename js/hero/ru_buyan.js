/* ============ ru_buyan.js - HERO models: Project 21630 "Buyan" and Project 21631 "Buyan-M" ============
   Keys (unchanged): boat_p (rules.js, "Project 21630 Gunboat", service 2006, turret:true; warship_specs len 62,
   beam 9.6) and pact_e00_missileboat (eras.js, "Project 21631 Buyan-M corvette", service 2014; warship_specs
   len 74.1, beam 11).  One build() with an option per hull; each key registered with its own true length.
   FULL-QUALITY REDO 2026-10-24: hull lofted from a station table measured off two near-orthogonal profile
   photographs per type, the superstructure re-measured, canvas plate/deck texture, the Duet's guns stacked.

   PUBLISHED FIGURES (en.wikipedia "Buyan-class corvette" / "Buyan-M-class corvette" infoboxes, kept from the
   first version and not contradicted by the photographs): 21630 length 62 m, beam 9.6 m, draught 2 m; 21631
   length 75 m (74.1 m in warship_specs, used), beam 11 m, draught 2.5 m; both one A-190 100 mm; propulsion
   with pump-jets (two outlets drawn at the transom: the underwater hull is not photographed, NOT CONFIRMED).

   REFERENCES (Wikimedia Commons, width=960, cached in the scratchpad q_buyan_ref):
     [GS3] "Malyy raketnyy korabl' <<Grad Sviyazhsk>> 2H1A7732WI.jpg" (Cyrillic title; 21631, starboard profile,
           St Petersburg 2015, sunlit) - the master profile, 74.1 m = 804.5 px; stations below are read off it.
     [VU]  "9512.2. Velikiy Ustyug.jpg" (21631, starboard profile, overcast, 2020) - the check profile.
     [SP]  "9243.2. Ship "Serpukhov".jpg" (21631, port bow-quarter from above): tumblehome house, black aft hull.
     [OZ]  "Orekhovo-Zuyevo corvette.jpg" (21631, bow-on): bow flare, the house front, the tower.
     [GS2] "Grad Sviyazhsk (2017-06-05) 01.jpg" (21631, on deck): the 3S14 cell lids, rectangular, hinged, two
           rows, on a roof with the house wall and its ladder behind.
     [AST] "Caspian Corvette Astrakhan.jpg" (21630, port profile) - the 21630 master, 62 m = 892 px.
     [SIL] "21630 Silhouette.jpg" and "Buyan class.png" (21630 side drawings): the gun, house, tower, whips,
           the drums abaft the house and the Grad-M aft.

   RECOGNITION LIST (each must read at game zoom; where it shows in the model):
     1. Short, beamy river-sea hull, flat sheer, a strongly RAKED STEM (stem head at d 0, forefoot at the
        waterline about 4 m aft) [GS3, AST]: hull station table HULL.*, ring().
     2. A KNUCKLE along the topsides, rising to the stem; flare below it, tumblehome above it, carried up
        into the flush-sided house [GS3, SP, OZ]: ring() point K, house() tumble.
     3. The A-190 100 mm in a faceted stealth shield right ahead of the house (21631 d 16.4, 21630 d 14.5)
        [GS3, AST]: turret group "turret".
     4. One big flush-sided house with a raked front; on it the narrower bridge tier with a window ribbon
        [GS3, VU, OZ]: house(), the bridge tier.
     5. The tapered TOWER mast with the large radome on top and a pole mast just abaft it [GS3, VU, AST]:
        tower().
     6. A sphere director on the bridge roof ahead of the tower [GS3, VU, AST].
     7. BLACK AFT HULL: the hull is black from the waterline to the main deck abaft d 45 (21631) / d 33.5
        (21630); grey forward; a thin red boot line [GS3, VU, SP, AST]: material "blk" and the "boot" band.
     8. 21631: the 3S14 eight-cell VLS lids on the after house roof [GS2]; a dome-topped drum and a lamp globe
        abaft the bridge tier [GS3, VU]; the low after deckhouse with the AK-630M-2 DUET (two six-barrel guns
        one ABOVE the other) [GS3, VU]; the open stern deck.
     9. 21630: two drum-shaped 30 mm mounts (AK-306) on the low deckhouse abaft the house, a small mount at
        its aft end, and the Grad-M (A-215) launcher on the after deck, elevated and trained aft, behind a
        wedge-shaped housing [AST, SIL].
    10. Paint, both types in every photograph 2008-2020: Russian Navy light blue-grey hull and house, black
        aft hull, red-brown boot line; radomes in the ship's grey.  Sampled [GS3]: house side 0x99b0be,
        hull 0x718992, roof 0x8e9ea3 (sunlit); [VU] overcast 0x8a959b.  Taken to about 0.8: hull/house
        0x76888f, roof/deck 0x6a767b, radomes 0x84949b.
   CORRECTED against the first version (its published figures and the A-190, Duet, Grad-M and pump-jet fits are
   kept): the 21631 house is TALLER (roof 7.0 m, bridge roof 8.8 m, was 6.3 /
   7.9) and the forecastle higher (4.75-4.3 m, was 3.3-3.75); the gun is at d 16.4 (was 19.6: [GS3] and [VU]
   agree on 16-16.6); the tower at d 27.8-34.1, radome centre d 31.5 (was 32.6-37.4, 35.0); the Duet's two gun clusters are stacked
   vertically (were side by side); the after deckhouse spans d 55.6-65 (was 57-67.5).  21630: forecastle
   4.35-3.75 m (was 3.7-4.15), bridge roof 7.85 m (was 7.1), dome centre 13.6 m (was 12.7); the black aft hull and the
   low deckhouse d 33.2-43.3 carrying the 30 mm drums are now drawn.
   NOT CONFIRMED and drawn only as marked: the 3S14 lids' exact station on the after house roof (one deck
   photograph [GS2], no overhead; drawn d 48-52 between the drum and the launcher); which of the two 21630 drums
   is to port; the type of the small mounts (published as 14.5 mm MTPU); the stowed launcher abaft the VLS
   (21631, two tubes visible, type not confirmed); the Duet's barrel direction (drawn trained aft as both
   21631 profiles seem to show); the waterjets.  The VLS cells themselves are inside the hull: only the lids.
   No pennant numbers, names, ensigns or other markings.  Waterline z = 0.
   MODEL SPACE: +X bow, +Y port, +Z up, metres.  The A-190 (shield, cradle, barrel) is the group named "turret"
   with its origin on the training axis; everything else is baked, one mesh per material.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBuyan = (function () {
  "use strict";
  var TAU = Math.PI * 2;
  var CFG = null, L = 62, X0 = -31, X1 = 31, TX = 0, BARB = 0.45;
  function X(d) { return X1 - d; }       /* x at d metres abaft the stem */
  function dOf(x) { return X1 - x; }

  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  /* piecewise-linear table lookup, T = [[d, v], ...] ascending in d */
  function tbl(T, d) {
    if (d <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) if (d <= T[i][0]) {
      var t = (d - T[i - 1][0]) / ((T[i][0] - T[i - 1][0]) || 1);
      return lerp(T[i - 1][1], T[i][1], t);
    }
    return T[T.length - 1][1];
  }

  /* a bin per material; UVs are box-mapped in metres off the face normal, so the plate and deck canvases land
     on every surface at their true scale (the textures repeat every 16 m) */
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
  /* a single upward-facing skin (roof and deck paint), no underside */
  function skin(bin, x0, x1, y0, y1, z) {
    bin.tri([x0, y0, z], [x1, y0, z], [x1, y1, z], [0, 0, 1], [0, 0, 1], [0, 0, 1]);
    bin.tri([x0, y0, z], [x1, y1, z], [x0, y1, z], [0, 0, 1], [0, 0, 1], [0, 0, 1]);
  }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  /* tapered block on the centre line: base x0..x1 half-width w0 at z0, top x2..x3 half-width w1 at z1 */
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
  /* loft through rings of equal point count, flat-capped, flat-shaded (faceted) */
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
    /* orientation by signed volume of the closed shell */
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
  /* sphere / dome with smooth normals */
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
  /* plating: 16 m square; strakes every 1.6 m, butts every 4 m staggered, faint weathering and streaks */
  function drawPlate(g, S) {
    var R = rng(21631), i, k, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.02 + R() * 0.035; g.fillStyle = R() < 0.55 ? "#8a949a" : "#ffffff";
      g.fillRect(R() * S, R() * S, (1 + R() * 4) * m, (0.4 + R() * 1.2) * m);
    }
    g.globalAlpha = 1;
    for (k = 0; k < 10; k++) {
      var y = Math.round(k * 1.6 * m);
      g.fillStyle = "rgba(70,80,86,0.30)"; g.fillRect(0, y, S, 1.5);
      g.fillStyle = "rgba(255,255,255,0.35)"; g.fillRect(0, y + 1.5, S, 1);
      for (i = 0; i < 4; i++) { var x = Math.round(((i * 4 + (k % 2) * 2) % 16) * m); g.fillStyle = "rgba(70,80,86,0.22)"; g.fillRect(x, y, 1.5, 1.6 * m); }
    }
    for (i = 0; i < 26; i++) {            /* rust/run streaks below scuppers */
      g.globalAlpha = 0.05 + R() * 0.06; g.fillStyle = "#5b5650";
      g.fillRect(R() * S, R() * S, 0.12 * m, (0.6 + R() * 1.6) * m);
    }
    g.globalAlpha = 1;
  }
  /* deck: non-skid panels 2 x 4 m with their seams, a lighter walkway band */
  function drawDeck(g, S) {
    var R = rng(21630), i, j, m = S / 16;
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
      hull: mk(0x76888f, 0.82, 0.08, plate),      /* hull sides, houses, gun shield, tower: the ship's grey */
      blk: mk(0x17191b, 0.78, 0.06, plate),       /* the black after hull */
      boot: mk(0x5e2621, 0.85, 0.04),             /* red-brown boot line and bottom */
      deck: mk(0x6a767b, 0.95, 0.04, deckT),      /* weather decks and roofs */
      light: mk(0x84949b, 0.6, 0.06),             /* radomes, lamp globe, raft canisters */
      dark: mk(0x2a2f33, 0.75, 0.3),              /* recesses, doors, hatches seams, sensor faces */
      metal: mk(0x4e565b, 0.5, 0.55),             /* rails, barrels, poles */
      glass: mk(0x17222b, 0.15, 0.4),
      team: mk((C && C.team !== undefined) ? C.team : 0x3f7fd0, 0.84, 0.06)
    };
  }

  /* ------------------------------------------------------------ the two hulls: station tables
     d = metres abaft the stem head.  ZD deck-edge height, ZK knuckle height, HD/HK/HW half-breadths at the deck
     edge, knuckle and waterline, KL keel height.  Read off [GS3]/[VU] (21631) and [AST]/[SIL] (21630); beams
     from the published figures, the waterline beam and keel from the hull's photographed flare and draught. */
  var HULLS = {
    b21: {
      L: 74.1, stemTop: 4.75, stemFoot: 3.9, black: 45.0, gun: 16.4,
      ZD: [[0, 4.75], [5, 4.6], [10, 4.45], [19, 4.3], [44.2, 4.3], [44.6, 2.4], [74.1, 2.4]],
      ZK: [[0, 4.6], [4, 4.0], [10, 3.2], [18, 2.6], [24, 2.4], [74.1, 2.3]],
      HD: [[0, 0.12], [1.5, 1.2], [4, 2.5], [8, 3.7], [12, 4.45], [17, 5.0], [24, 5.3], [30, 5.35], [60, 5.35], [68, 5.25], [74.1, 5.0]],
      HK: [[0, 0.1], [1.5, 1.15], [4, 2.45], [8, 3.75], [12, 4.55], [17, 5.2], [24, 5.45], [30, 5.5], [60, 5.5], [68, 5.4], [74.1, 5.15]],
      HW: [[3.9, 0.05], [6, 1.0], [10, 2.3], [15, 3.4], [22, 4.3], [30, 4.75], [40, 4.85], [60, 4.85], [70, 4.7], [74.1, 4.5]],
      KL: [[3.9, 0], [6, -0.9], [9, -1.6], [14, -2.2], [20, -2.5], [62, -2.5], [70, -1.9], [74.1, -1.4]],
      jets: 2.0, jz: -0.9
    },
    b20: {
      L: 62, stemTop: 4.35, stemFoot: 4.0, black: 33.5, gun: 14.5,
      ZD: [[0, 4.35], [5, 4.1], [10, 3.9], [20, 3.75], [33.2, 3.75], [33.5, 2.65], [43.2, 2.65], [43.5, 2.3], [62, 2.3]],
      ZK: [[0, 4.0], [3.5, 3.4], [9, 2.9], [16, 2.6], [62, 2.5]],
      HD: [[0, 0.1], [1.5, 1.0], [4, 2.2], [8, 3.2], [12, 3.9], [17, 4.45], [22, 4.6], [50, 4.6], [57, 4.5], [62, 4.3]],
      HK: [[0, 0.08], [1.5, 0.95], [4, 2.15], [8, 3.25], [12, 4.0], [17, 4.6], [22, 4.8], [50, 4.8], [57, 4.7], [62, 4.5]],
      HW: [[4.0, 0.05], [6, 0.9], [10, 2.0], [15, 3.0], [22, 3.8], [30, 4.15], [50, 4.15], [58, 4.0], [62, 3.85]],
      KL: [[4.0, 0], [6, -0.7], [9, -1.3], [14, -1.8], [20, -2.0], [52, -2.0], [58, -1.6], [62, -1.1]],
      jets: 1.7, jz: -0.75
    }
  };
  function zD(d) { return tbl(CFG.ZD, d); }
  function deckZ(x) { return zD(dOf(x)); }
  function hD(d) { return tbl(CFG.HD, d); }
  /* lowest hull point at a station: the raked stem above the forefoot, the keel aft of it */
  function zLow(d) {
    var H = CFG;
    if (d < H.stemFoot) return H.stemTop * (1 - d / H.stemFoot) * (1 - 0.12 * Math.sin(Math.PI * d / H.stemFoot));
    return tbl(H.KL, d);
  }
  /* one hull section, port to starboard over the keel, deck centre first; tags per edge */
  function ring(d) {
    var H = CFG, x = X(d), zd = zD(d), zk = Math.min(tbl(H.ZK, d), zd - 0.12), hd = hD(d), hk = tbl(H.HK, d), hw = d < H.stemFoot ? 0.04 : tbl(H.HW, d);
    var kl = zLow(d), lo = Math.max(kl, -9), P = [];
    function pt(y, z) {
      if (z < lo) { z = lo; y = Math.min(Math.abs(y), 0.06) * (y < 0 ? -1 : 1); }
      return [x, y, z];
    }
    var hb = hw + (hk - hw) * clamp01(0.15 / Math.max(zk, 0.2));
    var camber = 0.12 * clamp01(hd / 3);
    P.push([x, 0, zd + camber]);
    P.push(pt(hd, zd), pt(hk, zk), pt(hb, 0.15), pt(hw, 0), pt(hw * 0.9, kl * 0.55), pt(hw * 0.35, kl));
    P.push(pt(-hw * 0.35, kl), pt(-hw * 0.9, kl * 0.55), pt(-hw, 0), pt(-hb, 0.15), pt(-hk, zk), pt(-hd, zd));
    return P;
  }
  function addHull(B) {
    var H = CFG, ds = [], d, i, k, n = 13;
    var base = [0, 0.25, 0.6, 1.0, 1.5, 2.1, 2.8, 3.4, H.stemFoot, H.stemFoot + 0.7, 5.6, 7, 8.6, 10.5, 12.8, 15.5, 18.5, 22, 26, 30, 35, 40];
    for (i = 0; i < base.length; i++) ds.push(base[i]);
    /* the deck steps and the paint break get their own stations */
    for (i = 1; i < H.ZD.length; i++) if (H.ZD[i][0] > 22 && H.ZD[i][0] < H.L) ds.push(H.ZD[i][0]);
    ds.push(H.black - 0.01, H.black + 0.01);
    for (d = 41.5; d < H.L - 0.5; d += 2.0) ds.push(d);
    for (d = 21; d < 40; d += 2.0) ds.push(d);
    for (d = 4.4; d < 20; d += 1.3) ds.push(d);
    ds.push(H.L - 2.5, H.L - 1.0, H.L);
    ds.sort(function (a, b) { return a - b; });
    var DS = [ds[0]];
    for (i = 1; i < ds.length; i++) if (ds[i] - DS[DS.length - 1] > 0.02 && ds[i] <= H.L) DS.push(ds[i]);
    var R = DS.map(ring);
    /* edge tags: 0 deck centre->port edge, 1 edge->knuckle, 2 knuckle->boot, 3 boot->WL, 4..9 bottom, ... */
    var TAG = ["deck", "hi", "lo", "boot", "bot", "bot", "bot", "bot", "bot", "boot", "lo", "hi", "deck"];
    function binFor(t, dm) {
      if (t === "deck") return B.deck;
      if (t === "boot" || t === "bot") return B.boot;
      return dm > H.black ? B.blk : B.hull;
    }
    for (i = 0; i + 1 < R.length; i++) {
      var A = R[i], Bq = R[i + 1], dm = (DS[i] + DS[i + 1]) / 2;
      for (k = 0; k < n; k++) {
        var j = (k + 1) % n, bin = binFor(TAG[k], dm);
        /* faces outward: sections run bow -> stern (x decreasing), points port -> starboard over the keel */
        var p = A[k], q = A[j], r = Bq[j], s = Bq[k];
        var c1 = cross(sub(q, p), sub(r, p));
        if (dot(c1, c1) > 1e-12) bin.tri(p, q, r);
        var c2 = cross(sub(r, p), sub(s, p));
        if (dot(c2, c2) > 1e-12) bin.tri(p, r, s);
      }
    }
    /* transom: black above the boot line, bottom paint below */
    var T = R[R.length - 1];
    function fanAft(bin, idx) {
      for (k = 1; k + 1 < idx.length; k++) {
        var p0 = T[idx[0]], p1 = T[idx[k]], p2 = T[idx[k + 1]], cc = cross(sub(p1, p0), sub(p2, p0));
        if (dot(cc, cc) < 1e-12) continue;
        if (cc[0] < 0) bin.tri(p0, p1, p2); else bin.tri(p0, p2, p1);       /* the transom faces aft (-x) */
      }
    }
    fanAft(B.blk, [0, 1, 2, 3, 10, 11, 12]);
    fanAft(B.boot, [3, 4, 5, 6, 7, 8, 9, 10]);
  }

  /* a flush-sided house: from dF (front foot on the deck) to dB (aft foot), roof z zt reached at dFt / dBt, the
     sides continue the hull's deck-edge line and tumble in by tb at the roof; inset s from the deck edge */
  function house(bin, roofBin, dF, dFt, dBt, dB, zt, tb, s, zb) {
    var rings = [], i, ds = [dF, dFt], d;
    for (d = Math.ceil(dFt + 0.5); d < dBt; d += 3) ds.push(d);
    ds.push(dBt, dB);
    for (i = 0; i < ds.length; i++) {
      d = ds[i];
      var x = X(d), zbase = (zb !== undefined ? zb : zD(d)) - 0.04, w0 = hD(d) - s, top;
      if (d <= dFt) top = zbase + (zt - zbase) * clamp01((d - dF) / Math.max(dFt - dF, 0.01));
      else if (d >= dBt) top = zbase + (zt - zbase) * clamp01((dB - d) / Math.max(dB - dBt, 0.01));
      else top = zt;
      top = Math.max(top, zbase + 0.02);
      var w1 = w0 - tb * (top - zbase) / Math.max(zt - zbase, 0.01);
      rings.push([[x, -w0, zbase], [x, w0, zbase], [x, w1, top], [x, -w1, top]]);
    }
    loft(bin, rings);
    /* the roof as a separate deck-painted skin, 1 cm proud */
    if (roofBin) {
      var w = hD((dFt + dBt) / 2) - s - tb - 0.05;
      skin(roofBin, X(dBt) + 0.05, X(dFt) - 0.05, -w, w, zt + 0.012);
    }
  }
  /* a tier with raked ends and tumble: plain block on its own deck */
  function tier(bin, roofBin, dF, dFt, dBt, dB, z0, z1, w0, w1) {
    hexa(bin, [[X(dB), -w0, z0], [X(dF), -w0, z0], [X(dF), w0, z0], [X(dB), w0, z0],
               [X(dBt), -w1, z1], [X(dFt), -w1, z1], [X(dFt), w1, z1], [X(dBt), w1, z1]]);
    if (roofBin) skin(roofBin, X(dBt) + 0.05, X(dFt) - 0.05, -w1 + 0.05, w1 - 0.05, z1 + 0.012);
  }

  /* guard rails between two stations along both deck edges (posts every 1.2 m, top rail and one course) */
  function rails(B, da, db, zf, inset, h) {
    var s, d, hh = h || 1.0;
    for (s = -1; s <= 1; s += 2) {
      for (d = da; d < db - 0.01; d += 1.0) {
        var dn = Math.min(d + 1.0, db), y0 = s * (hD(d) - (inset || 0.1)), y1 = s * (hD(dn) - (inset || 0.1));
        if (Math.abs(y0) < 0.25) continue;
        var z0 = zf ? zf(d) : zD(d), z1 = zf ? zf(dn) : zD(dn);
        cyl(B.metal, [X(d), y0, z0 + hh], [X(dn), y1, z1 + hh], 0.022, 0.022, 5);
        cyl(B.metal, [X(d), y0, z0 + hh * 0.5], [X(dn), y1, z1 + hh * 0.5], 0.014, 0.014, 3);
        box(B.metal, X(d) - 0.022, X(d) + 0.022, y0 - 0.022, y0 + 0.022, z0, z0 + hh);
      }
    }
  }
  /* straight rail round a roof rectangle */
  function roofRail(B, d0, d1, w, z) {
    var s, d;
    for (s = -1; s <= 1; s += 2) {
      cyl(B.metal, [X(d0), s * w, z + 0.95], [X(d1), s * w, z + 0.95], 0.02, 0.02, 4);
      for (d = d0; d <= d1 + 0.01; d += 1.4) box(B.metal, X(d) - 0.02, X(d) + 0.02, s * w - 0.02, s * w + 0.02, z, z + 0.95);
    }
  }

  /* a thin panel on a tumbled house side: d0..d1 along, z0..z1 up, w(z) the side's half-width there */
  function sidePanel(bin, d0, d1, z0, z1, w, s, t) {
    var o = t || 0.035, a = w(z0), b = w(z1);
    hexa(bin, [[X(d1), s * (a - 0.01), z0], [X(d0), s * (a - 0.01), z0], [X(d0), s * (a + o), z0], [X(d1), s * (a + o), z0],
               [X(d1), s * (b - 0.01), z1], [X(d0), s * (b - 0.01), z1], [X(d0), s * (b + o), z1], [X(d1), s * (b + o), z1]]);
  }

  /* forecastle and stern fittings common to both: windlass, hawses, bollards, jack staff, waterjets */
  function commonFit(B, dWind, dAftDeck) {
    var s, H = CFG, d;
    var zw = zD(dWind);
    cylZ(B.hull, X(dWind), 0.0, zw - 0.02, zw + 0.42, 0.42, 14);
    cylZ(B.dark, X(dWind), 0.0, zw + 0.42, zw + 0.46, 0.36, 14);
    for (s = -1; s <= 1; s += 2) {
      cylY(B.dark, X(dWind - 0.6), s * 0.5, s * 0.95, zw + 0.25, 0.22, 10);              /* gypsies */
      d = dWind - 2.2;                                                                       /* hawse pipes in the deck */
      cylZ(B.dark, X(d), s * (hD(d) - 0.55), zD(d) - 0.05, zD(d) + 0.05, 0.22, 10);
      box(B.dark, X(d) - 0.45, X(d) + 0.45, s * (hD(d) - 0.03) - 0.25, s * (hD(d) - 0.03) + 0.25, zD(d) - 0.95, zD(d) - 0.35); /* anchor pocket */
      for (d = dWind + 3.0; d < dWind + 8; d += 4) {
        cylZ(B.metal, X(d), s * (hD(d) - 0.55), zD(d), zD(d) + 0.36, 0.11, 8);
        cylZ(B.metal, X(d + 0.5), s * (hD(d) - 0.55), zD(d), zD(d) + 0.36, 0.11, 8);
      }
    }
    cyl(B.metal, [X(0.35), 0, zD(0.3) + 0.1], [X(0.35), 0, zD(0.3) + 2.2], 0.04, 0.02, 6);     /* jack staff (no flag) */
    /* stern: capstan, bollards, ensign staff (no ensign) */
    var dc = H.L - 4.5, zc = zD(dc);
    cylZ(B.hull, X(dc), 0, zc, zc + 0.5, 0.38, 12);
    cylZ(B.dark, X(dc), 0, zc + 0.5, zc + 0.54, 0.32, 12);
    for (s = -1; s <= 1; s += 2) for (d = dAftDeck + 1; d < H.L - 1; d += 4) {
      cylZ(B.metal, X(d), s * (hD(d) - 0.6), zD(d), zD(d) + 0.36, 0.11, 8);
      cylZ(B.metal, X(d + 0.5), s * (hD(d) - 0.6), zD(d), zD(d) + 0.36, 0.11, 8);
    }
    cyl(B.metal, [X(H.L - 0.7), 0, zD(H.L - 0.7)], [X(H.L - 0.7), 0, zD(H.L - 0.7) + 3.4], 0.05, 0.025, 6);
    /* two waterjet outlets at the transom, below the waterline */
    for (s = -1; s <= 1; s += 2) {
      cylX(B.metal, X(H.L) - 0.15, X(H.L) + 1.4, s * H.jets, H.jz, 0.4, 0.46, 12);
      cylX(B.dark, X(H.L) - 0.2, X(H.L) - 0.14, s * H.jets, H.jz, 0.33, 0.33, 12);
    }
  }

  /* the tower mast: tapered plated tower on the bridge roof, collar platform, upper column with the ESM boxes,
     the big radome; a pole mast with yards just abaft it */
  function tower(B, o) {
    var i, s, z0 = o.z0, zc = o.zc, zu = o.zu;
    var dm = (o.d0 + o.d1) / 2;
    /* lower tower: plan tapers from d0..d1, half-width w0 to d2..d3, w1 at zc; faceted corners */
    var r0 = [], r1 = [], c0 = 0.35, c1 = 0.2;
    function oct(dA, dB, w, z, c) {
      return [[X(dB), -w + c, z], [X(dB) + c, -w, z], [X(dA) - c, -w, z], [X(dA), -w + c, z],
              [X(dA), w - c, z], [X(dA) - c, w, z], [X(dB) + c, w, z], [X(dB), w - c, z]];
    }
    loft(B.hull, [oct(o.d0, o.d1, o.w0, z0 - 0.02, c0), oct(o.d2, o.d3, o.w1, zc, c1)]);
    /* collar platform with a rail and two forward yards with small antennas */
    box(B.deck, X(o.d3 + 0.9), X(o.d2 - 0.9), -o.w1 - 0.9, o.w1 + 0.9, zc, zc + 0.1);
    box(B.hull, X(o.d3 + 0.9), X(o.d2 - 0.9), -o.w1 - 0.9, o.w1 + 0.9, zc - 0.25, zc);
    for (s = -1; s <= 1; s += 2) {
      cyl(B.metal, [X(o.d3 + 0.9), s * (o.w1 + 0.88), zc + 0.95], [X(o.d2 - 0.9), s * (o.w1 + 0.88), zc + 0.95], 0.02, 0.02, 4);
      for (i = 0; i < 4; i++) { var xx = lerp(X(o.d3 + 0.9), X(o.d2 - 0.9), i / 3); box(B.metal, xx - 0.02, xx + 0.02, s * (o.w1 + 0.88) - 0.02, s * (o.w1 + 0.88) + 0.02, zc + 0.1, zc + 0.95); }
      cyl(B.metal, [X(o.d2), s * 0.4, zc + 0.6], [X(o.d2 - 1.6), s * 1.6, zc + 0.6], 0.04, 0.04, 5);
      box(B.dark, X(o.d2 - 1.55) - 0.12, X(o.d2 - 1.55) + 0.12, s * 1.6 - 0.12, s * 1.6 + 0.12, zc + 0.6, zc + 1.0);
    }
    cyl(B.metal, [X(o.d3 + 0.9), -o.w1 - 0.88, zc + 0.95], [X(o.d3 + 0.9), o.w1 + 0.88, zc + 0.95], 0.02, 0.02, 4);
    cyl(B.metal, [X(o.d2 - 0.9), -o.w1 - 0.88, zc + 0.95], [X(o.d2 - 0.9), o.w1 + 0.88, zc + 0.95], 0.02, 0.02, 4);
    /* upper column with the ESM boxes on its sides, then a short drum under the radome */
    var dmc = o.domeD;
    loft(B.hull, [oct(dmc - o.w2 * 1.1, dmc + o.w2 * 1.1, o.w2, zc + 0.1, 0.15), oct(dmc - o.w2, dmc + o.w2, o.w2 * 0.9, zu, 0.12)]);
    for (s = -1; s <= 1; s += 2) {
      box(B.hull, X(dmc + 0.75), X(dmc - 0.75), s * o.w2 - 0.45, s * o.w2 + 0.45, zu - 1.5, zu - 0.35);
      box(B.dark, X(dmc + 0.7), X(dmc - 0.7), s * (o.w2 + 0.46) - 0.02, s * (o.w2 + 0.46) + 0.02, zu - 1.4, zu - 0.45);
      box(B.dark, X(dmc - 0.76) - 0.02, X(dmc - 0.76) + 0.02, s * o.w2 - 0.38, s * o.w2 + 0.38, zu - 1.4, zu - 0.45);
    }
    /* the wide yard under the radome with antenna boxes at its arms and dipoles hanging below [OZ] */
    box(B.metal, X(dmc) - 0.06, X(dmc) + 0.06, -o.yard, o.yard, zu - 0.65, zu - 0.55);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X(dmc) - 0.2, X(dmc) + 0.2, s * o.yard - 0.18, s * o.yard + 0.18, zu - 0.95, zu - 0.45);
      for (i = 1; i <= 2; i++) cylZ(B.metal, X(dmc), s * (o.yard * i / 3), zu - 1.5, zu - 0.6, 0.02, 4);
    }
    cylZ(B.hull, X(dmc), 0, zu, o.domeZ - o.domeR * 0.55, o.domeR * 0.62, 20);
    dome(B.light, X(dmc), 0, o.domeZ, o.domeR, 12, 32, -Math.PI * 0.32);
    cylZ(B.dark, X(dmc), 0, o.domeZ - o.domeR * 0.86, o.domeZ - o.domeR * 0.8, o.domeR * 0.54, 20);
    /* pole mast abaft the radome with two yards */
    var xp = X(o.poleD);
    box(B.hull, xp - 0.3, xp + 0.3, -0.3, 0.3, zc, zc + 2.2);
    /* the pole is a slim lattice: four legs closing upward, a brace at every bay */
    var zl0 = zc + 2.2, zl1 = o.poleTop - 1.2, lg, bay, nb = 7, aL = 0.32, aT = 0.1;
    for (lg = 0; lg < 4; lg++) {
      var sx2 = lg < 2 ? -1 : 1, sy2 = (lg % 2) ? -1 : 1;
      cyl(B.metal, [xp + sx2 * aL, sy2 * aL, zl0], [xp + sx2 * aT, sy2 * aT, zl1], 0.035, 0.025, 5);
    }
    for (bay = 0; bay < nb; bay++) {
      var f0 = bay / nb, f1 = (bay + 1) / nb, a0 = lerp(aL, aT, f0), a1 = lerp(aL, aT, f1), zz0 = lerp(zl0, zl1, f0), zz1 = lerp(zl0, zl1, f1);
      for (s = -1; s <= 1; s += 2) {
        cyl(B.metal, [xp - a0, s * a0, zz0], [xp + a1, s * a1, zz1], 0.015, 0.015, 3);
        cyl(B.metal, [xp + s * a0, -a0, zz0], [xp + s * a1, a1, zz1], 0.015, 0.015, 3);
      }
    }
    cyl(B.metal, [xp, 0, zl1], [xp, 0, o.poleTop], 0.05, 0.03, 6);
    box(B.metal, xp - 0.04, xp + 0.04, -1.4, 1.4, o.poleTop - 2.6, o.poleTop - 2.52);
    box(B.metal, xp - 0.04, xp + 0.04, -0.9, 0.9, o.poleTop - 1.3, o.poleTop - 1.24);
    for (s = -1; s <= 1; s += 2) cylZ(B.metal, xp, s * 1.3, o.poleTop - 2.52, o.poleTop - 1.9, 0.04, 5);
    /* ladder rungs up the after face of the lower tower */
    for (i = 0; i < 9; i++) { var zz = z0 + 0.3 + i * 0.32; if (zz > zc - 0.2) break; box(B.metal, X(lerp(o.d1, o.d3, (zz - z0) / (zc - z0))) - 0.06, X(lerp(o.d1, o.d3, (zz - z0) / (zc - z0))), -0.25, 0.25, zz, zz + 0.04); }
  }

  /* sphere director on a stalk */
  function director(B, d, zr, zc, r) {
    cylZ(B.metal, X(d), 0, zr, zc - r * 0.7, 0.22, 10);
    cylZ(B.hull, X(d), 0, zc - r * 1.15, zc - r * 0.75, r * 0.85, 16);
    dome(B.light, X(d), 0, zc, r, 7, 18, -Math.PI * 0.4);
    box(B.dark, X(d) + r * 0.6, X(d) + r * 0.95, -0.3, 0.3, zc - 0.25, zc + 0.2);
  }

  /* bridge window ribbon on a raked front (from zA at dA to zB at dB) and down the sides */
  function windows(B, dF0, dF1, zw0, zw1, z0, z1, w0, w1, nSide, sideLen) {
    var j, s, f = function (z) { return clamp01((z - z0) / (z1 - z0)); };
    var dAt = function (z) { return lerp(dF0, dF1, f(z)); }, wAt = function (z) { return lerp(w0, w1, f(z)); };
    var n = Math.max(4, Math.round(wAt(zw0) * 2 / 0.95));
    for (j = 0; j < n; j++) {
      var ya = -wAt(zw1) + 0.15 + j * (2 * wAt(zw1) - 0.3) / n, yb = ya + (2 * wAt(zw1) - 0.3) / n - 0.1;
      var xa = X(dAt(zw0)) + 0.03, xb = X(dAt(zw1)) + 0.03;
      hexa(B.glass, [[xa - 0.06, ya, zw0], [xa + 0.02, ya, zw0], [xa + 0.02, yb, zw0], [xa - 0.06, yb, zw0],
                     [xb - 0.06, ya, zw1], [xb + 0.02, ya, zw1], [xb + 0.02, yb, zw1], [xb - 0.06, yb, zw1]]);
    }
    for (s = -1; s <= 1; s += 2) for (j = 0; j < nSide; j++) {
      var dd = dAt(zw1) + 0.6 + j * sideLen / nSide, ww = wAt(zw1);
      box(B.glass, X(dd + sideLen / nSide - 0.15), X(dd), s * ww - 0.03, s * ww + 0.03, zw0, zw1);
    }
  }

  /* ------------------------------------------------------------ Project 21631 Buyan-M */
  function addShip21(B) {
    var s, j, d, i;
    addHull(B);
    rails(B, 1.0, 18.4);
    rails(B, 65.4, CFG.L - 0.3);
    commonFit(B, 6.2, 65);
    var zg = zD(CFG.gun);
    cylZ(B.hull, TX, 0, zg - 0.05, zg + BARB, 1.45, 28);                           /* gun barbette */
    cylZ(B.dark, TX, 0, zg + BARB - 0.04, zg + BARB, 1.3, 28);
    /* house A: front foot d 18.9 on the forecastle, roof 7.0 m from d 20.8 to the after slope d 44.2-45.9 */
    house(B.hull, B.deck, 18.9, 20.8, 44.2, 45.9, 7.0, 0.42, 0.0, 4.3);
    /* house B: the after house on the main deck (2.4), roof 4.8, d 44.2-55.6 (front hidden in house A) */
    house(B.hull, B.deck, 44.0, 44.2, 54.8, 55.6, 4.8, 0.3, 0.0, 2.4);
    /* bridge tier on house A: raked front d 21.3 -> 22.7, roof 8.8, after slope d 43.3 -> 44.2 */
    tier(B.hull, B.deck, 21.2, 22.7, 43.3, 44.3, 6.98, 8.8, 4.05, 3.7);
    windows(B, 21.2, 22.7, 7.85, 8.45, 6.98, 8.8, 4.05, 3.7, 4, 6.5);
    roofRail(B, 23.4, 42.6, 3.55, 8.8);
    /* doors, ports and raft canisters on the flush house sides */
    for (s = -1; s <= 1; s += 2) {
      var wA = function (z) { return hD(30) - 0.42 * (z - 4.26) / 2.74; };
      var wB = function (z) { return hD(50) - 0.3 * (z - 2.36) / 2.44; };
      var wH = function (z) { return hD(20) + (tbl(CFG.HK, 20) - hD(20)) * (4.3 - z) / (4.3 - 2.55); };
      sidePanel(B.dark, 25.4, 26.4, 4.35, 6.3, wA, s);
      sidePanel(B.dark, 40.2, 41.2, 4.35, 6.3, wA, s);
      for (j = 0; j < 4; j++) sidePanel(B.glass, 30.25 + j * 1.6, 30.75 + j * 1.6, 5.7, 6.15, wA, s);
      sidePanel(B.dark, 49.5, 50.4, 2.85, 3.25, wB, s);              /* the two ports on house B [GS3] */
      sidePanel(B.dark, 50.9, 51.8, 2.85, 3.25, wB, s);
      sidePanel(B.dark, 19.4, 20.6, 3.85, 4.2, wH, s);               /* deck-edge openings */
      for (j = 0; j < 3; j++) cylY(B.light, X(46.4 + j * 0.75), s * (wB(4.0) - 0.3), s * (wB(4.0) + 0.12), 4.0, 0.26, 10);
      /* small pedestal mounts on the shoulders of the house front (published 14.5 mm MTPU) */
      var xm = X(21.6), ym = s * 3.3;
      cylZ(B.hull, xm, ym, 6.98, 7.55, 0.24, 10);
      box(B.dark, xm - 0.35, xm + 0.25, ym - 0.22, ym + 0.22, 7.55, 7.9);
      cyl(B.metal, [xm + 0.2, ym - 0.08, 7.75], [xm + 1.25, ym - 0.08, 8.15], 0.035, 0.035, 5);
      cyl(B.metal, [xm + 0.2, ym + 0.08, 7.75], [xm + 1.25, ym + 0.08, 8.15], 0.035, 0.035, 5);
    }
    /* tower d 27.8-34.1 on the bridge roof (after face near upright, front raked); radome centre d 31.5 at 16.3 m, r 1.45 ([GS3] 31.1, [VU] 32.2); pole d 33.9 to 21.3 m */
    tower(B, { d0: 27.8, d1: 34.1, d2: 29.6, d3: 33.6, w0: 2.25, w1: 1.15, z0: 8.8, zc: 12.0, zu: 14.75,
               domeD: 31.5, w2: 0.8, domeZ: 16.3, domeR: 1.45, poleD: 33.9, poleTop: 21.3, yard: 3.4 });
    director(B, 27.4, 8.8, 10.6, 0.65);
    /* drum with a domed top abaft the bridge tier (d 47.1, to 10.3 m) and the lamp globe on its pole (d 45.8); [GS3]/[VU] averaged */
    cylZ(B.hull, X(47.1), 0, 4.8, 7.6, 0.38, 12);
    cylZ(B.hull, X(47.1), 0, 7.6, 9.6, 0.72, 20);
    cylZ(B.dark, X(47.1), 0, 9.0, 9.06, 0.74, 20);
    dome(B.light, X(47.1), 0, 9.6, 0.72, 6, 20, 0);
    cyl(B.metal, [X(45.8), 0, 4.8], [X(45.8), 0, 10.45], 0.07, 0.04, 6);
    dome(B.light, X(45.8), 0, 10.75, 0.32, 6, 12);
    /* 3S14 VLS: eight lids, two rows of four, in a raised frame on house B's roof (d 48.1-52.3) [GS2] */
    var vz = 4.8, vx0 = X(52.3), vx1 = X(48.1);
    box(B.hull, vx0, vx1, -1.15, 1.15, vz, vz + 0.18);
    box(B.dark, vx0 + 0.02, vx1 - 0.02, -1.13, 1.13, vz + 0.18, vz + 0.19);
    for (j = 0; j < 4; j++) for (s = -1; s <= 1; s += 2) {
      var lx0 = vx0 + 0.1 + j * 1.0, lx1 = lx0 + 0.9, ly0 = s > 0 ? 0.06 : -1.05, ly1 = s > 0 ? 1.05 : -0.06;
      box(B.hull, lx0, lx1, ly0, ly1, vz + 0.19, vz + 0.26);
      box(B.metal, lx0 + 0.3, lx0 + 0.6, s * 1.02, s * 1.14, vz + 0.12, vz + 0.36);       /* outboard hinge brackets */
    }
    /* stowed launcher abaft the VLS (d 53.8): pedestal, cradle, two tubes visible pointing aft (type not confirmed) */
    var gx = X(53.8), gz = 4.8;
    block(B.hull, gx - 0.75, gx + 0.75, 0.85, gz, gx - 0.65, gx + 0.65, 0.75, gz + 0.65);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, gx - 0.45, gx + 0.45, s * 0.45 - 0.28, s * 0.45 + 0.28, gz + 0.65, gz + 1.05);
      cyl(B.light, [gx + 0.3, s * 0.45, gz + 0.95], [gx - 1.4, s * 0.45, gz + 1.5], 0.12, 0.12, 8);
    }
    roofRail(B, 46.0, 54.4, hD(50) - 0.42, 4.8);
    /* after deckhouse C: d 55.6-65.1 on the main deck, roof 4.4, walkways outboard */
    var zC = 4.4;
    tier(B.hull, B.deck, 55.2, 55.6, 64.2, 65.1, 2.36, zC, 4.25, 4.0);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X(58.2) - 0.45, X(58.2) + 0.45, s * 4.14 - 0.03, s * 4.14 + 0.03, 2.45, 4.1);
      box(B.dark, X(62.6) - 0.45, X(62.6) + 0.45, s * 4.08 - 0.03, s * 4.08 + 0.03, 2.45, 4.1);
      box(B.dark, X(57.1), X(55.9), s * (hD(56) - 0.05) - 0.03, s * (hD(56) - 0.05) + 0.03, 2.5, 2.9);  /* deck-edge freeing ports */
    }
    rails(B, 55.6, 65.4, function () { return 2.4; }, 0.12, 1.0);
    /* AK-630M-2 Duet on deckhouse C (d 61.0): low ring, box turret, TWO six-barrel guns one above the other,
       trained aft and slightly elevated */
    var dx = X(61.0), dz = zC;
    cylZ(B.hull, dx, 0, dz, dz + 0.35, 1.15, 22);
    cylZ(B.dark, dx, 0, dz + 0.33, dz + 0.38, 1.18, 22);
    hexa(B.hull, [[dx - 1.0, -0.95, dz + 0.38], [dx + 1.2, -0.95, dz + 0.38], [dx + 1.2, 0.95, dz + 0.38], [dx - 1.0, 0.95, dz + 0.38],
                  [dx - 0.75, -0.8, dz + 1.75], [dx + 0.9, -0.8, dz + 1.75], [dx + 0.9, 0.8, dz + 1.75], [dx - 0.75, 0.8, dz + 1.75]]);
    box(B.dark, dx - 0.82, dx - 0.74, -0.55, 0.55, dz + 0.55, dz + 1.6);
    var el = 0.12, ce = Math.cos(el), se = Math.sin(el);
    for (j = 0; j < 2; j++) {
      var bz = dz + 0.8 + j * 0.62;
      cyl(B.hull, [dx - 0.8, 0, bz], [dx - 1.25, 0, bz + 0.06], 0.22, 0.2, 12);
      for (i = 0; i < 6; i++) {
        var an = i / 6 * TAU, by = Math.cos(an) * 0.075, bh = Math.sin(an) * 0.075;
        cyl(B.metal, [dx - 1.2, by, bz + bh], [dx - 1.2 - 1.6 * ce, by, bz + bh + 1.6 * se], 0.024, 0.024, 6);
      }
      cyl(B.metal, [dx - 2.35, 0, bz + 0.14], [dx - 2.75, 0, bz + 0.19], 0.11, 0.11, 8);
    }
    /* team strips: bridge roof, house B roof, stern deck */
    box(B.team, X(26.0), X(24.3), -1.0, 1.0, 8.812, 8.83);
    box(B.team, X(47.0), X(46.5) + 1.2, 1.6, 2.8, 4.812, 4.83);
    box(B.team, X(70.6), X(69.0), 1.7, 2.8, 2.412, 2.43);
  }

  /* ------------------------------------------------------------ Project 21630 Buyan */
  function addShip20(B) {
    var s, j, d, i, k;
    addHull(B);
    rails(B, 1.0, 19.2);
    rails(B, 43.6, CFG.L - 0.3);
    commonFit(B, 5.4, 52);
    var zg = zD(CFG.gun);
    cylZ(B.hull, TX, 0, zg - 0.05, zg + BARB, 1.45, 28);
    cylZ(B.dark, TX, 0, zg + BARB - 0.04, zg + BARB, 1.3, 28);
    /* house: front foot d 19.7, roof 6.6 at d 20.7, to d 33.2 (aft face nearly upright) */
    house(B.hull, B.deck, 19.7, 20.7, 32.9, 33.3, 6.6, 0.38, 0.0, 3.75);
    /* bridge tier d 20.7-31.6, roof 7.85, inset; window ribbon round its front */
    tier(B.hull, B.deck, 20.75, 21.1, 31.2, 31.6, 6.58, 7.85, 3.85, 3.65);
    windows(B, 20.75, 21.1, 7.1, 7.6, 6.58, 7.85, 3.85, 3.65, 4, 5.0);
    roofRail(B, 21.8, 31.0, 3.5, 7.85);
    /* low deckhouse d 33.2-43.3 on the 2.65 m deck, roof 4.6 m, flush sides */
    house(B.hull, B.deck, 33.0, 33.2, 42.9, 43.3, 4.6, 0.25, 0.0, 2.65);
    for (s = -1; s <= 1; s += 2) {
      var wA = function (z) { return hD(26) - 0.38 * (z - 3.71) / 2.89; };
      var wL = function (z) { return hD(38) - 0.25 * (z - 2.61) / 1.99; };
      sidePanel(B.dark, 23.8, 24.8, 3.7, 5.6, wA, s);
      for (j = 0; j < 3; j++) sidePanel(B.glass, 26.8 + j * 1.5, 27.25 + j * 1.5, 5.0, 5.45, wA, s);
      sidePanel(B.dark, 36.2, 37.2, 2.65, 4.3, wL, s);
      for (j = 0; j < 3; j++) cylY(B.light, X(39.4 + j * 0.75), s * (wL(3.6) - 0.3), s * (wL(3.6) + 0.1), 3.6, 0.26, 10);
    }
    /* tower d 28.3-31.9; radome centre d 30.2 at 13.55 m, r 1.38; pole to 17.2 m; yard platform 11.4 m */
    tower(B, { d0: 28.3, d1: 31.9, d2: 28.9, d3: 31.6, w0: 2.0, w1: 1.05, z0: 7.85, zc: 10.9, zu: 11.9,
               domeD: 30.2, w2: 0.7, domeZ: 13.55, domeR: 1.38, poleD: 31.9, poleTop: 17.2, yard: 2.6 });
    director(B, 24.3, 7.85, 9.3, 0.62);
    /* the two whip antennas on the bridge roof front [AST, SIL] */
    for (s = -1; s <= 1; s += 2) cyl(B.metal, [X(22.1), s * 2.9, 7.85], [X(22.1), s * 2.9, 15.7], 0.05, 0.02, 5);
    /* two AK-306 drums on the low deckhouse, staggered d 36.7 / 38.3 (which is to port not confirmed) */
    var drums = [[36.7, -1.45], [38.4, 1.45]];
    for (k = 0; k < 2; k++) {
      var ax = X(drums[k][0]), ay = drums[k][1], az = 4.6;
      cylZ(B.hull, ax, ay, az, az + 0.25, 0.78, 18);
      cylZ(B.hull, ax, ay, az + 0.25, az + 0.95, 0.66, 18);
      dome(B.hull, ax, ay, az + 0.95, 0.66, 4, 18, 0);
      cyl(B.hull, [ax - 0.45, ay, az + 0.75], [ax - 0.95, ay, az + 0.8], 0.2, 0.17, 10);
      for (i = 0; i < 6; i++) {
        var an = i / 6 * TAU;
        cyl(B.metal, [ax - 0.9, ay + Math.cos(an) * 0.07, az + 0.8 + Math.sin(an) * 0.07], [ax - 1.75, ay + Math.cos(an) * 0.07, az + 0.86 + Math.sin(an) * 0.07], 0.022, 0.022, 4);
      }
    }
    /* small pedestal mount at the aft end of the low deckhouse (d 43.0; published 14.5 mm MTPU) */
    var mx = X(42.8), mz = 4.6;
    cylZ(B.hull, mx, 0, mz, mz + 0.55, 0.3, 12);
    box(B.dark, mx - 0.3, mx + 0.3, -0.26, 0.26, mz + 0.55, mz + 0.95);
    for (s = -1; s <= 1; s += 2) cyl(B.metal, [mx - 0.2, s * 0.1, mz + 0.8], [mx - 1.3, s * 0.1, mz + 1.15], 0.035, 0.035, 5);
    roofRail(B, 33.8, 42.4, hD(38) - 0.35, 4.6);
    /* after deck: low box d 43.5-46, the wedge housing d 48.8-51.3 to 4.9 m with its frame, Grad-M d 52-55.3 */
    var za = 2.3;
    tier(B.hull, B.deck, 43.6, 43.9, 45.7, 46.0, za, 3.4, 2.4, 2.2);
    tier(B.hull, B.deck, 48.5, 49.1, 51.1, 51.4, za, 4.9, 2.2, 1.7);
    box(B.dark, X(50.9), X(49.3), -1.5, 1.5, 4.9, 4.96);
    for (s = -1; s <= 1; s += 2) box(B.metal, X(51.0), X(49.2), s * 1.6 - 0.04, s * 1.6 + 0.04, 4.9, 5.45);
    box(B.metal, X(49.25), X(49.15), -1.6, 1.6, 5.4, 5.46);
    /* Grad-M (A-215): base box, trunnion, 40-round box (8 x 5 tubes) elevated 35 deg, trained aft */
    tier(B.hull, B.deck, 51.0, 51.3, 55.9, 56.3, za, 3.8, 1.6, 1.4);
    var el = 0.61, ue = [-Math.cos(el), 0, Math.sin(el)], ve = [0, 1, 0], we = [Math.sin(el), 0, Math.cos(el)];
    var P0 = [X(54.0), 0, 4.15];
    cylY(B.metal, X(54.0), -1.25, 1.25, 4.15, 0.13, 10);
    obox(B.hull, P0, ue, ve, we, -0.4, 3.0, -1.08, 1.08, -0.05, 0.95);
    obox(B.dark, P0, ue, ve, we, 2.98, 3.02, -1.0, 1.0, 0.03, 0.87);
    for (j = 0; j < 8; j++) for (k = 0; k < 5; k++) {
      var cy = -0.875 + j * 0.25, cw = 0.1 + k * 0.17;
      var c = [P0[0] + ue[0] * 3.0 + we[0] * cw, cy, P0[2] + ue[2] * 3.0 + we[2] * cw];
      cyl(B.metal, c, [c[0] + ue[0] * 0.12, cy, c[2] + ue[2] * 0.12], 0.07, 0.07, 5);
    }
    /* team strips: bridge roof, after deck */
    box(B.team, X(26.6), X(25.0), -1.0, 1.0, 7.862, 7.88);
    box(B.team, X(59.0), X(57.5), 1.5, 2.6, 2.312, 2.33);
  }

  /* ------------------------------------------------------------ the A-190 (group "turret", origin on the axis)
     faceted stealth shield 4.9 x 2.9 x 2.25 m, sloping front and roof, flat sides tumbling in; L/59 barrel   */
  function addTurret(B) {
    var i, s;
    function sec(x, w0, w1, zt, zb) { return [[x, -w0, zb], [x, w0, zb], [x, w1, zt * 0.55], [x, w1 * 0.86, zt], [x, -w1 * 0.86, zt], [x, -w1, zt * 0.55]]; }
    loft(B.paint, [sec(-2.45, 1.25, 1.3, 1.55, 0.0), sec(-2.1, 1.38, 1.4, 2.2, 0.0), sec(0.6, 1.42, 1.38, 2.2, 0.0),
                   sec(1.75, 1.36, 1.15, 1.55, 0.0), sec(2.4, 1.1, 0.75, 0.75, 0.05)]);
    /* gun port, mantlet, barrel with muzzle brake */
    box(B.dark, 1.85, 2.05, -0.38, 0.38, 0.55, 1.25);
    cylX(B.paint, 1.9, 2.75, 0, 0.92, 0.3, 0.24, 14);
    cylX(B.dark, 2.7, 3.2, 0, 0.92, 0.19, 0.15, 14);
    cylX(B.metal, 3.15, 7.95, 0, 0.92, 0.09, 0.078, 12);
    cylX(B.dark, 7.9, 8.2, 0, 0.92, 0.115, 0.1, 12);
    /* roof sight, hatch, side doors and the training ring */
    box(B.dark, -0.2, 0.5, 0.55, 0.95, 2.2, 2.34);
    box(B.glass, 0.48, 0.53, 0.6, 0.9, 2.24, 2.32);
    box(B.dark, -1.4, -0.6, -0.85, -0.35, 2.2, 2.25);
    for (s = -1; s <= 1; s += 2) box(B.dark, -1.5, -0.7, s * 1.395 - 0.02, s * 1.395 + 0.02, 0.35, 1.45);
    cylZ(B.dark, 0, 0, -0.02, 0.05, 1.32, 24);
  }

  function bins(T, names) { var o = {}; names.forEach(function (n) { o[n] = new Bin(T[n]); }); return o; }

  function build(THREE, M, C, which) {
    var T = materials(THREE, C), g = new THREE.Group(), v = which === "b21";
    CFG = HULLS[which]; L = CFG.L; X0 = -L / 2; X1 = L / 2;
    TX = X(CFG.gun);
    var HB = bins(T, ["hull", "blk", "boot", "deck", "light", "dark", "metal", "glass", "team"]);
    if (v) addShip21(HB); else addShip20(HB);
    flush(THREE, g, HB);
    var TB = { paint: new Bin(T.hull), dark: new Bin(T.dark), metal: new Bin(T.metal), glass: new Bin(T.glass) };
    addTurret(TB);
    var wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(TX, 0, zD(CFG.gun) + BARB);
    flush(THREE, wg, TB);
    g.add(wg);
    return g;
  }
  return { build: build };
})();

UNIT_MODELS["boat_p"] = {
  len: 62,
  build: function (THREE, M, C) { return HeroBuyan.build(THREE, M, C, "b20"); }
};
UNIT_MODELS["pact_e00_missileboat"] = {
  len: 74.1,
  build: function (THREE, M, C) { return HeroBuyan.build(THREE, M, C, "b21"); }
};
