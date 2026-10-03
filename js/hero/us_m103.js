/* ============ us_m103.js - HERO models: the M103 heavy tank ============
   The only heavy tank the US Army and Marine Corps fielded after 1945, in the
   two guises the era tables ask for:
     nato_e50_heavy   M103     (1957)  Army standard, gasoline Continental AV-1790
     nato_e60_heavy   M103A2   (1964)  Marine Corps rebuild, AVDS-1790 diesel

   What has to read at a glance (references: the English-Wikipedia M103
   article and its Hunnicutt data table; the M103A1 cutaway drawing, an
   Army-marked "7A 33" tank seen from the front right; photographs of the
   M103A2 at Fort Lewis (rear three-quarter, engine grilles, gun in the
   travel lock), of the museum A2 "A12" and of a black-painted museum tank
   in pure side view):
     - a LONG, LOW hull with a flat deck, a blunt pointed cast nose that
       reaches a metre past the track, and a small drive sprocket set HIGH at
       the REAR; seven dual road wheels a side that almost touch (28 in
       track), six small return rollers under the fender line, a raised front
       idler only a wheel and a third ahead of the seventh road wheel;
     - one enormous low cast turret, widest behind the ring and tapering to
       the mantlet, with a big rounded bustle that overhangs the engine deck;
     - the 120 mm M58 gun, a plain-muzzle tube 5.2 m long past the mantlet,
       with a swelling in its last fifth (the bore evacuator, as the cutaway
       drawing and the side photographs show it); with the tube
       forward the tank is 11.4 m long - it is the gun that sets the size;
     - a low M1-type cupola at the right rear carrying the pintle .50, a
       loader's hatch at the left rear, a rounded rangefinder end housing high
       on each flank level with the cupola (a third of the way forward from
       the bustle), a hand rail and an antenna base at the rear right, and
       the gun travel lock standing on the rear deck.

   Positions of the running gear and the deck height were checked against
   the black museum tank in side view, scaled so that its overall length is
   the published 11.39 m: road wheels 0.69 m apart, first one 1.2 m from the
   tail, idler 6.2 m from the tail and 0.7 m up, sprocket 0.4 m from the tail
   and 1.1 m up, fender top about 1.5 m, turret ring about 1.65 m, turret
   roof about 2.8 m, gun axis about 2.05 m.  The roof, the cupola drum and the
   pintle .50 add up to the published 3.56 m over the MG.

   Published figures used (Hunnicutt, via the English-Wikipedia table):
     length, gun forward   448.6 in (11.39 m) M103 and M103A1,  442.2 in (11.23 m) A2
     width over tracks     143.0 in (3.63 m)
     height                126.7 in (3.22 m) over the cupola (T43), 140.1 in (3.56 m) over the MG
     ground clearance      15.4 in (0.39 m);  gun 120 mm M58 L/60;  7 road wheels a side
   NOT confirmed by any reference I could fetch, so drawn the same on both
   hulls rather than invented: the hull length (7.7 m over the tracks, scaled
   from the black side photograph against the published 11.4 m overall) and
   where the 6.4 in of extra
   length on the M103/A1 sits; the return-roller count (six drawn, from the
   cutaway); the Army tank's engine deck and rear plate (the diesel's two big
   louvred grilles are drawn on both, copied from the A2 photograph); how the
   stereoscopic (M103/A1) and coincidence (A2) rangefinder housings differ
   from outside; the second coaxial .30 the first M103 carried (the text says
   the A1 dropped one; where it sat is not shown, so only one stub is drawn).

   Built from a handful of primitives per MATERIAL: the hull, the turret and
   each pair of road wheels are separate nodes ("turret", "roadwheel"), every
   node carries one mesh per material: 15 draw calls, four materials, about
   8,900 triangles.  Team
   colour is the plain C.team material on the front fenders and the turret
   roof, exactly as handed in, so the era kit can leave it alone.

   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0, origin at
   the middle of the hull.  ASCII only: a stray byte in a hex literal has
   broken this project before.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroM103 = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  /* ------------------------------------------------------------ variants */
  /* The two tanks share one hull and one turret.  The paint is what the
     tables say: Army olive drab for the 1957 tank, the slightly deeper
     Marine green for the 1964 rebuild. */
  var VARIANTS = {
    M103: { paint: { base: "#4b5a2f", blots: ["#42502a", "#58663b"], seed: 57 } },
    A2:   { paint: { base: "#44563a", blots: ["#3b4d32", "#52653f"], seed: 64 } }
  };

  /* ----------------------------------------------------------- the layout */
  var XT = -3.90;                         /* hull tail plate                 */
  var XM = 7.45;                          /* gun muzzle                      */
  var DZ = 0.14;                          /* hull deck lift: the museum side photograph puts the fender at about 1.5 m, the ring at 1.65 m */
  var XR = -0.35, ZR = 1.50 + DZ;         /* turret ring centre and deck     */
  var TY = 1.46, TH = 0.355;              /* track centre line, half width   */
  var ZW = 0.43, RW = 0.33;               /* road wheel axle height, radius  */
  var NW = 7, XW0 = -2.71, XWP = 0.69;    /* seven wheels, first and pitch   */
  var SPR = { x: -3.50, z: 1.10, r: 0.33 };   /* rear drive sprocket, high   */
  var IDL = { x: 2.34, z: 0.72, r: 0.38 };    /* front idler, close behind the seventh wheel */
  var NROLL = 6, RR = 0.12;               /* return rollers a side           */
  var XROLL = [-2.46, -1.76, -1.06, -0.36, 0.34, 1.04];   /* measured off the museum photograph */
  var XW = [];
  (function () { var k; for (k = 0; k < NW; k++) XW.push(XW0 + k * XWP); })();

  /* -------------------------------------------------------- geometry kit */
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

  /* a closed solid.  Whatever order the corners came in, the signed volume
     says whether the faces point out, and they are turned if they do not.
     smooth: average the face normals at shared corners (cast surfaces) */
  function solid(bin, V, F, smooth) {
    var vol = 0, i, f, a, b, c, N = null, fn, k, q;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    var flip = vol < 0;
    if (smooth) {
      N = [];
      for (i = 0; i < V.length; i++) N.push([0, 0, 0]);
      for (i = 0; i < F.length; i++) {
        f = F[i]; a = f[0]; b = flip ? f[2] : f[1]; c = flip ? f[1] : f[2];
        fn = cross(sub(V[b], V[a]), sub(V[c], V[a]));
        q = [a, b, c];
        for (k = 0; k < 3; k++) { N[q[k]][0] += fn[0]; N[q[k]][1] += fn[1]; N[q[k]][2] += fn[2]; }
      }
      for (i = 0; i < N.length; i++) N[i] = unit(N[i]);
    }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = flip ? f[2] : f[1]; c = flip ? f[1] : f[2];
      fn = cross(sub(V[b], V[a]), sub(V[c], V[a]));
      if (dot(fn, fn) < 1e-16) continue;                  /* a crease slit */
      bin.tri(V[a], V[b], V[c], N && N[a], N && N[b], N && N[c]);
    }
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
  /* a convex outline in plan, thickened between z0 and z1 */
  function prism(bin, pts, z0, z1) {
    var n = pts.length, V = [], F = [], i, k;
    for (i = 0; i < n; i++) V.push([pts[i][0], pts[i][1], z0]);
    for (i = 0; i < n; i++) V.push([pts[i][0], pts[i][1], z1]);
    for (i = 1; i < n - 1; i++) { F.push([0, i + 1, i]); F.push([n, n + i, n + i + 1]); }
    for (i = 0; i < n; i++) { k = (i + 1) % n; F.push([i, k, n + k], [i, n + k, n + i]); }
    solid(bin, V, F);
  }
  /* a capped cylinder or cone between two centres, smooth round the side.
     The faces are written outward directly, so a cap can be left off. */
  function cyl(bin, A, B, r0, r1, seg, nocapA, nocapB) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), L = Math.sqrt(dot(sub(B, A), sub(B, A))) || 1;
    var k = (r0 - r1) / L, na = [-ax[0], -ax[1], -ax[2]], i, j, a0, a1, r0v, r1v, pa, pb, pc, pd, n0, n1, c0, s0, c1, s1;
    for (i = 0; i < seg; i++) {
      j = (i + 1) % seg;
      a0 = i / seg * TAU; a1 = j / seg * TAU;
      c0 = Math.cos(a0); s0 = Math.sin(a0); c1 = Math.cos(a1); s1 = Math.sin(a1);
      r0v = [u[0] * c0 + v[0] * s0, u[1] * c0 + v[1] * s0, u[2] * c0 + v[2] * s0];
      r1v = [u[0] * c1 + v[0] * s1, u[1] * c1 + v[1] * s1, u[2] * c1 + v[2] * s1];
      pa = [A[0] + r0v[0] * r0, A[1] + r0v[1] * r0, A[2] + r0v[2] * r0];
      pb = [A[0] + r1v[0] * r0, A[1] + r1v[1] * r0, A[2] + r1v[2] * r0];
      pc = [B[0] + r1v[0] * r1, B[1] + r1v[1] * r1, B[2] + r1v[2] * r1];
      pd = [B[0] + r0v[0] * r1, B[1] + r0v[1] * r1, B[2] + r0v[2] * r1];
      n0 = unit([r0v[0] + ax[0] * k, r0v[1] + ax[1] * k, r0v[2] + ax[2] * k]);
      n1 = unit([r1v[0] + ax[0] * k, r1v[1] + ax[1] * k, r1v[2] + ax[2] * k]);
      bin.tri(pa, pb, pc, n0, n1, n1);
      bin.tri(pa, pc, pd, n0, n1, n0);
      if (!nocapA) bin.tri(A, pb, pa, na, na, na);
      if (!nocapB) bin.tri(B, pd, pc, ax, ax, ax);
    }
  }
  function cylY(bin, x, y0, y1, z, r, seg, nocapA, nocapB) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg, nocapA, nocapB); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }

  /* a toothed wheel standing on the Y axis: nt teeth between radii rr and rt */
  function gear(bin, cx, y0, y1, cz, rr, rt, nt) {
    var n = nt * 4, V = [], F = [], i, t, step = TAU / nt, a, r, kk, ph = [0.05, 0.30, 0.55, 0.80], rd = [rr, rt, rt, rr];
    for (i = 0; i < n; i++) {
      t = (i / 4) | 0; kk = i % 4; a = (t + ph[kk]) * step; r = rd[kk];
      V.push([cx + r * Math.cos(a), y0, cz + r * Math.sin(a)]);
    }
    for (i = 0; i < n; i++) V.push([V[i][0], y1, V[i][2]]);
    V.push([cx, y0, cz], [cx, y1, cz]);
    for (i = 0; i < n; i++) {
      t = (i + 1) % n;
      F.push([i, n + i, t], [t, n + i, n + t], [2 * n, i, t], [2 * n + 1, n + t, n + i]);
    }
    solid(bin, V, F);
  }

  /* ear clipping, for the end plates of the lofts (some are not convex) */
  function inTri(p, a, b, c) {
    var d1 = (p[0] - b[0]) * (a[1] - b[1]) - (a[0] - b[0]) * (p[1] - b[1]);
    var d2 = (p[0] - c[0]) * (b[1] - c[1]) - (b[0] - c[0]) * (p[1] - c[1]);
    var d3 = (p[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (p[1] - a[1]);
    var neg = (d1 < -1e-12) || (d2 < -1e-12) || (d3 < -1e-12), pos = (d1 > 1e-12) || (d2 > 1e-12) || (d3 > 1e-12);
    return !(neg && pos);
  }
  function earclip(P) {
    var n = P.length, idx = [], out = [], i, k, m, area = 0, a, b, c, i0, i1, i2, ok, found, guard = 0, q;
    for (i = 0; i < n; i++) { a = P[i]; b = P[(i + 1) % n]; area += a[0] * b[1] - b[0] * a[1]; idx.push(i); }
    if (area < 0) idx.reverse();
    while (idx.length > 3 && guard++ < 400) {
      m = idx.length; found = false;
      for (i = 0; i < m && !found; i++) {
        i0 = idx[(i + m - 1) % m]; i1 = idx[i]; i2 = idx[(i + 1) % m];
        a = P[i0]; b = P[i1]; c = P[i2];
        if ((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) <= 1e-12) continue;
        ok = true;
        for (k = 0; k < m; k++) {
          q = idx[k];
          if (q === i0 || q === i1 || q === i2) continue;
          if (inTri(P[q], a, b, c)) { ok = false; break; }
        }
        if (ok) { out.push([i0, i1, i2]); idx.splice(i, 1); found = true; }
      }
      if (!found) break;
    }
    if (idx.length === 3) out.push([idx[0], idx[1], idx[2]]);
    else for (i = 1; i < idx.length - 1; i++) out.push([idx[0], idx[i], idx[i + 1]]);   /* give up cleanly */
    return out;
  }

  /* a skin lofted through cross-section rings (arrays of [x, y, z] with the
     same count each), capped at both ends.  Rings are re-ordered so they run
     counter-clockwise in the YZ plane, whatever the caller wrote. */
  function loft(bin, rings, smooth) {
    var m = rings.length, n = rings[0].length, V = [], F = [], i, j, k, R = [], area = 0, a, b, T, b0, ri, tr;
    for (j = 0; j < n; j++) { a = rings[0][j]; b = rings[0][(j + 1) % n]; area += a[1] * b[2] - b[1] * a[2]; }
    for (i = 0; i < m; i++) R.push(area < 0 ? rings[i].slice().reverse() : rings[i]);
    for (i = 0; i < m; i++) for (j = 0; j < n; j++) V.push(R[i][j]);
    for (i = 0; i < m - 1; i++) for (j = 0; j < n; j++) {
      k = (j + 1) % n;
      F.push([i * n + j, i * n + k, (i + 1) * n + k], [i * n + j, (i + 1) * n + k, (i + 1) * n + j]);
    }
    for (ri = 0; ri < 2; ri++) {
      T = earclip(R[ri ? m - 1 : 0].map(function (p) { return [p[1], p[2]]; }));
      b0 = V.length;
      for (j = 0; j < n; j++) V.push(R[ri ? m - 1 : 0][j]);
      for (tr = 0; tr < T.length; tr++) {
        if (ri) F.push([b0 + T[tr][0], b0 + T[tr][1], b0 + T[tr][2]]);
        else F.push([b0 + T[tr][0], b0 + T[tr][2], b0 + T[tr][1]]);
      }
    }
    solid(bin, V, F, smooth);
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
      /* a single flat coat gone patchy with weather: low-contrast drift, no pattern */
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 12; i++) {
          x = R() * 256; y = R() * 256; rr = 18 + R() * 40;
          q.beginPath();
          for (a = 0; a < 7; a++) {
            ang = a / 7 * TAU; rd = rr * (0.55 + R() * 0.7);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      for (i = 0; i < 90; i++) {
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

  /* four materials and no more: PAINT (textured), DARK (track, rubber, gun
     fittings, grilles), GLASS (vision blocks, windows) and the team colour,
     exactly as handed in, so the era kit leaves it alone when this hull
     stands in for another army's tank */
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
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
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  /* ------------------------------------------------------- the track belt */
  /* The belt is a band swept round a closed path in the XZ plane: along the
     ground under the seven wheels, up and over the idler, back along the top
     and down round the sprocket.  Every other station stands a full link
     proud, so the outline saws in and out like a chevron track. */
  function pickTangent(C, r, P, arrive) {
    var vx = P[0] - C.x, vz = P[1] - C.z, d = Math.sqrt(vx * vx + vz * vz), phi = Math.atan2(vz, vx), al = Math.acos(r / d);
    var cand = [phi + al, phi - al], i, th, tx, tz, dx, dz;
    for (i = 0; i < 2; i++) {
      th = cand[i]; tx = -Math.sin(th); tz = Math.cos(th);
      dx = arrive ? (C.x + r * Math.cos(th) - P[0]) : (P[0] - (C.x + r * Math.cos(th)));
      dz = arrive ? (C.z + r * Math.sin(th) - P[1]) : (P[1] - (C.z + r * Math.sin(th)));
      if (dx * tx + dz * tz > 0) return th;
    }
    return cand[0];
  }
  function beltGeometry() {
    var zb = 0.055, ri = IDL.r + 0.045, rs = SPR.r + 0.045;
    var Pf = [XW[NW - 1], zb], Pr = [XW[0], zb];
    var t1 = pickTangent(IDL, ri, Pf, true), t2 = pickTangent(SPR, rs, Pr, false);
    var Lx = SPR.x - IDL.x, Lz = SPR.z - IDL.z, L = Math.sqrt(Lx * Lx + Lz * Lz), phi = Math.atan2(Lz, Lx);
    var al = Math.acos((ri - rs) / L), psi = Math.sin(phi + al) > Math.sin(phi - al) ? phi + al : phi - al;
    while (psi < t1) psi += TAU;
    while (t2 < psi) t2 += TAU;
    var p = [], i, n, a, f, T1, T2, Q1, Q2;
    function line(A, B) {
      var l = Math.sqrt((B[0] - A[0]) * (B[0] - A[0]) + (B[1] - A[1]) * (B[1] - A[1])), k, nn = Math.max(1, Math.ceil(l / 0.20));
      for (k = 1; k <= nn; k++) p.push([A[0] + (B[0] - A[0]) * k / nn, A[1] + (B[1] - A[1]) * k / nn]);
    }
    function arc(C, r, a0, a1) {
      var k, nn = Math.max(2, Math.ceil(r * (a1 - a0) / 0.18)), ang;
      for (k = 1; k <= nn; k++) { ang = a0 + (a1 - a0) * k / nn; p.push([C.x + r * Math.cos(ang), C.z + r * Math.sin(ang)]); }
    }
    p.push([Pr[0], Pr[1]]);
    line(Pr, Pf);
    T1 = [IDL.x + ri * Math.cos(t1), IDL.z + ri * Math.sin(t1)];
    line(Pf, T1);
    arc(IDL, ri, t1, psi);
    Q1 = [IDL.x + ri * Math.cos(psi), IDL.z + ri * Math.sin(psi)];
    Q2 = [SPR.x + rs * Math.cos(psi), SPR.z + rs * Math.sin(psi)];
    line(Q1, Q2);
    arc(SPR, rs, psi, t2);
    T2 = [SPR.x + rs * Math.cos(t2), SPR.z + rs * Math.sin(t2)];
    line(T2, Pr);
    p.pop();                                        /* the closing point repeats the first */
    return { path: p, top: [Q1, Q2], nrm: [Math.cos(psi), Math.sin(psi)] };
  }
  function belt(bin, path, y0, y1) {
    var n = path.length, V = [], F = [], i, k, a, b, c, tx, tz, l, nx, nz, to, ti = 0.04, A, B, a0, a1, b0, b1;
    for (i = 0; i < n; i++) {
      a = path[(i + n - 1) % n]; b = path[i]; c = path[(i + 1) % n];
      tx = c[0] - a[0]; tz = c[1] - a[1]; l = Math.sqrt(tx * tx + tz * tz) || 1;
      nx = tz / l; nz = -tx / l;                    /* outward normal of a counter-clockwise loop */
      to = (i % 2) ? 0.022 : 0.060;
      V.push([b[0] + nx * to, y1, b[1] + nz * to], [b[0] + nx * to, y0, b[1] + nz * to],
             [b[0] - nx * ti, y0, b[1] - nz * ti], [b[0] - nx * ti, y1, b[1] - nz * ti]);
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

  /* ---------------------------------------------------------------- hull */
  /* Cross sections, tail to nose.  Each is a notched section: the flat deck,
     the sponson shelf that overhangs the tracks, the narrower lower hull
     between them, a chamfered belly.  From the foot of the glacis the deck
     falls away and the plan closes to a blunt cast beak. */
  var HST = [
    { x: XT,         wd: 1.12, ws: 1.25, wl: 0.95, zd: 1.42, zs: 1.18, zb: 0.60 },
    { x: XT + 0.14,  wd: 1.30, ws: 1.47, wl: 1.10, zd: 1.50, zs: 1.28, zb: 0.42 },
    { x: 1.55,       wd: 1.30, ws: 1.47, wl: 1.10, zd: 1.50, zs: 1.28, zb: 0.40 },
    { x: 2.10,       wd: 1.28, ws: 1.40, wl: 1.08, zd: 1.44, zs: 1.24, zb: 0.40 },
    { x: 2.70,       wd: 1.05, ws: 1.12, wl: 1.00, zd: 1.32, zs: 1.08, zb: 0.42 },
    { x: 3.20,       wd: 0.80, ws: 0.92, wl: 0.78, zd: 1.22, zs: 0.98, zb: 0.48 },
    { x: 3.58,       wd: 0.48, ws: 0.60, wl: 0.50, zd: 1.17, zs: 0.90, zb: 0.60 },
    { x: 3.80,       wd: 0.20, ws: 0.28, wl: 0.26, zd: 1.12, zs: 0.88, zb: 0.72 }
  ];
  HST.forEach(function (o) { o.zd += DZ; o.zs += DZ; });
  function hullRing(o) {
    var ch = Math.min(0.20, (o.zs - o.zb) * 0.45), wc = Math.max(0.05, o.wl - 0.25), i;
    var L = [[0, o.zd], [o.wd, o.zd], [o.ws, o.zd - 0.12], [o.ws, o.zs], [o.wl, o.zs], [o.wl, o.zb + ch], [wc, o.zb]];
    var ring = [];
    for (i = 0; i < L.length; i++) ring.push([o.x, L[i][0], L[i][1]]);
    for (i = L.length - 1; i >= 1; i--) ring.push([o.x, -L[i][0], L[i][1]]);
    return ring;
  }
  function deckZ(x) {                              /* hull deck height at x */
    var i, a, b, f;
    for (i = 0; i < HST.length - 1; i++) {
      a = HST[i]; b = HST[i + 1];
      if (x <= b.x) { f = (x - a.x) / (b.x - a.x || 1); return a.zd + (b.zd - a.zd) * f; }
    }
    return HST[HST.length - 1].zd;
  }

  function addHull(B, WB) {
    var i, k, s, x, y, z, rings = [];

    /* --- the hull body ---------------------------------------------- */
    for (i = 0; i < HST.length; i++) rings.push(hullRing(HST[i]));
    loft(B.paint, rings, false);

    /* --- fenders: flat track guards the whole length, the front pair
           running in to meet the hull beak, with a drooping front end ---- */
    for (s = -1; s <= 1; s += 2) {
      prism(B.paint, [[XT + 0.04, s * 1.40], [XT + 0.04, s * 1.80], [XT + 0.24, s * 1.82], [2.00, s * 1.82], [2.00, s * 1.40]], 1.33 + DZ, 1.38 + DZ);
      prism(B.paint, [[2.00, s * 1.05], [2.00, s * 1.82], [3.14, s * 1.82], [3.38, s * 1.60], [3.38, s * 0.62]], 1.33 + DZ, 1.38 + DZ);
      /* the front mud flap, bent down over the idler */
      planeBox(B.paint, [3.30, 0, 1.38 + DZ], [0.93, 0, -0.37], [0, 1, 0], [0.37, 0, 0.93], 0, 0.40, s > 0 ? 0.80 : -1.58, s > 0 ? 1.58 : -0.80, 0, 0.04);
      /* the rear mud flap */
      planeBox(B.paint, [XT + 0.08, 0, 1.36 + DZ], [-0.90, 0, -0.43], [0, 1, 0], [-0.43, 0, 0.90], 0, 0.14, s > 0 ? 1.45 : -1.82, s > 0 ? 1.82 : -1.45, 0, 0.04);
      /* team strips on the front fenders, which the camera sees from above */
      box(B.team, 1.55, 3.00, s > 0 ? 1.52 : -1.78, s > 0 ? 1.78 : -1.52, 1.370 + DZ, 1.405 + DZ);
      /* stowage boxes: flat topped, on the rear and middle fender, and the only thing
         that breaks the long flat fender lines in the cutaway drawing */
      box(B.paint, -3.30, -2.55, s > 0 ? 1.46 : -1.80, s > 0 ? 1.80 : -1.46, 1.38 + DZ, 1.52 + DZ);
      box(B.paint, -1.90, -0.55, s > 0 ? 1.52 : -1.80, s > 0 ? 1.80 : -1.52, 1.38 + DZ, 1.50 + DZ);
      box(B.paint, 0.20, 1.00, s > 0 ? 1.52 : -1.80, s > 0 ? 1.80 : -1.52, 1.38 + DZ, 1.48 + DZ);
      /* headlamp on the fender front corner, in a guard */
      cylX(B.dark, 3.02, 3.14, s * 1.60, 1.46 + DZ, 0.075, 10);
      cylX(B.glass, 3.14, 3.155, s * 1.60, 1.46 + DZ, 0.055, 10);
    }

    /* --- the glacis kit ------------------------------------------------ */
    /* driver's hatch on the centre line with its three periscopes */
    z = deckZ(2.40);
    cylZ(B.paint, 2.40, 0, z, z + 0.07, 0.24, 14);
    cylZ(B.dark, 2.40, 0, z + 0.07, z + 0.085, 0.18, 12);
    for (i = -1; i <= 1; i++) {
      box(B.dark, 2.62, 2.74, i * 0.19 - 0.065, i * 0.19 + 0.065, deckZ(2.68) - 0.01, deckZ(2.68) + 0.085);
      box(B.glass, 2.74, 2.752, i * 0.19 - 0.05, i * 0.19 + 0.05, deckZ(2.68) + 0.015, deckZ(2.68) + 0.07);
    }
    /* tow eyes on the beak */
    for (s = -1; s <= 1; s += 2) box(B.dark, 3.74, 3.86, s * 0.20 - 0.035, s * 0.20 + 0.035, 0.80, 0.92);

    /* --- engine deck and tail ----------------------------------------- */
    box(B.paint, XT + 0.45, -2.50, -0.82, 0.82, 1.50 + DZ, 1.545 + DZ);                 /* the raised deck plate     */
    box(B.dark, XT + 0.60, XT + 0.74, -0.56, 0.56, 1.545 + DZ, 1.575 + DZ);              /* its row of hold-downs     */
    /* the diesel's two big louvred grilles in the tail plate, as the Fort
       Lewis photograph shows them: a screen on the left, slats on the right */
    box(B.dark, XT - 0.03, XT, 0.10, 0.84, 0.80, 1.34 + DZ);
    box(B.dark, XT - 0.03, XT, -0.84, -0.10, 0.80, 1.34 + DZ);
    box(B.paint, XT - 0.045, XT - 0.03, 0.07, 0.87, 0.77, 0.82);
    box(B.paint, XT - 0.045, XT - 0.03, -0.87, -0.07, 0.77, 0.82);
    box(B.paint, XT - 0.045, XT - 0.03, 0.07, 0.87, 1.32 + DZ, 1.37 + DZ);
    box(B.paint, XT - 0.045, XT - 0.03, -0.87, -0.07, 1.32 + DZ, 1.37 + DZ);
    for (k = 0; k < 6; k++) box(B.paint, XT - 0.045, XT - 0.03, -0.80, -0.14, 0.88 + k * 0.10, 0.92 + k * 0.10);
    cylX(B.dark, XT - 0.04, XT, 0, 0.66, 0.045, 8);                           /* towing pintle              */
    for (s = -1; s <= 1; s += 2) box(B.dark, XT - 0.04, XT, s * 1.12 - 0.06, s * 1.12 + 0.06, 1.20 + DZ, 1.28 + DZ);
    /* the gun travel lock standing on the rear deck: a post and a cradle */
    box(B.dark, -3.12, -3.04, -0.04, 0.04, 1.545 + DZ, 2.04 + DZ);
    box(B.dark, -3.20, -2.96, -0.22, 0.22, 2.02 + DZ, 2.07 + DZ);
    box(B.dark, -3.20, -3.14, -0.22, -0.16, 2.07 + DZ, 2.15 + DZ);
    box(B.dark, -3.20, -3.14, 0.16, 0.22, 2.07 + DZ, 2.15 + DZ);

    /* --- running gear -------------------------------------------------- */
    var bg = beltGeometry(), nrm = bg.nrm, Q1 = bg.top[0], Q2 = bg.top[1];
    for (s = -1; s <= 1; s += 2) {
      belt(B.dark, bg.path, s * TY - TH, s * TY + TH);
      /* sprocket: two toothed rims round a hub */
      gear(B.paint, SPR.x, s * TY - 0.20, s * TY - 0.12, SPR.z, 0.29, 0.355, 11);
      gear(B.paint, SPR.x, s * TY + 0.12, s * TY + 0.20, SPR.z, 0.29, 0.355, 11);
      cylY(B.dark, SPR.x, s * TY - 0.26, s * TY + 0.26, SPR.z, 0.235, 14);
      cylY(B.paint, SPR.x, s * TY + (s > 0 ? 0.26 : -0.30), s * TY + (s > 0 ? 0.30 : -0.26), SPR.z, 0.14, 12);
      /* idler: two discs and a hub */
      cylY(B.dark, IDL.x, s * TY - 0.20, s * TY - 0.04, IDL.z, IDL.r, 16);
      cylY(B.dark, IDL.x, s * TY + 0.04, s * TY + 0.20, IDL.z, IDL.r, 16);
      cylY(B.paint, IDL.x, s * TY + (s > 0 ? 0.20 : -0.23), s * TY + (s > 0 ? 0.23 : -0.20), IDL.z, 0.23, 14);
      /* return rollers under the top run, on the line the belt really takes */
      for (k = 0; k < NROLL; k++) {
        var f = (XROLL[k] - Q1[0]) / (Q2[0] - Q1[0]);
        x = XROLL[k]; z = Q1[1] + (Q2[1] - Q1[1]) * f;
        x -= nrm[0] * (0.04 + RR); z -= nrm[1] * (0.04 + RR);
        cylY(B.dark, x, s * TY - 0.10, s * TY + 0.10, z, RR, 12);
        cylY(B.paint, x, s * TY + (s > 0 ? 0.10 : -0.115), s * TY + (s > 0 ? 0.115 : -0.10), z, 0.075, 8);
      }
      /* road wheels: the rubber and the star-shaped hub cap spin with the
         roadwheel node, the rim plate behind them is a plain disc and
         stays in the hull mesh */
      for (k = 0; k < NW; k++) {
        y = s * TY;
        cylY(B.paint, XW[k], y + (s > 0 ? 0.19 : -0.215), y + (s > 0 ? 0.215 : -0.19), ZW, 0.255, 14);
        cylY(WB[k].bin, 0, y - 0.19, y + 0.19, 0, RW, 14, s > 0, s < 0);
        gear(WB[k].bin, 0, y + (s > 0 ? 0.215 : -0.25), y + (s > 0 ? 0.25 : -0.215), 0, 0.085, 0.17, 6);
      }
    }
  }

  /* -------------------------------------------------------------- turret */
  /* Stations as [u, half width, height above the rim], u forward from the
     ring centre.  The plan is a fat egg: the widest point is behind the ring,
     the bustle overhangs the engine deck, and the front closes onto the
     mantlet. */
  var TST = [
    [-2.10, 0.90, 0.58], [-2.04, 1.22, 0.78], [-1.90, 1.50, 0.96], [-1.60, 1.66, 1.09],
    [-1.10, 1.72, 1.14], [-0.50, 1.72, 1.14], [0.20, 1.62, 1.09], [0.90, 1.38, 0.97],
    [1.45, 1.05, 0.85], [1.85, 0.74, 0.74], [2.05, 0.58, 0.68]
  ];
  /* the section, as [y fraction of the half width, z fraction of the height]:
     a domed roof, the widest point a third of the way up, then tucked in to
     the rim - the bell shape the photographs show at the ring */
  var TPF = [[0, 1.0], [0.34, 0.99], [0.62, 0.94], [0.84, 0.83], [0.96, 0.67], [1.0, 0.48],
             [0.97, 0.30], [0.90, 0.14], [0.84, 0.0]];
  var TZ0 = -0.02;
  function tint(u, c) {
    var i, a, b, f;
    if (u <= TST[0][0]) return TST[0][c];
    for (i = 0; i < TST.length - 1; i++) {
      a = TST[i]; b = TST[i + 1];
      if (u <= b[0]) { f = (u - a[0]) / (b[0] - a[0]); return a[c] + (b[c] - a[c]) * f; }
    }
    return TST[TST.length - 1][c];
  }
  function roofAt(u, v) {                          /* turret-local z of the roof skin at (u, v) */
    var w = tint(u, 1), h = tint(u, 2), sy = Math.min(1, Math.abs(v) / w), k, f;
    for (k = 0; k < 5; k++) {
      if (sy <= TPF[k + 1][0]) {
        f = (sy - TPF[k][0]) / (TPF[k + 1][0] - TPF[k][0]);
        return TZ0 + h * (TPF[k][1] + f * (TPF[k + 1][1] - TPF[k][1]));
      }
    }
    return TZ0 + h * TPF[5][1];
  }
  function turretRing(st) {
    var u = st[0], w = st[1], h = st[2], ring = [], i;
    for (i = 0; i < TPF.length; i++) ring.push([u, w * TPF[i][0], TZ0 + h * TPF[i][1]]);
    for (i = TPF.length - 1; i >= 1; i--) ring.push([u, -w * TPF[i][0], TZ0 + h * TPF[i][1]]);
    return ring;
  }
  function ellRing(u, wy, wz, zc, n) {
    var r = [], i, a;
    for (i = 0; i < n; i++) { a = i / n * TAU; r.push([u, wy * Math.sin(a), zc + wz * Math.cos(a)]); }
    return r;
  }

  function addTurret(B) {
    var i, k, s, rings = [], x, y, z, a, cu = -0.55, cv = -0.62, zc, ZG = 0.40, XMZ = XM - XR;

    /* --- the cast body ------------------------------------------------- */
    for (i = 0; i < TST.length; i++) rings.push(turretRing(TST[i]));
    loft(B.paint, rings, true);

    /* --- the M89 mantlet, a rounded cheek round the gun ---------------- */
    rings = [ellRing(1.75, 0.50, 0.50, 0.38, 18), ellRing(2.00, 0.56, 0.52, 0.39, 18),
             ellRing(2.28, 0.56, 0.50, ZG, 18), ellRing(2.50, 0.46, 0.42, ZG, 18),
             ellRing(2.64, 0.30, 0.28, ZG, 18), ellRing(2.70, 0.18, 0.18, ZG, 18)];
    loft(B.paint, rings, true);
    /* one coaxial .30 stub on the right of the gun */
    cylX(B.dark, 2.60, 2.90, -0.27, ZG - 0.02, 0.024, 8);
    cylX(B.dark, 2.58, 2.66, -0.27, ZG - 0.02, 0.05, 8);

    /* --- the 120 mm M58: root sleeve, tube, the swelling, the muzzle ---- */
    cyl(B.paint, [2.64, 0, ZG], [3.20, 0, ZG], 0.150, 0.108, 16);
    cyl(B.paint, [3.20, 0, ZG], [6.55, 0, ZG], 0.108, 0.088, 16, true, true);
    cyl(B.paint, [6.55, 0, ZG], [6.70, 0, ZG], 0.088, 0.122, 16, true, true);
    cyl(B.paint, [6.70, 0, ZG], [7.55, 0, ZG], 0.122, 0.122, 16, true, true);
    cyl(B.paint, [7.55, 0, ZG], [7.68, 0, ZG], 0.122, 0.092, 16, true, true);
    cyl(B.paint, [7.68, 0, ZG], [XMZ, 0, ZG], 0.092, 0.100, 16, true, false);

    /* --- rangefinder end housings: a rounded boss high on each flank, level
           with the cupola and a little ahead of it, a third of the way forward
           from the bustle, as the museum side photograph shows it ---------- */
    for (s = -1; s <= 1; s += 2) {
      y = s * (tint(-0.54, 1) * 0.74); zc = TZ0 + tint(-0.54, 2) * 0.88;
      cylY(B.paint, -0.54, y - s * 0.10, y + s * 0.15, zc, 0.15, 14, true, false);
      cylY(B.glass, -0.54, y + s * 0.15, y + s * 0.162, zc, 0.09, 12, true, false);
    }

    /* --- commander's cupola at the right rear, with the pintle .50 ------- */
    zc = roofAt(cu, cv);
    /* a low drum: the photographs put its top only 0.3-0.4 m above the roof */
    cylZ(B.paint, cu, cv, zc - 0.08, zc + 0.08, 0.47, 18);
    cylZ(B.paint, cu, cv, zc + 0.08, zc + 0.36, 0.40, 18);
    cylZ(B.paint, cu, cv, zc + 0.36, zc + 0.42, 0.36, 16);
    for (i = 0; i < 8; i++) {
      a = i / 8 * TAU + 0.2;
      rbox(B.glass, cu + 0.405 * Math.cos(a), cv + 0.405 * Math.sin(a), 0.010, 0.050, a, zc + 0.16, zc + 0.29);
    }
    cylZ(B.dark, cu + 0.18, cv - 0.22, zc + 0.42, zc + 0.68, 0.03, 8);        /* the mount post */
    box(B.dark, cu - 0.02, cu + 0.44, cv - 0.29, cv - 0.15, zc + 0.68, zc + 0.81);   /* the receiver  */
    cylX(B.dark, cu + 0.44, cu + 1.56, cv - 0.22, zc + 0.745, 0.016, 8);      /* barrel and jacket */
    cylX(B.dark, cu + 0.44, cu + 0.84, cv - 0.22, zc + 0.745, 0.032, 8);

    /* --- loader's hatch, left rear, and the gunner's sight, right front -- */
    zc = roofAt(-0.95, 0.62);
    cylZ(B.paint, -0.95, 0.62, zc - 0.03, zc + 0.065, 0.29, 16);
    cylZ(B.dark, -0.95, 0.62, zc + 0.065, zc + 0.08, 0.22, 12);
    zc = roofAt(0.60, -0.50);
    box(B.dark, 0.48, 0.74, -0.62, -0.38, zc - 0.02, zc + 0.12);
    box(B.glass, 0.74, 0.752, -0.58, -0.42, zc + 0.02, zc + 0.09);

    /* --- the rear: antenna base and the hand rail on the right flank ----- */
    y = -(tint(-1.45, 1) * 0.78); zc = TZ0 + tint(-1.45, 2) * 0.90;
    cylZ(B.dark, -1.45, y, zc - 0.04, zc + 0.50, 0.085, 10);
    box(B.dark, -1.70, -1.64, y - 0.12, y - 0.07, zc - 0.05, zc + 0.20);
    box(B.dark, -1.00, -0.94, y + 0.03, y + 0.08, zc - 0.02, zc + 0.20);
    box(B.dark, -1.70, -0.94, y - 0.115, y - 0.065, zc + 0.17, zc + 0.20);

    /* --- team plate on the roof behind the hatches ----------------------- */
    /* two slabs, split where the roof bends (u = -1.60), so the plate lies on the roof
       instead of sinking into it */
    var us = [-1.85, -1.60, -1.30], v0 = -0.48, v1 = 0.48, ua, ub;
    for (i = 0; i < 2; i++) {
      ua = us[i]; ub = us[i + 1];
      hexa(B.team, [[ua, v0, roofAt(ua, v0) - 0.02], [ub, v0, roofAt(ub, v0) - 0.02], [ub, v1, roofAt(ub, v1) - 0.02], [ua, v1, roofAt(ua, v1) - 0.02],
                    [ua, v0, roofAt(ua, v0) + 0.035], [ub, v0, roofAt(ub, v0) + 0.035], [ub, v1, roofAt(ub, v1) + 0.035], [ua, v1, roofAt(ua, v1) + 0.035]]);
    }
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.M103, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), TB = bins(T), WB = [], i, wg, tg;
    for (i = 0; i < NW; i++) WB.push({ bin: new Bin(T.dark, false) });
    addHull(HB, WB);
    flush(THREE, g, HB);
    for (i = 0; i < NW; i++) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { dark: WB[i].bin });
      g.add(wg);
    }
    addTurret(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(XR, 0, ZR);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

/* len is the measured X extent: from the sprocket's tail to the muzzle */
UNIT_MODELS["nato_e50_heavy"] = {
  len: 11.4,
  build: function (THREE, M, C) { return HeroM103.build(THREE, M, C, "M103"); }
};
UNIT_MODELS["nato_e60_heavy"] = {
  len: 11.4,
  build: function (THREE, M, C) { return HeroM103.build(THREE, M, C, "A2"); }
};
