/* ========== pact_e80_mbt.js - HERO models: the T-80 family =================
   pact_e80_mbt      T-80U (1985)     cast turret under Kontakt-5, K-5 glacis, black rubber
                                      skirts armoured over the first three wheels, GTD-1250 deck
   pact_e20_t80bvm   T-80BVM (2018)   the T-80B/BV hull and turret rebuilt with Relikt, the new
                                      sights and the 2020s slat screens
   One builder, a VARIANTS table: the hull and running gear are shared (same LKZ hull, lofted
   from the station table HS below), and each row draws its own turret, glacis, skirts and stern.

   REDO 2026-10-24 (full-quality procedure).  References, Wikimedia Commons at width 960,
   cached in scratchpad/q_t80_ref:
     D1  "T-80.gif" - side line drawing of a T-80 (T-80B: cast turret, 12.7 mm on the cupola).
         Hull profile, six wheels and five return rollers, raised idler and sprocket, the
         turret's length and place on the hull, deck and roof heights, a drum seen end-on above
         the rear plate.  Scaled at 35.2 px/m from the 7.0 m hull; the 670 mm wheel agrees to 6%.
     P1  "T-80 in Saint-Petersburg.jpg" - T-80B, starboard front 3/4 (hull, fenders, skirts).
     P2  "4th Guard Tank Division T-80U - April 2016 01.jpg" - T-80U nearly head-on: the K-5
         glacis in courses, the K-5 horseshoe on the turret, smoke banks of four on the front
         corners, 1G46 head left, 12.7 mm right, the big rubber flaps ahead of the idlers.
     P3  "T-80U tank of the Russian Army.jpg" - T-80U, starboard front 3/4 (2008).
     P4  "T-80U (1).jpg" - T-80U, port side: rubber skirts with the K-5 boxes over the first
         three wheels, stowage boxes high on the turret flank, the snorkel across the bustle.
     P5  "T-80BVM MBT Army-2022 2022-08-20 2611.jpg" - T-80BVM head-on: the Relikt fan of three
         tilted slabs a side, canvas mantlet boot, tall sight box and 12.7 mm on the right, square
         sight head and lamp on the left, plain glacis with four louvred blocks, lamps in U guards.
     P6  "T-80BVM (2).jpg" - T-80BVM, 2020 parade, starboard front 3/4 (roof tile arrays,
         nose apron, ribbed front fender boxes).
     P7  "T-80BVM MBT Army-2022 2022-08-20 2606.jpg" - T-80BVM, port side 3/4: two rows of Relikt
         boxes in five columns, then a slat screen over the rear half of the side, the slat cage
         round the stern and round the turret bustle (all painted green), four Relikt boxes down
         the turret flank, the cylinder on the left rear fender, sensor mast and whip.
     P9  "Kazan T-80 2024-07-18 2421.jpg" - T-80B museum piece, starboard 3/4 (wheel spacing,
         idler, sprocket, front fenders).
     P10 "T-80 Museum of technique Rear.jpg" - T-80 from astern: the turbine exhaust grille in
         the rear plate, the log across it, the snorkel tube across the turret rear.
   Published figures (en.wikipedia T-80 after Foss 2005; ru.wikipedia): gun forward 9.654 m
   (T-80U), height 2.202 m, width 3.603 m (T-80U over the skirts), ground clearance 0.446 m
   (T-80U), six rubber-tyred road wheels a side and rear drive sprockets, full-length rubber
   skirts "armoured above the first three road wheels" on the T-80U; hull 7.0 m (D1 scale).
   Model: 9.65 m muzzle to rear plate, 2.20 m to the roof, 3.65 m over the T-80U skirt armour.

   CORRECTIONS against the previous model (the references do not support it):
   - 356 draw calls -> 15 (one mesh per material per part, as the other heroes);
   - the two drums were laid lengthwise and stood 0.7 m out behind the tank: D1 shows a drum
     end-on, so they lie ACROSS the top of the rear plate;
   - road-wheel pitch 0.80 m -> 0.91 m (D1), the hull 6.93 -> 7.0 m, the turret ring 0.31 m
     further aft (D1: the turret sits a little behind mid-hull);
   - T-80U skirts: the K-5 boxes were a separate row standing proud of all-rubber skirts; the
     first three panels ARE the armoured skirt (Wikipedia, P4); rubber behind them;
   - T-80BVM: Relikt skirts are two rows of boxes in five columns (P7), not five tall panels;
     the 2020s screens are a slat cage round the stern and the turret bustle plus a slat
     screen over the rear half of the side (P7), not one rear plane; they are painted green;
   - T-80BVM sights: the old model put the big sight box on the gunner's (left) side; P5 and
     P7 show the tall box on the RIGHT front of the roof with the 12.7 mm behind it, and a
     square head and a lamp on the left.  Drawn where the photographs put them.
   Kept from the old header and confirmed: the rear drive, six wheels, five return rollers,
   black rubber skirts and flaps (P2, P4), the snorkel on the bustle (P4, P10), the turbine
   exhaust low in the rear plate (P10), the cylinder on the BVM's left rear fender (P7).

   Recognition list (what makes each one read at game zoom, and its source):
     1. six big rubber-tyred road wheels, rear sprocket and front idler both raised - D1, P9
     2. low hull, long shallow glacis rising to a flat deck level with the fenders - D1, P2
     3. full-length skirts hung from the fender line to the wheel tops - D1, P4, P7
     4. long 125 mm gun with the sleeve bands and the bore evacuator - D1, P3
     5. gas-turbine deck: the long louvred intake field over the rear, exhaust grille in the
        rear plate - P10
     T-80U:
     6. Kontakt-5 glacis in four courses, notched for the driver's periscope - P2, P3
     7. black rubber skirts, the first three panels armoured; big rubber flaps over the idlers - P2, P4
     8. wide flat cast turret under the K-5 horseshoe, flat K-5 course across the front roof,
        smoke banks of four on the front corners - P2, P3
     9. 1G46 sight head left, cupola with the 12.7 mm right, snorkel across the bustle, two drums
        across the rear plate, the log - P2, P4, D1, P10
     T-80BVM:
    10. the Relikt fan of three tilted slabs each side of the gun, tile arrays on the roof - P5, P6
    11. two rows of Relikt boxes along the front of the side, then the slat screen - P7
    12. slat cages round the stern and the turret bustle - P7
    13. plain glacis with four louvred blocks and lamps in U guards, apron across the nose - P5, P6
   Paint (sampled, then taken to about 0.8 of level for the ACES pass): T-80U green #5e6a55
   (P2, P4, cloudy) -> #4d5740; T-80BVM 2022 green #566455 (P7) -> #4a5748.  No numbers, flags,
   show logos or markings (P2 to P7 carry numbers or logos: not drawn).
   NOT CONFIRMED, drawn as judgement calls: K-5 and Relikt brick counts (texture); the drums
   on the T-80U (D1 is a T-80B; no T-80U photo here shows the stern); the names of the two
   BVM sight boxes; D1 draws the middle wheel gap a little shorter than the rest - the
   photographs do not resolve it, so the pitch is even; the BVM's smoke dischargers (not
   visible in P5 to P7: NOT drawn); the arched bracket over the BVM turret rear in P7 (NOT
   drawn); clearance is drawn at the T-80U's 0.45 m for both (T-80B published 0.38 m).
   Wartime kit (cope cages, markings) is NOT drawn.

   Materials: PAINT (canvas texture: base, mottling, weld seams, bolt rows), DARK (track,
   fittings, sights, grilles), RUBBER (skirts, flaps), ERA (canvas texture of bolted cover
   plates, metre UVs: 0.25 m plates for K-5, 0.5 m panels for Relikt), WHEEL (tyres, discs and
   recesses by vertex colour) and the team colour exactly as handed in (C.team): two small
   strips (engine deck, turret roof), 0.25 m wide and 0.8 m long, 2 cm proud.
   Nodes: "turret" (trains, origin on the ring centre, gun along +X), six "roadwheel" groups
   (axle along local Y, each holding both sides).  Draw calls: hull 5 + turret 4 + 6 wheels.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */


if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroT80U = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------- variant table */
  var VARIANTS = {
    t80u:   { paint: { base: "#4d5740", blots: ["#444e38", "#58614a"], seed: 80 }, era: "#4a543d",
              tur: "u", glacis: "k5", skirts: "u", drums: true, log: true, cage: false },
    t80bvm: { paint: { base: "#4a5748", blots: ["#424f41", "#54614f"], seed: 2018 }, era: "#475445",
              tur: "bvm", glacis: "plain", skirts: "relikt", drums: false, log: false, cage: true }
  };

  /* running gear (D1, P4, P9): six 670 mm road wheels at an even 0.91 m pitch, five small return
     rollers, the idler forward and the drive sprocket at the REAR, both raised */
  var TY = 1.40, TW = 0.29;
  var XW = [2.10, 1.19, 0.28, -0.63, -1.54, -2.45], ZW = 0.435, RW = 0.335;
  var XR = [1.645, 0.735, -0.175, -1.085, -1.995], ZR = 0.835, RR = 0.085;
  var IDL = { x: 3.02, z: 0.62, r: 0.28 }, SPR = { x: -3.12, z: 0.76, r: 0.31 };
  var DECK = 1.46, RING = 1.46, FW = 1.74, TX = -0.15;
  var GL = 0.404;                                  /* upper glacis: 22 deg off the horizontal */
  /* ------------------------------------------------------------ geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  function Bin(mat, uv, vc, us) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; this.us = us || 0.34; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]), k = this.us;
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * k, q[1] * k);
        else if (ay >= ax) this.U.push(q[0] * k, q[2] * k);
        else this.U.push(q[1] * k, q[2] * k);
      }
    }
  };
  function triN(bin, a, b, c, hint) {
    var n = cross(sub(b, a), sub(c, a));
    if (dot(n, hint) < 0) bin.tri(a, c, b); else bin.tri(a, b, c);
  }
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
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  /* an oriented slab: centre c, half sizes along unit axes u, v, w */
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, sx, sy, sz, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      sx = s[i][0] * hu; sy = s[i][1] * hv; sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  /* a plate in the x-z plane from (x0, z0) to (x1, z1), spanning y0..y1, thickness th */
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz), nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
  function cyl(bin, A, B, r0, r1, seg, nocap) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), V = [], N = [], F = [], i, j, c, s, rn, base, rA, rB, na;
    for (i = 0; i < seg; i++) {
      c = Math.cos(i / seg * TAU); s = Math.sin(i / seg * TAU);
      rn = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
      V.push([A[0] + rn[0] * r0, A[1] + rn[1] * r0, A[2] + rn[2] * r0]); N.push(rn);
      V.push([B[0] + rn[0] * r1, B[1] + rn[1] * r1, B[2] + rn[2] * r1]); N.push(rn);
    }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    if (!nocap) {
      base = V.length; na = [-ax[0], -ax[1], -ax[2]];
      V.push(A, B); N.push(na, ax);
      rA = base + 2; rB = base + 2 + seg;
      for (i = 0; i < seg; i++) { V.push(V[2 * i]); N.push(na); }
      for (i = 0; i < seg; i++) { V.push(V[2 * i + 1]); N.push(ax); }
      for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, rA + j, rA + i], [base + 1, rB + i, rB + j]); }
    }
    solid(bin, V, F, N);
  }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg); }

  /* a closed solid lofted through LEVELS, each a ring of [x, y, z] points with the same count,
     every ring convex in its own plane; the end rings are capped with fans */
  function loftN(bin, L) {
    var V = [], F = [], n = L[0].length, m = L.length, i, k;
    for (k = 0; k < m; k++) for (i = 0; i < n; i++) V.push(L[k][i]);
    for (k = 0; k + 1 < m; k++)
      for (i = 0; i < n; i++) {
        var a = k * n + i, b = k * n + (i + 1) % n, c = (k + 1) * n + (i + 1) % n, d = (k + 1) * n + i;
        F.push([a, b, c], [a, c, d]);
      }
    for (i = 1; i + 1 < n; i++) { F.push([0, i + 1, i]); F.push([(m - 1) * n, (m - 1) * n + i, (m - 1) * n + i + 1]); }
    solid(bin, V, F);
  }
  /* half plan [x, y] (y >= 0, front to rear) to a full closed ring at height z (y scaled by s) */
  function ringAt(H, z, dx) {
    var Q = [], i;
    dx = dx || 0;
    for (i = 0; i < H.length; i++) Q.push([H[i][0] + dx, H[i][1], H[i].length > 2 ? H[i][2] : z]);
    for (i = H.length - 1; i >= 0; i--) Q.push([H[i][0] + dx, -H[i][1], H[i].length > 2 ? H[i][2] : z]);
    return Q;
  }
  function mirrorY(P, s) { return P.map(function (q) { return [q[0], q[1] * s, q[2]]; }); }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function canvasTex(THREE, key, size, draw) {
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = size; cv.height = size;
      draw(cv.getContext("2d"), size);
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }

  function paintTex(THREE, P) {
    return canvasTex(THREE, "t80p" + P.base + P.seed, 512, function (q, S) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 14; i++) { q.globalAlpha = 0.30 + R() * 0.35; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 6; i++) {                 /* plate joints with their weld beads and bolt rows */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 2, w, 1); else q.fillRect(x + 2, y, 1, w);
        q.fillStyle = "rgba(18,18,14,0.45)";
        for (k = 6; k < w; k += 14) { if (i % 2) q.fillRect(x + k, y - 5, 3, 3); else q.fillRect(x - 5, y + k, 3, 3); }
      }
      for (i = 0; i < 90; i++) {                /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 24; i++) { q.fillStyle = "rgba(25,22,15,0.06)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
    });
  }
  /* reactive armour cover plates, one tile = 1 m: Kontakt-5 (P2, P3) is a field of 0.25 m plates
     with four bolt heads each; Relikt (P6, P7) the same plates in larger 0.5 m panels */
  function eraTex(THREE, base, big) {
    return canvasTex(THREE, "t80e" + base + (big ? "r" : "k"), 128, function (q, S) {
      var i, j, n = big ? 2 : 4, c = S / n;
      q.fillStyle = base; q.fillRect(0, 0, S, S);
      for (i = 0; i < n; i++) for (j = 0; j < n; j++) {
        q.fillStyle = "rgba(12,12,8,0.55)"; q.fillRect(i * c, j * c, c, 2); q.fillRect(i * c, j * c, 2, c);
        q.fillStyle = "rgba(230,230,210,0.12)"; q.fillRect(i * c + 2, j * c + 2, c - 4, 1);
        q.fillStyle = "rgba(15,15,10,0.6)";
        q.fillRect(i * c + 5, j * c + 5, 3, 3); q.fillRect(i * c + c - 8, j * c + 5, 3, 3);
        q.fillRect(i * c + 5, j * c + c - 8, 3, 3); q.fillRect(i * c + c - 8, j * c + c - 8, 3, 3);
        if (big) { q.fillRect(i * c + c / 2 - 1, j * c + 5, 3, 3); q.fillRect(i * c + c / 2 - 1, j * c + c - 8, 3, 3); }
      }
    });
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint), te = eraTex(THREE, V.era, V.tur === "bvm");
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    /* black rubber: the T-80U's skirts and front flaps, every tyre (P2, P3, P4) */
    T.rubber = new THREE.MeshStandardMaterial({ color: 0x1d1e1c, roughness: 0.95, metalness: 0.0 });
    T.era = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.08 });
    if (te) T.era.map = te; else T.era.color.set(V.era);
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), rubber: new Bin(T.rubber, false),
             era: new Bin(T.era, true, false, 1.0), team: new Bin(T.team, false) };
  }
  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }
  /* a slat screen in a vertical plane between plan points (x0, y0) and (x1, y1): frame rails top,
     bottom and middle, vertical slats at pitch p */
  function slats(bin, x0, y0, x1, y1, z0, z1, p) {
    var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy), u = [dx / L, dy / L, 0], v = [-dy / L, dx / L, 0], w = [0, 0, 1];
    var n = Math.max(2, Math.round(L / p)), i, t, zm = (z0 + z1) / 2;
    slab(bin, [(x0 + x1) / 2, (y0 + y1) / 2, z1 - 0.02], u, v, w, L / 2, 0.02, 0.02);
    slab(bin, [(x0 + x1) / 2, (y0 + y1) / 2, z0 + 0.02], u, v, w, L / 2, 0.02, 0.02);
    slab(bin, [(x0 + x1) / 2, (y0 + y1) / 2, zm], u, v, w, L / 2, 0.015, 0.015);
    for (i = 0; i <= n; i++) {
      t = i / n;
      slab(bin, [x0 + dx * t, y0 + dy * t, zm], u, v, w, (i % 4 === 0) ? 0.022 : 0.011, 0.018, (z1 - z0) / 2);
    }
  }

  /* ---------------------------------------------------------------- hull */
  /* station table (x, belly half width, belly z, side half width, roof z) measured off D1 at
     35.2 px/m (scale from the published 7.0 m hull and checked against the 670 mm wheel): a
     near-vertical rear plate, the flat deck at 1.46 m, the long upper glacis falling at 22 deg
     from x = 1.95 to the nose lip at 0.84 m, and the lower glacis tucking back under to the belly */
  function glacisZ(x) { return x <= 1.95 ? DECK : DECK - GL * (x - 1.95); }
  var HS = [
    [-3.50, 0.98, 0.70, 1.05, 1.38],
    [-3.49, 1.01, 0.58, 1.08, 1.43],
    [-3.46, 1.03, 0.50, 1.10, 1.46],
    [-3.30, 1.04, 0.46, 1.10, 1.46],
    [-2.50, 1.05, 0.45, 1.10, 1.46],
    [-1.50, 1.05, 0.45, 1.10, 1.46],
    [-0.50, 1.05, 0.45, 1.10, 1.46],
    [ 0.50, 1.05, 0.45, 1.10, 1.46],
    [ 1.50, 1.05, 0.45, 1.10, 1.46],
    [ 1.95, 1.05, 0.45, 1.10, 1.46],
    [ 2.30, 1.05, 0.45, 1.10, 1.319],
    [ 2.65, 1.05, 0.455, 1.10, 1.177],
    [ 2.95, 1.04, 0.49, 1.09, 1.056],
    [ 3.15, 1.02, 0.56, 1.08, 0.975],
    [ 3.30, 1.00, 0.65, 1.06, 0.915],
    [ 3.42, 0.98, 0.75, 1.04, 0.866],
    [ 3.48, 0.96, 0.80, 1.02, 0.842]
  ];
  function hullRing(S) {
    var x = S[0], wb = S[1], zB = S[2], ws = S[3], zT = S[4], e = Math.min(0.03, (zT - zB) / 4);
    return [[x, wb, zB], [x, ws, Math.min(zB + 0.10, zT - 2 * e)], [x, ws, zT - e], [x, ws - e, zT],
            [x, -(ws - e), zT], [x, -ws, zT - e], [x, -ws, Math.min(zB + 0.10, zT - 2 * e)], [x, -wb, zB]];
  }
  function addHull(B, V) {
    var R = HS.map(hullRing), i, k, k1, a, b, c, d, e, dy, dz, p, s, n = R[0].length, x, y;
    for (i = 0; i + 1 < R.length; i++)
      for (k = 0; k < n; k++) {
        k1 = (k + 1) % n;
        a = R[i][k]; b = R[i][k1]; c = R[i + 1][k1]; d = R[i + 1][k];
        dy = b[1] - a[1]; dz = b[2] - a[2];
        if (Math.abs(dy) + Math.abs(dz) < 1e-6) continue;
        e = [0, dz, -dy];
        triN(B.paint, a, b, c, e); triN(B.paint, a, c, d, e);
      }
    for (k = 1; k + 1 < n; k++) {
      triN(B.paint, R[0][0], R[0][k], R[0][k + 1], [-1, 0, 0]);
      triN(B.paint, R[R.length - 1][0], R[R.length - 1][k], R[R.length - 1][k + 1], [1, 0, 0]);
    }
    var ang = Math.atan(GL), u = [Math.cos(ang), 0, -Math.sin(ang)], w = [Math.sin(ang), 0, Math.cos(ang)];

    for (p = -1; p <= 1; p += 2) {
      var yi = p * 1.08, yo = p * FW, ylo = Math.min(yi, yo), yhi = Math.max(yi, yo);
      /* fender shelf level with the deck, with its turned-down outer lip (D1: the long straight
         fender line that runs the whole length) */
      box(B.paint, -3.46, 2.30, ylo, yhi, DECK - 0.035, DECK);
      box(B.paint, -3.46, 2.30, p > 0 ? FW - 0.03 : -FW, p > 0 ? FW : -FW + 0.03, DECK - 0.10, DECK + 0.015);
      /* front mudguard falling over the idler to the nose (P3, P9) */
      belt(B.paint, 2.30, DECK - 0.02, 3.05, 1.17, ylo, yhi, 0.04);
      belt(B.paint, 3.05, 1.17, 3.50, 1.00, ylo + (p > 0 ? 0.04 : 0), yhi - (p > 0 ? 0 : 0.04), 0.04);
      /* rear fender end over the sprocket */
      box(B.paint, -3.52, -3.46, p > 0 ? 1.10 : -FW, p > 0 ? FW : -1.10, 1.08, DECK + 0.015);
      /* inner track guard under the shelf */
      box(B.dark, -3.0, 2.25, p > 0 ? 1.08 : -1.12, p > 0 ? 1.12 : -1.08, 1.05, DECK - 0.04);
      /* tow cable along the fender top, both sides (P3) */
      cylX(B.dark, -2.90, 1.40, p * 1.62, DECK + 0.03, 0.022, 0.022, 6);
    }

    /* ---- side skirts ---------------------------------------------------------------- */
    var ZS0 = 0.76, ZS1 = DECK + 0.005, sx, yy;
    if (V.skirts === "u") {
      /* T-80U (P2, P4): black rubber skirts the full length, hung from the fender lip in seven
         panels; the front three carry Kontakt-5 boxes; a big rubber flap hangs ahead of each idler */
      var PAN = [[2.38, 1.66], [1.64, 0.92], [0.90, 0.18], [0.16, -0.62], [-0.64, -1.42], [-1.44, -2.22], [-2.24, -3.08]];
      for (p = -1; p <= 1; p += 2) {
        yy = p * (FW + 0.025);
        for (i = 0; i < PAN.length; i++) {
          /* the front three panels are the armoured ones (en.wikipedia T-80, after Foss 2005) */
          if (i >= 3) box(B.rubber, PAN[i][1], PAN[i][0], yy - 0.02, yy + 0.02, ZS0, ZS1);
          else box(B.rubber, PAN[i][1], PAN[i][0], p > 0 ? FW : -FW - 0.02, p > 0 ? FW + 0.02 : -FW, ZS0, ZS1);
          box(B.dark, PAN[i][1] + 0.02, PAN[i][1] + 0.06, yy + p * 0.02 - 0.01, yy + p * 0.02 + 0.01, ZS1 - 0.10, ZS1);
          if (i < 3) {
            /* Kontakt-5 box on the skirt: a thick slab with a sloped lower edge (P4) */
            loftN(B.era, [
              mirrorY([[PAN[i][0] - 0.01, FW + 0.005, 0.86], [PAN[i][1] + 0.01, FW + 0.005, 0.86], [PAN[i][1] + 0.01, FW + 0.07, 0.94], [PAN[i][0] - 0.01, FW + 0.07, 0.94]], p),
              mirrorY([[PAN[i][0] - 0.01, FW + 0.005, ZS1 - 0.01], [PAN[i][1] + 0.01, FW + 0.005, ZS1 - 0.01], [PAN[i][1] + 0.01, FW + 0.09, ZS1 - 0.01], [PAN[i][0] - 0.01, FW + 0.09, ZS1 - 0.01]], p)]);
          }
        }
        /* the front dust flap ahead of the idler, rubber, flared out (P2) */
        loftN(B.rubber, [
          mirrorY([[3.30, FW - 0.02, 0.62], [2.42, FW - 0.02, 0.62], [2.42, FW + 0.02, 0.62], [3.30, FW + 0.06, 0.62]], p),
          mirrorY([[3.40, FW - 0.06, 1.12], [2.42, FW - 0.02, ZS1], [2.42, FW + 0.02, ZS1], [3.40, FW - 0.02, 1.12]], p)]);
        /* rear mudflap behind the sprocket */
        box(B.rubber, -3.56, -3.52, p > 0 ? 1.12 : -FW, p > 0 ? FW : -1.12, 0.62, 1.10);
      }
    } else {
      /* T-80BVM (P6, P7): two rows of Relikt boxes over the forward half of the side, the
         lower row cut back at its foot; then a slat screen over the rear half to the stern */
      var RX = [2.50, 1.94, 1.38, 0.82, 0.26, -0.30];
      for (p = -1; p <= 1; p += 2) {
        for (i = 0; i + 1 < RX.length; i++) {
          var xa = RX[i] - 0.01, xb = RX[i + 1] + 0.01;
          box(B.era, xb, xa, p > 0 ? FW : -FW - 0.16, p > 0 ? FW + 0.16 : -FW, 1.10, ZS1);
          loftN(B.era, [
            mirrorY([[xa - 0.08, FW, 0.70], [xb + 0.08, FW, 0.70], [xb + 0.08, FW + 0.06, 0.70], [xa - 0.08, FW + 0.06, 0.70]], p),
            mirrorY([[xa, FW, 0.84], [xb, FW, 0.84], [xb, FW + 0.15, 0.84], [xa, FW + 0.15, 0.84]], p),
            mirrorY([[xa, FW, 1.09], [xb, FW, 1.09], [xb, FW + 0.15, 1.09], [xa, FW + 0.15, 1.09]], p)]);
          box(B.dark, xb - 0.012, xb + 0.012, p > 0 ? FW : -FW - 0.17, p > 0 ? FW + 0.17 : -FW, 0.86, ZS1);
        }
        /* rear-half slat screen on standoff brackets (P7) */
        yy = p * (FW + 0.12);
        slats(B.paint, -0.32, yy, -3.40, yy, 0.78, DECK + 0.10, 0.11);
        for (sx = -0.60; sx > -3.4; sx -= 0.70) box(B.paint, sx - 0.02, sx + 0.02, p > 0 ? FW : yy, p > 0 ? yy : -FW, DECK - 0.06, DECK);
        box(B.rubber, -3.56, -3.52, p > 0 ? 1.12 : -FW, p > 0 ? FW : -1.12, 0.62, 1.10);
      }
      /* the cylinder carried on the left rear fender ahead of the sprocket (P7, port side) */
      cylX(B.paint, -3.05, -2.05, 1.50, DECK + 0.17, 0.17, 0.17, 16);
      cylX(B.dark, -3.09, -3.05, 1.50, DECK + 0.17, 0.175, 0.175, 16);
      cylX(B.dark, -2.05, -2.01, 1.50, DECK + 0.17, 0.175, 0.175, 16);
      box(B.dark, -2.75, -2.69, 1.32, 1.68, DECK, DECK + 0.06);
      box(B.dark, -2.40, -2.34, 1.32, 1.68, DECK, DECK + 0.06);
    }

    /* ---- glacis ----------------------------------------------------------------------- */
    if (V.glacis === "k5") {
      /* T-80U (P2, P3): the bolted Kontakt-5 package over the whole upper glacis, notched at the
         top centre for the driver's periscope; its outer corners carried out over the fenders */
      for (s = -1; s <= 1; s += 2) {
        for (k = 0; k < 4; k++) slab(B.era, [2.365 + k * 0.30, s * 0.62, glacisZ(2.365 + k * 0.30) + 0.07], u, [0, 1, 0], w, 0.135, 0.40, 0.07);
        slab(B.era, [2.18, s * 0.66, glacisZ(2.18) + 0.06], u, [0, 1, 0], w, 0.10, 0.36, 0.06);
        slab(B.era, [2.70, s * 1.32, glacisZ(2.70) + 0.02], u, [0, 1, 0], w, 0.50, 0.24, 0.06);
        /* headlamp in its guard on the outer corner (P2) */
        cyl(B.dark, [2.05, s * 1.30, DECK + 0.10], [2.18, s * 1.30, DECK + 0.08], 0.09, 0.09, 12);
        box(B.paint, 1.98, 2.04, s * 1.30 - 0.11, s * 1.30 + 0.11, DECK, DECK + 0.21);
      }
      for (k = 1; k < 4; k++) slab(B.era, [2.365 + k * 0.30, 0, glacisZ(2.365 + k * 0.30) + 0.07], u, [0, 1, 0], w, 0.135, 0.22, 0.07);
      /* the fluted splash lip along the nose */
      slab(B.era, [3.42, 0, glacisZ(3.42) + 0.06], u, [0, 1, 0], w, 0.07, 1.04, 0.04);
    } else {
      /* T-80BVM (P5): the plain glacis, four louvred blocks across its top under the driver's
         vision blocks, the lamps in U guards on its corners */
      for (i = 0; i < 4; i++) {
        y = (i - 1.5) * 0.42;
        slab(B.paint, [2.12, y, glacisZ(2.12) + 0.05], u, [0, 1, 0], w, 0.14, 0.19, 0.05);
        for (k = 0; k < 3; k++) slab(B.dark, [2.06 + k * 0.06, y, glacisZ(2.06 + k * 0.06) + 0.10], u, [0, 1, 0], w, 0.012, 0.17, 0.008);
      }
      for (s = -1; s <= 1; s += 2) {
        cyl(B.dark, [2.48, s * 0.98, glacisZ(2.48) + 0.13], [2.62, s * 0.98, glacisZ(2.62) + 0.12], 0.10, 0.10, 14);
        cyl(B.paint, [2.40, s * 0.98, glacisZ(2.40) + 0.13], [2.49, s * 0.98, glacisZ(2.49) + 0.13], 0.11, 0.11, 14);
        for (k = -1; k <= 1; k += 2) slab(B.dark, [2.55, s * 0.98 + k * 0.15, glacisZ(2.55) + 0.12], u, [0, 1, 0], w, 0.14, 0.012, 0.012);
        slab(B.dark, [2.70, s * 0.98, glacisZ(2.70) + 0.15], u, [0, 1, 0], w, 0.012, 0.16, 0.012);
        /* the ribbed front fender boxes either side of the glacis (P5) */
        box(B.era, 2.30, 2.95, s > 0 ? 1.12 : -1.70, s > 0 ? 1.70 : -1.12, glacisZ(2.95) + 0.02, glacisZ(2.30) - 0.02);
      }
      /* the flat apron across the nose (P6) */
      var la = Math.atan2(0.32, 0.18), lu = [Math.sin(la), 0, Math.cos(la)], lw = [Math.cos(la), 0, -Math.sin(la)];
      slab(B.paint, [3.47, 0, 0.62], lu, [0, 1, 0], lw, 0.22, 1.25, 0.03);
    }
    /* driver's hatch at the top centre and the periscope in the notch (P2, P5) */
    cylZ(B.paint, 1.76, 0.0, DECK, DECK + 0.07, 0.25, 16);
    cylZ(B.dark, 1.76, 0.0, DECK + 0.07, DECK + 0.09, 0.19, 12);
    slab(B.dark, [2.02, 0, glacisZ(2.02) + 0.06], u, [0, 1, 0], w, 0.05, 0.13, 0.05);
    /* lower glacis tow hooks */
    for (s = -1; s <= 1; s += 2) box(B.dark, 3.40, 3.54, s * 0.62 - 0.06, s * 0.62 + 0.06, 0.70, 0.84);

    /* ---- deck: turret ring collar, fender boxes, the gas-turbine engine deck -------------- */
    cylZ(B.paint, TX, 0, DECK - 0.02, DECK + 0.06, 1.12, 32);
    /* stowage boxes on the fenders beside the turret (P3, P4) */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -0.40, 0.60, s > 0 ? 1.34 : -1.66, s > 0 ? 1.66 : -1.34, DECK, DECK + 0.24);
      box(B.dark, 0.08, 0.12, s > 0 ? 1.33 : -1.67, s > 0 ? 1.67 : -1.33, DECK + 0.02, DECK + 0.25);
      box(B.paint, -1.60, -0.55, s > 0 ? 1.36 : -1.66, s > 0 ? 1.66 : -1.36, DECK, DECK + 0.20);
    }
    /* GTD-1250 deck (P9, P10): the long louvred air-intake field over the rear, two access
       plates ahead of it, and the transverse intake box behind the turret */
    box(B.dark, -3.30, -1.55, -0.95, 0.95, DECK - 0.01, DECK + 0.015);
    for (i = 0; i < 13; i++) box(B.paint, -3.27 + i * 0.133, -3.22 + i * 0.133, -0.93, 0.93, DECK + 0.015, DECK + 0.05);
    box(B.paint, -1.50, -1.30, -1.00, 1.00, DECK, DECK + 0.12);
    box(B.paint, -3.42, -3.30, -1.02, 1.02, DECK, DECK + 0.06);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -3.30, -1.55, s > 0 ? 1.00 : -1.32, s > 0 ? 1.32 : -1.00, DECK, DECK + 0.03);
      cylZ(B.dark, -2.20, s * 1.16, DECK + 0.03, DECK + 0.07, 0.09, 10);
    }
    box(B.team, -2.85, -2.05, -0.125, 0.125, DECK + 0.05, DECK + 0.07);
    /* rear plate (P10): the big turbine exhaust grille in its centre under the deck edge */
    box(B.dark, -3.53, -3.49, -0.70, 0.70, 1.02, 1.40);
    for (i = 0; i < 6; i++) box(B.paint, -3.55, -3.50, -0.68, 0.68, 1.04 + i * 0.065, 1.06 + i * 0.065);
    for (s = -1; s <= 1; s += 2) box(B.dark, -3.56, -3.49, s * 0.95 - 0.06, s * 0.95 + 0.06, 0.62, 0.74);
    if (V.log) {
      /* the unditching log chained across the lower rear plate (P10) */
      cylY(B.paint, -3.66, -1.45, 1.45, 0.80, 0.13, 12);
      for (s = -1; s <= 1; s += 2) box(B.dark, -3.66 - 0.14, -3.66 + 0.14, s * 0.80 - 0.03, s * 0.80 + 0.03, 0.66, 0.95);
    }
    if (V.drums) {
      /* two 200 l drums across the top of the rear plate (D1 shows one end-on above the deck) */
      for (i = 0; i < 2; i++) {
        var dy = i ? -0.55 : 0.55, dxr = -3.80, dzr = DECK + 0.10;
        cylY(B.paint, dxr, dy - 0.43, dy + 0.43, dzr, 0.29, 18);
        cylY(B.paint, dxr, dy - 0.44, dy - 0.40, dzr, 0.295, 18);
        cylY(B.paint, dxr, dy + 0.40, dy + 0.44, dzr, 0.295, 18);
        cylY(B.dark, dxr, dy - 0.445, dy + 0.445, dzr, 0.08, 8);
        cylY(B.dark, dxr, dy - 0.15, dy - 0.12, dzr, 0.296, 18);
        cylY(B.dark, dxr, dy + 0.12, dy + 0.15, dzr, 0.296, 18);
        box(B.dark, -3.56, -3.50, dy - 0.32, dy - 0.26, DECK - 0.30, DECK + 0.04);
        box(B.dark, -3.56, -3.50, dy + 0.26, dy + 0.32, DECK - 0.30, DECK + 0.04);
        box(B.dark, -3.80, -3.52, dy - 0.32, dy - 0.26, DECK - 0.22, DECK - 0.16);
        box(B.dark, -3.80, -3.52, dy + 0.26, dy + 0.32, DECK - 0.22, DECK - 0.16);
      }
    }
    if (V.cage) {
      /* T-80BVM 2020s (P7): the slat cage round the stern - a rear plane on struts and returns
         down both sides over the rear fenders, open on top */
      slats(B.paint, -3.86, -1.70, -3.86, 1.70, 0.72, 1.66, 0.115);
      for (s = -1; s <= 1; s += 2) {
        slats(B.paint, -3.86, s * 1.76, -2.70, s * (FW + 0.14), DECK - 0.05, 1.66, 0.115);
        box(B.dark, -3.86, -3.50, s * 1.20 - 0.025, s * 1.20 + 0.025, 1.10, 1.16);
        box(B.dark, -3.86, -3.50, s * 0.40 - 0.025, s * 0.40 + 0.025, 1.10, 1.16);
        cyl(B.dark, [-3.50, s * 1.30, DECK], [-3.86, s * 1.30, 1.64], 0.022, 0.022, 6);
      }
    }
  }

  /* ------------------------------------------------------------ running gear */
  function hull2(P) {                                   /* convex hull of 2D points, CCW */
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  function addRunning(B) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts;
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.04]);
    C.push([IDL.x, IDL.z, IDL.r + 0.04], [SPR.x, SPR.z, SPR.r + 0.04]);
    for (i = 0; i < XR.length; i++) C.push([XR[i], ZR, RR + 0.04]);
    pts = [];
    for (i = 0; i < C.length; i++) for (k = 0; k < 24; k++) pts.push([C[i][0] + Math.cos(k / 24 * TAU) * C[i][2], C[i][1] + Math.sin(k / 24 * TAU) * C[i][2]]);
    pts = hull2(pts);
    n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    n = segs.length;
    cnt = Math.round(tot / 0.30); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.07);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        /* the link plate with its grouser, and the centre guide horn on the inside of the run */
        belt(B.dark, px - dx * 0.075, pz - dz * 0.075, px + dx * 0.075, pz + dz * 0.075, y - TW - 0.01, y + TW + 0.01, 0.085);
        belt(B.dark, px - dx * 0.03 + dz * 0.07, pz - dz * 0.03 - dx * 0.07, px + dx * 0.03 + dz * 0.07, pz + dz * 0.03 - dx * 0.07, y - 0.025, y + 0.025, 0.06);
      }
      /* sprocket (rear) with its teeth ring, idler (front), five return rollers (D1) */
      cylY(B.dark, SPR.x, y - 0.22, y + 0.22, SPR.z, SPR.r, 18);
      cylY(B.paint, SPR.x, y + s * 0.20, y + s * 0.27, SPR.z, 0.20, 12);
      cylY(B.dark, SPR.x, y + s * 0.27, y + s * 0.31, SPR.z, 0.08, 8);
      cylY(B.paint, IDL.x, y - 0.22, y + 0.22, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.21, y + s * 0.28, IDL.z, 0.12, 10);
      box(B.dark, IDL.x - 0.30, IDL.x, y + s * 0.30 - 0.03, y + s * 0.30 + 0.03, IDL.z - 0.04, IDL.z + 0.04);
      for (i = 0; i < XR.length; i++) {
        cylY(B.dark, XR[i], y - 0.18, y + 0.18, ZR, RR, 10);
        cylY(B.paint, XR[i], y + s * 0.17, y + s * 0.22, ZR, 0.05, 8);
      }
    }
  }


  /* road wheel (P7, P9): the rubber tyre band, the dished pressed disc with six lightening
     recesses round the hub, and the hub cap.  A twin wheel: both halves are drawn. */
  var TYRE = [0.10, 0.10, 0.095], HOLE = [0.16, 0.17, 0.14];
  function addWheel(W, V) {
    var s, y, i, a, c = V.paint.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.14, gg * 1.14, bb * 1.14];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.25, y - 0.13, 0, RW, 16);
      cylY(W, 0, y + 0.13, y + 0.25, 0, RW, 16);
      W.col = BODY;
      cylY(W, 0, y - 0.13, y + 0.13, 0, 0.27, 14);
      cyl(W, [0, y + s * 0.25, 0], [0, y + s * 0.28, 0], 0.27, 0.14, 14);
      cylY(W, 0, y + s * 0.27, y + s * 0.30, 0, 0.10, 10);
      W.col = HOLE;
      for (i = 0; i < 6; i++) {
        a = (i + 0.5) / 6 * TAU;
        slab(W, [Math.cos(a) * 0.19, y + s * 0.262, Math.sin(a) * 0.19], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.035, 0.012, 0.045);
      }
      W.col = TYRE;
      cylY(W, 0, y + s * 0.295, y + s * 0.315, 0, 0.045, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* the cast turret: rings of a profile table (radius factor, height; PROF unless D.prof), plan
     radii AF forward, AR aft, AY across; the front bulges outward ("bul") and droops ("drop").
     The T-80U casting is flatter and fuller in the shoulder than the T-80B's (P3, P4): PROF_U. */
  var PROF_T = [[1.00, 0.00], [1.02, 0.12], [1.00, 0.30], [0.93, 0.46], [0.80, 0.59],
              [0.58, 0.68], [0.32, 0.73], [0.0, 0.75]];
  var PROF_U = [[1.00, 0.00], [1.02, 0.14], [1.00, 0.36], [0.95, 0.52], [0.87, 0.63],
                [0.70, 0.71], [0.40, 0.745], [0.0, 0.75]];
  function addDome(B, D, H) {
    var PROF = D.prof || PROF_T;
    var NS = 40, AF = D.AF, AR = D.AR, AY = D.AY, p = 2 / 2.4, hk = H / 0.75;
    var G = [], rI, j, c, s, sx, sy, pr, V = [], Nacc = [], tris = [], cf, ctr = [0, 0, 0.05];
    for (rI = 0; rI < PROF.length; rI++) {
      pr = PROF[rI]; G.push([]);
      for (j = 0; j < NS; j++) {
        c = Math.cos(j / NS * TAU); s = Math.sin(j / NS * TAU);
        cf = Math.max(c, 0);
        sx = (c >= 0 ? AF : AR) * pr[0] * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), p);
        sy = AY * pr[0] * (1 + D.bul * cf * cf) * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), p);
        G[rI].push(V.length); V.push([sx, sy, pr[1] * hk * (1 - (pr[0] > 0 ? D.drop * cf : 0))]);   /* the apex is one point */ Nacc.push([0, 0, 0]);
      }
    }
    function face(a, b, d) {
      var n = cross(sub(V[b], V[a]), sub(V[d], V[a])), m = [(V[a][0] + V[b][0] + V[d][0]) / 3 - ctr[0], (V[a][1] + V[b][1] + V[d][1]) / 3, (V[a][2] + V[b][2] + V[d][2]) / 3 - ctr[2]];
      if (dot(n, m) < 0) { var t = b; b = d; d = t; n = [-n[0], -n[1], -n[2]]; }
      n = unit(n);
      [a, b, d].forEach(function (i) { Nacc[i][0] += n[0]; Nacc[i][1] += n[1]; Nacc[i][2] += n[2]; });
      tris.push([a, b, d]);
    }
    for (rI = 0; rI + 1 < PROF.length; rI++)
      for (j = 0; j < NS; j++) {
        var j1 = (j + 1) % NS;
        face(G[rI][j], G[rI][j1], G[rI + 1][j1]); face(G[rI][j], G[rI + 1][j1], G[rI + 1][j]);
      }
    var NN = Nacc.map(unit);
    tris.forEach(function (t) {
      var A = V[t[0]], Bv = V[t[1]], Cv = V[t[2]];
      if (cross(sub(Bv, A), sub(Cv, A)).every(function (q) { return Math.abs(q) < 1e-9; })) return;
      B.paint.tri(A, Bv, Cv, NN[t[0]], NN[t[1]], NN[t[2]]);
    });
  }

  /* the 125 mm 2A46M gun and mantlet; GZ is the axis height above the ring */
  var MUZ = 6.30;                                       /* muzzle, turret frame: 9.654 m gun forward of the rear plate */
  function addGun(B, GZ, x0, cover) {
    var M = MUZ;
    cylX(B.paint, x0 - 0.40, x0 + 0.04, 0, GZ, 0.30, 0.27, 18);
    if (cover) cylX(B.dark, x0 + 0.02, x0 + 0.20, 0, GZ, 0.20, 0.15, 14);
    /* thermal sleeve with its two clamp bands, the bore evacuator, the plain muzzle tube */
    cylX(B.paint, x0, M - 1.64, 0, GZ, 0.105, 0.098, 16);
    if (M - 3.44 > x0 + 0.2) cylX(B.dark, M - 3.44, M - 3.38, 0, GZ, 0.112, 0.112, 14);
    cylX(B.dark, M - 2.59, M - 2.53, 0, GZ, 0.108, 0.108, 14);
    cylX(B.paint, M - 1.64, M - 1.50, 0, GZ, 0.098, 0.125, 16);
    cylX(B.paint, M - 1.50, M - 1.20, 0, GZ, 0.125, 0.125, 16);
    cylX(B.dark, M - 1.42, M - 1.39, 0, GZ, 0.130, 0.130, 14);
    cylX(B.dark, M - 1.32, M - 1.29, 0, GZ, 0.130, 0.130, 14);
    cylX(B.paint, M - 1.20, M - 1.06, 0, GZ, 0.125, 0.082, 16);
    cylX(B.paint, M - 1.06, M, 0, GZ, 0.082, 0.075, 14);
    cylX(B.dark, M - 0.09, M, 0, GZ, 0.078, 0.078, 14);
    /* coaxial machine gun port, right of the gun */
    cylX(B.dark, x0 - 0.20, x0 + 0.12, -0.24, GZ - 0.08, 0.022, 0.022, 8);
  }
  function cupolaAA(B, CX, CY, RZ, aa) {
    var i, a;
    cylZ(B.paint, CX, CY, RZ - 0.06, RZ + 0.05, 0.31, 20);
    for (i = 0; i < 6; i++) {
      a = i * TAU / 6 + 0.5;
      box(B.dark, CX + Math.cos(a) * 0.30 - 0.035, CX + Math.cos(a) * 0.30 + 0.035,
          CY + Math.sin(a) * 0.30 - 0.035, CY + Math.sin(a) * 0.30 + 0.035, RZ + 0.0, RZ + 0.08);
    }
    cylZ(B.paint, CX, CY, RZ + 0.05, RZ + 0.11, 0.25, 16);
    box(B.dark, CX + 0.12, CX + 0.36, CY - 0.10, CY + 0.10, RZ + 0.05, RZ + 0.20);
    if (aa) {
      /* the 12.7 mm on its pintle mount (P2, P5; en.wikipedia: pintle on the T-80U) */
      cylZ(B.dark, CX - 0.05, CY, RZ + 0.11, RZ + 0.26, 0.04, 8);
      box(B.dark, CX - 0.25, CX + 0.25, CY - 0.06, CY + 0.06, RZ + 0.24, RZ + 0.34);
      box(B.dark, CX - 0.22, CX + 0.08, CY + 0.06, CY + 0.18, RZ + 0.22, RZ + 0.36);
      cylX(B.dark, CX + 0.25, CX + 1.20, CY, RZ + 0.30, 0.022, 0.020, 8);
      cylX(B.dark, CX + 0.55, CX + 0.80, CY, RZ + 0.30, 0.034, 0.034, 8);
    }
  }

  /* 902B smoke-grenade bank: a bracket and four tubes (P2: a bank of four each side of the T-80U
     turret front, canted up and out) */
  function smokeBank(B, x, y, z, s) {
    var i;
    box(B.paint, x - 0.10, x + 0.10, y - 0.30, y + 0.30, z - 0.05, z + 0.02);
    for (i = 0; i < 4; i++) cyl(B.dark, [x - 0.06, y - 0.22 + i * 0.145, z], [x + 0.10, y - 0.22 + i * 0.145 + s * 0.04, z + 0.30], 0.045, 0.045, 8);
  }

  /* T-80U turret (P1 to P4): the big cast turret, wide and low, the Kontakt-5 horseshoe over
     the front arc - a deep wedge each side of the gun with its top sloping back, a flat course
     across the front of the roof - the smoke banks on the front corners, the 1G46 sight head on
     the left, the commander's cupola with the 12.7 mm on the right, the OPVT snorkel tube
     stowed across the rear (P4, P10) */
  function turretU(V, B) {
    var RZ = 0.74, GZ = 0.38, s;
    addDome(B, { AF: 1.30, AR: 1.62, AY: 1.16, drop: 0.06, bul: 0.10, prof: PROF_U }, RZ);
    for (s = -1; s <= 1; s += 2) {
      loftN(B.era, [
        mirrorY([[1.66, 0.36, 0.06], [1.50, 1.04, 0.06], [1.00, 1.38, 0.06], [0.80, 1.14, 0.06], [1.12, 0.36, 0.06]], s),
        mirrorY([[1.66, 0.36, 0.34], [1.50, 1.04, 0.34], [1.00, 1.38, 0.36], [0.80, 1.14, 0.40], [1.12, 0.36, 0.40]], s),
        mirrorY([[1.42, 0.36, 0.60], [1.28, 0.94, 0.60], [0.90, 1.24, 0.58], [0.70, 1.04, 0.64], [0.98, 0.36, 0.68]], s)]);
      /* the flat roof course behind the wedge */
      loftN(B.era, [
        mirrorY([[0.98, 0.34, 0.64], [0.86, 0.98, 0.62], [0.42, 1.04, 0.70], [0.42, 0.34, 0.72]], s),
        mirrorY([[0.92, 0.34, 0.75], [0.82, 0.94, 0.73], [0.42, 1.00, 0.79], [0.42, 0.34, 0.80]], s)]);
      /* the cheek course swept back down the flank */
      loftN(B.era, [
        mirrorY([[0.86, 1.14, 0.08], [0.86, 1.30, 0.08], [0.10, 1.32, 0.08], [0.10, 1.14, 0.08]], s),
        mirrorY([[0.82, 1.12, 0.50], [0.82, 1.24, 0.50], [0.10, 1.26, 0.50], [0.10, 1.12, 0.50]], s)]);
      smokeBank(B, 0.70, s * 1.22, RZ - 0.02, s);
      /* stowage boxes down the bustle flanks */
      box(B.paint, -1.45, -0.30, s > 0 ? 1.00 : -1.24, s > 0 ? 1.24 : -1.00, 0.30, 0.64);
      box(B.dark, -0.90, -0.86, s > 0 ? 0.99 : -1.25, s > 0 ? 1.25 : -0.99, 0.32, 0.65);
    }
    addGun(B, GZ, 1.50, true);
    /* 1G46 gunner's sight head, left of the gun, with its armoured lid (P2) */
    box(B.paint, 0.36, 0.78, 0.30, 0.62, RZ - 0.02, RZ + 0.26);
    box(B.dark, 0.78, 0.81, 0.36, 0.56, RZ + 0.05, RZ + 0.21);
    box(B.paint, 0.30, 0.82, 0.28, 0.64, RZ + 0.26, RZ + 0.30);
    /* gunner's hatch */
    cylZ(B.paint, -0.20, 0.58, RZ - 0.02, RZ + 0.06, 0.26, 16);
    box(B.dark, -0.25, -0.10, 0.46, 0.70, RZ + 0.06, RZ + 0.09);
    /* commander's cupola, right, with the NSVT 12.7 mm on its mount (P2, P4) */
    cupolaAA(B, -0.25, -0.58, RZ, true);
    box(B.paint, 0.05, 0.40, -0.92, -0.70, RZ - 0.02, RZ + 0.18);
    box(B.dark, 0.40, 0.43, -0.88, -0.74, RZ + 0.04, RZ + 0.14);
    /* wind-sensor mast and the whip on the rear roof (P2, P3) */
    cylZ(B.dark, -1.05, 0.10, RZ - 0.06, RZ + 0.30, 0.025, 6);
    cylZ(B.dark, -1.05, 0.10, RZ + 0.30, RZ + 0.36, 0.05, 8);
    cylZ(B.dark, -1.15, 0.78, RZ - 0.10, RZ + 0.04, 0.05, 8);
    cyl(B.dark, [-1.15, 0.78, RZ + 0.04], [-1.15, 0.78, RZ + 1.60], 0.016, 0.008, 5);
    /* bustle: rear stowage rack and the OPVT snorkel tube across it (P4, P10) */
    box(B.paint, -1.88, -1.50, -0.80, 0.80, 0.10, 0.46);
    cylY(B.paint, -1.98, -1.05, 1.05, 0.56, 0.15, 16);
    cylY(B.dark, -1.98, -1.09, -1.05, 0.56, 0.155, 16);
    cylY(B.dark, -1.98, 1.05, 1.09, 0.56, 0.155, 16);
    for (s = -1; s <= 1; s += 2) box(B.dark, -2.00, -1.62, s * 0.60 - 0.03, s * 0.60 + 0.03, 0.40, 0.60);
    box(B.team, -0.95, -0.15, -0.125, 0.125, RZ + 0.0, RZ + 0.02);
  }

  /* T-80BVM turret (P5 to P7): the T-80B's smaller cast turret under Relikt - a fan of three
     tilted slabs each side of the gun, tile arrays over the front roof, a row of four box
     modules down each flank, the tall sight box on the right front of the roof with the
     commander's 12.7 mm behind it, the square sight head and lamp on the left, and the slat
     cage round the bustle */
  function turretBVM(V, B) {
    var RZ = 0.72, GZ = 0.38, s, i, k, x0, x1, y0, y1;
    addDome(B, { AF: 1.22, AR: 1.52, AY: 1.10, drop: 0.04, bul: 0.08 }, RZ);
    var FAN = [[1.64, 0.36], [1.52, 0.80], [1.30, 1.18], [0.98, 1.46]];
    for (s = -1; s <= 1; s += 2) {
      /* the box course the slabs hang on */
      loftN(B.era, [
        mirrorY([[1.40, 0.34, 0.06], [1.10, 1.26, 0.06], [0.70, 1.26, 0.06], [0.90, 0.34, 0.06]], s),
        mirrorY([[1.34, 0.34, 0.58], [1.04, 1.22, 0.58], [0.70, 1.22, 0.64], [0.90, 0.34, 0.66]], s)]);
      for (k = 0; k < 3; k++) {
        x0 = FAN[k][0]; y0 = FAN[k][1]; x1 = FAN[k + 1][0]; y1 = FAN[k + 1][1];
        /* each slab a flat plate laid back about 33 deg off the horizontal, standing proud of the box course (P5, P6) */
        var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy), uu = [dx / L, s * dy / L, 0];
        var nn = [dy / L, -s * dx / L, 0], tl = 1.00, ww = [nn[0] * Math.cos(tl), nn[1] * Math.cos(tl), Math.sin(tl)];
        var vv = [ww[1] * uu[2] - ww[2] * uu[1], ww[2] * uu[0] - ww[0] * uu[2], ww[0] * uu[1] - ww[1] * uu[0]];
        var cx = (x0 + x1) / 2 - 0.02, cy = s * (y0 + y1) / 2 + nn[1] * 0.06;
        slab(B.era, [cx, cy, 0.42], uu, vv, ww, L / 2 - 0.05, 0.32, 0.05);
        /* the dark gap under each slab's lower edge, which is what makes the fan read (P5) */
        slab(B.dark, [cx - nn[0] * 0.16, cy - nn[1] * 0.16, 0.13], uu, [nn[0], nn[1], 0], [0, 0, 1], L / 2 - 0.06, 0.12, 0.05);
        box(B.dark, cx - 0.34, cx - 0.18, cy - 0.03, cy + 0.03, 0.10, 0.30);
      }
      /* roof tile array over the front of the roof (P6) */
      loftN(B.era, [
        mirrorY([[1.06, 0.34, 0.66], [0.90, 1.04, 0.62], [0.40, 1.06, 0.70], [0.40, 0.34, 0.72]], s),
        mirrorY([[1.02, 0.34, 0.75], [0.88, 1.00, 0.71], [0.40, 1.02, 0.78], [0.40, 0.34, 0.80]], s)]);
      /* four box modules down the flank (P7) */
      for (i = 0; i < 4; i++) {
        x1 = 0.78 - i * 0.40; x0 = x1 - 0.38;
        box(B.era, x0, x1, s > 0 ? 1.06 : -1.30, s > 0 ? 1.30 : -1.06, 0.04, 0.66);
      }
      /* the slat cage round the bustle, open on top (P7) */
      slats(B.paint, -0.62, s * 1.32, -1.75, s * 1.30, 0.02, 0.86, 0.12);
      box(B.dark, -0.70, -0.60, s > 0 ? 1.10 : -1.34, s > 0 ? 1.34 : -1.10, 0.40, 0.46);
      box(B.paint, -1.40, -0.75, s > 0 ? 0.92 : -1.20, s > 0 ? 1.20 : -0.92, 0.10, 0.42);
    }
    slats(B.paint, -1.75, -1.30, -1.75, 1.30, 0.02, 0.86, 0.12);
    box(B.paint, -1.70, -1.40, -0.85, 0.85, 0.08, 0.48);
    addGun(B, GZ, 1.42, true);
    /* tall sight box on the right front of the roof, sloped lid, window forward (P5, P7) */
    box(B.paint, 0.30, 0.78, -0.84, -0.44, RZ, RZ + 0.36);
    loftN(B.paint, [
      [[0.78, -0.44, RZ + 0.36], [0.78, -0.84, RZ + 0.36], [0.30, -0.84, RZ + 0.36], [0.30, -0.44, RZ + 0.36]],
      [[0.60, -0.46, RZ + 0.46], [0.60, -0.82, RZ + 0.46], [0.32, -0.82, RZ + 0.46], [0.32, -0.46, RZ + 0.46]]]);
    box(B.dark, 0.78, 0.81, -0.78, -0.50, RZ + 0.10, RZ + 0.30);
    /* commander's cupola behind it, the round sight head, the 12.7 mm (P5, P7) */
    cupolaAA(B, -0.30, -0.58, RZ, true);
    cylZ(B.paint, 0.08, -0.30, RZ, RZ + 0.10, 0.10, 12);
    cylZ(B.dark, 0.08, -0.30, RZ + 0.10, RZ + 0.24, 0.13, 14);
    /* square sight head and the lamp on the left (P5) */
    box(B.paint, 0.40, 0.76, 0.40, 0.72, RZ, RZ + 0.30);
    box(B.dark, 0.76, 0.79, 0.46, 0.66, RZ + 0.06, RZ + 0.24);
    cylZ(B.dark, 0.55, 0.94, RZ - 0.02, RZ + 0.18, 0.025, 6);
    cyl(B.dark, [0.48, 0.94, RZ + 0.26], [0.66, 0.94, RZ + 0.26], 0.10, 0.10, 14);
    /* gunner's hatch, sensor mast with its head, whip (P7) */
    cylZ(B.paint, -0.25, 0.55, RZ - 0.02, RZ + 0.06, 0.25, 16);
    box(B.dark, -0.30, -0.15, 0.44, 0.66, RZ + 0.06, RZ + 0.09);
    cylZ(B.dark, -0.70, -0.20, RZ, RZ + 0.62, 0.035, 8);
    box(B.dark, -0.78, -0.58, -0.30, -0.10, RZ + 0.56, RZ + 0.70);
    cylZ(B.dark, -1.10, 0.75, RZ - 0.06, RZ + 0.06, 0.05, 8);
    cyl(B.dark, [-1.10, 0.75, RZ + 0.06], [-1.10, 0.75, RZ + 1.60], 0.016, 0.008, 5);
    box(B.team, -1.15, -0.35, -0.125, 0.125, RZ + 0.0, RZ + 0.02);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.t80u, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), i, wg, WB, tg, TB = bins(T);
    g.name = which;
    addHull(HB, V);
    addRunning(HB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB, V);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    if (V.tur === "bvm") turretBVM(V, TB); else turretU(V, TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, RING);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

/* len: the measured X extent of each build (models3d convention): muzzle to the drums on the
   T-80U, muzzle to the stern cage on the T-80BVM; published 9.654 m gun forward of the hull */
UNIT_MODELS["pact_e80_mbt"] = {
  len: 10.25,
  build: function (THREE, M, C) { return HeroT80U.build(THREE, M, C, "t80u"); }
};
UNIT_MODELS["pact_e20_t80bvm"] = {
  len: 10.03,
  build: function (THREE, M, C) { return HeroT80U.build(THREE, M, C, "t80bvm"); }
};
