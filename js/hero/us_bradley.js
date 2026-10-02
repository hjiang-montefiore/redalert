/* ============ us_bradley.js - HERO models: the M2 Bradley family ============
   The US Army's infantry fighting vehicle in four guises:
     nato_e80_ifv   M2 Bradley          (1981)  the plain hull, trim vane, firing ports
     nato_e90_ifv   M2A2 ODS            (1993)  spaced-laminate hull, ELRF sight, armour tiles
     nato_e00_ifv   M2A3                (2000)  commander's independent viewer, IBAS sight
     ifv_n          M2A3, present day           same vehicle, olive, full armour-tile kit

   What has to read at a glance (reference photographs: the M2 at REFORGER 1985,
   right side; the M2A2 ODS-SA in tan at Fort Indiantown Gap; M2A2 hulls with
   armour tiles on display in Moscow; M2A3s at Fort Irwin; the table of
   dimensions in the Hunnicutt / FM 3-22.1 figures):
     - A tall slab-sided aluminium box: flat roof 1.93 m up over the whole troop
       compartment, then ONE long sloped glacis down to a blunt nose, with the
       engine louvres on the right of it and the driver's hatch on the left.
     - SIX road wheels a side on 0.66 m centres, nearly touching, the drive
       sprocket at the FRONT and raised, the idler at the rear, three return
       rollers, side skirts that stop at the wheel tops.
     - The turret sits on the roof offset to the RIGHT. 25 mm M242 Bushmaster
       dead centre, twin TOW launcher on the turret's LEFT side, smoke
       launchers on the front corners.
     - M2: trim vane folded on the glacis, two firing ports a side.  The A2
       dropped both ("the new armour eliminated the trim vane and covered up
       the side firing ports"), added spaced-laminate skirts and the rounded
       stowage shield behind the turret, and carries reactive tiles bolted to
       the hull sides.  The ODS adds the eye-safe laser rangefinder to the
       gunner's sight.  The A3's tell is the commander's independent viewer,
       standing tall at the right rear of the turret, beside the IBAS sight.

   Published figures used (length x width x height over the commander's hatch):
     M2   6.45 x 3.20 x 2.97 m, ground clearance 0.46 m
     ODS  6.55 x 3.28 (3.60 with the armour kit) x 3.02 m
     M2A3 6.55 x 3.28 (3.60 with the armour kit) x 3.30 m, clearance 0.38 m

   Built from a handful of primitives per MATERIAL: the hull, the turret and
   each pair of road wheels are separate nodes ("turret", "roadwheel"), every
   node carries one mesh per material, so a Bradley costs 14 draw calls where
   the parametric one cost 150-170.  Team colour is the plain C.team material,
   on the roof panels, the nose and the sponson tops.

   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.
   ASCII only: a stray byte in a hex literal has broken this project before.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBradley = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  /* ------------------------------------------------------------ variants */
  var VARIANTS = {
    M2:  { len: 6.45, sk: 1.60, rf: 1.30, gc: 0.46, turret: "A0", brat: 0, vane: true,
           paint: { base: "#4b5537", blots: ["#2b3022", "#58503a"], seed: 11 } },
    A2:  { len: 6.55, sk: 1.64, rf: 1.38, gc: 0.46, turret: "A2", brat: 1, vane: false,
           paint: { base: "#a89369", blots: ["#907d58"], seed: 23 } },
    A3:  { len: 6.55, sk: 1.64, rf: 1.38, gc: 0.38, turret: "A3", brat: 2, vane: false,
           paint: { base: "#9c8f70", blots: ["#867750"], seed: 37 } },
    A3N: { len: 6.55, sk: 1.64, rf: 1.38, gc: 0.38, turret: "A3", brat: 3, vane: false,
           paint: { base: "#4e5b3c", blots: ["#3a472d", "#5c5b3d"], seed: 41 } }
  };

  /* road wheel stations, nose to tail: 0.66 m pitch, 0.60 m tyres */
  var XW = [1.45, 0.79, 0.13, -0.53, -1.19, -1.85], ZW = 0.40, RW = 0.30;
  var TY = 1.30;                         /* track centre line, each side  */
  var TX = 0.30, TYC = -0.45, TZ = 1.93; /* turret ring: right of centre  */

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* one bin of triangles per material; the painted bin also gets planar UVs
     taken from the dominant axis of each face, so camouflage never stretches */
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

  /* a closed solid: whatever order the corners came in, the signed volume
     says whether the faces point out, and they are turned if they do not */
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
    return vol;
  }

  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  /* a box turned about Z: centre (cx, cy), half sizes hx (along ang), hy */
  function rbox(bin, cx, cy, hx, hy, ang, z0, z1) {
    var c = Math.cos(ang), s = Math.sin(ang), k, q = [[-hx, -hy], [hx, -hy], [hx, hy], [-hx, hy]], P = [];
    for (k = 0; k < 8; k++) {
      var e = q[k % 4];
      P.push([cx + e[0] * c - e[1] * s, cy + e[0] * s + e[1] * c, k < 4 ? z0 : z1]);
    }
    hexa(bin, P);
  }
  /* a box on a tilted plane: origin P0, in-plane axes U and W, normal N */
  function planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1) {
    function pt(u, w, h) {
      return [P0[0] + U[0] * u + W[0] * w + N[0] * h, P0[1] + U[1] * u + W[1] * w + N[1] * h,
              P0[2] + U[2] * u + W[2] * w + N[2] * h];
    }
    hexa(bin, [pt(u0, w0, h0), pt(u1, w0, h0), pt(u1, w1, h0), pt(u0, w1, h0),
               pt(u0, w0, h1), pt(u1, w0, h1), pt(u1, w1, h1), pt(u0, w1, h1)]);
  }
  /* a slab along a line in the XZ plane, thickness th, spanning y0..y1: track runs */
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz), nx = -dz / l * th / 2, nz = dx / l * th / 2;
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

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function paintTex(THREE, P) {
    var key = P.base + P.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), s = P.seed >>> 0, i, k, a, x, y, rr, ang, rd;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 9; i++) {
          x = R() * 256; y = R() * 256; rr = 16 + R() * 34;
          q.beginPath();
          for (a = 0; a < 7; a++) {
            ang = a / 7 * TAU; rd = rr * (0.55 + R() * 0.7);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
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

  /* four materials and no more: PAINT (textured), DARK (track, rubber, gun,
     grilles), GLASS (sights, vision blocks) and the team colour, exactly as
     handed in, so the era kit can leave it alone when this hull stands in */
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false),
             glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
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

  /* ---------------------------------------------------------------- hull */
  /* The hull is ONE loft of ten-point cross sections: lower hull between the
     tracks, the sponson shelf over them, the sloped upper side plate, the
     roof.  Four stations: tail, the break of the roof, the foot of the glacis
     and the nose.  The glacis is one plane from (roof, x 1.35) to the nose. */
  function addHull(V, B, WB) {
    var HW = V.len / 2, SK = V.sk, RF = V.rf, GC = V.gc, TW = 0.16;
    var slope = 1.01 / (HW - 1.35), phi = Math.atan(slope), cp = Math.cos(phi), sp = Math.sin(phi);
    function zGl(x) { return 0.92 + (HW - x) * slope; }
    var st = [
      { x: -HW,       zB: GC + 0.09, zSB: 0.98, zST: 1.70, zT: 1.93, w: 1.03, s: SK,        r: RF },
      { x: 1.35,      zB: GC + 0.04, zSB: 0.98, zST: 1.70, zT: 1.93, w: 1.03, s: SK,        r: RF },
      { x: HW - 0.45, zB: GC + 0.02, zSB: 0.84, zST: zGl(HW - 0.45) - 0.22, zT: zGl(HW - 0.45), w: 1.03, s: SK - 0.03, r: RF - 0.05 },
      { x: HW,        zB: 0.65,      zSB: 0.70, zST: 0.82, zT: 0.92, w: 0.98, s: SK - 0.12, r: RF - 0.12 }
    ];
    var Vt = [], F = [], i, k, n = 10, s, r;
    function ring(S) {
      return [[S.x, S.w, S.zB], [S.x, S.w, S.zSB], [S.x, S.s, S.zSB], [S.x, S.s, S.zST], [S.x, S.r, S.zT],
              [S.x, -S.r, S.zT], [S.x, -S.s, S.zST], [S.x, -S.s, S.zSB], [S.x, -S.w, S.zSB], [S.x, -S.w, S.zB]];
    }
    for (i = 0; i < st.length; i++) { var rg = ring(st[i]); for (k = 0; k < n; k++) Vt.push(rg[k]); }
    for (i = 0; i + 1 < st.length; i++) {
      for (k = 0; k < n; k++) {
        var k1 = (k + 1) % n, a0 = i * n + k, a1 = i * n + k1, b0 = (i + 1) * n + k, b1 = (i + 1) * n + k1;
        F.push([a0, a1, b1], [a0, b1, b0]);
      }
    }
    function cap(base, idx, dir) {
      var ids = idx.map(function (q) { return base + q; }), j;
      var nv = cross(sub(Vt[ids[1]], Vt[ids[0]]), sub(Vt[ids[2]], Vt[ids[0]]));
      if (nv[0] * dir < 0) ids.reverse();
      for (j = 1; j + 1 < ids.length; j++) F.push([ids[0], ids[j], ids[j + 1]]);
    }
    cap(0, [0, 1, 8, 9], -1); cap(0, [4, 5, 6, 7, 8, 1, 2, 3], -1);
    cap((st.length - 1) * n, [0, 1, 8, 9], 1); cap((st.length - 1) * n, [4, 5, 6, 7, 8, 1, 2, 3], 1);
    solid(B.paint, Vt, F);

    /* rear ramp: the door in the tail plate, standing a hair proud */
    box(B.paint, -HW - 0.04, -HW, -0.95, 0.95, 0.66, 1.84);
    box(B.dark, -HW - 0.05, -HW - 0.03, -0.70, 0.70, 1.02, 1.07);
    box(B.dark, -HW - 0.05, -HW - 0.03, -0.70, 0.70, 1.52, 1.57);

    /* the glacis plane: u runs up the slope from the nose, w across it */
    var P0 = [HW, 0, 0.92], U = [-cp, 0, sp], W = [0, 1, 0], N = [sp, 0, cp];
    function gb(bin, u0, u1, w0, w1, h0, h1) { planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1); }
    /* engine louvres, front right, and the driver's hatch, front left */
    gb(B.dark, 0.70, 1.62, -1.02, -0.18, 0.0, 0.03);
    for (i = 0; i < 4; i++) gb(B.paint, 0.80 + i * 0.22, 0.88 + i * 0.22, -1.00, -0.20, 0.02, 0.07);
    cylZ(B.paint, 2.15, 0.62, 1.30, 1.70, 0.27, 14);
    cylZ(B.dark, 2.15, 0.62, 1.70, 1.74, 0.20, 12);
    for (i = 0; i < 3; i++) box(B.glass, 2.40, 2.46, 0.62 - 0.17 + i * 0.17, 0.62 - 0.17 + i * 0.17 + 0.12, 1.46, 1.56);
    if (V.vane) {
      /* the trim vane, folded flat on the glacis: M2 and M2A1 only */
      gb(B.paint, 0.18, 1.55, -1.02, 1.02, 0.0, 0.06);
      gb(B.dark, 1.55, 1.62, -1.02, 1.02, 0.0, 0.08);
      gb(B.team, 0.55, 0.95, 0.30, 0.90, 0.06, 0.075);
      gb(B.team, 0.55, 0.95, -0.90, -0.30, 0.06, 0.075);
    } else {
      gb(B.team, 0.30, 0.70, 0.30, 0.90, 0.0, 0.015);
      gb(B.team, 0.30, 0.70, -0.90, -0.30, 0.0, 0.015);
      /* the ODS and later put a driver's thermal viewer ahead of the hatch */
      box(B.dark, 2.50, 2.66, 0.50, 0.74, 1.30, 1.44);
      box(B.glass, 2.66, 2.68, 0.52, 0.72, 1.33, 1.41);
    }
    /* headlight clusters at the corners of the nose */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, HW - 0.13, HW - 0.01, s * (SK - 0.60) - 0.14, s * (SK - 0.60) + 0.14, 0.68, 0.88);
      box(B.glass, HW - 0.02, HW + 0.005, s * (SK - 0.60) - 0.10, s * (SK - 0.60) + 0.10, 0.72, 0.84);
    }

    /* roof: two troop hatches, the tail ID panel, the turret race, aerials */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -2.30, -1.32, s > 0 ? 0.12 : -1.02, s > 0 ? 1.02 : -0.12, 1.93, 1.975);
      box(B.dark, -1.90, -1.78, s * 0.57 - 0.10, s * 0.57 + 0.10, 1.975, 1.995);
      cylZ(B.dark, -HW + 0.32, s * (RF - 0.14), 1.93, 2.00, 0.05, 8);
      cylZ(B.dark, -HW + 0.32, s * (RF - 0.14), 2.00, 3.20, 0.011, 6);
    }
    box(B.team, -3.08, -2.42, -1.0, 1.0, 1.93, 1.945);
    cylZ(B.dark, TX, TYC, 1.93, 1.99, Math.min(0.96, RF + TYC - 0.01), 28);   /* the race stays inside the roof edge */

    /* sponson tops: a team strip along each sloped upper side plate */
    for (s = -1; s <= 1; s += 2) {
      var dy = RF - SK, ln = Math.sqrt(dy * dy + 0.23 * 0.23);
      planeBox(B.team, [0, s * SK, 1.70], [1, 0, 0], [0, s * dy / ln, 0.23 / ln], [0, s * 0.23 / ln, -dy / ln],
               -2.70, -1.60, 0.06, ln - 0.06, 0.0, 0.012);
    }

    /* side skirts, five panels a side, hung from the sponson shelf */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 5; i++) {
        var sx = -2.95 + i * 0.93;
        box(B.paint, sx, sx + 0.88, s > 0 ? SK - 0.05 : -SK, s > 0 ? SK : -SK + 0.05, 0.58, 0.97);
      }
    }

    /* M2: two round firing ports a side, high on the rear half of the hull
       (the REFORGER 1985 photograph of the right side shows exactly two), and
       the row of bolt-on brackets that later carries the A2's armour.  The A2
       covered the ports up.  A2 and later: reactive tiles on the hull sides */
    if (V.turret === "A0") {
      for (s = -1; s <= 1; s += 2) {
        for (i = 0; i < 2; i++) {
          cylY(B.dark, -2.55 + i * 1.05, s * SK, s * (SK + 0.02), 1.58, 0.10, 12);
          cylY(B.glass, -2.55 + i * 1.05, s * (SK + 0.015), s * (SK + 0.025), 1.58, 0.06, 10);
        }
        for (i = 0; i < 9; i++) box(B.dark, -2.85 + i * 0.50, -2.79 + i * 0.50, s * SK, s * (SK + 0.02), 1.02, 1.22);
      }
    } else {
      var rows = V.brat >= 2 ? 2 : 1;
      for (s = -1; s <= 1; s += 2) {
        for (r = 0; r < rows; r++) {
          box(B.dark, -HW + 0.28, 1.25, s > 0 ? SK : -SK - 0.05, s > 0 ? SK + 0.05 : -SK, 0.99 + r * 0.355, 1.325 + r * 0.355);
          for (i = 0; i < 9; i++) {
            var tx0 = -HW + 0.30 + i * 0.465, tz0 = 0.99 + r * 0.355;
            box(B.paint, tx0, tx0 + 0.42, s > 0 ? SK : -SK - TW, s > 0 ? SK + TW : -SK, tz0, tz0 + 0.335);
          }
        }
      }
    }

    /* running gear, both sides */
    for (s = -1; s <= 1; s += 2) {
      var yc = s * TY, ya = yc - 0.265, yb = yc + 0.265;
      var path = [[1.80, 0.045], [-2.90, 0.045], [-3.12, 0.42], [-2.80, 0.78], [-1.00, 0.90],
                  [2.60, 1.04], [3.08, 0.72], [3.00, 0.52]];
      for (i = 0; i < path.length; i++) {
        var p = path[i], q = path[(i + 1) % path.length];
        belt(B.dark, p[0], p[1], q[0], q[1], ya, yb, 0.09);
      }
      /* track pads: ribs across the lower run so it reads as a track, not a slab */
      for (i = 0; i < 30; i++) {
        var rx = -2.80 + i * 0.152;
        box(B.dark, rx, rx + 0.07, s > 0 ? yb : ya - 0.02, s > 0 ? yb + 0.02 : ya, 0.0, 0.10);
      }
      /* idler at the rear, three return rollers, the raised sprocket forward */
      cylY(B.dark, -2.78, yc - 0.20, yc + 0.20, 0.42, 0.28, 20);
      cylY(B.dark, -2.78, yc - 0.23, yc + 0.23, 0.42, 0.13, 12);
      for (i = 0; i < 3; i++) cylY(B.dark, -1.95 + i * 1.70, yc - 0.15, yc + 0.15, 0.80, 0.10, 10);
      cylY(B.dark, 2.75, yc - 0.20, yc + 0.20, 0.70, 0.26, 20);
      cylY(B.dark, 2.75, yc - 0.24, yc + 0.24, 0.70, 0.12, 12);
      for (i = 0; i < 12; i++) {
        var ta = i / 12 * TAU, tx = 2.75 + Math.cos(ta) * 0.29, tz = 0.70 + Math.sin(ta) * 0.29;
        box(B.dark, tx - 0.04, tx + 0.04, yc - 0.17, yc + 0.17, tz - 0.04, tz + 0.04);
      }
    }
    /* road wheels: one node per station, both sides together, so the engine
       spins the pair about their common axle */
    for (i = 0; i < XW.length; i++) {
      for (s = -1; s <= 1; s += 2) {
        var y0 = s * TY;
        cylY(WB[i], 0, y0 - 0.225, y0 - 0.035, 0, RW, 20);
        cylY(WB[i], 0, y0 + 0.035, y0 + 0.225, 0, RW, 20);
        cylY(WB[i], 0, y0 - 0.245, y0 + 0.245, 0, 0.165, 12);
        for (k = 0; k < 5; k++) {
          var ba = k / 5 * TAU + 0.3, bx = Math.cos(ba) * 0.105, bz = Math.sin(ba) * 0.105;
          box(WB[i], bx - 0.022, bx + 0.022, y0 + s * 0.235, y0 + s * 0.275, bz - 0.022, bz + 0.022);
        }
      }
    }
  }

  /* -------------------------------------------------------------- turret */
  /* Local frame: origin on the ring centre, z = 0 on the hull roof, gun along
     +X.  The group is named "turret" and the engine trains it about Z. */
  function addTurret(V, TB) {
    var P = TB.paint, D = TB.dark, G = TB.glass, T = TB.team;
    var kind = V.turret, A0 = kind === "A0", A3 = kind === "A3", i, s, a, k;
    var xb0 = A0 ? -1.10 : -1.15, xb1 = A0 ? 1.00 : 1.05, wb = A0 ? 0.86 : 0.90;
    var xt0 = A0 ? -1.05 : -1.10, xt1 = A0 ? 0.45 : 0.80, wt = A0 ? 0.70 : 0.80;
    var zt = A0 ? 0.56 : (A3 ? 0.64 : 0.62);
    hexa(P, [[xb0, -wb, -0.03], [xb1, -wb, -0.03], [xb1, wb, -0.03], [xb0, wb, -0.03],
             [xt0, -wt, zt], [xt1, -wt, zt], [xt1, wt, zt], [xt0, wt, zt]]);

    /* the gun: mantlet, thick sleeve, the 25 mm barrel and its flash hider */
    var gz = A0 ? 0.31 : 0.34, gx0 = A0 ? 0.62 : 0.88;
    box(P, gx0 - 0.02, gx0 + 0.30, -0.26, 0.26, gz - 0.19, gz + 0.19);
    cylX(D, gx0 + 0.20, gx0 + 0.85, 0, gz, 0.072, 10);
    cylX(D, gx0 + 0.85, 2.50, 0, gz, 0.036, 8);
    cylX(D, 2.44, 2.58, 0, gz, 0.052, 8);
    cylX(D, gx0 + 0.20, gx0 + 0.95, -0.17, gz - 0.05, 0.022, 6);

    /* smoke launchers on the front corners, four tubes each */
    for (s = -1; s <= 1; s += 2) {
      box(D, 0.58, 0.75, s > 0 ? wb - 0.03 : -wb - 0.10, s > 0 ? wb + 0.10 : -wb + 0.03, 0.22, 0.50);
      for (i = 0; i < 4; i++) {
        cylX(D, 0.75, 0.80, s * (wb + 0.035) + (i % 2 ? 0.03 : -0.03), 0.29 + (i < 2 ? 0 : 0.14), 0.026, 6);
      }
    }

    /* the twin TOW launcher on the LEFT cheek, stowed along the turret */
    var py0 = A0 ? 0.80 : 0.96, py1 = A0 ? 1.28 : 1.46, pz1 = A0 ? 0.58 : 0.66;
    box(P, -0.62, 0.52, py0, py1, 0.0, pz1);
    box(D, -0.66, -0.62, py0 + 0.04, py1 - 0.04, 0.06, pz1 - 0.06);
    for (i = 0; i < 2; i++) {
      var cy = py0 + (py1 - py0) * (0.30 + 0.40 * i);
      cylX(D, 0.50, 0.555, cy, pz1 * 0.50, 0.095, 10);
    }

    /* sights and hatches */
    var isuTop = A0 ? 1.04 : (A3 ? 0.98 : 1.09);
    box(P, 0.02, 0.50, 0.10, 0.56, zt - 0.02, isuTop);
    if (A0) {
      box(G, 0.50, 0.52, 0.16, 0.50, isuTop - 0.30, isuTop - 0.14);
    } else if (kind === "A2") {
      box(G, 0.50, 0.52, 0.14, 0.28, isuTop - 0.30, isuTop - 0.14);
      box(G, 0.50, 0.52, 0.32, 0.46, isuTop - 0.30, isuTop - 0.14);
      box(G, 0.50, 0.52, 0.49, 0.54, isuTop - 0.27, isuTop - 0.19);   /* the laser rangefinder */
    } else {
      box(G, 0.55, 0.57, 0.14, 0.30, isuTop - 0.30, isuTop - 0.12);
      box(G, 0.55, 0.57, 0.34, 0.50, isuTop - 0.30, isuTop - 0.12);
      box(P, 0.50, 0.55, 0.10, 0.56, zt - 0.02, isuTop - 0.04);
    }
    var cx = A3 ? 0.10 : -0.38, cyc = -0.42;
    cylZ(P, cx, cyc, zt - 0.02, zt + (A3 ? 0.10 : 0.20), A3 ? 0.26 : 0.30, 14);
    cylZ(D, cx, cyc, zt + (A3 ? 0.10 : 0.20), zt + (A3 ? 0.14 : 0.24), 0.22, 12);
    if (!A3) {
      for (i = 0; i < 6; i++) {
        a = i / 6 * TAU + 0.52;
        box(G, cx + Math.cos(a) * 0.30 - 0.04, cx + Math.cos(a) * 0.30 + 0.04,
            cyc + Math.sin(a) * 0.30 - 0.04, cyc + Math.sin(a) * 0.30 + 0.04, zt + 0.06, zt + 0.15);
      }
    } else {
      /* the commander's independent viewer, tall at the right rear */
      cylZ(D, -0.55, cyc, zt - 0.02, zt + 0.30, 0.13, 10);
      box(P, -0.80, -0.30, cyc - 0.27, cyc + 0.27, zt + 0.30, 1.37);
      box(G, -0.30, -0.28, cyc - 0.22, cyc + 0.22, 1.37 - 0.36, 1.37 - 0.08);
      box(D, -0.82, -0.78, cyc - 0.20, cyc + 0.20, zt + 0.36, 1.37 - 0.06);
    }

    /* the rear: a plain bin on the M2, the rounded stowage shield on the A2 on */
    if (A0) {
      box(P, -1.42, -1.08, -0.76, 0.76, 0.0, 0.46);
    } else {
      var arc = [[-0.80, -0.92], [-1.15, -0.80], [-1.38, -0.42], [-1.46, 0.0], [-1.38, 0.42], [-1.15, 0.80], [-0.80, 0.92]];
      for (i = 0; i + 1 < arc.length; i++) {
        var q0 = arc[i], q1 = arc[i + 1], dx = q1[0] - q0[0], dy = q1[1] - q0[1];
        rbox(P, (q0[0] + q1[0]) / 2, (q0[1] + q1[1]) / 2, Math.sqrt(dx * dx + dy * dy) / 2 + 0.02, 0.045,
             Math.atan2(dy, dx), 0.0, 0.50);
      }
      box(P, -1.40, -0.95, -0.80, 0.80, 0.44, 0.50);
      /* applique cheeks and the front plate of the spaced-armour turret */
      box(P, 0.10, 1.00, -wb - 0.07, -wb + 0.02, 0.0, 0.58);
      box(P, 0.10, 1.00, wb - 0.02, wb + 0.07, 0.0, 0.58);
      box(P, xb1 - 0.02, xb1 + 0.10, -0.88, 0.88, 0.02, 0.50);
    }
    /* reactive tiles on the turret, present-day fit only */
    if (V.brat >= 3) {
      for (i = 0; i < 3; i++) box(P, -0.88 + i * 0.40, -0.52 + i * 0.40, -wb - 0.10, -wb - 0.01, 0.08, 0.50);
      box(P, -1.05, -0.69, wb + 0.01, wb + 0.10, 0.08, 0.50);
    }
    /* team panel across the roof behind the hatches */
    box(T, A0 ? -1.00 : -1.04, A0 ? -0.74 : -0.80, -0.62, 0.62, zt, zt + 0.012);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.A3N, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), WB = [], i, wg, tg, TB = bins(T);
    for (i = 0; i < XW.length; i++) WB.push(new Bin(T.dark, false));
    addHull(V, HB, WB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { dark: WB[i] });
      g.add(wg);
    }
    addTurret(V, TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, TYC, TZ);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

/* len is the measured X extent of each guise (the tail ramp stands 0.04 m proud) */
UNIT_MODELS["nato_e80_ifv"] = {
  len: 6.5,
  build: function (THREE, M, C) { return HeroBradley.build(THREE, M, C, "M2"); }
};
UNIT_MODELS["nato_e90_ifv"] = {
  len: 6.6,
  build: function (THREE, M, C) { return HeroBradley.build(THREE, M, C, "A2"); }
};
UNIT_MODELS["nato_e00_ifv"] = {
  len: 6.6,
  build: function (THREE, M, C) { return HeroBradley.build(THREE, M, C, "A3"); }
};
UNIT_MODELS["ifv_n"] = {
  len: 6.6,
  build: function (THREE, M, C) { return HeroBradley.build(THREE, M, C, "A3N"); }
};
