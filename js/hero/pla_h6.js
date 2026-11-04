/* ============ pla_h6.js - HERO models: the Xian H-6 family (PLA) ============
   One builder, h6(), with a VARIANTS table; four rows. Model space for all:
   +X nose, +Y left (port), +Z up, metres. No national markings, serials or
   bort numbers anywhere: plain paint, the team colour (exactly C.team) in a
   small strip on each upper wingtip.

   KEYS REGISTERED (at the foot; rows in js/heavyair.js and js/eras.js)
     pla_e60_heavybomber  H-6A, 1969            h6a: HeroTu16Z.plain CALLED (ru_tu16.js)
     pla_e80_heavybomber  H-6D with two YJ-6    h6d: HeroTu16Z.plain CALLED - see NOT DRAWN
     pla_e90_tanker       HY-6U (H-6U)          h6u: built here; REPLACES ru_tu16.js's
                                                     stand-in (the Tu-16Z drawn plain)
     pla_e00_heavybomber  H-6K with KD-20       h6k: built here
   LOAD AFTER: js/hero/ru_tu16.js (HeroTu16Z, and its own pla_e90_tanker
   registration, which this file overrides). The two Tu-16-based keys are
   registered only where HeroTu16Z is loaded.

   REUSE (AGENT_POLICY rule 5), and why the rest is built here
     - H-6A / H-6D: the H-6 is the Tu-16 built under licence (en.wikipedia
       "Xian H-6"); ru_tu16.js draws the Tu-16 with the glazed nose, the RBP-4
       chin radome, the three turrets, the tail position and the AM-3 (WP-8)
       nacelles, and has a plain() option. It is called as it is.
     - H-6U / H-6K: ru_tu16.js merges the glazed nose, the turrets, the tail
       guns and the AM-3 intakes into its skin, glass and metal meshes, with
       no option to leave them off (as pla_air_modern.js found for the H-6N),
       so these two are built here. pla_air_modern.js's H-6N builder does
       NOT export its airframe tables or its kit, so both are COPIED into
       this file (the kit block and the tables block say so): the H-6N's
       fuselage, wing, tailplane, fin, gear pods, fences, gear, its D-30
       nacelles and flight deck (for the H-6K), all measured there off
       drawing T. Neither module is edited.

   REFERENCES (Wikimedia Commons, fetched for this file at 1280 px with the
   commons thumb.php route; cached in scratchpad/q_h6_ref; en.wikipedia
   "Xian H-6" for the figures and the variant notes)
     T    "Tupolev Tu-16.svg" (1600 px, pla_air_modern.js's drawing T; cached in
          scratchpad/q_plaair_ref/tu16_svg.png): side, plan and front, 34.25
          px/m. Measured again for this file off its side view: the glazed
          nose's outline (crown/keel 0.42/-0.51 m at 0.7 m aft of the tip,
          0.54/-0.77 at 1.23, 0.63/-0.89 at 2.1 - within 0.05 m of the H-6N
          nose rows copied here, so they serve the H-6U's metal cone); the
          windscreen from 1.96 to 2.48 m; the side panes 2.60-3.56 and
          3.70-4.35 m, 0.42 to 0.95 m over the axis; the AM-3 (WP-8) intake
          lip 9.26 m aft of the nose, 1.28 m tall, centred on the axis.
     P-K1 "H-6K landing (cropped).jpg" (Zhuhai 2018) - H-6K from port, low:
          the black radome with a RAKED joint (2.8 m aft of the tip at the
          crown, 1.8 m at the keel, at 35 px/m off the 2.4 m fuselage depth),
          the small flight-deck windows, a light sensor ball under the keel
          2.5 m aft of the tip (about 0.44 m), the big D-30 intakes, a dorsal
          dome behind the wing root, the tail cone without guns, white cruise
          missiles (one about 6.0 m by 0.6 m at 31 px/m) on underwing pylons.
     P-K2 "H-6K 20211 20151127.jpg" (Japan MoD) - H-6K side-on in flight,
          clean: three wedge pylons under each wing, 2.0 m apart along x, each
          about 1.6 m long and 0.45 m deep (33.3 px/m on the 34.3 m length).
     P-K3 "PLAAF H-6K 20231214.jpg" - H-6K from port in flight, clean: the
          same nose, nacelles, dome and tail; light grey.
     P-U1 "H-6 ravitaillement.jpg" (en.wikipedia: "under-wing aerial
          refuelling pods fitted to the HY-6U tanker variant (2008)") - one
          pod close-up, side-on: blunt both ends, 2.3 times as long as deep, a
          two-blade ram-air turbine on the nose, a tall raked pylon; the wing
          over it natural metal, the pod grey.
     P-A1 "Xian H-6A, China - Air Force JP7552070.jpg" - H-6A from below: the
          glazed nose, the chin radome, the nacelles, the gear pods - as
          ru_tu16.js draws them; cream-white paint.
     P-A2 "Xian H-6 bombers, China Aviation Museum.jpg", P-A3 "Xi`an H6
          (2881008787).jpg", P-A4 "Tupolew Tu-16 (Chinese H-6-B-6)
          (36902206732).jpg", P-A5 "Iraqi Tu-16.jpg" (en.wikipedia: "Xi'an H-6
          bombers at the Chinese Aviation Museum") - museum H-6s: natural
          metal, the glazed nose, chin radome, AM-3 intakes, dorsal turret.
     Published (en.wikipedia "Xian H-6"): length 34.8 m, span 33.0 m, height
     10.36 m. H-6K first flight 5 January 2007, service October 2009, D-30KP
     turbofans with "larger air intakes", the glazed station replaced by a
     radome, "smaller/fewer transparencies", six underwing hardpoints, the
     tail guns replaced by electronics, an EO system under the nose. HY-6U:
     "PV-23 fire control system and Type 244 radar deleted", "a metal nose
     cone" (the HY-6D keeps the glass nose). H-6D: "two air-launched C-601
     missiles, one mounted under each wing; fitted with larger radome under
     the nose".

   MEASURED (X extent x span x height) against published 34.8 x 33.0 x 10.36
     H-6A, H-6D   34.81 x 32.98 x 10.35  (ru_tu16.js's own; its drawing A)
     H-6U, H-6K   34.40 x 32.98 x  9.67  (drawing T, as pla_air_modern.js's
                  H-6N; T's tail ends at 34.3-34.4 m, its ground line gives
                  9.67 m to the fin tip - not fitted; ru_tu16.js read 10.33 m
                  off its other drawing, and the published 34.8 m includes the
                  tail guns, which these two do not have)

   RECOGNITION (each drawn)
     H-6A: as ru_tu16.js (glazed nose, chin radome, canopy, three turrets,
       tail position, AM-3 nacelles in the wing roots, gear pods, fences).
     H-6D: the same airframe (see NOT DRAWN).
     H-6U: the H-6 airframe (T); the metal nose cone in place of the glazing,
       no chin radome, no turrets (en.wikipedia); the Tu-16's own flight-deck
       glazing (T); the WP-8 intakes and nacelles (T, ru_tu16.js); a hose-drum
       pod with its RAT on a raked pylon under each outer wing (P-U1);
       natural metal, grey pods (P-U1).
     H-6K: the black radome with the raked joint, the small windows on the
       raised flight deck, the EO ball under the keel, the D-30 nacelles with
       the big intakes, the dorsal dome, the gun-less tail cone (P-K1..3);
       three wedge pylons a side (P-K2) carrying the row's KD-20s (P-K1);
       no refuelling probe and no belly recess (that is the H-6N).

   NOT DRAWN (AGENT_POLICY rule 1: no photograph or drawing found)
     - H-6D: its big search radome and its two C-601 / YJ-6 on underwing
       pylons. No photograph or drawing of an H-6D (or the export B-6D) is on
       Commons or en.wikipedia (searched: "Xian H-6D", 'intitle:"H-6D"', "H-6
       C-601 missile", "PLANAF H-6" (only H-6J), "C-601 Silkworm", "YJ-6
       anti-ship missile" (museum missiles only), "Xian H-6G", "H-6 naval
       bomber radome", "Xian H-6 bomber museum", the "Silkworm (missile)" and
       PLANAF articles' images). The row is drawn as the plain H-6 airframe
       until one turns up; the variant entry is where to add them.

   NOT CONFIRMED (judgement, not measured or published)
     - H-6U: no photograph of a whole HY-6U was found. The metal cone, the
       deleted chin radome and the deleted turrets and tail position follow
       en.wikipedia's text, not a picture: the cone is drawn on T's glazed
       nose outline, and the tail on the H-6N's gun-less cone. The pod's size
       (2.5 x 1.0 m, scaled by the wing's depth over the pylon, an upper bound
       in P-U1) and its station across the span (y = 10.2 m); the RAT drawn
       dark, not P-U1's red.
     - H-6K: the pylon stations across the span (3.9, 6.6, 9.3 m: P-K2's
       2.0 m spacing along x, placed clear of the nacelle and the gear pod);
       a KD-20 on all six (P-K1 shows a mixed load of white and grey stores);
       the missile's tail fins; the EO ball's mount; the radome's tone.
     - H-6A: the paint - ru_tu16.js's natural metal, as the museum H-6s
       (P-A2..A5); P-A1's H-6A is cream-white.
     - The WP-8 nacelles: ru_tu16.js's can radii and outward cant, moved to
       T's lip station.

   NODES: "gear" on every row (ru_tu16.js's own on h6a / h6d).
   MATERIALS (h6u / h6k): skin (one canvas per build), dark, metal, glass,
   team, radome, nozzle, store, and in "gear" leg, tyre, dark. ASCII only.
   ============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPlaH6 = (function () {
  "use strict";

  /* ---- the KIT below (to wheel()) is COPIED from js/hero/pla_air_modern.js, which
     does not export it; unchanged. ---- */
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


  /* ================================================ the airframe tables ==
     COPIED from js/hero/pla_air_modern.js (the H-6N section, h6n()), which
     does not export them. Drawing T units: s metres aft of the nose, y off
     the centreline (T's plan x1.054 to the published 33.0 m span), h above
     the fuselage axis. X = 17.3 - s; the ground at z = -3.04 (T's ground
     line). Only the nose rows of H_FUS are the H-6N's own (P9 of that file);
     they agree with drawing T's own nose outline to 0.05 m (measured for
     this file, see the header), so they serve the H-6U's metal cone too. */
  var H_XN = 17.3, H_GROUND = -3.04;
  function HX(s) { return H_XN - s; }
  /* [s, half-width, crown, keel] */
  var H_FUS = [
    [0.30, 0.22, 0.20, -0.30], [0.70, 0.37, 0.38, -0.55], [1.40, 0.58, 0.52, -0.84], [2.10, 0.71, 0.62, -1.00],
    [2.80, 0.80, 0.82, -1.12], [3.50, 0.89, 1.05, -1.20], [4.20, 0.95, 1.18, -1.20], [4.90, 1.02, 1.20, -1.20],
    [5.60, 1.05, 1.20, -1.20], [12.0, 1.05, 1.20, -1.20], [20.0, 1.05, 1.20, -1.20], [22.5, 1.00, 1.20, -1.15],
    [25.2, 0.78, 1.15, -1.05], [26.6, 0.72, 1.10, -0.88], [28.0, 0.66, 1.05, -0.74], [29.8, 0.60, 0.98, -0.61],
    [31.3, 0.52, 0.90, -0.47], [32.8, 0.40, 0.75, -0.29], [33.6, 0.28, 0.55, -0.12], [34.1, 0.13, 0.34, 0.04]
  ];
  /* wing [y, LE s, TE s] and tailplane */
  var H_WING = [[1.10, 9.30, 18.0], [3.08, 11.80, 18.2], [5.85, 14.10, 19.21], [7.69, 15.50, 20.12], [9.54, 16.82, 21.02],
                [11.38, 18.10, 21.96], [13.23, 19.36, 22.89], [15.08, 20.61, 23.82], [16.49, 21.62, 24.42]];
  var H_TP = [[0.50, 28.20, 33.90], [1.94, 29.40, 33.95], [4.09, 30.80, 34.10], [5.69, 33.55, 34.40]];
  function hwH(y) { return 0.25 - Math.max(0, y - 1.1) * Math.tan(3 * D2R); }
  function hwT(y) { return 0.95 - (y - 1.1) / 15.4 * 0.62; }
  /* the wing's underside at y, and the fuselage section at s */
  function hwLow(y) { return hwH(y) - hwT(y) / 2; }
  function fusSec(s) { return { w: tab(H_FUS, s, 1), top: tab(H_FUS, s, 2), bot: tab(H_FUS, s, 3) }; }

  /* ===================================================== the variants ==
     base "tu16": js/hero/ru_tu16.js's Tu-16 drawn plain (HeroTu16Z.plain),
       called as it is (AGENT_POLICY rule 5), with this file's additions in
       ITS frame (X = 17.4 - d, the ground at z = -3.35).
     base "t": built here on the tables above. */
  var VARIANTS = {
    h6a: { base: "tu16" },
    h6d: { base: "tu16" },        /* the radome and the C-601s: no reference */
    h6u: { base: "t", nose: "metal", cockpit: "old", nacelle: "wp8", hosePods: true, tail: "cone",
           pal: { top: "#bcc0c2", side: "#bcc0c2", belly: "#c2c5c7" }, storeCol: 0x8e9396 },
    h6k: { base: "t", nose: "radome", cockpit: "new", nacelle: "d30", pylons: true, stores: true, tail: "cone" }
  };

  /* a patch on the fuselage skin (glazing): s0..s1 along, t0..t1 round
     the section (0 = port beam, PI/2 = crown, as ringOf), off metres proud */
  function fusPt(s, t, off) {
    var f = fusSec(s), zc = (f.top + f.bot) / 2, hh = (f.top - f.bot) / 2;
    var c = Math.cos(t), sn = Math.sin(t);
    return [HX(s), (f.w + off) * c, zc + (hh + off) * sn];
  }
  /* the angle round the section at s where the skin is z over the axis */
  function tOfZ(s, z) {
    var f = fusSec(s), zc = (f.top + f.bot) / 2, hh = (f.top - f.bot) / 2;
    return Math.asin(clamp((z - zc) / hh, -1, 1));
  }
  function fusPatch(list, s0, s1, t0, t1, off, ns, nt) {
    /* a closed slab: the outer arc off metres proud, the inner one sunk
       0.05 m into the skin, one section per step along s */
    var S = [], i, j;
    for (i = 0; i <= ns; i++) {
      var s = lerp(s0, s1, i / ns), ring = [];
      for (j = 0; j <= nt; j++) ring.push(fusPt(s, lerp(t0, t1, j / nt), off));
      for (j = nt; j >= 0; j--) ring.push(fusPt(s, lerp(t0, t1, j / nt), -0.05));
      S.push(ring);
    }
    list.push(sloft(S));
  }
  /* a round store along x: prof [[s, r], ...] nose first, in the T frame */
  function storeT(list, prof, y, z, n) { push(list, lathe(prof.map(function (q) { return [HX(q[0]), q[1]]; }), y, z, n || 12)); }
  /* four tail fins (x) or two wings (+) on a store, flat plates */
  function finsT(list, s0, s1, sTip, y, z, r, span, k0, nk) {
    var k;
    for (k = 0; k < nk; k++) {
      var a = k0 + k * 2 * PI / nk, cy = Math.cos(a), cz = Math.sin(a), ny = -cz * 0.012, nz = cy * 0.012;
      var P = [[HX(s0), y + cy * r, z + cz * r], [HX(s1), y + cy * r, z + cz * r], [HX(sTip + 0.15), y + cy * span, z + cz * span], [HX(sTip), y + cy * span, z + cz * span]];
      list.push(sloft([P.map(function (q) { return [q[0], q[1] - ny, q[2] - nz]; }), P.map(function (q) { return [q[0], q[1] + ny, q[2] + nz]; })]));
    }
  }

  /* ====================================================== base "t" == */
  function buildT(v, C) {
    var sh = sheet(-17.6, 18.6, 17.0, H_GROUND, 7.0, 14);
    var B = bins(["skin", "dark", "metal", "glass", "team", "radome", "nozzle", "store"]);
    var G = bins(["leg", "tyre", "dark"]);
    /* fuselage: one loft; the H-6K's nose is radome (P-K1), the H-6U's
       is the metal cone that replaced the glazing (P-U1, en.wikipedia) */
    var secs = H_FUS.map(function (r) { return sec(HX(r[0]), 0, (r[2] + r[3]) / 2, r[1], (r[2] - r[3]) / 2, (r[2] - r[3]) / 2, 1, 1); });
    if (v.nose === "radome") {
      /* the H-6K's black radome runs back to a raked joint, 2.55 m aft of
         the nose at the crown and 1.65 m at the keel (P-K1: 2.8 and 1.8 m) */
      var j = sec(HX(2.10), 0, secs[3].zc, secs[3].w, secs[3].hu, secs[3].hl, 1, 1, -0.55);
      push(B.skin, loft([j].concat(secs.slice(4)), 24, null, 0.18));
      push(B.radome, loft(secs.slice(0, 3).concat([j]), 24, 0.30, null));
    } else {
      push(B.skin, loft(secs, 24, 0.30, 0.18));
    }
    if (v.cockpit === "new") {
      /* the H-6K's flight deck: pla_air_modern.js's H-6N hump and windows */
      push(B.skin, loft([sec(HX(2.3), 0, 0.70, 0.30, 0.10, 0.10, 1, 1), sec(HX(3.0), 0, 0.98, 0.62, 0.30, 0.20, 0.9, 1),
                         sec(HX(4.0), 0, 1.15, 0.78, 0.33, 0.20, 0.8, 1), sec(HX(5.2), 0, 1.17, 0.80, 0.25, 0.20, 0.8, 1),
                         sec(HX(6.4), 0, 1.15, 0.70, 0.06, 0.06, 1, 1)], 16, 0, 0.3));
      [1, -1].forEach(function (sd) {
        B.glass.push(sloft([[[HX(2.95), sd * 0.55, 1.08], [HX(3.9), sd * 0.74, 1.28], [HX(4.6), sd * 0.78, 1.28], [HX(4.6), sd * 0.78, 1.12], [HX(3.9), sd * 0.74, 1.10], [HX(3.05), sd * 0.56, 0.96]],
                            [[HX(2.95), sd * 0.53, 1.08], [HX(3.9), sd * 0.72, 1.28], [HX(4.6), sd * 0.76, 1.28], [HX(4.6), sd * 0.76, 1.12], [HX(3.9), sd * 0.72, 1.10], [HX(3.05), sd * 0.54, 0.96]]]));
      });
      B.glass.push(sloft([[[HX(2.70), 0.45, 1.00], [HX(3.15), 0.52, 1.30], [HX(3.15), -0.52, 1.30], [HX(2.70), -0.45, 1.00]],
                          [[HX(2.66), 0.45, 1.00], [HX(3.11), 0.52, 1.30], [HX(3.11), -0.52, 1.30], [HX(2.66), -0.45, 1.00]]]));
    } else {
      /* the Tu-16's own flight deck, kept on the H-6U (P-U2): drawing T's
         windscreen from 1.96 to 2.48 m on the crown, the side panes 2.60 to
         3.50 and 3.66 to 4.36 m between 0.42 and 0.95 m over the axis, the
         roof glazing. PAINTED on the skin canvas (see paintDeck): panes
         this close to the skin z-fight as geometry */
      v = Object.assign({ paintDeck: true }, v);
      /* and as thin glass on the skin, which the sheets can show */
      [1, -1].forEach(function (sd) {
        [[2.62, 3.50], [3.66, 4.36]].forEach(function (w) {
          var t0 = tOfZ(w[0], 0.42), t1 = tOfZ(w[0], 0.95);
          if (sd < 0) { t0 = PI - t0; t1 = PI - t1; }
          fusPatch(B.glass, w[0], w[1], Math.min(t0, t1), Math.max(t0, t1), 0.06, 4, 4);
        });
      });
      fusPatch(B.glass, 1.98, 2.58, 1.05, PI - 1.05, 0.06, 4, 6);
    }
    /* the tail: the gunner's position faired over in a cone with a dark
       tip (P-K1, P-U1; en.wikipedia: the H-6K's tail guns replaced by
       electronics) - the H-6N's own fairing */
    B.radome.push(sph(0.20, 12, 8, HX(34.12), 0, 0.10, 1.4, 1, 1));
    [1, -1].forEach(function (sd) {
      /* the wing: one loft, 3 deg anhedral (T front) */
      B.skin.push(sloft(H_WING.map(function (r) {
        return foil([HX(r[1]), sd * r[0], hwH(r[0])], [HX(r[2]), sd * r[0], hwH(r[0])], hwT(r[0]), [0, 0, 1]);
      })));
      [7.2, 10.6].forEach(function (y) {
        var le = tab(H_WING, y, 1), te = tab(H_WING, y, 2), h = hwH(y) + hwT(y) / 2;
        B.metal.push(vplate([[HX(le - 0.1), h - 0.1], [HX(te - 0.4), h - 0.05], [HX(te - 0.4), h + 0.05], [HX(le + 1.0), h + 0.30], [HX(le - 0.1), h + 0.05]], sd * y, 0.03));
      });
      var ny, nz = -0.15;
      if (v.nacelle === "d30") {
        /* the D-30KP-2 nacelles with the big intakes: the H-6N's (P-K1, P-K2) */
        ny = sd * 1.90;
        push(B.skin, loft([sec(HX(9.6), ny, nz, 0.86, 0.86, 0.86), sec(HX(10.6), ny, nz, 0.95, 0.95, 0.95),
                           sec(HX(13.0), ny, nz, 0.98, 0.98, 0.98), sec(HX(18.0), ny, nz, 0.95, 0.95, 0.95),
                           sec(HX(20.6), ny, nz, 0.84, 0.84, 0.84)], 18, null, null));
        B.dark.push(cyl(0.80, 0.80, 0.06, 18, "x", HX(9.75), ny, nz));
        B.metal.push(cyl(0.60, 0.60, 0.3, 14, "x", HX(9.85), ny, nz));
        B.nozzle.push(cyl(0.84, 0.74, 0.70, 18, "x", HX(20.95), ny, nz, true));
        B.dark.push(cyl(0.68, 0.68, 0.05, 16, "x", HX(21.1), ny, nz));
      } else {
        /* the WP-8 (AM-3) nacelles: drawing T's intake, its lip 9.26 m aft
           of the nose, 1.28 m tall, the centre on the axis (measured for
           this file); the can and nozzle as ru_tu16.js's (its drawing A:
           radius 0.66 at the lip, 0.88 at the widest, centre 1.80 to 1.97 m
           out, the nozzle at 20.6 m) */
        var E = [[9.26, 0.64], [9.50, 0.73], [9.95, 0.80], [10.9, 0.86], [13.0, 0.88], [15.7, 0.85], [17.8, 0.76], [19.4, 0.63], [20.6, 0.54]];
        var es = E.map(function (r) {
          var f = clamp((r[0] - 9.26) / 11.34, 0, 1);
          return sec(HX(r[0]), sd * (1.80 + 0.17 * f * f), -0.04 + 0.05 * f, r[1], r[1], r[1]);
        });
        push(B.skin, loft(es, 20, null, null));
        ny = sd * 1.80;
        B.dark.push(cyl(0.62, 0.62, 0.04, 18, "x", HX(9.40), ny, -0.04));
        B.metal.push(cyl(0.66, 0.64, 0.08, 18, "x", HX(9.27), ny, -0.04, true));
        B.nozzle.push(cyl(0.54, 0.50, 0.30, 16, "x", HX(20.72), sd * 1.97, 0.01, true));
        B.dark.push(cyl(0.48, 0.48, 0.04, 16, "x", HX(20.7), sd * 1.97, 0.01));
      }
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
      if (v.hosePods) hosePod(B, sd);
      if (v.pylons) k6Pylons(B, sd, v.stores);
    });
    /* the fin and its dorsal fillet (T side) */
    B.skin.push(sloft([foil([HX(24.3), 0, 1.0], [HX(34.0), 0, 1.0], 0.55, [0, 1, 0]),
                       foil([HX(28.0), 0, 2.70], [HX(34.15), 0, 2.70], 0.40, [0, 1, 0]),
                       foil([HX(32.4), 0, 6.63], [HX(34.2), 0, 6.63], 0.12, [0, 1, 0])]));
    if (v.nose === "radome") k6Nose(B);
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
    var pal = v.pal || { top: "#b2b7ba", side: "#b2b7ba", belly: "#b8bdc0" };
    var cv = paintSheet(sh, pal, [HX(2.2), HX(5.6), HX(9.0), HX(12.5), HX(16.0), HX(20.0), HX(24.0), HX(28.0), HX(31.5)], 60606,
                        v.paintDeck ? paintDeck : null);
    var mats = makeMats(C, cv, pal.side, {
      radome: { color: v.radomeCol || 0x2b2f33, roughness: 0.55, metalness: 0.1 },
      nozzle: { color: 0x55524d, roughness: 0.45, metalness: 0.55 },
      store:  { color: v.storeCol || 0xd6d8d4, roughness: 0.6, metalness: 0.15 }
    });
    var root = new V.Group();
    flush(root, B, mats, sh);
    var gear = new V.Group(); gear.name = "gear";
    flush(gear, G, mats, null);
    root.add(gear);
    return root;
  }

  /* the old flight deck's glazing on the canvas: side panes on the two
     side bands, the windscreen and roof panes on the top band */
  function paintDeck(g, s) {
    var b;
    g.fillStyle = "#26343b";
    for (b = 1; b <= 2; b++) {
      [[2.62, 3.50], [3.66, 4.36]].forEach(function (w) {
        g.fillRect(s.u(HX(w[0])), s.vz(0.95, b), s.u(HX(w[1])) - s.u(HX(w[0])), s.vz(0.42, b) - s.vz(0.95, b));
      });
      /* the windscreen's quarter panes, sloping up from 1.96 to 2.48 m */
      g.beginPath(); g.moveTo(s.u(HX(1.98)), s.vz(0.62, b)); g.lineTo(s.u(HX(2.50)), s.vz(1.00, b));
      g.lineTo(s.u(HX(2.50)), s.vz(0.50, b)); g.lineTo(s.u(HX(2.10)), s.vz(0.50, b)); g.closePath(); g.fill();
    }
    /* top: the windscreen and two roof panes, 0.9 m across */
    [[1.98, 2.55, 0.50], [2.70, 3.50, 0.42], [3.66, 4.36, 0.42]].forEach(function (w) {
      g.fillRect(s.u(HX(w[0])), s.vy(w[2], 0), s.u(HX(w[1])) - s.u(HX(w[0])), s.vy(-w[2], 0) - s.vy(w[2], 0));
    });
  }

  /* ---- H-6U: the hose-drum pod under each outer wing (P-U1) --
     P-U1 is a close-up, side-on: the pod 2.3 times as long as it is deep,
     blunt at both ends, a two-blade ram-air turbine on the nose spanning a
     third of its length; the pylon 0.6 of the pod's depth tall, its top
     from 0.38 to 0.88 of the pod's length aft of the nose, its foot from
     0.20 to 0.75, both edges raked forward going down. Scaled by the wing's
     depth over the pylon (0.59 m at y = 10.2, at most 165 px of P-U1): the
     pod 2.5 m by 1.0 m. Its station across the span is NOT measured. */
  var U_POD = { y: 10.2, len: 2.5, r: 0.50 };
  function hosePod(B, sd) {
    var y = U_POD.y, L = U_POD.len, R = U_POD.r, le = tab(H_WING, y, 1), zw = hwLow(y), z = zw - 0.6 * 2 * R - R;
    var s0 = le - 0.38 * L, yy = sd * y;
    storeT(B.store, [[s0, 0.10], [s0 + 0.10, 0.30], [s0 + 0.30, 0.44], [s0 + 0.60, R], [s0 + L - 0.55, R],
                     [s0 + L - 0.25, 0.42], [s0 + L - 0.05, 0.22], [s0 + L, 0.05]], yy, z, 16);
    /* the ram-air turbine: hub and two blades */
    B.metal.push(sph(0.09, 10, 6, HX(s0 - 0.08), yy, z));
    B.dark.push(box(0.05, 0.12, 0.85, HX(s0 - 0.06), yy, z));
    /* the pylon */
    B.skin.push(vplate([[HX(s0 + 0.20 * L), z + R - 0.06], [HX(s0 + 0.75 * L), z + R - 0.06],
                        [HX(s0 + 0.88 * L), zw + 0.06], [HX(s0 + 0.38 * L), zw + 0.06]], yy, 0.18));
  }

  /* ---- H-6K: six underwing pylons, three a side (P-K2 side-on, P-K1) --
     P-K2 shows three wedge pylons under each wing, 2.0 m apart along x,
     each 1.6 m long and 0.45 m deep, its foot at the rear; the stations
     across the span are placed clear of the nacelle and the gear pod at
     that spacing (NOT measured). P-K1 shows them loaded with white
     cruise missiles, about 6.0 m long and 0.6 m across. */
  var K_PYL = [3.90, 6.60, 9.30];
  function k6Pylons(B, sd, stores) {
    K_PYL.forEach(function (y) {
      var le = tab(H_WING, y, 1), zw = hwLow(y), zp = zw - 0.45, yy = sd * y;
      B.skin.push(vplate([[HX(le - 0.2), zw + 0.08], [HX(le + 1.4), zw + 0.08], [HX(le + 1.4), zp]], yy, 0.16));
      if (!stores) return;
      /* the row's KD-20 (CJ-10K): round body, ogive nose, the wings folded
         in, a cruciform tail */
      var r = 0.30, z = zp - r + 0.04, a = le - 1.9;
      storeT(B.store, [[a, 0.02], [a + 0.25, 0.18], [a + 0.75, r], [a + 5.75, r], [a + 6.0, 0.16]], yy, z, 12);
      finsT(B.store, a + 5.25, a + 5.95, a + 5.85, yy, z, r, r + 0.36, PI / 4, 4);
    });
  }

  /* ---- H-6K: the electro-optical turret under the nose (en.wikipedia; P-K1) -- */
  function k6Nose(B) {
    /* a light ball, about 0.44 m across, 2.5 m aft of the nose under the
       keel (P-K1) */
    B.store.push(sph(0.22, 12, 8, HX(2.5), 0, tab(H_FUS, 2.5, 3) - 0.08));
    B.metal.push(cyl(0.10, 0.10, 0.12, 8, "z", HX(2.5), 0, tab(H_FUS, 2.5, 3) + 0.06));
    /* the dorsal dome behind the wing root (P-K1, as the H-6N's P9) */
    B.radome.push(sph(0.55, 16, 8, HX(18.6), 0, 1.15, 1.4, 1, 0.55));
  }

  /* ===================================================== base "tu16" ==
     The H-6A and the H-6D: ru_tu16.js's Tu-16 drawn plain, as it is. The
     H-6D's big search radome and its two C-601s are NOT drawn: no
     photograph or drawing of an H-6D was found (see the header). */
  function buildTu16(THREE, M, C, v) {
    return HeroTu16Z.plain(THREE, M, C);
  }

  function h6(THREE, M, C, v) {
    V = THREE;
    if (v.base === "tu16") return buildTu16(THREE, M, C, v);
    return buildT(v, C);
  }
  function variant(k) { return function (THREE, M, C) { return h6(THREE, M, C, VARIANTS[k]); }; }
  return { VARIANTS: VARIANTS, h6: h6, h6a: variant("h6a"), h6d: variant("h6d"), h6u: variant("h6u"), h6k: variant("h6k") };
})();

/* len is each build's MEASURED X extent */
if (typeof HeroTu16Z !== "undefined") {
  UNIT_MODELS["pla_e60_heavybomber"] = { len: 34.8, build: HeroPlaH6.h6a };
  UNIT_MODELS["pla_e80_heavybomber"] = { len: 34.8, build: HeroPlaH6.h6d };
}
UNIT_MODELS["pla_e90_tanker"] = { len: 34.4, build: HeroPlaH6.h6u };
UNIT_MODELS["pla_e00_heavybomber"] = { len: 34.4, build: HeroPlaH6.h6k };
