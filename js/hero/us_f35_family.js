/* ================= us_f35_family.js  -  HERO MODEL =================
   Lockheed Martin F-35 Lightning II: the A, the B and the C, one airframe
   in three guises. Four rows draw it:
       nato_e00_stealthfighter   F-35A  (the e00 row; replaces the old
                                 nato_e00_stealthfighter.js hero, which
                                 is still loaded and is simply overridden)
       cstealth_n                F-35C  (US Navy and Marine Corps carrier row)
       stealth_b, cstealth_b     F-35B  (RAF and Fleet Air Arm, 617 Sqn; the
                                 two rows are the same aeroplane. stealth_b
                                 used to draw the F-22 through stealth_n and
                                 cstealth_b the parametric C stand-in.)
   gbr_e00_cstealth (eras.js) is a placeholder, "no British carrier stealth
   fighter in this period": rules.js purgePhantomUnits() deletes it, so it
   draws nothing and gets no key.

   Model space: +X nose, +Y left (port), +Z up, metres. Heights below are
   written above the ground; the wheels stand on z = ZG. The game scales an
   aircraft by its length, so only the proportions survive.

   Drawings (Wikimedia Commons, US government works, public domain):
     "Lockheed Martin F-35A Lightning II 3-view drawing.png",
     "F-35B three-view.PNG", "F-35C three-view.PNG" - each 1115 x 786 px,
     one scale per drawing, set by its own length. The planforms here are
     read off the top views by a pixel scan at a quarter metre, and the model
     was laid back over them: its top-view outline agrees with each drawing
     to 0.1 m (A and C; the B's stabilator trailing edge 0.13 m) and the A's
     side-view top line to 0.1 m except the windscreen:
       A  wing LE 34 deg from the body to the tip at 10.0 m aft of the nose,
          tip chord 1.55 m, TE swept FORWARD 14 deg, half-span 5.35 m;
          stabilator LE 36 deg, tip 3.64 m out, TE swept forward 14.5 deg,
          aftmost at the root, 15.67 m; fins canted 20 deg, tips 2.25 m out,
          LE swept 43 deg
       B  the same wing and tail to within 0.1 m (the lift fan changes the
          spine, not the planform)
       C  half-span 6.57 m: the LE keeps the A's 34 deg but stands 0.7 m
          further out at the same station, so the root LE is 0.6 m further
          forward; TE forward 14 deg; stabilator tip 4.4 m out (A: 3.64)
     The side views give the depth: nose tip 1.75 m above the ground,
     canopy 3.10 m, spine 2.88 m, belly 0.9 m, fin tip 4.38 m (A), 4.36 m
     (B), 4.48 m (C): the published heights of 14.4, 14.3 and 14.7 ft.
   Published figures: A 15.67 m x 10.7 m; B 15.6 m x 10.7 m; C 15.7 m x
     13.1 m (folded 9.1 m: the fold line is drawn at y 4.5).

   What makes it an F-35 and not "a single-engine stealth jet", at RTS zoom:
     1. ONE engine: a single round nozzle on the centreline, tail booms and
        canted fins either side of it, stabilators swept like the wing.
     2. A wide, deep, blunt body (the bays are inside it) with a plain
        trapezoid wing and no leading-edge root extension spike.
     3. Diverterless supersonic inlets: a fixed bump on the forebody side
        and a forward-raked cowl lip, no splitter plate.
     4. A long frameless bubble canopy, gold-tinted, and a spine behind it.
   Where the three differ:
     A  the internal GAU-22/A (muzzle door on the port forebody), a dorsal
        refuelling receptacle, the longest bays, the standard wing.
     B  STOVL: the lift fan under two doors behind the canopy with the
        auxiliary inlet doors aft of them (painted; the spine is raised only
        a few centimetres, as the drawing has it), the swivel nozzle (its
        joint ring), a shorter weapons bay, no gun, a probe door, a belly
        without the A's dip under the nozzle bay; low-visibility roundels,
        since this is the RAF's.
     C  the 13.1 m wing with its fold seam and big ailerons, bigger tails,
        the tailhook bay, twin nose wheels on a heavier leg, bigger mains.
   Nothing hangs outside: all weapons are internal; the bay doors are
   drawn shut, painted.

   DRAWN SIZE. The game draws an aircraft r x 2.24 m long (render3d.js): the
   A and both B rows (r 16) 2.29-2.30 times their real size, the C row (r 15)
   2.14 times. So the 10.7 m span stands 24.5-24.6 m across and the C's
   13.14 m span 28.1 m, against the airbase revetments' 22.8 m between walls:
   the same as the old A hero's, but the C's wing is the widest yet drawn
   at r 15 (tools/jsc/parked3d_check.js keeps an OVERSIZE list for these).

   Whole airframe merged into one mesh per material (7 root meshes) and the
   gear one named group of 4, so 11 draw calls and 8 materials. The team
   colour is exactly C.team.
   ================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroF35 = (function () {
  "use strict";

  var V = null;                 /* THREE, set by build()                     */
  var D2R = Math.PI / 180;

  /* datum: s is metres aft of the radome tip, h metres above the ground */
  var XN = 7.90, ZG = -1.75;
  function X(s) { return XN - s; }
  function Z(h) { return h + ZG; }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  /* piecewise-linear lookup in [[key, value], ...] (ascending keys) */
  function pl(p, k) {
    var n = p.length, i;
    if (k <= p[0][0]) return p[0][1];
    for (i = 1; i < n; i++) {
      if (k <= p[i][0]) return p[i - 1][1] + (k - p[i - 1][0]) * (p[i][1] - p[i - 1][1]) / (p[i][0] - p[i - 1][0]);
    }
    return p[n - 1][1];
  }

  /* ============================================================ the rows ==
     Each variant: wing and stabilator planforms as [y, s] polylines read off
     the drawings, the fin, and the little differences. */
  var VARS = {
    A: {
      id: "A", tailS: 15.68, semi: 5.35,
      wLE: [[1.20, 7.05], [1.75, 7.20], [2.00, 7.55], [2.40, 8.00], [5.35, 10.00]],
      wTE: [[1.20, 12.62], [1.87, 12.50], [2.56, 12.25], [3.66, 12.00], [4.61, 11.75], [5.35, 11.57]],
      wY: [1.20, 1.75, 2.00, 2.40, 2.56, 3.66, 4.61, 5.35], wZ0: 2.05, wDroop: 0.020,
      sLE: [[0.90, 12.30], [2.09, 13.03], [2.79, 13.50], [3.52, 14.00], [3.64, 14.25]], sTip: 3.64, sSlope: 0.258,
      sY: [0.90, 1.60, 2.09, 2.79, 3.52, 3.64],
      finTop: 4.38, finLE: [11.85, 13.55], finTE: [14.85, 14.70],
      bayMain: [7.70, 11.20], bayAam: [6.40, 8.10],
      noseR: 0.27, noseW: 0.18, twin: false, mainR: 0.37, mainW: 0.26, mainY: 1.70, legR: 0.085, noseLegR: 0.07,
      lift: false, hook: false, gun: true
    },
    B: {
      id: "B", tailS: 15.60, semi: 5.35,
      wLE: [[1.20, 7.05], [1.75, 7.20], [2.00, 7.55], [2.40, 8.00], [5.35, 10.00]],
      wTE: [[1.20, 12.62], [1.87, 12.50], [2.56, 12.20], [3.66, 11.93], [4.61, 11.70], [5.35, 11.52]],
      wY: [1.20, 1.75, 2.00, 2.40, 2.56, 3.66, 4.61, 5.35], wZ0: 2.05, wDroop: 0.020,
      sLE: [[0.90, 12.30], [2.09, 13.03], [2.79, 13.50], [3.52, 14.00], [3.64, 14.25]], sTip: 3.64, sSlope: 0.258,
      sY: [0.90, 1.60, 2.09, 2.79, 3.52, 3.64],
      finTop: 4.36, finLE: [11.85, 13.55], finTE: [14.85, 14.70],
      bayMain: [8.40, 11.20], bayAam: [7.00, 8.40],
      noseR: 0.27, noseW: 0.18, twin: false, mainR: 0.37, mainW: 0.26, mainY: 1.70, legR: 0.085, noseLegR: 0.07,
      lift: true, hook: false, gun: false
    },
    C: {
      id: "C", tailS: 15.70, semi: 6.57,
      wLE: [[1.20, 6.95], [1.79, 7.00], [1.95, 7.25], [2.30, 7.50], [3.07, 8.00], [6.57, 10.38]],
      wTE: [[1.20, 13.10], [2.00, 12.96], [2.84, 12.75], [3.86, 12.50], [4.81, 12.25], [5.84, 12.00], [6.57, 11.82]],
      wY: [1.20, 1.79, 2.30, 2.84, 3.86, 4.50, 4.81, 5.84, 6.57], wZ0: 2.05, wDroop: 0.016,
      sLE: [[0.90, 11.97], [2.44, 13.00], [3.93, 14.00], [4.33, 14.50], [4.40, 14.66]], sTip: 4.40, sSlope: 0.250,
      sY: [0.90, 1.70, 2.44, 3.20, 3.93, 4.33, 4.40],
      finTop: 4.48, finLE: [11.75, 13.55], finTE: [14.92, 14.80],
      bayMain: [7.70, 11.20], bayAam: [6.40, 8.10],
      noseR: 0.28, noseW: 0.17, twin: true, mainR: 0.40, mainW: 0.30, mainY: 1.76, legR: 0.10, noseLegR: 0.09,
      lift: false, hook: true, gun: false, fold: 4.50
    }
  };
  function stabTE(v, y) { return v.tailS - (y - 0.90) * v.sSlope; }

  /* ---- body stations: [s, w chine half-width, chine h, shoulder h,
     shoulder half-width, crown above the shoulder, belly h, belly
     half-width]. Widths from the top views' envelopes, heights from the side
     views plus the 0.67 m the A sits above its lowest point. ------------- */
  var FORE = [
    [0.00, 0.020, 1.74, 1.77, 0.010,  0.00, 1.72, 0.010],
    [0.30, 0.160, 1.78, 1.90, 0.100,  0.01, 1.58, 0.080],
    [0.80, 0.380, 1.80, 2.06, 0.250,  0.02, 1.38, 0.200],
    [1.50, 0.540, 1.78, 2.22, 0.350,  0.03, 1.20, 0.300],
    [2.30, 0.640, 1.76, 2.35, 0.430,  0.02, 1.17, 0.380],
    [3.10, 0.740, 1.76, 2.42, 0.480, -0.04, 1.14, 0.430],
    [3.90, 0.820, 1.76, 2.46, 0.510, -0.05, 1.11, 0.480],
    [4.60, 0.940, 1.78, 2.50, 0.560, -0.05, 1.08, 0.540]
  ];
  /* the intake mouth: the trunk's full section, raked (see rake()) */
  var MOUTH = [4.65, 1.70, 1.86, 2.50, 0.80, -0.06, 1.08, 1.05];
  var MID = [
    [ 5.50, 1.72, 1.88, 2.62, 1.22, 0.03, 1.02, 1.16],
    [ 6.50, 1.76, 1.92, 2.74, 1.26, 0.06, 0.94, 1.22],
    [ 7.50, 1.78, 1.95, 2.80, 1.22, 0.08, 0.91, 1.24],
    [ 9.00, 1.76, 1.96, 2.75, 1.18, 0.08, 0.89, 1.22],
    [10.50, 1.74, 2.00, 2.72, 1.30, 0.07, 0.86, 1.16],
    [11.80, 1.70, 2.15, 2.70, 1.45, 0.05, 0.80, 1.10],
    [12.60, 1.62, 2.20, 2.66, 1.38, 0.03, 0.98, 0.92],
    [13.05, 1.15, 2.20, 2.58, 0.95, 0.02, 1.22, 0.74],
    [13.50, 0.68, 1.95, 2.42, 0.55, 0.00, 1.40, 0.54]
  ];
  /* the B's spine over the lift fan and the aux-inlet doors. The Commons
     drawings put the B's top line level with the A's, measured from the
     radome tip (both 1.13 m above it at 7 m back, to 0.03 m), so this is
     only a few centimetres of dome: the doors are painted, not raised. */
  var HUMP = [[4.65, 0], [5.50, 0.02], [6.50, 0.03], [7.50, 0.03], [9.00, 0.015], [10.50, 0]];
  /* The B's belly is the A's to 10.5 m; behind that the A's dips another
     0.1-0.2 m under the nozzle bay (its lowest line sits at 11.5 m) and the
     B's does not: the same drawings, belly measured from the radome tip,
     put the B 0.13 m higher at 11 m and 0.14 m at 12 m. */
  var BELLY_B = [[7.50, 0], [10.50, 0], [11.80, -0.14], [12.80, -0.05], [13.40, 0], [14.00, 0]];

  /* forward-raked cowl lip: the outboard corner stands 0.5 m ahead of the
     centreline and the lower lip is further aft, as in the drawings (outer
     corner 4.2 m from the nose, the chine corner back at 4.75) */
  function rake(y, h) {
    var a = Math.abs(y);
    if (a <= 1.0) return 0;
    var r = -1.1 * Math.min(a - 1.0, 0.45);
    if (a > 1.45) r += 0.55 * Math.min(1, (a - 1.45) / 0.25);
    return r + 0.30 * Math.max(0, 1.95 - h);
  }

  /* =========================================================== helpers == */
  function cr1(p0, p1, p2, p3, t) {
    var t2 = t * t, t3 = t2 * t;
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2
      + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
  }
  function resample(tab, n) {
    var m = tab.length, cols = tab[0].length, out = [], i, c;
    for (i = 0; i < n; i++) {
      var u = i / (n - 1) * (m - 1), k = Math.min(m - 2, Math.floor(u)), t = u - k, row = [];
      for (c = 0; c < cols; c++) {
        row.push(cr1(tab[Math.max(0, k - 1)][c], tab[k][c], tab[k + 1][c],
                     tab[Math.min(m - 1, k + 2)][c], t));
      }
      out.push(row);
    }
    return out;
  }

  /* One body section, 24 points: port chine -> crown -> starboard chine ->
     keel -> port chine, the chines and belly corners doubled and the quads
     between the doubles skipped, so each stays a knife edge with its own
     normal: the faceting of a low-observable body. */
  var BODY_SKIP = [12, 16, 19, 23];
  function bodyRing(st, rk) {
    var w = st[1], zc = st[2], zt = st[3], wt = st[4], cr = st[5], zb = st[6], wb = st[7];
    var dt = zt - zc, db = zc - zb;
    var s1 = [w + (wt - w) * 0.30, zc + dt * 0.30];
    var a2 = s1[0] + (wt - s1[0]) * 0.40, a3 = s1[0] + (wt - s1[0]) * 0.74;
    var h2 = s1[1] + (zt - s1[1]) * 0.40, h3 = s1[1] + (zt - s1[1]) * 0.74;
    var b1 = w + (wb - w) * 0.36, b2 = w + (wb - w) * 0.70;
    var P = [
      [w, zc], s1, [a2, h2], [a3, h3],
      [wt, zt], [wt * 0.62, zt + cr * 0.75], [0, zt + cr], [-wt * 0.62, zt + cr * 0.75],
      [-wt, zt], [-a3, h3], [-a2, h2], [-s1[0], s1[1]],
      [-w, zc], [-w, zc], [-b1, zc - db * 0.36], [-b2, zc - db * 0.70],
      [-wb, zb], [-wb, zb], [0, zb - 0.02], [wb, zb],
      [wb, zb], [b2, zc - db * 0.70], [b1, zc - db * 0.36], [w, zc]
    ];
    var out = [], i;
    for (i = 0; i < P.length; i++) {
      var s = st[0] + (rk ? rk(P[i][0], P[i][1]) : 0);
      out.push([X(s), P[i][0], Z(P[i][1])]);
    }
    return out;
  }

  /* bridge rings of equal length with quads; caps are fans; open skips the
     closing quad (a half ring) */
  function bridge(rings, skip, capA, capB, open) {
    var nr = rings.length, N = rings[0].length, pos = [], idx = [], i, j, sk = {};
    if (skip) for (i = 0; i < skip.length; i++) sk[skip[i]] = 1;
    for (i = 0; i < nr; i++) for (j = 0; j < N; j++) pos.push(rings[i][j][0], rings[i][j][1], rings[i][j][2]);
    var lim = open ? N - 1 : N;
    for (i = 0; i < nr - 1; i++) {
      for (j = 0; j < lim; j++) {
        if (sk[j]) continue;
        var a = i * N + j, b = i * N + (j + 1) % N, c = a + N, d = b + N;
        idx.push(a, c, b, b, c, d);
      }
    }
    function cap(r, first) {
      var cx = 0, cy = 0, cz = 0, base = pos.length / 3, k;
      for (k = 0; k < N; k++) { cx += r[k][0]; cy += r[k][1]; cz += r[k][2]; }
      pos.push(cx / N, cy / N, cz / N);
      for (k = 0; k < N; k++) pos.push(r[k][0], r[k][1], r[k][2]);
      for (k = 0; k < N; k++) {
        var p = base + 1 + k, q = base + 1 + (k + 1) % N;
        if (first) idx.push(base, p, q); else idx.push(base, q, p);
      }
    }
    if (capA) cap(rings[0], true);
    if (capB) cap(rings[nr - 1], false);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* a closed shell wound outward: positive signed volume */
  function orient(g) {
    var p = g.attributes.position.array, ix = g.index.array, v = 0, t;
    for (t = 0; t < ix.length; t += 3) {
      var a = ix[t] * 3, b = ix[t + 1] * 3, c = ix[t + 2] * 3;
      v += p[a] * (p[b + 1] * p[c + 2] - p[b + 2] * p[c + 1])
         - p[a + 1] * (p[b] * p[c + 2] - p[b + 2] * p[c])
         + p[a + 2] * (p[b] * p[c + 1] - p[b + 1] * p[c]);
    }
    if (v < 0) {
      for (t = 0; t < ix.length; t += 3) { var s = ix[t + 1]; ix[t + 1] = ix[t + 2]; ix[t + 2] = s; }
      g.index.needsUpdate = true;
      g.computeVertexNormals();
    }
    return g;
  }
  function yt(f, tc) {
    return tc * (1.4845 * Math.sqrt(f) - 0.6300 * f - 1.7580 * f * f
               + 1.4215 * f * f * f - 0.5075 * f * f * f * f);
  }
  /* aerofoil ring at span station y: TE over the top to the LE and back under */
  function foil(sLE, sTE, y, zm, tc, m, grow) {
    var p = [], i, f, chord = sTE - sLE, g = grow || 0, pad = g ? 0.02 : 0;
    var xl = X(sLE) + g, c = chord + 2 * g;
    for (i = 0; i <= m; i++) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push([xl - f * c, y, zm + yt(f, tc) * c + (i === 0 ? 0.004 : 0) + pad]);
    }
    for (i = m - 1; i >= 1; i--) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push([xl - f * c, y, zm - yt(f, tc) * c - pad]);
    }
    return p;
  }
  function mirrorRings(rings) {
    return rings.map(function (r) { return r.map(function (q) { return [q[0], -q[1], q[2]]; }); });
  }
  /* round / rounded-rectangle section in the y-z plane */
  function rrect(x, cy, cz, hw, hh, n, e) {
    var p = [], i, a, c, s;
    for (i = 0; i < n; i++) {
      a = i / n * Math.PI * 2; c = Math.cos(a); s = Math.sin(a);
      p.push([x, cy + hw * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e),
                 cz + hh * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), e)]);
    }
    return p;
  }
  var _m4 = null, _q = null, _v = null, _u = null;
  function boxG(sx, sy, sz, x, y, z, ry) {
    var g = new V.BoxGeometry(sx, sy, sz);
    if (ry) g.rotateY(ry);
    g.translate(x, y, z);
    return g;
  }
  function rod(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r, r, L, seg || 8);
    _q.setFromUnitVectors(_u.set(0, 1, 0), _v.set(dx / L, dy / L, dz / L));
    _m4.makeRotationFromQuaternion(_q);
    _m4.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(_m4);
    return g;
  }
  /* CylinderGeometry's own axis is Y: the axle across the aircraft */
  function wheelG(r, w, x, y, z, seg) {
    var g = new V.CylinderGeometry(r, r, w, seg || 18);
    g.translate(x, y, z);
    return g;
  }

  /* ============================================================= paint ==
     One sheet for the whole airframe, four plan views at 56 px to the metre:
     from above, from port, from starboard, from below. Every skin triangle
     takes its UVs by projection into the band its normal faces (projUV), so
     the panel lines, bay doors and insignia are drawn where they are on the
     aeroplane, in metres. Cached per variant. */
  var PXM = 56, XMIN = -8.4, TW = 1024;
  var YMAX = 6.795, TOPH = 761, ZTOP = 2.85, SIDEH = 263;
  var TH = 2048, B_PORT = TOPH, B_STBD = TOPH + SIDEH, B_BOT = TOPH + 2 * SIDEH;
  function cu(x) { return clamp((x - XMIN) * PXM, 1, TW - 1); }
  function rTop(y) { return clamp((YMAX - y) * PXM, 1, TOPH - 1); }
  function rBot(y) { return B_BOT + clamp((YMAX - y) * PXM, 1, TOPH - 1); }
  function rSide(z, stbd) { return (stbd ? B_STBD : B_PORT) + clamp((ZTOP - z) * PXM, 1, SIDEH - 1); }

  var BASE = "#768086";          /* the old A hero's modern US grey (PAINT.twotone) */
  var EDGE = "#677177";          /* the radar-absorbent edge strips             */
  var LINE = "rgba(38,46,52,0.62)";
  var _tex = {};

  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function trace(g, pts, col, lw) {
    var i;
    g.strokeStyle = col; g.lineWidth = lw;
    g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
    g.stroke();
  }
  function rect(g, u0, v0, u1, v1, col, lw) {
    trace(g, [[u0, v0], [u1, v0], [u1, v1], [u0, v1], [u0, v0]], col, lw);
  }
  function disc(g, u, v, r, col) {
    g.fillStyle = col; g.beginPath(); g.arc(u, v, r, 0, Math.PI * 2); g.closePath(); g.fill();
  }
  /* low-visibility insignia, a shade off the skin: the US star-and-bar, or
     the UK roundel */
  function insignia(g, u, v, r, uk) {
    var i, a;
    if (uk) {
      disc(g, u, v, r, "rgba(88,98,106,0.80)");
      disc(g, u, v, r * 0.70, "rgba(146,154,160,0.60)");
      disc(g, u, v, r * 0.34, "rgba(88,98,106,0.80)");
      return;
    }
    disc(g, u, v, r, "rgba(92,102,110,0.72)");
    g.fillStyle = "rgba(92,102,110,0.72)";
    g.fillRect(u - r * 2.0, v - r * 0.32, r * 4.0, r * 0.64);
    g.fillStyle = "rgba(152,160,166,0.60)";
    g.beginPath();
    for (i = 0; i < 10; i++) {
      a = -Math.PI / 2 + i * Math.PI / 5;
      var rr = i % 2 ? r * 0.38 : r * 0.92;
      if (i === 0) g.moveTo(u + rr * Math.cos(a), v + rr * Math.sin(a));
      else g.lineTo(u + rr * Math.cos(a), v + rr * Math.sin(a));
    }
    g.closePath(); g.fill();
  }

  function paintSheet(v) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(v.id === "A" ? 3501 : v.id === "B" ? 3502 : 3503);
    var i, k, y, sd, ys, pts, band, S, T;
    var uk = v.id === "B";
    function tp(s, yy, bot) { return [cu(X(s)), bot ? rBot(yy) : rTop(yy)]; }

    g.fillStyle = BASE; g.fillRect(0, 0, TW, TH);

    /* a faint mottle: the jets are one grey, a little weathered */
    var bands = [[0, TOPH], [B_PORT, SIDEH], [B_STBD, SIDEH], [B_BOT, TOPH]];
    for (k = 0; k < 4; k++) {
      for (i = 0; i < (k === 0 || k === 3 ? 22 : 8); i++) {
        disc(g, R() * TW, bands[k][0] + R() * bands[k][1], 14 + R() * 38,
             R() < 0.5 ? "rgba(96,106,112,0.10)" : "rgba(140,150,156,0.09)");
      }
    }

    /* top and bottom planforms, both sides: radar-absorbent edge strips on
       the leading and trailing edges, control-surface lines */
    for (band = 0; band < 2; band++) {
      for (sd = -1; sd <= 1; sd += 2) {
        ys = []; for (y = 1.8; y <= v.semi - 0.02; y += 0.2) ys.push(y);
        ys.push(v.semi - 0.02);
        trace(g, ys.map(function (yy) { return tp(pl(v.wLE, yy) + 0.10, sd * yy, band); }), EDGE, 12);
        trace(g, ys.map(function (yy) { return tp(pl(v.wTE, yy) - 0.10, sd * yy, band); }), EDGE, 12);
        /* leading-edge flap, flaperon and aileron lines */
        trace(g, ys.filter(function (yy) { return yy > 2.5; }).map(function (yy) {
          return tp(pl(v.wLE, yy) + 0.16 * (pl(v.wTE, yy) - pl(v.wLE, yy)), sd * yy, band); }), LINE, 1.3);
        trace(g, ys.filter(function (yy) { return yy < v.semi * 0.72; }).map(function (yy) {
          return tp(pl(v.wTE, yy) - 0.24 * (pl(v.wTE, yy) - pl(v.wLE, yy)), sd * yy, band); }), LINE, 1.3);
        var yA = v.semi * 0.72;
        trace(g, ys.filter(function (yy) { return yy >= yA; }).map(function (yy) {
          return tp(pl(v.wTE, yy) - 0.30 * (pl(v.wTE, yy) - pl(v.wLE, yy)), sd * yy, band); }), LINE, 1.3);
        trace(g, [tp(pl(v.wTE, yA) - 0.24 * (pl(v.wTE, yA) - pl(v.wLE, yA)), sd * yA, band),
                  tp(pl(v.wTE, yA), sd * yA, band)], LINE, 1.3);
        /* the C's wing fold: a double seam across the chord */
        if (v.fold) {
          trace(g, [tp(pl(v.wLE, v.fold), sd * v.fold, band), tp(pl(v.wTE, v.fold), sd * v.fold, band)], LINE, 1.6);
          trace(g, [tp(pl(v.wLE, v.fold) + 0.12, sd * (v.fold + 0.10), band),
                    tp(pl(v.wTE, v.fold) - 0.12, sd * (v.fold + 0.10), band)], LINE, 1.0);
        }
        /* stabilator edge strips and its pivot line */
        ys = []; for (y = 1.7; y <= v.sTip; y += 0.2) ys.push(y);
        trace(g, ys.map(function (yy) { return tp(pl(v.sLE, yy) + 0.08, sd * yy, band); }), EDGE, 10);
        trace(g, ys.map(function (yy) { return tp(stabTE(v, yy) - 0.08, sd * yy, band); }), EDGE, 10);
      }
    }

    /* ---- from above ---- */
    S = function (s0, s1, a, b, lw) { rect(g, cu(X(s1)), rTop(b), cu(X(s0)), rTop(a), LINE, lw || 1.3); };
    S(2.30, 3.40, -0.40, 0.40, 1.0);                       /* canopy sill */
    if (v.gun) {                                           /* the GAU-22/A muzzle door, port forebody */
      g.fillStyle = "rgba(24,28,32,0.70)"; g.fillRect(cu(X(4.18)), rTop(0.86), 14, 5);
      rect(g, cu(X(4.30)), rTop(0.90), cu(X(3.90)), rTop(0.74), LINE, 1.0);
    }
    if (v.id === "A") {                                    /* dorsal refuelling receptacle */
      S(7.55, 8.55, -0.28, 0.28, 1.4);
      trace(g, [tp(7.55, 0, 0), tp(8.55, 0, 0)], LINE, 1.0);
    }
    if (v.lift) {                                          /* lift-fan doors and auxiliary inlets */
      disc(g, cu(X(5.70)), rTop(0), 0.66 * PXM, "rgba(74,82,88,0.22)");
      g.strokeStyle = LINE; g.lineWidth = 1.5;
      g.beginPath(); g.arc(cu(X(5.70)), rTop(0), 0.66 * PXM, 0, Math.PI * 2); g.stroke();
      g.beginPath(); g.arc(cu(X(5.70)), rTop(0), 0.52 * PXM, 0, Math.PI * 2); g.stroke();
      S(4.95, 5.05, -0.66, 0.66, 1.2);
      S(6.50, 7.30, 0.08, 0.62, 1.5); S(6.50, 7.30, -0.62, -0.08, 1.5);
      S(7.40, 8.10, -0.30, 0.30, 1.0);
      g.fillStyle = "rgba(30,36,42,0.55)";
      g.fillRect(cu(X(7.30)), rTop(0.62), 0.80 * PXM, 0.54 * PXM);
      g.fillRect(cu(X(7.30)), rTop(-0.08), 0.80 * PXM, 0.54 * PXM);
    }
    if (v.id !== "A") S(2.10, 3.10, -0.62, -0.42, 1.2);    /* the probe door, starboard forebody: the A refuels by boom */
    S(8.80, 11.30, -0.88, 0.88, 1.0);                      /* the deck panels over the engine */
    S(11.30, 13.20, -0.70, 0.70, 1.0);
    for (sd = -1; sd <= 1; sd += 2) {                      /* fin footprints and boom seams */
      trace(g, [tp(12.00, sd * 1.30, 0), tp(14.80, sd * 1.30, 0)], LINE, 1.0);
    }
    /* insignia: US low-vis star on the port upper wing, UK roundels on both */
    T = v.semi * 0.72;
    insignia(g, tp(pl(v.wTE, T) - 1.0, T, 0)[0], rTop(T), 24, uk);
    if (uk) insignia(g, tp(pl(v.wTE, T) - 1.0, -T, 0)[0], rTop(-T), 24, true);

    /* ---- from below ---- */
    S = function (s0, s1, a, b, lw) { rect(g, cu(X(s1)), rBot(b), cu(X(s0)), rBot(a), LINE, lw || 1.3); };
    g.fillStyle = "rgba(24,28,32,0.85)";                   /* the electro-optical targeting window */
    g.fillRect(cu(X(1.95)), rBot(0.22), 0.72 * PXM, 0.44 * PXM);
    S(3.10, 4.45, -0.26, 0.26, 1.4);                       /* nose gear well */
    for (sd = -1; sd <= 1; sd += 2) {
      S(v.bayMain[0], v.bayMain[1], sd > 0 ? 0.12 : -0.72, sd > 0 ? 0.72 : -0.12, 1.5);   /* main bays */
      S(v.bayAam[0], v.bayAam[1], sd > 0 ? 0.98 : -1.36, sd > 0 ? 1.36 : -0.98, 1.5);     /* AAM bays */
      S(8.40, 9.90, sd > 0 ? 1.20 : -1.90, sd > 0 ? 1.90 : -1.20, 1.3);                   /* main gear wells */
    }
    if (v.hook) { S(12.80, 13.45, -0.30, 0.30, 1.5); trace(g, [tp(12.90, 0, 1), tp(13.40, 0, 1)], LINE, 1.0); }
    if (v.lift) {
      for (sd = -1; sd <= 1; sd += 2) S(10.0, 10.55, sd > 0 ? 1.78 : -2.20, sd > 0 ? 2.20 : -1.78, 1.0);   /* roll-post doors */
    }
    T = v.semi * 0.72;
    insignia(g, tp(pl(v.wTE, T) - 1.0, -T, 1)[0], rBot(-T), 24, uk);
    if (uk) insignia(g, tp(pl(v.wTE, T) - 1.0, T, 1)[0], rBot(T), 24, true);

    /* ---- the sides: the bay doors' edges, the cockpit, inlet and gear
       door lines; the DAS apertures are small dark squares ---- */
    for (k = 0; k < 2; k++) {
      var sg = k === 1;
      var SS = function (s, z) { return [cu(X(s)), rSide(z, sg)]; };
      trace(g, [SS(4.65, 1.10), SS(4.65, 2.50)], LINE, 1.4);                      /* the inlet lip */
      trace(g, [SS(6.40, 1.55), SS(8.00, 1.55), SS(8.00, 2.30)], LINE, 1.0);
      trace(g, [SS(8.40, 1.00), SS(9.90, 1.00), SS(9.90, 1.55)], LINE, 1.0);
      trace(g, [SS(11.80, 2.74), SS(14.80, 2.60)], LINE, 1.0);
      g.fillStyle = "rgba(24,28,32,0.70)";
      g.fillRect(SS(2.60, 2.02)[0], SS(2.60, 2.02)[1], 10, 8);
      g.fillRect(SS(6.10, 1.92)[0], SS(6.10, 1.92)[1], 10, 8);
      if (v.id === "B") insignia(g, SS(10.6, 2.45)[0], SS(10.6, 2.45)[1], 15, true);
    }
    var tex = new V.CanvasTexture(cv);
    tex.wrapS = tex.wrapT = V.ClampToEdgeWrapping;
    tex.anisotropy = 4;
    if (V.sRGBEncoding !== undefined) tex.encoding = V.sRGBEncoding;   /* r148 */
    return tex;
  }
  function sheet(v) {
    if (_tex[v.id] !== undefined) return _tex[v.id];
    try { _tex[v.id] = paintSheet(v); } catch (e) { _tex[v.id] = false; }
    return _tex[v.id];
  }

  /* projected UVs: each triangle into the band its normal faces. Faces that
     look fore or aft would collapse to a line under an x projection, so they
     are laid out along x plus the cross coordinate. */
  function projUV(geo) {
    var p = geo.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var band = nz > 0.5 ? 0 : nz < -0.5 ? 3 : (ny >= 0 ? 1 : 2);
      var endOn = Math.abs(nx) > 0.8;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], yy = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, Rr;
        if (band === 0) { U = cu(endOn ? x + yy : x); Rr = rTop(yy); }
        else if (band === 3) { U = cu(endOn ? x + yy : x); Rr = rBot(yy); }
        else { U = cu(endOn ? x + yy : x); Rr = rSide(z, band === 2); }
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - Rr / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  /* ========================================================= materials ==
     SKIN: the painted sheet. METAL: gear legs and hubs. HOT: the nozzle's
     burnt flaps. INK: flat black of a duct, a well, an exhaust. DARK: the
     cockpit. TYRE. GLASS: the canopy, gold-bronze from outside. TEAM is
     exactly C.team (eraPaint leaves it alone; the emissive keeps it from
     greying out under ACES). */
  function makeMats(C, v) {
    var tex = sheet(v), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.80, metalness: 0.10,
                                          side: V.DoubleSide });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x768086);
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.hot = new V.MeshStandardMaterial({ color: 0x3d3f41, roughness: 0.58, metalness: 0.45,
                                         side: V.DoubleSide });
    m.ink = new V.MeshStandardMaterial({ color: 0x060708, roughness: 0.95, metalness: 0.03,
                                         side: V.DoubleSide });
    m.tyre = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.dark = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.70, metalness: 0.30 });
    m.glass = new V.MeshStandardMaterial({ color: 0x6a5527, roughness: 0.12, metalness: 0.55,
                                           transparent: true, opacity: 0.84, side: V.DoubleSide });
    return m;
  }

  /* ============================================================ airframe = */
  function addBody(K, v) {
    var i, rings = [], sec, mid = MID;
    if (v.lift) {
      mid = MID.map(function (r) {
        var d = pl(HUMP, r[0]);
        return [r[0], r[1], r[2], r[3] + d, r[4], r[5] + (d > 0 ? 0.02 : 0), r[6] - pl(BELLY_B, r[0]), r[7]];
      });
    }
    /* forebody: radome, chines and cockpit, run on inside the trunks so the
       intake mouths open beside it and not onto a hole */
    sec = resample(FORE, 16);
    for (i = 0; i < sec.length; i++) rings.push(bodyRing(sec[i]));
    var ext = FORE[FORE.length - 1].slice(); ext[0] = 5.55;
    rings.push(bodyRing(ext));
    K.skin.push(orient(bridge(rings, BODY_SKIP, true, true)));

    /* centre and aft body, from the raked intake lips to the nozzle bay. Its
       front is left open: the gap between it and the forebody IS the inlet. */
    rings = [bodyRing(MOUTH, rake)];
    sec = resample(mid, 26);
    for (i = 0; i < sec.length; i++) rings.push(bodyRing(sec[i]));
    K.skin.push(bridge(rings, BODY_SKIP, false, true));

    /* the duct: a dark plate set 0.35 m inside the lip */
    var plate = bodyRing(MOUTH, function (y, h) { return rake(y, h) + 0.35; });
    K.ink.push(bridge([plate, plate.map(function (q) { return [q[0] - 0.01, q[1], q[2]]; })],
                      null, true, false));

    /* the diverterless inlet's bump, either side of the forebody */
    for (var sd = -1; sd <= 1; sd += 2) {
      var bump = new V.SphereGeometry(1, 14, 9);
      bump.scale(0.88, 0.30, 0.46);
      bump.translate(X(4.95), sd * 1.02, Z(1.64));
      K.skin.push(bump);
    }

    /* tail booms: the fins stand on them and the stabilators join their flanks */
    var bm = [[11.80, 1.40, 2.45, 0.30, 0.30], [12.60, 1.36, 2.36, 0.40, 0.39],
              [13.40, 1.32, 2.30, 0.40, 0.42], [14.20, 1.30, 2.30, 0.34, 0.32],
              [14.90, 1.28, 2.32, 0.24, 0.26]];
    var br = bm.map(function (b) { return rrect(X(b[0]), b[1], Z(b[2]), b[3], b[4], 14, 1.0); });
    K.skin.push(orient(bridge(br, null, true, true)));
    K.skin.push(orient(bridge(mirrorRings(br), null, true, true)));
  }

  /* the canopy: one frameless bubble, with the opaque fairing behind it */
  var CANOPY = [
    [1.70, 0.10, 2.18, 2.26], [2.00, 0.28, 2.26, 2.56], [2.50, 0.42, 2.34, 2.84],
    [3.00, 0.49, 2.40, 3.05], [3.50, 0.51, 2.44, 3.10], [4.00, 0.50, 2.46, 3.09],
    [4.50, 0.45, 2.49, 3.04], [4.80, 0.36, 2.52, 2.96]
  ];
  var FAIRING = [
    [4.60, 0.44, 2.50, 2.98], [5.20, 0.43, 2.56, 3.00], [5.90, 0.40, 2.64, 2.96],
    [6.60, 0.34, 2.72, 2.92], [7.40, 0.22, 2.80, 2.90]
  ];
  function arcRing(st, n, closed, dz) {
    var p = [], k, a;
    for (k = 0; k <= n; k++) {
      a = Math.PI * k / n;
      p.push([X(st[0]), st[1] * Math.cos(a), Z(st[2] + ((st[3] + (dz || 0)) - st[2]) * Math.pow(Math.sin(a), 0.85))]);
    }
    if (closed) p.push([X(st[0]), 0, Z(st[2] - 0.06)]);
    return p;
  }
  function addCanopy(K, v) {
    var i, r = [];
    var sec = resample(CANOPY, 14);
    for (i = 0; i < sec.length; i++) r.push(arcRing(sec[i], 12, false));
    K.glass.push(bridge(r, null, false, false, true));
    r = [];
    for (i = 0; i < FAIRING.length; i++) r.push(arcRing(FAIRING[i], 12, true, v.lift ? 0.03 : 0));
    K.skin.push(orient(bridge(r, null, true, true)));
    /* the cockpit: tub, coaming, seat */
    K.dark.push(boxG(1.80, 0.80, 0.30, X(3.40), 0, Z(2.30)));
    K.dark.push(boxG(0.30, 0.64, 0.18, X(2.45), 0, Z(2.50)));
    K.dark.push(boxG(0.16, 0.50, 0.60, X(4.35), 0, Z(2.66)));
    K.dark.push(boxG(0.30, 0.44, 0.34, X(4.15), 0, Z(2.54)));
    var helm = new V.SphereGeometry(0.15, 10, 7);
    helm.translate(X(4.12), 0, Z(2.86));
    K.metal.push(helm);
  }

  function addWings(K, v) {
    var i, y, r = [], semi = v.semi;
    for (i = 0; i < v.wY.length; i++) {
      y = v.wY[i];
      r.push(foil(pl(v.wLE, y), pl(v.wTE, y), y, Z(v.wZ0 - v.wDroop * (y - 1.7)),
                  0.060 - 0.018 * (y - 1.2) / (semi - 1.2), 7));
    }
    K.skin.push(orient(bridge(r, null, true, true)));
    K.skin.push(orient(bridge(mirrorRings(r), null, true, true)));
    /* stabilators: swept like the wing, a little anhedral */
    r = [];
    for (i = 0; i < v.sY.length; i++) {
      y = v.sY[i];
      r.push(foil(pl(v.sLE, y), stabTE(v, y), y, Z(2.00 - 0.0699 * y), 0.050 - 0.012 * (y / v.sTip), 7));
    }
    K.skin.push(orient(bridge(r, null, true, true)));
    K.skin.push(orient(bridge(mirrorRings(r), null, true, true)));
  }

  /* fins: canted 20 deg, LE swept 43 deg; hh runs up the fin's own plane */
  var FIN_CANT = 20 * D2R, FIN_Y0 = 1.55, FIN_Z0 = 2.55;
  function finFoil(v, hh, tc, side, grow) {
    var Hs = (v.finTop - FIN_Z0) / Math.cos(FIN_CANT);
    var hv = Math.max(hh, 0), sLE = v.finLE[0] + hv * (v.finLE[1] - v.finLE[0]);
    var sTE = v.finTE[0] + hv * (v.finTE[1] - v.finTE[0]);
    if (hh < 0) sTE = Math.min(sTE, 14.60);
    var p = [], i, f, g = grow || 0, pad = g ? 0.02 : 0, m = 8;
    var c = sTE - sLE + 2 * g, xl = X(sLE) + g, ca = Math.cos(FIN_CANT), sa = Math.sin(FIN_CANT);
    var y0 = FIN_Y0 + hh * Hs * sa, z0 = Z(FIN_Z0) + hh * Hs * ca;
    function pt(x, t) { return [x, side * (y0 + t * ca), z0 - t * sa]; }
    for (i = 0; i <= m; i++) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push(pt(xl - f * c, yt(f, tc) * c + (i === 0 ? 0.003 : 0) + pad));
    }
    for (i = m - 1; i >= 1; i--) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push(pt(xl - f * c, -yt(f, tc) * c - pad));
    }
    return p;
  }
  function addFins(K, v) {
    var hs = [-0.22, 0.30, 0.65, 1.0], i, side, r;
    for (side = -1; side <= 1; side += 2) {
      r = [];
      for (i = 0; i < hs.length; i++) r.push(finFoil(v, hs[i], 0.050 - 0.012 * Math.max(0, hs[i]), side));
      K.skin.push(orient(bridge(r, null, true, true)));
    }
  }

  /* the nozzle: the F135's convergent-divergent flaps, a round shroud with
     the dark throat set back; the B's swivel module shows as a joint ring.
     The exit plane is 14.06 m behind the radome (the dark nozzle in the A's
     top view runs 13.42-14.06, the C's to 13.95): the stabilators and the
     boom ends reach 1.6 m further aft. */
  function addNozzle(K, v) {
    var st = [[13.02, 0.55], [13.37, 0.555], [13.67, 0.52], [13.90, 0.495], [14.06, 0.535]];
    var r = st.map(function (q) { return rrect(X(q[0]), 0, Z(1.92), q[1], q[1], 24, 1.0); });
    K.hot.push(bridge(r, null, false, false));
    var th = rrect(X(14.02), 0, Z(1.92), 0.45, 0.45, 20, 1.0);
    K.ink.push(bridge([th, rrect(X(13.42), 0, Z(1.92), 0.30, 0.30, 20, 1.0)], null, true, true));
    /* the exhaust's saw-tooth petals: sixteen thin flaps round the exit,
       canted in towards the throat */
    for (var k = 0; k < 16; k++) {
      var pg = new V.BoxGeometry(0.30, 0.17, 0.016);
      pg.rotateY(4 * D2R);
      pg.translate(0, 0, 0.51);
      pg.rotateX(k * Math.PI / 8);
      pg.translate(X(13.92), 0, Z(1.92));
      K.hot.push(pg);
    }
    if (v.id === "B") {
      var j0 = rrect(X(13.52), 0, Z(1.92), 0.585, 0.585, 24, 1.0), j1 = rrect(X(13.74), 0, Z(1.92), 0.585, 0.585, 24, 1.0);
      K.dark.push(bridge([j0, j1], null, false, false));
    }
  }

  /* team colour: a band round the top of each fin and one round each wing
     near the tip, so ownership reads from above as well as from the side */
  function addFlash(K, v) {
    var side, r, i, y, ys = [v.semi - 0.55, v.semi + 0.02];
    for (side = -1; side <= 1; side += 2) {
      r = [];
      for (i = 0; i < 3; i++) r.push(finFoil(v, [0.80, 0.90, 1.0][i], (0.050 - 0.012 * [0.80, 0.90, 1.0][i]) * 1.10, side, 0.02));
      K.team.push(orient(bridge(r, null, true, true)));
    }
    r = [];
    for (i = 0; i < ys.length; i++) {
      y = Math.min(ys[i], v.semi);
      r.push(foil(pl(v.wLE, y), pl(v.wTE, y), y, Z(v.wZ0 - v.wDroop * (y - 1.7)),
                  (0.060 - 0.018 * (y - 1.2) / (v.semi - 1.2)) * 1.10, 7, 0.02));
    }
    K.team.push(orient(bridge(r, null, true, true)));
    K.team.push(orient(bridge(mirrorRings(r), null, true, true)));
  }

  /* ================================================================ gear ==
     Tricycle: the nose wheel under the cockpit (the C has two, on a heavier
     leg), the mains under the wing roots; stowed inside, drawn only near the
     ground by render3d. The tyres are the lowest solid thing on the
     aeroplane, so a parked machine stands on them. */
  var NOSE_S = 3.70, MAIN_S = 9.20;
  function bellyH(s) {
    var i, t;
    if (s <= FORE[FORE.length - 1][0]) {
      for (i = 1; i < FORE.length; i++) {
        if (s <= FORE[i][0]) { t = (s - FORE[i - 1][0]) / (FORE[i][0] - FORE[i - 1][0]); return FORE[i - 1][6] + t * (FORE[i][6] - FORE[i - 1][6]); }
      }
    }
    for (i = 0; i < MID.length; i++) if (s <= MID[i][0]) return MID[i][6];
    return MID[MID.length - 1][6];
  }
  function addGear(G, v) {
    var n = NOSE_S, m = MAIN_S, nr = v.noseR, mr = v.mainR, hn = bellyH(n) + 0.03, s, k;
    var nl = v.noseLegR;
    G.metal.push(rod([X(n - 0.20), 0, Z(hn)], [X(n - 0.04), 0, Z(nr + 0.30)], nl, 8));
    G.metal.push(rod([X(n + 0.40), 0, Z(hn)], [X(n - 0.02), 0, Z(0.62)], 0.032, 6));
    if (v.twin) {
      G.metal.push(rod([X(n - 0.04), -0.20, Z(nr)], [X(n - 0.04), 0.20, Z(nr)], 0.05, 8));
      G.metal.push(rod([X(n - 0.04), 0, Z(nr + 0.30)], [X(n - 0.04), 0.20, Z(nr)], 0.04, 6));
      G.metal.push(rod([X(n - 0.04), 0, Z(nr + 0.30)], [X(n - 0.04), -0.20, Z(nr)], 0.04, 6));
      for (k = -1; k <= 1; k += 2) {
        G.tyre.push(wheelG(nr, v.noseW, X(n), k * 0.22, Z(nr), 18));
        G.metal.push(wheelG(0.13, v.noseW + 0.02, X(n), k * 0.22, Z(nr), 10));
      }
      /* the launch bar, stowed forward on the leg */
      G.metal.push(rod([X(n - 0.04), 0, Z(nr + 0.45)], [X(n - 0.70), 0, Z(nr + 0.28)], 0.03, 6));
    } else {
      G.metal.push(rod([X(n - 0.04), 0.12, Z(nr + 0.24)], [X(n), 0.12, Z(nr)], 0.034, 6));
      G.metal.push(rod([X(n - 0.04), -0.12, Z(nr + 0.24)], [X(n), -0.12, Z(nr)], 0.034, 6));
      G.tyre.push(wheelG(nr, v.noseW, X(n), 0, Z(nr), 18));
      G.metal.push(wheelG(0.13, 0.20, X(n), 0, Z(nr), 10));
    }
    G.metal.push(boxG(0.10, 0.12, 0.10, X(n - 0.20), 0, Z(nr + 0.46)));
    for (k = -1; k <= 1; k += 2) G.skin.push(boxG(1.15, 0.035, 0.40, X(n - 0.05), k * 0.29, Z(hn - 0.20)));
    G.ink.push(boxG(1.20, 0.50, 0.04, X(n - 0.05), 0, Z(hn - 0.07)));

    /* mains: leg, side brace, axle, wheel, the door hanging outboard and the well */
    var hm = bellyH(m) + 0.03, my = v.mainY;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(rod([X(m - 0.12), s * 1.20, Z(hm)], [X(m), s * (my - 0.12), Z(mr + 0.10)], v.legR, 8));
      G.metal.push(rod([X(m + 0.55), s * 1.00, Z(hm - 0.02)], [X(m), s * (my - 0.16), Z(0.66)], 0.045, 6));
      G.metal.push(rod([X(m), s * (my - 0.16), Z(mr)], [X(m), s * (my + 0.14), Z(mr)], 0.06, 8));
      G.tyre.push(wheelG(mr, v.mainW, X(m), s * my, Z(mr), 20));
      G.metal.push(wheelG(0.21, v.mainW + 0.02, X(m), s * my, Z(mr), 12));
      G.skin.push(boxG(1.10, 0.035, 0.62, X(m + 0.05), s * (my + 0.24), Z(hm - 0.20)));
      G.ink.push(boxG(1.50, 0.62, 0.04, X(m + 0.10), s * 1.45, Z(hm - 0.04)));
    }
  }

  /* ============================================================== build == */
  function merge(list) {
    var pos = [], nor = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = list[i].index ? list[i].toNonIndexed() : list[i];
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(new Float32Array(pos.length / 3 * 2), 2));
    return out;
  }
  function emit(parent, lists, mats, order) {
    for (var i = 0; i < order.length; i++) {
      var key = order[i];
      if (!lists[key] || !lists[key].length) continue;
      var geo = merge(lists[key]);
      if (key === "skin") projUV(geo);
      parent.add(new V.Mesh(geo, mats[key]));
    }
  }

  function build(THREE, M, C, which) {
    V = THREE;
    var v = VARS[which];
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    var K = { skin: [], team: [], metal: [], hot: [], ink: [], dark: [], glass: [] };
    var G = { skin: [], metal: [], tyre: [], ink: [] };
    addBody(K, v);
    addCanopy(K, v);
    addWings(K, v);
    addFins(K, v);
    addNozzle(K, v);
    addFlash(K, v);
    addGear(G, v);

    var mats = makeMats(C, v);
    var root = new V.Group();
    emit(root, K, mats, ["skin", "team", "hot", "ink", "dark", "metal", "glass"]);
    var gear = new V.Group();
    gear.name = "gear";
    emit(gear, G, mats, ["skin", "metal", "tyre", "ink"]);
    root.add(gear);
    return root;
  }

  return { build: build };
})();

/* len is the measured X extent: radome tip to the aftmost stabilator root */
UNIT_MODELS["nato_e00_stealthfighter"] = {
  len: 15.68,
  build: function (THREE, M, C) { return HeroF35.build(THREE, M, C, "A"); }
};
UNIT_MODELS["cstealth_n"] = {
  len: 15.70,
  build: function (THREE, M, C) { return HeroF35.build(THREE, M, C, "C"); }
};
UNIT_MODELS["stealth_b"] = {
  len: 15.60,
  build: function (THREE, M, C) { return HeroF35.build(THREE, M, C, "B"); }
};
UNIT_MODELS["cstealth_b"] = {
  len: 15.60,
  build: function (THREE, M, C) { return HeroF35.build(THREE, M, C, "B"); }
};
