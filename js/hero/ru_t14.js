/* ========== ru_t14.js - HERO model: the T-14 Armata (hvy_p) ===============
   hvy_p   T-14 Armata MBT (Object 148), as shown from the 2015 Victory Day parade on:
           the parade / trials vehicle with the full side skirts (one key, one variant).

   REDO 2026-10-24 (full-quality procedure). References, Wikimedia Commons, width 960,
   cached in scratchpad/q_t14_ref (all CC BY-SA or CC0):
     S1  "Alabino110416-23.jpg" (Vitaly V. Kuzmin, 2016) - port side, nearly square on, a
         vehicle WITHOUT the side skirts: hull profile, glacis, the seven road wheels and their
         uneven pitch, the raised idler and sprocket, return rollers, turret and bustle profile,
         the tall sight box, gun height. Scale from the 8.7 m hull (102 px/m).
     S2  "Alabino110416-24.jpg" - turret close-up from the port side: faceted body, waist
         ridge, the row of Afganit launch tubes under the turret, camera window, bustle box.
     S3  "Alabino110416-21.jpg" - port rear 3/4, WITH skirts: nine Malachit side modules
         forward, the slat (bar) grille over the rear third of the side, the engine-deck grilles.
     P1  "Main battle tank T-14 - 0-01.jpg" - port front 3/4 with skirts (module count, the front
         corner modules, gun length).
     P2  "9may2015Moscow-03.jpg" - from the front, starboard side showing: the front corner
         modules with headlamps, the lighter glacis plate between them, hatches, the tall sight
         box right of the centreline, the meteo mast, the rear slat grille standing proud.
     P3  "T-14 prototype from above.JPG" (2015 parade) - the turret plan (sharp front wedge,
         straight flanks, bustle), roof fittings, glacis plate, rear grilles and slats.
     P4  "Tower4-T14.png" (Kuzmin photo, labels by EPC2016) - names the turret fittings:
         panoramic sight, soft-kill grenade box under it, UV/IR cameras, radar panels, the
         Afganit "mortars" at the turret base, gunner's sight, meteo mast, barrel-bend sensor.
     P5  "Alabino220415part2-09.jpg" - the rear running gear close up (sprocket, wheels, slats).
     P6  "T-14 MBT Army-2022 2022-08-20 2399.jpg" - from the rear (rear plate, tow cables,
         access plates, the slat grille on the rear quarter).
     P7  "Army-2020-049.JPG" - the panoramic sight box and its cylindrical base close up.
   Published figures (kept from the old header; ru/en Wikipedia agree): hull length 8.7 m,
   length gun forward 10.8 m, width 3.5 m, height 3.3 m, seven road wheels, about 48 t.

   CORRECTIONS against the previous model (the references do not support it):
   - road wheels were evenly pitched at 0.95 m from x -2.85 to +2.85; S1 shows the pitch
     opening toward the front: 0.82 m at the rear, 0.90 and 0.96 m at the front
     (centres +2.79 ... -2.34);
   - idler and sprocket were at road-wheel height; S1 and P5 show both RAISED (centres about
     0.9 m), the track climbing steeply to them; four return rollers now carry the top run;
   - the turret ring was 0.75 m aft of centre; S1 puts the turret body astride the hull centre
     (ring 0.30 m aft), the gun trunnions over the crew hatches;
   - hull deck 1.88 m -> 1.73 m (S1, the side-wall top), turret roof 2.65 m, sight box top 3.3 m;
   - side skirts: six plain low plates -> nine Malachit side modules from the deck edge to the
     wheel tops, then a bar grille of horizontal bars over the rear third (S3, P1, P2, P5);
   - the front corner modules are tall blocks from skirt to above the deck line with lamp
     guards on top and headlamps in their faces (P1, P2), with the lighter glacis plate between;
   - the roof launcher boxes are the soft-kill grenade boxes under/beside the sight (P3, P4).

   Recognition list (what makes it read at game zoom, and its source):
     1. long, low, flat-sided hull; full-length side skirts, deck edge level all the way - S1, S3
     2. seven big road wheels, pitch opening toward the front, raised idler and sprocket - S1, P5
     3. small, faceted, UNMANNED turret: sharp front wedge, waist ridge, inward-sloped facets - P3, S2
     4. high box bustle overhanging the engine deck - S1, S2
     5. tall boxy panoramic sight / remote-weapon box at the turret rear right - S1, P2, P7
     6. Afganit hard-kill tubes in a row round the turret base, soft-kill grenade boxes on the
        roof rear corners - S2, P4, P3
     7. long 125 mm 2A82-1M with a thick breech end and a plain tapering barrel - S1, P1
     8. nine Malachit modules along the front of each side - S3, P1
     9. bar grille (horizontal bars on posts) over the rear third of each side, standing off
        the hull and rising above the deck edge - P5, P2, P3, S3
    10. two tall front corner modules with lamps and the lighter glacis plate between - P1, P2, P3
    11. three crew hatches abreast in the hull ahead of the turret (the crew capsule) - P2, P3
    12. engine-deck grilles across the rear deck - S1, S3, P3
   Paint: dark grey-green. Sampled: shaded side #444a41 to #555853, lit turret #7a8381 (S1, S2,
   P1); taken to about 0.8 of level for the ACES pass -> base #4f564c. No numbers, flags,
   St George ribbons or stars are drawn (every parade vehicle carries them).
   NOT CONFIRMED, drawn as judgement calls: the exact number (five a side) and angle of the
   Afganit tubes; the meteo mast on the left; the radar panels as plain raised plates; the
   return-roller stations (behind the skirts); the hatch count; the bar count of the grille.
   The 12.7 mm Kord is not drawn (not fitted on the parade cars of P1 to P3), only its cradle.
   Not drawn: antennas and whips, flags, the Army-2022 stowage basket (not on the 2015-16 cars).

   Materials: PAINT (canvas texture: base, mottling, plate seams, bolt rows), DARK (track, grille
   brackets, sights, louvres, tubes), PLATE (the lighter grey glacis plate, P2 #5b5c5a / P3 #8a9495
   against the hull's #40403f / #454d49 -> #646b69), ERA (canvas texture of the Malachit
   cassette faces, metre UVs), WHEEL (vertex colours) and the team colour exactly as handed in
   (C.team): three strips (two on the deck beside the turret, one on the turret roof), 0.22-0.24 m
   wide, 0.8 m long, 2 cm above the surface.
   Nodes: "turret" (trains, origin on the ring centre, gun along +X), seven "roadwheel" groups.
   Draw calls: hull 5 + turret 3 + 7 wheels = 15 (the turret has no plate or ERA parts).
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */


if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroT14 = (function () {
  "use strict";
  var TAU = Math.PI * 2;
  var PAINT = { base: "#4f564c", blots: ["#474e44", "#585f54"], seed: 14 };
  var ERA_BASE = "#4c5349";

  /* running gear (S1, P5): seven 0.74 m wheels, pitch opening to the front; idler and sprocket raised */
  var TY = 1.40, TW = 0.29;
  var XW = [2.79, 1.85, 0.94, 0.12, -0.70, -1.52, -2.34], ZW = 0.45, RW = 0.37;
  var XR = [2.30, 0.55, -1.10, -2.70], ZR = 1.08, RR = 0.085;
  var IDL = { x: 3.62, z: 0.88, r: 0.29 }, SPR = { x: -3.25, z: 0.88, r: 0.34 };
  var DECK = 1.73, WS = 1.62, ZSP = 1.22, SK = 1.74;   /* deck, sponson wall, sponson underside, skirt face */
  var TX = -0.30, RING = 1.80;

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
    if (y0 > y1) { var t = y0; y0 = y1; y1 = t; }
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
  /* half plan [x, y] (y >= 0, front to rear) to a full closed ring at height z */
  function ringAt(H, z) {
    var Q = [], i;
    for (i = 0; i < H.length; i++) Q.push([H[i][0], H[i][1], z]);
    for (i = H.length - 1; i >= 0; i--) Q.push([H[i][0], -H[i][1], z]);
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
  /* hull and turret paint: one tile is 1 / 0.34 = 2.9 m. Base, soft mottling, plate seams with
     bolt rows (the turret facets and deck plates of S2, P3), rain streaks and road grime */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "t14p" + P.base + P.seed, 512, function (q, S) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 14; i++) { q.globalAlpha = 0.30 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 8; i++) {                 /* plate seams with their bolt rows */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 240;
        q.fillStyle = "rgba(18,20,16,0.32)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
        q.fillStyle = "rgba(235,238,225,0.10)";
        if (i % 2) q.fillRect(x, y + 2, w, 1); else q.fillRect(x + 2, y, 1, w);
        q.fillStyle = "rgba(16,17,13,0.45)";
        for (k = 6; k < w; k += 12) { if (i % 2) q.fillRect(x + k, y - 5, 3, 3); else q.fillRect(x - 5, y + k, 3, 3); }
      }
      for (i = 0; i < 90; i++) {                /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(232,232,215,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 24; i++) { q.fillStyle = "rgba(25,24,18,0.06)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
    });
  }
  /* Malachit cassette faces: one tile is 1 m (us 1.0); two columns of tall cassettes, each with an
     edge shadow, a light top lip and a bolt at each corner (S3, P1) */
  function eraTex(THREE, base) {
    return canvasTex(THREE, "t14e" + base, 128, function (q, S) {
      var i, j, cw = S / 2, ch = S / 4;
      q.fillStyle = base; q.fillRect(0, 0, S, S);
      for (i = 0; i < 2; i++) for (j = 0; j < 4; j++) {
        q.fillStyle = "rgba(12,13,10,0.50)"; q.fillRect(i * cw, j * ch, cw, 2); q.fillRect(i * cw, j * ch, 2, ch);
        q.fillStyle = "rgba(230,232,215,0.12)"; q.fillRect(i * cw + 3, j * ch + 3, cw - 6, 1);
        q.fillStyle = "rgba(15,15,11,0.55)";
        q.fillRect(i * cw + 5, j * ch + 5, 3, 3); q.fillRect(i * cw + cw - 8, j * ch + 5, 3, 3);
        q.fillRect(i * cw + 5, j * ch + ch - 8, 3, 3); q.fillRect(i * cw + cw - 8, j * ch + ch - 8, 3, 3);
      }
    });
  }
  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE, PAINT), te = eraTex(THREE, ERA_BASE);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.plate = new THREE.MeshStandardMaterial({ color: 0x646b69, roughness: 0.82, metalness: 0.1 });
    T.era = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.08 });
    if (te) T.era.map = te; else T.era.color.set(ERA_BASE);
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), plate: new Bin(T.plate, false),
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

  /* ---------------------------------------------------------------- hull */
  /* station table, measured off S1 (102 px/m from the 8.7 m hull; heights from the track line):
     x, lower-hull half width, belly z, deck z.  The upper hull is the full sponson width WS over
     the tracks from ZSP up; a short bevel at the rear plate; flat deck at 1.73 m to x 2.70, then
     the long shallow upper glacis (about 20 deg) to the nose at 1.0 m, the lower glacis under it */
  var HS = [
    [-4.35, 1.00, 0.74, 1.62],
    [-4.32, 1.04, 0.62, 1.70],
    [-4.26, 1.06, 0.54, DECK],
    [-4.10, 1.08, 0.49, DECK],
    [-3.20, 1.08, 0.47, DECK],
    [-1.60, 1.08, 0.47, DECK],
    [ 0.00, 1.08, 0.47, DECK],
    [ 1.60, 1.08, 0.47, DECK],
    [ 2.70, 1.08, 0.47, DECK],
    [ 3.00, 1.08, 0.48, 1.62],
    [ 3.40, 1.08, 0.53, 1.475],
    [ 3.80, 1.06, 0.62, 1.33],
    [ 4.10, 1.04, 0.74, 1.22],
    [ 4.25, 1.02, 0.84, 1.12],
    [ 4.35, 1.00, 0.95, 1.02]
  ];
  function deckZ(x) {
    var i, a, b, t;
    if (x <= HS[0][0]) return HS[0][3];
    for (i = 0; i + 1 < HS.length; i++) {
      a = HS[i]; b = HS[i + 1];
      if (x <= b[0]) { t = (x - a[0]) / (b[0] - a[0]); return a[3] + (b[3] - a[3]) * t; }
    }
    return HS[HS.length - 1][3];
  }
  function hullRing(S) {
    var x = S[0], wb = S[1], zB = S[2], zT = S[3], e = 0.03, zs = Math.min(ZSP, zT - 0.08), zl = Math.min(zs - 0.03, ZSP - 0.02);
    return [[x, wb, zB], [x, wb + 0.02, zl], [x, WS, zs], [x, WS, zT - e], [x, WS - e, zT],
            [x, -(WS - e), zT], [x, -WS, zT - e], [x, -WS, zs], [x, -(wb + 0.02), zl], [x, -wb, zB]];
  }
  function addHull(B) {
    var R = HS.map(hullRing), i, k, k1, a, b, c, d, e, dy, dz, p, s, n = R[0].length, x, y, j, z;
    for (i = 0; i + 1 < R.length; i++)
      for (k = 0; k < n; k++) {
        k1 = (k + 1) % n;
        a = R[i][k]; b = R[i][k1]; c = R[i + 1][k1]; d = R[i + 1][k];
        dy = b[1] - a[1]; dz = b[2] - a[2];
        if (Math.abs(dy) + Math.abs(dz) < 1e-6) continue;
        e = [0, dz, -dy];
        triN(B.paint, a, b, c, e); triN(B.paint, a, c, d, e);
      }
    /* end caps: the lower hull rectangle and the convex upper section */
    function cap(r, hint) {
      var sets = [[0, 1, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8]], q, jj;
      for (q = 0; q < 2; q++)
        for (jj = 1; jj + 1 < sets[q].length; jj++)
          triN(B.paint, r[sets[q][0]], r[sets[q][jj]], r[sets[q][jj + 1]], hint);
    }
    cap(R[0], [-1, 0, 0]); cap(R[R.length - 1], [1, 0, 0]);

    for (p = -1; p <= 1; p += 2) {
      /* --- the front corner module (P1, P2, P3): a tall block from the skirt line to above the
         deck, its top falling to the nose, a near-vertical face carrying the headlamp ---- */
      var yi = p * 0.90, yo = p * SK;
      loftN(B.era, [
        mirrorY([[2.55, 0.90, 0.88], [2.55, SK, 0.88], [2.55, SK, 1.80], [2.55, 0.90, 1.86]], p),
        mirrorY([[3.95, 0.90, 0.88], [3.95, SK, 0.88], [3.95, SK, 1.40], [3.95, 0.90, 1.46]], p),
        mirrorY([[4.28, 0.90, 0.92], [4.28, SK - 0.04, 0.92], [4.28, SK - 0.04, 1.32], [4.28, 0.90, 1.36]], p),
        mirrorY([[4.34, 0.92, 0.98], [4.34, SK - 0.10, 0.98], [4.34, SK - 0.10, 1.26], [4.34, 0.92, 1.30]], p)]);
      /* headlamp in the module face, the lamp guard frames on top (P2, S1) */
      box(B.dark, 4.33, 4.37, p * 1.20, p * 1.48, 1.10, 1.22);
      box(B.paint, 4.36, 4.40, p * 1.24, p * 1.44, 1.12, 1.20);
      for (j = 0; j < 2; j++) {
        x = 3.62 + j * 0.42; y = p * (j ? 1.18 : 1.50);
        var zt = 1.86 + (1.40 - 1.86) * (x - 2.55) / 1.40;
        box(B.dark, x - 0.10, x + 0.10, y - 0.11, y - 0.09, zt, zt + 0.16);
        box(B.dark, x - 0.10, x + 0.10, y + 0.09, y + 0.11, zt, zt + 0.16);
        box(B.dark, x - 0.10, x - 0.08, y - 0.11, y + 0.11, zt, zt + 0.16);
        box(B.dark, x - 0.10, x + 0.10, y - 0.11, y + 0.11, zt + 0.15, zt + 0.17);
        box(B.dark, x - 0.06, x + 0.04, y - 0.06, y + 0.06, zt, zt + 0.09);
      }

      /* --- side skirts: nine Malachit modules forward (S3, P1), deck edge to wheel tops -------- */
      var ZS0 = 0.86, ZS1 = DECK + 0.02, xa, xb;
      for (i = 0; i < 9; i++) {
        xa = 2.55 - i * 0.43; xb = xa - 0.415;
        loftN(B.era, [
          mirrorY([[xa, WS, ZS0 + (i === 0 ? 0.10 : 0)], [xa, SK, ZS0 + 0.04 + (i === 0 ? 0.10 : 0)], [xa, SK, ZS1 - 0.08], [xa, SK - 0.06, ZS1], [xa, WS, ZS1]], p),
          mirrorY([[xb, WS, ZS0], [xb, SK, ZS0 + 0.04], [xb, SK, ZS1 - 0.08], [xb, SK - 0.06, ZS1], [xb, WS, ZS1]], p)]);
        box(B.dark, xb - 0.008, xb + 0.008, p * WS, p * (SK + 0.005), ZS0 + 0.06, ZS1 - 0.02);
      }
      /* the skirt's top rail and its seal along the bottom */
      box(B.paint, -1.32, 2.55, p * (WS - 0.02), p * (SK + 0.015), ZS1 - 0.01, ZS1 + 0.02);
      box(B.dark, -1.30, 2.40, p * (SK - 0.04), p * (SK + 0.005), ZS0 - 0.04, ZS0 + 0.02);
      /* --- bar grille over the rear third of the side (P5, P2, P3): eight horizontal bars on
         posts, standing 0.14 m off the side wall, from the wheel tops to 0.3 m above the deck --- */
      var g0 = -1.32, g1 = -4.30, yg = p * 1.76, zg0 = 0.92, zg1 = DECK + 0.30;
      for (i = 0; i < 8; i++) {
        z = zg0 + 0.03 + i * (zg1 - zg0 - 0.06) / 7;
        box(B.paint, g1, g0, yg - 0.018, yg + 0.018, z - 0.022, z + 0.022);
      }
      for (x = g1; x <= g0 + 1e-6; x += (g0 - g1) / 5) {
        box(B.paint, x - 0.03, x + 0.03, yg - p * 0.03, yg + p * 0.01, zg0 - 0.02, zg1 + 0.02);
        box(B.dark, x - 0.025, x + 0.025, p * WS, yg, zg0 + 0.12, zg0 + 0.17);
        box(B.dark, x - 0.025, x + 0.025, p * WS, yg, DECK - 0.10, DECK - 0.05);
      }
      /* inner track guard under the sponson */
      box(B.dark, -3.0, 2.50, p * 1.10, p * 1.14, ZSP - 0.20, ZSP - 0.02);
    }

    /* --- glacis: the lighter applique plate between the corner modules, and its bolted edge (P2, P3) --- */
    var ang = Math.atan((1.73 - 1.22) / 1.40), u = [Math.cos(ang), 0, -Math.sin(ang)], w = [Math.sin(ang), 0, Math.cos(ang)];
    slab(B.plate, [3.42, 0, deckZ(3.42) + 0.04], u, [0, 1, 0], w, 0.62, 0.84, 0.035);
    for (s = -1; s <= 1; s += 2) slab(B.dark, [3.42, s * 0.85, deckZ(3.42) + 0.05], u, [0, 1, 0], w, 0.62, 0.02, 0.035);
    box(B.dark, 2.70, 2.76, -0.86, 0.86, DECK - 0.01, DECK + 0.05);
    /* driver's vision block in the plate, tow hooks and the lower nose */
    slab(B.dark, [2.98, 0, deckZ(2.98) + 0.08], u, [0, 1, 0], w, 0.06, 0.20, 0.04);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 4.32, 4.44, s * 0.55 - 0.07, s * 0.55 + 0.07, 0.78, 0.90);
      cyl(B.dark, [3.0, s * 0.94, deckZ(3.0) + 0.03], [4.10, s * 0.94, 1.25], 0.022, 0.022, 6);
    }
    /* crew capsule: three hatches abreast ahead of the turret (P2, P3) */
    for (j = -1; j <= 1; j++) {
      x = 2.18; y = j * 0.80;
      cylZ(B.paint, x, y, DECK - 0.02, DECK + 0.07, 0.29, 20);
      cylZ(B.dark, x, y, DECK + 0.07, DECK + 0.085, 0.22, 16);
      box(B.dark, x - 0.36, x - 0.26, y - 0.12, y + 0.12, DECK, DECK + 0.10);
      box(B.dark, x + 0.24, x + 0.32, y - 0.07, y + 0.07, DECK + 0.02, DECK + 0.12);
    }

    /* --- engine deck: the raised grille block across the rear (S1, S3, P3) --------------------- */
    loftN(B.paint, [
      [[-4.26, -1.36, DECK], [-4.26, 1.36, DECK], [-4.20, 1.36, DECK + 0.10], [-4.20, -1.36, DECK + 0.10]].map(function (q) { return [q[0], q[1], q[2]]; }),
      [[-2.95, -1.36, DECK], [-2.95, 1.36, DECK], [-3.00, 1.36, DECK + 0.14], [-3.00, -1.36, DECK + 0.14]]]);
    for (i = 0; i < 10; i++) {
      x = -4.12 + i * 0.115;
      box(B.dark, x, x + 0.07, -1.30, -0.06, DECK + 0.10 + 0.04 * (i / 9), DECK + 0.13 + 0.04 * (i / 9));
      box(B.dark, x, x + 0.07, 0.06, 1.30, DECK + 0.10 + 0.04 * (i / 9), DECK + 0.13 + 0.04 * (i / 9));
    }
    box(B.paint, -4.20, -2.98, -0.06, 0.06, DECK + 0.10, DECK + 0.16);
    /* access plates and the turret-ring skirt plate on the deck */
    box(B.paint, -2.85, -2.10, -0.95, 0.95, DECK, DECK + 0.03);
    cylZ(B.paint, TX, 0, DECK - 0.02, RING - 0.04, 1.25, 32);
    /* team strips on the deck beside the turret */
    box(B.team, 0.45, 1.25, 1.38, 1.60, DECK, DECK + 0.02);
    box(B.team, 0.45, 1.25, -1.60, -1.38, DECK, DECK + 0.02);

    /* --- stern (P6): two round access plates, tow hooks, lamps, the cable along the plate ------ */
    for (s = -1; s <= 1; s += 2) {
      cylX(B.paint, -4.40, -4.33, s * 0.48, 1.12, 0.17, 0.17, 16);
      box(B.dark, -4.44, -4.34, s * 0.85 - 0.07, s * 0.85 + 0.07, 0.80, 0.94);
      box(B.dark, -4.40, -4.34, s * 1.42 - 0.08, s * 1.42 + 0.08, 1.48, 1.58);
      box(B.paint, -4.40, -4.33, s * 1.20 - 0.18, s * 1.20 + 0.18, 1.18, 1.42);
    }
    cylY(B.dark, -4.39, -1.05, 1.05, 1.44, 0.025, 6);
    box(B.dark, -4.40, -4.34, -0.20, 0.20, 0.92, 1.10);
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
        /* link plate with its rubber pad (P5 shows the pads light), and the centre guide horn on the inside */
        belt(B.dark, px - dx * 0.075, pz - dz * 0.075, px + dx * 0.075, pz + dz * 0.075, y - TW - 0.01, y + TW + 0.01, 0.085);
        belt(B.dark, px - dx * 0.03 - dz * 0.07, pz - dz * 0.03 + dx * 0.07, px + dx * 0.03 - dz * 0.07, pz + dz * 0.03 + dx * 0.07, y - 0.025, y + 0.025, 0.06);
      }
      /* sprocket (rear, raised) with its toothed rings, idler (front, raised), return rollers */
      cylY(B.dark, SPR.x, y - 0.22, y + 0.22, SPR.z, SPR.r, 18);
      cylY(B.paint, SPR.x, y + s * 0.20, y + s * 0.27, SPR.z, 0.21, 12);
      cylY(B.dark, SPR.x, y + s * 0.27, y + s * 0.31, SPR.z, 0.08, 8);
      cylY(B.paint, IDL.x, y - 0.22, y + 0.22, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.21, y + s * 0.28, IDL.z, 0.11, 10);
      box(B.dark, IDL.x - 0.36, IDL.x, y + s * 0.30 - 0.03, y + s * 0.30 + 0.03, IDL.z - 0.04, IDL.z + 0.04);
      for (i = 0; i < XR.length; i++) {
        cylY(B.dark, XR[i], y - 0.18, y + 0.18, ZR, RR, 10);
        cylY(B.paint, XR[i], y + s * 0.17, y + s * 0.22, ZR, 0.05, 8);
      }
    }
  }

  /* road wheel (S2, P5): the dark tyre band, a dished disc with a raised ring and eight bolt
     recesses round the hub, the hub cap */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.20, 0.21, 0.18];
  function addWheel(W) {
    var s, y, i, a, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.14, gg * 1.14, bb * 1.14];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.255, y - 0.15, 0, RW, 18);
      cylY(W, 0, y + 0.15, y + 0.255, 0, RW, 18);
      W.col = BODY;
      cylY(W, 0, y - 0.15, y + 0.15, 0, 0.31, 18);
      cyl(W, [0, y + s * 0.257, 0], [0, y + s * 0.277, 0], 0.30, 0.17, 18);
      cylY(W, 0, y + s * 0.27, y + s * 0.30, 0, 0.12, 10);
      W.col = HOLE;
      for (i = 0; i < 8; i++) {
        a = (i + 0.5) / 8 * TAU;
        slab(W, [Math.cos(a) * 0.20, y + s * 0.262, Math.sin(a) * 0.20], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.03, 0.012, 0.03);
      }
      W.col = TYRE;
      cylY(W, 0, y + s * 0.295, y + s * 0.315, 0, 0.05, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* the faceted shell, lofted through three levels (S1, S2, P3): base, the waist ridge at gun
     height where the facets meet, and the roof.  Half plans [x, y], front to rear, turret frame */
  var TPLAN = [
    [[1.55, 0.30], [1.12, 0.92], [0.35, 1.00], [-0.95, 1.00], [-1.38, 0.88], [-1.50, 0.50]],
    [[1.98, 0.30], [1.46, 1.06], [0.45, 1.27], [-0.95, 1.27], [-1.48, 1.12], [-1.62, 0.55]],
    [[1.30, 0.30], [1.02, 0.86], [0.35, 1.05], [-0.95, 1.05], [-1.44, 0.96], [-1.58, 0.50]]];
  var TZ = [0.02, 0.55, 0.88], GZ = 0.50, MUZ = 6.70;
  function addTurret(B) {
    var i, j, s, x, k, L, a, b, m, t, nh, uu, vv, ww, RZ = TZ[2];
    cylZ(B.dark, 0, 0, -0.08, 0.04, 1.12, 28);                     /* ring and its seal */
    loftN(B.paint, [ringAt(TPLAN[0], TZ[0]), ringAt(TPLAN[1], TZ[1]), ringAt(TPLAN[2], TZ[2])]);

    /* the high box bustle overhanging the engine deck (S1, S2), a rail round its rear face */
    loftN(B.paint, [
      [[-1.45, -1.04, 0.34], [-1.45, 1.04, 0.34], [-1.45, 1.04, 0.86], [-1.45, 1.01, 0.88], [-1.45, -1.01, 0.88], [-1.45, -1.04, 0.86]],
      [[-2.48, -1.04, 0.38], [-2.48, 1.04, 0.38], [-2.48, 1.04, 0.86], [-2.48, 1.01, 0.88], [-2.48, -1.01, 0.88], [-2.48, -1.04, 0.86]],
      [[-2.62, -0.98, 0.48], [-2.62, 0.98, 0.48], [-2.62, 0.98, 0.82], [-2.62, 0.95, 0.84], [-2.62, -0.95, 0.84], [-2.62, -0.98, 0.82]]]);
    box(B.dark, -2.68, -2.64, -0.90, 0.90, 0.72, 0.75);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -2.68, -2.48, s * 0.90 - 0.02, s * 0.90 + 0.02, 0.52, 0.75);
      /* GPS mushroom on the bustle (P4) */
      cylZ(B.dark, -2.30, s * 0.70, 0.88, 0.94, 0.025, 6);
    }
    cyl(B.paint, [-2.30, 0.70, 0.94], [-2.30, 0.70, 1.00], 0.07, 0.05, 10);

    /* radar panels and camera windows on the upper facets (P4): raised plates, dark glass */
    var Lo = TPLAN[1], Up = TPLAN[2];
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 2; k++) {
        a = [(Lo[k + 1][0] + Up[k + 1][0]) / 2, (Lo[k + 1][1] + Up[k + 1][1]) / 2];
        b = [(Lo[k + 2][0] + Up[k + 2][0]) / 2, (Lo[k + 2][1] + Up[k + 2][1]) / 2];
        t = [b[0] - a[0], b[1] - a[1]]; L = Math.sqrt(t[0] * t[0] + t[1] * t[1]); t = [t[0] / L, t[1] / L];
        nh = [-t[1], t[0]];
        if (nh[1] < 0) nh = [-nh[0], -nh[1]];
        var dzh = TZ[2] - TZ[1], dyh = (Lo[k + 1][1] - Up[k + 1][1] + Lo[k + 2][1] - Up[k + 2][1]) / 2;
        var ph = Math.atan2(dyh, dzh);
        m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        uu = [t[0], t[1] * s, 0];
        ww = [nh[0] * Math.cos(ph), nh[1] * s * Math.cos(ph), Math.sin(ph)];
        vv = [-nh[0] * Math.sin(ph), -nh[1] * s * Math.sin(ph), Math.cos(ph)];
        slab(B.paint, [m[0] + ww[0] * 0.012, s * m[1] + ww[1] * 0.012, (TZ[1] + TZ[2]) / 2 + ww[2] * 0.012], uu, vv, ww, k === 0 ? 0.36 : 0.42, 0.17, 0.014);
        /* camera window (P4, S2) */
        if (k === 1) slab(B.dark, [m[0] - t[0] * 0.70 + ww[0] * 0.03, s * (m[1] - t[1] * 0.70) + ww[1] * 0.03, (TZ[1] + TZ[2]) / 2 + ww[2] * 0.03], uu, vv, ww, 0.15, 0.08, 0.012);
      }
      /* the bustle side camera (S2) */
      box(B.dark, -1.95, -1.65, s * 1.04, s * 1.055, 0.58, 0.72);
    }

    /* Afganit hard-kill launch tubes: five a side in a row under the waist ridge, pointing
       forward and outward (S2, P4; count and angle a judgement call) */
    for (s = -1; s <= 1; s += 2)
      for (i = 0; i < 5; i++) {
        x = -1.15 + i * 0.50;
        var y0 = s * 0.97, ca = Math.cos(0.45), sa = Math.sin(0.45);
        cyl(B.paint, [x - ca * 0.24, y0 - s * sa * 0.10, 0.15], [x + ca * 0.24, y0 + s * sa * 0.24, 0.15], 0.12, 0.12, 12);
        cyl(B.dark, [x + ca * 0.24, y0 + s * sa * 0.24, 0.15], [x + ca * 0.26, y0 + s * sa * 0.26, 0.15], 0.095, 0.095, 10);
        cyl(B.dark, [x - ca * 0.05, y0 + s * sa * 0.06, 0.15], [x - ca * 0.02, y0 + s * sa * 0.09, 0.15], 0.128, 0.128, 12);
      }

    /* the soft-kill grenade boxes on the roof rear corners, tube mouths outward (P3, P4) */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -1.42, -0.98, s * 0.66, s * 0.98, RZ - 0.02, RZ + 0.26);
      for (i = 0; i < 3; i++)
        for (j = 0; j < 2; j++)
          cylY(B.dark, -1.34 + i * 0.14, s * 0.97, s * 1.00, RZ + 0.06 + j * 0.13, 0.05, 8);
    }

    /* mantlet in the front notch and the 125 mm 2A82-1M (S1, P1): thick breech end, plain
       tapering barrel, the barrel-bend sensor block (P4), a collar at the muzzle */
    box(B.paint, 1.42, 1.92, -0.30, 0.30, GZ - 0.24, GZ + 0.24);
    box(B.dark, 1.92, 1.95, -0.24, 0.24, GZ - 0.18, GZ + 0.18);
    cylX(B.paint, 1.94, 3.30, 0, GZ, 0.155, 0.140, 18);
    cylX(B.dark, 3.30, 3.36, 0, GZ, 0.148, 0.148, 16);
    cylX(B.paint, 3.36, 5.20, 0, GZ, 0.122, 0.108, 16);
    cylX(B.dark, 4.60, 4.65, 0, GZ, 0.116, 0.116, 14);
    cylX(B.paint, 5.20, MUZ - 0.18, 0, GZ, 0.108, 0.098, 16);
    cylX(B.paint, MUZ - 0.18, MUZ, 0, GZ, 0.112, 0.112, 16);
    cylX(B.dark, MUZ - 0.01, MUZ, 0, GZ, 0.085, 0.085, 12);
    box(B.dark, 2.10, 2.30, -0.06, 0.06, GZ + 0.14, GZ + 0.20);
    cylX(B.dark, 1.70, 2.02, -0.36, GZ - 0.06, 0.024, 0.024, 8);    /* co-axial 7.62 mm */

    /* the panoramic sight / remote weapon box, rear right (S1, P2, P7): a round base, a tall box
       with chamfered front, two windows, the hood */
    cylZ(B.paint, -1.05, -0.30, RZ - 0.02, RZ + 0.12, 0.40, 22);
    cylZ(B.paint, -1.05, -0.30, RZ + 0.12, RZ + 0.20, 0.33, 20);
    loftN(B.paint, [
      [[-1.50, -0.66, RZ + 0.18], [-0.78, -0.66, RZ + 0.18], [-0.62, -0.50, RZ + 0.18], [-0.62, 0.04, RZ + 0.18], [-1.50, 0.04, RZ + 0.18]],
      [[-1.50, -0.66, RZ + 0.56], [-0.78, -0.66, RZ + 0.56], [-0.62, -0.50, RZ + 0.56], [-0.62, 0.04, RZ + 0.56], [-1.50, 0.04, RZ + 0.56]]]);
    box(B.dark, -0.635, -0.615, -0.44, -0.08, RZ + 0.28, RZ + 0.50);
    /* the panoramic head on top, its window forward (S1, P7) */
    box(B.paint, -1.30, -0.86, -0.52, -0.14, RZ + 0.56, RZ + 0.68);
    box(B.dark, -0.87, -0.85, -0.46, -0.20, RZ + 0.58, RZ + 0.66);
    /* the 12.7 mm cradle alongside (P2: the gun was not fitted on the parade cars; the cradle is) */
    box(B.paint, -1.40, -0.80, 0.04, 0.18, RZ + 0.26, RZ + 0.40);

    /* gunner's sight, front right of the roof beside the gun (P4) */
    box(B.paint, 0.70, 1.10, -0.70, -0.38, RZ - 0.04, RZ + 0.20);
    box(B.dark, 1.10, 1.12, -0.66, -0.42, RZ + 0.02, RZ + 0.16);
    /* meteo mast, front left (P2, P4), antenna bases */
    cylZ(B.dark, 0.25, 0.70, RZ, RZ + 0.50, 0.03, 6);
    box(B.dark, 0.18, 0.32, 0.64, 0.76, RZ + 0.48, RZ + 0.62);
    cylZ(B.dark, -0.55, 0.62, RZ, RZ + 0.10, 0.05, 8);
    cylZ(B.dark, -0.55, -0.80, RZ, RZ + 0.10, 0.05, 8);
    /* roof access plates and the team strip */
    box(B.paint, -0.20, 0.55, -0.40, 0.12, RZ, RZ + 0.025);
    box(B.team, -0.70, 0.10, 0.20, 0.44, RZ, RZ + 0.02);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group();
    var HB = bins(T), i, wg, WB, tg, TB = bins(T);
    addHull(HB);
    addRunning(HB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    addTurret(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, RING);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build };
})();

/* len: the measured X extent of the build (models3d convention); published 10.8 m gun forward */
UNIT_MODELS["hvy_p"] = {
  len: 10.85,
  build: function (THREE, M, C) { return HeroT14.build(THREE, M, C); }
};
