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
    var B = bins(["skin", "dark", "metal", "glass", "team", "store", "nozzle"]);
    var G = bins(["leg", "tyre", "dark"]);
    j16Body(B, VR);
    j16Wings(B, VR);
    j16Tail(B);
    j16Gear(G);
    j16Stores(B, VR);
    var pal = { top: "#8a9196", side: "#8a9196", belly: "#92989c" };
    var cv = paintSheet(sh, pal, [FX(3.05), FX(4.1), FX(6.0), FX(8.5), FX(10.4), FX(12.4), FX(14.6), FX(16.3), FX(18.7)], 61601,
      function (g, s) {
        /* the radome joint and the anti-glare panel ahead of the windscreen */
        g.fillStyle = "rgba(0,0,0,0.10)";
        g.fillRect(s.u(FX(3.05)) - 1, 0, 2, s.H);
        g.fillStyle = "#5d6468";
        g.beginPath(); g.moveTo(s.u(FX(3.3)), s.vy(0.25, 0)); g.lineTo(s.u(FX(4.1)), s.vy(0.5, 0));
        g.lineTo(s.u(FX(4.1)), s.vy(-0.5, 0)); g.lineTo(s.u(FX(3.3)), s.vy(-0.25, 0)); g.closePath(); g.fill();
      });
    var mats = makeMats(C, cv, pal.side, {
      store:  { color: 0xb9bcbc, roughness: 0.6, metalness: 0.15 },
      nozzle: { color: 0x5e5446, roughness: 0.42, metalness: 0.60 }
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
  function j35(THREE, M, C) {
    V = THREE;
    var sh = sheet(-8.9, 8.9, 6.0, J_GROUND, 3.0, 30);
    var B = bins(["skin", "dark", "glass", "team", "nozzle", "radome"]);
    var G = bins(["leg", "tyre", "dark"]);
    var i;
    /* the fuselage: one loft, chined superellipses */
    push(B.skin, loft([[1.2, 0.495, 0.47, -0.39, -0.01]].concat(J_BODY.filter(function (r) { return r[0] > 1.2; })).map(function (r) {
      return sec(JX(r[0]), 0, r[4], r[1], r[2] - r[4], r[4] - r[3], 0.78, 0.72);
    }), 20, null, 0.30));
    /* the radome, lighter grey (J, P7), to the first joint at 1.2 m */
    push(B.radome, loft(J_BODY.filter(function (r) { return r[0] <= 1.2; }).concat([[1.2, 0.495, 0.47, -0.39, -0.01]]).map(function (r) {
      return sec(JX(r[0]), 0, r[4], r[1], r[2] - r[4], r[4] - r[3], 0.82, 0.78);
    }), 20, 0.25, null));
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
      /* team colour: a modest strip on each upper outer wing */
      var y0 = 3.9, y1 = 4.6, z0 = jwH(y0) + jwT(y0) / 2 + 0.012, z1 = jwH(y1) + jwT(y1) / 2 + 0.012;
      var e0 = tab(J_WING, y0, 2) - 0.9, e1 = tab(J_WING, y1, 2) - 0.9;
      B.team.push(sloft([[[JX(e0), sd * y0, z0], [JX(e0 + 0.45), sd * y0, z0], [JX(e1 + 0.45), sd * y1, z1], [JX(e1), sd * y1, z1]],
                         [[JX(e0), sd * y0, z0 + 0.02], [JX(e0 + 0.45), sd * y0, z0 + 0.02], [JX(e1 + 0.45), sd * y1, z1 + 0.02], [JX(e1), sd * y1, z1 + 0.02]]]));
    });
    /* the flat tail between the nozzles, out to 17.25 m (J side and plan) */
    B.skin.push(plate([[JX(15.4), 0.45], [JX(17.25), 0.12], [JX(17.25), -0.12], [JX(15.4), -0.45]], -0.05, 0.08));
    /* gear: twin nose wheels on a long leg (P7), single mains */
    [0.15, -0.15].forEach(function (y) { wheel(G, 0.26, 0.15, JX(3.5), y, J_GROUND, 14); });
    G.leg.push(bar([JX(3.5), 0, J_GROUND + 0.26], [JX(3.35), 0, -0.72], 0.07, 8));
    G.leg.push(bar([JX(3.5), 0, J_GROUND + 0.70], [JX(4.2), 0, -0.75], 0.035, 6));
    [1, -1].forEach(function (sd) {
      wheel(G, 0.40, 0.26, JX(10.2), sd * 1.55, J_GROUND, 16);
      G.leg.push(bar([JX(10.2), sd * 1.42, J_GROUND + 0.40], [JX(10.0), sd * 1.30, -0.70], 0.08, 8));
      G.leg.push(bar([JX(10.2), sd * 1.42, J_GROUND + 0.75], [JX(9.3), sd * 1.20, -0.75], 0.04, 6));
      G.dark.push(box(1.4, 0.03, 0.55, JX(10.0), sd * 1.05, -1.02));
    });
    var pal = { top: "#9da2a5", side: "#9da2a5", belly: "#a3a8ab" };
    var cv = paintSheet(sh, pal, [JX(1.2), JX(2.3), JX(5.0), JX(8.2), JX(10.4), JX(12.8), JX(14.6)], 35001, function (g, s) {
      /* the bay doors' saw-toothed outlines under the body (J plan) */
      g.strokeStyle = "rgba(0,0,0,0.25)"; g.lineWidth = 1;
      [[8.4, 11.8, 0.25, 0.95], [8.4, 11.8, -0.95, -0.25]].forEach(function (d) {
        g.strokeRect(s.u(JX(d[0])), s.vy(d[3], 3), s.u(JX(d[1])) - s.u(JX(d[0])), s.vy(d[2], 3) - s.vy(d[3], 3));
      });
    });
    var mats = makeMats(C, cv, pal.side, {
      nozzle: { color: 0x4d4a46, roughness: 0.5, metalness: 0.5 },
      radome: { color: 0xb3b7b9, roughness: 0.6, metalness: 0.05 }
    });
    var root = new V.Group();
    flush(root, B, mats, sh);
    var gear = new V.Group(); gear.name = "gear";
    flush(gear, G, mats, null);
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
  function h6n(THREE, M, C) {
    V = THREE;
    var sh = sheet(-17.6, 18.6, 17.0, H_GROUND, 7.0, 14);
    var B = bins(["skin", "dark", "metal", "glass", "team", "radome", "nozzle"]);
    var G = bins(["leg", "tyre", "dark"]);
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
    var cv = paintSheet(sh, pal, [HX(2.2), HX(5.6), HX(9.0), HX(12.5), HX(16.0), HX(20.0), HX(24.0), HX(28.0), HX(31.5)], 60602, null);
    var mats = makeMats(C, cv, pal.side, {
      radome: { color: 0x2b2f33, roughness: 0.55, metalness: 0.1 },
      nozzle: { color: 0x55524d, roughness: 0.45, metalness: 0.55 }
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
  function yy20(THREE, M, C) {
    V = THREE;
    var sh = sheet(-24.0, 24.0, 25.5, -4.1, 11.0, 12);
    var B = bins(["skin", "dark", "metal", "glass", "team", "nozzle", "store"]);
    var G = bins(["leg", "tyre", "dark"]);
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
    var pal = { top: "#646a70", side: "#646a70", belly: "#6a7076" };
    var cv = paintSheet(sh, pal, [YX(3.0), YX(7.0), YX(11.0), YX(15.0), YX(19.0), YX(23.0), YX(27.0), YX(31.0), YX(35.0), YX(39.0)], 20848, function (g, s) {
      /* the crew door on the port side, the ramp's hinge lines (P10) */
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1;
      g.strokeRect(s.u(YX(9.1)), s.vz(YZ(3.9), 1), s.u(YX(10.0)) - s.u(YX(9.1)), s.vz(YZ(2.0), 1) - s.vz(YZ(3.9), 1));
      [1, 2].forEach(function (b) { g.beginPath(); g.moveTo(s.u(YX(31.0)), s.vz(YZ(3.0), b)); g.lineTo(s.u(YX(39.5)), s.vz(YZ(6.6), b)); g.stroke(); });
    });
    var mats = makeMats(C, cv, pal.side, {
      nozzle: { color: 0x4f4c48, roughness: 0.5, metalness: 0.5 },
      store:  { color: 0x6e7479, roughness: 0.7, metalness: 0.1 }
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
  function z20(THREE, M, C) {
    V = THREE;
    var sh = sheet(-11.2, 6.2, 2.4, Z_GROUND, ZH(4.6), 48);
    var B = bins(["skin", "dark", "metal", "glass", "team"]);
    var G = bins(["leg", "tyre", "dark"]);
    var k, i;
    var secs = Z_FUS.map(function (r) { return sec(r[0], 0, ZH((r[1] + r[2]) / 2), r[3], (r[2] - r[1]) / 2, (r[2] - r[1]) / 2, r[4], r[4]); });
    push(B.skin, loft(secs, 24, 0.32, 0.12));
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
    /* the swept tail pylon (P13, P14) and the tail-rotor gearbox fairing */
    B.skin.push(sloft([foil([-8.80, 0, ZH(2.10)], [-10.25, 0, ZH(2.10)], 0.40, [0, 1, 0]),
                       foil([-9.90, 0, ZH(4.20)], [-10.75, 0, ZH(4.20)], 0.26, [0, 1, 0])]));
    B.skin.push(sph(0.24, 10, 8, Z_TRX, -0.14, ZH(Z_TRH), 1.3, 0.8, 1));
    /* gear (fixed, as the S-70's): main legs from the cabin sides, the tail wheel under the boom */
    var MX = 1.75, MY = 1.40;
    [1, -1].forEach(function (sd) {
      wheel(G, 0.32, 0.22, MX, sd * MY, Z_GROUND, 16);
      G.leg.push(bar([MX, sd * (MY - 0.10), ZH(0.32)], [MX + 0.35, sd * 1.10, ZH(0.95)], 0.07, 8));
      G.leg.push(bar([MX, sd * (MY - 0.10), ZH(0.32)], [MX - 0.55, sd * 1.12, ZH(0.80)], 0.05, 6));
    });
    wheel(G, 0.20, 0.14, -8.65, 0, Z_GROUND, 12);
    G.leg.push(bar([-8.65, 0, ZH(0.2)], [-8.40, 0, ZH(1.80)], 0.06, 8));
    var g = new V.Group();
    var pal = { top: "#4d5148", side: "#4d5148", belly: "#52564d" };
    var cv = paintSheet(sh, pal, [4.6, 3.1, 1.45, -0.9, -2.5, -4.0, -6.0, -8.0], 20020, null);
    var mats = makeMats(C, cv, pal.side, {
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
    }
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
