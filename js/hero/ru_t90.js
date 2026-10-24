/* ========== ru_t90.js - HERO models: the T-90 family ======================
   pact_e90_mbt   T-90 (Object 188, 1992)    cast turret, Kontakt-5, Shtora-1
   pact_e00_mbt   T-90A (2004)               welded turret, Kontakt-5 wedges, Shtora-1
   mbt_p          T-90M Proryv (2020)        new welded turret, Relikt, bustle box, remote MG
   One builder, a VARIANTS table. The hull is the T-72B hull of the T-90 (lofted from
   the station table HS below); each row draws its own turret and fittings.

   REDO 2026-10-24 (full-quality procedure). References, Wikimedia Commons, width 960,
   cached in scratchpad/q_t90_ref:
     D1  "T-90 tank.svg" - coloured side drawing (a late T-90 with the welded turret):
         the hull profile, glacis and nose heights, road-wheel pitch, the raised idler
         and sprocket, gun length forward of the hull. Scale from the 750 mm road wheel.
     P1  "T-90 main battle tank (2).jpg" - T-90 (1992, cast turret), starboard 3/4.
     P2  "T-90A - TankBiathlon2013-12.jpg" - T-90A, front-left 3/4 from above.
     P3  "Moscow 2012 Victory Day Parade Rehearsal, T-90 Tank, Russia.jpg" - T-90A,
         port side (skirt panel layout, wheel pitch, fender height to turret roof).
     P4  "T-90A front Army-2016.jpg" - T-90A from dead ahead (Shtora housing position
         and shape, gunner's sight, the bolted glacis cover plates, tow hooks).
     P5  "T-90M.jpg" - T-90M, front-left 3/4.
     P6  "T-90M MBT Army-2022 2022-08-20 2397.jpg" - T-90M, port side 3/4 (Relikt skirt
         boxes, rear slat grille, drums, bustle, sights, long fender tube).
     P7  "T-90M MBT Army-2022 2022-08-20 2610.jpg" - T-90M turret close-up (Relikt
         front plates, side band, the six-tube grenade clusters, remote MG, sight mast).
   Published figures (en/ru Wikipedia T-90): hull length 6.86 m, length gun forward
   9.53 m (T-90) / 9.63 m, width 3.78 m over the side screens, height 2.23 m to the
   turret roof, ground clearance 0.47 m, six 750 mm road wheels and three return rollers
   a side, track 580 mm. These are kept from the old header; the references agree.

   CORRECTIONS against the previous model (the references do not support it):
   - road-wheel pitch 0.775 m -> 0.85 m (D1: pitch / wheel diameter = 1.13; gives a
     4.25 m wheel span to the published 4.28 m track on ground);
   - idler and sprocket were drawn at road-wheel height; D1 and P3 show both RAISED
     (centres about 0.7 m up), so the track climbs to them at each end;
   - hull deck 1.24 m -> 1.42 m and gun axis 1.63 m -> 1.82 m (D1 and P3 ratios to the
     2.2 m turret roof);
   - "plain glacis": P4 shows the glacis covered by a bolted Kontakt-5 package with a
     notch for the driver's vision block; all three rows now carry it (P1, P2, P5 agree);
   - the T-90A Shtora housings sit at the OUTER front corners (P4: about 0.85 m each
     side of the gun), not beside the mantlet; on the cast T-90 they do sit beside the
     mantlet (P1);
   - T-90M side screens: five Relikt boxes forward, then a slat grille over the rear half
     of the hull side (P6), not four tiles and rubber.

   Recognition list (what makes each one read at game zoom, and its source):
     1. six big road wheels, wide pitch, raised idler (front) and sprocket (rear) - D1, P3
     2. low hull, steep long glacis rising to a flat deck level with the fenders - D1
     3. bolted ERA package on the glacis, dozer blade on the lower glacis - P4
     4. side screens hung from the fender edge down to the wheel tops - P1, P3, P6
     5. long 125 mm gun with thermal sleeve bands and a bore evacuator - D1, P1
     6. T-90: low cast dome, Kontakt-5 "brow" over each cheek, Shtora boxes beside the
        mantlet, cupola with AA gun on the right - P1
     7. T-90A: angular welded turret, flat sloped Kontakt-5 wedges, Shtora boxes high on
        the outer front corners, gunner's sight box left of the gun - P2, P4
     8. T-90A and T-90M: two fuel drums across the rear deck - P2, P6
     9. T-90M: long flat Relikt arrowhead over the front, Relikt band down each side,
        deep bustle box with a slat grille behind - P5, P6, P7
    10. T-90M roof: gunner's sight left, commander's sight and remote 12.7 mm right,
        six-tube grenade clusters, thin sensor mast - P6, P7
    11. T-90M hull: five Relikt skirt boxes then the rear slat grille; long tube on the
        left fender; slat screen over the stern - P5, P6
   Paint (sampled, then taken to about 0.75 of level for the ACES pass): T-90 1992
   olive #807356 in hazy sun -> #5c5640; T-90A grey-green #7e8a7e lit (P4) -> #5c645b;
   T-90M olive #5e6554 diffuse (P6) / #595d4d (P5) -> #525a45. No numbers, flags or
   markings (P1 to P3 carry parade numbers and flags: not drawn).
   NOT CONFIRMED, drawn as judgement calls: ERA brick counts (texture only); the T-90's
   skirt panels after the first; the exact smoke-tube count per side on the T-90A (two
   rows of three, P2 shows four of them); the T-90M's soft net screens over the turret
   sides (P6, P7) are NOT drawn (too fine to read, and fitted unevenly). Wartime kit
   (cope cages, markings, numbers) is NOT drawn.

   Materials: PAINT (canvas texture: base, mottling, weld seams, bolt rows), DARK (track,
   fittings, sights, slats), RUBBER (plain skirt plates), ERA (canvas texture of bolted
   cover plates, metre UVs), WHEEL (tyres, discs and recesses by vertex colour) and the
   team colour exactly as handed in (C.team): three small strips (rear deck, left rear
   fender box, turret roof), 0.25 m wide and 0.8-0.9 m long, 2 cm above the surface.
   Nodes: "turret" (trains, origin on the ring centre, gun along +X), six "roadwheel"
   groups (axle along local Y, each holding both sides).
   Draw calls: hull 5 + turret 5 + 6 wheels = 16 at most.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */


if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroT90 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------- variant table */
  var VARIANTS = {
    t90:  { paint: { base: "#565a3f", blots: ["#4d5137", "#5f6347"], seed: 90 }, era: "#53573c",
            TX: 0.15, shape: "cast", roof: 0.74,
            shtora: "mantlet", smoke: "castRows", aaMg: true, rws: false,
            skirts: "t90", drumsDeck: 0, slats: false, tank: true, fenderTube: false },
    t90a: { paint: { base: "#5c645b", blots: ["#535b52", "#656d63"], seed: 904 }, era: "#59615a",
            TX: 0.15, shape: "welded", roof: 0.74,
            shtora: "corner", smoke: "cluster", aaMg: true, rws: false,
            skirts: "a", drumsDeck: 2, slats: false, tank: false, fenderTube: false },
    t90m: { paint: { base: "#525a45", blots: ["#49513d", "#5b634d"], seed: 920 }, era: "#4f5742",
            TX: 0.15, shape: "m", roof: 0.82,
            shtora: null, smoke: "m", aaMg: false, rws: true,
            skirts: "m", drumsDeck: 2, slats: true, tank: false, fenderTube: true }
  };

  /* running gear (D1, P3): pitch 0.85 m, 750 mm wheels, idler and sprocket raised */
  var TY = 1.395, TW = 0.29;
  var XW = [2.19, 1.34, 0.49, -0.36, -1.21, -2.06], ZW = 0.455, RW = 0.375;
  var XR = [1.76, 0.07, -1.64], ZR = 0.90, RR = 0.085;
  var IDL = { x: 2.96, z: 0.70, r: 0.30 }, SPR = { x: -2.88, z: 0.72, r: 0.33 };
  var DECK = 1.48, RING = 1.48, FW = 1.74;              /* deck, ring, fender edge half width */

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
  /* hull and turret paint: one tile is 1 / 0.34 = 2.9 m. Base, soft mottling, weld seams and
     bolt rows at plate edges, rain and exhaust grime (photographs P2, P4, P6) */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "p" + P.base + P.seed, 512, function (q, S) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 14; i++) { q.globalAlpha = 0.35 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 6; i++) {                 /* weld seams / plate joints */
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
  /* ERA cover plates: one tile is 1 m (us 1.0); 4 x 4 plates of 0.25 m, each with an edge
     shadow and four bolt heads (P4 glacis, P7 Relikt plates) */
  function eraTex(THREE, base) {
    return canvasTex(THREE, "e" + base, 128, function (q, S) {
      var i, j, c = S / 4;
      q.fillStyle = base; q.fillRect(0, 0, S, S);
      for (i = 0; i < 4; i++) for (j = 0; j < 4; j++) {
        q.fillStyle = "rgba(12,12,8,0.55)"; q.fillRect(i * c, j * c, c, 2); q.fillRect(i * c, j * c, 2, c);
        q.fillStyle = "rgba(230,230,210,0.12)"; q.fillRect(i * c + 2, j * c + 2, c - 4, 1);
        q.fillStyle = "rgba(15,15,10,0.6)";
        q.fillRect(i * c + 5, j * c + 5, 3, 3); q.fillRect(i * c + c - 8, j * c + 5, 3, 3);
        q.fillRect(i * c + 5, j * c + c - 8, 3, 3); q.fillRect(i * c + c - 8, j * c + c - 8, 3, 3);
      }
    });
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint), te = eraTex(THREE, V.era);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.rubber = new THREE.MeshStandardMaterial({ color: 0x33362f, roughness: 0.95, metalness: 0.0 });
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

  /* ---------------------------------------------------------------- hull */
  /* station table, measured off D1 (scale from the 750 mm wheel, heights checked against P3):
     x, belly half width, belly z, side half width, roof z.  Rear plate leaning in at the
     bottom; flat deck at 1.42 m; the upper glacis falls at about 19 deg to the nose at 1.0 m;
     the lower glacis runs back down to the belly by x = 2.65. */
  var HS = [
    [-3.43, 0.98, 0.76, 1.04, 1.37],
    [-3.415, 1.01, 0.64, 1.07, 1.43],
    [-3.38, 1.03, 0.55, 1.09, 1.465],
    [-3.30, 1.04, 0.49, 1.10, 1.48],
    [-2.80, 1.05, 0.47, 1.10, 1.48],
    [-2.00, 1.05, 0.47, 1.10, 1.48],
    [-1.20, 1.05, 0.47, 1.10, 1.48],
    [-0.40, 1.05, 0.47, 1.10, 1.48],
    [ 0.40, 1.05, 0.47, 1.10, 1.48],
    [ 1.20, 1.05, 0.47, 1.10, 1.48],
    [ 2.15, 1.05, 0.47, 1.10, 1.48],
    [ 2.40, 1.05, 0.47, 1.10, 1.385],
    [ 2.65, 1.05, 0.475, 1.10, 1.29],
    [ 2.90, 1.04, 0.52, 1.10, 1.195],
    [ 3.10, 1.02, 0.61, 1.09, 1.119],
    [ 3.25, 1.00, 0.72, 1.08, 1.062],
    [ 3.36, 0.98, 0.84, 1.07, 1.02],
    [ 3.43, 0.96, 0.93, 1.06, 0.994]
  ];
  function glacisZ(x) { return x <= 2.15 ? DECK : DECK - 0.38 * (x - 2.15); }
  function hullRing(S) {
    var x = S[0], wb = S[1], zB = S[2], ws = S[3], zT = S[4], e = Math.min(0.03, (zT - zB) / 4);
    return [[x, wb, zB], [x, ws, Math.min(zB + 0.10, zT - 2 * e)], [x, ws, zT - e], [x, ws - e, zT],
            [x, -(ws - e), zT], [x, -ws, zT - e], [x, -ws, Math.min(zB + 0.10, zT - 2 * e)], [x, -wb, zB]];
  }
  function addHull(B, V) {
    var R = HS.map(hullRing), i, k, k1, a, b, c, d, e, dy, dz, p, s, n = R[0].length;
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
      var yi = p * 1.08, yo = p * FW, ylo = Math.min(yi, yo), yhi = Math.max(yi, yo);
      /* fender shelf level with the deck, its rolled outer lip */
      box(B.paint, -3.40, 2.30, ylo, yhi, DECK - 0.035, DECK);
      box(B.paint, -3.40, 2.30, p > 0 ? FW - 0.03 : -FW, p > 0 ? FW : -FW + 0.03, DECK - 0.09, DECK + 0.02);
      /* the wide front mudguard falling to the nose over the idler (D1, P2) */
      belt(B.paint, 2.30, DECK - 0.02, 2.95, 1.29, ylo, yhi, 0.04);
      belt(B.paint, 2.95, 1.29, 3.40, 1.04, ylo + (p > 0 ? 0.04 : 0), yhi - (p > 0 ? 0 : 0.04), 0.04);
      belt(B.paint, 3.40, 1.04, 3.50, 0.92, ylo + (p > 0 ? 0.08 : 0), yhi - (p > 0 ? 0 : 0.08), 0.04);
      /* rear fender end and mud flap */
      box(B.paint, -3.46, -3.40, p > 0 ? 1.10 : -FW, p > 0 ? FW : -1.10, 1.02, DECK + 0.02);
      /* inner track guard under the shelf */
      box(B.dark, -3.0, 2.25, p > 0 ? 1.08 : -1.12, p > 0 ? 1.12 : -1.08, 1.05, DECK - 0.04);
    }

    /* --- side screens hung from the fender edge to the wheel tops ------- */
    var ZS0 = 0.84, ZS1 = DECK + 0.01, sx, th, yy;
    if (V.skirts === "m") {
      /* T-90M (P6): five Relikt boxes forward, their lower faces cut back; then a slat grille
         over the rear half of the side with a stowage box above it */
      for (p = -1; p <= 1; p += 2) {
        for (i = 0; i < 5; i++) {
          var xa = 2.38 - i * 0.54, xb = xa - 0.52, yo2 = p * (FW + 0.14), yi2 = p * FW;
          loftN(B.era, [
            [[xa, yi2, ZS0 - 0.08], [xb, yi2, ZS0 - 0.08], [xb, yo2, ZS0 + 0.04], [xa, yo2, ZS0 + 0.04]],
            [[xa, yi2, ZS1], [xb, yi2, ZS1], [xb, yo2, ZS1], [xa, yo2, ZS1]]]);
          box(B.dark, xb - 0.01, xb + 0.01, p > 0 ? FW : -FW - 0.15, p > 0 ? FW + 0.15 : -FW, ZS0 + 0.12, ZS1);
        }
        /* slat grille: frame plus vertical slats, then two horizontal bars */
        var g0 = -0.32, g1 = -2.95, yg = p * (FW + 0.10);
        box(B.dark, g1, g0, yg - 0.015, yg + 0.015, ZS1 - 0.04, ZS1);
        box(B.dark, g1, g0, yg - 0.015, yg + 0.015, ZS0, ZS0 + 0.04);
        box(B.dark, g1, g0, yg - 0.012, yg + 0.012, (ZS0 + ZS1) / 2 - 0.015, (ZS0 + ZS1) / 2 + 0.015);
        for (sx = g1; sx <= g0 + 1e-6; sx += 0.11) box(B.dark, sx - 0.012, sx + 0.012, yg - 0.02, yg + 0.02, ZS0, ZS1);
        for (sx = g1 + 0.4; sx < g0; sx += 0.9) box(B.dark, sx - 0.02, sx + 0.02, p > 0 ? FW : yg, p > 0 ? yg : -FW, ZS1 - 0.06, ZS1);
        /* stowage box carried on the grille (P6) */
        box(B.paint, -1.55, -0.85, p > 0 ? FW - 0.06 : -FW - 0.14, p > 0 ? FW + 0.14 : -FW + 0.06, DECK - 0.36, DECK - 0.12);
      }
    } else {
      /* T-90: one thick panel then plain plates (P1); T-90A: three thick panels then plain (P3) */
      var thick = V.skirts === "a" ? [[2.40, 1.72], [1.70, 1.02], [1.00, 0.34]] : [[2.40, 0.92]];
      var plain = V.skirts === "a" ? [[0.32, -0.80], [-0.82, -1.95], [-1.97, -3.10]] : [[0.90, -0.20], [-0.22, -1.32], [-1.34, -2.30], [-2.32, -3.10]];
      for (p = -1; p <= 1; p += 2) {
        for (i = 0; i < thick.length; i++) {
          th = 0.045; yy = p * (FW + 0.09);
          box(B.paint, thick[i][1], thick[i][0], yy - th, yy + th, ZS0, ZS1);
          box(B.paint, thick[i][1] + 0.02, thick[i][0] - 0.02, yy + p * th, yy + p * (th + 0.012), ZS1 - 0.10, ZS1 - 0.06);
          box(B.dark, thick[i][1] + 0.06, thick[i][1] + 0.12, p > 0 ? FW : yy - th, p > 0 ? yy - th : -FW, ZS1 - 0.08, ZS1 - 0.02);
        }
        for (i = 0; i < plain.length; i++) {
          yy = p * (FW + 0.02);
          box(B.rubber, plain[i][1], plain[i][0], yy - 0.016, yy + 0.016, ZS0 + 0.02, ZS1);
          box(B.dark, plain[i][1] + 0.02, plain[i][1] + 0.05, yy + p * 0.016 - 0.008, yy + p * 0.016 + 0.008, ZS0 + 0.06, ZS1);
          box(B.dark, plain[i][0] - 0.05, plain[i][0] - 0.02, yy + p * 0.016 - 0.008, yy + p * 0.016 + 0.008, ZS0 + 0.06, ZS1);
        }
      }
    }

    /* --- glacis: the bolted Kontakt-5 / Relikt package (P4), a notch at the top centre for the
       driver's vision block, and the dozer blade folded on the lower glacis ------- */
    var ang = Math.atan(0.38), u = [Math.cos(ang), 0, -Math.sin(ang)], w = [Math.sin(ang), 0, Math.cos(ang)];
    for (s = -1; s <= 1; s += 2) {
      slab(B.era, [2.84, s * 0.57, glacisZ(2.84) + 0.055], u, [0, 1, 0], w, 0.52, 0.42, 0.055);
      slab(B.era, [2.31, s * 0.62, glacisZ(2.31) + 0.045], u, [0, 1, 0], w, 0.10, 0.37, 0.045);
    }
    slab(B.era, [2.98, 0, glacisZ(2.98) + 0.055], u, [0, 1, 0], w, 0.38, 0.16, 0.055);
    /* driver's hatch behind the glacis, periscope in the notch */
    cylZ(B.paint, 1.92, 0.0, DECK, DECK + 0.07, 0.24, 16);
    cylZ(B.dark, 1.92, 0.0, DECK + 0.07, DECK + 0.09, 0.19, 12);
    slab(B.dark, [2.30, 0, glacisZ(2.30) + 0.05], u, [0, 1, 0], w, 0.06, 0.12, 0.04);
    /* lower glacis: dozer blade and tow hooks (P4) */
    var la = Math.atan2(3.36 - 2.90, 0.84 - 0.52), lu = [Math.sin(la), 0, Math.cos(la)], lw = [Math.cos(la), 0, -Math.sin(la)];
    slab(B.paint, [3.16, 0, 0.70], lu, [0, 1, 0], lw, 0.20, 0.98, 0.03);
    for (i = -3; i <= 3; i++) slab(B.dark, [3.18, i * 0.30, 0.71], lu, [0, 1, 0], lw, 0.17, 0.02, 0.045);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 3.38, 3.50, s * 0.60 - 0.06, s * 0.60 + 0.06, 0.86, 0.98);
      /* headlight guards and lamps on the glacis corners (P4) */
      cyl(B.dark, [2.55, s * 0.96, 1.36], [2.66, s * 0.96, 1.35], 0.075, 0.075, 10);
      box(B.paint, 2.45, 2.52, s * 0.96 - 0.10, s * 0.96 + 0.10, 1.31, 1.46);
    }
    /* tow cables along the glacis edges */
    cyl(B.dark, [2.30, 1.02, DECK + 0.03], [3.30, 1.02, 1.07 + 0.01], 0.025, 0.025, 6);
    cyl(B.dark, [2.30, -1.02, DECK + 0.03], [3.30, -1.02, 1.07 + 0.01], 0.025, 0.025, 6);

    /* --- fender stowage: tool boxes left, the fuel cells on the right front fender ------ */
    box(B.paint, -0.30, 0.85, 1.36, 1.64, DECK, DECK + 0.15);
    box(B.dark, 0.0, 0.06, 1.35, 1.65, DECK + 0.15, DECK + 0.17);
    box(B.paint, -2.45, -1.55, 1.40, 1.64, DECK, DECK + 0.17);
    box(B.paint, 1.00, 1.75, -1.64, -1.36, DECK, DECK + 0.20);
    box(B.paint, 0.10, 0.90, -1.64, -1.36, DECK, DECK + 0.20);
    box(B.dark, 0.92, 0.98, -1.64, -1.36, DECK, DECK + 0.20);
    if (V.tank) {
      /* T-90 (P1): a long tank on the right rear fender and no drums */
      box(B.paint, -2.55, -1.45, -1.64, -1.40, DECK, DECK + 0.20);
      box(B.dark, -2.50, -2.44, -1.64, -1.40, DECK + 0.20, DECK + 0.22);
    }
    if (V.fenderTube) {
      /* T-90M (P6): the long tube carried on the left fender */
      cylX(B.paint, -0.40, 2.30, 1.50, DECK + 0.15, 0.14, 0.14, 16);
      cylX(B.dark, -0.45, -0.40, 1.50, DECK + 0.15, 0.145, 0.145, 16);
      cylX(B.dark, 2.30, 2.35, 1.50, DECK + 0.15, 0.145, 0.145, 16);
      box(B.dark, 0.20, 0.26, 1.36, 1.64, DECK, DECK + 0.05);
      box(B.dark, 1.40, 1.46, 1.36, 1.64, DECK, DECK + 0.05);
    }

    /* --- engine deck: radiator grilles across the rear, access plates, exhaust on the left ---- */
    box(B.dark, -3.32, -2.25, -0.90, 0.90, DECK - 0.01, DECK + 0.015);
    for (i = 0; i < 8; i++) box(B.paint, -3.29 + i * 0.13, -3.24 + i * 0.13, -0.88, 0.88, DECK + 0.015, DECK + 0.04);
    box(B.paint, -2.15, -1.30, -0.62, 0.62, DECK, DECK + 0.04);
    box(B.paint, -2.10, -1.35, -0.95, -0.70, DECK, DECK + 0.03);
    box(B.dark, -2.40, -1.95, 1.10, 1.14, 1.18, 1.36);
    box(B.team, -2.10, -1.30, -0.125, 0.125, DECK + 0.04, DECK + 0.06);
    box(B.team, -2.45, -1.55, 1.40, 1.64, DECK + 0.17, DECK + 0.19);
    /* stern: tow hooks */
    box(B.dark, -3.52, -3.43, 0.66, 0.82, 0.62, 0.74);
    box(B.dark, -3.52, -3.43, -0.82, -0.66, 0.62, 0.74);
    /* two fuel drums across the rear deck (P2, P6) */
    for (i = 0; i < V.drumsDeck; i++) {
      var dy = i ? -0.47 : 0.47, dxr = -3.20, dzr = DECK + 0.25;
      cylY(B.paint, dxr, dy - 0.44, dy + 0.44, dzr, 0.29, 18);
      cylY(B.dark, dxr, dy - 0.45, dy - 0.40, dzr, 0.295, 18);
      cylY(B.dark, dxr, dy + 0.40, dy + 0.45, dzr, 0.295, 18);
      cylY(B.dark, dxr, dy - 0.15, dy - 0.12, dzr, 0.296, 18);
      cylY(B.dark, dxr, dy + 0.12, dy + 0.15, dzr, 0.296, 18);
      box(B.dark, dxr - 0.24, dxr + 0.24, dy - 0.30, dy - 0.26, DECK - 0.20, dzr - 0.18);
      box(B.dark, dxr - 0.24, dxr + 0.24, dy + 0.26, dy + 0.30, DECK - 0.20, dzr - 0.18);
    }
    if (V.slats) {
      /* T-90M: the slat screen across the stern (P5, P6) */
      box(B.dark, -3.55, -3.50, -1.10, 1.10, 1.30, 1.34);
      box(B.dark, -3.55, -3.50, -1.10, 1.10, 0.68, 0.72);
      for (i = 0; i <= 18; i++) box(B.dark, -3.56, -3.51, -1.10 + i * 0.122 - 0.012, -1.10 + i * 0.122 + 0.012, 0.70, 1.32);
      for (s = -1; s <= 1; s += 2) box(B.dark, -3.51, -3.43, s * 1.0 - 0.03, s * 1.0 + 0.03, 1.20, 1.26);
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
      /* sprocket (rear) with its teeth ring, idler (front), three return rollers */
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

  /* road wheel (P3): twin discs with the dark tyre band, the dished face with eight dark recesses
     between the ribs, and the hub cap */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.20, 0.21, 0.18];
  function addWheel(W, V) {
    var s, y, i, a, c = V.paint.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.14, gg * 1.14, bb * 1.14];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.255, y - 0.15, 0, RW, 18);
      cylY(W, 0, y + 0.15, y + 0.255, 0, RW, 18);
      W.col = BODY;
      cylY(W, 0, y - 0.15, y + 0.15, 0, 0.31, 18);
      cyl(W, [0, y + s * 0.255, 0], [0, y + s * 0.275, 0], 0.30, 0.16, 18);
      cylY(W, 0, y + s * 0.27, y + s * 0.30, 0, 0.11, 10);
      W.col = HOLE;
      for (i = 0; i < 8; i++) {
        a = (i + 0.5) / 8 * TAU;
        slab(W, [Math.cos(a) * 0.225, y + s * 0.262, Math.sin(a) * 0.225], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.045, 0.012, 0.05);
      }
      W.col = TYRE;
      cylY(W, 0, y + s * 0.295, y + s * 0.315, 0, 0.05, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* the cast T-72B / T-90 dome: rings of the profile table PROF (radius factor, height), plan
     radii AF forward, AR aft, AY across; the front bulges outward ("bul") and droops ("drop") */
  var PROF = [[1.00, 0.00], [1.02, 0.12], [1.00, 0.30], [0.93, 0.46], [0.80, 0.59],
              [0.58, 0.68], [0.32, 0.73], [0.0, 0.75]];
  function addDome(B, D, H) {
    var NS = 40, AF = D.AF, AR = D.AR, AY = D.AY, p = 2 / 2.4, hk = H / 0.75;
    var G = [], rI, j, c, s, sx, sy, pr, V = [], Nacc = [], tris = [], cf, ctr = [0, 0, 0.05];
    for (rI = 0; rI < PROF.length; rI++) {
      pr = PROF[rI]; G.push([]);
      for (j = 0; j < NS; j++) {
        c = Math.cos(j / NS * TAU); s = Math.sin(j / NS * TAU);
        cf = Math.max(c, 0);
        sx = (c >= 0 ? AF : AR) * pr[0] * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), p);
        sy = AY * pr[0] * (1 + D.bul * cf * cf) * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), p);
        G[rI].push(V.length); V.push([sx, sy, pr[1] * hk * (1 - D.drop * cf)]); Nacc.push([0, 0, 0]);
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

  /* the Shtora-1 dazzler housing (P1, P4): a box with the round lens in a square frame on the
     front, cooling louvres down the inboard face, a small sensor head on top */
  function shtora(B, xc, yc, z0, s) {
    box(B.paint, xc - 0.24, xc + 0.20, yc - 0.21, yc + 0.21, z0, z0 + 0.40);
    box(B.dark, xc + 0.20, xc + 0.23, yc - 0.17, yc + 0.17, z0 + 0.04, z0 + 0.36);
    cylX(B.dark, xc + 0.22, xc + 0.26, yc, z0 + 0.20, 0.14, 0.13, 16);
    var i;
    for (i = 0; i < 5; i++) box(B.dark, xc - 0.20 + i * 0.075, xc - 0.17 + i * 0.075, yc - s * 0.23, yc - s * 0.21, z0 + 0.06, z0 + 0.34);
    cylZ(B.dark, xc - 0.10, yc + s * 0.12, z0 + 0.40, z0 + 0.46, 0.035, 8);
  }
  /* the 125 mm 2A46M gun and mantlet; GZ is the axis height above the ring */
  var MUZ = 5.98;                                       /* muzzle, turret frame: 9.6 m overall (D1) */
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
      /* the 12.7 mm AA gun on its pedestal mount (P1, P2) */
      cylZ(B.dark, CX - 0.05, CY, RZ + 0.11, RZ + 0.26, 0.04, 8);
      box(B.dark, CX - 0.25, CX + 0.25, CY - 0.06, CY + 0.06, RZ + 0.24, RZ + 0.34);
      box(B.dark, CX - 0.22, CX + 0.08, CY + 0.06, CY + 0.18, RZ + 0.22, RZ + 0.36);
      cylX(B.dark, CX + 0.25, CX + 1.20, CY, RZ + 0.30, 0.022, 0.020, 8);
      cylX(B.dark, CX + 0.55, CX + 0.80, CY, RZ + 0.30, 0.034, 0.034, 8);
    }
  }

  function turretCast(V, B) {
    var RZ = V.roof, GZ = 0.33, s, i, x;
    addDome(B, { AF: 1.50, AR: 1.36, AY: 1.12, drop: -0.04, bul: 0.08 }, RZ);
    /* Kontakt-5 brow over each cheek (P1): a sloped-topped block from beside the Shtora box out
       to the cheek edge and back, and a rank of bricks over the roof behind the Shtora */
    for (s = -1; s <= 1; s += 2) {
      loftN(B.era, [
        mirrorY([[1.52, 0.80, 0.16], [1.12, 1.16, 0.16], [0.52, 1.18, 0.16], [0.70, 0.80, 0.16]], s),
        mirrorY([[1.52, 0.80, 0.40], [1.12, 1.16, 0.40], [0.52, 1.18, 0.52], [0.70, 0.80, 0.62]], s),
        mirrorY([[1.30, 0.80, 0.60], [1.00, 1.08, 0.60], [0.56, 1.10, 0.66], [0.68, 0.80, 0.70]], s)]);
      loftN(B.era, [
        mirrorY([[0.98, 0.40, 0.56], [0.98, 0.80, 0.56], [0.40, 0.80, 0.70], [0.40, 0.40, 0.70]], s),
        mirrorY([[0.92, 0.40, 0.70], [0.92, 0.80, 0.70], [0.40, 0.80, 0.80], [0.40, 0.40, 0.80]], s)]);
      /* Shtora housing beside the mantlet (P1) */
      shtora(B, 1.18, s * 0.60, 0.22, s);
      /* smoke dischargers: two rows of three on the rear half of each side (old header, P1) */
      for (i = 0; i < 6; i++) {
        x = -0.40 - (i % 3) * 0.11;
        cyl(B.dark, [x, s * 1.00, 0.36 + Math.floor(i / 3) * 0.11], [x + 0.14, s * 1.16, 0.40 + Math.floor(i / 3) * 0.11], 0.04, 0.04, 8);
      }
      box(B.dark, -0.72, -0.30, s * 1.02 - 0.05, s * 1.02 + 0.05, 0.28, 0.33);
    }
    addGun(B, GZ, 1.46, true);
    /* gunner's sight 1G46 box, left of the gun on the roof (P1) */
    box(B.paint, 0.30, 0.70, 0.30, 0.56, RZ - 0.10, RZ + 0.14);
    box(B.dark, 0.70, 0.73, 0.33, 0.53, RZ - 0.04, RZ + 0.10);
    cupolaAA(B, -0.25, -0.52, RZ - 0.02, V.aaMg);
    /* gunner's hatch, left */
    cylZ(B.paint, -0.10, 0.55, RZ - 0.10, RZ + 0.02, 0.25, 16);
    box(B.dark, -0.15, 0.00, 0.44, 0.66, RZ + 0.02, RZ + 0.05);
    /* roof ventilator, antenna bases */
    cylZ(B.paint, -0.75, 0.15, RZ - 0.12, RZ - 0.02, 0.12, 10);
    cylZ(B.dark, -0.95, 0.72, RZ - 0.25, RZ - 0.11, 0.045, 8);
    cylZ(B.dark, -0.95, -0.72, RZ - 0.25, RZ - 0.11, 0.045, 8);
    /* turret-rear stowage box and the snorkel tube across it */
    box(B.paint, -1.62, -1.22, -0.78, 0.78, 0.16, 0.48);
    box(B.dark, -1.64, -1.62, -0.74, 0.74, 0.20, 0.44);
    box(B.team, -0.45, 0.35, -0.125, 0.125, RZ - 0.04, RZ + 0.01);
  }

  /* T-90A welded turret (P2, P4): section table, three levels, half plan front to rear */
  var T90A_PLAN = [
    [[1.30, 0.45], [1.22, 1.00], [0.40, 1.17], [-0.80, 1.16], [-1.30, 0.98], [-1.52, 0.55]],
    [[1.32, 0.42], [1.24, 1.02], [0.40, 1.18], [-0.80, 1.17], [-1.32, 0.98], [-1.55, 0.55]],
    [[1.18, 0.38], [1.08, 0.92], [0.40, 1.05], [-0.80, 1.04], [-1.22, 0.90], [-1.44, 0.50]]];
  function turretWelded(V, B) {
    var RZ = V.roof, GZ = 0.33, s, i, x;
    loftN(B.paint, [ringAt(T90A_PLAN[0], 0.02), ringAt(T90A_PLAN[1], 0.36), ringAt(T90A_PLAN[2], RZ)]);
    for (s = -1; s <= 1; s += 2) {
      /* the Kontakt-5 wedge each side of the gun: a low vertical front and a long sloped top (P2) */
      loftN(B.era, [
        mirrorY([[1.68, 0.36, 0.10], [1.52, 1.02, 0.10], [1.06, 1.20, 0.10], [1.10, 0.36, 0.10]], s),
        mirrorY([[1.68, 0.36, 0.30], [1.52, 1.02, 0.30], [1.06, 1.20, 0.34], [1.10, 0.36, 0.34]], s),
        mirrorY([[1.40, 0.36, 0.66], [1.30, 0.92, 0.66], [1.00, 1.08, 0.74], [1.00, 0.36, 0.74]], s)]);
      /* Shtora housing high on the outer front corner (P4) */
      shtora(B, 1.22, s * 0.86, 0.50, s);
      /* smoke dischargers: a cluster of two rows of three on the side, behind mid-length (P2) */
      for (i = 0; i < 6; i++) {
        x = -0.30 - (i % 3) * 0.12;
        cyl(B.dark, [x, s * 1.12, RZ - 0.24 + Math.floor(i / 3) * 0.12], [x + 0.10, s * 1.28, RZ - 0.16 + Math.floor(i / 3) * 0.12], 0.042, 0.042, 8);
      }
      box(B.dark, -0.66, -0.20, s > 0 ? 1.12 : -1.16, s > 0 ? 1.16 : -1.12, RZ - 0.32, RZ - 0.04);
      /* side stowage boxes (P2, P3) */
      box(B.paint, -1.05, -0.45, s > 0 ? 1.12 : -1.30, s > 0 ? 1.30 : -1.12, 0.10, 0.38);
    }
    addGun(B, GZ, 1.36, true);
    /* gunner's sight box left of the gun with its window (P4) */
    box(B.paint, 0.66, 1.06, 0.30, 0.58, RZ - 0.04, RZ + 0.26);
    box(B.dark, 1.06, 1.09, 0.34, 0.54, RZ + 0.04, RZ + 0.22);
    box(B.paint, 0.30, 0.66, 0.30, 0.58, RZ - 0.02, RZ + 0.10);
    cupolaAA(B, -0.30, -0.55, RZ, V.aaMg);
    /* gunner's hatch, roof ventilator, antenna bases */
    cylZ(B.paint, -0.20, 0.55, RZ - 0.04, RZ + 0.04, 0.25, 16);
    box(B.dark, -0.25, -0.10, 0.44, 0.66, RZ + 0.04, RZ + 0.07);
    cylZ(B.paint, -0.85, 0.32, RZ - 0.02, RZ + 0.08, 0.12, 10);
    cylZ(B.dark, -1.10, 0.72, RZ - 0.02, RZ + 0.12, 0.045, 8);
    cylZ(B.dark, -1.10, -0.72, RZ - 0.02, RZ + 0.12, 0.045, 8);
    /* rear stowage box */
    box(B.paint, -1.80, -1.42, -0.74, 0.74, 0.14, 0.52);
    box(B.dark, -1.82, -1.80, -0.70, 0.70, 0.18, 0.48);
    box(B.team, -1.05, -0.25, -0.125, 0.125, RZ, RZ + 0.02);
  }

  /* T-90M turret (P5, P6, P7): a taller welded box, the long flat Relikt arrowhead over the
     front, a Relikt band down each side, a deep bustle box with a slat grille behind */
  var T90M_PLAN = [
    [[1.22, 0.50], [1.12, 1.08], [0.30, 1.18], [-1.10, 1.18], [-1.30, 1.04], [-1.40, 0.60]],
    [[1.10, 0.42], [1.00, 0.94], [0.30, 1.02], [-1.10, 1.02], [-1.22, 0.92], [-1.30, 0.52]]];
  function turretM(V, B) {
    var RZ = V.roof, GZ = 0.33, s, i, j, x;
    loftN(B.paint, [ringAt(T90M_PLAN[0], 0.02), ringAt(T90M_PLAN[1], RZ)]);
    for (s = -1; s <= 1; s += 2) {
      /* Relikt arrowhead: a low vertical front face, then flat plates sloping up to the roof */
      loftN(B.era, [
        mirrorY([[1.70, 0.36, 0.10], [1.40, 1.24, 0.10], [0.90, 1.32, 0.10], [0.90, 0.36, 0.10]], s),
        mirrorY([[1.70, 0.36, 0.40], [1.40, 1.24, 0.40], [0.90, 1.32, 0.44], [0.90, 0.36, 0.44]], s),
        mirrorY([[1.36, 0.36, RZ - 0.04], [1.16, 1.12, RZ - 0.04], [0.60, 1.18, RZ + 0.02], [0.60, 0.36, RZ + 0.02]], s)]);
      /* the Relikt band down the side, its face sloping out toward the bottom (P7) */
      loftN(B.era, [
        mirrorY([[0.90, 1.16, 0.06], [0.90, 1.38, 0.06], [-1.25, 1.38, 0.06], [-1.25, 1.16, 0.06]], s),
        mirrorY([[0.90, 1.12, 0.56], [0.90, 1.24, 0.56], [-1.25, 1.24, 0.56], [-1.25, 1.12, 0.56]], s)]);
      /* six-tube grenade cluster, two rows of three, under the roof edge behind mid-length (P7) */
      for (i = 0; i < 6; i++) {
        x = -0.30 - (i % 3) * 0.13; j = Math.floor(i / 3);
        cyl(B.dark, [x, s * (0.98 - j * 0.02), RZ + 0.02 + j * 0.12], [x + 0.17, s * (1.08 - j * 0.02), RZ + 0.09 + j * 0.12], 0.045, 0.045, 10);
      }
      box(B.paint, -0.72, -0.20, s > 0 ? 0.86 : -1.04, s > 0 ? 1.04 : -0.86, RZ - 0.02, RZ + 0.06);
    }
    /* bustle box behind the turret and its slat grille (P6) */
    box(B.paint, -2.36, -1.28, -1.08, 1.08, 0.08, RZ - 0.02);
    box(B.dark, -2.38, -2.36, -1.04, 1.04, 0.10, RZ - 0.04);
    for (i = 0; i <= 15; i++) box(B.dark, -2.46, -2.40, -1.06 + i * 0.1413 - 0.014, -1.06 + i * 0.1413 + 0.014, 0.08, RZ);
    box(B.dark, -2.46, -2.36, -1.08, 1.08, RZ - 0.04, RZ);
    box(B.dark, -2.46, -2.36, -1.08, 1.08, 0.08, 0.12);
    for (i = 0; i < 3; i++) box(B.dark, -2.30 + i * 0.36, -2.26 + i * 0.36, -1.10, 1.10, 0.10, RZ - 0.04);
    addGun(B, GZ, 1.66, true);
    /* gunner's sight (Sosna-U) head, left front of the roof (P6, P7) */
    box(B.paint, 0.25, 0.80, 0.38, 0.82, RZ, RZ + 0.18);
    box(B.paint, 0.40, 0.78, 0.44, 0.76, RZ + 0.18, RZ + 0.36);
    box(B.dark, 0.78, 0.81, 0.48, 0.72, RZ + 0.22, RZ + 0.32);
    /* commander's sight and the remote 12.7 mm station, right (P5, P7) */
    cylZ(B.paint, -0.40, -0.58, RZ, RZ + 0.10, 0.32, 20);
    box(B.paint, -0.62, -0.18, -0.92, -0.50, RZ + 0.10, RZ + 0.48);
    cylZ(B.paint, -0.40, -0.71, RZ + 0.10, RZ + 0.48, 0.21, 16);
    box(B.dark, -0.18, -0.15, -0.86, -0.56, RZ + 0.30, RZ + 0.44);
    box(B.paint, -0.70, -0.10, -0.42, -0.20, RZ + 0.40, RZ + 0.58);
    box(B.dark, -0.10, -0.07, -0.40, -0.22, RZ + 0.44, RZ + 0.55);
    cylX(B.dark, -0.20, 0.75, -0.31, RZ + 0.50, 0.024, 0.022, 8);
    cylX(B.dark, 0.10, 0.30, -0.31, RZ + 0.50, 0.036, 0.036, 8);
    box(B.dark, -0.52, -0.22, -0.42, -0.30, RZ + 0.28, RZ + 0.42);
    /* gunner's hatch, sensor mast (P6, P7), antenna bases */
    cylZ(B.paint, -0.30, 0.55, RZ - 0.02, RZ + 0.05, 0.25, 16);
    box(B.dark, -0.35, -0.20, 0.44, 0.66, RZ + 0.05, RZ + 0.08);
    cylZ(B.dark, -0.90, 0.30, RZ, RZ + 0.42, 0.025, 6);
    cylZ(B.dark, -0.90, 0.30, RZ + 0.42, RZ + 0.50, 0.05, 8);
    box(B.dark, -0.96, -0.84, 0.18, 0.42, RZ + 0.30, RZ + 0.34);
    cylZ(B.dark, -1.15, 0.80, RZ - 0.02, RZ + 0.10, 0.05, 8);
    cylZ(B.dark, -1.15, -0.80, RZ - 0.02, RZ + 0.10, 0.05, 8);
    box(B.team, -1.10, -0.30, -0.10, 0.15, RZ, RZ + 0.02);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.t90a, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), i, wg, WB, tg, TB = bins(T);
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
    if (V.shape === "cast") turretCast(V, TB);
    else if (V.shape === "m") turretM(V, TB);
    else turretWelded(V, TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(V.TX, 0, RING);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

/* len: the measured X extent of each build (models3d convention); published 9.53 / 9.63 / 9.63 m */
UNIT_MODELS["pact_e90_mbt"] = {
  len: 9.65,
  build: function (THREE, M, C) { return HeroT90.build(THREE, M, C, "t90"); }
};
UNIT_MODELS["pact_e00_mbt"] = {
  len: 9.65,
  build: function (THREE, M, C) { return HeroT90.build(THREE, M, C, "t90a"); }
};
UNIT_MODELS["mbt_p"] = {
  len: 9.69,
  build: function (THREE, M, C) { return HeroT90.build(THREE, M, C, "t90m"); }
};
