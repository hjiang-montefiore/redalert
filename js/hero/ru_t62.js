/* ========== ru_t62.js - HERO model: T-62 main battle tank (pact_e60_mbt) ===
   The Soviet 1961 T-62 (Obiekt 166): the T-55 hull lengthened and widened for a bigger
   turret ring, the low, wide, symmetrical cast "egg" turret of the Obiekt 140, and the
   115 mm U-5TS (2A20) smoothbore with its bore evacuator part way down the tube. Drawn
   as the 1961-1972 tank the row names (service 1961): NO 12.7 mm DShK on the loader's
   hatch (it came with the obr. 1972 fit; en.wikipedia T-62: "optional until T-62
   Obr. 1972") and none of the T-62M's laser sight, brow armour or side screens.

   REDO 2026-10-24 (full-quality procedure). References, Wikimedia Commons, width 960,
   cached in scratchpad/q_t62_ref:
     D1  "Drawing of a Soviet-built T-62 main battle tank, right rear view - DPLA" (US DoD
         recognition artwork): the two ribbed 200 l drums across the rear plate, fuel
         tanks along the right fender, the low turret with the cupola left, the loader's
         hatch right, the snorkel tube across the turret rear; and its inset side outline.
     P1  "T-62 tank in Petah-Tikva.jpg" - ex-Syrian T-62, near-square port side, turret
         traversed to the rear: the five road wheels (gaps measured on the image, nose
         first, after correcting the perspective: 1.02, 1.03, 1.17, 1.19 times the
         wheel spacing scale - the LAST three pairs further apart), no return rollers,
         the track sagging on the wheel tops, the turret height and length (about 0.9 m
         and 2.8 m), two curved handrails on each turret side, the snorkel tube end at
         the turret rear, the wheel discs with large holes.
     P2  "Kampfpanzer T 62.JPG" - Panzermuseum Munster, head-on from the right: the two
         big ribbed front mudguards, the splash board across the glacis, a headlamp in a
         guard each side of the glacis, the tow cable on the glacis, the L-2 "Luna" IR
         searchlight on its bracket right of the gun, the gunner's sight port left of the
         gun, the commander's cupola left with its small searchlight in front, the
         handrail on the left side of the turret, the antenna at the left rear.
     P3  "T-62 medium main battle tank.jpg" - starboard front 3/4 (a pre-1972 tank with no
         DShK): the long tube with the evacuator from about 0.33 to 0.56 of the exposed
         length back from the muzzle, the low turret, the right-fender stowage, the
         uneven road wheels.
     P4  "T-62 Medium Tank '166' (37679271131).jpg" - Kubinka, port rear 3/4: the left
         fender boxes, the turret rear with the snorkel tube, the green finish.
     P5  "Rear view of a T-62A.JPEG" - a T-62 on the move from the rear: the two drums
         across the top of the rear plate, the louvred engine deck, the cupola and the
         loader's hatch.
     P6  "T-62 pre-1972 turret.jpg" - the cast turret close up: the cupola, the loader's
         round hatch further back on the right, the long curved handrail, the snorkel
         tube and its end cap at the rear.
     P7  "Srednii tank T-62.jpg" (Patriot Park, port front 3/4): the curved front
         mudguards, the fender boxes on the left, the glacis headlamps (its DShK is the
         1972 fit and is NOT drawn).
   Published figures (en/ru Wikipedia T-62): hull 6.63 m, 9.335 m gun forward, width
   3.30 m, height 2.395 m to the turret roof, ground clearance 0.425 m, track 580 mm,
   five 830 mm road wheels a side, no return rollers, turret over the third road wheel.
   CORRECTIONS against the previous model: the length gun forward is 9.335 m, not 9.67 m
   (the old muzzle sat 0.37 m too far out); the turret roof stood at 2.10 m against the
   published 2.395 m; the AA machine gun on the loader's hatch is the 1972 fit, removed;
   the old wheel gaps (0.94-1.15 m) are kept in pattern but re-measured (P1); the
   turret-side port plug is not seen on P1, P2, P6 and is dropped; the rear drums,
   snorkel tube, splash board, ribbed mudguards and turret handrails are now drawn
   (D1, P1, P2, P5, P6).

   Recognition list (what makes it read at game zoom, and its source):
     1. five big road wheels a side, the last three pairs further apart, no return
        rollers, the track sagging on the wheel tops - P1, P3, en.wikipedia
     2. long low hull, the upper glacis falling at about 28 deg to a sharp nose, flat
        fenders level with the deck - P1, P3, D1
     3. the wide, low, symmetrical cast egg turret over the third wheel - P1, P2, P6
     4. the long 115 mm tube, bore evacuator about a third of the way back from the
        muzzle, no muzzle brake - P1, P3
     5. the L-2 IR searchlight on its bracket right of the gun - P2
     6. commander's cupola on the left with its small searchlight; the loader's round
        hatch further back on the right - P2, P5, P6
     7. the big ribbed front mudguards and the splash board across the glacis - P2, P7
     8. two ribbed 200 l drums across the rear plate - D1, P5
     9. fuel tanks along the right fender, boxes along the left - D1, P3, P4
    10. curved handrails on the turret sides, the snorkel tube across the turret rear - P1, P6
   Paint: Soviet protective green. Sampled off P4 under the Kubinka hall lights
   (#6b6e5e, #69654c) and P2 (#555752): grey-cast by the lighting; drawn as the period
   olive #505a3c (about 0.8 of a lit #65704b), the same family as the T-72 Ural redo.
   No numbers, stars, emblems or markings (P2, P4 carry them: not drawn).
   NOT CONFIRMED, drawn as judgement calls: the number and exact shape of the right
   fender tanks (three drawn, D1, P3); the exhaust louvre on the left fender over the
   fifth wheel (T-55 practice, P4 too dark to confirm its outline); the snorkel tube's
   cap on the port end; the wheel disc hole count (P1 shows large holes, drawn as six).
   NOT DRAWN (no reference shows it on a 1960s tank): the unditching beam, the
   wide training snorkel, spare track links on the glacis, the radio whip.

   Materials: PAINT (canvas texture: base, mottling, cast-steel texture, weld seams,
   grime; metre UVs), DARK (track, rubber, fittings, lenses), WHEEL (tyres, discs and
   holes by vertex colour) and the team colour exactly as handed in (C.team): two small
   strips (engine deck, turret roof). Nodes: "turret" (trains, origin on the ring
   centre, gun along +X), five "roadwheel" groups (axle along local Y, each holding both
   sides). Draw calls: hull 3 + turret 3 + 5 wheels = 11.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroT62 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var VARIANTS = {
    A: { paint: { base: "#505a3c", blots: ["#474f35", "#5b6545"], seed: 62 } }
  };

  /* running gear (P1, published 830 mm wheels, 580 mm track, 3.30 m width) */
  var TY = 1.36, TW = 0.29;                               /* track centre / half width */
  var XW = [2.01, 1.02, 0.02, -1.10, -2.28], ZW = 0.49, RW = 0.415;
  var IDL = { x: 2.90, z: 0.80, r: 0.30 }, SPR = { x: -3.00, z: 0.76, r: 0.32 };
  var DECK = 1.40, RING = 1.40, FW = 1.65, TX = 0.08, NOSE = 3.315, TAIL = -3.315;
  var MUZ = TAIL + 9.335 - TX;                            /* muzzle, turret frame: 9.335 m gun forward */

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
  function cylY(bin, x, y0, y1, z, r, seg, nocap) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg, nocap); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg); }
  /* a closed solid lofted through LEVELS, each a convex ring of [x, y, z] with the same count */
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
  /* paint: one tile is 1 / 0.34 = 2.9 m. Base, soft mottling, the pitted cast-steel grain
     of the turret and nose (P6), weld seams with bolt rows, grime and rain streaks (P2, P4) */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "t62" + P.base + P.seed, 512, function (q, S) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 14; i++) { q.globalAlpha = 0.30 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 900; i++) {               /* cast-steel pitting */
        q.fillStyle = (i % 2) ? "rgba(18,20,12,0.16)" : "rgba(230,232,205,0.08)";
        q.fillRect(R() * S, R() * S, 1 + R() * 3, 1 + R() * 2);
      }
      for (i = 0; i < 6; i++) {                 /* weld seams / plate joints */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 2, w, 1); else q.fillRect(x + 2, y, 1, w);
        q.fillStyle = "rgba(18,18,14,0.45)";
        for (k = 6; k < w; k += 16) { if (i % 2) q.fillRect(x + k, y - 5, 3, 3); else q.fillRect(x - 5, y + k, 3, 3); }
      }
      for (i = 0; i < 90; i++) {                /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 24; i++) { q.fillStyle = "rgba(25,22,15,0.06)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
    });
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), team: new Bin(T.team, false) }; }
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
  /* station table (P1 side, D1 outline; published 6.63 m hull, 0.425 m clearance, deck at
     the fender line 1.40 m): x, belly half width, belly z, side half width, roof z.
     Rear plate leaning in at the bottom; flat deck; the upper glacis falls at about 28 deg
     to the nose at 0.86 m, the lower glacis runs back to the belly by x = 2.70. */
  var HS = [
    [-3.315, 0.98, 0.66, 1.03, 1.30],
    [-3.30, 1.00, 0.56, 1.05, 1.355],
    [-3.26, 1.02, 0.48, 1.06, 1.385],
    [-3.18, 1.04, 0.44, 1.07, 1.40],
    [-3.00, 1.05, 0.425, 1.07, 1.40],
    [-2.00, 1.05, 0.425, 1.07, 1.40],
    [-1.00, 1.05, 0.425, 1.07, 1.40],
    [ 0.00, 1.05, 0.425, 1.07, 1.40],
    [ 1.00, 1.05, 0.425, 1.07, 1.40],
    [ 2.30, 1.05, 0.425, 1.07, 1.40],
    [ 2.55, 1.05, 0.425, 1.07, 1.267],
    [ 2.70, 1.05, 0.425, 1.07, 1.187],
    [ 2.90, 1.04, 0.566, 1.07, 1.081],
    [ 3.10, 1.02, 0.708, 1.06, 0.974],
    [ 3.25, 1.00, 0.814, 1.05, 0.895],
    [ 3.315, 0.98, 0.84, 1.04, 0.875]
  ];
  function glacisZ(x) { return x <= 2.30 ? DECK : DECK - 0.532 * (x - 2.30); }
  var GA = Math.atan(0.532), GU = [Math.cos(GA), 0, -Math.sin(GA)], GW = [Math.sin(GA), 0, Math.cos(GA)];
  function hullRing(S) {
    var x = S[0], wb = S[1], zB = S[2], ws = S[3], zT = S[4], e = Math.min(0.03, (zT - zB) / 4);
    return [[x, wb, zB], [x, ws, Math.min(zB + 0.10, zT - 2 * e)], [x, ws, zT - e], [x, ws - e, zT],
            [x, -(ws - e), zT], [x, -ws, zT - e], [x, -ws, Math.min(zB + 0.10, zT - 2 * e)], [x, -wb, zB]];
  }

  function addHull(B) {
    var R = HS.map(hullRing), i, j, k, k1, a, b, c, d, e, dy, dz, p, s, x, n = R[0].length;
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

    for (p = -1; p <= 1; p += 2) {
      var yi = p * 1.06, yo = p * FW, ylo = Math.min(yi, yo), yhi = Math.max(yi, yo);
      /* fender shelf level with the deck, its turned-down outer lip (P1, P3) */
      box(B.paint, -3.30, 2.30, ylo, yhi, DECK - 0.035, DECK);
      box(B.paint, -3.30, 2.30, p > 0 ? FW - 0.025 : -FW, p > 0 ? FW : -FW + 0.025, DECK - 0.08, DECK + 0.01);
      /* the big pressed front mudguard (P2, P7): rolled down over the idler from the glacis
         top to below the nose, a rounded crown, five raised ribs */
      var MG = [[2.28, 1.40], [2.60, 1.37], [2.88, 1.29], [3.10, 1.17], [3.28, 1.02], [3.38, 0.86]], q, ya = p * 1.08, yb = p * (FW + 0.01);
      for (q = 0; q + 1 < MG.length; q++) {
        belt(B.paint, MG[q][0], MG[q][1], MG[q + 1][0], MG[q + 1][1], Math.min(ya, yb), Math.max(ya, yb), 0.04);
        for (j = 0; j < 5; j++) {
          var yr = p * (1.18 + j * 0.105);
          belt(B.paint, MG[q][0], MG[q][1] + 0.025, MG[q + 1][0], MG[q + 1][1] + 0.025, yr - 0.018, yr + 0.018, 0.03);
        }
      }
      /* the mudguard's side skirt, rounded down at its front corner */
      loftN(B.paint, [
        [[2.30, yb, 1.40], [3.36, yb, 0.90], [3.30, yb, 0.82], [2.95, yb, 1.06], [2.40, yb, 1.20]],
        [[2.30, yb - p * 0.03, 1.40], [3.36, yb - p * 0.03, 0.90], [3.30, yb - p * 0.03, 0.82], [2.95, yb - p * 0.03, 1.06], [2.40, yb - p * 0.03, 1.20]]]);
      /* rear fender end and mud flap */
      box(B.paint, -3.36, -3.30, p > 0 ? 1.06 : -FW, p > 0 ? FW : -1.06, 1.05, DECK + 0.01);
      /* inner track guard under the shelf */
      box(B.dark, -3.0, 2.25, p > 0 ? 1.06 : -1.10, p > 0 ? 1.10 : -1.06, 1.05, DECK - 0.04);
      /* headlamp in its wire guard on the glacis corner (P2, P7) */
      x = 2.62;
      cyl(B.dark, [x, p * 0.92, glacisZ(x) + 0.12], [x + 0.12, p * 0.92, glacisZ(x) + 0.11], 0.075, 0.075, 12);
      cyl(B.paint, [x - 0.05, p * 0.92, glacisZ(x) + 0.12], [x, p * 0.92, glacisZ(x) + 0.12], 0.085, 0.085, 12);
      box(B.dark, x - 0.06, x + 0.02, p * 0.92 - 0.03, p * 0.92 + 0.03, glacisZ(x), glacisZ(x) + 0.08);
      cyl(B.dark, [x - 0.02, p * 0.92 - 0.11, glacisZ(x) + 0.04], [x + 0.17, p * 0.92 - 0.11, glacisZ(x) + 0.12], 0.012, 0.012, 5);
      cyl(B.dark, [x - 0.02, p * 0.92 + 0.11, glacisZ(x) + 0.04], [x + 0.17, p * 0.92 + 0.11, glacisZ(x) + 0.12], 0.012, 0.012, 5);
      cyl(B.dark, [x + 0.17, p * 0.92 - 0.11, glacisZ(x) + 0.12], [x + 0.17, p * 0.92 + 0.11, glacisZ(x) + 0.12], 0.012, 0.012, 5);
    }

    /* --- glacis (P2): the splash board standing across it, braced at the ends; the welded
       nose joint; the tow cable looped across in S hooks; tow hooks at the nose --------- */
    slab(B.paint, [2.86, 0, glacisZ(2.86) + 0.085], unit([-0.35, 0, 1]), [0, 1, 0], unit([1, 0, 0.35]), 0.09, 0.74, 0.012);
    for (s = -1; s <= 1; s += 2) slab(B.paint, [2.83, s * 0.74, glacisZ(2.83) + 0.06], [1, 0, 0], [0, 0, 1], [0, 1, 0], 0.10, 0.07, 0.012);
    slab(B.dark, [3.27, 0, glacisZ(3.27) + 0.006], GU, [0, 1, 0], GW, 0.012, 0.98, 0.006);
    cyl(B.dark, [2.52, -0.70, glacisZ(2.52) + 0.03], [2.70, -0.10, glacisZ(2.70) + 0.03], 0.024, 0.024, 6);
    cyl(B.dark, [2.70, -0.10, glacisZ(2.70) + 0.03], [2.52, 0.45, glacisZ(2.52) + 0.03], 0.024, 0.024, 6);
    cyl(B.dark, [2.52, 0.45, glacisZ(2.52) + 0.03], [3.05, 0.70, glacisZ(3.05) + 0.03], 0.024, 0.024, 6);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 3.30, 3.40, s * 0.55 - 0.06, s * 0.55 + 0.06, 0.78, 0.90);
      box(B.dark, -3.37, -3.31, s * 0.60 - 0.06, s * 0.60 + 0.06, 0.62, 0.72);
    }
    /* driver's hatch on the left front of the deck and his two periscopes (P2, P7) */
    cylZ(B.paint, 2.02, 0.52, DECK, DECK + 0.06, 0.25, 16);
    cylZ(B.paint, 2.02, 0.52, DECK + 0.06, DECK + 0.08, 0.20, 14);
    box(B.dark, 2.24, 2.30, 0.40, 0.48, DECK - 0.01, DECK + 0.05);
    box(B.dark, 2.24, 2.30, 0.56, 0.64, DECK - 0.01, DECK + 0.05);

    /* --- fender stowage: on the left a front box, the tool boxes and the exhaust louvre over
       the fifth wheel; on the right a front box and three fuel tanks piped together (D1, P3,
       P4) */
    box(B.paint, 1.35, 2.20, 1.36, 1.62, DECK, DECK + 0.22);
    box(B.dark, 1.35, 2.20, 1.355, 1.625, DECK + 0.215, DECK + 0.225);
    box(B.paint, 0.20, 1.10, 1.38, 1.62, DECK, DECK + 0.18);
    box(B.paint, -0.85, 0.00, 1.38, 1.62, DECK, DECK + 0.20);
    box(B.dark, -0.45, -0.39, 1.37, 1.63, DECK + 0.05, DECK + 0.15);
    box(B.dark, -2.55, -1.85, 1.10, 1.40, DECK - 0.01, DECK + 0.03);
    for (i = 0; i < 7; i++) box(B.paint, -2.52 + i * 0.10, -2.47 + i * 0.10, 1.12, 1.38, DECK + 0.02, DECK + 0.05);
    box(B.paint, -3.20, -2.65, 1.38, 1.62, DECK, DECK + 0.20);
    box(B.paint, 1.35, 2.20, -1.62, -1.36, DECK, DECK + 0.22);
    box(B.dark, 1.35, 2.20, -1.625, -1.355, DECK + 0.215, DECK + 0.225);
    for (i = 0; i < 3; i++) {
      var tx0 = 0.95 - i * 1.18, tx1 = tx0 - 1.08;
      loftN(B.paint, [
        [[tx0, -1.62, DECK], [tx0, -1.62, DECK + 0.25], [tx0, -1.55, DECK + 0.31], [tx0, -1.43, DECK + 0.31], [tx0, -1.36, DECK + 0.25], [tx0, -1.36, DECK]],
        [[tx1, -1.62, DECK], [tx1, -1.62, DECK + 0.25], [tx1, -1.55, DECK + 0.31], [tx1, -1.43, DECK + 0.31], [tx1, -1.36, DECK + 0.25], [tx1, -1.36, DECK]]]);
      box(B.dark, tx1 + 0.14, tx1 + 0.20, -1.63, -1.35, DECK + 0.02, DECK + 0.325);
      box(B.dark, tx0 - 0.20, tx0 - 0.14, -1.63, -1.35, DECK + 0.02, DECK + 0.325);
      cylZ(B.dark, (tx0 + tx1) / 2, -1.49, DECK + 0.31, DECK + 0.35, 0.05, 8);
    }
    cylX(B.dark, -2.40, 0.95, -1.34, DECK + 0.06, 0.025, 0.025, 6);

    /* --- engine deck (P5): the louvred radiator grille across the rear, the engine access
       plates, the transmission hatch; team strip on the plate ahead of the grille --- */
    box(B.dark, -3.22, -2.25, -0.92, 0.92, DECK - 0.01, DECK + 0.012);
    for (i = 0; i < 9; i++) box(B.paint, -3.20 + i * 0.11, -3.15 + i * 0.11, -0.90, 0.90, DECK + 0.012, DECK + 0.04);
    box(B.paint, -2.10, -0.95, -0.70, 0.70, DECK, DECK + 0.035);
    box(B.dark, -2.08, -1.98, -0.68, 0.68, DECK + 0.035, DECK + 0.045);
    cylZ(B.paint, -1.55, 0.86, DECK, DECK + 0.05, 0.17, 12);
    box(B.team, -1.90, -1.10, -0.13, 0.13, DECK + 0.035, DECK + 0.055);

    /* --- stern (D1, P5): two ribbed 200 l drums across the top of the rear plate on their
       brackets, end to end; the drum brackets; the rear lights --- */
    var dxr = -3.63, dzr = 1.68;
    for (s = -1; s <= 1; s += 2) {
      var dyr = s * 0.47;
      cylY(B.paint, dxr, dyr - 0.44, dyr + 0.44, dzr, 0.29, 20);
      for (j = 0; j < 4; j++) cylY(B.dark, dxr, dyr - 0.30 + j * 0.20 - 0.015, dyr - 0.30 + j * 0.20 + 0.015, dzr, 0.297, 20);
      cylY(B.dark, dxr, dyr - 0.44, dyr - 0.42, dzr, 0.296, 20, true);
      cylY(B.dark, dxr, dyr + 0.42, dyr + 0.44, dzr, 0.296, 20, true);
      cylY(B.dark, dxr, dyr + s * 0.44, dyr + s * 0.45, dzr - 0.17, 0.035, 8);
      /* the curved bracket arms from the rear plate up under the drums (D1) */
      belt(B.dark, -3.31, 1.02, -3.52, 1.12, s * 0.95 - 0.04, s * 0.95 + 0.04, 0.06);
      belt(B.dark, -3.52, 1.12, -3.66, 1.40, s * 0.95 - 0.04, s * 0.95 + 0.04, 0.06);
      belt(B.dark, -3.31, 1.30, -3.48, 1.40, s * 0.95 - 0.04, s * 0.95 + 0.04, 0.05);
      belt(B.dark, -3.31, 1.02, -3.52, 1.12, s * 0.05 - 0.035, s * 0.05 + 0.035, 0.06);
      belt(B.dark, -3.52, 1.12, -3.62, 1.40, s * 0.05 - 0.035, s * 0.05 + 0.035, 0.06);
      box(B.dark, -3.36, -3.31, s * 0.80 - 0.06, s * 0.80 + 0.06, 1.18, 1.26);
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
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.045]);
    C.push([IDL.x, IDL.z, IDL.r + 0.045], [SPR.x, SPR.z, SPR.r + 0.045]);
    pts = [];
    for (i = 0; i < C.length; i++) for (k = 0; k < 28; k++) pts.push([C[i][0] + Math.cos(k / 28 * TAU) * C[i][2], C[i][1] + Math.sin(k / 28 * TAU) * C[i][2]]);
    pts = hull2(pts);
    /* the upper run of a T-62 track hangs between the wheel tops (P1): sag the points that
       lie between the wheel tops down by a parabola */
    pts = pts.map(function (pt) {
      if (pt[1] < ZW + RW) return pt;
      var j, sag = 0;
      for (j = 0; j + 1 < XW.length; j++) {
        var x0 = XW[j + 1], x1 = XW[j];
        if (pt[0] > x0 + 0.12 && pt[0] < x1 - 0.12) { var u = (pt[0] - x0) / (x1 - x0); sag = 0.07 * 4 * u * (1 - u); }
      }
      return [pt[0], pt[1] - sag];
    });
    n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    n = segs.length;
    cnt = Math.round(tot / 0.137 / 2); step = tot / cnt;
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
        /* the skeleton link with its grouser bar, and the centre guide horn inside the run */
        belt(B.dark, px - dx * 0.05, pz - dz * 0.05, px + dx * 0.05, pz + dz * 0.05, y - TW - 0.01, y + TW + 0.01, 0.09);
        belt(B.dark, px - dx * 0.03 + dz * 0.07, pz - dz * 0.03 - dx * 0.07, px + dx * 0.03 + dz * 0.07, pz + dz * 0.03 - dx * 0.07, y - 0.03, y + 0.03, 0.07);
      }
      /* sprocket (rear) with its two toothed rings, idler (front) with its crank */
      cylY(B.dark, SPR.x, y - 0.22, y - 0.12, SPR.z, SPR.r, 18);
      cylY(B.dark, SPR.x, y + 0.12, y + 0.22, SPR.z, SPR.r, 18);
      cylY(B.paint, SPR.x, y - 0.12, y + 0.12, SPR.z, 0.22, 14);
      cylY(B.paint, SPR.x, y + s * 0.20, y + s * 0.27, SPR.z, 0.19, 12);
      cylY(B.dark, SPR.x, y + s * 0.27, y + s * 0.31, SPR.z, 0.08, 8);
      cylY(B.paint, IDL.x, y - 0.22, y + 0.22, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.21, y + s * 0.28, IDL.z, 0.12, 10);
      box(B.dark, IDL.x - 0.30, IDL.x, y - s * 0.30 - 0.03, y - s * 0.30 + 0.03, IDL.z - 0.04, IDL.z + 0.04);
      /* shock absorbers at the first and last wheel arms (en.wikipedia) */
      cyl(B.dark, [XW[0] + 0.30, s * 1.08, ZW + 0.05], [XW[0] + 0.55, s * 1.08, 1.20], 0.05, 0.05, 8);
      cyl(B.dark, [XW[4] - 0.30, s * 1.08, ZW + 0.05], [XW[4] - 0.55, s * 1.08, 1.20], 0.05, 0.05, 8);
    }
  }

  /* road wheel (P1, P3): twin discs with the rubber tyre band, the dished face with six large
     dark holes between the ribs, and the hub cap */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.10, 0.105, 0.09];
  function addWheel(W, V) {
    var s, y, i, a, c = V.paint.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.14, gg * 1.14, bb * 1.14];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.255, y - 0.15, 0, RW, 20);
      cylY(W, 0, y + 0.15, y + 0.255, 0, RW, 20);
      W.col = BODY;
      cylY(W, 0, y - 0.15, y + 0.15, 0, 0.33, 18);
      cyl(W, [0, y + s * 0.255, 0], [0, y + s * 0.275, 0], 0.335, 0.17, 20);
      cylY(W, 0, y + s * 0.27, y + s * 0.30, 0, 0.11, 10);
      W.col = HOLE;
      for (i = 0; i < 6; i++) {
        a = (i + 0.5) / 6 * TAU;
        slab(W, [Math.cos(a) * 0.235, y + s * 0.264, Math.sin(a) * 0.235], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.055, 0.012, 0.065);
      }
      W.col = TYRE;
      cylY(W, 0, y + s * 0.295, y + s * 0.315, 0, 0.05, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* the cast egg (P1, P2, P6): rings of the profile table PROF (radius factor, height);
     plan radii AF forward, AR aft, AY across as a superellipse; a high front and a flat
     roof, the rear overhang sloping away longer and lower (D1 side outline, P1). 2.86 m
     long, 2.42 m wide, 0.97 m tall over the ring (published 2.395 m to the roof). */
  var DOME = { AF: 1.36, AR: 1.50, AY: 1.21, H: 0.97, drop: 0.02, rdrop: 0.10 };
  var PROF = [[1.00, 0.00], [1.012, 0.09], [1.00, 0.23], [0.965, 0.375], [0.90, 0.52],
              [0.79, 0.67], [0.62, 0.795], [0.38, 0.90], [0.0, 0.97]];
  var DP = 2 / 2.3;
  function domeAt(a, rf, hz) {
    var D = DOME, c = Math.cos(a), s = Math.sin(a), cf = Math.max(c, 0), cr = Math.max(-c, 0);
    var sx = (c >= 0 ? D.AF : D.AR) * rf * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), DP);
    var sy = D.AY * rf * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), DP);
    return [sx, sy, hz * (1 - D.drop * cf * cf - D.rdrop * cr * cr)];
  }
  function addDome(B) {
    var NS = 48, G = [], rI, j, V = [], Nacc = [], tris = [], ctr = [0, 0, 0.05];
    for (rI = 0; rI < PROF.length; rI++) {
      G.push([]);
      for (j = 0; j < NS; j++) { G[rI].push(V.length); V.push(domeAt(j / NS * TAU, PROF[rI][0], PROF[rI][1])); Nacc.push([0, 0, 0]); }
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
    /* the turret ring's cast skirt down onto the deck */
    cylZ(B.paint, 0, 0, -0.04, 0.02, 1.16, 36);
  }
  /* a point on the dome at plan angle a and height hz (0..H), pushed out along the radius by dr */
  function onDome(a, hz, dr) {
    var lo = 0, hi = PROF.length - 1, k, P, l, u;
    for (k = 0; k + 1 < PROF.length; k++) if (hz >= PROF[k][1] && hz <= PROF[k + 1][1]) { lo = k; hi = k + 1; break; }
    u = (hz - PROF[lo][1]) / ((PROF[hi][1] - PROF[lo][1]) || 1);
    P = domeAt(a, PROF[lo][0] + (PROF[hi][0] - PROF[lo][0]) * u, hz);
    l = Math.sqrt(P[0] * P[0] + P[1] * P[1]) || 1;
    return [P[0] + P[0] / l * dr, P[1] + P[1] / l * dr, P[2]];
  }
  /* the height of the dome surface over a roof point (x, y), by bisection on the rings */
  function roofZ(x, y) {
    var a = Math.atan2(y, x), r = Math.sqrt(x * x + y * y), k, P, Q, rp, rq;
    for (k = PROF.length - 1; k > 0; k--) {
      P = domeAt(a, PROF[k][0], PROF[k][1]); Q = domeAt(a, PROF[k - 1][0], PROF[k - 1][1]);
      rp = Math.sqrt(P[0] * P[0] + P[1] * P[1]); rq = Math.sqrt(Q[0] * Q[0] + Q[1] * Q[1]);
      if (r >= rp && r <= rq) return P[2] + (Q[2] - P[2]) * (r - rp) / ((rq - rp) || 1);
    }
    return PROF[PROF.length - 1][1];
  }

  function addGun(B, GZ) {
    var M = MUZ, x0 = DOME.AF - 0.10;
    /* the cast mantlet boss and the dust cover over the gun slot (P2) */
    cylX(B.paint, x0 - 0.25, x0 + 0.10, 0, GZ, 0.36, 0.28, 20);
    cylX(B.dark, x0 + 0.08, x0 + 0.30, 0, GZ, 0.22, 0.155, 16);
    /* the tube: thick at the breech end, the bore evacuator (P1, P3: from about 1.5 to 2.6 m
       back from the muzzle), then the thin chase to a plain muzzle - no brake */
    cylX(B.paint, x0 + 0.28, M - 2.62, 0, GZ, 0.115, 0.098, 18);
    cylX(B.paint, M - 2.62, M - 2.50, 0, GZ, 0.098, 0.130, 18);
    cylX(B.paint, M - 2.50, M - 1.62, 0, GZ, 0.130, 0.130, 18);
    cylX(B.dark, M - 2.40, M - 2.36, 0, GZ, 0.134, 0.134, 16);
    cylX(B.dark, M - 1.76, M - 1.72, 0, GZ, 0.134, 0.134, 16);
    cylX(B.paint, M - 1.62, M - 1.50, 0, GZ, 0.130, 0.088, 18);
    cylX(B.paint, M - 1.50, M, 0, GZ, 0.088, 0.078, 16);
    cylX(B.dark, M - 0.06, M + 0.005, 0, GZ, 0.082, 0.082, 16);
    /* coaxial PKT port right of the gun, and the gunner's sight port left of it (P2) */
    cylX(B.dark, x0 - 0.10, x0 + 0.12, -0.32, GZ - 0.04, 0.025, 0.025, 8);
    cylX(B.dark, x0 - 0.12, x0 + 0.06, 0.40, GZ + 0.10, 0.06, 0.06, 12);
  }

  function addTurret(B) {
    var D = DOME, H = D.H, GZ = 0.38, s, i, a, P, Q, x, y, z;
    addDome(B);
    addGun(B, GZ);
    /* the L-2 "Luna" IR searchlight right of the gun on its bracket, linked to the mantlet
       (P2): a big round lamp, lens forward */
    x = 0.98; y = -0.56; z = roofZ(x, y);
    box(B.dark, x - 0.12, x + 0.12, y - 0.06, y + 0.06, z - 0.06, z + 0.10);
    box(B.dark, x - 0.06, x + 0.06, y - 0.16, y + 0.16, z + 0.08, z + 0.12);
    cylX(B.paint, x - 0.18, x + 0.18, y, z + 0.30, 0.20, 0.20, 22);
    cylX(B.paint, x - 0.26, x - 0.18, y, z + 0.30, 0.15, 0.20, 18);
    cylX(B.dark, x + 0.18, x + 0.20, y, z + 0.30, 0.175, 0.175, 22);
    cyl(B.dark, [x + 0.05, y + 0.16, z + 0.12], [D.AF + 0.08, -0.20, GZ + 0.18], 0.02, 0.02, 6);
    /* commander's cupola on the left (P2, P6): the ring with its periscopes, the hatch, the
       sight head forward and the small OU-3 searchlight in front of it */
    var CX = 0.05, CY = 0.50, CZ = roofZ(CX, CY);
    cylZ(B.paint, CX, CY, CZ - 0.08, CZ + 0.08, 0.33, 22);
    for (i = 0; i < 4; i++) {
      a = (i - 1.5) * 0.45;
      box(B.dark, CX + Math.cos(a) * 0.30 - 0.04, CX + Math.cos(a) * 0.30 + 0.04,
          CY + Math.sin(a) * 0.30 - 0.04, CY + Math.sin(a) * 0.30 + 0.04, CZ + 0.02, CZ + 0.09);
    }
    cylZ(B.paint, CX, CY, CZ + 0.08, CZ + 0.13, 0.28, 18);
    box(B.paint, CX + 0.16, CX + 0.34, CY - 0.09, CY + 0.09, CZ + 0.06, CZ + 0.17);
    box(B.dark, CX + 0.34, CX + 0.36, CY - 0.07, CY + 0.07, CZ + 0.09, CZ + 0.15);
    box(B.dark, CX + 0.36, CX + 0.42, CY + 0.10, CY + 0.14, CZ + 0.02, CZ + 0.14);
    cylX(B.paint, CX + 0.34, CX + 0.46, CY + 0.12, CZ + 0.19, 0.065, 0.065, 14);
    cylX(B.dark, CX + 0.46, CX + 0.475, CY + 0.12, CZ + 0.19, 0.055, 0.055, 14);
    box(B.dark, CX - 0.12, CX + 0.02, CY - 0.05, CY + 0.05, CZ + 0.13, CZ + 0.17);
    /* gunner's periscope hood on the left front of the roof, ahead of the cupola */
    x = 0.62; y = 0.44; z = roofZ(x, y);
    box(B.paint, x - 0.14, x + 0.14, y - 0.12, y + 0.12, z - 0.04, z + 0.12);
    box(B.dark, x + 0.14, x + 0.16, y - 0.09, y + 0.09, z + 0.02, z + 0.10);
    /* loader's round hatch, right and further back (P5, P6): a low domed cover on its ring */
    x = -0.35; y = -0.50; z = roofZ(x, y);
    cylZ(B.paint, x, y, z - 0.06, z + 0.04, 0.32, 22);
    cyl(B.paint, [x, y, z + 0.04], [x, y, z + 0.09], 0.30, 0.20, 20);
    box(B.dark, x - 0.06, x + 0.06, y - 0.36, y - 0.30, z - 0.02, z + 0.06);
    box(B.dark, x + 0.18, x + 0.26, y - 0.04, y + 0.04, z + 0.04, z + 0.10);
    /* the ventilator dome and the spent-case ejection hatch on the rear slope (en.wikipedia:
       the blower to the left of the port) */
    x = -1.05; y = 0.36; z = roofZ(x, y);
    cylZ(B.paint, x, y, z - 0.05, z + 0.08, 0.15, 14);
    cyl(B.paint, [x, y, z + 0.08], [x, y, z + 0.12], 0.15, 0.06, 14);
    P = onDome(Math.PI - 0.08, 0.66, 0.0);
    var eu = unit([-0.62, 0, 0.78]), ew = unit([-0.78, 0, -0.62]);
    slab(B.paint, [P[0] + 0.03, P[1], P[2]], eu, [0, 1, 0], ew, 0.15, 0.20, 0.03);
    slab(B.dark, [P[0] + 0.03 + ew[0] * 0.03, P[1], P[2] + ew[2] * 0.03], eu, [0, 1, 0], ew, 0.012, 0.16, 0.012);
    box(B.dark, P[0] - 0.02, P[0] + 0.06, P[1] - 0.24, P[1] - 0.20, P[2] - 0.04, P[2] + 0.05);
    /* the curved handrails, two on each side (P1, P2, P6), on stand-offs */
    for (s = -1; s <= 1; s += 2) {
      var RAILS = [[0.55, 1.35, 0.45], [1.70, 2.45, 0.50]];
      for (i = 0; i < RAILS.length; i++) {
        var a0 = RAILS[i][0], a1 = RAILS[i][1], hz = RAILS[i][2], NSG = 6, prev = null;
        for (var k = 0; k <= NSG; k++) {
          a = s * (a0 + (a1 - a0) * k / NSG);
          Q = onDome(a, hz, 0.07);
          if (prev) cyl(B.dark, prev, Q, 0.018, 0.018, 5, true);
          prev = Q;
        }
        [a0, a1].forEach(function (aa) {
          var o = onDome(s * aa, hz, 0.07), w = onDome(s * aa, hz, -0.02);
          cyl(B.dark, w, o, 0.016, 0.016, 5, true);
        });
      }
    }
    /* the thin snorkel tube stowed across the turret rear on two brackets, its cap on the
       port end (P1, P6, D1) */
    var sx = -1.52, sz = 0.36;
    cylY(B.paint, sx, -0.85, 0.80, sz, 0.09, 14);
    cylY(B.paint, sx, 0.80, 0.92, sz, 0.115, 14);
    cylY(B.dark, sx, 0.92, 0.94, sz, 0.09, 12);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, sx - 0.02, -1.36, s * 0.55 - 0.03, s * 0.55 + 0.03, sz - 0.10, sz - 0.04);
      box(B.dark, sx - 0.11, sx + 0.11, s * 0.55 - 0.03, s * 0.55 + 0.03, sz - 0.04, sz + 0.10);
    }
    /* antenna base, left rear (P2) */
    cylZ(B.dark, -0.70, 0.78, roofZ(-0.70, 0.78) - 0.05, roofZ(-0.70, 0.78) + 0.12, 0.05, 8);
    /* lifting eyes on the roof */
    for (s = -1; s <= 1; s += 2) box(B.dark, 0.30, 0.40, s * 0.95 - 0.02, s * 0.95 + 0.02, roofZ(0.35, s * 0.95) - 0.02, roofZ(0.35, s * 0.95) + 0.07);
    /* team colour: a modest strip on the roof behind the cupola */
    box(B.team, -0.80, -0.30, 0.05, 0.25, roofZ(-0.55, 0.15) - 0.02, roofZ(-0.55, 0.15) + 0.02);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.A, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), i, wg, WB, tg, TB = bins(T);
    addHull(HB);
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
    addTurret(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, RING);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

/* len: the measured X extent (models3d convention): 9.95 m, the published 9.335 m gun forward plus
   hung on the rear plate */
UNIT_MODELS["pact_e60_mbt"] = {
  len: 9.95,
  build: function (THREE, M, C) { return HeroT62.build(THREE, M, C, "A"); }
};
