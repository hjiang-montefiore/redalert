/* ========== ru_t90.js - HERO models: the T-90 family ======================
   pact_e90_mbt   T-90 (Object 188, 1992)    cast turret, Kontakt-5, Shtora-1
   pact_e00_mbt   T-90A (2004)               welded turret, Kontakt-5 wedges
   mbt_p          T-90M Proryv (2020)        new welded turret, Relikt, remote MG
   One builder, a VARIANTS table; the hull, running gear and geometry kit are those
   of ru_t72.js (the T-90 is the T-72B hull), the turrets and fittings are new.

   References (Wikimedia Commons, cached in scratchpad/t90_ref):
     ref1 (Moscow 2012 Victory Day Parade Rehearsal, T-90 Tank, Russia.jpg - a
          T-90A in side view): welded turret with a flat roof and a rear bustle, six
          equal road wheels, the three front skirt panels as thick ERA plates and the
          long rear skirt plain, six smoke dischargers on the turret side, the
          commander's AA gun and the tall gunner's sight.
     ref2 (T-90A - TankBiathlon2013-12.jpg, 3/4 view from the front): the wedge-shaped
          welded front with its Kontakt-5 plates, a Shtora housing each side of the
          gun, the sloped hull front covered with flat ERA, fuel drums lying across
          the rear engine deck, the AA gun on the cupola pedestal.
     ref3 (T-90M.jpg, 3/4 view from the front): taller, squarer welded turret, ERA
          tile arrays on the front wedges and on thick side-skirt panels, a long rear
          bustle with a grille, the round gunner's sight head on the roof, a remote
          machine-gun station on the right of the roof, a grille at the hull rear.
     ref4 (T-90_tank.svg, a coloured side drawing): profile proportions (hull length
          to gun length), the sleeve and the bore evacuator.
   Published figures: hull length 6.86 m, length gun forward 9.63 m, width about
   3.78 m with the thick skirts, height 2.23 m, six road wheels of 750 mm, three
   return rollers a side.

   Check-and-fix references (Commons, cached in scratchpad/t90f_ref): "T-90 main battle
   tank (2).jpg" (cast-turret T-90, starboard side: plain glacis and mudguards, plain
   skirts, no fuel drums, a tank box on the right rear fender, three big Kontakt-5
   boxes across the turret front, the six smoke dischargers in two rows on the REAR
   half of the turret side); "Indian Army T-90-2.jpg" (cast-turret T-90S, plain
   glacis, full-length skirt); "Soviet and Russian vehicles in Kubinka tank museum
   362.jpg" with its T-90A placard 361 (T-90A: plain glacis and mudguards, welded
   turret, Shtora housings about half a metre each way); the labelled photograph
   the Russian-titled "T-90 1992 with markings" file (Shtora housing with round lens and cooling
   louvres, smoke tubes rear of the turret side); T-90M.jpg (plain glacis, Relikt
   tile skirts, rear screen, no Shtora housings).
   Published figures: Wikipedia T-90 infobox: width 3.78 m, height 2.23 m, length
   9.63 m gun forward (T-90A 9.63, T-90 9.53), hull 6.86 m.

   Which feature is in which variant, and what it rests on:
     T-90   : the cast turret (T-72B outline from ru_t72.js) with three Kontakt-5
              boxes each side on the cheek front, Shtora-1 housings, six smoke
              dischargers in two rows on the rear half of each turret side, AA gun,
              plain glacis, one thick plain front skirt panel then rubber panels, a
              fuel tank on the right rear fender (photographs); no drums.
     T-90A  : welded turret with wedge Kontakt-5, Shtora, three thick plain skirt
              panels, plain glacis and mudguards, two drums across the rear deck.
     T-90M  : taller welded turret, Relikt, bustle with grille, sights, remote
              12.7 mm, no Shtora, four Relikt tile skirt panels, rear screen.
   NOT CONFIRMED, drawn as judgement calls: ERA brick counts and sizes; the number
   of fuel drums (two, T-90A and T-90M); the T-90's skirt layout beyond the first
   panel. Wartime kit (cope cages, markings, numbers) is NOT drawn. Plain Russian
   green.

   Materials: PAINT (green, textured), DARK (track, fittings, sights), RUBBER (skirts),
   ERA (reactive bricks), WHEEL (tyres and hubs by vertex colour) and the team colour
   exactly as handed in (C.team): three small strips (rear engine-deck hatch, left
   rear fender box, turret roof), each 0.25 m wide and 0.8-0.9 m long, 2 cm above
   its surface.
   Nodes: "turret" (trains), six "roadwheel" groups, each holding both sides.
   Draw calls: hull 5 + turret 5 + 6 wheels = 16 at most.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */


if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroT90 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------- variant table */
  var VARIANTS = {
    t90:  { paint: { base: "#4a5a3c", blots: ["#415034", "#546443"], seed: 90 },
            TX: 0.30, shape: "cast",
            dome: { AF: 1.56, AR: 1.40, AY: 1.10, drop: -0.04, bul: 0.08 }, cheek: 0.24,
            shtora: true, smoke: 6, aaMg: true, rws: false,
            skirts: "t90", drums: 0, drumsDeck: 0, eraTurret: true, eraGlacis: false, wings: false, slats: false, tank: true },
    t90a: { paint: { base: "#4b5b3d", blots: ["#425235", "#556544"], seed: 904 },
            TX: 0.30, shape: "welded", roof: 0.76,
            shtora: true, smoke: 6, aaMg: true, rws: false,
            skirts: "a", drums: 0, drumsDeck: 2, eraTurret: true, eraGlacis: false, wings: false, slats: false },
    t90m: { paint: { base: "#4c5c3e", blots: ["#435336", "#566645"], seed: 920 },
            TX: 0.30, shape: "welded", roof: 0.74, tall: true,
            shtora: false, smoke: 6, aaMg: false, rws: true,
            skirts: "m", drums: 0, drumsDeck: 2, eraTurret: true, eraGlacis: false, wings: false, slats: true }
  };


  var TY = 1.395, TW = 0.29;
  var XW = [2.05, 1.275, 0.50, -0.275, -1.05, -1.825], ZW = 0.47, RW = 0.375;
  var XR = [1.275, -0.275, -1.825], ZR = 0.80;
  var IDL = { x: 3.0, z: 0.47, r: 0.34 }, SPR = { x: -3.02, z: 0.47, r: 0.34 }, RC = 0.42;
  var RING = 1.19;                                   /* turret ring height */

  /* ------------------------------------------------------------ geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  function Bin(mat, uv, vc) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.34, q[1] * 0.34);
        else if (ay >= ax) this.U.push(q[0] * 0.34, q[2] * 0.34);
        else this.U.push(q[1] * 0.34, q[2] * 0.34);
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
  /* convex plan polygon [x, y, top z] extruded from z0 up to its own top heights */
  function prism(bin, Q, z0) {
    var V = [], F = [], n = Q.length, i;
    for (i = 0; i < n; i++) V.push([Q[i][0], Q[i][1], z0]);
    for (i = 0; i < n; i++) V.push([Q[i][0], Q[i][1], Q[i][2]]);
    for (i = 0; i < n; i++) { F.push([i, (i + 1) % n, n + (i + 1) % n], [i, n + (i + 1) % n, n + i]); }
    for (i = 1; i + 1 < n; i++) { F.push([0, i, i + 1]); F.push([n, n + i, n + i + 1]); }
    solid(bin, V, F);
  }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg); }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function paintTex(THREE, P) {
    var key = P.base + P.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), s = P.seed >>> 0, i, k;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 10; i++) q.fillRect(R() * 256, R() * 256, 20 + R() * 60, 10 + R() * 40);
      }
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 2) ? "rgba(15,14,10,0.07)" : "rgba(240,236,215,0.05)";
        q.fillRect(R() * 256, R() * 256, 3 + R() * 30, 2 + R() * 18);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.rubber = new THREE.MeshStandardMaterial({ color: 0x3a3d36, roughness: 0.95, metalness: 0.0 });
    T.era = new THREE.MeshStandardMaterial({ color: 0x48513a, roughness: 0.92, metalness: 0.1 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), rubber: new Bin(T.rubber, false),
             era: new Bin(T.era, false), team: new Bin(T.team, false) };
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
  /* stations: x, half width of the lower hull, belly, fender level, roof,
     half width of the upper hull at the fender and at the roof edge */
  var FZ = 1.02;
  function roofZ(x) { return x <= 1.90 ? 1.24 : 1.24 - 0.36 * (x - 1.90); }
  var ST = [
    [-3.43, 0.92, 0.58, 0.96, 1.14, 1.10, 1.02],
    [-3.30, 1.10, 0.50, 1.00, 1.22, 1.30, 1.20],
    [ 1.90, 1.10, 0.47, 1.00, 1.24, 1.30, 1.20],
    [ 2.40, 1.10, 0.47, 1.00, 1.06, 1.28, 1.20],
    [ 3.00, 1.10, 0.50, 1.00, 0.85, 1.24, 1.18],
    [ 3.43, 1.02, 0.62, 1.00, 0.70, 1.20, 1.15]
  ];
  function ring(S) {
    var x = S[0], w = S[1], zB = S[2], zF = Math.min(S[3], S[4] - 0.02), zT = S[4], u0 = S[5], u1 = S[6];
    return [[x, w, zB], [x, w, zF], [x, u0, zF], [x, u1, zT], [x, -u1, zT], [x, -u0, zF], [x, -w, zF], [x, -w, zB]];
  }
  function addHull(B, V) {
    var R = ST.map(ring), i, k, k1, a, b, c, d, e, dy, dz, p, s, y0, y1, x;
    for (i = 0; i + 1 < R.length; i++) {
      for (k = 0; k < 8; k++) {
        k1 = (k + 1) % 8;
        a = R[i][k]; b = R[i][k1]; c = R[i + 1][k1]; d = R[i + 1][k];
        dy = b[1] - a[1]; dz = b[2] - a[2];
        e = [0, dz, -dy];
        if (Math.abs(dy) + Math.abs(dz) < 1e-6) continue;
        triN(B.paint, a, b, c, e); triN(B.paint, a, c, d, e);
      }
    }
    function cap(r, hint) {
      var sets = [[0, 1, 6, 7], [1, 2, 3, 4, 5, 6]], q, j;
      for (q = 0; q < 2; q++)
        for (j = 1; j + 1 < sets[q].length; j++)
          triN(B.paint, r[sets[q][0]], r[sets[q][j]], r[sets[q][j + 1]], hint);
    }
    cap(R[0], [-1, 0, 0]); cap(R[R.length - 1], [1, 0, 0]);

    for (p = -1; p <= 1; p += 2) {
      y0 = p > 0 ? 1.12 : -1.69; y1 = p > 0 ? 1.69 : -1.12;
      /* flat fender shelf with its rolled edge */
      box(B.paint, -3.02, 2.30, y0, y1, FZ - 0.03, FZ + 0.025);
      box(B.paint, -3.02, 2.30, p > 0 ? 1.66 : -1.69, p > 0 ? 1.69 : -1.66, FZ - 0.08, FZ + 0.05);
      /* front mudguard wing, curved down over the idler end of the track */
      belt(B.paint, 2.30, FZ, 2.80, 0.99, y0, y1, 0.05);
      belt(B.paint, 2.80, 0.99, 3.15, 0.88, y0, y1, 0.05);
      belt(B.paint, 3.15, 0.88, 3.35, 0.70, y0, y1, 0.05);
      belt(B.paint, 3.35, 0.70, 3.43, 0.52, y0, y1, 0.05);
      /* rear fender lip and mud flap */
      box(B.paint, -3.06, -3.00, p > 0 ? 1.20 : -1.69, p > 0 ? 1.69 : -1.20, 0.72, FZ + 0.03);
      /* hull-side track guards under the shelf (inner) */
      box(B.dark, -2.95, 2.20, p > 0 ? 1.10 : -1.14, p > 0 ? 1.14 : -1.10, 0.90, FZ - 0.03);
    }
    if (V.skirts) {
      /* side skirts, five panels a side hanging from the fender edge over the wheel tops: the first panels carry
         the ERA (T-90: one, T-90A: three, T-90M: four thick Relikt panels), the rest are rubber (photographs) */
      var SX = [[2.28, 1.45], [1.40, 0.45], [0.40, -0.60], [-0.65, -1.65], [-1.70, -2.70]];
      var NE = V.skirts === "t90" ? 1 : (V.skirts === "a" ? 3 : 4), yy, th, gx, gz, gi, gj, ex0, ex1;
      for (p = -1; p <= 1; p += 2) {
        for (i = 0; i < SX.length; i++) {
          if (i < NE) {
            th = V.skirts === "m" ? 0.05 : 0.04; yy = p * (V.skirts === "m" ? 1.81 : 1.85);
            ex0 = SX[i][1]; ex1 = SX[i][0];
            box(B.paint, ex0, ex1, yy - th, yy + th, 0.58, 0.99);
            /* hinge brackets from the fender edge out to the thick panel */
                        box(B.dark, ex0 + 0.06, ex0 + 0.12, p > 0 ? 1.69 : -1.85, p > 0 ? 1.85 : -1.69, 0.90, 0.96);
            /* Relikt tile grid on the T-90M panels only (photographs); the T-90 and T-90A panels are smooth plate */
            if (V.skirts === "m")
              for (gi = 0; gi < 2; gi++)
                for (gj = 0; gj < 2; gj++)
                  box(B.era, ex0 + 0.03 + gi * ((ex1 - ex0 - 0.06) / 2), ex0 + 0.03 + (gi + 1) * ((ex1 - ex0 - 0.06) / 2) - 0.025,
                      yy + p * (th), yy + p * (th + 0.028), 0.61 + gj * 0.19, 0.61 + gj * 0.19 + 0.175);
          } else {
            box(B.rubber, SX[i][1], SX[i][0], p * 1.705 - 0.018, p * 1.705 + 0.018, 0.60, 0.99);
            box(B.dark, SX[i][1] + 0.02, SX[i][1] + 0.05, p * 1.725 - 0.012, p * 1.725 + 0.012, 0.64, 0.99);
            box(B.dark, SX[i][0] - 0.05, SX[i][0] - 0.02, p * 1.725 - 0.012, p * 1.725 + 0.012, 0.64, 0.99);
          }
        }
      }
    }
    if (V.wings) {
      /* ERA slabs on the front mudguards (T-90A and T-90M photographs) */
      for (p = -1; p <= 1; p += 2)
        for (i = 0; i < 3; i++)
          slab(B.era, [2.55 + i * 0.28, p * 1.40, FZ + 0.045 - i * 0.012], [Math.cos(0.1 * i), 0, -Math.sin(0.1 * i)], [0, 1, 0],
               [Math.sin(0.1 * i), 0, Math.cos(0.1 * i)], 0.12, 0.26, 0.035);
    }
    if (V.slats) {
      /* the T-90M's slat screen across the stern (row text: slat screens at the rear) */
      box(B.dark, -3.52, -3.46, -1.00, 1.00, 1.18, 1.22);
      box(B.dark, -3.52, -3.46, -1.00, 1.00, 0.70, 0.74);
      for (i = 0; i <= 16; i++) box(B.dark, -3.54, -3.48, -1.00 + i * 0.125 - 0.012, -1.00 + i * 0.125 + 0.012, 0.72, 1.20);
    }
    /* fender fittings: left tool box, right fuel tanks, spare track-link bar */
    box(B.paint, -0.30, 0.85, 1.38, 1.62, FZ + 0.02, FZ + 0.16);
    box(B.dark, 0.0, 0.06, 1.37, 1.63, FZ + 0.16, FZ + 0.18);
    box(B.paint, 1.00, 1.70, 1.42, 1.62, FZ + 0.02, FZ + 0.15);
    box(B.paint, -2.45, -1.55, 1.42, 1.62, FZ + 0.02, FZ + 0.17);
    box(B.paint, 1.05, 1.75, -1.60, -1.42, FZ + 0.02, FZ + 0.14);
    if (V.tank) {
      /* the T-90 photographs show a long fuel tank on the right rear fender and no drums */
      box(B.paint, -2.55, -1.45, -1.62, -1.42, FZ + 0.02, FZ + 0.20);
      box(B.dark, -2.50, -2.44, -1.62, -1.42, FZ + 0.20, FZ + 0.22);
    }
    var dx = [-1.00, -2.05];
    for (i = 0; i < V.drums; i++) {
      cylX(B.paint, dx[i] - 0.50, dx[i] + 0.50, -1.50, FZ + 0.025 + 0.19, 0.19, 0.19, 14);
      cylX(B.dark, dx[i] - 0.51, dx[i] - 0.45, -1.50, FZ + 0.215, 0.195, 0.195, 14);
      cylX(B.dark, dx[i] + 0.45, dx[i] + 0.51, -1.50, FZ + 0.215, 0.195, 0.195, 14);
      box(B.dark, dx[i] - 0.35, dx[i] - 0.30, -1.70, -1.30, FZ + 0.02, FZ + 0.06);
      box(B.dark, dx[i] + 0.30, dx[i] + 0.35, -1.70, -1.30, FZ + 0.02, FZ + 0.06);
    }
    /* two fuel drums lying across the rear engine deck (T-90A photograph), on the rear half of the deck */
    for (i = 0; i < V.drumsDeck; i++) {
      cylY(B.paint, -2.45 - i * 0.40, -0.78, 0.78, 1.20 + 0.19, 0.19, 14);
      cylY(B.dark, -2.45 - i * 0.40, -0.80, -0.74, 1.39, 0.195, 14);
      cylY(B.dark, -2.45 - i * 0.40, 0.74, 0.80, 1.39, 0.195, 14);
    }
    /* engine deck: grille, hatches, team panel */
    box(B.dark, -2.95, -2.15, -0.70, 0.70, 1.22, 1.235);
    for (i = 0; i < 6; i++) box(B.paint, -2.93 + i * 0.13, -2.88 + i * 0.13, -0.68, 0.68, 1.235, 1.255);
    box(B.paint, -2.05, -1.25, -0.55, 0.55, 1.22, 1.26);
    box(B.team, -2.00, -1.20, -0.125, 0.125, 1.255, 1.280);
    box(B.team, -2.45, -1.55, 1.42, 1.62, FZ + 0.17, FZ + 0.19);
    /* the stern: tow hooks (no unditching log: no reference shows one) */
    box(B.dark, -3.50, -3.43, 0.70, 0.84, 0.58, 0.68);
    box(B.dark, -3.50, -3.43, -0.84, -0.70, 0.58, 0.68);
    /* driver: hatch centred on the glacis roof, three periscopes, trim vane, lamps */
    cylZ(B.paint, 2.00, 0.0, 1.20, 1.28, 0.23, 16);
    cylZ(B.dark, 2.00, 0.0, 1.28, 1.30, 0.18, 12);
    box(B.dark, 2.22, 2.30, -0.33, -0.23, 1.14, 1.20);
    box(B.dark, 2.22, 2.30, -0.05, 0.05, 1.14, 1.21);
    box(B.dark, 2.22, 2.30, 0.23, 0.33, 1.14, 1.20);
    if (!V.eraGlacis) slab(B.paint, [2.62, 0.0, 0.98], [Math.cos(0.34), 0, -Math.sin(0.34)], [0, 1, 0], [Math.sin(0.34), 0, Math.cos(0.34)], 0.20, 0.55, 0.012);
    box(B.paint, 2.50, 2.60, -0.56, 0.56, 1.01, 1.06);
    box(B.dark, 2.55, 2.70, 1.20, 1.36, 1.05, 1.12);
    box(B.dark, 2.55, 2.70, -1.36, -1.20, 1.05, 1.12);
    box(B.dark, 3.30, 3.44, 0.40, 0.52, 0.64, 0.70);
    box(B.dark, 3.30, 3.44, -0.52, -0.40, 0.64, 0.70);
    /* two tow cables along the glacis edge and a spare-track bracket on the glacis */
    cylX(B.dark, 2.35, 3.20, 0.90, 0.80, 0.025, 0.025, 6);
    cylX(B.dark, 2.35, 3.20, -0.90, 0.80, 0.025, 0.025, 6);
    /* the glacis Kontakt-1 of the B: rows of flat boxes across the sloped glacis (T-72B photographs, see header);
       the trim vane is not drawn on the B, as the photographs show none */
    if (V.eraGlacis) {
      var ang = Math.atan(0.36), u = [Math.cos(ang), 0, -Math.sin(ang)], w = [Math.sin(ang), 0, Math.cos(ang)];
      var row, col, xs, cz;
      for (row = 0; row < 3; row++) {
        xs = 2.50 + row * 0.23;
        cz = roofZ(xs) + 0.035;
        for (col = -3; col <= 3; col++)
          slab(B.era, [xs, col * 0.30, cz], u, [0, 1, 0], w, 0.085, 0.13, 0.028);
      }
    }
  }

  function addRunning(B) {
    var n, i, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, k, s, y, step, cnt, dx, dz, pts = [], th;
    pts.push([SPR.x, 0.05], [IDL.x, 0.05]);
    for (i = 1; i <= 7; i++) { th = -Math.PI / 2 + i * Math.PI / 8; pts.push([IDL.x + Math.cos(th) * RC, IDL.z + Math.sin(th) * RC]); }
    pts.push([IDL.x, 0.89], [SPR.x, 0.89]);
    for (i = 1; i <= 7; i++) { th = Math.PI / 2 + i * Math.PI / 8; pts.push([SPR.x + Math.cos(th) * RC, SPR.z + Math.sin(th) * RC]); }
    n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      segs.push([a, b, l]); tot += l;
    }
    cnt = Math.round(tot / 0.31); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.08);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        belt(B.dark, px - dx * 0.06, pz - dz * 0.06, px + dx * 0.06, pz + dz * 0.06, y - TW - 0.012, y + TW + 0.012, 0.10);
      }
      /* sprocket (rear), idler (front), three return rollers */
      cylY(B.dark, SPR.x, y - 0.22, y + 0.22, SPR.z, SPR.r, 16);
      cylY(B.paint, SPR.x, y + s * 0.20, y + s * 0.26, SPR.z, 0.17, 12);
      cylY(B.paint, IDL.x, y - 0.20, y + 0.20, IDL.z, IDL.r, 16);
      cylY(B.dark, IDL.x, y + s * 0.19, y + s * 0.27, IDL.z, 0.10, 10);
      for (i = 0; i < XR.length; i++) {
        cylY(B.dark, XR[i], y - 0.18, y + 0.18, ZR, 0.085, 10);
        cylY(B.paint, XR[i], y + s * 0.17, y + s * 0.22, ZR, 0.05, 8);
      }
    }
  }

  var TYRE = [0.15, 0.16, 0.15], DISC = [0.43, 0.46, 0.35];
  function addWheel(W, V) {
    var s, y, c = V.paint.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.255, y - 0.14, 0, RW, 14);
      cylY(W, 0, y + 0.14, y + 0.255, 0, RW, 14);
      W.col = [rr * 1.05, gg * 1.05, bb * 1.05];
      cylY(W, 0, y - 0.15, y + 0.15, 0, 0.33, 16);
      cylY(W, 0, y + s * 0.255, y + s * 0.30, 0, 0.14, 10);
      W.col = TYRE;
      cylY(W, 0, y + s * 0.295, y + s * 0.315, 0, 0.06, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* a lofted convex solid between a lower and an upper plan polygon (same point count) */
  function loft(bin, Qb, Qt, z0, z1) {
    var n = Qb.length, V = [], F = [], i;
    for (i = 0; i < n; i++) V.push([Qb[i][0], Qb[i][1], z0]);
    for (i = 0; i < n; i++) V.push([Qt[i][0], Qt[i][1], z1]);
    for (i = 0; i < n; i++) F.push([i, (i + 1) % n, n + (i + 1) % n], [i, n + (i + 1) % n, n + i]);
    for (i = 1; i + 1 < n; i++) { F.push([0, i, i + 1]); F.push([n, n + i, n + i + 1]); }
    solid(bin, V, F);
  }
  /* half plan (y >= 0, front to rear) to a full closed plan */
  function fullPlan(H) {
    var Q = [], i;
    for (i = 0; i < H.length; i++) Q.push([H[i][0], H[i][1]]);
    for (i = H.length - 1; i >= 0; i--) Q.push([H[i][0], -H[i][1]]);
    return Q;
  }
  /* a grid of flat ERA bricks on a (near vertical) facet from plan point P0 to P1, between z0 and z1, standing proud
     along the outward plan normal (nx, ny) */
  function facetEra(B, P0, P1, z0, z1, nc, nr, nx, ny) {
    var tx = P1[0] - P0[0], ty = P1[1] - P0[1], l = Math.sqrt(tx * tx + ty * ty), i, j, t, zc, cx, cy, hu = l / nc / 2 - 0.012, hw = (z1 - z0) / nr / 2 - 0.012;
    tx /= l; ty /= l;
    for (i = 0; i < nc; i++)
      for (j = 0; j < nr; j++) {
        t = (i + 0.5) / nc * l; zc = z0 + (j + 0.5) * (z1 - z0) / nr;
        cx = P0[0] + tx * t + nx * 0.03; cy = P0[1] + ty * t + ny * 0.03;
        slab(B.era, [cx, cy, zc], [tx, ty, 0], [nx, ny, 0], [0, 0, 1], hu, 0.03, hw);
      }
  }
  /* a flat grid of ERA bricks on a horizontal roof patch */
  function roofEra(B, x0, x1, y0, y1, z, nc, nr) {
    var i, j, dx = (x1 - x0) / nc, dy = (y1 - y0) / nr;
    for (i = 0; i < nc; i++) for (j = 0; j < nr; j++)
      box(B.era, x0 + i * dx + 0.012, x0 + (i + 1) * dx - 0.012, y0 + j * dy + 0.012, y0 + (j + 1) * dy - 0.012, z, z + 0.05);
  }
  function outN(a, b) {                          /* outward normal of the +y side facet a->b (front to rear, y > 0) */
    var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.sqrt(dx * dx + dy * dy), n = [-dy / l, dx / l];
    if (n[1] < 0 || (n[1] === 0 && n[0] < 0)) n = [-n[0], -n[1]];
    return n;
  }

  var PROF = [[1.00, 0.00], [1.02, 0.12], [1.00, 0.30], [0.93, 0.46], [0.80, 0.59],
              [0.58, 0.68], [0.32, 0.73], [0.0, 0.75]];
  function addDome(B, D) {
    var NS = 36, AF = D.AF, AR = D.AR, AY = D.AY, p = 2 / 2.4;
    var G = [], rI, j, c, s, sx, sy, pr, V = [], Nacc = [], tris = [], cf, ctr = [0, 0, 0.05];
    for (rI = 0; rI < PROF.length; rI++) {
      pr = PROF[rI]; G.push([]);
      for (j = 0; j < NS; j++) {
        c = Math.cos(j / NS * TAU); s = Math.sin(j / NS * TAU);
        cf = Math.max(c, 0);
        sx = (c >= 0 ? AF : AR) * pr[0] * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), p);
        sy = AY * pr[0] * (1 + D.bul * cf * cf) * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), p);
        G[rI].push(V.length); V.push([sx, sy, pr[1] * (1 - D.drop * cf)]); Nacc.push([0, 0, 0]);
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

  function addTurret(V, B) {
    var GZ = 0.44, i, a, s, x, RZ = V.roof || 0.75, e, cast = V.shape === "cast";
    if (cast) {
      addDome(B, V.dome);
      /* the thickened cast front ("Dolly Parton") of the T-72B-derived T-90: a flat-topped cheek block each side of the mantlet */
      e = V.cheek;
      for (s = -1; s <= 1; s += 2)
        prism(B.paint, [[1.56 + 0.3 * e, 0.34 * s, 0.50 + 0.1 * e], [1.40 + 0.6 * e, 0.72 * s, 0.50 + 0.1 * e],
                        [0.92 + 0.8 * e, 1.03 * s, 0.50 + 0.1 * e], [0.50, 1.03 * s, 0.64], [0.90, 0.36 * s, 0.68]], 0.10);
    } else {
      var H0, H1, WB, WT, WZ, q0, q1, q2, n1, n2, tl = V.tall;
      if (tl) {
        /* T-90M: the new welded turret, taller and squarer, long bustle behind */
        H0 = [[1.44, 0.50], [1.32, 0.98], [0.62, 1.16], [-1.05, 1.16], [-1.50, 0.98], [-1.62, 0.55]];
        H1 = [[1.34, 0.50], [1.22, 0.90], [0.62, 1.04], [-1.05, 1.04], [-1.42, 0.90], [-1.54, 0.50]];
        WB = [[1.60, 0.30], [1.56, 0.64], [1.08, 1.06], [0.62, 1.12]];
        WT = [[1.42, 0.30], [1.38, 0.60], [0.98, 0.98], [0.64, 1.04]];
        WZ = 0.86;
      } else {
        /* T-90A: the welded, angular turret */
        H0 = [[1.38, 0.45], [1.05, 1.02], [0.55, 1.12], [-0.90, 1.12], [-1.25, 0.90], [-1.42, 0.50]];
        H1 = [[1.28, 0.34], [1.00, 0.86], [0.55, 1.00], [-0.90, 1.00], [-1.18, 0.80], [-1.30, 0.45]];
        WB = [[1.55, 0.30], [1.50, 0.62], [1.00, 1.04], [0.55, 1.06]];
        WT = [[1.36, 0.30], [1.32, 0.56], [0.94, 0.96], [0.60, 0.98]];
        WZ = 0.82;
      }
      loft(B.paint, fullPlan(H0), fullPlan(H1), 0.08, RZ);
      /* the thick welded front: a wedge of armour each side of the gun, sloped back, carrying the ERA */
      for (s = -1; s <= 1; s += 2) {
        loft(B.paint, WB.map(function (q) { return [q[0], q[1] * s]; }), WT.map(function (q) { return [q[0], q[1] * s]; }), 0.12, WZ);
        q0 = [WB[0][0] - 0.06, WB[0][1]]; q1 = [WB[1][0] - 0.06, WB[1][1]]; q2 = [WB[2][0] - 0.06, WB[2][1]];
        n1 = outN(q0, q1); n2 = outN(q1, q2);
        facetEra(B, [q0[0], q0[1] * s], [q1[0], q1[1] * s], 0.20, WZ - 0.04, tl ? 2 : 2, tl ? 3 : 3, n1[0], n1[1] * s);
        facetEra(B, [q1[0], q1[1] * s], [q2[0], q2[1] * s], 0.20, WZ - 0.04, tl ? 4 : 4, tl ? 3 : 3, n2[0], n2[1] * s);
        roofEra(B, 0.78, tl ? 1.30 : 1.22, s > 0 ? 0.34 : (tl ? -0.94 : -0.90), s > 0 ? (tl ? 0.94 : 0.90) : -0.34, WZ - 0.005, tl ? 2 : 3, 3);
      }
    }
    /* mantlet: a drum with a flat front and a boss each side of the gun */
    cylX(B.paint, 1.00, 1.50, 0, GZ, 0.31, 0.27, 18);
    box(B.paint, 1.20, 1.46, -0.38, 0.38, GZ - 0.24, GZ + 0.24);
    /* the 125 mm gun: thermal sleeve, bands, bore evacuator, muzzle */
    cylX(B.paint, 1.46, 4.18, 0, GZ, 0.105, 0.098, 16);
    cylX(B.dark, 2.40, 2.46, 0, GZ, 0.112, 0.112, 14);
    cylX(B.dark, 3.20, 3.26, 0, GZ, 0.108, 0.108, 14);
    cylX(B.paint, 4.18, 4.32, 0, GZ, 0.098, 0.125, 16);
    cylX(B.paint, 4.32, 4.62, 0, GZ, 0.125, 0.125, 16);
    cylX(B.dark, 4.40, 4.43, 0, GZ, 0.130, 0.130, 14);
    cylX(B.dark, 4.50, 4.53, 0, GZ, 0.130, 0.130, 14);
    cylX(B.paint, 4.62, 4.78, 0, GZ, 0.125, 0.082, 16);
    cylX(B.paint, 4.78, 5.80, 0, GZ, 0.082, 0.075, 14);
    cylX(B.dark, 5.72, 5.81, 0, GZ, 0.078, 0.078, 14);
    /* coaxial machine gun, left of the gun */
    cylX(B.dark, 1.30, 1.62, 0.21, GZ - 0.06, 0.022, 0.022, 8);
    var ZW0 = cast ? 0 : 0.10;
    if (V.shtora) {
      /* Shtora-1: the two dazzler housings flanking the gun, each with its lens, and small laser-warning receivers */
      for (s = -1; s <= 1; s += 2) {
        box(B.paint, 0.98, 1.46, s * 0.58 - 0.20, s * 0.58 + 0.20, GZ - 0.10 + ZW0, GZ + 0.28 + ZW0);
        box(B.dark, 1.46, 1.49, s * 0.58 - 0.14, s * 0.58 + 0.14, GZ - 0.02 + ZW0, GZ + 0.20 + ZW0);
        cylX(B.dark, 1.02, 1.12, s * 0.84, GZ + 0.30 + ZW0, 0.03, 0.03, 8);
      }
    }
    /* gunner's sight box, left of the gun on the roof of the front */
    box(B.paint, 0.55, 0.95, 0.20, 0.46, cast ? 0.62 : RZ - 0.02, cast ? 0.84 : RZ + 0.20);
    box(B.dark, 0.95, 0.98, 0.23, 0.43, cast ? 0.67 : RZ + 0.03, cast ? 0.80 : RZ + 0.16);
    /* smoke dischargers: a bank of six tubes each side */
    for (s = -1; s <= 1; s += 2) {
      if (cast) {
        for (i = 0; i < V.smoke; i++) {
          x = -0.42 - (i % 3) * 0.10;
          cyl(B.dark, [x, s * 0.90, 0.42 + Math.floor(i / 3) * 0.11], [x + 0.16, s * 1.01, 0.42 + Math.floor(i / 3) * 0.11], 0.036, 0.036, 8);
        }
        box(B.dark, -0.72, -0.34, s * 0.90 - 0.04, s * 0.90 + 0.04, 0.34, 0.40);
      } else {
        for (i = 0; i < V.smoke; i++) {
          x = (V.tall ? -0.25 : -0.30) - i * 0.075;
          cyl(B.dark, [x, s * (V.tall ? 1.15 : 1.11), RZ - 0.30], [x + 0.06, s * (V.tall ? 1.24 : 1.20), RZ - 0.10], 0.034, 0.034, 8);
        }
      }
    }
    /* commander's cupola, right rear */
    var CX = V.tall ? -0.10 : -0.25;
    if (!V.rws) {
      cylZ(B.paint, CX, -0.50, RZ - 0.20, RZ + 0.05, 0.29, 18);
      for (i = 0; i < 8; i++) {
        a = i * TAU / 8 + 0.2;
        box(B.dark, CX + Math.cos(a) * 0.29 - 0.03, CX + Math.cos(a) * 0.29 + 0.03,
            -0.50 + Math.sin(a) * 0.29 - 0.03, -0.50 + Math.sin(a) * 0.29 + 0.03, RZ - 0.05, RZ + 0.01);
      }
      cylZ(B.paint, CX, -0.50, RZ + 0.05, RZ + 0.11, 0.24, 14);
      box(B.dark, CX - 0.15, CX + 0.13, -0.60, -0.40, RZ + 0.11, RZ + 0.17);
      box(B.dark, CX + 0.25, CX + 0.43, -0.64, -0.46, RZ + 0.05, RZ + 0.23);
    }
    if (V.aaMg) {
      /* the 12.7 mm anti-aircraft gun on a pedestal on the cupola */
      cylZ(B.dark, CX + 0.20, -0.50, RZ + 0.11, RZ + 0.20, 0.03, 8);
      box(B.dark, CX - 0.05, CX + 0.35, -0.54, -0.46, RZ + 0.17, RZ + 0.26);
      cylX(B.dark, CX + 0.35, CX + 1.30, -0.50, RZ + 0.22, 0.022, 0.020, 8);
      cylX(B.dark, CX + 0.75, CX + 0.95, -0.50, RZ + 0.22, 0.032, 0.032, 8);
      box(B.dark, CX - 0.19, CX - 0.03, -0.54, -0.46, RZ + 0.15, RZ + 0.24);
    }
    if (V.rws) {
      /* T-90M: commander's panoramic sight and the remote-controlled 12.7 mm station on the roof (T-90M photo) */
      box(B.paint, -0.30, 0.20, -0.82, -0.28, RZ - 0.02, RZ + 0.22);
      box(B.dark, 0.20, 0.23, -0.74, -0.36, RZ + 0.06, RZ + 0.18);
      cylZ(B.dark, -0.05, -0.55, RZ + 0.22, RZ + 0.30, 0.09, 12);
      cylZ(B.paint, -0.75, -0.62, RZ - 0.02, RZ + 0.10, 0.18, 14);
      box(B.paint, -0.95, -0.55, -0.82, -0.42, RZ + 0.10, RZ + 0.30);
      box(B.dark, -0.55, -0.52, -0.80, -0.62, RZ + 0.16, RZ + 0.30);
      cylX(B.dark, -0.52, 0.12, -0.50, RZ + 0.22, 0.022, 0.020, 8);
      cylX(B.dark, -0.20, 0.0, -0.50, RZ + 0.22, 0.034, 0.034, 8);
    }
    /* gunner's hatch, left, with its flat cover */
    cylZ(B.paint, -0.05, 0.55, RZ - 0.23, RZ - 0.03, 0.24, 16);
    cylZ(B.paint, -0.05, 0.55, RZ - 0.03, RZ + 0.01, 0.20, 14);
    box(B.dark, -0.10, 0.04, 0.46, 0.64, RZ + 0.01, RZ + 0.05);
    if (V.tall) {
      /* the round sight head on the left of the T-90M roof (T-90M photo) */
      cylZ(B.paint, 0.35, 0.72, RZ - 0.02, RZ + 0.12, 0.11, 12);
      cyl(B.dark, [0.35, 0.72, RZ + 0.14], [0.50, 0.72, RZ + 0.20], 0.12, 0.12, 14);
    }
    /* roof ventilator and antenna base */
    cylZ(B.paint, -0.72, 0.20, RZ - 0.11, RZ - 0.01, 0.12, 10);
    cylZ(B.dark, -0.95, 0.72, RZ - 0.23, RZ - 0.09, 0.045, 8);
    /* turret-rear stowage */
    if (cast) {
      box(B.paint, -1.74, -1.28, -0.74, 0.74, 0.20, 0.50);
      box(B.dark, -1.74, -1.72, -0.70, 0.70, 0.24, 0.46);
    } else if (V.tall) {
      box(B.paint, -2.06, -1.50, -0.98, 0.98, 0.16, RZ - 0.10);
      for (i = 0; i <= 14; i++) box(B.dark, -2.09, -2.06, -0.96 + i * 0.137 - 0.012, -0.96 + i * 0.137 + 0.012, 0.18, RZ - 0.12);
      box(B.dark, -2.09, -2.06, -0.98, 0.98, 0.16, 0.20);
    } else {
      box(B.paint, -1.62, -1.38, -0.70, 0.70, 0.16, 0.50);
      box(B.dark, -1.64, -1.62, -0.66, 0.66, 0.20, 0.46);
    }
    /* team plate on the turret roof */
    if (cast) box(B.team, -1.00, -0.20, -0.125, 0.125, 0.70, 0.76);
    else box(B.team, -1.05, -0.25, -0.125, 0.125, RZ - 0.01, RZ + 0.02);
    /* Kontakt-5 on the cast T-90: a row of tall boxes along the cheek front, a second row behind, a rank across the roof */
    if (cast && V.eraTurret) {
      var path = [[1.56 + 0.3 * V.cheek, 0.34], [1.40 + 0.6 * V.cheek, 0.72], [0.92 + 0.8 * V.cheek, 1.03]], seg, t, px, py, tx, ty, nl, row, cnt, ofs, zz;
      for (s = -1; s <= 1; s += 2) {
        for (row = 0; row < 2; row++) {
          cnt = 3; ofs = row ? 0.46 : 0.17;
          for (i = 0; i < cnt; i++) {
            t = (i + 0.5) / cnt * 2; seg = t < 1 ? 0 : 1; t = t - seg;
            px = path[seg][0] + (path[seg + 1][0] - path[seg][0]) * t; py = path[seg][1] + (path[seg + 1][1] - path[seg][1]) * t;
            tx = path[seg + 1][0] - path[seg][0]; ty = path[seg + 1][1] - path[seg][1]; nl = Math.sqrt(tx * tx + ty * ty); tx /= nl; ty /= nl;
            px -= ty * ofs; py += tx * ofs;
            zz = 0.50 + 0.1 * V.cheek + row * 0.07 + 0.035;
            if (py > 0.38 && px > 0.98) continue;      /* clear of the Shtora housing */
            slab(B.era, [px, s * py, zz], [tx, s * ty, 0], [-s * ty, tx, 0], [0, 0, 1], 0.15, 0.15, 0.03);
          }
        }
        for (i = 0; i < 3; i++)
          slab(B.era, [0.30 + i * 0.01, s * (0.62 + i * 0.17), 0.80], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.13, 0.075, 0.025);
      }
    }
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.a90, T = materials(THREE, C, V), g = new THREE.Group();
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
    addTurret(V, TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(V.TX, 0, RING);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e90_mbt"] = {
  len: 9.63,
  build: function (THREE, M, C) { return HeroT90.build(THREE, M, C, "t90"); }
};
UNIT_MODELS["pact_e00_mbt"] = {
  len: 9.63,
  build: function (THREE, M, C) { return HeroT90.build(THREE, M, C, "t90a"); }
};
UNIT_MODELS["mbt_p"] = {
  len: 9.63,
  build: function (THREE, M, C) { return HeroT90.build(THREE, M, C, "t90m"); }
};
