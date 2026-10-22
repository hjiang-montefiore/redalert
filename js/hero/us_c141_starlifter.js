/* ============ us_c141_starlifter.js -- LOCKHEED C-141 STARLIFTER (HERO MODEL) ============

   The Air Force's first jet freighter, for the two rows that fly it:
     nato_e60_c141   "C-141A Starlifter" (from 1965): the short body as built,
                     in the natural-metal finish of the 1960s photographs.
     nato_e80_c141   "C-141B Starlifter" (from 1979): the same airframe let out
                     23 ft 4 in (7.11 m) by plugs ahead of and behind the wing,
                     with the dorsal refuelling receptacle fairing behind the
                     flight deck, in the European One wrap-round camouflage of
                     the 1980s photographs.

   Published figures (en.wikipedia "Lockheed C-141 Starlifter", read
   2026-10-22): C-141B length 168 ft 4 in (51.3 m), span 160 ft 0 in (48.8 m),
   height 39 ft 3 in (12 m), wing area 3,228 sq ft (300 m2); "plug sections
   forward and aft of the wings, lengthening the fuselage a total of 23 feet 4
   inches (7.11 m)" and "a boom receptacle for inflight refueling"; four TF33
   turbofans in pods under a high swept wing, a T-tail, a ramp under the
   upswept rear fuselage and two side-facing rear doors. de.wikipedia "Lockheed
   C-141": the same 7.1 m, "vor und hinter den Tragflaechen".

   Drawing: Wikimedia Commons "Lockheed C-141A Starlifter 3-view line
     drawing.png" (dated 1967-06-29; the dimensioned three-view of the
     airport-planning kind: 145 ft long, 159 ft 11 in span, 39 ft 3 in high,
     tailplane 50 ft 4 in, inlets 35 ft 8 in and 42 ft 9 in aft of the nose,
     engine centres 23 ft 9 in and 38 ft 4 in apart and 8 ft and 7 ft 5 in up,
     nose gear 10 ft 4 in aft of the nose and 51 ft ahead of the main gear,
     the two main axles 4 ft apart, the gear track 17 ft 6 in, the crown
     15 ft 9 in and the wing-root fairing 17 ft 9 in up). Read by a pixel scan
     at its own scale, 17.9 px to the metre (792 px for the 145 ft in side
     view, 868 px for the span in front view; the side view's heights read at
     18.2 px to the metre, which puts its crown, fairing and fin-top on the
     drawing's own figures). Every station below is s metres aft of the nose
     tip of the A and h metres above the ground:
       fuselage  round, 4.30 m across (plan) and 4.23 m deep (side): crown
                 4.78, belly 0.55, flat from s 5.4 to 20; the belly sweeps up
                 from s 21 to the tail cone at s 40.4, h 4.6, and the top line
                 rises to 5.5 under the fin; nose tip at h 2.5
       wing      leading edge s 10.54 + 0.518 y (27.4 deg), trailing edge
                 20.63 + 0.140 y to the kink at y 10.67, then 22.13 + 0.333
                 (y - 10.67); tip chord 3.5 m: 304 m2 against the published
                 300, 24.2 deg at the quarter chord against the published 25.
                 Front view: the upper surface 5.35 m up at the body falling to
                 3.60 at the tip, the lower 4.13 falling to 3.35 - a thick
                 root on top of the body and a drooping wing. The drawing's
                 -0.941 and -1.195 deg of dihedral are for its reference
                 plane; the skins are drawn as its front view has them
       engines   lips at s 10.87 and 13.03, 7.24 and 11.68 m out, centres 2.43
                 and 2.29 m up (the drawing's figures); cowls 1.64 m across,
                 the spinner standing 0.62 m proud of the lip (plan view and
                 the 1964 Tinker photograph), fan cowl 3.95 m, then the core
                 cowl, nozzle and plug
       tail      fin leading edge 38.7 deg, root 34.9-40.3 at h 6.9 with a
                 long dorsal fillet from s 29, tip chord 4.75 at h 10.5; the
                 fin-top fairing (the "bullet") from s 34.5 to 44.2, 0.92 m
                 across, axis h 11.48; tailplane 15.34 m across, root chord
                 38.0-42.2, tip 41.9-43.6, its top the published 39 ft 3 in
       gear      nose wheels at s 3.15; main axles at s 18.7 and 19.92, two
                 wheels abreast on each, 2.25 and 3.05 m out
       sponsons  the main-gear pods, 6.7 m across (front view), s 14.5-24.5
       doors     crew door (port) s 5.6-6.4; paratroop doors s 24.6-25.6; the
                 ramp s 26.85-30.4; the clamshell doors from s 30.4 to the
                 tail cone, their top edge 4.18 m up from s 34.2
   THE STRETCH: the 7.11 m is published, its split is not in the sources
     fetched. Measured off "C-141A C-141B comparison.JPEG" (1 June 1980, an A
     and a B parked side by side): nose to wing root 4.3 m longer on the B,
     nose to fin 7.0 m longer, nose to paratroop door 4.5 m - so the forward
     plug is about 4.1-4.3 m and the paratroop doors stay ahead of the aft
     plug. Drawn as 4.06 m (13 ft 4 in) let in at s 7.5, between the crew
     door and the wing fillet, and the rest of the published 23 ft 4 in,
     3.05 m (10 ft), at s 25.9, between the paratroop doors and the ramp;
     where exactly each plug went is not in the sources fetched.
   Photographs (Wikimedia Commons):
     "Lockheed C-141A-10-LM Starlifter 63-8078.jpg" (Tinker, October 1964):
        the bare-metal A, black radome, the spinners proud of the lips
     "Lockheed C-141A-1-LM Starlifter 61-2776.jpg" (1964, from above): the
        grey wing-top over the bare leading edge and control surfaces, the
        star-and-bar on the port upper wing and on the rear fuselage, the
        black fairing on the roof behind the wing
     "Lockheed C-141A-15-LM Starlifter 64-0622.jpg" (about 1967): the bare
        metal from below, the gear, the nacelles and pylons, the fuselage star
     "C-141A C-141B comparison.JPEG" (1980): the stretch, the B's receptacle
        hump behind the flight deck
     "An air-to-air left side view of a C-141B Starlifter aircraft with the
        new European paint scheme ... "Green Lizard" DF-ST-82-01617.jpg"
        (1982): European One on the B - FS 34092 dark green, 34102 green and
        36081 grey wrapped round the whole aeroplane, the door and hatch
        outlines in yellow, no national insignia to be seen
     "82nd Airborne troops jump from C-141B over Honduras 1988.JPEG" (from
        below), "An air-to-air rear view of a C-141B ... VOLANT RODEO 83"
        (the open ramp and clamshell doors), "An air-to-air front view of a
        C-141B ... SOLL ... 1983" (head on: the drooping wing, the T-tail),
        "Lockheed C-141B Starlifter at Luxembourg-Findel ... 1990" (head on:
        the receptacle fairing and its slot over the windscreen), "Lockheed
        Starlifters. C-141B left, C-141A right." (museum, the hump in side
        view), "A US Air Force ... C-141B ... refuels in flight from a KC-135"
        (1998, the receptacle from above)
   Paint. A: bare alloy at #a3aaae and the wing-top at #70787c, both read
     off the 1964 photographs and taken to about 0.9 for the renderer's tone
     curve (the house's bare-metal value, us_c130_hercules.js "white"); the
     radome black. B: European One in the Hercules hero's lizard values
     (us_c130_hercules.js), so the two transports of the 1980s match.

   RECOGNITION (what must read at RTS zoom, and where each shows):
     1. long slim round fuselage, 4.3 m across on 44.2 m (A) or 51.3 m (B),
        the flat floor line and the bluff round nose (drawing side and plan
        views; comparison photograph)                   -> addFuselage (FUS)
     2. high swept wing sitting on the roof, thick at the root and drooping
        to thin tips (drawing front view; SOLL head-on)  -> addWing, addFillet
     3. four TF33 pods slung well ahead of the leading edge on swept pylons,
        the spinners proud of the lips, the long core cowls and plugs behind
        (drawing; 1964 and 1967 photographs)           -> addNacelles, addPylon
     4. T-tail: the swept fin with its long dorsal fillet, the tailplane on
        the long pointed fin-top fairing (drawing; every side photograph)
                                                    -> addFin, addTailplane, addBullet
     5. the main-gear sponsons low on each side, 6.7 m across (drawing front
        and plan views; 1967 photograph)                 -> addSponsons
     6. the upswept tail with the ramp and the clamshell doors outlined on
        it (drawing side view; VOLANT RODEO photograph)   -> FUS rows 21-40, paint
     7. cockpit glazing: five windscreen panes in a band 3.4-4.0 m up and a
        side window aft of them (drawing front and side views; Luxembourg
        photograph)                                     -> addGlass
     8. the B's 7.11 m stretch, ahead of and behind the wing (published;
        comparison photograph)                          -> VARS.B, invS()
     9. the B's receptacle hump on the crown behind the flight deck, its
        dark slot facing forward (comparison, museum, Luxembourg and KC-135
        photographs)                                    -> addReceptacle
    10. the period finish: the A's bare metal, grey wing-top, black radome
        and full-colour star-and-bar; the B's European One (the photographs
        above)                                          -> paintSheet
    11. the low dorsal fairing on the roof behind the wing (drawing plan and
        side views; black on the 1964 A)                 -> addRoofFairing
   NOT CONFIRMED and so not drawn: any national insignia on the European One
     B (none can be seen in the 1980s photographs used); the A's star-and-bar
     under the starboard wing (no photograph used shows it); flap-track
     fairings (none can be seen from below in the photographs used). Never
     drawn: the titles ("U.S. AIR FORCE", "USAF"), the MATS/MAC fin band and
     fin flag, the command badge, serials. The antenna fit is not drawn.
   Team colour (exactly C.team, modest): the upper skin of the outer 1.8 m of
     each wing and the fin-top fairing, as the C-17 hero.
   Model space: +X nose, +Y port, +Z up, metres; the ground is 2.7 m below
     the origin. Merged into one mesh per material (skin, dome, team, ink,
     hot, glass); the gear is its own named group of two (metal, tyre), the
     lowest opaque part.
   ========================================================================= */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroC141 = (function () {
  "use strict";

  var V = null;                         /* THREE, set by build()               */
  var D2R = Math.PI / 180, PI = Math.PI;

  /* The two airframes. pf and pa are the plugs let in at A-stations P1 and
     P2; every part is drawn in A-stations and moved aft by the plugs ahead
     of it (SH), the fuselage by invS(). */
  var VARS = {
    A: { id: "A", len: 44.20, pf: 0.00, pa: 0.00, paint: "metal", rec: false },
    B: { id: "B", len: 51.31, pf: 4.06, pa: 3.05, paint: "lizard", rec: true }
  };
  var P1 = 7.5, P2 = 25.9;
  var VV = VARS.A, LEN = 44.2, XN = 22.1, ZG = -2.7, SH = 0;
  function X(s) { return XN - s; }               /* output station -> x      */
  function XS(s) { return XN - s - SH; }         /* part station -> x        */
  function Z(h) { return h + ZG; }
  function invS(s) {                             /* output station -> A      */
    if (s < P1) return s;
    if (s < P1 + VV.pf) return P1;
    if (s < P2 + VV.pf) return s - VV.pf;
    if (s < P2 + VV.pf + VV.pa) return P2;
    return s - VV.pf - VV.pa;
  }
  function S(s) { return s + (s >= P1 ? VV.pf : 0) + (s >= P2 ? VV.pa : 0); }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function sgp(v, e) { return v < 0 ? -Math.pow(-v, e) : Math.pow(v, e); }
  function cr(p0, p1, p2, p3, t) {
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t +
                  (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
  }
  /* a smooth look-up in a table whose first column is the station */
  function tab(rows, s) {
    var n = rows.length, i = 0, k, out = [];
    if (s <= rows[0][0]) return rows[0].slice(1);
    if (s >= rows[n - 1][0]) return rows[n - 1].slice(1);
    while (rows[i + 1][0] < s) i++;
    var a = rows[Math.max(i - 1, 0)], b = rows[i], c = rows[i + 1], d = rows[Math.min(i + 2, n - 1)];
    var t = (s - b[0]) / (c[0] - b[0]);
    for (k = 1; k < b.length; k++) out.push(cr(a[k], b[k], c[k], d[k], t));
    return out;
  }
  /* piecewise-linear look-up, for tables with corners */
  function lin(rows, s) {
    var n = rows.length, i, k, out = [];
    if (s <= rows[0][0]) return rows[0].slice(1);
    if (s >= rows[n - 1][0]) return rows[n - 1].slice(1);
    for (i = 0; rows[i + 1][0] < s; i++);
    var t = (s - rows[i][0]) / (rows[i + 1][0] - rows[i][0]);
    for (k = 1; k < rows[i].length; k++) out.push(rows[i][k] + (rows[i + 1][k] - rows[i][k]) * t);
    return out;
  }

  /* ============================================================ shells ==
     Every skin part is a ring loft. A triangle is wound to face away from the
     inside of its ring pair, so no part depends on how a table was written;
     normals are smoothed over the shared vertices, end caps keep their own
     vertices and so their edge. emit() hands each category to a list. */
  function Shell() { this.P = []; this.T = []; }
  Shell.prototype.vert = function (p) { this.P.push(p); return this.P.length - 1; };
  Shell.prototype.tri = function (a, b, c, cat, od) {
    var P = this.P, pa = P[a], pb = P[b], pc = P[c];
    var ux = pb[0] - pa[0], uy = pb[1] - pa[1], uz = pb[2] - pa[2];
    var vx = pc[0] - pa[0], vy = pc[1] - pa[1], vz = pc[2] - pa[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    if (nx * od[0] + ny * od[1] + nz * od[2] < 0) { var t = b; b = c; c = t; }
    this.T.push([a, b, c, cat]);
  };
  Shell.prototype.fan = function (ring, c, ref, cat) {
    var n = ring.length, ic = this.vert(c), ids = [], i;
    var od = [c[0] - ref[0], c[1] - ref[1], c[2] - ref[2]];
    for (i = 0; i < n; i++) ids.push(this.vert(ring[i]));
    for (i = 0; i < n; i++) this.tri(ic, ids[i], ids[(i + 1) % n], cat === undefined ? 2 : cat, od);
  };
  Shell.prototype.loft = function (rings, catOf, capA, capB) {
    var R = rings.length, n = rings[0].length, r, i, j, idx = [], cent = [];
    for (r = 0; r < R; r++) {
      var row = [], cx = 0, cy = 0, cz = 0;
      for (i = 0; i < n; i++) {
        var p = rings[r][i];
        row.push(this.vert(p)); cx += p[0]; cy += p[1]; cz += p[2];
      }
      idx.push(row); cent.push([cx / n, cy / n, cz / n]);
    }
    for (r = 0; r + 1 < R; r++) {
      var mc = [(cent[r][0] + cent[r + 1][0]) / 2, (cent[r][1] + cent[r + 1][1]) / 2,
                (cent[r][2] + cent[r + 1][2]) / 2];
      for (i = 0; i < n; i++) {
        j = (i + 1) % n;
        var A = rings[r][i], B = rings[r][j], C = rings[r + 1][j], D = rings[r + 1][i];
        var od = [(A[0] + B[0] + C[0] + D[0]) / 4 - mc[0], (A[1] + B[1] + C[1] + D[1]) / 4 - mc[1],
                  (A[2] + B[2] + C[2] + D[2]) / 4 - mc[2]];
        var cat = catOf ? catOf(i, r) : 0;
        this.tri(idx[r][i], idx[r][j], idx[r + 1][j], cat, od);
        this.tri(idx[r][i], idx[r + 1][j], idx[r + 1][i], cat, od);
      }
    }
    /* a lone ring is a disc facing forward (+X): a fan face, a nozzle's inside */
    var refA = R > 1 ? cent[1] : [cent[0][0] - 1, cent[0][1], cent[0][2]];
    if (capA) this.fan(rings[0], cent[0], refA, capA === true ? 2 : capA);
    if (capB && R > 1) this.fan(rings[R - 1], cent[R - 1], cent[R - 2], capB === true ? 2 : capB);
  };
  /* smooth the normals and hand each category to its list (map: cat -> key) */
  Shell.prototype.emit = function (map, uvf) {
    var P = this.P, T = this.T, N = [], i, k, c;
    for (i = 0; i < P.length; i++) N.push([0, 0, 0]);
    for (k = 0; k < T.length; k++) {
      var t = T[k], pa = P[t[0]], pb = P[t[1]], pc = P[t[2]];
      var ux = pb[0] - pa[0], uy = pb[1] - pa[1], uz = pb[2] - pa[2];
      var vx = pc[0] - pa[0], vy = pc[1] - pa[1], vz = pc[2] - pa[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      for (i = 0; i < 3; i++) { var q = N[t[i]]; q[0] += nx; q[1] += ny; q[2] += nz; }
    }
    for (i = 0; i < N.length; i++) {
      var m = Math.sqrt(N[i][0] * N[i][0] + N[i][1] * N[i][1] + N[i][2] * N[i][2]) || 1;
      N[i][0] /= m; N[i][1] /= m; N[i][2] /= m;
    }
    for (c = 0; c < 4; c++) {
      var pos = [], nor = [];
      for (k = 0; k < T.length; k++) {
        if (T[k][3] !== c) continue;
        for (i = 0; i < 3; i++) {
          var p = P[T[k][i]], nn = N[T[k][i]];
          pos.push(p[0], p[1], p[2]); nor.push(nn[0], nn[1], nn[2]);
        }
      }
      if (!pos.length || !map[c]) continue;
      var g = new V.BufferGeometry();
      g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
      g.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
      if (uvf && map[c] === "skin") uvf(g);
      put(map[c], g);
    }
  };

  var K = null;                          /* the lists, one per material        */
  function put(key, g) { (K[key] || (K[key] = [])).push(g); }
  var SKIN = { 0: "skin", 1: "skin", 2: "skin" };

  /* ========================================================= airfoil lofts
     frame "w": sections across the span (a = y), thickness up and down;
     frame "f": sections up a fin or a pylon (a = h), thickness across.
     s is the leading edge's station, c the chord, t the thickness ratio, o
     the height (w) or the lateral offset (f) of the section's mean line. */
  function foilHalf(t, c, u) {
    return t * c * (1.4845 * Math.sqrt(u) - 0.63 * u - 1.758 * u * u + 1.4215 * u * u * u - 0.518 * u * u * u * u);
  }
  function foilRing(sec, frame, KC) {
    var up = [], lo = [], j, u, th, ring = [];
    for (j = 0; j <= KC; j++) {
      u = (1 - Math.cos(Math.PI * j / KC)) / 2;
      th = Math.max(foilHalf(sec.t, sec.c, u), j === KC ? 0.004 : 0);
      if (frame === "w") {
        up.push([XS(sec.s + u * sec.c), sec.a, Z(sec.o + th)]);
        lo.push([XS(sec.s + u * sec.c), sec.a, Z(sec.o - th)]);
      } else {
        up.push([XS(sec.s + u * sec.c), sec.o + th, Z(sec.a)]);
        lo.push([XS(sec.s + u * sec.c), sec.o - th, Z(sec.a)]);
      }
    }
    for (j = 0; j <= KC; j++) ring.push(up[j]);
    for (j = KC - 1; j >= 1; j--) ring.push(lo[j]);
    return ring;
  }
  function foil(secs, frame, map, KC, upperCat) {
    var rings = [], i, sh = new Shell(), kc = KC || 10;
    for (i = 0; i < secs.length; i++) rings.push(foilRing(secs[i], frame, kc));
    sh.loft(rings, function (i) { return i < kc ? 0 : (upperCat === undefined ? 1 : upperCat); }, true, true);
    sh.emit(map, projUV);
  }

  /* ======================================================== the fuselage ==
     Rows (A-stations): s, half-width, crown h, belly h, the lower half's
     superellipse exponent (below 1 squares the lower corners: the ramp's
     flatter underside). Read off the three-view (see the header). */
  var FUS = [
    [0.00, 0.03, 2.50, 2.42, 1.00],
    [0.11, 0.38, 2.75, 1.96, 1.00],
    [0.22, 0.49, 2.88, 1.82, 1.00],
    [0.34, 0.57, 3.00, 1.71, 1.00],
    [0.45, 0.66, 3.08, 1.62, 1.00],
    [0.67, 0.81, 3.21, 1.52, 1.00],
    [0.89, 0.94, 3.36, 1.42, 1.00],
    [1.31, 1.17, 3.63, 1.22, 1.00],
    [1.76, 1.37, 3.95, 1.08, 1.00],
    [2.21, 1.54, 4.25, 0.96, 1.00],
    [2.65, 1.69, 4.47, 0.87, 1.00],
    [3.19, 1.84, 4.63, 0.78, 1.00],
    [3.75, 1.97, 4.72, 0.69, 1.00],
    [4.31, 2.07, 4.76, 0.62, 1.00],
    [4.87, 2.12, 4.78, 0.57, 1.00],
    [5.43, 2.15, 4.78, 0.55, 1.00],
    [7.00, 2.15, 4.78, 0.55, 1.00],
    [12.0, 2.15, 4.78, 0.55, 1.00],
    [17.0, 2.15, 4.78, 0.55, 1.00],
    [20.0, 2.15, 4.78, 0.55, 1.00],
    [21.5, 2.15, 4.78, 0.62, 0.98],
    [23.2, 2.15, 4.79, 0.69, 0.95],
    [24.9, 2.15, 4.82, 0.80, 0.92],
    [26.6, 2.15, 5.06, 0.96, 0.88],
    [28.2, 2.14, 5.30, 1.18, 0.84],
    [29.9, 2.07, 5.44, 1.46, 0.82],
    [31.6, 1.92, 5.50, 1.81, 0.82],
    [33.3, 1.70, 5.52, 2.25, 0.84],
    [35.0, 1.42, 5.48, 2.69, 0.86],
    [36.6, 1.09, 5.33, 3.16, 0.90],
    [37.9, 0.77, 5.14, 3.60, 0.95],
    [39.0, 0.50, 4.96, 4.02, 1.00],
    [39.8, 0.27, 4.80, 4.33, 1.00],
    [40.4, 0.05, 4.64, 4.57, 1.00]
  ];
  var FST = [0, 0.04, 0.11, 0.22, 0.34, 0.50, 0.67, 0.89, 1.08, 1.25, 1.53, 1.76, 2.0, 2.21, 2.45,
             2.65, 2.9, 3.19, 3.45, 3.75, 4.31, 4.87, 5.43, 6.4, 7.5, 10.0, 14.0, 18.0,
             20.75, 21.5, 22.4, 23.2, 24.0, 24.9, 25.9, 26.6, 27.4, 28.2, 29.0, 29.9, 30.8, 31.6,
             32.4, 33.3, 34.1, 35.0, 35.8, 36.6, 37.3, 37.9, 38.5, 39.0, 39.4, 39.8, 40.1, 40.4];
  var FN = 24;
  function fusRow(so) { return tab(FUS, invS(so)); }
  function crownA(s) { return tab(FUS, s)[1]; }
  function bellyA(s) { return tab(FUS, s)[2]; }
  /* so = output station; a = degrees from the roof, positive toward port;
     push moves the point outward from the section's centre */
  function fusPt(so, a, push) {
    var r = fusRow(so), hw = r[0], ht = r[1], hb = r[2], eb = r[3];
    var hm = (hb + ht) / 2;
    var ca = Math.cos(a * D2R), sa = Math.sin(a * D2R);
    var e = ca >= 0 ? 1.0 : eb;
    var y = hw * sgp(sa, e);
    var h = ca >= 0 ? hm + (ht - hm) * Math.pow(ca, e) : hm - (hm - hb) * Math.pow(-ca, e);
    if (push) {
      var dh = h - hm, L = Math.sqrt(y * y + dh * dh) || 1;
      y += push * y / L; h += push * dh / L;
    }
    return [X(so), y, Z(h)];
  }
  /* the same, on a part's own A-station */
  function fusPtA(s, a, push) { return fusPt(s + SH, a, push); }
  function addFuselage() {
    var outs = [], r, i, k, sh = new Shell(), dome = new Shell(), seen = {};
    FST.forEach(function (s) { outs.push(S(s)); });
    if (VV.pf) { outs.push(P1, P1 + VV.pf * 0.5); }
    if (VV.pa) { outs.push(P2 + VV.pf, P2 + VV.pf + VV.pa * 0.5); }
    outs.sort(function (a, b) { return a - b; });
    outs = outs.filter(function (s) { var k2 = s.toFixed(3); if (seen[k2]) return false; seen[k2] = true; return true; });
    var rings = [], dr = [];
    for (r = 0; r < outs.length; r++) {
      var ring = [];
      for (i = 0; i < FN; i++) ring.push(fusPt(outs[r], i * 360 / FN, 0));
      if (outs[r] <= 1.25) dr.push(ring);
      if (outs[r] >= 1.25) rings.push(ring);
    }
    /* the radome: the nose cap to s 1.25, 2.3 m across (the drawing's front
       view), black on the A, the dark green on the B */
    dome.loft(dr, null, true, false);
    dome.emit({ 0: "dome", 2: "dome" });
    sh.loft(rings, null, false, true);
    sh.emit(SKIN, projUV);
  }

  /* ================================================ blisters on the skin ==
     A fairing laid on the fuselage: rings at part stations ss, each spanning
     +-A(s) degrees about the roof, pushed out by b(s) at the middle and
     faired to nothing at the edges; closed just under the skin. */
  function blister(ss, fA, fB, n, map, pw) {
    var rings = [], k, i, sh = new Shell();
    for (k = 0; k < ss.length; k++) {
      var s = ss[k], A = fA(s), b = fB(s), ring = [];
      for (i = 0; i < n; i++) {
        var t = -1 + 2 * i / (n - 1);
        var push = b * Math.pow(Math.max(0, Math.cos(t * PI / 2)), pw || 0.55) + 0.012;
        ring.push(fusPtA(s, A * t, push));
      }
      for (i = n - 2; i >= 1; i--) {
        var t2 = -1 + 2 * i / (n - 1);
        ring.push(fusPtA(s, A * t2 * 0.9, -0.10));
      }
      rings.push(ring);
    }
    sh.loft(rings, null, true, true);
    sh.emit(map || SKIN, projUV);
  }
  function degFor(w) { return Math.asin(clamp(w / 2.15, 0, 0.94)) / D2R; }
  /* the fillet that fairs the wing's root leading edge into the roof (plan:
     a rounded nose at s 8.3 widening to the wing; side: 4.78 -> 5.15 m) */
  function addFillet() {
    var W = [[8.30, 0.10], [8.78, 0.64], [9.34, 0.88], [9.90, 1.15], [10.46, 1.48], [11.02, 1.80],
             [11.60, 1.95], [12.40, 1.95]];
    var B = [[8.30, 0.00], [8.90, 0.06], [9.40, 0.11], [9.90, 0.17], [10.40, 0.22], [10.90, 0.28],
             [11.40, 0.33], [12.40, 0.40]];
    blister([8.30, 8.55, 8.85, 9.2, 9.6, 10.0, 10.45, 10.9, 11.4, 11.9, 12.4],
            function (s) { return degFor(lin(W, s)[0]); }, function (s) { return lin(B, s)[0]; }, 13);
  }
  /* the low fairing on the roof behind the wing (plan: s 17.3-25.0, 1.8 m
     across, rounded at both ends; side: 4.95-5.06 m up) */
  function addRoofFairing() {
    var W = [[17.2, 0.10], [17.5, 0.55], [18.1, 0.82], [18.8, 0.88], [24.2, 0.88], [24.7, 0.70],
             [25.1, 0.35], [25.4, 0.08]];
    var B = [[17.2, 0.14], [18.1, 0.22], [22.0, 0.24], [24.2, 0.22], [25.4, 0.04]];
    blister([17.2, 17.5, 17.8, 18.1, 18.8, 20.5, 22.4, 24.2, 24.7, 25.1, 25.4],
            function (s) { return degFor(lin(W, s)[0]); }, function (s) { return lin(B, s)[0]; }, 9, SKIN, 0.35);
  }
  /* the B's refuelling receptacle fairing: a hump on the crown behind the
     flight deck, its front a near-upright face with the receptacle's slot,
     faired out aft (the comparison, museum and Luxembourg photographs) */
  function addReceptacle() {
    var W = [[3.50, 0.70], [3.62, 0.82], [4.4, 0.86], [6.0, 0.78], [7.6, 0.60], [8.8, 0.32], [9.6, 0.10]];
    var B = [[3.50, 0.52], [3.62, 0.66], [3.9, 0.68], [4.6, 0.63], [5.5, 0.52], [6.6, 0.36], [7.6, 0.22],
             [8.6, 0.08], [9.6, 0.00]];
    var ss = [3.50, 3.62, 3.9, 4.6, 5.5, 6.6, 7.6, 8.6, 9.6];
    var keep = SH; SH = 0;
    /* the stations are the B's own: the hump runs back into the plug */
    var rings = [], k, i, n = 9, sh = new Shell();
    for (k = 0; k < ss.length; k++) {
      var s = ss[k], A = degFor(lin(W, s)[0]), b = lin(B, s)[0], ring = [];
      for (i = 0; i < n; i++) {
        var t = -1 + 2 * i / (n - 1);
        ring.push(fusPt(s, A * t, b * Math.pow(Math.max(0, Math.cos(t * PI / 2)), 0.35) + 0.012));
      }
      for (i = n - 2; i >= 1; i--) ring.push(fusPt(s, A * (-1 + 2 * i / (n - 1)) * 0.9, -0.10));
      rings.push(ring);
    }
    sh.loft(rings, null, true, true);
    sh.emit(SKIN, projUV);
    /* the slot: a dark panel on the front face */
    var q = new Shell(), c0 = fusPt(3.50, 0, 0.30), hgt = 0.24, wd = 0.26, ids = [];
    [[-wd, -hgt / 2], [wd, -hgt / 2], [wd * 0.8, hgt / 2], [-wd * 0.8, hgt / 2]].forEach(function (p) {
      ids.push(q.vert([c0[0] + 0.02, p[0], c0[2] + p[1]]));
    });
    q.tri(ids[0], ids[1], ids[2], 0, [1, 0, 0]); q.tri(ids[0], ids[2], ids[3], 0, [1, 0, 0]);
    q.emit({ 0: "ink" });
    SH = keep;
  }

  /* ============================================================ sponsons ==
     The main-gear pods low on each side: rows s, outer edge (m from the
     centreline), bottom h, top h where it fairs into the body side. Their
     inner half is buried in the fuselage. */
  var SPON = [
    [14.5, 2.30, 1.70, 2.42],
    [15.3, 2.80, 1.08, 2.45],
    [16.2, 3.12, 0.78, 2.45],
    [17.2, 3.30, 0.64, 2.42],
    [18.5, 3.36, 0.60, 2.40],
    [21.0, 3.36, 0.60, 2.36],
    [21.6, 3.33, 0.62, 2.32],
    [22.4, 3.20, 0.68, 2.22],
    [23.2, 2.95, 0.78, 2.08],
    [23.9, 2.62, 0.92, 1.88],
    [24.5, 2.25, 1.12, 1.62]
  ];
  var SPST = [14.5, 14.9, 15.3, 15.7, 16.2, 16.7, 17.2, 18.5, 21.0, 21.6, 22.4, 23.2, 23.9, 24.5];
  function addSponsons() {
    var sd, k, i, n = 14;
    for (sd = -1; sd <= 1; sd += 2) {
      var rings = [], sh = new Shell();
      for (k = 0; k < SPST.length; k++) {
        var s = SPST[k], r = tab(SPON, s), yin = 1.45, yo = r[0], yc = (yin + yo) / 2, hy = (yo - yin) / 2;
        var hc = (r[1] + r[2]) / 2, hh = (r[2] - r[1]) / 2, ring = [];
        for (i = 0; i < n; i++) {
          var a = i * 2 * PI / n, ca = Math.cos(a), sa = Math.sin(a);
          /* a squarish ellipse, fuller below (the pod's flat underside) */
          var e = ca < 0 ? 0.55 : 0.85;
          ring.push([XS(s), sd * (yc + hy * sgp(sa, 0.75)), Z(hc + hh * sgp(ca, e))]);
        }
        rings.push(ring);
      }
      sh.loft(rings, null, true, true);
      sh.emit(SKIN, projUV);
    }
  }

  /* ============================================================== wing ==
     High, swept, drooping (see the header). Inside the body every section is
     the body-side section, so the wing box runs straight through the roof. */
  var YR = 2.15, YT = 24.37, YTEAM = 22.57, YKINK = 10.67;
  function wingLE(a) { return 10.535 + 0.5176 * Math.max(a, YR); }
  function wingTE(a) { a = Math.max(a, YR); return a < YKINK ? 20.627 + 0.1404 * a : 22.125 + 0.3325 * (a - YKINK); }
  function wingO(a) { return 4.74 - 0.057 * (Math.max(a, YR) - YR); }
  function wingTh(a) { return 0.61 - 0.0218 * (Math.max(a, YR) - YR); }
  function wingSec(y) {
    var a = Math.abs(y), le = wingLE(a), c = wingTE(a) - le;
    return { a: y, s: le, c: c, t: 2 * wingTh(a) / c, o: wingO(a) };
  }
  /* the height of the upper or lower skin at (s, y) */
  function wingSurf(s, y, lower) {
    var sec = wingSec(y), u = clamp((s - sec.s) / sec.c, 0, 1), th = foilHalf(sec.t, sec.c, u);
    return lower ? sec.o - th : sec.o + th;
  }
  function addWing() {
    var ys = [-YTEAM, -20.6, -18.4, -16.6, -14.2, -11.68, -YKINK, -9.0, -7.24, -5.0, -YR, 0, YR, 5.0,
              7.24, 9.0, YKINK, 11.68, 14.2, 16.6, 18.4, 20.6, YTEAM], i, secs = [];
    for (i = 0; i < ys.length; i++) secs.push(wingSec(ys[i]));
    foil(secs, "w", SKIN, 10);
    /* the outer 1.8 m: the team's colour on the upper skin only */
    foil([wingSec(YTEAM), wingSec(YT)], "w", { 0: "team", 1: "skin", 2: "skin" }, 10);
    foil([wingSec(-YT), wingSec(-YTEAM)], "w", { 0: "team", 1: "skin", 2: "skin" }, 10);
  }

  /* ============================================================== tail ==
     Fin: one loft from the root inside the tail cone, through the long
     dorsal fillet (its leading edge from s 29 at the crown), the swept fin
     and the flared neck into the fin-top fairing. */
  var FIN = [
    { a: 4.55, s: 29.00, c: 11.33, t: 0.075 },
    { a: 5.45, s: 29.00, c: 11.67, t: 0.090 },
    { a: 6.20, s: 33.20, c: 7.75, t: 0.105 },
    { a: 6.92, s: 34.94, c: 6.28, t: 0.110 },
    { a: 8.70, s: 36.37, c: 5.51, t: 0.110 },
    { a: 10.50, s: 37.81, c: 4.75, t: 0.115 },
    { a: 11.00, s: 37.95, c: 4.75, t: 0.180 },
    { a: 11.45, s: 38.00, c: 4.70, t: 0.180 }
  ];
  function finTE(h) { return 40.33 + (h - 4.58) * 0.3746; }
  function addFin() {
    foil(FIN.map(function (q) { return { a: q.a, s: q.s, c: q.c, t: q.t, o: 0 }; }), "f", SKIN, 10);
  }
  function tpSec(y) {
    var a = Math.abs(y), le = 38.0 + 0.5085 * a;
    return { a: y, s: le, c: (42.2 + 0.1825 * a) - le, t: 0.10 - 0.012 * a / 7.67, o: 11.72 };
  }
  function addTailplane() {
    var ys = [-7.67, -5.2, -2.6, -0.5, 0, 0.5, 2.6, 5.2, 7.67], i, secs = [];
    for (i = 0; i < ys.length; i++) secs.push(tpSec(ys[i]));
    foil(secs, "w", SKIN, 10);
  }
  /* the fin-top fairing: a body of revolution with the long pointed nose
     the photographs show, its tail the 44.2 m overall length */
  function addBullet() {
    var ROWS = [[34.50, 0.01], [35.00, 0.05], [35.80, 0.12], [36.80, 0.21], [37.80, 0.32],
                [39.00, 0.42], [40.50, 0.46], [42.00, 0.44], [43.00, 0.33], [43.70, 0.17], [44.20, 0.02]];
    var hc = 11.48, rings = [], r, i, n = 12, sh = new Shell();
    for (r = 0; r < ROWS.length; r++) {
      var ring = [], rr = ROWS[r][1];
      for (i = 0; i < n; i++) {
        var a = i * 2 * PI / n;
        ring.push([XS(ROWS[r][0]), rr * Math.sin(a), Z(hc + rr * Math.cos(a))]);
      }
      rings.push(ring);
    }
    sh.loft(rings, null, true, true);
    sh.emit({ 0: "team", 2: "team" });
  }

  /* ============================================================ nacelles ==
     TF33: the spinner proud of the lip, the fan cowl 1.64 m across to the fan
     exit 3.95 m back, then the core cowl, nozzle and plug. Rows: d metres
     behind the lip, radius. The cowls take their paint from a strip of their
     own, mapped along their length. */
  var COWL = [[0.30, 0.70], [0.00, 0.74], [0.07, 0.80], [0.45, 0.82], [3.55, 0.82], [3.95, 0.79]];
  var CORE = [[3.80, 0.68], [4.30, 0.66], [5.00, 0.52], [5.08, 0.50]];
  var SPIN = [[-0.62, 0.01], [-0.58, 0.08], [-0.45, 0.17], [-0.25, 0.25], [0.00, 0.29], [0.30, 0.31]];
  var PLUG = [[5.00, 0.38], [5.40, 0.33], [5.85, 0.18], [6.15, 0.03]];
  var NCX = 776, NCPX = 34, NCROW = 40;          /* the cowl strip in the sheet */
  function nacelleUV(xLip) {
    return function (g) {
      var p = g.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), k;
      for (k = 0; k < p.length / 3; k++) {
        var d = clamp(xLip - p[k * 3], 0, 6.6);
        uv[k * 2] = (NCX + d * NCPX) / TW; uv[k * 2 + 1] = 1 - NCROW / TH;
      }
      g.setAttribute("uv", new V.BufferAttribute(uv, 2));
      return g;
    };
  }
  function bodyOfRev(xLip, yc, hc, rows, n, map, uvf, capA, capB) {
    var rings = [], r, i, sh = new Shell();
    for (r = 0; r < rows.length; r++) {
      var ring = [];
      for (i = 0; i < n; i++) {
        var a = i * 2 * PI / n;
        ring.push([xLip - rows[r][0], yc + rows[r][1] * Math.sin(a), Z(hc) + rows[r][1] * Math.cos(a)]);
      }
      rings.push(ring);
    }
    sh.loft(rings, null, capA, capB);
    sh.emit(map, uvf);
  }
  /* a flat ring facing aft between two radii at d: the fan exit */
  function annulus(xLip, yc, hc, d, r0, r1, n, key) {
    var sh = new Shell(), i, a0 = [], a1 = [];
    for (i = 0; i < n; i++) {
      var a = i * 2 * PI / n;
      a0.push(sh.vert([xLip - d, yc + r0 * Math.sin(a), Z(hc) + r0 * Math.cos(a)]));
      a1.push(sh.vert([xLip - d, yc + r1 * Math.sin(a), Z(hc) + r1 * Math.cos(a)]));
    }
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n;
      sh.tri(a0[i], a1[i], a1[j], 0, [-1, 0, 0]); sh.tri(a0[i], a1[j], a0[j], 0, [-1, 0, 0]);
    }
    var m = {}; m[0] = key; sh.emit(m);
  }
  var ENG = [[10.87, 7.24, 2.43], [13.03, 11.68, 2.29]];
  function addNacelles() {
    var e, sd;
    for (e = 0; e < ENG.length; e++) {
      for (sd = -1; sd <= 1; sd += 2) {
        var s0 = ENG[e][0], y = sd * ENG[e][1], hc = ENG[e][2], xl = XS(s0);
        bodyOfRev(xl, y, hc, COWL, 14, SKIN, nacelleUV(xl), false, false);
        bodyOfRev(xl, y, hc, [[0.30, 0.70]], 14, { 2: "ink" }, null, true, false);      /* fan face */
        bodyOfRev(xl, y, hc, SPIN, 10, { 0: "hot", 2: "hot" }, null, false, false);
        annulus(xl, y, hc, 3.92, 0.79, 0.66, 14, "ink");                                /* fan exit */
        bodyOfRev(xl, y, hc, CORE, 12, SKIN, nacelleUV(xl), false, false);
        bodyOfRev(xl, y, hc, [[5.10, 0.49]], 10, { 2: "ink" }, null, true, false);       /* core exit */
        bodyOfRev(xl, y, hc, PLUG, 10, { 0: "hot", 2: "hot" }, null, false, false);
        addPylon(s0, y, hc);
      }
    }
  }
  /* the pylon: its leading edge from the cowl's top just behind the lip up
     into the wing's leading edge, its root on the wing to half the chord
     (the drawing's side view; the 1964 photograph) */
  function addPylon(s0, y, hc) {
    var sec = wingSec(Math.abs(y));
    var bot = { a: hc + 0.70, s: s0 + 0.35, c: 4.10, t: 0.11, o: y };
    var top = { a: sec.o, s: sec.s + 0.05, c: 0.50 * sec.c, t: 0.12, o: y };
    foil([bot, top], "f", SKIN, 8);
  }

  /* ============================================================== glass ==
     Panes laid on the nose skin, 6 cm proud, placed by height as the drawing
     gives them: the narrow centre pane, the two windscreens and the two
     side panes in a band 3.42-3.97 m up, and a side window behind them. */
  function ptAH(a, h, push) {
    var lo = 0.2, hi = 5.0, k;
    for (k = 0; k < 30; k++) {
      var mid = (lo + hi) / 2;
      if (fusPt(mid, a, 0)[2] < Z(h)) lo = mid; else hi = mid;
    }
    return fusPt((lo + hi) / 2, a, push);
  }
  function ptSH(s, h, sd, push) {
    var lo = 0, hi = 180, k;
    for (k = 0; k < 30; k++) {
      var mid = (lo + hi) / 2;
      if (fusPt(s, mid, 0)[2] > Z(h)) lo = mid; else hi = mid;
    }
    return fusPt(s, sd * (lo + hi) / 2, push);
  }
  function pane(sh, f, nu, nv) {
    var i, j, ids = [];
    for (i = 0; i <= nu; i++) {
      var row = [];
      for (j = 0; j <= nv; j++) row.push(sh.vert(f(i / nu, j / nv)));
      ids.push(row);
    }
    for (i = 0; i < nu; i++) {
      for (j = 0; j < nv; j++) {
        var A = sh.P[ids[i][j]], C = sh.P[ids[i + 1][j + 1]];
        var od = [(A[0] + C[0]) / 2 - X(3.0), (A[1] + C[1]) / 2, (A[2] + C[2]) / 2 - Z(2.7)];
        sh.tri(ids[i][j], ids[i][j + 1], ids[i + 1][j + 1], 0, od);
        sh.tri(ids[i][j], ids[i + 1][j + 1], ids[i + 1][j], 0, od);
      }
    }
  }
  function addGlass() {
    var sh = new Shell(), PP = 0.05;
    pane(sh, function (u, v) { return ptAH(-4 + 8 * u, 3.44 + 0.50 * v, PP); }, 1, 2);          /* centre pane */
    [-1, 1].forEach(function (sd) {
      pane(sh, function (u, v) { return ptAH(sd * (7.5 + 24 * u), 3.42 + 0.55 * v, PP); }, 3, 2); /* windscreen */
      pane(sh, function (u, v) { return ptAH(sd * (35 + 19 * u), 3.42 + 0.52 * v, PP); }, 2, 2);  /* side pane  */
      pane(sh, function (u, v) { return ptSH(2.50 + 0.47 * u, 3.48 + 0.48 * v, sd, PP); }, 1, 1); /* aft window */
    });
    sh.emit({ 0: "glass" });
  }

  /* ============================================================== gear ==
     Nose: one leg 3.15 m aft of the nose, twin wheels. Main: two axles a
     side (s 18.7 and 19.92) under the sponsons, two wheels abreast on each,
     2.25 and 3.05 m out (the drawing). Every tyre stands on h = 0. */
  var _m4 = null, _q = null, _v = null, _u = null;
  function boxG(sx, sy, sz, x, y, z) {
    var g = new V.BoxGeometry(sx, sy, sz);
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
  function wheelG(r, w, x, y, z, seg) {      /* the axle runs along Y */
    var g = new V.CylinderGeometry(r, r, w, seg || 18);
    g.translate(x, y, z);
    return g;
  }
  function addGear(G) {
    var sd, k, keep = SH;
    /* nose: the nose section is ahead of both plugs */
    SH = 0;
    var xn = XS(3.15);
    G.metal.push(rod([xn + 0.05, 0, Z(0.95)], [xn, 0, Z(0.43)], 0.09, 8));
    G.metal.push(rod([XS(3.85), 0, Z(0.78)], [xn, 0, Z(0.66)], 0.045, 6));
    G.metal.push(rod([xn, -0.32, Z(0.43)], [xn, 0.32, Z(0.43)], 0.05, 6));
    for (k = -1; k <= 1; k += 2) {
      G.tyre.push(wheelG(0.43, 0.28, xn, k * 0.30, Z(0.43), 14));
      G.metal.push(wheelG(0.21, 0.30, xn, k * 0.30, Z(0.43), 7));
    }
    /* main: between the plugs */
    SH = VV.pf;
    for (sd = -1; sd <= 1; sd += 2) {
      G.metal.push(rod([XS(19.31), sd * 2.65, Z(1.45)], [XS(19.31), sd * 2.65, Z(0.70)], 0.13, 8));
      G.metal.push(boxG(1.50, 0.22, 0.20, XS(19.31), sd * 2.65, Z(0.70)));
      [18.7, 19.92].forEach(function (s) {
        G.metal.push(rod([XS(s), sd * 2.05, Z(0.56)], [XS(s), sd * 3.25, Z(0.56)], 0.07, 6));
        [2.25, 3.05].forEach(function (yw) {
          G.tyre.push(wheelG(0.56, 0.40, XS(s), sd * yw, Z(0.56), 12));
          G.metal.push(wheelG(0.28, 0.42, XS(s), sd * yw, Z(0.56), 7));
        });
      });
    }
    SH = keep;
  }

  /* ============================================================= paint ==
     One sheet for the whole airframe: four plan views at 14 px to the metre
     (from above, from port, from starboard, from below), and a strip for the
     nacelle cowls. Every skin triangle takes its UVs by projection into the
     band its normal faces (projUV), so the panel lines, doors and insignia
     land where they are on the aeroplane, in metres. Cached per variant. */
  var PXM = 14, TW = 1024, TH = 2048;
  var YMAX = 24.6, TOPH = 690, HTOP = 12.3, SIDEH = 176;
  var B_PORT = TOPH, B_STBD = TOPH + SIDEH, B_BOT = TOPH + 2 * SIDEH;
  var XMIN = -26.3;                      /* set per variant: the tail's x - 0.6 */
  function cu(x) { return clamp((x - XMIN) * PXM, 1, 760); }
  function rTop(y) { return clamp((YMAX - y) * PXM, 1, TOPH - 1); }
  function rBot(y) { return B_BOT + clamp((YMAX - y) * PXM, 1, TOPH - 1); }
  function rSide(z, stbd) { return (stbd ? B_STBD : B_PORT) + clamp((Z(HTOP) - z) * PXM, 1, SIDEH - 1); }

  /* the finishes. Hexes are authored darker than the photographs read: the
     renderer's ACES pass lifts mid greys (pla_e00_destroyer.js). */
  var PAINT = {
    metal:  { base: "#a3aaae", wing: "#70787c", nac: "#a8afb3", gloss: true,
              line: "rgba(52,58,62,0.50)", seam: "rgba(52,58,62,0.28)", dome: 0x141618 },
    lizard: { base: "#3d4838", blobs: [["#55623f", 3.0, 5.2], ["#575d5f", 2.8, 5.0]], nac: "#575d5f",
              line: "rgba(14,18,14,0.55)", seam: "rgba(14,18,14,0.30)", dome: 0x2f3a2c, hatch: "rgba(178,150,62,0.85)" }
  };
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
  function poly(g, pts, col) {
    var i;
    g.fillStyle = col; g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
    g.closePath(); g.fill();
  }
  function disc(g, u, v, r, col) {
    g.fillStyle = col; g.beginPath(); g.arc(u, v, r, 0, PI * 2); g.closePath(); g.fill();
  }
  /* the star-and-bar in the full colours of the 1960s photographs: the blue
     disc, the white star, the white bars with their red stripe, all outlined
     in blue (in the C-17 hero's and the F-35 hero's places) */
  function starBar(g, u, v, r) {
    var i, a, BL = "rgba(30,48,98,0.96)", WH = "rgba(226,228,230,0.97)", RD = "rgba(168,36,44,0.96)";
    g.fillStyle = BL;
    g.fillRect(u - r * 2.08, v - r * 0.42, r * 4.16, r * 0.84);
    disc(g, u, v, r * 1.06, BL);
    g.fillStyle = WH;
    g.fillRect(u - r * 2.0, v - r * 0.34, r * 4.0, r * 0.68);
    g.fillStyle = RD;
    g.fillRect(u - r * 2.0, v - r * 0.11, r * 4.0, r * 0.22);
    disc(g, u, v, r, BL);
    g.fillStyle = WH;
    g.beginPath();
    for (i = 0; i < 10; i++) {
      a = -PI / 2 + i * PI / 5;
      var rr = i % 2 ? r * 0.38 : r * 0.96;
      if (i === 0) g.moveTo(u + rr * Math.cos(a), v + rr * Math.sin(a));
      else g.lineTo(u + rr * Math.cos(a), v + rr * Math.sin(a));
    }
    g.closePath(); g.fill();
  }
  /* a wavy patch of camouflage, rx by ry pixels */
  function blob(g, R, u, v, rx, ry, col) {
    var i, n = 16, pts = [], ph = R() * 6.28, k1 = 0.16 + R() * 0.14, k2 = 0.08 + R() * 0.1;
    for (i = 0; i < n; i++) {
      var a = i * 2 * PI / n, w = 1 + k1 * Math.sin(3 * a + ph) + k2 * Math.sin(5 * a + 2 * ph);
      pts.push([u + rx * w * Math.cos(a), v + ry * w * Math.sin(a)]);
    }
    poly(g, pts, col);
  }

  function paintSheet(v) {
    var P = PAINT[v.paint];
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(v.id === "A" ? 1411 : 1412), i, k, sd, y, ys;
    var LINE = P.line, SEAM = P.seam;
    var sh0 = 0, sh1 = v.pf, sh2 = v.pf + v.pa;     /* nose, mid, tail shifts */
    function tp(s, yy, bot, sh) { return [cu(X(s + sh)), bot ? rBot(yy) : rTop(yy)]; }
    function sp(s, h, stbd, sh) { return [cu(X(s + sh)), rSide(Z(h), stbd)]; }
    function box(s0, s1, h0, h1, st, sh, col, lw) {
      trace(g, [sp(s0, h0, st, sh), sp(s1, h0, st, sh), sp(s1, h1, st, sh), sp(s0, h1, st, sh), sp(s0, h0, st, sh)], col, lw);
    }

    /* ---- the coats ---- */
    g.fillStyle = P.base; g.fillRect(0, 0, TW, TH);
    if (v.paint === "metal") {
      /* bare alloy: panel to panel the sheen differs (the 1964 photographs) */
      for (k = 0; k < 4; k++) {
        var top0 = [0, B_PORT, B_STBD, B_BOT][k], hgt = [TOPH, SIDEH, SIDEH, TOPH][k];
        for (var x0 = 0; x0 < 760; x0 += 18 + R() * 30) {
          g.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
          g.fillRect(x0, top0, 16 + R() * 26, hgt);
        }
      }
      /* the grey wing-top between the bare leading edge and the bare flaps
         and ailerons, both wings (the 1964 photograph from above) */
      for (sd = -1; sd <= 1; sd += 2) {
        var up = [], dn = [];
        for (y = YR; y <= YT + 0.01; y += 0.5) {
          var q = wingSec(y);
          up.push(tp(q.s + 0.12 * q.c, sd * y, false, sh1));
          dn.push(tp(q.s + 0.66 * q.c, sd * y, false, sh1));
        }
        poly(g, up.concat(dn.reverse()), P.wing);
      }
      /* a black strip along the top of the roof fairing, from the wing's
         trailing edge back (the 1964 photograph) */
      poly(g, [tp(20.3, 0.42, false, sh1), tp(24.6, 0.50, false, sh1), tp(25.3, 0.25, false, sh1),
               tp(25.3, -0.25, false, sh1), tp(24.6, -0.50, false, sh1), tp(20.3, -0.42, false, sh1)],
           "rgba(22,24,26,0.95)");
    } else {
      /* European One: dark green, green and grey in big wavy patches round
         the whole aeroplane, the bands painted alike */
      for (k = 0; k < 4; k++) {
        var tb = [0, B_PORT, B_STBD, B_BOT][k], hb = [TOPH, SIDEH, SIDEH, TOPH][k];
        var nper = k === 0 || k === 3 ? 26 : 11;
        for (var c = 0; c < P.blobs.length; c++) {
          for (i = 0; i < nper; i++) {
            var rad = (P.blobs[c][1] + (P.blobs[c][2] - P.blobs[c][1]) * R()) * PXM;
            blob(g, R, R() * 760, tb + R() * hb, rad * (1.0 + R() * 0.8), rad * (k === 1 || k === 2 ? 0.55 : 0.75),
                 P.blobs[c][0]);
          }
        }
      }
      for (i = 0; i < 60; i++) disc(g, R() * 760, R() * B_BOT + R() * TOPH, 6 + R() * 20,
                                    R() < 0.5 ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.035)");
    }

    /* ---- the wing, from above and below: leading-edge panel, spars, flaps,
       ailerons, spoilers ---- */
    for (k = 0; k < 2; k++) {
      var bot = k === 1;
      for (sd = -1; sd <= 1; sd += 2) {
        ys = []; for (y = YR + 0.3; y <= YT - 0.05; y += 0.6) ys.push(y);
        ys.push(YT - 0.05);
        var W = function (u, y0, y1) {
          return ys.filter(function (yy) { return yy >= y0 && yy <= y1; }).map(function (yy) {
            var q = wingSec(yy); return tp(q.s + u * q.c, sd * yy, bot, sh1); });
        };
        trace(g, W(0.09, 0, 30), LINE, 1.2);                              /* leading-edge panel */
        trace(g, W(0.72, 0, 16.6), LINE, 1.3);                            /* flap hinge         */
        trace(g, W(0.72, 16.6, 24.0), LINE, 1.3);                         /* aileron hinge      */
        [YR + 0.3, YKINK, 16.6, 24.0].forEach(function (yy) {
          var q = wingSec(yy);
          trace(g, [tp(q.s + 0.72 * q.c, sd * yy, bot, sh1), tp(q.s + q.c, sd * yy, bot, sh1)], LINE, 1.2);
        });
        if (!bot) {
          trace(g, W(0.16, 0, 30), SEAM, 0.8);                            /* front spar         */
          trace(g, W(0.62, 0, 30), SEAM, 0.8);                            /* rear spar          */
          /* the spoilers ahead of the flaps, inboard and outboard (plan) */
          [[2.6, 10.1], [10.4, 15.9]].forEach(function (p) {
            var q0 = wingSec(p[0]), q1 = wingSec(p[1]);
            trace(g, [tp(q0.s + 0.58 * q0.c, sd * p[0], false, sh1), tp(q1.s + 0.58 * q1.c, sd * p[1], false, sh1),
                      tp(q1.s + 0.69 * q1.c, sd * p[1], false, sh1), tp(q0.s + 0.69 * q0.c, sd * p[0], false, sh1),
                      tp(q0.s + 0.58 * q0.c, sd * p[0], false, sh1)], LINE, 1.0);
          });
        }
        /* the tailplane's elevator hinge */
        var ep = [];
        for (y = 0.6; y <= 7.6; y += 0.5) { var t = tpSec(y); ep.push(tp(t.s + 0.70 * t.c, sd * y, bot, sh2)); }
        trace(g, ep, LINE, 1.2);
      }
    }
    if (v.paint === "metal") {
      /* the port upper wing's star-and-bar, about 70 per cent out (the 1964
         photograph; the F-35 hero's place) */
      var qs = wingSec(17.2);
      var ws = tp(qs.s + 0.42 * qs.c, 17.2, false, sh1);
      starBar(g, ws[0], ws[1], 0.78 * PXM);
    }

    /* ---- from above: the roof ---- */
    for (sd = -1; sd <= 1; sd += 2) trace(g, [tp(5.5, sd * 1.1, false, 0), tp(38.0, sd * 1.1, false, sh2)], SEAM, 0.9);
    for (i = 0; i < 14; i++) {
      var sf = 5.0 + i * 2.6 + (i > 1 ? v.pf : 0);
      trace(g, [[cu(X(sf)), rTop(1.1)], [cu(X(sf)), rTop(-1.1)]], SEAM, 0.7);
    }
    /* two hatches on the roof (plan view), outlined in the B's yellow */
    [[4.55, 4.95], [7.85, 8.25]].forEach(function (p, j) {
      var shh = j === 1 && p[0] >= P1 ? sh1 : 0;
      var c0 = tp(p[0], -0.55, false, shh), c1 = tp(p[1], -0.95, false, shh);
      g.strokeStyle = P.hatch || LINE; g.lineWidth = 1.2;
      g.strokeRect(Math.min(c0[0], c1[0]), c0[1], Math.abs(c1[0] - c0[0]), c1[1] - c0[1]);
    });
    if (v.rec) {
      /* the receptacle's slipway: two light lines aft of the slot (the KC-135
         photograph) */
      trace(g, [[cu(X(3.7)), rTop(0)], [cu(X(6.4)), rTop(0)]], "rgba(200,204,200,0.65)", 1.4);
      trace(g, [[cu(X(4.7)), rTop(0.45)], [cu(X(4.7)), rTop(-0.45)]], "rgba(200,204,200,0.65)", 1.4);
    }

    /* ---- the sides ---- */
    for (k = 0; k < 2; k++) {
      var st = k === 1, HC = P.hatch || LINE;
      /* crew entrance door, port only (the drawing's side view) */
      if (!st) box(5.6, 6.4, 1.28, 2.58, st, 0, HC, 1.3);
      /* the paratroop door aft of the sponson, both sides, with its window */
      box(24.6, 25.6, 1.50, 3.20, st, sh1, HC, 1.3);
      var w1 = sp(25.1, 2.75, st, sh1);
      disc(g, w1[0], w1[1], 0.20 * PXM, "rgba(20,24,28,0.85)");
      /* small hatches high on the side (the drawing) */
      box(7.6, 8.2, 4.0, 4.35, st, sh1, HC, 1.0);
      box(24.8, 25.6, 4.2, 4.55, st, sh1, HC, 1.0);
      /* the ramp's side edge and the clamshell door: its forward edge up the
         upswept tail and its top edge 4.18 m up (the drawing's side view) */
      trace(g, [sp(26.85, 1.15, st, sh2), sp(30.4, 2.15, st, sh2)], LINE, 1.3);
      trace(g, [sp(30.4, bellyA(30.4) + 0.05, st, sh2), sp(30.4, 2.15, st, sh2), sp(34.2, 4.18, st, sh2),
                sp(39.4, 4.18, st, sh2), sp(40.1, 4.45, st, sh2)], LINE, 1.4);
      /* fuselage seams: a waist line and frames on the tail */
      trace(g, [sp(4.6, 3.95, st, 0), sp(P1, 3.95, st, 0)], SEAM, 0.9);
      trace(g, [sp(P1, 3.95, st, sh1), sp(25.8, 3.95, st, sh1)], SEAM, 0.9);
      for (i = 0; i < 5; i++) {
        var fr = 27.4 + i * 2.2;
        trace(g, [sp(fr, bellyA(fr) + 0.3, st, sh2), sp(fr, crownA(fr) - 0.4, st, sh2)], SEAM, 0.8);
      }
      /* the fin: the rudder hinge line (the drawing) */
      trace(g, [sp(38.6, 5.04, st, sh2), sp(41.5, 10.53, st, sh2)], LINE, 1.3);
      trace(g, [sp(39.85, 7.6, st, sh2), sp(finTE(7.6), 7.6, st, sh2)], LINE, 1.1);
      /* the A's national insignia on the rear fuselage (the 1964 and 1967
         photographs; the C-17 hero's place) */
      if (v.paint === "metal") {
        var c0 = sp(29.8, 3.10, st, sh2);
        starBar(g, c0[0], c0[1], 0.70 * PXM);
      }
    }

    /* ---- from below: the ramp, the clamshell doors, gear doors, keel ---- */
    function Bx(s0, s1, a, b, sh, col, lw) {
      trace(g, [tp(s0, a, true, sh), tp(s1, a, true, sh), tp(s1, b, true, sh), tp(s0, b, true, sh), tp(s0, a, true, sh)], col || LINE, lw || 1.3);
    }
    Bx(26.85, 30.4, -1.55, 1.55, sh2, LINE, 1.6);                      /* the ramp          */
    trace(g, [tp(30.4, 1.55, true, sh2), tp(36.0, 1.2, true, sh2), tp(40.2, 0.3, true, sh2),
              tp(40.2, -0.3, true, sh2), tp(36.0, -1.2, true, sh2), tp(30.4, -1.55, true, sh2)], LINE, 1.6);
    trace(g, [tp(30.4, 0, true, sh2), tp(40.2, 0, true, sh2)], LINE, 1.4);   /* the doors' split */
    for (i = 1; i < 3; i++) trace(g, [tp(26.85 + i * 1.18, 1.45, true, sh2), tp(26.85 + i * 1.18, -1.45, true, sh2)], SEAM, 0.9);
    Bx(2.6, 4.1, -0.38, 0.38, 0);                                      /* nose gear doors   */
    for (sd = -1; sd <= 1; sd += 2) Bx(17.4, 21.1, sd * 1.8, sd * 3.25, sh1);   /* main gear doors */
    trace(g, [tp(5.0, 0, true, 0), tp(P1, 0, true, 0)], SEAM, 0.9);
    trace(g, [tp(P1, 0, true, sh1), tp(25.8, 0, true, sh1)], SEAM, 0.9);

    /* ---- the nacelle strip: the lip, the fan cowl's seams, the fan exit
       and the core cowl, as rings along the cowl ---- */
    function nb(d0, d1, col) { g.fillStyle = col; g.fillRect(NCX + d0 * NCPX, 0, (d1 - d0) * NCPX, 80); }
    nb(0, 6.6, P.nac);
    nb(0, 0.22, v.paint === "metal" ? "#c4cacd" : "#6a7072");         /* the inlet lip   */
    nb(0.22, 0.27, "rgba(30,34,36,0.5)");
    nb(1.40, 1.44, "rgba(30,34,36,0.45)");
    nb(2.60, 2.65, "rgba(30,34,36,0.45)");
    nb(3.50, 3.95, v.paint === "metal" ? "#8d9498" : "#4c5254");      /* the fan nozzle  */
    nb(3.95, 6.6, v.paint === "metal" ? "#7a8186" : "#4a5052");       /* the core cowl, weathered */

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
      var endOn = Math.abs(nx) > 0.85;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], yy = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, Rr;
        if (band === 0) { U = cu(endOn ? x + yy * 0.3 : x); Rr = rTop(yy); }
        else if (band === 3) { U = cu(endOn ? x + yy * 0.3 : x); Rr = rBot(yy); }
        else { U = cu(endOn ? x + z * 0.3 : x); Rr = rSide(z, band === 2); }
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - Rr / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  /* ========================================================= materials ==
     SKIN: the painted sheet (bare alloy a little glossy on the A). DOME: the
     radome. TEAM exactly C.team. GLASS: the flight-deck panes. INK: the
     fan faces, the exits, the receptacle slot. HOT: spinners and plugs.
     METAL and TYRE: the gear. */
  function makeMats(C, v) {
    var P = PAINT[v.paint], tex = sheet(v), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: P.gloss ? 0.62 : 0.84,
                                          metalness: P.gloss ? 0.22 : 0.08, side: V.DoubleSide });
    if (tex) m.skin.map = tex; else m.skin.color.set(P.base);
    m.dome = new V.MeshStandardMaterial({ color: P.dome, roughness: 0.55, metalness: 0.05, side: V.DoubleSide });
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10,
                                          side: V.DoubleSide });
    m.glass = new V.MeshStandardMaterial({ color: 0x24313b, roughness: 0.12, metalness: 0.50,
                                           transparent: true, opacity: 0.85, side: V.DoubleSide });
    m.ink = new V.MeshStandardMaterial({ color: 0x08090a, roughness: 0.95, metalness: 0.03,
                                         side: V.DoubleSide });
    m.hot = new V.MeshStandardMaterial({ color: 0x45484a, roughness: 0.55, metalness: 0.50,
                                         side: V.DoubleSide });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.tyre = new V.MeshStandardMaterial({ color: 0x151617, roughness: 0.95, metalness: 0.02 });
    return m;
  }

  function merge(list) {
    var pos = [], nor = [], uvs = [], hasUV = false, i, j;
    for (i = 0; i < list.length; i++) if (list[i].attributes.uv) hasUV = true;
    for (i = 0; i < list.length; i++) {
      var g = list[i].index ? list[i].toNonIndexed() : list[i];
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      var u = g.attributes.uv ? g.attributes.uv.array : null;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
      if (hasUV) for (j = 0; j < p.length / 3; j++) { uvs.push(u ? u[j * 2] : 0.5, u ? u[j * 2 + 1] : 0.5); }
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    if (hasUV) out.setAttribute("uv", new V.Float32BufferAttribute(uvs, 2));
    return out;
  }
  function emit(parent, lists, mats, order) {
    for (var i = 0; i < order.length; i++) {
      var key = order[i];
      if (!lists[key] || !lists[key].length) continue;
      parent.add(new V.Mesh(merge(lists[key]), mats[key]));
    }
  }

  function build(THREE, M, C, which) {
    V = THREE;
    VV = VARS[which] || VARS.A;
    LEN = VV.len; XN = LEN / 2; XMIN = -XN - 0.6;
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    K = {};
    SH = 0;
    addFuselage();
    addGlass();
    if (VV.rec) addReceptacle();
    SH = VV.pf;                            /* the wing, its fairings, pods and gear */
    addFillet();
    addRoofFairing();
    addSponsons();
    addWing();
    addNacelles();
    SH = VV.pf + VV.pa;                    /* the tail */
    addFin();
    addTailplane();
    addBullet();
    SH = 0;
    var G = { metal: [], tyre: [] };
    addGear(G);
    var mats = makeMats(C, VV);
    var root = new V.Group();
    emit(root, K, mats, ["skin", "dome", "team", "ink", "hot", "glass"]);
    var gear = new V.Group();
    gear.name = "gear";
    emit(gear, G, mats, ["metal", "tyre"]);
    root.add(gear);
    return root;
  }

  return { build: build, VARS: VARS };
})();

/* The rows that fly it: the A as built, the B stretched. */
[["nato_e60_c141", "A"], ["nato_e80_c141", "B"]].forEach(function (r) {
  UNIT_MODELS[r[0]] = {
    len: HeroC141.VARS[r[1]].len,
    build: function (THREE, M, C) { return HeroC141.build(THREE, M, C, r[1]); }
  };
});
