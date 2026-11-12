/* ==================== js/hero/kpa_e90_missileboat.js ======================
   HERO MODEL -- Soju-class missile boat (KPA; the DPRK-built, lengthened derivative of the Soviet
   Project 205 Osa I).  Key (unchanged): kpa_e90_missileboat (js/eras.js "Soju-class", service 1981).
   The same builder serves kpa_e80_missileboat (js/hero/roc_kpa_reuse.js, keyBuild of this key) and
   missileboat_k (js/hero/skirmish_reuse.js copies this key's entry).  All three are the same class.

   FULL-QUALITY REDO 2026-11-12.  The first version (407 meshes, 407 draw calls, 12 materials) was an
   Osa I drawn at 39 m off Osa photographs, with the pennant number "421" painted on both bows.  This
   one is measured off the one drawing of the SOJU found, scaled from its published length, merged one
   mesh per material, with no numbers or markings (review policy rule 6).
   Not a reuse of js/hero/ru_osa_boat.js (rule 5): the Soju is not the Osa's hull - 42.1 m against
   38.6 m, a higher bow, taller launchers, the Drum Tilt raised over them, a pylon mast - so the
   Osa module's builder (which takes no options) cannot draw it.  Its geometry kit (Bin, solid, box,
   cyl, loft, ellipsoid, obox, flush, the plate and deck canvases) is copied, as js/hero/kpa_ships.js
   does, and the AK-230 and the Drum Tilt are drawn the way that file draws them.

   REFERENCES
     [HB]  US Department of Defense, "North Korea Country Handbook" (1997), page A-188 "SOJU PTG"
           (PDF page 360; public domain; cached in scratchpad/q_kpaship2_ref/pdf/handbook.pdf, the page
           image extracted to scratchpad/q_rb2/ref/sj-000.jpg, 488 x 388 px): a starboard profile line
           drawing (bow right) labelled 30mm (fore and aft), Wheelhouse, Pylon mast, DRUM TILT, SSM
           (2 pt, 2 stbd), and a silhouette under it.  THE MASTER: every height and station below.
           Scale from the published length over the drawn hull, transom top px 9 to stem head px 483 =
           474 px = 42.1 m: 0.0888 m a pixel.  Waterline (the drawn bottom line) y 190.
           d = (px - 9) * 0.0888 m forward of the transom, z = (190 - py) * 0.0888; model x = d - 21.05.
     [HBT] the same page's table: LOA / beam / draft 138.1 x 25.6 x 9.8 ft = 42.1 x 7.80 x 3.0 m;
           4 x CSS-N-1 single-tube SSM, 2 x 30 mm twin, 33 kn.
     The handbook text (p. 39): "10 DPRK versions of the OSA-1 called the SOJU"; the Osa I layout
     (four box launchers in two tandem pairs, the AK-230s fore and aft, the Drum Tilt on the centreline
     between the after pair) is therefore taken from ru_osa_boat.js's [DDR] where [HB] has no plan.
   MEASURED off [HB] (d forward of the transom; z above the waterline):
     sheer 1.87 at the transom, 1.95 at d 8, 2.15 at d 17, 2.55 at d 21, 3.00 at d 25.8, 3.35 at d 29.4,
       3.60 at d 34.7, 3.72 at d 39.2, the stem head 3.66 at d 42.1; stem raked to the waterline at
       d 39.3; the knuckle (spray chine) line meets the waterline at d 29.8 and runs up to 2.04 m at d 40.9
     after gun platform d 1.2 - 3.5, top 3.55; after AK-230 on it at d 2.4, trained astern
     after launcher pair: tail d 3.64 (roof 4.71, foot 2.22), roof rising to d 9.4 (6.04), the hipped door
       down to the nose at d 12.1 (3.55); the box about 2.5 m deep, its front on a frame
     Drum Tilt at d 8.0 on a pedestal over the after pair: platform 6.2, drum centre 8.0
     casing between the pairs d 9.9 - 15.0, roof 5.0, a vertical trunk at d 12.6 - 13.3 to 5.5
     forward launcher pair: tail d 15.0 (roof 4.88, foot 2.66), roof to d 20.5 (5.95), nose d 23.0 (3.8)
     pylon mast at d 21.95 from 5.25 to the head box at 10.8 - 11.8; a box on a bracket aft (d 19.8 -
       21.6, z 8.4 - 9.9), a box forward (d 22.7 - 24.5, z 9.3 - 10.5), a platform at 8.1
     wheelhouse: after step d 21.0 - 24.5 (roof 5.25), the house d 24.5 - 28.8 (roof 5.6), the door at
       d 25.0 - 25.7, two fittings on the roof (d 24.5 to 6.5, d 27.4 to 6.2)
     whip aerials at d 19.8 and d 27.0, both to about 11.9
     forward AK-230 at d 31.6, its base ring 0.3 m, the mount 1.5 m tall; a capstan at d 29.8
   WHERE THE DRAWING AND THE OSA DISAGREE: at [HB]'s 42.1 m scale the AK-230 comes out 2.3 m across
     (the Osa's [DDR] 2.0 m) and each launcher 8.5 m long and 2.5 m deep (the Osa's KT-97, 7.5 m and
     about 1.8 m at the tail).  Drawn as [HB] measures (rule 2: one drawing, one published dimension).
     Either the Soju's launchers are larger housings, or [HB]'s artist drew the parts about 13 per cent
     large: NOT CONFIRMED which.
   RECOGNITION LIST: 1 the long flush-decked hull with the sheer climbing steeply to a high raked bow
     [HB]; 2 four big box launchers in two tandem pairs, tilted up toward the bow, hipped front doors
     [HB]; 3 the Drum Tilt drum raised high on a pedestal over the after pair [HB]; 4 the wheelhouse well
     forward with the pylon mast at its after end and its boxes [HB]; 5 the two tall whips [HB]; 6 the
     two AK-230s, the after one raised on a platform [HB]; 7 no funnel [HB].
   PAINT: no colour photograph of a Soju was found.  Drawn in the KPN grey js/hero/kpa_ships.js takes
     from its Najin photograph (hull 0x8f9593, superstructure and launchers 0x9ba19f, deck 0x7d8280),
     a dark red-brown underbody.  No pennant numbers (the first version's "421" is gone), no flags,
     ensigns or markings.  Team colour (C.team, exactly) as two small strips on up-facing surfaces: the
     wheelhouse roof and the casing roof between the launcher pairs.
   NOT CONFIRMED (no plan, no body plan, no photograph): the deck plan and every half-breadth (the Osa
     I's [DDR] plan stretched 42.1 / 38.6 lengthwise and 7.8 / 7.5 across); the underwater body (the
     Osa's chine and keel depths, keel 2.1 m deep amidships; the published 3.0 m draught is taken to be
     to the screws); three shafts, three screws, two rudders (the Osa's); the launcher widths and their
     inboard edges (the Osa's, scaled); the gun platform's and casings' widths; which radar the
     masthead box is (drawn as a flat box, as the Osa's Square Tie) and what the two mast boxes are;
     the paint (above); the launcher size discrepancy (above).
   NOT DRAWN: lifelines, hatches, bollards and the anchor ([HB] shows none); the small fitting on the
     transom [HB] (not identifiable); crew; flags.
   API: UNIT_MODELS["kpa_e90_missileboat"] (len 42.10, the measured X extent); the global HeroKpaSoju
     ({ build, L }).  The row is not turret:true, but the first version named the forward AK-230
     "turret" and that node is kept: one group named "turret" holding the forward AK-230, origin on its
     ring at the top of its base, barrels along local +X.  No launcher node is read by the engine
     (render3d.js reads "podelev" only on the M270 / HIMARS rows); the launchers are baked.
   Materials: hull, sup, under, deck, dark, metal, glass, team (8 meshes) + the turret's sup, dark,
     metal (3): 11 draw calls.
   MODEL SPACE: +X bow, +Y port, +Z up, metres, WATERLINE z = 0.  ASCII only.
   LOAD ORDER: none (self-contained).  roc_kpa_reuse.js and skirmish_reuse.js load after this file.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKpaSoju = (function () {
  "use strict";
  var TAU = Math.PI * 2, PI = Math.PI, LOA = 42.1, X0 = -LOA / 2;
  function X(d) { return X0 + d; }            /* x at d metres forward of the transom */

  /* ================================================================ kit (ru_osa_boat.js, copied) */
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
    if (a0 > -PI / 2 + 1e-3) {
      var zb = R[0][0][2], cb = [C[0], C[1], zb];
      for (k = 0; k < seg; k++) bin.tri(cb, R[0][(k + 1) % seg], R[0][k], [0, 0, -1], [0, 0, -1], [0, 0, -1]);
    }
  }
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

  /* ================================================================ canvas paint (as ru_osa_boat.js) */
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
  /* plating, 16 m square: strakes every 1 m, butts every 2.5 m staggered, weathering, rust streaks */
  function drawPlate(g, S) {
    var R = rng(1981), i, k, m = S / 16;
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
    for (i = 0; i < 30; i++) {
      g.globalAlpha = 0.05 + R() * 0.07; g.fillStyle = "#5b4e44";
      g.fillRect(R() * S, R() * S, 0.08 * m, (0.4 + R() * 1.2) * m);
    }
    g.globalAlpha = 1;
  }
  function drawDeck(g, S) {
    var R = rng(19811), i, j, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 11; i++) for (j = 0; j < 8; j++) {
      g.fillStyle = "rgba(0,0,0," + (0.02 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(i * 1.5 * m + 2, j * 2 * m + 2, 1.5 * m - 4, 2 * m - 4);
    }
    g.fillStyle = "rgba(40,30,26,0.26)";
    for (i = 0; i <= 11; i++) g.fillRect(i * 1.5 * m - 1, 0, 2, S);
    for (j = 0; j <= 8; j++) g.fillRect(0, j * 2 * m - 1, S, 2);
  }
  /* the KPN grey of js/hero/kpa_ships.js (its Najin photograph); no Soju colour reference exists */
  function materials(THREE, C) {
    var plate = canvasTex(THREE, "soju_plate", drawPlate), deckT = canvasTex(THREE, "soju_deck", drawDeck);
    function mk(c, r, m, map) {
      var o = { color: c, roughness: r, metalness: m };
      if (map) o.map = map;
      return new THREE.MeshStandardMaterial(o);
    }
    return {
      hull: mk(0x8f9593, 0.82, 0.08, plate),
      sup: mk(0x9ba19f, 0.8, 0.08, plate),       /* launchers, casings, house, mast, guns */
      under: mk(0x3a2826, 0.88, 0.04),           /* underbody (not confirmed) */
      deck: mk(0x7d8280, 0.95, 0.04, deckT),
      dark: mk(0x22272a, 0.75, 0.3),             /* recesses, the launcher frames, slots, doors */
      metal: mk(0x4b5257, 0.5, 0.55),            /* barrels, whips, struts, screws */
      glass: mk(0x141c22, 0.15, 0.4),
      team: mk((C && C.team !== undefined) ? C.team : 0x3f7fd0, 0.84, 0.06)
    };
  }

  /* ================================================================ the hull
     ZD (sheer), CZ above the waterline (the knuckle line) and the stem: [HB], as measured in the header.
     HD / CH (half-breadths) and the underwater CZ / KZ: the Osa I's [DDR] tables (ru_osa_boat.js),
     stretched 42.1 / 38.6 lengthwise and 7.8 / 7.5 across - NOT CONFIRMED (no plan or body plan). */
  var SL = LOA / 38.6, SB = 7.8 / 7.5;
  function osa(T, kz) { return T.map(function (p) { return [p[0] * SL, p[1] * (kz ? 1 : SB)]; }); }
  var ZD = [[0, 1.87], [8, 1.95], [14, 2.05], [17, 2.15], [21, 2.55], [25.8, 3.0], [29.4, 3.35], [34.7, 3.6],
            [39.2, 3.72], [42.1, 3.66]];
  var HD = osa([[0, 3.56], [2, 3.62], [5, 3.69], [14, 3.72], [19, 3.75], [24, 3.69], [27.5, 3.63], [29.4, 3.5], [30.4, 3.38],
                [31.4, 3.26], [32.4, 3.13], [33.4, 2.89], [34.4, 2.64], [35.3, 2.27], [36.3, 1.75], [37.3, 1.11], [38.3, 0.18], [38.6, 0.02]]);
  var CH = osa([[0, 3.35], [5, 3.45], [20, 3.5], [25, 3.42], [28, 3.2], [31, 2.75], [33.4, 2.2], [35.3, 1.5], [36.3, 0.95], [37.3, 0.32], [38.6, 0.01]]);
  var CZ = [[0, -0.85], [11, -0.9], [22, -0.95], [27, -0.55], [29.8, 0.0], [33, 0.55], [36, 1.05], [38.5, 1.5], [40.9, 2.04], [42.1, 3.66]];
  var KZ = osa([[0, -1.0], [0.5, -1.15], [1.0, -1.35], [2, -1.5], [5, -1.57], [10, -1.65], [15, -1.75], [20, -1.9], [25, -2.03], [30, -2.1],
                [32.4, -1.95], [33.4, -1.8], [34.4, -1.5]], true).concat([[38.5, -0.95], [39.0, -0.4], [39.3, 0.0], [40.0, 0.92], [41.0, 2.22], [42.1, 3.66]]);
  function zD(d) { return tbl(ZD, d); }
  function hD(d) { return tbl(HD, d); }
  /* one half section, deck edge to keel (Osa form): deck edge, flare, chine, convex bottom, keel; a
     waterline point is inserted so the boot top lies on z = 0 */
  function half(d) {
    var zd = zD(d), hd = hD(d), hc = Math.min(tbl(CH, d), hd), zc = tbl(CZ, d), kz = tbl(KZ, d);
    if (zc < kz + 0.02) zc = kz + 0.02;
    if (zc > zd - 0.05) zc = zd - 0.05;
    var fw = Math.max(0, Math.min(1, (d - 28) / 11));
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
    var ds = [0, 0.5, 1.0, 2, 3.5, 5, 7, 9, 11, 13.5, 16, 18.5, 21, 23.5, 26, 28, 29.8, 31.5, 33, 34.3, 35.5, 36.5,
              37.5, 38.3, 39.0, 39.6, 40.2, 40.8, 41.3, 41.8, 42.1], i, k;
    var H = ds.map(half);
    function bin(a, b, c) { return (a[2] + b[2] + c[2]) / 3 < -0.005 ? B.under : B.hull; }
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
    var T0 = H[0], x0 = X(0), cz0 = zD(0), s2;
    for (s2 = -1; s2 <= 1; s2 += 2) for (k = 0; k + 1 < 6; k++) {
      var a = [x0, s2 * T0[k][0], T0[k][1]], b = [x0, s2 * T0[k + 1][0], T0[k + 1][1]];
      var c = [x0, 0, (T0[k][1] + T0[k + 1][1]) / 2 > 0 ? cz0 : T0[5][1]];
      if (T0[k][1] > 0.001 && T0[k + 1][1] < -0.001) c = [x0, 0, 0];
      var cc = cross(sub(b, a), sub(c, a));
      if (dot(cc, cc) < 1e-12) continue;
      var bn = (a[2] + b[2] + c[2]) / 3 < -0.005 ? B.under : B.hull;
      if (cc[0] < 0) bn.tri(a, b, c); else bn.tri(a, c, b);
    }
    var tq = [[x0, T0[0][0], T0[0][1]], [x0, -T0[0][0], T0[0][1]], [x0, 0, 0]];
    var cq = cross(sub(tq[1], tq[0]), sub(tq[2], tq[0]));
    if (cq[0] < 0) B.hull.tri(tq[0], tq[1], tq[2]); else B.hull.tri(tq[0], tq[2], tq[1]);
    /* toe rail along the deck edge */
    var s, d;
    for (s = -1; s <= 1; s += 2) {
      var rr = [];
      for (d = 0.2; d < 41.75; d += 1.6) {
        var dd = Math.min(d, 41.7), y0 = s * (hD(dd) - 0.02), z0 = zD(dd);
        rr.push([[X(dd), y0, z0 - 0.02], [X(dd), y0 + s * 0.06, z0 - 0.02], [X(dd), y0 + s * 0.06, z0 + 0.1], [X(dd), y0, z0 + 0.1]]);
      }
      loft(B.hull, rr);
    }
  }

  /* a block standing on the deck from dA to dB, half width hw, flat roof at zt (inset t at the roof) */
  function slab(bin, dA, dB, hw, zt, tw) {
    var t = tw === undefined ? 0.06 : tw;
    hexa(bin, [[X(dA), -hw, zD(dA) - 0.05], [X(dB), -hw, zD(dB) - 0.05], [X(dB), hw, zD(dB) - 0.05], [X(dA), hw, zD(dA) - 0.05],
               [X(dA) + t, -hw + t, zt], [X(dB) - t, -hw + t, zt], [X(dB) - t, hw - t, zt], [X(dA) + t, hw - t, zt]]);
  }

  /* ================================================================ box launcher [HB]
     L = { d0: after end, aR: roof length to the front top edge, aN: to the nose, zt0 / zt1: roof at the
     tail / at the front top, zf0: the foot at the tail, zN: the nose }.  A box of constant depth tilted up
     toward the bow (its foot rises with its roof), rounded top edges as the KT-97 [DDR], the hipped door
     raked from the roof's front edge down to the nose, the raised front carried on a dark open frame. */
  function launcher(B, L, yi, yo, s) {
    var H = L.zt0 - L.zf0, yc = s * (yi + yo) / 2, hw0 = (yo - yi) / 2;
    function ztop(a) {
      if (a < 0.3) return L.zt0 - 0.3 + Math.sqrt(Math.max(0, a / 0.3)) * 0.3;
      if (a <= L.aR) return lerp(L.zt0, L.zt1, a / L.aR);
      return lerp(L.zt1, L.zN + 0.06, (a - L.aR) / (L.aN - L.aR));
    }
    function zbot(a) { return a <= L.aR ? ztop(Math.max(a, 0.3)) - H : L.zt1 - H; }
    function sec(a) {
      var x = X(L.d0 + a), zb = zbot(a), zt = ztop(a), w = a <= L.aR ? 1 : lerp(1, 0.86, (a - L.aR) / (L.aN - L.aR)), hw = hw0 * w;
      var h = Math.max(0.02, zt - zb), ro = Math.min(0.85, h * 0.9, hw * 0.9), ri = Math.min(0.45, h * 0.9, hw * 0.5);
      var yO = yc + s * hw, yI = yc - s * hw, P = [], k;
      P.push([x, yI, zb], [x, yO, zb]);
      for (k = 0; k <= 4; k++) { var t = k / 4 * PI / 2; P.push([x, yO - s * ro * (1 - Math.cos(t)), zt - ro * (1 - Math.sin(t))]); }
      for (k = 0; k <= 4; k++) { var t2 = k / 4 * PI / 2; P.push([x, yI + s * ri * (1 - Math.sin(t2)), zt - ri * (1 - Math.cos(t2))]); }
      return P;
    }
    var aD = L.aN - L.aR, as = [0, 0.1, 0.3, L.aR * 0.3, L.aR * 0.6, L.aR - 0.15, L.aR, L.aR + aD * 0.3, L.aR + aD * 0.65, L.aN - 0.08, L.aN];
    loft(B.sup, as.map(sec));
    /* four stiffeners on the outboard face, parallel to the roof ([HB]'s stripes) */
    var k;
    for (k = 0; k < 4; k++) {
      var dz = 0.55 + k * 0.45, yy = yc + s * (hw0 + 0.025);
      cyl(B.sup, [X(L.d0 + 0.6), yy, ztop(0.6) - dz], [X(L.d0 + L.aR - 0.3), yy, ztop(L.aR - 0.3) - dz], 0.035, 0.035, 4);
    }
    /* the fold across the door and two hinge rails on it */
    cyl(B.dark, [X(L.d0 + L.aR + 0.02), yc - s * hw0 * 0.95, L.zt1 - 0.3], [X(L.d0 + L.aR + 0.02), yc + s * hw0 * 0.95, L.zt1 - 0.3], 0.03, 0.03, 4);
    for (k = -1; k <= 1; k += 2) {
      var yr = yc + k * 0.45;
      cyl(B.metal, [X(L.d0 + L.aR - 1.0), yr, ztop(L.aR - 1.0) + 0.12], [X(L.d0 + L.aR + aD * 0.75), yr, ztop(L.aR + aD * 0.75) + 0.1], 0.045, 0.045, 5);
    }
    /* the open frame under the raised part: a dark recess from the deck to the box's foot, and two posts */
    var a0 = Math.max(0.6, L.aR * 0.35), a1 = L.aN - 0.35, hwF = hw0 * 0.82;
    hexa(B.dark, [[X(L.d0 + a0), yc - hwF, zD(L.d0 + a0) - 0.05], [X(L.d0 + a1), yc - hwF, zD(L.d0 + a1) - 0.05],
                  [X(L.d0 + a1), yc + hwF, zD(L.d0 + a1) - 0.05], [X(L.d0 + a0), yc + hwF, zD(L.d0 + a0) - 0.05],
                  [X(L.d0 + a0), yc - hwF, zbot(a0) + 0.02], [X(L.d0 + a1), yc - hwF, zbot(a1) + 0.02],
                  [X(L.d0 + a1), yc + hwF, zbot(a1) + 0.02], [X(L.d0 + a0), yc + hwF, zbot(a0) + 0.02]]);
    for (k = -1; k <= 1; k += 2) {
      var yp = yc + k * hw0 * 0.9;
      box(B.sup, X(L.d0 + a1) - 0.14, X(L.d0 + a1), yp - 0.07, yp + 0.07, zD(L.d0 + a1) - 0.05, zbot(a1) + 0.02);
    }
    if (zbot(0.3) - zD(L.d0) > 0.08)                                 /* the after foot on the deck */
      box(B.dark, X(L.d0 + 0.25), X(L.d0 + a0), yc - hwF, yc + hwF, zD(L.d0) - 0.05, zbot(0.3) + 0.02);
  }

  /* ================================================================ twin 30 mm AK-230 (ru_osa_boat.js's form)
     origin (xc, 0, zc) at the foot of the mount; f = +1 trained ahead, -1 astern; el = barrel elevation */
  function ak230(B, xc, zc, f, el) {
    var i;
    function P(x, y, z) { return [xc + f * x, f * y, zc + z]; }
    cyl(B.sup, P(0, 0, 0), P(0, 0, 0.82), 0.93, 0.74, 20);
    for (i = 0; i < 12; i++) {
      var t = (i + 0.5) / 12 * TAU, ct = Math.cos(t), st = Math.sin(t);
      cyl(B.sup, P(0.95 * ct, 0.95 * st, 0.02), P(0.76 * ct, 0.76 * st, 0.8), 0.045, 0.035, 3);
    }
    cyl(B.dark, P(0, 0, 0.82), P(0, 0, 0.9), 0.76, 0.76, 20);
    for (i = -1; i <= 1; i += 2) ellipsoid(B.sup, P(-0.05, i * 0.4, 0.9), 0.66, 0.36, 0.62, 6, 14, 0, PI / 2);
    ellipsoid(B.sup, P(-0.32, 0, 0.9), 0.38, 0.3, 0.5, 4, 10, 0, PI / 2);
    obox(B.dark, P(0, 0, 0), [f, 0, 0], [0, f, 0], [0, 0, 1], 0.05, 0.6, -0.17, 0.17, 0.95, 1.36);
    var ce = Math.cos(el), se = Math.sin(el);
    for (i = -1; i <= 1; i += 2) {
      var y = i * 0.11, z = 1.15;
      cyl(B.metal, P(0.45, y, z), P(0.45 + 1.75 * ce, y, z + 1.75 * se), 0.045, 0.04, 6);
      cyl(B.metal, P(0.45 + 1.55 * ce, y, z + 1.55 * se), P(0.45 + 1.8 * ce, y, z + 1.8 * se), 0.06, 0.06, 6);
    }
    obox(B.sup, P(0, 0, 0), [f, 0, 0], [0, f, 0], [0, 0, 1], -0.55, -0.15, -0.2, 0.2, 1.38, 1.5);   /* sight hood */
  }

  /* ================================================================ Drum Tilt [HB] (ru_osa_boat.js's form)
     a pedestal from the casing roof zc, a railed platform at zp, the mount, the drum about 1.85 m above */
  function drumTilt(B, d, zc, zp) {
    var x = X(d), k;
    cylZ(B.sup, x, 0, zc, zp - 0.05, 0.5, 14);
    cyl(B.sup, [x, 0, zc], [x, 0, zc + 0.3], 0.75, 0.55, 14);
    box(B.sup, x - 1.4, x + 1.4, -1.05, 1.05, zp - 0.08, zp);
    for (k = 0; k < 4; k++) {
      var sx = k < 2 ? -1 : 1, sy = k % 2 ? -1 : 1;
      cyl(B.metal, [x + sx * 0.4, sy * 0.4, zp - 0.9], [x + sx * 1.2, sy * 0.95, zp - 0.08], 0.03, 0.03, 4);
    }
    var C4 = [[-1.4, -1.0], [1.4, -1.0], [1.4, 1.0], [-1.4, 1.0]];
    for (k = 0; k < 4; k++) {                                     /* [HB] draws the rail round the platform */
      var p = C4[k], q = C4[(k + 1) % 4];
      cyl(B.metal, [x + p[0], p[1], zp + 0.6], [x + q[0], q[1], zp + 0.6], 0.02, 0.02, 4);
      box(B.metal, x + p[0] - 0.025, x + p[0] + 0.025, p[1] - 0.025, p[1] + 0.025, zp, zp + 0.6);
    }
    cylZ(B.sup, x, 0, zp, zp + 0.5, 0.42, 14);
    cylZ(B.sup, x, 0, zp + 0.5, zp + 1.05, 0.28, 12);
    box(B.sup, x - 0.25, x + 0.25, -0.62, 0.62, zp + 1.0, zp + 1.2);
    for (k = -1; k <= 1; k += 2) box(B.sup, x - 0.18, x + 0.18, k * 0.62 - 0.06, k * 0.62 + 0.06, zp + 1.1, zp + 1.85);
    var tl = 0.5, ax = [Math.cos(tl), 0, Math.sin(tl)], C0 = [x + 0.1, 0, zp + 1.85];
    var A = [C0[0] - ax[0] * 0.45, 0, C0[2] - ax[2] * 0.45], Bf = [C0[0] + ax[0] * 0.45, 0, C0[2] + ax[2] * 0.45];
    cyl(B.sup, A, Bf, 0.76, 0.76, 22);
    cyl(B.sup, Bf, [Bf[0] + ax[0] * 0.24, 0, Bf[2] + ax[2] * 0.24], 0.76, 0.5, 22);
    cyl(B.sup, [A[0] - ax[0] * 0.16, 0, A[2] - ax[2] * 0.16], A, 0.58, 0.76, 22);
    cyl(B.dark, Bf, [Bf[0] + ax[0] * 0.02, 0, Bf[2] + ax[2] * 0.02], 0.78, 0.78, 22);
  }

  /* ================================================================ the boat */
  var D_GUN = 31.6, GUN_BASE = 0.3;
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group();
    var B = {}, TB = {}, s, j;
    ["hull", "sup", "under", "deck", "dark", "metal", "glass", "team"].forEach(function (n) { B[n] = new Bin(T[n]); });
    ["sup", "dark", "metal"].forEach(function (n) { TB[n] = new Bin(T[n]); });
    addHull(B);

    /* --- the four launchers [HB]: widths from the Osa's [DDR] plan, scaled (not confirmed) --- */
    var LA = { d0: 3.64, aR: 9.4 - 3.64, aN: 12.1 - 3.64, zt0: 4.71, zt1: 6.04, zf0: 2.22, zN: 3.55 };
    var LF = { d0: 15.0, aR: 20.5 - 15.0, aN: 23.0 - 15.0, zt0: 4.88, zt1: 5.95, zf0: 2.66, zN: 3.8 };
    for (s = -1; s <= 1; s += 2) {
      launcher(B, LA, 1.1 * SB, 3.6 * SB, s);
      launcher(B, LF, 1.27 * SB, 3.68 * SB, s);
    }

    /* --- after gun platform and the after AK-230, trained astern [HB] --- */
    slab(B.sup, 1.2, 3.5, 1.25, 3.55, 0.04);
    for (s = -1; s <= 1; s += 2) for (j = 0; j < 3; j++)                /* the openings [HB] draws in its side */
      box(B.dark, X(1.7 + j * 0.6), X(2.0 + j * 0.6), s * 1.25 - 0.03, s * 1.25 + 0.03, 2.75, 3.4);
    ak230(B, X(2.4), 3.55, -1, 0.15);

    /* --- centreline casings [HB][DDR]: the low after one under the Drum Tilt, the tall one between the
       pairs with its trunk, the one between the forward pair carrying the mast step --- */
    slab(B.sup, 3.6, 9.9, 0.95, 3.2);
    drumTilt(B, 8.0, 3.2, 6.2);
    slab(B.sup, 9.9, 15.0, 1.0, 5.0);
    cylZ(B.sup, X(12.95), 0, 4.95, 5.5, 0.35, 12);
    box(B.dark, X(13.4), X(14.6), -1.02, 1.02, 2.6, 4.2);              /* the doors in the casing sides [HB] */
    box(B.sup, X(13.3), X(14.7), -0.9, 0.9, 2.5, 4.3);
    slab(B.sup, 15.0, 21.0, 1.0, 4.9);

    /* --- the wheelhouse [HB]: the after step d 21.0 - 24.5 (roof 5.25), the house d 24.5 - 28.8 (roof 5.6)
       with its front corners rounded and the face raked (the Osa's form) --- */
    var HW = 1.32 * SB, RF = 5.6;
    slab(B.sup, 21.0, 24.6, HW, 5.25, 0.04);
    (function () {
      var rings = [], dd = [24.5, 27.3, 28.05, 28.45, 28.7, 28.82], zt = [RF, RF, RF - 0.03, RF - 0.12, RF - 0.28, RF - 0.5], k;
      function hs(dq, ztq) {
        var zb = zD(dq) - 0.05, r = 0.42, P = [], q;
        var c = Math.max(0, Math.min(1, (dq - 28.0) / 0.82));
        var hw = HW - r * (1 - Math.sqrt(Math.max(0, 1 - c * c)));
        P.push([X(dq), -hw, zb], [X(dq), hw, zb]);
        for (q = 0; q <= 3; q++) { var t = q / 3 * PI / 2; P.push([X(dq), hw - 0.18 * (1 - Math.cos(t)), ztq - 0.18 * (1 - Math.sin(t))]); }
        for (q = 0; q <= 3; q++) { var t2 = q / 3 * PI / 2; P.push([X(dq), -hw + 0.18 * (1 - Math.sin(t2)), ztq - 0.18 * (1 - Math.cos(t2))]); }
        return P;
      }
      for (k = 0; k < dd.length; k++) rings.push(hs(dd[k], zt[k]));
      loft(B.sup, rings);
    })();
    for (j = -1; j <= 1; j++) box(B.glass, X(28.8) - 0.02, X(28.8) + 0.05, j * 0.62 - 0.22, j * 0.62 + 0.22, 4.55, 5.0);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X(25.0), X(25.7), s * HW - 0.03, s * HW + 0.03, zD(25.3) + 0.12, 4.95);     /* door [HB] */
      for (j = 0; j < 2; j++) box(B.glass, X(26.4 + j * 0.8) - 0.25, X(26.4 + j * 0.8) + 0.25, s * HW - 0.03, s * HW + 0.03, 4.55, 4.95);
    }
    cylZ(B.sup, X(24.5), 0.4, 5.25, 6.1, 0.18, 10);                     /* the two roof fittings [HB] */
    cylZ(B.metal, X(24.5), 0.4, 6.1, 6.45, 0.26, 10);
    cylZ(B.sup, X(27.4), 0, RF, 5.95, 0.14, 8);
    cylZ(B.metal, X(27.4), 0, 5.95, 6.15, 0.2, 10);

    /* --- the pylon mast [HB] at d 21.95: a plated four-sided taper from the step roof to the head, a
       platform at 8.1, a box on a bracket aft and one forward, the head box --- */
    var xm = X(21.95);
    (function () {
      var R = [[5.25, 0.55, 0.9], [7.0, 0.42, 0.62], [9.0, 0.3, 0.38], [10.8, 0.22, 0.25]], rings = [];
      R.forEach(function (r) { rings.push([[xm - r[1], -r[2], r[0]], [xm + r[1], -r[2], r[0]], [xm + r[1], r[2], r[0]], [xm - r[1], r[2], r[0]]]); });
      loft(B.sup, rings);
    })();
    box(B.deck, X(20.3), X(23.6), -0.7, 0.7, 8.04, 8.12);
    box(B.sup, X(19.8), X(21.6), -0.5, 0.5, 8.4, 9.9);
    cyl(B.metal, [X(21.6), 0, 9.1], [xm - 0.3, 0, 9.1], 0.05, 0.05, 5);
    box(B.sup, X(22.7), X(24.5), -0.45, 0.45, 9.3, 10.5);
    cyl(B.metal, [xm + 0.25, 0, 9.85], [X(22.7), 0, 9.85], 0.05, 0.05, 5);
    box(B.sup, X(21.25), X(22.5), -0.9, 0.9, 10.8, 11.8);                /* the head box */
    box(B.dark, X(22.5), X(22.52), -0.82, 0.82, 10.88, 11.72);
    /* --- the two whips [HB] --- */
    cyl(B.metal, [X(19.8), 0.3, 4.9], [X(19.8), 0.3, 11.9], 0.045, 0.018, 5);
    cyl(B.metal, [X(27.0), -0.6, RF], [X(27.0), -0.6, 11.8], 0.045, 0.018, 5);

    /* --- forecastle: the forward AK-230's base ring (the gun is the "turret"), a capstan [HB] --- */
    var zg = zD(D_GUN);
    cylZ(B.sup, X(D_GUN), 0, zg - 0.05, zg + GUN_BASE, 1.05, 20);
    cylZ(B.sup, X(29.8), 0, zD(29.8) - 0.02, zD(29.8) + 0.4, 0.24, 12);
    cylZ(B.dark, X(29.8), 0, zD(29.8) + 0.4, zD(29.8) + 0.43, 0.2, 12);

    /* --- underwater: three shafts, three screws, two rudders (the Osa's [DDR]; not confirmed) --- */
    var SY = [2.3, 0, -2.3], SD = [1.75, 3.25, 1.75], i, k2;
    for (i = 0; i < 3; i++) {
      var yS = SY[i], dS = SD[i], zS = -1.95;
      cyl(B.metal, [X(dS + 0.25), yS, zS], [X(dS + 7.0), yS, tbl(KZ, dS + 7.0) * 0.5 + zS * 0.5 + 0.35], 0.07, 0.07, 6);
      cyl(B.metal, [X(dS + 1.5), yS, zS + 0.05], [X(dS + 1.5), yS * 0.97, tbl(KZ, dS + 1.5) + 0.1], 0.05, 0.05, 4);
      cyl(B.metal, [X(dS - 0.1), yS, zS], [X(dS + 0.25), yS, zS], 0.08, 0.12, 8);
      for (k2 = 0; k2 < 3; k2++) {
        var an = k2 / 3 * TAU + 0.3 * i, cy = Math.cos(an), cz = Math.sin(an);
        var tv = unit([0.5, -cz * 0.86, cy * 0.86]), tu = cross(tv, [0, cy, cz]);
        obox(B.metal, [X(dS + 0.1), yS, zS], tu, tv, [0, cy, cz], -0.025, 0.025, -0.13, 0.13, 0.1, 0.5);
      }
    }
    for (s = -1; s <= 1; s += 2) box(B.metal, X(0.35), X(1.15), s * 2.3 - 0.05, s * 2.3 + 0.05, -1.85, -1.05);

    /* --- team: two small strips on up-facing surfaces --- */
    box(B.team, X(25.4), X(26.8), -0.55, 0.55, RF + 0.005, RF + 0.025);
    box(B.team, X(10.6), X(11.8), -0.55, 0.55, 5.005, 5.025);
    flush(THREE, g, B);

    /* --- the forward AK-230: the group "turret", origin on its ring at the top of the base --- */
    var tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(X(D_GUN), 0, zg + GUN_BASE);
    ak230(TB, 0, 0, 1, 0.0);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }
  return { build: build, L: LOA };
})();

/* len: the measured X extent (transom d 0 to the stem head d 42.1; the aft gun's barrels reach 0.1 m
   past the transom) */
UNIT_MODELS["kpa_e90_missileboat"] = {
  len: 42.10,
  build: function (THREE, M, C) { return HeroKpaSoju.build(THREE, M, C); }
};
