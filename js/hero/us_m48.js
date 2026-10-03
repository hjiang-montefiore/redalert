/* ============================================================================
   us_m48.js  --  HERO MODEL: M48A2 Patton (nato_e50_mbt)

   The 1950s-60s US medium tank, drawn as the M48A2: the second Patton hull,
   not the M48 / M48A1 hull. Built from three photographs (Wikimedia Commons:
   "M 48 A2C, 4. PzBtl 364, Kuelsheim, 1978", "The M48 Patton tank is lifted
   gently aboard TS Nabob, NY - 1959", "M48A2 Patton III at Musee des Blindes,
   Saumur") and the published M48A2 figures (Hunnicutt's table, as the
   Wikipedia "M48 Patton" page quotes it): 341.8 in = 8.68 m overall with the
   gun forward (drawn 8.71 m), 143.0 in = 3.63 m over the tracks, 121.6 in =
   3.09 m over the cupola periscope (drawn 3.09 m, antenna not counted), 16.5
   in = 0.42 m ground clearance; hull 6.9 m (the armour_specs row), track 0.71 m
   wide, 2.92 m gauge.

   What the references support, and what is drawn:
     - the boat-shaped hull: one rounded cast bow, a long gently sloped glacis,
       flat roof, and wide flat track guards (fenders) that stand proud of the
       glacis at the front and end in a sloped mudguard;
     - the A2 hull specifics (Wikipedia "M48 Patton", M48A2 section): the engine
       deck is TWO large louvered access doors, and the return rollers are cut
       from five to THREE a side. The M48 / M48A1 hull had five. The photograph
       of the German M48A2C shows the three plainly;
     - six dual road wheels a side, rear drive sprocket, front idler (the
       sprocket is at the TAIL: the engine and transmission are aft);
     - the big cast turret, an elongated dome that overhangs the hull edge,
       with the rounded cast mantlet, the 90 mm gun M41 with a bore evacuator
       two thirds out and a plain cylindrical blast deflector on the muzzle, a
       coaxial machine gun, the rangefinder windows either side of the mantlet,
       and the low commander's cupola with the .50 in M2HB on its front,
       two lifting eyes on the front slope, a grab rail along each flank
       (Saumur and Kuelsheim), a ventilator on the rear crown and one whip.

   The cupola is the M1 (the same page: the M48A1/A2/A3/A5 table row lists the
   .50 in the M1 commander's cupola, and the roomier M1E1, without the M1's two
   rear vision blocks, came with the new-built M48A3). The coaxial gun is the
   M37/T153 .30, listed for the M48/A1/A2/A3.

   Not confirmed (flagged for the owner): the exact road wheel pitch (0.84 m,
   a 4.2 m span of wheel centres; Hunnicutt's 11.9 psi ground pressure at
   105,000 lb on two 28 in tracks implies a contact length near 4.0 m, so the
   pitch could be as low as 0.80 m); the muzzle device (the German M48A2C
   photo shows a plain cylindrical blast deflector, taken for the US fit);
   the hull length (6.9 m is the armour_specs figure, Hunnicutt's table has
   no hull length).

   Not drawn because the references do not settle it: the stowage rack on the
   turret rear (a rail shows in the 1959 photograph but may be a shipping
   rail), searchlight, tow cable, fuel drums (M48A1 only), taillight boxes
   (added late), smoke dischargers and the camouflage nets of the German tanks.

   Suspension: the track path, idler, sprocket and roller stations are the
   M60A1 hero's (the M60 kept the M48A2 running gear); the six road wheels sit
   at 0.84 m pitch.

   Built as per-material bins: the hull is 5 meshes, each road wheel pair is one
   node ("roadwheel", axle on local Y, the renderer spins them), the turret is
   one node ("turret", ring centre at its origin, gun along +X, 4 meshes).
   Team colour is the plain C.team material on the up-facing panels.

   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.
   ASCII only: a stray byte in a hex literal has broken this project before.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroM48 = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  /* ------------------------------------------------------- dimensions (m) */
  var TKY = 1.46, TKW = 0.71;            /* track centre line, track width   */
  var RW = 0.33, ZW = 0.43, BELT = 0.10; /* road wheel radius, axle, link    */
  var WX = [2.10, 1.26, 0.42, -0.42, -1.26, -2.10];   /* road wheel stations, 0.84 pitch */
  var ROL = [[1.55, 0.953], [0.15, 0.974], [-1.35, 0.996]];  /* 3 rollers   */
  var IDL = { x: 3.02, z: 0.72, r: 0.35 };    /* front idler                 */
  var SPR = { x: -3.06, z: 0.78, r: 0.36 };   /* rear drive sprocket         */
  var ZF = 1.27;                         /* top of the track guards          */
  var TRX = 0.15, ZR = 1.58;             /* turret ring centre, ring height  */
  var GZ = 0.58;                         /* gun axis above the ring          */

  /* hull stations: x, half width of the sides, half width of the roof, roof
     height, keel height. The nose is the last row. */
  var ST = [
    [-3.45, 1.02, 0.92, 1.16, 0.58],
    [-3.38, 1.12, 1.00, 1.28, 0.44],
    [-2.80, 1.16, 1.02, 1.38, 0.42],
    [-1.70, 1.17, 1.02, 1.46, 0.42],
    [-0.95, 1.17, 1.02, 1.58, 0.42],
    [ 1.25, 1.17, 1.00, 1.58, 0.42],
    [ 1.95, 1.14, 0.92, 1.51, 0.42],
    [ 2.45, 1.02, 0.76, 1.25, 0.45],
    [ 2.90, 0.82, 0.54, 1.02, 0.52],
    [ 3.24, 0.52, 0.30, 0.86, 0.62],
    [ 3.40, 0.24, 0.10, 0.77, 0.70],
    [ 3.45, 0.08, 0.03, 0.74, 0.72]
  ];
  function hullZ(x) {
    var i, f;
    for (i = 0; i + 1 < ST.length; i++) {
      if (x <= ST[i + 1][0]) {
        f = (x - ST[i][0]) / (ST[i + 1][0] - ST[i][0]);
        return ST[i][3] + f * (ST[i + 1][3] - ST[i][3]);
      }
    }
    return ST[ST.length - 1][3];
  }

  /* turret dome, in turret-local x (ring centre = 0): half width, height and
     the section exponent. u runs -1 (tail) to +1 (face). */
  var TXC = -0.05, TAF = 1.85, TAR = 1.78, TWM = 1.50, THM = 1.08, TE = 2.3;
  function tu(x) { return (x - TXC) / (x >= TXC ? TAF : TAR); }
  function tw(x) {
    var u = Math.abs(tu(x));
    return TWM * Math.pow(Math.max(0, 1 - Math.pow(u, 2.4)), 1 / 2.4);
  }
  function th(x) {
    var u = Math.abs(tu(x));
    return THM * (1 - (x >= TXC ? 0.40 : 0.62) * Math.pow(u, 2.2));
  }
  function tz(x, y) {                     /* dome height at (x, y)           */
    var w = tw(x), r;
    if (w <= 0.01) return 0;
    r = Math.min(1, Math.abs(y) / w);
    return th(x) * Math.pow(1 - Math.pow(r, TE), 1 / TE);
  }

  /* ------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* one bin of triangles per material; the painted bin also gets planar UVs
     taken from the dominant axis of each face, so the paint never stretches */
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
  /* the same, with smooth vertex normals averaged over the faces that meet at
     each vertex (a vertex that was listed twice keeps a crease there) */
  function smooth(bin, V, F) {
    var vol = 0, i, f, n, k, N = [];
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    if (vol < 0) for (i = 0; i < F.length; i++) { f = F[i]; F[i] = [f[0], f[2], f[1]]; }
    for (i = 0; i < V.length; i++) N.push([0, 0, 0]);
    for (i = 0; i < F.length; i++) {
      f = F[i];
      n = cross(sub(V[f[1]], V[f[0]]), sub(V[f[2]], V[f[0]]));
      for (k = 0; k < 3; k++) { N[f[k]][0] += n[0]; N[f[k]][1] += n[1]; N[f[k]][2] += n[2]; }
    }
    for (i = 0; i < N.length; i++) {
      k = Math.sqrt(dot(N[i], N[i]));
      N[i] = k > 1e-12 ? [N[i][0] / k, N[i][1] / k, N[i][2] / k] : [0, 0, 1];
    }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      bin.tri(V[f[0]], V[f[1]], V[f[2]], N[f[0]], N[f[1]], N[f[2]]);
    }
  }
  /* a loft of rings (same point count in each), capped at both ends; a ring
     point flagged in crease[] is doubled so its normals break there */
  function loft(bin, rings, crease) {
    var nr = rings.length, n = rings[0].length, V = [], F = [], id = [];
    var i, j, j2, a, b, c, d, base, ci, cen, q;
    for (i = 0; i < nr; i++) {
      id.push([]);
      for (j = 0; j < n; j++) {
        a = V.push(rings[i][j]) - 1; b = a;
        if (crease && crease[j]) b = V.push(rings[i][j]) - 1;
        id[i].push([a, b]);
      }
    }
    for (i = 0; i + 1 < nr; i++) {
      for (j = 0; j < n; j++) {
        j2 = (j + 1) % n;
        a = id[i][j][1]; b = id[i][j2][0]; c = id[i + 1][j2][0]; d = id[i + 1][j][1];
        F.push([a, b, c], [a, c, d]);
      }
    }
    function cap(ri, dir) {
      base = V.length; cen = [0, 0, 0];
      for (j = 0; j < n; j++) {
        q = rings[ri][j]; V.push(q);
        cen[0] += q[0] / n; cen[1] += q[1] / n; cen[2] += q[2] / n;
      }
      ci = V.push(cen) - 1;
      for (j = 0; j < n; j++) {
        j2 = (j + 1) % n;
        F.push(dir > 0 ? [ci, base + j, base + j2] : [ci, base + j2, base + j]);
      }
    }
    cap(0, -1);
    cap(nr - 1, 1);
    smooth(bin, V, F);
  }

  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  /* a box on one side: ya..yb are distances from the centre line, s is +-1 */
  function mbox(bin, s, x0, x1, ya, yb, z0, z1) {
    box(bin, x0, x1, s > 0 ? ya : -yb, s > 0 ? yb : -ya, z0, z1);
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

  /* an outline in the XZ plane, extruded across y0..y1 and fan-capped (the
     outline has to be star shaped round its centroid: sprocket teeth are) */
  function prismXZ(bin, pts, y0, y1) {
    var n = pts.length, V = [], F = [], k, k2, cx = 0, cz = 0;
    for (k = 0; k < n; k++) { V.push([pts[k][0], y0, pts[k][1]]); cx += pts[k][0] / n; cz += pts[k][1] / n; }
    for (k = 0; k < n; k++) V.push([pts[k][0], y1, pts[k][1]]);
    V.push([cx, y0, cz], [cx, y1, cz]);
    for (k = 0; k < n; k++) {
      k2 = (k + 1) % n;
      F.push([k, k2, n + k2], [k, n + k2, n + k], [2 * n, k2, k], [2 * n + 1, n + k, n + k2]);
    }
    solid(bin, V, F);
  }

  /* the belt: a closed band swept along a path in the XZ plane. Alternate
     stations stand a full link proud and the ones between only a third, so
     the silhouette saws in and out and reads as steel links, not a loop. */
  function trackBand(bin, path, halfW, thick, ty) {
    var n = path.length, V = [], F = [], i, k, a, b, c, tx, tzz, l, nx, nz, t, A, B, a0, a1, b0, b1;
    for (i = 0; i < n; i++) {
      a = path[(i - 1 + n) % n]; b = path[i]; c = path[(i + 1) % n];
      tx = c[0] - a[0]; tzz = c[1] - a[1]; l = Math.sqrt(tx * tx + tzz * tzz) || 1;
      nx = tzz / l; nz = -tx / l;
      t = thick * (i % 2 ? 0.32 : 1.0);
      V.push([b[0] + nx * t, ty + halfW, b[1] + nz * t], [b[0] + nx * t, ty - halfW, b[1] + nz * t],
             [b[0] - nx * thick * 0.42, ty - halfW, b[1] - nz * thick * 0.42],
             [b[0] - nx * thick * 0.42, ty + halfW, b[1] - nz * thick * 0.42]);
    }
    for (i = 0; i < n; i++) {
      A = i * 4; B = ((i + 1) % n) * 4;
      for (k = 0; k < 4; k++) {
        a0 = A + k; a1 = A + (k + 1) % 4; b0 = B + k; b1 = B + (k + 1) % 4;
        F.push([a0, b0, a1], [a1, b0, b1]);
      }
    }
    solid(bin, V, F);
  }
  /* bottom run forward, up and over the idler, back along the top of the
     return rollers, down round the drive sprocket at the tail */
  function trackPath() {
    var p = [], i, a, f, z0, z1, br, xF, xR, d2r = Math.PI / 180;
    for (i = 0; i <= 20; i++) p.push([-2.45 + 4.90 * i / 20, BELT]);
    br = IDL.r + BELT * 0.5;
    for (i = 0; i <= 9; i++) {
      a = (-75 + 190 * i / 9) * d2r;
      p.push([IDL.x + br * Math.cos(a), IDL.z + br * Math.sin(a)]);
    }
    z0 = p[p.length - 1][1]; xF = p[p.length - 1][0];
    xR = SPR.x + (SPR.r + BELT * 0.5) * Math.cos(72 * d2r);
    z1 = SPR.z + (SPR.r + BELT * 0.5) * Math.sin(72 * d2r);
    for (i = 1; i <= 18; i++) {
      f = i / 18;
      p.push([xF + (xR - xF) * f, z0 + (z1 - z0) * f - 0.022 * Math.pow(Math.sin(3.4 * Math.PI * f), 2)]);
    }
    br = SPR.r + BELT * 0.5;
    for (i = 1; i <= 9; i++) {
      a = (72 + 180 * i / 9) * d2r;
      p.push([SPR.x + br * Math.cos(a), SPR.z + br * Math.sin(a)]);
    }
    return p;
  }

  /* ----------------------------------------------------------- materials */
  var _tex = null, _texDone = false;
  function paintTex(THREE) {
    if (_texDone) return _tex;
    _texDone = true;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), s = 4801, i, a, x, y, rr, ang, rd;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = "#4a5236"; q.fillRect(0, 0, 256, 256);          /* olive drab */
      q.fillStyle = "#434a31";
      for (i = 0; i < 10; i++) {
        x = R() * 256; y = R() * 256; rr = 14 + R() * 30;
        q.beginPath();
        for (a = 0; a < 7; a++) {
          ang = a / 7 * TAU; rd = rr * (0.55 + R() * 0.7);
          if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
          else q.lineTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
        }
        q.closePath(); q.fill();
      }
      for (i = 0; i < 80; i++) {
        q.fillStyle = (i % 2) ? "rgba(20,18,10,0.07)" : "rgba(235,230,200,0.05)";
        q.fillRect(R() * 256, R() * 256, 3 + R() * 28, 2 + R() * 16);
      }
      _tex = new THREE.CanvasTexture(cv);
      _tex.wrapS = _tex.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) _tex.encoding = THREE.sRGBEncoding;
      _tex.anisotropy = 4;
    } catch (e) { _tex = null; }
    return _tex;
  }
  /* five materials: PAINT (textured olive drab), DARK (track, gun, fittings),
     WHEEL (painted wheel discs and sprocket, a shade off the paint so the
     running gear separates from the black track), GLASS, and the team colour
     exactly as handed in, so the era kit can leave it alone when this hull
     stands in for another army's row */
  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(0x4a5236);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.8, metalness: 0.28 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0x3c4132, roughness: 0.86, metalness: 0.12 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
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

  /* ---------------------------------------------------------------- hull */
  function hullRing(s) {
    var x = s[0], w = s[1], w1 = s[2], zt = s[3], zb = s[4], h = zt - zb, ring = [], j;
    var half = [[0, zt], [w1, zt], [w, zt - Math.min(0.10, 0.25 * h)], [w, zb + 0.22 * h],
                [w * 0.55, zb], [0, zb]];
    for (j = 0; j < half.length; j++) ring.push([x, half[j][0], half[j][1]]);
    for (j = half.length - 2; j >= 1; j--) ring.push([x, -half[j][0], half[j][1]]);
    return ring;
  }

  function addHull(B) {
    var P = B.paint, D = B.dark, G = B.glass, TM = B.team, W = B.wheel;
    var rings = [], i, k, s, x, z, y0, y1, zt0, zt1;
    for (i = 0; i < ST.length; i++) rings.push(hullRing(ST[i]));
    loft(P, rings, [false, true, true, true, true, false, true, true, true, true]);

    /* track guards: a flat plate over each track, a rolled outer lip, and the
       sloped mudguard at the front that stands proud of the glacis */
    for (s = -1; s <= 1; s += 2) {
      mbox(P, s, -3.42, 2.60, 1.00, 1.815, ZF - 0.07, ZF);
      mbox(P, s, -3.42, 2.60, 1.765, 1.815, ZF - 0.15, ZF + 0.03);
      y0 = s > 0 ? 1.00 : -1.815; y1 = s > 0 ? 1.815 : -1.00;
      hexa(P, [[2.60, y0, ZF - 0.07], [3.36, y0, 0.96], [3.36, y1, 0.96], [2.60, y1, ZF - 0.07],
               [2.60, y0, ZF], [3.36, y0, 1.03], [3.36, y1, 1.03], [2.60, y1, ZF]]);
      mbox(P, s, 3.30, 3.36, 1.00, 1.815, 0.86, 1.03);          /* front lip  */
      /* the torsion bar arms coming out of the hull side to each wheel */
      for (i = 0; i < WX.length; i++)
        mbox(P, s, WX[i] - 0.22, WX[i] - 0.02, 1.14, 1.27, ZW - 0.05, ZW + 0.20);
      /* return roller brackets */
      for (i = 0; i < ROL.length; i++)
        mbox(P, s, ROL[i][0] - 0.05, ROL[i][0] + 0.05, 1.14, 1.34, ROL[i][1] - 0.04, ROL[i][1] + 0.08);
      mbox(P, s, IDL.x - 0.07, IDL.x + 0.07, 1.14, 1.30, IDL.z - 0.07, IDL.z + 0.07);
      /* headlight on the front guard, inner corner */
      cylX(P, 2.56, 2.70, s * 1.06, ZF + 0.10, 0.085, 8);
      cylX(G, 2.70, 2.715, s * 1.06, ZF + 0.10, 0.065, 8);
      mbox(D, s, 2.60, 2.64, 1.04, 1.08, ZF, ZF + 0.05);
      /* team flashes on the guard tops: ahead of the turret and behind it */
      mbox(TM, s, 2.20, 2.72, 1.22, 1.58, ZF + 0.001, ZF + 0.022);
      mbox(TM, s, -2.55, -2.03, 1.22, 1.58, ZF + 0.001, ZF + 0.022);
    }

    /* driver's hatch on the glacis, the three periscopes across its front */
    z = hullZ(1.62);
    cylZ(P, 1.62, 0, z - 0.03, z + 0.05, 0.30, 14);
    cylZ(P, 1.62, 0, z + 0.05, z + 0.085, 0.25, 14);
    for (k = -1; k <= 1; k++) box(G, 1.89, 1.95, k * 0.18 - 0.05, k * 0.18 + 0.05, z + 0.03, z + 0.10);
    /* tow eyes in the bow */
    for (s = -1; s <= 1; s += 2) cylX(D, 3.10, 3.28, s * 0.44, 0.74, 0.05, 8);

    /* engine deck: two big louvered access doors, side by side */
    for (s = -1; s <= 1; s += 2) {
      y0 = s > 0 ? 0.06 : -0.98; y1 = s > 0 ? 0.98 : -0.06;
      zt0 = hullZ(-3.05); zt1 = hullZ(-1.45);
      hexa(P, [[-3.05, y0, zt0 - 0.01], [-1.45, y0, zt1 - 0.01], [-1.45, y1, zt1 - 0.01], [-3.05, y1, zt0 - 0.01],
               [-3.05, y0, zt0 + 0.045], [-1.45, y0, zt1 + 0.045], [-1.45, y1, zt1 + 0.045], [-3.05, y1, zt0 + 0.045]]);
      for (k = 0; k < 6; k++) {
        x = -2.95 + k * 0.27;
        box(D, x, x + 0.07, y0 + 0.06, y1 - 0.06, hullZ(x) + 0.044, hullZ(x) + 0.07);
      }
    }
    /* rear plate: the towing pintle */
    cylX(D, -3.52, -3.40, 0, 0.84, 0.05, 8);
  }

  /* ------------------------------------------------------------- gear */
  function addGear(B) {
    var D = B.dark, W = B.wheel, s, ty, i, k, a, pts;
    var path = trackPath();
    for (s = -1; s <= 1; s += 2) {
      ty = s * TKY;
      trackBand(D, path, TKW * 0.5, BELT, ty);
      /* three return rollers on the top run */
      for (i = 0; i < ROL.length; i++) cylY(W, ROL[i][0], ty - 0.13, ty + 0.13, ROL[i][1], 0.10, 10);
      /* front idler: two smooth flanges, a drum between them, a hub */
      cylY(W, IDL.x, ty - 0.17, ty - 0.06, IDL.z, IDL.r, 14);
      cylY(W, IDL.x, ty + 0.06, ty + 0.17, IDL.z, IDL.r, 14);
      cyl(W, [IDL.x, ty - 0.17, IDL.z], [IDL.x, ty + 0.17, IDL.z], IDL.r * 0.74, IDL.r * 0.74, 12, true);
      cylY(W, IDL.x, ty - 0.22, ty + 0.22, IDL.z, 0.10, 6);
      /* rear drive sprocket: a toothed ring and a drum */
      pts = [];
      for (k = 0; k < 22; k++) {
        a = k / 22 * TAU;
        pts.push([SPR.x + Math.cos(a) * (k % 2 ? 0.30 : 0.385), SPR.z + Math.sin(a) * (k % 2 ? 0.30 : 0.385)]);
      }
      prismXZ(W, pts, ty - 0.19, ty + 0.19);
      cyl(W, [SPR.x, ty - 0.22, SPR.z], [SPR.x, ty + 0.22, SPR.z], 0.26, 0.26, 12, true);
      cylY(W, SPR.x, ty - 0.25, ty + 0.25, SPR.z, 0.10, 6);
    }
  }
  /* one pair of dual road wheels, axle on local Y through the node origin */
  function addWheelPair(W) {
    var s, ty;
    for (s = -1; s <= 1; s += 2) {
      ty = s * TKY;
      cylY(W, 0, ty - 0.185, ty - 0.04, 0, RW, 16);
      cylY(W, 0, ty + 0.04, ty + 0.185, 0, RW, 16);
      cyl(W, [0, ty - 0.19, 0], [0, ty + 0.19, 0], 0.235, 0.235, 12, true);
      cylY(W, 0, ty - 0.225, ty + 0.225, 0, 0.095, 6);
    }
  }

  /* -------------------------------------------------------------- turret */
  function addTurret(B) {
    var P = B.paint, D = B.dark, G = B.glass, TM = B.team;
    var rings = [], US = [-0.97, -0.93, -0.86, -0.76, -0.63, -0.48, -0.32, -0.16, 0.00, 0.16, 0.34, 0.52, 0.68, 0.80, 0.89, 0.94, 0.96];
    var ex = 2 / TE, NS = 16, crease = [], i, k, u, x, w, h, ring, an, cs, sn, z0, cx, cy, s;

    for (i = 0; i < US.length; i++) {
      u = US[i]; x = TXC + (u >= 0 ? TAF : TAR) * u; w = tw(x); h = th(x); ring = [];
      for (k = 0; k <= NS; k++) {
        an = Math.PI * k / NS; cs = Math.cos(an); sn = Math.sin(an);
        ring.push([x, w * (cs < 0 ? -1 : 1) * Math.pow(Math.abs(cs), ex), h * Math.pow(Math.abs(sn), ex)]);
      }
      rings.push(ring);
    }
    for (k = 0; k <= NS; k++) crease.push(k === 0 || k === NS);
    loft(P, rings, crease);

    /* cast mantlet: a rounded shield, half sunk into the turret face */
    rings = [];
    for (i = 1; i <= 7; i++) {
      an = Math.PI * i / 8; ring = [];
      for (k = 0; k < 12; k++) {
        u = k / 12 * TAU;
        ring.push([1.80 + 0.27 * Math.cos(an), 0.42 * Math.sin(an) * Math.cos(u), GZ - 0.02 + 0.34 * Math.sin(an) * Math.sin(u)]);
      }
      rings.push(ring);
    }
    loft(P, rings, null);

    /* the 90 mm gun M41: tapered tube, bore evacuator two thirds out, plain
       cylindrical blast deflector on the muzzle */
    cyl(D, [1.90, 0, GZ], [3.62, 0, GZ], 0.090, 0.076, 14);
    cyl(D, [3.62, 0, GZ], [3.70, 0, GZ], 0.076, 0.106, 14, true);
    cyl(D, [3.70, 0, GZ], [4.02, 0, GZ], 0.106, 0.106, 14, true);
    cyl(D, [4.02, 0, GZ], [4.10, 0, GZ], 0.106, 0.066, 14, true);
    cyl(D, [4.10, 0, GZ], [4.67, 0, GZ], 0.066, 0.060, 14);
    cyl(D, [4.67, 0, GZ], [5.00, 0, GZ], 0.088, 0.088, 14);
    cyl(D, [4.95, 0, GZ], [5.00, 0, GZ], 0.096, 0.096, 14);
    /* coaxial machine gun beside it, on the right */
    cylX(D, 1.95, 2.22, -0.20, GZ - 0.10, 0.032, 8);

    /* rangefinder windows either side of the mantlet */
    for (s = -1; s <= 1; s += 2) {
      cy = s * 0.97; z0 = tz(1.25, cy);
      cylX(P, 1.18, 1.36, cy, z0 + 0.00, 0.085, 8);
      cylX(G, 1.36, 1.375, cy, z0 + 0.00, 0.062, 8);
    }

    /* commander's cupola (M1): a drum with a hatch ring, the periscope head on
       the hatch (Hunnicutt measures the M48A2's 121.6 in over this periscope),
       vision blocks round the drum, the .50 M2HB on its front with the
       ammunition box beside it. The top of the periscope is 3.09 m. */
    cx = -0.42; cy = -0.52; z0 = tz(cx, cy);
    cylZ(P, cx, cy, z0 - 0.22, z0 + 0.30, 0.35, 14);
    cylZ(P, cx, cy, z0 + 0.30, z0 + 0.35, 0.30, 14);
    box(P, cx - 0.10, cx + 0.06, cy - 0.05, cy + 0.05, z0 + 0.35, z0 + 0.49);          /* periscope head */
    box(G, cx + 0.06, cx + 0.075, cy - 0.04, cy + 0.04, z0 + 0.39, z0 + 0.46);
    box(G, cx - 0.06, cx + 0.06, cy + 0.34, cy + 0.38, z0 + 0.14, z0 + 0.24);          /* vision blocks */
    box(G, cx - 0.06, cx + 0.06, cy - 0.38, cy - 0.34, z0 + 0.14, z0 + 0.24);
    box(G, cx - 0.37, cx - 0.32, cy - 0.18, cy - 0.06, z0 + 0.14, z0 + 0.24);
    box(G, cx - 0.37, cx - 0.32, cy + 0.06, cy + 0.18, z0 + 0.14, z0 + 0.24);
    box(P, cx + 0.30, cx + 0.46, cy - 0.10, cy + 0.10, z0 + 0.16, z0 + 0.28);          /* mount    */
    box(D, cx + 0.34, cx + 0.72, cy - 0.065, cy + 0.065, z0 + 0.21, z0 + 0.35);        /* receiver */
    cylX(D, cx + 0.72, cx + 1.70, cy, z0 + 0.28, 0.022, 6);                            /* barrel   */
    cylX(D, cx + 1.70, cx + 1.84, cy, z0 + 0.28, 0.032, 6);                            /* hider    */
    box(D, cx + 0.38, cx + 0.66, cy + 0.10, cy + 0.27, z0 + 0.21, z0 + 0.39);          /* ammo box */

    /* loader's hatch, left rear */
    cx = -0.58; cy = 0.58; z0 = tz(cx, cy);
    cylZ(P, cx, cy, z0 - 0.10, z0 + 0.08, 0.30, 14);
    cylZ(P, cx, cy, z0 + 0.08, z0 + 0.115, 0.27, 14);
    /* gunner's periscope hood, right front */
    cx = 0.80; cy = -0.46; z0 = tz(cx, cy);
    box(P, cx - 0.07, cx + 0.07, cy - 0.10, cy + 0.10, z0 - 0.02, z0 + 0.08);
    box(G, cx + 0.07, cx + 0.085, cy - 0.07, cy + 0.07, z0 + 0.01, z0 + 0.06);
    /* ventilator on the rear crown */
    cx = -1.02; z0 = tz(cx, 0);
    cylZ(P, cx, 0, z0 - 0.06, z0 + 0.09, 0.16, 12);
    cylZ(D, cx, 0, z0 + 0.09, z0 + 0.13, 0.10, 10);
    /* radio antenna base and whip, right rear */
    cx = -1.20; cy = -0.86; z0 = tz(cx, cy);
    cylZ(P, cx, cy, z0 - 0.05, z0 + 0.11, 0.06, 8);
    cyl(D, [cx, cy, z0 + 0.11], [cx, cy, z0 + 1.05], 0.014, 0.007, 5);

    /* a grab rail along each flank on stand-offs, as on the Saumur and
       Kuelsheim turrets: a bar following the dome at 0.44 m above the ring */
    var RZ = 0.44, RX = [-1.15, -0.85, -0.55, -0.25, 0.05, 0.35, 0.65, 0.95], RY = [], pa, pb;
    for (i = 0; i < RX.length; i++)
      RY.push(tw(RX[i]) * Math.pow(1 - Math.pow(RZ / th(RX[i]), TE), 1 / TE));
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i + 1 < RX.length; i++) {
        pa = [RX[i], s * (RY[i] + 0.04), RZ]; pb = [RX[i + 1], s * (RY[i + 1] + 0.04), RZ];
        cyl(D, pa, pb, 0.014, 0.014, 5);
      }
      for (i = 0; i < RX.length; i += 2)
        mbox(D, s, RX[i] - 0.02, RX[i] + 0.02, RY[i] - 0.01, RY[i] + 0.05, RZ - 0.03, RZ + 0.03);
    }

    /* two lifting eyes on the front slope, as in the Kuelsheim photograph */
    for (s = -1; s <= 1; s += 2) {
      cx = 1.12; cy = s * 0.64; z0 = tz(cx, cy);
      cylY(P, cx, cy - 0.045, cy + 0.045, z0 + 0.04, 0.075, 8);
    }

    /* team flash on the crown, facing up */
    z0 = tz(0.40, 0);
    box(TM, 0.18, 0.64, -0.20, 0.20, z0 + 0.004, z0 + 0.03);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), i, wg, tg, WB, TB;
    var HB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), wheel: new Bin(T.wheel, false),
               glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
    addHull(HB);
    addGear(HB);
    flush(THREE, g, HB);
    for (i = 0; i < WX.length; i++) {
      WB = { wheel: new Bin(T.wheel, false) };
      addWheelPair(WB.wheel);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(WX[i], 0, ZW);
      flush(THREE, wg, WB);
      g.add(wg);
    }
    TB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false),
           glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
    addTurret(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TRX, 0, ZR);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build };
})();

/* len is the X extent: tail of the sprocket to the blast deflector. */
UNIT_MODELS["nato_e50_mbt"] = {
  len: 8.71,
  build: function (THREE, M, C) { return HeroM48.build(THREE, M, C); }
};
