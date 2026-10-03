/* ========== ru_t64.js - HERO model: T-64A main battle tank (pact_e60_t64a) ===
   The Soviet 1960s-70s tank of the Kharkiv works, drawn as the T-64A
   (Object 434, accepted 1968-69): the first 125 mm smoothbore with the
   mechanised loader, three crew.  Built so later T-64 variants (T-64B and the
   rest) can be added: dimensions, fittings and paint live in VARIANTS and
   build() takes the variant name.

   Reference photographs (Wikimedia Commons, cached in scratchpad/t64ref):
     r1 T-64A-in-the-Kubinka-Museum.jpg   port 3/4 from the front, indoors:
         six small road wheels a side, the front fenders swept down in
         curved wings over the idler, a ribbed rubber flap hanging at each
         front fender corner and large ribbed flaps standing at the rear of
         the fender, low cast turret with the long gun, a ridged bore
         evacuator and a canvas-wrapped mantlet, the smoothbore much longer
         than the hull, stowage boxes on the turret rear.
     r2 T-64A - Moscow Suvorov Military School (3).jpg   starboard 3/4 front,
         outdoors: segmented skirt plates along the rear half of the fender,
         exposed track run ahead of them, the evacuator about 60 per cent of
         the way out to the muzzle, a round infra-red searchlight at the
         mantlet beside the gun, the commander's cupola at the right rear
         (its remote 12.7 mm NSVT is later production per js/facts.js, so
         it is not drawn on this 1968 row), a gunner's hatch left, a
         headlamp on the left front fender, driver's hatch and periscopes on
         the glacis centre.
     r3 T-64A (Obiekt 434) '434' (Commons 37439429690)   port 3/4: same fender
         flaps, the cast turret's rounded plan with a box on its rear flank.
     r4 T-64A - Moscow Suvorov Military School (1.0)   front 3/4: long flat
         glacis, a row of cable brackets across it, round fender lamps, wide
         curved fenders over the tracks.
   Dimensions (published, as in armour_specs.js and facts.js): length 9.2 m
   gun forward, hull about 6.5 m, width 3.4 m over the skirts, height 2.17 m
   to the turret roof, track 580 mm, six road
   wheels of 550 mm a side, four track-return rollers, rear drive sprocket.

   NOT CONFIRMED and left out: snorkel, fuel drums, unditching beam, smoke
   grenade launchers, antenna mast, tow cable, side-skirt coverage forward of
   the middle (r2 shows the front run open), every marking and number.
   Judgement calls: the gun mount is a plain box mount with a forward barrel;
   the IR lamp and evacuator sizes are read off the photographs, not a drawing.

   Materials: PAINT (green, textured), DARK (track, wheel rims, gun fittings,
   sights), RUBBER (mud flaps; the skirt plates are painted steel as in r1/r2), team colour exactly as handed in (C.team).
   Nodes: "turret" (trains, origin on the ring centre, gun along +X) and six
   "roadwheel" groups (each holds both sides, spin about the axle; the rubber
   tyres are fixed on the hull).  Draw calls: 4 hull + 3 turret + 6 wheels = 13.

   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.
   ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroT64 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var VARIANTS = {
    A: { paint: { base: "#4d5a3a", blots: ["#435032", "#596643"], seed: 64 },
         TX: 0.30, ROOF: 1.08, gunEnd: 5.74, evac: [3.55, 4.15], skirts: true }
  };

  var TY = 1.33, TW = 0.29;                         /* track centre / half width */
  var XW = [1.97, 1.20, 0.43, -0.34, -1.11, -1.88], ZW = 0.375, RW = 0.275;
  var XR = [1.58, 0.45, -0.70, -1.80], ZR = 0.72;
  var IDL = { x: 2.78, z: 0.375, r: 0.275 }, SPR = { x: -2.72, z: 0.46, r: 0.33 };
  var PATH = [[-2.45, 0.05], [2.60, 0.05], [3.00, 0.14], [3.105, 0.375], [3.00, 0.60], [2.78, 0.71],
              [1.58, 0.87], [-1.80, 0.87], [-2.40, 0.88], [-2.72, 0.85], [-3.02, 0.72], [-3.12, 0.46],
              [-3.00, 0.20], [-2.72, 0.07]];

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
    T.rubber = new THREE.MeshStandardMaterial({ color: 0x2f302c, roughness: 0.95, metalness: 0.0 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), rubber: new Bin(T.rubber, false), team: new Bin(T.team, false) }; }
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
  /* tyre: outer wall plus the outward face only (sy = +1 or -1 is the outward Y side) */
  function tyreY(bin, cx, cz, y0, y1, ro, ri, seg, sy) {
    var i, j, c0, s0, c1, s1, yo = sy > 0 ? y1 : y0, yi = sy > 0 ? y0 : y1;
    for (i = 0; i < seg; i++) {
      j = i + 1;
      c0 = Math.cos(i / seg * TAU); s0 = Math.sin(i / seg * TAU);
      c1 = Math.cos(j / seg * TAU); s1 = Math.sin(j / seg * TAU);
      var a = [cx + c0 * ro, y0, cz + s0 * ro], b = [cx + c1 * ro, y0, cz + s1 * ro],
          d = [cx + c1 * ro, y1, cz + s1 * ro], e = [cx + c0 * ro, y1, cz + s0 * ro];
      triN(bin, a, b, d, [c0 + c1, 0, s0 + s1]); triN(bin, a, d, e, [c0 + c1, 0, s0 + s1]);
      var ia = [cx + c0 * ri, yo, cz + s0 * ri], ib = [cx + c1 * ri, yo, cz + s1 * ri],
          oa = [cx + c0 * ro, yo, cz + s0 * ro], ob = [cx + c1 * ro, yo, cz + s1 * ro];
      triN(bin, ia, ib, ob, [0, sy, 0]); triN(bin, ia, ob, oa, [0, sy, 0]);
    }
  }

  /* box mirrored to either side: ya..yb are given for the port side (positive) */
  function sbox(bin, x0, x1, ya, yb, z0, z1, p) {
    if (p > 0) box(bin, x0, x1, ya, yb, z0, z1); else box(bin, x0, x1, -yb, -ya, z0, z1);
  }

  /* ---------------------------------------------------------------- hull */
  /* stations: x, half width of the lower hull, belly, fender level, roof, half
     width of the upper hull at the fender and at the roof edge */
  var ST = [
    [-3.05, 0.95, 0.50, 0.95, 1.00, 1.18, 1.10],
    [-2.90, 1.10, 0.45, 1.00, 1.05, 1.28, 1.18],
    [ 2.10, 1.10, 0.45, 1.00, 1.08, 1.28, 1.18],
    [ 3.30, 1.00, 0.55, 0.68, 0.72, 1.12, 1.02],
    [ 3.45, 0.95, 0.50, 0.58, 0.60, 1.00, 0.95]
  ];
  function ring(S) {
    var x = S[0], w = S[1], zB = S[2], zF = S[3], zT = S[4], u0 = S[5], u1 = S[6];
    return [[x, w, zB], [x, w, zF], [x, u0, zF], [x, u1, zT], [x, -u1, zT], [x, -u0, zF], [x, -w, zF], [x, -w, zB]];
  }
  function addHull(B, V) {
    var R = ST.map(ring), i, k, k1, a, b, c, d, e, dy, dz, p, x;
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

    /* fenders: a wide shelf over the track and a wing that sweeps down over the idler (r1, r4) */
    for (p = -1; p <= 1; p += 2) {
      sbox(B.paint, -3.00, 2.10, 1.10, 1.67, 1.00, 1.06, p);
      sbox(B.paint, -3.00, 2.10, 1.64, 1.69, 0.94, 1.06, p);              /* rolled outer edge */
      sbox(B.paint, -3.04, -2.96, 1.10, 1.69, 0.70, 1.06, p);             /* rear lip           */
      belt(B.paint, 2.10, 1.03, 2.55, 0.99, p > 0 ? 1.10 : -1.67, p > 0 ? 1.67 : -1.10, 0.06);
      belt(B.paint, 2.55, 0.99, 3.00, 0.88, p > 0 ? 1.10 : -1.67, p > 0 ? 1.67 : -1.10, 0.06);
      belt(B.paint, 3.00, 0.88, 3.30, 0.76, p > 0 ? 1.10 : -1.67, p > 0 ? 1.67 : -1.10, 0.06);
      belt(B.paint, 3.30, 0.76, 3.42, 0.66, p > 0 ? 1.10 : -1.67, p > 0 ? 1.67 : -1.10, 0.06);
      /* front fender flap, hinged under the wing, and rear flaps (r1, r3): ribbed rubber in the side plane */
      sbox(B.rubber, 2.25, 3.02, 1.675, 1.700, 0.40, 0.92, p);
      for (i = 0; i < 4; i++) sbox(B.rubber, 2.38 + i * 0.19, 2.42 + i * 0.19, 1.700, 1.715, 0.44, 0.88, p);
      sbox(B.rubber, -3.00, -2.52, 1.675, 1.700, 0.28, 1.00, p);
      sbox(B.rubber, -2.46, -1.98, 1.675, 1.700, 0.28, 1.00, p);
      for (i = 0; i < 3; i++) sbox(B.rubber, -2.86 + i * 0.20, -2.82 + i * 0.20, 1.700, 1.715, 0.34, 0.95, p);
      /* segmented skirt plates over the rear half of the track run (r2) */
      if (V.skirts) {
        for (i = 0; i < 3; i++) {
          x = -1.94 + i * 1.02;
          sbox(B.paint, x, x + 0.96, 1.675, 1.700, 0.63, 1.00, p);
          sbox(B.paint, x + 0.20, x + 0.24, 1.700, 1.715, 0.66, 0.98, p);
          sbox(B.paint, x + 0.48, x + 0.52, 1.700, 1.715, 0.66, 0.98, p);
          sbox(B.paint, x + 0.76, x + 0.80, 1.700, 1.715, 0.66, 0.98, p);
        }
      }
      /* front headlamp (r2, r4) and a ribbed stowage strip on the rear fender (r4) */
      cylX(B.dark, 2.15, 2.31, p * 1.42, 1.12, 0.068, 0.068, 10);
      sbox(B.paint, 2.05, 2.15, 1.38, 1.48, 1.06, 1.14, p);
      sbox(B.paint, -2.55, -1.50, 1.30, 1.58, 1.06, 1.12, p);
      for (i = 0; i < 4; i++) sbox(B.dark, -2.45 + i * 0.26, -2.40 + i * 0.26, 1.34, 1.54, 1.12, 1.14, p);
    }
    /* turret collar on the roof */
    cylZ(B.paint, V.TX, 0, 1.02, V.ROOF + 0.04, 1.02, 24);
    /* engine deck: hatch, louvres, team panel */
    box(B.paint, -2.85, -1.55, -0.75, 0.75, 1.03, 1.10);
    box(B.dark, -2.70, -2.00, -0.50, 0.50, 1.10, 1.125);
    box(B.team, -1.95, -1.60, -0.40, 0.40, 1.098, 1.118);
    /* driver: hatch, periscopes, glacis cable brackets (r4), nose tow hooks */
    cylZ(B.paint, 2.40, 0.0, 0.93, 1.04, 0.22, 14);
    for (i = -1; i <= 1; i++) box(B.dark, 2.62, 2.72, i * 0.17 - 0.05, i * 0.17 + 0.05, 0.87, 0.95);
    for (i = 0; i < 6; i++) box(B.dark, 2.98, 3.08, -0.90 + i * 0.36, -0.82 + i * 0.36, 0.76, 0.84);
    box(B.dark, 3.45, 3.53, 0.55, 0.65, 0.52, 0.60);
    box(B.dark, 3.45, 3.53, -0.65, -0.55, 0.52, 0.60);
  }

  function addRunning(B) {
    var s, i, n = PATH.length, a, b, dx, dz, l, d, step, y, t, tot = 0, segs = [], q, rem, px, pz, k, j, ang;
    for (i = 0; i < n; i++) {
      a = PATH[i]; b = PATH[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      segs.push([a, b, l]); tot += l;
    }
    var cnt = Math.round(tot / 0.19); step = tot / cnt;
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
        belt(B.dark, px - dx * 0.05, pz - dz * 0.05, px + dx * 0.05, pz + dz * 0.05, y - TW - 0.01, y + TW + 0.01, 0.13);
      }
      /* sprocket with a toothed look (paint rim ring of 12 teeth), idler, return rollers */
      cylY(B.dark, SPR.x, y - 0.22, y + 0.22, SPR.z, SPR.r, 14);
      cylY(B.paint, SPR.x, y + s * 0.20, y + s * 0.27, SPR.z, 0.20, 12);
      for (j = 0; j < 12; j++) {
        ang = j / 12 * TAU;
        box(B.dark, SPR.x + Math.cos(ang) * SPR.r - 0.03, SPR.x + Math.cos(ang) * SPR.r + 0.03,
            y + s * 0.18 - 0.03, y + s * 0.18 + 0.03, SPR.z + Math.sin(ang) * SPR.r - 0.03, SPR.z + Math.sin(ang) * SPR.r + 0.03);
      }
      cylY(B.paint, IDL.x, y - 0.20, y + 0.20, IDL.z, IDL.r, 14);
      cylY(B.dark, IDL.x, y + s * 0.19, y + s * 0.26, IDL.z, 0.10, 10);
      for (j = 0; j < XR.length; j++) {
        cylY(B.dark, XR[j], y - 0.18, y + 0.18, ZR, 0.10, 10);
        cylY(B.paint, XR[j], y + s * 0.17, y + s * 0.21, ZR, 0.06, 8);
      }
      /* the rubber tyres of the six road wheels are fixed; the discs inside spin */
      for (j = 0; j < XW.length; j++) {
        tyreY(B.dark, XW[j], ZW, y + s * 0.07, y + s * 0.16, RW, 0.205, 14, s);
        tyreY(B.dark, XW[j], ZW, y - s * 0.16, y - s * 0.07, RW, 0.205, 14, -s);
      }
    }
  }

  function addWheel(P) {
    var s, y, k, a;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      cylY(P, 0, y + s * 0.03, y + s * 0.17, 0, 0.238, 16);                 /* painted disc  */
      cylY(P, 0, y + s * 0.17, y + s * 0.21, 0, 0.075, 8);                  /* hub cap       */
      for (k = 0; k < 6; k++) {
        a = k / 6 * TAU;
        cyl(P, [Math.cos(a) * 0.15, y + s * 0.17, Math.sin(a) * 0.15], [Math.cos(a) * 0.15, y + s * 0.19, Math.sin(a) * 0.15], 0.02, 0.02, 4);
      }
    }
  }

  /* --------------------------------------------------------------- turret */
  var PROF = [[1.00, 0.00], [1.02, 0.14], [1.01, 0.30], [0.95, 0.46], [0.82, 0.60],
              [0.60, 0.72], [0.32, 0.80], [0.0, 0.83]];
  function addDome(B) {
    var NS = 32, CX = 0.0, AF = 1.55, AR = 1.38, AY = 1.12, p = 2 / 2.7;
    var G = [], rI, j, c, s, sx, sy, pr, V = [], Nacc = [], tris = [];
    for (rI = 0; rI < PROF.length; rI++) {
      pr = PROF[rI]; G.push([]);
      for (j = 0; j < NS; j++) {
        c = Math.cos(j / NS * TAU); s = Math.sin(j / NS * TAU);
        sx = (c >= 0 ? AF : AR) * pr[0] * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), p);
        sy = AY * pr[0] * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), p);
        G[rI].push(V.length); V.push([CX + sx, sy, pr[1] * (1 - 0.30 * Math.max(c, 0))]); Nacc.push([0, 0, 0]);
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
    var GZ = 0.52, i, a, p;
    addDome(B);
    /* cast mantlet, rounded front */
    box(B.paint, 1.20, 1.62, -0.38, 0.38, GZ - 0.22, GZ + 0.16);
    cylX(B.paint, 1.58, 1.84, 0, GZ, 0.29, 0.20, 16);
    /* the 125 mm smoothbore with its bore evacuator (r1, r2) */
    cylX(B.paint, 1.80, V.evac[0], 0, GZ, 0.112, 0.088, 14);
    cylX(B.paint, V.evac[0], V.evac[0] + 0.08, 0, GZ, 0.088, 0.110, 14);
    cylX(B.paint, V.evac[0] + 0.08, V.evac[1], 0, GZ, 0.110, 0.110, 14);
    cylX(B.paint, V.evac[1], V.evac[1] + 0.12, 0, GZ, 0.110, 0.076, 14);
    cylX(B.paint, V.evac[1] + 0.12, V.gunEnd, 0, GZ, 0.076, 0.071, 12);
    cylX(B.dark, V.gunEnd - 0.06, V.gunEnd + 0.0, 0, GZ, 0.074, 0.074, 12);
    /* infra-red searchlight on the port side of the gun, with its cover (r2) */
    box(B.paint, 1.30, 1.58, 0.40, 0.76, GZ - 0.16, GZ + 0.22);
    cylX(B.paint, 1.58, 1.78, 0.58, GZ + 0.03, 0.185, 0.185, 16);
    cylX(B.dark, 1.775, 1.80, 0.58, GZ + 0.03, 0.14, 0.14, 14);
    /* commander's cupola right rear (r2); the remote 12.7 mm NSVT came with
     later production (js/facts.js), so this 1968 row has none */
    cylZ(B.paint, -0.45, -0.55, 0.52, 0.82, 0.30, 16);
    cylZ(B.paint, -0.45, -0.55, 0.82, 0.87, 0.26, 14);
    for (i = 0; i < 6; i++) {
      a = i * TAU / 6 + 0.3;
      box(B.dark, -0.45 + Math.cos(a) * 0.30 - 0.03, -0.45 + Math.cos(a) * 0.30 + 0.03,
          -0.55 + Math.sin(a) * 0.30 - 0.03, -0.55 + Math.sin(a) * 0.30 + 0.03, 0.70, 0.78);
    }
    /* gunner's hatch, left, with two periscopes ahead of it */
    cylZ(B.paint, -0.25, 0.56, 0.52, 0.86, 0.27, 16);
    cylZ(B.paint, -0.25, 0.56, 0.86, 0.91, 0.23, 14);
    box(B.dark, 0.12, 0.22, 0.46, 0.56, 0.78, 0.84);
    box(B.dark, 0.12, 0.22, 0.62, 0.72, 0.78, 0.84);
    /* stowage boxes on the rear flanks (r1, r3) and an antenna pedestal */
    for (p = -1; p <= 1; p += 2) {
      sbox(B.paint, -1.15, -0.38, 0.98, 1.24, 0.22, 0.52, p);
      sbox(B.dark, -1.00, -0.96, 1.20, 1.28, 0.26, 0.48, p);
      sbox(B.dark, -0.62, -0.58, 1.20, 1.28, 0.26, 0.48, p);
    }
    cylZ(B.dark, -0.95, 0.80, 0.68, 0.78, 0.055, 8);
    /* team plate on the roof behind the hatches */
    box(B.team, -0.95, -0.62, -0.20, 0.20, 0.77, 0.815);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.A, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), i, wg, WP, tg, TB = bins(T);
    addHull(HB, V);
    addRunning(HB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      WP = new Bin(T.paint, true);
      addWheel(WP);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { paint: WP });
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

UNIT_MODELS["pact_e60_t64a"] = {
  len: 9.2,
  build: function (THREE, M, C) { return HeroT64.build(THREE, M, C, "A"); }
};
