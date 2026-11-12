/* ============ redo_bombers.js -- V-bombers, the Mirage IV and the MiG-29K (HERO MODELS) ============

   Six rows that were still drawn by the generic air builder (heavyair.js vforce()/mirage4(),
   units3d_air2.js fighter()), redrawn from line drawings and photographs:
     gbr_e50_heavybomber  "Vickers Valiant B.1"           REUSED: HeroVForce.valiant (gb_vforce.js)
     gbr_e60_heavybomber  "Avro Vulcan B.2"               NEW, variant "e60" (anti-flash white)
     gbr_e80_heavybomber  "Avro Vulcan B.2 (Black Buck)"  NEW, variant "e80" (plain dark finish)
     fra_e60_heavybomber  "Dassault Mirage IVA"           NEW, variant "IVA" (natural metal, AN-11)
     fra_e80_heavybomber  "Dassault Mirage IVP"           NEW, variant "IVP" (plain grey)
     cfighter_k           "MiG-29K (notional)"            NEW (see THE MiG-29K, why not MiG29Hero)

   Model space +X nose, +Y port, +Z up, metres; d below is metres aft of a type's datum (named at
   each type) and X = NOSE - d. One mesh per material at the root, the landing gear in a group named
   "gear", the MiG-29K's outer wings in two groups named "wingfold". No roundels, fin flashes,
   serials, codes or stars; the team colour, exactly C.team, as small panels on the upper wings.
   Paint is a canvas sheet laid on by the face normal (panel lines, rivet rows, mottled weathering,
   grime streaks running aft, exhaust soot), one plain finish per variant: no camouflage patterns.
   AIR-TO-AIR REFUELLING: every row here is a probe receiver (js/aar_specs.js); each model carries an
   empty node "aar_probe" at its probe tip, which render3d.js drawAAR flies the drogue onto.

   Load order: after js/hero/gb_vforce.js (the Valiant is its builder). Nothing else.

   ==========================================================================================
   VICKERS VALIANT B.1 (gbr_e50_heavybomber)
   ------------------------------------------------------------------------------------------
   The airframe is gb_vforce.js's Valiant B(K).1 (measured there off "Vickers Valiant.svg"; all the
   Valiants were one airframe, the B(K).1 a bomber that could take the tanker kit in the bay, and that
   model draws the bay closed). Called, not copied. Added here, from the same drawing VA and the
   photographs VC ("Wikivaliant.jpg", XD818 port side) and VD ("Vickers Valiant (27363801724).jpg")
   of gb_vforce.js:
     - the bomb-bay doors, painted as seams on the belly: VA side draws the bay as the long panel
       under the fuselage from x 240 to 575 (d 7.8 to 19.7 at VA's 28.07 px/m);
     - the round crew entrance door on the port side, VA side x 147..172, y 178..214 (0.9 x 1.28 m,
       centre d 4.94, z -0.2), and the two small port windows behind it (x 181 round, x 210..225);
     - the visual bomb-aimer's blister under the nose (VA x 125..150, below the nose loft);
     - the blade aerial under the nose (VA x 180..195) and the row of vortex generators on each outer
       wing (VA plan: ten small marks at y 11.9..13.5 m, d 15.6..16.5);
     - the "aar_probe" node at the probe tip (gb_vforce.js draws the probe: d -0.47, z 0.23).
   NOT CONFIRMED: which side the two small windows are on beyond the port side VA shows (drawn on
   the port side only); the bay door split line (one centre seam drawn).

   ==========================================================================================
   AVRO VULCAN B.2 (gbr_e60_heavybomber, gbr_e80_heavybomber)
   ------------------------------------------------------------------------------------------
   REFERENCES (Wikimedia Commons, fetched at 1400 px through commons thumb.php)
     A  "Avro Vulcan B.2 3-view line drawing.svg" (1400 x 1455): side above, plan below, head-on to
        the right. Side: probe tip x 17, nose (the blunt radome) x 63, tail cone x 1093, fin top y 20;
        the wheels drawn as circles over a ground line at y 318 (nose x 345; mains x 646 / 673). Plan:
        centreline y 853, tips y 267 / 1439; the kinked phase-2C leading edge; the intakes in the root
        leading edge; four jet pipes at the trailing edge; the elevons. Head-on: the letterbox intakes
        two per side, the flat underside, the tapering wing, the main bogies four wheels abreast.
     B  "Avro Vulcan XM603 at Woodford-Cheshire-UK.jpg": a B.2 in anti-flash white, front three-
        quarter: the black radome on the lower nose, the canopy and its eyebrow windows, the stance.
     C  "XM607 SIDE VIEW.JPG": the Black Buck 1 aircraft at Waddington, starboard three-quarter: the
        disruptive dark green / dark sea grey uppers, eight-wheel bogies, twin nose wheels, the probe,
        the bulged ECM tail cone, the jet pipes, the main gear doors.
     Published (en.wikipedia "Avro Vulcan", B.2 column): length 105 ft 6 in (32.16 m) with the probe,
        99 ft 11 in (30.45 m) without; span 111 ft (33.83 m); height 27 ft 1 in (8.26 m); B.2s from the
        second (XH534) on with the probe and the bulged ECM tail cone; deepened intakes from the 11th.
   SCALE: A along the aircraft 1030 px nose to tail (30.45 m: 33.83 px/m) and 1076 px probe to tail
     (32.16 m: 33.46 px/m) differ by 1.1 per cent; the mean, 33.6 px/m, is used for every chordwise
     and vertical figure (30.65 m without the probe, +0.7 per cent; 32.02 m with it, -0.4). Across,
     the plan's 1172 px tip to tip is read as the published span, 34.64 px/m.
     d = (x - 63) / 33.6 aft of the radome; z = (200 - y) / 33.6 (the probe line); y = (853 - y) / 34.64.
   STANCE: A's wheels stand on the line y 318: ground z = -3.51, belly 2.09 m clear. That gives 8.89 m
     to the fin top with the aircraft level, against the published 8.26 m. NOT fitted: the Vulcan sat
     nose-up on its long nose leg (en.wikipedia: the nose leg was lengthened "to give a ground
     incidence of 3.5 deg"), and 3.5 deg about the mains lowers the fin top, 9 m aft of them, by
     0.55 m, which accounts for the difference. The model is drawn level (the rule of js/hero/ru_il10.js).
   RECOGNITION LIST (each drawn; where it shows)
     1. the blunt nose with the black H2S radome over its lower half and the probe above it (A, B, C)
     2. the raised cockpit canopy with its small glazed windscreen and round eyebrow windows, the two
        round crew windows lower down, the bomb-aimer's blister under the cabin (A side and plan, B)
     3. the thick delta: kinked leading edge measured station by station off A plan; flat underside,
        thickness taken off A head-on (2.45 m at the root to 0.1 m at the tip)
     4. the letterbox intakes in the root leading edge, two per side with the splitter (A head-on)
     5. four jet pipes in pairs at the trailing edge with their upper-surface fairings (A plan)
     6. the swept fin with its dorsal fillet and tip fairing; the bulged ECM tail cone, the fairing at
        the fin root and the one under the tail cone (A side, C)
     7. the eight elevons, the airbrake panels over the engines, the bomb-bay doors under the centre
        section box (A plan: the box between the spars, d 12.9 to 22.3) - seams
     8. gear: twin nose wheels at d 8.39; eight-wheel bogies (two axles of four abreast) at d 17.75,
        legs at +-5.07 m (A side circles, A head-on)                                        ["gear"]
     9. two blade aerials on the spine (A side x 395, x 455)
    10. paint: e60 anti-flash white, weathered; e80 one plain dark green-grey, the mid tone of the
        uppers of C - the disruptive pattern is NOT drawn (no camouflage patterns)
   VARIANTS: the e80 row is the Black Buck bomber (air_specs.js), not the K.2 tanker, so the airframe
     is the same; only the finish differs. The Black Buck aircraft's AN/ALQ-101 pod on the starboard
     Skybolt point is NOT drawn: no photograph of it was found (Commons "Vulcan XM607" searched).
   NOT CONFIRMED: the main-gear track (+-5.07 m off A head-on, not published here); the wing's
     upper-surface curve between the stations A head-on gives; the airbrake sizes (A plan, 0.4 x 0.95 m);
     the wheel width; the bay door width (+-0.9 m, by eye).

   ==========================================================================================
   DASSAULT MIRAGE IVA / IVP (fra_e60_heavybomber, fra_e80_heavybomber)
   ------------------------------------------------------------------------------------------
   REFERENCES
     D  "Dassault Mirage IV Line Drawing.svg" (1400 x 1025): side view above, upper and lower plans
        drawn at 30 deg, a head-on. Side: probe tip x 172, nozzle x 1225, fin top-rear corner x 1248;
        the plan was turned square (59.6 deg) before measuring: probe tip x 30, fin tip 1081,
        centreline y 621, wing tips y 353 / 892.
     E  "Mirage IVA (16830897808).jpg": a IVA side-on on the runway, gear down, two 2500 l tanks:
        the stance, the long nose probe, the canopy, the intake, the fin.
     F  "Mirage IVP (17018657405).jpg": a IVP head-on three-quarter, plain grey: the half-cone
        intakes, the twin nose wheels, the main bogies.
     G  "Dassault Mirage IVP, France - Air Force AN0758316.jpg": a IVP lifting off: the two nozzles
        side by side, the four-wheel bogies (two axles, two abreast), the tanks under the inner wing.
     H  "Mirage IVA n29 - Cote gauche.jpg": a IVA in natural metal on a plinth.
     Published (en.wikipedia "Dassault Mirage IV"): length 23.49 m, span 11.85 m, height 5.4 m; a
        refuelling probe built into the nose; the early IVA's recess under the engines for one AN-11
        or AN-22; 2500 l drop tanks; "in 1975 all Mirage IVs were progressively painted in a new
        green/grey camouflage scheme".
   SCALE: D's views disagree a little. Side: 1076 px probe to fin tip = 23.49 m, 45.8 px/m
     (d = (x - 172) / 45.8, z = (168 - y) / 45.8); plan along: 1051 px = 23.49 m, 44.74 px/m; plan
     across: 539 px tip to tip = 11.85 m, 45.5 px/m.
   STANCE, off E at one station: E stands 5.36 m from the fin top to the ground (269 px at 50.15 px/m,
     its probe-to-fin length), the published 5.4 m; with D's fin top at z 3.28 the ground is z -2.08.
     E shows the aircraft about 4 deg nose-up on its gear (its probe sits 51 px above the nozzle line
     where D puts it 0.7 m below): the model is drawn level, the mains at their drawn place and the
     nose leg long enough to reach the ground (the js/hero/ru_il10.js rule).
   RECOGNITION LIST
     1. the long pointed nose ending in the refuelling probe (D, E)             [skin, metal]
     2. the low canopy flush with the spine, the navigator's small windows (D, E)    [glass]
     3. the D-shaped intakes with the half-cone shock bodies, at d 9.37 (D side, E, F)  [metal, ink]
     4. the 60 deg delta, measured off D plan; the unswept trailing edge, two elevons each side
     5. the tall swept fin with its square top (D side, E)
     6. the two Atar nozzles side by side, the rear fuselage between (D, G)
     7. the two 2500 l tanks under the inner wing (E, G)
     8. IVA: the AN-11 half-sunk in its recess under the engines (D side x 860..1060)
     9. gear: twin nose wheels; four-wheel bogies, two axles of two abreast (E, F, G)   ["gear"]
    10. paint: IVA natural metal (H; before the 1975 camouflage); IVP one plain grey sampled off F
        and G (#727270 mid-tone) - the green/grey pattern is NOT drawn
   NOT CONFIRMED: the main-gear track (+-1.85 m, by eye off F); the tank stations (+-2.45 m, by eye
     off G); the wing thickness (4 per cent); the IVP's ASMP and its deep centreline pylon, and the
     Barax / BOZ pods (no photograph of them found): NOT drawn; the IVP's recess is shown empty.

   ==========================================================================================
   MiG-29K (cfighter_k, "MiG-29K (notional)")
   ------------------------------------------------------------------------------------------
   WHY NOT MiG29Hero (js/hero/pact_e90_fighter.js): that builder draws the 9.12/9.13 airframe in one
     merged mesh with the 11.36 m wing, the overwing LERX louvres and a single nose wheel. The K has
     a larger wing (11.99 m, 45 m2) that folds, no louvres, a twin-wheel nose leg, an arrestor hook and
     a retractable probe; none of that can be drawn from the 9.12 mesh without editing its file.
   REFERENCES
     K1 "MiG-29K 9.41.jpg" (1400 x 2571; 2010 four-view by M. Wojciechowski, the MAKS 2007 aircraft 941):
        side, plan, head-on. Side 74.3 px/m (pitot tip x 1310 to stabilator tip x 22 = 17.37 m,
        d = (1310 - x) / 74.3, z = (787 - y) / 74.3); plan 74.0 px/m (d = (x - 15) / 74, y =
        (1983 - y) / 74). Drawn with the two-seat canopy of the KUB; the single-seat canopy is drawn
        here from K2, K3 (the airframe is otherwise the same).
     K2 "MiG-29K at MAKS-2007 airshow (3).jpg": single-seat 941 from below, gear and hook down: the
        twin nose wheels, the hook, the large wing, the stabilators.
     K3 "Russian Navy, 941, Mikoyan-Gurevich MiG-29K (37374132935).jpg": parked, port three-quarter:
        the single-seat canopy, the IRST ball offset to starboard, the hump behind the canopy.
     K4 "MiG-29K on the MAKS-2009 (02).jpg": head-on with the outer wings folded up.
     K5 "Mikoyan-Gurevich MiG-29K 'RF-92324 - 48 blue' (36928677816).jpg": the folded wing, the
        fold joint, the tail, the nozzles.
     Published (en.wikipedia "Mikoyan MiG-29K"; ru.wikipedia "MiG-29K" for the folded span): length
        17.3 m (ru 17.37), span 11.99 m, 7.40 m folded, height 4.4 m, wing area 45 m2; reinforced and
        widened undercarriage, folding wings, arrestor hook, a retractable refuelling probe.
   STANCE: K1 draws the wheels on y 912: ground z -1.68; fin top 4.30 m above the ground against the
     published 4.4 m (not fitted).
   RECOGNITION LIST
     1. the drooped radome, the single bubble canopy and the hump spine behind it (K1 side, K3)
     2. the ogival LERX blending into the flat lifting body (K1 plan); NO overwing louvres (K1, K3)
     3. the separated nacelles with raked intakes under the LERX (K1 side, K4)
     4. the 43.6 deg wing out to 11.99 m (K1 plan), the outer panels folding up about a hinge at
        +-3.65 m, set so that the folded span is the published 7.40 m (K4)            ["wingfold"]
     5. twin fins canted 6 deg out at +-1.70 m (K1 plan; the angle and station of MiG29Hero's own
        measurement); stabilators with 3 deg anhedral (K1 side)
     6. the arrestor hook stowed between the nozzles (K1 side, K2)
     7. gear: twin nose wheels at d 7.0, single mains at d 10.9 (K1 side, K2)            ["gear"]
     8. the IRST ball ahead of the windscreen to starboard (K3); the probe bay on the port side of
        the nose (the probe is drawn stowed; "aar_probe" is placed at its extended tip)
     9. pylons, with an R-77 inboard and an R-73 on the middle station (weapons shown beside the K in K4)
    10. paint: one plain blue-grey (the row's "bluegrey"; KPA notional), grey radome, dark anti-glare
   NOT CONFIRMED: the fold hinge station (set from the published folded span, not measured); the
     extended probe's tip (d 2.75, y 0.60, z 1.05, by eye); the main track (MiG-29's 3.09 m kept; the K
     is said to be wider); the loadout; the canopy outline (by proportion off K3 against K1's nose).
     tools/jsc/wingfold_check.js lists the folding types and their published spans in PUB: this row
     needs `cfighter_k: [11.99, 7.40]` there (the stabilators, 7.8 m, do not fold).
   ========================================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRedoBombers = (function () {
  "use strict";
  var V = null, PI = Math.PI, NOSE = 0;
  function X(d) { return NOSE - d; }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function cr1(p0, p1, p2, p3, t) {
    var t2 = t * t, t3 = t2 * t;
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
  }
  /* piecewise-linear lookup in a table [[x, a, b, ...]] */
  function pl(tab, x, col) {
    var i, c = col || 1;
    if (x <= tab[0][0]) return tab[0][c];
    for (i = 0; i + 1 < tab.length; i++) if (x <= tab[i + 1][0]) {
      return lerp(tab[i][c], tab[i + 1][c], (x - tab[i][0]) / (tab[i + 1][0] - tab[i][0]));
    }
    return tab[tab.length - 1][c];
  }

  /* ---------------- geometry kit (after js/hero/gb_vforce.js and js/hero/ru_tu16.js) ---------------- */
  function loft(rings, open) {
    var n = rings[0].length, pos = [], idx = [], i, j, r, a, b, c, d;
    for (r = 0; r < rings.length; r++) for (j = 0; j < n; j++) pos.push(rings[r][j][0], rings[r][j][1], rings[r][j][2]);
    for (r = 0; r + 1 < rings.length; r++) for (j = 0; j < n; j++) {
      a = r * n + j; b = r * n + (j + 1) % n; c = (r + 1) * n + j; d = (r + 1) * n + (j + 1) % n;
      idx.push(a, b, c, b, d, c);
    }
    if (!open) [0, rings.length - 1].forEach(function (e) {
      var cx = 0, cy = 0, cz = 0;
      for (j = 0; j < n; j++) { cx += rings[e][j][0]; cy += rings[e][j][1]; cz += rings[e][j][2]; }
      var ci = pos.length / 3; pos.push(cx / n, cy / n, cz / n);
      for (j = 0; j < n; j++) { var p = e * n + j, q = e * n + (j + 1) % n; if (e === 0) idx.push(ci, q, p); else idx.push(ci, p, q); }
    });
    var vol = 0, mx = 0, my = 0, mz = 0, np = pos.length / 3;
    for (i = 0; i < np; i++) { mx += pos[3 * i]; my += pos[3 * i + 1]; mz += pos[3 * i + 2]; }
    mx /= np; my /= np; mz /= np;
    for (i = 0; i < idx.length; i += 3) {
      var A = idx[i] * 3, B = idx[i + 1] * 3, Cc = idx[i + 2] * 3;
      var ax = pos[A] - mx, ay = pos[A + 1] - my, az = pos[A + 2] - mz;
      var bx = pos[B] - mx, by = pos[B + 1] - my, bz = pos[B + 2] - mz;
      var qx = pos[Cc] - mx, qy = pos[Cc + 1] - my, qz = pos[Cc + 2] - mz;
      vol += ax * (by * qz - bz * qy) - ay * (bx * qz - bz * qx) + az * (bx * qy - by * qx);
    }
    if (vol < 0) for (i = 0; i < idx.length; i += 3) { var t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* a body of revolution along x: prof [d, r], centre (cy(d), cz(d)), height factor k */
  function lathe(prof, N, cfun, k, open) {
    return loft(prof.map(function (q) {
      var c = cfun(q[0]), r = Math.max(q[1], 0.004), ring = [], j;
      for (j = 0; j < N; j++) { var t = j / N * 2 * PI; ring.push([X(q[0]), c[0] + r * Math.cos(t), c[1] + r * (k || 1) * Math.sin(t)]); }
      return ring;
    }), open);
  }
  function at(y, z) { return function () { return [y, z]; }; }
  function rod(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], Ln = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r, r, Ln, seg || 8, 1, true);
    var q = new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / Ln, dy / Ln, dz / Ln));
    var m = new V.Matrix4().makeRotationFromQuaternion(q);
    m.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(m); return g;
  }
  function ell(rx, ry, rz, x, y, z, ws, hs) {
    var g = new V.SphereGeometry(1, ws || 14, hs || 9);
    g.scale(rx, ry, rz); g.translate(x, y, z); return g;
  }
  function box(sx, sy, sz, x, y, z) { var g = new V.BoxGeometry(sx, sy, sz); g.translate(x, y, z); return g; }
  function cylY(r, w, x, y, z, seg) { var g = new V.CylinderGeometry(r, r, w, seg || 18, 1); g.translate(x, y, z); return g; }
  function cylX(r, w, x, y, z, seg) { var g = new V.CylinderGeometry(r, r, w, seg || 16, 1); g.rotateZ(PI / 2); g.translate(x, y, z); return g; }
  /* a disc facing +-x (normal along x) */
  function discX(r, x, y, z, n) { var g = new V.CircleGeometry(r, n || 18); g.rotateY(PI / 2); g.translate(x, y, z); return g; }
  /* a disc facing +-y */
  function discY(rx, rz, x, y, z, n) { var g = new V.CircleGeometry(1, n || 18); g.rotateX(PI / 2); g.scale(rx, 1, rz); g.translate(x, y, z); return g; }
  /* a sheet through a grid of points (double-sided materials) */
  function sheet(rows) {
    var pos = [], i, j;
    for (i = 0; i + 1 < rows.length; i++) for (j = 0; j + 1 < rows[i].length; j++) {
      [rows[i][j], rows[i + 1][j], rows[i + 1][j + 1], rows[i][j], rows[i + 1][j + 1], rows[i][j + 1]].forEach(function (p) {
        pos.push(p[0], p[1], p[2]);
      });
    }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  function chain(K, pts, r, seg) { for (var i = 0; i + 1 < pts.length; i++) K.push(rod(pts[i], pts[i + 1], r, seg || 5)); }
  /* a panel line: a thin 3-sided rod through points lying just proud of the skin */
  function seam(L, pts) { chain(L, pts, 0.016, 3); }
  /* a thin plate in the xz plane (a blade aerial, a fence) from an outline [[d, z]] at y */
  function plate(L, ol, y, t) {
    L.push(loft([ol.map(function (q) { return [X(q[0]), y + t / 2, q[1]]; }), ol.map(function (q) { return [X(q[0]), y - t / 2, q[1]]; })]));
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
  function split(g, rule, A, B) {
    var ng = g.index ? g.toNonIndexed() : g, p = ng.attributes.position.array, n = ng.attributes.normal.array;
    var pa = [], na = [], pb = [], nb = [], t, k;
    for (t = 0; t < p.length; t += 9) {
      var cx = (p[t] + p[t + 3] + p[t + 6]) / 3, cy = (p[t + 1] + p[t + 4] + p[t + 7]) / 3, cz = (p[t + 2] + p[t + 5] + p[t + 8]) / 3;
      var to = rule(cx, cy, cz) ? [pa, na] : [pb, nb];
      for (k = 0; k < 9; k++) { to[0].push(p[t + k]); to[1].push(n[t + k]); }
    }
    function mk(P, Nn) {
      var o = new V.BufferGeometry();
      o.setAttribute("position", new V.Float32BufferAttribute(P, 3));
      o.setAttribute("normal", new V.Float32BufferAttribute(Nn, 3));
      return o;
    }
    if (pa.length) A.push(mk(pa, na));
    if (pb.length) B.push(mk(pb, nb));
  }
  function yt(f, tc) { return tc * (1.4845 * Math.sqrt(f) - 0.6300 * f - 1.7580 * f * f + 1.4215 * f * f * f - 0.5075 * f * f * f * f); }
  function foil(m, tc, cam) {
    var p = [], i, f;
    for (i = 0; i <= m; i++) { f = 0.5 * (1 - Math.cos(PI * i / m)); p.push([f, cam * 4 * f * (1 - f) + yt(f, tc)]); }
    for (i = m - 1; i >= 1; i--) { f = 0.5 * (1 - Math.cos(PI * i / m)); p.push([f, cam * 4 * f * (1 - f) - yt(f, tc)]); }
    return p;
  }
  function xform(g, m) { g.applyMatrix4(m); return g; }

  /* ---------------- type-independent parts ---------------- */
  /* fuselage table rows [d, half width, top z, bottom z, superellipse power] */
  function Fus(rows, N, step) {
    var T = rows.map(function (r) { return [r[0], r[1], (r[2] - r[3]) / 2, (r[2] - r[3]) / 2, (r[2] + r[3]) / 2, r[4] || 2]; });
    function atD(d) {
      var k = 0, q, n = T.length;
      for (q = 0; q < n - 1; q++) if (T[q][0] <= d) k = q;
      var A = T[k], B = T[Math.min(k + 1, n - 1)], t = clamp((d - A[0]) / Math.max(1e-6, B[0] - A[0]), 0, 1);
      var p0 = T[Math.max(0, k - 1)], p3 = T[Math.min(n - 1, k + 2)], r = [d], c;
      for (c = 1; c < 6; c++) r.push(cr1(p0[c], A[c], B[c], p3[c], t));
      r[1] = Math.max(0.02, r[1]); r[2] = Math.max(0.02, r[2]); r[3] = Math.max(0.02, r[3]);
      return r;
    }
    function sg(v, e) { return (v < 0 ? -1 : 1) * Math.pow(Math.abs(v), e); }
    function pt(s, t) {
      var e = 2 / s[5], c = Math.cos(t), sn = Math.sin(t);
      return [X(s[0]), s[1] * sg(c, e), s[4] + (sn >= 0 ? s[2] : s[3]) * sg(sn, e)];
    }
    var D0 = T[0][0], L = T[T.length - 1][0];
    return {
      at: atD, pt: pt, L: L,
      top: function (d) { var s = atD(d); return s[4] + s[2]; },
      bot: function (d) { var s = atD(d); return s[4] - s[3]; },
      hw: function (d) { return atD(d)[1]; },
      /* the skin z at a lateral offset y, upper (+1) or lower (-1) */
      zAt: function (d, y, up) {
        var s = atD(d), e = s[5], u = clamp(Math.abs(y) / s[1], 0, 1);
        return s[4] + up * (up > 0 ? s[2] : s[3]) * Math.pow(Math.max(0, 1 - Math.pow(u, e)), 1 / e);
      },
      geo: function () {
        var D = [], d;
        [0, 0.03, 0.08, 0.16, 0.28, 0.45, 0.7, 1.0, 1.35].forEach(function (v) { D.push(D0 + v); });
        for (d = D0 + 1.8; d < L - 1.0; d += (step || 0.5)) D.push(d);
        [L - 1.0, L - 0.6, L - 0.3, L - 0.12, L].forEach(function (v) { D.push(v); });
        return loft(D.map(function (dd) {
          var s = atD(dd), r = [], j;
          for (j = 0; j < (N || 28); j++) r.push(pt(s, j / (N || 28) * 2 * PI));
          return r;
        }));
      }
    };
  }
  /* wing rows [y, LE d, TE d, t/c]; wz(y) the chord-plane height */
  function Wing(rows, wz, cam, m) {
    function atY(y) {
      var i, a, b, t; y = Math.abs(y);
      if (y <= rows[0][0]) return rows[0];
      for (i = 1; i < rows.length; i++) if (rows[i][0] >= y) {
        a = rows[i - 1]; b = rows[i]; t = (y - a[0]) / (b[0] - a[0]);
        return [y, lerp(a[1], b[1], t), lerp(a[2], b[2], t), lerp(a[3], b[3], t)];
      }
      return rows[rows.length - 1];
    }
    function stations(y0, y1) {
      var out = [];
      rows.forEach(function (r) { if (r[0] >= y0 - 1e-6 && r[0] <= y1 + 1e-6) out.push(r); });
      if (!out.length || out[0][0] > y0 + 1e-6) out.unshift(atY(y0));
      if (out[out.length - 1][0] < y1 - 1e-6) out.push(atY(y1));
      return out;
    }
    return {
      rows: rows, at: atY, wz: wz, tip: rows[rows.length - 1][0],
      skinZ: function (y, f, up) {
        var w = atY(y), c = w[2] - w[1];
        return wz(Math.abs(y)) + ((cam || 0) * 4 * f * (1 - f) + up * yt(f, w[3])) * c;
      },
      /* the half wing on side s, or its span from y0 to y1 */
      geo: function (s, y0, y1) {
        var st = (y0 === undefined) ? rows : stations(y0, y1);
        return loft(st.map(function (r) {
          var c = r[2] - r[1];
          return foil(m || 12, r[3], cam || 0).map(function (p) { return [X(r[1] + p[0] * c), s * r[0], wz(r[0]) + p[1] * c]; });
        }));
      }
    };
  }
  /* a fin: rows [z, LE d, TE d, t/c] at y 0 */
  function finGeo(rows) {
    return loft(rows.map(function (f) {
      var c = f[2] - f[1];
      return foil(10, f[3], 0).map(function (p) { return [X(f[1] + p[0] * c), p[1] * c, f[0]]; });
    }));
  }
  /* a tailplane half: rows [y, LE d, TE d], root height z0, dihedral (deg), t/c root and tip */
  function stabGeo(rows, s, z0, dih, tc0, tc1) {
    var tn = Math.tan(dih * PI / 180), y0 = rows[0][0], y1 = rows[rows.length - 1][0];
    return loft(rows.map(function (st) {
      var c = st[2] - st[1], tc = lerp(tc0, tc1, (st[0] - y0) / (y1 - y0));
      return foil(9, tc, 0).map(function (p) { return [X(st[1] + p[0] * c), s * st[0], z0 + tn * (st[0] - y0) + p[1] * c]; });
    }));
  }
  /* points along a wing's upper (up 1) or lower (-1) skin at chord fraction f, from y0 to y1 */
  function spanLine(W, s, y0, y1, f, up, n, lift) {
    var pts = [], i;
    for (i = 0; i <= n; i++) {
      var y = lerp(y0, y1, i / n), w = W.at(y);
      pts.push([X(w[1] + f * (w[2] - w[1])), s * y, W.skinZ(y, f, up) + up * (lift || 0.02)]);
    }
    return pts;
  }
  /* points along a chord at span y from f0 to f1 */
  function chordLine(W, s, y, f0, f1, up, n, lift) {
    var pts = [], i, w = W.at(y);
    for (i = 0; i <= n; i++) {
      var f = lerp(f0, f1, i / n);
      pts.push([X(w[1] + f * (w[2] - w[1])), s * y, W.skinZ(y, f, up) + up * (lift || 0.02)]);
    }
    return pts;
  }
  /* a rectangular panel outline on a wing skin, chord fractions f0..f1, span y0..y1 */
  function wingPanel(L, W, s, y0, y1, f0, f1, up) {
    seam(L, spanLine(W, s, y0, y1, f0, up, 4));
    seam(L, spanLine(W, s, y0, y1, f1, up, 4));
    seam(L, chordLine(W, s, y0, f0, f1, up, 3));
    seam(L, chordLine(W, s, y1, f0, f1, up, 3));
  }
  /* the team panel on an upper wing: a 3 x 3 patch a few cm over the skin */
  function teamPanel(L, W, s, y0, y1, f0, f1) {
    var rows = [], i, j;
    for (i = 0; i <= 3; i++) {
      var y = lerp(y0, y1, i / 3), w = W.at(y), c = w[2] - w[1], r = [];
      for (j = 0; j <= 3; j++) { var f = lerp(f0, f1, j / 3); r.push([X(w[1] + f * c), s * y, W.skinZ(y, f, 1) + 0.04]); }
      rows.push(r);
    }
    L.push(sheet(rows));
  }
  /* a fuselage panel line: a ring at station d from angle a0 to a1 (radians, 0 = port side, PI/2 top) */
  function ringSeam(L, F, d, a0, a1, n, lift) {
    var s = F.at(d), pts = [], i, k = 1 + (lift || 0.012) / Math.max(0.1, Math.min(s[1], s[2]));
    for (i = 0; i <= n; i++) {
      var p = F.pt(s, lerp(a0, a1, i / n));
      pts.push([p[0], p[1] * k, s[4] + (p[2] - s[4]) * k]);
    }
    seam(L, pts);
  }
  /* a fuselage line at a fixed angle a along d0..d1 */
  function longSeam(L, F, d0, d1, a, n, lift) {
    var pts = [], i;
    for (i = 0; i <= n; i++) {
      var d = lerp(d0, d1, i / n), s = F.at(d), p = F.pt(s, a), k = 1 + (lift || 0.012) / Math.max(0.1, Math.min(s[1], s[2]));
      pts.push([p[0], p[1] * k, s[4] + (p[2] - s[4]) * k]);
    }
    seam(L, pts);
  }
  function wheel(G, x, y, z, r, w) {
    G.tyre.push(cylY(r, w, x, y, z, 14));
    G.leg.push(cylY(r * 0.58, w + 0.02, x, y, z, 8));
    G.leg.push(cylY(r * 0.2, w + 0.06, x, y, z, 6));
  }

  /* ---------------- paint: a weathered canvas sheet per finish, laid on by the face normal ---------------- */
  var _tex = {};
  function paintTex(F) {
    if (_tex[F.key] !== undefined) return _tex[F.key];
    var t = null;
    try {
      var S = 512, cv = document.createElement("canvas"); cv.width = S; cv.height = S;
      var g = cv.getContext("2d"), sd = F.seed, i, j;
      function R() { sd = (sd * 16807) % 2147483647; return sd / 2147483647; }
      g.fillStyle = F.base; g.fillRect(0, 0, S, S);
      /* panels: columns 32..80 px (0.8..2 m) along, rows 48..96 px across, each a shade off the next */
      var x0 = 0;
      while (x0 < S) {
        var w = 32 + Math.floor(R() * 4) * 16, y0 = -Math.floor(R() * 48);
        while (y0 < S) {
          var h = 48 + Math.floor(R() * 4) * 16;
          g.fillStyle = (R() < 0.5 ? "rgba(255,255,255," : "rgba(0,0,0,") + (R() * F.panel).toFixed(3) + ")";
          g.fillRect(x0, y0, w, h);
          g.strokeStyle = F.line; g.lineWidth = 1;
          g.strokeRect(x0 + 0.5, y0 + 0.5, w, h);
          /* rivet rows along the panel's edges */
          g.fillStyle = F.rivet;
          for (j = 4; j < h; j += 6) { g.fillRect(x0 + 2, y0 + j, 1, 1); g.fillRect(x0 + w - 3, y0 + j, 1, 1); }
          for (j = 4; j < w; j += 6) g.fillRect(x0 + j, y0 + 2, 1, 1);
          y0 += h;
        }
        x0 += w;
      }
      /* soft weathering blotches */
      for (i = 0; i < 160; i++) {
        g.fillStyle = (R() < 0.45 ? "rgba(255,255,255," : "rgba(40,36,30,") + (0.02 + R() * F.mottle).toFixed(3) + ")";
        var bw = 10 + R() * 70, bh = 6 + R() * 30, bx = R() * S, by = R() * S;
        g.fillRect(bx, by, bw, bh);
        g.fillRect(bx + bw * 0.2, by - bh * 0.3, bw * 0.6, bh * 1.6);
      }
      /* grime streaks running aft (u is along the aircraft) */
      for (i = 0; i < 110; i++) {
        var sx = R() * S, sy = R() * S, sl = 40 + R() * 180, gr = g.createLinearGradient(sx, 0, sx + sl, 0);
        gr.addColorStop(0, "rgba(34,30,26," + (F.grime * (0.4 + R())).toFixed(3) + ")");
        gr.addColorStop(1, "rgba(34,30,26,0)");
        g.fillStyle = gr; g.fillRect(sx, sy, sl, 1 + R() * 3);
      }
      /* scuffs and small access panels */
      g.strokeStyle = F.line;
      for (i = 0; i < 26; i++) g.strokeRect(Math.floor(R() * S) + 0.5, Math.floor(R() * S) + 0.5, 6 + R() * 18, 5 + R() * 12);
      t = new V.CanvasTexture(cv);
      t.wrapS = t.wrapT = V.RepeatWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = null; }
    _tex[F.key] = t;
    return t;
  }
  /* triplanar UVs by the face normal: one texture repeat = 12.8 m along, 4.8 m across */
  function boxUV(geo) {
    var p = geo.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = Math.abs(uy * vz - uz * vy), ny = Math.abs(uz * vx - ux * vz), nz = Math.abs(ux * vy - uy * vx);
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], a, b;
        if (nz >= nx && nz >= ny) { a = x; b = y; } else if (ny >= nx) { a = x; b = z; } else { a = y; b = z; }
        uv[(t / 3 + k) * 2] = a / 12.8; uv[(t / 3 + k) * 2 + 1] = b / 4.8;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }
  var KEYS = ["skin", "dark", "seam", "team", "metal", "ink", "glass"];
  function kits() {
    var K = {}, G = { leg: [], tyre: [], door: [] };
    KEYS.forEach(function (k) { K[k] = []; });
    return [K, G];
  }
  function makeMats(C, F) {
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0", tex = paintTex(F);
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: tex ? 0xffffff : F.base, map: tex || null, roughness: F.rough,
                                          metalness: F.metal, side: V.DoubleSide });
    m.dark = new V.MeshStandardMaterial({ color: F.dark, roughness: 0.55, metalness: 0.1, side: V.DoubleSide });
    m.seam = new V.MeshStandardMaterial({ color: F.seam, roughness: 0.8, metalness: 0.1 });
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.82, metalness: 0.06, side: V.DoubleSide,
                                          polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5c6064, roughness: 0.42, metalness: 0.65, side: V.DoubleSide });
    m.ink = new V.MeshStandardMaterial({ color: 0x0d0e0f, roughness: 0.9, metalness: 0.04, side: V.DoubleSide });
    m.glass = new V.MeshStandardMaterial({ color: 0x223139, roughness: 0.08, metalness: 0.55, side: V.DoubleSide,
                                           polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
    m.leg = new V.MeshStandardMaterial({ color: F.leg || 0x8a8d90, roughness: 0.45, metalness: 0.5 });
    m.tyre = new V.MeshStandardMaterial({ color: 0x151617, roughness: 0.95, metalness: 0.02 });
    m.door = m.skin;
    return m;
  }
  function meshesInto(grp, K, mats, keys) {
    keys.forEach(function (key) {
      if (!K[key] || !K[key].length) return;
      var geo = merge(K[key]);
      if (key === "skin" || key === "door") boxUV(geo);
      grp.add(new V.Mesh(geo, mats[key]));
    });
  }
  function assemble(K, G, C, F, folds) {
    var mats = makeMats(C, F), root = new V.Group();
    meshesInto(root, K, mats, KEYS);
    var gear = new V.Group(); gear.name = "gear";
    meshesInto(gear, G, mats, ["leg", "tyre", "door"]);
    root.add(gear);
    (folds || []).forEach(function (fd) {
      var fg = new V.Group(); fg.name = "wingfold";
      fg.position.set(fd.hinge[0], fd.hinge[1], fd.hinge[2]);
      var m = new V.Matrix4().makeTranslation(-fd.hinge[0], -fd.hinge[1], -fd.hinge[2]);
      KEYS.forEach(function (k) { (fd.K[k] || []).forEach(function (g) { g.applyMatrix4(m); }); });
      meshesInto(fg, fd.K, mats, KEYS);
      fg.userData.fold = { axis: [1, 0, 0], angle: fd.angle };
      root.add(fg);
    });
    return root;
  }
  function node(root, name, x, y, z) { var o = new V.Object3D(); o.name = name; o.position.set(x, y, z); root.add(o); }

  /* ======================================================================================
     AVRO VULCAN B.2 - A: d = (x - 63) / 33.6, z = (200 - y) / 33.6, y = (853 - y) / 34.64
     ====================================================================================== */
  var VUL = (function () {
    var GROUND = -3.51, ZLOW = -1.40;
    var F = Fus([
      [0.00, 0.08, -0.17, -0.31, 2.0], [0.09, 0.20, -0.05, -0.45, 2.0], [0.21, 0.29, 0.09, -0.57, 2.0],
      [0.51, 0.44, 0.21, -0.66, 2.0], [1.10, 0.72, 0.33, -0.95, 2.0], [1.70, 0.89, 0.62, -1.16, 2.1],
      [2.44, 1.02, 0.86, -1.31, 2.2], [3.18, 1.15, 1.01, -1.37, 2.3], [4.08, 1.33, 1.16, -1.40, 2.4],
      [5.57, 1.44, 1.34, -1.41, 2.5], [7.65, 1.53, 1.58, -1.43, 2.6], [13.0, 1.53, 1.58, -1.43, 2.7],
      [21.93, 1.45, 1.57, -1.40, 2.7], [23.42, 1.38, 1.18, -1.32, 2.6], [24.90, 1.30, 0.88, -1.24, 2.5],
      [26.85, 1.18, 0.74, -1.07, 2.4], [27.89, 1.00, 0.62, -0.98, 2.3], [29.08, 0.85, 0.45, -0.78, 2.2],
      [29.97, 0.55, 0.25, -0.45, 2.1], [30.42, 0.30, 0.10, -0.20, 2.0], [30.65, 0.05, -0.02, -0.08, 2.0]
    ], 24, 0.7);
    /* A plan, leading and trailing edge; thickness off A head-on; the underside flat at ZLOW */
    var WT = [
      [1.20, 7.75, 26.70, 2.45], [1.53, 8.15, 26.69, 2.40], [4.07, 11.10, 26.65, 1.80], [4.42, 11.16, 26.64, 1.76],
      [7.30, 14.76, 26.80, 1.42], [10.19, 17.17, 26.97, 1.07], [13.37, 19.55, 27.17, 0.70], [14.52, 20.80, 27.24, 0.56],
      [15.96, 22.89, 27.33, 0.36], [16.40, 23.57, 27.36, 0.30], [16.77, 24.91, 27.40, 0.20], [16.91, 26.50, 27.45, 0.08]
    ];
    var W = Wing(WT.map(function (r) { return [r[0], r[1], r[2], r[3] / (r[2] - r[1])]; }),
                 function (y) { return ZLOW + pl(WT, y, 3) / 2; }, 0.004, 11);
    /* fin (A side): fillet from d 20.9, LE to the 5.36 m top, TE leaning aft */
    var FIN = [[0.50, 20.90, 26.82, 0.07], [1.58, 21.95, 27.32, 0.075], [2.14, 22.38, 27.58, 0.075],
               [3.75, 24.53, 28.33, 0.07], [5.30, 26.62, 29.05, 0.06], [5.40, 26.95, 29.00, 0.05]];
    var CAN = [[3.45, 1.12, 0.40], [4.17, 1.95, 0.58], [4.76, 2.15, 0.68], [5.65, 2.18, 0.72],
               [6.50, 1.98, 0.66], [7.30, 1.72, 0.45], [7.85, 1.58, 0.15]];

    function build(C, P) {
      var kk = kits(), K = kk[0], G = kk[1], i, s;
      /* fuselage: the black radome is the lower front of the nose (B) */
      split(F.geo(), function (x, y, z) { var d = NOSE - x; return (d < 1.95 && z < 0.25 - 0.35 * d) || (d < 0.35); }, K.dark, K.skin);
      /* canopy hump; the windscreen at its front, frames */
      var hump = loft(CAN.map(function (h) {
        var ring = [], j, n = 16, base = F.top(h[0]) - 0.35;
        for (j = 0; j <= n; j++) { var a = PI * j / n; ring.push([X(h[0]), h[2] * Math.cos(a), base + (h[1] - base) * Math.sin(a)]); }
        ring.push([X(h[0]), -h[2] * 0.6, base - 0.1]); ring.push([X(h[0]), h[2] * 0.6, base - 0.1]);
        return ring;
      }));
      split(hump, function (x, y, z) { var d = NOSE - x; return d < 4.45 && d > 3.5 && z > 1.35 && z < 2.1; }, K.glass, K.skin);
      [3.85, 4.2].forEach(function (d) {
        var h = pl(CAN, d, 2) + 0.02, top = pl(CAN, d, 1) + 0.02, base = F.top(d) - 0.35, pts = [], j;
        for (j = 1; j < 10; j++) { var a = PI * j / 10; pts.push([X(d), h * Math.cos(a), base + (top - base) * Math.sin(a)]); }
        seam(K.ink, pts);
      });
      for (s = -1; s <= 1; s += 2) {
        /* the eyebrow window on the canopy side, the crew window lower down (A side and plan) */
        K.glass.push(discY(0.18, 0.18, X(4.73), s * (pl(CAN, 4.73, 2) * 0.86 + 0.02), 1.80, 14));
        K.glass.push(discY(0.15, 0.15, X(6.67), s * (F.hw(6.67) * 0.93 + 0.03), 0.85, 14));
        K.seam.push(rod([X(4.73), s * (pl(CAN, 4.73, 2) * 0.86 + 0.03), 1.58], [X(4.73), s * (pl(CAN, 4.73, 2) * 0.86 + 0.03), 2.0], 0.02, 4));
      }
      /* the bomb-aimer's blister under the cabin (A side x 190..250) */
      K.skin.push(ell(0.9, 0.42, 0.28, X(4.65), 0, -1.40, 16, 8));
      K.glass.push(ell(0.25, 0.3, 0.16, X(4.05), 0, -1.48, 10, 6));
      /* the probe over the nose, its root fairing (A x 17..78) */
      K.metal.push(rod([X(-1.37), 0, 0.10], [X(0.25), 0, 0.10], 0.06, 10));
      K.metal.push(lathe([[-1.42, 0.02], [-1.37, 0.09], [-1.25, 0.08], [-1.20, 0.06]], 10, at(0, 0.10)));
      K.skin.push(lathe([[0.0, 0.08], [0.25, 0.16], [0.45, 0.12], [0.6, 0.05]], 10, at(0, 0.08), 0.9));
      /* nose panel lines: radome joint, behind the cabin, along the sides */
      ringSeam(K.seam, F, 1.95, -0.6, PI + 0.6, 18);
      ringSeam(K.seam, F, 7.65, -0.4, PI + 0.4, 18);
      ringSeam(K.seam, F, 3.2, -1.3, -PI + 1.3, 10);
      longSeam(K.seam, F, 2.0, 7.6, 0.25, 8); longSeam(K.seam, F, 2.0, 7.6, PI - 0.25, 8);
      /* bomb-bay doors under the centre-section box (A plan, d 12.9..22.3) */
      var by = 0.9, bz = F.zAt(17, by, -1) - 0.015;
      seam(K.seam, [[X(13.1), by, bz], [X(22.0), by, bz]]); seam(K.seam, [[X(13.1), -by, bz], [X(22.0), -by, bz]]);
      seam(K.seam, [[X(13.1), 0, F.bot(13.1) - 0.015], [X(22.0), 0, F.bot(22.0) - 0.015]]);
      seam(K.seam, [[X(13.1), -by, bz], [X(13.1), 0, F.bot(13.1) - 0.015], [X(13.1), by, bz]]);
      seam(K.seam, [[X(22.0), -by, bz], [X(22.0), 0, F.bot(22.0) - 0.015], [X(22.0), by, bz]]);
      /* the crew entrance door under the nose, ahead of the nose leg */
      var dz = F.bot(7.3) - 0.015;
      seam(K.seam, [[X(6.6), 0.45, dz + 0.05], [X(7.9), 0.45, dz + 0.05], [X(7.9), -0.45, dz + 0.05], [X(6.6), -0.45, dz + 0.05], [X(6.6), 0.45, dz + 0.05]]);
      /* spine aerials (A side x 395, x 455) */
      plate(K.metal, [[9.80, 1.58], [9.95, 1.58], [9.92, 1.88], [9.84, 1.88]], 0, 0.04);
      plate(K.metal, [[11.45, 1.58], [11.80, 1.58], [11.95, 1.98], [11.82, 1.98]], 0, 0.04);
      /* wings */
      for (s = -1; s <= 1; s += 2) {
        K.skin.push(W.geo(s));
        /* letterbox intakes, two per side (A head-on: y 1.67..4.07, z -0.72..0.32), splitter */
        var nu = 16, nv = 6, rows = [], top = [], bot = [];
        for (i = 0; i <= nu; i++) {
          var y = lerp(1.67, 4.07, i / nu), u = 2 * i / nu - 1, hh = Math.pow(Math.max(0, 1 - Math.pow(Math.abs(u), 6)), 1 / 6);
          var le = W.at(y)[1], zc = -0.20, h = 0.52 * Math.max(0.15, hh), r = [], j;
          for (j = 0; j <= nv; j++) r.push([X(le - 0.06), s * y, zc - h + 2 * h * j / nv]);
          rows.push(r);
          top.push([X(le - 0.1), s * y, zc + h + 0.03]); bot.push([X(le - 0.1), s * y, zc - h - 0.03]);
        }
        K.ink.push(sheet(rows));
        chain(K.skin, top, 0.07, 6); chain(K.skin, bot, 0.07, 6);
        var ym = 2.87, lm = W.at(ym)[1];
        plate(K.metal, [[lm - 0.12, -0.70], [lm - 0.12, 0.30], [lm + 1.6, 0.30], [lm + 1.6, -0.70]], s * ym, 0.06);
        /* the engine faces inside */
        [2.27, 3.47].forEach(function (yy) { K.metal.push(discX(0.42, X(W.at(yy)[1] + 1.4), s * yy, -0.2, 16)); });
        /* jet pipes in pairs at the trailing edge, their fairings on the upper skin (A plan) */
        [2.40, 3.41].forEach(function (yy) {
          K.skin.push(lathe([[24.6, 0.18], [25.4, 0.44], [26.5, 0.49], [27.05, 0.48], [27.14, 0.47]], 18, at(s * yy, -0.92), 1, true));
          K.metal.push(lathe([[27.06, 0.48], [27.14, 0.47], [27.18, 0.43]], 18, at(s * yy, -0.92), 1, true));
          K.ink.push(discX(0.43, X(26.95), s * yy, -0.92, 18));
          var zu = W.skinZ(yy, 0.85, 1);
          K.skin.push(ell(1.8, 0.30, 0.16, X(25.0), s * yy, zu - 0.04, 16, 6));
        });
        /* elevons: hinge line and the cuts between the four (A plan) */
        seam(K.seam, spanLine(W, s, 4.6, 16.4, 0.86, 1, 12));
        seam(K.seam, spanLine(W, s, 4.6, 16.4, 0.86, -1, 12));
        [4.6, 7.4, 9.76, 13.1, 16.4].forEach(function (yy) { seam(K.seam, chordLine(W, s, yy, 0.86, 1.0, 1, 2)); });
        /* leading-edge joint and the main spar line */
        seam(K.seam, spanLine(W, s, 4.5, 16.6, 0.08, 1, 14));
        seam(K.seam, spanLine(W, s, 4.5, 16.2, 0.45, 1, 12));
        seam(K.seam, spanLine(W, s, 4.5, 16.2, 0.45, -1, 12));
        /* the kink in the leading edge (A plan, y 13.37): a chordwise joint */
        seam(K.seam, chordLine(W, s, 13.37, 0.0, 0.45, 1, 4));
        /* airbrakes over the engines (A plan, d 14.2..14.8) */
        [[2.0, 2.9], [3.0, 3.9]].forEach(function (q) { wingPanel(K.seam, W, s, q[0], q[1], (14.2 - W.at(q[0])[1]) / (W.at(q[0])[2] - W.at(q[0])[1]), (14.8 - W.at(q[0])[1]) / (W.at(q[0])[2] - W.at(q[0])[1]), 1); });
        /* elevon actuator fairings under the trailing edge (A plan: the stubs at the TE) */
        [6.0, 8.7, 11.3, 14.6].forEach(function (yy) {
          var w = W.at(yy), z = W.skinZ(yy, 0.85, -1);
          K.skin.push(ell(0.75, 0.10, 0.10, X(w[2] - 0.35), s * yy, z - 0.05, 10, 6));
        });
        /* the main-gear bay doors' outline on the underside */
        wingPanel(K.seam, W, s, 4.5, 5.65, (16.4 - W.at(4.5)[1]) / (W.at(4.5)[2] - W.at(4.5)[1]), (19.2 - W.at(4.5)[1]) / (W.at(4.5)[2] - W.at(4.5)[1]), -1);
        /* team colour: a panel on each upper outer wing */
        teamPanel(K.team, W, s, 11.6, 13.2, 0.48, 0.70);
        /* navigation light at each tip */
        K.glass.push(ell(0.18, 0.06, 0.06, X(27.2), s * 16.92, W.wz(16.9), 8, 6));
      }
      /* fin, its tip fairing, the rudder hinge; the ECM tail cone fairings (A side, C) */
      K.skin.push(finGeo(FIN));
      K.skin.push(ell(0.75, 0.10, 0.11, X(28.25), 0, 5.37, 12, 6));
      seam(K.seam, [[X(26.82 + (28.95 - 26.82) * 0.0), 0.11, 0.95], [X(28.65), 0.06, 5.1]]);
      seam(K.seam, [[X(26.82), -0.11, 0.95], [X(28.65), -0.06, 5.1]]);
      K.skin.push(ell(1.9, 0.28, 0.22, X(25.7), 0, 0.78, 16, 8));
      K.skin.push(ell(0.6, 0.30, 0.20, X(28.6), 0, -0.98, 10, 6));
      K.dark.push(ell(0.35, 0.22, 0.18, X(30.35), 0, -0.05, 10, 6));
      ringSeam(K.seam, F, 26.9, -PI + 0.2, -0.2, 12);
      /* ---- gear: twin nose wheels at d 8.39; eight-wheel bogies at d 17.75, legs at +-5.07 ---- */
      var nd = 8.39, nr = 0.39, nz = GROUND + nr;
      [1, -1].forEach(function (k) { wheel(G, X(nd), k * 0.29, nz, nr, 0.22); });
      G.leg.push(rod([X(nd), -0.42, nz], [X(nd), 0.42, nz], 0.06, 8));
      G.leg.push(rod([X(nd - 0.15), 0, F.bot(nd) + 0.1], [X(nd), 0, nz + 0.05], 0.12, 10));
      G.leg.push(rod([X(nd - 0.12), 0, F.bot(nd) - 0.4], [X(nd - 0.02), 0, nz + 0.5], 0.08, 8));
      G.leg.push(rod([X(nd + 0.9), 0, F.bot(nd + 0.9) + 0.05], [X(nd - 0.05), 0, nz + 0.9], 0.06, 6));
      [1, -1].forEach(function (k) { G.door.push(box(1.6, 0.03, 0.9, X(nd - 0.3), k * 0.48, F.bot(nd) - 0.45)); });
      [1, -1].forEach(function (s2) {
        var yc = s2 * 5.07, mr = 0.39, mz = GROUND + mr, wl = W.skinZ(5.07, (17.75 - W.at(5.07)[1]) / (W.at(5.07)[2] - W.at(5.07)[1]), -1);
        [17.35, 18.15].forEach(function (d) {
          [-0.65, -0.22, 0.22, 0.65].forEach(function (o) { wheel(G, X(d), yc + o, mz, mr, 0.2); });
          G.leg.push(rod([X(d), yc - 0.8, mz], [X(d), yc + 0.8, mz], 0.06, 8));
        });
        G.leg.push(box(1.0, 0.22, 0.16, X(17.75), yc, mz + 0.05));
        G.leg.push(rod([X(17.75), yc, wl + 0.2], [X(17.75), yc, mz + 0.08], 0.16, 12));
        G.leg.push(rod([X(17.75), yc, mz + 0.9], [X(17.75), yc, wl + 0.4], 0.20, 12));
        G.leg.push(rod([X(16.6), yc - s2 * 0.3, wl + 0.05], [X(17.7), yc, mz + 1.1], 0.07, 8));
        /* bay doors: one hanging outboard of the leg, one inboard (C) */
        G.door.push(box(2.6, 0.03, 1.25, X(17.8), yc + s2 * 0.62, wl - 0.62));
        G.door.push(box(2.6, 0.03, 0.9, X(17.8), yc - s2 * 0.62, wl - 0.45));
      });
      var root = assemble(K, G, C, P);
      node(root, "aar_probe", X(-1.42), 0, 0.10);
      return root;
    }
    return { build: build };
  })();

  /* ======================================================================================
     DASSAULT MIRAGE IV - D side d = (x - 172) / 45.8, z = (168 - y) / 45.8;
     plan along (x - 30) / 44.74, across (621 - y) / 45.5 (the plan turned square)
     ====================================================================================== */
  var M4 = (function () {
    var GROUND = -2.08;
    /* the centre fuselage; the intake trunks are lofted beside it */
    var F = Fus([
      [2.00, 0.07, -0.53, -0.66, 2.0], [2.10, 0.13, -0.47, -0.72, 2.0], [2.79, 0.24, -0.28, -0.76, 2.0],
      [3.89, 0.40, -0.07, -0.79, 2.0], [4.92, 0.53, 0.10, -0.80, 2.1], [6.04, 0.62, 0.55, -0.81, 2.2],
      [7.20, 0.66, 0.77, -0.82, 2.3], [8.27, 0.68, 0.80, -0.83, 2.4], [12.0, 0.72, 0.81, -0.86, 2.5],
      [17.0, 0.74, 0.81, -0.87, 2.5], [20.5, 1.10, 0.80, -0.80, 2.6], [21.68, 1.23, 0.78, -0.70, 2.8],
      [22.6, 1.23, 0.76, -0.64, 2.8], [23.00, 1.20, 0.74, -0.62, 2.8]
    ], 30, 0.45);
    /* the intake trunk, each side: [d, centre y, half width, top, bottom] */
    var TR = [[9.37, 1.06, 0.40, 0.44, -0.63], [10.2, 1.07, 0.39, 0.52, -0.72], [12.0, 1.06, 0.40, 0.56, -0.80],
              [17.0, 1.05, 0.40, 0.56, -0.82], [19.5, 0.98, 0.40, 0.52, -0.78], [20.8, 0.80, 0.40, 0.45, -0.70]];
    var WY = -0.45;
    var W = Wing([[1.0, 10.83, 20.70, 0.040], [1.43, 11.58, 20.70, 0.040], [3.50, 15.20, 20.62, 0.038],
                  [5.52, 18.73, 20.52, 0.035], [5.80, 19.30, 20.50, 0.035], [5.925, 19.85, 20.45, 0.03]],
                 function () { return WY; }, 0.0, 12);
    var FIN = [[0.60, 16.40, 22.50, 0.05], [0.83, 16.88, 22.55, 0.05], [2.90, 20.26, 23.34, 0.045],
               [3.28, 21.35, 23.43, 0.04], [3.33, 21.55, 23.38, 0.035]];
    function trunk(s) {
      var D = [], d;
      for (d = 9.37; d < 20.8; d += 0.45) D.push(d);
      D.push(20.8);
      return loft(D.map(function (dd) {
        var yc = pl(TR, dd, 1), hw = pl(TR, dd, 2), zt = pl(TR, dd, 3), zb = pl(TR, dd, 4), zc = (zt + zb) / 2, hz = (zt - zb) / 2, r = [], j, n = 20;
        for (j = 0; j < n; j++) {
          var t = j / n * 2 * PI, c = Math.cos(t), sn = Math.sin(t), e = 2 / 2.6;
          r.push([X(dd), s * (yc + hw * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e)), zc + hz * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), e)]);
        }
        return r;
      }), false);
    }
    function build(C, P) {
      var kk = kits(), K = kk[0], G = kk[1], s, i;
      /* fuselage, the canopy glazing cut out of it (D side x 412..530, plan 0.40 m wide) */
      split(F.geo(), function (x, y, z) { var d = NOSE - x; return d > 5.25 && d < 7.0 && Math.abs(y) < 0.40 && z > F.top(d) - 0.22; }, K.glass, K.skin);
      [5.3, 6.2, 6.95].forEach(function (d) { ringSeam(K.ink, F, d, 0.95, PI - 0.95, 6, 0.02); });
      longSeam(K.ink, F, 5.3, 6.95, PI / 2, 4, 0.02);
      /* navigator's windows (D side x 550..600), both sides */
      for (s = -1; s <= 1; s += 2) [8.2, 8.75].forEach(function (d) {
        K.glass.push(discY(0.16, 0.08, X(d), s * (F.hw(d) * 0.9 + 0.02), 0.62, 10));
      });
      /* the nose probe (D x 172..265), its base ring */
      K.metal.push(lathe([[0.0, 0.015], [0.08, 0.045], [0.25, 0.05], [1.2, 0.06], [2.05, 0.075]], 10, at(0, -0.60)));
      K.ink.push(lathe([[0.0, 0.016], [0.05, 0.035], [0.1, 0.046]], 10, at(0, -0.60)));
      ringSeam(K.seam, F, 3.3, 0, 2 * PI, 16);
      ringSeam(K.seam, F, 9.2, 0, 2 * PI, 16);
      ringSeam(K.seam, F, 14.0, 0.35, PI - 0.35, 10);
      ringSeam(K.seam, F, 17.5, 0.35, PI - 0.35, 10);
      longSeam(K.seam, F, 7.2, 20.5, PI / 2 - 0.35, 16); longSeam(K.seam, F, 7.2, 20.5, PI / 2 + 0.35, 16);
      /* pitot vanes on the nose (E: the small vanes just aft of the probe) */
      for (s = -1; s <= 1; s += 2) plate(K.metal, [[2.6, -0.45], [2.85, -0.45], [2.8, -0.45 + 0.01]], s * 0.25, 0.25);
      /* intake trunks, intakes with the half-cones, the splitter (D side x 588..601) */
      for (s = -1; s <= 1; s += 2) {
        K.skin.push(trunk(s));
        var ring = [], j, n = 20;
        for (j = 0; j < n; j++) {
          var t = j / n * 2 * PI, c = Math.cos(t), sn = Math.sin(t), e = 2 / 2.6;
          ring.push([X(9.36), s * (1.06 + 0.37 * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e)), -0.095 + 0.50 * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), e)]);
        }
        K.ink.push(loft([ring, ring.map(function (p) { return [p[0] - 0.02, s * 1.06 + (p[1] - s * 1.06) * 0.98, -0.095 + (p[2] + 0.095) * 0.98]; })], false));
        K.metal.push(lathe([[9.08, 0.01], [9.5, 0.17], [9.9, 0.27], [10.3, 0.30]], 14, at(s * 0.80, -0.10), 1.25));
        K.metal.push(box(0.9, 0.04, 1.0, X(9.75), s * 0.72, -0.09));
        /* auxiliary intake doors on the trunk sides (D side x 650..700) */
        [10.6, 11.1].forEach(function (d) { K.ink.push(discY(0.16, 0.07, X(d), s * 1.465, 0.1, 10)); });
      }
      /* the wing, elevons, team panel; tanks (E, G) */
      for (s = -1; s <= 1; s += 2) {
        K.skin.push(W.geo(s));
        seam(K.seam, spanLine(W, s, 1.5, 5.6, 0.86, 1, 6));
        seam(K.seam, spanLine(W, s, 1.5, 5.6, 0.86, -1, 6));
        seam(K.seam, chordLine(W, s, 3.5, 0.86, 1, 1, 1));
        seam(K.seam, spanLine(W, s, 1.5, 5.5, 0.10, 1, 6));
        seam(K.seam, spanLine(W, s, 1.5, 5.2, 0.55, 1, 6));
        [2.6, 4.2].forEach(function (yy) { seam(K.seam, chordLine(W, s, yy, 0.1, 0.86, 1, 4)); });
        teamPanel(K.team, W, s, 4.0, 5.0, 0.45, 0.75);
        K.glass.push(ell(0.14, 0.05, 0.05, X(19.6), s * 5.9, WY, 8, 6));
        /* 2500 l tank on its pylon under the inner wing (E: 5.7 m long, 0.9 m across) */
        var ty = s * 2.45, tz = WY - 0.85;
        K.skin.push(lathe([[13.6, 0.02], [13.9, 0.22], [14.6, 0.40], [15.6, 0.45], [17.4, 0.45], [18.6, 0.38], [19.3, 0.16], [19.45, 0.04]], 18, at(ty, tz)));
        plate(K.skin, [[15.2, WY - 0.02], [17.9, WY - 0.02], [17.6, tz + 0.38], [15.6, tz + 0.38]], ty, 0.08);
        (function () { var pts = [], j; for (j = 0; j <= 16; j++) { var a = j / 16 * 2 * PI; pts.push([X(14.5), ty + 0.465 * Math.cos(a), tz + 0.465 * Math.sin(a)]); } seam(K.seam, pts); })();
        plate(K.metal, [[18.9, tz], [19.4, tz], [19.45, tz + 0.5], [19.2, tz + 0.5]], ty, 0.03);
      }
      /* fin, rudder, tip; rear fuselage, the two Atar nozzles side by side (D, G) */
      K.skin.push(finGeo(FIN));
      seam(K.seam, [[X(22.0), 0.06, 0.85], [X(22.75), 0.04, 3.2]]); seam(K.seam, [[X(22.0), -0.06, 0.85], [X(22.75), -0.04, 3.2]]);
      K.skin.push(ell(0.55, 0.08, 0.06, X(22.5), 0, 3.31, 10, 6));
      K.skin.push(lathe([[16.2, 0.01], [16.8, 0.10], [17.6, 0.14], [18.4, 0.12]], 10, at(0, 0.86), 0.8));
      for (s = -1; s <= 1; s += 2) {
        K.metal.push(lathe([[22.3, 0.56], [22.75, 0.54], [22.99, 0.51]], 20, at(s * 0.60, 0.05), 1, true));
        K.ink.push(discX(0.47, X(22.7), s * 0.60, 0.05, 20));
        K.dark.push(lathe([[22.6, 0.50], [22.97, 0.47]], 20, at(s * 0.60, 0.05), 1, true));
      }
      /* IVA: the AN-11 half-sunk in its recess under the engines (D side x 860..1060) */
      if (P.bomb) {
        K.skin.push(lathe([[15.0, 0.02], [15.4, 0.22], [16.2, 0.36], [18.4, 0.36], [19.1, 0.28], [19.4, 0.12]], 16, at(0, -0.85)));
        [[19.1, 1], [19.1, -1]].forEach(function (q) { plate(K.metal, [[19.0, -0.85], [19.55, -0.85], [19.6, -0.85 - 0.5 * 1], [19.3, -0.85 - 0.45]], q[1] * 0.05, 0.03); });
      } else {
        seam(K.seam, [[X(15.0), 0.3, F.bot(15) + 0.005], [X(19.4), 0.3, F.bot(19.4) + 0.005]]);
        seam(K.seam, [[X(15.0), -0.3, F.bot(15) + 0.005], [X(19.4), -0.3, F.bot(19.4) + 0.005]]);
      }
      /* ventral aerials */
      plate(K.metal, [[12.4, -0.84], [12.7, -0.84], [12.75, -1.08], [12.6, -1.08]], 0, 0.03);
      /* ---- gear: twin nose wheels at d 8.37 (E); bogies, axles at d 17.31 / 18.25 (E) ---- */
      var nd = 8.37, nr = 0.26, nz = GROUND + nr;
      [1, -1].forEach(function (k) { wheel(G, X(nd), k * 0.18, nz, nr, 0.16); });
      G.leg.push(rod([X(nd), -0.28, nz], [X(nd), 0.28, nz], 0.04, 6));
      G.leg.push(rod([X(nd - 0.1), 0, F.bot(nd) + 0.1], [X(nd), 0, nz + 0.05], 0.07, 8));
      G.leg.push(rod([X(nd + 0.7), 0, F.bot(nd) + 0.05], [X(nd - 0.05), 0, nz + 0.6], 0.04, 6));
      [1, -1].forEach(function (k) { G.door.push(box(1.3, 0.03, 0.55, X(nd + 0.2), k * 0.3, F.bot(nd) - 0.27)); });
      [1, -1].forEach(function (s2) {
        var yc = s2 * 1.85, mr = 0.35, mz = GROUND + mr, wl = WY - 0.05;
        [17.31, 18.25].forEach(function (d) {
          [-0.17, 0.17].forEach(function (o) { wheel(G, X(d), yc + o, mz, mr, 0.17); });
          G.leg.push(rod([X(d), yc - 0.3, mz], [X(d), yc + 0.3, mz], 0.05, 6));
        });
        G.leg.push(box(1.1, 0.12, 0.12, X(17.78), yc, mz + 0.06));
        G.leg.push(rod([X(17.78), yc, wl], [X(17.78), yc, mz + 0.06], 0.09, 10));
        G.leg.push(rod([X(17.0), yc, wl], [X(17.7), yc, mz + 0.7], 0.05, 6));
        G.door.push(box(1.6, 0.03, 0.9, X(17.6), yc + s2 * 0.32, wl - 0.45));
      });
      var root = assemble(K, G, C, P);
      node(root, "aar_probe", X(0.0), 0, -0.60);
      return root;
    }
    return { build: build };
  })();

  /* ======================================================================================
     MiG-29K - K1 side d = (1310 - x) / 74.3, z = (787 - y) / 74.3; plan d = (x - 15) / 74,
     y = (1983 - y) / 74
     ====================================================================================== */
  var K29 = (function () {
    var GROUND = -1.68, HINGE = 3.65, FOLD = 100 * PI / 180;
    /* radome, cockpit and the hump spine */
    var F = Fus([
      [0.75, 0.04, 0.10, -0.02, 2.0], [0.94, 0.17, 0.30, -0.10, 2.0], [1.48, 0.28, 0.50, -0.20, 2.0],
      [2.02, 0.37, 0.66, -0.25, 2.0], [2.56, 0.44, 0.80, -0.28, 2.1], [3.10, 0.47, 0.93, -0.30, 2.2],
      [3.60, 0.48, 1.03, -0.33, 2.3], [4.40, 0.49, 1.10, -0.36, 2.3], [5.50, 0.50, 1.15, -0.36, 2.3],
      [6.50, 0.50, 1.28, -0.30, 2.2], [7.50, 0.48, 1.18, -0.20, 2.2], [9.00, 0.46, 0.92, -0.10, 2.2],
      [10.0, 0.44, 0.75, -0.05, 2.2], [11.7, 0.42, 0.52, -0.02, 2.2], [14.0, 0.40, 0.42, 0.00, 2.2],
      [15.6, 0.30, 0.36, 0.05, 2.1], [16.1, 0.10, 0.26, 0.12, 2.0]
    ], 26, 0.32);
    /* the lifting body with the ogival LERX: [d, half width (K1 plan), top, bottom] - a sharp-edged lens */
    var LB = [[4.40, 0.46, 0.40, -0.12], [4.66, 0.50, 0.40, -0.14], [5.20, 0.65, 0.41, -0.16], [5.74, 0.81, 0.42, -0.18],
              [6.28, 0.96, 0.43, -0.20], [6.82, 1.12, 0.44, -0.20], [7.36, 1.27, 0.45, -0.20], [7.91, 1.42, 0.46, -0.20],
              [8.45, 1.55, 0.47, -0.20], [8.99, 1.65, 0.47, -0.20], [9.26, 1.70, 0.47, -0.20], [13.72, 1.70, 0.45, -0.18],
              [14.40, 1.47, 0.42, -0.16], [15.50, 1.38, 0.36, -0.10], [15.80, 1.10, 0.30, -0.02], [16.0, 0.60, 0.24, 0.06]];
    var NAC = [[5.00, 0.74, 0.38, -0.02, -0.12], [5.60, 0.75, 0.39, -0.02, -0.55], [6.20, 0.75, 0.40, -0.02, -0.95],
               [7.00, 0.76, 0.40, 0.00, -1.00], [9.30, 0.78, 0.42, 0.00, -1.10], [12.3, 0.82, 0.44, 0.00, -1.05],
               [13.9, 0.85, 0.45, -0.05, -0.97], [14.6, 0.87, 0.45, -0.12, -0.98]];
    function wz(y) { return 0.14 - 0.035 * (Math.abs(y) - 1.6); }
    var W = Wing([[1.20, 8.80, 13.72, 0.06], [1.70, 9.26, 13.72, 0.058], [3.65, 11.12, 13.72, 0.05],
                  [5.80, 13.17, 14.06, 0.042], [5.995, 13.40, 14.06, 0.035]], wz, 0.004, 12);
    var FIN = [[0.0, 11.45, 15.80, 0.05], [0.15, 12.52, 15.78, 0.05], [1.03, 13.59, 15.62, 0.05],
               [1.90, 14.67, 15.45, 0.045], [2.07, 14.92, 15.42, 0.04]];
    var STAB = [[1.45, 14.05, 15.70], [2.04, 14.66, 15.90], [3.00, 15.77, 16.60], [3.85, 16.75, 17.30], [3.92, 16.95, 17.36]];
    var CAN = [[3.45, 1.03, 0.30], [3.90, 1.36, 0.42], [4.40, 1.55, 0.47], [5.00, 1.62, 0.48],
               [5.60, 1.57, 0.46], [6.10, 1.45, 0.40], [6.60, 1.30, 0.30], [7.00, 1.20, 0.15]];
    function lens(rows, s0) {
      var D = [], d;
      for (d = rows[0][0]; d < rows[rows.length - 1][0]; d += 0.3) D.push(d);
      D.push(rows[rows.length - 1][0]);
      return loft(D.map(function (dd) {
        var hw = pl(rows, dd, 1), zt = pl(rows, dd, 2), zb = pl(rows, dd, 3), zc = 0.15, r = [], j, n = 24;
        for (j = 0; j < n; j++) {
          var t = j / n * 2 * PI, c = Math.cos(t), sn = Math.sin(t);
          var y = hw * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), 0.7);
          var z = zc + (sn >= 0 ? (zt - zc) : (zc - zb)) * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), 1.6);
          r.push([X(dd), y, z]);
        }
        return r;
      }));
    }
    function nacelle(s) {
      var D = [5.0, 5.15, 5.3, 5.45, 5.6, 5.8, 6.0, 6.2, 6.5], d;
      for (d = 7.0; d < 14.6; d += 0.5) D.push(d);
      D.push(14.6);
      return loft(D.map(function (dd) {
        var yc = pl(NAC, dd, 1), hw = pl(NAC, dd, 2), zt = pl(NAC, dd, 3), zb = pl(NAC, dd, 4), zc = (zt + zb) / 2, hz = (zt - zb) / 2, r = [], j, n = 20, e = 2 / 2.8;
        for (j = 0; j < n; j++) {
          var t = j / n * 2 * PI, c = Math.cos(t), sn = Math.sin(t);
          r.push([X(dd), s * (yc + hw * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e)), zc + hz * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), e)]);
        }
        return r;
      }), true);
    }
    function missile(L, Mt, d0, len, r, y, z, finSpan) {
      L.push(lathe([[d0, 0.01], [d0 + 0.25, r * 0.85], [d0 + 0.5, r], [d0 + len - 0.05, r], [d0 + len, r * 0.6]], 10, at(y, z)));
      [0, 1].forEach(function (k) {
        var a = k * PI / 2 + PI / 4, cy = Math.cos(a), cz = Math.sin(a);
        [[d0 + len - 0.35, finSpan], [d0 + 0.35, finSpan * 0.6]].forEach(function (q) {
          Mt.push(loft([[[X(q[0] - 0.25), y - cy * (r + q[1]), z - cz * (r + q[1])], [X(q[0] + 0.12), y - cy * r, z - cz * r], [X(q[0] - 0.25), y + cy * (r + q[1]), z + cz * (r + q[1])]],
                        [[X(q[0] - 0.25), y - cy * (r + q[1]) + 0.005, z - cz * (r + q[1])], [X(q[0] + 0.12), y - cy * r + 0.005, z - cz * r], [X(q[0] - 0.25), y + cy * (r + q[1]) + 0.005, z + cz * (r + q[1])]]], true));
        });
      });
    }
    function build(C, P) {
      var kk = kits(), K = kk[0], G = kk[1], s, i;
      /* forebody: the grey radome, the dark anti-glare panel ahead of the windscreen */
      split(F.geo(), function (x, y, z) { var d = NOSE - x; return d < 2.62 || (d < 3.5 && z > 0.75 && Math.abs(y) < 0.3); }, K.dark, K.skin);
      ringSeam(K.seam, F, 2.62, 0, 2 * PI, 16);
      longSeam(K.seam, F, 7.2, 15.5, PI / 2, 12);
      /* the single-seat canopy (K2, K3), frames; the IRST ball to starboard (K3) */
      var hump = loft(CAN.map(function (h) {
        var ring = [], j, n = 16, base = F.top(h[0]) - 0.22;
        for (j = 0; j <= n; j++) { var a = PI * j / n; ring.push([X(h[0]), h[2] * Math.cos(a), base + (h[1] - base) * Math.sin(a)]); }
        ring.push([X(h[0]), -h[2] * 0.6, base - 0.06]); ring.push([X(h[0]), h[2] * 0.6, base - 0.06]);
        return ring;
      }));
      split(hump, function (x) { var d = NOSE - x; return d < 6.3; }, K.glass, K.skin);
      [3.9, 4.5].forEach(function (d) {
        var h = pl(CAN, d, 2), top = pl(CAN, d, 1), base = F.top(d) - 0.05, pts = [], j;
        for (j = 0; j <= 8; j++) { var a = PI * j / 8; pts.push([X(d), (h + 0.015) * Math.cos(a), base + (top + 0.015 - base) * Math.sin(a)]); }
        chain(K.metal, pts, 0.025, 4);
      });
      K.glass.push(ell(0.13, 0.13, 0.13, X(3.25), -0.22, 1.02, 10, 8));
      K.metal.push(ell(0.18, 0.15, 0.06, X(3.25), -0.22, 0.95, 10, 6));
      /* the probe stowed in the port side of the nose: its door outline, the nozzle tip showing */
      var pz = 0.80, py = F.hw(3.4) + 0.005;
      seam(K.seam, [[X(2.85), py, pz + 0.07], [X(4.0), py, pz + 0.07], [X(4.0), py, pz - 0.07], [X(2.85), py, pz - 0.07], [X(2.85), py, pz + 0.07]]);
      K.metal.push(rod([X(2.9), py, pz], [X(3.95), py, pz], 0.035, 6));
      /* pitot */
      K.metal.push(lathe([[0.0, 0.01], [0.1, 0.025], [0.8, 0.03]], 8, at(0, 0.03)));
      /* the lifting body with the LERX */
      K.skin.push(lens(LB));
      /* nacelles, raked intakes, the intake ramps, nozzles */
      for (s = -1; s <= 1; s += 2) {
        K.skin.push(nacelle(s));
        var mouth = [], j, n = 8;
        for (i = 0; i <= 6; i++) {
          var f = i / 6, d = lerp(5.0, 6.2, f), zz = lerp(-0.02, -0.95, f), yc = pl(NAC, d, 1), hw = pl(NAC, d, 2) - 0.03, r = [];
          for (j = 0; j <= n; j++) r.push([X(d + 0.03), s * (yc - hw + 2 * hw * j / n), zz]);
          mouth.push(r);
        }
        K.ink.push(sheet(mouth));
        chain(K.metal, [[X(4.98), s * 0.36, -0.02], [X(6.18), s * 0.36, -0.96]], 0.03, 4);
        chain(K.metal, [[X(4.98), s * 1.12, -0.02], [X(6.18), s * 1.13, -0.96]], 0.03, 4);
        K.metal.push(box(1.2, 0.7, 0.03, X(5.75), s * 0.75, -0.08));
        K.metal.push(lathe([[14.5, 0.47], [15.1, 0.46], [15.85, 0.41]], 18, at(s * 0.87, -0.55), 1, true));
        K.ink.push(discX(0.38, X(15.6), s * 0.87, -0.55, 18));
        K.dark.push(lathe([[15.3, 0.43], [15.84, 0.40]], 18, at(s * 0.87, -0.55), 1, true));
        ringSeam(K.seam, { at: function (d) { return [d, pl(NAC, d, 2), (pl(NAC, d, 3) - pl(NAC, d, 4)) / 2, (pl(NAC, d, 3) - pl(NAC, d, 4)) / 2, (pl(NAC, d, 3) + pl(NAC, d, 4)) / 2, 2.8]; },
                           pt: function (sv, t) { var e = 2 / 2.8, c = Math.cos(t), sn = Math.sin(t); return [X(sv[0]), s * pl(NAC, sv[0], 1) + sv[1] * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e), sv[4] + sv[2] * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), e)]; } },
                 11.0, -PI + 0.3, -0.3, 8, 0.02);
      }
      /* the wing: fixed inner panel to the hinge; the outer panel in a "wingfold" group */
      var folds = [];
      for (s = -1; s <= 1; s += 2) {
        K.skin.push(W.geo(s, 1.2, HINGE));
        seam(K.seam, spanLine(W, s, 1.75, HINGE - 0.05, 0.78, 1, 4));
        seam(K.seam, spanLine(W, s, 1.75, HINGE - 0.05, 0.78, -1, 4));
        seam(K.seam, chordLine(W, s, HINGE - 0.02, 0.0, 1.0, 1, 6));
        seam(K.seam, chordLine(W, s, HINGE - 0.02, 0.0, 1.0, -1, 6));
        var FK = {}; KEYS.forEach(function (k) { FK[k] = []; });
        FK.skin.push(W.geo(s, HINGE, 5.995));
        seam(FK.seam, spanLine(W, s, HINGE + 0.05, 5.7, 0.10, 1, 4));
        seam(FK.seam, spanLine(W, s, HINGE + 0.15, 5.6, 0.76, 1, 4));
        seam(FK.seam, spanLine(W, s, HINGE + 0.15, 5.6, 0.76, -1, 4));
        teamPanel(K.team, W, s, 2.3, 3.3, 0.55, 0.80);
        folds.push({ K: FK, hinge: [X(12.4), s * HINGE, wz(HINGE)], angle: s * FOLD });
        /* pylons with an R-77 inboard and an R-73 in the middle (inner, fixed panel) */
        [[2.35, 3.6, 0.10, 0.20], [3.20, 2.9, 0.085, 0.15]].forEach(function (q, k) {
          var yy = q[0], w = W.at(yy), cx = (w[1] + w[2]) / 2 + 0.2, zl = W.skinZ(yy, 0.5, -1);
          plate(K.skin, [[cx - 1.0, zl + 0.02], [cx + 0.9, zl + 0.02], [cx + 0.7, zl - 0.18], [cx - 0.8, zl - 0.18]], s * yy, 0.08);
          missile(K.metal, K.ink, cx - q[1] / 2 - 0.3, q[1], q[2], s * yy, zl - 0.18 - q[2] - 0.03, q[3]);
        });
      }
      /* fins canted 6 deg out on the booms at +-1.70 (root z 0.60), stabilators */
      for (s = -1; s <= 1; s += 2) {
        var fm = new V.Matrix4().makeRotationX(-s * 6 * PI / 180);
        fm.premultiply(new V.Matrix4().makeTranslation(0, s * 1.70, 0.60));
        K.skin.push(xform(finGeo(FIN), fm));
        var tip = []; [0, 1].forEach(function (k) { tip.push(new V.Vector3(X(14.95 + 0.4 * k), 0, 2.03).applyMatrix4(fm).toArray()); });
        K.dark.push(xform(box(0.42, 0.12, 0.10, X(15.12), 0, 2.0), fm));
        K.team.push(xform(box(0.95, 0.13, 0.22, X(14.75), 0, 1.45), fm));
        var rz = [new V.Vector3(X(15.05), 0.07, 0.25).applyMatrix4(fm).toArray(), new V.Vector3(X(15.3), 0.05, 1.85).applyMatrix4(fm).toArray()];
        seam(K.seam, rz);
        K.skin.push(stabGeo(STAB, s, -0.30, -3, 0.05, 0.04));
        seam(K.seam, [[X(15.0), s * 1.8, -0.27], [X(16.4), s * 3.6, -0.36]]);
      }
      /* the arrestor hook stowed between the nozzles (K1 side, K2), black and white bands */
      for (i = 0; i < 6; i++) {
        var d0 = lerp(13.4, 16.1, i / 6), d1 = lerp(13.4, 16.1, (i + 1) / 6);
        (i % 2 ? K.metal : K.ink).push(rod([X(d0), 0, lerp(-0.30, -0.46, i / 6)], [X(d1), 0, lerp(-0.30, -0.46, (i + 1) / 6)], 0.05, 6));
      }
      K.ink.push(box(0.18, 0.12, 0.12, X(16.12), 0, -0.48));
      /* ---- gear: twin nose wheels at d 7.0; single mains at d 10.9, track 3.09 m ---- */
      var nd = 7.0, nr = 0.25, nz = GROUND + nr;
      [1, -1].forEach(function (k) { wheel(G, X(nd), k * 0.17, nz, nr, 0.15); });
      G.leg.push(rod([X(nd), -0.27, nz], [X(nd), 0.27, nz], 0.04, 6));
      G.leg.push(rod([X(nd + 0.25), 0, F.bot(nd) + 0.05], [X(nd), 0, nz + 0.05], 0.07, 8));
      G.leg.push(rod([X(nd + 0.25), 0, F.bot(nd) - 0.2], [X(nd + 0.05), 0, nz + 0.35], 0.09, 8));
      G.leg.push(rod([X(nd - 0.6), 0, F.bot(nd) + 0.05], [X(nd + 0.1), 0, nz + 0.7], 0.035, 6));
      G.leg.push(cylX(0.06, 0.25, X(nd + 0.1), 0, F.bot(nd) - 0.65, 8));
      [1, -1].forEach(function (k) { G.door.push(box(1.1, 0.03, 0.45, X(nd + 0.2), k * 0.25, F.bot(nd) - 0.22)); });
      [1, -1].forEach(function (s2) {
        var md = 10.9, yc = s2 * 1.545, mr = 0.34, mz = GROUND + mr, zt = -0.75;
        wheel(G, X(md), yc + s2 * 0.12, mz, mr, 0.22);
        G.leg.push(rod([X(md), yc - s2 * 0.02, mz], [X(md), yc + s2 * 0.24, mz], 0.05, 6));
        G.leg.push(rod([X(md + 0.25), yc - s2 * 0.05, zt], [X(md), yc - s2 * 0.02, mz + 0.05], 0.08, 8));
        G.leg.push(rod([X(md - 0.7), yc - s2 * 0.1, zt], [X(md), yc - s2 * 0.02, mz + 0.45], 0.045, 6));
        G.door.push(box(1.2, 0.03, 0.55, X(md + 0.1), yc - s2 * 0.2, zt - 0.25));
      });
      var root = assemble(K, G, C, P, folds);
      node(root, "aar_probe", X(2.75), 0.60, 1.05);
      return root;
    }
    return { build: build };
  })();

  /* ---------------- finishes ---------------- */
  var FIN_VUL = {
    e60: { key: "vulcan_white", base: "#e6e6df", line: "rgba(80,84,88,0.20)", rivet: "rgba(70,72,74,0.18)", seed: 4207,
           panel: 0.035, mottle: 0.05, grime: 0.07, rough: 0.5, metal: 0.05, dark: 0x1a1c1e, seam: 0x8e9294, leg: 0x9a9da0 },
    e80: { key: "vulcan_dark", base: "#5d6559", line: "rgba(18,20,18,0.30)", rivet: "rgba(14,16,14,0.25)", seed: 4211,
           panel: 0.05, mottle: 0.06, grime: 0.10, rough: 0.75, metal: 0.04, dark: 0x1a1c1e, seam: 0x30352f, leg: 0x85898c }
  };
  var FIN_M4 = {
    IVA: { key: "mirage4_metal", base: "#adb1b4", line: "rgba(50,54,58,0.30)", rivet: "rgba(40,42,44,0.25)", seed: 5303,
           panel: 0.09, mottle: 0.05, grime: 0.08, rough: 0.38, metal: 0.55, dark: 0x2c2a27, seam: 0x63676a, leg: 0x9fa3a6, bomb: true },
    IVP: { key: "mirage4_grey", base: "#727270", line: "rgba(20,20,20,0.30)", rivet: "rgba(16,16,16,0.25)", seed: 5309,
           panel: 0.05, mottle: 0.06, grime: 0.10, rough: 0.72, metal: 0.06, dark: 0x2c2a27, seam: 0x3c3c3a, leg: 0x8e9295, bomb: false }
  };
  var FIN_K = { key: "mig29k_blugrey", base: "#8396a6", line: "rgba(24,30,36,0.30)", rivet: "rgba(20,24,28,0.22)", seed: 6619,
                panel: 0.05, mottle: 0.05, grime: 0.08, rough: 0.7, metal: 0.06, dark: 0x6f7880, seam: 0x4e5a64, leg: 0x9aa0a4 };

  /* ---------------- the Valiant B.1: gb_vforce.js's airframe plus the bomber's fittings ---------------- */
  function valiant(THREE, M, C) {
    var root = HeroVForce.valiant(THREE, M, C);
    V = THREE; NOSE = 16.26;      /* gb_vforce.js's Valiant datum: X = 16.26 - d */
    var K = { seam: [], ink: [], glass: [], metal: [], skin: [] }, s, i;
    /* the bay doors: VA side x 240..575, on the 1.65 m round belly (gb_vforce.js's table) */
    function belly(y) { return -1.66 * Math.sqrt(Math.max(0, 1 - Math.pow(y / 1.66, 2))) - 0.015; }
    [0.62, -0.62].forEach(function (y) { seam(K.seam, [[X(7.9), y, belly(y)], [X(19.6), y, belly(y)]]); });
    seam(K.seam, [[X(7.9), 0, belly(0)], [X(19.6), 0, belly(0)]]);
    [7.9, 13.0, 19.6].forEach(function (d) { seam(K.seam, [[X(d), 0.62, belly(0.62)], [X(d), 0.3, belly(0.3)], [X(d), 0, belly(0)], [X(d), -0.3, belly(-0.3)], [X(d), -0.62, belly(-0.62)]]); });
    /* the round crew door on the port side (VA x 147..172), two small windows behind it */
    var pts = [];
    for (i = 0; i <= 20; i++) { var a = i / 20 * 2 * PI; pts.push([X(4.94 + 0.45 * Math.cos(a)), 1.648, -0.2 + 0.64 * Math.sin(a)]); }
    seam(K.ink, pts);
    K.glass.push(discY(0.19, 0.19, X(5.71), 1.63, 0.30, 12));
    K.glass.push(discY(0.26, 0.2, X(6.95), 1.62, 0.22, 4));
    /* the visual bomb-aimer's blister (VA x 125..150) and the ventral blade aerial (VA x 180..195) */
    K.skin.push(ell(0.5, 0.34, 0.24, X(4.2), 0, -1.58, 14, 8));
    K.glass.push(ell(0.22, 0.26, 0.14, X(3.85), 0, -1.66, 10, 6));
    plate(K.metal, [[5.65, -1.62], [6.2, -1.62], [6.15, -2.0], [5.95, -2.0]], 0, 0.04);
    /* vortex generators on the outer wings (VA plan, ten a side) */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 10; i++) {
      var y = 11.9 + i * 0.17, d = 15.55 + i * 0.1;
      plate(K.metal, [[d, 0.95], [d + 0.12, 0.95], [d + 0.1, 1.05], [d + 0.02, 1.05]], s * y, 0.015);
    }
    var mats = {
      seam: new THREE.MeshStandardMaterial({ color: 0x8c9092, roughness: 0.8, metalness: 0.1 }),
      ink: new THREE.MeshStandardMaterial({ color: 0x2a2c2e, roughness: 0.85, metalness: 0.05 }),
      glass: new THREE.MeshStandardMaterial({ color: 0x24343c, roughness: 0.1, metalness: 0.5, side: THREE.DoubleSide }),
      metal: new THREE.MeshStandardMaterial({ color: 0x55595d, roughness: 0.45, metalness: 0.6, side: THREE.DoubleSide }),
      skin: new THREE.MeshStandardMaterial({ color: 0xe1e1db, roughness: 0.45, metalness: 0.05 })
    };
    ["seam", "ink", "glass", "metal", "skin"].forEach(function (k) { if (K[k].length) root.add(new THREE.Mesh(merge(K[k]), mats[k])); });
    node(root, "aar_probe", X(-0.47), 0, 0.23);
    return root;
  }

  function wrap(T, nose, P) { return function (THREE, M, C) { V = THREE; NOSE = nose; return T.build(C, P); }; }
  return {
    valiant: valiant,
    vulcanE60: wrap(VUL, 15.30, FIN_VUL.e60), vulcanE80: wrap(VUL, 15.30, FIN_VUL.e80),
    mirageIVA: wrap(M4, 11.50, FIN_M4.IVA), mirageIVP: wrap(M4, 11.50, FIN_M4.IVP),
    mig29k: wrap(K29, 8.68, FIN_K)
  };
})();

/* len: each model's measured X extent */
UNIT_MODELS["gbr_e50_heavybomber"] = { len: 33.46, build: HeroRedoBombers.valiant };     /* probe tip to tail cone */
UNIT_MODELS["gbr_e60_heavybomber"] = { len: 32.12, build: HeroRedoBombers.vulcanE60 };   /* probe tip to tail cone */
UNIT_MODELS["gbr_e80_heavybomber"] = { len: 32.12, build: HeroRedoBombers.vulcanE80 };
UNIT_MODELS["fra_e60_heavybomber"] = { len: 23.43, build: HeroRedoBombers.mirageIVA };   /* probe tip to fin tip */
UNIT_MODELS["fra_e80_heavybomber"] = { len: 23.43, build: HeroRedoBombers.mirageIVP };
UNIT_MODELS["cfighter_k"]          = { len: 17.36, build: HeroRedoBombers.mig29k };      /* pitot tip to stabilator tip */
