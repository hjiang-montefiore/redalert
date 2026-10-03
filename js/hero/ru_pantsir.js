/* ============ ru_pantsir.js - HERO model: the 96K6 Pantsir-S1 ============
   The Russian gun-and-missile air-defence system on the KamAZ-6560 8x8 truck:
     pact_e00_spaag   96K6 Pantsir-S1   (service 2012, Russian green)

   References (Wikimedia Commons; each feature rests on what they show):
     - "Pantsir-S1 SAM on KamAZ-6560-chassis.jpg" (rear three-quarter) and
       "Pantsir-S1 missile system on Oboronexpo in 2014 (rear view)" (Vitaly
       Kuzmin): rear bumper beam and lamps, two rear ladders, stabiliser legs,
       the module with two blocks of SIX tubes (3 x 2) and the twin guns.
     - "Pantsir-S1 (Bronnitsy 01)" and "Oboronexpo 2014 (front view)" (Kuzmin,
       Russian green, front three-quarter): the flat-fronted KamAZ cab, the
       tall crew/equipment box behind it with a door, ladder and vent grille,
       the spare wheel behind the cab (port), the low mesh-walled rear box
       that carries the module ring, the search-radar panel as a flat box.
     - "Pantsir S-1 Moscow 2015" (top view, Russian green) and "Pantsir-S1,
       Victory parade 2010": axle stations (rear pair, long gap, front pair),
       the module's position over the rear box, the radar panel as a flat
       slab, the pod blocks beside the module, cab 2.2 m of the 10 m.
   Published figures: length about 10 m, width 2.9 m (armour_specs.js row:
   len 10, width 2.9), 12 ready 57E6 missiles in two blocks of six, two twin
   30 mm 2A38M guns.  No published height was found in the sources reached
   (the English and Russian Wikipedia infobox fields are empty); the row says
   4 m, and the march-pose photographs scale to about 3.9-4.0 m (cab roof 3.1
   m, radar panel about 0.9 m above it), so the model is fitted to 4.0 m.
   Drawn in the module's rest pose for the game: the module faces forward
   (render3d trains "turret" from 0 = hull heading), tubes and guns level.
   NOTE: several Russian-service photographs show the module turned to the
   REAR on the march (radar panel then over the crew box); the game's turret
   rest is forward, so this is a deliberate choice, not a photograph.
   "podelev" lifts the two tube blocks, the guns and the tracking unit
   together (a choice: on the photographs the blocks and guns have their own
   drives); el 0.98 rad is read from the blocks of the KamAZ-6560 photograph
   (about 55 degrees), a static display, not an engagement picture.
   userData.cells = the twelve tube mouths.
   NOT CONFIRMED: exact axle spacing (measured from the top view: -3.05, -1.65,
   1.85, 3.65 m), cab dimensions, the tracking-radar antenna and the
   electro-optical head (plain panel and sensor box), module roof detail.
   No markings, plain green.

   Five materials: PAINT, DARK, GLASS, the plain C.team (two small flat roof
   strips, 0.25 x 1.1 m and 0.25 x 0.95 m, one on the crew box roof, one on
   the module roof) and WHEEL (vertex-coloured).  Named nodes: "turret" (ring
   centre at x -1.45, on the rear box roof z 2.35), "podelev" in it, four
   "roadwheel" groups (both tyres of each axle).

   Model space: +X nose, +Y left, +Z up, metres, tyres on z = 0.
   ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPantsir = (function () {
  "use strict";

  var TAU = Math.PI * 2;
  var GREEN = "#4b5a3e";

  var AX = [3.65, 1.85, -1.65, -3.05], RT = 0.64, ZW = 0.64, YT = 1.18;
  var X0 = -1.45, ZR = 2.35;      /* turret ring centre and the body roof */
  var PV = [-0.4, 0.80];          /* elevation pivot in the turret frame (x, z) */

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function lin(hex) {
    var n = typeof hex === "string" ? parseInt(hex.slice(1), 16) : hex;
    return [Math.pow(((n >> 16) & 255) / 255, 2.2), Math.pow(((n >> 8) & 255) / 255, 2.2), Math.pow((n & 255) / 255, 2.2)];
  }

  /* one bin of triangles per material; the painted bin also gets planar UVs
     taken from the dominant axis of each face, so camouflage never stretches;
     the wheel bin carries a vertex colour (bin.col) instead */
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
  /* a flat quad wound so that its normal points along "want" */
  function quad(bin, a, b, c, d, want) {
    var f = cross(sub(b, a), sub(c, a));
    if (dot(f, want) >= 0) { bin.tri(a, b, c); bin.tri(a, c, d); }
    else { bin.tri(a, c, b); bin.tri(a, d, c); }
  }

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
    var t;
    if (y0 > y1) { t = y0; y0 = y1; y1 = t; }
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
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

  /* a prism: convex outline in the XZ plane, from y0 to y1 */
  function prism(bin, pts, y0, y1) { taper(bin, pts, -1, 1, 0, 1, y0, y1); }
  /* a convex XZ outline whose side faces lean in: half width wa at z = za,
     wb at z = zb (planar side faces, since the width is linear in z); with
     y0 / y1 given it is a straight prism between them instead */
  function taper(bin, pts, wa, wb, za, zb, y0, y1) {
    var n = pts.length, V = [], F = [], i, j, w;
    for (i = 0; i < n; i++) {
      w = wa + (wb - wa) * (pts[i][1] - za) / (zb - za);
      V.push([pts[i][0], y0 !== undefined ? y0 : -w, pts[i][1]]);
    }
    for (i = 0; i < n; i++) {
      w = wa + (wb - wa) * (pts[i][1] - za) / (zb - za);
      V.push([pts[i][0], y1 !== undefined ? y1 : w, pts[i][1]]);
    }
    for (i = 1; i < n - 1; i++) { F.push([0, i, i + 1]); F.push([n, n + i + 1, n + i]); }
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([i, n + j, j], [i, n + i, n + j]); }
    solid(bin, V, F);
  }


  /* ----------------------------------------------------------- materials */
  function materials(THREE, C) {
    var T = {};
    T.paint = new THREE.MeshStandardMaterial({ color: GREEN, roughness: 0.88, metalness: 0.06 });
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.85, metalness: 0.08 });
    T.rubber = lin(0x1e1f20);
    T.hubc = lin(0x2c2e2c);
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, false), dark: new Bin(T.dark, false),
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

  /* ----------------------------------------------------------- wheels */
  /* one axle: two tyres (lathe of a rounded section, smooth normals), a rim
     and hub on each outer face, sixteen tread lugs; in the group's frame the
     axle is the origin */
  var TP = [[0.30, 0.24], [0.56, 0.25], [0.62, 0.20], [0.64, 0.10], [0.64, -0.10], [0.62, -0.20], [0.56, -0.25], [0.30, -0.24]];
  function wheelStation(W, T) {
    var s, i, k, j, a0, a1, n = 18, p, q, c0, c1, nn, nl, A, B, Cc, Dd, a, ca, sa, h;
    for (s = -1; s <= 1; s += 2) {
      W.col = T.rubber;
      /* the tyre: a closed lathe of the section, oriented by its own volume */
      var TV = [], TF = [], m = TP.length;
      for (i = 0; i < m; i++) for (k = 0; k < n; k++) {
        a0 = k / n * TAU;
        TV.push([Math.cos(a0) * TP[i][0], s * (YT + TP[i][1]), Math.sin(a0) * TP[i][0]]);
      }
      for (i = 0; i < m; i++) for (k = 0; k < n; k++) {
        j = (i + 1) % m; a1 = (k + 1) % n;
        TF.push([i * n + k, i * n + a1, j * n + a1], [i * n + k, j * n + a1, j * n + k]);
      }
      solid(W, TV, TF);
      /* rim disc and hub on the outer face, plain steel body closing the tyre */
      W.col = T.hubc;
      cyl(W, [0, s * (YT - 0.24), 0], [0, s * (YT + 0.245), 0], 0.30, 0.30, 20);
      cyl(W, [0, s * (YT + 0.24), 0], [0, s * (YT + 0.265), 0], 0.27, 0.27, 20);
      cyl(W, [0, s * (YT + 0.255), 0], [0, s * (YT + 0.275), 0], 0.11, 0.11, 12);
      /* tread lugs, alternate halves of the tread */
      W.col = T.rubber;
      for (j = 0; j < 12; j++) {
        a = j / 12 * TAU; ca = Math.cos(a); sa = Math.sin(a);
        h = (j % 2) ? [0.01, 0.23] : [-0.23, -0.01];
        planeBox(W, [ca * 0.63, 0, sa * 0.63], [-sa, 0, ca], [0, 1, 0], [ca, 0, sa],
                 -0.075, 0.075, s * YT + (s > 0 ? h[0] : -h[1]), s * YT + (s > 0 ? h[1] : -h[0]), -0.005, 0.025);
      }
    }
    /* the axle beam between the tyres */
    W.col = T.hubc;
    cyl(W, [0, -YT + 0.2, 0], [0, YT - 0.2, 0], 0.09, 0.09, 8);
  }

  /* ----------------------------------------------------------- truck */
  function ladder(B, x, yc, z0, z1) {
    var i, n = Math.round((z1 - z0) / 0.3);
    box(B, x - 0.03, x + 0.03, yc - 0.25, yc - 0.21, z0, z1);
    box(B, x - 0.03, x + 0.03, yc + 0.21, yc + 0.25, z0, z1);
    for (i = 0; i <= n; i++) box(B, x - 0.035, x + 0.035, yc - 0.23, yc + 0.23, z0 + 0.1 + i * (z1 - z0 - 0.2) / n - 0.015, z0 + 0.1 + i * (z1 - z0 - 0.2) / n + 0.015);
    box(B, x - 0.12, x - 0.01, yc - 0.27, yc - 0.23, z0 + 0.1, z0 + 0.14);
    box(B, x - 0.12, x - 0.01, yc + 0.23, yc + 0.27, z0 + 0.1, z0 + 0.14);
    box(B, x - 0.12, x - 0.01, yc - 0.27, yc - 0.23, z1 - 0.14, z1 - 0.10);
    box(B, x - 0.12, x - 0.01, yc + 0.23, yc + 0.27, z1 - 0.14, z1 - 0.10);
  }

  function addHull(B) {
    var P = B.paint, D = B.dark, G = B.glass, T = B.team, s, i, x, z;
    /* frame rails and cross members, axle housings ride in the wheel groups */
    for (s = -1; s <= 1; s += 2) {
      box(D, -4.85, 4.55, s * 0.78, s * 0.58, 0.88, 1.22);
      box(D, -4.6, -3.0, s * 0.95, s * 0.78, 0.95, 1.20);
    }
    for (x = -4.4; x < 3.6; x += 1.15) box(D, x, x + 0.12, -0.8, 0.8, 0.92, 1.16);
    /* the low rear equipment box (mesh-walled sides) that carries the module ring */
    prism(P, [[-4.70, 1.35], [0.60, 1.35], [0.60, 2.25], [0.50, ZR], [-4.58, ZR], [-4.70, 2.25]], -1.40, 1.40);
    /* the taller crew / equipment box behind the cab: door with ladder, vent grille */
    prism(P, [[0.60, 1.35], [2.30, 1.35], [2.30, 2.90], [2.20, 3.0], [0.70, 3.0], [0.60, 2.90]], -1.30, 1.30);
    for (s = -1; s <= 1; s += 2) {
      for (x = -4.5; x < 0.4; x += 0.95) box(P, x, x + 0.06, s * 1.40, s * 1.435, 1.42, ZR - 0.08);
      box(D, -4.40, 0.35, s * 1.40, s * 1.42, 1.50, 2.22);
      for (x = -4.15; x < 0.3; x += 1.2) box(P, x, x + 0.05, s * 1.42, s * 1.447, 1.52, 2.20);
      box(D, 1.45, 2.05, s * 1.30, s * 1.32, 1.80, 2.65);
      for (z = 1.86; z < 2.62; z += 0.14) box(P, 1.48, 2.02, s * 1.32, s * 1.347, z, z + 0.05);
      box(P, 0.80, 1.35, s * 1.30, s * 1.322, 1.60, 2.80);
      box(D, 0.84, 0.96, s * 1.322, s * 1.34, 1.90, 2.30);
      /* a fuel tank on the frame between the axles, with its strap */
      cylX(D, -0.60, 1.20, s * 1.08, 0.96, 0.29, 14);
      box(D, 0.05, 0.12, s * 0.74, s * 1.41, 0.60, 1.30);
      /* stabiliser jack legs, stowed: rear corner and amidships */
      cylZ(D, -4.45, s * 1.30, 0.66, 1.9, 0.085, 8);
      cylZ(D, -4.45, s * 1.30, 0.50, 0.70, 0.05, 8);
      box(D, -4.55, -4.35, s * 1.22, s * 1.38, 0.46, 0.52);
      cylZ(D, 0.95, s * 1.28, 0.62, 1.4, 0.08, 8);
      /* rear lamp clusters on the bumper beam */
      box(G, -4.99, -4.97, s * 0.95, s * 1.12, 0.92, 1.06);
      box(G, -4.99, -4.97, s * 1.15, s * 1.25, 0.92, 1.06);
      /* cab steps, mirrors, side window */
      box(D, 3.45, 4.20, s * 1.22, s * 1.38, 0.96, 1.00);
      box(D, 3.55, 4.10, s * 1.22, s * 1.36, 1.14, 1.18);
      box(D, 4.40, 4.46, s * 1.20, s * 1.42, 2.40, 2.44);
      box(D, 4.38, 4.50, s * 1.40, s * 1.445, 2.20, 2.90);
      box(G, 4.375, 4.38, s * 1.41, s * 1.44, 2.26, 2.84);
      box(G, 3.40, 4.40, s * 1.258, s * 1.268, 2.20, 2.90);
      /* headlamps */
      box(G, 4.725, 4.755, s * 0.84, s * 1.00, 1.55, 1.72);
    }
    /* rear face: bumper beam, two ladders, a tow coupling */
    box(D, -4.98, -4.82, -1.32, 1.32, 0.86, 1.16);
    ladder(D, -4.76, -0.85, 1.42, 2.22);
    ladder(D, -4.76, 0.85, 1.42, 2.22);
    box(D, -4.82, -4.70, -0.25, 0.25, 1.12, 1.36);
    box(P, -4.725, -4.70, -0.50, 0.50, 1.60, 2.20);
    /* roof of the crew box: a hatch ring and one team strip */
    box(T, 0.95, 2.05, -0.125, 0.125, 3.0, 3.02);
    cylZ(P, 1.60, -0.7, 3.0, 3.06, 0.2, 14);
    /* the cab: flat-fronted, over the front axles, roof at 3.1 m */
    prism(P, [[2.85, 1.30], [4.60, 1.30], [4.72, 1.50], [4.72, 2.95], [4.50, 3.10], [2.85, 3.10]], -1.25, 1.25);
    box(D, 4.72, 4.75, -0.82, 0.82, 1.55, 2.00);
    for (i = -1; i <= 1; i += 2) box(G, 4.72, 4.755, i * 0.04, i * 1.12, 2.15, 2.95);
    box(P, 4.60, 4.80, -1.15, 1.15, 2.98, 3.08);
    box(D, 4.70, 5.00, -1.28, 1.28, 0.86, 1.20);
    box(D, 4.72, 4.74, -0.10, 0.10, 1.40, 1.52);
    box(D, 4.85, 4.91, -0.45, 0.45, 1.20, 1.30);
    box(D, 4.20, 4.35, -0.30, 0.30, 3.10, 3.15);
    /* the spare wheel between cab and crew box on the port side */
    cylY(D, 2.58, 0.62, 1.02, 2.05, 0.55, 18);
    cylY(P, 2.58, 1.02, 1.04, 2.05, 0.30, 14);
  }

  /* ----------------------------------------------------------- module */
  /* returns the elevating parts in B2 and the tube-mouth cells */
  function addTurret(B, E) {
    var P = B.paint, D = B.dark, G = B.glass, T = B.team, s, i, k, j, cells = [], y, z, x;
    /* slew ring, drum, central equipment body, rear radar housing */
    cylZ(D, 0, 0, 0, 0.10, 1.06, 28);
    cylZ(P, 0, 0, 0.10, 0.40, 0.98, 28);
    prism(P, [[-1.20, 0.40], [0.95, 0.40], [0.95, 0.86], [0.78, 1.10], [-1.20, 1.10]], -0.85, 0.85);
    box(P, -1.55, -1.00, -0.55, 0.55, 0.40, 1.15);
    box(D, -1.57, -1.55, -0.40, 0.40, 0.55, 1.05);
    box(P, -0.20, 0.55, -0.80, 0.80, 1.10, 1.14);
    /* roof hatches and vision blocks on the body sides */
    cylZ(P, -0.55, 0.50, 1.10, 1.16, 0.18, 14);
    cylZ(P, -0.55, -0.50, 1.10, 1.16, 0.18, 14);
    for (s = -1; s <= 1; s += 2) {
      box(G, 0.55, 0.78, s * 0.848, s * 0.858, 0.60, 0.90);
      box(D, -1.00, -0.40, s * 0.85, s * 0.87, 0.55, 1.00);
      for (i = 0; i < 4; i++) box(P, -0.96 + i * 0.15, -0.90 + i * 0.15, s * 0.87, s * 0.885, 0.58, 0.98);
    }
    box(T, -1.15, -0.20, -0.125, 0.125, 1.10, 1.12);
    /* the search-radar panel: a flat antenna box on a boom behind the module, tilted up toward its rear */
    var c12 = Math.cos(0.2), s12 = Math.sin(0.2), RC = [-2.45, 0, 1.30];
    box(P, -2.60, -1.55, -0.32, 0.32, 0.80, 1.00);
    box(P, -2.62, -2.28, -0.30, 0.30, 0.80, 1.22);
    box(D, -2.30, -2.20, -0.28, 0.28, 0.84, 1.18);
    planeBox(P, RC, [0, 1, 0], [c12, 0, s12], [-s12, 0, c12], -0.75, 0.75, -0.65, 0.65, -0.03, 0.17);
    planeBox(D, RC, [0, 1, 0], [c12, 0, s12], [-s12, 0, c12], -0.70, 0.70, -0.60, 0.60, -0.08, -0.03);

    /* ---- the elevating parts (turret frame; moved back by the pivot later) ---- */
    var EP = E.paint, ED = E.dark, EG = E.glass, tz = [0.53, 0.80, 1.07], cy = [1.00, 1.24], L0 = -1.05, L1 = 2.10, r = 0.115;
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 3; k++) for (j = 0; j < 2; j++) {
        y = s * cy[j]; z = tz[k];
        cyl(EP, [L0, y, z], [L1, y, z], r, r, 10);
        cyl(ED, [L1 - 0.02, y, z], [L1 + 0.012, y, z], r - 0.012, r - 0.012, 10);
        cyl(ED, [L0 - 0.01, y, z], [L0, y, z], r - 0.03, r - 0.03, 10);
        cells.push([L1 - PV[0], y, z - PV[1], L0 - PV[0]]);
      }
      /* three clamp frames across each block and a rear cradle plate */
      for (i = 0; i < 3; i++) {
        x = [-0.75, 0.50, 1.65][i];
        box(EP, x, x + 0.12, s * 0.80, s * 1.37, 0.38, 1.25);
      }
      box(ED, -0.82, -0.70, s * 0.80, s * 1.37, 0.36, 1.27);
    }
    /* trunnion beam across the module under the blocks */
    box(EP, -0.50, 0.10, -0.86, 0.86, 0.60, 0.74);
    /* the twin 2A38M guns: receiver, two barrels side by side, jackets and muzzle collars */
    for (s = -1; s <= 1; s += 2) {
      box(EP, -0.20, 0.85, s * 0.30, s * 0.56, 1.14, 1.50);
      box(ED, 0.85, 0.95, s * 0.30, s * 0.56, 1.22, 1.42);
      for (j = 0; j < 2; j++) {
        y = s * (j ? 0.495 : 0.365);
        cylX(ED, 0.95, 1.55, y, 1.32, 0.055, 8);
        cylX(ED, 1.55, 2.55, y, 1.32, 0.034, 8);
        cylX(ED, 2.43, 2.55, y, 1.32, 0.048, 8);
      }
      box(ED, 1.90, 1.96, s * 0.33, s * 0.53, 1.28, 1.36);
    }
    /* the tracking unit between the guns: housing, antenna panel, electro-optical head */
    box(EP, -0.05, 1.05, -0.24, 0.24, 1.10, 1.45);
    box(ED, 1.05, 1.13, -0.22, 0.22, 1.15, 1.42);
    box(EG, 1.13, 1.145, -0.16, 0.16, 1.20, 1.38);
    box(EP, 0.10, 0.80, -0.20, 0.20, 1.45, 1.52);
    cylX(ED, 0.55, 0.85, 0, 1.60, 0.09, 12);
    cylX(EG, 0.85, 0.87, 0, 1.60, 0.065, 10);
    return cells;
  }

  function build(THREE, M, C) {
    var Tm = materials(THREE, C), g = new THREE.Group();
    var HB = bins(Tm), TB = bins(Tm), EB = bins(Tm), i, wg, W, E, cells;
    addHull(HB);
    flush(THREE, g, HB);
    for (i = 0; i < AX.length; i++) {
      W = new Bin(Tm.wheel, false, true);
      wheelStation(W, Tm);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(AX[i], 0, ZW);
      flush(THREE, wg, { w: W });
      g.add(wg);
    }
    cells = addTurret(TB, EB);
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(X0, 0, ZR);
    flush(THREE, wg, TB);
    E = new THREE.Group();
    E.name = "podelev";
    E.position.set(PV[0], 0, PV[1]);
    flush(THREE, E, EB);
    for (i = 0; i < E.children.length; i++) E.children[i].position.set(-PV[0], 0, -PV[1]);
    E.userData.el = 0.98;
    E.userData.cells = cells;
    wg.add(E);
    g.add(wg);
    return g;
  }

  return { build: build };
})();

UNIT_MODELS["pact_e00_spaag"] = { len: 10, build: function (THREE, M, C) { return HeroPantsir.build(THREE, M, C); } };
