/* ============ ru_tunguska.js - HERO models: the 2S6 Tunguska family ============
   The Soviet / Russian gun-and-missile air-defence vehicle in three guises:
     pact_e80_spaag   2S6 Tunguska          (1980s, Soviet green)
     pact_e90_spaag   2S6M Tunguska-M       (1990s, Soviet green)
     spaag_p          2S6M Tunguska         (present day, Russian grey-green)

   What each feature rests on (references fetched from Wikimedia Commons):
     - Vitaly Kuzmin's side photograph of a 2S6M (File:2S6M combat vehicle
       2K22M Tunguska-M - TankBiathlon14part2-29.jpg), scaled at 93.7 px per
       metre from the published 7.93 m hull length, heights trimmed about 6
       per cent for the camera's perspective so the cupola top (3.31 m)
       stays under the published 3.36 m (radar folded):  a FLAT-roofed
       GM-352 hull, deck 2.05 m, its side wall
       standing on a lit fender ledge at 1.40 m with a short skirt below; a
       short sloped upper glacis (0.66 m long) meeting a short lower plate at
       a nose edge 1.54 m up; three stowage boxes, a latched box and two
       filler caps on the hull side, the louvred engine grille and the small
       panels over it at the rear.  SIX road wheels a side (dual, rubber
       tyred) at the measured uneven spacing, the raised idler at the FRONT,
       the raised toothed sprocket at the REAR, the track wrapped round all
       of them with its top run held up under the skirt.
       The turret: a wide low turret-base drum (2.9 m across) sitting on
       the deck, the big flat-roofed body on it reaching from the tracking
       dish at the front to the antenna housing that overhangs the engine
       deck, the commander's cupola and the sight dome on the roof; on EACH
       side a long flat gun housing over the rear half of the turret side,
       from whose front the twin 30 mm 2A38 barrels run 2.1 m forward (one
       barrel above the other, tied by a link near the muzzle, the muzzles
       just ahead of the dish); the round tracking-radar dish on its mount at
       the turret front; the search-radar antenna folded down as a broad
       panel over the turret rear (arched across the width, as the rear
       views TankBiathlon14part2-27 / -28 show it).
     - 2s6.jpg (an earlier 2S6, front three-quarter): the same layout on the
       1980s vehicle, and the 9M311 containers LOADED, a bundle of four a
       side outboard of the guns, angled up.  The 2S6M photographs show the
       launcher arms empty; the game rows are armed, so all three carry the
       containers (2.7 m long, from the missile's published 2.56 m),
       drawn 15 degrees nose-up on the arm behind the gun housing.
   Published figures: length 7.93 m, width 3.24 m, height 3.36 m with the
   search radar folded, GM-352 chassis, 8 ready 9M311 missiles and four 2A38
   barrels on the 2S6 and 2S6M alike.  armour_specs.js gives pact_e90_spaag
   a 3.6 m width - a data note, not edited here.
   NOT CONFIRMED from references, so not drawn differently: any visible
   2S6 / 2S6M difference.  The three rows share the geometry and differ only
   in the paint.  No tactical markings; the whip aerial is left off.
   Three return rollers a side are drawn where the side photograph shows
   the track's top run held up in the dark under the skirt.

   Five materials: PAINT (textured), DARK (track, barrels, grilles), GLASS
   (sights, vision blocks), the plain C.team (turret roof plate and the
   glacis plate) and WHEEL (vertex-coloured: green discs, black tyres, so a
   road-wheel group stays one draw call).  Named nodes: "turret" (at the
   ring centre, 0.60 m ahead of mid-hull; guns along +X) and six "roadwheel"
   groups (both sides of each station).

   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.
   ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTunguska = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  var VARIANTS = {
    E80: { paint: { base: "#4a5935", blots: ["#3e4b2d", "#56653f"], seed: 5 } },
    E90: { paint: { base: "#4a5a3c", blots: ["#3e4c32", "#566444"], seed: 17 } },
    P:   { paint: { base: "#4d5948", blots: ["#424d3f", "#58634f"], seed: 29 } }
  };

  /* running gear, all measured off the side photograph */
  var XW = [2.05, 0.91, -0.12, -1.11, -2.02, -2.74], RW = 0.37, ZW = 0.48;
  var TY = 1.40, TH = 0.19;               /* track centre line and half width */
  var XI = 2.89, ZI = 0.90, RI = 0.33;    /* idler, front, raised */
  var XS = -3.44, ZS = 0.97, RS = 0.30;   /* sprocket, rear, raised */
  var XR = [1.45, -0.05, -1.55], ZR = 1.02, RR = 0.09;  /* return rollers */
  var DZ = 2.05;                          /* hull deck */
  var TZ = -0.05;                         /* turret node height (built for a 2.10 deck) */
  var HX = 0.60;                          /* turret ring centre */

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
  var _tex = {};
  function paintTex(THREE, P) {
    var key = P.base + P.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), s = P.seed >>> 0, i, k, a, x, y, rr, ang, rd;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 9; i++) {
          x = R() * 256; y = R() * 256; rr = 16 + R() * 34;
          q.beginPath();
          for (a = 0; a < 7; a++) {
            ang = a / 7 * TAU; rd = rr * (0.55 + R() * 0.7);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 2) ? "rgba(15,14,10,0.07)" : "rgba(240,236,215,0.05)";
        q.fillRect(R() * 256, R() * 256, 3 + R() * 30, 2 + R() * 18);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }

  /* five materials: PAINT (textured), DARK (track, guns, grilles), GLASS,
     the team colour exactly as handed in (so the era kit can leave it alone
     when this hull stands in) and WHEEL (vertex colours) */
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.85, metalness: 0.08 });
    T.steel = lin(V.paint.base);
    T.rubber = lin(0x1e1f20);
    T.hubc = lin(0x2c2e2c);
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false),
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

  /* ------------------------------------------------------------- the track */
  /* the track's centre line: the convex hull of idler, sprocket and end
     road wheels, each grown by half the track thickness, its top run then
     let down onto the return rollers;
     returned counter-clockwise in (x, z) */
  function trackLine() {
    var C = [[XI, ZI, RI], [XW[0], ZW, RW], [XW[5], ZW, RW], [XS, ZS, RS]], pts = [], i, k, a, r;
    for (i = 0; i < C.length; i++) {
      r = C[i][2] + 0.04;
      for (k = 0; k < 28; k++) { a = k / 28 * TAU; pts.push([C[i][0] + Math.cos(a) * r, C[i][1] + Math.sin(a) * r]); }
    }
    pts.sort(function (p, q) { return p[0] - q[0] || p[1] - q[1]; });
    function cr(o, p, q) { return (p[0] - o[0]) * (q[1] - o[1]) - (p[1] - o[1]) * (q[0] - o[0]); }
    var lo = [], up = [];
    for (i = 0; i < pts.length; i++) {
      while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], pts[i]) <= 1e-9) lo.pop();
      lo.push(pts[i]);
    }
    for (i = pts.length - 1; i >= 0; i--) {
      while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], pts[i]) <= 1e-9) up.pop();
      up.push(pts[i]);
    }
    lo.pop(); up.pop();
    var H = lo.concat(up), best = -1, bl = 0, l;
    /* the top run sags onto the return rollers: replace the long straight
       top segment (idler to sprocket, running nose to tail) by a line
       through the roller tops */
    for (i = 0; i < H.length; i++) {
      k = (i + 1) % H.length;
      l = H[i][0] - H[k][0];
      if (H[i][1] > ZR && H[k][1] > ZR && l > bl) { bl = l; best = i; }
    }
    if (best >= 0) {
      var ins = [];
      for (i = 0; i < XR.length; i++) ins.push([XR[i], ZR + RR + 0.04]);
      ins.sort(function (p, q) { return q[0] - p[0]; });
      H = H.slice(0, best + 1).concat(ins, H.slice(best + 1));
    }
    return H;
  }

  /* the track band round the line (thickness 0.08) and its shoe grousers */
  function addTrack(D, L, y0, y1) {
    var n = L.length, i, j, O = [], I = [], NS = [], e, l, nx, nz, h = 0.04;
    for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      e = [L[j][0] - L[i][0], L[j][1] - L[i][1]]; l = Math.sqrt(e[0] * e[0] + e[1] * e[1]) || 1;
      NS.push([e[1] / l, -e[0] / l]);
    }
    for (i = 0; i < n; i++) {
      var p = NS[(i - 1 + n) % n], q = NS[i];
      nx = p[0] + q[0]; nz = p[1] + q[1]; l = Math.sqrt(nx * nx + nz * nz) || 1;
      nx /= l; nz /= l;
      var k = 1 / Math.max(0.5, nx * q[0] + nz * q[1]);
      O.push([L[i][0] + nx * h * k, L[i][1] + nz * h * k]);
      I.push([L[i][0] - nx * h * k, L[i][1] - nz * h * k]);
    }
    for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      var w = [NS[i][0], 0, NS[i][1]];
      quad(D, [O[i][0], y0, O[i][1]], [O[j][0], y0, O[j][1]], [O[j][0], y1, O[j][1]], [O[i][0], y1, O[i][1]], w);
      quad(D, [I[i][0], y0, I[i][1]], [I[j][0], y0, I[j][1]], [I[j][0], y1, I[j][1]], [I[i][0], y1, I[i][1]], [-w[0], 0, -w[2]]);
      quad(D, [O[i][0], y0, O[i][1]], [O[j][0], y0, O[j][1]], [I[j][0], y0, I[j][1]], [I[i][0], y0, I[i][1]], [0, -1, 0]);
      quad(D, [O[i][0], y1, O[i][1]], [O[j][0], y1, O[j][1]], [I[j][0], y1, I[j][1]], [I[i][0], y1, I[i][1]], [0, 1, 0]);
    }
    /* grousers every 0.3 m round the loop */
    var acc = 0.1, seg, t;
    for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      e = [L[j][0] - L[i][0], L[j][1] - L[i][1]]; seg = Math.sqrt(e[0] * e[0] + e[1] * e[1]);
      t = acc;
      while (t < seg) {
        var px = L[i][0] + e[0] * t / seg, pz = L[i][1] + e[1] * t / seg;
        planeBox(D, [px, 0, pz], [e[0] / seg, 0, e[1] / seg], [0, 1, 0], [NS[i][0], 0, NS[i][1]],
                 -0.035, 0.035, y0 - 0.008, y1 + 0.008, h - 0.01, h + 0.03);
        t += 0.30;
      }
      acc = t - seg;
    }
  }

  /* ----------------------------------------------------------- hull + tracks */
  function addHull(B) {
    var P = B.paint, D = B.dark, G = B.glass, T = B.team, s, i, x, ys, L = trackLine();
    /* lower hull between the tracks with its lower nose plate */
    prism(P, [[-3.88, 0.45], [3.08, 0.45], [3.34, 1.02], [3.34, 1.52], [-3.88, 1.52]], -1.19, 1.19);
    prism(P, [[3.30, 1.02], [3.90, 1.52], [3.30, 1.52]], -1.19, 1.19);
    /* upper hull over the tracks: side walls, flat deck, short glacis */
    prism(P, [[-3.97, 1.40], [3.62, 1.40], [3.96, 1.54], [3.30, DZ], [-3.97, DZ]], -1.48, 1.48);
    /* glacis: team plate, two lamp housings, tow hooks at the nose edge */
    var GU = unit([-0.66, 0, DZ - 1.54]), GN = unit([DZ - 1.54, 0, 0.66]);
    planeBox(T, [3.96, 0, 1.54], GU, [0, 1, 0], GN, 0.12, 0.55, -0.42, 0.42, -0.01, 0.012);
    for (s = -1; s <= 1; s += 2) {
      planeBox(P, [3.96, 0, 1.54], GU, [0, 1, 0], GN, 0.62, 0.78, s * 1.12, s * 1.34, -0.01, 0.10);
      planeBox(G, [3.96, 0, 1.54], GU, [0, 1, 0], GN, 0.66, 0.74, s * 1.15, s * 1.31, 0.09, 0.105);
      box(D, 3.82, 3.96, s * 0.62, s * 0.78, 1.46, 1.57);
      /* rear: tow eyes and lamp clusters */
      box(D, -3.985, -3.95, s * 0.55, s * 0.72, 1.55, 1.70);
      box(D, -3.982, -3.96, s * 1.15, s * 1.38, 1.86, 1.98);
      box(G, -3.985, -3.981, s * 1.18, s * 1.26, 1.88, 1.96);
    }
    /* driver's hatch (front left) with three periscopes, engine deck grille */
    cylZ(P, 2.72, 0.80, DZ - 0.02, DZ + 0.07, 0.29, 18);
    cylZ(P, 2.72, 0.80, DZ + 0.07, DZ + 0.10, 0.23, 18);
    for (i = 0; i < 3; i++) box(G, 3.02, 3.10, 0.52 + i * 0.20, 0.66 + i * 0.20, DZ - 0.01, DZ + 0.07);
    box(D, -3.75, -2.25, -1.02, 1.02, DZ - 0.01, DZ + 0.015);
    for (x = -3.68; x < -2.3; x += 0.2) box(P, x, x + 0.06, -1.00, 1.00, DZ - 0.01, DZ + 0.035);
    box(P, -2.10, -1.55, -0.95, -0.25, DZ - 0.01, DZ + 0.04);
    box(P, -2.10, -1.55, 0.25, 0.95, DZ - 0.01, DZ + 0.04);

    for (s = -1; s <= 1; s += 2) {
      ys = s * 1.48;
      /* fender ledge and the short skirt over the track's top run */
      box(P, -3.95, 3.62, s * 1.46, s * 1.62, 1.38, 1.42);
      box(P, -3.92, 3.50, s * 1.585, s * 1.62, 1.22, 1.38);
      /* stowage boxes, latched box, filler caps, engine grille, small panels */
      box(P, 1.90, 2.81, ys, s * 1.545, 1.49, 2.03);
      box(P, 1.16, 1.80, ys, s * 1.545, 1.49, 2.03);
      box(P, -1.32, -0.60, ys, s * 1.545, 1.49, 2.03);
      box(P, -0.36, 0.81, ys, s * 1.52, 1.72, 2.02);
      box(D, 2.20, 2.30, s * 1.54, s * 1.56, 1.84, 1.96);
      box(D, 2.42, 2.52, s * 1.54, s * 1.56, 1.84, 1.96);
      box(D, 1.43, 1.53, s * 1.54, s * 1.56, 1.84, 1.96);
      box(D, -1.01, -0.91, s * 1.54, s * 1.56, 1.84, 1.96);
      box(D, -0.08, 0.02, s * 1.515, s * 1.535, 1.86, 1.98);
      box(D, 0.43, 0.53, s * 1.515, s * 1.535, 1.86, 1.98);
      cylY(P, -0.18, ys, s * 1.52, 1.60, 0.075, 12);
      cylY(P, -0.46, ys, s * 1.52, 1.60, 0.075, 12);
      box(D, -3.19, -1.54, ys, s * 1.50, 1.49, 1.67);
      for (x = -3.15; x < -1.6; x += 0.17) box(P, x, x + 0.05, ys, s * 1.515, 1.49, 1.67);
      for (x = -3.28; x < -1.6; x += 0.28) box(P, x, x + 0.22, ys, s * 1.50, 1.72, 1.94);

      /* the track: band and grousers round idler, wheels, sprocket, rollers */
      addTrack(D, L, s * TY - TH, s * TY + TH);
      /* idler: twin steel discs with a hub */
      cylY(P, XI, s * (TY - 0.17), s * (TY - 0.05), ZI, RI, 14);
      cylY(P, XI, s * (TY + 0.05), s * (TY + 0.17), ZI, RI, 16);
      cylY(D, XI, s * (TY - 0.05), s * (TY + 0.05), ZI, 0.14, 10);
      cylY(P, XI, s * (TY + 0.17), s * (TY + 0.21), ZI, 0.11, 10);
      /* sprocket: hub, two toothed rings */
      cylY(P, XS, s * (TY - 0.17), s * (TY + 0.17), ZS, RS - 0.06, 18);
      cylY(P, XS, s * (TY + 0.17), s * (TY + 0.21), ZS, 0.12, 10);
      for (i = 0; i < 11; i++) {
        var a = i / 11 * TAU, cx = XS + Math.cos(a) * (RS - 0.02), cz = ZS + Math.sin(a) * (RS - 0.02);
        planeBox(D, [cx, 0, cz], [-Math.sin(a), 0, Math.cos(a)], [0, 1, 0], [Math.cos(a), 0, Math.sin(a)],
                 -0.035, 0.035, s * TY - 0.15, s * TY + 0.15, -0.04, 0.06);
      }
      /* return rollers */
      for (i = 0; i < XR.length; i++) cylY(P, XR[i], s * (TY - 0.12), s * (TY + 0.12), ZR, RR, 10);
      /* road-wheel arms trailing from their pivots on the lower hull */
      for (i = 0; i < XW.length; i++)
        planeBox(D, [XW[i], 0, ZW], unit([0.38, 0, 0.16]), [0, 1, 0], unit([-0.16, 0, 0.38]), 0, 0.42, s * 1.185, s * 1.225, -0.05, 0.05);
    }
  }

  function wheelStation(W, T) {
    var s, c;
    for (s = -1; s <= 1; s += 2) {
      c = s * TY;
      W.col = T.rubber;
      cyl(W, [0, c - s * 0.17, 0], [0, c - s * 0.05, 0], RW, RW, 12);
      cyl(W, [0, c + s * 0.05, 0], [0, c + s * 0.17, 0], RW, RW, 14);
      W.col = T.steel;
      cyl(W, [0, c + s * 0.04, 0], [0, c + s * 0.18, 0], 0.29, 0.29, 14);
      cyl(W, [0, c + s * 0.18, 0], [0, c + s * 0.19, 0], 0.20, 0.17, 12);
      W.col = T.hubc;
      cyl(W, [0, c + s * 0.19, 0], [0, c + s * 0.22, 0], 0.085, 0.07, 8);
    }
  }

  /* ---------------------------------------------------------------- turret */
  /* built about the ring centre (the node sits at x = HX) */
  function addTurret(B) {
    var P = B.paint, D = B.dark, G = B.glass, T = B.team, s, i, j, y, zb;
    /* the wide, low turret base on the deck, its rim bevelled */
    cylZ(P, 0, 0, 2.07, 2.30, 1.40, 32);
    cyl(P, [0, 0, 2.30], [0, 0, 2.40], 1.40, 1.20, 32);
    /* main body, sides leaning in, the front roof edge rounded off */
    taper(P, [[0.80, 2.38], [0.80, 2.96], [0.72, 3.10], [0.58, 3.16], [-1.30, 3.16], [-1.42, 3.08], [-1.42, 2.38]],
          0.90, 0.76, 2.38, 3.16);
    /* rear housing over the engine deck (antenna drive, electronics) */
    taper(P, [[-1.40, 2.50], [-1.40, 3.12], [-2.25, 3.08], [-2.47, 2.92], [-2.47, 2.64], [-2.30, 2.50]],
          0.82, 0.70, 2.50, 3.12);
    box(P, -2.30, -1.80, -0.36, 0.36, 3.05, 3.22);
    box(T, -1.28, -0.92, -0.52, 0.52, 3.155, 3.175);
    /* body front: TV-sight window and the tracking-radar mount with its dish */
    box(G, 0.79, 0.82, -0.62, -0.40, 2.74, 2.90);
    taper(P, [[0.78, 2.56], [1.22, 2.62], [1.22, 2.96], [0.78, 3.02]], 0.30, 0.24, 2.56, 3.02);
    for (s = -1; s <= 1; s += 2) {
      box(P, 1.10, 1.40, s * 0.36, s * 0.44, 2.72, 2.88);
      cylY(D, 1.30, s * 0.32, s * 0.47, 2.80, 0.05, 10);
    }
    cyl(P, [1.20, 0, 2.80], [1.38, 0, 2.80], 0.15, 0.39, 24);
    cyl(P, [1.38, 0, 2.80], [1.47, 0, 2.80], 0.40, 0.40, 24);
    cyl(D, [1.47, 0, 2.80], [1.49, 0, 2.80], 0.33, 0.33, 20);
    cyl(D, [1.49, 0, 2.80], [1.56, 0, 2.80], 0.07, 0.05, 10);
    /* commander's cupola with vision blocks, the gunner's sight dome */
    cylZ(P, -0.55, 0.38, 3.14, 3.30, 0.30, 18);
    cylZ(P, -0.55, 0.38, 3.30, 3.36, 0.26, 18);
    for (i = 0; i < 6; i++) {
      var a = (i / 6 - 0.08) * TAU, cx = -0.55 + Math.cos(a) * 0.29, cy = 0.38 + Math.sin(a) * 0.29;
      planeBox(G, [cx, cy, 3.20], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], [Math.cos(a), Math.sin(a), 0],
               -0.05, 0.05, 0, 0.06, -0.01, 0.02);
    }
    cylZ(P, 0.20, -0.40, 3.14, 3.24, 0.18, 14);
    cyl(P, [0.20, -0.40, 3.24], [0.20, -0.40, 3.38], 0.18, 0.09, 14);
    box(G, 0.33, 0.37, -0.48, -0.32, 3.24, 3.31);

    for (s = -1; s <= 1; s += 2) {
      /* gun housing over the rear half of the turret side */
      prism(P, [[-0.45, 2.48], [-0.45, 2.90], [-0.53, 2.98], [-1.76, 2.98], [-1.84, 2.90], [-1.84, 2.48], [-1.76, 2.42], [-0.53, 2.42]],
            s * 0.84, s * 1.24);
      box(P, -1.70, -0.62, s * 1.24, s * 1.26, 2.50, 2.90);
      box(D, -0.70, -0.62, s * 1.26, s * 1.27, 2.60, 2.80);
      /* the twin 2A38, one barrel over the other: jacket, barrel, collar,
         muzzle brake, and the link that ties the pair near the muzzle */
      y = s * 1.04;
      for (j = 0; j < 2; j++) {
        zb = j ? 2.68 : 2.88;
        cylX(D, -0.46, -0.02, y, zb, 0.062, 10);
        cylX(D, -0.02, 1.56, y, zb, 0.036, 8);
        cylX(D, 0.52, 0.60, y, zb, 0.050, 8);
        cylX(D, 1.56, 1.68, y, zb, 0.052, 10);
      }
      box(D, 0.98, 1.04, y - 0.022, y + 0.022, 2.66, 2.90);
      box(D, -0.10, -0.04, y - 0.03, y + 0.03, 2.66, 2.90);
      /* the 9M311 containers: four a side, 2 x 2, fifteen degrees nose-up on
         the arm behind the gun housing, with two clamp bands */
      var ca = 15 * Math.PI / 180, d = [Math.cos(ca), 0, Math.sin(ca)], nn = [-Math.sin(ca), 0, Math.cos(ca)];
      var O = [-2.30, 0, 2.655], yy = [1.335, 1.515], hh = [-0.095, 0.095], k, m;
      for (k = 0; k < 2; k++) for (m = 0; m < 2; m++) {
        var A = [O[0] + hh[m] * nn[0], s * yy[k], O[2] + hh[m] * nn[2]];
        var Bp = [A[0] + 2.70 * d[0], A[1], A[2] + 2.70 * d[2]];
        cyl(P, A, Bp, 0.086, 0.086, 8);
        cyl(D, [Bp[0] - 0.02 * d[0], Bp[1], Bp[2] - 0.02 * d[2]], [Bp[0] + 0.006 * d[0], Bp[1], Bp[2] + 0.006 * d[2]], 0.068, 0.068, 8);
      }
      for (k = 0; k < 2; k++) {
        var u = k ? 2.00 : 0.35;
        planeBox(P, O, d, [0, 1, 0], nn, u - 0.05, u + 0.05, s > 0 ? 1.235 : -1.615, s > 0 ? 1.615 : -1.235, -0.20, 0.20);
      }
      box(P, -2.20, -1.84, s * 1.22, s * 1.26, 2.48, 2.84);
    }

    /* the search-radar antenna folded down over the turret rear: a broad
       panel arched across the width, on two hinge arms */
    var NSEG = 6, yA, yB, hA, hB, xf = -2.02, zf = 3.18, xr = -2.95, zr = 2.90, th = 0.05;
    for (i = 0; i < NSEG; i++) {
      yA = -0.86 + 1.72 * i / NSEG; yB = -0.86 + 1.72 * (i + 1) / NSEG;
      hA = 0.13 * (1 - (yA / 0.86) * (yA / 0.86)); hB = 0.13 * (1 - (yB / 0.86) * (yB / 0.86));
      hexa(P, [[xf, yA, zf + hA - th], [xr, yA, zr + hA - th], [xr, yB, zr + hB - th], [xf, yB, zf + hB - th],
               [xf, yA, zf + hA], [xr, yA, zr + hA], [xr, yB, zr + hB], [xf, yB, zf + hB]]);
    }
    for (s = -1; s <= 1; s += 2) {
      box(P, -2.18, -1.98, s * 0.42, s * 0.52, 3.04, 3.20);
      /* stiffening ribs under the panel, an X each half */
      var p0 = [xf - 0.08, s * 0.10, zf - th - 0.01], p1 = [xr + 0.08, s * 0.78, zr - th - 0.01 + 0.04];
      cyl(D, p0, p1, 0.022, 0.022, 6);
      cyl(D, [p0[0], s * 0.78, p0[2] + 0.02], [p1[0], s * 0.10, p1[2] + 0.06], 0.022, 0.022, 6);
    }
  }

  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.P, Tm = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(Tm), TB = bins(Tm), i, wg, W;
    addHull(HB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      W = new Bin(Tm.wheel, false, true);
      wheelStation(W, Tm);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { w: W });
      g.add(wg);
    }
    addTurret(TB);
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(HX, 0, TZ);
    flush(THREE, wg, TB);
    g.add(wg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e80_spaag"] = { len: 7.9, build: function (THREE, M, C) { return HeroTunguska.build(THREE, M, C, "E80"); } };
UNIT_MODELS["pact_e90_spaag"] = { len: 7.9, build: function (THREE, M, C) { return HeroTunguska.build(THREE, M, C, "E90"); } };
UNIT_MODELS["spaag_p"] = { len: 7.9, build: function (THREE, M, C) { return HeroTunguska.build(THREE, M, C, "P"); } };
