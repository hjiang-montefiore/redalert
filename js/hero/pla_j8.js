/* ============ pla_j8.js - HERO model: Shenyang J-8II "Finback-B" =========
   The PLA interceptor with the solid radar nose and lateral intakes, one row:
     pla_e80_fighter  "J-8II"  Shenyang J-8II Finback-B, four PL-5B    1980s

   References (Wikimedia Commons / Wikipedia, fetched for this file, cached
   in scratchpad/q_pla_e80_fighter_ref):
     A "Shenyang J-8I and J-8II.png" (SVG/PD plan silhouettes, the J-8II on
       the right): measured row by row at 0.0607 m/px across (its wing tip
       to tip is the published 9.344 m span, W) and 0.0632 m/px along (its
       nose to the centreline tail end is the published 20.53 m without the
       probe, W). It gives: the ogive radome (round, 1.1 m across by x 8.8),
       the cockpit section 1.28 m wide, the intake lips at x 4.14 standing
       1.12 m out, the constant-width twin-engine body (2.24-2.36 m), the
       delta wing (leading edge 61 deg, straight; trailing edge straight
       across at x -5.03; cropped tip 0.56 m at y 4.70), the tailplanes
       (59 deg leading edge, tips at y 3.15, reaching to x -9.9), a narrow
       centreline body on past the tailplanes to x -10.27, and FOUR
       missiles on underwing pylons at 1.82 m and 2.97 m out, the inner
       noses at about x 2.4, the outer at about x 0.35.
     W en.wikipedia "Shenyang J-8" (Gordon and Komissarov 2008): the J-8II
       "replaced the distinctive nose air intake with a conventional radome
       and side air intakes"; two engines (WP-13A-II); "the two ventral fins
       under the tail were replaced by a single larger fin copied from the
       MiG-23; the fin folded to starboard on the ground"; specifications
       (F-8IIM): length 21.39 m (20.53 m without the pitot probe), span
       9.344 m, height 5.41 m, wing area 42.2 m2.
     W2 en.wikipedia "PL-5": PL-5B 3.128 m long, 0.127 m body, 0.657 m span.
     P "Shenyang J-8II (Finback-B).jpg" (960 px): the museum aircraft "0001"
       nearly side-on from the port front quarter. Read through a
       one-dimensional perspective fit along the fuselage (u = (aX + b) /
       (cX + 1), anchored on the radome tip x 10.27, the intake lip x 4.14
       from A and the fin's trailing-edge tip x -10.27), with the height
       scale K / (cX + 1) set by the 5.41 m height (nose tyre bottom to fin
       tip); the radome, assumed round, checks it to within 10 per cent. z 0
       is the radome axis. It gives: the dark radome (1.25 m deep at its
       joint, x 8.52); the cockpit section from -0.82 to the sill at 0.83;
       the windscreen base x 7.14, the hood peak 1.30 at x 6.2, the hood
       ending at x 4.87; the intake mouth from -0.87 to 0.57 at the lip,
       which stands upright in profile; the top line falling from 0.82 at
       x 2.6 to 0.18 at the fin root and -0.44 at the tail; the belly at
       -1.04; the fin (leading edge 63 deg from x -4.09, tip 2.46 at x
       -8.45, trailing edge leaning back from x -8.80 to the tip at -10.27:
       the thin centreline A shows behind the body is the fin); the ventral
       fin, folded, with its root from x -3.8 to -7.3; the nose tyres at x
       5.5 standing 2.99 m under the radome axis; the nose-bay doors; the
       mains about x -2.2. Paint: light grey all over in overcast light
       (171,190,191 on the body side, film-tinted) taken to about 0.9 and
       neutralised -> #9ea6a4; the radome very dark (67,66,60) -> #3f403c.
       The green fin stripe and red "0001" are museum markings, not drawn.

   Recognition list (each shows in the model, with the reference it rests on):
     1. the solid ogive radome with the pitot probe, no nose intake (A, W)
     2. the two lateral intakes beside the cockpit with splitter plates (A, W)
     3. the long slender fuselage, wide and flat-sided over the engines (A)
     4. the big 61 deg delta wing, straight trailing edge, cropped tips; its
        area with the body strip is 43.4 m2 against the published 42.2 (A, W)
     5. twin nozzles side by side under the tail end (W, P; size NOT CONFIRMED)
     6. the tall single fin, 63 deg leading edge, its trailing-edge tip the
        rearmost point of the aircraft (A, P, W: height 5.41 m)
     7. the single big ventral fin under the tail (W, P)
     8. the swept all-moving tailplanes low on the rear body (A)
     9. four PL-5B on underwing pylons (A, W2; eras.js weapons line)
    10. tricycle gear (the group "gear")

   Accuracy of P: one photograph through a fitted perspective; heights are
   good to about +-10 per cent, stations to about +-0.3 m.
   NOT CONFIRMED (P does not show them, or not well enough to measure): the
   ventral fin's depth and lower edge (it is folded in P; drawn 1.0 m deep
   with a raked lower edge), the nozzles (hidden in P: drawn side by side
   at z -0.74, 0.88 m across, exits at x -9.15, under the 0.44 m-high tail
   end P shows), the wing's height on the body (about -0.35, read off the
   near wing seen edge-on) and its -2 deg anhedral (air_specs.js), the
   tailplanes' height (about -0.85), the main gear's station (+-0.5 m:
   mean of the two tyres' stations through the perspective), the track
   (3.8 m), the tyre sizes (0.70 m nose, 0.90 m mains), the leg geometry,
   the cross-section shapes (A gives widths, P heights; the corners are
   judged), the pylon shapes. The ventral fin is drawn EXTENDED (the flight
   shape); on the ground the real one folds to starboard, which the engine
   cannot show (it hides only "gear"). The Type 23-III cannon, antennas,
   wing fences and air brakes are not drawn: no reference places them.
   No national markings, no numbers.
   Corrections to the generic model: it was 26.4 m long (published 21.39),
   a round tube with round nacelles under a swept wing; A gives the 61 deg
   delta, the slim body with box intakes beside the cockpit, the swept
   tailplanes and four missiles at their measured stations.
   Materials: skin (canvas texture: panel lines, flap and aileron lines,
   heat staining), radome, dark, metal, glass, team, stores; gear in its own
   group (metal, tyres, doors).
   Team colour exactly C.team, on two small strips on the upper outer wings.
   Model space: +X nose, +Y port, +Z up, metres; z 0 the radome axis, tyres at z -2.95.
   ======================================================================== */

/* DETAIL PASS (2026-11): fastener rows on every frame and stringer, access panels, the speed
   brakes' outlines, airflow streaks and belly grime on the paint; wingtip position lamps (red /
   green material), the white tail lamp, spine and belly beacons, blade aerials, the intakes'
   bright lips, the nozzles' liners, flame-holder rings and petal seams, angle-of-attack vanes;
   oleo pistons, torque links, hub caps, brakes and the nose leg's taxi lamps. Sizes NOT measured.
   pla_e80_fighter 5488 -> 6792 tris, 10 -> 13 draw calls; extents and len unchanged. */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroJ8 = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;
  /* z 0 is the radome axis. P: the nose tyres stand 2.99 m under it and the
     fin tip 2.42 m over it (5.41 m, W); split 2.95 / 2.46 */
  var GROUND = -2.95;
  var FIN_TOP = 2.46;
  var AN = Math.tan(2 * PI / 180);    /* -2 deg anhedral (air_specs.js; NOT CONFIRMED) */

  var PXM = 38, XMIN = -11.0, TW = 880;
  var PYM = 34, YMAX = 5.2;
  var TOPH = 354, SIDEH = 190, TH = TOPH + 2 * SIDEH + TOPH;
  var ZTOP = 3.4, ZSPAN = 5.6;

  /* light grey all over: NOT CONFIRMED (no colour photograph fetched; air_specs.js
     gives "silver"); a plain grey a little darker than the Foxbat's */
  var PAL = { top: "#9ea6a4", side: "#9ca4a2", belly: "#a6acaa" };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 2, TW - 2); }
  function pxY(y) { return (YMAX - y) * PYM; }

  var _cv = null;
  function paint() {
    if (_cv) return _cv;
    var P = PAL;
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), s = 80281, i, b, x;
    function R() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    var bandY = [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH];
    var bandH = [TOPH, SIDEH, SIDEH, TOPH];
    function sideZ(z, band) { return bandY[band] + clamp((ZTOP - z) / ZSPAN * SIDEH, 0, SIDEH); }
    g.fillStyle = P.top; g.fillRect(0, 0, TW, TOPH);
    g.fillStyle = P.side; g.fillRect(0, TOPH, TW, 2 * SIDEH);
    g.fillStyle = P.belly; g.fillRect(0, TOPH + 2 * SIDEH, TW, TOPH);
    /* frames on the body: panel joints round the fuselage */
    g.strokeStyle = "rgba(0,0,0,0.15)"; g.lineWidth = 1;
    var PANEL_X = [8.45, 7.10, 4.20, 2.60, 0.90, -1.00, -2.90, -4.80, -6.40, -7.70];
    for (b = 0; b < 4; b++) for (i = 0; i < PANEL_X.length; i++) {
      x = pxX(PANEL_X[i]);
      var y0 = bandY[b], y1 = bandY[b] + bandH[b];
      if (b === 0 || b === 3) { y0 = bandY[b] + pxY(1.2); y1 = bandY[b] + pxY(-1.2); }
      g.beginPath(); g.moveTo(x, y0); g.lineTo(x, y1); g.stroke();
    }
    g.strokeStyle = "rgba(0,0,0,0.10)";
    for (b = 1; b <= 2; b++) for (i = 0; i < 14; i++) {
      x = pxX(7.6 - i * 1.1 + R() * 0.3);
      g.strokeRect(x, sideZ(0.4 - R() * 1.0, b), 0.5 * PXM + R() * 12, 0.30 * SIDEH / ZSPAN + R() * 4);
    }
    /* wings, top and underside: aileron and flap lines along the trailing edge */
    g.strokeStyle = "rgba(0,0,0,0.20)";
    [0, 3].forEach(function (bb) {
      [1, -1].forEach(function (sg) {
        function P2(xx, yy) { return [pxX(xx), bandY[bb] + pxY(sg * yy)]; }
        function line(a, c) { g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(c[0], c[1]); g.stroke(); }
        line(P2(-4.35, 1.25), P2(-4.35, 2.95));        /* flap hinge */
        line(P2(-4.45, 2.95), P2(-4.45, 4.40));        /* aileron hinge */
        line(P2(-4.35, 2.95), P2(-5.03, 2.95));
        line(P2(-4.35, 1.25), P2(-5.03, 1.25));
        line(P2(-4.45, 4.40), P2(-5.03, 4.40));
      });
    });
    /* detail pass: fastener rows along every frame and along the body's
       stringers, access panels with a fastener at each corner, the
       ventral speed brakes' outlines, airflow streaks and grime */
    g.fillStyle = "rgba(0,0,0,0.18)";
    for (b = 0; b < 4; b++) for (i = 0; i < PANEL_X.length; i++) {
      x = pxX(PANEL_X[i]) + 3;
      for (var yy = bandY[b] + 2; yy < bandY[b] + bandH[b]; yy += 5) g.fillRect(x, yy, 1.1, 1.1);
    }
    for (b = 1; b <= 2; b++) [0.55, 0.10, -0.45].forEach(function (zz) {
      for (var xx = pxX(-8.4); xx < pxX(8.4); xx += 5) g.fillRect(xx, sideZ(zz, b), 1.1, 1.1);
    });
    [0, 3].forEach(function (bb) { [0.45, -0.45].forEach(function (yy2) {
      for (var xx = pxX(-8.4); xx < pxX(8.4); xx += 5) g.fillRect(xx, bandY[bb] + pxY(yy2), 1.1, 1.1);
    }); });
    for (i = 0; i < 40; i++) {
      var bb2 = (R() * 4) | 0, bx = pxX(-8 + R() * 16), by = bandY[bb2] + R() * (bandH[bb2] - 14), bw = 8 + R() * 22, bh = 6 + R() * 12;
      g.strokeStyle = "rgba(0,0,0,0.24)"; g.strokeRect(bx, by, bw, bh);
      g.fillStyle = "rgba(0,0,0,0.26)";
      g.fillRect(bx + 1, by + 1, 1.3, 1.3); g.fillRect(bx + bw - 2.3, by + bh - 2.3, 1.3, 1.3);
    }
    g.strokeStyle = "rgba(0,0,0,0.30)";
    [1, -1].forEach(function (sg) {
      g.strokeRect(pxX(-6.2), bandY[3] + pxY(sg > 0 ? 0.95 : -0.40), 1.4 * PXM, 0.55 * PYM);
    });
    for (i = 0; i < 140; i++) {
      g.fillStyle = "rgba(24,22,18," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 14 + R() * 60, 1 + R());
    }
    g.fillStyle = "rgba(30,26,20,0.10)"; g.fillRect(0, bandY[3], TW, TOPH);
    /* heat staining round the tail, light weathering */
    var sx = pxX(-9.0), gr = g.createLinearGradient(sx, 0, pxX(-6.8), 0);
    gr.addColorStop(0, "rgba(40,32,24,0.36)"); gr.addColorStop(1, "rgba(40,32,24,0)");
    g.fillStyle = gr; g.fillRect(sx, 0, pxX(-6.8) - sx, TH);
    for (i = 0; i < 60; i++) {
      g.fillStyle = "rgba(24,20,16," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 10 + R() * 50, 2 + R() * 8);
    }
    _cv = cv;
    return cv;
  }
  var _tex;
  function skinTexture() {
    if (_tex !== undefined) return _tex;
    var t = false;
    try {
      t = new V.CanvasTexture(paint());
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = false; }
    _tex = t;
    return t;
  }

  /* each face takes the band its normal looks into: top, port, starboard, belly */
  function projUV(geo) {
    var p = geo.attributes.position.array;
    var uv = new Float32Array(p.length / 3 * 2);
    var t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var band = nz > 0.55 ? 0 : nz < -0.55 ? 3 : (ny >= 0 ? 1 : 2);
      var endOn = Math.abs(nx) > Math.abs(ny) * 1.4;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, W;
        if (band === 0) { U = pxX(x); W = clamp(pxY(y), 2, TOPH - 2); }
        else if (band === 3) { U = pxX(x); W = TOPH + 2 * SIDEH + clamp(pxY(y), 2, TOPH - 2); }
        else {
          U = pxX(endOn ? x + y : x);
          W = TOPH + (band - 1) * SIDEH + clamp((ZTOP - z) / ZSPAN * SIDEH, 2, SIDEH - 2);
        }
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  function makeMats(C) {
    var tex = skinTexture(), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.62, metalness: 0.22 });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0xa9adae);
    m.nose  = new V.MeshStandardMaterial({ color: 0x3f403c, roughness: 0.55, metalness: 0.08 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.70, metalness: 0.30 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.glass = new V.MeshStandardMaterial({ color: 0x2e3a40, roughness: 0.10, metalness: 0.45 });
    m.msl   = new V.MeshStandardMaterial({ color: 0xc2c6c5, roughness: 0.55, metalness: 0.15 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    return m;
  }

  /* ------------------------------------------------------ geometry kit -- */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) {
    return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  }
  function cyl(r0, r1, len, seg, axis, x, y, z) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, false);
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  /* a scaled sphere (added in the detail pass: lamps, taxi lights) */
  function sph(r, ws, hs, x, y, z, sx, sy, sz) {
    var g = new V.SphereGeometry(r, ws, hs);
    g.scale(sx || 1, sy || 1, sz || 1);
    return place(g, x, y, z);
  }
  function bar(p, q, r, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, false);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(
      new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
  function merge(list) {
    var pos = [], nor = [], uvs = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = flat(list[i]);
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      var u = g.attributes.uv ? g.attributes.uv.array : null;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
      for (j = 0; j < p.length / 3 * 2; j++) uvs.push(u ? u[j] : 0);
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(uvs, 2));
    return out;
  }
  function mesh(parent, list, mat, name, skinned) {
    if (!list.length) return null;
    var geo = merge(list);
    if (skinned) projUV(geo);
    var m = new V.Mesh(geo, mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  function push(list, geos) {
    if (geos instanceof Array) for (var i = 0; i < geos.length; i++) list.push(geos[i]);
    else list.push(geos);
  }
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  /* a convex solid from its faces; each triangle is wound away from the
     solid's centre, tested against the centre of its own face */
  function convex(faces) {
    var c = [0, 0, 0], n = 0, i, j, out = [];
    for (i = 0; i < faces.length; i++) for (j = 0; j < faces[i].length; j++) {
      c[0] += faces[i][j][0]; c[1] += faces[i][j][1]; c[2] += faces[i][j][2]; n++;
    }
    c[0] /= n; c[1] /= n; c[2] /= n;
    for (i = 0; i < faces.length; i++) {
      var f = faces[i], a = f[0], fc = [0, 0, 0];
      for (j = 0; j < f.length; j++) { fc[0] += f[j][0] / f.length; fc[1] += f[j][1] / f.length; fc[2] += f[j][2] / f.length; }
      for (j = 1; j < f.length - 1; j++) {
        var b = f[j], d = f[j + 1];
        var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
        var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        var o = (fc[0] - c[0]) * nx + (fc[1] - c[1]) * ny + (fc[2] - c[2]) * nz;
        if (o >= 0) out.push(a, b, d); else out.push(a, d, b);
      }
    }
    return tris(out);
  }
  function solid(A, B) {
    var faces = [A.slice(), B.slice()], i, n = A.length;
    for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
    return convex(faces);
  }
  /* aerofoil section: leading edge, crest 15% back, after-body at 75%, sharp
     trailing edge; thickness t along the unit normal nrm */
  function foil(le, te, t, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(0, 0), p(0.15, t / 2), p(0.75, t * 0.38), p(1, 0), p(0.75, -t * 0.38), p(0.15, -t / 2)];
  }
  function blk(le, te, f0, f1, h, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(f0, h), p(f1, h), p(f1, -h), p(f0, -h)];
  }

  /* ---- the loft: superellipse sections (e 1 round, lower e boxier) from
     the nose to the tail, quads wound (a, c, b) so every normal looks out */
  function ls(x, yc, zc, w, h, e) { return { x: x, yc: yc, zc: zc, w: w, h: h, e: e || 1 }; }
  function sgn(v) { return v < 0 ? -1 : 1; }
  function ringOf(s, n) {
    var o = [], j, t, c, sn;
    for (j = 0; j < n; j++) {
      t = 2 * PI * j / n; c = Math.cos(t); sn = Math.sin(t);
      o.push([s.yc + s.w * sgn(c) * Math.pow(Math.abs(c), s.e), s.zc + s.h * sgn(sn) * Math.pow(Math.abs(sn), s.e)]);
    }
    return o;
  }
  function loft(secs, n, noseDx, tailDx) {
    var pos = [], idx = [], i, j, r;
    for (i = 0; i < secs.length; i++) {
      r = ringOf(secs[i], n);
      for (j = 0; j < n; j++) pos.push(secs[i].x, r[j][0], r[j][1]);
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
    function cap(k, dx, front) {
      var s = secs[k], rr = ringOf(s, n), t = [], cy = 0, cz = 0;
      for (j = 0; j < n; j++) { cy += rr[j][0]; cz += rr[j][1]; }
      var o = [s.x + dx, cy / n, cz / n];
      for (j = 0; j < n; j++) {
        var p0 = [s.x, rr[j][0], rr[j][1]], p1 = [s.x, rr[(j + 1) % n][0], rr[(j + 1) % n][1]];
        if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
      }
      out.push(tris(t));
    }
    if (noseDx !== null && noseDx !== undefined) cap(0, noseDx, true);
    if (tailDx !== null && tailDx !== undefined) cap(secs.length - 1, -tailDx, false);
    return out;
  }
  function revolve(prof, len, r, x, y, z, n, capNose, capTail) {
    var secs = [], i;
    for (i = 0; i < prof.length; i++) secs.push(ls(x + prof[i][0] * len, y, z, r * prof[i][1], r * prof[i][1], 1));
    return loft(secs, n, capNose === undefined ? 0 : capNose, capTail === undefined ? 0 : capTail);
  }
  function secAt(secs, x) {
    for (var i = 0; i < secs.length - 1; i++) {
      var a = secs[i], b = secs[i + 1];
      if (x <= a.x && x >= b.x) {
        var t = (a.x - x) / (a.x - b.x);
        var L = function (p, q) { return p + (q - p) * t; };
        return ls(x, L(a.yc, b.yc), L(a.zc, b.zc), L(a.w, b.w), L(a.h, b.h), L(a.e, b.e));
      }
    }
    return secs[secs.length - 1];
  }
  function pylon(list, x0, x1, y, zTop, zBot, w) {
    var h = (w || 0.11) / 2, d = (x0 - x1) * 0.12;
    list.push(convex([
      [[x0, y - h, zTop], [x1, y - h, zTop], [x1, y + h, zTop], [x0, y + h, zTop]],
      [[x0 - d, y - h, zBot], [x1 + d * 0.5, y - h, zBot], [x1 + d * 0.5, y + h, zBot], [x0 - d, y + h, zBot]],
      [[x0, y - h, zTop], [x1, y - h, zTop], [x1 + d * 0.5, y - h, zBot], [x0 - d, y - h, zBot]],
      [[x0, y + h, zTop], [x1, y + h, zTop], [x1 + d * 0.5, y + h, zBot], [x0 - d, y + h, zBot]],
      [[x0, y - h, zTop], [x0, y + h, zTop], [x0 - d, y + h, zBot], [x0 - d, y - h, zBot]],
      [[x1, y - h, zTop], [x1, y + h, zTop], [x1 + d * 0.5, y + h, zBot], [x1 + d * 0.5, y - h, zBot]]
    ]));
  }
  /* four fins round a store; ang 0 is +, PI/4 is x */
  function fins(list, x, y, z, chordR, chordT, sweep, span, ang, th, r0) {
    for (var k = 0; k < 4; k++) {
      var a = ang + k * PI / 2, cy = Math.cos(a), cz = Math.sin(a), r1 = span;
      r0 = r0 || 0;
      var A = [x, y + cy * r0, z + cz * r0], B = [x - chordR, y + cy * r0, z + cz * r0];
      var Cc = [x - sweep - chordT, y + cy * r1, z + cz * r1], D = [x - sweep, y + cy * r1, z + cz * r1];
      var nY = -cz * th, nZ = cy * th;
      list.push(solid([[A[0], A[1] + nY, A[2] + nZ], [B[0], B[1] + nY, B[2] + nZ], [Cc[0], Cc[1] + nY, Cc[2] + nZ], [D[0], D[1] + nY, D[2] + nZ]],
                      [[A[0], A[1] - nY, A[2] - nZ], [B[0], B[1] - nY, B[2] - nZ], [Cc[0], Cc[1] - nY, Cc[2] - nZ], [D[0], D[1] - nY, D[2] - nZ]]));
    }
  }
  function aftDisc(r, seg, x, y, z) {
    var g = new V.CircleGeometry(r, seg);
    g.rotateY(-PI / 2);
    g.translate(x, y, z);
    return g;
  }

  /* ------------------------------------------------------------ planform --
     Wing (A, measured at 0.0607 m/px across, 0.0632 m/px along): leading
     edge 61 deg, straight, from (y 1.24, x 1.86) to the cropped tip at
     y 4.70 (x -4.47); trailing edge straight across at x -5.03; tip chord
     0.56 m. Area with the body strip 43.4 m2 against the published 42.2. */
  var WR = 1.05, WT = 4.70;
  function wLE(y) { return 1.86 - (y - 1.24) * 1.83; }
  function wTE(y) { return -5.03; }
  function wZ(y)  { return WZ0 - (y - WR) * AN; }
  function wT(y)  { return 0.30 - (y - WR) / (WT - WR) * 0.24; }
  function wPart(y, s, f0, f1, tk) {
    var le = wLE(y), te = wTE(y), c = le - te;
    return foil([le - c * f0, s * y, wZ(y)], [le - c * f1, s * y, wZ(y)], wT(y) * (tk || 1), [0, 0, 1]);
  }
  var WZ0 = -0.35;               /* mid-low on the body (P, read through the perspective) */
  /* tailplanes (A): leading edge 59 deg from (y 1.0, x -5.45) to the tip
     at y 3.15; trailing edge swept from (y 1.0, x -8.10) to (3.15, -9.90) */
  var TP = { le0: -5.45, te0: -8.10, le1: -8.75, te1: -9.90, y1: 3.15, z: -0.85, dz: 0.10 };   /* low on the rear body (P) */
  /* the ventral fin (P, folded on the museum aircraft): root along the
     belly from x -3.80 to -7.30; its depth and lower edge NOT CONFIRMED */
  var VF = { x0: -3.80, x1: -7.30, x2: -7.00, x3: -5.40, zr: -0.95, zb: -1.95 };
  var INTAKE_RAKE = 0.0;           /* the lip stands upright in profile (P) */
  /* nose tyres at x 5.50 (P); the mains' station is the mean of the two
     tyres' stations through the perspective (about -2.2, +-0.5); track
     NOT CONFIRMED */
  var GEAR = { nx: 5.50, mx: -2.20, track: 3.80 };

  /* the fin (P): leading edge 63 deg from (x -4.09, z 0.18) to the tip at
     (x -8.45, z 2.46); trailing edge leaning back from (x -8.80, z -0.38)
     to the tip at -10.27 - the rearmost point, the thin centreline A
     shows behind the body; tip chord 1.82 m */
  var FIN_Z0 = -0.25;
  var FIN = { le0: -3.30, te0: -8.87, le1: -8.45, te1: -10.27 };
  function finLE(z) { return FIN.le0 + (FIN.le1 - FIN.le0) * (z - FIN_Z0) / (FIN_TOP - FIN_Z0); }
  function finTE(z) { return FIN.te0 + (FIN.te1 - FIN.te0) * (z - FIN_Z0) / (FIN_TOP - FIN_Z0); }
  function finT(z)  { return 0.24 - (z - FIN_Z0) / (FIN_TOP - FIN_Z0) * 0.16; }
  function finPart(z, f0, f1, tk) {
    var le = finLE(z), te = finTE(z), c = le - te;
    return foil([le - c * f0, 0, z], [le - c * f1, 0, z], finT(z) * (tk || 1), [0, 1, 0]);
  }

  /* ---- station table, nose to tail (A plan; heights NOT CONFIRMED) */
  var NOSE = [ls(10.27, 0, 0.10, 0.02, 0.02), ls(10.00, 0, 0.10, 0.17, 0.17), ls(9.60, 0, 0.08, 0.34, 0.35),
              ls(9.10, 0, 0.06, 0.50, 0.52), ls(8.52, 0, 0.04, 0.61, 0.63)];
  var FORE = [ls(8.52, 0, 0.04, 0.61, 0.63), ls(8.00, 0, 0.03, 0.63, 0.72, 0.94), ls(7.14, 0, 0.01, 0.64, 0.82, 0.86),
              ls(6.20, 0, 0.00, 0.64, 0.84, 0.80), ls(5.20, 0, -0.02, 0.64, 0.86, 0.76), ls(4.20, 0, -0.05, 0.66, 0.90, 0.72),
              ls(3.20, 0, -0.08, 0.70, 0.92, 0.70), ls(2.40, 0, -0.10, 0.70, 0.92, 0.70)];
  /* windscreen base x 7.14 z 0.83, hood peak x 6.2 z 1.30, rear x 4.87 (P) */
  var CAN = [ls(7.20, 0, 0.80, 0.26, 0.02), ls(6.85, 0, 0.80, 0.44, 0.30, 0.80), ls(6.20, 0, 0.80, 0.48, 0.50, 0.74),
             ls(5.60, 0, 0.80, 0.48, 0.46, 0.74), ls(5.10, 0, 0.80, 0.44, 0.30, 0.78), ls(4.75, 0, 0.80, 0.38, 0.14, 0.82)];
  /* the body behind the intakes (A width; P heights): top 0.82 at x 2.6
     falling to 0.18 at the fin root and -0.44 at the tail; belly -1.04 */
  var BODY = [ls(3.30, 0, -0.10, 1.10, 0.95, 0.40), ls(1.80, 0, -0.13, 1.13, 0.92, 0.40), ls(-1.00, 0, -0.22, 1.13, 0.84, 0.42),
              ls(-4.00, 0, -0.42, 1.15, 0.67, 0.44), ls(-6.00, 0, -0.52, 1.13, 0.58, 0.48), ls(-7.30, 0, -0.62, 1.06, 0.52, 0.52),
              ls(-8.60, 0, -0.72, 0.98, 0.48, 0.56)];
  /* the spine from the hood back, the top line P shows */
  var SPINE = [ls(4.85, 0, 0.66, 0.40, 0.24, 0.80), ls(3.60, 0, 0.62, 0.44, 0.24, 0.70), ls(1.00, 0, 0.52, 0.42, 0.22, 0.70),
               ls(-2.00, 0, 0.33, 0.38, 0.20, 0.70), ls(-4.50, 0, 0.08, 0.32, 0.17, 0.70), ls(-7.80, 0, -0.30, 0.26, 0.15, 0.80)];

  /* PL-5B: ogive nose, canards at the front, cropped-delta wings at the
     tail; 3.128 m, 0.127 m body, 0.657 m span (W2) */
  var P_PL = [[0.50, 0.03], [0.47, 0.45], [0.43, 0.85], [0.39, 1.0], [-0.50, 1.0]];
  function pl5(K, xn, y, zc) {
    var len = 3.128, r = 0.0635, x = xn - len / 2;
    push(K.msl, revolve(P_PL, len, r, x, y, zc, 14, 0, 0));
    K.dark.push(aftDisc(r * 0.8, 12, x - len * 0.5 - 0.005, y, zc));
    fins(K.msl, xn - 0.38, y, zc, 0.26, 0.10, 0.10, 0.22, PI / 4, 0.008, r);      /* canards */
    fins(K.msl, x - len * 0.5 + 0.52, y, zc, 0.50, 0.14, 0.32, 0.33, PI / 4, 0.008, r);
    K.metal.push(box(1.6, 0.06, 0.06, x + 0.2, y, zc + r + 0.03));                 /* launch rail */
  }

  function buildAirframe(THREE, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "j8ii";
    var K = { skin: [], nose: [], dark: [], metal: [], glass: [], team: [], msl: [] };
    var G = { metal: [], tyre: [], dark: [], skin: [] };
    var s;

    /* ---- the solid ogive radome, then the cockpit section (A, B) */
    push(K.nose, loft(NOSE, 32, 0.02, null));
    push(K.skin, loft(FORE, 40, null, null));
    push(K.glass, loft(CAN, 32, 0.02, 0));
    push(K.skin, loft(SPINE, 24, 0.02, null));
    /* canopy frames: windscreen arch, the hood's front arch and rear */
    function arch(x, zMin, r) {
      var q = secAt(CAN, x), qq = ls(q.x, q.yc, q.zc, q.w * 1.015, q.h * 1.015, q.e), ring = ringOf(qq, 32), j, prev = null;
      for (j = 0; j <= 16; j++) {
        var p = ring[j % 32];
        if (p[1] < zMin) { prev = null; continue; }
        var P = [x, p[0], p[1]];
        if (prev) K.dark.push(bar(prev, P, r, 6));
        prev = P;
      }
    }
    arch(6.70, 0.86, 0.03); arch(6.00, 0.86, 0.03);
    for (s = -1; s <= 1; s += 2) K.dark.push(bar([6.70, s * 0.45, 0.88], [4.95, s * 0.43, 0.88], 0.024, 6));
    /* pitot boom (A, W: 21.39 m with the probe, 20.53 m without) */
    K.metal.push(cyl(0.022, 0.05, 0.92, 10, "x", 10.69, 0, 0.10));
    K.metal.push(box(0.08, 0.18, 0.010, 10.85, 0, 0.10));
    K.metal.push(box(0.08, 0.010, 0.18, 10.85, 0, 0.10));

    /* ---- the wide twin-engine body (A, B) */
    push(K.skin, loft(BODY, 48, 0.0, null));

    /* ---- the two lateral intakes beside the cockpit, lips at x 4.14 (A) */
    for (s = -1; s <= 1; s += 2) {
      var yi = 0.70, yo = 1.12, zb = -0.87, zt = 0.57, RK = INTAKE_RAKE, XL = 4.14, XB = 2.40;
      var F = [[XL, s * yi, zb], [XL, s * yo, zb], [XL - RK, s * yo, zt], [XL - RK, s * yi, zt]];
      var B2 = [[XB, s * 0.66, zb - 0.05], [XB, s * 1.13, zb - 0.05], [XB, s * 1.13, zt + 0.10], [XB, s * 0.66, zt + 0.10]];
      var inset = function (ring, t) {
        var cy = 0, cz = 0, k;
        for (k = 0; k < 4; k++) { cy += ring[k][1] / 4; cz += ring[k][2] / 4; }
        return ring.map(function (p) {
          return [p[0], p[1] + (p[1] > cy ? -t : t), p[2] + (p[2] > cz ? -t : t)];
        });
      };
      var Fi = inset(F, 0.05), Bi = inset(B2, 0.05), k2;
      for (k2 = 0; k2 < 4; k2++) {
        var k3 = (k2 + 1) % 4;
        K.skin.push(convex([[F[k2], F[k3], Fi[k3], Fi[k2]], [B2[k2], B2[k3], Bi[k3], Bi[k2]],
                            [F[k2], F[k3], B2[k3], B2[k2]], [Fi[k2], Fi[k3], Bi[k3], Bi[k2]],
                            [F[k2], Fi[k2], Bi[k2], B2[k2]], [F[k3], Fi[k3], Bi[k3], B2[k3]]]));
      }
      var lerp = function (a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; };
      var Mi = Fi.map(function (p, k) { return lerp(p, Bi[k], 0.15); });
      K.dark.push(solid(Mi, Bi));
      /* the splitter plate standing off the cockpit wall */
      K.skin.push(box(1.30, 0.025, 1.44, XL - 0.45, s * 0.665, -0.15));
    }

    /* ---- twin nozzles side by side at the tail (W: two engines) */
    for (s = -1; s <= 1; s += 2) {
      push(K.metal, loft([ls(-8.40, s * 0.47, -0.74, 0.44, 0.44), ls(-8.85, s * 0.47, -0.74, 0.44, 0.44),
                          ls(-9.15, s * 0.47, -0.74, 0.41, 0.41)], 28, null, 0));
      K.dark.push(aftDisc(0.35, 24, -9.16, s * 0.47, -0.74));
    }

    /* ---- wing panels, team strips */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(solid(wPart(WR, s, 0, 1), wPart(2.9, s, 0, 1)));
      K.skin.push(solid(wPart(2.9, s, 0, 1), wPart(WT, s, 0, 1)));
      var tb = function (yy) {
        var le = wLE(yy), te = wTE(yy), z = wZ(yy), h = wT(yy) * 0.47 + 0.01;
        return blk([le, s * yy, z], [te, s * yy, z], 0.30, 0.72, h, [0, 0, 1]);
      };
      K.team.push(solid(tb(3.70), tb(4.05)));
    }
    /* ---- all-moving tailplanes low on the rear body (A) */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(solid(foil([TP.le0, s * 1.00, TP.z], [TP.te0, s * 1.00, TP.z], 0.15, [0, 0, 1]),
                        foil([TP.le1, s * TP.y1, TP.z - TP.dz], [TP.te1, s * TP.y1, TP.z - TP.dz], 0.05, [0, 0, 1])));
    }
    /* ---- the tall single fin with its rudder  */
    K.skin.push(solid(finPart(FIN_Z0 - 0.15, 0, 0.80), finPart(2.0, 0, 0.80)));
    K.skin.push(solid(finPart(2.0, 0, 0.80), finPart(FIN_TOP, 0.02, 0.80, 0.7)));
    K.skin.push(solid(finPart(FIN_Z0 - 0.15, 0.81, 1.0), finPart(FIN_TOP - 0.05, 0.81, 1.0, 0.7)));
    /* ---- the big ventral fin under the tail, drawn extended (W) */
    (function () {
      var t = 0.05;
      var Q = [[VF.x0, 0, VF.zr], [VF.x1, 0, VF.zr], [VF.x2, 0, VF.zb], [VF.x3, 0, VF.zb]];
      K.skin.push(solid(Q.map(function (p) { return [p[0], t, p[2]]; }), Q.map(function (p) { return [p[0], -t, p[2]]; })));
    })();

    /* ---- pylons and four PL-5B (A): inner pair 1.82 m out, outer 2.97 m */
    [[1.82, 2.20], [2.97, 0.32]].forEach(function (st) {
      for (s = -1; s <= 1; s += 2) {
        var py = st[0], wz = wZ(py) - wT(py) * 0.40, zc = wz - 0.22;
        pylon(K.skin, st[1] - 0.6, st[1] - 2.3, s * py, wz + 0.02, zc + 0.10, 0.08);
        pl5(K, st[1], s * py, zc);
      }
    });

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.nose, T.nose, "radome");
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.msl, T.msl, "stores");

    /* ---- landing gear: the group the engine hides in flight */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nx = GEAR.nx, nr = 0.35, nz = GROUND + nr;
    G.metal.push(bar([nx + 0.15, 0, -0.90], [nx, 0, nz + 0.05], 0.06, 10));
    G.metal.push(cyl(0.04, 0.04, 0.40, 8, "y", nx, 0, nz));
    G.metal.push(bar([nx + 0.90, 0, -0.90], [nx + 0.02, 0, nz + 0.50], 0.03, 6));
    for (s = -1; s <= 1; s += 2) {
      G.tyre.push(cyl(nr, nr, 0.15, 22, "y", nx, s * 0.14, nz));
      G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.16, 12, "y", nx, s * 0.14, nz));
      G.skin.push(box(2.30, 0.02, 0.30, nx + 0.70, s * 0.30, -1.08));   /* bay doors (P) */
    }
    var mx = GEAR.mx, mr = 0.45, mz = GROUND + mr, my = GEAR.track / 2;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([mx + 0.10, s * (my - 0.15), wZ(my) - 0.10], [mx, s * (my - 0.05), mz + 0.10], 0.08, 10));
      G.metal.push(bar([mx + 1.00, s * (my - 0.75), -0.95], [mx + 0.05, s * (my - 0.10), mz + 0.65], 0.04, 6));
      G.tyre.push(cyl(mr, mr, 0.24, 26, "y", mx, s * my, mz));
      G.metal.push(cyl(mr * 0.55, mr * 0.55, 0.25, 14, "y", mx, s * my, mz));
      G.skin.push(box(1.40, 0.02, 0.80, mx + 0.05, s * (my + 0.20), -1.30));
    }
    /* ==================================================== DETAIL PASS ==
       The fittings the first pass left out, placed off A, B, P and W:
       their sizes are read through those references' scale and
       perspective, NOT measured. */
    var lampR = [], lampG = [];
    /* nav lamps on the wing tips' outer faces, port red and starboard green;
       the white tail lamp at the fin tip's trailing edge */
    var tipX = (wLE(WT) + wTE(WT)) / 2;
    lampR.push(sph(0.05, 8, 6, tipX, WT - 0.04, wZ(WT), 1.6, 0.6, 0.7));
    lampG.push(sph(0.05, 8, 6, tipX, -WT + 0.04, wZ(WT), 1.6, 0.6, 0.7));
    K.metal.push(sph(0.04, 8, 5, -10.15, 0, 2.38, 1.3, 0.8, 1.0));
    /* anti-collision beacons on the spine and under the belly */
    K.dark.push(cyl(0.055, 0.06, 0.04, 10, "z", 0.0, 0, 0.49)); lampR.push(sph(0.045, 10, 6, 0.0, 0, 0.52, 1, 1, 0.8));
    K.dark.push(cyl(0.055, 0.06, 0.04, 10, "z", -1.5, 0, -1.08)); lampR.push(sph(0.045, 10, 6, -1.5, 0, -1.11, 1, 1, 0.8));
    /* blade aerials on the spine and the belly, the IFF blades under the nose */
    function blade(x, z, h, c, y) {
      var r = Math.abs(h) * 0.45;
      K.skin.push(solid([[x + c / 2, (y || 0) + 0.01, z], [x - c / 2, (y || 0) + 0.01, z], [x - c / 2 - r, (y || 0) + 0.01, z + h], [x - c / 2 - r + c * 0.45, (y || 0) + 0.01, z + h]],
                        [[x + c / 2, (y || 0) - 0.01, z], [x - c / 2, (y || 0) - 0.01, z], [x - c / 2 - r, (y || 0) - 0.01, z + h], [x - c / 2 - r + c * 0.45, (y || 0) - 0.01, z + h]]));
    }
    blade(2.2, 0.56, 0.22, 0.30); blade(-3.2, 0.14, 0.16, 0.24);
    blade(1.0, -1.10, -0.18, 0.26); blade(-4.4, -1.12, -0.14, 0.22); blade(8.0, -0.58, -0.10, 0.14);
    /* the intakes' bright lips */
    for (s = -1; s <= 1; s += 2) {
      K.metal.push(bar([4.15, s * 0.70, 0.57], [4.15, s * 1.12, 0.57], 0.018, 5), bar([4.15, s * 1.12, 0.57], [4.15, s * 1.12, -0.87], 0.018, 5));
      K.metal.push(bar([4.15, s * 1.12, -0.87], [4.15, s * 0.70, -0.87], 0.018, 5));
      /* the nozzles' liners, flame holder rings and petal seams */
      K.dark.push(cyl(0.40, 0.40, 0.30, 20, "x", -8.95, s * 0.47, -0.74));
      K.metal.push(place(new V.TorusGeometry(0.25, 0.022, 5, 18), -8.85, s * 0.47, -0.74, 0, PI / 2, 0));
      for (var pq = 0; pq < 12; pq++) {
        var pa = pq * PI / 6;
        K.dark.push(box(0.30, 0.012, 0.012, -9.0, s * 0.47 + Math.cos(pa) * 0.425, -0.74 + Math.sin(pa) * 0.425));
      }
      /* the angle-of-attack vanes either side of the nose */
      K.metal.push(box(0.10, 0.02, 0.06, 8.20, s * 0.63, 0.10));
    }
    /* gear: oleo pistons, torque links, hub caps, the taxi lamps on the
       nose leg */
    G.metal.push(bar([nx + 0.02, 0, nz + 0.05], [nx + 0.08, 0, nz + 0.60], 0.045, 10));
    G.metal.push(cyl(0.075, 0.075, 0.06, 10, "z", nx + 0.08, 0, nz + 0.62));
    G.metal.push(bar([nx + 0.02, 0, nz + 0.10], [nx + 0.20, 0, nz + 0.35], 0.012, 4), bar([nx + 0.20, 0, nz + 0.35], [nx + 0.08, 0, nz + 0.58], 0.012, 4));
    G.metal.push(sph(0.06, 8, 6, nx + 0.20, 0.08, nz + 0.90), sph(0.06, 8, 6, nx + 0.20, -0.08, nz + 0.90));
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(cyl(0.12, 0.12, 0.02, 12, "y", nx, s * 0.225, nz), cyl(0.03, 0.03, 0.04, 8, "y", nx, s * 0.24, nz));
      G.metal.push(bar([mx, s * (my - 0.06), mz + 0.10], [mx + 0.03, s * (my - 0.08), mz + 0.80], 0.055, 10));
      G.metal.push(cyl(0.10, 0.10, 0.07, 10, "z", mx + 0.03, s * (my - 0.08), mz + 0.82));
      G.metal.push(bar([mx - 0.03, s * (my - 0.06), mz + 0.15], [mx - 0.24, s * (my - 0.08), mz + 0.45], 0.014, 4), bar([mx - 0.24, s * (my - 0.08), mz + 0.45], [mx, s * (my - 0.08), mz + 0.78], 0.014, 4));
      G.metal.push(cyl(0.16, 0.16, 0.02, 14, "y", mx, s * (my + 0.13), mz), cyl(0.04, 0.04, 0.04, 8, "y", mx, s * (my + 0.14), mz));
      G.dark.push(cyl(0.28, 0.28, 0.04, 14, "y", mx, s * (my - 0.13), mz));
    }

    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.dark, T.dark, "gear_dark");
    mesh(g, lampR, new V.MeshStandardMaterial({ color: 0xc8261e, roughness: 0.3, metalness: 0.1, emissive: 0x8a1410, emissiveIntensity: 0.6 }), "lamp_red");
    mesh(g, lampG, new V.MeshStandardMaterial({ color: 0x1fa64a, roughness: 0.3, metalness: 0.1, emissive: 0x0e6a2c, emissiveIntensity: 0.6 }), "lamp_green");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.skin, T.skin, "gear_doors", true);
    return g;
  }

  return { build: function (THREE, M, C) { return buildAirframe(THREE, C); } };
})();

/* len is the measured x extent: probe tip (11.12) to the fin's trailing-edge
   tip (-10.27); published 21.39 m with the probe (W) */
UNIT_MODELS["pla_e80_fighter"] = { len: 21.39, build: function (THREE, M, C) { return HeroJ8.build(THREE, M, C); } };
