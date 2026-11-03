/* ========== pla_type96.js - HERO model: ZTZ-96 (Type 96) main battle tank ==========
   pla_e90_mbt   "ZTZ-96 main battle tank" (Type 85-IIM taken into PLA service in 1997):
                 the original Type 96, NOT the 96A/96B (no arrowhead modules over the
                 turret front, no FY-4 ERA on the glacis, exhausts on the right side).

   References, Wikimedia Commons at width 960, cached in scratchpad/q_pla_e90_mbt_ref:
     P1  "ZTZ-96 MBT 20131004.JPG" - a museum ZTZ-96, front left 3/4, the running gear near
         side-on: SIX double road wheels at a close, even pitch (gap about a sixth of a wheel),
         the front idler under the boxy mudguard, the rear sprocket; the full-length skirt
         with a chamfered top edge, a row of small square holes and its lower edge dipping in
         a tooth between each pair of wheels ("saw-toothed", published); the near-flat upper
         glacis and the tall lower nose plate with its tow hooks; the welded turret with the
         flat, back-swept faces of the spaced-armour boxes either side of the gun; a bank of
         smoke tubes on the turret side behind the cheek; the stowage basket round the bustle;
         the 12.7 mm on the roof; the gun with thermal sleeve, clamp bands and evacuator.
     P2  "Type 96 main battle tank.jpg" - a ZTZ-96 (desert digital scheme, not drawn) from
         the front right: the flat cheek faces running back from a narrow mantlet, the
         welded roof with the commander's 12.7 mm on the right, the sight box, two banks of
         three-over-three smoke tubes on the turret rear corners, the ladder-like basket
         frame, the angular mudguards over the idlers with their projecting lower lip, the
         headlamps in guards on the glacis, the splash ridge across it, the tow hooks.
     P3  "Final stage of preparation for Rembat-2017 (Omsk) (7)" - two PLA Type 96 from the
         front left in service green and camouflage: paint sampled here; the same mudguards,
         skirts, turret and gun; the evacuator at about 40 % of the exposed tube.
     P4  "TankBiathlon14final-12.jpg" - a Type 96A (same hull and running gear; its turret
         modules and glacis ERA NOT used) from the right, near side-on: used only to check
         the running gear - wheel pitch about 1.1 wheel diameters, and the sprocket-to-idler
         span about 1.4 times the first-to-last wheel span (drawn: 0.80/0.70 m, 5.60/4.00 m);
         the skirt's straight top and its teeth between the wheels.
   Published (en.wikipedia "Type 96 tank"): hull 6.33 m long, 3.45 m wide, 2.30 m high;
   41 t; six road wheels a side, torsion bars, "armor skirts in saw-toothed shape", the
   glacis "sloped to the point of being near-horizontal", "six smoke grenade dischargers
   ... to the side of the turret ... total of 12"; 125 mm ZPT-98 smoothbore with the fume
   extractor "located midway"; QJC-88 12.7 mm; 96A adds the arrow-shaped modules and the
   flat hull rear. The 1997 tank's front is the welded box of spaced armour ("a rectangular
   front profile"), so the arrowhead modules are NOT drawn; its cheek faces are drawn as
   they are in P1/P2: flat and swept back in plan, a wedge either side of the gun.

   Recognition list (what makes it read at game zoom, and its source):
     1. six close-pitched double road wheels, front idler, rear sprocket - P1
     2. skirts the full length with the saw-tooth lower edge and chamfered top - P1, P2
     3. near-flat glacis between two big angular mudguards with lips - P1, P2, P3
     4. the low welded turret with the wedge of flat cheek faces - P1, P2
     5. long 125 mm gun: thermal sleeve, bands, evacuator at about 40 % - P1, P2, P3
     6. smoke-tube banks on the turret rear corners, the bustle basket - P1, P2
     7. the 12.7 mm on the commander's cupola, right of the roof - P1, P2
   Paint: PLA green.  P3 lit #5e7046 to #6c8242 in the sun, #505b3d in the shade, taken to
   about 0.85 of level -> #4f5d3a.  Museum camouflage (P1, P2), stars, numbers: not drawn.
   NOT CONFIRMED, judgement calls: no side-on drawing was found, so the stations below
   are read through the perspective of P1, P2 and P4 and scaled from the
   published 6.33 m hull and 2.30 m height: the wheel size (0.70 m, as the Type 99) and
   pitch (0.80 m); the idler and sprocket positions; the three return rollers (hidden by
   the skirt; armour_specs.js says three); the deck at 1.45 m and the turret roof at
   2.20 m (cupola to 2.32 m); the turret ring over x = +0.20; the turret plan; the gun's
   length (muzzle 9.7 m from the stern, the old model had 9.5 m); the count of smoke tubes
   per side (six, two rows of three, as the "total of 12"); the exhaust louvres on the
   right side (published for the 96, position estimated); the engine-deck grilles; the
   rear plate fittings; the basket's depth.
   Materials: PAINT (canvas texture), DARK, WHEEL (vertex colours), team colour (C.team):
   strips on the turret roof rear, the engine deck and the right front mudguard.
   Nodes: "turret" (trains; origin on the ring at deck height, gun along +X) and six
   "roadwheel" groups (axle along local Y, each holding both sides).
   Draw calls: hull 3 + turret 3 + 6 wheels = 12.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroType96 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var PAINT = { base: "#4f5d3a", blots: ["#465232", "#586642"], seed: 96 };
  /* running gear (P1): six wheels at an even 0.80 m pitch, front idler, rear sprocket */
  var TY = 1.40, TW = 0.27;
  var XW = [2.02, 1.22, 0.42, -0.38, -1.18, -1.98], RW = 0.35, ZW = 0.425;
  var XR = [1.62, 0.02, -1.58], ZR = 0.93, RR = 0.08;
  var IDL = { x: 2.80, z: 0.62, r: 0.29 }, SPR = { x: -2.80, z: 0.66, r: 0.31 };
  /* hull: stern, nose, belly, deck, side half width, fender and skirt half widths,
     the glacis break, ring position */
  var REAR = -3.17, NOSE = 3.16, BELLY = 0.46, DECK = 1.45, HW = 1.08, FW = 1.64, SKW = 1.69;
  var GX = 1.85, GZN = 1.16, TX = 0.20;

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
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
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
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  /* ---------------------------------------------------------------- hull */
  var GA = Math.atan2(DECK - GZN, NOSE - GX);
  function gz(x) { return x <= GX ? DECK : DECK - (x - GX) * Math.tan(GA); }
  function addHull(B) {
    var s, i, x, p;
    /* the hull between the tracks (P1, P2): vertical stern with its top edge bevelled, the
       flat deck, the near-flat upper glacis (published), the tall lower nose plate leaning
       back to the belly */
    prismY(B.paint, [[REAR, DECK - 0.06], [REAR + 0.06, 0.64], [REAR + 0.24, BELLY], [2.70, BELLY],
                     [NOSE, GZN], [GX, DECK], [REAR + 0.05, DECK]], -HW, HW);
    var gu = [Math.cos(GA), 0, -Math.sin(GA)], gw = [Math.sin(GA), 0, Math.cos(GA)];
    var la = Math.atan2(NOSE - 2.70, GZN - BELLY), lu = [Math.sin(la), 0, Math.cos(la)], lw = [Math.cos(la), 0, -Math.sin(la)];
    for (p = -1; p <= 1; p += 2) {
      var yi = p * HW, yo = p * FW, ylo = Math.min(yi, yo), yhi = Math.max(yi, yo);
      var ys = p * SKW, yso = p * (SKW + 0.02);
      /* the fender shelf over the track, level with the deck; the inner track guard */
      box(B.paint, REAR + 0.02, 2.22, ylo, yhi, DECK - 0.035, DECK);
      box(B.dark, -2.95, 2.20, p > 0 ? HW : -HW - 0.03, p > 0 ? HW + 0.03 : -HW, 1.06, DECK - 0.04);
      /* the angular front mudguard over the idler (P1, P2, P3): its top sloping to the nose,
         a short front face and the projecting lower lip */
      prismY(B.paint, [[2.20, DECK + 0.01], [3.00, 1.27], [3.13, 1.16], [3.13, 1.06], [2.20, 1.06]], ylo, p > 0 ? SKW : -SKW);
      box(B.paint, 2.92, 3.24, p > 0 ? HW : -SKW - 0.01, p > 0 ? SKW + 0.01 : -HW, 1.00, 1.065);
      box(B.dark, 2.20, 2.24, p > 0 ? SKW - 0.02 : -SKW - 0.005, p > 0 ? SKW + 0.005 : -SKW + 0.02, 1.06, DECK);
      /* the skirt (P1): a vertical plate from the mudguard to the stern, its top edge
         chamfered in to the fender, seams, a row of small square holes, and the saw-tooth
         lower edge dipping between the wheels (published) */
      var ZS0 = 0.98, ZS1 = 1.32, x0 = REAR + 0.06, x1 = 2.20;
      box(B.paint, x0, x1, Math.min(ys, yso), Math.max(ys, yso), ZS0, ZS1);
      slab(B.paint, [(x0 + x1) / 2, p * (FW + SKW + 0.02) / 2, (ZS1 + DECK) / 2], [1, 0, 0],
           unit([0, -p * (SKW + 0.02 - FW), DECK - ZS1]), unit([0, p * (DECK - ZS1), SKW + 0.02 - FW]), (x1 - x0) / 2, 0.075, 0.012);
      var ZT = 0.74;
      for (i = 0; i < 6; i++) {
        var xm = i < 5 ? (XW[i] + XW[i + 1]) / 2 : XW[5] - 0.62;
        prismY(B.paint, [[xm - 0.30, ZS0 + 0.005], [xm + 0.30, ZS0 + 0.005], [xm + 0.13, ZT], [xm - 0.13, ZT]], Math.min(ys, yso), Math.max(ys, yso));
      }
      var yd0 = p > 0 ? SKW + 0.02 : -SKW - 0.032, yd1 = p > 0 ? SKW + 0.032 : -SKW - 0.02;
      for (x = 1.62; x > REAR; x -= 0.80) box(B.dark, x - 0.012, x + 0.012, yd0, yd1, ZT + 0.02, ZS1);
      for (i = 0; i < 7; i++) { x = 1.92 - i * 0.80; box(B.dark, x - 0.04, x + 0.04, yd0, yd1, 1.08, 1.16); }
      box(B.dark, x0, x1, yd0, yd1, ZS1 - 0.012, ZS1 + 0.004);
      /* headlamps in their box guards on the glacis corners (P2) */
      var hx = 2.55, hy = p * 0.82, hz = gz(hx);
      cyl(B.paint, [hx - 0.06, hy, hz + 0.13], [hx + 0.08, hy, hz + 0.13], 0.075, 0.08, 12);
      cyl(B.dark, [hx + 0.08, hy, hz + 0.13], [hx + 0.09, hy, hz + 0.13], 0.068, 0.068, 12);
      box(B.dark, hx - 0.10, hx - 0.06, hy - 0.04, hy + 0.04, hz, hz + 0.10);
      box(B.dark, hx + 0.11, hx + 0.13, hy - 0.11, hy + 0.11, hz + 0.02, hz + 0.24);
      box(B.dark, hx - 0.06, hx + 0.13, hy - 0.11, hy - 0.09, hz + 0.20, hz + 0.24);
      box(B.dark, hx - 0.06, hx + 0.13, hy + 0.09, hy + 0.11, hz + 0.20, hz + 0.24);
      /* tow hooks on the lower nose plate (P1, P2) */
      slab(B.dark, [2.93 + 0.02, p * 0.55, 0.82], lu, [0, 1, 0], lw, 0.10, 0.06, 0.06);
      box(B.dark, 2.96, 3.04, p * 0.55 - 0.03, p * 0.55 + 0.03, 0.62, 0.76);
      /* rear: tow hooks, tail lamps */
      box(B.dark, REAR - 0.10, REAR, p * 0.72 - 0.07, p * 0.72 + 0.07, 0.62, 0.74);
      box(B.dark, REAR - 0.05, REAR, p * 0.92 - 0.06, p * 0.92 + 0.06, 1.25, 1.35);
    }
    /* the splash ridge across the glacis (P2) and the driver's hatch front left (published) */
    slab(B.paint, [2.30, 0, gz(2.30) + 0.05], gw, [0, 1, 0], gu, 0.05, 0.70, 0.015);
    cylZ(B.paint, 1.55, 0.50, DECK, DECK + 0.06, 0.25, 16);
    box(B.dark, 1.78, 1.86, 0.36, 0.64, DECK, DECK + 0.07);
    /* the toothed bracket row on the nose (P1) */
    slab(B.dark, [2.94, 0, 0.84], lu, [0, 1, 0], lw, 0.14, 0.26, 0.04);
    /* the welded joint at the glacis break */
    box(B.dark, NOSE - 0.03, NOSE + 0.005, -HW, HW, GZN - 0.03, GZN + 0.005);

    /* --- engine deck behind the turret: the grilles across the rear, access plates; the
       exhaust louvres on the right side (published; place estimated) --- */
    box(B.dark, -2.95, -1.95, -0.92, 0.92, DECK - 0.01, DECK + 0.012);
    for (i = 0; i < 8; i++) box(B.paint, -2.92 + i * 0.125, -2.87 + i * 0.125, -0.90, 0.90, DECK + 0.012, DECK + 0.04);
    box(B.paint, -1.85, -1.20, -0.70, 0.70, DECK, DECK + 0.035);
    box(B.dark, -1.55, -1.50, -0.70, 0.70, DECK + 0.035, DECK + 0.045);
    box(B.dark, -2.30, -1.50, -FW - 0.01, -FW + 0.01, 1.20, 1.40);
    for (i = 0; i < 5; i++) box(B.paint, -2.27 + i * 0.16, -2.21 + i * 0.16, -FW - 0.04, -FW, 1.22, 1.38);
    /* fender boxes front left and right rear (P1, P2) */
    box(B.paint, 1.05, 1.90, 1.22, 1.58, DECK, DECK + 0.18);
    box(B.dark, 1.45, 1.49, 1.21, 1.59, DECK + 0.02, DECK + 0.18);
    box(B.paint, -2.90, -2.10, -1.58, -1.20, DECK, DECK + 0.16);
    box(B.paint, -2.90, -1.90, 1.20, 1.58, DECK, DECK + 0.16);
    /* tow cable along the left fender */
    cyl(B.dark, [-1.70, 1.40, DECK + 0.03], [0.90, 1.40, DECK + 0.03], 0.025, 0.025, 6);
    box(B.team, -2.80, -2.20, -0.14, 0.14, DECK + 0.04, DECK + 0.055);
    box(B.team, 2.40, 2.75, -1.55, -1.25, gz(2.40) + 0.02, gz(2.40) + 0.035);
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
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.04]);
    C.push([IDL.x, IDL.z, IDL.r + 0.04], [SPR.x, SPR.z, SPR.r + 0.04]);
    for (i = 0; i < XR.length; i++) C.push([XR[i], ZR, RR + 0.04]);
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
    cnt = Math.round(tot / 0.28); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.07);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        /* link plate with its grouser, centre guide horn on the inside of the run */
        belt(B.dark, px - dx * 0.07, pz - dz * 0.07, px + dx * 0.07, pz + dz * 0.07, y - TW - 0.01, y + TW + 0.01, 0.085);
        belt(B.dark, px - dx * 0.03 + dz * 0.07, pz - dz * 0.03 - dx * 0.07, px + dx * 0.03 + dz * 0.07, pz + dz * 0.03 - dx * 0.07, y - 0.025, y + 0.025, 0.06);
      }
      /* the toothed drive sprocket at the REAR (P1) */
      cylY(B.dark, SPR.x, y - 0.20, y + 0.20, SPR.z, SPR.r - 0.04, 18);
      for (i = 0; i < 13; i++) {
        var ta = i / 13 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [SPR.x + ca * (SPR.r - 0.01), y, SPR.z + sa * (SPR.r - 0.01)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.04, 0.16, 0.03);
      }
      cylY(B.paint, SPR.x, y + s * 0.20, y + s * 0.27, SPR.z, 0.19, 12);
      cylY(B.dark, SPR.x, y + s * 0.27, y + s * 0.30, SPR.z, 0.08, 8);
      /* the idler at the front (P1) with its crank */
      cylY(B.paint, IDL.x, y - 0.21, y + 0.21, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.21, y + s * 0.27, IDL.z, 0.11, 10);
      box(B.dark, IDL.x - 0.30, IDL.x, y + s * 0.28 - 0.03, y + s * 0.28 + 0.03, IDL.z - 0.04, IDL.z + 0.04);
      /* three return rollers (hidden behind the skirt) */
      for (i = 0; i < XR.length; i++) {
        cylY(B.dark, XR[i], y - 0.17, y + 0.17, ZR, RR, 10);
        cylY(B.paint, XR[i], y + s * 0.17, y + s * 0.22, ZR, 0.05, 8);
      }
    }
  }
  /* road wheel (P1): a double wheel, the dark tyre bands, the dished disc with eight
     recesses between the ribs, the hub */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.20, 0.21, 0.18];
  function addWheel(W) {
    var s, y, i, a, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.14, gg * 1.14, bb * 1.14];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.245, y - 0.14, 0, RW, 18);
      cylY(W, 0, y + 0.14, y + 0.245, 0, RW, 18);
      W.col = BODY;
      cylY(W, 0, y - 0.14, y + 0.14, 0, 0.29, 18);
      cyl(W, [0, y + s * 0.245, 0], [0, y + s * 0.265, 0], 0.28, 0.15, 18);
      cylY(W, 0, y + s * 0.26, y + s * 0.29, 0, 0.10, 10);
      W.col = HOLE;
      for (i = 0; i < 8; i++) {
        a = (i + 0.5) / 8 * TAU;
        slab(W, [Math.cos(a) * 0.21, y + s * 0.252, Math.sin(a) * 0.21], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.042, 0.012, 0.045);
      }
      W.col = TYRE;
      cylY(W, 0, y + s * 0.285, y + s * 0.305, 0, 0.05, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* turret frame: origin on the ring centre at deck height (hull x = TX), gun along +X.
     The welded turret (P1, P2) lofted through plan rings: the flat cheek faces of the
     spaced-armour boxes swept back from a narrow front either side of the gun (a wedge in
     plan), near-vertical flat sides, the bustle tapering to a flat rear */
  var TH = 0.75;
  function tring(z, k, dxf) {
    /* k: inset at the sides, dxf: set-back of the front */
    var P = [[1.72 - dxf, 0.40], [1.16 - dxf * 0.8, 1.25 - k], [-0.95, 1.25 - k], [-1.42 + k * 0.4, 0.98 - k], [-1.55 + k * 0.4, 0.62 - k * 0.5]], R = [], i;
    for (i = 0; i < P.length; i++) R.push([P[i][0], P[i][1], z]);
    for (i = P.length - 1; i >= 0; i--) R.push([P[i][0], -P[i][1], z]);
    return R;
  }
  var MUZ = 6.30, TRN = { x: 1.30, z: 0.40 };
  function addTurret(B) {
    var s, i, j, x;
    loftN(B.paint, [tring(-0.04, 0.08, 0.10), tring(0.30, 0.0, 0.0), tring(TH, 0.16, 0.26)]);
    /* the gap between the cheeks filled by the mantlet: a narrow box under its canvas cover */
    box(B.paint, 1.40, 1.86, -0.30, 0.30, 0.14, 0.64);
    box(B.dark, 1.86, 1.96, -0.22, 0.22, 0.24, 0.56);
    cylX(B.dark, 1.92, 2.08, 0, TRN.z, 0.15, 0.12, 14);
    /* coaxial MG port right of the gun */
    cylX(B.dark, 1.84, 1.98, -0.20, 0.30, 0.03, 0.03, 6);
    /* the 125 mm gun (P1, P2, P3): thermal sleeve in sections with clamp bands, the
       evacuator at about 40 % of the exposed tube, the muzzle reference collar */
    var g0 = 2.06, ev = g0 + 0.40 * (MUZ - g0);
    cylX(B.paint, g0, ev - 0.32, 0, TRN.z, 0.098, 0.092, 14);
    cylX(B.paint, ev - 0.32, ev - 0.20, 0, TRN.z, 0.092, 0.128, 14);
    cylX(B.paint, ev - 0.20, ev + 0.24, 0, TRN.z, 0.128, 0.128, 14);
    cylX(B.paint, ev + 0.24, ev + 0.36, 0, TRN.z, 0.128, 0.088, 14);
    cylX(B.paint, ev + 0.36, MUZ - 0.16, 0, TRN.z, 0.088, 0.080, 14);
    cylX(B.paint, MUZ - 0.16, MUZ, 0, TRN.z, 0.088, 0.088, 14);
    cylX(B.dark, MUZ - 0.005, MUZ + 0.005, 0, TRN.z, 0.06, 0.06, 10);
    [g0 + 0.55, g0 + 1.05, ev + 0.75, ev + 1.35, ev + 1.95].forEach(function (bx) { cylX(B.dark, bx - 0.025, bx + 0.025, 0, TRN.z, 0.104, 0.104, 14); });
    box(B.dark, MUZ - 0.12, MUZ - 0.04, -0.03, 0.03, TRN.z + 0.08, TRN.z + 0.13);

    /* --- roof (P1, P2): the commander's cupola on the right with the QJC-88, the gunner's
       hatch on the left with his sight box in front, vents, antenna bases --- */
    cylZ(B.paint, -0.25, -0.55, TH - 0.01, TH + 0.08, 0.38, 18);
    cylZ(B.paint, -0.25, -0.55, TH + 0.08, TH + 0.12, 0.30, 16);
    for (i = 0; i < 5; i++) {
      var pa = (i - 2) * 0.55;
      box(B.dark, -0.25 + Math.cos(pa) * 0.31 - 0.04, -0.25 + Math.cos(pa) * 0.31 + 0.04, -0.55 + Math.sin(pa) * 0.31 - 0.05, -0.55 + Math.sin(pa) * 0.31 + 0.05, TH + 0.03, TH + 0.10);
    }
    cylZ(B.paint, -0.30, 0.55, TH - 0.01, TH + 0.06, 0.29, 16);
    box(B.dark, -0.32, -0.28, 0.30, 0.80, TH + 0.06, TH + 0.075);
    box(B.paint, 0.38, 0.72, 0.42, 0.78, TH - 0.02, TH + 0.20);
    box(B.dark, 0.72, 0.74, 0.47, 0.73, TH + 0.06, TH + 0.17);
    box(B.paint, 0.60, 0.85, -0.70, -0.40, TH - 0.02, TH + 0.08);
    cylZ(B.dark, 0.10, 0.0, TH - 0.01, TH + 0.06, 0.12, 10);
    cylZ(B.dark, -1.25, 0.70, TH - 0.01, TH + 0.10, 0.05, 8);
    cylZ(B.dark, -1.25, -0.70, TH - 0.01, TH + 0.10, 0.05, 8);
    box(B.team, -1.15, -0.85, -0.35, 0.35, TH, TH + 0.015);
    /* lifting eyes on the cheeks */
    for (s = -1; s <= 1; s += 2) box(B.dark, 1.05, 1.15, s * 0.95 - 0.03, s * 0.95 + 0.03, TH, TH + 0.06);

    /* --- smoke tubes (P1, P2, published 6 a side): a bank of three over three on each
       rear corner, aimed forward, up and out --- */
    for (s = -1; s <= 1; s += 2) {
      var dir = unit([0.62, s * 0.38, 0.69]);
      box(B.dark, -1.05, -0.65, s > 0 ? 1.24 : -1.30, s > 0 ? 1.30 : -1.24, 0.20, 0.58);
      for (i = 0; i < 3; i++) for (j = 0; j < 2; j++) {
        var A = [-0.95 + i * 0.13, s * (1.32 + j * 0.02), 0.28 + j * 0.15];
        cyl(B.dark, A, [A[0] + dir[0] * 0.24, A[1] + dir[1] * 0.24, A[2] + dir[2] * 0.24], 0.042, 0.042, 8);
      }
    }
    /* --- the stowage basket round the bustle (P1, P2): rails, posts, a floor --- */
    var bx0 = -1.95, bx1 = -1.42, by = 1.05, bz0 = 0.08, bz1 = 0.58;
    box(B.dark, bx0, bx1, -by, by, bz0, bz0 + 0.03);
    for (i = 0; i < 3; i++) {
      var zr = bz0 + 0.16 + i * 0.16;
      box(B.dark, bx0, bx0 + 0.03, -by, by, zr - 0.012, zr + 0.012);
      for (s = -1; s <= 1; s += 2) box(B.dark, bx0, -1.05, s * by - 0.012, s * by + 0.012, zr - 0.012, zr + 0.012);
    }
    for (x = 0; x <= 6; x++) box(B.dark, bx0, bx0 + 0.03, -by + x * by / 3 - 0.012, -by + x * by / 3 + 0.012, bz0, bz1);
    for (s = -1; s <= 1; s += 2) for (x = bx0; x < -1.05; x += 0.30) box(B.dark, x, x + 0.025, s * by - 0.012, s * by + 0.012, bz0, bz1);
    box(B.paint, bx0 + 0.06, bx1, -0.80, -0.10, bz0 + 0.03, bz0 + 0.33);
    box(B.paint, bx0 + 0.06, bx1, 0.20, 0.85, bz0 + 0.03, bz0 + 0.26);
  }
  /* the QJC-88 12.7 mm on the cupola, trained with the turret (P1, P2) */
  function addAaMg(B) {
    var mx = -0.05, my = -0.55, mz = TH + 0.12;
    box(B.dark, mx - 0.30, mx - 0.24, my - 0.03, my + 0.03, mz, mz + 0.30);
    box(B.dark, mx - 0.40, mx + 0.15, my - 0.06, my + 0.06, mz + 0.27, mz + 0.38);
    cylX(B.dark, mx + 0.15, mx + 1.05, my, mz + 0.33, 0.025, 0.022, 8);
    cylX(B.dark, mx + 1.00, mx + 1.10, my, mz + 0.33, 0.04, 0.04, 8);
    box(B.dark, mx - 0.20, mx + 0.02, my + 0.06, my + 0.20, mz + 0.18, mz + 0.34);
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
    addAaMg(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, DECK);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build };
})();

/* len: the measured X extent of the build */
UNIT_MODELS["pla_e90_mbt"] = { len: 9.78, build: HeroType96.build };
