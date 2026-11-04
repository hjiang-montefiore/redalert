/* ================= fr_transports.js  -  HERO MODELS =================
   The two French tactical transports of the Armee de l'Air and the
   Luftwaffe, each one builder with a VARIANTS table:

   HeroTransall  -  Transall C-160 (seven rows, read from js/eras.js):
     fra_e60_airlift  "F60"  C-160F (1967): no probe, the port cargo door.
     fra_e80_airlift  "N80"  C-160NG (1981): the refuelling probe over the
                             flight deck; the port cargo door deleted.
     fra_e90_airlift  "N90"  C-160NG to 2000s: as N80, in the later grey.
     deu_e60_airlift  "D60"  C-160D (1968-2021): no probe, the cargo door,
                             Luftwaffe camouflage.
     fra_e80_ewair    "G"    C-160G Gabriel (1989): an NG airframe with the
     fra_e90_ewair    "G"    probe, four aerial masts on the crown, a pod on
     fra_e00_ewair    "G"    each wing tip, the canoe radome under the
                             forward belly and the blister on the port side
                             of the rear fuselage. All three rows are the same
                             two aircraft, drawn alike.
   The NG's fifth fuel tank is inside the wing centre section and shows
   nothing outside (en.wikipedia "Transall C-160": "a fifth fuel tank in the
   middle of the wing above the fuselage"), so it is not drawn; the hose-drum
   unit of the NG tankers is not drawn (no reference consulted shows it).

   HeroNoratlas  -  Nord N.2501 Noratlas (three rows):
     fra_e50_airlift  "F50"  N.2501F, Armee de l'Air.
     deu_e50_airlift  "D50"  N.2501D, Luftwaffe.
     fra_e60_ewair    "G60"  N.2501 Gabriel (js/eras.js: "Nord N.2501
                             Noratlas Gabriel, ELINT conversion").
   (see the Noratlas header further down for its references)

   No national markings anywhere: no roundels, no crosses, no fin flashes,
   no serials or squadron codes. Team colour: exactly C.team, a band round
   each wing tip and the top of each fin.

   ======================================================= TRANSALL ====
   References (Wikimedia Commons, fetched for this model; measured with a
   pixel scan of the ink, scratchpad q_transall_ref/):
     D1 "Transall C-160 3-view line drawing.png" (580 x 357). Its three views
        are at three scales: side 275 px for the 32.40 m length (8.49 px/m),
        plan 244 px for the length (7.53 px/m) and 306 px for the 40.0 m span
        (7.65 px/m), front 345 px for the span (8.63 px/m). Measured off it:
        - side: the nose tip 1.5 m above the belly line, the nose's top and
          bottom lines station by station (FUS below), the windscreen 2.0 to
          3.4 m aft of the nose, the crown level from 4.1 m to the tail cone,
          the fuselage 34 px = 4.0 m deep; the wing-root fairing rising 1.2 m
          above the crown from 12.5 to 16.8 m; the dorsal fillet leaving the
          crown at 18.9 m and meeting the fin leading edge at 27.0 m, the fin
          leading edge 30 deg off the vertical, the fin top chord 29.5 to
          31.6 m, the rudder trailing edge almost upright; the rear belly
          rising 2.5 m from the upsweep to 27.0 m and 3.0 m at 31.2 m;
        - plan: the nose half-widths station by station (FUS), the fuselage
          4.2 m across over the outer lines, the sponsons 6.3 m across from a
          rounded nose at 9.4 m to 17.3 m; the wing leading edge straight at
          11.6 m to 6.3 m out and then swept back to 12.9 m at the tip; the
          trailing edge straight at 16.55 m to 9.5 m out and then forward to
          15.7 m at the tip, the tip 20.0 m out; the nacelles 5.2 m out and
          1.7 m wide, the prop plane 8.8 m aft of the nose, the nacelle tails
          to 17.3 m; the tailplane 14.7 m across, its leading edge 28.15 m at
          the root and 29.6 m at the tip, its trailing edge 32.1 m to 31.8 m;
          the tail cone narrowing from 24.4 m;
        - front: the hub 6.7 m under the fin top, the wing nearly level with
          about 1.5 deg of dihedral outboard, the prop discs 5.2 m across
          (published 5.49 m, drawn), the fuselage and sponsons from ahead.
        D1 draws no landing gear: fin top to the bottom of the sponson is
        90 px = 10.4 m in both side and front views, against the published
        11.65 m height (see P1 for how that is settled).
     D2 "C160-1.jpg" (a side profile of a Luftwaffe C-160D, 1600 px): a
        second side view, 38.1 px/m off the length. The fin top 6.6 m above
        the crown, the fuselage 3.94 m deep, the belly sweeping up from
        17.5 m, the tailplane about level with the crown; the port cargo
        door 5.25-7.25 m aft of the nose, the crew door ahead of it, the
        paratroop door over the aft end of the sponson, the round windows.
     P1 "Transall C-160 50+49 at STR 1.jpg" (starboard side at the moment of
        rotation, 2950 px, a long lens: the runway edge and the hangar roof
        are level in the frame, so the aircraft is parallel to the image
        plane). Nose 2865 px, tail 95 px: 85.5 px/m. The nose wheel is 53 px
        off the ground: the aircraft is pitched 3.4 deg nose up about its
        main wheels, so heights were taken perpendicular to the line through
        the wheel bottoms (the attitude it stands at on the ground):
        - the fin top 972 px = 11.4 m above that line (published 11.65 m;
          with the nose strut compressed at rest the tail stands a little
          higher still, so the published figure is drawn and the photograph
          does not contradict it);
        - fin top over the crown 6.7 m (D2: 6.6 m; D1's 6.2 m is 4 px of a
          1 px line and is not followed), the fuselage 3.82 m deep, the belly
          0.87 m over the wheel line just ahead of the sponsons;
        - nose wheels 2.93 m aft of the nose, the main wheels in tandem at
          12.6 and 14.2 m, all about 1.0 m across; the sponson 9.1 to 16.6 m
          (the plan of D1 says 9.4 to 17.3 m; D1's side, 9.7 to 18.5 m, is
          the outlier); the sponson's bottom about level with the belly;
        - the prop plane 8.6 m aft of the nose; the hub 0.32 m under the
          crown (D1's front view puts it level with it, its side view 0.7 m
          under: the photograph is taken);
        - the tail cone and the tailplane at about the crown's height.
     P2 "C-160G F221-GS (2005).jpg" (the Gabriel, port side from ahead, 2790
        px): four aerial masts on the crown ahead of the wing, the probe over
        the flight deck pointing at the camera, the black radome, an
        egg-shaped blister on the port side of the rear fuselage just behind
        the sponson, a pod on the starboard wing tip with blade aerials above
        and below it, the four-blade props, grey all over.
     P3 "C160G_F216_GT_(EE54)_BA128_2007_05_13_008.JPG" (the other Gabriel,
        port side of the nose, 2560 px): the probe - a straight pipe from a
        fairing on the roof just behind the windscreen, reaching well ahead
        of the radome -, the four masts (posts on a flared foot), the
        windscreen and eyebrow panes, the crew door behind the flight deck,
        a long shallow canoe under the forward belly starting just aft of
        the nose gear with a dark bulb at its front (the ventral radome),
        the port wing-tip pod.
     P4 "FAIRFORD 23 JULY 1995 FRENCH AIR FORCE C-160NG TRANSALL F205
        64-GE": a C-160NG in the French dark green and grey camouflage,
        wrapped round the belly.
     P5 "A2357-France-Transall-R213-RIAT2013.JPG": a renovated Transall in
        the later single grey; the sponson's rounded nose; the main gear,
        two tandem axles of twin wheels a side.
     P6 "Landing gear&APU C-160 AirExpo 2008.jpg": the sponson opened up,
        the tandem twin wheels under it.
     P7 "C-160 Transall 51+08 Vorbeiflug.jpg" (from below): the plan shape,
        the straight centre wing and tapered outer panels, the nacelles
        reaching aft of the trailing edge.
     P8 "50+61 German Air Force Transall C-160D ILA Berlin 2016 17.jpg": the
        Luftwaffe camouflage, the prop discs.
   Published (en.wikipedia "Transall C-160"): length 32.40 m, span 40.00 m,
   height 11.65 m, wing area 160 m2 (D1's plan gives 171 m2 including the
   fuselage), two Tyne RTy.20 Mk 22, four-blade Ratier-Forest props 5.486 m
   across; hold 17.20 x 3.15 x 2.98 m.

   Recognition, at game zoom:
     1. the long straight high wing on a hump over the fuselage, the
        straight centre section and tapered outer panels (D1, P7);
     2. two deep Tyne nacelles slung under the wing reaching aft past the
        trailing edge, the big four-blade props close to the fuselage (D1,
        P2);
     3. the blunt black radome and the stepped flight-deck glazing (P2, P3);
     4. the long gear sponsons low on the sides, tandem twin wheels (P1,
        P5, P6);
     5. the upswept rear fuselage over the ramp (D1, D2, P1);
     6. the tall fin with the long dorsal fillet, the tailplane on the tail
        cone (D1, P1);
     7. the NG's probe over the flight deck (P2, P3);
     8. the Gabriel's crown masts, tip pods, canoe and blister (P2, P3).

   NOT CONFIRMED (estimated, and drawn plainly):
     - the probe's length, rise and lateral position: P3 shows it from the
       front quarter only. Drawn on the centreline, 6.2 m long, its tip
       2.6 m ahead of the nose, rising 0.3 m;
     - the Gabriel's mast heights (0.7 m, P3 against the fuselage depth) and
       stations (4.1, 4.8, 5.5, 7.2 m, from P2's perspective); whether
       there are masts behind the wing (none visible in P2 or P3);
     - the canoe radome's width (no view from below): 1.2 m; its length
       (3.7 to 6.4 m) and depth (0.3 m) are from P3's front quarter;
     - the side blister's size (1.5 x 0.9 m, 0.45 m proud) and whether there
       is one on the starboard side (no photograph of that side): drawn on
       the port side only;
     - the wing-tip pod's size (2.4 m long, 0.44 m through);
     - the 18 / 12 per cent wing thickness and the dihedral (D1's front view
       is 1-2 px);
     - the main-gear track (twin wheels 2.2 and 2.75 m out, inside the
       sponsons of D1);
     - the paint of the 1967-1970s rows: no photograph of an early C-160F
       or C-160D was consulted; the F60 row wears P4's camouflage and the
       D60 row P1/P8's;
     - the paratroop door's exact station (D2 against P1, within 0.5 m).

   Model space: +X nose, +Y left (port), +Z up, metres; x = 0 is the
   fuselage's mid-length (16.2 m aft of the nose), z = 0 the fuselage axis
   2.975 m above the ground (Z(h)); d below is metres aft of the nose, h
   metres above the ground. One mesh per material, the gear in a group named
   "gear". The paint is one canvas sheet per guise in four plan views (from
   above, port, starboard, below), every skin triangle projected into the
   view its normal faces, the scheme of js/hero/us_c130_hercules.js, whose
   geometry kit (Shell, foil lofts, pods, blades, the see-through prop disc)
   is copied below.
   ========================================================================= */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTransall = null, HeroNoratlas = null;

(function () {
  "use strict";

  /* =================================================== the shared kit ==
     Copied from js/hero/us_c130_hercules.js (Shell, ringSE, foils, pods,
     blades, rods, merge-per-material, projected paint UVs). */
  var V = null;
  var D2R = Math.PI / 180;
  var _m4 = null, _q = null, _v = null, _u = null;
  var K = null, G = null;            /* the lists, one per material: airframe and gear */
  function put(key, g) { (K[key] || (K[key] = [])).push(g); }
  function sgp(v, e) { return v < 0 ? -Math.pow(-v, e) : Math.pow(v, e); }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
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
    var t = (s - b[0]) / Math.max(1e-6, c[0] - b[0]);
    for (k = 1; k < b.length; k++) out.push(cr(a[k], b[k], c[k], d[k], t));
    return out;
  }
  /* a straight-line look-up (for profiles with corners) */
  function lin(rows, s) {
    var n = rows.length, i = 0, k, out = [];
    if (s <= rows[0][0]) return rows[0].slice(1);
    if (s >= rows[n - 1][0]) return rows[n - 1].slice(1);
    while (rows[i + 1][0] < s) i++;
    var b = rows[i], c = rows[i + 1], t = (s - b[0]) / Math.max(1e-6, c[0] - b[0]);
    for (k = 1; k < b.length; k++) out.push(b[k] + (c[k] - b[k]) * t);
    return out;
  }
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

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
    for (i = 0; i < n; i++) this.tri(ic, ids[i], ids[(i + 1) % n], cat, od);
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
      var mc = [(cent[r][0] + cent[r + 1][0]) / 2, (cent[r][1] + cent[r + 1][1]) / 2, (cent[r][2] + cent[r + 1][2]) / 2];
      for (i = 0; i < n; i++) {
        j = (i + 1) % n;
        var A = rings[r][i], B = rings[r][j], C = rings[r + 1][j], D = rings[r + 1][i];
        var od = [(A[0] + B[0] + C[0] + D[0]) / 4 - mc[0], (A[1] + B[1] + C[1] + D[1]) / 4 - mc[1],
                  (A[2] + B[2] + C[2] + D[2]) / 4 - mc[2]];
        var cat = catOf ? catOf(i, r, A, B, C, D) : "skin";
        this.tri(idx[r][i], idx[r][j], idx[r + 1][j], cat, od);
        this.tri(idx[r][i], idx[r + 1][j], idx[r + 1][i], cat, od);
      }
    }
    if (capA) this.fan(rings[0], cent[0], cent[1], capA);
    if (capB) this.fan(rings[R - 1], cent[R - 1], cent[R - 2], capB);
  };
  Shell.prototype.sheet = function (grid, cat, ref) {
    var ids = [], i, j;
    for (i = 0; i < grid.length; i++) {
      var row = [];
      for (j = 0; j < grid[i].length; j++) row.push(this.vert(grid[i][j]));
      ids.push(row);
    }
    for (i = 0; i + 1 < grid.length; i++) {
      for (j = 0; j + 1 < grid[i].length; j++) {
        var A = grid[i][j], B = grid[i][j + 1], C = grid[i + 1][j + 1], D = grid[i + 1][j];
        var od = [(A[0] + B[0] + C[0] + D[0]) / 4 - ref[0], (A[1] + B[1] + C[1] + D[1]) / 4 - ref[1],
                  (A[2] + B[2] + C[2] + D[2]) / 4 - ref[2]];
        this.tri(ids[i][j], ids[i][j + 1], ids[i + 1][j + 1], cat, od);
        this.tri(ids[i][j], ids[i + 1][j + 1], ids[i + 1][j], cat, od);
      }
    }
  };
  Shell.prototype.emit = function () {
    var P = this.P, Tr = this.T, N = [], i, k;
    for (i = 0; i < P.length; i++) N.push([0, 0, 0]);
    for (k = 0; k < Tr.length; k++) {
      var t = Tr[k], pa = P[t[0]], pb = P[t[1]], pc = P[t[2]];
      var ux = pb[0] - pa[0], uy = pb[1] - pa[1], uz = pb[2] - pa[2];
      var vx = pc[0] - pa[0], vy = pc[1] - pa[1], vz = pc[2] - pa[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      for (i = 0; i < 3; i++) { var q = N[t[i]]; q[0] += nx; q[1] += ny; q[2] += nz; }
    }
    for (i = 0; i < N.length; i++) {
      var m = Math.sqrt(N[i][0] * N[i][0] + N[i][1] * N[i][1] + N[i][2] * N[i][2]) || 1;
      N[i][0] /= m; N[i][1] /= m; N[i][2] /= m;
    }
    var by = {};
    for (k = 0; k < Tr.length; k++) {
      var cat = Tr[k][3];
      if (!by[cat]) by[cat] = { pos: [], nor: [] };
      for (i = 0; i < 3; i++) {
        var p = P[Tr[k][i]], nn = N[Tr[k][i]];
        by[cat].pos.push(p[0], p[1], p[2]); by[cat].nor.push(nn[0], nn[1], nn[2]);
      }
    }
    for (var key in by) {
      var g = new V.BufferGeometry();
      g.setAttribute("position", new V.Float32BufferAttribute(by[key].pos, 3));
      g.setAttribute("normal", new V.Float32BufferAttribute(by[key].nor, 3));
      put(key, g);
    }
  };

  /* general ring: a superellipse about (x, yc), half-width w, top and bottom
     zt / zb (model z), widest at zw, squareness eU / eL */
  function ringSE(x, yc, w, zt, zb, zw, eU, eL, n) {
    var out = [], j;
    for (j = 0; j < n; j++) {
      var t = j / n * Math.PI * 2, c = Math.cos(t), s = Math.sin(t), e = s >= 0 ? eU : eL;
      out.push([x, yc + w * sgp(c, e), s >= 0 ? zw + (zt - zw) * sgp(s, e) : zw + (zw - zb) * sgp(s, e)]);
    }
    return out;
  }
  /* an airfoil ring: frame "w" across the span at y = a, chord plane at
     z = o; frame "f" up a fin at z = a, centred on y = o; s the leading
     edge's X */
  var FK = 10;
  function foilRing(s, c, t, a, o, frame, cam) {
    var up = [], lo = [], j, u, th, cm, ring = [];
    for (j = 0; j <= FK; j++) {
      u = (1 - Math.cos(Math.PI * j / FK)) / 2;
      th = t * c * (1.4845 * Math.sqrt(u) - 0.63 * u - 1.758 * u * u + 1.4215 * u * u * u - 0.518 * u * u * u * u);
      cm = (cam || 0) * 4 * u * (1 - u) * c;
      if (frame === "w") { up.push([s - u * c, a, o + cm + th]); lo.push([s - u * c, a, o + cm - th]); }
      else { up.push([s - u * c, o + th, a]); lo.push([s - u * c, o - th, a]); }
    }
    for (j = 0; j <= FK; j++) ring.push(up[j]);
    for (j = FK - 1; j >= 1; j--) ring.push(lo[j]);
    return ring;
  }
  function foilT(u) {
    return 1.4845 * Math.sqrt(u) - 0.63 * u - 1.758 * u * u + 1.4215 * u * u * u - 0.518 * u * u * u * u;
  }
  function foilLoft(rings, cat, capA, capB) {
    var sh = new Shell();
    sh.loft(rings, function () { return cat; }, capA ? cat : null, capB ? cat : null);
    sh.emit();
  }
  /* a body of revolution along -X from x0: prof rows [distance aft, radius] */
  function pod(x0, yc, zc, prof, n, capA, capB, cat) {
    var rings = prof.map(function (q) {
      var r = Math.max(q[1], 0.005), out = [], j;
      for (j = 0; j < n; j++) {
        var a = j / n * Math.PI * 2;
        out.push([x0 - q[0], yc + r * Math.cos(a), zc + r * Math.sin(a)]);
      }
      return out;
    });
    var sh = new Shell();
    sh.loft(rings, function () { return cat; }, capA ? cat : null, capB ? cat : null);
    sh.emit();
  }
  /* one blade, a twisted strip of six stations; a = its angle round the
     shaft from straight up; B: radii (fractions of the tip radius) and
     chords */
  function addBlade(B, rp, x, yc, zc, a) {
    var pos = [], k;
    var PT = [52, 42, 33, 26, 21, 18];
    var er = [Math.sin(a), Math.cos(a)], et = [Math.cos(a), -Math.sin(a)];
    for (k = 0; k < 6; k++) {
      var r = B.rr[k] * rp, hc = B.ch[k] / 2, pr = PT[k] * D2R;
      var by = yc + er[0] * r, bz = zc + er[1] * r;
      pos.push([x + hc * Math.sin(pr), by + et[0] * hc * Math.cos(pr), bz + et[1] * hc * Math.cos(pr)]);
      pos.push([x - hc * Math.sin(pr), by - et[0] * hc * Math.cos(pr), bz - et[1] * hc * Math.cos(pr)]);
    }
    var grid = [];
    for (k = 0; k < 6; k++) grid.push([pos[2 * k], pos[2 * k + 1]]);
    var sh = new Shell();
    sh.sheet(grid, "blade", [x + 1, yc, zc]);
    sh.emit();
  }
  /* a propeller: n static blades, the lowest a little off straight down,
     and the see-through disc (us_c130_hercules.js) */
  function addProp(B, n, rp, x, yc, zc, turn) {
    var a0 = (180 - turn) * D2R, k;
    for (k = 0; k < n; k++) addBlade(B, rp, x + 0.01, yc, zc, a0 + k * Math.PI * 2 / n);
    var dg = new V.CircleGeometry(rp, 28);
    dg.rotateY(Math.PI / 2); dg.translate(x - 0.03, yc, zc);
    put("blur", dg);
  }
  function rod(a, b, r, seg, r2) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r2 === undefined ? r : r2, r, L, seg || 8);
    _q.setFromUnitVectors(_u.set(0, 1, 0), _v.set(dx / L, dy / L, dz / L));
    _m4.makeRotationFromQuaternion(_q);
    _m4.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(_m4);
    return g;
  }
  function boxG(sx, sy, sz, x, y, z) {
    var g = new V.BoxGeometry(sx, sy, sz);
    g.translate(x, y, z);
    return g;
  }
  function egg(rx, ry, rz, x, y, z, ws, hs) {
    var g = new V.SphereGeometry(1, ws || 12, hs || 8);
    g.scale(rx, ry, rz);
    g.translate(x, y, z);
    return g;
  }
  function wheelG(r, w, x, y, z, seg) { var g = new V.CylinderGeometry(r, r, w, seg || 18); g.translate(x, y, z); return g; }

  /* ------------------------------------------------------------ paint --
     The sheet layout of us_c130_hercules.js: four plan views at 20 px a
     metre along the aeroplane, from above, port, starboard and below. */
  var TW = 768, TH = 2048, PX = 20, XMIN = -18.4, PY = 18, YMAX = 20.4, TOPH = 734;
  var PZ = 22, ZMAX = 9.6, SIDEH = 276, B_PORT = 736, B_STBD = 1014, B_BOT = 1292;
  function cu(x) { return clamp((x - XMIN) * PX, 1, TW - 1); }
  function rTop(y) { return clamp((YMAX - y) * PY, 1, TOPH - 1); }
  function rBot(y) { return B_BOT + clamp((YMAX - y) * PY, 1, TOPH - 1); }
  function rSide(z, stbd) { return (stbd ? B_STBD : B_PORT) + clamp((ZMAX - z) * PZ, 1, SIDEH - 1); }
  /* a painter over one sheet: coats, camouflage blobs, lines, discs */
  function Painter(seed, P) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    this.cv = cv; this.g = cv.getContext("2d"); this.R = rngFor(seed); this.P = P;
    this.LINE = "rgba(18,22,24," + P.seam + ")";
  }
  Painter.prototype.line = function (pts, col, lw) {
    var g = this.g;
    g.strokeStyle = col || this.LINE; g.lineWidth = lw || 1;
    g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
    for (var j = 1; j < pts.length; j++) g.lineTo(pts[j][0], pts[j][1]);
    g.stroke();
  };
  Painter.prototype.blob = function (cx, cy, rx, ry) {
    var g = this.g, n = 11, j, a, rr;
    g.beginPath();
    for (j = 0; j < n; j++) {
      a = j / n * Math.PI * 2; rr = 0.7 + 0.5 * this.R();
      if (j === 0) g.moveTo(cx + Math.cos(a) * rx * rr, cy + Math.sin(a) * ry * rr);
      else g.lineTo(cx + Math.cos(a) * rx * rr, cy + Math.sin(a) * ry * rr);
    }
    g.closePath(); g.fill();
  };
  Painter.prototype.disc = function (c, r, col) {   /* r in metres, on a side band */
    var g = this.g;
    g.fillStyle = col; g.save(); g.translate(c[0], c[1]); g.scale(PX, PZ);
    g.beginPath(); g.arc(0, 0, r, 0, Math.PI * 2); g.closePath(); g.fill(); g.restore();
  };
  /* the coats and the camouflage: P.top over all four bands, P.low below
     the demarcation (h) on the sides and on the belly; P.blobs wrap round */
  Painter.prototype.coats = function (demarcZ) {
    var g = this.g, P = this.P, R = this.R, i, k, b;
    g.fillStyle = P.top; g.fillRect(0, 0, TW, TOPH + 2);
    g.fillRect(0, B_PORT, TW, 2 * SIDEH + 4);
    g.fillStyle = P.low; g.fillRect(0, B_BOT - 2, TW, TH - B_BOT + 2);
    if (demarcZ !== null && demarcZ !== undefined) {
      for (var s = 0; s < 2; s++) { var r0 = rSide(demarcZ, s === 1); g.fillRect(0, r0, TW, (s ? B_STBD : B_PORT) + SIDEH - r0); }
    }
    var bands = [[0, TOPH, 1.0], [B_PORT, SIDEH, 0.45], [B_STBD, SIDEH, 0.45], [B_BOT, TOPH, P.wrap ? 1.0 : 0]];
    for (k = 0; k < P.blobs.length; k++) {
      g.fillStyle = P.blobs[k][0];
      for (b = 0; b < 4; b++) {
        var nb = Math.round(P.blobs[k][1] * bands[b][2]);
        for (i = 0; i < nb; i++) {
          var rad = (P.blobs[k][2] + (P.blobs[k][3] - P.blobs[k][2]) * R());
          var cy = bands[b][0] + R() * bands[b][1];
          if (demarcZ !== null && demarcZ !== undefined && (b === 1 || b === 2)) {
            var lim = rSide(demarcZ, b === 2) - rad * PZ * 0.6;
            if (cy > lim) cy = bands[b][0] + R() * Math.max(1, lim - bands[b][0]);
          }
          this.blob(R() * TW, cy, rad * PX, rad * (b === 0 || b === 3 ? PY : PZ));
        }
      }
    }
    for (i = 0; i < 70; i++) {                         /* a faint weathering */
      g.fillStyle = R() < 0.5 ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.04)";
      g.beginPath(); g.arc(R() * TW, R() * TH, 6 + R() * 22, 0, Math.PI * 2); g.closePath(); g.fill();
    }
  };
  Painter.prototype.texture = function () {
    var tex = new V.CanvasTexture(this.cv);
    tex.wrapS = tex.wrapT = V.ClampToEdgeWrapping;
    tex.anisotropy = 4;
    if (V.sRGBEncoding !== undefined) tex.encoding = V.sRGBEncoding;   /* r148 */
    return tex;
  };
  /* projected UVs: each triangle into the band its normal faces; faces that
     look fore or aft go to the plan views, laid along x plus a share of the
     span (us_c130_hercules.js) */
  function projUV(geo) {
    var p = geo.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var endOn = Math.abs(nx) > 0.8;
      var band = endOn ? (nz < -0.3 ? 3 : 0) : (nz > 0.5 ? 0 : nz < -0.5 ? 3 : (ny >= 0 ? 1 : 2));
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], yy = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, Rr;
        U = cu(endOn ? x + 0.35 * yy : x);
        if (band === 0) Rr = rTop(yy);
        else if (band === 3) Rr = rBot(yy);
        else Rr = rSide(z, band === 2);
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - Rr / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  /* materials: SKIN the painted sheet; DOME the radome; TEAM exactly
     C.team; METAL; INK flat black of intakes and openings; BLADE; BLUR the
     see-through prop disc (depthWrite off, so the parking code does not
     stand the aeroplane on it); GLASS; TYRE */
  function makeMats(C, P, tex) {
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: P.gloss ? 0.62 : 0.84,
                                          metalness: P.gloss ? 0.22 : 0.08, side: V.DoubleSide });
    if (tex) m.skin.map = tex; else m.skin.color.set(P.top);
    m.dome = new V.MeshStandardMaterial({ color: P.dome, roughness: 0.55, metalness: 0.05, side: V.DoubleSide });
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10, side: V.DoubleSide });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.ink = new V.MeshStandardMaterial({ color: 0x060708, roughness: 0.95, metalness: 0.03, side: V.DoubleSide });
    m.blade = new V.MeshStandardMaterial({ color: P.blade || 0x17191c, roughness: 0.62, metalness: 0.30, side: V.DoubleSide });
    m.blur = new V.MeshStandardMaterial({ color: 0xd2d8dc, roughness: 0.5, metalness: 0.0,
                                          transparent: true, opacity: 0.11, depthWrite: false, side: V.DoubleSide });
    m.glass = new V.MeshStandardMaterial({ color: 0x24333b, roughness: 0.12, metalness: 0.45,
                                           transparent: true, opacity: 0.86, side: V.DoubleSide });
    m.tyre = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    return m;
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
      var geo = merge(lists[key]);
      if (key === "skin") projUV(geo);
      parent.add(new V.Mesh(geo, mats[key]));
    }
  }
  function begin(THREE) {
    V = THREE;
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    K = {}; G = { metal: [], tyre: [] };
  }
  function finish(C, P, tex) {
    var mats = makeMats(C, P, tex);
    var root = new V.Group();
    emit(root, K, mats, ["skin", "dome", "team", "metal", "ink", "blade", "glass", "blur"]);
    var gear = new V.Group();
    gear.name = "gear";
    emit(gear, G, mats, ["metal", "tyre"]);
    root.add(gear);
    return root;
  }

  /* ================================================================
     ======================= TRANSALL C-160 ========================= */
  HeroTransall = (function () {
    var HC = 2.975, NOSE = 16.2, LEN = 32.4;
    function X(d) { return NOSE - d; }
    function Z(h) { return h - HC; }

    /* -------------------------------------------------------------- rows --
       probe: the NG's refuelling probe (P2, P3); door: the port cargo door,
       deleted on the NG (en.wikipedia); ew: the Gabriel fit (P2, P3). */
    var GAB = { id: "G", paint: "gab", probe: true, door: false, ew: true };
    var VARIANTS = {
      F60: { id: "F60", paint: "camoF", probe: false, door: true },
      N80: { id: "N80", paint: "camoF", probe: true, door: false },
      N90: { id: "N90", paint: "greyF", probe: true, door: false },
      D60: { id: "D60", paint: "camoD", probe: false, door: true },
      G80: GAB, G90: GAB, G00: GAB
    };
    var PROBE_TIP = 2.6;               /* metres ahead of the nose */
    function lenOf(which) { return LEN + (VARIANTS[which].probe ? PROBE_TIP : 0); }

    /* --------------------------------------------------------------- paint --
       Authored darker than the photographs read (the renderer's ACES pass
       lifts mid tones). camoF: P4, the French dark green and grey-blue,
       wrapped round the belly. greyF: P5's later single grey. camoD: P1 and
       P8, the Luftwaffe's olive, dark green and grey. gab: P2/P3, mid grey
       all over. The radome is black on every photograph. */
    var PAINT = {
      camoF: { top: "#3a4334", low: "#3a4334", seam: 0.16, wrap: true, dome: 0x111214, blade: 0x15171a,
               blobs: [["#55606a", 30, 1.6, 3.4], ["#2f3a2c", 18, 1.2, 2.4]] },
      greyF: { top: "#646d6b", low: "#626b69", seam: 0.15, wrap: true, dome: 0x111214, blade: 0x15171a,
               blobs: [["#5e6765", 26, 0.8, 2.0], ["#6b7472", 22, 0.8, 1.8]] },
      camoD: { top: "#4b5235", low: "#4b5235", seam: 0.16, wrap: true, dome: 0x111214, blade: 0x8a8f92,
               blobs: [["#36412e", 26, 1.5, 3.2], ["#3a3e42", 20, 1.4, 3.0]] },
      gab:   { top: "#5b6267", low: "#596065", seam: 0.15, wrap: true, dome: 0x111214, blade: 0x15171a,
               blobs: [["#555c61", 26, 0.8, 2.0], ["#61686d", 22, 0.8, 1.8]] }
    };

    /* ======================================================== fuselage ==
       Rows: d, half-width, top h, bottom h, the widest line's h, the
       squareness of the upper and lower halves. The nose's top line from
       D1's side (0.116 m per px above the belly; P1 agrees within 0.1 m from
       0.76 m aft), its half-widths from D1's plan; the nose tip 1.3 m over
       the belly and the lower nose line from P1 (D1 puts the tip at 1.5 m,
       D2 at 1.31 m: the photograph and D2 are taken); the crown easing
       down ahead of 6.6 m (P1); the body 4.1 m wide and 3.95 m deep (D1 4.2 x 4.0, P1 3.82
       deep, D2 3.94), the belly 1.0 m up (P1), the crown 4.95 m; the
       belly's upsweep from 17.4 m (P1, D2) and its line to the tail from
       P1 (overlaid at 85.2 px/m in the body frame: 1.9 m up at 20.5 m,
       3.2 m at 24.1 m, 4.3 m at 28 m, the tail end 4.8 m - D1's curve runs
       up to 0.6 m lower, D2 between), the tail cone narrowing from 24.4 m
       (D1 plan). */
    var FUS = [
      [0.00, 0.05, 2.34, 2.26, 2.30, 1.00, 1.00],
      [0.10, 0.36, 2.60, 2.02, 2.31, 1.00, 1.00],
      [0.27, 0.55, 2.78, 1.86, 2.33, 1.00, 1.00],
      [0.55, 0.80, 2.96, 1.72, 2.36, 1.00, 1.00],
      [0.94, 1.02, 3.15, 1.58, 2.40, 0.98, 0.95],
      [1.33, 1.13, 3.36, 1.46, 2.46, 0.97, 0.92],
      [1.64, 1.20, 3.50, 1.37, 2.53, 0.96, 0.88],
      [2.00, 1.33, 3.64, 1.29, 2.60, 0.95, 0.84],
      [2.35, 1.43, 4.08, 1.22, 2.68, 0.93, 0.80],
      [2.70, 1.51, 4.44, 1.16, 2.75, 0.92, 0.76],
      [3.05, 1.58, 4.62, 1.10, 2.82, 0.92, 0.72],
      [3.45, 1.71, 4.74, 1.06, 2.87, 0.92, 0.68],
      [3.98, 1.80, 4.84, 1.03, 2.91, 0.92, 0.64],
      [4.50, 1.88, 4.88, 1.01, 2.93, 0.92, 0.62],
      [5.20, 1.98, 4.92, 1.00, 2.95, 0.92, 0.60],
      [5.90, 2.05, 4.94, 1.00, 2.95, 0.92, 0.60],
      [6.60, 2.05, 4.95, 1.00, 2.95, 0.92, 0.60],
      [17.4, 2.05, 4.95, 1.00, 2.95, 0.92, 0.60],
      [18.4, 2.05, 4.95, 1.12, 3.00, 0.92, 0.58],
      [19.5, 2.05, 4.95, 1.48, 3.15, 0.93, 0.56],
      [20.5, 2.05, 4.95, 1.90, 3.35, 0.93, 0.54],
      [22.0, 2.05, 4.95, 2.45, 3.65, 0.94, 0.52],
      [24.1, 2.02, 4.95, 3.20, 4.05, 0.95, 0.52],
      [25.5, 1.86, 4.95, 3.58, 4.25, 0.96, 0.55],
      [26.6, 1.62, 4.95, 3.86, 4.40, 0.97, 0.60],
      [27.6, 1.40, 4.95, 4.08, 4.52, 0.98, 0.65],
      [28.6, 1.20, 4.95, 4.28, 4.62, 0.98, 0.70],
      [29.5, 0.88, 4.94, 4.45, 4.70, 1.00, 0.80],
      [30.5, 0.64, 4.93, 4.58, 4.76, 1.00, 0.90],
      [31.4, 0.50, 4.92, 4.68, 4.80, 1.00, 1.00],
      [32.0, 0.36, 4.90, 4.74, 4.82, 1.00, 1.00],
      [32.4, 0.06, 4.86, 4.80, 4.83, 1.00, 1.00]
    ];
    var FST = [0, 0.04, 0.10, 0.18, 0.27, 0.40, 0.55, 0.75, 0.94, 1.15, 1.33, 1.64, 2.0, 2.35, 2.7, 3.05, 3.45,
               3.98, 4.5, 5.2, 5.9, 6.6, 9.0, 12.0, 15.0, 17.4, 18.4, 19.5, 20.5, 21.2, 22.0, 23.0, 24.1, 25.5, 26.6,
               27.6, 28.6, 29.5, 30.5, 31.4, 32.0, 32.4];
    var FN = 32;
    function sec(d) { return tab(FUS, d); }
    function secPt(r, t) {
      var c = Math.cos(t), s = Math.sin(t), e = s >= 0 ? r[4] : r[5];
      return [r[0] * sgp(c, e), s >= 0 ? r[3] + (r[1] - r[3]) * sgp(s, e) : r[3] + (r[3] - r[2]) * sgp(s, e)];
    }
    function hullY(d, h) {
      var r = sec(d), up = h >= r[3], e = up ? r[4] : r[5];
      var v = up ? (h - r[3]) / Math.max(0.01, r[1] - r[3]) : (r[3] - h) / Math.max(0.01, r[3] - r[2]);
      v = clamp(v, 0, 0.999);
      var sn = Math.pow(v, 1 / e), c = Math.sqrt(Math.max(0, 1 - sn * sn));
      return r[0] * Math.pow(c, e);
    }
    function hullTopH(d, y) {
      var r = sec(d), e = r[4], c = Math.min(0.999, Math.abs(y) / r[0]);
      var cc = Math.pow(c, 1 / e), sn = Math.sqrt(Math.max(0, 1 - cc * cc));
      return r[3] + (r[1] - r[3]) * Math.pow(sn, e);
    }
    function addFuselage() {
      var rings = [], r, i, sh = new Shell();
      for (r = 0; r < FST.length; r++) {
        var s = sec(FST[r]), ring = [];
        for (i = 0; i < FN; i++) {
          var p = secPt(s, i / FN * Math.PI * 2);
          ring.push([X(FST[r]), p[0], Z(p[1])]);
        }
        rings.push(ring);
      }
      /* the black radome: everything ahead of the joint ring at 1.35 m
         (P2, P3) */
      sh.loft(rings, function (i, r) { return (FST[r] + FST[r + 1]) / 2 < 1.35 ? "dome" : "skin"; }, "dome", "skin");
      sh.emit();
    }

    /* ----------------------------------------------------------- glazing --
       P3 and P1 (the nose close up): two windscreen panes a side of the
       centre post, the big side pane and a smaller one behind it, two
       eyebrow panes in the roof over the windscreen. Laid 3 cm proud. */
    function paneSide(sh, d0, d1, h0, h1, side) {
      var grid = [], i, j;
      for (i = 0; i <= 2; i++) {
        var d = d0 + (d1 - d0) * i / 2, row = [];
        for (j = 0; j <= 2; j++) {
          var h = h0 + (h1 - h0) * j / 2, r = sec(d), y = hullY(d, h);
          var dz = h - r[3], dy = y, L = Math.sqrt(dy * dy + dz * dz) || 1;
          row.push([X(d), side * (y + 0.03 * dy / L), Z(h + 0.03 * dz / L)]);
        }
        grid.push(row);
      }
      var rr = sec((d0 + d1) / 2);
      sh.sheet(grid, "glass", [X((d0 + d1) / 2), 0, Z(rr[3])]);
    }
    function paneTop(sh, d0, d1, y0, y1) {
      var grid = [], i, j;
      for (i = 0; i <= 2; i++) {
        var d = d0 + (d1 - d0) * i / 2, row = [];
        for (j = 0; j <= 2; j++) {
          var y = y0 + (y1 - y0) * j / 2, r = sec(d), h = hullTopH(d, y);
          var dz = h - r[3], L = Math.sqrt(y * y + dz * dz) || 1;
          row.push([X(d), y + 0.03 * y / L, Z(h + 0.03 * dz / L)]);
        }
        grid.push(row);
      }
      var rr = sec((d0 + d1) / 2);
      sh.sheet(grid, "glass", [X((d0 + d1) / 2), 0, Z(rr[3])]);
    }
    function addGlass() {
      var sh = new Shell(), s;
      for (s = -1; s <= 1; s += 2) {
        paneTop(sh, 2.06, 2.40, s * 0.07, s * 0.58);       /* windscreen */
        paneTop(sh, 2.08, 2.44, s * 0.64, s * 1.02);
        paneTop(sh, 2.72, 3.02, s * 0.18, s * 0.62);       /* eyebrows in the roof */
        paneSide(sh, 2.50, 2.98, 3.92, 4.36, s);           /* side panes */
        paneSide(sh, 3.04, 3.38, 3.98, 4.40, s);
      }
      sh.emit();
    }

    /* ========================================================= sponsons ==
       Rows: d, outer half-width, top h, bottom h. From a rounded nose at
       9.2 m (P1 9.1, D1 plan 9.4; P5 shows the round nose) to 17.45 m
       (P1 16.6, D1 plan 17.3), 3.12 m out (D1 6.3 m across), from 0.85 m
       (level with the belly in P1) to 2.32 m (P1, D1). */
    var SPON = [[9.20, 2.15, 1.75, 1.25], [9.45, 2.55, 2.05, 1.00], [9.90, 2.85, 2.22, 0.88], [10.6, 3.05, 2.30, 0.85],
                [11.5, 3.12, 2.32, 0.85], [15.8, 3.12, 2.32, 0.85], [16.6, 3.00, 2.30, 0.92], [17.1, 2.75, 2.25, 1.10],
                [17.45, 2.35, 2.15, 1.40]];
    function addSponsons() {
      for (var s = -1; s <= 1; s += 2) {
        var rings = SPON.map(function (q) {
          var yc = 1.70, w = q[1] - yc;
          return ringSE(X(q[0]), s * yc, w, Z(q[2]), Z(q[3]), Z((q[2] + q[3]) / 2), 0.55, 0.50, 16);
        });
        var sh = new Shell();
        sh.loft(rings, null, "skin", "skin");
        sh.emit();
      }
    }

    /* ============================================================ wing ==
       D1 plan: the leading edge at 11.6 m to 6.3 m out, then back to 12.9 m
       at the 20.0 m tip; the trailing edge at 16.55 m to 9.5 m out, then
       forward to 15.7 m at the tip. The chord plane 5.45 m up, the lower
       surface on the crown (D1 front, P1); level to the nacelles, 1.5 deg
       of dihedral outboard (D1 front). 18 per cent thick at the root, 12 at
       the tip (NOT CONFIRMED). The last 0.6 m of each tip is the team's. */
    function wLE(y) { var a = Math.abs(y); return a <= 6.3 ? 11.6 : 11.6 + (a - 6.3) * 0.0949; }
    function wTE(y) { var a = Math.abs(y); return a <= 9.5 ? 16.55 : 16.55 - (a - 9.5) * 0.081; }
    function wH(y) { var a = Math.abs(y); return 5.45 + (a > 5.2 ? (a - 5.2) * 0.0262 : 0); }
    function wTC(y) { return 0.18 - 0.06 * Math.min(1, Math.abs(y) / 20.0); }
    var WCAM = 0.012, WTEAM = 19.4, WTIP = 20.0;
    function wingRing(y, k) {
      var le = wLE(y), te = wTE(y), c = te - le;
      if (k) { le += c * (1 - k) * 0.7; c *= k; }
      return foilRing(X(le), c, wTC(y) * (k ? 0.8 : 1), y, Z(wH(y)), "w", WCAM);
    }
    function wingSurf(y, d, upper) {
      var le = wLE(y), c = wTE(y) - le, u = clamp((d - le) / c, 0, 1), t = wTC(y);
      return wH(y) + WCAM * 4 * u * (1 - u) * c + (upper ? 1 : -1) * t * c * foilT(u);
    }
    function addWing(v) {
      var ys = [-WTEAM, -16.0, -12.5, -9.5, -6.3, -5.2, -3.0, 0, 3.0, 5.2, 6.3, 9.5, 12.5, 16.0, WTEAM];
      foilLoft(ys.map(function (y) { return wingRing(y); }), "skin", false, false);
      for (var s = -1; s <= 1; s += 2) {
        if (v.ew) foilLoft([wingRing(s * WTEAM), wingRing(s * WTIP)], "team", false, true);
        else foilLoft([wingRing(s * WTEAM), wingRing(s * 19.85), wingRing(s * WTIP, 0.75)], "team", false, true);
      }
    }
    /* the wing-root fairing: the hump over the centre section, from 10.4 to
       17.6 m, 6.15 m at its top (D1 side 6.1 m, D2 6.18 m), 2.2 m across
       (D1 plan) */
    var HUMP = [[10.4, 0.40, 5.00], [11.2, 0.85, 5.60], [12.4, 1.05, 5.98], [13.3, 1.10, 6.15], [15.0, 1.10, 6.15],
                [16.2, 1.05, 5.98], [17.0, 0.90, 5.62], [17.6, 0.45, 5.08]];
    function addHump() {
      var rings = HUMP.map(function (q) { return ringSE(X(q[0]), 0, q[1], Z(q[2]), Z(4.75), Z(4.85), 0.55, 1.0, 20); });
      var sh = new Shell();
      sh.loft(rings, null, "skin", "skin");
      sh.emit();
    }

    /* ============================================================ tail ==
       The fin: leading edge from 27.2 m at 6.9 m up (the end of the dorsal
       fillet, D1) to 29.4 m at the 11.6 m top (30 deg back, D1; P1 27
       deg), the top chord 2.3 m (D1 2.1, P1 2.5); the rudder's trailing
       edge from 32.25 m at the root to 31.7 m at the top (D1). The fillet
       leaves the crown at 18.6 m (D1 18.9, P1 18.5). The tailplane: 14.7 m
       across (D1), its leading edge 28.15 m at the root and 29.65 m at the
       tip, trailing edge 32.1 to 31.8 m, its chord plane at the crown's
       height (P1, D2). The fin top 11.6 m over the ground: published 11.65. */
    var FINTOP = 11.6;
    function finLE(h) { return 27.2 + (h - 6.9) * 0.468; }
    function finTE(h) { return 32.25 - (h - 4.95) * 0.0827; }
    function finRing(h, k) {
      var le = finLE(h), te = finTE(h), c = te - le;
      if (k) { le += c * (1 - k) * 0.5; c *= k; }
      return foilRing(X(le), c, 0.13 - 0.03 * clamp((h - 5) / 6.6, 0, 1), Z(h), 0, "f", 0);
    }
    function tpLE(y) { return 28.15 + Math.max(0, Math.abs(y) - 1.0) * 0.236; }
    function tpTE(y) { return 32.1 - Math.max(0, Math.abs(y) - 1.0) * 0.047; }
    function tpRing(y, k) {
      var le = tpLE(y), c = tpTE(y) - le;
      if (k) { le += c * (1 - k) * 0.6; c *= k; }
      return foilRing(X(le), c, 0.12 - 0.03 * Math.abs(y) / 7.35, y, Z(4.95), "w", 0);
    }
    function addTail() {
      var H = FINTOP, hs = [4.7, 5.6, 7.0, 8.6, 10.2, H - 0.45];
      foilLoft(hs.map(function (h) { return finRing(h); }), "skin", true, false);
      foilLoft([finRing(H - 0.45), finRing(H - 0.12), finRing(H, 0.9)], "team", false, true);
      /* the dorsal fillet, its leading edge rising 0.227 m a metre */
      var fr = [4.75, 5.3, 5.9, 6.5, 6.9].map(function (h) {
        var le = 18.6 + Math.max(0, h - 4.95) / 0.2267, te = 30.5, c = te - le;
        return foilRing(X(le), c, Math.min(0.12, 0.55 / c), Z(h), 0, "f", 0);
      });
      foilLoft(fr, "skin", true, true);
      var ys = [-7.35, -7.0, -5.0, -3.0, -1.0, 0, 1.0, 3.0, 5.0, 7.0, 7.35];
      foilLoft(ys.map(function (y) { return tpRing(y, Math.abs(y) > 7.3 ? 0.7 : 0); }), "skin", true, true);
    }

    /* ========================================================= engines ==
       Two Tyne nacelles 5.2 m out (D1), the prop plane 8.65 m aft of the
       nose (P1 8.6, D1 8.8), the hub 4.63 m up (P1: 0.32 m under the
       crown). Rows: distance aft of the prop plane, half-width, top and
       bottom about the hub: 1.7 m wide (D1 plan), the belly 3.5 m up (D1
       side 3.44), the top in the wing, the tail running past the trailing
       edge to 17.5 m (D1, P7). The intake is the dark ring round the
       spinner. Props: four blades, 5.486 m across (published). */
    var NAC = [[0.05, 0.42, 0.40, -0.50], [0.30, 0.62, 0.58, -0.80], [0.80, 0.78, 0.72, -1.02], [1.80, 0.84, 0.76, -1.10],
               [3.50, 0.84, 0.76, -1.06], [5.50, 0.76, 0.72, -0.92], [7.20, 0.58, 0.66, -0.62], [8.30, 0.34, 0.60, -0.28],
               [8.90, 0.08, 0.55, 0.05]];
    var SPIN = [[0, 0.03], [0.18, 0.20], [0.40, 0.32], [0.65, 0.40], [0.85, 0.43]];
    var BLADE = { rr: [0.15, 0.30, 0.48, 0.70, 0.90, 1.0], ch: [0.32, 0.46, 0.50, 0.48, 0.42, 0.30] };
    var ENGY = 5.2, HUB = 4.63, DP = 8.65, RP = 2.743;
    function addEngines() {
      var xP = X(DP), zh = Z(HUB);
      for (var s = -1; s <= 1; s += 2) {
        var yc = s * ENGY;
        var rings = NAC.map(function (q) {
          var zt = zh + q[2], zb = zh + q[3];
          return ringSE(X(DP + q[0]), yc, q[1], zt, zb, clamp(zh - 0.10, zb + 0.03, zt - 0.03), 0.85, 0.75, 18);
        });
        var sh = new Shell();
        sh.loft(rings, null, "ink", "skin");
        sh.emit();
        pod(xP + 0.85 - 0.02, yc, zh, SPIN, 14, false, true, "metal");
        addProp(BLADE, 4, RP, xP, yc, zh, s * 22);
      }
    }

    /* =========================================================== probe ==
       The NG's probe (P2, P3): a pipe from a fairing on the roof behind the
       windscreen, past the radome; its dimensions are NOT CONFIRMED. */
    function addProbe(v) {
      if (!v.probe) return;
      var a = [X(3.55), 0, Z(4.98)], b = [X(-PROBE_TIP), 0, Z(5.28)];
      put("metal", rod(a, b, 0.075, 8));
      put("metal", rod([X(-PROBE_TIP + 0.35), 0, Z(5.265)], b, 0.11, 8, 0.07));
      put("skin", egg(0.75, 0.20, 0.16, X(3.35), 0, Z(4.93), 10, 6));
    }

    /* ======================================================== Gabriel ==
       P2, P3: four masts on the crown ahead of the wing (posts on a flared
       foot), a pod on each wing tip with a blade above and below, the canoe
       radome under the forward belly with a dark bulb at its front, the
       egg-shaped blister on the port side behind the sponson. */
    function addGabriel(v) {
      if (!v.ew) return;
      [4.1, 4.8, 5.5, 7.2].forEach(function (d) {
        var h0 = sec(d)[1];
        put("skin", rod([X(d), 0, Z(h0 - 0.05)], [X(d), 0, Z(h0 + 0.16)], 0.22, 10, 0.09));
        put("skin", rod([X(d), 0, Z(h0 + 0.16)], [X(d), 0, Z(h0 + 0.72)], 0.09, 8, 0.07));
      });
      for (var s = -1; s <= 1; s += 2) {
        var yt = s * (WTIP + 0.05), zt = Z(wH(WTIP)), d0 = wLE(WTIP) - 0.25;
        pod(X(d0), yt, zt, [[0, 0.02], [0.25, 0.15], [0.7, 0.22], [1.7, 0.22], [2.2, 0.14], [2.4, 0.03]], 12, true, true, "skin");
        put("metal", boxG(0.30, 0.03, 0.42, X(d0 + 0.6), yt, zt + 0.40));
        put("metal", boxG(0.30, 0.03, 0.42, X(d0 + 0.6), yt, zt - 0.40));
      }
      /* the canoe, 3.7 to 6.4 m, 0.3 m deep, 1.2 m wide (NOT CONFIRMED) */
      var CAN = [[3.7, 0.20, 0.08], [3.95, 0.45, 0.24], [4.4, 0.58, 0.30], [5.8, 0.60, 0.30], [6.2, 0.45, 0.22], [6.45, 0.15, 0.06]];
      var rings = CAN.map(function (q) {
        var hb = sec(q[0])[2];
        return ringSE(X(q[0]), 0, q[1], Z(hb + 0.05), Z(hb - q[2]), Z(hb - q[2] * 0.4), 1.0, 0.6, 14);
      });
      var sh = new Shell();
      sh.loft(rings, null, "skin", "skin");
      sh.emit();
      put("dome", egg(0.32, 0.30, 0.17, X(3.95), 0, Z(sec(3.95)[2] - 0.12), 12, 6));
      /* the port blister behind the sponson (NOT CONFIRMED in size) */
      var db = 18.1, hb2 = 2.35, yb = hullY(db, hb2);
      put("skin", egg(0.78, 0.45, 0.46, X(db), yb, Z(hb2), 14, 8));
    }

    /* ============================================================ gear ==
       Named "gear": render3d.js stows it in flight. Mains: two tandem
       axles a side at 12.6 and 14.2 m (P1), twin wheels 1.0 m across (P1)
       on each, under the sponson (P5, P6); nose: twin wheels at 2.93 m
       (P1). Every tyre ends on the ground. */
    function addGear() {
      var s, R = 0.50, Wd = 0.38;
      [12.6, 14.2].forEach(function (d) {
        for (s = -1; s <= 1; s += 2) {
          var x = X(d);
          G.tyre.push(wheelG(R, Wd, x, s * 2.20, Z(R), 20));
          G.tyre.push(wheelG(R, Wd, x, s * 2.75, Z(R), 20));
          G.metal.push(wheelG(0.24, 1.0, x, s * 2.475, Z(R), 10));
          G.metal.push(rod([x, s * 2.475, Z(R)], [x + (d < 13 ? -0.5 : 0.5), s * 2.475, Z(1.55)], 0.10, 8));
        }
      });
      var rn = 0.45, xn = X(2.93);
      G.metal.push(rod([xn + 0.10, 0, Z(1.45)], [xn, 0, Z(rn)], 0.09, 8));
      G.metal.push(rod([xn - 0.6, 0, Z(1.30)], [xn, 0, Z(rn + 0.35)], 0.04, 6));
      G.metal.push(rod([xn, -0.34, Z(rn)], [xn, 0.34, Z(rn)], 0.05, 6));
      for (s = -1; s <= 1; s += 2) {
        G.tyre.push(wheelG(rn, 0.30, xn, s * 0.30, Z(rn), 18));
        G.metal.push(wheelG(0.17, 0.32, xn, s * 0.30, Z(rn), 8));
      }
    }

    /* ========================================================== paint ==
       Frames, the flap and aileron lines, the doors and windows (D2, P1,
       P3), the ramp and the cargo door from below. */
    var _tex = {};
    function paintSheet(v, P) {
      var pt = new Painter(7301 + v.id.charCodeAt(0) * 7 + (v.id.charCodeAt(1) || 0) * 13, P), g = pt.g;
      var DARK = "rgba(12,14,16,0.80)", EDGE = "rgba(10,12,14,0.50)";
      var d, y, s, k;
      pt.coats(null);
      function T_(dd, yy) { return [cu(X(dd)), rTop(yy)]; }
      function B_(dd, yy) { return [cu(X(dd)), rBot(yy)]; }
      function S_(dd, hh, st) { return [cu(X(dd)), rSide(Z(hh), st)]; }
      function rect(d0, d1, h0, h1, st, col, lw) {
        pt.line([S_(d0, h0, st), S_(d1, h0, st), S_(d1, h1, st), S_(d0, h1, st), S_(d0, h0, st)], col, lw);
      }
      /* from above: frames, the hump, the wing's flap and aileron lines */
      for (d = 3.0; d < LEN - 1.0; d += 1.5) pt.line([T_(d, -1.8), T_(d, 1.8)]);
      for (s = -1; s <= 1; s += 2) {
        for (var bnd = 0; bnd < 2; bnd++) {
          var wl = function (u, y0, y1) {
            var pts = [];
            for (y = y0; y <= y1 + 1e-6; y += 0.5) {
              var dd = wLE(y) + u * (wTE(y) - wLE(y));
              pts.push(bnd ? B_(dd, s * y) : T_(dd, s * y));
            }
            return pts;
          };
          pt.line(wl(0.72, 2.2, 12.5), pt.LINE, 1.3);            /* flap hinge */
          pt.line(wl(0.72, 12.5, 19.2), pt.LINE, 1.3);           /* aileron */
          pt.line(wl(0.12, 2.2, 19.3), pt.LINE, 1.0);            /* leading-edge panels */
          [6.3, 12.5].forEach(function (yy) {
            var p = wLE(yy) + 0.72 * (wTE(yy) - wLE(yy));
            pt.line(bnd ? [B_(p, s * yy), B_(wTE(yy), s * yy)] : [T_(p, s * yy), T_(wTE(yy), s * yy)], pt.LINE, 1.2);
          });
          var ep = [];
          for (y = 1.2; y <= 7.2; y += 0.5) { var de = tpLE(y) + 0.68 * (tpTE(y) - tpLE(y)); ep.push(bnd ? B_(de, s * y) : T_(de, s * y)); }
          pt.line(ep, pt.LINE, 1.2);
        }
        [0.7, 1.9, 3.2].forEach(function (q) { pt.line([T_(DP + q, s * (ENGY - 0.6)), T_(DP + q, s * (ENGY + 0.6))], pt.LINE, 1.0); });
      }
      /* from below: the ramp (18.0-24.0 m) and the cargo door behind it */
      for (d = 4.5; d < 17.0; d += 1.5) pt.line([B_(d, -1.3), B_(d, 1.3)], "rgba(18,22,24,0.08)", 1);
      pt.line([B_(18.0, -1.58), B_(24.0, -1.58), B_(24.0, 1.58), B_(18.0, 1.58), B_(18.0, -1.58)], "rgba(10,12,14,0.55)", 1.6);
      pt.line([B_(24.0, -1.5), B_(27.6, -1.1), B_(27.6, 1.1), B_(24.0, 1.5)], "rgba(10,12,14,0.55)", 1.6);
      pt.line([B_(2.2, -0.36), B_(3.9, -0.36), B_(3.9, 0.36), B_(2.2, 0.36), B_(2.2, -0.36)], pt.LINE, 1.3);
      /* the sides */
      for (k = 0; k < 2; k++) {
        var st = k === 1;
        for (d = 3.0; d < LEN - 2.0; d += 1.5) pt.line([S_(d, 1.0, st), S_(d, 4.9, st)], "rgba(18,22,24,0.09)", 1);
        pt.line([S_(1.35, 1.7, st), S_(1.35, 3.38, st)], pt.LINE, 1.2);         /* the radome joint */
        /* the ramp's edge along the side, parallel to the upswept belly */
        var rp = [];
        for (d = 18.0; d <= 27.6; d += 0.4) rp.push(S_(d, sec(d)[2] + 0.28, st));
        pt.line(rp, "rgba(10,12,14,0.40)", 1.5);
        /* the paratroop door over the aft end of the sponson (D2, P1) */
        rect(16.45, 17.25, 2.35, 4.15, st, EDGE, 1.5);
        /* the round windows (D2, P1) */
        [6.6, 10.3, 15.2].forEach(function (dd) { pt.disc(S_(dd, 3.6, st), 0.17, DARK); });
        pt.disc(S_(16.85, 3.55, st), 0.12, DARK);
        if (!st) {
          rect(4.30, 5.00, 1.20, 3.25, false, EDGE, 1.5);                     /* crew door (P3, D2) */
          if (v.door) rect(5.30, 7.30, 1.40, 3.35, false, EDGE, 1.7);         /* the cargo door (D2) */
        }
        /* the fin: rudder hinge */
        pt.line([S_(30.6, 5.6, st), S_(30.4, FINTOP - 0.5, st)], pt.LINE, 1.3);
        [0.7, 1.9, 3.2].forEach(function (q) { pt.line([S_(DP + q, 3.6, st), S_(DP + q, 5.3, st)], pt.LINE, 1.0); });
      }
      return pt.texture();
    }
    function sheet(v, P) {
      if (_tex[v.id] !== undefined) return _tex[v.id];
      try { _tex[v.id] = paintSheet(v, P); } catch (e) { _tex[v.id] = false; }
      return _tex[v.id];
    }

    function build(THREE, M, C, which) {
      begin(THREE);
      var v = VARIANTS[which] || VARIANTS.F60, P = PAINT[v.paint];
      addFuselage();
      addGlass();
      addSponsons();
      addWing(v);
      addHump();
      addTail();
      addEngines();
      addProbe(v);
      addGabriel(v);
      addGear();
      return finish(C, P, sheet(v, P));
    }
    return { build: build, variants: VARIANTS, lenOf: lenOf };
  })();

  /* ================================================================
     ======================= NORD N.2501 NORATLAS ===================
     References (Wikimedia Commons, fetched for this model, scratchpad
     q_noratlas_ref/). Commons has no three-view of the type (searched:
     "Noratlas 3-view", "drawing", "svg", "silhouette", "plan"), so the
     lengths are measured off a near-side photograph and everything else
     is scaled from the published figures:
     N1 "Nord 2501 Noratlas OTT2013 D7N8789 003.jpg" (F-AZVM overhead from
        below and the side, 3477 px; the long axis level in the frame).
        Nose 3300 px to the fin trailing edge 225 px = 21.96 m: 140 px/m.
        Measured along the aeroplane: the windscreen 0.6-1.6 m aft of the
        nose; the spinner tip 4.3 m and the prop plane 4.86 m; the wing's
        trailing edge straight at 10.7 m, the leading edge 6.93 m at the
        boom and 8.86 m at the tip, the chords 3.79 and 1.86 m (published
        area 101.2 m2, drawn 99 m2); the pod 15.36 m long, parallel to
        13.1 m and ending in a blunt round tail (the clamshell doors); the
        nose wheels at 1.79 m, the main wheels about 8.1 m (the two legs
        read 7.6 and 8.4 m, the view is from below), 1.2 m across; the fin
        top chord 20.15-21.6 m, the fin's root leading edge 19.4 m, the
        rudder reaching 0.6 m under the boom; the tailplane between the
        booms, 19.0 to 21.6 m; the upper prop blade 1.7 m from the hub;
        the round windows along the pod, the cockpit glazing high on the
        blunt nose.
     N2 "French Nord Noratlas.jpg" (from above in a bank): the plan - the
        pod, the two booms close in to it, the straight trailing edge, the
        tapered outer wing, the tailplane joining the booms only.
     N3 "N2501 BA128.JPG" (from ahead, BA 128 Metz, bare metal): the span
        1090 px against the boom spacing 246 px puts the booms 3.7 m out;
        the wing nearly level; the nacelles under the wing.
     N4 "154 Nord N.1501 Noratlas Speyer.jpg": the four-blade props, the
        radial cowls, the main legs coming down from the nacelles, the twin
        nose wheels, the round fin tips, bare metal.
     N5 "Nord 2501 Noratlas F-AZVM Hahnweide 2011 03.jpg", N6 "Nord Noratlas
        at Gatow side view.JPG" (a Luftwaffe N.2501D in grey): the nose and
        the stepped glazing; the Luftwaffe grey.
   Published (en.wikipedia "Nord Noratlas"): length 21.96 m, span 32.5 m,
   height 6.00 m, wing area 101.2 m2, two Bristol Hercules 738 radials,
   four-blade props (diameter not published).

   Recognition: the twin booms from the nacelles to the two fins joined by
   the tailplane; the short pod fuselage under the wing with the blunt
   glazed nose and the round blunt tail (clamshell doors); the straight
   wing tapering outboard; the radial cowls with four-blade props; the
   long main legs under the nacelles.

   The Gabriel (G60): no photograph or drawing of the Noratlas Gabriel's
   aerials or radomes was found on Commons ("Noratlas Gabriel", "Noratlas
   radome"; N3 at its home base shows none at that distance), so it is
   drawn as the plain airframe in bare metal and NO Gabriel aerials are
   drawn.

   NOT CONFIRMED (estimated from proportions, not measured):
     - every height but the fin top (published 6.00 m): the pod 2.9 m deep
       (N1's below-view ratio of pod to boom, about 3:1) and 2.8 m wide,
       its belly 0.95 m up, the wing chord plane 4.15 m up, the booms 1.0 m
       through with their axis 3.75 m up, the fin 1.65 m over the boom;
     - the prop diameter (3.5 m, N1's upper blade), the cowl (1.6 m);
     - the dihedral (1.5 deg outboard of the booms) and wing thickness;
     - the Gabriel fit (not drawn, above);
     - the main track (wheels under the booms, N3, N4).
   Paint: F50 and G60 bare metal (N3, N4, N1 - F-AZVM wears the 1950s
   finish), D50 the Luftwaffe grey (N6). Model space as the Transall: x = 0
   at mid-length (10.98 m aft of the nose), z = 0 2.4 m above the ground. */
  HeroNoratlas = (function () {
    var HC = 2.4, NOSE = 10.98, LEN = 21.96;
    function X(d) { return NOSE - d; }
    function Z(h) { return h - HC; }
    var VARIANTS = { F50: { id: "F50", paint: "metal" }, D50: { id: "D50", paint: "greyD" }, G60: { id: "G60", paint: "metal" } };
    var PAINT = {
      metal: { top: "#a9afb3", low: "#a3a9ad", seam: 0.20, gloss: true, dome: 0x2a2e31, blade: 0x1b1d20,
               blobs: [["#9ea4a8", 26, 0.8, 2.0], ["#b2b8bb", 22, 0.8, 1.8]] },
      greyD: { top: "#6b737a", low: "#6b737a", seam: 0.16, dome: 0x2a2e31, blade: 0x1b1d20,
               blobs: [["#646c73", 24, 0.8, 2.0], ["#737b82", 20, 0.8, 1.8]] }
    };
    /* the pod (N1 lengths; heights NOT CONFIRMED, above) */
    var FUS = [
      [0.00, 0.05, 2.70, 2.56, 2.63, 1.00, 1.00],
      [0.12, 0.50, 3.05, 2.15, 2.63, 1.00, 1.00],
      [0.35, 0.80, 3.30, 1.75, 2.62, 1.00, 0.95],
      [0.70, 1.05, 3.52, 1.42, 2.60, 0.95, 0.85],
      [1.10, 1.20, 3.68, 1.18, 2.55, 0.93, 0.75],
      [1.60, 1.32, 3.78, 1.03, 2.50, 0.92, 0.65],
      [2.30, 1.38, 3.84, 0.97, 2.45, 0.92, 0.60],
      [3.20, 1.40, 3.85, 0.95, 2.40, 0.92, 0.58],
      [12.4, 1.40, 3.85, 0.95, 2.40, 0.92, 0.58],
      [13.3, 1.34, 3.80, 1.10, 2.44, 0.94, 0.66],
      [14.0, 1.20, 3.66, 1.35, 2.50, 0.97, 0.78],
      [14.6, 0.98, 3.44, 1.66, 2.55, 1.00, 0.90],
      [15.0, 0.70, 3.16, 1.98, 2.57, 1.00, 1.00],
      [15.28, 0.36, 2.86, 2.30, 2.58, 1.00, 1.00],
      [15.36, 0.05, 2.62, 2.54, 2.58, 1.00, 1.00]
    ];
    var FST = [0, 0.04, 0.12, 0.22, 0.35, 0.5, 0.7, 0.9, 1.1, 1.35, 1.6, 2.3, 3.2, 6.0, 9.0, 12.4, 12.9, 13.3, 13.7,
               14.0, 14.3, 14.6, 14.8, 15.0, 15.15, 15.28, 15.36];
    var FN = 28;
    function sec(d) { return tab(FUS, d); }
    function secPt(r, t) {
      var c = Math.cos(t), s = Math.sin(t), e = s >= 0 ? r[4] : r[5];
      return [r[0] * sgp(c, e), s >= 0 ? r[3] + (r[1] - r[3]) * sgp(s, e) : r[3] + (r[3] - r[2]) * sgp(s, e)];
    }
    function hullY(d, h) {
      var r = sec(d), up = h >= r[3], e = up ? r[4] : r[5];
      var v = up ? (h - r[3]) / Math.max(0.01, r[1] - r[3]) : (r[3] - h) / Math.max(0.01, r[3] - r[2]);
      v = clamp(v, 0, 0.999);
      var sn = Math.pow(v, 1 / e), c = Math.sqrt(Math.max(0, 1 - sn * sn));
      return r[0] * Math.pow(c, e);
    }
    function hullTopH(d, y) {
      var r = sec(d), e = r[4], c = Math.min(0.999, Math.abs(y) / r[0]);
      var cc = Math.pow(c, 1 / e), sn = Math.sqrt(Math.max(0, 1 - cc * cc));
      return r[3] + (r[1] - r[3]) * Math.pow(sn, e);
    }
    function addPod() {
      var rings = [], r, i, sh = new Shell();
      for (r = 0; r < FST.length; r++) {
        var s = sec(FST[r]), ring = [];
        for (i = 0; i < FN; i++) { var p = secPt(s, i / FN * Math.PI * 2); ring.push([X(FST[r]), p[0], Z(p[1])]); }
        rings.push(ring);
      }
      sh.loft(rings, null, "skin", "skin");
      sh.emit();
    }
    /* the glazing high on the blunt nose (N1, N5): windscreen, side panes */
    function addGlass() {
      var sh = new Shell(), s, i, j;
      function side(d0, d1, h0, h1, sg) {
        var grid = [];
        for (i = 0; i <= 2; i++) {
          var d = d0 + (d1 - d0) * i / 2, row = [];
          for (j = 0; j <= 2; j++) {
            var h = h0 + (h1 - h0) * j / 2, rr = sec(d), y = hullY(d, h), dz = h - rr[3], L = Math.sqrt(y * y + dz * dz) || 1;
            row.push([X(d), sg * (y + 0.03 * y / L), Z(h + 0.03 * dz / L)]);
          }
          grid.push(row);
        }
        sh.sheet(grid, "glass", [X((d0 + d1) / 2), 0, Z(sec((d0 + d1) / 2)[3])]);
      }
      function top(d0, d1, y0, y1) {
        var grid = [];
        for (i = 0; i <= 2; i++) {
          var d = d0 + (d1 - d0) * i / 2, row = [];
          for (j = 0; j <= 2; j++) {
            var y = y0 + (y1 - y0) * j / 2, rr = sec(d), h = hullTopH(d, y), dz = h - rr[3], L = Math.sqrt(y * y + dz * dz) || 1;
            row.push([X(d), y + 0.03 * y / L, Z(h + 0.03 * dz / L)]);
          }
          grid.push(row);
        }
        sh.sheet(grid, "glass", [X((d0 + d1) / 2), 0, Z(sec((d0 + d1) / 2)[3])]);
      }
      for (s = -1; s <= 1; s += 2) {
        top(0.55, 0.95, s * 0.06, s * 0.55);
        top(0.60, 1.00, s * 0.60, s * 0.98);
        side(1.05, 1.55, 3.10, 3.55, s);
      }
      sh.emit();
    }
    /* wing: TE straight at 10.7 m, LE 6.93 m to the booms then to 8.86 m
       at the 16.25 m tip (N1) */
    var BOOM = 3.7, WTIP = 16.25, WTEAM = 15.75;
    function wLE(y) { var a = Math.abs(y); return a <= BOOM ? 6.93 : 6.93 + (a - BOOM) * (1.93 / (WTIP - BOOM)); }
    function wTE() { return 10.7; }
    function wH(y) { var a = Math.abs(y); return 4.15 + (a > BOOM ? (a - BOOM) * 0.0262 : 0); }
    function wTC(y) { return 0.17 - 0.06 * Math.min(1, Math.abs(y) / WTIP); }
    function wingRing(y, k) {
      var le = wLE(y), c = wTE(y) - le;
      if (k) { le += c * (1 - k) * 0.7; c *= k; }
      return foilRing(X(le), c, wTC(y) * (k ? 0.8 : 1), y, Z(wH(y)), "w", 0.012);
    }
    function addWing() {
      var ys = [-WTEAM, -12, -8, -BOOM, -1.5, 0, 1.5, BOOM, 8, 12, WTEAM];
      foilLoft(ys.map(function (y) { return wingRing(y); }), "skin", false, false);
      for (var s = -1; s <= 1; s += 2) foilLoft([wingRing(s * WTEAM), wingRing(s * 16.1), wingRing(s * WTIP, 0.75)], "team", false, true);
    }
    /* nacelles and booms in one loft each side: the radial cowl from the
       prop plane (4.86 m, N1), the nacelle housing the main leg, the boom
       1.0 m through to the fin's trailing edge */
    var DP = 4.86, HUB = 3.75, RP = 1.75;
    var NAC = [[0.12, 0.62, 0.62, -0.62], [0.40, 0.76, 0.76, -0.76], [1.20, 0.78, 0.80, -0.80], [2.20, 0.74, 0.76, -0.95],
               [3.40, 0.64, 0.64, -1.00], [4.60, 0.56, 0.55, -0.85], [6.00, 0.50, 0.50, -0.56], [7.00, 0.50, 0.50, -0.50],
               [12.0, 0.46, 0.46, -0.46], [16.6, 0.40, 0.40, -0.40], [17.0, 0.22, 0.24, -0.24]];
    var SPIN = [[0, 0.03], [0.15, 0.18], [0.35, 0.26], [0.50, 0.28]];
    var BLADE = { rr: [0.17, 0.32, 0.50, 0.70, 0.90, 1.0], ch: [0.20, 0.30, 0.32, 0.30, 0.26, 0.18] };
    function addBooms() {
      var zh = Z(HUB);
      for (var s = -1; s <= 1; s += 2) {
        var yc = s * BOOM;
        var rings = NAC.map(function (q) {
          var zt = zh + q[2], zb = zh + q[3];
          return ringSE(X(DP + q[0]), yc, q[1], zt, zb, (zt + zb) / 2 + 0.0001 + Math.min(0, (zt + zb) / 2 - zh), 1.0, 0.9, 16);
        });
        var sh = new Shell();
        sh.loft(rings, null, "ink", "skin");
        sh.emit();
        pod(X(DP) + 0.50 - 0.02, yc, zh, SPIN, 12, false, true, "metal");
        addProp(BLADE, 4, RP, X(DP), yc, zh, s * 20);
      }
    }
    /* fins on the booms (N1): top chord 20.15-21.6 m, root LE 19.4 m over
       the boom, the rudder 0.6 m under it; fin top 6.00 m (published); a
       short fillet on the boom; the tailplane between the booms, 19.0 to
       21.6 m (N1, N2) */
    var FINTOP = 6.0;
    function finLE(h) { return h < 4.25 ? 20.2 + (4.25 - h) * 0.25 : 19.4 + (h - 4.25) * 0.43; }
    function finTE(h) { return 21.93 - Math.max(0, h - 4.25) * 0.19; }
    function finRing(yc, h, k) {
      var le = finLE(h), c = finTE(h) - le;
      if (k) { le += c * (1 - k) * 0.5; c *= k; }
      return foilRing(X(le), c, 0.12, Z(h), yc, "f", 0);
    }
    function addTail() {
      for (var s = -1; s <= 1; s += 2) {
        var yc = s * BOOM;
        foilLoft([2.75, 3.3, 4.25, 5.0].map(function (h) { return finRing(yc, h); }).concat([finRing(yc, FINTOP - 0.35)]), "skin", true, false);
        foilLoft([finRing(yc, FINTOP - 0.35), finRing(yc, FINTOP - 0.1), finRing(yc, FINTOP, 0.75)], "team", false, true);
        var fr = [4.05, 4.3, 4.55].map(function (h) {
          var le = 18.0 + (h - 4.05) * 3.0, c = 21.0 - le;
          return foilRing(X(le), c, Math.min(0.12, 0.35 / c), Z(h), yc, "f", 0);
        });
        foilLoft(fr, "skin", true, true);
      }
      var ys = [-BOOM, -2.0, 0, 2.0, BOOM];
      foilLoft(ys.map(function (y) { return foilRing(X(19.0), 2.6, 0.11, y, Z(HUB), "w", 0); }), "skin", true, true);
    }
    /* gear: a long leg under each nacelle to a single wheel 1.2 m across
       (N1, N4), twin nose wheels at 1.79 m (N1) */
    function addGear() {
      var s, R = 0.60;
      for (s = -1; s <= 1; s += 2) {
        var x = X(8.1), y = s * BOOM;
        G.tyre.push(wheelG(R, 0.40, x, y, Z(R), 20));
        G.metal.push(wheelG(0.26, 0.44, x, y, Z(R), 10));
        G.metal.push(rod([x, y - s * 0.26, Z(R)], [x + 0.3, y - s * 0.20, Z(HUB - 0.85)], 0.09, 8));
        G.metal.push(rod([x, y - s * 0.26, Z(R + 0.2)], [x - 1.0, y - s * 0.15, Z(HUB - 0.7)], 0.05, 6));
      }
      var rn = 0.38, xn = X(1.79);
      G.metal.push(rod([xn + 0.1, 0, Z(1.15)], [xn, 0, Z(rn)], 0.07, 8));
      G.metal.push(rod([xn, -0.26, Z(rn)], [xn, 0.26, Z(rn)], 0.045, 6));
      for (s = -1; s <= 1; s += 2) {
        G.tyre.push(wheelG(rn, 0.24, xn, s * 0.24, Z(rn), 16));
        G.metal.push(wheelG(0.14, 0.26, xn, s * 0.24, Z(rn), 8));
      }
    }
    var _tex = {};
    function paintSheet(v, P) {
      var pt = new Painter(9103 + v.id.charCodeAt(0) * 7 + v.id.charCodeAt(1) * 13, P);
      var DARK = "rgba(12,14,16,0.80)", EDGE = "rgba(10,12,14,0.50)", d, k, s, y;
      pt.coats(null);
      function T_(dd, yy) { return [cu(X(dd)), rTop(yy)]; }
      function B_(dd, yy) { return [cu(X(dd)), rBot(yy)]; }
      function S_(dd, hh, st) { return [cu(X(dd)), rSide(Z(hh), st)]; }
      for (d = 2.0; d < 15.0; d += 1.0) pt.line([T_(d, -1.3), T_(d, 1.3)]);
      for (s = -1; s <= 1; s += 2) {
        for (var bnd = 0; bnd < 2; bnd++) {
          var hp = [];
          for (y = 1.6; y <= 15.6; y += 0.5) { var dd = wLE(y) + 0.74 * (wTE(y) - wLE(y)); hp.push(bnd ? B_(dd, s * y) : T_(dd, s * y)); }
          pt.line(hp, pt.LINE, 1.3);
          pt.line([bnd ? B_(10.2, s * 10.0) : T_(10.2, s * 10.0), bnd ? B_(10.7, s * 10.0) : T_(10.7, s * 10.0)], pt.LINE, 1.2);
        }
        [0.5, 1.3].forEach(function (q) { pt.line([T_(DP + q, s * (BOOM - 0.7)), T_(DP + q, s * (BOOM + 0.7))], pt.LINE, 1.0); });
      }
      /* the clamshell doors' split under the tail (N1) */
      pt.line([B_(12.6, 0), B_(15.36, 0)], "rgba(10,12,14,0.55)", 1.6);
      for (k = 0; k < 2; k++) {
        var st = k === 1;
        for (d = 2.0; d < 14.5; d += 1.0) pt.line([S_(d, 1.0, st), S_(d, 3.8, st)], "rgba(18,22,24,0.09)", 1);
        pt.line([S_(12.6, 1.0, st), S_(12.6, 3.8, st)], EDGE, 1.5);                      /* the doors' hinge line */
        [4.1, 4.75, 5.4, 6.05, 6.7, 7.35, 8.0, 8.65, 9.3].forEach(function (dd) { pt.disc(S_(dd, 2.75, st), 0.15, DARK); });
        pt.line([S_(2.6, 1.15, st), S_(3.3, 1.15, st), S_(3.3, 3.0, st), S_(2.6, 3.0, st), S_(2.6, 1.15, st)], EDGE, 1.5);
        pt.line([S_(10.0, 1.15, st), S_(10.7, 1.15, st), S_(10.7, 3.0, st), S_(10.0, 3.0, st), S_(10.0, 1.15, st)], EDGE, 1.5);
        pt.line([S_(21.2, 4.4, st), S_(21.1, FINTOP - 0.3, st)], pt.LINE, 1.2);
      }
      return pt.texture();
    }
    function sheet(v, P) {
      if (_tex[v.id] !== undefined) return _tex[v.id];
      try { _tex[v.id] = paintSheet(v, P); } catch (e) { _tex[v.id] = false; }
      return _tex[v.id];
    }
    function build(THREE, M, C, which) {
      begin(THREE);
      var v = VARIANTS[which] || VARIANTS.F50, P = PAINT[v.paint];
      addPod();
      addGlass();
      addWing();
      addBooms();
      addTail();
      addGear();
      return finish(C, P, sheet(v, P));
    }
    return { build: build, variants: VARIANTS, lenOf: function () { return 21.93; } };   /* measured X extent: nose to the rudder trailing edge */
  })();
})();

/* len: the measured X extent of each guise (nose to tail, probe included) */
[["fra_e60_airlift", "F60"], ["fra_e80_airlift", "N80"], ["fra_e90_airlift", "N90"], ["deu_e60_airlift", "D60"],
 ["fra_e80_ewair", "G80"], ["fra_e90_ewair", "G90"], ["fra_e00_ewair", "G00"]].forEach(function (r) {
  UNIT_MODELS[r[0]] = {
    len: HeroTransall.lenOf(r[1]),
    build: function (THREE, M, C) { return HeroTransall.build(THREE, M, C, r[1]); }
  };
});
[["fra_e50_airlift", "F50"], ["deu_e50_airlift", "D50"], ["fra_e60_ewair", "G60"]].forEach(function (r) {
  UNIT_MODELS[r[0]] = {
    len: HeroNoratlas.lenOf(r[1]),
    build: function (THREE, M, C) { return HeroNoratlas.build(THREE, M, C, r[1]); }
  };
});
