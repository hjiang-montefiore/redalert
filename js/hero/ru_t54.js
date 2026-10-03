/* ========== ru_t54.js - HERO model: T-54A medium tank (pact_e50_mbt) ======
   The Soviet 1950s medium tank, drawn as the 1955 T-54A (the version that
   added gun stabilisation in the vertical plane; the stabiliser is internal
   and nothing in the outline shows it).  Built so a T-55 variant can be added
   later: the dimensions, fittings and paint live in VARIANTS, and build()
   takes the variant name.

   Reference photographs (Wikimedia Commons, cached in scratchpad/t54ref):
     T-54-batey-haosef-2.jpg  pure side view of a T-54 in Israel: five large
                              road wheels with the wider gap after the first,
                              rear drive sprocket, front idler, NO return
                              rollers, the track running on the wheel tops,
                              hemispherical cast turret with a cast mantlet,
                              fender stowage boxes.
     T-54-2-4540.JPG          Russian museum T-54/T-55, front three-quarter
                              from starboard: the long 100 mm gun with a
                              bore evacuator, curved front fenders, a fender
                              stowage box and a cylindrical tank on the right
                              fender, a light-green Soviet finish, a pintle
                              on the turret roof.
   Dimensions (published, as in armour_specs.js): length 9.0 m gun forward,
   hull 6.45 m over the tracks, width 3.27 m, height 2.40 m to the turret
   roof, track 580 mm, five road wheels of about 830 mm a side.

   Check pass, T-54A specific (Commons, cached in scratchpad/t54ref2):
     T-54A (Model 1953) '537' and T-54A in the Kubinka Tank Museum (port
     3/4 views): fenders are a flat shelf about a third of a metre above the
     track tops, the front ends angled wings sweeping down over the first
     road wheel; headlamp on the left front fender; long stowage boxes on the
     fenders; low smooth cast dome with the highest point behind the middle
     and a lower front; the 100 mm D-10TG gun with a bore evacuator that runs
     out to near the muzzle (about 70-95 per cent of the barrel, short narrower
     stub beyond); DShK on the loader's hatch, right; no snorkel, no
     unditching beam.  T-54A in Prague (3/4 from the front): wide flat glacis,
     driver's hatch left of centre ahead of the turret.

   NOT CONFIRMED and so left out: infra-red lights, the snorkel, rear fuel
   drums, unditching beam, radio antenna, external fuel tanks (the two side
   photographs show none on the starboard fender; the first draft's two tanks
   are removed), tow cable and any markings.  Judgement calls: the evacuator
   span is read off the 3/4 views, not a drawing; the loader's DShK is a
   simple pintle mount with the gun pointing forward.

   Three materials: PAINT (green, textured), DARK (track, rubber, gun fittings,
   sights), and the team colour exactly as handed in (C.team, so the era kit
   can repaint it).  Nodes: "turret" (trains), five "roadwheel" groups (each
   holds both sides, spin about the axle).  Draw calls: 3 hull + 3 turret + 10
   wheel = 16.

   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.
   ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroT54 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var VARIANTS = {
    A: { paint: { base: "#4f5c3b", blots: ["#44502f", "#5b6644"], seed: 54 },
         TX: 0.40, ROOF: 1.50, gunEnd: 5.45, evac: [4.20, 5.02] }
  };

  var TY = 1.345, TW = 0.29;                        /* track centre / half width */
  var XW = [1.60, 0.62, -0.23, -1.08, -1.93], ZW = 0.51, RW = 0.41;
  var IDL = { x: 2.90, z: 0.47, r: 0.30 }, SPR = { x: -2.72, z: 0.60, r: 0.31 };
  var PATH = [[-2.30, 0.05], [2.55, 0.05], [3.08, 0.16], [3.26, 0.47], [3.08, 0.78], [2.60, 0.93],
              [1.60, 0.97], [-1.90, 0.97], [-2.45, 0.98], [-2.92, 0.88], [-3.09, 0.60], [-2.92, 0.28], [-2.62, 0.10]];

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
  /* stations: x, half width of the lower hull, belly, fender level, roof, half
     width of the upper hull at the fender and at the roof edge */
  var ST = [
    [-3.12, 0.90, 0.56, 1.14, 1.24, 1.00, 0.96],
    [-2.95, 1.04, 0.46, 1.33, 1.45, 1.08, 1.02],
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

    /* fenders: a flat shelf at 1.33 m (about a third of a metre above the track tops in
       the side photographs), the front ends sweeping down and forward as angled wings */
    for (p = -1; p <= 1; p += 2) {
      var y0 = p > 0 ? 1.05 : -1.66, y1 = p > 0 ? 1.66 : -1.05;
      box(B.paint, -3.02, 2.05, y0, y1, 1.30, 1.37);
      belt(B.paint, 2.05, 1.35, 2.50, 1.28, y0, y1, 0.07);
      belt(B.paint, 2.50, 1.28, 2.88, 1.08, y0, y1, 0.07);
      belt(B.paint, 2.88, 1.08, 3.16, 0.80, y0, y1, 0.07);
      belt(B.paint, 3.16, 0.80, 3.26, 0.66, y0, y1, 0.07);
      box(B.paint, -3.02, -2.96, p > 0 ? 1.36 : -1.66, p > 0 ? 1.66 : -1.36, 1.12, 1.37);   /* rear fender lip */
    }
    /* stowage boxes on both fenders (side photographs); right fender: one short cylinder
       beside the turret as in the Moscow-area museum photograph; no tanks are drawn */
    box(B.paint, -0.55, 0.40, 1.40, 1.62, 1.37, 1.57);
    box(B.paint, 0.80, 1.75, 1.45, 1.62, 1.37, 1.50);
    box(B.paint, -2.25, -1.35, 1.42, 1.62, 1.37, 1.55);
    box(B.paint, -1.25, -0.70, 1.42, 1.62, 1.37, 1.52);
    box(B.paint, -2.30, -1.30, -1.62, -1.40, 1.37, 1.59);
    box(B.paint, -1.20, -0.70, -1.62, -1.42, 1.37, 1.50);
    box(B.paint, 0.50, 1.70, -1.60, -1.45, 1.37, 1.50);
    cylX(B.paint, -0.65, -0.15, -1.20, 1.45, 0.07, 0.07, 10);
    [-2.10, -1.80, -0.95].forEach(function (x) { box(B.dark, x - 0.03, x + 0.03, 1.40, 1.64, 1.37, 1.43); });
    [-2.00, -1.10].forEach(function (x) { box(B.dark, x - 0.03, x + 0.03, -1.64, -1.40, 1.37, 1.43); });
    /* engine deck: hatch, louvres, team panel */
    box(B.paint, -2.70, -1.60, -0.60, 0.60, 1.47, 1.53);
    box(B.dark, -2.60, -1.90, -0.40, 0.40, 1.53, 1.545);
    box(B.team, -1.52, -1.10, -0.36, 0.36, 1.47, 1.495);
    box(B.team, -2.92, -2.56, 1.45, 1.62, 1.37, 1.39);
    box(B.team, -2.92, -2.56, -1.62, -1.45, 1.37, 1.39);
    /* driver: hatch and two periscopes, left of centre; headlamp left fender */
    cylZ(B.paint, 1.92, 0.55, 1.46, 1.58, 0.22, 14);
    box(B.dark, 1.96, 2.04, 0.44, 0.52, 1.58, 1.62);
    box(B.dark, 1.96, 2.04, 0.58, 0.66, 1.58, 1.62);
    cylX(B.dark, 2.46, 2.58, 1.22, 1.44, 0.08, 0.08, 10);
    box(B.dark, 2.40, 2.48, 1.19, 1.25, 1.35, 1.40);
    /* tow hooks on the nose */
    box(B.dark, 3.28, 3.36, 0.55, 0.65, 0.66, 0.74);
    box(B.dark, 3.28, 3.36, -0.65, -0.55, 0.66, 0.74);
  }

  function addRunning(B) {
    var s, i, n = PATH.length, a, b, dx, dz, l, d, step, acc, y, t, tot = 0, segs = [], q, rem, px, pz, k;
    for (i = 0; i < n; i++) {
      a = PATH[i]; b = PATH[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      segs.push([a, b, l]); tot += l;
    }
    var cnt = Math.round(tot / 0.27); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.10);
      /* track blocks laid along the loop at the pitch of every other link */
      acc = 0; q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        belt(B.dark, px - dx * 0.05, pz - dz * 0.05, px + dx * 0.05, pz + dz * 0.05, y - TW - 0.01, y + TW + 0.01, 0.14);
      }
      /* sprocket (rear) and idler (front) */
      cylY(B.dark, SPR.x, y - 0.21, y + 0.21, SPR.z, SPR.r, 14);
      cylY(B.paint, SPR.x, y + s * 0.19, y + s * 0.25, SPR.z, 0.16, 10);
      cylY(B.paint, IDL.x, y - 0.20, y + 0.20, IDL.z, IDL.r, 14);
      cylY(B.dark, IDL.x, y + s * 0.19, y + s * 0.26, IDL.z, 0.10, 10);
    }
  }

  function addWheel(P, D) {
    var s, y, TYs;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      cylY(P, 0, y - 0.25, y + 0.25, 0, 0.355, 20);                    /* painted twin discs   */
      cylY(D, 0, y - 0.255, y - 0.16, 0, RW, 20);                      /* rubber rims          */
      cylY(D, 0, y + 0.16, y + 0.255, 0, RW, 20);
      cylY(D, 0, y + s * 0.23, y + s * 0.30, 0, 0.09, 10);             /* hub cap              */
      cylY(P, 0, y + s * 0.25, y + s * 0.28, 0, 0.17, 12);
    }
  }

  /* --------------------------------------------------------------- turret */
  var PROF = [[1.00, 0.00], [1.025, 0.10], [1.03, 0.26], [1.00, 0.40], [0.92, 0.52],
              [0.78, 0.62], [0.56, 0.68], [0.30, 0.71], [0.0, 0.72]];
  function addDome(B) {
    var NS = 32, CX = -0.12, AF = 1.25, AR = 1.55, AY = 1.08, p = 2 / 2.4;
    var G = [], rI, j, c, s, sx, sy, pr, f, V = [], Nacc = [], tris = [], r;
    for (rI = 0; rI < PROF.length; rI++) {
      pr = PROF[rI]; G.push([]);
      for (j = 0; j < NS; j++) {
        c = Math.cos(j / NS * TAU); s = Math.sin(j / NS * TAU);
        sx = (c >= 0 ? AF : AR) * pr[0] * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), p);
        sy = AY * pr[0] * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), p);
        G[rI].push(V.length); V.push([CX + sx, sy, pr[1] * (1 - 0.16 * Math.max(c, 0))]); Nacc.push([0, 0, 0]);
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
    /* the apex ring is one point repeated: the second face of each pair above collapses harmlessly */
    var NN = Nacc.map(unit);
    tris.forEach(function (t) {
      var A = V[t[0]], Bv = V[t[1]], Cv = V[t[2]];
      if (cross(sub(Bv, A), sub(Cv, A)).every(function (q) { return Math.abs(q) < 1e-9; })) return;
      B.paint.tri(A, Bv, Cv, NN[t[0]], NN[t[1]], NN[t[2]]);
    });
  }

  function addTurret(V, B) {
    var GZ = 0.46, i, a;
    addDome(B);
    /* cast mantlet and the gun */
    cylX(B.paint, 0.80, 1.30, 0, GZ, 0.33, 0.26, 16);
    box(B.paint, 0.90, 1.20, -0.36, 0.36, GZ - 0.05, GZ + 0.18);
    cylX(B.paint, 1.28, V.evac[0] - 0.05, 0, GZ, 0.105, 0.088, 14);
    cylX(B.paint, V.evac[0] - 0.05, V.evac[0] + 0.10, 0, GZ, 0.088, 0.116, 14);
    cylX(B.paint, V.evac[0] + 0.10, V.evac[1], 0, GZ, 0.116, 0.116, 14);
    cylX(B.paint, V.evac[1], V.evac[1] + 0.18, 0, GZ, 0.116, 0.066, 14);
    cylX(B.paint, V.evac[1] + 0.18, V.gunEnd, 0, GZ, 0.068, 0.064, 12);
    cylX(B.dark, V.gunEnd - 0.05, V.gunEnd + 0.01, 0, GZ, 0.064, 0.064, 12);
    /* coaxial machine gun and gunner's sight window */
    cylX(B.dark, 1.15, 1.75, -0.30, GZ - 0.05, 0.022, 0.022, 8);
    box(B.dark, 0.98, 1.10, 0.36, 0.56, GZ + 0.12, GZ + 0.24);
    /* commander's cupola, left rear: ring, vision slits, hatch */
    cylZ(B.paint, -0.30, 0.42, 0.50, 0.88, 0.27, 16);
    for (i = 0; i < 6; i++) {
      a = i * TAU / 6 + 0.3;
      box(B.dark, -0.30 + Math.cos(a) * 0.27 - 0.03, -0.30 + Math.cos(a) * 0.27 + 0.03,
          0.42 + Math.sin(a) * 0.27 - 0.03, 0.42 + Math.sin(a) * 0.27 + 0.03, 0.78, 0.84);
    }
    cylZ(B.paint, -0.30, 0.42, 0.88, 0.93, 0.22, 14);
    box(B.dark, -0.32, -0.20, 0.44, 0.56, 0.93, 0.99);
    /* loader's hatch, right, with the DShK on its pintle */
    cylZ(B.paint, -0.35, -0.46, 0.50, 0.82, 0.25, 16);
    cylZ(B.paint, -0.35, -0.46, 0.82, 0.86, 0.21, 14);
    cylZ(B.dark, -0.20, -0.46, 0.86, 0.98, 0.03, 8);
    box(B.dark, -0.42, 0.02, -0.52, -0.40, 0.98, 1.09);
    cylX(B.dark, 0.02, 1.05, -0.46, 1.03, 0.022, 0.020, 8);
    cylX(B.dark, 0.60, 0.80, -0.46, 1.03, 0.032, 0.032, 8);
    box(B.dark, -0.62, -0.42, -0.50, -0.42, 0.97, 1.05);
    /* roof ventilator, right rear, and the team plate on the roof behind the cupolas */
    cylZ(B.paint, -0.85, -0.55, 0.48, 0.72, 0.13, 10);
    box(B.team, -0.80, -0.50, -0.20, 0.20, 0.68, 0.715);
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

UNIT_MODELS["pact_e50_mbt"] = {
  len: 9.0,
  build: function (THREE, M, C) { return HeroT54.build(THREE, M, C, "A"); }
};
