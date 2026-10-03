/* ============ ru_t10.js - HERO models: the T-10 heavy tank family ============
   The last Soviet heavy tank, drawn in the two guises the era tables ask for:
     pact_e50_heavy   T-10 (Object 730)    1953   122 mm D-25TA, double-baffle muzzle brake
     pact_e60_heavy   T-10M (Object 272)   1957   122 mm M-62-T2, multi-baffle muzzle brake,
                                                  wider over the skirts, 14.5 mm KPVT
   pact_e60_heavy used to borrow hvy_n (the present-day Abrams); it has its own tank now.

   What each feature rests on (Wikimedia Commons photographs, all looked at):
     r0  "T-10 tank.jpg" (Kyiv museum, front three-quarter): the sharp pike nose
         with tow eyes, wide flared front mudguards, headlamp guard on the left
         fender, stowage boxes on the fenders, the thin bright side armour screen
         along the fender edge, the low smooth cast dome turret with a round
         mantlet boss, the commander's cupola with a sight at the right rear.
     r1  "T-10M Heavy Tank (37573039866)" (Kubinka, left side): seven road wheels a
         side, the high rear sprocket, three return rollers, the ribbed multi-baffle
         muzzle brake, the round infrared lamp drum on the left of the mantlet, the
         anti-aircraft machine gun on the roof at the left rear.
     r2  "T-10 Heavy Tank (23752171808)" (Kubinka, left side): the same running gear,
         the box-like double-baffle brake with two slot windows, the roof machine
         gun, the engine deck, no lamp drum on the mantlet.
   Published figures used (Wikipedia / museum data):
     both   width 3.518 m, track gauge 2.66 m, track 0.72 m wide, base 4.55 m
     T-10   length gun forward 9.715 m, height 2.46 m   (ru.wikipedia infobox; en gives
            3.56 m wide, 2.43 m high, so 3.52 m is the Russian figure kept)
     T-10M  length gun forward 10.56 m, height 2.585 m  (ru.wikipedia; the extra height
            is not located in any photograph - the roof gun mount and sight are raised
            to approach it, the rest is left)
   NOT confirmed by any reference I could fetch, so drawn plainly and listed as
   risks: the road wheel size (about 0.68 m, scaled off the photographs), the exact
   hull section, the tow cable draped on the hull side (not drawn), the fuel drums the
   era table lists (none in any photograph, not drawn), the coaxial gun (a short stub
   only), any difference between the two turret castings (drawn the same), and the
   T-10's roof gun calibre (a 12.7 mm DShKM per the era table).
   1950s-60s Soviet green, no markings of any kind.

   Nodes: "turret" (ring centre, gun along +X, at rest forward) and seven "roadwheel"
   groups (axle along local Y).  Four materials: paint, dark, glass and the plain
   C.team on the front fender strips and the turret roof, exactly as handed in.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroT10 = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  var VARIANTS = {
    T10:  { paint: { base: "#4c5a33", blots: ["#435130", "#58673c"], seed: 53 },
            ty: 1.33, muzzle: 5.95, brake: "double", lamp: false, mg: "dshk" },
    T10M: { paint: { base: "#46563a", blots: ["#3d4d33", "#52633f"], seed: 57 },
            ty: 1.33, muzzle: 6.79, brake: "multi", lamp: true, mg: "kpvt" }
  };

  var XT = -3.70;                         /* tail plate                      */
  var XR = -0.50, ZR = 1.38;              /* turret ring centre and deck     */
  var TH = 0.36;                          /* half track width                */
  var ZW = 0.40, RW = 0.34;               /* road wheel axle height, radius  */
  var NW = 7, XW0 = -2.52, XWP = 0.76;
  var SPR = { x: -3.25, z: 0.62, r: 0.33 };
  var IDL = { x: 2.82, z: 0.46, r: 0.34 };
  var RR = 0.11, XROLL = [-1.75, -0.20, 1.35], NROLL = 3;
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
  var HST = [
    { x: XT,        wd: 0.95, ws: 1.30, wl: 1.00, zd: 1.25, zs: 1.00, zb: 0.55 },
    { x: XT + 0.14, wd: 1.05, ws: 1.40, wl: 1.10, zd: 1.38, zs: 1.08, zb: 0.42 },
    { x: 1.60,      wd: 1.05, ws: 1.40, wl: 1.10, zd: 1.38, zs: 1.08, zb: 0.42 },
    { x: 2.30,      wd: 1.00, ws: 1.34, wl: 1.05, zd: 1.34, zs: 1.04, zb: 0.42 },
    { x: 2.90,      wd: 0.72, ws: 0.96, wl: 0.80, zd: 1.14, zs: 0.90, zb: 0.50 },
    { x: 3.40,      wd: 0.38, ws: 0.50, wl: 0.45, zd: 0.96, zs: 0.80, zb: 0.60 },
    { x: 3.70,      wd: 0.08, ws: 0.12, wl: 0.12, zd: 0.82, zs: 0.74, zb: 0.68 }
  ];
  function hullRing(o) {
    var ch = Math.min(0.20, (o.zs - o.zb) * 0.45), wc = Math.max(0.05, o.wl - 0.25), i;
    var L = [[0, o.zd], [o.wd, o.zd], [o.ws, o.zd - 0.12], [o.ws, o.zs], [o.wl, o.zs], [o.wl, o.zb + ch], [wc, o.zb]];
    var ring = [];
    for (i = 0; i < L.length; i++) ring.push([o.x, L[i][0], L[i][1]]);
    for (i = L.length - 1; i >= 1; i--) ring.push([o.x, -L[i][0], L[i][1]]);
    return ring;
  }
  function deckZ(x) {
    var i, a, b, f;
    for (i = 0; i < HST.length - 1; i++) {
      a = HST[i]; b = HST[i + 1];
      if (x <= b.x) { f = (x - a.x) / (b.x - a.x || 1); return a.zd + (b.zd - a.zd) * f; }
    }
    return HST[HST.length - 1].zd;
  }

  function addHull(B, WB, V) {
    var i, k, s, x, y, z, rings = [], TY = V.ty, fo = 1.76, FZ = 1.17;
    for (i = 0; i < HST.length; i++) rings.push(hullRing(HST[i]));
    loft(B.paint, rings, false);

    for (s = -1; s <= 1; s += 2) {
      /* fenders: flat track guards, the front pair flared out and drooping */
      prism(B.paint, [[XT + 0.04, s * 1.05], [XT + 0.04, s * fo], [2.10, s * fo], [2.10, s * 1.05]], FZ, FZ + 0.045);
      prism(B.paint, [[2.10, s * 0.95], [2.10, s * fo], [3.05, s * fo], [3.30, s * (fo - 0.20)], [3.30, s * 0.55]], FZ, FZ + 0.045);
      planeBox(B.paint, [3.24, 0, FZ + 0.045], [0.93, 0, -0.37], [0, 1, 0], [0.37, 0, 0.93], 0, 0.36, s > 0 ? 0.62 : -(fo - 0.20), s > 0 ? (fo - 0.20) : -0.62, 0, 0.035);
      planeBox(B.paint, [XT + 0.06, 0, FZ + 0.02], [-0.90, 0, -0.43], [0, 1, 0], [-0.43, 0, 0.90], 0, 0.14, s > 0 ? 1.05 : -fo, s > 0 ? fo : -1.05, 0, 0.035);
      /* the thin side armour screen along the fender edge, standing on the track */
      box(B.paint, XT + 0.30, 2.15, s > 0 ? fo - 0.035 : -fo, s > 0 ? fo : -fo + 0.035, 0.88, FZ + 0.045);
      /* team strips on the front fenders */
      box(B.team, 1.75, 2.95, s > 0 ? TY - 0.20 : -TY - 0.20, s > 0 ? TY + 0.20 : -TY + 0.20, FZ + 0.045, FZ + 0.075);
      /* stowage boxes on the rear fender, as in the Kyiv photograph */
      box(B.paint, -3.00, -2.30, s > 0 ? TY - 0.05 : -TY - 0.30, s > 0 ? TY + 0.30 : -TY + 0.05, FZ + 0.045, FZ + 0.22);
      box(B.paint, -1.90, -1.20, s > 0 ? TY + 0.00 : -TY - 0.30, s > 0 ? TY + 0.30 : -TY + 0.00, FZ + 0.045, FZ + 0.19);
    }
    /* headlamp in a guard on the left front fender */
    cylX(B.dark, 2.62, 2.78, TY + 0.10, FZ + 0.15, 0.085, 10);
    cylX(B.glass, 2.78, 2.795, TY + 0.10, FZ + 0.15, 0.06, 10);

    /* driver's hatch and periscopes on the glacis crown, a tow eye pair on the pike */
    z = deckZ(2.10);
    cylZ(B.paint, 2.10, 0.0, z, z + 0.07, 0.26, 14);
    cylZ(B.dark, 2.10, 0.0, z + 0.07, z + 0.085, 0.19, 12);
    for (i = -1; i <= 1; i++) {
      box(B.dark, 2.40, 2.52, i * 0.20 - 0.065, i * 0.20 + 0.065, deckZ(2.46) - 0.01, deckZ(2.46) + 0.08);
      box(B.glass, 2.52, 2.532, i * 0.20 - 0.05, i * 0.20 + 0.05, deckZ(2.46) + 0.015, deckZ(2.46) + 0.065);
    }
    for (s = -1; s <= 1; s += 2) box(B.dark, 3.52, 3.66, s * 0.14 - 0.035, s * 0.14 + 0.035, 0.80, 0.90);

    /* engine deck: raised louvre block and the tail plate */
    box(B.paint, XT + 0.40, -2.00, -0.80, 0.80, 1.38, 1.425);
    for (k = 0; k < 8; k++) box(B.dark, XT + 0.55 + k * 0.17, XT + 0.60 + k * 0.17, -0.66, 0.66, 1.425, 1.45);
    box(B.dark, XT - 0.04, XT, -0.50, 0.50, 0.70, 1.10);
    cylX(B.dark, XT - 0.05, XT, 0, 0.62, 0.045, 8);
    for (s = -1; s <= 1; s += 2) box(B.dark, XT - 0.04, XT, s * 1.00 - 0.06, s * 1.00 + 0.06, 1.05, 1.13);

    /* running gear */
    var bg = beltGeometry(), nrm = bg.nrm, Q1 = bg.top[0], Q2 = bg.top[1], f;
    for (s = -1; s <= 1; s += 2) {
      belt(B.dark, bg.path, s * TY - TH, s * TY + TH);
      gear(B.paint, SPR.x, s * TY - 0.22, s * TY - 0.14, SPR.z, 0.28, 0.345, 12);
      gear(B.paint, SPR.x, s * TY + 0.14, s * TY + 0.22, SPR.z, 0.28, 0.345, 12);
      cylY(B.dark, SPR.x, s * TY - 0.26, s * TY + 0.26, SPR.z, 0.22, 14);
      cylY(B.dark, IDL.x, s * TY - 0.22, s * TY - 0.04, IDL.z, IDL.r, 16);
      cylY(B.dark, IDL.x, s * TY + 0.04, s * TY + 0.22, IDL.z, IDL.r, 16);
      cylY(B.paint, IDL.x, s * TY - 0.25, s * TY + 0.25, IDL.z, 0.20, 12);
      for (k = 0; k < NROLL; k++) {
        f = (XROLL[k] - Q1[0]) / (Q2[0] - Q1[0]);
        x = XROLL[k]; z = Q1[1] + (Q2[1] - Q1[1]) * f;
        x -= nrm[0] * (0.04 + RR); z -= nrm[1] * (0.04 + RR);
        cylY(B.dark, x, s * TY - 0.10, s * TY + 0.10, z, RR, 12);
        cylY(B.paint, x, s * TY - 0.12, s * TY + 0.12, z, 0.06, 8);
      }
      for (k = 0; k < NW; k++) {
        y = s * TY;
        /* the steel rim plate between the two tyres, fixed to the hull side */
        cylY(B.paint, XW[k], y - 0.20, y + 0.20, ZW, 0.27, 14);
        cylY(WB[k].bin, 0, y - 0.31, y + 0.31, 0, RW, 16, false, false);
        gear(WB[k].bin, 0, y + (s > 0 ? 0.31 : -0.34), y + (s > 0 ? 0.34 : -0.31), 0, 0.10, 0.22, 8);
      }
    }
  }

  /* -------------------------------------------------------------- turret */
  var TST = [
    [-1.80, 0.85, 0.50], [-1.72, 1.20, 0.74], [-1.45, 1.44, 0.92], [-0.95, 1.55, 0.99],
    [-0.30, 1.55, 0.99], [0.40, 1.46, 0.95], [1.00, 1.24, 0.86], [1.48, 0.90, 0.76],
    [1.80, 0.60, 0.68]
  ];
  TST.forEach(function (q) { q[2] *= 0.88; });
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
  function roofAt(u, v) {
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

  function addTurret(B, V) {
    var i, k, s, rings = [], y, z, zc, ZG = 0.50, XMZ = V.muzzle - XR, x0, bx;

    for (i = 0; i < TST.length; i++) rings.push(turretRing(TST[i]));
    loft(B.paint, rings, true);

    /* the round mantlet boss round the gun root */
    rings = [ellRing(1.50, 0.36, 0.30, ZG - 0.10, 16), ellRing(1.80, 0.38, 0.32, ZG - 0.04, 16),
             ellRing(2.05, 0.36, 0.31, ZG, 16), ellRing(2.22, 0.28, 0.25, ZG, 16), ellRing(2.28, 0.18, 0.18, ZG, 16)];
    loft(B.paint, rings, true);
    /* coaxial machine gun, a short stub on the right of the gun */
    cylX(B.dark, 2.20, 2.55, -0.28, ZG - 0.04, 0.024, 8);
    /* infrared lamp drum on the left of the mantlet: T-10M only (photograph r1) */
    if (V.lamp) {
      cylX(B.dark, 1.80, 2.12, 0.50, ZG + 0.04, 0.15, 14);
      cylX(B.glass, 2.12, 2.135, 0.50, ZG + 0.04, 0.115, 14);
    }

    /* the 122 mm gun */
    cyl(B.paint, [2.20, 0, ZG], [2.80, 0, ZG], 0.150, 0.100, 16);
    x0 = XMZ - (V.brake === "multi" ? 0.62 : 0.50);
    cyl(B.paint, [2.80, 0, ZG], [x0, 0, ZG], 0.100, 0.075, 16, true, true);
    if (V.brake === "double") {
      /* double-baffle box brake with two slot windows (photograph r2) */
      box(B.paint, x0, XMZ, -0.115, 0.115, ZG - 0.115, ZG + 0.115);
      box(B.dark, x0 + 0.12, x0 + 0.20, -0.125, 0.125, ZG - 0.06, ZG + 0.06);
      box(B.dark, x0 + 0.30, x0 + 0.38, -0.125, 0.125, ZG - 0.06, ZG + 0.06);
    } else {
      /* multi-baffle brake: a core with a stack of discs (photograph r1) */
      cyl(B.paint, [x0, 0, ZG], [XMZ, 0, ZG], 0.095, 0.095, 12, true, false);
      for (k = 0; k < 6; k++) {
        bx = x0 + 0.04 + k * 0.095;
        cyl(B.paint, [bx, 0, ZG], [bx + 0.055, 0, ZG], 0.135, 0.135, 12);
      }
    }

    /* commander's cupola at the right rear, with its sight */
    zc = roofAt(-0.60, -0.62);
    cylZ(B.paint, -0.60, -0.62, zc - 0.08, zc + 0.10, 0.30, 16);
    cylZ(B.paint, -0.60, -0.62, zc + 0.10, zc + 0.16, 0.25, 14);
    for (i = 0; i < 6; i++) {
      var a = i / 6 * TAU + 0.25;
      rbox(B.glass, -0.60 + 0.265 * Math.cos(a), -0.62 + 0.265 * Math.sin(a), 0.01, 0.045, a, zc + 0.06, zc + 0.14);
    }
    box(B.dark, -0.55, -0.30, -0.72, -0.52, zc + 0.16, zc + 0.26);
    box(B.glass, -0.30, -0.298, -0.69, -0.55, zc + 0.19, zc + 0.24);

    /* loader's hatch on the left rear with the anti-aircraft gun on a post */
    var hu = -1.00, hv = 0.62, hz = roofAt(hu, hv);
    cylZ(B.paint, hu, hv, hz - 0.04, hz + 0.07, 0.29, 16);
    cylZ(B.dark, hu, hv, hz + 0.07, hz + 0.085, 0.22, 12);
    cylZ(B.dark, hu - 0.12, hv + 0.15, hz + 0.07, hz + 0.12, 0.03, 8);
    var kp = V.mg === "kpvt", gl = kp ? 1.55 : 1.05, gr = kp ? 0.026 : 0.02;
    var gz = kp ? 0.30 : 0.19;
    box(B.dark, hu - 0.30, hu + 0.12, hv + 0.09, hv + 0.21, hz + 0.12, hz + gz + 0.04);
    cylX(B.dark, hu + 0.12, hu + 0.12 + gl, hv + 0.15, hz + gz, gr, 8);
    cylX(B.dark, hu + 0.12, hu + 0.52, hv + 0.15, hz + gz, gr * 1.8, 8);

    /* a rangefinder-less sighting window in the right cheek and the team plate on the roof */
    var us = [-1.55, -1.25, -0.95], v0 = -0.30, v1 = 0.30;
    for (i = 0; i < 2; i++) {
      var ua = us[i], ub = us[i + 1];
      hexa(B.team, [[ua, v0, roofAt(ua, v0) - 0.02], [ub, v0, roofAt(ub, v0) - 0.02], [ub, v1, roofAt(ub, v1) - 0.02], [ua, v1, roofAt(ua, v1) - 0.02],
                    [ua, v0, roofAt(ua, v0) + 0.035], [ub, v0, roofAt(ub, v0) + 0.035], [ub, v1, roofAt(ub, v1) + 0.035], [ua, v1, roofAt(ua, v1) + 0.035]]);
    }
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.T10, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), TB = bins(T), WB = [], i, wg, tg;
    for (i = 0; i < NW; i++) WB.push({ bin: new Bin(T.dark, false) });
    addHull(HB, WB, V);
    flush(THREE, g, HB);
    for (i = 0; i < NW; i++) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { dark: WB[i].bin });
      g.add(wg);
    }
    addTurret(TB, V);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(XR, 0, ZR);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

/* len is the measured X extent: sprocket tail to muzzle */
UNIT_MODELS["pact_e50_heavy"] = {
  len: 9.72,
  build: function (THREE, M, C) { return HeroT10.build(THREE, M, C, "T10"); }
};
UNIT_MODELS["pact_e60_heavy"] = {
  len: 10.56,
  build: function (THREE, M, C) { return HeroT10.build(THREE, M, C, "T10M"); }
};
