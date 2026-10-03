/* ============ us_a6_intruder.js -- GRUMMAN A-6 INTRUDER AND EA-6B PROWLER (HERO MODEL) ============

   The Grumman side-by-side two-seat subsonic carrier attack aeroplane and its
   four-seat jamming sister, drawn for the five rows that fly them:
     nato_e60_cstrike  A-6A Intruder (1963): the first all-weather attack
                       aircraft, no turret under the nose; twenty-eight Mk 82 on
                       five stations (the weapon row's own text)
     nato_e80_cstrike  A-6E TRAM (1979): the chin turret (infrared, laser
                       designator and receiver); Mk 82s and Paveway II
     nato_e90_cstrike  A-6E SWIP (1990): the same airframe, Harpoon and SLAM
                       on the inner stations beside the Paveways
     nato_e60_ewair    EA-6B Prowler (1971): the ALQ-99 pods ("up to five pods"
                       says the row), no missile of any kind in this decade
     nato_e90_ewair    EA-6B Prowler ICAP II: the same airframe with AGM-88 HARM
                       on the outer stations (the row's weapon)
   The A-6 rows drew a French carrier fighter (fra_e80_cfighter) as a
   stand-in; the Prowler rows drew a 4,958-triangle, 84-mesh model.

   TWO AIRFRAMES OF ONE FAMILY
     A-6   16.69 m long (54 ft 9 in), 16.15 m span (53 ft 0 in), 4.93 m high
           (16 ft 2 in); side-by-side cockpit under one long canopy; bulbous
           radome; J52 intake scoops on the fuselage sides with the engines
           under the wing root; a mid-set tapered wing, a high-set slab stabiliser
           halfway up the tail cone; a single swept fin.
     EA-6B 17.98 m (the Navy drawing gives 59 ft 1 in = 18.0 m), the same wing
           (53 ft 0 in), 4.95 m (16 ft 3 in): a 1.3 m plug in the cockpit for
           four seats in two rows under two panes, the nose gear 1.3 m further
           aft and the wing and tail moved back with the fuselage, and the big
           receiver pod on top of the fin.

   Source: the Naval Air Systems Command "Descriptive Arrangement" drawings of
   the A-6E and the EA-6B (Wikimedia Commons, public domain US Navy), read for
   the plan, the side profile, the fin, the tailplane (6.2 m span = 20 ft 4.5
   in) and the gear (nose wheel 20 x 5.5, mains 36 x 11, track 10 ft 10.5 in =
   3.3 m, wheelbase 17 ft 2 in = 5.2 m). The wing planform was measured off the
   plan view (leading edge swept about 27 degrees, 3.7 m chord at the fold,
   1.6 m at the tip, trailing edge swept slightly aft) and the heights off the
   side view, which stands on a sloping ground line (the Intruder sits nose-up
   on its long nose gear): heights are above the ground, stations along it.
   What could not be confirmed and is therefore only generic: the exact store
   arrangement of each row (the weapon rows name the weapons, not the racks,
   so the Mk 82 are drawn six to a multiple ejector rack, 4 + 4 x 6 = 28 for
   the A-6A), the A-6's refuelling probe (drawn on the centreline), and
   the paint (light gull grey over white for the 1960s-80s rows, the low-
   visibility greys for the 1990s).

   WING FOLD (render-only, js/render3d.js folds a "wingfold" group on a ship's
   deck and nowhere else). The same NAVAIR drawings give the folded wing:
   A-6E "25'-4\" FOLDED" (7.72 m), EA-6B "299\" (24'-11\")" (7.60 m), the
   panels swung up and over until their tips nearly meet above the spine
   (the front views), the top of the folded wing 16'-3\" (A-6E) and 16'-7.6\"
   (EA-6B) above the ground and 21'-11\" / 21'-6.8\" while folding (the side
   views: hinge height plus the panel's span). So the hinge runs fore and aft
   on the upper skin at y 3.69 m (the folded span measured on the model,
   hinge plus the swung panel's root thickness, 7.65 m: A-6E -0.9%, EA-6B
   +0.8%), the panel turns 147 deg and the tips stop 3 cm either side of the
   centreline. Its top is 5.16 m up (A-6E +4.2%, EA-6B +1.8%): the side
   views' figures put the hinge about 0.3 m lower than this wing, which
   was measured off the side view at 2.5 m, sits; not resolved, the wing's
   height is left as built. The outer pylons
   sit inboard of it at y 3.45 m (the front views put the outer stores at
   about 3.5 m). Each panel is one group (skin and belly meshes), so the
   wing-tip team panels the first build carried are gone: two draw calls more
   would pass the 14-call budget.

   The Intruder fin carries a team band; the Prowler's fin pod a team ring.
   The team material is exactly C.team.

   Model space: +X nose, +Y left (port), +Z up, metres; the model is centred on X
   and the gear stands on z = ZG. Stations s are metres aft of the radome tip
   in the A-6 drawing's frame; the Prowler's plug is blended in by S().
   Nothing sticks out along X: the radome tip and the tailcone end are the
   two extremes (the probe stops behind the radome tip).
   ========================================================================= */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroA6 = (function () {
  "use strict";

  var V = null;
  var L = 16.69, DS = 0, ZG = -2.35;
  var VR = null;
  var _m4 = null, _q = null, _v = null, _u = null;

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  /* the plug of the Prowler: stations ahead of 1.0 m stay, behind 4.4 m move back by DS */
  function S(s) {
    var t = clamp((s - 1.0) / 3.4, 0, 1);
    return s + DS * t * t * (3 - 2 * t);
  }
  function X(s) { return L / 2 - S(s); }
  function Z(h) { return h + ZG; }
  function lin(tab, x) {
    var n = tab.length, i;
    if (x <= tab[0][0]) return tab[0][1];
    for (i = 1; i < n; i++) {
      if (x <= tab[i][0]) {
        var t = (x - tab[i - 1][0]) / (tab[i][0] - tab[i - 1][0]);
        return tab[i - 1][1] + t * (tab[i][1] - tab[i - 1][1]);
      }
    }
    return tab[n - 1][1];
  }

  /* ----------------------------------------------------- the airframe ---- */
  /* fuselage stations [s, half-width, belly h, top h, exponent] */
  var BODY = [
    [ 0.00, 0.05, 2.08, 2.20, 1.00],
    [ 0.35, 0.50, 1.62, 2.52, 0.90],
    [ 0.80, 0.80, 1.30, 2.80, 0.85],
    [ 1.40, 0.96, 1.15, 3.08, 0.85],
    [ 2.20, 1.04, 1.10, 3.28, 0.85],
    [ 3.20, 1.06, 1.10, 3.34, 0.85],
    [ 3.80, 1.07, 1.35, 3.44, 0.82],
    [ 4.20, 1.08, 1.55, 3.52, 0.80],
    [ 4.45, 1.20, 1.70, 3.56, 0.78],
    [ 5.50, 1.22, 1.90, 3.62, 0.75],
    [ 6.50, 1.22, 1.90, 3.52, 0.75],
    [ 8.00, 1.22, 1.90, 3.35, 0.75],
    [ 9.50, 1.12, 1.80, 3.24, 0.78],
    [11.00, 0.90, 1.78, 3.14, 0.82],
    [12.50, 0.66, 1.84, 3.04, 0.85],
    [14.00, 0.46, 2.00, 2.90, 0.88],
    [15.50, 0.30, 2.15, 2.70, 0.90],
    [16.69, 0.12, 2.30, 2.50, 1.00]
  ];
  /* canopy [s, half-width, base h, crown h] */
  var CAN = [
    [1.45, 0.12, 3.15, 3.20], [1.90, 0.62, 3.25, 3.58], [2.70, 0.85, 3.32, 3.82],
    [3.60, 0.90, 3.40, 3.84], [4.50, 0.78, 3.52, 3.78], [5.20, 0.55, 3.58, 3.68],
    [5.70, 0.25, 3.58, 3.60]
  ];
  /* wing: leading and trailing edge s against span station y; same wing on both */
  var LE = [[0.8, 4.10], [0.95, 4.40], [1.94, 5.84], [8.07, 8.92]];
  var TE = [[0.8, 10.10], [1.33, 9.45], [8.07, 10.50]];
  var WH = 2.50;
  function tcW(y) { return 0.095 - 0.035 * (y - 0.8) / 7.27; }

  var AIRFRAME = {
    a6:   { dS: 0,
            fin: { sLe0: 13.0, h0: 2.6, sLe1: 14.9, h1: 4.93, sTe1: 16.5, sTe0: 16.6, hTop: 4.93, tc: 0.085 },
            stab: { y0: 0.55, y1: 3.10, le0: 13.77, le1: 15.70, te0: 15.96, te1: 16.50, h: 2.50 },
            gear: { ns: 2.30, ms: 7.60 }, fold: { y: 3.69, deg: 147 }, tram: false },
    ea6b: { dS: 1.29,
            fin: { sLe0: 12.97, h0: 2.6, sLe1: 13.70, h1: 4.20, sTe1: 16.5, sTe0: 16.6, hTop: 4.20, tc: 0.085 },
            stab: { y0: 0.55, y1: 3.10, le0: 13.77, le1: 15.70, te0: 15.96, te1: 16.50, h: 2.50 },
            gear: { ns: 2.30, ms: 7.60 }, fold: { y: 3.69, deg: 147 }, tram: false }
  };

  /* what each row carries: [station, kind]; stations ctr (centreline), inb
     (y 2.4 m), out (y 3.7 m); inb and out may hold a port and a starboard kind */
  var VARS = {
    nato_e60_cstrike: { af: "a6", top: "#9aa0a4", belly: "#dcdcd8", tram: false,
      loads: [["ctr", "mer4"], ["inb", "mer6"], ["out", "mer6"]] },
    nato_e80_cstrike: { af: "a6", top: "#8d949a", belly: "#d8d9d6", tram: true,
      loads: [["ctr", "gbu12"], ["inb", "mer6"], ["out", "gbu12"]] },
    nato_e90_cstrike: { af: "a6", top: "#6d757b", belly: "#9aa1a6", tram: true,
      loads: [["ctr", "gbu12"], ["inb", ["harpoon", "slam"]], ["out", "gbu12"]] },
    nato_e60_ewair:   { af: "ea6b", top: "#9aa0a4", belly: "#dcdcd8", tram: false,
      loads: [["ctr", "alq99"], ["inb", "alq99"], ["out", "alq99"]] },
    nato_e90_ewair:   { af: "ea6b", top: "#6d757b", belly: "#9aa1a6", tram: false,
      loads: [["ctr", "alq99"], ["inb", "alq99"], ["out", "harm"]] }
  };
  var STA = { ctr: { y: 0, top: 1.92, sc: 7.4 }, inb: { y: 2.4, top: 2.40, sc: 7.8 }, out: { y: 3.45, top: 2.40, sc: 8.25 } };

  /* ============================================================ helpers == */
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
  function ringAt(st, N) {
    var P = [], i, a, c, s, e, y, z, ch = (st[2] + st[3]) / 2, hw = Math.max(0.02, st[1]);
    for (i = 0; i < N; i++) {
      a = i / N * Math.PI * 2; c = Math.cos(a); s = Math.sin(a);
      e = st[4];
      y = hw * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e);
      z = s >= 0 ? ch + (st[3] - ch) * Math.pow(s, e) : ch - (ch - st[2]) * Math.pow(-s, e);
      P.push([X(st[0]), y, Z(z)]);
    }
    return P;
  }
  function bridge(rings, capA, capB, open) {
    var nr = rings.length, N = rings[0].length, pos = [], idx = [], i, j;
    for (i = 0; i < nr; i++) for (j = 0; j < N; j++) pos.push(rings[i][j][0], rings[i][j][1], rings[i][j][2]);
    var lim = open ? N - 1 : N;
    for (i = 0; i < nr - 1; i++) {
      for (j = 0; j < lim; j++) {
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
  function closed(rings) { return orient(bridge(rings, true, true)); }
  function yt(f, tc) {
    return tc * (1.4845 * Math.sqrt(f) - 0.6300 * f - 1.7580 * f * f
               + 1.4215 * f * f * f - 0.5075 * f * f * f * f);
  }
  /* aerofoil ring across the wing at span station y */
  function foil(sLE, sTE, y, h, th, m, grow) {
    var p = [], i, f, g = grow || 0, pad = g ? 0.02 : 0;
    var c = sTE - sLE, tc = th / c, xl = X(sLE) + g;
    c += 2 * g;
    for (i = 0; i <= m; i++) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push([xl - f * c, y, Z(h) + yt(f, tc) * c + (i === 0 ? 0.004 : 0) + pad]);
    }
    for (i = m - 1; i >= 1; i--) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push([xl - f * c, y, Z(h) - yt(f, tc) * c - pad]);
    }
    return p;
  }
  /* the same section laid flat, for the fin: a lens in the x-y plane at height h */
  function finRing(sLE, sTE, h, tc, m) {
    var p = [], i, f, c = sTE - sLE, xl = X(sLE);
    for (i = 0; i <= m; i++) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push([xl - f * c, yt(f, tc) * c, Z(h)]);
    }
    for (i = m - 1; i >= 1; i--) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push([xl - f * c, -yt(f, tc) * c, Z(h)]);
    }
    return p;
  }
  function mirrorRings(rings) {
    return rings.map(function (r) { return r.map(function (q) { return [q[0], -q[1], q[2]]; }); });
  }
  function boxG(sx, sy, sz, x, y, z) {
    var g = new V.BoxGeometry(sx, sy, sz);
    g.translate(x, y, z);
    return g;
  }
  function rod(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var Ln = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r, r, Ln, seg || 6);
    _q.setFromUnitVectors(_u.set(0, 1, 0), _v.set(dx / Ln, dy / Ln, dz / Ln));
    _m4.makeRotationFromQuaternion(_q);
    _m4.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(_m4);
    return g;
  }
  function wheelG(r, w, x, y, z, seg) {
    var g = new V.CylinderGeometry(r, r, w, seg || 16);
    g.translate(x, y, z);
    return g;
  }
  /* body of revolution along X, centre s = sc (A-6 frame), nose forward */
  function rev(sc, y0, hc, Ln, D, nf, np, tf, N) {
    var rings = [], k, a, M = 9, n = N || 8;
    for (k = 0; k < M; k++) {
      var u = k / (M - 1), r;
      if (u < nf) r = Math.pow(Math.sin(u / nf * Math.PI / 2), np);
      else if (u > 1 - tf) r = 1 - 0.65 * (u - (1 - tf)) / tf;
      else r = 1;
      r *= D / 2;
      var x = X(sc - Ln / 2 + u * Ln), ring = [];
      for (a = 0; a < n; a++) {
        ring.push([x, y0 + r * Math.cos(a / n * Math.PI * 2), Z(hc) + r * Math.sin(a / n * Math.PI * 2)]);
      }
      rings.push(ring);
    }
    return closed(rings);
  }

  /* ============================================================ airframe = */
  function addBody(K) {
    var tab = resample(BODY, 40), rings = [], i;
    for (i = 0; i < tab.length; i++) rings.push(ringAt(tab[i], 30));
    K.paint.push({ g: closed(rings), thr: 0.35 });
    /* the intake scoops: dark mouths on the faces the body steps out to */
    var mh = 2.62, sx = 4.42;
    K.ink.push(boxG(0.06, 0.34, 0.96, X(sx), 1.17, Z(mh)));
    K.ink.push(boxG(0.06, 0.34, 0.96, X(sx), -1.17, Z(mh)));
  }

  function canAt(s) {
    var i, t;
    for (i = 1; i < CAN.length; i++) {
      if (s <= CAN[i][0]) {
        t = (s - CAN[i - 1][0]) / (CAN[i][0] - CAN[i - 1][0]);
        return [s, CAN[i - 1][1] + t * (CAN[i][1] - CAN[i - 1][1]), CAN[i - 1][2] + t * (CAN[i][2] - CAN[i - 1][2]),
                CAN[i - 1][3] + t * (CAN[i][3] - CAN[i - 1][3])];
      }
    }
    return CAN[CAN.length - 1];
  }
  function archPts(c, n) {
    var P = [], k, a;
    for (k = 0; k <= n; k++) {
      a = k / n * Math.PI;
      P.push([X(c[0]), c[1] * Math.cos(a), Z(c[2] + (c[3] - c[2]) * Math.pow(Math.sin(a), 0.8))]);
    }
    return P;
  }
  function addCanopy(K, ea) {
    var tab = resample(CAN, 18), rings = [], i, k;
    for (i = 0; i < tab.length; i++) rings.push(archPts(tab[i], 14));
    K.glass.push(bridge(rings, false, false, true));
    /* centre rail and cross bows */
    for (i = 1; i < CAN.length; i++) {
      K.ink.push(rod([X(CAN[i - 1][0]), 0, Z(CAN[i - 1][3] + 0.015)], [X(CAN[i][0]), 0, Z(CAN[i][3] + 0.015)], 0.028, 5));
    }
    var bows = ea ? [2.10, 3.70, 4.75] : [2.10, 4.85];
    bows.forEach(function (s) {
      var P = archPts(canAt(s), 8);
      for (k = 1; k < P.length; k++) K.ink.push(rod(P[k - 1], P[k], 0.026, 5));
    });
    /* the crew: heads and shoulders under the glass */
    var rows = ea ? [2.75, 4.30] : [3.00];
    rows.forEach(function (s) {
      var c = canAt(s);
      [0.40, -0.40].forEach(function (y) {
        K.ink.push(boxG(0.50, 0.42, 0.50, X(s), y, Z(c[2] + 0.18)));
      });
    });
    /* the refuelling probe stands ahead of the windscreen on the nose */
    K.metal.push(rod([X(1.70), 0, Z(3.40)], [X(0.70), 0, Z(3.02)], 0.04, 6));
    K.metal.push(rod([X(0.70), 0, Z(3.02)], [X(0.66), 0, Z(3.01)], 0.07, 6));
  }

  function wingRing(y, grow, m) {
    var sl = lin(LE, y), st = lin(TE, y), c = st - sl;
    return foil(sl, st, y, WH, c * tcW(y), m, grow);
  }
  /* the inner wing to the fold hinge, and the outer panels (port, starboard)
     for their fold groups; returns the hinge [y, z] (upper skin at the hinge) */
  function addWings(K, AFD) {
    var yh = AFD.fold.y, i, m = 14;
    var ysIn = [0.8, 1.4, 1.94, 3.2, yh], ysOut = [yh, 4.8, 6.2, 7.3, 8.07], rin = [], rout = [];
    for (i = 0; i < ysIn.length; i++) rin.push(wingRing(ysIn[i], 0, m));
    for (i = 0; i < ysOut.length; i++) rout.push(wingRing(ysOut[i], 0, m));
    K.paint.push({ g: closed(rin), thr: 0.0 });
    K.paint.push({ g: closed(mirrorRings(rin)), thr: 0.0 });
    K.foldP.push({ g: closed(rout), thr: 0.0 });
    K.foldS.push({ g: closed(mirrorRings(rout)), thr: 0.0 });
    /* fold line, a dark seam across the top of the inner wing at the hinge */
    var f0 = lin(LE, yh), f1 = lin(TE, yh), th = (f1 - f0) * tcW(yh);
    K.ink.push(rod([X(f0 + 0.35), yh - 0.02, Z(WH + th / 2 - 0.004)], [X(f1 - 0.35), yh - 0.02, Z(WH + th / 2 - 0.004)], 0.012, 4));
    K.ink.push(rod([X(f0 + 0.35), -yh + 0.02, Z(WH + th / 2 - 0.004)], [X(f1 - 0.35), -yh + 0.02, Z(WH + th / 2 - 0.004)], 0.012, 4));
    return [yh, Z(WH + th / 2)];
  }
  /* one outer panel as a "wingfold" group: origin on the hinge line, the
     panel inside it, and the turn about the hinge that folds it (port up
     about +X, starboard about +X the other way); js/render3d.js applies it */
  function foldGroup(items, mats, side, hinge, deg) {
    var g = new V.Group(), top = paintMerge(items, false), belly = paintMerge(items, true);
    g.name = "wingfold";
    g.position.set(0, side * hinge[0], hinge[1]);
    g.userData.fold = { axis: [1, 0, 0], angle: side * deg * Math.PI / 180 };
    if (top) { top.translate(0, -side * hinge[0], -hinge[1]); g.add(new V.Mesh(top, mats.skin)); }
    if (belly) { belly.translate(0, -side * hinge[0], -hinge[1]); g.add(new V.Mesh(belly, mats.belly)); }
    return g;
  }

  function addTails(K, AFD, ea) {
    var F = AFD.fin, i, rings = [], hs = [2.45, 3.0, 3.5, 4.0, F.hTop];
    hs = hs.filter(function (h, k) { return k === 0 || h < F.hTop - 0.01; }).concat([F.hTop]);
    function sle(h) { return F.sLe0 + (h - F.h0) * (F.sLe1 - F.sLe0) / (F.h1 - F.h0); }
    function ste(h) { return F.sTe0 + (h - F.h0) * (F.sTe1 - F.sTe0) / (F.h1 - F.h0); }
    for (i = 0; i < hs.length; i++) {
      var a = sle(hs[i]), b = ste(hs[i]);
      rings.push(finRing(a, b, hs[i], F.tc, 10));
    }
    K.paint.push({ g: closed(rings), thr: -2 });
    if (!ea) {
      /* the fin carries the squadron band: team colour over the upper fin */
      var tr = [], hh = [4.30, 4.62, 4.93];
      for (i = 0; i < hh.length; i++) {
        var a2 = sle(hh[i]), b2 = ste(hh[i]), r = finRing(a2, b2, hh[i], F.tc, 8);
        r = r.map(function (q) { return [q[0], q[1] * 1.12 + (q[1] >= 0 ? 0.012 : -0.012), q[2]]; });
        tr.push(r);
      }
      K.team.push(closed(tr));
    } else {
      /* the receiver pod on top of the fin: 2.8 m long, 0.9 m across */
      var pod = [[13.70, 0.10, 0.14], [14.00, 0.36, 0.36], [14.60, 0.45, 0.43], [15.60, 0.46, 0.43],
                 [16.30, 0.44, 0.40], [16.62, 0.30, 0.26]], pr = [], k, a3, n = 18;
      var ph = resample(pod, 16);
      for (k = 0; k < ph.length; k++) {
        var ring = [], hc = 4.54;
        for (a3 = 0; a3 < n; a3++) {
          ring.push([X(ph[k][0]), ph[k][1] * Math.cos(a3 / n * Math.PI * 2),
                     Z(hc + ph[k][2] * Math.sin(a3 / n * Math.PI * 2) * 1.0)]);
        }
        pr.push(ring);
      }
      K.paint.push({ g: closed(pr), thr: -2 });
      /* the team ring around the pod and the dark dielectric strips along its sides */
      var tr2 = [], sring = [15.05, 15.25, 15.45];
      sring.forEach(function (s) {
        var ring = [], hc = 4.54, w = lin(pod.map(function (r2) { return [r2[0], r2[1]]; }), s) + 0.012,
            hh2 = lin(pod.map(function (r2) { return [r2[0], r2[2]]; }), s) + 0.012;
        for (a3 = 0; a3 < n; a3++) {
          ring.push([X(s), w * Math.cos(a3 / n * Math.PI * 2), Z(hc + hh2 * Math.sin(a3 / n * Math.PI * 2))]);
        }
        tr2.push(ring);
      });
      K.team.push(closed(tr2));
      K.ink.push(boxG(1.7, 0.02, 0.18, X(15.5), 0.455, Z(4.52)));
      K.ink.push(boxG(1.7, 0.02, 0.18, X(15.5), -0.455, Z(4.52)));
    }
    /* stabilators */
    var T = AFD.stab, ys = [T.y0, 1.2, 2.0, T.y1], sr = [];
    for (i = 0; i < ys.length; i++) {
      var t = (ys[i] - T.y0) / (T.y1 - T.y0);
      var sl = T.le0 + t * (T.le1 - T.le0), st = T.te0 + t * (T.te1 - T.te0);
      sr.push(foil(sl, st, ys[i], T.h, (st - sl) * 0.06, 9, 0));
    }
    K.paint.push({ g: closed(sr), thr: 0.0 });
    K.paint.push({ g: closed(mirrorRings(sr)), thr: 0.0 });
  }

  function addNozzles(K) {
    /* the two J52 exhausts, angled slightly down, under the wing trailing edge */
    [0.80, -0.80].forEach(function (y) {
      var g = new V.CylinderGeometry(0.43, 0.30, 1.7, 14, 1, true);
      g.rotateZ(-Math.PI / 2);
      g.rotateY(0.14);
      g.translate(X(9.75), y, Z(1.92));
      K.metal.push(g);
      var d = new V.CircleGeometry(0.29, 12);
      d.rotateY(-Math.PI / 2);
      d.translate(X(10.58), y, Z(1.90));
      K.ink.push(d);
    });
  }

  /* --------------------------------------------------------- stores ---- */
  function addFins(K, sc, y, hc, Ln, D, span) {
    var s = sc + Ln / 2 - 0.35;
    K.ord.push(boxG(0.5, span, 0.02, X(s), y, Z(hc)));
    K.ord.push(boxG(0.5, 0.02, span, X(s), y, Z(hc)));
  }
  function addBomb(K, sc, y, hc, Ln, D, kind) {
    K.ord.push(rev(sc, y, hc, Ln, D, kind === "mk82" ? 0.20 : 0.28, kind === "mk82" ? 0.55 : 0.60, 0.22, 7));
  }
  function addStore(K, st, kind, side) {
    var y = STA[st].y * side, top = STA[st].top, sc = STA[st].sc, p = 0.18, hc, i, j;
    if (st === "ctr" && side < 0) return;
    if (kind === "mer6" || kind === "mer4") {
      var by = top - p - 0.13;
      K.metal.push(boxG(0.16, 0.12, p + 0.02, X(sc), y, Z(top - p / 2)));
      K.metal.push(boxG(1.9, 0.44, 0.26, X(sc), y, Z(by)));
      var rows = kind === "mer6" ? 3 : 2;
      for (i = 0; i < rows; i++) {
        for (j = -1; j <= 1; j += 2) {
          addBomb(K, sc + (i === 1 ? 0.0 : 0.0), y + j * 0.17, by - 0.26 - i * 0.28, 2.20, 0.274, "mk82");
        }
      }
      return;
    }
    var T = { gbu12: [3.33, 0.273, 0.25, 0.60, 0.22, "ord", 0.52], harpoon: [3.84, 0.343, 0.18, 0.80, 0.08, "store", 0.62],
              slam: [4.37, 0.343, 0.18, 0.80, 0.08, "store", 0.62], alq99: [4.60, 0.66, 0.16, 0.65, 0.20, "store", 0],
              harm: [4.17, 0.254, 0.20, 0.80, 0.06, "store", 0.60] }[kind];
    hc = top - p - T[1] / 2;
    K.metal.push(boxG(1.2, 0.10, p + 0.02, X(sc), y, Z(top - p / 2)));
    K[T[5]].push(rev(sc, y, hc, T[0], T[1], T[2], T[3], T[4], kind === "alq99" ? 12 : 8));
    if (T[6]) addFins(K, sc, y, hc, T[0], T[1], T[6]);
    if (kind === "alq99") {
      var d = new V.CircleGeometry(0.2, 10);
      d.rotateY(Math.PI / 2);
      d.translate(X(sc - T[0] / 2) - 0.01, y, Z(hc));
      K.ink.push(d);
      /* the ram-air turbine ring and a mid-pod band */
      K.metal.push(rev(sc - T[0] / 2 + 0.35, y, hc, 0.30, 0.52, 0.5, 1.0, 0.5, 10));
    }
  }
  function addLoads(K, loads) {
    loads.forEach(function (l) {
      var st = l[0], kind = l[1];
      if (st === "ctr") { addStore(K, st, kind, 1); return; }
      if (kind instanceof Array) { addStore(K, st, kind[0], 1); addStore(K, st, kind[1], -1); }
      else { addStore(K, st, kind, 1); addStore(K, st, kind, -1); }
    });
  }
  function addTram(K) {
    var g = new V.SphereGeometry(0.30, 14, 10);
    g.translate(X(1.55), 0, Z(1.02));
    K.store.push(g);
    var w = new V.CircleGeometry(0.17, 10);
    w.rotateY(Math.PI / 2);
    w.translate(X(1.55) + 0.28, 0, Z(0.98));
    K.ink.push(w);
  }

  function addGear(G, AFD) {
    var ns = AFD.gear.ns, ms = AFD.gear.ms, tr = 1.65, nr = 0.254, mr = 0.457, k;
    /* nose gear: leg, drag brace, twin wheels */
    G.metal.push(rod([X(ns), 0, Z(1.15)], [X(ns + 0.12), 0, Z(nr)], 0.075, 8));
    G.metal.push(rod([X(ns + 0.9), 0, Z(1.25)], [X(ns + 0.08), 0, Z(0.62)], 0.04, 6));
    G.metal.push(rod([X(ns + 0.12), -0.17, Z(nr)], [X(ns + 0.12), 0.17, Z(nr)], 0.04, 6));
    G.metal.push(boxG(0.7, 0.04, 0.5, X(ns + 0.95), 0.0, Z(1.05)));
    [0.17, -0.17].forEach(function (y) { G.tyre.push(wheelG(nr, 0.14, X(ns + 0.12), y, Z(nr), 14)); });
    /* main gear: stub leg, brace, a single wide wheel each side on a short fairing */
    [tr, -tr].forEach(function (y) {
      var sg = y > 0 ? 1 : -1;
      G.metal.push(rod([X(ms - 0.15), y * 0.82, Z(2.12)], [X(ms), y, Z(mr)], 0.09, 8));
      G.metal.push(rod([X(ms - 1.2), y * 0.72, Z(2.0)], [X(ms - 0.05), y * 0.98, Z(0.8)], 0.045, 6));
      G.metal.push(boxG(1.05, 0.10, 0.74, X(ms - 0.1), sg * (Math.abs(y) - 0.20), Z(1.05)));
      G.tyre.push(wheelG(mr, 0.30, X(ms), y, Z(mr), 20));
      G.metal.push(wheelG(mr * 0.55, 0.34, X(ms), y, Z(mr), 12));
    });
  }

  /* ============================================================= build == */
  function paintMerge(items, pick) {
    var pos = [], nor = [], i, t, j;
    items.forEach(function (it) {
      var g = it.g.toNonIndexed(), p = g.attributes.position.array, n = g.attributes.normal.array;
      for (t = 0; t < p.length; t += 9) {
        var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
        var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
        var cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
        var len = Math.sqrt(cx * cx + cy * cy + cz * cz) || 1;
        var below = cz / len < it.thr;
        if (below === pick) for (j = 0; j < 9; j++) { pos.push(p[t + j]); nor.push(n[t + j]); }
      }
    });
    if (!pos.length) return null;
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(new Float32Array(pos.length / 3 * 2), 2));
    return out;
  }
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
      parent.add(new V.Mesh(merge(lists[key]), mats[key]));
    }
  }

  function makeMats(C, vr) {
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: new V.Color(vr.top), roughness: 0.82, metalness: 0.08, side: V.DoubleSide });
    m.belly = new V.MeshStandardMaterial({ color: new V.Color(vr.belly), roughness: 0.82, metalness: 0.06, side: V.DoubleSide });
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60, side: V.DoubleSide });
    m.ink = new V.MeshStandardMaterial({ color: 0x060708, roughness: 0.95, metalness: 0.03, side: V.DoubleSide });
    m.tyre = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.store = new V.MeshStandardMaterial({ color: 0xaeb4b7, roughness: 0.62, metalness: 0.12 });
    m.ord = new V.MeshStandardMaterial({ color: 0x59604c, roughness: 0.74, metalness: 0.14 });
    m.glass = new V.MeshStandardMaterial({ color: 0x4a5a58, roughness: 0.12, metalness: 0.55,
                                           transparent: true, opacity: 0.80, side: V.DoubleSide });
    return m;
  }

  function build(THREE, M, C, key) {
    V = THREE;
    VR = VARS[key];
    var AFD = AIRFRAME[VR.af], ea = VR.af === "ea6b";
    DS = AFD.dS; L = 16.69 + DS;
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    var K = { paint: [], team: [], metal: [], ink: [], store: [], ord: [], glass: [], foldP: [], foldS: [] };
    var G = { metal: [], tyre: [] };
    addBody(K);
    addCanopy(K, ea);
    var hinge = addWings(K, AFD);
    addTails(K, AFD, ea);
    addNozzles(K);
    addLoads(K, VR.loads);
    if (VR.tram) addTram(K);
    addGear(G, AFD);

    var mats = makeMats(C, VR);
    var root = new V.Group();
    var top = paintMerge(K.paint, false), belly = paintMerge(K.paint, true);
    if (top) root.add(new V.Mesh(top, mats.skin));
    if (belly) root.add(new V.Mesh(belly, mats.belly));
    emit(root, K, mats, ["team", "ink", "metal", "store", "ord", "glass"]);
    root.add(foldGroup(K.foldP, mats, 1, hinge, AFD.fold.deg));
    root.add(foldGroup(K.foldS, mats, -1, hinge, AFD.fold.deg));
    var gear = new V.Group();
    gear.name = "gear";
    emit(gear, G, mats, ["metal", "tyre"]);
    root.add(gear);
    return root;
  }

  return { build: build };
})();

/* len is the measured X extent: radome tip to the tail cone's end (the fin,
   its pod and the stabilators all stop forward of it). */
UNIT_MODELS["nato_e60_cstrike"] = {
  len: 16.69,
  build: function (THREE, M, C) { return HeroA6.build(THREE, M, C, "nato_e60_cstrike"); }
};
UNIT_MODELS["nato_e80_cstrike"] = {
  len: 16.69,
  build: function (THREE, M, C) { return HeroA6.build(THREE, M, C, "nato_e80_cstrike"); }
};
UNIT_MODELS["nato_e90_cstrike"] = {
  len: 16.69,
  build: function (THREE, M, C) { return HeroA6.build(THREE, M, C, "nato_e90_cstrike"); }
};
UNIT_MODELS["nato_e60_ewair"] = {
  len: 17.98,
  build: function (THREE, M, C) { return HeroA6.build(THREE, M, C, "nato_e60_ewair"); }
};
UNIT_MODELS["nato_e90_ewair"] = {
  len: 17.98,
  build: function (THREE, M, C) { return HeroA6.build(THREE, M, C, "nato_e90_ewair"); }
};
