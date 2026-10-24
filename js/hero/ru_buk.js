/* ============ ru_buk.js - HERO models: the Buk TELAR family ============
   The Soviet / Russian 9K37 / 9K317 Buk medium-range surface-to-air system,
   the self-propelled launcher-radar vehicle (TELAR), each row drawn as ITS
   launcher:
     pact_e80_buk     9A310M1 TELAR of the 9K37M1 Buk-M1 (SA-11 Gadfly)  (1983-)
     pact_e00_buk     9A317 TELAR of the 9K317 Buk-M2 (SA-17 Grizzly)    (2008-)
     pact_e00_buk_m3  9A317M TELAR of the 9K317M Buk-M3 (SA-27 Gollum)   (2016-)

   REFERENCES (Wikimedia Commons, fetched at 960 px):
     [K]  File:9A310 self-propelled launch vehicle for Buk-M1-2 Air defence
          system.jpg (Vitaly Kuzmin; 9A310M1-2, left side, turret in march
          order with the dome over the rear)
     [F]  File:Buk-M1-2 9A310M1-2.jpg (from the front, dome forward, the four
          rounds raised side by side)
     [P2] File:9A317 Buk-M2 - 2013 Moscow Victory Day Parade rehearsal.jpg
     [N2] File:9A317 Buk-M2 - parade-rehearsal (without missiles).jpg (a flat
          side view of two 9A317 in march order: the hull and turret drawing)
     [M2] File:Buk-M2-MAKS-2007.jpg and Buk-M2-MAKS-2007-2.jpg (9A317 with the
          turret turned across the hull, launcher raised)
     [T2] File:Buk TELAR Moscow 2015.jpg (9A317 from above, four 9M317 stowed)
     [A3] File:9A317M Armia2018.jpg (9A317M side view, containers raised;
          the 7-wheel running gear drawing)
     [R3] File:9A317M "Buk-M3" during the "Armiya 2021" exhibition.jpg
     [P3] File:2020 Moscow Victory Day Parade 038.jpg (9A317M in service,
          march order, six containers stowed, red caps)
     [G]  File:GM-577.svg (the GM-5xx chassis three-view: sloped front, vertical
          rear, six road wheels)
     ru.wikipedia "Buk (zenitnyi raketnyi kompleks)" for dates and make-up.

   RECOGNITION LIST (what each rests on, where it shows):
     1. GM-569 tracked hull: sloped two-plate front with the two rounded hump
        covers, headlamps in guards and a centre ladder; vertical rear plate
        with stowage [F][M2][G] - hull front and rear plates.
     2. Running gear: rear toothed sprocket and front idler both raised, six
        rubber-tyred disc road wheels (9A310M1, 9A317) [K][N2], SEVEN on the
        9A317M [A3] - roadwheel groups.
     3. Side stowage boxes in a row on the upper hull above a flat fender
        ledge [K][N2][A3]; a long mesh grille low on the 9A310's hull side [K].
     4. A long turret over most of the hull, hinged hatch panels on its
        leaning upper sides [K][N2][P3].
     5. 9A310M1: the big rounded-top Fire Dome (9S35) radar housing at the
        turret front, flat rear face, bull nose [K][F].
     6. 9A310M1 / 9A317: FOUR rounds side by side on a rail launcher along the
        roof, noses toward the radar, the launcher hinged at the tail end and
        raised steeply to fire [F][M2][T2][P2].
     7. 9M38M1: cropped-delta wings well aft of mid-body and small tail fins;
        9M317: long, low-span wing strakes and larger tail fins [K][T2][M2].
     8. 9A317: a long flat-sided turret with two rows of panels and the
        narrower radar housing standing up above the roof at its end
        ("the raised radar") [N2][T2][P2].
     9. 9A317M: a large rounded-octagon radar housing with a second box and
        the optical sight on its roof, a sloped plate behind it [A3][R3].
    10. 9A317M: SIX transport-launch containers 3 across x 2 high in a
        cradle, red end caps at the end away from the radar, lying along the
        turret at rest and swung up through the vertical to fire [A3][R3][P3].
    11. Hoop handrails over the launcher and the servo sight on a pedestal
        beside the radar [K][F][N2].
    12. Paint: plain Soviet / Russian green; no numbers, no markings.

   MEASUREMENTS (scale from the side views, see CHECKS below):
     - Hull 7.8 m, deck 1.92 m, width over the tracks 3.22 m (published
       3.25 m).  The published 9.3 m is the overall length in march order,
       launcher rails / rounds overhanging the hull; [N2] gives a total height
       to hull length of 0.50 and [A3] 0.46, which with the published 3.8 m
       height fixes the hull at 7.5-7.9 m, not 9.3 m.  The second pass of the
       old file stretched the hull to 9.3 m; that is corrected here.
     - Road wheels 0.62 m, sprocket rear, idler front (station tables RG6 /
       RG7 below, read off [N2] at 81 px/m and [A3] at 107 px/m).
     - 9M38M1 / 9M317: 5.55 m x 0.40 m (published).  9A317M container: 4.8 m x
       0.50 m, measured on [P3] against the hull (NOT published).
     - Firing elevations read off photographs, not published: 70 deg for the
       rail launchers [M2], the 9A317M bundle swung 100 deg from its stowed
       line so it stands 10 deg past the vertical over the radar [A3][R3]
       (userData.el is negative for it: the bundle lies with its cap end
       aft, so the pod's -X end rises).
   CORRECTIONS to the old header: the hull length (above); the M2 now has its
     radar housing standing above the roof as [T2][N2] show; the M3 caps lie
     at the end away from the radar [P3] (the old file had them forward);
     the M3 has seven road wheels [A3]; the four rounds lie side by side [F]
     [P2][T2], not two above two.
   NOT CONFIRMED / NOT DRAWN: the march order (turret turned to the rear) the
     game cannot draw; the whip antennas (too thin to read); the 9A317M's
     lift linkage (drawn as one hinge at the containers' butt end, so raised
     it stands closer behind the radar than [A3] shows).  No photograph shows
     a radar on a mast on the 9A317: the Buk-M2 radar on a 21 m mast is the
     9S36, a separate vehicle of the battery, and is not drawn.

   Paint (sampled, taken to ~0.85): 9A310M1 Soviet green #455437 ([F]);
   9A317 dark Russian green #3c4434 ([N2], [P2]); 9A317M #4b573f ([A3],
   [P3]), containers in the same green with red caps [P3].

   Materials: PAINT (canvas-textured), DARK, GLASS, TEAM (the plain C.team on
   two small hull plates), WHEEL / pod (vertex-coloured).  Named nodes:
   "turret" (ring centre, 0.25 m ahead of mid-hull), "podelev" inside it
   (userData.el, userData.cells: mouth x, y, z, rear x in the group frame),
   "roadwheel" (one group per station, both sides).
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.
   ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBuk = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  /* running gear station tables: road wheel x, radius, centre height;
     idler (front) and sprocket (rear) x, z, r */
  var RG6 = { XW: [-2.35, -1.52, -0.66, 0.24, 1.27, 2.27], RW: 0.31, ZW: 0.37,
              XI: 3.12, ZI: 0.66, RI: 0.29, XS: -3.02, ZS: 0.78, RS: 0.33 };
  var RG7 = { XW: [-1.93, -1.13, -0.33, 0.44, 1.18, 1.92, 2.65], RW: 0.31, ZW: 0.37,
              XI: 3.33, ZI: 0.74, RI: 0.29, XS: -2.62, ZS: 0.60, RS: 0.33 };

  var VARIANTS = {
    M1: { paint: { base: "#455437", blots: ["#41503a", "#4b5a39"], seed: 11 }, rg: RG6, grille: true },
    M2: { paint: { base: "#3c4434", blots: ["#394131", "#424a38"], seed: 23 }, rg: RG6 },
    M3: { paint: { base: "#4b573f", blots: ["#48543c", "#505d43"], seed: 31 }, rg: RG7 }
  };

  var TY = 1.36, TH = 0.25;               /* track centre line and half width */
  var DZ = 1.92;                          /* hull deck */
  var HX = 0.25;                          /* turret ring centre */
  var RG = RG6;                           /* the running gear being built */

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function raw(hex, k) {
    var n = typeof hex === "string" ? parseInt(hex.slice(1), 16) : hex; k = k || 1;
    return [Math.min(1, ((n >> 16) & 255) / 255 * k), Math.min(1, ((n >> 8) & 255) / 255 * k), Math.min(1, (n & 255) / 255 * k)];
  }
  /* one bin of triangles per material; the painted bin gets planar UVs in
     metres (texture repeat 3 m) from each face's dominant axis; a
     vertex-coloured bin carries bin.col */
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
  function quad(bin, a, b, c, d, want) {
    var f = cross(sub(b, a), sub(c, a));
    if (dot(f, want) >= 0) { bin.tri(a, b, c); bin.tri(a, c, d); }
    else { bin.tri(a, c, b); bin.tri(a, d, c); }
  }
  /* a closed solid: the signed volume says whether the faces point out */
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
    if (x0 > x1) { t = x0; x0 = x1; x1 = t; }
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function vcView(bin, col) { return { tri: function (a, b, c, na, nb, nc) { bin.col = col; bin.tri(a, b, c, na, nb, nc); } }; }
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

  /* a convex XZ outline whose side faces lean in (half width wa at z = za,
     wb at z = zb), or a straight prism from y0 to y1 */
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
  function prism(bin, pts, y0, y1) { taper(bin, pts, -1, 1, 0, 1, y0, y1); }

  /* a rounded-rectangle cross-section in (y, z): half width w, from zb to zt,
     top corner radius rt, bottom corner radius rb; k points per corner;
     counter-clockwise seen from +X */
  function rrSec(w, zb, zt, rt, rb, k) {
    var P = [], C = [[-w + rb, zb + rb, rb, 180], [w - rb, zb + rb, rb, 270], [w - rt, zt - rt, rt, 0], [-w + rt, zt - rt, rt, 90]], c, i, a;
    for (c = 0; c < 4; c++) for (i = 0; i <= k; i++) {
      a = (C[c][3] + 90 * i / k) * Math.PI / 180;
      P.push([C[c][0] + Math.cos(a) * C[c][2], C[c][1] + Math.sin(a) * C[c][2]]);
    }
    return P;
  }
  /* LOFT: a skin through cross-sections S[i] (equal point counts, (y, z)
     loops) at stations X[i], capped at both ends; smooth normals round each
     section, tilted by the change between stations */
  function loft(bin, X, S) {
    var ns = X.length, n = S[0].length, V = [], N = [], F = [], i, j, k, p, q, r, t, e, nx, b0, b1;
    for (i = 0; i < ns; i++) {
      for (j = 0; j < n; j++) {
        p = S[i][(j + n - 1) % n]; q = S[i][(j + 1) % n];
        t = [q[0] - p[0], q[1] - p[1]];
        var n2 = [t[1], -t[0]], l2 = Math.sqrt(n2[0] * n2[0] + n2[1] * n2[1]) || 1;
        n2 = [n2[0] / l2, n2[1] / l2];
        /* the section's radial change along x tilts the normal */
        var i0 = Math.max(0, i - 1), i1 = Math.min(ns - 1, i + 1);
        e = [S[i1][j][0] - S[i0][j][0], S[i1][j][1] - S[i0][j][1]];
        nx = -(e[0] * n2[0] + e[1] * n2[1]) / ((X[i1] - X[i0]) || 1);
        V.push([X[i], S[i][j][0], S[i][j][1]]);
        N.push(unit([nx, n2[0], n2[1]]));
      }
    }
    for (i = 0; i < ns - 1; i++) for (j = 0; j < n; j++) {
      k = (j + 1) % n; r = i * n;
      F.push([r + j, r + n + j, r + n + k], [r + j, r + n + k, r + k]);
    }
    /* caps: centre fans with flat normals */
    for (i = 0; i < 2; i++) {
      var si = i ? ns - 1 : 0, cy = 0, cz = 0, ax = [i ? 1 : -1, 0, 0];
      for (j = 0; j < n; j++) { cy += S[si][j][0] / n; cz += S[si][j][1] / n; }
      b0 = V.length; V.push([X[si], cy, cz]); N.push(ax);
      b1 = V.length;
      for (j = 0; j < n; j++) { V.push([X[si], S[si][j][0], S[si][j][1]]); N.push(ax); }
      for (j = 0; j < n; j++) { k = (j + 1) % n; F.push(i ? [b0, b1 + j, b1 + k] : [b0, b1 + k, b1 + j]); }
    }
    solid(bin, V, F, N);
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
      /* faded patches of repaint */
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 8; i++) {
          x = R() * 256; y = R() * 256; rr = 14 + R() * 30;
          q.beginPath();
          for (a = 0; a < 7; a++) {
            ang = a / 7 * TAU; rd = rr * (0.55 + R() * 0.7);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      /* panel seams every ~1.1 m (85 px of a 3 m tile) and grime streaks */
      q.strokeStyle = "rgba(10,12,8,0.30)"; q.lineWidth = 1.2;
      for (i = 0; i < 3; i++) {
        q.beginPath(); q.moveTo(i * 85 + 20, 0); q.lineTo(i * 85 + 20, 256); q.stroke();
        q.beginPath(); q.moveTo(0, i * 85 + 40); q.lineTo(256, i * 85 + 40); q.stroke();
      }
      for (i = 0; i < 60; i++) {
        q.fillStyle = (i % 2) ? "rgba(15,14,10,0.08)" : "rgba(235,232,210,0.05)";
        q.fillRect(R() * 256, R() * 256, 2 + R() * 22, 2 + R() * 14);
      }
      for (i = 0; i < 26; i++) {
        q.fillStyle = "rgba(40,34,24,0.10)";
        q.fillRect(R() * 256, R() * 256, 1.5 + R() * 2, 10 + R() * 30);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }

  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x24262a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2833, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.85, metalness: 0.08 });
    /* vertex colours: the authored sRGB value / 255, as ru_t72.js writes them */
    T.steel = raw(V.paint.base, 1.08);
    T.green = raw(V.paint.base, 1.0);
    T.rubber = raw(0x262726);
    T.hubc = raw(0x55584e);
    T.railc = raw(0x2a2c2e);
    T.nose = raw(0xd4d6cc);
    T.mbody = raw(0x4e6036);
    T.wing = raw(0xb9bdb4);
    T.cap = raw(0x9a2a22);
    return T;
  }
  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b || !b.P || !b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  /* ------------------------------------------------------------- the track */
  /* the centre line: convex hull of idler, sprocket and end road wheels,
     each grown by the band's half thickness, counter-clockwise in (x, z) */
  function trackLine() {
    var n = RG.XW.length;
    var C = [[RG.XI, RG.ZI, RG.RI], [RG.XW[0], RG.ZW, RG.RW], [RG.XW[n - 1], RG.ZW, RG.RW], [RG.XS, RG.ZS, RG.RS]], pts = [], i, k, a, r;
    for (i = 0; i < C.length; i++) {
      r = C[i][2] + 0.04;
      for (k = 0; k < 24; k++) { a = k / 24 * TAU; pts.push([C[i][0] + Math.cos(a) * r, C[i][1] + Math.sin(a) * r]); }
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
    return lo.concat(up);
  }
  /* the band round the line (0.08 thick) and its shoe grousers */
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
  function addHull(B, V) {
    var P = B.paint, D = B.dark, G = B.glass, T = B.team, s, i, x, L = trackLine(), ys;
    /* lower hull between the tracks: flat belly, sloped lower nose plate */
    prism(P, [[-3.86, 0.48], [3.30, 0.48], [3.95, 1.10], [-3.90, 1.10], [-3.90, 0.62]], -1.10, 1.10);
    /* upper hull over the tracks, from the side station table: vertical
       rear plate, deck at 1.92, upper glacis 3.40 -> 3.95 down to the nose
       plate [N2][G]; its top edges chamfered 0.10 */
    var UH = [[-3.90, 1.06], [3.72, 1.06], [3.95, 1.28], [3.95, 1.46], [3.40, 1.90], [3.30, DZ], [-3.84, DZ], [-3.90, 1.86]];
    prism(P, UH, -1.40, 1.40);
    prism(P, [[-3.90, 1.06], [3.72, 1.06], [3.95, 1.28], [3.95, 1.46], [3.50, 1.82], [-3.90, 1.82]], -1.50, 1.50);
    for (s = -1; s <= 1; s += 2) {
      planeBox(P, [0, s * 1.40, DZ], [1, 0, 0], unit([0, s * 1, -1]), unit([0, s, 1]), -3.84, 3.30, 0, 0.142, -0.05, 0);
      /* fender ledge over the track, its front curling down over the idler */
      box(P, -3.95, 3.62, s * 1.50, s * 1.66, 1.04, 1.10);
      box(D, -3.95, 3.62, s * 1.655, s * 1.665, 0.98, 1.10);
      planeBox(P, [3.62, s * 1.58, 1.07], unit([1, 0, -0.55]), [0, 1, 0], unit([0.55, 0, 1]), 0, 0.42, -0.08, 0.08, -0.03, 0.03);
    }
    /* the front: two rounded hump covers on the upper glacis, headlamps in
       guards, a ladder on the nose plate, tow hooks [F][M2] */
    var GU = unit([-0.55, 0, 0.44]), GN = unit([0.44, 0, 0.55]), G0 = [3.95, 0, 1.46];
    for (s = -1; s <= 1; s += 2) {
      var hc = [G0[0] + GU[0] * 0.30, s * 0.48, G0[2] + GU[2] * 0.30];
      cyl(P, [hc[0] + GU[0] * -0.22 + GN[0] * 0.02, hc[1], hc[2] + GU[2] * -0.22 + GN[2] * 0.02],
             [hc[0] + GU[0] * 0.30, hc[1], hc[2] + GU[2] * 0.30], 0.30, 0.30, 12);
      planeBox(D, G0, GU, [0, 1, 0], GN, 0.05, 0.62, s * 0.06, s * 0.10, 0, 0.05);
      /* headlamp: housing, glass, guard hoop */
      cyl(P, [3.88, s * 1.20, 1.52], [4.02, s * 1.20, 1.52], 0.10, 0.10, 10);
      cyl(G, [4.02, s * 1.20, 1.52], [4.03, s * 1.20, 1.52], 0.08, 0.08, 10);
      cyl(D, [4.08, s * 1.10, 1.44], [4.08, s * 1.30, 1.44], 0.015, 0.015, 5);
      cyl(D, [4.08, s * 1.10, 1.44], [4.08, s * 1.10, 1.62], 0.015, 0.015, 5);
      cyl(D, [4.08, s * 1.30, 1.44], [4.08, s * 1.30, 1.62], 0.015, 0.015, 5);
      /* tow hooks */
      box(D, 3.92, 4.04, s * 0.78, s * 0.92, 1.12, 1.22);
      /* rear plate: lamp clusters, tow eyes, stowage boxes, the jack [G][K] */
      box(D, -3.94, -3.90, s * 1.05, s * 1.32, 1.56, 1.72);
      box(G, -3.95, -3.94, s * 1.10, s * 1.18, 1.60, 1.68);
      box(D, -3.98, -3.90, s * 0.55, s * 0.70, 1.12, 1.24);
      box(P, -4.10, -3.90, s * 0.20, s * 0.95, 1.30, 1.50);
      box(P, -4.04, -3.90, s * 0.30, s * 0.85, 1.52, 1.84);
      box(D, -4.05, -4.04, s * 0.50, s * 0.62, 1.62, 1.74);
    }
    /* team plates: nose plate and rear plate */
    box(T, 3.95, 3.965, -0.40, 0.40, 1.30, 1.42);
    box(T, -4.111, -4.10, -0.16, 0.16, 1.34, 1.46);
    /* centre ladder on the nose plate */
    for (s = -1; s <= 1; s += 2) box(D, 3.96, 4.00, s * 0.16, s * 0.19, 0.70, 1.40);
    for (i = 0; i < 4; i++) box(D, 3.97, 4.01, -0.17, 0.17, 0.76 + i * 0.17, 0.79 + i * 0.17);
    /* driver's hatch front left with periscopes; engine louvres at the rear */
    cylZ(P, 3.05, 0.85, DZ - 0.02, DZ + 0.08, 0.30, 16);
    cylZ(P, 3.05, 0.85, DZ + 0.08, DZ + 0.11, 0.24, 16);
    for (i = 0; i < 3; i++) box(G, 3.34, 3.42, 0.62 + i * 0.17, 0.74 + i * 0.17, DZ - 0.04, DZ + 0.04);
    box(D, -3.80, -2.70, -1.10, 1.10, DZ - 0.01, DZ + 0.012);
    for (x = -3.76; x < -2.75; x += 0.15) box(P, x, x + 0.05, -1.08, 1.08, DZ - 0.01, DZ + 0.04);
    /* side stowage boxes along the upper hull, read off [N2] */
    var SB = [[-3.80, -2.66], [-2.62, -1.36], [-1.32, -0.62], [-0.58, 0.43], [0.47, 1.47], [1.51, 2.71], [2.75, 3.30]];
    for (s = -1; s <= 1; s += 2) {
      ys = s * 1.50;
      for (i = 0; i < SB.length; i++) {
        if (V.grille && (i === 3 || i === 4)) continue;
        box(P, SB[i][0], SB[i][1], ys, s * 1.56, 1.14, 1.80);
        box(D, (SB[i][0] + SB[i][1]) / 2 - 0.05, (SB[i][0] + SB[i][1]) / 2 + 0.05, s * 1.56, s * 1.575, 1.42, 1.52);
        box(D, SB[i][0] + 0.04, SB[i][1] - 0.04, s * 1.56, s * 1.57, 1.77, 1.79);
      }
      if (V.grille) {
        /* the 9A310's long mesh grille low on the side [K] */
        box(D, -0.58, 1.47, ys, s * 1.52, 1.12, 1.42);
        for (x = -0.54; x < 1.45; x += 0.10) box(P, x, x + 0.03, ys, s * 1.54, 1.12, 1.42);
        box(P, -0.58, 1.47, ys, s * 1.56, 1.42, 1.80);
      }

      addTrack(D, L, s * TY - TH, s * TY + TH);
      /* idler: steel disc with a hub */
      cylY(P, RG.XI, s * (TY - 0.14), s * (TY + 0.14), RG.ZI, RG.RI - 0.02, 16);
      cylY(D, RG.XI, s * (TY + 0.14), s * (TY + 0.18), RG.ZI, 0.12, 10);
      /* sprocket: hub and toothed rings */
      cylY(P, RG.XS, s * (TY - 0.18), s * (TY + 0.18), RG.ZS, RG.RS - 0.06, 18);
      cylY(P, RG.XS, s * (TY + 0.18), s * (TY + 0.23), RG.ZS, 0.13, 10);
      for (i = 0; i < 12; i++) {
        var a = i / 12 * TAU, cx = RG.XS + Math.cos(a) * (RG.RS - 0.02), cz = RG.ZS + Math.sin(a) * (RG.RS - 0.02);
        planeBox(D, [cx, 0, cz], [-Math.sin(a), 0, Math.cos(a)], [0, 1, 0], [Math.cos(a), 0, Math.sin(a)],
                 -0.035, 0.035, s * TY - 0.18, s * TY + 0.18, -0.04, 0.06);
      }
      /* road-wheel swing arms from the lower hull */
      for (i = 0; i < RG.XW.length; i++)
        planeBox(D, [RG.XW[i], 0, RG.ZW], unit([0.30, 0, 0.14]), [0, 1, 0], unit([-0.14, 0, 0.30]), 0, 0.32, s * 1.10, s * 1.20, -0.05, 0.05);
    }
  }

  /* one road wheel station about its axle: rubber tyre, dished steel disc, hub */
  function wheelStation(W, T) {
    var s, c;
    for (s = -1; s <= 1; s += 2) {
      c = s * TY;
      W.col = T.rubber;
      cyl(W, [0, c - s * 0.13, 0], [0, c + s * 0.12, 0], RG.RW, RG.RW, 16);
      W.col = T.steel;
      cyl(W, [0, c + s * 0.11, 0], [0, c + s * 0.15, 0], RG.RW - 0.05, RG.RW - 0.05, 18);
      cyl(W, [0, c + s * 0.15, 0], [0, c + s * 0.18, 0], 0.18, 0.16, 12);
      W.col = T.hubc;
      cyl(W, [0, c + s * 0.18, 0], [0, c + s * 0.22, 0], 0.085, 0.065, 8);
    }
  }

  /* ---------------------------------------------------------------- rounds */
  /* a round lying along +X from its tail point Tp: nozzle, body, white
     radome, wings and tail fins in the X (45 deg) set.  kind "38" = 9M38M1
     (cropped-delta wings aft of mid-body), "317" = 9M317 (long low strakes) */
  function missile(B, Tp, L, r, kind) {
    var P = B.body, D = B.dark, W = B.nose, F = B.wing, k, phi, rad, nn;
    var at = function (t) { return [Tp[0] + t, Tp[1], Tp[2]]; };
    cyl(D, at(-0.02), at(0.20), 0.14, r - 0.02, 10);
    cyl(P, at(0.20), at(L - 1.10), r, r, 12);
    cyl(W, at(L - 1.10), at(L - 0.55), r, 0.15, 12);
    cyl(W, at(L - 0.55), at(L - 0.12), 0.15, 0.06, 10);
    cyl(W, at(L - 0.12), at(L), 0.06, 0.012, 6);
    var WG = kind === "317" ? [0.95, 3.10, 1.45, 2.95, 0.11] : [0.95, 2.25, 1.70, 2.10, 0.22];
    for (k = 0; k < 4; k++) {
      phi = (k + 0.5) * Math.PI / 2;
      rad = [0, Math.cos(phi), Math.sin(phi)];
      nn = unit(cross([1, 0, 0], rad));
      /* wing: a trapezoid, root WG[0..1], tip WG[2..3], span WG[4] */
      fin(F, at(0), rad, nn, r - 0.01, WG[0], WG[1], WG[2], WG[3], WG[4]);
      fin(P, at(0), rad, nn, r - 0.01, 0.02, kind === "317" ? 0.62 : 0.52, 0.10, kind === "317" ? 0.36 : 0.30, kind === "317" ? 0.27 : 0.24);
    }
  }
  /* a thin trapezoidal fin on the body: root from a0 to a1 along x, tip from
     b0 to b1 at height hgt above the root, plane spanned by x and rad */
  function fin(bin, O, rad, nn, r0, a0, a1, b0, b1, hgt) {
    var th = 0.012;
    function p(x, h, o) { return [O[0] + x + nn[0] * o, O[1] + rad[1] * (r0 + h) + nn[1] * o, O[2] + rad[2] * (r0 + h) + nn[2] * o]; }
    hexa(bin, [p(a0, 0, -th), p(a1, 0, -th), p(b1, hgt, -th), p(b0, hgt, -th),
               p(a0, 0, th), p(a1, 0, th), p(b1, hgt, th), p(b0, hgt, th)]);
  }

  /* hatch panels on a leaning turret side: from (x0..x1) between heights */
  function sidePanels(P, D, PAN, wa, wb, za, zb, inset) {
    var s, i, sl = Math.atan2(wa - wb, zb - za), cs = Math.cos(sl), sn = Math.sin(sl), hh = (zb - za) / cs;
    for (s = -1; s <= 1; s += 2) {
      var U = [1, 0, 0], Wv = unit([0, -s * sn, cs]), N = unit([0, s * cs, sn]), P0 = [0, s * wa, za];
      for (i = 0; i < PAN.length; i++) {
        planeBox(P, P0, U, Wv, N, PAN[i][0], PAN[i][1], inset, hh - inset, 0, 0.035);
        planeBox(D, P0, U, Wv, N, PAN[i][0] + 0.04, PAN[i][0] + 0.10, inset, inset + 0.14, 0, 0.06);
        planeBox(D, P0, U, Wv, N, (PAN[i][0] + PAN[i][1]) / 2 - 0.05, (PAN[i][0] + PAN[i][1]) / 2 + 0.05, hh * 0.45, hh * 0.55, 0.035, 0.065);
      }
    }
  }
  /* a hoop handrail across the turret at x */
  function hoop(D, x, w, zb, zt) {
    var HP = [[-w, zb], [-w, zt - 0.25], [-w + 0.16, zt], [w - 0.16, zt], [w, zt - 0.25], [w, zb]], i;
    for (i = 0; i < HP.length - 1; i++) cyl(D, [x, HP[i][0], HP[i][1]], [x, HP[i + 1][0], HP[i + 1][1]], 0.022, 0.022, 6);
  }
  /* the servo (TV-optical) sight on its pedestal */
  function sight(P, D, G, x, y, z) {
    cylZ(P, x, y, z, z + 0.30, 0.10, 10);
    box(D, x - 0.22, x + 0.20, y - 0.20, y + 0.20, z + 0.30, z + 0.56);
    box(G, x + 0.20, x + 0.22, y - 0.14, y + 0.14, z + 0.36, z + 0.50);
    cylY(D, x, y - 0.26, y + 0.26, z + 0.43, 0.05, 8);
  }

  /* ----------------------------------------------------------- the turrets */
  /* everything in the turret frame (origin on the ring centre, at x = HX);
     the launcher's parts go into PB, built in the turret frame too and
     moved back by the pivot when the group is made */
  function addTurret(B, PB, which) {
    var P = B.paint, D = B.dark, G = B.glass, Tm = PB.T, s, i, k, x;
    var Dv = vcView(PB.vc, Tm.railc), Mb = { body: vcView(PB.vc, Tm.mbody), dark: Dv, nose: vcView(PB.vc, Tm.nose), wing: vcView(PB.vc, Tm.wing) };
    var PV, cells = [], EL;
    /* turret base ring */
    cylZ(P, 0, 0, DZ - 0.02, DZ + 0.08, 1.32, 24);

    if (which === "M1") {
      /* ---- 9A310M1 [K][F] ---- */
      /* lower tier: vertical sides, a row of box doors */
      prism(P, [[-4.20, 1.98], [0.95, 1.98], [0.95, 2.34], [-4.20, 2.34]], -1.28, 1.28);
      /* upper tier: leaning sides with hinged hatch panels */
      taper(P, [[-4.20, 2.32], [0.95, 2.32], [0.95, 2.85], [-4.05, 2.85], [-4.20, 2.72]], 1.28, 1.00, 2.32, 2.85);
      sidePanels(P, D, [[-4.05, -3.30], [-3.22, -2.40], [-2.32, -1.50], [-1.42, -0.60], [-0.52, 0.30], [0.38, 0.88]], 1.28, 1.00, 2.32, 2.85, 0.05);
      for (s = -1; s <= 1; s += 2) for (x = -4.10; x < 0.80; x += 0.86) {
        box(P, x, x + 0.80, s * 1.28, s * 1.31, 2.00, 2.30);
        box(D, x + 0.36, x + 0.44, s * 1.31, s * 1.325, 2.10, 2.18);
      }
      /* the Fire Dome: lofted from the side and front views, flat rear face,
         rounded top corners, a bull nose */
      var DX = [0.95, 1.30, 1.90, 2.50, 2.90, 3.20, 3.42, 3.58, 3.70, 3.78];
      var DT = [3.56, 3.58, 3.58, 3.54, 3.46, 3.34, 3.18, 3.00, 2.80, 2.58];
      var DB = [2.00, 2.00, 2.00, 2.00, 2.02, 2.05, 2.10, 2.17, 2.26, 2.38];
      var DW = [1.08, 1.10, 1.10, 1.09, 1.07, 1.03, 0.98, 0.91, 0.82, 0.70];
      var SS = [];
      for (i = 0; i < DX.length; i++) SS.push(rrSec(DW[i], DB[i], DT[i], Math.min(0.48, (DT[i] - DB[i]) * 0.45, DW[i] * 0.6), 0.08, 4));
      loft(P, DX, SS);
      /* seams and latches on the dome sides, the hinge brackets on its rear face */
      for (s = -1; s <= 1; s += 2) {
        box(D, 1.60, 1.66, s * 1.095, s * 1.11, 2.10, 3.10);
        box(D, 2.50, 2.56, s * 1.085, s * 1.10, 2.10, 3.05);
        box(D, 0.90, 0.95, s * 0.70, s * 0.85, 2.30, 3.30);
      }
      box(D, 0.90, 0.95, -0.40, 0.40, 2.40, 2.62);
      sight(P, D, G, 0.50, 0.62, 2.85);
      hoop(D, 0.72, 1.20, 2.85, 3.62);

      /* ---- the launcher: four 9M38M1 side by side on rails, noses toward
         the dome, hinged at the tail end [F][K] ---- */
      var L = 5.55, r = 0.20, ZA = 3.12, YY = [-0.96, -0.32, 0.32, 0.96], XN = 0.70, TX = XN - L;
      PV = [-4.20, 2.92]; EL = 1.22;
      for (k = 0; k < 4; k++) {
        missile(Mb, [TX, YY[k], ZA], L, r, "38");
        cyl(Dv, [TX + 0.3, YY[k], ZA - 0.25], [XN - 1.2, YY[k], ZA - 0.25], 0.04, 0.04, 6);
        for (i = 0; i < 3; i++) cyl(Dv, [TX + 1.2 + i * 1.3, YY[k], ZA], [TX + 1.26 + i * 1.3, YY[k], ZA], r + 0.025, r + 0.025, 10);
        cells.push([XN - PV[0], YY[k], ZA - PV[1], TX - PV[0]]);
      }
      /* launcher beam: side members, cross members, the rear frame and hoop */
      for (s = -1; s <= 1; s += 2) box(Dv, -4.55, -0.20, s * 1.12, s * 1.20, ZA - 0.34, ZA - 0.22);
      for (i = 0; i < 4; i++) { x = [-4.40, -3.10, -1.70, -0.40][i]; box(Dv, x - 0.05, x + 0.05, -1.20, 1.20, ZA - 0.34, ZA - 0.24); }
      box(Dv, -4.62, -3.95, -1.24, 1.24, ZA - 0.50, ZA - 0.30);
      hoop(Dv, -4.50, 1.24, ZA - 0.30, ZA + 0.55);
      cylY(Dv, PV[0], -1.15, 1.15, PV[1], 0.07, 8);
      /* fixed: hinge brackets on the turret rear, rest pads on the roof */
      for (s = -1; s <= 1; s += 2) {
        box(D, -4.30, -4.02, s * 0.95, s * 1.12, 2.80, PV[1] + 0.06);
        box(D, -0.45, -0.30, s * 0.95, s * 1.10, 2.84, ZA - 0.34);
      }
    } else if (which === "M2") {
      /* ---- 9A317 [N2][T2][P2][M2] ---- */
      prism(P, [[-3.30, 1.98], [2.55, 1.98], [2.55, 2.70], [-3.30, 2.70]], -1.30, 1.30);
      taper(P, [[-3.30, 2.68], [2.55, 2.68], [2.55, 3.32], [-3.18, 3.32], [-3.30, 3.20]], 1.30, 1.20, 2.68, 3.32);
      /* two rows of hatch panels [N2] */
      for (s = -1; s <= 1; s += 2) for (x = -3.22; x < 2.40; x += 0.94) {
        box(P, x, x + 0.88, s * 1.30, s * 1.335, 2.04, 2.64);
        box(D, x + 0.06, x + 0.12, s * 1.335, s * 1.35, 2.20, 2.40);
        box(D, x + 0.40, x + 0.48, s * 1.335, s * 1.35, 2.48, 2.56);
      }
      sidePanels(P, D, [[-3.15, -2.25], [-2.17, -1.27], [-1.19, -0.29], [-0.21, 0.69], [0.77, 1.67], [1.75, 2.45]], 1.30, 1.20, 2.68, 3.32, 0.05);
      /* the radar housing standing above the roof at the turret front:
         narrower than the turret, rounded top and nose [T2][N2] */
      var RX = [2.50, 2.75, 3.05, 3.28, 3.42, 3.52, 3.58];
      var RT = [3.80, 3.84, 3.84, 3.78, 3.66, 3.50, 3.30];
      var RB = [1.98, 1.98, 1.98, 2.00, 2.04, 2.10, 2.20];
      var RW = [0.86, 0.86, 0.86, 0.85, 0.82, 0.77, 0.68], SS2 = [];
      for (i = 0; i < RX.length; i++) SS2.push(rrSec(RW[i], RB[i], RT[i], 0.30, 0.06, 4));
      loft(P, RX, SS2);
      box(D, 2.45, 2.50, -0.60, 0.60, 3.40, 3.62);
      for (s = -1; s <= 1; s += 2) {
        box(D, 2.95, 3.01, s * 0.855, s * 0.87, 2.10, 3.60);
        box(P, 2.30, 2.55, s * 0.86, s * 1.20, 3.30, 3.42);
      }
      sight(P, D, G, 1.95, 0.64, 3.32);
      hoop(D, 2.25, 1.20, 3.32, 4.02);
      /* ---- the launcher: four 9M317 side by side ---- */
      var L2 = 5.55, r2 = 0.20, ZA2 = 3.66, YY2 = [-0.96, -0.32, 0.32, 0.96], XN2 = 2.38, TX2 = XN2 - L2;
      PV = [-3.40, 3.42]; EL = 1.22;
      for (k = 0; k < 4; k++) {
        missile(Mb, [TX2, YY2[k], ZA2], L2, r2, "317");
        cyl(Dv, [TX2 - 0.9, YY2[k], ZA2 - 0.25], [XN2 - 1.0, YY2[k], ZA2 - 0.25], 0.04, 0.04, 6);
        for (i = 0; i < 3; i++) cyl(Dv, [TX2 + 1.1 + i * 1.3, YY2[k], ZA2], [TX2 + 1.16 + i * 1.3, YY2[k], ZA2], r2 + 0.025, r2 + 0.025, 10);
        cells.push([XN2 - PV[0], YY2[k], ZA2 - PV[1], TX2 - PV[0]]);
      }
      /* the launcher frame runs on past the tails to its hinge and the rear
         hoop, overhanging the turret end [N2] */
      for (s = -1; s <= 1; s += 2) box(Dv, -4.35, 1.60, s * 1.12, s * 1.20, ZA2 - 0.34, ZA2 - 0.22);
      for (i = 0; i < 5; i++) { x = [-4.25, -3.10, -1.60, -0.10, 1.40][i]; box(Dv, x - 0.05, x + 0.05, -1.20, 1.20, ZA2 - 0.34, ZA2 - 0.24); }
      box(Dv, -4.40, -3.70, -1.24, 1.24, ZA2 - 0.50, ZA2 - 0.30);
      hoop(Dv, -4.05, 1.24, ZA2 - 0.30, ZA2 + 0.50);
      cylY(Dv, PV[0], -1.15, 1.15, PV[1], 0.07, 8);
      for (s = -1; s <= 1; s += 2) {
        box(D, -3.50, -3.22, s * 0.95, s * 1.12, 3.20, PV[1] + 0.06);
        box(D, 0.80, 0.95, s * 0.95, s * 1.10, 3.30, ZA2 - 0.34);
      }
    } else {
      /* ---- 9A317M [A3][R3][P3] ---- */
      prism(P, [[-1.00, 1.98], [1.42, 1.98], [1.42, 2.42], [-1.00, 2.42]], -1.30, 1.30);
      taper(P, [[-1.00, 2.40], [1.42, 2.40], [1.42, 2.72], [-0.90, 2.72], [-1.00, 2.64]], 1.30, 1.12, 2.40, 2.72);
      /* the sloped plate rising to the radar's top rear */
      taper(P, [[0.95, 2.70], [1.42, 2.70], [1.42, 3.20]], 1.00, 1.00, 2.70, 3.20);
      for (s = -1; s <= 1; s += 2) for (x = -0.95; x < 1.30; x += 0.60) {
        box(P, x, x + 0.54, s * 1.30, s * 1.335, 2.04, 2.38);
        box(D, x + 0.22, x + 0.30, s * 1.335, s * 1.35, 2.16, 2.24);
      }
      sidePanels(P, D, [[-0.92, -0.38], [-0.32, 0.22], [0.28, 0.82], [0.88, 1.38]], 1.30, 1.12, 2.40, 2.72, 0.03);
      /* the large rounded-octagon radar housing [A3][R3] */
      var OX = [1.40, 1.62, 1.85, 3.40, 3.62, 3.80, 3.88];
      var OT = [3.12, 3.40, 3.55, 3.55, 3.36, 3.12, 2.95];
      var OB = [2.40, 2.12, 1.98, 1.98, 2.10, 2.30, 2.45];
      var OW = [1.08, 1.13, 1.15, 1.15, 1.12, 1.04, 0.96], SS3 = [];
      for (i = 0; i < OX.length; i++) SS3.push(rrSec(OW[i], OB[i], OT[i], 0.30, 0.22, 3));
      loft(P, OX, SS3);
      for (s = -1; s <= 1; s += 2) {
        box(D, 2.05, 2.11, s * 1.145, s * 1.16, 2.10, 3.45);
        box(D, 3.10, 3.16, s * 1.145, s * 1.16, 2.10, 3.45);
      }
      /* the second box on the radar roof, the optical sight at its rear */
      var BX = [2.05, 2.15, 2.95, 3.08], BT = [3.80, 3.88, 3.88, 3.78], SS4 = [];
      for (i = 0; i < BX.length; i++) SS4.push(rrSec(0.55, 3.54, BT[i], 0.10, 0.02, 2));
      loft(P, BX, SS4);
      sight(P, D, G, 1.90, 0.45, 3.52);
      box(D, 3.86, 3.89, -0.50, 0.50, 2.70, 2.80);

      /* ---- the launcher: six containers, 3 across x 2 high, red caps at the
         end AWAY from the radar [P3]; hinged at the butt end and swung up
         past the vertical to fire (el negative: the -X end rises) ---- */
      var CL = 4.80, cr = 0.25, BUT = 1.10, CAP = BUT - CL, ZR = [3.12, 3.64], YC = [-0.54, 0, 0.54];
      var Cv = vcView(PB.vc, Tm.green), Rv = vcView(PB.vc, Tm.cap);
      PV = [BUT, ZR[1]]; EL = -1.745;
      for (i = 0; i < 3; i++) for (k = 0; k < 2; k++) {
        var yc = YC[i], zc = ZR[k];
        cyl(Cv, [CAP, yc, zc], [BUT, yc, zc], cr, cr, 14);
        for (var j = 0; j < 4; j++) {
          x = CAP + 0.35 + j * 1.25;
          cyl(Cv, [x, yc, zc], [x + 0.08, yc, zc], cr + 0.015, cr + 0.015, 14);
        }
        cyl(Rv, [CAP - 0.03, yc, zc], [CAP, yc, zc], cr - 0.02, cr - 0.02, 14);
        cyl(Dv, [BUT, yc, zc], [BUT + 0.04, yc, zc], cr - 0.03, cr - 0.03, 10);
        cells.push([CAP - PV[0], yc, zc - PV[1], BUT - PV[0]]);
      }
      /* the cradle: frames round the bundle, a rail beam under it, the rest
         frame under the cap end [P3], and the lift cylinder */
      for (i = 0; i < 3; i++) {
        x = [0.85, -1.40, CAP + 0.25][i];
        box(Dv, x - 0.07, x + 0.07, -0.88, 0.88, ZR[0] - 0.30, ZR[0] - 0.24);
        box(Dv, x - 0.07, x + 0.07, -0.88, 0.88, ZR[1] + 0.24, ZR[1] + 0.30);
        for (s = -1; s <= 1; s += 2) box(Dv, x - 0.07, x + 0.07, s * 0.80, s * 0.88, ZR[0] - 0.30, ZR[1] + 0.30);
      }
      for (s = -1; s <= 1; s += 2) box(Dv, CAP + 0.10, BUT, s * 0.50, s * 0.62, ZR[0] - 0.36, ZR[0] - 0.26);
      cyl(Dv, [0.40, 0, ZR[0] - 0.36], [-1.20, 0, ZR[0] - 0.36], 0.08, 0.08, 8);
      cylY(Dv, PV[0], -0.95, 0.95, PV[1], 0.07, 8);
      /* fixed: hinge brackets behind the radar, the lift cylinder's base */
      for (s = -1; s <= 1; s += 2) box(D, BUT - 0.15, BUT + 0.15, s * 0.95, s * 1.08, 2.70, PV[1] + 0.06);
      cylZ(D, -0.20, 0, 2.70, 2.82, 0.14, 10);
    }
    return { pv: PV, cells: cells, el: EL };
  }

  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.M1, Tm = materials(THREE, C, V), g = new THREE.Group(), i, wg, W;
    RG = V.rg;
    var HB = { paint: new Bin(Tm.paint, true), dark: new Bin(Tm.dark), glass: new Bin(Tm.glass), team: new Bin(Tm.team) };
    addHull(HB, V);
    flush(THREE, g, HB);
    for (i = 0; i < RG.XW.length; i++) {
      W = new Bin(Tm.wheel, false, true);
      wheelStation(W, Tm);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(RG.XW[i], 0, RG.ZW);
      flush(THREE, wg, { w: W });
      g.add(wg);
    }
    var TB = { paint: new Bin(Tm.paint, true), dark: new Bin(Tm.dark), glass: new Bin(Tm.glass) };
    var PB = { vc: new Bin(Tm.wheel, false, true), T: Tm };
    var pod = addTurret(TB, PB, which), E = new THREE.Group();
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(HX, 0, 0);
    flush(THREE, wg, TB);
    /* the pod: its meshes are offset back by the pivot so the group turns about it */
    E.name = "podelev";
    E.position.set(pod.pv[0], 0, pod.pv[1]);
    flush(THREE, E, { vc: PB.vc });
    for (i = 0; i < E.children.length; i++) E.children[i].position.set(-pod.pv[0], 0, -pod.pv[1]);
    E.userData.el = pod.el;
    E.userData.cells = pod.cells;
    wg.add(E);
    g.add(wg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e80_buk"]    = { len: 8.72, build: function (THREE, M, C) { return HeroBuk.build(THREE, M, C, "M1"); } };
UNIT_MODELS["pact_e00_buk"]    = { len: 8.25, build: function (THREE, M, C) { return HeroBuk.build(THREE, M, C, "M2"); } };
UNIT_MODELS["pact_e00_buk_m3"] = { len: 8.25, build: function (THREE, M, C) { return HeroBuk.build(THREE, M, C, "M3"); } };
