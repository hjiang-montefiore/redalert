/* ========== ru_t62.js - HERO model: T-62 main battle tank (pact_e60_mbt) ===
   The Soviet 1961 T-62 (Obiekt 165): the T-55 hull lengthened for a wider turret
   ring, a low wide cast egg-shaped turret and the 115 mm U-5TS smoothbore.

   Reference photographs (Wikimedia Commons, cached in scratchpad/t62ref):
     "T-62 on a monument in Kudryashovsky" (pure port side view): five road
       wheels a side with the gaps growing toward the rear (measured on the
       image: 0.94, 0.97, 1.14, 1.15 m, the front pair close together), idler
       in front, drive sprocket behind, NO return rollers, track running on the
       wheel tops, flat fenders with a long stowage box on the rear half, the
       low egg turret centred a little forward of the hull middle with a thin
       cupola, the long barrel with the bore evacuator about a third of the
       way back from the muzzle, olive-green finish.
     "Right side of the T-62 tank at the Military Vehicle Technology Foundation"
       (front three-quarter, starboard): the thick tube emerging from a cast
       mantlet, a large round infra-red searchlight on a bracket forward on the
       roof (drawn beside the gun, as the row's period shows), a small round
       lamp on the right front of the turret, an AA machine gun on a pintle at
       the cupola, the loader's round hatch cover, a round port plug in the
       turret side, a rounded stowage box on the front starboard fender, a
       headlamp and horn on the starboard front of the glacis.
     "T-62 tank in Petah-Tikva" (side/rear three-quarter): the round spent-case
       ejection port at the turret rear, wheel discs with large lightening holes.
   Dimensions (published, armour_specs.js): length 9.67 m gun forward, hull
   6.63 m, width 3.30 m, height 2.40 m, track 580 mm, road wheels 830 mm.

   NOT CONFIRMED and so left out: snorkel, rear fuel drums, spare track links on
   the glacis, unditching beam, radio antenna, any markings or numerals.
   Judgement calls: the starboard photograph shows the searchlight on a roof bracket
   ahead of the loader's hatch and right of the gun, so it is drawn there (the earlier
   draft put it left of the gun, as on the T-55); the AA gun is a simple pintle mount
   on the loader's (right) hatch, barrel forward; the commander's cupola is on the left;
   the turret is drawn lower and wider than the T-54A's dome (flat roof, 2.4 m wide);
   a second turret-side port plug (port side) was not seen and is not drawn.

   Three materials: PAINT (green, textured), DARK (track, rubber, gun fittings,
   sights) and the team colour exactly as handed in (C.team).  Nodes: "turret"
   (trains), five "roadwheel" groups (each holds both sides).  Draw calls:
   3 hull + 3 turret + 10 wheel = 16.

   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroT62 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var VARIANTS = {
    A: { paint: { base: "#4b5736", blots: ["#414d2d", "#58633f"], seed: 62 },
         TX: 0.45, ROOF: 1.50, gunEnd: 5.90, evac: [3.90, 4.60] }
  };

  var TY = 1.36, TW = 0.29;                        /* track centre / half width */
  var XW = [2.03, 1.08, 0.11, -1.03, -2.18], ZW = 0.51, RW = 0.415;
  var IDL = { x: 2.91, z: 0.47, r: 0.30 }, SPR = { x: -2.94, z: 0.60, r: 0.31 };
  var PATH = [[-2.50, 0.05], [2.56, 0.05], [3.09, 0.16], [3.27, 0.47], [3.09, 0.78], [2.60, 0.93],
              [2.03, 0.97], [-2.18, 0.97], [-2.65, 0.98], [-3.14, 0.88], [-3.31, 0.60], [-3.14, 0.28], [-2.84, 0.10]];

  /* ------------------------------------------------------------ geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  function Bin(mat, uv) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
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
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }


  /* ---------------------------------------------------------------- hull */
  var ST = [
    [-3.32, 0.90, 0.56, 1.14, 1.24, 1.00, 0.96],
    [-3.15, 1.04, 0.46, 1.33, 1.45, 1.08, 1.02],
    [ 2.05, 1.04, 0.43, 1.33, 1.50, 1.08, 1.02],
    [ 3.20, 0.94, 0.55, 0.80, 0.87, 1.00, 0.94],
    [ 3.32, 0.88, 0.62, 0.74, 0.78, 0.90, 0.86]
  ];
  function ring(S) {
    var x = S[0], w = S[1], zB = S[2], zF = S[3], zT = S[4], u0 = S[5], u1 = S[6];
    return [[x, w, zB], [x, w, zF], [x, u0, zF], [x, u1, zT], [x, -u1, zT], [x, -u0, zF], [x, -w, zF], [x, -w, zB]];
  }
  function addHull(B) {
    var R = ST.map(ring), i, k, k1, a, b, c, d, e, dy, dz, p;
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
      var sets = [[0, 1, 6, 7], [1, 2, 3, 4, 5, 6]], s, j;
      for (s = 0; s < 2; s++)
        for (j = 1; j + 1 < sets[s].length; j++)
          triN(B.paint, r[sets[s][0]], r[sets[s][j]], r[sets[s][j + 1]], hint);
    }
    cap(R[0], [-1, 0, 0]); cap(R[R.length - 1], [1, 0, 0]);

    /* fenders: flat shelf, front ends sweeping down as angled wings, rear lip */
    for (p = -1; p <= 1; p += 2) {
      var y0 = p > 0 ? 1.05 : -1.65, y1 = p > 0 ? 1.65 : -1.05;
      box(B.paint, -3.22, 2.05, y0, y1, 1.30, 1.37);
      belt(B.paint, 2.05, 1.35, 2.50, 1.28, y0, y1, 0.07);
      belt(B.paint, 2.50, 1.28, 2.88, 1.08, y0, y1, 0.07);
      belt(B.paint, 2.88, 1.08, 3.16, 0.80, y0, y1, 0.07);
      belt(B.paint, 3.16, 0.80, 3.26, 0.66, y0, y1, 0.07);
      box(B.paint, -3.22, -3.16, y0, y1, 1.12, 1.37);
      /* fender edge rail along the outer side */
      box(B.paint, -3.16, 2.05, p > 0 ? 1.63 : -1.65, p > 0 ? 1.65 : -1.63, 1.37, 1.42);
    }
    /* stowage: long box on the rear port fender (side view), a rounded box on the front
       starboard fender with a handle (front view), a box behind it on the starboard side */
    box(B.paint, -2.85, -0.95, 1.40, 1.62, 1.37, 1.57);
    box(B.paint, -0.75, -0.30, 1.42, 1.62, 1.37, 1.50);
    belt(B.paint, 0.75, 1.50, 1.05, 1.60, -1.62, -1.42, 0.06);
    box(B.paint, 0.70, 1.80, -1.62, -1.42, 1.37, 1.48);
    belt(B.paint, 0.70, 1.48, 0.95, 1.58, -1.62, -1.42, 0.05);
    belt(B.paint, 1.55, 1.58, 1.80, 1.48, -1.62, -1.42, 0.05);
    box(B.paint, 0.95, 1.55, -1.62, -1.42, 1.48, 1.58);
    box(B.dark, 1.12, 1.38, -1.54, -1.50, 1.58, 1.64);
    box(B.paint, -2.70, -1.60, -1.62, -1.42, 1.37, 1.55);
    [-2.40, -2.10, -1.30].forEach(function (x) { box(B.dark, x - 0.03, x + 0.03, 1.42, 1.64, 1.37, 1.43); });
    /* engine deck: hatch, louvres, team panel */
    box(B.paint, -2.80, -1.70, -0.60, 0.60, 1.47, 1.53);
    box(B.dark, -2.70, -2.00, -0.40, 0.40, 1.53, 1.545);
    box(B.team, -1.62, -1.20, -0.36, 0.36, 1.47, 1.495);
    box(B.team, -3.10, -2.78, 1.45, 1.62, 1.37, 1.39);
    box(B.team, -3.10, -2.78, -1.62, -1.45, 1.37, 1.39);
    /* driver: hatch and two periscopes, left of centre */
    cylZ(B.paint, 1.92, 0.55, 1.46, 1.58, 0.22, 14);
    box(B.dark, 1.96, 2.04, 0.44, 0.52, 1.58, 1.62);
    box(B.dark, 1.96, 2.04, 0.58, 0.66, 1.58, 1.62);
    /* headlamp and horn on the starboard front (front view); guard bar */
    cylX(B.dark, 2.46, 2.58, -1.22, 1.42, 0.08, 0.08, 10);
    box(B.dark, 2.40, 2.48, -1.25, -1.19, 1.33, 1.38);
    cylX(B.dark, 2.30, 2.42, -1.05, 1.40, 0.04, 0.05, 8);
    /* tow hooks on the nose */
    box(B.dark, 3.28, 3.36, 0.55, 0.65, 0.66, 0.74);
    box(B.dark, 3.28, 3.36, -0.65, -0.55, 0.66, 0.74);
    /* rear tow shackles */
    box(B.dark, -3.36, -3.30, 0.55, 0.65, 0.62, 0.70);
    box(B.dark, -3.36, -3.30, -0.65, -0.55, 0.62, 0.70);
  }

  function addRunning(B) {
    var s, i, n = PATH.length, a, b, dx, dz, l, d, step, y, t, tot = 0, segs = [], q, rem, px, pz, k;
    for (i = 0; i < n; i++) {
      a = PATH[i]; b = PATH[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      segs.push([a, b, l]); tot += l;
    }
    var cnt = Math.round(tot / 0.34); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.10);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        belt(B.dark, px - dx * 0.05, pz - dz * 0.05, px + dx * 0.05, pz + dz * 0.05, y - TW - 0.01, y + TW + 0.01, 0.14);
      }
      /* sprocket (rear) with its hub, idler (front) with its crank */
      cylY(B.dark, SPR.x, y - 0.21, y + 0.21, SPR.z, SPR.r, 16);
      cylY(B.paint, SPR.x, y + s * 0.19, y + s * 0.25, SPR.z, 0.16, 12);
      cylY(B.paint, IDL.x, y - 0.20, y + 0.20, IDL.z, IDL.r, 16);
      cylY(B.dark, IDL.x, y + s * 0.19, y + s * 0.26, IDL.z, 0.10, 10);
    }
  }

  function addWheel(P, D) {
    var s, y, j, a;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      cylY(D, 0, y - 0.255, y - 0.16, 0, RW, 20);                      /* rubber rims          */
      cylY(D, 0, y + 0.16, y + 0.255, 0, RW, 20);
      cylY(D, 0, y + s * 0.25, y + s * 0.262, 0, 0.30, 20);            /* dark disc face       */
      cylY(P, 0, y + s * 0.25, y + s * 0.285, 0, 0.19, 14);            /* hub and cap          */
      cylY(D, 0, y + s * 0.28, y + s * 0.30, 0, 0.07, 10);
      for (j = 0; j < 6; j++) {                                        /* lightening holes     */
        a = j * TAU / 6 + 0.2;
        cylY(D, Math.cos(a) * 0.245, y + s * 0.255, y + s * 0.272, Math.sin(a) * 0.245, 0.055, 6);
      }
    }
  }

  /* --------------------------------------------------------------- turret */
  /* low, wide cast egg: full width forward of the middle, long tapering tail */
  var PROF = [[1.00, 0.00], [1.03, 0.08], [1.025, 0.19], [0.97, 0.31], [0.89, 0.41],
              [0.75, 0.50], [0.53, 0.56], [0.28, 0.59], [0.0, 0.60]];
  function addDome(B) {
    var NS = 36, CX = -0.10, AF = 1.15, AR = 1.55, AY = 1.20, p = 2 / 2.4;
    var G = [], rI, j, c, s, sx, sy, pr, V = [], Nacc = [], tris = [];
    for (rI = 0; rI < PROF.length; rI++) {
      pr = PROF[rI]; G.push([]);
      for (j = 0; j < NS; j++) {
        c = Math.cos(j / NS * TAU); s = Math.sin(j / NS * TAU);
        sx = (c >= 0 ? AF : AR) * pr[0] * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), p);
        sy = AY * pr[0] * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), p);
        G[rI].push(V.length); V.push([CX + sx, sy, pr[1] * (1 - 0.14 * Math.max(c, 0))]); Nacc.push([0, 0, 0]);
      }
    }
    var ctr = [CX, 0, 0.05];
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
    var GZ = 0.44, i, a, ex = V.evac;
    addDome(B);
    /* cast mantlet, thick tube, bore evacuator a third of the way back from the muzzle */
    cylX(B.paint, 0.78, 1.32, 0, GZ, 0.34, 0.27, 18);
    box(B.paint, 0.90, 1.22, -0.38, 0.38, GZ - 0.06, GZ + 0.18);
    cylX(B.paint, 1.30, ex[0] - 0.10, 0, GZ, 0.112, 0.092, 16);
    cylX(B.paint, ex[0] - 0.10, ex[0] + 0.08, 0, GZ, 0.092, 0.128, 16);
    cylX(B.paint, ex[0] + 0.08, ex[1] - 0.08, 0, GZ, 0.128, 0.128, 16);
    cylX(B.paint, ex[1] - 0.08, ex[1] + 0.10, 0, GZ, 0.128, 0.086, 16);
    cylX(B.paint, ex[1] + 0.10, V.gunEnd, 0, GZ, 0.086, 0.070, 14);
    cylX(B.dark, V.gunEnd - 0.04, V.gunEnd + 0.01, 0, GZ, 0.070, 0.070, 14);
    cylX(B.dark, ex[0] + 0.10, ex[0] + 0.14, 0, GZ, 0.131, 0.131, 16);   /* evacuator bands */
    cylX(B.dark, ex[1] - 0.14, ex[1] - 0.10, 0, GZ, 0.131, 0.131, 16);
    /* coaxial machine gun and the gunner's sight window */
    cylX(B.dark, 1.15, 1.75, -0.30, GZ - 0.05, 0.022, 0.022, 8);
    box(B.dark, 0.98, 1.10, 0.42, 0.62, GZ + 0.12, GZ + 0.24);
    /* infra-red searchlight: on a roof bracket just right of the gun and ahead of the loader's
       hatch (starboard photograph), lens forward, standing clear of the dome */
    box(B.dark, 0.50, 0.66, -0.50, -0.34, 0.44, 0.56);
    box(B.dark, 0.46, 0.70, -0.52, -0.32, 0.54, 0.60);
    cylX(B.paint, 0.50, 0.78, -0.42, 0.74, 0.165, 0.165, 20);
    cylX(B.dark, 0.78, 0.80, -0.42, 0.74, 0.14, 0.14, 20);
    cylX(B.dark, 0.80, 0.82, -0.42, 0.74, 0.075, 0.075, 12);
    /* small round lamp on the right front, with its guard */
    cylX(B.dark, 0.92, 1.04, -0.62, GZ + 0.30, 0.075, 0.075, 12);
    cylX(B.paint, 0.88, 0.92, -0.62, GZ + 0.30, 0.095, 0.095, 12);
    /* commander's cupola, left rear: ring, vision slits, hatch, sight */
    cylZ(B.paint, -0.35, 0.45, 0.50, 0.84, 0.26, 18);
    for (i = 0; i < 7; i++) {
      a = i * TAU / 7 + 0.3;
      box(B.dark, -0.35 + Math.cos(a) * 0.26 - 0.03, -0.35 + Math.cos(a) * 0.26 + 0.03,
          0.45 + Math.sin(a) * 0.26 - 0.03, 0.45 + Math.sin(a) * 0.26 + 0.03, 0.74, 0.80);
    }
    cylZ(B.paint, -0.35, 0.45, 0.84, 0.89, 0.215, 16);
    box(B.dark, -0.20, -0.08, 0.52, 0.64, 0.84, 0.92);
    /* AA machine gun on its pintle at the loader's hatch, right (photograph), barrel forward */
    cylZ(B.dark, -0.62, -0.70, 0.72, 0.80, 0.03, 8);
    box(B.dark, -0.72, -0.32, -0.76, -0.64, 0.78, 0.86);
    cylX(B.dark, -0.32, 0.70, -0.70, 0.90, 0.022, 0.020, 8);
    cylX(B.dark, 0.25, 0.48, -0.70, 0.90, 0.032, 0.032, 8);
    box(B.dark, -0.82, -0.72, -0.75, -0.65, 0.78, 0.86);
    /* loader's round hatch, right: ring and the hatch disc raised on its hinge */
    cylZ(B.paint, -0.40, -0.52, 0.46, 0.66, 0.24, 18);
    cylZ(B.paint, -0.40, -0.52, 0.66, 0.70, 0.21, 16);
    box(B.dark, -0.52, -0.46, -0.64, -0.40, 0.70, 0.75);
    /* round port plug in the starboard side */
    cylY(B.paint, -0.15, -1.19, -1.10, 0.30, 0.10, 14);
    cylY(B.dark, -0.15, -1.21, -1.18, 0.30, 0.055, 10);
    /* spent-case ejection port at the turret rear */
    cylX(B.paint, -1.74, -1.62, 0, 0.33, 0.125, 0.125, 16);
    cylX(B.dark, -1.76, -1.72, 0, 0.33, 0.085, 0.085, 14);
    /* roof ventilator, right rear, and the team plate on the roof */
    cylZ(B.paint, -1.00, -0.45, 0.46, 0.64, 0.13, 10);
    box(B.team, -1.10, -0.80, -0.15, 0.15, 0.53, 0.575);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.A, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), i, wg, WP, WD, tg, TB = bins(T);
    addHull(HB);
    addRunning(HB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      WP = new Bin(T.paint, true); WD = new Bin(T.dark, false);
      addWheel(WP, WD);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { paint: WP, dark: WD });
      g.add(wg);
    }
    addTurret(V, TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(V.TX, 0, V.ROOF);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e60_mbt"] = {
  len: 9.67,
  build: function (THREE, M, C) { return HeroT62.build(THREE, M, C, "A"); }
};
