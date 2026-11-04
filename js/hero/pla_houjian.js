/* ==================== js/hero/pla_houjian.js ===========================
   HERO MODEL -- Type 037-II "Houjian" missile boat (PLAN, Huangpu Shipyard, first boat 1990-91, six for
   the Hong Kong squadron).  Key: pla_e90_missileboat (eras.js "Type 037-II Houjian", service 1991, e90
   only; weapon "6 x YJ-8"; generations.js gun row "twin 37mm Type 76A and twin 30mm"; no warship_specs
   row).  The row is NOT turret:true: every gun is baked and nothing is named "turret" (render3d trains a
   "turret" by -(tang - ang), and a row without turret:true never moves tang, so a named mount would swing
   with every turn of the hull; the house convention, as js/hero/ru_osa_boat.js and pla_houbei.js).
   (The brief's "(Huangfen)" is the older Type 021 Osa copy, pla_e60_missileboat; this is the Houjian.)

   PUBLISHED FIGURES: en.wikipedia "Type 037 corvette", section "Type 037II Houjian-class missile boat":
   displacement 520 t; 2 SEMT-Pielstick 12 PA6 280 diesels, 3 shafts; 30+ kn; crew 75; armament 2 x Type 69
   twin 30 mm, 6 x C-801 (the page says "C-101/YJ-1", citing the US Army WEG 2011; the game and the brief
   say C-801/YJ-8, the en.wikipedia text itself says "C-801 SSMs"), a Type 76 twin 37 mm (the infobox says
   "only on Lianjiang", but every photograph below shows a twin-37 turret on the forecastle of 771 and 772:
   the photographs win and it is drawn); sensors Type 348G tracking and Type 348S search radars, Type 88C
   EOTS for the 30 mm.  Length, beam and draught are not on that page: the brief's 65.4 m x 8.4 m x 2.4 m
   (the standard handbook figures) are used.  CHECK: the side-on photograph [P1] scaled to 65.4 m stem to
   transom gives crew members 1.6-1.75 m tall and the 37 mm turret 2.9 m long, so the length agrees.

   REFERENCES (Wikimedia Commons, width 960, in the scratchpad q_houjian_ref; Commons has no line drawing of
   the class; the CJK file titles are given here in translation to keep the file ASCII):
     [P1] the Commons file titled in Chinese "(PLA Hong Kong Garrison naval flotilla) 037II (type) -772 (missile boat) 2012b.JPG" (772 Nanhai at Hong Kong, 2012, almost exactly
          broadside from starboard, bow right): the MASTER.  901 px transom to stem head = 65.4 m (13.78 px/m),
          d = metres forward of the transom; every station, height and position below is read off it
          (heights from the waterline, which the photo shows along the whole hull).
     [P2] the same series, "... 037II ... -772 ... 2012a.JPG" (the same boat, starboard bow quarter): the launcher
          stack (three tiers, see item 4), the aft deckhouse, the red-brown boot top, the hull exhaust.
     [P3] the same series, "... 037II ... -771 ....JPG" (771 Shunde, starboard bow quarter, bow left, close): the
          37 mm turret shape (a rounded loaf, trained aft in this view), the bridge wing bulges, the conical
          director tower, the four-leg lattice mast with its mesh dish, the post director aft of the mast,
          the launcher stack from ahead, both 30 mm mounts, the flared bow and rails.
     [P4] "PLAN Shunde 771 Houjian Class Missile Boat.jpg" (771 broadside from port, Victoria Harbour): the
          profile check (same stations, same layout on the other side).

   RECOGNITION LIST (each must read at game zoom; where it shows in the model):
     1. The long flush-deck hull: sheer rising from 2.25 m at the transom to 3.4 m at the stem head, the
        raked stem meeting the waterline at d 62.5, the flared bow [P1][P3]: tables ZD/HD/CH/CZ/KZ, addHull().
     2. The Type 76A twin 37 mm in its rounded enclosed turret on the forecastle, d 50.5 - 53.4, top 2.4 m
        over the deck, trained ahead, barrels to d 55 [P1][P2][P3]: t76a().
     3. The main superstructure d 26.7 - 46.6: a low after part (roof 4.5 m), the tall forward block (roof
        6.8 m) with a raked after face, the bridge (roof 7.2 m, d 41.7 - 45.3) with bulged wings and the
        raked front face with its window band [P1][P3].
     4. SIX C-801 BOXES: three per side in a stepped stack between the two deckhouses (d 18.1 - 25.2),
        rising 14 deg toward the bow, the top box 2.5 m over the deck aft and 4.15 m forward [P1][P2][P3],
        toed out from the centre line: lstack().  The six is the published figure; the three tiers per side
        are counted off [P2] (three tiers clearly) and [P1][P3] (two clear, the lowest box half hidden
        behind the rail and the front legs).
     5. The fire-control director: a conical tower on the bridge roof (d 39.3), a railed platform at 9.3 m,
        the head with its dish to 11.2 m [P1][P3] (the Type 348G of the published fit).
     6. The four-leg lattice mast straddling the step (after legs on the low roof at d 32.9, forward legs
        on the tall block at d 35.5), yard at 12.6 m, platform at 14.6 m with the mesh dish (Type 348S),
        pole to 17.1 m [P1][P3].
     7. The aft deckhouse d 10.7 - 18.4: low after part (roof 4.4 m) carrying the upper twin 30 mm on a
        pedestal (d 13.4) and a small dome, the tall forward part (roof 5.3 m) with a raked after face
        [P1][P2]: ak30().
     8. The stern twin 30 mm on the quarterdeck (d 7.5), trained astern [P1][P3]: ak30().
     9. Hull-side exhaust outlets just over the waterline at d 26.3 [P1][P2]; the anchor in its pocket at
        d 61.3 [P1][P3].
    10. Paint: PLAN light grey, sampled off [P1] (hull in shade 99,101,101, superstructure lit 130-155, gun
        housings and launchers the lightest); taken to about 0.8 of a sunlit grey for the ACES pass:
        hull 0x8a9092, guns and launchers 0xa8acac, deck 0x6c7072; boot top red-brown [P2] 0x5a3c34.
   NOT CONFIRMED and drawn only as marked: every PLAN half-breadth (no plan view or line drawing exists on
   Commons: the 8.4 m beam is held from d 14 to d 40, the run and entrance are estimated from [P3]); the
   underwater body (keel 2.4 m, the published draught, d 18 - 42; bilge and sections estimated); the
   superstructure widths (aft deckhouse 2.9 m, main 3.0 m, bridge wings 3.35 m half-breadth, from the
   walkways in [P3]); the launcher toe-out (8 deg, the photographs show the stacks toed out but give no
   angle) and the box section (0.95 x 1.0 m); the three screws (published 3 shafts, positions estimated;
   no rudders drawn, none seen or published); the identity of the post director aft of the mast and the
   small dome on the aft deckhouse (drawn as photographed; one of them is probably the Type 88C EOTS);
   the white fitting abaft the aft deckhouse (d 9.3 - 10.6, unidentified, drawn as a small cabinet).
   Not drawn: whip aerials other than three, the reel by the launcher legs, flags.  No pennant numbers.
   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  Everything baked, one mesh per material
   (8 draw calls).  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroHoujian = (function () {
  "use strict";
  var TAU = Math.PI * 2, PI = Math.PI, L = 65.4, X0 = -32.7;
  function X(d) { return X0 + d; }            /* x at d metres forward of the transom */

  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function mul(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function lerp3(a, b, t) { return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]; }
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
  /* a convex solid from hand-listed faces: each face is turned to face away from the centroid */
  function csolid(bin, V, F) {
    var c = [0, 0, 0], i;
    for (i = 0; i < V.length; i++) c = add(c, V[i]);
    c = mul(c, 1 / V.length);
    for (i = 0; i < F.length; i++) {
      var f = F[i], a = V[f[0]], b = V[f[1]], d = V[f[2]], n = cross(sub(b, a), sub(d, a));
      if (dot(n, n) < 1e-12) continue;
      var m = mul(add(add(a, b), d), 1 / 3);
      if (dot(n, sub(m, c)) < 0) bin.tri(a, d, b); else bin.tri(a, b, d);
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
  /* loft through rings of equal point count, flat-capped; pick(a,b,c) may choose the bin per triangle */
  function loft(bin, rings, noCap, pick) {
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
      (pick ? pick(p, q, s2) : bin).tri(p, q, s2);
    }
  }
  /* ellipsoid with smooth normals; lo..hi latitude (radians) */
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
  /* a convex (d, z) outline extruded across the ship, each vertex at half-breadth hw(z) (tumblehome) */
  function prismY(bin, poly, hw) {
    var V = [], F = [], n = poly.length, i;
    for (i = 0; i < n; i++) V.push([X(poly[i][0]), hw(poly[i][1]), poly[i][1]]);
    for (i = 0; i < n; i++) V.push([X(poly[i][0]), -hw(poly[i][1]), poly[i][1]]);
    for (i = 1; i + 1 < n; i++) { F.push([0, i, i + 1]); F.push([n, n + i, n + i + 1]); }
    for (i = 0; i < n; i++) { var j = (i + 1) % n; F.push([i, j, n + j]); F.push([i, n + j, n + i]); }
    csolid(bin, V, F);
  }
  /* a flat quad laid on a face, lifted 4 cm along its outward normal (out = a point outside the face) */
  function pane(bin, a, b, c, d, out) {
    var n = unit(cross(sub(b, a), sub(c, a)));
    if (dot(n, sub(out, a)) < 0) { var t = b; b = d; d = t; n = mul(n, -1); }
    var o = mul(n, 0.04);
    a = add(a, o); b = add(b, o); c = add(c, o); d = add(d, o);
    bin.tri(a, b, c); bin.tri(a, c, d);
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

  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }

  /* ------------------------------------------------------------ paint: plate with faint seams (PLAN light grey
     is applied as the material colour; the canvas only adds plating and weathering) */
  function drawPlate(g, S) {
    var R = rng(772), i, k, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.02 + R() * 0.035; g.fillStyle = R() < 0.55 ? "#7c8488" : "#ffffff";
      g.fillRect(R() * S, R() * S, (1 + R() * 3) * m, (0.3 + R() * 1.0) * m);
    }
    g.globalAlpha = 1;
    for (k = 0; k < 8; k++) {
      var y = Math.round(k * 2 * m);
      g.fillStyle = "rgba(70,80,86,0.22)"; g.fillRect(0, y, S, 1.5);
      for (i = 0; i < 4; i++) { var x = Math.round(((i * 4 + (k % 2) * 2) % 16) * m); g.fillStyle = "rgba(70,80,86,0.18)"; g.fillRect(x, y, 1.5, 2 * m); }
    }
    for (i = 0; i < 26; i++) {
      g.globalAlpha = 0.05 + R() * 0.05; g.fillStyle = "#5b5650";
      g.fillRect(R() * S, R() * S, 0.08 * m, (0.4 + R() * 1.2) * m);
    }
    g.globalAlpha = 1;
  }
  function drawDeck(g, S) {
    var R = rng(7720), i, j, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 11; i++) for (j = 0; j < 8; j++) {
      g.fillStyle = "rgba(0,0,0," + (0.02 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(i * 1.5 * m + 2, j * 2 * m + 2, 1.5 * m - 4, 2 * m - 4);
    }
    g.fillStyle = "rgba(30,34,36,0.28)";
    for (i = 0; i <= 11; i++) g.fillRect(i * 1.5 * m - 1, 0, 2, S);
    for (j = 0; j <= 8; j++) g.fillRect(0, j * 2 * m - 1, S, 2);
    g.globalAlpha = 1;
  }

  function materials(THREE, C) {
    var plate = canvasTex(THREE, "houjianPlate", drawPlate), deckT = canvasTex(THREE, "houjianDeck", drawDeck);
    function mk(c, r, m, map) {
      var o = { color: c, roughness: r, metalness: m };
      if (map) o.map = map;
      return new THREE.MeshStandardMaterial(o);
    }
    return {
      hull: mk(0x8a9092, 0.8, 0.08, plate),       /* hull and superstructure, PLAN light grey (item 10) */
      lt: mk(0xa8acac, 0.78, 0.08, plate),        /* gun housings and the launcher boxes, the lightest [P1] */
      deck: mk(0x6c7072, 0.92, 0.04, deckT),      /* weather deck */
      boot: mk(0x5a3c34, 0.86, 0.04),             /* boot top and underbody [P2] (below water NOT CONFIRMED) */
      dark: mk(0x23282b, 0.75, 0.3),              /* outlets, slots, gun bases, anchor pockets */
      metal: mk(0x4e555a, 0.5, 0.55),             /* rails, barrels, mast lattice, screws */
      glass: mk(0x141c22, 0.15, 0.4),
      team: mk((C && C.team !== undefined) ? C.team : 0x3f7fd0, 0.84, 0.06)
    };
  }

  /* ------------------------------------------------------------ hull station tables, d from the transom.
     ZD deck-edge z and the stem line read off [P1] (13.78 px/m, heights from the waterline); KZ keel
     (2.4 m published draught amidships, run and forefoot estimated, the stem raked from the waterline at
     d 62.5 to the stem head at 65.4 [P1]); HD deck half-breadth, CH / CZ the turn of the bilge: NOT
     CONFIRMED (no plan view), held to the published 8.4 m beam. */
  var ZD = [[0, 2.25], [10, 2.27], [20, 2.3], [30, 2.4], [41, 2.6], [46, 2.78], [50, 2.95], [55, 3.1], [60, 3.25], [65.4, 3.4]];
  var HD = [[0, 3.75], [3, 3.95], [8, 4.12], [14, 4.2], [40, 4.2], [44, 4.08], [48, 3.82], [52, 3.42], [55.5, 2.9], [58.5, 2.3],
            [61, 1.65], [63, 1.02], [64.5, 0.45], [65.4, 0.03]];
  var CH = [[0, 3.45], [8, 3.85], [40, 3.85], [45, 3.55], [50, 2.9], [54, 2.2], [58, 1.35], [61, 0.75], [63, 0.3], [65.4, 0.01]];
  var CZ = [[0, -0.55], [10, -0.95], [40, -1.0], [46, -0.8], [51, -0.4], [55, 0.1], [58.5, 0.7], [61, 1.3], [63, 2.0], [65.4, 3.4]];
  var KZ = [[0, -0.9], [1.5, -1.4], [4, -1.8], [10, -2.15], [18, -2.4], [42, -2.4], [48, -2.25], [53, -1.85], [57, -1.2],
            [60, -0.55], [62.5, 0.0], [63.6, 1.29], [64.6, 2.46], [65.4, 3.4]];
  function zD(d) { return tbl(ZD, d); }
  function hD(d) { return tbl(HD, d); }
  /* one half section, deck edge to keel (deck edge, flare, bilge, bottom, keel); a waterline point is
     inserted so the boot top lies on z = 0 */
  function half(d) {
    var zd = zD(d), hd = hD(d), hc = Math.min(tbl(CH, d), hd), zc = tbl(CZ, d), kz = tbl(KZ, d);
    if (zc < kz + 0.02) zc = kz + 0.02;
    if (zc > zd - 0.05) zc = zd - 0.05;
    var fw = Math.max(0, Math.min(1, (d - 44) / 14));                        /* flare forward [P3] */
    var P = [[hd, zd], [lerp(hc, hd, 0.7) - 0.35 * fw, lerp(zc, zd, 0.5)], [hc, zc],
             [hc * 0.55, lerp(kz, zc, 0.45) - 0.08 * Math.min(1, hc / 3)], [0.0, kz]];
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
    var ds = [0, 0.6, 1.5, 3, 5, 8, 11, 14, 18, 22, 26, 30, 34, 38, 42, 44, 46, 48, 50, 52, 54, 55.5, 57, 58.5, 60, 61,
              62, 62.5, 63, 63.6, 64.1, 64.6, 65.0, 65.4], i, k;
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
      /* the deck, cambered 10 cm */
      var cA = zD(ds[i]) + 0.1 * Math.min(1, A[0][0] / 2), cB = zD(ds[i + 1]) + 0.1 * Math.min(1, Bq[0][0] / 2);
      for (s = -1; s <= 1; s += 2) {
        var e0 = [xa, s * A[0][0], A[0][1]], e1 = [xb, s * Bq[0][0], Bq[0][1]], m0 = [xa, 0, cA], m1 = [xb, 0, cB];
        var D = s > 0 ? [[e0, m1, e1], [e0, m0, m1]] : [[e0, e1, m1], [e0, m1, m0]];
        D.forEach(function (T) {
          var cc = cross(sub(T[1], T[0]), sub(T[2], T[0]));
          if (dot(cc, cc) > 1e-12) B.deck.tri(T[0], T[1], T[2]);
        });
      }
    }
    /* transom: the d 0 section closed as one polygon, fanned from its centroid, every triangle facing aft */
    var T0 = H[0], x0 = X(0), poly = [], zc = 0;
    for (k = 0; k < 6; k++) poly.push([x0, T0[k][0], T0[k][1]]);
    for (k = 4; k >= 1; k--) poly.push([x0, -T0[k][0], T0[k][1]]);
    poly.push([x0, -T0[0][0], T0[0][1]]);
    for (k = 0; k < poly.length; k++) zc += poly[k][2] / poly.length;
    var ctr = [x0, 0, zc];
    for (k = 0; k < poly.length; k++) {
      var a = poly[k], b = poly[(k + 1) % poly.length], cc = cross(sub(a, ctr), sub(b, ctr));
      if (dot(cc, cc) < 1e-12) continue;
      var bn = (a[2] + b[2] + ctr[2]) / 3 < -0.005 ? B.boot : B.hull;
      if (cc[0] < 0) bn.tri(ctr, a, b); else bn.tri(ctr, b, a);
    }
    /* the sheer strake: a thin rubbing band 0.25 m under the deck edge along the length [P1] */
    var s3, d;
    for (s3 = -1; s3 <= 1; s3 += 2) {
      var rr = [];
      for (d = 0.2; d < 63.25; d += 1.5) {
        var dd = Math.min(d, 63.2), y0 = s3 * (hD(dd) - 0.03), z0 = zD(dd) - 0.3;
        rr.push([[X(dd), y0, z0], [X(dd), y0 + s3 * 0.07, z0], [X(dd), y0 + s3 * 0.07, z0 + 0.1], [X(dd), y0, z0 + 0.1]]);
      }
      loft(B.hull, rr);
    }
  }

  /* lifelines along the deck edge, stanchions ~1.3 m apart, two wires [P1][P3] */
  function rails(B, da, db, inset, h) {
    var s, d, hh = h || 0.95;
    for (s = -1; s <= 1; s += 2) {
      for (d = da; d < db - 0.01; d += 1.3) {
        var dn = Math.min(d + 1.3, db), y0 = s * Math.max(0.3, hD(d) - inset), y1 = s * Math.max(0.3, hD(dn) - inset);
        cyl(B.metal, [X(d), y0, zD(d) + hh], [X(dn), y1, zD(dn) + hh], 0.02, 0.02, 4);
        cyl(B.metal, [X(d), y0, zD(d) + hh * 0.5], [X(dn), y1, zD(dn) + hh * 0.5], 0.013, 0.013, 3);
        box(B.metal, X(d) - 0.022, X(d) + 0.022, y0 - 0.022, y0 + 0.022, zD(d), zD(d) + hh);
      }
      box(B.metal, X(db) - 0.022, X(db) + 0.022, s * Math.max(0.3, hD(db) - inset) - 0.022, s * Math.max(0.3, hD(db) - inset) + 0.022, zD(db), zD(db) + hh);
    }
  }

  /* a convex plan polygon [[d, y]...] extruded from z0 to z1, its d shifted by rake(z) */
  function extrudeZ(bin, poly, z0, z1, rake) {
    function ring(z) { var dz = rake ? rake(z) : 0; return poly.map(function (p) { return [X(p[0] + dz), p[1], z]; }); }
    loft(bin, [ring(z0), ring(z1)]);
  }
  /* rounded-rectangle plan, d0..d1, half-breadth w, corner radius r (rf forward corners, ra after corners) */
  function rrect(d0, d1, w, ra, rf) {
    var P = [], k, t;
    for (k = 0; k <= 3; k++) { t = k / 3 * PI / 2; P.push([d1 - rf + rf * Math.sin(t), -w + rf - rf * Math.cos(t)]); }
    for (k = 0; k <= 3; k++) { t = k / 3 * PI / 2; P.push([d1 - rf + rf * Math.cos(t), w - rf + rf * Math.sin(t)]); }
    for (k = 0; k <= 3; k++) { t = k / 3 * PI / 2; P.push([d0 + ra - ra * Math.sin(t), w - ra + ra * Math.cos(t)]); }
    for (k = 0; k <= 3; k++) { t = k / 3 * PI / 2; P.push([d0 + ra - ra * Math.cos(t), -w + ra - ra * Math.sin(t)]); }
    return P;
  }

  /* ------------------------------------------------------------ Type 69 twin 30 mm [P1][P2][P3]: the AK-230
     pattern, a white rounded housing of two cheeks over a dark base, two barrels from a dark slot.
     f = +1 trained ahead, -1 astern; zb = base z; el = elevation (rad) */
  function ak30(B, d, zb, f, el) {
    var xc = X(d), i;
    function P(x, y, z) { return [xc + f * x, f * y, zb + z]; }
    cyl(B.dark, P(0, 0, 0), P(0, 0, 0.32), 0.82, 0.8, 18);
    cyl(B.lt, P(0, 0, 0.32), P(0, 0, 0.62), 0.78, 0.7, 18);
    for (i = -1; i <= 1; i += 2) ellipsoid(B.lt, P(-0.05, i * 0.38, 0.62), 0.66, 0.36, 0.8, 5, 14, 0, PI / 2);
    ellipsoid(B.lt, P(-0.32, 0, 0.62), 0.4, 0.3, 0.66, 4, 10, 0, PI / 2);
    obox(B.dark, P(0, 0, 0), [f, 0, 0], [0, f, 0], [0, 0, 1], 0.05, 0.62, -0.16, 0.16, 0.7, 1.2);
    var ce = Math.cos(el), se = Math.sin(el);
    for (i = -1; i <= 1; i += 2) {
      var y = i * 0.11, z = 0.95;
      cyl(B.metal, P(0.45, y, z), P(0.45 + 1.8 * ce, y, z + 1.8 * se), 0.045, 0.04, 6);
      cyl(B.metal, P(0.45 + 1.6 * ce, y, z + 1.6 * se), P(0.45 + 1.85 * ce, y, z + 1.85 * se), 0.06, 0.06, 6);
    }
    obox(B.lt, P(0, 0, 0), [f, 0, 0], [0, f, 0], [0, 0, 1], -0.55, -0.15, -0.2, 0.2, 1.36, 1.48);   /* sight hood */
  }

  /* ------------------------------------------------------------ Type 76A twin 37 mm [P1][P2][P3]: a rounded
     loaf 2.9 m long, 2.2 m wide, on a dark base ring; trained ahead, two barrels from a dark port */
  function t76a(B, d0, d1) {
    var zb = zD((d0 + d1) / 2) + 0.05, zt = zb + 2.35, xm = X((d0 + d1) / 2), k;
    cylZ(B.dark, xm - 0.1, 0, zb - 0.1, zb + 0.35, 1.05, 20);
    var as = [0, 0.05, 0.14, 0.3, 0.7, 0.86, 0.95, 1.0], sc = [0.7, 0.86, 0.96, 1.0, 1.0, 0.95, 0.85, 0.66];
    var rings = as.map(function (a, i) {
      var x = X(lerp(d0, d1, a)), w = 1.1 * sc[i], top = zb + 0.35 + (zt - zb - 0.35) * (0.82 + 0.18 * sc[i]), z0 = zb + 0.3, r = Math.min(0.75, w * 0.7), P = [], q, t;
      P.push([x, -w, z0], [x, w, z0]);
      for (q = 0; q <= 4; q++) { t = q / 4 * PI / 2; P.push([x, w - r * (1 - Math.cos(t)), top - r * (1 - Math.sin(t))]); }
      for (q = 0; q <= 4; q++) { t = q / 4 * PI / 2; P.push([x, -w + r * (1 - Math.sin(t)), top - r * (1 - Math.cos(t))]); }
      return P;
    });
    loft(B.lt, rings);
    var zg = zb + 1.25;
    box(B.dark, X(d1) - 0.12, X(d1) + 0.02, -0.55, 0.55, zg - 0.3, zg + 0.3);
    for (k = -1; k <= 1; k += 2) {
      cyl(B.metal, [X(d1) - 0.1, k * 0.3, zg], [X(d1) + 2.0, k * 0.3, zg + 0.04], 0.07, 0.055, 7);
      cyl(B.metal, [X(d1) + 1.75, k * 0.3, zg + 0.035], [X(d1) + 2.05, k * 0.3, zg + 0.04], 0.08, 0.08, 7);
    }
    box(B.lt, X(d0 + 0.6), X(d0 + 1.3), 0.25, 0.75, zt - 0.02, zt + 0.16);   /* sight hood on the roof */
  }

  /* ------------------------------------------------------------ one C-801 stack, three boxes rising 14 deg toward
     the bow, stacked square to the incline, the lowest box set 1.3 m forward [P1][P2][P3].  s = side, toe =
     toe-out (rad, NOT CONFIRMED), (dO, zO) the stack origin, yc the centre of the stack at its after end. */
  function lstack(B, s, toe) {
    var th = 14 * PI / 180, ct = Math.cos(th), st = Math.sin(th), ca = Math.cos(toe), sa = Math.sin(toe);
    var dO = 18.8, zO = zD(18.8) - 0.3, yc = s * 2.0, LB = 6.6, TB = 0.95, WB = 1.0, GAP = 0.06, k;
    /* frame: u along the box (forward, up, toed out), v across (outboard positive for s), w square up */
    var u = [ct * ca, s * ct * sa, st], v = [-sa * s, ca, 0], w = [-st * ca, -s * st * sa, ct];
    var O = [X(dO), yc, zO];
    var off = [1.3, 0, 0];
    for (k = 0; k < 3; k++) {
      var c0 = k * (TB + GAP);
      obox(B.lt, O, u, v, w, off[k], off[k] + LB, -WB / 2, WB / 2, c0, c0 + TB);
      /* end caps: a dark seam 0.25 m in from each end and the front door frame [P1] */
      obox(B.dark, O, u, v, w, off[k] + LB - 0.3, off[k] + LB - 0.26, -WB / 2 - 0.01, WB / 2 + 0.01, c0 + 0.05, c0 + TB - 0.05);
      obox(B.dark, O, u, v, w, off[k] + 0.26, off[k] + 0.3, -WB / 2 - 0.01, WB / 2 + 0.01, c0 + 0.05, c0 + TB - 0.05);
      if (k > 0) obox(B.dark, O, u, v, w, Math.max(off[k], off[k - 1]) + 0.1, off[k] + LB - 0.1, -WB / 2 + 0.03, WB / 2 - 0.03, c0 - GAP - 0.01, c0 + 0.01);
    }
    /* legs under the front of the stack, d 23.0 and 23.6 [P1][P2], and a sill on the deck */
    function at(a, c) { return add(add(O, mul(u, a)), mul(w, c)); }
    [4.25, 4.85].forEach(function (a) {
      var p = at(a, 0), zd = zD(18.8 + a);
      for (var j = -1; j <= 1; j += 2) {
        var q = add(p, mul(v, j * 0.38));
        box(B.hull, q[0] - 0.09, q[0] + 0.09, q[1] - 0.09, q[1] + 0.09, zd, q[2] + 0.02);
      }
    });
    var p0 = at(1.4, 0), p1 = at(5.0, 0);
    hexa(B.hull, [[p0[0], p0[1] - 0.55, zD(20)], [p1[0], p1[1] - 0.55, zD(23)], [p1[0], p1[1] + 0.55, zD(23)], [p0[0], p0[1] + 0.55, zD(20)],
                  [p0[0], p0[1] - 0.55, zD(20) + 0.2], [p1[0], p1[1] - 0.55, zD(23) + 0.2], [p1[0], p1[1] + 0.55, zD(23) + 0.2], [p0[0], p0[1] + 0.55, zD(20) + 0.2]]);
  }

  /* ------------------------------------------------------------ the boat */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group();
    var B = {};
    ["hull", "lt", "deck", "boot", "dark", "metal", "glass", "team"].forEach(function (n) { B[n] = new Bin(T[n]); });
    var s, i, j, k;
    addHull(B);
    function hw29() { return 2.9; }
    function hw30() { return 3.0; }

    /* --- aft deckhouse [P1][P2]: low after part d 10.7 - 14.6 (roof 4.4), tall part d 14.2 - 18.4 (roof 5.3),
       its after face raked from 4.4 m at d 14.2 to 5.3 m at d 15.3 --- */
    prismY(B.hull, [[10.7, 2.2], [14.6, 2.2], [14.6, 4.4], [10.7, 4.4]], hw29);
    prismY(B.hull, [[14.2, 2.2], [18.4, 2.2], [18.4, 5.3], [15.3, 5.3], [14.2, 4.4]], hw29);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X(11.4), X(12.3), s * 2.9 - 0.03, s * 2.9 + 0.03, 2.5, 4.0);             /* door [P1] */
      box(B.dark, X(13.0), X(13.06), s * 2.9 - 0.03, s * 2.9 + 0.03, 2.5, 4.2);            /* panel seam */
    }
    cylZ(B.hull, X(13.4), 0, 4.38, 4.75, 0.62, 16);                                        /* pedestal */
    ak30(B, 13.4, 4.75, -1, 0.35);                                                         /* upper 30 mm, astern */
    ellipsoid(B.lt, [X(11.6), 0, 4.4], 0.42, 0.42, 0.5, 4, 12, 0, PI / 2);                  /* small dome [P1] */
    cyl(B.metal, [X(17.4), 1.6, 5.3], [X(17.3), 1.6, 9.2], 0.04, 0.015, 4);                 /* whip [P1] */

    /* --- the six C-801 boxes [P1][P2][P3] --- */
    for (s = -1; s <= 1; s += 2) lstack(B, s, 8 * PI / 180);

    /* --- main superstructure [P1][P3] --- */
    function dFront(z) { return 46.6 - (z - 2.65) * 0.286; }                               /* raked front face */
    prismY(B.hull, [[26.7, 2.3], [dFront(2.3), 2.3], [dFront(4.5), 4.5], [26.7, 4.5]], hw30);
    prismY(B.hull, [[34.67, 4.45], [dFront(4.45), 4.45], [dFront(6.8), 6.8], [35.1, 6.8]], hw29);
    /* the bridge d 41.7 - front, 4.5 - 7.2 m: wider (bulged wings, rounded front corners) [P1][P3] */
    extrudeZ(B.hull, rrect(41.7, dFront(4.5), 3.35, 0.15, 0.9), 4.5, 7.2, function (z) { return dFront(z) - dFront(4.5); });
    /* window band on the front and the bridge sides [P1][P3] */
    for (k = -3; k <= 3; k++) {
      var yw = k * 0.72, zA = 6.25, zB = 6.85;
      pane(B.glass, [X(dFront(zA)), yw - 0.3, zA], [X(dFront(zA)), yw + 0.3, zA], [X(dFront(zB)), yw + 0.3, zB], [X(dFront(zB)), yw - 0.3, zB], [X(60), 0, 6.5]);
    }
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 3; k++) box(B.glass, X(42.3 + k * 0.85), X(42.9 + k * 0.85), s * 3.35 - 0.03, s * 3.35 + 0.03, 6.25, 6.8);
      cylY(B.lt, X(44.3), s * 3.36, s * 3.42, 5.6, 0.3, 12);                               /* life ring [P1] */
      box(B.dark, X(29.0), X(30.0), s * 3.0 - 0.03, s * 3.0 + 0.03, 2.6, 4.1);              /* doors, low part */
      box(B.dark, X(36.4), X(37.3), s * 2.9 - 0.03, s * 2.9 + 0.03, 4.6, 6.3);              /* door, tall block */
    }
    /* the roof box d 36.5 - 41.8 (to 7.5 m) with its window [P1] */
    prismY(B.hull, [[36.5, 6.78], [41.8, 6.78], [41.8, 7.5], [36.8, 7.5]], function () { return 1.5; });
    box(B.glass, X(40.2), X(41.0), -1.53, 1.53, 7.0, 7.3);

    /* --- fire-control director [P1][P3]: a conical tower, railed platform at 9.3 m, the head and its dish --- */
    var xd = X(39.3);
    cyl(B.hull, [xd, 0, 7.48], [xd, 0, 9.25], 0.95, 0.6, 16);
    cylZ(B.hull, xd, 0, 9.22, 9.32, 1.15, 16);
    for (k = 0; k < 10; k++) {
      var a0 = k / 10 * TAU, a1 = (k + 1) / 10 * TAU;
      cyl(B.metal, [xd + 1.1 * Math.cos(a0), 1.1 * Math.sin(a0), 10.1], [xd + 1.1 * Math.cos(a1), 1.1 * Math.sin(a1), 10.1], 0.018, 0.018, 3);
      box(B.metal, xd + 1.1 * Math.cos(a0) - 0.02, xd + 1.1 * Math.cos(a0) + 0.02, 1.1 * Math.sin(a0) - 0.02, 1.1 * Math.sin(a0) + 0.02, 9.32, 10.1);
    }
    cylZ(B.hull, xd, 0, 9.32, 9.7, 0.35, 12);
    box(B.hull, xd - 0.5, xd + 0.45, -0.5, 0.5, 9.7, 10.65);
    cyl(B.lt, [xd + 0.45, 0, 10.2], [xd + 0.6, 0, 10.2], 0.42, 0.36, 16);                  /* the dish, ahead */
    cylZ(B.lt, xd - 0.05, 0, 10.65, 11.15, 0.32, 12);                                     /* the head drum on top */

    /* --- lattice mast [P1][P3]: after legs on the low roof at d 32.9, forward legs on the tall block at
       d 35.5, all converging to a 0.8 m square at 14.6 m (centre d 34.3) --- */
    (function () {
      var feet = [[32.9, 1.25, 4.5], [32.9, -1.25, 4.5], [35.5, -1.25, 6.8], [35.5, 1.25, 6.8]];
      var top = [[33.9, 0.4], [33.9, -0.4], [34.7, -0.4], [34.7, 0.4]], ZT = 14.6, lg, h;
      function legAt(i, z) {
        var f = feet[i], t = (z - f[2]) / (ZT - f[2]);
        return [X(lerp(f[0], top[i][0], t)), lerp(f[1], top[i][1], t), z];
      }
      for (lg = 0; lg < 4; lg++) cyl(B.metal, [X(feet[lg][0]), feet[lg][1], feet[lg][2]], [X(top[lg][0]), top[lg][1], ZT], 0.07, 0.05, 5);
      var lev = [7.4, 8.9, 10.4, 11.9, 13.3, ZT];
      for (h = 0; h < lev.length; h++) for (lg = 0; lg < 4; lg++) {
        var n = (lg + 1) % 4, a = legAt(lg, lev[h]), b = legAt(n, lev[h]);
        cyl(B.metal, a, b, 0.03, 0.03, 4);
        if (h > 0) cyl(B.metal, legAt(lg, lev[h - 1]), b, 0.022, 0.022, 3);
      }
      for (lg = 0; lg < 2; lg++) cyl(B.metal, legAt(lg, 6.8), legAt(lg, 7.4), 0.03, 0.03, 4);
      /* yard at 12.6 m, platform at 14.6 m, the mesh dish of the search radar, the pole */
      var xm = X(34.3);
      cyl(B.metal, [xm, -1.9, 12.6], [xm, 1.9, 12.6], 0.035, 0.035, 4);
      box(B.deck, xm - 1.0, xm + 0.9, -0.8, 0.8, ZT, ZT + 0.07);
      for (s = -1; s <= 1; s += 2) cyl(B.metal, [xm - 1.0, s * 0.8, ZT + 0.6], [xm + 0.9, s * 0.8, ZT + 0.6], 0.015, 0.015, 3);
      cylZ(B.metal, xm + 0.2, 0, ZT + 0.07, ZT + 0.75, 0.08, 6);
      /* the dish: a curved mesh reflector 1.9 m x 0.9 m, facing ahead, drawn as a thin shell of panels */
      for (k = 0; k < 6; k++) {
        var f0 = (k / 6 - 0.5) * 1.2, f1 = ((k + 1) / 6 - 0.5) * 1.2, R = 1.6;
        var y0 = R * Math.sin(f0), y1 = R * Math.sin(f1), x0 = xm + 0.3 + R * (1 - Math.cos(f0)), x1 = xm + 0.3 + R * (1 - Math.cos(f1));
        hexa(B.metal, [[x0, y0, ZT + 0.75], [x1, y1, ZT + 0.75], [x1 + 0.04, y1, ZT + 0.75], [x0 + 0.04, y0, ZT + 0.75],
                       [x0, y0, ZT + 1.6], [x1, y1, ZT + 1.6], [x1 + 0.04, y1, ZT + 1.6], [x0 + 0.04, y0, ZT + 1.6]]);
      }
      cyl(B.metal, [xm + 0.1, 0, ZT + 0.75], [xm + 0.1, 0, 17.1], 0.045, 0.02, 5);
    })();

    /* --- on the low roof aft of the mast [P1][P3]: a locker, two raft canisters, the post director --- */
    box(B.hull, X(26.9), X(28.4), -0.8, 0.8, 4.48, 5.5);
    for (s = -1; s <= 1; s += 2) {
      cyl(B.lt, [X(30.3), s * 1.5, 4.9], [X(32.2), s * 1.5, 4.9], 0.36, 0.36, 12);
      for (j = 0; j < 2; j++) cyl(B.dark, [X(30.8 + j * 0.9), s * 1.5, 4.9], [X(30.86 + j * 0.9), s * 1.5, 4.9], 0.37, 0.37, 12);
    }
    cylZ(B.hull, X(29.3), 0, 4.48, 7.4, 0.17, 8);
    box(B.lt, X(29.0), X(29.65), -0.3, 0.3, 7.4, 7.95);
    box(B.dark, X(29.65), X(29.68), -0.2, 0.2, 7.5, 7.85);

    /* --- the forecastle: the 37 mm, anchors, bollards, jack staff --- */
    t76a(B, 50.5, 53.4);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X(60.9), X(61.7), Math.min(s * 0.8, s * 1.04), Math.max(s * 0.8, s * 1.04), 1.75, 2.35);   /* anchor pocket [P1][P3] */
      cylZ(B.metal, X(58.0), s * (hD(58) - 0.6), zD(58), zD(58) + 0.3, 0.1, 8);
      cylZ(B.metal, X(58.45), s * (hD(58.45) - 0.6), zD(58.45), zD(58.45) + 0.3, 0.1, 8);
      cylZ(B.metal, X(48.0), s * (hD(48) - 0.5), zD(48), zD(48) + 0.3, 0.1, 8);
      cylZ(B.metal, X(48.45), s * (hD(48.45) - 0.5), zD(48.45), zD(48.45) + 0.3, 0.1, 8);
      /* hull exhaust outlet just over the waterline [P1][P2] */
      var ye = s * 3.98;
      cylY(B.dark, X(26.3), ye, ye + s * 0.12, 0.6, 0.33, 12);
    }
    box(B.hull, X(56.5), X(57.6), -0.6, 0.6, zD(57), zD(57) + 0.35);                       /* windlass */
    cylZ(B.metal, X(57.9), 0, zD(57.9), zD(57.9) + 0.25, 0.22, 10);
    cyl(B.metal, [X(65.0), 0, zD(65.0)], [X(65.0), 0, zD(65.0) + 1.5], 0.035, 0.02, 5);     /* jack staff */

    /* --- quarterdeck: the stern 30 mm, the white fitting, ensign staff, whip --- */
    cylZ(B.dark, X(7.5), 0, zD(7.5), zD(7.5) + 0.6, 0.9, 16);
    ak30(B, 7.5, zD(7.5) + 0.6, -1, 0.3);
    box(B.lt, X(9.4), X(10.5), -0.55, 0.55, zD(10), zD(10) + 1.25);                         /* unidentified [P1] */
    cylZ(B.metal, X(9.25), 0.45, zD(9.25), zD(9.25) + 1.7, 0.05, 6);
    cyl(B.metal, [X(0.3), 0, zD(0.3)], [X(0.3), 0, zD(0.3) + 2.0], 0.035, 0.02, 5);
    cyl(B.metal, [X(1.2), -3.2, zD(1.2)], [X(1.1), -3.2, zD(1.2) + 4.5], 0.035, 0.012, 4);

    /* --- lifelines: the quarterdeck, along the launcher deck and the forecastle [P1][P3] --- */
    rails(B, 0.25, 26.6, 0.1, 0.95);
    rails(B, 46.4, 64.6, 0.1, 0.95);
    for (i = 0; i < 5; i++) box(B.metal, X(0.12) - 0.02, X(0.12) + 0.02, -3.0 + i * 1.5 - 0.02, -3.0 + i * 1.5 + 0.02, zD(0.1), zD(0.1) + 0.95);
    cyl(B.metal, [X(0.12), -3.6, zD(0.1) + 0.95], [X(0.12), 3.6, zD(0.1) + 0.95], 0.02, 0.02, 4);

    /* --- underwater: three shafts and screws (published "3 shafts"; positions NOT CONFIRMED) --- */
    var SY = [2.3, 0, -2.3], SD = [4.0, 5.5, 4.0];
    for (i = 0; i < 3; i++) {
      var yS = SY[i], dS = SD[i], zS = -1.7;
      cyl(B.metal, [X(dS + 0.25), yS, zS], [X(dS + 7.0), yS, -1.95], 0.08, 0.08, 6);
      cyl(B.metal, [X(dS - 0.1), yS, zS], [X(dS + 0.25), yS, zS], 0.09, 0.13, 8);
      for (j = 0; j < 3; j++) {
        var an = j / 3 * TAU + 0.4 * i, cy = Math.cos(an), cz = Math.sin(an);
        var tv = unit([0.5, -cz * 0.86, cy * 0.86]), tu = cross(tv, [0, cy, cz]);
        obox(B.metal, [X(dS + 0.1), yS, zS], tu, tv, [0, cy, cz], -0.025, 0.025, -0.15, 0.15, 0.1, 0.55);
      }
    }

    /* --- team: two small strips on up-facing surfaces (the aft deckhouse low roof, the bridge roof) --- */
    box(B.team, X(10.95), X(11.0) + 0.0, -0.6, 0.6, 4.4, 4.43);
    box(B.team, X(10.95), X(11.0), -1.0, 1.0, 4.4, 4.425);
    box(B.team, X(42.2), X(43.0), -0.7, 0.7, 7.2, 7.225);

    flush(THREE, g, B);
    return g;
  }
  return { build: build };
})();

/* Registration: len is the published overall length of the Type 037-II, 65.4 m (and [P1]'s own 901 px
   transom to stem head at the scale its crew members give). */
UNIT_MODELS["pla_e90_missileboat"] = {
  len: 65.4,
  build: function (THREE, M, C) { return HeroHoujian.build(THREE, M, C); }
};
