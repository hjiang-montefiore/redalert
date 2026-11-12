/* ======== pla_air_modern.js - HERO models: modern PLA aircraft and helicopters ========
   Eight skirmish rows, one file. Model space for all: +X nose, +Y left (port),
   +Z up, metres. No national markings, serials or bort numbers anywhere: plain
   paint, the team colour (exactly C.team) in small strips on the upper wings
   (on the tail boom of the Z-20; the Z-9C keeps pla_z9.js's).

   KEYS REGISTERED (at the foot)
     cfighter_c  Shenyang J-15       HeroSu33 (js/hero/ru_su33.js) CALLED, repainted
     sead_c      Shenyang J-16       new: j16(), VARIANTS.sead
     ew_c        Shenyang J-16D      new: j16(), VARIANTS.ewd
     cstealth_c  Shenyang J-35 (carrier)          new: j35()
     sbomber_c   Xian H-6N           new: h6n()
     tanker_c    Xian YY-20 (Y-20U)  new: yy20()
     trans_c     Harbin Z-20         new: z20()
     asw_helo_c  Harbin Z-9C         HeroZ9 (js/hero/pla_z9.js) CALLED, with the Z-9C's differences
   LOAD AFTER: js/units3d.js, js/units3d_air2.js, js/models3d_hd.js,
   js/models3d_east.js, js/asw_helo_fit.js (each registers a generic model for
   one of these keys, which this file replaces), js/hero/ru_su33.js (HeroSu33)
   and js/hero/pla_z9.js (HeroZ9).

   REUSE (AGENT_POLICY rule 5), and why the rest is built here
     - J-15: ru_su33.js's Su-33 is the same airframe; it is called as it is.
       That module has NO plain option: its one canvas carries the Russian
       Navy two-tone and red stars. The J-15 build therefore takes the
       textured skin material off every mesh after the call (a clone, so
       cfighter_p is untouched) and gives it the PLAN's plain grey (P1). Its
       wing folds, gear and team strips are kept. Its R-27ER/R-73 stores stay
       (they are merged into the module's meshes; the row's PL-12/PL-8 are
       not drawn).
     - J-16 / J-16D: pla_su27.js's Su-27SK has a SINGLE-seat canopy lofted
       into its one skin mesh, the Su-27's cut fin tips, and the IRST and gun
       merged into its meshes, with no option for any of them; so the
       Flanker is built here, once, with a VARIANTS table for the two rows.
     - H-6N: ru_tu16.js's Tu-16 has a plain() option, but its glazed nose,
       tail-gun position, three turrets and the AM-3 intakes are merged into
       its skin, glass and metal meshes, with no option to leave them off.
       The H-6N has none of them, so it is built here off drawing T.
     - Z-20: h60_hawk_family.js exports only whole S-70/H-60 variants, no
       parts (and its rotor is four-bladed); the Z-20 is built here. Its rotor
       and tail-rotor MOUNTS follow that file's convention.
     - Z-9C: pla_z9.js's Z-9W is called as it is; its "stores" mesh (the
       HJ-8 tubes and roof sight) is dropped, the outrigger beams, the tube
       end caps and the sight window are cut out of its meshes by position,
       its olive canvas is scaled to the PLAN grey in linear light (as
       deu_us_pattern.js repaints a reused hull), and the radar radome, chin
       sensor and rescue hoist are added.
     - J-35: nothing to reuse (pla_j20.js and nato_e00_stealthfighter.js are
       other airframes; their conventions are followed).

   REFERENCES (Wikimedia Commons, fetched for this file at 960-1600 px; cached
   in scratchpad/q_plaair_ref; Wikipedia for the figures)
     A  "Sukhoi Su-27 3-view line drawing.svg" (1280 px render) - the Flanker
        airframe: side 32.87 px/m (radome tip to sting 722 px = 21.935 m),
        plan 32.3 px/m along, 32.7 px/m across (tip rails to 14.7 m).
     P1 "PLAN Shenyang J-15 carrier-based fighter aircraft 20220504.jpg" - two
        J-15s: plain grey overall, the radome the same grey.
     P2 "Chinese Air Force, 61248, Shenyang J-16 (51524684603).jpg" - J-16 from
        below: the TANDEM canopy, light grey, empty wingtip rails, wing pylons.
     P3 "PLAAF J-16 - 1.jpg" - J-16 from port: the tandem canopy and the raised
        spine behind it, SQUARED fin tips, a large missile under the inner
        wing, AAMs under the intakes, the long sting.
     P4 "Shenyang J-16D.jpg" - J-16D parked at Zhuhai: WINGTIP pods, big pods
        under the wings and under the nacelles, NO IRST ball, twin nose
        wheels, grey.
     P5 "J-16 at Changchun Air Show 20250921.jpg" - the planform from below.
     J  "Shenyang J-35 3-view drawing (No BG) (Updated).png" (1600 px) - plan,
        side and front: 53.06 px/m on the 17.3 m length.
     P7 "J-35 Arrested Recovery.jpg" - the carrier J-35: twin nose wheels on a
        long leg, single mains, light grey. P8 "PLAN J-35 on Type 003
        Fujian.png" - from behind: the canted fins, the two nozzles close.
     T  "Tupolev Tu-16.svg" (1600 px render) - side, plan and front of the
        Tu-16 the H-6 copies: 34.25 px/m on 34.8 m; its plan is narrow (31.3 m
        span), so y is taken at x1.054 to the published 33.0 m.
     P9 "PLAAF H-6N 2024-11-30.jpg" (2800 px) - H-6N in profile: the SOLID
        nose with a dark radome cap, the refuelling PROBE above it, the dark
        cockpit windows, the big turbofan nozzle ring at the wing root, the
        dorsal dome behind the wing, NO turrets, NO tail guns (a rounded cone
        with a dark tip), the fin, the gear pods.
     P10 "YY-20A taxiing at CCAS2023 (20230724103914).jpg" - side-on: the
        profile, nose, high wing, four nacelles, sponsons, T-tail, the hose
        pods, six main wheels. Scale 32.6 px/m: the published 47.0 m from the
        nose to the tailplane tips.
     P11 "20047 Xi'an Y-20 Kunpeng PLAAF El Alamein 5.9.24 (54029572679).jpg"
        - head-on: anhedral, the engine stations (inner 0.38, outer 0.61 of
        the semispan), the near-round fuselage section, the T-tail.
     P12 "PLAAF YY-20 20844 refueling J-16 2024-11-30.jpg" - a YY-20 streaming
        a hose from an underwing pod to a J-16 (also a J-16 side view).
     P13 "Z-20 Airshow China 2022 ground.jpg" - parked, port bow: FIVE blades,
        the canted tail rotor, the stabilator, the tail wheel, the engine
        intakes, the windows, dark olive-grey.
     P14 "Z-20 Airshow China 2022 fly.jpg" - starboard side in flight: the
        profile, the upturned exhaust ducts, the tail rotor on the starboard
        side of the pylon, the gear. 74 px/m: the published 20 m with rotors
        turning, which puts the 16 m disc 2.1 m ahead of the nose and gives a
        0.61 m main wheel and a 2.98 m tail rotor.
        "Z-20 Helicopter 20221020.jpg" - head-on: the chin, the windscreen.
     P15 "Z9C Chinese Navy (16391212735).jpg" - Z-9C aboard, port side: light
        grey, the long BLACK nose radome, no outriggers, no weapons.
     P16 "Chinese Helicopter Lands on HMS Cornwall MOD 45150752.jpg" - Z-9C
        from starboard: grey, the black nose cap, a sensor under the chin, the
        RESCUE HOIST over the starboard door, the stub behind the door, no
        outrigger beams.
     Published (en.wikipedia): J-15 22.28 x 14.70 x 5.92 m; J-16 21.9 x 14.7 x
     6.36 m; J-35 17.3 x 11.5 x 4.8 m; H-6 34.8 x 33.0 x 10.36 m; Y-20 47 x 50
     x 15 m; Z-20 length 20 m, height 5.3 m, rotor 16 m; Z-9 (pla_z9.js) 12.11
     m fuselage, 11.94 m rotor, 4.01 m.

   MEASURED (X extent x span x height) against published
     J-15   21.93 x 14.70 x 5.72  (ru_su33.js's own; its 21.18 m airframe plus the
                                  nose pitot)                 22.28 x 14.70 x 5.92
     J-16   21.93 x 14.62 x 5.96  (J-16D 14.86 over its pods)  21.9 x 14.7 x 6.36
     J-35   17.25 x 11.50 x 4.97                               17.3 x 11.5 x 4.8
     H-6N   35.48 x 32.98 x 9.67  (34.3 without the probe)     34.8 x 33.0 x 10.36
     YY-20  47.00 x 50.00 x 14.55                              47 x 50 x 15
     Z-20   19.79 x 16.00 x 5.04  (rotors turning)             20 x 16 x 5.3
     Z-9C   13.76 x 11.94 x 3.80  (pla_z9.js's own)            13.73 x 11.94 x 4.01
   Heights are measured, not fitted: J-16 - drawing A's Su-27 fin height is
   kept (the Su-30's taller fin is not measured off anything, see below); H-6N
   - drawing T's ground line gives 9.67 m (ru_tu16.js read 10.33 off another
   drawing); J-35 - the gear's reach under the belly is P7's (in the air, oleos
   out), 0.17 m over; Z-20 - the tail-rotor blade drawn upright, the hub at
   the main hub's height as P14 gives it once its 8 deg nose-up is taken out.

   RECOGNITION (each drawn)
     J-15: as ru_su33.js (canards, folding wings, short sting, twin nose
       wheels), plain grey (P1).
     J-16: the Flanker planform and nacelles (A); the TANDEM canopy with the
       bow between the seats and the raised spine (P2, P3); squared fin tips
       (P3); the long sting (A, P3); twin nose wheels (P4); IRST ball to
       starboard and the gun port (sead only); empty tip rails (P2, P5).
     J-16D: wingtip pods; big pods on the wing pylons and under the nacelles;
       no IRST, no gun (P4).
     J-35: chined nose, bubble canopy, cheek intakes with DSI bumps, the
       41 deg wing with the forward-swept trailing edge, canted fins, big
       all-moving tailplanes, the two nozzles close together with the flat
       tail between them, the EOTS window (J); twin nose wheels (P7).
     H-6N: the Tu-16 airframe (T) with the solid nose, the probe, the dorsal
       dome, the big turbofan nacelles in the wing roots and the clean tail
       cone (P9); the gear pods, fences, swept fin (T).
     YY-20: high wing with anhedral, four podded turbofans, sponsons, T-tail,
       upswept tail cone, the HOSE PODS under the outer wings (P10-P12).
     Z-20: five-blade rotor, canted four-blade tail rotor on the starboard
       side, stabilator, tail wheel, upturned exhausts, chin (P13, P14).
     Z-9C: Dauphin airframe (pla_z9.js), grey, black radar radome, chin
       sensor, rescue hoist, no outriggers (P15, P16).

   NOT CONFIRMED (judgement, not measured or published)
     - J-15: the grey's tone; that the Su-33's stores and nose pitot are the
       J-15's (they stay because the module merges them).
     - J-16: the canopy's length (4.1-8.05 m) and the spine's rise behind it,
       read through P2 and P3's perspective, not off a drawing; the fin height
       (A's Su-27 fin, squared at the top: the published 6.36 m suggests a
       taller fin on the J-16, which no drawing here measures); the paint
       tone; the store load (P3 shows a large missile under the inner wing
       and AAMs under the intakes: drawn as a 4.7 m x 0.36 m YJ-91, which is
       the row's weapon, and a 3.9 m AAM); the twin nose wheels' size.
     - J-16D: pod sizes and stations, read through P4's perspective.
     - J-35: drawing J's span is 12.14 m against the published 11.5, so every
       y is taken at x0.947 (as pla_j20.js does with its drawing); drawing J
       is of the land-based J-35A: no wing fold, tailhook or launch bar is
       drawn, none being shown by P7 or P8; section shapes; the gear stations.
     - H-6N: the intake and nacelle size and place (P9 shows the nozzle ring;
       the intakes are T's place, enlarged); the dorsal dome's size; the
       cockpit windows' shapes; the probe's length; the paint's tone (P9 is
       overexposed).
     - YY-20: no drawing exists on Commons. The planform (root chord, sweep
       25 deg, the tip chord) is judged from P10's side view and P11; the
       span is the published 50 m, the anhedral 4 deg (P11's droop is
       exaggerated by its low camera); the tailplane's span (16.8 m); the
       fuselage's width (taken equal to its depth, as P11's section looks).
     - Z-20: section shapes, the cabin windows' sizes, the gear stations,
       the tail rotor's cant (17 deg) and radius, read off P13/P14.
     - Z-9C: the radome's shape (P15's is longer than P16's: a short black
       cap is drawn), the hoist's dimensions, the sensor turret's size.

   DETAIL PASS (J-35 and Z-20 only; the other rows here are untouched). The
   fittings the first pass left out, each placed off the reference named:
     J-35: the saw-toothed nozzle trailing edges, liners, flame-holder rings
       and centre bodies (J, P8); the canopy sills; the intake lips; blade
       aerials on the spine and belly and the anti-collision beacon; wingtip
       navigation lights (J's plan draws a lamp at each tip); the stowed
       arrester hook (P7 shows the J-35 taking a wire: its length and place
       are NOT CONFIRMED); the EOTS window's frame; gear doors with
       saw-toothed edges (J), oleos with bright pistons and torque links,
       hubs, brakes, axles, the retraction jacks and the taxi lamps.
     Z-20: the windscreen's posts, bows and wipers, frames round every
       window (P13); door handles, the steps and the box under the cockpit
       door; the chin windows (P13); the intake lips and particle-separator
       screens; the exhaust lips; the nose sensor box (P13, P14); the aerial
       post on the roof, the fairing on the boom's root and the blade under
       it (P14), a roof and a belly blade; the drive-shaft cover; beacons and
       stabilator-tip lights; the rotor head's root cuffs, elastomeric
       bearings, dampers, pitch horns and links, the swashplate and its
       servos (P13); the gear's oleos, hubs, brakes, axles and the tail-wheel
       fork. Sizes of these small parts are read through P13/P14's
       perspective, NOT measured.
     Both: finish() paints seams with fastener rows, access panels, the
       J-35's formation-light strips and saw-toothed door outlines (J), the
       Z-20's door outlines, exhaust soot, rain and airflow streaks and
       grime onto the skin sheet. Measured extents are unchanged.
     J-35 2984 -> 6292 tris, 9 -> 14 draw calls; Z-20 3016 -> 8056 tris,
     12 -> 15 draw calls.

   DETAIL PASS 2 (J-16, J-16D, H-6N and YY-20; the J-15 and Z-9C untouched): the detail kit and
   finish() now serve these rows too. J-16/J-16D: nozzle liners, flame holders, centre bodies and
   petal seams, canopy sills, the L-shaped air-data probes and AoA vanes, intake-trunk position
   lamps (placement NOT CONFIRMED), intake lips, blade aerials, beacons, the tail lamp, oleos, hubs,
   brakes, axles and the nose leg's taxi lamps. H-6N: wingtip lamps, beacons, the tail lamp, blade
   aerials and the long wire, cockpit window frames, intake lips, spinner cones, nozzle liners and
   turbine cones, oleos, hubs and the bogie's brake rods, the probe's tip ring. YY-20: wingtip lamps,
   beacons, the tail lamp, blade aerials, the satcom fairing, flight-deck window frames, paratroop
   door seams, flap-track fairings, intake lips, nozzle liners, reverser seams, oleos and hubs, the
   nose leg's taxi lamps; the aar_ nodes are as before. Each paint gains seams, fastener rows,
   access panels, soot and grime (finish()). Sizes read through the references' perspective, NOT
   measured. sead_c 5176 -> 8280, ew_c 5312 -> 8416, sbomber_c 4598 -> 9338, tanker_c 4950 ->
   11010 tris; 9-10 -> 12-13 draw calls; extents and len unchanged.

   NODES: "gear" on every row; the helicopters also "rotor" (the main head,
   with "rotordisc" inside it) and "tailrotor" (Z-20: the h60_hawk_family.js
   mounts - the main head's local +Y up the mast, turning anti-clockwise from
   above; the tail rotor's shaft its local +Z, to starboard and 17 deg up.
   Z-9C: pla_z9.js's own). The J-15 keeps ru_su33.js's four "wingfold" groups.
   MATERIALS: skin (one canvas per build), dark, metal, glass, tyre, leg,
   team, and per build nozzle, radome, store, blade, disc. ASCII only.
   ======================================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPlaAirModern = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;                                   /* the THREE build() is handed */

  /* ================================================================ kit ==
     One mesh per material per group (flush). Geometry is authored in model
     metres: +X nose, +Y port, +Z up. */
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function lerp(a, b, f) { return a + (b - a) * f; }
  /* piecewise-linear lookup in a table of [key, v1, v2, ...] rows */
  function tab(T, k, col) {
    var i, f;
    if (k <= T[0][0]) return T[0][col];
    for (i = 0; i < T.length - 1; i++) if (k <= T[i + 1][0]) {
      f = (k - T[i][0]) / (T[i + 1][0] - T[i][0]);
      return lerp(T[i][col], T[i + 1][col], f);
    }
    return T[T.length - 1][col];
  }
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz) geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) { return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz); }
  /* a cylinder along model x, y or z */
  function cyl(r0, r1, len, seg, axis, x, y, z, open) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, !!open);
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  function sph(r, ws, hs, x, y, z, sx, sy, sz) {
    var g = new V.SphereGeometry(r, ws, hs);
    g.scale(sx || 1, sy || 1, sz || 1);
    return place(g, x, y, z);
  }
  /* a round bar from p to q */
  function bar(p, q, r, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-3;
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, false);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  /* mirror a geometry to the other side (y -> -y), winding kept outward */
  function mirrorY(geo) {
    var g = flat(geo).clone(), p = g.attributes.position.array, i, t;
    for (i = 1; i < p.length; i += 3) p[i] = -p[i];
    for (i = 0; i < p.length; i += 9) {
      for (t = 0; t < 3; t++) { var a = p[i + 3 + t]; p[i + 3 + t] = p[i + 6 + t]; p[i + 6 + t] = a; }
    }
    g.attributes.position.needsUpdate = true;
    g.deleteAttribute("normal");
    if (g.attributes.uv) g.deleteAttribute("uv");
    g.computeVertexNormals();
    return g;
  }
  function both(list, geo) { list.push(geo); list.push(mirrorY(geo)); }
  /* a closed solid through a run of sections with the same number of
     corners, wound from the sections' Newell normal (ru_su33.js's sloft) */
  function sloft(S) {
    var A = S[0], B = S[1], n = A.length, i, k, nx = 0, ny = 0, nz = 0, ax = 0, ay = 0, az = 0, out = [];
    for (i = 0; i < n; i++) {
      var p = A[i], q = A[(i + 1) % n];
      nx += (p[1] - q[1]) * (p[2] + q[2]); ny += (p[2] - q[2]) * (p[0] + q[0]); nz += (p[0] - q[0]) * (p[1] + q[1]);
      ax += B[i][0] - A[i][0]; ay += B[i][1] - A[i][1]; az += B[i][2] - A[i][2];
    }
    var sg = (nx * ax + ny * ay + nz * az) >= 0 ? 1 : -1;
    function q3(a, b, c) { if (sg > 0) out.push(a, b, c); else out.push(a, c, b); }
    var L = S[S.length - 1];
    for (i = 1; i < n - 1; i++) { q3(A[0], A[i + 1], A[i]); q3(L[0], L[i], L[i + 1]); }
    for (k = 0; k < S.length - 1; k++) {
      var P = S[k], Q = S[k + 1];
      for (i = 0; i < n; i++) {
        var j = (i + 1) % n;
        q3(P[i], P[j], Q[j]); q3(P[i], Q[j], Q[i]);
      }
    }
    return tris(out);
  }
  /* aerofoil ring from le to te, thickness t along the unit normal nrm */
  function foil(le, te, t, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(0, 0), p(0.05, t * 0.33), p(0.16, t / 2), p(0.40, t * 0.5), p(0.70, t * 0.32), p(1, 0.004),
            p(1, -0.004), p(0.70, -t * 0.32), p(0.40, -t * 0.5), p(0.16, -t / 2), p(0.05, -t * 0.33)];
  }
  /* a thin flat panel (plan polygon pts [x, y] at height z, thickness t) */
  function plate(pts, z, t) {
    return sloft([pts.map(function (q) { return [q[0], q[1], z - t / 2]; }), pts.map(function (q) { return [q[0], q[1], z + t / 2]; })]);
  }
  /* a fin-like panel standing in the x-z plane at y (pts [x, z]), thickness t */
  function vplate(pts, y, t) {
    return sloft([pts.map(function (q) { return [q[0], y - t / 2, q[1]]; }), pts.map(function (q) { return [q[0], y + t / 2, q[1]]; })]);
  }

  /* ---- the loft. A section is a superellipse with separate upper and
     lower half-heights and exponents (1 round, below 1 boxier); rake shifts
     each ring point along x by rake * (z - zc). Sections run nose to tail. */
  function sec(x, yc, zc, w, hu, hl, eu, el, rake) {
    return { x: x, yc: yc, zc: zc, w: Math.max(w, 0.003), hu: Math.max(hu, 0.003), hl: Math.max(hl, 0.003),
             eu: eu || 1, el: el || eu || 1, rake: rake || 0 };
  }
  function sgn(v) { return v < 0 ? -1 : 1; }
  function ringOf(s, n) {
    var o = [], j, t, c, sn, e, z;
    for (j = 0; j < n; j++) {
      t = 2 * PI * j / n; c = Math.cos(t); sn = Math.sin(t);
      e = sn >= 0 ? s.eu : s.el;
      z = s.zc + (sn >= 0 ? s.hu : s.hl) * sgn(sn) * Math.pow(Math.abs(sn), e);
      o.push([s.x + s.rake * (z - s.zc), s.yc + s.w * sgn(c) * Math.pow(Math.abs(c), e), z]);
    }
    return o;
  }
  function capOf(s, n, dx, front) {
    var rr = ringOf(s, n), t = [], cx = 0, cy = 0, cz = 0, j;
    for (j = 0; j < n; j++) { cx += rr[j][0]; cy += rr[j][1]; cz += rr[j][2]; }
    var o = [cx / n + dx, cy / n, cz / n];
    for (j = 0; j < n; j++) {
      var p0 = rr[j], p1 = rr[(j + 1) % n];
      if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
    }
    return tris(t);
  }
  function loft(secs, n, noseDx, tailDx) {
    var pos = [], idx = [], i, j, r;
    for (i = 0; i < secs.length; i++) {
      r = ringOf(secs[i], n);
      for (j = 0; j < n; j++) pos.push(r[j][0], r[j][1], r[j][2]);
    }
    for (i = 0; i < secs.length - 1; i++) for (j = 0; j < n; j++) {
      var a = i * n + j, b = i * n + (j + 1) % n, c = (i + 1) * n + j, d = (i + 1) * n + (j + 1) % n;
      idx.push(a, c, b, b, c, d);
    }
    var geo = new V.BufferGeometry();
    geo.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    var out = [geo];
    if (noseDx !== null && noseDx !== undefined) out.push(capOf(secs[0], n, noseDx, true));
    if (tailDx !== null && tailDx !== undefined) out.push(capOf(secs[secs.length - 1], n, -tailDx, false));
    return out;
  }
  function push(list, geos) {
    if (geos instanceof Array) { for (var i = 0; i < geos.length; i++) list.push(geos[i]); }
    else list.push(geos);
  }
  /* a round body of revolution along x: prof = [[x, r], ...] nose first */
  function lathe(prof, y, z, n) {
    return loft(prof.map(function (q) { return sec(q[0], y, z, q[1], q[1], q[1], 1, 1); }), n || 12, 0, 0);
  }

  /* --------------------------------------------------- the paint sheet --
     Every textured skin is projected onto a canvas of four bands: TOP (x
     across, y down the band, port at the top), PORT side and STARBOARD side
     (x across, z down), BELLY (as the top). A face takes the band its normal
     looks into. sh = { x0, x1, ym, z0, z1, k } (k px per metre). */
  function sheet(x0, x1, ym, z0, z1, k) {
    var s = { x0: x0, x1: x1, ym: ym, z0: z0, z1: z1, k: k };
    s.W = Math.ceil((x1 - x0) * k); s.TB = Math.ceil(2 * ym * k); s.SB = Math.ceil((z1 - z0) * k);
    s.H = 2 * s.TB + 2 * s.SB;
    s.band = [0, s.TB, s.TB + s.SB, s.TB + 2 * s.SB];            /* top, port, stbd, belly */
    s.u = function (x) { return clamp((s.x1 - x) * k, 1, s.W - 1); };      /* nose at the left */
    s.vy = function (y, b) { return s.band[b] + clamp((s.ym - y) * k, 1, s.TB - 1); };
    s.vz = function (z, b) { return s.band[b] + clamp((s.z1 - z) * k, 1, s.SB - 1); };
    return s;
  }
  function projUV(geo, sh) {
    var p = geo.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var b = nz > 0.5 ? 0 : nz < -0.5 ? 3 : (ny >= 0 ? 1 : 2);
      var endOn = Math.abs(nx) > Math.abs(ny) * 1.6 && b !== 0 && b !== 3;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, W;
        if (b === 0 || b === 3) W = sh.vy(y, b); else W = sh.vz(z, b);
        U = sh.u(endOn ? x + 0.0 : x);
        uv[(t / 3 + k) * 2] = U / sh.W;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / sh.H;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }
  function rngFor(seed) { var sd = seed; return function () { sd = (sd * 16807) % 2147483647; return sd / 2147483647; }; }
  /* paint: base colours per band, panel frames (model x) on every band,
     a light speckle, then extra(g, sh) for regions (radomes, walkways) */
  function paintSheet(sh, pal, frames, seed, extra) {
    var cv = document.createElement("canvas");
    cv.width = sh.W; cv.height = sh.H;
    var g = cv.getContext("2d"), R = rngFor(seed), i, b, x;
    g.fillStyle = pal.top; g.fillRect(0, 0, sh.W, sh.TB);
    g.fillStyle = pal.side; g.fillRect(0, sh.TB, sh.W, 2 * sh.SB);
    g.fillStyle = pal.belly; g.fillRect(0, sh.band[3], sh.W, sh.TB);
    /* the sides take the belly colour below the line pal.zb */
    if (pal.zb !== undefined) {
      g.fillStyle = pal.belly;
      for (b = 1; b <= 2; b++) g.fillRect(0, sh.vz(pal.zb, b), sh.W, sh.band[b] + sh.SB - sh.vz(pal.zb, b));
    }
    if (extra) extra(g, sh);
    g.strokeStyle = "rgba(0,0,0,0.14)"; g.lineWidth = 1;
    for (i = 0; i < frames.length; i++) {
      x = sh.u(frames[i]);
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, sh.H); g.stroke();
    }
    g.fillStyle = "rgba(0,0,0,0.07)";
    for (i = 0; i < 70; i++) {
      var x0 = R() * sh.W, y0 = R() * sh.H, n = 6 + ((R() * 20) | 0);
      for (b = 0; b < n; b++) g.fillRect(x0 + b * 4, y0, 1.2, 1.2);
    }
    for (i = 0; i < 40; i++) {
      g.fillStyle = "rgba(20,24,28," + (0.02 + R() * 0.04).toFixed(3) + ")";
      g.fillRect(R() * sh.W, R() * sh.H, 6 + R() * 30, 2 + R() * 5);
    }
    return cv;
  }
  function texOf(cv) {
    var t = false;
    try {
      t = new V.CanvasTexture(cv);
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = false; }
    return t;
  }
  /* the materials every build here shares; skin carries the sheet */
  function makeMats(C, skinCv, base, extra) {
    var m = {}, tex = skinCv ? texOf(skinCv) : false;
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.78, metalness: 0.10 });
    if (tex) m.skin.map = tex; else m.skin.color.set(base);
    m.dark  = new V.MeshStandardMaterial({ color: 0x1b1e20, roughness: 0.72, metalness: 0.25 });
    m.metal = new V.MeshStandardMaterial({ color: 0x6a6e71, roughness: 0.45, metalness: 0.60 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x141516, roughness: 0.95, metalness: 0.02 });
    m.glass = new V.MeshStandardMaterial({ color: 0x24343c, roughness: 0.10, metalness: 0.40 });
    m.leg   = new V.MeshStandardMaterial({ color: 0x8a8f92, roughness: 0.50, metalness: 0.45 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    if (extra) for (var k in extra) m[k] = new V.MeshStandardMaterial(extra[k]);
    return m;
  }
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
  /* one mesh per material: B = { key: [geometries] } */
  function flush(parent, B, mats, sh) {
    for (var k in B) {
      if (!B[k].length) continue;
      var geo = merge(B[k]);
      if (k === "skin" && sh) projUV(geo, sh);
      var m = new V.Mesh(geo, mats[k]);
      m.name = k;
      parent.add(m);
    }
  }
  function bins(keys) { var B = {}; keys.forEach(function (k) { B[k] = []; }); return B; }

  /* a wheel standing on the ground, axle along y */
  function wheel(L, r, w, x, y, zg, seg) {
    L.tyre.push(cyl(r, r, w, seg || 16, "y", x, y, zg + r));
    L.leg.push(cyl(r * 0.55, r * 0.55, w + 0.02, 10, "y", x, y, zg + r));
  }

  /* ======================================================= detail kit ==
     Added in the detail pass, for j35() and z20(), and in the second for
     the J-16/J-16D, H-6N and YY-20 (the J-15 and Z-9C do not call it): the
     fittings and the finish the first pass left out. Paint: finish() draws seams, access panels, fastener rows,
     exhaust soot, rain and airflow streaks and grime onto a skin sheet. */
  function seg2(g, a, b) { g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.stroke(); }
  /* a row of fastener dots from a to b (canvas px), every st px */
  function dots(g, a, b, st) {
    var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.sqrt(dx * dx + dy * dy), n = Math.floor(L / st), i;
    for (i = 0; i <= n; i++) g.fillRect(a[0] + dx * i / Math.max(n, 1) - 0.5, a[1] + dy * i / Math.max(n, 1) - 0.5, 1, 1);
  }
  /* o = { side: [[x0, x1, z]] lengthwise seams (both side bands),
           sideV: [[x, z0, z1]] upright seams (both sides),
           top / belly: [[x0, y0, x1, y1]] seams on the top / belly band,
                        drawn at y and mirrored to -y,
           box: [[band, x0, x1, a0, a1]] access panels (band 1 = both sides,
                a = z there; band 0 / 3: a = y, mirrored),
           soot: [[x0, x1, z0, z1]] exhaust stain on both sides, darkest at x0,
           topSoot: [[x0, x1, y0, y1]] the same on the top band, mirrored,
           grime: 0..1 } */
  function finish(g, s, o, seed) {
    var R = rngFor(seed || 4242), i, b, gr = o.grime === undefined ? 0.6 : o.grime;
    /* weathering: faded and darker patches, then grime toward the lower sides and belly */
    for (i = 0; i < 90; i++) {
      g.fillStyle = (R() < 0.5 ? "rgba(255,255,255," : "rgba(18,20,16,") + (0.025 + R() * 0.035).toFixed(3) + ")";
      g.fillRect(R() * s.W, R() * s.H, 10 + R() * 60, 6 + R() * 26);
    }
    for (b = 1; b <= 2; b++) {
      var lg = g.createLinearGradient(0, s.band[b], 0, s.band[b] + s.SB);
      lg.addColorStop(0, "rgba(255,255,255," + (0.05 * gr).toFixed(3) + ")");
      lg.addColorStop(0.5, "rgba(0,0,0,0)");
      lg.addColorStop(1, "rgba(34,30,24," + (0.20 * gr).toFixed(3) + ")");
      g.fillStyle = lg; g.fillRect(0, s.band[b], s.W, s.SB);
    }
    g.fillStyle = "rgba(34,30,24," + (0.10 * gr).toFixed(3) + ")"; g.fillRect(0, s.band[3], s.W, s.TB);
    /* streaks: rain down the sides, airflow aft on the top and belly */
    for (i = 0; i < 160; i++) {
      var sx = R() * s.W, sy = R() * s.H, bb = sy < s.TB || sy > s.band[3] ? 0 : 1;
      g.fillStyle = "rgba(20,20,16," + (0.03 + R() * 0.04).toFixed(3) + ")";
      if (bb) g.fillRect(sx, sy, 1 + R(), 8 + R() * 30); else g.fillRect(sx, sy, 12 + R() * 50, 1 + R());
    }
    function sides(fn) { for (b = 1; b <= 2; b++) fn(b); }
    (o.soot || []).forEach(function (q) {
      sides(function (b) {
        var x0 = s.u(q[0]), x1 = s.u(q[1]), lg = g.createLinearGradient(x0, 0, x1, 0);
        lg.addColorStop(0, "rgba(14,12,10,0.45)"); lg.addColorStop(1, "rgba(14,12,10,0)");
        g.fillStyle = lg; g.fillRect(Math.min(x0, x1), s.vz(q[3], b), Math.abs(x1 - x0), s.vz(q[2], b) - s.vz(q[3], b));
      });
    });
    (o.topSoot || []).forEach(function (q) {
      [1, -1].forEach(function (m) {
        var x0 = s.u(q[0]), x1 = s.u(q[1]), lg = g.createLinearGradient(x0, 0, x1, 0), a = s.vy(m * q[2], 0), c = s.vy(m * q[3], 0);
        lg.addColorStop(0, "rgba(14,12,10,0.40)"); lg.addColorStop(1, "rgba(14,12,10,0)");
        g.fillStyle = lg; g.fillRect(Math.min(x0, x1), Math.min(a, c), Math.abs(x1 - x0), Math.abs(c - a));
      });
    });
    /* seams: a dark line with a light lip under it, fastener dots alongside */
    function seam(a, c) {
      g.strokeStyle = "rgba(0,0,0,0.30)"; seg2(g, a, c);
      g.strokeStyle = "rgba(255,255,255,0.10)"; seg2(g, [a[0], a[1] + 1], [c[0], c[1] + 1]);
      g.fillStyle = "rgba(0,0,0,0.20)"; dots(g, [a[0] + 2, a[1] + 2], [c[0] + 2, c[1] + 2], 4);
    }
    g.lineWidth = 1;
    (o.side || []).forEach(function (q) { sides(function (b) { seam([s.u(q[0]), s.vz(q[2], b)], [s.u(q[1]), s.vz(q[2], b)]); }); });
    (o.sideV || []).forEach(function (q) { sides(function (b) { seam([s.u(q[0]), s.vz(q[2], b)], [s.u(q[0]), s.vz(q[1], b)]); }); });
    [["top", 0], ["belly", 3]].forEach(function (t) {
      (o[t[0]] || []).forEach(function (q) {
        [1, -1].forEach(function (m) { seam([s.u(q[0]), s.vy(m * q[1], t[1])], [s.u(q[2]), s.vy(m * q[3], t[1])]); });
      });
    });
    (o.box || []).forEach(function (q) {
      var bs = q[0] === 1 ? [1, 2] : [q[0]];
      bs.forEach(function (b) {
        var ms = b === 0 || b === 3 ? [1, -1] : [1];
        ms.forEach(function (m) {
          var u0 = s.u(q[1]), u1 = s.u(q[2]);
          var v0 = b === 0 || b === 3 ? s.vy(m * q[3], b) : s.vz(q[3], b), v1 = b === 0 || b === 3 ? s.vy(m * q[4], b) : s.vz(q[4], b);
          g.strokeStyle = "rgba(0,0,0,0.32)";
          g.strokeRect(Math.min(u0, u1), Math.min(v0, v1), Math.abs(u1 - u0), Math.abs(v1 - v0));
          g.fillStyle = "rgba(0,0,0,0.30)";
          g.fillRect(Math.min(u0, u1) + 1, Math.min(v0, v1) + 1, 1, 1); g.fillRect(Math.max(u0, u1) - 2, Math.max(v0, v1) - 2, 1, 1);
        });
      });
    });
  }
  /* a triangle seen from both faces */
  function tri2(L, a, b, c) { L.push(tris([a, b, c, a, c, b])); }
  /* a blade aerial standing on (x, y, z): height h (negative hangs down),
     root chord c, raked aft, thickness t */
  function bladeAnt(L, x, y, z, h, c, t) {
    L.push(vplate([[x + c / 2, z], [x - c / 2, z], [x - c / 2 - Math.abs(h) * 0.45, z + h], [x - c / 2 - Math.abs(h) * 0.45 + c * 0.45, z + h]], y, t || 0.02));
  }
  /* a wheel hub on the outer face of a wheel (the y side sd), with bolts */
  function hubFace(L, r, w, x, y, zc, sd) {
    L.push(cyl(r * 0.62, r * 0.66, 0.03, 16, "y", x, y + sd * (w / 2 + 0.006), zc));
    L.push(cyl(r * 0.20, r * 0.24, 0.05, 10, "y", x, y + sd * (w / 2 + 0.03), zc));
    for (var i = 0; i < 6; i++) {
      var a = i * PI / 3;
      L.push(cyl(r * 0.04, r * 0.04, 0.03, 5, "y", x + Math.cos(a) * r * 0.38, y + sd * (w / 2 + 0.02), zc + Math.sin(a) * r * 0.38));
    }
  }
  /* an oleo leg from the axle a up to the top t: a bright piston (metal) in
     the lower third, the cylinder (leg) above, a torque link on side ty */
  function oleo(Lm, Ll, a, t, r, tdx) {
    var f = 0.38, m = [lerp(a[0], t[0], f), lerp(a[1], t[1], f), lerp(a[2], t[2], f)];
    Lm.push(bar(a, m, r * 0.72, 10));
    Ll.push(bar(m, t, r, 10));
    Ll.push(cyl(r * 1.25, r * 1.25, r * 0.9, 10, "z", m[0], m[1], m[2]));
    var k = [lerp(a[0], m[0], 0.5) + (tdx || r * 2.6), lerp(a[1], m[1], 0.5), lerp(a[2], m[2], 0.5)];
    Ll.push(bar([a[0], a[1], a[2] + r], k, r * 0.30, 5));
    Ll.push(bar(k, [m[0], m[1], m[2] + r], r * 0.30, 5));
  }

  /* ============================================================ J-15 ==
     cfighter_c: the Su-33 of ru_su33.js, called as it is, with the J-15's
     differences: the PLAN's plain grey for the Russian Navy two-tone and
     its stars (see the header). */
  var J15_GREY = "#6c7378";
  function j15(THREE, M, C) {
    V = THREE;
    var g = HeroSu33.build(THREE, M, C), plain = null;
    g.traverse(function (o) {
      if (!o.isMesh || !o.material || !o.material.map) return;
      if (!plain) {
        plain = o.material.clone();
        plain.map = null;
        plain.color = new V.Color(J15_GREY);
        plain.roughness = 0.70;
      }
      o.material = plain;
    });
    return g;
  }

  /* ======================================================= J-16 / J-16D ==
     DRAWING units: s metres aft of the radome tip, y off the centreline,
     h above the nose axis. X = 10.97 - s, Z = h. Ground at h = -2.10. */
  var F_XN = 10.97, F_GROUND = -2.10;
  function FX(s) { return F_XN - s; }
  /* forebody [s, half-width, crown h, keel h] (drawing A side and plan) */
  var F_FORE = [
    [0.46, 0.30, 0.24, -0.27], [0.94, 0.50, 0.46, -0.37], [1.43, 0.59, 0.64, -0.43], [1.92, 0.62, 0.76, -0.49],
    [2.40, 0.63, 0.88, -0.49], [2.89, 0.64, 0.97, -0.49], [3.40, 0.67, 1.05, -0.49], [3.96, 0.70, 1.12, -0.48],
    [4.95, 0.76, 1.20, -0.46], [5.94, 0.84, 1.25, -0.44], [6.94, 0.90, 1.27, -0.44], [7.93, 0.95, 1.28, -0.44],
    [8.90, 0.98, 1.25, -0.44]
  ];
  var J16_VARIANTS = {
    sead: { irst: true, gun: true, tips: "rail", stores: "yj91" },
    ewd:  { irst: false, gun: false, tips: "pod", stores: "ew" }
  };
  function j16(THREE, M, C, VR) {
    V = THREE;
    var sh = sheet(-11.2, 11.2, 7.6, F_GROUND, 4.6, 26);
    var B = bins(["skin", "dark", "metal", "glass", "team", "store", "nozzle", "lampR", "lampG"]);
    var G = bins(["leg", "tyre", "dark", "metal"]);
    j16Body(B, VR);
    j16Wings(B, VR);
    j16Tail(B);
    j16Gear(G);
    j16Stores(B, VR);
    j16Detail(B, G);
    var pal = { top: "#8a9196", side: "#8a9196", belly: "#92989c" };
    var cv = paintSheet(sh, pal, [FX(3.05), FX(4.1), FX(6.0), FX(8.5), FX(10.4), FX(12.4), FX(14.6), FX(16.3), FX(18.7)], 61601,
      function (g, s) {
        /* the radome joint and the anti-glare panel ahead of the windscreen */
        g.fillStyle = "rgba(0,0,0,0.10)";
        g.fillRect(s.u(FX(3.05)) - 1, 0, 2, s.H);
        g.fillStyle = "#5d6468";
        g.beginPath(); g.moveTo(s.u(FX(3.3)), s.vy(0.25, 0)); g.lineTo(s.u(FX(4.1)), s.vy(0.5, 0));
        g.lineTo(s.u(FX(4.1)), s.vy(-0.5, 0)); g.lineTo(s.u(FX(3.3)), s.vy(-0.25, 0)); g.closePath(); g.fill();
        j16Paint(g, s);
      });
    var mats = makeMats(C, cv, pal.side, {
      store:  { color: 0xb9bcbc, roughness: 0.6, metalness: 0.15 },
      nozzle: { color: 0x5e5446, roughness: 0.42, metalness: 0.60 },
      lampR:  { color: 0xc8261e, roughness: 0.3, metalness: 0.1, emissive: 0x8a1410, emissiveIntensity: 0.6 },
      lampG:  { color: 0x1fa64a, roughness: 0.3, metalness: 0.1, emissive: 0x0e6a2c, emissiveIntensity: 0.6 }
    });
    var root = new V.Group();
    flush(root, B, mats, sh);
    var gear = new V.Group(); gear.name = "gear";
    flush(gear, G, mats, null);
    root.add(gear);
    return root;
  }
  /* crown and keel along the whole body, radome tip to sting (A side; the
     spine behind the tandem canopy from P2, P3: see NOT CONFIRMED) and the
     half-width (A plan): [s, half-width, crown h, keel h, upper e, lower e] */
  var F_BODY = [
    [0.46, 0.30, 0.24, -0.27, 1, 1], [0.94, 0.50, 0.46, -0.37, 1, 1], [1.43, 0.59, 0.64, -0.43, 1, 1],
    [1.92, 0.62, 0.76, -0.49, 1, 1], [2.40, 0.63, 0.88, -0.49, 1, 1], [2.89, 0.64, 0.97, -0.49, 1, 0.95],
    [3.40, 0.67, 1.05, -0.49, 1, 0.9], [3.96, 0.70, 1.12, -0.48, 0.95, 0.85], [4.95, 0.76, 1.20, -0.46, 0.9, 0.8],
    [5.94, 0.84, 1.25, -0.44, 0.85, 0.8], [6.94, 0.90, 1.30, -0.44, 0.85, 0.75], [7.60, 0.93, 1.45, -0.43, 0.85, 0.75],
    [8.10, 0.96, 1.70, -0.42, 0.85, 0.7], [8.73, 0.98, 1.70, -0.41, 0.8, 0.7], [9.70, 1.02, 1.56, -0.40, 0.75, 0.7],
    [10.67, 1.05, 1.38, -0.40, 0.7, 0.7], [11.64, 1.05, 1.17, -0.40, 0.65, 0.7], [12.60, 1.05, 0.98, -0.40, 0.6, 0.7],
    [13.57, 1.02, 0.80, -0.40, 0.6, 0.7], [14.55, 0.98, 0.64, -0.40, 0.6, 0.7], [15.5, 0.92, 0.58, -0.40, 0.6, 0.7],
    [16.5, 0.84, 0.55, -0.40, 0.65, 0.75], [17.5, 0.72, 0.52, -0.40, 0.7, 0.8], [18.3, 0.52, 0.50, -0.40, 0.8, 0.85],
    [18.8, 0.36, 0.47, -0.40, 0.9, 0.9],
    /* the long sting (A): narrow and deep, its cone pointed at 21.93 */
    [19.5, 0.30, 0.40, -0.40, 0.95, 0.95], [20.1, 0.26, 0.33, -0.40, 1, 1], [20.6, 0.22, 0.24, -0.33, 1, 1],
    [21.1, 0.15, 0.09, -0.30, 1, 1], [21.6, 0.08, -0.04, -0.17, 1, 1]
  ];
  function crownAt(s) { return tab(F_BODY, s, 2); }
  /* the tandem canopy: [s, half-width, top h] on a sill just under the crown */
  var F_CAN = [[4.10, 0.28, 1.30], [4.50, 0.46, 1.66], [5.00, 0.52, 1.90], [5.70, 0.54, 1.99], [6.50, 0.54, 2.05],
               [7.20, 0.52, 2.06], [7.70, 0.46, 1.98], [8.05, 0.36, 1.82]];
  /* nacelles, each side: [s, centre h, half-width, upper, lower, e] (A side and plan) */
  var F_NAC_Y = 1.07;
  var F_NAC = [[9.60, -0.47, 0.58, 0.72, 0.72, 0.25], [11.0, -0.44, 0.62, 0.74, 0.80, 0.35], [13.0, -0.42, 0.63, 0.74, 0.82, 0.45],
               [15.0, -0.38, 0.63, 0.70, 0.80, 0.55], [16.5, -0.32, 0.62, 0.66, 0.70, 0.7], [17.5, -0.27, 0.60, 0.62, 0.62, 0.85],
               [18.5, -0.24, 0.57, 0.57, 0.57, 1.0], [19.15, -0.23, 0.555, 0.555, 0.555, 1.0]];
  /* wing (with the LERX): [y, LE s, TE s] (A plan, y at 32.7 px/m) */
  var F_WING = [[0.80, 6.60, 16.0], [1.04, 6.94, 16.0], [1.28, 7.93, 16.0], [1.59, 8.92, 16.0], [1.97, 9.91, 16.0],
                [2.18, 10.40, 16.01], [2.68, 10.90, 16.16], [3.73, 11.89, 16.48], [4.80, 12.88, 16.80],
                [5.90, 13.87, 17.13], [7.06, 14.93, 17.47]];
  function fwH(y) { return y <= 2.0 ? 0.56 : 0.56 - (y - 2.0) * 0.035; }          /* 2 deg anhedral */
  function fwT(y) { return y <= 2.2 ? 0.26 : 0.26 - (y - 2.2) / 4.86 * 0.17; }
  /* ---- J-16 / J-16D detail pass: the fittings A and P1-P5 show that the
     first pass left out; their sizes are read through those references'
     scale and perspective, NOT measured ---- */
  function j16Detail(B, G) {
    var k;
    [1, -1].forEach(function (sd) {
      var ny = sd * F_NAC_Y, nz = -0.23;
      /* the nozzles: dark liner, flame-holder ring, centre body and the
         petals' seams (A; P2 from behind) */
      B.dark.push(inv(cyl(0.47, 0.47, 0.50, 16, "x", FX(19.55), ny, nz, true)));
      B.metal.push(cyl(0.34, 0.34, 0.04, 16, "x", FX(19.42), ny, nz, true));
      push(B.metal, lathe([[FX(19.25), 0.16], [FX(19.40), 0.12], [FX(19.55), 0.03]], ny, nz, 10));
      for (k = 0; k < 14; k++) {
        var a = k * 2 * PI / 14;
        B.dark.push(bar([FX(19.20), ny + Math.cos(a) * 0.548, nz + Math.sin(a) * 0.548], [FX(19.86), ny + Math.cos(a) * 0.505, nz + Math.sin(a) * 0.505], 0.010, 3));
      }
      /* the canopy sill frame along each side */
      for (k = 0; k < F_CAN.length - 1; k++) {
        var p0 = F_CAN[k], p1 = F_CAN[k + 1];
        B.dark.push(bar([FX(p0[0]), sd * p0[1] * 0.98, crownAt(p0[0]) - 0.07], [FX(p1[0]), sd * p1[1] * 0.98, crownAt(p1[0]) - 0.07], 0.022, 4));
      }
      /* the L-shaped air-data probes either side of the forward fuselage */
      B.metal.push(bar([FX(1.75), sd * 0.60, 0.20], [FX(1.75), sd * 0.74, 0.22], 0.016, 5), bar([FX(1.75), sd * 0.74, 0.22], [FX(1.30), sd * 0.74, 0.22], 0.013, 5));
      B.metal.push(box(0.10, 0.02, 0.06, FX(2.30), sd * 0.62, 0.05));
      /* position lamps on the intake trunks' outer faces, port red and
         starboard green (NOT CONFIRMED placement) */
      (sd > 0 ? B.lampR : B.lampG).push(sph(0.05, 8, 6, FX(11.2), sd * (F_NAC_Y + 0.63), -0.30, 1.6, 0.6, 0.8));
      /* the intakes' lips: a bright edge round each raked mouth */
      B.metal.push(bar([FX(9.72), ny - 0.48, 0.28], [FX(9.72), ny + 0.48, 0.28], 0.02, 5));
      B.metal.push(bar([FX(10.68), ny - 0.48, -1.20], [FX(10.68), ny + 0.48, -1.20], 0.02, 5));
      /* the main legs: oleos, hubs, brakes, axles */
      hubFace(G.metal, 0.515, 0.35, FX(14.0), sd * 2.17, F_GROUND + 0.515, sd);
      G.dark.push(cyl(0.34, 0.34, 0.05, 14, "y", FX(14.0), sd * 1.98, F_GROUND + 0.515));
      oleo(G.metal, G.leg, [FX(14.0), sd * 2.0, F_GROUND + 0.515], [FX(13.85), sd * 1.80, F_GROUND + 1.25], 0.09, -0.24);
      G.metal.push(cyl(0.05, 0.05, 0.40, 8, "y", FX(14.0), sd * 2.05, F_GROUND + 0.515));
    });
    /* blade aerials on the spine and belly, the white tail lamp on the
       sting, beacons on the spine and under the belly */
    bladeAnt(B.skin, FX(9.6), 0, crownAt(9.6) - 0.02, 0.22, 0.32, 0.025);
    bladeAnt(B.skin, FX(13.6), 0, crownAt(13.6) - 0.02, 0.16, 0.24, 0.02);
    bladeAnt(B.skin, FX(7.6), 0, -0.42, -0.18, 0.26, 0.025);
    bladeAnt(B.skin, FX(16.8), 0, -0.38, -0.14, 0.22, 0.02);
    B.metal.push(sph(0.04, 8, 5, FX(21.45), 0, -0.10, 1.3, 0.8, 1.0));
    B.lampR.push(sph(0.05, 8, 5, FX(11.0), 0, crownAt(11.0) + 0.01, 1.4, 1, 0.6), sph(0.05, 8, 5, FX(12.0), 0, -0.43, 1.4, 1, 0.6));
    /* the nose leg: oleo, hub caps, the twin taxi lamps on the leg */
    oleo(G.metal, G.leg, [FX(8.2), 0, F_GROUND + 0.31], [FX(8.1), 0, F_GROUND + 1.10], 0.07, 0.20);
    [0.17, -0.17].forEach(function (y) { hubFace(G.metal, 0.31, 0.18, FX(8.2), y, F_GROUND + 0.31, y > 0 ? 1 : -1); });
    G.metal.push(sph(0.06, 8, 6, FX(7.95), 0.10, F_GROUND + 1.05), sph(0.06, 8, 6, FX(7.95), -0.10, F_GROUND + 1.05));
  }
  /* the J-16's finish: seams and access panels off drawing A, the dorsal
     airbrake's outline behind the canopy, the flaperons' and the rudders'
     hinge lines, nozzle soot along the tail beams, grime */
  function j16Paint(g, s) {
    finish(g, s, {
      side: [[FX(1.0), FX(18.5), 0.55], [FX(3.0), FX(9.6), -0.20], [FX(9.6), FX(19.0), 0.10]],
      sideV: [[FX(4.95), -0.46, 1.20], [FX(6.94), -0.44, 1.30], [FX(9.70), -1.0, 1.56], [FX(11.64), -1.1, 1.17],
              [FX(13.57), -1.1, 0.80], [FX(15.5), -1.0, 0.58], [FX(17.5), -0.9, 0.52]],
      top: [[FX(8.3), 0.62, FX(18.0), 0.62], [FX(12.0), 2.3, FX(16.3), 6.8], [FX(15.3), 2.4, FX(15.9), 6.9],
            [FX(10.0), 0.95, FX(19.0), 0.95]],
      belly: [[FX(9.6), 0.45, FX(19.0), 0.45], [FX(12.0), 2.3, FX(16.3), 6.8]],
      box: [[1, FX(2.4), FX(3.0), 0.40, 0.0], [1, FX(5.2), FX(6.2), 0.0, -0.35], [1, FX(15.0), FX(15.8), 0.40, 0.05],
            [1, FX(12.0), FX(12.8), 0.0, -0.40], [0, FX(8.6), FX(10.4), 0.40, -0.40], [0, FX(13.5), FX(14.3), 0.30, 0.55],
            [3, FX(10.5), FX(11.5), 0.20, 0.55], [3, FX(17.0), FX(17.8), 0.15, 0.40]],
      topSoot: [[FX(19.5), FX(21.6), 1.40, 2.40]], soot: [[FX(19.4), FX(21.8), -0.60, 0.20]], grime: 0.55
    }, 61616);
  }
  function j16Body(B, VR) {
    var i, s;
    /* fuselage and sting: one loft, nose cone and sting point capped */
    var secs = F_BODY.map(function (r) {
      return sec(FX(r[0]), 0, (r[2] + r[3]) / 2, r[1], (r[2] - r[3]) / 2, (r[2] - r[3]) / 2, r[4], r[5]);
    });
    push(B.skin, loft(secs, 22, 0.46, 0.33));
    /* the tandem canopy (P1-P3) and its frames: the windscreen arch, the
       bow between the two seats, the rear frame */
    var cs = F_CAN.map(function (r) {
      var zc = crownAt(r[0]) - 0.06;
      return sec(FX(r[0]), 0, zc, r[1], r[2] - zc, 0.04, 0.9, 1);
    });
    push(B.glass, loft(cs, 18, 0.02, 0.02));
    [4.5, 6.15, 7.95].forEach(function (sv) {
      var w = tab(F_CAN, sv, 1), top = tab(F_CAN, sv, 2), zc = crownAt(sv) - 0.06, k, a0, a1, pts = [];
      for (k = 0; k <= 8; k++) {
        a0 = PI * k / 8;
        pts.push([FX(sv), Math.cos(a0) * (w + 0.015), zc + Math.pow(Math.sin(a0), 0.9) * (top - zc + 0.015)]);
      }
      for (k = 0; k < 8; k++) B.dark.push(bar(pts[k], pts[k + 1], 0.025, 4));
    });
    /* IRST ball ahead of the windscreen, to starboard (P3; not on the J-16D, P4) */
    if (VR.irst) {
      B.glass.push(sph(0.16, 12, 8, FX(3.75), -0.24, 1.18));
      B.skin.push(cyl(0.17, 0.19, 0.12, 12, "z", FX(3.75), -0.24, 1.08));
    }
    /* the gun port on the starboard LERX root (deleted on the J-16D: text) */
    if (VR.gun) B.dark.push(cyl(0.05, 0.05, 0.9, 8, "x", FX(8.4), -0.98, 0.66));
    /* nacelles, raked square intakes (A), the dark mouth inside each */
    [1, -1].forEach(function (sd) {
      var ns = F_NAC.map(function (r, j) {
        return sec(FX(r[0]), sd * F_NAC_Y, r[1], r[2], r[3], r[4], r[5], r[5], j === 0 ? 0.90 : 0);
      });
      push(B.skin, loft(ns, 18, null, null));
      B.dark.push(box(0.06, 1.0, 1.34, FX(10.2), sd * F_NAC_Y, -0.47, 0, -0.73, 0));
      /* AL-31F nozzle: a short can with dark petals (A) */
      B.nozzle.push(cyl(0.555, 0.50, 0.75, 18, "x", FX(19.52), sd * F_NAC_Y, -0.23, true));
      B.dark.push(cyl(0.46, 0.46, 0.05, 16, "x", FX(19.70), sd * F_NAC_Y, -0.23));
      /* tail beam carrying fin and tailplane (A plan, 1.95 m out) */
      push(B.skin, loft([
        sec(FX(14.0), sd * 1.95, 0.30, 0.30, 0.26, 0.30, 0.7, 0.8), sec(FX(16.5), sd * 1.95, 0.22, 0.30, 0.32, 0.32, 0.7, 0.8),
        sec(FX(18.5), sd * 1.97, 0.20, 0.26, 0.30, 0.30, 0.8, 0.8), sec(FX(19.8), sd * 1.98, 0.18, 0.19, 0.22, 0.22, 0.9, 0.9),
        sec(FX(20.5), sd * 1.98, 0.16, 0.11, 0.13, 0.13, 1, 1)], 12, null, 0.35));
    });
    /* the team colour: a modest strip on each upper outer wing */
    [1, -1].forEach(function (sd) {
      var y0 = 4.9, y1 = 5.7, z0 = fwH(y0) + fwT(y0) * 0.5 + 0.012, z1 = fwH(y1) + fwT(y1) * 0.5 + 0.012;
      var e0 = tab(F_WING, y0, 2) - 1.0, e1 = tab(F_WING, y1, 2) - 1.0;
      B.team.push(sloft([[[FX(e0), sd * y0, z0], [FX(e0 + 0.55), sd * y0, z0], [FX(e1 + 0.55), sd * y1, z1], [FX(e1), sd * y1, z1]],
                         [[FX(e0), sd * y0, z0 + 0.02], [FX(e0 + 0.55), sd * y0, z0 + 0.02], [FX(e1 + 0.55), sd * y1, z1 + 0.02], [FX(e1), sd * y1, z1 + 0.02]]]));
    });
  }
  function j16Wings(B, VR) {
    [1, -1].forEach(function (sd) {
      var rings = F_WING.map(function (r) {
        var y = r[0], h = fwH(y);
        return foil([FX(r[1]), sd * y, h], [FX(r[2]), sd * y, h], fwT(y), [0, 0, 1]);
      });
      B.skin.push(sloft(rings));
      if (VR.tips === "rail") {
        /* the empty wingtip launch rails (P2, P5) */
        B.skin.push(box(2.9, 0.22, 0.12, FX(16.05), sd * 7.20, fwH(7.06)));
        B.skin.push(cyl(0.001, 0.07, 0.50, 8, "x", FX(14.35), sd * 7.20, fwH(7.06)));
      } else {
        /* the J-16D's wingtip jamming pods (P4): a long round pod with
           pointed ends on each tip */
        push(B.store, lathe([[FX(13.3), 0.02], [FX(13.6), 0.13], [FX(14.1), 0.19], [FX(17.2), 0.19], [FX(17.7), 0.10], [FX(17.9), 0.03]],
                            sd * 7.24, fwH(7.06), 12));
        B.dark.push(box(0.25, 0.03, 0.22, FX(17.0), sd * 7.24, fwH(7.06) + 0.26));
      }
      /* pylons under the wing at A's stations */
      [4.27].forEach(function (py) {
        var zt = fwH(py) - fwT(py) * 0.35;
        B.skin.push(sloft([[[FX(12.9), sd * (py + 0.05), zt], [FX(14.9), sd * (py + 0.05), zt], [FX(14.6), sd * (py + 0.05), zt - 0.24], [FX(13.2), sd * (py + 0.05), zt - 0.24]],
                           [[FX(12.9), sd * (py - 0.05), zt], [FX(14.9), sd * (py - 0.05), zt], [FX(14.6), sd * (py - 0.05), zt - 0.24], [FX(13.2), sd * (py - 0.05), zt - 0.24]]]));
      });
    });
  }
  function j16Tail(B) {
    [1, -1].forEach(function (sd) {
      /* fins: A's outline to its cap height, the tip squared off as the
         Su-30 family's are (P3, P4) */
      var y = sd * 2.12, rh = 0.50, th = 3.86;
      B.skin.push(sloft([foil([FX(15.06), y, rh], [FX(18.66), y, rh], 0.16, [0, 1, 0]),
                         foil([FX(15.06 + (th - rh) * 0.86), y, th], [FX(18.62), y, th], 0.07, [0, 1, 0])]));
      /* rudder hinge line (dark seam) */
      B.dark.push(bar([FX(17.95), y + sd * 0.04, 0.9], [FX(18.15), y + sd * 0.035, 3.5], 0.012, 3));
      /* tailplanes (A plan) */
      B.skin.push(sloft([foil([FX(17.30), sd * 2.05, 0.12], [FX(20.60), sd * 2.05, 0.12], 0.15, [0, 0, 1]),
                         foil([FX(19.75), sd * 4.70, 0.10], [FX(20.35), sd * 4.70, 0.10], 0.04, [0, 0, 1])]));
      /* ventral fins under the beams (A) */
      B.skin.push(vplate([[FX(17.2), -0.38], [FX(18.6), -0.38], [FX(18.78), -1.30], [FX(18.32), -1.33]], sd * 1.80, 0.08));
    });
  }
  function j16Gear(G) {
    var gb = F_GROUND;
    /* twin nose wheels on one leg (P4), 5.8 m ahead of the mains */
    [0.17, -0.17].forEach(function (y) { wheel(G, 0.31, 0.18, FX(8.2), y, gb, 16); });
    G.leg.push(bar([FX(8.2), 0, gb + 0.31], [FX(8.0), 0, -0.42], 0.07, 8));
    G.leg.push(bar([FX(8.2), 0, gb + 0.75], [FX(7.4), 0, -0.42], 0.035, 6));
    G.dark.push(box(0.70, 0.62, 0.05, FX(8.2), 0, gb + 0.68));                                  /* mudguard */
    /* main legs out of the nacelle sides to single wheels, track 4.34 m */
    [1, -1].forEach(function (sd) {
      wheel(G, 0.515, 0.35, FX(14.0), sd * 2.17, gb, 18);
      G.leg.push(bar([FX(14.0), sd * 2.0, gb + 0.515], [FX(13.7), sd * 1.62, -0.85], 0.09, 8));
      G.leg.push(bar([FX(14.0), sd * 2.0, gb + 0.80], [FX(15.1), sd * 1.55, -0.95], 0.045, 6));
      G.dark.push(box(1.6, 0.03, 0.75, FX(13.8), sd * 1.70, -1.20));                             /* bay door */
    });
  }
  /* stores: a long body of revolution with cruciform fins */
  function missile(L, s0, len, r, y, z, finSpan) {
    push(L, lathe([[FX(s0), 0.01], [FX(s0 + len * 0.06), r * 0.75], [FX(s0 + len * 0.14), r], [FX(s0 + len), r], [FX(s0 + len + 0.01), r * 0.6]], y, z, 10));
    var k, fs = finSpan || r * 2.4;
    for (k = 0; k < 4; k++) {
      var a = PI / 4 + k * PI / 2, cy = Math.cos(a), cz = Math.sin(a);
      L.push(sloft([[[FX(s0 + len - 0.45), y + cy * r, z + cz * r], [FX(s0 + len), y + cy * r, z + cz * r], [FX(s0 + len - 0.05), y + cy * fs, z + cz * fs]],
                    [[FX(s0 + len - 0.45), y + cy * r + 0.01, z + cz * r - 0.01], [FX(s0 + len), y + cy * r + 0.01, z + cz * r - 0.01], [FX(s0 + len - 0.05), y + cy * fs + 0.01, z + cz * fs - 0.01]]]));
    }
  }
  function j16Stores(B, VR) {
    [1, -1].forEach(function (sd) {
      var zt = fwH(4.27) - fwT(4.27) * 0.35 - 0.24;
      if (VR.stores === "yj91") {
        /* a large anti-radiation round on each inner wing pylon (P2 shows a
           large missile there; YJ-91 4.7 m x 0.36 m: NOT CONFIRMED) and a
           long AAM under each intake (P3) */
        missile(B.store, 11.6, 4.7, 0.18, sd * 4.32, zt - 0.20, 0.42);
        missile(B.store, 11.2, 3.9, 0.10, sd * F_NAC_Y, -1.43, 0.24);
        B.skin.push(box(1.6, 0.08, 0.12, FX(13.1), sd * F_NAC_Y, -1.30));
      } else {
        /* the J-16D's big jamming pods: one on each wing pylon and one under
           each nacelle (P4) */
        push(B.store, lathe([[FX(11.6), 0.04], [FX(12.0), 0.22], [FX(12.6), 0.29], [FX(15.4), 0.29], [FX(16.0), 0.20], [FX(16.2), 0.06]],
                            sd * 4.32, zt - 0.30, 14));
        push(B.store, lathe([[FX(10.9), 0.04], [FX(11.3), 0.22], [FX(11.9), 0.28], [FX(14.7), 0.28], [FX(15.3), 0.20], [FX(15.5), 0.06]],
                            sd * F_NAC_Y, -1.62, 14));
        B.skin.push(box(1.8, 0.10, 0.12, FX(13.1), sd * F_NAC_Y, -1.30));
      }
    });
  }

  /* ============================================================ J-35 ==
     DRAWING units off drawing J (53.06 px/m on the 17.3 m length): s metres
     aft of the radome tip, y off the centreline (taken at x0.947, see the
     header), h above the radome tip. X = 8.65 - s. */
  var J_XN = 8.65, J_GROUND = -2.28;
  function JX(s) { return J_XN - s; }
  /* [s, half-width, crown h, keel h, chine h] */
  var J_BODY = [
    [0.25, 0.12, 0.15, -0.08, 0.03], [0.62, 0.29, 0.30, -0.23, 0.02], [1.00, 0.43, 0.41, -0.34, 0.0],
    [1.38, 0.52, 0.51, -0.41, -0.02], [1.75, 0.59, 0.60, -0.55, -0.04], [2.13, 0.64, 0.70, -0.58, -0.05],
    [2.50, 0.69, 0.78, -0.60, -0.05], [3.00, 0.72, 0.86, -0.65, -0.04], [3.60, 0.76, 0.92, -0.72, -0.02],
    [4.20, 0.77, 0.97, -0.77, 0.0], [4.77, 0.87, 1.05, -0.81, 0.02], [5.15, 1.00, 1.18, -0.83, 0.05],
    [5.90, 1.12, 1.11, -0.85, 0.08], [6.65, 1.30, 1.02, -0.88, 0.10], [7.40, 1.50, 0.92, -0.86, 0.12],
    [8.16, 1.70, 0.85, -0.85, 0.14], [8.90, 1.80, 0.77, -0.84, 0.15], [9.70, 1.80, 0.70, -0.82, 0.16],
    [10.4, 1.74, 0.64, -0.81, 0.16], [11.9, 1.60, 0.62, -0.79, 0.16], [12.8, 1.46, 0.60, -0.77, 0.15],
    [13.6, 1.32, 0.55, -0.74, 0.14], [14.4, 1.22, 0.50, -0.68, 0.12], [15.0, 1.16, 0.45, -0.62, 0.10],
    [15.6, 1.08, 0.38, -0.53, 0.08]
  ];
  var J_CAN = [[2.30, 0.20, 0.80], [2.70, 0.42, 1.05], [3.20, 0.50, 1.24], [3.70, 0.50, 1.30], [4.20, 0.46, 1.27],
               [4.60, 0.38, 1.20], [4.95, 0.26, 1.16]];
  /* wing: [y, LE s, TE s] (J plan) and the tailplane */
  var J_WING = [[1.20, 7.40, 13.70], [1.84, 8.16, 13.62], [3.00, 9.18, 13.30], [4.40, 10.40, 12.90], [5.75, 11.60, 12.50]];
  var J_TP = [[1.30, 14.10, 17.20], [2.60, 14.85, 16.95], [4.02, 15.60, 16.45]];
  function jwH(y) { return 0.20 - Math.max(0, y - 1.84) * Math.tan(3 * D2R); }
  function jwT(y) { return y <= 1.84 ? 0.22 : 0.22 - (y - 1.84) / 3.91 * 0.16; }
  /* ---- J-35 detail pass: the fittings drawing J, P7 and P8 show that the
     first pass left out ---- */
  /* a geometry turned inside out (seen from within: a duct liner) */
  function inv(geo) {
    var g = flat(geo).clone(), p = g.attributes.position.array, i, t;
    for (i = 0; i < p.length; i += 9) for (t = 0; t < 3; t++) { var a = p[i + 3 + t]; p[i + 3 + t] = p[i + 6 + t]; p[i + 6 + t] = a; }
    g.deleteAttribute("normal"); if (g.attributes.uv) g.deleteAttribute("uv");
    g.computeVertexNormals();
    return g;
  }
  /* the nozzle's saw-toothed trailing edge (drawing J's plan and side draw
     the teeth; P8 the two cans from behind), the liner, the flame holder
     ring and the centre body */
  function j35Nozzle(B, y, z) {
    var n = 12, k, x0 = JX(16.30), x1 = JX(16.52);
    for (k = 0; k < n; k++) {
      var a0 = k * 2 * PI / n, a1 = (k + 1) * 2 * PI / n, am = (a0 + a1) / 2;
      tri2(B.nozzle, [x0, y + Math.cos(a0) * 0.345, z + Math.sin(a0) * 0.345], [x0, y + Math.cos(a1) * 0.345, z + Math.sin(a1) * 0.345],
           [x1, y + Math.cos(am) * 0.325, z + Math.sin(am) * 0.325]);
    }
    B.dark.push(inv(cyl(0.325, 0.325, 0.42, 16, "x", JX(16.12), y, z, true)));
    B.metal.push(cyl(0.24, 0.24, 0.04, 16, "x", JX(16.11), y, z, true));
    push(B.metal, lathe([[JX(16.0), 0.13], [JX(16.14), 0.10], [JX(16.27), 0.03]], y, z, 10));
    for (k = 0; k < 4; k++) B.metal.push(box(0.03, 0.30, 0.025, JX(16.12), y, z, k * PI / 4, 0, 0));
  }
  function j35Detail(B, G) {
    var crown = function (s) { return tab(J_BODY, s, 2); }, keel = function (s) { return tab(J_BODY, s, 3); };
    [1, -1].forEach(function (sd) {
      /* the canopy sill: the frame along each lower edge of the bubble (J, P7) */
      for (var i = 0; i < J_CAN.length - 1; i++) {
        var a = J_CAN[i], b = J_CAN[i + 1];
        B.dark.push(bar([JX(a[0]), sd * a[1] * 0.98, tab(J_BODY, a[0], 2) - 0.12], [JX(b[0]), sd * b[1] * 0.98, tab(J_BODY, b[0], 2) - 0.12], 0.022, 5));
      }
      /* wingtip navigation lights (drawing J's plan: a lamp at each tip), port red */
      var tz = jwH(5.75);
      (sd > 0 ? B.lampR : B.lampG).push(sph(0.055, 8, 6, JX(11.95), sd * 5.70, tz, 1.6, 0.7, 0.7));
      /* the intake lip: a bright edge round each mouth's upper and outer sides */
      B.metal.push(bar([JX(4.95) - 0.16, sd * 0.90, 0.24], [JX(4.95) - 0.16, sd * 1.56, 0.24], 0.018, 5));
      B.metal.push(bar([JX(4.95) - 0.16, sd * 1.56, 0.24], [JX(4.95) + 0.17, sd * 1.56, -0.72], 0.018, 5));
      /* main-gear door, outer face, its fore and aft edges saw-toothed (J plan) */
      G.skin.push(vplate([[JX(9.3), -0.76], [JX(10.7), -0.76], [JX(10.55), -1.02], [JX(10.7), -1.29], [JX(9.3), -1.29], [JX(9.45), -1.02]], sd * 1.07, 0.02));
      /* the main leg's retraction jack, to the well's inboard edge */
      G.leg.push(bar([JX(10.08), sd * 1.36, -1.25], [JX(10.5), sd * 0.95, -0.80], 0.035, 6));
      /* the nose-gear doors either side of the leg, saw-toothed ends (J side) */
      G.skin.push(vplate([[JX(2.75), -0.60], [JX(4.35), -0.70], [JX(4.20), -0.95], [JX(4.35), -1.20], [JX(2.75), -1.12], [JX(2.90), -0.86]], sd * 0.30, 0.02));
      G.dark.push(vplate([[JX(2.80), -0.62], [JX(4.28), -0.71], [JX(4.28), -1.12], [JX(2.80), -1.06]], sd * 0.285, 0.01));
    });
    /* blade aerials on the spine and under the belly (drawing J's side) */
    bladeAnt(B.skin, JX(6.3), 0, crown(6.3) - 0.02, 0.20, 0.30, 0.025);
    bladeAnt(B.skin, JX(11.3), 0, crown(11.3) - 0.02, 0.14, 0.22, 0.02);
    bladeAnt(B.skin, JX(6.0), 0, keel(6.0) + 0.02, -0.17, 0.26, 0.025);
    bladeAnt(B.skin, JX(12.9), 0, keel(12.9) + 0.02, -0.12, 0.20, 0.02);
    /* the anti-collision beacon on the spine, a white tail light */
    B.lampR.push(sph(0.05, 8, 5, JX(8.8), 0, crown(8.8) + 0.01, 1.4, 1, 0.6));
    B.metal.push(sph(0.04, 6, 4, JX(17.19), 0, -0.05, 1.4, 1, 0.8));
    /* the arrester hook, stowed under the tail between the cans (P7: the
       J-35 taking a wire) */
    B.metal.push(bar([JX(13.9), 0, keel(13.9) - 0.03], [JX(15.55), 0, -0.56], 0.045, 8));
    B.dark.push(box(0.22, 0.10, 0.07, JX(15.62), 0, -0.56));
    /* the EOTS window's faceted frame (J side) */
    B.dark.push(cyl(0.17, 0.17, 0.02, 7, "z", JX(1.95), 0, -0.56));
    /* the nose gear's taxi lamps */
    G.metal.push(sph(0.05, 8, 6, JX(3.28), 0.07, -1.20), sph(0.05, 8, 6, JX(3.28), -0.07, -1.20));
  }
  /* the J-35's finish: seams, the saw-toothed doors and access panels of
     drawing J, the formation-light strips (drawing J's side: on the fin and
     the body side), the rudders' hinge lines, grime */
  function j35Paint(g, s) {
    var te = function (y) { return tab(J_WING, y, 2); }, le = function (y) { return tab(J_WING, y, 1); };
    finish(g, s, {
      side: [[JX(1.3), JX(15.4), 0.52], [JX(5.0), JX(15.0), -0.45], [JX(2.4), JX(4.8), 0.15]],
      sideV: [[JX(5.6), -0.60, 0.95], [JX(7.0), -0.70, 0.90], [JX(9.4), -0.75, 0.80], [JX(11.6), -0.72, 0.62], [JX(13.8), -0.70, 0.50]],
      top: [[JX(le(1.84) + 0.45), 1.84, JX(le(5.6) + 0.30), 5.6], [JX(te(1.95) - 0.75), 1.95, JX(te(5.5) - 0.45), 5.5],
            [JX(te(3.7) - 0.65), 3.7, JX(te(3.7)), 3.7], [JX(5.0), 0.42, JX(15.0), 0.36], [JX(8.2), 1.25, JX(12.4), 1.30]],
      belly: [[JX(le(1.84) + 0.45), 1.84, JX(le(5.6) + 0.30), 5.6], [JX(te(1.95) - 0.75), 1.95, JX(te(5.5) - 0.45), 5.5],
              [JX(3.0), 0.40, JX(8.0), 0.45]],
      box: [[1, JX(2.6), JX(3.1), 0.05, -0.25], [1, JX(6.2), JX(7.0), 0.0, -0.35], [1, JX(11.0), JX(11.8), 0.45, 0.15],
            [1, JX(8.6), JX(9.2), 0.40, 0.10], [0, JX(6.6), JX(7.2), 0.50, 0.80], [0, JX(9.5), JX(10.2), 0.60, 0.90],
            [0, JX(12.8), JX(13.4), 0.50, 0.75], [3, JX(12.6), JX(13.3), 0.30, 0.60], [3, JX(5.4), JX(6.0), 0.20, 0.55]],
      topSoot: [[JX(15.5), JX(17.2), 0.25, 1.30]], grime: 0.5
    }, 35035);
    var b, i;
    g.lineWidth = 1; g.strokeStyle = "rgba(0,0,0,0.32)";
    /* the saw-toothed panels behind the canopy on the spine (J plan) */
    [1, -1].forEach(function (m) {
      g.beginPath(); g.moveTo(s.u(JX(5.05)), s.vy(m * 0.05, 0));
      for (i = 0; i <= 6; i++) g.lineTo(s.u(JX(i % 2 ? 5.25 : 5.05)), s.vy(m * (0.05 + i * 0.1), 0));
      g.stroke();
    });
    for (b = 1; b <= 2; b++) {
      /* rudder hinge lines on the fins */
      g.beginPath(); g.moveTo(s.u(JX(14.55)), s.vz(0.75, b)); g.lineTo(s.u(JX(14.95)), s.vz(2.55, b)); g.stroke();
      /* formation-light strips: on the fin and the body side (drawing J) */
      g.strokeStyle = "rgba(196,204,118,0.85)"; g.lineWidth = 3;
      g.beginPath(); g.moveTo(s.u(JX(13.2)), s.vz(1.95, b)); g.lineTo(s.u(JX(13.8)), s.vz(1.45, b)); g.stroke();
      g.beginPath(); g.moveTo(s.u(JX(7.6)), s.vz(0.25, b)); g.lineTo(s.u(JX(8.3)), s.vz(0.25, b)); g.stroke();
      g.beginPath(); g.moveTo(s.u(JX(2.7)), s.vz(-0.05, b)); g.lineTo(s.u(JX(3.0)), s.vz(-0.05, b)); g.stroke();
      g.strokeStyle = "rgba(0,0,0,0.32)"; g.lineWidth = 1;
      /* the side weapon-bay doors' saw-toothed outlines (J side) */
      g.beginPath(); g.moveTo(s.u(JX(7.4)), s.vz(-0.30, b));
      [[7.6, -0.50], [7.4, -0.70], [9.6, -0.70], [9.8, -0.50], [9.6, -0.30]].forEach(function (q) { g.lineTo(s.u(JX(q[0])), s.vz(q[1], b)); });
      g.closePath(); g.stroke();
    }
  }
  function j35(THREE, M, C) {
    V = THREE;
    var sh = sheet(-8.9, 8.9, 6.0, J_GROUND, 3.0, 56);
    var B = bins(["skin", "dark", "glass", "team", "nozzle", "radome", "metal", "lampR", "lampG"]);
    var G = bins(["leg", "tyre", "dark", "metal", "skin"]);
    var i;
    /* the fuselage: one loft, chined superellipses */
    push(B.skin, loft([[1.2, 0.495, 0.47, -0.39, -0.01]].concat(J_BODY.filter(function (r) { return r[0] > 1.2; })).map(function (r) {
      return sec(JX(r[0]), 0, r[4], r[1], r[2] - r[4], r[4] - r[3], 0.78, 0.72);
    }), 28, null, 0.30));
    /* the radome, lighter grey (J, P7), to the first joint at 1.2 m */
    push(B.radome, loft(J_BODY.filter(function (r) { return r[0] <= 1.2; }).concat([[1.2, 0.495, 0.47, -0.39, -0.01]]).map(function (r) {
      return sec(JX(r[0]), 0, r[4], r[1], r[2] - r[4], r[4] - r[3], 0.82, 0.78);
    }), 28, 0.25, null));
    /* the bubble canopy, one piece, its rear frame (J, P7) */
    push(B.glass, loft(J_CAN.map(function (r) {
      var zc = tab(J_BODY, r[0], 2) - 0.12;
      return sec(JX(r[0]), 0, zc, r[1], r[2] - zc, 0.05, 0.85, 1);
    }), 18, 0.02, 0.02));
    B.dark.push(box(0.06, 0.80, 0.05, JX(4.75), 0, 1.15));
    /* the EOTS window under the nose (J side) */
    B.glass.push(sph(0.15, 6, 4, JX(1.95), 0, -0.55, 1.4, 1, 0.5));
    [1, -1].forEach(function (sd) {
      /* cheek intakes, the lip raked forward at the bottom, DSI bump (J) */
      var il = loft([
        sec(JX(4.95), sd * 1.22, -0.22, 0.34, 0.46, 0.50, 0.35, 0.35, -0.35),
        sec(JX(5.60), sd * 1.24, -0.22, 0.36, 0.50, 0.55, 0.45, 0.45),
        sec(JX(7.00), sd * 1.22, -0.22, 0.38, 0.55, 0.58, 0.55, 0.55),
        sec(JX(8.80), sd * 1.12, -0.20, 0.38, 0.50, 0.55, 0.6, 0.6)], 14, 0, 0.4);
      B.skin.push(il[0], il[2]);
      B.dark.push(il[1]);                                    /* the mouth, dark */
      B.skin.push(sph(0.24, 10, 6, JX(5.35), sd * 0.98, -0.05, 1.6, 0.5, 1.0));
      /* wing: one loft a side, 3 deg anhedral (J front) */
      B.skin.push(sloft(J_WING.map(function (r) {
        return foil([JX(r[1]), sd * r[0], jwH(r[0])], [JX(r[2]), sd * r[0], jwH(r[0])], jwT(r[0]), [0, 0, 1]);
      })));
      /* the all-moving tailplane */
      B.skin.push(sloft(J_TP.map(function (r) {
        return foil([JX(r[1]), sd * r[0], 0.08], [JX(r[2]), sd * r[0], 0.08], 0.13 - (r[0] - 1.3) * 0.03, [0, 0, 1]);
      })));
      /* fins canted 25 deg out (J front): root at y 1.70 (J plan) */
      var ca = 25 * D2R, fy = 1.70, rh = 0.62, span = (2.68 - 0.62) / Math.cos(ca);
      var ty = fy + span * Math.sin(ca), th = rh + span * Math.cos(ca), nrm = [0, Math.cos(ca) * sd, -Math.sin(ca)];
      B.skin.push(sloft([foil([JX(12.12), sd * fy, rh], [JX(15.10), sd * fy, rh], 0.14, nrm),
                         foil([JX(14.57), sd * ty, th], [JX(15.42), sd * ty, th], 0.05, nrm)]));
      /* the engine nozzles: serrated cans, dark inside (J side and plan) */
      B.nozzle.push(cyl(0.40, 0.34, 0.95, 16, "x", JX(15.85), sd * 0.86, -0.30, true));
      B.dark.push(cyl(0.31, 0.31, 0.05, 14, "x", JX(16.15), sd * 0.86, -0.30));
      j35Nozzle(B, sd * 0.86, -0.30);
      /* team colour: a modest strip on each upper outer wing */
      var y0 = 3.9, y1 = 4.6, z0 = jwH(y0) + jwT(y0) / 2 + 0.012, z1 = jwH(y1) + jwT(y1) / 2 + 0.012;
      var e0 = tab(J_WING, y0, 2) - 0.9, e1 = tab(J_WING, y1, 2) - 0.9;
      B.team.push(sloft([[[JX(e0), sd * y0, z0], [JX(e0 + 0.45), sd * y0, z0], [JX(e1 + 0.45), sd * y1, z1], [JX(e1), sd * y1, z1]],
                         [[JX(e0), sd * y0, z0 + 0.02], [JX(e0 + 0.45), sd * y0, z0 + 0.02], [JX(e1 + 0.45), sd * y1, z1 + 0.02], [JX(e1), sd * y1, z1 + 0.02]]]));
    });
    /* the flat tail between the nozzles, out to 17.25 m (J side and plan) */
    B.skin.push(plate([[JX(15.4), 0.45], [JX(17.25), 0.12], [JX(17.25), -0.12], [JX(15.4), -0.45]], -0.05, 0.08));
    /* gear: twin nose wheels on a long leg (P7), single mains */
    [0.15, -0.15].forEach(function (y) { wheel(G, 0.26, 0.15, JX(3.5), y, J_GROUND, 18); hubFace(G.metal, 0.26, 0.15, JX(3.5), y, J_GROUND + 0.26, y > 0 ? 1 : -1); });
    oleo(G.metal, G.leg, [JX(3.5), 0, J_GROUND + 0.26], [JX(3.35), 0, -0.72], 0.07, 0.20);
    G.leg.push(bar([JX(3.5), 0, J_GROUND + 0.70], [JX(4.2), 0, -0.75], 0.035, 6));
    G.metal.push(cyl(0.04, 0.04, 0.36, 8, "y", JX(3.5), 0, J_GROUND + 0.26));
    [1, -1].forEach(function (sd) {
      wheel(G, 0.40, 0.26, JX(10.2), sd * 1.55, J_GROUND, 20);
      hubFace(G.metal, 0.40, 0.26, JX(10.2), sd * 1.55, J_GROUND + 0.40, sd);
      G.dark.push(cyl(0.26, 0.26, 0.05, 14, "y", JX(10.2), sd * 1.40, J_GROUND + 0.40));     /* the brake */
      oleo(G.metal, G.leg, [JX(10.2), sd * 1.42, J_GROUND + 0.40], [JX(10.0), sd * 1.30, -0.70], 0.08, -0.24);
      G.leg.push(bar([JX(10.2), sd * 1.42, J_GROUND + 0.75], [JX(9.3), sd * 1.20, -0.75], 0.04, 6));
      G.dark.push(box(1.4, 0.03, 0.55, JX(10.0), sd * 1.05, -1.02));
    });
    j35Detail(B, G);
    var pal = { top: "#9da2a5", side: "#9da2a5", belly: "#a3a8ab" };
    var cv = paintSheet(sh, pal, [JX(1.2), JX(2.3), JX(5.0), JX(8.2), JX(10.4), JX(12.8), JX(14.6)], 35001, function (g, s) {
      j35Paint(g, s);
      /* the bay doors' saw-toothed outlines under the body (J plan) */
      g.strokeStyle = "rgba(0,0,0,0.25)"; g.lineWidth = 1;
      [[8.4, 11.8, 0.25, 0.95], [8.4, 11.8, -0.95, -0.25]].forEach(function (d) {
        g.strokeRect(s.u(JX(d[0])), s.vy(d[3], 3), s.u(JX(d[1])) - s.u(JX(d[0])), s.vy(d[2], 3) - s.vy(d[3], 3));
      });
    });
    var mats = makeMats(C, cv, pal.side, {
      nozzle: { color: 0x4d4a46, roughness: 0.5, metalness: 0.5 },
      radome: { color: 0xb3b7b9, roughness: 0.6, metalness: 0.05 },
      lampR:  { color: 0xc8261e, roughness: 0.3, metalness: 0.1, emissive: 0x8a1410, emissiveIntensity: 0.6 },
      lampG:  { color: 0x1fa64a, roughness: 0.3, metalness: 0.1, emissive: 0x0e6a2c, emissiveIntensity: 0.6 }
    });
    var root = new V.Group();
    flush(root, B, mats, sh);
    var gear = new V.Group(); gear.name = "gear";
    flush(gear, G, mats, sh);
    root.add(gear);
    return root;
  }

  /* ============================================================ H-6N ==
     DRAWING units off drawing T (the Tu-16 the H-6 copies; 34.25 px/m on
     its 34.8 m, spanwise x1.054 to the published 33.0 m): s metres aft of the
     nose, y off the centreline, h above the fuselage axis. X = 17.3 - s. */
  var H_XN = 17.3, H_GROUND = -3.04;
  function HX(s) { return H_XN - s; }
  /* [s, half-width, crown, keel]; the solid nose and the tail cone are the
     H-6N's own (P9), the rest T's */
  var H_FUS = [
    [0.30, 0.22, 0.20, -0.30], [0.70, 0.37, 0.38, -0.55], [1.40, 0.58, 0.52, -0.84], [2.10, 0.71, 0.62, -1.00],
    [2.80, 0.80, 0.82, -1.12], [3.50, 0.89, 1.05, -1.20], [4.20, 0.95, 1.18, -1.20], [4.90, 1.02, 1.20, -1.20],
    [5.60, 1.05, 1.20, -1.20], [12.0, 1.05, 1.20, -1.20], [20.0, 1.05, 1.20, -1.20], [22.5, 1.00, 1.20, -1.15],
    [25.2, 0.78, 1.15, -1.05], [26.6, 0.72, 1.10, -0.88], [28.0, 0.66, 1.05, -0.74], [29.8, 0.60, 0.98, -0.61],
    [31.3, 0.52, 0.90, -0.47], [32.8, 0.40, 0.75, -0.29], [33.6, 0.28, 0.55, -0.12], [34.1, 0.13, 0.34, 0.04]
  ];
  /* wing [y, LE s, TE s] (T plan, y x1.054) and tailplane */
  var H_WING = [[1.10, 9.30, 18.0], [3.08, 11.80, 18.2], [5.85, 14.10, 19.21], [7.69, 15.50, 20.12], [9.54, 16.82, 21.02],
                [11.38, 18.10, 21.96], [13.23, 19.36, 22.89], [15.08, 20.61, 23.82], [16.49, 21.62, 24.42]];
  var H_TP = [[0.50, 28.20, 33.90], [1.94, 29.40, 33.95], [4.09, 30.80, 34.10], [5.69, 33.55, 34.40]];
  function hwH(y) { return 0.25 - Math.max(0, y - 1.1) * Math.tan(3 * D2R); }
  function hwT(y) { return 0.95 - (y - 1.1) / 15.4 * 0.62; }
  /* ---- H-6N detail pass: the fittings drawing T and P9 show that the
     first pass left out; their sizes are read through T's scale and P9's
     perspective, NOT measured ---- */
  function h6nDetail(B, G) {
    var k, wt = H_WING[H_WING.length - 1];
    /* wingtip position lamps, the white tail lamp under the tail cone,
       beacons on the spine and the belly */
    B.lampR.push(sph(0.07, 8, 6, HX((wt[1] + wt[2]) / 2), wt[0] - 0.06, hwH(wt[0]), 1.6, 0.6, 0.7));
    B.lampG.push(sph(0.07, 8, 6, HX((wt[1] + wt[2]) / 2), -wt[0] + 0.06, hwH(wt[0]), 1.6, 0.6, 0.7));
    B.metal.push(sph(0.05, 8, 5, HX(33.9), 0, -0.16, 1.3, 0.8, 1.0));
    B.lampR.push(sph(0.08, 8, 5, HX(12.0), 0, 1.21, 1.4, 1, 0.6), sph(0.08, 8, 5, HX(14.0), 0, -1.21, 1.4, 1, 0.6));
    /* blade aerials along the spine and under the belly, the long-wire
       aerial from the cockpit hump to the fin */
    bladeAnt(B.skin, HX(8.0), 0, 1.19, 0.32, 0.45, 0.03);
    bladeAnt(B.skin, HX(22.0), 0, 1.18, 0.26, 0.38, 0.03);
    bladeAnt(B.skin, HX(7.0), 0, -1.19, -0.30, 0.42, 0.03);
    bladeAnt(B.skin, HX(24.0), 0, -1.10, -0.26, 0.36, 0.03);
    B.dark.push(bar([HX(6.0), 0, 1.18], [HX(30.0), 0, 3.30], 0.008, 3));
    /* the cockpit windows' frames */
    [1, -1].forEach(function (sd) {
      B.dark.push(bar([HX(2.95), sd * 0.56, 1.08], [HX(3.9), sd * 0.75, 1.29], 0.022, 4), bar([HX(3.9), sd * 0.75, 1.29], [HX(4.6), sd * 0.79, 1.29], 0.022, 4));
      B.dark.push(bar([HX(3.05), sd * 0.57, 0.96], [HX(3.9), sd * 0.75, 1.10], 0.022, 4), bar([HX(3.9), sd * 0.75, 1.10], [HX(4.6), sd * 0.79, 1.11], 0.022, 4));
      B.dark.push(bar([HX(3.9), sd * 0.755, 1.10], [HX(3.9), sd * 0.755, 1.29], 0.022, 4), bar([HX(4.6), sd * 0.79, 1.11], [HX(4.6), sd * 0.79, 1.29], 0.022, 4));
      /* the engines: the intake's bright lip, the fan's spinner cone, the
         nozzle's liner and the turbine cone */
      var ny = sd * 1.90, nz = -0.15;
      B.metal.push(place(new V.TorusGeometry(0.88, 0.045, 6, 22), HX(9.62), ny, nz, 0, PI / 2, 0));
      push(B.dark, lathe([[HX(9.55), 0.02], [HX(9.70), 0.16], [HX(9.90), 0.24]], ny, nz, 12));
      for (k = 0; k < 16; k++) {
        var fb = box(0.03, 0.50, 0.08, HX(9.95), 0, 0); fb.translate(0, 0, 0); fb.rotateX(0.35);
        fb.translate(0, 0.40, 0); fb.rotateX(k * 2 * PI / 16); fb.translate(0, ny, nz);
        B.dark.push(fb);
      }
      B.dark.push(inv(cyl(0.72, 0.72, 0.60, 16, "x", HX(21.0), ny, nz, true)));
      push(B.metal, lathe([[HX(20.9), 0.30], [HX(21.1), 0.22], [HX(21.35), 0.04]], ny, nz, 12));
      /* the main gear: oleos, hubs, the bogie's brake rods; the gear pods'
         door seams */
      var y = sd * 5.0;
      [[16.5, 0.30], [16.5, -0.30], [17.9, 0.30], [17.9, -0.30]].forEach(function (w) {
        hubFace(G.metal, 0.55, 0.33, HX(w[0]), y + w[1], H_GROUND + 0.55, w[1] > 0 ? 1 : -1);
      });
      oleo(G.metal, G.leg, [HX(17.2), y, H_GROUND + 0.62], [HX(17.05), y, hwH(5.0) - 0.75], 0.14, 0.32);
      G.leg.push(bar([HX(16.5), y, H_GROUND + 0.55], [HX(17.9), y, H_GROUND + 0.55], 0.05, 6));
    });
    /* the nose leg: oleo, hub caps, taxi lamp */
    oleo(G.metal, G.leg, [HX(6.4), 0, H_GROUND + 0.40], [HX(6.25), 0, -1.25], 0.10, 0.22);
    [0.24, -0.24].forEach(function (y) { hubFace(G.metal, 0.40, 0.25, HX(6.4), y, H_GROUND + 0.40, y > 0 ? 1 : -1); });
    G.metal.push(sph(0.08, 8, 6, HX(6.10), 0, -1.40));
    /* the refuelling probe's bright tip ring */
    B.metal.push(cyl(0.14, 0.14, 0.04, 12, "x", HX(-1.05), 0, 0.78, true));
  }
  /* the H-6N's finish: seams, access panels and fastener rows (T), the
     bomb bay's doors on the belly (T plan), soot behind the nozzles along
     the fuselage sides, grime */
  function h6nPaint(g, s) {
    finish(g, s, {
      side: [[HX(2.2), HX(33.0), 0.75], [HX(2.2), HX(30.0), -0.60], [HX(5.6), HX(25.0), 0.10]],
      sideV: [[HX(7.5), -1.2, 1.2], [HX(14.0), -1.2, 1.2], [HX(18.0), -1.2, 1.2], [HX(26.6), -0.9, 1.1], [HX(29.8), -0.6, 1.0]],
      top: [[HX(12.0), 3.0, HX(22.0), 15.0], [HX(17.5), 2.0, HX(23.0), 15.5], [HX(5.6), 0.50, HX(30.0), 0.50]],
      belly: [[HX(12.0), 3.0, HX(22.0), 15.0], [HX(5.6), 0.50, HX(30.0), 0.50]],
      box: [[1, HX(6.0), HX(7.0), 0.40, -0.20], [1, HX(9.5), HX(10.5), 0.80, 0.30], [1, HX(23.0), HX(24.0), 0.60, 0.10],
            [1, HX(27.0), HX(27.8), 0.50, 0.0], [0, HX(10.0), HX(11.0), 0.30, 0.70], [0, HX(25.0), HX(26.0), 0.25, 0.55],
            [3, HX(12.5), HX(19.5), 0.10, 0.85], [3, HX(7.0), HX(8.0), 0.20, 0.60]],
      soot: [[HX(21.2), HX(27.0), -0.60, 0.40]], grime: 0.6
    }, 60666);
  }
  function h6n(THREE, M, C) {
    V = THREE;
    var sh = sheet(-17.6, 18.6, 17.0, H_GROUND, 7.0, 20);
    var B = bins(["skin", "dark", "metal", "glass", "team", "radome", "nozzle", "lampR", "lampG"]);
    var G = bins(["leg", "tyre", "dark", "metal"]);
    /* fuselage: one loft, the nose (radome, dark cap) separately */
    var secs = H_FUS.map(function (r) { return sec(HX(r[0]), 0, (r[2] + r[3]) / 2, r[1], (r[2] - r[3]) / 2, (r[2] - r[3]) / 2, 1, 1); });
    push(B.skin, loft(secs.slice(2), 24, null, 0.18));
    push(B.radome, loft(secs.slice(0, 3), 24, 0.30, null));
    /* the cockpit hump with its windows (T side; P9 shows the windows dark) */
    push(B.skin, loft([sec(HX(2.3), 0, 0.70, 0.30, 0.10, 0.10, 1, 1), sec(HX(3.0), 0, 0.98, 0.62, 0.30, 0.20, 0.9, 1),
                       sec(HX(4.0), 0, 1.15, 0.78, 0.33, 0.20, 0.8, 1), sec(HX(5.2), 0, 1.17, 0.80, 0.25, 0.20, 0.8, 1),
                       sec(HX(6.4), 0, 1.15, 0.70, 0.06, 0.06, 1, 1)], 16, 0, 0.3));
    [1, -1].forEach(function (sd) {
      B.glass.push(sloft([[[HX(2.95), sd * 0.55, 1.08], [HX(3.9), sd * 0.74, 1.28], [HX(4.6), sd * 0.78, 1.28], [HX(4.6), sd * 0.78, 1.12], [HX(3.9), sd * 0.74, 1.10], [HX(3.05), sd * 0.56, 0.96]],
                          [[HX(2.95), sd * 0.53, 1.08], [HX(3.9), sd * 0.72, 1.28], [HX(4.6), sd * 0.76, 1.28], [HX(4.6), sd * 0.76, 1.12], [HX(3.9), sd * 0.72, 1.10], [HX(3.05), sd * 0.54, 0.96]]]));
    });
    B.glass.push(sloft([[[HX(2.70), 0.45, 1.00], [HX(3.15), 0.52, 1.30], [HX(3.15), -0.52, 1.30], [HX(2.70), -0.45, 1.00]],
                        [[HX(2.66), 0.45, 1.00], [HX(3.11), 0.52, 1.30], [HX(3.11), -0.52, 1.30], [HX(2.66), -0.45, 1.00]]]));
    /* the refuelling probe over the nose (P9) */
    B.metal.push(bar([HX(-1.0), 0, 0.78], [HX(2.4), 0, 0.82], 0.07, 8));
    B.metal.push(cyl(0.13, 0.08, 0.25, 10, "x", HX(-0.95), 0, 0.78));
    B.skin.push(cyl(0.12, 0.16, 0.9, 10, "x", HX(2.1), 0, 0.80));
    /* the dorsal dome behind the wing root (P9) */
    B.radome.push(sph(0.55, 16, 8, HX(18.6), 0, 1.15, 1.4, 1, 0.55));
    /* the dark tail-cone fairing where the H-6's tail guns were (P9) */
    B.radome.push(sph(0.20, 12, 8, HX(34.12), 0, 0.10, 1.4, 1, 1));
    [1, -1].forEach(function (sd) {
      /* the wing: one loft, 3 deg anhedral (T front) */
      B.skin.push(sloft(H_WING.map(function (r) {
        return foil([HX(r[1]), sd * r[0], hwH(r[0])], [HX(r[2]), sd * r[0], hwH(r[0])], hwT(r[0]), [0, 0, 1]);
      })));
      /* two fences a side (T plan) */
      [7.2, 10.6].forEach(function (y) {
        var le = tab(H_WING, y, 1), te = tab(H_WING, y, 2), h = hwH(y) + hwT(y) / 2;
        B.metal.push(vplate([[HX(le - 0.1), h - 0.1], [HX(te - 0.4), h - 0.05], [HX(te - 0.4), h + 0.05], [HX(le + 1.0), h + 0.30], [HX(le - 0.1), h + 0.05]], sd * y, 0.03));
      });
      /* the turbofan nacelles in the wing roots: big round intakes ahead
         of the leading edge, the cans running to nozzles at the root
         trailing edge (P9 sees the big nozzle ring) */
      var ny = sd * 1.90, nz = -0.15;
      push(B.skin, loft([sec(HX(9.6), ny, nz, 0.86, 0.86, 0.86), sec(HX(10.6), ny, nz, 0.95, 0.95, 0.95),
                         sec(HX(13.0), ny, nz, 0.98, 0.98, 0.98), sec(HX(18.0), ny, nz, 0.95, 0.95, 0.95),
                         sec(HX(20.6), ny, nz, 0.84, 0.84, 0.84)], 18, null, null));
      B.dark.push(cyl(0.80, 0.80, 0.06, 18, "x", HX(9.75), ny, nz));
      B.metal.push(cyl(0.60, 0.60, 0.3, 14, "x", HX(9.85), ny, nz));
      B.nozzle.push(cyl(0.84, 0.74, 0.70, 18, "x", HX(20.95), ny, nz, true));
      B.dark.push(cyl(0.68, 0.68, 0.05, 16, "x", HX(21.1), ny, nz));
      /* main-gear pods over and behind the wing (T plan and side) */
      var py = sd * 5.0, pz = hwH(5.0) - 0.05;
      push(B.skin, loft([sec(HX(14.6), py, pz, 0.05, 0.05, 0.05), sec(HX(15.6), py, pz, 0.48, 0.50, 0.56),
                         sec(HX(18.0), py, pz, 0.58, 0.62, 0.66), sec(HX(20.6), py, pz + 0.02, 0.48, 0.48, 0.52),
                         sec(HX(22.4), py, pz + 0.05, 0.10, 0.10, 0.10)], 14, 0, 0));
      /* tailplane on the tail cone */
      B.skin.push(sloft(H_TP.map(function (r) {
        return foil([HX(r[1]), sd * r[0], 1.55], [HX(r[2]), sd * r[0], 1.55], 0.30 - r[0] * 0.04, [0, 0, 1]);
      })));
      /* team colour: a strip on each upper wingtip */
      var y0 = 13.3, y1 = 15.0, z0 = hwH(y0) + hwT(y0) / 2 + 0.02, z1 = hwH(y1) + hwT(y1) / 2 + 0.02;
      var e0 = tab(H_WING, y0, 2) - 1.4, e1 = tab(H_WING, y1, 2) - 1.4;
      B.team.push(sloft([[[HX(e0), sd * y0, z0], [HX(e0 + 0.9), sd * y0, z0], [HX(e1 + 0.9), sd * y1, z1], [HX(e1), sd * y1, z1]],
                         [[HX(e0), sd * y0, z0 + 0.03], [HX(e0 + 0.9), sd * y0, z0 + 0.03], [HX(e1 + 0.9), sd * y1, z1 + 0.03], [HX(e1), sd * y1, z1 + 0.03]]]));
    });
    /* the fin and its dorsal fillet (T side) */
    B.skin.push(sloft([foil([HX(24.3), 0, 1.0], [HX(34.0), 0, 1.0], 0.55, [0, 1, 0]),
                       foil([HX(28.0), 0, 2.70], [HX(34.15), 0, 2.70], 0.40, [0, 1, 0]),
                       foil([HX(32.4), 0, 6.63], [HX(34.2), 0, 6.63], 0.12, [0, 1, 0])]));
    /* gear: twin nose wheels, a four-wheel bogie under each pod (T side) */
    [0.24, -0.24].forEach(function (y) { wheel(G, 0.40, 0.25, HX(6.4), y, H_GROUND, 14); });
    G.leg.push(bar([HX(6.4), 0, H_GROUND + 0.40], [HX(6.2), 0, -1.15], 0.10, 8));
    [1, -1].forEach(function (sd) {
      var y = sd * 5.0;
      [[16.5, 0.30], [16.5, -0.30], [17.9, 0.30], [17.9, -0.30]].forEach(function (w) { wheel(G, 0.55, 0.33, HX(w[0]), y + w[1], H_GROUND, 16); });
      G.leg.push(box(1.6, 0.20, 0.16, HX(17.2), y, H_GROUND + 0.55));
      G.leg.push(bar([HX(17.2), y, H_GROUND + 0.6], [HX(17.0), y, hwH(5.0) - 0.55], 0.14, 8));
      G.dark.push(box(4.2, 0.04, 0.9, HX(18.0), y + 0.45, hwH(5.0) - 0.95));
      G.dark.push(box(4.2, 0.04, 0.9, HX(18.0), y - 0.45, hwH(5.0) - 0.95));
    });
    var pal = { top: "#b2b7ba", side: "#b2b7ba", belly: "#b8bdc0" };
    h6nDetail(B, G);
    var cv = paintSheet(sh, pal, [HX(2.2), HX(5.6), HX(9.0), HX(12.5), HX(16.0), HX(20.0), HX(24.0), HX(28.0), HX(31.5)], 60602, h6nPaint);
    var mats = makeMats(C, cv, pal.side, {
      radome: { color: 0x2b2f33, roughness: 0.55, metalness: 0.1 },
      nozzle: { color: 0x55524d, roughness: 0.45, metalness: 0.55 },
      lampR:  { color: 0xc8261e, roughness: 0.3, metalness: 0.1, emissive: 0x8a1410, emissiveIntensity: 0.6 },
      lampG:  { color: 0x1fa64a, roughness: 0.3, metalness: 0.1, emissive: 0x0e6a2c, emissiveIntensity: 0.6 }
    });
    var root = new V.Group();
    flush(root, B, mats, sh);
    var gear = new V.Group(); gear.name = "gear";
    flush(gear, G, mats, null);
    root.add(gear);
    return root;
  }

  /* =========================================================== YY-20 ==
     Read off P10 (20848 taxiing, side-on, 32.6 px/m on the 47.0 m from the
     nose to the tailplane tips): s metres aft of the nose, h metres above the
     ground. X = 23.5 - s, Z = h - 4.0 (ground at Z = -4.0). */
  var Y_XN = 23.5, Y_ZG = 4.0;
  function YX(s) { return Y_XN - s; }
  function YZ(h) { return h - Y_ZG; }
  /* fuselage [s, half-width, crown h, keel h] (P10 side; the half-width from
     P11's head-on proportion, as deep as it is wide) */
  var Y_FUS = [
    [0.50, 0.80, 3.70, 2.30], [1.30, 1.30, 4.23, 2.00], [2.80, 1.90, 5.05, 1.70], [4.40, 2.25, 5.77, 1.56],
    [5.90, 2.45, 6.17, 1.47], [7.40, 2.55, 6.41, 1.41], [9.00, 2.60, 6.53, 1.35], [11.0, 2.60, 6.60, 1.35],
    [24.0, 2.60, 6.62, 1.35], [27.4, 2.50, 6.72, 2.18], [30.4, 2.35, 6.84, 3.10], [33.5, 2.10, 7.08, 4.17],
    [36.6, 1.75, 7.55, 5.09], [39.6, 1.10, 9.20, 6.55], [41.0, 0.60, 9.40, 7.90], [41.7, 0.25, 9.20, 8.55]
  ];
  /* wing: [y, LE s, TE s, centre h, thickness] (P10, P11; see NOT CONFIRMED) */
  function ywH(y) { return 6.60 - Math.max(0, y - 2.6) * Math.tan(4 * D2R); }
  var Y_WING = [[2.6, 11.40, 23.0], [9.3, 14.52, 23.6], [15.0, 17.18, 24.0], [25.0, 21.84, 24.95]];
  function ywT(y) { return 1.30 - (y - 2.6) / 22.4 * 0.95; }
  /* ---- YY-20 detail pass: the fittings P10-P12 show that the first pass
     left out; their sizes are read through those photographs' scale and
     perspective, NOT measured ---- */
  function yy20Detail(B, G) {
    var k, wt = Y_WING[Y_WING.length - 1];
    B.lampR.push(sph(0.10, 8, 6, YX((wt[1] + wt[2]) / 2), wt[0] - 0.08, YZ(ywH(wt[0])), 1.6, 0.6, 0.7));
    B.lampG.push(sph(0.10, 8, 6, YX((wt[1] + wt[2]) / 2), -wt[0] + 0.08, YZ(ywH(wt[0])), 1.6, 0.6, 0.7));
    B.metal.push(sph(0.06, 8, 5, YX(41.6), 0, YZ(8.6), 1.3, 0.8, 1.0));
    B.lampR.push(sph(0.10, 8, 5, YX(13.0), 0, YZ(6.76), 1.4, 1, 0.6), sph(0.10, 8, 5, YX(25.0), 0, YZ(1.33), 1.4, 1, 0.6));
    /* blade aerials on the crown and the belly, the satcom fairing */
    bladeAnt(B.skin, YX(8.0), 0, YZ(6.52), 0.40, 0.55, 0.04);
    bladeAnt(B.skin, YX(29.5), 0, YZ(6.76), 0.36, 0.50, 0.04);
    bladeAnt(B.skin, YX(7.0), 0, YZ(1.40), -0.36, 0.50, 0.04);
    bladeAnt(B.skin, YX(11.5), 0, YZ(1.36), -0.30, 0.44, 0.04);
    B.skin.push(sph(0.60, 14, 6, YX(31.0), 0, YZ(6.80), 1.8, 1, 0.35));
    /* the flight deck windows' frames */
    [1, -1].forEach(function (sd) {
      [[2.3, 4.95, 2.5, 4.62], [3.0, 5.12, 3.0, 4.75], [4.0, 5.26, 4.0, 4.90], [5.0, 5.40, 5.0, 5.05]].forEach(function (f) {
        var w = f[0] < 2.6 ? 1.64 : f[0] < 3.5 ? 2.04 : f[0] < 4.5 ? 2.22 : 2.39;
        B.dark.push(bar([YX(f[0]), sd * w, YZ(f[1])], [YX(f[2]), sd * w, YZ(f[3])], 0.035, 4));
      });
      /* the paratroop doors behind the sponsons, the cargo ramp's hinge */
      B.dark.push(box(0.06, 0.03, 1.9, YX(28.6), sd * 2.36, YZ(3.4)), box(0.06, 0.03, 1.9, YX(29.6), sd * 2.32, YZ(3.6)));
      /* the flap-track fairings under each wing (P10, P11) */
      [5.5, 10.5, 15.5, 20.0].forEach(function (fy) {
        var te = tab(Y_WING, fy, 2), wz = YZ(ywH(fy)) - ywT(fy) * 0.35;
        push(B.skin, lathe([[YX(te - 2.2), 0.02], [YX(te - 1.6), 0.18], [YX(te - 0.2), 0.24], [YX(te + 0.9), 0.10], [YX(te + 1.2), 0.02]], sd * fy, wz - 0.10, 10));
      });
      /* the engines: intake lips, the fan blades behind the spinner, the
         nozzle's liner and the thrust-reverser seams */
      [[9.3, 11.6, 3.87], [15.0, 14.9, 3.70]].forEach(function (e) {
        var ey = sd * e[0], ez = YZ(e[2]), s0 = e[1];
        B.metal.push(place(new V.TorusGeometry(0.93, 0.05, 6, 22), YX(s0), ey, ez, 0, PI / 2, 0));
        B.dark.push(inv(cyl(0.72, 0.72, 0.60, 16, "x", YX(s0 + 6.6), ey, ez, true)));
        B.dark.push(cyl(1.005, 1.005, 0.03, 18, "x", YX(s0 + 2.6), ey, ez, true));
        B.dark.push(cyl(0.99, 0.99, 0.03, 18, "x", YX(s0 + 3.9), ey, ez, true));
      });
      /* the main gear: oleos and the outer wheels' hub caps */
      [17.5, 19.7, 21.8].forEach(function (ws) {
        hubFace(G.metal, 0.60, 0.40, YX(ws), sd * 2.85, YZ(0.60), sd);
        oleo(G.metal, G.leg, [YX(ws), sd * 2.52, YZ(0.62)], [YX(ws) + 0.05, sd * 2.58, YZ(1.55)], 0.10, 0.24);
      });
    });
    /* the nose leg: oleo, hub caps, the taxi lamps */
    oleo(G.metal, G.leg, [YX(5.1), 0, YZ(0.58)], [YX(5.0), 0, YZ(1.70)], 0.12, 0.26);
    [0.32, -0.32].forEach(function (y) { hubFace(G.metal, 0.55, 0.30, YX(5.1), y, YZ(0.55), y > 0 ? 1 : -1); });
    G.metal.push(sph(0.09, 8, 6, YX(4.8), 0.14, YZ(1.55)), sph(0.09, 8, 6, YX(4.8), -0.14, YZ(1.55)));
  }
  /* the YY-20's finish: seams and fastener rows along the fuselage and the
     wings, access panels, the sponsons' doors, soot behind the engines on
     the wings' undersides and streaks down the rear fuselage, grime */
  function yy20Paint(g, s) {
    finish(g, s, {
      side: [[YX(1.5), YX(39.0), YZ(5.6)], [YX(4.0), YX(27.0), YZ(2.2)], [YX(6.0), YX(30.0), YZ(4.0)]],
      sideV: [[YX(7.0), YZ(1.4), YZ(6.4)], [YX(11.0), YZ(1.35), YZ(6.6)], [YX(15.0), YZ(1.35), YZ(6.6)], [YX(19.0), YZ(1.35), YZ(6.6)],
              [YX(23.0), YZ(1.35), YZ(6.6)], [YX(27.4), YZ(2.2), YZ(6.7)], [YX(33.5), YZ(4.2), YZ(7.0)]],
      top: [[YX(12.0), 3.2, YX(22.0), 24.0], [YX(20.0), 3.2, YX(23.8), 24.0], [YX(4.0), 1.2, YX(38.0), 1.2]],
      belly: [[YX(12.0), 3.2, YX(22.0), 24.0], [YX(4.0), 1.0, YX(27.0), 1.0]],
      box: [[1, YX(14.0), YX(15.2), YZ(3.4), YZ(2.6)], [1, YX(24.0), YX(25.2), YZ(3.4), YZ(2.6)], [1, YX(6.2), YX(7.0), YZ(5.6), YZ(4.8)],
            [1, YX(34.0), YX(35.0), YZ(6.4), YZ(5.6)], [0, YX(15.0), YX(16.4), 0.4, 1.4], [0, YX(30.0), YX(31.2), 0.3, 1.1],
            [3, YX(8.0), YX(9.0), 0.3, 1.0], [3, YX(14.0), YX(26.0), 1.6, 2.4]],
      topSoot: [[YX(18.0), YX(24.0), 8.0, 10.5], [YX(21.0), YX(26.0), 13.5, 16.5]], grime: 0.6
    }, 20849);
  }
  /* ========================================================= detail kit ==
     (the redo) Fittings laid on the skin, and a projected paint sheet.
     ribbon()  a strip along a polyline lying on the skin (outward normal at
               each point given), lifted a little: panel seams, hinge lines,
               walkway edges, de-icer boots;
     blade()   a tapered blade aerial or a fence standing on the skin;
     lamp()    a small eight-faced lamp in a vertex colour (one material);
     sheet()   a grey-scale canvas laid over the coloured skins by projected
               UVs (plan views from above and below, the two sides): panel
               lines, rivet rows, walkways, exhaust soot and weathering. The
               skins keep their colour; the sheet only darkens it. */
  function DK(V) {
    function vsub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
    function vcross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
    function vnorm(a) { var m = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]) || 1; return [a[0] / m, a[1] / m, a[2] / m]; }
    function geo(pos, col) {
      var g = new V.BufferGeometry();
      g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
      if (col) g.setAttribute("color", new V.Float32BufferAttribute(col, 3));
      g.computeVertexNormals();
      return g;
    }
    function quad(pos, a, b, c, d, n) {
      var u = vsub(b, a), v = vsub(c, a), f = vcross(u, v);
      if (n && f[0] * n[0] + f[1] * n[1] + f[2] * n[2] < 0) { var t = b; b = d; d = t; }
      pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2],
               a[0], a[1], a[2], c[0], c[1], c[2], d[0], d[1], d[2]);
    }
    /* pts: [[x,y,z]...]; nrm: the outward normal at each point, or a
       function (p) -> normal; w the width, lift the height off the skin */
    function ribbon(pts, nrm, w, lift) {
      var pos = [], A = [], B = [], i, n = pts.length;
      if (n < 2) return null;
      for (i = 0; i < n; i++) {
        var p = pts[i], nn = vnorm(typeof nrm === "function" ? nrm(p) : (nrm[0].length ? nrm[i] : nrm));
        var t = vsub(pts[Math.min(i + 1, n - 1)], pts[Math.max(i - 1, 0)]);
        var s = vnorm(vcross(t, nn)), l = lift === undefined ? 0.012 : lift;
        var c = [p[0] + nn[0] * l, p[1] + nn[1] * l, p[2] + nn[2] * l];
        A.push([c[0] + s[0] * w / 2, c[1] + s[1] * w / 2, c[2] + s[2] * w / 2]);
        B.push([c[0] - s[0] * w / 2, c[1] - s[1] * w / 2, c[2] - s[2] * w / 2]);
        A[i].n = nn;
      }
      for (i = 0; i + 1 < n; i++) quad(pos, A[i], B[i], B[i + 1], A[i + 1], A[i].n);
      return geo(pos);
    }
    /* a blade from base point p, standing along up, chord along fwd (the
       leading edge forward); h tall, chord c0 at the root, c1 at the tip,
       th thick, the tip set back by rake */
    function blade(p, up, fwd, h, c0, c1, th, rake) {
      up = vnorm(up); fwd = vnorm(fwd);
      var sd = vnorm(vcross(up, fwd)), pos = [];
      function P(f, u, s) {
        return [p[0] + fwd[0] * f + up[0] * u + sd[0] * s, p[1] + fwd[1] * f + up[1] * u + sd[1] * s,
                p[2] + fwd[2] * f + up[2] * u + sd[2] * s];
      }
      var r = rake || 0, t = th / 2;
      var a0 = P(c0 / 2, 0, t), a1 = P(-c0 / 2, 0, t), a2 = P(-c0 / 2, 0, -t), a3 = P(c0 / 2, 0, -t);
      var b0 = P(c1 / 2 - r, h, t), b1 = P(-c1 / 2 - r, h, t), b2 = P(-c1 / 2 - r, h, -t), b3 = P(c1 / 2 - r, h, -t);
      quad(pos, a0, a1, b1, b0, sd); quad(pos, a3, a2, b2, b3, [-sd[0], -sd[1], -sd[2]]);
      quad(pos, a0, b0, b3, a3, fwd); quad(pos, a1, a2, b2, b1, [-fwd[0], -fwd[1], -fwd[2]]);
      quad(pos, b0, b1, b2, b3, up);
      return geo(pos);
    }
    /* an eight-faced lamp of radius r at p, in colour hex (vertex colour) */
    function lamp(p, r, hex) {
      var c = [((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255];
      var pos = [], col = [], i, j;
      var X = [[r, 0, 0], [-r, 0, 0]], Y = [[0, r, 0], [0, -r, 0]], Z = [[0, 0, r], [0, 0, -r]];
      for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) for (var k = 0; k < 2; k++) {
        var a = X[i], b = Y[j], d = Z[k];
        pos.push(p[0] + a[0], p[1] + a[1], p[2] + a[2], p[0] + b[0], p[1] + b[1], p[2] + b[2],
                 p[0] + d[0], p[1] + d[1], p[2] + d[2]);
        col.push(c[0], c[1], c[2], c[0], c[1], c[2], c[0], c[1], c[2]);
      }
      return geo(pos, col);
    }
    /* a closed loop of points around a body: f(angle) -> [x,y,z]; the
       normal is taken radially from the axis point ax(angle) */
    function hoop(f, a0, a1, n, ax, w, lift) {
      var pts = [], nr = [], i;
      for (i = 0; i <= n; i++) {
        var a = a0 + (a1 - a0) * i / n, p = f(a), c = ax(a);
        pts.push(p); nr.push([0, p[1] - c[1], p[2] - c[2]]);
      }
      return ribbon(pts, nr, w, lift);
    }

    /* ------------------------------------------------ the paint sheet --
       Four bands on a 1024 x 2048 sheet: from above (x, y), the port side
       (x, z), the starboard side (x, z), from below (x, y). */
    function layout(xmin, xmax, ymax, zmin, zmax) {
      var TW = 1024, TH = 2048, PX = (TW - 4) / (xmax - xmin);
      var PY = Math.min(PX * 1.6, 620 / (2 * ymax)), PZ = Math.min(PX * 1.6, 300 / (zmax - zmin));
      var TOPH = Math.ceil(2 * ymax * PY) + 2, SIDEH = Math.ceil((zmax - zmin) * PZ) + 2;
      var B_PORT = TOPH + 4, B_STBD = B_PORT + SIDEH + 4, B_BOT = B_STBD + SIDEH + 4;
      return { TW: TW, TH: TH, PX: PX, PY: PY, PZ: PZ, XMIN: xmin, YMAX: ymax, ZMAX: zmax,
               TOPH: TOPH, SIDEH: SIDEH, B_PORT: B_PORT, B_STBD: B_STBD, B_BOT: B_BOT };
    }
    function cl(v, a, b) { return v < a ? a : (v > b ? b : v); }
    function projUV(geo2, L) {
      var p = geo2.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
      for (t = 0; t + 8 < p.length; t += 9) {
        var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
        var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        nx /= nl; ny /= nl; nz /= nl;
        var endOn = Math.abs(nx) > 0.85;
        var band = endOn ? (nz < -0.3 ? 3 : 0) : (nz > 0.45 ? 0 : nz < -0.45 ? 3 : (ny >= 0 ? 1 : 2));
        for (k = 0; k < 3; k++) {
          var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, R;
          U = cl((x - L.XMIN) * L.PX, 1, L.TW - 1);
          if (band === 0) R = cl((L.YMAX - y) * L.PY, 1, L.TOPH - 1);
          else if (band === 3) R = L.B_BOT + cl((L.YMAX - y) * L.PY, 1, L.TOPH - 1);
          else R = (band === 2 ? L.B_STBD : L.B_PORT) + cl((L.ZMAX - z) * L.PZ, 1, L.SIDEH - 1);
          uv[(t / 3 + k) * 2] = U / L.TW;
          uv[(t / 3 + k) * 2 + 1] = 1 - R / L.TH;
        }
      }
      geo2.setAttribute("uv", new V.BufferAttribute(uv, 2));
      return geo2;
    }
    function rng(seed) {
      var s = seed >>> 0 || 1;
      return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    }
    /* spec: { frames: [[x, half-width], ...] lines round the body;
               top: [[[x,y],...], ...] polylines seen from above (mirrored
                    to starboard if spec.mirror);
               bot: the same from below; side: [[[x,z],...]] both sides;
               rivets: polylines (above) dotted;
               walk: [[[x,y],...]] walkway outlines (above);
               soot: [[x, y, z, length, width]] streaks running aft;
               grime: count of weathering blots; seam: line darkness 0-1 } */
    function sheet(L, spec, seed) {
      var cv = document.createElement("canvas");
      cv.width = L.TW; cv.height = L.TH;
      var g = cv.getContext("2d"), R = rng(seed || 7), i, j, sd;
      function U(x) { return (x - L.XMIN) * L.PX; }
      function RT(y) { return (L.YMAX - y) * L.PY; }
      function RB(y) { return L.B_BOT + (L.YMAX - y) * L.PY; }
      function RS(z, s) { return (s ? L.B_STBD : L.B_PORT) + (L.ZMAX - z) * L.PZ; }
      g.fillStyle = "#f2f2f2"; g.fillRect(0, 0, L.TW, L.TH);
      for (i = 0; i < (spec.grime || 140); i++) {          /* weathering */
        g.fillStyle = R() < 0.6 ? "rgba(40,40,40," + (0.03 + R() * 0.04) + ")" : "rgba(255,255,255,0.05)";
        g.beginPath(); g.ellipse(R() * L.TW, R() * L.TH, 4 + R() * 26, 2 + R() * 9, 0, 0, Math.PI * 2); g.fill();
      }
      var sa = spec.seam === undefined ? 0.55 : spec.seam;
      var LINE = "rgba(30,32,34," + sa + ")", FAINT = "rgba(30,32,34," + (sa * 0.45) + ")";
      function path(pts, map, col, lw, dash) {
        g.strokeStyle = col || LINE; g.lineWidth = lw || 1.2;
        if (g.setLineDash) g.setLineDash(dash || []);
        g.beginPath();
        for (var k = 0; k < pts.length; k++) {
          var q = map(pts[k]);
          if (k) g.lineTo(q[0], q[1]); else g.moveTo(q[0], q[1]);
        }
        g.stroke();
        if (g.setLineDash) g.setLineDash([]);
      }
      var mirror = spec.mirror !== false;
      function both(list, fT, col, lw, dash) {
        for (j = 0; j < (list || []).length; j++) {
          path(list[j], fT(1), col, lw, dash);
          if (mirror) path(list[j], fT(-1), col, lw, dash);
        }
      }
      both(spec.top, function (m) { return function (q) { return [U(q[0]), RT(m * q[1])]; }; });
      both(spec.bot, function (m) { return function (q) { return [U(q[0]), RB(m * q[1])]; }; });
      both(spec.rivets, function (m) { return function (q) { return [U(q[0]), RT(m * q[1])]; }; }, FAINT, 1, [1, 3]);
      both(spec.rivetsB, function (m) { return function (q) { return [U(q[0]), RB(m * q[1])]; }; }, FAINT, 1, [1, 3]);
      for (j = 0; j < (spec.side || []).length; j++) {
        for (sd = 0; sd < 2; sd++) {
          path(spec.side[j], (function (s) { return function (q) { return [U(q[0]), RS(q[1], s)]; }; })(sd));
        }
      }
      for (j = 0; j < (spec.frames || []).length; j++) {
        var f = spec.frames[j], x = U(f[0]);
        g.strokeStyle = LINE; g.lineWidth = 1.2;
        g.beginPath(); g.moveTo(x, RT(f[1])); g.lineTo(x, RT(-f[1])); g.stroke();
        g.beginPath(); g.moveTo(x, RB(f[1])); g.lineTo(x, RB(-f[1])); g.stroke();
        for (sd = 0; sd < 2; sd++) {
          g.beginPath(); g.moveTo(x, RS(L.ZMAX, sd)); g.lineTo(x, RS(L.ZMAX - L.SIDEH / L.PZ, sd)); g.stroke();
        }
      }
      for (j = 0; j < (spec.walk || []).length; j++) {     /* walkways: a darker, non-slip band */
        for (sd = 1; sd >= (mirror ? -1 : 1); sd -= 2) {
          var w = spec.walk[j];
          g.fillStyle = "rgba(20,22,24,0.16)";
          g.beginPath();
          for (i = 0; i < w.length; i++) { if (i) g.lineTo(U(w[i][0]), RT(sd * w[i][1])); else g.moveTo(U(w[i][0]), RT(sd * w[i][1])); }
          g.closePath(); g.fill();
        }
      }
      for (j = 0; j < (spec.soot || []).length; j++) {     /* exhaust soot, fading aft */
        var s = spec.soot[j], x0 = U(s[0]), x1 = U(s[0] - s[3]), hw = s[4] * L.PY;
        var grd = g.createLinearGradient(x0, 0, x1, 0);
        grd.addColorStop(0, "rgba(25,22,20,0.55)"); grd.addColorStop(1, "rgba(25,22,20,0)");
        g.fillStyle = grd;
        g.fillRect(x1, RT(s[1]) - hw, x0 - x1, 2 * hw);
        g.fillRect(x1, RB(s[1]) - hw, x0 - x1, 2 * hw);
        for (sd = 0; sd < 2; sd++) g.fillRect(x1, RS(s[2], sd) - s[4] * L.PZ, x0 - x1, 2 * s[4] * L.PZ);
      }
      var tex = new V.CanvasTexture(cv);
      tex.wrapS = tex.wrapT = V.ClampToEdgeWrapping;
      tex.anisotropy = 4;
      return tex;
    }
    return { ribbon: ribbon, blade: blade, lamp: lamp, hoop: hoop, layout: layout, projUV: projUV,
             sheet: sheet, geo: geo, quad: quad };
  }
  /* ---- YY-20, the redo (the model evaluation: still plain at the game
     camera). The joints P10-P12 show, laid on the skin as seam ribbons so
     they read at any zoom: the fuselage frames over the crown and sides,
     the side seams, the crew door and the two paratroop doors, the cargo
     ramp and the aft door's outline under the tail, two escape hatches on
     the crown; on each wing the slat line, the front spar, the flap and
     aileron hinge lines above and below and the spoiler panels' breaks;
     the elevator and rudder hinge lines. Places read off P10 / P11 at their
     scale, widths NOT measured. ---- */
  var YDK = null;
  function yBody(s, ang, push) {
    var hw = tab(Y_FUS, s, 1), cr = tab(Y_FUS, s, 2), kl = tab(Y_FUS, s, 3), zc = YZ((cr + kl) / 2), h = (cr - kl) / 2;
    var c = Math.cos(ang), sn = Math.sin(ang), e = sn >= 0 ? 0.9 : 0.8;
    var y = hw * sgn(c) * Math.pow(Math.abs(c), e), z = zc + h * sgn(sn) * Math.pow(Math.abs(sn), e);
    var r = Math.sqrt(y * y + (z - zc) * (z - zc)) || 1;
    return [YX(s), y + (push || 0) * y / r, z + (push || 0) * (z - zc) / r];
  }
  function yNorm(s) { var cr = tab(Y_FUS, s, 2), kl = tab(Y_FUS, s, 3); return function (p) { return [0, p[1], p[2] - YZ((cr + kl) / 2)]; }; }
  function yHoop(s, a0, a1) {
    return YDK.ribbon((function () { var o = [], k; for (k = 0; k <= 30; k++) o.push(yBody(s, a0 + (a1 - a0) * k / 30, 0)); return o; })(),
                      yNorm(s), 0.07, 0.02);
  }
  /* a path on the body through [s, angle] points */
  function yPath(L, pts, w) {
    var out = [], nr = [], i, k;
    for (i = 0; i + 1 < pts.length; i++) for (k = 0; k < 6; k++) {
      var t = k / 6, s = lerp(pts[i][0], pts[i + 1][0], t), a = lerp(pts[i][1], pts[i + 1][1], t), p = yBody(s, a, 0);
      out.push(p); nr.push(yNorm(s)(p));
    }
    var e = pts[pts.length - 1], pe = yBody(e[0], e[1], 0);
    out.push(pe); nr.push(yNorm(e[0])(pe));
    L.push(YDK.ribbon(out, nr, w || 0.07, 0.02));
  }
  /* the wing's skin at chord fraction f (the foil() ring's own outline) */
  function yWTop(y, f, sg) {
    var t = ywT(y), k;
    if (f < 0.05) k = 0.33 * f / 0.05;
    else if (f < 0.16) k = lerp(0.33, 0.5, (f - 0.05) / 0.11);
    else if (f < 0.40) k = 0.5;
    else if (f < 0.70) k = lerp(0.5, 0.32, (f - 0.40) / 0.30);
    else k = lerp(0.32, 0.004 / t, (f - 0.70) / 0.30);
    var le = tab(Y_WING, y, 1), te = tab(Y_WING, y, 2);
    return [YX(le + (te - le) * f), y, YZ(ywH(y)) + sg * k * t];
  }
  function yWLine(L, sd, y0, y1, f0, f1, sg, n) {
    var pts = [], i;
    for (i = 0; i <= n; i++) { var p = yWTop(y0 + (y1 - y0) * i / n, f0 + (f1 - f0) * i / n, sg); pts.push([p[0], sd * p[1], p[2]]); }
    L.push(YDK.ribbon(pts, [0, 0, sg], 0.10, 0.02));
  }
  function yy20Redo(B) {
    YDK = DK(V);
    var a0 = -0.12 * PI, a1 = 1.12 * PI;
    [7.0, 9.0, 11.0, 13.0, 15.0, 17.0, 19.0, 21.0, 23.0, 25.0, 27.4, 30.4, 33.5].forEach(function (s) {
      B.seam.push(yHoop(s, s > 11.5 && s < 25.5 ? 0.30 * PI : a0, s > 11.5 && s < 25.5 ? 0.70 * PI : a1));
    });
    [1, -1].forEach(function (sd) {
      var side = sd > 0 ? 0 : PI;
      yPath(B.seam, [[4.0, side + sd * 0.42], [39.0, side + sd * 0.42]]);
      yPath(B.seam, [[4.0, side - sd * 0.30], [27.0, side - sd * 0.30]]);
      /* the paratroop doors behind the sponsons */
      yPath(B.seam, [[28.3, side - sd * 0.28], [29.9, side - sd * 0.28], [29.9, side + sd * 0.12], [28.3, side + sd * 0.12], [28.3, side - sd * 0.28]], 0.06);
      /* wing: slat line, spar, flap / aileron hinges top and bottom */
      yWLine(B.seam, sd, 3.0, 24.6, 0.10, 0.10, 1, 12);
      yWLine(B.seam, sd, 3.0, 24.6, 0.70, 0.70, 1, 12);
      yWLine(B.seam, sd, 3.0, 24.6, 0.70, 0.70, -1, 12);
      yWLine(B.seam, sd, 3.0, 24.6, 0.25, 0.25, 1, 12);
      [8.0, 12.0, 17.0].forEach(function (y) { yWLine(B.seam, sd, y, y, 0.55, 1.0, 1, 3); });
      [5.0, 6.5, 9.5, 11.0, 13.5].forEach(function (y) { yWLine(B.seam, sd, y, y, 0.55, 0.70, 1, 2); });
      /* the elevator's hinge, the rudder's both faces */
      var tp0 = [YX(43.6), sd * 0.4, YZ(13.9) + 0.13], tp1 = [YX(46.5), sd * 8.2, YZ(13.6) + 0.05];
      B.seam.push(YDK.ribbon([tp0, tp1], [0, 0, 1], 0.08, 0.02));
      B.seam.push(YDK.ribbon([[YX(40.9), sd * 0.34, YZ(7.2)], [YX(42.2), sd * 0.31, YZ(9.4)], [YX(43.0), sd * 0.20, YZ(14.0)]],
                             [0, sd, 0], 0.08, 0.02));
    });
    /* the crew door on the port side (P10), the cargo ramp under the tail */
    yPath(B.seam, [[9.1, 0.10], [10.0, 0.10], [10.0, -0.50], [9.1, -0.50], [9.1, 0.10]], 0.06);
    yPath(B.seam, [[30.8, -0.62 * PI], [39.6, -0.62 * PI]]);
    yPath(B.seam, [[30.8, -0.38 * PI], [39.6, -0.38 * PI]]);
    yPath(B.seam, [[30.8, -0.62 * PI], [30.8, -0.38 * PI]]);
    yPath(B.seam, [[35.6, -0.62 * PI], [35.6, -0.38 * PI]]);
    /* two escape hatches on the crown */
    [[6.4, 7.3], [26.0, 26.9]].forEach(function (h) {
      yPath(B.seam, [[h[0], 0.45 * PI], [h[1], 0.45 * PI], [h[1], 0.55 * PI], [h[0], 0.55 * PI], [h[0], 0.45 * PI]], 0.06);
    });
  }
  function yy20(THREE, M, C) {
    V = THREE;
    var sh = sheet(-24.0, 24.0, 25.5, -4.1, 11.0, 16);
    var B = bins(["skin", "seam", "dark", "metal", "glass", "team", "nozzle", "store", "lampR", "lampG"]);
    var G = bins(["leg", "tyre", "dark", "metal"]);
    var secs = Y_FUS.map(function (r) { return sec(YX(r[0]), 0, YZ((r[2] + r[3]) / 2), r[1], (r[2] - r[3]) / 2, (r[2] - r[3]) / 2, 0.9, 0.8); });
    push(B.skin, loft(secs, 26, 0.5, 0.25));
    /* the flight-deck windows: a dark band round the nose (P10, P11) */
    [1, -1].forEach(function (sd) {
      B.glass.push(sloft([[[YX(2.3), sd * 1.62, YZ(4.95)], [YX(3.0), sd * 2.02, YZ(5.12)], [YX(5.0), sd * 2.36, YZ(5.40)], [YX(5.0), sd * 2.40, YZ(5.05)], [YX(3.0), sd * 2.06, YZ(4.75)], [YX(2.5), sd * 1.78, YZ(4.62)]],
                          [[YX(2.3), sd * 1.60, YZ(4.95)], [YX(3.0), sd * 2.00, YZ(5.12)], [YX(5.0), sd * 2.34, YZ(5.40)], [YX(5.0), sd * 2.38, YZ(5.05)], [YX(3.0), sd * 2.04, YZ(4.75)], [YX(2.5), sd * 1.76, YZ(4.62)]]]));
    });
    B.glass.push(sloft([[[YX(2.05), 1.30, YZ(4.90)], [YX(2.55), 1.45, YZ(5.30)], [YX(2.55), -1.45, YZ(5.30)], [YX(2.05), -1.30, YZ(4.90)]],
                        [[YX(2.00), 1.30, YZ(4.90)], [YX(2.50), 1.45, YZ(5.30)], [YX(2.50), -1.45, YZ(5.30)], [YX(2.00), -1.30, YZ(4.90)]]]));
    /* the wing-root fairing on top of the fuselage (P10) */
    push(B.skin, loft([sec(YX(10.0), 0, YZ(6.55), 0.4, 0.05, 0.05), sec(YX(12.5), 0, YZ(6.70), 2.3, 0.45, 0.2, 0.8, 1),
                       sec(YX(20.0), 0, YZ(6.75), 2.4, 0.55, 0.2, 0.8, 1), sec(YX(25.5), 0, YZ(6.80), 1.8, 0.25, 0.2, 0.8, 1),
                       sec(YX(28.0), 0, YZ(6.84), 0.5, 0.05, 0.05)], 14, 0, 0));
    [1, -1].forEach(function (sd) {
      /* the high wing, 4 deg anhedral (P11) */
      B.skin.push(sloft(Y_WING.map(function (r) {
        return foil([YX(r[1]), sd * r[0], YZ(ywH(r[0]))], [YX(r[2]), sd * r[0], YZ(ywH(r[0]))], ywT(r[0]), [0, 0, 1]);
      })));
      /* four turbofans on pylons ahead of and below the wing (P10, P11) */
      [[9.3, 11.6, 3.87], [15.0, 14.9, 3.70]].forEach(function (e) {
        var ey = sd * e[0], ez = YZ(e[2]), s0 = e[1];
        push(B.skin, loft([sec(YX(s0), ey, ez, 0.92, 0.92, 0.92), sec(YX(s0 + 0.6), ey, ez, 1.00, 1.00, 1.00),
                           sec(YX(s0 + 3.5), ey, ez, 0.98, 0.98, 0.98), sec(YX(s0 + 5.6), ey, ez, 0.80, 0.80, 0.80)], 18, null, null));
        B.dark.push(cyl(0.80, 0.80, 0.05, 16, "x", YX(s0 + 0.3), ey, ez));
        B.metal.push(cyl(0.30, 0.02, 0.6, 10, "x", YX(s0 + 0.6), ey, ez));
        B.nozzle.push(cyl(0.80, 0.55, 1.3, 16, "x", YX(s0 + 6.25), ey, ez, true));
        B.dark.push(cyl(0.30, 0.05, 0.9, 10, "x", YX(s0 + 7.1), ey, ez));
        var le = tab(Y_WING, e[0], 1), wz = YZ(ywH(e[0]));
        B.skin.push(sloft([[[YX(s0 + 1.8), ey + 0.14, ez + 0.6], [YX(le + 3.5), ey + 0.14, wz], [YX(le - 0.2), ey + 0.14, wz], [YX(s0 + 0.9), ey + 0.14, ez + 0.6]],
                           [[YX(s0 + 1.8), ey - 0.14, ez + 0.6], [YX(le + 3.5), ey - 0.14, wz], [YX(le - 0.2), ey - 0.14, wz], [YX(s0 + 0.9), ey - 0.14, ez + 0.6]]]));
      });
      /* the YY-20's hose-drum pods under the outer wings (P10, P12) */
      var py = sd * 19.5, pz = YZ(ywH(19.5) - 1.05), le2 = tab(Y_WING, 19.5, 1);
      push(B.store, lathe([[YX(le2 - 0.8), 0.06], [YX(le2 - 0.3), 0.32], [YX(le2 + 0.4), 0.42], [YX(le2 + 4.0), 0.42], [YX(le2 + 4.7), 0.30]], py, pz, 14));
      B.dark.push(cyl(0.30, 0.36, 0.5, 12, "x", YX(le2 + 4.95), py, pz, true));
      B.skin.push(box(2.6, 0.18, 0.75, YX(le2 + 1.6), py, pz + 0.65));
      /* the main-gear sponsons along the lower fuselage (P10) */
      push(B.skin, loft([sec(YX(13.8), sd * 2.55, YZ(2.6), 0.10, 0.4, 0.4), sec(YX(15.2), sd * 2.70, YZ(2.4), 0.70, 1.05, 1.15, 0.8, 0.7),
                         sec(YX(22.0), sd * 2.75, YZ(2.4), 0.75, 1.20, 1.20, 0.8, 0.7), sec(YX(26.0), sd * 2.65, YZ(2.6), 0.55, 0.95, 1.0, 0.8, 0.8),
                         sec(YX(28.2), sd * 2.50, YZ(3.0), 0.10, 0.3, 0.3)], 14, 0, 0));
      /* the T-tail's tailplane, swept, on the fin top (P10) */
      B.skin.push(sloft([foil([YX(40.6), sd * 0.3, YZ(13.9)], [YX(44.6), sd * 0.3, YZ(13.9)], 0.40, [0, 0, 1]),
                         foil([YX(45.4), sd * 8.4, YZ(13.6)], [YX(47.0), sd * 8.4, YZ(13.6)], 0.12, [0, 0, 1])]));
      /* team colour: a strip on each upper outer wing */
      var y0 = 20.5, y1 = 23.0, z0 = YZ(ywH(y0) + ywT(y0) / 2 + 0.03), z1 = YZ(ywH(y1) + ywT(y1) / 2 + 0.03);
      var e0 = tab(Y_WING, y0, 2) - 1.6, e1 = tab(Y_WING, y1, 2) - 1.6;
      B.team.push(sloft([[[YX(e0), sd * y0, z0], [YX(e0 + 1.0), sd * y0, z0], [YX(e1 + 1.0), sd * y1, z1], [YX(e1), sd * y1, z1]],
                         [[YX(e0), sd * y0, z0 + 0.04], [YX(e0 + 1.0), sd * y0, z0 + 0.04], [YX(e1 + 1.0), sd * y1, z1 + 0.04], [YX(e1), sd * y1, z1 + 0.04]]]));
    });
    /* the swept fin and its fillet (P10) */
    B.skin.push(sloft([foil([YX(31.0), 0, YZ(6.9)], [YX(41.6), 0, YZ(6.9)], 0.70, [0, 1, 0]),
                       foil([YX(36.0), 0, YZ(9.4)], [YX(42.6), 0, YZ(9.4)], 0.62, [0, 1, 0]),
                       foil([YX(39.3), 0, YZ(14.3)], [YX(43.9), 0, YZ(14.3)], 0.40, [0, 1, 0])]));
    push(B.skin, loft([sec(YX(39.0), 0, YZ(14.25), 0.05, 0.05, 0.05), sec(YX(40.0), 0, YZ(14.25), 0.32, 0.30, 0.30),
                       sec(YX(44.0), 0, YZ(14.20), 0.30, 0.28, 0.28), sec(YX(45.4), 0, YZ(14.15), 0.05, 0.05, 0.05)], 12, 0, 0));
    /* gear: twin nose wheels, three tandem pairs under each sponson (P10) */
    [0.32, -0.32].forEach(function (y) { wheel(G, 0.55, 0.30, YX(5.1), y, -Y_ZG, 16); });
    G.leg.push(bar([YX(5.1), 0, YZ(0.55)], [YX(5.0), 0, YZ(1.6)], 0.12, 8));
    [1, -1].forEach(function (sd) {
      [17.5, 19.7, 21.8].forEach(function (ws) {
        [2.2, 2.85].forEach(function (wy) { wheel(G, 0.60, 0.40, YX(ws), sd * wy, -Y_ZG, 16); });
        G.leg.push(bar([YX(ws), sd * 2.52, YZ(0.6)], [YX(ws), sd * 2.6, YZ(1.4)], 0.12, 8));
      });
    });
    yy20Detail(B, G);
    yy20Redo(B);
    var pal = { top: "#646a70", side: "#646a70", belly: "#6a7076" };
    var cv = paintSheet(sh, pal, [YX(3.0), YX(7.0), YX(11.0), YX(15.0), YX(19.0), YX(23.0), YX(27.0), YX(31.0), YX(35.0), YX(39.0)], 20848, function (g, s) {
      /* the crew door on the port side, the ramp's hinge lines (P10) */
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1;
      g.strokeRect(s.u(YX(9.1)), s.vz(YZ(3.9), 1), s.u(YX(10.0)) - s.u(YX(9.1)), s.vz(YZ(2.0), 1) - s.vz(YZ(3.9), 1));
      [1, 2].forEach(function (b) { g.beginPath(); g.moveTo(s.u(YX(31.0)), s.vz(YZ(3.0), b)); g.lineTo(s.u(YX(39.5)), s.vz(YZ(6.6), b)); g.stroke(); });
      yy20Paint(g, s);
    });
    var mats = makeMats(C, cv, pal.side, {
      nozzle: { color: 0x4f4c48, roughness: 0.5, metalness: 0.5 },
      store:  { color: 0x6e7479, roughness: 0.7, metalness: 0.1 },
      seam:   { color: 0x2f3337, roughness: 0.85, metalness: 0.05, side: V.DoubleSide },
      lampR:  { color: 0xc8261e, roughness: 0.3, metalness: 0.1, emissive: 0x8a1410, emissiveIntensity: 0.6 },
      lampG:  { color: 0x1fa64a, roughness: 0.3, metalness: 0.1, emissive: 0x0e6a2c, emissiveIntensity: 0.6 }
    });
    var root = new V.Group();
    flush(root, B, mats, sh);
    var gear = new V.Group(); gear.name = "gear";
    flush(gear, G, mats, null);
    root.add(gear);
    /* the YY-20's refuelling attach points for render3d.js drawAAR: empty
       named nodes at the tail of each wing hose-drum pod; the fuselage
       hose unit is not drawn, so "aar_ctr" is placed under the rear
       fuselage ahead of the cargo ramp (not measured) */
    var ple = tab(Y_WING, 19.5, 1), ppz = YZ(ywH(19.5) - 1.05);
    [["pod_l", [YX(ple + 5.2), 19.5, ppz]], ["pod_r", [YX(ple + 5.2), -19.5, ppz]], ["ctr", [YX(33.0), 0, YZ(2.9)]]].forEach(function (q) {
      var o = new V.Object3D();
      o.name = "aar_" + q[0];
      o.position.set(q[1][0], q[1][1], q[1][2]);
      root.add(o);
    });
    return root;
  }

  /* ============================================================ Z-20 ==
     Read off P14 (in flight, starboard side, 74 px/m: see the header) and
     P13 (parked, port bow). x metres forward of the mast, h above the
     wheel bottoms. Z = h + Z_GROUND. */
  var Z_GROUND = -1.50;
  function ZH(h) { return h + Z_GROUND; }
  var Z_HUB = 3.55, Z_R = 8.0, Z_CHORD = 0.53;
  var Z_TRX = -10.30, Z_TRH = 3.60, Z_TRY = -0.36, Z_TRR = 1.49, Z_TRC = 17 * D2R;
  /* fuselage [x, bottom h, top h, half-width, exponent] (P13, P14) */
  var Z_FUS = [
    [5.60, 0.95, 1.55, 0.45, 0.9], [5.10, 0.70, 1.82, 0.85, 0.75], [4.50, 0.58, 2.05, 1.05, 0.6],
    [3.60, 0.55, 2.20, 1.15, 0.45], [3.00, 0.55, 2.22, 1.18, 0.4], [-1.00, 0.55, 2.22, 1.18, 0.4],
    [-2.40, 0.62, 2.20, 1.15, 0.45], [-3.20, 0.85, 2.15, 1.02, 0.55], [-4.00, 1.10, 2.10, 0.74, 0.7],
    [-5.50, 1.35, 2.07, 0.50, 0.8], [-7.50, 1.62, 2.12, 0.37, 0.85], [-9.00, 1.82, 2.24, 0.29, 0.9],
    [-9.90, 1.97, 2.32, 0.24, 0.9]
  ];
  /* ---- Z-20 detail pass: the fittings P13 and P14 show that the first pass
     left out ---- */
  /* a frame of round bars round a polygon of [x, z] points standing at y */
  function frameXZ(L, pts, y, r) {
    for (var i = 0; i < pts.length; i++) {
      var a = pts[i], b = pts[(i + 1) % pts.length];
      L.push(bar([a[0], y, a[1]], [b[0], y, b[1]], r, 4));
    }
  }
  function z20Detail(B, G) {
    var i;
    /* the windscreen's frames: the centre post, the top and bottom bows, the
       corner posts, and the two wipers (P13) */
    var wf = [[5.14, 0.81, ZH(1.61)], [4.42, 0.99, ZH(2.13)], [4.42, -0.99, ZH(2.13)], [5.14, -0.81, ZH(1.61)]];
    for (i = 0; i < 4; i++) B.dark.push(bar(wf[i], wf[(i + 1) % 4], 0.035, 5));
    B.dark.push(bar([5.15, 0, ZH(1.61)], [4.43, 0, ZH(2.13)], 0.035, 5));
    [1, -1].forEach(function (sd) {
      B.dark.push(bar([5.06, sd * 0.42, ZH(1.70)], [4.80, sd * 0.30, ZH(1.98)], 0.013, 4));
      var y = sd * 1.19;
      /* the cockpit door window, the cabin door window and the cabin
         windows: dark frames proud of the glass (P13) */
      frameXZ(B.dark, [[4.6, ZH(1.15)], [3.35, ZH(1.15)], [3.35, ZH(2.02)], [4.25, ZH(2.10)], [4.75, ZH(1.70)]], y * 0.99, 0.025);
      B.dark.push(bar([3.95, y * 0.995, ZH(1.15)], [3.95, y * 0.995, ZH(2.06)], 0.018, 4));
      frameXZ(B.dark, [[3.00, ZH(1.30)], [2.20, ZH(1.30)], [2.20, ZH(1.95)], [3.00, ZH(1.95)]], y * 1.003, 0.025);
      [[1.2, 0.5], [0.2, -0.5]].forEach(function (w) {
        frameXZ(B.dark, [[w[0], ZH(1.40)], [w[1], ZH(1.40)], [w[1], ZH(1.95)], [w[0], ZH(1.95)]], y * 1.003, 0.022);
      });
      /* door handles, the cockpit door's hinge line, the steps under the
         cockpit and cabin doors (P13: the box below the cockpit door) */
      B.metal.push(box(0.16, 0.04, 0.04, 3.55, y * 1.02, ZH(1.05)), box(0.16, 0.04, 0.04, 1.55, y * 1.02, ZH(1.20)));
      B.dark.push(box(0.32, 0.30, 0.26, 3.70, sd * 1.12, ZH(0.52)));
      B.metal.push(box(0.50, 0.24, 0.03, 3.70, sd * 1.25, ZH(0.40)), box(0.55, 0.22, 0.03, 1.00, sd * 1.30, ZH(0.62)));
      B.dark.push(bar([1.00, sd * 1.13, ZH(0.62)], [1.00, sd * 1.30, ZH(0.62)], 0.02, 4));
      /* the chin windows on the lower nose (P13: the dark bulges either side) */
      B.glass.push(sph(0.30, 12, 8, 4.98, sd * 0.78, ZH(1.18), 1.35, 0.30, 0.75));
      /* the engine intake lip and the particle-separator screen (P13) */
      B.metal.push(cyl(0.375, 0.375, 0.07, 16, "x", 1.04, sd * 0.78, ZH(2.55), true));
      B.metal.push(sph(0.12, 10, 6, 1.06, sd * 0.78, ZH(2.55), 0.6, 1, 1));
      /* the upturned exhaust's lip (P14) */
      var lip = cyl(0.27, 0.28, 0.05, 14, "x", 0, 0, 0, true), th = Math.atan(0.6);
      lip.rotateY(th); lip.translate(-3.44, sd * 0.78 * 1.15, ZH(2.92));
      B.metal.push(lip);
      /* nav lights at the stabilator tips: port red, starboard green */
      (sd > 0 ? B.lampR : B.lampG).push(sph(0.05, 8, 6, -9.95, sd * 2.17, ZH(1.95)));
    });
    /* the nose sensor box under the nose (P13, P14), the aerial post on the
       cabin roof and the blade aerials (P13: the post behind the
       windscreen; P14: the fairing on the boom's root, the blade under it) */
    B.dark.push(box(0.36, 0.30, 0.22, 5.30, 0, ZH(0.62)));
    B.glass.push(sph(0.09, 8, 6, 5.45, 0, ZH(0.52)));
    B.dark.push(bar([3.6, 0.55, ZH(2.22)], [3.5, 0.62, ZH(2.62)], 0.025, 5));
    B.dark.push(sph(0.05, 6, 4, 3.5, 0.62, ZH(2.64)));
    push(B.skin, loft([sec(-3.95, 0, ZH(2.12), 0.10, 0.04, 0.04), sec(-4.20, 0, ZH(2.40), 0.16, 0.30, 0.30, 0.8, 0.8),
                       sec(-4.55, 0, ZH(2.40), 0.16, 0.30, 0.30, 0.8, 0.8), sec(-4.75, 0, ZH(2.12), 0.08, 0.04, 0.04)], 10, 0, 0));
    bladeAnt(B.skin, -5.6, 0, ZH(1.40), -0.42, 0.28, 0.03);
    bladeAnt(B.skin, 2.2, 0, ZH(2.36), 0.24, 0.30, 0.025);
    bladeAnt(B.skin, -1.8, 0, ZH(0.56), -0.22, 0.26, 0.025);
    /* the tail-rotor drive-shaft cover along the boom's top (P13, P14) */
    push(B.skin, loft([sec(-4.8, 0, ZH(2.12), 0.10, 0.06, 0.06), sec(-5.5, 0, ZH(2.10), 0.12, 0.08, 0.06), sec(-8.8, 0, ZH(2.30), 0.10, 0.08, 0.06),
                       sec(-9.0, 0, ZH(2.32), 0.06, 0.04, 0.04)], 8, 0, 0));
    /* anti-collision beacons: on the engine deck aft and under the boom */
    B.lampR.push(sph(0.06, 8, 5, -3.3, 0, ZH(2.72), 1, 1, 0.7), sph(0.06, 8, 5, -4.5, 0, ZH(1.20), 1, 1, 0.7));
    /* the main gear: oleos, hubs and brakes, axles (P13: the long trailing
       arm and the near-upright strut) */
    var MX = 1.75, MY = 1.40;
    [1, -1].forEach(function (sd) {
      hubFace(G.leg, 0.32, 0.22, MX, sd * MY, ZH(0.32), sd);
      G.dark.push(cyl(0.20, 0.20, 0.05, 12, "y", MX, sd * (MY - 0.13), ZH(0.32)));
      G.leg.push(cyl(0.05, 0.05, 0.36, 8, "y", MX, sd * (MY - 0.08), ZH(0.32)));
      oleo(G.leg, G.dark, [MX + 0.05, sd * (MY - 0.12), ZH(0.36)], [MX + 0.35, sd * 1.10, ZH(0.95)], 0.065, 0.16);
      G.dark.push(box(0.30, 0.10, 0.16, MX + 0.38, sd * 1.10, ZH(0.98)), box(0.30, 0.10, 0.16, MX - 0.58, sd * 1.12, ZH(0.82)));
    });
    /* the tail wheel: its fork and hub, the oleo */
    hubFace(G.leg, 0.20, 0.14, -8.65, 0.0, ZH(0.20), 1);
    hubFace(G.leg, 0.20, 0.14, -8.65, 0.0, ZH(0.20), -1);
    [1, -1].forEach(function (sd) { G.leg.push(bar([-8.65, sd * 0.10, ZH(0.20)], [-8.55, sd * 0.10, ZH(0.62)], 0.025, 5)); });
    G.leg.push(box(0.10, 0.26, 0.06, -8.55, 0, ZH(0.64)));
    oleo(G.leg, G.dark, [-8.55, 0, ZH(0.66)], [-8.40, 0, ZH(1.80)], 0.055, 0.15);
  }
  /* the rotor head's fittings, authored in the head's frame (model axes,
     origin on the hub): per blade a root cuff, an elastomeric bearing, a
     damper and the pitch horn with its link down to the swashplate; the
     swashplate's rotating ring (P13: the head close up) */
  function z20Head(hub, bl, k, a) {
    var parts = [box(0.80, 0.24, 0.10, 1.10, 0.0, 0.0), sph(0.13, 10, 6, 0.48, 0, 0),
                 bar([0.30, 0.20, 0.06], [0.95, 0.20, 0.02], 0.035, 6),
                 box(0.18, 0.06, 0.05, 0.78, -0.16, -0.06), bar([0.80, -0.20, -0.08], [0.62, -0.20, -0.48], 0.022, 5)];
    for (var i = 0; i < parts.length; i++) { parts[i].rotateZ(a); (i === 0 ? bl : hub).push(parts[i]); }
  }
  function z20Paint(g, s) {
    finish(g, s, {
      side: [[5.4, -9.8, ZH(0.62)], [4.8, -3.2, ZH(2.22)], [3.4, -2.6, ZH(1.10)], [-3.2, -9.6, ZH(2.06)], [-3.0, -9.0, ZH(1.30)],
             [1.0, -2.8, ZH(2.45)]],
      sideV: [[3.35, ZH(0.60), ZH(2.20)], [4.75, ZH(0.70), ZH(1.70)], [-2.40, ZH(0.62), ZH(2.20)], [-3.2, ZH(0.85), ZH(2.15)],
              [-5.0, ZH(1.30), ZH(2.10)], [-6.8, ZH(1.50), ZH(2.12)], [-8.6, ZH(1.75), ZH(2.24)], [0.8, ZH(2.22), ZH(2.65)], [-1.2, ZH(2.22), ZH(2.65)]],
      top: [[4.4, 0.60, -3.6, 0.60], [2.6, 0.30, -3.8, 0.30], [0.6, 0.0, 0.6, 1.0], [-2.2, 0.0, -2.2, 1.0], [-3.6, 0.0, -3.6, 0.6]],
      belly: [[5.0, 0.55, -3.0, 0.55], [2.6, 0.0, 2.6, 1.0], [-1.0, 0.0, -1.0, 1.0]],
      box: [[1, 2.30, 2.80, ZH(1.05), ZH(0.80)], [1, -0.80, -1.40, ZH(1.10), ZH(0.75)], [1, -3.6, -4.2, ZH(1.70), ZH(1.40)],
            [1, 0.4, 1.0, ZH(2.55), ZH(2.32)], [1, -1.4, -2.0, ZH(2.55), ZH(2.32)], [1, 4.4, 4.0, ZH(0.95), ZH(0.72)],
            [0, 0.5, -0.4, 0.20, 0.55], [0, -1.6, -2.4, 0.20, 0.55], [3, 1.6, 0.8, 0.30, 0.70]],
      soot: [[-3.45, -6.5, ZH(2.10), ZH(2.95)]], topSoot: [[-3.45, -6.8, 0.45, 1.05]], grime: 0.7
    }, 20202);
    var b;
    g.strokeStyle = "rgba(0,0,0,0.34)"; g.lineWidth = 1;
    for (b = 1; b <= 2; b++) {
      /* the sliding cabin door's outline and the cockpit door's (P13) */
      g.strokeRect(s.u(3.10), s.vz(2.10, b), s.u(-0.65) - s.u(3.10), s.vz(ZH(0.66), b) - s.vz(2.10, b));
      g.beginPath(); g.moveTo(s.u(4.70), s.vz(ZH(0.72), b)); g.lineTo(s.u(3.35), s.vz(ZH(0.72), b)); g.stroke();
    }
  }
  function z20(THREE, M, C) {
    V = THREE;
    var sh = sheet(-11.2, 6.2, 2.4, Z_GROUND, ZH(4.6), 48);
    var B = bins(["skin", "dark", "metal", "glass", "team", "lampR", "lampG"]);
    var G = bins(["leg", "tyre", "dark"]);
    var k, i;
    var secs = Z_FUS.map(function (r) { return sec(r[0], 0, ZH((r[1] + r[2]) / 2), r[3], (r[2] - r[1]) / 2, (r[2] - r[1]) / 2, r[4], r[4]); });
    push(B.skin, loft(secs, 32, 0.32, 0.12));
    /* the chin bulge under the nose (P13 head-on) */
    B.skin.push(sph(0.55, 14, 8, 5.0, 0, ZH(0.92), 1.3, 1.05, 0.55));
    /* windscreen, the cockpit door windows and the cabin windows (P13, P14) */
    B.glass.push(sloft([[[5.12, 0.80, ZH(1.62)], [4.40, 0.98, ZH(2.12)], [4.40, -0.98, ZH(2.12)], [5.12, -0.80, ZH(1.62)]],
                        [[5.08, 0.76, ZH(1.62)], [4.36, 0.94, ZH(2.12)], [4.36, -0.94, ZH(2.12)], [5.08, -0.76, ZH(1.62)]]]));
    [1, -1].forEach(function (sd) {
      var y = sd * 1.19;
      B.glass.push(vplate([[4.6, ZH(1.15)], [3.35, ZH(1.15)], [3.35, ZH(2.02)], [4.25, ZH(2.10)], [4.75, ZH(1.70)]], y * 0.98, 0.02));
      B.glass.push(vplate([[3.00, ZH(1.30)], [2.20, ZH(1.30)], [2.20, ZH(1.95)], [3.00, ZH(1.95)]], y, 0.02));
      [[1.2, 0.5], [0.2, -0.5]].forEach(function (w) {
        B.glass.push(vplate([[w[0], ZH(1.40)], [w[1], ZH(1.40)], [w[1], ZH(1.95)], [w[0], ZH(1.95)]], y, 0.02));
      });
      /* the sliding door's outline and track (P13) */
      B.dark.push(box(0.03, 0.03, 1.55, 1.40, y + sd * 0.01, ZH(1.35)));
      B.dark.push(box(2.3, 0.04, 0.04, 0.25, y + sd * 0.01, ZH(2.12)));
      /* engines either side of the transmission deck, intakes forward, the
         upturned exhaust ducts aft (P13, P14) */
      var ey = sd * 0.78;
      var en = loft([sec(1.05, ey, ZH(2.55), 0.36, 0.36, 0.36), sec(0.6, ey, ZH(2.56), 0.42, 0.40, 0.40),
                     sec(-2.2, ey, ZH(2.58), 0.42, 0.40, 0.40), sec(-2.8, ey, ZH(2.62), 0.36, 0.34, 0.34)], 14, 0, 0);
      B.skin.push(en[0], en[2]); B.dark.push(en[1]);                  /* the intake face dark */
      var ex = loft([sec(-2.75, ey, ZH(2.62), 0.34, 0.33, 0.33), sec(-3.15, ey * 1.08, ZH(2.72), 0.30, 0.30, 0.30),
                     sec(-3.45, ey * 1.15, ZH(2.92), 0.26, 0.28, 0.28, 1, 1, 0.6)], 12, 0, 0);
      B.skin.push(ex[0], ex[1]); B.dark.push(ex[2]);                  /* the exhaust mouth dark */
      /* stabilator at the foot of the pylon (P13, P14) */
      B.skin.push(sloft([foil([-9.35, sd * 0.20, ZH(1.95)], [-10.45, sd * 0.20, ZH(1.95)], 0.14, [0, 0, 1]),
                         foil([-9.55, sd * 2.15, ZH(1.95)], [-10.40, sd * 2.15, ZH(1.95)], 0.08, [0, 0, 1])]));
      /* the team colour: a strip down each side of the tail boom */
      B.team.push(box(1.6, 0.03, 0.22, -6.3, sd * 0.45, ZH(1.86)));
    });
    /* the transmission and engine deck on the roof, the mast (P13) */
    push(B.skin, loft([sec(2.6, 0, ZH(2.22), 0.40, 0.05, 0.05), sec(2.1, 0, ZH(2.35), 0.80, 0.40, 0.15, 0.7, 1),
                       sec(0.8, 0, ZH(2.45), 0.92, 0.50, 0.25, 0.6, 1), sec(-2.0, 0, ZH(2.45), 0.90, 0.45, 0.25, 0.6, 1),
                       sec(-3.8, 0, ZH(2.25), 0.50, 0.15, 0.10, 0.8, 1)], 16, 0, 0));
    B.metal.push(cyl(0.16, 0.18, Z_HUB - 2.9, 12, "z", 0, 0, ZH((Z_HUB + 2.9) / 2)));
    /* the swashplate's stationary ring and its servos (P13) */
    B.metal.push(cyl(0.38, 0.38, 0.07, 20, "z", 0, 0, ZH(Z_HUB - 0.58)));
    [0, 2.1, 4.2].forEach(function (a) { B.metal.push(bar([Math.cos(a) * 0.32, Math.sin(a) * 0.32, ZH(Z_HUB - 0.60)], [Math.cos(a) * 0.36, Math.sin(a) * 0.36, ZH(2.80)], 0.035, 6)); });
    /* the swept tail pylon (P13, P14) and the tail-rotor gearbox fairing */
    B.skin.push(sloft([foil([-8.80, 0, ZH(2.10)], [-10.25, 0, ZH(2.10)], 0.40, [0, 1, 0]),
                       foil([-9.90, 0, ZH(4.20)], [-10.75, 0, ZH(4.20)], 0.26, [0, 1, 0])]));
    B.skin.push(sph(0.24, 10, 8, Z_TRX, -0.14, ZH(Z_TRH), 1.3, 0.8, 1));
    /* gear (fixed, as the S-70's): main legs from the cabin sides, the tail wheel under the boom */
    var MX = 1.75, MY = 1.40;
    [1, -1].forEach(function (sd) {
      wheel(G, 0.32, 0.22, MX, sd * MY, Z_GROUND, 20);
      G.leg.push(bar([MX, sd * (MY - 0.10), ZH(0.32)], [MX - 0.55, sd * 1.12, ZH(0.80)], 0.05, 6));
    });
    wheel(G, 0.20, 0.14, -8.65, 0, Z_GROUND, 14);
    z20Detail(B, G);
    var g = new V.Group();
    var pal = { top: "#4d5148", side: "#4d5148", belly: "#52564d" };
    var cv = paintSheet(sh, pal, [4.6, 3.1, 1.45, -0.9, -2.5, -4.0, -6.0, -8.0], 20020, z20Paint);
    var mats = makeMats(C, cv, pal.side, {
      lampR:  { color: 0xc8261e, roughness: 0.3, metalness: 0.1, emissive: 0x8a1410, emissiveIntensity: 0.6 },
      lampG:  { color: 0x1fa64a, roughness: 0.3, metalness: 0.1, emissive: 0x0e6a2c, emissiveIntensity: 0.6 },
      blade: { color: 0x2e3133, roughness: 0.8, metalness: 0.08 },
      disc:  { color: 0xd6dde3, roughness: 0.4, metalness: 0.08, transparent: true, opacity: 0.05, depthWrite: false }
    });
    flush(g, B, mats, sh);
    var gear = new V.Group(); gear.name = "gear";
    flush(gear, G, mats, null);
    g.add(gear);

    /* main rotor: h60_hawk_family.js's mount (+PI/2 about X points the
       rotor's local +Y up the mast: anti-clockwise from above, as the S-70's
       family turns), the head authored in model axes; FIVE blades (P13, P14) */
    var mnt = new V.Group();
    mnt.position.set(0, 0, ZH(Z_HUB));
    mnt.rotation.x = PI / 2;
    g.add(mnt);
    var rotor = new V.Group(); rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group(); head.rotation.x = -PI / 2;
    rotor.add(head);
    var hub = [cyl(0.42, 0.42, 0.16, 20, "z", 0, 0, 0.0), cyl(0.30, 0.10, 0.22, 16, "z", 0, 0, 0.30), cyl(0.36, 0.36, 0.05, 16, "z", 0, 0, 0.42)];
    var bl = [];
    var LE = Z_CHORD / 4, TE = LE - Z_CHORD;      /* anti-clockwise: leading edge on +Y */
    var BP = [[0.9, TE + 0.05], [0.9, LE - 0.05], [1.3, LE], [Z_R - 0.45, LE], [Z_R, LE - 0.10], [Z_R, TE], [1.3, TE]];
    for (k = 0; k < 5; k++) {
      var a = k * 2 * PI / 5;
      var bg = sloft([BP.map(function (q) { return [q[0], q[1], -0.022]; }), BP.map(function (q) { return [q[0], q[1], 0.022]; })]);
      bg.rotateZ(a); bl.push(bg);
      var arm = [box(0.62, 0.20, 0.12, 0.55, 0, 0), cyl(0.07, 0.07, 0.30, 8, "z", 0.55, 0.16, -0.12)];
      for (i = 0; i < arm.length; i++) { arm[i].rotateZ(a); hub.push(arm[i]); }
      z20Head(hub, bl, k, a);
    }
    /* the swashplate's rotating ring, under the hub on the mast */
    hub.push(cyl(0.40, 0.40, 0.06, 20, "z", 0, 0, -0.50), cyl(0.20, 0.24, 0.20, 12, "z", 0, 0, -0.30));
    flush(head, { metal: hub, blade: bl, disc: [place(new V.CircleGeometry(Z_R, 48), 0, 0, 0.04)] }, mats, null);
    head.children.forEach(function (m) { if (m.name === "disc") m.name = "rotordisc"; });

    /* tail rotor on the starboard side of the pylon, its shaft canted up
       (P13, P14): h60_hawk_family.js's tail mount, local +Z the shaft */
    var tm = new V.Group();
    tm.position.set(Z_TRX, Z_TRY, ZH(Z_TRH));
    tm.rotation.x = PI / 2 - Z_TRC;
    g.add(tm);
    var trot = new V.Group(); trot.name = "tailrotor";
    tm.add(trot);
    var trH = [cyl(0.12, 0.12, 0.18, 12, "z", 0, 0, 0.0), cyl(0.08, 0.02, 0.12, 10, "z", 0, 0, 0.15)], trB = [];
    for (k = 0; k < 4; k++) {
      var tb = box(Z_TRR - 0.20, 0.23, 0.03, 0.20 + (Z_TRR - 0.20) / 2, 0, 0.02);
      tb.rotateX(8 * D2R); tb.rotateZ(k * PI / 2);
      trB.push(tb);
    }
    flush(trot, { metal: trH, blade: trB }, mats, null);
    return g;
  }

  /* ============================================================ Z-9C ==
     asw_helo_c: the Z-9W of pla_z9.js, called as it is, with the Z-9C's
     differences that P15 and P16 show (see the header). */
  function s2l(c) { return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
  function l2s(c) { return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; }
  function hex3(h) { return [parseInt(h.substr(1, 2), 16) / 255, parseInt(h.substr(3, 2), 16) / 255, parseInt(h.substr(5, 2), 16) / 255]; }
  /* take the triangles of a mesh that drop(cx, cy, cz) says to, out */
  function cull(mesh, drop) {
    if (!mesh || !mesh.geometry) return;
    var src = flat(mesh.geometry), p = src.attributes.position.array, n = src.attributes.normal ? src.attributes.normal.array : null;
    var uv = src.attributes.uv ? src.attributes.uv.array : null, P = [], N = [], U = [], t, k;
    for (t = 0; t < p.length; t += 9) {
      if (drop((p[t] + p[t + 3] + p[t + 6]) / 3, (p[t + 1] + p[t + 4] + p[t + 7]) / 3, (p[t + 2] + p[t + 5] + p[t + 8]) / 3)) continue;
      for (k = 0; k < 9; k++) { P.push(p[t + k]); if (n) N.push(n[t + k]); }
      if (uv) for (k = 0; k < 6; k++) U.push(uv[t / 3 * 2 + k]);
    }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(P, 3));
    if (n) g.setAttribute("normal", new V.Float32BufferAttribute(N, 3)); else g.computeVertexNormals();
    if (uv) g.setAttribute("uv", new V.Float32BufferAttribute(U, 2));
    mesh.geometry = g;
  }
  function z9c(THREE, M, C) {
    V = THREE;
    var g = HeroZ9.build(THREE, M, C), byName = {}, kill = [];
    g.children.forEach(function (o) { if (o.isMesh) byName[o.name] = o; });
    /* no HJ-8 tubes and no roof sight on the navy machine (P15, P16) */
    if (byName.stores) kill.push(byName.stores);
    kill.forEach(function (o) { g.remove(o); });
    /* nor the weapons outrigger beams: the stub at the cabin side stays,
       as P16 shows it; the tube end caps and the sight window go too */
    cull(byName.airframe, function (x, y, z) { return Math.abs(y) > 1.17 && x > -1.75 && x < -0.45 && z > -0.95 && z < 0.0; });
    cull(byName.fittings_dark, function (x, y, z) { return Math.abs(y) > 1.3 && x > -1.95 && x < -0.05; });
    cull(byName.glass, function (x, y, z) { return x > 1.9 && x < 2.1 && y > 0.25 && y < 0.47 && z > -0.95 && z < -0.70; });
    /* the PLAN's light grey for the Army's drab olive (P15, P16), the
       canvas kept: its colour scaled in linear light, as deu_us_pattern.js
       repaints a reused hull */
    if (byName.airframe) {
      var m = byName.airframe.material.clone(), a = hex3("#454a35"), b = hex3("#8c9193");
      m.color.setRGB(l2s(s2l(m.color.r) * s2l(b[0]) / s2l(a[0])), l2s(s2l(m.color.g) * s2l(b[1]) / s2l(a[1])), l2s(s2l(m.color.b) * s2l(b[2]) / s2l(a[2])));
      byName.airframe.material = m;
    }
    /* the nose: its tip in the black radome of the search radar (P15, P16) */
    var nx = -1e9, nz = 0, nb = 1e9, ntop = -1e9;
    if (byName.airframe) {
      var p = byName.airframe.geometry.attributes.position.array, i;
      for (i = 0; i < p.length; i += 3) if (p[i] > nx) { nx = p[i]; nz = p[i + 2]; }
      for (i = 0; i < p.length; i += 3) if (p[i] > nx - 0.45 && Math.abs(p[i + 1]) < 0.05) { nb = Math.min(nb, p[i + 2]); ntop = Math.max(ntop, p[i + 2]); }
    }
    var B = bins(["dark", "metal", "glass"]);
    if (nx > -1e8) {
      var hh = Math.max(0.12, (ntop - nb) / 2);
      B.dark.push(sph(1, 16, 10, nx - 0.18, 0, (ntop + nb) / 2, 0.40, hh * 1.18, hh * 1.12));
      /* the sensor turret under the chin (P16) */
      B.dark.push(sph(0.14, 12, 8, nx - 0.55, 0, nb - 0.10));
      B.metal.push(cyl(0.05, 0.05, 0.10, 8, "z", nx - 0.55, 0, nb - 0.01));
    }
    /* the rescue hoist over the starboard door (P16): a post on the roof,
       an arm out to starboard, the winch drum at its end */
    B.metal.push(bar([0.55, -0.62, 0.86], [0.55, -0.66, 1.06], 0.05, 8));
    B.metal.push(bar([0.55, -0.66, 1.04], [0.62, -1.28, 0.98], 0.045, 8));
    B.dark.push(cyl(0.11, 0.11, 0.24, 12, "y", 0.63, -1.33, 0.92));
    B.dark.push(bar([0.63, -1.33, 0.82], [0.63, -1.33, 0.70], 0.02, 6));
    var T = makeMats(C, null, "#000000");
    flush(g, B, T, null);
    return g;
  }

  function variant(fn, VT, k) { return function (THREE, M, C) { return fn(THREE, M, C, VT[k]); }; }
  return {
    j15: j15,
    j16sead: variant(j16, J16_VARIANTS, "sead"),
    j16d: variant(j16, J16_VARIANTS, "ewd"),
    j35: j35,
    h6n: h6n,
    yy20: yy20,
    z20: z20,
    z9c: z9c
  };
})();

/* len is each build's MEASURED X extent */
/* the J-15 and Z-9C call HeroSu33 / HeroZ9: registered only where those are loaded */
if (typeof HeroSu33 !== "undefined") UNIT_MODELS["cfighter_c"] = { len: 21.93, build: HeroPlaAirModern.j15 };
UNIT_MODELS["sead_c"] = { len: 21.93, build: HeroPlaAirModern.j16sead };
UNIT_MODELS["ew_c"] = { len: 21.93, build: HeroPlaAirModern.j16d };
UNIT_MODELS["cstealth_c"] = { len: 17.25, build: HeroPlaAirModern.j35 };
UNIT_MODELS["sbomber_c"] = { len: 35.48, build: HeroPlaAirModern.h6n };
UNIT_MODELS["tanker_c"] = { len: 47.0, build: HeroPlaAirModern.yy20 };
UNIT_MODELS["trans_c"] = { len: 19.79, build: HeroPlaAirModern.z20 };
if (typeof HeroZ9 !== "undefined") UNIT_MODELS["asw_helo_c"] = { len: 13.76, build: HeroPlaAirModern.z9c };
