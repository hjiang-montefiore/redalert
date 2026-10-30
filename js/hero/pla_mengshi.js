/* ========== pla_mengshi.js - HERO model: Dongfeng CSK-131 "Mengshi" protected 4x4 ==========
   pla_e00_recon   "CSK-131 Mengshi protected 4x4", in service 2013; the trained "turret" is the
                   roof weapon station (the manned ring with its shield and the 12.7 mm).

   Which version: the CSK-131, the protected (armoured) second-generation Mengshi - a closed
   four-door steel cab body with small armoured windows, NOT the open soft-top EQ2050 that
   copies the HMMWV (that one shares the low wide stance, the four big tyres and the long
   bonnet, which is what makes the family read as "Hummer-like").

   References, Wikimedia Commons, cached in scratchpad/q_pla_e00_recon_ref:
     P1  "Vostok2018-08.jpg" (960) - a PLA CSK-131 at Vostok 2018, front left 3/4: the
         wide flat bonnet running straight into the fenders, the grille of horizontal slats
         between the two headlamp clusters in the fender fronts, the heavy bumper, the
         TWO-PANE flat windscreen standing nearly upright with its wipers, the boxy armoured
         cab with the sides leaning in a little, the small armoured side windows with their
         thick frames, the mirrors on arms at the A pillars, the roof weapon station a little
         ahead of mid roof, three tall whip aerials (one on the front corner, two at the rear),
         the big off-road tyres with painted rims.
     P2  "Dongfeng Mengshi Gen 2.jpg" (1400) - a police armoured Mengshi of the same family,
         from the right, nose right, square on: THE MEASURING PHOTO.  Nose 872 px, body
         tail 339 px, front axle 794 px, rear axle 433 px, tyres 96-97 px over the tread;
         scaled to the published 5.10 m over the body (104.5 px/m): wheelbase 3.45 m, front
         overhang 0.75 m, rear overhang 0.90 m, tyre 0.93 m; heights over the ground under the
         body: roof 2.09, cowl 1.43, bonnet at the nose 1.33, beltline 1.45, side window tops
         1.85, sill 0.58, step 0.46; the windscreen foot 1.65 m behind the nose, the roof's
         front edge 1.89 m.  The two doors each side and the closed rear body behind them;
         its rear ram, police roof gear and black paint are not drawn.
     P3  "Vostok-2018 military manoeuvres (2018-09-13) 51.jpg" (960) - two PLA CSK-131s
         head on, the gunner standing in the ring: the width over the body against the roof
         height (92 : 79 px, so 2.43 m at a 2.09 m roof), the bonnet a little narrower than
         the cab, the weapon station's shield ring about 0.9-1.0 m across and about 0.5 m tall,
         open at the top.
     P4  "Dongfeng Mengshi photo1.jpg" (960) - a civil armoured Mengshi, front right: the
         louvred vent at the back of the bonnet, the slatted grille, the round headlamps in
         their recessed clusters, the winch in the bumper (shapes only).
   Published (en.wikipedia "Dongfeng Mengshi", CSK131): 5,100 x 2,400 x 2,000 mm, 3,700 kg
   curb, 6,300 kg gross; "All CSK-131 are equipped with a manually controlled turret"; the
   reconnaissance version mounts a 12.7 mm machine gun.

   Recognition list (what makes it read at game zoom, and its source):
     1. low, wide and long: four big tyres pushed out to the corners - P2, P3
     2. the long flat bonnet with the slatted grille between the headlamps - P1, P4
     3. the near-upright two-pane windscreen and the closed armoured box cab - P1, P2
     4. small armoured windows in thick frames, two doors a side - P1, P2
     5. the shielded weapon ring on the roof with the 12.7 mm - P1, P3
     6. the tall whip aerials - P1
   Paint: plain PLA green as the other PLA heroes (#525c3a); P1 shows the same flat green
   under its foliage.  No stars, plates, numbers or emblems (P1 carries a flag patch and a
   number plate: not drawn); the Dongfeng badge is not drawn.
   Scale: the published 5.10 m over the body; the heights from P2 at the same scale (its roof
   lands at 2.09 m against the published 2.00 m: kept as measured, the published figure
   probably to the roof skin without the roof fittings).
   NOT CONFIRMED, judgement calls: the track (1.84 m between tyre centres, from P3's
   proportions); the tyre width (0.32 m) and tread; the bonnet and cab half widths (1.06 /
   1.12 m at the beltline, 0.98 m at the roof) and the sides' lean; the wheel-arch flares;
   the whole weapon station (its ring diameter 0.96 m and its shield height 0.48 m are read
   off P3 at 38 px/m, its plate layout, the gun cradle and the ammunition box are
   drawn from the published "manually controlled turret" and 12.7 mm); its place on the roof
   (P1, about 0.6 m behind the roof's front edge); the rear face (the rear door, its window
   and the tail lamps: no photograph of a CSK-131's rear was found); the aerials' mounts.
   Materials: PAINT (canvas texture), DARK, WHEEL (vertex colours: tyres, rims, glass and
   lamps), team colour (C.team): a strip on the rear roof and one on each cheek of the
   turret's shield.
   Nodes: "turret" (the weapon station; origin on the ring at the roof, gun along +X) and two
   "roadwheel" axle groups (both wheels of an axle; origin on the axle centre).
   Measured: 5.35 x 2.61 m over the tow eyes and mirrors (5.10 m and 2.34 m over the body and
   arch flares), roof 2.09 m, shield top 2.62 m (3.60 m to the whip aerials).
   Model space: +X nose, +Y left, +Z up, metres, tyres on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMengshi = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var PAINT = { base: "#525c3a", blots: ["#485232", "#5c6642"], seed: 131 };
  /* running gear (P2): wheelbase 3.45 m, tyre 0.93 m over the tread; track (P3) 1.84 m */
  var XA = [1.80, -1.65], RT = 0.465, ZW = 0.465, TY = 0.92, TH = 0.16;
  /* body (P2): nose and tail of the body, bonnet at the nose and at the cowl, beltline,
     roof, the sill and the fender bottoms; half widths: body, roof, the tub between wheels */
  var NOSE = 2.55, TAIL = -2.55, BNZ = 1.31, COWL = 1.43, BELT = 1.45, ROOF = 2.09, SILL = 0.58, FBZ = 1.00;
  var BW = 1.12, RFW = 0.98, TUBW = 0.70;
  /* the windscreen: its foot (at the cowl) and the roof's front edge (P2) */
  var WX0 = 0.90, WX1 = 0.66;
  /* the doors (P2): front door from the windscreen foot back, rear door to x = -1.01 */
  var DX0 = 0.88, DXM = -0.08, DX1 = -1.01;
  /* the weapon station's ring (P1) */
  var TX = 0.05;

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
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      var sx = s[i][0] * hu, sy = s[i][1] * hv, sz = s[i][2] * hw;
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
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  /* a convex prism: profile in the XZ plane, from y0 to y1 */
  function prismY(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
  /* a closed solid lofted through convex rings of [x, y, z] points; ends capped */
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

  /* ----------------------------------------------------------- materials */
  var _tex;
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function paintTex(THREE) {
    if (_tex !== undefined) return _tex;
    _tex = null;
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(PAINT.seed), i, k, x, y, w;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = PAINT.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < PAINT.blots.length; k++) {
        q.fillStyle = PAINT.blots[k];
        for (i = 0; i < 16; i++) { q.globalAlpha = 0.3 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 6; i++) {                 /* weld seams */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.32)";
        if (i % 2) q.fillRect(x, y, w, 3); else q.fillRect(x, y, 3, w);
      }
      for (i = 0; i < 110; i++) {               /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      _tex = new THREE.CanvasTexture(cv);
      _tex.wrapS = _tex.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) _tex.encoding = THREE.sRGBEncoding;
      _tex.anisotropy = 4;
    } catch (e) { _tex = null; }
    return _tex;
  }
  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), team: new Bin(T.team, false), vc: new Bin(T.wheel, false, true) }; }
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

  /* ---------------------------------------------------------------- body */
  var GLASS = [0.10, 0.12, 0.13], AMBER = [0.85, 0.50, 0.12], RED = [0.55, 0.10, 0.08], LENS = [0.82, 0.80, 0.70];
  /* an eight-point ring with chamfered corners: half width w, from zb to zt, chamfer c */
  function ring8(x, w, zb, zt, c) {
    return [[x, -w + c, zb], [x, w - c, zb], [x, w, zb + c], [x, w, zt - c],
            [x, w - c, zt], [x, -w + c, zt], [x, -w, zt - c], [x, -w, zb + c]];
  }
  /* the cab's trapezoid ring: half width wb at zb, wt at zt */
  function gh(x, wb, zb, wt, zt) { return [[x, -wb, zb], [x, wb, zb], [x, wt, zt], [x, -wt, zt]]; }
  /* a slab lying on the cab's leaning side (side s) at x, height z: hu along x, hv up the face,
     hw out of it */
  var SL = Math.sqrt((BW - RFW) * (BW - RFW) + (ROOF - BELT) * (ROOF - BELT));
  var SU = [0, -(BW - RFW) / SL, (ROOF - BELT) / SL], SN = [0, (ROOF - BELT) / SL, (BW - RFW) / SL];
  function sideY(z) { return BW - (z - BELT) * (BW - RFW) / (ROOF - BELT); }
  function onSide(bin, x, z, s, hu, hv, hw, out) {
    var n = [0, s * SN[1], SN[2]], v = [0, s * SU[1], SU[2]], y = s * sideY(z), o = hw + (out || 0);
    slab(bin, [x, y + n[1] * o, z + n[2] * o], [1, 0, 0], v, n, hu, hv, hw);
  }
  /* the windscreen plane: point at fraction t up from its foot, y, offset out of it */
  var WL = Math.sqrt((WX0 - WX1) * (WX0 - WX1) + (ROOF - COWL) * (ROOF - COWL));
  var WU = [(WX1 - WX0) / WL, 0, (ROOF - COWL) / WL], WN = [(ROOF - COWL) / WL, 0, (WX0 - WX1) / WL];
  function wp(t, y, off) { return [WX0 + WU[0] * WL * t + WN[0] * off, y, COWL + WU[2] * WL * t + WN[2] * off]; }
  /* the bonnet's top, falling from the cowl to the nose (P2) */
  function bonZ(x) { return COWL + (BNZ - COWL) * (x - WX0) / (2.40 - WX0); }

  function addBody(B) {
    var s, i, x, a;
    /* --- the tub between the wheels: frame rails, sump and fuel tank, under everything --- */
    loftN(B.paint, [ring8(TAIL + 0.08, TUBW, 0.64, FBZ + 0.04, 0.06),
                    ring8(-2.18, TUBW, 0.50, FBZ + 0.04, 0.06),
                    ring8(2.25, TUBW, 0.50, FBZ + 0.04, 0.06),
                    ring8(NOSE - 0.04, TUBW, 0.66, FBZ + 0.04, 0.06)]);
    /* --- the main body at fender height: the bonnet and the fenders in one wide block over
       the wheels, the bonnet falling from the cowl to the rounded nose (P1, P2) --- */
    loftN(B.paint, [ring8(TAIL, BW - 0.04, FBZ + 0.02, BELT - 0.02, 0.05),
                    ring8(TAIL + 0.05, BW, FBZ, BELT, 0.05),
                    ring8(WX0, BW, FBZ, BELT, 0.05),
                    ring8(WX0 + 0.06, BW, FBZ, COWL, 0.05),
                    ring8(2.40, BW - 0.03, FBZ, BNZ + 0.01, 0.07),
                    ring8(NOSE, BW - 0.10, FBZ + 0.04, BNZ - 0.07, 0.07)]);
    /* the sides between the wheels down to the sill (the doors' lower halves), and the body
       ends below the fenders: behind the rear wheels and ahead of the front ones (P2) */
    loftN(B.paint, [ring8(-1.12, BW, SILL, FBZ + 0.02, 0.05), ring8(1.27, BW, SILL, FBZ + 0.02, 0.05)]);
    box(B.paint, TAIL + 0.02, -2.18, -BW + 0.02, BW - 0.02, 0.62, FBZ + 0.02);
    box(B.paint, 2.32, NOSE - 0.02, -BW + 0.10, BW - 0.10, 0.70, FBZ + 0.04);
    /* --- the cab: the armoured box from the windscreen to the tail, the sides leaning in to
       the flat roof, the near-upright windscreen (P1, P2, P3) --- */
    loftN(B.paint, [gh(TAIL, BW - 0.03, BELT - 0.02, RFW - 0.05, ROOF - 0.04),
                    gh(TAIL + 0.05, BW, BELT - 0.02, RFW, ROOF),
                    gh(WX1, BW, BELT - 0.02, RFW, ROOF),
                    gh(WX1 + 0.02, BW - 0.01, BELT - 0.02, RFW - 0.02, ROOF - 0.03),
                    gh(WX0, BW - 0.04, COWL - 0.01, BW - 0.06, COWL + 0.03)]);

    for (s = -1; s <= 1; s += 2) {
      /* --- the wheel-arch flares round both wheels, a lip standing out of the side --- */
      for (i = 0; i < XA.length; i++) {
        for (a = 0; a < 9; a++) {
          var a0 = (20 + a * 15.6) * Math.PI / 180, a1 = (20 + (a + 1) * 15.6) * Math.PI / 180, r = 0.56;
          belt(B.paint, XA[i] + Math.cos(a0) * r, ZW + Math.sin(a0) * r, XA[i] + Math.cos(a1) * r, ZW + Math.sin(a1) * r,
               s > 0 ? BW - 0.06 : -BW - 0.05, s > 0 ? BW + 0.05 : -BW + 0.06, 0.09);
        }
        /* the dark inner arch above the tyre */
        box(B.dark, XA[i] - 0.50, XA[i] + 0.50, s > 0 ? TUBW : -BW + 0.04, s > 0 ? BW - 0.04 : -TUBW, FBZ - 0.03, FBZ);
      }
      /* --- the doors: seams, handles and hinges on the lower side and on the cab side (P2) --- */
      var ys = s > 0 ? BW : -BW - 0.012;
      [DX0, DXM, DX1].forEach(function (dx) {
        box(B.dark, dx - 0.012, dx + 0.012, ys, ys + 0.012, SILL + 0.04, BELT - 0.02);
        onSide(B.dark, dx, (BELT + ROOF - 0.10) / 2, s, 0.012, (ROOF - 0.10 - BELT) / 2 / (SU[2]), 0.006);
      });
      box(B.dark, -1.12, 1.27, ys, ys + 0.012, SILL + 0.035, SILL + 0.05);
      [DXM - 0.20, DX1 + 0.20].forEach(function (hx) {
        box(B.dark, hx - 0.10, hx + 0.02, s > 0 ? BW : -BW - 0.035, s > 0 ? BW + 0.035 : -BW, 1.24, 1.28);
      });
      [DX0 - 0.05, DXM - 0.05].forEach(function (hx) {
        box(B.dark, hx - 0.05, hx, s > 0 ? BW : -BW - 0.03, s > 0 ? BW + 0.03 : -BW, 0.80, 0.90);
        box(B.dark, hx - 0.05, hx, s > 0 ? BW : -BW - 0.03, s > 0 ? BW + 0.03 : -BW, 1.30, 1.40);
      });
      /* the step under the doors (P2) */
      box(B.dark, -1.06, 1.20, s > 0 ? BW - 0.16 : -BW - 0.02, s > 0 ? BW + 0.02 : -BW + 0.16, 0.44, 0.48);
      /* --- the small armoured side windows in their thick frames (P1, P2) --- */
      [[0.31, 0.26], [-0.62, 0.28]].forEach(function (w) {
        onSide(B.paint, w[0], 1.67, s, w[1] + 0.05, 0.19, 0.03);
        B.vc.col = GLASS;
        onSide(B.vc, w[0], 1.67, s, w[1] - 0.02, 0.13, 0.008, 0.055);
      });
      /* the mirrors on their arms at the A pillars (P1) */
      box(B.dark, 0.78, 0.82, s > 0 ? BW - 0.04 : -BW - 0.20, s > 0 ? BW + 0.13 : -BW + 0.04, 1.64, 1.68);
      box(B.dark, 0.74, 0.80, s * (BW + 0.13) - 0.04, s * (BW + 0.13) + 0.04, 1.52, 1.82);
      /* --- the front: the headlamp clusters in the fender fronts, round lamps and the amber
         indicator below (P1, P4) --- */
      var ly = s * 0.84;
      box(B.dark, NOSE - 0.02, NOSE + 0.01, ly - 0.17, ly + 0.17, 1.03, 1.19);
      B.vc.col = LENS;
      cyl(B.vc, [NOSE, ly - s * 0.07, 1.11], [NOSE + 0.025, ly - s * 0.07, 1.11], 0.065, 0.065, 12);
      cyl(B.vc, [NOSE, ly + s * 0.10, 1.11], [NOSE + 0.025, ly + s * 0.10, 1.11], 0.050, 0.050, 10);
      B.vc.col = AMBER;
      box(B.vc, NOSE - 0.02, NOSE + 0.01, ly - 0.08, ly + 0.08, 0.86, 0.93);
      /* the tow eyes on the bumper */
      box(B.dark, 2.66, 2.72, s * 0.55 - 0.05, s * 0.55 + 0.05, 0.56, 0.68);
      /* --- the rear: tail lamps, the corner bumpers --- */
      B.vc.col = RED;
      box(B.vc, TAIL - 0.015, TAIL + 0.02, s * 0.98 - 0.07, s * 0.98 + 0.07, 1.10, 1.30);
      B.vc.col = AMBER;
      box(B.vc, TAIL - 0.015, TAIL + 0.02, s * 0.98 - 0.07, s * 0.98 + 0.07, 1.02, 1.08);
      box(B.dark, TAIL - 0.08, TAIL + 0.04, s * 0.80 - 0.25, s * 0.80 + 0.25, 0.55, 0.72);
      /* the aerial mounts and whips, the third at the front left corner (P1) */
      cylZ(B.dark, -2.32, s * 0.80, ROOF, ROOF + 0.10, 0.05, 8);
      cyl(B.dark, [-2.32, s * 0.80, ROOF + 0.10], [-2.32, s * 0.80, ROOF + 1.50], 0.014, 0.006, 5);
    }
    cylZ(B.dark, 0.48, 0.80, ROOF, ROOF + 0.10, 0.05, 8);
    cyl(B.dark, [0.48, 0.80, ROOF + 0.10], [0.48, 0.80, ROOF + 1.30], 0.014, 0.006, 5);
    /* --- the grille: a dark panel with the horizontal slats across it (P1, P4) --- */
    box(B.dark, NOSE - 0.03, NOSE + 0.005, -0.56, 0.56, 0.78, 1.22);
    for (i = 0; i < 6; i++) box(B.paint, NOSE, NOSE + 0.025, -0.56, 0.56, 0.81 + i * 0.07, 0.84 + i * 0.07);
    /* the heavy bumper and the winch in it (P1, P4) */
    box(B.dark, 2.50, 2.66, -1.02, 1.02, 0.50, 0.74);
    box(B.dark, 2.66, 2.70, -0.25, 0.25, 0.54, 0.70);
    /* the louvred vent at the back of the bonnet (P4) */
    var ba = Math.atan2(COWL - BNZ, 2.40 - WX0), bu = [Math.cos(ba), 0, -Math.sin(ba)], bn = [Math.sin(ba), 0, Math.cos(ba)];
    slab(B.paint, [1.22, 0, bonZ(1.22) + 0.02], bu, [0, 1, 0], bn, 0.24, 0.44, 0.02);
    for (i = 0; i < 6; i++) { x = 1.04 + i * 0.07; slab(B.dark, [x, 0, bonZ(x) + 0.045], bu, [0, 1, 0], bn, 0.012, 0.38, 0.008); }
    /* the bonnet's hinge line along the cowl */
    box(B.dark, WX0 + 0.06, WX0 + 0.09, -0.95, 0.95, COWL - 0.005, COWL + 0.01);
    /* --- the windscreen: two flat panes in a thick frame with the centre post, wipers --- */
    [-0.49, 0.49].forEach(function (wy) {
      slab(B.paint, wp(0.52, wy, 0.040), WU, [0, 1, 0], WN, 0.36, 0.45, 0.015);
      B.vc.col = GLASS;
      slab(B.vc, wp(0.53, wy, 0.062), WU, [0, 1, 0], WN, 0.29, 0.39, 0.005);
      slab(B.dark, wp(0.24, wy + 0.05, 0.075), [0, 1, 0], WU, WN, 0.28, 0.010, 0.006);
    });
    /* --- the roof: the weapon station's ring base, the team strip at the rear, a hatch --- */
    cylZ(B.paint, TX, 0, ROOF - 0.01, ROOF + 0.03, 0.60, 24);
    box(B.paint, -1.85, -1.25, -0.30, 0.30, ROOF - 0.01, ROOF + 0.04);
    box(B.dark, -1.85, -1.80, -0.22, 0.22, ROOF + 0.04, ROOF + 0.07);
    box(B.team, -2.25, -2.08, -0.75, 0.75, ROOF - 0.01, ROOF + 0.012);
    /* --- the rear face: the door with its small window, its hinges and handle (NOT CONFIRMED) --- */
    box(B.paint, TAIL - 0.03, TAIL + 0.01, -0.50, 0.50, 0.70, 1.92);
    B.vc.col = GLASS;
    box(B.vc, TAIL - 0.04, TAIL - 0.02, -0.26, 0.26, 1.55, 1.82);
    box(B.dark, TAIL - 0.06, TAIL - 0.02, 0.10, 0.28, 1.26, 1.30);
    [0.95, 1.65].forEach(function (hz) { box(B.dark, TAIL - 0.06, TAIL - 0.02, -0.56, -0.46, hz, hz + 0.10); });
  }

  /* -------------------------------------------- wheel: one per side of an axle */
  /* tyre (P1, P2): a big off-road tyre with a chunky lug tread; the painted rim, the hub and
     its nuts */
  var TYRE = [0.13, 0.135, 0.125], LUG = [0.11, 0.115, 0.105], NUT = [0.20, 0.21, 0.18];
  function addAxle(W) {
    var s, y, i, a, ca, sa, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var RIM = [rr * 1.1, gg * 1.1, bb * 1.1], HUB = [rr * 1.25, gg * 1.25, bb * 1.25];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - TH, y + TH, 0, RT - 0.01, 24);
      cyl(W, [0, y + s * TH, 0], [0, y + s * (TH + 0.025), 0], RT - 0.04, RT - 0.12, 24);
      W.col = LUG;
      for (i = 0; i < 24; i++) {
        a = i / 24 * TAU; ca = Math.cos(a); sa = Math.sin(a);
        slab(W, [ca * (RT - 0.005), y + (i % 2 ? 0.05 : -0.05), sa * (RT - 0.005)], [ca, 0, sa], [-sa, 0, ca], [0, 1, 0], 0.02, 0.04, 0.10);
      }
      W.col = RIM;
      cyl(W, [0, y + s * (TH - 0.01), 0], [0, y + s * (TH + 0.03), 0], 0.25, 0.23, 18);
      W.col = HUB;
      cyl(W, [0, y + s * (TH + 0.025), 0], [0, y + s * (TH + 0.05), 0], 0.13, 0.10, 12);
      W.col = NUT;
      for (i = 0; i < 8; i++) {
        a = i / 8 * TAU;
        cylY(W, Math.cos(a) * 0.18, y + s * (TH + 0.025), y + s * (TH + 0.04), Math.sin(a) * 0.18, 0.016, 6);
      }
    }
  }

  /* ------------------------------ the weapon station: shield ring and 12.7 mm */
  /* origin on the ring at the roof, gun along +X.  The ring with its race, the open-topped
     shield of flat plates round the front and sides, low plates behind, the 12.7 mm on its
     cradle in the front slot with the ammunition box beside it (P1, P3; plates NOT CONFIRMED) */
  var SR = 0.50, SH = 0.50, GZ = 0.44;
  function addTurret(B) {
    var k, a, s;
    cylZ(B.paint, 0, 0, 0, 0.08, SR + 0.02, 24);
    cylZ(B.dark, 0, 0, 0.08, 0.085, SR - 0.08, 20);
    for (k = -4; k < 4; k++) {
      a = k * Math.PI / 4;
      var ca = Math.cos(a), sa = Math.sin(a), rear = (k === -4 || k === -3 || k === 3), top = rear ? 0.26 : SH;
      if (k === 0) {
        /* the front plate in two halves round the gun slot, joined under it */
        [-1, 1].forEach(function (q) {
          slab(B.paint, [SR, q * 0.135, (0.08 + SH) / 2], [0, 1, 0], [0, 0, 1], [1, 0, 0], 0.075, (SH - 0.08) / 2, 0.016);
        });
        slab(B.paint, [SR, 0, (0.08 + GZ - 0.06) / 2], [0, 1, 0], [0, 0, 1], [1, 0, 0], 0.07, (GZ - 0.06 - 0.08) / 2, 0.016);
        continue;
      }
      slab(B.paint, [ca * SR, sa * SR, (0.08 + top) / 2], [-sa, ca, 0], [0, 0, 1], [ca, sa, 0], SR * Math.tan(Math.PI / 8) + 0.01, (top - 0.08) / 2, 0.016);
    }
    for (s = -1; s <= 1; s += 2) {
      /* team colour on each cheek of the shield */
      slab(B.team, [SR * Math.cos(s * Math.PI / 2) + 0.0, s * (SR + 0.02), 0.36], [1, 0, 0], [0, 0, 1], [0, s, 0], 0.16, 0.035, 0.006);
    }
    /* the pintle and cradle */
    cylZ(B.dark, 0.18, 0, 0.08, GZ - 0.04, 0.035, 8);
    box(B.dark, 0.10, 0.28, -0.05, 0.05, GZ - 0.06, GZ - 0.02);
    /* the 12.7 mm: receiver, barrel, muzzle brake, the spade grips, the sight */
    box(B.dark, -0.10, 0.36, -0.045, 0.045, GZ - 0.02, GZ + 0.08);
    cyl(B.dark, [0.36, 0, GZ + 0.03], [1.25, 0, GZ + 0.03], 0.024, 0.022, 10);
    cyl(B.dark, [1.15, 0, GZ + 0.03], [1.29, 0, GZ + 0.03], 0.036, 0.036, 10);
    cyl(B.dark, [0.36, 0, GZ + 0.03], [0.52, 0, GZ + 0.03], 0.034, 0.034, 10);
    box(B.dark, -0.17, -0.10, -0.08, 0.08, GZ - 0.01, GZ + 0.07);
    box(B.dark, 0.20, 0.26, -0.015, 0.015, GZ + 0.08, GZ + 0.14);
    /* the ammunition box on the left of the receiver */
    box(B.paint, -0.02, 0.24, 0.05, 0.20, GZ - 0.10, GZ + 0.06);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, WB, tg;
    addBody(HB);
    flush(THREE, g, HB);
    for (i = 0; i < XA.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addAxle(WB);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XA[i], 0, ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    addTurret(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, ROOF + 0.03);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build };
})();

/* len: the measured X extent of the build */
UNIT_MODELS["pla_e00_recon"] = { len: 5.35, build: HeroMengshi.build };
