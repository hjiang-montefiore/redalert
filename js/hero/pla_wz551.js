/* ========== pla_wz551.js - HERO model: WZ-551A / ZSL-92 6x6 wheeled infantry fighting vehicle ==========
   pla_e90_ifv     "WZ-551 (ZSL-92) 6x6 wheeled IFV", in service 1995, one-man ZPT-90 25 mm turret.
   pla_e90_recon   "WZ-551 reconnaissance variants": no reference shows a recon variant clearly enough
                   to draw, so the row is drawn as the same vehicle (same builder).

   References, Wikimedia Commons at width 960, cached in scratchpad/q_wz551_ref:
     P1  "Sri Lanka Military 0233.jpg" - WZ-551A (12.7 mm APC turret), right side, nose right, near
         square on (the front face just visible): the THREE EVENLY SPACED axles, the big off-road
         tyres with painted ten-nut rims, the sharp chine round the hull with the upper sides
         leaning in and the lower hull tucked under it, the long overhang ahead of the front axle,
         the long low windscreen glacis, the nose deck and lip, the cab side window and mirror,
         the open cab hatch lids, the handrail and firing-port blisters along the flank, the
         sloped upper rear plate, the propeller shroud low on the rear corner.  THE MEASURING
         PHOTO: the three wheel centres (125 / 297 / 485 px) and the hull ends (30 / 885 px) put
         through a perspective correction by the tyre heights (154 / 160 / 170 px): rear overhang
         0.63 D, pitches 1.10 / 1.14 D, front overhang 2.25 D; heights at the middle wheel: chine
         1.36 D, roof 1.89 D, belly side edge 0.6 D.
     P2  "SLA Mechanized Infantry WMZ551.JPG" - front left 3/4: the boat bow - the big lower front
         plate raking back to the belly with the two louvred intakes in it, the lip, the nose
         deck, the two windscreens side by side in the shallow glacis with their armoured flaps
         raised, the lamp boxes on the ledge at the glacis' foot corners, the upper sides leaning
         in, the narrower cab.
     P3  "PLA Hong Kong Garrison ZSL92B.JPG" - ZSL-92B, right front 3/4: the same hull in PLA
         service; the flaps raised, the rear propeller shroud, the smoke dischargers on the turret
         cheeks (the 92B's 30 mm turret is NOT the ZSL-92's and is not drawn).
     P4  "Chinese wheeled APC (2008).jpg" - police WZ-551 from the right: the cab window, the hatch
         lids, the deck; its front axle gap is longer than the rear (an earlier chassis), so it
         is used for shapes only, not spacing.
   Published (en.wikipedia "WZ-551"): 6.63 x 2.80 x 2.80 m, 12.5-15.8 t; "On the WZ-551A, the
   distance is the same for all axles and wheels"; driver and commander in front, the turret
   basket and nine troops behind; ZPT-90 25 mm with a 7.62 mm coax, -8 to +55 deg; "two banks of
   four smoke grenade launchers on each side of the turret"; "fully amphibious with steerable
   propellers behind the rear wheels"; steel-reinforced radial tyres.

   Recognition list (what makes it read at game zoom, and its source):
     1. three big evenly spaced off-road tyres, all set well back, the long bow overhang - P1
     2. the boat hull: the sharp chine, upper sides leaning in, the hull tucked in under it - P1, P2
     3. the bow: the raked lower plate with its intakes, the lip, the flat nose deck - P1, P2
     4. the twin windscreens in the long low glacis with the armoured flaps raised - P1, P2, P3
     5. the small one-man turret amidships with the long thin 25 mm gun - published
     6. the propeller shrouds at the rear corners - P1, P3
   Paint: PLA green as the Type 63 (#525c3a).  P1, P2, P3 wear camouflage, P4 police white: not
   drawn.  No stars, numbers or emblems.
   Scale: the published 6.63 m over the hull, the photograph's ratios kept; the tyre (1.24 m over
   the tread) and the heights from the photograph at the scale that puts the turret roof at the
   published 2.80 m (the photograph's own scale would give a 1.3 m tyre and a 2.4 m roof).
   NOT CONFIRMED, judgement calls: the whole turret (no photograph of the ZSL-92's ZPT-90 turret
   was found: a low faceted one-man turret, its size, the 25 mm barrel's length and jacket, the
   sight, hatch and the smoke-discharger layout are drawn from the published description); the
   heights (roof 2.28, chine 1.62, belly 0.55: proportions, see Scale); the roof and hull half
   widths (1.02 / 1.36 m) and the side lean; the rear plate's door, the roof hatches behind the
   turret, the engine louvres on the roof; the propeller shrouds' size and height; the tyre's
   tread pattern.
   Materials: PAINT (canvas texture), DARK, WHEEL (vertex colours: the tyres, rims, glass and
   lamps), team colour (C.team): a strip on the rear roof and one each side of the turret.
   Nodes: "turret" (origin on the ring at the roof, gun along +X) and three "roadwheel" axle
   groups (both wheels of an axle; origin on the axle centre).
   Measured: 6.72 x 2.79 m, hull roof 2.28, turret roof 2.76, hatch 2.82 (3.49 to the whip aerial).
   Model space: +X nose, +Y left, +Z up, metres, tyres on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroWz551 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var PAINT = { base: "#525c3a", blots: ["#485232", "#5c6642"], seed: 551 };
  /* running gear (P1): three axles at an even 1.44 m pitch, tyre 1.24 m over the tread */
  var XA = [0.38, -1.06, -2.50], ZW = 0.62, TY = 1.13, TH = 0.19, RT = 0.59;
  /* hull (P1): nose lip, tail, belly, chine, roof; half widths */
  var NOSE = 3.31, TAIL = -3.31, BELLY = 0.55, CHZ = 1.62, ROOF = 2.28, CHW = 1.36, RFW = 1.02, LOW = 0.90, UNZ = 1.40;
  /* the windscreen glacis: the roof's front edge to its foot (P1) */
  var GX0 = 1.60, GX1 = 2.39, GZ1 = 1.76;
  /* the turret ring (P1: the APC turret's centre) */
  var TX = -0.45;

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

  /* ---------------------------------------------------------------- hull */
  var GLASS = [0.10, 0.12, 0.13], AMBER = [0.85, 0.50, 0.12], RED = [0.55, 0.10, 0.08];
  /* the upper hull's ring: the ledge under the chine, the chine, the roof edge */
  function upr(x, uw, uz, cw, cz, tw, tz) { return [[x, -uw, uz], [x, uw, uz], [x, cw, cz], [x, tw, tz], [x, -tw, tz], [x, -cw, cz]]; }
  /* the lower hull's ring: belly, knee, top (inside the upper hull) */
  function lwr(x, bw, bz, kw, kz, tw, tz) { return [[x, -bw, bz], [x, bw, bz], [x, kw, kz], [x, tw, tz], [x, -tw, tz], [x, -kw, kz]]; }
  /* a slab lying on the upper flank (side s) at x, height z: hu along x, hv up the face, hw out */
  var FL = Math.sqrt((CHW - RFW) * (CHW - RFW) + (ROOF - CHZ) * (ROOF - CHZ));
  var FU = [0, -(CHW - RFW) / FL, (ROOF - CHZ) / FL], FN = [0, (ROOF - CHZ) / FL, (CHW - RFW) / FL];
  function flankY(z) { return CHW - (z - CHZ) * (CHW - RFW) / (ROOF - CHZ); }
  function onFlank(bin, x, z, s, hu, hv, hw, out) {
    var n = [0, s * FN[1], FN[2]], v = [0, s * FU[1], FU[2]], y = s * flankY(z);
    slab(bin, [x + 0, y + n[1] * (hw + (out || 0)), z + n[2] * (hw + (out || 0))], [1, 0, 0], v, n, hu, hv, hw);
  }
  /* the windscreen glacis: point at fraction t from the roof edge, its axes */
  var GL = Math.sqrt((GX1 - GX0) * (GX1 - GX0) + (ROOF - GZ1) * (ROOF - GZ1));
  var GU = [(GX1 - GX0) / GL, 0, -(ROOF - GZ1) / GL], GN = [(ROOF - GZ1) / GL, 0, (GX1 - GX0) / GL];
  function gp(t, y, off) { return [GX0 + GU[0] * GL * t + GN[0] * off, y, ROOF + GU[2] * GL * t + GN[2] * off]; }

  function addHull(B) {
    var s, i, x;
    /* --- lower hull (P1, P2): narrow between the wheels, tucked under the chine ledge; ahead
       of the front wheels it widens into the bow, the lower front plate raking back from the
       lip to the belly; the rear raked up to the tail --- */
    loftN(B.paint, [lwr(TAIL + 0.10, 0.60, 1.02, 0.84, 1.16, 0.88, UNZ + 0.04),
                    lwr(TAIL + 0.42, 0.66, BELLY, 0.90, 0.84, LOW, UNZ + 0.04),
                    lwr(1.06, 0.66, BELLY, 0.90, 0.84, LOW, UNZ + 0.04),
                    lwr(1.20, 0.70, BELLY, 1.08, 0.90, 1.30, UNZ + 0.10),
                    lwr(2.55, 0.70, BELLY, 1.06, 0.92, 1.26, UNZ + 0.10),
                    lwr(NOSE, 0.94, 1.36, 1.04, 1.40, 1.10, UNZ + 0.10)]);
    /* --- upper hull: the chine ledge, the flanks leaning in, the flat roof; the sloped rear
       plate; the long low windscreen glacis down to the ledge carrying the lamp boxes, the
       nose deck sloping to the lip (P1, P2) --- */
    loftN(B.paint, [upr(TAIL, LOW, UNZ - 0.02, CHW - 0.02, CHZ - 0.04, CHW - 0.10, CHZ + 0.04),
                    upr(TAIL + 0.21, LOW, UNZ, CHW, CHZ, RFW + 0.02, ROOF - 0.03),
                    upr(TAIL + 0.27, LOW, UNZ, CHW, CHZ, RFW, ROOF),
                    upr(GX0, LOW, UNZ, CHW, CHZ, RFW, ROOF),
                    upr(GX1, LOW, UNZ + 0.02, CHW - 0.03, CHZ + 0.02, 1.00, GZ1),
                    upr(3.18, 1.04, UNZ + 0.06, 1.18, 1.55, 1.00, 1.62),
                    upr(NOSE, 0.98, UNZ + 0.02, 1.12, 1.47, 0.98, 1.53)]);
    for (s = -1; s <= 1; s += 2) {
      /* the chine edge strip, a dark crease between the wheels (P1) */
      box(B.dark, TAIL + 0.15, 2.40, s > 0 ? CHW - 0.03 : -CHW - 0.005, s > 0 ? CHW + 0.005 : -CHW + 0.03, CHZ - 0.035, CHZ - 0.015);
      /* the handrail and the stowed rod along the troop compartment (P1) */
      for (i = 0; i < 4; i++) onFlank(B.dark, -2.95 + i * 0.66, 2.12, s, 0.02, 0.03, 0.03);
      onFlank(B.dark, -1.97, 2.12, s, 1.00, 0.015, 0.012, 0.05);
      onFlank(B.dark, -2.10, 1.98, s, 1.05, 0.02, 0.02, 0.02);
      /* firing ports and their vision blocks (P1: the blisters along the flank) */
      [-2.75, -2.05, -1.35].forEach(function (fx) {
        onFlank(B.paint, fx, 1.86, s, 0.11, 0.09, 0.03);
        onFlank(B.dark, fx, 1.86, s, 0.05, 0.04, 0.02, 0.03);
        B.vc.col = GLASS;
        onFlank(B.vc, fx, 2.03, s, 0.07, 0.035, 0.015, 0.0);
      });
      /* the cab: the side window and its frame, the mirror on its arm (P1, P4) */
      onFlank(B.paint, 1.12, 1.97, s, 0.22, 0.17, 0.02);
      B.vc.col = GLASS;
      onFlank(B.vc, 1.12, 1.97, s, 0.18, 0.13, 0.01, 0.04);
      box(B.dark, 1.42, 1.46, s * (flankY(2.05)) - 0.03, s * (flankY(2.05)) + 0.03, 2.00, 2.10);
      box(B.dark, 1.44, 1.47, s * 1.04 - 0.02 + s * 0.16, s * 1.04 + 0.02 + s * 0.16, 1.92, 2.22);
      box(B.dark, 1.43, 1.48, s * 1.20 - 0.06, s * 1.20 + 0.06, 1.98, 2.20);
      /* the lamp boxes on the ledge at the glacis' foot corners, the amber lens forward (P2) */
      var ly = s * 1.12;
      box(B.paint, 2.24, 2.50, ly - 0.12, ly + 0.12, 1.64, 1.90);
      box(B.dark, 2.50, 2.52, ly - 0.10, ly + 0.10, 1.66, 1.88);
      B.vc.col = AMBER;
      cyl(B.vc, [2.51, ly, 1.80], [2.54, ly, 1.80], 0.055, 0.055, 10);
      B.vc.col = [0.85, 0.82, 0.70];
      cyl(B.vc, [2.51, ly, 1.70], [2.53, ly, 1.70], 0.04, 0.04, 8);
      /* the louvred intakes in the lower front plate (P2) */
      var lu = [-(NOSE - 2.55), 0, -(1.36 - BELLY)], ll = Math.sqrt(lu[0] * lu[0] + lu[2] * lu[2]);
      lu = [lu[0] / ll, 0, lu[2] / ll];
      var ln = [-lu[2], 0, lu[0]];
      if (ln[0] < 0) ln = [-ln[0], 0, -ln[2]];
      for (i = 0; i < 5; i++) {
        var tt = 0.18 + i * 0.07;
        slab(B.dark, [NOSE + lu[0] * ll * tt + ln[0] * 0.01, s * 0.62, 1.36 + lu[2] * ll * tt + ln[2] * 0.01], lu, [0, 1, 0], ln, 0.018, 0.22, 0.012);
      }
      /* the towing eyes low on the bow */
      cyl(B.dark, [2.68, s * 0.42 - 0.07, 0.70], [2.68, s * 0.42 + 0.07, 0.70], 0.06, 0.06, 8);
      box(B.dark, 2.56, 2.66, s * 0.42 - 0.05, s * 0.42 + 0.05, 0.64, 0.76);
      /* --- the propeller shrouds at the rear corners, a ring with the hub and blades
         inside, on a mount from the hull (P1, P3) --- */
      var py = s * 0.80, pz = 1.17;
      cyl(B.dark, [TAIL - 0.05, py, pz], [TAIL + 0.25, py, pz], 0.22, 0.22, 16);
      cyl(B.paint, [TAIL - 0.07, py, pz], [TAIL - 0.04, py, pz], 0.235, 0.235, 16);
      cyl(B.dark, [TAIL - 0.08, py, pz], [TAIL - 0.07, py, pz], 0.08, 0.06, 8);
      box(B.paint, TAIL + 0.05, TAIL + 0.32, py - 0.05, py + 0.05, pz + 0.18, UNZ + 0.02);
      cyl(B.dark, [TAIL + 0.10, py, 0.88], [TAIL + 0.10, py, 0.98], 0.06, 0.06, 8);
    }
    /* --- the glacis (P1, P2, P3): two windscreens with frames, the armoured flaps raised up
       from their top edge --- */
    [-0.47, 0.47].forEach(function (wy) {
      slab(B.paint, gp(0.52, wy, 0.022), GU, [0, 1, 0], GN, 0.36, 0.42, 0.016);
      B.vc.col = GLASS;
      slab(B.vc, gp(0.52, wy, 0.050), GU, [0, 1, 0], GN, 0.30, 0.36, 0.006);
      var phi = 100 * Math.PI / 180, d = [Math.cos(phi) * GU[0] + Math.sin(phi) * GN[0], 0, Math.cos(phi) * GU[2] + Math.sin(phi) * GN[2]];
      var h = gp(0.14, wy, 0.03), nf = [d[2], 0, -d[0]];
      slab(B.paint, [h[0] + d[0] * 0.34, wy, h[2] + d[2] * 0.34], d, [0, 1, 0], nf, 0.34, 0.40, 0.018);
      box(B.dark, h[0] - 0.04, h[0] + 0.04, wy - 0.36, wy + 0.36, h[2] - 0.03, h[2] + 0.03);
      /* the wiper */
      slab(B.dark, gp(0.80, wy, 0.058), GU, [0, 1, 0], GN, 0.012, 0.22, 0.008);
    });
    /* the trim vane folded flat on the nose deck, its hinge bar at the lip (P1, P2) */
    var da = Math.atan2(GZ1 - 1.53, NOSE - GX1), du = [Math.cos(da), 0, -Math.sin(da)], dn = [Math.sin(da), 0, Math.cos(da)];
    slab(B.paint, [2.86, 0, GZ1 - (2.86 - GX1) * Math.tan(da) + 0.035], du, [0, 1, 0], dn, 0.38, 0.92, 0.025);
    for (i = -1; i <= 1; i++) slab(B.dark, [2.86, i * 0.55, GZ1 - (2.86 - GX1) * Math.tan(da) + 0.065], du, [0, 1, 0], dn, 0.34, 0.03, 0.012);
    box(B.dark, NOSE - 0.10, NOSE + 0.02, -0.95, 0.95, 1.46, 1.52);
    /* --- roof: the driver's and commander's round hatches over the cab (P1, P4); the
       engine louvres; the turret ring; the two troop hatches aft; antennae; team strip --- */
    [-0.52, 0.52].forEach(function (hy) {
      cylZ(B.paint, 1.18, hy, ROOF, ROOF + 0.05, 0.30, 16);
      cylZ(B.paint, 1.18, hy, ROOF + 0.05, ROOF + 0.08, 0.26, 16);
      box(B.dark, 0.84, 0.92, hy - 0.10, hy + 0.10, ROOF, ROOF + 0.07);
      for (var p = -1; p <= 1; p++) box(B.dark, 1.46, 1.52, hy + p * 0.12 - 0.04, hy + p * 0.12 + 0.04, ROOF, ROOF + 0.07);
    });
    box(B.paint, 0.22, 0.86, -0.92, -0.30, ROOF, ROOF + 0.03);
    for (i = 0; i < 7; i++) box(B.dark, 0.27 + i * 0.085, 0.31 + i * 0.085, -0.88, -0.34, ROOF + 0.03, ROOF + 0.045);
    cylZ(B.paint, TX, 0, ROOF, ROOF + 0.05, 0.82, 24);
    [-2.42, -1.70].forEach(function (hx) {
      [-0.45, 0.45].forEach(function (hy) {
        box(B.paint, hx - 0.30, hx + 0.30, hy - 0.30, hy + 0.30, ROOF, ROOF + 0.04);
        box(B.dark, hx - 0.30, hx - 0.26, hy - 0.22, hy + 0.22, ROOF + 0.04, ROOF + 0.07);
      });
    });
    box(B.team, -2.98, -2.80, -0.70, 0.70, ROOF, ROOF + 0.015);
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.dark, -2.90, s * 0.90, ROOF, ROOF + 0.12, 0.05, 8);
      box(B.dark, -2.70, -1.30, s * 0.97 - 0.02, s * 0.97 + 0.02, ROOF, ROOF + 0.06);
    }
    cyl(B.dark, [-2.90, 0.90, ROOF + 0.12], [-2.90, 0.90, ROOF + 1.20], 0.012, 0.006, 5);
    /* --- the rear (P1): the sloped upper plate with the door, its hinges and handle, the
       tail lamps --- */
    var ra = Math.atan2(0.21, ROOF - 0.03 - CHZ - 0.04), ru = [Math.sin(ra), 0, Math.cos(ra)], rn = [-Math.cos(ra), 0, Math.sin(ra)];
    function rp(dz, y, off) { var zc = (CHZ + 0.04 + ROOF - 0.03) / 2 + dz; return [TAIL + 0.105 + dz * Math.tan(ra) + rn[0] * off, y, zc + rn[2] * off]; }
    slab(B.paint, rp(0, 0.10, 0.02), ru, [0, 1, 0], rn, 0.25, 0.42, 0.02);
    [-0.14, 0.14].forEach(function (dz) { slab(B.dark, rp(dz, 0.50, 0.04), ru, [0, 1, 0], rn, 0.05, 0.05, 0.02); });
    slab(B.dark, rp(0, -0.22, 0.05), ru, [0, 1, 0], rn, 0.08, 0.02, 0.02);
    for (s = -1; s <= 1; s += 2) {
      B.vc.col = RED;
      box(B.vc, TAIL - 0.01, TAIL + 0.04, s * 1.08 - 0.06, s * 1.08 + 0.06, CHZ - 0.02, CHZ + 0.05);
    }
  }

  /* -------------------------------------------- wheel: one per side of an axle */
  /* tyre (P1): a big radial off-road tyre with a chunky lug tread; the painted ten-nut rim,
     the hub and its cap */
  var TYRE = [0.13, 0.135, 0.125], LUG = [0.11, 0.115, 0.105], NUT = [0.20, 0.21, 0.18];
  function addAxle(W) {
    var s, y, i, a, ca, sa, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var RIM = [rr * 1.1, gg * 1.1, bb * 1.1], HUB = [rr * 1.25, gg * 1.25, bb * 1.25];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - TH, y + TH, 0, RT, 26);
      /* the sidewall rounding into the tread */
      cyl(W, [0, y + s * TH, 0], [0, y + s * (TH + 0.025), 0], RT - 0.03, RT - 0.12, 26);
      W.col = LUG;
      for (i = 0; i < 26; i++) {
        a = i / 26 * TAU; ca = Math.cos(a); sa = Math.sin(a);
        var off = (i % 2 ? 0.07 : -0.07);
        slab(W, [ca * (RT + 0.012), y + off, sa * (RT + 0.012)], [ca, 0, sa], [-sa, 0, ca], [0, 1, 0], 0.026, 0.045, 0.11);
      }
      W.col = RIM;
      cyl(W, [0, y + s * (TH - 0.01), 0], [0, y + s * (TH + 0.035), 0], 0.33, 0.31, 20);
      W.col = HUB;
      cyl(W, [0, y + s * (TH + 0.03), 0], [0, y + s * (TH + 0.055), 0], 0.18, 0.15, 14);
      W.col = NUT;
      for (i = 0; i < 10; i++) {
        a = i / 10 * TAU;
        cylY(W, Math.cos(a) * 0.115, y + s * (TH + 0.05), y + s * (TH + 0.065), Math.sin(a) * 0.115, 0.018, 6);
      }
      W.col = RED;
      cylY(W, 0, y + s * (TH + 0.05), y + s * (TH + 0.075), 0, 0.05, 10);
    }
  }

  /* ------------------------------------- the ZPT-90 one-man turret (NOT CONFIRMED) */
  /* origin on the ring at the roof, gun along +X: a low faceted turret, the 25 mm gun in a
     narrow mantlet with the 7.62 mm coax beside it, the gunner's sight block forward on the
     roof, the hatch, two banks of four smoke dischargers on the cheeks (published) */
  var TZ0 = 0.05, TZ1 = 0.48, GZ = 0.27;
  function tring(x0, x1, w, z) {
    return [[x0, -w * 0.75, z], [x0, w * 0.75, z], [x0 + 0.20, w, z], [x1 - 0.22, w, z], [x1, w * 0.55, z], [x1, -w * 0.55, z], [x1 - 0.22, -w, z], [x0 + 0.20, -w, z]];
  }
  function addTurret(B) {
    var s, i, k;
    /* the body: a loft from the wide waist up to the smaller roof; the front lean shallower */
    loftN(B.paint, [tring(-0.80, 0.70, 0.70, TZ0), tring(-0.82, 0.76, 0.74, TZ0 + 0.16), tring(-0.70, 0.40, 0.56, TZ1)]);
    /* the mantlet, the gun's jacket and barrel, the flash hider (published 25 mm) */
    box(B.paint, 0.62, 0.86, -0.20, 0.20, GZ - 0.14, GZ + 0.12);
    cyl(B.dark, [0.86, -0.02, GZ], [1.40, -0.02, GZ], 0.060, 0.050, 12);
    cyl(B.dark, [1.40, -0.02, GZ], [2.82, -0.02, GZ], 0.030, 0.028, 10);
    cyl(B.dark, [2.70, -0.02, GZ], [2.92, -0.02, GZ], 0.045, 0.045, 10);
    cyl(B.dark, [0.84, 0.15, GZ - 0.04], [1.02, 0.15, GZ - 0.04], 0.022, 0.022, 8);
    /* the sight block forward on the roof, its glass; the hatch aft; the vision blocks */
    box(B.paint, 0.05, 0.36, -0.42, -0.18, TZ1, TZ1 + 0.16);
    B.vc.col = GLASS;
    box(B.vc, 0.36, 0.38, -0.40, -0.20, TZ1 + 0.05, TZ1 + 0.13);
    cylZ(B.paint, -0.28, 0.18, TZ1, TZ1 + 0.06, 0.29, 16);
    box(B.dark, -0.58, -0.52, 0.06, 0.30, TZ1, TZ1 + 0.07);
    for (i = -1; i <= 1; i++) box(B.dark, 0.02, 0.10, 0.20 + i * 0.12 - 0.04, 0.20 + i * 0.12 + 0.04, TZ1, TZ1 + 0.06);
    cylZ(B.dark, -0.55, -0.40, TZ1, TZ1 + 0.10, 0.04, 8);
    for (s = -1; s <= 1; s += 2) {
      /* two banks of four smoke dischargers on each cheek, raked forward and out */
      for (k = 0; k < 4; k++) {
        var zc = 0.20 + (k % 2) * 0.12, xc = 0.38 - Math.floor(k / 2) * 0.13, yc = s * 0.70;
        cyl(B.dark, [xc - 0.06, yc - s * 0.04, zc - 0.03], [xc + 0.10, yc + s * 0.08, zc + 0.08], 0.042, 0.042, 8);
      }
      box(B.dark, 0.20, 0.46, s > 0 ? 0.62 : -0.70, s > 0 ? 0.70 : -0.62, 0.12, 0.16);
      /* team colour, a strip on each flank of the turret */
      box(B.team, -0.62, -0.20, s > 0 ? 0.735 : -0.75, s > 0 ? 0.75 : -0.735, TZ0 + 0.09, TZ0 + 0.17);
    }
    /* the stowage box on the turret bustle */
    box(B.paint, -0.98, -0.80, -0.45, 0.45, TZ0 + 0.06, TZ0 + 0.30);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, WB, tg;
    addHull(HB);
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
    tg.position.set(TX, 0, ROOF);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build };
})();

/* len: the measured X extent of the build */
UNIT_MODELS["pla_e90_ifv"] = { len: 6.72, build: HeroWz551.build };
UNIT_MODELS["pla_e90_recon"] = { len: 6.72, build: HeroWz551.build };
