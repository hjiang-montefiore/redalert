/* ============ ru_su100.js - HERO model: SU-100 casemate tank destroyer ============
   Key: pact_e50_spg  "SU-100 Self-Propelled Gun" (1950s Soviet Army, T-34 hull, 1944 design).

   References (fetched, looked at):
     SU-100_spb.JPG (Commons, Artillery Museum St Petersburg, olive green, right side
       three-quarter front): fixed casemate with tumblehome sides and a sloped front
       plate, cast domed mantlet well to the RIGHT of centre, the commander's cupola at the
       right rear of the roof, the long cylindrical fuel drum lying on the right fender
       behind the casemate, five Christie road wheels a side, drive sprocket at the
       REAR, idler at the front, no return rollers, no skirts, big sloped mudguards.
     Su-100_spatg.jpg (Commons; it is a straight front view, Kyiv museum): the mantlet
       sits a little right of centre (vehicle's right), a ring of bolts round its collar,
       the driver's hatch with two vision blocks on the front plate to the LEFT of the gun,
       two round headlamps on the front mudguards beside the casemate, two strips of
       spare track links lying on the glacis, a fuel drum on the left fender too, plain
       D-10S tube with no muzzle brake.
   Dimensions from the published figures: hull 6.10 m, overall 9.45 m with the gun
   forward, width 3.00 m, height 2.245 m, 5 wheels, 100 mm D-10S.  Casemate front plate
   at about 50 deg from vertical (75 mm), glacis about 25-30 deg from horizontal.
   NOT confirmed from the references, so NOT drawn: unditching log, smoke canisters,
   roof ventilator caps, stowage box, any marking.  Proportional estimates: the casemate
   cheek angles, wheel pitch, spare-track strip size, drum length.

   TURRET CHOICE: the row is turret:true (tturn 0.9) and render3d trains the node
   named "turret" about its Z.  This casemate is fixed, so the "turret" node holds
   ONLY the mantlet and the gun; its origin is the mantlet pivot on the casemate
   front plate (not a ring centre), so the gun swings from its own mount and the casemate
   never moves.  damage3d.js puts this vehicle's engine at the rear.
   "roadwheel": five groups (one per axle, both sides in one group, axis +Y).
   Materials: paint, dark (tracks, grille), rubber, glass, team (C.team exactly).
   Model space +X front, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSU100 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

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
  /* convex polygon in the XZ plane (list of [x,z]) extruded across y0..y1 */
  function prism(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]]);
    for (i = 0; i < n; i++) V.push([pts[i][0], y1, pts[i][1]]);
    for (i = 1; i < n - 1; i++) { F.push([0, i, i + 1]); F.push([n, n + i + 1, n + i]); }
    for (i = 0; i < n; i++) { var j = (i + 1) % n; F.push([i, n + j, j], [i, n + i, n + j]); }
    solid(bin, V, F);
  }

  /* ---- extra kit ---- */
  /* a box in the XZ plane turned by ang (hl along the direction, ht across) spanning y0..y1 */
  function boxXZ(bin, cx, cz, ang, hl, ht, y0, y1) {
    var c = Math.cos(ang), s = Math.sin(ang), q = [[-hl, -ht], [hl, -ht], [hl, ht], [-hl, ht]], P = [], k, e, y;
    for (k = 0; k < 8; k++) {
      e = q[k % 4]; y = k < 4 ? y0 : y1;
      P.push([cx + e[0] * c - e[1] * s, y, cz + e[0] * s + e[1] * c]);
    }
    hexa(bin, P);
  }
  /* convex loft between two polygons of equal length (outer faces wound outward) */
  function loft(bin, A, B) {
    var n = A.length, V = A.concat(B), F = [], i, j;
    for (i = 1; i < n - 1; i++) { F.push([0, i + 1, i]); F.push([n, n + i, n + i + 1]); }
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([i, j, n + j], [i, n + j, n + i]); }
    solid(bin, V, F);
  }
  /* sphere about centre C, polar axis +X, smooth */
  function sphere(bin, C, r, seg, stk) {
    var V = [], N = [], F = [], i, j, th, ph, nv, nr = stk - 1, p0, p1;
    V.push([C[0] + r, C[1], C[2]]); N.push([1, 0, 0]);
    for (i = 1; i < stk; i++) {
      th = Math.PI * i / stk;
      for (j = 0; j < seg; j++) {
        ph = j / seg * TAU;
        nv = [Math.cos(th), Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph)];
        V.push([C[0] + nv[0] * r, C[1] + nv[1] * r, C[2] + nv[2] * r]); N.push(nv);
      }
    }
    V.push([C[0] - r, C[1], C[2]]); N.push([-1, 0, 0]);
    function a(i, j) { return 1 + (i - 1) * seg + (j % seg); }
    for (j = 0; j < seg; j++) F.push([0, a(1, j + 1), a(1, j)]);
    for (i = 1; i < nr; i++) for (j = 0; j < seg; j++) {
      F.push([a(i, j), a(i, j + 1), a(i + 1, j + 1)], [a(i, j), a(i + 1, j + 1), a(i + 1, j)]);
    }
    p0 = V.length - 1;
    for (j = 0; j < seg; j++) F.push([a(nr, j), a(nr, j + 1), p0]);
    solid(bin, V, F, N);
  }

  var WX = [-1.62, -0.81, 0, 0.81, 1.62], WZ = 0.425, WRAD = 0.385;
  var XS = -2.62, XI = 2.62, RT = 0.395;   /* sprocket (rear), idler (front), track path radius */
  var Y0 = 1.0, Y1 = 1.5;                  /* track lane */

  /* one side of track: plain slab on the hidden top run, real links round the rest */
  function track(bin, y0, y1) {
    var Lb = XI - XS, L = 2 * Lb + TAU / 2 * 2 * RT / 2 * 2, n, p, k, s, cx, cz, ang, phi, nx, nz, ym = (y0 + y1) / 2;
    L = 2 * Lb + Math.PI * 2 * RT;
    n = 78; p = L / n;
    for (k = 0; k < n; k++) {
      s = (k + 0.5) * p;
      if (s < Lb) { cx = XS + s; cz = WZ - RT; ang = 0; }
      else if (s < Lb + Math.PI * RT) { phi = -Math.PI / 2 + (s - Lb) / RT; cx = XI + Math.cos(phi) * RT; cz = WZ + Math.sin(phi) * RT; ang = phi + Math.PI / 2; }
      else if (s < 2 * Lb + Math.PI * RT) { continue; }
      else { phi = Math.PI / 2 + (s - 2 * Lb - Math.PI * RT) / RT; cx = XS + Math.cos(phi) * RT; cz = WZ + Math.sin(phi) * RT; ang = phi + Math.PI / 2; }
      boxXZ(bin, cx, cz, ang, p * 0.46, 0.02, y0, y1);
      nx = -Math.sin(ang); nz = Math.cos(ang);
      boxXZ(bin, cx + nx * 0.05, cz + nz * 0.05, ang, 0.028, 0.03, ym - 0.02, ym + 0.02);
    }
    belt(bin, XS, WZ + RT, XI, WZ + RT, y0, y1, 0.04);
  }

  function build(THREE, M, C) {
    var g = new THREE.Group(), i, j, s, sg, tg, a, c, sn, sgn;
    var T = {
      paint: new THREE.MeshStandardMaterial({ color: 0x4a5233, roughness: 0.9, metalness: 0.05 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x2b2a26, roughness: 0.78, metalness: 0.3 }),
      rubber: new THREE.MeshStandardMaterial({ color: 0x1b1b1a, roughness: 0.95, metalness: 0.0 }),
      glass: new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 }),
      team: new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 })
    };
    var B = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
    var P = B.paint, D = B.dark, G = B.glass;

    /* hull tub (T-34): belly, lower nose, glacis, deck, sloped stern */
    prism(P, [[-2.85, 0.38], [2.70, 0.38], [3.04, 0.55], [1.84, 1.10], [-2.95, 1.10], [-3.04, 0.95], [-3.04, 0.55]], -1.0, 1.0);
    /* sponson shelf under the casemate */
    box(P, -1.60, 1.84, -1.20, 1.20, 0.88, 1.10);
    /* fenders over the tracks and the big sloped front mudguards */
    for (sgn = -1; sgn <= 1; sgn += 2) {
      box(P, -2.85, 2.05, sgn > 0 ? 1.0 : -1.5, sgn > 0 ? 1.5 : -1.0, 0.93, 0.97);
      prism(P, [[2.05, 0.97], [2.05, 0.80], [2.88, 0.80], [3.00, 0.92], [2.88, 0.99], [2.05, 0.99]], sgn > 0 ? 1.0 : -1.5, sgn > 0 ? 1.5 : -1.0);
    }
    /* fixed casemate: sloped front plate with cheeks, tumblehome sides, rear wall, flat roof */
    loft(P, [[1.84, -0.95, 1.10], [1.40, -1.25, 1.10], [-1.55, -1.25, 1.10], [-1.55, 1.25, 1.10], [1.40, 1.25, 1.10], [1.84, 0.95, 1.10]],
            [[0.80, -0.68, 1.92], [0.45, -0.98, 1.92], [-1.45, -0.98, 1.92], [-1.45, 0.98, 1.92], [0.45, 0.98, 1.92], [0.80, 0.68, 1.92]]);

    /* collar ring and bolt ring of the mantlet on the front plate */
    var NF = [0.619, 0, 0.785], UF = [-0.785, 0, 0.619], PV = [1.332, -0.15, 1.50], O = [1.84, 0, 1.10];
    cyl(P, PV, [PV[0] + NF[0] * 0.035, PV[1], PV[2] + NF[2] * 0.035], 0.45, 0.45, 24);
    for (i = 0; i < 16; i++) {
      a = i / 16 * TAU; c = Math.cos(a) * 0.38; sn = Math.sin(a) * 0.38;
      var q0 = [PV[0] + UF[0] * c + NF[0] * 0.03, PV[1] + sn, PV[2] + UF[2] * c + NF[2] * 0.03];
      cyl(P, q0, [q0[0] + NF[0] * 0.025, q0[1], q0[2] + NF[2] * 0.025], 0.024, 0.02, 6);
    }
    /* driver's hatch with two vision blocks, left of the gun on the front plate */
    planeBox(P, O, UF, [0, 1, 0], NF, 0.38, 0.80, 0.36, 0.72, 0, 0.035);
    planeBox(P, O, UF, [0, 1, 0], NF, 0.50, 0.66, 0.46, 0.62, 0.035, 0.055);
    planeBox(G, O, UF, [0, 1, 0], NF, 0.78, 0.83, 0.40, 0.48, 0.0, 0.05);
    planeBox(G, O, UF, [0, 1, 0], NF, 0.78, 0.83, 0.60, 0.68, 0.0, 0.05);
    /* spare track strips lying on the glacis (links with two cleats each) */
    var DG = [-0.909, 0, 0.417], NG = [0.417, 0, 0.909], OG = [3.04, 0, 0.55];
    for (j = 0; j < 2; j++) {
      for (i = 0; i < 4; i++) {
        var u0 = 0.40 + i * 0.15, wc = -0.22 - j * 0.34;
        planeBox(D, OG, DG, [0, 1, 0], NG, u0, u0 + 0.13, wc - 0.16, wc + 0.16, 0.01, 0.04);
        planeBox(D, OG, DG, [0, 1, 0], NG, u0 + 0.03, u0 + 0.09, wc - 0.12, wc - 0.07, 0.04, 0.065);
        planeBox(D, OG, DG, [0, 1, 0], NG, u0 + 0.03, u0 + 0.09, wc + 0.07, wc + 0.12, 0.04, 0.065);
      }
    }
    /* headlamps on the front mudguards beside the casemate */
    for (sgn = -1; sgn <= 1; sgn += 2) {
      box(D, 1.90, 1.97, sgn * 1.36 - 0.03, sgn * 1.36 + 0.03, 0.97, 1.10);
      cylX(P, 1.97, 2.11, sgn * 1.36, 1.15, 0.095, 14);
      cylX(G, 2.11, 2.13, sgn * 1.36, 1.15, 0.075, 14);
    }
    /* commander's cupola, right rear of the roof */
    cylZ(P, -0.80, -0.62, 1.92, 2.12, 0.30, 12);
    cylZ(P, -0.80, -0.62, 2.12, 2.17, 0.32, 12);
    cylZ(P, -0.80, -0.62, 2.17, 2.215, 0.22, 12);
    box(P, -0.85, -0.74, -0.70, -0.54, 2.215, 2.245);
    for (i = 0; i < 7; i++) {
      s = i * TAU / 7 + 0.2;
      box(G, -0.80 + Math.cos(s) * 0.30 - 0.035, -0.80 + Math.cos(s) * 0.30 + 0.035,
          -0.62 + Math.sin(s) * 0.30 - 0.035, -0.62 + Math.sin(s) * 0.30 + 0.035, 2.00, 2.08);
    }
    /* loader's round hatch, left rear of the roof */
    cylZ(P, -0.65, 0.52, 1.92, 1.97, 0.24, 14);
    cylZ(P, -0.65, 0.52, 1.97, 2.01, 0.20, 14);
    box(P, -0.69, -0.61, 0.46, 0.58, 2.01, 2.04);
    /* rear engine deck: raised hatch, louvred grille, team panel */
    box(P, -2.80, -1.75, -0.62, 0.62, 1.10, 1.15);
    box(D, -2.60, -1.95, -0.46, 0.46, 1.15, 1.17);
    for (i = 0; i < 6; i++) box(D, -2.60 + i * 0.12, -2.53 + i * 0.12, -0.46, 0.46, 1.17, 1.20);
    box(B.team, -2.75, -2.30, -0.40, 0.40, 1.15, 1.17);
    /* tow hooks front and rear */
    box(D, 3.00, 3.045, -0.85, -0.70, 0.46, 0.56);
    box(D, 3.00, 3.045, 0.70, 0.85, 0.46, 0.56);
    box(D, -3.045, -3.00, -0.85, -0.70, 0.62, 0.72);
    box(D, -3.045, -3.00, 0.70, 0.85, 0.62, 0.72);
    /* external fuel drums on the rear fenders, with straps */
    for (sgn = -1; sgn <= 1; sgn += 2) {
      cylX(P, -2.90, -1.65, sgn * 1.31, 1.145, 0.17, 16);
      for (i = 0; i < 3; i++) {
        cylX(D, -2.78 + i * 0.5, -2.74 + i * 0.5, sgn * 1.31, 1.145, 0.178, 14);
        box(D, -2.78 + i * 0.5, -2.74 + i * 0.5, sgn * 1.31 - 0.03, sgn * 1.31 + 0.03, 0.97, 1.0);
      }
    }
    /* sprocket (rear) and idler (front), one set each side */
    for (sgn = -1; sgn <= 1; sgn += 2) {
      var yi = sgn > 0 ? Y0 : -Y1, yo = sgn > 0 ? Y1 : -Y0, yf = sgn > 0 ? yo : yi;   /* yf = outer face side */
      var yOutA = sgn > 0 ? 1.40 : -1.46, yOutB = sgn > 0 ? 1.46 : -1.40, yHubA = sgn > 0 ? 1.46 : -1.50, yHubB = sgn > 0 ? 1.50 : -1.46;
      cylY(P, XS, yOutA, yOutB, WZ, 0.32, 18);
      cylY(P, XS, yHubA, yHubB, WZ, 0.12, 10);
      cylY(P, XS, sgn > 0 ? 1.05 : -1.12, sgn > 0 ? 1.12 : -1.05, WZ, 0.32, 18);
      for (i = 0; i < 16; i++) {
        a = i / 16 * TAU;
        boxXZ(D, XS + Math.cos(a) * 0.36, WZ + Math.sin(a) * 0.36, a, 0.04, 0.02, sgn > 0 ? 1.20 : -1.30, sgn > 0 ? 1.30 : -1.20);
      }
      cylY(P, XI, yOutA, yOutB, WZ, 0.34, 18);
      cylY(P, XI, yHubA, yHubB, WZ, 0.10, 10);
      cylY(P, XI, sgn > 0 ? 1.05 : -1.12, sgn > 0 ? 1.12 : -1.05, WZ, 0.34, 18);
      track(D, sgn > 0 ? Y0 : -Y1, sgn > 0 ? Y1 : -Y0);
    }
    flush(THREE, g, B);

    /* five road-wheel axles, both sides in one group, axis +Y */
    for (i = 0; i < WX.length; i++) {
      var WB = { paint: new Bin(T.paint, true), rubber: new Bin(T.rubber, false) };
      for (sgn = -1; sgn <= 1; sgn += 2) {
        cylY(WB.rubber, 0, sgn > 0 ? 1.05 : -1.15, sgn > 0 ? 1.15 : -1.05, 0, WRAD, 18);
        cylY(WB.rubber, 0, sgn > 0 ? 1.33 : -1.43, sgn > 0 ? 1.43 : -1.33, 0, WRAD, 18);
        cylY(WB.paint, 0, sgn > 0 ? 1.15 : -1.33, sgn > 0 ? 1.33 : -1.15, 0, 0.09, 8);
        cylY(WB.paint, 0, sgn > 0 ? 1.43 : -1.46, sgn > 0 ? 1.46 : -1.43, 0, 0.31, 18);
        cylY(WB.paint, 0, sgn > 0 ? 1.46 : -1.49, sgn > 0 ? 1.49 : -1.46, 0, 0.11, 10);
      }
      sg = new THREE.Group();
      sg.name = "roadwheel";
      sg.position.set(WX[i], 0, WZ);
      flush(THREE, sg, WB);
      g.add(sg);
    }

    /* the gun: ONLY mantlet + barrel train; origin is the mantlet pivot on the front plate */
    var TB = { paint: new Bin(T.paint, true) };
    sphere(TB.paint, [0.12, 0, 0], 0.34, 14, 9);
    cyl(TB.paint, [0.35, 0, 0], [1.00, 0, 0], 0.125, 0.115, 16);
    cyl(TB.paint, [1.00, 0, 0], [5.07, 0, 0], 0.105, 0.072, 20);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(PV[0], PV[1], PV[2]);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }
  return { build: build };
})();

/* measured X extent: stern/track -3.045 to muzzle 1.332 + 5.07 = 6.40 -> 9.445 m */
UNIT_MODELS["pact_e50_spg"] = { len: 9.445, build: HeroSU100.build };
