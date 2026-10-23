/* ============ us_f9f_cougar.js -- GRUMMAN F9F-8 COUGAR (HERO MODEL) ============

   The Navy's swept-wing Grumman of the mid-fifties, for the one row that flies
   it: nato_e50_cfighter, "F9F-8 Cougar". No other row draws a Cougar or a
   Panther (the Sea Hawk and the Aquilon are other aeroplanes). Until now the
   row had no model of its own and borrowed the first same-role peer,
   cfighter_n, the F/A-18E hero.

   THE DRAWING. "Grumman F9F-8 Cougar 3-view line drawing.png" (Wikimedia
   Commons): the Bureau of Aeronautics "Descriptive Arrangement F9F-8" of
   15 October 1956, with its own figures:
     span 414 in (34 ft 6 in, 10.52 m); folded span 188 in (15 ft 8 in,
     4.78 m); tailplane span 170 in (14 ft 2 in, 4.32 m); length 548.357 in
     (45 ft 8.4 in, 13.93 m) from the tip of the nose refuelling probe to the
     tailplane bullet; height 146.88 in (12 ft 2.9 in, 3.73 m) in the ground
     attitude; main track 99 in (8 ft 3 in, 2.51 m); tyres 18 x 5.50 in (nose)
     and 24 x 5.50 in (mains).
   Every station below was read off it, the side view at 66.4 px to the metre
   and the plan and front views at 67.3 (the scan is 1.3% wider than long).
   Stations s are metres aft of the probe tip; z is metres above the
   fuselage datum, the dash-dot line of the side view.

   PHOTOGRAPHS (Commons): "F9F-8 Cougar of VF-61 aboard USS Intrepid (CVA-11)
   on 25 April 1956" (deck, high front three-quarter, the starboard wing
   folded); "F9F-8 Cougar of VF-81 on USS Intrepid (CVA-11) in 1958" (side,
   on deck); "Grumman F9F-8 Cougar of VA-46, in 1956" (side, gear down);
   "F9F-8 Cougar in flight front view c1956" (head-on from above: the fences);
   "F8F-8 Cougar in flight with bombs in late 1950s" (from above, starboard);
   "Grumman (F9F-8) AF-9J Cougar, Intrepid Sea, Air and Space Museum" and
   "Grumman F9F-8 Cougar, Seattle Museum Of Flight" (both wings folded);
   "F9F-8 Cougar BuNo 131230 (National Naval Aviation Museum)" (colour: gull
   grey over white, the white rudder).

   WHAT MAKES IT A COUGAR AT RTS ZOOM (each on the references above)
     1. The swept wing, 38 deg at the leading edge, with the -8's extended
        leading edge: the chord grows forward, and at the fence the outer
        leading edge stands 0.10 m ahead of the inner one, the dogtooth
        (drawing plan view; Wikipedia's F9F-8 section: "greater chord ... and
        a dogtooth").                                   [wing tables, LE_OUT]
     2. One wing fence a side at y 2.33 m, wrapping round the leading edge
        (drawing plan view line; the head-on and bombs photographs).  [fence]
     3. The wing-root intakes: a blunt glove each side whose face is the
        intake, a rounded triangle tallest against the fuselage (drawing
        front view; VF-81, NNAM).                         [glove, mouths]
     4. The bubble canopy far forward, with a dark anti-glare panel ahead of
        the windscreen (all deck photographs).            [canopy, sheet]
     5. The -8's long fuselage, round in section, and the nose refuelling
        probe on the centreline (drawing side and plan views; VF-61,
        VF-81, bombs photograph).                         [BODY, probe]
     6. The swept fin with its long curved dorsal fillet and the tailplane
        set half way up it on a bullet fairing, the jet pipe exit under the
        fin and the fin root running on aft over it (drawing side view).
                                                          [FIN, tail]
     7. The stowed arrester hook under the tail, its point behind the jet
        pipe (drawing side view).                         [hook]
     8. Folding outer wings: the fold line runs fore and aft at y 1.58 m, the
        inboard line of the plan view, just outboard of the intake glove; the
        panels stand up leaning a little outward, 188 in across the tips
        (drawing front view; VF-61, Intrepid and Seattle photographs). A
        "wingfold" group each side, turned 80 deg on a deck by render3d.js.
     9. Tricycle gear: a long single nose leg under the cockpit, the mains
        under the gloves on a 2.51 m track (drawing; VA-46).     [gear]
    10. Gull grey over white: light gull grey on top, insignia white below and
        on the rudder (NNAM colour photograph), the national star-and-bar on
        the upper starboard wing as the deck and bombs photographs show it.

   THE STANCE. On the ground the Cougar sits 5 deg nose up on its long nose
   leg (the drawing's ground line). Every hero is drawn in its flying
   attitude, so the fuselage datum is level here and the nose leg is cut
   0.35 m so that all three tyres stand on one plane, 1.385 m under the
   datum, where the drawing has the main tyres. Measured that way the fin top
   is 4.39 m above the ground, which is the drawing's 3.73 m with the tail
   lifted back up out of the ground attitude.

   NOT DRAWN, OR NOT CONFIRMED. The row's HVAR rockets and two 1,000 lb bombs:
   the drawing hangs its stores on three pylons a side on the folding panels
   (the inboard one 1.80 m out, outboard of the fold), so loaded they would
   fold with the wing and the published 188 in folded span is a clean
   figure; the deck photographs show the Cougar clean, and that is how it is
   drawn. The catapult hook and holdback, the spoilers and the speed brakes
   are painted lines, not parts. Squadron markings, modex, serials and the
   VF-61/VF-81 decorations are not drawn. The underside insignia is not
   drawn: no reference shows the Cougar's lower surface. That the elevators
   are white like the rudder rests on the NNAM photograph only.

   Model space: +X nose, +Y port, +Z up, metres; the fuselage datum is z = 0
   and the tyres stand at z = ZG. X runs from the probe tip (+6.965) to the
   tailplane bullet (-6.965): the measured X extent is the drawing's 13.93 m.
   Budget: one textured skin, team, ink, metal and glass mesh, one skin mesh
   in each of the two wingfold groups, and the gear group's metal, tyres and
   doors: 10 draw calls.
   ========================================================================= */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroF9F = (function () {
  "use strict";

  var V = null;                 /* THREE, set by build()                     */
  var D2R = Math.PI / 180;
  var L = 13.93, XC = L / 2;    /* probe tip to tailplane bullet            */
  var ZG = -1.385;              /* tyre bottoms (the drawing's main tyres)  */
  var YH = 1.58;                /* the wing-fold hinge line, either side    */
  var FOLD = 80.7;               /* degrees the outer panel turns up         */

  function X(s) { return XC - s; }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
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

  /* ============================================================ tables ==
     Fuselage stations [s, half-width, z of the widest line, top z, belly z,
     top exponent, belly exponent] from the side and plan views. Under the
     canopy the top is the cockpit sill. */
  var BODY = [
    [ 1.22, 0.040, -0.06, -0.02, -0.10, 1.00, 1.00],
    [ 1.32, 0.150, -0.05,  0.05, -0.20, 1.00, 1.00],
    [ 1.50, 0.250, -0.04,  0.14, -0.31, 1.00, 1.00],
    [ 1.80, 0.330, -0.03,  0.25, -0.42, 1.00, 1.00],
    [ 2.20, 0.400, -0.02,  0.37, -0.51, 1.00, 1.00],
    [ 2.70, 0.475,  0.00,  0.49, -0.58, 1.00, 1.00],
    [ 3.20, 0.540,  0.00,  0.59, -0.63, 1.00, 1.00],
    [ 3.70, 0.590,  0.02,  0.66, -0.67, 0.95, 1.00],
    [ 4.30, 0.635,  0.03,  0.66, -0.69, 0.85, 1.00],
    [ 5.00, 0.680,  0.03,  0.69, -0.72, 0.85, 1.00],
    [ 5.70, 0.715,  0.04,  0.77, -0.75, 0.90, 1.00],
    [ 6.40, 0.735,  0.05,  0.86, -0.76, 1.00, 1.00],
    [ 7.20, 0.745,  0.05,  0.88, -0.77, 1.00, 1.00],
    [ 8.20, 0.740,  0.05,  0.86, -0.74, 1.00, 1.00],
    [ 9.20, 0.715,  0.05,  0.86, -0.68, 1.00, 1.00],
    [10.20, 0.640,  0.03,  0.80, -0.61, 1.00, 1.00],
    [11.10, 0.520,  0.00,  0.60, -0.53, 1.00, 1.00],
    [11.85, 0.430, -0.03,  0.40, -0.45, 1.00, 1.00]
  ];
  /* the intake gloves, one lens across both sides (the fuselage hides the
     middle): [s, half-width, z of the edge, top z, bottom z, exponents]. The
     front face at s 5.05 is the intake face; aft of the wing the lens is the
     trailing fillet the plan view runs from y 1.6 m at s 9.5 to the jet pipe */
  var GLOVE = [
    [ 5.05, 1.45, -0.06, 0.20, -0.42, 1.00, 1.00],
    [ 5.25, 1.54, -0.07, 0.19, -0.44, 1.00, 1.00],
    [ 5.70, 1.67, -0.08, 0.16, -0.45, 1.00, 1.00],
    [ 6.60, 1.74, -0.09, 0.13, -0.45, 1.00, 1.00],
    [ 7.80, 1.74, -0.10, 0.11, -0.43, 1.00, 1.00],
    [ 8.90, 1.66, -0.10, 0.09, -0.40, 1.00, 1.00],
    [ 9.60, 1.45, -0.10, 0.06, -0.36, 1.00, 1.00],
    [10.40, 1.05, -0.10, 0.04, -0.32, 1.00, 1.00],
    [11.20, 0.66, -0.10, 0.02, -0.28, 1.00, 1.00],
    [11.80, 0.42, -0.08, 0.00, -0.24, 1.00, 1.00]
  ];
  /* wing: sections at fixed y. [y, LE s, TE s, thickness m, chord-plane z].
     Inner (fixed) to the hinge, then the folding panel. The two sections at
     2.33 / 2.335 are the dogtooth: the extended outer leading edge starts at
     the fence 0.10 m ahead of the inner one. */
  var WING_IN = [
    [0.70, 5.30, 11.00, 0.50, -0.12],
    [1.10, 5.20, 10.40, 0.46, -0.12],
    [YH,   5.45,  9.45, 0.40, -0.12]
  ];
  var WING_OUT = [
    [YH,    5.45,  9.45, 0.400, -0.120],
    [1.90,  5.92,  9.30, 0.330, -0.115],
    [2.330, 6.38,  9.40, 0.290, -0.110],
    [2.335, 6.28,  9.40, 0.295, -0.110],
    [3.00,  6.80,  9.72, 0.270, -0.100],
    [3.80,  7.42, 10.05, 0.240, -0.090],
    [4.60,  8.05, 10.38, 0.210, -0.080],
    [5.08,  8.43, 10.58, 0.190, -0.072],
    [5.21,  8.58, 10.56, 0.140, -0.070],
    [5.258, 8.86, 10.42, 0.060, -0.070]
  ];
  var YFENCE = 2.30;
  /* tailplane on the fin at z 1.48, 3 deg of dihedral; bullet to s 13.93 */
  var TP = { y0: 0.10, tip: 2.159, le0: 11.62, leK: 0.715, te0: 13.00, teK: 0.37, z: 1.48, dih: 3, th0: 0.13, th1: 0.05 };
  /* fin: sections at fixed z. [z, LE s, TE s, thickness]. The lowest runs
     aft of the jet pipe as the fin root over it (s 11.85 to 13.45) */
  var FIN = [
    [0.38,  9.20, 12.00, 0.22],
    [0.72,  9.25, 13.45, 0.24],
    [0.86,  9.30, 13.45, 0.25],
    [1.00,  9.95, 13.45, 0.23],
    [1.30, 10.50, 13.45, 0.20],
    [1.60, 11.00, 13.27, 0.18],
    [2.05, 11.50, 13.15, 0.15],
    [2.50, 12.00, 13.07, 0.12],
    [2.85, 12.40, 13.02, 0.09],
    [2.97, 12.62, 12.98, 0.05]
  ];
  /* canopy [s, half-width, sill z, crown z] */
  var CANOPY = [
    [3.58, 0.28, 0.66, 0.68], [3.90, 0.38, 0.65, 0.88], [4.30, 0.42, 0.65, 1.06],
    [4.90, 0.43, 0.67, 1.13], [5.50, 0.40, 0.73, 1.10], [6.00, 0.32, 0.80, 1.02],
    [6.50, 0.16, 0.87, 0.93], [6.80, 0.05, 0.88, 0.89]
  ];
  var GEAR = { ns: 3.52, nr: 0.229, nw: 0.14, ms: 7.56, my: 1.258, mr: 0.305, mw: 0.15 };

  /* ============================================================ helpers == */
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
        row.push(cr1(tab[Math.max(0, k - 1)][c], tab[k][c], tab[k + 1][c], tab[Math.min(m - 1, k + 2)][c], t));
      }
      out.push(row);
    }
    return out;
  }
  /* a section N points round, superellipse above and below its widest line */
  function ringAt(st, N, yOff) {
    var P = [], i, a, c, s, e;
    for (i = 0; i < N; i++) {
      a = i / N * Math.PI * 2; c = Math.cos(a); s = Math.sin(a);
      e = s >= 0 ? st[5] : st[6];
      var y = st[1] * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e);
      var z = s >= 0 ? st[2] + (st[3] - st[2]) * Math.pow(s, e) : st[2] - (st[2] - st[4]) * Math.pow(-s, e);
      P.push([X(st[0]), y + (yOff || 0), z]);
    }
    return P;
  }
  /* bridge rings of equal length with quads; caps are fans */
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
  function closed(rings) { return orient(bridge(rings, true, true)); }
  function mirrorRings(rings) {
    return rings.map(function (r) { return r.map(function (q) { return [q[0], -q[1], q[2]]; }); });
  }
  /* NACA 64A-series-like half thickness (four-digit form, close enough at 10%) */
  function yt(f, tc) {
    return tc * (1.4845 * Math.sqrt(f) - 0.6300 * f - 1.7580 * f * f + 1.4215 * f * f * f - 0.5075 * f * f * f * f);
  }
  /* aerofoil ring in a plane of constant y: TE over the top to the LE and back
     under; th the thickest point in metres, zc the chord plane */
  function foilY(sLE, sTE, y, zc, th, m, grow) {
    var p = [], i, f, g = grow || 0, c = sTE - sLE, tc = th / c, xl = X(sLE) + g, cc = c + 2 * g;
    for (i = 0; i <= m; i++) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push([xl - f * cc, y, zc + yt(f, tc) * c + (i === 0 ? 0.003 : 0) + (g ? 0.02 : 0)]);
    }
    for (i = m - 1; i >= 1; i--) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push([xl - f * cc, y, zc - yt(f, tc) * c - (g ? 0.02 : 0)]);
    }
    return p;
  }
  /* the same in a plane of constant z (the fin), y the thickness direction */
  function foilZ(sLE, sTE, z, th, m, grow) {
    var p = [], i, f, g = grow || 0, c = sTE - sLE, tc = th / c, xl = X(sLE) + g, cc = c + 2 * g;
    for (i = 0; i <= m; i++) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push([xl - f * cc, yt(f, tc) * c + (i === 0 ? 0.003 : 0) + (g ? 0.018 : 0), z]);
    }
    for (i = m - 1; i >= 1; i--) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push([xl - f * cc, -yt(f, tc) * c - (g ? 0.018 : 0), z]);
    }
    return p;
  }

  var _m4 = null, _q = null, _v = null, _u = null;
  function boxG(sx, sy, sz, x, y, z) {
    var g = new V.BoxGeometry(sx, sy, sz);
    g.translate(x, y, z);
    return g;
  }
  function rod(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var Ln = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r, r, Ln, seg || 8);
    _q.setFromUnitVectors(_u.set(0, 1, 0), _v.set(dx / Ln, dy / Ln, dz / Ln));
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
  /* body of revolution along x, prof [[s, r]...] nose first, at (y, z) */
  function revS(prof, y, z, seg) {
    var rings = [], i, k;
    for (i = 0; i < prof.length; i++) {
      var ring = [], r = Math.max(prof[i][1], 0.004);
      for (k = 0; k < seg; k++) {
        var a = k / seg * Math.PI * 2;
        ring.push([X(prof[i][0]), y + r * Math.cos(a), z + r * Math.sin(a)]);
      }
      rings.push(ring);
    }
    return closed(rings);
  }

  /* ============================================================= paint ==
     One sheet, four plan views at 68 px to the metre: from above, from port,
     from starboard, from below. Each skin triangle takes its UVs by
     projection into the band its normal faces (projUV), so the paint lies
     where it lies on the aeroplane. Light gull grey (FS 36440) above, insignia
     white (FS 17875) below and on the rudder and elevators, the line between
     them along the fuselage at the datum, as the photographs show it. */
  var PXM = 68, TW = 1024, TH = 2048, YMAX = 5.40, TOPH = 734, SIDEH = 282;
  var B_PORT = TOPH, B_STBD = TOPH + SIDEH, B_BOT = TOPH + 2 * SIDEH;
  var XMIN = -7.25, ZTOP = 3.15;
  var GREY = "#a0a4a3", WHITE = "#e3e4e0", LINE = "rgba(40,46,50,0.42)";
  function cu(x) { return clamp((x - XMIN) * PXM, 1, TW - 1); }
  function rTop(y) { return clamp((YMAX - y) * PXM, 1, TOPH - 1); }
  function rBot(y) { return B_BOT + clamp((YMAX - y) * PXM, 1, TOPH - 1); }
  function rSide(z, stbd) { return (stbd ? B_STBD : B_PORT) + clamp((ZTOP - z) * PXM, 1, SIDEH - 1); }
  function cs(s) { return cu(X(s)); }
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function line(g, x0, y0, x1, y1) { g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); }
  function zig(g, x0, y0, x1, y1, amp, wave) {
    var dx = x1 - x0, dy = y1 - y0, Ln = Math.sqrt(dx * dx + dy * dy);
    if (Ln < 1) return;
    var ux = dx / Ln, uy = dy / Ln, nx = -uy, ny = ux, n = Math.max(2, Math.round(Ln / wave)), i;
    g.beginPath();
    for (i = 0; i <= n; i++) {
      var t = i / n * Ln, s = (i === 0 || i === n) ? 0 : (i % 2 ? amp : -amp);
      if (i === 0) g.moveTo(x0 + ux * t + nx * s, y0 + uy * t + ny * s);
      else g.lineTo(x0 + ux * t + nx * s, y0 + uy * t + ny * s);
    }
    g.stroke();
  }
  function poly(g, pts, fill) {
    g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
    g.closePath(); g.fillStyle = fill; g.fill();
  }
  function disc(g, u, v, r, col) {
    g.fillStyle = col; g.beginPath(); g.arc(u, v, r, 0, Math.PI * 2); g.closePath(); g.fill();
  }
  /* the star-and-bar of 1947 on, in its own colours (insignia blue, white,
     red): the star's point forward (+u), the bars spanwise (along v) */
  function insignia(g, u, v, r) {
    var i, a;
    g.fillStyle = "#24345e";
    disc(g, u, v, r * 1.12, "#24345e");
    g.fillRect(u - r * 0.58, v - r * 2.12, r * 1.16, r * 4.24);
    disc(g, u, v, r, WHITE);
    g.fillStyle = WHITE;
    g.fillRect(u - r * 0.46, v - r * 2.0, r * 0.92, r * 4.0);
    g.fillStyle = "#a8312c";
    g.fillRect(u - r * 0.15, v - r * 2.0, r * 0.30, r * 0.92);
    g.fillRect(u - r * 0.15, v + r * 1.08, r * 0.30, r * 0.92);
    disc(g, u, v, r * 0.86, "#24345e");
    g.fillStyle = WHITE;
    g.beginPath();
    for (i = 0; i < 10; i++) {
      a = i * Math.PI / 5;
      var rr = i % 2 ? r * 0.33 : r * 0.84;
      if (i === 0) g.moveTo(u + rr * Math.cos(a), v + rr * Math.sin(a));
      else g.lineTo(u + rr * Math.cos(a), v + rr * Math.sin(a));
    }
    g.closePath(); g.fill();
  }
  function wLE(y) { return lin(WING_OUT.map(function (r) { return [r[0], r[1]]; }), y); }
  function wTE(y) { return lin(WING_OUT.map(function (r) { return [r[0], r[2]]; }), y); }

  function paintSheet() {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), R = rngFor(1956), i, k, y, s, rows;

    /* 1. the scheme: grey on top and down the sides to the datum, white below */
    g.fillStyle = GREY; g.fillRect(0, 0, TW, B_BOT);
    g.fillStyle = WHITE; g.fillRect(0, B_BOT, TW, TH - B_BOT);
    for (k = 0; k < 2; k++) g.fillRect(0, rSide(-0.05, k), TW, rSide(-1.0, k) - rSide(-0.05, k) + 2);
    /* the rudder (both sides of the fin, above and below the tailplane) and
       the elevators, white (NNAM) */
    for (k = 0; k < 2; k++) {
      poly(g, [[cs(12.62), rSide(2.97, k)], [cs(13.02), rSide(2.90, k)], [cs(13.30), rSide(1.56, k)], [cs(12.88), rSide(1.56, k)]], WHITE);
      poly(g, [[cs(12.90), rSide(1.40, k)], [cs(13.46), rSide(1.40, k)], [cs(13.46), rSide(0.74, k)], [cs(12.95), rSide(0.70, k)]], WHITE);
    }
    for (k = -1; k <= 1; k += 2) {
      var e0 = TP.y0 + 0.12, e1 = TP.tip - 0.08;
      poly(g, [[cs(TP.te0 - 0.36), rTop(k * e0)], [cs(TP.te0 + (e1 - TP.y0) * TP.teK - 0.24), rTop(k * e1)],
               [cs(TP.te0 + (e1 - TP.y0) * TP.teK), rTop(k * e1)], [cs(TP.te0), rTop(k * e0)]], WHITE);
    }

    /* 2. a little weathering: neighbouring panels a shade apart */
    for (i = 0; i < 60; i++) {
      var al = (0.018 + R() * 0.022).toFixed(3);
      g.fillStyle = R() < 0.5 ? "rgba(109,116,118," + al + ")" : "rgba(208,212,212," + al + ")";
      g.fillRect(R() * TW, R() * B_BOT, 14 + R() * 50, 6 + R() * 20);
    }

    /* 3. the anti-glare panel ahead of the windscreen, its sides down to the
          canopy sill line */
    g.fillStyle = "#2b2f2c";
    poly(g, [[cs(2.25), rTop(0.20)], [cs(3.60), rTop(0.42)], [cs(3.60), rTop(-0.42)], [cs(2.25), rTop(-0.20)]], "#2b2f2c");
    for (k = 0; k < 2; k++) poly(g, [[cs(2.25), rSide(0.42, k)], [cs(3.60), rSide(0.66, k)], [cs(3.60), rSide(0.56, k)], [cs(2.40), rSide(0.36, k)]], "#2b2f2c");

    /* 4. fuselage frames and the access panels, both sides and on top */
    g.strokeStyle = LINE; g.lineWidth = 1.1;
    var fr = [1.40, 2.20, 3.55, 6.60, 7.60, 8.70, 9.80, 10.80, 11.50];
    for (i = 0; i < fr.length; i++) {
      s = fr[i];
      for (k = 0; k < 2; k++) zig(g, cs(s), rSide(0.95, k), cs(s), rSide(-0.85, k), 1.8, 7);
      zig(g, cs(s), rTop(0.75), cs(s), rTop(-0.75), 1.8, 7);
      zig(g, cs(s), rBot(0.75), cs(s), rBot(-0.75), 1.8, 7);
    }
    for (k = 0; k < 2; k++) {
      line(g, cs(1.5), rSide(0.05, k), cs(11.7), rSide(0.05, k));
      g.strokeRect(cs(2.6), rSide(0.30, k), (3.40 - 2.6) * PXM, 0.36 * PXM);   /* gun bay doors */
      g.strokeRect(cs(7.4), rSide(0.70, k), (8.6 - 7.4) * PXM, 0.30 * PXM);
    }
    /* the rear-fuselage break, where the tail comes off for an engine change
       (the plan view's line across the fuselage at s 9.0) */
    zig(g, cs(9.0), rTop(1.62), cs(9.0), rTop(-1.62), 1.8, 7);
    /* the canopy rails along the spine */
    for (k = -1; k <= 1; k += 2) line(g, cs(6.6), rTop(k * 0.30), cs(8.8), rTop(k * 0.22));
    /* four 20 mm gun ports, two each side of the nose */
    g.fillStyle = "rgba(18,20,22,0.92)";
    for (k = 0; k < 2; k++) {
      disc(g, cs(1.62), rSide(-0.20, k), 3.2, "rgba(18,20,22,0.92)");
      disc(g, cs(1.70), rSide(-0.31, k), 3.2, "rgba(18,20,22,0.92)");
    }
    /* the exhaust soot round the jet pipe and under the fin root */
    g.fillStyle = "rgba(63,58,53,0.32)";
    for (k = 0; k < 2; k++) g.fillRect(cs(13.4), rSide(0.70, k), (13.4 - 11.2) * PXM, 1.2 * PXM);
    g.fillRect(cs(12.2), rBot(0.45), (12.2 - 10.8) * PXM, 0.9 * PXM);

    /* 5. wings: the fold line, the fence, the flap and spoiler lines, ribs;
          both skins */
    rows = [rTop, rBot];
    for (k = -1; k <= 1; k += 2) {
      for (i = 0; i < 2; i++) {
        var row = rows[i];
        g.strokeStyle = "rgba(30,34,38,0.62)"; g.lineWidth = 1.6;
        line(g, cs(wLE(YH) + 0.05), row(k * YH), cs(wTE(YH) - 0.05), row(k * YH));          /* the fold */
        g.strokeStyle = LINE; g.lineWidth = 1.2;
        /* flaps inboard, the outer trailing-edge surface outboard */
        g.beginPath();
        g.moveTo(cs(wTE(1.70) - 0.85), row(k * 1.70));
        g.lineTo(cs(wTE(3.30) - 0.75), row(k * 3.30));
        g.lineTo(cs(wTE(5.00) - 0.55), row(k * 5.00)); g.stroke();
        line(g, cs(wTE(3.30) - 0.75), row(k * 3.30), cs(wTE(3.30)), row(k * 3.30));
        line(g, cs(wTE(1.70) - 0.85), row(k * 1.70), cs(wTE(1.70)), row(k * 1.70));
        /* the leading-edge tanks' panel line, behind the extended edge */
        line(g, cs(wLE(2.4) + 0.42), row(k * 2.4), cs(wLE(5.0) + 0.30), row(k * 5.0));
        for (y = 2.9; y < 5.0; y += 0.62) zig(g, cs(wLE(y) + 0.45), row(k * y), cs(wTE(y) - 0.8), row(k * y), 1.3, 7);
      }
      /* the spoilers on the upper skin, from the fence to near the tip */
      g.strokeStyle = "rgba(30,34,38,0.55)"; g.lineWidth = 1.4;
      line(g, cs(wLE(2.45) + 0.62 * (wTE(2.45) - wLE(2.45))), rTop(k * 2.45), cs(wLE(4.95) + 0.62 * (wTE(4.95) - wLE(4.95))), rTop(k * 4.95));
      line(g, cs(wLE(2.45) + 0.68 * (wTE(2.45) - wLE(2.45))), rTop(k * 2.45), cs(wLE(4.95) + 0.68 * (wTE(4.95) - wLE(4.95))), rTop(k * 4.95));
      /* the black walkway on the glove beside the fuselage */
      g.strokeStyle = "rgba(20,22,24,0.55)"; g.lineWidth = 1.2;
      g.strokeRect(cs(8.7), rTop(k > 0 ? 1.45 : -0.85), (8.7 - 6.4) * PXM, 0.60 * PXM);
      /* the main gear doors and wells, underneath */
      g.strokeStyle = "rgba(20,24,28,0.50)";
      g.strokeRect(cs(8.10), rBot(k > 0 ? 1.45 : -0.70), (8.10 - 6.95) * PXM, 0.75 * PXM);
    }
    g.strokeRect(cs(3.95), rBot(0.20), (3.95 - 2.85) * PXM, 0.40 * PXM);   /* nose gear well */
    g.strokeRect(cs(5.45), rBot(0.22), (5.45 - 4.85) * PXM, 0.44 * PXM);   /* catapult hook and speed brakes */
    g.strokeRect(cs(6.80), rBot(0.42), (6.80 - 5.75) * PXM, 0.84 * PXM);

    /* 6. the national insignia, as the F-35 hero lays them: the upper port
          wing (the VF-61 deck photograph has it on the folded port panel,
          the bombs and head-on photographs on the port wing) and, by the
          same rule, the lower starboard wing */
    var yi = 3.55, si = wLE(yi) + 0.46 * (wTE(yi) - wLE(yi));
    insignia(g, cs(si), rTop(yi), 0.36 * PXM);
    insignia(g, cs(si), rBot(-yi), 0.36 * PXM);

    /* 7. stencils, unreadable at this size, and grime streaks aft underneath */
    for (i = 0; i < 60; i++) {
      g.fillStyle = R() < 0.85 ? "rgba(40,44,46,0.30)" : "rgba(160,52,40,0.38)";
      g.fillRect(R() * TW, R() * B_BOT, 4 + R() * 10, 2);
    }
    g.fillStyle = "rgba(60,58,54,0.10)";
    for (i = 0; i < 50; i++) g.fillRect(R() * TW * 0.9, B_BOT + R() * TOPH, 20 + R() * 70, 2 + R() * 4);
    return cv;
  }
  var _tex;
  function sheet() {
    if (_tex !== undefined) return _tex;
    try {
      var t = new V.CanvasTexture(paintSheet());
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;   /* r148 */
      _tex = t;
    } catch (e) { _tex = false; }
    return _tex;
  }
  /* projected UVs: each triangle into the band its normal faces; faces that
     look fore or aft are laid out along x plus the cross coordinate */
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
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, Rr;
        U = cu(endOn ? x + y * 0.3 : x);
        if (band === 0) Rr = rTop(y);
        else if (band === 3) Rr = rBot(y);
        else Rr = rSide(z, band === 2);
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - Rr / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  /* ========================================================= materials ==
     SKIN the painted sheet; METAL the probe, hook, nozzle and gear legs; INK
     flat black for the intakes, the jet pipe and the cockpit; GLASS the
     canopy; DOOR the white gear doors. The team colour is exactly C.team and
     kept to the fin cap and the tailplane tips. */
  function makeMats(C) {
    var tex = sheet(), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.80, metalness: 0.08, side: V.DoubleSide });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0xa0a4a3);
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.ink = new V.MeshStandardMaterial({ color: 0x060708, roughness: 0.95, metalness: 0.03, side: V.DoubleSide });
    m.tyre = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.door = new V.MeshStandardMaterial({ color: 0xe3e4e0, roughness: 0.80, metalness: 0.08, side: V.DoubleSide });
    m.glass = new V.MeshStandardMaterial({ color: 0x4a5a58, roughness: 0.12, metalness: 0.55,
                                           transparent: true, opacity: 0.80, side: V.DoubleSide });
    return m;
  }

  /* ============================================================ airframe = */
  function addBody(K) {
    var i, rings = [], sec = resample(BODY, 34), N = 32;
    for (i = 0; i < sec.length; i++) rings.push(ringAt(sec[i], N));
    K.skin.push(closed(rings));
    /* the gloves: one lens across both sides, its front face the intakes */
    rings = []; sec = resample(GLOVE, 14);
    for (i = 0; i < sec.length; i++) rings.push(ringAt(sec[i], 32));
    K.skin.push(closed(rings));
    /* the intake mouths: a rounded triangle, tallest against the fuselage,
       its top edge level, set into the glove face, and a short dark duct */
    var side, k;
    function mouth(x, shrink) {
      var o = [], pts = [[0.80, 0.12], [1.30, 0.015], [1.38, -0.02], [1.30, -0.055], [0.80, -0.27], [0.75, -0.08]], n = pts.length;
      var cy = 0.98, cz = -0.06;
      for (k = 0; k < 16; k++) {
        var t = k / 16 * n, j = Math.floor(t), f = t - j, a = pts[j], b = pts[(j + 1) % n];
        var yy = a[0] + (b[0] - a[0]) * f, zz = a[1] + (b[1] - a[1]) * f;
        o.push([x, cy + (yy - cy) * shrink, cz + (zz - cz) * shrink]);
      }
      return o;
    }
    for (side = -1; side <= 1; side += 2) {
      var A = mouth(X(5.035), 1.0), B = mouth(X(5.60), 0.80);
      if (side < 0) { A = mirrorRings([A])[0]; B = mirrorRings([B])[0]; }
      K.ink.push(bridge([A, B], true, true));
    }
    /* the nose refuelling probe on the centreline, its head and base collar */
    K.metal.push(revS([[0.00, 0.020], [0.03, 0.055], [0.13, 0.060], [0.16, 0.042], [1.10, 0.042], [1.16, 0.080], [1.30, 0.095], [1.34, 0.05]], 0, 0.0, 10));
    /* the jet pipe: a metal lip and a black throat */
    var lip = [], th = [], a;
    for (k = 0; k < 24; k++) {
      a = k / 24 * Math.PI * 2;
      lip.push([X(11.80), 0.42 * Math.cos(a), -0.03 + 0.42 * Math.sin(a)]);
      th.push([X(11.96), 0.37 * Math.cos(a), -0.03 + 0.37 * Math.sin(a)]);
    }
    K.metal.push(bridge([lip, lip.map(function (q) { return [X(11.96), q[1] * 1.02, -0.03 + (q[2] + 0.03) * 1.02]; })], false, false));
    K.ink.push(bridge([th, th.map(function (q) { return [q[0] + 0.30, q[1] * 0.9, -0.03 + (q[2] + 0.03) * 0.9]; })], false, true));
    /* the arrester hook, stowed under the tail, its point aft of the pipe */
    K.metal.push(rod([X(11.55), 0, -0.40], [X(12.95), 0, -0.80], 0.040, 6));
    K.metal.push(rod([X(12.90), 0, -0.80], [X(13.05), 0, -0.72], 0.045, 6));
    K.metal.push(boxG(0.70, 0.16, 0.08, X(11.60), 0, -0.44));
  }

  /* the canopy: an open glass shell on the sills, frame bows, tub, seat and
     the pilot's helmet */
  function arcRing(st, n, up) {
    var p = [], k, a;
    for (k = 0; k <= n; k++) {
      a = Math.PI * k / n;
      p.push([X(st[0]), st[1] * Math.cos(a), st[2] + (st[3] + (up || 0) - st[2]) * Math.pow(Math.sin(a), 0.8)]);
    }
    return p;
  }
  function addCanopy(K) {
    var i, r = [], sec = resample(CANOPY, 16);
    for (i = 0; i < sec.length; i++) r.push(arcRing(sec[i], 14));
    K.glass.push(bridge(r, false, false, true));
    var bows = [0, 2, 6];
    for (i = 0; i < bows.length; i++) {
      var st = CANOPY[bows[i]];
      var a0 = arcRing([st[0] - 0.035, st[1] + 0.01, st[2], st[3]], 14, 0.012);
      var a1 = arcRing([st[0] + 0.035, st[1] + 0.01, st[2], st[3]], 14, 0.012);
      K.ink.push(bridge([a0, a1], false, false, true));
    }
    /* the windscreen's quarter frames */
    for (i = -1; i <= 1; i += 2) K.ink.push(rod([X(3.60), i * 0.24, 0.68], [X(4.28), i * 0.30, 1.03], 0.022, 5));
    K.ink.push(boxG(1.9, 0.72, 0.18, X(5.0), 0, 0.62));                 /* cockpit tub */
    K.ink.push(boxG(0.32, 0.44, 0.52, X(5.15), 0, 0.88));               /* seat */
    K.ink.push(boxG(0.30, 0.56, 0.16, X(4.25), 0, 0.78));               /* coaming */
    var helm = new V.SphereGeometry(0.14, 10, 7);
    helm.translate(X(5.02), 0, 1.00);
    K.metal.push(helm);
  }

  /* wing: inner (fixed) panels and the two folding outer panels */
  function wingRings(tab, side, m) {
    return tab.map(function (r) { return foilY(r[1], r[2], side * r[0], r[4], r[3], m); });
  }
  function addWings(K, F) {
    var side;
    for (side = -1; side <= 1; side += 2) {
      K.skin.push(closed(wingRings(WING_IN, side, 11)));
      F[side].push(closed(wingRings(WING_OUT, side, 11)));
      /* the fence: a thin plate standing 0.13 m off the upper skin, from
         under the leading edge to three quarters of the chord */
      var y0 = side * YFENCE, r = WING_OUT[2], sl = wLE(YFENCE), st = wTE(YFENCE), c = st - sl, tc = r[3] / c, zc = r[4];
      var inner = [], outer = [], i, f, n = 10;
      for (i = 0; i <= n; i++) {
        var u = i / n, ang = -0.55 + u * 1.55;               /* from under the edge, over it and aft */
        f = u < 0.25 ? 0.012 * (1 - u / 0.25) + 0.0008 : Math.pow((u - 0.25) / 0.75, 1.35) * 0.74 + 0.0008;
        var zs = u < 0.12 ? zc - yt(Math.max(f, 0.0005), tc) * c * (1 - u / 0.12) : zc + yt(f, tc) * c;
        var hgt = 0.16 * (u < 0.85 ? 1 : 1 - (u - 0.85) / 0.15 * 0.75);
        var nzz = u < 0.18 ? Math.sin(ang) : 1, nxx = u < 0.18 ? Math.cos(ang) : 0;
        inner.push([X(sl + f * c), y0, zs]);
        outer.push([X(sl + f * c) + nxx * hgt * 0.8, y0, zs + nzz * hgt]);
      }
      var ringA = [], ringB = [];
      for (i = 0; i <= n; i++) { ringA.push(inner[i]); }
      for (i = n; i >= 0; i--) { ringA.push(outer[i]); }
      ringB = ringA.map(function (q) { return [q[0], q[1] + 0.012, q[2]]; });
      ringA = ringA.map(function (q) { return [q[0], q[1] - 0.012, q[2]]; });
      F[side].push(closed([ringA, ringB]));
    }
  }

  function addTail(K) {
    var i, r = [], n = 5, side;
    for (i = 0; i <= n; i++) {
      var y = TP.y0 + (TP.tip - 0.06 - TP.y0) * i / n, f = i / n;
      r.push(foilY(TP.le0 + (y - TP.y0) * TP.leK, TP.te0 + (y - TP.y0) * TP.teK, y,
                   TP.z + (y - TP.y0) * Math.tan(TP.dih * D2R), TP.th0 + (TP.th1 - TP.th0) * f, 8));
    }
    var yT = TP.tip;
    r.push(foilY(TP.le0 + (yT - TP.y0) * TP.leK + 0.20, TP.te0 + (yT - TP.y0) * TP.teK - 0.12, yT,
                 TP.z + (yT - TP.y0) * Math.tan(TP.dih * D2R), 0.025, 8));
    K.skin.push(closed(r));
    K.skin.push(closed(mirrorRings(r)));
    /* team: a cap round each tailplane tip */
    var cap = [], ys = [TP.tip - 0.40, TP.tip - 0.20, TP.tip - 0.06];
    for (i = 0; i < ys.length; i++) {
      var yy = ys[i], ff = (yy - TP.y0) / (TP.tip - TP.y0);
      cap.push(foilY(TP.le0 + (yy - TP.y0) * TP.leK, TP.te0 + (yy - TP.y0) * TP.teK, yy,
                     TP.z + (yy - TP.y0) * Math.tan(TP.dih * D2R), TP.th0 + (TP.th1 - TP.th0) * ff, 8, 0.012));
    }
    K.team.push(closed(cap));
    K.team.push(closed(mirrorRings(cap)));
    /* the bullet where the tailplane crosses the fin */
    K.skin.push(revS([[12.45, 0.02], [12.50, 0.075], [12.70, 0.110], [13.10, 0.120], [13.50, 0.085], [13.80, 0.035], [13.93, 0.004]], 0, TP.z, 12));

    /* the fin: sections at fixed z, the dorsal fillet in its leading edge */
    var fr = FIN.map(function (q) { return foilZ(q[1], q[2], q[0], q[3], 9); });
    K.skin.push(closed(fr));
    /* team: the cap over the fin tip */
    var tops = [2.62, 2.80, 2.97], tr = [];
    for (i = 0; i < tops.length; i++) {
      var z = tops[i], le = lin(FIN.map(function (q) { return [q[0], q[1]]; }), z), te = lin(FIN.map(function (q) { return [q[0], q[2]]; }), z);
      var thk = lin(FIN.map(function (q) { return [q[0], q[3]]; }), z);
      tr.push(foilZ(le, te, z + (i === 2 ? 0.012 : 0), thk, 9, 0.012));
    }
    K.team.push(closed(tr));
  }

  /* ================================================================ gear ==
     A single nose wheel on a long leg under the cockpit, the mains under the
     gloves retracting inward; each leg's top let into the skin above it */
  function addGear(G) {
    var gr = GEAR, n = gr.ns, nzc = ZG + gr.nr, s, k;
    G.metal.push(rod([X(n - 0.16), 0, -0.60], [X(n), 0, nzc + 0.10], 0.060, 8));
    G.metal.push(rod([X(n), 0.09, nzc + 0.16], [X(n), 0.09, nzc], 0.030, 6));
    G.metal.push(rod([X(n), -0.09, nzc + 0.16], [X(n), -0.09, nzc], 0.030, 6));
    G.metal.push(boxG(0.10, 0.22, 0.06, X(n), 0, nzc + 0.17));
    G.metal.push(rod([X(n - 0.55), 0, -0.62], [X(n - 0.08), 0, nzc + 0.30], 0.026, 6));
    G.tyre.push(wheelG(gr.nr, gr.nw, X(n), 0, nzc, 20));
    G.metal.push(wheelG(0.12, gr.nw + 0.01, X(n), 0, nzc, 10));
    for (k = -1; k <= 1; k += 2) G.door.push(boxG(1.00, 0.025, 0.36, X(3.40), k * 0.21, -0.80));
    var m = gr.ms, mzc = ZG + gr.mr;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(rod([X(m - 0.08), s * 1.17, -0.30], [X(m), s * 1.17, mzc + 0.06], 0.070, 8));
      G.metal.push(rod([X(m - 0.70), s * 0.82, -0.42], [X(m - 0.04), s * 1.15, mzc + 0.42], 0.035, 6));
      G.metal.push(rod([X(m), s * 1.13, mzc], [X(m), s * (gr.my + 0.09), mzc], 0.045, 6));
      G.tyre.push(wheelG(gr.mr, gr.mw, X(m), s * gr.my, mzc, 22));
      G.metal.push(wheelG(0.17, gr.mw + 0.01, X(m), s * gr.my, mzc, 12));
      G.door.push(boxG(0.80, 0.025, 0.46, X(m - 0.05), s * 1.06, -0.66));
    }
  }

  /* ============================================================== build == */
  function merge(list) {
    var pos = [], nor = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = list[i].index ? list[i].toNonIndexed() : list[i];
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, nn = g.attributes.normal.array;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(nn[j]); }
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
      var me = new V.Mesh(geo, mats[key]);
      me.name = key;
      parent.add(me);
    }
  }

  function build(THREE, M, C) {
    V = THREE;
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    var K = { skin: [], team: [], metal: [], ink: [], glass: [] };
    var G = { metal: [], tyre: [], door: [] };
    var F = { "-1": [], "1": [] };
    addBody(K);
    addCanopy(K);
    addWings(K, F);
    addTail(K);
    addGear(G);

    var mats = makeMats(C);
    var root = new V.Group();
    emit(root, K, mats, ["skin", "team", "ink", "metal", "glass"]);
    /* the folding outer panels: a "wingfold" group each side, origin on the
       hinge (the upper skin on the fold line), the panel's UVs projected as
       it lies spread; render3d.js turns it FOLD deg up about +X on a deck */
    var side, zh = WING_OUT[0][4] + WING_OUT[0][3] / 2, xh = X(7.4);
    for (side = -1; side <= 1; side += 2) {
      var geo = projUV(merge(F[side]));
      geo.translate(-xh, -side * YH, -zh);
      var fg = new V.Group();
      fg.name = "wingfold";
      fg.position.set(xh, side * YH, zh);
      fg.userData.fold = { axis: [1, 0, 0], angle: side * FOLD * D2R };
      var fm = new V.Mesh(geo, mats.skin);
      fm.name = "skin_fold";
      fg.add(fm);
      root.add(fg);
    }
    var gear = new V.Group();
    gear.name = "gear";
    emit(gear, G, mats, ["metal", "tyre", "door"]);
    root.add(gear);
    return root;
  }

  return { build: build };
})();

/* len is the measured X extent: the probe tip to the tailplane bullet */
UNIT_MODELS["nato_e50_cfighter"] = {
  len: 13.93,
  build: function (THREE, M, C) { return HeroF9F.build(THREE, M, C); }
};
