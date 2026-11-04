/* ============ kpa_air2.js -- KPA AIRCRAFT, SECOND FILE (HERO MODELS) ============
   Six airframes for Korean People's Army rows (names as js/eras.js gives them):

     kpa_e50_fighter    "Yak-9P", Yakovlev Yak-9P              HeroKpaAir2.yak9p
     kpa_e50_transport  "Po-2", Polikarpov Po-2 / Yak-18       HeroKpaAir2.po2 (the Po-2 is drawn)
     kpa_e60_fighter    "MiG-21PFM", MiG-21PFM / F-13          HeroKpaAir2.mig21pfm
     kpa_e60_cas        "Su-7BMK", Sukhoi Su-7BMK Fitter-A     HeroKpaAir2.su7bmk
     kpa_e80_fighter    "MiG-23ML", MiG-23ML / MiG-23P         HeroKpaAir2.mig23ml (wings at 16 deg)
     kpa_e90_transport  "Il-76TD", Ilyushin Il-76TD            HeroKpaAir2.il76td (calls HeroIl76)

   All drawn PLAIN: no KPAF roundel, no bort or registration number, no Air
   Koryo titles or cheatline, no camouflage pattern. Team colour (C.team) as
   small strips only. LOAD ORDER: after js/hero/ru_a50.js (HeroIl76; it is
   called when the Il-76TD is built). Nothing else is borrowed.

   Every drawing is from Wikimedia Commons, rendered 1400-1800 px; every
   table below keeps the drawing's PIXELS and converts them with the scale
   written beside it, so each figure can be re-read off the drawing.

   ======================================================================
   1. YAKOVLEV Yak-9P (kpa_e50_fighter)

   REFERENCES
     A  "Yakovlev Yak-9P 3-view line drawing.svg" (1600 px): side (thrust
        line level, the ground line tilted under the wheel circles), plan,
        head-on. Plan span 1320 px, length spinner to rudder 1098 px; the
        head-on propeller disc 375 px.
     B  "PL MWP Yak-9P.JPG" (Polish Army Museum Yak-9P, 3/4 from port):
        the main legs with their half doors outboard, the tailwheel, the
        three-blade propeller, the exhaust stubs, the radiator bath.
     K  "Damaged North Korean Yak-9 at Kimpo.jpg" (AWM P00675.015, a KPAF
        Yak-9P at Kimpo, September 1950, black and white): the KPAF machine
        is LIGHT overall (a pale finish top and sides).
   PUBLISHED (en.wikipedia "Yakovlev Yak-9", spec block, Yak-9U; the Yak-9P
   is a Yak-9U with the all-metal wing, same article): length 8.55 m, span
   9.74 m, height 3.00 m, propeller 3.00 m, three blades.
   SCALE, A SETTLED CONFLICT (rule 2): on A, length / span = 0.832 against
   the published 0.878; length / propeller = 2.95 against 2.85. Two of the
   three published figures (length, propeller) agree with A within 3 %, the
   span alone does not, so A is scaled by the published LENGTH: 8.55 m /
   1098 px = 0.0077869 m/px. On that scale the span is 10.28 m (published
   9.74, +5.5 %) and the propeller 2.92 m (3.00). No photograph from above
   was found to settle the span further: NOT CONFIRMED.
   MEASURED: X extent 8.59 m (cannon muzzle to the rudder trim tab; spinner
   to rudder 8.55), span 10.27 m, height 3.23 m level (published 3.00 m is
   the three-point attitude; see ATTITUDE). Track 2.86 m, main wheels 0.60 m,
   tailwheel 0.30 m (A head-on and side), dihedral 6.0 deg on the chord
   plane (A head-on), fuselage 0.84 m wide, 1.21 m deep (A).
   RECOGNITION: the long cowl with six exhaust stubs a side and the
   supercharger bump; the low canopy and cut-down rear decking; the radiator
   bath under the rear fuselage; elliptical-tipped wing (the P's metal wing);
   the rounded fin and big horn-less rudder; the aerial mast and wire; the
   pitot under the port wing (A plan); three-blade propeller.
   ATTITUDE (rule 4, after js/hero/ru_il10.js): A's ground line runs 11.6 deg
   nose-up from the main wheels to the tailwheel. The model sits LEVEL, the
   main wheels where A puts them, the tailwheel leg LENGTHENED (its hub
   1.11 m below A's level-frame hub) so the tailwheel reaches the same ground.
   The gear retracts, so mains and tailwheel are the group "gear".
   NOT CONFIRMED: the span (above); the KPAF colour (K is black and white:
   a light grey is used); the radiator bath's width (hidden in A's plan,
   0.48 m used); the blade planform (0.24 m chord).

   ======================================================================
   2. POLIKARPOV Po-2 (kpa_e50_transport)

   The row names "Po-2 / Yak-18"; the Po-2 is drawn (the brief, the row's
   desc: the night harassment biplane).
   REFERENCES
     B  "Polikarpov Po-2.svg" (Commons title in Russian, 1400 px): side
        (level, ground lines tilted), plan of both wings, head-on.
        Upper span 1276 px.
     P  "Polikarpov Po-2, MAKS-2011.jpg" (a flying Po-2 at MAKS 2011, port
        side from ahead): the N interplane struts (two legs and the diagonal
        from the front leg's head to the rear leg's foot), the crossed wires,
        the bare five-cylinder radial, the open cockpits, the split-axle gear,
        the round rudder; green over light blue (Soviet wartime finish).
   PUBLISHED (en.wikipedia "Polikarpov Po-2"): length 8.17 m, span 11.4 m,
   height 3.1 m, wing area 33.2 m2.
   SCALE: 11.4 m / 1276 px = 0.008934 m/px; on it the length is 8.19 m
   (published 8.17), so the drawing and the figures agree.
   MEASURED: X extent 8.22 m (propeller to rudder), span 11.39 m, lower span
   10.63 m, height 3.44 m level (published 3.1 m is three-point). Chords
   1.64 / 1.66 m, stagger 0.80 m, gap 1.75 m; dihedral 1.5 deg upper, 1.8 deg
   lower (B head-on); propeller 2.43 m; wheels 0.66 m, track 1.86 m;
   tailplane span 4.75 m.
   RECOGNITION: equal-chord staggered biplane, upper wing on a cabane,
   N interplane struts and crossed wires; the bare five-cylinder M-11 radial
   with its exhaust ring; two open cockpits with small windscreens; the big
   round rudder; braced tailplane; split-axle main gear; tail skid.
   ATTITUDE: B's ground line runs 13 deg nose-up to the skid. Level, the
   wheels as drawn, the skid leg LENGTHENED to the ground (its foot 1.17 m
   below B's level-frame skid). The gear is fixed: no "gear" group.
   NOT CONFIRMED: the KPAF paint (no KPAF photograph; P's upper green is
   used overall, the light-blue underside left off as P is a restoration);
   the flying-wire runs (B head-on and P); the cabane layout (B side, P).

   ======================================================================
   3. MiG-21PFM (kpa_e60_fighter)

   WHY NOT HeroMiG21 (js/hero/pact_e60_fighter.js). That module exports only
   build() and plain() for the MiG-21bis; its station tables are private and
   it merges the whole airframe into one mesh per material, so its wing,
   tail and gear cannot be taken without its bis spine, bis canopy and bis
   fin. Honest reuse would need that file edited, so the PFM is built here.
   REFERENCES
     C  "Mikoyan-Gurevich MiG-21PF 3-view.svg" (1800 px): side, plan,
        head-on of the PF airframe the PFM keeps (the slim spine, the nose,
        wing, tail, intake). Span 664 px.
     P1 "Mig 21 PFM.JPG" (Polish PFM 4105 on the Intrepid, front 3/4): the
        PFM canopy -- a framed fixed windscreen and the hood behind it -- the
        slim spine, the broad fin with a fairing at its rear root, natural
        metal.
     P2 "Mikoyan MiG-21PFM Fishbed-F '6604' (11091832506).jpg" (front 3/4):
        natural metal, the green-grey dielectric cone.
   PUBLISHED: span 7.154 m (en.wikipedia "Mikoyan-Gurevich MiG-21"; the
   wing is common to the family). No PFM length or height was found (the
   ru.wikipedia table gives 14.10 m, 4.71 m without naming the variant).
   SCALE: 7.154 m / 664 px = 0.010774 m/px.
   MEASURED: X extent 14.70 m (pitot tip to fin tip; cone tip to nozzle
   12.95 m), span 7.15 m, height 3.84 m (C's stance; the bis drawing in
   pact_e60_fighter.js gives 3.92 m, the bis is published at 4.1 m: C is
   followed, nothing is stretched). Intake lip 0.86 m outside (C head-on);
   wing LE 57.0 deg, stabilator LE 58.7 deg (C plan).
   RECOGNITION: 57 deg tailed delta, two fences a wing; round nose intake
   with the shock cone; the PF/PFM SLIM spine (top 0.30 m wide, py 158),
   NOT the bis saddle tank; the broad fin with its dorsal fillet; the PFM
   framed windscreen and hood with the periscope; pitot boom on the nose
   top centre (C); ventral fin; two pylons with R-3S.
   NOT CONFIRMED: the hood profile (C is the PF's one-piece canopy outline;
   the PFM frame line at px 372 is placed from P1); the chute fairing's size;
   the main-wheel track (C does not draw it: 2.79 m, the bis drawing's, is
   used); the boom position on the PFM (C's top-centre boom; P1 and P2 have
   it removed); the KPAF finish (natural metal from P1, P2).

   ======================================================================
   4. SUKHOI Su-7BMK (kpa_e60_cas)  -- not js/hero/ru_su17.js (swing wing)

   REFERENCES
     D  "Szuhoj Szu-7.svg" (1800 px): side, plan, head-on of a Su-7B with
        conventional wheels, two fences a wing, the twin ventral tanks.
        Span 680 px.
     P  "B888 Sukhoi Su-7BMK Indian Air Force (8448370218).jpg" (an Indian
        Su-7BMK, starboard side, nearly side-on): natural metal, dark cone,
        the dorsal spine into the fin. Checked against D: cone-to-tail /
        ground-to-fin-top 3.02 on P, 3.10 on D (perspective).
   PUBLISHED: span 9.31 m, length 16.607 m (ru.wikipedia "Su-7"), 16.8 m
   and height 4.99 m (en.wikipedia "Sukhoi Su-7", Su-7BKL); ru.wikipedia:
   the KPAF received 25 Su-7BMK and Su-7UMK in the late 1960s.
   SCALE: 9.31 m / 680 px = 0.013691 m/px.
   MEASURED: X extent 18.24 m (pitot tip, px 40, to the fin tip, px 1372,
   which overhangs the jetpipe as on D's side view; pitot to tail 17.02 m
   against the published 16.8, cone to tail 15.31 m), span
   9.30 m, height 4.94 m (published 4.99). Wing LE 62.5 deg, swept TE;
   stabilator LE 61 deg; anhedral about 1.5 deg (D head-on). The
   stabilator anti-flutter bodies point FORWARD from the tips (D plan:
   px 1240..1305 at b 163, ahead of the tip leading edge; P does not
   resolve them). An earlier build read the head-on view's ground line
   (px 1397, next to the plan) as a rod running aft; corrected.
   NOT CONFIRMED: the main-wheel track (D's plan wheel wells at b 1.56 m,
   track 3.12 m); the tanks (D shows them, P has none fitted); the KPAF
   finish (natural metal from P).

   ======================================================================
   5. MiG-23ML (kpa_e80_fighter) -- WINGS AT 16 DEG (fully spread)

   REFERENCES
     E  "Mikoyan-Gurevich MiG-23ML profile line drawing.svg" (1800 px): the
        ML's side, level, both wheels on one ground line: the ML's short
        dorsal fillet, the fin, ventral fin, nozzle, canopy, intakes.
     F  "Mikoyan-Gurevich MiG-23MF 3-view.svg" (1800 px): the plan (one wing
        at 16 deg, one at 72 deg) and head-on; the ML keeps the MF's planform.
        Spread semi-span 556 px, swept 309 px.
     G  "Berlin Gatow Luftwaffenmuseum MiG 23ML 04.jpg" (head-on): the wing
        anhedral, intakes, splayed main legs, twin nose wheels, and the
        main track (296 px against the 1451 px span: 2.85 m).
   PUBLISHED (en.wikipedia "Mikoyan-Gurevich MiG-23", MLD block): length
   16.7 m, span 13.965 m spread, 7.779 m swept, height 4.82 m.
   SCALE: F at 13.965 m / 1112 px = 0.012558 m/px; its swept span then
   measures 7.76 m (7.779), and radome tip to nozzle 15.67 m. E is scaled
   so its radome-to-nozzle length is F's: 0.010104 m/px; on it E's pitot
   to nozzle is 16.88 m and ground to fin top 4.76 m (published 4.82).
   LENGTH, SETTLED ON F ALONE (rule 2): F's plan gives span 1112 px and
   pitot tip (px 10) to the stabilator tips' trailing corners (px 1402)
   1392 px, ratio 1.252; at the published span that is 17.48 m. On the same
   plan pitot tip to nozzle (px 1352) is 1342 px = 16.85 m, radome to
   nozzle 15.67 m, radome to stabilator tips 16.30 m. The published 16.70 m
   is matched only by pitot-to-nozzle (+0.9 %): it reads as the fuselage
   length WITH the probe, ending at the nozzle, while the stabilator tips
   (swept 55 deg) overhang the nozzle by 0.63 m (F plan; E side, where the
   tailplane runs to px 1750 behind the nozzle at 1690). Nothing is
   shortened: the drawing's scale is consistent with both published spans
   (13.965 and 7.779 m) to 0.3 %.
   MEASURED: X extent 17.49 m (pitot tip to the stabilator tips), span
   13.96 m, height 4.76 m. Outer panel LE 18.5 deg at 16 deg sweep setting,
   anhedral 3.6 deg (F head-on), stabilator LE 55 deg.
   ATTITUDE: F stands 2.9 deg nose-up; E stands level with both wheels on
   one line (E's line tilts 1 deg). E is followed; the nose leg is 0.09 m
   shorter than E's so the model is level.
   NOT CONFIRMED: the ventral fin is drawn DOWN as E draws it (it folds to
   starboard on the ground, which is not drawn); the main-leg geometry (G
   only); the KPAF paint (no photograph: a plain grey, no camouflage); no
   stores are drawn.

   ======================================================================
   6. Il-76TD (kpa_e90_transport) -- HeroIl76 (js/hero/ru_a50.js), CALLED

   HeroIl76.build(THREE, M, C, { kind: "il76", star: null, paint: "il78" }).
   What that builder can and cannot do for a plain Il-76:
     - markings: star: null leaves the fin star off; it draws no bort
       number. Nothing to turn off.
     - glazed nose: only kind "il78" draws it, and kind "il78" also adds the
       three UPAZ refuelling pods. So kind "il76" (no pods, no dome) is
       called and the navigator's glazing is added HERE, on HeroIl76's own
       skin (rays cast at the returned mesh), in that builder's Il-78 pane
       grid.
     - tail: every non-A-50 kind gets the gunner's station windows and a
       faired turret position with no guns; there is no option to omit it.
   REFERENCES (beyond HeroIl76's own, listed in ru_a50.js)
     I1 "Air Koryo Ilyushin Il-76MD P-914 Wallner.jpg" and
     I2 "Ilyushin Il-76MD, Air Koryo AN1847251.jpg": the KPA aircraft
        (Commons calls them Il-76MD; the row says TD): the glazed navigator's
        nose over the chin radome, white over light grey, red-orange wing
        and tailplane tips. Neither shows the tail end.
   PUBLISHED (ru_a50.js header): length 46.59 m, span 50.5 m, height 14.76 m.
   MEASURED: 46.5 x 50.6 x 14.79 m (HeroIl76's).
   NOT CONFIRMED: the tail end of the KPA aircraft (gunner's station or a
   civil fairing: neither photograph shows it; HeroIl76's faired station is
   kept because it cannot be turned off without editing ru_a50.js).

   ======================================================================
   Model space: +X nose, +Y port, +Z up, metres. One mesh per material per
   group; retracting gear in the group "gear". ASCII only.
   ============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKpaAir2 = (function () {
  "use strict";
  var V = null;
  var PI = Math.PI, D2R = PI / 180;
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function cr(p0, p1, p2, p3, t) {
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
  }
  /* piecewise-linear lookup in a table of [key, value...] rows */
  function tabL(rows, k, col) {
    var n = rows.length, i;
    if (k <= rows[0][0]) return rows[0][col];
    for (i = 0; i + 1 < n; i++) if (k <= rows[i + 1][0]) return lerp(rows[i][col], rows[i + 1][col], (k - rows[i][0]) / (rows[i + 1][0] - rows[i][0]));
    return rows[n - 1][col];
  }
  /* Catmull-Rom lookup (smooth) */
  function tabC(rows, k, col) {
    var n = rows.length, i = 0;
    if (k <= rows[0][0]) return rows[0][col];
    if (k >= rows[n - 1][0]) return rows[n - 1][col];
    while (rows[i + 1][0] < k) i++;
    var a = rows[Math.max(i - 1, 0)], b = rows[i], c = rows[i + 1], d = rows[Math.min(i + 2, n - 1)];
    return cr(a[col], b[col], c[col], d[col], (k - b[0]) / (c[0] - b[0]));
  }
  /* map a table of drawing pixels to metres: f[col](value) per column */
  function conv(rows, fns) {
    return rows.map(function (r) { return r.map(function (v, i) { return fns[i] ? fns[i](v) : v; }); });
  }

  /* ============================== geometry kit (after kpa_air.js / ru_il10.js) ============================== */
  function yt(f, tc) {
    return tc * (1.4845 * Math.sqrt(f) - 0.6300 * f - 1.7580 * f * f + 1.4215 * f * f * f - 0.5075 * f * f * f * f);
  }
  /* an aerofoil as an OPEN ring: upper TE..LE then lower LE..TE; [x, t] */
  function foilOpen(xle, xte, th, m) {
    var p = [], i, f, c = xle - xte, tc = th / Math.max(Math.abs(c), 0.01);
    for (i = 0; i <= m; i++) { f = 0.5 * (1 + Math.cos(PI * i / m)); p.push([xle - f * c, yt(f, tc) * Math.abs(c), 0]); }
    for (i = m; i >= 0; i--) { f = 0.5 * (1 + Math.cos(PI * i / m)); p.push([xle - f * c, -yt(f, tc) * Math.abs(c), 1]); }
    return p;
  }
  /* loft rings of points [x, y, z, u, v]; each triangle turned to face away
     from its rings' centre line */
  function loftUV(rings, capStart, capEnd) {
    var n = rings[0].length, pos = [], uv = [], idx = [], r, j;
    var cen = rings.map(function (R) {
      var cx = 0, cy = 0, cz = 0; R.forEach(function (p) { cx += p[0]; cy += p[1]; cz += p[2]; });
      return [cx / R.length, cy / R.length, cz / R.length];
    });
    for (r = 0; r < rings.length; r++) for (j = 0; j < n; j++) {
      var p = rings[r][j]; pos.push(p[0], p[1], p[2]); uv.push(p[3], p[4]);
    }
    function tri(a, b, c, ref) {
      var A = a * 3, B = b * 3, Cc = c * 3;
      var ux = pos[B] - pos[A], uy = pos[B + 1] - pos[A + 1], uz = pos[B + 2] - pos[A + 2];
      var vx = pos[Cc] - pos[A], vy = pos[Cc + 1] - pos[A + 1], vz = pos[Cc + 2] - pos[A + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var mx = (pos[A] + pos[B] + pos[Cc]) / 3 - ref[0], my = (pos[A + 1] + pos[B + 1] + pos[Cc + 1]) / 3 - ref[1],
          mz = (pos[A + 2] + pos[B + 2] + pos[Cc + 2]) / 3 - ref[2];
      if (nx * mx + ny * my + nz * mz < 0) idx.push(a, c, b); else idx.push(a, b, c);
    }
    for (r = 0; r + 1 < rings.length; r++) {
      var ref = [(cen[r][0] + cen[r + 1][0]) / 2, (cen[r][1] + cen[r + 1][1]) / 2, (cen[r][2] + cen[r + 1][2]) / 2];
      for (j = 0; j + 1 < n; j++) {
        var a = r * n + j, b = a + 1, c = a + n, d = c + 1;
        tri(a, b, c, ref); tri(b, d, c, ref);
      }
    }
    function cap(rI, nb) {
      var ci = pos.length / 3, C = cen[rI], O = cen[nb], k;
      pos.push(C[0], C[1], C[2]); uv.push(rings[rI][0][3], rings[rI][0][4]);
      var inv = [2 * O[0] - C[0], 2 * O[1] - C[1], 2 * O[2] - C[2]];
      for (k = 0; k + 1 < n; k++) tri(ci, rI * n + k, rI * n + k + 1, inv);
    }
    if (capStart) cap(0, 1);
    if (capEnd) cap(rings.length - 1, rings.length - 2);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new V.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function box(sx, sy, sz, x, y, z) { var g = new V.BoxGeometry(sx, sy, sz); g.translate(x, y, z); return g; }
  function cylY(r, w, x, y, z, seg) { var g = new V.CylinderGeometry(r, r, w, seg || 20); g.translate(x, y, z); return g; }
  function cylX(r0, r1, L, x, y, z, seg) {   /* r0 toward +X */
    var g = new V.CylinderGeometry(r0, r1, L, seg || 14); g.rotateZ(-PI / 2); g.translate(x, y, z); return g;
  }
  function rod(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, true);
    var q = new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L));
    var m = new V.Matrix4().makeRotationFromQuaternion(q);
    m.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(m); return g;
  }
  /* a flattened strut between two points: chord along x, thickness t */
  function flatStrut(a, b, ch, t) {
    var g = rod(a, b, 0.5, 8);
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    g.translate(-(a[0] + b[0]) / 2, -(a[1] + b[1]) / 2, -(a[2] + b[2]) / 2);
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01, ux = dx / L, uy = dy / L, uz = dz / L;
    var pa = g.attributes.position, i;
    for (i = 0; i < pa.count; i++) {
      var x = pa.getX(i), y = pa.getY(i), z = pa.getZ(i), along = x * ux + y * uy + z * uz;
      var ox = x - along * ux, oy = y - along * uy, oz = z - along * uz;
      pa.setXYZ(i, along * ux + ox * ch, along * uy + oy * t, along * uz + oz * t);
    }
    g.translate((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.computeVertexNormals();
    return g;
  }
  function wheelY(r, w, x, y, z) {
    var t = new V.TorusGeometry(r - w * 0.42, w * 0.42, 8, 22); t.rotateX(PI / 2); t.translate(x, y, z); return t;
  }
  function merge(list) {
    var pos = [], nor = [], uv = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = list[i].index ? list[i].toNonIndexed() : list[i];
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array, u = g.attributes.uv ? g.attributes.uv.array : null;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
      for (j = 0; j < p.length / 3; j++) { uv.push(u ? u[j * 2] : 0.5, u ? u[j * 2 + 1] : 0.5); }
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(uv, 2));
    return out;
  }
  function emit(parent, lists, mats, order) {
    order.forEach(function (key) { if (lists[key] && lists[key].length) parent.add(new V.Mesh(merge(lists[key]), mats[key])); });
  }
  function bucket(keys) { var K = {}; keys.forEach(function (k) { K[k] = []; }); return K; }

  /* ============================== textures ============================== */
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function canvas(W, H) { var cv = document.createElement("canvas"); cv.width = W; cv.height = H; return cv; }
  function texOf(cv) {
    var t = new V.CanvasTexture(cv);
    t.wrapS = t.wrapT = V.RepeatWrapping;
    if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    t.anisotropy = 8;
    return t;
  }
  function mottle(g, R, col, n, W, H) {
    g.fillStyle = col;
    for (var i = 0; i < n; i++) {
      g.globalAlpha = 0.06 + R() * 0.08;
      g.fillRect(R() * W, R() * H, 30 + R() * 90, 10 + R() * 30);
    }
    g.globalAlpha = 1;
  }
  /* a plain sheet: field colour, light mottling, frame lines at the given
     u fractions and stringer lines at the given v fractions */
  var _sheets = {};
  function sheet(key, col, dk, us, vs, extra) {
    if (_sheets[key] !== undefined) return _sheets[key];
    var t = null;
    try {
      var W = 512, H = 256, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(key.length * 7919 + 13);
      g.fillStyle = col; g.fillRect(0, 0, W, H);
      mottle(g, R, dk, 26, W, H);
      g.strokeStyle = "rgba(18,20,20,0.30)"; g.lineWidth = 1.2;
      (us || []).forEach(function (u) { g.beginPath(); g.moveTo(u * W, 0); g.lineTo(u * W, H); g.stroke(); });
      g.strokeStyle = "rgba(18,20,20,0.16)";
      (vs || []).forEach(function (v) { g.beginPath(); g.moveTo(0, (1 - v) * H); g.lineTo(W, (1 - v) * H); g.stroke(); });
      if (extra) extra(g, W, H, R);
      t = texOf(cv);
    } catch (e) { t = null; }
    _sheets[key] = t;
    return t;
  }
  function skinMat(tex, col, rough, metal) {
    var q = new V.MeshStandardMaterial({ color: 0xffffff, roughness: rough, metalness: metal, side: V.DoubleSide });
    if (tex) q.map = tex; else q.color.set(col);
    return q;
  }
  function baseMats(C, P) {
    var m = {}, tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.plain = new V.MeshStandardMaterial({ color: P.skin, roughness: P.rough, metalness: P.metal, side: V.DoubleSide });
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10, side: V.DoubleSide });
    m.metal = new V.MeshStandardMaterial({ color: 0x5a5f62, roughness: 0.48, metalness: 0.60, side: V.DoubleSide });
    m.ink = new V.MeshStandardMaterial({ color: 0x151718, roughness: 0.90, metalness: 0.05, side: V.DoubleSide });
    m.glass = new V.MeshStandardMaterial({ color: 0x223038, roughness: 0.10, metalness: 0.45,
                                           transparent: true, opacity: 0.82, side: V.DoubleSide });
    m.propDisc = new V.MeshStandardMaterial({ color: 0x202427, roughness: 1.0, metalness: 0.0, transparent: true, opacity: 0.12,
                                              depthWrite: false, side: V.DoubleSide });
    return m;
  }

  /* superellipse section: angle a from the belly (-PI/2) round the port side
     (0), the top (PI/2), starboard (PI) */
  function secPt(hw, zc, hh, e, a) {
    var c = Math.cos(a), sn = Math.sin(a);
    return [hw * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), 2 / e), zc + hh * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), 2 / e)];
  }
  /* a lofted body from rows [s, top h, bottom h, half width, exponent(, yc)]
     between s0 and s1; mx(s), mz(h) map to model x and z. u = s / uL. */
  function bodyGeo(rows, s0, s1, NS, N, mx, mz, uL, capS, capE, yc) {
    var rings = [], k, j;
    for (k = 0; k <= NS; k++) {
      var s = lerp(s0, s1, k / NS);
      var zt = tabC(rows, s, 1), zb = tabC(rows, s, 2), hw = Math.max(tabC(rows, s, 3), 0.004), e = tabC(rows, s, 4);
      var zc = (zt + zb) / 2, hh = Math.max((zt - zb) / 2, 0.004), p = [];
      for (j = 0; j <= N; j++) {
        var a = -PI / 2 + 2 * PI * j / N, q = secPt(hw, zc, hh, e, a);
        p.push([mx(s), (yc || 0) + q[0], mz(q[1]), s / (uL || 1), j / N]);
      }
      rings.push(p);
    }
    return loftUV(rings, capS, capE);
  }
  /* a round body of revolution about a line at height hc: rows [s, r] */
  function revGeo(rows, s0, s1, NS, N, mx, mz, hc, yc, capS, capE) {
    var rings = [], k, j;
    for (k = 0; k <= NS; k++) {
      var s = lerp(s0, s1, k / NS), r = Math.max(tabC(rows, s, 1), 0.003), p = [];
      for (j = 0; j <= N; j++) { var a = 2 * PI * j / N; p.push([mx(s), (yc || 0) + r * Math.cos(a), mz(hc) + r * Math.sin(a), 0.5, 0.5]); }
      rings.push(p);
    }
    return loftUV(rings, capS, capE);
  }
  /* a lifting surface: stations {y, le, te, h, t} (le, te as s; h the
     chord-plane height; t the thickness); side +1 port, -1 starboard.
     uv: planform, (s - u0) / uW across, |y| / vW along. */
  function liftGeo(st, side, mx, mz, u0, uW, vW, m) {
    var rings = st.map(function (q) {
      return foilOpen(mx(q.le), mx(q.te), q.t, m || 10).map(function (p) {
        var s = mx(0) - p[0];
        return [p[0], side * q.y, mz(q.h) + p[1], (s - u0) / uW, q.y / vW];
      });
    });
    return loftUV(rings, false, true);
  }
  /* a vertical surface: stations {h, le, te, t} at lateral y0 */
  function finGeo(st, mx, mz, y0, m) {
    var rings = st.map(function (q) {
      return foilOpen(mx(q.le), mx(q.te), q.t, m || 10).map(function (p) { return [p[0], (y0 || 0) + p[1], mz(q.h), 0.5, 0.5]; });
    });
    return loftUV(rings, true, true);
  }
  /* stations of a planform given LE and TE tables [y, s] and the chord-plane
     and thickness functions */
  function planSt(ys, leT, teT, hF, tF) {
    return ys.map(function (y) { return { y: y, le: tabC(leT, y, 1), te: tabC(teT, y, 1), h: hF(y), t: tF(y) }; });
  }
  /* a propeller blade (after kpa_air.js): hub at (xp, zp) in model space,
     radius R, chord profile cmax, angle about the shaft */
  function blade(xp, zp, R, cmax, angle, hubR) {
    var rings = [], k, ST = [0.14, 0.25, 0.40, 0.55, 0.70, 0.82, 0.92, 0.97, 1.0];
    for (k = 0; k < ST.length; k++) {
      var f = ST[k], r = Math.max(f * R, hubR || 0);
      var ch = f < 0.5 ? lerp(0.45, 1.0, (f - 0.14) / 0.36) * cmax : f < 0.9 ? lerp(1.0, 0.85, (f - 0.5) / 0.4) * cmax : lerp(0.85, 0.30, (f - 0.9) / 0.1) * cmax;
      var tw = lerp(45, 14, f) * D2R, th = lerp(0.09, 0.014, f) * cmax / 0.25;
      var ring = [], mm, M = 6;
      for (mm = 0; mm <= 2 * M + 1; mm++) {
        var up = mm <= M, i = up ? mm : 2 * M + 1 - mm, ff = 0.5 * (1 - Math.cos(PI * i / M));
        var cx = (ff - 0.4) * ch, ct = (up ? 1 : -1) * th * 0.5 * Math.sin(PI * ff);
        var yb = cx * Math.cos(tw) - ct * Math.sin(tw), xb = cx * Math.sin(tw) + ct * Math.cos(tw);
        var ca = Math.cos(angle), sa = Math.sin(angle);
        ring.push([xp + xb, yb * ca - r * sa, zp + yb * sa + r * ca, 0.5, 0.5]);
      }
      rings.push(ring);
    }
    return loftUV(rings, false, true);
  }
  function propDisc(x, z, R) { var d = new V.CircleGeometry(R, 40); d.rotateY(PI / 2); d.translate(x, 0, z); return d; }

  /* ======================================================================
     1. YAKOVLEV Yak-9P
     Drawing A at 0.0077869 m/px: s = (px - 40) k aft of the spinner tip,
     h = (444.5 - py) k above the main wheels' bottom in the LEVEL frame
     (the side view draws the thrust line level), b = (1107 - py) k out
     from the centre line in the plan and head-on views.
     Model x = 4.275 - s, z = h - 1.748 (the thrust line, py 220, at z 0).
     ====================================================================== */
  var YK = 0.0077869;
  function ys_(px) { return (px - 40) * YK; }
  function yh_(py) { return (444.5 - py) * YK; }
  function yb_(px) { return px * YK; }
  function YX(s) { return 4.275 - s; }
  function YZ(h) { return h - 1.748; }
  var Y_PAL = { skin: "#a4aaa8", dk: "#8e9593", spin: "#8f9694", rough: 0.62, metal: 0.30 };

  /* fuselage, A side (top, bottom) and plan (half width): px, py, py, px, e */
  var Y_FUS = conv([
    [103, 183, 257, 34, 2.0], [125, 177, 263, 41, 2.0], [150, 172, 270, 45, 2.1], [200, 167, 287, 50, 2.2],
    [250, 164, 300, 52, 2.3], [300, 162, 308, 53, 2.3], [350, 160, 313, 54, 2.3], [400, 159, 316, 54, 2.3],
    [450, 159, 317, 54, 2.3], [520, 157, 318, 54, 2.3], [600, 154, 318, 53, 2.3], [650, 152, 312, 52, 2.3],
    [700, 151, 296, 51, 2.3], [760, 150, 290, 47, 2.3], [820, 150, 284, 42, 2.3], [880, 150, 272, 36, 2.2],
    [940, 151, 262, 30, 2.2], [1000, 156, 253, 21, 2.1], [1040, 162, 246, 13, 2.0], [1068, 170, 240, 4, 2.0]
  ], [ys_, yh_, yh_, yb_]);
  /* spinner, A side: px, radius px about the thrust line */
  var Y_SPIN = conv([[40, 4], [46, 12], [55, 19], [65, 25], [75, 29], [85, 32], [95, 34], [103, 35]], [ys_, yb_]);
  /* canopy, A side and plan: px, top py, bottom py (buried), half width px */
  var Y_CAN = conv([
    [452, 160, 172, 26, 2.4], [468, 141, 172, 35, 2.4], [485, 125, 172, 40, 2.5], [520, 122, 172, 41, 2.5],
    [560, 121, 172, 41, 2.5], [600, 123, 172, 40, 2.5], [640, 130, 172, 36, 2.4], [680, 139, 172, 30, 2.3], [722, 150, 172, 16, 2.2]
  ], [ys_, yh_, yh_, yb_]);
  /* radiator bath under the rear fuselage, A side */
  var Y_RAD = conv([
    [468, 302, 316, 18, 2.6], [520, 302, 328, 27, 2.8], [600, 302, 338, 31, 3.0], [680, 302, 337, 30, 3.0],
    [740, 300, 333, 27, 3.0], [762, 298, 330, 25, 3.0]
  ], [ys_, yh_, yh_, yb_]);
  /* wing, A plan: b px, LE px; b px, TE px */
  var Y_WLE = conv([[0, 302], [67, 305], [107, 315], [157, 327], [207, 337], [257, 342], [307, 351], [407, 368],
                    [507, 385], [557, 393], [587, 400], [607, 405], [637, 420], [652, 433], [660, 448]], [yb_, ys_]);
  var Y_WTE = conv([[0, 640], [67, 625], [107, 615], [157, 604], [207, 592], [257, 582], [307, 573], [357, 563],
                    [407, 553], [457, 545], [507, 535], [557, 523], [607, 508], [637, 490], [652, 472], [660, 450]], [yb_, ys_]);
  var Y_WH0 = yh_(290.5), Y_DIH = Math.tan(6.0 * D2R), Y_SEMI = yb_(660);
  function yWingH(b) { return Y_WH0 + Math.max(0, b) * Y_DIH; }
  function yWingT(b) { return lerp(0.30, 0.10, b / Y_SEMI); }
  /* tailplane, A plan: b px, LE px; b px, TE px; on py 176 */
  var Y_TLE = conv([[0, 928], [32, 930], [57, 935], [107, 948], [157, 962], [207, 985], [216, 998], [220, 1012]], [yb_, ys_]);
  var Y_TTE = conv([[0, 1056], [17, 1058], [57, 1072], [107, 1068], [157, 1060], [207, 1045], [216, 1032], [220, 1016]], [yb_, ys_]);
  /* fin and rudder, A side: py, LE px, TE px */
  var Y_FIN = conv([
    [243, 1062, 1068], [237, 1050, 1078], [225, 1030, 1092], [210, 1010, 1106], [190, 990, 1118], [170, 975, 1132],
    [150, 940, 1137], [130, 950, 1128], [110, 958, 1114], [90, 968, 1094], [70, 978, 1082], [50, 990, 1066],
    [38, 1000, 1050], [30, 1014, 1030]
  ], [yh_, ys_, ys_]);

  function buildYak9(THREE, M, C) {
    V = THREE;
    var K = bucket(["body", "wing", "plain", "spin", "team", "metal", "ink", "glass", "propDisc"]);
    var G = bucket(["plain", "metal", "ink"]);
    var sd, k, L = 8.55;
    K.body.push(bodyGeo(Y_FUS, Y_FUS[0][0], Y_FUS[Y_FUS.length - 1][0], 40, 28, YX, YZ, L, true, true));
    K.spin.push(revGeo(Y_SPIN, Y_SPIN[0][0], Y_SPIN[Y_SPIN.length - 1][0], 8, 20, YX, YZ, yh_(220), 0, true, true));
    /* the cannon muzzle through the spinner (A side, px 37..43) */
    K.ink.push(cylX(0.025, 0.025, 0.06, YX(ys_(38)), 0, YZ(yh_(220)), 8));
    K.glass.push(bodyGeo(Y_CAN, Y_CAN[0][0], Y_CAN[Y_CAN.length - 1][0], 14, 22, YX, YZ, 1, true, true));
    K.plain.push(bodyGeo(Y_RAD, Y_RAD[0][0], Y_RAD[Y_RAD.length - 1][0], 8, 16, YX, YZ, 1, true, false));
    /* the radiator outlet flap (dark face at px 762) */
    K.ink.push(box(0.02, yb_(46), yh_(298) - yh_(330), YX(ys_(763)), 0, YZ((yh_(298) + yh_(330)) / 2)));
    /* canopy frames (A side): windscreen arch at px 485, the sliding hood's
       front and rear bows at 518 and 600, a centre bar along the hood top */
    [485, 518, 600].forEach(function (px) {
      var s = ys_(px), ht = tabC(Y_CAN, s, 1), hw = tabC(Y_CAN, s, 3), prev = null, j;
      for (j = 0; j <= 8; j++) {
        var a = lerp(0.12, PI - 0.12, j / 8), q = secPt(hw + 0.012, (ht + yh_(172)) / 2, (ht - yh_(172)) / 2 + 0.012, 2.5, a);
        var P = [YX(s), q[0], YZ(q[1])];
        if (prev) K.ink.push(rod(prev, P, 0.016, 4));
        prev = P;
      }
    });
    /* wings */
    var ysW = [0.0, 0.40, 0.80, 1.30, 1.90, 2.50, 3.10, 3.60, 4.00, 4.30, 4.55, 4.75, 4.90, 5.02, Y_SEMI - 0.005];
    var stW = planSt(ysW, Y_WLE, Y_WTE, yWingH, yWingT);
    for (sd = -1; sd <= 1; sd += 2) K.wing.push(liftGeo(stW, sd, YX, YZ, 1.8, 2.8, Y_SEMI, 12));
    /* tailplane */
    var ysT = [0.0, 0.25, 0.45, 0.83, 1.22, 1.50, 1.62, 1.68, yb_(220) - 0.004];
    var stT = planSt(ysT, Y_TLE, Y_TTE, function () { return yh_(176); }, function (b) { return lerp(0.10, 0.04, b / yb_(220)); });
    for (sd = -1; sd <= 1; sd += 2) K.plain.push(liftGeo(stT, sd, YX, YZ, 6.9, 1.2, 1.7, 8));
    /* fin and rudder */
    K.plain.push(finGeo(Y_FIN.map(function (r) {
      return { h: r[0], le: r[1], te: r[2], t: lerp(0.13, 0.05, (r[0] - Y_FIN[0][0]) / (Y_FIN[Y_FIN.length - 1][0] - Y_FIN[0][0])) };
    }), YX, YZ, 0, 10));
    /* exhaust (A side px 152..318, py 203..219): the dark slot each side and
       six stubs */
    for (sd = -1; sd <= 1; sd += 2) {
      var sx0 = ys_(152), sx1 = ys_(318), hz = yh_(211), hwS = tabC(Y_FUS, ys_(235), 3);
      K.ink.push(box(sx1 - sx0, 0.03, yh_(203) - yh_(219), YX((sx0 + sx1) / 2), sd * (hwS - 0.005), YZ(hz)));
      for (k = 0; k < 6; k++) {
        var xs = ys_(165 + k * 28);
        K.metal.push(box(0.10, 0.07, 0.07, YX(xs), sd * (hwS + 0.025), YZ(hz)));
      }
    }
    /* supercharger intake bump on the cowl top (A side px 285..310, py 154) */
    K.plain.push(box(ys_(312) - ys_(282), 0.12, 0.07, YX(ys_(297)), 0, YZ(yh_(158))));
    /* aerial mast behind the canopy (A side px 727, py 148 to 70) and the
       wire to the fin top (A's thin line) */
    K.metal.push(flatStrut([YX(ys_(724)), 0, YZ(yh_(150))], [YX(ys_(727)), 0, YZ(yh_(70))], 0.05, 0.02));
    K.ink.push(rod([YX(ys_(727)), 0, YZ(yh_(72))], [YX(ys_(1010)), 0, YZ(yh_(32))], 0.006, 3));
    /* pitot under the port wing (A plan: px 310..420 at b 553) */
    var pb = yb_(553);
    K.metal.push(rod([YX(ys_(395)), pb, YZ(yWingH(pb) - 0.06)], [YX(ys_(310)), pb, YZ(yWingH(pb) - 0.06)], 0.012, 5));
    /* team: a strip on each wing top near the tip */
    for (sd = -1; sd <= 1; sd += 2) {
      var tb = 4.10, tlE = tabC(Y_WLE, tb, 1), ttE = tabC(Y_WTE, tb, 1);
      K.team.push(box((ttE - tlE) * 0.78, 0.30, 0.02, YX((tlE + ttE) / 2 + 0.05), sd * tb, YZ(yWingH(tb) + yWingT(tb) * 0.40 + 0.02)));
    }
    /* propeller: three blades, 2.92 m (A head-on disc 375 px), hub px 100 */
    var xp = YX(ys_(100)), zp = YZ(yh_(220)), PR = 1.46;
    for (k = 0; k < 3; k++) K.ink.push(blade(xp, zp, PR, 0.24, (20 + 120 * k) * D2R, 0.20));
    K.propDisc.push(propDisc(xp - 0.02, zp, PR));

    /* gear (retracts inward into the wing): main wheels 0.60 m (A side,
       77 px), centre px 329 py 406, track 2.86 m (A head-on); legs outboard
       of the wheels with the leg doors (A, B); the tailwheel (A side, px
       1030, 0.30 m) on a LENGTHENED leg so it reaches the ground (ATTITUDE) */
    var MW = ys_(329), RW = yb_(38.5), YW = yb_(183.5);
    for (sd = -1; sd <= 1; sd += 2) {
      var yl = YW + 0.13;
      G.metal.push(rod([YX(MW - 0.04), sd * yl, YZ(yWingH(yl) - 0.10)], [YX(MW), sd * yl, YZ(RW)], 0.05, 8));
      G.metal.push(rod([YX(MW), sd * yl, YZ(RW)], [YX(MW), sd * YW, YZ(RW)], 0.03, 6));
      G.ink.push(wheelY(RW, 0.18, YX(MW), sd * YW, YZ(RW)));
      G.metal.push(cylY(0.11, 0.19, YX(MW), sd * YW, YZ(RW), 12));
      G.plain.push(box(0.44, 0.02, yWingH(yl) - 0.10 - RW, YX(MW + 0.02), sd * (yl + 0.04), YZ((yWingH(yl) - 0.10 + RW) / 2)));
    }
    var TWs = ys_(1030), TWr = yb_(19);
    G.metal.push(rod([YX(TWs - 0.10), 0, YZ(yh_(252))], [YX(TWs), 0, YZ(TWr)], 0.035, 6));
    G.metal.push(rod([YX(TWs), -0.05, YZ(TWr)], [YX(TWs), 0.05, YZ(TWr)], 0.02, 6));
    G.ink.push(wheelY(TWr, 0.09, YX(TWs), 0, YZ(TWr)));

    var mats = baseMats(C, Y_PAL);
    mats.body = skinMat(sheet("yak9body", Y_PAL.skin, Y_PAL.dk, [0.06, 0.13, 0.36, 0.52, 0.66, 0.82], [0.25, 0.75]), Y_PAL.skin, Y_PAL.rough, Y_PAL.metal);
    mats.wing = skinMat(sheet("yak9wing", Y_PAL.skin, Y_PAL.dk, [0.22, 0.62], [0.30, 0.55, 0.80]), Y_PAL.skin, Y_PAL.rough, Y_PAL.metal);
    mats.spin = new V.MeshStandardMaterial({ color: Y_PAL.spin, roughness: 0.5, metalness: 0.35 });
    var root = new V.Group(); root.name = "yak9p";
    emit(root, K, mats, ["body", "wing", "plain", "spin", "team", "metal", "ink", "glass", "propDisc"]);
    var gear = new V.Group(); gear.name = "gear";
    emit(gear, G, mats, ["plain", "metal", "ink"]);
    root.add(gear);
    return root;
  }

  /* ======================================================================
     2. POLIKARPOV Po-2
     Drawing B at 0.008934 m/px: s = (px - 34) k aft of the propeller hub,
     h = (413 - py) k above the main wheels' bottom in the LEVEL frame,
     b = px k out from the centre line (plan centre py 1104).
     Model x = 4.10 - s, z = h - 1.680 (the thrust line, py 225, at z 0).
     ====================================================================== */
  var PK = 0.008934;
  function ps_(px) { return (px - 34) * PK; }
  function ph_(py) { return (413 - py) * PK; }
  function pb_(px) { return px * PK; }
  function PX(s) { return 4.10 - s; }
  function PZ(h) { return h - 1.680; }
  var P_PAL = { skin: "#56703f", dk: "#465c34", rough: 0.85, metal: 0.05 };   /* P upper green, about 0.8 of its level */

  var P_FUS = conv([
    [98, 190, 268, 34, 2.4], [115, 178, 276, 40, 2.6], [150, 167, 282, 45, 3.0], [200, 164, 285, 46, 3.2],
    [250, 163, 288, 46, 3.2], [300, 163, 290, 46, 3.2], [400, 164, 290, 46, 3.2], [480, 167, 290, 45, 3.2],
    [560, 172, 280, 40, 3.0], [640, 177, 271, 35, 2.8], [700, 181, 264, 31, 2.6], [760, 185, 257, 25, 2.4],
    [820, 190, 250, 16, 2.2], [858, 195, 246, 5, 2.0]
  ], [ps_, ph_, ph_, pb_]);
  /* the M-11 crankcase and nose ring, B side: px, radius px */
  var P_CASE = conv([[38, 4], [42, 14], [50, 18], [70, 20], [90, 22], [99, 30]], [ps_, pb_]);
  /* wings, B side and plan */
  var P_UW = { le: ps_(186), te: ps_(370), h0: ph_(85), hs: pb_(638), tipR: 0.70, dih: 1.5 * D2R, t0: 0.13, t1: 0.10, y0: 0 };
  var P_LW = { le: ps_(275), te: ps_(461), h0: ph_(281), hs: pb_(595), tipR: 0.46, dih: 1.8 * D2R, t0: 0.20, t1: 0.12, y0: pb_(44) };
  function pWingH(W, y) { return W.h0 + y * Math.tan(W.dih); }
  function pWingSt(W) {
    var o = [], k, NY = 16;
    for (k = 0; k <= NY; k++) {
      var y = lerp(W.y0, W.hs - 0.004, k / NY), le = W.le, te = W.te, dt = y - (W.hs - W.tipR);
      if (dt > 0) {
        var f = Math.sqrt(Math.max(0, 1 - Math.pow(dt / W.tipR, 2))), mid = (W.le + W.te) / 2;
        le = mid - (mid - W.le) * f; te = mid + (W.te - mid) * f;
        if (te - le < 0.04) { le = mid - 0.02; te = mid + 0.02; }
      }
      o.push({ y: y, le: le, te: te, h: pWingH(W, y), t: lerp(W.t0, W.t1, y / W.hs) * (te - le) / (W.te - W.le) });
    }
    return o;
  }
  var P_TP = { le: ps_(763), te: ps_(908), h0: ph_(186), hs: pb_(266), tipR: 0.58, dih: 0, t0: 0.10, t1: 0.06, y0: 0.0 };
  var P_FIN = conv([
    [245, 856, 860], [220, 852, 895], [195, 850, 915], [184, 740, 926], [160, 768, 940], [130, 803, 950],
    [110, 826, 951], [100, 852, 951], [80, 857, 947], [60, 862, 938], [40, 870, 920], [28, 890, 897]
  ], [ph_, ps_, ps_]);

  function buildPo2(THREE, M, C) {
    V = THREE;
    var K = bucket(["body", "wing", "plain", "team", "metal", "ink", "glass", "propDisc"]);
    var sd, k, L = 8.19;
    K.body.push(bodyGeo(P_FUS, P_FUS[0][0], P_FUS[P_FUS.length - 1][0], 30, 24, PX, PZ, L, true, true));
    var hT = ph_(225);
    K.metal.push(revGeo(P_CASE, P_CASE[0][0], P_CASE[P_CASE.length - 1][0], 6, 16, PX, PZ, hT, 0, true, false));
    /* five cylinders of the M-11 standing out of the nose (B side and
       head-on: heads 0.46 m from the shaft), finned barrels drawn plain */
    for (k = 0; k < 5; k++) {
      var a = PI / 2 + k * 2 * PI / 5, ca = Math.cos(a), sa = Math.sin(a);
      K.metal.push(rod([PX(ps_(68)), 0.16 * ca, PZ(hT + 0.16 * sa)], [PX(ps_(68)), 0.43 * ca, PZ(hT + 0.43 * sa)], 0.075, 8));
      K.ink.push(rod([PX(ps_(68)), 0.40 * ca, PZ(hT + 0.40 * sa)], [PX(ps_(68)), 0.47 * ca, PZ(hT + 0.47 * sa)], 0.055, 8));
    }
    /* the exhaust collector ring behind the cylinders (B side) */
    var ring = new V.TorusGeometry(0.30, 0.035, 6, 24); ring.rotateY(PI / 2); ring.translate(PX(ps_(92)), 0, PZ(hT)); K.ink.push(ring);
    /* the two open cockpits (B side px 270..345 and 364..426) with their
       small windscreens */
    [[270, 345, 260], [364, 426, 357]].forEach(function (c) {
      var s0 = ps_(c[0]), s1 = ps_(c[1]), ht = tabC(P_FUS, (s0 + s1) / 2, 1);
      K.ink.push(box(s1 - s0, 0.52, 0.03, PX((s0 + s1) / 2), 0, PZ(ht + 0.005)));
      var ws = ps_(c[2]);
      K.glass.push(flatStrut([PX(ws), 0, PZ(ht - 0.01)], [PX(ws + 0.10), 0, PZ(ht + 0.20)], 0.50, 0.012));
    });
    /* wings */
    var uS = pWingSt(P_UW), lS = pWingSt(P_LW), tS = pWingSt(P_TP);
    for (sd = -1; sd <= 1; sd += 2) {
      K.wing.push(liftGeo(uS, sd, PX, PZ, P_UW.le - 0.05, 1.75, 5.75, 10));
      K.wing.push(liftGeo(lS, sd, PX, PZ, P_LW.le - 0.05, 1.75, 5.75, 10));
      K.plain.push(liftGeo(tS, sd, PX, PZ, P_TP.le, 1.4, 2.4, 8));
    }
    K.plain.push(finGeo(P_FIN.map(function (r) { return { h: r[0], le: r[1], te: r[2], t: 0.07 }; }), PX, PZ, 0, 8));
    /* interplane struts (B head-on: foot 3.30 m out, head 3.61 m; B side:
       front leg px 213 -> 300, rear leg 307 -> 395; P: the diagonal from
       the front leg's head to the rear leg's foot) */
    for (sd = -1; sd <= 1; sd += 2) {
      var yl = 3.30, yu = 3.61;
      function U(px) { return [PX(ps_(px)), sd * yu, PZ(pWingH(P_UW, yu) - 0.04)]; }
      function Lw(px) { return [PX(ps_(px)), sd * yl, PZ(pWingH(P_LW, yl) + 0.06)]; }
      K.plain.push(flatStrut(U(213), Lw(300), 0.09, 0.04));
      K.plain.push(flatStrut(U(307), Lw(395), 0.09, 0.04));
      K.plain.push(flatStrut(U(213), Lw(395), 0.07, 0.035));
      /* cabane (B side and head-on): from the fuselage top longerons to the
         upper wing centre section */
      var yc = 0.30, yw = 0.50, hf = tabC(P_FUS, ps_(210), 1) - 0.05;
      K.metal.push(rod([PX(ps_(205)), sd * yc, PZ(hf)], [PX(ps_(213)), sd * yw, PZ(pWingH(P_UW, yw) - 0.05)], 0.025, 6));
      K.metal.push(rod([PX(ps_(290)), sd * yc, PZ(tabC(P_FUS, ps_(290), 1) - 0.05)], [PX(ps_(307)), sd * yw, PZ(pWingH(P_UW, yw) - 0.05)], 0.025, 6));
      K.metal.push(rod([PX(ps_(205)), sd * yc, PZ(hf)], [PX(ps_(307)), sd * yw, PZ(pWingH(P_UW, yw) - 0.05)], 0.02, 6));
      /* flying and landing wires (B head-on): crossing in the strut bay */
      [255, 345].forEach(function (px) {
        K.ink.push(rod([PX(ps_(px)), sd * (yu - 0.05), PZ(pWingH(P_UW, yu) - 0.06)], [PX(ps_(px + 40)), sd * 0.50, PZ(pWingH(P_LW, 0.5) + 0.08)], 0.008, 3));
        K.ink.push(rod([PX(ps_(px + 40)), sd * (yl - 0.05), PZ(pWingH(P_LW, yl) + 0.08)], [PX(ps_(px)), sd * 0.50, PZ(pWingH(P_UW, 0.5) - 0.06)], 0.008, 3));
      });
      /* tailplane strut (B side) */
      K.metal.push(rod([PX(ps_(790)), sd * 0.12, PZ(ph_(252))], [PX(ps_(800)), sd * 0.90, PZ(ph_(189))], 0.018, 5));
    }
    /* fixed main gear (B side: wheel 0.66 m at px 243, py 375; head-on track
       1.86 m): the forward strut to the engine bearers, the oleo, the V of
       the split axle to the belly */
    var MS = ps_(243), MR = pb_(37), MY = 0.93;
    for (sd = -1; sd <= 1; sd += 2) {
      var ax = [PX(MS), sd * (MY - 0.10), PZ(MR)];
      K.ink.push(wheelY(MR, 0.16, PX(MS), sd * MY, PZ(MR)));
      K.metal.push(cylY(0.12, 0.17, PX(MS), sd * MY, PZ(MR), 12));
      K.plain.push(rod(ax, [PX(ps_(165)), sd * 0.34, PZ(ph_(283))], 0.035, 6));
      K.plain.push(rod(ax, [PX(ps_(248)), sd * 0.38, PZ(ph_(290))], 0.05, 8));
      K.plain.push(rod(ax, [PX(MS), 0, PZ(ph_(292))], 0.03, 6));
      K.metal.push(rod(ax, [PX(MS), sd * MY, PZ(MR)], 0.025, 6));
    }
    /* tail skid at B's station, its leg LENGTHENED to the ground (ATTITUDE) */
    K.metal.push(rod([PX(ps_(782)), 0, PZ(ph_(251))], [PX(ps_(812)), 0, PZ(0.04)], 0.03, 6));
    K.metal.push(box(0.20, 0.05, 0.04, PX(ps_(815)), 0, PZ(0.02)));
    /* propeller: two wooden blades, 2.43 m (B side), and the blur disc */
    var xp = PX(ps_(36)), PR = 1.215;
    for (k = 0; k < 2; k++) K.ink.push(blade(xp, PZ(hT), PR, 0.17, (75 + 180 * k) * D2R, 0.10));
    K.propDisc.push(propDisc(xp - 0.02, PZ(hT), PR));
    /* team: a strip on each upper wing top near the tip */
    for (sd = -1; sd <= 1; sd += 2) {
      var ty = 4.6;
      K.team.push(box(1.05, 0.34, 0.02, PX((P_UW.le + P_UW.te) / 2), sd * ty, PZ(pWingH(P_UW, ty) + 0.075)));
    }
    var mats = baseMats(C, P_PAL);
    mats.body = skinMat(sheet("po2body", P_PAL.skin, P_PAL.dk, [0.08, 0.12, 0.30, 0.50, 0.70], [0.30, 0.70]), P_PAL.skin, P_PAL.rough, P_PAL.metal);
    mats.wing = skinMat(sheet("po2wing", P_PAL.skin, P_PAL.dk, [0.70], (function () { var v = [], y; for (y = 0.04; y < 1; y += 0.045) v.push(y); return v; })(),
      function (g, W, H) { g.strokeStyle = "rgba(14,16,12,0.5)"; g.lineWidth = 2; g.beginPath(); g.moveTo(0.70 * W, 0); g.lineTo(0.70 * W, 0.45 * H); g.stroke(); }),
      P_PAL.skin, P_PAL.rough, P_PAL.metal);
    var root = new V.Group(); root.name = "po2";
    emit(root, K, mats, ["body", "wing", "plain", "team", "metal", "ink", "glass", "propDisc"]);
    return root;
  }

  /* ---- shared jet parts ---- */
  /* an air-to-air missile along x: body r, length L, centre (x, y, z),
     cruciform fins of span fs at the tail and canards of span cs */
  function missile(K, x, y, z, L, r, fs, cs) {
    var g = new V.CylinderGeometry(r, r, L * 0.86, 10); g.rotateZ(PI / 2); g.translate(x - L * 0.04, y, z); K.metal.push(g);
    var n = new V.ConeGeometry(r, L * 0.14, 10); n.rotateZ(-PI / 2); n.translate(x + L * 0.43, y, z); K.metal.push(n);
    for (var k = 0; k < 2; k++) {
      var f = box(L * 0.12, k ? 0.012 : fs, k ? fs : 0.012, x - L * 0.40, y, z); K.metal.push(f);
      var c = box(L * 0.05, k ? 0.012 : cs, k ? cs : 0.012, x + L * 0.30, y, z); K.metal.push(c);
    }
  }

  /* ======================================================================
     3. MiG-21PFM
     Drawing C (the PF airframe) at 0.010774 m/px: s = (px - 53) k aft of
     the cone tip, h = (385.5 - py) k above the ground, b = px k out from
     the centre line (plan centre py 698). Model x = 6.70 - s, z = h - 1.46
     (the cone axis, py 250, at z 0; the ground at z -1.46).
     ====================================================================== */
  var MK = 0.010774;
  function ms_(px) { return (px - 53) * MK; }
  function mh_(py) { return (385.5 - py) * MK; }
  function mb_(px) { return px * MK; }
  function MX(s) { return 6.70 - s; }
  function MZ(h) { return h - 1.46; }
  var M_PAL = { skin: "#a9aeb0", dk: "#8f9597", cone: "#3f4f45", hot: "#5a5650", rough: 0.42, metal: 0.55 };

  /* the round fuselage tube, C side (top, bottom) and plan (half width) */
  var M_FUS = conv([
    [147, 209, 285, 40, 2.0], [200, 201, 290, 44, 2.0], [250, 194, 292, 47, 2.0], [300, 190, 294, 49, 2.0],
    [350, 191, 296, 51, 2.0], [400, 193, 298, 52, 2.0], [500, 196, 299, 53, 2.0], [600, 198, 300, 52, 2.0],
    [700, 198, 300, 50, 2.0], [800, 197, 300, 49, 2.0], [900, 195, 300, 48, 2.0], [1000, 192, 299, 47, 2.0],
    [1100, 191, 297, 46, 2.0], [1200, 197, 292, 43, 2.0], [1256, 203, 290, 40, 2.0]
  ], [ms_, mh_, mh_, mb_]);
  /* the PF/PFM dorsal spine, the slim one (C side and plan) */
  var M_SPINE = conv([
    [492, 150, 205, 30, 2.2], [520, 156, 205, 29, 2.3], [600, 158, 205, 28, 2.3], [800, 158, 205, 27, 2.3],
    [930, 158, 205, 24, 2.3], [980, 152, 205, 16, 2.2], [1030, 148, 205, 8, 2.0]
  ], [ms_, mh_, mh_, mb_]);
  /* canopy (C side and plan), its foot buried in the tube */
  var M_CAN = conv([
    [320, 188, 200, 20, 2.2], [345, 172, 200, 27, 2.2], [370, 158, 200, 31, 2.3], [395, 148, 200, 33, 2.4],
    [430, 143, 200, 33, 2.4], [460, 142, 200, 33, 2.4], [485, 144, 200, 31, 2.4], [500, 150, 200, 28, 2.3], [512, 156, 200, 24, 2.2]
  ], [ms_, mh_, mh_, mb_]);
  /* shock cone (C side): px, radius px about py 248 */
  var M_CONE = conv([[53, 0.6], [70, 5], [100, 13.5], [130, 21.5], [147, 25], [165, 28], [185, 29], [200, 20], [204, 2]], [ms_, mb_]);
  /* wing: LE px = 425 + 1.542 b, TE px 982, tip b 332 (C plan: 57 deg) */
  var M_SEMI = mb_(332), M_ANH = Math.tan(2 * D2R), M_WH = mh_(251);
  function mWingLE(y) { return ms_(425) + 1.542 * y; }
  function mWingH(y) { return M_WH - y * M_ANH; }
  /* stabilator (C plan): LE px 1093 + 1.644 (b - 58), TE 1284 + 0.722 (b - 58), tip b 160; side py 234 */
  function mStabLE(y) { return ms_(1093) + 1.644 * (y - mb_(58)); }
  function mStabTE(y) { return ms_(1284) + 0.722 * (y - mb_(58)); }
  /* fin (C side): py, LE px, TE px */
  var M_FIN = conv([[196, 1000, 1250], [177, 990, 1254], [150, 977, 1277], [120, 1043, 1302], [90, 1109, 1328],
                    [60, 1175, 1353], [40, 1219, 1370], [29, 1240, 1378]], [mh_, ms_, ms_]);
  var M_VENT = conv([[296, 946, 1172], [318, 980, 1150], [330, 1010, 1110], [334, 1040, 1068]], [mh_, ms_, ms_]);

  function buildMiG21(THREE, M, C) {
    V = THREE;
    var K = bucket(["body", "wing", "plain", "cone", "hot", "team", "metal", "ink", "glass"]);
    var G = bucket(["plain", "metal", "ink"]);
    var sd, k, L = 13.0;
    K.body.push(bodyGeo(M_FUS, M_FUS[0][0], M_FUS[M_FUS.length - 1][0], 40, 32, MX, MZ, L, false, false));
    K.body.push(bodyGeo(M_SPINE, M_SPINE[0][0], M_SPINE[M_SPINE.length - 1][0], 16, 20, MX, MZ, L, true, true));
    K.glass.push(bodyGeo(M_CAN, M_CAN[0][0], M_CAN[M_CAN.length - 1][0], 14, 22, MX, MZ, 1, true, true));
    /* the intake lip (C side and head-on: 0.86 m outside), the dark duct */
    var hA = mh_(248), lipS = ms_(147);
    K.metal.push(revGeo([[lipS - 0.01, 0.36], [lipS + 0.005, 0.425], [lipS + 0.06, 0.43]], lipS - 0.01, lipS + 0.06, 3, 32, MX, MZ, hA, 0, false, false));
    K.ink.push(revGeo([[lipS, 0.365], [lipS + 1.2, 0.33]], lipS, lipS + 1.2, 2, 28, MX, MZ, hA, 0, false, true));
    K.cone.push(revGeo(M_CONE, M_CONE[0][0], M_CONE[M_CONE.length - 1][0], 14, 28, MX, MZ, hA, 0, true, true));
    /* the jetpipe: a hot ring and the dark nozzle inside it */
    var nS = ms_(1256), nH = mh_(246);
    K.hot.push(revGeo([[nS - 0.6, 0.45], [nS, 0.43]], nS - 0.6, nS, 2, 28, MX, MZ, nH, 0, false, false));
    K.ink.push(revGeo([[nS - 0.02, 0.40], [nS - 0.6, 0.34]], nS - 0.6, nS - 0.02, 2, 24, MX, MZ, nH, 0, false, true));
    /* the brake-chute housing at the rudder foot (P1: a fairing at the fin's
       rear root; size NOT CONFIRMED) */
    K.body.push(revGeo([[ms_(1150), 0.02], [ms_(1170), 0.10], [ms_(1245), 0.10], [ms_(1262), 0.02]], ms_(1150), ms_(1262), 6, 12, MX, MZ, mh_(195), 0, true, true));
    /* canopy frames: the PFM's fixed windscreen frame and the hood's rear bow
       (P1), the periscope on the hood (P1, the 1964 change list) */
    [372, 497].forEach(function (px) {
      var s = ms_(px), ht = tabC(M_CAN, s, 1), hb = mh_(200), hw = tabC(M_CAN, s, 3), prev = null, j;
      for (j = 0; j <= 8; j++) {
        var q = secPt(hw + 0.012, (ht + hb) / 2, (ht - hb) / 2 + 0.012, 2.4, lerp(0.05, PI - 0.05, j / 8));
        var P = [MX(s), q[0], MZ(q[1])];
        if (prev) K.metal.push(rod(prev, P, 0.018, 4));
        prev = P;
      }
    });
    K.metal.push(box(0.20, 0.08, 0.08, MX(ms_(440)), 0, MZ(mh_(141) + 0.03)));
    /* the pitot boom on the nose top (C side and plan: px 14..205, centre) */
    K.metal.push(rod([MX(ms_(205)), 0, MZ(mh_(199))], [MX(ms_(14)), 0, MZ(mh_(205))], 0.025, 6));
    K.body.push(revGeo([[ms_(165), 0.01], [ms_(175), 0.05], [ms_(200), 0.05], [ms_(215), 0.01]], ms_(165), ms_(215), 4, 10, MX, MZ, mh_(197), 0, true, true));
    /* wings: 57 deg delta, 2 deg anhedral, t/c 5 % to 4.2 % */
    var ysW = [0, 0.6, 1.2, 1.9, 2.6, 3.2, M_SEMI - 0.004], stW = ysW.map(function (y) {
      var le = mWingLE(y), te = ms_(982); return { y: y, le: le, te: te, h: mWingH(y), t: (te - le) * (0.05 - 0.008 * y / M_SEMI) };
    });
    for (sd = -1; sd <= 1; sd += 2) K.wing.push(liftGeo(stW, sd, MX, MZ, ms_(425), ms_(982) - ms_(425), M_SEMI, 10));
    /* two fences a wing (C plan) */
    for (sd = -1; sd <= 1; sd += 2) [mb_(130), mb_(225)].forEach(function (y) {
      var le = mWingLE(y), c = ms_(982) - le;
      K.wing.push(box(c * 0.62, 0.02, 0.12, MX(le + c * 0.33), sd * y, MZ(mWingH(y) + 0.05)));
    });
    /* stabilators and their anti-flutter rods */
    var ysS = [mb_(40), mb_(58), mb_(110), mb_(160)], stS = ysS.map(function (y) {
      var le = mStabLE(y), te = mStabTE(y); return { y: y, le: le, te: te, h: mh_(234), t: (te - le) * 0.035 };
    });
    for (sd = -1; sd <= 1; sd += 2) {
      K.plain.push(liftGeo(stS, sd, MX, MZ, 10, 3, 2, 8));
      K.metal.push(cylX(0.005, 0.03, 0.15, MX(ms_(1225)), sd * mb_(165), MZ(mh_(234)), 6));
      K.metal.push(cylX(0.03, 0.03, ms_(1300) - ms_(1238), MX((ms_(1238) + ms_(1300)) / 2), sd * mb_(165), MZ(mh_(234)), 6));
    }
    K.plain.push(finGeo(M_FIN.map(function (r, i) { return { h: r[0], le: r[1], te: r[2], t: lerp(0.20, 0.08, i / (M_FIN.length - 1)) }; }), MX, MZ, 0, 10));
    K.plain.push(finGeo(M_VENT.map(function (r) { return { h: r[0], le: r[1], te: r[2], t: 0.09 }; }), MX, MZ, 0, 8));
    /* two underwing pylons at b 1.97 m (C plan) with R-3S missiles */
    for (sd = -1; sd <= 1; sd += 2) {
      var py = mb_(183), pz = mWingH(py) - 0.06;
      K.plain.push(box(1.30, 0.07, 0.16, MX(ms_(940)), sd * py, MZ(pz - 0.08)));
      missile(K, MX(ms_(940)), sd * py, MZ(pz - 0.30), 2.84, 0.0635, 0.53, 0.12);
    }
    /* team: a band on each wing top outboard of the fences, and one across the spine */
    for (sd = -1; sd <= 1; sd += 2) {
      var ty = 2.95, tle = mWingLE(ty), tte = ms_(982);
      K.team.push(box((tte - tle) * 0.8, 0.28, 0.02, MX((tle + tte) / 2), sd * ty, MZ(mWingH(ty) + (tte - tle) * 0.022 + 0.015)));
    }
    K.team.push(box(0.30, 0.50, 0.02, MX(ms_(700)), 0, MZ(mh_(158) + 0.015)));

    /* gear (retracts): nose wheel 0.49 m at px 371, mains 0.78 m at px 793
       (C side); track 2.79 m (NOT on C, see the header) */
    var NX = ms_(371), NR = mb_(22.7), MXs = ms_(793), MR = mb_(36), MY = 1.395;
    G.metal.push(rod([MX(NX - 0.10), 0, MZ(mh_(296))], [MX(NX + 0.02), 0, MZ(NR + 0.05)], 0.05, 8));
    G.ink.push(wheelY(NR, 0.17, MX(NX), 0, MZ(NR)));
    G.metal.push(cylY(0.10, 0.18, MX(NX), 0, MZ(NR), 10));
    for (sd = -1; sd <= 1; sd += 2) {
      G.plain.push(box(0.90, 0.03, 0.28, MX(NX + 0.55), sd * 0.20, MZ(mh_(300) - 0.12)));
      G.metal.push(rod([MX(MXs - 0.10), sd * 1.56, MZ(mWingH(1.56) - 0.05)], [MX(MXs), sd * 1.56, MZ(MR + 0.05)], 0.065, 8));
      G.metal.push(rod([MX(MXs), sd * 1.56, MZ(MR)], [MX(MXs), sd * MY, MZ(MR)], 0.04, 6));
      G.ink.push(wheelY(MR, 0.20, MX(MXs), sd * MY, MZ(MR)));
      G.metal.push(cylY(0.16, 0.21, MX(MXs), sd * MY, MZ(MR), 12));
      G.plain.push(box(0.90, 0.03, 0.78, MX(MXs - 0.30), sd * 1.64, MZ(mWingH(1.64) - 0.45)));
    }

    var mats = baseMats(C, M_PAL);
    mats.body = skinMat(sheet("mig21body", M_PAL.skin, M_PAL.dk, [0.08, 0.20, 0.33, 0.46, 0.62, 0.78, 0.90], [0.25, 0.50, 0.75]), M_PAL.skin, M_PAL.rough, M_PAL.metal);
    mats.wing = skinMat(sheet("mig21wing", M_PAL.skin, M_PAL.dk, [0.35, 0.70, 0.86], [0.30, 0.62]), M_PAL.skin, M_PAL.rough, M_PAL.metal);
    mats.cone = new V.MeshStandardMaterial({ color: M_PAL.cone, roughness: 0.55, metalness: 0.10, side: V.DoubleSide });
    mats.hot = new V.MeshStandardMaterial({ color: M_PAL.hot, roughness: 0.50, metalness: 0.55, side: V.DoubleSide });
    var root = new V.Group(); root.name = "mig21pfm";
    emit(root, K, mats, ["body", "wing", "plain", "cone", "hot", "team", "metal", "ink", "glass"]);
    var gear = new V.Group(); gear.name = "gear";
    emit(gear, G, mats, ["plain", "metal", "ink"]);
    root.add(gear);
    return root;
  }

  /* ======================================================================
     4. SUKHOI Su-7BMK
     Drawing D at 0.013691 m/px: s = (px - 165) k aft of the cone tip,
     h = (400 - py) k above the ground, b = px k from the centre line (plan
     centre py 704). Model x = 7.40 - s, z = h - 1.752 (axis, py 272).
     ====================================================================== */
  var SK = 0.013691;
  function ss_(px) { return (px - 165) * SK; }
  function sh_(py) { return (400 - py) * SK; }
  function sb_(px) { return px * SK; }
  function SX(s) { return 7.40 - s; }
  function SZ(h) { return h - 1.752; }
  var S_PAL = { skin: "#aeb2b3", dk: "#93989a", cone: "#2b2f30", hot: "#5d5850", rough: 0.40, metal: 0.58 };
  var S_FUS = conv([
    [196, 237, 307, 35, 2.0], [230, 225, 311, 41, 2.0], [260, 220, 313, 46, 2.0], [300, 214, 315, 51, 2.0],
    [350, 210, 316, 54, 2.0], [400, 208, 317, 55, 2.0], [500, 206, 318, 56, 2.0], [600, 205, 318, 57, 2.0],
    [700, 205, 317, 58, 2.0], [800, 205, 315, 60, 2.0], [900, 205, 312, 61, 2.0], [1000, 206, 308, 62, 2.0],
    [1100, 208, 304, 60, 2.0], [1200, 212, 300, 54, 2.0], [1283, 217, 296, 48, 2.0]
  ], [ss_, sh_, sh_, sb_]);
  /* the dorsal spine from the hood to the fin (D side: its top at py 204) */
  var S_SPINE = conv([[495, 204, 225, 14, 2.2], [700, 203, 225, 13, 2.2], [880, 202, 225, 12, 2.2], [930, 198, 225, 9, 2.0]], [ss_, sh_, sh_, sb_]);
  var S_CAN = conv([
    [300, 215, 228, 18, 2.2], [330, 200, 228, 24, 2.3], [350, 192, 228, 26, 2.3], [380, 184, 228, 27, 2.4],
    [420, 183, 228, 27, 2.4], [450, 185, 228, 26, 2.4], [480, 195, 228, 21, 2.3], [500, 204, 228, 14, 2.2]
  ], [ss_, sh_, sh_, sb_]);
  var S_CONE = conv([[165, 0.5], [180, 7], [196, 12.5], [215, 15], [235, 10], [240, 1]], [ss_, sb_]);
  /* wing (D plan): LE px = 539 + 1.92 (b - 74), TE px = 983 + 0.98 (b - 154), tip b 340 */
  var S_SEMI = sb_(340), S_WH = sh_(287), S_ANH = Math.tan(1.5 * D2R);
  function sWingLE(y) { return ss_(539) + 1.92 * (y - sb_(74)); }
  function sWingTE(y) { return ss_(983) + 0.98 * (y - sb_(154)); }
  function sWingH(y) { return S_WH - y * S_ANH; }
  /* stabilator (D plan): LE 1050 + 1.83 (b - 34), TE 1283 + 0.55 (b - 34), tip b 160, py 270 */
  function sStabLE(y) { return ss_(1050) + 1.83 * (y - sb_(34)); }
  function sStabTE(y) { return ss_(1283) + 0.55 * (y - sb_(34)); }
  var S_FIN = conv([[204, 880, 1284], [197, 900, 1286], [184, 1000, 1294], [163, 1061, 1306], [130, 1115, 1324],
                    [100, 1165, 1340], [70, 1214, 1356], [50, 1248, 1366], [39, 1268, 1372]], [sh_, ss_, ss_]);

  function buildSu7(THREE, M, C) {
    V = THREE;
    var K = bucket(["body", "wing", "plain", "cone", "hot", "team", "metal", "ink", "glass"]);
    var G = bucket(["plain", "metal", "ink"]);
    var sd, L = 15.3;
    K.body.push(bodyGeo(S_FUS, S_FUS[0][0], S_FUS[S_FUS.length - 1][0], 40, 32, SX, SZ, L, false, false));
    K.body.push(bodyGeo(S_SPINE, S_SPINE[0][0], S_SPINE[S_SPINE.length - 1][0], 10, 16, SX, SZ, L, true, true));
    K.glass.push(bodyGeo(S_CAN, S_CAN[0][0], S_CAN[S_CAN.length - 1][0], 14, 22, SX, SZ, 1, true, true));
    var hA = sh_(272), lipS = ss_(196);
    K.metal.push(revGeo([[lipS - 0.01, 0.40], [lipS + 0.005, 0.475], [lipS + 0.06, 0.48]], lipS - 0.01, lipS + 0.06, 3, 32, SX, SZ, hA, 0, false, false));
    K.ink.push(revGeo([[lipS, 0.41], [lipS + 1.5, 0.37]], lipS, lipS + 1.5, 2, 28, SX, SZ, hA, 0, false, true));
    K.cone.push(revGeo(S_CONE, S_CONE[0][0], S_CONE[S_CONE.length - 1][0], 8, 24, SX, SZ, hA, 0, true, true));
    /* the jetpipe (D side px 1283; B: the heat-stained tail) */
    var nS = ss_(1283), nH = sh_(258);
    K.hot.push(revGeo([[nS - 0.8, 0.58], [nS, 0.55]], nS - 0.8, nS, 2, 28, SX, SZ, nH, 0, false, false));
    K.ink.push(revGeo([[nS - 0.02, 0.50], [nS - 0.7, 0.44]], nS - 0.7, nS - 0.02, 2, 24, SX, SZ, nH, 0, false, true));
    /* the pitot boom over the nose (D side px 40..193, py 231) */
    K.metal.push(rod([SX(ss_(200)), 0, SZ(sh_(229))], [SX(ss_(40)), 0, SZ(sh_(231))], 0.03, 6));
    /* canopy frames: the windscreen frame and the hood's rear bow */
    [352, 480].forEach(function (px) {
      var s = ss_(px), ht = tabC(S_CAN, s, 1), hb = sh_(228), hw = tabC(S_CAN, s, 3), prev = null, j;
      for (j = 0; j <= 8; j++) {
        var q = secPt(hw + 0.012, (ht + hb) / 2, (ht - hb) / 2 + 0.012, 2.4, lerp(0.05, PI - 0.05, j / 8));
        var P = [SX(s), q[0], SZ(q[1])];
        if (prev) K.metal.push(rod(prev, P, 0.02, 4));
        prev = P;
      }
    });
    /* wings */
    var r0 = sb_(50), ysW = [r0, sb_(74), sb_(120), sb_(170), sb_(220), sb_(270), sb_(310), S_SEMI - 0.004];
    var stW = ysW.map(function (y) { var le = sWingLE(y), te = sWingTE(y); return { y: y, le: le, te: te, h: sWingH(y), t: (te - le) * lerp(0.07, 0.05, y / S_SEMI) }; });
    for (sd = -1; sd <= 1; sd += 2) K.wing.push(liftGeo(stW, sd, SX, SZ, ss_(500), ss_(1170) - ss_(500), S_SEMI, 10));
    /* two fences a wing (D plan: at b 150 and 240) */
    for (sd = -1; sd <= 1; sd += 2) [sb_(150), sb_(240)].forEach(function (y) {
      var le = sWingLE(y), te = sWingTE(y), c = te - le;
      K.wing.push(box(c * 0.90, 0.02, 0.14, SX(le + c * 0.47), sd * y, SZ(sWingH(y) + c * 0.03 + 0.04)));
    });
    var ysS = [sb_(30), sb_(60), sb_(110), sb_(160), sb_(166)], stS = ysS.map(function (y) {
      var le = sStabLE(y), te = sStabTE(y); return { y: y, le: le, te: te, h: sh_(270), t: (te - le) * 0.04 };
    });
    for (sd = -1; sd <= 1; sd += 2) {
      K.plain.push(liftGeo(stS, sd, SX, SZ, 10, 3, 2, 8));
      /* the anti-flutter body on each tip, pointing FORWARD (D plan: a
         pointed rod from px 1240 to the tip leading edge at 1305, b 163) */
      K.metal.push(revGeo([[ss_(1240), 0.004], [ss_(1255), 0.035], [ss_(1290), 0.05], [ss_(1305), 0.03]], ss_(1240), ss_(1305), 6, 8, SX, SZ, sh_(270), sd * sb_(163), true, true));
    }
    K.plain.push(finGeo(S_FIN.map(function (r, i) { return { h: r[0], le: r[1], te: r[2], t: lerp(0.26, 0.09, i / (S_FIN.length - 1)) }; }), SX, SZ, 0, 10));
    /* two ventral drop tanks side by side (D side and head-on: px 469..834,
       0.52 m across, 0.33 m either side) on short pylons */
    for (sd = -1; sd <= 1; sd += 2) {
      var tS0 = ss_(469), tS1 = ss_(834), tR = 0.26, th = sh_(362), ty = 0.33;
      K.plain.push(revGeo([[tS0, 0.01], [tS0 + 0.5, tR * 0.8], [tS0 + 1.4, tR], [tS1 - 1.4, tR], [tS1 - 0.4, tR * 0.6], [tS1, 0.02]], tS0, tS1, 14, 14, SX, SZ, th, sd * ty, true, true));
      K.plain.push(box(1.6, 0.05, 0.20, SX((tS0 + tS1) / 2), sd * ty, SZ(th + tR + 0.06)));
      /* wing pylons (D plan: at b 110), empty */
      var pyb = sb_(110), ple = sWingLE(pyb);
      K.plain.push(box(1.5, 0.07, 0.20, SX(ple + 1.20), sd * pyb, SZ(sWingH(pyb) - 0.18)));
    }
    /* team: a band on each wing top inboard of the tip, one on the spine */
    for (sd = -1; sd <= 1; sd += 2) {
      var ty2 = sb_(285), tle = sWingLE(ty2), tte = sWingTE(ty2);
      K.team.push(box((tte - tle) * 0.85, 0.30, 0.02, SX((tle + tte) / 2), sd * ty2, SZ(sWingH(ty2) + (tte - tle) * 0.03 + 0.02)));
    }
    K.team.push(box(0.40, 0.30, 0.02, SX(ss_(760)), 0, SZ(sh_(203) + 0.02)));

    /* gear (retracts): nose wheel 0.59 m at px 432; mains 0.90 m at px 803
       (D side), in the wing at b 114 (the plan's wheel wells; NOT CONFIRMED) */
    var NX = ss_(432), NR = sb_(21.5), MXs = ss_(803), MR = sb_(33), MY = sb_(114);
    G.metal.push(rod([SX(NX - 0.15), 0, SZ(sh_(316))], [SX(NX + 0.03), 0, SZ(NR + 0.05)], 0.06, 8));
    G.ink.push(wheelY(NR, 0.20, SX(NX), 0, SZ(NR)));
    G.metal.push(cylY(0.12, 0.21, SX(NX), 0, SZ(NR), 10));
    for (sd = -1; sd <= 1; sd += 2) {
      G.plain.push(box(1.10, 0.03, 0.32, SX(NX + 0.40), sd * 0.24, SZ(sh_(318) - 0.14)));
      G.metal.push(rod([SX(MXs - 0.15), sd * (MY + 0.12), SZ(sWingH(MY) - 0.08)], [SX(MXs), sd * (MY + 0.12), SZ(MR + 0.04)], 0.075, 8));
      G.metal.push(rod([SX(MXs), sd * (MY + 0.12), SZ(MR)], [SX(MXs), sd * MY, SZ(MR)], 0.045, 6));
      G.ink.push(wheelY(MR, 0.24, SX(MXs), sd * MY, SZ(MR)));
      G.metal.push(cylY(0.18, 0.25, SX(MXs), sd * MY, SZ(MR), 12));
      G.plain.push(box(1.00, 0.03, sWingH(MY) - MR - 0.1, SX(MXs - 0.05), sd * (MY + 0.22), SZ((sWingH(MY) + MR) / 2)));
    }

    var mats = baseMats(C, S_PAL);
    mats.body = skinMat(sheet("su7body", S_PAL.skin, S_PAL.dk, [0.05, 0.16, 0.28, 0.42, 0.56, 0.70, 0.84], [0.25, 0.50, 0.75]), S_PAL.skin, S_PAL.rough, S_PAL.metal);
    mats.wing = skinMat(sheet("su7wing", S_PAL.skin, S_PAL.dk, [0.30, 0.62, 0.80], [0.35, 0.70]), S_PAL.skin, S_PAL.rough, S_PAL.metal);
    mats.cone = new V.MeshStandardMaterial({ color: S_PAL.cone, roughness: 0.6, metalness: 0.1, side: V.DoubleSide });
    mats.hot = new V.MeshStandardMaterial({ color: S_PAL.hot, roughness: 0.5, metalness: 0.55, side: V.DoubleSide });
    var root = new V.Group(); root.name = "su7bmk";
    emit(root, K, mats, ["body", "wing", "plain", "cone", "hot", "team", "metal", "ink", "glass"]);
    var gear = new V.Group(); gear.name = "gear";
    emit(gear, G, mats, ["plain", "metal", "ink"]);
    root.add(gear);
    return root;
  }

  /* ======================================================================
     5. MiG-23ML
     Side: the ML profile E at 0.010104 m/px, s = (px - 137) k aft of the
     radome tip, h = (501 - py) k above the main wheels' bottom. Plan: the
     MF three-view F at 0.012558 m/px, s = (px - 104) k, b = px k (centre
     py 928). Model x = 7.90 - s, z = h - 1.617 (the radome axis, E py 341).
     ====================================================================== */
  var FE = 0.010104, FF = 0.012558;
  function fs_(px) { return (px - 137) * FE; }
  function fh_(py) { return (501 - py) * FE; }
  function fps_(px) { return (px - 104) * FF; }
  function fb_(px) { return px * FF; }
  function FX(s) { return 7.90 - s; }
  function FZ(h) { return h - 1.617; }
  var F_PAL = { skin: "#8e979b", dk: "#7a8387", cone: "#b9bcb8", hot: "#5a5650", rough: 0.55, metal: 0.30 };
  var F_TOP = conv([[137, 341], [150, 333], [200, 318.7], [250, 304.7], [300, 293], [350, 285], [413, 279], [500, 275],
                    [580, 262], [620, 240], [700, 234], [900, 233], [1100, 234], [1300, 238], [1450, 241], [1600, 246], [1690, 258]], [fs_, fh_]);
  var F_BOT = conv([[137, 341], [150, 349], [200, 360], [250, 368], [300, 374.7], [350, 377], [400, 378.7], [500, 381],
                    [600, 383], [700, 384], [800, 386], [900, 388], [1100, 390], [1300, 390], [1450, 388], [1600, 380], [1690, 368]], [fs_, fh_]);
  var F_W = conv([[104, 1], [110, 7], [140, 16], [170, 22], [200, 27], [230, 31], [260, 33], [290, 35], [320, 36], [380, 37],
                  [440, 38], [470, 44], [530, 48], [700, 52], [850, 60], [990, 67], [1140, 65], [1250, 60], [1352, 53]], [fps_, fb_]);
  function fRows(s0, s1, n) {
    var o = [], k;
    for (k = 0; k <= n; k++) {
      var s = lerp(s0, s1, k / n);
      o.push([s, tabC(F_TOP, s, 1), tabC(F_BOT, s, 1), tabC(F_W, s, 1), s < 4.5 ? 2.0 : lerp(2.0, 2.8, clamp((s - 4.5) / 3, 0, 1))]);
    }
    return o;
  }
  var F_CAN = conv([[413, 280, 288, 0.22, 2.2], [440, 266, 288, 0.33, 2.3], [480, 248, 288, 0.39, 2.4], [527, 236, 288, 0.40, 2.4],
                    [570, 234, 288, 0.39, 2.4], [600, 235, 288, 0.36, 2.3]], [fs_, fh_, fh_]);
  /* the side intakes (E side: lip px 590, py 263..347; F plan: b 47..84) */
  var F_INT = [[fs_(590), fh_(263), fh_(347), 0.20, 4.5], [5.20, 2.43, 1.50, 0.23, 4.5], [6.20, 2.45, 1.45, 0.25, 4.0],
               [7.50, 2.45, 1.40, 0.20, 3.4], [9.00, 2.40, 1.42, 0.08, 3.0]];
  var F_GLE = conv([[70, 560], [84, 590], [112, 665], [132, 719], [145, 752]], [fb_, fps_]);
  var F_WH = fh_(258), F_ANH = Math.tan(3.6 * D2R), F_PIV = fb_(140), F_SEMI = fb_(556);
  function fWingLE(y) { return fps_(755) + 0.334 * (y - fb_(152)); }
  function fWingH(y) { return F_WH - Math.max(0, y - F_PIV) * F_ANH; }
  var F_STAB = conv([[58, 1130, 1371], [68, 1144, 1373], [120, 1219, 1385], [178, 1303, 1402], [198, 1332, 1387], [210, 1350, 1380], [221, 1365, 1373]], [fb_, fps_, fps_]);
  var F_FIN = conv([[240, 1185, 1695], [215, 1248, 1692], [190, 1312, 1695], [155, 1400, 1700], [120, 1467, 1705], [90, 1525, 1710],
                    [60, 1583, 1714], [40, 1621, 1716], [30, 1645, 1712]], [fh_, fs_, fs_]);
  var F_VENT = conv([[388, 1340, 1480], [420, 1372, 1480], [445, 1392, 1480], [458, 1404, 1476]], [fh_, fs_, fs_]);

  function buildMiG23(THREE, M, C) {
    V = THREE;
    var K = bucket(["body", "wing", "plain", "cone", "hot", "team", "metal", "ink", "glass"]);
    var G = bucket(["plain", "metal", "ink"]);
    var sd, L = 15.7;
    /* the dielectric radome (E side: tip px 137 to the joint at px 300),
       then the metal skin from the joint to the nozzle */
    var RJ = fs_(300), S0 = RJ, S1 = fs_(1690);
    K.body.push(bodyGeo(fRows(S0, S1, 40), S0, S1, 40, 30, FX, FZ, L, false, false));
    K.cone.push(bodyGeo(fRows(fs_(137) + 0.005, RJ, 12), fs_(137) + 0.005, RJ, 12, 30, FX, FZ, 1, true, false));
    K.glass.push(bodyGeo(F_CAN, F_CAN[0][0], F_CAN[F_CAN.length - 1][0], 14, 22, FX, FZ, 1, true, true));
    /* windscreen frame and canopy bows */
    [440, 527].forEach(function (px) {
      var s = fs_(px), ht = tabC(F_CAN, s, 1), hb = fh_(288), hw = tabC(F_CAN, s, 3), prev = null, j;
      for (j = 0; j <= 8; j++) {
        var q = secPt(hw + 0.012, (ht + hb) / 2, (ht - hb) / 2 + 0.012, 2.4, lerp(0.05, PI - 0.05, j / 8));
        var P = [FX(s), q[0], FZ(q[1])];
        if (prev) K.metal.push(rod(prev, P, 0.022, 4));
        prev = P;
      }
    });
    /* the pitot boom (E side px 19..137 on the axis) */
    K.metal.push(rod([FX(fs_(140)), 0, FZ(fh_(341))], [FX(fs_(19)), 0, FZ(fh_(343))], 0.025, 6));
    /* intakes, their dark faces and the splitter plates */
    for (sd = -1; sd <= 1; sd += 2) {
      K.body.push(bodyGeo(F_INT, F_INT[0][0], F_INT[F_INT.length - 1][0], 12, 20, FX, FZ, L, false, true, sd * 0.80));
      K.ink.push(box(0.04, 0.38, fh_(266) - fh_(344), FX(F_INT[0][0] + 0.03), sd * 0.80, FZ((fh_(266) + fh_(344)) / 2)));
      K.plain.push(box(1.30, 0.03, fh_(258) - fh_(352), FX(F_INT[0][0] + 0.55), sd * 0.565, FZ((fh_(258) + fh_(352)) / 2)));
    }
    /* the nozzle (E side px 1690, py 258..368) */
    var nS = fs_(1690), nH = fh_(313);
    K.hot.push(revGeo([[nS - 0.9, 0.58], [nS, 0.54]], nS - 0.9, nS, 2, 28, FX, FZ, nH, 0, false, false));
    K.ink.push(revGeo([[nS - 0.02, 0.49], [nS - 0.7, 0.42]], nS - 0.7, nS - 0.02, 2, 24, FX, FZ, nH, 0, false, true));
    /* the fixed gloves and the outer panels at 16 deg (F plan, starboard) */
    var glS = [fb_(55), fb_(70), fb_(84), fb_(112), fb_(132), fb_(145)].map(function (y) {
      var le = tabL(F_GLE, y, 1), te = fps_(960); return { y: y, le: le, te: te, h: F_WH, t: 0.20 * (te - le) / 4.0 };
    });
    var ysW = [F_PIV, fb_(200), fb_(280), fb_(360), fb_(440), fb_(520), F_SEMI - 0.004];
    var stW = ysW.map(function (y) { var le = fWingLE(y), te = fps_(972); return { y: y, le: le, te: te, h: fWingH(y), t: (te - le) * lerp(0.065, 0.055, (y - F_PIV) / (F_SEMI - F_PIV)) }; });
    for (sd = -1; sd <= 1; sd += 2) {
      K.wing.push(liftGeo(glS, sd, FX, FZ, fps_(560), fps_(980) - fps_(560), F_SEMI, 8));
      K.wing.push(liftGeo(stW, sd, FX, FZ, fps_(560), fps_(980) - fps_(560), F_SEMI, 10));
      K.plain.push(liftGeo(F_STAB.map(function (r) { return { y: r[0], le: r[1], te: r[2], h: fh_(225), t: (r[2] - r[1]) * 0.04 }; }), sd, FX, FZ, 10, 3, 3, 8));
    }
    K.plain.push(finGeo(F_FIN.map(function (r, i) { return { h: r[0], le: r[1], te: r[2], t: lerp(0.24, 0.08, i / (F_FIN.length - 1)) }; }), FX, FZ, 0, 10));
    K.plain.push(finGeo(F_VENT.map(function (r) { return { h: r[0], le: r[1], te: r[2], t: 0.08 }; }), FX, FZ, 0, 8));
    /* team: a band on each outer panel and one across the spine */
    for (sd = -1; sd <= 1; sd += 2) {
      var ty = fb_(470), tle = fWingLE(ty), tte = fps_(972);
      K.team.push(box((tte - tle) * 0.85, 0.32, 0.02, FX((tle + tte) / 2), sd * ty, FZ(fWingH(ty) + (tte - tle) * 0.03 + 0.02)));
    }
    K.team.push(box(0.40, 0.60, 0.02, FX(fs_(1000)), 0, FZ(fh_(233) + 0.02)));

    /* gear (retracts): twin nose wheels 0.50 m at E px 503 (the leg
       SHORTENED 0.09 m so the model sits level, see ATTITUDE); mains 0.81 m
       at E px 1103, track 2.85 m (G head-on), legs out of the fuselage sides */
    var NX = fs_(503), NR = fb_(20) * FE / FF, MXs = fs_(1103), MR = 40 * FE, MY = 1.425;
    NR = 25 * FE;
    G.metal.push(rod([FX(NX - 0.10), 0, FZ(fh_(381))], [FX(NX + 0.05), 0, FZ(NR)], 0.065, 8));
    for (sd = -1; sd <= 1; sd += 2) {
      G.ink.push(wheelY(NR, 0.18, FX(NX), sd * 0.17, FZ(NR)));
      G.metal.push(cylY(0.11, 0.19, FX(NX), sd * 0.17, FZ(NR), 10));
      G.plain.push(box(1.20, 0.03, 0.35, FX(NX + 0.35), sd * 0.30, FZ(fh_(382) - 0.16)));
      G.metal.push(rod([FX(MXs + 0.30), sd * 0.80, FZ(fh_(385))], [FX(MXs), sd * (MY - 0.15), FZ(MR + 0.10)], 0.08, 8));
      G.metal.push(rod([FX(MXs - 0.40), sd * 0.80, FZ(fh_(388))], [FX(MXs), sd * (MY - 0.15), FZ(MR + 0.25)], 0.05, 6));
      G.metal.push(rod([FX(MXs), sd * (MY - 0.15), FZ(MR)], [FX(MXs), sd * MY, FZ(MR)], 0.05, 6));
      G.ink.push(wheelY(MR, 0.28, FX(MXs), sd * MY, FZ(MR)));
      G.metal.push(cylY(0.17, 0.29, FX(MXs), sd * MY, FZ(MR), 12));
      G.plain.push(flatStrut([FX(MXs), sd * 0.95, FZ(fh_(392))], [FX(MXs), sd * (MY - 0.30), FZ(MR + 0.35)], 1.0, 0.03));
    }

    var mats = baseMats(C, F_PAL);
    mats.body = skinMat(sheet("mig23body", F_PAL.skin, F_PAL.dk, [0.06, 0.18, 0.30, 0.44, 0.58, 0.72, 0.86], [0.25, 0.50, 0.75]), F_PAL.skin, F_PAL.rough, F_PAL.metal);
    mats.wing = skinMat(sheet("mig23wing", F_PAL.skin, F_PAL.dk, [0.40, 0.70, 0.88], [0.30, 0.60]), F_PAL.skin, F_PAL.rough, F_PAL.metal);
    mats.cone = new V.MeshStandardMaterial({ color: F_PAL.cone, roughness: 0.6, metalness: 0.05, side: V.DoubleSide });
    mats.hot = new V.MeshStandardMaterial({ color: F_PAL.hot, roughness: 0.5, metalness: 0.55, side: V.DoubleSide });
    var root = new V.Group(); root.name = "mig23ml";
    emit(root, K, mats, ["body", "wing", "plain", "cone", "hot", "team", "metal", "ink", "glass"]);
    var gear = new V.Group(); gear.name = "gear";
    emit(gear, G, mats, ["plain", "metal", "ink"]);
    root.add(gear);
    return root;
  }

  /* ======================================================================
     6. Il-76TD: the one Il-76 airframe builder, HeroIl76 (js/hero/ru_a50.js),
     CALLED, not copied. Kind "il76" (anything but "a50" / "il78" in that
     builder): no rotodome, no UPAZ pods, solid nose, the gunner's station
     faired with no guns. star: null (no marking). paint "il78": light grey-
     white over a slightly darker grey belly, red-orange wing and tailplane
     tips. What HeroIl76 has no option for -- the navigator's glazed nose
     without the Il-78's UPAZ pods -- is added here ON its skin: each pane
     corner is found by casting a ray at the returned skin, so the panes sit
     3 cm proud of whatever surface that builder draws. Pane layout: the
     builder's own Il-78 grid (s 0.25..1.75 m, 104..256 deg from the roof).
     ====================================================================== */
  function buildIl76(THREE, M, C) {
    V = THREE;
    if (typeof HeroIl76 === "undefined" || !HeroIl76.build) return new V.Group();
    var root = HeroIl76.build(THREE, M, C, { kind: "il76", star: null, paint: "il78" });
    root.updateMatrixWorld(true);
    var targets = root.children.filter(function (c) { return c.isMesh; });
    var XN = 23.3, rc = new V.Raycaster();
    function hit(o, d) {
      rc.set(o, d); rc.near = 0; rc.far = 30;
      var h = rc.intersectObjects(targets, false);
      return h.length ? h[0].point : null;
    }
    /* the nose section centre at s: half way between roof and belly */
    function centreZ(x) {
      var up = hit(new V.Vector3(x, 0, 20), new V.Vector3(0, 0, -1)), dn = hit(new V.Vector3(x, 0, -20), new V.Vector3(0, 0, 1));
      return (up && dn) ? (up.z + dn.z) / 2 : 0;
    }
    function onSkin(s, deg, lift) {
      var x = XN - s, zc = centreZ(x), a = deg * D2R, d = new V.Vector3(0, Math.sin(a), Math.cos(a));
      var p = hit(new V.Vector3(x, d.y * 12, zc + d.z * 12), d.clone().negate());
      if (!p) return null;
      return [p.x, p.y + d.y * lift, p.z + d.z * lift];
    }
    var pos = [], nc = [104, 126, 148, 170, 190, 212, 234, 256], ns = [0.25, 0.75, 1.25, 1.75], i, j;
    for (i = 0; i < nc.length - 1; i++) for (j = 0; j < ns.length - 1; j++) {
      var s0 = ns[j] + 0.05, s1 = ns[j + 1] - 0.05, a0 = nc[i] + 2, a1 = nc[i + 1] - 2;
      var A = onSkin(s0, a0, 0.03), B = onSkin(s1, a0, 0.03), Cc = onSkin(s1, a1, 0.03), D = onSkin(s0, a1, 0.03);
      if (!A || !B || !Cc || !D) continue;
      pos.push(A[0], A[1], A[2], B[0], B[1], B[2], Cc[0], Cc[1], Cc[2], A[0], A[1], A[2], Cc[0], Cc[1], Cc[2], D[0], D[1], D[2]);
    }
    if (pos.length) {
      var g = new V.BufferGeometry();
      g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
      g.computeVertexNormals();
      var mg = new V.MeshStandardMaterial({ color: 0x223040, roughness: 0.12, metalness: 0.50, transparent: true, opacity: 0.86, side: V.DoubleSide });
      var mesh = new V.Mesh(g, mg);
      root.add(mesh);
    }
    root.name = "il76td";
    return root;
  }

  return { yak9p: buildYak9, po2: buildPo2, mig21pfm: buildMiG21, su7bmk: buildSu7, mig23ml: buildMiG23, il76td: buildIl76 };
})();

/* len: each model's measured X extent (see the header for what ends it) */
(function () {
  var ROWS = {
    kpa_e50_fighter:   [8.59,  "yak9p"],
    kpa_e50_transport: [8.22,  "po2"],
    kpa_e60_fighter:   [14.70, "mig21pfm"],
    kpa_e60_cas:       [18.24, "su7bmk"],
    kpa_e80_fighter:   [17.49, "mig23ml"],
    kpa_e90_transport: [46.5,  "il76td"]
  };
  function reg(key) {
    var r = ROWS[key];
    UNIT_MODELS[key] = { len: r[0], build: function (T, M, C) { return HeroKpaAir2[r[1]](T, M, C); } };
  }
  for (var k in ROWS) reg(k);
})();
