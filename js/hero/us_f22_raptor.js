/* ============ us_f22_raptor.js -- F-22A Raptor (HERO MODEL) ============

   The United States' air-dominance fighter, drawn for the two rows that fly
   it: stealth_n (the present-day roster) and nato_e00_fighter (2005, the
   year the type entered service). Both rows are the F-22A.

   Published figures. The USAF fact sheet: 62 ft 1 in long, 44 ft 6 in span,
   16 ft 8 in high (18.92, 13.56, 5.08 m). Lockheed's wing data as commonly
   quoted: 840 sq ft (78.04 m2), leading edge swept 42 degrees, trailing
   edge swept FORWARD 17, anhedral 3.25, NACA 64A-series sections 5.92 per
   cent thick at the root and 4.29 at the tip; fins canted 28 degrees out
   of vertical, leading edges swept 22.9. The wing is the trapezoid those
   numbers fix, 9.84 m of chord at the centreline, with the 3-view's tip.

   THE SPAN. nato_e00_fighter draws the true 13.56 m. stealth_n draws
   13.20 m, the one published figure not met. The game scales an aircraft by
   its length (render3d.js: r x 2.24): stealth_n's r of 16 draws this
   airframe 1.90 times its real size, and at the true span its wingtips
   stood 0.43 m inside the airbase's revetment walls on every pad
   (tools/jsc/parked3d_check.js B holds a revetment's aircraft to 0.15 m).
   So on that row the wing stops 0.18 m short of the real tip on each side,
   on the true leading and trailing edges, and the tip keeps its true chord
   and cut corner, moved in. nato_e00_fighter is the same aeroplane at r 15
   (1.78 times), which fits the revetments at the true span. Bringing
   stealth_n to r 15 is not enough on its own to restore its span: the RAF's
   F-35B row, stealth_b (r 16), has no model of its own and draws this one
   through stealth_n, so it would need its own model or an OVERSIZE entry
   first. stealth_n measures 18.92 x 13.20 x 5.09, nato_e00_fighter
   18.92 x 13.56 x 5.09.

   Drawing: "Lockheed Martin F-22A Raptor 3-view line drawing.jpg" (Commons),
     read at its own 62 ft 1 in / 44 ft 6 in scale: the fins (leading edge
     meeting the boom 13.1 m aft of the nose, rudder root at 17.05), the
     stabilator leading edge (15.81 m at y 3.0, 17.04 at y 4.4), the wingtip
     (a 1.34 m tip chord, its trailing corner cut back at 42 degrees until
     it meets the trailing edge) and the wheels (nose 5.72 m, mains 11.82).
     Its front view draws the wing about 0.3 m higher at y 4 m and the
     canopy top at 3.17 m. The head-on and Nellis photographs below put
     them where they are here (the wing on the trunk chine, its upper
     surface at the root roughly 0.35 m above the intake's top corner; the
     canopy top 3.0-3.07 m above the ground), so they stay.

   Photographs (Wikimedia Commons, US government works):
     "F-22 Raptor taxis, Nellis AFB - 070903-F-6911G-024.jpg"  starboard
        side, long lens: the wheels (scaled to the 18.92 m length, nose
        about 5.76 m and mains 11.9 m aft of the radome tip), the 2.7 m
        spine, the canopy top, the 5.1 m fin tips, the fin trailing edge
        sweeping FORWARD to the rudder, which stands over the nozzles
     "F-22 Raptor side view at Dubai Airshow 2017.jpg"  port side on the
        ground: canopy, chine, belly line, the side-bay doors
     "F-22 Raptor flying overhead at the Reno Air Races, September 14,
        2008.jpg"  the underside planform: caret intakes 1.83 m off the
        centreline with their lips swept back, the wide flat body, the
        wingtip LE 12.6 m aft of the nose, and the cranked trailing edge of
        each stabilator, whose aftmost point is a third of the way out
     "F-22 Raptor, head on view - 030709-F-6911G-005.jpg"  the chined nose:
        widest at a low chine, the sides leaning in above it
     "F-22 Raptor above Mojave Desert - 021105-O-9999G-071.jpg"  the
        two-tone grey and its disruptive pattern (that aircraft is an EMD
        jet with a test boom; no line aircraft has the boom)

   What makes it a Raptor and not "a twin-fin jet", at RTS zoom:
     1. The planform: a clipped diamond wing whose trailing edge sweeps
        forward, and diamond stabilators right behind it, all edges at the
        same two angles. From the game camera that is the whole aeroplane.
     2. A WIDE, flat body. The intakes stand 1.83 m off the centreline and
        the body stays about 4.5 m across from them to the tail.
     3. Twin fins canted out, big, with their trailing edges swept forward.
     4. Two flat 2-D vectoring nozzles side by side.
     5. A long frameless bubble canopy with the gold indium-tin-oxide tint.
     6. Caret intakes: the lip swept back in plan, the lower lip behind the
        upper, a dark mouth.
   Nothing hangs outside. In combat the F-22 carries everything internally:
   two AIM-9 in the side bays and the main bay's AMRAAMs, JDAMs or SDBs. The
   bays are drawn shut, their saw-toothed door outlines painted.

   NO VARIANT. The 2005 row and the present-day row are the same airframe:
   the Increment 2, 3.1 and 3.2 upgrades are software, bay racks and
   coatings, and none of them changed the outer mould line. Both keys build
   the same model.

   Model space: +X nose, +Y left (port), +Z up, metres. Heights below are
   written above the ground and the gear stands on z = ZG.
   Paint: PAINT.twotone in js/air3d_era.js, which air_specs gives both rows.
   The whole airframe is merged into one mesh per material; the gear is its
   own named group so render3d.js can stow it.
   ========================================================================= */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroF22 = (function () {
  "use strict";

  var V = null;                 /* THREE, set by build()                     */
  var D2R = Math.PI / 180;

  /* ---- datum: stations s are metres aft of the radome tip, heights h are
     metres above the ground ---------------------------------------------- */
  var XN = 9.46;                /* nose tip; the stabilator tips end at -9.46 */
  var ZG = -1.95;               /* the ground                                */
  function X(s) { return XN - s; }
  function Z(h) { return h + ZG; }

  /* ---- wing: the trapezoid the published figures define ------------------
     LE 42 deg, TE -17 deg, span 13.56, area 78.04 -> 9.84 m root chord at the
     centreline. The LE passes 12.5 m aft of the nose at the tip, as the Reno
     underside photograph and the 3-view both put it. The tip is the 3-view's:
     a 1.34 m streamwise tip, its trailing corner cut back at the leading
     edge's 42 degrees (mirrored, so it keeps to the planform's two angles)
     until it meets the 17-degree trailing edge. SEMI is set per row by
     build(): see THE SPAN above. */
  var REAL_SEMI = 6.78;          /* the published half-span                  */
  var SEMI = REAL_SEMI;          /* drawn half-span, set by build()          */
  var TIP_CHORD = 1.34;
  var TAN_LE = Math.tan(42 * D2R), TAN_TE = Math.tan(17 * D2R);
  var LE0 = 12.50 - REAL_SEMI * TAN_LE;               /* LE at the centreline */
  function wingLE(y) { return LE0 + y * TAN_LE; }
  function wingTE(y) { return LE0 + 9.84 - y * TAN_TE; }
  /* the cut trailing corner of the tip, at whatever span the tip stands */
  function tipCut(y) { return wingLE(SEMI) + TIP_CHORD + (SEMI - y) * TAN_LE; }
  function wingTEo(y) { return Math.min(wingTE(y), tipCut(y)); }
  /* where the cut meets the trailing edge */
  function tipKink() {
    return (wingLE(SEMI) + TIP_CHORD + SEMI * TAN_LE - LE0 - 9.84) / (TAN_LE - TAN_TE);
  }
  function wingH(y) { return 1.84 - (y - 2.0) * Math.tan(3.25 * D2R); }
  function wingTC(y) { return 0.0592 - 0.0163 * (y - 2.0) / (REAL_SEMI - 2.0); }

  /* ---- stabilator: LE 42 deg like the wing; the trailing edge is cranked,
     its outer part swept forward 17 deg like the wing's, its inner part
     swept back at the LE's 42 degrees to a root beside the nozzle (y 1.6),
     so the aftmost point of the aeroplane is a third of the way out along
     each stabilator. Both edges are the 3-view's: the LE 15.81 m aft of the
     nose at y 3.0 and 17.04 at y 4.4, a 1.4 m tip chord; the inner TE 17.78
     at y 1.6, 18.13 at 2.0 and 18.86 at 2.9. Inboard
     of y 2.65 that line runs in under the wing's trailing edge at the same
     height, so there the LE stands 6 cm behind the wing's TE instead: the
     two surfaces close up without passing through each other (from above,
     that corner lies under the fin). ---------------------------------------- */
  var ST_IN = 1.60, ST_ROOT = 2.05, ST_KINK = 2.95, ST_TIP = 4.42, ST_H = 1.80;
  function stabLE(y) { return Math.max(14.95 + (y - ST_ROOT) * TAN_LE, wingTE(y) + 0.06); }
  /* where the two parts of the LE meet */
  var ST_NOTCH = (LE0 + 9.84 + 0.06 - 14.95 + ST_ROOT * TAN_LE) / (TAN_LE + TAN_TE);
  function stabTE(y) {
    return y <= ST_KINK ? 18.92 - (ST_KINK - y) * TAN_LE
                        : 18.92 - (y - ST_KINK) * TAN_TE;
  }

  /* ---- fins: canted 28 deg, LE swept 22.9 deg, TE swept forward to a
     1.24 m tip. Placed from the 3-view, which agrees with the Nellis taxi
     photograph: the LE meets the boom 13.1 m aft of the nose and the
     rudder's root trailing edge stands at 17.05, over the nozzles, which
     is where the boom ends. The root sits on the boom shoulder; the part
     buried below it is cut off at the boom's end so it never shows. ----- */
  var FIN_CANT = 28 * D2R, FIN_Y0 = 1.55, FIN_H0 = 2.10, FIN_SPAN = 3.34;
  var BOOM_END = 17.00;          /* the last body station (MID below)       */
  function finLE(h) { return 13.10 + h * Math.tan(22.9 * D2R); }
  function finTE(h) {
    var s = 17.05 - h * 1.30 / FIN_SPAN;
    return h < 0 ? Math.min(s, BOOM_END - 0.04) : s;
  }

  /* ---- body stations: [s, w chine half-width, chine h, shoulder h,
     shoulder half-width, crown above the shoulder, belly-corner h, belly
     half-width]. The crown goes negative under the canopy: that is the
     cockpit well, so the glass never lies on a skin surface. ------------- */
  var FORE = [
    [0.00, 0.020, 1.47, 1.49, 0.012,  0.00, 1.45, 0.010],
    [0.30, 0.150, 1.47, 1.60, 0.090,  0.01, 1.36, 0.070],
    [0.80, 0.330, 1.48, 1.77, 0.200,  0.02, 1.25, 0.160],
    [1.50, 0.530, 1.51, 1.98, 0.320,  0.03, 1.14, 0.260],
    [2.30, 0.700, 1.55, 2.18, 0.430,  0.02, 1.05, 0.360],
    [3.10, 0.820, 1.59, 2.30, 0.510, -0.08, 1.00, 0.430],
    [3.90, 0.900, 1.66, 2.36, 0.560, -0.10, 0.97, 0.480],
    [4.55, 0.950, 1.78, 2.39, 0.580, -0.10, 0.95, 0.520]
  ];
  /* the intake mouth: the trunk's full section, raked (see rake()). The two
     extra numbers put a flat shelf from the chine in to y 0.97 at 1.82 m:
     that is the upper lip, and it meets the forebody chine, which rises into
     the top inner corner of each intake as it does on the aeroplane. */
  var MOUTH = [4.75, 1.83, 1.80, 2.39, 0.580, -0.10, 0.93, 1.45, 0.97, 1.82];
  var MID = [
    [ 6.30, 1.96, 1.82, 2.46, 0.62, 0.12, 0.93, 1.50],
    [ 7.30, 2.08, 1.83, 2.50, 0.66, 0.18, 0.93, 1.55],
    [ 8.40, 2.26, 1.84, 2.50, 0.70, 0.20, 0.93, 1.60],
    [ 9.60, 2.28, 1.85, 2.48, 0.72, 0.20, 0.93, 1.62],
    [10.80, 2.28, 1.85, 2.45, 0.74, 0.19, 0.94, 1.62],
    [12.00, 2.26, 1.86, 2.41, 0.74, 0.17, 0.97, 1.61],
    [13.20, 2.23, 1.87, 2.36, 0.74, 0.14, 1.03, 1.59],
    [14.40, 2.19, 1.87, 2.31, 0.72, 0.10, 1.13, 1.56],
    [15.50, 2.15, 1.87, 2.27, 0.70, 0.07, 1.27, 1.52],
    [16.40, 2.10, 1.87, 2.25, 0.68, 0.05, 1.40, 1.46],
    [17.00, 2.05, 1.87, 2.24, 0.66, 0.04, 1.45, 1.42]
  ];

  /* caret lip: swept back 49 deg in plan (inner corner 4.73 m, outer corner
     5.64 m aft of the nose in the Reno photograph), the lower lip further
     aft than the upper. Only the trunk, outboard of the forebody, rakes. */
  function rake(y, h) {
    var a = Math.abs(y);
    if (a <= 0.97) return 0;
    return 1.15 * (a - 0.97) + 0.35 * Math.max(0, 1.80 - h);
  }

  /* ============================================================ helpers == */
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  function cr1(p0, p1, p2, p3, t) {
    var t2 = t * t, t3 = t2 * t;
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2
      + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
  }
  /* Catmull-Rom through a station table, so the body is not a stack of cones */
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

  /* One body section, 24 points running port chine -> crown -> starboard
     chine -> keel -> port chine (anticlockwise seen from ahead). The chines
     and belly corners are doubled points, and the quads between the doubles
     are skipped, so the chine stays a knife edge and each facet keeps its own
     normal: the faceting is what makes it a 1990s low-observable airframe. */
  var BODY_SKIP = [12, 16, 19, 23];
  function bodyRing(st, rk) {
    var w = st[1], zc = st[2], zt = st[3], wt = st[4], cr = st[5], zb = st[6], wb = st[7];
    var dt = zt - zc, db = zc - zb;
    /* the first point up the side is a shelf when the station names one */
    var s1 = st.length > 9 ? [st[8], st[9]] : [w + (wt - w) * 0.30, zc + dt * 0.30];
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

  /* Bridge rings of equal length with quads; caps are fans. Ring i+1 lies
     beyond ring i; whichever way round a part is wound, orient() turns a
     closed one outward afterwards. */
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

  /* NACA four-digit half thickness */
  function yt(f, tc) {
    return tc * (1.4845 * Math.sqrt(f) - 0.6300 * f - 1.7580 * f * f
               + 1.4215 * f * f * f - 0.5075 * f * f * f * f);
  }
  /* aerofoil ring at span station y: TE over the top to the LE and back under */
  function foil(sLE, sTE, y, h, tc, m, grow) {
    var p = [], i, f, chord = sTE - sLE, g = grow || 0, pad = g ? 0.022 : 0;
    var xl = X(sLE) + g, c = chord + 2 * g;
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
  /* the same in a fin's canted plane: hh runs up the fin from its root */
  function finFoil(hh, tc, m, side, grow) {
    var sLE = finLE(hh), sTE = finTE(hh), p = [], i, f, g = grow || 0, pad = g ? 0.02 : 0;
    var c = sTE - sLE + 2 * g, xl = X(sLE) + g;
    var ca = Math.cos(FIN_CANT), sa = Math.sin(FIN_CANT);
    var y0 = FIN_Y0 + hh * sa, z0 = Z(FIN_H0) + hh * ca;
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
  /* rounded rectangle in the y-z plane, anticlockwise from ahead */
  function rrect(x, cy, cz, hw, hh, n, e) {
    var p = [], i, a, c, s;
    for (i = 0; i < n; i++) {
      a = i / n * Math.PI * 2; c = Math.cos(a); s = Math.sin(a);
      p.push([x, cy + hw * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e),
                 cz + hh * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), e)]);
    }
    return p;
  }
  function mirrorRings(rings) {
    return rings.map(function (r) { return r.map(function (q) { return [q[0], -q[1], q[2]]; }); });
  }

  var _m4 = null, _q = null, _v = null, _u = null;
  function boxG(sx, sy, sz, x, y, z, ry) {
    var g = new V.BoxGeometry(sx, sy, sz);
    if (ry) g.rotateY(ry);
    g.translate(x, y, z);
    return g;
  }
  /* cylinder between two points */
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
  /* wheel: CylinderGeometry's own axis is Y, the axle across the aircraft */
  function wheelG(r, w, x, y, z, seg) {
    var g = new V.CylinderGeometry(r, r, w, seg || 18);
    g.translate(x, y, z);
    return g;
  }

  /* ============================================================= paint ==
     One sheet for the whole airframe, laid out as four plan views at 52 px
     to the metre: from above, from port, from starboard, from below. Every
     skin triangle takes its UVs by projection into the band its normal
     faces (projUV), so the panel lines, bay doors and camouflage are drawn
     where they are on the aeroplane, in metres. */
  var PXM = 52, XMIN = -9.75, TW = 1024;
  var YMAX = 7.0, TOPH = 728, ZTOP = 3.30, ZBOT = -2.00, SIDEH = 276;
  var TH = 2048, B_PORT = TOPH, B_STBD = TOPH + SIDEH, B_BOT = TOPH + 2 * SIDEH;

  function cu(x) { return clamp((x - XMIN) * PXM, 1, TW - 1); }
  function rTop(y) { return clamp((YMAX - y) * PXM, 1, TOPH - 1); }
  function rBot(y) { return B_BOT + clamp((YMAX - y) * PXM, 1, TOPH - 1); }
  function rSide(z, stbd) { return (stbd ? B_STBD : B_PORT) + clamp((ZTOP - z) * PXM, 1, SIDEH - 1); }

  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* a saw-toothed seam: every removable panel on the aeroplane has one */
  function zig(g, x0, y0, x1, y1, amp, wave) {
    var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy);
    if (L < 1) return;
    var ux = dx / L, uy = dy / L, nx = -uy, ny = ux, n = Math.max(2, Math.round(L / wave)), i;
    g.beginPath();
    for (i = 0; i <= n; i++) {
      var t = i / n * L, s = (i === 0 || i === n) ? 0 : (i % 2 ? amp : -amp);
      if (i === 0) g.moveTo(x0 + ux * t + nx * s, y0 + uy * t + ny * s);
      else g.lineTo(x0 + ux * t + nx * s, y0 + uy * t + ny * s);
    }
    g.stroke();
  }
  function poly(g, pts, fill, stroke) {
    g.beginPath();
    g.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
    g.closePath();
    if (fill) { g.fillStyle = fill; g.fill(); }
    if (stroke) { g.strokeStyle = stroke; g.stroke(); }
  }
  /* a door outline with saw-toothed ends: s0..s1 along the body, in band
     coordinates a..b across it */
  function door(g, s0, s1, a, b, col, lw) {
    var x0 = cu(X(s0)), x1 = cu(X(s1));
    g.strokeStyle = col; g.lineWidth = lw;
    g.beginPath(); g.moveTo(x0, a); g.lineTo(x1, a); g.stroke();
    g.beginPath(); g.moveTo(x0, b); g.lineTo(x1, b); g.stroke();
    zig(g, x0, a, x0, b, 3.5, 9);
    zig(g, x1, a, x1, b, 3.5, 9);
  }
  /* low-visibility national insignia, a shade darker than the skin */
  function star(g, cx, cy, r, col) {
    var i, a;
    g.fillStyle = col;
    g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.closePath(); g.fill();
    g.fillRect(cx - r * 2.0, cy - r * 0.32, r * 4.0, r * 0.64);
    g.fillStyle = "rgba(150,158,163,0.55)";
    g.beginPath();
    for (i = 0; i < 10; i++) {
      a = -Math.PI / 2 + i * Math.PI / 5;
      var rr = i % 2 ? r * 0.38 : r * 0.92;
      if (i === 0) g.moveTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a));
      else g.lineTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a));
    }
    g.closePath(); g.fill();
  }

  var BASE = "#7e888e";          /* PAINT.twotone lifted a touch: the F-22 is
                                    a lighter grey than the F-35 beside it   */
  var DARK = "#626b71";          /* the disruptive tone                      */

  function paintSheet() {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(22051);
    var i, k, s, y;

    g.fillStyle = BASE; g.fillRect(0, 0, TW, TH);

    /* 1. the disruptive pattern: big soft-cornered blotches of the darker
          grey, the way the Mojave photograph shows them, on every band */
    var bands = [[0, TOPH], [B_PORT, SIDEH], [B_STBD, SIDEH], [B_BOT, TOPH]];
    for (k = 0; k < 4; k++) {
      var n = k === 0 || k === 3 ? 26 : 12;
      for (i = 0; i < n; i++) {
        var cx = R() * TW, cy = bands[k][0] + R() * bands[k][1];
        var rx = 40 + R() * 90, ry = 22 + R() * (k === 0 || k === 3 ? 70 : 34), pts = [], j;
        for (j = 0; j < 9; j++) {
          var a = j / 9 * Math.PI * 2, q = 0.65 + R() * 0.45;
          pts.push([cx + Math.cos(a) * rx * q,
                    clamp(cy + Math.sin(a) * ry * q, bands[k][0] + 1, bands[k][0] + bands[k][1] - 1)]);
        }
        g.globalAlpha = 0.50 + R() * 0.25;
        poly(g, pts, DARK, null);
      }
    }
    g.globalAlpha = 1;

    /* 2. LO panel mottle: neighbouring panels cure to slightly different
          greys, which is the look of the coating close up */
    for (i = 0; i < 70; i++) {
      g.globalAlpha = 0.05 + R() * 0.06;
      g.fillStyle = R() < 0.5 ? "#4e575d" : "#a2acb1";
      g.fillRect(R() * TW, R() * TH, 20 + R() * 70, 10 + R() * 40);
    }
    g.globalAlpha = 1;

    /* 3. fuselage frames and stringers, saw-toothed, top and belly */
    g.lineWidth = 1.2; g.strokeStyle = "rgba(26,30,34,0.34)";
    var frames = [1.8, 2.5, 6.4, 7.6, 8.8, 10.0, 11.2, 12.4, 13.6, 14.8, 16.0];
    for (i = 0; i < frames.length; i++) {
      s = frames[i];
      zig(g, cu(X(s)), rTop(1.9), cu(X(s)), rTop(-1.9), 2.5, 8);
      zig(g, cu(X(s)), rBot(1.6), cu(X(s)), rBot(-1.6), 2.5, 8);
    }
    for (k = -1; k <= 1; k += 2) {
      zig(g, cu(X(6.4)), rTop(k * 0.62), cu(X(16.6)), rTop(k * 0.62), 2.2, 9);
      zig(g, cu(X(5.0)), rTop(k * 1.35), cu(X(16.6)), rTop(k * 1.35), 2.2, 9);
    }
    /* radome joint, and the canopy-deck seam ahead of the windscreen */
    zig(g, cu(X(1.75)), rTop(0.6), cu(X(1.75)), rTop(-0.6), 3, 9);
    zig(g, cu(X(1.75)), rBot(0.4), cu(X(1.75)), rBot(-0.4), 3, 9);
    for (k = 0; k < 2; k++) zig(g, cu(X(1.75)), rSide(Z(1.0), k), cu(X(1.75)), rSide(Z(2.1), k), 3, 9);

    /* 4. wing control surfaces, both wings, both skins: the full-span LE
          flap, the flaperon inboard and the aileron outboard of 4.6 m */
    g.strokeStyle = "rgba(20,24,28,0.55)"; g.lineWidth = 1.6;
    for (k = -1; k <= 1; k += 2) {
      var fn = [rTop, rBot];
      for (var b = 0; b < 2; b++) {
        var row = fn[b];
        g.beginPath();
        g.moveTo(cu(X(wingLE(2.4) + 0.55)), row(k * 2.4));
        g.lineTo(cu(X(wingLE(6.5) + 0.30)), row(k * 6.5)); g.stroke();
        /* hinge line, ending inboard of the cut tip on either span */
        g.beginPath();
        g.moveTo(cu(X(wingTE(2.4) - 1.05)), row(k * 2.4));
        g.lineTo(cu(X(wingTE(5.6) - 0.62)), row(k * 5.6));
        g.lineTo(cu(X(wingTE(5.6))), row(k * 5.6)); g.stroke();
        g.beginPath();
        g.moveTo(cu(X(wingTE(4.6) - 0.85)), row(k * 4.6));
        g.lineTo(cu(X(wingTE(4.6))), row(k * 4.6)); g.stroke();
        /* rib seams */
        g.strokeStyle = "rgba(24,28,32,0.26)"; g.lineWidth = 1.0;
        for (y = 3.0; y < 5.7; y += 0.7) {
          zig(g, cu(X(wingLE(y) + 0.1)), row(k * y), cu(X(wingTE(y) - 0.1)), row(k * y), 1.6, 8);
        }
        g.strokeStyle = "rgba(20,24,28,0.55)"; g.lineWidth = 1.6;
      }
    }

    /* 5. weapons bays, shut. Main bay on the belly, two doors either side of
          the keel; side bays low on each trunk, an AIM-9 in each. */
    door(g, 7.2, 11.9, rBot(1.02), rBot(-1.02), "rgba(16,20,24,0.62)", 1.8);
    g.strokeStyle = "rgba(16,20,24,0.55)"; g.lineWidth = 1.4;
    g.beginPath(); g.moveTo(cu(X(7.2)), rBot(0)); g.lineTo(cu(X(11.9)), rBot(0)); g.stroke();
    for (k = 0; k < 2; k++) door(g, 6.2, 8.7, rSide(Z(1.55), k), rSide(Z(1.06), k), "rgba(16,20,24,0.62)", 1.6);
    /* nose and main gear doors, over the wheels (see addGear) */
    door(g, NOSE_S - 0.76, NOSE_S + 0.64, rBot(0.30), rBot(-0.30), "rgba(16,20,24,0.55)", 1.4);
    for (k = -1; k <= 1; k += 2) {
      door(g, MAIN_S - 1.02, MAIN_S + 1.18, rBot(k * 1.12), rBot(k * 1.68), "rgba(16,20,24,0.55)", 1.4);
    }

    /* 6. the M61A2 sits in the starboard wing root: its door over the
          starboard trunk, and the gas stain behind it */
    g.fillStyle = "rgba(30,34,38,0.80)";
    g.fillRect(cu(X(7.85)), rTop(-1.48), 0.75 * PXM, 0.22 * PXM);
    g.fillStyle = "rgba(40,38,36,0.22)";
    g.fillRect(cu(X(9.4)), rTop(-1.44), 1.5 * PXM, 0.30 * PXM);

    /* 7. hot section: the aft body round the nozzles weathers to a warmer,
          darker grey */
    g.globalAlpha = 0.38; g.fillStyle = "#4f4a45";
    g.fillRect(0, rTop(1.4), cu(X(15.8)), rTop(-1.4) - rTop(1.4));
    g.fillRect(0, rBot(1.4), cu(X(15.8)), rBot(-1.4) - rBot(1.4));
    /* on the sides only below the fin roots: the rudders stand over here */
    for (k = 0; k < 2; k++) {
      g.fillRect(0, rSide(Z(FIN_H0 - 0.02), k), cu(X(16.0)), rSide(Z(0.8), k) - rSide(Z(FIN_H0 - 0.02), k));
    }
    g.globalAlpha = 1;

    /* 8. low-visibility insignia: upper port wing, lower starboard wing, and
          both intake trunks, as the type wears them */
    star(g, cu(X(12.0)), rTop(4.9), 0.42 * PXM, "rgba(84,92,98,0.85)");
    star(g, cu(X(12.0)), rBot(-4.9), 0.42 * PXM, "rgba(84,92,98,0.85)");
    for (k = 0; k < 2; k++) star(g, cu(X(9.3)), rSide(Z(1.32), k), 0.20 * PXM, "rgba(84,92,98,0.85)");

    /* 9. fin rudders: the hinge and the lower aft corner */
    g.strokeStyle = "rgba(20,24,28,0.50)"; g.lineWidth = 1.4;
    for (k = 0; k < 2; k++) {
      var ca = Math.cos(FIN_CANT);
      g.beginPath();
      g.moveTo(cu(X(finTE(0.2) - 0.95)), rSide(Z(FIN_H0) + 0.2 * ca, k));
      g.lineTo(cu(X(finTE(1.9) - 0.75)), rSide(Z(FIN_H0) + 1.9 * ca, k));
      g.lineTo(cu(X(finTE(1.9))), rSide(Z(FIN_H0) + 1.9 * ca, k));
      g.stroke();
    }

    /* 10. stencils and walkway lines: unreadable, they read as markings */
    for (i = 0; i < 70; i++) {
      g.fillStyle = R() < 0.85 ? "rgba(200,206,210,0.35)" : "rgba(170,48,38,0.45)";
      g.fillRect(R() * TW, R() * TH, 4 + R() * 12, 2);
    }

    /* 11. belly grime and streaks running aft */
    g.fillStyle = "rgba(34,32,30,0.12)";
    for (i = 0; i < 60; i++) {
      g.fillRect(R() * TW * 0.9, B_BOT + R() * TOPH, 20 + R() * 70, 2 + R() * 4);
    }
    return cv;
  }

  var _tex;
  function sheet() {
    if (_tex !== undefined) return _tex;
    try {
      _tex = new V.CanvasTexture(paintSheet());
      _tex.wrapS = _tex.wrapT = V.ClampToEdgeWrapping;
      _tex.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) _tex.encoding = V.sRGBEncoding;   /* r148 */
    } catch (e) { _tex = false; }
    return _tex;
  }

  /* projected UVs: each triangle into the band its normal faces. Faces that
     look fore or aft would collapse to a line under an x projection, so
     they are laid out along x plus the cross coordinate. */
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
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, R;
        if (band === 0) { U = cu(endOn ? x + y : x); R = rTop(y); }
        else if (band === 3) { U = cu(endOn ? x + y : x); R = rBot(y); }
        else { U = cu(endOn ? x + y : x); R = rSide(z, band === 2); }
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - R / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  /* ========================================================= materials ==
     SKIN: the painted sheet. METAL: gear legs, the nozzle flaps (hot), and
     at full roughness the flat black of a duct, a well or a tyre (ink,
     tyre). GLASS: the canopy. The cockpit tub is dark. The team colour is
     exactly C.team, so eraPaint's team test leaves it alone; the emissive
     keeps it from greying out under ACES. */
  function makeMats(C) {
    var tex = sheet(), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.80, metalness: 0.10,
                                          side: V.DoubleSide });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x768086);
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    /* the F119's nozzle flaps are a burnt, coated grey, darker than the skin */
    m.hot = new V.MeshStandardMaterial({ color: 0x3b3d3f, roughness: 0.58, metalness: 0.45,
                                         side: V.DoubleSide });
    m.ink = new V.MeshStandardMaterial({ color: 0x060708, roughness: 0.95, metalness: 0.03,
                                         side: V.DoubleSide });
    m.tyre = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.dark = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.70, metalness: 0.30 });
    /* the canopy's indium-tin-oxide film photographs gold-bronze from
       outside; dark enough that the tub shows only as a shadow */
    m.glass = new V.MeshStandardMaterial({ color: 0x6a5527, roughness: 0.12, metalness: 0.55,
                                           transparent: true, opacity: 0.84, side: V.DoubleSide });
    return m;
  }

  /* ============================================================ airframe = */
  function addBody(K) {
    var i, rings = [], sec;

    /* forebody: radome, chines and cockpit, run on inside the trunks so the
       intake mouths open beside it and not onto a hole */
    sec = resample(FORE, 18);
    for (i = 0; i < sec.length; i++) rings.push(bodyRing(sec[i]));
    var ext = FORE[FORE.length - 1].slice(); ext[0] = 5.55;
    rings.push(bodyRing(ext));
    K.skin.push(orient(bridge(rings, BODY_SKIP, true, true)));

    /* centre and aft body, from the raked intake lips to the boom ends. Its
       front is left open: the gap between it and the forebody IS the
       intake mouth. */
    rings = [bodyRing(MOUTH, rake)];
    sec = resample(MID, 24);
    for (i = 0; i < sec.length; i++) rings.push(bodyRing(sec[i]));
    var body = bridge(rings, BODY_SKIP, false, true);
    K.skin.push(body);

    /* the duct, a dark plate set 0.35 m inside the lip */
    var plate = bodyRing(MOUTH, function (y, h) { return rake(y, h) + 0.35; });
    K.ink.push(bridge([plate, plate.map(function (q) { return [q[0] - 0.01, q[1], q[2]]; })],
                      null, true, false));
  }

  /* frameless bubble canopy, an open shell sitting on the cockpit sills, and
     the opaque fairing behind it that runs into the spine */
  var CANOPY = [
    [2.55, 0.20, 2.24, 2.27], [2.85, 0.38, 2.26, 2.52], [3.25, 0.48, 2.29, 2.76],
    [3.75, 0.53, 2.33, 2.94], [4.30, 0.555, 2.36, 3.04], [4.85, 0.56, 2.38, 3.05],
    [5.40, 0.54, 2.40, 2.99], [5.90, 0.49, 2.44, 2.89], [6.35, 0.40, 2.50, 2.79]
  ];
  var FAIRING = [
    [5.85, 0.52, 2.40, 2.93], [6.40, 0.46, 2.44, 2.86], [7.10, 0.39, 2.48, 2.79],
    [7.80, 0.31, 2.52, 2.74], [8.60, 0.16, 2.56, 2.71]
  ];
  function arcRing(st, n, closed) {
    var p = [], k, a;
    for (k = 0; k <= n; k++) {
      a = Math.PI * k / n;
      p.push([X(st[0]), st[1] * Math.cos(a), Z(st[2] + (st[3] - st[2]) * Math.pow(Math.sin(a), 0.85))]);
    }
    if (closed) p.push([X(st[0]), 0, Z(st[2] - 0.06)]);
    return p;
  }
  function addCanopy(K) {
    var i, r = [];
    var sec = resample(CANOPY, 16);
    for (i = 0; i < sec.length; i++) r.push(arcRing(sec[i], 14, false));
    K.glass.push(bridge(r, null, false, false, true));
    r = [];
    for (i = 0; i < FAIRING.length; i++) r.push(arcRing(FAIRING[i], 14, true));
    K.skin.push(orient(bridge(r, null, true, true)));

    /* the cockpit: tub, coaming over the panel, seat, pilot */
    K.dark.push(boxG(2.30, 0.84, 0.30, X(4.10), 0, Z(2.12)));
    K.dark.push(boxG(0.28, 0.66, 0.18, X(3.05), 0, Z(2.36)));
    K.dark.push(boxG(0.14, 0.52, 0.62, X(5.05), 0, Z(2.58)));
    K.dark.push(boxG(0.20, 0.36, 0.22, X(5.08), 0, Z(2.95)));
    K.dark.push(boxG(0.30, 0.44, 0.36, X(4.80), 0, Z(2.50)));
    var helm = new V.SphereGeometry(0.15, 10, 7);
    helm.translate(X(4.78), 0, Z(2.84));
    K.metal.push(helm);
  }

  function addWings(K) {
    var yk = tipKink();
    var ys = [1.95, 2.7, 3.5, 4.3, 5.1, yk, (yk + SEMI) / 2, SEMI], i, r = [];
    for (i = 0; i < ys.length; i++) {
      var y = ys[i];
      r.push(foil(wingLE(y), wingTEo(y), y, wingH(y), wingTC(y), 11));
    }
    K.skin.push(orient(bridge(r, null, true, true)));
    K.skin.push(orient(bridge(mirrorRings(r), null, true, true)));
  }

  function addTails(K) {
    /* stabilators */
    /* the root rib, inside the boom ahead of its end, shows only behind it */
    var ys = [ST_IN, 2.0, 2.35, ST_NOTCH, ST_KINK, 3.45, 3.95, ST_TIP], i, r = [];
    for (i = 0; i < ys.length; i++) {
      var f = Math.max(0, (ys[i] - 2.0) / (ST_TIP - 2.0));
      r.push(foil(stabLE(ys[i]), stabTE(ys[i]), ys[i], ST_H, 0.045 - 0.012 * f, 9));
    }
    K.skin.push(orient(bridge(r, null, true, true)));
    K.skin.push(orient(bridge(mirrorRings(r), null, true, true)));

    /* fins */
    var hs = [-0.30, 0.35, 1.05, 1.75, 2.45, 2.90, FIN_SPAN];
    for (var side = -1; side <= 1; side += 2) {
      r = [];
      for (i = 0; i < hs.length; i++) {
        r.push(finFoil(hs[i], 0.050 - 0.015 * Math.max(0, hs[i]) / FIN_SPAN, 9, side));
      }
      K.skin.push(orient(bridge(r, null, true, true)));
    }
  }

  /* 2-D thrust-vectoring nozzles: boxy convergent-divergent flaps, side by
     side, with the dark throat set back inside */
  function addNozzles(K) {
    var st = [[16.20, 0.50, 0.36], [16.80, 0.48, 0.35], [17.30, 0.455, 0.33], [17.62, 0.43, 0.30]];
    for (var side = -1; side <= 1; side += 2) {
      var r = [], i;
      for (i = 0; i < st.length; i++) r.push(rrect(X(st[i][0]), side * 0.71, Z(1.87), st[i][1], st[i][2], 24, 0.28));
      K.hot.push(bridge(r, null, false, false));
      var th = rrect(X(17.38), side * 0.71, Z(1.87), 0.44, 0.32, 24, 0.28);
      K.ink.push(bridge([th, th.map(function (q) { return [q[0] - 0.01, q[1], q[2]]; })], null, true, false));
    }
  }

  /* team colour: a band round the top of each fin (the squadrons paint
     theirs there too) and one round each wing near the tip, so ownership
     reads from above as well as from the side */
  function addFlash(K) {
    var side, r, i;
    for (side = -1; side <= 1; side += 2) {
      r = [];
      var hs = [2.78, 3.06, FIN_SPAN];
      for (i = 0; i < hs.length; i++) {
        r.push(finFoil(Math.min(hs[i], FIN_SPAN), (0.050 - 0.015 * hs[i] / FIN_SPAN) * 1.10, 9, side, 0.02));
      }
      r[r.length - 1] = r[r.length - 1].map(function (q) {
        return [q[0], q[1] + side * 0.02 * Math.sin(FIN_CANT), q[2] + 0.02 * Math.cos(FIN_CANT)];
      });
      K.team.push(orient(bridge(r, null, true, true)));
    }
    r = [];
    /* a ring at the tip's kink too when the band spans it, so the band
       follows the cut trailing edge instead of cutting across it */
    var yk = tipKink(), yb = yk > 5.32 && yk < 5.83 ? [5.30, yk, 5.85] : [5.30, 5.85];
    for (i = 0; i < yb.length; i++) {
      r.push(foil(wingLE(yb[i]), wingTEo(yb[i]), yb[i], wingH(yb[i]), wingTC(yb[i]) * 1.10, 11, 0.02));
    }
    K.team.push(orient(bridge(r, null, true, true)));
    K.team.push(orient(bridge(mirrorRings(r), null, true, true)));
  }

  /* ================================================================ gear ==
     Tricycle, placed from the 3-view's side view, which the Nellis taxi
     photograph scaled to the 18.92 m length agrees with: a single nose
     wheel 5.72 m aft of the radome tip and the mains 11.82 m (a 6.1 m
     wheelbase), on a 3.24 m track at the trunk bottom corners; tyres about
     0.6 m and 0.94 m across, scaled off the same two. Each leg's top is set
     into the belly where it stands (bellyH). */
  var NOSE_S = 5.72, MAIN_S = 11.82;
  /* belly height at station s: the MID table's belly corners (column 6),
     and the intake floor's 0.93 m ahead of it */
  function bellyH(s) {
    if (s <= MID[0][0]) return MID[0][6];
    for (var i = 1; i < MID.length; i++) {
      if (s <= MID[i][0]) {
        var t = (s - MID[i - 1][0]) / (MID[i][0] - MID[i - 1][0]);
        return MID[i - 1][6] + t * (MID[i][6] - MID[i - 1][6]);
      }
    }
    return MID[MID.length - 1][6];
  }
  function addGear(G) {
    var nr = 0.30, mr = 0.47, n = NOSE_S, m = MAIN_S, hn = bellyH(n) + 0.03;
    /* nose leg, fork, wheel, landing light, and the two long doors */
    G.metal.push(rod([X(n - 0.18), 0, Z(hn)], [X(n - 0.06), 0, Z(0.42)], 0.07, 8));
    G.metal.push(rod([X(n - 0.06), 0.12, Z(0.48)], [X(n), 0.12, Z(nr)], 0.035, 6));
    G.metal.push(rod([X(n - 0.06), -0.12, Z(0.48)], [X(n), -0.12, Z(nr)], 0.035, 6));
    G.metal.push(boxG(0.10, 0.28, 0.08, X(n - 0.06), 0, Z(0.50)));
    G.metal.push(rod([X(n - 0.36), 0, Z(hn)], [X(n - 0.10), 0, Z(0.62)], 0.03, 6));
    G.tyre.push(wheelG(nr, 0.19, X(n), 0, Z(nr), 18));
    G.metal.push(wheelG(0.13, 0.20, X(n), 0, Z(nr), 10));
    G.metal.push(boxG(0.10, 0.12, 0.10, X(n - 0.24), 0, Z(0.74)));
    for (var k = -1; k <= 1; k += 2) {
      G.skin.push(boxG(1.30, 0.035, 0.46, X(n - 0.06), k * 0.29, Z(hn - 0.22)));
    }
    /* nose well */
    G.ink.push(boxG(1.30, 0.50, 0.04, X(n - 0.06), 0, Z(hn - 0.06)));

    /* mains: leg, side brace, axle, wheel, the big door hanging outboard
       (its top let into the trunk's lower flank) and the well, tilted to
       the belly as it rises aft */
    var hm = bellyH(m) + 0.03, wTilt = Math.atan2(bellyH(m + 1.05) - bellyH(m - 1.05), 2.10);
    for (var s = -1; s <= 1; s += 2) {
      G.metal.push(rod([X(m - 0.15), s * 1.38, Z(hm)], [X(m), s * 1.46, Z(0.50)], 0.09, 8));
      G.metal.push(rod([X(m + 0.65), s * 1.08, Z(bellyH(m + 0.65) + 0.03)], [X(m), s * 1.42, Z(0.64)], 0.045, 6));
      G.metal.push(rod([X(m - 0.70), s * 1.20, Z(bellyH(m - 0.70) + 0.03)], [X(m - 0.05), s * 1.42, Z(0.66)], 0.04, 6));
      G.metal.push(rod([X(m), s * 1.42, Z(mr)], [X(m), s * 1.64, Z(mr)], 0.06, 8));
      G.tyre.push(wheelG(mr, 0.29, X(m), s * 1.62, Z(mr), 20));
      G.metal.push(wheelG(0.22, 0.30, X(m), s * 1.62, Z(mr), 12));
      G.skin.push(boxG(2.00, 0.035, 0.84, X(m + 0.05), s * 1.80, Z(0.84), wTilt));
      G.ink.push(boxG(2.10, 0.52, 0.04, X(m + 0.05), s * 1.36, Z(bellyH(m + 0.05) - 0.012), wTilt));
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

  /* semi: the half-span to draw (THE SPAN, above) */
  function build(THREE, M, C, semi) {
    V = THREE;
    SEMI = semi || REAL_SEMI;
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    var K = { skin: [], team: [], metal: [], hot: [], ink: [], dark: [], glass: [] };
    var G = { skin: [], metal: [], tyre: [], ink: [] };
    addBody(K);
    addCanopy(K);
    addWings(K);
    addTails(K);
    addNozzles(K);
    addFlash(K);
    addGear(G);

    var mats = makeMats(C);
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

/* Both rows are the F-22A (see NO VARIANT above); they differ only in the
   drawn span (see THE SPAN above). len is the measured X extent: radome
   tip to the aftmost point of the stabilators. */
UNIT_MODELS["stealth_n"] = {
  len: 18.92,
  build: function (THREE, M, C) { return HeroF22.build(THREE, M, C, 6.60); }
};
UNIT_MODELS["nato_e00_fighter"] = {
  len: 18.92,
  build: function (THREE, M, C) { return HeroF22.build(THREE, M, C, 6.78); }
};
