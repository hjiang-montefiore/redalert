/* ==================== js/hero/ru_kuznetsov.js ===========================
   HERO MODEL -- Project 1143.5 heavy aviation cruiser "Admiral Flota Sovetskogo
   Soyuza Kuznetsov" (ex-Tbilisi), drawn per period from photographs.
   Keys: pact_e90_carrier (the 1990s ship), pact_e00_carrier (the 2000s-2010s
   ship) and carrier_p (today's row: see VARIANTS); pla_e00_carrier is still
   registered here as a stand-in, and js/hero/pla_carriers_redo.js (loaded
   later) overrides it with its own Liaoning.

   REWORK (2026-11): the hull is lofted again with its knuckle and the flare
   above it, the island rebuilt tier by tier off a broadside, and the hull,
   sponsons and island fitted out (galleries, nets, rails, rafts, anchors,
   scuttles, openings, ladders, aerials).  The flight deck is LOWERED from
   19.0 to 16.5 m: P1 measured again (below) - the old figure was read off
   the far side of the deck.

   PUBLISHED FIGURES (English and Russian Wikipedia, "Admiral Kuznetsov"):
   length overall 305 m (drawn 305.0), waterline length about 270 m (drawn
   263: stem 121.9, stern -141 at z = 0, P1), waterline beam 35 m (drawn
   35.0), flight deck beam 72 m (drawn 73.6 at the angled sponson), draught
   10.5 m (drawn), keel to masthead about 65.9 m (drawn 68.9, see the
   island), ski-jump 12 degrees at the lip (drawn), 12 P-700 Granit cells
   under the forward flight deck, 8 Kashtan (CADS-N-1) modules, 6 AK-630M,
   two starboard deck-edge lifts.

   REFERENCES (Wikimedia Commons; the q_rwcv_ref folder holds P1, P7, P5):
     D1 "World Navy Aircraft carries in scale.png" - a plan view to a common
        scale (306 m); the deck planform is traced off it row by row (0.91 m a
        pixel): the wide blunt ski-jump end (about 25 m across), the parallel
        forward deck, the angled sponson to 38.6 m port, the island ON THE
        STARBOARD SPONSON (y -21.3 to -35, x 0 to -65), the forward lift at x
        +9..+28 and the after lift at x -73..-89 (starboard deck edge), the
        four corner weapons sponsons below deck level, the angled strip's foul
        lines at 7.5 degrees and its landing spots, the two take-off runs.
     D2 "Aircraft carrier comparison enh.jpg" - outline plan, 304.5 x 72 m.
     P1 "HMS Liverpool Escorts Russian Carrier Admiral Kuznetsov MOD 45153590
        (cropped)" (UK MoD, Jan 2017, port broadside, 1600 px wide: ramp lip
        px 130 to the stern px 1445 = 305 m, 4.31 px/m, waterline row 498):
        MEASURED - flight deck 16.2 m at the ramp's foot and 16.7 at the stern
        (drawn 16.5); the ramp starts about 62 m aft of the lip (drawn x 90)
        and its lip stands 24.4 m over the water at the rim (drawn 23.1 to the
        deck, 24.1 to the rim's top); the stem at the waterline 30.6 m aft of
        the lip (x 121.9) and its concave rake (12.0 m up at x 137, 20 m up
        at x 150); the stern: the hull leaves the water at x -141 and rounds
        up to a transom at -147 at 4 m, the deck overhanging to -152.5; the
        knuckle line along the side at 9.3 m (dark below, the paler flare and
        sponson walls above).  THE ISLAND, heights from the far-side deck
        edge (row 418): the base and its galleries to 23.5 m, the forward
        (bridge) block to 33.0, the main block to 37.0, the tower to 44.0,
        the drum 43.6 to 51.3 (8.6 m across), the Top Plate frame to 58.4;
        the after end stepping down at 30 and 23.5; two poles aft.  The
        photograph is taken from abaft the beam: the far-side island reads
        13 m forward of where D1 and P7 put it, so its x are taken from D1/P7
        and only its heights from here.
     P7 "A port beam view of the Soviet aircraft carrier FLEET ADMIRAL ...
        KUZNETSOV underway south of Italy" (USN, 1991, port beam from above):
        the island's port face - the long low base with red-decked galleries
        at both ends, the main block, the white square Mars-Passat array on
        the tower's port face, the two big white domes flanking the drum's
        foot, the drum and the Top Plate, the oval funnel with its dark,
        sloped top abaft the drum, a dome and a tall pole at the after end;
        the catwalks and nets along the port deck edge; the pole mast on the
        starboard edge forward of the island; the yellow-white deck markings.
     P2 "Aircraft carrier "Admiral Kuznetsov" in 1991" (USN, starboard side
        from the air): the 1991 blue-grey (hull sampled 0x536069), dark
        boot-top, the dark openings in the starboard side at x -88, -14, -130.
     P3 "Kuznetsov 960111-N-9085M-001" and "-002" (USN, January 1996): the
        island's forward face (a big flat Mars-Passat face, dishes either
        side, wide gallery), the yellow dash bars of the two take-off runs,
        the dark slate deck, the deck-edge catwalks.
     P4 "Admiral Kuznetsov aircraft carrier.jpg" (mil.ru, 2010s, port bow):
        the bow's concave flare up to the rounded lip, the red boot-top band,
        the angled sponson's rounded front, the 2010s deck (0x584f3c-0x747568).
     P5 "Admiral Kuznecov 20090820numbered" (2009, starboard bow): the island
        stack (drum, Top Plate, white domes, the flat array faces, the yards
        with ESM spikes, a pole mast).
     P6 "Admiral Kuznetsov in drydock 2021": the refit (deck in primer).

   RECOGNITION LIST (what makes her at game zoom; where it is drawn):
     1. the ski-jump, 12 degrees at a broad rounded lip (D1, P1, P4) - deckZ;
     2. the angled deck to port, 7.5 degrees, its long sponson (D1) - EP,
        the painted foul lines;
     3. the island far outboard on the starboard sponson (D1, P7);
     4. the island's tiers: low base with end galleries, the bridge block, the
        main block, the tower with four flat Mars-Passat faces (P1, P3, P7);
     5. the drum on the tower, the Top Plate above it, the two big white domes
        at its foot (P1, P5, P7);
     6. the oval funnel abaft the drum with its sloped black top (P1, P7);
     7. the concave bow flare from a raked stem up to the ramp (P1, P4);
     8. the knuckle along the side with the flare and sponson walls above it
        (P1) - sideY;
     9. the Granit hatch field forward (published; painted, layout below);
    10. the corner weapons sponsons below deck level with the Kashtan pairs
        and the AK-630s, the port gallery's AK-630s (D1, P4);
    11. the galleries and nets along the deck edges (P3, P7);
    12. two starboard deck-edge lifts (painted) over dark openings;
    13. period paint (P2 / P4, P1).

   VARIANTS (drawn only where photographs show a difference):
     - pact_e90_carrier: 1991-96 - blue-grey hull, dark boot-top, white deck
       markings with the yellow take-off bars (P2, P3, P7).
     - pact_e00_carrier: 2000s-2017 - neutral grey hull, red boot-top, darker
       olive-grey deck with yellow edge and foul lines (P4, P1).
     - carrier_p: today's row, drawn as last photographed in service
       (2016-17), identical to e00: no photograph of the refitted ship.

   WHAT I COULD NOT CONFIRM, and so drew plainly or not at all:
     - everything under water (keel, bilge, forefoot); no sonar bulb drawn;
     - the Granit hatches: 12 flush covers in four rows of three on the
       centre of the forward deck between the runs (published: under the
       forward flight deck; no fetched photograph shows them);
     - the Kinzhal VLS hatches and the RBU-12000s (not drawn);
     - the Kashtan and AK-630 places on the corner sponsons;
     - the lift sizes (19 x 14 m from D1's outlines);
     - the island's plan widths (D1's footprint) and which face carries which
       array; the smaller radars, aerials and dishes;
     - the height: keel to the Top Plate's frame comes out 68.9 m against the
       published 65.9 m; P1's far side, seen from a little above, reads high
       by a few metres (not fitted);
     - galleries, rafts, scuttle rows, anchors: places estimated.
   No hull number, name, ensign, star or guards ribbon.

   NO TRAINED MOUNT: no carrier row has turret:true - nothing is named
   "turret"; every weapon is baked at rest, pointing forward.
   FLIGHT DECK: one flat top at z = 16.5 from the stern to x = +90, then the
   ski-jump (parabolic, 12 degrees at the lip, 6.6 m rise). Nothing stands on
   it: markings, lifts and hatches are painted into its texture.  Catwalks,
   rails, nets and the sponsons' mounts are below its level, outboard of its
   edge; the island stands on the starboard sponson.
   PAINT: sRGB canvases (prepModel converts), sampled values taken to ~0.85.
   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  Every part
   is emitted into one sink per material: one mesh each.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKuznetsov = (function () {
  "use strict";
  var PI = Math.PI, TW = 2 * PI;
  var XS = -152.5, XB = 152.5;      /* the deck's after end and the ramp's lip   */
  var FD = 16.5;                    /* flight deck top, aft of the ramp (P1)      */
  var FAS = 1.0;                    /* the deck's edge fascia                     */
  var XR0 = 90.0;                   /* the ramp starts here (P1)                  */
  var KR = Math.tan(12 * PI / 180) / (XB - XR0);   /* 12 degrees at the lip      */
  var KN = 9.3;                     /* the knuckle (P1)                           */
  var XD0 = -156.0, XD1 = 156.0, YD0 = -40.0, YD1 = 42.0; /* deck texture box   */
  var HZ0 = -1.0, HZ1 = 24.0;       /* the hull canvas's z range                  */

  /* PERIOD PAINT (sRGB, sampled and taken to ~0.85; see the header) */
  var PAINT = {
    e90: { hull: "#59656e", sup: "#64707a", deck: "#585a5e", boot: "#2a2f33", under: "#6a3a40", gal: "#7a4a3c",
           line: "#dddbd3", edge: "#d6d4cc", foul: "#d6d4cc", bar: "#c8a43c", seed: 1991 },
    e00: { hull: "#6a6e72", sup: "#74787c", deck: "#56554f", boot: "#7c2d29", under: "#6a3a40", gal: "#6e4a3e",
           line: "#e0ded6", edge: "#c9a23a", foul: "#c9a23a", bar: "#cfa83c", seed: 2009 }
  };

  /* ------------------------------------------------ station tables (D1, P1) */
  /* waterline half-beam by normalised station (35 m beam) */
  var HW = [[-152.5, 6.0], [-145, 12.5], [-130, 16.4], [-110, 17.5], [20, 17.5], [60, 16.6],
            [90, 14.0], [115, 9.5], [135, 4.0], [150, 0.8], [152.5, 0.0]];
  /* the knuckle's outset over the waterline breadth; it fades out forward,
     where the bow flares smoothly up to the deck (P1, P4) */
  var KO = [[-152.5, 3.5], [-130, 1.6], [-100, 1.3], [40, 1.3], [70, 1.1], [95, 0.0], [152.5, 0.0]];
  var KW = [[-152.5, 1], [60, 1], [92, 0], [152.5, 0]];
  /* the hull's top half-width under the flight deck (forward it is the deck
     edge itself - the bow flares right up to the deck) */
  var HDT = [[-152.5, 14.0], [-149, 16.0], [-144, 17.4], [-112, 18.6], [-90, 20.0], [-60, 22.5],
             [40, 22.5], [58, 19.5], [70, 17.2], [88, 16.7], [105, 14.9], [130, 13.3], [146, 12.8],
             [150.5, 11.9], [152.5, 9.4]];
  var KZ = [[-152.5, 3.6], [-147, 1.0], [-141, -2.0], [-130, -6.5], [-110, -9.5], [-80, -10.5], [60, -10.5],
            [100, -8.5], [118, -6.0], [152.5, -3.0]];
  var BP = [[-152.5, 1.6], [-110, 2.6], [-60, 3.2], [60, 3.2], [100, 2.0], [152.5, 1.2]];
  /* flare exponent: > 1 is the concave flare that opens out near the deck (P4) */
  var FL = [[-152.5, 1.4], [-60, 1.6], [0, 1.6], [60, 1.8], [100, 2.1], [152.5, 2.3]];
  /* flight deck edges, port and starboard magnitudes, traced off D1 */
  var EP = [[-152.5, 12.5], [-151, 15.5], [-147.5, 18.0], [-144, 17.2], [-112, 17.7], [-108, 24.0],
            [-104, 33.5], [-100, 35.0], [-72, 35.0], [-69.5, 31.5], [-24, 31.5], [-21, 35.0],
            [14, 35.0], [20, 36.5], [34, 37.0], [38, 38.6], [47, 38.6], [52, 35.5], [56, 30.0],
            [59, 23.0], [61, 17.6], [70, 17.3], [88, 16.8], [105, 15.0], [130, 13.4], [146, 12.9],
            [150.5, 12.0], [152.5, 9.5]];
  var ES = [[-152.5, 12.5], [-151, 15.5], [-147.5, 21.5], [-144, 24.5], [-118, 24.5], [-113, 30.5],
            [-104, 33.5], [-72, 34.0], [-62, 35.0], [5, 35.0], [9, 33.2], [38, 33.0], [42, 30.4],
            [50, 24.0], [58, 22.5], [62, 19.4], [80, 18.4], [88, 17.0], [105, 15.9], [130, 14.1],
            [146, 13.5], [150.5, 12.3], [152.5, 9.5]];
  var LIFTS = [[9.0, 28.0], [-89.0, -73.0]];
  function tab(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) if (x <= T[i][0]) {
      var a = T[i - 1], b = T[i], f = (x - a[0]) / (b[0] - a[0]);
      return a[1] + (b[1] - a[1]) * f;
    }
    return T[T.length - 1][1];
  }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function deckZ(x) {
    if (x <= XR0) return FD;
    var d = Math.min(x, XB) - XR0; return FD + 0.5 * KR * d * d;
  }
  var ZLIP = deckZ(XB) - FAS;       /* the hull's top at the lip                  */
  /* stem: the concave rake P1 shows, 30.6 m from the waterline to the lip */
  function xStemAt(z) {
    if (z >= 0) return 121.9 + 30.6 * Math.pow(Math.min(1, z / ZLIP), 0.9);
    return 121.9 - 9.0 * Math.pow(Math.min(1, -z / 10.5), 1.5);
  }
  /* stern: the hull leaves the water at -141, rounds up to the transom at
     -147 by 4 m, the transom rakes aft to the deck's end (P1) */
  function xSternAt(z) {
    if (z >= 4) return -147.0 - 5.5 * Math.min(1, (z - 4) / (FD - FAS - 4));
    if (z >= 0) return -141.0 - 6.0 * Math.pow(z / 4, 0.7);
    return -141.0 + 11.0 * Math.pow(Math.min(1, -z / 10.5), 1.5);
  }
  function xAt(xn, z) {
    var u = (xn - XS) / (XB - XS);
    return lerp(xSternAt(z), xStemAt(z), u);
  }
  function zTop(xn) { return deckZ(xn) - FAS; }
  /* the half-breadth of the shell at normalised station xn, height z */
  function sideY(xn, z) {
    var hw = tab(HW, xn), k = tab(KZ, xn);
    if (z <= 0) {
      var t = Math.max(0, Math.min(1, (z - k) / (0 - k))), p = tab(BP, xn);
      return hw * Math.pow(1 - Math.pow(1 - t, p), 1 / p);
    }
    var hd = Math.max(hw, tab(HDT, xn)), zr = zTop(xn), u = Math.min(1, z / zr);
    var smooth = hw + (hd - hw) * Math.pow(u, tab(FL, xn));
    var hk = Math.min(hd, hw + tab(KO, xn)), kn;
    if (z <= KN) kn = hw + (hk - hw) * (z / KN);
    else kn = hk + (hd - hk) * Math.pow(Math.min(1, (z - KN) / (zr - KN)), 1.15);
    return lerp(smooth, kn, tab(KW, xn));
  }
  /* the shell at the real x (the stations are normalised) */
  function shellY(x, z) {
    var xn = x, i;
    for (i = 0; i < 4; i++) xn += (x - xAt(xn, z));
    return sideY(Math.max(XS, Math.min(XB, xn)), z);
  }
  function edgeP(x) { return tab(EP, x); }
  function edgeS(x) { return tab(ES, x); }
  function edge(x, sg) { return sg > 0 ? edgeP(x) : edgeS(x); }
  /* the angled strip: its centreline (D1, 7.5 degrees) */
  function axisA(x) { return 6.8 + 0.132 * (x + 61.8); }

  /* --------------------------------------------------------------- vectors */
  function sb(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cr(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dt(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function nz(v) { var l = Math.sqrt(dt(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function ad(a, b, k) { return [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k]; }

  /* ------------------------------------------------------------- the sinks
     Every part goes into the sink of its material as triangles; one sink is
     one mesh.  UV modes: "box" (planar on the face's main axis, k a metre),
     "hull" (u along her, a tile every 48 m; v the absolute height HZ0..HZ1,
     so the boot-top is painted at the waterline), "deck" (the deck canvas). */
  function Sink(mode, k) { this.p = []; this.u = []; this.mode = mode; this.k = k || 0.2; }
  Sink.prototype.tri = function (a, b, c) {
    var n = cr(sb(b, a), sb(c, a));
    if (dt(n, n) < 1e-10) return;
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    var ax = Math.abs(n[0]), ay = Math.abs(n[1]), az = Math.abs(n[2]), V = [a, b, c], i, q, s = this.k;
    for (i = 0; i < 3; i++) {
      q = V[i];
      if (this.mode === "deck") this.u.push((q[0] - XD0) / (XD1 - XD0), (q[1] - YD0) / (YD1 - YD0));
      else if (this.mode === "hull") this.u.push((ax > ay && ax > az ? q[1] : q[0]) / 48, Math.max(0.002, Math.min(0.998, (q[2] - HZ0) / (HZ1 - HZ0))));
      else if (az >= ax && az >= ay) this.u.push(q[0] * s, q[1] * s);
      else if (ay >= ax) this.u.push(q[0] * s, q[2] * s);
      else this.u.push(q[1] * s, q[2] * s);
    }
  };
  Sink.prototype.mesh = function (THREE, m) {
    if (!this.p.length) return null;
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(this.u, 2));
    g.computeVertexNormals();
    var me = new THREE.Mesh(g, m); me.castShadow = true; me.receiveShadow = true;
    return me;
  };
  /* a sink seen through a yaw and an offset (mounts are built at the origin) */
  function Xf(s, x, y, z, yaw) {
    var c = Math.cos(yaw || 0), n = Math.sin(yaw || 0);
    function T(p) { return [x + p[0] * c - p[1] * n, y + p[0] * n + p[1] * c, z + p[2]]; }
    return { tri: function (a, b, d) { s.tri(T(a), T(b), T(d)); } };
  }

  /* ------------------------------------------------------------ primitives */
  /* a triangle turned so its normal points away from ref */
  function tri(s, a, b, c, ref) {
    if (ref) {
      var n = cr(sb(b, a), sb(c, a)), m = sb([(a[0] + b[0] + c[0]) / 3, (a[1] + b[1] + c[1]) / 3, (a[2] + b[2] + c[2]) / 3], ref);
      if (dt(n, m) < 0) { s.tri(a, c, b); return; }
    }
    s.tri(a, b, c);
  }
  function quad(s, a, b, c, d, ref) { tri(s, a, b, c, ref); tri(s, a, c, d, ref); }
  /* turned so the normal has a positive part along o */
  function triO(s, a, b, c, o) { if (dt(cr(sb(b, a), sb(c, a)), o) < 0) s.tri(a, c, b); else s.tri(a, b, c); }
  function quadO(s, a, b, c, d, o) { triO(s, a, b, c, o); triO(s, a, c, d, o); }
  /* both faces (nets, thin plates, frames) */
  function quad2(s, a, b, c, d) { s.tri(a, b, c); s.tri(a, c, d); s.tri(a, c, b); s.tri(a, d, c); }
  function tube(s, A, B, ra, rb, n, caps) {
    var d = sb(B, A); if (dt(d, d) < 1e-10) return;
    var ax = nz(d), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = nz(cr(ax, t)), v = cr(ax, u), RA = [], RB = [], i, j;
    for (i = 0; i < n; i++) {
      var c = Math.cos(i / n * TW + 0.4), sn = Math.sin(i / n * TW + 0.4);
      var r = [u[0] * c + v[0] * sn, u[1] * c + v[1] * sn, u[2] * c + v[2] * sn];
      RA.push(ad(A, r, ra)); RB.push(ad(B, r, rb));
    }
    var mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2, (A[2] + B[2]) / 2];
    for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      tri(s, RA[i], RA[j], RB[j], mid);
      tri(s, RA[i], RB[j], RB[i], mid);
      if (caps) { tri(s, B, RB[i], RB[j], mid); tri(s, A, RA[j], RA[i], mid); }
    }
  }
  /* an oriented box: centre c, frame ex (along) ey (across) ez (up) */
  function obox(s, c, ex, ey, ez, lx, ly, lz) {
    var V = [], i, F = [[0, 1, 3, 2], [4, 6, 7, 5], [0, 4, 5, 1], [2, 3, 7, 6], [0, 2, 6, 4], [1, 5, 7, 3]];
    for (i = 0; i < 8; i++) {
      var a = (i & 1 ? 0.5 : -0.5) * lx, b = (i & 2 ? 0.5 : -0.5) * ly, e = (i & 4 ? 0.5 : -0.5) * lz;
      V.push([c[0] + ex[0] * a + ey[0] * b + ez[0] * e, c[1] + ex[1] * a + ey[1] * b + ez[1] * e, c[2] + ex[2] * a + ey[2] * b + ez[2] * e]);
    }
    F.forEach(function (f) { quad(s, V[f[0]], V[f[1]], V[f[2]], V[f[3]], c); });
  }
  function boxZ(s, x, y, z0, lx, ly, lz, yaw) {
    var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
    obox(s, [x, y, z0 + lz / 2], [c, sn, 0], [-sn, c, 0], [0, 0, 1], lx, ly, lz);
  }
  function blk(s, x0, x1, y0, y1, z0, z1) {
    boxZ(s, (x0 + x1) / 2, (y0 + y1) / 2, Math.min(z0, z1), Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0), 0);
  }
  function cylZ(s, x, y, z0, h, r, n, r2) { tube(s, [x, y, z0], [x, y, z0 + h], r, r2 === undefined ? r : r2, n, true); }
  function sphere(s, c, r, nw, nh, half) {
    var i, j, P = [], h0 = half ? 0 : -PI / 2;
    for (j = 0; j <= nh; j++) {
      var ph = h0 + (PI / 2 - h0) * j / nh, row = [];
      for (i = 0; i < nw; i++) {
        var th = i / nw * TW;
        row.push([c[0] + r * Math.cos(ph) * Math.cos(th), c[1] + r * Math.cos(ph) * Math.sin(th), c[2] + r * Math.sin(ph)]);
      }
      P.push(row);
    }
    for (j = 0; j < nh; j++) for (i = 0; i < nw; i++) {
      var k = (i + 1) % nw;
      if (j === nh - 1) tri(s, P[j][i], P[j][k], P[j + 1][i], c);
      else quad(s, P[j][i], P[j][k], P[j + 1][k], P[j + 1][i], c);
    }
  }
  function disc(s, c, nrm, r, n) {
    var a = nz(nrm), t = Math.abs(a[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], u = nz(cr(a, t)), v = cr(a, u), P = [], i;
    for (i = 0; i < n; i++) P.push(ad(ad(c, u, Math.cos(i / n * TW) * r), v, Math.sin(i / n * TW) * r));
    for (i = 1; i < n - 1; i++) tri(s, P[0], P[i], P[i + 1], ad(c, a, -1));
  }
  /* a faceted solid between two convex plans of equal count */
  function frustum(s, lo, z0, hi, z1, noBottom) {
    var n = lo.length, i, cx = 0, cy = 0;
    lo.forEach(function (q) { cx += q[0] / n; cy += q[1] / n; });
    var ref = [cx, cy, (z0 + z1) / 2];
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n;
      quad(s, [lo[i][0], lo[i][1], z0], [lo[j][0], lo[j][1], z0], [hi[j][0], hi[j][1], z1], [hi[i][0], hi[i][1], z1], ref);
    }
    for (i = 1; i < n - 1; i++) {
      tri(s, [hi[0][0], hi[0][1], z1], [hi[i][0], hi[i][1], z1], [hi[i + 1][0], hi[i + 1][1], z1], ref);
      if (!noBottom) tri(s, [lo[0][0], lo[0][1], z0], [lo[i][0], lo[i][1], z0], [lo[i + 1][0], lo[i + 1][1], z0], ref);
    }
  }
  function prism(s, poly, z0, z1, noBottom) { frustum(s, poly, z0, poly, z1, noBottom); }
  /* an octagon plan x0..x1 by y0..y1 (y0 < y1), corners cut f forward, a aft.
     Faces k: 0 low-y side, 1 fwd low-y corner, 2 front, 3 fwd high-y corner,
     4 high-y side, 5 aft high-y corner, 6 back, 7 aft low-y corner */
  function oct(x0, x1, y0, y1, f, a) {
    return [[x0 + a, y0], [x1 - f, y0], [x1, y0 + f], [x1, y1 - f], [x1 - f, y1], [x0 + a, y1], [x0, y1 - a], [x0, y0 + a]];
  }
  function inset(poly, d) {
    var n = poly.length, cx = 0, cy = 0;
    poly.forEach(function (q) { cx += q[0] / n; cy += q[1] / n; });
    return poly.map(function (q) {
      var dx = q[0] - cx, dy = q[1] - cy, L = Math.hypot(dx, dy) || 1;
      return [q[0] - dx / L * d, q[1] - dy / L * d];
    });
  }
  /* a panel on face k of a frustum (lo at z0, hi at z1): the fraction s0..s1
     along the face, height za..zb, stood off by off */
  function panel(s, lo, z0, hi, z1, k, s0, s1, za, zb, off) {
    var n = lo.length, k1 = (k + 1) % n;
    function at(f, z) {
      var t = (z - z0) / (z1 - z0);
      var ax = lerp(lo[k][0], hi[k][0], t), ay = lerp(lo[k][1], hi[k][1], t);
      var bx = lerp(lo[k1][0], hi[k1][0], t), by = lerp(lo[k1][1], hi[k1][1], t);
      return [lerp(ax, bx, f), lerp(ay, by, f), z];
    }
    var ex = lo[k1][0] - lo[k][0], ey = lo[k1][1] - lo[k][1], L = Math.hypot(ex, ey) || 1;
    var cx = 0, cy = 0;
    lo.forEach(function (q) { cx += q[0] / n; cy += q[1] / n; });
    var o = [ey / L, -ex / L, 0];
    var mx = (lo[k][0] + lo[k1][0]) / 2 - cx, my = (lo[k][1] + lo[k1][1]) / 2 - cy;
    if (o[0] * mx + o[1] * my < 0) o = [-o[0], -o[1], 0];
    var A = at(s0, za), B = at(s1, za), C = at(s1, zb), D = at(s0, zb);
    [A, B, C, D].forEach(function (P) { P[0] += o[0] * off; P[1] += o[1] * off; });
    quadO(s, A, B, C, D, o);
    return o;
  }
  /* a guard rail along a polyline: posts every step, the top rail at h, a
     lifeline at h/2.  The metal material is double-sided, so a post and a
     wire are each one thin strip (two triangles) */
  function strip(s, A, B, w, up) {
    var d = sb(B, A), u = up ? [0, 0, w / 2] : nz(cr(d, [0, 0, 1]));
    if (!up) u = [u[0] * w / 2, u[1] * w / 2, 0];
    s.tri(ad(A, u, -1), ad(B, u, -1), ad(B, u, 1)); s.tri(ad(A, u, -1), ad(B, u, 1), ad(A, u, 1));
  }
  function rail(s, pts, h, step, r) {
    var i, k, carry = 0; r = r || 0.035; h = h || 1.0; step = step || 2.4;
    function post(p) { strip(s, p, [p[0], p[1], p[2] + h], 2.2 * r, false); }
    for (i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], d = sb(b, a), L = Math.sqrt(dt(d, d));
      if (L < 1e-3) continue;
      strip(s, [a[0], a[1], a[2] + h], [b[0], b[1], b[2] + h], 1.6 * r, true);
      strip(s, [a[0], a[1], a[2] + h * 0.5], [b[0], b[1], b[2] + h * 0.5], 1.2 * r, true);
      for (k = carry; k < L; k += step) post(ad(a, d, k / L));
      carry = k - L;
    }
    post(pts[pts.length - 1]);
  }
  function railPoly(s, poly, z, h, skipFace) {
    var pts = [], i;
    for (i = 0; i <= poly.length; i++) {
      if (skipFace !== undefined && i === skipFace + 1) { rail(s, pts, h); pts = []; }
      var q = poly[i % poly.length]; pts.push([q[0], q[1], z]);
    }
    if (pts.length > 1) rail(s, pts, h);
  }
  function ladder(s, A, B, side, w) {
    w = (w || 0.6) / 2;
    var e = [side[0] * w, side[1] * w, 0], d = sb(B, A), L = Math.sqrt(dt(d, d)), n = Math.max(1, Math.floor(L / 0.6)), i;
    strip(s, ad(A, e, 1), ad(B, e, 1), 0.07, false);
    strip(s, ad(A, e, -1), ad(B, e, -1), 0.07, false);
    for (i = 1; i <= n; i++) { var p = ad(A, d, i / (n + 0.5)); strip(s, ad(p, e, 1), ad(p, e, -1), 0.05, true); }
  }
  /* a life-raft canister (sW) on its cradle (sM), axis along yaw */
  function raft(sW, sM, x, y, z, yaw, L, r) {
    L = L || 1.4; r = r || 0.34;
    var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0), zc = z + r + 0.08;
    tube(sW, [x - c * L / 2, y - sn * L / 2, zc], [x + c * L / 2, y + sn * L / 2, zc], r, r, 7, true);
    [-0.3, 0.3].forEach(function (f) { boxZ(sM, x + c * L * f, y + sn * L * f, z, 0.1, r * 1.8, 0.2, yaw); });
  }
  /* a stockless anchor in its hawse; out = the shell's outward normal */
  function anchor(sM, sD, x, y, z, out, k) {
    var o = nz(out), ez = [0, 0, 1], ex = nz(cr(ez, o)), p = ad([x, y, z], o, 0.2 * k);
    disc(sD, ad([x, y, z], o, 0.02), o, 0.8 * k, 10);
    tube(sM, [x, y, z], ad([x, y, z], o, 0.25 * k), 0.66 * k, 0.74 * k, 10, false);
    obox(sM, ad(p, ez, -0.9 * k), ex, o, ez, 0.3 * k, 0.24 * k, 1.6 * k);
    obox(sM, ad(p, ez, -1.75 * k), ex, o, ez, 1.4 * k, 0.3 * k, 0.3 * k);
    [-1, 1].forEach(function (e) {
      tube(sM, ad(ad(p, ez, -1.75 * k), ex, e * 0.66 * k), ad(ad(p, ez, -1.0 * k), ex, e * 0.45 * k), 0.15 * k, 0.06 * k, 4, true);
    });
  }
  /* an aerial mast hinged at its foot, lowered outboard for flying */
  function whip(s, A, dir, L, r) {
    r = r || 0.07;
    cylZ(s, A[0], A[1], A[2] - 0.25, 0.5, r * 3, 6);
    tube(s, A, ad(A, nz(dir), L), r, r * 0.35, 4, false);
  }

  /* --------------------------------------------------------------- canvases */
  var TEX = {};
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function canvasTex(THREE, key, W, H, draw, clampV) {
    if (TEX[key]) return TEX[key];
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    draw(cv.getContext("2d"), W, H);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = clampV ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    return (TEX[key] = t);
  }
  /* weathering: rust runs, grime streaks, salt and touch-up patches */
  function weather(g, w, h, seed, n, a) {
    var R = rng(seed), i;
    for (i = 0; i < n; i++) {
      var x = R() * w, y = R() * h, l = h * (0.04 + R() * 0.2), gr = g.createLinearGradient(0, y, 0, y + l);
      gr.addColorStop(0, "rgba(96,58,34," + (0.26 * a).toFixed(3) + ")"); gr.addColorStop(1, "rgba(96,58,34,0)");
      g.fillStyle = gr; g.fillRect(x, y, 1 + R() * 2, l);
    }
    for (i = 0; i < n * 0.6; i++) {
      var x2 = R() * w, y2 = R() * h, l2 = h * (0.03 + R() * 0.12), g2 = g.createLinearGradient(0, y2, 0, y2 + l2);
      g2.addColorStop(0, "rgba(22,24,26," + (0.2 * a).toFixed(3) + ")"); g2.addColorStop(1, "rgba(22,24,26,0)");
      g.fillStyle = g2; g.fillRect(x2, y2, 1 + R() * 3, l2);
    }
    for (i = 0; i < n * 0.5; i++) {
      g.globalAlpha = (0.03 + R() * 0.04) * a; g.fillStyle = R() < 0.5 ? "#ffffff" : "#1a1c1e";
      g.fillRect(R() * w, R() * h, w * (0.03 + R() * 0.08), h * (0.01 + R() * 0.05));
    }
    g.globalAlpha = 1;
  }
  /* the topsides: v is the absolute height HZ0..HZ1 - the boot-top at the
     waterline, strakes every 2.5 m, butts every 8 m, the knuckle's seam,
     grime at the waterline, rust runs from the scuttles and openings */
  function hullTex(THREE, P) {
    return canvasTex(THREE, "kzHull" + P.seed, 512, 512, function (g, w, h) {
      var R = rng(P.seed), i, z;
      function Y(zz) { return (1 - (zz - HZ0) / (HZ1 - HZ0)) * h; }
      g.fillStyle = P.hull; g.fillRect(0, 0, w, h);
      g.fillStyle = P.boot; g.fillRect(0, Y(0.7), w, h - Y(0.7));
      g.globalAlpha = 0.11; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (z = 0.7; z < HZ1; z += 2.5) { g.beginPath(); g.moveTo(0, Y(z)); g.lineTo(w, Y(z)); g.stroke(); }
      for (i = 0; i < 6; i++) for (var r = 0; r < 10; r++) {
        var xx = (i / 6 + (r % 2) * 0.08) * w, z1 = 0.7 + r * 2.5;
        g.beginPath(); g.moveTo(xx, Y(z1)); g.lineTo(xx, Y(z1 + 2.5)); g.stroke();
      }
      g.globalAlpha = 0.25; g.lineWidth = 2; g.beginPath(); g.moveTo(0, Y(KN)); g.lineTo(w, Y(KN)); g.stroke();
      g.globalAlpha = 1;
      var gr = g.createLinearGradient(0, Y(2.4), 0, Y(0.7));
      gr.addColorStop(0, "rgba(40,44,40,0)"); gr.addColorStop(1, "rgba(40,44,40,0.35)");
      g.fillStyle = gr; g.fillRect(0, Y(2.4), w, Y(0.7) - Y(2.4));
      for (i = 0; i < 80; i++) {
        var x = R() * w, y0 = Y(3 + R() * 18), l = 10 + R() * 60, g3 = g.createLinearGradient(0, y0, 0, y0 + l);
        g3.addColorStop(0, "rgba(98,60,36,0.30)"); g3.addColorStop(1, "rgba(98,60,36,0)");
        g.fillStyle = g3; g.fillRect(x, y0, 1 + R() * 1.6, l);
      }
      weather(g, w, Y(0.7), P.seed + 1, 34, 0.6);
    }, true);
  }
  function underTex(THREE, P) {
    return canvasTex(THREE, "kzUnder" + P.under, 256, 128, function (g, w, h) {
      var R = rng(77), i;
      g.fillStyle = P.under; g.fillRect(0, 0, w, h);
      for (i = 0; i < 60; i++) {
        g.globalAlpha = 0.05 + R() * 0.07; g.fillStyle = R() < 0.6 ? "#000000" : "#c08070";
        g.fillRect(R() * w, R() * h, 4 + R() * 30, 1 + R() * 3);
      }
      g.globalAlpha = 1;
    });
  }
  /* plain plate (white, tinted by the material): seams and weathering */
  function plateTex(THREE) {
    return canvasTex(THREE, "kzPlate", 256, 256, function (g, w, h) {
      var i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.11; g.strokeStyle = "#000000"; g.lineWidth = 1.4;
      for (i = 1; i < 4; i++) {
        g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke();
        g.beginPath(); g.moveTo(i * w / 4 + (i % 2) * 10, 0); g.lineTo(i * w / 4 + (i % 2) * 10, h); g.stroke();
      }
      g.globalAlpha = 1;
      weather(g, w, h, 4141, 26, 0.7);
    });
  }
  function grilleTex(THREE) {
    return canvasTex(THREE, "kzGrille", 64, 64, function (g, w, h) {
      g.fillStyle = "#26292b"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#0b0c0d";
      for (var i = 0; i < 8; i++) g.fillRect(2, 2 + i * 7.8, w - 4, 4);
    });
  }
  /* the Mars-Passat faces: a grid of radiating elements in a frame */
  function arrayTex(THREE) {
    return canvasTex(THREE, "kzArray", 128, 128, function (g, w, h) {
      var i, j;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.fillStyle = "rgba(0,0,0,0.10)";
      for (i = 0; i < 16; i++) for (j = 0; j < 16; j++) if ((i + j) % 2) g.fillRect(i * 8 + 1, j * 8 + 1, 6, 6);
      g.strokeStyle = "rgba(0,0,0,0.25)"; g.lineWidth = 2; g.strokeRect(1, 1, w - 2, h - 2);
    });
  }
  /* the flight deck in plan: weathered plating and P3/P4's markings - the
     angled strip's foul lines, dashed centreline and spots, the wires, the
     yellow dash bars of the two take-off runs, the gas deflectors at their
     starts, the lift outlines, the twelve Granit hatches; no numbers or text */
  function deckTex(THREE, P) {
    return canvasTex(THREE, "kzDeck" + P.seed, 2048, 540, function (g, W, H) {
      var R = rng(P.seed + 31), i, x;
      var sx = W / (XD1 - XD0), sy = H / (YD1 - YD0);
      var px = function (X) { return (X - XD0) * sx; };
      var py = function (Y) { return (1 - (Y - YD0) / (YD1 - YD0)) * H; };
      g.fillStyle = P.deck; g.fillRect(0, 0, W, H);
      g.globalAlpha = 0.10; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (x = -150; x < 156; x += 6) { g.beginPath(); g.moveTo(px(x), 0); g.lineTo(px(x), H); g.stroke(); }
      for (x = -38; x < 42; x += 3) { g.beginPath(); g.moveTo(0, py(x)); g.lineTo(W, py(x)); g.stroke(); }
      for (i = 0; i < 900; i++) {
        g.globalAlpha = 0.04 + R() * 0.05; g.fillStyle = R() < 0.55 ? "#000000" : "#c8bcb4";
        g.fillRect(R() * W, R() * H, 4 + R() * 40, 2 + R() * 10);
      }
      /* tyre and exhaust wear along the landing strip */
      g.globalAlpha = 0.13; g.fillStyle = "#1a1a1a";
      for (i = 0; i < 70; i++) {
        var wx = -140 + R() * 120, wy = axisA(wx) + (R() - 0.5) * 8;
        g.save(); g.translate(px(wx), py(wy)); g.rotate(-0.131);
        g.fillRect(0, -1, (8 + R() * 22) * sx, 1.2 + R() * 2.5); g.restore();
      }
      g.globalAlpha = 1;
      var seg = function (col, x0, y0, x1, y1, w) {
        g.strokeStyle = col; g.lineWidth = Math.max(1, w * sx); g.beginPath(); g.moveTo(px(x0), py(y0)); g.lineTo(px(x1), py(y1)); g.stroke();
      };
      /* tie-down pad-eyes off the landing area */
      g.fillStyle = "rgba(18,18,18,0.45)";
      for (x = -148; x < 150; x += 4) for (var yy0 = -34; yy0 <= 36; yy0 += 4) {
        if (yy0 > edgeP(x) - 2 || yy0 < -edgeS(x) + 2 || (Math.abs(yy0 - axisA(x)) < 15 && x < 46)) continue;
        g.fillRect(px(x) - 1, py(yy0) - 1, 2, 2);
      }
      /* lifts: forward x +9..+28, after x -89..-73 (D1), a tone and an outline */
      LIFTS.forEach(function (q) {
        g.fillStyle = "rgba(0,0,0,0.14)"; g.fillRect(px(q[0]), py(-20.0), (q[1] - q[0]) * sx, 15.0 * sy);
        seg(P.line, q[0], -20.0, q[1], -20.0, 0.3); seg(P.line, q[0], -20.0, q[0], -35.0, 0.3);
        seg(P.line, q[1], -20.0, q[1], -35.0, 0.3);
        for (var k = 1; k < 4; k++) seg("rgba(0,0,0,0.35)", q[0] + k * (q[1] - q[0]) / 4, -20.5, q[0] + k * (q[1] - q[0]) / 4, -34.5, 0.12);
      });
      /* the angled strip: foul lines, dashed centreline, wires */
      seg(P.foul, -146, axisA(-146) - 14.5, 44, axisA(44) - 14.5, 0.45);
      seg(P.foul, -146, axisA(-146) + 14.5, -2, axisA(-2) + 14.5, 0.45);
      for (x = -146; x < 52; x += 7) seg(P.line, x, axisA(x), x + 4.2, axisA(x + 4.2), 0.5);
      for (i = 0; i < 4; i++) {
        var ax = -112 + i * 9.0;
        seg("#151515", ax, axisA(ax) - 12.5, ax + 1.6, axisA(ax) + 12.5, 0.25);
        seg("#151515", ax - 0.8, axisA(ax) - 13.2, ax + 0.8, axisA(ax) - 13.0, 0.8);
        seg("#151515", ax + 0.8, axisA(ax) + 13.0, ax + 2.4, axisA(ax) + 13.2, 0.8);
      }
      /* landing spots off D1 */
      [[82.6, 4.5], [54.4, 4.5], [42.8, 19.3], [19.0, 19.3], [-8.2, 13.6], [-40.9, 13.6], [-137.6, 3.4]].forEach(function (c) {
        g.strokeStyle = P.line; g.lineWidth = 0.4 * sx;
        g.beginPath(); g.ellipse(px(c[0]), py(c[1]), 3.6 * sx, 3.6 * sy, 0, 0, TW); g.stroke();
        seg(P.line, c[0] - 2.4, c[1], c[0] + 2.4, c[1], 0.35);
      });
      /* the two take-off runs to the lip: yellow dash bars (P3) */
      [[38.4, -15.2], [40.2, 6.1]].forEach(function (s0) {
        var x1 = 150.0, y1 = -1.0, L = Math.hypot(x1 - s0[0], y1 - s0[1]);
        var ang = Math.atan2(y1 - s0[1], x1 - s0[0]), t;
        for (t = 2; t < L - 2; t += 7.0) {
          var cx = s0[0] + Math.cos(ang) * t, cy = s0[1] + Math.sin(ang) * t;
          g.save(); g.translate(px(cx), py(cy)); g.rotate(-ang);
          g.fillStyle = P.bar; g.fillRect(-2.2 * sx, -0.9 * sy, 4.4 * sx, 1.8 * sy); g.restore();
        }
        /* the gas deflector at the run's start, lowered flush */
        g.save(); g.translate(px(s0[0] - 4.0), py(s0[1])); g.rotate(-ang);
        g.fillStyle = "#2e2f31"; g.fillRect(-1.6 * sx, -4.5 * sy, 3.2 * sx, 9.0 * sy);
        g.strokeStyle = "rgba(0,0,0,0.6)"; g.lineWidth = 1;
        for (var q = 1; q < 6; q++) { g.beginPath(); g.moveTo(-1.6 * sx, (-4.5 + q * 1.5) * sy); g.lineTo(1.6 * sx, (-4.5 + q * 1.5) * sy); g.stroke(); }
        g.strokeStyle = P.line; g.lineWidth = 0.2 * sx; g.strokeRect(-1.6 * sx, -4.5 * sy, 3.2 * sx, 9.0 * sy);
        g.restore();
      });
      /* Granit: twelve flush covers, four rows of three, in a field of plates
         (layout NOT CONFIRMED) */
      g.fillStyle = "rgba(0,0,0,0.12)"; g.fillRect(px(55.0), py(5.6), 30.0 * sx, 13.2 * sy);
      g.strokeStyle = "#a8a49a"; g.lineWidth = 0.2 * sx; g.strokeRect(px(55.0), py(5.6), 30.0 * sx, 13.2 * sy);
      for (i = 0; i < 4; i++) for (var j = 0; j < 3; j++) {
        var hx = 59.0 + i * 7.3, hy = -3.4 + j * 4.2;
        g.fillStyle = "#3c3c3e"; g.fillRect(px(hx - 2.9), py(hy + 1.8), 5.8 * sx, 3.6 * sy);
        g.strokeStyle = "#9c9890"; g.lineWidth = 0.15 * sx; g.strokeRect(px(hx - 2.9), py(hy + 1.8), 5.8 * sx, 3.6 * sy);
        g.strokeStyle = "rgba(0,0,0,0.55)"; g.beginPath(); g.ellipse(px(hx), py(hy), 1.5 * sx, 1.5 * sy, 0, 0, TW); g.stroke();
        g.beginPath(); g.moveTo(px(hx - 2.9), py(hy)); g.lineTo(px(hx + 2.9), py(hy)); g.stroke();
      }
      /* deck-edge line, inset 1 m, and a dashed ramp centreline */
      g.strokeStyle = P.edge; g.lineWidth = 0.3 * sx; g.beginPath();
      for (x = -151; x <= 151; x += 1) { var ye = edgeP(x) - 1.0; if (x === -151) g.moveTo(px(x), py(ye)); else g.lineTo(px(x), py(ye)); }
      g.stroke(); g.beginPath();
      for (x = -151; x <= 151; x += 1) { var ys = -edgeS(x) + 1.0; if (x === -151) g.moveTo(px(x), py(ys)); else g.lineTo(px(x), py(ys)); }
      g.stroke();
      for (x = 92; x < 150; x += 6) seg(P.line, x, -1.0, x + 3.0, -1.0, 0.3);
      weather(g, W, H, P.seed + 3, 80, 0.4);
    });
  }

  var ORDER = ["hull", "under", "sup", "gal", "fdeck", "dark", "array", "white", "team", "metal", "glass"];
  function makeMats(THREE, C, P) {
    var team = (C && C.team) || 0x3f7fd0, pl = plateTex(THREE);
    function skin(col, map, r) { return new THREE.MeshStandardMaterial({ color: col, map: map, roughness: r, metalness: 0.06 }); }
    return {
      hull:  skin(0xffffff, hullTex(THREE, P), 0.88),
      under: skin(0xffffff, underTex(THREE, P), 0.9),
      sup:   skin(P.sup, pl, 0.86),
      gal:   skin(P.gal, pl, 0.9),
      fdeck: skin(0xffffff, deckTex(THREE, P), 0.94),
      dark:  skin(0xffffff, grilleTex(THREE), 0.9),
      array: skin(0x8c949a, arrayTex(THREE), 0.7),
      white: skin(0xd3d7d9, pl, 0.62),
      team:  skin(team, pl, 0.8),
      metal: new THREE.MeshStandardMaterial({ color: 0x5d666d, roughness: 0.55, metalness: 0.5, side: THREE.DoubleSide }),
      glass: new THREE.MeshStandardMaterial({ color: 0x121c25, roughness: 0.12, metalness: 0.2 })
    };
  }
  function makeSinks() {
    return {
      hull: new Sink("hull"), under: new Sink("hull"), sup: new Sink("box", 0.15), gal: new Sink("box", 0.2),
      fdeck: new Sink("deck"), dark: new Sink("box", 0.6), array: new Sink("box", 0.16),
      white: new Sink("box", 0.3), team: new Sink("box", 0.3), metal: new Sink("box", 0.3), glass: new Sink("box", 0.3)
    };
  }

  /* ================================================================= HULL */
  var MAINXS = (function () {
    var xs = [], x;
    for (x = XS; x < XB - 0.1; x += x < 80 ? 6 : 3) xs.push(x);
    [-150, -147, -143, -138, 121, 127, 132, 137, 141, 145, 148.5, 151].forEach(function (q) { xs.push(q); });
    xs.push(XB); xs.sort(function (a, b) { return a - b; });
    for (var i = xs.length - 1; i > 0; i--) if (xs[i] - xs[i - 1] < 0.8) xs.splice(i, 1);
    xs[xs.length - 1] = XB;
    return xs;
  })();
  /* the ring's heights at a station: keel to the waterline, the knuckle,
     the flare to the top under the deck */
  function ringZ(xn) {
    var k = tab(KZ, xn), zr = zTop(xn), Z = [], i;
    if (k < 0) { [0, 0.08, 0.2, 0.36, 0.55, 0.75, 0.9].forEach(function (f) { Z.push(k + (0 - k) * f); }); Z.push(0); }
    else Z.push(k);
    var lo = Math.max(0, k);
    [0.35, 0.7].forEach(function (f) { var z = lo + (Math.min(KN, zr) - lo) * f; if (z > lo + 0.05) Z.push(z); });
    if (KN > lo + 0.1 && KN < zr - 0.3) Z.push(KN);
    var z0 = Math.max(lo, Math.min(KN, zr));
    for (i = 1; i <= 6; i++) Z.push(z0 + (zr - z0) * i / 6);
    return Z;
  }
  function hull(S) {
    var xs = MAINXS, i, j, NZ = 16;
    /* rows by station with a fixed count: each ring resampled to NZ heights */
    function ring(xn) {
      var Z = ringZ(xn), out = [], k;
      for (k = 0; k < NZ; k++) {
        var t = k / (NZ - 1), f = t * (Z.length - 1), a = Math.floor(f), b = Math.min(Z.length - 1, a + 1);
        var z = lerp(Z[a], Z[b], f - a);
        out.push([xAt(xn, z), sideY(xn, z), z]);
      }
      return out;
    }
    var R = xs.map(ring);
    var shell = function (a, b, c, sg) {
      var s = Math.max(a[2], b[2], c[2]) <= 0.02 ? S.under : S.hull;
      triO(s, a, b, c, [0, sg, 0]);
    };
    [1, -1].forEach(function (sg) {
      for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NZ - 1; j++) {
        var A = R[i][j], B = R[i][j + 1], Cc = R[i + 1][j], D = R[i + 1][j + 1];
        var f = function (p) { return [p[0], sg * p[1], p[2]]; };
        var o = [0, sg, 0];
        var a = f(A), b = f(B), c = f(Cc), d = f(D);
        /* the outward sense near the ends is mostly fore/aft */
        if (i === xs.length - 2) o = [0.6, sg, 0]; else if (i === 0) o = [-0.6, sg, 0];
        var s = Math.max(a[2], b[2], c[2], d[2]) <= 0.02 ? S.under : S.hull;
        triO(s, a, b, c, o); triO(s, b, d, c, o);
      }
    });
    shell = null;
    /* the transom: across the first station */
    var T0 = R[0], tc = [T0[0][0], 0, (T0[0][2] + T0[NZ - 1][2]) / 2];
    for (j = 0; j < NZ - 1; j++) {
      quadO(T0[j][2] < 0.5 ? S.under : S.hull, [T0[j][0], T0[j][1], T0[j][2]], [T0[j + 1][0], T0[j + 1][1], T0[j + 1][2]],
            [T0[j + 1][0], -T0[j + 1][1], T0[j + 1][2]], [T0[j][0], -T0[j][1], T0[j][2]], [-1, 0, 0]);
    }
    tc = null;
    /* the stem: a narrow plate across the last station */
    var TN = R[xs.length - 1];
    for (j = 0; j < NZ - 1; j++) if (TN[j][1] > 0.02 || TN[j + 1][1] > 0.02)
      quadO(S.hull, TN[j], TN[j + 1], [TN[j + 1][0], -TN[j + 1][1], TN[j + 1][2]], [TN[j][0], -TN[j][1], TN[j][2]], [1, 0, 0]);
  }
  /* a patch lying on the shell (openings, doors): x0..x1, z0..z1 */
  function hullPatch(s, sg, x0, x1, z0, z1, off, nx, nzz) {
    var i, j, G = [];
    nx = nx || 4; nzz = nzz || 2;
    for (i = 0; i <= nx; i++) {
      var x = lerp(x0, x1, i / nx), row = [];
      for (j = 0; j <= nzz; j++) { var z = lerp(z0, z1, j / nzz); row.push([x, sg * (shellY(x, z) + off), z]); }
      G.push(row);
    }
    for (i = 0; i < nx; i++) for (j = 0; j < nzz; j++) quadO(s, G[i][j], G[i + 1][j], G[i + 1][j + 1], G[i][j + 1], [0, sg, 0]);
  }

  /* ---------------------------------------------------------- flight deck */
  function deckXs() {
    var xs = [], i, x;
    for (x = XS; x < XR0; x += 4) xs.push(x);
    for (x = XR0; x < XB - 0.1; x += 2.5) xs.push(x);
    EP.concat(ES).forEach(function (q) { xs.push(q[0]); });
    xs.push(XB);
    xs.sort(function (p, q) { return p - q; });
    for (i = xs.length - 1; i > 0; i--) if (xs[i] - xs[i - 1] < 0.4) xs.splice(i, 1);
    return xs;
  }
  function flightDeck(S) {
    var xs = deckXs(), i;
    for (i = 0; i < xs.length - 1; i++) {
      var x0 = xs[i], x1 = xs[i + 1], z0 = deckZ(x0), z1 = deckZ(x1);
      var P0 = [x0, edgeP(x0), z0], P1 = [x1, edgeP(x1), z1], S0 = [x0, -edgeS(x0), z0], S1 = [x1, -edgeS(x1), z1];
      /* the top: one clean surface */
      triO(S.fdeck, S0, S1, P1, [0, 0, 1]); triO(S.fdeck, S0, P1, P0, [0, 0, 1]);
      /* the fascia, the edge's depth */
      quadO(S.sup, P0, P1, [x1, P1[1], z1 - FAS], [x0, P0[1], z0 - FAS], [0, 1, 0]);
      quadO(S.sup, S0, S1, [x1, S1[1], z1 - FAS], [x0, S0[1], z0 - FAS], [0, -1, 0]);
    }
    var e0 = [XS, edgeP(XS), FD], e1 = [XS, -edgeS(XS), FD];
    quadO(S.sup, e0, e1, [XS, e1[1], FD - FAS], [XS, e0[1], FD - FAS], [-1, 0, 0]);
    var zl = deckZ(XB), l0 = [XB, edgeP(XB), zl], l1 = [XB, -edgeS(XB), zl];
    quadO(S.sup, l0, l1, [XB, l1[1], zl - FAS], [XB, l0[1], zl - FAS], [1, 0, 0]);
    /* the ramp's rim, a low pale coaming round the lip (P4) */
    var rim = [];
    for (i = 0; i <= 8; i++) {
      var yy = lerp(edgeP(XB - 1.5), -edgeS(XB - 1.5), i / 8);
      rim.push([XB - 0.4 - 1.4 * Math.pow(Math.abs(yy) / 12, 3), yy, deckZ(XB) - 0.1]);
    }
    for (i = 0; i < rim.length - 1; i++) {
      var a = rim[i], b = rim[i + 1];
      quad2(S.white, a, b, [b[0], b[1], b[2] + 0.9], [a[0], a[1], a[2] + 0.9]);
    }
    /* where the deck overhangs the shell: the outer wall from the fascia
       down, then the soffit back in to the shell (P1: the paler band) */
    [1, -1].forEach(function (sg) {
      for (i = 0; i < xs.length - 1; i++) {
        var xa = xs[i], xb = xs[i + 1];
        var pa = wallAt(xa, sg), pb = wallAt(xb, sg);
        quadO(S.hull, pa[0], pb[0], pb[1], pa[1], [0, sg, 0]);
        quadO(S.hull, pa[1], pb[1], pb[2], pa[2], [0, sg * 0.4, -1]);
      }
    });
  }
  /* the overhang at x: [top of the wall, its foot, the shell where the soffit
     meets it] */
  function wallAt(x, sg) {
    var e = edge(x, sg), zr = zTop(x), hs = shellY(x, zr), over = Math.max(0, e - hs);
    var zw = zr - Math.min(3.0, 0.4 * over);                 /* P1: a 3 m wall */
    var za = Math.max(KN + 0.2, zw - Math.min(2.4, 0.25 * over));   /* the soffit's shadow band */
    if (over < 0.05) za = zw = zr;
    return [[x, sg * e, zr], [x, sg * e, zw], [x, sg * shellY(x, za), za]];
  }
  /* braces under the big overhangs */
  function braces(S) {
    for (var x = -100; x <= 52; x += 7) [1, -1].forEach(function (sg) {
      var w = wallAt(x, sg), over = edge(x, sg) - shellY(x, zTop(x));
      if (over < 6) return;
      tube(S.metal, [x, w[2][1] + sg * 0.2, w[2][2] + 0.3], [x, w[1][1] - sg * 0.5, w[1][2] - 0.1], 0.25, 0.25, 5, false);
    });
  }
  /* catwalks under the deck edge: the walkway, its rail, the safety net from
     under the edge to the rail's top; raft racks on some lengths */
  function galleries(S, sg, skip, rafts) {
    var xs = deckXs(), i, k;
    for (i = 0; i < xs.length - 1; i++) {
      var a = [xs[i], sg * edge(xs[i], sg)], b = [xs[i + 1], sg * edge(xs[i + 1], sg)];
      var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
      if (L < 1.2) continue;
      var ux = dx / L, uy = dy / L, ox = sg * -uy * -1, oy = sg * ux;
      ox = -uy * sg; oy = ux * sg;                       /* outward (left of +x for port) */
      if (oy * sg < 0.5) continue;                       /* only the long sides */
      var n = Math.max(1, Math.ceil(L / 7));
      for (k = 0; k < n; k++) {
        var p0 = [lerp(a[0], b[0], k / n), lerp(a[1], b[1], k / n)], p1 = [lerp(a[0], b[0], (k + 1) / n), lerp(a[1], b[1], (k + 1) / n)];
        var xm = (p0[0] + p1[0]) / 2;
        if (skip(xm)) continue;
        var z0 = deckZ(p0[0]) - 1.35, z1 = deckZ(p1[0]) - 1.35, w = 1.4, lp = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
        obox(S.sup, [xm + ox * (w / 2), (p0[1] + p1[1]) / 2 + oy * (w / 2), (z0 + z1) / 2 - 0.09], [ux, uy, 0], [ox, oy, 0], [0, 0, 1], lp, w, 0.18);
        var r0 = [p0[0] + ox * w, p0[1] + oy * w, z0], r1 = [p1[0] + ox * w, p1[1] + oy * w, z1];
        rail(S.metal, [r0, r1], 1.0, 2.4, 0.035);
        quadO(S.metal, [p0[0], p0[1], z0 + 1.0], [p1[0], p1[1], z1 + 1.0], [r1[0] + ox * 0.6, r1[1] + oy * 0.6, z1 + 1.35], [r0[0] + ox * 0.6, r0[1] + oy * 0.6, z0 + 1.35], [0, 0, 1]);
        if (rafts && rafts(xm)) {
          raft(S.white, S.metal, xm - ux * 1.0 + ox * 0.75, (p0[1] + p1[1]) / 2 - uy * 1.0 + oy * 0.75, (z0 + z1) / 2, Math.atan2(uy, ux), 1.3, 0.3);
          raft(S.white, S.metal, xm + ux * 1.0 + ox * 0.75, (p0[1] + p1[1]) / 2 + uy * 1.0 + oy * 0.75, (z0 + z1) / 2, Math.atan2(uy, ux), 1.3, 0.3);
        }
      }
    }
  }
  function scuttles(S, sg, x0, x1, step, z) {
    for (var x = x0; x <= x1; x += step) {
      var w = shellY(x, z);
      if (w > 1) disc(S.glass, [x, sg * (w + 0.05), z], [0, sg, 0], 0.24, 6);
    }
  }

  /* ============================================================= WEAPONS */
  /* Kashtan (CADS-N-1) combat module: the base drum, the turning body, the
     radar/optics head on top with its dish, the two six-barrel 30 mm guns
     low either side, a pack of four missile tubes over each gun */
  function kashtan(S, x, y, z, yaw) {
    var m = Xf(S.sup, x, y, z, yaw), d = Xf(S.dark, x, y, z, yaw), mt = Xf(S.metal, x, y, z, yaw), w = Xf(S.white, x, y, z, yaw);
    cylZ(m, 0, 0, 0, 0.8, 1.75, 12, 1.6);
    frustum(m, oct(-1.3, 1.2, -1.1, 1.1, 0.4, 0.3), 0.8, oct(-1.1, 1.0, -0.95, 0.95, 0.35, 0.25), 2.3);
    frustum(m, oct(-0.9, 0.5, -0.6, 0.6, 0.25, 0.2), 2.3, oct(-0.8, 0.35, -0.5, 0.5, 0.2, 0.15), 3.2);
    boxZ(d, 0.38, 0, 2.55, 0.1, 0.8, 0.45, 0);
    disc(w, [0.45, 0, 3.6], [1, 0, 0.25], 0.42, 10);
    tube(mt, [-0.2, 0, 3.2], [0.4, 0, 3.6], 0.05, 0.05, 4, false);
    [-1, 1].forEach(function (s) {
      tube(mt, [1.0, s * 1.35, 1.35], [2.9, s * 1.35, 1.35], 0.26, 0.24, 8, true);
      tube(d, [2.9, s * 1.35, 1.35], [3.4, s * 1.35, 1.35], 0.16, 0.16, 6, true);
      boxZ(m, 0.4, s * 1.35, 0.95, 1.6, 0.6, 0.8, 0);
      boxZ(m, 0.2, s * 1.45, 1.8, 2.3, 0.8, 0.8, 0);
      for (var i = 0; i < 2; i++) for (var j = 0; j < 2; j++) disc(d, [1.36, s * 1.45 + (i - 0.5) * 0.38, 2.0 + (j - 0.5) * 0.38], [1, 0, 0], 0.15, 6);
    });
  }
  /* AK-630M: the low drum turret with a rounded top, one six-barrel 30 mm gun */
  function ak630(S, x, y, z, yaw) {
    var m = Xf(S.sup, x, y, z, yaw), mt = Xf(S.metal, x, y, z, yaw);
    cylZ(m, 0, 0, 0, 0.5, 1.15, 12, 1.05);
    cylZ(m, 0, 0, 0.5, 0.75, 1.05, 12, 0.98);
    sphere(m, [0, 0, 1.25], 0.98, 12, 3, true);
    tube(mt, [0.8, 0, 1.0], [2.5, 0, 1.0], 0.17, 0.15, 8, true);
    boxZ(m, 0.6, 0, 0.75, 0.6, 0.5, 0.5, 0);
  }
  /* MR-123 (Bass Tilt): a dish in a drum housing on a pedestal */
  function bassTilt(S, x, y, z, yaw) {
    var m = Xf(S.sup, x, y, z, yaw), w = Xf(S.white, x, y, z, yaw);
    cylZ(m, 0, 0, 0, 1.4, 0.5, 8);
    cylZ(w, 0, 0, 1.4, 1.2, 0.95, 10, 0.85);
    sphere(w, [0, 0, 2.6], 0.85, 10, 3, true);
  }
  /* a weapons sponson under the deck edge: its deck from the shell out to
     yOut, the side, the bracket under it, the rail round the edge */
  function sponson(S, x0, x1, yOut, zTopS) {
    var sg = yOut > 0 ? 1 : -1, xm = (x0 + x1) / 2, yi = sg * (shellY(xm, zTopS) - 1.0), c = 1.6;
    var top = sg > 0 ? [[x0, yi], [x1, yi], [x1, yOut - c], [x1 - c, yOut], [x0 + c, yOut], [x0, yOut - c]]
                     : [[x0, yOut + c], [x0 + c, yOut], [x1 - c, yOut], [x1, yOut + c], [x1, yi], [x0, yi]];
    frustum(S.sup, top, zTopS - 0.5, top, zTopS);
    var bot = top.map(function (p) { return [p[0], Math.abs(p[1] - yi) > 0.5 ? lerp(p[1], yi, 0.75) : p[1]]; });
    frustum(S.hull, bot, zTopS - 4.0, top, zTopS - 0.5, false);
    var e = -sg * 0.25;
    rail(S.metal, [[x0 + 0.4, yOut + e - sg * 0.2 - sg * 1.0, zTopS], [x0 + c, yOut + e, zTopS], [x1 - c, yOut + e, zTopS], [x1 - 0.4, yOut + e - sg * 1.0, zTopS]], 1.0, 2.0, 0.035);
  }

  /* =============================================================== ISLAND
     On the starboard sponson (D1: x 0..-65, y -21.3..-35); heights from P1,
     the order of the tiers from P1, P3, P7.                              */
  var YI = -21.8, YO = -34.6, YC = (YI + YO) / 2;
  function island(S) {
    var z0 = FD, ZB = 23.5, ZF = 33.0, ZM = 37.0, ZT = 44.0, i;
    /* the base: the long low block with its end galleries (P7) */
    var base = oct(-58.0, 1.0, YO + 0.3, YI - 0.3, 1.5, 1.5);
    prism(S.sup, base, z0, ZB - 0.3, true);
    var bgal = oct(-63.0, 5.0, YO - 0.6, YI + 0.8, 2.0, 2.0);
    prism(S.gal, bgal, ZB - 0.3, ZB);
    railPoly(S.metal, inset(bgal, 0.1), ZB, 1.0);
    /* doors and scuttles in the base: forward face, inboard face */
    for (i = 0; i < 3; i++) panel(S.dark, base, z0, base, ZB, 2, 0.12 + i * 0.28, 0.27 + i * 0.28, z0 + 0.1, z0 + 2.8, 0.1);
    for (i = 0; i < 4; i++) panel(S.dark, base, z0, base, ZB, 4, 0.08 + i * 0.24, 0.13 + i * 0.24, z0 + 0.1, z0 + 2.4, 0.1);
    for (var f = 0.05; f < 0.96; f += 0.045) {
      panel(S.glass, base, z0, base, ZB, 4, f, f + 0.018, 20.2, 20.9, 0.1);
      panel(S.glass, base, z0, base, ZB, 0, f, f + 0.018, 20.2, 20.9, 0.1);
    }
    /* the bridge block forward (P1: to 33 m), its glazed band and wings */
    var fb0 = oct(-26.0, -6.5, YO + 0.9, YI - 0.8, 2.6, 0.5), fb1 = inset(fb0, 0.5);
    frustum(S.sup, fb0, ZB, fb1, ZF, true);
    [1, 2, 3].forEach(function (k) { panel(S.glass, fb0, ZB, fb1, ZF, k, 0.04, 0.96, ZF - 2.4, ZF - 1.0, 0.1); });
    [0, 4].forEach(function (k) {
      panel(S.glass, fb0, ZB, fb1, ZF, k, 0.72, 0.97, ZF - 2.4, ZF - 1.0, 0.1);
      for (var q = 0.06; q < 0.9; q += 0.09) panel(S.glass, fb0, ZB, fb1, ZF, k, q, q + 0.035, 27.0, 27.8, 0.1);
    });
    var fbr = inset(fb1, -0.6);
    prism(S.gal, fbr, ZF, ZF + 0.25);
    railPoly(S.metal, inset(fbr, 0.1), ZF + 0.25, 1.0);
    [[YI - 0.8, YI + 2.6], [YO - 2.4, YO + 0.9]].forEach(function (w) {
      blk(S.gal, -10.5, -6.0, w[0], w[1], ZF - 1.0, ZF - 0.7);
      rail(S.metal, [[-10.5, w[0] < YO ? w[0] : w[1], ZF - 0.7], [-6.0, w[0] < YO ? w[0] : w[1], ZF - 0.7]], 1.0);
    });
    /* the deck-level gallery round the forward face of the main block */
    /* the main block (P1: to 37 m), x -21.5 to -55 */
    var mb0 = oct(-55.0, -21.0, YO + 0.6, YI - 0.6, 2.0, 2.8), mb1 = inset(mb0, 0.4);
    frustum(S.sup, mb0, ZB, mb1, ZM, true);
    [0, 4].forEach(function (k) {
      for (var q = 0.05; q < 0.95; q += 0.07) {
        panel(S.glass, mb0, ZB, mb1, ZM, k, q, q + 0.03, 25.6, 26.4, 0.1);
        panel(S.glass, mb0, ZB, mb1, ZM, k, q + 0.02, q + 0.05, 29.4, 30.2, 0.1);
      }
      panel(S.dark, mb0, ZB, mb1, ZM, k, 0.55, 0.62, ZB + 0.1, ZB + 2.4, 0.1);
    });
    var mbr = inset(mb1, -0.5);
    prism(S.gal, mbr, ZM, ZM + 0.25);
    railPoly(S.metal, inset(mbr, 0.1), ZM + 0.25, 1.0);
    /* a gallery level part-way up the main block's sides */
    [0, 4].forEach(function (k) {
      var sgn = k === 0 ? -1 : 1, yy = k === 0 ? YO + 0.6 - 1.2 : YI - 0.6 + 1.2;
      blk(S.gal, -52.0, -24.0, yy - 0.6, yy + 0.6, 31.7, 31.95);
      rail(S.metal, [[-52.0, yy + sgn * 0.55, 31.95], [-24.0, yy + sgn * 0.55, 31.95]], 1.0);
      ladder(S.metal, [-50.0, yy, ZB], [-50.0, yy, 31.7], [1, 0, 0], 0.6);
    });
    /* the after end stepping down (P1: 30 m, then the base) */
    var ae0 = oct(-61.0, -54.0, YO + 1.2, YI - 1.2, 0.5, 2.0);
    frustum(S.sup, ae0, ZB, inset(ae0, 0.3), 30.0, true);
    railPoly(S.metal, inset(ae0, 0.4), 30.0, 1.0);
    /* the tower (P1: to 44 m) with the four Mars-Passat faces (P3, P7) */
    var tw0 = oct(-39.5, -21.8, YO + 1.4, YI - 1.4, 2.4, 1.6), tw1 = inset(tw0, 0.9);
    frustum(S.sup, tw0, ZM, tw1, ZT, true);
    [2, 6, 0, 4].forEach(function (k) {
      panel(S.array, tw0, ZM, tw1, ZT, k, 0.14, 0.86, ZM + 0.6, ZT - 0.7, 0.12);
      panel(S.metal, tw0, ZM, tw1, ZT, k, 0.1, 0.9, ZM + 0.4, ZM + 0.6, 0.14);
    });
    railPoly(S.metal, inset(tw1, 0.1), ZT, 1.0);
    /* the drum on the tower's roof: ribbed bands (P1: 43.6 - 51.3, 8.6 m) */
    var DX = -31.0, DY = YC;
    cylZ(S.sup, DX, DY, ZT, 7.2, 4.3, 22);
    [ZT + 0.2, ZT + 3.6, ZT + 7.0].forEach(function (zz) { cylZ(S.metal, DX, DY, zz, 0.3, 4.45, 22); });
    for (i = 0; i < 12; i++) {
      var an = i / 12 * TW;
      tube(S.metal, [DX + Math.cos(an) * 4.35, DY + Math.sin(an) * 4.35, ZT + 0.5], [DX + Math.cos(an) * 4.35, DY + Math.sin(an) * 4.35, ZT + 7.0], 0.08, 0.08, 3, false);
    }
    railPoly(S.metal, oct(DX - 4.1, DX + 4.1, DY - 4.1, DY + 4.1, 1.2, 1.2), ZT + 7.2, 0.9);
    /* the Top Plate (Fregat-MA): pedestal, two back-to-back array frames */
    cylZ(S.metal, DX, DY, ZT + 7.2, 1.6, 0.8, 8, 0.6);
    [-1, 1].forEach(function (e) {
      var c0 = [DX + e * 0.9, DY, ZT + 11.2], a = 0.3 * e;
      obox(S.metal, c0, [Math.sin(a) * e, 0, -Math.cos(a) * e * 0 + 0], [0, 1, 0], [0, 0, 1], 0.4, 5.6, 5.4);
      for (var q = -2; q <= 2; q++) boxZ(S.dark, DX + e * 1.15, DY + q * 1.1, ZT + 8.8, 0.08, 0.15, 4.8, 0);
    });
    tube(S.metal, [DX, DY, ZT + 14.0], [DX, DY, ZT + 14.6], 0.1, 0.06, 4, false);
    /* the two big white domes at the drum's foot (P7), smaller ones aft */
    [YI - 2.9, YO + 2.9].forEach(function (yy) {
      cylZ(S.sup, -24.6, yy, ZT, 0.8, 1.0, 8);
      sphere(S.white, [-24.6, yy, ZT + 1.8], 1.9, 12, 5);
    });
    [[-52.5, YI - 2.5], [-52.5, YO + 2.5], [-8.6, YO + 2.2]].forEach(function (q) {
      var zz = q[0] < -40 ? ZM + 0.25 : ZF + 0.25;
      cylZ(S.sup, q[0], q[1], zz, 0.9, 0.5, 8);
      sphere(S.white, [q[0], q[1], zz + 1.9], 1.1, 10, 4);
    });
    /* the funnel abaft the tower: an oval casing with a sloped black top
       (P1's smoke, P7) */
    var fn = [], fn1 = [], NF = 14;
    for (i = 0; i < NF; i++) {
      var th = i / NF * TW;
      fn.push([-46.5 + Math.cos(th) * 6.0, YC + Math.sin(th) * 4.4]);
      fn1.push([-46.5 + Math.cos(th) * 5.4, YC + Math.sin(th) * 4.0]);
    }
    frustum(S.sup, fn, ZM, fn1, ZT + 0.6, true);
    frustum(S.sup, fn1, ZT + 0.6, inset(fn1, 0.2), ZT + 1.4, true);
    prism(S.dark, inset(fn1, 0.6), ZT + 1.4, ZT + 1.6, true);
    for (i = 0; i < 4; i++) cylZ(S.metal, -49.0 + i * 1.8, YC + (i % 2 ? 1.0 : -1.0), ZT + 1.4, 1.2, 0.45, 6);
    /* the yards across the tower with their ESM spikes (P5, P7) */
    tube(S.metal, [-27.0, YO - 5.5, ZT + 0.8], [-27.0, YI + 5.0, ZT + 0.8], 0.14, 0.14, 5, false);
    [YO - 5.5, YO - 3.4, YI + 3.0, YI + 5.0].forEach(function (yy) {
      tube(S.metal, [-27.0, yy, ZT + 0.8], [-27.0, yy, ZT + 2.4], 0.05, 0.05, 3, false);
      tube(S.metal, [-27.0, yy, ZT + 0.8], [-27.0, yy, ZT - 0.6], 0.05, 0.05, 3, false);
    });
    [[-25.0, YO + 1.2], [-25.0, YI - 1.2]].forEach(function (q) {
      tube(S.metal, [q[0], q[1], ZT], [-27.0, q[1] < YC ? YO - 5.5 : YI + 5.0, ZT + 0.8], 0.06, 0.06, 3, false);
    });
    /* dishes either side of the bridge block (P3) */
    [[-7.5, YI - 1.6], [-7.5, YO + 1.6]].forEach(function (q) {
      cylZ(S.sup, q[0], q[1], ZF + 0.25, 1.0, 0.3, 6);
      tube(S.white, [q[0] + 0.2, q[1], ZF + 1.9], [q[0] + 0.7, q[1], ZF + 2.0], 1.2, 0.35, 12, true);
    });
    /* the poles aft (P1, P7) and the forward pole on the bridge roof */
    tube(S.metal, [-55.5, YC + 1.5, ZM], [-55.5, YC + 1.5, 47.5], 0.22, 0.1, 6, false);
    tube(S.metal, [-55.5, YC - 2.5, ZM], [-55.5, YC + 5.5, ZM + 0.0], 0.08, 0.08, 4, false);
    tube(S.metal, [-55.5, YC - 4.0, 44.0], [-55.5, YC + 7.0, 44.0], 0.08, 0.08, 4, false);
    tube(S.metal, [-59.5, YC - 1.0, 30.0], [-59.5, YC - 1.0, 44.0], 0.16, 0.08, 6, false);
    tube(S.metal, [-12.0, YC, ZF + 0.25], [-12.0, YC, 41.5], 0.16, 0.08, 6, false);
    tube(S.metal, [-12.0, YC - 3.5, 39.5], [-12.0, YC + 3.5, 39.5], 0.07, 0.07, 4, false);
    /* aerial whips at the roof corners */
    [[-21.5, YI - 1.0, ZM + 0.25], [-21.5, YO + 1.0, ZM + 0.25], [-60.0, YI - 1.5, 30.0], [-60.0, YO + 1.5, 30.0]].forEach(function (q) {
      tube(S.metal, q, [q[0], q[1], q[2] + 6.5], 0.06, 0.025, 3, false);
    });
    /* ladders up the inboard face, deck to the base's gallery and on up */
    ladder(S.metal, [-3.0, YI - 0.35, z0], [-3.0, YI - 0.35, ZB], [1, 0, 0], 0.6);
    ladder(S.metal, [-56.5, YI - 0.35, z0], [-56.5, YI - 0.35, ZB], [1, 0, 0], 0.6);
    ladder(S.metal, [-20.4, YI - 1.0, ZB], [-20.4, YI - 1.0, ZM], [1, 0, 0], 0.6);
    /* lockers, vents and lights on the base's gallery */
    [[-62.0, YI - 0.4], [-62.0, YO + 0.6], [3.5, YI - 0.4], [3.5, YO + 0.6]].forEach(function (q) {
      blk(S.sup, q[0] - 0.8, q[0] + 0.8, q[1] - 0.6, q[1] + 0.6, ZB, ZB + 1.2);
    });
    /* team: three small strips on up-facing roofs */
    blk(S.team, -16.0, -12.0, YC - 0.7, YC + 0.7, ZF + 0.25, ZF + 0.3);
    blk(S.team, -45.5, -42.0, YI - 1.4, YI - 0.8, ZM + 0.25, ZM + 0.3);
    blk(S.team, -60.0, -57.0, YC - 0.6, YC + 0.6, 30.0, 30.05);
  }

  function build(THREE, M, C, era) {
    var P = PAINT[era] || PAINT.e00, S = makeSinks(), i, s;

    hull(S);
    flightDeck(S);
    braces(S);
    /* the lift openings and the dark openings P2 shows in her starboard side
       (heights estimated: under the knuckle, below the sponson soffits) */
    LIFTS.forEach(function (L) { hullPatch(S.dark, -1, L[0] + 1.5, L[1] - 1.5, 3.6, 8.9, 0.3, 6, 2); });
    [[-133.0, -126.0, 5.4, 8.8], [-21.0, -9.0, 5.4, 8.8]].forEach(function (q) { hullPatch(S.dark, -1, q[0], q[1], q[2], q[3], 0.3, 4, 2); });
    hullPatch(S.dark, 1, -60.0, -50.0, 5.4, 8.8, 0.3, 4, 2);
    /* scuttle rows and the anchors in the bow flare (P1: the hawse at 137, 7 m) */
    [1, -1].forEach(function (sg) {
      scuttles(S, sg, -138, -100, 4.5, 6.4); scuttles(S, sg, 62, 118, 4.0, 6.8);
      scuttles(S, sg, -136, -102, 4.5, 8.2); scuttles(S, sg, 66, 112, 4.0, 10.6);
      var ax = 127.0, az = 10.5, w = shellY(ax, az);
      anchor(S.metal, S.dark, ax, sg * (w + 0.05), az, [0.4, sg, 0.25], 1.9);
      /* the bow's catwalk under the ramp edge and the mooring fairleads */
      for (i = 0; i < 3; i++) {
        var fx = 128 - i * 10, fy = sg * (shellY(fx, zTop(fx) - 1.2) + 0.15);
        boxZ(S.metal, fx, fy, zTop(fx) - 1.8, 1.4, 0.5, 0.9, 0);
      }
    });
    /* galleries and nets along the deck edges (P3, P7), raft racks */
    galleries(S, 1, function (x) { return x > 88 || x < -148 || (x > 40 && x < 62) || (x > -146 && x < -108) || (x > -72 && x < -20); },
              function (x) { return (x > -100 && x < -76) || (x > 0 && x < 18); });
    galleries(S, -1, function (x) {
      return x > 88 || x < -148 || (x > -66 && x < 8) || (x > 6 && x < 30) || (x > -91 && x < -71) || (x > 41 && x < 86) || (x > -146 && x < -110);
    }, function (x) { return (x > 30 && x < 40) || (x > -110 && x < -92); });
    /* aerial masts lowered outboard, and the pole on the starboard edge
       forward of the island (P7) */
    [30.0, -2.0, -90.0].forEach(function (x) { whip(S.metal, [x, edgeP(x) + 1.6, FD - 1.2], [-1, 0.06, 0], 8.5); });
    [-100.0, 36.0].forEach(function (x) { whip(S.metal, [x, -edgeS(x) - 1.6, FD - 1.2], [-1, -0.06, 0], 8.5); });
    tube(S.metal, [33.5, -34.2, FD - 2.5], [33.5, -34.2, FD + 10.5], 0.2, 0.1, 6, false);
    tube(S.metal, [33.5, -35.5, FD + 8.5], [33.5, -32.9, FD + 8.5], 0.06, 0.06, 4, false);

    island(S);

    /* the corner weapons sponsons, below deck level (D1) */
    var ZS = FD - 3.2;
    sponson(S, 62.0, 85.0, 21.8, ZS);
    kashtan(S, 69.5, 18.8, ZS, 0); kashtan(S, 80.0, 18.8, ZS, 0); ak630(S, 64.8, 19.3, ZS, 0);
    sponson(S, 43.0, 85.0, -30.4, ZS);
    kashtan(S, 62.0, -25.8, ZS, 0); kashtan(S, 76.0, -21.6, ZS, 0); ak630(S, 48.5, -27.2, ZS, 0); bassTilt(S, 54.0, -27.0, ZS, 0);
    sponson(S, -143.0, -111.0, 25.0, ZS);
    kashtan(S, -119.0, 21.4, ZS, PI); kashtan(S, -132.0, 21.4, ZS, PI); ak630(S, -139.5, 20.6, ZS, PI);
    sponson(S, -145.0, -117.0, -32.0, ZS);
    kashtan(S, -124.0, -28.4, ZS, PI); kashtan(S, -137.0, -28.2, ZS, PI); ak630(S, -142.0, -26.6, ZS, PI);
    /* the port gallery under the angled deck's notch, x -69..-24 (D1): two AK-630s */
    sponson(S, -69.0, -24.0, 34.2, ZS);
    ak630(S, -35.0, 32.0, ZS, 0); ak630(S, -58.0, 32.0, ZS, 0); bassTilt(S, -46.5, 32.0, ZS, 0);

    /* rudders, four shafts and their screws */
    for (s = -1; s <= 1; s += 2) boxZ(S.metal, -133.0, s * 5.0, -8.0, 4.6, 0.6, 7.2, 0);
    [[-5.0, -5.6], [-10.6, -4.8]].forEach(function (sq) {
      for (s = -1; s <= 1; s += 2) {
        var y0 = s * sq[0], z2 = sq[1];
        tube(S.metal, [-134.0, y0, z2], [-100.0, y0 * 0.8, z2 + 1.0], 0.4, 0.4, 8, false);
        tube(S.metal, [-122.0, y0 * 0.9, z2 + 0.4], [-122.0, y0 * 0.7, z2 + 3.2], 0.18, 0.18, 4, false);
        tube(S.metal, [-135.5, y0, z2], [-133.8, y0, z2], 0.75, 0.6, 8, true);
        for (i = 0; i < 5; i++) {
          var a = i * TW / 5 + 0.4;
          obox(S.metal, [-134.6, y0 + Math.cos(a) * 1.4, z2 + Math.sin(a) * 1.4], [1, 0, 0], [0, Math.cos(a), Math.sin(a)],
               [0, -Math.sin(a), Math.cos(a)], 0.9, 2.2, 0.16);
        }
      }
    });

    var T = makeMats(THREE, C, P), g = new THREE.Group();
    ORDER.forEach(function (k) { var me = S[k].mesh(THREE, T[k]); if (me) g.add(me); });
    return g;
  }
  return { build: build };
})();

UNIT_MODELS["pact_e90_carrier"] = {
  len: 305.0,
  build: function (THREE, M, C) { return HeroKuznetsov.build(THREE, M, C, "e90"); }
};
UNIT_MODELS["pact_e00_carrier"] = {
  len: 305.0,
  build: function (THREE, M, C) { return HeroKuznetsov.build(THREE, M, C, "e00"); }
};
/* today's row: drawn as last photographed in service (see VARIANTS) */
UNIT_MODELS["carrier_p"] = {
  len: 305.0,
  build: function (THREE, M, C) { return HeroKuznetsov.build(THREE, M, C, "e00"); }
};

/* The PLAN's Type 001 Liaoning is the second Project 1143.5 hull, the ex-Varyag.
   Registered here as this model's 2000s-2010s Kuznetsov (variant e00), a
   STAND-IN; js/hero/pla_carriers_redo.js, loaded later, overrides this key
   with its own Liaoning.  No markings. */
UNIT_MODELS["pla_e00_carrier"] = {
  len: 305.0,
  build: function (THREE, M, C) { return HeroKuznetsov.build(THREE, M, C, "e00"); }
};
