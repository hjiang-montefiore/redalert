/* ========== held_kpa_armour.js - HERO models: the North Korean armour rows held for want of a reference ==========
   ROW              VEHICLE (js/eras.js full name)                HOW
   kpa_e90_spaag    M1992 self-propelled twin 30 mm AA gun        REUSED HeroZsu.build(..., "Z23") (js/hero/ru_zsu.js:
                                                                  the ZSU-23-4 hull, six wheel groups, track, idler,
                                                                  sprocket, silencer); its Shilka "turret" group is
                                                                  taken off the returned group and replaced by the
                                                                  M1992's (turretM1992(), below).  ru_zsu.js is not
                                                                  edited; its build() gives no hull-only option, so
                                                                  the swap is done on the group it returns.
   HELD (registration commented out at the foot, AGENT_POLICY rule 1) - see the foot for the searches:
   kpa_e00_heavy, hvy_k                     Songun-915        no photograph or drawing found
   kpa_e00_recon, kpa_e90_recon, recon_k    M-1992 armoured car  no photograph or drawing found
   radarv_k                                 M-1992 radar vehicle no source describes it at all
   kpa_e00_spaag, kpa_e80_spaag, spaag_k    M-1989 twin 37 mm  no photograph or drawing found

   REFERENCE (viewed as a reference only; not copied into the repo; cached in
   scratchpad/held_arm/odin/m1992spaag.jpg):
     R1  ODIN WEG card "M1992 North Korean 30mm Self-Propelled Anti-Aircraft Gun"
         (odin.t2com.army.mil, DotCMS WegCard 0cae609fc238a2bbadade3c8a4cf7a91), image
         "M199230mmSp(A).jpg", 600 x 415 - the image is credited on the card to a reddit post
         (r/wargame "north_korean_spaags_hopes_for_the_future"): NOT a US-government work, its
         maker unknown.  A Pyongyang parade column seen almost head-on, the leading vehicle
         filling the middle of the frame: a Shilka-type hull with its glacis and the two front
         track runs, a turret built of TWO TALL BOXES either side of a dark central gap (the
         gun embrasure, the barrels seen end-on in it), a round radar reflector with a WHITE
         face standing high over the turret rear on a single dark column, the reflector's
         centre a little left of the vehicle's centre line.  Grainy, a magazine scan, crew and
         a flag on the turret.
     Card figures (R1): based on the ZSU-23-4 chassis; first observed 1992; hull 6.5 m, width
         3.1 m, height 3.6 m, 20 t, crew 4, V-6P1 diesel 280 hp, 450 km, 50 km/h, not
         amphibious; 2 x 30 mm, -5 to +85 deg, 1600 rpm, 3 km slant range; computerised FCS
         and fire-control radar "from the ZSU-23-4"; NBC protection.
     ja.wikipedia "M-1989 (taikuu jisouhou, the ja article on the M-1989 SPAAG)" (Mitzer & Oliemans 2021): the guns are the naval AK-230
         twin 30 mm, the radar close to the MR-104 "Drum Tilt"; the hull the ZSU-23-4's GM-575.

   MEASURED off R1 at ONE station (the front), scaled from the card's 3.1 m width taken over the
   two track runs at the hull front (1090 px in a 3x enlargement = 352 px/m); perspective NOT
   corrected (the turret stands about 2-3 m behind the hull front, so every turret figure below
   reads small by perhaps 5-10 %, drawn as measured):
     turret over both boxes   865 px = 2.46 m  (drawn 2.46)
     each box                 1.16 m left / 0.82 m right (the right one half hidden by a man):
                              mean 0.99 m (drawn 1.00)
     gap between the boxes    160 px = 0.45 m  (drawn 0.46)
     box face height          240 px = 0.68 m  (drawn 0.68, on a 0.14 m base band over the deck)
     reflector diameter       300 px = 0.85 m  (drawn 0.86)
     reflector centre         0.14 m left of the centre line (drawn 0.14)
   Height: the reflector top drawn at 3.60 m (the card's 3.6 m; the Shilka's RPK-2 top stands at
   3.59 m in ru_zsu.js, so the same column height); the box tops at 2.58 m (1.76 m deck + 0.14 +
   0.68).  Overall length follows the Shilka hull plus the barrels (see len at the foot).

   Recognition list:
     1. the Shilka hull, six wheels, rear sprocket (card: "based on the ZSU-23-4 chassis") - HeroZsu
     2. the two tall slab boxes making the turret front, with the dark gap between them - R1
     3. the twin 30 mm barrels in the gap - R1 (end-on), card, ja.wikipedia (AK-230)
     4. the big round reflector with its white face, high on a single column over the rear - R1
   Paint: the hull keeps ru_zsu.js's Shilka green (#535a3f, canvas texture with panel lines and
   grime); the turret uses the SAME material objects taken from the hull, so it matches.  The
   reflector face is drawn off-white as R1 shows it.  No numbers, stars or flags.

   NOT CONFIRMED (R1 is one front view; say so plainly):
     - the whole side profile: the turret's length (drawn -1.55 to +1.55 m about the ring, the
       Shilka turret's span), the boxes' depth and their top chamfer, the roof line, the
       bustle under the column - none of it seen;
     - the barrels: the AK-230's tubes, drawn 1.75 m out of the embrasure, 0.30 m apart, side by
       side (R1 shows two dark muzzles side by side at its resolution; length is judgement);
       the guns drawn at 10 deg like the Shilka (the engine trains in azimuth only);
     - the reflector's depth and back, the column's place fore and aft (drawn at x = -1.05,
       the RPK-2's place), the yoke;
     - the roof hatches, periscopes, grab handles, box latches and hinges, lifting eyes, the
       whip aerial, the rear stowage rack: the ordinary fittings of a turret of this kind
       (rule 10), not seen in R1;
     - the Shilka hull's own fittings (lamp box, driver's hatch, silencer, hull-side plates)
       are the ZSU-23-4's, not seen on an M1992.
   ENGINE (js/damage3d.js, not edited): role default "rear" - right for the Shilka hull (engine
   at the rear).
   Materials: the hull's PAINT, DARK, GLASS, C.team (taken from the meshes HeroZsu returns) and a
   LIGHT one for the reflector face.  Nodes: "turret" (origin on the ring centre at the
   Shilka's x = 0, z = 0; guns along +X), the six "roadwheel" groups from HeroZsu.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.
   Load order: after js/hero/ru_zsu.js (HeroZsu). */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroHeldKpaArmour = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  /* ------------------------------------------------- a small geometry kit (after ru_zsu.js) */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  function Bin(mat, uv) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var cr = cross(sub(b, a), sub(c, a));
    if (dot(cr, cr) < 1e-12) return;
    var f = unit(cr), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.30, q[1] * 0.30);
        else if (ay >= ax) this.U.push(q[0] * 0.30, q[2] * 0.30);
        else this.U.push(q[1] * 0.30, q[2] * 0.30);
      }
    }
  };
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
    var t;
    if (y0 > y1) { t = y0; y0 = y1; y1 = t; }
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1) {
    function pt(u, w, h) {
      return [P0[0] + U[0] * u + W[0] * w + N[0] * h, P0[1] + U[1] * u + W[1] * w + N[1] * h,
              P0[2] + U[2] * u + W[2] * w + N[2] * h];
    }
    hexa(bin, [pt(u0, w0, h0), pt(u1, w0, h0), pt(u1, w1, h0), pt(u0, w1, h0),
               pt(u0, w0, h1), pt(u1, w0, h1), pt(u1, w1, h1), pt(u0, w1, h1)]);
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
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, Math.min(y0, y1), z], [x, Math.max(y0, y1), z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function tube(bin, P, d, a, b, r0, r1, seg) {
    cyl(bin, [P[0] + d[0] * a, P[1] + d[1] * a, P[2] + d[2] * a], [P[0] + d[0] * b, P[1] + d[1] * b, P[2] + d[2] * b], r0, r1, seg);
  }
  /* a prism from an (x, z) outline, y0..y1 */
  function prism(bin, pts, y0, y1) {
    var n = pts.length, V = [], F = [], i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]]);
    for (i = 0; i < n; i++) V.push([pts[i][0], y1, pts[i][1]]);
    for (i = 1; i < n - 1; i++) { F.push([0, i, i + 1]); F.push([n, n + i + 1, n + i]); }
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([i, n + j, j], [i, n + i, n + j]); }
    solid(bin, V, F);
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

  /* the hull's materials, picked off the meshes HeroZsu returns by their signatures
     (ru_zsu.js materials(): paint 0.88/0.06, dark 0x232527, glass 0x1b2833, team the rest) */
  function hullMaterials(g) {
    var M = {};
    g.traverse(function (o) {
      if (!o.isMesh || !o.material || o.material.vertexColors) return;
      var m = o.material, hex = m.color ? m.color.getHex() : -1;
      if (hex === 0x232527) M.dark = M.dark || m;
      else if (hex === 0x1b2833) M.glass = M.glass || m;
      else if (m.map || (m.roughness === 0.88 && m.metalness === 0.06)) M.paint = M.paint || m;
      else M.team = M.team || m;
    });
    return M;
  }

  /* ------------------------------------------------- the M1992 turret */
  var DK = 1.76;                     /* the Shilka deck (ru_zsu.js S.DECK) */
  var Z0 = DK + 0.14, Z1 = Z0 + 0.68; /* box base and top (R1: 0.14 band, 0.68 face) */
  var YI = 0.23, YO = 1.23;          /* box inner and outer faces (R1: gap 0.46, over all 2.46) */
  var XF = 1.55, XB = -0.60;         /* box front (judgement) and back (NOT CONFIRMED) */
  var EL = 10;

  function turretM1992(B) {
    var P = B.paint, D = B.dark, G = B.glass, T = B.team, L = B.light, s, i, k, x, y;
    /* the ring band with its bolt heads, the low body between deck and boxes */
    cylZ(P, 0, 0, DK - 0.01, DK + 0.06, 1.28, 36);
    for (i = 0; i < 24; i++) { var ab = i / 24 * TAU; cylZ(D, Math.cos(ab) * 1.29, Math.sin(ab) * 1.29, DK + 0.02, DK + 0.045, 0.02, 5); }
    prism(P, [[-1.55, DK + 0.05], [1.40, DK + 0.05], [1.50, Z0], [1.30, Z0 + 0.36], [-1.35, Z0 + 0.36], [-1.55, Z0 + 0.20]], -1.15, 1.15);
    /* the two tall boxes (R1), a chamfer along the front top edge, a panel seam, lid hinges,
       latches and a grab handle on each outer face */
    for (s = -1; s <= 1; s += 2) {
      var ya = s * YI, yb = s * YO;
      prism(P, [[XB, Z0], [XF, Z0], [XF, Z1 - 0.12], [XF - 0.14, Z1], [XB, Z1]], ya, yb);
      box(D, XF - 0.005, XF + 0.005, ya + s * 0.08, yb - s * 0.08, Z0 + 0.30, Z0 + 0.31);
      box(D, XB + 0.40, XB + 0.41, ya, yb, Z1, Z1 + 0.008);
      for (k = 0; k < 3; k++) cylY(D, XB + 0.10, ya + s * (0.15 + k * 0.33), ya + s * (0.27 + k * 0.33), Z1 + 0.02, 0.025, 8);
      for (k = 0; k < 2; k++) box(D, XF + 0.003, XF + 0.03, ya + s * (0.25 + k * 0.50) - 0.04, ya + s * (0.25 + k * 0.50) + 0.04, Z0 + 0.10, Z0 + 0.17);
      var yo = yb + s * 0.01;
      cyl(P, [0.20, yo, Z0 + 0.48], [0.20, yo + s * 0.06, Z0 + 0.48], 0.018, 0.018, 6);
      cyl(P, [0.80, yo, Z0 + 0.48], [0.80, yo + s * 0.06, Z0 + 0.48], 0.018, 0.018, 6);
      cyl(P, [0.20, yo + s * 0.06, Z0 + 0.48], [0.80, yo + s * 0.06, Z0 + 0.48], 0.018, 0.018, 6);
      /* lifting eyes at the box corners */
      cylY(D, XF - 0.30, yb - s * 0.10 - 0.015, yb - s * 0.10 + 0.015, Z1 + 0.04, 0.04, 8);
      cylY(D, XB + 0.20, yb - s * 0.10 - 0.015, yb - s * 0.10 + 0.015, Z1 + 0.04, 0.04, 8);
      /* the team strip along each box's outer top */
      box(T, XB + 0.55, XF - 0.30, yb - s * 0.12, yb - s * 0.02, Z1, Z1 + 0.012);
    }
    /* the dark embrasure between the boxes, the gun cradle and the twin 30 mm tubes, side by
       side 0.30 m apart (R1: two dark muzzles end-on; NOT CONFIRMED length) */
    box(D, 0.70, XF - 0.05, -YI, YI, Z0, Z1 - 0.05);
    var e = EL * Math.PI / 180, d = [Math.cos(e), 0, Math.sin(e)], up = [-Math.sin(e), 0, Math.cos(e)], Pt;
    planeBox(D, [1.20, 0, Z0 + 0.32], d, [0, 1, 0], up, -0.30, 0.45, -0.21, 0.21, -0.12, 0.12);
    for (s = -1; s <= 1; s += 2) {
      Pt = [1.20, s * 0.15, Z0 + 0.32];
      tube(P, Pt, d, 0.30, 0.75, 0.075, 0.070, 12);
      tube(D, Pt, d, 0.75, 2.10, 0.036, 0.036, 10);
      tube(D, Pt, d, 2.10, 2.22, 0.050, 0.046, 10);
      tube(D, Pt, d, 1.20, 1.26, 0.050, 0.050, 10);
    }
    planeBox(D, [1.20, 0, Z0 + 0.32], d, [0, 1, 0], up, 1.40, 1.46, -0.19, 0.19, -0.03, 0.03);
    /* the roof between and behind the boxes: commander's hatch left, gunner's right,
       periscope heads */
    var RZ = Z0 + 0.36;
    cylZ(P, -0.40, 0.60, RZ, RZ + 0.10, 0.30, 18);
    cylZ(P, -0.40, 0.60, RZ + 0.10, RZ + 0.14, 0.25, 18);
    cylY(D, -0.66, 0.45, 0.75, RZ + 0.13, 0.03, 8);
    for (i = 0; i < 4; i++) {
      var ap = -0.6 + i * 0.4;
      x = -0.40 + Math.cos(ap) * 0.30; y = 0.60 + Math.sin(ap) * 0.30;
      box(G, x - 0.04, x + 0.04, y - 0.04, y + 0.04, RZ + 0.06, RZ + 0.12);
    }
    cylZ(P, -0.40, -0.60, RZ, RZ + 0.08, 0.26, 16);
    cylY(D, -0.62, -0.75, -0.45, RZ + 0.07, 0.03, 8);
    box(P, -0.05, 0.10, -0.75, -0.45, RZ, RZ + 0.10);
    box(G, 0.10, 0.12, -0.72, -0.48, RZ + 0.02, RZ + 0.08);
    /* the whip aerial base and whip on the rear left, a stowage rack across the rear */
    cylZ(D, -1.35, 0.95, RZ - 0.16, RZ - 0.06, 0.05, 8);
    cylZ(D, -1.35, 0.95, RZ - 0.06, RZ + 1.60, 0.008, 4);
    for (s = -1; s <= 1; s += 2) cyl(D, [-1.55, s * 0.95, Z0 + 0.05], [-1.80, s * 0.95, Z0 + 0.10], 0.02, 0.02, 6);
    cyl(D, [-1.80, -0.95, Z0 + 0.10], [-1.80, 0.95, Z0 + 0.10], 0.02, 0.02, 6);
    cyl(D, [-1.80, -0.95, Z0 + 0.30], [-1.80, 0.95, Z0 + 0.30], 0.02, 0.02, 6);
    for (k = -2; k <= 2; k++) cyl(D, [-1.80, k * 0.45, Z0 + 0.10], [-1.80, k * 0.45, Z0 + 0.30], 0.015, 0.015, 5);
    for (s = -1; s <= 1; s += 2) cyl(D, [-1.80, s * 0.95, Z0 + 0.30], [-1.55, s * 0.95, Z0 + 0.30], 0.02, 0.02, 6);
    box(P, -1.78, -1.56, -0.70, 0.40, Z0 + 0.11, Z0 + 0.28);
    /* the radar: a single column over the turret rear (R1), a yoke, the round reflector
       0.86 m across, its face off-white (R1), centre 0.14 m left, top 3.60 m (card) */
    var CX = -1.05, CY = 0.14, R = 0.43, CZ = 3.60 - R, look = unit([1, 0, 0.18]);
    box(P, CX - 0.30, CX + 0.30, CY - 0.26, CY + 0.26, RZ, RZ + 0.16);
    cylZ(D, CX, CY, RZ + 0.16, RZ + 0.20, 0.16, 16);
    cylZ(D, CX, CY, RZ + 0.20, CZ - R - 0.02, 0.085, 14);
    cylZ(P, CX, CY, CZ - R - 0.10, CZ - R + 0.02, 0.12, 14);
    for (s = -1; s <= 1; s += 2) {
      box(P, CX - 0.06, CX + 0.06, CY + s * (R + 0.02), CY + s * (R + 0.07), CZ - R - 0.02, CZ);
      cylY(D, CX, CY + s * (R + 0.07), CY + s * (R + 0.11), CZ, 0.06, 10);
    }
    box(P, CX - 0.06, CX + 0.06, CY - R - 0.07, CY + R + 0.07, CZ - R - 0.06, CZ - R + 0.0);
    function dp(a) { return [CX + look[0] * a, CY, CZ + look[2] * a]; }
    cyl(P, dp(-0.28), dp(-0.18), 0.22, 0.40, 24);
    cyl(P, dp(-0.18), dp(0.04), 0.42, R, 28);
    cyl(D, dp(0.04), dp(0.07), R + 0.01, R + 0.01, 28);
    cyl(L, dp(0.07), dp(0.10), R - 0.02, R - 0.06, 28);
  }

  function m1992(THREE, M, C) {
    var g = HeroZsu.build(THREE, M, C, "Z23");
    var old = g.getObjectByName("turret");
    if (old) g.remove(old);
    var Mt = hullMaterials(g);
    var light = new THREE.MeshStandardMaterial({ color: 0xd8d6cc, roughness: 0.80, metalness: 0.02 });
    var B = { paint: new Bin(Mt.paint, true), dark: new Bin(Mt.dark, false), glass: new Bin(Mt.glass, false),
              team: new Bin(Mt.team, false), light: new Bin(light, false) };
    turretM1992(B);
    var tg = new THREE.Group();
    tg.name = "turret";
    flush(THREE, tg, B);
    g.add(tg);
    g.name = "kpa_m1992_spaag";
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return { m1992: m1992 };
})();

/* ------------------------------------------------------------------ registration
   len is the measured X extent of the build (tools/model3d/dump.js). */
if (typeof HeroZsu !== "undefined") UNIT_MODELS["kpa_e90_spaag"] = { len: 6.98, build: HeroHeldKpaArmour.m1992 };

/* HELD, rule 1 (no photograph or drawing of the vehicle found; retried 2026-11-12):
   searched ko/zh/ja.wikipedia (Songun-ho in Hangul, Songun-915 in Chinese, M-2002 (ja: Songun section, text only),
   the ja M-1989 SPAAG and M-1992 armoured car articles, the KPA army and weapons-list articles: no images of these
   vehicles); Commons "Category:Military parades in North Korea" and "Workers' Party of Korea
   Parade in 2015 (Pyongyang)" (every frame viewed); the TRADOC Threat Tactics Reports on North
   Korea (2015, 2018) page by page; and all 4289 ODIN WEG cards (odin.t2com.army.mil): ODIN has
   no card for the Songun-915, the M-1992 armoured car, a radar vehicle or a twin 37 mm SPAAG.
   UNIT_MODELS["kpa_e00_heavy"], ["hvy_k"]                     Songun-915 (HeroKpaTanks.son left unregistered)
   UNIT_MODELS["kpa_e00_recon"], ["kpa_e90_recon"], ["recon_k"] M-1992 armoured car
   UNIT_MODELS["radarv_k"]                                       M-1992 radar vehicle
   UNIT_MODELS["kpa_e00_spaag"], ["kpa_e80_spaag"], ["spaag_k"] M-1989 twin 37 mm */
