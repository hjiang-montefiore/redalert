/* ========== ru_t72.js - HERO models: the T-72 family, Cold War marks ======
   pact_e60_t72   T-72 'Ural' (Object 172M, 1973)
   pact_e80_t72a  T-72A (Object 176, 1979)
   pact_e80_t72b  T-72B (Object 184, 1985)
   One builder, a VARIANTS table: the later T-72B (1989), T-72B3, T-72B3M and the
   T-90 family are added as further rows (hull, turret shape and a list of
   fittings are all fields of the row); build() takes the variant name.

   References (Wikimedia Commons, cached in scratchpad/t72_ref):
     ref1 (T-72A_tank_on_parade.jpg, an early-type T-72 from above on parade):
         smooth cast turret without smoke dischargers, long gun with a barrel
         sleeve, flat fenders with angled front wings carrying ribbed ("gill")
         panels, a long cylindrical fuel tank on one fender, a trim vane on the
         glacis, radio antennas on the turret.
     ref2 (T-72_tank_in_museum.jpg, a T-72M1 in a museum, port 3/4): six big
         road wheels a side, close pitch, drive sprocket at the rear, idler at
         the front, rubber side skirts running from the front mudguard to the
         rear and covering the top of the wheels, the front mudguard of steel,
         a bank of six smoke dischargers on the front of the turret, a
         commander's cupola with an anti-aircraft gun, a ribbed bore evacuator
         about two thirds of the way to the muzzle, a thick barrel sleeve.
     ref3 / ref4 (T-72B Tank Vrijheidsmuseum hnapel 06 and 02, a T-72B): the
         bulging "super Dolly Parton" turret front with a V of Kontakt-1 boxes
         on its cheeks and roof, rows of bolted ERA mounts, a flat glacis
         with a wide plate, the broad nose, fuel tank positions.
   Published figures: hull length 6.86 m, length gun forward 9.53 m, width
   3.37 m over the tracks (3.46 m with skirts), height 2.19 m, track 580 mm,
   six road wheels of 750 mm a side, three return rollers a side, ground
   clearance 0.47 m.

   Which feature is in which variant (what each rests on):
     Ural    : no skirts, no smoke dischargers (ref1), angled front wings with
               gill ribs (ref1, facts.js "fold-out gill panels"), coincidence
               rangefinder "ears" at the turret front sides (period text), the
               turret roundest and with the lowest front; one fuel tank on the
               right fender (ref1); no anti-aircraft gun on the cupola
               (armour_specs.js lists none).
     T-72A   : laser rangefinder window on the left of the gun, six smoke
               dischargers each side of the turret front (ref2), full-length
               rubber skirts (ref2, rows' text), the thicker turret front, an
               anti-aircraft gun on the commander's cupola (ref2).
     T-72B   : the same, with a still bigger turret front and Kontakt-1 boxes
               on the turret cheeks and roof and on the glacis, copied from
               two Commons photographs of a T-72B (ref5 T-72B_mod._1985.jpg,
               ref6 Tank_T-72B.jpg, cached in scratchpad/t72f_ref): rows of
               tall boxes along the cheek front, a second row behind, a rank
               across the roof ahead of the cupola, rows of flat boxes across
               the glacis, and no trim vane. The side-skirt ERA grid seen in
               ref5 is a later refit and is NOT drawn. Row text (Kontakt-1)
               is the period authority; ref5 is a later-service photograph
               so exact box counts are approximate.
   Thickened fronts (A, B): flat-topped, sharp-edged cheek blocks beside the
     mantlet standing proud of the dome (ref2, ref5, ref6 side view: low,
     long turret with a sloping, blocky front), bigger on the B.
   NOT CONFIRMED, drawn as judgement calls: the number of fuel tanks (1 for the Ural, 2 for A and B); the
   exact smoke-discharger count and side on the B; the evacuator position.
   The unditching log is NOT drawn (no reference shows one).
   Radio whip antennas, markings and the snorkel are left out.

   LATER MARKS (added 2026-10; every feature below rests on a photograph):
     refs (Wikimedia Commons, cached in scratchpad/t72l_ref):
       b89  T-72B mod. 1989 02.jpg (a T-72B mod. 1989 on a range, rear 3/4): rolled
            tarpaulin on the turret rear, rubber skirts, plain green, no cope cage.
       b3a  T-72B3 - TankBiathlon2013-09.jpg (a T-72B3 in front 3/4, 2013): a row of
            large flat-faced Kontakt-5 boxes along the turret front and cheeks, a
            boxy Sosna-U sight on the roof left of the gun, a tall block of boxes
            across the glacis, a plain steel side skirt with hinge brackets (no
            rubber), a cluster of smoke tubes on the turret's port side behind the
            gunner, a commander's cupola with the 12.7 mm gun, fuel drums on the
            right of the rear deck.
       b3m  T-72B3M MBT Army-2022 2022-08-20 2607.jpg (an exhibition T-72B3M, rear
            left 3/4): two rows of square Relikt modules over the front 5/6 of the
            hull side, slat screens over the rear hull side and hung across the
            stern, slat panels on the turret sides and rear, large Kontakt-5 boxes
            on the turret front, four smoke tubes on the port front of the roof, the
            Sosna-U box, no fuel drums.
       (T-72B3 obr. 2016.jpg is a wartime wreck with a cope cage: used only to
        confirm the turret ERA pattern; the cage and every field addition are NOT drawn.)
     T-72B (1989): the B of 1985 with Kontakt-5 instead of Kontakt-1 (the row text and
        facts.js say Kontakt-5): bigger boxes in three rows on the glacis, three tall
        boxes along each cheek and a second row behind; TPD-K1 and the 902B banks as
        the B. Box counts are approximate (no clean detail photograph).
     T-72B3: the Sosna-U box replaces the TPD-K1 window; the front smoke banks are not
        fitted - one cluster of four tubes at the port side behind the gunner is drawn
        because b3a shows exactly one; steel skirts instead of rubber; the same K-5.
     T-72B3 (2016) = B3M: Relikt side modules, slat screens, turret slat panels.
        NOT CONFIRMED: the exact module count per side and the count of slat bars.
        A separate "commander's sight mast" is NOT drawn: the only post visible on the
        cupola in b3m is the gun mount, and a mast would take the height to 2.42 m
        against the published 2.23 m. The B3's smoke cluster sits behind the gunner in
        b3a and on the port front of the roof in b3m; both are drawn as photographed.
     Kontakt-5 turret layout (all three rows): per side one straight line of flat-topped
        boxes along the cheek (the forward horseshoe seen in b3m and in the b3y front
        view), a second higher row behind it and a short rank across the front roof.


   Materials: PAINT (green, textured), DARK (track, rubber, fittings, sights),
   RUBBER (skirts), ERA (reactive boxes), WHEEL (tyres and hubs by vertex
   colour), and the team colour exactly as handed in (C.team).
   Nodes: "turret" (trains), six "roadwheel" groups, each holding both sides.
   Draw calls: hull 5 + turret 4 + 6 wheels = 15 at most.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroT72 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------- variant table */
  var VARIANTS = {
    ural: { paint: { base: "#4d5a3a", blots: ["#44502f", "#566341"], seed: 72 },
            TX: 0.30,
            dome: { AF: 1.46, AR: 1.40, AY: 1.10, drop: 0.14, bul: 0.00 },
            ears: true, laser: false, smoke: 0, skirts: false, gills: true,
            aaMg: false, drums: 1, eraTurret: false, eraGlacis: false, cheek: 0.0 },
    a:    { paint: { base: "#4e5b3b", blots: ["#454f31", "#58653f"], seed: 176 },
            TX: 0.30,
            dome: { AF: 1.52, AR: 1.40, AY: 1.10, drop: 0.04, bul: 0.05 },
            ears: false, laser: true, smoke: 6, skirts: true, gills: false,
            aaMg: true, drums: 2, eraTurret: false, eraGlacis: false, cheek: 0.10 },
    b:    { paint: { base: "#4a5738", blots: ["#414b2e", "#55603f"], seed: 184 },
            TX: 0.30,
            dome: { AF: 1.56, AR: 1.40, AY: 1.10, drop: -0.04, bul: 0.08 },
            ears: false, laser: true, smoke: 6, skirts: true, gills: false,
            aaMg: true, drums: 2, eraTurret: true, eraGlacis: true, cheek: 0.24 },
    /* later marks: Kontakt-5 (k5), see the header */
    b89:  { paint: { base: "#4a5638", blots: ["#414b2e", "#55603f"], seed: 189 },
            TX: 0.30,
            dome: { AF: 1.56, AR: 1.40, AY: 1.10, drop: -0.04, bul: 0.08 },
            ears: false, laser: true, smoke: 6, skirts: true, gills: false,
            aaMg: true, drums: 2, eraTurret: false, eraGlacis: true, k5: true, cheek: 0.24 },
    b3:   { paint: { base: "#4b5a40", blots: ["#424f35", "#566645"], seed: 203 },
            TX: 0.30,
            dome: { AF: 1.56, AR: 1.40, AY: 1.10, drop: -0.04, bul: 0.08 },
            ears: false, laser: false, smoke: 0, skirts: true, steel: true, gills: false,
            aaMg: true, drums: 2, eraTurret: false, eraGlacis: true, k5: true, cheek: 0.24,
            sosna: true, smokeRear: 4 },
    b3m:  { paint: { base: "#55654a", blots: ["#4a5a40", "#607252"], seed: 2016 },
            TX: 0.30,
            dome: { AF: 1.56, AR: 1.40, AY: 1.10, drop: -0.04, bul: 0.08 },
            ears: false, laser: false, smoke: 0, skirts: false, gills: false,
            aaMg: true, drums: 0, eraTurret: false, eraGlacis: true, k5: true, cheek: 0.24,
            sosna: true, smokeFront: 4, relikt: true, slat: true, cage: true }
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
  /* an oriented block without its underside (ERA boxes, slat bars: 10 triangles) */
  function blk(bin, c, u, v, w, hu, hv, hw) {
    function Q(a, b, d) {
      return [c[0] + u[0] * a * hu + v[0] * b * hv + w[0] * d * hw, c[1] + u[1] * a * hu + v[1] * b * hv + w[1] * d * hw,
              c[2] + u[2] * a * hu + v[2] * b * hv + w[2] * d * hw];
    }
    var q = [Q(-1, -1, -1), Q(1, -1, -1), Q(1, 1, -1), Q(-1, 1, -1), Q(-1, -1, 1), Q(1, -1, 1), Q(1, 1, 1), Q(-1, 1, 1)];
    var F = [[[4, 5, 6, 7], w], [[1, 2, 6, 5], u], [[0, 4, 7, 3], [-u[0], -u[1], -u[2]]],
             [[3, 7, 6, 2], v], [[0, 1, 5, 4], [-v[0], -v[1], -v[2]]]], k, f;
    for (k = 0; k < F.length; k++) {
      f = F[k][0];
      triN(bin, q[f[0]], q[f[1]], q[f[2]], F[k][1]); triN(bin, q[f[0]], q[f[2]], q[f[3]], F[k][1]);
    }
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
    if (V.gills) {
      /* angled gill panels over the front of the tracks: slatted fold-out plates */
      for (p = -1; p <= 1; p += 2) {
        for (i = 0; i < 4; i++) {
          x = 2.45 + i * 0.17;
          slab(B.paint, [x, p * 1.695, 0.88 - i * 0.015], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.06, 0.025, 0.14 - i * 0.01);
        }
        box(B.dark, 2.40, 3.18, p * 1.715 - 0.008, p * 1.715 + 0.008, 0.99, 1.00);
      }
    }
    if (V.skirts) {
      /* rubber side skirts, five panels a side, hanging from the fender edge over the wheel tops */
      var SX = [[2.28, 1.45], [1.40, 0.45], [0.40, -0.60], [-0.65, -1.65], [-1.70, -2.70]];
      for (p = -1; p <= 1; p += 2) {
        for (i = 0; i < SX.length; i++) {
          box(V.steel ? B.paint : B.rubber, SX[i][1], SX[i][0], p * 1.705 - 0.018, p * 1.705 + 0.018, 0.60, 0.99);
          box(B.dark, SX[i][1] + 0.02, SX[i][1] + 0.05, p * 1.725 - 0.012, p * 1.725 + 0.012, 0.64, 0.99);
          box(B.dark, SX[i][0] - 0.05, SX[i][0] - 0.02, p * 1.725 - 0.012, p * 1.725 + 0.012, 0.64, 0.99);
        }
      }
    }
    if (V.relikt) {
      /* Relikt modules (b3m): two rows of square modules over the front part of the hull side, hung from the fender */
      var rc, rr, rx;
      for (p = -1; p <= 1; p += 2) {
        for (rc = 0; rc < 6; rc++) {
          rx = 1.97 - rc * 0.58;
          for (rr = 0; rr < 2; rr++)
            blk(B.era, [rx, p * 1.75, 0.715 + rr * 0.18], [1, 0, 0], [0, p, 0], [0, 0, 1], 0.27, 0.045, 0.085);
          box(B.dark, rx - 0.29, rx - 0.27, p * 1.75 - 0.05, p * 1.75 + 0.05, 0.62, 0.99);
        }
        box(B.dark, 2.26, 2.28, p * 1.75 - 0.05, p * 1.75 + 0.05, 0.62, 0.99);
      }
    }
    if (V.slat) {
      /* slat screens (b3m): over the rear hull side and hung across the stern */
      var sj, sk;
      for (p = -1; p <= 1; p += 2) {
        for (sk = 0; sk < 7; sk++) box(B.paint, -0.64 - sk * 0.35 - 0.015, -0.64 - sk * 0.35 + 0.015, p * 1.745 - 0.02, p * 1.745 + 0.02, 0.60, 1.01);
        for (sj = 0; sj < 5; sj++) box(B.paint, -2.74, -0.62, p * 1.745 - 0.012, p * 1.745 + 0.012, 0.63 + sj * 0.07, 0.65 + sj * 0.07);
      }
      for (sk = 0; sk < 9; sk++) box(B.paint, -3.70, -3.66, -1.28 + sk * 0.32, -1.24 + sk * 0.32, 0.38, 1.01);
      for (sj = 0; sj < 7; sj++) box(B.paint, -3.70, -3.66, -1.28, 1.28, 0.40 + sj * 0.09, 0.42 + sj * 0.09);
      box(B.dark, -3.70, -3.43, 1.18, 1.24, 0.94, 0.99);
      box(B.dark, -3.70, -3.43, -1.24, -1.18, 0.94, 0.99);
    }
    /* fender fittings: left tool box, right fuel tanks, spare track-link bar */
    box(B.paint, -0.30, 0.85, 1.38, 1.62, FZ + 0.02, FZ + 0.16);
    box(B.dark, 0.0, 0.06, 1.37, 1.63, FZ + 0.16, FZ + 0.18);
    box(B.paint, 1.00, 1.70, 1.42, 1.62, FZ + 0.02, FZ + 0.15);
    box(B.paint, -2.45, -1.55, 1.42, 1.62, FZ + 0.02, FZ + 0.17);
    box(B.paint, 1.05, 1.75, -1.60, -1.42, FZ + 0.02, FZ + 0.14);
    var dx = [-1.00, -2.05];
    for (i = 0; i < V.drums; i++) {
      cylX(B.paint, dx[i] - 0.50, dx[i] + 0.50, -1.50, FZ + 0.025 + 0.19, 0.19, 0.19, 14);
      cylX(B.dark, dx[i] - 0.51, dx[i] - 0.45, -1.50, FZ + 0.215, 0.195, 0.195, 14);
      cylX(B.dark, dx[i] + 0.45, dx[i] + 0.51, -1.50, FZ + 0.215, 0.195, 0.195, 14);
      box(B.dark, dx[i] - 0.35, dx[i] - 0.30, -1.70, -1.30, FZ + 0.02, FZ + 0.06);
      box(B.dark, dx[i] + 0.30, dx[i] + 0.35, -1.70, -1.30, FZ + 0.02, FZ + 0.06);
    }
    /* engine deck: grille, hatches, team panel */
    box(B.dark, -2.95, -2.15, -0.70, 0.70, 1.22, 1.235);
    for (i = 0; i < 6; i++) box(B.paint, -2.93 + i * 0.13, -2.88 + i * 0.13, -0.68, 0.68, 1.235, 1.255);
    box(B.paint, -2.05, -1.25, -0.55, 0.55, 1.22, 1.26);
    box(B.team, -1.15, -0.75, -0.40, 0.40, 1.22, 1.245);
    box(B.team, -2.95, -2.55, 1.30, 1.64, FZ + 0.02, FZ + 0.04);
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
        if (V.k5) {
          /* Kontakt-5: bigger flat boxes, three rows of six across the glacis (b3a, b3m) */
          xs = 2.55 + row * 0.32;
          cz = roofZ(xs) + 0.05;
          for (col = 0; col < 6; col++)
            blk(B.era, [xs, (col - 2.5) * 0.36, cz], u, [0, 1, 0], w, 0.14, 0.165, 0.045);
          continue;
        }
        xs = 2.50 + row * 0.23;
        cz = roofZ(xs) + 0.035;
        for (col = -3; col <= 3; col++)
          slab(B.era, [xs, col * 0.30, cz], u, [0, 1, 0], w, 0.085, 0.13, 0.028);
      }
    }
  }

  function addRunning(B, V) {
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
    cnt = Math.round(tot / ((V && V.link) || 0.27)); step = tot / cnt;
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
        belt(B.dark, px - dx * 0.055, pz - dz * 0.055, px + dx * 0.055, pz + dz * 0.055, y - TW - 0.012, y + TW + 0.012, 0.12);
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
    var GZ = 0.44, i, a, s, x, ang, yaw, cu, sn;
    addDome(B, V.dome);
    /* cast mantlet: a drum with a flat front and a boss each side of the gun */
    cylX(B.paint, 1.00, 1.50, 0, GZ, 0.31, 0.27, 18);
    box(B.paint, 1.20, 1.46, -0.38, 0.38, GZ - 0.24, GZ + 0.24);
    if (V.cheek > 0) {
      /* the thickened cast front of the A and B ("Dolly Parton"): a flat-topped, sharp-edged cheek block each side of the
         mantlet that stands proud of the round dome, higher and deeper on the B (photographs of both) */
      var e = V.cheek;
      for (s = -1; s <= 1; s += 2) {
        prism(B.paint, [[1.56 + 0.3 * e, 0.34 * s, 0.50 + 0.1 * e], [1.40 + 0.6 * e, 0.72 * s, 0.50 + 0.1 * e],
                        [0.92 + 0.8 * e, 1.03 * s, 0.50 + 0.1 * e], [0.50, 1.03 * s, 0.64],
                        [0.90, 0.36 * s, 0.68]], 0.10);
      }
    }
    /* the 125 mm gun: thermal sleeve, bands, bore evacuator, bare muzzle */
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
    /* IR searchlight on the right of the gun (all three variants) */
    box(B.paint, 1.02, 1.36, -0.76, -0.42, GZ - 0.14, GZ + 0.20);
    box(B.dark, 1.36, 1.39, -0.72, -0.46, GZ - 0.10, GZ + 0.16);
    box(B.dark, 0.98, 1.06, -0.78, -0.40, GZ + 0.20, GZ + 0.24);
    if (V.ears) {
      /* coincidence rangefinder ears at the front sides */
      for (s = -1; s <= 1; s += 2) {
        box(B.paint, 0.80, 1.22, s * 0.80 - 0.10, s * 0.80 + 0.10, 0.20, 0.44);
        box(B.dark, 1.22, 1.25, s * 0.80 - 0.07, s * 0.80 + 0.07, 0.25, 0.39);
      }
    }
    if (V.laser) {
      /* TPD-K1 laser rangefinder sight window, left of the gun */
      box(B.paint, 0.78, 1.12, 0.26, 0.62, GZ + 0.12, GZ + 0.36);
      box(B.dark, 1.12, 1.15, 0.30, 0.58, GZ + 0.16, GZ + 0.32);
    }
    /* smoke dischargers: a bank of six angled tubes each side of the turret front */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < V.smoke; i++) {
        x = 0.38 + i * 0.075;
        cyl(B.dark, [x, s * 0.90, 0.40], [x + 0.10, s * 0.97, 0.62], 0.036, 0.036, 8);
      }
      if (V.smoke) box(B.dark, 0.36, 0.38 + (V.smoke - 1) * 0.075 + 0.04, s * 0.90 - 0.04, s * 0.90 + 0.04, 0.34, 0.40);
    }
    /* commander's cupola, right rear: ring, vision blocks, hatch, sight */
    cylZ(B.paint, -0.25, -0.50, 0.54, 0.80, 0.29, 18);
    for (i = 0; i < 8; i++) {
      a = i * TAU / 8 + 0.2;
      box(B.dark, -0.25 + Math.cos(a) * 0.29 - 0.03, -0.25 + Math.cos(a) * 0.29 + 0.03,
          -0.50 + Math.sin(a) * 0.29 - 0.03, -0.50 + Math.sin(a) * 0.29 + 0.03, 0.70, 0.76);
    }
    cylZ(B.paint, -0.25, -0.50, 0.80, 0.86, 0.24, 14);
    box(B.dark, -0.40, -0.12, -0.60, -0.40, 0.86, 0.92);
    box(B.dark, 0.0, 0.18, -0.64, -0.46, 0.80, 0.98);
    if (V.aaMg) {
      /* the 12.7 mm anti-aircraft gun on a post on the cupola */
      cylZ(B.dark, -0.05, -0.50, 0.86, 0.95, 0.03, 8);
      box(B.dark, -0.30, 0.10, -0.54, -0.46, 0.92, 1.01);
      cylX(B.dark, 0.10, 1.05, -0.50, 0.97, 0.022, 0.020, 8);
      cylX(B.dark, 0.50, 0.70, -0.50, 0.97, 0.032, 0.032, 8);
      box(B.dark, -0.44, -0.28, -0.54, -0.46, 0.90, 0.99);
    }
    /* gunner's hatch, left, with its flat cover */
    cylZ(B.paint, -0.05, 0.55, 0.52, 0.72, 0.24, 16);
    cylZ(B.paint, -0.05, 0.55, 0.72, 0.76, 0.20, 14);
    box(B.dark, -0.10, 0.04, 0.46, 0.64, 0.76, 0.80);
    /* roof ventilator and antenna base */
    cylZ(B.paint, -0.72, 0.20, 0.64, 0.74, 0.12, 10);
    cylZ(B.dark, -0.95, 0.72, 0.52, 0.66, 0.045, 8);
    /* turret-rear stowage: a bustle box, a rolled tarpaulin, a tool strap */
    box(B.paint, -1.74, -1.28, -0.74, 0.74, 0.20, 0.50);
    box(B.dark, -1.74, -1.72, -0.70, 0.70, 0.24, 0.46);
    cylY(B.rubber, -1.62, -0.55, 0.55, 0.60, 0.11, 12);
    box(B.dark, -1.66, -1.58, -0.60, -0.56, 0.48, 0.72);
    box(B.dark, -1.66, -1.58, 0.56, 0.60, 0.48, 0.72);
    /* team plate on the roof behind the cupola */
    box(B.team, -0.95, -0.55, -0.20, 0.20, 0.715, 0.735);
    if (V.k5) {
      /* Kontakt-5 on the turret (b3a, b3m, b3y front view): per side one straight line of flat-topped boxes laid along
         the cheek from the mantlet back and out (a V open to the rear, the forward "horseshoe"), a second, higher row
         behind it, and a short rank across the roof ahead of the hatches. Every box in a line shares one orientation. */
      var kA = [1.58, 0.42], kB = [1.10, 1.00], kdx = kB[0] - kA[0], kdy = kB[1] - kA[1], kL = Math.sqrt(kdx * kdx + kdy * kdy);
      var ktx = kdx / kL, kty = kdy / kL, krow, kc, kq, kin, kzc, khh;
      for (s = -1; s <= 1; s += 2) {
        for (krow = 0; krow < 2; krow++) {
          kin = krow ? 0.30 : 0.07; kzc = krow ? 0.71 : 0.64; khh = krow ? 0.09 : 0.12;
          for (kc = 0; kc < 3; kc++) {
            kq = (kc + 0.5) / 3 * kL;
            blk(B.era, [kA[0] + ktx * kq - kty * kin, s * (kA[1] + kty * kq + ktx * kin), kzc],
                [ktx, s * kty, 0], [-kty, s * ktx, 0], [0, 0, 1], kL / 6 - 0.012, 0.095, khh);
          }
        }
        for (i = 0; i < 2; i++) blk(B.era, [0.42, s * (0.50 + i * 0.38), 0.74], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.12, 0.17, 0.06);
      }
    }
    if (V.sosna) {
      /* Sosna-U gunner's sight box on the roof, left of the gun (b3a, b3m) */
      box(B.paint, 0.62, 1.02, 0.28, 0.72, 0.64, 0.92);
      box(B.dark, 1.02, 1.05, 0.33, 0.67, 0.70, 0.86);
      box(B.dark, 0.66, 0.98, 0.32, 0.68, 0.92, 0.95);
    }
    if (V.smokeRear || V.smokeFront) {
      /* a cluster of four 902B tubes on the port side (b3a: behind the gunner; b3m: on the port front of the roof) */
      var sx0 = V.smokeFront ? 0.20 : -0.95;
      for (i = 0; i < 4; i++) {
        x = sx0 + i * 0.075;
        cyl(B.dark, [x, 1.00, 0.34], [x + (V.smokeFront ? 0.16 : 0.08), 1.06, 0.60], 0.036, 0.036, 8);
      }
      box(B.dark, sx0 - 0.04, sx0 + 0.27, 0.95, 1.05, 0.30, 0.36);
    }
    if (V.cage) {
      /* slat panels on the turret sides and across the rear of the bustle (b3m) */
      var cj, ck;
      for (s = -1; s <= 1; s += 2) {
        for (ck = 0; ck < 4; ck++) box(B.paint, -0.55 - ck * 0.30 - 0.012, -0.55 - ck * 0.30 + 0.012, s * 1.06 - 0.02, s * 1.06 + 0.02, 0.15, 0.58);
        for (cj = 0; cj < 5; cj++) box(B.paint, -1.46, -0.54, s * 1.06 - 0.012, s * 1.06 + 0.012, 0.19 + cj * 0.09, 0.21 + cj * 0.09);
      }
      for (ck = 0; ck < 3; ck++) box(B.paint, -1.84, -1.80, -0.74 + ck * 0.74, -0.70 + ck * 0.74, 0.15, 0.58);
      for (cj = 0; cj < 4; cj++) box(B.paint, -1.84, -1.80, -0.74, 0.74, 0.19 + cj * 0.11, 0.21 + cj * 0.11);
    }
    /* Kontakt-1 boxes on the cheeks and roof of the B: a V around the gun */
    if (V.eraTurret) {
      /* Kontakt-1 on the B's turret (photographs): a row of tall boxes along the cheek front, a second row behind it,
         and a rank across the roof in front of the cupola */
      var path = [[1.56 + 0.3 * V.cheek, 0.34], [1.40 + 0.6 * V.cheek, 0.72], [0.92 + 0.8 * V.cheek, 1.03]], seg, t, px, py, tx, ty, nl, row, cnt, ofs, zz;
      for (s = -1; s <= 1; s += 2) {
        for (row = 0; row < 2; row++) {
          cnt = row ? 4 : 6; ofs = row ? 0.46 : 0.17;
          for (i = 0; i < cnt; i++) {
            t = (i + 0.5) / cnt * 2; seg = t < 1 ? 0 : 1; t = t - seg;
            px = path[seg][0] + (path[seg + 1][0] - path[seg][0]) * t; py = path[seg][1] + (path[seg + 1][1] - path[seg][1]) * t;
            tx = path[seg + 1][0] - path[seg][0]; ty = path[seg + 1][1] - path[seg][1]; nl = Math.sqrt(tx * tx + ty * ty); tx /= nl; ty /= nl;
            /* inward normal (towards the turret centre) is (-ty, tx) for the +y side */
            px -= ty * ofs; py += tx * ofs;
            zz = 0.50 + 0.1 * V.cheek + row * 0.07 + 0.035;
            slab(B.era, [px, s * py, zz], [tx, s * ty, 0], [-s * ty, tx, 0], [0, 0, 1], 0.07, 0.15, 0.028);
          }
        }
        for (i = 0; i < 3; i++) {
          slab(B.era, [0.30 + i * 0.01, s * (0.52 + i * 0.17), 0.80], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.13, 0.075, 0.025);
        }
      }
    }
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.a, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), i, wg, WB, tg, TB = bins(T);
    addHull(HB, V);
    addRunning(HB, V);
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

UNIT_MODELS["pact_e60_t72"] = {
  len: 9.53,
  build: function (THREE, M, C) { return HeroT72.build(THREE, M, C, "ural"); }
};
UNIT_MODELS["pact_e80_t72a"] = {
  len: 9.53,
  build: function (THREE, M, C) { return HeroT72.build(THREE, M, C, "a"); }
};
UNIT_MODELS["pact_e80_t72b"] = {
  len: 9.53,
  build: function (THREE, M, C) { return HeroT72.build(THREE, M, C, "b"); }
};
UNIT_MODELS["pact_e90_t72b89"] = {
  len: 9.53,
  build: function (THREE, M, C) { return HeroT72.build(THREE, M, C, "b89"); }
};
UNIT_MODELS["pact_e00_t72b3"] = {
  len: 9.53,
  build: function (THREE, M, C) { return HeroT72.build(THREE, M, C, "b3"); }
};
UNIT_MODELS["pact_e20_t72b3m"] = {
  len: 9.53,
  build: function (THREE, M, C) { return HeroT72.build(THREE, M, C, "b3m"); }
};
