/* ========== pla_ztd05.js - HERO model: ZTD-05 (ZLT-05) amphibious assault vehicle ==========
   pla_e00_lighttank   "ZTD-05 amphibious assault vehicle (2006); ZTQ-15 light tank (2018)".
   Drawn as the ZTD-05, the 2006 vehicle: the tank variant of the Type 05 family (105 mm gun
   in a turret on the ZBD-05's planing hull).  NOT the ZTQ-15 (a conventional light tank).

   References, Wikimedia Commons at width 960, cached in scratchpad/q_pla_e00_lighttank_ref:
     P1  the Navy Museum ZLT05 photograph (Commons title in Chinese: "Haijun bowuguan -
         ZLT05 shi liangqi zhuangjia tujiche"), saved as P_museum.jpg - front right 3/4: the
         long box hull with tall flat sides, a horizontal seam about half way down, below it
         a band of segmented rectangular panels (two rows) down to about road-wheel centre,
         its front edge slanting forward; the trim vane DEPLOYED forward as one hull-wide
         plate with deep side cheeks; the low, squat faceted turret well AFT, its bustle near
         the stern; the long 105 mm with a slotted muzzle brake; smoke dischargers low on the
         turret front corners; large road wheels and the front sprocket under the band.
     The Commons photos "ZTD-05-1.jpg" (Joint Sea-2016) and the ZBD-05 parade photos were
     rate-limited (HTTP 429) and could not be fetched in time: no side-on reference used.
   Published (en.wikipedia "Type 05 amphibious fighting vehicle"): hull 9.5 m long, 3.36 m
   wide, 3.04 m high, 26.5 t; crew 4; ZPL-98A 105 mm rifled gun, 7.62 mm coaxial, QJC-88
   12.7 mm on the roof; "six retractable road wheels on each side", front/rear rollers,
   bow trim vane and stern flap, two water jets at the rear, "2 sets of 4-barrel smoke
   grenade launchers"; driver front left.

   Corrections vs the generic model: one hull with tall slab sides instead of a deck on
   stilts; the folded trim vane over a long glacis instead of the bow box; the turret moved
   aft (ring x -1.5) and made low (0.58 m); 12.6 m overall cut to 9.54 m (the gun ends at
   the bow, P1); six wheels a side, not seven; water jets on the transom; 14 draw calls
   instead of 159.

   Recognition list (what makes it read at game zoom, and its source):
     1. a very long, tall-sided box hull with a flat roof - P1
     2. the long sloping bow: the trim vane folded back on the glacis, its side cheeks - P1
        (P1 shows it deployed; drawn folded as for travel on land)
     3. the horizontal side seam and the band of panels below it - P1
     4. the low small turret well aft, long 105 mm with the muzzle brake - P1
     5. six road wheels, front sprocket, rear idler half hidden by the band - P1, published
     6. the two water-jet outlets and the stern flap on the transom - published
   Paint: PLA green #56613a (as the ZBD-04A model); P1's museum blue camouflage, stars and
   numbers: not drawn.
   NOT CONFIRMED, judgement calls: no side drawing or side-on photograph, so every station is
   read through P1's perspective and scaled to the published 9.5 x 3.36 x 3.04 m: the road
   wheel size (0.62 m) and even pitch (0.95 m), the sprocket and idler positions, the roof at
   2.28 m, the seam and panel band heights, the bow edge height, the glacis angle, the
   folded vane's length and cheek shape (the folded pose is inferred, not photographed), the
   turret plan and the ring at x -1.5, the gun length (muzzle at the bow edge), the fume
   extractor's place, the smoke tubes' arrangement (2 x 2 a side), the cupola, 12.7 mm and
   hatches, the engine grilles (front right assumed), the water-jet outlets' shape and size,
   the stern flap, the rear deck hatches, the turret rear rail.
   Triangles 13,068; 14 draw calls (hull 4, turret 4, six wheels); 5 materials.  Measured
   9.54 x 3.36 x 3.03 m to the sight and MG tops (3.98 m to the whip); published 9.5 x 3.36
   x 3.04 m.
   Materials: PAINT (canvas texture), DARK, GLASS, WHEEL (vertex colours), team colour
   (C.team): strips on the rear roof edge, the engine grille and the turret roof.
   Nodes: "turret" (ring centre on the roof, gun along +X) and six "roadwheel" groups (both
   sides in one mesh, axle along Y).
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroZtd05 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var PAINT = { base: "#56613a", blots: ["#4c5633", "#606b42"], seed: 2005 };
  /* running gear: six wheels at an even pitch, front sprocket, rear idler */
  var TY = 1.38, TW = 0.22;
  var XW = [2.05, 1.10, 0.15, -0.80, -1.75, -2.70], ZW = 0.36, RW = 0.31;
  var SPR = { x: 2.95, z: 0.72, r: 0.28 }, IDL = { x: -3.60, z: 0.62, r: 0.28 };
  /* hull: stern, bow edge (vane folded) and its height, belly, where the bottom starts to
     rise, the roof break, roof, the side seam, the panel band's bottom, its row seam and its
     front edge (bottom, top); half widths (over the sides / between the tracks) */
  var REAR = -4.50, NOSE = 4.72, ZN = 1.15, BELLY = 0.42, BOW0 = 2.60, GL = 2.00, ROOF = 2.28;
  var SEAM = 1.36, SKB = 0.55, ZB = 0.95, BAND0 = 2.45, BAND1 = 3.15;
  var HW = 1.65, LW = 1.10;
  var VANE = 2.30;                                /* the folded trim vane's run along X */
  var JY = 0.78, JZ = 1.00;                       /* water-jet outlets */
  var TX = -1.50, TH = 0.58;                      /* turret ring centre, turret height */
  var GZ = 0.30, GX1 = 2.30, GX2 = 2.90, GMZ = 6.15; /* gun axis, extractor, muzzle */
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
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg); }
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
    T.glass = new THREE.MeshStandardMaterial({ color: 0x3a5872, roughness: 0.3, metalness: 0.2 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false) }; }
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
  /* the glacis: from the roof break GL down to the bow edge at (NOSE, ZN) */
  var GANG = Math.atan2(ROOF - ZN, NOSE - GL);
  function gz(x) { return ROOF - (x - GL) * Math.tan(GANG); }
  function gx(z) { return GL + (ROOF - z) / Math.tan(GANG); }
  var GU = [Math.cos(GANG), 0, -Math.sin(GANG)], GW = [Math.sin(GANG), 0, Math.cos(GANG)];
  function onGlacis(bin, x, y, hu, hv, hw, lift) {
    slab(bin, [x, y, gz(x) + (lift || 0) + hw], GU, [0, 1, 0], GW, hu, hv, hw);
  }
  /* a thin plate on a hull side: outer face at s * HW, inward by th */
  function sideBox(bin, s, x0, x1, z0, z1, out, th) {
    var yo = s * (HW + (out || 0));
    box(bin, x0, x1, s > 0 ? yo - th : yo, s > 0 ? yo : yo + th, z0, z1);
  }
  function addHull(B) {
    var s, i, x, k;
    /* the planing hull between the tracks (P1, P2): the long flat bottom, rising at the bow
       to the bow edge in one shallow run and a little at the stern to the transom */
    prismY(B.paint, [[REAR + 0.02, 0.66], [REAR + 0.60, BELLY], [BOW0, BELLY], [NOSE, ZN], [GL, ROOF], [REAR + 0.02, ROOF]], -LW, LW);
    for (s = -1; s <= 1; s += 2) {
      var y0 = s > 0 ? LW - 0.01 : -HW + 0.03, y1 = s > 0 ? HW - 0.03 : -LW + 0.01;
      /* the sponson over the track: full width, its underside rising to the bow */
      prismY(B.paint, [[REAR + 0.02, SKB + 0.05], [BOW0 - 0.30, SKB + 0.05], [NOSE, ZN], [GL, ROOF], [REAR + 0.02, ROOF]], y0, y1);
      /* the tall flat upper side plate down to the horizontal seam (P1, P2) */
      prismY(B.paint, [[REAR, SEAM], [gx(SEAM) - 0.04, SEAM], [GL, ROOF - 0.04], [REAR, ROOF - 0.04]], s > 0 ? HW - 0.04 : -HW, s > 0 ? HW : -HW + 0.04);
      sideBox(B.dark, s, REAR + 0.02, gx(SEAM) - 0.10, SEAM - 0.02, SEAM + 0.02, 0.008, 0.06);
      /* the band of segmented panels below the seam: two rows, its front edge slanting
         forward to the seam (P1, P2) */
      prismY(B.paint, [[REAR, SKB], [BAND0, SKB], [BAND1, SEAM - 0.02], [REAR, SEAM - 0.02]], s > 0 ? HW - 0.05 : -HW, s > 0 ? HW : -HW + 0.05);
      sideBox(B.dark, s, REAR + 0.02, BAND0 + (BAND1 - BAND0) * (ZB - SKB) / (SEAM - SKB) - 0.04, ZB - 0.012, ZB + 0.012, 0.006, 0.05);
      for (x = REAR + 0.78; x < BAND0; x += 0.78) sideBox(B.dark, s, x - 0.012, x + 0.012, SKB + 0.03, SEAM - 0.04, 0.006, 0.05);
      for (x = REAR + 0.39; x < BAND0; x += 0.78) {     /* bolt heads at the panel corners */
        sideBox(B.dark, s, x - 0.025, x + 0.025, ZB + 0.06, ZB + 0.11, 0.018, 0.04);
        sideBox(B.dark, s, x - 0.025, x + 0.025, SKB + 0.06, SKB + 0.11, 0.018, 0.04);
      }
      /* the rubber strip along the bottom of the band */
      sideBox(B.dark, s, REAR + 0.10, BAND0 - 0.05, SKB - 0.10, SKB, -0.02, 0.05);
      /* small fittings on the upper side (P1, P2): grab handles, a step, the vent slots aft */
      [-2.20, 0.40, 2.30].forEach(function (hx) { sideBox(B.dark, s, hx - 0.10, hx + 0.10, ROOF - 0.42, ROOF - 0.38, 0.03, 0.03); });
      sideBox(B.dark, s, 0.60, 0.90, SEAM + 0.25, SEAM + 0.29, 0.03, 0.03);
      for (i = 0; i < 2; i++) sideBox(B.dark, s, -3.90 + i * 0.14, -3.79 + i * 0.14, SEAM + 0.18, SEAM + 0.28, 0.006, 0.03);
      /* headlamps in guards at the top corners of the glacis */
      onGlacis(B.paint, GL + 0.50, s * (HW - 0.30), 0.12, 0.14, 0.06, 0.0);
      onGlacis(B.glass, GL + 0.63, s * (HW - 0.30), 0.012, 0.09, 0.04, 0.06);
      /* the stern: two water-jet outlets low on the transom, their reversing buckets */
      cylX(B.dark, REAR - 0.10, REAR + 0.02, s * JY, JZ, 0.27, 0.27, 16);
      cylX(B.dark, REAR - 0.11, REAR - 0.09, s * JY, JZ, 0.20, 0.20, 16);
      belt(B.paint, REAR - 0.10, JZ + 0.32, REAR - 0.26, JZ - 0.12, s * JY - 0.31, s * JY + 0.31, 0.04);
      box(B.dark, REAR - 0.25, REAR - 0.04, s * JY - 0.34, s * JY - 0.30, JZ - 0.10, JZ + 0.30);
      box(B.dark, REAR - 0.25, REAR - 0.04, s * JY + 0.30, s * JY + 0.34, JZ - 0.10, JZ + 0.30);
      /* tail lamps at the top corners of the transom */
      box(B.dark, REAR - 0.04, REAR, s * (HW - 0.25) - 0.08, s * (HW - 0.25) + 0.08, ROOF - 0.30, ROOF - 0.18);
      box(B.glass, REAR - 0.045, REAR - 0.04, s * (HW - 0.25) - 0.06, s * (HW - 0.25) + 0.06, ROOF - 0.28, ROOF - 0.20);
      /* tow hooks low on the transom */
      box(B.dark, REAR - 0.12, REAR, s * 1.35 - 0.06, s * 1.35 + 0.06, SKB + 0.15, SKB + 0.27);
    }
    /* the transom plate and the stern flap folded up against it between the jets */
    box(B.paint, REAR, REAR + 0.03, -HW + 0.04, HW - 0.04, SKB, ROOF - 0.04);
    box(B.paint, REAR - 0.07, REAR, -0.42, 0.42, JZ - 0.30, ROOF - 0.40);
    cylY(B.dark, REAR - 0.06, -0.44, 0.44, JZ - 0.30, 0.04, 8);
    box(B.dark, REAR - 0.09, REAR - 0.07, -0.30, 0.30, ROOF - 0.62, ROOF - 0.57);
    /* the trim vane, drawn FOLDED back on the glacis as for travel on land: one flat plate
       the full width of the hull from the hinge at the bow edge, its stiffening ribs and
       the deep side cheeks standing up along its edges (P1: deployed, the same plate) */
    var VL = VANE / Math.cos(GANG), VX = NOSE - VANE / 2;
    onGlacis(B.paint, VX, 0, VL / 2, HW - 0.08, 0.04, 0.03);
    for (i = -2; i <= 2; i++) if (i) onGlacis(B.paint, VX, i * 0.58, VL / 2 - 0.10, 0.035, 0.035, 0.11);
    onGlacis(B.paint, NOSE - VANE + 0.10, 0, 0.06, HW - 0.12, 0.05, 0.11);
    cylY(B.dark, NOSE - 0.03, -HW + 0.20, HW - 0.20, ZN + 0.01, 0.075, 10);
    for (s = -1; s <= 1; s += 2) {
      var xa = NOSE - VANE;
      prismY(B.paint, [[xa, gz(xa) + 0.02], [NOSE, ZN + 0.02], [NOSE - 0.12, ZN + 0.20], [xa + 0.15, gz(xa) + 0.42], [xa, gz(xa) + 0.42]],
             s > 0 ? HW - 0.07 : -HW, s > 0 ? HW : -HW + 0.07);
      /* the vane's rams at the bow edge, the tow eyes under it */
      box(B.dark, NOSE - 0.35, NOSE - 0.02, s * 1.05 - 0.07, s * 1.05 + 0.07, ZN + 0.03, ZN + 0.14);
      box(B.dark, NOSE - 0.40, NOSE - 0.15, s * 0.70 - 0.06, s * 0.70 + 0.06, ZN - 0.24, ZN - 0.08);
    }
    /* the roof ahead of the turret: driver's hatch and periscopes front left, the engine
       deck grilles front right, the intake on the left */
    cylZ(B.paint, GL - 0.40, 0.80, ROOF, ROOF + 0.07, 0.30, 16);
    for (i = -1; i <= 1; i++) box(B.glass, GL - 0.06, GL + 0.02, 0.80 + i * 0.18 - 0.06, 0.80 + i * 0.18 + 0.06, ROOF - 0.01, ROOF + 0.06);
    box(B.paint, -0.20, 1.80, -1.40, -0.30, ROOF, ROOF + 0.03);
    for (i = 0; i < 14; i++) box(B.dark, -0.12 + i * 0.13, -0.07 + i * 0.13, -1.32, -0.38, ROOF + 0.03, ROOF + 0.045);
    box(B.paint, -0.20, 0.90, 0.40, 1.35, ROOF, ROOF + 0.03);
    for (i = 0; i < 8; i++) box(B.dark, -0.12 + i * 0.13, -0.07 + i * 0.13, 0.48, 1.27, ROOF + 0.03, ROOF + 0.045);
    /* the rear deck behind the turret: two hatches; the team strips on the rear edge and the
       right front of the roof */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -4.25, -3.55, s * 0.70 - 0.34, s * 0.70 + 0.34, ROOF, ROOF + 0.04);
      box(B.dark, -3.66, -3.60, s * 0.70 - 0.08, s * 0.70 + 0.08, ROOF + 0.04, ROOF + 0.08);
    }
    box(B.team, REAR + 0.06, REAR + 0.20, -1.00, 1.00, ROOF, ROOF + 0.015);
    box(B.team, 1.50, 1.75, -1.40, -0.30, ROOF + 0.03, ROOF + 0.05);
  }

  /* ------------------------------------------------------------ running gear */
  function hull2(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  function addRunning(B) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts = [];
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.035]);
    C.push([IDL.x, IDL.z, IDL.r + 0.035], [SPR.x, SPR.z, SPR.r + 0.035]);
    for (i = 0; i < C.length; i++) for (k = 0; k < 24; k++) pts.push([C[i][0] + Math.cos(k / 24 * TAU) * C[i][2], C[i][1] + Math.sin(k / 24 * TAU) * C[i][2]]);
    pts = hull2(pts);
    n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    n = segs.length;
    cnt = Math.round(tot / 0.20); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.05);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        belt(B.dark, px - dx * 0.05, pz - dz * 0.05, px + dx * 0.05, pz + dz * 0.05, y - TW - 0.01, y + TW + 0.01, 0.07);
        belt(B.dark, px - dx * 0.025 - dz * 0.06, pz - dz * 0.025 + dx * 0.06, px + dx * 0.025 - dz * 0.06, pz + dz * 0.025 + dx * 0.06, y - 0.025, y + 0.025, 0.05);
      }
      /* the toothed drive sprocket at the FRONT */
      cylY(B.dark, SPR.x, y - 0.12, y + 0.12, SPR.z, SPR.r - 0.05, 18);
      for (i = 0; i < 11; i++) {
        var ta = i / 11 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [SPR.x + ca * (SPR.r - 0.02), y, SPR.z + sa * (SPR.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.04, 0.09, 0.03);
      }
      cylY(B.paint, SPR.x, y + s * 0.12, y + s * 0.17, SPR.z, 0.15, 14);
      /* the idler at the rear: a dished disc and hub */
      cylY(B.paint, IDL.x, y - 0.16, y + 0.16, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.16, y + s * 0.17, IDL.z, IDL.r - 0.05, 18);
      cylY(B.dark, IDL.x, y + s * 0.16, y + s * 0.22, IDL.z, 0.08, 10);
    }
  }
  /* road wheel: rubber tyre, a dished disc, the hub with its bolt circle */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.17, 0.18, 0.15];
  function addWheel(W) {
    var s, y, i, a, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIB = [rr * 1.3, gg * 1.3, bb * 1.3];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.19, y + 0.19, 0, RW, 20);
      W.col = BODY;
      cyl(W, [0, y + s * 0.19, 0], [0, y + s * 0.22, 0], RW - 0.05, 0.14, 20);
      W.col = RIB;
      cylY(W, 0, y + s * 0.21, y + s * 0.24, 0, 0.11, 12);
      W.col = HOLE;
      for (i = 0; i < 8; i++) {
        a = i / 8 * TAU;
        box(W, Math.cos(a) * 0.07 - 0.012, Math.cos(a) * 0.07 + 0.012, s > 0 ? y + 0.235 : y - 0.25, s > 0 ? y + 0.25 : y - 0.235, Math.sin(a) * 0.07 - 0.012, Math.sin(a) * 0.07 + 0.012);
      }
      cylY(W, 0, y + s * 0.24, y + s * 0.26, 0, 0.04, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* plan half outlines (x, y) from the ring centre, front to rear, at three heights (P1, P2):
     a low, squat welded turret, the front a shallow wedge either side of the mantlet, the
     sides leaning in, the bustle carried nearly to the stern */
  var TPL = [
    { z: -0.02, H: [[1.00, 0.40], [0.86, 0.88], [0.50, 1.00], [-1.20, 1.00], [-1.45, 0.86], [-1.50, 0.40]] },
    { z: 0.30, H: [[0.98, 0.40], [0.83, 0.87], [0.48, 0.98], [-1.20, 0.98], [-1.47, 0.84], [-1.52, 0.40]] },
    { z: TH, H: [[0.74, 0.37], [0.60, 0.75], [0.34, 0.85], [-1.12, 0.85], [-1.38, 0.73], [-1.42, 0.36]] }
  ];
  function ringAt(H, z) {
    var Q = [], i;
    for (i = 0; i < H.length; i++) Q.push([H[i][0], H[i][1], z]);
    for (i = H.length - 1; i >= 0; i--) Q.push([H[i][0], -H[i][1], z]);
    return Q;
  }
  function addTurret(B) {
    var R = [], i, s, q, k;
    for (i = 0; i < TPL.length; i++) R.push(ringAt(TPL[i].H, TPL[i].z));
    loftN(B.paint, R);
    /* the mantlet: a slab across the gun, the cloth cover at the root of the barrel (P1) */
    box(B.paint, 0.88, 1.10, -0.36, 0.36, 0.04, 0.52);
    cylX(B.dark, 1.10, 1.28, 0, GZ, 0.19, 0.14, 14);
    /* the 105 mm ZPL-98A (P1): thermal sleeve in sections with clamp bands, the fume
       extractor about a third of the way out, the slotted muzzle brake */
    cylX(B.paint, 1.28, GX1, 0, GZ, 0.10, 0.092, 16);
    cylX(B.paint, GX1, GX2, 0, GZ, 0.13, 0.13, 16);
    cyl(B.paint, [GX1 - 0.10, 0, GZ], [GX1, 0, GZ], 0.092, 0.13, 16, true);
    cyl(B.paint, [GX2, 0, GZ], [GX2 + 0.10, 0, GZ], 0.13, 0.088, 16, true);
    cylX(B.paint, GX2 + 0.10, GMZ - 0.50, 0, GZ, 0.088, 0.078, 16);
    [1.75, GX2 + 0.95, GMZ - 1.40].forEach(function (bx) { cylX(B.dark, bx, bx + 0.06, 0, GZ, 0.105, 0.10, 14); });
    cylX(B.dark, GMZ - 0.50, GMZ, 0, GZ, 0.115, 0.115, 16);
    for (i = 0; i < 4; i++) for (s = -1; s <= 1; s += 2) box(B.dark, GMZ - 0.44 + i * 0.11, GMZ - 0.38 + i * 0.11, s > 0 ? 0.10 : -0.12, s > 0 ? 0.12 : -0.10, GZ - 0.05, GZ + 0.05);
    /* coaxial MG port to the right of the gun, the laser box over the mantlet */
    cylX(B.dark, 1.02, 1.20, -0.28, GZ - 0.06, 0.03, 0.025, 8);
    box(B.paint, 0.62, 0.86, 0.26, 0.44, TH, TH + 0.12);
    box(B.glass, 0.86, 0.87, 0.29, 0.41, TH + 0.02, TH + 0.10);
    /* the gunner's sight box on the right front of the roof */
    box(B.paint, 0.20, 0.66, -0.72, -0.44, TH, TH + 0.16);
    box(B.glass, 0.66, 0.67, -0.68, -0.48, TH + 0.04, TH + 0.13);
    /* commander's cupola on the right with its sight head; the loader's hatch to the left
       with the QJC-88 12.7 mm on its mount (published) */
    cylZ(B.paint, -0.45, -0.50, TH, TH + 0.10, 0.30, 16);
    cylZ(B.dark, -0.45, -0.50, TH + 0.10, TH + 0.115, 0.25, 14);
    box(B.paint, -0.22, -0.02, -0.40, -0.20, TH + 0.08, TH + 0.17);
    box(B.glass, -0.02, -0.01, -0.37, -0.23, TH + 0.10, TH + 0.15);
    cylZ(B.paint, -0.50, 0.52, TH, TH + 0.06, 0.28, 16);
    cylZ(B.dark, -0.50, 0.52, TH + 0.06, TH + 0.075, 0.23, 14);
    cylZ(B.dark, -0.25, 0.52, TH + 0.06, TH + 0.10, 0.03, 8);
    box(B.dark, -0.40, 0.00, 0.47, 0.57, TH + 0.08, TH + 0.15);
    cylX(B.dark, 0.00, 0.70, 0.52, TH + 0.12, 0.022, 0.018, 8);
    box(B.dark, -0.34, -0.20, 0.59, 0.72, TH + 0.06, TH + 0.14);
    /* smoke dischargers low on the front corners, four a side pointing forward (P1, P2;
       "2 sets of 4", published) */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, 0.55, 0.80, s * 0.93 - 0.12, s * 0.93 + 0.12, 0.06, 0.30);
      for (q = 0; q < 4; q++) {
        var ty = s * (0.86 + (q % 2) * 0.13), tz = 0.13 + Math.floor(q / 2) * 0.12;
        cyl(B.dark, [0.78, ty, tz], [1.00, ty + s * 0.03, tz + 0.05], 0.05, 0.05, 8);
      }
    }
    /* the low rail behind the bustle (P1) */
    var BX1 = -1.40, BX2 = -1.80, BY = 0.80;
    box(B.dark, BX2, BX1, -BY, BY, 0.10, 0.13);
    for (k = 0; k < 2; k++) {
      var rz = 0.24 + k * 0.18;
      box(B.dark, BX2, BX1, BY - 0.025, BY, rz, rz + 0.025);
      box(B.dark, BX2, BX1, -BY, -BY + 0.025, rz, rz + 0.025);
      box(B.dark, BX2, BX2 + 0.025, -BY, BY, rz, rz + 0.025);
    }
    for (i = 0; i <= 8; i++) { var py = -BY + i * (2 * BY / 8); box(B.dark, BX2, BX2 + 0.022, py - 0.011, py + 0.011, 0.10, 0.45); }
    /* aerial bases on the rear corners, one whip */
    for (s = -1; s <= 1; s += 2) cylZ(B.dark, -1.20, s * 0.70, TH, TH + 0.10, 0.04, 8);
    cylZ(B.dark, -1.20, 0.70, TH + 0.10, TH + 1.10, 0.008, 5);
    box(B.team, -1.30, -1.18, -0.50, 0.50, TH, TH + 0.015);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, WB, tg;
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
    tg.position.set(TX, 0, ROOF);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build };
})();

/* len: the measured X extent of the build */
UNIT_MODELS["pla_e00_lighttank"] = { len: 9.54, build: HeroZtd05.build };
