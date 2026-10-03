/* ========== ru_t14.js - HERO model: the T-14 Armata (hvy_p) ===============
   hvy_p   T-14 Armata MBT (present day, parade and show vehicles from 2015)

   References (Wikimedia Commons, cached in scratchpad/t14ref):
     ref1 (a.jpg, T-14s in column on a Moscow street, side and 3/4 views): long low
          hull with seven road wheels a side, the side skirts running the whole
          length of the road wheels, a thick angled box at each front corner, the
          faceted low turret set forward of the hull centre, the 125 mm gun with a
          thick breech end and a plain tapering barrel, slat cage at the stern.
     ref2 (top.jpg, high 3/4 view from the front right): the faceted turret plan
          (narrow front wedge, wide flanks, a rear bustle), the roof carrying the
          remote weapon station on a round base at the rear, the sight mast, two
          launcher boxes of the active-protection system on the roof, sensor boxes at
          the hull front corners, the flat glacis with lighter applique panels, the
          crew hatches in the hull front, slat screens along the rear deck edges.
   Published figures: hull length 8.7 m, length gun forward 10.8 m, width 3.5 m,
   height 3.3 m, seven road wheels, weight about 48 t.
   Check pass (Commons photographs: Moscow rehearsal and parade column, front-left,
   rear-left and front-right views, a high view from above, an exhibition side view):
   seven road wheels a side, a larger drive sprocket at the stern and the idler at the
   nose; full-height flat side walls with a lower skirt row; hull deck about 1.9 m;
   the turret sits BEHIND the hull centre (ring about 0.75 m aft of centre, bustle
   to near the engine deck), roof about 2.7 m, sight and station to 3.3 m; angled
   front corner modules about 1.45 m high; two or three crew hatches forward of the
   turret; a row of launch-tube ports low on each turret flank and two tube pods on
   the roof edges; remote 12.7 mm station and sight on the roof; wide slatted bustle
   rear face; slat cages on the rear deck sides and stern.
   NOT CONFIRMED, drawn as judgement calls: tube counts, the flat radar plates on the
   cheeks, the muzzle collar. Antennas, flags, stripes, stars and every parade marking
   are NOT drawn. Plain Russian green.

   Materials: PAINT (green, textured), DARK (track, fittings, sights, slats),
   RUBBER (skirt plates), ERA (applique tiles), WHEEL (vertex colours) and the team
   colour exactly as handed in (C.team): two small strips (on the hull deck ahead of the turret), 0.25 m wide, 0.8-1.0 m long, 2 cm above surface.
   Nodes: "turret" (trains, gun inside pointing +X), seven "roadwheel" groups.
   Draw calls: hull 5 + turret 5 + 7 wheels = 17 meshes if every bin fills; the
   turret has no ERA tiles in its own bin use, so see the dump.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */


if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroT14 = (function () {
  "use strict";
  var TAU = Math.PI * 2;
  var PAINT = { base: "#4b5a40", blots: ["#425236", "#566645"], seed: 14 };
  var TY = 1.42, TW = 0.27;
  var XW = [2.85, 1.90, 0.95, 0.0, -0.95, -1.90, -2.85], ZW = 0.47, RW = 0.38;
  var IDL = { x: 3.78, z: 0.47, r: 0.36 }, SPR = { x: -3.78, z: 0.47, r: 0.36 }, RC = 0.43;
  var TX = -0.75, RING = 1.88;

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
    T.era = new THREE.MeshStandardMaterial({ color: 0x4a5640, roughness: 0.92, metalness: 0.1 });
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
  var DZ = 1.88, SZ = 1.00;                           /* deck height and skirt top */
  /* station: x, half width low, z bottom, z shoulder, z wall top, z deck, wall half width, deck half width */
  var ST = [
    [-4.35, 0.95, 0.62, 1.10, 1.50, 1.62, 1.45, 1.32],
    [-4.20, 1.10, 0.50, SZ, 1.72, DZ, 1.74, 1.62],
    [ 2.30, 1.10, 0.47, SZ, 1.72, DZ, 1.74, 1.62],
    [ 3.40, 1.10, 0.50, SZ, 1.30, 1.50, 1.55, 1.40],
    [ 4.35, 1.00, 0.68, 0.98, 1.00, 1.10, 1.30, 1.25]
  ];
  function ring(S) {
    var x = S[0], w = S[1], zB = S[2], zS = S[3], zC = S[4], zT = S[5], u0 = S[6], u1 = S[7];
    return [[x, w, zB], [x, w, zS], [x, u0, zS], [x, u0, zC], [x, u1, zT], [x, -u1, zT], [x, -u0, zC], [x, -u0, zS], [x, -w, zS], [x, -w, zB]];
  }
  function deckZ(x) { return x <= 2.30 ? DZ : (x <= 3.40 ? DZ - 0.38 * (x - 2.30) / 1.10 : 1.50 - 0.40 * (x - 3.40) / 0.95); }
  function addHull(B) {
    var R = ST.map(ring), i, k, k1, a, b, c, d, e, dy, dz, p, y, x, j;
    for (i = 0; i + 1 < R.length; i++) {
      for (k = 0; k < 10; k++) {
        k1 = (k + 1) % 10;
        a = R[i][k]; b = R[i][k1]; c = R[i + 1][k1]; d = R[i + 1][k];
        dy = b[1] - a[1]; dz = b[2] - a[2];
        e = [0, dz, -dy];
        if (Math.abs(dy) + Math.abs(dz) < 1e-6) continue;
        triN(B.paint, a, b, c, e); triN(B.paint, a, c, d, e);
      }
    }
    function cap(r, hint) {
      var sets = [[0, 1, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8]], q, jj;
      for (q = 0; q < 2; q++)
        for (jj = 1; jj + 1 < sets[q].length; jj++)
          triN(B.paint, r[sets[q][0]], r[sets[q][jj]], r[sets[q][jj + 1]], hint);
    }
    cap(R[0], [-1, 0, 0]); cap(R[R.length - 1], [1, 0, 0]);

    for (p = -1; p <= 1; p += 2) {
      /* side skirts: six plain panels with dark brackets, from the stern to the front corner module */
      var SX = [[-3.75, -2.70], [-2.65, -1.60], [-1.55, -0.50], [-0.45, 0.60], [0.65, 1.70], [1.75, 2.95]];
      for (i = 0; i < SX.length; i++) {
        box(B.paint, SX[i][0], SX[i][1], p * 1.745 - 0.025, p * 1.745 + 0.025, 0.52, SZ);
        box(B.dark, SX[i][0] + 0.02, SX[i][0] + 0.06, p * 1.77 - 0.012, p * 1.77 + 0.012, 0.58, SZ - 0.02);
        box(B.dark, SX[i][1] - 0.06, SX[i][1] - 0.02, p * 1.77 - 0.012, p * 1.77 + 0.012, 0.58, SZ - 0.02);
        box(B.dark, SX[i][0], SX[i][1], p * 1.76 - 0.012, p * 1.76 + 0.012, 0.50, 0.54);
        box(B.rubber, SX[i][0] + 0.10, SX[i][1] - 0.10, p * 1.77 - 0.008, p * 1.77 + 0.008, 0.62, 0.66);
      }
      /* the angled corner module at each front corner */
      prism(B.paint, [[3.00, p * 1.10, 1.46], [4.25, p * 1.10, 1.30], [4.40, p * 1.35, 1.22], [4.00, p * 1.74, 1.40], [3.00, p * 1.74, 1.46]], 0.98);
      /* front sensor / lamp housings */
      box(B.dark, 3.60, 3.86, p * 1.40 - 0.10, p * 1.40 + 0.10, 1.44, 1.56);
      box(B.dark, 4.30, 4.46, p * 1.05 - 0.10, p * 1.05 + 0.10, 0.80, 0.92);
      
    }
    /* glacis: three applique tiles across two ranks */
    var ang = Math.atan(0.35 / 0.95), u = [Math.cos(ang), 0, -Math.sin(ang)], w = [Math.sin(ang), 0, Math.cos(ang)];
    for (i = 0; i < 2; i++)
      for (j = -1; j <= 1; j++) {
        x = 3.62 + i * 0.52;
        slab(B.era, [x, j * 0.62, deckZ(x) + 0.03], u, [0, 1, 0], w, 0.24, 0.28, 0.025);
      }
    /* crew hatches across the capsule roof (three, judgement call) */
    for (j = -1; j <= 1; j++) {
      cylZ(B.paint, 1.95, j * 0.82, deckZ(1.95) - 0.03, deckZ(1.95) + 0.06, 0.27, 20);
      cylZ(B.dark, 1.95, j * 0.82, deckZ(1.95) + 0.06, deckZ(1.95) + 0.075, 0.21, 16);
      box(B.dark, 2.12, 2.26, j * 0.82 - 0.12, j * 0.82 + 0.12, DZ + 0.02, DZ + 0.10);
    }
    /* tow hooks at the nose and stern */
    box(B.dark, 4.30, 4.40, 0.55, 0.69, 0.74, 0.84);
    box(B.dark, 4.30, 4.40, -0.69, -0.55, 0.74, 0.84);
    box(B.dark, -4.40, -4.33, 0.55, 0.69, 0.66, 0.76);
    box(B.dark, -4.40, -4.33, -0.69, -0.55, 0.66, 0.76);
    /* engine deck: louvred grille and the team strips */
    box(B.dark, -4.10, -3.30, -0.80, 0.80, DZ, DZ + 0.012);
    for (i = 0; i < 6; i++) box(B.paint, -4.06 + i * 0.13, -4.01 + i * 0.13, -0.78, 0.78, DZ + 0.012, DZ + 0.03);
    box(B.team, 0.95, 1.85, 1.20, 1.45, DZ, DZ + 0.02);
    box(B.team, 0.95, 1.85, -1.45, -1.20, DZ, DZ + 0.02);
    /* slat screens: across the stern and along the rear deck edges */
    for (i = 0; i < 4; i++) box(B.dark, -4.50, -4.45, -1.42, 1.42, 1.74 + i * 0.13, 1.78 + i * 0.13);
    for (i = 0; i <= 14; i++) box(B.dark, -4.51, -4.46, -1.42 + i * 0.2029 - 0.02, -1.42 + i * 0.2029 + 0.02, 1.60, 2.16);
    for (p = -1; p <= 1; p += 2) {
      for (i = 0; i < 3; i++) box(B.dark, -4.48, -3.30, p * 1.46 - 0.02, p * 1.46 + 0.02, 1.94 + i * 0.12, 1.98 + i * 0.12);
      for (i = 0; i < 4; i++) box(B.dark, -4.50 + i * 0.40 - 0.03, -4.50 + i * 0.40 + 0.03, p * 1.46 - 0.03, p * 1.46 + 0.03, 1.80, 2.20);
    }
  }

  function addRunning(B) {
    var n, i, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, k, s, y, step, cnt, dx, dz, pts = [], th;
    pts.push([SPR.x, 0.04], [IDL.x, 0.04]);
    for (i = 1; i <= 7; i++) { th = -Math.PI / 2 + i * Math.PI / 8; pts.push([IDL.x + Math.cos(th) * RC, IDL.z + Math.sin(th) * RC]); }
    pts.push([IDL.x, 0.90], [SPR.x, 0.90]);
    for (i = 1; i <= 7; i++) { th = Math.PI / 2 + i * Math.PI / 8; pts.push([SPR.x + Math.cos(th) * RC, SPR.z + Math.sin(th) * RC]); }
    n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      segs.push([a, b, l]); tot += l;
    }
    cnt = Math.round(tot / 0.34); step = tot / cnt;
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
        belt(B.dark, px - dx * 0.07, pz - dz * 0.07, px + dx * 0.07, pz + dz * 0.07, y - TW - 0.012, y + TW + 0.012, 0.10);
      }
      cylY(B.dark, SPR.x, y - 0.22, y + 0.22, SPR.z, SPR.r, 18);
      cylY(B.paint, SPR.x, y + s * 0.20, y + s * 0.26, SPR.z, 0.17, 12);
      cylY(B.paint, IDL.x, y - 0.20, y + 0.20, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.19, y + s * 0.27, IDL.z, 0.10, 10);
    }
  }

  var TYRE = [0.15, 0.16, 0.15];
  function addWheel(W) {
    var s, y, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.255, y - 0.14, 0, RW, 16);
      cylY(W, 0, y + 0.14, y + 0.255, 0, RW, 16);
      W.col = [rr * 1.05, gg * 1.05, bb * 1.05];
      cylY(W, 0, y - 0.15, y + 0.15, 0, 0.34, 16);
      cylY(W, 0, y + s * 0.255, y + s * 0.30, 0, 0.15, 12);
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

  var RZ = 0.80, GZ = 0.55;
  function addTurret(B) {
    var QB = fullPlan([[1.85, 0.42], [1.45, 0.95], [0.70, 1.45], [-0.90, 1.50], [-1.55, 1.35], [-2.10, 1.12]]);
    var QT = fullPlan([[1.45, 0.34], [1.15, 0.72], [0.55, 1.05], [-0.80, 1.12], [-1.40, 1.10], [-2.10, 1.05]]);
    var i, s, j, a, c, nh, t, ph = 0.33, uu, vv, ww, p0, p1, tl, mx, my;
    cylZ(B.paint, 0, 0, -0.14, 0.16, 1.18, 28);              /* turret ring and its skirt */
    loft(B.paint, QB, QT, 0.0, RZ);
    /* radar plates (judgement call): flat dark plates on the front cheeks and rear flanks */
    var H = [[1.45, 0.95], [0.70, 1.45], [-0.90, 1.50]], U = [[1.15, 0.72], [0.55, 1.05], [-0.80, 1.12]];
    for (s = -1; s <= 1; s += 2)
      for (i = 0; i < 2; i++) {
        p0 = [(H[i][0] + U[i][0]) / 2, (H[i][1] + U[i][1]) / 2]; p1 = [(H[i + 1][0] + U[i + 1][0]) / 2, (H[i + 1][1] + U[i + 1][1]) / 2];
        t = [p1[0] - p0[0], p1[1] - p0[1]]; a = Math.sqrt(t[0] * t[0] + t[1] * t[1]); t = [t[0] / a, t[1] / a];
        nh = [t[1], -t[0]];
        mx = (p0[0] + p1[0]) / 2; my = (p0[1] + p1[1]) / 2;
        if (i === 1) { mx = p0[0] + t[0] * 0.15; my = p0[1] + t[1] * 0.15; }
        uu = [t[0], t[1] * s, 0]; ww = [nh[0] * Math.cos(ph), nh[1] * s * Math.cos(ph), Math.sin(ph)];
        vv = [-nh[0] * Math.sin(ph), -nh[1] * s * Math.sin(ph), Math.cos(ph)];
        slab(B.dark, [mx + nh[0] * 0.03, s * (my + nh[1] * 0.03), 0.44], uu, vv, ww, i === 0 ? 0.30 : 0.32, 0.27, 0.018);
      }
    /* mantlet block and the 125 mm 2A82-1M */
    box(B.paint, 1.30, 1.64, -0.40, 0.40, GZ - 0.28, GZ + 0.28);
    box(B.dark, 1.64, 1.67, -0.34, 0.34, GZ - 0.22, GZ + 0.22);
    cylX(B.paint, 1.64, 2.70, 0, GZ, 0.135, 0.125, 18);
    cylX(B.paint, 2.70, 3.30, 0, GZ, 0.125, 0.100, 18);
    cylX(B.paint, 3.30, 7.00, 0, GZ, 0.100, 0.082, 16);
    cylX(B.dark, 3.30, 3.36, 0, GZ, 0.108, 0.108, 14);
    cylX(B.dark, 6.45, 6.57, 0, GZ, 0.094, 0.094, 14);
    cylX(B.dark, 6.87, 7.01, 0, GZ, 0.090, 0.090, 14);
    cylX(B.dark, 1.60, 1.95, 0.27, GZ - 0.03, 0.025, 0.025, 8);   /* co-axial 7.62 mm */
    /* gunner's sight box on the roof, front right */
    box(B.paint, 0.80, 1.18, -0.52, -0.22, RZ - 0.02, RZ + 0.14);
    box(B.dark, 1.18, 1.21, -0.48, -0.26, RZ + 0.02, RZ + 0.11);
    /* Afganit launcher boxes, rear roof corners, tube mouths on the outer faces */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -1.25, -0.70, s * 0.95 - 0.21, s * 0.95 + 0.21, RZ - 0.02, RZ + 0.28);
      for (i = 0; i < 3; i++)
        for (j = 0; j < 2; j++)
          cylY(B.dark, -1.10 + i * 0.17, s * (1.16), s * (1.19), RZ + 0.07 + j * 0.13, 0.05, 8);
    }
    /* lower flank launch tubes, five a side (counts a judgement call) */
    for (s = -1; s <= 1; s += 2)
      for (i = 0; i < 5; i++) cylY(B.dark, -1.15 + i * 0.42, s * 1.30, s * 1.46, 0.20, 0.13, 10);
    /* remote weapon station: base, head, sights, 12.7 mm */
    cylZ(B.paint, -1.00, 0.0, RZ - 0.02, RZ + 0.14, 0.32, 18);
    cylZ(B.paint, -1.00, 0.0, RZ + 0.14, RZ + 0.44, 0.24, 16);
    box(B.dark, -0.80, -0.74, -0.14, 0.14, RZ + 0.20, RZ + 0.38);
    cylX(B.dark, -0.74, 0.05, 0.0, RZ + 0.30, 0.03, 0.026, 8);
    cylX(B.dark, -0.40, -0.20, 0.0, RZ + 0.30, 0.04, 0.04, 8);
    /* sight mast, rear right */
    cylZ(B.dark, -0.30, -0.98, RZ - 0.02, RZ + 0.48, 0.055, 8);
    box(B.paint, -0.40, -0.12, -1.10, -0.86, RZ + 0.48, RZ + 0.66);
    box(B.dark, -0.12, -0.09, -1.06, -0.90, RZ + 0.52, RZ + 0.62);
    /* rear bustle with its slat screen */
    box(B.paint, -2.38, -1.70, -1.10, 1.10, 0.08, RZ - 0.04);
    for (i = 0; i <= 10; i++) box(B.dark, -2.41, -2.38, -1.08 + i * 0.216 - 0.025, -1.08 + i * 0.216 + 0.025, 0.12, RZ - 0.08);
    box(B.dark, -2.41, -2.38, -1.10, 1.10, 0.08, 0.12);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C, { paint: PAINT }), g = new THREE.Group();
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

UNIT_MODELS["hvy_p"] = {
  len: 10.8,
  build: function (THREE, M, C) { return HeroT14.build(THREE, M, C); }
};

