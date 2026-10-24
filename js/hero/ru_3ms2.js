/* ================= ru_3ms2.js  -  HERO MODEL =================
   Myasishchev 3MS-2 tanker (pact_e60_tanker): a 3MS-1 "Bison-B" bomber
   converted to a probe-and-drogue tanker (hose-drum unit and fuel in the bomb
   bay). Redrawn 2026-10-24 from a three-view and photographs, full quality.

   References (Wikimedia Commons, each fetched once at width=960, generic UA):
     [3V]  "Myasishchev 3M three-view silhouette.png" (3M "Bison-B" plan,
           profile and front view). Everything below is measured off it at
           53.14 m span (0.182 m a pixel); the length it then gives, 47.3 m
           nose to tail cone plus the probe, agrees with the drawing's
           own profile and plan to the pixel.
     [NS]  "Myasishchev Bison variants nose silhouettes.png": the 3M nose is
           the blunt solid nose with the small stepped chin glazing, NOT the
           M-4's glazed navigator's nose.
     [E1]  "Myasishchev 3MS-2, Russia - Air Force AN1777838.jpg" and
     [E2]  "ZMS-2 Engels.JPG": the preserved 3MS-2 at Engels, low front
           three-quarter and head-on. Solid round nose with its radome seam,
           a dark round socket on top of the nose where the probe mounts (no
           probe fitted), the three-pane chin glazing, the framed pilots'
           canopy, three small side windows, the round sighting blister on
           each side behind the cockpit, the two intakes per side side by
           side in the wing roots (the outer one set back), the long front
           truck with its doors open beside it.
     [P66] "F-4B VF-21 intercepting Soviet Bison c1966.jpg" (USN): 3M side
           profile, overall natural metal, red star on the fin, outrigger pod
           under the wingtip, tailplane high on the fin root.
     [P68] "Myasishchev 3M Bison in flight 1968.jpg": the plan from above,
           two wing fences a side, the wingtip pods, intakes ahead of the
           leading edge, jet pipes past the trailing edge.
     [P82] "Soviet M-4 Bison bomber from below 1982.JPEG": belly, fin star.
     [UM]  "Myasishchev 3M at the UMMC Museum (2026-06-20).jpg" and
     [MO]  "Myasischev 3M Bison.JPG" (Monino 3MD), head-on: the wing root is
           MID-SET on the deep round fuselage (the nacelle pairs bulge above
           and below it), the front truck is a 2 x 2 bogie.
     Published figures: span 53.14 m for the 3M wing (ru.wikipedia, VM-T, the
     3M airframe); height 14.1 m (en.wikipedia; the drawing gives 14.15 m with
     the ground set by it). English Wikipedia (Airvectors): the tanker
     conversions fitted a hose-drum unit and fuel tanks in the bomb bay and
     removed all defensive armament; the 3MS-1 became the 3MS-2.

   Recognition list (where each shows):
     1. very long, slender round fuselage, 3.1 m wide, 47.3 m long [3V];
     2. the blunt solid radome nose with its seam and the probe socket on
        top, no probe [E1][E2][NS];
     3. the stepped three-pane chin glazing under the nose [E1][E2][NS];
     4. the framed pilots' canopy flush with the spine, three side windows,
        a sighting blister each side [E1][E2][3V];
     5. mid-set, thin wing, 37.4 deg leading edge, 26.6 deg trailing edge,
        slight anhedral to the tips (front view) [3V][UM][MO];
     6. four engines buried in the roots in side-by-side pairs, intakes
        ahead of the leading edge (outer one 1.65 m further aft), jet pipes
        past the trailing edge [3V][E2][P68];
     7. two wing fences a side [3V][P68];
     8. long wingtip pods carrying the outrigger wheels [3V][P66][P68];
     9. the tall, 50 deg swept fin with its dorsal fillet [3V][P66];
    10. the swept tailplane set on the fin root above the fuselage, tips
        reaching past the tail cone [3V];
    11. bicycle gear: two four-wheel trucks under the fuselage and the
        outrigger legs under the tip pods [E1][E2][MO];
    12. overall natural metal with a red star on each side of the fin
        [P66][P82].
   Changed from the earlier model, after the references:
     - span 53.14 m (the 3M wing), not the M-4's 50.5 m;
     - the nose is the 3M's solid nose with the chin glazing, not glazed;
     - the wing is mid-set (front view of [3V], [UM], [MO]);
     - the engines are buried in the roots, not round pods ahead of the wing;
     - the tailplane sits on the fin root, not low on the fuselage;
     - no dorsal or ventral gun blisters and no tail-gun barrels: the
       tanker conversion removed the defensive armament (above); the
       tail-gunner's glazed station stays as part of the structure.
   NOT confirmed and left out or kept plain:
     - the hose-drum unit: no photograph of its outside was found, so only
       the bomb-bay door outline is drawn; no drogue, no hose fairing;
     - the gear positions (front truck d = 11.5 m, rear d = 26.6 m) are
       placed from the photographs, not measured off a drawing;
     - wing stars (seen in [P68] and [MO], left out as ru_a50.js does);
     - the white undersides of the Engels aircraft are a museum repaint;
     - no bort number, no unit mark, no text.
   Paint: natural metal, a light aluminium off [E1] and [P66] taken to about
   0.85 of its level (#b9bfc2), panel lines and sheet tones in a canvas.

   Parking: see tools/jsc/parked3d_check.js; the measured result is in the
   round's report.

   Model space: +X nose, +Y left (port), +Z up, metres; d is metres aft of
   the nose tip; the fuselage axis is z = 0, the ground z = -4.15. One mesh
   per material. The gear RETRACTS (the trucks into the fuselage, the
   outriggers into the tip pods), so it is a group named "gear" and the tyres
   are the lowest opaque thing. Team colour exactly C.team: a small strip on
   each upper wingtip, nothing else.
   ========================================================================= */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMya3MS2 = (function () {
  "use strict";

  var NOSE = 24.6, GROUND = -4.15;
  function X(d) { return NOSE - d; }
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* fuselage stations off [3V]: d, half-width, half-height, centre z */
  var FUS = [
    [0.00, 0.05, 0.05, -0.64], [0.20, 0.36, 0.42, -0.64], [0.50, 0.53, 0.62, -0.63], [0.91, 0.67, 0.82, -0.62],
    [1.46, 0.85, 1.07, -0.57], [2.55, 1.08, 1.28, -0.53], [3.64, 1.25, 1.33, -0.48], [4.19, 1.33, 1.52, -0.30],
    [4.73, 1.41, 1.64, -0.18], [5.30, 1.47, 1.71, -0.09], [6.90, 1.54, 1.73, -0.05], [9.00, 1.56, 1.76, 0.00],
    [12.0, 1.56, 1.78, 0.01], [30.0, 1.55, 1.78, 0.01], [33.5, 1.53, 1.70, 0.10], [35.1, 1.50, 1.62, 0.16],
    [36.4, 1.45, 1.53, 0.26], [38.0, 1.37, 1.44, 0.37], [40.2, 1.20, 1.22, 0.58], [42.0, 1.02, 1.06, 0.72],
    [44.0, 0.84, 0.88, 0.88], [46.2, 0.62, 0.68, 1.04], [47.3, 0.44, 0.50, 1.10], [47.9, 0.10, 0.12, 1.12]
  ];
  var BODY = 47.9;
  /* wing: y, leading-edge d, trailing-edge d (off the plan of [3V]) */
  var WING = [[1.2, 15.0, 26.2], [1.8, 15.0, 26.2], [5.5, 17.55, 26.4], [7.6, 19.3, 27.1], [10.4, 21.66, 28.39],
    [14.0, 24.57, 30.21], [17.65, 27.3, 32.03], [21.3, 29.85, 33.85], [24.9, 32.76, 35.67], [25.95, 33.55, 36.25]];
  function wz(y) { return 0.30 - 0.044 * (Math.abs(y) - 1.2); }
  function wtc(y) { return 0.14 - 0.05 * Math.min(1, Math.max(0, (Math.abs(y) - 1.2) / 24.75)); }
  /* fin: z, LE d, TE d, t/c;  tailplane on the fin root: y, LE d, TE d */
  var FIN = [[1.3, 32.5, 46.7, 0.06], [1.95, 35.0, 46.65, 0.10], [2.6, 36.9, 46.75, 0.10], [6.0, 40.9, 47.3, 0.09], [10.0, 45.1, 47.9, 0.08]];
  var STAB = [[0.2, 42.0, 47.1], [2.4, 43.1, 47.3], [5.6, 45.4, 48.6], [7.75, 46.8, 49.5]];
  var STABZ = 2.6;
  /* engines: centre y, intake-lip d, jet-pipe end d */
  var ENG = [[2.65, 14.0, 26.4], [4.5, 15.65, 27.3]];
  var ENGZ = 0.36;
  var DTRUCK = [11.5, 26.6], YTIP = 26.3, DOUT = 34.1;

  var _sheet;
  function skinSheet(THREE) {
    if (_sheet !== undefined) return _sheet;
    var tex = null;
    try {
      /* 1024 px over 40 m: sheets, frames every 1.2 m, stringer lines */
      var S = 1024, cv = document.createElement("canvas");
      cv.width = S; cv.height = S;
      var g = cv.getContext("2d"), R = rngFor(3021), i, k;
      g.fillStyle = "#b9bfc2"; g.fillRect(0, 0, S, S);
      for (k = 0; k < 260; k++) {
        var t = R();
        g.fillStyle = t < 0.33 ? "#c3c8cb" : (t < 0.66 ? "#b0b6b9" : "#bcc2c4");
        var w = 31 * (1 + Math.floor(R() * 3)), h = 20 + Math.floor(R() * 4) * 16;
        g.fillRect(Math.floor(R() * 33) * 31, Math.floor(R() * 64) * 16, w, h);
      }
      g.strokeStyle = "rgba(40,46,50,0.30)"; g.lineWidth = 1.2;
      for (i = 0; i < S; i += 31) { g.beginPath(); g.moveTo(i + 0.5, 0); g.lineTo(i + 0.5, S); g.stroke(); }
      g.strokeStyle = "rgba(40,46,50,0.18)"; g.lineWidth = 1;
      for (i = 0; i < S; i += 16) { g.beginPath(); g.moveTo(0, i + 0.5); g.lineTo(S, i + 0.5); g.stroke(); }
      g.fillStyle = "rgba(30,34,38,0.30)";
      for (k = 0; k < 900; k++) g.fillRect(Math.floor(R() * 33) * 31 - 1, R() * S, 2, 1);
      tex = new THREE.CanvasTexture(cv);
      tex.encoding = THREE.sRGBEncoding;
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.anisotropy = 4;
    } catch (e) { tex = null; }
    _sheet = tex;
    return tex;
  }
  /* ---------------------------------------------------------- geometry */
  function geoFrom(THREE, pos, idx) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    return g;
  }
  function gridGeo(THREE, rings, capA, capB, open) {
    var nr = rings.length, N = rings[0].length, pos = [], idx = [], i, j, M = open ? N - 1 : N;
    for (i = 0; i < nr; i++) for (j = 0; j < N; j++) pos.push(rings[i][j][0], rings[i][j][1], rings[i][j][2]);
    for (i = 0; i < nr - 1; i++) for (j = 0; j < M; j++) {
      var a = i * N + j, b = i * N + (j + 1) % N, c = (i + 1) * N + j, d = (i + 1) * N + (j + 1) % N;
      idx.push(a, c, b, b, c, d);
    }
    function cap(r, base, flip) {
      var cx = 0, cy = 0, cz = 0, k;
      for (k = 0; k < N; k++) { cx += r[k][0]; cy += r[k][1]; cz += r[k][2]; }
      var ci = pos.length / 3;
      pos.push(cx / N, cy / N, cz / N);
      for (k = 0; k < N; k++) {
        var a = base + k, b = base + (k + 1) % N;
        if (flip) idx.push(ci, b, a); else idx.push(ci, a, b);
      }
    }
    if (capA) cap(rings[0], 0, false);
    if (capB) cap(rings[nr - 1], (nr - 1) * N, true);
    return geoFrom(THREE, pos, idx);
  }
  function outward(g) {
    var p = g.attributes.position.array, ix = g.index.array, n = p.length / 3, cx = 0, cy = 0, cz = 0, i, v = 0;
    for (i = 0; i < n; i++) { cx += p[3 * i]; cy += p[3 * i + 1]; cz += p[3 * i + 2]; }
    cx /= n; cy /= n; cz /= n;
    for (i = 0; i < ix.length; i += 3) {
      var a = 3 * ix[i], b = 3 * ix[i + 1], c = 3 * ix[i + 2];
      var ax = p[a] - cx, ay = p[a + 1] - cy, az = p[a + 2] - cz;
      var bx = p[b] - cx, by = p[b + 1] - cy, bz = p[b + 2] - cz;
      var qx = p[c] - cx, qy = p[c + 1] - cy, qz = p[c + 2] - cz;
      v += ax * (by * qz - bz * qy) + ay * (bz * qx - bx * qz) + az * (bx * qy - by * qx);
    }
    if (v < 0) for (i = 0; i < ix.length; i += 3) { var t = ix[i + 1]; ix[i + 1] = ix[i + 2]; ix[i + 2] = t; }
    return g;
  }
  function planarUV(THREE, g) {
    var p = g.attributes.position.array, n = p.length / 3, uv = new Float32Array(n * 2), i;
    for (i = 0; i < n; i++) { uv[2 * i] = p[3 * i] / 40; uv[2 * i + 1] = (p[3 * i + 1] + 0.55 * p[3 * i + 2]) / 40; }
    g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  }
  function emit(THREE, grp, g, mat, noFlip) {
    if (!noFlip) outward(g);
    g.computeVertexNormals();
    planarUV(THREE, g);
    grp.add(new THREE.Mesh(g, mat));
  }
  function plate(THREE, ol, y0, t) {
    var n = ol.length, pos = [], idx = [], i;
    for (i = 0; i < n; i++) pos.push(ol[i][0], y0 + t, ol[i][1]);
    for (i = 0; i < n; i++) pos.push(ol[i][0], y0 - t, ol[i][1]);
    for (i = 1; i < n - 1; i++) { idx.push(0, i, i + 1); idx.push(n, n + i + 1, n + i); }
    for (i = 0; i < n; i++) { var j = (i + 1) % n; idx.push(i, n + i, j, j, n + i, n + j); }
    var g = geoFrom(THREE, pos, idx);
    g.computeVertexNormals();
    return g;
  }
  function taper(THREE, mat, a, b, r0, r1, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], Ln = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r0, Ln, seg || 8, 1), mat);
    m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / Ln, dy / Ln, dz / Ln));
    return m;
  }
  function box(THREE, mat, sx, sy, sz, px, py, pz) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
    m.position.set(px, py, pz);
    return m;
  }
  function egg(THREE, mat, rx, ry, rz, x, y, z, ws, hs) {
    var geo = new THREE.SphereGeometry(1, ws || 12, hs || 8);
    geo.rotateZ(Math.PI / 2);
    geo.scale(rx, ry, rz);
    geo.translate(x, y, z);
    planarUV(THREE, geo);
    return new THREE.Mesh(geo, mat);
  }
  function disc(THREE, mat, r, x, y, z, n, flip) {
    var m = new THREE.Mesh(new THREE.CircleGeometry(r, n || 14), mat);
    m.rotation.y = flip ? -Math.PI / 2 : Math.PI / 2;
    m.position.set(x, y, z);
    return m;
  }
  function naca(x, tc) {
    return 5 * tc * (0.2969 * Math.sqrt(x) - 0.1260 * x - 0.3516 * x * x + 0.2843 * x * x * x - 0.1036 * x * x * x * x);
  }
  function foil(n, tc, cam) {
    var pts = [], i, x;
    for (i = 0; i < n; i++) {
      x = 0.5 * (1 + Math.cos(Math.PI * i / (n - 1)));
      pts.push([x, cam * 4 * x * (1 - x) + naca(x, tc)]);
    }
    for (i = n - 2; i >= 1; i--) {
      x = 0.5 * (1 + Math.cos(Math.PI * i / (n - 1)));
      pts.push([x, cam * 4 * x * (1 - x) - naca(x, tc)]);
    }
    return pts;
  }
  function cr1(p0, p1, p2, p3, t) {
    var t2 = t * t, t3 = t2 * t;
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
  }
  function lathe(THREE, prof, N, x0, yc, zc, capA, capB) {
    var rings = [], i, j;
    for (i = 0; i < prof.length; i++) {
      var w = Math.max(prof[i][1], 0.004), r = [];
      for (j = 0; j < N; j++) { var t = j / N * Math.PI * 2; r.push([x0 - prof[i][0], yc + w * Math.cos(t), zc + w * Math.sin(t)]); }
      rings.push(r);
    }
    return gridGeo(THREE, rings, capA, capB);
  }

  /* ---------------------------------------------------------- fuselage */
  function fusAt(d) {
    var k = 0, q;
    for (q = 0; q < FUS.length - 1; q++) if (FUS[q][0] <= d) k = q;
    var A = FUS[k], B = FUS[Math.min(k + 1, FUS.length - 1)], t = Math.min(1, (d - A[0]) / Math.max(1e-6, B[0] - A[0]));
    var p0 = FUS[Math.max(0, k - 1)], p3 = FUS[Math.min(FUS.length - 1, k + 2)], r = [d], c;
    for (c = 1; c < 4; c++) r.push(cr1(p0[c], A[c], B[c], p3[c], t));
    r[1] = Math.max(0.02, r[1]); r[2] = Math.max(0.02, r[2]);
    return r;
  }
  /* a point on the skin: d, angle t (0 = port side, pi/2 = top), out = offset */
  function fusPt(d, t, out) {
    var s = fusAt(d), o = out || 0;
    return [X(d), (s[1] + o) * Math.cos(t), s[3] + (s[2] + o) * Math.sin(t)];
  }
  /* a patch of the skin, lifted by `out` (windows, frames, seams) */
  function fusPatch(THREE, d0, d1, t0, t1, out, nd, nt) {
    var rings = [], i, j;
    for (i = 0; i <= nd; i++) {
      var d = d0 + (d1 - d0) * i / nd, r = [];
      for (j = 0; j <= nt; j++) r.push(fusPt(d, t0 + (t1 - t0) * j / nt, out));
      rings.push(r);
    }
    var pos = [], idx = [], N = nt + 1;
    for (i = 0; i <= nd; i++) for (j = 0; j <= nt; j++) pos.push(rings[i][j][0], rings[i][j][1], rings[i][j][2]);
    for (i = 0; i < nd; i++) for (j = 0; j < nt; j++) {
      var a = i * N + j, b = a + 1, c = a + N, e = c + 1;
      idx.push(a, b, c, b, e, c);
    }
    var g = geoFrom(THREE, pos, idx);
    g.computeVertexNormals();
    planarUV(THREE, g);
    return g;
  }
  function addFuselage(THREE, g, T) {
    var rings = [], i, j, N = 26, ds = [];
    for (i = 0; i <= 18; i++) ds.push(6.9 * Math.pow(i / 18, 1.35));
    for (d = 8.2; d < 33; d += 2.0) ds.push(d);
    for (var d = 33.5; d < BODY - 0.01; d += 0.9) ds.push(d);
    ds.push(BODY);
    ds.sort(function (a, b) { return a - b; });
    for (i = 0; i < ds.length; i++) {
      var ring = [];
      for (j = 0; j < N; j++) ring.push(fusPt(ds[i], j / N * Math.PI * 2, 0));
      rings.push(ring);
    }
    emit(THREE, g, gridGeo(THREE, rings, true, true), T.skin);
    /* the radome seam ring and the probe socket on top of the nose [E1][E2] */
    g.add(new THREE.Mesh(fusPatch(THREE, 2.55, 2.62, 0, Math.PI * 2, 0.012, 1, 30), T.metal));
    var s0 = fusAt(0.8);
    g.add(taper(THREE, T.ink, [X(1.15), 0, s0[3] + s0[2] - 0.20], [X(0.62), 0, s0[3] + s0[2] - 0.12], 0.15, 0.13, 10));
    g.add(disc(THREE, T.metal, 0.07, X(0.61), 0, s0[3] + s0[2] - 0.12, 8));
    /* the bomb-bay door outline on the belly (the hose unit's place; its outside look is not confirmed) */
    var bz = -1.77 - 0.012, b;
    for (b = -1; b <= 1; b += 2) g.add(box(THREE, T.ink, 9.6, 0.06, 0.03, X(20.3), b * 0.78, bz));
    g.add(box(THREE, T.ink, 9.6, 0.04, 0.03, X(20.3), 0, bz));
    g.add(box(THREE, T.ink, 0.06, 1.6, 0.03, X(15.5), 0, bz));
    g.add(box(THREE, T.ink, 0.06, 1.6, 0.03, X(25.1), 0, bz));
  }
  function addCockpit(THREE, g, T) {
    var P = Math.PI, s, k;
    /* the pilots' canopy, framed, flush with the spine [E2][3V] */
    g.add(new THREE.Mesh(fusPatch(THREE, 4.25, 8.1, 0.30 * P, 0.70 * P, 0.03, 8, 8), T.glass));
    [4.25, 4.95, 5.75, 6.6, 7.4, 8.1].forEach(function (d) {
      g.add(new THREE.Mesh(fusPatch(THREE, d - 0.04, d + 0.04, 0.29 * P, 0.71 * P, 0.055, 1, 8), T.frame));
    });
    [0.30, 0.43, 0.5, 0.57, 0.70].forEach(function (f) {
      g.add(new THREE.Mesh(fusPatch(THREE, 4.25, 8.1, (f - 0.006) * P, (f + 0.006) * P, 0.055, 8, 1), T.frame));
    });
    /* three small side windows each side [E1] */
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 3; k++) {
      var d0 = 4.55 + k * 0.62, ta = s > 0 ? 0.13 * P : P - 0.13 * P - 0.11 * P;
      g.add(new THREE.Mesh(fusPatch(THREE, d0, d0 + 0.42, ta, ta + 0.11 * P, 0.025, 2, 2), T.glass));
    }
    /* the round sighting blister each side behind the cockpit [E1][3V] */
    for (s = -1; s <= 1; s += 2) {
      var f = fusAt(9.0);
      g.add(egg(THREE, T.glass, 0.62, 0.30, 0.48, X(9.0), s * (f[1] - 0.06), -0.35, 12, 8));
    }
    /* the stepped chin glazing: a faired step with three flat panes [E1][E2][NS] */
    var c0 = fusAt(3.8);
    emit(THREE, g, lathe(THREE, [[0, 0.04], [0.35, 0.34], [0.9, 0.44], [1.6, 0.44], [2.1, 0.30], [2.4, 0.04]], 14,
      X(2.55), 0, c0[3] - c0[2] + 0.30, true, true), T.skin);
    var cz = c0[3] - c0[2] + 0.30;
    for (k = -1; k <= 1; k++) {
      g.add(box(THREE, T.glass, 0.05, 0.24, 0.26, X(2.60), k * 0.27, cz - 0.02));
    }
    g.add(box(THREE, T.glass, 0.9, 0.62, 0.04, X(3.2), 0, cz - 0.44));
  }

  /* ---------------------------------------------------------- tail */
  function addTail(THREE, g, T) {
    var rings = [], s;
    FIN.forEach(function (f) {
      var c = f[2] - f[1];
      rings.push(foil(11, f[3], 0).map(function (p) { return [X(f[1] + p[0] * c), p[1] * c, f[0]]; }));
    });
    emit(THREE, g, gridGeo(THREE, rings, true, true), T.skin);
    for (s = -1; s <= 1; s += 2) {
      var sr = STAB.map(function (st) {
        var y = st[0], c = st[2] - st[1], tc = 0.09 - 0.025 * Math.min(1, y / 7.75);
        return foil(11, tc, 0).map(function (p) { return [X(st[1] + p[0] * c), s * y, STABZ + p[1] * c]; });
      });
      emit(THREE, g, gridGeo(THREE, sr, true, true), T.skin);
    }
    /* the red star, white-bordered, on each side of the fin [P66][P82] */
    var fz = 6.4, a = FIN[3], b = FIN[4], t = (fz - a[0]) / (b[0] - a[0]);
    var dl = a[1] + (b[1] - a[1]) * t, dt = a[2] + (b[2] - a[2]) * t, tc = a[3] + (b[3] - a[3]) * t, c = dt - dl;
    var hy = naca(0.5, tc) * c + 0.015;
    for (s = -1; s <= 1; s += 2) star(THREE, g, T, dl + 0.5 * c, s * hy, fz, 1.0, s);
    /* the tail-gunner's glazed station (the guns went with the conversion) */
    for (s = -1; s <= 1; s += 2) {
      var ta = s > 0 ? 0.04 * Math.PI : Math.PI - 0.04 * Math.PI - 0.30 * Math.PI;
      g.add(new THREE.Mesh(fusPatch(THREE, 45.7, 46.9, ta, ta + 0.30 * Math.PI, 0.02, 3, 4), T.glass));
    }
    g.add(new THREE.Mesh(fusPatch(THREE, 47.0, 47.75, 0, Math.PI * 2, 0.015, 2, 16), T.metal));
  }
  function star(THREE, g, T, dC, yS, zC, r, side) {
    [[r, "white"], [r * 0.78, "red"]].forEach(function (lay, li) {
      var pos = [X(dC), yS + side * 0.012 * (li + 1), zC], idx = [], k, rr;
      for (k = 0; k < 10; k++) {
        rr = (k & 1) ? lay[0] * 0.4 : lay[0];
        var a = Math.PI / 2 + k * Math.PI / 5;
        pos.push(X(dC) - rr * Math.cos(a), yS + side * 0.012 * (li + 1), zC + rr * Math.sin(a));
      }
      for (k = 0; k < 10; k++) idx.push(0, 1 + k, 1 + (k + 1) % 10);
      var m = new THREE.Mesh(geoFrom(THREE, pos, idx), T[lay[1]]);
      m.geometry.computeVertexNormals();
      g.add(m);
    });
  }

  /* ---------------------------------------------------------- wings */
  function wingAt(y) {
    var i, a, b, t;
    y = Math.abs(y);
    if (y <= WING[0][0]) return { dLE: WING[0][1], dTE: WING[0][2] };
    for (i = 1; i < WING.length; i++) if (WING[i][0] >= y) {
      a = WING[i - 1]; b = WING[i]; t = (y - a[0]) / (b[0] - a[0]);
      return { dLE: a[1] + (b[1] - a[1]) * t, dTE: a[2] + (b[2] - a[2]) * t };
    }
    b = WING[WING.length - 1];
    return { dLE: b[1], dTE: b[2] };
  }
  function wingSkin(y, f, up) {
    var w = wingAt(y), c = w.dTE - w.dLE, cam = 0.01, tc = wtc(y);
    var yy = cam * 4 * f * (1 - f) + up * naca(f, tc);
    return [X(w.dLE + f * c), wz(y) + yy * c];
  }
  function addWings(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      var rings = WING.map(function (st) {
        var y = st[0], c = st[2] - st[1];
        return foil(15, wtc(y), 0.01).map(function (p) { return [X(st[1] + p[0] * c), s * y, wz(y) + p[1] * c]; });
      });
      emit(THREE, g, gridGeo(THREE, rings, false, true), T.skin);
      /* two fences a side [3V][P68] */
      [9.5, 17.1].forEach(function (y) {
        var ol = [], f;
        for (f = 0; f <= 0.75001; f += 0.125) { var p = wingSkin(y, f, 1); ol.push([p[0], p[1] + 0.30 * (1 - f * 0.6)]); }
        for (f = 0.75; f >= -0.0001; f -= 0.25) { var q = wingSkin(y, f, 1); ol.push([q[0], q[1] - 0.02]); }
        ol.push([X(wingAt(y).dLE) + 0.12, wz(y) - 0.05]);
        g.add(new THREE.Mesh(plate(THREE, ol, s * y, 0.025), T.skin));
      });
      /* team strip on the upper wingtip */
      var pos = [], idx = [], i, j, y0 = 22.0, y1 = 24.6, NY = 3, NF = 3;
      for (i = 0; i <= NY; i++) for (j = 0; j <= NF; j++) {
        var yy = y0 + (y1 - y0) * i / NY, ff = 0.25 + 0.4 * j / NF, pp = wingSkin(yy, ff, 1);
        pos.push(pp[0], s * yy, pp[1] + 0.025);
      }
      for (i = 0; i < NY; i++) for (j = 0; j < NF; j++) {
        var a = i * (NF + 1) + j, b = a + 1, c = a + NF + 1, d = c + 1;
        if (s > 0) idx.push(a, b, c, b, d, c); else idx.push(a, c, b, b, c, d);
      }
      var tg = geoFrom(THREE, pos, idx);
      tg.computeVertexNormals();
      g.add(new THREE.Mesh(tg, T.team));
      /* the wingtip pod that takes the outrigger [3V][P66][P68] */
      emit(THREE, g, lathe(THREE, [[0, 0.04], [0.45, 0.20], [1.3, 0.31], [3.9, 0.31], [5.0, 0.17], [5.45, 0.04]], 14,
        X(31.45), s * YTIP, wz(YTIP) - 0.16, true, true), T.skin);
    }
  }

  /* ---------------------------------------------------------- engines */
  function addEngines(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) for (var e = 0; e < 2; e++) {
      var E = ENG[e], yc = s * E[0], L = E[2] - E[1];
      /* the nacelle, from inside the intake lip to the jet pipe (buried in the root) */
      emit(THREE, g, lathe(THREE, [[0.55, 0.70], [0.08, 0.74], [0.0, 0.80], [0.10, 0.88], [0.6, 0.93], [3.0, 0.95],
        [L - 3.2, 0.93], [L - 1.6, 0.78], [L - 0.5, 0.62], [L, 0.57]], 18, X(E[1]), yc, ENGZ, false, false), T.skin);
      /* the deeper lower half of the nacelle under the wing [E2][UM][MO] */
      emit(THREE, g, lathe(THREE, [[0, 0.05], [0.5, 0.40], [1.4, 0.60], [6.5, 0.62], [9.0, 0.50], [10.2, 0.05]], 12,
        X(E[1] + 0.6), yc, ENGZ - 1.2, true, true), T.skin);
      /* intake: dark duct and the engine face; jet pipe: dark nozzle */
      g.add(disc(THREE, T.ink, 0.71, X(E[1] + 0.55), yc, ENGZ, 20));
      g.add(disc(THREE, T.metal, 0.30, X(E[1] + 0.50), yc, ENGZ, 12));
      emit(THREE, g, lathe(THREE, [[L, 0.57], [L - 0.05, 0.50], [L - 0.6, 0.46]], 18, X(E[1]), yc, ENGZ, false, false), T.ink);
      g.add(disc(THREE, T.ink, 0.47, X(E[2] - 0.6), yc, ENGZ, 16, true));
    }
  }

  /* ---------------------------------------------------------- gear */
  function addGear(THREE, g, T) {
    var gear = new THREE.Group(), s, o, k;
    gear.name = "gear";
    function wheel(R, W, x, y, z) {
      var t = new THREE.Mesh(new THREE.CylinderGeometry(R, R, W, 14, 1), T.tyre);
      t.position.set(x, y, z);
      gear.add(t);
      var h = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.55, R * 0.55, W + 0.03, 8, 1), T.metal);
      h.position.set(x, y, z);
      gear.add(h);
    }
    /* bicycle gear: a 2 x 2 truck ahead of and one behind the bomb bay [E1][E2][MO] */
    var R = 0.62, mz = GROUND + R;
    for (k = 0; k < 2; k++) {
      var dk = DTRUCK[k], top = fusAt(dk)[3] - fusAt(dk)[2] + 0.1;
      for (s = -1; s <= 1; s += 2) for (o = -1; o <= 1; o += 2) wheel(R, 0.36, X(dk + o * 0.80), s * 0.50, mz);
      gear.add(box(THREE, T.metal, 2.0, 0.22, 0.22, X(dk), 0, mz + 0.05));
      for (o = -1; o <= 1; o += 2) gear.add(taper(THREE, T.metal, [X(dk + o * 0.8), -0.72, mz], [X(dk + o * 0.8), 0.72, mz], 0.07, 0.07, 6));
      gear.add(taper(THREE, T.metal, [X(dk), 0, top], [X(dk), 0, mz + 0.9], 0.20, 0.18, 10));
      gear.add(taper(THREE, T.metal, [X(dk), 0, mz + 1.0], [X(dk), 0, mz + 0.1], 0.13, 0.13, 8));
      gear.add(taper(THREE, T.metal, [X(dk - 1.4), 0, top], [X(dk - 0.05), 0, mz + 1.2], 0.08, 0.07, 6));
      /* the long gear doors, open beside the bay */
      for (s = -1; s <= 1; s += 2) {
        var y0 = s * 0.82, ol = [[X(dk - 1.9), top + 0.05], [X(dk + 1.9), top + 0.05], [X(dk + 1.6), top - 0.95], [X(dk - 1.6), top - 0.95]];
        gear.add(new THREE.Mesh(plate(THREE, ol, y0, 0.025), T.skin));
      }
    }
    /* outriggers out of the tip pods [3V][E2] */
    var oz = GROUND + 0.42, pz = wz(YTIP) - 0.30;
    for (s = -1; s <= 1; s += 2) {
      for (o = -1; o <= 1; o += 2) wheel(0.42, 0.20, X(DOUT), s * YTIP + o * 0.17, oz);
      gear.add(taper(THREE, T.metal, [X(DOUT), s * YTIP, pz], [X(DOUT), s * YTIP, oz + 0.55], 0.09, 0.08, 8));
      gear.add(taper(THREE, T.metal, [X(DOUT), s * YTIP, oz + 0.65], [X(DOUT), s * YTIP, oz], 0.06, 0.06, 6));
      gear.add(taper(THREE, T.metal, [X(DOUT - 1.2), s * YTIP, pz + 0.05], [X(DOUT), s * YTIP, oz + 1.0], 0.05, 0.05, 6));
      gear.add(new THREE.Mesh(plate(THREE, [[X(DOUT - 1.4), pz + 0.1], [X(DOUT + 1.0), pz + 0.1], [X(DOUT + 1.0), pz - 0.8], [X(DOUT - 1.4), pz - 0.8]],
        s * (YTIP + 0.30), 0.02), T.skin));
    }
    g.add(gear);
  }
  function mergeByMaterial(THREE, root) {
    var main = { order: [], by: {} }, gear = { order: [], by: {} };
    (function walk(node, pm, inGear) {
      for (var i = 0; i < node.children.length; i++) {
        var c = node.children[i];
        c.updateMatrix();
        var m = pm.clone().multiply(c.matrix);
        var ing = inGear || c.name === "gear";
        if (c.isMesh) {
          var b = ing ? gear : main, key = c.material.uuid;
          if (!b.by[key]) { b.by[key] = { mat: c.material, parts: [] }; b.order.push(key); }
          var geo = c.geometry.index ? c.geometry.toNonIndexed() : c.geometry.clone();
          if (!geo.attributes.normal) geo.computeVertexNormals();
          geo.applyMatrix4(m);
          b.by[key].parts.push(geo);
        } else walk(c, m, ing);
      }
    })(root, new THREE.Matrix4(), false);
    function out(bucket, into) {
      for (var i = 0; i < bucket.order.length; i++) {
        var e = bucket.by[bucket.order[i]], n = 0, k, o = 0;
        for (k = 0; k < e.parts.length; k++) n += e.parts[k].attributes.position.count;
        var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2);
        for (k = 0; k < e.parts.length; k++) {
          var a = e.parts[k].attributes;
          P.set(a.position.array, o * 3);
          N.set(a.normal.array, o * 3);
          if (a.uv) U.set(a.uv.array, o * 2);
          o += a.position.count;
        }
        var geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
        geo.setAttribute("normal", new THREE.BufferAttribute(N, 3));
        geo.setAttribute("uv", new THREE.BufferAttribute(U, 2));
        into.add(new THREE.Mesh(geo, e.mat));
      }
    }
    var res = new THREE.Group();
    out(main, res);
    var gr = new THREE.Group();
    gr.name = "gear";
    out(gear, gr);
    res.add(gr);
    return res;
  }

  function materials(THREE, C) {
    var skin = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.40, metalness: 0.48, side: THREE.DoubleSide });
    var t = skinSheet(THREE);
    if (t) skin.map = t; else skin.color.set("#b9bfc2");
    return {
      skin: skin,
      team: new THREE.MeshStandardMaterial({
        color: new THREE.Color((C && C.team !== undefined) ? C.team : 0x3f7fd0),
        roughness: 0.82, metalness: 0.06, side: THREE.DoubleSide }),
      metal: new THREE.MeshStandardMaterial({ color: 0x4a5055, roughness: 0.52, metalness: 0.55, side: THREE.DoubleSide }),
      frame: new THREE.MeshStandardMaterial({ color: 0x6d7478, roughness: 0.5, metalness: 0.5, side: THREE.DoubleSide }),
      ink: new THREE.MeshStandardMaterial({ color: 0x08090a, roughness: 0.95, metalness: 0.03, side: THREE.DoubleSide }),
      tyre: new THREE.MeshStandardMaterial({ color: 0x0b0c0d, roughness: 0.95, metalness: 0.04 }),
      red: new THREE.MeshStandardMaterial({ color: 0xb8141b, roughness: 0.7, metalness: 0.02, side: THREE.DoubleSide }),
      white: new THREE.MeshStandardMaterial({ color: 0xdcddd8, roughness: 0.6, metalness: 0.05, side: THREE.DoubleSide }),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x223139, roughness: 0.12, metalness: 0.30, clearcoat: 0.35,
        transparent: true, opacity: 0.86, side: THREE.DoubleSide })
    };
  }

  function build(THREE, M, C) {
    var T = materials(THREE, C);
    var g = new THREE.Group();
    addFuselage(THREE, g, T);
    addCockpit(THREE, g, T);
    addTail(THREE, g, T);
    addWings(THREE, g, T);
    addEngines(THREE, g, T);
    addGear(THREE, g, T);
    return mergeByMaterial(THREE, g);
  }
  return { build: build };
})();

/* len: the measured X extent, nose to the tailplane tips */
UNIT_MODELS["pact_e60_tanker"] = {
  len: 49.5,
  build: function (THREE, M, C) { return HeroMya3MS2.build(THREE, M, C); }
};
