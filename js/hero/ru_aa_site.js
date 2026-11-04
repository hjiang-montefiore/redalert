/* ===== ru_aa_site.js - HERO model: the Soviet / Russian fixed AA gun battery ==
   BUILDINGS.flak, side "pact" (USSR / Russia).  The shared "flak" model is a
   radar-directed twin 40 mm; that is not a Soviet gun.  This file registers
   one build under BLD_MODELS["flak_pact_<era>"] with an option per system
   (full-quality redo, 2026-11-03; keys and era map kept):

     e50  KS-19 100 mm heavy AA gun battery + SON-9 gun-laying radar
     e60  S-60 57 mm AA gun battery + SON-9 gun-laying radar
     e80  ZU-23-2 23 mm twin AA guns
     e90  ZU-23-2
     e00  ZU-23-2
     e20  ZU-23-2

   PERIODS (dates from the English Wikipedia articles "KS-19", "AZP S-60",
   "ZU-23-2" and "SON-9", re-read 2026-11-03; one system per period):
     e50  KS-19: in service from 1948 (KS-19M 1951, KS-19M2 1955); its article
          names the PUAZO-6/19 director with the SON-9 / SON-9A radar as its
          fire control.  The S-60 (1950) is also a 1950s gun; the 100 mm is
          drawn because it is the decade's fixed heavy battery.
     e60  S-60 + SON-9: the S-60 article ties the SON-9 to the 57 mm
          batteries; the SON-9 article says it was van-mounted and directed
          the fire of 4-8 guns (57, 85, 100 and 130 mm), and was met in the
          Vietnam War.  PVO regiments kept 57 mm batteries in the 1960s.
     e80, e90, e00, e20  ZU-23-2: in service 1960 to the present; Soviet
          forces ringed occupied positions in Afghanistan with ZU-23-2 sets.
          The S-60 "had almost disappeared" from Soviet units by the end of
          the 1970s, so no S-60 key for e80.

   REFERENCES (Wikimedia Commons, fetched 2026-11-03 at width 960, cached in
   scratchpad/q_ruaa_ref):
     [K1] "100 mm Anti-aircraft Gun KS-19 Right View 2017-12-24" and [K2]
          "... Front View ..." (St Petersburg artillery museum).
     [S1] "Drawing of the S-60 57 mm gun" (side section of the gun and its
          cradle: breech casing, stepped jacket, slim barrel, perforated
          muzzle brake, trunnion circle).  [S2] "57 mm Anti-aircraft Gun
          S-60 2017-12-24" (the gun on its carriage, left front quarter).
     [Z1] "ZU-23-2-recognition" (US recognition sheet, travelling order).
     [Z2] "ZU-23 anti-aircraft gun ready for fire" (firing order, wheels
          tipped up, jacks down).  [Z3] "UA 117th TDF Brigade ZU-23-2" (in a
          field, 2022: wheel swung out and lying tilted, jack pads, boxes,
          seats).  [Z4] "Zu-23-2 IRAN-IRAQ WAR" (a gun in a sandbag ring with
          ammunition boxes in a row along the bags).
     [R1] "SON-9 in Technical museum Togliatti" (rear view: box body on a
          four-wheel trailer, dish on the roof).  [R2] "Radar-batey-haosef-
          1-1" and [R3] "Hn-radar-trailer-1" (SON-9 trailers in Israel: side
          and three-quarter, wheel arches cut in the body, chamfered roof
          edges, two side doors, a window, a roof rack, the perforated dish).
     [B1] "Ryan Firebee drone recon photo of AA battery in Vietnam": guns
          each in a round earth revetment, the revetments in a ring.

   RECOGNITION LIST (each drawn; where it rests):
     KS-19:  1 four-wheel carriage, big single tyres, the long box frame on
             four jacks (cruciform: two legs swung out) [K1,K2];  2 the
             saddle between two tall cheek boxes, chamfered at the front top,
             a lower housing stepped down behind them [K1,K2]; 3 handwheels,
             gear housings and sight heads outside the boxes [K2];
             4 the long barrel, thick recoil sleeve, two recuperator tubes
             above it [K2], 5 the long finned multi-baffle muzzle brake [K1];
             6 the loading tray and rammer behind the breech [K1].
     S-60:   1 two-axle carriage, jacks at the ends and two side legs [S2];
             2 the two upright side shield plates with their cut-outs [S2];
             3 the stepped jacket and the slim barrel [S1]; 4 the perforated
             drum brake [S1,S2]; 5 the long breech casing and clip feed [S1];
             6 handwheels and the layer's seat on the left [S2].
     ZU-23-2: 1 two barrels side by side with big flash hiders [Z2,Z3];
             2 the round side plates of the cradle with the ammunition boxes
             outboard [Z1,Z3]; 3 the low three-jack base, the wheels swung
             out and lying tilted [Z2,Z3]; 4 two seats behind [Z2,Z3];
             5 the sight above on the left [Z2,Z4]; 6 the barrel clamp [Z4].
     SON-9:  1 box body with chamfered roof edges on a four-wheel trailer,
             arches cut for the wheels [R2,R3]; 2 the perforated dish on its
             pedestal on the roof, feed on struts [R1,R2]; 3 side doors and
             a window [R3]; 4 drawbar, corner jacks [R2], roof rack [R3].

   SIZES.  Published (Wikipedia infoboxes): KS-19 length 9.45 m travelling,
   width 2.35 m, height 2.201 m, barrel 5.742 m; S-60 length 8.5 m, width
   2.054 m, height 2.37 m, barrel 4.4 m; ZU-23-2 (firing order) length
   4.57 m, width 2.88 m, height 1.22 m, barrels 2.008 m.  The guns are drawn
   to those.  ESTIMATED from the photographs against those figures (not
   published in what I read): wheel sizes, wheelbases, jack positions,
   plate outlines, trunnion heights (KS-19 1.85 m, S-60 1.80 m, ZU 0.88 m).
   No mudguards: none shows on the photographed guns.
   SON-9: no dimensions found; the body (5.2 x 2.4 m, roof 2.85 m), the
   1.07 m tyres and the 1.9 m dish are scaled off [R1-R3] against the tyres.

   THE POSITION.  [B1] shows each gun in a round earth revetment, the
   revetments in a ring; the KS-19 and S-60 keys draw that (closed rings:
   the photograph does not resolve an opening; no ammunition bays, crew
   trenches, cables or plotting post - none is visible there).  [Z4] shows
   a ZU-23-2 inside a ring of sandbags with ammunition boxes along the bags;
   the ZU keys draw that (Z4 is an Iranian position; no photograph of a
   Soviet / Russian one was found).  COMPRESSION: a real heavy battery has
   4-8 guns on a ring 60-100 m across with the SON-9, the director and the
   power set apart; the plot shows three KS-19 or four S-60 guns and the
   SON-9 at true size, 10-15 m apart; no director (PUAZO), no power set, no
   cables.  Every gun of a director-laid battery points the same way, so
   all mounts are trained to +X at the same elevation (KS-19 35 deg, S-60
   38 deg, ZU-23-2 30 deg); the carriages lie at different angles.

   The upper mount (everything that traverses) of the gun nearest the
   centre is the group "turret"; its carriage and every other gun are
   baked.  Team colour (exactly C.team): one small plate 2 cm proud of the
   turret gun's left cheek plate (KS-19, S-60) or ammunition-box lid (ZU),
   and one on the SON-9 door.  Paint: Soviet olive green, one tone, as the
   photographs show, on a canvas texture (mottle, seams, bolt rows, dust).
   Model space: Z up, metres, ground z = 0, +X is the direction the trained
   gun points at rest.  ASCII only.  */

if (typeof BLD_MODELS === "undefined") { var BLD_MODELS = {}; }

var HeroRuAaSite = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  /* ------------------------------------------------------------ the kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* affine 3x4 matrices, row major */
  var I3 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0];
  function mmul(A, B) {
    var R = [], i, j;
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) R[i * 4 + j] = A[i * 4] * B[j] + A[i * 4 + 1] * B[4 + j] + A[i * 4 + 2] * B[8 + j];
      R[i * 4 + 3] = A[i * 4] * B[3] + A[i * 4 + 1] * B[7] + A[i * 4 + 2] * B[11] + A[i * 4 + 3];
    }
    return R;
  }
  function T3(x, y, z) { return [1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z]; }
  function RZ(a) { var c = Math.cos(a), s = Math.sin(a); return [c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0]; }
  function RY(a) { var c = Math.cos(a), s = Math.sin(a); return [c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0]; }
  function RX(a) { var c = Math.cos(a), s = Math.sin(a); return [1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0]; }
  /* raise +X towards +Z by el about a trunnion at (x, z) */
  function ELEV(x, z, el) { return mmul(T3(x, 0, z), RY(-el)); }

  function Bin(mat, uvs) { this.mat = mat; this.P = []; this.N = []; this.U = uvs ? [] : null; this.us = uvs || 0; }
  function Kit(B) { this.B = B; this.M = I3; this.S = []; }
  Kit.prototype.push = function (m) { this.S.push(this.M); this.M = mmul(this.M, m); };
  Kit.prototype.pop = function () { this.M = this.S.pop(); };
  Kit.prototype.xf = function (p) {
    var M = this.M;
    return [M[0] * p[0] + M[1] * p[1] + M[2] * p[2] + M[3], M[4] * p[0] + M[5] * p[1] + M[6] * p[2] + M[7],
            M[8] * p[0] + M[9] * p[1] + M[10] * p[2] + M[11]];
  };
  Kit.prototype.xn = function (n) {
    var M = this.M;
    return [M[0] * n[0] + M[1] * n[1] + M[2] * n[2], M[4] * n[0] + M[5] * n[1] + M[6] * n[2], M[8] * n[0] + M[9] * n[1] + M[10] * n[2]];
  };
  /* one triangle into bin k, in the current frame; planar UVs (world metres
     x bin scale) from the face's dominant axis.  Zero-area ones are dropped. */
  Kit.prototype.tri = function (k, a, b, c, na, nb, nc) {
    var bin = this.B[k];
    a = this.xf(a); b = this.xf(b); c = this.xf(c);
    var cr = cross(sub(b, a), sub(c, a));
    if (dot(cr, cr) < 1e-14) return;
    var f = unit(cr), v = [a, b, c], n = [na ? this.xn(na) : f, nb ? this.xn(nb) : f, nc ? this.xn(nc) : f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]), s = bin.us;
    for (i = 0; i < 3; i++) {
      q = v[i];
      bin.P.push(q[0], q[1], q[2]);
      bin.N.push(n[i][0], n[i][1], n[i][2]);
      if (bin.U) {
        if (az >= ax && az >= ay) bin.U.push(q[0] * s, q[1] * s);
        else if (ay >= ax) bin.U.push(q[0] * s, q[2] * s);
        else bin.U.push(q[1] * s, q[2] * s);
      }
    }
  };
  Kit.prototype.quad = function (k, a, b, c, d, want) {
    var f = cross(sub(c, a), sub(d, b));
    if (dot(f, want) >= 0) { this.tri(k, a, b, c); this.tri(k, a, c, d); }
    else { this.tri(k, a, c, b); this.tri(k, a, d, c); }
  };
  Kit.prototype.solid = function (k, V, F, Nv) {
    var vol = 0, i, f;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      var a = f[0], b = vol < 0 ? f[2] : f[1], c = vol < 0 ? f[1] : f[2];
      this.tri(k, V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  };
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  Kit.prototype.hexa = function (k, P) { this.solid(k, P, HEXF); };
  Kit.prototype.box = function (k, x0, x1, y0, y1, z0, z1) {
    this.hexa(k, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
                  [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  };
  /* box with a top face inset by `t` on every side (a bag, a crate lid) */
  Kit.prototype.cbox = function (k, x0, x1, y0, y1, z0, z1, t) {
    this.hexa(k, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
                  [x0 + t, y0 + t, z1], [x1 - t, y0 + t, z1], [x1 - t, y1 - t, z1], [x0 + t, y1 - t, z1]]);
  };
  /* a cone frustum A->B */
  Kit.prototype.cyl = function (k, A, B, r0, r1, seg, nocap) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), V = [], N = [], F = [], i, j, c, s, rn, base, na;
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
      for (i = 0; i < seg; i++) { V.push(V[2 * i]); N.push(na); }
      for (i = 0; i < seg; i++) { V.push(V[2 * i + 1]); N.push(ax); }
      for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, base + 2 + j, base + 2 + i], [base + 1, base + 2 + seg + i, base + 2 + seg + j]); }
    }
    this.solid(k, V, F, N);
  };
  /* a turned part: profile [[t, r], ...] along A->B (t in metres from A),
     smooth normals along the run; closed at each end by a disc */
  Kit.prototype.lathe = function (k, A, B, prof, seg) {
    var ax = unit(sub(B, A)), tt = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, tt)), v = cross(ax, u), n = prof.length, i, j, q, c, s, rn, P = [], R = [];
    for (q = 0; q < n; q++) {
      P.push([]);
      for (i = 0; i < seg; i++) {
        c = Math.cos(i / seg * TAU); s = Math.sin(i / seg * TAU);
        rn = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
        if (!q) R.push(rn);
        P[q].push([A[0] + ax[0] * prof[q][0] + rn[0] * prof[q][1], A[1] + ax[1] * prof[q][0] + rn[1] * prof[q][1],
                   A[2] + ax[2] * prof[q][0] + rn[2] * prof[q][1]]);
      }
    }
    for (q = 0; q < n - 1; q++) {
      var dt = prof[q + 1][0] - prof[q][0], dr = prof[q + 1][1] - prof[q][1];
      for (i = 0; i < seg; i++) {
        j = (i + 1) % seg;
        var ni, nj, a = P[q][i], bq = P[q][j], c2 = P[q + 1][j], d2 = P[q + 1][i];
        if (Math.abs(dt) < 1e-6) { ni = nj = dr > 0 ? [-ax[0], -ax[1], -ax[2]] : ax; }
        else {
          /* smooth round the part, faceted from one profile step to the next */
          ni = unit([R[i][0] * dt - ax[0] * dr, R[i][1] * dt - ax[1] * dr, R[i][2] * dt - ax[2] * dr]);
          nj = unit([R[j][0] * dt - ax[0] * dr, R[j][1] * dt - ax[1] * dr, R[j][2] * dt - ax[2] * dr]);
        }
        var fq = cross(sub(c2, a), sub(d2, bq)), wq = [ni[0] + nj[0], ni[1] + nj[1], ni[2] + nj[2]];
        if (dot(fq, wq) >= 0) { this.tri(k, a, bq, c2, ni, nj, nj); this.tri(k, a, c2, d2, ni, nj, ni); }
        else { this.tri(k, a, c2, bq, ni, nj, nj); this.tri(k, a, d2, c2, ni, ni, nj); }
      }
    }
    var e, ce, ends = [[0, [-ax[0], -ax[1], -ax[2]]], [n - 1, ax]];
    for (e = 0; e < 2; e++) {
      q = ends[e][0];
      if (prof[q][1] < 1e-4) continue;
      ce = [A[0] + ax[0] * prof[q][0], A[1] + ax[1] * prof[q][0], A[2] + ax[2] * prof[q][0]];
      for (i = 0; i < seg; i++) {
        j = (i + 1) % seg;
        var f = cross(sub(P[q][i], ce), sub(P[q][j], ce));
        if (dot(f, ends[e][1]) >= 0) this.tri(k, ce, P[q][i], P[q][j]); else this.tri(k, ce, P[q][j], P[q][i]);
      }
    }
  };
  /* a plate: polygon pts [[x, z], ...] in the XZ plane, from y0 to y1 */
  Kit.prototype.prism = function (k, pts, y0, y1) {
    var n = pts.length, V = [], F = [], i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]]);
    for (i = 0; i < n; i++) V.push([pts[i][0], y1, pts[i][1]]);
    for (i = 1; i < n - 1; i++) { F.push([0, i, i + 1]); F.push([n, n + i + 1, n + i]); }
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([i, n + j, j], [i, n + i, n + j]); }
    this.solid(k, V, F);
  };
  /* the same in the XY plane (a plan outline), from z0 to z1 */
  Kit.prototype.plan = function (k, pts, z0, z1) {
    var n = pts.length, V = [], F = [], i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], pts[i][1], z0]);
    for (i = 0; i < n; i++) V.push([pts[i][0], pts[i][1], z1]);
    for (i = 1; i < n - 1; i++) { F.push([0, i, i + 1]); F.push([n, n + i + 1, n + i]); }
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([i, n + j, j], [i, n + i, n + j]); }
    this.solid(k, V, F);
  };
  Kit.prototype.rod = function (k, a, b, r, seg, nocap) { this.cyl(k, a, b, r, r, seg || 6, nocap); };

  /* -------------------------------------------------------- shared parts */
  /* a road wheel, axis along Y at (x, y, z): tyre lathe (dark), steel disc
     with a raised hub, in the paint (painted wheels, as photographed) */
  function wheel(K, x, y, z, r, w, side) {
    var o = side < 0 ? -1 : 1, h = w / 2;
    K.lathe("dark", [x, y - h, z], [x, y + h, z],
            [[0, r * 0.66], [0, r * 0.88], [w * 0.15, r * 0.98], [w * 0.85, r * 0.98], [w, r * 0.88], [w, r * 0.66]], 16);
    K.cyl("paint", [x, y - o * h * 0.7, z], [x, y + o * h * 0.55, z], r * 0.66, r * 0.66, 14);
    K.cyl("paint", [x, y + o * h * 0.5, z], [x, y + o * (h + 0.05), z], r * 0.30, r * 0.24, 10);
    K.cyl("dark", [x, y + o * (h + 0.04), z], [x, y + o * (h + 0.07), z], r * 0.12, r * 0.12, 8);
  }
  /* a screw jack: housing, screw, round foot pad */
  function jack(K, x, y, z1, rp) {
    K.cyl("dark", [x, y, 0], [x, y, 0.06], rp, rp * 0.85, 10);
    K.cyl("steel", [x, y, 0.06], [x, y, z1 - 0.2], 0.04, 0.04, 6, true);
    K.cyl("paint", [x, y, z1 - 0.3], [x, y, z1 + 0.08], 0.085, 0.085, 8);
    K.cyl("dark", [x, y, z1 + 0.08], [x, y, z1 + 0.12], 0.10, 0.10, 8);
  }
  /* a handwheel, axis along d (unit) at P, rim radius r */
  function handwheel(K, P, d, r) {
    var u = Math.abs(d[2]) < 0.9 ? unit(cross(d, [0, 0, 1])) : [1, 0, 0], v = cross(d, u), i, a0, a1;
    for (i = 0; i < 8; i++) {
      a0 = i / 8 * TAU; a1 = (i + 1) / 8 * TAU;
      K.rod("dark", [P[0] + (u[0] * Math.cos(a0) + v[0] * Math.sin(a0)) * r, P[1] + (u[1] * Math.cos(a0) + v[1] * Math.sin(a0)) * r, P[2] + (u[2] * Math.cos(a0) + v[2] * Math.sin(a0)) * r],
                    [P[0] + (u[0] * Math.cos(a1) + v[0] * Math.sin(a1)) * r, P[1] + (u[1] * Math.cos(a1) + v[1] * Math.sin(a1)) * r, P[2] + (u[2] * Math.cos(a1) + v[2] * Math.sin(a1)) * r], 0.016, 3);
    }
    for (i = 0; i < 3; i++) {
      a0 = i / 3 * TAU;
      K.rod("dark", P, [P[0] + (u[0] * Math.cos(a0) + v[0] * Math.sin(a0)) * r, P[1] + (u[1] * Math.cos(a0) + v[1] * Math.sin(a0)) * r, P[2] + (u[2] * Math.cos(a0) + v[2] * Math.sin(a0)) * r], 0.011, 3);
    }
    K.cyl("dark", [P[0] - d[0] * 0.12, P[1] - d[1] * 0.12, P[2] - d[2] * 0.12], P, 0.025, 0.025, 6);
  }
  /* a layer's seat: pan, back, post */
  function seat(K, x, y, z, yaw) {
    K.push(mmul(T3(x, y, z), RZ(yaw || 0)));
    K.cbox("dark", -0.16, 0.16, -0.17, 0.17, 0, 0.06, 0.02);
    K.box("dark", -0.20, -0.16, -0.15, 0.15, 0.04, 0.36);
    K.rod("steel", [0, 0, 0], [0.05, 0, -0.32], 0.025, 6);
    K.pop();
  }
  /* ============================================================= KS-19 */
  /* 100 mm KS-19 [K1,K2]: width 2.35, travelling height 2.201, barrel 5.742.
     Carriage frame on four jacks, two legs swung out sideways (cruciform). */
  var KS = { wr: 0.535, ww: 0.27, wy: 1.04, wx: 1.95, frameZ: [0.62, 0.95], jx: 3.15, jy: 2.30,
             tz: 1.85, el: 35 * Math.PI / 180, br: 1.25, bl: 5.742 };
  function ksCarriage(K) {
    var s, i;
    for (s = -1; s <= 1; s += 2) for (i = -1; i <= 1; i += 2) {
      wheel(K, i * KS.wx, s * KS.wy, KS.wr, KS.wr, KS.ww, s);
    }
    for (i = -1; i <= 1; i += 2) K.cyl("steel", [i * KS.wx, -KS.wy + 0.1, KS.wr], [i * KS.wx, KS.wy - 0.1, KS.wr], 0.07, 0.07, 8);
    /* the long box frame, tapering to the jack ends */
    K.prism("paint", [[-KS.jx - 0.1, 0.72], [-2.4, 0.60], [2.4, 0.60], [KS.jx + 0.1, 0.72], [KS.jx + 0.1, 0.92], [2.2, KS.frameZ[1]],
                      [-2.2, KS.frameZ[1]], [-KS.jx - 0.1, 0.92]], -0.27, 0.27);
    K.box("paint", -1.0, 1.0, -0.9, 0.9, 0.66, 0.92);                  /* centre bed */
    for (i = -1; i <= 1; i += 2) {
      K.box("paint", i * KS.wx - 0.18, i * KS.wx + 0.18, -KS.wy + 0.12, KS.wy - 0.12, 0.62, 0.80);   /* axle beam */
      jack(K, i * KS.jx, 0, 0.82, 0.24);
      /* the side legs, swung out, a box section tapering to the pad */
      K.hexa("paint", [[-0.30, i * 0.9, 0.62], [0.30, i * 0.9, 0.62], [0.12, i * KS.jy, 0.62], [-0.12, i * KS.jy, 0.62],
                       [-0.30, i * 0.9, 0.90], [0.30, i * 0.9, 0.90], [0.12, i * KS.jy, 0.78], [-0.12, i * KS.jy, 0.78]]);
      jack(K, 0, i * (KS.jy - 0.05), 0.72, 0.24);
      /* hinge knuckles */
      K.cyl("steel", [-0.32, i * 0.92, 0.76], [0.32, i * 0.92, 0.76], 0.08, 0.08, 8);
    }
    K.cyl("paint", [0, 0, 0.92], [0, 0, 1.02], 0.82, 0.82, 24);           /* the pedestal */
    K.cyl("steel", [0, 0, 1.02], [0, 0, 1.07], 0.84, 0.84, 24);           /* ring gear */
    K.box("dark", -KS.jx - 0.45, -KS.jx - 0.1, -0.12, 0.12, 0.70, 0.86);   /* towing eye block */
  }
  function ksBarrel(K, team) {
    var b = -KS.br, i, prof = [[0, 0.24], [0.42, 0.24], [0.42, 0.165], [1.5, 0.16], [2.3, 0.142], [3.3, 0.125], [4.2, 0.112], [4.86, 0.105]];
    /* breech ring and tube along +X from x = -1.25 to the brake */
    K.lathe("steel", [b, 0, 0], [b + 1, 0, 0], prof, 16);
    /* the long multi-baffle brake: seven fins on a core [K1] */
    var bp = [[4.86, 0.115]], x = 4.86, f;
    for (f = 0; f < 7; f++) { bp.push([x + 0.02, 0.15], [x + 0.085, 0.15], [x + 0.105, 0.115]); x += 0.125; }
    bp.push([KS.bl, 0.13], [KS.bl, 0.06]);
    K.lathe("dark", [b, 0, 0], [b + 1, 0, 0], bp, 12);
    /* recoil sleeve (cradle) and the two recuperator tubes above it [K2] */
    K.lathe("paint", [-0.75, 0, 0], [0.25, 0, 0], [[0, 0.20], [2.15, 0.20], [2.3, 0.17], [2.3, 0.0]], 18);
    for (i = -1; i <= 1; i += 2) {
      K.cyl("paint", [-1.0, i * 0.15, 0.27], [1.35, i * 0.15, 0.27], 0.085, 0.085, 10);
      K.cyl("dark", [1.35, i * 0.15, 0.27], [1.42, i * 0.15, 0.27], 0.06, 0.06, 8);
      K.box("paint", -0.2, 0.2, i * 0.04, i * 0.24, 0.10, 0.22);          /* clamp */
    }
    /* breech, loading tray and rammer [K1] */
    K.box("steel", -1.70, -1.20, -0.26, 0.26, -0.24, 0.24);
    K.box("paint", -2.65, -1.70, -0.24, 0.24, -0.30, -0.06);
    K.box("dark", -2.62, -1.72, -0.16, 0.16, -0.06, 0.02);
    K.cyl("paint", [-2.6, -0.30, -0.18], [-1.4, -0.30, -0.18], 0.07, 0.07, 8);   /* rammer cylinder */
    /* fuze setter box on the right of the tray */
    K.box("paint", -2.3, -1.8, 0.24, 0.52, -0.30, 0.10);
  }
  function ksUpper(K, team) {
    var s;
    K.cyl("paint", [0, 0, 1.07], [0, 0, 1.16], 0.80, 0.78, 24);           /* traversing base */
    K.box("paint", -1.35, 0.85, -0.78, 0.78, 1.16, 1.62);                  /* saddle */
    K.box("paint", -1.70, -1.15, -0.55, 0.55, 1.16, 1.50);                 /* rear machinery box */
    for (s = -1; s <= 1; s += 2) {
      /* the two tall cheek boxes either side of the cradle, chamfered at the
         front top [K1,K2], and the lower housing stepped down behind them */
      K.prism("paint", [[-0.62, 1.16], [0.74, 1.16], [0.74, 1.92], [0.50, 2.20], [-0.62, 2.20]], s * 0.32, s * 0.86);
      K.prism("paint", [[-1.32, 1.16], [-0.62, 1.16], [-0.62, 1.82], [-1.32, 1.70]], s * 0.30, s * 0.80);
      /* access doors in the outer faces [K1] */
      K.box("dark", -0.42, 0.40, s * 0.86, s * 0.868, 1.30, 1.98);
      K.box("paint", -0.38, 0.36, s * 0.86, s * 0.874, 1.34, 1.94);
      /* gear and sight housings outside the boxes; handwheels [K2] */
      K.box("paint", -1.20, -0.66, s * 0.80, s * 1.00, 1.38, 1.70);
      handwheel(K, [-0.95, s * 1.14, 1.55], [0, s, 0], 0.20);
      handwheel(K, [0.45, s * 1.02, 1.62], [0, s, 0], 0.15);
      K.cyl("paint", [0.45, s * 0.86, 1.62], [0.45, s * 0.95, 1.62], 0.08, 0.08, 8);
      K.box("dark", -0.55, -0.20, s * 0.86, s * 1.00, 1.96, 2.20);        /* sight heads */
      K.box("paint", -0.50, -0.25, s * 0.86, s * 0.98, 1.86, 1.96);
      seat(K, -1.0, s * 1.22, 1.05, 0);
      K.box("steel", -1.30, -0.70, s * 0.80, s * 1.30, 0.98, 1.02);         /* step */
      /* trunnion bosses */
      K.cyl("steel", [0, s * 0.235, KS.tz], [0, s * 0.32, KS.tz], 0.15, 0.15, 12);
    }
    if (team) K.box("team", -0.30, 0.25, 0.874 + 0.02, 0.874 + 0.03, 1.58, 1.80);
    K.push(ELEV(0, KS.tz, KS.el));
    ksBarrel(K, team);
    K.pop();
  }

  /* ============================================================== S-60 */
  /* 57 mm S-60 [S1,S2]: width 2.054, travelling height 2.37, barrel 4.39 */
  var S6 = { wr: 0.47, ww: 0.24, wy: 0.907, wx: 1.60, jx: 2.85, jy: 1.95, tz: 1.80, el: 38 * Math.PI / 180, br: 0.30, bl: 4.39 };
  function s60Carriage(K) {
    var s, i;
    for (s = -1; s <= 1; s += 2) for (i = -1; i <= 1; i += 2) {
      wheel(K, i * S6.wx, s * S6.wy, S6.wr, S6.wr, S6.ww, s);
    }
    for (i = -1; i <= 1; i += 2) {
      K.cyl("steel", [i * S6.wx, -S6.wy + 0.1, S6.wr], [i * S6.wx, S6.wy - 0.1, S6.wr], 0.06, 0.06, 8);
      K.box("paint", i * S6.wx - 0.14, i * S6.wx + 0.14, -S6.wy + 0.12, S6.wy - 0.12, 0.50, 0.64);
      /* leaf spring blocks */
      K.box("dark", i * S6.wx - 0.40, i * S6.wx + 0.40, S6.wy - 0.30, S6.wy - 0.16, 0.46, 0.54);
      K.box("dark", i * S6.wx - 0.40, i * S6.wx + 0.40, -S6.wy + 0.16, -S6.wy + 0.30, 0.46, 0.54);
    }
    K.prism("paint", [[-S6.jx - 0.1, 0.64], [-1.9, 0.50], [1.9, 0.50], [S6.jx + 0.1, 0.64], [S6.jx + 0.1, 0.80], [-S6.jx - 0.1, 0.80]], -0.22, 0.22);
    K.box("paint", -0.9, 0.9, -0.7, 0.7, 0.55, 0.80);
    for (i = -1; i <= 1; i += 2) {
      jack(K, i * S6.jx, 0, 0.74, 0.20);
      K.hexa("paint", [[-0.24, i * 0.68, 0.55], [0.24, i * 0.68, 0.55], [0.09, i * S6.jy, 0.55], [-0.09, i * S6.jy, 0.55],
                       [-0.24, i * 0.68, 0.78], [0.24, i * 0.68, 0.78], [0.09, i * S6.jy, 0.66], [-0.09, i * S6.jy, 0.66]]);
      jack(K, 0, i * (S6.jy - 0.04), 0.62, 0.20);
      K.cyl("steel", [-0.26, i * 0.70, 0.66], [0.26, i * 0.70, 0.66], 0.065, 0.065, 8);
    }
    K.box("dark", S6.jx + 0.1, S6.jx + 0.55, -0.1, 0.1, 0.62, 0.74);       /* drawbar eye */
    K.cyl("paint", [0, 0, 0.80], [0, 0, 0.90], 0.62, 0.62, 22);
    K.cyl("steel", [0, 0, 0.90], [0, 0, 0.94], 0.64, 0.64, 22);
  }
  function s60Barrel(K) {
    var b = -S6.br, i, j, a;
    /* breech ring, stepped jacket to 2.2 m, slim barrel [S1] */
    K.lathe("steel", [b, 0, 0], [b + 1, 0, 0],
            [[0, 0.12], [0.36, 0.12], [0.36, 0.105], [2.2, 0.10], [2.26, 0.068], [3.2, 0.060], [3.95, 0.052], [3.97, 0.0]], 14);
    /* the perforated drum brake, 0.42 m [S1]: drum with rows of dark ports */
    K.lathe("steel", [b + 3.95, 0, 0], [b + 4.95, 0, 0], [[0, 0.058], [0.02, 0.076], [0.42, 0.076], [0.44, 0.05]], 14);
    for (j = 0; j < 2; j++) for (i = 0; i < 6; i++) {
      a = i / 6 * TAU + j * 0.5;
      K.push(mmul(T3(b + 4.07 + j * 0.16, 0, 0), RX(a)));
      K.box("dark", -0.03, 0.03, -0.018, 0.018, 0.068, 0.080);
      K.pop();
    }
    /* recoil sleeve / cradle [S1] and the recuperator below it */
    K.lathe("paint", [-0.55, 0, 0], [0.45, 0, 0], [[0, 0.15], [1.75, 0.15], [1.85, 0.12], [1.85, 0.0]], 16);
    K.cyl("paint", [-0.5, 0, -0.17], [1.2, 0, -0.17], 0.065, 0.065, 10);
    K.cyl("paint", [-0.5, 0, 0.17], [0.95, 0, 0.17], 0.05, 0.05, 8);
    /* the long breech casing behind and the clip guides on it [S1] */
    K.box("steel", -1.75, -0.30, -0.17, 0.17, -0.20, 0.20);
    K.box("paint", -1.70, -0.45, -0.13, 0.13, 0.20, 0.42);
    K.box("dark", -1.65, -0.55, -0.09, 0.09, 0.42, 0.50);
    K.box("paint", -1.85, -1.70, -0.20, 0.20, -0.28, 0.28);
    /* elevating arcs either side of the cradle [S1] */
    for (i = -1; i <= 1; i += 2) K.cyl("paint", [0, i * 0.24, 0], [0, i * 0.28, 0], 0.48, 0.48, 18);
  }
  function s60Upper(K, team) {
    var s;
    K.cyl("paint", [0, 0, 0.94], [0, 0, 1.02], 0.62, 0.60, 22);
    K.box("paint", -1.05, 0.75, -0.72, 0.72, 1.02, 1.12);                  /* platform */
    K.box("paint", -0.65, 0.45, -0.50, 0.50, 1.12, 1.45);                  /* body */
    for (s = -1; s <= 1; s += 2) {
      /* the two upright side shields, cut-outs drawn as dark recesses [S2] */
      K.prism("paint", [[-0.80, 1.05], [0.62, 1.05], [0.66, 2.05], [0.42, 2.32], [-0.30, 2.32], [-0.80, 1.85]], s * 0.58, s * 0.63);
      K.box("dark", -0.55, -0.15, s * 0.63, s * 0.64, 1.70, 2.05);
      K.box("dark", 0.15, 0.45, s * 0.63, s * 0.64, 1.25, 1.55);
      K.cyl("steel", [0, s * 0.40, S6.tz], [0, s * 0.58, S6.tz], 0.11, 0.11, 10);
      K.box("steel", -0.95, -0.55, s * 0.72, s * 1.0, 0.96, 1.00);         /* foot step */
    }
    /* left: elevation and traverse handwheels, sight, layer's seat [S2] */
    handwheel(K, [-0.30, 0.86, 1.50], [0, 1, 0], 0.17);
    handwheel(K, [0.10, 0.84, 1.36], unit([0.4, 0.92, 0]), 0.13);
    K.box("paint", -0.45, 0.10, 0.63, 0.80, 1.30, 1.62);
    K.box("dark", -0.40, -0.10, 0.66, 0.80, 2.05, 2.30);
    K.rod("paint", [-0.25, 0.73, 1.62], [-0.25, 0.73, 2.05], 0.04, 6);
    seat(K, -0.85, 0.85, 1.05, 0);
    seat(K, -0.85, -0.85, 1.05, 0);
    handwheel(K, [-0.35, -0.86, 1.48], [0, -1, 0], 0.16);
    K.box("paint", -0.50, 0.05, -0.80, -0.63, 1.30, 1.60);
    if (team) K.box("team", 0.10, 0.50, 0.63 + 0.02, 0.63 + 0.03, 1.62, 1.85);
    K.push(ELEV(0, S6.tz, S6.el));
    s60Barrel(K);
    K.pop();
  }

  /* =========================================================== ZU-23-2 */
  /* firing order [Z2,Z3]: length 4.57, width 2.88, height 1.22, barrels 2.008 */
  var ZU = { tz: 0.88, el: 30 * Math.PI / 180, gy: 0.125, wr: 0.34, ww: 0.17 };
  function zuCarriage(K) {
    var s;
    K.box("paint", -0.50, 0.50, -0.42, 0.42, 0.20, 0.38);                  /* base frame */
    /* the rear arm (drawbar) to its jack, and two front arms [Z1-Z3] */
    K.hexa("paint", [[-0.5, -0.16, 0.20], [-2.27, -0.07, 0.24], [-2.27, 0.07, 0.24], [-0.5, 0.16, 0.20],
                     [-0.5, -0.16, 0.36], [-2.27, -0.07, 0.34], [-2.27, 0.07, 0.34], [-0.5, 0.16, 0.36]]);
    K.box("dark", -2.50, -2.27, -0.05, 0.05, 0.26, 0.32);                  /* towing eye */
    jack(K, -2.17, 0, 0.30, 0.15);
    for (s = -1; s <= 1; s += 2) {
      K.hexa("paint", [[0.25, s * 0.40, 0.20], [1.05, s * 1.02, 0.20], [0.95, s * 1.10, 0.20], [0.05, s * 0.42, 0.20],
                       [0.25, s * 0.40, 0.34], [1.05, s * 1.02, 0.30], [0.95, s * 1.10, 0.30], [0.05, s * 0.42, 0.34]]);
      jack(K, 1.0, s * 1.06, 0.28, 0.15);
      /* the wheel on its swung arm, lying tilted outward [Z2,Z3] */
      K.box("paint", -0.35, -0.10, s * 0.42, s * 0.92, 0.22, 0.32);
      K.push(mmul(T3(-0.25, s * 1.12, 0.30), RX(s * 1.15)));
      wheel(K, 0, 0, 0, ZU.wr, ZU.ww, s);
      K.pop();
    }
    K.cyl("steel", [0, 0, 0.38], [0, 0, 0.46], 0.40, 0.40, 20);
  }
  function zuGuns(K) {
    var s, k;
    for (s = -1; s <= 1; s += 2) {
      var y = s * ZU.gy;
      /* receiver */
      K.box("steel", -0.80, 0.30, y - 0.065, y + 0.065, -0.10, 0.10);
      K.box("dark", -0.70, 0.10, y - 0.05, y + 0.05, 0.10, 0.14);
      /* barrel: jacket, slim tube, flash hider; 2.008 m from the breech */
      K.lathe("steel", [-0.20, y, 0], [0.80, y, 0],
              [[0.50, 0.050], [0.95, 0.050], [0.97, 0.030], [1.88, 0.027], [1.88, 0.044], [2.20, 0.044], [2.20, 0.036]], 10);
      for (k = 0; k < 4; k++) K.box("dark", 1.92 + k * 0.07, 1.96 + k * 0.07, y - 0.046, y + 0.046, -0.012, 0.012);   /* hider slots */
      /* ammunition box outboard [Z1,Z3] */
      K.box("paint", -0.17, 0.35, s * 0.40, s * 0.64, -0.32, 0.08);
      K.box("paint", -0.19, 0.37, s * 0.39, s * 0.65, 0.08, 0.12);          /* lid */
      K.box("dark", 0.35, 0.36, s * 0.46, s * 0.58, -0.20, 0.02);           /* latch */
      K.box("dark", -0.10, 0.25, s * 0.64, s * 0.65, -0.05, 0.02);          /* rib */
      K.box("dark", -0.05, 0.15, s * 0.20, s * 0.40, -0.04, 0.06);          /* feed chute */
    }
    /* barrel clamp mid-length [Z4] */
    K.box("paint", 1.10, 1.16, -ZU.gy - 0.05, ZU.gy + 0.05, -0.04, 0.04);
    /* cradle under the receivers */
    K.box("paint", -0.45, 0.25, -0.22, 0.22, -0.22, -0.08);
    /* the sight on its bracket, above on the left [Z2,Z4] */
    K.box("paint", -0.45, -0.30, 0.25, 0.32, 0.10, 0.22);
    K.box("dark", -0.55, -0.20, 0.22, 0.36, 0.22, 0.34);
    K.cyl("dark", [-0.20, 0.29, 0.28], [-0.10, 0.29, 0.28], 0.045, 0.045, 8);
  }
  function zuUpper(K, team) {
    var s;
    K.box("paint", -0.42, 0.38, -0.36, 0.36, 0.46, 0.72);                  /* upper carriage */
    for (s = -1; s <= 1; s += 2) {
      /* the round side plates of the cradle mount [Z1,Z3] */
      K.cyl("paint", [0.05, s * 0.34, ZU.tz], [0.05, s * 0.385, ZU.tz], 0.33, 0.33, 22);
      K.box("paint", -0.30, 0.35, s * 0.28, s * 0.36, 0.46, ZU.tz);
      K.cyl("steel", [0.05, s * 0.385, ZU.tz], [0.05, s * 0.41, ZU.tz], 0.07, 0.07, 8);
      /* seats behind, with tube backs [Z2,Z3] */
      K.rod("steel", [-0.40, s * 0.30, 0.62], [-0.78, s * 0.42, 0.58], 0.025, 6);
      seat(K, -0.82, s * 0.44, 0.56, 0);
      K.rod("steel", [-0.30, s * 0.30, 0.50], [-0.55, s * 0.62, 0.30], 0.02, 6);   /* foot rest */
      K.box("dark", -0.62, -0.45, s * 0.55, s * 0.72, 0.28, 0.31);
    }
    handwheel(K, [-0.48, 0.46, 0.86], [-1, 0, 0], 0.13);
    handwheel(K, [-0.48, -0.46, 0.86], [-1, 0, 0], 0.13);
    K.push(ELEV(0.05, ZU.tz, ZU.el));
    zuGuns(K);
    if (team) K.box("team", -0.08, 0.26, 0.43, 0.61, 0.12 + 0.02, 0.12 + 0.03);
    K.pop();
  }

  /* ============================================================= SON-9 */
  /* SON-9 "Fire Can" [R1-R3]: box body on a four-wheel trailer; sizes scaled
     off the photographs against the 1.07 m tyres (none published). */
  function son9Full(K, team) {
    var s, i, L = 2.6, W = 1.2, zb = 1.10, zt = 2.85, c = 0.18, wx = 1.6, r = 0.535;
    /* the body: a loft of the section along X, chamfered roof edges [R2,R3] */
    K.push(RZ(Math.PI / 2));
    K.prism("paint", [[-W, zb], [W, zb], [W, zt - c], [W - c, zt], [-W + c, zt], [-W, zt - c]], -L, L);
    K.pop();
    /* skirts between and outside the wheel arches */
    for (s = -1; s <= 1; s += 2) {
      K.box("paint", -1.0, 1.0, s * (W - 0.04), s * W, 0.62, zb);
      K.box("paint", 2.18, L, s * (W - 0.04), s * W, 0.62, zb);
      K.box("paint", -L, -2.18, s * (W - 0.04), s * W, 0.62, zb);
    }
    K.box("dark", -L + 0.1, L - 0.1, -W + 0.1, W - 0.1, 0.62, zb);         /* underside */
    for (s = -1; s <= 1; s += 2) for (i = -1; i <= 1; i += 2) wheel(K, i * wx, s * 0.95, r, r, 0.28, s);
    for (i = -1; i <= 1; i += 2) K.cyl("steel", [i * wx, -0.85, r], [i * wx, 0.85, r], 0.06, 0.06, 8);
    /* side doors, window, louvres [R3]: thin raised frames on the +Y side */
    K.box("dark", -0.40, 0.55, W, W + 0.015, 1.20, 2.55);
    K.box("paint", -0.36, 0.51, W, W + 0.025, 1.24, 2.51);
    K.box("dark", 0.65, 1.55, W, W + 0.015, 1.20, 2.55);
    K.box("paint", 0.69, 1.51, W, W + 0.025, 1.24, 2.51);
    K.box("dark", -1.95, -1.25, W, W + 0.02, 1.95, 2.45);                  /* window */
    K.box("dark", -1.95, -1.25, -W - 0.02, -W, 1.95, 2.45);
    K.box("dark", -0.2, 0.6, -W - 0.015, -W, 1.20, 2.55);                  /* door, far side */
    K.box("dark", L, L + 0.015, -0.55, 0.55, 1.20, 2.55);                  /* front door */
    if (team) K.box("team", -0.25, 0.40, W + 0.025, W + 0.035, 1.70, 2.10);
    /* drawbar A-frame and eye, corner jacks [R2] */
    K.rod("paint", [L, 0.6, 0.85], [L + 1.25, 0, 0.62], 0.06, 8);
    K.rod("paint", [L, -0.6, 0.85], [L + 1.25, 0, 0.62], 0.06, 8);
    K.cyl("dark", [L + 1.25, 0, 0.62], [L + 1.45, 0, 0.62], 0.07, 0.07, 8);
    jack(K, L + 1.25, 0, 0.55, 0.12);
    for (s = -1; s <= 1; s += 2) for (i = -1; i <= 1; i += 2) jack(K, i * (L - 0.15), s * (W - 0.15), 0.70, 0.14);
    /* roof rack at the front [R3] */
    for (s = -1; s <= 1; s += 2) {
      K.rod("dark", [1.4, s * 0.9, zt], [1.4, s * 0.9, zt + 0.30], 0.025, 5);
      K.rod("dark", [2.4, s * 0.9, zt], [2.4, s * 0.9, zt + 0.30], 0.025, 5);
      K.rod("dark", [1.4, s * 0.9, zt + 0.30], [2.4, s * 0.9, zt + 0.30], 0.025, 5);
    }
    K.rod("dark", [1.4, -0.9, zt + 0.30], [1.4, 0.9, zt + 0.30], 0.025, 5);
    K.rod("dark", [2.4, -0.9, zt + 0.30], [2.4, 0.9, zt + 0.30], 0.025, 5);
    /* the antenna: pedestal, yoke, perforated dish (mean tone of mesh over
       the paint), feed on three struts [R1,R2] */
    var ax = -0.9;
    K.cyl("dark", [ax, 0, zt], [ax, 0, zt + 0.32], 0.30, 0.26, 14);
    K.box("paint", ax - 0.25, ax + 0.25, -0.45, 0.45, zt + 0.32, zt + 0.48);
    for (s = -1; s <= 1; s += 2) K.box("paint", ax - 0.12, ax + 0.12, s * 0.38, s * 0.48, zt + 0.48, zt + 0.95);
    var tilt = 0.55, cz = zt + 0.95, d = [Math.cos(tilt), 0, Math.sin(tilt)];
    K.push(mmul(T3(ax, 0, cz), RY(-tilt)));
    var dp = [], n = 6, R = 0.95, depth = 0.30;
    for (i = 0; i <= n; i++) { var rr = R * i / n; dp.push([depth * (rr / R) * (rr / R) - 0.05, rr]); }
    for (i = n; i >= 0; i--) { var r2 = R * i / n; dp.push([depth * (r2 / R) * (r2 / R), r2]); }
    K.lathe("dish", [0, 0, 0], [1, 0, 0], dp, 20);
    K.box("dark", -0.05, 0.10, -0.42, 0.42, -0.10, 0.10);                  /* back frame */
    for (i = 0; i < 3; i++) {
      var a = i / 3 * TAU + 0.5;
      K.rod("dark", [depth * 0.6, Math.cos(a) * 0.75, Math.sin(a) * 0.75], [0.62, 0, 0], 0.015, 4);
    }
    K.cyl("dark", [0.58, 0, 0], [0.74, 0, 0], 0.06, 0.04, 8);
    K.pop();
    /* cable reels and step at the rear [R2] */
    K.cyl("dark", [-L - 0.25, -0.5, 1.35], [-L - 0.25, -0.1, 1.35], 0.22, 0.22, 12);
    K.box("dark", -L - 0.12, -L, -0.6, 0.0, 1.05, 1.65);
  }

  /* ========================================================= the position */
  /* a round earth revetment [B1]: profile (r, z) turned round Z */
  function berm(K, R, h) {
    var prof = [[R - 0.15, 0.0], [R + 0.25, h * 0.75], [R + 0.60, h], [R + 1.00, h * 0.92], [R + 1.75, 0.0]];
    var n = Math.max(28, Math.round(R * 9)), i, j, q, a0, a1;
    for (i = 0; i < n; i++) {
      a0 = i / n * TAU; a1 = (i + 1) / n * TAU;
      var wob0 = 1 + 0.04 * Math.sin(a0 * 3 + R), wob1 = 1 + 0.04 * Math.sin(a1 * 3 + R);
      for (q = 0; q < prof.length - 1; q++) {
        var p0 = prof[q], p1 = prof[q + 1];
        var A = [Math.cos(a0) * p0[0], Math.sin(a0) * p0[0], p0[1] * wob0], B = [Math.cos(a1) * p0[0], Math.sin(a1) * p0[0], p0[1] * wob1];
        var C = [Math.cos(a1) * p1[0], Math.sin(a1) * p1[0], p1[1] * wob1], D = [Math.cos(a0) * p1[0], Math.sin(a0) * p1[0], p1[1] * wob0];
        var dr = p1[0] - p0[0], dz = p1[1] - p0[1], am = (a0 + a1) / 2;
        K.quad("earth", A, B, C, D, [-Math.cos(am) * dz, -Math.sin(am) * dz, dr]);
      }
    }
  }
  /* a ring of sandbags, three courses, staggered [Z4] */
  function bagRing(K, R) {
    var c, i, n = Math.round(TAU * R / 0.56), a;
    for (c = 0; c < 3; c++) for (i = 0; i < n; i++) {
      a = (i + (c % 2) * 0.5) / n * TAU;
      K.push(mmul(T3(Math.cos(a) * R, Math.sin(a) * R, c * 0.15), RZ(a + Math.PI / 2)));
      K.cbox("bag", -0.29, 0.29, -0.18, 0.18, 0, 0.16, 0.05);
      K.pop();
    }
  }
  /* ammunition boxes in a row along the bag ring's top [Z4] */
  function zuBoxes(K, R, a0, n) {
    var i, a;
    for (i = 0; i < n; i++) {
      a = a0 + i * 0.26;
      K.push(mmul(T3(Math.cos(a) * R, Math.sin(a) * R, 0.45), RZ(a + Math.PI / 2)));
      K.cbox("paint", -0.30, 0.30, -0.14, 0.14, 0, 0.26, 0.0);
      K.box("dark", -0.31, 0.31, -0.145, 0.145, 0.10, 0.12);
      K.pop();
    }
  }

  /* ------------------------------------------------------------ paint */
  var _tex = {};
  function canvasTex(THREE, key, P) {
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), s = P.seed >>> 0, i, k, a, x, y, rr, ang, rd;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      for (k = 0; k < 2; k++) {
        q.fillStyle = k ? P.lite : P.dark; q.globalAlpha = P.mottle;
        for (i = 0; i < 12; i++) {
          x = R() * 256; y = R() * 256; rr = 12 + R() * 34;
          q.beginPath();
          for (a = 0; a < 8; a++) {
            ang = a / 8 * TAU; rd = rr * (0.6 + R() * 0.6);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      q.globalAlpha = 1;
      if (P.kind === "metal") {
        /* plate seams with the bead's highlight, bolt rows, dust, streaks */
        for (i = 0; i < 6; i++) {
          x = Math.floor(R() * 256); y = Math.floor(R() * 256); rr = 50 + R() * 120;
          q.fillStyle = "rgba(18,20,14,0.32)";
          if (i % 2) q.fillRect(x, y, rr, 2); else q.fillRect(x, y, 2, rr);
          q.fillStyle = "rgba(230,230,210,0.10)";
          if (i % 2) q.fillRect(x, y + 2, rr, 1); else q.fillRect(x + 2, y, 1, rr);
        }
        q.fillStyle = "rgba(16,18,14,0.35)";
        for (i = 0; i < 70; i++) q.fillRect(Math.floor(R() * 32) * 8, Math.floor(R() * 4) * 64 + 3, 2, 2);
        for (i = 0; i < 60; i++) {
          q.fillStyle = (i % 3) ? "rgba(15,14,10,0.07)" : "rgba(190,178,140,0.08)";
          q.fillRect(R() * 256, R() * 256, 3 + R() * 24, 1 + R() * 5);
        }
        for (i = 0; i < 14; i++) { q.fillStyle = "rgba(25,22,15,0.07)"; q.fillRect(R() * 256, R() * 256, 1 + R() * 2, 16 + R() * 50); }
      } else if (P.kind === "earth") {
        /* clods, grass tufts, ruts */
        for (i = 0; i < 900; i++) {
          q.fillStyle = (i % 4 === 0) ? "rgba(70,82,44,0.35)" : (i % 2 ? "rgba(30,26,18,0.20)" : "rgba(200,185,150,0.16)");
          q.fillRect(R() * 256, R() * 256, 1 + R() * 3, 1 + R() * 3);
        }
        q.fillStyle = "rgba(35,30,22,0.16)";
        for (i = 0; i < 4; i++) { y = R() * 256; q.fillRect(0, y, 256, 3 + R() * 4); }
      } else {
        /* burlap: weave lines, darker seams between bags */
        q.fillStyle = "rgba(40,34,22,0.18)";
        for (i = 0; i < 256; i += 4) { q.fillRect(0, i, 256, 1); q.fillRect(i, 0, 1, 256); }
        q.fillStyle = "rgba(40,34,22,0.30)";
        for (i = 0; i < 256; i += 64) q.fillRect(0, i, 256, 3);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  /* Soviet olive green as photographed [K1,S2,R1], taken to about 0.8 of its
     sampled level; earth and bags from [B1,Z4] */
  var PAL = {
    paint: { kind: "metal", base: "#4b5638", lite: "#5d6a47", dark: "#38412a", mottle: 0.30, seed: 1907 },
    earth: { kind: "earth", base: "#7b6a4a", lite: "#8a7a5a", dark: "#64563e", mottle: 0.45, seed: 4127 },
    ground: { kind: "earth", base: "#4f4d37", lite: "#5c5e40", dark: "#3f3d2d", mottle: 0.40, seed: 777 },
    bag: { kind: "bag", base: "#8d7d5a", lite: "#9a8a66", dark: "#6e6248", mottle: 0.35, seed: 31 }
  };
  function makeMats(THREE, C) {
    var M = {}, k;
    function tex(k, rough) {
      var m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: rough, metalness: k === "paint" ? 0.10 : 0.0 });
      var t = canvasTex(THREE, k, PAL[k]);
      if (t) m.map = t; else m.color.set(PAL[k].base);
      return m;
    }
    M.paint = tex("paint", 0.84);
    M.earth = tex("earth", 0.97);
    M.ground = tex("ground", 0.98);
    M.bag = tex("bag", 0.95);
    M.dark = new THREE.MeshStandardMaterial({ color: 0x232527, roughness: 0.80, metalness: 0.25 });
    M.steel = new THREE.MeshStandardMaterial({ color: 0x3a4034, roughness: 0.55, metalness: 0.45 });
    M.dish = new THREE.MeshStandardMaterial({ color: 0x56604a, roughness: 0.70, metalness: 0.20 });
    M.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x4b8fe0, roughness: 0.70, metalness: 0.10 });
    return M;
  }
  var UVS = { paint: 0.55, earth: 0.12, ground: 0.07, bag: 1.4 };
  function bins(M) {
    var B = {}, k;
    for (k in M) B[k] = new Bin(M[k], UVS[k] || 0);
    return B;
  }
  function flush(THREE, group, B, prefix) {
    var k, b, geo, mesh;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      geo.computeBoundingSphere();
      mesh = new THREE.Mesh(geo, b.mat); mesh.name = prefix + k;
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
  }

  /* --------------------------------------------------------- the layouts */
  /* guns: [x, y, carriage yaw]; every mount is trained to +X (director laid) */
  var SITES = {
    ks19: { carriage: ksCarriage, upper: ksUpper, pit: "berm", R: 4.0, h: 1.1,
            guns: [[3.0, 0, 0], [-6.5, -7.6, 0.45], [-6.5, 7.6, -0.4]], radar: [11.6, -8.6, Math.PI / 2] },
    s60:  { carriage: s60Carriage, upper: s60Upper, pit: "berm", R: 3.35, h: 1.0,
            guns: [[2.0, 0, 0], [-8.0, -8.0, 0.4], [-8.0, 8.0, -0.35], [7.2, 8.6, 0.7]], radar: [11.8, -8.4, Math.PI / 2] },
    zu23: { carriage: zuCarriage, upper: zuUpper, pit: "bags", R: 2.75,
            guns: [[0, 0, 0], [-8.2, -8.2, 0.5], [-8.2, 8.2, -0.5], [8.2, 8.2, 0.35]], radar: null }
  };

  function build(sysKey) {
    return function (THREE, M0, C) {
      var S = SITES[sysKey], root = new THREE.Group(), mats = makeMats(THREE, C);
      var Bb = bins(mats), Bt = bins(mats), Kb = new Kit(Bb), Kt = new Kit(Bt), i, g;
      /* the packed-earth plot */
      Kb.box("ground", -14.2, 14.2, -14.2, 14.2, 0.0, 0.04);
      for (i = 0; i < S.guns.length; i++) {
        g = S.guns[i];
        Kb.push(T3(g[0], g[1], 0));
        if (S.pit === "berm") berm(Kb, S.R, S.h);
        else {
          bagRing(Kb, S.R);
          zuBoxes(Kb, S.R, 0.35 + i * 0.7, i ? 3 : 5);
        }
        Kb.push(RZ(g[2]));
        S.carriage(Kb);
        Kb.pop();
        if (i > 0) S.upper(Kb, false);
        Kb.pop();
      }
      S.upper(Kt, true);
      if (S.radar) {
        Kb.push(mmul(T3(S.radar[0], S.radar[1], 0), RZ(S.radar[2])));
        son9Full(Kb, true);
        Kb.pop();
      }
      flush(THREE, root, Bb, "aa_");
      var turret = new THREE.Group(); turret.name = "turret";
      flush(THREE, turret, Bt, "aat_");
      turret.position.set(S.guns[0][0], S.guns[0][1], 0);
      root.add(turret);
      root.userData.whole = true;
      return root;
    };
  }
  return { build: build };
})();

BLD_MODELS["flak_pact_e50"] = { build: HeroRuAaSite.build("ks19") };
BLD_MODELS["flak_pact_e60"] = { build: HeroRuAaSite.build("s60") };
BLD_MODELS["flak_pact_e80"] = { build: HeroRuAaSite.build("zu23") };
BLD_MODELS["flak_pact_e90"] = { build: HeroRuAaSite.build("zu23") };
BLD_MODELS["flak_pact_e00"] = { build: HeroRuAaSite.build("zu23") };
BLD_MODELS["flak_pact_e20"] = { build: HeroRuAaSite.build("zu23") };
