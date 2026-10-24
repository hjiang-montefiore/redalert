/* ============ ru_2s19.js - HERO models: the 2S19 Msta-S 152 mm self-propelled howitzer
   Four keys: pact_e80_spg (2S19, 1989), pact_e90_spg (2S19, the 1990s),
   pact_e00_spg (2S19M2, 2013) and spg_p (present day, the row named "2S19
   Msta-S").  Redo of 2026-10-24 to the full-quality procedure.

   Sources
     A  Commons "Msta-S.jpg": a 2S19 on a plinth in Yekaterinburg, right side
        almost square on, gun raised: the side station table below is
        measured off it, scaled on the published 7.15 m hull and 2.99 m height
        (both give 88 px/m; the road-wheel spacing corrected for the camera
        being nearer the nose).
     B  "SPG 2S19M2 Msta-S on Oboronexpo in 2014 (front view)" and
     C  "... (reart view 1)" (Vitaly V. Kuzmin): front three-quarter and left
        rear three-quarter of a 2S19M2.
     D  "2S19M2 on RAE-2013 2" (front, gun level), E "Alabino22042016-38"
        (2S19M2 on parade, left front three-quarter, gun level),
     F  "2S19M1 Msta-S - Oboronexpo2014part1-26/27/29" (running gear, left
        side, the gun raised).
     ru.wikipedia "2S19": hull geometry, engine (V-84A), transmission and
        drives are the T-72's; the torsion bars and road wheels were redrawn
        from the T-80's; six pairs of rubber-tyred road wheels and FIVE pairs
        of return rollers, sprocket at the rear, idler at the front; ring
        2444 mm; length gun forward 11 917 mm; width 3380; gauge 2800;
        clearance 450; base 4520; 12.7 mm NSVT; 2S19M1 (FCS, adopted 2008)
        and 2S19M2 (2A64M2, new FCS, 2012-13).  en.wikipedia: hull 7.15 m,
        height 2.99 m, dozer blade, snorkel, 81 mm smoke launchers; the
        2S19M1 added a GLONASS antenna.

   Recognition list (what shows at game zoom, and where it rests)
     1  a T-72-geometry hull: long shallow upper glacis to a sharp nose,
        lower glacis with the dozer blade, flat deck, fenders the full
        length [A, B, D]
     2  six large rubber-tyred road wheels a side, the front three widely
        spaced and the rear three close together [A, F]
     3  rear drive sprocket and front idler both set high, the track
        climbing to them; five return rollers [A, ru.wikipedia]
     4  the huge box turret over the rear two thirds, almost hull wide, its
        tail flush with the hull tail [A, C]
     5  the long roof chamfer down the turret tail and the steep sloped
        front plate [A]
     6  the round cradle drum in the turret face on the trunnion [A, B]
     7  the 2A64: a thick recoil sleeve out of the drum, a long thin tube,
        bore evacuator past the middle, the slotted muzzle brake [A, B, D, E]
     8  the commander's cupola, right front, with the 12.7 mm NSVT on top
        [B, D, E]
     9  two blocks of three smoke dischargers each side of the gun on the
        upright cheek face [B, D, E]
    10  the ammunition-loading tray folded up on the turret tail [C,
        ru.wikipedia "2S19 Msta-S 1.jpg"]
    11  the gunner's sight hood, left front of the roof [B, D]
    12  2S19M2 only: steel side skirts over the upper track run [D, E]

   Side station table (metres; x from the hull centre, + forward; z up)
     hull rear -3.575, nose edge 3.575 (7.15); deck 1.58; fender 1.30;
     upper glacis from x 1.80 z 1.56 to the nose edge z 1.02; lower glacis
     to the belly (z 0.45) at x 3.00.
     road wheels x 1.95 0.96 -0.09 -0.97 -1.71 -2.45, centre z 0.44, r 0.37
     idler x 2.62 z 0.86 r 0.28; sprocket x -3.20 z 0.80 r 0.32
     turret: tail -3.03, roof 2.99 from x -2.40 to 0.58, roof slope to
     x 1.02 z 2.45, the near-upright cheek face to x 1.18 (D), its outer
     corners turned back to a half width of 1.38; body half width 1.62,
     roof chamfered in 0.26; trunnion (drum centre) x 0.99 z 2.40, drum
     r 0.44; muzzle x 8.34 (overall 11.96 with the tow eyes, published
     11.917); ring centre x -0.70 (estimated: no drawing gives it).

   Paint (sampled, taken to about 0.8):  the plinth vehicle (A) is a museum
   repaint, so the Soviet 1989 row takes the Soviet green the T-72 hero uses
   (#4f5a3a); the 1990s row the same green weathered (#4c553a).  2S19M2 at
   Oboronexpo (B, C) #5d5d58 / #5b676b in sky light and on parade (E)
   #46494b -> #4b5045; the present-day row the T-72B3's green-grey #4b5145.
   The RAE-2013 sand camouflage (D) is a show scheme and is not drawn.  No
   numbers, stripes or stars.

   Corrections to the old file: the running gear (high idler and sprocket,
   uneven wheel spacing, five return rollers, 0.74 m wheels), the turret
   (it reaches the hull tail; the roof chamfer at the tail; the cradle drum),
   the smoke dischargers (in the turret face, not on the roof), the hull
   (it was a T-80 profile with a long engine deck behind the turret; the
   2S19's hull geometry is the T-72's and the turret covers its rear).  The
   old header gave the 2S19M1/M2 changes as inside only: right for the shape
   except the M2's skirts and the M1's GLONASS antenna (no row is an M1).
   NOT confirmed, so not drawn: the travel lock A-frame on the glacis (in
   the photographs it is raised to the barrel for transport; the game trains
   the gun), the snorkel stowage, a splash board, the Nakidka cover.

   One whip aerial up on the roof tail, left (D, F).
   Nodes: "turret" (ring centre, gun along +X), "barrel" (on the trunnion,
   inside the turret), six "roadwheel" groups (the wheel discs of a station,
   both sides; the tyres are rings of revolution and stay in the hull).
   Team colour is the plain C.team material on the turret roof tail and the
   front fender tops.  Model space +X nose, +Y left, +Z up, metres, tracks
   on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMsta = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  var VARIANTS = {
    e80: { skirts: false, paint: { base: "#4f5a3a", tone: ["#566141", "#475233"], seed: 1989 } },
    e90: { skirts: false, paint: { base: "#4c553a", tone: ["#545c41", "#444c33"], seed: 1995 } },
    e00: { skirts: true,  paint: { base: "#4b5045", tone: ["#53584c", "#43483e"], seed: 2013 } },
    e20: { skirts: false, paint: { base: "#4b5145", tone: ["#52584c", "#43493d"], seed: 2020 } }
  };

  /* station table: see the header */
  var XR = -3.575, XN = 3.575, ZD = 1.58, ZF = 1.30;
  var XW = [1.95, 0.96, -0.09, -0.97, -1.71, -2.45], ZW = 0.44, RW = 0.37;
  var TY = 1.40, TW = 0.29;
  var XI = 2.62, ZI = 0.86, RI = 0.28;
  var XS = -3.20, ZS = 0.80, RS = 0.32;
  var TX = -0.70, TZ = ZD;
  var TRX = 0.99, TRZ = 2.40, MUZ = 8.34;

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* one bin of triangles per material; a painted bin also gets planar UVs in
     metres from the dominant axis of each face, so the paint never stretches */
  function Bin(mat, uv, k) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.k = k || 0.34; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, k = this.k, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * k, q[1] * k);
        else if (ay >= ax) this.U.push(q[0] * k, q[2] * k);
        else this.U.push(q[1] * k, q[2] * k);
      }
    }
  };

  /* a closed solid: the signed volume says whether the faces point out */
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
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
  /* mirrored pair of boxes about y = 0 (y0 < y1 on the +Y side) */
  function box2(bin, x0, x1, y0, y1, z0, z1) { box(bin, x0, x1, y0, y1, z0, z1); box(bin, x0, x1, -y1, -y0, z0, z1); }
  /* a box on a tilted frame: origin P0, axes U, W, N */
  function planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1) {
    function pt(u, w, h) {
      return [P0[0] + U[0] * u + W[0] * w + N[0] * h, P0[1] + U[1] * u + W[1] * w + N[1] * h,
              P0[2] + U[2] * u + W[2] * w + N[2] * h];
    }
    hexa(bin, [pt(u0, w0, h0), pt(u1, w0, h0), pt(u1, w1, h0), pt(u0, w1, h0),
               pt(u0, w0, h1), pt(u1, w0, h1), pt(u1, w1, h1), pt(u0, w1, h1)]);
  }
  /* a slab along a line in the XZ plane, thickness th, across y0..y1 */
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz) || 1, nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
  /* a capped cylinder or cone between two centres, smooth round the side */
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
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }
  function sphere(bin, cx, cy, cz, r, sg, st) {
    var V = [], F = [], i, j, a, b;
    V.push([cx, cy, cz + r]);
    for (j = 1; j < st; j++) for (i = 0; i < sg; i++) {
      a = j / st * Math.PI; b = i / sg * TAU;
      V.push([cx + r * Math.sin(a) * Math.cos(b), cy + r * Math.sin(a) * Math.sin(b), cz + r * Math.cos(a)]);
    }
    V.push([cx, cy, cz - r]);
    var last = V.length - 1;
    for (i = 0; i < sg; i++) {
      F.push([0, 1 + i, 1 + (i + 1) % sg]);
      F.push([last, 1 + (st - 2) * sg + (i + 1) % sg, 1 + (st - 2) * sg + i]);
    }
    for (j = 0; j < st - 2; j++) for (i = 0; i < sg; i++) {
      a = 1 + j * sg + i; b = 1 + j * sg + (i + 1) % sg;
      F.push([a, a + sg, b + sg], [a, b + sg, b]);
    }
    solid(bin, V, F);
  }
  /* LOFT: cross-sections in the YZ plane at stations along X, every section
     the same number of points, joined in order and capped by a fan from its
     centre.  The winding is made consistent here and the signed volume in
     solid() turns the whole skin outward. */
  function loft(bin, S) {
    var V = [], F = [], n = S[0].p.length, m = S.length, i, k, k1, c0, c1;
    for (i = 0; i < m; i++) for (k = 0; k < n; k++) V.push([S[i].x, S[i].p[k][0], S[i].p[k][1]]);
    for (i = 0; i + 1 < m; i++) for (k = 0; k < n; k++) {
      k1 = (k + 1) % n;
      F.push([i * n + k, i * n + k1, (i + 1) * n + k1], [i * n + k, (i + 1) * n + k1, (i + 1) * n + k]);
    }
    c0 = V.length; V.push([S[0].x, S[0].c[0], S[0].c[1]]);
    c1 = V.length; V.push([S[m - 1].x, S[m - 1].c[0], S[m - 1].c[1]]);
    for (k = 0; k < n; k++) {
      k1 = (k + 1) % n;
      F.push([c0, k1, k]);
      F.push([c1, (m - 1) * n + k, (m - 1) * n + k1]);
    }
    solid(bin, V, F);
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function canvasTex(THREE, key, draw) {
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      draw(cv.getContext("2d"));
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  /* hull paint: one green per period, soft tonal patches, plate seams and
     rain streaks; one tile is 2.94 m of surface */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "msta" + P.base + P.seed, function (q) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      for (k = 0; k < P.tone.length; k++) {
        q.fillStyle = P.tone[k];
        for (i = 0; i < 7; i++) {
          x = R() * 256; y = R() * 256; w = 30 + R() * 60;
          q.globalAlpha = 0.45; q.beginPath(); q.ellipse(x, y, w, w * (0.4 + R() * 0.5), R() * 3, 0, TAU); q.fill();
        }
      }
      q.globalAlpha = 1;
      q.strokeStyle = "rgba(20,22,16,0.35)"; q.lineWidth = 1.2;
      for (i = 0; i < 4; i++) {
        q.beginPath(); q.moveTo(i * 64 + 0.5, 0); q.lineTo(i * 64 + 0.5, 256); q.stroke();
        q.beginPath(); q.moveTo(0, i * 64 + 32.5); q.lineTo(256, i * 64 + 32.5); q.stroke();
      }
      for (i = 0; i < 90; i++) {
        q.fillStyle = (i % 3) ? "rgba(18,18,12,0.08)" : "rgba(235,230,205,0.06)";
        q.fillRect(R() * 256, R() * 256, 1 + R() * 3, 8 + R() * 40);
      }
      for (i = 0; i < 40; i++) {
        q.fillStyle = "rgba(10,10,8,0.18)";
        q.fillRect(R() * 256, R() * 256, 2, 2);
      }
    });
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x26282a, roughness: 0.8, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             team: new Bin(T.team, false) };
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
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }
  /* move every vertex of a set of bins into a child frame at (dx, 0, dz);
     painted UVs stay where they were laid, so the paint does not jump */
  function shift(B, dx, dz) {
    var k, b, i;
    for (k in B) {
      b = B[k];
      for (i = 0; i < b.P.length; i += 3) { b.P[i] -= dx; b.P[i + 2] -= dz; }
    }
  }

  /* ---------------------------------------------------------------- hull */
  /* one hull cross-section: belly between the tracks (wl), the sponsons out
     over the tracks from zs to the deck at full width wu, chamfer ch */
  function hsec(x, zb, zs, zt, ch) {
    var wl = 1.06, wu = 1.60;
    return { x: x, c: [0, (zb + zt) / 2], p: [[-wl, zb], [wl, zb], [wl, zs], [wu, zs], [wu, zt - ch], [wu - ch, zt],
                                              [-(wu - ch), zt], [-wu, zt - ch], [-wu, zs], [-wl, zs]] };
  }
  function addHull(V, B) {
    var Pn = B.paint, D = B.dark, G = B.glass, Tm = B.team, i, s, k, x;
    /* the station table, nose to tail (A; the nose from B and D) */
    loft(Pn, [
      hsec(XN, 0.98, 1.00, 1.04, 0.02),        /* nose edge: upper and lower glacis meet */
      hsec(3.48, 0.84, 1.04, 1.08, 0.02),
      hsec(3.25, 0.60, 1.10, 1.15, 0.03),
      hsec(3.00, 0.45, 1.17, 1.23, 0.03),      /* foot of the lower glacis */
      hsec(2.50, 0.45, 1.26, 1.36, 0.04),
      hsec(1.80, 0.45, 1.28, 1.56, 0.05),      /* top of the upper glacis */
      hsec(1.60, 0.45, 1.28, ZD, 0.05),
      hsec(-3.30, 0.45, 1.28, ZD, 0.05),
      hsec(-3.50, 0.55, 1.28, 1.55, 0.04),
      hsec(XR, 0.62, 1.28, 1.50, 0.03)          /* the tail plate leans in */
    ]);
    for (s = -1; s <= 1; s += 2) {
      /* fenders the full length, their front ends turned down over the idler */
      box(Pn, -3.52, 3.25, s > 0 ? 1.58 : -1.71, s > 0 ? 1.71 : -1.58, ZF - 0.025, ZF + 0.012);
      belt(Pn, 3.25, ZF - 0.006, 3.60, 1.13, s * 1.58, s * 1.71, 0.035);
      box(D, 3.56, 3.60, s > 0 ? 1.30 : -1.70, s > 0 ? 1.70 : -1.30, 0.86, 1.13);     /* rubber mud flaps */
      box(Pn, -3.58, -3.52, s > 0 ? 1.30 : -1.71, s > 0 ? 1.71 : -1.30, 1.00, ZF + 0.012);   /* rear mudguards */
      /* the stiffening lip under each fender */
      box(Pn, -3.50, 3.24, s > 0 ? 1.69 : -1.71, s > 0 ? 1.71 : -1.69, ZF - 0.08, ZF - 0.02);
      /* headlamp pair on the glacis by the fender, tow eyes on the nose */
      cyl(G, [3.02, s * 1.30, 1.31], [3.10, s * 1.30, 1.29], 0.07, 0.07, 10);
      box(D, 2.96, 3.03, s * 1.30 - 0.09, s * 1.30 + 0.09, 1.27, 1.36);
      cyl(D, [3.53, s * 0.62, 0.86], [3.53, s * 0.62 + 0.001, 0.86], 0.09, 0.09, 6, true);
      box(D, 3.50, 3.62, s * 0.62 - 0.05, s * 0.62 + 0.05, 0.80, 0.92);
      /* rear: tail lights and tow eyes */
      box(D, XR - 0.04, XR, s * 1.35 - 0.08, s * 1.35 + 0.08, 1.30, 1.40);
      box(D, XR - 0.04, XR, s * 0.75 - 0.06, s * 0.75 + 0.06, 0.62, 0.78);
      /* team flash on the fender tops at the front */
      box(Tm, 2.70, 3.10, s > 0 ? 1.22 : -1.52, s > 0 ? 1.52 : -1.22, ZF + 0.012, ZF + 0.022);
    }
    /* driver's hatch and his three periscopes, centred on the glacis (B, D) */
    cylZ(Pn, 2.05, 0, 1.50, 1.60, 0.30, 20);
    cylZ(Pn, 2.05, 0, 1.60, 1.64, 0.24, 18);
    for (k = -1; k <= 1; k++) box(G, 2.34, 2.40, k * 0.17 - 0.06, k * 0.17 + 0.06, 1.42, 1.50);
    /* the dozer blade folded on the lower glacis, with its ribs (B, D) */
    belt(Pn, 3.66, 0.52, 3.56, 0.95, -1.12, 1.12, 0.05);
    for (k = -2; k <= 2; k++) belt(Pn, 3.60, 0.56, 3.40, 0.86, k * 0.48 - 0.03, k * 0.48 + 0.03, 0.06);
    box(D, 3.62, 3.70, -1.12, 1.12, 0.50, 0.55);
    /* engine deck behind the turret tail: grille, louvres and filler caps */
    box(D, -3.48, -3.08, -1.20, 1.20, ZD - 0.01, ZD + 0.015);
    for (k = 0; k < 6; k++) box(Pn, -3.46 + k * 0.065, -3.43 + k * 0.065, -1.18, 1.18, ZD + 0.01, ZD + 0.04);
    cylZ(D, -3.30, 1.38, ZD, ZD + 0.05, 0.08, 10);
    cylZ(D, -3.30, -1.38, ZD, ZD + 0.05, 0.08, 10);
    /* the turret ring collar */
    cylZ(D, TX, 0, ZD - 0.01, ZD + 0.04, 1.30, 32);
    /* plate seams along the upper hull side */
    for (s = -1; s <= 1; s += 2) {
      for (x = -2.6; x < 1.8; x += 1.1) box(D, x, x + 0.02, s > 0 ? 1.60 : -1.605, s > 0 ? 1.605 : -1.60, ZF + 0.02, ZD - 0.04);
    }
  }

  /* --------------------------------------------------------- running gear */
  function addRunning(V, B, WB) {
    var D = B.dark, Pn = B.paint, i, s, k, an, yc, ya, yb;
    var h = 0.035, path = [];
    /* the belt centre line: ground run, up round the sprocket, the top run
       on the return rollers, round the idler and down to the front wheel */
    path.push([XW[0] + 0.12, h]);
    path.push([XW[5] - 0.10, h]);
    for (k = 0; k <= 10; k++) {
      an = -Math.PI * 0.42 - k / 10 * Math.PI * 1.08;
      path.push([XS + Math.cos(an) * (RS + h), ZS + Math.sin(an) * (RS + h)]);
    }
    for (k = 0; k <= 8; k++) {
      an = Math.PI * 0.5 - k / 8 * Math.PI * 0.82;
      path.push([XI + Math.cos(an) * (RI + h), ZI + Math.sin(an) * (RI + h)]);
    }
    for (s = -1; s <= 1; s += 2) {
      yc = s * TY; ya = yc - TW; yb = yc + TW;
      for (i = 0; i < path.length; i++) {
        var p0 = path[i], p1 = path[(i + 1) % path.length];
        belt(D, p0[0], p0[1], p1[0], p1[1], ya, yb, 0.07);
      }
      /* track shoes with their centre guide horns, ground run and top run */
      for (i = 0; i < 27; i++) {
        var gx = XW[5] - 0.05 + i * 0.165;
        if (gx > XW[0] + 0.10) break;
        box(D, gx, gx + 0.09, ya - 0.01, yb + 0.01, 0.0, 0.085);
        box(D, gx, gx + 0.05, yc - 0.04, yc + 0.04, 0.07, 0.17);
      }
      var t0 = [XS, ZS + RS + h], t1 = [XI, ZI + RI + h], tl = Math.sqrt((t1[0] - t0[0]) * (t1[0] - t0[0]) + (t1[1] - t0[1]) * (t1[1] - t0[1]));
      for (i = 0; i < 35; i += 2) {
        var f = (0.10 + i * 0.165) / tl;
        if (f > 0.98) break;
        var tx = t0[0] + (t1[0] - t0[0]) * f, tz = t0[1] + (t1[1] - t0[1]) * f;
        box(D, tx, tx + 0.09, ya - 0.01, yb + 0.01, tz + 0.01, tz + 0.05);
      }
      /* drive sprocket, rear: toothed rings either side of a hub (A, C) */
      cylY(D, XS, yc - 0.20, yc + 0.20, ZS, RS - 0.05, 22);
      cylY(Pn, XS, yc + s * 0.20, yc + s * 0.23, ZS, 0.17, 14);
      for (i = 0; i < 14; i++) {
        var ta = i / 14 * TAU;
        cyl(D, [XS + Math.cos(ta) * (RS - 0.03), yc - 0.19, ZS + Math.sin(ta) * (RS - 0.03)],
               [XS + Math.cos(ta) * (RS - 0.03), yc + 0.19, ZS + Math.sin(ta) * (RS - 0.03)], 0.04, 0.04, 5);
      }
      /* idler, front: a spoked dish on a crank (A) */
      cylY(D, XI, yc - 0.21, yc + 0.21, ZI, RI, 20);
      cylY(Pn, XI, yc + s * 0.21, yc + s * 0.23, ZI, RI - 0.06, 16);
      for (k = 0; k < 6; k++) {
        var sa = k / 6 * TAU;
        box(D, XI + Math.cos(sa) * 0.13 - 0.03, XI + Math.cos(sa) * 0.13 + 0.03,
            s > 0 ? yc + 0.23 : yc - 0.25, s > 0 ? yc + 0.25 : yc - 0.23, ZI + Math.sin(sa) * 0.13 - 0.03, ZI + Math.sin(sa) * 0.13 + 0.03);
      }
      belt(D, XI, ZI, XI - 0.42, ZI - 0.12, s * 1.06, s * 1.12, 0.10);
      /* five return rollers (ru.wikipedia) under the top run */
      for (i = 0; i < 5; i++) cylY(D, 1.55 - i * 1.02, yc - 0.13, yc + 0.13, 1.04, 0.085, 10);
      /* road-wheel tyres: rings of revolution, so they stay in the hull;
         the shock absorbers on the first, second and sixth stations */
      for (i = 0; i < XW.length; i++) {
        cylY(D, XW[i], yc - 0.235, yc - 0.035, ZW, RW, 22);
        cylY(D, XW[i], yc + 0.035, yc + 0.235, ZW, RW, 22);
        cylY(D, XW[i], yc - 0.30, yc + 0.30, ZW, 0.06, 8);
        if (i === 0 || i === 1 || i === 5) belt(D, XW[i] - 0.05, ZW + 0.10, XW[i] - 0.30, 0.98, s * 1.08, s * 1.13, 0.07);
      }
    }
    /* the road-wheel discs: a dished plate, a ring of bolts and the hub,
       one group a station holding both sides (A, F) */
    for (i = 0; i < XW.length; i++) {
      for (s = -1; s <= 1; s += 2) {
        var y0 = s * TY, wb = WB[i];
        cylY(wb, 0, y0 - 0.245, y0 - 0.03, 0, RW - 0.07, 20);
        cylY(wb, 0, y0 + 0.03, y0 + 0.245, 0, RW - 0.07, 20);
        cylY(wb, 0, y0 + s * 0.245, y0 + s * 0.265, 0, RW - 0.14, 18);
        cylY(wb, 0, y0 + s * 0.265, y0 + s * 0.30, 0, 0.10, 12);
        for (k = 0; k < 6; k++) {
          var ba = k / 6 * TAU + 0.2, bx = Math.cos(ba) * 0.165, bz = Math.sin(ba) * 0.165;
          box(wb, bx - 0.018, bx + 0.018, s > 0 ? y0 + 0.245 : y0 - 0.27, s > 0 ? y0 + 0.27 : y0 - 0.245, bz - 0.018, bz + 0.018);
        }
      }
    }
    /* 2S19M2: steel skirts over the upper run, in panels (D, E) */
    if (V.skirts) {
      for (s = -1; s <= 1; s += 2) {
        for (k = 0; k < 6; k++) {
          var sx = 3.20 - k * 1.08;
          box(Pn, sx - 1.06, sx, s > 0 ? 1.705 : -1.73, s > 0 ? 1.73 : -1.705, 0.80, ZF - 0.02);
          box(D, sx - 0.02, sx, s > 0 ? 1.73 : -1.735, s > 0 ? 1.735 : -1.73, 0.82, ZF - 0.04);
        }
        for (k = 0; k + 1 < XW.length; k++) {
          var gx2 = (XW[k] + XW[k + 1]) / 2;
          box(Pn, gx2 - 0.14, gx2 + 0.14, s > 0 ? 1.705 : -1.73, s > 0 ? 1.73 : -1.705, 0.66, 0.81);
        }
      }
    }
  }

  /* -------------------------------------------------------------- turret */
  /* section: body half width hw from the floor z0 to the shoulder zc, then
     the roof chamfer in by rin to the roof zt (A, B) */
  function tsec(x, hw, z0, zc, zt, rin) {
    return { x: x, c: [0, (z0 + zt) / 2], p: [[-hw, z0], [hw, z0], [hw, zc], [hw - rin, zt], [-(hw - rin), zt], [-hw, zc]] };
  }
  function addTurret(V, B) {
    var P = B.paint, D = B.dark, G = B.glass, Tm = B.team, i, s, k, a;
    var Z0 = 1.62, ZR = 2.99;
    loft(P, [
      tsec(-3.03, 1.56, Z0, 2.62, 2.68, 0.05),   /* tail face */
      tsec(-2.97, 1.60, Z0, 2.70, 2.80, 0.10),
      tsec(-2.40, 1.62, Z0, 2.72, ZR, 0.26),     /* the tail chamfer reaches the roof */
      tsec(0.58, 1.62, Z0, 2.72, ZR, 0.26),      /* roof meets the sloped front */
      tsec(0.80, 1.59, Z0, 2.68, 2.72, 0.05),
      tsec(1.02, 1.51, Z0, 2.42, 2.45, 0.03),    /* foot of the roof slope (A, D) */
      tsec(1.18, 1.38, Z0, 1.70, 1.73, 0.02)     /* the cheek face, near upright, its
                                                    outer corner turned back (B, D) */
    ]);
    /* the cradle drum on the trunnion and the gun-port shield round it (A, B) */
    cylY(P, TRX, -0.56, 0.56, TRZ, 0.44, 28);
    cylY(D, TRX, -0.58, -0.56, TRZ, 0.30, 16);
    cylY(D, TRX, 0.56, 0.58, TRZ, 0.30, 16);
    box(P, 0.70, 1.20, -0.60, 0.60, 1.70, 2.05);
    /* smoke dischargers: two blocks of three tubes a side on the upright
       cheek face, either side of the cradle (B, D, E) */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 2; i++) {
        var by0 = 0.70 + i * 0.36;
        box(P, 1.05, 1.13, s > 0 ? by0 : -(by0 + 0.30), s > 0 ? by0 + 0.30 : -by0, 2.04, 2.36);
        for (k = 0; k < 3; k++) {
          var sy = s * (by0 + 0.05 + k * 0.10);
          cyl(D, [1.10, sy, 2.20], [1.33, sy, 2.26], 0.042, 0.042, 8);
        }
      }
      box(D, 1.10, 1.16, s > 0 ? 0.66 : -1.40, s > 0 ? 1.40 : -0.66, 1.98, 2.03);
    }
    /* commander's cupola, right front, with vision blocks and the NSVT (B, D, E) */
    var CX = -0.05, CY = -0.85;
    cylZ(P, CX, CY, ZR - 0.02, ZR + 0.18, 0.40, 24);
    cylZ(D, CX, CY, ZR + 0.18, ZR + 0.21, 0.33, 20);
    cylZ(P, CX - 0.06, CY, ZR + 0.21, ZR + 0.26, 0.27, 18);
    for (k = 0; k < 7; k++) {
      a = -1.4 + k * 0.47;
      box(G, CX + Math.cos(a) * 0.395 - 0.04, CX + Math.cos(a) * 0.395 + 0.04, CY + Math.sin(a) * 0.395 - 0.06, CY + Math.sin(a) * 0.395 + 0.06, ZR + 0.07, ZR + 0.14);
    }
    box(P, CX + 0.22, CX + 0.46, CY - 0.17, CY + 0.17, ZR + 0.04, ZR + 0.30);      /* TKN-3 sight hood */
    box(G, CX + 0.46, CX + 0.475, CY - 0.12, CY + 0.12, ZR + 0.14, ZR + 0.25);
    box(D, CX - 0.30, CX + 0.12, CY - 0.10, CY + 0.10, ZR + 0.26, ZR + 0.40);       /* NSVT cradle */
    box(D, CX - 0.45, CX + 0.30, CY - 0.06, CY + 0.06, ZR + 0.40, ZR + 0.52);       /* receiver */
    cylX(D, CX + 0.30, CX + 1.30, CY, ZR + 0.46, 0.022, 6);
    cylX(D, CX + 1.10, CX + 1.30, CY, ZR + 0.46, 0.035, 8);
    box(D, CX - 0.30, CX - 0.05, CY + 0.07, CY + 0.25, ZR + 0.30, ZR + 0.46);        /* ammunition box */
    /* gunner's sight hood, left front of the roof (B, D) */
    box(P, 0.10, 0.48, 0.55, 0.95, ZR - 0.01, ZR + 0.24);
    box(G, 0.48, 0.495, 0.62, 0.88, ZR + 0.08, ZR + 0.20);
    cylZ(P, -0.35, 0.72, ZR - 0.01, ZR + 0.07, 0.30, 20);                             /* gunner's hatch */
    /* loaders' hatches, ventilator and the AP-18D exhaust on the roof tail */
    cylZ(P, -1.70, 0.70, ZR - 0.01, ZR + 0.06, 0.29, 20);
    cylZ(P, -1.70, -0.70, ZR - 0.01, ZR + 0.06, 0.29, 20);
    cylZ(D, -1.70, 0.70, ZR + 0.06, ZR + 0.08, 0.10, 10);
    cylZ(D, -1.70, -0.70, ZR + 0.06, ZR + 0.08, 0.10, 10);
    cylZ(P, -1.05, 0.0, ZR - 0.01, ZR + 0.12, 0.17, 14);
    cylZ(P, -1.05, 0.0, ZR + 0.12, ZR + 0.16, 0.22, 14);
    /* aerial bases on the roof tail; lifting eyes */
    cylZ(D, -2.20, 1.05, ZR - 0.01, ZR + 0.12, 0.05, 8);
    cylZ(D, -2.20, -1.05, ZR - 0.01, ZR + 0.12, 0.05, 8);
    cyl(D, [-2.20, 1.05, ZR + 0.12], [-2.24, 1.05, ZR + 1.70], 0.012, 0.008, 4);   /* one whip up (D, F) */
    for (s = -1; s <= 1; s += 2) {
      cylY(D, 0.30, s * 1.30, s * 1.30 + 0.02, ZR + 0.06, 0.08, 10);
      cylY(D, -2.10, s * 1.30, s * 1.30 + 0.02, ZR + 0.06, 0.08, 10);
    }
    /* team flash on the roof tail, facing up */
    box(Tm, -2.35, -1.95, -0.30, 0.30, ZR - 0.005, ZR + 0.008);
    /* flanks: the side door, grab rails, a port and stowage brackets (A, C) */
    for (s = -1; s <= 1; s += 2) {
      var yo = s * 1.62, yo2 = s * 1.635;
      box(P, -0.85, -0.10, Math.min(yo, yo2), Math.max(yo, yo2), 1.86, 2.50);
      box(D, -0.82, -0.13, s > 0 ? 1.635 : -1.645, s > 0 ? 1.645 : -1.635, 2.47, 2.49);
      box(D, -0.82, -0.13, s > 0 ? 1.635 : -1.645, s > 0 ? 1.645 : -1.635, 1.87, 1.89);
      cyl(D, [-0.60, s * 1.65, 2.30], [-0.35, s * 1.65, 2.30], 0.018, 0.018, 6);
      cylY(D, -2.00, yo, s * 1.65, 2.20, 0.13, 14);
      cylY(P, -2.00, s * 1.65, s * 1.665, 2.20, 0.10, 14);
      for (k = 0; k < 4; k++) cyl(D, [-2.70 + k * 0.60, s * 1.67, 2.62], [-2.40 + k * 0.60, s * 1.67, 2.62], 0.018, 0.018, 6);
      box(P, -2.85, -2.30, s > 0 ? 1.62 : -1.72, s > 0 ? 1.72 : -1.62, 1.70, 2.05);   /* box by the tail */
    }
    /* tail: the two conveyor doors and the loading tray folded up (C) */
    box(D, -3.05, -3.03, -0.95, -0.05, 1.70, 2.55);
    box(D, -3.05, -3.03, 0.05, 0.95, 1.70, 2.55);
    for (s = -1; s <= 1; s += 2) {
      var ry = s > 0 ? -0.22 : -0.92;
      cyl(D, [-3.16, ry, 1.68], [-3.10, ry, 2.92], 0.035, 0.035, 6);
    }
    for (k = 0; k < 5; k++) box(D, -3.17 + k * 0.012, -3.10 + k * 0.012, -0.92, -0.22, 1.80 + k * 0.25, 1.83 + k * 0.25);
    box(P, -3.15, -3.08, -0.88, -0.26, 1.75, 2.85);
  }

  /* -------------------------------------------------------------- barrel */
  /* in the barrel frame: origin on the trunnion, +X the bore (A, B, D, E) */
  function addBarrel(B) {
    var P = B.paint, D = B.dark, L = MUZ - TRX, bl = 0.74, br = 0.20, k, s;
    var t0 = 1.60, t1 = L - bl;
    cylX(P, 0.30, t0, 0, 0, 0.235, 24);                       /* recoil sleeve */
    cyl(P, [t0, 0, 0], [t0 + 0.12, 0, 0], 0.235, 0.15, 24);
    cyl(P, [t0 + 0.12, 0, 0], [t1, 0, 0], 0.135, 0.105, 22);  /* the tube tapers */
    var ev = t0 + 0.60 * (t1 - t0);                            /* bore evacuator */
    cyl(P, [ev - 0.45, 0, 0], [ev - 0.33, 0, 0], 0.12, 0.17, 22);
    cylX(P, ev - 0.33, ev + 0.33, 0, 0, 0.17, 22);
    cyl(P, [ev + 0.33, 0, 0], [ev + 0.43, 0, 0], 0.17, 0.115, 22);
    /* the muzzle brake: a block with two ports a side, slotted baffles */
    cylX(D, t1 - 0.04, t1 + 0.06, 0, 0, 0.14, 18);
    cylX(P, t1 + 0.06, L, 0, 0, br, 22);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 2; k++) {
        var px = t1 + 0.16 + k * 0.30;
        box(D, px, px + 0.20, s > 0 ? br - 0.06 : -br - 0.012, s > 0 ? br + 0.012 : -br + 0.06, -0.10, 0.10);
      }
    }
    cylX(D, L - 0.012, L + 0.0, 0, 0, 0.09, 14);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.e80, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), WB = [], i, wg, tg, bg, TB = bins(T), BB = bins(T);
    g.name = "ru_2s19_" + which;
    for (i = 0; i < XW.length; i++) WB.push(new Bin(T.paint, true));
    addHull(V, HB);
    addRunning(V, HB, WB);
    var hull = new THREE.Group(); hull.name = "hull";
    flush(THREE, hull, HB);
    g.add(hull);
    for (i = 0; i < XW.length; i++) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { paint: WB[i] });
      g.add(wg);
    }
    addTurret(V, TB);
    shift(TB, TX, TZ);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, TZ);
    flush(THREE, tg, TB);
    addBarrel(BB);
    bg = new THREE.Group();
    bg.name = "barrel";
    bg.position.set(TRX - TX, 0, TRZ - TZ);
    flush(THREE, bg, BB);
    tg.add(bg);
    g.add(tg);
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e80_spg"] = { len: 11.96, build: function (THREE, M, C) { return HeroMsta.build(THREE, M, C, "e80"); } };
UNIT_MODELS["pact_e90_spg"] = { len: 11.96, build: function (THREE, M, C) { return HeroMsta.build(THREE, M, C, "e90"); } };
UNIT_MODELS["pact_e00_spg"] = { len: 11.96, build: function (THREE, M, C) { return HeroMsta.build(THREE, M, C, "e00"); } };
UNIT_MODELS["spg_p"] = { len: 11.96, build: function (THREE, M, C) { return HeroMsta.build(THREE, M, C, "e20"); } };
