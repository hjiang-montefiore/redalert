/* ============ us_m113.js - HERO models: the M113 family in US Army service ============
   One aluminium box hull, four builds, six rows:
     nato_e60_ifv           M113 ACAV            (Vietnam, 1966-)  olive drab
     nato_e60_tankdestroyer M113A1 with M220 TOW (1970s)           olive drab
     nato_e80_tankdestroyer M901 ITV             (1979-)           MERDC woodland
     nato_e90_tankdestroyer M901A1 ITV           (1991)            desert tan
     nato_e60_spaag         M163 Vulcan ADS      (1968-)           olive drab
     nato_e80_spaag         M163 Vulcan ADS      (1980s)           MERDC woodland

   What has to read at a glance (reference photographs: an M113 ACAV in a
   Vietnam stream crossing, front three-quarter; an M113 with a TOW launcher
   seen square from the front, Spanish Army; an M901 ITV on display, starboard
   forward quarter, and two M901s in firing position at REFORGER '85; an M163
   in transit at REFORGER '85 and an M163 at the NTC in 1988):
     - A tall slab-sided box, flat roof, ONE sloped glacis down to a stepped
       nose, a vertical tail with the ramp door.  The tracks hang outside the
       hull sides under a flat ledge; FIVE road wheels on 0.66 m centres, the
       drive sprocket at the FRONT, the idler (a road wheel on its arm) at the
       rear, no return rollers.
     - The trim vane folded flat on the glacis (a plain plate with two
       brackets), a two-lamp cluster on each upper corner of the glacis.
     - Driver's hatch with three periscopes on the front LEFT of the roof,
       the engine louvres on the front RIGHT, the cargo hatch aft.
     - ACAV: the commander's armoured ring with a three-quarter shield round
       the .50 (the trained part), and one shielded M60 station each side of
       the cargo hatch (fixed here: the gunners stand in the hatch).
     - M113A1 TOW: the M220 launcher on a roof pedestal over the rear of the
       cargo hatch, the tube pointing forward, over the .50 cupola.
     - M901: the M27 cupola base on the roof with the "hammerhead" raised on
       two struts: a sight housing in the middle, a TOW tube each side.
     - M163: the M168 turret in the rear half of the roof, six-barrel 20 mm
       cluster forward, the gunner's hatch ring on top, the radar antenna on
       the front left of the roof, two whip aerials aft.

   Published figures used:
     M113/M113A1  4.863 x 2.686 m over the tracks (Hunnicutt 191.5 x 105.75 in),
                  2.50 m over the machine gun, ground clearance 0.41 m
     M901         4.86 x 2.69 m, 2.94 m head stowed, 3.41 m head raised
     M163         4.864 x 2.855 m (191.5 x 112.4 in), 2.92 m (115 in)

   NOT drawn because no reference puts it on these rows: any M113A2 feature (the
   M901A1 shares the M901 hull here; whether it sits on an A2 hull is unconfirmed,
   so its row differs from the M901 in paint only), the A2 shock absorbers, the
   smoke launchers, the stowed M901 head.

   NOT confirmed, drawn as a best fit and flagged here: the M220's mount point
   on the US M113A1 (placed from a Spanish Army photograph of the same
   US-supplied kit); the radar antenna position on the M163 turret (the 1988
   NTC photograph shows two upright cylinders behind the gunner, the antenna
   is placed front left from the AN/VPS-2 description); the M163 hull width
   (2.855 m, taken from the published figure).

   Built from a handful of primitives per MATERIAL: the hull, each road wheel
   station (both sides) and the trained turret are separate nodes, every node
   carries one mesh per material.  Team colour is the plain C.team material
   on roof strips and the turret roof, exactly as handed in, so the era kit
   can leave it alone when this hull stands in.

   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.
   ASCII only: a stray byte in a hex literal has broken this project before.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroM113 = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  /* hull constants */
  var HW = 2.43;                       /* half length of the hull box            */
  var ZT = 1.85, ZL = 0.95;            /* roof height, the ledge over the tracks */
  var XW = [1.37, 0.71, 0.05, -0.61, -1.27];   /* five road wheels, 0.66 m pitch */
  var XI = -1.90, XS = 2.12;           /* rear idler, front sprocket             */
  var RW = 0.30, ZW = 0.375, RS = 0.26, ZS = 0.45;

  /* paint: olive drab for the sixties, MERDC woodland, CARC desert tan */
  var OD   = { base: "#4f5a3a", blots: ["#454e32", "#5b6443"], seed: 7 };
  var WOOD = { base: "#56633d", blots: ["#2c3321", "#6b5a3c", "#8c7f5a"], seed: 29 };
  var TAN  = { base: "#a89369", blots: ["#907d58"], seed: 31 };

  var VARIANTS = {
    ACAV:   { kind: "acav", gc: 0.41,  dw: 0,     paint: OD,   tx: 0.0,   ty: -0.32 },
    TOW:    { kind: "tow",  gc: 0.41,  dw: 0,     paint: OD,   tx: 0.0,   ty: -0.32 },
    ITV:    { kind: "itv",  gc: 0.41,  dw: 0,     paint: WOOD, tx: -0.55, ty: 0 },
    ITV2:   { kind: "itv",  gc: 0.41,  dw: 0,     paint: TAN,  tx: -0.55, ty: 0 },
    VADS60: { kind: "vads", gc: 0.41,  dw: 0.068, paint: OD,   tx: -0.50, ty: 0 },
    VADS80: { kind: "vads", gc: 0.41,  dw: 0.068, paint: WOOD, tx: -0.50, ty: 0 }
  };

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
  /* The hull is ONE loft of eight-point cross sections: the narrow lower tub,
     the ledge, the full-width box with the flat roof.  Four stations: the
     vertical tail, the break of the roof, the foot of the glacis, the nose.
     The glacis is one plane from (roof, x 1.30) to (x 2.20, z 1.00). */
  function addHull(V, B, WB) {
    var GC = V.gc, S = 1.30 + V.dw, W = 0.95, TY = 1.15 + V.dw;
    var st = [
      { x: -HW,  zB: GC + 0.05, zT: ZT },
      { x: 1.30, zB: GC,        zT: ZT },
      { x: 2.20, zB: GC + 0.10, zT: 1.00 },
      { x: HW,   zB: 0.62,      zT: 0.99 }
    ];
    var Vt = [], F = [], i, k, s, n = 8;
    function ring(q) {
      return [[q.x, W, q.zB], [q.x, W, ZL], [q.x, S, ZL], [q.x, S, q.zT],
              [q.x, -S, q.zT], [q.x, -S, ZL], [q.x, -W, ZL], [q.x, -W, q.zB]];
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
    cap(0, [0, 1, 6, 7], -1); cap(0, [1, 2, 3, 4, 5, 6], -1);
    cap((st.length - 1) * n, [0, 1, 6, 7], 1); cap((st.length - 1) * n, [1, 2, 3, 4, 5, 6], 1);
    solid(B.paint, Vt, F);

    /* the tail: the ramp door standing a hair proud, its frame and latches */
    box(B.paint, -HW - 0.02, -HW, -0.92, 0.92, 0.62, 1.82);
    box(B.dark, -HW - 0.03, -HW - 0.015, -0.74, 0.74, 0.96, 1.00);
    box(B.dark, -HW - 0.03, -HW - 0.015, -0.74, 0.74, 1.44, 1.48);
    for (s = -1; s <= 1; s += 2) box(B.dark, -HW - 0.035, -HW - 0.015, s * 0.80 - 0.05, s * 0.80 + 0.05, 1.10, 1.32);

    /* the glacis plane: u runs up the slope from its foot, w across it */
    var dx = 0.90, dz = 0.85, gl = Math.sqrt(dx * dx + dz * dz);
    var P0 = [2.20, 0, 1.00], U = [-dx / gl, 0, dz / gl], Wd = [0, 1, 0], N = [dz / gl, 0, dx / gl];
    function gb(bin, u0, u1, w0, w1, h0, h1) { planeBox(bin, P0, U, Wd, N, u0, u1, w0, w1, h0, h1); }
    /* the trim vane, folded flat: a plate with two hinge brackets */
    gb(B.paint, 0.10, 1.06, -(S - 0.30), S - 0.30, 0.0, 0.045);
    gb(B.dark, 0.06, 0.16, -0.62, -0.46, 0.0, 0.06);
    gb(B.dark, 0.06, 0.16, 0.46, 0.62, 0.0, 0.06);
    gb(B.dark, 1.02, 1.12, -(S - 0.34), S - 0.34, 0.0, 0.05);
    /* a two-lamp cluster on each upper corner of the glacis */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 1.22, 1.46, s > 0 ? S - 0.48 : -S + 0.08, s > 0 ? S - 0.08 : -S + 0.48, 1.62, 1.88);
      for (i = 0; i < 2; i++) {
        var ly = s * (S - 0.17 - i * 0.18);
        box(B.glass, 1.455, 1.475, ly - 0.055, ly + 0.055, 1.77, 1.85);
      }
    }
    /* the nose below the vane: two towing shackles on the lower plate */
    for (s = -1; s <= 1; s += 2) box(B.dark, HW - 0.02, HW + 0.01, s * 0.58 - 0.05, s * 0.58 + 0.05, 0.70, 0.80);

    /* roof, front: the driver's hatch with three periscopes (left), the engine
       louvres (right) */
    cylZ(B.paint, 0.95, 0.52, ZT, ZT + 0.08, 0.27, 14);
    cylZ(B.dark, 0.95, 0.52, ZT + 0.08, ZT + 0.11, 0.21, 12);
    for (i = 0; i < 3; i++) box(B.glass, 1.19, 1.25, 0.52 - 0.17 + i * 0.17, 0.52 - 0.17 + i * 0.17 + 0.11, ZT + 0.06, ZT + 0.14);
    box(B.dark, 0.50, 1.20, -1.02, -0.20, ZT, ZT + 0.035);
    for (i = 0; i < 5; i++) box(B.paint, 0.58 + i * 0.12, 0.64 + i * 0.12, -1.00, -0.22, ZT + 0.035, ZT + 0.07);

    /* a flat dark rail under the ledge each side, where the upper track run hides */
    for (s = -1; s <= 1; s += 2) box(B.dark, -2.35, 2.30, s > 0 ? S - 0.012 : -S - 0.04, s > 0 ? S + 0.04 : -S + 0.012, 0.90, 0.99);

    /* team colour: a strip along each roof edge, facing up for the RTS camera */
    for (s = -1; s <= 1; s += 2) box(B.team, -1.95, 0.30, s > 0 ? S - 0.20 : -S + 0.03, s > 0 ? S - 0.03 : -S + 0.20, ZT, ZT + 0.012);

    /* the aerial base and whip at the rear; the M163 carries two */
    cylZ(B.dark, -2.20, -(S - 0.15), ZT, ZT + 0.10, 0.05, 8);
    cylZ(B.dark, -2.20, -(S - 0.15), ZT + 0.10, 3.20, 0.011, 5);
    if (V.kind === "vads") {
      cylZ(B.dark, -2.20, S - 0.15, ZT, ZT + 0.10, 0.05, 8);
      cylZ(B.dark, -2.20, S - 0.15, ZT + 0.10, 3.20, 0.011, 5);
    }

    /* running gear, both sides: the track loop, cleats on the lower run */
    for (s = -1; s <= 1; s += 2) {
      var yc = s * TY, ya = yc - 0.19, yb = yc + 0.19;
      var path = [[2.05, 0.035], [-1.95, 0.035], [-2.20, 0.14], [-2.27, 0.375], [-2.20, 0.62],
                  [-1.90, 0.715], [1.95, 0.76], [2.26, 0.68], [2.40, 0.45], [2.32, 0.17]];
      for (i = 0; i < path.length; i++) {
        var p = path[i], q = path[(i + 1) % path.length];
        belt(B.dark, p[0], p[1], q[0], q[1], ya, yb, 0.07);
      }
      for (i = 0; i < 26; i++) {
        var rx = -1.90 + i * 0.152;
        box(B.dark, rx, rx + 0.07, s > 0 ? yb : ya - 0.02, s > 0 ? yb + 0.02 : ya, 0.0, 0.09);
      }
    }
    /* road wheels, the idler and the sprocket: one node per station, both
       sides together, so the engine spins the pair about their common axle */
    for (i = 0; i < XW.length + 1; i++) {
      for (s = -1; s <= 1; s += 2) {
        var y0 = s * TY;
        cylY(WB[i], 0, y0 - 0.19, y0 - 0.04, 0, RW, 20);
        cylY(WB[i], 0, y0 + 0.04, y0 + 0.19, 0, RW, 20);
        cylY(WB[i], 0, y0 - 0.205, y0 + 0.205, 0, 0.17, 12);
      }
    }
    i = XW.length + 1;
    for (s = -1; s <= 1; s += 2) {
      var ys = s * TY;
      cylY(WB[i], 0, ys - 0.16, ys + 0.16, 0, RS, 18);
      cylY(WB[i], 0, ys - 0.205, ys + 0.205, 0, 0.13, 12);
      for (k = 0; k < 10; k++) {
        var ta = k / 10 * TAU, tx = Math.cos(ta) * (RS + 0.025), tz = Math.sin(ta) * (RS + 0.025);
        box(WB[i], tx - 0.035, tx + 0.035, ys - 0.14, ys + 0.14, tz - 0.035, tz + 0.035);
      }
    }
  }

  /* the cargo hatch: two panels hinged to the roof, a seam between them */
  function cargoHatch(B, x0, x1) {
    box(B.paint, x0, x1, 0.03, 0.84, ZT, ZT + 0.04);
    box(B.paint, x0, x1, -0.84, -0.03, ZT, ZT + 0.04);
    box(B.dark, x0, x1, -0.03, 0.03, ZT, ZT + 0.02);
    box(B.dark, x0 + 0.12, x0 + 0.24, 0.45, 0.60, ZT + 0.04, ZT + 0.065);
    box(B.dark, x0 + 0.12, x0 + 0.24, -0.60, -0.45, ZT + 0.04, ZT + 0.065);
  }

  /* an M2 .50 on its pintle in front of a hatch ring, centre (ox, oy), base oz */
  function m2gun(D, ox, oy, oz, gz) {
    cylZ(D, ox + 0.10, oy, oz, gz - 0.06, 0.028, 6);
    box(D, ox + 0.02, ox + 0.38, oy - 0.05, oy + 0.05, gz - 0.06, gz + 0.06);
    cylX(D, ox + 0.38, ox + 1.00, oy, gz, 0.034, 8);
    cylX(D, ox + 1.00, ox + 1.38, oy, gz, 0.020, 6);
    cylX(D, ox + 1.34, ox + 1.46, oy, gz, 0.030, 6);
  }

  /* the commander's ring: a low armoured collar and its hatch cover */
  function tcRing(P, D, T, ox, oy, oz) {
    cylZ(P, ox, oy, oz, oz + 0.20, 0.40, 24);
    cylZ(D, ox, oy, oz + 0.20, oz + 0.215, 0.33, 22);
    cylZ(T, ox - 0.16, oy, oz + 0.215, oz + 0.228, 0.19, 16);
  }

  /* ACAV: the shielded M60 stations flanking the cargo hatch.  The gunners
     stand in the hatch behind an outboard plate with two angled cheeks. */
  function acavStations(B) {
    var s, fx = Math.sin(0.70), fy = Math.cos(0.70);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -1.60, -0.95, s > 0 ? 0.99 : -1.03, s > 0 ? 1.03 : -0.99, ZT + 0.03, ZT + 0.66);
      box(B.paint, -1.60, -1.56, s > 0 ? 0.62 : -1.03, s > 0 ? 1.03 : -0.62, ZT + 0.03, ZT + 0.66);
      box(B.paint, -0.99, -0.95, s > 0 ? 0.62 : -1.03, s > 0 ? 1.03 : -0.62, ZT + 0.03, ZT + 0.66);
      box(B.dark, -1.60, -0.95, s > 0 ? 0.62 : -0.66, s > 0 ? 0.66 : -0.62, ZT, ZT + 0.03);
      /* the M60: receiver and barrel, slewed 40 degrees forward of abeam */
      cyl(B.dark, [-1.30, s * 0.80, ZT + 0.40], [-1.30 + fx * 0.36, s * (0.80 + fy * 0.36), ZT + 0.40], 0.030, 0.030, 8);
      cyl(B.dark, [-1.30 + fx * 0.36, s * (0.80 + fy * 0.36), ZT + 0.40],
          [-1.30 + fx * 0.62, s * (0.80 + fy * 0.62), ZT + 0.40], 0.016, 0.016, 6);
    }
  }

  /* ACAV turret: the circular armoured ring round the .50, open at the back,
     a slot for the gun.  Origin on the ring centre, gun along +X. */
  function turretACAV(TB) {
    var P = TB.paint, D = TB.dark, T = TB.team, k, a, rr = 0.46, d = 0.12, dth, ac;
    tcRing(P, D, T, 0, 0, 0);
    dth = (2.09 - d) / 6;
    for (k = 0; k < 6; k++) {
      ac = d + (k + 0.5) * dth;
      rbox(P, Math.cos(ac) * rr, Math.sin(ac) * rr, rr * dth / 2 + 0.012, 0.022, ac + Math.PI / 2, 0.20, 0.82);
      rbox(P, Math.cos(-ac) * rr, Math.sin(-ac) * rr, rr * dth / 2 + 0.012, 0.022, -ac + Math.PI / 2, 0.20, 0.82);
    }
    m2gun(D, 0, 0, 0.215, 0.58);
  }

  /* M113A1 TOW: the M220 launcher on a pedestal over the rear of the cargo
     hatch, tube forward, the day sight on its left, the guidance set behind.
     Drawn into the hull bins: the vehicle turns to aim, nothing trains.  */
  function towLauncher(B) {
    var P = B.paint, D = B.dark, G = B.glass;
    cylZ(D, -1.20, 0, ZT, ZT + 0.05, 0.26, 12);
    cylZ(P, -1.20, 0, ZT + 0.05, ZT + 0.34, 0.14, 10);
    box(P, -1.50, -0.85, -0.32, 0.32, ZT + 0.34, ZT + 0.58);
    cylX(P, -1.78, -0.30, -0.16, ZT + 0.70, 0.115, 12);
    cylX(D, -0.30, -0.26, -0.16, ZT + 0.70, 0.105, 10);
    cylX(D, -1.92, -1.78, -0.16, ZT + 0.70, 0.13, 10);
    box(P, -1.30, -0.80, 0.04, 0.34, ZT + 0.58, ZT + 0.82);
    box(G, -0.80, -0.78, 0.09, 0.28, ZT + 0.64, ZT + 0.76);
    box(P, -1.88, -1.44, 0.06, 0.40, ZT + 0.34, ZT + 0.62);
    box(B.team, -1.30, -0.85, 0.06, 0.32, ZT + 0.822, ZT + 0.834);
  }

  /* M901 turret: the M27 cupola base, the arm raised on two struts, and the
     hammerhead on top.  Origin on the cupola ring centre. */
  function turretITV(TB) {
    var P = TB.paint, D = TB.dark, G = TB.glass, T = TB.team, s;
    cylZ(P, 0, 0, 0, 0.30, 0.50, 24);
    cylZ(D, 0, 0, 0.30, 0.325, 0.40, 20);
    for (s = -1; s <= 1; s += 2) box(P, -0.26, 0.10, s > 0 ? 0.10 : -0.28, s > 0 ? 0.28 : -0.10, 0.325, 1.02);
    box(D, -0.22, 0.06, -0.10, 0.10, 0.40, 0.95);
    box(P, -0.34, 0.20, -0.34, 0.34, 0.98, 1.12);
    /* the sight housing between the tubes, its top at 3.41 m over the ground */
    box(P, -0.34, 0.58, -0.36, 0.36, 1.04, 1.54);
    box(G, 0.58, 0.60, -0.24, -0.04, 1.26, 1.44);
    box(G, 0.58, 0.60, 0.05, 0.27, 1.20, 1.44);
    box(D, -0.20, 0.40, -0.30, 0.30, 1.54, 1.552);
    box(T, -0.12, 0.34, -0.22, 0.22, 1.552, 1.560);
    /* a TOW launch tube each side, dust cover in front, blast cap behind */
    for (s = -1; s <= 1; s += 2) {
      cylX(P, -0.62, 0.90, s * 0.56, 1.30, 0.20, 20);
      cylX(D, 0.90, 0.93, s * 0.56, 1.30, 0.17, 16);
      cylX(D, -0.66, -0.62, s * 0.56, 1.30, 0.16, 16);
    }
  }

  /* M163 turret: the M168 turret on the ring, six-barrel cluster forward,
     the gunner's hatch ring, the range-only radar antenna front left. */
  function turretVADS(TB) {
    var P = TB.paint, D = TB.dark, G = TB.glass, T = TB.team, s, k;
    cylZ(D, 0, 0, 0, 0.06, 0.78, 24);
    hexa(P, [[-0.76, -0.72, 0.05], [0.62, -0.72, 0.05], [0.62, 0.72, 0.05], [-0.76, 0.72, 0.05],
             [-0.66, -0.60, 0.80], [0.50, -0.60, 0.80], [0.50, 0.60, 0.80], [-0.66, 0.60, 0.80]]);
    cylZ(P, -0.22, 0, 0.80, 1.02, 0.30, 20);
    cylZ(D, -0.22, 0, 1.02, 1.05, 0.24, 16);
    /* gun housing and the 20 mm cluster, a little right of the turret axis */
    box(P, 0.46, 0.82, -0.40, 0.14, 0.22, 0.72);
    cylX(D, 0.80, 1.26, -0.13, 0.47, 0.095, 14);
    cylX(D, 1.26, 1.90, -0.13, 0.47, 0.030, 8);
    for (k = 0; k < 6; k++) {
      cylX(D, 1.26, 1.94, -0.13 + Math.cos(k / 6 * TAU) * 0.056, 0.47 + Math.sin(k / 6 * TAU) * 0.056, 0.019, 6);
    }
    cylX(D, 1.50, 1.54, -0.13, 0.47, 0.082, 12);
    cylX(D, 1.84, 1.90, -0.13, 0.47, 0.082, 12);
    /* the optical lead-computing sight on the right, the radar antenna on the left */
    box(D, 0.40, 0.60, -0.60, -0.42, 0.80, 0.97);
    box(G, 0.60, 0.62, -0.57, -0.45, 0.84, 0.94);
    cylZ(P, 0.34, 0.44, 0.80, 1.28, 0.14, 14);
    box(G, 0.46, 0.48, 0.36, 0.52, 0.90, 1.18);
    /* team colour on the turret roof either side of the hatch ring */
    for (s = -1; s <= 1; s += 2) box(T, -0.60, 0.40, s > 0 ? 0.32 : -0.56, s > 0 ? 0.56 : -0.32, 0.80, 0.812);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.ACAV, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), WB = [], i, wg, tg, TB, nw = XW.length + 2, pos = XW.concat([XI, XS]);
    for (i = 0; i < nw; i++) WB.push(new Bin(T.dark, false));
    addHull(V, HB, WB);
    if (V.kind === "acav") { cargoHatch(HB, -2.26, -0.60); acavStations(HB); }
    if (V.kind === "tow") {
      cargoHatch(HB, -2.26, -0.60);
      tcRing(HB.paint, HB.dark, HB.team, V.tx, V.ty, ZT);
      m2gun(HB.dark, V.tx, V.ty, ZT + 0.215, ZT + 0.58);
      towLauncher(HB);
    }
    if (V.kind === "itv") {
      /* the rear roof hatch the loader uses to reach the launcher */
      box(HB.paint, -2.26, -1.42, -0.62, 0.62, ZT, ZT + 0.035);
      box(HB.dark, -2.26, -1.42, -0.03, 0.03, ZT + 0.035, ZT + 0.05);
    }
    flush(THREE, g, HB);
    for (i = 0; i < nw; i++) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(pos[i], 0, i === nw - 1 ? ZS : ZW);
      flush(THREE, wg, { dark: WB[i] });
      g.add(wg);
    }
    if (V.kind !== "tow") {
      TB = bins(T);
      if (V.kind === "acav") turretACAV(TB);
      else if (V.kind === "itv") turretITV(TB);
      else turretVADS(TB);
      tg = new THREE.Group();
      tg.name = "turret";
      tg.position.set(V.tx, V.ty, ZT);
      flush(THREE, tg, TB);
      g.add(tg);
    }
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

/* len is the measured X extent of each guise */
UNIT_MODELS["nato_e60_ifv"] = {
  len: 4.905,
  build: function (THREE, M, C) { return HeroM113.build(THREE, M, C, "ACAV"); }
};
UNIT_MODELS["nato_e60_tankdestroyer"] = {
  len: 4.905,
  build: function (THREE, M, C) { return HeroM113.build(THREE, M, C, "TOW"); }
};
UNIT_MODELS["nato_e80_tankdestroyer"] = {
  len: 4.905,
  build: function (THREE, M, C) { return HeroM113.build(THREE, M, C, "ITV"); }
};
UNIT_MODELS["nato_e90_tankdestroyer"] = {
  len: 4.905,
  build: function (THREE, M, C) { return HeroM113.build(THREE, M, C, "ITV2"); }
};
UNIT_MODELS["nato_e60_spaag"] = {
  len: 4.905,
  build: function (THREE, M, C) { return HeroM113.build(THREE, M, C, "VADS60"); }
};
UNIT_MODELS["nato_e80_spaag"] = {
  len: 4.905,
  build: function (THREE, M, C) { return HeroM113.build(THREE, M, C, "VADS80"); }
};
