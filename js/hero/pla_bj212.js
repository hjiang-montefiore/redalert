/* ========== pla_bj212.js - HERO model: Beijing BJ212 4x4 light utility / command car ==========
   pla_e60_recon   "Beijing BJ212 command car; Type 62 in the armoured recce role", in service
                   1965.  This file draws the BJ212 only.

   Which version: the early (1965 pattern) BJ212 with its canvas soft top UP over the four
   doors, in plain PLA green: the body, front and wheels of the PLA vehicle in P1 and the
   1966 parade car in P8 (both with the top off), the soft top as P6 (a museum car of the
   same pattern with its top up) and P3 show it.  Not the 1980s and later BJ2020 / BAW212
   with the hard top, flared arches and plastic front.

   The "turret" (the row has turret:true): NO reference shows a PLA BJ212 with a pintle
   machine gun (P1, the one armed PLA car found, carries a recoilless rifle on a pedestal in
   the open body, which needs the top off), so no MG is drawn.  The trained node is the one
   fitting the soft-top museum cars both show: the whip aerial standing on the right-hand end
   of the front bumper (P2, P6), its base, spring and whip.  It turns in azimuth with no
   visible effect; the radio set behind it is not drawn (not seen).

   References, Wikimedia Commons, cached in scratchpad/q_pla_e60_recon_ref:
     P1  "Chinese military offroad vehicle.jpg" (1280) - a BJ212 in PLA green, front left 3/4,
         top and door tops off, in a museum hall among PLA missiles and a MiG, a recoilless
         rifle on it: the wide rounded bonnet with its TWO round vent caps, the flat front
         face, the round headlamps low in it with the slotted grille between, the amber lamps
         at the face's outer corners, the flat body side with the rear arch's lip, the
         upright windscreen frame.  The rifle and its mount are not drawn.
     P2  "Beijing BJ212 front-right 2016 Beijing Auto Museum.jpg" (960) - an early BJ212,
         front right 3/4, top off: two doors a side with flat panels and handles, the band of
         vertical slots under the bonnet's lip above three horizontal slots, the heavy
         channel bumper with the tow hooks, the mirrors on arms at the windscreen frame's
         lower corners, the single flat pane, the black pressed-steel wheels, the whip aerial
         rising from the bumper's right end.  Heights scaled from the near tyre (247 px for
         0.75 m): the fender edge over the front wheel 0.86 m, the beltline about 1.2 m, the
         windscreen frame's top about 1.80 m (through the perspective).
     P3  "Beijing BJ 212.jpg" (960) - a civil BJ212 with its soft top up, front right: the
         canvas roof level with the windscreen header, the canvas sides over the doors with
         their windows, the rear of the top falling to the tail.
     P4  "Ex-Bangladesh Army Beijing BJ212. (36306361896).jpg" (1280) - an ex-army BJ212
         (repainted), front left: the bonnet's two vent caps and side catches, the squared
         rear arch with its lip, the bumper's tow hooks.
     P5  "BJ212 in China Industrial Museum.JPG" (960) - head on: THE FRONT MEASURING PHOTO.
         Scaled to the published 1.75 m width over the front face (423 px, 242 px/m):
         headlamp centres 0.79 m apart at 0.79 m up, the amber lamps 1.46 m apart at 0.92 m,
         the slot band 0.70 m wide under the bonnet lip (1.01 m), the three slots 0.50 m
         wide, the bumper 0.27-0.54 m.
     P6  "Beijing BJ212 (23110313053).jpg" (1280) - a museum BJ212 in green with the soft top
         up, front right: the canvas top's box shape over the doors, the side curtains, the
         same front, the whip aerial on the bumper's right end.
     P7  "Beijing BJ212 image01.jpg" (1280) - a current BAW hard-top from behind: the tail
         lamps at the rear panel's upper corners, the spare wheel carried on the rear right
         of centre.  Used for the rear only (no photograph of an early car's rear was found).
     P8  "Mao19661017.jpg" (960) - a BJ212 at the 1966 Tiananmen review, top off, screen
         folded: the 1960s car in service, the same front and wheels as P1, P2.
   Published: en.wikipedia "BAW BJ212": BJ212E (1982) 3,860 x 1,750 x 1,910 mm, wheelbase
   2,300 mm, 1,520 kg empty; "the chassis, axles, and suspension come from the GAZ-69".
   en/ru.wikipedia "GAZ-69": track 1,440 mm front and rear, tyres 6.50-16 (taken for the
   BJ212's GAZ-69 axles: a 0.75 m tyre).

   Recognition list (what makes it read at game zoom, and its source):
     1. the short boxy jeep on four tall narrow tyres - P1, P2, P6
     2. the flat front face: two round headlamps low, the slotted grille between them, the
        band of slots under the bonnet lip, the heavy bumper - P2, P5
     3. the wide, round-shouldered bonnet with its two vent caps - P1, P4
     4. the upright flat windscreen in its frame, mirrors on arms - P2, P5
     5. the canvas top as a plain box over four doors, with the side-curtain windows - P3, P6
     6. the whip aerial on the bumper - P2, P6
   Paint: plain PLA green as the other PLA heroes (#525c3a); the canvas a darker olive (P6).
   No stars, plates, numbers or emblems (P5, P6 carry museum plates; P7 a star: not drawn).
   Scale: the published 3.86 m over the bumper and spare wheel, 1.75 m over the body, 1.91 m
   to the roof's crown, the 2.30 m wheelbase.
   NOT CONFIRMED, judgement calls: the axle positions along the body (front overhang 0.80 m
   to the bumper, 0.65 m to the front face; no side-on photograph or drawing was found, so
   the overhangs are judged from the 3/4 views); the heights not listed under P2 / P5 (sill
   0.48 m, shoulder crease 0.98 m, bonnet crown 1.06-1.18 m); the door seams' positions; the
   arches' extents; the soft top's details (its windows, the rear fall from 1.89 to 1.62 m,
   the rear window); the rear (the tail lamps and spare wheel from the modern P7, the rear
   bumperettes); the chassis parts under the body (rails, springs, differentials, the
   exhaust, all drawn as plain blocks); the aerial's length (1.1 m over the bumper, from P6).
   Materials: PAINT (canvas texture), DARK, WHEEL (vertex colours: tyres, rims, glass, lamps
   and the canvas top), team colour (C.team): a strip across the roof's rear, one on the
   tail, the aerial's tip.
   Nodes: "turret" (the bumper aerial; origin on its base) and two "roadwheel" axle groups
   (both wheels of an axle; origin on the axle centre, axle along Y).
   Measured: 3.85 m long over the bumper and spare wheel, 1.75 m over the body (2.09 m over
   the mirrors), 1.93 m to the canvas roof's bow ridges (1.91 m at the crown).
   Model space: +X nose, +Y left, +Z up, metres, tyres on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBj212 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var PAINT = { base: "#525c3a", blots: ["#485232", "#5c6642"], seed: 212 };
  /* running gear: wheelbase 2.30 m (published); track 1.44 m and 6.50-16 tyres (published
     for the GAZ-69, whose chassis and axles the BJ212 uses) -> tyre 0.75 m over the tread */
  var XA = [1.13, -1.17], RT = 0.375, ZW = 0.375, TY = 0.72, TH = 0.085;
  /* body: the flat front face, the bumper's front, the rear panel, the spare wheel's face;
     half width over the body (published 1.75 m); heights: sill, fender line (the arches'
     tops), beltline, the bonnet at the nose and at the cowl */
  var NOSE = 1.78, BUMP = 1.93, TAIL = -1.68, SPX = -1.91, BW = 0.875;
  var SILL = 0.48, FZ = 0.86, BELT = 1.15, BNZ = 1.06, COWL = 1.18;
  /* the wheel openings: front (under the fender) and rear (cut in the tub side) */
  var FA0 = 0.61, FA1 = 1.65, RA0 = -1.62, RA1 = -0.72;
  /* the doors' edges: front door's leading edge, the B pillar, the rear door's trailing edge */
  var DX0 = 0.27, DXM = -0.52, DX1 = -1.04;
  /* the windscreen: foot at the cowl, top of the frame, half width */
  var WX0 = 0.30, WX1 = 0.22, WZ1 = 1.86, WW = 0.80;
  /* the soft top: roof (1.91 m at the crown, published height), where the rear starts to
     fall, the rear's top at the tail */
  var ROOF = 1.89, TX2 = -1.45, TZR = 1.62;
  /* the aerial's base on the bumper's right end (the "turret") */
  var AX = 1.88, AY = -0.70, AZ = 0.50;

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
  var CANVAS = [0.25, 0.27, 0.19], CANV2 = [0.20, 0.22, 0.15];
  /* an eight-point ring with chamfered corners: half width w, from zb to zt, chamfer c (top
     corners) and cb (bottom corners) */
  function ring8(x, w, zb, zt, c, cb) {
    cb = cb === undefined ? c : cb;
    return [[x, -w + cb, zb], [x, w - cb, zb], [x, w, zb + cb], [x, w, zt - c],
            [x, w - c, zt], [x, -w + c, zt], [x, -w, zt - c], [x, -w, zb + cb]];
  }
  /* the soft top's ring: half width wb at zb, wt at zt, the roof's crown cr at the centre */
  function topRing(x, wb, zb, wt, zt, cr) {
    return [[x, -wb, zb], [x, wb, zb], [x, wt, zt - 0.03], [x, wt * 0.55, zt], [x, 0, zt + cr], [x, -wt * 0.55, zt], [x, -wt, zt - 0.03]];
  }
  /* the bonnet's crown height along x (P2, P5): 1.06 m at the nose to 1.18 m at the cowl */
  function bonZ(x) { return COWL + (BNZ - COWL) * (x - WX0) / (NOSE - WX0); }
  /* the windscreen plane (P2, P6): point at fraction t up from its foot, y, offset out of it */
  var WL = Math.sqrt((WX0 - WX1) * (WX0 - WX1) + (WZ1 - COWL) * (WZ1 - COWL));
  var WU = [(WX1 - WX0) / WL, 0, (WZ1 - COWL) / WL], WN = [(WZ1 - COWL) / WL, 0, (WX0 - WX1) / WL];
  function wp(t, y, off) { return [WX0 + WU[0] * WL * t + WN[0] * off, y, COWL + WU[2] * WL * t + WN[2] * off]; }

  function addBody(B) {
    var s, i, a, x, ys;
    /* --- the frame rails, the beam axles with their differentials, the fuel tank and the
       exhaust under the body (P1, P2: the GAZ-69 chassis) --- */
    box(B.dark, TAIL + 0.04, NOSE + 0.02, -0.46, -0.36, 0.40, 0.50);
    box(B.dark, TAIL + 0.04, NOSE + 0.02, 0.36, 0.46, 0.40, 0.50);
    for (i = 0; i < XA.length; i++) {
      cylY(B.dark, XA[i], -TY + TH, TY - TH, ZW, 0.045, 8);
      cyl(B.dark, [XA[i] - 0.15, 0.10, ZW], [XA[i] + 0.15, 0.10, ZW], 0.13, 0.10, 10);
      /* the leaf springs along the rails */
      box(B.dark, XA[i] - 0.55, XA[i] + 0.55, 0.36, 0.46, ZW + 0.04, ZW + 0.10);
      box(B.dark, XA[i] - 0.55, XA[i] + 0.55, -0.46, -0.36, ZW + 0.04, ZW + 0.10);
    }
    box(B.dark, -0.70, 0.40, -0.30, 0.30, 0.40, 0.52);
    cyl(B.dark, [-0.90, -0.55, 0.36], [TAIL - 0.04, -0.55, 0.36], 0.035, 0.035, 6);

    /* --- the body shell: the upper band from the tail to the cowl (the tub's sides above the
       arches, closed under the soft top), then the bonnet with its well-rounded shoulders
       falling a little to the flat front face (P1, P2, P5) --- */
    loftN(B.paint, [ring8(TAIL, BW - 0.02, FZ + 0.02, BELT - 0.02, 0.03),
                    ring8(TAIL + 0.03, BW, FZ, BELT, 0.03),
                    ring8(WX0, BW, FZ, BELT, 0.03),
                    ring8(WX0 + 0.04, BW, FZ, COWL - 0.02, 0.16),
                    ring8(NOSE - 0.12, BW, FZ, bonZ(NOSE - 0.12), 0.16),
                    ring8(NOSE - 0.02, BW - 0.02, FZ, BNZ - 0.02, 0.15),
                    ring8(NOSE, BW - 0.06, FZ + 0.02, BNZ - 0.06, 0.12)]);
    /* the shoulder crease along the side at fender height (P2) */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, TAIL + 0.02, NOSE - 0.04, s > 0 ? BW - 0.01 : -BW - 0.012, s > 0 ? BW + 0.012 : -BW + 0.01, 0.975, 0.995);
    }
    /* below the fender line: the sides between the arches down to the sill (the doors' lower
       halves), the tail behind the rear arch, and the front face's lower half ahead of the
       front wheels down to the bumper (P1, P2, P5) */
    loftN(B.paint, [ring8(RA1, BW, SILL, FZ + 0.02, 0.0, 0.05), ring8(FA0, BW, SILL, FZ + 0.02, 0.0, 0.05)]);
    box(B.paint, TAIL, RA0, -BW, BW, SILL + 0.06, FZ + 0.02);
    loftN(B.paint, [ring8(FA1, BW - 0.04, 0.52, FZ + 0.02, 0.0, 0.06), ring8(NOSE, BW - 0.06, 0.52, FZ + 0.04, 0.0, 0.06)]);
    /* the tub's floor under the doors, set in between the wheels */
    box(B.paint, RA0 + 0.02, FA1 - 0.02, -0.66, 0.66, SILL - 0.02, FZ);

    for (s = -1; s <= 1; s += 2) {
      ys = s > 0 ? BW : -BW - 0.012;
      /* --- the dark wheel wells above the tyres --- */
      box(B.dark, FA0, FA1, s > 0 ? 0.52 : -BW + 0.02, s > 0 ? BW - 0.02 : -0.52, FZ - 0.02, FZ + 0.005);
      box(B.dark, RA0, RA1, s > 0 ? 0.52 : -BW + 0.02, s > 0 ? BW - 0.02 : -0.52, FZ - 0.02, FZ + 0.005);
      box(B.dark, FA0 - 0.01, FA0 + 0.02, s > 0 ? 0.52 : -BW + 0.02, s > 0 ? BW - 0.02 : -0.52, SILL, FZ);
      box(B.dark, RA1 - 0.02, RA1 + 0.01, s > 0 ? 0.52 : -BW + 0.02, s > 0 ? BW - 0.02 : -0.52, SILL, FZ);
      /* the rear arch's lip, standing out of the side round the top of the opening (P1, P4) */
      belt(B.paint, RA0 - 0.03, SILL + 0.10, RA0 + 0.10, FZ + 0.03, s > 0 ? BW - 0.03 : -BW - 0.035, s > 0 ? BW + 0.035 : -BW + 0.03, 0.07);
      belt(B.paint, RA0 + 0.10, FZ + 0.03, RA1 - 0.10, FZ + 0.03, s > 0 ? BW - 0.03 : -BW - 0.035, s > 0 ? BW + 0.035 : -BW + 0.03, 0.07);
      belt(B.paint, RA1 - 0.10, FZ + 0.03, RA1 + 0.03, SILL + 0.10, s > 0 ? BW - 0.03 : -BW - 0.035, s > 0 ? BW + 0.035 : -BW + 0.03, 0.07);
      /* the front fender's edge over the wheel, a rolled lip (P2) */
      belt(B.paint, FA0 + 0.02, FZ + 0.02, FA1 - 0.02, FZ + 0.02, s > 0 ? BW - 0.03 : -BW - 0.03, s > 0 ? BW + 0.03 : -BW + 0.03, 0.05);
      /* --- the doors: seams from the sill to the beltline, the hinges at the leading edges,
         the handles (P2: two doors a side, flat panels) --- */
      [DX0, DXM, DX1].forEach(function (dx) {
        box(B.dark, dx - 0.012, dx + 0.012, ys, ys + 0.012, dx < RA1 + 0.02 ? FZ + 0.06 : SILL + 0.03, BELT - 0.01);
      });
      box(B.dark, RA1, DX0, ys, ys + 0.012, SILL + 0.025, SILL + 0.04);
      box(B.dark, DX1, DXM, ys, ys + 0.012, FZ + 0.045, FZ + 0.06);
      [DXM + 0.06, DX1 + 0.06].forEach(function (hx) {
        box(B.dark, hx - 0.10, hx, s > 0 ? BW : -BW - 0.03, s > 0 ? BW + 0.03 : -BW, 1.06, 1.09);
      });
      [DX0 - 0.03, DXM - 0.03].forEach(function (hx) {
        box(B.dark, hx - 0.05, hx, s > 0 ? BW : -BW - 0.025, s > 0 ? BW + 0.025 : -BW, 0.66, 0.74);
        box(B.dark, hx - 0.05, hx, s > 0 ? BW : -BW - 0.025, s > 0 ? BW + 0.025 : -BW, 1.00, 1.08);
      });
      /* --- the front: the round headlamps in the flat face, the amber side lamps at its
         outer corners, the bonnet's side catches (P2, P5) --- */
      var ly = s * 0.39;
      cyl(B.paint, [NOSE - 0.01, ly, 0.79], [NOSE + 0.035, ly, 0.79], 0.125, 0.12, 16);
      B.vc.col = LENS;
      cyl(B.vc, [NOSE + 0.03, ly, 0.79], [NOSE + 0.05, ly, 0.79], 0.095, 0.085, 16);
      B.vc.col = AMBER;
      box(B.vc, NOSE - 0.01, NOSE + 0.03, s * 0.73 - 0.07, s * 0.73 + 0.07, 0.89, 0.95);
      box(B.dark, NOSE - 0.30, NOSE - 0.24, s > 0 ? BW - 0.02 : -BW - 0.03, s > 0 ? BW + 0.03 : -BW + 0.02, 1.00, 1.06);
      /* the bumper's ends and its two tow hooks (P2, P4) */
      box(B.dark, NOSE + 0.04, NOSE + 0.12, s * 0.45 - 0.03, s * 0.45 + 0.03, 0.50, 0.60);
      cyl(B.dark, [NOSE + 0.12, s * 0.45, 0.62], [NOSE + 0.12, s * 0.45, 0.50], 0.03, 0.03, 6);
      /* --- the mirrors on their arms from the windscreen frame's lower corners (P2, P5) --- */
      var mf = wp(0.12, s * (WW + 0.02), 0.02);
      cyl(B.dark, mf, [mf[0] + 0.04, s * (WW + 0.17), 1.52], 0.012, 0.012, 5);
      cyl(B.dark, [mf[0] + 0.02, s * (WW + 0.17), 1.52], [mf[0] - 0.01, s * (WW + 0.17), 1.52], 0.075, 0.075, 10);
      /* --- the rear: tail lamps at the upper corners of the rear panel (P7) --- */
      B.vc.col = RED;
      box(B.vc, TAIL - 0.02, TAIL + 0.01, s * 0.74 - 0.06, s * 0.74 + 0.06, 0.88, 1.02);
      B.vc.col = AMBER;
      box(B.vc, TAIL - 0.02, TAIL + 0.01, s * 0.74 - 0.06, s * 0.74 + 0.06, 1.03, 1.08);
      /* the rear bumperettes on the frame ends */
      box(B.dark, TAIL - 0.08, TAIL + 0.02, s * 0.41 - 0.10, s * 0.41 + 0.10, 0.42, 0.54);
    }
    /* --- the grille: the dark band of vertical slots under the bonnet's lip, and the three
       horizontal slots between the headlamps (P2, P5, P6) --- */
    box(B.dark, NOSE - 0.02, NOSE + 0.005, -0.36, 0.36, 0.93, 0.995);
    for (i = 0; i < 13; i++) box(B.paint, NOSE, NOSE + 0.012, -0.345 + i * 0.0575, -0.335 + i * 0.0575, 0.93, 0.995);
    for (i = 0; i < 3; i++) box(B.dark, NOSE - 0.02, NOSE + 0.005, -0.24, 0.24, 0.65 + i * 0.085, 0.70 + i * 0.085);
    /* the front bumper: a heavy channel across the frame horns (P2, P5, P6) */
    box(B.dark, NOSE + 0.02, NOSE + 0.04, -0.62, 0.62, 0.46, 0.52);
    box(B.dark, NOSE + 0.04, BUMP, -BW, BW, 0.32, 0.50);
    /* --- the bonnet: the two round vent caps (P1, P4) and the hinge line at the cowl --- */
    [-0.30, 0.30].forEach(function (vy) {
      cylZ(B.paint, 0.80, vy, bonZ(0.80) - 0.04, bonZ(0.80) + 0.025, 0.07, 12);
      cylZ(B.dark, 0.80, vy, bonZ(0.80) + 0.02, bonZ(0.80) + 0.03, 0.045, 10);
    });
    box(B.dark, WX0 + 0.05, WX0 + 0.08, -0.70, 0.70, COWL - 0.03, COWL - 0.005);
    /* --- the windscreen: one flat pane in an upright frame, the wipers at its foot (P2, P5,
       P6) --- */
    slab(B.paint, wp(0.5, 0, 0.02), WU, [0, 1, 0], WN, WL / 2, WW, 0.02);
    B.vc.col = GLASS;
    slab(B.vc, wp(0.52, 0, 0.046), WU, [0, 1, 0], WN, WL / 2 - 0.08, WW - 0.06, 0.004);
    [-0.32, 0.32].forEach(function (wy) {
      slab(B.dark, wp(0.18, wy, 0.05), [0, 1, 0], WU, WN, 0.24, 0.010, 0.006);
    });
    /* the panel under the pane with its pressed lip (P2) */
    box(B.paint, WX0 - 0.02, WX0 + 0.04, -0.60, 0.60, COWL - 0.01, COWL + 0.03);

    /* --- the soft top (P3, P6): canvas over its bows from the windscreen header to the tail,
       the sides down to the beltline, the roof slightly crowned, the rear falling a little to
       the tail; the side curtains' windows over the doors, the rear window --- */
    B.vc.col = CANVAS;
    loftN(B.vc, [topRing(TAIL + 0.01, BW - 0.03, BELT - 0.01, BW - 0.08, TZR, 0.01),
                 topRing(TX2, BW - 0.01, BELT - 0.01, BW - 0.05, ROOF, 0.02),
                 topRing(WX1 - 0.04, BW - 0.01, BELT - 0.01, BW - 0.05, ROOF, 0.02),
                 topRing(WX1 - 0.01, BW - 0.03, BELT - 0.01, BW - 0.07, ROOF - 0.02, 0.01)]);
    /* the bows showing through the canvas as ridges, and the straps */
    B.vc.col = CANV2;
    [-0.40, -1.00].forEach(function (bx) {
      box(B.vc, bx - 0.02, bx + 0.02, -BW + 0.04, BW - 0.04, ROOF + 0.005, ROOF + 0.035);
    });
    for (s = -1; s <= 1; s += 2) {
      ys = s * (BW - 0.01);
      /* the windows in the side curtains (dark celluloid), front door, rear door, quarter */
      B.vc.col = GLASS;
      [[0.04, -0.46], [-0.58, -1.00], [-1.12, -1.45]].forEach(function (w) {
        box(B.vc, w[1], w[0], s > 0 ? ys - 0.002 : ys - 0.008, s > 0 ? ys + 0.008 : ys + 0.002, 1.34, 1.72);
      });
      /* the door frames' seams in the canvas */
      B.vc.col = CANV2;
      [DX0 - 0.02, DXM, DX1].forEach(function (dx) {
        box(B.vc, dx - 0.015, dx + 0.015, s > 0 ? ys - 0.004 : ys - 0.012, s > 0 ? ys + 0.012 : ys + 0.004, BELT, ROOF - 0.06);
      });
      box(B.vc, DX1, DX0, s > 0 ? ys - 0.004 : ys - 0.012, s > 0 ? ys + 0.012 : ys + 0.004, BELT + 0.01, BELT + 0.04);
    }
    B.vc.col = GLASS;
    box(B.vc, TAIL - 0.008, TAIL + 0.03, -0.45, 0.45, 1.36, 1.58);
    /* team colour: a strip across the roof's rear and one on the tail */
    box(B.team, TX2 + 0.08, TX2 + 0.20, -0.45, 0.45, ROOF + 0.02, ROOF + 0.035);
    box(B.team, TAIL - 0.012, TAIL + 0.01, 0.30, 0.62, 1.12, 1.15);

    /* --- the spare wheel on its carrier on the rear panel, right of centre (P7) --- */
    B.vc.col = [0.13, 0.135, 0.125];
    cyl(B.vc, [TAIL - 0.02, -0.28, 0.80], [SPX, -0.28, 0.80], RT - 0.01, RT - 0.01, 22);
    B.vc.col = [0.09, 0.09, 0.08];
    cyl(B.vc, [SPX, -0.28, 0.80], [SPX - 0.015, -0.28, 0.80], 0.22, 0.20, 16);
    box(B.dark, TAIL - 0.06, TAIL, -0.50, -0.06, 0.76, 0.84);
  }

  /* -------------------------------------------- wheel: one per side of an axle */
  /* 6.50-16 tyres (GAZ-69 figure) with a block tread on black pressed-steel disc wheels, the
     hub with its nuts (P2, P6) */
  var TYRE = [0.13, 0.135, 0.125], LUG = [0.11, 0.115, 0.105], RIM = [0.09, 0.09, 0.08], HUB = [0.32, 0.30, 0.22];
  function addAxle(W) {
    var s, y, i, a, ca, sa;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - TH, y + TH, 0, RT - 0.012, 22);
      cyl(W, [0, y + s * TH, 0], [0, y + s * (TH + 0.015), 0], RT - 0.035, RT - 0.10, 22);
      W.col = LUG;
      for (i = 0; i < 22; i++) {
        a = i / 22 * TAU; ca = Math.cos(a); sa = Math.sin(a);
        slab(W, [ca * (RT - 0.008), y + (i % 2 ? 0.035 : -0.035), sa * (RT - 0.008)], [ca, 0, sa], [-sa, 0, ca], [0, 1, 0], 0.016, 0.03, 0.05);
      }
      W.col = RIM;
      cyl(W, [0, y + s * (TH - 0.01), 0], [0, y + s * (TH + 0.012), 0], 0.205, 0.19, 18);
      cyl(W, [0, y + s * (TH + 0.012), 0], [0, y + s * (TH + 0.03), 0], 0.12, 0.10, 12);
      W.col = HUB;
      cyl(W, [0, y + s * (TH + 0.03), 0], [0, y + s * (TH + 0.07), 0], 0.06, 0.045, 10);
      for (i = 0; i < 6; i++) {
        a = i / 6 * TAU;
        cylY(W, Math.cos(a) * 0.085, y + s * (TH + 0.03), y + s * (TH + 0.045), Math.sin(a) * 0.085, 0.014, 6);
      }
    }
  }

  /* ------------------------------ the "turret": the whip aerial on the bumper */
  /* origin on the aerial's base at the right end of the front bumper (P2, P6): the base, the
     spring and the whip with its tip; it trains in azimuth with no visible effect */
  function addTurret(B) {
    cylZ(B.dark, 0, 0, -0.06, 0.04, 0.035, 8);
    cyl(B.dark, [0, 0, 0.04], [0, 0, 0.16], 0.022, 0.022, 8);
    cyl(B.dark, [0, 0, 0.16], [-0.03, 0, 1.08], 0.010, 0.006, 5);
    cyl(B.team, [-0.03, 0, 1.02], [-0.033, 0, 1.10], 0.012, 0.012, 6);
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
    tg.position.set(AX, AY, AZ);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build };
})();

/* len: the measured X extent of the build */
UNIT_MODELS["pla_e60_recon"] = { len: 3.86, build: HeroBj212.build };
