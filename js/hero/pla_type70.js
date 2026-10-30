/* ========== pla_type70.js - HERO model: Type 70 (WZ-302) 122 mm self-propelled howitzer ==========
   pla_e60_spg   "Type 70 (WZ-302) 122mm self-propelled howitzer": the Type 54-1 122 mm howitzer
   (a licence M-30) set open-topped on the rear of a stretched YW531 (Type 63 APC) chassis,
   behind the howitzer's own shield, with a limited traverse.

   THE REFERENCE PROBLEM, stated first: Wikimedia Commons holds NO photograph or drawing of the
   Type 70 / WZ302 howitzer (searched in English and Chinese, by designation, by museum and by
   the Flickr-import titles; the Type 63 category has no SPH subcategory), and zh.wikipedia,
   archive.org and the trade sites are out of reach from this machine.  So this model is built
   from the chassis it shares (the Type 63 hero's measured references), the howitzer it carries
   (an M-30 photograph) and the published text below.  Everything that only a photograph of the
   Type 70 itself could settle is listed under NOT CONFIRMED.

   References:
     P1  "Type 63 Armored personnel carriers 20251112.jpg" (the Type 63 hero's P1, cached in
         scratchpad/q_ypr_ref) - the YW531 from the left: road wheel size and pitch, front
         sprocket, rear idler, no return rollers, the bins over the track, the upper sides
         leaning in to the roof line.  The whole running gear and the lower hull, bins, glacis,
         headlamps and driver's station here are the Type 63 hero's, copied, then stretched.
     P2  "Type 63 APC at the Beijing Military Museum - 1.jpg" (Type 63 hero's P2) - the glacis,
         the twin headlamps in guards, the roof's louvred grille, the three-ribbed bins.
     P3  "Puckapunyal-YW531-1.jpg" (Type 63 hero's P3) - the nose plate and towing eyes.
     P4  "M30 hameenlinna side.jpg" (scratchpad/q_pla_e60_spg_ref) - an M-30 from its right,
         near side-on: the plain tube with no muzzle brake and a thicker rear jacket up to a
         clamp band, the deep cradle under the tube holding the recoil cylinders and reaching
         well forward (to about 0.57 of the tube ahead of the trunnion), the breech a short way
         behind the trunnion, the flat shield standing just ahead of the trunnion and leaning
         back, the handwheel on the right of the top carriage.  Proportions read off it against
         the published 2.8 m tube.
     (Seen, not used for geometry: "Type 70 (WZ303) self-propelled rocket launcher 20131004.JPG"
     - the Type 70 rocket launcher, a different vehicle on the unstretched four-wheel A531.)
   Published:
     en.wikipedia "Type 63 (armoured personnel carrier)": the Type 63 is 5.476 x 2.978 x 2.58 m;
       "Type WZ302 or Type 54-1/Type 63-1 SPH - self-propelled artillery version of the Type
       B531 mounting a 122 mm Type 54-I howitzer.  An improved version, the Type 70, has a
       longer chassis.  Both vehicles also mount a Type 67 machine gun."
     en.wikipedia "122 mm howitzer M1938 (M-30)": tube 2.8 m (L/22.7), no muzzle brake,
       hydraulic buffer and hydropneumatic recuperator, elevation -3 to +63.5 deg, traverse 49 deg
       on its own carriage; "Type WZ302 ... The military designator is Type 70 SPH.  The initial
       model had only 4 roadwheels, but the improved Type WZ302A or Type 70-1 has 5."
     en.wikipedia "Type 85 AFV" (YW531H, the family's other stretch): "a longer chassis with an
       additional road wheel on each side", 6.125 x 3.060 x 2.590 m.
     js/eras.js: 15.3 t (zh.wikipedia).
   Chassis decision: the two articles disagree on whether the vehicle called "Type 70" is the
   four- or the five-wheel one; both agree a longer, five-wheel chassis was built, and the Type 63
   article ties the longer chassis to the name "Type 70".  Drawn: FIVE road wheels on a hull
   stretched to the Type 85's published 6.125 m (the only published length for a five-wheel
   YW531), the same wheel, sprocket and idler as the Type 63, the pitch shrunk to fit (0.93 m).

   Recognition list (what makes it read at game zoom, and its source):
     1. the YW531 box hull, bins over the track, front sprocket, rear idler, no return rollers,
        tyred road wheels - P1, P2 (now five a side - published, see above)
     2. an open fighting compartment over the rear two thirds - published ("open-topped"; the
        roof of the troop compartment gone)
     3. the short fat 122 mm tube over the front roof, plain muzzle, the deep recoil cradle under
        it - P4, published 2.8 m
     4. the howitzer's flat shield, split round the cradle - P4
     5. the Type 67 machine gun - published (place on the roof not confirmed)
   Paint: PLA green, the Type 63 hero's #525c3a.  No stars or numbers.
   NOT CONFIRMED, judgement calls (no photograph of the Type 70 found):
     - four or five road wheels (see the chassis decision), the hull length 6.125 m (borrowed
       from the Type 85), the absence of return rollers, the bins' dividers;
     - the open compartment's extent (front bulkhead at x = 0.00) and wall height (kept at the
       APC's roof line 1.90 m), the rear plate (drawn plain: the APC's door not drawn);
     - the gun's place: pivot 1.0 m behind mid-length, trunnion 2.30 m up (set so the cradle
       clears the front roof), the pedestal and the top carriage cheeks under it;
     - the shield's size on this mount (1.70 m wide, top 2.70 m up) and its cut-out;
     - the Type 67's place (drawn on the APC's machine-gun socket on the front roof);
     - no trim vane on the glacis (an amphibious APC fitting; an open-topped howitzer is
       presumed not to swim), no travel lock (no reference shows one), no ammunition racks;
     - the overall height (2.72 m to the shield top) and the turret's traverse limits.
   Materials: PAINT (canvas texture), DARK, WHEEL (vertex colours), team colour (C.team): a
   strip on the front roof and two on the shield's top edge.
   Nodes: "turret" = the gun mount (pedestal, cheeks, cradle, tube, shield), origin on the pivot
   at the compartment's wall-top line (x -1.00, z 1.90), gun along +X.  The real mount trains
   only a little (the towed M-30 carriage: 49 deg in all, published; the SPH's own limits not
   found); the engine may train it further - the shield and pedestal then still clear the
   compartment walls and the cradle rides above the wall tops.  Five "roadwheel" groups.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroType70 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var PAINT = { base: "#525c3a", blots: ["#485232", "#5c6642"], seed: 302 };
  /* running gear: the Type 63's (P1) with a fifth wheel; sprocket 0.47 m in from the nose and
     idler 0.46 m in from the rear as on the Type 63, the gaps 0.85 and 0.75 of a pitch as on
     the Type 63, so the pitch is (6.125 - 0.93) / 5.6 = 0.928 m */
  var TY = 1.24, TW = 0.18;
  var PITCH = 0.928, SPR = { x: 2.593, z: 0.56, r: 0.27 }, IDL = { x: -2.603, z: 0.46, r: 0.28 };
  var XW = [], ZW = 0.37, RW = 0.37;
  (function () { for (var i = 0; i < 5; i++) XW.push(SPR.x - 0.85 * PITCH - i * PITCH); })();
  /* hull: the Type 63's sections; the nose and rear 0.3225 m further out each way (6.125 m) */
  var NOSE = 3.0625, REAR = -3.0625, BELLY = 0.46, BZ0 = 0.95, BZ1 = 1.25, ROOF = 1.90, RW2 = 1.02, SW = 1.40, BW = 1.49;
  var DX = 0.3225;            /* the Type 63's front details move forward by this much */
  var GX = 1.55 + DX;         /* the glacis meets the roof */
  var CF = 0.00;              /* front bulkhead of the open fighting compartment */
  var PIV = { x: -1.00, z: ROOF };            /* the gun mount's pivot */
  var TR = { x: 0.15, z: 0.40 };              /* trunnion, in the mount's frame */

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
  function sec(x, top, hw, w0) {
    return [[x, -w0, BZ0], [x, w0, BZ0], [x, w0, BZ1], [x, hw, top], [x, -hw, top], [x, -w0, BZ1]];
  }
  /* a wall plate along X from x0 to x1 between two edge lines (y, z) - (y, z), t thick inward */
  function wall(bin, x0, x1, ya, za, yb, zb, s, t) {
    hexa(bin, [[x0, ya, za], [x1, ya, za], [x1, ya - s * t, za], [x0, ya - s * t, za],
               [x0, yb, zb], [x1, yb, zb], [x1, yb - s * t, zb], [x0, yb - s * t, zb]]);
  }
  function addHull(B) {
    var s, i;
    /* the lower hull between the tracks (the Type 63's, stretched): belly, the nose plate
       leaning back (P3), the rear plate */
    prismY(B.paint, [[REAR, 0.62], [REAR + 0.18, BELLY], [NOSE - 0.34, BELLY], [NOSE, 1.02], [NOSE, BZ0 + 0.02], [REAR, BZ0 + 0.02]], -1.02, 1.02);
    /* the closed front: driver's station and engine - the Type 63's sections from the
       compartment's front bulkhead to the steep glacis (P1, P2) */
    loftN(B.paint, [sec(CF, ROOF, RW2, SW), sec(GX, ROOF, RW2, SW), sec(NOSE, BZ1 + 0.02, RW2 + 0.20, SW)]);
    /* the open fighting compartment: the troop compartment's roof gone, its walls kept to
       the roof line - floor, the bins' level band and the leaning upper walls, the rear plate */
    box(B.paint, REAR + 0.04, CF, -SW + 0.04, SW - 0.04, BZ0 + 0.02, BZ0 + 0.05);
    for (s = -1; s <= 1; s += 2) {
      wall(B.paint, REAR, CF, s * SW, BZ0, s * SW, BZ1, s, 0.04);
      wall(B.paint, REAR, CF, s * SW, BZ1, s * RW2, ROOF, s, 0.04);
      box(B.dark, REAR, CF, s > 0 ? RW2 - 0.05 : -RW2 - 0.01, s > 0 ? RW2 + 0.01 : -RW2 + 0.05, ROOF, ROOF + 0.02);
    }
    loftN(B.paint, [sec(REAR, ROOF, RW2, SW), sec(REAR + 0.04, ROOF, RW2, SW)]);
    box(B.dark, REAR - 0.01, REAR + 0.05, -RW2, RW2, ROOF, ROOF + 0.02);
    for (s = -1; s <= 1; s += 2) {
      /* the stowage bins over the track, three ribs, dividers, end caps (P1, P2) */
      var yi = s * SW, yo = s * BW, ya = Math.min(yi, yo), yb = Math.max(yi, yo);
      box(B.paint, REAR + 0.05, NOSE - 0.10, ya, yb, BZ0, BZ1);
      for (i = 0; i < 3; i++) {
        var zr = BZ0 + 0.06 + i * 0.09;
        box(B.dark, REAR + 0.08, NOSE - 0.13, s > 0 ? yb : ya - 0.012, s > 0 ? yb + 0.012 : ya, zr, zr + 0.025);
      }
      [-1.60, 0.10, GX].forEach(function (bx) { box(B.dark, bx - 0.02, bx + 0.02, s > 0 ? yb : ya - 0.015, s > 0 ? yb + 0.015 : ya, BZ0, BZ1); });
      /* the mudguard turned down over the sprocket at the front */
      belt(B.paint, NOSE - 0.10, BZ0, NOSE + 0.08, BZ0 - 0.22, ya, yb, 0.03);
    }
    /* --- glacis (P2, P3): the twin headlamps in guards at the roof's front corners, the
       towing eyes on the nose plate --- */
    for (s = -1; s <= 1; s += 2) {
      var hy = s * 0.80;
      [-0.12, 0.12].forEach(function (dy) {
        cyl(B.paint, [GX - 0.07, hy + dy, ROOF + 0.14], [GX + 0.07, hy + dy, ROOF + 0.14], 0.075, 0.08, 12);
        cyl(B.dark, [GX + 0.07, hy + dy, ROOF + 0.14], [GX + 0.08, hy + dy, ROOF + 0.14], 0.068, 0.068, 12);
      });
      box(B.dark, GX - 0.11, GX - 0.07, hy - 0.04, hy + 0.04, ROOF, ROOF + 0.10);
      box(B.dark, GX + 0.11, GX + 0.14, hy - 0.26, hy + 0.26, ROOF + 0.05, ROOF + 0.08);
      box(B.dark, GX - 0.15, GX + 0.14, hy - 0.26, hy - 0.23, ROOF + 0.05, ROOF + 0.08);
      box(B.dark, GX - 0.15, GX + 0.14, hy + 0.23, hy + 0.26, ROOF + 0.05, ROOF + 0.08);
      cyl(B.dark, [NOSE + 0.02, s * 0.55 - 0.07, 0.80], [NOSE + 0.02, s * 0.55 + 0.07, 0.80], 0.055, 0.055, 8);
      box(B.dark, NOSE - 0.12, NOSE, s * 0.55 - 0.06, s * 0.55 + 0.06, 0.75, 0.85);
    }
    /* --- front roof (P2): the driver's hatch and cupola on the left, the louvred engine
       grille on the right, as on the Type 63; team strip --- */
    box(B.paint, 0.95 + DX, 1.40 + DX, 0.25, 0.75, ROOF, ROOF + 0.05);
    cylZ(B.paint, 1.15 + DX, 0.50, ROOF + 0.05, ROOF + 0.09, 0.20, 14);
    box(B.paint, 0.60 + DX, 1.40 + DX, -0.95, -0.25, ROOF, ROOF + 0.03);
    for (i = 0; i < 7; i++) box(B.dark, 0.66 + DX + i * 0.105, 0.70 + DX + i * 0.105, -0.90, -0.30, ROOF + 0.03, ROOF + 0.045);
    box(B.team, CF + 0.08, CF + 0.20, -0.50, 0.50, ROOF, ROOF + 0.015);
    /* --- rear plate: plain (the APC's door not confirmed here); the towing eyes --- */
    for (s = -1; s <= 1; s += 2) box(B.dark, REAR - 0.12, REAR, s * 0.80 - 0.06, s * 0.80 + 0.06, 0.66, 0.76);
  }

  /* the Type 67 7.62 mm (published; place not confirmed): on the Type 63's machine-gun socket
     at the front roof, fixed */
  function addMg(B) {
    var x = 0.95 + DX, y = -0.20, z = ROOF + 0.40;
    cylZ(B.paint, x, y, ROOF, ROOF + 0.06, 0.14, 12);
    cylZ(B.dark, x, y, ROOF + 0.06, z - 0.05, 0.035, 8);
    box(B.dark, x - 0.30, x + 0.12, y - 0.04, y + 0.04, z - 0.05, z + 0.05);
    cyl(B.dark, [x + 0.12, y, z], [x + 0.75, y, z], 0.016, 0.016, 6);
    box(B.dark, x - 0.08, x + 0.06, y + 0.04, y + 0.14, z - 0.14, z - 0.02);
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
      /* the toothed drive sprocket at the FRONT (P1, P3) */
      cylY(B.dark, SPR.x, y - 0.12, y + 0.12, SPR.z, SPR.r - 0.05, 18);
      for (i = 0; i < 11; i++) {
        var ta = i / 11 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [SPR.x + ca * (SPR.r - 0.02), y, SPR.z + sa * (SPR.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.04, 0.09, 0.03);
      }
      cylY(B.paint, SPR.x, y + s * 0.12, y + s * 0.17, SPR.z, 0.15, 14);
      /* the idler at the rear (P1) */
      cylY(B.paint, IDL.x, y - 0.15, y + 0.15, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.15, y + s * 0.20, IDL.z, 0.07, 10);
    }
  }
  /* road wheel (P1, P2): rubber tyre, a dished disc with six recesses, hub */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.17, 0.18, 0.15];
  function addWheel(W) {
    var s, y, i, a, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIB = [rr * 1.3, gg * 1.3, bb * 1.3];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.15, y + 0.15, 0, RW, 20);
      W.col = BODY;
      cyl(W, [0, y + s * 0.15, 0], [0, y + s * 0.18, 0], RW - 0.055, 0.12, 20);
      W.col = HOLE;
      for (i = 0; i < 6; i++) {
        a = (i + 0.5) / 6 * TAU;
        slab(W, [Math.cos(a) * 0.20, y + s * 0.168, Math.sin(a) * 0.20], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.06, 0.010, 0.055);
      }
      W.col = RIB;
      cylY(W, 0, y + s * 0.17, y + s * 0.20, 0, 0.09, 10);
    }
  }


  /* -------------------------------------------- the Type 54-1 howitzer and its mount */
  /* "turret" frame: origin on the pivot at the wall-top line, gun along +X.  The tube, cradle
     and shield are the M-30's (P4, published 2.8 m); the pedestal and cheeks are a plain
     stand-in for the unseen mount (NOT CONFIRMED). */
  var LEAN = 10 * Math.PI / 180;
  function addGun(B) {
    var s, tx = TR.x, tz = TR.z, floor = BZ0 + 0.05 - ROOF;
    /* pedestal on the compartment floor, its flange */
    cylZ(B.dark, 0, 0, floor, floor + 0.07, 0.48, 18);
    cylZ(B.paint, 0, 0, floor + 0.07, -0.45, 0.30, 16);
    /* top carriage: a saddle and two cheeks carrying the trunnions */
    box(B.paint, -0.30, 0.42, -0.30, 0.30, -0.52, -0.40);
    for (s = -1; s <= 1; s += 2) {
      prismY(B.paint, [[-0.40, -0.52], [0.52, -0.52], [0.34, tz + 0.06], [-0.10, tz + 0.06]], s > 0 ? 0.24 : -0.30, s > 0 ? 0.30 : -0.24);
      cylY(B.dark, tx, s * 0.30, s * 0.36, tz, 0.08, 10);
    }
    /* the handwheel on the right of the top carriage (P4) */
    cylY(B.dark, tx - 0.20, -0.31, -0.37, tz - 0.32, 0.13, 14);
    /* the cradle under the tube, deep, reaching 1.32 m ahead of the trunnion (P4), and the
       buffer and recuperator cylinders along its sides; the clamp band at its front */
    box(B.paint, tx - 0.40, tx + 1.32, -0.13, 0.13, tz - 0.38, tz - 0.10);
    for (s = -1; s <= 1; s += 2) {
      cyl(B.paint, [tx - 0.35, s * 0.08, tz - 0.24], [tx + 1.36, s * 0.08, tz - 0.24], 0.085, 0.085, 12);
      cyl(B.dark, [tx + 1.36, s * 0.08, tz - 0.24], [tx + 1.39, s * 0.08, tz - 0.24], 0.06, 0.06, 10);
    }
    box(B.paint, tx + 1.16, tx + 1.28, -0.16, 0.16, tz - 0.36, tz + 0.14);
    /* the tube (P4, 2.8 m, no muzzle brake): breech ring 0.50 m behind the trunnion, the
       thick jacket to a band 1.0 m ahead, the thinner chase to the muzzle 2.30 m ahead */
    box(B.paint, tx - 0.50, tx - 0.20, -0.15, 0.15, tz - 0.15, tz + 0.15);
    box(B.dark, tx - 0.53, tx - 0.50, -0.10, 0.10, tz - 0.10, tz + 0.10);
    cyl(B.paint, [tx - 0.20, 0, tz], [tx + 1.00, 0, tz], 0.12, 0.115, 16);
    cyl(B.paint, [tx + 0.92, 0, tz], [tx + 1.02, 0, tz], 0.135, 0.135, 16);
    cyl(B.paint, [tx + 1.00, 0, tz], [tx + 2.30, 0, tz], 0.095, 0.085, 16);
    cyl(B.dark, [tx + 2.30, 0, tz], [tx + 2.305, 0, tz], 0.06, 0.06, 12);
    /* the shield (P4): a flat plate just ahead of the trunnion, leaning back, split round
       the cradle and tube - two wings, a lower bridge under the cradle, a top bridge */
    var u = [Math.cos(LEAN), 0, Math.sin(LEAN)], v = [0, 1, 0], w = [-Math.sin(LEAN), 0, Math.cos(LEAN)];
    function sx(z) { return tx + 0.32 - (z - 0.24) * Math.tan(LEAN); }
    function plate(bin, y0, y1, z0, z1) {
      var zc = (z0 + z1) / 2;
      slab(bin, [sx(zc), (y0 + y1) / 2, zc], u, v, w, 0.012, (y1 - y0) / 2, (z1 - z0) / 2 / Math.cos(LEAN));
    }
    for (s = -1; s <= 1; s += 2) {
      plate(B.paint, s > 0 ? 0.22 : -0.85, s > 0 ? 0.85 : -0.22, -0.32, 0.80);
      plate(B.team, s > 0 ? 0.40 : -0.75, s > 0 ? 0.75 : -0.40, 0.80, 0.82);
    }
    plate(B.paint, -0.22, 0.22, -0.32, -0.02);
    plate(B.paint, -0.22, 0.22, tz + 0.18, 0.80);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, WB, tg;
    addHull(HB);
    addRunning(HB);
    addMg(HB);
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
    addGun(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(PIV.x, 0, PIV.z);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build };
})();

/* len: the measured X extent of the build */
UNIT_MODELS["pla_e60_spg"] = { len: 6.34, build: HeroType70.build };
