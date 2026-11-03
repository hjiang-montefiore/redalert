/* ========== pla_zts63a.js - HERO model: ZTS-63A (Type 63A) amphibious light tank ==========
   pla_e90_lighttank   "ZTS-63A amphibious light tank", service 1997 (WZ213).  Drawn as the basic
   Type 63A: the Type 63 boat hull with the 63A's bow and stern floating tanks, side skirts, its
   new WELDED turret and the 105 mm gun.  NOT the Type 63 (half-egg cast turret, 85 mm), and not
   the 63A-I/II (bolted add-on armour mounts).

   Started from js/hero/ru_pt76.js (the Type 63 descends from the PT-76): its geometry kit, paint
   texture, materials, flush, the hull loft and the running-gear code are copied here and re-sized
   to the Type 63's figures; the turret and gun are this vehicle's own.

   References, Wikimedia Commons, cached in scratchpad/q_pla_e90_lighttank_ref:
     P1  "Type 63A Amphibious tank 20131004.JPG" (Beijing, width 960) - front left 3/4: the bow
         floating tank as a wedge across the full width with the trim vane folded flat on top, the
         long raked bottom plate, the X-shaped vane arms on the bow cheeks; the side skirt box with
         its rib; the welded turret with the pointed front, the 4-tube smoke launchers on the
         cheek, the rear basket, the canvas mantlet cover; two lamps in a guard on the glacis.
     P2  "Haijun bowuguan - ZTS63A xing shuilu tanke" (Navy Museum, Qingdao; Chinese title, width
         960) - front right 3/4: the same bow tank and vane, the skirt full length, the turret
         plan (smoke launchers on both cheeks, basket rail), the gun with sleeve clamps and the
         multi-baffle muzzle brake.
     P3  "Type 63A jianchuan museum cluster.jpg" (width 1400, cropped) - port side, slightly from
         ahead: proportions bow tank / hull / turret, the turret low and amidships, the extractor,
         the skirt along the whole side, the three vertical slot inlets near the stern.
     P4  "Type 63 Amphibious tank 20180219.jpg" (Military Museum, Beijing) - the Type 63: six
         large pressed road wheels, no return rollers, front idler and rear sprocket, slab sides,
         the nearly flat glacis - the base hull the 63A keeps.
     No side-on photograph or drawing of the 63A exists on Commons; P3 is the nearest.
   Published: en.wikipedia "Type 63A light tank": 9.6 m gun forward, 3.2 m wide, 2.5 m high, 20 t;
   "2 additional floating tanks" (en.wikipedia "Type 63 (tank)": "one in the front and one in the
   rear", and these with the longer gun made it 9.6 m), side skirts, a welded turret with four
   smoke dischargers on each side, a stowage bucket at the rear and two on the sides, 105 mm
   rifled gun, two water jets at the rear.  en.wikipedia "Type 63 (tank)": hull 7.15 m, 8.44 m
   with the 85 mm gun, 3.2 m wide, 2.522 m high; driver at the front LEFT; six road wheels, front
   idler, rear sprocket, no return rollers; bigger wheels and tracks mounted higher than the PT-76;
   three vertical-slot side air inlets; the turret amidships.

   CORRECTIONS against the generic model: seven road wheels cut to six, raised idler and sprocket
   with the track lying on the wheels; the stilted deck and box bow replaced by the Type 63 boat
   hull with the 63A's wedge bow floating tank, folded vane and stern tank; side skirts; the box
   turret replaced by the faceted welded turret with smoke launchers and rear basket; the gun given
   its extractor and muzzle brake; 151 draw calls cut to 14.
   Triangles 15,564; 14 draw calls; 5 materials.  Measured 9.61 x 3.20 x 2.50 m to the cupola
   (3.30 m to the whip); published 9.6 x 3.2 x 2.5 m.

   Recognition list (what makes it read at game zoom, and its source):
     1. very long flat boat hull, flat deck - P1, P3, P4
     2. the wedge bow floating tank with its long raked bottom, vane folded flat on top - P1, P2
     3. skirt box along the whole side over the track - P1, P2, P3
     4. six big road wheels, no return rollers - P4, text
     5. low welded faceted turret amidships, pointed front, rear basket - P1, P2, P3
     6. long 105 mm with extractor and muzzle brake past the bow - P2, P3
     7. four smoke tubes on each turret cheek - P1, P2, text
     8. X-shaped vane arms on the bow cheeks, lamp pair on the glacis - P1, P2
     9. stern floating tank with the two water-jet outlets - text
   Paint: PLA green #525c3a (as the other PLA heroes); P1's and P3's three-tone camouflage, P2's
   digital blue camouflage, stars and numbers: not drawn.
   NOT CONFIRMED, estimated from proportions and published totals: every station along X (no
   side-on photo; P3 is foreshortened) - the bow tank 1.03 m long and its top 0.18 m below the
   deck, the stern tank 0.38 m deep, the ring at x 0.15, the muzzle 5.37 m ahead of it (fitted so
   the length is the published 9.6 m); deck 1.55 m and turret 0.80 m (fitted to 2.5 m); road wheel
   0.75 m on 0.86 m centres (Type 63 "bigger" than the PT-76's 0.67 m); the turret plan and slope;
   the stern tank and the water-jet outlets (no photograph of the 63A's stern - drawn round, as on
   the PT-76); the roof fittings (cupola left, hatch right, sight boxes, wind-sensor mast); the
   12.7 mm AA MG (left off: the published height is without it); the basket's bars; the skirt
   height and joint straps; the vane's ribs and hinges; the rear deck grilles.
   Materials: PAINT (canvas texture, metre UVs), DARK (track, gun, fittings), GLASS, WHEEL (vertex
   colours), and the team colour exactly as handed in (C.team) on two strips on the rear deck and
   one on the turret roof.  Nodes: "turret" (ring centre on the deck, gun along +X at rest) and six
   "roadwheel" groups (axle on local Y, both sides in one mesh).
   Model space +X bow, +Y left (port), +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroZts63a = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var PAINT = { base: "#525c3a", seed: 1997, us: 0.34 };
  /* running gear: six 0.75 m wheels on 0.86 m centres, the front idler and rear sprocket raised */
  var XW = [2.27, 1.41, 0.55, -0.31, -1.17, -2.03], ZW = 0.40, RW = 0.375;
  var TY = 1.36, TW = 0.19;
  var IDL = { x: 3.12, z: 0.62, r: 0.23 }, SPR = { x: -2.88, z: 0.60, r: 0.27 };
  /* hull: the Type 63's 7.15 m (stern HS, old bow HB), deck, glacis knee and drop, the ledge,
     half widths over the sides / between the tracks / over the skirts; the bow tank's nose and
     top, the stern tank's face; the skirt's bottom and top */
  var HS = -3.62, HB = 3.53, D = 1.55, KNEE = 2.20, DROP = 0.18, LEDGE = 1.02;
  var WS = 1.46, WL = 1.14, WX = 1.57;
  var NOSE = 4.56, BT = 1.37, STERN = -4.00;
  var SK0 = 0.90, SK1 = 1.28;
  /* turret: ring centre, roof height, gun axis over the deck, muzzle (ring frame) */
  var TX = 0.15, ROOF = 0.80, GZ = 0.42, MUZ = 5.37;

  /* ------------------------------------------------------------ geometry kit (ru_pt76.js) */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  function Bin(mat, uv, vc, us) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; this.us = us || 0.34; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]), k = this.us;
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * k, q[1] * k);
        else if (ay >= ax) this.U.push(q[0] * k, q[2] * k);
        else this.U.push(q[1] * k, q[2] * k);
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
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg); }
  /* a closed solid lofted through rings of the same count, the end rings capped with fans */
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
  /* smooth-sided loft (averaged normals), kept from the PT-76 kit (used for the mantlet cover) */
  function loftS(bin, rings) {
    var n = rings[0].length, V = [], F = [], i, k, r, a, b, c0, c1, f, vol = 0;
    for (r = 0; r < rings.length; r++) for (k = 0; k < n; k++) V.push(rings[r][k]);
    var ns = V.length;
    for (r = 0; r + 1 < rings.length; r++) for (k = 0; k < n; k++) {
      a = r * n + k; b = r * n + (k + 1) % n; c0 = a + n; c1 = b + n;
      F.push([a, b, c1], [a, c1, c0]);
    }
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    var cA = [0, 0, 0], cB = [0, 0, 0];
    for (k = 0; k < n; k++) for (i = 0; i < 3; i++) { cA[i] += V[k][i] / n; cB[i] += V[ns - n + k][i] / n; }
    for (k = 0; k < n; k++) {
      vol += dot(cA, cross(V[(k + 1) % n], V[k]));
      vol += dot(cB, cross(V[ns - n + k], V[ns - n + (k + 1) % n]));
    }
    var sg = vol < 0 ? -1 : 1, Nv = [], t;
    for (i = 0; i < ns; i++) Nv.push([0, 0, 0]);
    for (i = 0; i < F.length; i++) {
      f = F[i]; t = unit(cross(sub(V[f[1]], V[f[0]]), sub(V[f[2]], V[f[0]])));
      for (k = 0; k < 3; k++) { Nv[f[k]][0] += t[0] * sg; Nv[f[k]][1] += t[1] * sg; Nv[f[k]][2] += t[2] * sg; }
    }
    for (i = 0; i < ns; i++) Nv[i] = unit(Nv[i]);
    for (i = 0; i < F.length; i++) {
      f = F[i];
      if (sg > 0) bin.tri(V[f[0]], V[f[1]], V[f[2]], Nv[f[0]], Nv[f[1]], Nv[f[2]]);
      else bin.tri(V[f[0]], V[f[2]], V[f[1]], Nv[f[0]], Nv[f[2]], Nv[f[1]]);
    }
    for (k = 0; k < n; k++) {
      a = V[k]; b = V[(k + 1) % n]; c0 = V[ns - n + k]; c1 = V[ns - n + (k + 1) % n];
      if (sg > 0) { bin.tri(cA, b, a); bin.tri(cB, c0, c1); } else { bin.tri(cA, a, b); bin.tri(cB, c1, c0); }
    }
  }
  function pwl(T, x) {
    var i, t;
    if (x <= T[0][0]) return T[0][1];
    for (i = 0; i + 1 < T.length; i++) if (x <= T[i + 1][0]) { t = (x - T[i][0]) / (T[i + 1][0] - T[i][0]); return T[i][1] + (T[i + 1][1] - T[i][1]) * t; }
    return T[T.length - 1][1];
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function canvasTex(THREE, key, size, draw) {
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = size; cv.height = size;
      draw(cv.getContext("2d"), size);
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* PLA green, one tile 1 / 0.34 = 2.9 m: soft mottling, welded plate seams with bolt rows
     (P1, P2 show bolted access plates on the hull and skirts), rain streaks and road grime */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "zts63a" + P.base + P.seed, 512, function (q, S) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (i = 0; i < 30; i++) {
        q.globalAlpha = 0.14 + R() * 0.16; q.fillStyle = i % 2 ? "#485232" : "#5c6642";
        q.beginPath(); q.ellipse ? q.ellipse(R() * S, R() * S, 30 + R() * 70, 20 + R() * 50, R() * 3, 0, TAU) : q.rect(R() * S, R() * S, 60, 40); q.fill();
      }
      q.globalAlpha = 1;
      for (i = 0; i < 7; i++) {
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 2, w, 1); else q.fillRect(x + 2, y, 1, w);
        q.fillStyle = "rgba(18,18,14,0.40)";
        for (k = 6; k < w; k += 16) { if (i % 2) q.fillRect(x + k, y - 5, 3, 3); else q.fillRect(x - 5, y + k, 3, 3); }
      }
      for (i = 0; i < 90; i++) {
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 24; i++) { q.fillStyle = "rgba(25,22,15,0.06)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
    });
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T, V) {
    return { paint: new Bin(T.paint, true, false, V.paint.us), dark: new Bin(T.dark, false),
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
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  /* ---------------------------------------------------------------- hull */
  /* The Type 63 boat hull (7.15 m, x -3.62 to +3.53): the deck flat from the stern to the knee at
     x 2.20, the nearly horizontal glacis (en.wikipedia Type 63) falling 0.18 m to the old bow edge;
     slab sides 2.92 m apart standing on the sponson floor at the ledge; the lower hull between the
     tracks (2.28 m) on a 0.40 m clearance belly, rising into the stern plate and the bow. */
  function topZ(x) { return x <= KNEE ? D : D - DROP * (x - KNEE) / (HB - KNEE); }
  function upperRing(x) {
    var zt = topZ(x), e = 0.025;
    return [[x, WS, LEDGE], [x, WS, zt - e], [x, WS - e, zt], [x, -(WS - e), zt], [x, -WS, zt - e], [x, -WS, LEDGE]];
  }
  var UXS = [HS, HS + 0.02, -2.5, -1.0, 0.5, KNEE, 2.9, HB - 0.02, HB];
  var BOT = [[HS, 0.66], [HS + 0.17, 0.48], [HS + 0.42, 0.40], [2.70, 0.40], [HB, 1.00]];
  var LXS = [HS, HS + 0.17, HS + 0.42, 2.70, 3.10, HB];
  function lowerRing(x) {
    var zb = pwl(BOT, x), w = WL, wb = w - 0.07, zt = LEDGE + 0.03;
    return [[x, wb, zb], [x, w, Math.min(zb + 0.07, zt - 0.01)], [x, w, zt], [x, -w, zt], [x, -w, Math.min(zb + 0.07, zt - 0.01)], [x, -wb, zb]];
  }
  /* a solid prism: a convex side profile P ([x, z], counter-clockwise) extruded from y0 to y1 */
  function prismY(bin, P, y0, y1) {
    var V = [], F = [], n = P.length, i, j;
    for (i = 0; i < n; i++) V.push([P[i][0], y0, P[i][1]]);
    for (i = 0; i < n; i++) V.push([P[i][0], y1, P[i][1]]);
    for (i = 1; i + 1 < n; i++) { F.push([0, i, i + 1]); F.push([n, n + i + 1, n + i]); }
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([i, n + i, n + j], [i, n + j, j]); }
    solid(bin, V, F);
  }

  function addHull(B) {
    var R = [], i, k, s, x, y, z, a;
    for (i = 0; i < UXS.length; i++) R.push(upperRing(UXS[i]));
    loftN(B.paint, R);
    R = [];
    for (i = 0; i < LXS.length; i++) R.push(lowerRing(LXS[i]));
    loftN(B.paint, R);

    /* the bow FLOATING TANK added by the Type 63A (text: "one in the front"; P1, P2, P3): a wedge
       box across the full width ahead of the old bow, its top flat 0.18 m below the deck, a short
       vertical lip at the nose, the long bottom plate raked back to the belly between the tracks
       and, over the tracks, to the skirt line clear of the idlers */
    prismY(B.paint, [[2.75, 0.40], [NOSE, 1.12], [NOSE, 1.30], [NOSE - 0.06, BT], [3.20, BT]], -WL, WL);
    for (s = -1; s <= 1; s += 2)
      prismY(B.paint, [[3.20, 0.98], [NOSE, 1.14], [NOSE, 1.30], [NOSE - 0.06, BT], [3.20, BT]], s > 0 ? WL - 0.01 : -WX, s > 0 ? WX : -(WL - 0.01));
    /* the trim vane folded flat on the tank's top (P1, P2: the plate with the thick front edge),
       a rim round it and three cross ribs; its hinges at the nose */
    box(B.paint, 3.26, NOSE + 0.04, -1.52, 1.52, BT - 0.01, BT + 0.04);
    box(B.paint, NOSE - 0.02, NOSE + 0.06, -1.54, 1.54, 1.22, BT + 0.07);
    box(B.paint, 3.22, 3.32, -1.54, 1.54, BT + 0.02, BT + 0.08);
    for (s = -1; s <= 1; s += 2) box(B.paint, 3.26, NOSE, s * 1.47, s * 1.54, BT + 0.02, BT + 0.08);
    for (k = 0; k < 3; k++) { x = 3.62 + k * 0.30; box(B.paint, x - 0.03, x + 0.03, -1.46, 1.46, BT + 0.03, BT + 0.065); }
    for (k = 0; k < 4; k++) { y = -1.05 + k * 0.70; cylY(B.dark, NOSE + 0.04, y - 0.12, y + 0.12, 1.24, 0.045, 8); }
    for (k = 0; k < 14; k++) { y = -1.30 + k * 0.20; box(B.dark, 3.255, 3.285, y - 0.012, y + 0.012, BT + 0.08, BT + 0.092); }
    /* towing eyes on the raked bottom plate (P1, P3) */
    for (s = -1; s <= 1; s += 2) {
      z = 1.12 - 0.20; x = NOSE - 0.20 / (0.72 / (NOSE - 2.75));
      slab(B.dark, [x + 0.03, s * 0.62, z], unit([0.37, 0, -0.93]), [0, 1, 0], unit([0.93, 0, 0.37]), 0.09, 0.05, 0.05);
      cylY(B.dark, x + 0.08, s * 0.62 - 0.05, s * 0.62 + 0.05, z - 0.03, 0.045, 8);
    }

    for (s = -1; s <= 1; s += 2) {
      /* the trim-vane arms (P1, P3): a tube from the hull side up to the vane's rear edge and a
         strut crossing it, the X-shaped frame on each bow cheek */
      cyl(B.dark, [2.45, s * (WS + 0.04), D - 0.10], [3.40, s * (WS + 0.04), BT + 0.06], 0.04, 0.04, 8);
      cyl(B.dark, [2.55, s * (WS + 0.04), LEDGE + 0.14], [3.25, s * (WS + 0.04), D - 0.06], 0.035, 0.035, 8);
      cyl(B.dark, [2.55, s * (WS + 0.04), D - 0.06], [3.25, s * (WS + 0.04), LEDGE + 0.14], 0.035, 0.035, 8);
      box(B.dark, 2.40, 2.62, s * WS, s * (WS + 0.07), LEDGE + 0.10, D - 0.02);
      /* the side SKIRT added by the Type 63A (text "side skirts protecting the tracks"; P1, P2): a
         box panel standing out from the hull side over the top run of the track, from the bow tank
         to the stern, a rolled rib along it and vertical joint straps */
      hexa(B.paint, [[-3.72, s * WS, SK0], [3.24, s * WS, SK0], [3.24, s * WX, SK0], [-3.72, s * WX, SK0],
                     [-3.72, s * WS, SK1], [3.24, s * WS, SK1], [3.24, s * WX, SK1], [-3.72, s * WX, SK1]]);
      box(B.paint, -3.72, 3.24, s * (WX - 0.02), s * (WX + 0.03), SK0 + 0.13, SK0 + 0.18);
      for (k = 0; k < 6; k++) { x = -2.70 + k * 1.10; box(B.dark, x - 0.025, x + 0.025, s * WX, s * (WX + 0.012), SK0 + 0.02, SK1 - 0.02); }
      box(B.dark, -3.72, 3.24, s * (WX - 0.01), s * (WX + 0.008), SK0, SK0 + 0.02);
      /* the three vertical-slot air inlets low on the hull side near the stern (en.wikipedia
         Type 63; P3 shows the slots) */
      y = s * WS;
      for (k = 0; k < 3; k++) {
        x = -3.05 + k * 0.17;
        box(B.dark, x - 0.04, x + 0.04, Math.min(y, y + 0.012 * s), Math.max(y, y + 0.012 * s), SK1 + 0.04, D - 0.08);
      }
      /* lifting eyes at the deck corners, a handrail abreast of the turret (P3) */
      for (k = 0; k < 2; k++) cylY(B.dark, k ? -3.40 : 2.10, s * (WS - 0.10), s * (WS - 0.02), (k ? D : topZ(2.10)) + 0.05, 0.045, 8);
      belt(B.dark, -1.75, D + 0.10, -1.05, D + 0.10, s * (WS - 0.10), s * (WS - 0.07), 0.025);
      belt(B.dark, -1.75, D, -1.75, D + 0.11, s * (WS - 0.10), s * (WS - 0.07), 0.025);
      belt(B.dark, -1.05, D, -1.05, D + 0.11, s * (WS - 0.10), s * (WS - 0.07), 0.025);
      /* tracks, sprocket, idler */
      addTrack(B, s);
    }

    /* driver's position at the front LEFT (en.wikipedia Type 63): a raised hatch with three
       periscopes fanned forward (P1, P2) */
    x = 2.45; z = topZ(x); y = 0.72;
    box(B.paint, 2.18, 2.72, y - 0.30, y + 0.30, z - 0.04, z + 0.10);
    cylZ(B.paint, 2.40, y, z + 0.10, z + 0.14, 0.24, 16);
    box(B.dark, 2.30, 2.50, y - 0.15, y + 0.15, z + 0.14, z + 0.155);
    for (k = -1; k <= 1; k++) {
      a = k * 0.35;
      slab(B.paint, [2.64, y + k * 0.16, z + 0.15], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.06, 0.07, 0.05);
      slab(B.glass, [2.705 , y + k * 0.16 + Math.sin(a) * 0.06, z + 0.16], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.006, 0.055, 0.025);
    }
    /* the pair of driving lamps on the glacis right of the driver, in one wire guard (P1) */
    x = 2.50; z = topZ(x);
    for (k = 0; k < 2; k++) {
      y = -0.05 - k * 0.36;
      box(B.dark, x - 0.06, x + 0.06, y - 0.06, y + 0.06, z - 0.01, z + 0.06);
      cylX(B.dark, x - 0.08, x + 0.08, y, z + 0.17, 0.095, 0.10, 12);
      cylX(B.glass, x + 0.08, x + 0.095, y, z + 0.17, 0.085, 0.085, 12);
    }
    box(B.dark, x + 0.15, x + 0.17, -0.62, 0.16, z + 0.30, z + 0.32);
    box(B.dark, x + 0.15, x + 0.17, -0.62, 0.16, z + 0.16, z + 0.18);
    for (k = 0; k < 3; k++) { y = -0.60 + k * 0.37; box(B.dark, x - 0.14, x + 0.16, y - 0.01, y + 0.01, z + 0.30, z + 0.32); }
    for (k = 0; k < 4; k++) { y = -0.60 + k * 0.25; belt(B.dark, x + 0.16, z + 0.02, x + 0.16, z + 0.30, y - 0.008, y + 0.008, 0.015); }
    /* the hose and fittings across the glacis (P1, P2) */
    cylY(B.dark, 2.95, -1.20, 1.20, topZ(2.95) + 0.06, 0.05, 10);

    /* rear deck over the engine: two louvred grille panels, a transverse grille, the team strips */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -3.30, -1.95, s > 0 ? 0.20 : -1.10, s > 0 ? 1.10 : -0.20, D - 0.01, D + 0.02);
      for (k = 0; k < 8; k++) box(B.paint, -3.27 + k * 0.165, -3.20 + k * 0.165, s > 0 ? 0.22 : -1.08, s > 0 ? 1.08 : -0.22, D + 0.02, D + 0.045);
    }
    box(B.dark, -1.85, -1.55, -0.90, 0.90, D - 0.01, D + 0.03);
    for (k = 0; k < 5; k++) { y = -0.80 + k * 0.40; box(B.paint, -1.83, -1.57, y - 0.02, y + 0.02, D + 0.03, D + 0.045); }
    box(B.team, -3.55, -3.40, 0.20, 1.10, D + 0.005, D + 0.02);
    box(B.team, -3.55, -3.40, -1.10, -0.20, D + 0.005, D + 0.02);

    /* the stern FLOATING TANK (text: "one in the rear"): a box across the stern plate, its lower
       edge raked; the two big water-jet outlets through it with their flaps, tail lamps, hooks */
    prismY(B.paint, [[HS + 0.02, 0.62], [STERN + 0.10, 0.66], [STERN, 0.80], [STERN, D - 0.06], [STERN + 0.06, D], [HS + 0.02, D]], -1.40, 1.40);
    for (s = -1; s <= 1; s += 2) {
      y = s * 0.78;
      cylX(B.dark, STERN - 0.02, STERN + 0.01, y, 0.98, 0.27, 0.27, 20);
      cylX(B.paint, STERN - 0.05, STERN - 0.02, y, 0.98, 0.25, 0.25, 20);
      for (k = 0; k < 6; k++) {
        a = k / 6 * TAU;
        slab(B.paint, [STERN - 0.065, y + Math.cos(a) * 0.12, 0.98 + Math.sin(a) * 0.12], [1, 0, 0], [0, Math.cos(a), Math.sin(a)], [0, -Math.sin(a), Math.cos(a)], 0.015, 0.11, 0.012);
      }
      box(B.dark, STERN - 0.03, STERN + 0.01, s * 1.22 - 0.07, s * 1.22 + 0.07, D - 0.24, D - 0.12);
      box(B.glass, STERN - 0.035, STERN - 0.03, s * 1.22 - 0.05, s * 1.22 + 0.05, D - 0.22, D - 0.14);
      slab(B.dark, [STERN - 0.03, s * 0.25, 0.72], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.06, 0.04, 0.06);
    }
    box(B.dark, STERN - 0.025, STERN + 0.01, -0.40, 0.40, D - 0.12, D - 0.08);
  }

  /* ------------------------------------------------------- running gear */
  /* the loop: round the idler, the wheel bottoms, the sprocket, then back along the TOP of the
     wheels - with no return rollers the top run lies on them (en.wikipedia Type 63, P4) */
  var _loop = null;
  function trackLoop() {
    if (_loop) return _loop;
    var P = [], i, k, a, n = 10, segs = [], tot = 0, l, b, th = 0.045;
    var rI = IDL.r + th, rS = SPR.r + 0.01, rW = RW + th;
    for (k = 0; k <= n; k++) { a = Math.PI / 2 - k / n * (Math.PI - 0.5); P.push([IDL.x + Math.cos(a) * rI, IDL.z + Math.sin(a) * rI]); }
    P.push([XW[0] + 0.12, 0.025]);
    P.push([XW[XW.length - 1] - 0.12, 0.025]);
    for (k = 0; k <= n; k++) { a = (-Math.PI / 2 - 0.3) - k / n * (Math.PI - 0.3); P.push([SPR.x + Math.cos(a) * rS, SPR.z + Math.sin(a) * rS]); }
    for (i = XW.length - 1; i >= 0; i--) { P.push([XW[i] - 0.10, ZW + rW - 0.005]); P.push([XW[i] + 0.10, ZW + rW - 0.005]); }
    for (i = 0; i < P.length; i++) {
      a = P[i]; b = P[(i + 1) % P.length];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    _loop = { segs: segs, tot: tot };
    return _loop;
  }
  function addTrack(B, s) {
    var L = trackLoop(), segs = L.segs, n = segs.length, cnt = 100, step = L.tot / cnt;
    var y = s * TY, i, k, q = 0, rem = 0, d, t, a, b, dx, dz, px, pz;
    for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.03);
    for (k = 0; k < cnt; k++) {
      d = (k + 0.5) * step;
      while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
      t = (d - rem) / segs[q][2];
      a = segs[q][0]; b = segs[q][1];
      dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
      px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
      belt(B.dark, px - dx * 0.05, pz - dz * 0.05, px + dx * 0.05, pz + dz * 0.05, y - TW - 0.005, y + TW + 0.005, 0.05);
    }
    /* sprocket at the rear: toothed rim on a disc with a bolted hub (P4) */
    cylY(B.dark, SPR.x, y - 0.17, y + 0.17, SPR.z, SPR.r - 0.03, 18);
    for (k = 0; k < 13; k++) {
      t = k / 13 * TAU;
      slab(B.dark, [SPR.x + Math.cos(t) * (SPR.r - 0.01), y, SPR.z + Math.sin(t) * (SPR.r - 0.01)], [Math.cos(t), 0, Math.sin(t)], [0, 1, 0], [-Math.sin(t), 0, Math.cos(t)], 0.035, 0.12, 0.028);
    }
    cylY(B.paint, SPR.x, y + s * 0.14, y + s * 0.18, SPR.z, SPR.r - 0.06, 16);
    cylY(B.dark, SPR.x, y + s * 0.18, y + s * 0.205, SPR.z, 0.08, 10);
    /* idler at the bow, under the floating tank */
    cylY(B.dark, IDL.x, y - 0.17, y + 0.17, IDL.z, IDL.r, 16);
    cylY(B.paint, IDL.x, y + s * 0.14, y + s * 0.18, IDL.z, IDL.r - 0.04, 14);
    cylY(B.dark, IDL.x, y + s * 0.18, y + s * 0.20, IDL.z, 0.06, 8);
    /* torsion-bar arms trailing from the hull to each wheel */
    for (k = 0; k < XW.length; k++) slab(B.dark, [XW[k] + 0.19, s * (TY - 0.28), ZW + 0.13], unit([0.83, 0, 0.55]), [0, 1, 0], unit([-0.55, 0, 0.83]), 0.23, 0.04, 0.045);
    for (k = 0; k < 2; k++) { i = k ? XW.length - 1 : 0; cyl(B.dark, [XW[i] + 0.05, s * (WL + 0.03), ZW + 0.17], [XW[i] + 0.40, s * (WL + 0.03), LEDGE - 0.05], 0.035, 0.035, 8); }
  }
  /* road wheel (P4 the Type 63's): a pressed disc with twelve radial ribs dished to the hub, a
     rubber tyre, a hub cap with nuts; both sides of the axle in one group */
  var TYRE = [0.13, 0.135, 0.125], NUT = [0.17, 0.18, 0.16];
  function addWheel(W, V) {
    var s, y, i, a, c = V.paint.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIB = [rr * 1.3, gg * 1.3, bb * 1.3];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.14, y + 0.14, 0, RW, 20);
      W.col = BODY;
      cylY(W, 0, y - 0.145, y + 0.145, 0, RW - 0.055, 20);
      cyl(W, [0, y + s * 0.145, 0], [0, y + s * 0.175, 0], RW - 0.055, 0.11, 20);
      W.col = RIB;
      for (i = 0; i < 12; i++) {
        a = i / 12 * TAU;
        slab(W, [Math.cos(a) * 0.21, y + s * 0.158, Math.sin(a) * 0.21], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.105, 0.02, 0.018);
      }
      W.col = BODY;
      cylY(W, 0, y + s * 0.17, y + s * 0.195, 0, 0.09, 12);
      W.col = NUT;
      cylY(W, 0, y + s * 0.195, y + s * 0.21, 0, 0.045, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* the Type 63A's own WELDED turret (text; P1, P2, P3) - not the Type 63's half-egg casting: flat
     plates, a pointed front either side of the mantlet, sides sloped in about 18 deg, a flat roof,
     a near-vertical rear plate carrying the stowage basket.  Rows: z, then nose, cheek, aft-side
     and rear corners as [x, half width] (ring frame, x forward). */
  var TRS = [
    [-0.03, 1.34, 0.40, 0.70, 1.12, -0.95, 1.12, -1.18, 0.86],
    [0.00, 1.32, 0.40, 0.70, 1.12, -0.95, 1.12, -1.18, 0.86],
    [0.775, 1.00, 0.30, 0.52, 0.86, -0.88, 0.86, -1.08, 0.70],
    [ROOF, 0.97, 0.28, 0.50, 0.84, -0.86, 0.84, -1.06, 0.68]
  ];
  function tring8(r) {
    return [[r[1], r[2], r[0]], [r[3], r[4], r[0]], [r[5], r[6], r[0]], [r[7], r[8], r[0]],
            [r[7], -r[8], r[0]], [r[5], -r[6], r[0]], [r[3], -r[4], r[0]], [r[1], -r[2], r[0]]];
  }
  function sideY(z) { return 1.12 - 0.26 * z / 0.775; }      /* the side plate's half width at height z */
  function addTurret(B) {
    var R = [], i, k, s, x, y, z, a, d;
    for (i = 0; i < TRS.length; i++) R.push(tring8(TRS[i]));
    loftN(B.paint, R);
    /* weld beads along the roof edge */
    for (s = -1; s <= 1; s += 2) belt(B.dark, -0.86, ROOF + 0.005, 0.50, ROOF + 0.005, s * 0.82, s * 0.84, 0.012);

    /* the mantlet under its canvas cover (P1, P2, P3), the gun trunnion ~0.4 m behind the nose */
    box(B.paint, 0.95, 1.22, -0.30, 0.30, GZ - 0.24, GZ + 0.22);
    loftS(B.paint, [
      [[1.18, 0.30, GZ - 0.22], [1.18, 0.30, GZ + 0.21], [1.18, -0.30, GZ + 0.21], [1.18, -0.30, GZ - 0.22]],
      [[1.36, 0.27, GZ - 0.17], [1.36, 0.27, GZ + 0.19], [1.36, -0.27, GZ + 0.19], [1.36, -0.27, GZ - 0.17]],
      [[1.52, 0.15, GZ - 0.12], [1.52, 0.15, GZ + 0.13], [1.52, -0.15, GZ + 0.13], [1.52, -0.15, GZ - 0.12]],
      [[1.62, 0.10, GZ - 0.09], [1.62, 0.10, GZ + 0.10], [1.62, -0.10, GZ + 0.10], [1.62, -0.10, GZ - 0.09]]
    ]);
    /* the 105 mm (ZPL-98 class, text): thermal sleeve in sections with clamps, the fume extractor
       behind the mid point (P1, P3), a multi-baffle muzzle brake (P2, P3) */
    cylX(B.dark, 1.55, 2.25, 0, GZ, 0.088, 0.086, 16);
    cylX(B.dark, 2.25, 2.33, 0, GZ, 0.086, 0.118, 16);
    cylX(B.dark, 2.33, 2.95, 0, GZ, 0.118, 0.118, 18);
    cylX(B.dark, 2.95, 3.03, 0, GZ, 0.118, 0.082, 16);
    cylX(B.dark, 3.03, MUZ - 0.52, 0, GZ, 0.080, 0.072, 16);
    for (k = 0; k < 3; k++) { x = [1.95, 3.60, 4.25][k]; cylX(B.dark, x, x + 0.06, 0, GZ, 0.098 - k * 0.008, 0.098 - k * 0.008, 16); }
    cylX(B.dark, MUZ - 0.52, MUZ - 0.48, 0, GZ, 0.072, 0.092, 16);
    cylX(B.dark, MUZ - 0.48, MUZ, 0, GZ, 0.092, 0.092, 18);
    for (k = 0; k < 4; k++) {
      x = MUZ - 0.42 + k * 0.11;
      for (s = -1; s <= 1; s += 2) box(B.glass, x, x + 0.06, s * 0.088, s * 0.095, GZ - 0.045, GZ + 0.045);
    }
    /* coaxial MG port right of the gun, the gunner's sight window above it on the left */
    cylX(B.dark, 1.02, 1.28, -0.38, GZ - 0.05, 0.035, 0.03, 8);
    /* the 4-tube smoke grenade launchers on each front cheek (text, P1, P2, P3): a bracket on the
       cheek plate, the tubes in a row fanned forward and up */
    for (s = -1; s <= 1; s += 2) {
      z = 0.50; y = s * (sideY(z) + 0.06);
      box(B.dark, 0.22, 0.70, y - 0.06, y + 0.06, z - 0.08, z - 0.03);
      box(B.paint, 0.22, 0.70, s * sideY(z) - 0.02, s * sideY(z) + 0.02, z - 0.12, z);
      for (k = 0; k < 4; k++) {
        x = 0.28 + k * 0.13;
        d = unit([0.55, s * 0.35, 0.76]);
        cyl(B.dark, [x, y, z - 0.03], [x + d[0] * 0.26, y + d[1] * 0.26, z - 0.03 + d[2] * 0.26], 0.042, 0.042, 10);
        cylX(B.glass, x + d[0] * 0.26 - 0.002, x + d[0] * 0.26 + 0.002, y + d[1] * 0.26, z - 0.03 + d[2] * 0.26, 0.03, 0.03, 8);
      }
      /* the stowage bins on each side plate aft (text "two stowage buckets on the sides") */
      box(B.paint, -0.88, -0.22, s * sideY(0.22) - 0.02 * s, s * (sideY(0.22) + 0.16), 0.20, 0.52);
      box(B.dark, -0.88, -0.22, s * (sideY(0.22) + 0.155), s * (sideY(0.22) + 0.165), 0.46, 0.48);
      /* vision slot on the side plate (P1 the oval port) */
      cylY(B.dark, 0.05, s * (sideY(0.55) - 0.02), s * (sideY(0.55) + 0.02), 0.55, 0.05, 10);
    }
    /* the stowage basket on the rear plate (text "a stowage bucket in the rear"; P1, P2): a floor
       and a rail of vertical bars round three sides */
    box(B.dark, -1.72, -1.10, -0.82, 0.82, 0.22, 0.25);
    for (k = 0; k < 2; k++) {
      z = k ? 0.66 : 0.46;
      box(B.dark, -1.74, -1.71, -0.84, 0.84, z, z + 0.025);
      for (s = -1; s <= 1; s += 2) box(B.dark, -1.74, -1.10, s * 0.82 - 0.012, s * 0.82 + 0.012, z, z + 0.025);
    }
    for (k = 0; k < 11; k++) { y = -0.80 + k * 0.16; box(B.dark, -1.74, -1.71, y - 0.01, y + 0.01, 0.25, 0.68); }
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 4; k++) { x = -1.65 + k * 0.16; box(B.dark, x - 0.01, x + 0.01, s * 0.82 - 0.012, s * 0.82 + 0.012, 0.25, 0.68); }
    box(B.paint, -1.70, -1.12, -0.78, 0.78, 0.25, 0.48);
    /* roof: the commander's cupola LEFT with periscopes and its sight, the loader's hatch RIGHT,
       the gunner's sight box at the left front, ventilator dome and the 63A's wind-sensor mast */
    cylZ(B.paint, -0.25, 0.42, ROOF - 0.01, ROOF + 0.09, 0.32, 20);
    cylZ(B.paint, -0.25, 0.42, ROOF + 0.09, ROOF + 0.14, 0.25, 18);
    for (k = 0; k < 5; k++) {
      a = (k - 2) * 0.55;
      slab(B.paint, [-0.25 + Math.cos(a) * 0.27, 0.42 + Math.sin(a) * 0.27, ROOF + 0.09], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.04, 0.06, 0.035);
      slab(B.glass, [-0.25 + Math.cos(a) * 0.312, 0.42 + Math.sin(a) * 0.312, ROOF + 0.10], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.004, 0.05, 0.02);
    }
    box(B.paint, 0.02, 0.22, 0.30, 0.50, ROOF + 0.06, ROOF + 0.15);
    box(B.glass, 0.22, 0.225, 0.33, 0.47, ROOF + 0.08, ROOF + 0.13);
    cylZ(B.paint, -0.30, -0.42, ROOF - 0.01, ROOF + 0.05, 0.30, 18);
    cylZ(B.paint, -0.30, -0.42, ROOF + 0.05, ROOF + 0.09, 0.26, 18);
    cylY(B.dark, -0.54, -0.60, -0.24, ROOF + 0.06, 0.03, 8);
    box(B.paint, 0.30, 0.66, 0.36, 0.66, ROOF - 0.05, ROOF + 0.13);
    box(B.glass, 0.66, 0.665, 0.40, 0.62, ROOF + 0.03, ROOF + 0.10);
    box(B.paint, 0.40, 0.62, -0.62, -0.42, ROOF - 0.02, ROOF + 0.10);
    box(B.glass, 0.62, 0.625, -0.60, -0.44, ROOF + 0.02, ROOF + 0.07);
    cyl(B.paint, [-0.78, -0.05, ROOF - 0.01], [-0.78, -0.05, ROOF + 0.06], 0.16, 0.10, 14);
    cylZ(B.dark, -0.95, 0.25, ROOF, ROOF + 0.10, 0.025, 6);
    cylZ(B.dark, -0.95, 0.25, ROOF + 0.10, ROOF + 0.14, 0.05, 8);
    cylZ(B.dark, -0.92, 0.62, ROOF - 0.01, ROOF + 0.05, 0.04, 8);
    cylZ(B.dark, -0.92, 0.62, ROOF + 0.05, ROOF + 0.95, 0.008, 5);
    /* team colour: a strip across the roof rear */
    box(B.team, -0.86, -0.70, -0.20, 0.20, ROOF, ROOF + 0.012);
  }

  function build(THREE, M, C) {
    var V = { paint: PAINT }, T = materials(THREE, C, V), g = new THREE.Group();
    var HBn = bins(T, V), TB = bins(T, V), i, wg, WB;
    addHull(HBn);
    flush(THREE, g, HBn);
    for (i = 0; i < XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB, V);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    addTurret(TB);
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(TX, 0, D);
    flush(THREE, wg, TB);
    g.add(wg);
    return g;
  }
  return { build: build };
})();

/* len: the measured X extent of the build (stern outlet flaps to the muzzle) */
UNIT_MODELS["pla_e90_lighttank"] = { len: 9.60, build: HeroZts63a.build };
