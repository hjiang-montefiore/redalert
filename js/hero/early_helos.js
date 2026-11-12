/* ===== early_helos.js - HERO models: the first Western troop-lift helicopters =====
   Four rows, three builders over one kit (EarlyHeloKit, below):
     gbr_e50_transport  HeroWhirlwind      Westland Whirlwind HAR.3 / HC.2 (S-55)
     deu_e50_transport  HeroS58.h34g       Sikorsky H-34G (S-58, Wright R-1820)
     gbr_e60_transport  HeroS58.wessex5    Westland Wessex HU.5 (S-58, two Gnomes)
     fra_e50_transport  HeroH21            Vertol H-21C "Banane"
   Until this file the four rows had no model of their own (render3d.js drew
   its fallback). No national markings: plain paint, team colour as a band
   round the tail and a small roof patch (exactly C.team).

   WHY NOT A VARIANT OF us_h19.js: HeroH19 (nato_e50_transport) is the S-55
   too, measured off the same H-19A three-view, but its build() returns one
   merged, untextured mesh per material with box windows, so a variant could
   neither reshape nor repaint it without reading its triangles back. The
   Whirlwind is built here with this file's kit instead; its stations were
   re-measured off that drawing and agree with HeroH19's within a few cm.

   REFERENCES (Wikimedia Commons, fetched one at a time with the generic
   agent name; nothing copied, they give shapes and figures):
     D1 "Sikorsky H-19A Chickasaw 3-view line drawing.png" - dimensioned:
        fuselage 42 ft 2.5 in from STA 0, 41 ft 3 in nose to tail rotor hub,
        9 ft 11 in nose to rotor axis, rotor 53 ft (16.4 in chord), tail
        rotor 8 ft 9 in, hub 10 ft 10 in up, nose wheels 10 ft 7 in ahead of
        the mains, tracks 4 ft 8 in / 11 ft, head top 13 ft 4 in. Unrotated
        (STA 0 is plumb); 83.3 px/m. Side, plan and front all read.
     D2 "Sikorsky H-34A 3-view line drawing.png" - dimensioned: rotor 56 ft
        (16.4 in chord), 44 ft 7 in STA 0 to tail rotor axis, 11 ft 5.68 in
        STA 0 to rotor axis, wheelbase 28 ft 3 in, track 12 ft, tail rotor
        9 ft 4 in with its bottom 6 ft 6 in up, head top 14 ft 3.45 in,
        overall 65 ft 9.32 in, stabilizer 26.7 in x 5 ft 6.6 in. Scanned
        0.4 deg askew: turned back before measuring; 74.7 px/m (side),
        74.1 px/m (front, on the 12 ft track).
     P1 "Westland Whirlwind HAR3 (c-n WA069, s-n XG574) ..." - port side,
        piston HAR.3 with the clamshell nose doors open: the door behind the
        cockpit, the two cabin windows, the twin nose wheels.
     P2 "Westland Whirlwind XL112 at RAF Leuchars 1962" - RAF piston
        Whirlwind: two nose wheels on separate legs, raked main legs, two
        blade tail rotor to port, the cabin rail.
     P3 "Sikorsky H-34G (cn 58-1679, 81+09) 2016-06-26 ..." - head-on 3/4:
        the band of cooling grilles across the top of the nose doors (D2's
        row of small "windows"), the single exhaust stub out of the
        STARBOARD nose door, the main oleo from the cockpit sill.
     P4 "XT602 Westland Wessex HAR.2 BHX 090685" - near side-on (port): the
        turbine nose, an exhaust each side, tail rotor on the port side of
        the pylon, the tail wheel.
     P5 "Westland Wessex HU.5 'XT765'" (Commons file "XT765 Westland Wessex
        HU5 high"), "Westland Wessex HU5 XT482 Z-M 19", "Westland Wessex HU5
        XT769", "Westland Wessex (50667272978)" - Commando green paint, the
        nose intake on the top front, the exhaust shape, the sill gutter.
     P6 "Vertol H-21C Shawnee pic1.JPG" - near side-on (port) of the
        Tripsdrill H-21C on its mast: the whole profile, measured after
        turning it 7.3 deg level on the forward section's stripe; 82.2 px/m
        on the published 52 ft 6 in. Cross-checked on "Piasecki Boeing Vertol
        H-21C Workhorse LSide SATM ..." (the same profile from further off).
     P7 "Vertol H-21C Heer.jpg" (Bundeswehr 83+08), "56-2159 Vertol H-21C
        Shawnee ...", "H-21C Shawnee 3865" - the parked stance, the single
        nose wheel on its long leg, the outrigger main legs, the end-plate
        fins, the forward pylon cone, olive paint.
     REJECTED "Westland Wessex 3-view NACA Aircraft Circular No.128.jpg" is
        the 1929 Westland Wessex trimotor, not the helicopter.
   TEXT (en.wikipedia raw): Whirlwind - HAR.3 Wright R-1300, HAR.5 the first
   with "a 3 degree droop of the tail boom"; rotor 53 ft. H-34 - fuselage
   47 ft 2 in, rotor 56 ft, height 14 ft 3.5 in. Wessex HC.2 - 65 ft 10 in
   rotors turning, height 15 ft 10 in, rotor 56 ft. H-21 (CH-21C) - length
   52 ft 6 in, height 15 ft 9 in, rotors 44 ft, one Wright R-1820.

   WHERE A DRAWING, A PHOTO AND A FIGURE DISAGREED (settled, with evidence):
     - Whirlwind boom: the brief asked for the drooping boom. Wikipedia puts
       the 3 degree droop on the HAR.5 and later; this row is the HAR.3/HC.2
       era and D1 draws the boom level; P2's apparent droop is perspective
       (its belly line runs the other way). Drawn LEVEL, as D1.
     - Whirlwind tail surface: D1 (H-19A) has the early inverted-V surfaces;
       the R-1300 machines (HAR.3, H-19B) went to a single horizontal tail
       plane (en.wikipedia H-19). Drawn as a flat plane at D1's station and
       span (16 in x 4 ft).
     - H-34 width: D2's plan dimension says 5 ft 8 in but the plan, scaled,
       measures 1.57 m. The FRONT view, scaled on its own 12 ft track,
       measures 1.74 m at the nose doors, i.e. 5 ft 8 in: the width is taken
       from the front view.
     - Wessex nose: no published fuselage length was fetched (the 65 ft 10 in
       overall is set by the rotors, not the nose). On P4, ratio at one
       station (nose height against nose length near the windscreen, with
       the 30 deg yaw read off the wheels' ellipses) puts the nose tip 3.56
       m ahead of the mast against D2's 3.32; the camera sits aft, so that
       is a lower bound. Drawn 3.70 (S-58 + 0.38 m).
     - H-21 stance: pic1 is on a mast. The stance comes from the gear: P7
       (Heer) gives the belly 1.91 m up at the nose leg against the 2.23 m
       fuselage depth at the same station; P6 gives the main wheels'
       contact 0.51 m under the forward belly line. That pitches the
       forward section 9.1 deg nose-up. CHECK, not fitted: the aft head's
       top then stands 4.90 m up against the published 15 ft 9 in (4.80).
     - H-21 hub spacing: P6 12.85 m, LSide 12.97 m; 12.90 used. Aft hub
       2.02 m (P6) / 1.72 m (LSide) over the forward one: P6 (the nearer,
       larger photo) used.

   RECOGNITION LIST (what each model must show, where it comes from):
     Whirlwind: radial nose under clamshell doors with their centre seam
       (D1 front, P1); cockpit perched over it with a two-pane windscreen and
       three side windows (D1); deep cabin, two square windows, sliding-door
       rail (D1); roof gearbox fairing; long level boom, belly sweeping up
       into it (D1); swept pylon, two-blade tail rotor to PORT (D1 plan, P2);
       twin nose wheels on separate legs, raked main legs (D1, P2).
     H-34G: rounded nose doors with the grille band on top, exhaust to
       starboard (D2, P3); cockpit high over the nose; cabin with two square
       windows a side, starboard sliding door; doghouse over the cabin; long
       tail cone rising into the pylon; four-blade tail rotor to port and
       the stabilizer at the pylon foot (D2); main oleos from the cockpit
       sill, tail wheel (D2, P3).
     Wessex HU.5: the same airframe with the long sloping turbine nose and
       its top intake, an exhaust each side (P4, P5).
     H-21C: glazed nose bubble, forward rotor on a cone over the cockpit,
       five portholes, port door, the 20 deg upward bend, the aft rotor on
       the end of the fuselage, end-plate fins on stubs, engine-air louvres
       on the back (P6, P7); nose wheel on a long leg, outrigger mains (P7).

   MEASURED vs PUBLISHED (model):
     Whirlwind  L 18.96 (X extent: disc front to tail rotor tip; D1 says
                62 ft 5.5 in = 19.04 rotors turning), fuselage 12.58 nose
                to tail rotor hub (12.57), head top 3.98 (13 ft 4 in = 4.06).
     S-58 rows  L 20.04 (65 ft 9.32 in = 20.05), H 4.86 to the top tail
                rotor blade (15 ft 10 in = 4.83), head top 4.40 (4.35).
     H-21C      fuselage 16.0 (scale source), L 19.88 X extent with the
                blades at the meshing phase, aft head top 4.90 (4.80).

   PARKED STANCE (from the drawn gear, see above): Whirlwind 0.95 deg and
   H-34/Wessex 0.71 deg nose-up (the drawings' ground lines, through the
   drawn wheels), H-21C 9.1 deg. Every wheel touches z = GROUND within 8 mm.

   NOT CONFIRMED (estimated, not measured or published):
     - paint: Whirlwind plain dark green #3f4a34 (no period colour photo of
       an RAF HC machine was fetched); H-34G and H-21C olive #4f5543 sampled
       off P7 (a German H-21, not a French one: the ALAT's colour is
       assumed the same); Wessex HU.5 Commando green #545a3c sampled off P5;
     - Whirlwind starboard side mirrors the port door and windows;
       the H-34G starboard door's size and position; the H-21's starboard
       portholes (mirrored, only the port side was photographed side-on);
     - the Wessex's nose sections ahead of the windscreen (shape read off
       P4/P5 photographs, see above) and its intake's width;
     - H-21C widths (taken as 0.85 of the depth from P7's nose), main gear
       track 3.6 m, fin stub span, blade chord 0.42 m, the nose leg's
       station (under the cockpit's rear frame, P7);
     - H-21C rotor sense: the forward head is turned anti-clockwise from
       above (the Vertol practice the Chinook file documents), not read off
       an H-21 reference;
     - S-58 tail rotor blade chord, all blade thicknesses;
     - the exhaust and grille sizes, the Whirlwind exhaust stack position
       (from HeroH19's photograph, not re-fetched).

   NAMED NODES (tools/jsc/rotor_axes_check.js passes, 16/16, with this file
   added in a scratch copy of index.html):
     rotor       each head in the us_h19.js mount (+PI/2 about X, the head
                 inside at -PI/2): anti-clockwise from above. The H-21 has
                 two "rotor" nodes, forward first; rotorShafts() turns the
                 aft one the other way.
     rotordisc   the S-55 and S-58 blur disc; none on the H-21 (two discs
                 would set the X extent to the rotors-turning length, as
                 ch47_chinook_family.js explains).
     tailrotor   S-55 and S-58: mount +PI/2 about X, hub axis along Y, on
                 the port side.
     undercarriage  the FIXED wheels: not "gear", which render3d.js hides
                 in flight.
   Model space: +X nose, +Y port, +Z up, metres; z = GROUND is the ground
   (Whirlwind -1.80, the others -2.00), the origin over the main rotor axis
   (the forward one on the H-21). Materials per model: SKIN (one
   CanvasTexture), GLASS, DARK, METAL, RUBBER, BLADE, TEAM, DISC. 11-12 draw
   calls. ASCII only.                                                     */

/* DETAIL PASS (2026-11), HeroWhirlwind (gbr_e50_transport) only; HeroS58, HeroH21 and the shared
   kit are untouched, so every caller (eu_naval_air.js) gets the same API. Placed off the HAR.3
   photographs and the H-19A three-view; sizes NOT measured: wipers, kick-in steps and handholds,
   the cabin-door step, the clamshell doors' hinges, the door rail's rollers, position lamps (red /
   green material), the boom beacon, the white tail lamp, hub caps and oleo pistons, the boom's
   hanger covers, the pitot mast, the long-wire aerial, the whip, the radio-compass loop, the
   carburettor intake grille, the oil cooler slots, a gearbox filler cap; on the head the blade
   bolts, droop-stop ring and tip caps (an extra "hub_detail" mesh inside the head). The paint
   gains fastener rows, boom and pylon panels, oil thrown back from the nose, door-sill scuffing
   and the roof walkways. 6300 -> 8004 tris, 12 -> 15 draw calls; extents unchanged. */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

/* ============================================================ the kit ===
   Shared by the three builders below. It is the ru_mi4.js kit (lofted
   stations, one painted CanvasTexture projected per face, lens-section
   blades), made into a factory so each builder has its own ground plane:
     EarlyHeloKit.make(THREE, GROUND) -> helpers bound to that ground.
   A station S(x, zb, zt, w, zs, wt, rb, rt) gives, at x, the belly and top
   heights ABOVE THE GROUND, the half width of the vertical side, the height
   that side runs up to, the half width at the top corner and the bottom /
   top corner radii (ru_mi4.js). The loft rings are vertical, so a station
   table can follow a fuselage that bends (the H-21's). */
var EarlyHeloKit = (function () {
  "use strict";
  var PI = Math.PI, D2R = PI / 180;
  var HALF = 16;

  function make(V, GROUND) {
    var K = { PI: PI, D2R: D2R };
    function Z(h) { return GROUND + h; }
    K.Z = Z;

    /* ------------------------------------------------------- stations */
    function S(x, zb, zt, w, zs, wt, rb, rt) {
      return { x: x, zb: zb, zt: zt, w: w, zs: zs, wt: wt, rb: rb, rt: rt };
    }
    function lerpS(A, B, f) {
      var o = {};
      ["x", "zb", "zt", "w", "zs", "wt", "rb", "rt"].forEach(function (k) { o[k] = A[k] + (B[k] - A[k]) * f; });
      return o;
    }
    function secAt(list, x) {
      if (x >= list[0].x) return list[0];
      for (var q = 0; q < list.length - 1; q++) {
        var A = list[q], B = list[q + 1];
        if (x <= A.x && x >= B.x) return lerpS(A, B, (A.x - x) / (A.x - B.x));
      }
      return list[list.length - 1];
    }
    function densify(list, step) {
      var out = [], q, k;
      for (q = 0; q < list.length - 1; q++) {
        var st = step((list[q].x + list[q + 1].x) / 2);
        var n = Math.max(1, Math.round((list[q].x - list[q + 1].x) / st));
        for (k = 0; k < n; k++) out.push(lerpS(list[q], list[q + 1], k / n));
      }
      out.push(list[list.length - 1]);
      return out;
    }
    function halfPoly(s) {
      var P = [], i, a;
      var rb = Math.min(s.rb, s.w, Math.max(0.01, s.zs - s.zb));
      var zs = Math.max(s.zb + rb, Math.min(s.zs, s.zt - Math.min(s.rt, s.wt)));
      var rt = Math.min(s.rt, s.wt, Math.max(0.01, s.zt - zs));
      P.push([0, s.zb]);
      for (i = 0; i <= 6; i++) { a = -PI / 2 + PI / 2 * i / 6; P.push([s.w - rb + Math.cos(a) * rb, s.zb + rb + Math.sin(a) * rb]); }
      P.push([s.w, zs]);
      for (i = 0; i <= 6; i++) { a = PI / 2 * i / 6; P.push([s.wt - rt + Math.cos(a) * rt, s.zt - rt + Math.sin(a) * rt]); }
      P.push([0, s.zt]);
      return P;
    }
    function halfRing(s) {
      var P = halfPoly(s), c = [0], i;
      for (i = 1; i < P.length; i++) {
        var dx = P[i][0] - P[i - 1][0], dz = P[i][1] - P[i - 1][1], turn = 0;
        if (i > 1) {
          var ex = P[i - 1][0] - P[i - 2][0], ez = P[i - 1][1] - P[i - 2][1];
          var l1 = Math.sqrt(ex * ex + ez * ez), l2 = Math.sqrt(dx * dx + dz * dz);
          if (l1 > 1e-6 && l2 > 1e-6) turn = Math.acos(Math.max(-1, Math.min(1, (ex * dx + ez * dz) / (l1 * l2))));
        }
        c.push(c[i - 1] + Math.sqrt(dx * dx + dz * dz) + 0.18 * turn * (s.w + s.zt - s.zb) / 3);
      }
      var tot = c[c.length - 1], out = [], j = 1;
      for (i = 0; i <= HALF; i++) {
        var t = tot * i / HALF;
        while (j < P.length - 1 && c[j] < t) j++;
        var f = c[j] > c[j - 1] ? (t - c[j - 1]) / (c[j] - c[j - 1]) : 0;
        f = Math.max(0, Math.min(1, f));
        out.push([P[j - 1][0] + (P[j][0] - P[j - 1][0]) * f, P[j - 1][1] + (P[j][1] - P[j - 1][1]) * f]);
      }
      return out;
    }
    function ringOf(s) {
      var h = halfRing(s), r = [], i;
      for (i = 0; i <= HALF; i++) r.push([-h[i][0], h[i][1]]);
      for (i = HALF - 1; i >= 1; i--) r.push([h[i][0], h[i][1]]);
      return r;
    }
    /* triangles of a loft, each handed to sink(tri, centre) */
    function loftTris(secs, sink, capFront, capBack) {
      var rings = secs.map(ringOf), n = rings[0].length, i, j;
      function P(i, j) { var r = rings[i][j % n]; return [secs[i].x, r[0], Z(r[1])]; }
      function put(t) {
        sink(t, [(t[0][0] + t[1][0] + t[2][0]) / 3, (t[0][1] + t[1][1] + t[2][1]) / 3, (t[0][2] + t[1][2] + t[2][2]) / 3]);
      }
      for (i = 0; i < secs.length - 1; i++) for (j = 0; j < n; j++) {
        var a = P(i, j), b = P(i, j + 1), c = P(i + 1, j), d = P(i + 1, j + 1);
        put([a, b, c]); put([b, d, c]);
      }
      function cap(k, front) {
        var r = rings[k], cy = 0, cz = 0;
        for (j = 0; j < n; j++) { cy += r[j][0]; cz += r[j][1]; }
        var o = [secs[k].x + (front ? 0.02 : -0.02), cy / n, Z(cz / n)];
        for (j = 0; j < n; j++) {
          var p0 = P(k, j), p1 = P(k, j + 1);
          if (front) put([o, p1, p0]); else put([o, p0, p1]);
        }
      }
      if (capFront) cap(0, true);
      if (capBack) cap(secs.length - 1, false);
    }
    /* skin half width at height h (above ground) at station x */
    function sideY(list, x, h) {
      var P = halfPoly(secAt(list, x)), best = 0, i;
      for (i = 1; i < P.length; i++) {
        var z0 = P[i - 1][1], z1 = P[i][1];
        if ((h - z0) * (h - z1) <= 0 && Math.abs(z1 - z0) > 1e-6) {
          var y = P[i - 1][0] + (P[i][0] - P[i - 1][0]) * (h - z0) / (z1 - z0);
          if (y > best) best = y;
        }
      }
      return best;
    }
    /* upper skin height (above ground) at lateral offset y */
    function topH(list, x, y) {
      var s = secAt(list, x), P = halfPoly(s), i, ay = Math.abs(y);
      for (i = P.length - 1; i > 0; i--) {
        var y0 = P[i][0], y1 = P[i - 1][0];
        if (ay >= y0 && ay <= y1 && y1 > y0) return P[i][1] + (P[i - 1][1] - P[i][1]) * (ay - y0) / (y1 - y0);
      }
      return s.zt;
    }
    /* a glass (or paint) patch lying on the skin: on the side, between
       stations x0 > x1 and heights h0 < h1 (side s = +1 port, -1 starboard);
       on the top, between x0 > x1 and lateral y0 < y1. off lifts it clear. */
    function panelSide(list, x0, x1, h0, h1, s, off, nx, nz) {
      var pts = [], i, j, out = [];
      nx = nx || 4; nz = nz || 3; off = off || 0.012;
      for (i = 0; i <= nx; i++) { pts.push([]); for (j = 0; j <= nz; j++) {
        var x = x0 + (x1 - x0) * i / nx, h = h0 + (h1 - h0) * j / nz;
        pts[i].push([x, s * (sideY(list, x, h) + off), Z(h)]);
      } }
      for (i = 0; i < nx; i++) for (j = 0; j < nz; j++) {
        var a = pts[i][j], b = pts[i + 1][j], c = pts[i][j + 1], d = pts[i + 1][j + 1];
        if (s > 0) out.push(a, b, d, a, d, c); else out.push(a, d, b, a, c, d);
      }
      return out;
    }
    function panelTop(list, x0, x1, y0, y1, off, nx, ny) {
      var pts = [], i, j, out = [];
      nx = nx || 4; ny = ny || 4; off = off || 0.012;
      for (i = 0; i <= nx; i++) { pts.push([]); for (j = 0; j <= ny; j++) {
        var x = x0 + (x1 - x0) * i / nx, y = y0 + (y1 - y0) * j / ny;
        pts[i].push([x, y, Z(topH(list, x, y) + off)]);
      } }
      for (i = 0; i < nx; i++) for (j = 0; j < ny; j++) {
        var a = pts[i][j], b = pts[i + 1][j], c = pts[i][j + 1], d = pts[i + 1][j + 1];
        out.push(a, c, d, a, d, b);
      }
      return out;
    }
    K.panelSide = function (list, x0, x1, h0, h1, s, off, nx, nz) {
      var t = panelSide(list, x0, x1, h0, h1, s, off, nx, nz), g = new V.BufferGeometry(), pos = [], i;
      for (i = 0; i < t.length; i++) pos.push(t[i][0], t[i][1], t[i][2]);
      g.setAttribute("position", new V.Float32BufferAttribute(pos, 3)); g.computeVertexNormals(); return g;
    };
    K.panelTop = function (list, x0, x1, y0, y1, off, nx, ny) {
      var t = panelTop(list, x0, x1, y0, y1, off, nx, ny), g = new V.BufferGeometry(), pos = [], i;
      for (i = 0; i < t.length; i++) pos.push(t[i][0], t[i][1], t[i][2]);
      g.setAttribute("position", new V.Float32BufferAttribute(pos, 3)); g.computeVertexNormals(); return g;
    };
    K.S = S; K.secAt = secAt; K.densify = densify; K.loftTris = loftTris;
    K.sideY = sideY; K.topH = topH;

    /* ---------------------------------------------------- geometry kit */
    function place(geo, x, y, z, rx, ry, rz) {
      if (rx || ry || rz)
        geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
      if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
      return geo;
    }
    function box(sx, sy, sz, x, y, z, rx, ry, rz) { return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz); }
    function cyl(r0, r1, len, seg, axis, x, y, z, open) {
      var g = new V.CylinderGeometry(r0, r1, len, seg, 1, !!open);
      if (axis === "x") g.rotateZ(-PI / 2);
      else if (axis === "z") g.rotateX(PI / 2);
      return place(g, x, y, z);
    }
    function bar(p, q, r, seg, capped) {
      var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, !capped);
      g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
      g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
      return g;
    }
    function sph(r, ws, hs, x, y, z, sx, sy, sz) {
      var g = new V.SphereGeometry(r, ws, hs);
      g.scale(sx || 1, sy || 1, sz || 1);
      return place(g, x, y, z);
    }
    function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
    function mirrorY(geo) {
      var g = geo.index ? geo.toNonIndexed() : geo.clone();
      var p = g.attributes.position.array, n = g.attributes.normal ? g.attributes.normal.array : null;
      var i, t, k, tmp;
      for (i = 0; i < p.length; i += 3) { p[i + 1] = -p[i + 1]; if (n) n[i + 1] = -n[i + 1]; }
      for (t = 0; t < p.length / 9; t++) for (k = 0; k < 3; k++) {
        tmp = p[t * 9 + 3 + k]; p[t * 9 + 3 + k] = p[t * 9 + 6 + k]; p[t * 9 + 6 + k] = tmp;
        if (n) { tmp = n[t * 9 + 3 + k]; n[t * 9 + 3 + k] = n[t * 9 + 6 + k]; n[t * 9 + 6 + k] = tmp; }
      }
      return g;
    }
    function both(list, geo) { list.push(geo); list.push(mirrorY(geo)); }
    function merge(list) {
      var pos = [], nor = [], i, j;
      for (i = 0; i < list.length; i++) {
        var g = flat(list[i]);
        if (!g.attributes.normal) g.computeVertexNormals();
        var p = g.attributes.position.array, n = g.attributes.normal.array;
        for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
      }
      var out = new V.BufferGeometry();
      out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
      out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
      return out;
    }
    function mesh(parent, list, mat, name, uvFn) {
      if (!list.length) return null;
      var geo = merge(list);
      if (uvFn) uvFn(geo);
      var m = new V.Mesh(geo, mat);
      if (name) m.name = name;
      parent.add(m);
      return m;
    }
    function soup(tl) {
      var pos = [], i, k;
      for (i = 0; i < tl.length; i++) for (k = 0; k < 3; k++) pos.push(tl[i][k][0], tl[i][k][1], tl[i][k][2]);
      var g = new V.BufferGeometry();
      g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
      var acc = {}, p = pos, key, t, nrm = new Float32Array(p.length);
      function Kk(o) { return Math.round(p[o] * 500) + "," + Math.round(p[o + 1] * 500) + "," + Math.round(p[o + 2] * 500); }
      for (t = 0; t < p.length; t += 9) {
        var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
        var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        for (var q = 0; q < 3; q++) {
          key = Kk(t + 3 * q);
          if (!acc[key]) acc[key] = [0, 0, 0];
          acc[key][0] += nx; acc[key][1] += ny; acc[key][2] += nz;
        }
      }
      for (t = 0; t < p.length; t += 3) {
        var a = acc[Kk(t)], l = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]) || 1;
        nrm[t] = a[0] / l; nrm[t + 1] = a[1] / l; nrm[t + 2] = a[2] / l;
      }
      g.setAttribute("normal", new V.BufferAttribute(nrm, 3));
      return g;
    }
    function tris(pts) {
      var pos = [], i;
      for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
      var g = new V.BufferGeometry();
      g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
      g.computeVertexNormals();
      return g;
    }
    function convex(faces) {
      var c = [0, 0, 0], n = 0, i, j, out = [];
      for (i = 0; i < faces.length; i++) for (j = 0; j < faces[i].length; j++) {
        c[0] += faces[i][j][0]; c[1] += faces[i][j][1]; c[2] += faces[i][j][2]; n++;
      }
      c[0] /= n; c[1] /= n; c[2] /= n;
      for (i = 0; i < faces.length; i++) {
        var f = faces[i], a = f[0];
        for (j = 1; j < f.length - 1; j++) {
          var b = f[j], d = f[j + 1];
          var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
          var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
          var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
          var o = (a[0] - c[0]) * nx + (a[1] - c[1]) * ny + (a[2] - c[2]) * nz;
          if (o >= 0) out.push(a, b, d); else out.push(a, d, b);
        }
      }
      return tris(out);
    }
    /* a convex (x, z) outline, model z, extruded t across y about y0 */
    function plank(pts, t, y0) {
      y0 = y0 || 0;
      var A = pts.map(function (p) { return [p[0], y0 - t / 2, p[1]]; });
      var B = pts.map(function (p) { return [p[0], y0 + t / 2, p[1]]; });
      var faces = [A, B], i, n = A.length;
      for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
      return convex(faces);
    }
    function slab(A, B) {
      var f = [A, B], i;
      for (i = 0; i < 4; i++) f.push([A[i], A[(i + 1) % 4], B[(i + 1) % 4], B[i]]);
      return convex(f);
    }
    /* a blade: lens section from r0 to r1 along +x, chord across y */
    function blade(r0, r1, ch, th, tipCut) {
      var sec = [[0.5, 0], [0.30, 0.5], [-0.05, 0.42], [-0.5, 0], [-0.05, -0.42], [0.30, -0.5]];
      var tl = [], i, n = sec.length;
      function P(r, k, sc) { return [r, sec[k][0] * ch * sc, sec[k][1] * th * sc]; }
      var st = [[r0, 1], [r1 - tipCut, 1], [r1, 0.55]];
      for (var s = 0; s < st.length - 1; s++) for (i = 0; i < n; i++) {
        var a = P(st[s][0], i, st[s][1]), b = P(st[s][0], (i + 1) % n, st[s][1]);
        var c = P(st[s + 1][0], i, st[s + 1][1]), d = P(st[s + 1][0], (i + 1) % n, st[s + 1][1]);
        tl.push(a, b, c, b, d, c);
      }
      for (i = 1; i < n - 1; i++) {
        tl.push(P(r0, 0, 1), P(r0, i + 1, 1), P(r0, i, 1));
        tl.push(P(r1, 0, 0.55), P(r1, i, 0.55), P(r1, i + 1, 0.55));
      }
      return tris(tl);
    }
    K.place = place; K.box = box; K.cyl = cyl; K.bar = bar; K.sph = sph; K.both = both;
    K.mirrorY = mirrorY; K.mesh = mesh; K.soup = soup; K.tris = tris; K.convex = convex;
    K.plank = plank; K.slab = slab; K.blade = blade;

    /* ------------------------------------------------------ materials */
    K.mats = function (C, blade) {
      var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
      return {
        skin:  new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.07 }),
        glass: new V.MeshPhysicalMaterial({ color: 0x1b262b, roughness: 0.08, metalness: 0.20,
                                            clearcoat: 1.0, clearcoatRoughness: 0.05 }),
        metal: new V.MeshStandardMaterial({ color: 0x5c6367, roughness: 0.46, metalness: 0.62 }),
        dark:  new V.MeshStandardMaterial({ color: 0x1c1f21, roughness: 0.64, metalness: 0.32 }),
        rubber: new V.MeshStandardMaterial({ color: 0x0e0f0f, roughness: 0.95, metalness: 0.02 }),
        blade: new V.MeshStandardMaterial({ color: blade || 0x2e3130, roughness: 0.78, metalness: 0.14 }),
        team:  new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                            emissive: new V.Color(tc), emissiveIntensity: 0.10 }),
        disc:  new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                            transparent: true, opacity: 0.05, depthWrite: false })
      };
    };

    /* ---------------------------------------------- the painted skin ===
       One 1024 x 1024 sheet in four 256-pixel bands, model metres:
       0 TOP (x across, y down), 1 PORT side (x, height), 2 STARBOARD, 3 BELLY.
       L = { UX0, UX1 (x range), QY (half width), QH0, QH1 (height range) }. */
    var TW = 1024, BAND = 256;
    function layoutFns(L) {
      var SX = TW / (L.UX1 - L.UX0), SZ = BAND / (L.QH1 - L.QH0);
      return {
        SX: SX, SZ: SZ, BAND: BAND, TW: TW,
        pxX: function (x) { return (x - L.UX0) * SX; },
        pyTop: function (y) { return (L.QY - y) / (2 * L.QY) * BAND; },
        pySide: function (h, b) { return b * BAND + (L.QH1 - h) / (L.QH1 - L.QH0) * BAND; },
        pyBelly: function (y) { return 3 * BAND + (L.QY - y) / (2 * L.QY) * BAND; }
      };
    }
    function rngFor(seed) {
      var s = (seed >>> 0) || 1;
      return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    }
    /* spec: { key, L, base, seed, frames: [x...], draw(g, H, R) } */
    K.skinTexture = function (spec) {
      var cache = EarlyHeloKit._tex;
      if (cache[spec.key] !== undefined) return cache[spec.key];
      var tex = false;
      try {
        var cv = document.createElement("canvas");
        cv.width = TW; cv.height = TW;
        var g = cv.getContext("2d"), H = layoutFns(spec.L), R = rngFor(spec.seed), i, x;
        g.fillStyle = spec.base; g.fillRect(0, 0, TW, TW);
        if (spec.belly) { g.fillStyle = spec.belly; g.fillRect(0, 3 * BAND, TW, BAND); }
        g.fillStyle = "rgba(255,255,230,0.06)"; g.fillRect(0, 0, TW, BAND);
        for (i = 0; i < 150; i++) {
          g.fillStyle = (i & 1) ? "rgba(255,255,235,0.05)" : "rgba(0,0,0,0.06)";
          g.fillRect(R() * TW, R() * 4 * BAND, (0.3 + R() * 1.1) * H.SX, 8 + R() * 22);
        }
        g.lineWidth = 1.3;
        for (i = 0; i < spec.frames.length; i++) {
          x = H.pxX(spec.frames[i]);
          g.strokeStyle = "rgba(0,0,0,0.24)"; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TW); g.stroke();
          g.fillStyle = "rgba(160,160,150,0.14)";
          for (var yy = 3; yy < TW; yy += 7) g.fillRect(x - 4, yy, 1.3, 1.3);
        }
        spec.draw(g, H, R);
        var t = new V.CanvasTexture(cv);
        t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
        t.anisotropy = 4;
        if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
        tex = t;
      } catch (e) { tex = false; }
      cache[spec.key] = tex;
      return tex;
    };
    /* each face picks its band from its normal; metre UVs remapped to 0..1 */
    K.projUV = function (L) {
      var H = layoutFns(L);
      return function (geo) {
        var p = geo.attributes.position.array;
        var uv = new Float32Array(p.length / 3 * 2), t, k;
        for (t = 0; t < p.length; t += 9) {
          var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
          var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
          var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
          var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
          nx /= nl; ny /= nl; nz /= nl;
          var band = nz > 0.62 ? 0 : nz < -0.62 ? 3 : (ny >= 0 ? 1 : 2);
          var endOn = Math.abs(nx) > Math.abs(ny) * 1.4;
          for (k = 0; k < 3; k++) {
            var x = p[t + 3 * k], y = p[t + 3 * k + 1], h = p[t + 3 * k + 2] - GROUND;
            var U, W, lo = band * BAND + 2, hi = (band + 1) * BAND - 2;
            if (band === 0) { U = H.pxX(x); W = H.pyTop(y); }
            else if (band === 3) { U = H.pxX(x); W = H.pyBelly(y); }
            else { U = H.pxX(endOn ? x + Math.abs(y) * 0.3 : x); W = H.pySide(h, band); }
            U = Math.max(2, Math.min(TW - 2, U));
            W = Math.max(lo, Math.min(hi, W));
            uv[(t / 3 + k) * 2] = U / TW;
            uv[(t / 3 + k) * 2 + 1] = 1 - W / TW;
          }
        }
        geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
        return geo;
      };
    };

    /* ---------------------------------------------------- the rotors ===
       A main head hangs in the h60_hawk_family.js / us_h19.js mount: a group
       at the hub, a +PI/2 mount about X, the "rotor" node, and a -PI/2
       group inside holding the head in model axes. The rotor node's local +Y
       is then the mast, pointing UP, and render3d.js rotorShafts() turns it
       positively about it: anti-clockwise from above, the Sikorsky and
       Piasecki sense. A second "rotor" in the same machine is turned the
       other way by rotorShafts itself. P: { x, y, z (model, hub centre),
       R, chord, nb, phase (deg of the first blade from +X), root (blade
       root radius), hubR, disc (bool), mats }. */
    K.mainRotor = function (parent, P) {
      var T = P.mats, k, i;
      var at = new V.Group();
      at.position.set(P.x, P.y || 0, P.z);
      parent.add(at);
      var mnt = new V.Group();
      mnt.rotation.x = PI / 2;
      at.add(mnt);
      var rotor = new V.Group();
      rotor.name = "rotor";
      mnt.add(rotor);
      var head = new V.Group();
      head.rotation.x = -PI / 2;
      rotor.add(head);
      var hubM = [], bl = [], hr = P.hubR;
      hubM.push(cyl(hr, hr * 1.08, 0.22, 16, "z", 0, 0, 0));
      hubM.push(cyl(hr * 1.25, hr * 1.25, 0.04, 18, "z", 0, 0, -0.22));        /* swashplate */
      hubM.push(cyl(hr * 0.42, hr * 0.42, 0.40, 12, "z", 0, 0, -0.30));        /* mast */
      hubM.push(cyl(hr * 0.55, hr * 0.25, P.cap || 0.16, 12, "z", 0, 0, 0.11 + (P.cap || 0.16) / 2));
      for (k = 0; k < P.nb; k++) {
        var a = (P.phase + 360 * k / P.nb) * D2R;
        var b = blade(P.root, P.R, P.chord, 0.06, 0.20);
        b.rotateZ(a);
        bl.push(b);
        var parts = [
          box(hr * 1.1, 0.16, 0.14, hr + hr * 0.45, 0, 0),                     /* flapping hinge */
          cyl(0.075, 0.075, P.root - hr * 1.6, 10, "x", hr * 1.6 + (P.root - hr * 1.6) / 2, 0, 0),  /* pitch housing */
          cyl(0.07, 0.045, 0.20, 10, "x", P.root + 0.05, 0, 0),                /* blade root cuff */
          bar([hr * 1.3, -0.12, -0.20], [hr * 1.9, -0.12, -0.02], 0.016, 5, true),  /* pitch link */
          cyl(0.03, 0.03, hr * 1.2, 6, "x", hr * 1.5, 0.15, 0.02)              /* damper */
        ];
        for (i = 0; i < parts.length; i++) { parts[i].rotateZ(a); hubM.push(parts[i]); }
      }
      mesh(head, hubM, T.metal, P.name ? P.name + "_hub" : "hub");
      mesh(head, bl, T.blade, P.name ? P.name + "_blades" : "blades");
      if (P.disc) {
        var d = new V.CircleGeometry(P.R, 48); d.translate(0, 0, 0.03);
        mesh(head, [d], T.disc, "rotordisc");
      }
      return rotor;
    };
    /* the tail rotor: the same mount, hub axis along the model Y (us_h19.js) */
    K.tailRotor = function (parent, P) {
      var T = P.mats, k;
      var tm = new V.Group();
      tm.position.set(P.x, P.y, P.z);
      tm.rotation.x = PI / 2;
      parent.add(tm);
      var tr = new V.Group();
      tr.name = "tailrotor";
      tm.add(tr);
      var hm = [cyl(0.08, 0.08, 0.14, 12, "z", 0, 0, 0), cyl(0.06, 0.02, 0.12, 10, "z", 0, 0, 0.12)];
      var bm = [];
      for (k = 0; k < P.nb; k++) {
        var a = (P.phase + 360 * k / P.nb) * D2R;
        var b = blade(0.16, P.R, P.chord, 0.035, 0.05);
        b.rotateX(6 * D2R); b.rotateZ(a);
        bm.push(b);
        var c = box(0.22, 0.10, 0.07, 0.12, 0, 0); c.rotateZ(a);
        hm.push(c);
      }
      mesh(tr, hm, T.metal, "tailrotor_hub");
      mesh(tr, bm, T.blade, "tailrotor_blades");
      return tr;
    };
    /* the parked stance: the whole machine pitched about the main wheels'
       contact line, so every wheel the drawing grounds touches z = 0 */
    K.stance = function (g, pivotX, pitchDeg) {
      var piv = new V.Group();
      piv.position.set(pivotX, 0, GROUND);
      piv.rotation.y = -pitchDeg * D2R;                 /* negative: nose up */
      g.add(piv);
      var inner = new V.Group();
      inner.position.set(-pivotX, 0, -GROUND);
      piv.add(inner);
      return inner;
    };
    return K;
  }
  return { make: make, _tex: {} };
})();

/* ======================================================================
   HeroWhirlwind - Westland Whirlwind HAR.3 / HC.2, the licence S-55
   ====================================================================== */
var HeroWhirlwind = (function () {
  "use strict";
  var PI = Math.PI, D2R = PI / 180;
  var GROUND = -1.80;
  /* x forward of the rotor axis; heights above the ground under the main
     wheels, in the fuselage datum (H-19A three-view, 83.3 px/m) */
  var HUB_H = 3.65, ROTOR_R = 8.08, CHORD = 0.417;
  var TR = { x: -9.55, y: 0.27, h: 3.46, R: 1.33, chord: 0.20 };
  var NOSE_W = { x: 1.81, y: 0.71, h: 0.16, r: 0.22 };
  var MAIN_W = { x: -1.31, y: 1.68, h: 0.26, r: 0.26 };
  var PITCH = 0.95;                       /* nose up, the drawing's ground line */
  var WIN = { h0: 1.43, h1: 1.83, xs: [[0.25, -0.18], [-0.85, -1.29]] };
  var DOOR = { x0: 0.45, x1: -0.40, h0: 0.42, h1: 1.95 };

  function fuselage(K) {
    var S = K.S;
    return [
      S( 3.03, 1.05, 1.21, 0.08, 1.13, 0.08, 0.05, 0.05),
      S( 3.00, 0.88, 1.45, 0.30, 1.15, 0.28, 0.25, 0.25),
      S( 2.95, 0.75, 1.62, 0.45, 1.17, 0.42, 0.35, 0.35),
      S( 2.85, 0.62, 1.85, 0.60, 1.20, 0.55, 0.45, 0.45),
      S( 2.65, 0.50, 2.12, 0.75, 1.30, 0.66, 0.50, 0.55),
      S( 2.45, 0.43, 2.28, 0.83, 1.40, 0.72, 0.50, 0.58),
      S( 2.25, 0.38, 2.37, 0.86, 1.50, 0.74, 0.48, 0.58),
      S( 1.98, 0.34, 2.48, 0.865, 1.60, 0.76, 0.45, 0.50),
      S( 1.60, 0.31, 2.84, 0.865, 1.80, 0.80, 0.42, 0.42),
      S( 1.28, 0.30, 3.10, 0.865, 2.00, 0.80, 0.40, 0.30),
      S( 1.01, 0.30, 3.17, 0.865, 2.10, 0.80, 0.40, 0.28),
      S(-0.52, 0.30, 3.17, 0.865, 2.10, 0.80, 0.40, 0.28),
      S(-0.95, 0.30, 2.95, 0.865, 2.15, 0.78, 0.40, 0.35),
      S(-1.32, 0.30, 2.66, 0.865, 2.25, 0.75, 0.40, 0.35),
      S(-1.70, 0.31, 2.66, 0.85, 2.25, 0.72, 0.40, 0.35),
      S(-2.50, 0.42, 2.66, 0.70, 2.25, 0.60, 0.38, 0.35),
      S(-3.10, 0.58, 2.66, 0.46, 2.30, 0.42, 0.30, 0.32),
      S(-4.00, 0.79, 2.66, 0.42, 2.35, 0.38, 0.25, 0.30),
      S(-4.92, 1.29, 2.67, 0.38, 2.40, 0.35, 0.25, 0.30),
      S(-5.85, 1.99, 2.67, 0.33, 2.45, 0.31, 0.25, 0.28),
      S(-8.25, 2.26, 2.68, 0.21, 2.50, 0.20, 0.18, 0.18),
      S(-8.60, 2.30, 2.68, 0.19, 2.50, 0.18, 0.17, 0.17)
    ];
  }
  var L = { UX0: -10.0, UX1: 3.2, QY: 0.95, QH0: 0.20, QH1: 3.40 };

  function paint(K) {
    return K.skinTexture({
      key: "whirlwind", L: L, base: "#3f4a34", seed: 5501,
      frames: [2.25, 1.28, 0.50, -0.45, -1.40, -2.40, -3.40, -4.40, -5.40, -6.40, -7.40, -8.30],
      draw: function (g, H) {
        var b, i;
        /* the clamshell engine doors: their aft edge, the centre seam on the
           nose, the cooling slots and the access panel behind them */
        g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.2;
        for (b = 1; b <= 2; b++) {
          g.beginPath(); g.moveTo(H.pxX(2.25), H.pySide(2.37, b)); g.lineTo(H.pxX(2.18), H.pySide(1.20, b));
          g.lineTo(H.pxX(2.30), H.pySide(0.40, b)); g.stroke();
          g.strokeRect(H.pxX(1.40), H.pySide(1.77, b), H.pxX(1.55) - H.pxX(1.40), H.pySide(1.17, b) - H.pySide(1.77, b));
          g.fillStyle = "rgba(10,10,8,0.6)";
          for (i = 0; i < 4; i++) g.fillRect(H.pxX(2.05 - i * 0.07), H.pySide(2.00, b), 0.03 * H.SX, H.pySide(1.62, b) - H.pySide(2.00, b));
          /* the cabin door around the first window, the door handle */
          g.strokeStyle = "rgba(0,0,0,0.6)"; g.lineWidth = 2.4;
          g.strokeRect(H.pxX(DOOR.x1), H.pySide(DOOR.h1, b), H.pxX(DOOR.x0) - H.pxX(DOOR.x1), H.pySide(DOOR.h0, b) - H.pySide(DOOR.h1, b));
          g.fillStyle = "rgba(0,0,0,0.5)"; g.fillRect(H.pxX(0.38), H.pySide(1.25, b), 0.10 * H.SX, 0.05 * H.SZ);
          /* window rims */
          WIN.xs.forEach(function (w) {
            g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.6;
            g.strokeRect(H.pxX(w[1]) - 3, H.pySide(WIN.h1, b) - 3, H.pxX(w[0]) - H.pxX(w[1]) + 6, H.pySide(WIN.h0, b) - H.pySide(WIN.h1, b) + 6);
          });
          /* the cabin's aft frame and the boom joint */
          g.strokeStyle = "rgba(0,0,0,0.45)"; g.lineWidth = 1.8;
          g.beginPath(); g.moveTo(H.pxX(-3.07), H.pySide(2.62, b)); g.lineTo(H.pxX(-3.07), H.pySide(0.55, b)); g.stroke();
          g.beginPath(); g.moveTo(H.pxX(-5.85), H.pySide(2.66, b)); g.lineTo(H.pxX(-5.85), H.pySide(1.99, b)); g.stroke();
          /* exhaust soot on the starboard side only, aft of the stack */
          if (b === 2) {
            var sg = g.createLinearGradient(H.pxX(2.3), 0, H.pxX(0.2), 0);
            sg.addColorStop(0, "rgba(20,18,15,0.45)"); sg.addColorStop(1, "rgba(20,18,15,0)");
            g.fillStyle = sg; g.fillRect(H.pxX(0.2), H.pySide(0.95, b), H.pxX(2.3) - H.pxX(0.2), H.pySide(0.35, b) - H.pySide(0.95, b));
          }
        }
        g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.2;
        g.beginPath(); g.moveTo(H.pxX(2.25), H.pyTop(0)); g.lineTo(H.pxX(3.1), H.pyTop(0)); g.stroke();
        g.beginPath(); g.moveTo(H.pxX(2.25), H.pyBelly(0)); g.lineTo(H.pxX(3.1), H.pyBelly(0)); g.stroke();
        /* roof hatch round the gearbox fairing */
        g.strokeStyle = "rgba(0,0,0,0.42)"; g.lineWidth = 1.6;
        g.strokeRect(H.pxX(-1.10), H.pyTop(0.45), H.pxX(0.75) - H.pxX(-1.10), H.pyTop(-0.45) - H.pyTop(0.45));
        /* detail pass: fastener rows down the cabin's and the boom's
           stringers, the inspection panels on the boom and the pylon, the
           oil the Cyclone throws back from the clamshell doors along the
           lower nose and the cabin belly, scuffing under the door, and the
           walkway on the cabin roof either side of the gearbox fairing */
        var RR = function (k) { return ((k * 2654435761) >>> 0) / 4294967296; };
        for (b = 1; b <= 2; b++) {
          g.fillStyle = "rgba(0,0,0,0.24)";
          [0.60, 1.20, 2.25, 2.90].forEach(function (h) { for (var xx = H.pxX(-3.0); xx < H.pxX(2.2); xx += 5) g.fillRect(xx, H.pySide(h, b), 1.2, 1.2); });
          [2.35, 2.55].forEach(function (h) { for (var xx = H.pxX(-8.4); xx < H.pxX(-3.1); xx += 5) g.fillRect(xx, H.pySide(h, b), 1.2, 1.2); });
          g.strokeStyle = "rgba(0,0,0,0.36)"; g.lineWidth = 1.3;
          [[-4.3, -4.8, 2.35, 2.60], [-6.3, -6.7, 2.30, 2.58], [-7.6, -8.0, 2.32, 2.60], [-2.2, -2.7, 0.70, 1.20], [1.10, 0.70, 0.45, 0.90]].forEach(function (q) {
            g.strokeRect(H.pxX(q[1]), H.pySide(q[3], b), H.pxX(q[0]) - H.pxX(q[1]), H.pySide(q[2], b) - H.pySide(q[3], b));
          });
          for (i = 0; i < 16; i++) {
            g.fillStyle = "rgba(24,18,10," + (0.10 + RR(i + b * 17) * 0.14).toFixed(3) + ")";
            g.fillRect(H.pxX(2.2 - RR(i * 3 + b) * 2.6), H.pySide(0.45 + RR(i * 7) * 0.5, b), (0.5 + RR(i * 5) * 1.0) * H.SX, 1.5 + RR(i * 11) * 2);
          }
          g.fillStyle = "rgba(120,112,92,0.16)";
          g.fillRect(H.pxX(DOOR.x1), H.pySide(DOOR.h0 + 0.06, b), H.pxX(DOOR.x0) - H.pxX(DOOR.x1), 4);
        }
        for (i = 0; i < 20; i++) {
          g.fillStyle = "rgba(24,18,10," + (0.10 + RR(i + 91) * 0.12).toFixed(3) + ")";
          g.fillRect(H.pxX(2.4 - RR(i * 13) * 3.2), H.pyBelly(-0.6 + RR(i * 17) * 1.2), (0.6 + RR(i * 19) * 1.2) * H.SX, 2);
        }
        g.fillStyle = "rgba(0,0,0,0.12)";
        g.fillRect(H.pxX(-1.10), H.pyTop(0.75), H.pxX(0.75) - H.pxX(-1.10), H.pyTop(0.50) - H.pyTop(0.75));
        g.fillRect(H.pxX(-1.10), H.pyTop(-0.50), H.pxX(0.75) - H.pxX(-1.10), H.pyTop(-0.75) - H.pyTop(-0.50));
      }
    });
  }

  function build(THREE, M, C) {
    var V = THREE, K = EarlyHeloKit.make(V, GROUND), Z = K.Z;
    var box = K.box, cyl = K.cyl, bar = K.bar, both = K.both, mesh = K.mesh;
    var g = new V.Group();
    g.name = "whirlwind";
    var T = K.mats(C, 0x2b2d2b), tex = paint(K);
    if (tex) T.skin.map = tex; else T.skin.color.set("#3f4a34");
    var root = K.stance(g, MAIN_W.x, PITCH);
    var FUS = fuselage(K);
    var skin = [], glass = [], metal = [], dark = [], team = [], skinT = [];
    var und = [], tyres = [], i, s;
    function SY(x, h) { return K.sideY(FUS, x, h); }
    function TOP(x, y) { return K.topH(FUS, x, y); }

    /* ---- the fuselage loft; the glazing lies on it as panels that follow
       the skin (windscreen on the raked top, the cockpit's side windows on
       its shoulders, the square cabin windows on the cabin side) */
    K.loftTris(K.densify(FUS, function (x) { return x > 1.9 ? 0.10 : x > -1.8 ? 0.15 : x > -6 ? 0.35 : 0.8; }),
      function (t) { skinT.push(t); }, true, true);
    skin.push(K.soup(skinT));
    glass.push(K.panelTop(FUS, 1.95, 1.30, 0.03, 0.74, 0.012), K.panelTop(FUS, 1.95, 1.30, -0.74, -0.03, 0.012));
    for (s = -1; s <= 1; s += 2) {
      glass.push(K.panelSide(FUS, 1.22, 0.56, 2.50, 3.02, s));
      glass.push(K.panelSide(FUS, 0.48, 0.03, 2.50, 3.00, s));
      glass.push(K.panelSide(FUS, -0.04, -0.60, 2.50, 3.00, s));
      WIN.xs.forEach(function (w) { glass.push(K.panelSide(FUS, w[0], w[1], WIN.h0, WIN.h1, s, 0.008, 2, 2)); });
    }

    /* windscreen frame: centre post, the sill, the corner posts */
    var fr = 0.026;
    skin.push(bar([1.97, 0, Z(TOP(1.97, 0) + 0.02)], [1.28, 0, Z(TOP(1.28, 0) + 0.02)], fr, 6, true));
    for (s = -1; s <= 1; s += 2) {
      skin.push(bar([1.97, s * 0.76, Z(2.50)], [1.28, s * 0.78, Z(3.08)], fr, 6, true));
      skin.push(bar([0.52, s * (SY(0.52, 2.75) + 0.01), Z(2.46)], [0.52, s * (SY(0.52, 2.75) + 0.01), Z(3.06)], fr, 6, true));
      skin.push(bar([-0.02, s * (SY(-0.02, 2.75) + 0.01), Z(2.46)], [-0.02, s * (SY(-0.02, 2.75) + 0.01), Z(3.06)], fr, 6, true));
      skin.push(bar([1.24, s * (SY(1.0, 2.46) + 0.01), Z(2.46)], [-0.64, s * (SY(-0.6, 2.46) + 0.01), Z(2.46)], fr, 6, true));
    }
    /* the gearbox fairing on the roof and the mast */
    skin.push(K.convex([
      [[0.55, 0.30, Z(3.15)], [0.55, -0.30, Z(3.15)], [-0.70, -0.42, Z(3.15)], [-0.70, 0.42, Z(3.15)]],
      [[0.30, 0.22, Z(3.40)], [0.30, -0.22, Z(3.40)], [-0.45, -0.30, Z(3.40)], [-0.45, 0.30, Z(3.40)]]]));
    metal.push(cyl(0.11, 0.13, 0.30, 12, "z", 0, 0, Z(3.50)));

    /* ---- the nose: the clamshell doors' centre seam and their two slots,
       the exhaust stack under the starboard side, the landing light */
    dark.push(box(0.03, 0.012, 1.0, 3.01, 0, Z(1.15)));
    for (s = -1; s <= 1; s += 2) dark.push(box(0.03, 0.18, 0.035, 2.96, s * 0.15, Z(1.62), 0, -30 * D2R, 0));
    dark.push(cyl(0.07, 0.07, 0.50, 10, "x", 2.05, -0.45, Z(0.42)));
    dark.push(cyl(0.065, 0.065, 0.04, 10, "x", 1.79, -0.45, Z(0.42)));
    glass.push(K.sph(0.08, 10, 6, 2.55, 0.42, Z(0.55)));

    /* ---- the sliding-door rail each side and the starboard hoist */
    for (s = -1; s <= 1; s += 2) {
      metal.push(box(3.10, 0.05, 0.07, -0.26, s * 0.885, Z(2.00)));
      metal.push(box(0.12, 0.04, 0.03, 0.30, s * 0.88, Z(1.20)));
    }
    metal.push(box(0.50, 0.24, 0.28, -0.70, -0.98, Z(2.60)));
    metal.push(bar([-0.45, -0.88, Z(2.55)], [-0.60, -0.98, Z(2.55)], 0.04, 6, true));

    /* ---- the tail: pylon with the tail rotor gearbox, horizontal tail
       plane at the drawing's tail-surface station, bumper, aerial */
    skin.push(K.plank([[-8.45, Z(2.68)], [-9.30, Z(3.62)], [-9.50, Z(3.72)], [-9.66, Z(3.62)], [-9.20, Z(2.48)], [-8.75, Z(2.26)]], 0.16));
    skin.push(cyl(0.12, 0.12, 0.30, 12, "y", TR.x, TR.y / 2, Z(TR.h)));
    skin.push(K.slab(
      [[-8.19, -0.61, Z(2.24)], [-8.53, -0.61, Z(2.24)], [-8.53, 0.61, Z(2.24)], [-8.19, 0.61, Z(2.24)]],
      [[-8.19, -0.61, Z(2.28)], [-8.53, -0.61, Z(2.28)], [-8.53, 0.61, Z(2.28)], [-8.19, 0.61, Z(2.28)]]));
    metal.push(bar([-8.70, 0, Z(2.27)], [-9.00, 0, Z(1.72)], 0.03, 6, true));
    dark.push(cyl(0.05, 0.05, 0.10, 8, "y", -9.00, 0, Z(1.70)));
    metal.push(bar([-3.60, 0, Z(2.67)], [-4.20, 0, Z(3.05)], 0.012, 4, true));
    /* team colour: a band round the boom and a patch on the cabin roof */
    var band = [];
    K.loftTris([K.secAt(FUS, -6.6), K.secAt(FUS, -6.95)].map(function (q) {
      return K.S(q.x, q.zb - 0.015, q.zt + 0.015, q.w + 0.015, q.zs, q.wt + 0.015, q.rb, q.rt);
    }), function (t) { band.push(t); }, false, false);
    team.push(K.soup(band));
    team.push(box(0.90, 0.60, 0.02, -1.80, 0, Z(TOP(-1.8, 0) + 0.01)));

    /* ---- the undercarriage (fixed, so not "gear"): two nose wheels on
       their own short legs, two main wheels on long raked struts */
    var undG = new V.Group();
    undG.name = "undercarriage";
    root.add(undG);
    for (s = -1; s <= 1; s += 2) {
      var nw = [NOSE_W.x, s * NOSE_W.y, Z(NOSE_W.h)];
      tyres.push(cyl(NOSE_W.r, NOSE_W.r, 0.13, 20, "y", nw[0], nw[1], nw[2]));
      und.push(cyl(0.09, 0.09, 0.15, 10, "y", nw[0], nw[1], nw[2]));
      und.push(bar([nw[0], s * (NOSE_W.y - 0.10), nw[2]], [nw[0] + 0.02, s * (NOSE_W.y - 0.10), Z(0.62)], 0.035, 8, true));
      und.push(bar([nw[0] + 0.02, s * (NOSE_W.y - 0.10), Z(0.60)], [nw[0] + 0.05, s * 0.45, Z(0.45)], 0.04, 8, true));
      var mw = [MAIN_W.x, s * MAIN_W.y, Z(MAIN_W.h)];
      tyres.push(cyl(MAIN_W.r, MAIN_W.r, 0.17, 22, "y", mw[0], mw[1], mw[2]));
      und.push(cyl(0.11, 0.11, 0.19, 10, "y", mw[0], mw[1], mw[2]));
      var hub = [mw[0], s * (MAIN_W.y - 0.12), mw[2]];
      und.push(bar(hub, [-1.79, s * (SY(-1.79, 1.23) + 0.02), Z(1.23)], 0.05, 8, true));        /* oleo */
      und.push(bar(hub, [-0.89, s * 0.72, Z(0.40)], 0.035, 6, true));                             /* drag strut */
      und.push(bar(hub, [-1.75, s * 0.72, Z(0.36)], 0.035, 6, true));                             /* radius rod */
    }
    /* ================================================= DETAIL PASS ======
       The fittings the first pass left out, placed off the header's
       photographs of HAR.3s and the H-19A three-view: their sizes are read
       through the photographs' perspective, NOT measured. */
    var lampR = [], lampG = [], sph = K.sph;
    for (s = -1; s <= 1; s += 2) {
      /* the windscreen wipers, parked upright on the raked screen */
      dark.push(bar([1.90, s * 0.40, Z(TOP(1.90, 0.40) + 0.03)], [1.55, s * 0.34, Z(TOP(1.55, 0.34) + 0.03)], 0.010, 4, true));
      /* the cockpit's kick-in steps and handholds up the nose's side, the
         step under the cabin door */
      [0.75, 1.25, 1.75].forEach(function (h) {
        dark.push(box(0.14, 0.02, 0.05, 1.55, s * (SY(1.55, h) + 0.008), Z(h)));
      });
      metal.push(bar([1.10, s * (SY(1.10, 2.35) + 0.04), Z(2.30)], [1.10, s * (SY(1.10, 2.35) + 0.04), Z(2.42)], 0.012, 4, true));
      metal.push(box(0.50, 0.18, 0.025, 0.02, s * (SY(0.02, 0.40) + 0.09), Z(0.36)));
      metal.push(bar([0.20, s * SY(0.20, 0.42), Z(0.42)], [0.20, s * (SY(0.20, 0.42) + 0.17), Z(0.37)], 0.012, 4, true));
      metal.push(bar([-0.16, s * SY(-0.16, 0.42), Z(0.42)], [-0.16, s * (SY(-0.16, 0.42) + 0.17), Z(0.37)], 0.012, 4, true));
      /* the clamshell doors' hinges and latches, the cooling louvres' lips */
      [0.70, 1.20, 1.80].forEach(function (h) {
        dark.push(box(0.05, 0.03, 0.07, 2.23, s * (SY(2.23, h) + 0.01), Z(h)));
      });
      /* the sliding door's handle and its rollers on the rail */
      metal.push(cyl(0.03, 0.03, 0.05, 8, "y", 0.40, s * 0.90, Z(1.96)), cyl(0.03, 0.03, 0.05, 8, "y", -0.38, s * 0.90, Z(1.96)));
      /* position lamps on the cabin's lower corners ahead of the wheels:
         port red, starboard green */
      (s > 0 ? lampR : lampG).push(sph(0.035, 8, 5, -1.70, s * (SY(-1.70, 0.95) + 0.02), Z(0.95), 1.4, 0.6, 0.9));
      /* the main wheels' hub caps and the oleo's bright piston, the nose
         wheels' caps (in the undercarriage group) */
      und.push(cyl(0.07, 0.07, 0.03, 10, "y", MAIN_W.x, s * (MAIN_W.y + 0.10), Z(MAIN_W.h)));
      und.push(cyl(0.025, 0.025, 0.03, 6, "y", MAIN_W.x, s * (MAIN_W.y + 0.12), Z(MAIN_W.h)));
      und.push(cyl(0.05, 0.05, 0.02, 10, "y", NOSE_W.x, s * (NOSE_W.y + 0.075), Z(NOSE_W.h)));
      und.push(bar([MAIN_W.x - 0.10, s * (MAIN_W.y - 0.30), Z(MAIN_W.h + 0.22)], [MAIN_W.x - 0.24, s * (MAIN_W.y - 0.55), Z(MAIN_W.h + 0.50)], 0.062, 8, true));
      /* the boom's drive-shaft hanger covers */
      [-4.6, -5.6, -6.6, -7.6].forEach(function (xh) {
        var sc = K.secAt(FUS, xh);
        dark.push(box(0.10, 0.025, 0.05, xh, s * (sc.w + 0.004), Z(2.45)));
      });
    }
    /* the pitot on its mast above the windscreen's centre post */
    var tz = TOP(1.30, 0.10);
    metal.push(bar([1.30, 0.10, Z(tz)], [1.30, 0.10, Z(tz + 0.16)], 0.012, 5, true));
    metal.push(bar([1.30, 0.10, Z(tz + 0.16)], [1.75, 0.10, Z(tz + 0.16)], 0.010, 5, true));
    /* the long-wire HF aerial from the mast on the boom to the pylon, the
       whip under the boom, the radio-compass loop on the cabin roof */
    dark.push(bar([-4.20, 0, Z(3.05)], [-8.95, 0, Z(3.20)], 0.005, 3, true));
    dark.push(bar([-8.95, 0, Z(3.20)], [-8.95, 0, Z(2.95)], 0.010, 4, true));
    dark.push(bar([-5.20, 0, Z(1.60)], [-5.55, 0, Z(1.10)], 0.008, 4, true));
    dark.push(cyl(0.12, 0.12, 0.05, 12, "z", -1.20, 0, Z(TOP(-1.2, 0) + 0.03)));
    /* the anti-collision beacon on the boom top behind the cabin, a white
       tail lamp on the pylon's trailing edge */
    dark.push(cyl(0.05, 0.055, 0.04, 10, "z", -3.30, 0, Z(2.68)));
    lampR.push(sph(0.045, 10, 6, -3.30, 0, Z(2.71), 1, 1, 0.8));
    metal.push(sph(0.03, 8, 5, -9.38, 0, Z(2.80), 1.3, 0.8, 1.0));
    /* the engine's carburettor air intake grille under the nose, the oil
       cooler's outlet, the exhaust's flame-damper slots */
    dark.push(box(0.40, 0.40, 0.03, 2.55, 0, Z(0.52)));
    for (i = 0; i < 5; i++) metal.push(box(0.36, 0.02, 0.02, 2.55, -0.16 + i * 0.08, Z(0.50)));
    for (i = 0; i < 4; i++) dark.push(box(0.04, 0.03, 0.03, 2.20 - i * 0.09, -0.52, Z(0.42)));
    /* the tail rotor gearbox's filler cap and the tail plane's hinge
       fittings */
    metal.push(cyl(0.03, 0.03, 0.04, 8, "z", TR.x + 0.04, 0, Z(TR.h + 0.18)));

    K.mesh(undG, und, T.metal, "undercarriage_struts");
    K.mesh(undG, tyres, T.rubber, "tyres");

    mesh(root, skin, T.skin, "airframe", tex ? K.projUV(L) : null);
    mesh(root, glass, T.glass, "glass");
    mesh(root, dark, T.dark, "fittings_dark");
    mesh(root, metal, T.metal, "fittings");
    mesh(root, team, T.team, "team");
    mesh(root, lampR, new V.MeshStandardMaterial({ color: 0xc8261e, roughness: 0.3, metalness: 0.1, emissive: 0x8a1410, emissiveIntensity: 0.6 }), "lamp_red");
    mesh(root, lampG, new V.MeshStandardMaterial({ color: 0x1fa64a, roughness: 0.3, metalness: 0.1, emissive: 0x0e6a2c, emissiveIntensity: 0.6 }), "lamp_green");

    var rt = K.mainRotor(root, { x: 0, z: Z(HUB_H), R: ROTOR_R, chord: CHORD, nb: 3, phase: 45, root: 0.75,
                        hubR: 0.20, cap: 0.20, disc: true, mats: T });
    /* detail pass: in the head's own frame, each blade's root bolts through
       the cuff, the droop-stop ring under the hub, the bright tip caps */
    var hx = [];
    for (i = 0; i < 3; i++) {
      var ba = (45 + 120 * i) * D2R;
      [cyl(0.025, 0.025, 0.16, 8, "z", 0.82, 0.05, 0), cyl(0.025, 0.025, 0.16, 8, "z", 0.92, -0.05, 0),
       box(0.16, CHORD * 0.9, 0.05, ROTOR_R - 0.08, 0, 0), box(0.10, 0.08, 0.06, 0.30, 0, -0.14)].forEach(function (q) { q.rotateZ(ba); hx.push(q); });
    }
    hx.push(cyl(0.27, 0.27, 0.035, 16, "z", 0, 0, -0.14, true));
    mesh(rt.children[0], hx, T.metal, "hub_detail");
    K.tailRotor(root, { x: TR.x, y: TR.y, z: Z(TR.h), R: TR.R, chord: TR.chord, nb: 2, phase: 0, mats: T });
    return g;
  }
  return { build: build };
})();

/* ======================================================================
   HeroS58 - the Sikorsky S-58 airframe, two rows (VARIANTS):
     h34g    Sikorsky H-34G, the Heeresflieger's piston S-58
     wessex5 Westland Wessex HU.5, twin Gnomes in the long turbine nose
   ====================================================================== */
var HeroS58 = (function () {
  "use strict";
  var PI = Math.PI, D2R = PI / 180;
  var GROUND = -2.00;
  /* x forward of the rotor axis; heights above the ground under the main
     wheels in the fuselage datum (H-34A three-view, 74.7 px/m) */
  var HUB_H = 4.10, ROTOR_R = 8.535, CHORD = 0.417;
  var TR = { x: -10.09, y: 0.55, h: 3.57, R: 1.42, chord: 0.19 };
  var MAIN_W = { x: 0.86, y: 1.83, h: 0.38, r: 0.38 };
  var TAIL_W = { x: -7.74, h: 0.31, r: 0.20 };
  var PITCH = 0.71;
  var WIN = { h0: 1.46, h1: 2.04, xs: [[-0.80, -1.43], [-1.71, -2.29]] };
  var DOOR = { x0: -0.55, x1: -2.05, h0: 0.75, h1: 2.40 };      /* starboard */

  var VARIANTS = {
    h34g:    { key: "h34g", base: "#4f5543", seed: 5834, turbine: false },
    wessex5: { key: "wessex5", base: "#545a3c", seed: 5805, turbine: true }
  };

  function fuselage(K, turbine) {
    var S = K.S;
    var nose = turbine ? [
      /* the Wessex's turbine nose (XT602 side photo, see the header) */
      S( 3.70, 1.08, 1.60, 0.30, 1.30, 0.28, 0.20, 0.20),
      S( 3.62, 0.86, 1.84, 0.55, 1.35, 0.50, 0.35, 0.35),
      S( 3.45, 0.75, 1.94, 0.70, 1.40, 0.62, 0.40, 0.40),
      S( 3.10, 0.69, 2.10, 0.80, 1.50, 0.70, 0.42, 0.45),
      S( 2.70, 0.68, 2.40, 0.85, 1.65, 0.75, 0.42, 0.50)
    ] : [
      S( 3.33, 1.47, 1.80, 0.12, 1.62, 0.12, 0.06, 0.06),
      S( 3.28, 1.14, 2.07, 0.42, 1.62, 0.40, 0.35, 0.35),
      S( 3.19, 1.00, 2.24, 0.58, 1.62, 0.55, 0.45, 0.45),
      S( 2.95, 0.84, 2.48, 0.75, 1.65, 0.70, 0.50, 0.55),
      S( 2.60, 0.72, 2.64, 0.84, 1.70, 0.76, 0.45, 0.55)
    ];
    return nose.concat([
      S( 2.21, 0.69, 2.76, 0.87, 1.80, 0.78, 0.40, 0.52),
      S( 1.80, 0.67, 3.17, 0.87, 2.10, 0.76, 0.38, 0.45),
      S( 1.38, 0.66, 3.59, 0.87, 2.40, 0.72, 0.36, 0.38),
      S( 1.00, 0.65, 3.64, 0.87, 2.45, 0.70, 0.36, 0.36),
      S( 0.00, 0.65, 3.64, 0.87, 2.55, 0.55, 0.36, 0.40),
      S(-1.00, 0.65, 3.53, 0.87, 2.62, 0.45, 0.36, 0.32),
      S(-2.00, 0.66, 3.23, 0.86, 2.64, 0.45, 0.36, 0.30),
      S(-2.84, 0.68, 2.89, 0.80, 2.62, 0.48, 0.36, 0.28),
      S(-3.50, 0.71, 2.72, 0.62, 2.40, 0.48, 0.34, 0.28),
      S(-4.40, 0.76, 2.58, 0.44, 2.20, 0.38, 0.30, 0.28),
      S(-5.50, 0.84, 2.42, 0.37, 2.00, 0.33, 0.28, 0.26),
      S(-6.50, 0.90, 2.28, 0.31, 1.85, 0.29, 0.26, 0.24),
      S(-7.20, 0.98, 2.17, 0.27, 1.75, 0.26, 0.24, 0.22),
      S(-8.00, 1.03, 2.11, 0.24, 1.70, 0.23, 0.22, 0.20),
      S(-8.60, 1.04, 2.44, 0.22, 1.80, 0.20, 0.20, 0.16),
      S(-9.20, 1.29, 2.89, 0.19, 2.10, 0.16, 0.18, 0.14),
      S(-9.60, 1.74, 3.19, 0.16, 2.45, 0.14, 0.15, 0.12),
      S(-9.95, 2.29, 3.39, 0.13, 2.80, 0.12, 0.12, 0.10),
      S(-10.12, 2.54, 3.44, 0.10, 3.00, 0.09, 0.09, 0.08)
    ]);
  }
  var L = { UX0: -10.4, UX1: 3.9, QY: 0.95, QH0: 0.50, QH1: 3.80 };

  function paint(K, VA) {
    return K.skinTexture({
      key: "s58_" + VA.key, L: L, base: VA.base, seed: VA.seed,
      frames: [2.21, 1.38, 0.40, -0.55, -1.55, -2.55, -3.55, -4.55, -5.55, -6.55, -7.55, -8.00],
      draw: function (g, H) {
        var b, i;
        g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.2;
        for (b = 1; b <= 2; b++) {
          /* the nose doors' aft edge, raked like the windscreen */
          g.beginPath(); g.moveTo(H.pxX(2.21), H.pySide(2.76, b)); g.lineTo(H.pxX(2.45), H.pySide(0.70, b)); g.stroke();
          /* the cabin-side stringer under the doghouse, the tail-cone joint */
          g.strokeStyle = "rgba(0,0,0,0.40)"; g.lineWidth = 1.6;
          g.beginPath(); g.moveTo(H.pxX(1.0), H.pySide(2.66, b)); g.lineTo(H.pxX(-2.84), H.pySide(2.66, b)); g.stroke();
          g.beginPath(); g.moveTo(H.pxX(-8.0), H.pySide(2.11, b)); g.lineTo(H.pxX(-8.0), H.pySide(1.03, b)); g.stroke();
          /* the cockpit door */
          g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.2;
          g.strokeRect(H.pxX(1.80), H.pySide(3.56, b), H.pxX(0.92) - H.pxX(1.80), H.pySide(2.10, b) - H.pySide(3.56, b));
          WIN.xs.forEach(function (w) {
            g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.6;
            g.strokeRect(H.pxX(w[0]) - 3, H.pySide(WIN.h1, b) - 3, H.pxX(w[1]) - H.pxX(w[0]) + 6, H.pySide(WIN.h0, b) - H.pySide(WIN.h1, b) + 6);
          });
          if (b === 2) {
            /* the starboard sliding cabin door and its rail */
            g.strokeStyle = "rgba(0,0,0,0.62)"; g.lineWidth = 2.6;
            g.strokeRect(H.pxX(DOOR.x0), H.pySide(DOOR.h1, b), H.pxX(DOOR.x1) - H.pxX(DOOR.x0), H.pySide(DOOR.h0, b) - H.pySide(DOOR.h1, b));
          }
          if (!VA.turbine) {
            /* engine-bay louvres low on the nose doors */
            g.fillStyle = "rgba(10,10,8,0.6)";
            for (i = 0; i < 5; i++) g.fillRect(H.pxX(2.95 - i * 0.08), H.pySide(1.30, b), 0.035 * H.SX, H.pySide(0.95, b) - H.pySide(1.30, b));
          } else {
            /* the Wessex nose's access panels and grilles (XT769) */
            g.strokeRect(H.pxX(3.25), H.pySide(1.75, b), H.pxX(2.75) - H.pxX(3.25), H.pySide(1.05, b) - H.pySide(1.75, b));
            g.fillStyle = "rgba(10,10,8,0.6)";
            for (i = 0; i < 3; i++) g.fillRect(H.pxX(2.62), H.pySide(2.05 - i * 0.05, b), 0.22 * H.SX, 0.02 * H.SZ);
          }
        }
        /* the clamshell doors' centre seam over the nose and under it */
        g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.2;
        if (!VA.turbine) {
          g.beginPath(); g.moveTo(H.pxX(2.3), H.pyTop(0)); g.lineTo(H.pxX(3.4), H.pyTop(0)); g.stroke();
          g.beginPath(); g.moveTo(H.pxX(2.3), H.pyBelly(0)); g.lineTo(H.pxX(3.4), H.pyBelly(0)); g.stroke();
        }
        /* the doghouse's cooling louvres behind the mast */
        g.fillStyle = "rgba(10,10,8,0.45)";
        for (i = 0; i < 9; i++) g.fillRect(H.pxX(-0.75 - i * 0.14), H.pyTop(0.40), 0.05 * H.SX, H.pyTop(-0.40) - H.pyTop(0.40));
      }
    });
  }

  function build(THREE, M, C, VA) {
    VA = VA || VARIANTS.h34g;
    var V = THREE, K = EarlyHeloKit.make(V, GROUND), Z = K.Z;
    var box = K.box, cyl = K.cyl, bar = K.bar, mesh = K.mesh;
    var g = new V.Group();
    g.name = VA.turbine ? "wessex" : "h34";
    var T = K.mats(C, 0x2a2c2a), tex = paint(K, VA);
    if (tex) T.skin.map = tex; else T.skin.color.set(VA.base);
    var root = K.stance(g, MAIN_W.x, PITCH);
    var FUS = fuselage(K, VA.turbine);
    var skin = [], glass = [], metal = [], dark = [], team = [], skinT = [];
    var und = [], tyres = [], i, s;
    function SY(x, h) { return K.sideY(FUS, x, h); }
    function TOP(x, y) { return K.topH(FUS, x, y); }

    K.loftTris(K.densify(FUS, function (x) { return x > 2.1 ? 0.10 : x > -3 ? 0.16 : x > -8 ? 0.45 : 0.25; }),
      function (t) { skinT.push(t); }, true, true);
    skin.push(K.soup(skinT));

    /* ---- glazing: the three-pane windscreen on the raked front, the
       cockpit door windows and the quarter windows behind them, two square
       cabin windows a side */
    glass.push(K.panelTop(FUS, 2.16, 1.42, -0.74, 0.74, 0.012, 4, 6));
    for (s = -1; s <= 1; s += 2) {
      glass.push(K.panelSide(FUS, 1.76, 0.98, 2.80, 3.48, s));
      glass.push(K.panelSide(FUS, 0.88, 0.62, 2.85, 3.42, s, 0.012, 2, 3));
      WIN.xs.forEach(function (w) { glass.push(K.panelSide(FUS, w[0], w[1], WIN.h0, WIN.h1, s, 0.008, 2, 2)); });
    }
    var fr = 0.028;
    [-0.25, 0.25].forEach(function (yy) {
      skin.push(bar([2.17, yy, Z(TOP(2.17, yy) + 0.02)], [1.40, yy, Z(TOP(1.40, yy) + 0.02)], fr, 6, true));
    });
    for (s = -1; s <= 1; s += 2) {
      skin.push(bar([2.17, s * 0.76, Z(TOP(2.17, 0.76) + 0.01)], [1.40, s * 0.72, Z(TOP(1.40, 0.72) + 0.01)], fr, 6, true));
      skin.push(bar([1.80, s * (SY(1.8, 2.78) + 0.01), Z(2.78)], [0.58, s * (SY(0.6, 2.78) + 0.01), Z(2.78)], fr, 6, true));
      skin.push(bar([0.93, s * (SY(0.93, 3.1) + 0.012), Z(2.80)], [0.93, s * (SY(0.93, 3.1) + 0.012), Z(3.46)], fr, 6, true));
      /* the gutter / step strip along the cockpit sill (XT769) */
      metal.push(box(1.70, 0.06, 0.06, 1.30, s * (SY(1.3, 2.62) + 0.03), Z(2.62)));
    }

    /* ---- the nose */
    if (!VA.turbine) {
      /* the cooling-air grilles across the top of the nose doors (H-34G
         81+09 head-on; the three-view's band of small "windows") */
      dark.push(K.panelTop(FUS, 2.92, 2.32, -0.72, 0.72, 0.014, 3, 6));
      for (i = -3; i <= 3; i++) skin.push(bar([2.94, i * 0.21, Z(TOP(2.94, i * 0.21) + 0.02)], [2.30, i * 0.21, Z(TOP(2.30, i * 0.21) + 0.02)], 0.02, 4, true));
      /* the exhaust: one big stub out of the starboard nose door */
      var ex = [2.30, -(SY(2.30, 1.50) - 0.02), Z(1.50)];
      dark.push(bar(ex, [2.05, ex[1] - 0.32, Z(1.35)], 0.16, 14, true));
      dark.push(cyl(0.21, 0.21, 0.04, 16, "y", 2.28, ex[1] + 0.01, ex[2]));
      dark.push(box(0.03, 0.012, 1.0, 3.30, 0, Z(1.55)));
    } else {
      /* the Wessex: the engine air intake facing forward on top of the
         nose, and an exhaust each side for the two Gnomes */
      dark.push(K.convex([
        [[3.63, 0.36, Z(1.70)], [3.63, -0.36, Z(1.70)], [3.63, -0.36, Z(1.92)], [3.63, 0.36, Z(1.92)]],
        [[3.55, 0.34, Z(1.72)], [3.55, -0.34, Z(1.72)], [3.55, -0.34, Z(1.90)], [3.55, 0.34, Z(1.90)]]]));
      skin.push(K.convex([
        [[3.62, 0.40, Z(1.66)], [3.62, -0.40, Z(1.66)], [3.62, -0.40, Z(1.96)], [3.62, 0.40, Z(1.96)]],
        [[2.95, 0.48, Z(2.02)], [2.95, -0.48, Z(2.02)], [2.95, -0.48, Z(2.24)], [2.95, 0.48, Z(2.24)]]]));
      for (s = -1; s <= 1; s += 2) {
        var e0 = [1.95, s * (SY(1.95, 1.70) - 0.02), Z(1.70)];
        var e1 = [1.62, s * (SY(1.95, 1.70) + 0.36), Z(1.62)];
        dark.push(bar(e0, e1, 0.17, 16, true));
        metal.push(cyl(0.22, 0.22, 0.04, 18, "y", 1.95, e0[1] + s * 0.02, e0[2]));
      }
      glass.push(K.sph(0.07, 10, 6, 3.66, 0, Z(1.25)));
    }

    /* ---- mast and doghouse top, aerial */
    metal.push(cyl(0.14, 0.16, 0.42, 12, "z", 0, 0, Z(3.82)));
    metal.push(bar([-4.0, 0, Z(2.57)], [-4.5, 0, Z(2.95)], 0.012, 4, true));

    /* ---- the tail: tail rotor gearbox on the pylon top, the stabilizer at
       the pylon's foot, the tail rotor shaft fairing to port */
    skin.push(K.plank([[-9.62, Z(3.19)], [-9.95, Z(3.42)], [-10.05, Z(3.68)], [-10.25, Z(3.70)], [-10.20, Z(3.30)], [-10.10, Z(2.60)]], 0.20));
    skin.push(cyl(0.16, 0.16, 0.36, 12, "y", TR.x, TR.y / 2 - 0.02, Z(TR.h)));
    skin.push(K.sph(0.17, 12, 8, TR.x - 0.30, 0, Z(TR.h + 0.05), 1.8, 1.0, 1.0));
    skin.push(K.slab(
      [[-8.55, -0.845, Z(2.32)], [-9.26, -0.845, Z(2.32)], [-9.26, 0.845, Z(2.32)], [-8.55, 0.845, Z(2.32)]],
      [[-8.60, -0.845, Z(2.37)], [-9.22, -0.845, Z(2.37)], [-9.22, 0.845, Z(2.37)], [-8.60, 0.845, Z(2.37)]]));
    /* team colour: a band round the tail cone and a patch on the doghouse */
    var band = [];
    K.loftTris([K.secAt(FUS, -6.0), K.secAt(FUS, -6.35)].map(function (q) {
      return K.S(q.x, q.zb - 0.015, q.zt + 0.015, q.w + 0.015, q.zs, q.wt + 0.015, q.rb, q.rt);
    }), function (t) { band.push(t); }, false, false);
    team.push(K.soup(band));
    team.push(K.panelTop(FUS, -2.10, -2.70, -0.30, 0.30, 0.02, 2, 2));

    /* ---- the undercarriage (fixed): main wheels on long oleos from the
       cockpit sill with drag and side struts to the belly, a tail wheel */
    var undG = new V.Group();
    undG.name = "undercarriage";
    root.add(undG);
    for (s = -1; s <= 1; s += 2) {
      var mw = [MAIN_W.x, s * MAIN_W.y, Z(MAIN_W.h)];
      tyres.push(cyl(MAIN_W.r, MAIN_W.r, 0.22, 24, "y", mw[0], mw[1], mw[2]));
      und.push(cyl(0.16, 0.16, 0.24, 12, "y", mw[0], mw[1], mw[2]));
      var hub = [mw[0], s * (MAIN_W.y - 0.15), mw[2]];
      var top = [0.75, s * (SY(0.75, 2.29) + 0.04), Z(2.29)];
      var mid = [hub[0] + (top[0] - hub[0]) * 0.45, hub[1] + (top[1] - hub[1]) * 0.45, hub[2] + (top[2] - hub[2]) * 0.45];
      und.push(bar(hub, mid, 0.075, 10, true), bar(mid, top, 0.055, 10, true));
      und.push(bar(hub, [1.41, s * 0.66, Z(0.80)], 0.045, 8, true));
      und.push(bar(hub, [0.80, s * 0.70, Z(0.74)], 0.045, 8, true));
    }
    var tw = [TAIL_W.x, 0, Z(TAIL_W.h)];
    tyres.push(cyl(TAIL_W.r, TAIL_W.r, 0.12, 18, "y", tw[0], 0, tw[2]));
    for (s = -1; s <= 1; s += 2) und.push(bar([tw[0], s * 0.09, tw[2]], [-7.45, s * 0.09, Z(0.70)], 0.03, 6, true));
    und.push(bar([-7.45, 0, Z(0.70)], [-7.25, 0, Z(1.00)], 0.06, 8, true));
    und.push(bar([-7.45, 0, Z(0.70)], [-7.85, 0, Z(1.03)], 0.035, 6, true));
    K.mesh(undG, und, T.metal, "undercarriage_struts");
    K.mesh(undG, tyres, T.rubber, "tyres");

    mesh(root, skin, T.skin, "airframe", tex ? K.projUV(L) : null);
    mesh(root, glass, T.glass, "glass");
    mesh(root, dark, T.dark, "fittings_dark");
    mesh(root, metal, T.metal, "fittings");
    mesh(root, team, T.team, "team");

    K.mainRotor(root, { x: 0, z: Z(HUB_H), R: ROTOR_R, chord: CHORD, nb: 4, phase: 45, root: 0.95,
                        hubR: 0.28, cap: 0.20, disc: true, mats: T });
    K.tailRotor(root, { x: TR.x, y: TR.y, z: Z(TR.h), R: TR.R, chord: TR.chord, nb: 4, phase: 0, mats: T });
    return g;
  }
  return {
    VARIANTS: VARIANTS,
    build: build,
    h34g: function (THREE, M, C) { return build(THREE, M, C, VARIANTS.h34g); },
    wessex5: function (THREE, M, C) { return build(THREE, M, C, VARIANTS.wessex5); }
  };
})();

/* ======================================================================
   HeroH21 - Vertol (Piasecki) H-21C, "la Banane"
   ====================================================================== */
var HeroH21 = (function () {
  "use strict";
  var PI = Math.PI, D2R = PI / 180;
  var GROUND = -2.00;
  /* x aft of the FORWARD hub is negative; heights in the fuselage frame:
     the forward section's belly at 0.51, so the main wheels' contact is 0
     before the stance pitch (pic1 levelled, 82.2 px/m on the 16.0 m) */
  var HUB_F = { x: 0.00, h: 3.25 }, HUB_A = { x: -12.90, h: 5.27 };
  var ROTOR_R = 6.706, CHORD = 0.42;
  var MAIN_W = { x: -9.06, y: 1.80, h: 0.29, r: 0.29 };
  var NOSE_W = { x: -0.30, h: -1.15, r: 0.25 };
  var PITCH = 9.1;
  var PORTS = [-1.44, -2.49, -3.55, -4.61, -5.64], PORT_H = 1.78, PORT_R = 0.26;
  var DOOR = { x0: -6.45, x1: -7.45, h0: 0.62, h1: 2.55, w0: -6.62, w1: -7.15, wh0: 1.04, wh1: 1.89 };
  var FIN = { x0: -13.20, x1: -14.57, h0: 2.72, h1: 4.80, y: 1.25, stubH: 3.73 };

  function fuselage(K) {
    var S = K.S;
    function F(x, zb, zt, w) {
      var d = zt - zb;
      return S(x, zb, zt, w, zb + d * 0.62, w * 0.80, Math.min(0.55, d * 0.30), Math.min(0.62, d * 0.32));
    }
    return [
      S( 1.56, 0.91, 1.19, 0.15, 1.05, 0.14, 0.10, 0.10),
      S( 1.50, 0.69, 1.56, 0.45, 1.12, 0.40, 0.30, 0.30),
      S( 1.40, 0.61, 1.76, 0.62, 1.20, 0.55, 0.40, 0.45),
      S( 1.20, 0.55, 2.13, 0.78, 1.35, 0.68, 0.48, 0.55),
      S( 0.90, 0.52, 2.41, 0.88, 1.55, 0.74, 0.52, 0.60),
      S( 0.62, 0.51, 2.54, 0.92, 1.70, 0.76, 0.55, 0.60),
      S( 0.47, 0.51, 2.58, 0.93, 1.75, 0.76, 0.55, 0.60),
      S( 0.05, 0.51, 2.68, 0.95, 1.85, 0.77, 0.55, 0.62),
      F(-0.30, 0.51, 2.74, 0.95),
      F(-7.69, 0.51, 2.74, 0.95),
      F(-8.30, 0.51, 2.97, 0.95),
      F(-9.20, 0.81, 3.58, 0.92),
      F(-10.26, 1.41, 3.95, 0.86),
      F(-11.31, 1.78, 4.32, 0.78),
      F(-12.37, 2.20, 4.71, 0.68),
      F(-12.69, 2.31, 4.95, 0.64),
      F(-13.64, 2.61, 5.00, 0.52),
      F(-14.20, 2.75, 4.55, 0.40),
      S(-14.44, 2.96, 3.81, 0.22, 3.30, 0.18, 0.12, 0.12)
    ];
  }
  var L = { UX0: -14.6, UX1: 1.7, QY: 1.0, QH0: 0.40, QH1: 5.10 };

  function paint(K) {
    return K.skinTexture({
      key: "h21c", L: L, base: "#4f5543", seed: 2156,
      frames: [0.62, -0.62, -1.95, -3.0, -4.08, -5.12, -6.2, -7.69, -8.30, -9.4, -10.6, -11.8, -12.69],
      draw: function (g, H) {
        var b;
        for (b = 1; b <= 2; b++) {
          g.strokeStyle = "rgba(0,0,0,0.6)"; g.lineWidth = 2.4;
          PORTS.forEach(function (x) {
            g.beginPath(); g.ellipse(H.pxX(x), H.pySide(PORT_H, b), (PORT_R + 0.05) * H.SX, (PORT_R + 0.05) * H.SZ, 0, 0, 2 * PI); g.stroke();
          });
          if (b === 1) {
            g.strokeRect(H.pxX(DOOR.x0), H.pySide(DOOR.h1, b), H.pxX(DOOR.x1) - H.pxX(DOOR.x0), H.pySide(DOOR.h0, b) - H.pySide(DOOR.h1, b));
          }
          /* the joint where the aft section bends up */
          g.strokeStyle = "rgba(0,0,0,0.45)"; g.lineWidth = 1.8;
          g.beginPath(); g.moveTo(H.pxX(-7.95), H.pySide(2.80, b)); g.lineTo(H.pxX(-8.35), H.pySide(0.55, b)); g.stroke();
          /* exhaust soot under the aft section, where the R-1820 sits */
          var sg = g.createLinearGradient(H.pxX(-9.0), 0, H.pxX(-12.0), 0);
          sg.addColorStop(0, "rgba(20,18,15,0.40)"); sg.addColorStop(1, "rgba(20,18,15,0)");
          g.fillStyle = sg; g.fillRect(H.pxX(-12.0), H.pySide(2.2, b), H.pxX(-9.0) - H.pxX(-12.0), H.pySide(0.8, b) - H.pySide(2.2, b));
        }
      }
    });
  }

  function build(THREE, M, C) {
    var V = THREE, K = EarlyHeloKit.make(V, GROUND), Z = K.Z;
    var box = K.box, cyl = K.cyl, bar = K.bar, mesh = K.mesh;
    var g = new V.Group();
    g.name = "h21";
    var T = K.mats(C, 0x2b2d2a), tex = paint(K);
    if (tex) T.skin.map = tex; else T.skin.color.set("#4f5543");
    var root = K.stance(g, MAIN_W.x, PITCH);
    var FUS = fuselage(K);
    var skin = [], glass = [], metal = [], dark = [], team = [], skinT = [], glassT = [];
    var und = [], tyres = [], i, s, k;
    function SY(x, h) { return K.sideY(FUS, x, h); }
    function TOP(x, y) { return K.topH(FUS, x, y); }

    /* ---- the fuselage; the nose bubble ahead of the cockpit's mid frame
       is glass above the belly (pic1, Heer 8308) */
    K.loftTris(K.densify(FUS, function (x) { return x > 0.4 ? 0.08 : x > -7.5 ? 0.6 : x > -12.5 ? 0.35 : 0.2; }),
      function (t, c) { ((c[0] > 0.62 && c[2] - GROUND > 0.66) ? glassT : skinT).push(t); }, true, true);
    skin.push(K.soup(skinT));
    glass.push(K.soup(glassT));
    /* the cockpit's side windows behind the bubble, two panes a side */
    for (s = -1; s <= 1; s += 2) {
      glass.push(K.panelSide(FUS, 0.56, 0.02, 1.25, 2.45, s));
      glass.push(K.panelSide(FUS, -0.04, -0.58, 1.25, 2.45, s));
      /* bubble frames: the arch at the bubble's root, the one across its
         middle, the sill */
      var arch = [], arch2 = [];
      for (k = 0; k <= 8; k++) {
        var hh = 0.70 + (2.52 - 0.70) * k / 8;
        arch.push([0.62, s * (SY(0.62, hh) + 0.012), Z(hh)]);
      }
      for (k = 0; k <= 8; k++) {
        var h2 = 0.62 + (2.10 - 0.62) * k / 8;
        arch2.push([1.20, s * (SY(1.20, h2) + 0.012), Z(h2)]);
      }
      for (k = 0; k < 8; k++) { skin.push(bar(arch[k], arch[k + 1], 0.025, 5, true)); skin.push(bar(arch2[k], arch2[k + 1], 0.022, 5, true)); }
      skin.push(bar([0.62, s * (SY(0.62, 1.25) + 0.012), Z(1.25)], [-0.60, s * (SY(-0.6, 1.25) + 0.012), Z(1.25)], 0.025, 5, true));
      skin.push(bar([1.45, s * (SY(1.45, 1.25) + 0.012), Z(1.25)], [0.62, s * (SY(0.62, 1.25) + 0.012), Z(1.25)], 0.022, 5, true));
      skin.push(bar([0.00, s * (SY(0.0, 1.25) + 0.012), Z(1.25)], [0.00, s * (SY(0.0, 2.45) + 0.012), Z(2.45)], 0.025, 5, true));
      /* portholes, round */
      PORTS.forEach(function (x) {
        var w = new V.CircleGeometry(PORT_R, 18);
        w.rotateX(-s * PI / 2);
        w.translate(x, s * (SY(x, PORT_H) + 0.012), Z(PORT_H));
        glass.push(w);
      });
    }
    skin.push(bar([1.52, 0, Z(1.40)], [0.62, 0, Z(TOP(0.62, 0) + 0.012)], 0.022, 5, true));
    /* the port door's window */
    glass.push(K.panelSide(FUS, DOOR.w0, DOOR.w1, DOOR.wh0, DOOR.wh1, 1, 0.01, 2, 2));
    metal.push(box(0.10, 0.04, 0.04, -6.55, SY(-6.55, 1.5) + 0.02, Z(1.50)));

    /* ---- the forward rotor pylon: a cone over the cockpit; the aft one is
       the end of the fuselage itself */
    skin.push(K.cyl(0.42, 0.78, 0.48, 20, "z", -0.10, 0, Z(2.86)));
    metal.push(cyl(0.14, 0.16, 0.30, 12, "z", HUB_F.x, 0, Z(3.08)));
    metal.push(cyl(0.14, 0.16, 0.30, 12, "z", HUB_A.x, 0, Z(5.08)));
    /* the engine-air louvres on the back where the aft section starts */
    dark.push(K.panelTop(FUS, -8.03, -9.31, -0.42, 0.42, 0.015, 4, 3));
    for (k = 0; k < 6; k++) {
      var lx = -8.15 - k * 0.20;
      skin.push(bar([lx, -0.42, Z(TOP(lx, 0.42) + 0.03)], [lx, 0.42, Z(TOP(lx, 0.42) + 0.03)], 0.018, 4, true));
    }

    /* ---- the end-plate fins on their stubs either side of the aft pylon */
    for (s = -1; s <= 1; s += 2) {
      skin.push(K.plank([[FIN.x0, Z(FIN.h0 + 0.15)], [FIN.x0 - 0.10, Z(FIN.h1)], [FIN.x1, Z(FIN.h1)], [FIN.x1, Z(FIN.h0)], [FIN.x0 - 0.15, Z(FIN.h0)]], 0.10, s * FIN.y));
      skin.push(K.convex([
        [[-13.35, s * 0.40, Z(FIN.stubH - 0.08)], [-13.95, s * 0.40, Z(FIN.stubH - 0.08)], [-13.95, s * 0.40, Z(FIN.stubH + 0.08)], [-13.35, s * 0.40, Z(FIN.stubH + 0.08)]],
        [[-13.40, s * FIN.y, Z(FIN.stubH - 0.06)], [-13.90, s * FIN.y, Z(FIN.stubH - 0.06)], [-13.90, s * FIN.y, Z(FIN.stubH + 0.06)], [-13.40, s * FIN.y, Z(FIN.stubH + 0.06)]]]));
    }
    /* team colour: a band round the aft section and a patch on the roof */
    var band = [];
    K.loftTris([K.secAt(FUS, -10.9), K.secAt(FUS, -11.25)].map(function (q) {
      return K.S(q.x, q.zb - 0.015, q.zt + 0.015, q.w + 0.015, q.zs, q.wt + 0.015, q.rb, q.rt);
    }), function (t) { band.push(t); }, false, false);
    team.push(K.soup(band));
    team.push(K.panelTop(FUS, -3.6, -4.6, -0.35, 0.35, 0.02, 2, 2));

    /* ---- the undercarriage (fixed): one castoring nose wheel on a long
       leg under the cockpit, two main wheels on outrigger legs where the
       fuselage bends, braced forward to the belly */
    var undG = new V.Group();
    undG.name = "undercarriage";
    root.add(undG);
    var nw = [NOSE_W.x, 0, Z(NOSE_W.h)];
    tyres.push(cyl(NOSE_W.r, NOSE_W.r, 0.16, 20, "y", nw[0], 0, nw[2]));
    und.push(cyl(0.10, 0.10, 0.18, 10, "y", nw[0], 0, nw[2]));
    for (s = -1; s <= 1; s += 2) und.push(bar([nw[0], s * 0.11, nw[2]], [nw[0] + 0.12, s * 0.11, Z(NOSE_W.h + 0.42)], 0.03, 6, true));
    und.push(bar([nw[0] + 0.12, 0, Z(NOSE_W.h + 0.40)], [nw[0] + 0.10, 0, Z(0.52)], 0.06, 10, true));
    und.push(bar([nw[0] + 0.11, 0, Z(-0.30)], [-0.95, 0, Z(0.52)], 0.035, 6, true));
    for (s = -1; s <= 1; s += 2) {
      var mw = [MAIN_W.x, s * MAIN_W.y, Z(MAIN_W.h)];
      tyres.push(cyl(MAIN_W.r, MAIN_W.r, 0.20, 22, "y", mw[0], mw[1], mw[2]));
      und.push(cyl(0.12, 0.12, 0.22, 10, "y", mw[0], mw[1], mw[2]));
      var hub = [mw[0], s * (MAIN_W.y - 0.14), mw[2]];
      und.push(bar(hub, [-8.66, s * (SY(-8.66, 2.04) + 0.03), Z(2.04)], 0.07, 10, true));      /* oleo */
      und.push(bar(hub, [-6.90, s * 0.55, Z(0.56)], 0.04, 8, true));                             /* radius rod */
      und.push(bar(hub, [-9.00, s * 0.55, Z(0.80)], 0.04, 8, true));                             /* side strut */
    }
    K.mesh(undG, und, T.metal, "undercarriage_struts");
    K.mesh(undG, tyres, T.rubber, "tyres");

    mesh(root, skin, T.skin, "airframe", tex ? K.projUV(L) : null);
    mesh(root, glass, T.glass, "glass");
    mesh(root, dark, T.dark, "fittings_dark");
    mesh(root, metal, T.metal, "fittings");
    mesh(root, team, T.team, "team");

    /* ---- the two heads, the forward one added first (rotorShafts turns
       it anti-clockwise from above and the aft one the other way); blades
       at the meshing phase, as ch47_chinook_family.js does: the forward
       head with a blade straight aft, the aft head with one straight
       forward. No blur disc: two would make the X extent the
       rotors-turning length. */
    K.mainRotor(root, { x: HUB_F.x, z: Z(HUB_F.h), R: ROTOR_R, chord: CHORD, nb: 3, phase: 180, root: 0.75,
                        hubR: 0.22, cap: 0.18, disc: false, mats: T, name: "fwd" });
    K.mainRotor(root, { x: HUB_A.x, z: Z(HUB_A.h), R: ROTOR_R, chord: CHORD, nb: 3, phase: 0, root: 0.75,
                        hubR: 0.22, cap: 0.18, disc: false, mats: T, name: "aft" });
    return g;
  }
  return { build: build };
})();

UNIT_MODELS["gbr_e50_transport"] = { len: 18.955, build: HeroWhirlwind.build };
UNIT_MODELS["deu_e50_transport"] = { len: 20.037, build: HeroS58.h34g };
UNIT_MODELS["gbr_e60_transport"] = { len: 20.037, build: HeroS58.wessex5 };
UNIT_MODELS["fra_e50_transport"] = { len: 19.876, build: HeroH21.build };
