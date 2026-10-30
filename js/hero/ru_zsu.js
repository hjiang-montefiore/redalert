/* ============ ru_zsu.js - HERO models: the Soviet self-propelled AA guns ============
   Two vehicles, one file, both with the gun turret as the trained node:
     pact_e50_spaag   ZSU-57-2 "Sparka"   (in service 1955)  T-54 running gear, open-topped turret, twin 57 mm S-68
                      HeroZsu below, NOT yet redone to the full-quality standard
     pact_e60_spaag   ZSU-23-4 "Shilka"   (in service 1965)  HeroShilka at the foot of the file, redone
                      2026-10-30; its own header gives the references.  The notes on the
                      Shilka in this header are the OLD model's and no longer hold.

   What each feature rests on (Wikimedia Commons photographs fetched for this
   model: ZSU-57-2.JPG - Polish museum piece, wheels and turret from the front
   left; ZSU-57-2 Hun 2010 02.jpg - Hungarian, 3/4 front view with the guns
   raised; ZSU-23-4 Shilka 06.jpg and ZSU-23-4 Shilka -01.jpg - two left side
   views of the museum hulls; plus the published data tables for both):
     ZSU-57-2: a shortened T-54 hull with FOUR large twin-disc road wheels a
       side, the drive sprocket at the rear and the idler at the front, flat
       mudguards over the tracks, a sloped glacis; a big low turret with
       vertical walls, an OPEN TOP, a rounded front with a mantlet, and the
       two long 57 mm barrels in a shared mount with muzzle brakes.  The photos
       show the barrels raised; they are drawn at a low travel elevation of 20 degrees.  Published:
       hull 6.22 m, width 3.27 m, height 2.75 m, 28 t.  No radar, no marking.
     ZSU-23-4: a low boxy hull, vertical upper sides overhanging the tracks,
       six equal road wheels a side, small idler in front, sprocket at the
       rear, no return rollers visible in the photos; a wide flat turret with
       sloping flanks, hatch cupola on the roof, the gun pairs left and right
       of the front, and the RPK-2 radar dish on a stalk at the turret's
       rear.  The dish is drawn stowed, laid back over the rear of the turret as in the
       two side photographs; the GM-575 drives from the FRONT sprocket.  Published: length
       6.54 m, width 3.125 m, height 2.25 m with the radar lowered, 19 t.
   Not confirmed and so not drawn: return rollers on either hull, stowage and
   tools, tow cables, camouflage patterns (both are plain Soviet green, the
   period finish), canvas on the 57-2 turret, any markings or numerals.
   Barrel elevation is a choice (the engine trains the turret in azimuth only):
   57-2 guns at 20 degrees, Shilka guns at 12 degrees (low, so that the
   engine, which scales a vehicle by its X extent, draws the hull large).

   Built from a handful of primitives per MATERIAL: the hull, each pair of
   road wheels and the turret are separate nodes ("turret", "roadwheel").  Team
   colour is the plain C.team material, on the engine deck / turret roof.

   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.
   ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroZsu = (function () {
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

  /* ------------------------------------------------------------ variants */
  var VARIANTS = {
    Z57: { paint: "#4a5337", R: 0.405, wheels: [1.45, 0.35, -0.75, -1.85], xs: -2.72, xi: 2.62,
           trackW: 0.58, trackY: 1.345, sprF: false, hole: 0.15, holes: 6, el: 20 }
    /* the Shilka is HeroShilka, below */
  };

  Bin.prototype.shift = function (dx, dy, dz) {
    for (var i = 0; i < this.P.length; i += 3) { this.P[i] += dx; this.P[i + 1] += dy; this.P[i + 2] += dz; }
  };

  /* a convex prism: profile in the XZ plane (counter-clockwise), from y0 to y1 */
  function prism(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) { V.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]); }
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) { F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]); }
    solid(bin, V, F);
  }
  /* a convex prism standing on the XY plane: profile in XY, from z0 to z1 */
  function prismZ(bin, pts, z0, z1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) { V.push([pts[i][0], pts[i][1], z0], [pts[i][0], pts[i][1], z1]); }
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) { F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]); }
    solid(bin, V, F);
  }
  /* a tube along a direction */
  function tube(bin, P, d, a, b, r0, r1, seg) {
    cyl(bin, [P[0] + d[0] * a, P[1] + d[1] * a, P[2] + d[2] * a], [P[0] + d[0] * b, P[1] + d[1] * b, P[2] + d[2] * b], r0, r1, seg);
  }

  /* materials: four and no more; team is C.team, untouched */
  function materials(THREE, C, V) {
    var T = {};
    T.paint = new THREE.MeshStandardMaterial({ color: V.paint, roughness: 0.9, metalness: 0.05 });
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, false), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
  }

  /* ------------------------------------------------------- running gear */
  /* track run of one side: belts round the sprocket and idler, with cleats */
  function trackSide(B, V, sgn) {
    var R = V.R, rt = R + 0.07, zc = rt, xr = V.xs, xf = V.xi, yc = sgn * V.trackY, w = V.trackW;
    var y0 = yc - w / 2, y1 = yc + w / 2, ro = rt - 0.045, k, a0, a1, x, N = 5;
    belt(B.dark, xr, zc - ro, xf, zc - ro, y0, y1, 0.05);
    belt(B.dark, xr, zc + ro, xf, zc + ro, y0, y1, 0.05);
    for (k = 0; k < N; k++) {
      a0 = -Math.PI / 2 + k / N * Math.PI; a1 = -Math.PI / 2 + (k + 1) / N * Math.PI;
      belt(B.dark, xf + Math.cos(a0) * ro, zc + Math.sin(a0) * ro, xf + Math.cos(a1) * ro, zc + Math.sin(a1) * ro, y0, y1, 0.05);
      belt(B.dark, xr - Math.cos(a0) * ro, zc + Math.sin(a0) * ro, xr - Math.cos(a1) * ro, zc + Math.sin(a1) * ro, y0, y1, 0.05);
    }
    for (x = xr + 0.05; x < xf - 0.03; x += 0.14) {
      box(B.dark, x, x + 0.055, y0 - 0.01, y1 + 0.01, 0.0, 0.035);
      box(B.dark, x, x + 0.055, y0 - 0.01, y1 + 0.01, 2 * rt - 0.035, 2 * rt);
    }
    /* sprocket (rear) and idler (front): toothed ring and a green disc */
    cylY(B.dark, xr, y0 + 0.04, y1 - 0.04, zc, rt - 0.09, 24);
    cylY(B.dark, xf, y0 + 0.04, y1 - 0.04, zc, rt - 0.09, 24);
    var yo = sgn * (Math.abs(yc) + w / 2 - 0.03);
    /* the 57-2 (T-54 gear) drives from the rear; the Shilka (GM-575) from the front */
    var xs = V.sprF ? xf : xr, xd = V.sprF ? xr : xf, y2 = yo + sgn * 0.03;
    cylY(B.paint, xs, Math.min(yo, y2), Math.max(yo, y2), zc, rt - 0.2, 24);
    cylY(B.paint, xd, Math.min(yo, y2), Math.max(yo, y2), zc, rt - 0.14, 24);
    /* sprocket teeth: blocks round the rim */
    for (k = 0; k < 12; k++) {
      a0 = k / 12 * TAU;
      rbox2(B.dark, xs + Math.cos(a0) * (rt - 0.06), zc + Math.sin(a0) * (rt - 0.06), a0, y0 + 0.06, y1 - 0.06);
    }
  }
  /* a small tooth block at (x, z) turned by a about Y */
  function rbox2(bin, x, z, a, y0, y1) {
    var c = Math.cos(a), s = Math.sin(a), q = [[-0.035, -0.03], [0.035, -0.03], [0.035, 0.03], [-0.035, 0.03]], P = [], k, e;
    for (k = 0; k < 8; k++) {
      e = q[k % 4];
      P.push([x + e[0] * c - e[1] * s, k < 4 ? y0 : y1, z + e[0] * s + e[1] * c]);
    }
    hexa(bin, P);
  }
  /* one spinning road wheel pair, drawn about its own axle (local Y) */
  function wheelMesh(B, V, twin) {
    var R = V.R, sg, ys, w = twin ? 0.2 : 0.3, off = twin ? 0.17 : 0;
    for (sg = -1; sg <= 1; sg += 2) {
      ys = sg * V.trackY;
      if (twin) {
        cylY(B.dark, 0, ys + off - w / 2, ys + off + w / 2, 0, R, 24);
        cylY(B.dark, 0, ys - off - w / 2, ys - off + w / 2, 0, R, 24);
      } else cylY(B.dark, 0, ys - w / 2, ys + w / 2, 0, R, 24);
    }
  }
  /* lightening holes and a hub on the face of a wheel disc */
  function capHoles(B, V, x, zc, ye, sg) {
    var k, a, r = V.R * 0.5, y0 = ye + sg * 0.025, y1 = ye + sg * 0.036;
    for (k = 0; k < V.holes; k++) {
      a = k / V.holes * TAU;
      cylY(B.dark, x + Math.cos(a) * r, Math.min(y0, y1), Math.max(y0, y1), zc + Math.sin(a) * r, V.hole * V.R / 0.36 * 0.55, 6);
    }
    cylY(B.dark, x, Math.min(y0, y1 + sg * 0.02), Math.max(y0, y1 + sg * 0.02), zc, V.R * 0.2, 14);
  }
  /* static green disc caps over the wheel rims (a flat disc hides the spin) */
  function wheelCaps(B, V, x, twin) {
    var R = V.R, sg, ys, zc = R + 0.07, off = twin ? 0.17 : 0, w = twin ? 0.2 : 0.3, ye;
    for (sg = -1; sg <= 1; sg += 2) {
      ys = sg * V.trackY;
      ye = ys + sg * (off + w / 2);
      cylY(B.paint, x, Math.min(ye, ye + sg * 0.03), Math.max(ye, ye + sg * 0.03), zc, R * 0.74, 24);
      capHoles(B, V, x, zc, ye, sg);
      if (twin) {
        ye = ys - sg * (off + w / 2);
        cylY(B.paint, x, Math.min(ye, ye - sg * 0.03), Math.max(ye, ye - sg * 0.03), zc, R * 0.74, 24);
      }
    }
  }

  /* ---------------------------------------------------------------- 57-2 */
  var Z57T = { x: 0.10, z: 1.40 };
  function hull57(V, B) {
    var i;
    /* centre hull: sloped glacis, flat deck, vertical tail */
    prism(B.paint, [[-3.11, 0.50], [2.55, 0.45], [3.11, 0.72], [3.11, 0.86], [2.35, 1.38], [-3.11, 1.34]], -1.10, 1.10);
    /* mudguards over the tracks, front ends turned up */
    prism(B.paint, [[-3.0, 0.92], [2.75, 0.92], [3.1, 1.03], [3.1, 1.06], [-3.0, 0.99]], -1.64, -1.10);
    prism(B.paint, [[-3.0, 0.92], [2.75, 0.92], [3.1, 1.03], [3.1, 1.06], [-3.0, 0.99]], 1.10, 1.64);
    trackSide(B, V, 1); trackSide(B, V, -1);
    for (i = 0; i < V.wheels.length; i++) wheelCaps(B, V, V.wheels[i], true);
    /* driver's hatch and vision block, front left */
    cylZ(B.paint, 2.0, 0.45, 1.34, 1.42, 0.24, 14);
    box(B.glass, 2.22, 2.27, 0.35, 0.56, 1.36, 1.43);
    /* engine deck: louvres and the team panel */
    box(B.dark, -2.00, -1.55, -0.85, 0.85, 1.34, 1.40);
    box(B.team, -2.95, -2.15, -0.75, 0.75, 1.34, 1.355);
    /* turret ring */
    cylZ(B.dark, Z57T.x, 0, 1.34, 1.45, 1.22, 20);
    /* lamp and tow hooks on the nose */
    box(B.dark, 3.04, 3.12, 0.60, 0.80, 0.62, 0.72);
    box(B.dark, 3.04, 3.12, -0.80, -0.60, 0.62, 0.72);
  }
  function turret57(V, B) {
    var plan = [[1.55, -0.60], [1.55, 0.60], [1.00, 1.25], [-1.15, 1.30], [-1.45, 1.00], [-1.45, -1.00], [-1.15, -1.30], [1.00, -1.25]];
    var n = plan.length, i, a, b, dx, dy, l, ang, z0 = 1.40, z1 = 2.55, e = V.el * Math.PI / 180;
    var d = [Math.cos(e), 0, Math.sin(e)], yy, sg, P, ox = Z57T.x;
    for (i = 0; i < n; i++) {
      a = plan[i]; b = plan[(i + 1) % n];
      dx = b[0] - a[0]; dy = b[1] - a[1]; l = Math.sqrt(dx * dx + dy * dy); ang = Math.atan2(dy, dx);
      rbox(B.paint, (a[0] + b[0]) / 2 + ox * 0, (a[1] + b[1]) / 2, l / 2 + 0.04, 0.045, ang, z0, i === 0 ? z1 - 0.2 : z1);
      /* top rim */
      rbox(B.paint, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, l / 2 + 0.04, 0.075, ang, z1 - 0.06, z1 + 0.03);
    }
    prismZ(B.dark, [[1.3, -0.5], [1.3, 0.5], [0.9, 1.15], [-1.1, 1.2], [-1.35, 0.95], [-1.35, -0.95], [-1.1, -1.2], [0.9, -1.15]], 1.45, 1.52);
    /* mantlet across the front, trunnion boxes, breech blocks and seats */
    box(B.paint, 1.42, 1.75, -0.62, 0.62, 1.80, 2.38);
    for (sg = -1; sg <= 1; sg += 2) {
      yy = sg * 0.34; P = [1.62, yy, 2.08];
      cylY(B.dark, 1.62, yy - 0.12, yy + 0.12, 2.08, 0.15, 12);
      tube(B.dark, P, d, -0.55, 0.0, 0.07, 0.07, 14);
      box(B.dark, 0.55, 1.2, yy - 0.12, yy + 0.12, 1.55, 2.0);
      tube(B.paint, P, d, 0.0, 0.85, 0.09, 0.085, 12);
      tube(B.dark, P, d, 0.85, 3.85, 0.046, 0.046, 14);
      tube(B.dark, P, d, 3.85, 4.2, 0.075, 0.075, 12);
    }
    /* cross brace between the barrels, the gunners' sights and the sight hood */
    box(B.paint, 1.55, 1.80, -0.38, 0.38, 2.38, 2.50);
    box(B.glass, 1.75, 1.80, 0.50, 0.58, 2.02, 2.12);
    box(B.glass, 1.75, 1.80, -0.58, -0.50, 2.02, 2.12);
    box(B.paint, 0.2, 0.55, 0.65, 1.0, 2.55, 2.75);
    box(B.glass, 0.52, 0.57, 0.70, 0.95, 2.60, 2.70);
    /* seats */
    box(B.dark, -0.9, -0.5, -0.7, -0.3, 1.52, 1.85);
    box(B.dark, -0.9, -0.5, 0.3, 0.7, 1.52, 1.85);
    B.paint.shift(-Z57T.x, 0, -Z57T.z); B.dark.shift(-Z57T.x, 0, -Z57T.z); B.glass.shift(-Z57T.x, 0, -Z57T.z);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which], is57 = true, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), TB = bins(T), i, wg, WB, tg, z = V.R + 0.07, TT = Z57T;
    hull57(V, HB);
    flush(THREE, g, HB);
    for (i = 0; i < V.wheels.length; i++) {
      WB = new Bin(T.dark, false);
      wheelMesh({ dark: WB }, V, is57);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(V.wheels[i], 0, z);
      flush(THREE, wg, { dark: WB });
      g.add(wg);
    }
    turret57(V, TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TT.x, 0, TT.z);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e50_spaag"] = {
  len: 8.9,
  build: function (THREE, M, C) { return HeroZsu.build(THREE, M, C, "Z57"); }
};

/* ========== HeroShilka - HERO model: ZSU-23-4 Shilka (pact_e60_spaag) ===========
   The radar-directed quad 23 mm SPAAG on the GM-575 chassis, in service 1965.

   REDO 2026-10-30 (full-quality procedure).  References, Wikimedia Commons at width 960,
   cached in scratchpad/q_zsu_ref:
     P1  "ZSU-23-4 Shilka 01.jpg" - head-on from the front left, radar raised: the wide
         flat turret over the whole hull width, the four 2A7 barrels in two stacked pairs
         between two armoured cheek boxes at the turret's front corners, the dish on its
         A-frame at the rear right of the roof, the domed hatch, the shallow upper glacis
         with the big rounded driver's hatch on the left, the pair of lamps on the right,
         the steep lower nose plate with its towing eyes.
     P2  "ZSU-23-4 Shilka 07.jpg" - from the rear right: the dish raised, the big exhaust
         silencer lying across the top of the rear plate, the rear plate's stowage
         panels, the rear sprocket, the turret's rear stowage box.
     P3  "ZSU 23-4 'Shilka' ... Museum of Army Flying ... .jpg" - front left 3/4: the wide
         superstructure overhanging the track with its vertical sides and rounded access
         panels, the dished SPOKED road wheels with rubber tyres, the spoked front idler
         raised, the lobed drive sprocket at the REAR, no return rollers.
     P4  "Zsu-23-4-radar.jpg" (US DoD, Grenada 1983) - near side-on from the right, radar
         raised: scaled from the published 6.535 m length (0.0107 m a pixel, which also
         gives the 0.66 m road wheel and the published height): six road wheels at a 0.72 m
         pitch, the idler 0.62 m ahead of the first wheel and raised, the sprocket 0.72 m
         behind the last and the hull running on 0.75 m behind it; fender line 0.91 m, hull deck 1.82 m, turret roof 2.41 m, the
         dish about 1.0 m across centred about 3.1 m up; turret ring 0.17 m behind
         mid-hull.
   Published (en.wikipedia ZSU-23-4 infobox): length 6.535 m, width 3.125 m, height 2.576 m,
   3.572 m with the radar raised, ground clearance 375 mm, 19 t, individual torsion bars,
   four 23 mm 2A7 (the AZP-23 Amur mount), V-6R diesel.

   CORRECTIONS against the previous model (the references do not support it):
   - the drive sprocket is at the REAR (P2, P3, P4: the lobed wheel under the radar end);
     the old model drove from the front;
   - six 0.66 m wheels at 0.72 m (P4), not 0.72 m wheels at 0.76 m; the idler raised;
   - the superstructure spans the full width over the tracks with vertical sides (P1, P3);
     deck 1.82 m (P4), the old roof sat low;
   - the barrels are two stacked PAIRS between armoured cheek boxes (P1, P3), not a pair
     each side of the front;
   - the radar is drawn RAISED on its A-frame (P1, P2, P4 all show it up; it is what the
     vehicle is known by), the old model laid it back stowed;
   - the exhaust silencer across the rear and the turret's rear box were missing (P2, P4).

   Recognition list (what makes it read at game zoom, and its source):
     1. the dish on its A-frame standing high over the turret rear - P1, P2, P4
     2. four long thin barrels in two stacked pairs between two cheek boxes - P1, P3
     3. the wide flat turret, sloped flanks, nearly the hull's width - P1, P4
     4. six dished spoked road wheels, raised front idler, rear sprocket, no return
        rollers - P3, P4
     5. the boxy hull overhanging the tracks, vertical sides, rounded access panels - P3
     6. the shallow glacis with the big rounded driver's hatch on the left - P1
     7. the silencer across the top of the rear plate - P2
   Paint: Soviet green.  P2's green, sampled (lit #66704f, shade #3c4430), taken to about
   0.85 of level -> base #4d5838.  P1, P3 and P4 wear museum, desert or local camouflage:
   not drawn.  No numbers or markings (P4 carries "415": not drawn).
   NOT CONFIRMED, drawn as judgement calls: the turret's plan length and the cheek boxes'
   exact faces (no plan view); the dish's tilt (drawn looking forward, 12 degrees up); the
   lamp and towing-eye positions; the access panels' count; the barrels' elevation (12
   degrees, a choice: the engine trains the turret in azimuth only); the published 6.535 m
   is taken to run over the rear silencer.

   Materials: PAINT (canvas texture), DARK (track, guns, fittings), WHEEL (tyres, discs,
   ribs by vertex colour) and the team colour exactly as handed in (C.team): two strips
   (rear deck, turret roof).
   Nodes: "turret" (trains, origin on the ring centre at the deck, guns along +X) and six
   "roadwheel" groups (axle along local Y, each holding both sides).
   Draw calls: hull 3 + turret 3 + 6 wheels = 12.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

var HeroShilka = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var PAINT = { base: "#4d5838", blots: ["#434d30", "#57623f"], seed: 234 };
  /* running gear (P3, P4) */
  var TY = 1.33, TW = 0.19;
  var XW = [2.02, 1.30, 0.58, -0.14, -0.86, -1.58], ZW = 0.33, RW = 0.33;
  var IDL = { x: 2.64, z: 0.60, r: 0.24 }, SPR = { x: -2.30, z: 0.42, r: 0.30 };
  /* hull (P4): fender line, deck, superstructure half width, nose and rear plates */
  var FZ = 0.91, DECK = 1.82, SW = 1.52, LW = 1.02, NOSE = 2.97, REAR = -3.05, BELLY = 0.375;
  var TX = -0.17, EL = 12 * Math.PI / 180;

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
  function addHull(B) {
    var s, i, x;
    /* the lower hull between the tracks: belly, the steep lower nose plate (P1), the
       rear plate leaning in at its foot */
    prismY(B.paint, [[REAR + 0.18, BELLY], [2.52, BELLY], [NOSE, 1.22], [NOSE - 0.02, 1.25], [REAR, 1.25], [REAR, 0.62]], -LW, LW);
    /* the superstructure over the full width (P1, P3, P4): vertical sides from the fender
       line to the deck, the shallow upper glacis to the nose, the rear plate */
    prismY(B.paint, [[REAR, FZ], [2.62, FZ], [NOSE, 1.20], [NOSE, 1.27], [1.52, DECK], [REAR + 0.22, DECK], [REAR, DECK - 0.20]], -SW, SW);
    for (s = -1; s <= 1; s += 2) {
      /* the fender lip along the foot of the side (P3) */
      box(B.dark, REAR + 0.05, 2.60, s > 0 ? SW - 0.01 : -SW - 0.02, s > 0 ? SW + 0.02 : -SW + 0.01, FZ - 0.02, FZ + 0.03);
      /* the front mudguard turned down ahead of the idler (P1, P3) */
      belt(B.paint, 2.60, FZ, 3.12, FZ - 0.28, s * 1.10, s * SW, 0.03);
      /* three rounded access panels on each side (P3) and their handles */
      [1.25, 0.20, -1.55].forEach(function (px) {
        var yo = s * (SW + 0.012), ya = Math.min(yo, s * SW), yb = Math.max(yo, s * SW);
        box(B.paint, px - 0.26, px + 0.26, ya, yb, 1.18, 1.62);
        box(B.dark, px - 0.06, px + 0.06, s > 0 ? yb : ya - 0.02, s > 0 ? yb + 0.02 : ya, 1.48, 1.52);
      });
      /* the top edge strip of the side */
      box(B.dark, REAR + 0.22, 1.50, s > 0 ? SW - 0.03 : -SW, s > 0 ? SW : -SW + 0.03, DECK - 0.015, DECK + 0.005);
    }
    /* --- glacis (P1): the big rounded driver's hatch on the left, two lamps on the right,
       towing eyes on the lower nose plate --- */
    var ang = Math.atan2(DECK - 1.27, NOSE - 1.52), u = [Math.cos(ang), 0, -Math.sin(ang)], w = [Math.sin(ang), 0, Math.cos(ang)];
    function onGlacis(gx) { return 1.27 + (NOSE - gx) * Math.tan(ang); }
    slab(B.paint, [2.10, 0.78, onGlacis(2.10) + 0.05], u, [0, 1, 0], w, 0.36, 0.40, 0.05);
    slab(B.paint, [2.10, 0.78, onGlacis(2.10) + 0.11], u, [0, 1, 0], w, 0.30, 0.34, 0.03);
    slab(B.dark, [1.78, 0.78, onGlacis(1.78) + 0.12], u, [0, 1, 0], w, 0.03, 0.22, 0.04);
    for (i = -1; i <= 1; i += 2) {
      cyl(B.paint, [2.62, -0.70 + i * 0.13, onGlacis(2.62) + 0.02], [2.80, -0.70 + i * 0.13, onGlacis(2.62) + 0.06], 0.075, 0.075, 12);
      cyl(B.dark, [2.80, -0.70 + i * 0.13, onGlacis(2.62) + 0.06], [2.81, -0.70 + i * 0.13, onGlacis(2.62) + 0.06], 0.062, 0.062, 12);
    }
    [-0.85, -0.25, 0.25, 0.85].forEach(function (ey) {
      cyl(B.dark, [2.86, ey - 0.07, 0.86], [2.86, ey + 0.07, 0.86], 0.06, 0.06, 8);
      box(B.dark, 2.74, 2.84, ey - 0.06, ey + 0.06, 0.82, 0.90);
    });
    /* --- engine deck: louvred intake and grilles behind the turret --- */
    box(B.dark, -2.55, -1.95, -1.15, 1.15, DECK - 0.01, DECK + 0.012);
    for (i = 0; i < 6; i++) box(B.paint, -2.52 + i * 0.10, -2.47 + i * 0.10, -1.12, 1.12, DECK + 0.012, DECK + 0.035);
    box(B.team, -2.45, -2.05, 1.20, 1.45, DECK, DECK + 0.02);
    /* --- rear (P2): the exhaust silencer across the top of the rear plate on its
       brackets, two stowage panels, towing hooks --- */
    cyl(B.paint, [REAR - 0.17, -0.45, DECK - 0.36], [REAR - 0.17, 1.40, DECK - 0.36], 0.16, 0.16, 16);
    cyl(B.dark, [REAR - 0.17, 1.40, DECK - 0.36], [REAR - 0.17, 1.46, DECK - 0.36], 0.10, 0.10, 12);
    [-0.25, 0.55, 1.20].forEach(function (by) { box(B.dark, REAR - 0.20, REAR, by - 0.04, by + 0.04, DECK - 0.50, DECK - 0.30); });
    box(B.paint, REAR - 0.03, REAR, -1.05, -0.25, 0.95, 1.30);
    box(B.paint, REAR - 0.03, REAR, 0.20, 1.00, 0.95, 1.30);
    for (s = -1; s <= 1; s += 2) box(B.dark, REAR - 0.12, REAR, s * 0.85 - 0.07, s * 0.85 + 0.07, 0.62, 0.74);
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
        /* the link with its grouser and the centre guide horn (P3) */
        belt(B.dark, px - dx * 0.05, pz - dz * 0.05, px + dx * 0.05, pz + dz * 0.05, y - TW - 0.01, y + TW + 0.01, 0.07);
        belt(B.dark, px - dx * 0.025 - dz * 0.06, pz - dz * 0.025 + dx * 0.06, px + dx * 0.025 - dz * 0.06, pz + dz * 0.025 + dx * 0.06, y - 0.025, y + 0.025, 0.05);
      }
      /* the lobed drive sprocket at the REAR (P2, P3, P4) */
      cylY(B.dark, SPR.x, y - 0.13, y + 0.13, SPR.z, SPR.r - 0.05, 18);
      for (i = 0; i < 12; i++) {
        var ta = i / 12 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [SPR.x + ca * (SPR.r - 0.02), y, SPR.z + sa * (SPR.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.04, 0.10, 0.03);
      }
      cylY(B.paint, SPR.x, y + s * 0.13, y + s * 0.18, SPR.z, 0.17, 14);
      /* the spoked front idler, raised (P3) */
      cylY(B.paint, IDL.x, y - 0.15, y + 0.15, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.15, y + s * 0.20, IDL.z, 0.07, 10);
      box(B.dark, IDL.x - 0.30, IDL.x, y + s * 0.22 - 0.03, y + s * 0.22 + 0.03, IDL.z - 0.04, IDL.z + 0.04);
    }
  }
  /* road wheel (P3): rubber tyre, dished disc with twelve ribs, hub */
  var TYRE = [0.13, 0.135, 0.125];
  function addWheel(W) {
    var s, y, i, a, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIB = [rr * 1.32, gg * 1.32, bb * 1.32];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.15, y + 0.15, 0, RW, 20);
      W.col = BODY;
      cyl(W, [0, y + s * 0.15, 0], [0, y + s * 0.19, 0], RW - 0.05, 0.10, 20);
      W.col = RIB;
      for (i = 0; i < 12; i++) {
        a = i / 12 * TAU;
        slab(W, [Math.cos(a) * 0.17, y + s * 0.17, Math.sin(a) * 0.17], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.11, 0.015, 0.012);
      }
      W.col = TYRE;
      cylY(W, 0, y + s * 0.19, y + s * 0.22, 0, 0.06, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* origin on the ring centre at the deck.  The body (P1, P4): vertical lower walls, the
     flanks sloping in to a flat roof 0.59 m up, nearly the hull's width; the two armoured
     cheek boxes at the front corners with the gun slot between them; the rear box. */
  var TH = 0.59;
  function bodyRing(x, hw) {
    return [[x, -hw, 0], [x, hw, 0], [x, hw, 0.24], [x, hw - 0.30, TH], [x, -(hw - 0.30), TH], [x, -hw, 0.24]];
  }
  function addTurret(B) {
    var s, i;
    loftN(B.paint, [bodyRing(-1.50, 1.20), bodyRing(-1.35, 1.38), bodyRing(0.70, 1.38)]);
    /* the cheek boxes: their fronts lean back from the foot to the roof (P1, P3) */
    for (s = -1; s <= 1; s += 2) {
      var yi = s * 0.36, yo = s * 1.36;
      prismY(B.paint, [[0.60, 0], [1.22, 0], [1.30, 0.12], [1.02, TH - 0.02], [0.60, TH - 0.02]], Math.min(yi, yo), Math.max(yi, yo));
      /* the vision block on each cheek's roof */
      box(B.dark, 0.78, 0.92, s * 0.80 - 0.10, s * 0.80 + 0.10, TH - 0.02, TH + 0.06);
    }
    /* the gun slot's floor and back wall */
    box(B.paint, 0.60, 1.00, -0.36, 0.36, 0, 0.10);
    /* the rear stowage box (P2, P4) */
    box(B.paint, -1.85, -1.42, -1.15, 1.15, 0.06, 0.46);
    box(B.dark, -1.86, -1.84, -1.0, 1.0, 0.28, 0.31);
    /* roof: the domed hatch on the right (P1), the left hatch, periscopes, team strip */
    cylZ(B.paint, -0.55, -0.70, TH, TH + 0.06, 0.30, 18);
    cyl(B.paint, [-0.55, -0.70, TH + 0.06], [-0.55, -0.70, TH + 0.16], 0.28, 0.16, 18);
    cylZ(B.paint, -0.55, 0.70, TH, TH + 0.05, 0.27, 16);
    for (i = 0; i < 3; i++) box(B.dark, 0.05 + i * 0.16, 0.15 + i * 0.16, -0.30, -0.18, TH, TH + 0.07);
    box(B.team, -1.25, -0.85, 0.30, 0.95, TH, TH + 0.015);

    /* --- the AZP-23 quad mount (P1, P3): a cradle in the slot, four 2A7 barrels in two
       stacked pairs, each with its jacket and flash hider; elevated EL --- */
    var P0 = [0.82, 0, 0.30], d = [Math.cos(EL), 0, Math.sin(EL)], up = [-Math.sin(EL), 0, Math.cos(EL)];
    function at(a, y, h) { return [P0[0] + d[0] * a + up[0] * h, y, P0[2] + d[2] * a + up[2] * h]; }
    slab(B.dark, at(0.10, 0, 0.04), d, [0, 1, 0], up, 0.40, 0.30, 0.20);
    [[-0.16, 0.10], [0.16, 0.10], [-0.16, -0.06], [0.16, -0.06]].forEach(function (g) {
      cyl(B.dark, at(0.40, g[0], g[1]), at(1.05, g[0], g[1]), 0.055, 0.050, 10);
      cyl(B.dark, at(1.05, g[0], g[1]), at(2.10, g[0], g[1]), 0.030, 0.028, 8);
      cyl(B.dark, at(2.10, g[0], g[1]), at(2.30, g[0], g[1]), 0.048, 0.044, 10);
    });

    /* --- the RPK-2 Tobol radar, raised (P1, P2, P4): the A-frame from the roof's rear
       right, the dish about 1.0 m across in its drum, looking forward 12 degrees up --- */
    var MX = -1.20, MY = -0.20, DZ = 0.86;
    for (s = -1; s <= 1; s += 2) cyl(B.dark, [MX - 0.10, MY + s * 0.30, TH], [MX, MY + s * 0.08, DZ - 0.10], 0.035, 0.03, 8);
    box(B.paint, MX - 0.20, MX + 0.20, MY - 0.30, MY + 0.30, TH, TH + 0.12);
    cylZ(B.dark, MX, MY, DZ - 0.16, DZ - 0.04, 0.10, 10);
    var dn = [Math.cos(0.21), 0, Math.sin(0.21)], C0 = [MX + 0.05, MY, DZ + 0.30];
    function dp(a) { return [C0[0] + dn[0] * a, C0[1], C0[2] + dn[2] * a]; }
    cyl(B.paint, dp(-0.28), dp(0.10), 0.47, 0.50, 24);
    cyl(B.paint, dp(-0.40), dp(-0.28), 0.30, 0.47, 20);
    cyl(B.dark, dp(0.10), dp(0.105), 0.46, 0.46, 24, true);
    cyl(B.dark, dp(0.02), dp(0.104), 0.08, 0.44, 24);
    cyl(B.dark, dp(0.0), dp(0.30), 0.02, 0.02, 6);
    cyl(B.dark, dp(-0.15), dp(-0.15).map(function (v, k) { return k === 2 ? v - 0.42 : v; }), 0.05, 0.05, 8);
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
    tg.position.set(TX, 0, DECK);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build };
})();

/* len: the measured X extent of the build, the rear silencer (-3.38) to the front
   mudguards (3.13); the published length is 6.535 m */
UNIT_MODELS["pact_e60_spaag"] = { len: 6.51, build: HeroShilka.build };
