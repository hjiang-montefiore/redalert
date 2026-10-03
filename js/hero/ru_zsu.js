/* ============ ru_zsu.js - HERO models: the Soviet self-propelled AA guns ============
   Two vehicles, one file, both with the gun turret as the trained node:
     pact_e50_spaag   ZSU-57-2 "Sparka"   (in service 1955)  T-54 running gear, open-topped turret, twin 57 mm S-68
     pact_e60_spaag   ZSU-23-4 "Shilka"   (in service 1965)  GM-575 chassis, closed turret, four 23 mm AZP-23, RPK-2 radar

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
           trackW: 0.58, trackY: 1.345, sprF: false, hole: 0.15, holes: 6, el: 20 },
    Z23: { paint: "#4d5a38", R: 0.36, wheels: [1.95, 1.19, 0.43, -0.33, -1.09, -1.85], xs: -2.85, xi: 2.85,
           trackW: 0.38, trackY: 1.37, sprF: true, hole: 0.10, holes: 5, el: 12 }
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

  /* ------------------------------------------------------------- Shilka */
  var Z23T = { x: -0.05, z: 1.50 };
  function hull23(V, B) {
    var i;
    prism(B.paint, [[-3.27, 0.45], [2.9, 0.42], [3.27, 0.75], [3.27, 0.9], [-3.27, 0.9]], -1.20, 1.20);
    prism(B.paint, [[-3.27, 0.87], [3.27, 0.87], [3.27, 0.98], [2.55, 1.50], [-3.27, 1.50]], -1.48, 1.48);
    trackSide(B, V, 1); trackSide(B, V, -1);
    for (i = 0; i < V.wheels.length; i++) wheelCaps(B, V, V.wheels[i], false);
    /* driver's hatch front centre-left, vision blocks, engine deck louvres */
    cylZ(B.paint, 2.55, 0.5, 1.46, 1.54, 0.2, 14);
    box(B.glass, 3.18, 3.24, 0.35, 0.65, 0.97, 1.05);
    box(B.dark, -3.15, -1.8, -0.95, 0.95, 1.5, 1.545);
    /* rear plate and exhaust: two stubs on the tail */
    box(B.dark, -3.31, -3.27, -0.8, 0.8, 0.95, 1.4);
    /* side lockers on the hull flank */
    box(B.paint, -2.3, -1.2, 1.48, 1.54, 0.98, 1.38);
    box(B.paint, -2.3, -1.2, -1.54, -1.48, 0.98, 1.38);
    /* turret ring */
    cylZ(B.dark, Z23T.x, 0, 1.5, 1.57, 1.3, 20);
  }
  function turret23(V, B) {
    var e = V.el * Math.PI / 180, d = [Math.cos(e), 0, Math.sin(e)], sg, dz, P, k, c = [0.5, 0.0];
    /* lower and upper turret body, the flanks sloping inward */
    hexa(B.paint, [[-1.25, -1.40, 1.50], [1.55, -1.40, 1.50], [1.55, 1.40, 1.50], [-1.25, 1.40, 1.50],
                   [-1.25, -1.30, 1.92], [1.55, -1.30, 1.92], [1.55, 1.30, 1.92], [-1.25, 1.30, 1.92]]);
    hexa(B.paint, [[-1.2, -1.22, 1.92], [1.45, -1.22, 1.92], [1.45, 1.22, 1.92], [-1.2, 1.22, 1.92],
                   [-0.95, -1.0, 2.25], [1.15, -1.0, 2.25], [1.15, 1.0, 2.25], [-0.95, 1.0, 2.25]]);
    /* flank hatch covers */
    box(B.paint, -0.2, 0.7, 1.31, 1.35, 1.58, 1.84);
    box(B.paint, -0.2, 0.7, -1.35, -1.31, 1.58, 1.84);
    /* gun cradles and the four barrels: a pair of pairs, left and right */
    for (sg = -1; sg <= 1; sg += 2) {
      box(B.dark, 1.45, 1.80, sg * 0.55 - 0.24, sg * 0.55 + 0.24, 1.72, 2.10);
      for (dz = -1; dz <= 1; dz += 2) {
        P = [1.55, sg * 0.55 + dz * 0.12 * 0, 1.91 + dz * 0.11];
        P[1] = sg * 0.55 + dz * 0.0 + (dz === -1 ? -0.0 : 0);
        tube(B.paint, P, d, 0.0, 0.35, 0.07, 0.065, 10);
        tube(B.dark, P, d, 0.35, 1.8, 0.035, 0.035, 8);
        tube(B.dark, P, d, 1.8, 1.95, 0.052, 0.052, 8);
      }
      /* the second gun of each pair sits beside the first */
    }
    /* commander's hatch cupola and the optical sight on the front roof */
    cylZ(B.paint, 0.55, 0.55, 2.25, 2.37, 0.3, 16);
    cylZ(B.glass, 0.55, 0.55, 2.37, 2.40, 0.22, 12);
    box(B.paint, 0.95, 1.12, -0.25, 0.25, 2.25, 2.40);
    box(B.glass, 1.12, 1.16, -0.2, 0.2, 2.30, 2.36);
    box(B.glass, 1.52, 1.58, -0.18, 0.18, 1.62, 1.75);
    /* team panel on the roof behind the hatch */
    box(B.team, -0.50, 0.12, -0.95, -0.30, 2.25, 2.265);
    /* RPK-2 radar, stowed as the museum photographs show it: the dish laid
       back over the rear of the turret, its concave face up and aft */
    var n = [-0.62, 0, 0.78], cx = -0.98, cz = 2.62;
    box(B.paint, -1.00, -0.66, -0.28, 0.28, 2.25, 2.46);
    cyl(B.dark, [-0.84, 0, 2.46], [cx + 0.10, 0, cz - 0.14], 0.07, 0.06, 10);
    cyl(B.paint, [cx - n[0] * 0.13, 0, cz - n[2] * 0.13], [cx, 0, cz], 0.05, 0.42, 28);
    cyl(B.dark, [cx, 0, cz], [cx + n[0] * 0.30, 0, cz + n[2] * 0.30], 0.015, 0.015, 8);
    B.paint.shift(-Z23T.x, 0, -Z23T.z); B.dark.shift(-Z23T.x, 0, -Z23T.z);
    B.glass.shift(-Z23T.x, 0, -Z23T.z); B.team.shift(-Z23T.x, 0, -Z23T.z);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which], is57 = which === "Z57", T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), TB = bins(T), i, wg, WB, tg, z = V.R + 0.07, TT = is57 ? Z57T : Z23T;
    (is57 ? hull57 : hull23)(V, HB);
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
    (is57 ? turret57 : turret23)(V, TB);
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
UNIT_MODELS["pact_e60_spaag"] = {
  len: 6.7,
  build: function (THREE, M, C) { return HeroZsu.build(THREE, M, C, "Z23"); }
};
