/* ============ ru_shmel.js - HERO model: Project 1204 "Shmel" armoured river gunboat ============
   Key (unchanged): pact_e60_patrol ("Shmel Gunboat", full "Project 1204 Shmel armoured gunboat", service 1967,
   eras.js e60-e80, turret:true, weapons ["hmg"]).  facts.js: one 76 mm D-56TS in the PT-76B turret with a
   coaxial 7.62 mm, one 140 mm BM-14-17; 10 mm on the bridge sides, 15 mm on the bow.  No warship_specs row.
   FULL-QUALITY REDO 2026-10-24: hull lofted from a station table measured off the Moscow profile (knuckle
   falling from the stem head to just above the waterline, flare forward, raked stem, cut-up forefoot, the
   two propeller TUNNELS in the transom), the house re-measured in three steps, the 17-tube BM-14-17 redrawn
   in its two tiers (9 + 8), the 2M-3M redrawn, rails, canvas plate/deck paint with metre UVs.

   PUBLISHED FIGURES (kept from the first version, confirmed): en.wikipedia "Shmel-class patrol boat" and
   ru.wikipedia "Artilleriyskie katera proekta 1204": length 27.4 m, beam 4.32 m, draught 0.85 m (en) / 1 m
   (ru), 71 t (en), 73.4 / 77.4 t for the modernised boats (ru); two shafts in tunnels (ru: "tonnel'noe
   obrazovanie ... v rayone grebnykh vintov"), 118 built 1967-72.  ru.wikipedia, CORRECTING the first
   version: the BM-14-17 has 17 guides in TWO tiers, 9 above and 8 below (the old model drew 6 + 5 + 6), and
   its rocket boxes stand on the deck.

   WHICH BOATS, WHICH FIT.  ru.wikipedia: as built the boats carried a twin 14.5 mm 2M-6 aft; "in service" it
   was replaced by the twin 25 mm 2M-3M; from the mid-1970s SOME boats also got a casemate with four 30 mm
   BP-30 grenade launchers abaft the house and two Strela-2M posts.  Every boat photographed on Commons (134
   Moscow, 073 Astrakhan, the Caspian Flotilla boats) is a MODERNISED boat with the 2M-3M and the BM-14-17
   and WITHOUT the BP-30 casemate.  That sub-series is drawn: PT-76B turret, house, BM-14-17, 2M-3M.  The
   2M-6 (no photograph of one on a 1204 found), the BP-30 casemate and the Strela posts are NOT drawn.
   TURRET NODE: the row's only weapon is "hmg".  On the boat as photographed the only machine gun is the
   coaxial 7.62 mm in the PT-76B turret (the 2M-3M is a 25 mm cannon), so the PT-76B turret is the mount of
   the row's first weapon and is the group named "turret".

   REFERENCES (Wikimedia Commons, width 960, cached in the scratchpad q_shmel_ref):
     [MS] "PSKR Shmel in the Great Patriotic War Museum 5-jun-2014 Side.jpg" (boat 134, Moscow, port
          profile, near orthogonal): the master.  Stem 57 px to transom 928 px = 27.4 m, 31.8 px/m; the white
          boot-top line is taken as the waterline.  d below = metres abaft the stem head.
     [MT] "PSKR Shmel ... Stern.jpg" (the same boat from astern, a little to port): the transom, the two propeller tunnels, the
          2M-3M's two boxes with the guns between them, the radar bar, the lifelines.
     [AS] "AKA-2-2 'Shmel' proekta 1204 (Astrakhan).jpg" (073 on a plinth, port bow quarter, overcast): the
          knuckle and flare forward, the cut-up forefoot, the searchlight on the raised block, the paint.
     [CF] "Proekta 1204 'Shmel' - ... Kaspiyskoy flotilii 01.jpg" (mil.ru, CC BY 4.0, 2010s): service boats
          with lifelines; their camouflage is post-Soviet and is NOT used.

   RECOGNITION LIST (each must read at game zoom; where it shows):
     1. Small flush-decked hull, deck edge 1.80 m at the stem falling to 1.32 m at the transom [MS]: table ZD.
     2. The KNUCKLE: from the stem head (0.95 m) falling aft to 0.27 m by d 10, then a black rubbing strake
        along it to the stern; flared topsides forward, the lower hull tucked in under it [MS, AS]: ZK/HK,
        ring() point K, strake().
     3. Raked stem and a long cut-up forefoot, flat bottom, red-brown underbody [MS, AS]: KL, zLow().
     4. The wide flat transom with the two arched propeller tunnels [MT]: ring() tunnel points, transom().
     5. The PT-76B turret on a tall drum barbette (d 7.56, 0.95 m high, r 1.72), gun forward [MS, AS]: group
        "turret", barbette.
     6. The armoured wheelhouse d 9.5-12.9, roof 2.85 m above the deck, faceted front with shuttered windows,
        square side windows [MS, AS]: houseA().
     7. The raised conning block d 12.9-15.6 to 4.1 m with the searchlight [AS] and the lifebuoys on its after
        sides, the slotted radar bar at 5.4 m on its after end [MS, MT]: houseB(), radar.
     8. The lattice mast on the low after house (feet d 15.85-16.9) to the yard at 7.95 m, lantern 9.2 m, with
        a wire to the jackstaff and to the stern post [MS, MT]: mast().
     9. The low after house d 15.6-18.9 (1.85 m) with its hipped roof; the BM-14-17 on its drum right behind
        it (d 19.6), tube bank stowed pointing aft, raised about 17 deg [MS, MT, AS]: bm14().
    10. The rocket box d 20.0-21.4, then the 2M-3M on its box pedestal (d 21.4-23.9, top 2.3 m), two armoured
        boxes with the twin 25 mm between them, barrels stowed near vertical leaning aft [MS, MT]: m2m3().
    11. Lifelines on stanchions round the whole deck, two whips, scuttles [MS, MT, CF].
    12. Paint: Soviet grey hull and house, faded red-brown deck, red-brown underbody under a white boot-top.
        Sampled [AS] (overcast) hull 146,157,154 and house 141,147,141, [MT] sunlit side 154,156,161, [MT]
        sunlit deck 190,169,162, [AS] underbody 151,92,78; taken to about 0.8 (deck 0.65): hull 0x787e7e,
        house 0x80868a, deck 0x7c6e69, underbody 0x6e3f35.
   CORRECTED against the first version (published figures, the PT-76B turret and the 2M-3M/BM-14-17 fit are
   kept): freeboard 1.32-1.80 m (was 1.15-1.40); a knuckle and flare (none before); the propeller tunnels
   (the old model had open shafts under a plain bottom); barbette 0.95 m tall and r 1.72 at d 7.56 (was 0.55 m,
   r 1.38, d 7.6); the PT-76B turret scaled to the photographed 2.67 m base, 0.79 m height and 4.3 m gun reach
   (x1.22 across, x1.35 up; the ru_pt76.js tables it is copied from measure 2.1 m, 0.55 m and 3.67 m); BM-14-17 in two tiers 9 + 8 (was 6 + 5 + 6); the raised block, the low after house and the
   mast re-measured; the radar is a slotted bar on the raised block, not a box on a mast platform.
   NOT CONFIRMED and not drawn: the 2M-6, the BP-30 casemate, Strela posts, Ogonyok mounts, mine rails (the
   photographs do not show them clearly), the exact BM-14-17 tube length (drawn 1.75 m as [MS] shows the bank;
   ru.wikipedia gives 1100 mm guides), bow star, hull numbers, names, ensigns.  Propellers and rudders are
   generic (inside the tunnels, one each).  Waterline z = 0.
   MODEL SPACE: +X bow, +Y port, +Z up, metres.  The PT-76B turret (copied from js/hero/ru_pt76.js) is the
   group named "turret", origin on the ring centre, gun along +X; everything else is baked, one mesh per
   material.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroShmel = (function () {
  "use strict";
  var TAU = Math.PI * 2;
  var L = 27.4, X0 = -L / 2, X1 = L / 2, GUN = 7.56, BARB = 0.95, BR = 1.72, TKXY = 1.22, TKZ = 1.35;
  function X(d) { return X1 - d; }       /* x at d metres abaft the stem head */
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

  /* a bin per material; UVs box-mapped in metres off the face normal (textures repeat every 8 m) */
  var UVS = 1 / 8;
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
  /* loft through rings of equal point count, flat fans at both ends (rings convex), faceted */
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
    solid(bin, V, F);
  }
  /* smooth-sided loft (the PT-76B turret shell, from js/hero/ru_pt76.js) */
  function loftS(bin, rings) {
    var n = rings[0].length, V = [], F = [], i, k, r, a, b, c0, c1, f, vol = 0;
    for (r = 0; r < rings.length; r++) for (k = 0; k < n; k++) V.push(rings[r][k]);
    var ns = V.length;
    for (r = 0; r + 1 < rings.length; r++) for (k = 0; k < n; k++) {
      a = r * n + k; b = r * n + (k + 1) % n; c0 = a + n; c1 = b + n;
      F.push([a, b, c1], [a, c1, c0]);
    }
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
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
  /* armour plating, 8 m square: strakes every 1.0 m, butts every 2 m staggered, weld beads, faint weathering */
  function drawPlate(g, S) {
    var R = rng(1204), i, k, m = S / 8;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 70; i++) {
      g.globalAlpha = 0.02 + R() * 0.04; g.fillStyle = R() < 0.55 ? "#8a949a" : "#ffffff";
      g.fillRect(R() * S, R() * S, (0.5 + R() * 2) * m, (0.2 + R() * 0.6) * m);
    }
    g.globalAlpha = 1;
    for (k = 0; k < 8; k++) {
      var y = Math.round(k * m);
      g.fillStyle = "rgba(60,70,76,0.30)"; g.fillRect(0, y, S, 2);
      g.fillStyle = "rgba(255,255,255,0.30)"; g.fillRect(0, y + 2, S, 1);
      for (i = 0; i < 4; i++) { var x = Math.round(((i * 2 + (k % 2)) % 8) * m); g.fillStyle = "rgba(60,70,76,0.24)"; g.fillRect(x, y, 2, m); }
    }
    for (i = 0; i < 22; i++) {
      g.globalAlpha = 0.05 + R() * 0.06; g.fillStyle = "#5b5048";
      g.fillRect(R() * S, R() * S, 0.06 * m, (0.3 + R() * 0.8) * m);
    }
    g.globalAlpha = 1;
  }
  /* deck: welded plates 1.5 x 3 m and their seams, faded paint */
  function drawDeck(g, S) {
    var R = rng(1967), i, j, m = S / 8;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 3; i++) for (j = 0; j < 6; j++) {
      g.fillStyle = "rgba(0,0,0," + (0.02 + R() * 0.06).toFixed(3) + ")";
      g.fillRect(i * 3 * m + 2, j * 1.5 * m + 2, 3 * m - 4, 1.5 * m - 4);
    }
    g.fillStyle = "rgba(40,36,34,0.35)";
    for (i = 0; i <= 3; i++) g.fillRect(Math.round(i * 3 * m) - 1, 0, 2, S);
    for (j = 0; j <= 6; j++) g.fillRect(0, Math.round(j * 1.5 * m) - 1, S, 2);
  }

  function materials(THREE, C) {
    var plate = canvasTex(THREE, "plate", drawPlate), deckT = canvasTex(THREE, "deck", drawDeck);
    function mk(c, r, m, map) {
      var o = { color: c, roughness: r, metalness: m };
      if (map) o.map = map;
      return new THREE.MeshStandardMaterial(o);
    }
    return {
      hull: mk(0x787e7e, 0.84, 0.07, plate),      /* hull sides and transom */
      sup: mk(0x80868a, 0.84, 0.06, plate),       /* house, barbette, turret, mounts */
      boot: mk(0x6e3f35, 0.88, 0.04),             /* red-brown underbody */
      white: mk(0xb9bcb8, 0.8, 0.03),             /* boot-top line */
      deck: mk(0x7c6e69, 0.95, 0.04, deckT),      /* faded red-brown deck */
      dark: mk(0x26292c, 0.78, 0.3),              /* strake, recesses, doors, guns, tube mouths */
      metal: mk(0x4e5559, 0.5, 0.55),             /* rails, mast, aerials, launcher tubes */
      glass: mk(0x17222b, 0.15, 0.4),
      buoy: mk(0xb8432c, 0.7, 0.02),              /* lifebuoys */
      team: mk((C && C.team !== undefined) ? C.team : 0x3f7fd0, 0.84, 0.06)
    };
  }

  /* ------------------------------------------------------------ hull: station table, d metres abaft the
     stem head.  ZD deck edge, ZK knuckle (above the white boot-top line [MS]); HD / HK / HW half-breadths
     at the deck edge, knuckle and waterline; KL the flat bottom; TZ the crown of the propeller tunnels.
     Heights off [MS] at 31.8 px/m; breadths from the published 4.32 m beam, the flare in [AS] and [MS],
     the transom and tunnels in [MT]. */
  var H = {
    stemFoot: 0.85,
    ZD: [[0, 1.80], [1.5, 1.70], [4.5, 1.61], [8, 1.53], [12, 1.46], [16, 1.39], [20, 1.34], [27.4, 1.27]],
    ZK: [[0, 0.95], [2, 0.80], [4.2, 0.56], [7, 0.38], [10, 0.28], [27.4, 0.25]],
    HD: [[0, 0.10], [1, 0.66], [2.5, 1.22], [4.5, 1.66], [7, 1.95], [10, 2.06], [13, 2.08], [23, 2.08], [27.4, 1.98]],
    HK: [[0, 0.06], [1, 0.52], [2.5, 1.05], [4.5, 1.52], [7, 1.92], [10, 2.12], [13, 2.16], [23, 2.16], [27.4, 2.11]],
    HW: [[0.85, 0.03], [2, 0.50], [3.5, 0.95], [5.5, 1.42], [8, 1.82], [11, 2.04], [14, 2.08], [23, 2.08], [27.4, 2.02]],
    KL: [[0.85, 0], [1.6, -0.25], [2.8, -0.47], [4.2, -0.63], [6, -0.76], [8.5, -0.84], [22, -0.85], [27.4, -0.80]],
    TZ: [[17.5, 0], [20.5, 0.20], [24, 0.38], [27.4, 0.48]]       /* tunnel crown rise above KL */
  };
  function zD(d) { return tbl(H.ZD, d); }
  function hD(d) { return tbl(H.HD, d); }
  function zLow(d) {
    if (d < H.stemFoot) return H.ZD[0][1] * (1 - d / H.stemFoot);
    return tbl(H.KL, d);
  }
  var NR = 19;
  function ring(d) {
    var x = X(d), zd = zD(d), zk = Math.min(tbl(H.ZK, d), zd - 0.1), hd = hD(d), hk = tbl(H.HK, d);
    var hw = d < H.stemFoot ? 0.03 : tbl(H.HW, d), kl = zLow(d), tz = kl + tbl(H.TZ, d), P = [], half = [];
    function pt(y, z) {
      if (z < kl) { z = kl; y = Math.min(Math.abs(y), 0.04) * (y < 0 ? -1 : 1); }
      return [y, z];
    }
    var hb = Math.min(hw * 0.94, hk), zb = kl * 0.55;
    half.push(pt(hd, zd), pt(hk, zk), pt(Math.min(hw, hk), Math.min(0, zk - 0.05)), pt(hb, zb),
              pt(hw * 0.80, kl), pt(Math.min(1.42, hw * 0.70), kl), pt(Math.min(0.95, hw * 0.47), tz),
              pt(Math.min(0.48, hw * 0.24), kl), pt(0.02, kl));
    P.push([x, 0, zd + 0.06 * clamp01(hd / 1.5)]);
    var k;
    for (k = 0; k < half.length; k++) P.push([x, half[k][0], half[k][1]]);
    for (k = half.length - 1; k >= 0; k--) P.push([x, -half[k][0], half[k][1]]);
    return P;                                       /* 1 + 9 + 9 = 19 points */
  }
  /* ring index -> material: deck, hull above the waterline point, boot below */
  var TAG = ["deck", "hull", "hull", "boot", "boot", "boot", "boot", "boot", "boot", "boot",
             "boot", "boot", "boot", "boot", "boot", "boot", "hull", "hull", "deck"];
  function earcut2(P) {          /* ear clipping of a simple polygon given as [y,z]; returns index triples */
    var idx = [], out = [], i, n, guard = 0, area = 0;
    for (i = 0; i < P.length; i++) { idx.push(i); var j = (i + 1) % P.length; area += P[i][0] * P[j][1] - P[j][0] * P[i][1]; }
    var sgn = area > 0 ? 1 : -1;
    function cr(a, b, c) { return ((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])) * sgn; }
    function inside(p, a, b, c) { return cr(a, b, p) > 0 && cr(b, c, p) > 0 && cr(c, a, p) > 0; }
    while (idx.length > 3 && guard++ < 2000) {
      n = idx.length;
      for (i = 0; i < n; i++) {
        var a = P[idx[(i + n - 1) % n]], b = P[idx[i]], c = P[idx[(i + 1) % n]];
        if (cr(a, b, c) <= 1e-9) continue;
        var ok = true;
        for (var k = 0; k < n && ok; k++) {
          var q = idx[k];
          if (q === idx[(i + n - 1) % n] || q === idx[i] || q === idx[(i + 1) % n]) continue;
          if (inside(P[q], a, b, c)) ok = false;
        }
        if (!ok) continue;
        out.push([idx[(i + n - 1) % n], idx[i], idx[(i + 1) % n]]);
        idx.splice(i, 1);
        break;
      }
      if (i === n) idx.splice(0, 1);               /* degenerate: drop a point */
    }
    if (idx.length === 3) out.push([idx[0], idx[1], idx[2]]);
    return out;
  }
  function addHull(B) {
    var ds = [], d, i, k;
    var base = [0, 0.2, 0.45, H.stemFoot, 1.2, 1.6, 2.1, 2.8, 3.5, 4.2, 5, 6, 7, 8.5, 10, 11.5, 13, 15, 17.5, 19, 20.5, 22, 23.5, 25, 26.3, 27.0, L];
    for (i = 0; i < base.length; i++) ds.push(base[i]);
    var R = ds.map(ring);
    for (i = 0; i + 1 < R.length; i++) {
      var A = R[i], Bq = R[i + 1];
      var tun = ds[i] > 18.5;                       /* the propeller tunnels read dark, as in [MT] */
      for (k = 0; k < NR; k++) {
        var j = (k + 1) % NR, bin = (tun && (k === 6 || k === 7 || k === 11 || k === 12)) ? B.dark : B[TAG[k]];
        var p = A[k], q = A[j], r = Bq[j], s = Bq[k];
        /* rings run bow to stern, points from the deck centre round by port and the keel to starboard */
        var c1 = cross(sub(q, p), sub(r, p));
        if (dot(c1, c1) > 1e-12) bin.tri(p, q, r);
        var c2 = cross(sub(r, p), sub(s, p));
        if (dot(c2, c2) > 1e-12) bin.tri(p, r, s);
      }
    }
    /* transom: the last ring cut at the waterline, each part ear-clipped (hull paint above, boot below) */
    var T = R[R.length - 1], xt = T[0][0];
    function clipZ(poly, above) {
      var out = [], i, n = poly.length;
      for (i = 0; i < n; i++) {
        var p = poly[i], q = poly[(i + 1) % n], ip = above ? p[1] >= 0 : p[1] <= 0, iq = above ? q[1] >= 0 : q[1] <= 0;
        if (ip) out.push(p);
        if (ip !== iq) { var t = p[1] / (p[1] - q[1]); out.push([lerp(p[0], q[0], t), 0]); }
      }
      return out;
    }
    var P2 = T.map(function (p) { return [p[1], p[2]]; });
    [[true, B.hull], [false, B.boot]].forEach(function (part) {
      var poly = clipZ(P2, part[0]);
      if (poly.length < 3) return;
      earcut2(poly).forEach(function (t) {
        var a = [xt, poly[t[0]][0], poly[t[0]][1]], b = [xt, poly[t[1]][0], poly[t[1]][1]], c = [xt, poly[t[2]][0], poly[t[2]][1]];
        var cc = cross(sub(b, a), sub(c, a));
        if (dot(cc, cc) < 1e-12) return;
        if (cc[0] < 0) part[1].tri(a, b, c); else part[1].tri(a, c, b);
      });
    });
  }
  /* a thin band laid on the hull side between heights za(d)..zb(d) from d0 to d1 (rubbing strake, boot-top) */
  function sideY(d, z) {
    var zd = zD(d), zk = Math.min(tbl(H.ZK, d), zd - 0.1), hd = hD(d), hk = tbl(H.HK, d), hw = tbl(H.HW, d);
    if (z >= zk) return lerp(hk, hd, (z - zk) / (zd - zk));
    var zw = Math.min(0, zk - 0.05);
    if (z >= zw) return lerp(Math.min(hw, hk), hk, (z - zw) / Math.max(zk - zw, 0.01));
    return Math.min(hw, hk);
  }
  function band(bin, d0, d1, zlo, zhi, out, step) {
    var d, s, st = step || 1.0;
    for (s = -1; s <= 1; s += 2) for (d = d0; d < d1 - 0.01; d += st) {
      var dn = Math.min(d + st, d1), za0 = zlo(d), zb0 = zhi(d), za1 = zlo(dn), zb1 = zhi(dn);
      var ya0 = sideY(d, za0), yb0 = sideY(d, zb0), ya1 = sideY(dn, za1), yb1 = sideY(dn, zb1);
      hexa(bin, [[X(d), s * (ya0 - 0.01), za0], [X(dn), s * (ya1 - 0.01), za1], [X(dn), s * (ya1 + out), za1], [X(d), s * (ya0 + out), za0],
                 [X(d), s * (yb0 - 0.01), zb0], [X(dn), s * (yb1 - 0.01), zb1], [X(dn), s * (yb1 + out), zb1], [X(d), s * (yb0 + out), zb0]]);
    }
  }

  /* lifelines: stanchions along both deck edges and two wires, from da to db */
  function rails(B, da, db, h, skip) {
    var s, d, hh = h || 0.8;
    for (s = -1; s <= 1; s += 2) {
      for (d = da; d < db - 0.01; d += 1.7) {
        var dn = Math.min(d + 1.7, db), y0 = s * (hD(d) - 0.07), y1 = s * (hD(dn) - 0.07);
        if (skip && skip(d)) continue;
        var z0 = zD(d), z1 = zD(dn);
        cyl(B.metal, [X(d), y0, z0 + hh], [X(dn), y1, z1 + hh], 0.016, 0.016, 4);
        cyl(B.metal, [X(d), y0, z0 + hh * 0.5], [X(dn), y1, z1 + hh * 0.5], 0.012, 0.012, 3);
        box(B.metal, X(d) - 0.022, X(d) + 0.022, y0 - 0.022, y0 + 0.022, z0, z0 + hh);
      }
      box(B.metal, X(db) - 0.022, X(db) + 0.022, s * (hD(db) - 0.07) - 0.022, s * (hD(db) - 0.07) + 0.022, zD(db), zD(db) + hh);
    }
  }

  /* ------------------------------------------------------------ superstructure.  Heights from the deck at
     the house (ZH = deck at d 11).  A: wheelhouse d 9.5-12.9 to 2.85 m; B: raised block d 12.9-15.6 to 4.1 m;
     C: low after house d 15.6-18.9 to 1.85 m.  All off [MS]; widths from [MT] and [AS]. */
  var ZH = 1.47, HA = 2.85, HB = 4.1, HC = 1.85;
  /* house A plan at height fraction h: faceted front (centre facet + two angled facets), sides tumbled in */
  function planA(h) {
    var xf = X(9.5) - 0.42 * h, xc = xf - 0.62, xr = X(12.95), w = 1.52 - 0.14 * h, wc = 0.62 - 0.06 * h;
    return [[xf, wc], [xc, w], [xr, w], [xr, -w], [xc, -w], [xf, -wc]];
  }
  function ringAt(plan, z) { return plan.map(function (p) { return [p[0], p[1], z]; }); }
  /* a thin plate standing proud of a planar face given by its 4 corners, offset along the face normal */
  function plate(bin, Q, t0, t1) {
    var n = unit(cross(sub(Q[1], Q[0]), sub(Q[3], Q[0]))), V = [], k, o;
    for (o = 0; o < 2; o++) for (k = 0; k < 4; k++) {
      var tt = o ? t1 : t0;
      V.push([Q[k][0] + n[0] * tt, Q[k][1] + n[1] * tt, Q[k][2] + n[2] * tt]);
    }
    solid(bin, [V[0], V[1], V[2], V[3], V[4], V[5], V[6], V[7]], HEXF);
  }
  /* point on house A's surface: facet index f (0 centre, 1 port angled, 2 port side), fraction u along it, height h */
  function onA(f, u, h, s) {
    var P = planA(h), z = ZH + HA * h, a, b;
    if (f === 0) { a = [P[0][0], s * P[0][1]]; b = [P[0][0], -s * P[0][1]]; }
    else if (f === 1) { a = [P[0][0], s * P[0][1]]; b = [P[1][0], s * P[1][1]]; }
    else { a = [P[1][0], s * P[1][1]]; b = [P[2][0], s * P[2][1]]; }
    return [lerp(a[0], b[0], u), lerp(a[1], b[1], u), z];
  }
  function panelA(bin, f, u0, u1, h0, h1, s, t0, t1) {
    plate(bin, [onA(f, u0, h0, s), onA(f, u1, h0, s), onA(f, u1, h1, s), onA(f, u0, h1, s)], t0, t1);
  }

  function addShip(B) {
    var s, j, d, i, x, k;
    addHull(B);
    /* black rubbing strake along the knuckle (d 9 aft) [MS]; white boot-top line at the waterline */
    band(B.dark, 9.0, L - 0.05, function (dd) { return Math.min(tbl(H.ZK, dd), zD(dd) - 0.1) - 0.13; },
         function (dd) { return Math.min(tbl(H.ZK, dd), zD(dd) - 0.1) + 0.05; }, 0.05, 1.5);
    band(B.white, 1.2, L - 0.05, function () { return -0.02; }, function () { return 0.05; }, 0.012, 1.5);
    /* scuttles at 1.05 m (d 7.2, 11.3, 13.6, 15.7) [MS] */
    for (s = -1; s <= 1; s += 2) [7.2, 11.3, 13.6, 15.7].forEach(function (dp) {
      var y = sideY(dp, 1.05);
      cylY(B.dark, X(dp), s * (y - 0.02), s * (y + 0.02), 1.05, 0.13, 12);
      cylY(B.metal, X(dp), s * (y - 0.01), s * (y + 0.03), 1.05, 0.155, 12);
    });

    rails(B, 1.4, L - 0.25, 0.8);

    /* forecastle: jackstaff with its lamp [MS], windlass and gypsy [MS], bitts, hawse, hatch, vents */
    cyl(B.metal, [X(0.35), 0, zD(0.35)], [X(0.35), 0, zD(0.35) + 3.1], 0.045, 0.025, 6);
    cylZ(B.dark, X(0.35), 0, zD(0.35) + 3.1, zD(0.35) + 3.3, 0.07, 8);
    var zw = zD(3.9);
    cylZ(B.sup, X(3.9), 0, zw - 0.02, zw + 0.3, 0.3, 14);
    cylZ(B.dark, X(3.9), 0, zw + 0.3, zw + 0.34, 0.25, 14);
    cylY(B.dark, X(3.6), -0.35, 0.35, zw + 0.2, 0.15, 10);
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.metal, X(2.0), s * 0.55, zD(2.0), zD(2.0) + 0.3, 0.08, 8);
      cylZ(B.metal, X(2.35), s * 0.55, zD(2.35), zD(2.35) + 0.3, 0.08, 8);
      cylZ(B.metal, X(5.4), s * 1.35, zD(5.4), zD(5.4) + 0.28, 0.08, 8);
      cylZ(B.metal, X(5.75), s * 1.35, zD(5.75), zD(5.75) + 0.28, 0.08, 8);
      cylZ(B.dark, X(2.9), s * 0.62, zD(2.9) - 0.02, zD(2.9) + 0.05, 0.13, 10);       /* hawse pipes */
      cylZ(B.sup, X(4.4), s * 0.85, zD(4.4), zD(4.4) + 0.42, 0.08, 8);              /* mushroom vents */
      cylZ(B.dark, X(4.4), s * 0.85, zD(4.4) + 0.42, zD(4.4) + 0.5, 0.15, 10);
    }
    box(B.sup, X(5.3), X(4.6), -0.4, 0.4, zD(5.0) - 0.03, zD(5.0) + 0.16);
    box(B.dark, X(5.25), X(4.65), -0.33, 0.33, zD(5.0) + 0.16, zD(5.0) + 0.19);
    /* barbette: tall drum, rim, a door aft */
    var zg = zD(GUN);
    cylZ(B.sup, TX, 0, zg - 0.05, zg + BARB, BR, 32);
    cylZ(B.dark, TX, 0, zg + BARB - 0.03, zg + BARB + 0.01, BR - 0.12, 32);
    cylZ(B.sup, TX, 0, zg + BARB - 0.07, zg + BARB - 0.02, BR + 0.03, 32);

    /* ---- house A: lofted from its faceted plan */
    loft(B.sup, [ringAt(planA(0), ZH - 0.04), ringAt(planA(1), ZH + HA)]);
    box(B.deck, X(12.9), X(9.95), -1.3, 1.3, ZH + HA, ZH + HA + 0.012);
    for (s = -1; s <= 1; s += 2) {
      /* angled front facets: one window each with its armoured shutter hinged up above it [AS] */
      panelA(B.glass, 1, 0.22, 0.82, 0.60, 0.80, s, -0.01, 0.025);
      panelA(B.sup, 1, 0.18, 0.86, 0.83, 0.92, s, -0.01, 0.06);
      /* two square side windows [MS], the first with its shutter below, the second plain */
      panelA(B.glass, 2, 0.06, 0.28, 0.62, 0.80, s, -0.01, 0.025);
      panelA(B.sup, 2, 0.03, 0.31, 0.38, 0.58, s, -0.01, 0.05);
      panelA(B.glass, 2, 0.40, 0.62, 0.62, 0.80, s, -0.01, 0.025);
      panelA(B.dark, 2, 0.72, 0.92, 0.05, 0.68, s, -0.01, 0.025);                  /* side door aft */
      /* two domed vent heads on the roof [MS], mushroom cowls at the after corners [MT] */
      cylZ(B.sup, X(10.7), s * 0.55, ZH + HA, ZH + HA + 0.12, 0.2, 12);
      cylZ(B.sup, X(10.7), s * 0.55, ZH + HA + 0.12, ZH + HA + 0.2, 0.15, 12);
      cylZ(B.sup, X(12.6), s * 1.15, ZH + HA, ZH + HA + 0.4, 0.1, 10);
      cylZ(B.dark, X(12.6), s * 1.15, ZH + HA + 0.4, ZH + HA + 0.47, 0.17, 10);
    }
    /* centre front facet: two shuttered windows (shutters closed) */
    panelA(B.dark, 0, 0.12, 0.45, 0.58, 0.82, 1, -0.01, 0.03);
    panelA(B.dark, 0, 0.55, 0.88, 0.58, 0.82, 1, -0.01, 0.03);
    /* roof lip over the front */
    panelA(B.sup, 0, 0.0, 1.0, 0.96, 1.0, 1, -0.01, 0.08);

    /* ---- house B: raised conning block, open bridge with a raked screen at its forward top, searchlight */
    var zb0 = ZH + HA - 0.02, zbt = ZH + HB, wb = 1.02;
    hexa(B.sup, [[X(15.6), -wb, zb0], [X(12.9), -wb, zb0], [X(12.9), wb, zb0], [X(15.6), wb, zb0],
                 [X(15.6), -wb + 0.08, ZH + 3.45], [X(12.9), -wb + 0.08, zbt - 0.25], [X(12.9), wb - 0.08, zbt - 0.25], [X(15.6), wb - 0.08, ZH + 3.45]]);
    hexa(B.sup, [[X(14.9), -wb + 0.08, ZH + 3.45], [X(13.25), -wb + 0.08, zbt - 0.25], [X(13.25), wb - 0.08, zbt - 0.25], [X(14.9), wb - 0.08, ZH + 3.45],
                 [X(14.9), -wb + 0.1, zbt], [X(13.25), -wb + 0.1, zbt], [X(13.25), wb - 0.1, zbt], [X(14.9), wb - 0.1, zbt]]);
    /* raked screen at the front of the open bridge, a dark opening each side under the roof [MS] */
    hexa(B.sup, [[X(13.25), -wb + 0.1, zbt - 0.27], [X(12.9), -wb + 0.08, zbt - 0.27], [X(12.9), wb - 0.08, zbt - 0.27], [X(13.25), wb - 0.1, zbt - 0.27],
                 [X(13.4), -wb + 0.1, zbt + 0.12], [X(13.2), -wb + 0.1, zbt + 0.12], [X(13.2), wb - 0.1, zbt + 0.12], [X(13.4), wb - 0.1, zbt + 0.12]]);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X(14.1), X(13.35), s * (wb - 0.1) - 0.02, s * (wb - 0.1) + 0.02, ZH + 3.4, ZH + 3.95);
      box(B.glass, X(13.2), X(13.0), s * 0.55 - 0.25, s * 0.55 + 0.25, ZH + 3.3, ZH + 3.6);
      /* lifebuoy on the after side of the block [MS] */
      cylY(B.buoy, X(15.05), s * (wb - 0.03), s * (wb + 0.07), ZH + 3.0, 0.35, 16);
      cylY(B.sup, X(15.05), s * (wb - 0.03), s * (wb + 0.08), ZH + 3.0, 0.2, 12);
      /* ladder rungs up the block side */
      for (j = 0; j < 3; j++) box(B.metal, X(15.45), X(15.25), s * (wb + 0.02), s * (wb + 0.07), ZH + 2.95 + j * 0.25, ZH + 2.98 + j * 0.25);
    }
    /* searchlight on the forward top of the block [AS] */
    cylZ(B.metal, X(13.6), 0, zbt, zbt + 0.25, 0.1, 10);
    cylX(B.metal, X(13.85), X(13.25), 0, zbt + 0.45, 0.24, 0.24, 18);
    cylX(B.glass, X(13.25), X(13.22), 0, zbt + 0.45, 0.2, 0.2, 18);
    /* radar: rail frame and drive box on the after end of the block, slotted bar at 5.4 m [MS, MT] */
    for (s = -1; s <= 1; s += 2) for (j = -1; j <= 1; j += 2) cylZ(B.metal, X(15.3 + 0.25 * j), s * 0.45, zbt, zbt + 0.8, 0.025, 4);
    box(B.metal, X(15.6), X(15.0), -0.5, 0.5, zbt + 0.78, zbt + 0.84);
    box(B.sup, X(15.45), X(15.15), -0.18, 0.18, zbt + 0.84, zbt + 1.1);
    box(B.dark, X(15.36), X(15.24), -0.86, 0.86, ZH + 5.32, ZH + 5.48);

    /* ---- house C: low after house, hipped roof on its after part, doors */
    var wc = 1.3, wct = 1.22, zc = ZH + HC - 0.07;
    hexa(B.sup, [[X(18.9), -wc, ZH - 0.05], [X(15.6), -wc, ZH - 0.05], [X(15.6), wc, ZH - 0.05], [X(18.9), wc, ZH - 0.05],
                 [X(18.85), -wct, zc], [X(15.6), -wct, zc], [X(15.6), wct, zc], [X(18.85), wct, zc]]);
    hexa(B.sup, [[X(18.85), -wct, zc], [X(16.9), -wct, zc], [X(16.9), wct, zc], [X(18.85), wct, zc],
                 [X(18.6), -wct + 0.3, zc + 0.22], [X(17.1), -wct + 0.3, zc + 0.22], [X(17.1), wct - 0.3, zc + 0.22], [X(18.6), wct - 0.3, zc + 0.22]]);
    box(B.deck, X(16.9), X(15.6), -wct + 0.04, wct - 0.04, zc, zc + 0.012);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X(16.35), X(15.85), s * wc - 0.03, s * wc + 0.02, ZH + 0.1, ZH + 1.45);   /* tall door [MS] */
      box(B.dark, X(18.25), X(17.6), s * wc - 0.03, s * wc + 0.02, ZH + 0.5, ZH + 1.2);     /* panel [MS] */
    }

    mast(B, zc);

    /* whip aerials on the house roof [MS, MT] */
    [[11.9, 1.15, ZH + HA, 7.3], [14.4, -0.85, zbt, 6.6]].forEach(function (a) {
      cylZ(B.metal, X(a[0]), a[1], a[2], a[2] + 0.3, 0.06, 6);
      cyl(B.metal, [X(a[0]), a[1], a[2] + 0.3], [X(a[0]), a[1], a[2] + a[3]], 0.025, 0.01, 4);
    });

    /* ---- BM-14-17 on its drum abaft house C (d 19.6), the rocket box, the 2M-3M (d 22.7) */
    bm14(B, 19.6);
    var zr = zD(20.7);
    box(B.sup, X(21.45), X(20.0), -0.62, 0.62, zr - 0.03, zr + 0.48);
    cylX(B.sup, X(21.45), X(20.0), 0, zr + 0.48, 0.62, 0.62, 16);
    box(B.dark, X(21.4), X(20.05), -0.64, 0.64, zr + 0.2, zr + 0.24);
    m2m3(B, 22.7);

    /* stern: post with its light on the centreline (d 26.0) [MS, MT], bitts, fairleads, hatch */
    cyl(B.metal, [X(26.0), 0, zD(26)], [X(26.0), 0, zD(26) + 2.5], 0.05, 0.035, 8);
    cylZ(B.dark, X(26.0), 0, zD(26) + 2.5, zD(26) + 2.7, 0.08, 8);
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.metal, X(25.0), s * 1.55, zD(25), zD(25) + 0.3, 0.08, 8);
      cylZ(B.metal, X(25.35), s * 1.55, zD(25), zD(25) + 0.3, 0.08, 8);
      cylZ(B.metal, X(19.8), s * 1.75, zD(19.8), zD(19.8) + 0.28, 0.075, 8);
      cylZ(B.metal, X(20.15), s * 1.75, zD(19.8), zD(19.8) + 0.28, 0.075, 8);
      box(B.sup, X(27.2), X(26.6), s * 1.75 - 0.08, s * 1.75 + 0.08, zD(26.9), zD(26.9) + 0.35);
    }
    box(B.dark, X(25.3), X(24.3), -0.5, 0.5, zD(24.8) - 0.02, zD(24.8) + 0.11);
    /* wire aerials from the masthead to the jackstaff and to the stern post [MS] */
    cyl(B.metal, [X(17.0), 0, ZH + 7.8], [X(0.35), 0, zD(0.35) + 3.0], 0.008, 0.008, 3);
    cyl(B.metal, [X(17.1), 0, ZH + 7.7], [X(26.0), 0, zD(26) + 2.4], 0.008, 0.008, 3);

    /* team colour, modest: a panel on the stern deck */
    box(B.team, X(27.0), X(26.3), -0.7, 0.7, zD(26.6) + 0.065, zD(26.6) + 0.085);

    /* underwater: a shaft, propeller and rudder in each tunnel (generic, never photographed) */
    for (s = -1; s <= 1; s += 2) {
      var ys = s * 0.95, zs = -0.42;
      cyl(B.metal, [X(L - 0.7), ys, zs], [X(L - 5.5), ys * 0.85, -0.7], 0.06, 0.06, 8);
      cylX(B.metal, X(L - 0.75), X(L - 0.5), ys, zs, 0.12, 0.06, 8);
      for (k = 0; k < 3; k++) {
        var pa = k / 3 * TAU + 0.4, py = Math.cos(pa) * 0.3, pz = Math.sin(pa) * 0.3;
        hexa(B.metal, [[X(L - 0.72), ys, zs], [X(L - 0.62), ys, zs], [X(L - 0.62), ys + py * 0.25, zs + pz * 0.25], [X(L - 0.72), ys + py * 0.25, zs + pz * 0.25],
                       [X(L - 0.7), ys + py, zs + pz - 0.03], [X(L - 0.64), ys + py, zs + pz - 0.03], [X(L - 0.64), ys + py + 0.03, zs + pz], [X(L - 0.7), ys + py + 0.03, zs + pz]]);
      }
      box(B.metal, X(L - 0.35), X(L - 0.05), ys - 0.025, ys + 0.025, -0.82, -0.12);
      box(B.metal, X(L - 2.2), X(L - 1.9), ys * 0.9 - 0.03, ys * 0.9 + 0.03, -0.75, -0.45);
    }
  }

  /* lattice mast on house C: four legs from d 15.8-16.9 narrowing to the head at d 17.0, 7.6 m above the deck;
     yard 7.95 m, lantern to 9.2 m [MS, MT] */
  function mast(B, zc) {
    var i, j, bay, nb = 5, zt = ZH + 7.6;
    var feet = [[15.85, 0.42], [15.85, -0.42], [16.9, -0.42], [16.9, 0.42]], top = [[16.92, 0.1], [16.92, -0.1], [17.1, -0.1], [17.1, 0.1]];
    function P(lg, f) { return [X(lerp(feet[lg][0], top[lg][0], f)), lerp(feet[lg][1], top[lg][1], f), lerp(zc, zt, f)]; }
    for (i = 0; i < 4; i++) cyl(B.metal, P(i, 0), P(i, 1), 0.045, 0.03, 5);
    for (bay = 0; bay < nb; bay++) {
      var f0 = bay / nb, f1 = (bay + 1) / nb;
      for (i = 0; i < 4; i++) {
        j = (i + 1) % 4;
        cyl(B.metal, P(i, f1), P(j, f1), 0.016, 0.016, 3);
        cyl(B.metal, P(i, f0), P(j, f1), 0.014, 0.014, 3);
      }
    }
    var xm = X(17.0);
    cyl(B.metal, [xm, 0, zt], [xm, 0, ZH + 8.45], 0.05, 0.04, 6);
    box(B.metal, xm - 0.04, xm + 0.04, -1.2, 1.2, ZH + 7.92, ZH + 7.98);                  /* yard */
    for (i = -1; i <= 1; i += 2) cyl(B.metal, [xm, 0, ZH + 7.55], [xm, i * 1.0, ZH + 7.93], 0.018, 0.018, 3);
    cylZ(B.metal, xm, 0, ZH + 8.45, ZH + 8.5, 0.12, 8);
    cylZ(B.glass, xm, 0, ZH + 8.5, ZH + 8.95, 0.08, 8);                                   /* masthead lantern */
    cylZ(B.metal, xm, 0, ZH + 8.95, ZH + 9.0, 0.11, 8);
    cyl(B.metal, [xm, 0, ZH + 9.0], [xm, 0, ZH + 9.25], 0.02, 0.01, 4);
    box(B.metal, X(16.0), X(15.7), -0.3, 0.3, ZH + 5.0, ZH + 5.04);                      /* small platform */
  }

  /* BM-14-17: drum pedestal, cradle, 17 tubes in two tiers (9 over 8), 1.75 m as [MS] shows them, stowed
     pointing aft, raised 17 deg */
  function bm14(B, d) {
    var x = X(d), zd = zD(d) - 0.03, zp = zd + 1.2, el = 0.30, ce = Math.cos(el), se = Math.sin(el), i, t;
    cylZ(B.sup, x, 0, zd, zp, 0.42, 18);
    for (i = -1; i <= 1; i += 2) cylY(B.dark, x, i * 0.41, i * 0.44, zd + 0.55, 0.13, 12);
    cylZ(B.metal, x, 0, zp, zp + 0.18, 0.5, 18);
    for (i = -1; i <= 1; i += 2) box(B.sup, x - 0.25, x + 0.25, i * 0.78 - 0.05, i * 0.78 + 0.05, zp + 0.1, zp + 0.55);   /* cradle cheeks */
    var zc = zp + 0.6;
    function lp(u, v, w) { return [x - u * ce - w * se, v, zc + u * se * 1 + w * ce]; }
    var rows = [[9, 0.09], [8, -0.075]], pitch = 0.165;
    for (t = 0; t < 2; t++) for (i = 0; i < rows[t][0]; i++) {
      var y = (i - (rows[t][0] - 1) / 2) * pitch, w = rows[t][1];
      cyl(B.metal, lp(-0.85, y, w), lp(0.9, y, w), 0.078, 0.078, 8);
      cyl(B.dark, lp(-0.88, y, w), lp(-0.84, y, w), 0.06, 0.06, 8);
      cyl(B.dark, lp(0.89, y, w), lp(0.93, y, w), 0.06, 0.06, 8);
    }
    /* ring frames round the bank at both ends and the middle */
    [-0.72, 0.05, 0.78].forEach(function (u) {
      solid(B.sup, [lp(u, -0.8, -0.17), lp(u + 0.07, -0.8, -0.17), lp(u + 0.07, 0.8, -0.17), lp(u, 0.8, -0.17),
                    lp(u, -0.8, 0.18), lp(u + 0.07, -0.8, 0.18), lp(u + 0.07, 0.8, 0.18), lp(u, 0.8, 0.18)], HEXF);
    });
    box(B.metal, x - 0.06, x + 0.06, -0.06, 0.06, zp + 0.55, zp + 1.05);                   /* sight post [MS] */
  }

  /* 2M-3M: box pedestal, two armoured boxes with the twin 25 mm between them, trained aft, barrels stowed at
     about 70 deg leaning aft [MS, MT] */
  function m2m3(B, d) {
    var x = X(d), zd = zD(d) - 0.03, zp = zd + 0.85, s, i;
    box(B.sup, X(23.4), X(21.4), -0.72, 0.72, zd, zp);
    box(B.dark, X(23.3), X(21.5), -0.74, 0.74, zd + 0.35, zd + 0.39);
    cylZ(B.metal, x, 0, zp, zp + 0.12, 0.7, 18);
    /* each box: a profile in x-z (forward lower part, rounded upper after part), extruded across */
    var prof = [[-1.15, 0], [1.1, 0], [1.1, 0.95], [0.95, 1.3], [0.6, 1.45], [-0.45, 1.45], [-0.62, 1.2], [-1.15, 1.05]];
    for (s = -1; s <= 1; s += 2) {
      var yi = s * 0.2, yo = s * 0.84, V = [];
      prof.forEach(function (p) { V.push([x - p[0], yi, zp + 0.1 + p[1]]); });
      prof.forEach(function (p) { V.push([x - p[0], yo, zp + 0.1 + p[1]]); });
      var n = prof.length, F = [];
      for (i = 0; i < n; i++) { var j = (i + 1) % n; F.push([i, j, n + j], [i, n + j, n + i]); }
      for (i = 1; i + 1 < n; i++) { F.push([0, i + 1, i]); F.push([n, n + i, n + i + 1]); }
      solid(B.sup, V, F);
      box(B.dark, x - 0.2, x + 0.45, yo - (s > 0 ? 0.02 : -0.02) * 1 - 0.01, yo + 0.01 * s, zp + 0.5, zp + 1.1);   /* side door */
    }
    /* cradle and the two barrels between the boxes, elevated 70 deg toward the stern */
    box(B.dark, x - 0.5, x + 0.55, -0.2, 0.2, zp + 0.1, zp + 1.25);
    var el = 1.22, ce = Math.cos(el), se = Math.sin(el), bz = zp + 1.05;
    for (i = -1; i <= 1; i += 2) {
      cyl(B.dark, [x - 0.15, i * 0.1, bz], [x - 0.15 - 0.55 * ce, i * 0.1, bz + 0.55 * se], 0.07, 0.07, 8);
      cyl(B.metal, [x - 0.15, i * 0.1, bz], [x - 0.15 - 1.9 * ce, i * 0.1, bz + 1.9 * se], 0.03, 0.026, 6);
      cyl(B.dark, [x - 0.15 - 1.8 * ce, i * 0.1, bz + 1.8 * se], [x - 0.15 - 1.95 * ce, i * 0.1, bz + 1.95 * se], 0.04, 0.04, 6);
    }
  }

  /* ------------------------------------------------------------ PT-76B turret, copied from js/hero/ru_pt76.js */
  function tring(r, n) {
    var pts = [], k, c, a;
    for (k = 0; k < n; k++) {
      a = k / n * TAU; c = Math.cos(a);
      pts.push([r[4] + (c >= 0 ? r[1] : r[2]) * c, r[3] * Math.sin(a), r[0]]);
    }
    return pts;
  }
  function addTurret(B) {
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
    /* cast mantlet, sunk into the front slope */
    cylX(B.paint, 0.74, 1.10, 0, 0.36, 0.25, 0.19, 16);
    cylX(B.dark, 1.08, 1.16, 0, 0.38, 0.14, 0.12, 14);
    /* gun: jacket, fume extractor, tube, double-baffle muzzle brake */
    cylX(B.dark, 1.10, 1.95, 0, 0.38, 0.105, 0.085, 14);
    cylX(B.dark, 1.90, 3.35, 0, 0.38, 0.080, 0.062, 14);
    cylX(B.dark, 1.78, 1.90, 0, 0.38, 0.085, 0.118, 14);
    cylX(B.dark, 1.90, 2.28, 0, 0.38, 0.118, 0.118, 14);
    cylX(B.dark, 2.28, 2.40, 0, 0.38, 0.118, 0.080, 14);
    cylX(B.dark, 3.27, 3.65, 0, 0.38, 0.100, 0.100, 14);
    cylX(B.dark, 3.25, 3.29, 0, 0.38, 0.125, 0.125, 14);
    cylX(B.dark, 3.45, 3.49, 0, 0.38, 0.125, 0.125, 14);
    cylX(B.dark, 3.63, 3.67, 0, 0.38, 0.125, 0.125, 14);
    box(B.paint, 3.31, 3.43, -0.04, 0.04, 0.28, 0.48);
    box(B.paint, 3.51, 3.61, -0.04, 0.04, 0.28, 0.48);
    /* coaxial machine gun and the sight window in the mantlet face */
    cylX(B.dark, 1.02, 1.55, -0.19, 0.30, 0.025, 0.02, 6);
    box(B.glass, 1.06, 1.10, 0.14, 0.24, 0.38, 0.50);
    box(B.dark, 1.02, 1.08, 0.12, 0.26, 0.34, 0.52);
    /* commander's cupola with four periscopes, loader's hatch (hatch discs carry the team colour) */
    cylZ(B.paint, -0.26, -0.32, 0.46, 0.66, 0.25, 16);
    for (i = 0; i < 4; i++) box(B.glass, -0.26 + 0.22 * Math.cos(i * TAU / 4 + 0.4) - 0.03, -0.26 + 0.22 * Math.cos(i * TAU / 4 + 0.4) + 0.03,
                                -0.32 + 0.22 * Math.sin(i * TAU / 4 + 0.4) - 0.03, -0.32 + 0.22 * Math.sin(i * TAU / 4 + 0.4) + 0.03, 0.60, 0.66);
    cylZ(B.team, -0.26, -0.32, 0.66, 0.695, 0.19, 16);
    cylZ(B.dark, -0.24, 0.36, 0.45, 0.56, 0.26, 16);
    cylZ(B.team, -0.24, 0.36, 0.56, 0.585, 0.20, 16);
    box(B.dark, -0.52, -0.46, 0.30, 0.42, 0.56, 0.60);
    /* ventilator dome at the rear, sight box on the roof front, handrail, antenna base, headlamp */
    box(B.paint, -0.72, -0.48, -0.16, 0.16, 0.50, 0.62);
    box(B.dark, -0.74, -0.70, -0.12, 0.12, 0.54, 0.60);
    box(B.paint, 0.20, 0.50, 0.40, 0.62, 0.48, 0.58);
    box(B.glass, 0.50, 0.53, 0.43, 0.59, 0.50, 0.56);
    box(B.dark, -0.90, -0.84, -0.50, 0.50, 0.30, 0.34);
    box(B.dark, 0.34, 0.44, 0.52, 0.60, 0.46, 0.58);
    cylX(B.dark, 0.44, 0.62, 0.56, 0.58, 0.07, 0.07, 12);
    cylX(B.glass, 0.62, 0.64, 0.56, 0.58, 0.055, 0.055, 12);
  }

  function bins(T, names) { var o = {}; names.forEach(function (n) { o[n] = new Bin(T[n]); }); return o; }

  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group();
    var HB2 = bins(T, ["hull", "sup", "boot", "white", "deck", "dark", "metal", "glass", "buoy", "team"]);
    addShip(HB2);
    flush(THREE, g, HB2);
    /* trained mount: the PT-76B turret on the barbette (the mount of the row's first weapon, see header) */
    var TB = { paint: new Bin(T.sup), dark: new Bin(T.dark), glass: new Bin(T.glass), team: new Bin(T.team) };
    addTurret(TB);
    /* [MS]: the turret is 2.67 m across its base and 0.79 m tall on the barbette and the gun reaches 4.3 m
       forward of the ring centre; the ru_pt76.js tables (2.1 m, 0.55 m, 3.67 m) are scaled up to that */
    Object.keys(TB).forEach(function (k) {
      var P = TB[k].P, N = TB[k].N, i;
      for (i = 0; i < P.length; i += 3) {
        P[i] *= TKXY; P[i + 1] *= TKXY; P[i + 2] *= TKZ;
        var n = unit([N[i] / TKXY, N[i + 1] / TKXY, N[i + 2] / TKZ]);
        N[i] = n[0]; N[i + 1] = n[1]; N[i + 2] = n[2];
      }
    });
    var wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(TX, 0, zD(GUN) + BARB);
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
