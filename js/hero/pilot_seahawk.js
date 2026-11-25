/* ======================= js/hero/pilot_seahawk.js ========================
   gbr_e50_cfighter -- Hawker Sea Hawk FGA.6, rebuilt through the hero
   pipeline (SPEC -> BUILD -> GATE -> RENDER -> REVIEW) on js/hero_kit.js.

   SPEC      tools/model3d/specs/gbr_e50_cfighter.json
   REPLACES  HeroEuNavalAir.seaHawk (js/hero/eu_naval_air.js), which this
             file overrides by loading after it.  Nothing of it is reused:
             it has no plain option to call and its tables are re-measured
             here at the corrected scale (below).

   REFERENCES (tools/model3d/specs/ref/gbr_e50_cfighter/)
     [D1] Wikimedia Commons "Hawker Sea Hawk 3-view line drawing.svg",
          1920 px render: side, plan and head-on on ONE sheet.  Every table
          below is in that sheet's pixels: side (col, row), plan (col, row).
     [P1] Wikimedia Commons "Hawker Sea Hawk FGA.6 WV828 AWk Hurn 15.07.67
          edited-3.jpg": two machines head-on with wings folded - the sit
          on the long nose leg, the nose leg's fork and the plate on its
          front, the intake mouths, the dark coat down the fuselage side.

   SCALE     104.0 px/m: the published span 39 ft 0 in (11.89 m) over the
             plan's 1236.5 px (rows 399-1635; the head-on view agrees).
             Second dimension: nose (col 38) to the hook's beak (col 1310)
             is 12.23 m against the published 39 ft 8 in (12.09 m), +1.2 %.
             (The file this replaces took 103.4 px/m from a 1229 px span.)
   DATUM     xd = (660 - col) / 104, zd = (407 - row) / 104,
             y = (1017 - plan row) / 104.  Row 407 is the nose wheel's
             contact, the lowest point of the drawing.
   ATTITUDE  [D1] draws the wheels as two rings with a ground stroke under
             each: nose contact (162, 407), main contact (579, 378).  The
             datum therefore stands 3.98 deg nose-up on its wheels, which is
             how [P1] shows the type sitting.  The airframe is built level
             in the datum (so the paint sheet's bands lie square on it) and
             the finished model is turned 3.98 deg about the main wheels'
             contact.  Nothing is fitted: the height comes out 2.73 m
             against the published 8 ft 8 in (2.64 m), whose attitude and
             oleo compression are not stated.
   MEASURED  12.23 m long on its wheels (nose to hook), 11.89 m span,
             2.73 m high.

   RECOGNITION (the spec's must_show)
     - wing-root intakes: a triangular mouth in the leading edge of each
       thick root fairing, tall at the fuselage, a point at y 1.5 m
     - the bifurcated jet pipe: a round exhaust each side at the root's
       trailing edge and a wedge fairing aft of it; a plain pointed tail
     - straight tapered mid wing, 5 deg dihedral, rounded tips
     - tailplane part-way up the fin with a bullet ahead of the fin
     - bubble canopy over the nose, a solid fairing behind the hood
     - tricycle gear, sting hook under the tail, four cannon troughs under
       the nose, pitot on the port tip, mast and whip on the spine
   PAINT     plain: Extra Dark Sea Grey above, Sky below, no roundels, no
             codes.  Team colour: a band across the fin and a chordwise
             strip near each wing tip.
   NOT CONFIRMED
     - the side of the leg each main wheel sits; legs, braces and doors are
       schematic.  (Track: 2.33 m, from the wheels ghosted in [D1]'s
       head-on view, sheet rows 896 and 1138.)
     - the height of the grey / Sky line on the fuselage side
     - wing incidence and twist (zero here); the sections are NACA 00xx
       thickness forms at the depth measured off the head-on view
     - the fuselage's section aft of the wing (ellipses between the plan's
       width and the side's depth)
     - the inside of the intakes and of the jet pipes
   NO WINGFOLD  the model this replaces has no "wingfold" groups and
             tools/jsc/wingfold_check.js (rule 2) allows them only on the
             types in its own table; the fold joint is a seam at y 1.55 m.
   NODES     "gear" (hidden in flight).
   DRAW CALLS  skin, dull, metal, glass, lamp, team + gear: dull, metal.
   MODEL SPACE  +X nose, +Y port, +Z up, metres, wheels on z = 0.
   LOAD AFTER   js/hero_kit.js and js/hero/eu_naval_air.js.   ASCII only.
========================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPilotSeaHawk = (function () {
  "use strict";
  var PI = Math.PI, PXM = 104.0;
  function X(c) { return (660 - c) / PXM; }          /* side / plan column -> datum x */
  function Z(r) { return (407 - r) / PXM; }          /* side row -> datum z */
  var MAIN = [X(579), Z(378)], NOSE = [X(162), Z(407)];   /* the two wheel contacts [D1] */
  var SIT = Math.atan2(MAIN[1] - NOSE[1], NOSE[0] - MAIN[0]);
  var LEN = 12.23;

  /* ---- colours (sRGB) */
  var EDSG = 0x363c42, EDSG_A = 0x40474d, EDSG_B = 0x2c3237, EDSG_C = 0x4a5158;   /* Extra Dark Sea Grey, three panel shades */
  var SKY = 0x9eac92, SKY_A = 0xa9b69d, SKY_B = 0x919f86;                         /* Sky */

  /* ================================================================ TABLES
     FUSELAGE [D1]: side column, top row, bottom row, plan half width (px).
     Under the hood (cols 140-380) the top is the centre line of the decking
     between the canopy rails (rail rows 212-184), not a drawn line.  Aft of
     col 700 the wing root and its fairing hide the side in the plan: the
     widths there run fair from 77 px to the first clear one (36.5 at 940). */
  var FUS = [
    [38, 257, 257, 0], [39.5, 252.5, 261.5, 4.5], [42, 249, 265, 8.5], [46, 246, 268, 11.5], [50, 243, 271, 14],
    [60, 237, 277, 19.5], [80, 228, 285, 28], [100, 221, 291, 35.5], [120, 215, 297, 41.5], [140, 209, 303, 46.5],
    [160, 206.5, 308, 51], [180, 204.5, 312, 55], [200, 202.5, 315, 58], [240, 197.5, 320, 63], [280, 191, 325, 67],
    [320, 185.5, 328, 70], [360, 182, 330, 73], [400, 182, 333, 77], [450, 181, 333, 77], [500, 180, 334, 77],
    [560, 181, 334, 76], [620, 181, 332, 74], [680, 181, 329, 69], [740, 182, 325, 61], [800, 184, 320, 53],
    [860, 186, 313, 46], [920, 189, 305, 40], [960, 191, 300, 34], [1000, 192, 294, 29], [1040, 193.5, 288, 24],
    [1080, 196, 281.5, 19], [1100, 198, 278, 17], [1120, 200, 263, 15], [1140, 202, 257, 13.5], [1200, 211, 250, 8],
    [1240, 221, 240, 4.5], [1262, 229, 233, 2]
  ];
  /* panel breaks drawn on [D1]'s side view (columns) */
  var FRAMES = [112, 380, 462, 565, 651, 811, 1006, 1093];

  /* WING [D1] plan: y (m), leading-edge col, trailing-edge col, depth /
     chord (head-on view: 0.75 m deep at y 0.74, 0.28 at 1.61, 0.115 at
     5.74), how much of the section's nose the intake mouth cuts off, and
     the half depth of the root fairing's blunt aft end round the jet pipe
     (side view, col 802: rows 233-282, 0.47 m).
     Inboard of y 1.55 it is the root fairing with the intake in its
     leading edge and the jet pipe in its trailing edge.                  */
  var WING = [
    [0.55, 396, 806, 0.200, 0.024, 0.235], [0.75, 400.5, 805, 0.193, 0.024, 0.235],
    [0.90, 411, 802, 0.163, 0.018, 0.235], [1.00, 417.5, 795, 0.150, 0.014, 0.21], [1.10, 424.5, 770, 0.142, 0.011, 0.03],
    [1.20, 431, 754.5, 0.133, 0.008], [1.35, 441.5, 742, 0.121, 0.004],
    [1.50, 448, 735.5, 0.108, 0], [1.55, 450.5, 734, 0.105, 0], [2.00, 458, 723, 0.096, 0],
    [3.00, 470, 698, 0.095, 0], [3.30, 473.6, 690.5, 0.095, 0], [4.00, 482, 673, 0.093, 0],
    [5.00, 495, 647.5, 0.095, 0], [5.50, 501, 635, 0.095, 0], [5.60, 502, 632.5, 0.095, 0],
    [5.70, 504, 630, 0.095, 0], [5.82, 510.5, 627, 0.095, 0], [5.90, 520, 620, 0.09, 0],
    [5.93, 529, 606, 0.08, 0], [5.943, 547, 587, 0.06, 0]
  ];
  var WING_U = [0, 0.005, 0.02, 0.055, 0.12, 0.22, 0.35, 0.5, 0.64, 0.76, 0.88, 1], WING_HINGE = 9;   /* flap / aileron hinge at 76 % */
  var Y_FOLD = 1.55, Y_SPLIT = 3.3, Y_AIL = 5.6;
  var DIHEDRAL = 0.0873;                               /* 5.0 deg: head-on view, the chord plane, rows 420-850 */
  function wingZ(y) { return Z(255) + DIHEDRAL * Math.max(0, y - 0.75) - 0.03 * Math.min(1, Math.max(0, y - 1.0)); }   /* 3 cm down outboard: the head-on view's mid-thickness */

  /* TAILPLANE [D1] plan, on the fin at side row 150 */
  var STAB = [[0, 1099, 1227, 0.09, 0], [0.2, 1101, 1225, 0.09, 0], [1.0, 1111, 1215, 0.09, 0], [1.8, 1123, 1205, 0.09, 0],
              [1.9, 1127, 1203.5, 0.09, 0], [1.96, 1134, 1200, 0.085, 0], [1.99, 1142, 1195, 0.075, 0], [2.005, 1154, 1186, 0.06, 0]];
  var STAB_U = [0, 0.01, 0.04, 0.11, 0.24, 0.42, 0.58, 0.69, 0.85, 1], STAB_HINGE = 7;                 /* elevator hinge: col 1184 */

  /* FIN [D1] side: row, leading-edge col, trailing-edge col, depth / chord.
     Rows 190-170 are the dorsal fillet; below row 196 it is inside the
     fuselage; the rudder runs down to the tail cone.                     */
  var FIN = [
    [238, 1160, 1240, 0.05], [228, 1110, 1261, 0.05], [215, 1060, 1264, 0.05], [200, 1012, 1264, 0.05], [190, 1024, 1263, 0.052],
    [185, 1040, 1262.5, 0.055], [180, 1053, 1262, 0.06], [175, 1061, 1261.5, 0.065], [170, 1068, 1261, 0.07], [160, 1082, 1260, 0.08],
    [150, 1088, 1258, 0.085], [140, 1093, 1257, 0.09], [130, 1099, 1255, 0.09], [120, 1105, 1253, 0.09], [110, 1113, 1251, 0.09],
    [100, 1121, 1247, 0.09], [90, 1130, 1243, 0.09], [80, 1140, 1238, 0.09], [70, 1152, 1232, 0.09], [60, 1166, 1223, 0.09],
    [56, 1173, 1217, 0.09], [52, 1183, 1208, 0.085], [50, 1191, 1200, 0.07]
  ];
  var RUDDER = 1198;                                   /* hinge column */

  /* CANOPY [D1]: side col, top row, half width (m; plan rows 975-1059).
     Glazing to col 330, the solid fairing behind it to col 384.          */
  var HOOD = [[139, 210, 0], [150, 201, 0.17], [165, 190.5, 0.28], [180, 180, 0.34], [198, 169, 0.385], [220, 161, 0.41],
              [245, 158, 0.42], [270, 157, 0.42], [295, 158.5, 0.41], [315, 162.5, 0.385], [330, 167, 0.35]];

  /* ============================================================== HELPERS */
  function sgp(v, e) { return v < 0 ? -Math.pow(-v, e) : Math.pow(v, e); }
  /* NACA 00xx half thickness / chord at chord share u (closed trailing edge) */
  function foilT(t, u) { return t * (1.4845 * Math.sqrt(u) - 0.63 * u - 1.758 * u * u + 1.4215 * u * u * u - 0.518 * u * u * u * u); }

  /* skin(rings, penOf, o): a smooth skin through closed rings like the
     kit's loft, but with the pen chosen per face - penOf(i, k) for the band
     between ring i and i + 1 and the segment from point k to k + 1 (null
     leaves the face open).  That is what a two-colour scheme needs: the
     kit's loft / loftBody / aerofoil take ONE pen.                       */
  function skin(V, rings, penOf, o) {
    o = o || {};
    var R = rings.length, n = rings[0].length, i, k, j, cent = [], N = [], F = [];
    for (i = 0; i < R; i++) {
      var c = [0, 0, 0], row = [];
      for (k = 0; k < n; k++) { c[0] += rings[i][k][0] / n; c[1] += rings[i][k][1] / n; c[2] += rings[i][k][2] / n; row.push([0, 0, 0]); }
      cent.push(c); N.push(row);
    }
    function face(a, b, c2, mc, pen) {
      var A = rings[a[0]][a[1]], B = rings[b[0]][b[1]], C = rings[c2[0]][c2[1]], f = V.cross(V.sub(B, A), V.sub(C, A));
      if (V.dot(f, f) < 1.7e-11) return;
      var m = [(A[0] + B[0] + C[0]) / 3 - mc[0], (A[1] + B[1] + C[1]) / 3 - mc[1], (A[2] + B[2] + C[2]) / 3 - mc[2]];
      if (V.dot(f, m) < 0) { var t = b; b = c2; c2 = t; f = [-f[0], -f[1], -f[2]]; }
      [a, b, c2].forEach(function (q) { var v = N[q[0]][q[1]]; v[0] += f[0]; v[1] += f[1]; v[2] += f[2]; });
      F.push([a, b, c2, pen]);
    }
    for (i = 0; i + 1 < R; i++) {
      var mc = V.mix(cent[i], cent[i + 1], 0.5);
      for (k = 0; k < n; k++) {
        var pen = penOf(i, k);
        if (!pen) continue;
        j = (k + 1) % n;
        face([i, k], [i, j], [i + 1, j], mc, pen); face([i, k], [i + 1, j], [i + 1, k], mc, pen);
      }
    }
    F.forEach(function (q) {
      q[3].tri(rings[q[0][0]][q[0][1]], rings[q[1][0]][q[1][1]], rings[q[2][0]][q[2][1]],
               V.unit(N[q[0][0]][q[0][1]]), V.unit(N[q[1][0]][q[1][1]]), V.unit(N[q[2][0]][q[2][1]]));
    });
    if (o.cap) {                                        /* close the last ring with a fan */
      var ring = rings[R - 1], cc = cent[R - 1], od = V.sub(cc, cent[R - 2]);
      for (k = 0; k < n; k++) {
        var a = ring[k], b = ring[(k + 1) % n], f = V.cross(V.sub(a, cc), V.sub(b, cc));
        if (V.dot(f, f) < 1.7e-11) continue;
        if (V.dot(f, od) < 0) o.cap.tri(cc, b, a); else o.cap.tri(cc, a, b);
      }
    }
  }

  /* the fuselage as a function: sec(x), pt(x, a, push), nrm, hoop, line -
     the same accessors the kit's loftBody returns                        */
  function bodyOf(K) {
    var V = HeroKit.vec, rows = FUS.map(function (q) {
      var top = Z(q[1]), bot = Z(q[2]);
      return [X(q[0]), q[3] / PXM, top, bot, (top + bot) / 2];
    }).sort(function (a, b) { return a[0] - b[0]; });
    function sec(x) { var v = HeroKit.tab(rows, x); return { x: x, w: Math.max(0, v[0]), top: v[1], bot: Math.min(v[2], v[1]), zw: v[3] }; }
    function at(q, a) {
      var c = Math.cos(a), s = Math.sin(a);
      return [q.x, q.w * c, s >= 0 ? q.zw + (q.top - q.zw) * s : q.zw + (q.zw - q.bot) * s];
    }
    var B = {
      x0: rows[0][0], x1: rows[rows.length - 1][0], sec: sec,
      pt: function (x, a, push) { var p = at(sec(x), a); return push ? V.add(p, B.nrm(x, a), push) : p; },
      nrm: function (x, a) {
        var q = sec(x), p0 = at(q, a - 0.02), p1 = at(q, a + 0.02), t = V.sub(p1, p0), nn = [0, t[2], -t[1]];
        return V.dot(nn, nn) < 1e-12 ? [0, Math.cos(a), Math.sin(a)] : V.unit(nn);
      },
      hoop: function (x, a0, a1, m) {
        var pts = [], nr = [], k;
        for (k = 0; k <= m; k++) { var a = a0 + (a1 - a0) * k / m; pts.push(B.pt(x, a)); nr.push(B.nrm(x, a)); }
        return { pts: pts, nrm: nr };
      },
      line: function (a, xa, xb, m) {
        var pts = [], nr = [], k;
        for (k = 0; k <= m; k++) { var x = xa + (xb - xa) * k / m; pts.push(B.pt(x, a)); nr.push(B.nrm(x, a)); }
        return { pts: pts, nrm: nr };
      },
      /* z of the skin at half width y on the upper half (the canopy's sill) */
      botAt: function (x, y) { var q = sec(x), r = Math.min(0.999, Math.abs(y) / Math.max(q.w, 1e-6)); return q.zw - (q.zw - q.bot) * Math.sqrt(1 - r * r); },
      topAt: function (x, y) { var q = sec(x), r = Math.min(0.999, Math.abs(y) / Math.max(q.w, 1e-6)); return q.zw + (q.top - q.zw) * Math.sqrt(1 - r * r); }
    };
    return B;
  }

  /* a lifting surface from a planform table [y, le col, te col, t, cut]:
     at(y, u, surf, side) is the skin at chord share u from the DRAWN
     leading edge (the intake's lip where the nose of the section is cut
     off), surf +1 above / -1 below                                        */
  function surfaceOf(rows, zOf) {
    var tb = rows.map(function (r) { return [r[0], X(r[1]), (r[2] - r[1]) / PXM, r[3], r[4], r[5] || 0]; });
    function sec(y) { var v = HeroKit.lin(tb, y); return { le: v[0], c: v[1], t: v[2], cut: v[3], aft: v[4], z: zOf(y) }; }
    return {
      y0: tb[0][0], y1: tb[tb.length - 1][0], ys: tb.map(function (r) { return r[0]; }), sec: sec,
      at: function (y, u, surf, side) {
        var q = sec(y), cv = q.c / (1 - q.cut), uu = q.cut + (1 - q.cut) * u;
        return [q.le - u * q.c, (side || 1) * y, q.z + (surf < 0 ? -1 : 1) * (foilT(q.t, uu) * cv + q.aft * u * u * u)];
      },
      ring: function (y, U, side) {
        var out = [], m, K2 = U.length - 1;
        for (m = 0; m <= K2; m++) out.push(this.at(y, U[m], 1, side));
        for (m = K2; m >= 0; m--) out.push(this.at(y, U[m], -1, side));
        return out;
      },
      line: function (u, ya, yb, n, surf, side) {
        var pts = [], m;
        for (m = 0; m <= n; m++) pts.push(this.at(ya + (yb - ya) * m / n, u, surf, side));
        return { pts: pts, nrm: [0, -(side || 1) * (zOf(yb) - zOf(ya)) / ((yb - ya) || 1) * (surf < 0 ? -1 : 1), surf < 0 ? -1 : 1] };
      }
    };
  }

  /* a wheel on a +Y axle: the tyre and its hub (the kit's gearLeg stands
     every wheel on z = 0, which a nose-up sit cannot use)                */
  function wheel(G, c, r, w) {
    G.revolve(G.pen("dull", "rubber"), [[-w / 2, r * 0.6], [-w / 2, r * 0.88], [-w * 0.3, r], [w * 0.3, r], [w / 2, r * 0.88], [w / 2, r * 0.6]], { at: c, axis: "y", seg: 18 });
    G.revolve(G.pen("metal", "white"), [[-w / 2 - 0.008, r * 0.16], [-w / 2 - 0.008, r * 0.58], [-w * 0.3, r * 0.62], [w * 0.3, r * 0.62], [w / 2 + 0.008, r * 0.58], [w / 2 + 0.008, r * 0.16]], { at: c, axis: "y", seg: 12 });
    G.cylY(G.pen("metal", "dark"), c[0], c[1] - w / 2 - 0.02, c[1] + w / 2 + 0.02, c[2], r * 0.14, 8);
  }

  /* ================================================================ BUILD */
  function build(THREE, M, C) {
    var V = HeroKit.vec, s, i;
    var K = HeroKit.begin(THREE, M, C, { category: "air", key: "gbr_e50_cfighter",
      paint: { skin: EDSG, under: SKY, frame: 0x2a2f34, seam: 0x16191c, seamLow: 0x5f6a58, strut: 0xb9bdb6, sootMetal: 0x4b4640 } });
    K.contract(["gear"]);
    var B = bodyOf(K), W = surfaceOf(WING, wingZ), ST = surfaceOf(STAB, function () { return Z(150); });

    /* ---------------------------------------------------------- the paint
       one projected sheet, in the datum: panel lines as [D1] draws them    */
    function wl(u, ya, yb, n) { var o = [], m; for (m = 0; m <= n; m++) { var p = W.at(ya + (yb - ya) * m / n, u, 1, 1); o.push([p[0], p[1]]); } return o; }
    function rect(c0, c1, y0, y1) { return [[X(c0), y0], [X(c1), y0], [X(c1), y1], [X(c0), y1], [X(c0), y0]]; }
    var louvres = [];
    [468, 488, 508].forEach(function (c) { [0.06, 0.28].forEach(function (y) { louvres.push(rect(c, c + 14, y, y + 0.16)); }); });
    K.paintSheet({ key: "pilot_seahawk", seed: 1953, bounds: { x0: -6.45, x1: 6.15, ymax: 6.1, z0: -0.15, z1: 3.55 }, seam: 0.72, grime: 260,
      frames: FRAMES.map(function (c) { return [X(c), B.sec(X(c)).w + 0.02]; }),
      top: [
        wl(0, Y_FOLD, Y_FOLD, 1).concat(wl(1, Y_FOLD, Y_FOLD, 1)),                                  /* the fold joint */
        wl(WING_U[WING_HINGE], 1.6, Y_AIL, 8),                                                     /* flap and aileron hinge */
        wl(WING_U[WING_HINGE], Y_SPLIT, Y_SPLIT, 1).concat(wl(1, Y_SPLIT, Y_SPLIT, 1)),
        wl(WING_U[WING_HINGE], Y_AIL, Y_AIL, 1).concat(wl(1, Y_AIL, Y_AIL, 1)),
        [[X(565), Y_FOLD], [X(565), 5.88]],                                                        /* the spar line [D1] */
        [[X(473), 3.24], [X(640), 3.24]], [[X(487), 4.44], [X(622), 4.44]],                        /* ribs [D1] */
        [[X(668), 3.6], [X(668), 4.3]], [[X(668), 3.6], [X(684), 3.6]], [[X(668), 4.3], [X(667), 4.3]],   /* aileron tab */
        [[X(452), 1.5], [X(520), 1.22], [X(600), 1.04], [X(700), 0.94], [X(790), 0.9]],            /* the root fairing's edge */
        [[X(565), 0], [X(565), 0.48], [X(651), 0.48], [X(651), 0]],                                /* engine door */
        [[X(400), 0.49], [X(950), 0.28], [X(1090), 0.12]],                                         /* upper longeron */
        [[X(112), 0.3], [X(280), 0.5], [X(380), 0.55]],
        [[X(1184), 0.12], [X(1184), 1.93]], [[X(1139), 0.25], [X(1139), 1.8]],                     /* elevator hinge, tail spar */
        [[X(1210), 0.3], [X(1210), 0.95]], [[X(1210), 0.3], [X(1224), 0.3]], [[X(1210), 0.95], [X(1216), 0.95]]
      ].concat(louvres),
      bot: [
        wl(0, Y_FOLD, Y_FOLD, 1).concat(wl(1, Y_FOLD, Y_FOLD, 1)),
        wl(WING_U[WING_HINGE], 1.6, Y_AIL, 8),
        wl(WING_U[WING_HINGE], Y_SPLIT, Y_SPLIT, 1).concat(wl(1, Y_SPLIT, Y_SPLIT, 1)),
        [[X(565), Y_FOLD], [X(565), 5.88]],
        [[X(473), 3.24], [X(640), 3.24]], [[X(487), 4.44], [X(622), 4.44]],
        rect(535, 625, 0.3, 1.5),                                                                  /* main wheel bay */
        rect(120, 215, 0, 0.15),                                                                   /* nose wheel doors */
        rect(170, 247, 0.2, 0.5),                                                                  /* gun bay door */
        [[X(400), 0.32], [X(900), 0.2]], [[X(960), 0.06], [X(1118), 0.05]],
        [[X(1184), 0.12], [X(1184), 1.93]]
      ],
      rivets: [wl(0.3, 1.6, 5.8, 6), wl(0.58, 1.6, 5.7, 6), [[X(120), 0.2], [X(380), 0.32]], [[X(660), 0.36], [X(1000), 0.16]], [[X(1160), 0.2], [X(1160), 1.9]]],
      rivetsBot: [wl(0.3, 1.6, 5.8, 6), wl(0.58, 1.6, 5.7, 6), [[X(260), 0.3], [X(900), 0.3]]],
      side: [
        [[X(112), Z(257)], [X(400), Z(257)]], [[X(112), Z(239)], [X(280), Z(227.5)]],
        [[X(811), Z(252)], [X(1100), Z(238)]],
        [[X(RUDDER), Z(50)], [X(RUDDER), Z(250)]],                                                 /* rudder hinge */
        [[X(1252), Z(163)], [X(1252), Z(210)]], [[X(1252), Z(163)], [X(1259), Z(163)]], [[X(1252), Z(210)], [X(1262), Z(210)]],
        [[X(RUDDER), Z(106)], [X(1177), Z(106)], [X(1177), Z(126)], [X(RUDDER), Z(126)]],          /* the horn balance */
        [[X(1105), Z(120)], [X(RUDDER), Z(120)]], [[X(1140), Z(80)], [X(RUDDER), Z(80)]],
        [[X(RUDDER), Z(92)], [X(1242), Z(92)]], [[X(RUDDER), Z(140)], [X(1256), Z(140)]], [[X(RUDDER), Z(185)], [X(1262), Z(185)]],
        [[X(1010), Z(196)], [X(RUDDER), Z(206)]]
      ],
      walk: [[[X(475), 0.8], [X(690), 0.8], [X(690), 1.45], [X(485), 1.45]]],
      soot: [[X(806), 0.74, Z(259), 1.25, 0.2], [X(228), 0.3, Z(300), 0.7, 0.09]] });

    var top = K.pen("skin", EDSG), topA = top.tint(EDSG_A), topB = top.tint(EDSG_B), topC = top.tint(EDSG_C);
    var low = K.pen("skin", SKY), lowA = low.tint(SKY_A), lowB = low.tint(SKY_B);
    var ink = K.pen("dull", "ink"), dark = K.pen("dull", "dark"), steel = K.pen("metal", "steel");

    /* ------------------------------------------------------- the fuselage
       24 points round; the grey comes down to 30 deg below the widest line */
    K.part("fuselage");
    var Z_LINE = 1.25;                                  /* the Sky line's height forward of the nose cap */
    function lineA(x) {                                 /* how far below the widest line the grey comes, radians */
      if (x <= X(112)) return PI / 6;
      var q = B.sec(x), sn = (q.zw - Z_LINE) / Math.max(q.zw - q.bot, 1e-6);
      return sn >= 1 ? PI / 2 : Math.max(PI / 6, Math.asin(Math.max(0, sn)));
    }
    function ringA(x, k) {                              /* point k of 24: the lower half is spread so 14 and 22 lie on the line */
      if (k <= 12) return k / 24 * 2 * PI;
      var a = lineA(x), t = (k - 12) / 12;
      if (t <= 1 / 6) return PI + a * t * 6;
      if (t >= 5 / 6) return 2 * PI - a * (1 - t) * 6;
      return PI + a + (PI - 2 * a) * (t - 1 / 6) * 1.5;
    }
    var NR = 24, xs = HeroKit.stations(B.x0, B.x1, 0.44, FUS.map(function (q) { return X(q[0]); }).concat(FRAMES.map(X)), 0.035);
    var fr = xs.map(function (x) { var q = B.sec(x), r = [], k; for (k = 0; k < NR; k++) r.push(B.pt(x, ringA(x, k))); return r; });
    skin(V, fr, function (i2, k) {
      var xm = (xs[i2] + xs[i2 + 1]) / 2, upper = k <= 13 || k >= 22;
      if (!upper) return xm > X(112) ? lowB : (xm < X(565) && xm > X(651) ? lowA : low);
      if (xm > X(112)) return topB;                                    /* the nose cap */
      if (xm < X(565) && xm > X(651)) return topA;                     /* the engine door */
      if (xm < X(462) && xm > X(565)) return topC;
      if (xm < X(1006)) return topA;
      return top;
    });
    /* the fairing behind the hood */
    K.loftBody(top, [{ x: X(322), w: 0.37, top: Z(163), bot: Z(204) }, { x: X(340), w: 0.31, top: Z(169.5), bot: Z(200) },
                     { x: X(362), w: 0.19, top: Z(177), bot: Z(194) }, { x: X(386), w: 0.0, top: Z(184), bot: Z(186) }], { n: 14, step: 0.08, capB: true });

    /* ----------------------------------------------------------- the wings */
    K.part("wing");
    var KW = WING_U.length - 1;
    [1, -1].forEach(function (sd) {
      var ys = W.ys, rings = ys.map(function (y) { return W.ring(y, WING_U, sd); });
      skin(V, rings, function (i2, k) {
        var ym = (ys[i2] + ys[i2 + 1]) / 2;
        if (k === 2 * KW + 1) return null;                              /* the intake's mouth */
        if (k === KW) return topB;                                      /* the blunt aft end round the jet pipe */
        if (k < KW) {
          if (k >= WING_HINGE && ym > 1.6 && ym < Y_AIL) return ym < Y_SPLIT ? topB : topC;      /* flap, aileron */
          if (ym < Y_FOLD) return top;
          return ym < 3.24 ? topA : (ym < 4.44 ? top : topA);
        }
        var u = 2 * KW - k;                                             /* lower surface, segment from U[u] to U[u + 1] */
        if (u < 3) return ym < Y_FOLD ? top : (ym < 3.24 ? topA : (ym < 4.44 ? top : topA));   /* the grey wraps the leading edge */
        if (u >= WING_HINGE && ym > 1.6 && ym < Y_AIL) return ym < Y_SPLIT ? lowB : lowA;
        return ym < Y_FOLD ? low : (ym < 3.24 ? lowA : low);
      }, { cap: top });
      /* the intake: a dark duct behind the lips, a bright lip line */
      var mouth = W.ys.filter(function (y) { return y <= 1.5; }), up = [], lo = [], ur = [], lr = [];
      mouth.forEach(function (y) {
        var a = W.at(y, 0, 1, sd), b = W.at(y, 0, -1, sd), d = 0.38;
        up.push(a); lo.push(b); ur.push([a[0] - d, a[1], a[2] - 0.012]); lr.push([b[0] - d, b[1], b[2] + 0.012]);
      });
      for (i = 0; i + 1 < mouth.length; i++) {
        var mid = [up[i][0] + 0.5, up[i][1], (up[i][2] + lo[i][2]) / 2];
        K.quad(ink, up[i], up[i + 1], ur[i + 1], ur[i], mid); K.quad(ink, lo[i], lo[i + 1], lr[i + 1], lr[i], mid);
        K.quad(ink.tint(0x1b1d1f), ur[i], ur[i + 1], lr[i + 1], lr[i], mid);
      }
      K.ribbon(K.pen("dull", "frame"), up.slice(1), [0.6, 0, 0.8], 0.018, 0.004);
      K.ribbon(K.pen("dull", "frame"), lo.slice(1), [0.6, 0, -0.8], 0.018, 0.004);
      /* the jet pipe in the root's trailing edge, and the wedge aft of it */
      var jz = wingZ(0.84), jy = sd * 0.84;
      K.tube(K.pen("metal", "sootMetal"), [X(796), jy, jz], [X(805.5), jy, jz], 0.172, 0.166, 14, false);    /* 9 cm of lip */
      K.tube(steel, [X(805.5), jy, jz], [X(806), jy, jz], 0.168, 0.152, 14, false);
      K.tube(ink, [X(806), jy, jz], [X(780), jy, jz], 0.152, 0.14, 12, false);
      K.disc(ink.tint(0x1c1a18), [X(780), jy, jz], [-1, 0, 0], 0.14, 12);
      K.tube(steel, [X(781), jy, jz], [X(794), jy, jz], 0.055, 0.012, 8, false);                  /* the pipe's bullet */
      K.loftBody(topB, [{ x: X(770), y: sd * 0.6, w: 0.12, top: jz + 0.19, bot: jz - 0.19, eU: 2.4, eL: 2.4 },
                        { x: X(806), y: sd * 0.585, w: 0.115, top: jz + 0.165, bot: jz - 0.165, eU: 2.4, eL: 2.4 },
                        { x: X(850), y: sd * 0.57, w: 0.10, top: jz + 0.105, bot: jz - 0.10, eU: 2.4, eL: 2.4 },
                        { x: X(888), y: sd * 0.55, w: 0.09, top: jz + 0.05, bot: jz - 0.045, eU: 2.4, eL: 2.4 },
                        { x: X(903), y: sd * 0.50, w: 0.05, top: jz + 0.03, bot: jz - 0.02 },
                        { x: X(916), y: sd * 0.44, w: 0.0, top: jz + 0.012, bot: jz }], { n: 12, step: 0.1 });
      /* seams that must read at a distance: the fold joint and the hinges */
      K.air.seam(W.line(0.5, Y_FOLD, Y_FOLD, 1, 1, sd), 0.03);
      K.air.seam({ pts: [0.0, 0.2, 0.4, 0.6, 0.8, 1].map(function (u) { return W.at(Y_FOLD, u, 1, sd); }), nrm: [0, 0, 1] }, 0.035);
      K.air.seam({ pts: [0.0, 0.25, 0.5, 0.75, 1].map(function (u) { return W.at(Y_FOLD, u, -1, sd); }), nrm: [0, 0, -1] }, 0.035, "seamLow");
      K.air.seam(W.line(WING_U[WING_HINGE], 1.62, Y_AIL, 8, 1, sd), 0.03);
      K.air.seam(W.line(WING_U[WING_HINGE], 1.62, Y_AIL, 8, -1, sd), 0.03, "seamLow");
      K.air.seam({ pts: [W.at(Y_SPLIT, WING_U[WING_HINGE], 1, sd), W.at(Y_SPLIT, 0.99, 1, sd)], nrm: [0, 0, 1] }, 0.03);
      /* the fold's hinge fairings and latch, the aileron's hinge brackets */
      [0.12, 0.42].forEach(function (u) { var q = W.at(Y_FOLD, u, 1, sd); K.sphere(topB, [q[0], q[1], q[2] + 0.005], [0.11, 0.04, 0.022], 6, 3); });
      [3.7, 4.5, 5.3].forEach(function (y) { var q = W.at(y, WING_U[WING_HINGE] + 0.03, -1, sd); K.box(lowB, q[0] - 0.12, q[0] + 0.1, q[1] - 0.015, q[1] + 0.015, q[2] - 0.045, q[2] + 0.005); });
      [2.0, 2.9].forEach(function (y) { var q = W.at(y, WING_U[WING_HINGE] + 0.02, -1, sd); K.box(lowB, q[0] - 0.16, q[0] + 0.12, q[1] - 0.02, q[1] + 0.02, q[2] - 0.06, q[2] + 0.005); });
      /* navigation lamp in the tip, team strip inboard of it */
      K.air.lamp(W.at(5.89, 0.3, 1, sd), 0.04, sd > 0 ? "lampRed" : "lampGreen");
      K.teamStrip([W.at(5.3, 0.16, 1, sd), W.at(5.3, 0.34, 1, sd), W.at(5.3, 0.52, 1, sd), W.at(5.3, 0.7, 1, sd)], [0, -sd * DIHEDRAL, 1], 0.24, 0.008);
    });
    K.air.pitot(W.at(5.7, 0, 1, 1), [1, 0, 0], (504 - 427) / PXM);                                /* port tip [D1] plan */

    /* ---------------------------------------------------------------- tail */
    K.part("tail");
    var KS = STAB_U.length - 1;
    [1, -1].forEach(function (sd) {
      var rings = ST.ys.map(function (y) { return ST.ring(y, STAB_U, sd); });
      skin(V, rings, function (i2, k) {
        if (k === 2 * KS + 1 || k === KS) return null;
        if (k < KS) return k >= STAB_HINGE ? topC : topA;
        if (2 * KS - k < 2) return topA;
        return (2 * KS - k) >= STAB_HINGE ? lowA : low;
      }, { cap: top });
      K.air.seam(ST.line(STAB_U[STAB_HINGE], 0.14, 1.93, 4, 1, sd), 0.025);
      K.air.seam(ST.line(STAB_U[STAB_HINGE], 0.14, 1.93, 4, -1, sd), 0.025, "seamLow");
    });
    var F = K.aerofoil(top, FIN.map(function (q) { return { s: Z(q[0]), le: X(q[1]), c: (q[2] - q[1]) / PXM, t: q[3] }; }), { frame: "fin", sub: 0, k: 8 });
    function finU(row) { var q = F.sec(Z(row)); return (q.le - X(RUDDER)) / q.c; }
    [1, -1].forEach(function (f) {
      K.air.seam({ pts: [56, 80, 105, 130, 160, 190, 220].map(function (r) { return F.at(Z(r), finU(r), f); }), nrm: [0, f, 0] }, 0.028);
      K.air.seam({ pts: [F.at(Z(163), 0.93, f), F.at(Z(210), 0.955, f)], nrm: [0, f, 0] }, 0.02);                      /* rudder tab */
      K.teamStrip([F.at(Z(84), 0.2, f), F.at(Z(84), 0.4, f), F.at(Z(84), 0.6, f), F.at(Z(84), 0.8, f)], [0, f, 0], 0.2, 0.008);
    });
    /* the bullet where the tailplane crosses the fin, and its tail spike */
    K.loftBody(topB, [{ x: X(1033), w: 0, top: Z(150), bot: Z(150) }, { x: X(1037), w: 0.055, top: Z(144.5), bot: Z(155.5) },
                      { x: X(1047), w: 0.095, top: Z(140), bot: Z(160) }, { x: X(1065), w: 0.12, top: Z(137.5), bot: Z(162.5) },
                      { x: X(1095), w: 0.125, top: Z(137), bot: Z(163) }, { x: X(1150), w: 0.11, top: Z(139), bot: Z(161) },
                      { x: X(1200), w: 0.06, top: Z(144), bot: Z(156) }, { x: X(1229), w: 0, top: Z(150), bot: Z(150) }], { n: 12, step: 0.09 });
    K.air.lamp([X(1264.5), 0, Z(205)], 0.04, "lampWhite");

    /* -------------------------------------------------------------- canopy */
    K.part("canopy");
    var hoodRows = HOOD.map(function (q) {
      var x = X(q[0]);
      return { x: x, w: q[2], sill: q[2] > 0 ? B.topAt(x, q[2]) - 0.03 : Z(q[1]) - 0.01, top: Z(q[1]) };
    });
    var hood = hoodRows.map(function (r) { return [r.x, r.w, r.sill, r.top]; }).sort(function (a, b) { return a[0] - b[0]; });   /* the kit's own table */
    K.air.canopy(hoodRows, { frames: [X(198), X(321)], frameW: 0.07, spine: false });
    /* the windscreen's centre panel frames [D1] plan */
    [1, -1].forEach(function (sd) {
      K.ribbon(K.pen("dull", "frame"), [[150, 0.42], [158, 0.42], [165, 0.42], [172, 0.42], [180, 0.42], [189, 0.42], [197, 0.42]].map(function (q) {
        var x = X(q[0]), v = HeroKit.tab(hood, x), y = v[0] * q[1];
        return [x, sd * y, v[1] + (v[2] - v[1]) * Math.pow(1 - Math.pow(q[1], 2.2), 1 / 2.2)];
      }), [0, sd * 0.45, 0.9], 0.045, 0.008);
    });

    /* ------------------------------------------------------------- details */
    K.part("details");
    /* panel breaks round the fuselage: dark on the grey, olive on the Sky */
    var A0 = -PI / 6, A1 = PI + PI / 6;
    FRAMES.forEach(function (c) {
      if (c === 462) return;
      K.air.seam(B.hoop(X(c), A0, A1, 12), 0.028);
      K.air.seam(B.hoop(X(c), A1, 2 * PI + A0, 6), 0.028, "seamLow");
    });
    /* the colour line itself, and the engine door's edges */
    [1, -1].forEach(function (sd) {
      var pts = [], nr = [], k2;
      for (k2 = 0; k2 <= 26; k2++) { var x = X(1230) + (X(66) - X(1230)) * k2 / 26, a = sd > 0 ? -lineA(x) : PI + lineA(x); pts.push(B.pt(x, a)); nr.push(B.nrm(x, a)); }
      K.air.seam({ pts: pts, nrm: nr }, 0.02, "seamLow");
    });
    [1, -1].forEach(function (sd) { K.air.seam(B.line(PI / 2 - sd * 0.72, X(651), X(565), 4), 0.025); });
    /* the four cannon: a trough and a muzzle each, low on the nose [D1] */
    [1, -1].forEach(function (sd) {
      [-36, -61].forEach(function (deg) {
        var a = sd > 0 ? deg * PI / 180 : PI - deg * PI / 180, ln = B.line(a, X(228), X(172), 4);
        K.ribbon(ink, ln.pts, ln.nrm, 0.075, 0.006);
        var q = B.pt(X(214), a, 0.004);
        K.tube(K.pen("metal", "dark"), [q[0] - 0.12, q[1], q[2]], [q[0] + 0.1, q[1], q[2] - 0.004], 0.022, 0.02, 6, true);
      });
      /* case ejector slots, the camera port, a cockpit vent */
      var e = sd > 0 ? -1.25 : PI + 1.25;
      K.air.seam(B.line(e, X(262), X(282), 2), 0.05, "ink");
      K.disc(K.pen("glass"), B.pt(X(60), sd > 0 ? 0 : PI, 0.004), B.nrm(X(60), sd > 0 ? 0 : PI), 0.035, 8);
      K.air.seam(B.line(sd > 0 ? 0.55 : PI - 0.55, X(120), X(134), 2), 0.03, "ink");
      /* the round-cornered door low on the rear fuselage [D1] */
      var d0 = sd > 0 ? -0.62 : PI + 0.62;
      K.air.seam(B.line(d0, X(856), X(877), 2), 0.085, "seamLow");
      /* catapult hooks under the root */
      K.box(K.pen("metal", "dark"), X(470), X(455), sd * 0.42 - 0.02, sd * 0.42 + 0.02, B.botAt(X(462), 0.42) - 0.09, B.botAt(X(462), 0.42) + 0.03);
    });
    /* under the nose: the blister, and the step ahead of the wheel bay */
    K.sphere(lowB, [X(90), 0, Z(289.5)], [0.12, 0.06, 0.055], 8, 4);
    K.box(lowB, X(401), X(379), -0.07, 0.07, Z(338.5), Z(329));
    /* the engine bay's louvres as raised slats over the painted grid */
    [1, -1].forEach(function (sd) {
      [468, 488, 508].forEach(function (c) {
        var q = B.pt(X(c + 7), PI / 2 - sd * 0.19, 0.004), n = B.nrm(X(c + 7), PI / 2 - sd * 0.19);
        K.ribbon(dark, [[X(c), q[1], q[2]], [X(c + 14), q[1], q[2]]], n, 0.13, 0.004);
      });
    });
    /* aerials on the spine [D1] side: the mast and the whip */
    K.tube(dark, [X(684), 0, Z(182)], [X(690), 0, Z(130)], 0.024, 0.014, 6, true);
    K.box(dark, X(691), X(677), -0.03, 0.03, Z(181.5), Z(178));
    K.tube(dark, [X(817), 0, Z(185)], [X(845.5), 0, Z(132)], 0.011, 0.007, 3, false);
    K.box(dark, X(820), X(814), -0.02, 0.02, Z(186), Z(183.5));
    /* the sting hook under the tail cone, its beak aft of the rudder */
    var hk = K.pen("metal", "dark"), hs = K.pen("metal", "steel");
    K.tube(hk, [X(1118), 0, Z(269.5)], [X(1293), 0, Z(238.5)], 0.03, 0.026, 8, true);
    [[1293, 238.5], [1303, 238.5], [1308.5, 234], [1309, 228.5], [1304.5, 225.5]].reduce(function (p, q) {
      K.tube(hs, [X(p[0]), 0, Z(p[1])], [X(q[0]), 0, Z(q[1])], 0.024, 0.022, 6, true); return q;
    });
    K.box(lowB, X(1124), X(1104), -0.045, 0.045, Z(279), Z(263));                                 /* the hook's root fairing */
    K.sphere(lowB, [X(1087), 0, Z(282)], [0.09, 0.035, 0.03], 6, 3);                               /* the tail bumper */
    K.tube(hk, [X(1200), 0, Z(250)], [X(1200), 0, Z(254.5)], 0.02, 0.02, 5, true);                 /* the hook's up-latch */

    /* ---------------------------------------------------------------- gear
       wheels where [D1] draws them: nose (162, 384) r 0.22, main (579, 343)
       r 0.337; main track 2.33 m from the head-on view.  Leg details NOT
       CONFIRMED.                      */
    K.part("gear");
    var G = K.group("gear"), gs = G.pen("metal", "strut"), gc = G.pen("metal", "chrome"), gd = G.pen("dull", SKY), gk = G.pen("metal", "dark");
    /* nose: a raked leg, a fork, the door plate on its front [P1] */
    var na = [X(162), 0, Z(384)], nr = 0.221, nw = 0.15, np = [X(187), 0, Z(306)], ncr = [na[0] - 0.015, 0, na[2] + nr + 0.075];
    wheel(G, na, nr, nw);
    G.tube(gs, np, V.mix(np, ncr, 0.55), 0.05, 0.05, 8, true);
    G.tube(gc, V.mix(np, ncr, 0.55), ncr, 0.034, 0.034, 8, false);
    G.bar(gs, [ncr[0], -nw / 2 - 0.045, ncr[2]], [ncr[0], nw / 2 + 0.045, ncr[2]], 0.07, 0.06);
    [1, -1].forEach(function (sd) { G.bar(gs, [ncr[0], sd * (nw / 2 + 0.035), ncr[2]], [na[0], sd * (nw / 2 + 0.035), na[2]], 0.05, 0.03); });
    var nk = [V.mix(np, ncr, 0.72)[0] - 0.16, 0, V.mix(np, ncr, 0.72)[2]];
    G.bar(gs, V.mix(np, ncr, 0.5), nk, 0.03, 0.045); G.bar(gs, nk, [ncr[0], 0, ncr[2] + 0.03], 0.03, 0.045);         /* torque links */
    G.tube(gs, V.mix(np, ncr, 0.35), [X(232), 0, Z(319)], 0.026, 0.026, 6, true);                                    /* drag strut */
    G.obox(gd, [V.mix(np, ncr, 0.45)[0] + 0.085, 0, V.mix(np, ncr, 0.45)[2]], V.unit(V.sub(np, ncr)), [0, 1, 0], V.unit(V.cross(V.sub(np, ncr), [0, 1, 0])), 0.52, 0.3, 0.014);
    /* a door hanging from the belly: its top edge follows the skin at its own y */
    function doorPlate(cols, y, drop) {
      var up = cols.map(function (c) { return [X(c), B.botAt(X(c), y) + 0.02]; }), dn = cols.slice().reverse().map(function (c) { return [X(c), B.botAt(X(c), y) - drop]; });
      G.prism(gd, up.concat(dn), "xz", y - 0.008, y + 0.008);
    }
    [1, -1].forEach(function (sd) { doorPlate([128, 145, 162, 180, 197, 214], sd * 0.15, 0.26); });
    G.cylX(G.pen("lamp", "lampWhite"), np[0] + 0.065, np[0] + 0.09, 0, V.mix(np, ncr, 0.3)[2], 0.05, 8);              /* landing lamp on the leg */
    /* mains: one wheel inboard of each leg, the leg's own door outboard */
    [1, -1].forEach(function (sd) {
      var ma = [X(579), sd * 1.16, Z(343)], mr = 0.337, mw = 0.21, ly = sd * 1.335;      /* y 1.16: [D1] head-on, rows 896 / 1138 */
      var mp = [X(576), ly, W.at(1.335, 0.45, -1, 1)[2] + 0.03], ml = [X(579), ly, ma[2]], mm = V.mix(mp, ml, 0.55);
      wheel(G, ma, mr, mw);
      G.tube(gs, mp, mm, 0.058, 0.058, 8, true);
      G.tube(gc, mm, [ml[0], ml[1], ml[2] + 0.05], 0.04, 0.04, 8, false);
      G.tube(gs, [ml[0], ly + sd * 0.03, ml[2]], [ma[0], ma[1], ma[2]], 0.045, 0.04, 8, true);                         /* the stub axle */
      G.sphere(gs, ml, 0.07, 8, 4);
      var mk = [mm[0] - 0.2, ly, (mm[2] + ml[2]) / 2];
      G.bar(gs, [mm[0], ly, mm[2] - 0.03], mk, 0.03, 0.05); G.bar(gs, mk, [ml[0], ly, ml[2] + 0.07], 0.03, 0.05);
      G.tube(gs, V.mix(mp, mm, 0.6), [X(600), sd * 0.9, W.at(0.9, 0.5, -1, 1)[2] + 0.05], 0.03, 0.03, 6, true);     /* side stay */
      G.tube(gk, V.mix(mp, mm, 0.2), [ml[0] + 0.03, ly - sd * 0.05, ml[2] + 0.1], 0.008, 0.008, 3, false);            /* brake pipe */
      G.box(gd, X(592), X(562), ly + sd * 0.075 - 0.008, ly + sd * 0.075 + 0.008, ma[2] + 0.02, mp[2] + 0.02);         /* leg door */
      doorPlate([538, 559, 580, 601, 622], sd * 0.56, 0.22);                                                            /* wheel door, hinged on the belly */
    });

    /* ------------------------------------------------- stand it on its wheels */
    var inner = K.finish(), stance = new THREE.Group(), root = new THREE.Group();
    stance.position.set(MAIN[0], 0, 0);
    stance.rotation.y = -SIT;                           /* nose up */
    inner.position.set(-MAIN[0], 0, -MAIN[1]);
    stance.add(inner); root.add(stance);
    root.name = "seahawk_fga6";
    root.userData.heroKit = inner.userData.heroKit;
    return root;
  }

  return { build: build, LEN: LEN, SIT: SIT };
})();

UNIT_MODELS["gbr_e50_cfighter"] = { len: 12.23, build: HeroPilotSeaHawk.build };
